import assert from 'assert';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { planYear } from '../src/engine/yearPlanner.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { FINGER_MISSIONS, FINGER_STORY_EVENTS, FINGER_MINORS, FINGER_DAILIES } from '../src/data/eventsFingers.js';

console.log('--- RUNNING FINGER MISSION TESTS ---');
const FINGERS = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];

const member = (finger, rank = 0) => {
  const c = createNewCharacter({ seed: `finger_test_${finger}_${rank}` });
  c.age = 30; c.job = 'Syndicate'; c.finger = finger; c.fingerRank = rank;
  c.flags = [...c.flags, 'HasAffiliation'];
  return c;
};

console.log('1. Every Finger has its own distinct mission pool...');
const seenIds = new Set();
for (const f of FINGERS) {
  const pool = FINGER_MISSIONS.filter((e) => e.finger === f);
  assert(pool.length >= 14, `${f} needs at least 14 missions, has ${pool.length}`);
  for (const e of pool) {
    assert(!seenIds.has(e.id), `${e.id} appears twice`);
    seenIds.add(e.id);
    assert(e.id.toLowerCase().startsWith(f.toLowerCase() + '_'), `${e.id} is filed under ${f}`);
    assert(e.choices.length >= 2, `${e.id} needs real choices`);
    assert(e.jobs.includes('Syndicate') && e.forbids.includes('Distorted'), `${e.id} gating`);
  }
  assert(FINGER_MINORS.filter((m) => m.need?.finger === f).length >= 20, `${f} minors`);
  assert(FINGER_DAILIES.filter((d) => d.need?.finger === f).length >= 24, `${f} dailies`);
}

console.log('2. A member of one Finger never receives another Finger’s scene...');
for (const f of FINGERS) {
  const c = member(f, 1);
  for (const e of FINGER_STORY_EVENTS) {
    if (e.finger !== f && !e.causalOnly) assert.strictEqual(isEventEligible(e, c, { scripted: true }), false, `${e.id} leaked to ${f}`);
  }
}

console.log('3. Missions only reach a Syndicate member who is not Distorted...');
const fixer = member('Thumb', 0); fixer.job = 'Fixer';
assert.strictEqual(FINGER_MISSIONS.some((e) => isEventEligible(e, fixer)), false);

console.log('4. The planner hands out a mission most years, and none when the roll fails...');
for (const f of FINGERS) {
  const yes = member(f, 1);
  planYear(yes, () => 0);
  assert(yes.plan.some((item) => item.forcedEventId && FINGER_MISSIONS.some((m) => m.id === item.forcedEventId && m.finger === f)), `${f}: mission planned with rng 0`);
  const no = member(f, 1);
  planYear(no, () => 0.99);
  assert(!no.plan.some((item) => FINGER_MISSIONS.some((m) => m.id === item.forcedEventId)), `${f}: no mission with rng 0.99`);
}

console.log('5. Choices that set a Finger’s own memory flag are answered later...');
const flagged = (flag) => FINGER_STORY_EVENTS.filter((e) => (e.requires || []).includes(flag));
for (const flag of ['index_deviated', 'index_obeyed', 'middle_forgiving', 'middle_vengeful', 'ring_chased_perfection', 'ring_kept_conscience', 'pinky_kept_word', 'pinky_bent_word']) {
  assert(flagged(flag).length >= 1, `${flag} has a scene that reads it`);
}

console.log('PASS: Finger mission tests');
