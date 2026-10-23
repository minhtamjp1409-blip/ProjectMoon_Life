/**
 * The backend mirrors a few tables from the frontend engine (Fixer ladder, Color gate, Finger rank names).
 * This fails when the two disagree, so the milestone a player sees can never differ from the gate that opens the exam.
 * Usage: node tools/lint/check_be_parity.mjs
 */
import fs from 'fs';
import { FIXER_LADDER, COLOR_FIXER_REQ, FINGER_LADDERS } from '../../src/engine/careerPipeline.js';
import { FINGER_RANKS } from '../../src/data/worldData.js';

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

const apex = FINGER_LADDERS.Thumb[2];
for (const [finger, ladder] of Object.entries(FINGER_LADDERS)) {
  if (ladder[2].meritReq !== apex.meritReq || ladder[2].repReq !== apex.repReq) problems.push(`${finger} apex gate differs from the shared backend gate`);
}
const backendApexMerit = Number(/reqMerit = nextRank == 3 \? (\d+)/.exec(cs)?.[1]);
const backendApexRep = Number(/reqRep = nextRank == 3 \? (\d+)/.exec(cs)?.[1]);
if (backendApexMerit !== apex.meritReq || backendApexRep !== apex.repReq) problems.push(`Finger apex: frontend ${apex.meritReq}/${apex.repReq}, backend ${backendApexMerit}/${backendApexRep}`);
if (!cs.includes(`c.FingerRank == 2 && c.Merit >= ${apex.meritReq} && c.Rep >= ${apex.repReq}`)) problems.push('Backend Finger apex plan gate differs from the milestone gate');
if (/WorkshopRankDef|WorkshopRanks|ws_promo_journeyman_r1|ws_promo_master_r2|workshop_legendary_forge_trial/.test(cs)) problems.push('Backend still schedules retired Workshop ranks');

if (problems.length) {
  console.log('FRONTEND / BACKEND MISMATCH');
  problems.forEach((p) => console.log('  - ' + p));
  process.exitCode = 1;
} else {
  console.log('Frontend and backend agree on the Fixer ladder, the Color gate, the Finger ranks and the Finger apex gate.');
}
