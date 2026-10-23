import assert from 'assert';
import {
  createNewCharacter,
  createRNG,
  resolveEventChoice,
  DUNGEON_DEFINITIONS,
  DUNGEON_BALANCE,
  createDungeonSession,
  getDungeonCurrentStage,
  isDungeonChoiceAvailable,
  evaluateDungeonChoiceOdds,
  getStrainTier,
  dungeonSupplyState,
  useDungeonSupply,
  resolveDungeonChoice
} from '../src/engine/gameEngine.js';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { DUNGEON_GATE_EVENTS } from '../src/data/eventsDungeonGates.js';
import { FAIL_TEXT, GENERIC_FAIL } from '../src/data/dungeonText.js';

console.log('--- RUNNING DUNGEON BALANCE AND STORY TESTS ---');

const dungeonIds = Object.keys(DUNGEON_DEFINITIONS).filter((id) => !DUNGEON_DEFINITIONS[id].noRetreat);
const rng = createRNG('dungeon_balance_seed');

// 1. Entry never pays: the stages do
console.log('1. A dungeon entry sets the scene without paying out...');
const entries = ALL_STORY_EVENTS.flatMap((e) => (e.choices || []).filter((c) => c.startDungeon).map((c) => ({ e, c })));
assert(entries.length >= 20, `expected the old entries plus the gates, found ${entries.length}`);
for (const { e, c } of entries) {
  const paid = Object.values(c.effects || c.fx || {}).some((v) => v > 0) || c.meritAdd > 0 || (c.outcomes || []).length > 0;
  assert(!paid, `${e.id}: the entry choice must not pay or roll outcomes of its own`);
}
const warpEvent = ALL_STORY_EVENTS.find((e) => e.id === 'wcorp_cleaning_crew_amnesia');
let payChar = createNewCharacter({ seed: 'entry_pays_seed' });
payChar.stats.wealth = 30;
payChar.pendingEvent = warpEvent;
const merit0 = payChar.merit || 0;
payChar = resolveEventChoice(payChar, 0, rng);
assert.strictEqual(payChar.stats.wealth, 30, 'entering must not pay Ahn');
assert.strictEqual(payChar.merit || 0, merit0, 'entering must not pay merit');
assert(payChar.pendingDungeon, 'entering must start the dungeon');
console.log(`   ok: ${entries.length} entries, none pays.`);

// 2. Every dungeon has more than one way in
console.log('2. Every dungeon has at least two entry events...');
const gatesBy = {};
for (const { e, c } of entries) (gatesBy[c.startDungeon] ||= new Set()).add(e.id);
for (const id of dungeonIds) assert((gatesBy[id]?.size || 0) >= 2, `${id} needs at least two entry events`);
const prep = DUNGEON_GATE_EVENTS.flatMap((e) => e.choices).filter((c) => c.dungeonPrep);
assert(prep.length >= 5 && prep.every((c) => (c.costAhn > 0 || c.useItem || c.favorCost?.amount > 0) && c.startDungeon), 'prepared entries must spend cash, an item or a favor and start a dungeon');
const prepEvent = DUNGEON_GATE_EVENTS.find((e) => e.choices.some((c) => c.dungeonPrep));
const prepIdx = prepEvent.choices.findIndex((c) => c.dungeonPrep);
let prepChar = createNewCharacter({ seed: 'prep_seed' });
prepChar.stats.wealth = 40;
prepChar.pendingEvent = prepEvent;
const plain = createDungeonSession(prepEvent.choices[prepIdx].startDungeon, prepChar);
prepChar = resolveEventChoice(prepChar, prepIdx, rng);
assert.strictEqual(prepChar.pendingDungeon.maxSupplies, plain.maxSupplies + 1, 'preparing buys one more supply charge');
assert.strictEqual(prepChar.stats.wealth, 40 - prepEvent.choices[prepIdx].costAhn, 'preparing costs exactly the listed Ahn');
console.log(`   ok: ${dungeonIds.length} dungeons, ${prep.length} prepared entries.`);

// 3. A failed check reads as a failure and hurts more than a success
console.log('3. A failed check has its own text and its own price...');
// Exploration checks are the Outskirts' own; the other dungeons fight floor by floor (test_dungeon_gauntlet.mjs)
const checkStage = DUNGEON_DEFINITIONS.dungeon_outskirts_ruins.stages[1];
const checkIdx = checkStage.choices.findIndex((c) => c.checkTrait === 'luck' && !c.goto);
const midRun = () => {
  const c = createNewCharacter({ seed: 'check_seed' });
  c.stats.health = 90;
  c.stats.sanity = 90;
  c.alive = true;
  c.pendingDungeon = { ...createDungeonSession('dungeon_outskirts_ruins', c), currentStageIndex: 1 };
  return c;
};
const won = resolveDungeonChoice(midRun(), checkIdx, () => 0.0);
const lost = resolveDungeonChoice(midRun(), checkIdx, () => 0.999);
assert.strictEqual(won.session.lastStageResult.type, 'check_ok');
assert.strictEqual(lost.session.lastStageResult.type, 'check_fail');
assert(lost.session.lastStageResult.vi.includes((FAIL_TEXT.outskirts.luck || GENERIC_FAIL).vi), 'a failed check must say it failed');
assert(!lost.session.lastStageResult.vi.includes(checkStage.choices[checkIdx].resultVi), 'a failed check must not narrate the success');
assert(lost.char.stats.health < won.char.stats.health, 'a failed check costs more health');
assert(lost.session.sanityStrain > won.session.sanityStrain, 'a failed check adds strain');
assert(lost.session.accumulatedLootAhn < won.session.accumulatedLootAhn, 'a failed check loses part of the stage loot');
console.log('   ok');

// 4. Strain has teeth
console.log('4. Strain lowers the odds and a breakdown ends the run...');
assert.strictEqual(getStrainTier(10).id, 'calm');
assert.strictEqual(getStrainTier(50).id, 'shaken');
assert.strictEqual(getStrainTier(75).id, 'panic');
assert.strictEqual(getStrainTier(95).id, 'breaking');
const base = midRun();
const calmOdds = evaluateDungeonChoiceOdds(checkStage.choices[checkIdx], base, { ...base.pendingDungeon, sanityStrain: 0 }).successPct;
const panicOdds = evaluateDungeonChoiceOdds(checkStage.choices[checkIdx], base, { ...base.pendingDungeon, sanityStrain: 75 }).successPct;
assert(panicOdds < calmOdds, 'strain must lower the odds of a check');
const breaking = midRun();
breaking.pendingDungeon.sanityStrain = 97;
breaking.pendingDungeon.accumulatedLootAhn = 40;
breaking.stats.wealth = 0;
const broke = resolveDungeonChoice(breaking, 1, () => 0.5);
assert.strictEqual(broke.isFinished, true, 'reaching the limit ends the run');
assert.strictEqual(broke.resolution.outcome, 'broken');
assert.strictEqual(broke.char.alive, true, 'a breakdown is not a death');
assert(broke.char.stats.sanity >= 1, 'a breakdown leaves some mind behind');
assert(broke.char.stats.wealth <= 26, 'a breakdown keeps at most half the haul');
assert(broke.char.scars.some((s) => /sụp đổ tinh thần/i.test(s)), 'a breakdown leaves a mark');
console.log('   ok');

// 5. Supplies cost something
console.log('5. A breather heals a little and costs Ahn...');
const poor = midRun();
poor.stats.wealth = 3;
assert.strictEqual(dungeonSupplyState(poor, poor.pendingDungeon, 'breather').ok, false, 'no Ahn, no breather');
const hurt = midRun();
hurt.stats.wealth = 20;
hurt.stats.health = 50;
const rested = useDungeonSupply(hurt, 'breather');
assert.strictEqual(rested.stats.wealth, 20 - DUNGEON_BALANCE.breather.cost, 'a breather costs Ahn');
assert(rested.stats.health > 50 && rested.stats.health - 50 <= DUNGEON_BALANCE.breather.health, 'a breather heals a little, not a refill');
console.log('   ok');

// 6. A whole run pays in proportion to the rest of the game
console.log('6. A full run pays in proportion to the rest of the game...');
const totals = { ahn: [], merit: [], dead: 0, runs: 0 };
for (let i = 0; i < 120; i++) {
  for (const id of dungeonIds) {
    const r = createRNG(`pay_${id}_${i}`);
    let c = createNewCharacter({ seed: `pay_${i}` });
    Object.assign(c.stats, { health: 70, sanity: 70, wealth: 0 });
    c.merit = 0;
    c.alive = true;
    c.pendingDungeon = createDungeonSession(id, c);
    let guard = 0;
    while (c.pendingDungeon && guard++ < 60) {
      const stage = getDungeonCurrentStage(c.pendingDungeon);
      const idx = stage.choices.findIndex((ch) => !ch.isFlee && isDungeonChoiceAvailable(ch, c));
      c = resolveDungeonChoice(c, idx, r).char;
    }
    totals.runs++;
    if (!c.alive) totals.dead++;
    totals.ahn.push(c.stats.wealth);
    totals.merit.push(c.merit);
  }
}
const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length;
assert(avg(totals.ahn) <= 60, `a pushed run should not pay more than 60 Ahn on average, got ${avg(totals.ahn).toFixed(1)}`);
assert(avg(totals.merit) <= 25, `a pushed run should not pay more than 25 merit on average, got ${avg(totals.merit).toFixed(1)}`);
assert(totals.dead > 0, 'pushing through every stage must be able to kill');
console.log(`   ok: ${avg(totals.ahn).toFixed(0)} Ahn and ${avg(totals.merit).toFixed(0)} merit on average, ${totals.dead} of ${totals.runs} runs ended in death.`);

console.log('--- ALL DUNGEON BALANCE AND STORY TESTS PASSED ---');
