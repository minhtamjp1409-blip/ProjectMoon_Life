import assert from 'node:assert/strict';
import { createRNG, createNewCharacter, cloneChar, resolveEventChoice, ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { migrateRun, SAVE_VERSION } from '../src/engine/saveSchema.js';
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
console.log('Run integrity: saved RNG, exam replay and penalty previews passed.');
