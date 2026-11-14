/**
 * Promotion gates (Fixer ladder, Color gate, Finger ranks, Wing ladder) live in one file: src/data/careerGates.json.
 * This fails when an engine table stops following that file.
 * Usage: node tools/lint/check_career_gates.mjs
 */
import fs from 'fs';
import { FIXER_LADDER, COLOR_FIXER_REQ, COLOR_FIXER_REQ_EGO, COLOR_FIXER_REQ_PRODIGY, COLOR_FIXER_REQ_EGO_ROAD, FINGER_LADDERS, WING_LADDER_PROMOTIONS } from '../../src/engine/careerPipeline.js';
import { FINGER_RANKS } from '../../src/data/worldData.js';

const gates = JSON.parse(fs.readFileSync(new URL('../../src/data/careerGates.json', import.meta.url), 'utf8'));
const problems = [];

for (const row of gates.fixer) {
  const step = FIXER_LADDER.find((s) => s.grade === row.grade);
  if (!step || step.meritReq !== row.merit || step.repReq !== row.rep) problems.push(`Fixer Grade ${row.grade} in the engine does not follow the gates file`);
}
if (FIXER_LADDER.length !== gates.fixer.length) problems.push('FIXER_LADDER and the gates file list a different number of grades');
if (COLOR_FIXER_REQ.merit !== gates.color.merit || COLOR_FIXER_REQ.rep !== gates.color.rep) problems.push('COLOR_FIXER_REQ does not follow the gates file');
for (const [name, req, row] of [['ego', COLOR_FIXER_REQ_EGO, gates.color.ego], ['prodigy', COLOR_FIXER_REQ_PRODIGY, gates.color.prodigy], ['egoRoad', COLOR_FIXER_REQ_EGO_ROAD, gates.color.egoRoad]]) {
  if (req.merit !== row.merit || req.rep !== row.rep || req.age !== row.age) problems.push(`The ${name} Color requirement in the engine does not follow the gates file`);
}

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

if (problems.length) {
  console.log('PROMOTION GATES OUT OF SYNC');
  problems.forEach((p) => console.log('  - ' + p));
  process.exitCode = 1;
} else {
  console.log('The engine follows the promotion gates in src/data/careerGates.json.');
}
