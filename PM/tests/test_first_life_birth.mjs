// A player's first life is spared the perinatal roll; later lives keep it.
import assert from 'node:assert/strict';
import { createNewCharacter } from '../src/engine/gameEngine.js';

const N = 1500;
let diedNormally = 0;
let diedSpared = 0;
let sameOutcome = 0;
for (let i = 0; i < N; i++) {
  const normal = createNewCharacter({ seed: `first-life-${i}` });
  const spared = createNewCharacter({ seed: `first-life-${i}`, sparePerinatal: true });
  if (!normal.alive) diedNormally++;
  if (!spared.alive) diedSpared++;
  // A seed that lives either way is born into the same place, family and omen
  if (normal.alive && normal.regionId === spared.regionId && normal.familyId === spared.familyId) sameOutcome++;
}

assert.equal(diedSpared, 0, 'a spared first life is never lost at birth');
assert(diedNormally > 0, 'later lives still face the perinatal roll');
assert.equal(sameOutcome, N - diedNormally, 'sparing does not change the rest of the seed');
console.log(`First life birth: 0/${N} spared lives lost at birth, ${diedNormally}/${N} without sparing`);
