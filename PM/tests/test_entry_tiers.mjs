import assert from 'node:assert/strict';
import { entryTier, foldsInCompact, framesAsMajor, splitLead } from '../src/features/chronicle/entryTiers.js';

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

console.log('PASS: chronicle tier tests');
