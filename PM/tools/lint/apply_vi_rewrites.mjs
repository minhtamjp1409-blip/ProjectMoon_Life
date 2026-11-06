/**
 * Applies a reviewed list of Vietnamese rewrites: each entry replaces one exact old string with a new one
 * in one file. An old string that is missing or appears more than once stops the whole batch, so a rewrite
 * never lands in the wrong line. Placeholders like {region} must survive unchanged.
 * Usage: node tools/lint/apply_vi_rewrites.mjs <batch.json> [--dry]
 *   batch.json: [{ "file": "src/data/x.js", "from": "old text", "to": "new text" }, ...]
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [batchPath] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const DRY = process.argv.includes('--dry');
const batch = JSON.parse(readFileSync(batchPath, 'utf8'));
const placeholders = (s) => (s.match(/\{[A-Za-z]+\}/g) || []).sort().join(',');

const byFile = new Map();
const errors = [];
for (const [i, r] of batch.entries()) {
  if (placeholders(r.from) !== placeholders(r.to)) errors.push(`#${i} ${r.file}: placeholders differ (${placeholders(r.from)} vs ${placeholders(r.to)})`);
  if (!byFile.has(r.file)) byFile.set(r.file, readFileSync(r.file, 'utf8'));
  const src = byFile.get(r.file);
  const n = src.split(r.from).length - 1;
  if (n !== 1) { errors.push(`#${i} ${r.file}: found ${n} times: ${r.from.slice(0, 70)}`); continue; }
  byFile.set(r.file, src.replace(r.from, () => r.to));
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
if (!DRY) for (const [file, src] of byFile) writeFileSync(file, src);
console.log(`${DRY ? 'checked' : 'applied'} ${batch.length} rewrites in ${byFile.size} files`);
