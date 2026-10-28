import assert from 'node:assert/strict';
import {
  createNewCharacter,
  resolveEventChoice,
  interpolateText,
  ALL_STORY_EVENTS
} from '../src/engine/gameEngine.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { choiceIsAvailable } from '../src/engine/eventConditions.js';
import { endYear, planYear, syncPlanWithBackend } from '../src/engine/yearPlanner.js';
import { cityArchiveAPI } from '../src/services/api/cityArchiveAPI.js';
import { migrateRun, SAVE_VERSION } from '../src/engine/saveSchema.js';

console.log('=== TEST SUITE: FIXER LICENSE DEBT LIFECYCLE & RESOLUTION ===');

// 1. Crossroad branch at wealth 8-100 vs 0-7
console.log('1. Testing career crossroad 18 wealth branch (8-100 vs 0-7 Ahn)...');
{
  const crossEvent = ALL_STORY_EVENTS.find((e) => e.id === 'ad_career_crossroad_18');
  assert.ok(crossEvent, 'ad_career_crossroad_18 must exist');

  // Branch A: Wealth >= 8 (e.g. 10 Ahn)
  const richChar = createNewCharacter({ seed: 'rich-fixer', startAge: 18 });
  richChar.stats.wealth = 10;
  richChar.pendingEvent = crossEvent;
  const afterRich = resolveEventChoice(richChar, 0, () => 0.5);
  assert.equal(afterRich.job, 'Fixer');
  assert.equal(afterRich.stats.wealth, 2, 'Must deduct exactly 8 Ahn');
  assert.equal(afterRich.flags.includes('FixerLicenseDebt'), false, 'Rich candidate must not have debt flag');
  assert.equal((afterRich.debts || []).some((d) => d.id === 'fixer_license_debt'), false, 'No debt record created');

  // Branch B: Wealth < 8 (e.g. 3 Ahn)
  const poorChar = createNewCharacter({ seed: 'poor-fixer', startAge: 18 });
  poorChar.stats.wealth = 3;
  poorChar.pendingEvent = crossEvent;
  const afterPoor = resolveEventChoice(poorChar, 0, () => 0.5);
  assert.equal(afterPoor.job, 'Fixer');
  assert.equal(afterPoor.stats.wealth, 3, 'Poor candidate cannot pay 8 Ahn, wealth preserved');
  assert.ok(afterPoor.flags.includes('FixerLicenseDebt'), 'Poor candidate receives FixerLicenseDebt flag');
  const debtRec = (afterPoor.debts || []).find((d) => d.id === 'fixer_license_debt');
  assert.ok(debtRec, 'Debt record fixer_license_debt must be created');
  assert.equal(debtRec.principalAhn, 8);
  assert.equal(debtRec.balanceAhn, 8);
  assert.equal(debtRec.status, 'active');
  assert.equal(debtRec.createdAge, 18);
  assert.equal(debtRec.nextDueAge, 19, 'Must have 1-year grace period (due at age 19)');
  console.log('  ✓ Crossroad accurately branches into paid vs structured debt with 1-year grace.');
}

// 2. Grace period & yearPlanner due scheduling
console.log('2. Testing 1-year grace period and scheduling when debt is due...');
{
  const char = createNewCharacter({ seed: 'debt-grace', startAge: 18 });
  char.job = 'Fixer';
  char.flags.push('FixerLicenseDebt');
  char.debts = [
    {
      id: 'fixer_license_debt',
      creditorId: 'backstreets_pawn_creditor',
      principalAhn: 8,
      balanceAhn: 8,
      createdAge: 18,
      nextDueAge: 19,
      missedPayments: 0,
      status: 'active',
      originEventId: 'ad_career_crossroad_18'
    }
  ];

  // At age 18: debt is NOT due yet (nextDueAge: 19)
  const plan18 = planYear(char, () => 0.5).plan;
  assert.equal(plan18.some((p) => p.forcedEventId === 'csq_fixer_license_debt_due'), false, 'Must not collect at age 18 during grace period');

  // When year ends, char turns 19: debt IS due
  const y19 = endYear(char, () => 0.5);
  assert.equal(y19.age, 19);
  const debtPlanItem = y19.plan.find((p) => p.forcedEventId === 'csq_fixer_license_debt_due');
  assert.ok(debtPlanItem, 'csq_fixer_license_debt_due must be scheduled at age 19');
  console.log('  ✓ Grace period respected; collection event scheduled exactly when due.');
}

// 3. Collection event outcomes: Full settlement
console.log('3. Testing debt collection: Full settlement (Choice 0)...');
{
  const dueEvent = ALL_STORY_EVENTS.find((e) => e.id === 'csq_fixer_license_debt_due');
  assert.ok(dueEvent);

  const char = createNewCharacter({ seed: 'debt-settle', startAge: 19 });
  char.job = 'Fixer';
  char.flags.push('FixerLicenseDebt');
  char.stats.wealth = 15;
  char.debts = [
    {
      id: 'fixer_license_debt',
      creditorId: 'backstreets_pawn_creditor',
      principalAhn: 8,
      balanceAhn: 8,
      createdAge: 18,
      nextDueAge: 19,
      missedPayments: 0,
      status: 'active',
      originEventId: 'ad_career_crossroad_18'
    }
  ];
  char.pendingEvent = dueEvent;

  const afterPay = resolveEventChoice(char, 0, () => 0.5);
  assert.equal(afterPay.stats.wealth, 7, 'Must deduct 8 Ahn');
  assert.equal(afterPay.flags.includes('FixerLicenseDebt'), false, 'FixerLicenseDebt flag must be removed');
  const d = afterPay.debts.find((x) => x.id === 'fixer_license_debt');
  assert.equal(d.status, 'settled');
  assert.equal(d.balanceAhn, 0);

  // Subsequent year: collector must NEVER return
  afterPay.pendingEvent = null;
  afterPay.pendingYearPlan = null;
  const nextY = endYear(afterPay, () => 0.5);
  assert.equal(nextY.plan.some((p) => p.forcedEventId === 'csq_fixer_license_debt_due'), false, 'Settled debt must never trigger collector');
  console.log('  ✓ Full repayment marks debt settled, removes flag, and permanently stops collectors.');
}

// 4. Collection event outcomes: Partial payment
console.log('4. Testing debt collection: Partial payment (Choice 1)...');
{
  const dueEvent = ALL_STORY_EVENTS.find((e) => e.id === 'csq_fixer_license_debt_due');
  const char = createNewCharacter({ seed: 'debt-partial', startAge: 19 });
  char.job = 'Fixer';
  char.flags.push('FixerLicenseDebt');
  char.stats.wealth = 5;
  char.debts = [
    {
      id: 'fixer_license_debt',
      creditorId: 'backstreets_pawn_creditor',
      principalAhn: 8,
      balanceAhn: 8,
      createdAge: 18,
      nextDueAge: 19,
      missedPayments: 0,
      status: 'active',
      originEventId: 'ad_career_crossroad_18'
    }
  ];
  char.pendingEvent = dueEvent;

  const afterPartial = resolveEventChoice(char, 1, () => 0.5);
  assert.equal(afterPartial.stats.wealth, 2, 'Must deduct 3 Ahn partial payment');
  const d = afterPartial.debts.find((x) => x.id === 'fixer_license_debt');
  assert.equal(d.balanceAhn, 5, 'Remaining balance must be 5 Ahn');
  assert.equal(d.status, 'active');
  assert.equal(d.nextDueAge, 20, 'nextDueAge deferred to age 20');
  console.log('  ✓ Partial payment accurately decrements balance and defers due age.');
}

// 5. Collection event outcomes: Default & penalty interest
console.log('5. Testing debt collection: Default and penalty interest (Choice 3)...');
{
  const dueEvent = ALL_STORY_EVENTS.find((e) => e.id === 'csq_fixer_license_debt_due');
  const char = createNewCharacter({ seed: 'debt-default', startAge: 19 });
  char.job = 'Fixer';
  char.flags.push('FixerLicenseDebt');
  char.stats.wealth = 0;
  char.stats.health = 50;
  char.debts = [
    {
      id: 'fixer_license_debt',
      creditorId: 'backstreets_pawn_creditor',
      principalAhn: 8,
      balanceAhn: 8,
      createdAge: 18,
      nextDueAge: 19,
      missedPayments: 0,
      status: 'active',
      originEventId: 'ad_career_crossroad_18'
    }
  ];
  char.pendingEvent = dueEvent;

  const afterDefault = resolveEventChoice(char, 3, () => 0.5);
  assert.ok(afterDefault.stats.health < 50, 'Takes physical damage from beating');
  const d = afterDefault.debts.find((x) => x.id === 'fixer_license_debt');
  assert.equal(d.missedPayments, 1);
  assert.equal(d.balanceAhn, 10, 'Penalty adds +2 Ahn to balance');
  assert.equal(d.nextDueAge, 20, 'Deferred to next year');
  assert.ok(afterDefault.scars.includes('Vết thương từ kẻ đòi nợ ngầm'));
  console.log('  ✓ Default inflicts damage, scar, penalty interest and increments missed payments.');
}

// 6. Save schema defensive migration
console.log('6. Testing saveSchema migration for legacy FixerLicenseDebt flag...');
{
  const oldSave = {
    version: 3,
    char: {
      seed: 'legacy-debt-run',
      alive: true,
      age: 22,
      job: 'Fixer',
      flags: ['FixerLicenseDebt']
    }
  };

  const migrated = migrateRun(oldSave);
  assert.equal(migrated.version, SAVE_VERSION);
  assert.ok(Array.isArray(migrated.char.debts), 'debts array initialized');
  const d = migrated.char.debts.find((x) => x.id === 'fixer_license_debt');
  assert.ok(d, 'Legacy flag converted into structured debt record');
  assert.equal(d.balanceAhn, 8);
  assert.equal(d.status, 'active');

  // If debt is already settled, it is not re-added
  const settledSave = {
    version: SAVE_VERSION,
    char: {
      seed: 'settled-run',
      alive: true,
      age: 25,
      job: 'Fixer',
      flags: [],
      debts: [{ id: 'fixer_license_debt', balanceAhn: 0, status: 'settled' }]
    }
  };
  const migratedSettled = migrateRun(settledSave);
  assert.equal(migratedSettled.char.debts.length, 1);
  assert.equal(migratedSettled.char.debts[0].status, 'settled');
  console.log('  ✓ Save migration upgrades legacy flag to structured record without duplicate re-creation.');
}

// 7. Audit P0: Debt event eligibility gating (isEventEligible)
console.log('7. Testing P0: isEventEligible strict debt condition...');
{
  const dueEvent = ALL_STORY_EVENTS.find((e) => e.id === 'csq_fixer_license_debt_due');
  assert.ok(dueEvent, 'csq_fixer_license_debt_due must exist');

  // Case A: Wing employee with no debts
  const wingChar = createNewCharacter({ seed: 'wing-no-debt', startAge: 25 });
  wingChar.job = 'Wing';
  assert.equal(isEventEligible(dueEvent, wingChar), false, 'Wing employee without debt must NOT be eligible');

  // Case B: Fixer without debts
  const fixerNoDebt = createNewCharacter({ seed: 'fixer-no-debt', startAge: 20 });
  fixerNoDebt.job = 'Fixer';
  assert.equal(isEventEligible(dueEvent, fixerNoDebt), false, 'Fixer without debt must NOT be eligible');

  // Case C: Fixer with debt, but not due yet (nextDueAge: 22, age: 20)
  const fixerNotDue = createNewCharacter({ seed: 'fixer-not-due', startAge: 20 });
  fixerNotDue.job = 'Fixer';
  fixerNotDue.debts = [{ id: 'fixer_license_debt', status: 'active', balanceAhn: 8, nextDueAge: 22 }];
  assert.equal(isEventEligible(dueEvent, fixerNotDue), false, 'Fixer whose debt is not due must NOT be eligible');

  // Case D: Fixer with settled debt
  const fixerSettled = createNewCharacter({ seed: 'fixer-settled', startAge: 20 });
  fixerSettled.job = 'Fixer';
  fixerSettled.debts = [{ id: 'fixer_license_debt', status: 'settled', balanceAhn: 0, nextDueAge: 19 }];
  assert.equal(isEventEligible(dueEvent, fixerSettled), false, 'Fixer with settled debt must NOT be eligible');

  // Case E: Fixer with active debt due (age 20, nextDueAge: 20)
  const fixerDue = createNewCharacter({ seed: 'fixer-due', startAge: 20 });
  fixerDue.job = 'Fixer';
  fixerDue.debts = [{ id: 'fixer_license_debt', status: 'active', balanceAhn: 8, nextDueAge: 20 }];
  assert.equal(isEventEligible(dueEvent, fixerDue), true, 'Fixer with active due debt MUST be eligible');
  console.log('  ✓ isEventEligible correctly rejects all characters without active due debt.');
}

// 8. Audit P0: Dynamic debt balance repayment (balances 10, 5, 2)
console.log('8. Testing P0: Dynamic debt balance repayment and label interpolation...');
{
  const dueEvent = ALL_STORY_EVENTS.find((e) => e.id === 'csq_fixer_license_debt_due');

  // Dynamic label & text interpolation
  const char10 = createNewCharacter({ seed: 'char-10', startAge: 20 });
  char10.job = 'Fixer';
  char10.debts = [{ id: 'fixer_license_debt', status: 'active', balanceAhn: 10, nextDueAge: 20 }];
  assert.equal(interpolateText('Nợ {debtBalance} Ahn, trả trước {partialPay} Ahn', char10), 'Nợ 10 Ahn, trả trước 3 Ahn');

  // Full payment with balance 10: costs exactly 10 Ahn
  char10.stats.wealth = 15;
  char10.flags.push('FixerLicenseDebt');
  char10.pendingEvent = dueEvent;
  assert.equal(choiceIsAvailable(dueEvent.choices[0], char10), true);
  const after10 = resolveEventChoice(char10, 0, () => 0.5);
  assert.equal(after10.stats.wealth, 5, 'Deducts 10 Ahn from wealth 15');
  const log10 = after10.logs.find((log) => log.id === 'log_ev_20_csq_fixer_license_debt_due');
  assert.match(log10.vi, /10 Ahn/);
  assert.doesNotMatch(log10.vi, /\b0 Ahn/);
  const d10 = after10.debts.find((d) => d.id === 'fixer_license_debt');
  assert.equal(d10.status, 'settled');
  assert.equal(d10.balanceAhn, 0);
  assert.equal(after10.flags.includes('FixerLicenseDebt'), false);

  // Full payment with balance 5: costs exactly 5 Ahn
  const char5 = createNewCharacter({ seed: 'char-5', startAge: 20 });
  char5.job = 'Fixer';
  char5.stats.wealth = 6;
  char5.flags.push('FixerLicenseDebt');
  char5.debts = [{ id: 'fixer_license_debt', status: 'active', balanceAhn: 5, nextDueAge: 20 }];
  char5.pendingEvent = dueEvent;
  const after5 = resolveEventChoice(char5, 0, () => 0.5);
  assert.equal(after5.stats.wealth, 1, 'Deducts 5 Ahn from wealth 6');
  assert.match(after5.logs.find((log) => log.id === 'log_ev_20_csq_fixer_license_debt_due').vi, /5 Ahn/);
  const d5 = after5.debts.find((d) => d.id === 'fixer_license_debt');
  assert.equal(d5.status, 'settled');
  assert.equal(d5.balanceAhn, 0);

  // Full payment with balance 2: costs exactly 2 Ahn
  const char2 = createNewCharacter({ seed: 'char-2', startAge: 20 });
  char2.job = 'Fixer';
  char2.stats.wealth = 4;
  char2.flags.push('FixerLicenseDebt');
  char2.debts = [{ id: 'fixer_license_debt', status: 'active', balanceAhn: 2, nextDueAge: 20 }];
  char2.pendingEvent = dueEvent;
  const after2 = resolveEventChoice(char2, 0, () => 0.5);
  assert.equal(after2.stats.wealth, 2, 'Deducts 2 Ahn from wealth 4');
  assert.match(after2.logs.find((log) => log.id === 'log_ev_20_csq_fixer_license_debt_due').vi, /2 Ahn/);
  const d2 = after2.debts.find((d) => d.id === 'fixer_license_debt');
  assert.equal(d2.status, 'settled');
  assert.equal(d2.balanceAhn, 0);

  // Partial payment when balance <= 3 (e.g. balance 2): paying partial pays the remaining 2 and settles!
  const charPartial2 = createNewCharacter({ seed: 'char-p2', startAge: 20 });
  charPartial2.job = 'Fixer';
  charPartial2.stats.wealth = 5;
  charPartial2.flags.push('FixerLicenseDebt');
  charPartial2.debts = [{ id: 'fixer_license_debt', status: 'active', balanceAhn: 2, nextDueAge: 20 }];
  assert.equal(interpolateText('Trả trước {partialPay} Ahn', charPartial2), 'Trả trước 2 Ahn');
  charPartial2.pendingEvent = dueEvent;
  const afterP2 = resolveEventChoice(charPartial2, 1, () => 0.5);
  assert.equal(afterP2.stats.wealth, 3, 'Deducts min(3, 2) = 2 Ahn');
  const partialLog = afterP2.logs.find((log) => log.id === 'log_ev_20_csq_fixer_license_debt_due');
  assert.match(partialLog.vi, /2 Ahn/);
  assert.match(partialLog.vi, /Không còn khoản nào/);
  assert.doesNotMatch(partialLog.vi, /sang năm sau/);
  const dP2 = afterP2.debts.find((d) => d.id === 'fixer_license_debt');
  assert.equal(dP2.status, 'settled', 'Debt settles when balance reaches 0 via partial payment');
  assert.equal(dP2.balanceAhn, 0);
  assert.equal(afterP2.flags.includes('FixerLicenseDebt'), false);
  console.log('  ✓ Dynamic costs, interpolation, and automatic settlement on balance 0 verified.');
}

// 9. Audit P1: Backend sync & plan hydration parity
console.log('9. Testing P1: Backend sync preserves local debt due event across hydration...');
async function testBackendHydrationParity() {
  const char = createNewCharacter({ seed: 'sync-parity-debt', startAge: 19 });
  char.job = 'Fixer';
  char.flags.push('FixerLicenseDebt');
  char.debts = [{ id: 'fixer_license_debt', status: 'active', balanceAhn: 8, nextDueAge: 19 }];
  planYear(char, () => 0.5);
  assert.ok(char.plan.some((p) => p.forcedEventId === 'csq_fixer_license_debt_due'), 'Local plan must schedule debt due');

  // Mock cityArchiveAPI.planYear returning generic server moments without debt
  const origPlanYear = cityArchiveAPI.planYear;
  cityArchiveAPI.planYear = async ({ char: snap }) => {
    assert.ok(Array.isArray(snap.debts), 'Snap must include debts');
    assert.equal(snap.debts.length, 1);
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
    const hasDebtInHydrated = synced.plan.some((p) => p.forcedEventId === 'csq_fixer_license_debt_due');
    assert.ok(hasDebtInHydrated, 'Hydrated plan must preserve local csq_fixer_license_debt_due');
    console.log('  ✓ syncPlanWithBackend preserves local debt collection in hydrated plan.');
  } finally {
    cityArchiveAPI.planYear = origPlanYear;
  }
}
await testBackendHydrationParity();

console.log('\n=== ALL FIXER LICENSE DEBT TESTS PASSED SUCCESSFULLY ===');
