// The player models the simulations share, one per kind of player:
//   random    any offered choice, any split of the year's slots
//   greedy    takes the reward: the best summed visible effect, and a year spent working
//   focused   climbs: greedy at ordinary choices, the career's milestones taken, a year spent training
//   cautious  survives first: weighs HP and heat twice as heavily, takes the milestones only at 60 HP or more,
//             and spends a wounded year mending
import { choiceIsAvailable } from '../../../src/engine/eventConditions.js';
import { CAREER_CROSSROAD_IDS } from '../../../src/engine/careerAge.js';
import { applyAnnualPlan, ambitionsFor, defaultYearPoints, CONVALESCE, YEAR_ACTIVITIES, YEAR_PLAN_POINTS } from '../../../src/engine/annualPlan.js';

export const POLICIES = ['random', 'greedy', 'focused', 'cautious'];

const WEIGHT = { health: 1.2, sanity: 1, wealth: 0.8, network: 0.5, rep: 0.6, heat: -0.7, taboo: -3, resonance: -0.3, merit: 0.4 };
const CAUTIOUS_WEIGHT = { ...WEIGHT, health: 2.4, sanity: 1.4, heat: -1.4, merit: 0.2 };
const fxScoreWith = (weights) => (fx = {}) => Object.entries(fx).reduce((s, [k, v]) => s + (weights[k] || 0) * v, 0);
const fxScore = fxScoreWith(WEIGHT);
const cautiousScore = fxScoreWith(CAUTIOUS_WEIGHT);
const scoreWith = (score) => (ch) => {
  const rows = ch.out || ch.outcomes;
  if (Array.isArray(rows) && rows.length) {
    const total = rows.reduce((s, o) => s + (o.w ?? 50), 0) || 1;
    return rows.reduce((s, o) => s + ((o.w ?? 50) / total) * score(o.fx || o.effects), 0) + score(ch.fx || ch.effects);
  }
  return score(ch.fx || ch.effects);
};

/** The year's slots each player would set. */
export function yearPointsFor(policy, char, rng = Math.random) {
  const hurt = (char.stats?.health ?? 100) < CONVALESCE.below;
  if (policy === 'cautious') return hurt ? { train: 0, work: 1, bond: 0, rest: 2, scheme: 0 } : { train: 1, work: 1, bond: 0, rest: 1, scheme: 0 };
  if (policy === 'focused') return { train: 2, work: 1, bond: 0, rest: 0, scheme: 0 };
  if (policy === 'greedy') return { train: 0, work: 2, bond: 0, rest: 1, scheme: 0 };
  if (policy === 'random') {
    const p = Object.fromEntries(YEAR_ACTIVITIES.map((a) => [a.id, 0]));
    for (let k = 0; k < YEAR_PLAN_POINTS; k++) p[YEAR_ACTIVITIES[Math.floor(rng() * YEAR_ACTIVITIES.length)].id] += 1;
    return p;
  }
  return defaultYearPoints();
}

/** Sets the year's plan the way a player of this policy would, when the screen asks for one. */
export function planTheYear(char, policy, rng = Math.random) {
  if (!char.pendingYearPlan || char.pendingYearPlan.age !== char.age) return char;
  const ambition = char.ambition?.id || ambitionsFor(char).find((g) => g.id === (policy === 'cautious' ? 'survive' : 'rank'))?.id || ambitionsFor(char)[0]?.id;
  if (!applyAnnualPlan(char, yearPointsFor(policy, char, rng), ambition)) char.pendingYearPlan = null;
  return char;
}

export const choiceScore = scoreWith(fxScore);
const cautiousChoiceScore = scoreWith(cautiousScore);

/** Returns pickIndex(choices, rng, char, eventId): the index a player of this policy takes, or -1 when nothing is offered. */
export function makePicker(policy = 'random') {
  return (choices, rng, char, eventId = '') => {
    // A player can only pick what the screen offers
    const ok = (choices || []).map((c, i) => i).filter((i) => choiceIsAvailable(choices[i], char));
    if (!ok.length) return -1;
    if (policy === 'random') return ok[Math.floor(rng() * ok.length)];
    // The cautious player still climbs, but only while the body can take the exam
    if (policy === 'focused' || (policy === 'cautious' && (char?.stats?.health ?? 0) >= 60)) {
      if (eventId.startsWith('fixer_seven_')) return ok[0];
      if (eventId === 'hana_color_ascension_trial') return ok.includes(1) ? 1 : 0;
      if (eventId === 'ego_carmen_crossroad' || eventId === 'ego_second_efflorescence_trial') return ok[0];
      if (CAREER_CROSSROAD_IDS.includes(eventId)) {
        const fixer = ok.find((i) => choices[i].setJob === 'Fixer');
        if (fixer !== undefined) return fixer;
      }
      if (eventId.startsWith('fixer_promo_')) {
        const promotion = ok.find((i) => choices[i].setFixerGrade != null);
        if (promotion !== undefined) return promotion;
      }
    }
    const score = policy === 'cautious' ? cautiousChoiceScore : choiceScore;
    return ok.reduce((b, i) => (score(choices[i]) > score(choices[b]) ? i : b), ok[0]);
  };
}
