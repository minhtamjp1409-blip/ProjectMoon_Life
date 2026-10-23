/**
 * The backend mirrors a few tables from the frontend engine (Fixer ladder, Color gate, Finger rank names).
 * This fails when the two disagree, so the milestone a player sees can never differ from the gate that opens the exam.
 * Usage: node tools/lint/check_be_parity.mjs
 */
import fs from 'fs';
import { FIXER_LADDER, COLOR_FIXER_REQ, FINGER_LADDERS, WING_LADDER_PROMOTIONS } from '../../src/engine/careerPipeline.js';
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
  for (const step of ladder) {
    const shared = FINGER_LADDERS.Thumb[step.rank - 1];
    if (step.meritReq !== shared.meritReq || step.repReq !== shared.repReq || (step.networkReq || 0) !== (shared.networkReq || 0))
      problems.push(`${finger} rank ${step.rank} differs from the shared backend gate`);
  }
}
const backendApexMerit = Number(/reqMerit = nextRank == 3 \? (\d+)/.exec(cs)?.[1]);
const backendApexRep = Number(/reqRep = nextRank == 3 \? (\d+)/.exec(cs)?.[1]);
if (backendApexMerit !== apex.meritReq || backendApexRep !== apex.repReq) problems.push(`Finger apex: frontend ${apex.meritReq}/${apex.repReq}, backend ${backendApexMerit}/${backendApexRep}`);
const finger = FINGER_LADDERS.Thumb;
if (!cs.includes(`reqMerit = nextRank == 3 ? ${finger[2].meritReq} : nextRank == 2 ? ${finger[1].meritReq} : ${finger[0].meritReq}`))
  problems.push('Backend Finger Merit milestones differ from frontend');
if (!cs.includes(`reqRep = nextRank == 3 ? ${finger[2].repReq} : nextRank == 2 ? ${finger[1].repReq} : ${finger[0].repReq}`))
  problems.push('Backend Finger Reputation milestones differ from frontend');
if (!cs.includes('reqNet = 0;')) problems.push('Backend Finger Network milestone differs from frontend');
for (const step of finger) {
  if (!cs.includes(`c.FingerRank == ${step.rank - 1} && c.Merit >= ${step.meritReq} && c.Rep >= ${step.repReq}`))
    problems.push(`Backend Finger rank ${step.rank} plan gate differs from the milestone gate`);
}
const wingRows = [...cs.matchAll(/new\((\d), "[^"]+", "[^"]+", (\d+), (\d+), (\d+)\)/g)]
  .map((match) => ({ rank: +match[1], merit: +match[2], wealth: +match[3], network: +match[4] }));
for (const step of WING_LADDER_PROMOTIONS) {
  const row = wingRows.find((item) => item.rank === step.rank);
  if (!row || row.merit !== step.meritReq || row.wealth !== step.wealthReq || row.network !== step.networkReq)
    problems.push(`Wing rank ${step.rank} milestone differs from frontend`);
  if (!cs.includes(`c.WingRank == ${step.rank - 1} && c.Merit >= ${step.meritReq} && c.Wealth >= ${step.wealthReq} && c.Network >= ${step.networkReq}`))
    problems.push(`Wing rank ${step.rank} plan gate differs from the milestone gate`);
}
if (/WorkshopRankDef|WorkshopRanks|ws_promo_journeyman_r1|ws_promo_master_r2|workshop_legendary_forge_trial/.test(cs)) problems.push('Backend still schedules retired Workshop ranks');

if (problems.length) {
  console.log('FRONTEND / BACKEND MISMATCH');
  problems.forEach((p) => console.log('  - ' + p));
  process.exitCode = 1;
} else {
  console.log('Frontend and backend agree on Fixer, Finger and Wing promotion gates.');
}
