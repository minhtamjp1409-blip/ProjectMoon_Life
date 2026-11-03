import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { LIFE_MINORS } from '../src/engine/yearPlanner.js';
import { hasMinorExtraDetails } from '../src/features/chronicle/choicePreviewModel.js';
import {
  getNextFixerPromotion,
  checkColorFixerReadiness,
  getNextFingerPromotion,
  getNextWingPromotion,
  getPromotionProgress
} from '../src/engine/careerPipeline.js';
import { getNextIndependentSyndicatePromotion } from '../src/engine/eventConditions.js';
import { canSkimSpeed, useGameStore } from '../src/store/gameStore.js';

console.log('--- TEST BATCH 122a: Lasting Consequences in Choices ---');

// Gather all choices from all major and minor pools
const allChoices = [];
for (const ev of ALL_STORY_EVENTS) {
  if (Array.isArray(ev.choices)) {
    for (const c of ev.choices) {
      allChoices.push({ eventId: ev.id, choice: c, kind: 'major' });
    }
  }
}
for (const m of LIFE_MINORS) {
  if (Array.isArray(m.choices)) {
    for (const c of m.choices) {
      allChoices.push({ eventId: m.id, choice: c, kind: 'minor' });
    }
  }
}

const choicesWithLasting = allChoices.filter((item) => Boolean(item.choice.lasting));
console.log(`Found ${choicesWithLasting.length} choices with lasting consequences.`);
assert(
  choicesWithLasting.length >= 15,
  `Expected at least 15 choices with lasting text, found ${choicesWithLasting.length}`
);

for (const item of choicesWithLasting) {
  const { eventId, choice } = item;
  assert(
    typeof choice.lasting.vi === 'string' && choice.lasting.vi.trim().length > 0,
    `Choice in event ${eventId} has invalid lasting.vi`
  );
  assert(
    typeof choice.lasting.en === 'string' && choice.lasting.en.trim().length > 0,
    `Choice in event ${eventId} has invalid lasting.en`
  );
}

// Verify hasMinorExtraDetails returns true for minor with lasting
const minorWithLasting = choicesWithLasting.find((c) => c.kind === 'minor');
assert(minorWithLasting, 'Must have at least one minor choice with lasting');
assert(
  hasMinorExtraDetails(minorWithLasting.choice),
  'hasMinorExtraDetails must return true for minor choices with lasting property'
);
console.log('PASS: 122a lasting consequences verification passed.');

console.log('--- TEST BATCH 122b: Career Promotion Progress Thresholds ---');

// Helper mock character
function makeMockChar(overrides = {}) {
  return {
    alive: true,
    name: 'Tester',
    age: 25,
    job: 'Fixer',
    fixerGrade: 9,
    merit: 6,
    stats: { rep: 5, health: 80, sanity: 80, wealth: 20, network: 10 },
    flags: [],
    logs: [],
    ...overrides
  };
}

// Test Fixer Grade 9 -> 8
{
  const char = makeMockChar({ job: 'Fixer', fixerGrade: 9, merit: 6, stats: { rep: 4 } });
  const step = getNextFixerPromotion(char);
  const progress = getPromotionProgress(char);
  assert(step, 'Fixer grade 9 should have next promotion step');
  assert(progress, 'Fixer grade 9 should have promotion progress');
  assert.equal(progress.route, 'fixer');
  assert.equal(progress.targetGrade, step.grade);
  assert.equal(progress.meritTarget, step.meritReq);
  assert.equal(progress.repTarget, step.repReq);
  assert.equal(progress.meritCurrent, 6);
  assert.equal(progress.repCurrent, 4);
  assert.equal(progress.isEligible, false);
}

// Test Fixer Grade 8 eligible
{
  const char = makeMockChar({ job: 'Fixer', fixerGrade: 9, merit: 12, stats: { rep: 10 } });
  const step = getNextFixerPromotion(char);
  const progress = getPromotionProgress(char);
  assert.equal(progress.isEligible, true);
  assert.equal(step.isEligible, true);
}

// Test Color Fixer candidacy for Grade 1
{
  const char = makeMockChar({
    job: 'Fixer',
    fixerGrade: 1,
    age: 32,
    merit: 265,
    stats: { rep: 95, health: 90, sanity: 90, wealth: 100, network: 80 }
  });
  const colorReady = checkColorFixerReadiness(char);
  const progress = getPromotionProgress(char);
  assert(progress, 'Grade 1 should have promotion progress to Color');
  assert.equal(progress.route, 'color');
  assert.equal(progress.meritTarget, colorReady.targetMerit);
  assert.equal(progress.repTarget, colorReady.targetRep);
  assert.equal(progress.isEligible, colorReady.ready);
}

// Test Finger Syndicate promotion thresholds
{
  const char = makeMockChar({
    job: 'Syndicate',
    finger: 'Thumb',
    fingerRank: 0,
    age: 24,
    merit: 20,
    stats: { rep: 12, network: 5 }
  });
  const step = getNextFingerPromotion(char);
  const progress = getPromotionProgress(char);
  assert(step, 'Thumb Soldato should have next promotion step');
  assert(progress, 'Thumb Soldato should have promotion progress');
  assert.equal(progress.route, 'finger');
  assert.equal(progress.finger, 'Thumb');
  assert.equal(progress.meritTarget, step.meritReq);
  assert.equal(progress.repTarget, step.repReq);
  assert.equal(progress.targetRank, step.rank);
}

// Test Wing Employee promotion thresholds
{
  const char = makeMockChar({
    job: 'Wing Employee',
    wingRank: 0,
    merit: 15,
    stats: { wealth: 10, network: 8 }
  });
  const step = getNextWingPromotion(char);
  const progress = getPromotionProgress(char);
  assert(step, 'Wing intern should have next promotion step');
  assert(progress, 'Wing intern should have promotion progress');
  assert.equal(progress.route, 'wing');
  assert.equal(progress.meritTarget, step.meritReq);
  assert.equal(progress.wealthTarget, step.wealthReq);
  assert.equal(progress.networkTarget, step.networkReq);
}

// Test Independent Syndicate promotion thresholds
{
  const char = makeMockChar({
    job: 'Syndicate',
    finger: null,
    syndicateRank: 0,
    flags: ['IndependentSyndicate'],
    merit: 10,
    heat: 8,
    stats: { rep: 10 }
  });
  const step = getNextIndependentSyndicatePromotion(char);
  const progress = getPromotionProgress(char);
  assert(step, 'Independent syndicate rank 0 should have next promotion step');
  assert(progress, 'Independent syndicate rank 0 should have promotion progress');
  assert.equal(progress.route, 'independent_syndicate');
  assert.equal(progress.meritTarget, step.meritReq);
  assert.equal(progress.repTarget, step.repReq);
  assert.equal(progress.heatTarget, step.heatReq);
}
console.log('PASS: 122b career promotion thresholds verification passed.');

console.log('--- TEST BATCH 123: Skim Speed Replays & Minor Timing ---');

// Test 1: canSkimSpeed availability
{
  // First life, autoplay off: NO skim speed
  const stateGen1 = {
    autoPlay: false,
    pastLives: [],
    char: { generation: 1, lineage: { generation: 1 } }
  };
  assert.equal(canSkimSpeed(stateGen1), false, 'First life with autoPlay=false must NOT allow skim speed');

  // Autoplay enabled: YES skim speed
  const stateAuto = {
    autoPlay: true,
    pastLives: [],
    char: { generation: 1, lineage: { generation: 1 } }
  };
  assert.equal(canSkimSpeed(stateAuto), true, 'AutoPlay=true must allow skim speed');

  // Generation 2 onwards: YES skim speed
  const stateGen2 = {
    autoPlay: false,
    pastLives: [{ seed: 'OLD', age: 40 }],
    char: { generation: 2, lineage: { generation: 2 } }
  };
  assert.equal(canSkimSpeed(stateGen2), true, 'Generation 2 with past lives must allow skim speed');
}

// Test 2: Speed revert on encountering major, minor, NPC naming or chapter
{
  useGameStore.setState({
    speed: 8,
    preSkimSpeed: 2,
    char: makeMockChar({ age: 10 }),
    inRun: true
  });

  // Encounter minor via tick or commit
  const cMinor = makeMockChar({
    age: 10,
    pendingMinor: { id: 'm_test', remainingMs: 30000 }
  });
  useGameStore.getState().commit(useGameStore.getState().char, cMinor);
  assert.equal(
    useGameStore.getState().speed,
    2,
    'Encountering a minor must revert speed 8 back to preSkimSpeed (2)'
  );

  // Set speed back to 8
  useGameStore.getState().setSpeed(8);
  assert.equal(useGameStore.getState().speed, 8);
  assert.equal(useGameStore.getState().preSkimSpeed, 2);

  // Encounter major event
  const cMajor = makeMockChar({
    age: 10,
    pendingEvent: { id: 'ev_test' }
  });
  useGameStore.getState().commit(useGameStore.getState().char, cMajor);
  assert.equal(
    useGameStore.getState().speed,
    2,
    'Encountering a major event must revert speed 8 back to preSkimSpeed (2)'
  );

  // Set speed back to 8
  useGameStore.getState().setSpeed(8);
  // Encounter NPC naming prompt
  const cNpc = makeMockChar({
    age: 10,
    npcs: {
      friend: { nameVi: 'Minh', needsNaming: true, namedPrompted: false, alive: true }
    },
    pendingNpcNaming: { role: 'friend', defaultNameVi: 'Minh' }
  });
  useGameStore.getState().commit(useGameStore.getState().char, cNpc);
  assert.equal(
    useGameStore.getState().speed,
    2,
    'Encountering an NPC naming prompt must revert speed 8 back to preSkimSpeed (2)'
  );

  // Set speed back to 8
  useGameStore.getState().setSpeed(8);
  // Encounter a chapter card (e.g. fixer grade promotion 8 -> 7)
  const cPrevGrade = makeMockChar({ age: 20, job: 'Fixer', fixerGrade: 8 });
  const cNextGrade = makeMockChar({ age: 20, job: 'Fixer', fixerGrade: 7 });
  useGameStore.getState().commit(cPrevGrade, cNextGrade);
  assert.equal(
    useGameStore.getState().speed,
    2,
    'Encountering a chapter card must revert speed 8 back to preSkimSpeed (2)'
  );
}

// Test 3: Minor countdown timer is untouched by speed
{
  const initialMs = 30000;
  const cMinor = makeMockChar({
    age: 10,
    pendingMinor: { id: 'm_test', remainingMs: initialMs }
  });
  useGameStore.setState({
    inRun: true,
    speed: 1,
    char: cMinor,
    minorRemainingMs: initialMs,
    autoPlay: false
  });

  // Tick 500ms
  useGameStore.getState().tick(500);
  assert.equal(
    useGameStore.getState().minorRemainingMs,
    29500,
    'minorRemainingMs must decrease by exactly elapsed dtMs (500ms)'
  );
}

console.log('PASS: 123 skim speed & minor timer verification passed.');
console.log('ALL BATCHES 122a, 122b, 123 TESTS PASSED 100%!');
