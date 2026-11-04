// The home screen names what the next life could still open, from the real codex and its hints.
import assert from 'node:assert/strict';
import { replayGoalsFor } from '../src/features/chronicle/replayGoals.js';
import { CODEX_RECORDS } from '../src/data/worldData.js';

assert.deepEqual(replayGoalsFor([], [], CODEX_RECORDS), [], 'nothing before the first life has ended');

const fixerGoals = replayGoalsFor([{ job: 'Fixer' }], ['born_city'], CODEX_RECORDS);
assert.equal(fixerGoals.length, 2);
assert.equal(fixerGoals[0].category, 'fixer', 'the first goal follows the last life’s trade');
assert.notEqual(fixerGoals[1].category, 'fixer', 'the second goal comes from somewhere else');
for (const goal of fixerGoals) {
  assert(CODEX_RECORDS.includes(goal), 'goals are real codex records');
  assert(goal.hintVi && goal.hintEn, 'each goal carries its hint in both languages');
}

const wingGoals = replayGoalsFor([{ job: 'Wing Employee' }, { job: 'Fixer' }], [], CODEX_RECORDS);
assert.equal(wingGoals[0].category, 'wing', 'the newest life decides the trade');

const allKeys = CODEX_RECORDS.map((r) => r.key);
assert.deepEqual(replayGoalsFor([{ job: 'Fixer' }], allKeys, CODEX_RECORDS), [], 'a full codex shows nothing');
assert(!replayGoalsFor([{ job: 'Fixer' }], allKeys.slice(1), CODEX_RECORDS).some((g) => allKeys.slice(1).includes(g.key)), 'unlocked records never come back');

console.log('Replay goals: real locked codex records, one from the last trade, one from elsewhere');
