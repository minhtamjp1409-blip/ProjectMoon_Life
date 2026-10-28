import assert from 'node:assert/strict';
import {
  createNewCharacter,
  resolveEventChoice,
  getNextCareerMilestone,
  generateFixerContract,
  isIndependentSyndicateEligibleForRank,
  ALL_STORY_EVENTS
} from '../src/engine/gameEngine.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { CODEX_RECORDS } from '../src/data/worldData.js';
import { contractRouteOf, equivalentGrade, CONTRACT_ROUTES } from '../src/data/careerContracts.js';
import { CAREER_REQUESTS } from '../src/data/careerContractTemplates.js';
import { endYear, planYear, syncPlanWithBackend } from '../src/engine/yearPlanner.js';
import { cityArchiveAPI } from '../src/services/api/cityArchiveAPI.js';

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
  char.flags.push('IndependentSyndicate');
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

// 6. Audit P0: Syndicate promotion gating helper (isIndependentSyndicateEligibleForRank)
console.log('6. Testing P0: isIndependentSyndicateEligibleForRank across all ranks and conditions...');
{
  const char = createNewCharacter({ seed: 'indie-gating-test', startAge: 20 });
  char.job = 'Syndicate';
  char.finger = null;
  char.flags = [];
  char.syndicateRank = 0;
  char.merit = 25;
  char.stats.rep = 25;
  char.heat = 20;

  // Fails without IndependentSyndicate flag
  assert.equal(isIndependentSyndicateEligibleForRank(char, 1), false, 'Must fail without IndependentSyndicate flag');

  char.flags.push('IndependentSyndicate');
  // Fails if with Finger
  char.finger = 'Thumb';
  assert.equal(isIndependentSyndicateEligibleForRank(char, 1), false, 'Must fail if character has Finger');
  char.finger = null;

  // Fails if wrong rank (trying for rank 2 while at rank 0)
  assert.equal(isIndependentSyndicateEligibleForRank(char, 2), false, 'Rank 0 cannot jump to Rank 2');

  // Test Rank 1 threshold gates: merit 20, rep 20, heat 15
  char.merit = 19;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 1), false, 'Must fail when merit < 20');
  char.merit = 20;
  char.stats.rep = 19;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 1), false, 'Must fail when rep < 20');
  char.stats.rep = 20;
  char.heat = 14;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 1), false, 'Must fail when heat < 15');
  char.heat = 15;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 1), true, 'Passes when merit 20, rep 20, heat 15 met');

  // Test Rank 2 threshold gates: rank 1, merit 50, rep 45, heat 30
  char.syndicateRank = 1;
  char.merit = 49;
  char.stats.rep = 50;
  char.heat = 35;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 2), false, 'Must fail when merit < 50');
  char.merit = 50;
  char.stats.rep = 44;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 2), false, 'Must fail when rep < 45');
  char.stats.rep = 45;
  char.heat = 29;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 2), false, 'Must fail when heat < 30');
  char.heat = 30;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 2), true, 'Passes when rank 1, merit 50, rep 45, heat 30 met');

  // Test Rank 3 threshold gates: rank 2, merit 90, rep 75, heat 50
  char.syndicateRank = 2;
  char.merit = 89;
  char.stats.rep = 80;
  char.heat = 55;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 3), false, 'Must fail when merit < 90');
  char.merit = 90;
  char.stats.rep = 74;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 3), false, 'Must fail when rep < 75');
  char.stats.rep = 75;
  char.heat = 49;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 3), false, 'Must fail when heat < 50');
  char.heat = 50;
  assert.equal(isIndependentSyndicateEligibleForRank(char, 3), true, 'Passes when rank 2, merit 90, rep 75, heat 50 met');
  console.log('  ✓ isIndependentSyndicateEligibleForRank rigorously checks all flags, ranks, and stat thresholds.');
}

// 7. Audit P0: isEventEligible rejection for unqualified recruits
console.log('7. Testing P0: isEventEligible rejects recruits with Merit 0, Heat 0, not yet independent...');
{
  const ev1 = ALL_STORY_EVENTS.find((e) => e.id === 'syn_indie_promo_rank1');
  const ev2 = ALL_STORY_EVENTS.find((e) => e.id === 'syn_indie_promo_rank2');
  const ev3 = ALL_STORY_EVENTS.find((e) => e.id === 'syn_indie_promo_rank3');
  assert.ok(ev1 && ev2 && ev3);

  // Unqualified recruit: Syndicate, but merit 0, heat 0, no IndependentSyndicate flag
  const recruit = createNewCharacter({ seed: 'recruit-zero', startAge: 19 });
  recruit.job = 'Syndicate';
  recruit.merit = 0;
  recruit.heat = 0;
  recruit.stats.rep = 25; // rep alone is not enough
  recruit.flags = [];
  recruit.finger = null;
  recruit.syndicateRank = 0;

  assert.equal(isEventEligible(ev1, recruit), false, 'Recruit with 0 merit/heat and no flag must NOT roll rank 1 in random pool');
  assert.equal(isEventEligible(ev2, recruit), false);
  assert.equal(isEventEligible(ev3, recruit), false);

  // Qualified independent syndicate member
  recruit.flags.push('IndependentSyndicate');
  recruit.merit = 20;
  recruit.heat = 15;
  assert.equal(isEventEligible(ev1, recruit), true, 'Qualified independent syndicate member must be eligible for rank 1');
  console.log('  ✓ isEventEligible prevents unqualified characters from rolling promotions in random pool.');
}

// 8. Audit P1: Backend sync & hydration preserves independent syndicate promotions
console.log('8. Testing P1: Backend sync preserves syn_indie_promo_rank* across hydration...');
async function testBackendHydrationIndiePromo() {
  const char = createNewCharacter({ seed: 'sync-parity-indie', startAge: 20 });
  char.job = 'Syndicate';
  char.flags.push('IndependentSyndicate');
  char.finger = null;
  char.syndicateRank = 0;
  char.merit = 25;
  char.stats.rep = 25;
  char.heat = 20;
  planYear(char, () => 0.5);
  assert.ok(char.plan.some((p) => p.forcedEventId === 'syn_indie_promo_rank1'), 'Local plan must schedule indie promo rank 1');

  // Mock cityArchiveAPI.planYear returning generic server moments without indie promo
  const origPlanYear = cityArchiveAPI.planYear;
  cityArchiveAPI.planYear = async ({ char: snap }) => {
    assert.equal(snap.syndicateRank, 0, 'Snap must contain syndicateRank');
    assert.equal(snap.finger, null, 'Independent Syndicate must not be serialized as Thumb');
    return {
      moments: [
        { kind: 'daily', id: 'daily_city_dawn', t: 0.1, season: 'Spring', seasonIdx: 0 },
        { kind: 'minor', id: 'minor_alley_crossroad', t: 0.4, season: 'Summer', seasonIdx: 1 },
        { kind: 'daily', id: 'daily_city_dawn', t: 0.7, season: 'Autumn', seasonIdx: 2 },
        { kind: 'daily', id: 'daily_city_dawn', t: 0.9, season: 'Winter', seasonIdx: 3 }
      ]
    };
  };

  try {
    const synced = await syncPlanWithBackend(char, () => 0.5);
    const hasPromoInHydrated = synced.plan.some((p) => p.forcedEventId === 'syn_indie_promo_rank1');
    assert.ok(hasPromoInHydrated, 'Hydrated plan must preserve local syn_indie_promo_rank1');
    console.log('  ✓ syncPlanWithBackend preserves local indie promotion in hydrated plan.');
  } finally {
    cityArchiveAPI.planYear = origPlanYear;
  }
}
await testBackendHydrationIndiePromo();

// 9. Audit P2: Codex record independent_syndicate_apex exists
console.log('9. Testing P2: CODEX_RECORDS contains independent_syndicate_apex...');
{
  const record = CODEX_RECORDS.find((r) => r.key === 'independent_syndicate_apex');
  assert.ok(record, 'independent_syndicate_apex must be defined in CODEX_RECORDS');
  assert.equal(record.category, 'syndicate');
  assert.equal(record.tier, 'legend');
  assert.ok(record.vi && record.en && record.hintVi && record.hintEn);
  console.log('  ✓ independent_syndicate_apex confirmed in CODEX_RECORDS with full bilingual entries.');
}

console.log('\n=== ALL INDEPENDENT SYNDICATE TESTS PASSED WITH 100% SUCCESS ===');
