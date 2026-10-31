import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createNewCharacter, cloneChar, createDungeonSession } from '../src/engine/gameEngine.js';
import { CLAW_DUNGEON_ID } from '../src/data/dungeonClaw.js';
import { CUTSCENES } from '../src/features/cutscene/registry.js';

// A minimal screen: scenes only play where there is a document to show them on
const stored = new Map();
globalThis.localStorage = { getItem: (k) => stored.get(k) ?? null, setItem: (k, v) => stored.set(k, String(v)), removeItem: (k) => stored.delete(k) };
globalThis.document = { documentElement: { dataset: {}, classList: { add() {}, remove() {} } }, hidden: false };
const { useGameStore } = await import('../src/store/gameStore.js');
const store = () => useGameStore.getState();
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

function accused(seed) {
  const char = createNewCharacter({ seed, startAge: 30 });
  char.taboo = 2;
  char.stats = { ...char.stats, health: 100, sanity: 100 };
  for (const k of ['pendingEvent', 'pendingMinor', 'pendingContract', 'pendingDungeon', 'pendingModal', 'pendingYearPlan', 'pendingLead']) char[k] = null;
  return char;
}

// 1. Taboo 3/3 opens the judgment and the Claw scene in the same commit, in full the first time, without the stage flash
const before = accused('gate-claw');
const crossed = cloneChar(before);
crossed.taboo = 3;
useGameStore.setState({ char: before, inRun: true, speed: 1, autoPlay: false, stageFx: null, cutscene: null, activeResolution: null });
store().commit(before, crossed);
assert.equal(store().char.pendingDungeon?.id, CLAW_DUNGEON_ID);
assert.equal(store().cutscene?.id, 'claw', 'the judgment plays the Claw scene');
assert.equal(store().cutscene.cut, 'full', 'first viewing plays in full');
assert.equal(store().cutscene.durationMs, CUTSCENES.claw.ms.full);
assert.equal(store().stageFx, null, 'the scene replaces the stage flash for the same moment');
assert.equal(stored.get('pm-cutscene-seen:claw'), '1', 'a full viewing is remembered');

// 2. A wrong or stale key cannot end the scene; the right one can
const key = store().cutscene.key;
store().endCutscene('skip', 'claw_old');
assert.equal(store().cutscene?.key, key, 'a late call from an older scene is ignored');
store().endCutscene('skip', key);
assert.equal(store().cutscene, null);

// 3. Seen once, then cut short; x3 cuts short too
const again = accused('gate-claw-again');
const againCrossed = cloneChar(again);
againCrossed.taboo = 3;
useGameStore.setState({ char: again, cutscene: null });
store().commit(again, againCrossed);
assert.equal(store().cutscene.cut, 'lite', 'repeat viewings are cut short');
store().endCutscene('done');

// 4. While a scene plays, nothing moves time: tick, the step button, the quiet-time skip
const idle = accused('gate-idle');
idle.plan = [{ t: 0.6, kind: 'daily' }];
idle.planCursor = 0;
const frozen = { char: idle, inRun: true, speed: 3, yearProgress: 20, postChoicePauseMs: 0, activeResolution: null, cutscene: { id: 'claw', key: 'gate-hold', cut: 'full', durationMs: 3600 } };
useGameStore.setState(frozen);
for (let i = 0; i < 20; i++) store().tick(400);
store().stepYear();
store().skipQuietTime();
assert.equal(store().yearProgress, 20, 'the year stands still under a scene');
assert.equal(store().char.age, idle.age);
assert.equal(store().char.planCursor, 0);
store().endCutscene('done', 'gate-hold');
store().tick(400);
assert(store().yearProgress > 20, 'time runs again once the scene ends');

// 5. A stronger scene replaces the one playing, a weaker or equal one is dropped; nothing queues
const playing = accused('gate-rank');
useGameStore.setState({ char: playing, cutscene: { id: 'claw', key: 'gate-rank', cut: 'full', durationMs: 3600 } });
const decreeCrossed = cloneChar(playing);
decreeCrossed.pendingModal = 'color_title';
store().commit(playing, decreeCrossed);
assert.equal(store().cutscene?.id, 'color', 'the Color decree outranks the Claw');
assert.equal(store().bestowedColor?.title && typeof store().bestowedColor.color, 'string', 'the decree rolls its title once, for the scene and the modal');
const rolled = store().bestowedColor.title;
store().commit(decreeCrossed, cloneChar(decreeCrossed));
assert.equal(store().bestowedColor.title, rolled, 'the roll holds while the decree stays open');
const dying = cloneChar(decreeCrossed);
dying.alive = false;
dying.stats.health = 0;
dying.pendingModal = null;
store().commit(decreeCrossed, dying);
assert.equal(store().cutscene?.id, 'death', 'death outranks everything');
assert.equal(store().bestowedColor, null, 'the roll is dropped with the decree');
const keyNow = store().cutscene.key;
const weaker = cloneChar(playing);
weaker.pendingModal = 'color_title';
store().commit(playing, weaker);
assert.equal(store().cutscene?.key, keyNow, 'a weaker scene never replaces death');
store().endCutscene('done', keyNow);

// 6. Scenes off: a caption only, still holding the dock for its short time
localStorage.setItem('pm-cutscene', 'off');
const { useThemeStore } = await import('../src/store/themeStore.js');
useThemeStore.setState({ cutsceneMode: 'off' });
const quiet = accused('gate-off');
const quietCrossed = cloneChar(quiet);
quietCrossed.taboo = 3;
useGameStore.setState({ char: quiet, cutscene: null });
store().commit(quiet, quietCrossed);
assert.equal(store().cutscene.cut, 'caption');
assert.equal(store().cutscene.durationMs, 1200);
store().endCutscene('done');
useThemeStore.setState({ cutsceneMode: 'short' });

// 7. The watchdog ends a scene nobody ends, so a failed chunk or a stalled tab never freezes the run
useGameStore.setState({ cutscene: { id: 'claw', key: 'gate-stuck', cut: 'lite', durationMs: 20 } });
store().cutsceneStarted('gate-stuck');
await new Promise((resolve) => setTimeout(resolve, 1600));
assert.equal(store().cutscene, null, 'the watchdog ended the scene');

// 8. Leaving or restarting a run never carries a scene along
useGameStore.setState({ cutscene: { id: 'claw', key: 'gate-exit', cut: 'full', durationMs: 3600 } });
store().exitToSetup();
assert.equal(store().cutscene, null);

// 9. Wiring the store cannot check by itself
const layout = read('../src/layouts/MainLayout.jsx');
assert.match(layout, /pendingModal \|\| cutsceneKey\) return undefined/, 'the clock effect stops under a scene');
assert.match(layout, /dismissResolution, cutsceneKey\]\);/, 'the clock effect re-runs when the scene ends, so autoplay counts from the dock');
assert.match(layout, /!cutsceneKey && Boolean\(pendingEvent/, 'the shell hides the dock under a scene');
const feed = read('../src/features/chronicle/components/LiveStageFeed.jsx');
assert.match(feed, /if \(useGameStore\.getState\(\)\.cutscene\) return;/, 'the hotkeys have their own lock');
assert.match(feed, /armedAtRef\.current = performance\.now\(\) \+ 250/, 'the dock ignores input for 250 ms after a scene');
assert.match(feed, /const hasDock = !cutsceneKey &&/);
const layer = read('../src/features/cutscene/CutsceneLayer.jsx');
assert.match(layer, /addEventListener\('keydown', onKey, \{ capture: true \}\)/, 'skip keys are caught before the hotkeys');
assert.match(layer, /e\.stopPropagation\(\)/);
assert.match(layer, /if \(!e\.repeat\)/, 'a held key skips once');
assert.match(layer, /visibilitychange/, 'a hidden tab ends the scene');
assert.match(layer, /className="cs-skip"/);
assert.doesNotMatch(layer, /onPointerDown/, 'tap-to-skip uses click, so the rest of the tap cannot land on the dock');
assert.match(layer, /createPortal\(/, 'the layer is portalled to body, above the decree modal and toasts');
assert.match(read('../src/styles/ui/cutscene.css'), /body:has\(> \.cutscene\) \.ant-notification/, 'toasts wait out the scene');
assert.match(feed, /open=\{char\.pendingModal === 'color_title'\}/, 'the decree opens beneath the Color scene, so the scene fades onto it');
assert.match(feed, /<LifeEndStep summary=\{lifeSummary\} held=\{Boolean\(cutsceneKey\)\}/, 'the death card waits beneath the scene and takes focus after it');
assert.match(read('../src/store/gameStore.js'), /if \(!nextChar\.alive\) \{\s*const summary = buildLifeSummaryAndLegacy\(nextChar\);/, 'the legacy is written by the store at death, not by the death screen');

console.log('Cutscene gate: Claw plays with the judgment, keys and stale ends ignored, time frozen, ranks, caption, watchdog and wiring passed.');
