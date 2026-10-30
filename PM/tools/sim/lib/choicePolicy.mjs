// The player model the simulations share. random: any offered choice. greedy: the best summed visible effect (a careful
// player). focused: greedy, plus the choices a player who is steering toward a goal would take at the milestones.
import { choiceIsAvailable } from '../../../src/engine/eventConditions.js';
import { CAREER_CROSSROAD_IDS } from '../../../src/engine/careerAge.js';

export const POLICIES = ['random', 'greedy', 'focused'];

const WEIGHT = { health: 1.2, sanity: 1, wealth: 0.8, network: 0.5, rep: 0.6, heat: -0.7, taboo: -3, resonance: -0.3, merit: 0.4 };
const fxScore = (fx = {}) => Object.entries(fx).reduce((s, [k, v]) => s + (WEIGHT[k] || 0) * v, 0);

export function choiceScore(ch) {
  const rows = ch.out || ch.outcomes;
  if (Array.isArray(rows) && rows.length) {
    const total = rows.reduce((s, o) => s + (o.w ?? 50), 0) || 1;
    return rows.reduce((s, o) => s + ((o.w ?? 50) / total) * fxScore(o.fx || o.effects), 0) + fxScore(ch.fx || ch.effects);
  }
  return fxScore(ch.fx || ch.effects);
}

/** Returns pickIndex(choices, rng, char, eventId): the index a player of this policy takes, or -1 when nothing is offered. */
export function makePicker(policy = 'random') {
  return (choices, rng, char, eventId = '') => {
    // A player can only pick what the screen offers
    const ok = (choices || []).map((c, i) => i).filter((i) => choiceIsAvailable(choices[i], char));
    if (!ok.length) return -1;
    if (policy === 'random') return ok[Math.floor(rng() * ok.length)];
    if (policy === 'focused') {
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
    return ok.reduce((b, i) => (choiceScore(choices[i]) > choiceScore(choices[b]) ? i : b), ok[0]);
  };
}
