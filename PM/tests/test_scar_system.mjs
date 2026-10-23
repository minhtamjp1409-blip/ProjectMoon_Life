import assert from 'node:assert/strict';
import { createNewCharacter, cloneChar } from '../src/engine/gameEngine.js';
import { addScar, getScarProfile, hasScarTag, scarAnnualEffects, scarContractPower, scarResonanceFloor } from '../src/engine/scarModel.js';
import { matchesEventContext, choiceIsAvailable } from '../src/engine/eventConditions.js';
import { directorWeight } from '../src/engine/director.js';
import { weightedOutcomes } from '../src/engine/outcomeOdds.js';
import { LIFE_MINORS, endYear } from '../src/engine/yearPlanner.js';

const born = () => createNewCharacter({ seed: 'scar-system-regression', startAge: 25 });
const char = born();
char.job = 'Fixer';
char.stats.health = 35;
char.stats.sanity = 35;

assert.equal(addScar(char, 'Một con phố từng đi qua'), false);
assert.deepEqual(char.scars, []);
assert.deepEqual(char.scarHistory, ['Một con phố từng đi qua']);
assert.equal(addScar(char, 'Vết móc câu Sweeper 3:13 AM'), true);
assert.equal(addScar(char, 'Vết dao trả nợ'), true);
assert.equal(addScar(char, 'Thanh kiếm tôi bằng máu mình'), true);
assert.equal(addScar(char, 'Vết cưa của W Corp Cleaner'), false);
assert.equal(char.scars.length, 3);
assert.ok(char.scarHistory.includes('Vết cưa của W Corp Cleaner'));
assert.equal(addScar(char, 'Ký ức địa ngục tàu WARP'), true);
assert.equal(char.scars.length, 3);
assert.equal(hasScarTag(char, 'survivor'), false);
assert.ok(char.scarHistory.includes('Vết móc câu Sweeper 3:13 AM'));
assert.equal(scarContractPower(char), 2);
assert.deepEqual(scarAnnualEffects(char), { health: -1, heat: 2, sanity: -2 });
assert.equal(scarResonanceFloor(char), 6);
assert.deepEqual(cloneChar(char).scars, char.scars);
assert.equal(getScarProfile('Chiếc hộp từ nhà máy').tag, 'craft');
const rawLegacy = born();
rawLegacy.scars = ['Vết móc câu Sweeper 3:13 AM', 'Vết dao trả nợ', 'Thanh kiếm tôi bằng máu mình', 'Ký ức địa ngục tàu WARP'];
assert.equal(scarContractPower(rawLegacy), 2);
assert.deepEqual(scarAnnualEffects(rawLegacy), { health: -1, heat: 2, sanity: -2 });

const woundEvent = LIFE_MINORS.find((event) => event.id === 'scar_injury_clinic');
const survivalEvent = LIFE_MINORS.find((event) => event.id === 'scar_survivor_route');
const weaponEvent = LIFE_MINORS.find((event) => event.id === 'scar_weapon_commission');
assert.equal(matchesEventContext(woundEvent, char), true);
assert.equal(matchesEventContext(survivalEvent, char), false);
assert.equal(matchesEventContext(weaponEvent, char), true);
const nonFixer = cloneChar(char);
nonFixer.job = 'Outcast';
assert.equal(matchesEventContext(weaponEvent, nonFixer), false);
assert.ok(directorWeight(woundEvent, char).w > directorWeight(woundEvent, born()).w);
char.stats.wealth = 2;
assert.equal(choiceIsAvailable(woundEvent.choices[0], char), false);
assert.equal(choiceIsAvailable(woundEvent.choices[1], char), true);

const choice = { outcomes: [
  { w: 50, outcomeId: 'escape', survival: true, effects: { health: 3 } },
  { w: 50, outcomeId: 'harm', deathCauseVi: 'Bị giết', effects: { health: -20 } }
] };
const plain = weightedOutcomes(choice, born());
const survivor = born();
survivor.stats.health = 35;
addScar(survivor, 'Vết móc câu Sweeper 3:13 AM');
const tilted = weightedOutcomes(choice, survivor);
assert.ok(tilted[0].weight > plain[0].weight);
assert.equal(tilted[1].weight, plain[1].weight);

const plainYear = born();
const injuredYear = cloneChar(plainYear);
addScar(injuredYear, 'Vết dao trả nợ');
const without = endYear(plainYear, () => 0.5);
const withInjury = endYear(injuredYear, () => 0.5);
assert.ok(withInjury.stats.health < without.stats.health);

console.log('Scar system: archive, migration, cap, category effects, route gate, event weight and yearly cost passed.');
