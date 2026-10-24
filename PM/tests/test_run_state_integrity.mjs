import assert from 'node:assert/strict';
import { createRNG, createNewCharacter, cloneChar, resolveEventChoice, ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { migrateRun, SAVE_VERSION } from '../src/engine/saveSchema.js';
import { createPlanSynchronizer } from '../src/engine/planSync.js';
import { promotionRiskOf } from '../src/engine/careerRisk.js';
import { runDueItems } from '../src/engine/yearPlanner.js';

const char = createNewCharacter({ seed: 'resume-exam', startAge: 30 });
char.job = 'Fixer'; char.fixerGrade = 9; char.merit = 30;
char.stats = { ...char.stats, health: 95, sanity: 90, wealth: 80, rep: 25 };
char.pendingEvent = ALL_STORY_EVENTS.find((event) => event.id === 'fixer_promo_g8_exam');
const rng = createRNG('unbroken-random-stream');
for (let i = 0; i < 47; i++) rng();
const save = migrateRun(JSON.parse(JSON.stringify({ version: SAVE_VERSION, char, rngState: rng.getState() })));
const resumed = createRNG(save.char.seed, save.rngState);
assert.deepEqual(resolveEventChoice(cloneChar(migrateRun({ version: SAVE_VERSION, char }).char), 0, rng), resolveEventChoice(cloneChar(save.char), 0, resumed), 'resuming at an exam preserves the outcome');
assert.deepEqual(Array.from({ length: 100 }, () => resumed()), Array.from({ length: 100 }, () => rng()), 'subsequent rolls remain identical');
assert.equal(migrateRun({ version: 2, char }).rngState, null, 'old saves use the compatibility stream');
assert.equal(migrateRun({ version: SAVE_VERSION, char, rngState: [1, 2, -1, 4] }).rngState, null);

const risk = promotionRiskOf(char.pendingEvent.choices[0], char);
const failed = resolveEventChoice(cloneChar(char), 0, () => 0.9999);
for (const key of ['health', 'sanity', 'wealth']) assert.equal(failed.stats[key] - char.stats[key], risk.loss[key], 'exam preview uses the resolver’s penalty');
assert(promotionRiskOf(char.pendingEvent.choices[0], { ...char, stats: { ...char.stats, health: 4 } }).lethal);
assert.equal(promotionRiskOf(char.pendingEvent.choices[2], char), null, 'deferring has no exam failure risk');
const inDungeon = { ...char, pendingEvent: null, pendingDungeon: { id: 'dungeon_warp_train' }, plan: [{ kind: 'daily', t: 0.1 }], planCursor: 0 };
assert.deepEqual(runDueItems(inDungeon, 100, createRNG('no-background-time')), { char: inDungeon, changed: false }, 'annual events cannot advance behind an open dungeon');

const waiting = [];
const synchronize = createPlanSynchronizer({
  clone: structuredClone, createRng: createRNG,
  plan: (snapshot, planningRng) => {
    snapshot.stats.health = 1;
    planningRng();
    return new Promise((resolve) => waiting.push(() => resolve(snapshot)));
  }
});
let state = { char: { seed: 'same-seed', age: 30, alive: true, stats: { health: 90 } }, inRun: true, yearProgress: 0 };
let applied = 0;
const read = () => state;
const apply = (_prev, synced) => { applied++; state = { ...state, char: synced }; };
const lateChoice = synchronize(read, apply);
assert.equal(state.char.stats.health, 90, 'the backend plans on a detached snapshot');
state = { ...state, char: { ...state.char, planCursor: 1 } };
waiting.shift()();
assert.equal(await lateChoice, false, 'same-year decisions invalidate a pending response');
const lateTick = synchronize(read, apply);
state = { ...state, yearProgress: 1 };
waiting.shift()();
assert.equal(await lateTick, false, 'time cannot rewind to an older plan');
const first = synchronize(read, apply);
const last = synchronize(read, apply);
waiting.shift()(); waiting.shift()();
assert.equal(await first, false);
assert.equal(await last, true);
assert.equal(applied, 1, 'only the newest response for the untouched state is accepted');
console.log('Run integrity: saved RNG, exam replay, penalty previews and delayed plan responses passed.');
