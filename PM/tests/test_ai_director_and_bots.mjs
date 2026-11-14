import assert from 'node:assert/strict';
import {
  ALL_STORY_EVENTS,
  cloneChar,
  createNewCharacter,
  createRNG,
  resolveEventChoice
} from '../src/engine/gameEngine.js';
import { choiceIsAvailable, matchesEventContext } from '../src/engine/eventConditions.js';
import { triggerDistortionTransformation } from '../src/engine/careerPipeline.js';
import {
  canTriggerHabitChallenge,
  directorScore,
  habitChallengeForEvent,
  inferChoiceMotifs,
  markHabitChallengeTriggered,
  recordChoiceMotif,
  stageTargetIntensity
} from '../src/engine/eventDirector.js';
import { HABIT_CHALLENGE_BY_EVENT } from '../src/data/habitChallengeTags.js';
import { LIFE_MINORS, planYear, resolveMinor } from '../src/engine/yearPlanner.js';
import { directorReach } from '../tools/sim/director_reach.mjs';
import {
  ALL_BOT_POLICIES,
  DOOR_POLICY,
  LOOKAHEAD_POLICY,
  RECKLESS_POLICY,
  makePicker,
  planTheYear,
  yearPointsFor
} from '../tools/sim/lib/choicePolicy.mjs';
import { playYear } from '../tools/sim/lib/playYear.mjs';
import { runPolicyBalanceReport, simulatePolicyCohort } from '../tools/sim/policy_balance_report.mjs';

const EV_BY_ID = new Map(ALL_STORY_EVENTS.map((e) => [e.id, e]));
const MIN_BY_ID = new Map(LIFE_MINORS.map((m) => [m.id, m]));

// --- AI-3: Lookahead intensity curve, novelty/repeat weighting, bounded multiplier, reach target ---
{
  const childTarget = stageTargetIntensity(8);
  const careerTarget = stageTargetIntensity(26);
  const peakTarget = stageTargetIntensity(42);
  const elderTarget = stageTargetIntensity(66);
  assert(childTarget < careerTarget && careerTarget < peakTarget, 'Target intensity curve must climb from childhood -> career -> peak');
  assert(elderTarget < peakTarget, 'Target intensity curve must ease from peak -> old age');

  const baseChar = createNewCharacter({ seed: 'ai3-invariants', startAge: 42 });
  baseChar.job = 'Fixer';
  baseChar.fixerGrade = 6;
  const calmWeaver = {
    ...cloneChar(baseChar).weaver,
    recentBeats: [
      { id: 'calm_1', age: 39, intensity: 0.15, tags: ['relief'] },
      { id: 'calm_2', age: 40, intensity: 0.15, tags: ['relief'] },
      { id: 'calm_3', age: 41, intensity: 0.15, tags: ['relief'] }
    ],
    drawCounts: {},
    familyCounts: {}
  };
  const crisisWeaver = {
    ...calmWeaver,
    recentBeats: [
      { id: 'hot_1', age: 40, intensity: 0.95, tags: ['danger'] },
      { id: 'hot_2', age: 41, intensity: 0.95, tags: ['danger'] }
    ]
  };
  const intenseEv = { id: 'probe_intense', family: 'probe_a', choices: [{ fx: { health: -20 } }, { startDungeon: 'night' }] };
  const gentleEv = { id: 'probe_gentle', family: 'probe_b', choices: [{ fx: { health: 6, sanity: 6 } }] };

  const intenseCalm = directorScore(intenseEv, baseChar, calmWeaver, 100);
  const intenseHot = directorScore(intenseEv, baseChar, crisisWeaver, 100);
  const gentleHot = directorScore(gentleEv, baseChar, crisisWeaver, 100);
  assert(intenseCalm.multiplier >= 0.55 && intenseCalm.multiplier <= 1.45, 'Director multiplier must respect [0.55, 1.45] bounds');
  assert(intenseHot.multiplier >= 0.55 && intenseHot.multiplier <= 1.45, 'Director multiplier must respect [0.55, 1.45] under danger saturation');
  assert(gentleHot.multiplier > intenseHot.multiplier, 'Gentle/relief beats must outscore intense beats when running hotter than curve');

  // Bloodline novelty vs ancestor-seen & within-life repeat dampening
  const unseenChar = cloneChar(baseChar);
  unseenChar.bloodlineSeenEvents = [];
  const ancestorSeenChar = cloneChar(baseChar);
  ancestorSeenChar.bloodlineSeenEvents = [gentleEv.id];
  const unseenScore = directorScore(gentleEv, unseenChar, calmWeaver, 100);
  const seenScore = directorScore(gentleEv, ancestorSeenChar, calmWeaver, 100);
  assert(unseenScore.utility > seenScore.utility, 'Bloodline-unseen event must outscore bloodline-repeated event');

  const repeatWeaver = { ...calmWeaver, drawCounts: { [gentleEv.id]: 2 }, familyCounts: { [gentleEv.family]: 3 } };
  const repeatScore = directorScore(gentleEv, unseenChar, repeatWeaver, 100);
  assert(repeatScore.utility < unseenScore.utility, 'Within-life repeated event/family must be dampened');

  const doorReach = directorReach(80, DOOR_POLICY);
  const drawnAtLeastOnce = doorReach.rows.filter((r) => r.chosen > 0).length;
  assert(drawnAtLeastOnce > 138, `AI-3 reach target > 138 distinct events on 80 door lives (got ${drawnAtLeastOnce})`);
  assert(doorReach.topTenShare < 0.25, `AI-3 concentration target < 25% Top-10 draw share (got ${(doorReach.topTenShare * 100).toFixed(2)}%)`);
  console.log(`✓ AI-3 verified: curve bounds, bloodline novelty & 80-life door reach (${drawnAtLeastOnce} distinct, ${(doorReach.topTenShare * 100).toFixed(1)}% top-10).`);
}

// --- AI-5: Habit tracking across majors+minors, 1-2/life cap, specialized habit bots ---
{
  // Consistent motif tracking across major + minor
  const ch = createNewCharacter({ seed: 'ai5-motif-unit', startAge: 24 });
  ch.job = 'Fixer';
  ch.fixerGrade = 7;
  ch.pendingEvent = {
    id: 'unit_major_motif',
    titleEn: 'Unit',
    choices: [{ labelEn: 'Accept bribe and skim extra Ahn', fx: { wealth: 6, rep: -1 } }]
  };
  const afterMajor = resolveEventChoice(ch, 0, createRNG('unit-m1'));
  assert((afterMajor.habits?.greed || 0) >= 1, 'Major choice must update char.habits');
  assert.equal(afterMajor.motifs?.greed || 0, 0, 'Inferred habits must stay out of char.motifs, which Nature and the City Blackboard read');

  let matchedMinor = null;
  let matchedChoiceIdx = -1;
  let matchedMotifKey = null;
  for (const m of LIFE_MINORS) {
    if (!matchesEventContext(m, afterMajor)) continue;
    const idx = (m.choices || []).findIndex((c) => {
      if (!choiceIsAvailable(c, afterMajor)) return false;
      const inf = inferChoiceMotifs(c, null, m);
      return inf && inf.greed;
    });
    if (idx >= 0) {
      matchedMinor = m;
      matchedChoiceIdx = idx;
      matchedMotifKey = 'greed';
      break;
    }
  }
  assert(matchedMinor, 'Expected an eligible greed minor in LIFE_MINORS');
  const beforeMinorCount = afterMajor.habits?.[matchedMotifKey] || 0;
  afterMajor.pendingMinor = { id: matchedMinor.id };
  const afterMinor = resolveMinor(afterMajor, matchedChoiceIdx, createRNG('unit-m2'));
  assert((afterMinor.habits?.[matchedMotifKey] || 0) > beforeMinorCount, 'Minor choice must also update char.habits');

  // Cooldown, adulthood gate & 2/life ceiling
  const taggedViolenceId = Object.keys(HABIT_CHALLENGE_BY_EVENT).find((k) => habitChallengeForEvent({ id: k }) === 'violence');
  assert(taggedViolenceId, 'Expected tagged violence challenge event');
  const kid = createNewCharacter({ seed: 'ai5-kid', startAge: 14 });
  kid.habits = { violence: 5 };
  assert.equal(canTriggerHabitChallenge(kid), null, 'Habit challenges must stay gated until career adulthood');

  const adult = createNewCharacter({ seed: 'ai5-adult', startAge: 25 });
  adult.job = 'Fixer';
  adult.habits = { violence: 6 };
  assert.equal(canTriggerHabitChallenge(adult), 'violence');
  markHabitChallengeTriggered(adult, { id: taggedViolenceId });
  assert.equal(adult.habitChallenges.length, 1);
  assert.equal(canTriggerHabitChallenge(adult), null, 'Cooldown must block immediate second challenge in the same year');
  adult.age += 6;
  assert.equal(canTriggerHabitChallenge(adult), 'violence');
  markHabitChallengeTriggered(adult, { id: 'm_wsv_knife_return' });
  assert.equal(adult.habitChallenges.length, 2);
  adult.age += 10;
  assert.equal(canTriggerHabitChallenge(adult), null, 'Hard cap of 2 habit challenges per life must hold');

  // Simulation across 4 specialized habit bots (40 lives each).
  // Many of these bots die young, so a challenge per life is not guaranteed; what matters is the cap,
  // that challenges happen, and that they mostly test the bot's own habit rather than incidental ones.
  let allChallenges = 0;
  let allMatching = 0;
  for (const habit of ['violence', 'mercy', 'greed', 'loyalty']) {
    let totalChallenges = 0;
    let maxChallenges = 0;
    let matchingChallenges = 0;
    const lives = 40;
    for (let i = 0; i < lives; i++) {
      const rng = createRNG(`habit-${habit}-${i}`);
      let c = createNewCharacter({ seed: `habit-${habit}-${i}` });
      const pick = (choices, r, curChar, eventId) => {
        const ok = (choices || []).map((_, k) => k).filter((k) => choiceIsAvailable(choices[k], curChar));
        if (!ok.length) return 0;
        const srcEv = EV_BY_ID.get(eventId) || MIN_BY_ID.get(eventId) || { id: eventId };
        for (const k of ok) {
          const m = inferChoiceMotifs(choices[k], null, srcEv);
          if (m && m[habit]) return k;
        }
        return ok[Math.floor(r() * ok.length)];
      };
      while (c.alive && c.age < 75) {
        planTheYear(c, 'focused', rng);
        c = playYear(c, rng, pick);
      }
      const list = c.habitChallenges || [];
      totalChallenges += list.length;
      if (list.length > maxChallenges) maxChallenges = list.length;
      matchingChallenges += list.filter((x) => x.habit === habit).length;
    }
    const mean = totalChallenges / lives;
    assert(maxChallenges <= 2, `${habit} bot exceeded 2 challenges/life (max=${maxChallenges})`);
    assert(mean >= 0.3 && mean <= 2.0, `${habit} bot mean challenges/life expected in [0.3, 2.0], got ${mean.toFixed(2)}`);
    assert(matchingChallenges > 0, `${habit} bot should trigger matching habit challenges (got ${matchingChallenges})`);
    console.log(`  ${habit} bot: ${mean.toFixed(2)} challenges/life, ${matchingChallenges}/${totalChallenges} on its own habit`);
    allChallenges += totalChallenges;
    allMatching += matchingChallenges;
  }
  const matchShare = allMatching / Math.max(1, allChallenges);
  assert(matchShare >= 0.45, `Most challenges should test the bot's own habit (got ${(matchShare * 100).toFixed(0)}%)`);
  console.log(`✓ AI-5 verified: habits kept out of char.motifs, 2/life cap, ${(matchShare * 100).toFixed(0)}% of challenges test the bot's own habit.`);
}

// --- AI-6: Reckless policy, Lookahead policy non-mutating search, Multi-bot balance report ---
{
  const hurt = createNewCharacter({ seed: 'ai6-hurt', startAge: 25 });
  hurt.stats.health = 28;
  assert.equal(yearPointsFor(RECKLESS_POLICY, hurt).rest, 0, 'Reckless year plan must never allocate rest');

  const reckPicker = makePicker(RECKLESS_POLICY);
  const dunOrSafe = [
    { labelEn: 'Stay home and rest', fx: { health: 4 } },
    { labelEn: 'Enter the Ruins delve', startDungeon: 'dungeon_outskirts_ruins' }
  ];
  assert.equal(reckPicker(dunOrSafe, createRNG('r1'), hurt, 'test_dun_offer'), 1, 'Reckless must always choose dungeon entry when offered');

  // Verify reckless plays danger lead, delveStake=2 and bold contract via playYear
  let reckLife = null;
  for (let i = 0; i < 40; i++) {
    const candidate = createNewCharacter({ seed: `ai6-reck-year-${i}`, startAge: 22 });
    candidate.job = 'Fixer';
    candidate.fixerGrade = 8;
    planYear(candidate, createRNG(`ai6-reck-plan-${i}`));
    if (candidate.pendingLead?.offers?.some((o) => o.tier === 'danger')) {
      reckLife = candidate;
      break;
    }
  }
  assert(reckLife, 'Should find a seed offering a danger year lead');
  const reckCharAfterLead = playYear(reckLife, createRNG('reck-yr'), reckPicker);
  assert.equal(reckCharAfterLead.leadChoice?.tier, 'danger', 'Reckless policy must pick danger year lead when offered');

  const dunTriggerChar = createNewCharacter({ seed: 'ai6-stake', startAge: 23 });
  dunTriggerChar.job = 'Fixer';
  dunTriggerChar.fixerGrade = 8;
  planYear(dunTriggerChar, createRNG('ai6-stake-plan'));
  dunTriggerChar.pendingLead = null;
  dunTriggerChar.pendingEvent = {
    id: 'test_enter_dun',
    choices: [
      { labelEn: 'Wait safely', fx: { health: 1 } },
      { labelEn: 'Go in now', startDungeon: 'dungeon_backstreets_night' }
    ]
  };
  let observedStake = null;
  playYear(dunTriggerChar, createRNG('st-rng'), reckPicker, (char, kind) => {
    if (kind === 'dungeon' && observedStake === null) observedStake = char.pendingDungeon?.delveStake ?? null;
  });
  assert.equal(observedStake, 2, 'Reckless delveStake=2 must apply maximum dungeon wager during playYear');

  const contractChar = createNewCharacter({ seed: 'ai6-bold', startAge: 23 });
  contractChar.job = 'Fixer';
  contractChar.fixerGrade = 8;
  contractChar.stats.wealth = 30;
  contractChar.merit = 0;
  contractChar.npcs = {};
  contractChar.plan = [{ kind: 'rest', t: 99 }];
  contractChar.pendingContract = {
    template: { id: 'test_bold_contract', tier: 1, nameEn: 'Warehouse Sweep', nameVi: 'Quet kho' },
    tierInfo: { tier: 1, nameEn: 'Grade 8 Request', nameVi: 'Uy thac Bac 8', merit: 6, ahn: 12, diff: 10 },
    approaches: [
      { id: 'careful', costAhn: 0, successPct: 0, failPct: 100, meritGain: 5, payAhn: 5, labelEn: 'Careful' },
      { id: 'bold', costAhn: 0, successPct: 100, failPct: 0, meritGain: 15, payAhn: 20, labelEn: 'Bold', statKey: 'combat' },
      { id: 'decline', costAhn: 0, isDecline: true, labelEn: 'Decline' }
    ]
  };
  const afterContract = playYear(contractChar, createRNG('bold-rng'), reckPicker);
  assert.equal(afterContract.contractRecord?.fixer, 1, 'Reckless must pick bold Request approach during playYear');
  assert.equal(afterContract.merit >= 15, true, 'Bold Request merit gain should apply on completion');

  // Verify lookahead does not mutate live character and avoids lethal traps
  const laChar = createNewCharacter({ seed: 'ai6-la', startAge: 24 });
  laChar.job = 'Fixer';
  laChar.fixerGrade = 8;
  laChar.pendingEvent = {
    id: 'la_trap_vs_safe',
    choices: [
      { labelEn: 'Walk straight into the incinerator core', fx: { health: -200, wealth: 50 } },
      { labelEn: 'Secure legitimate Fixer fee cleanly', fx: { wealth: 12, sanity: 5 } }
    ]
  };
  const snapshotBefore = JSON.stringify(laChar);
  const laPicker = makePicker(LOOKAHEAD_POLICY);
  const picked = laPicker(laChar.pendingEvent.choices, createRNG('la-rng'), laChar, 'la_trap_vs_safe');
  assert.equal(JSON.stringify(laChar), snapshotBefore, 'Lookahead must clone and never mutate the live character');
  assert.equal(picked, 1, 'Lookahead must reject the lethal trap in favor of the surviving progression choice');

  // Smoke check multi-bot report across all 7 policies
  const miniReport = runPolicyBalanceReport(5, ALL_BOT_POLICIES);
  assert.equal(miniReport.summaries.length, 8, 'Balance report must cover all 8 policies, including the tactical control');
  assert(miniReport.summaries.some((row) => row.policy === 'tactical'), 'Balance report must include the no-rollout tactical control');
  for (const row of miniReport.summaries) {
    assert(typeof row.avgLifespan === 'number' && row.avgLifespan > 0);
    assert(typeof row.dungeonDeathRate === 'number');
    assert(typeof row.avgDistinctEvents === 'number' && row.avgDistinctEvents > 0);
    assert(typeof row.colorRate === 'number' && typeof row.colorThenDistortedRate === 'number', 'Summary must track colorRate and colorThenDistortedRate');
    assert(row.colorRate >= row.colorThenDistortedRate, 'colorRate must include lives that reached Color and later Distorted');
  }
  const colorDistortedCase = simulatePolicyCohort(LOOKAHEAD_POLICY, 1, {
    makeChar: () => {
      const c = createNewCharacter({ seed: 'synthetic-color-distorted', startAge: 42 });
      c.job = 'Color Fixer';
      c.fixerGrade = 0;
      c.isColorFixer = true;
      c.flags.push('ColorFixer');
      triggerDistortionTransformation(c);
      c.alive = false;
      return c;
    }
  });
  assert.equal(colorDistortedCase.colorRate, 1, 'Cohort must count a Color Fixer even when they later become a Distortion');
  assert.equal(colorDistortedCase.colorThenDistortedRate, 1, 'Cohort must record colorThenDistortedRate when a Color Fixer Distorts');
  assert(Array.isArray(miniReport.flags), 'Balance report must include lookahead comparison flags array');
  console.log('✓ AI-6 verified: reckless policy, non-mutating 1-2yr lookahead search, and 8-policy balance report with a tactical control.');
}
