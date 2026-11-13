import assert from 'node:assert/strict';
import {
  applyNpcName,
  createNewCharacter,
  createRNG,
  resolveEventChoice
} from '../src/engine/gameEngine.js';
import { choiceIsAvailable } from '../src/engine/eventConditions.js';
import { playYear } from '../tools/sim/lib/playYear.mjs';

const samplePastLives = [{ name: 'Forebear', age: 45, job: 'Fixer', endingId: 'retired' }];

// 1. First life (pastLives empty) must never skip childhood even if fastForwardChildhood is passed
{
  const firstLife = createNewCharacter({
    customName: 'FirstBorn',
    seed: 'ff_first_life',
    pastLives: [],
    fastForwardChildhood: true
  });
  assert.equal(firstLife.age, 0);
  assert.equal(firstLife.childhoodMontage, null);
  assert.ok(Array.isArray(firstLife.pendingBirthLogs) && firstLife.pendingBirthLogs.length > 0);
}

// 2. Second life with fastForwardChildhood compresses 0-14 into 3-4 beats and preserves friend/background/flags
{
  // Find a seed that spawns a childhood friend and one without
  let friendSeed = null;
  let soloSeed = null;
  for (let i = 0; i < 40 && (!friendSeed || !soloSeed); i++) {
    const seed = `ff_probe_${i}`;
    const probe = createNewCharacter({ customName: 'Probe', seed, pastLives: samplePastLives });
    if (probe.npcs?.friend && !friendSeed) friendSeed = seed;
    if (!probe.npcs?.friend && !soloSeed) soloSeed = seed;
  }
  assert.ok(friendSeed && soloSeed, 'found seeds with and without childhood friend');

  const withFriend = createNewCharacter({
    customName: 'SecondWithFriend',
    seed: friendSeed,
    pastLives: samplePastLives,
    fastForwardChildhood: true
  });
  assert.ok(withFriend.childhoodMontage?.active);
  assert.equal(withFriend.childhoodMontage.total, 4);
  assert.equal(withFriend.pendingBirthLogs.length, 0, 'birth logs preserved into main chronicle');
  assert.ok(withFriend.logs.length >= 1);
  assert.ok(withFriend.backgroundTrait);

  let cur = withFriend;
  let steps = 0;
  let namedFriend = false;
  const rng = createRNG('ff_steps_friend');
  while (cur.childhoodMontage?.active && steps < 6) {
    assert.ok(cur.pendingEvent, `step ${steps + 1} has pendingEvent`);
    if (cur.pendingEvent._montage?.allowFriendNaming && cur.npcs?.friend) {
      applyNpcName(cur, 'Minh Anh', 'friend');
      namedFriend = true;
    }
    const idx = cur.pendingEvent.choices.findIndex((c) => choiceIsAvailable(c, cur));
    assert.ok(idx >= 0, 'at least one montage choice is available');
    cur = resolveEventChoice(cur, idx, rng);
    steps += 1;
  }
  assert.equal(steps, 4);
  assert.equal(namedFriend, true, 'friend naming beat occurred');
  assert.equal(cur.npcs.friend.nameVi, 'Minh Anh');
  assert.equal(cur.age, 15);
  assert.equal(cur.childhoodMontage.completed, true);
  assert.equal(cur.doorsDecade, 10, 'decade 10 doors refreshed on reaching 15');
  assert.ok(cur.visibleDoors.length >= 2);
  assert.ok(cur.seenEvents.length >= 4);
  const milestoneLog = (cur.logs || []).find((l) => l.id?.startsWith('log_childhood_montage_15_'));
  assert.ok(milestoneLog, 'age-15 montage milestone log recorded');
  assert.equal(milestoneLog.season?.vi, 'Mùa Xuân');
  assert.equal(milestoneLog.season?.en, 'Spring');

  const soloChar = createNewCharacter({
    customName: 'SecondSolo',
    seed: soloSeed,
    pastLives: samplePastLives,
    fastForwardChildhood: true
  });
  assert.ok(soloChar.childhoodMontage?.active);
  assert.equal(soloChar.childhoodMontage.total, 3);
  let soloCur = soloChar;
  let soloSteps = 0;
  const soloRng = createRNG('ff_steps_solo');
  while (soloCur.childhoodMontage?.active && soloSteps < 5) {
    const idx = soloCur.pendingEvent.choices.findIndex((c) => choiceIsAvailable(c, soloCur));
    soloCur = resolveEventChoice(soloCur, Math.max(0, idx), soloRng);
    soloSteps += 1;
  }
  assert.equal(soloSteps, 3);
  assert.equal(soloCur.age, 15);
}

// 3. Measure full 0 -> 15 simulation vs fast-forward beats across 10 runs
{
  let fullInteractiveActions = 0;
  let ffInteractiveActions = 0;
  const tFull0 = Date.now();
  for (let i = 0; i < 10; i++) {
    const rng = createRNG(`bench_full_${i}`);
    let c = createNewCharacter({ customName: `F${i}`, seed: `bench_full_${i}`, pastLives: samplePastLives });
    const pick = (choices) => Math.max(0, (choices || []).findIndex((ch) => choiceIsAvailable(ch, c)));
    while (c.alive && c.age < 15) {
      c = playYear(c, rng, pick, () => { fullInteractiveActions += 1; });
    }
  }
  const fullMs = Date.now() - tFull0;

  const tFf0 = Date.now();
  for (let i = 0; i < 10; i++) {
    const rng = createRNG(`bench_full_${i}`);
    let c = createNewCharacter({
      customName: `Q${i}`,
      seed: `bench_full_${i}`,
      pastLives: samplePastLives,
      fastForwardChildhood: true
    });
    while (c.childhoodMontage?.active && c.pendingEvent) {
      ffInteractiveActions += 1;
      const idx = Math.max(0, c.pendingEvent.choices.findIndex((ch) => choiceIsAvailable(ch, c)));
      c = resolveEventChoice(c, idx, rng);
    }
  }
  const ffMs = Date.now() - tFf0;

  assert.ok(ffInteractiveActions < fullInteractiveActions, `fast-forward actions (${ffInteractiveActions}) < full (${fullInteractiveActions})`);
  console.log(`Childhood 0->15 benchmark (10 lives): full=${fullInteractiveActions} prompts (${fullMs}ms), fastForward=${ffInteractiveActions} beats (${ffMs}ms)`);
}

console.log('Childhood fast-forward test passed.');
