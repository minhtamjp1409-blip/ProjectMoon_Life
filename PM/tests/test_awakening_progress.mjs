import assert from 'node:assert/strict';
import { createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import { rememberResonance, hasEgoOpportunity, colorTrialAvailable } from '../src/engine/awakeningProgress.js';
import { driftOf } from '../src/engine/economyModel.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { SUPERNATURAL_EVENTS } from '../src/data/eventsSupernatural.js';
import { FIXER_PATH_EVENTS } from '../src/data/eventsFixerPath.js';

function candidate() {
  const c = createNewCharacter({ seed: 'awakening-regression', customName: 'Audit' });
  Object.assign(c, { age: 40, job: 'Fixer', fixerGrade: 1, merit: 400, resonance: 76, flags: [], seenEvents: [] });
  c.stats = { health: 100, sanity: 80, wealth: 100, network: 80, rep: 100 };
  return c;
}
const c = candidate();
rememberResonance(c, 8);
assert.equal(driftOf(c).resonance, undefined);
c.resonance = 30;
c.age = 42;
assert.equal(hasEgoOpportunity(c), true);
c.age = 43;
assert.equal(hasEgoOpportunity(c), false);
c.resonance = 90;
assert.ok(Math.abs(driftOf(c).resonance || 0) <= 1);
assert.equal(c.resonancePeak, 76);
assert.equal(JSON.parse(JSON.stringify(c)).resonancePeak, 76);

const trial = SUPERNATURAL_EVENTS.find(e => e.id === 'hana_color_ascension_trial');
for (const [roll, success] of [[0, true], [0.999, false]]) {
  const player = candidate();
  player.pendingEvent = trial;
  const result = resolveEventChoice(player, 1, () => roll);
  assert.equal(result.flags.includes('ColorFixer'), success);
  assert.equal(result.stats.wealth, 85);
  assert.equal(result.lastColorTrialAge, 40);
  assert.equal(colorTrialAvailable(result), false);
  if (!success) {
    result.age = 42;
    assert.equal(isEventEligible(trial, result, { scripted: true }), false);
    result.age = 43;
    result.stats.rep = 100;
    assert.equal(isEventEligible(trial, result, { scripted: true }), true);
    result.flags.push('ColorRefused');
    assert.equal(colorTrialAvailable(result), false);
  }
}
const legacy = candidate();
legacy.seenEvents.push(trial.id);
assert.equal(colorTrialAvailable(legacy), true);
const opening = SUPERNATURAL_EVENTS.find(e => e.id === 'fixer_seven_unclaimed_dossier');
const young = candidate(); young.age = 32; young.fixerGrade = 5;
assert.equal(isEventEligible(opening, young, { scripted: true }), true);
assert.equal(isEventEligible(opening, young), false);
young.job = 'Wing Employee';
assert.equal(isEventEligible(opening, young, { scripted: true }), false);
young.job = 'Fixer'; young.merit = 50; young.pendingEvent = opening;
const extracted = resolveEventChoice(young, 0, () => 0);
assert.equal(extracted.fixerGrade, 5);
assert.equal(extracted.merit, 110);
assert.ok(extracted.flags.includes('SevenWitnessExtracted'));
assert.ok(extracted.weaver.pendingThreads.some(t => t.eventId === 'fixer_seven_sealed_deposition'));
const followup = SUPERNATURAL_EVENTS.find(e => e.id === 'fixer_seven_sealed_deposition');
extracted.age = 33; extracted.stats.health = 100; extracted.pendingEvent = followup;
const witnessed = resolveEventChoice(extracted, 0, () => 0);
assert.equal(witnessed.fixerGrade, 5);
assert.equal(witnessed.merit, 270);
assert.ok(witnessed.flags.includes('SevenExceptionalRecord'));
const retained = [];
for (const exceptional of [false, true]) {
  const player = candidate(); player.fixerGrade = 5;
  if (exceptional) player.flags.push('SevenExceptionalRecord');
  player.pendingEvent = FIXER_PATH_EVENTS.find(e => e.id === 'fixer_promo_g4_exam');
  const promoted = resolveEventChoice(player, 0, () => 0);
  assert.equal(promoted.fixerGrade, 4);
  retained.push(promoted.merit);
}
assert.ok(retained[1] > retained[0]);
console.log('Awakening persistence, exact fee, Color success/failure and retry, legacy saves, route gates: passed');

// The early Seven lane must be offered by the Weaver, not only when a test hands it over
import { selectEventWithWeaverAI } from '../src/engine/weaverAI.js';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
{
  const p = candidate(); p.age = 32; p.fixerGrade = 5; p.merit = 60; p.resonance = 10;
  const offered = selectEventWithWeaverAI({ weaver: p.weaver, char: p, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0 });
  assert.equal(offered.event.id, 'fixer_seven_unclaimed_dossier');
  const never = selectEventWithWeaverAI({ weaver: p.weaver, char: p, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0.99 });
  assert.notEqual(never.event.id, 'fixer_seven_unclaimed_dossier');
  console.log('Weaver offers the early Seven lane as a chance, not a track: passed');
}
