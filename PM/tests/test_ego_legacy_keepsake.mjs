import assert from 'node:assert/strict';
import { createNewCharacter, buildLifeSummaryAndLegacy, resolveEventChoice } from '../src/engine/gameEngine.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { LINEAGE_LEGACY_EVENTS } from '../src/data/eventsLineageLegacy.js';
import { isPersonalEgoRelic, normalizeLegacyRecord } from '../src/engine/legacyKeepsake.js';
import { migrateRun } from '../src/engine/saveSchema.js';

const parent = createNewCharacter({ seed: 'ego-keepsake-parent', startAge: 42 });
parent.flags.push('EGOAwakened');
parent.egoName = 'Tro Tàn';
parent.alive = false;
const summary = buildLifeSummaryAndLegacy(parent);
assert.equal(summary.egoName, 'Tro Tàn', 'the memorial retains the personal E.G.O name');
assert.equal(summary.isEgoAncestor, true);
assert(!isPersonalEgoRelic(summary.relic), 'personal E.G.O is not the inherited keepsake');
assert(summary.relicEn);

const heir = createNewCharacter({ seed: 'ego-keepsake-heir', parentLegacy: summary, startAge: 22 });
assert.equal(heir.lineage.relic, summary.relic);
assert(heir.flags.includes('AncestorHadEGO'));
assert(!heir.flags.includes('EGOAwakened'));
assert.equal(heir.egoName, null);
const witness = LINEAGE_LEGACY_EVENTS.find((event) => event.id === 'm_lineage_ego_witness');
assert(matchesEventContext(witness, heir), 'the predecessor opens a witness encounter');
const ordinary = createNewCharacter({ seed: 'ego-keepsake-ordinary', startAge: 22 });
assert(!matchesEventContext(witness, ordinary));
heir.pendingEvent = witness;
const afterWitness = resolveEventChoice(heir, 0, () => 0.5);
assert(!afterWitness.flags.includes('EGOAwakened'), 'reading a witness statement cannot confer E.G.O');

const oldSummary = { ...summary, relic: 'Mảnh E.G.O 「Tro Tàn」', relicEn: null, egoName: null,
  lifeStoryParagraphsVi: ['Để lại Mảnh E.G.O 「Tro Tàn」.'] };
const repairedSummary = normalizeLegacyRecord(oldSummary);
assert.equal(repairedSummary.egoName, 'Tro Tàn');
assert(!isPersonalEgoRelic(repairedSummary.relic));
assert(!repairedSummary.lifeStoryParagraphsVi[0].includes('Mảnh E.G.O'));
assert.equal(oldSummary.relic, 'Mảnh E.G.O 「Tro Tàn」', 'migration does not mutate the archive input');
const oldHeir = createNewCharacter({ seed: 'ego-keepsake-old-heir', parentLegacy: oldSummary, startAge: 20 });
assert(!isPersonalEgoRelic(oldHeir.lineage.relic));
assert(!oldHeir.flags.includes('EGOAwakened'));

const oldRun = { version: 4, char: {
  seed: 'ego-old-run', alive: true, age: 25,
  lineage: { parentName: parent.name, parentAge: 42, relic: 'Mảnh E.G.O 「Tro Tàn」' },
  logs: [{ vi: 'Bạn nhặt Mảnh E.G.O 「Tro Tàn」.', en: 'Found Mảnh E.G.O 「Tro Tàn」.' }],
  inheritedEchoes: [{ labelVi: 'Di vật: Mảnh E.G.O 「Tro Tàn」' }]
} };
const migrated = migrateRun(oldRun);
assert(!isPersonalEgoRelic(migrated.char.lineage.relic));
assert(!migrated.char.logs[0].vi.includes('Mảnh E.G.O'));
assert(!migrated.char.inheritedEchoes[0].labelVi.includes('Mảnh E.G.O'));
assert.equal(oldRun.char.lineage.relic, 'Mảnh E.G.O 「Tro Tàn」');

oldHeir.alive = false;
const nextSummary = buildLifeSummaryAndLegacy(oldHeir);
assert.notEqual(nextSummary.relic, oldHeir.lineage.relic, 'a later generation leaves its own keepsake');

console.log('E.G.O legacy: personal E.G.O stays in the memorial; keepsake, witness event and old saves passed.');
