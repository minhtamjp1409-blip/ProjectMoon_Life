import assert from 'assert';
import {
  createNewCharacter,
  createRNG,
  resolveEventChoice,
  DUNGEON_DEFINITIONS,
  createDungeonSession,
  getDungeonCurrentStage,
  isDungeonChoiceAvailable,
  resolveDungeonChoice,
  fleeDungeon
} from '../src/engine/gameEngine.js';
import { DERIVATIVE_LORE_EVENTS } from '../src/data/eventsDerivativeLore.js';
import { FACTION_EVENTS } from '../src/data/eventsFactions.js';
import { CHILDHOOD_EVENTS } from '../src/data/eventsChildhood.js';

console.log('--- RUNNING DUNGEON MECHANICS TEST SUITE ---');

const rng = createRNG('dungeon_test_seed_42');

// 1. Definition Integrity
console.log('1. Checking DUNGEON_DEFINITIONS integrity...');
const expectedDungeons = [
  'dungeon_warp_train',
  'dungeon_lobotomy_ruin',
  'dungeon_bloodfiend_carnival',
  'dungeon_outskirts_ruins'
];

for (const dungeonId of expectedDungeons) {
  const def = DUNGEON_DEFINITIONS[dungeonId];
  assert(def, `Missing definition for ${dungeonId}`);
  assert.strictEqual(def.id, dungeonId);
  assert(def.titleVi && def.titleEn, `Missing titles in ${dungeonId}`);
  assert(Array.isArray(def.stages), `Stages must be an array in ${dungeonId}`);
  assert.strictEqual(def.stages.length, 4, `Dungeon ${dungeonId} must have exactly 4 stages`);

  def.stages.forEach((stage, sIdx) => {
    assert.strictEqual(stage.stageIndex, sIdx, `Stage index mismatch in ${dungeonId}`);
    assert(stage.nameVi && stage.nameEn, `Stage ${sIdx} missing name in ${dungeonId}`);
    assert(stage.descVi && stage.descEn, `Stage ${sIdx} missing description in ${dungeonId}`);
    assert(Array.isArray(stage.choices) && stage.choices.length > 0, `Stage ${sIdx} missing choices`);
  });
}
console.log('✓ All 4 iconic 4-stage dungeons defined with full bilingual metadata.');

// 2. Session Initialization
console.log('2. Checking createDungeonSession...');
const dummyChar = createNewCharacter({ seed: 'session_init_seed' });
const session = createDungeonSession('dungeon_warp_train', dummyChar, rng);
assert(session, 'Failed to create dungeon session');
assert.strictEqual(session.id, 'dungeon_warp_train');
assert.strictEqual(session.currentStageIndex, 0);
assert.strictEqual(session.sanityStrain, 0);
assert.strictEqual(session.accumulatedLootAhn, 0);
assert(Array.isArray(session.logs), 'Session logs must be an array');
console.log('✓ createDungeonSession initialized valid session state.');

// 3. Item Requirement Utility Checks
console.log('3. Checking item requirements in isDungeonChoiceAvailable...');
const stage0 = getDungeonCurrentStage(session);
const kCorpChoice = stage0.choices.find(c => c.reqItem === 'con_kcorp_ampoule');
assert(kCorpChoice, 'K Corp Ampoule choice not found in stage 0');

// Char without K Corp Ampoule
dummyChar.inventory = [];
assert.strictEqual(isDungeonChoiceAvailable(kCorpChoice, dummyChar), false, 'Choice should be locked without item');

// Char with K Corp Ampoule
dummyChar.inventory = [{ id: 'con_kcorp_ampoule', nameVi: 'Ống Tiêm K Corp' }];
assert.strictEqual(isDungeonChoiceAvailable(kCorpChoice, dummyChar), true, 'Choice should be available with item');
console.log('✓ Item utility checks properly gate dungeon choices.');

// 4. Sequential Delve & Sanity Strain Progression
console.log('4. Testing multi-stage progression through 4 nodes...');
let testChar = createNewCharacter({ seed: 'delve_char_seed' });
testChar.pendingDungeon = createDungeonSession('dungeon_warp_train', testChar, rng);
testChar.inventory = [{ id: 'con_kcorp_ampoule', nameVi: 'Ống Tiêm K Corp' }];

// Stage 0 -> Pick choice 1 (consumes item)
const step0 = resolveDungeonChoice(testChar, 1, rng);
assert.strictEqual(step0.isFinished, false, 'Dungeon should not finish on stage 0');
assert.strictEqual(step0.char.pendingDungeon.currentStageIndex, 1, 'Should advance to stage 1');
assert(step0.char.inventory.length === 0, 'K Corp Ampoule should be consumed');
assert(step0.char.pendingDungeon.sanityStrain >= 0, 'Sanity Strain should update');

// Stage 1 -> Pick choice 0 (suppression staff, adds loot)
const step1 = resolveDungeonChoice(step0.char, 0, rng);
assert.strictEqual(step1.isFinished, false, 'Dungeon should not finish on stage 1');
assert.strictEqual(step1.char.pendingDungeon.currentStageIndex, 2, 'Should advance to stage 2');
assert(step1.char.pendingDungeon.accumulatedLootAhn > 0, 'Should accumulate loot Ahn');

// Stage 2 -> Pick choice 1 (crush amalgam)
const step2 = resolveDungeonChoice(step1.char, 1, rng);
assert.strictEqual(step2.isFinished, false, 'Dungeon should not finish on stage 2');
assert.strictEqual(step2.char.pendingDungeon.currentStageIndex, 3, 'Should advance to stage 3');

// Stage 3 -> Pick final choice (take bounty and step out)
const initialWealth = step2.char.stats.wealth;
const step3 = resolveDungeonChoice(step2.char, 0, rng);
assert.strictEqual(step3.isFinished, true, 'Dungeon must finish at final stage');
assert.strictEqual(step3.char.pendingDungeon, null, 'pendingDungeon must clear after completion');
assert(step3.resolution, 'Resolution summary must be returned');
assert.strictEqual(step3.resolution.isDead, false, 'Character should survive completion');
assert(step3.char.stats.wealth > initialWealth, 'Accumulated loot and stage rewards must be credited');
console.log(`✓ Completed 4 stages: accumulated loot awarded (+${step3.char.stats.wealth - initialWealth} Ahn), session resolved cleanly.`);

// 5. Safe Evacuation / Flee Logic
console.log('5. Testing safe evacuation (fleeDungeon)...');
let fleeChar = createNewCharacter({ seed: 'flee_char_seed' });
fleeChar.pendingDungeon = createDungeonSession('dungeon_lobotomy_ruin', fleeChar, rng);
fleeChar.pendingDungeon.accumulatedLootAhn = 45;

const beforeFleeWealth = fleeChar.stats.wealth;
const fleeRes = fleeDungeon(fleeChar);
assert.strictEqual(fleeRes.isFinished, true, 'fleeDungeon must finish session');
assert.strictEqual(fleeRes.char.pendingDungeon, null, 'pendingDungeon must be cleared on flee');
assert(fleeRes.resolution, 'Resolution must accompany evacuation');
assert.strictEqual(fleeRes.char.stats.wealth, beforeFleeWealth + 45, 'Accumulated loot must be retained upon safe evacuation');
console.log('✓ Emergency evacuation successfully preserves life and accumulated loot.');

// 6. Death Handling in Dungeon
console.log('6. Testing lethal wounds in dungeon...');
let mortalChar = createNewCharacter({ seed: 'mortal_seed' });
mortalChar.pendingDungeon = createDungeonSession('dungeon_bloodfiend_carnival', mortalChar, rng);
mortalChar.stats.health = 2; // Critical low health

// Pick choice 1 with health damage (-4 hp) when char only has 2 hp
const lethalRes = resolveDungeonChoice(mortalChar, 1, rng);
assert.strictEqual(lethalRes.isFinished, true, 'Lethal damage must terminate dungeon');
assert.strictEqual(lethalRes.char.alive, false, 'Character must be marked deceased');
assert(lethalRes.char.deathCauseVi.includes('Bỏ mạng'), 'Death cause must reflect dungeon demise');
assert.strictEqual(lethalRes.resolution.isDead, true, 'Resolution must mark death');
console.log('✓ Dungeon death properly triggers fatality mechanics and epitaph causes.');

// 7. Event Integration Checks
console.log('7. Verifying major events trigger dungeon sessions...');
// Check WARP train event
const warpEvent = DERIVATIVE_LORE_EVENTS.find(e => e.id === 'wcorp_cleaning_crew_amnesia');
assert(warpEvent, 'wcorp_cleaning_crew_amnesia not found');
assert.strictEqual(warpEvent.choices[0].startDungeon, 'dungeon_warp_train', 'wcorp choice 0 must trigger dungeon_warp_train');

// Check Lobotomy event
const lcorpEvent = FACTION_EVENTS.find(e => e.id === 'wing_lobotomy_ruin_cogito_salvage');
assert(lcorpEvent, 'wing_lobotomy_ruin_cogito_salvage not found');
assert.strictEqual(lcorpEvent.choices[0].startDungeon, 'dungeon_lobotomy_ruin', 'lcorp choice 0 must trigger dungeon_lobotomy_ruin');

// Check Bloodfiend Carnival event
const carnivalEvent = DERIVATIVE_LORE_EVENTS.find(e => e.id === 'bloodfiend_carnival_pcorp');
assert(carnivalEvent, 'bloodfiend_carnival_pcorp not found');
assert.strictEqual(carnivalEvent.choices[0].startDungeon, 'dungeon_bloodfiend_carnival', 'carnival choice 0 must trigger dungeon_bloodfiend_carnival');

// Check Outskirts event
const outskirtsEvent = CHILDHOOD_EVENTS.find(e => e.id === 'ch_outskirts_ruins_expedition');
assert(outskirtsEvent, 'ch_outskirts_ruins_expedition not found');
assert.strictEqual(outskirtsEvent.choices[0].startDungeon, 'dungeon_outskirts_ruins', 'outskirts choice 0 must trigger dungeon_outskirts_ruins');

// Test resolving event sets pendingDungeon
let eventChar = createNewCharacter({ seed: 'event_trigger_seed' });
eventChar.pendingEvent = warpEvent;
eventChar = resolveEventChoice(eventChar, 0, rng);
assert(eventChar.pendingDungeon, 'resolveEventChoice must set pendingDungeon');
assert.strictEqual(eventChar.pendingDungeon.id, 'dungeon_warp_train');
console.log('✓ All major events properly trigger corresponding micro-dungeon delves.');

console.log('--- ALL DUNGEON MECHANICS TESTS PASSED (100%) ---');
