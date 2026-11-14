// Multi-bot balance comparison harness (AI-6).
// Runs N lives across all fixed-rule policies + reckless + tactical (no rollouts) + 1-2 year lookahead,
// prints lifespan, highest Grade, dungeon death rate, distinct events met, and balance flags.
import { fileURLToPath } from 'node:url';
import { createNewCharacter, createRNG } from '../../src/engine/gameEngine.js';
import { playYear } from './lib/playYear.mjs';
import {
  ALL_BOT_POLICIES,
  ALL_POLICIES,
  DOOR_POLICY,
  LOOKAHEAD_POLICY,
  RECKLESS_POLICY,
  TACTICAL_POLICY,
  makePicker,
  planTheYear
} from './lib/choicePolicy.mjs';

const GRADE_THRESHOLD_GAP = 1.5;

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function mean(values) {
  return values.length ? values.reduce((s, v) => s + v, 0) / values.length : 0;
}

export function tallyColorOutcome(char, everColor = false) {
  const reachedColor = Boolean(
    everColor ||
    char?.flags?.includes('ColorFixer') ||
    char?.isColorFixer ||
    char?.job === 'Color Fixer' ||
    char?.unlockedRecords?.includes('color_fixer')
  );
  const colorThenDistorted = Boolean(
    reachedColor && (char?.flags?.includes('Distorted') || char?.job === 'Distortion')
  );
  return { reachedColor, colorThenDistorted };
}

export function simulatePolicyCohort(policy, lives = 25, { seedPrefix = 'botsim', seedOffset = 0, makeChar = null } = {}) {
  const lifespans = [];
  const distinctCountsPerLife = [];
  const pooledEvents = new Set();
  const bestGrades = [];
  let dungeonRuns = 0;
  let dungeonDeaths = 0;
  let dungeonDeadLives = 0;
  let colorFixers = 0;
  let colorThenDistorted = 0;
  let grade5OrBetter = 0;
  const codexDoors = new Set();

  for (let i = 0; i < lives; i++) {
    const seed = `${seedPrefix}_${seedOffset + i}`;
    const rng = createRNG(`${seed}:${policy}`);
    let char = makeChar
      ? makeChar(i, seed)
      : createNewCharacter({
          seed,
          meta: policy === DOOR_POLICY ? { openedDoors: [...codexDoors] } : undefined
        });
    const pick = makePicker(policy);
    const seenThisLife = new Set();
    let bestGrade = null;
    let diedInDungeon = false;
    let everColor = false;
    let guard = 0;

    while (char.alive && char.age < 120 && guard++ < 160) {
      planTheYear(char, policy, rng);
      char = playYear(
        char,
        rng,
        pick,
        (_c, kind, id) => {
          if (id) {
            seenThisLife.add(id);
            if (kind === 'event') pooledEvents.add(id);
          }
        },
        {
          policy,
          onDungeonFinish: (res) => {
            if (res.isFinished) {
              dungeonRuns++;
              if (res.resolution?.outcome === 'dead') {
                dungeonDeaths++;
                diedInDungeon = true;
              }
            }
          }
        }
      );
      if ((char.job === 'Fixer' || char.job === 'Color Fixer') && typeof char.fixerGrade === 'number') {
        bestGrade = bestGrade === null ? char.fixerGrade : Math.min(bestGrade, char.fixerGrade);
      }
      if (char.flags?.includes('ColorFixer') || char.isColorFixer || char.job === 'Color Fixer') {
        everColor = true;
      }
      if (policy === DOOR_POLICY) {
        for (const id of char.openedDoors || []) codexDoors.add(id);
      }
    }

    for (const id of char.seenEvents || []) {
      seenThisLife.add(id);
      pooledEvents.add(id);
    }
    if (diedInDungeon) dungeonDeadLives++;
    lifespans.push(char.age);
    distinctCountsPerLife.push(seenThisLife.size);
    const colorOutcome = tallyColorOutcome(char, everColor);
    if (colorOutcome.reachedColor) colorFixers++;
    if (colorOutcome.colorThenDistorted) colorThenDistorted++;
    if (bestGrade !== null) {
      bestGrades.push(bestGrade);
      if (bestGrade <= 5) grade5OrBetter++;
    }
  }

  return {
    policy,
    lives,
    avgLifespan: Number(mean(lifespans).toFixed(1)),
    medianLifespan: median(lifespans),
    fixerCount: bestGrades.length,
    avgBestGrade: bestGrades.length ? Number(mean(bestGrades).toFixed(2)) : null,
    highestGrade: bestGrades.length ? Math.min(...bestGrades) : null,
    grade5OrBetterRate: Number((grade5OrBetter / Math.max(1, lives)).toFixed(2)),
    colorRate: Number((colorFixers / Math.max(1, lives)).toFixed(2)),
    colorThenDistortedRate: Number((colorThenDistorted / Math.max(1, lives)).toFixed(2)),
    dungeonRuns,
    dungeonDeaths,
    dungeonDeathRate: Number((dungeonDeadLives / Math.max(1, lives)).toFixed(2)),
    dungeonDeathPerRun: dungeonRuns ? Number((dungeonDeaths / dungeonRuns).toFixed(2)) : 0,
    avgDistinctEvents: Number(mean(distinctCountsPerLife).toFixed(1)),
    pooledDistinctEvents: pooledEvents.size
  };
}

/**
 * Flags what looking ahead is worth. The baseline is the tactical bot, which plays leads, Requests and
 * dungeons by the same rules but never runs rollouts; fixed-rule bots answer dungeons at random, so
 * beating them mostly measures careful dungeon play. They stay as the baseline only without tactical.
 */
export function detectLookaheadBalanceFlags(summaries) {
  const lookahead = summaries.find((s) => s.policy === LOOKAHEAD_POLICY);
  const control = summaries.find((s) => s.policy === TACTICAL_POLICY);
  const fixedBots = control
    ? [control]
    : summaries.filter((s) => ALL_POLICIES.includes(s.policy) || s.policy === RECKLESS_POLICY);
  if (!lookahead || !fixedBots.length) return [];

  const flags = [];
  const bestLifespanBot = [...fixedBots].sort((a, b) => b.avgLifespan - a.avgLifespan)[0];
  if (lookahead.avgLifespan - bestLifespanBot.avgLifespan >= 12) {
    flags.push({
      metric: 'lifespan',
      reason: `Lookahead avg lifespan (${lookahead.avgLifespan}) exceeds best fixed bot ${bestLifespanBot.policy} (${bestLifespanBot.avgLifespan}) by +${(lookahead.avgLifespan - bestLifespanBot.avgLifespan).toFixed(1)} yrs`
    });
  }

  const fixedWithGrades = fixedBots.filter((s) => s.avgBestGrade !== null);
  if (lookahead.avgBestGrade !== null && fixedWithGrades.length) {
    const bestGradeBot = [...fixedWithGrades].sort((a, b) => a.avgBestGrade - b.avgBestGrade)[0];
    if (bestGradeBot.avgBestGrade - lookahead.avgBestGrade >= GRADE_THRESHOLD_GAP ||
        lookahead.grade5OrBetterRate - bestGradeBot.grade5OrBetterRate >= 0.25) {
      flags.push({
        metric: 'grade_progression',
        reason: `Lookahead Fixer climb (avg best Grade ${lookahead.avgBestGrade}, G5+ ${(lookahead.grade5OrBetterRate * 100).toFixed(0)}%) strongly outpaces ${bestGradeBot.policy} (avg ${bestGradeBot.avgBestGrade}, G5+ ${(bestGradeBot.grade5OrBetterRate * 100).toFixed(0)}%)`
      });
    }
  }

  const activeDungeonBots = fixedBots.filter((s) => s.dungeonRuns >= 5);
  if (lookahead.dungeonRuns >= 5 && activeDungeonBots.length) {
    const safestFixed = [...activeDungeonBots].sort((a, b) => a.dungeonDeathPerRun - b.dungeonDeathPerRun)[0];
    if (safestFixed.dungeonDeathPerRun - lookahead.dungeonDeathPerRun >= 0.15) {
      flags.push({
        metric: 'dungeon_survival',
        reason: `Lookahead dungeon death/run (${(lookahead.dungeonDeathPerRun * 100).toFixed(0)}%) sharply beats safest fixed bot ${safestFixed.policy} (${(safestFixed.dungeonDeathPerRun * 100).toFixed(0)}%)`
      });
    }
  }

  const bestEventsBot = [...fixedBots].sort((a, b) => b.avgDistinctEvents - a.avgDistinctEvents)[0];
  if (lookahead.avgDistinctEvents >= bestEventsBot.avgDistinctEvents * 1.25) {
    flags.push({
      metric: 'event_exposure',
      reason: `Lookahead encounters ${(lookahead.avgDistinctEvents / Math.max(1, bestEventsBot.avgDistinctEvents)).toFixed(2)}x more distinct events/life (${lookahead.avgDistinctEvents}) than ${bestEventsBot.policy} (${bestEventsBot.avgDistinctEvents})`
    });
  }
  return flags;
}

export function runPolicyBalanceReport(lives = 25, policies = ALL_BOT_POLICIES) {
  const summaries = policies.map((policy) => simulatePolicyCohort(policy, lives));
  const flags = detectLookaheadBalanceFlags(summaries);
  return { lives, summaries, flags };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const lives = Math.max(5, Number(process.argv[2]) || 25);
  const t0 = Date.now();
  const report = runPolicyBalanceReport(lives);
  console.log(`\n=== MULTI-BOT BALANCE REPORT (${lives} lives/policy, ${Date.now() - t0}ms) ===`);
  console.table(report.summaries.map((s) => ({
    policy: s.policy,
    avgAge: s.avgLifespan,
    medAge: s.medianLifespan,
    bestGrade: s.highestGrade !== null ? `G${s.highestGrade} (avg ${s.avgBestGrade})` : 'n/a',
    'G5+%': `${Math.round(s.grade5OrBetterRate * 100)}%`,
    'color%': `${Math.round(s.colorRate * 100)}%`,
    'colorThenDistorted%': `${Math.round((s.colorThenDistortedRate || 0) * 100)}%`,
    dunDeadLife: `${Math.round(s.dungeonDeathRate * 100)}% (${s.dungeonDeaths}/${s.dungeonRuns} runs)`,
    eventsPerLife: s.avgDistinctEvents,
    eventsPooled: s.pooledDistinctEvents
  })));
  if (report.flags.length) {
    console.log('\nBalance findings (lookahead vs the tactical control, same rules without rollouts):');
    for (const flag of report.flags) {
      console.log(`  [BALANCE FLAG: ${flag.metric}] ${flag.reason}`);
    }
  } else {
    console.log('\nNo extreme lookahead dominance flags triggered.');
  }
}
