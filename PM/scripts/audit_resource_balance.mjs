import { createNewCharacter, createRNG, resolveEventChoice, resolveFixerContract } from '../src/engine/gameEngine.js';
import { planYear, runPlanItem, resolveMinor, endYear } from '../src/engine/yearPlanner.js';
import { choiceIsAvailable } from '../src/engine/eventConditions.js';

const lives = Number(process.argv[2] || 300);
const stages = [
  { label: '0–17', from: 0, to: 17 },
  { label: '18–39', from: 18, to: 39 },
  { label: '40–59', from: 40, to: 59 },
  { label: '60+', from: 60, to: 140 }
];
const keys = ['health', 'sanity', 'wealth', 'network', 'rep', 'merit'];
const samples = Object.fromEntries(stages.map(({ label }) => [label, Object.fromEntries(keys.map((key) => [key, []]))]));
const deaths = {};
const elderRepByJob = {};
const choose = (items, char, rng) => {
  const possible = (items || []).map((item, index) => ({ item, index }))
    .filter(({ item }) => choiceIsAvailable(item, char));
  return possible.length ? possible[Math.floor(rng() * possible.length)].index : -1;
};
for (let life = 0; life < lives; life++) {
  const seed = `resource-balance-${life}`;
  const rng = createRNG(`${seed}:life`);
  let char = createNewCharacter({ seed });
  let guard = 0;
  while (char.alive && char.age < 140 && guard++ < 140) {
    const stage = stages.find(({ from, to }) => char.age >= from && char.age <= to);
    if (stage) for (const key of keys) samples[stage.label][key].push(key === 'merit' ? char.merit : char.stats[key]);
    if (char.age >= 40) (elderRepByJob[char.job] ||= []).push(char.stats.rep);
    if (!char.plan?.length) planYear(char, rng);
    for (const item of char.plan || []) {
      if (!char.alive) break;
      char = runPlanItem(char, item, rng);
      if (char.pendingEvent) char = resolveEventChoice(char, choose(char.pendingEvent.choices, char, rng), rng);
      if (char.pendingContract) {
        const options = char.pendingContract.approaches.filter((approach) => char.stats.wealth >= (approach.costAhn || 0));
        if (options.length) char = resolveFixerContract(char, options[Math.floor(rng() * options.length)].id, rng);
      }
      if (char.pendingMinor) char = resolveMinor(char, choose(char.pendingMinor.choices, char, rng), rng);
    }
    if (char.alive) char = endYear(char, rng);
  }
  const cause = char.deathCauseEn || (char.alive ? 'survived' : 'unknown');
  deaths[cause] = (deaths[cause] || 0) + 1;
}
const percentile = (values, p) => values[Math.floor((values.length - 1) * p)] ?? 0;
for (const [stage, resources] of Object.entries(samples)) {
  console.log(stage, `years=${resources.health.length}`);
  for (const [key, values] of Object.entries(resources)) {
    const sorted = [...values].sort((a, b) => a - b);
    const atZero = Math.round(values.filter((value) => value <= 0).length / Math.max(1, values.length) * 100);
    const atCap = Math.round(values.filter((value) => value >= 95).length / Math.max(1, values.length) * 100);
    console.log(`  ${key}: p10=${percentile(sorted, 0.1)} p50=${percentile(sorted, 0.5)} p90=${percentile(sorted, 0.9)} zero=${atZero}% nearCap=${atCap}%`);
  }
}
console.log('Deaths:', Object.entries(deaths).sort((a, b) => b[1] - a[1]).slice(0, 8));
console.log('Rep at age 40+ by job:', Object.fromEntries(Object.entries(elderRepByJob).map(([job, values]) =>
  [job, { years: values.length, nearCap: Math.round(values.filter((value) => value >= 95).length / values.length * 100) }])));
