// Prints the flagged Vietnamese strings of one file (every rule except the broad ", và" one unless --va), one per line,
// so a reviewer can rewrite them into a batch for apply_vi_rewrites.mjs.
// Usage: node tools/lint/vi_worklist.mjs <file part> [--va]
import { projectViStrings, scanVi } from './vi_prose_scan.mjs';
const part = process.argv[2] || '';
const withVa = process.argv.includes('--va');
const hits = scanVi(projectViStrings(part));
const seen = new Map();
for (const [rule, list] of Object.entries(hits)) {
  if (rule === 'vaClause' && !withVa) continue;
  for (const h of list) {
    const key = `${h.file}:${h.line}:${h.s}`;
    if (!seen.has(key)) seen.set(key, { ...h, rules: [] });
    seen.get(key).rules.push(rule);
  }
}
for (const h of [...seen.values()].sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)) {
  console.log(`[${h.line}] (${h.rules.join(',')}) ${h.s}`);
}
console.error(`${seen.size} strings`);
