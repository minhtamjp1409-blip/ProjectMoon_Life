import assert from 'node:assert/strict';
import { createNewCharacter, cloneChar, buildLifeSummaryAndLegacy, INDEPENDENT_SYNDICATE_RANKS } from '../src/engine/gameEngine.js';
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
assert.equal(entered.titleVi, 'Fixer');
assert.match(entered.subVi, /bước vào nghề/);
assert(entered.vi && entered.en, 'a chapter also carries one plain sentence for readers that know nothing of chapters');

// 2. A Fixer Grade climbed is a chapter; a Grade lost is not
const f9 = adult('chapter-grade');
assert.equal(chapterFor(f9, step(f9, { fixerGrade: 8 }))?.titleEn, 'Fixer Grade 8');
assert.equal(chapterFor(step(f9, { fixerGrade: 8 }), f9), null, 'a Grade lost writes no chapter');
assert.equal(chapterFor(f9, cloneChar(f9)), null, 'nothing changed, no chapter');

// 3. Every independent Syndicate rank, 1 to 3, writes exactly one card with that rank's name
let indie = adult('chapter-indie', 'Syndicate');
for (const rank of [1, 2, 3]) {
  const next = step(indie, { syndicateRank: rank });
  const card = chapterFor(indie, next);
  assert.equal(card?.titleVi, INDEPENDENT_SYNDICATE_RANKS[rank].vi, `independent Syndicate rank ${rank}`);
  indie = next;
}

// 4. A Finger rank and a Wing rank
const thumb = step(adult('chapter-thumb', 'Syndicate'), { finger: 'Thumb' });
assert.equal(chapterFor(thumb, step(thumb, { fingerRank: 1 }))?.titleEn, 'Capo');
const wing = adult('chapter-wing', 'Wing Employee');
assert.equal(chapterFor(wing, step(wing, { wingRank: 1 }))?.titleEn, 'Feather Agent');

// 5. E.G.O, Distortion and a Color; the biggest change in one commit wins
const plain = adult('chapter-flags');
assert.equal(chapterFor(plain, step(plain, { flags: [...plain.flags, 'EGOAwakened'] }))?.titleEn, 'E.G.O');
assert.equal(chapterFor(plain, step(plain, { flags: [...plain.flags, 'Distorted'], job: 'Distortion' }))?.titleEn, 'Distortion');
assert.equal(chapterFor(plain, step(plain, { flags: [...plain.flags, 'ColorFixer', 'EGOAwakened'], fixerGrade: 0 }))?.titleEn, 'Color Fixer');

// 6. A career crossroad: leaving one trade for another is one card
const leaving = chapterFor(plain, step(plain, { job: 'Wing Employee' }));
assert.equal(leaving?.titleVi, 'Nhân viên Wing');
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

console.log('Chapters: trades taken up and left, Grades, Finger, Wing and independent Syndicate ranks 1-3, E.G.O, Distortion and Color each write one card; store, tiers and epitaph passed.');
