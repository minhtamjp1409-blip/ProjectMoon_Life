import assert from 'node:assert/strict';
import {
  createNewCharacter,
  resolveEventChoice,
  getNextCareerMilestone,
  generateFixerContract,
  ALL_STORY_EVENTS
} from '../src/engine/gameEngine.js';
import { contractRouteOf, equivalentGrade, CONTRACT_ROUTES } from '../src/data/careerContracts.js';
import { CAREER_REQUESTS } from '../src/data/careerContractTemplates.js';
import { endYear, planYear } from '../src/engine/yearPlanner.js';

console.log('=== TEST SUITE: INDEPENDENT SYNDICATE PROGRESSION & CONTRACTS ===');

// 1. Contract Route & Equivalent Grade
console.log('1. Testing Independent Syndicate contract route and grade equivalence...');
{
  const indie = createNewCharacter({ seed: 'indie-route-test', startAge: 20 });
  indie.job = 'Syndicate';
  indie.finger = null;
  indie.syndicateRank = 0;

  assert.equal(contractRouteOf(indie), 'independent_syndicate', 'Syndicate without finger must use independent_syndicate route');
  assert.equal(equivalentGrade(indie, 'independent_syndicate'), 7, 'Rank 0 corresponds to Grade 7 equivalent');

  indie.syndicateRank = 1;
  assert.equal(equivalentGrade(indie, 'independent_syndicate'), 5, 'Rank 1 corresponds to Grade 5 equivalent');

  indie.syndicateRank = 2;
  assert.equal(equivalentGrade(indie, 'independent_syndicate'), 3, 'Rank 2 corresponds to Grade 3 equivalent');

  indie.syndicateRank = 3;
  assert.equal(equivalentGrade(indie, 'independent_syndicate'), 1, 'Rank 3 corresponds to Grade 1 equivalent');

  // Verify Finger syndicate route is undisturbed
  const thumbChar = createNewCharacter({ seed: 'thumb-test', startAge: 20 });
  thumbChar.job = 'Syndicate';
  thumbChar.finger = 'Thumb';
  thumbChar.fingerRank = 2;
  assert.equal(contractRouteOf(thumbChar), 'thumb');
  console.log('  ✓ Contract route and equivalent grade formula accurately scale across all ranks.');
}

// 2. Contract Generation & Template Pool
console.log('2. Testing Independent Syndicate contract generation & tier access...');
{
  assert.ok(CAREER_REQUESTS.independent_syndicate, 'CAREER_REQUESTS must contain independent_syndicate pool');
  assert.ok(CAREER_REQUESTS.independent_syndicate.length >= 12, 'Must have at least 12 independent syndicate contracts');

  const indie = createNewCharacter({ seed: 'indie-gen-test', startAge: 22 });
  indie.job = 'Syndicate';
  indie.finger = null;
  indie.syndicateRank = 0;

  const contract = generateFixerContract(indie, () => 0.5);
  assert.ok(contract, 'Contract generated successfully');
  assert.equal(contract.route, 'independent_syndicate');
  assert.equal(contract.kickerVi, 'Mối làm ăn ngầm');
  assert.equal(CONTRACT_ROUTES[contract.route].tagVi, 'Hợp đồng băng nhóm');
  assert.ok(contract.template.tier <= 2, 'Rank 0 can only access tiers 0 to 2');

  // Kingpin (Rank 3) accesses Tier 5
  indie.syndicateRank = 3;
  let sawHighTier = false;
  for (let i = 0; i < 30; i++) {
    const c = generateFixerContract(indie, () => (i / 30));
    if (c.template.tier >= 4) sawHighTier = true;
  }
  assert.ok(sawHighTier, 'Rank 3 kingpin must be offered high tier contracts');
  console.log('  ✓ Independent syndicate contracts generate flawlessly from dedicated template pool.');
}

// 3. Milestone UI & Dynamic Station Titles
console.log('3. Testing Independent Syndicate milestone targets across ranks 0-3...');
{
  const char = createNewCharacter({ seed: 'indie-milestone-test', startAge: 20 });
  char.job = 'Syndicate';
  char.flags.push('IndependentSyndicate');
  char.finger = null;
  char.syndicateRank = 0;
  char.merit = 10;
  char.stats.rep = 10;
  char.heat = 10;

  // Rank 0: Street Enforcer -> Station: Turf Lieutenant
  const ms0 = getNextCareerMilestone(char);
  assert.equal(ms0.category, 'INDEPENDENT SYNDICATE');
  assert.ok(ms0.titleVi.includes('Đầu gấu khu phố'));
  assert.ok(ms0.progressPct < 100);

  // Rank 1: Turf Lieutenant -> Station: Independent Syndicate Boss
  char.syndicateRank = 1;
  const ms1 = getNextCareerMilestone(char);
  assert.ok(ms1.titleVi.includes('Đại ca băng đảng tự do'));

  // Rank 2: Independent Syndicate Boss -> Station: Underground Kingpin
  char.syndicateRank = 2;
  const ms2 = getNextCareerMilestone(char);
  assert.ok(ms2.titleVi.includes('Bá chủ ngõ tối'));

  // Rank 3: Underground Kingpin -> Hegemony (100%)
  char.syndicateRank = 3;
  const ms3 = getNextCareerMilestone(char);
  assert.equal(ms3.category, 'INDEPENDENT SYNDICATE HEGEMONY');
  assert.equal(ms3.progressPct, 100);
  console.log('  ✓ Dossier milestone dynamically reflects rank 0-3 station titles and 100% apex status.');
}

// 4. Rank Progression Events Execution
console.log('4. Testing rank promotion events execution (ranks 0 -> 1 -> 2 -> 3)...');
{
  const char = createNewCharacter({ seed: 'promo-run', startAge: 21 });
  char.job = 'Syndicate';
  char.finger = null;
  char.syndicateRank = 0;
  char.merit = 25;
  char.stats.rep = 25;
  char.heat = 20;

  // Promotion 0 -> 1
  const ev1 = ALL_STORY_EVENTS.find((e) => e.id === 'syn_indie_promo_rank1');
  assert.ok(ev1);
  char.pendingEvent = ev1;
  const after1 = resolveEventChoice(char, 0, () => 0.5);
  assert.equal(after1.syndicateRank, 1, 'syndicateRank must become 1');
  assert.ok(after1.flags.includes('TurfLieutenant'));

  // Promotion 1 -> 2
  after1.merit = 55;
  after1.stats.rep = 50;
  after1.heat = 35;
  const ev2 = ALL_STORY_EVENTS.find((e) => e.id === 'syn_indie_promo_rank2');
  assert.ok(ev2);
  after1.pendingEvent = ev2;
  const after2 = resolveEventChoice(after1, 0, () => 0.5);
  assert.equal(after2.syndicateRank, 2, 'syndicateRank must become 2');
  assert.ok(after2.flags.includes('IndependentSyndicateBoss'));

  // Promotion 2 -> 3
  after2.merit = 95;
  after2.stats.rep = 80;
  after2.heat = 55;
  const ev3 = ALL_STORY_EVENTS.find((e) => e.id === 'syn_indie_promo_rank3');
  assert.ok(ev3);
  after2.pendingEvent = ev3;
  const after3 = resolveEventChoice(after2, 0, () => 0.5);
  assert.equal(after3.syndicateRank, 3, 'syndicateRank must become 3');
  assert.ok(after3.flags.includes('UndergroundKingpin'));
  assert.ok(after3.flags.includes('IndependentSyndicateApex'));
  assert.ok(after3.unlockedRecords.includes('independent_syndicate_apex'));
  console.log('  ✓ Rank progression events properly advance syndicateRank to 3 and grant apex records.');
}

// 5. YearPlanner Scheduling & Finger Rejection Permanence
console.log('5. Testing YearPlanner scheduling and non-forced Finger summons...');
{
  const char = createNewCharacter({ seed: 'planner-indie', startAge: 22 });
  char.job = 'Syndicate';
  char.finger = null;
  char.syndicateRank = 0;
  char.merit = 25;
  char.stats.rep = 25;
  char.heat = 20;

  // When rank 0 meets requirements for rank 1, syn_indie_promo_rank1 is planned
  const y = endYear(char, () => 0.5);
  const promoItem = y.plan.find((p) => p.forcedEventId === 'syn_indie_promo_rank1');
  assert.ok(promoItem, 'syn_indie_promo_rank1 must be planned when eligible');

  // When IndependentSyndicate flag is set, syn_choose_finger_allegiance NEVER appears
  const rebel = createNewCharacter({ seed: 'rebel-indie', startAge: 25 });
  rebel.job = 'Syndicate';
  rebel.flags.push('IndependentSyndicate');
  rebel.finger = null;
  rebel.merit = 40;
  rebel.stats.rep = 40;
  rebel.heat = 40;

  const plan = planYear(rebel, () => 0.5).plan;
  assert.equal(plan.some((p) => p.forcedEventId === 'syn_choose_finger_allegiance'), false, 'Finger summons must never be scheduled for confirmed independent syndicate');
  console.log('  ✓ Independent syndicate promotions correctly scheduled; Finger summons never recurs.');
}

console.log('\n=== ALL INDEPENDENT SYNDICATE TESTS PASSED WITH 100% SUCCESS ===');
