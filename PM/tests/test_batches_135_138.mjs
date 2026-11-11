import assert from 'node:assert/strict';
import { createNewCharacter, buildLifeSummaryAndLegacy, ALL_STORY_EVENTS, generateFixerContract, resolveEventChoice, resolveFixerContract, createRNG } from '../src/engine/gameEngine.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
import { advanceActiveNarrativeArcs, simulateNpcAutonomousLife, reactNpcsToMajorTurn } from '../src/engine/narrativeArcEngine.js';
import { selectEventWithWeaverAI, isEventEligible, scoreEventUtility } from '../src/engine/weaverAI.js';
import { ageNpcCompanions } from '../src/engine/director.js';

const selectWeaverEvent = (c, rng) => selectEventWithWeaverAI({
  weaver: c.weaver,
  char: c,
  allPools: ALL_STORY_EVENTS,
  consequencePool: CONSEQUENCE_EVENTS,
  rng
});
import { charHasWorkshopAccess, matchesNeed, matchesEventContext, effectiveMaxAge } from '../src/engine/eventConditions.js';
import { fixerContractOfferChance, contractOfferChance } from '../src/engine/careerPipeline.js';
import { apexLongevityEventId } from '../src/data/eventsApexTwilight.js';
import { getAffiliationInvite } from '../src/engine/affiliation.js';
import { effectiveMinAge } from '../src/engine/careerAge.js';
import { planFirstGate, firstGateAge, gateDeferredForHealth } from '../src/engine/dungeonPacing.js';
import { directorScore } from '../src/engine/eventDirector.js';
import { evaluateEventConsiderations } from '../src/engine/utilityCurves.js';
import { createCityBlackboard } from '../src/engine/cityBlackboard.js';
import { hasEstablishedStanding } from '../src/engine/economyModel.js';
import { ANNUAL_MERIT_OPPORTUNITIES } from '../src/data/annualMeritOpportunities.js';
import { LIFE_MINORS, endYear } from '../src/engine/yearPlanner.js';
import {
  createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice,
  evaluateDungeonChoiceOdds, isDungeonChoiceAvailable, useDungeonSupply, companionPerk
} from '../src/engine/dungeonEngine.js';
import { calmShare } from '../src/engine/dungeonEngine.js';
import { canInteractWithNpc, getNpcActionLabel } from '../src/engine/npcInteractions.js';
import { advanceCityCondition } from '../src/engine/cityConditions.js';
import { applyAnnualPlan, previewAnnualPlanDeltas, annualSchemeContractPower } from '../src/engine/annualPlan.js';

console.log('=== TESTING BATCHES 135–138 ===');

// ----------------------------------------------------------------------------
// ĐỢT 135 — MẠCH TRUYỆN BỊ KẸT & CẤU TRÚC NGHỀ
// ----------------------------------------------------------------------------
console.log('1. Testing Đợt 135: Middle Arc, Thread Queue, waitsForGate, ripe_age, Independent Syndicate, Workshop...');
{
  // 1.1 Middle 3-stage arc: syn_middle_book_of_vengeance -> syn_middle_cousin_retaliation -> syn_middle_promo_big_sibling
  const midChar = createNewCharacter({ seed: 'mid-arc-135', startAge: 24 });
  midChar.job = 'Syndicate';
  midChar.finger = 'Middle';
  midChar.flags = ['FingerMiddle'];
  midChar.fingerRank = 0;
  midChar.merit = 20;
  midChar.stats.rep = 60;
  advanceActiveNarrativeArcs(midChar, 'syn_middle_book_of_vengeance');
  const stage2Thread = (midChar.weaver?.pendingThreads || []).find((t) => !t.fulfilled && t.arcId === 'arc_middle_vengeance_saga');
  assert.ok(stage2Thread, 'Stage 1 should plant a thread for Stage 2');
  assert.equal(stage2Thread.eventId, 'syn_middle_cousin_retaliation');

  midChar.age = stage2Thread.triggerAge;
  stage2Thread.fulfilled = true;
  advanceActiveNarrativeArcs(midChar, 'syn_middle_cousin_retaliation');
  const stage3Thread = (midChar.weaver?.pendingThreads || []).find((t) => !t.fulfilled && t.eventId === 'syn_middle_promo_big_sibling');
  assert.ok(stage3Thread, 'Stage 2 should plant a thread for Stage 3 (syn_middle_promo_big_sibling)');
  assert.equal(stage3Thread.waitsForGate, true, 'Stage 3 promotion thread must set waitsForGate: true');

  // Verify waitsForGate thread does not expire after >8 years while still in Middle
  midChar.age = stage3Thread.plantedAtAge + 12;
  endYear(midChar, () => 0.99);
  const stillPending = (midChar.weaver?.pendingThreads || []).find((t) => t.id === stage3Thread.id);
  assert.equal(stillPending.fulfilled, false, 'waitsForGate thread must not expire after 8 years while in the same Finger');

  // At merit >= 75 and fingerRank === 0, selectWeaverEvent picks syn_middle_promo_big_sibling
  midChar.merit = 80;
  midChar.fingerRank = 0;
  midChar.stats.rep = 60;
  midChar.age = 35;
  const promoPick = selectWeaverEvent(midChar, () => 0.5);
  assert.equal(promoPick.event?.id, 'syn_middle_promo_big_sibling', 'Middle promotion trial should honor pending Stage 3 thread');
  advanceActiveNarrativeArcs(midChar, 'syn_middle_promo_big_sibling');
  assert.equal(midChar.activeArcs.find((a) => a.id === 'arc_middle_vengeance_saga')?.status, 'completed', 'Completing Stage 3 finishes arc_middle_vengeance_saga');

  // 1.2 Thread queue skips kind: 'minor' and ineligible threads to pick eligible major thread
  const qChar = createNewCharacter({ seed: 'queue-135', startAge: 28 });
  qChar.job = 'Fixer';
  qChar.fixerGrade = 7;
  qChar.weaver = {
    ...(qChar.weaver || {}),
    pendingThreads: [
      { id: 'thr_minor_1', kind: 'minor', eventId: 'm_wellness_clinic', triggerAge: 25, plantedAtAge: 24, fulfilled: false },
      { id: 'thr_ineligible_wing', kind: 'major', eventId: 'wing_k_promo_1', triggerAge: 25, plantedAtAge: 24, fulfilled: false },
      { id: 'thr_valid_major', kind: 'major', eventId: 'csq_warp_survivor_debt', triggerAge: 25, plantedAtAge: 24, fulfilled: false }
    ]
  };
  const qRes = selectWeaverEvent(qChar, () => 0.5);
  assert.equal(qRes.event?.id, 'csq_warp_survivor_debt', 'Thread queue must skip minor and ineligible threads and fire valid major thread');

  // 1.3 ripe_age ending at age >= 100 for Wing / Independent Syndicate top rank
  const oldWing = createNewCharacter({ seed: 'ripe-wing-135', startAge: 100 });
  oldWing.job = 'Wing Employee';
  oldWing.wingRank = 3;
  oldWing.age = 101;
  oldWing.alive = false;
  oldWing.stats.health = 0;
  const summaryWing = buildLifeSummaryAndLegacy(oldWing);
  assert.equal(oldWing.lifeEnding, 'ripe_age', 'Wing Rank 3 dying at 101 should get ripe_age lifeEnding');
  assert.ok(summaryWing.lifeStoryParagraphsVi.length > 0 && summaryWing.lifeStoryParagraphsEn.length > 0, 'ripe_age closing text must be generated without error');

  // 1.4 Independent Syndicate rank 3 standing, income, and Star of the City tier
  const indSyn = createNewCharacter({ seed: 'ind-syn-135', startAge: 45 });
  indSyn.job = 'Syndicate';
  indSyn.finger = null;
  indSyn.syndicateRank = 3;
  indSyn.stats.rep = 75;
  assert.equal(hasEstablishedStanding(indSyn), true, 'Independent Syndicate rank 3 must count as established standing');
  const synSummary = buildLifeSummaryAndLegacy(indSyn);
  assert.equal(synSummary.rankTier, 'Star of the City', 'Independent Syndicate rank 3 with 75+ rep must reach Star of the City');

  // 1.5 Workshop access for Fixer with WorkshopTinkerer or crafted weapon
  const wsFixer = createNewCharacter({ seed: 'ws-fixer-135', startAge: 26 });
  wsFixer.job = 'Fixer';
  wsFixer.flags = ['WorkshopTinkerer'];
  assert.equal(charHasWorkshopAccess(wsFixer), true);
  const calEv = ANNUAL_MERIT_OPPORTUNITIES.find((e) => e.id === 'm_annual_workshop_calibration');
  const tresEv = ANNUAL_MERIT_OPPORTUNITIES.find((e) => e.id === 'm_annual_workshop_tres');
  const tuneupMinor = LIFE_MINORS.find((m) => m.id === 'm_wellness_workshop_tuneup');
  assert.equal(matchesNeed(calEv.need, wsFixer), true, 'Workshop calibration event must be eligible for WorkshopTinkerer Fixer');
  wsFixer.workshopRank = 1;
  assert.equal(matchesNeed(tresEv.need, wsFixer), true, 'Tres submission event must be eligible for WorkshopTinkerer Fixer with rank 1');
  assert.equal(matchesNeed(tuneupMinor.need, wsFixer), true, 'Workshop tuneup minor must be eligible for WorkshopTinkerer Fixer');
  console.log('  ✓ Đợt 135 verified.');
}

// ----------------------------------------------------------------------------
// ĐỢT 136 — PERK ĐỒNG ĐỘI, CHẶNG ĐẦU GAUNTLET, THẺ GREAT LAKE
// ----------------------------------------------------------------------------
console.log('2. Testing Đợt 136: Companion Perks, Gauntlet Entry Item Prep, Great Lake Cards...');
{
  const baseChar = createNewCharacter({ seed: 'perk-136', startAge: 30 });
  baseChar.job = 'Fixer';
  baseChar.fixerGrade = 5;
  baseChar.npcs = {};
  baseChar.stats = { health: 80, sanity: 80, wealth: 40, rep: 40, network: 40 };

  // Test companionPerk helper for multiple archetypes
  const gamblerChar = structuredClone(baseChar);
  gamblerChar.npcs = { partner: { nameVi: 'Kael', nameEn: 'Kael', status: 'alive', bond: 50, archetype: 'gambler' } };
  const sGambler = createDungeonSession('dungeon_outskirts_ruins', gamblerChar);
  const cpGambler = companionPerk(gamblerChar, sGambler);
  assert.equal(cpGambler.type, 'loot');
  assert.equal(cpGambler.lootMult, 1.25);

  const proudChar = structuredClone(baseChar);
  proudChar.npcs = { partner: { nameVi: 'Ryu', nameEn: 'Ryu', status: 'alive', bond: 50, archetype: 'proud' } };
  const sProud = createDungeonSession('dungeon_warp_train', proudChar);
  sProud.combat.plan[0].elite = true;
  const stProud = getDungeonCurrentStage(sProud);
  const clashChoice = stProud.choices.find((c) => c.combatAction === 'clash');
  const sNoComp = createDungeonSession('dungeon_warp_train', baseChar);
  sNoComp.combat.plan[0].elite = true;
  const stNoComp = getDungeonCurrentStage(sNoComp);
  const clashChoiceNoComp = stNoComp.choices.find((c) => c.combatAction === 'clash');
  const dieWithProud = evaluateDungeonChoiceOdds(clashChoice, proudChar, sProud).clashDie;
  const dieNoComp = evaluateDungeonChoiceOdds(clashChoiceNoComp, baseChar, sNoComp).clashDie;
  assert.ok(dieWithProud[1] > dieNoComp[1], `Proud companion must increase player clash die max (${dieWithProud[1]} > ${dieNoComp[1]})`);

  // Veteran parry in Gauntlet
  const vetChar = structuredClone(baseChar);
  vetChar.npcs = { partner: { nameVi: 'Bram', nameEn: 'Bram', status: 'alive', bond: 50, archetype: 'veteran' } };
  vetChar.pendingDungeon = createDungeonSession('dungeon_warp_train', vetChar);
  const stVet = getDungeonCurrentStage(vetChar.pendingDungeon);
  const evadeIdx = stVet.choices.findIndex((c) => c.combatAction === 'evade');
  const resVet = resolveDungeonChoice(vetChar, evadeIdx, () => 0.999);
  assert.equal(resVet.char.pendingDungeon.companionParried, true, 'Veteran companion must parry the first failed evade hit on a floor');
  assert.equal(resVet.char.stats.health, 80, 'Parried hit must deal 0 HP damage');

  // Cook & Caretaker breather supply perks
  const cookChar = structuredClone(baseChar);
  cookChar.npcs = { partner: { nameVi: 'Sora', nameEn: 'Sora', status: 'alive', bond: 50, archetype: 'cook' } };
  cookChar.pendingDungeon = createDungeonSession('dungeon_outskirts_ruins', cookChar);
  cookChar.stats.wealth = 10;
  const afterCookSupply = useDungeonSupply(cookChar, 'breather');
  assert.equal(afterCookSupply.stats.wealth, 6, 'Cook companion reduces 6 Ahn breather cost by 30% to 4 Ahn');

  // Gauntlet entry item choice (con_kcorp_ampoule in dungeon_warp_train)
  const ampChar = structuredClone(baseChar);
  ampChar.stats.health = 60;
  ampChar.stats.sanity = 60;
  ampChar.inventory = [{ id: 'con_kcorp_ampoule', nameVi: 'Ống tiêm K Corp' }];
  ampChar.pendingDungeon = createDungeonSession('dungeon_warp_train', ampChar);
  const warpSt0 = getDungeonCurrentStage(ampChar.pendingDungeon);
  const ampIdx = warpSt0.choices.findIndex((c) => c.reqItem === 'con_kcorp_ampoule');
  assert.ok(ampIdx >= 0, 'dungeon_warp_train Floor 0 Turn 0 must offer con_kcorp_ampoule choice');
  assert.equal(isDungeonChoiceAvailable(warpSt0.choices[ampIdx], ampChar), true);
  const afterAmp = resolveDungeonChoice(ampChar, ampIdx, () => 0.5);
  assert.equal(afterAmp.char.stats.health, 85, 'Using K Corp ampoule heals +25 HP');
  assert.equal(afterAmp.char.stats.sanity, 80, 'Using K Corp ampoule heals +20 SP');
  assert.equal(afterAmp.char.inventory.length, 0, 'con_kcorp_ampoule is consumed');
  assert.equal(afterAmp.char.pendingDungeon.combat.turn, 0, 'Using prep item does not waste a combat turn');

  // Great Lake cards
  const lakeChar = structuredClone(baseChar);
  const lakeSession = createDungeonSession('dungeon_great_lake', lakeChar);
  assert.ok(Array.isArray(lakeSession.cardHand) && lakeSession.cardHand.length === 3, 'dungeon_great_lake must deal a 3-card hand');
  const allLakeCards = [...lakeSession.cardHand, ...lakeSession.cardPile];
  assert.ok(allLakeCards.includes('lake_harpoon') && allLakeCards.includes('lake_chart'), 'dungeon_great_lake deck must include lake_harpoon and lake_chart');
  console.log('  ✓ Đợt 136 verified.');
}

// ----------------------------------------------------------------------------
// ĐỢT 137 — NPC (DELTAS, CON CÁI/BẢO TRỢ, PHẢN ỨNG BƯỚC NGOẶT LỚN)
// ----------------------------------------------------------------------------
console.log('3. Testing Đợt 137: NPC Autonomous Deltas, Child/Ward Actions & Adult Career, Milestone Reactions...');
{
  // 3.1 Autonomous log deltas
  const spouseChar = createNewCharacter({ seed: 'npc-delta-137', startAge: 30 });
  spouseChar.flags = ['Married'];
  spouseChar.stats.sanity = 50;
  spouseChar.npcs = {
    spouse: { role: 'spouse', nameVi: 'Lan', nameEn: 'Lan', status: 'alive', bond: 70 }
  };
  const autoLogs = simulateNpcAutonomousLife(spouseChar, () => 0.01);
  const hearthLog = autoLogs.find((l) => l.deltas?.some((d) => d.k === 'sanity' && d.v === 4));
  assert.ok(hearthLog, 'Spouse autonomous log must include +4 SP delta chip');

  // 3.2 Child / Ward child_play age check and label, plus age 18 career transition
  const parentChar = createNewCharacter({ seed: 'parent-137', startAge: 38 });
  parentChar.age = 38;
  parentChar.npcs = {
    child: { role: 'child', nameVi: 'Minh', nameEn: 'Minh', status: 'alive', bond: 60, age: 12, job: 'Apprentice' }
  };
  const playCheck = canInteractWithNpc(parentChar, 'child', 'child_play');
  assert.equal(playCheck.ok, true, 'Adult parent (age 38) must be able to use child_play with a 12-year-old child');
  assert.equal(getNpcActionLabel('child_play', 'child').nameVi, 'Dẫn đi dạo khu phố');

  parentChar.npcs.child.age = 18;
  simulateNpcAutonomousLife(parentChar, () => 0.5);
  assert.notEqual(parentChar.npcs.child.job, 'Apprentice', 'Child reaching age 18 must transition from Apprentice to an adult career');

  // 3.3 NPC reactions to Distortion, Syndicate, and Color milestones
  const turnChar = createNewCharacter({ seed: 'milestone-137', startAge: 32 });
  turnChar.job = 'Distortion';
  turnChar.flags = ['Distorted'];
  turnChar.npcs = {
    friend: { role: 'friend', nameVi: 'An', nameEn: 'An', status: 'alive', bond: 40, archetype: 'loyal' },
    partner: { role: 'partner', nameVi: 'Bình', nameEn: 'Binh', status: 'alive', bond: 30, archetype: 'secretive' },
    mentor: { role: 'mentor', nameVi: 'Châu', nameEn: 'Chau', status: 'alive', bond: 30, archetype: 'ambitious' }
  };
  const rLogs = reactNpcsToMajorTurn(turnChar, 'distortion');
  assert.equal(rLogs.length, 3, 'All 3 close NPCs should react to Distortion transformation');
  assert.equal(turnChar.npcs.friend.lastMilestoneReaction, 'stay');
  assert.equal(turnChar.npcs.partner.lastMilestoneReaction, 'secret_contact');
  assert.equal(turnChar.npcs.partner.secretContact, true);
  assert.equal(turnChar.npcs.mentor.lastMilestoneReaction, 'leave');
  assert.equal(turnChar.npcs.mentor.status, 'estranged');
  console.log('  ✓ Đợt 137 verified.');
}

// ----------------------------------------------------------------------------
// ĐỢT 138 — KINH TẾ SAU TUỔI 40 (MỤC 1 & 2)
// ----------------------------------------------------------------------------
console.log('4. Testing Đợt 138: City Condition Age Range (22–90) & Job-specific Scheme Points...');
{
  // 4.1 City Condition age range 22–90
  const c22 = createNewCharacter({ seed: 'cordon-22', startAge: 22 });
  c22.age = 22;
  c22.regionId = 'K';
  advanceCityCondition(c22, () => 0.05);
  assert.ok(c22.cityCondition, 'City condition can trigger at age 22');

  const c65 = createNewCharacter({ seed: 'cordon-65', startAge: 65 });
  c65.age = 65;
  c65.regionId = 'K';
  advanceCityCondition(c65, () => 0.05);
  assert.ok(c65.cityCondition, 'City condition can trigger after age 40 (e.g. age 65)');

  // 4.2 Scheme points by job
  const wingC = createNewCharacter({ seed: 'scheme-wing', startAge: 28 });
  wingC.job = 'Wing Employee';
  wingC.heat = 10;
  wingC.leverage = 5;
  wingC.pendingYearPlan = { age: 28 };
  applyAnnualPlan(wingC, { train: 1, work: 1, bond: 0, rest: 0, scheme: 1 }, 'rank');
  assert.equal(wingC.leverage, 7, 'Wing Employee gets +2 Leverage per scheme point');
  assert.equal(wingC.heat, 8, 'Wing Employee gets -2 Heat per scheme point');

  const fixerC = createNewCharacter({ seed: 'scheme-fixer', startAge: 28 });
  fixerC.job = 'Fixer';
  fixerC.heat = 10;
  fixerC.leverage = 0;
  fixerC.merit = 10;
  fixerC.pendingYearPlan = { age: 28 };
  const fixerPreview = previewAnnualPlanDeltas(fixerC, { train: 1, work: 1, bond: 0, rest: 0, scheme: 1 });
  assert.equal(fixerPreview.leverage, 0, 'Fixer does not gain Leverage from scheme');
  assert.equal(fixerPreview.contractEdge, 4, 'Fixer previews about +4% contract success per scheme point');
  assert.equal(fixerPreview.merit, 0, 'scheme no longer pays Merit directly');
  const powerBefore = generateFixerContract(fixerC, createRNG('scheme-contract')).combatPower;
  applyAnnualPlan(fixerC, { train: 1, work: 1, bond: 0, rest: 0, scheme: 1 }, 'rank');
  assert.equal(fixerC.leverage, 0);
  assert.equal(fixerC.merit, 10, 'scheme no longer pays Merit directly');
  assert.equal(annualSchemeContractPower(fixerC), 4);
  assert.equal(generateFixerContract(fixerC, createRNG('scheme-contract')).combatPower - powerBefore, 4, 'contracts this year carry the scheme groundwork');
  fixerC.age += 1;
  assert.equal(annualSchemeContractPower(fixerC), 0, 'the groundwork lasts one year');

  const distC = createNewCharacter({ seed: 'scheme-dist', startAge: 28 });
  distC.job = 'Distortion';
  distC.flags = ['Distorted'];
  distC.resonance = 20;
  distC.pendingYearPlan = { age: 28 };
  applyAnnualPlan(distC, { train: 1, work: 1, bond: 0, rest: 0, scheme: 1 }, 'survive');
  assert.equal(distC.resonance, 22, 'Distortion gains +2 Resonance per scheme point');
  console.log('  ✓ Đợt 138 (Items 1 & 2) verified.');
}

// Đợt 141: a calm companion takes off up to 8 of a sanity loss, never more than half of it
assert.equal(calmShare(4, 8), 2, 'a small sanity hit still lands');
assert.equal(calmShare(20, 8), 8, 'a large hit loses the full restore');
assert.equal(calmShare(1, 8), 0);

// Stage-mode resolveDungeonChoice also respects calmShare (matching evaluateDungeonChoiceOdds)
{
  const calmChar = createNewCharacter({ seed: 'calm-stage-141', startAge: 28 });
  calmChar.job = 'Fixer';
  calmChar.fixerGrade = 5;
  calmChar.stats.health = 80;
  calmChar.stats.sanity = 80;
  calmChar.npcs = { partner: { nameVi: 'Linh', nameEn: 'Linh', status: 'alive', bond: 60, archetype: 'idealist' } };
  calmChar.pendingDungeon = createDungeonSession('dungeon_outskirts_ruins', calmChar);
  const st0 = getDungeonCurrentStage(calmChar.pendingDungeon);
  const spIdx = st0.choices.findIndex((c) => (c.failFx?.sanity || 0) < 0);
  if (spIdx >= 0) {
    const preview = evaluateDungeonChoiceOdds(st0.choices[spIdx], calmChar, calmChar.pendingDungeon);
    const res = resolveDungeonChoice(calmChar, spIdx, () => 0.999);
    assert.equal(res.char.stats.sanity - 80, preview.failSp, 'Stage-mode resolveDungeonChoice SP loss with calm companion must match preview failSp');
  }
}

// ----------------------------------------------------------------------------
// ĐỢT 139 & 140 — FLOOR 18 DUNGEON, DEFER < 40 HP, BLACKBOARD, LONGEVITY +30, ELDER ENDINGS
// ----------------------------------------------------------------------------
console.log('5. Testing Đợt 139 & 140: Dungeon Floor 18, Low-HP Deferral, Blackboard, Longevity Ceiling +30, Elder Endings...');
{
  const earlyChar = createNewCharacter({ seed: 'early-139', startAge: 16 });
  earlyChar.age = 16;
  earlyChar.careerAge = 15;
  earlyChar.job = 'Fixer';
  earlyChar.fixerGrade = 9;
  const warpGate = ALL_STORY_EVENTS.find((e) => e.id === 'gate_warp_fixer_request');
  assert.ok(effectiveMinAge(warpGate, earlyChar) >= 18, 'Dangerous dungeon gate must have effectiveMinAge >= 18 even when careerAge is 15');
  assert.ok(firstGateAge(earlyChar) >= 18, 'firstGateAge must never be below 18');

  // Gate deferral when HP < 40
  const hurtChar = createNewCharacter({ seed: 'hurt-139', startAge: 24 });
  hurtChar.age = 24;
  hurtChar.job = 'Fixer';
  hurtChar.fixerGrade = 7;
  hurtChar.stats.health = 35;
  assert.equal(gateDeferredForHealth(hurtChar), true);
  assert.equal(planFirstGate(hurtChar), false, 'planFirstGate must defer when HP < 40');
  assert.equal(isEventEligible(warpGate, hurtChar), false, 'Gate event must not be eligible when HP < 40');

  // Blackboard wired in evaluateEventConsiderations
  const bbChar = createNewCharacter({ seed: 'bb-139', startAge: 30 });
  bbChar.taboo = 2;
  bbChar.heat = 50;
  bbChar.motifs = { violence: 4 };
  const bb = createCityBlackboard(bbChar);
  const synAmbush = { id: 'syn_turf_ambush', major: true, vi: 'Phục kích tại ngõ hẹp.' };
  const evalWithBb = evaluateEventConsiderations(synAmbush, bbChar, bb);
  assert.ok(evalWithBb.scoreMultiplier > 1.5, 'Blackboard headScrutiny and activeSyndicateWar must boost ambush event consideration');

  // Longevity extends maxAge >= 85 by +30 years
  const sample90 = ALL_STORY_EVENTS.find((e) => e.age && e.age[1] === 90 && !e.requires?.length && !e.need);
  if (sample90) {
    const elder105 = createNewCharacter({ seed: 'elder-140', startAge: 105 });
    elder105.age = 105;
    elder105.job = sample90.jobs?.[0] || 'Fixer';
    assert.equal(matchesEventContext(sample90, elder105), false, 'Without longevity flag, age 105 exceeds maxAge 90');
    elder105.flags = ['ApexLongevity'];
    assert.equal(matchesEventContext(sample90, elder105), true, 'With ApexLongevity, maxAge 90 extends to 120');
  }

  // Active elder endings for non-Color Fixer, Workshop, and Outcast at age 92
  for (const id of ['elder_fixer_last_ledger', 'elder_workshop_last_forge', 'elder_outcast_last_alley']) {
    const ev = ALL_STORY_EVENTS.find((e) => e.id === id);
    assert.ok(ev, `Elder ending event ${id} must exist in ALL_STORY_EVENTS`);
    assert.equal(ev.choices.length, 3, `${id} must offer 3 choices`);
  }

  // Elder director pacing rule (age >= 60 boosts legacy/relief and softens repeat danger)
  const elder65 = createNewCharacter({ seed: 'dir-elder-140', startAge: 65 });
  elder65.age = 65;
  elder65.weaver.recentBeats = [{ id: 'prev_danger', age: 64, tags: ['danger'] }];
  const legacyEv = ALL_STORY_EVENTS.find((e) => e.id === 'elder_chapter_chronicle_offer');
  const dLegacy = directorScore(legacyEv, elder65, elder65.weaver, 100);
  assert.ok(dLegacy.tags.includes('legacy'), 'elder_chapter_chronicle_offer must carry legacy tag');
  assert.ok(dLegacy.multiplier > 1.15, 'Elder director rule must boost legacy events at age 65');
  console.log('  ✓ Đợt 139 & 140 verified.');
}

// ----------------------------------------------------------------------------
// ĐỢT 142–144 — RESERVE AHN, 3 ĐẦU TƯ CUỐI ĐỜI, BLOODLINE SEEN EVENTS, TIỄN BIỆT TUỔI GIÀ
// ----------------------------------------------------------------------------
console.log('6. Testing Đợt 142–144: Reserve Ahn Vault, 3 Endgame Investments, Bloodline Discovery Boost, Elder Bereavement...');
{
  // 6.1 Reserve Ahn overflow on contract and LineageEndowmentFund inheritance
  const richChar = createNewCharacter({ seed: 'rich-142', startAge: 45 });
  richChar.age = 45;
  richChar.job = 'Fixer';
  richChar.fixerGrade = 2;
  richChar.stats.wealth = 96;
  if (richChar.npcs?.friend) richChar.npcs.friend.bond = 60;
  richChar.pendingContract = generateFixerContract(richChar, createRNG('rich-contract'));
  const paidChar = resolveFixerContract(richChar, 'bold', () => 0.01);
  assert.equal(paidChar.stats.wealth, 100, 'Wealth caps at 100');
  assert.ok((paidChar.reserveAhn || 0) > 0, 'Ahn exceeding 100 must overflow into char.reserveAhn');

  // LineageEndowmentFund event adds to reserveAhn and passes bonus starting wealth to next generation
  const fundEv = ALL_STORY_EVENTS.find((e) => e.id === 'elder_invest_lineage_fund');
  assert.ok(fundEv, 'elder_invest_lineage_fund must exist');
  paidChar.pendingEvent = fundEv;
  const afterFund = resolveEventChoice(paidChar, 0, () => 0.5);
  assert.ok(afterFund.flags.includes('LineageEndowmentFund'), 'Choice 0 grants LineageEndowmentFund');
  assert.ok(afterFund.reserveAhn >= 40, 'Choice 0 adds +40 to reserveAhn');
  afterFund.alive = false;
  const legacySummary = buildLifeSummaryAndLegacy(afterFund);
  assert.equal(legacySummary.hasLineageEndowment, true);
  assert.ok(legacySummary.reserveAhn >= 40);

  const heirChar = createNewCharacter({ seed: 'heir-142', parentLegacy: legacySummary });
  const plainChar = createNewCharacter({ seed: 'heir-142' });
  assert.ok(heirChar.stats.wealth >= plainChar.stats.wealth + 18, 'Heir with LineageEndowmentFund and reserveAhn starts with substantially higher wealth');

  // 6.2 EndgameOfficePatron (+6 contract power & +4 Ahn/yr dividend) and CompanionMasterworkGear
  const patronChar = createNewCharacter({ seed: 'patron-142', startAge: 45 });
  patronChar.job = 'Fixer';
  patronChar.fixerGrade = 4;
  const baseContractPower = generateFixerContract(patronChar, createRNG('patron-c')).combatPower;
  patronChar.flags.push('EndgameOfficePatron');
  const patronContractPower = generateFixerContract(patronChar, createRNG('patron-c')).combatPower;
  assert.equal(patronContractPower - baseContractPower, 6, 'EndgameOfficePatron adds +6 contract combatPower');

  const compGearChar = createNewCharacter({ seed: 'compgear-142', startAge: 44 });
  compGearChar.npcs = { partner: { role: 'partner', nameVi: 'Hải', nameEn: 'Hai', status: 'alive', bond: 65, archetype: 'tactician' } };
  const sessionBefore = createDungeonSession('dungeon_outskirts_ruins', compGearChar);
  const perkBefore = companionPerk(compGearChar, sessionBefore);
  compGearChar.flags.push('CompanionMasterworkGear');
  const perkAfter = companionPerk(compGearChar, sessionBefore);
  assert.ok(perkAfter.checkBonus > perkBefore.checkBonus, 'CompanionMasterworkGear increases companion checkBonus');
  assert.ok(perkAfter.hpDamageMult < perkBefore.hpDamageMult, 'CompanionMasterworkGear reduces HP damage multiplier');

  // 6.3 Bloodline unseen event discovery multiplier (x1.35)
  const sampleEv = ALL_STORY_EVENTS.find((e) => e.id === 'elder_callback_echo_of_youth');
  assert.ok(sampleEv, 'elder_callback_echo_of_youth must exist');
  const genChar = createNewCharacter({ seed: 'gen-143', startAge: 60 });
  genChar.age = 60;
  genChar.bloodlineSeenEvents = ['some_other_event'];
  const scoreUnseen = scoreEventUtility(sampleEv, genChar, genChar.weaver).totalUtility;
  genChar.bloodlineSeenEvents = ['elder_callback_echo_of_youth'];
  const scoreSeen = scoreEventUtility(sampleEv, genChar, genChar.weaver).totalUtility;
  assert.ok(scoreUnseen > scoreSeen * 1.25, 'Events unseen in bloodlineSeenEvents receive discovery utility boost');

  // 6.4 Elder bereavement when close companion dies of old age
  const oldFriendChar = createNewCharacter({ seed: 'bereave-144', startAge: 65 });
  oldFriendChar.age = 65;
  oldFriendChar.npcs = {
    mentor: { role: 'mentor', nameVi: 'Lão Sư', nameEn: 'Old Master', status: 'alive', bond: 75, metAge: 20, ageAtMeet: 45 }
  };
  ageNpcCompanions(oldFriendChar, () => 0.001);
  assert.ok(oldFriendChar.flags.includes('RecentElderBereavement'), 'Close mentor dying of old age sets RecentElderBereavement flag');
  const mournEv = ALL_STORY_EVENTS.find((e) => e.id === 'bereavement_elder_old_friend_passing');
  assert.ok(mournEv && matchesEventContext(mournEv, oldFriendChar), 'bereavement_elder_old_friend_passing becomes eligible after RecentElderBereavement');
  console.log('  ✓ Đợt 142–144 verified.');
}

// ----------------------------------------------------------------------------
// ĐỢT 148–150 — TUỔI GIÀ MỌI ROUTE, SỬA LỖI COLOR FIXER & ĐẠI TU ROUTE DISTORTION
// ----------------------------------------------------------------------------
console.log('7. Testing Đợt 148–150: Color Fixer Elder Contracts, Longevity 65+ Ceiling, All-Route 90+ Endings, Distortion 3 Archetypes & Chrysalis Ending...');
{
  // 7.1 Color Fixer (char.job === 'Color Fixer') retains contract offers, gets apex_longevity_color, and skips low-rank affiliation invites
  const colorChar = createNewCharacter({ seed: 'color-elder-148', startAge: 70 });
  colorChar.age = 70;
  colorChar.job = 'Color Fixer';
  colorChar.fixerGrade = 0;
  colorChar.isColorFixer = true;
  colorChar.flags = ['ColorFixer', 'ApexLongevity'];
  assert.ok(fixerContractOfferChance(colorChar) >= 0.4, 'Color Fixer with job="Color Fixer" must retain contract offer chance');
  assert.ok(contractOfferChance(colorChar) >= 0.4, 'contractOfferChance must work for Color Fixer at old age');
  assert.equal(apexLongevityEventId(colorChar), 'apex_longevity_color', 'apexLongevityEventId must recognize job="Color Fixer"');

  const colorAsFixerJob = createNewCharacter({ seed: 'color-aff-148', startAge: 50 });
  colorAsFixerJob.age = 50;
  colorAsFixerJob.job = 'Fixer';
  colorAsFixerJob.fixerGrade = 1;
  colorAsFixerJob.flags = ['ColorFixer'];
  assert.equal(getAffiliationInvite(colorAsFixerJob), null, 'Color Fixer must not receive regular Section affiliation invites');

  // 7.2 effectiveMaxAge extends events with age[1] >= 65 by +30 for extended-longevity characters
  const ev70 = { id: 'sample_career_70', age: [25, 70], jobs: ['Fixer'] };
  const normal85 = createNewCharacter({ seed: 'norm-85', startAge: 85 });
  normal85.age = 85;
  assert.equal(effectiveMaxAge(ev70, normal85), 70, 'Without longevity flag, maxAge 70 stays 70');
  normal85.flags = ['ApexLongevity'];
  assert.equal(effectiveMaxAge(ev70, normal85), 100, 'With ApexLongevity, maxAge 70 extends to 100');

  // 7.3 New 90+ active endings & 60+ elder chapter events across Wing, Indie Syndicate, Workshop, Outcast
  for (const id of [
    'elder_wing_last_boardroom',
    'elder_indie_syndicate_last_turf',
    'elder_wing_archive_declassification',
    'elder_indie_old_code_dispute',
    'elder_workshop_blueprint_inheritance',
    'elder_outcast_wall_watchfire'
  ]) {
    const ev = ALL_STORY_EVENTS.find((e) => e.id === id);
    assert.ok(ev, `Elder event ${id} must exist in ALL_STORY_EVENTS`);
  }

  // 7.4 Distortion 3-Archetype Divergence, Past-Life/LCD Majors, Elder Hibernation & Chrysalis Ending
  for (const id of [
    'distort_arc_archetype_divergence',
    'distort_arc_labyrinth_trap_feast',
    'distort_arc_lucid_underground_broker',
    'distort_arc_lcd_moses_inspection',
    'distort_arc_past_life_fixer_badge',
    'distort_arc_past_life_wing_containment',
    'distort_arc_elder_hibernation_monolith',
    'distort_arc_elder_abnormality_chrysalis_ending'
  ]) {
    const ev = ALL_STORY_EVENTS.find((e) => e.id === id);
    assert.ok(ev, `Distortion major ${id} must exist in ALL_STORY_EVENTS`);
  }

  const distElder = createNewCharacter({ seed: 'dist-elder-150', startAge: 82 });
  distElder.age = 82;
  distElder.job = 'Distortion';
  distElder.flags = ['Distorted'];
  const chrysalisEv = ALL_STORY_EVENTS.find((e) => e.id === 'distort_arc_elder_abnormality_chrysalis_ending');
  assert.equal(matchesEventContext(chrysalisEv, distElder), true, 'Distortion character at age 82 is eligible for Chrysalis active ending');
  assert.equal(chrysalisEv.choices.length, 3, 'Chrysalis ending offers 3 distinct choices');
  console.log('  ✓ Đợt 148–150 verified.');
}

console.log('=== ALL BATCHES 135–150 TESTS PASSED ===');

// Đợt 151: child events keep their age cap for long-lived parents, the bereavement names who died,
// and a legacy carries the bloodline's seen events once
{
  const { matchesEventContext: ctxOk } = await import('../src/engine/eventConditions.js');
  const { interpolateText: fill } = await import('../src/engine/gameEngine.js');
  const elder = createNewCharacter({ seed: 'elder-child', startAge: 28 });
  elder.age = 90;
  elder.flags = [...(elder.flags || []), 'FullBodyProsthetic', 'HasChild'];
  for (const id of ['npc_child_first_weapon_choice', 'npc_child_kidnapping_ransom', 'ev4_child_wants_to_leave']) {
    const ev = ALL_STORY_EVENTS.find((e) => e.id === id);
    assert.equal(ev.elderOk, false, `${id} keeps its own age cap`);
    assert.equal(ctxOk(ev, elder), false, `${id} does not reach a 90-year-old`);
  }
  elder.recentBereavementNameVi = 'Yuri';
  const farewell = ALL_STORY_EVENTS.find((e) => e.id === 'bereavement_elder_old_friend_passing');
  assert.ok(fill(farewell.vi, elder).includes('Yuri'), 'the farewell names the one who died');
  elder.seenEvents = ['a', 'b'];
  elder.bloodlineSeenEvents = ['b', 'c'];
  const legacyText = JSON.stringify(buildLifeSummaryAndLegacy(elder));
  assert.equal(legacyText.split('"seenEvents"').length - 1, 0, 'a legacy stores the seen list once, as bloodlineSeenEvents');
  assert.ok(legacyText.includes('"bloodlineSeenEvents":["b","c","a"]'));
  console.log('  ✓ Đợt 151 verified.');
}

// Đợt 152: the elder echo quotes a decision this life really made, and the Ensemble waits for the wounded
{
  const { youthEchoOf } = await import('../src/engine/yearPlanner.js');
  const { prepareEnsembleYear, ENSEMBLE_INVITE_ID, ENSEMBLE_LAST_CALL_ID } = await import('../src/engine/ensemblePath.js');
  const old = createNewCharacter({ seed: 'echo-elder', startAge: 28 });
  old.age = 60;
  old.logs = [
    { id: 'log_10_x', age: 10, type: 'choice', choiceVi: 'Quá sớm.', review: { vi: '[Chuyện lúc nhỏ] ...', en: '[Childhood] ...' } },
    { id: 'log_ev_17_ad_career_crossroad_18', age: 17, type: 'major', turning: true, choiceVi: 'Ký giấy ở Wing.', choiceEn: 'Sign at the Wing.', review: { vi: 'thân bài không có tiêu đề', en: 'body without a heading' } },
    { id: 'log_ev_50_late', age: 50, type: 'major', choiceVi: 'Quá gần.', review: { vi: '[Gần đây] ...', en: '[Recent] ...' } }
  ];
  const echo = youthEchoOf(old);
  assert.equal(echo.age, 17, 'the echo is the turning point of youth');
  assert.equal(echo.choiceVi, 'Ký giấy ở Wing', 'the choice is quoted whole, without its final period');
  assert.ok(echo.titleVi && echo.titleEn, 'the heading comes from the event the log names');
  old.logs = old.logs.slice(2);
  assert.equal(youthEchoOf(old), null, 'a life with no youth on record gets the plain text');
  assert.equal(ALL_STORY_EVENTS.find((e) => e.id === 'elder_callback_echo_of_youth').youthEcho, true);

  const apex = createNewCharacter({ seed: 'ens-wounded', startAge: 28 });
  apex.age = 40; apex.job = 'Wing Employee'; apex.wingRank = 3; apex.taboo = 0; apex.pendingDungeon = null;
  apex.ensemble = { apexSinceAge: 30, declines: 0, offers: 0, nextAge: null, completed: false };
  apex.stats.health = 30;
  assert.equal(prepareEnsembleYear(apex), null, 'an invitation waits while the guest is wounded');
  apex.stats.health = 70;
  assert.equal(prepareEnsembleYear(apex), ENSEMBLE_INVITE_ID);
  apex.ensemble.declines = 2; apex.stats.health = 30;
  assert.equal(prepareEnsembleYear(apex), null, 'the last call waits one year for wounds');
  assert.equal(prepareEnsembleYear(apex), ENSEMBLE_LAST_CALL_ID, 'and then comes regardless');
  console.log('  ✓ Đợt 152 verified.');
}

// ----------------------------------------------------------------------------
// ĐỢT 153–157 — SURVIVAL BALANCE, DISTORTION ARCHETYPE PASSIVES, RESERVE AHN DRAW, COMPANION PERKS
// ----------------------------------------------------------------------------
console.log('8. Testing Đợt 153–157: Survival Buffer, Distortion Passives, Reserve Vault Emergency Draw & Companion Perks...');
{
  const { rollSeasonMishap, exposureIndex } = await import('../src/engine/fateEngine.js');
  const { endYear } = await import('../src/engine/yearPlanner.js');

  // 8.1 High-HP character is buffered against instant fatal mishap
  const strongFixer = createNewCharacter({ seed: 'strong-fixer-153', startAge: 42 });
  strongFixer.age = 42;
  strongFixer.job = 'Fixer';
  strongFixer.stats.health = 85;
  strongFixer.stats.wealth = 20;
  assert.ok(exposureIndex(strongFixer) < 2.6, 'Fixer exposure index is balanced');
  for (let i = 0; i < 40; i++) {
    const mishap = rollSeasonMishap(strongFixer, () => 0.001);
    if (mishap) {
      assert.equal(mishap.fatal, false, 'A healthy character (85 HP) must not suffer instant fatal mishap when hp - dmg > 18');
    }
  }

  // 8.2 Healthy Fixer failing a high-grade promotion trial survives at 1 HP instead of dying outright
  const promoFixer = createNewCharacter({ seed: 'promo-survive-153', startAge: 34 });
  promoFixer.age = 34;
  promoFixer.job = 'Fixer';
  promoFixer.fixerGrade = 2;
  promoFixer.merit = 420;
  promoFixer.stats.rep = 96;
  promoFixer.stats.health = 46;
  const g1PromoEv = ALL_STORY_EVENTS.find((e) => e.id === 'fixer_promo_g1_exam');
  assert.ok(g1PromoEv);
  promoFixer.pendingEvent = g1PromoEv;
  const afterFail = resolveEventChoice(promoFixer, 0, () => 0.999);
  assert.equal(afterFail.alive, true, 'Healthy Fixer (46 HP) failing Grade 1 exam survives critically wounded');
  assert.equal(afterFail.stats.health, 1, 'Post-failure health clamps to 1 HP');

  // 8.3 Distortion Archetype passives & Emergency Reserve Vault draw in endYear
  const distSov = createNewCharacter({ seed: 'dist-sov-154', startAge: 36 });
  distSov.age = 36;
  distSov.job = 'Distortion';
  distSov.flags = ['Distorted', 'DistortionLabyrinthSovereign'];
  distSov.heat = 30;
  distSov.stats.wealth = 20;
  const distAfterYear = endYear(distSov, () => 0.99);
  const yearLog = distAfterYear.logs.findLast((l) => Array.isArray(l.breakdown));
  assert.ok(yearLog?.breakdown?.some((b) => b.labelVi.includes('Lãnh Chúa Mê Cung')), 'Labyrinth Sovereign passive appears in year-end breakdown');

  const brokeReserveChar = createNewCharacter({ seed: 'reserve-draw-154', startAge: 35 });
  brokeReserveChar.age = 35;
  brokeReserveChar.job = 'Fixer';
  brokeReserveChar.stats.wealth = 2;
  brokeReserveChar.reserveAhn = 35;
  const reserveAfterYear = endYear(brokeReserveChar, () => 0.99);
  assert.ok(reserveAfterYear.stats.wealth > 5, 'Emergency Reserve Vault withdrawal prevents bankruptcy and organ debt');
  assert.ok(reserveAfterYear.reserveAhn < 35, 'Reserve Vault balance decreases after emergency withdrawal');
  assert.ok(!reserveAfterYear.logs.some((l) => l.vi?.includes('một quả thận')), 'Character with Reserve Vault avoids organ_debt');

  // 8.4 Nestdreamer companion (strain_reduction) reduces strain by 4 when advancing a stage
  const secChar = createNewCharacter({ seed: 'sec-comp-155', startAge: 30 });
  secChar.job = 'Fixer';
  secChar.npcs = { partner: { role: 'partner', nameVi: 'Mộng Đẹp', nameEn: 'Dreamer', status: 'alive', bond: 70, archetype: 'nestdreamer' } };
  secChar.pendingDungeon = createDungeonSession('dungeon_outskirts_ruins', secChar);
  secChar.pendingDungeon.sanityStrain = 30;
  const stRes = resolveDungeonChoice(secChar, 0, () => 0.01);

  const soloChar = createNewCharacter({ seed: 'sec-comp-155', startAge: 30 });
  soloChar.job = 'Fixer';
  soloChar.npcs = {};
  soloChar.pendingDungeon = createDungeonSession('dungeon_outskirts_ruins', soloChar);
  soloChar.pendingDungeon.sanityStrain = 30;
  const soloRes = resolveDungeonChoice(soloChar, 0, () => 0.01);
  assert.ok(stRes.session.sanityStrain <= soloRes.session.sanityStrain - 4, 'Nestdreamer companion strainMult and stage-advance relief reduce strain vs solo');
  console.log('  ✓ Đợt 153–157 verified.');
}

// Đợt 158: the device-wide discovery list and the lineage's own list are kept apart, and no exam meets a wounded life
{
  const { scoreEventUtility } = await import('../src/engine/weaverAI.js');
  const { TRIAL_MIN_HP } = await import('../src/engine/careerPipeline.js');
  const heir = createNewCharacter({ seed: 'discovery-split', startAge: 28 });
  const target = ALL_STORY_EVENTS.find((e) => e.id === 'elder_callback_echo_of_youth');
  heir.bloodlineSeenEvents = ['some_other_event'];
  heir.discoverySeen = ['elder_callback_echo_of_youth'];
  const seenOnDevice = scoreEventUtility(target, heir, heir.weaver || {}).totalUtility;
  heir.discoverySeen = ['some_other_event'];
  const freshOnDevice = scoreEventUtility(target, heir, heir.weaver || {}).totalUtility;
  assert.ok(freshOnDevice > seenOnDevice * 1.25, 'the discovery boost reads the device-wide list when the save has one');

  const fixer = createNewCharacter({ seed: 'exam-wounded', startAge: 28 });
  fixer.job = 'Fixer'; fixer.fixerGrade = 9; fixer.merit = 500; fixer.stats.rep = 90; fixer.stats.network = 80; fixer.stats.sanity = 80;
  const exams = ALL_STORY_EVENTS.filter((e) => e.id.startsWith('fixer_promo_g8_'));
  fixer.stats.health = 90;
  const openWhenWell = exams.filter((e) => isEventEligible(e, fixer, { scripted: true }));
  assert.ok(openWhenWell.length > 0, 'a healthy eligible Fixer can be offered a Grade 8 exam');
  fixer.stats.health = TRIAL_MIN_HP - 1;
  assert.equal(exams.filter((e) => isEventEligible(e, fixer, { scripted: true })).length, 0, 'no exam is offered under TRIAL_MIN_HP');
  console.log('  ✓ Đợt 158 verified.');
}
