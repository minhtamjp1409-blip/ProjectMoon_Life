import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import { firstGateAge, planFirstGate, gateOnCooldown, GATE_COOLDOWN_YEARS } from '../src/engine/dungeonPacing.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { DUNGEON_GATE_EVENTS } from '../src/data/eventsDungeonGates.js';

function worker(seed, job = 'Fixer') {
  const c = createNewCharacter({ seed, startAge: 18 });
  Object.assign(c, { job, fixerGrade: job === 'Fixer' ? 9 : undefined, regionId: 'A' });
  if (job === 'Syndicate') { c.finger = 'Thumb'; c.fingerRank = 0; }
  c.weaver.pendingThreads = [];
  return c;
}

// The first gate comes two to seven years into working life, fixed by seed
for (let i = 0; i < 50; i++) {
  const c = worker(`gate-age-${i}`);
  const at = firstGateAge(c);
  assert.equal(firstGateAge(c), at);
  assert.ok(at >= 17 && at <= 27, `gate age ${at}`);
}

// Before that age nothing is planted; at it, one gate that fits the character is
for (const job of ['Fixer', 'Syndicate', 'Wing Employee', 'Outcast']) {
  const c = worker(`gate-plant-${job}`, job);
  c.age = firstGateAge(c) - 3;
  assert.equal(planFirstGate(c), false);
  c.age = firstGateAge(c) - 1;
  assert.equal(planFirstGate(c), true, `${job} gets a gate`);
  const t = c.weaver.pendingThreads.find((x) => x.eventId.startsWith('gate_'));
  assert.ok(t && t.triggerAge === c.age + 1);
  const ev = DUNGEON_GATE_EVENTS.find((e) => e.id === t.eventId);
  c.age += 1;
  assert.equal(isEventEligible(ev, c, { scripted: true }), true, `${job}: ${ev.id} fits`);
  assert.equal(planFirstGate(c), false, 'not planted twice');
}

// A life that already met a gate is left alone, and a Distortion gets none
const seen = worker('gate-seen');
seen.age = 40; seen.seenEvents = [...seen.seenEvents, 'gate_warp_fixer_request'];
assert.equal(planFirstGate(seen), false);
const distorted = worker('gate-distorted');
distorted.age = 40; distorted.flags.push('Distorted');
assert.equal(planFirstGate(distorted), false);

// Answering a gate, entering or declining, starts a cooldown for the next one
const c = worker('gate-cool');
c.age = 30;
const gate = ALL_STORY_EVENTS.find((e) => e.id === 'gate_lobotomy_fixer_survey');
c.pendingEvent = gate;
const after = resolveEventChoice(c, gate.choices.length - 1, () => 0.5);
assert.equal(after.lastGateAge, 30);
assert.equal(gateOnCooldown(after), true);
const other = ALL_STORY_EVENTS.find((e) => e.id === 'gate_lake_open_hunt');
assert.equal(isEventEligible(other, after), false);
after.age += GATE_COOLDOWN_YEARS;
assert.equal(gateOnCooldown(after), false);
assert.equal(isEventEligible(other, after), true);
console.log('Dungeon pacing: seeded first gate, fits every working job, cooldown between gates passed.');
