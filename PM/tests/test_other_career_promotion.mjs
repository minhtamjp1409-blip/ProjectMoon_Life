import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, createRNG, getNextCareerMilestone, resolveEventChoice } from '../src/engine/gameEngine.js';
import {
  careerOpportunity, careerPromotionOfferChance, careerPromotionSuccessChance,
  careerTrialForEvent, getOtherCareerPromotion
} from '../src/engine/careerPipeline.js';
import { isEventEligible, selectEventWithWeaverAI } from '../src/engine/weaverAI.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
import { LIFE_MINORS, planYear, runPlanItem, syncPlanWithBackend } from '../src/engine/yearPlanner.js';
import { cityArchiveAPI } from '../src/services/api/cityArchiveAPI.js';
import { choiceIsAvailable } from '../src/engine/eventConditions.js';

const cases = [
  ['Thumb', 'm_career_thumb_ledger'], ['Index', 'm_career_index_prescript'],
  ['Middle', 'm_career_middle_vengeance'], ['Ring', 'm_career_ring_commission'],
  ['Pinky', 'm_career_pinky_oath'], ['Wing Employee', 'm_career_wing_review']
];

const careerCrossroad = ALL_STORY_EVENTS.find((event) => event.id === 'ad_career_crossroad_18');
const wingEntryChoice = careerCrossroad.choices.findIndex((choice) => choice.outcomes?.some((outcome) => outcome.setJob === 'Wing Employee'));
const wingEntrant = createNewCharacter({ seed: 'wing-probation', startAge: 18 });
wingEntrant.regionId = 'A';
wingEntrant.pendingEvent = careerCrossroad;
const hired = resolveEventChoice(wingEntrant, wingEntryChoice, () => 0);
assert.equal(hired.job, 'Wing Employee');
assert.equal(hired.wingRank, 0, 'Wing hiring must not skip the first appointment');

function candidate(route, seed = route) {
  const char = createNewCharacter({ seed: `career-${seed}`, startAge: 40 });
  char.job = route === 'Wing Employee' ? route : 'Syndicate';
  char.finger = char.job === 'Syndicate' ? route : null;
  char.fingerRank = 0;
  char.wingRank = 0;
  char.workshopRank = 0;
  char.regionId = 'A';
  char.merit = 30;
  char.stats.rep = 25;
  char.stats.wealth = 35;
  char.stats.network = 25;
  char.stats.health = 100;
  char.stats.sanity = 100;
  char.resonance = 20;
  char.weaver.pendingThreads = [];
  return char;
}

for (const [route, opportunityId] of cases) {
  const ready = candidate(route);
  const step = getOtherCareerPromotion(ready);
  assert.equal(step.isEligible, true, route);
  assert.ok(careerPromotionOfferChance(ready) > 0.5 && careerPromotionOfferChance(ready) < 0.9, route);
  assert.ok(careerPromotionSuccessChance(ready, step) < 0.9, route);
  const event = ALL_STORY_EVENTS.find((entry) => entry.id === step.eventId);
  assert.ok(event, route);
  assert.equal(careerTrialForEvent(event.id).rank, 1, route);
  assert.equal(isEventEligible(event, ready), true, route);
  const offered = selectEventWithWeaverAI({ weaver: ready.weaver, char: ready, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0 });
  assert.equal(careerTrialForEvent(offered.event?.id)?.route, step.route, route);
  const notOffered = selectEventWithWeaverAI({ weaver: ready.weaver, char: ready, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0.99 });
  assert.equal(careerTrialForEvent(notOffered.event?.id), null, route);

  const promotionChoice = event.choices.findIndex((choice) =>
    choice.setFingerRank === 1 || choice.setWingRank === 1);
  assert.ok(promotionChoice >= 0, route);
  ready.pendingEvent = event;
  const failed = resolveEventChoice(ready, promotionChoice, () => 0.99);
  assert.equal(getOtherCareerPromotion(failed)?.rank, 1, route);
  assert.equal(isEventEligible(event, failed), false, route);
  const prefix = step.route === 'finger' ? 'Finger' : 'Wing';
  assert.equal(failed[`last${prefix}TrialAge`], 40, route);
  assert.equal(failed[`${prefix.toLowerCase()}TrialRetryRank`], 1, route);
  failed.age = 41;
  failed.merit = 50;
  failed.stats.rep = 50;
  failed.stats.wealth = 50;
  failed.stats.network = 50;
  failed.stats.health = 100;
  failed.stats.sanity = 100;
  failed.resonance = 30;
  assert.equal(isEventEligible(event, failed), true, route);
  const retry = selectEventWithWeaverAI({ weaver: failed.weaver, char: failed, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0 });
  assert.equal(careerTrialForEvent(retry.event?.id)?.route, step.route, route);
  failed.pendingEvent = event;
  const passed = resolveEventChoice(failed, promotionChoice, () => 0);
  assert.equal(passed[`${step.route === 'finger' ? 'finger' : 'wing'}Rank`], 1, route);
  assert.equal(passed[`${prefix.toLowerCase()}TrialRetryRank`], null, route);

  const short = candidate(route, `${route}-short`);
  short.merit = 0;
  short.stats.rep = 0;
  short.stats.wealth = 0;
  short.stats.network = 0;
  short.resonance = 0;
  const opportunity = careerOpportunity(short);
  assert.equal(opportunity.id, opportunityId, route);
  assert.ok(opportunity.chance >= 0.6, route);
  const minor = LIFE_MINORS.find((entry) => entry.id === opportunityId);
  assert.ok(minor?.choices.length >= 2, route);
  let offers = 0;
  for (let i = 0; i < 80; i += 1) {
    const copy = candidate(route, `${route}-${i}`);
    copy.merit = short.merit;
    copy.stats.rep = short.stats.rep;
    copy.stats.wealth = short.stats.wealth;
    copy.stats.network = short.stats.network;
    copy.resonance = short.resonance;
    planYear(copy, createRNG(`career-opportunity-${route}-${i}`));
    offers += Number(copy.plan.some((item) => opportunity.ids.includes(item.id)));
  }
  assert.ok(offers >= 20 && offers <= 70, `${route}: ${offers}/80`);
}

for (const [route] of cases) {
  const premature = candidate(route, `${route}-premature-apex`);
  premature.fingerRank = premature.wingRank = 2;
  premature.lastFingerPromotionAge = premature.lastWingPromotionAge = premature.lastWorkshopPromotionAge = 35;
  premature.merit = 100;
  assert.equal(getOtherCareerPromotion(premature)?.isEligible, false, route);
  const blocked = selectEventWithWeaverAI({ weaver: premature.weaver, char: premature, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0 });
  assert.equal(careerTrialForEvent(blocked.event?.id), null, `${route}: no premature apex trial`);

  for (const rank of [2, 3]) {
    const ready = candidate(route, `${route}-rank-${rank}`);
    ready.fingerRank = ready.wingRank = rank - 1;
    ready.lastFingerPromotionAge = ready.lastWingPromotionAge = ready.lastWorkshopPromotionAge = 35;
    ready.merit = 200;
    ready.stats.rep = ready.stats.wealth = ready.stats.network = 95;
    ready.resonance = 70;
    const step = getOtherCareerPromotion(ready);
    assert.equal(step.rank, rank, route);
    assert.equal(step.isEligible, true, route);
    if (step.route === 'finger') {
      const requirements = getNextCareerMilestone(ready).requirements;
      assert.equal(requirements.find((item) => item.labelEn === 'Syndicate Merit')?.target, step.meritReq, route);
      assert.equal(requirements.find((item) => item.labelEn === 'Reputation')?.target, step.repReq, route);
    }
    const rankKey = step.route === 'finger' ? 'fingerRank' : 'wingRank';
    const choiceKey = step.route === 'finger' ? 'setFingerRank' : 'setWingRank';
    for (const id of step.eventIds || [step.eventId]) {
      const event = ALL_STORY_EVENTS.find((entry) => entry.id === id);
      assert.ok(event && isEventEligible(event, ready), `${route} rank ${rank}: ${id}`);
      const choiceIndex = event.choices.findIndex((choice) => choice[choiceKey] === rank && choiceIsAvailable(choice, ready));
      assert.ok(choiceIndex >= 0, `${route} rank ${rank}: ${id}`);
      const copy = structuredClone(ready);
      copy.pendingEvent = event;
      const passed = resolveEventChoice(copy, choiceIndex, () => 0);
      assert.equal(passed[rankKey], rank, `${route} rank ${rank}: ${id}`);
      assert.equal(getOtherCareerPromotion(passed)?.rank ?? null, rank === 3 ? null : rank + 1, `${route} rank ${rank}: ${id}`);
    }
  }
}

const originalPlanYear = cityArchiveAPI.planYear;
try {
  let wing;
  let found = false;
  for (let i = 0; i < 80; i += 1) {
    const copy = candidate('Wing Employee', `backend-wing-${i}`);
    copy.merit = 0;
    copy.stats.network = 0;
    copy.stats.wealth = 0;
    planYear(copy, createRNG(`backend-wing-${i}`));
    if (copy.plan.some((item) => careerOpportunity(copy).ids.includes(item.id))) {
      wing = copy;
      found = true;
      break;
    }
  }
  assert.ok(found);
  cityArchiveAPI.planYear = async () => ({ moments: ['Spring', 'Summer', 'Autumn', 'Winter'].map((season, seasonIdx) => ({ kind: 'daily', t: 0.1 + seasonIdx * 0.25, season, seasonIdx })) });
  await syncPlanWithBackend(wing, createRNG('career-wing-sync'));
  assert.ok(wing.plan.some((item) => careerOpportunity(wing).ids.includes(item.id)));

  const readyWing = candidate('Wing Employee', 'backend-trial');
  planYear(readyWing, createRNG('backend-trial-local'));
  cityArchiveAPI.planYear = async () => ({ moments: [{ kind: 'major', id: 'wing_promo_feather_r1', forcedEventId: 'wing_promo_feather_r1', t: 0.8, season: 'Winter', seasonIdx: 3 }] });
  await syncPlanWithBackend(readyWing, createRNG('backend-trial-hydrate'));
  const hydratedTrial = readyWing.plan.find((item) => item.kind === 'major');
  assert.equal(hydratedTrial.forcedEventId, '');
  const withheld = runPlanItem(readyWing, hydratedTrial, () => 0.99);
  assert.ok(!careerTrialForEvent(withheld.pendingEvent?.id));
} finally {
  cityArchiveAPI.planYear = originalPlanYear;
}

console.log('Other career routes: distinct opportunities, offers, failed trials, retry, rank progression and backend hydration passed.');
