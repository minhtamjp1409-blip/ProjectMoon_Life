import { createNewCharacter, createRNG } from '../../src/engine/gameEngine.js';
import { planYear, LIFE_MINORS } from '../../src/engine/yearPlanner.js';
import { LIFE_DAILIES as D1 } from '../../src/data/lifeDailies.js';
import { EXPANDED_DAILIES as D2 } from '../../src/data/narrative/dailies.js';
import { DAILIES_2 as D3 } from '../../src/data/narrative/dailies2.js';
import { YEAR_END_LINES } from '../../src/data/yearEndLines.js';

export function countSentences(text) {
  if (!text) return 0;
  const body = text.replace(/^\[[^\]]+\]\s*/, '').trim();
  if (!body) return 0;
  // Splits on sentence terminal marks (. ! ? …) followed by whitespace or end of string
  const matches = body.match(/[^.!?…]+[.!?…]+(?:\s|$)/g);
  return matches ? matches.length : 1;
}

// 1. Gather all data pools
const minorMap = new Map();
for (const m of LIFE_MINORS) {
  if (m && m.id) minorMap.set(m.id, m);
}

const dailyMap = new Map();
const allDailies = [];
if (Array.isArray(D1)) allDailies.push(...D1);
if (Array.isArray(D2)) allDailies.push(...D2);
if (Array.isArray(D3)) allDailies.push(...D3);
for (const d of allDailies) {
  if (d && d.id) dailyMap.set(d.id, d);
}

// 2. Run 500-life simulation to rank items by frequency
console.log('Running 500-life audit to count item occurrences...');
const frequency = {};

for (let i = 0; i < 500; i++) {
  const char = createNewCharacter({ seed: `sentence_audit_${i}` });
  const rng = createRNG(`${char.seed}:life`);
  for (let age = 0; age < 40 && char.alive; age++) {
    char.age = age;
    planYear(char, rng);
    for (const item of (char.plan || [])) {
      if (item?.id) {
        frequency[item.id] = (frequency[item.id] || 0) + 1;
      }
    }
  }
}

// 3. Sort items by frequency
const sortedFreq = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
const top100 = sortedFreq.slice(0, 100);

console.log(`Audited 500 lives. Total distinct planned items: ${sortedFreq.length}`);
console.log('Top 10 most frequent items:');
for (const [id, count] of top100.slice(0, 10)) {
  console.log(`  ${id}: ${count}`);
}

// 4. Check sentence standards for top 100 items
// Standard:
// - Minor: situation 1-2 sentences, outcome 1-2 sentences
// - Daily: 1-2 sentences
// - Year-end: max 2 sentences
const violations = [];

for (const [id, count] of top100) {
  if (minorMap.has(id)) {
    const m = minorMap.get(id);
    const sitVi = countSentences(m.vi);
    const sitEn = countSentences(m.en);
    const issues = [];
    if (sitVi > 2) issues.push(`situation Vi has ${sitVi} sentences (>2)`);
    if (sitEn > 2) issues.push(`situation En has ${sitEn} sentences (>2)`);

    for (let i = 0; i < (m.choices || []).length; i++) {
      const c = m.choices[i];
      const rvi = countSentences(c.rvi || c.resultVi);
      const ren = countSentences(c.ren || c.resultEn);
      if (rvi > 2) issues.push(`choice ${i} result Vi has ${rvi} sentences (>2)`);
      if (ren > 2) issues.push(`choice ${i} result En has ${ren} sentences (>2)`);
    }

    if (issues.length > 0) {
      violations.push({ id, kind: 'minor', count, issues, file: m._file || 'lifeMinors' });
    }
  } else if (dailyMap.has(id)) {
    const d = dailyMap.get(id);
    const vi = countSentences(d.vi);
    const en = countSentences(d.en);
    const issues = [];
    if (vi > 2) issues.push(`daily Vi has ${vi} sentences (>2)`);
    if (en > 2) issues.push(`daily En has ${en} sentences (>2)`);
    if (issues.length > 0) {
      violations.push({ id, kind: 'daily', count, issues });
    }
  }
}

// Check year-end lines
let yearEndViolations = 0;
for (const [key, stages] of Object.entries(YEAR_END_LINES)) {
  for (const [stage, list] of Object.entries(stages)) {
    for (const [vi, en] of list) {
      if (countSentences(vi) > 2 || countSentences(en) > 2) {
        yearEndViolations++;
        console.error(`Year-end line exceeds 2 sentences: ${key}.${stage}`);
      }
    }
  }
}

console.log('================================================================');
console.log(`KIỂM TRA CHUẨN ĐỘ DÀI CÂU CHỮ TRONG TOP 100 MỤC XUẤT HIỆN NHIỀU NHẤT:`);
console.log(`Số mục vượt chuẩn: ${violations.length} / 100`);
if (violations.length > 0) {
  console.log('Danh sách các mục vượt chuẩn trong Top 100:');
  for (const v of violations) {
    console.log(`- [${v.count} lượt] ${v.id} (${v.kind}): ${v.issues.join('; ')}`);
  }
} else {
  console.log('✓ Tất cả 100 mục xuất hiện nhiều nhất đều đạt chuẩn độ dài câu chữ (1-2 câu)!');
}
console.log('================================================================');

if (process.argv.includes('--fail') && (violations.length > 0 || yearEndViolations > 0)) {
  process.exit(1);
}
