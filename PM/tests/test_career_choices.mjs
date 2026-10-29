import assert from 'assert';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';

console.log('--- RUNNING CAREER CHOICE TESTS ---');

const sets = (c) => [c.setJob, ...(c.outcomes || []).map((o) => o.setJob)].filter(Boolean);

console.log('1. Workshop is not a career a player can pick...');
for (const e of ALL_STORY_EVENTS) {
  for (const c of e.choices || []) {
    assert(!sets(c).includes('Workshop Craftsman'), `${e.id}: a choice still sets the Workshop job`);
  }
}

console.log('2. The age-18 crossroad offers three paths...');
const cross = ALL_STORY_EVENTS.find((e) => e.id === 'ad_career_crossroad_18');
assert.deepStrictEqual([...new Set(cross.choices.flatMap(sets))].sort(), ['Fixer', 'Outcast', 'Syndicate', 'Wing Employee']);
assert(cross.choices.every((choice) => !choice.setJob && choice.outcomes?.some((outcome) => outcome.setJob === 'Outcast')),
  'The player chooses an application, with a playable failure outcome');
assert(!/xưởng học nghề/.test(cross.vi), 'the intro must not mention a workshop path');

console.log('3. The Outskirts crossroad never ends in a workshop job...');
const out = ALL_STORY_EVENTS.find((e) => e.id === 'ad_outskirts_crossroad_18');
assert.deepStrictEqual(out.choices.map((c) => c.setRegion), ['T', 'J', 'K']);
assert.strictEqual(out.choices[0].setJob, 'Outcast', 'the workshop route must not set a career');

console.log('PASS: career choice tests');
