import assert from 'node:assert/strict';
import { createNewCharacter, buildLifeSummaryAndLegacy, ALL_STORY_EVENTS, generateFixerContract, createRNG } from '../src/engine/gameEngine.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
import { advanceActiveNarrativeArcs, simulateNpcAutonomousLife, reactNpcsToMajorTurn } from '../src/engine/narrativeArcEngine.js';
import { selectEventWithWeaverAI, isEventEligible } from '../src/engine/weaverAI.js';

const selectWeaverEvent = (c, rng) => selectEventWithWeaverAI({
  weaver: c.weaver,
  char: c,
  allPools: ALL_STORY_EVENTS,
  consequencePool: CONSEQUENCE_EVENTS,
  rng
});
import { charHasWorkshopAccess, matchesNeed } from '../src/engine/eventConditions.js';
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

console.log('=== ALL BATCHES 135–138 TESTS PASSED ===');
