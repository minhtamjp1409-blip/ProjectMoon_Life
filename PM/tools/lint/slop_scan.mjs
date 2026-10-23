/**
 * Ranks story entries by how ornamental their prose is, so a polish pass can start with the worst.
 * The score counts stock intensifiers and ceremony words per 100 words, plus sentence length and
 * stacked adjectives. It is a triage list, not a verdict: read the entry before rewriting it.
 * Usage: node tools/lint/slop_scan.mjs [top=40] [--en]
 */
import { ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { LIFE_MINORS, LIFE_DAILIES } from '../../src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from '../../src/data/eventsChildhood.js';

const TOP = Number(process.argv[2]) || 40;
const EN = process.argv.includes('--en');

const VI = [
  'vang dội', 'khủng khiếp', 'huy hoàng', 'phi thường', 'vĩ đại', 'tuyệt đối', 'khổng lồ', 'thần thánh', 'lẫy lừng', 'tuyệt tác',
  'bất khả xâm phạm', 'rực rỡ', 'kinh hoàng', 'vô tận', 'bất diệt', 'cực kỳ', 'vô cùng', 'tột cùng', 'đỉnh cao', 'sừng sững',
  'hào hùng', 'oanh liệt', 'chấn động', 'kinh thiên', 'siêu phàm', 'tuyệt mỹ', 'bất tử', 'vĩnh cửu', 'lộng lẫy', 'thiêng liêng',
  'đồ sộ', 'hào quang', 'tráng lệ', 'ngoạn mục', 'xuất chúng', 'phi phàm', 'mãnh liệt', 'dữ dội'
];
const ENW = [
  'unprecedented', 'legendary', 'brilliantly', 'masterpiece', 'astronomical', 'supreme', 'immense', 'massive', 'colossal', 'monumental',
  'divine', 'sublime', 'glorious', 'eternal', 'unbreakable', 'transcendent', 'unparalleled', 'majestic', 'fortress', 'resplendent',
  'phantom', 'surged', 'roared', 'thunderous', 'ferocious', 'savage', 'ultimate', 'flawless', 'impenetrable', 'untouchable',
  'king’s ransom', 'lavish', 'immaculate', 'fierce', 'epic', 'unrivaled', 'eternal'
];

function pieces(e) {
  const out = [e.vi, e.en, e.textVi, e.textEn];
  for (const c of e.choices || []) {
    out.push(c.labelVi, c.labelEn, c.resultVi, c.resultEn, c.vi, c.en, c.rvi, c.ren);
    for (const o of c.outcomes || c.out || []) out.push(o.resultVi, o.resultEn, o.rvi, o.ren);
  }
  return out.filter((s) => typeof s === 'string' && s);
}

const rows = [];
for (const [pool, list] of [['major', ALL_STORY_EVENTS], ['consequence', CONSEQUENCE_EVENTS], ['minor', LIFE_MINORS], ['daily', LIFE_DAILIES]]) {
  for (const e of list) {
    const text = pieces(e).filter((s) => (EN ? /[a-z]/i.test(s) && !/[ạảãàáâầấẩẫậăằắẳẵặẹẻẽèéêềếểễệ]/i.test(s) : /[ạảãàáâầấẩẫậăằắẳẵặẹẻẽèéêềếểễệ]/i.test(s))).join(' ');
    const lower = text.toLowerCase();
    const words = lower.split(/\s+/).filter(Boolean).length || 1;
    const hits = (EN ? ENW : VI).reduce((n, w) => n + (lower.split(w).length - 1), 0);
    const sentences = text.split(/[.!?]+\s/).filter(Boolean);
    const longSentences = sentences.filter((s) => s.split(/\s+/).length > (EN ? 34 : 38)).length;
    const score = (hits / words) * 100 * 3 + longSentences * 1.5 + (words > 240 ? 2 : 0);
    rows.push({ pool, id: e.id, words, hits, longSentences, score: Math.round(score * 10) / 10 });
  }
}
rows.sort((a, b) => b.score - a.score);
console.log(`Scored ${rows.length} entries (${EN ? 'English' : 'Vietnamese'} text). Worst ${TOP}:`);
for (const r of rows.slice(0, TOP)) console.log(`${String(r.score).padStart(6)}  ${r.pool.padEnd(11)} ${r.id.padEnd(48)} words ${String(r.words).padStart(4)}  stock ${String(r.hits).padStart(2)}  long ${r.longSentences}`);
const byFile = rows.filter((r) => r.score >= 6).length;
console.log(`\nEntries scoring 6 or more: ${byFile}`);
