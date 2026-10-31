import assert from 'node:assert/strict';
import { createNewCharacter, cloneChar, createDungeonSession } from '../src/engine/gameEngine.js';
import { CLAW_DUNGEON_ID } from '../src/data/dungeonClaw.js';
import { cutsceneFor, outranks, CUTSCENE_RANK } from '../src/engine/cutsceneTriggers.js';
import { CUTSCENES, resolveCutsceneCut } from '../src/features/cutscene/registry.js';

const base = createNewCharacter({ seed: 'cutscene-triggers', startAge: 30 });
base.pendingDungeon = null;

// 1. The Claw plays once, when the judgment opens, not on every later stage of it
const judged = cloneChar(base);
judged.pendingDungeon = createDungeonSession(CLAW_DUNGEON_ID, judged);
assert.equal(cutsceneFor(base, judged), 'claw', 'the judgment opening plays the Claw');
assert.equal(cutsceneFor(judged, cloneChar(judged)), null, 'a later stage of the same judgment plays nothing');
const otherDungeon = cloneChar(base);
otherDungeon.pendingDungeon = { id: 'dungeon_warp_train' };
assert.equal(cutsceneFor(base, otherDungeon), null, 'an ordinary dungeon has no scene yet');

// 2. Death outranks everything; the Library ending is not a death
const dead = cloneChar(judged);
dead.alive = false;
assert.equal(cutsceneFor(base, dead), 'death', 'dying as the judgment opens plays death, not the Claw');
const library = cloneChar(base);
library.alive = false;
library.endingId = 'library_threshold';
assert.equal(cutsceneFor(base, library), null);
assert.equal(cutsceneFor(dead, cloneChar(dead)), null, 'a death plays once');
assert.equal(cutsceneFor(null, base), null);

// 2b. The Color decree plays once, when it opens
const decree = cloneChar(base);
decree.pendingModal = 'color_title';
assert.equal(cutsceneFor(base, decree), 'color');
assert.equal(cutsceneFor(decree, cloneChar(decree)), null, 'the decree scene plays once');

// 2c. Carmen's call plays once, when her event opens, and gives way to death
const called = cloneChar(base);
called.pendingEvent = { id: 'ego_carmen_crossroad', choices: [] };
assert.equal(cutsceneFor(base, called), 'carmen');
assert.equal(cutsceneFor(called, cloneChar(called)), null, 'the call plays once');
const otherEvent = cloneChar(base);
otherEvent.pendingEvent = { id: 'some_other_event', choices: [] };
assert.equal(cutsceneFor(base, otherEvent), null, 'an ordinary event has no scene');
const calledDead = cloneChar(called);
calledDead.alive = false;
assert.equal(cutsceneFor(base, calledDead), 'death');
assert(CUTSCENES.carmen.whispers.length >= 6 && CUTSCENES.carmen.whispers.every((w) => w.vi && w.en), 'every whisper is written in both languages');

// 3. Ranks: a stronger scene replaces a weaker one, a weaker or equal one is dropped
assert.equal(outranks('claw', null), true);
assert.equal(outranks('death', 'claw'), true);
assert.equal(outranks('claw', 'death'), false);
assert.equal(outranks('claw', 'claw'), false);
assert.deepEqual(Object.keys(CUTSCENE_RANK).sort((a, b) => CUTSCENE_RANK[b] - CUTSCENE_RANK[a]), ['death', 'color', 'claw', 'carmen', 'dungeon']);

// 4. Which cut plays
assert.equal(resolveCutsceneCut({}), 'full', 'first viewing plays in full');
assert.equal(resolveCutsceneCut({ seen: true }), 'lite', 'repeat viewings are cut short');
assert.equal(resolveCutsceneCut({ fast: true }), 'lite', 'x3 or autoplay is cut short');
assert.equal(resolveCutsceneCut({ lowPower: true }), 'lite');
assert.equal(resolveCutsceneCut({ setting: 'full', seen: true, fast: true }), 'full', 'the Full setting always plays in full');
assert.equal(resolveCutsceneCut({ setting: 'full', reduced: true }), 'still', 'reduced motion wins over Full');
assert.equal(resolveCutsceneCut({ reduced: true }), 'still');
assert.equal(resolveCutsceneCut({ setting: 'off', reduced: true }), 'caption', 'Off leaves a caption whatever else is set');

// 5. Every registered scene has every cut, within its budget, and the key line exists
for (const [id, scene] of Object.entries(CUTSCENES)) {
  for (const cut of ['full', 'lite', 'still', 'caption']) assert(Number.isFinite(scene.ms[cut]) && scene.ms[cut] > 0, `${id} has a ${cut} cut`);
  assert(scene.ms.full <= 8000, `${id} full cut stays under 8 s`);
  assert(scene.ms.lite <= 1000, `${id} lite cut stays under 1 s`);
  assert.equal(scene.ms.caption, 1200, `${id} caption holds 1.2 s`);
  assert(scene.keyDynamic || (scene.lines[scene.keyLine]?.vi && scene.lines[scene.keyLine]?.en), `${id} key line is written in both languages or taken from the roll`);
}

console.log('Cutscene triggers: Claw on the judgment only, Carmen on her call, death outranks, ranks never queue, cut selection and scene budgets passed.');
