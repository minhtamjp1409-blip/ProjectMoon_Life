/**
 * The backend mirrors a few tables from the frontend engine (Fixer ladder, Color gate, Finger rank names).
 * This fails when the two disagree, so the milestone a player sees can never differ from the gate that opens the exam.
 * Usage: node check_be_parity.mjs
 */
import fs from 'fs';
import { FIXER_LADDER, COLOR_FIXER_REQ } from './src/engine/careerPipeline.js';
import { FINGER_RANKS } from './src/data/worldData.js';

const cs = fs.readFileSync('../PM_BE/Services/DirectorEngineService.cs', 'utf8');
const problems = [];

const be = [...cs.matchAll(/new\((\d), (\d+), (\d+), "Fixer Grade/g)].map((m) => ({ grade: +m[1], merit: +m[2], rep: +m[3] }));
for (const step of FIXER_LADDER) {
  const row = be.find((b) => b.grade === step.grade);
  if (!row) problems.push(`Grade ${step.grade} missing in the backend`);
  else if (row.merit !== step.meritReq || row.rep !== step.repReq) problems.push(`Grade ${step.grade}: frontend ${step.meritReq}/${step.repReq}, backend ${row.merit}/${row.rep}`);
}
const colorMerit = Number(/ColorMerit = (\d+);/.exec(cs)?.[1]);
const colorRep = Number(/ColorRep = (\d+);/.exec(cs)?.[1]);
if (colorMerit !== COLOR_FIXER_REQ.merit || colorRep !== COLOR_FIXER_REQ.rep) problems.push(`Color: frontend ${COLOR_FIXER_REQ.merit}/${COLOR_FIXER_REQ.rep}, backend ${colorMerit}/${colorRep}`);

for (const [finger, names] of Object.entries(FINGER_RANKS)) {
  const line = new RegExp(String.raw`\["${finger}"\] = \[([^\]]*)\]`).exec(cs)?.[1];
  const beNames = line ? [...line.matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];
  if (beNames.join('|') !== names.join('|')) problems.push(`${finger} ranks: frontend [${names.join(', ')}], backend [${beNames.join(', ')}]`);
}

if (problems.length) {
  console.log('FRONTEND / BACKEND MISMATCH');
  problems.forEach((p) => console.log('  - ' + p));
  process.exitCode = 1;
} else {
  console.log('Frontend and backend agree on the Fixer ladder, the Color gate and the Finger ranks.');
}
