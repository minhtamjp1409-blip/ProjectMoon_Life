import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter } from '../src/engine/gameEngine.js';
import { LIFE_MINORS } from '../src/engine/yearPlanner.js';
import { DUNGEON_GATE_EVENTS } from '../src/data/eventsDungeonGates.js';
import { DUNGEON_GATE_EVENTS_2 } from '../src/data/eventsDungeonGates2.js';
import { CAREER_REQUESTS } from '../src/data/careerContractTemplates.js';
import { FIXER_REQUESTS } from '../src/data/eventsSupernatural.js';
import { FINGER_STORY_EVENTS } from '../src/data/eventsFingers.js';
import { FINGER_PROMO_EXTRA } from '../src/data/eventsFingerDepth.js';
import { FINGER_LADDERS } from '../src/engine/careerPipeline.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { isEventEligible } from '../src/engine/weaverAI.js';

console.log('--- RUNNING FINGER ROUTE PARITY TESTS ---');

const FINGERS = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
const SHARE = 0.8; // a Finger route should hold at least this share of what a Fixer has, for every kind of content
const byId = new Map(ALL_STORY_EVENTS.map((e) => [e.id, e]));

const probe = (branch, stage, age = 36) => {
  const c = createNewCharacter({ seed: `parity-${branch}-${stage}-${age}`, startAge: age });
  c.regionId = 'K'; c.alive = true;
  c.flags = (c.flags || []).filter((f) => !['Distorted', 'EGOAwakened', 'ColorFixer'].includes(f));
  c.stats = { ...c.stats, health: 90, sanity: 80, wealth: 60, network: 60, rep: 80 };
  c.weaver = { ...(c.weaver || {}), pendingThreads: [] };
  if (branch === 'Fixer') { c.job = 'Fixer'; c.fixerGrade = stage; } else { c.job = 'Syndicate'; c.finger = branch; c.fingerRank = stage; c.flags.push(`Finger${branch}`); }
  return c;
};
const neutral = createNewCharacter({ seed: 'parity-neutral', startAge: 30 });
neutral.job = 'Freelancer'; neutral.alive = true;

console.log('1. Contracts: six a tier, and a band as deep as the Fixer’s...');
const bandOf = (pool, effGrade) => {
  const top = effGrade <= 1 ? 5 : effGrade <= 3 ? 4 : effGrade <= 5 ? 3 : effGrade <= 7 ? 2 : 1;
  return pool.filter((r) => r.tier <= top && r.tier >= Math.max(0, top - 2)).length;
};
for (const f of FINGERS) {
  const pool = CAREER_REQUESTS[f.toLowerCase()];
  const perTier = [0, 0, 0, 0, 0, 0];
  for (const c of pool) perTier[c.tier]++;
  assert(perTier.every((n) => n >= 6), `${f} has at least six contracts in every tier, got ${perTier}`);
  assert.equal(new Set(pool.map((c) => c.id)).size, pool.length, `${f} contract ids are unique`);
  for (const eff of [7, 5, 3, 1]) {
    const fixerBand = bandOf(FIXER_REQUESTS, eff);
    assert(bandOf(pool, eff) >= Math.floor(fixerBand * SHARE), `${f} band at grade ${eff} holds ${SHARE * 100}% of a Fixer’s (${bandOf(pool, eff)} against ${fixerBand})`);
  }
}

console.log('2. Promotion: three trials a rung, all of them real...');
for (const f of FINGERS) {
  for (const step of FINGER_LADDERS[f]) {
    const ids = step.eventIds || [step.eventId];
    assert(ids.length >= 3, `${f} rank ${step.rank} has three trials`);
    for (const id of ids) {
      const e = byId.get(id);
      assert(e, `${id} exists`);
      assert(e.choices.some((c) => c.setFingerRank === step.rank), `${id} can promote to rank ${step.rank}`);
      if (FINGER_PROMO_EXTRA.some((x) => x.id === id)) assert(e.choices.some((c) => c.setFingerRank == null), `${id} has a way to wait`);
    }
  }
}

console.log('3. Missions: no rank is thin...');
const missions = FINGER_STORY_EVENTS.filter((e) => e.mission);
for (const f of FINGERS) {
  for (const rank of [0, 1, 2, 3]) {
    const n = missions.filter((e) => e.finger === f && isEventEligible(e, probe(f, rank))).length;
    assert(n >= 9, `${f} rank ${rank} can be handed at least nine missions, got ${n}`);
  }
}

console.log('4. Major events, minors and dungeon gates reach 80% of a Fixer’s...');
const reach = (branch) => {
  const stages = branch === 'Fixer' ? [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3];
  const seen = { major: new Set(), minor: new Set(), gate: new Set() };
  const pools = { major: ALL_STORY_EVENTS, minor: LIFE_MINORS, gate: [...DUNGEON_GATE_EVENTS, ...DUNGEON_GATE_EVENTS_2] };
  for (const stage of stages) for (const age of [20, 28, 36, 46, 58, 72]) {
    const c = probe(branch, stage, age);
    if (branch === 'Fixer' && stage === 0) c.flags.push('ColorFixer');
    for (const [kind, list] of Object.entries(pools)) for (const e of list) if (matchesEventContext(e, c)) seen[kind].add(e.id);
  }
  const own = {};
  for (const [kind, ids] of Object.entries(seen)) {
    const list = pools[kind];
    own[kind] = [...ids].filter((id) => { const e = list.find((x) => x.id === id); return !matchesEventContext(e, neutral); }).length;
  }
  return own;
};
const fixer = reach('Fixer');
for (const f of FINGERS) {
  const mine = reach(f);
  for (const kind of ['major', 'minor', 'gate']) {
    assert(mine[kind] >= Math.floor(fixer[kind] * SHARE), `${f} ${kind}s: ${mine[kind]} against a Fixer’s ${fixer[kind]}`);
  }
  console.log(`   ${f}: majors ${mine.major}/${fixer.major}, minors ${mine.minor}/${fixer.minor}, gates ${mine.gate}/${fixer.gate}`);
}

console.log('Finger parity: six contracts a tier, three trials a rung, nine missions at every rank, majors, minors and gates at 80% or more of a Fixer’s.');
