/**
 * Dungeon reach: which dungeons a life is sent into, through which event, and how the Hana exams end.
 * Usage: node tools/sim/dungeon_reach.mjs [lives=300] [--route=Fixer|Syndicate|Wing Employee] [--policy=random|greedy|focused]  (default random: greedy and focused decline dungeon gates whenever declining pays, which hides the pool)
 *   Counts each dungeon start once, with the event that opened it (a gate, a story event, or none).
 *   Counts every Fixer promotion exam and every death in one, by the Grade being sat.
 * A probe with a simulated player; it shows where the pool is lopsided, it does not decide what is right.
 */
import { createNewCharacter, createRNG } from '../../src/engine/gameEngine.js';
import { makePicker, POLICIES } from './lib/choicePolicy.mjs';
import { playYear, forceRoute } from './lib/playYear.mjs';

const arg = (name, fallback) => (process.argv.find((a) => a.startsWith(`--${name}=`)) || `--${name}=${fallback}`).split('=').slice(1).join('=');
const LIVES = Number(process.argv[2]) || 300;
const ROUTE = arg('route', '');
const POLICY = arg('policy', 'random');
if (!POLICIES.includes(POLICY)) throw new Error(`--policy must be one of ${POLICIES.join(', ')}`);
const pickIndex = makePicker(POLICY);

const starts = {};            // dungeon -> { n, via: { eventId|'(no event)': n } }
const exams = {};             // grade -> { sat, died, passed }
let lives = 0, deaths = 0, examDeaths = 0, livesWithDungeon = 0;
const causes = {};

for (let i = 0; i < LIVES; i++) {
  const seed = `dun_${i}`;
  let char = createNewCharacter({ customName: `D${i}`, seed });
  const rng = createRNG(`${seed}:life`);
  let routed = !ROUTE, guard = 0, lastEvent = null, sawDungeon = false, sitting = null;
  const counted = new Set();
  while (char.alive && char.age < 120 && guard++ < 200) {
    if (!routed && forceRoute(char, ROUTE)) routed = true;
    const wasAlive = char.alive;
    char = playYear(char, rng, pickIndex, (c, kind, id) => {
      if (kind === 'event') {
        lastEvent = id;
        const promo = /^fixer_promo_g(\d)/.exec(id);
        sitting = promo ? Number(promo[1]) : null;
        if (promo) (exams[sitting] ||= { sat: 0, died: 0 }).sat++;
      } else if (kind === 'dungeon') {
        const key = `${c.pendingDungeon.id}|${c.age}`;
        if (!counted.has(key) && !counted.has(c.pendingDungeon.id)) {
          counted.add(c.pendingDungeon.id); counted.add(key);
          const row = (starts[c.pendingDungeon.id] ||= { n: 0, via: {} });
          row.n++; row.via[lastEvent || '(no event)'] = (row.via[lastEvent || '(no event)'] || 0) + 1;
          sawDungeon = true;
        }
      }
    });
    if (wasAlive && !char.alive && sitting != null) { exams[sitting].died++; examDeaths++; }
    if (!char.alive) sitting = null;
  }
  lives++; if (sawDungeon) livesWithDungeon++;
  if (!char.alive) { deaths++; const c = char.deathCause || char.causeOfDeath || char.death?.cause || '(unrecorded)'; causes[String(c).slice(0, 48)] = (causes[String(c).slice(0, 48)] || 0) + 1; }
}

const total = Object.values(starts).reduce((s, r) => s + r.n, 0);
console.log(`Lives ${lives}${ROUTE ? `, route ${ROUTE}` : ''}, policy ${POLICY}. Lives that entered a dungeon: ${livesWithDungeon}. Dungeon starts: ${total}`);
console.log('\nDungeon starts:');
for (const [id, r] of Object.entries(starts).sort((a, b) => b[1].n - a[1].n)) {
  const top = Object.entries(r.via).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([e, n]) => `${e} ${n}`).join(', ');
  console.log(`  ${id.replace('dungeon_', '').padEnd(22)} ${String(r.n).padStart(4)}  ${String(Math.round((r.n / total) * 100)).padStart(3)}%   via ${top}`);
}
console.log('\nHana promotion exams, by the Grade being sat:');
for (const [g, r] of Object.entries(exams).sort((a, b) => Number(b[0]) - Number(a[0]))) {
  console.log(`  Grade ${g}  sat ${String(r.sat).padStart(4)}  died in the exam ${String(r.died).padStart(3)}  (${Math.round((r.died / r.sat) * 1000) / 10}%)`);
}
console.log(`\nDeaths ${deaths} of ${lives} lives; ${examDeaths} in a promotion exam (${deaths ? Math.round((examDeaths / deaths) * 100) : 0}% of deaths).`);
