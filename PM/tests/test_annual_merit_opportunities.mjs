import assert from 'node:assert/strict';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { FINGER_LADDERS, FIXER_LADDER, WING_LADDER_PROMOTIONS } from '../src/engine/careerPipeline.js';
import { LIFE_MINORS, planYear, resolveMinor, runPlanItem } from '../src/engine/yearPlanner.js';

const meritMinor = (id) => LIFE_MINORS.some((event) => event.id === id &&
  event.choices?.some((choice) => (choice.fx?.merit || 0) > 0 ||
    (choice.out || []).some((outcome) => (outcome.fx?.merit || 0) > 0)));

const routes = [
  ['Fixer'], ['Wing Employee'], ['Workshop Craftsman'], ['Outcast'],
  ['Syndicate'],
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

// Distortion route: does not climb career merit; receives dedicated survival & resonance annual dilemmas with cooldown and no merit
let distortAnnualCount = 0;
for (let i = 0; i < 120; i++) {
  const char = worker('Distortion', null, `annual-distort-${i}`);
  planYear(char, createRNG(`annual-plan-distort-${i}`));
  const annual = char.plan.find((item) => item.annualMerit);
  if (!annual) continue;
  distortAnnualCount++;
  assert.equal(annual.kind, 'minor');
  assert(!meritMinor(annual.id), `Distortion annual ${annual.id} must not grant Merit`);
  runPlanItem(char, annual, () => 0.5);
  assert.equal(char.pendingMinor?.id, annual.id);
  const finished = resolveMinor(char, 0, () => 0.5);
  assert.equal(finished.merit, 0, 'Distortion annual dilemma must not increase Merit');
}
assert(distortAnnualCount > 0, 'Distortion should occasionally roll annual dilemma within cooldown');

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

assert.deepEqual(FIXER_LADDER.map((step) => step.meritReq), [10, 22, 38, 56, 78, 96, 135, 180]);
for (const ladder of Object.values(FINGER_LADDERS)) assert.deepEqual(ladder.map((step) => step.meritReq), [28, 68, 155]);
assert.deepEqual(WING_LADDER_PROMOTIONS.map((step) => step.meritReq), [25, 65, 125]);

console.log('Annual Merit: 1,440 seeded career years, protected choices and higher promotion gates passed.');
