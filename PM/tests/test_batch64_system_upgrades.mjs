import assert from 'node:assert/strict';
import {
  createNewCharacter,
  cloneChar,
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
import { matchesEventContext, isOutsideCity } from '../src/engine/eventConditions.js';
import { ITEMS_CATALOG } from '../src/data/itemsData.js';

console.log('=== TEST SUITE: BATCH 64-68 SYSTEM UPGRADES (5 PILLARS) ===');

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

  // Batch 68: Outskirts border entry gate & flag synchronization
  const outskirter = createNewCharacter({ seed: 'outskirts-transit-gate', startAge: 22, preferredRegionId: 'OUTSKIRTS' });
  outskirter.job = 'Scavenger';
  outskirter.stats.wealth = 50;
  outskirter.stats.network = 10;
  outskirter.stats.rep = 5;
  assert.equal(isOutsideCity(outskirter), true, 'Outskirts native starts outside the City');

  const deniedBorder = canRelocateDistrict(outskirter, 'K');
  assert.equal(deniedBorder.ok, false, 'Outskirts resident without entry clearance cannot buy City transit');

  outskirter.stats.network = 28; // Smuggler contacts (>= 25 Network)
  const allowedBorder = canRelocateDistrict(outskirter, 'K');
  assert.equal(allowedBorder.ok, true, 'Outskirts resident with smuggler contacts can cross into District K');

  const crossRes = relocateCharacterDistrict(outskirter, 'K');
  assert.equal(crossRes.ok, true);
  assert.equal(outskirter.regionId, 'K');
  assert.equal(outskirter.flags.includes('Outskirts'), false, 'Crossing into District K must clear Outskirts flag');
  assert.equal(outskirter.flags.includes('EnteredCity'), true, 'Crossing into District K must grant EnteredCity flag');
  assert.equal(isOutsideCity(outskirter), false, 'isOutsideCity must return false after relocating into District K');

  // Permit item IDs & Workshop catalog price alignment
  const nestPermitItem = ITEMS_CATALOG.find((it) => it.id === 'spc_nest_migration_permit');
  assert.ok(nestPermitItem, 'spc_nest_migration_permit must exist in ITEMS_CATALOG');
  assert(nestPermitItem.costAhn <= 100, 'spc_nest_migration_permit cost must not exceed max wealth 100');
  assert.equal(nestPermitItem.costAhn, 85, 'spc_nest_migration_permit cost must be 85 Ahn');

  const devyatPassItem = ITEMS_CATALOG.find((it) => it.id === 'spc_devyat_courier_pass');
  assert.ok(devyatPassItem, 'spc_devyat_courier_pass must exist in ITEMS_CATALOG');
  assert.equal(devyatPassItem.costAhn, 45, 'spc_devyat_courier_pass cost must be 45 Ahn');

  const permitBearer = createNewCharacter({ seed: 'outskirts-permit-bearer', startAge: 20, preferredRegionId: 'OUTSKIRTS' });
  permitBearer.job = 'Scavenger';
  permitBearer.stats.wealth = 50;
  permitBearer.stats.network = 5;
  permitBearer.stats.rep = 5;
  permitBearer.inventory = [{ id: 'spc_devyat_courier_pass', nameVi: 'Thẻ thông hành Devyat Association' }];
  assert.equal(canRelocateDistrict(permitBearer, 'K').ok, true, 'Bearer of spc_devyat_courier_pass can cross into District K');

  const nestPermitBearer = createNewCharacter({ seed: 'outskirts-nest-permit-bearer', startAge: 20, preferredRegionId: 'OUTSKIRTS' });
  nestPermitBearer.job = 'Scavenger';
  nestPermitBearer.stats.wealth = 50;
  nestPermitBearer.stats.network = 5;
  nestPermitBearer.stats.rep = 5;
  nestPermitBearer.inventory = [{ id: 'spc_nest_migration_permit', nameVi: 'Thị thực định cư Nest' }];
  assert.equal(canRelocateDistrict(nestPermitBearer, 'K').ok, true, 'Bearer of spc_nest_migration_permit can cross into District K');

  const ampouleBearer = createNewCharacter({ seed: 'outskirts-ampoule-bearer', startAge: 20, preferredRegionId: 'OUTSKIRTS' });
  ampouleBearer.job = 'Scavenger';
  ampouleBearer.stats.wealth = 50;
  ampouleBearer.stats.network = 5;
  ampouleBearer.stats.rep = 5;
  ampouleBearer.inventory = [{ id: 'con_kcorp_ampoule', nameVi: 'Ống tiêm sinh học K Corp' }];
  assert.equal(canRelocateDistrict(ampouleBearer, 'K').ok, true, 'Bearer of con_kcorp_ampoule can cross into District K');

  const childWithPermit = createNewCharacter({ seed: 'outskirts-child-permit', startAge: 12, preferredRegionId: 'OUTSKIRTS' });
  childWithPermit.job = 'Child';
  childWithPermit.flags.push('NestResident');
  childWithPermit.inventory = [{ id: 'spc_nest_migration_permit', nameVi: 'Thị thực định cư Nest' }];
  assert.equal(canRelocateDistrict(childWithPermit, 'K').ok, false, 'Unaccompanied child in Outskirts cannot independently cross border');
  console.log('  ✓ Pillar 2: Inter-District Transit, Outskirts Gate & Regional Singularity Mechanics verified');
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
// 4. WORKSHOP SINGULARITY IMBUEMENT & STATE ISOLATION
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

  // Batch 68: Equipped item state isolation across cloneChar & inventory sync
  const fixer = createNewCharacter({ seed: 'fixer-imbue-isolation', startAge: 26 });
  fixer.job = 'Fixer';
  fixer.stats.wealth = 30;
  const baseBlade = { id: 'wpn_stigma_blade', nameVi: 'Kiếm Stigma', nameEn: 'Stigma Blade', type: 'weapon', combatPower: 18 };
  const relicItem = { id: 'rel_warp_shard', nameVi: 'Mảnh Dị Chiều W Corp', nameEn: 'W Corp Dimensional Shard', type: 'special' };
  fixer.inventory = [{ ...baseBlade }, { ...relicItem }];
  fixer.equipped = { weapon: fixer.inventory[0], armor: null, consumable: null, utility: null };

  const clonedNext = cloneChar(fixer);
  const eqImbueRes = imbueCharacterEquipment(clonedNext, 'rel_warp_shard');
  assert.equal(eqImbueRes.ok, true);
  assert.equal(fixer.equipped.weapon.nameEn, 'Stigma Blade', 'Previous state equipped.weapon must not be mutated');
  assert.equal(fixer.equipped.weapon.imbuedRelicId, undefined, 'Previous state equipped.weapon must not gain imbuedRelicId');
  assert(clonedNext.equipped.weapon.nameEn.includes('Rift-Edge'), 'Cloned state equipped.weapon must gain Singularity prefix');
  assert.equal(clonedNext.inventory[0].imbuedRelicId, 'rel_warp_shard', 'Matching weapon in clonedNext.inventory must also be updated');
  assert.equal(clonedNext.equipped.weapon, clonedNext.inventory[0], 'clonedNext.equipped.weapon and inventory item must stay synchronized');
  console.log('  ✓ Pillar 4: Workshop Singularity Imbuement & State Isolation verified');
}

// ----------------------------------------------------------------------------
// 5. BATCH 66-68 UI UPGRADES (TASTESKILL V2, ANTISLOP, ACCESSIBILITY & MOBILE)
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
  const birthSetupSrc = fs.readFileSync('src/features/chronicle/components/BirthSetupPanel.jsx', 'utf8');

  const tokenHex = (name) => tokensCss.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1];
  const luminance = (hex) => {
    assert(hex, 'Contrast check requires a concrete colour token');
    const rgb = hex.slice(1).match(/.{2}/g).map((channel) => {
      const value = parseInt(channel, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  assert(contrast(luminance(tokenHex('accent')), luminance(tokenHex('accent-ink'))) >= 4.5,
    'Primary button text must meet WCAG AA contrast');
  assert(contrast(luminance(tokenHex('text')), luminance(tokenHex('dialog-surface'))) >= 4.5,
    'Dialog text must meet WCAG AA contrast');
  assert(!overlaysCss.includes('transition: all'), 'overlays.css must not use transition: all');
  assert(!overlaysCss.includes('Cinzel'), 'overlays.css must not reference unloaded Cinzel font');
  assert(overlaysCss.includes('.settings-slider:focus-visible'), 'Settings slider must have keyboard focus-visible ring');
  assert(!deltasSrc.includes('STAT_ICONS'), 'Deltas.jsx must use semantic token dots instead of dingbat icons');
  assert(npcModalSrc.includes("event.key === 'Escape'") && npcModalSrc.includes("event.key === 'Tab'"), 'NpcDossierModal must trap Tab focus and close on Escape');
  assert(dossierSrc.includes('npc is-interactive') && dossierSrc.includes('onSelectRole(role)'), 'Dossier NPC cards must be interactive and keyboard-accessible');
  assert(depotSrc.includes('renderTradeoffChips') && depotSrc.includes('gameFeel.addTrauma'), 'WorkshopDepotModal must render quantitative trade-off chips and gameFeel feedback');
  assert(depotSrc.includes('aria-controls="depot-tabpanel"') && depotSrc.includes("e.key === 'ArrowRight'"), 'WorkshopDepotModal tabs must implement WAI-ARIA tablist and arrow key navigation');
  assert(yearPlanSrc.includes('renderDirectiveChips'), 'YearPlanDock must render quantitative trade-off chips for Apex Directives');
  assert(
    birthSetupSrc.indexOf('id="birth-region"') > 0 &&
    birthSetupSrc.indexOf('id="birth-region"') < birthSetupSrc.indexOf('hero-start-btn'),
    'BirthSetupPanel must place #birth-region selector before the start button on mobile'
  );
  console.log('  ✓ Pillar 5: Batch 66-68 UI Upgrades (tasteskill v2, antislop, WCAG AA, focus trap, WAI-ARIA tabs & mobile birthplace) verified');
}

// ----------------------------------------------------------------------------
// 6. BATCH 69 FAILBETTER ROADMAP: MILESTONES, COLOR TRIAL & DISTORTION REGEN
// ----------------------------------------------------------------------------
{
  const { getNextCareerMilestone, getEgoReadiness, ALL_STORY_EVENTS, createRNG } = await import('../src/engine/gameEngine.js');
  const { endYear } = await import('../src/engine/yearPlanner.js');
  const { triggerDistortionTransformation } = await import('../src/engine/careerPipeline.js');

  // Test 1: Milestone requirements have sources and Distortion has dedicated category
  const rookieFixer = createNewCharacter({ seed: 'failbetter-rookie', startAge: 20 });
  rookieFixer.job = 'Fixer';
  rookieFixer.fixerGrade = 9;
  const rookieMilestone = getNextCareerMilestone(rookieFixer);
  assert(rookieMilestone.requirements.every((r) => Array.isArray(r.sources) && r.sources.length > 0), 'Milestone requirements must have sources array');

  const distortedEntity = createNewCharacter({ seed: 'failbetter-distort', startAge: 25 });
  distortedEntity.job = 'Distortion';
  distortedEntity.flags.push('Distorted');
  distortedEntity.resonance = 75;
  const distortMilestone = getNextCareerMilestone(distortedEntity);
  assert.equal(distortMilestone.category, 'DISTORTION METAMORPHOSIS', 'Distortion must have dedicated DISTORTION METAMORPHOSIS category');

  // Test 2: E.G.O Readiness Horizon evaluation
  const dormantChar = createNewCharacter({ seed: 'ego-dormant', startAge: 22 });
  dormantChar.resonance = 20;
  assert.equal(getEgoReadiness(dormantChar).status, 'dormant');

  const stirringChar = createNewCharacter({ seed: 'ego-stirring', startAge: 22 });
  stirringChar.resonance = 55;
  stirringChar.stats.sanity = 60;
  assert.equal(getEgoReadiness(stirringChar).status, 'stirring');

  // Resonance 70 with sanity 60 is stirring (opportunity has not opened yet, real trigger needs 74)
  const notQuiteImminent = createNewCharacter({ seed: 'ego-stirring-70', startAge: 22 });
  notQuiteImminent.resonance = 70;
  notQuiteImminent.stats.sanity = 60;
  assert.equal(getEgoReadiness(notQuiteImminent).status, 'stirring');

  const imminentResChar = createNewCharacter({ seed: 'ego-imminent-res', startAge: 22 });
  imminentResChar.resonance = 75; // Apex Resonance >= 74
  assert.equal(getEgoReadiness(imminentResChar).status, 'imminent');

  const imminentCrisisChar = createNewCharacter({ seed: 'ego-imminent-crisis', startAge: 22 });
  imminentCrisisChar.resonance = 64; // Resonance >= 62
  imminentCrisisChar.stats.sanity = 30; // Sanity <= 38
  imminentCrisisChar.scars = ['Vết sẹo của Star of the City']; // Requires >= 1 active scar
  assert.equal(getEgoReadiness(imminentCrisisChar).status, 'imminent');

  const awakenedChar = createNewCharacter({ seed: 'ego-awakened', startAge: 22 });
  awakenedChar.flags.push('EGOAwakened');
  assert.equal(getEgoReadiness(awakenedChar).status, 'awakened');

  // Test 3: Color Ascension Trial (Hana Council) choices & consequences
  const colorTrial = ALL_STORY_EVENTS.find((e) => e.id === 'hana_color_ascension_trial');
  assert.ok(colorTrial, 'hana_color_ascension_trial must exist');
  assert.equal(colorTrial.choices.length, 5, 'Color trial must have 5 choices (Alone, Seven, Companion, Attuned E.G.O, Refuse)');
  assert(colorTrial.choices[0].outcomes[0].later?.some((l) => l.id === 'csq_color_first_mandate'), 'Alone win must schedule csq_color_first_mandate');
  assert.equal(colorTrial.choices[1].costAhn, 15, 'Seven Association must cost 15 Ahn');
  assert(colorTrial.choices[1].outcomes[0].flagsAdd?.includes('AssociationDebtObligation'), 'Seven route must add AssociationDebtObligation flag');
  assert(colorTrial.choices[2].outcomes[0].later?.some((l) => l.id === 'csq_color_sponsor_aftermath'), 'Companion route must schedule csq_color_sponsor_aftermath');

  // Test 4: Distortion Anomaly Biological Tissue Regeneration
  const lowHpDistort = createNewCharacter({ seed: 'distort-regen-hp', startAge: 28 });
  lowHpDistort.job = 'Distortion';
  lowHpDistort.flags.push('Distorted');
  lowHpDistort.stats.health = 20;
  lowHpDistort.resonance = 80;
  const hpBefore = lowHpDistort.stats.health;
  const nextYearDistort = endYear(lowHpDistort, createRNG('distort-regen-hp'));
  assert(nextYearDistort.stats.health > hpBefore, 'Distortion anomaly tissue regeneration must heal low HP');

  // Test 5: Distortion transformation starts 3-stage Carmen saga
  const transformingChar = createNewCharacter({ seed: 'transform-saga', startAge: 24 });
  triggerDistortionTransformation(transformingChar);
  assert(
    (transformingChar.weaver?.pendingThreads || []).some((t) => t.eventId === 'distort_carmen_communion_1'),
    'triggerDistortionTransformation must queue distort_carmen_communion_1 into weaver.pendingThreads'
  );

  // Test 6: Annual Plan Heavy Allocation Micro Trade-Offs
  const plannerChar = createNewCharacter({ seed: 'plan-tradeoff', startAge: 25 });
  plannerChar.job = 'Fixer';
  plannerChar.fixerGrade = 7;
  plannerChar.stats.health = 50;
  plannerChar.stats.sanity = 50;
  plannerChar.npcs = {
    partner: { role: 'partner', nameVi: 'Yuri', status: 'alive', bond: 40 }
  };
  plannerChar.pendingYearPlan = { age: 25 };

  // 2 train + 1 work -> HP -2
  applyAnnualPlan(plannerChar, { train: 2, work: 1, bond: 0, rest: 0, scheme: 0 }, 'rank');
  assert.equal(plannerChar.stats.health, 48, 'Allocating 2 points in train must drain 2 HP');

  const plannerChar2 = createNewCharacter({ seed: 'plan-tradeoff-2', startAge: 26 });
  plannerChar2.job = 'Fixer';
  plannerChar2.stats.sanity = 50;
  plannerChar2.pendingYearPlan = { age: 26 };
  // 2 work + 1 rest -> SP -3 (+3 from rest = net +0)
  applyAnnualPlan(plannerChar2, { train: 0, work: 2, bond: 0, rest: 1, scheme: 0 }, 'fortune');
  assert.equal(plannerChar2.stats.sanity, 50, 'Allocating 2 points in work must drain 3 SP');

  const plannerChar3 = createNewCharacter({ seed: 'plan-tradeoff-3', startAge: 27 });
  plannerChar3.job = 'Fixer';
  plannerChar3.npcs = {
    partner: { role: 'partner', nameVi: 'Yuri', status: 'alive', bond: 40 }
  };
  plannerChar3.pendingYearPlan = { age: 27 };
  // 2 scheme + 1 bond -> Companion bond -2
  applyAnnualPlan(plannerChar3, { train: 0, work: 0, bond: 1, rest: 0, scheme: 2 }, 'survive');
  assert.equal(plannerChar3.npcs.partner.bond, 38, 'Allocating 2 points in scheme must drain 2 companion bond');

  console.log('  ✓ Pillar 6: Batch 69 Failbetter Roadmap (Milestones, Color Trial & Distortion Regen) verified');
}

console.log('=== ALL BATCH 64-69 SYSTEM/UI UPGRADE TESTS PASSED ===');
