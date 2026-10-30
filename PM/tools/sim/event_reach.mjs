/**
 * Event reach: plays N lives and reports which major events a player actually meets, and how often a year
 * leaves the character's standing unchanged, per route.
 * Usage: node tools/sim/event_reach.mjs [lives=300] [--routes] [--json=path]
 *   --events=prefix: also prints how many lives met each event whose id starts with the prefix
 *   --routes: rotates lives through Fixer, Syndicate, Wing Employee and a natural start, so thin routes get enough lives
 * Standing counts as changed when the job, a rank or grade, a Distortion stage, a lasting life flag or an NPC's status moved during the year.
 * This is a coverage probe with a random player. It does not prove balance.
 */
import { createNewCharacter, resolveEventChoice, resolveDungeonChoice, getDungeonCurrentStage, isDungeonChoiceAvailable, createRNG, resolveFixerContract, ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { planYear, chooseDirectorPacedLead, runDueItems, resolveMinor, endYear } from '../../src/engine/yearPlanner.js';
import { choiceIsAvailable } from '../../src/engine/eventConditions.js';
import { writeFileSync } from 'node:fs';

const LIVES = Number(process.argv[2]) || 300;
const ROTATE = process.argv.includes('--routes');
const PREFIX = (process.argv.find((arg) => arg.startsWith('--events=')) || '').slice(9);
const JSON_OUT = (process.argv.find((arg) => arg.startsWith('--json=')) || '').slice(7);
const ROUTES = ['Fixer', 'Syndicate', 'Wing Employee', null];

// Distortion has no rank ladder, so its stages and the lasting life flags count as standing too
const LASTING = /^(Distortion|Living|StarOfTheCity|Married|HasChild|Widowed|Own|Sworn|Finger|Independent|WingDesk|WingOwed|WingClean|WingSold|WingReturned|WingBurned)/;
const standing = (c) => JSON.stringify([
  c.job, c.fixerGrade, c.fingerRank, c.wingRank, c.syndicateRank, c.flags.includes('Distorted'), c.flags.includes('ColorFixer'),
  c.flags.filter((f) => LASTING.test(f)).sort().join(','),
  Object.values(c.npcs || {}).filter(Boolean).map((n) => n.status || (n.deceased ? 'dead' : 'ok')).join(',')
]);

const majors = ALL_STORY_EVENTS.filter((e) => e.major);
const seenCount = new Map();
const route = {};
const row = (job) => (route[job] ||= { years: 0, still: 0, lives: 0 });

for (let i = 0; i < LIVES; i++) {
  const seed = `reach_${i}`;
  let char = createNewCharacter({ customName: `R${i}`, seed });
  const rng = createRNG(`${seed}:life`);
  const forced = ROTATE ? ROUTES[i % ROUTES.length] : null;
  let forcedDone = false;
  const jobsSeen = new Set();
  let guard = 0;
  while (char.alive && char.age < 120 && guard++ < 200) {
    if (forced && !forcedDone && char.age >= 18) {
      forcedDone = true;
      char.job = forced;
      if (forced === 'Fixer') char.fixerGrade = 9;
      if (forced === 'Syndicate') char.syndicateRank = 0;
      if (forced === 'Wing Employee') { char.wingRank = 0; char.wingEmployerId = char.regionId; }
    }
    const startOfYear = standing(char);
    const jobAtStart = char.job;
    if (!char.plan?.length) planYear(char, rng);
    if (char.pendingLead) char = chooseDirectorPacedLead(char, rng);
    for (let t = 0; t <= 100 && char.alive; t += 2) {
      char = runDueItems(char, t, rng).char;
      let spin = 0;
      while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 8) {
        if (char.pendingEvent) {
          const ok = (char.pendingEvent.choices || []).map((c, k) => k).filter((k) => choiceIsAvailable(char.pendingEvent.choices[k], char));
          char = resolveEventChoice(char, ok.length ? ok[Math.floor(rng() * ok.length)] : 0, rng);
        } else if (char.pendingDungeon) {
          const stage = getDungeonCurrentStage(char.pendingDungeon);
          const usable = stage.choices.map((c, k) => k).filter((k) => isDungeonChoiceAvailable(stage.choices[k], char));
          char = resolveDungeonChoice(char, usable[Math.floor(rng() * usable.length)], rng).char;
        } else if (char.pendingMinor) {
          const ok = (char.pendingMinor.choices || []).map((c, k) => k).filter((k) => choiceIsAvailable(char.pendingMinor.choices[k], char));
          char = resolveMinor(char, ok.length ? ok[Math.floor(rng() * ok.length)] : -1, rng);
        } else if (char.pendingContract) {
          const ap = char.pendingContract.approaches;
          char = resolveFixerContract(char, ap[Math.floor(rng() * ap.length)].id, rng);
        } else {
          char.pendingModal = null;
        }
      }
    }
    if (char.alive) char = endYear(char, rng);
    if (char.age >= 18) {
      const r = row(jobAtStart);
      r.years++;
      if (standing(char) === startOfYear) r.still++;
      jobsSeen.add(jobAtStart);
    }
  }
  for (const id of new Set(char.seenEvents || [])) seenCount.set(id, (seenCount.get(id) || 0) + 1);
  for (const job of jobsSeen) row(job).lives++;
}

const unseen = majors.filter((e) => !seenCount.has(e.id));
const gate = (e) => (e.jobs?.length ? e.jobs.join('/') : e.need?.jobs?.join?.('/') || 'any job');
const unseenByJob = {};
for (const e of unseen) unseenByJob[gate(e)] = (unseenByJob[gate(e)] || 0) + 1;

console.log(`Lives ${LIVES}${ROTATE ? ' (route rotation)' : ''}. Major events in the pool: ${majors.length}`);
console.log(`Met at least once: ${majors.length - unseen.length} (${Math.round(((majors.length - unseen.length) / majors.length) * 100)}%). Never met: ${unseen.length}`);
console.log('\nYears with no change of standing, by route (adult years):');
for (const [job, r] of Object.entries(route).sort((a, b) => b[1].years - a[1].years)) {
  if (r.years < 50) continue;
  console.log(`  ${job.padEnd(14)} ${String(r.years).padStart(6)} years in ${String(r.lives).padStart(4)} lives   unchanged ${Math.round((r.still / r.years) * 1000) / 10}%`);
}
console.log('\nMajor events never met, by the job they are written for:');
for (const [job, n] of Object.entries(unseenByJob).sort((a, b) => b[1] - a[1])) console.log(`  ${job.padEnd(28)} ${n}`);

if (PREFIX) {
  console.log(`
Lives that met events starting with ${PREFIX}:`);
  for (const e of ALL_STORY_EVENTS.filter((x) => x.id.startsWith(PREFIX))) console.log(`  ${e.id.padEnd(40)} ${seenCount.get(e.id) || 0}`);
}

if (JSON_OUT) {
  writeFileSync(JSON_OUT, JSON.stringify({ lives: LIVES, majors: majors.length, unseen: unseen.map((e) => ({ id: e.id, gate: gate(e), age: e.age })), route }, null, 1));
  console.log(`\nWrote ${JSON_OUT}`);
}
