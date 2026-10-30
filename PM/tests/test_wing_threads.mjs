import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import { WING_THREAD_EVENTS } from '../src/data/eventsWingThreads.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { choiceIsAvailable } from '../src/engine/eventConditions.js';

console.log('--- RUNNING WING THREAD TESTS ---');

const byId = new Map(WING_THREAD_EVENTS.map((e) => [e.id, e]));
const START = 'wing_thread_stray_ledger_line';
const rowsOf = (choice) => choice.outcomes || [choice];
const scheduled = (choice) => rowsOf(choice).flatMap((row) => [...(choice.scheduleConsequences || []), ...(row.scheduleConsequences || [])]);
const flagsAddedBy = (choice) => rowsOf(choice).flatMap((row) => [...(choice.flagsAdd || []), ...(row.flagsAdd || [])]);

console.log('1. The events are registered once and the chain opens from a single start...');
for (const e of WING_THREAD_EVENTS) assert.strictEqual(ALL_STORY_EVENTS.filter((x) => x.id === e.id).length, 1, `${e.id} registered once`);
assert(!byId.get(START).causalOnly, 'the start is drawn by the Weaver');
for (const e of WING_THREAD_EVENTS.filter((x) => x.id !== START)) assert(e.causalOnly && e.weight === 0, `${e.id} only appears as a consequence`);

console.log('2. Every scheduled return exists and is reached by some choice...');
const targets = new Set();
for (const e of WING_THREAD_EVENTS) for (const choice of e.choices) for (const s of scheduled(choice)) {
  assert(byId.has(s.eventId), `${e.id} schedules a missing event ${s.eventId}`);
  assert(s.delayYears >= 1 && s.delayYears <= 5, `${e.id} -> ${s.eventId}: delay of ${s.delayYears} years`);
  targets.add(s.eventId);
}
for (const e of WING_THREAD_EVENTS.filter((x) => x.id !== START)) assert(targets.has(e.id), `${e.id} is never scheduled`);

console.log('3. Each return requires a flag that an earlier choice really sets...');
const produced = new Set(WING_THREAD_EVENTS.flatMap((e) => e.choices.flatMap(flagsAddedBy)));
for (const e of WING_THREAD_EVENTS.filter((x) => x.id !== START)) {
  for (const flag of e.requires || []) assert(produced.has(flag), `${e.id} requires ${flag}, which no choice sets`);
}

console.log('4. The first choice leads to a different return on each path...');
const firstReturns = byId.get(START).choices.map((c) => scheduled(c)[0]?.eventId);
assert.strictEqual(new Set(firstReturns).size, 3, 'three choices, three different returns');

console.log('5. Walking each path in the engine schedules its return and opens it later...');
const wing = (seed) => {
  const c = createNewCharacter({ seed, startAge: 30 });
  c.job = 'Wing Employee'; c.wingRank = 1; c.alive = true; c.flags = ['Feather', 'Nest'];
  c.stats = { ...c.stats, health: 90, sanity: 80, wealth: 60, network: 40, rep: 40 };
  return c;
};
byId.get(START).choices.forEach((choice, idx) => {
  let c = wing(`wing-thread-${idx}`);
  assert(isEventEligible(byId.get(START), c, { scripted: true }), 'the start is eligible for a Wing clerk');
  c.pendingEvent = byId.get(START);
  c = resolveEventChoice(c, idx, () => 0.1);
  assert(c.flags.includes('WingLedgerLine'), 'the thread is marked open');
  const next = scheduled(choice)[0].eventId;
  assert((c.weaver?.pendingThreads || []).some((t) => t.eventId === next || t.targetEventId === next), `${next} is queued after choice ${idx}`);
  c.age += scheduled(choice)[0].delayYears;
  assert(isEventEligible(byId.get(next), c, { scripted: true }), `${next} is eligible once its flag is set and the years have passed`);
});

console.log('6. A Fixer or a Syndicate member never meets the thread...');
const fixer = wing('wing-thread-fixer'); fixer.job = 'Fixer';
assert(!isEventEligible(byId.get(START), fixer, { scripted: true }), 'the thread belongs to the Wing');

console.log('7. A choice that needs Ahn is closed to a clerk without it...');
const repay = byId.get('wing_thread_favor_called').choices.find((c) => c.need?.stat?.wealth);
const poor = wing('wing-thread-poor'); poor.stats.wealth = 3; poor.flags.push('WingOwedFavor');
assert(!choiceIsAvailable(repay, poor), 'repaying the envelope costs real Ahn');

console.log('PASS: Wing thread tests');
