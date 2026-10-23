// ============================================================================
// DUNGEON PACING: every life meets at least one dungeon gate, and none come back to back.
// The gate events themselves live in data/eventsDungeonGates.js; each can be seen once.
// Here: a seeded age by which the first gate is planted as a thread if chance has not
// offered one, and a cooldown so a second gate does not follow the first too closely.
// ============================================================================
import { DUNGEON_GATE_EVENTS } from '../data/eventsDungeonGates.js';
import { matchesEventContext } from './eventConditions.js';
import { careerAgeOf } from './careerAge.js';

export const GATE_COOLDOWN_YEARS = 5;
export const isGateEvent = (id) => typeof id === 'string' && id.startsWith('gate_');

const fnv = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

/** The age by which this life will have been offered a gate: two to seven years into working life. */
export function firstGateAge(char) {
  return careerAgeOf(char) + 2 + (fnv(`${char.seed ?? char.name ?? ''}|gate`) % 6);
}

export const hasSeenGate = (char) => (char.seenEvents || []).some(isGateEvent);

/** True while the last gate is too recent for another one to be offered. */
export function gateOnCooldown(char) {
  return Number.isFinite(char.lastGateAge) && char.age - char.lastGateAge < GATE_COOLDOWN_YEARS;
}

/**
 * Called at year's end. If no gate has come by the seeded age, plants one that fits this
 * character (job, District, flags) as a thread due next year. A planted gate that stopped
 * fitting (a job change, a move) is replaced after three years.
 */
export function planFirstGate(char) {
  if (!char.alive || char.flags?.includes('Distorted') || hasSeenGate(char)) return false;
  if (char.age + 1 < firstGateAge(char)) return false;
  const pending = char.weaver?.pendingThreads || [];
  const planted = pending.find((t) => !t.fulfilled && isGateEvent(t.eventId));
  if (planted && char.age - planted.plantedAtAge < 3) return false;
  const next = { ...char, age: char.age + 1 };
  const options = DUNGEON_GATE_EVENTS.filter((e) => e.id !== planted?.eventId && matchesEventContext(e, next));
  if (!options.length) return false;
  const total = options.reduce((s, e) => s + (e.weight || 1), 0);
  let pick = (fnv(`${char.seed ?? ''}|gate|${char.age}`) % 10000) / 10000 * total;
  const chosen = options.find((e) => (pick -= e.weight || 1) < 0) || options[0];
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
