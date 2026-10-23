import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, rollBirthFamily, rollBirthRegion, resolveEventChoice } from '../src/engine/gameEngine.js';
import { REGIONS } from '../src/data/worldData.js';
import { isOutsideCity, matchesEventContext } from '../src/engine/eventConditions.js';
import { planYear } from '../src/engine/yearPlanner.js';
import { isEventEligible } from '../src/engine/weaverAI.js';

const outside = REGIONS.find((region) => region.id === 'OUTSKIRTS');
const inside = REGIONS.find((region) => region.id === 'T');
const crossing = ALL_STORY_EVENTS.find((event) => event.id === 'ad_outskirts_crossroad_18');
const cityCareer = ALL_STORY_EVENTS.find((event) => event.id === 'ad_career_crossroad_18');
const caravan = ALL_STORY_EVENTS.find((event) => event.id === 'ev4_o_caravan_split');

assert.equal(rollBirthFamily(outside, () => 0.5, null, 'wing_executive').id, 'outskirts_nomad');
assert.notEqual(rollBirthFamily(inside, () => 0.999, null, 'outskirts_nomad').id, 'outskirts_nomad');
assert.equal(rollBirthRegion(() => 0.999, null, 'outskirts_nomad').id, 'OUTSKIRTS');
assert.notEqual(rollBirthRegion(() => 0.999, null, 'wing_executive').id, 'OUTSKIRTS');

for (let index = 0; index < 500; index += 1) {
  const char = createNewCharacter({ seed: `outskirts-check-${index}`, preferredRegionId: 'T' });
  assert.notEqual(char.familyId, 'outskirts_nomad');
  assert.equal(char.birthRegionId, 'T');
  const random = createNewCharacter({ seed: `outskirts-random-${index}` });
  assert.equal(random.familyId === 'outskirts_nomad', random.regionId === 'OUTSKIRTS');
}

const chosenOutside = createNewCharacter({ seed: 'family-first-outskirts', preferredFamilyId: 'outskirts_nomad' });
assert.equal(chosenOutside.regionId, 'OUTSKIRTS');
const chosenInside = createNewCharacter({ seed: 'family-first-city', preferredFamilyId: 'wing_executive' });
assert.notEqual(chosenInside.regionId, 'OUTSKIRTS');

const makeOutside = (seed) => createNewCharacter({
  seed,
  startAge: 18,
  preferredRegionId: 'OUTSKIRTS',
  preferredFamilyId: 'wing_executive'
});
const born = makeOutside('outskirts-journey');
assert.equal(born.familyId, 'outskirts_nomad');
assert.deepEqual(born.unlockedRecords.includes('born_outskirts'), true);
assert.deepEqual(born.unlockedRecords.includes('born_city'), false);
assert.equal(born.birthRegionId, 'OUTSKIRTS');
assert.equal(isOutsideCity(born), true);
assert.equal(matchesEventContext(crossing, born), true);
assert.equal(isEventEligible(cityCareer, born, { scripted: true }), false);
const openingText = born.pendingBirthLogs.map((line) => `${line.vi} ${line.en}`).join(' ');
assert.doesNotMatch(openingText, /WARP platform|Backstreets|Night in the Backstreets|dãy nhà|grey walls/);
planYear(born, () => 0.5);
assert.ok(born.plan.some((item) => item.forcedEventId === crossing.id));

for (const [index, district] of ['T', 'J', 'K'].entries()) {
  const char = makeOutside(`outskirts-route-${index}`);
  char.pendingEvent = crossing;
  const entered = resolveEventChoice(char, index, () => 0.5);
  assert.equal(entered.regionId, district);
  assert.equal(entered.birthRegionId, 'OUTSKIRTS');
  assert.equal(isOutsideCity(entered), false);
  assert.equal(entered.flags.includes('Outskirts'), false);
  assert.equal(entered.flags.includes('EnteredCity'), true);
  assert.equal(matchesEventContext(caravan, entered), false);
  assert.notEqual(entered.job, 'Child');
}

const caravanSuccess = makeOutside('outskirts-caravan-success');
caravanSuccess.pendingEvent = caravan;
const reachedCity = resolveEventChoice(caravanSuccess, 0, () => 0);
assert.equal(reachedCity.regionId, 'T');
assert.equal(isOutsideCity(reachedCity), false);

const caravanFailure = makeOutside('outskirts-caravan-failure');
caravanFailure.pendingEvent = caravan;
const stayedOutside = resolveEventChoice(caravanFailure, 0, () => 0.999);
assert.equal(stayedOutside.regionId, 'OUTSKIRTS');
assert.equal(isOutsideCity(stayedOutside), true);

const exiled = createNewCharacter({ seed: 'outskirts-exile', preferredRegionId: 'T', preferredFamilyId: 'nest_feather' });
exiled.pendingEvent = {
  id: 'test_outskirts_exile',
  choices: [{ labelVi: 'Rời City', labelEn: 'Leave the City', setRegion: 'OUTSKIRTS' }]
};
const beyondWall = resolveEventChoice(exiled, 0, () => 0.5);
assert.equal(beyondWall.regionId, 'OUTSKIRTS');
assert.equal(beyondWall.flags.includes('Nest'), false);
assert.equal(beyondWall.flags.includes('Feather'), false);
assert.equal(beyondWall.flags.includes('Outskirts'), true);
assert.equal(beyondWall.birthRegionId, 'T');

console.log('Outskirts birthplace, career crossing, and caravan routes passed.');
