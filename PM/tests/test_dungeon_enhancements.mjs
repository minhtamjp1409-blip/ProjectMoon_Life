import assert from 'node:assert/strict';
import {
  DUNGEON_DEFINITIONS,
  DUNGEON_GIMMICKS,
  createDungeonSession,
  resolveDungeonChoice
} from '../src/engine/dungeonEngine.js';
import {
  DUNGEON_EXTRACTION_REWARDS,
  COMPANION_STAGE_BANTER,
  getCompanionStageBanter
} from '../src/data/dungeonExtras.js';
import { ITEMS_CATALOG, getItemById } from '../src/data/itemsData.js';
import { createNewCharacter } from '../src/engine/gameEngine.js';

console.log('--- Testing Dungeon Optimization & Enhancements ---');

// 1. Verify Dungeon Gimmicks
console.log('1. Checking Dungeon Gimmicks...');
assert.ok(DUNGEON_GIMMICKS, 'DUNGEON_GIMMICKS must be defined');
assert.ok(DUNGEON_GIMMICKS.warp, 'warp gimmick must exist');
assert.ok(DUNGEON_GIMMICKS.lobotomy, 'lobotomy gimmick must exist');
assert.ok(DUNGEON_GIMMICKS.greatlake, 'greatlake gimmick must exist');
assert.ok(DUNGEON_GIMMICKS.bloodfiend, 'bloodfiend gimmick must exist');
assert.ok(DUNGEON_GIMMICKS.outskirts, 'outskirts gimmick must exist');
assert.ok(DUNGEON_GIMMICKS.night, 'night gimmick must exist');

for (const [theme, g] of Object.entries(DUNGEON_GIMMICKS)) {
  assert.ok(g.nameVi && g.nameEn, `Theme ${theme} gimmick must have bilingual names`);
  assert.ok(g.descVi && g.descEn, `Theme ${theme} gimmick must have bilingual descriptions`);
}
console.log('   ok: all 6 themes have rich tactical environmental gimmicks.');

// 2. Checking createDungeonSession attaches gimmick
console.log('2. Checking createDungeonSession attaches gimmick...');
const char = createNewCharacter({ customName: 'DungeonTester' });
const warpSession = createDungeonSession('dungeon_warp_train', char);
assert.ok(warpSession, 'warpSession created');
assert.equal(warpSession.gimmick?.id, 'warp_pressure');

const lCorpSession = createDungeonSession('dungeon_lobotomy_ruin', char);
assert.ok(lCorpSession, 'lCorpSession created');
assert.equal(lCorpSession.gimmick?.id, 'qlippoth_meltdown');
console.log('   ok: sessions correctly initialize with active environmental gimmicks.');

// 3. Verify Contextual Companion Banter
console.log('3. Checking Contextual Companion Banter...');
const companion = {
  nameVi: 'Gregor',
  nameEn: 'Gregor',
  role: 'partner',
  archetype: 'veteran'
};
const banter0 = getCompanionStageBanter(companion, 'warp', 0);
assert.ok(banter0, 'Banter returned');
assert.ok(banter0.vi.length > 5, 'Banter has Vietnamese line');
assert.ok(banter0.en.length > 5, 'Banter has English line');
assert.equal(banter0.nameVi, 'Gregor');

// Test fallback for hothead, cautious, loyal, gambler, etc.
for (const arch of ['hothead', 'cautious', 'loyal', 'gambler', 'idealist', 'tinkerer', 'cynic', 'proud', 'silent']) {
  const b = getCompanionStageBanter({ nameVi: 'Test', nameEn: 'Test', archetype: arch }, 'lobotomy', 1);
  assert.ok(b && b.vi.length > 0, `Archetype ${arch} must yield banter`);
}
console.log('   ok: all archetypes yield contextual atmospheric stage banter.');

// 4. Verify Relic Extraction & Signature Gear
console.log('4. Checking Relic Extraction Rewards...');
assert.ok(DUNGEON_EXTRACTION_REWARDS, 'DUNGEON_EXTRACTION_REWARDS must exist');

for (const [dungeonId, relicId] of Object.entries(DUNGEON_EXTRACTION_REWARDS)) {
  assert.ok(DUNGEON_DEFINITIONS[dungeonId], `Dungeon ${dungeonId} must exist in definitions`);
  const item = getItemById(relicId);
  assert.ok(item, `Relic ${relicId} for dungeon ${dungeonId} must exist in ITEMS_CATALOG`);
  assert.ok(item.nameVi && item.nameEn, `Relic ${relicId} must have bilingual name`);
  assert.ok(item.descVi && item.descEn, `Relic ${relicId} must have bilingual description`);
}
console.log('   ok: all signature extraction relics exist in ITEMS_CATALOG with full metadata.');

// 5. Test Relic Acquisition on Dungeon Conquest
console.log('5. Testing Relic Acquisition on Dungeon Conquest...');
let testChar = createNewCharacter({ customName: 'RelicSeeker', seed: 'relic-seeker-test' });
testChar.stats.health = 100;
testChar.stats.sanity = 100;
testChar.inventory = [];

// Simulate solving all 4 stages of outskirts ruins to conquer
let s = createDungeonSession('dungeon_outskirts_ruins', testChar);
testChar.pendingDungeon = s;

for (let stage = 0; stage < 4; stage++) {
  const res = resolveDungeonChoice(testChar, 0, () => 0.5);
  testChar = res.char;
  s = res.session;
  if (res.isFinished) {
    break;
  }
}

// Check that relic was extracted into inventory
const hasMonolith = (testChar.inventory || []).some(i => i.id === 'rel_ruin_monolith');
assert.ok(hasMonolith, 'Player must have extracted rel_ruin_monolith upon conquering Outskirts Ruins');
console.log('   ok: conquering dungeon successfully extracts signature relic into player inventory.');

console.log('--- ALL DUNGEON OPTIMIZATION & ENHANCEMENT TESTS PASSED ---');
