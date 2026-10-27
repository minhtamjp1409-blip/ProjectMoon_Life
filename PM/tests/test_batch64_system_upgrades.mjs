import assert from 'node:assert/strict';
import {
  createNewCharacter,
  buildLifeSummaryAndLegacy,
  resolveEventChoice,
  generateFixerContract,
  createDungeonSession,
  getDungeonMastery,
  DUNGEON_DEFINITIONS,
  ALL_STORY_EVENTS
} from '../src/engine/gameEngine.js';
import { endYear } from '../src/engine/yearPlanner.js';
import { applyAnnualPlan, defaultYearPoints } from '../src/engine/annualPlan.js';
import {
  summarizeDynastyHallOfLegends,
  canRelocateDistrict,
  relocateCharacterDistrict,
  isApexCommander,
  canImbueEquipment,
  imbueCharacterEquipment,
  getImbuedCombatBonus
} from '../src/engine/cityUpgrades.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';

console.log('=== TEST SUITE: BATCH 64 SYSTEM UPGRADES (5 PILLARS) ===');

// ----------------------------------------------------------------------------
// 1. LIVING ANCESTOR ECHOES & HALL OF LEGENDS
// ----------------------------------------------------------------------------
{
  // A. Color Fixer Ancestor -> Heir
  const colorAncestor = createNewCharacter({ seed: 'ancestor-color-1', startAge: 35 });
  colorAncestor.job = 'Color Fixer';
  colorAncestor.fixerGrade = 0;
  colorAncestor.customTitle = 'Azure Tempest';
  colorAncestor.flags.push('ColorFixer', 'EGOAwakened');
  colorAncestor.egoName = 'Horizon Severance';
  colorAncestor.stats.wealth = 80;
  colorAncestor.stats.rep = 90;
  colorAncestor.alive = false;

  const colorSummary = buildLifeSummaryAndLegacy(colorAncestor);
  assert.equal(colorSummary.isColorAncestor, true, 'Summary must flag Color ancestor');
  assert.equal(colorSummary.colorTitle, 'Azure Tempest', 'Summary must preserve Color title');

  const colorHeir = createNewCharacter({
    seed: 'heir-color-1',
    parentLegacy: colorSummary,
    startAge: 22
  });
  assert(colorHeir.flags.includes('AncestorWasColor'), 'Heir of Color Fixer must receive AncestorWasColor flag');
  const colorEchoEvent = ALL_STORY_EVENTS.find((e) => e.id === 'm_lineage_color_shadow_trial');
  assert(colorEchoEvent, 'm_lineage_color_shadow_trial must exist in ALL_STORY_EVENTS');
  assert(matchesEventContext(colorEchoEvent, colorHeir), 'Color echo event must match Color heir');

  // Resolve choice 0 on m_lineage_color_shadow_trial (weighted outcome: roll 0.1 hits win branch, roll 0.9 hits fail branch)
  colorHeir.pendingEvent = colorEchoEvent;
  const afterTrial = resolveEventChoice(colorHeir, 0, () => 0.1);
  assert(afterTrial.flags.includes('ProdigyFixer'), 'Winning Hana courtyard trial should grant ProdigyFixer');
  assert(afterTrial.heat > 0, 'Ancestor Color fame + Hana trial must carry realistic Heat burden');

  // B. Distortion Ancestor -> Heir
  const distAncestor = createNewCharacter({ seed: 'ancestor-dist-1', startAge: 32 });
  distAncestor.job = 'Distortion';
  distAncestor.flags.push('Distorted');
  distAncestor.resonance = 95;
  distAncestor.alive = false;
  const distSummary = buildLifeSummaryAndLegacy(distAncestor);
  assert.equal(distSummary.isDistortedAncestor, true, 'Summary must flag Distorted ancestor');

  const distHeir = createNewCharacter({
    seed: 'heir-dist-1',
    parentLegacy: distSummary,
    startAge: 24
  });
  assert(distHeir.flags.includes('AncestorWasDistortion'), 'Heir of Distortion must receive AncestorWasDistortion flag');
  const distEchoEvent = ALL_STORY_EVENTS.find((e) => e.id === 'm_lineage_distortion_labyrinth_echo');
  assert(distEchoEvent && matchesEventContext(distEchoEvent, distHeir), 'Distortion echo event must match Distortion heir');

  // C. Finger Boss & Wing Executive Ancestors -> Hall of Legends
  const fingerAncestor = createNewCharacter({ seed: 'ancestor-finger-1', startAge: 40 });
  fingerAncestor.job = 'Syndicate';
  fingerAncestor.finger = 'Thumb';
  fingerAncestor.fingerRank = 3;
  fingerAncestor.alive = false;
  const fingerSummary = buildLifeSummaryAndLegacy(fingerAncestor);

  const wingAncestor = createNewCharacter({ seed: 'ancestor-wing-1', startAge: 42 });
  wingAncestor.job = 'Wing Employee';
  wingAncestor.wingRank = 3;
  wingAncestor.stats.wealth = 70;
  wingAncestor.alive = false;
  const wingSummary = buildLifeSummaryAndLegacy(wingAncestor);

  const hall = summarizeDynastyHallOfLegends([colorSummary, distSummary, fingerSummary, wingSummary]);
  assert.equal(hall.totalLives, 4);
  assert.equal(hall.colorCount, 1);
  assert.equal(hall.distortionCount, 1);
  assert.equal(hall.egoCount, 1);
  assert(hall.apexLeaderCount >= 2);
  assert(hall.legends.length >= 3);
  console.log('  ✓ Pillar 1: Living Ancestor Echoes & Dynasty Hall of Legends verified');
}

// ----------------------------------------------------------------------------
// 2. INTER-DISTRICT TRANSIT & REGIONAL SINGULARITY MECHANICS
// ----------------------------------------------------------------------------
{
  const traveler = createNewCharacter({ seed: 'transit-test-1', startAge: 25 });
  traveler.job = 'Fixer';
  traveler.fixerGrade = 6;
  traveler.regionId = 'D';
  traveler.stats.wealth = 50;
  traveler.stats.health = 60;

  const checkK = canRelocateDistrict(traveler, 'K');
  assert.equal(checkK.ok, true, 'Should be able to relocate to District 11 (K Corp)');

  const initialSanity = traveler.stats.sanity;
  const resK = relocateCharacterDistrict(traveler, 'K');
  assert.equal(resK.ok, true);
  assert.equal(traveler.regionId, 'K');
  assert.equal(traveler.stats.health, 72, 'Arriving at K Corp should heal +12 HP');
  assert(traveler.stats.sanity < initialSanity, 'Non-VIP WARP + K Corp bio-scan must carry a Sanity cost');

  // Cannot relocate twice in the same year
  const secondMoveSameYear = canRelocateDistrict(traveler, 'T');
  assert.equal(secondMoveSameYear.ok, false, 'Cannot relocate twice in the same year');

  // End year -> Regional Singularity Passive triggers (+3 HP in K Corp, -2 Ahn co-pay)
  traveler.stats.health = 70;
  const afterYear = endYear(traveler, () => 0.5);
  assert(afterYear.stats.health >= 71, 'K Corp annual Singularity passive must restore health');

  // Relocate to T Corp in the new year
  afterYear.stats.wealth = 60;
  const hpBeforeT = afterYear.stats.health;
  const resT = relocateCharacterDistrict(afterYear, 'T');
  assert.equal(resT.ok, true);
  assert(afterYear.flags.includes('TCorpTimeBorrowed'), 'Arriving at T Corp must grant TCorpTimeBorrowed');
  assert.equal(afterYear.stats.health, hpBeforeT - 5, 'T Corp 28-hour time loan must drain -5 HP on arrival');
  console.log('  ✓ Pillar 2: Inter-District Transit & Regional Singularity Mechanics (Hard-But-Fair) verified');
}

// ----------------------------------------------------------------------------
// 3. APEX COMMAND DIRECTIVES
// ----------------------------------------------------------------------------
{
  const rookie = createNewCharacter({ seed: 'apex-rookie', startAge: 20 });
  rookie.job = 'Fixer';
  rookie.fixerGrade = 8;
  assert.equal(isApexCommander(rookie), false, 'Grade 8 rookie is not an Apex Commander');

  const commander = createNewCharacter({ seed: 'apex-leader', startAge: 32 });
  commander.job = 'Color Fixer';
  commander.fixerGrade = 0;
  commander.flags.push('ColorFixer');
  commander.stats.wealth = 40;
  commander.stats.rep = 50;
  commander.heat = 10;
  commander.stats.sanity = 60;
  commander.merit = 20;
  commander.pendingYearPlan = { age: 32 };
  assert.equal(isApexCommander(commander), true, 'Color Fixer is an Apex Commander');

  const ok = applyAnnualPlan(commander, defaultYearPoints(), 'rank', 'dispatch_squad');
  assert.equal(ok, true);
  assert(commander.flags.includes('ApexDirectiveIssued'), 'Applying directive should grant ApexDirectiveIssued');
  assert.equal(commander.merit, 26, 'dispatch_squad should grant +6 Merit');
  assert.equal(commander.stats.wealth, 40 + 2 + 5, 'work(1)*2 + dispatch_squad(5) = +7 Ahn');
  assert.equal(commander.heat, 15, 'dispatch_squad must incur +5 Heat from rival countermeasures');
  console.log('  ✓ Pillar 3: Apex Command Directives (Hard-But-Fair) verified');
}

// ----------------------------------------------------------------------------
// 4. WORKSHOP SINGULARITY IMBUEMENT
// ----------------------------------------------------------------------------
{
  const smith = createNewCharacter({ seed: 'smith-imbue-1', startAge: 28 });
  smith.job = 'Workshop Craftsman';
  smith.stats.wealth = 15;
  smith.stats.health = 70;
  smith.stats.sanity = 70;
  smith.heat = 10;
  smith.craftWeapon = { name: 'Zelkova Cleaver', combatPower: 30, gradeLabel: 'Fine Work' };
  smith.inventory = [{ id: 'rel_warp_shard', nameVi: 'Mảnh Dị Chiều W Corp', nameEn: 'W Corp Dimensional Shard', type: 'special' }];

  const baseContract = generateFixerContract(smith, () => 0.3);
  const canCheck = canImbueEquipment(smith, 'rel_warp_shard');
  assert.equal(canCheck.ok, true, 'Craftsman with craftWeapon and relic should be able to imbue');
  assert.equal(canCheck.cost, 0, 'Workshop Craftsman gets free Singularity Imbuement');

  const imbueRes = imbueCharacterEquipment(smith, 'rel_warp_shard');
  assert.equal(imbueRes.ok, true);
  assert(smith.flags.includes('SingularityImbued'), 'Should grant SingularityImbued flag');
  assert(getImbuedCombatBonus(smith) >= 24, 'Craftsman should receive +18 base +6 craftsman bonus combat power');
  assert.equal(smith.stats.health, 67, 'Craftsman anvil toil should cost -3 HP');
  assert.equal(smith.stats.sanity, 62, 'W Corp Dimensional Shard corrosion should cost -8 SP');
  assert.equal(smith.heat, 16, 'W Corp Dimensional Shard should add +6 Heat from Rip Space signature');
  assert(smith.craftWeapon.name.includes('Xé Chiều W Corp'), 'Weapon name should gain Singularity prefix');

  const imbuedContract = generateFixerContract(smith, () => 0.3);
  assert(
    imbuedContract.approaches[0].successPct >= baseContract.approaches[0].successPct,
    'Imbued weapon must boost contract success odds'
  );

  const mastery = getDungeonMastery(DUNGEON_DEFINITIONS.dungeon_warp_train, smith);
  assert(mastery.labelEn.includes('Singularity Imbued'), 'Dungeon mastery must recognize Singularity Imbued gear');
  console.log('  ✓ Pillar 4: Workshop Singularity Imbuement verified');
}

// ----------------------------------------------------------------------------
// 5. BATCH 66 UI UPGRADES (TASTESKILL V2, ANTISLOP, ACCESSIBILITY & GAME-FEEL)
// ----------------------------------------------------------------------------
{
  const fs = await import('node:fs');
  const tokensCss = fs.readFileSync('src/styles/ui/tokens.css', 'utf8');
  const overlaysCss = fs.readFileSync('src/styles/ui/overlays.css', 'utf8');
  const deltasSrc = fs.readFileSync('src/features/chronicle/components/Deltas.jsx', 'utf8');
  const npcModalSrc = fs.readFileSync('src/features/chronicle/components/NpcDossierModal.jsx', 'utf8');
  const dossierSrc = fs.readFileSync('src/features/chronicle/components/CharacterDossierCard.jsx', 'utf8');
  const depotSrc = fs.readFileSync('src/features/chronicle/components/WorkshopDepotModal.jsx', 'utf8');
  const yearPlanSrc = fs.readFileSync('src/features/chronicle/components/YearPlanDock.jsx', 'utf8');

  assert(tokensCss.includes('--accent: #c43232;'), 'Primary accent token must meet WCAG AA contrast');
  assert(!overlaysCss.includes('transition: all'), 'overlays.css must not use transition: all');
  assert(!overlaysCss.includes('Cinzel'), 'overlays.css must not reference unloaded Cinzel font');
  assert(overlaysCss.includes('.settings-slider:focus-visible'), 'Settings slider must have keyboard focus-visible ring');
  assert(!deltasSrc.includes('STAT_ICONS'), 'Deltas.jsx must use semantic token dots instead of dingbat icons');
  assert(npcModalSrc.includes("event.key === 'Escape'"), 'NpcDossierModal must close on Escape key');
  assert(dossierSrc.includes('npc is-interactive') && dossierSrc.includes('onSelectRole(role)'), 'Dossier NPC cards must be interactive and keyboard-accessible');
  assert(depotSrc.includes('renderTradeoffChips') && depotSrc.includes('gameFeel.addTrauma'), 'WorkshopDepotModal must render quantitative trade-off chips and gameFeel feedback');
  assert(yearPlanSrc.includes('renderDirectiveChips'), 'YearPlanDock must render quantitative trade-off chips for Apex Directives');
  console.log('  ✓ Pillar 5: Batch 66 UI Upgrades (tasteskill v2, antislop, WCAG AA, keyboard/mobile & game-feel) verified');
}

console.log('=== ALL BATCH 64 & 66 SYSTEM/UI UPGRADE TESTS PASSED ===');
