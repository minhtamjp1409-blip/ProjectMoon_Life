/**
 * Balance report: plays N full lives with a random-choice policy and prints how
 * deaths, money, bonds and the supernatural funnels are distributed.
 * Usage: node balance_report.mjs [lives=600]
 */
import { createNewCharacter, resolveEventChoice, createRNG, resolveFixerContract } from './src/engine/gameEngine.js';
import { planYear, runDueItems, resolveMinor, endYear } from './src/engine/yearPlanner.js';

const LIVES = Number(process.argv[2] || 600);
const q = (arr, p) => (arr.length ? [...arr].sort((a, b) => a - b)[Math.min(arr.length - 1, Math.floor(arr.length * p))] : 0);
const bucket = (age) => (age < 1 ? '0 (before first year ends)' : age < 5 ? '1-4' : age < 12 ? '5-11' : age < 18 ? '12-17' : age < 30 ? '18-29' : age < 45 ? '30-44' : age < 60 ? '45-59' : '60+');

const deathBuckets = {};
const causes = {};
const lifespans = [];
const wealthAt = { 25: [], 35: [], 50: [] };
const bondAt30 = [];
let spouse = 0, child = 0, ego = 0, distorted = 0, carmen = 0, adults = 0, widowed = 0, usedSave = 0;
const eventsSeen = new Map();
const jobEnd = {};
const killers = {};
const names = new Set();
let namesTotal = 0;

for (let i = 0; i < LIVES; i++) {
  const seed = `bal_${i}_${Math.random()}`;
  let char = createNewCharacter({ customName: `S${i}`, seed });
  const rng = createRNG(`${seed}:life`);
  let guard = 0;
  let lastId = 'year-end';
  while (char.alive && char.age < 120 && guard++ < 200) {
    planYear(char, rng);
    for (let t = 0; t <= 100 && char.alive; t += 2) {
      char = runDueItems(char, t, rng).char;
      let spin = 0;
      while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingModal) && spin++ < 8) {
        if (char.pendingEvent) {
          lastId = char.pendingEvent.id; eventsSeen.set(char.pendingEvent.id, (eventsSeen.get(char.pendingEvent.id) || 0) + 1);
          char = resolveEventChoice(char, Math.floor(rng() * Math.max(1, char.pendingEvent.choices?.length || 1)), rng);
        } else if (char.pendingMinor) {
          lastId = char.pendingMinor.id; eventsSeen.set(char.pendingMinor.id, (eventsSeen.get(char.pendingMinor.id) || 0) + 1);
          const n = char.pendingMinor.choices?.length || 1;
          char = resolveMinor(char, Math.floor(rng() * n), rng);
        } else if (char.pendingContract) {
          const ids = char.pendingContract.approaches.map((a) => a.id);
          char = resolveFixerContract(char, ids[Math.floor(rng() * ids.length)], rng);
        } else {
          char.pendingModal = null;
        }
      }
    }
    if (char.alive) {
      if (wealthAt[char.age] && char.age >= 18) wealthAt[char.age].push(char.stats.wealth);
      if (char.age === 30) {
        const bonds = Object.values(char.npcs || {}).filter((n) => n && n.bond != null && !n.deceased).map((n) => n.bond);
        bondAt30.push(bonds.length ? Math.max(...bonds) : 0);
      }
      char = endYear(char, rng);
    }
  }
  lifespans.push(char.age);
  if (char.age < 60) { const kk = `${bucket(char.age)} :: ${lastId}`; killers[kk] = (killers[kk] || 0) + 1; }
  const b = bucket(char.age);
  deathBuckets[b] = (deathBuckets[b] || 0) + 1;
  const cause = (char.deathCauseVi || 'sá»‘ng Ä‘áº¿n cuá»‘i mÃ´ phá»ng').slice(0, 70);
  causes[cause] = (causes[cause] || 0) + 1;
  if (char.age >= 18) adults++;
  if (char.npcs?.spouse) spouse++;
  if (char.npcs?.child) child++;
  if (char.flags.includes('Widowed')) widowed++;
  if (char.flags.includes('EGOAwakened')) ego++;
  if (char.flags.includes('Distorted')) distorted++;
  if ((char.seenEvents || []).includes('ego_carmen_crossroad')) carmen++;
  if (char.usedDeathSave) usedSave++;
  jobEnd[char.job] = (jobEnd[char.job] || 0) + 1;
  for (const n of Object.values(char.npcs || {})) {
    if (n?.nameVi) { names.add(n.nameVi); namesTotal++; }
  }
}

const pct = (n, d = LIVES) => `${((100 * n) / d).toFixed(1)}%`;
console.log(`\n=== BALANCE REPORT, ${LIVES} lives ===`);
console.log('Death by age bucket:');
for (const k of ['0 (before first year ends)', '1-4', '5-11', '12-17', '18-29', '30-44', '45-59', '60+']) console.log(`  ${k.padEnd(28)} ${String(deathBuckets[k] || 0).padStart(4)}  ${pct(deathBuckets[k] || 0)}`);
console.log(`Lifespan p10/p25/median/p75/p90: ${q(lifespans, 0.1)} / ${q(lifespans, 0.25)} / ${q(lifespans, 0.5)} / ${q(lifespans, 0.75)} / ${q(lifespans, 0.9)}`);
console.log('Top death causes:');
Object.entries(causes).sort((a, b) => b[1] - a[1]).slice(0, 14).forEach(([c, n]) => console.log(`  ${String(n).padStart(4)}  ${c}`));
console.log(`Wealth quantiles (p10/med/p90) age25: ${q(wealthAt[25], 0.1)}/${q(wealthAt[25], 0.5)}/${q(wealthAt[25], 0.9)}  age35: ${q(wealthAt[35], 0.1)}/${q(wealthAt[35], 0.5)}/${q(wealthAt[35], 0.9)}  age50: ${q(wealthAt[50], 0.1)}/${q(wealthAt[50], 0.5)}/${q(wealthAt[50], 0.9)}`);
console.log(`Best bond at 30 (p25/med/p75/p90): ${q(bondAt30, 0.25)}/${q(bondAt30, 0.5)}/${q(bondAt30, 0.75)}/${q(bondAt30, 0.9)}  (n=${bondAt30.length})`);
console.log(`Married ${pct(spouse)}  Child ${pct(child)}  Widowed ${pct(widowed)}  Death-save used ${pct(usedSave)}`);
console.log(`E.G.O ${pct(ego)}  Distorted ${pct(distorted)}  Carmen crossroad ${pct(carmen)}`);
console.log('Top killers (bucket :: last decision before death):');
Object.entries(killers).sort((a, b) => b[1] - a[1]).slice(0, 18).forEach(([c, n]) => console.log(`  ${String(n).padStart(4)}  ${c}`));
console.log('Final jobs:', JSON.stringify(jobEnd));
console.log(`Distinct events seen: ${eventsSeen.size}; NPC name variety: ${names.size} distinct / ${namesTotal} NPCs`);


