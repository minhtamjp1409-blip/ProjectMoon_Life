// The player models the simulations share, one per kind of player:
//   random    any offered choice, any split of the year's slots
//   greedy    takes the reward: the best summed visible effect, and a year spent working
//   focused   climbs: greedy at ordinary choices, the career's milestones taken, a year spent training
//   cautious  survives first: weighs HP and heat twice as heavily, takes the milestones only at 60 HP or more,
//             and spends a wounded year mending
import { choiceIsAvailable } from '../../../src/engine/eventConditions.js';
import { CAREER_CROSSROAD_IDS } from '../../../src/engine/careerAge.js';
import { applyAnnualPlan, ambitionsFor, defaultYearPoints, CONVALESCE, YEAR_ACTIVITIES, YEAR_PLAN_POINTS } from '../../../src/engine/annualPlan.js';
import { canRelocateDistrict, relocateCharacterDistrict } from '../../../src/engine/cityUpgrades.js';

export const POLICIES = ['random', 'greedy', 'focused', 'cautious'];
export const DOOR_POLICY = 'door';
export const ALL_POLICIES = [...POLICIES, DOOR_POLICY];

const toRegionId = (code) => {
  const s = String(code || '').trim();
  if (/^\d+$/.test(s)) {
    const n = Number(s);
    if (n >= 1 && n <= 26) return String.fromCharCode(64 + n);
  }
  return s;
};

function openDoorTargets(char) {
  const doors = (char?.visibleDoors || []).filter((d) => !d.opened);
  const stats = {};
  const regions = [];
  const jobs = [];
  const fingers = [];
  let needMerit = false;
  let needGrade = false;
  for (const d of doors) {
    const t = d.targets || {};
    for (const [k, v] of Object.entries(t.stats || {})) {
      if ((char.stats?.[k] ?? char[k] ?? 0) < v) stats[k] = Math.max(stats[k] || 0, v);
    }
    for (const r of (t.regions || [])) regions.push(toRegionId(r));
    for (const j of (t.jobs || [])) jobs.push(j);
    if (t.finger) fingers.push(t.finger);
    if (t.meritAtLeast != null && (char.merit || 0) < t.meritAtLeast) needMerit = true;
    if (t.grade) needGrade = true;
  }
  return { doors, stats, regions, jobs, fingers, needMerit, needGrade };
}

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
const allChoiceJobs = (ch) => [
  ch?.setJob,
  ...((ch?.out || ch?.outcomes || []).map((o) => o.setJob))
].filter(Boolean);

const allChoiceFingers = (ch) => [
  ch?.setFinger,
  ...((ch?.out || ch?.outcomes || []).map((o) => o.setFinger))
].filter(Boolean);

const allChoiceFlags = (ch) => [
  ...(ch?.flagsAdd || []),
  ...((ch?.out || ch?.outcomes || []).flatMap((o) => o.flagsAdd || []))
].filter(Boolean);

export function yearPointsFor(policy, char, rng = Math.random) {
  const hurt = (char.stats?.health ?? 100) < 72;
  const stressed = (char.stats?.sanity ?? 100) < 46;
  if (policy === DOOR_POLICY) {
    if (hurt || stressed) return { train: 0, work: 1, bond: 0, rest: 2, scheme: 0 };
    const tgt = openDoorTargets(char);
    const points = { train: 0, work: 0, bond: 0, rest: 1, scheme: 0 };
    if (tgt.stats.network || tgt.doors.some((d) => d.need?.npc || d.need?.bondAtLeast)) points.bond += 1;
    else if (tgt.stats.resonance || tgt.stats.leverage) points.scheme += 1;
    if (tgt.stats.wealth || tgt.regions.length > 0) points.work += 1;
    if (tgt.stats.rep || tgt.needMerit || tgt.needGrade || tgt.doors.some((d) => d.need?.grade || d.need?.meritAtLeast)) points.train += 1;
    const extraActs = ['train', 'work', 'bond', 'scheme'];
    let total = Object.values(points).reduce((s, v) => s + v, 0);
    while (total < YEAR_PLAN_POINTS) {
      points[extraActs[Math.floor(rng() * extraActs.length)]] += 1;
      total += 1;
    }
    while (total > YEAR_PLAN_POINTS) {
      if (points.scheme > 0) points.scheme -= 1;
      else if (points.work > 1) points.work -= 1;
      else if (points.train > 0) points.train -= 1;
      else points.bond -= 1;
      total -= 1;
    }
    return points;
  }
  const lowHp = (char.stats?.health ?? 100) < CONVALESCE.below;
  if (policy === 'cautious') return lowHp ? { train: 0, work: 1, bond: 0, rest: 2, scheme: 0 } : { train: 1, work: 1, bond: 0, rest: 1, scheme: 0 };
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
  if (policy === DOOR_POLICY) {
    const tgt = openDoorTargets(char);
    const cool = char.lastRelocatedAge == null || (char.age - char.lastRelocatedAge) >= 5;
    const rich = (char.stats?.wealth ?? 0) >= 22;
    const targetRegion = (char.age >= 18 && cool && rich)
      ? tgt.regions.find((r) => r && r !== char.regionId && canRelocateDistrict(char, r).ok)
      : null;
    if (targetRegion) relocateCharacterDistrict(char, targetRegion);
  }
  if (!char.pendingYearPlan || char.pendingYearPlan.age !== char.age) return char;
  const doorAmb = policy === DOOR_POLICY
    ? ((char.stats?.health ?? 100) < 76 ? 'survive' : (openDoorTargets(char).stats.wealth ? 'prosperity' : (rng() < 0.5 ? 'survive' : 'rank')))
    : null;
  const ambition = char.ambition?.id
    || (doorAmb && ambitionsFor(char).find((g) => g.id === doorAmb)?.id)
    || ambitionsFor(char).find((g) => g.id === (policy === 'cautious' ? 'survive' : 'rank'))?.id
    || ambitionsFor(char)[0]?.id;
  if (!applyAnnualPlan(char, yearPointsFor(policy, char, rng), ambition)) char.pendingYearPlan = null;
  return char;
}

export const choiceScore = scoreWith(fxScore);
const cautiousChoiceScore = scoreWith(cautiousScore);

function doorChoiceBonus(ch, tgt, char) {
  let bonus = 0;
  const fxList = [ch.fx || ch.effects, ...((ch.out || ch.outcomes || []).map((o) => o.fx || o.effects))].filter(Boolean);
  for (const fx of fxList) {
    for (const [k] of Object.entries(tgt.stats)) {
      if ((fx[k] || 0) > 0) bonus += fx[k] * 1.3;
    }
    if (tgt.needMerit && (fx.merit || 0) > 0) bonus += fx.merit * 0.9;
  }
  const cJobs = allChoiceJobs(ch);
  const cFingers = allChoiceFingers(ch);
  const cFlags = allChoiceFlags(ch);
  const cOutcomes = [ch, ...(ch.out || ch.outcomes || [])];
  if (cJobs.some((j) => tgt.jobs.includes(j))) bonus += 35;
  if (cFingers.some((f) => tgt.fingers.includes(f))) bonus += 35;
  if (cFlags.length && tgt.doors.some((d) => (d.need?.flags || []).some((f) => cFlags.includes(f)))) bonus += 35;
  if (ch.scarsAdd?.length && !char?.scars?.length) bonus += 6;
  // Reward choices that open new flags or causal threads or nudge stats cleanly without burning HP
  if ((char?.stats?.health ?? 100) >= 62) {
    if (cFlags.some((f) => !(char?.flags || []).includes(f))) bonus += 9;
    if (cOutcomes.some((o) => Array.isArray(o.scheduleConsequences) && o.scheduleConsequences.some((c) => !(char?.seenEvents || []).includes(c.eventId)))) bonus += 10;
  }
  return bonus;
}

/** Returns pickIndex(choices, rng, char, eventId): the index a player of this policy takes, or -1 when nothing is offered. */
export function makePicker(policy = 'random') {
  return (choices, rng, char, eventId = '') => {
    // A player can only pick what the screen offers
    const ok = (choices || []).map((c, i) => i).filter((i) => choiceIsAvailable(choices[i], char));
    if (!ok.length) return -1;
    if (policy === 'random') return ok[Math.floor(rng() * ok.length)];
    if (policy === DOOR_POLICY) {
      const tgt = openDoorTargets(char);
      const healthy = (char?.stats?.health ?? 0) >= 66;
      if (CAREER_CROSSROAD_IDS.includes(eventId)) {
        for (const targetJob of tgt.jobs) {
          const doorJob = ok.find((i) => allChoiceJobs(choices[i]).includes(targetJob));
          if (doorJob !== undefined && rng() < 0.75) return doorJob;
        }
        return ok[Math.floor(rng() * ok.length)];
      }
      if (eventId === 'syn_choose_finger_allegiance') {
        for (const targetFinger of tgt.fingers) {
          const doorFinger = ok.find((i) => allChoiceFingers(choices[i]).includes(targetFinger));
          if (doorFinger !== undefined) return doorFinger;
        }
        return ok[Math.floor(rng() * ok.length)];
      }
      if (healthy && (eventId.startsWith('fixer_promo_') || eventId.includes('_promo_'))) {
        const promo = ok.find((i) => choices[i].setFixerGrade != null || choices[i].setWingRank != null || choices[i].setFingerRank != null || (choices[i].out || choices[i].outcomes || []).some((o) => o.setFixerGrade != null || o.setWingRank != null || o.setFingerRank != null));
        if (promo !== undefined) return promo;
      }
      if (healthy && eventId === 'hana_color_ascension_trial' && ok.includes(1)) return 1;
      if (eventId === 'ego_carmen_crossroad') return ok[Math.floor(rng() * Math.min(2, ok.length))];
      const baseScore = (char?.stats?.health ?? 100) < 76 || (char?.stats?.sanity ?? 100) < 48 ? cautiousChoiceScore : choiceScore;
      const scored = ok.map((i) => {
        const bonus = doorChoiceBonus(choices[i], tgt, char);
        return {
          i,
          total: baseScore(choices[i]) * 0.45 + bonus + rng() * 20
        };
      });
      scored.sort((a, b) => b.total - a.total);
      return scored[0].i;
    }
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
