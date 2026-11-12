/**
 * Where each job loses and regains HP at ages 25 to 50, and what kills it, per source (season, minor, exam, dungeon,
 * contract, major event, year end). Usage: node tools/sim/hp_sources.mjs [policy=focused|random|greedy|cautious]
 * The policy picks choices and sets the year plan (choicePolicy.planTheYear).
 */
import { createNewCharacter, resolveEventChoice, resolveDungeonChoice, getDungeonCurrentStage, createRNG, resolveFixerContract, setDungeonStance, useDungeonSupply } from '../../src/engine/gameEngine.js';
import { planYear, chooseDirectorPacedLead, runDueItems, resolveMinor, endYear, LIFE_MINORS } from '../../src/engine/yearPlanner.js';
import { choiceIsAvailable } from '../../src/engine/eventConditions.js';
import { makePicker, planTheYear, POLICIES as PLAYERS } from './lib/choicePolicy.mjs';
import { POLICIES } from './dungeon_sim.mjs';
const JOBS = ['Fixer', 'Wing Employee', 'Syndicate'];
const PLAYER = PLAYERS.includes(process.argv[2]) ? process.argv[2] : 'focused';
const pick = makePicker(PLAYER);
const acc = Object.fromEntries(JOBS.map((j) => [j, { years: 0, loss: {}, gain: {}, deaths: {}, n: {} }]));
const jobOf = (c) => (c.flags?.includes('Distorted') ? 'Distortion' : c.job);
for (let i = 0; i < 500; i++) {
  const rng = createRNG(`hp_${i}`); let char = createNewCharacter({ customName: `P${i}`, seed: `hp_${i}` }); let guard = 0;
  while (char.alive && char.age < 120 && guard++ < 200) {
    const job = jobOf(char); const a = acc[job] && char.age >= 25 && char.age <= 50 ? acc[job] : null;
    if (a) a.years++;
    const step = (src, fn) => { const hp = char.stats.health; const alive = char.alive; char = fn(); if (!a) return; const d = (char.stats?.health ?? 0) - hp; if (d < 0) a.loss[src] = (a.loss[src] || 0) - d; if (d > 0) a.gain[src] = (a.gain[src] || 0) + d; if (alive && !char.alive) a.deaths[src] = (a.deaths[src] || 0) + 1; };
    if (!char.plan?.length) planYear(char, rng);
    char = planTheYear(char, PLAYER, rng);
    if (char.pendingLead) char = chooseDirectorPacedLead(char, rng);
    for (let t = 0; t <= 100 && char.alive; t += 2) {
      step('season (mishap, daily)', () => runDueItems(char, t, rng).char); let spin = 0;
      while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 40) {
        if (char.pendingEvent) { const id = String(char.pendingEvent.id); const src = id.startsWith('fixer_promo_') ? 'grade exam' : id.startsWith('gate_') ? 'gate event' : 'major event'; step(src, () => resolveEventChoice(char, Math.max(0, pick(char.pendingEvent.choices, rng, char, char.pendingEvent.id)), rng)); }
        else if (char.pendingDungeon) step('dungeon', () => { let c = char; if (c.stats.health < 50 && c.pendingDungeon.supplyCharges > 0) c = useDungeonSupply(c, 'breather'); const want = c.stats.health >= 70 && c.stats.sanity >= 55 ? 'reckless' : 'guarded'; if (c.pendingDungeon.stance !== want) c = setDungeonStance(c, want); const st = getDungeonCurrentStage(c.pendingDungeon); return resolveDungeonChoice(c, POLICIES.measured(st, c, c.pendingDungeon, rng), rng).char; });
        else if (char.pendingMinor) step('minor', () => { const def = LIFE_MINORS.find((m) => m.id === char.pendingMinor.id); const ok = (def?.choices || []).map((c, idx) => (choiceIsAvailable(c, char) ? idx : -1)).filter((x) => x >= 0); return resolveMinor(char, ok.length ? ok[Math.floor(rng() * ok.length)] : -1, rng); });
        else if (char.pendingContract) step('contract', () => { const before = char.pendingContract; const ap = before.approaches.filter((x) => x.id !== 'decline').sort((x, y) => y.successPct - x.successPct); let c = resolveFixerContract(char, (ap[0] || before.approaches[0]).id, rng); if (c.pendingContract && c.pendingContract.id === before.id) c = { ...c, pendingContract: null }; return c; });
        else char.pendingModal = null;
      }
    }
    if (char.alive) step('year end (aging, upkeep, rest)', () => endYear(char, rng));
  }
}
for (const job of JOBS) {
  const a = acc[job]; if (!a.years) continue;
  console.log(`\n${job}: ${a.years} years lived at 25-50`);
  const srcs = [...new Set([...Object.keys(a.loss), ...Object.keys(a.gain), ...Object.keys(a.deaths)])];
  console.table(srcs.map((s) => ({ source: s, hpLostPerYear: ((a.loss[s] || 0) / a.years).toFixed(1), hpGainedPerYear: ((a.gain[s] || 0) / a.years).toFixed(1), deaths: a.deaths[s] || 0 })).sort((x, y) => y.hpLostPerYear - x.hpLostPerYear));
}
