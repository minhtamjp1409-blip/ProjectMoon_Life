import assert from 'node:assert/strict';
import { entryTier, foldsInCompact, framesAsMajor, splitLead } from '../src/features/chronicle/entryTiers.js';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';

console.log('--- RUNNING CHRONICLE TIER TESTS ---');

console.log('1. Routine entries are quiet, decisions and consequences are not...');
assert.strictEqual(entryTier({ type: 'daily' }), 'quiet');
assert.strictEqual(entryTier({ type: 'summary' }), 'quiet');
assert.strictEqual(entryTier({ type: 'lore' }), 'quiet');
assert.strictEqual(entryTier({ type: 'choice', choiceVi: 'Nhận việc' }), 'decision');
assert.strictEqual(entryTier({ type: 'danger' }), 'decision');
assert.strictEqual(entryTier({ type: 'causal' }), 'decision');
assert.strictEqual(entryTier({ type: 'story' }), 'decision');

console.log('2. A routine entry the player answered is never folded...');
assert.strictEqual(entryTier({ type: 'daily', choiceVi: 'Giúp anh ta' }), 'decision');
assert.strictEqual(entryTier({ type: 'daily', passed: true }), 'decision');

console.log('3. Turning points are marked, whatever their type...');
for (const type of ['major', 'promo', 'miracle', 'death']) assert.strictEqual(entryTier({ type }), 'turn');
assert.strictEqual(entryTier({ type: 'major', choiceVi: 'Nhận lời' }), 'turn', 'an answered major event is still a turning point');
assert.strictEqual(entryTier({ type: 'choice', major: true }), 'turn');
assert(framesAsMajor({ type: 'promo' }) && framesAsMajor({ type: 'miracle' }) && framesAsMajor({ major: true }) && framesAsMajor({ type: 'major' }));
assert(!framesAsMajor({ type: 'death' }), 'a death keeps its own rule, not the framed card');
assert(!framesAsMajor({ type: 'daily' }));

console.log('4. The compact lead is the first sentence and nothing is lost...');
const text = 'Tấm chăn thô ráp được quấn chặt. Bạn ngủ ngon hơn mọi đêm. Sáng ra trời vẫn mưa.';
const split = splitLead(text);
assert.strictEqual(split.lead, 'Tấm chăn thô ráp được quấn chặt.');
assert.strictEqual(`${split.lead} ${split.rest}`, text, 'lead and rest rebuild the paragraph exactly');
assert.strictEqual(splitLead('Một câu duy nhất và không còn gì để gấp.'), null, 'a single sentence has nothing to fold');
assert.strictEqual(splitLead(''), null);
const quoted = splitLead('Hắn nói: "Đi đi." Rồi quay lưng bỏ đi.');
assert(quoted && `${quoted.lead} ${quoted.rest}` === 'Hắn nói: "Đi đi." Rồi quay lưng bỏ đi.', 'quotes stay whole across the split');

console.log('5. Compact folds the choices of past years, never the year in progress or a turning point...');
const past = { type: 'choice', choiceVi: 'Nhận việc', age: 12 };
assert(foldsInCompact({ type: 'daily', age: 15 }, 'quiet', 15), 'routine always folds');
assert(foldsInCompact(past, 'decision', 15), 'a past year choice folds');
assert(!foldsInCompact({ ...past, age: 15 }, 'decision', 15), 'this year choice stays whole');
assert(foldsInCompact({ type: 'daily', passed: true, age: 9 }, 'decision', 15));
assert(!foldsInCompact({ type: 'danger', age: 9 }, 'decision', 15), 'a danger with no choice stays whole');
assert(!foldsInCompact({ type: 'causal', age: 9 }, 'decision', 15), 'a consequence stays whole');
assert(!foldsInCompact({ ...past, type: 'major' }, 'turn', 15), 'a turning point never folds');

console.log('6. A resolved major event is a turning point only when the life moved...');
assert.strictEqual(entryTier({ type: 'major', review: { choices: [] }, choiceVi: 'Chuyển nhà' }), 'decision', 'an ordinary major event with a choice is a decision');
assert.strictEqual(entryTier({ type: 'major', review: { choices: [] }, choiceVi: 'Nộp đơn', turning: true }), 'turn', 'a choice that moved the life is a turn');
assert.strictEqual(entryTier({ type: 'major' }), 'turn', 'an engine-written landmark without a review is a turn');
assert(!framesAsMajor({ type: 'major', review: {}, choiceVi: 'x' }));
assert(framesAsMajor({ type: 'major', review: {}, choiceVi: 'x', turning: true }));

console.log('7. The real career crossroad marks the choice as a turning point, a side event does not...');
const base = createNewCharacter({ seed: 'tier-turn', startAge: 18 });
base.job = 'Child'; base.alive = true; base.age = 18; base.careerAge = 18; base.flags = []; base.seenEvents = [];
const crossroad = ALL_STORY_EVENTS.find((e) => e.id === 'ad_career_crossroad_18');
const taken = { ...base, pendingEvent: crossroad };
const resolved = resolveEventChoice(taken, 0, () => 0.1);
const turnLog = resolved.logs.at(-1);
assert(resolved.job !== 'Child', 'the first application changed the path');
assert.strictEqual(turnLog.turning, true, 'the log says so');
assert.strictEqual(entryTier(turnLog), 'turn');
const side = ALL_STORY_EVENTS.find((e) => e.major && !e.choices.some((c) => c.setJob || c.setFixerGrade || (c.outcomes || []).some((o) => o.setJob || o.setFixerGrade)) && e.choices.length);
const sideResolved = resolveEventChoice({ ...base, pendingEvent: side }, 0, () => 0.1);
assert.notStrictEqual(sideResolved.logs.at(-1).turning, true, `a major event that changes nothing about the path is not a turning point (${side.id})`);

console.log('8. Every independent Syndicate promotion is a turning point...');
for (const [id, rank] of [['syn_indie_promo_rank1', 0], ['syn_indie_promo_rank2', 1], ['syn_indie_promo_rank3', 2]]) {
  const ev = ALL_STORY_EVENTS.find((e) => e.id === id);
  let rose = null;
  for (let ci = 0; ci < ev.choices.length && !rose; ci++) {
    for (const roll of [0.05, 0.5, 0.95]) {
      const c = { ...base, job: 'Syndicate', age: 30, flags: ['IndependentSyndicate'], syndicateRank: rank, finger: null, pendingEvent: ev };
      const after = resolveEventChoice(c, ci, () => roll);
      if ((after.syndicateRank || 0) > rank) { rose = after; break; }
    }
  }
  assert(rose, `${id}: some choice raises the rank`);
  assert.strictEqual(rose.logs.at(-1).turning, true, `${id}: logged as a turning point`);
  assert.strictEqual(entryTier(rose.logs.at(-1)), 'turn', `${id}: reads as a turn, so compact never folds it`);
}

console.log('PASS: chronicle tier tests');
