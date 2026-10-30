/**
 * Color trial parity: does the backend convene the Hana Color trial for the same characters the client does?
 * Sends N seeded Fixer snapshots to a running backend's /director/plan-year and compares the answer with
 * checkColorFixerReadiness from the client. Not part of npm test because it needs a backend.
 * Usage: node tools/sim/color_gate_parity.mjs [base=http://localhost:5099/api] [vectors=600]
 *   Local backend: dotnet run --project ../PM_BE --urls http://localhost:5099
 * Only the trial is compared. Everything else a plan holds is random, so the probe keeps other forced majors out of the way
 * (no Taboo, the crossroad and Carmen already seen).
 */
import { checkColorFixerReadiness } from '../../src/engine/careerPipeline.js';
import { createRNG } from '../../src/engine/gameEngine.js';

const BASE = (process.argv[2] || 'http://localhost:5099/api').replace(/\/$/, '');
const VECTORS = Number(process.argv[3]) || 600;
const TRIAL = 'hana_color_ascension_trial';
const FEATS = ['ProdigyFixer', 'KeptDungeonTrophy', 'StarConqueror', 'SoloStarConqueror', 'TabooHunter'];
const CROSSROADS = ['ad_career_crossroad_18', 'ad_nest_crossroad_18', 'ad_outskirts_crossroad_18'];

const rng = createRNG('color-gate-parity');
const pick = (list) => list[Math.floor(rng() * list.length)];
const between = (lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));

function vector() {
  const flags = [];
  if (rng() < 0.55) flags.push('EGOAwakened');
  if (rng() < 0.06) flags.push('Distorted');
  if (rng() < 0.04) flags.push('ColorFixer');
  if (rng() < 0.25) flags.push(pick(FEATS));
  return {
    age: between(22, 50),
    fixerGrade: pick([1, 1, 2, 2, 3, 3, 4, 5]),
    merit: pick([80, 85, 90, 119, 120, 125, 129, 130, 150, 214, 215, 216, 259, 260, 270]) + between(-2, 2),
    rep: pick([68, 69, 70, 71, 72, 73, 74, 75, 76, 84, 85, 86, 89, 90, 91]),
    resonance: pick([0, 30, 49, 50, 54, 55, 56, 70]),
    hasRelic: rng() < 0.25,
    flags
  };
}

const clientChar = (v) => ({
  job: 'Fixer', age: v.age, fixerGrade: v.fixerGrade, merit: v.merit, resonance: v.resonance,
  stats: { rep: v.rep }, flags: v.flags, inventory: v.hasRelic ? [{ id: 'rel_probe' }] : []
});

async function serverConvenes(v, index) {
  const char = {
    age: v.age, job: 'Fixer', regionId: 'K', health: 80, sanity: 80, wealth: 40, network: 40,
    rep: v.rep, merit: v.merit, heat: 0, taboo: 0, resonance: v.resonance, fixerGrade: v.fixerGrade,
    finger: null, fingerRank: 0, wingRank: 0, workshopRank: 0, syndicateRank: 0, hasRelic: v.hasRelic,
    flags: v.flags, seenEvents: [...CROSSROADS, 'ego_carmen_crossroad'], recent: [], fateOmenId: '', yearsSinceLastMajor: 0,
    activeNpcsCount: 2, pendingThreads: [], annualTrain: 0, annualWork: 0, annualBond: 0, annualRest: 0, annualScheme: 0, ambition: ''
  };
  const res = await fetch(`${BASE}/director/plan-year`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ seed: `parity:${index}`, char })
  });
  if (!res.ok) throw new Error(`plan-year answered ${res.status}`);
  const plan = await res.json();
  return (plan.moments || []).some((m) => m.kind === 'major' && (m.forcedEventId || m.id) === TRIAL);
}

const mismatches = [];
let both = 0, neither = 0;
const byTrack = {};
for (let i = 0; i < VECTORS; i++) {
  const v = vector();
  const client = Boolean(checkColorFixerReadiness(clientChar(v)).ready);
  const server = await serverConvenes(v, i);
  if (client === server) { client ? both++ : neither++; } else mismatches.push({ v, client, server });
  const track = client ? 'client says ready' : 'client says not ready';
  byTrack[track] = (byTrack[track] || 0) + 1;
}

console.log(`Vectors ${VECTORS}: agree ready ${both}, agree not ready ${neither}, disagree ${mismatches.length}`);
for (const m of mismatches.slice(0, 8)) console.log('  disagree', JSON.stringify(m));
if (both < 20) console.log('Warning: few ready cases, the probe proves little.');
process.exit(mismatches.length ? 1 : 0);
