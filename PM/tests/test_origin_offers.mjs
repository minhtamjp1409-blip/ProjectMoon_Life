import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import { careerCrossroadIdFor, CAREER_CROSSROAD_IDS } from '../src/engine/careerAge.js';
import { fingersReachingOut } from '../src/engine/fingerPull.js';
import { choiceIsAvailable } from '../src/engine/eventConditions.js';
import { isEventEligible } from '../src/engine/weaverAI.js';

console.log('--- RUNNING ORIGIN OFFER TESTS ---');

const byId = new Map(ALL_STORY_EVENTS.map((e) => [e.id, e]));
const jobsOf = (event) => [...new Set(event.choices.flatMap((c) => (c.outcomes || [c]).map((o) => o.setJob || c.setJob).filter(Boolean)))].sort();
const child = (seed, flags = [], regionId = 'K') => {
  const c = createNewCharacter({ seed, startAge: 18 });
  c.job = 'Child'; c.alive = true; c.regionId = regionId; c.age = 18; c.careerAge = 18;
  c.flags = flags.slice();
  c.seenEvents = [];
  return c;
};

console.log('1. Each upbringing meets its own working-age crossroad...');
assert.strictEqual(careerCrossroadIdFor(child('o-back')), 'ad_career_crossroad_18');
assert.strictEqual(careerCrossroadIdFor(child('o-nest', ['Nest'], 'A')), 'ad_nest_crossroad_18');
assert.strictEqual(careerCrossroadIdFor(child('o-feather', ['Feather'], 'A')), 'ad_nest_crossroad_18');
assert.strictEqual(careerCrossroadIdFor(child('o-out', ['Outskirts'], 'OUTSKIRTS')), 'ad_outskirts_crossroad_18');
for (const id of CAREER_CROSSROAD_IDS) assert(byId.get(id), `${id} must exist`);

console.log('2. Only the matching crossroad is eligible...');
for (const [label, ch] of [['back', child('e-back')], ['nest', child('e-nest', ['Nest'], 'A')], ['out', child('e-out', ['Outskirts'], 'OUTSKIRTS')]]) {
  const own = careerCrossroadIdFor(ch);
  for (const id of CAREER_CROSSROAD_IDS) {
    assert.strictEqual(isEventEligible(byId.get(id), ch, { scripted: true }), id === own, `${label}: ${id} eligibility`);
  }
}

console.log('3. The Nest crossroad keeps the same career set and no Backstreets scenery...');
const nest = byId.get('ad_nest_crossroad_18');
assert.deepStrictEqual(jobsOf(nest), ['Fixer', 'Outcast', 'Syndicate', 'Wing Employee']);
assert(nest.choices.every((c) => !c.setJob && c.outcomes?.some((o) => o.setJob === 'Outcast')), 'each application has a playable failure');
assert(!/mái hiên rách nát của Backstreets/.test(nest.vi), 'the Nest intro must not stand a child under a Backstreets awning');
assert(/Nest/.test(nest.vi) && /Nest/.test(nest.en), 'the Nest intro names the Nest');
assert(!/Backstreets/.test(nest.choices[0].outcomes[0].resultVi), 'a sponsored Hana application is not a Backstreets scene');

console.log('4. A sponsored Fixer licence carries no loan note...');
const sponsored = nest.choices[0].outcomes[0];
assert(!sponsored.debtsAdd && !(sponsored.flagsAdd || []).includes('FixerLicenseDebt'), 'a family sponsor pays the fee');

console.log('5. Leaving the Nest for a Syndicate drops the Nest flags...');
const leave = nest.choices[2];
assert(leave.outcomes.every((o) => (o.flagsRemove || []).includes('Nest')), 'a child who walks out is no longer a Nest resident');

console.log('6. Three Fingers reach out, the same ones every time for one life...');
const syn = (seed, regionId, extra = {}) => {
  const c = createNewCharacter({ seed, startAge: 24 });
  c.job = 'Syndicate'; c.alive = true; c.regionId = regionId; c.flags = [];
  Object.assign(c, extra);
  return c;
};
const seen = new Map();
for (let i = 0; i < 300; i++) {
  const region = ['K', 'J', 'T', 'A', 'C', 'H', 'N'][i % 7];
  const c = syn(`pull-${i}`, region);
  const first = fingersReachingOut(c);
  assert.strictEqual(first.length, 3);
  assert.strictEqual(new Set(first).size, 3, 'no Finger is listed twice');
  assert.deepStrictEqual(fingersReachingOut(c), first, 'same life, same letters');
  for (const f of first) seen.set(f, (seen.get(f) || 0) + 1);
}
for (const f of ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky']) {
  assert((seen.get(f) || 0) > 45, `${f} should reach out in a fair share of lives (got ${seen.get(f) || 0}/300)`);
  assert((seen.get(f) || 0) < 255, `${f} must not reach out in nearly every life (got ${seen.get(f)}/300)`);
}

console.log('7. The allegiance event only offers Fingers that reached out, and refusing stays open...');
const allegiance = byId.get('syn_choose_finger_allegiance');
const fingerChoices = allegiance.choices.filter((c) => c.need?.fingerInvited);
assert.strictEqual(fingerChoices.length, 5, 'each Finger choice states who has to notice you');
const subject = syn('allegiance-subject', 'K');
const invited = new Set(fingersReachingOut(subject));
const open = fingerChoices.filter((c) => choiceIsAvailable(c, subject)).map((c) => c.need.fingerInvited);
assert.deepStrictEqual(new Set(open), invited, 'the open choices are exactly the Fingers that wrote');
const refusal = allegiance.choices.find((c) => !c.need?.fingerInvited);
assert(refusal && choiceIsAvailable(refusal, subject), 'the independent option is always open');

console.log('8. Picking a Finger that never wrote is rejected...');
const silent = fingerChoices.find((c) => !invited.has(c.need.fingerInvited));
subject.pendingEvent = allegiance;
const before = JSON.stringify([subject.finger, subject.job]);
const after = resolveEventChoice(subject, allegiance.choices.indexOf(silent), () => 0.1);
assert.strictEqual(JSON.stringify([after.finger, after.job]), before, 'the choice must not apply');

console.log('PASS: origin offer tests');
