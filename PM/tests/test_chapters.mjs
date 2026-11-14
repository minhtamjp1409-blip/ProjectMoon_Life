import assert from 'node:assert/strict';
import { createNewCharacter, cloneChar, buildLifeSummaryAndLegacy, INDEPENDENT_SYNDICATE_RANKS, applyFatalOrCompanionSave } from '../src/engine/gameEngine.js';
import { chapterFor } from '../src/engine/chapters.js';
import { entryTier, foldsInCompact, framesAsMajor } from '../src/features/chronicle/entryTiers.js';

const stored = new Map();
globalThis.localStorage = { getItem: (k) => stored.get(k) ?? null, setItem: (k, v) => stored.set(k, String(v)), removeItem: (k) => stored.delete(k) };
const { useGameStore } = await import('../src/store/gameStore.js');
const store = () => useGameStore.getState();

function adult(seed, job = 'Fixer') {
  const char = createNewCharacter({ seed, startAge: 24 });
  char.job = job;
  char.finger = null;
  char.fixerGrade = 9;
  char.fingerRank = 0;
  char.syndicateRank = 0;
  char.wingRank = 0;
  char.flags = (char.flags || []).filter((f) => !['EGOAwakened', 'Distorted', 'ColorFixer'].includes(f));
  for (const k of ['pendingEvent', 'pendingMinor', 'pendingContract', 'pendingDungeon', 'pendingModal', 'pendingYearPlan', 'pendingLead']) char[k] = null;
  return char;
}
const step = (char, change) => Object.assign(cloneChar(char), change);

// 1. Taking up a trade: a Child who becomes a Fixer gets one card, and the trade wins over the Grade set with it
const child = adult('chapter-child', 'Child');
const fixer = step(child, { job: 'Fixer', fixerGrade: 9 });
const entered = chapterFor(child, fixer);
assert.equal(entered?.type, 'chapter');
assert.equal(entered?.kind, 'job');
assert.equal(entered.titleVi, 'Fixer');
assert.match(entered.subVi, /bước vào nghề/);
assert(entered.vi && entered.en, 'a chapter also carries one plain sentence for readers that know nothing of chapters');

// 2. A Fixer Grade climbed is a chapter; a Grade lost is not
const f9 = adult('chapter-grade');
assert.equal(chapterFor(f9, step(f9, { fixerGrade: 8 }))?.titleEn, 'Fixer Grade 8');
assert.equal(chapterFor(f9, step(f9, { fixerGrade: 8 }))?.kind, 'rank');
assert.equal(chapterFor(step(f9, { fixerGrade: 8 }), f9), null, 'a Grade lost writes no chapter');
assert.equal(chapterFor(f9, cloneChar(f9)), null, 'nothing changed, no chapter');

// 3. Every independent Syndicate rank, 1 to 3, writes exactly one card with that rank's name
let indie = adult('chapter-indie', 'Syndicate');
for (const rank of [1, 2, 3]) {
  const next = step(indie, { syndicateRank: rank });
  const card = chapterFor(indie, next);
  assert.equal(card?.titleVi, INDEPENDENT_SYNDICATE_RANKS[rank].vi, `independent Syndicate rank ${rank}`);
  assert.equal(card?.kind, 'rank');
  indie = next;
}

// 4. A Finger rank and a Wing rank
const thumb = step(adult('chapter-thumb', 'Syndicate'), { finger: 'Thumb' });
assert.equal(chapterFor(thumb, step(thumb, { fingerRank: 1 }))?.titleEn, 'Capo');
assert.equal(chapterFor(thumb, step(thumb, { fingerRank: 1 }))?.kind, 'rank');
const wing = adult('chapter-wing', 'Wing Employee');
assert.equal(chapterFor(wing, step(wing, { wingRank: 1 }))?.titleEn, 'Feather Agent');
assert.equal(chapterFor(wing, step(wing, { wingRank: 1 }))?.kind, 'rank');

// 5. E.G.O, Distortion and a Color; the biggest change in one commit wins
const plain = adult('chapter-flags');
assert.equal(chapterFor(plain, step(plain, { flags: [...plain.flags, 'EGOAwakened'] }))?.titleEn, 'E.G.O');
assert.equal(chapterFor(plain, step(plain, { flags: [...plain.flags, 'EGOAwakened'] }))?.kind, 'ego');
assert.equal(chapterFor(plain, step(plain, { flags: [...plain.flags, 'Distorted'], job: 'Distortion' }))?.titleEn, 'Distortion');
assert.equal(chapterFor(plain, step(plain, { flags: [...plain.flags, 'Distorted'], job: 'Distortion' }))?.kind, 'distortion');
assert.equal(chapterFor(plain, step(plain, { flags: [...plain.flags, 'ColorFixer', 'EGOAwakened'], fixerGrade: 0 }))?.titleEn, 'Color Fixer');
assert.equal(chapterFor(plain, step(plain, { flags: [...plain.flags, 'ColorFixer', 'EGOAwakened'], fixerGrade: 0 }))?.kind, 'color');

// 6. A career crossroad: leaving one trade for another is one card
const leaving = chapterFor(plain, step(plain, { job: 'Wing Employee' }));
assert.equal(leaving?.titleVi, 'Nhân viên Wing');
assert.equal(leaving?.kind, 'job');
assert.match(leaving.subVi, /rời con đường cũ/);

// 7. Death writes no chapter
assert.equal(chapterFor(plain, step(plain, { alive: false, fixerGrade: 8 })), null);

// 8. Through the store: one commit writes one card, the same state again writes none
const before = adult('chapter-store', 'Syndicate');
useGameStore.setState({ char: before, inRun: true, cutscene: null });
const promoted = step(before, { syndicateRank: 1 });
store().commit(before, promoted);
const chapters = () => store().char.logs.filter((l) => l.type === 'chapter');
assert.equal(chapters().length, 1, 'one rank, one chapter card');
assert.equal(chapters()[0].titleVi, INDEPENDENT_SYNDICATE_RANKS[1].vi);
const again = cloneChar(store().char);
store().commit(store().char, again);
assert.equal(chapters().length, 1, 'a commit that changes nothing adds no card');

// 9. Reading tiers: a chapter is a turning point that never folds, is drawn on its own, and is not an epitaph landmark
const card = chapters()[0];
assert.equal(entryTier(card), 'turn');
assert.equal(foldsInCompact(card, 'turn', card.age + 5), false, 'compact reading never folds a chapter');
assert.equal(framesAsMajor(card), false, 'a chapter is not drawn as a framed turning point');
const dead = step(store().char, { alive: false });
assert(!buildLifeSummaryAndLegacy(dead).turningPoints.some((tp) => tp.type === 'chapter'), 'chapters are not epitaph landmarks');

// 10. Đợt 116: Thẻ chương khi mất một NPC thân thiết (Bond >= 50)
// a. Mentor Bond 70 mất thì có thẻ chương với câu chia ly theo vai
const cMentor = adult('chapter-mentor');
cMentor.npcs = {
  mentor: { id: 'npc_mentor', nameVi: 'Sư Phụ Gwan', nameEn: 'Master Gwan', bond: 70, deceased: false, status: 'active' }
};
const mentorDied = step(cMentor, {
  npcs: {
    mentor: { ...cMentor.npcs.mentor, deceased: true, status: 'dead', fateAge: cMentor.age }
  }
});
const mentorLossCard = chapterFor(cMentor, mentorDied);
assert.equal(mentorLossCard?.type, 'chapter');
assert.equal(mentorLossCard?.kind, 'loss');
assert.equal(mentorLossCard?.titleVi, 'Sư Phụ Gwan');
assert.equal(mentorLossCard?.titleEn, 'Master Gwan');
assert.match(mentorLossCard?.subVi, /Người dẫn đường của bạn đã nằm lại trong lòng The City/);
assert.match(mentorLossCard?.subEn, /Your guide has fallen into the belly of the City/);

// b. Friend Bond 30 mất: Bond < 50 không sinh thẻ
const cFriendLow = adult('chapter-friend-low');
cFriendLow.npcs = {
  friend: { id: 'npc_friend', nameVi: 'Bong-pal', nameEn: 'Bong-pal', bond: 30, deceased: false, status: 'active' }
};
const friendDied = step(cFriendLow, {
  npcs: {
    friend: { ...cFriendLow.npcs.friend, deceased: true, status: 'dead', fateAge: cFriendLow.age }
  }
});
assert.equal(chapterFor(cFriendLow, friendDied), null, 'friend with bond 30 writes no chapter card');

// c. Savior cùng commit thì không ghi thẻ (cảnh C7 savior đã nói thay)
const cSavior = adult('chapter-savior');
cSavior.usedDeathSave = false;
cSavior.npcs = {
  partner: { id: 'npc_partner', nameVi: 'So-yeon', nameEn: 'So-yeon', bond: 85, deceased: false, status: 'active' }
};
const saviorCommit = step(cSavior, {
  usedDeathSave: true,
  npcs: {
    partner: { ...cSavior.npcs.partner, deceased: true, status: 'dead', fateAge: cSavior.age }
  }
});
assert.equal(chapterFor(cSavior, saviorCommit), null, 'savior death save writes no loss chapter card');

// d. NPC đã mất từ commit trước không ghi lại
const nextYear = step(mentorDied, { age: mentorDied.age + 1 });
assert.equal(chapterFor(mentorDied, nextYear), null, 'already deceased companion writes no card on subsequent commits');

// e. Thẻ lớn hơn cùng commit thắng: Color Fixer thăng cấp cùng lúc với người thân mất -> Color Fixer thắng
const colorAndLoss = step(mentorDied, {
  flags: [...mentorDied.flags, 'ColorFixer'],
  fixerGrade: 0
});
const colorCard = chapterFor(cMentor, colorAndLoss);
assert.equal(colorCard?.kind, 'color', 'Color Fixer outranks companion loss card');
assert.equal(colorCard?.titleVi, 'Color Fixer');

// f. Các vai spouse, partner, friend (Bond >= 50) có câu tương ứng
const cSpouse = adult('chapter-spouse');
cSpouse.npcs = { spouse: { nameVi: 'Eun-ji', nameEn: 'Eun-ji', bond: 60, deceased: false, status: 'active' } };
const spouseDied = step(cSpouse, { npcs: { spouse: { ...cSpouse.npcs.spouse, deceased: true, status: 'dead' } } });
const spouseCard = chapterFor(cSpouse, spouseDied);
assert.equal(spouseCard?.kind, 'loss');
assert.match(spouseCard?.subVi, /Người từng thức cùng bạn qua những đêm dài/);

const cPartner = adult('chapter-partner');
cPartner.npcs = { partner: { nameVi: 'Jin-woo', nameEn: 'Jin-woo', bond: 55, deceased: false, status: 'active' } };
const partnerDied = step(cPartner, { npcs: { partner: { ...cPartner.npcs.partner, deceased: true, status: 'dead' } } });
const partnerCard = chapterFor(cPartner, partnerDied);
assert.equal(partnerCard?.kind, 'loss');
assert.match(partnerCard?.subVi, /Một chiếc bóng quen thuộc không còn bước cạnh bạn/);

const cFriendHigh = adult('chapter-friend-high');
cFriendHigh.npcs = { friend: { nameVi: 'Min-ho', nameEn: 'Min-ho', bond: 50, deceased: false, status: 'active' } };
const friendHighDied = step(cFriendHigh, { npcs: { friend: { ...cFriendHigh.npcs.friend, deceased: true, status: 'dead' } } });
const friendCard = chapterFor(cFriendHigh, friendHighDied);
assert.equal(friendCard?.kind, 'loss');
assert.match(friendCard?.subVi, /Chiếc ghế quen ở quán ăn cũ từ nay bỏ trống/);

// g. Vai lover (người yêu) và child (con cái)
const cLover = adult('chapter-lover');
cLover.npcs = { lover: { nameVi: 'Yeon-hee', nameEn: 'Yeon-hee', bond: 45, deceased: false, status: 'active' } };
const loverDied = step(cLover, { npcs: { lover: { ...cLover.npcs.lover, deceased: true, status: 'dead' } } });
const loverCard = chapterFor(cLover, loverDied);
assert.equal(loverCard?.kind, 'loss');
assert.equal(loverCard?.titleVi, 'Yeon-hee');
assert.match(loverCard?.subVi, /Lời hẹn cùng nhau rời đi đã vĩnh viễn dang dở/);

const cChild = adult('chapter-child-loss');
cChild.npcs = { child: { nameVi: 'Ha-neul', nameEn: 'Ha-neul', bond: 42, deceased: false, status: 'active' } };
const childDied = step(cChild, { npcs: { child: { ...cChild.npcs.child, deceased: true, status: 'dead' } } });
const childCard = chapterFor(cChild, childDied);
assert.equal(childCard?.kind, 'loss');
assert.equal(childCard?.titleVi, 'Ha-neul');
assert.match(childCard?.subVi, /Đứa trẻ bạn từng che chở đã không thể lớn lên giữa The City/);

// 11. Đợt 118b: Thẻ chương khi trượt kỳ thi Fixer
// a. Trượt lần đầu có thẻ chương nói rõ Grade
const cExam1 = adult('chapter-exam-1');
cExam1.fixerGrade = 7;
const examFailed1 = step(cExam1, { fixerExamFailures: { 6: 1 } });
const failCard1 = chapterFor(cExam1, examFailed1);
assert.equal(failCard1?.type, 'chapter');
assert.equal(failCard1?.kind, 'exam_fail');
assert.equal(failCard1?.titleVi, 'Kỳ thi Grade 6');
assert.equal(failCard1?.titleEn, 'Grade 6 exam');
assert.equal(failCard1?.subVi, 'Hana từ chối công nhận Grade 6.');
assert.equal(failCard1?.subEn, 'Hana denied Grade 6.');

// b. Trượt lần hai cùng Grade có câu khác
const cExam2 = step(cExam1, { fixerExamFailures: { 6: 1 } });
const examFailed2 = step(cExam2, { fixerExamFailures: { 6: 2 } });
const failCard2 = chapterFor(cExam2, examFailed2);
assert.equal(failCard2?.kind, 'exam_fail');
assert.equal(failCard2?.titleVi, 'Kỳ thi Grade 6');
assert.equal(failCard2?.titleEn, 'Grade 6 exam');
assert.equal(failCard2?.subVi, 'Hana lại từ chối Grade 6.');
assert.equal(failCard2?.subEn, 'Hana denied Grade 6 once more.');

// c. Thi đỗ không có thẻ trượt (có thẻ thăng hạng)
const cPass = step(cExam1, { fixerGrade: 6 });
const passCard = chapterFor(cExam1, cPass);
assert.equal(passCard?.kind, 'rank');
assert.equal(passCard?.titleVi, 'Fixer Grade 6');
assert.match(passCard?.subVi, /Hana ghi Grade mới vào hồ sơ/);

// d. Trượt trong cùng commit với cái chết thì không có thẻ, vì cái chết thắng
const failAndDead = step(cExam1, { fixerExamFailures: { 6: 1 }, alive: false });
assert.equal(chapterFor(cExam1, failAndDead), null, 'death outranks exam failure');

// 12. Đợt 178 (B1): Ngưỡng đỡ đòn chết (DEATH_SAVE_BOND): spouse bond 80 cứu được, bond 79 không cứu được
const cSave80 = adult('death-save-80');
cSave80.usedDeathSave = false;
cSave80.npcs = {
  spouse: { id: 'npc_spouse', nameVi: 'Hye-jin', nameEn: 'Hye-jin', bond: 80, deceased: false, status: 'alive' }
};
applyFatalOrCompanionSave(cSave80, 'Chết trong hẻm', 'Died in the alley');
assert.equal(cSave80.alive, true, 'spouse with bond 80 intercepts fatal blow');
assert.equal(cSave80.usedDeathSave, true);
assert.equal(cSave80.npcs.spouse.deceased, true);

const cSave79 = adult('death-save-79');
cSave79.usedDeathSave = false;
cSave79.npcs = {
  spouse: { id: 'npc_spouse', nameVi: 'Hye-jin', nameEn: 'Hye-jin', bond: 79, deceased: false, status: 'alive' }
};
applyFatalOrCompanionSave(cSave79, 'Chết trong hẻm', 'Died in the alley');
assert.equal(cSave79.alive, false, 'spouse with bond 79 does not intercept fatal blow');
assert.equal(Boolean(cSave79.usedDeathSave), false);

console.log('Chapters: trades taken up and left, Grades, Finger, Wing, independent Syndicate, E.G.O, Distortion, Color, companion loss, exam failure, store, tiers and epitaph passed.');
