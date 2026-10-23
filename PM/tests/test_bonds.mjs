import assert from 'node:assert/strict';
import { createNewCharacter } from '../src/engine/gameEngine.js';
import { driftBonds, keepInTouch } from '../src/engine/director.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { LIFE_MINORS_BONDS } from '../src/data/lifeMinorsBonds.js';
import { LIFE_MINORS } from '../src/engine/yearPlanner.js';
import { makeNpc } from '../src/data/birthStories.js';

const rngOf = (v) => () => v;
function adult(bond, lastSeen) {
  const c = createNewCharacter({ seed: 'bond-test', startAge: 40 });
  Object.assign(c, { job: 'Fixer', fixerGrade: 6 });
  c.npcs = { friend: makeNpc('friend', rngOf(0.5), { bond, metAge: 12, lastSeen }) };
  return c;
}

// Nothing cools for the first years apart
for (const apart of [0, 2, 3]) {
  const c = adult(50, 40 - apart);
  driftBonds(c);
  assert.equal(c.npcs.friend.bond, 50, `${apart} years apart`);
}
// Then slowly: one a year for a close bond, never below a faint acquaintance
const close = adult(70, 30);
driftBonds(close);
assert.equal(close.npcs.friend.bond, 69, 'a close bond cools by one at most');
const mid = adult(40, 30);
driftBonds(mid);
assert.equal(mid.npcs.friend.bond, 38, 'a long silence costs two');
const faint = adult(7, 10);
driftBonds(faint);
assert.equal(faint.npcs.friend.bond, 6);
driftBonds(faint);
assert.equal(faint.npcs.friend.bond, 6, 'the floor holds');

// A quiet year can be a year of small meetings: bond edges up, the clock resets, a line now and then
const friendly = adult(30, 36);
const meetings = keepInTouch(friendly, rngOf(0.0));
assert.equal(friendly.npcs.friend.bond, 31);
assert.equal(friendly.npcs.friend.lastSeen, friendly.age);
assert.ok(meetings.length === 1 && meetings[0].vi && meetings[0].en);
const unlucky = adult(30, 36);
assert.deepEqual(keepInTouch(unlucky, rngOf(0.99)), []);
assert.equal(unlucky.npcs.friend.bond, 30);
const faded = adult(8, 30);
keepInTouch(faded, rngOf(0));
assert.equal(faded.npcs.friend.bond, 8, 'a bond that has all but died is not revived for free');
const gone = adult(40, 30);
gone.npcs.friend.deceased = true;
assert.deepEqual(keepInTouch(gone, rngOf(0)), []);
const kid = adult(40, 10);
kid.age = 12;
assert.deepEqual(keepInTouch(kid, rngOf(0)), []);

// Quiet minors exist for each kept role, are registered, need the person, and cost nothing to ignore
assert.ok(LIFE_MINORS_BONDS.length >= 12);
for (const m of LIFE_MINORS_BONDS) {
  assert.ok(LIFE_MINORS.includes(m), `${m.id} registered`);
  assert.ok(m.need.npc && m.keepRole === m.need.npc);
  assert.ok(m.choices.length >= 2);
  assert.ok(!m.ignore.bond, `${m.id}: letting it pass must not lower a bond`);
  assert.ok(m.choices.some((c) => (c.bond?.[m.keepRole] ?? 0) >= 6 || (c.out || []).some((o) => (o.bond?.[m.keepRole] ?? 0) >= 6)), `${m.id} has a real gain`);
}
const noFriend = createNewCharacter({ seed: 'bond-test-none', startAge: 40 });
noFriend.npcs = {};
const friendMinor = LIFE_MINORS_BONDS.find((m) => m.keepRole === 'friend');
assert.equal(matchesEventContext(friendMinor, noFriend), false);
assert.equal(matchesEventContext(friendMinor, adult(40, 38)), true);
console.log(`Bonds: slow drift, yearly small meetings and ${LIFE_MINORS_BONDS.length} quiet minors passed.`);
