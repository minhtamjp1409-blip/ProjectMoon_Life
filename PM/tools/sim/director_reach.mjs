/**
 * How the director treats each major event: how many draws it was eligible for, how many times it made the top 24
 * the draw picks from, and how many times it was drawn. An event that is often eligible but never reaches the top 24
 * is written content the scoring hides; that is the list to read before changing the draw.
 * Usage: node tools/sim/director_reach.mjs [lives=200] [--list=hidden|starved|all]
 * Lives rotate through the four player models of lib/choicePolicy.mjs, each setting its own year plan.
 */
import { createNewCharacter, createRNG, ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { directorProbe } from '../../src/engine/weaverAI.js';
import { makePicker, planTheYear, POLICIES, DOOR_POLICY } from './lib/choicePolicy.mjs';
import { playYear } from './lib/playYear.mjs';
import { fileURLToPath } from 'node:url';

export function directorReach(lives = 200, policyMode = 'default') {
  const seen = new Map();
  const row = (id) => {
    if (!seen.has(id)) seen.set(id, { eligible: 0, top: 0, chosen: 0 });
    return seen.get(id);
  };
  let draws = 0;
  let explored = 0;
  let doorsOpenedTotal = 0;
  const codexDoors = new Set();
  directorProbe.onDraw = ({ eligible, top, chosen, explored: past }) => {
    draws += 1;
    if (past) explored += 1;
    for (const id of eligible) row(id).eligible += 1;
    for (const id of top) row(id).top += 1;
    row(chosen).chosen += 1;
  };
  try {
    for (let i = 0; i < lives; i++) {
      const policy = policyMode === 'default'
        ? POLICIES[i % POLICIES.length]
        : (policyMode === 'mixed' ? (i % 2 === 0 ? DOOR_POLICY : POLICIES[i % POLICIES.length]) : policyMode);
      const pick = makePicker(policy);
      const rng = createRNG(`reach_${i}`);
      let char = createNewCharacter({
        customName: `D${i}`,
        seed: `reach_${i}`,
        openedDoors: policy === DOOR_POLICY ? [...codexDoors] : []
      });
      let guard = 0;
      while (char.alive && char.age < 120 && guard++ < 200) {
        char = planTheYear(char, policy, rng);
        char = playYear(char, rng, pick);
      }
      if (policy === DOOR_POLICY) {
        for (const id of (char.openedDoors || [])) {
          if (!codexDoors.has(id)) doorsOpenedTotal += 1;
          codexDoors.add(id);
        }
        for (const id of (char.seenEvents || [])) codexDoors.add(id);
      }
    }
  } finally {
    directorProbe.onDraw = null;
  }
  const majors = ALL_STORY_EVENTS.filter((e) => e.major);
  const rows = majors.map((e) => ({ id: e.id, ...(seen.get(e.id) || { eligible: 0, top: 0, chosen: 0 }) }));
  const neverEligible = rows.filter((r) => r.eligible === 0);
  // Eligible in at least 20 draws, yet in the top 24 for under a tenth of them
  const hidden = rows.filter((r) => r.eligible >= 20 && r.top / r.eligible < 0.1);
  // Reached the top 24 at least 20 times and was never drawn
  const starved = rows.filter((r) => r.top >= 20 && r.chosen === 0);
  const chosenTotal = rows.reduce((s, r) => s + r.chosen, 0) || 1;
  const topTen = [...rows].sort((a, b) => b.chosen - a.chosen).slice(0, 10);
  return { lives, policyMode, draws, explored, doorsOpenedTotal, majors: majors.length, rows, neverEligible, hidden, starved, topTenShare: topTen.reduce((s, r) => s + r.chosen, 0) / chosenTotal, topTen };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const lives = Number(process.argv[2]) || 200;
  const list = (process.argv.find((a) => a.startsWith('--list=')) || '').slice(7);
  const policyArg = (process.argv.find((a) => a.startsWith('--policy=')) || '').slice(9) || 'default';
  const compare = process.argv.includes('--compare');
  const modes = compare ? ['default', DOOR_POLICY] : [policyArg];
  for (const mode of modes) {
    const r = directorReach(lives, mode);
    console.log(`[${mode}] ${r.lives} lives, ${r.draws} ordinary draws (${r.explored} past the top 24) over ${r.majors} major events`);
    console.log({
      neverEligible: r.neverEligible.length,
      eligibleButHidden: r.hidden.length,
      topButNeverDrawn: r.starved.length,
      drawnAtLeastOnce: r.rows.filter((x) => x.chosen > 0).length,
      topTenShareOfDraws: `${Math.round(r.topTenShare * 100)}%`
    });
    if (!compare) {
      console.table(r.topTen.map((x) => ({ id: x.id, eligible: x.eligible, top24: x.top, drawn: x.chosen })));
      const pickList = list === 'hidden' ? r.hidden : list === 'starved' ? r.starved : list === 'all' ? r.rows : null;
      if (pickList) console.table(pickList.sort((a, b) => b.eligible - a.eligible).map((x) => ({ id: x.id, eligible: x.eligible, top24: x.top, drawn: x.chosen })));
    }
  }
  process.exit(0);
}
