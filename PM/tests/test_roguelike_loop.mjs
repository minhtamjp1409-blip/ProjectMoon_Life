import assert from 'node:assert/strict';
import { createNewCharacter, createRNG, cloneChar } from '../src/engine/gameEngine.js';
import { planYear, chooseYearLead, LIFE_MINORS } from '../src/engine/yearPlanner.js';
import { addScar, activeScarSynergies, scarAnnualEffects } from '../src/engine/scarModel.js';
import { createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice, evaluateDungeonChoiceOdds } from '../src/engine/dungeonEngine.js';

for (let i = 0; i < 30; i++) {
  const char = createNewCharacter({ seed: `lead-${i}`, startAge: 25 });
  char.job = ['Fixer', 'Syndicate', 'Wing Employee', 'Outcast'][i % 4];
  planYear(char, createRNG(`${char.seed}:year`));
  const draft = char.pendingLead;
  assert.equal(draft?.offers.length, 3, `${char.job} has three offers`);
  assert.equal(new Set(draft.offers.map((offer) => offer.id)).size, 3);
  const chosen = chooseYearLead(char, i % 3);
  assert.equal(chosen.pendingLead, null);
  assert.equal(chosen.leadChoice.id, draft.offers[i % 3].id);
  assert.equal(chosen.plan.filter((item) => item.lead).length, 1);
  assert.ok(LIFE_MINORS.some((entry) => entry.id === chosen.leadChoice.id));
  assert.equal(cloneChar(JSON.parse(JSON.stringify(chosen))).plan.filter((item) => item.lead).length, 1);
  assert.equal(chooseYearLead(chosen, 0), chosen, 'a year cannot be drafted twice');
}

const scarred = createNewCharacter({ seed: 'synergy', startAge: 25 });
addScar(scarred, 'Vết móc câu Sweeper 3:13 AM');
addScar(scarred, 'Thanh kiếm tôi bằng máu mình');
assert.ok(activeScarSynergies(scarred).some((entry) => entry.id === 'cornered_blade'));
assert.equal(scarAnnualEffects(scarred).heat, 3);

const repaired = createNewCharacter({ seed: 'repair', startAge: 25 });
addScar(repaired, 'Vết dao trả nợ');
addScar(repaired, 'Chiếc hộp từ nhà máy');
assert.ok(activeScarSynergies(repaired).some((entry) => entry.id === 'field_repair'));
assert.equal(scarAnnualEffects(repaired).wealth, -2);
const baseSupply = createDungeonSession('dungeon_warp_train', createNewCharacter({ seed: 'base', startAge: 25 })).maxSupplies;
assert.equal(createDungeonSession('dungeon_warp_train', repaired).maxSupplies, baseSupply + 1);

const fighter = createNewCharacter({ seed: 'deep-wager', startAge: 25 });
fighter.job = 'Fixer';
fighter.pendingDungeon = createDungeonSession('dungeon_warp_train', fighter);
const restIndex = fighter.pendingDungeon.combat.plan.findIndex((floor) => floor.kind === 'rest');
fighter.pendingDungeon.combat.floor = restIndex;
const stage = getDungeonCurrentStage(fighter.pendingDungeon);
const pushIndex = stage.choices.findIndex((choice) => choice.restAction === 'push');
assert.ok(pushIndex >= 0);
const pushed = resolveDungeonChoice(fighter, pushIndex, () => 0.5).char;
assert.equal(pushed.pendingDungeon.delveStake, 1);
const fightStage = getDungeonCurrentStage(pushed.pendingDungeon);
const guard = fightStage.choices.find((choice) => choice.combatAction === 'guard');
const withStake = evaluateDungeonChoiceOdds(guard, pushed, pushed.pendingDungeon);
const withoutStake = evaluateDungeonChoiceOdds(guard, pushed, { ...pushed.pendingDungeon, delveStake: 0 });
assert.ok(withStake.estHp <= withoutStake.estHp, 'pressing on cannot make incoming damage safer');

console.log('Roguelike loop: seeded annual offers, single commitment, saved draft, scar tradeoffs and dungeon wager passed.');
