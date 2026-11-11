/**
 * Pacing by age: how many choices of each kind a life meets per year of age, how many years pass
 * with no choice at all, and when and in what state each dungeon is entered.
 * Usage: node tools/sim/pacing_by_age.mjs [lives=300] [policy=focused|random]
 */
import { createNewCharacter, resolveEventChoice, resolveDungeonChoice, getDungeonCurrentStage, isDungeonChoiceAvailable, createRNG, resolveFixerContract } from '../../src/engine/gameEngine.js';
import { planYear, chooseDirectorPacedLead, runDueItems, resolveMinor, endYear, LIFE_MINORS } from '../../src/engine/yearPlanner.js';
import { choiceIsAvailable } from '../../src/engine/eventConditions.js';
import { makePicker } from './lib/choicePolicy.mjs';
import { POLICIES as DUNGEON_POLICIES } from './dungeon_sim.mjs';
import { setDungeonStance, useDungeonSupply } from '../../src/engine/gameEngine.js';

const LIVES = Number(process.argv[2]) || 300;
const POLICY = process.argv[3] === 'random' ? 'random' : 'focused';
const ELDER_START = process.argv.includes('--elder');
const pick = makePicker(POLICY);
const BANDS = [[0, 12], [13, 17], [18, 24], [25, 32], [33, 40], [41, 50], [51, 60], [61, 75], [76, 120]];
const band = (age) => BANDS.findIndex(([a, b]) => age >= a && age <= b);
const rows = BANDS.map(() => ({ years: 0, major: 0, minor: 0, contract: 0, dungeon: 0, quiet: 0, causal: 0, gate: 0, hurt: 0 }));
const entries = [];

for (let i = 0; i < LIVES; i++) {
  const rng = createRNG(`pace_${i}`);
  let char = createNewCharacter({ customName: `P${i}`, seed: `pace_${i}` });
  if (ELDER_START) {
    const routes = [
      { job: 'Fixer', fixerGrade: 0, isColorFixer: true, flags: ['ColorFixer', 'ApexLongevity', 'apex_longevity_done'] },
      { job: 'Syndicate', finger: 'Thumb', fingerRank: 3, flags: ['ApexLongevity', 'apex_longevity_done'] },
      { job: 'Wing Employee', wingRank: 3, flags: ['ApexLongevity', 'apex_longevity_done'] }
    ];
    const r = routes[i % routes.length];
    char = {
      ...char,
      age: 60,
      ...r,
      flags: [...new Set([...(char.flags || []), ...r.flags])],
      merit: 220,
      stats: { ...char.stats, health: 80, sanity: 80, wealth: 65, rep: 80, network: 60 }
    };
  }
  let guard = 0;
  while (char.alive && char.age < 120 && guard++ < 200) {
    const row = rows[band(char.age)];
    row.years++;
    if (char.stats.health < 40) row.hurt++;
    let choices = 0;
    if (!char.plan?.length) planYear(char, rng);
    if (char.pendingLead) char = chooseDirectorPacedLead(char, rng);
    for (let t = 0; t <= 100 && char.alive; t += 2) {
      char = runDueItems(char, t, rng).char;
      let spin = 0;
      while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 40) {
        if (char.pendingEvent) {
          row.major++; choices++;
          if (String(char.pendingEvent.id).startsWith('gate_')) row.gate++;
          if (char.pendingEvent.isCausalCallback || char.pendingEvent.id?.startsWith('csq_')) row.causal++;
          char = resolveEventChoice(char, Math.max(0, pick(char.pendingEvent.choices, rng, char, char.pendingEvent.id)), rng);
        } else if (char.pendingDungeon) {
          const sess = char.pendingDungeon;
          if (!sess._seen) {
            sess._seen = true; row.dungeon++; choices++;
            entries.push({ id: sess.id.replace('dungeon_', ''), age: char.age, job: char.job, hp: char.stats.health });
          }
          // The same player as dungeon_sim's "measured": a first-option bot died in two of three dungeons
          // and left almost no one alive past 50 to measure
          if (char.stats.health < 50 && sess.supplyCharges > 0) char = useDungeonSupply(char, 'breather');
          const want = char.stats.health >= 70 && char.stats.sanity >= 55 ? 'reckless' : 'guarded';
          if (char.pendingDungeon.stance !== want) char = setDungeonStance(char, want);
          const stage = getDungeonCurrentStage(char.pendingDungeon);
          const k = DUNGEON_POLICIES.measured(stage, char, char.pendingDungeon, rng);
          const r = resolveDungeonChoice(char, k, rng);
          char = r.char;
          if (char.pendingDungeon && !r.isFinished) char.pendingDungeon._seen = true;
        } else if (char.pendingMinor) {
          row.minor++; choices++;
          const def = LIFE_MINORS.find((m) => m.id === char.pendingMinor.id);
          const ok = (def?.choices || []).map((c, idx) => (choiceIsAvailable(c, char) ? idx : -1)).filter((x) => x >= 0);
          char = resolveMinor(char, ok.length ? ok[Math.floor(rng() * ok.length)] : -1, rng);
        } else if (char.pendingContract) {
          row.contract++; choices++;
          const ap = char.pendingContract.approaches.filter((a) => a.id !== 'decline').sort((a, b) => b.successPct - a.successPct);
          const pendingBefore = char.pendingContract;
          char = resolveFixerContract(char, (ap[0] || char.pendingContract.approaches[0]).id, rng);
          // An approach the character cannot afford leaves the contract open; a player would decline it
          if (char.pendingContract && char.pendingContract.id === pendingBefore.id) {
            const decline = char.pendingContract.approaches.find((a) => a.id === 'decline');
            char = decline ? resolveFixerContract(char, 'decline', rng) : { ...char, pendingContract: null };
          }
        } else char.pendingModal = null;
      }
    }
    if (choices === 0) row.quiet++;
    if (char.alive) char = endYear(char, rng);
  }
}

const f = (n, d) => (d ? (n / d).toFixed(2) : '-');
console.log(`\n${LIVES} lives, policy ${POLICY}: choices per lived year by age band`);
console.table(BANDS.map(([a, b], k) => { const r = rows[k]; return { ages: `${a}-${b}`, lifeYears: r.years, major: f(r.major, r.years), minor: f(r.minor, r.years), contract: f(r.contract, r.years), gateOffer: f(r.gate, r.years), dungeon: f(r.dungeon, r.years), under40Hp: r.years ? `${Math.round(r.hurt / r.years * 100)}%` : '-', causal: f(r.causal, r.years), quietYears: r.years ? `${Math.round(r.quiet / r.years * 100)}%` : '-' }; }));
const byId = {};
for (const e of entries) (byId[e.id] ||= []).push(e);
console.log('Dungeon entries: age at entry, HP at entry');
console.table(Object.entries(byId).map(([id, list]) => { const ages = list.map((e) => e.age).sort((x, y) => x - y); return { id, runs: list.length, minAge: ages[0], medianAge: ages[Math.floor(ages.length / 2)], under18: list.filter((e) => e.age < 18).length, enteredBelow40Hp: list.filter((e) => e.hp < 40).length }; }));
process.exit(0);
