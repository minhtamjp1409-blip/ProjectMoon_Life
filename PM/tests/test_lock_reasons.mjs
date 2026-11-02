import assert from 'node:assert/strict';
import { describeChoiceBlock, choiceIsAvailable } from '../src/engine/eventConditions.js';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { LIFE_MINORS } from '../src/engine/yearPlanner.js';

console.log('--- RUNNING LOCK REASONS TESTS (DOT 113b) ---');

// 1. Bond đủ, Reputation thiếu: lý do phải nói về Reputation
{
  const choice = {
    id: 'test_bond_rep_choice',
    need: {
      bondAtLeast: ['mentor', 40],
      stat: { rep: [50, 100] }
    }
  };

  const char = {
    stats: { rep: 20, wealth: 100 },
    npcs: {
      mentor: { status: 'alive', deceased: false, bond: 60 }
    }
  };

  const reason = describeChoiceBlock(choice, char);
  assert.ok(reason, 'Should return a block reason when reputation is insufficient');
  assert.ok(
    reason.vi.includes('Danh tiếng') || reason.en.includes('Reputation'),
    `Reason must mention Reputation when bond is sufficient, got: ${JSON.stringify(reason)}`
  );
  assert.ok(
    !reason.vi.includes('gắn kết') && !reason.en.includes('bond'),
    `Reason must NOT mention Bond when bond is sufficient, got: ${JSON.stringify(reason)}`
  );
  console.log('✓ Bond sufficient, Reputation lacking: reason accurately reports Reputation.');
}

// 2. Bond thiếu: lý do nói về Bond
{
  const choice = {
    id: 'test_bond_rep_choice_2',
    need: {
      bondAtLeast: ['mentor', 40],
      stat: { rep: [50, 100] }
    }
  };

  const char = {
    stats: { rep: 60, wealth: 100 },
    npcs: {
      mentor: { status: 'alive', deceased: false, bond: 25 }
    }
  };

  const reason = describeChoiceBlock(choice, char);
  assert.ok(reason, 'Should return a block reason when bond is insufficient');
  assert.ok(
    reason.vi.includes('gắn kết') || reason.en.includes('bond'),
    `Reason must mention Bond when bond is insufficient, got: ${JSON.stringify(reason)}`
  );
  console.log('✓ Bond lacking: reason accurately reports Bond requirement.');
}

// 2b. Grade đủ, Reputation thiếu: lý do phải nói về Reputation (không bị chặn cứng bởi need.grade)
{
  const choice = {
    id: 'test_grade_rep_choice',
    need: {
      grade: [1, 5],
      stat: { rep: [80, 100] }
    }
  };

  const char = {
    job: 'Fixer',
    fixerGrade: 3,
    stats: { rep: 30, wealth: 100 }
  };

  const reason = describeChoiceBlock(choice, char);
  assert.ok(reason, 'Should return a block reason when reputation is lacking');
  assert.ok(
    reason.vi.includes('Danh tiếng') || reason.en.includes('Reputation'),
    `Reason must mention Reputation when grade is sufficient, got: ${JSON.stringify(reason)}`
  );
  assert.ok(
    !reason.vi.includes('Grade'),
    `Reason must NOT mention Grade when character already satisfies Grade, got: ${JSON.stringify(reason)}`
  );
  console.log('✓ Grade sufficient, Reputation lacking: reason accurately reports Reputation.');
}

// 3. Với mọi lựa chọn trong data: nếu hàm kiểm tra cho qua thì hàm lý do trả null.
{
  const sampleArchetypes = [
    // Standard civilian/recruit
    {
      age: 20,
      job: 'Fixer',
      fixerGrade: 5,
      regionId: 'BACKSTREETS',
      stats: { health: 80, sanity: 80, wealth: 500, rep: 60, network: 50, standing: 60 },
      merit: 40,
      heat: 10,
      flags: ['FixerLicenseDebt'],
      inventory: ['gear_basic'],
      npcs: {
        mentor: { status: 'alive', deceased: false, bond: 60 },
        partner: { status: 'alive', deceased: false, bond: 55 },
        friend: { status: 'alive', deceased: false, bond: 50 }
      }
    },
    // Elite Color Fixer
    {
      age: 45,
      job: 'Color Fixer',
      fixerGrade: 0,
      regionId: 'NEST',
      flags: ['ColorFixer', 'EGOAwakened'],
      stats: { health: 90, sanity: 90, wealth: 1000, rep: 95, network: 80, standing: 80 },
      merit: 100,
      heat: 5,
      inventory: [],
      npcs: {
        spouse: { status: 'alive', deceased: false, bond: 85 }
      }
    },
    // High-ranking Syndicate member
    {
      age: 32,
      job: 'Syndicate',
      finger: 'Thumb',
      fingerRank: 2,
      regionId: 'BACKSTREETS',
      flags: ['ThumbMember'],
      stats: { health: 70, sanity: 65, wealth: 300, rep: 70, network: 60, standing: 70 },
      merit: 50,
      heat: 40,
      inventory: [],
      npcs: {
        partner: { status: 'alive', deceased: false, bond: 70 }
      }
    }
  ];

  let choicesChecked = 0;
  let availableChoicesCount = 0;

  const allItems = [...ALL_STORY_EVENTS, ...LIFE_MINORS];

  for (const item of allItems) {
    const choices = item.choices || [];
    for (const choice of choices) {
      choicesChecked++;
      for (const char of sampleArchetypes) {
        if (choiceIsAvailable(choice, char)) {
          availableChoicesCount++;
          const reason = describeChoiceBlock(choice, char);
          assert.equal(
            reason,
            null,
            `describeChoiceBlock MUST return null when choiceIsAvailable is true. Failed on item ${item.id}, choice: ${choice.textVi || choice.labelVi || choice.id}`
          );
        }
      }
    }
  }

  assert.ok(choicesChecked > 500, `Expected > 500 choices in data pools, checked ${choicesChecked}`);
  assert.ok(availableChoicesCount > 100, `Expected at least some available choices across archetypes, got ${availableChoicesCount}`);
  console.log(`✓ Tested ${choicesChecked} choices across multiple archetypes (${availableChoicesCount} available instances). All returned null when available.`);
}

console.log('=== ALL LOCK REASONS TESTS PASSED (100%) ===');
