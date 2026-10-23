/**
 * What does an adult life look like per career branch? Counts distinct major scenes, minor scenes
 * and adult years, so a thin branch shows up next to Fixer. Random-choice bot, so read it as relative.
 * Usage: node tools/sim/branch_experience.mjs [lives=600] [--watch=id,id]
 */
import { createNewCharacter, resolveEventChoice, resolveDungeonChoice, getDungeonCurrentStage, isDungeonChoiceAvailable, createRNG, resolveFixerContract } from '../../src/engine/gameEngine.js';
import { planYear, runDueItems, resolveMinor, endYear, LIFE_MINORS } from '../../src/engine/yearPlanner.js';
import { choiceIsAvailable } from '../../src/engine/eventConditions.js';

const LIVES = Number(process.argv[2]) || 600;
const pick = (list, rng, char) => {
  const ok = (list || []).map((c, i) => i).filter((i) => choiceIsAvailable(list[i], char));
  return ok.length ? ok[Math.floor(rng() * ok.length)] : 0;
};
const WATCH = (process.argv.find((a) => a.startsWith('--watch=')) || '').slice(8).split(',').filter(Boolean);
const watched = Object.fromEntries(WATCH.map((id) => [id, 0]));
const rows = {};
for (let i = 0; i < LIVES; i++) {
  const seed = `branch_${i}`;
  let char = createNewCharacter({ customName: `B${i}`, seed });
  const rng = createRNG(`${seed}:life`);
  const jobYears = {};
  const sceneByJob = {};
  let guard = 0;
  const seenWatch = new Set();
  while (char.alive && char.age < 120 && guard++ < 200) {
    planYear(char, rng);
    const job = char.age >= 18 ? (char.flags.includes('Distorted') ? 'Distortion' : char.job || 'none') : 'youth';
    if (job !== 'youth') jobYears[job] = (jobYears[job] || 0) + 1;
    for (let t = 0; t <= 100 && char.alive; t += 2) {
      char = runDueItems(char, t, rng).char;
      let spin = 0;
      while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 8) {
        const s = (sceneByJob[job] ||= { major: new Set(), minor: new Set() });
        if (char.pendingEvent) { s.major.add(char.pendingEvent.id); if (WATCH.includes(char.pendingEvent.id)) seenWatch.add(char.pendingEvent.id); char = resolveEventChoice(char, pick(char.pendingEvent.choices, rng, char), rng); }
        else if (char.pendingDungeon) {
          const st = getDungeonCurrentStage(char.pendingDungeon);
          const u = st.choices.map((c, k) => k).filter((k) => isDungeonChoiceAvailable(st.choices[k], char));
          char = resolveDungeonChoice(char, u[Math.floor(rng() * u.length)], rng).char;
        } else if (char.pendingMinor) {
          s.minor.add(char.pendingMinor.id);
          const def = LIFE_MINORS.find((m) => m.id === char.pendingMinor.id);
          char = resolveMinor(char, pick(def?.choices, rng, char), rng);
        } else if (char.pendingContract) {
          const ap = char.pendingContract.approaches;
          char = resolveFixerContract(char, ap[Math.floor(rng() * ap.length)].id, rng);
        } else char.pendingModal = null;
      }
    }
    if (char.alive) char = endYear(char, rng);
  }
  seenWatch.forEach((id) => watched[id]++);
  for (const [job, y] of Object.entries(jobYears)) {
    const r = (rows[job] ||= { lives: 0, years: 0, major: 0, minor: 0, uniqMajor: new Set() });
    r.lives++; r.years += y;
    r.major += sceneByJob[job]?.major.size || 0; r.minor += sceneByJob[job]?.minor.size || 0;
    sceneByJob[job]?.major.forEach((id) => r.uniqMajor.add(id));
  }
}
const out = {};
for (const [job, r] of Object.entries(rows)) {
  out[job] = { lives: r.lives, 'years/life': +(r.years / r.lives).toFixed(1), 'major/life': +(r.major / r.lives).toFixed(1), 'major/10y': +(r.major / r.years * 10).toFixed(1), 'minor/10y': +(r.minor / r.years * 10).toFixed(1), 'pool seen': r.uniqMajor.size };
}
console.table(out);
if (WATCH.length) console.log(`Lives (of ${LIVES}) that saw each watched scene:`, watched);
