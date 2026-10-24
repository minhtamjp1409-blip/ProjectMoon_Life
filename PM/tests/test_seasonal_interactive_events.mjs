import assert from 'node:assert/strict';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { countsTowardAnnualInteractiveQuota, LIFE_MINORS, planYear, syncPlanWithBackend } from '../src/engine/yearPlanner.js';

function makeAdult(seed) {
  const char = createNewCharacter({
    seed,
    customName: 'Seasonal Test',
    preferredRegionId: 'A',
    preferredFamilyId: 'nest_feather'
  });
  Object.assign(char, {
    alive: true,
    age: 30,
    job: 'Fixer',
    fixerGrade: 9,
    merit: 0,
    heat: 0,
    taboo: 0,
    resonance: 5,
    seenEvents: [],
    recent: [],
    seenCount: {},
    weaver: {
      ...char.weaver,
      pendingThreads: [],
      yearsSinceLastMajor: 0,
      yearsSinceLastCrisis: 0
    }
  });
  char.stats = { health: 80, sanity: 80, wealth: 40, network: 20, rep: 5 };
  return char;
}

function ordinaryInteractiveCount(plan, char) {
  return plan.filter((item) => countsTowardAnnualInteractiveQuota(item, char)).length;
}

function assertAnnualCounts(plan, char) {
  const count = ordinaryInteractiveCount(plan, char);
  assert.ok(count >= 1, `the year should contain at least one ordinary interactive event when eligible: ${JSON.stringify(plan.map(({ kind, id, forcedEventId, isProgressionTrial, annualMerit }) => ({ kind, id, forcedEventId, isProgressionTrial, annualMerit })))}`);
  assert.ok(count <= 2, 'the year should contain at most two ordinary interactive events');
}

for (let seed = 0; seed < 40; seed++) {
  const char = makeAdult(`seasonal-plan-${seed}`);
  planYear(char, createRNG(`seasonal-plan-${seed}`));
  assertAnnualCounts(char.plan, char);
  for (const item of char.plan.filter((entry) => entry.kind === 'minor')) {
    const event = LIFE_MINORS.find((entry) => entry.id === item.id);
    assert.ok(event, `planned minor ${item.id} should exist`);
    assert.ok(matchesEventContext(event, char), `planned minor ${item.id} should remain eligible`);
  }
}

for (const [job, route] of [['Fixer', 'fixer'], ['Syndicate', 'finger']]) {
  const char = makeAdult(`special-trial-${route}`);
  char.job = job;
  char.merit = 200;
  char.stats.rep = 100;
  if (job === 'Syndicate') {
    char.finger = 'Ring';
    char.fingerRank = 0;
  }
  planYear(char, createRNG(`special-trial-${route}`));
  const trial = char.plan.find((item) => item.isProgressionTrial);
  assert.ok(trial, `${route} promotion eligibility should schedule a progression trial`);
  assert.equal(countsTowardAnnualInteractiveQuota(trial, char), false, `${route} progression trials should not count toward the annual quota`);
  assertAnnualCounts(char.plan, char);
}

for (let seed = 0; seed < 20; seed++) {
  const char = makeAdult(`annual-child-${seed}`);
  char.age = 4;
  char.job = 'Child';
  planYear(char, createRNG(`annual-child-${seed}`));
  assertAnnualCounts(char.plan, char);
}

const relationshipChar = makeAdult('annual-relationship-exemption');
assert.equal(
  countsTowardAnnualInteractiveQuota({ kind: 'minor', id: 'mk_back_marbles' }, relationshipChar),
  false,
  'relationship choices that change a bond should be exempt from the annual quota'
);
assert.equal(
  countsTowardAnnualInteractiveQuota({ kind: 'minor', id: 'mk_back_stair_man' }, relationshipChar),
  true,
  'ordinary childhood choices should count toward the annual quota'
);
assert.equal(
  countsTowardAnnualInteractiveQuota({ kind: 'major', id: 'ego_carmen_crossroad' }, relationshipChar),
  false,
  'E.G.O events should be exempt from the annual quota'
);

const syncedChar = makeAdult('seasonal-backend-sync');
planYear(syncedChar, createRNG('seasonal-backend-sync'));
const originalFetch = globalThis.fetch;
globalThis.localStorage = { getItem: () => null, setItem: () => {} };
let backendCalled = false;
globalThis.fetch = async () => {
  backendCalled = true;
  return new Response(JSON.stringify({
    moments: [
      { t: 0.14, kind: 'major', season: 'Spring', seasonIdx: 0 },
      { t: 0.14, kind: 'daily', season: 'Spring', seasonIdx: 0 },
      { t: 0.38, kind: 'daily', season: 'Summer', seasonIdx: 1 },
      { t: 0.62, kind: 'daily', season: 'Autumn', seasonIdx: 2 },
      { t: 0.86, kind: 'daily', season: 'Winter', seasonIdx: 3 }
    ],
    dramaPhase: 'INCUBATION',
    tensionScore: 20
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

try {
  await syncPlanWithBackend(syncedChar, createRNG('seasonal-backend-sync'));
  assert.ok(backendCalled, 'the backend planning response should be applied');
  assertAnnualCounts(syncedChar.plan, syncedChar);
} finally {
  globalThis.fetch = originalFetch;
}

console.log('Annual interactive event counts and special-event exemptions passed for local and backend-synced plans.');
