import assert from 'node:assert/strict';
import { determineSuccessorType } from '../src/engine/careerPipeline.js';
import { createNewCharacter, buildLifeSummaryAndLegacy } from '../src/engine/gameEngine.js';
import { getScarProfile } from '../src/engine/scarModel.js';

console.log('--- Testing 5 Successor Archetypes: Dying Young & Childless Progression ---');

// 1. determineSuccessorType Unit Verification
// Case A: Died in childhood (age < 14) -> sibling / room urchin
const childVictim = createNewCharacter({ seed: 'test-child-victim', startAge: 10 });
childVictim.age = 10;
const succChild = determineSuccessorType(childVictim);
assert.equal(succChild.type, 'sibling', 'Age < 14 should resolve to sibling archetype');
assert.ok(succChild.titleVi.includes('Đồng lứa'), 'Title Vi must reflect surviving slum/room urchin');

// Case B: Died in adolescence (14 <= age < 18) -> companion
const teenVictim = createNewCharacter({ seed: 'test-teen-victim', startAge: 16 });
teenVictim.age = 16;
const succTeen = determineSuccessorType(teenVictim);
assert.equal(succTeen.type, 'companion', '14 <= age < 18 should resolve to companion archetype');
assert.ok(succTeen.titleVi.includes('Bạn đồng hành'), 'Title Vi must reflect youthful alley companion');

// Case C: Adult with living child -> child
const parentChar = createNewCharacter({ seed: 'test-parent-char', startAge: 30 });
parentChar.age = 30;
parentChar.npcs = { child: { status: 'alive', deceased: false, nameVi: 'Minh' } };
const succParent = determineSuccessorType(parentChar);
assert.equal(succParent.type, 'child', 'Adult with living child must resolve to biological heir');
assert.equal(succParent.titleVi, 'Huyết tử Thừa kế');

// Case D: Adult without child, but with apprentice -> apprentice
const mentorChar = createNewCharacter({ seed: 'test-mentor-char', startAge: 45 });
mentorChar.age = 45;
mentorChar.npcs = { apprentice: { status: 'alive', deceased: false, nameVi: 'Tập sự Lee' } };
const succMentor = determineSuccessorType(mentorChar);
assert.equal(succMentor.type, 'apprentice', 'Adult with apprentice must resolve to successor apprentice');
assert.equal(succMentor.titleVi, 'Truyền nhân Ý chí');

// Case E: Adult without child/apprentice, but with Syndicate vendetta -> debt_bearer
const indebtedChar = createNewCharacter({ seed: 'test-indebted-char', startAge: 28 });
indebtedChar.age = 28;
indebtedChar.heat = 45;
indebtedChar.flags.push('MiddleVendetta');
const succDebtor = determineSuccessorType(indebtedChar);
assert.equal(succDebtor.type, 'debt_bearer', 'Con nợ Syndicate không con phải chuyển thành debt_bearer');
assert.equal(succDebtor.titleVi, 'Kẻ Gánh Nợ Bất Đắc Dĩ');

// Case F: Adult without child/apprentice/vendetta -> scavenger
const loneChar = createNewCharacter({ seed: 'test-lone-char', startAge: 35 });
loneChar.age = 35;
loneChar.heat = 5;
const succLone = determineSuccessorType(loneChar);
assert.equal(succLone.type, 'scavenger', 'Chết đơn độc không nợ/đệ tử phải thành scavenger');
assert.equal(succLone.titleVi, 'Kẻ nhặt tàn dư Backstreets');

// 2. buildLifeSummaryAndLegacy Exposing Archetype Metadata
const summaryChild = buildLifeSummaryAndLegacy(childVictim);
assert.equal(summaryChild.successorRelation, 'sibling');
assert.equal(summaryChild.successorType, 'sibling');
assert.ok(summaryChild.successorTitleVi && summaryChild.successorTitleEn);
assert.ok(summaryChild.successorIntroVi && summaryChild.successorIntroEn);

const summaryDebtor = buildLifeSummaryAndLegacy(indebtedChar);
assert.equal(summaryDebtor.successorRelation, 'debt_bearer');
assert.equal(summaryDebtor.successorType, 'debt_bearer');

// 3. createNewCharacter with Generational Archetype Inheritance
// 3.1 Sibling Heir (born after child died)
const nextGenSibling = createNewCharacter({
  seed: 'test-next-sibling',
  startAge: 0,
  parentLegacy: summaryChild
});
assert.ok(nextGenSibling.flags.includes('HuyếtThốngKếThừa'));
assert.ok(nextGenSibling.scars.includes('Nỗi đau kẻ sống sót'), 'Sibling successor must gain survivor scar');
assert.ok(nextGenSibling.resonance >= 6, 'Sibling successor should gain emotional resonance');
const initialLogSibling = nextGenSibling.pendingBirthLogs?.find((h) => h.id === 'log_legacy_0');
assert.ok(initialLogSibling?.vi?.includes('3:13 AM'), 'Sibling initial log should mention 3:13 AM room urchin context');

// 3.2 Debt Bearer Heir
const nextGenDebtor = createNewCharacter({
  seed: 'test-next-debtor',
  startAge: 0,
  parentLegacy: summaryDebtor
});
assert.ok(nextGenDebtor.flags.includes('NợMáuĐờiTrước'), 'Debt bearer must inherit NợMáuĐờiTrước flag');
assert.ok(nextGenDebtor.heat >= 30, 'Debt bearer must start with Syndicate heat');
const initialLogDebtor = nextGenDebtor.pendingBirthLogs?.find((h) => h.id === 'log_legacy_0');
assert.ok(initialLogDebtor?.vi?.includes('ép gánh cuốn sổ nợ'), 'Debt bearer log must mention forced ledger');

// 3.3 Apprentice Heir
const summaryMentor = buildLifeSummaryAndLegacy(mentorChar);
const nextGenApprentice = createNewCharacter({
  seed: 'test-next-apprentice',
  startAge: 0,
  parentLegacy: summaryMentor
});
assert.ok(nextGenApprentice.stats.health >= 8, 'Apprentice must inherit physical conditioning');
const initialLogApprentice = nextGenApprentice.pendingBirthLogs?.find((h) => h.id === 'log_legacy_0');
assert.ok(initialLogApprentice?.vi?.includes('môn sinh'), 'Apprentice log must mention protégé mentorship');

// 4. Scar Model Synergy Check
const scarProfile = getScarProfile('Nỗi đau kẻ sống sót');
assert.equal(scarProfile?.tag, 'survivor', 'Survivor scar must be registered under survivor tag');

console.log('All 5 successor archetype tests passed successfully!');
