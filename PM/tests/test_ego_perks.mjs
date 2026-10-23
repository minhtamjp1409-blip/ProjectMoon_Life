import assert from 'assert';
import {
  createNewCharacter,
  createRNG,
  DUNGEON_BALANCE,
  createDungeonSession,
  getDungeonCurrentStage,
  evaluateDungeonChoiceOdds,
  egoChargesOf,
  dungeonEgoState,
  useDungeonEgo,
  resolveDungeonChoice
} from '../src/engine/gameEngine.js';

console.log('--- RUNNING E.G.O / COLOR PERK TESTS ---');

const withFlags = (seed, flags) => {
  const c = createNewCharacter({ seed });
  c.age = 30; c.job = 'Fixer'; c.flags = [...flags];
  c.stats = { ...c.stats, health: 80, sanity: 80, wealth: 40 };
  return c;
};
const enter = (c) => ({ ...c, pendingDungeon: { ...createDungeonSession('dungeon_warp_train', c), currentStageIndex: 1 } });

console.log('1. Charges depend on the title...');
assert.strictEqual(egoChargesOf(withFlags('e1', [])), 0);
assert.strictEqual(egoChargesOf(withFlags('e2', ['EGOAwakened'])), 1);
assert.strictEqual(egoChargesOf(withFlags('e3', ['ColorFixer'])), 2);
assert.strictEqual(dungeonEgoState(enter(withFlags('e4', [])), enter(withFlags('e4', [])).pendingDungeon).reason, 'none');

console.log('2. A surge makes the stage easier and bills the mind...');
let c = enter(withFlags('e5', ['EGOAwakened']));
const stage = getDungeonCurrentStage(c.pendingDungeon);
const checked = stage.choices.find((x) => x.checkTrait);
assert(checked, 'the first stage needs a checked choice');
const before = evaluateDungeonChoiceOdds(checked, c, c.pendingDungeon);
const strain0 = c.pendingDungeon.sanityStrain;
const res0 = c.resonance || 0;
const sanity0 = c.stats.sanity;
const next = useDungeonEgo(c);
assert(next !== c);
const after = evaluateDungeonChoiceOdds(checked, next, next.pendingDungeon);
assert(after.successPct > before.successPct, 'odds must rise');
assert(next.pendingDungeon.sanityStrain > strain0, 'strain is the price');
assert(next.stats.sanity < sanity0, 'sanity is part of the price');
assert((next.resonance || 0) > res0, 'resonance is part of the price');
assert.strictEqual(next.pendingDungeon.egoCharges, 0);
assert.strictEqual(dungeonEgoState(next, next.pendingDungeon).reason, 'active');
assert.strictEqual(useDungeonEgo(next), next, 'cannot stack a second surge on the same stage');

console.log('3. The surge covers one stage only...');
const { char: moved, session } = resolveDungeonChoice(next, stage.choices.indexOf(checked), createRNG('ego_move'));
if (session) {
  assert.strictEqual(moved.pendingDungeon.egoActive, false, 'the surge ends with the stage');
  assert.strictEqual(dungeonEgoState(moved, moved.pendingDungeon).reason, 'empty');
}

console.log('4. Color pays less and holds two surges...');
const color = enter(withFlags('e6', ['ColorFixer']));
const awak = enter(withFlags('e7', ['EGOAwakened']));
const colorUsed = useDungeonEgo(color);
const awakUsed = useDungeonEgo(awak);
assert(colorUsed.pendingDungeon.sanityStrain < awakUsed.pendingDungeon.sanityStrain, 'Color pays less strain');
assert.strictEqual(colorUsed.pendingDungeon.egoCharges, 1);
assert(DUNGEON_BALANCE.ego.checkBonus > 0 && DUNGEON_BALANCE.ego.damageMult < 1);

console.log('5. Unawakened characters cannot use it...');
const plain = enter(withFlags('e8', []));
assert.strictEqual(useDungeonEgo(plain), plain);

console.log('PASS: E.G.O / Color perk tests');
