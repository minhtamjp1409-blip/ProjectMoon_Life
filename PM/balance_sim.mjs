/**
 * Balance harness: plays N lives with fixed seeds so two runs differ only by what changed in the game.
 * Usage: node balance_sim.mjs [lives=1500] [policy=random|greedy] [--regions]
 *   random: picks any choice (a naive player)
 *   greedy: picks the choice with the best summed visible effect (a careful player)
 * Reports lifespan against each District's avgLife, every resource by age, how often a
 * resource sits on its floor or cap, and which kind of moment moves each resource.
 */
import { createNewCharacter, resolveEventChoice, createRNG, resolveFixerContract } from './src/engine/gameEngine.js';
import { planYear, runDueItems, resolveMinor, endYear, LIFE_MINORS } from './src/engine/yearPlanner.js';
import { REGIONS } from './src/data/worldData.js';
import { choiceIsAvailable } from './src/engine/eventConditions.js';

const LIVES = Number(process.argv[2]) || 1500;
const POLICY = process.argv[3] === 'greedy' ? 'greedy' : 'random';
const SHOW_REGIONS = process.argv.includes('--regions');

const KEYS = ['health', 'sanity', 'wealth', 'network', 'rep', 'heat', 'taboo', 'resonance', 'merit'];
const AGES = [10, 18, 25, 35, 50, 65];
const snap = (c) => ({
  health: c.stats.health, sanity: c.stats.sanity, wealth: c.stats.wealth, network: c.stats.network, rep: c.stats.rep,
  heat: c.heat || 0, taboo: c.taboo || 0, resonance: c.resonance || 0, merit: c.merit || 0
});
const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);
const q = (arr, p) => (arr.length ? [...arr].sort((a, b) => a - b)[Math.min(arr.length - 1, Math.floor(arr.length * p))] : 0);
const f1 = (x) => (Math.round(x * 10) / 10).toString();

const WEIGHT = { health: 1.2, sanity: 1, wealth: 0.8, network: 0.5, rep: 0.6, heat: -0.7, taboo: -3, resonance: -0.3, merit: 0.4 };
const fxScore = (fx = {}) => Object.entries(fx).reduce((s, [k, v]) => s + (WEIGHT[k] || 0) * v, 0);
function choiceScore(ch) {
  const rows = ch.out || ch.outcomes;
  if (Array.isArray(rows) && rows.length) {
    const total = rows.reduce((s, o) => s + (o.w ?? 50), 0) || 1;
    return rows.reduce((s, o) => s + ((o.w ?? 50) / total) * fxScore(o.fx || o.effects), 0) + fxScore(ch.fx || ch.effects);
  }
  return fxScore(ch.fx || ch.effects);
}
// A player can only pick what the screen offers
const pickIndex = (choices, rng, char) => {
  const ok = (choices || []).map((c, i) => i).filter((i) => choiceIsAvailable(choices[i], char));
  if (!ok.length) return -1;
  if (POLICY === 'random') return ok[Math.floor(rng() * ok.length)];
  return ok.reduce((b, i) => (choiceScore(choices[i]) > choiceScore(choices[b]) ? i : b), ok[0]);
};

const flow = {};            // op -> key -> summed delta
const addFlow = (op, a, b) => {
  const row = (flow[op] ||= {});
  for (const k of KEYS) row[k] = (row[k] || 0) + (b[k] - a[k]);
};
const atAge = {};           // age -> key -> [values]
const lifespans = [];
const byRegion = {};
const buckets = {};
const causes = {};
const endState = {};
const ladder = { fixers: 0, g5: [], g3: [], g1: [], color: [] };
const outcomes = { distorted: 0, ego: 0, color: 0, grade1: 0, adults: 0, jobs: {}, carmen: 0, married: 0, child: 0 };
let years = 0;
const bucketOf = (age) => (age < 1 ? '0' : age < 5 ? '1-4' : age < 12 ? '5-11' : age < 18 ? '12-17' : age < 30 ? '18-29' : age < 45 ? '30-44' : age < 60 ? '45-59' : '60+');

for (let i = 0; i < LIVES; i++) {
  const seed = `bal_fixed_${i}`;
  let char = createNewCharacter({ customName: `S${i}`, seed });
  const rng = createRNG(`${seed}:life`);
  let guard = 0;
  const seenG = new Set();
  let wasFixer = false;
  while (char.alive && char.age < 120 && guard++ < 200) {
    if (char.job === 'Fixer') wasFixer = true;
    years++;
    planYear(char, rng);
    for (let t = 0; t <= 100 && char.alive; t += 2) {
      let before = snap(char);
      const planned = char.plan?.[char.planCursor || 0];
      const res = runDueItems(char, t, rng);
      char = res.char;
      if (res.changed) { addFlow(planned?.kind || 'plan', before, snap(char)); }
      let spin = 0;
      while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingModal) && spin++ < 8) {
        before = snap(char);
        if (char.pendingEvent) {
          char = resolveEventChoice(char, Math.max(0, pickIndex(char.pendingEvent.choices, rng, char)), rng);
          addFlow('major', before, snap(char));
        } else if (char.pendingMinor) {
          const def = LIFE_MINORS.find((m) => m.id === char.pendingMinor.id);
          char = resolveMinor(char, pickIndex(def?.choices, rng, char), rng);
          addFlow('minor', before, snap(char));
        } else if (char.pendingContract) {
          const ap = char.pendingContract.approaches;
          const pick = POLICY === 'random' ? ap[Math.floor(rng() * ap.length)] : ap.filter((a) => a.id !== 'decline').sort((a, b) => b.successPct - a.successPct)[0];
          char = resolveFixerContract(char, pick.id, rng);
          addFlow('contract', before, snap(char));
        } else {
          char.pendingModal = null;
        }
      }
    }
    if (char.alive && char.job === 'Fixer') {
      const g = char.fixerGrade;
      if (g <= 5 && !seenG.has(5)) { seenG.add(5); ladder.g5.push(char.age); }
      if (g <= 3 && !seenG.has(3)) { seenG.add(3); ladder.g3.push(char.age); }
      if (g <= 1 && !seenG.has(1)) { seenG.add(1); ladder.g1.push(char.age); }
      if (char.flags.includes('ColorFixer') && !seenG.has(0)) { seenG.add(0); ladder.color.push(char.age); }
    }
    if (char.alive) {
      if (AGES.includes(char.age)) {
        const s = snap(char);
        const row = (atAge[char.age] ||= {});
        for (const k of KEYS) (row[k] ||= []).push(s[k]);
      }
      const before = snap(char);
      char = endYear(char, rng);
      addFlow('endYear', before, snap(char));
    }
  }
  if (wasFixer || char.job === 'Fixer') ladder.fixers++;
  lifespans.push(char.age);
  if (char.age >= 18) {
    outcomes.adults++;
    outcomes.jobs[char.job] = (outcomes.jobs[char.job] || 0) + 1;
  }
  if (char.flags.includes('Distorted')) outcomes.distorted++;
  if (char.flags.includes('EGOAwakened')) outcomes.ego++;
  if (char.flags.includes('ColorFixer')) outcomes.color++;
  if (char.job === 'Fixer' && char.fixerGrade === 1) outcomes.grade1++;
  if ((char.seenEvents || []).includes('ego_carmen_crossroad')) outcomes.carmen++;
  if (char.npcs?.spouse) outcomes.married++;
  if (char.npcs?.child) outcomes.child++;
  (byRegion[char.regionId] ||= []).push(char.age);
  buckets[bucketOf(char.age)] = (buckets[bucketOf(char.age)] || 0) + 1;
  const c = (char.deathCauseVi || 'sống đến cuối mô phỏng').slice(0, 48);
  causes[c] = (causes[c] || 0) + 1;
  const s = snap(char);
  for (const k of ['health', 'sanity', 'wealth', 'network', 'rep']) {
    const row = (endState[k] ||= { floor: 0, cap: 0 });
    if (s[k] <= 0) row.floor++;
    if (s[k] >= 100) row.cap++;
  }
  for (const k of ['heat', 'resonance']) {
    const row = (endState[k] ||= { floor: 0, cap: 0 });
    if (s[k] >= 100) row.cap++;
  }
}

console.log(`\n=== BALANCE, ${LIVES} lives, policy=${POLICY} ===`);
console.log(`Lifespan mean ${f1(mean(lifespans))}  p10/p25/med/p75/p90: ${[0.1, 0.25, 0.5, 0.75, 0.9].map((p) => q(lifespans, p)).join(' / ')}`);

const lorePairs = REGIONS.filter((r) => byRegion[r.id]?.length >= 8);
const loreMean = mean(lorePairs.map((r) => r.avgLife));
const simMean = mean(lorePairs.map((r) => mean(byRegion[r.id])));
console.log(`Districts (n>=8): lore avgLife mean ${f1(loreMean)}  sim mean ${f1(simMean)}  ratio ${f1((simMean / loreMean) * 100)}%`);
if (SHOW_REGIONS) {
  for (const r of lorePairs.sort((a, b) => a.avgLife - b.avgLife)) console.log(`  ${String(r.id).padEnd(9)} lore ${String(r.avgLife).padStart(3)}  sim ${f1(mean(byRegion[r.id])).padStart(5)}  n=${byRegion[r.id].length}`);
}
console.log('Deaths by age:', ['0', '1-4', '5-11', '12-17', '18-29', '30-44', '45-59', '60+'].map((b) => `${b}:${((100 * (buckets[b] || 0)) / LIVES).toFixed(1)}%`).join('  '));
console.log('Top causes:', Object.entries(causes).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([c, n]) => `${c} (${n})`).join(' | '));

const pc = (n, d = LIVES) => `${((100 * n) / d).toFixed(1)}%`;
console.log(`Outcomes: Distorted ${pc(outcomes.distorted)}  E.G.O ${pc(outcomes.ego)}  Carmen crossroad ${pc(outcomes.carmen)}  Color ${pc(outcomes.color)}  Fixer Grade1 ${pc(outcomes.grade1)}  Spouse ${pc(outcomes.married)}  Child ${pc(outcomes.child)}`);
const med = (a) => (a.length ? q(a, 0.5) : '-');
console.log(`Fixer ladder (of ${ladder.fixers} Fixers): Grade<=5 ${pc(ladder.g5.length, ladder.fixers)} (median age ${med(ladder.g5)})  Grade<=3 ${pc(ladder.g3.length, ladder.fixers)} (${med(ladder.g3)})  Grade<=1 ${pc(ladder.g1.length, ladder.fixers)} (${med(ladder.g1)})  Color ${pc(ladder.color.length, ladder.fixers)} (${med(ladder.color)})`);
console.log('Adult jobs:', Object.entries(outcomes.jobs).map(([j, n]) => `${j} ${pc(n, outcomes.adults)}`).join('  '));
console.log('\nResource by age (mean [p10-p90]) among the living');
console.log('age   ' + KEYS.map((k) => k.padEnd(14)).join(''));
for (const a of AGES) {
  const row = atAge[a];
  if (!row) continue;
  console.log(String(a).padEnd(6) + KEYS.map((k) => `${f1(mean(row[k]))} [${q(row[k], 0.1)}-${q(row[k], 0.9)}]`.padEnd(14)).join('') + `  n=${row.health.length}`);
}

console.log('\nAt death: share of lives with the resource on its floor / cap');
for (const [k, v] of Object.entries(endState)) console.log(`  ${k.padEnd(10)} floor ${((100 * v.floor) / LIVES).toFixed(1)}%  cap ${((100 * v.cap) / LIVES).toFixed(1)}%`);

console.log('\nNet change per life-year by moment kind (what moves each resource)');
console.log('kind'.padEnd(10) + KEYS.map((k) => k.padEnd(10)).join(''));
for (const [op, row] of Object.entries(flow)) console.log(op.padEnd(10) + KEYS.map((k) => (row[k] / years >= 0 ? '+' : '') + (row[k] / years).toFixed(2).padEnd(9)).join(''));
const total = KEYS.map((k) => Object.values(flow).reduce((s, r) => s + r[k], 0) / years);
console.log('TOTAL'.padEnd(10) + total.map((v) => ((v >= 0 ? '+' : '') + v.toFixed(2)).padEnd(10)).join(''));
console.log(`(${years} simulated life-years)`);
