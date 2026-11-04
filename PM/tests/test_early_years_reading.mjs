// The first years are where a new player decides whether to keep reading. On 04/11/2026 the sample
// site asked for about 35 words a year and this game for about 60, so ages 1 to 4 are held to 55.
import assert from 'node:assert/strict';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { playYear } from '../tools/sim/lib/playYear.mjs';
import { makePicker } from '../tools/sim/lib/choicePolicy.mjs';

const LIVES = 80;
const pick = makePicker('random');
const words = (s) => (s || '').split(/\s+/).filter(Boolean).length;
let earlyWords = 0;
let longYearEnds = 0;
for (let i = 0; i < LIVES; i++) {
  const rng = createRNG(`early-read-${i}`);
  let char = createNewCharacter({ seed: `early-read-${i}`, sparePerinatal: true });
  char.pendingBirthLogs = [];
  while (char.alive && char.age < 5) char = playYear(char, rng, pick);
  for (const log of char.logs) {
    if (log.age >= 1 && log.age <= 4) earlyWords += words(log.en);
    // A year-end entry before age 5 carries one line: "[Year's end] " plus a single reason
    if (log.type === 'summary' && log.age <= 4 && (log.en || '').replace(/^\[Year's end\]\s*/, '').split(/(?<=[.!?])\s+/).length > 2) longYearEnds++;
  }
}

const perYear = earlyWords / (LIVES * 4);
assert(perYear <= 55, `ages 1 to 4 average ${perYear.toFixed(1)} words a year (limit 55)`);
assert.equal(longYearEnds, 0, 'year-end entries before age 5 keep one line');
console.log(`Early years reading: ${perYear.toFixed(1)} English words a year at ages 1 to 4`);
