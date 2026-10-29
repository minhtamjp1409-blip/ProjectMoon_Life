import assert from 'node:assert/strict';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { planYear, chooseDirectorPacedLead, chooseYearLead } from '../src/engine/yearPlanner.js';

console.log('--- RUNNING DIRECTOR PACING GOVERNOR TESTS ---');

// 1. Basic execution: auto-selects and clears pendingLead
{
  const char = createNewCharacter({ seed: 'pacing-basic', startAge: 25 });
  char.job = 'Fixer';
  planYear(char, createRNG('pacing-basic'));
  assert.equal(char.pendingLead?.offers.length, 3);
  
  const chosen = chooseDirectorPacedLead(char, createRNG('pacing-basic-pick'));
  assert.equal(chosen.pendingLead, null, 'pendingLead must be cleared after director pacing selection');
  assert.ok(chosen.plan.some((item) => item.lead), 'a lead event must be scheduled in plan');
  assert.ok(chosen.leadChoice?.id, 'leadChoice must record the chosen id');
  assert.ok(Array.isArray(chosen.recentLeadTiers) && chosen.recentLeadTiers.length > 0, 'recentLeadTiers tracks history');
  console.log('✓ Basic execution: lead auto-scheduled and pendingLead cleared.');
}

// 2. Stress & Survival Protection: High stress / low HP guarantees breathing room (no danger)
{
  let steadyCount = 0;
  let dangerCount = 0;
  const trials = 100;

  for (let i = 0; i < trials; i++) {
    const char = createNewCharacter({ seed: `pacing-stress-${i}`, startAge: 28 });
    char.job = 'Fixer';
    char.stats.health = 32; // Critical HP
    char.stats.sanity = 28; // Critical SP
    char.recentLeadTiers = ['danger', 'danger']; // Two brutal years in a row
    planYear(char, createRNG(`pacing-stress-${i}`));

    const res = chooseDirectorPacedLead(char, createRNG(`pick-${i}`));
    const chosenTier = res.leadChoice?.tier;
    if (chosenTier === 'steady') steadyCount++;
    if (chosenTier === 'danger' || chosenTier === 'forbidden') dangerCount++;
  }

  assert.equal(dangerCount, 0, `Danger must be completely suppressed when near death (got ${dangerCount})`);
  assert(steadyCount > 50, `Steady/Relief must be favored when near death (got ${steadyCount}/${trials})`);
  console.log(`✓ Stress protection verified: 0 danger events, ${steadyCount}/${trials} steady relief events.`);
}

// 3. Complacency Prevention: Prolonged peace & high vitals escalates stakes (suppresses steady)
{
  let steadyCount = 0;
  let dangerCount = 0;
  let uncertainCount = 0;
  const trials = 100;

  for (let i = 0; i < trials; i++) {
    const char = createNewCharacter({ seed: `pacing-peace-${i}`, startAge: 32 });
    char.job = 'Fixer';
    char.stats.health = 90;
    char.stats.sanity = 85;
    char.recentLeadTiers = ['steady', 'steady', 'steady']; // 3 easy years in a row
    if (char.weaver) {
      char.weaver.tensionScore = 15;
      char.weaver.yearsSinceLastCrisis = 5;
    }
    planYear(char, createRNG(`pacing-peace-${i}`));

    const res = chooseDirectorPacedLead(char, createRNG(`peace-pick-${i}`));
    const chosenTier = res.leadChoice?.tier;
    if (chosenTier === 'steady') steadyCount++;
    if (chosenTier === 'danger') dangerCount++;
    if (chosenTier === 'uncertain') uncertainCount++;
  }

  assert(dangerCount >= 30, `Danger should escalate after prolonged peace (got ${dangerCount}/${trials})`);
  assert(steadyCount <= 25, `Steady should be throttled down after 3 steady years (got ${steadyCount}/${trials})`);
  console.log(`✓ Complacency prevention verified: danger escalated to ${dangerCount}/${trials}, steady suppressed to ${steadyCount}/${trials}.`);
}

// 4. Lifetime Simulation: Neither all brutal nor all easy across a full lifetime
{
  let char = createNewCharacter({ seed: 'lifetime-pacing', startAge: 18 });
  char.job = 'Fixer';
  const tierDistribution = { steady: 0, uncertain: 0, danger: 0, other: 0 };
  const lifeYears = 35; // Age 18 to 52

  for (let age = 18; age < 18 + lifeYears; age++) {
    char.age = age;
    planYear(char, createRNG(`life-${age}`));
    char = chooseDirectorPacedLead(char, createRNG(`life-pick-${age}`));
    const tier = char.leadChoice?.tier;
    if (tier in tierDistribution) tierDistribution[tier]++;
    else tierDistribution.other++;
    
    // Simulate natural stat fluctuations
    if (tier === 'danger') {
      char.stats.health = Math.max(25, (char.stats.health || 50) - 15);
      char.stats.sanity = Math.max(25, (char.stats.sanity || 50) - 12);
    } else if (tier === 'steady') {
      char.stats.health = Math.min(90, (char.stats.health || 50) + 10);
      char.stats.sanity = Math.min(85, (char.stats.sanity || 50) + 12);
    }
  }

  console.log('Lifetime Event Distribution across 35 years:');
  console.log(`  - Steady (An toàn / Hồi phục): ${tierDistribution.steady}`);
  console.log(`  - Uncertain (Biến số / Thử thách vừa): ${tierDistribution.uncertain}`);
  console.log(`  - Danger (Nguy hiểm / Sinh tử): ${tierDistribution.danger}`);

  assert(tierDistribution.steady > 0, 'Run must have steady events');
  assert(tierDistribution.uncertain > 0, 'Run must have uncertain events');
  assert(tierDistribution.danger > 0, 'Run must have danger events');
  assert(tierDistribution.danger < lifeYears * 0.6, 'Run must NOT be all brutal danger');
  assert(tierDistribution.steady < lifeYears * 0.7, 'Run must NOT be all easy steady');
  console.log('✓ Lifetime dynamic pacing verified: balanced tension wave achieved.');
}

console.log('=== ALL DIRECTOR PACING GOVERNOR TESTS PASSED ===');
