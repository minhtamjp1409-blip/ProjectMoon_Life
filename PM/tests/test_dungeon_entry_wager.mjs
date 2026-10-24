import assert from 'node:assert/strict';
import { createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import { dungeonEntryForecast, createDungeonSession, getDungeonCurrentStage, evaluateDungeonChoiceOdds } from '../src/engine/dungeonEngine.js';
import { dungeonWagerDamage, dungeonWagerLoot } from '../src/engine/dungeonWager.js';

const char = createNewCharacter({ seed: 'wager-door', startAge: 30 });
char.job = 'Fixer';
char.pendingEvent = {
  id: 'gate_wager_check', major: true, vi: 'A door', en: 'A door',
  choices: [{ labelVi: 'Đi vào', labelEn: 'Enter', resultVi: 'Cửa đóng lại.', resultEn: 'The door shuts.', startDungeon: 'dungeon_backstreets_night' }]
};
const entered = resolveEventChoice(char, 0, () => 0.5, 2);
assert.equal(entered.pendingDungeon.delveStake, 2, 'the chosen wager must reach the dungeon session');
assert.equal(char.pendingDungeon, null, 'the original event state is untouched');
const base = createDungeonSession('dungeon_backstreets_night', entered);
const costly = { ...base, delveStake: 2 };
const action = getDungeonCurrentStage(base).choices.find((choice) => choice.combatAction === 'strike');
const normal = evaluateDungeonChoiceOdds(action, entered, base);
const wagered = evaluateDungeonChoiceOdds(action, entered, costly);
assert(wagered.estHp <= normal.estHp && wagered.estSp <= normal.estSp, 'the wager raises the actual combat harm shown by the preview');
const forecast = dungeonEntryForecast('dungeon_backstreets_night', entered, 2);
assert.equal(forecast.damagePercent, Math.round((dungeonWagerDamage(2) - 1) * 100));
assert.equal(forecast.lootPercent, Math.round((dungeonWagerLoot(2) - 1) * 100));
assert.equal(dungeonEntryForecast('dungeon_claw_judgment', entered, 2)?.level, 0, 'the Head judgment cannot be wagered');
console.log('Dungeon entry wager: event choice, shared preview and Claw restriction passed.');
