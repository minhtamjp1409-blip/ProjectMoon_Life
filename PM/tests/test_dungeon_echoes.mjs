// A run worth remembering comes back the year after; a plain run, a death or the Head plants nothing
import assert from 'node:assert/strict';
import { createNewCharacter, ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { createDungeonSession, settleRun } from '../src/engine/dungeonEngine.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { DUNGEON_ECHO_EVENTS } from '../src/data/eventsDungeonEchoes.js';

const base = () => {
  const c = createNewCharacter({ seed: 'echo', startAge: 30 });
  c.alive = true; c.job = 'Fixer'; c.fixerGrade = 6;
  return c;
};
const planted = (c) => (c.weaver?.pendingThreads || []).filter((t) => t.eventId.startsWith('echo_dungeon_')).map((t) => t.eventId);

for (const e of DUNGEON_ECHO_EVENTS) assert(ALL_STORY_EVENTS.some((x) => x.id === e.id), `${e.id} is in the story pool`);

const cases = [
  ['shield', (s) => { s.companionShieldUsed = true; s.companion = { role: 'partner', nameVi: 'A', nameEn: 'A' }; }, 'dungeon_great_lake', 'fled', 'echo_dungeon_shield_debt'],
  ['stake', (s) => { s.npcStaked = 'friend'; }, 'dungeon_backstreets_night', 'conquered', 'echo_dungeon_staked_companion'],
  ['witness', (s) => { s.passengers = 2; }, 'dungeon_warp_train', 'conquered', 'echo_dungeon_warp_witness'],
  ['left', (s) => { s.passengers = 1; }, 'dungeon_warp_train', 'fled', 'echo_dungeon_warp_left_behind'],
  ['first clear', () => {}, 'dungeon_lobotomy_ruin', 'conquered', 'echo_dungeon_route_notes']
];
for (const [name, mark, id, outcome, expected] of cases) {
  const c = base();
  const s = createDungeonSession(id, c);
  mark(s);
  settleRun(c, s, outcome);
  assert.deepEqual(planted(c), [expected], `${name}: plants ${expected}`);
  const ev = ALL_STORY_EVENTS.find((x) => x.id === expected);
  assert.equal(isEventEligible(ev, c), false, `${name}: not before the year turns`);
  c.age += 1;
  assert.equal(isEventEligible(ev, c), true, `${name}: due the year after`);
}

// A second clear of the same place, a plain flight, a death and the Head plant nothing
const again = base();
again.dungeonRecord = { clears: [{ id: 'dungeon_lobotomy_ruin', age: 25 }] };
settleRun(again, createDungeonSession('dungeon_lobotomy_ruin', again), 'conquered');
assert.deepEqual(planted(again), [], 'second clear plants nothing');
const plain = base();
settleRun(plain, createDungeonSession('dungeon_great_lake', plain), 'fled');
assert.deepEqual(planted(plain), [], 'a plain retreat plants nothing');
const dead = base(); dead.alive = false;
const ds = createDungeonSession('dungeon_warp_train', dead); ds.passengers = 2;
settleRun(dead, ds, 'conquered');
assert.deepEqual(planted(dead), [], 'the dead get no echo');
for (const e of DUNGEON_ECHO_EVENTS) assert.equal(isEventEligible(e, base()), false, `${e.id} never drawn at random`);

console.log('Dungeon echoes: 5 echoes planted by what happened, due the year after, never random, none for a plain run or the dead.');
process.exit(0);
