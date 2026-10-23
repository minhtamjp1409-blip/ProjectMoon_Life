// ============================================================================
// DUNGEON PACING: every working life meets dungeon gates, how many depends on the branch,
// and none come back to back. A Fixer already has Requests, exams and an Association, so a
// Fixer gets one guaranteed gate; a Finger member has fewer scenes of their own, so they get
// three, sooner and closer together. Gate events live in data/eventsDungeonGates*.js and
// each can be seen once.
// ============================================================================
import { DUNGEON_GATE_EVENTS } from '../data/eventsDungeonGates.js';
import { DUNGEON_GATE_EVENTS_2 } from '../data/eventsDungeonGates2.js';
import { matchesEventContext } from './eventConditions.js';
import { careerAgeOf } from './careerAge.js';

export const isGateEvent = (id) => typeof id === 'string' && id.startsWith('gate_');
const GATES = [...DUNGEON_GATE_EVENTS, ...DUNGEON_GATE_EVENTS_2].filter((e) => isGateEvent(e.id));
const gateDungeon = (event) => event?.choices?.find((choice) => choice.startDungeon)?.startDungeon;
const gateById = new Map(GATES.map((event) => [event.id, event]));
const DUNGEON_GATE_IDS = [...new Set(GATES.map(gateDungeon).filter(Boolean))];

/** Per branch: guaranteed gates in a life, years between them, the cooldown, and how much more often they come up on their own. */
export const GATE_PROFILES = {
  Syndicate: { guaranteed: 3, spacing: [5, 8], cooldown: 3, weight: 1.8 },
  'Wing Employee': { guaranteed: 2, spacing: [7, 10], cooldown: 4, weight: 1.3 },
  Outcast: { guaranteed: 2, spacing: [7, 10], cooldown: 4, weight: 1.3 },
  Fixer: { guaranteed: 1, spacing: [8, 12], cooldown: 5, weight: 1 }
};
const DEFAULT_PROFILE = { guaranteed: 1, spacing: [8, 12], cooldown: 5, weight: 1 };
export const GATE_COOLDOWN_YEARS = GATE_PROFILES.Fixer.cooldown;

export const gateProfileOf = (char) => GATE_PROFILES[char?.job] || DEFAULT_PROFILE;
export const gateWeightMult = (char) => gateProfileOf(char).weight;

const fnv = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

/** The age by which this life will have been offered a gate: two to seven years into working life. */
export function firstGateAge(char) {
  return careerAgeOf(char) + 2 + (fnv(`${char.seed ?? char.name ?? ''}|gate`) % 6);
}

export const gatesSeen = (char) => (char.seenEvents || []).filter(isGateEvent).length;
export const hasSeenGate = (char) => gatesSeen(char) > 0;

/** When the next guaranteed gate is due, or null when this branch's quota is met. */
export function nextGateDueAge(char) {
  const profile = gateProfileOf(char);
  const seen = gatesSeen(char);
  if (seen >= profile.guaranteed) return null;
  if (seen === 0) return firstGateAge(char);
  const [lo, hi] = profile.spacing;
  const gap = lo + (fnv(`${char.seed ?? ''}|gate-gap|${seen}`) % (hi - lo + 1));
  return (Number.isFinite(char.lastGateAge) ? char.lastGateAge : char.age) + gap;
}

/** True while the last gate is too recent for another one to be offered. */
export function gateOnCooldown(char) {
  return Number.isFinite(char.lastGateAge) && char.age - char.lastGateAge < gateProfileOf(char).cooldown;
}

/**
 * Called at year's end. When the next guaranteed gate is due, plants one that fits this
 * character (job, Finger, District, Association, flags) as a thread due next year. A planted
 * gate that stopped fitting (a job change, a move) is replaced after three years.
 */
export function planFirstGate(char) {
  if (!char.alive || char.flags?.includes('Distorted')) return false;
  const due = nextGateDueAge(char);
  if (due == null || char.age + 1 < due) return false;
  const pending = char.weaver?.pendingThreads || [];
  const planted = pending.find((t) => !t.fulfilled && isGateEvent(t.eventId));
  if (planted && char.age - planted.plantedAtAge < 3) return false;
  const next = { ...char, age: char.age + 1 };
  const seen = new Set(char.seenEvents || []);
  const options = GATES.filter((e) => e.id !== planted?.eventId && !seen.has(e.id) && matchesEventContext(e, next));
  if (!options.length) return false;
  const previousDungeons = new Set((char.seenEvents || []).map((id) => gateDungeon(gateById.get(id))).filter(Boolean));
  for (const log of char.logs || []) {
    const id = DUNGEON_GATE_IDS.find((dungeonId) => String(log.id || '').startsWith(`log_${dungeonId}_`));
    if (id) previousDungeons.add(id);
  }
  if (char.pendingDungeon?.id) previousDungeons.add(char.pendingDungeon.id);
  const fresh = options.filter((event) => !previousDungeons.has(gateDungeon(event)));
  const pool = fresh.length ? fresh : options;
  const total = pool.reduce((s, e) => s + (e.weight || 1), 0);
  let pick = (fnv(`${char.seed ?? ''}|gate|${char.age}`) % 10000) / 10000 * total;
  const chosen = pool.find((e) => (pick -= e.weight || 1) < 0) || pool[0];
  char.weaver = {
    ...char.weaver,
    pendingThreads: [...pending.filter((t) => t !== planted), {
      id: `thr_${char.age}_${chosen.id}`, kind: 'major', eventId: chosen.id,
      plantedAtAge: char.age, triggerAge: char.age + 1,
      reasonVi: 'Có người đang tìm một người đủ gan để xuống nơi không ai quay về',
      reasonEn: 'Someone is looking for a person bold enough to go where no one comes back from',
      fulfilled: false
    }]
  };
  return true;
}
