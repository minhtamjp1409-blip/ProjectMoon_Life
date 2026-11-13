/**
 * Vietnamese prose scan: finds the machine-made habits in the game's Vietnamese narration
 * (rules in .agents/skills/vi-prose/SKILL.md). It reads every quoted string with Vietnamese
 * letters in src/data, the engine and the cutscenes, so new pools are covered without a registry.
 * Usage: node tools/lint/vi_prose_scan.mjs [--rule=name] [--examples=N] [--file=part] [--json] [--max=name:N,...]
 *   --max fails (exit 1) when a rule's count goes above N, so the totals can only go down.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const arg = (name, dflt) => (process.argv.find((a) => a.startsWith(`--${name}=`)) || '').split('=').slice(1).join('=') || dflt;

const ROOTS = ['src/data', 'src/engine', 'src/features/cutscene'];
const VI = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i;

// \b only knows ASCII letters, so "ở" and "tại" never matched; V() turns each \b into a Unicode letter edge
const EDGE = '(?:(?<=[\\p{L}\\p{N}])(?![\\p{L}\\p{N}])|(?<![\\p{L}\\p{N}])(?=[\\p{L}\\p{N}]))';
const V = (re, flags = 'iu') => new RegExp(re.source.replaceAll('\\b', EDGE), flags);
const countOf = (s, re) => (s.match(re) || []).length;
const MOT = V(/\bmột\b/, 'giu');
const O_TAI = V(/\b(?:ở|tại)\b/, 'giu');
const sentences = (s) => s.split(/[.!?…]/);

// Each rule is a habit a reader hears as translated or machine-made Vietnamese
export const VI_RULES = {
  // "trong một căn phòng thuê ở Backstreets": the article and the locative pile up before the noun
  motO: { re: V(/\bmột [^,.;:"“”]{1,28}? (?:ở|tại)\b/), why: '"một … ở/tại" chain: drop "một" or the locative' },
  // "Bạn sinh ra trong một …", "Bạn chào đời trong một …"
  birthOpener: { re: V(/Bạn (?:sinh ra|chào đời) (?:trong|ở|tại) một\b/), why: 'flat birth opener with "một"' },
  // "của một", "bên dưới mái hiên của một": the possessive calque from English "of a"
  cuaMot: { re: V(/\bcủa một\b/), why: '"của một" (English "of a")' },
  // "Đêm ấy trời đổ mưa đen, và …": English ", and" joining two clauses
  vaClause: { re: V(/, và (?!(?:rồi|thế|cả|vì)\b)/), why: '", và" joining clauses (English ", and")' },
  // three or more "một" in one sentence
  motHeavy: { test: (s) => sentences(s).some((x) => countOf(x, MOT) >= 3), why: 'three "một" in one sentence' },
  // "ở" or "tại" three times in one sentence
  oHeavy: { test: (s) => sentences(s).some((x) => countOf(x, O_TAI) >= 3), why: 'three "ở/tại" in one sentence' },
  // translated passive "bị/được … bởi"
  boiPassive: { re: V(/\b(?:bị|được) [^,.]{1,30}\bbởi\b/), why: 'passive "bởi" (English "by")' },
  // "một cách + adjective" adverb calque
  motCach: { re: V(/\bmột cách\b/), why: '"một cách" adverb calque' },
  // "điều mà", "người mà", "nơi mà": relative "that/which"
  relativeMa: { re: V(/\b(?:điều|người|nơi|thứ|cái|lúc) mà\b/), why: 'relative "… mà" (English "that/which")' },
  // Sino-Vietnamese words that have a plain native word the narration should prefer
  hanViet: { re: V(/\b(?:hiện diện|tiến hành|thực hiện|sở hữu|tử vong|nhận thức được|cảm nhận được)\b/), why: 'stiff Sino-Vietnamese word, prefer the native one' },
  // "đã từng": one of the two is enough
  daTung: { re: V(/\bđã từng\b/), why: '"đã từng" (one is enough)' },
  // "chẳng" overuse as a mechanical replacement for "không" or connectors
  chang: { re: V(/\bchẳng\b/), why: '"chẳng" overuse: prefer natural "không" unless tone calls for it' },
};

function walkFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkFiles(p, out);
    else if (/\.(js|jsx)$/.test(name)) out.push(p);
  }
  return out;
}

// Quoted string literals with their line number; template literals keep their ${} parts as text
const LITERAL = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g;
export function viStrings(files) {
  const out = [];
  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(LITERAL)) {
      const s = m[1] ?? m[2] ?? m[3] ?? '';
      if (s.length < 20 || !VI.test(s) || !/\s/.test(s)) continue;
      const line = src.slice(0, m.index).split('\n').length;
      out.push({ file: relative(process.cwd(), file).replace(/\\/g, '/'), line, s });
    }
  }
  return out;
}

export function scanVi(strings, only = '') {
  const hits = Object.fromEntries(Object.keys(VI_RULES).map((k) => [k, []]));
  for (const item of strings) {
    for (const [name, rule] of Object.entries(VI_RULES)) {
      if (only && name !== only) continue;
      if (rule.re ? rule.re.test(item.s) : rule.test(item.s)) hits[name].push(item);
    }
  }
  return hits;
}

export const projectViStrings = (filePart = '') =>
  viStrings(ROOTS.flatMap((r) => walkFiles(r)).filter((f) => !filePart || f.replace(/\\/g, '/').includes(filePart)));

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const ONLY = arg('rule', '');
  const EXAMPLES = Number(arg('examples', 0));
  const MAX = Object.fromEntries((arg('max', '') || '').split(',').filter(Boolean).map((p) => p.split(':')).map(([k, v]) => [k, Number(v)]));
  const strings = projectViStrings(arg('file', ''));
  const hits = scanVi(strings, ONLY);
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(hits));
  } else {
    const words = strings.reduce((n, x) => n + x.s.split(/\s+/).length, 0);
    const mot = strings.reduce((n, x) => n + countOf(x.s, MOT), 0);
    const o = strings.reduce((n, x) => n + countOf(x.s, O_TAI), 0);
    console.log(`Vietnamese strings ${strings.length}, words ${words}`);
    console.log(`"một" ${mot} (${(1000 * mot / words).toFixed(1)} per 1000 words), "ở/tại" ${o} (${(1000 * o / words).toFixed(1)} per 1000 words)`);
    for (const [name, list] of Object.entries(hits)) {
      if (ONLY && name !== ONLY) continue;
      console.log(`${name.padEnd(13)} ${String(list.length).padStart(5)}  ${VI_RULES[name].why}`);
      for (const x of list.slice(0, EXAMPLES)) console.log(`    ${x.file}:${x.line}  ${x.s.slice(0, 160)}`);
    }
  }
  for (const [name, n] of Object.entries(MAX)) {
    if ((hits[name]?.length || 0) > n) { console.error(`FAIL ${name}: ${hits[name].length} > ${n}`); process.exitCode = 1; }
  }
}
