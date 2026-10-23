import assert from 'assert';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { planYear, LIFE_MINORS } from '../src/engine/yearPlanner.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { FINGER_MISSIONS, FINGER_STORY_EVENTS, FINGER_MINORS, FINGER_DAILIES } from '../src/data/eventsFingers.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { FINGER_UPDATE4_MINORS, FINGER_UPDATE4_DAILIES } from '../src/data/eventsFingerUpdate4.js';

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

const ringMaestro = member('Ring', 2);
assert.equal(matchesEventContext(LIFE_MINORS.find((e) => e.id === 'm_a_ring_gallery'), ringMaestro), false);
assert.equal(matchesEventContext(LIFE_MINORS.find((e) => e.id === 'm_career_ring_commission'), ringMaestro), false);
assert.equal(isEventEligible(FINGER_STORY_EVENTS.find((e) => e.id === 'ring_three_pieces'), ringMaestro), false);
assert.equal(isEventEligible(FINGER_STORY_EVENTS.find((e) => e.id === 'ring_atelier_critique'), ringMaestro), false);
assert.equal(isEventEligible(FINGER_STORY_EVENTS.find((e) => e.id === 'ring_signature_stamp'), member('Ring', 1)), false);
assert.equal(isEventEligible(FINGER_STORY_EVENTS.find((e) => e.id === 'ring_signature_stamp'), ringMaestro), true);
assert.equal(isEventEligible(FINGER_STORY_EVENTS.find((e) => e.id === 'thumb_market_tribute'), member('Thumb', 3)), false);
assert.equal(isEventEligible(FINGER_STORY_EVENTS.find((e) => e.id === 'pinky_sworn_blade_delivery'), member('Pinky', 0)), false);
assert.equal(matchesEventContext(FINGER_UPDATE4_MINORS.find((e) => e.id === 'm_ring_maestro_hanging'), ringMaestro), true);

for (const finger of FINGERS) {
  const senior = member(finger, 2);
  const junior = member(finger, 0);
  const scene = FINGER_UPDATE4_MINORS.find((e) => e.need.finger === finger);
  assert.equal(matchesEventContext(scene, senior), true);
  assert.equal(matchesEventContext(scene, junior), false);
  assert(FINGER_UPDATE4_DAILIES.filter((e) => e.need.finger === finger).length >= 3);
  for (const choice of scene.choices) {
    for (const result of choice.out || [choice]) {
      const fx = result.fx || {};
      assert((fx.health || 0) >= -12 && (fx.wealth || 0) >= -12 && (fx.merit || 0) <= 6, `${scene.id} reward or penalty out of range`);
    }
  }
  let ownDailies = 0;
  for (let i = 0; i < 150; i++) {
    const c = member(finger, 2);
    c.seed = `finger_daily_${finger}_${i}`;
    planYear(c, createRNG(c.seed));
    ownDailies += c.plan.filter((item) => item.kind === 'daily' && FINGER_DAILIES.some((d) => d.id === item.id && d.need.finger === finger)).length;
  }
  assert(ownDailies >= 90 && ownDailies <= 300, `${finger}: ${ownDailies} own dailies / 150 years`);
}

console.log('PASS: Finger mission tests');
