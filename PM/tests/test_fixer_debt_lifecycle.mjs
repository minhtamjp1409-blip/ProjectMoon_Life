import assert from 'node:assert/strict';
import {
  createNewCharacter,
  resolveEventChoice,
  ALL_STORY_EVENTS
} from '../src/engine/gameEngine.js';
import { endYear, planYear } from '../src/engine/yearPlanner.js';
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

console.log('\n=== ALL FIXER LICENSE DEBT TESTS PASSED SUCCESSFULLY ===');
