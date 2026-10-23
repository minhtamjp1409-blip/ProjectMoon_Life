/**
 * Counts the sentence shapes that make narration read as machine-written: the closing line that says
 * the narrator does not know, "as if" similes, "not X but Y", "Some things..." maxims, and the
 * "you realize" ending. It prints how often each shape occurs per 100 scenes so a rewrite can aim at
 * the worst, and compares new content with the rest of the corpus.
 * With --fail it exits 1 when the Finger content uses a shape more than twice as often as the rest of
 * the game (plus a small allowance), the cue that a draft has slipped back into formula.
 * Usage: node tools/lint/rhythm_scan.mjs [--examples=N] [--fail]
 */
import { ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { LIFE_MINORS, LIFE_DAILIES } from '../../src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from '../../src/data/eventsChildhood.js';
import { FINGER_STORY_EVENTS, FINGER_MINORS, FINGER_DAILIES } from '../../src/data/eventsFingers.js';

const EX = Number((process.argv.find((a) => a.startsWith('--examples=')) || '').slice(11)) || 0;
const SHAPES = {
  'không biết... (closer)': /(?:^|\. )Bạn (?:không biết|không chắc|chưa biết|không rõ)[^.]*\./g,
  'như thể / như đang (simile)': /\bnhư (?:thể|đang|vừa|đã|một người|người ta|chưa)\b/g,
  'không phải... mà (negation)': /\bkhông phải [^.]{2,70}?(?:, )?mà\b|\bchứ không phải\b/g,
  'Có những... (maxim)': /(?:^|\. )Có những [^.]+\./g,
  'Bạn nhận ra... (realize)': /(?:^|\. )Bạn nhận ra\b/g,
  'chỉ... (tail)': /\. (?:Nó|Họ|Ông|Bà|Người ấy) chỉ [^.]+\./g
};
const pieces = (e) => {
  const out = [e.vi, e.textVi];
  for (const c of e.choices || []) {
    out.push(c.resultVi, c.rvi);
    for (const o of c.outcomes || c.out || []) out.push(o.resultVi, o.rvi);
  }
  return out.filter((s) => typeof s === 'string' && s);
};

const fingerIds = new Set([...FINGER_STORY_EVENTS, ...FINGER_MINORS, ...FINGER_DAILIES].map((e) => e.id));
const groups = { 'Finger content': { n: 0, c: {} }, 'rest of corpus': { n: 0, c: {} } };
const samples = {};
for (const e of [...ALL_STORY_EVENTS, ...CONSEQUENCE_EVENTS, ...LIFE_MINORS, ...LIFE_DAILIES]) {
  const g = groups[fingerIds.has(e.id) ? 'Finger content' : 'rest of corpus'];
  g.n++;
  for (const text of pieces(e)) {
    for (const [name, rx] of Object.entries(SHAPES)) {
      const m = text.match(rx);
      if (m) {
        g.c[name] = (g.c[name] || 0) + m.length;
        if (EX && fingerIds.has(e.id)) (samples[name] ||= []).push(`${e.id}: ${m[0].trim().slice(0, 110)}`);
      }
    }
  }
}
const rows = {};
for (const name of Object.keys(SHAPES)) {
  rows[name] = Object.fromEntries(Object.entries(groups).map(([k, g]) => [k + ' /100', +(((g.c[name] || 0) / g.n) * 100).toFixed(1)]));
}
console.table(rows);
const tooMuch = Object.entries(rows).filter(([, r]) => r['Finger content /100'] > r['rest of corpus /100'] * 2 + 1.5 && r['Finger content /100'] > 3.5);
if (process.argv.includes('--fail') && tooMuch.length) {
  console.error('Formula shapes above the allowance:', tooMuch.map(([n]) => n).join(', '));
  process.exit(1);
}
if (EX) for (const [name, list] of Object.entries(samples)) { console.log(`\n${name}`); list.slice(0, EX).forEach((s) => console.log('  ' + s)); }
