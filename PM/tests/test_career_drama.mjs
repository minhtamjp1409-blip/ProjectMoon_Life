import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, createRNG, getNextCareerMilestone, resolveEventChoice } from '../src/engine/gameEngine.js';
import { getOtherCareerPromotion, RETIRED_WORKSHOP_TRIAL_IDS } from '../src/engine/careerPipeline.js';
import { isEventEligible, selectEventWithWeaverAI } from '../src/engine/weaverAI.js';
import { planYear } from '../src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';

const byId = (id) => {
  const event = ALL_STORY_EVENTS.find((entry) => entry.id === id);
  assert.ok(event, id);
  return event;
};
const candidate = (job, finger = null) => {
  const char = createNewCharacter({ seed: `drama-${job}-${finger}`, startAge: 30 });
  char.job = job;
  char.finger = finger;
  char.fingerRank = 1;
  char.fixerGrade = 6;
  char.wingRank = 1;
  char.npcs.friend = { role: 'friend', nameVi: 'Minh', nameEn: 'Minh', status: 'alive', bond: 70 };
  char.npcs.partner = { role: 'partner', nameVi: 'Lan', nameEn: 'Lan', status: 'alive', bond: 70 };
  char.weaver.pendingThreads = [];
  return char;
};

const routes = [
  ['drama_index_name_on_prescript', 'Syndicate', 'Index'],
  ['drama_middle_book_entry', 'Syndicate', 'Middle'],
  ['drama_ring_ward', 'Syndicate', 'Ring'],
  ['drama_thumb_missing_seal', 'Syndicate', 'Thumb'],
  ['drama_pinky_oath_witness', 'Syndicate', 'Pinky'],
  ['drama_fixer_unpaid_request', 'Fixer', null],
  ['drama_fixer_association_report', 'Fixer', null],
  ['drama_fixer_office_payroll', 'Fixer', null],
  ['drama_wing_quota_sheet', 'Wing Employee', null],
  ['drama_wing_sealed_room', 'Wing Employee', null]
];
for (const [id, job, finger] of routes) {
  assert.equal(isEventEligible(byId(id), candidate(job, finger)), true, `${id} in its route`);
  assert.equal(isEventEligible(byId(id), candidate('Workshop Craftsman')), false, `${id} outside its route`);
}
for (const [job, finger] of [['Fixer', null], ['Wing Employee', null], ...['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'].map((name) => ['Syndicate', name])]) {
  const expected = routes.filter(([, routeJob, routeFinger]) => routeJob === job && routeFinger === finger).map(([id]) => id);
  const hits = new Set();
  for (let seed = 0; seed < 300; seed += 1) {
    const char = candidate(job, finger);
    char.merit = 0;
    char.stats.rep = 10;
    char.stats.wealth = 40;
    const { event } = selectEventWithWeaverAI({
      weaver: char.weaver, char, allPools: ALL_STORY_EVENTS,
      consequencePool: CONSEQUENCE_EVENTS, rng: createRNG(`career-drama-draw-${job}-${finger}-${seed}`)
    });
    if (event) hits.add(event.id);
  }
  for (const id of expected) assert.ok(hits.has(id), `${id} must enter the random draw for ${job}/${finger}`);
}
for (const [seedId, callbackId, job, finger, choiceIndex, delay] of [
  ['drama_index_name_on_prescript', 'drama_index_unanswered_prescript', 'Syndicate', 'Index', 1, 2],
  ['drama_middle_book_entry', 'drama_middle_ink_witness', 'Syndicate', 'Middle', 0, 1],
  ['drama_fixer_unpaid_request', 'drama_fixer_receipt', 'Fixer', null, 0, 2],
  ['drama_wing_quota_sheet', 'drama_wing_copy_audit', 'Wing Employee', null, 1, 2]
]) {
  const char = candidate(job, finger);
  char.pendingEvent = byId(seedId);
  const chosen = resolveEventChoice(char, choiceIndex, createRNG(`callback-${seedId}`));
  assert.ok(chosen.weaver.pendingThreads.some((thread) => thread.eventId === callbackId && thread.triggerAge === 30 + delay));
  assert.equal(isEventEligible(byId(callbackId), chosen), false, `${callbackId} not early`);
  chosen.age = 30 + delay;
  assert.equal(isEventEligible(byId(callbackId), chosen), true, `${callbackId} due`);
  planYear(chosen, createRNG(`due-${callbackId}`));
  assert.ok(chosen.plan.some((item) => item.forcedEventId === callbackId), `${callbackId} forced into the year`);
}
const index = candidate('Syndicate', 'Index');
index.fingerRank = 0;
assert.equal(isEventEligible(byId('drama_index_name_on_prescript'), index), false);

const ring = candidate('Syndicate', 'Ring');
ring.pendingEvent = byId('drama_ring_ward');
const adopted = resolveEventChoice(ring, 0, createRNG('ring-adoption'));
assert.ok(adopted.npcs.ward?.nameVi);
assert.equal(adopted.npcs.ward.ageAtMeet, 10);
assert.equal(adopted.npcs.child?.nameVi, ring.npcs.child?.nameVi, 'ward is not a biological heir');
assert.ok(adopted.weaver.pendingThreads.some((thread) => thread.eventId === 'drama_ring_exhibition' && thread.triggerAge === 33));
assert.equal(isEventEligible(byId('drama_ring_exhibition'), adopted), false, 'callback waits three years');
adopted.age = 33;
assert.equal(isEventEligible(byId('drama_ring_exhibition'), adopted), true);
planYear(adopted, createRNG('ring-third-year'));
assert.ok(adopted.plan.some((item) => item.forcedEventId === 'drama_ring_exhibition'));
adopted.pendingEvent = byId('drama_ring_exhibition');
const rescued = resolveEventChoice(adopted, 0, createRNG('ring-rescue'));
assert.equal(rescued.npcs.ward.status, 'alive');
assert.ok(rescued.memory.some((entry) => entry.key === 'ring_ward_escaped'));

const workshop = candidate('Workshop Craftsman');
workshop.merit = 200;
workshop.stats.wealth = 100;
workshop.resonance = 100;
assert.equal(getOtherCareerPromotion(workshop), null);
assert.equal(getNextCareerMilestone(workshop).category, 'WORKSHOP');
for (const id of RETIRED_WORKSHOP_TRIAL_IDS) {
  assert.equal(isEventEligible({ id, choices: [] }, workshop), false, id);
}

console.log('Career drama: route gates, seeded draws, delayed callbacks, Ring ward and retired Workshop progression passed.');
