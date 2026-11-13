import assert from 'node:assert/strict';
import {
  applyNpcName,
  createNewCharacter,
  createRNG,
  resolveEventChoice
} from '../src/engine/gameEngine.js';
import { choiceIsAvailable } from '../src/engine/eventConditions.js';
import { playYear } from '../tools/sim/lib/playYear.mjs';
import { pickChildhoodBeats } from '../src/engine/childhoodFastForward.js';

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

// 4. Outskirts/dungeon safety, non-regressing age guard, and annual recovery balance across 30 runs
{
  const regions = ['OUTSKIRTS', 'K', 'T', 'N', 'W'];
  let hpSum = 0;
  let spSum = 0;
  let count = 0;
  for (let i = 0; i < 30; i++) {
    const region = regions[i % regions.length];
    const seed = `ff_safe_${region}_${i}`;
    const rng = createRNG(seed);
    let c = createNewCharacter({
      customName: `Safe${i}`,
      seed,
      preferredRegionId: region,
      pastLives: samplePastLives,
      fastForwardChildhood: true
    });
    let guard = 0;
    while (c.childhoodMontage?.active && c.pendingEvent && guard++ < 8) {
      for (const ch of c.pendingEvent.choices || []) {
        assert.ok(!ch.startDungeon, `montage must not include startDungeon (${c.pendingEvent.id})`);
        assert.ok(!ch.openEgoModal && !ch.openColorModal && !ch.openModal, `montage must not open modal (${c.pendingEvent.id})`);
      }
      const idx = Math.max(0, c.pendingEvent.choices.findIndex((ch) => choiceIsAvailable(ch, c)));
      const prevAge = c.age;
      c = resolveEventChoice(c, idx, rng);
      assert.ok(!c.pendingDungeon, `montage beat must not start dungeon (${seed})`);
      assert.ok(c.age >= prevAge, `age must never regress (${prevAge} -> ${c.age})`);
    }
    assert.equal(c.childhoodMontage?.active, false, `montage finishes cleanly (${seed})`);
    assert.equal(c.age, 15, `montage lands at age 15 (${seed})`);
    if (c.alive) {
      hpSum += c.stats.health;
      spSum += c.stats.sanity;
      count += 1;
    }
  }
  const avgHp = hpSum / Math.max(1, count);
  const avgSp = spSum / Math.max(1, count);
  assert.ok(avgHp >= 65, `expected average age-15 HP >= 65 with annual endYear recovery, got ${avgHp.toFixed(1)}`);
  assert.ok(avgSp >= 60, `expected average age-15 SP >= 60 with annual endYear recovery, got ${avgSp.toFixed(1)}`);

  // Simulate legacy interrupted montage where character already aged to 30
  const stale = createNewCharacter({ customName: 'Stale', seed: 'ff_stale_30', pastLives: samplePastLives, fastForwardChildhood: true });
  stale.age = 30;
  const afterStale = resolveEventChoice(stale, 0, createRNG('ff_stale_resolve'));
  assert.ok(afterStale.age >= 30, `stale adult character age must never regress (got ${afterStale.age})`);
  assert.equal(afterStale.childhoodMontage?.active, false, 'stale active montage closes cleanly at age >= 15');
}



// 6. Skipped years still earn Network, so a fast-forwarded life is not cut off from the street at 15
{
  let netSum = 0;
  let count = 0;
  for (let i = 0; i < 40; i++) {
    let c = createNewCharacter({ customName: `Net${i}`, seed: `ff_net_${i}`, pastLives: samplePastLives, fastForwardChildhood: true });
    const rng = createRNG(`ff_net_rng_${i}`);
    let guard = 0;
    while (c.childhoodMontage?.active && c.pendingEvent && guard++ < 10) {
      const idx = Math.max(0, (c.pendingEvent.choices || []).findIndex((ch) => choiceIsAvailable(ch, c)));
      c = resolveEventChoice(c, idx, rng);
    }
    if (!c.alive) continue;
    netSum += c.stats.network;
    count += 1;
  }
  const avgNet = netSum / Math.max(1, count);
  console.log(`Fast-forward average Network at 15: ${avgNet.toFixed(1)} over ${count} lives`);
  assert.ok(avgNet >= 14, `expected average age-15 Network >= 14 after skipped years, got ${avgNet.toFixed(1)}`);
}

// 7. Craft-modal events never become montage beats
{
  const craftEvent = {
    id: 'ff_probe_craft', major: true, age: [8, 14],
    vi: 'Thử', en: 'Probe',
    choices: [{ labelVi: 'Rèn', labelEn: 'Forge', openCraftModal: true }]
  };
  const c = createNewCharacter({ customName: 'Craft', seed: 'ff_craft', pastLives: samplePastLives });
  const beats = pickChildhoodBeats(c, [craftEvent], createRNG('ff_craft_rng'));
  assert.equal(beats.length, 0, 'an event that opens the craft modal must not be picked as a beat');
}
console.log('Childhood fast-forward test passed.');
