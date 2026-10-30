/**
 * The promotion gates live in one file: PM_BE/Data/career_gates.json (the backend embeds it).
 * Vercel only builds the PM folder, so the frontend reads a byte-identical copy at src/data/careerGates.json.
 * Edit the backend file, then run: node tools/sync_career_gates.mjs
 */
import fs from 'fs';

const source = new URL('../../PM_BE/Data/career_gates.json', import.meta.url);
const mirror = new URL('../src/data/careerGates.json', import.meta.url);
fs.copyFileSync(source, mirror);
console.log('careerGates.json updated from PM_BE/Data/career_gates.json');
