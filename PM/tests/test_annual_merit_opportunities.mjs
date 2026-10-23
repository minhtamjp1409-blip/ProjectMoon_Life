import assert from 'node:assert/strict';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { FINGER_LADDERS, FIXER_LADDER, WING_LADDER_PROMOTIONS } from '../src/engine/careerPipeline.js';
import { LIFE_MINORS, planYear, resolveMinor, runPlanItem, syncPlanWithBackend } from '../src/engine/yearPlanner.js';
import { cityArchiveAPI } from '../src/services/api/cityArchiveAPI.js';

const meritMinor = (id) => LIFE_MINORS.some((event) => event.id === id &&
  event.choices?.some((choice) => (choice.fx?.merit || 0) > 0 ||
    (choice.out || []).some((outcome) => (outcome.fx?.merit || 0) > 0)));

const routes = [
  ['Fixer'], ['Wing Employee'], ['Workshop Craftsman'], ['Outcast'], ['Distortion'],
  ['Syndicate'], ['Distortion', 'Ring'],
  ...['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'].map((finger) => ['Syndicate', finger])
];

function worker(job, finger, seed) {
  const char = createNewCharacter({ seed, startAge: 35 });
  char.job = job;
  char.finger = finger || null;
  char.fingerRank = finger ? 2 : 0;
  char.merit = 0;
  char.stats.health = 100;
  char.stats.sanity = 100;
  char.weaver.pendingThreads = [];
  if (job === 'Distortion' && !char.flags.includes('Distorted')) char.flags.push('Distorted');
  return char;
}

for (const [job, finger] of routes) {
  let annualCount = 0;
  for (let i = 0; i < 120; i++) {
    const char = worker(job, finger, `annual-${job}-${finger || 'none'}-${i}`);
    planYear(char, createRNG(`annual-plan-${job}-${finger || 'none'}-${i}`));
    const opportunities = char.plan.filter((item) =>
      item.kind === 'contract' || (item.kind === 'minor' && meritMinor(item.id)));
    assert(opportunities.length >= 1, `${job}/${finger || 'none'} seed ${i} has no Merit opportunity`);
    assert(char.plan.some((item) => item.annualMerit) || char.plan.some((item) => item.kind === 'contract'),
      `${job}/${finger || 'none'} seed ${i} has no protected Merit commission`);
    const annual = char.plan.find((item) => item.annualMerit);
    if (!annual) continue;
    annualCount++;
    assert.equal(annual.kind, 'minor');
    assert(meritMinor(annual.id));
    runPlanItem(char, annual, () => 0.5);
    assert.equal(char.pendingMinor?.id, annual.id);
    assert.equal(char.pendingMinor.annualMerit, true);
    const finished = resolveMinor(char, 0, () => 0.5);
    assert(finished.merit > char.merit, `${annual.id} safe route did not grant Merit`);
  }
  assert(annualCount > 0, `${job}/${finger || 'none'} never needed the annual fallback`);
}

globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
const { useGameStore } = await import('../src/store/gameStore.js');
const waiting = worker('Outcast', null, 'annual-pause');
planYear(waiting, createRNG('annual-pause-plan'));
const waitingItem = waiting.plan.find((item) => item.annualMerit);
assert(waitingItem);
runPlanItem(waiting, waitingItem, () => 0.5);
useGameStore.setState({ char: waiting, inRun: true, speed: 1, autoPlay: false, minorRemainingMs: 15000, postChoicePauseMs: 0, activeResolution: null });
useGameStore.getState().tick(16000);
assert.equal(useGameStore.getState().char.pendingMinor?.id, waitingItem.id, 'manual commission waits for a choice');
assert.equal(useGameStore.getState().minorRemainingMs, 15000);

let backendWorker;
for (let i = 0; i < 120; i++) {
  const candidate = worker('Distortion', null, `annual-backend-${i}`);
  planYear(candidate, createRNG(`annual-backend-local-${i}`));
  if (candidate.plan.some((item) => item.annualMerit)) {
    backendWorker = candidate;
    break;
  }
}
assert(backendWorker);
const annualBefore = backendWorker.plan.find((item) => item.annualMerit);
assert(annualBefore);
const originalPlanYear = cityArchiveAPI.planYear;
try {
  cityArchiveAPI.planYear = async () => ({ moments: ['Spring', 'Summer', 'Autumn', 'Winter'].map((season, seasonIdx) => ({
    kind: 'daily', t: 0.1 + seasonIdx * 0.25, season, seasonIdx
  })) });
  await syncPlanWithBackend(backendWorker, createRNG('annual-backend-hydrate'));
  assert(backendWorker.plan.some((item) => item.id === annualBefore.id && item.annualMerit),
    'backend hydration must preserve the guaranteed Merit opportunity');

  let naturalWorker;
  for (let i = 0; i < 120; i++) {
    const candidate = worker('Wing Employee', null, `annual-natural-${i}`);
    planYear(candidate, createRNG(`annual-natural-plan-${i}`));
    if (candidate.plan.some((item) => item.annualMerit && !item.extra)) {
      naturalWorker = candidate;
      break;
    }
  }
  assert(naturalWorker);
  const naturalId = naturalWorker.plan.find((item) => item.annualMerit).id;
  cityArchiveAPI.planYear = async () => ({ moments: ['Spring', 'Summer', 'Autumn', 'Winter'].map((season, seasonIdx) => ({
    kind: 'major', t: 0.1 + seasonIdx * 0.25, season, seasonIdx
  })) });
  await syncPlanWithBackend(naturalWorker, createRNG('annual-natural-hydrate'));
  assert(naturalWorker.plan.some((item) => item.id === naturalId && item.annualMerit),
    'backend major moments must not displace a protected career commission');
} finally {
  cityArchiveAPI.planYear = originalPlanYear;
}

assert.deepEqual(FIXER_LADDER.map((step) => step.meritReq), [10, 22, 44, 66, 92, 124, 172, 230]);
for (const ladder of Object.values(FINGER_LADDERS)) assert.deepEqual(ladder.map((step) => step.meritReq), [28, 82, 185]);
assert.deepEqual(WING_LADDER_PROMOTIONS.map((step) => step.meritReq), [25, 78, 150]);

console.log('Annual Merit: 1,440 seeded career years, protected choices, backend preservation and higher promotion gates passed.');
