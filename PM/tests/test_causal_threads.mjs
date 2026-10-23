import assert from 'node:assert/strict';
import { createNewCharacter, createRNG, resolveEventChoice } from '../src/engine/gameEngine.js';
import { planYear, resolveMinor, runPlanItem } from '../src/engine/yearPlanner.js';
import { THREAD_MINORS, THREAD_CONSEQUENCES } from '../src/data/narrative/causalThreads.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';

const placeCharacter = (char, minor) => {
  char.age = Math.max(20, minor.age[0]);
  if (minor.need?.nest) char.flags.push('Nest');
  if (minor.need?.out) {
    char.regionId = 'OUTSKIRTS';
    char.flags.push('Outskirts');
  }
  if (minor.need?.back) {
    char.flags = char.flags.filter((flag) => !['Nest', 'NestResident', 'Feather', 'Outskirts'].includes(flag));
    char.regionId = 'D1';
  }
  if (minor.need?.jobs?.length) char.job = minor.need.jobs[0];
};

for (const minor of THREAD_MINORS.filter((entry) => entry.id !== 'm6_distortion_pursuit_note' && entry.id !== 'm6_child_broken_toy' && entry.id !== 'm6_last_pair_of_shoes')) {
  const seed = `causal:${minor.id}`;
  const rng = createRNG(seed);
  let char = createNewCharacter({ customName: 'Tester', seed });
  placeCharacter(char, minor);
  assert.ok(matchesEventContext(minor, char), `${minor.id}: initial context`);
  char.pendingMinor = { id: minor.id, t: 0.4, vi: minor.vi, en: minor.en, choices: minor.choices, ignore: minor.ignore };
  char = resolveMinor(char, 0, rng);
  const consequence = THREAD_CONSEQUENCES.find((entry) => entry.id === `csq_thread_${minor.id.slice(3)}`);
  assert.ok(consequence, `${minor.id}: consequence definition`);
  const thread = char.weaver.pendingThreads.find((entry) => entry.eventId === consequence.id && !entry.fulfilled);
  assert.ok(thread, `${minor.id}: promised callback scheduled`);
  assert.equal(thread.triggerAge, char.age + 2, `${minor.id}: two-year delay`);
  char.age += 2;
  planYear(char, rng);
  const item = char.plan.find((entry) => entry.forcedEventId === consequence.id);
  assert.ok(item, `${minor.id}: callback placed in the due year's plan`);
  char = runPlanItem(char, item, rng);
  assert.equal(char.pendingEvent?.id, consequence.id, `${minor.id}: callback opens`);
  assert.ok(char.weaver.pendingThreads.find((entry) => entry.id === thread.id)?.fulfilled, `${minor.id}: thread fulfilled ${JSON.stringify({item, threads: char.weaver.pendingThreads})}`);
  char = resolveEventChoice(char, 0, rng);
  assert.ok(char.flags.includes(`thread_${minor.id.slice(3)}_kept`), `${minor.id}: ending records choice`);

  let decline = createNewCharacter({ customName: 'Tester', seed: `${seed}:decline` });
  placeCharacter(decline, minor);
  assert.ok(matchesEventContext(minor, decline), `${minor.id}: decline context`);
  decline.pendingMinor = { id: minor.id, t: 0.4, vi: minor.vi, en: minor.en, choices: minor.choices, ignore: minor.ignore };
  decline = resolveMinor(decline, 1, rng);
  assert.ok(!(decline.weaver.pendingThreads || []).some((entry) => entry.eventId === consequence.id), `${minor.id}: declining creates no callback`);
}

console.log('18 causal arcs: accept schedules and resolves the callback; decline schedules none.');
