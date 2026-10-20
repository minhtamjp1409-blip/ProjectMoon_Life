/**
 * Project Moon - 1,000 Complete Life Cycle Automated Simulation Engine
 * Rigorously stresses every single narrative branch, career milestone,
 * distortion trigger, bereavement logic, and Ahn economy turnover.
 */

import {
  createNewCharacter,
  resolveEventChoice,
  createRNG,
  ALL_STORY_EVENTS,
  buildLifeSummaryAndLegacy
} from './src/engine/gameEngine.js';

import {
  planYear,
  runDueItems,
  resolveMinor,
  endYear,
  nextPlanItem
} from './src/engine/yearPlanner.js';

import { getNextFixerPromotion, checkColorFixerReadiness } from './src/engine/careerPipeline.js';
import { ITEMS_CATALOG } from './src/data/itemsData.js';

console.log('================================================================');
console.log('STARTING AUTOMATED 1,000 LIFE CYCLE SIMULATION HARNESS');
console.log(`Total active story events in pool: ${ALL_STORY_EVENTS.length}`);
console.log('================================================================\n');

const STATS = {
  totalLives: 1000,
  completedLives: 0,
  totalYearsLived: 0,
  maxAge: 0,
  careers: {
    ChildDeath: 0,
    Fixer: 0,
    Syndicate: 0,
    'Wing Employee': 0,
    'Workshop Craftsman': 0,
    Distortion: 0
  },
  fixerGradesReached: {
    g9: 0, g8: 0, g7: 0, g6: 0, g5: 0, g4: 0, g3: 0, g2: 0, g1: 0, color: 0
  },
  distortionsCount: 0,
  egoAwakenedCount: 0,
  itemsBought: 0,
  kcorpRevivesTriggered: 0,
  nestVisasGranted: 0,

  // VIOLATION TRACKERS (MUST ALL BE 0!)
  ghostNpcViolations: 0,
  distortionFixerContractViolations: 0,
  fixerGradeSkipViolations: 0,
  biologicalChildWithoutOffspringViolations: 0
};

for (let lifeIdx = 1; lifeIdx <= STATS.totalLives; lifeIdx++) {
  const seed = `sim_seed_${lifeIdx}_${Date.now()}`;
  let char = createNewCharacter({
    customName: `Simulant_${lifeIdx}`,
    seed,
    startAge: 0
  });

  let lifeRng = createRNG(`${seed}:life`);
  let previousGrade = 9;

  while (char.alive && char.age < 120) {
    STATS.totalYearsLived++;
    if (char.age > STATS.maxAge) STATS.maxAge = char.age;

    // Check Fixer grade skipping:
    if (char.job === 'Fixer' && char.fixerGrade != null) {
      if (previousGrade - char.fixerGrade > 1) {
        STATS.fixerGradeSkipViolations++;
        console.error(`[VIOLATION] Fixer skipped grade from ${previousGrade} to ${char.fixerGrade} at age ${char.age}!`);
      }
      previousGrade = char.fixerGrade;
    }

    // Plan year
    planYear(char, lifeRng);

    // Simulate year progress (100 ticks per year)
    for (let t = 0; t <= 100; t += 2) {
      if (!char.alive) break;
      const { char: nextChar, changed } = runDueItems(char, t, lifeRng);
      char = nextChar;

      // Check if pendingEvent fired
      if (char.pendingEvent) {
        const ev = char.pendingEvent;

        // Check 1: Ghost NPC check
        const text = `${ev.titleVi || ''} ${ev.displayVi || ''}`;
        for (const role of ['spouse', 'partner', 'friend', 'mentor', 'child']) {
          if (text.includes(`{${role}}`)) {
            const npc = char.npcs?.[role];
            if (!npc || npc.deceased || npc.status === 'dead') {
              STATS.ghostNpcViolations++;
              console.error(`[VIOLATION] Ghost NPC event triggered: ${ev.id} with dead ${role}!`);
            }
          }
        }

        // Check 2: Distortion doing regular fixer event check
        if (char.flags.includes('Distorted')) {
          if (ev.id.startsWith('fixer_promo_') || (ev.jobs && ev.jobs.includes('Fixer') && !ev.id.startsWith('distort_'))) {
            STATS.distortionFixerContractViolations++;
            console.error(`[VIOLATION] Distorted character received human Fixer event: ${ev.id}!`);
          }
        }

        // Pick choice
        const choices = ev.choices || [];
        const pickIdx = Math.floor(lifeRng() * Math.max(1, choices.length));
        const chosen = choices[pickIdx];

        // If choice costs Ahn, check simulation purchase
        if (chosen?.costAhn && char.stats.wealth >= chosen.costAhn) {
          STATS.itemsBought++;
        }

        char = resolveEventChoice(char, pickIdx, lifeRng);
      }

      // Check if pendingContract fired
      if (char.pendingContract) {
        if (char.flags.includes('Distorted')) {
          STATS.distortionFixerContractViolations++;
          console.error(`[VIOLATION] Distorted character received Fixer Contract commission!`);
        }
        char.pendingContract = null; // resolve contract
      }

      // Check if minor fired
      if (char.pendingMinor) {
        const min = char.pendingMinor;
        const choices = min.choices || [];
        const pickIdx = Math.floor(lifeRng() * choices.length);
        char = resolveMinor(char, pickIdx, lifeRng);
      }

      // Simulated shopping if player has saved money
      if (char.stats.wealth >= 45 && lifeRng() < 0.15) {
        const affordable = ITEMS_CATALOG.filter((it) => it.costAhn <= char.stats.wealth);
        if (affordable.length > 0) {
          const bought = affordable[Math.floor(lifeRng() * affordable.length)];
          char.stats.wealth -= bought.costAhn;
          char.inventory = char.inventory || [];
          char.inventory.push(bought);
          STATS.itemsBought++;
          if (bought.id === 'con_kcorp_ampoule') STATS.kcorpRevivesTriggered++;
          if (bought.id === 'spc_nest_migration_permit') STATS.nestVisasGranted++;
        }
      }
    }

    if (char.alive) {
      char = endYear(char, lifeRng);
    }
  }

  // Final summary of completed life
  STATS.completedLives++;
  const finalCareer = char.flags.includes('Distorted')
    ? 'Distortion'
    : char.age < 18
    ? 'ChildDeath'
    : char.job;
  STATS.careers[finalCareer] = (STATS.careers[finalCareer] || 0) + 1;

  if (char.flags.includes('Distorted')) STATS.distortionsCount++;
  if (char.flags.includes('EGOAwakened')) STATS.egoAwakenedCount++;

  if (char.job === 'Fixer') {
    if (char.flags.includes('ColorFixer')) STATS.fixerGradesReached.color++;
    else if (char.fixerGrade >= 1 && char.fixerGrade <= 9) {
      STATS.fixerGradesReached[`g${char.fixerGrade}`]++;
    }
  }

  // Check 4: Biological inheritance without offspring violation check
  const summary = buildLifeSummaryAndLegacy(char);
  const succ = summary.successorInfo || { type: 'scavenger' };
  const actuallyHadChild = char.npcs?.child && !char.npcs.child.deceased && char.npcs.child.status !== 'dead';
  if (succ.type === 'child' && !actuallyHadChild && !char.flags.includes('HasChild')) {
    STATS.biologicalChildWithoutOffspringViolations++;
    console.error(`[VIOLATION] Solitary death with no child was marked as biological child inheritance!`);
  }

  if (lifeIdx % 200 === 0) {
    console.log(`... Completed ${lifeIdx} lives. Current ghost NPC errors: ${STATS.ghostNpcViolations}`);
  }
}

console.log('\n================================================================');
console.log('SIMULATION RESULTS ACROSS 1,000 COMPLETE LIVES');
console.log('================================================================');
console.log(`• Total Lives Simulated: ${STATS.completedLives}`);
console.log(`• Average Lifespan: ${(STATS.totalYearsLived / STATS.completedLives).toFixed(1)} years (Oldest: ${STATS.maxAge} years)`);
console.log(`• Career Distributions:`, STATS.careers);
console.log(`• Fixer Grades Achieved:`, STATS.fixerGradesReached);
console.log(`• Distortions Occurred: ${STATS.distortionsCount}`);
console.log(`• E.G.O Awakened Legends: ${STATS.egoAwakenedCount}`);
console.log(`• Workshop / Black Market Items Purchased: ${STATS.itemsBought} items`);
console.log(`• Nest Migration Visas Purchased: ${STATS.nestVisasGranted}`);
console.log('\n--- SYSTEMIC INTEGRITY VERIFICATIONS ---');
console.log(`[CHECK 1] Ghost NPC Event Violations: ${STATS.ghostNpcViolations} (Target: 0)`);
console.log(`[CHECK 2] Distortion Doing Fixer Contract Violations: ${STATS.distortionFixerContractViolations} (Target: 0)`);
console.log(`[CHECK 3] Fixer Grade Skipping Violations: ${STATS.fixerGradeSkipViolations} (Target: 0)`);
console.log(`[CHECK 4] Biological Child without Offspring Violations: ${STATS.biologicalChildWithoutOffspringViolations} (Target: 0)`);

if (
  STATS.ghostNpcViolations === 0 &&
  STATS.distortionFixerContractViolations === 0 &&
  STATS.fixerGradeSkipViolations === 0 &&
  STATS.biologicalChildWithoutOffspringViolations === 0
) {
  console.log('\n>>> ALL 1,000 LIVES PASSED WITH 100% CANONICAL INTEGRITY! <<<');
} else {
  console.error('\n>>> SOME INTEGRITY CHECKS FAILED! <<<');
  process.exit(1);
}
