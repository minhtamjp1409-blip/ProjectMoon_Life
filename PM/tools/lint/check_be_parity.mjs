/**
 * Promotion gates (Fixer ladder, Color gate, Finger ranks, Wing ladder) live in PM_BE/Config/career_gates.json.
 * The backend embeds that file; the frontend reads the copy at src/data/careerGates.json.
 * This fails when the copy drifts from the source, when an engine table stops following the file,
 * or when the backend goes back to hard-coding a gate number.
 * Usage: node tools/lint/check_be_parity.mjs   (fix a stale copy with: node tools/sync_career_gates.mjs)
 */
import fs from 'fs';
import { spawnSync } from 'child_process';
import { FIXER_LADDER, COLOR_FIXER_REQ, COLOR_FIXER_REQ_EGO, COLOR_FIXER_REQ_PRODIGY, COLOR_FIXER_REQ_EGO_ROAD, FINGER_LADDERS, WING_LADDER_PROMOTIONS } from '../../src/engine/careerPipeline.js';
import { FINGER_RANKS } from '../../src/data/worldData.js';

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const source = read('../../../PM_BE/Config/career_gates.json');
const copy = read('../../src/data/careerGates.json');
const cs = read('../../../PM_BE/Services/DirectorEngineService.cs');
const csproj = read('../../../PM_BE/ProjectMoon.Api.csproj');
const colorGateCs = read('../../../PM_BE/Services/ColorTrialGate.cs');
const gates = JSON.parse(source);
const problems = [];
// A gitignored source never reaches the Docker build, so the backend would fail to embed it
const ignored = spawnSync('git', ['check-ignore', '-q', 'PM_BE/Config/career_gates.json'], { cwd: new URL('../../../', import.meta.url) });
if (ignored.status === 0) problems.push('PM_BE/Config/career_gates.json is gitignored');

if (source.replace(/\r\n/g, '\n') !== copy.replace(/\r\n/g, '\n')) problems.push('src/data/careerGates.json differs from PM_BE/Config/career_gates.json (run node tools/sync_career_gates.mjs)');
if (!/EmbeddedResource Include="Config\/career_gates\.json"/.test(csproj)) problems.push('The backend project does not embed Config/career_gates.json');

for (const row of gates.fixer) {
  const step = FIXER_LADDER.find((s) => s.grade === row.grade);
  if (!step || step.meritReq !== row.merit || step.repReq !== row.rep) problems.push(`Fixer Grade ${row.grade} in the engine does not follow the gates file`);
}
if (FIXER_LADDER.length !== gates.fixer.length) problems.push('FIXER_LADDER and the gates file list a different number of grades');
if (COLOR_FIXER_REQ.merit !== gates.color.merit || COLOR_FIXER_REQ.rep !== gates.color.rep) problems.push('COLOR_FIXER_REQ does not follow the gates file');
for (const [name, req, row] of [['ego', COLOR_FIXER_REQ_EGO, gates.color.ego], ['prodigy', COLOR_FIXER_REQ_PRODIGY, gates.color.prodigy], ['egoRoad', COLOR_FIXER_REQ_EGO_ROAD, gates.color.egoRoad]]) {
  if (req.merit !== row.merit || req.rep !== row.rep || req.age !== row.age) problems.push(`The ${name} Color requirement in the engine does not follow the gates file`);
}
// The backend decides when the Color trial is convened from the same file; a literal there would drift from the client
if (!/CareerGates\.Color/.test(colorGateCs)) problems.push('ColorTrialGate.cs does not read CareerGates.Color');
if (/(>=|<=|<|>|==)\s*\d{2,}/.test(colorGateCs)) problems.push('ColorTrialGate.cs compares against a literal number; use career_gates.json');
if (!/ColorTrialGate\.Ready\(/.test(cs)) problems.push('DirectorEngineService.cs does not use ColorTrialGate.Ready for the Color trial');
if (/FixerGrade == 1 && c\.Merit >= ColorMerit/.test(cs)) problems.push('DirectorEngineService.cs gates the Color trial on Grade 1 and the standard numbers only');

for (const [finger, names] of Object.entries(FINGER_RANKS)) {
  if ((gates.fingerRanks[finger] || []).join('|') !== names.join('|')) problems.push(`${finger} rank names differ from the gates file`);
}
for (const [finger, ladder] of Object.entries(FINGER_LADDERS)) {
  for (const step of ladder) {
    const row = gates.finger.find((g) => g.rank === step.rank);
    if (!row || step.meritReq !== row.merit || step.repReq !== row.rep || (step.networkReq || 0) !== row.network)
      problems.push(`${finger} rank ${step.rank} differs from the gates file`);
  }
}
for (const step of WING_LADDER_PROMOTIONS) {
  const row = gates.wing.find((g) => g.rank === step.rank);
  if (!row || step.meritReq !== row.merit || step.wealthReq !== row.wealth || step.networkReq !== row.network)
    problems.push(`Wing rank ${step.rank} differs from the gates file`);
}

// The backend must read the file, not repeat its numbers
const gateLines = cs.split('\n').filter((line) => /(?:FingerRank|WingRank) == \d/.test(line) && />= \d/.test(line));
if (gateLines.length) problems.push(`The backend repeats promotion numbers: ${gateLines.map((l) => l.trim().slice(0, 70)).join(' | ')}`);

if (/new\(\d, \d+, \d+, "Fixer Grade/.test(cs)) problems.push('The backend still lists the Fixer ladder by hand');
if (/WorkshopRankDef|WorkshopRanks|ws_promo_journeyman_r1|ws_promo_master_r2|workshop_legendary_forge_trial/.test(cs)) problems.push('Backend still schedules retired Workshop ranks');

if (problems.length) {
  console.log('PROMOTION GATES OUT OF SYNC');
  problems.forEach((p) => console.log('  - ' + p));
  process.exitCode = 1;
} else {
  console.log('Frontend and backend read the same promotion gates (career_gates.json).');
}
