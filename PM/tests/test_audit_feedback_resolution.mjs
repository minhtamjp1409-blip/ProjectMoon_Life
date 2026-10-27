import assert from 'node:assert/strict';
import {
  createNewCharacter,
  resolveEventChoice,
  getNextCareerMilestone,
  getEgoReadiness,
  ALL_STORY_EVENTS
} from '../src/engine/gameEngine.js';
import { getScarProfile } from '../src/engine/scarModel.js';
import { isColorProdigyEligible, checkColorFixerReadiness, triggerDistortionTransformation } from '../src/engine/careerPipeline.js';
import { hasEgoOpportunity, rememberResonance } from '../src/engine/awakeningProgress.js';
import { applyAnnualPlan } from '../src/engine/annualPlan.js';
import { endYear, runPlanItem } from '../src/engine/yearPlanner.js';
import { advanceActiveNarrativeArcs } from '../src/engine/narrativeArcEngine.js';

console.log('=== TEST SUITE: AUDIT FEEDBACK & HARMONIZATION RESOLUTION ===');

// ----------------------------------------------------------------------------
// 1. E.G.O THRESHOLD ACCURACY & UNDER-18 GUARDS
// ----------------------------------------------------------------------------
console.log('1. Testing E.G.O readiness alignment with awakeningProgress...');
{
  // Underage check (age 17)
  const child = createNewCharacter({ seed: 'ego-child', startAge: 17 });
  child.resonance = 85;
  child.stats.sanity = 20;
  const childReadiness = getEgoReadiness(child);
  assert.equal(childReadiness.status, 'dormant', 'Underage characters must not report imminent EGO');
  assert.ok(childReadiness.labelVi.includes('Chưa Đủ 18 Tuổi'));

  // 70 Resonance, 60 SP: Reported in audit as false 'imminent', now accurately 'stirring'
  const adult70 = createNewCharacter({ seed: 'ego-adult-70', startAge: 25 });
  adult70.resonance = 70;
  adult70.stats.sanity = 60;
  rememberResonance(adult70);
  assert.equal(hasEgoOpportunity(adult70), false);
  const adult70Readiness = getEgoReadiness(adult70);
  assert.equal(adult70Readiness.status, 'stirring', 'Resonance 70 with 60 SP must be stirring, not imminent');

  // Apex Resonance >= 74
  const adult75 = createNewCharacter({ seed: 'ego-adult-75', startAge: 25 });
  adult75.resonance = 75;
  rememberResonance(adult75);
  assert.equal(hasEgoOpportunity(adult75), true);
  assert.equal(getEgoReadiness(adult75).status, 'imminent');

  // Crisis condition: Resonance 64 (>= 62) + Sanity 30 (<= 38) + 1 Scar
  const adultCrisis = createNewCharacter({ seed: 'ego-adult-crisis', startAge: 25 });
  adultCrisis.resonance = 64;
  adultCrisis.stats.sanity = 30;
  adultCrisis.scars = ['Vết sẹo của Star of the City'];
  rememberResonance(adultCrisis);
  assert.equal(hasEgoOpportunity(adultCrisis), true);
  assert.equal(getEgoReadiness(adultCrisis).status, 'imminent');
  console.log('  ✓ E.G.O threshold & underage checks fully match mechanical reality.');
}

// ----------------------------------------------------------------------------
// 2. COLOR PRODIGY MILESTONE PRIORITY OVER REGULAR FIXER LADDER
// ----------------------------------------------------------------------------
console.log('2. Testing Color Prodigy milestone priority for Grade 2-3 Fixers...');
{
  const prodigyG2 = createNewCharacter({ seed: 'prodigy-g2-milestone', startAge: 28 });
  prodigyG2.job = 'Fixer';
  prodigyG2.fixerGrade = 2;
  prodigyG2.merit = 155;
  prodigyG2.stats.rep = 82;
  prodigyG2.flags = ['EGOAwakened'];

  assert.equal(isColorProdigyEligible(prodigyG2), true);
  assert.equal(checkColorFixerReadiness(prodigyG2).ready, true);

  const milestone = getNextCareerMilestone(prodigyG2);
  assert.equal(milestone.category, 'STAR OF THE CITY ORDEAL');
  assert.equal(milestone.titleVi, 'Đại Khảo Thí Phong Color (Hana Đặc Cách Thần Đồng)');
  assert.ok(milestone.tipVi.includes('Thần Đồng Đặc Cách'));
  console.log('  ✓ Color Prodigy correctly preempts standard Grade 1 promotion.');
}

// ----------------------------------------------------------------------------
// 3. COLOR SCAR PROFILES (NO UNMAPPED SCARS)
// ----------------------------------------------------------------------------
console.log('3. Testing Color trial scars mapped to active profiles...');
{
  const scarsToTest = [
    { name: 'Vết sẹo của Star of the City', expectedTag: 'injury' },
    { name: 'Ký ức đẫm máu cùng cộng sự', expectedTag: 'trauma' },
    { name: 'Bản đồ giải phẫu Star of the City', expectedTag: 'witness' },
    { name: 'Cơn hoảng loạn tại vòng khảo thí', expectedTag: 'trauma' },
    { name: 'Người từ chối làm Color', expectedTag: 'witness' },
    { name: 'Ký ức người cộng sự đã ngã xuống', expectedTag: 'trauma' }
  ];

  for (const { name, expectedTag } of scarsToTest) {
    const profile = getScarProfile(name);
    assert.ok(profile, `Scar "${name}" must have a profile and not be null/UNMAPPED`);
    assert.equal(profile.tag, expectedTag, `Scar "${name}" should map to tag "${expectedTag}"`);
  }
  console.log('  ✓ All Color trial scars successfully map to active profiles.');
}

// ----------------------------------------------------------------------------
// 4. COLOR TRIAL COMPANION SHIELD & AFTERMATH CAUSAL CHAIN
// ----------------------------------------------------------------------------
console.log('4. Testing Color trial companion shield & alive/fallen aftermath...');
{
  const trialEvent = ALL_STORY_EVENTS.find(e => e.id === 'hana_color_ascension_trial');
  assert.ok(trialEvent);
  const companionChoice = trialEvent.choices[2];
  assert.ok(companionChoice.labelVi.includes('cộng sự'));
  assert.equal(companionChoice.need.companionActive, true);

  // Test branch with living partner
  const player = createNewCharacter({ seed: 'trial-partner-live', startAge: 30 });
  player.job = 'Fixer';
  player.fixerGrade = 1;
  player.npcs = {
    partner: { role: 'partner', nameVi: 'Kael', status: 'alive', bond: 60 }
  };
  player.pendingEvent = trialEvent;
  const afterTrial = resolveEventChoice(player, 2, () => 0.1); // Win roll
  assert.ok(afterTrial.flags.includes('ColorFixer'));
  assert.ok(afterTrial.flags.includes('PartnerShieldedYouInColorTrial'));
  assert.ok(afterTrial.weaver.pendingThreads.some(t => t.eventId === 'csq_color_sponsor_aftermath'));

  // Next year: Partner is still alive -> csq_color_sponsor_aftermath is planned and executed
  afterTrial.pendingEvent = null;
  const nextYearLive = endYear(afterTrial, () => 0.5);
  const majorLiveItem = nextYearLive.plan.find(p => p.kind === 'major');
  assert.ok(majorLiveItem, 'Major aftermath event must be in yearly plan');
  assert.equal(majorLiveItem.forcedEventId, 'csq_color_sponsor_aftermath');

  const withLiveEvent = runPlanItem(nextYearLive, majorLiveItem, () => 0.5);
  assert.ok(withLiveEvent.pendingEvent, 'Aftermath event must be loaded into pendingEvent');
  assert.equal(withLiveEvent.pendingEvent.id, 'csq_color_sponsor_aftermath');
  assert.ok(withLiveEvent.pendingEvent.displayVi.includes('Kael'));

  // Test branch where partner tragically died in the intervening year
  const playerDiedPartner = createNewCharacter({ seed: 'trial-partner-dead', startAge: 30 });
  playerDiedPartner.job = 'Fixer';
  playerDiedPartner.fixerGrade = 1;
  playerDiedPartner.npcs = {
    partner: { role: 'partner', nameVi: 'Kael', status: 'alive', bond: 60 }
  };
  playerDiedPartner.pendingEvent = trialEvent;
  const afterTrial2 = resolveEventChoice(playerDiedPartner, 2, () => 0.1);
  // Partner dies before next year
  afterTrial2.npcs.partner.deceased = true;
  afterTrial2.npcs.partner.status = 'dead';
  afterTrial2.pendingEvent = null;

  const nextYearFallen = endYear(afterTrial2, () => 0.5);
  const majorFallenItem = nextYearFallen.plan.find(p => p.kind === 'major');
  assert.ok(majorFallenItem, 'Fallen aftermath event must be in yearly plan');
  assert.equal(majorFallenItem.forcedEventId, 'csq_color_sponsor_aftermath_fallen');

  const withFallenEvent = runPlanItem(nextYearFallen, majorFallenItem, () => 0.5);
  assert.ok(withFallenEvent.pendingEvent, 'Fallen aftermath event must be loaded into pendingEvent');
  assert.equal(withFallenEvent.pendingEvent.id, 'csq_color_sponsor_aftermath_fallen');
  assert.ok(withFallenEvent.pendingEvent.titleVi.includes('Tưởng Niệm'));
  console.log('  ✓ Living and fallen companion aftermath branches execute flawlessly.');
}

// ----------------------------------------------------------------------------
// 5. CARMEN DISTORTION SAGA: 3 ACTS COMPLETION
// ----------------------------------------------------------------------------
console.log('5. Testing Distorted character traverses all 3 acts of Carmen saga...');
{
  const distortChar = createNewCharacter({ seed: 'carmen-3-acts', startAge: 25 });
  triggerDistortionTransformation(distortChar);
  assert.equal(distortChar.job, 'Distortion');

  // Verify Act 1 is pending
  const act1Thread = distortChar.weaver.pendingThreads.find(t => t.eventId === 'distort_carmen_communion_1');
  assert.ok(act1Thread, 'Act 1 must be queued');

  // Year + 1: Trigger Act 1
  distortChar.pendingEvent = null;
  const y1 = endYear(distortChar, () => 0.5);
  const m1 = y1.plan.find(p => p.kind === 'major');
  assert.equal(m1.forcedEventId, 'distort_carmen_communion_1');
  const y1Event = runPlanItem(y1, m1, () => 0.5);
  assert.equal(y1Event.pendingEvent.id, 'distort_carmen_communion_1');
  
  // Resolve Act 1 Choice 0
  const afterAct1 = resolveEventChoice(y1Event, 0, () => 0.5);
  advanceActiveNarrativeArcs(afterAct1, 'distort_carmen_communion_1');
  assert.ok(afterAct1.activeArcs.some(a => a.id === 'arc_carmen_distortion_abyss' && a.currentStage === 2));

  // Year + 2: Trigger Act 2 (without needing specific friend NPC)
  afterAct1.pendingEvent = null;
  const y2 = endYear(afterAct1, () => 0.5);
  const m2 = y2.plan.find(p => p.kind === 'major');
  assert.equal(m2.forcedEventId, 'distort_former_companion_encounter', 'Year 2 must plan Act 2');
  const y2Event = runPlanItem(y2, m2, () => 0.5);
  assert.equal(y2Event.pendingEvent.id, 'distort_former_companion_encounter');

  // Resolve Act 2 Choice 0
  const afterAct2 = resolveEventChoice(y2Event, 0, () => 0.5);
  advanceActiveNarrativeArcs(afterAct2, 'distort_former_companion_encounter');
  assert.ok(afterAct2.activeArcs.some(a => a.id === 'arc_carmen_distortion_abyss' && a.currentStage === 3));

  // Year + 3: Trigger Act 3
  afterAct2.pendingEvent = null;
  const y3 = endYear(afterAct2, () => 0.5);
  const m3 = y3.plan.find(p => p.kind === 'major');
  assert.equal(m3.forcedEventId, 'distort_star_of_city_rampage', 'Year 3 must plan Act 3');
  const y3Event = runPlanItem(y3, m3, () => 0.5);
  assert.equal(y3Event.pendingEvent.id, 'distort_star_of_city_rampage');

  // Resolve Act 3 Choice 0
  const afterAct3 = resolveEventChoice(y3Event, 0, () => 0.5);
  advanceActiveNarrativeArcs(afterAct3, 'distort_star_of_city_rampage');
  assert.ok(afterAct3.unlockedRecords.includes('arc_completed_arc_carmen_distortion_abyss'));
  console.log('  ✓ Carmen Distortion Abyss saga completes all 3 acts end-to-end.');
}

// ----------------------------------------------------------------------------
// 6. ANNUAL PLAN MEANINGFUL TRADE-OFFS
// ----------------------------------------------------------------------------
console.log('6. Testing Annual Plan upgraded heavy allocation trade-offs...');
{
  const p = createNewCharacter({ seed: 'plan-tradeoffs-audit', startAge: 25 });
  p.job = 'Fixer';
  p.stats.health = 50;
  p.stats.sanity = 50;
  p.npcs = {
    partner: { role: 'partner', nameVi: 'Yuri', status: 'alive', bond: 40 }
  };

  // Train: 2 points -> -2 HP; 3 points -> -4 HP
  p.pendingYearPlan = { age: 25 };
  applyAnnualPlan(p, { train: 2, work: 1, bond: 0, rest: 0, scheme: 0 }, 'rank');
  assert.equal(p.stats.health, 48);

  const pTrain3 = createNewCharacter({ seed: 'plan-train-3', startAge: 25 });
  pTrain3.stats.health = 50;
  pTrain3.pendingYearPlan = { age: 25 };
  applyAnnualPlan(pTrain3, { train: 3, work: 0, bond: 0, rest: 0, scheme: 0 }, 'rank');
  assert.equal(pTrain3.stats.health, 46);

  // Work: 2 points -> -3 SP; 3 points -> -6 SP
  const pWork2 = createNewCharacter({ seed: 'plan-work-2', startAge: 25 });
  pWork2.stats.sanity = 50;
  pWork2.pendingYearPlan = { age: 25 };
  // work 2 + bond 1 (0 rest) -> -3 SP net
  applyAnnualPlan(pWork2, { train: 0, work: 2, bond: 1, rest: 0, scheme: 0 }, 'fortune');
  assert.equal(pWork2.stats.sanity, 47);

  const pWork3 = createNewCharacter({ seed: 'plan-work-3', startAge: 25 });
  pWork3.stats.sanity = 50;
  pWork3.pendingYearPlan = { age: 25 };
  applyAnnualPlan(pWork3, { train: 0, work: 3, bond: 0, rest: 0, scheme: 0 }, 'fortune');
  assert.equal(pWork3.stats.sanity, 44);

  // Scheme: 3 points -> -4 Bond and +2 Heat
  const pScheme3 = createNewCharacter({ seed: 'plan-scheme-3', startAge: 25 });
  pScheme3.heat = 10;
  pScheme3.npcs = {
    partner: { role: 'partner', nameVi: 'Yuri', status: 'alive', bond: 40 }
  };
  pScheme3.pendingYearPlan = { age: 25 };
  // scheme 3 gives -6 Heat, but +2 Heat penalty -> net -4 Heat
  applyAnnualPlan(pScheme3, { train: 0, work: 0, bond: 0, rest: 0, scheme: 3 }, 'survive');
  assert.equal(pScheme3.npcs.partner.bond, 36);
  assert.equal(pScheme3.heat, 6);
  console.log('  ✓ Annual plan meaningful trade-offs verified.');
}

console.log('\n=== ALL AUDIT FEEDBACK TESTS PASSED WITH 100% SUCCESS ===');
