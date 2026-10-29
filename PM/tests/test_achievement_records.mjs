import assert from 'node:assert/strict';
import { CODEX_RECORDS } from '../src/data/worldData.js';
import { buildLifeSummaryAndLegacy, createNewCharacter, evaluateCharacterAchievements, generateFixerContract, resolveFixerContract } from '../src/engine/gameEngine.js';
import { settleRun, isColorRank } from '../src/engine/dungeonEngine.js';
import { triggerDistortionTransformation } from '../src/engine/careerPipeline.js';
import { applyAffiliationChoice, leaveAffiliation } from '../src/engine/affiliation.js';
import { migrateRun, SAVE_VERSION } from '../src/engine/saveSchema.js';
import { getBranchSceneMeta } from '../src/engine/colorRegistry.js';
import { isFactionLeader } from '../src/engine/npcInteractions.js';

const newKeys = [
  'life_eighty', 'life_century', 'three_requests', 'ten_requests', 'hard_request',
  'association_director', 'office_owner', 'color_before_forty_five', 'five_finger_jobs',
  'finger_top_rank', 'independent_five_jobs', 'wing_section_chief',
  'wing_senior_executive', 'wing_five_assignments', 'dungeon_first_clear',
  'dungeon_three_clear', 'dungeon_five_places', 'lobotomy_containment_clear',
  'outskirts_ruins_clear', 'great_lake_clear'
];
assert.equal(new Set(CODEX_RECORDS.map((r) => r.key)).size, CODEX_RECORDS.length);
for (const key of newKeys) {
  const record = CODEX_RECORDS.find((r) => r.key === key);
  assert.ok(record?.vi && record?.en && record?.hintVi && record?.hintEn && record?.tier, key);
}

const char = createNewCharacter({ seed: 'achievement-evidence', startAge: 25 });
evaluateCharacterAchievements(char);
assert.equal(char.unlockedRecords.includes('dungeon_first_clear'), false);
assert.equal(char.unlockedRecords.includes('three_requests'), false);
assert.equal(char.unlockedRecords.includes('association_director'), false);
settleRun(char, { id: 'dungeon_lobotomy_ruin' }, 'fled');
assert.equal(char.unlockedRecords.includes('dungeon_first_clear'), false);
assert.equal(char.dungeonRecord.clears.length, 0);

for (const id of ['dungeon_lobotomy_ruin', 'dungeon_outskirts_ruins', 'dungeon_great_lake']) {
  settleRun(char, { id }, 'conquered');
}
assert.equal(char.dungeonRecord.clears.length, 3);
assert.ok(char.unlockedRecords.includes('dungeon_three_clear'));
assert.ok(char.unlockedRecords.includes('lobotomy_containment_clear'));
assert.equal(char.unlockedRecords.includes('dungeon_five_places'), false);
for (const id of ['dungeon_warp_train', 'dungeon_bloodfiend_carnival']) {
  settleRun(char, { id }, 'conquered');
}
assert.ok(char.unlockedRecords.includes('dungeon_five_places'));

const fixer = createNewCharacter({ seed: 'achievement-contract', startAge: 26 });
fixer.job = 'Fixer';
fixer.stats.wealth = 80;
const offer = generateFixerContract(fixer, () => 0.4);
fixer.pendingContract = offer;
const declined = resolveFixerContract(fixer, 'decline', () => 0);
assert.equal(declined.contractRecord.fixer, 0);
fixer.pendingContract = offer;
const completed = resolveFixerContract(fixer, 'careful', () => 0.5);
assert.equal(completed.contractRecord.fixer, 1);

const promoted = createNewCharacter({ seed: 'achievement-leaders', startAge: 40 });
promoted.job = 'Fixer';
promoted.affiliation = { id: 'Liu', kind: 'assoc', director: true };
promoted.flags.push('AssocDirector', 'ColorFixer');
promoted.colorAwardAge = 40;
promoted.customTitle = 'Scarlet Bell';
promoted.merit = 80;
promoted.contractRecord.fixer = 10;
promoted.contractRecord.highestFixerTier = 4;
evaluateCharacterAchievements(promoted);
for (const key of ['association_director', 'color_before_forty_five', 'liu_warfare_flame', 'ten_requests', 'hard_request']) {
  assert.ok(promoted.unlockedRecords.includes(key), key);
}
promoted.alive = false;
promoted.deathCauseVi = 'Tuổi già';
promoted.deathCauseEn = 'Old age';
const summary = buildLifeSummaryAndLegacy(promoted);
assert.ok(summary.recordsList.some((r) => r.key === 'color_fixer' && r.vi.includes('Scarlet Bell')));
assert.equal(summary.newRecordsCount, 0);

const outsider = createNewCharacter({ seed: 'achievement-not-liu', startAge: 40 });
outsider.merit = 80;
outsider.seenEvents = ['night_in_backstreets'];
evaluateCharacterAchievements(outsider);
assert.equal(outsider.unlockedRecords.includes('liu_warfare_flame'), false);
assert.equal(outsider.unlockedRecords.includes('survive_night'), false);

const oldColor = createNewCharacter({ seed: 'old-color-save', startAge: 51 });
oldColor.job = 'Color Fixer';
oldColor.fixerGrade = 0;
oldColor.flags.push('ColorFixer');
oldColor.customTitle = 'Scarlet Bell';
oldColor.logs.push({ id: 'log_color_named_40', age: 40 });
const restoredColor = migrateRun({ version: SAVE_VERSION, char: oldColor }).char;
assert.equal(restoredColor.colorAwardAge, 40);
assert.equal(restoredColor.colorTitleAtAward, 'Scarlet Bell');
evaluateCharacterAchievements(restoredColor);
assert.ok(restoredColor.unlockedRecords.includes('color_before_forty_five'));

const unknownAward = createNewCharacter({ seed: 'unknown-color-age', startAge: 51 });
unknownAward.job = 'Color Fixer';
unknownAward.fixerGrade = 0;
unknownAward.flags.push('ColorFixer');
const unknownAwardRestored = migrateRun({ version: SAVE_VERSION, char: unknownAward }).char;
evaluateCharacterAchievements(unknownAwardRestored);
assert.equal(unknownAwardRestored.unlockedRecords.includes('color_before_forty_five'), false);

const oldDistortion = createNewCharacter({ seed: 'old-distortion-save', startAge: 55 });
oldDistortion.job = 'Distortion';
oldDistortion.flags.push('Distorted', 'ColorFixer');
oldDistortion.customTitle = 'Scarlet Bell';
oldDistortion.logs.push({ id: 'log_color_named_40', age: 40 });
const restoredDistortion = migrateRun({ version: SAVE_VERSION, char: oldDistortion }).char;
assert.equal(restoredDistortion.flags.includes('ColorFixer'), false);
assert.ok(restoredDistortion.unlockedRecords.includes('color_fixer'));
assert.ok(restoredDistortion.unlockedRecords.includes('color_before_forty_five'));
assert.equal(restoredDistortion.colorTitleAtAward, 'Scarlet Bell');

triggerDistortionTransformation(restoredColor);
assert.equal(restoredColor.job, 'Distortion');
assert.equal(restoredColor.flags.includes('ColorFixer'), false);
assert.equal(restoredColor.isColorFixer, false);
assert.equal(restoredColor.colorTitleAtAward, 'Scarlet Bell');
assert.ok(restoredColor.unlockedRecords.includes('color_fixer'));
assert.equal(isColorRank(restoredColor), false);
assert.equal(getBranchSceneMeta(restoredColor).isColor, false);
assert.equal(isFactionLeader(restoredColor), false);
evaluateCharacterAchievements(restoredColor);
restoredColor.alive = false;
restoredColor.deathCauseVi = 'Biến dị';
restoredColor.deathCauseEn = 'Distortion';
const fallenSummary = buildLifeSummaryAndLegacy(restoredColor);
assert.equal(fallenSummary.occupationEn, 'Distortion');
assert.equal(fallenSummary.signatureRecordKey, 'distortion_awaken');
assert.ok(fallenSummary.recordsList.some((record) => record.key === 'color_fixer' && record.en.includes('Scarlet Bell')));

const formerDirector = createNewCharacter({ seed: 'former-director', startAge: 46 });
formerDirector.job = 'Fixer';
formerDirector.affiliation = { id: 'Liu', kind: 'assoc', name: 'Liu Association', section: 1, standing: 80, director: false };
applyAffiliationChoice(formerDirector, { affDirector: true });
assert.equal(formerDirector.directorAppointment.name, 'Liu Association');
evaluateCharacterAchievements(formerDirector);
leaveAffiliation(formerDirector);
formerDirector.alive = false;
const directorSummary = buildLifeSummaryAndLegacy(formerDirector);
assert.ok(directorSummary.recordsList.some((record) => record.key === 'association_director' && record.evidenceEn.includes('Liu Association')));

console.log('Achievement records: evidence, route gates, summary and false positives passed.');
