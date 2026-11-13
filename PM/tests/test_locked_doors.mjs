import assert from 'node:assert/strict';
import {
  ALL_STORY_EVENTS,
  createNewCharacter,
  createRNG,
  resolveEventChoice
} from '../src/engine/gameEngine.js';
import { endYear } from '../src/engine/yearPlanner.js';
import {
  isDoorBoundaryAge,
  pickVisibleLockedDoors,
  syncVisibleDoorsForChar
} from '../src/engine/lockedDoors.js';
import { directorReach } from '../tools/sim/director_reach.mjs';

// 1. Birth and decade boundaries always select 2-3 reachable locked doors with VI/EN gap hints
{
  assert.equal(isDoorBoundaryAge(0), true);
  assert.equal(isDoorBoundaryAge(10), true);
  assert.equal(isDoorBoundaryAge(20), true);
  assert.equal(isDoorBoundaryAge(7), false);

  const char = createNewCharacter({ customName: 'DoorTester', seed: 'door_test_1' });
  assert.ok(Array.isArray(char.visibleDoors), 'visibleDoors array initialized at birth');
  assert.ok(char.visibleDoors.length >= 2 && char.visibleDoors.length <= 3, `expected 2-3 visible doors, got ${char.visibleDoors.length}`);
  assert.equal(char.doorsDecade, 0);
  for (const d of char.visibleDoors) {
    assert.ok(d.id && d.hookVi && d.reqVi && d.hintVi && d.hintEn, `door ${d.id} missing hint fields`);
    assert.equal(d.opened, false);
  }
}

// 2. Decade boundary refreshes visibleDoors and skips doors already opened in Codex (openedDoors)
{
  const firstRun = createNewCharacter({ customName: 'First', seed: 'door_skip_seed' });
  const initialIds = firstRun.visibleDoors.map((d) => d.id);

  // Advance to age 10
  const rng = createRNG('door_skip_age10');
  let aged = firstRun;
  for (let a = 0; a < 10; a++) aged = endYear(aged, rng);
  assert.equal(aged.age, 10);
  assert.equal(aged.doorsDecade, 10);
  assert.ok(aged.visibleDoors.length >= 2 && aged.visibleDoors.length <= 3);

  // Second run passes previous openedDoors from Codex: those doors must not appear again
  const secondRun = createNewCharacter({
    customName: 'Second',
    seed: 'door_skip_seed',
    openedDoors: initialIds
  });
  const secondIds = secondRun.visibleDoors.map((d) => d.id);
  for (const oldId of initialIds) {
    assert.ok(!secondIds.includes(oldId), `opened door ${oldId} should not be offered again`);
  }
}

// 3. Resolving an event that matches one of visibleDoors marks it opened
{
  const char = createNewCharacter({ customName: 'Opener', seed: 'door_open_seed' });
  const ev = ALL_STORY_EVENTS.find((e) => e.major && e.choices?.length);
  char.visibleDoors = [{ id: ev.id, hookVi: 'Cửa thử', hookEn: 'Test door', reqVi: 'Cần thử', reqEn: 'Needs test', hintVi: 'Cửa thử', hintEn: 'Test door', opened: false }];
  char.pendingEvent = { ...ev, choices: ev.choices };
  const after = resolveEventChoice(char, 0, createRNG('door_open_rng'));
  assert.ok(after.openedDoors.includes(ev.id), 'resolved visible door recorded in openedDoors');
  const card = after.visibleDoors.find((d) => d.id === ev.id);
  assert.equal(card?.opened, true);
}

// 4. Simulation verification: 'door' policy unlocks more events and reaches more unique drawn events than default
{
  const defRes = directorReach(80, 'default');
  const doorRes = directorReach(80, 'door');
  const defDrawn = defRes.rows.filter((r) => r.chosen > 0).length;
  const doorDrawn = doorRes.rows.filter((r) => r.chosen > 0).length;
  assert.ok(
    doorRes.neverEligible.length < defRes.neverEligible.length,
    `expected door policy to unlock more events (${doorRes.neverEligible.length} vs ${defRes.neverEligible.length})`
  );
  assert.ok(
    doorDrawn > defDrawn,
    `expected door policy unique drawn events (${doorDrawn}) > default (${defDrawn})`
  );
}

console.log('Locked doors & director reach test passed.');
