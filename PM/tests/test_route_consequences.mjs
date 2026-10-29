import assert from 'node:assert/strict';
import { createNewCharacter, createRNG, resolveEventChoice, ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { LIFE_MINORS, JOB_INCOME, planYear } from '../src/engine/yearPlanner.js';
import { isEventEligible, selectEventWithWeaverAI } from '../src/engine/weaverAI.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';

const byId = (id) => {
  const event = ALL_STORY_EVENTS.find((item) => item.id === id) || LIFE_MINORS.find((item) => item.id === id);
  assert.ok(event, `Missing scene ${id}`);
  return event;
};

const career = byId('ad_career_crossroad_18');
for (const [choiceIndex, job] of [[0, 'Fixer'], [1, 'Syndicate'], [2, 'Wing Employee']]) {
  const hired = createNewCharacter({ seed: `route-hired-${choiceIndex}`, startAge: 18 });
  hired.job = 'Child';
  hired.pendingEvent = career;
  const success = resolveEventChoice(hired, choiceIndex, () => 0);
  assert.equal(success.job, job, `${job} application should be able to succeed`);
  const rejected = createNewCharacter({ seed: `route-rejected-${choiceIndex}`, startAge: 18 });
  rejected.job = 'Child';
  rejected.pendingEvent = career;
  const failure = resolveEventChoice(rejected, choiceIndex, () => 0.999999);
  assert.equal(failure.job, 'Outcast', `${job} rejection should remain playable`);
  assert.equal(isEventEligible(byId('ad_career_second_application'), { ...failure, age: 19, pendingEvent: null }), true);
  failure.age = 19;
  planYear(failure, () => 0.5);
  assert.ok(failure.plan.some((item) => item.forcedEventId === 'ad_career_second_application'), 'Rejected applicant must get another offer next year');
}
const retry = createNewCharacter({ seed: 'route-retry', startAge: 19 });
retry.job = 'Outcast';
retry.flags.push('CareerApplicationFailed');
const retryEvent = byId('ad_career_second_application');
retry.pendingEvent = retryEvent;
const retryFailure = resolveEventChoice(retry, 2, () => 0.999999);
assert.equal(retryFailure.job, 'Outcast');
assert.equal(isEventEligible(retryEvent, retryFailure), false, 'Only one application attempt per year');
retryFailure.age += 1;
assert.equal(isEventEligible(retryEvent, retryFailure), true, 'Rejected applicant gets another chance next year');
const earlyFailure = createNewCharacter({ seed: 'route-early-retry', startAge: 15 });
earlyFailure.job = 'Outcast';
earlyFailure.flags.push('CareerApplicationFailed');
earlyFailure.lastCareerApplicationAge = 15;
earlyFailure.age = 16;
assert.equal(isEventEligible(retryEvent, earlyFailure), true);
planYear(earlyFailure, () => 0.5);
assert.ok(earlyFailure.plan.some((item) => item.forcedEventId === retryEvent.id), 'A 15-year-old who starts working can retry the following year');

const wing = createNewCharacter({ seed: 'route-wing', startAge: 32 });
wing.job = 'Wing Employee';
wing.wingRank = 1;
wing.regionId = 'K';
wing.wingEmployerId = 'K';
assert.equal(matchesEventContext(byId('wing_kcorp_tears_harvest'), wing), true);
assert.equal(matchesEventContext(byId('wing_wcorp_first_class_cleanup'), wing), false);
assert.equal(matchesEventContext(byId('m_wing_kcorp_ampoule_defect'), wing), true);
assert.equal(matchesEventContext(byId('m_wing_tcorp_time_tax_leak'), wing), false);
assert.equal(isEventEligible(byId('wing_route_kcorp_recall'), wing), true);
for (const id of ['wing_route_tcorp_missing_hours', 'wing_route_wcorp_unclaimed_bag', 'wing_route_rcorp_batch_roster']) {
  assert.equal(isEventEligible(byId(id), wing), false, `${id} must belong to its own Wing`);
}
wing.regionId = 'W';
assert.equal(matchesEventContext(byId('wing_kcorp_tears_harvest'), wing), true, 'Moving districts must not change the employer');
assert.equal(matchesEventContext(byId('wing_wcorp_first_class_cleanup'), wing), false);

const distorted = createNewCharacter({ seed: 'route-distortion', startAge: 22 });
distorted.job = 'Distortion';
distorted.flags.push('Distorted');
distorted.merit = 0;
distorted.stats.rep = 0;
distorted.heat = 0;
const stars = ['distort_star_of_city_rampage', 'distort_arc_star_calamity_ascension'];
for (const id of stars) assert.equal(isEventEligible(byId(id), distorted), false, `${id} appeared too early`);
distorted.heat = 35;
distorted.age = 23;
assert.equal(isEventEligible(byId('distort_route_first_hana_notice'), distorted), true);
assert.equal(isEventEligible(byId('distort_route_neighborhood_quarantine'), distorted), false);
distorted.merit = 105;
distorted.stats.rep = 68;
distorted.heat = 65;
distorted.age = 32;
for (const id of stars) assert.equal(isEventEligible(byId(id), distorted), true, `${id} never became eligible`);
distorted.activeArcs = [{ id: 'arc_carmen_distortion_abyss', status: 'active', currentStage: 2 }];
for (const id of stars) assert.equal(isEventEligible(byId(id), distorted), false, 'Star must wait for earlier Carmen chapters');
distorted.activeArcs[0].currentStage = 3;
distorted.weaver.pendingThreads = [{ id: 'star-arc', eventId: stars[0], triggerAge: 32, fulfilled: false }];
distorted.pendingEvent = byId(stars[1]);
const alternateStar = resolveEventChoice(distorted, 1, () => 0);
assert.ok(alternateStar.unlockedRecords.includes('arc_completed_arc_carmen_distortion_abyss'), 'Alternate Star scene must complete the arc');
assert.equal(alternateStar.weaver.pendingThreads.find((thread) => thread.id === 'star-arc').fulfilled, true);
distorted.activeArcs = [];
distorted.weaver.pendingThreads = [];
distorted.flags.push('StarOfTheCityEntity');
assert.equal(isEventEligible(byId('distort_arc_star_calamity_ascension'), distorted), false);

const indie = createNewCharacter({ seed: 'route-indie', startAge: 25 });
indie.job = 'Syndicate';
indie.finger = null;
indie.flags.push('IndependentSyndicate');
for (const [rank, income] of [[0, 3], [1, 5], [2, 7], [3, 9]]) {
  indie.syndicateRank = rank;
  assert.equal(JOB_INCOME(indie), income, `Independent rank ${rank} did not affect pay`);
}
indie.syndicateRank = 1;
assert.equal(isEventEligible(byId('syn_indie_route_shared_ledger'), indie), true);
assert.equal(isEventEligible(byId('syn_indie_route_border_dispute'), indie), false);
indie.syndicateRank = 2;
assert.equal(isEventEligible(byId('syn_indie_route_border_dispute'), indie), true);
indie.finger = 'Thumb';
assert.equal(isEventEligible(byId('syn_indie_route_shared_ledger'), indie), false);
assert.equal(JOB_INCOME(indie), 3, 'Finger earnings must use the Finger ladder');

const targeted = createNewCharacter({ seed: 'indie-targeted', startAge: 30 });
targeted.job = 'Syndicate';
targeted.finger = null;
targeted.syndicateRank = 2;
targeted.flags.push('IndependentSyndicate');
const seen = new Set();
for (let i = 0; i < 500; i++) {
  const result = selectEventWithWeaverAI({ weaver: targeted.weaver, char: targeted, allPools: ALL_STORY_EVENTS,
    consequencePool: CONSEQUENCE_EVENTS, rng: createRNG(`indie-targeted-${i}`) });
  if (result.event) seen.add(result.event.id);
}
for (const id of ['syn_indie_route_shared_ledger', 'syn_indie_route_border_dispute']) {
  assert.ok(seen.has(id), `${id} must be selectable in a 500-seed eligible pool`);
}

console.log('Route employer, Distortion threat stage, and independent Syndicate income/scenes: OK');
