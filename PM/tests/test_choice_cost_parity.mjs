import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { choiceIsAvailable, getChoiceAhnCost } from '../src/engine/eventConditions.js';
import { createNewCharacter, resolveEventChoice, ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { LIFE_MINORS } from '../src/engine/yearPlanner.js';

const server = await createServer({ server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'error' });

try {
  const { previewChoice, choiceCostDisplay } = await server.ssrLoadModule('/src/features/chronicle/components/Deltas.jsx');
  const event = ALL_STORY_EVENTS.find((entry) => entry.id === 'csq_fixer_license_debt_due');
  assert.ok(event);

  for (const { balance, wealth, index, cost } of [
    { balance: 10, wealth: 15, index: 0, cost: 10 },
    { balance: 10, wealth: 5, index: 0, cost: 10 },
    { balance: 10, wealth: 3, index: 1, cost: 3 },
    { balance: 10, wealth: 2, index: 1, cost: 3 },
    { balance: 5, wealth: 6, index: 0, cost: 5 },
    { balance: 2, wealth: 4, index: 0, cost: 2 },
    { balance: 2, wealth: 2, index: 1, cost: 2 }
  ]) {
    const char = createNewCharacter({ seed: `cost-${balance}-${wealth}-${index}`, startAge: 20 });
    char.job = 'Fixer';
    char.stats.wealth = wealth;
    char.flags.push('FixerLicenseDebt');
    char.debts = [{ id: 'fixer_license_debt', status: 'active', balanceAhn: balance, nextDueAge: 20 }];
    char.pendingEvent = event;
    const choice = event.choices[index];

    assert.equal(getChoiceAhnCost(choice, char), cost);
    assert.equal(previewChoice(choice, char).fixed.find((entry) => entry.k === 'wealth')?.v, -cost);
    assert.equal(choiceIsAvailable(choice, char), wealth >= cost);
    const display = choiceCostDisplay(choice, char);
    assert.equal(display.costAhn, cost);
    assert.equal(display.isShortAhn, wealth < cost);
    if (wealth < cost) {
      assert.equal(display.needVi, `Thiếu Ahn (Cần ${cost})`);
      assert.equal(display.needEn, `Short Ahn (Needs ${cost})`);
    } else {
      assert.equal(display.costVi, `Tốn ${cost} Ahn`);
      assert.equal(display.costEn, `Cost: ${cost} Ahn`);
    }

    const result = resolveEventChoice(char, index, () => 0.5);
    assert.equal(result.stats.wealth, wealth - (wealth >= cost ? cost : 0));
    if (wealth < cost) assert.equal(result.pendingEvent?.id, event.id);
    else assert.equal(result.pendingEvent, null);
  }

  const fixed = { costAhn: 8, fx: { wealth: -8 } };
  const extra = { costAhn: 8, fx: { sanity: 2 } };
  const char = createNewCharacter({ seed: 'fixed-cost-preview', startAge: 20 });
  assert.equal(getChoiceAhnCost(fixed, char), 8);
  assert.equal(previewChoice(fixed, char).fixed.find((entry) => entry.k === 'wealth')?.v, -8);
  assert.equal(previewChoice(extra, char).fixed.find((entry) => entry.k === 'wealth')?.v, -8);

  const prescript = ALL_STORY_EVENTS.find((entry) => entry.id === 'syn_index_prescript_bizarre');
  assert.ok(prescript);
  for (const wealth of [19, 25]) {
    const indexMember = createNewCharacter({ seed: `prescript-price-${wealth}`, startAge: 25 });
    indexMember.job = 'Syndicate';
    indexMember.finger = 'Index';
    indexMember.flags.push('FingerIndex');
    indexMember.stats.wealth = wealth;
    indexMember.pendingEvent = prescript;
    const choice = prescript.choices[0];
    assert.equal(getChoiceAhnCost(choice, indexMember), 20);
    assert.equal(choiceIsAvailable(choice, indexMember), wealth >= 20);
    assert.equal(previewChoice(choice, indexMember).fixed.find((entry) => entry.k === 'wealth')?.v, -20);
    const resolved = resolveEventChoice(indexMember, 0, () => 0.5);
    assert.equal(resolved.stats.wealth, wealth >= 20 ? wealth - 20 : wealth);
    assert.equal(resolved.pendingEvent?.id, wealth >= 20 ? undefined : prescript.id);
  }

  for (const [id, amount] of [['m_c_dog', 2], ['m_t_nest_exam_cheat', 4]]) {
    const choice = LIFE_MINORS.find((entry) => entry.id === id)?.choices[0];
    assert.ok(choice);
    assert.equal(getChoiceAhnCost(choice, char), amount);
    const preview = previewChoice(choice, char, 'minor');
    assert.deepEqual(preview.ranges.find((entry) => entry.k === 'wealth'), { k: 'wealth', lo: -amount, hi: -amount });
  }

  console.log('Choice cost preview, availability, and engine deduction agree.');
} finally {
  await server.close();
}
