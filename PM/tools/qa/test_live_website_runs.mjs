/**
 * Test 2 Live Runs Directly on https://project-moon-life-five.vercel.app
 * OPTIMIZED FOR MAXIMUM LONGEVITY (SỐNG LÂU NHẤT CÓ THỂ)
 *
 * Run 1: Desktop Viewport (1440x900) - Region A (District 1 Nest / The Head), Wing Employee route (0.8 exposure)
 * Run 2: Mobile Viewport (390x844) - Region W (District 23 Backstreets), Cautious Survivor route
 *
 * Longevity Strategy:
 * 1. Annual Plan: 2 Rest (+6 SP/yr), 1 Work (+2 Ahn/yr), 0 Train (0 HP wear), 'survive' Ambition.
 * 2. Gate Events: NEVER select choices with `startDungeon` (100% avoid lethal dungeons like Great Lake / Lobotomy Ruin).
 * 3. Contracts: Strictly decline (`isDecline`) contracts with fatal risk; only accept 0% / 1% death risk when HP >= 70.
 * 4. Events & Minors: Heuristic survival scoring function evaluating expected HP/SP deltas,
 *    heavily penalizing mortal/fatal/lethal flags, avoiding Taboo >= 3 (Claw execution) and Heat spikes.
 * 5. Track zero horizontal overflow, age milestones, cutscenes, and final epitaph.
 */

import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LIVE_URL = 'https://project-moon-life-five.vercel.app/';
const OUT_DIR = 'output/live_runs';
mkdirSync(OUT_DIR, { recursive: true });

async function playLiveRun(page, runConfig) {
  const { name, width, height, mobile, preferredCareer, preferredRegion, customName } = runConfig;
  console.log(`\n======================================================`);
  console.log(`[STARTING MAXIMUM LONGEVITY RUN: ${name.toUpperCase()}] Viewport: ${width}x${height} (Mobile: ${mobile})`);
  console.log(`Character: ${customName} | Route: ${preferredCareer} | Region: Region ${preferredRegion}`);
  console.log(`======================================================`);

  await page.setViewport({ width, height, mobile: !!mobile });
  console.log(`Navigating to ${LIVE_URL}...`);
  await page.goto(LIVE_URL, { timeoutMs: 45000, settleMs: 2500 });

  // 1. Check basic page integrity
  const pageTitle = await page.eval(() => document.title);
  console.log(`Page Loaded. Title: "${pageTitle}"`);

  // Check horizontal overflow
  const initialOverflow = await page.eval(() => document.documentElement.scrollWidth - innerWidth);
  console.log(`Initial Horizontal Overflow: ${initialOverflow}px ${initialOverflow <= 0 ? '(PASS)' : '(FAIL)'}`);

  // 2. Start a new life on the live site
  console.log(`Starting longevity life for "${customName}" in region "${preferredRegion}"...`);
  const initChar = await page.eval((cfg) => {
    window.__gameStore.setState({
      customName: cfg.customName,
      gender: 'male',
      selectedRegion: cfg.preferredRegion,
      autoPlay: false,
      speed: 0
    });
    const store = window.__gameStore.getState();
    store.startLife(false, 0, cfg.preferredRegion);
    const c = window.__gameStore.getState().char;
    return {
      name: c?.name || c?.nameVi || c?.nameEn || 'Vô Danh',
      gender: c?.gender,
      regionId: c?.regionId,
      seed: c?.seed,
      age: c?.age,
      health: c?.stats?.health,
      sanity: c?.stats?.sanity,
      wealth: c?.stats?.wealth
    };
  }, { preferredRegion, customName });

  console.log(`Character Created: ${initChar.name} in Region ${initChar.regionId}, Age: ${initChar.age}, HP: ${initChar.health}, SP: ${initChar.sanity}, Wealth: ${initChar.wealth} Ahn`);

  const cutscenesTriggered = [];
  let isAlive = true;
  let currentAge = initChar.age;
  let stepCount = 0;
  const maxSteps = 1500; // ample steps to live through decades up to natural old age

  // 3. Step through the life with survival-maximizing AI
  while (isAlive && stepCount < maxSteps) {
    stepCount++;

    // Check store state and make survival-optimal choice in live browser
    const state = await page.eval((cfg) => {
      const s = window.__gameStore.getState();
      const c = s.char;
      if (!c) return { alive: false, inRun: false };

      // Survival Scoring Function
      function evaluateSurvival(choice, char) {
        if (!choice) return -9999999;
        const wealth = char.stats?.wealth ?? char.wealth ?? 0;
        const hp = char.stats?.health ?? char.health ?? 50;
        const sp = char.stats?.sanity ?? char.sanity ?? 50;
        const heat = char.heat || 0;
        const taboo = char.taboo || 0;

        // 1. REJECT ANY CHOICE THAT ENTERS A DUNGEON! (Avoid Great Lake, Lobotomy, etc.)
        if (choice.startDungeon) {
          return -10000000;
        }

        // 2. Cost and requirement validation
        if (choice.costAhn && choice.costAhn > wealth) return -9999999;
        if (choice.useItem && !(char.inventory || []).some(i => (i.id || i) === choice.useItem)) return -9999999;
        if (choice.favorCost) {
          const comp = char.npcs?.[choice.favorCost.role];
          if (!comp || comp.alive === false || (comp.bond || 0) < choice.favorCost.amount) return -9999999;
        }
        if (choice.need) {
          if (choice.need.stat) {
            for (const [statKey, range] of Object.entries(choice.need.stat)) {
              const val = char.stats?.[statKey] ?? char[statKey] ?? 0;
              if (Array.isArray(range) && (val < range[0] || val > range[1])) return -9999999;
            }
          }
          if (choice.need.flags && !choice.need.flags.every(f => (char.flags || []).includes(f))) return -9999999;
        }

        // 3. Taboo check: Taboo >= 3 summons Claw!
        const choiceFx = choice.fx || choice.effects || {};
        const baseTaboo = choiceFx.taboo || 0;
        if (taboo + baseTaboo >= 3) return -5000000;
        if (baseTaboo > 0) return -500000 * baseTaboo;

        const outcomes = choice.outcomes || choice.out || [];
        let score = 0;

        if (outcomes.length > 0) {
          let totalW = 0;
          let expectedHp = 0;
          let expectedSp = 0;
          let expectedHeat = 0;
          let expectedWealth = 0;
          let fatalWeight = 0;

          for (const out of outcomes) {
            const w = out.w || 100;
            totalW += w;
            const outFx = out.fx || out.effects || {};
            const deltaHp = (choiceFx.health || 0) + (outFx.health || 0);
            const deltaSp = (choiceFx.sanity || 0) + (outFx.sanity || 0);
            const deltaHeat = (choiceFx.heat || 0) + (outFx.heat || 0);
            const deltaW = (choiceFx.wealth || 0) + (outFx.wealth || 0) - (choice.costAhn || 0);
            const deltaTaboo = (choiceFx.taboo || 0) + (outFx.taboo || 0);

            if (taboo + deltaTaboo >= 3) fatalWeight += w;
            if (hp + deltaHp <= 0 || out.fatal || out.lethal || out.death || out.dead) fatalWeight += w;
            if (sp + deltaSp <= 0) fatalWeight += w * 0.9;

            expectedHp += w * deltaHp;
            expectedSp += w * deltaSp;
            expectedHeat += w * deltaHeat;
            expectedWealth += w * deltaW;
          }

          const pDeath = fatalWeight / totalW;
          expectedHp /= totalW;
          expectedSp /= totalW;
          expectedHeat /= totalW;
          expectedWealth /= totalW;

          score -= pDeath * 5000000;
          const hpW = hp < 50 ? 10 : hp < 75 ? 5 : 2.5;
          score += expectedHp * hpW;
          const spW = sp < 50 ? 8 : sp < 75 ? 4 : 2;
          score += expectedSp * spW;
          if (expectedHeat > 0) score -= expectedHeat * 4;
          else score += Math.abs(expectedHeat) * 2;
          score += expectedWealth * 0.25;
        } else {
          const deltaHp = choiceFx.health || 0;
          const deltaSp = choiceFx.sanity || 0;
          const deltaHeat = choiceFx.heat || 0;
          const deltaW = (choiceFx.wealth || 0) - (choice.costAhn || 0);

          if (hp + deltaHp <= 0) score -= 5000000;
          if (sp + deltaSp <= 0) score -= 3000000;
          const hpW = hp < 50 ? 10 : hp < 75 ? 5 : 2.5;
          score += deltaHp * hpW;
          const spW = sp < 50 ? 8 : sp < 75 ? 4 : 2;
          score += deltaSp * spW;
          if (deltaHeat > 0) score -= deltaHeat * 4;
          score += deltaW * 0.25;
        }

        // Semantic safety boost
        const label = ((choice.labelVi || choice.vi || '') + ' ' + (choice.labelEn || choice.en || '')).toLowerCase();
        if (label.includes('từ chối') || label.includes('decline') || label.includes('chữa') || label.includes('nghỉ') || label.includes('tránh') || label.includes('bảo toàn') || label.includes('rút lui') || label.includes('yên bình') || label.includes('ở lại')) {
          score += 40;
        }
        if (label.includes('liều mạng') || label.includes('tử chiến') || label.includes('reckless') || label.includes('hiến tế') || label.includes('vào sâu') || label.includes('lên tàu')) {
          score -= 100;
        }

        return score;
      }

      // Check if cutscene is currently active
      const cs = s.cutscene;
      const cutsceneActive = Boolean(cs && cs.id);
      const cutsceneId = cs?.id || null;
      const cutsceneCut = cs?.cut || null;

      if (cutsceneActive) {
        s.endCutscene('skip', cs.key);
      }

      if (s.activeResolution) {
        s.dismissResolution();
      }

      if (c.pendingBirthLogs && c.pendingBirthLogs.length > 0) {
        c.pendingBirthLogs = [];
      }

      // Modals
      if (c.pendingModal === 'color_title') {
        s.confirmColorTitle('Vermilion');
      } else if (c.pendingModal === 'ego_name') {
        s.confirmEgoName('Cánh Đỏ Bình Minh');
      } else if (c.pendingModal === 'craft_weapon') {
        s.completeWorkshopCraft({ name: 'Atelier Aegis', power: 25 });
      } else if (c.pendingModal) {
        c.pendingModal = null;
      }

      if (c.pendingNpcNaming) {
        c.pendingNpcNaming = null;
      }

      if (c.pendingLead) {
        c.pendingLead = null;
      }

      // 1. Annual Plan: Rest 2 (+6 SP/yr), Work 1 (+2 Ahn/yr), Train 0 (no HP wear), Ambition 'survive'
      if (c.pendingYearPlan) {
        const safePoints = { train: 0, work: 1, rest: 2, bond: 0, scheme: 0 };
        s.chooseAnnualPlan(safePoints, 'survive');
      }

      let choiceMade = null;

      // 2. Dungeon handling: Flee immediately
      if (c.pendingDungeon) {
        choiceMade = { id: 'dungeon_flee', title: 'Rút lui khỏi Dungeon an toàn' };
        s.fleeDungeon();
        if (s.char?.pendingDungeon) {
          s.chooseDungeonAction(0);
        }
      }
      // 3. Event choices: Pick choice with the highest survival score (excluding any startDungeon)
      else if (c.pendingEvent && Array.isArray(c.pendingEvent.choices) && c.pendingEvent.choices.length > 0) {
        let bestIdx = 0;
        let bestScore = -99999999;

        // If career crossroads, select preferred route
        if (c.pendingEvent.id?.includes('crossroad')) {
          if (cfg.preferredCareer === 'wing') {
            const wIdx = c.pendingEvent.choices.findIndex(ch => {
              const text = ((ch.labelVi || '') + (ch.labelEn || '')).toLowerCase();
              return text.includes('wing') && evaluateSurvival(ch, c) > -100000;
            });
            if (wIdx >= 0) bestIdx = wIdx;
          } else if (cfg.preferredCareer === 'fixer') {
            const fIdx = c.pendingEvent.choices.findIndex(ch => {
              const text = ((ch.labelVi || '') + (ch.labelEn || '')).toLowerCase();
              return (text.includes('fixer') || text.includes('hana')) && evaluateSurvival(ch, c) > -100000;
            });
            if (fIdx >= 0) bestIdx = fIdx;
          } else if (cfg.preferredCareer === 'syndicate') {
            const sIdx = c.pendingEvent.choices.findIndex(ch => {
              const text = ((ch.labelVi || '') + (ch.labelEn || '')).toLowerCase();
              return (text.includes('syndicate') || text.includes('băng')) && evaluateSurvival(ch, c) > -100000;
            });
            if (sIdx >= 0) bestIdx = sIdx;
          }
        } else {
          // General event survival optimization
          for (let i = 0; i < c.pendingEvent.choices.length; i++) {
            const sc = evaluateSurvival(c.pendingEvent.choices[i], c);
            if (sc > bestScore) {
              bestScore = sc;
              bestIdx = i;
            }
          }
        }

        choiceMade = { id: c.pendingEvent.id, title: c.pendingEvent.titleVi || c.pendingEvent.titleEn || c.pendingEvent.id };
        s.selectEventChoice(bestIdx);
      }
      // 4. Minor choices: Evaluate survival
      else if (c.pendingMinor && Array.isArray(c.pendingMinor.choices) && c.pendingMinor.choices.length > 0) {
        let bestIdx = 0;
        let bestScore = -99999999;
        for (let i = 0; i < c.pendingMinor.choices.length; i++) {
          const sc = evaluateSurvival(c.pendingMinor.choices[i], c);
          if (sc > bestScore) {
            bestScore = sc;
            bestIdx = i;
          }
        }
        choiceMade = { id: c.pendingMinor.id, title: c.pendingMinor.titleVi || c.pendingMinor.titleEn || c.pendingMinor.id };
        s.chooseMinor(bestIdx);
      }
      // 5. Contracts: Decline if risky, only take safe contracts
      else if (c.pendingContract && Array.isArray(c.pendingContract.approaches) && c.pendingContract.approaches.length > 0) {
        const approaches = c.pendingContract.approaches;
        const hp = c.stats?.health || 50;
        let chosenApp = approaches.find(a => a.isDecline) || approaches[0];
        let bestAppScore = -999999;

        for (const app of approaches) {
          if (app.costAhn && app.costAhn > (c.stats?.wealth || 0)) continue;
          let appScore = 0;
          const deathPct = app.deathPct || 0;
          appScore -= deathPct * 10000; // Extreme penalty for any contract death chance!
          appScore += (app.successPct || 0) * 0.2;

          if (app.isDecline) {
            // Decline is 100% safe (0% death risk)
            appScore = 500;
          } else if (app.id === 'careful') {
            appScore += (hp >= 70 && deathPct <= 3) ? 100 : -200;
          } else if (app.id === 'intel') {
            appScore += (hp >= 70 && deathPct <= 1) ? 150 : -150;
          } else if (app.id === 'bold') {
            appScore -= 1000;
          }

          if (appScore > bestAppScore) {
            bestAppScore = appScore;
            chosenApp = app;
          }
        }

        choiceMade = { id: c.pendingContract.id, title: c.pendingContract.titleVi || c.pendingContract.titleEn || c.pendingContract.id };
        s.selectContractApproach(chosenApp.id);
      }
      else {
        s.stepYear();
      }

      const overflow = document.documentElement.scrollWidth - innerWidth;

      return {
        alive: c.alive,
        age: c.age,
        job: c.job,
        fixerGrade: c.fixerGrade,
        wingRank: c.wingRank,
        finger: c.finger,
        fingerRank: c.fingerRank,
        health: c.stats?.health,
        sanity: c.stats?.sanity,
        wealth: c.stats?.wealth,
        heat: c.heat,
        taboo: c.taboo,
        flags: c.flags || [],
        cutsceneTriggered: cutsceneId ? { id: cutsceneId, cut: cutsceneCut } : null,
        choiceMade,
        overflow,
        endingId: c.endingId || null,
        deathCause: c.deathCauseVi || c.deathCauseEn || null
      };
    }, { preferredCareer });

    if (state.cutsceneTriggered) {
      console.log(`  🎬 [CUTSCENE DETECTED]: ${state.cutsceneTriggered.id} (cut: ${state.cutsceneTriggered.cut}) at Age ${state.age}`);
      cutscenesTriggered.push(state.cutsceneTriggered);
    }

    if (state.choiceMade) {
      if (stepCount % 20 === 0 || state.age !== currentAge) {
        console.log(`  [Age ${state.age}] Job: ${state.job}${state.wingRank != null ? ` (Wing R${state.wingRank})` : ''}${state.fixerGrade ? ` (Grade ${state.fixerGrade})` : ''} | Event: "${state.choiceMade.title?.slice(0, 42)}" | HP: ${state.health}, SP: ${state.sanity}, Wealth: ${state.wealth} Ahn, Overflow: ${state.overflow}px`);
      }
    }

    if (state.overflow > 0) {
      console.warn(`  ⚠️ HORIZONTAL OVERFLOW DETECTED: +${state.overflow}px at step ${stepCount}`);
    }

    currentAge = state.age;
    isAlive = state.alive;

    if (!isAlive || state.endingId) {
      console.log(`\n  ⏹️ Life ended at Age ${state.age}. Cause/Ending: "${state.deathCause || state.endingId || 'Quy luật Thành Phố'}"`);
      break;
    }

    await sleep(25);
  }

  await sleep(600);

  // 4. Capture screenshot
  const ssPath = join(OUT_DIR, `${name}_longevity_stage.jpg`);
  await page.screenshot({ path: ssPath, quality: 80 });
  console.log(`Screenshot saved to: ${ssPath}`);

  // 5. Final summary
  const summary = await page.eval(() => {
    const s = window.__gameStore.getState();
    const c = s.char;
    return {
      name: c?.name || c?.nameVi || c?.nameEn,
      age: c?.age,
      job: c?.job,
      wingRank: c?.wingRank,
      finger: c?.finger,
      fingerRank: c?.fingerRank,
      fixerGrade: c?.fixerGrade,
      alive: c?.alive,
      flags: c?.flags || [],
      records: s.unlockedRecords || [],
      landmarks: (c?.chosenLandmarks || []).length,
      deathCause: c?.deathCauseVi || c?.deathCauseEn || null,
      overflow: document.documentElement.scrollWidth - innerWidth
    };
  });

  console.log(`\n[${name.toUpperCase()} LONGEVITY RESULT]:`, {
    name: summary.name,
    finalAge: `${summary.age} TUỔI`,
    alive: summary.alive,
    career: summary.job,
    cutscenesCount: cutscenesTriggered.length,
    finalOverflow: `${summary.overflow}px`,
    deathCause: summary.deathCause
  });

  return {
    name,
    characterName: summary.name,
    finalAge: summary.age,
    alive: summary.alive,
    career: summary.job,
    wingRank: summary.wingRank,
    fixerGrade: summary.fixerGrade,
    cutscenes: cutscenesTriggered,
    overflow: summary.overflow,
    deathCause: summary.deathCause,
    screenshot: ssPath
  };
}

async function run() {
  console.log('Launching Headless Chrome DevTools Protocol Client for Longevity Optimization...');
  const browser = await Browser.launch();

  try {
    // Run 1: Desktop Longevity Run (District 1 / Nest A - Wing Employee route, maximum safety)
    const page1 = await browser.newPage({ width: 1440, height: 900 });
    const res1 = await playLiveRun(page1, {
      name: 'run1_desktop_longevity',
      customName: 'A-Corp Archivist Roland',
      width: 1440,
      height: 900,
      mobile: false,
      preferredCareer: 'wing',
      preferredRegion: 'A' // District 1 Nest
    });
    await page1.close();

    // Run 2: Mobile Longevity Run (District 23 / Backstreets - Cautious Survivor route)
    const page2 = await browser.newPage({ width: 390, height: 844, mobile: true });
    const res2 = await playLiveRun(page2, {
      name: 'run2_mobile_longevity',
      customName: 'Backstreets Survivor Meursault',
      width: 390,
      height: 844,
      mobile: true,
      preferredCareer: 'syndicate',
      preferredRegion: 'W' // District 23 Backstreets
    });
    await page2.close();

    const report = {
      timestamp: new Date().toISOString(),
      liveUrl: LIVE_URL,
      strategy: 'Maximum Longevity Optimization (Rest 2, Work 1, Reject startDungeon, Decline Fatal Contracts, Survival Heuristic Choices)',
      results: [res1, res2]
    };

    writeFileSync(join(OUT_DIR, 'report_longevity.json'), JSON.stringify(report, null, 2));
    console.log('\n======================================================');
    console.log('✅ BOTH 2 LONGEVITY RUNS COMPLETED SUCCESSFULLY!');
    console.log('======================================================');
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('Fatal Error during longevity runs:', err);
  process.exit(1);
});
