import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import { FIXER_LADDER, fixerPromotionOfferChance, fixerPromotionSuccessChance, fixerPromotionFailureEffects, getNextFixerPromotion } from '../src/engine/careerPipeline.js';
import { driftOf } from '../src/engine/economyModel.js';
import { isEventEligible, selectEventWithWeaverAI } from '../src/engine/weaverAI.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
import { endYear, planYear, runPlanItem } from '../src/engine/yearPlanner.js';

const fixer = createNewCharacter({ seed: 'fixer-exam-retry', startAge: 45 });
fixer.job = 'Fixer';
fixer.fixerGrade = 3;
fixer.merit = 150;
fixer.stats.rep = 82;
fixer.stats.health = 100;
fixer.stats.sanity = 100;
fixer.stats.wealth = 100;
fixer.regionId = 'A';

const next = getNextFixerPromotion(fixer);
assert.equal(next.grade, 2);
assert.equal(next.isEligible, true);
assert.equal(fixerPromotionOfferChance(fixer, next), 0.55);
assert.ok(fixerPromotionSuccessChance(fixer, 2) < fixerPromotionSuccessChance({ ...fixer, fixerGrade: 9 }, 8));
const surplus = { ...fixer, merit: 180, stats: { ...fixer.stats, rep: 96 } };
assert.ok(fixerPromotionOfferChance(surplus) > fixerPromotionOfferChance(fixer));
assert.ok(fixerPromotionSuccessChance(surplus, 2) > fixerPromotionSuccessChance(fixer, 2));
assert.ok(Math.abs(fixerPromotionFailureEffects(1).health) > Math.abs(fixerPromotionFailureEffects(8).health));
assert.ok(Math.abs(fixerPromotionFailureEffects(1).wealth) > Math.abs(fixerPromotionFailureEffects(8).wealth));

const protectedDrift = driftOf(fixer, 0, { merit: next.meritReq, rep: next.repReq });
assert.equal(protectedDrift.rep, undefined);
assert.equal(protectedDrift.merit, undefined);
const yearEnd = endYear(fixer, () => 0.5);
assert.ok(yearEnd.stats.rep >= 82);
assert.ok(yearEnd.merit >= 150);

const event = ALL_STORY_EVENTS.find((entry) => entry.id === 'fixer_promo_g2_exam');
assert.ok(event);
const oldFixer = { ...fixer, age: 100 };
assert.equal(isEventEligible(event, oldFixer), true);
const offered = selectEventWithWeaverAI({ weaver: fixer.weaver, char: fixer, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0.5 });
assert.ok(offered.event?.id.startsWith('fixer_promo_g2_'));
const notOffered = selectEventWithWeaverAI({ weaver: fixer.weaver, char: fixer, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0.99 });
assert.ok(!notOffered.event?.id.startsWith('fixer_promo_'));

const shown = runPlanItem({ ...fixer, pendingEvent: null }, { kind: 'major', forcedEventId: event.id, t: 0.8 }, () => 0.5);
assert.match(shown.pendingEvent.displayVi, /Tỉ lệ đỗ hiện tại: \d+%/);
assert.match(shown.pendingEvent.displayVi, /Nếu trượt: -17 HP, -29 Ahn, -8 SP/);
const failed = resolveEventChoice(shown, 0, () => 0.99);
assert.equal(failed.fixerGrade, 3);
assert.equal(failed.lastFixerExamAge, 45);
assert.equal(failed.fixerTrialRetryGrade, 2);
assert.equal(failed.stats.health, 83);
assert.equal(failed.stats.wealth, 71);
assert.equal(failed.stats.rep, 82);
assert.equal(isEventEligible(event, failed), false);
failed.age = 46;
assert.equal(isEventEligible(event, failed), true);
const retryPlan = planYear({ ...failed, plan: [] }, () => 0.5);
assert.ok(retryPlan.plan.some((item) => item.kind === 'major' && !item.forcedEventId));
const retryOffer = selectEventWithWeaverAI({ weaver: failed.weaver, char: failed, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0.99 });
assert.ok(retryOffer.event?.id.startsWith('fixer_promo_g2_'));

failed.pendingEvent = event;
const passed = resolveEventChoice(failed, 0, () => 0);
assert.equal(passed.fixerGrade, 2);
assert.ok(passed.flags.includes('promo_g2_done'));
assert.equal(passed.lastFixerExamAge, 46);
assert.equal(passed.fixerTrialRetryGrade, null);
passed.merit = 210;
passed.stats.rep = 95;
const nextGradeEvent = ALL_STORY_EVENTS.find((entry) => entry.id === 'fixer_promo_g1_exam');
assert.equal(isEventEligible(nextGradeEvent, passed), false);
passed.age = 47;
assert.equal(isEventEligible(nextGradeEvent, passed), true);

const deferred = resolveEventChoice({ ...shown, pendingEvent: event }, 2, () => 0.5);
assert.equal(deferred.fixerGrade, 3);
assert.equal(deferred.lastFixerExamAge, 45);
assert.equal(deferred.fixerTrialRetryGrade, 2);
deferred.age = 46;
assert.equal(isEventEligible(event, deferred), true);
const deferredOffer = selectEventWithWeaverAI({ weaver: deferred.weaver, char: deferred, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0.99 });
assert.ok(deferredOffer.event?.id.startsWith('fixer_promo_g2_'));

for (const step of FIXER_LADDER) {
  const variants = ALL_STORY_EVENTS.filter((entry) => entry.id.startsWith(`fixer_promo_g${step.grade}_`));
  assert.equal(variants.length, 3);
  assert.ok(variants.every((entry) => entry.age[1] === 140));
}

console.log('Fixer promotion regressions: score-weighted offers, safe threshold drift, failed/deferred retries, rank-scaled penalties, cooldown and age gates passed.');
