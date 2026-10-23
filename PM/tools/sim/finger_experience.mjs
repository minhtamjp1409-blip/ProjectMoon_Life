/**
 * How much of its own story does a Finger member see compared with a Fixer? Forces each life into
 * the Syndicate (with the chosen Finger) or the Fixer track at 18, plays with random choices, and
 * counts scenes that only that track can receive.
 * Usage: node tools/sim/finger_experience.mjs [lives=120] [Thumb,Index,...|Fixer]
 */
import { createNewCharacter, resolveEventChoice, resolveDungeonChoice, getDungeonCurrentStage, isDungeonChoiceAvailable, createRNG, resolveFixerContract, ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { planYear, runDueItems, resolveMinor, endYear, LIFE_MINORS, LIFE_DAILIES } from '../../src/engine/yearPlanner.js';
import { choiceIsAvailable } from '../../src/engine/eventConditions.js';

const LIVES = Number(process.argv[2]) || 120;
const TRACKS = (process.argv[3] || 'Thumb,Index,Middle,Ring,Pinky,Fixer').split(',');
const jobsOf = (e) => e.jobs || e.need?.jobs || e.conditions?.jobs || [];
const fingerOf = (e) => e.need?.finger || e.finger || e.conditions?.finger || null;
const ownIds = (track) => {
  const pick = (list) => list.filter((e) => (track === 'Fixer' ? jobsOf(e).includes('Fixer') && !jobsOf(e).includes('Syndicate') : fingerOf(e) === track)).map((e) => e.id);
  return { major: new Set(pick(ALL_STORY_EVENTS)), minor: new Set(pick(LIFE_MINORS)), daily: new Set(pick(LIFE_DAILIES)) };
};
const pickChoice = (list, rng, char) => {
  const ok = (list || []).map((c, i) => i).filter((i) => choiceIsAvailable(list[i], char));
  return ok.length ? ok[Math.floor(rng() * ok.length)] : 0;
};
const out = {};
for (const track of TRACKS) {
  const own = ownIds(track);
  const stat = { ranks: [0, 0, 0, 0], merit: [], lives: 0, years: 0, major: 0, minor: 0, daily: 0, contracts: 0, uniq: new Set(), deaths: 0 };
  for (let i = 0; i < LIVES; i++) {
    const seed = `finger_${track}_${i}`;
    let char = createNewCharacter({ customName: `F${i}`, seed });
    const rng = createRNG(`${seed}:life`);
    let guard = 0; let forced = false;
    const seen = new Set();
    while (char.alive && char.age < 100 && guard++ < 200) {
      if (!forced && char.age >= 18) {
        forced = true;
        if (track === 'Fixer') { char.job = 'Fixer'; char.fixerGrade = 9; }
        else { char.job = 'Syndicate'; char.finger = track; char.fingerRank = 0; if (!char.flags.includes('HasAffiliation')) char.flags.push('HasAffiliation'); }
      }
      const inTrack = forced && char.alive && (track === 'Fixer' ? char.job === 'Fixer' : char.job === 'Syndicate' || char.flags.includes('Distorted'));
      planYear(char, rng);
      if (inTrack) stat.years++;
      for (let t = 0; t <= 100 && char.alive; t += 2) {
        const before = new Set((char.logs || []).map((l) => l.id));
        char = runDueItems(char, t, rng).char;
        if (inTrack) for (const l of char.logs || []) if (!before.has(l.id) && l.id) { const base = String(l.id).replace(/^log_(daily_)?/, ''); for (const d of own.daily) if (base.includes(d)) { stat.daily++; seen.add(d); break; } }
        let spin = 0;
        while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 8) {
          if (char.pendingEvent) { if (inTrack && own.major.has(char.pendingEvent.id)) { stat.major++; seen.add(char.pendingEvent.id); } char = resolveEventChoice(char, pickChoice(char.pendingEvent.choices, rng, char), rng); }
          else if (char.pendingDungeon) { const st = getDungeonCurrentStage(char.pendingDungeon); const u = st.choices.map((c, k) => k).filter((k) => isDungeonChoiceAvailable(st.choices[k], char)); char = resolveDungeonChoice(char, u[Math.floor(rng() * u.length)], rng).char; }
          else if (char.pendingMinor) { if (inTrack && own.minor.has(char.pendingMinor.id)) { stat.minor++; seen.add(char.pendingMinor.id); } const def = LIFE_MINORS.find((m) => m.id === char.pendingMinor.id); char = resolveMinor(char, pickChoice(def?.choices, rng, char), rng); }
          else if (char.pendingContract) { if (inTrack && track === 'Fixer') stat.contracts++; const ap = char.pendingContract.approaches; char = resolveFixerContract(char, ap[Math.floor(rng() * ap.length)].id, rng); }
          else char.pendingModal = null;
        }
      }
      if (char.alive) char = endYear(char, rng);
    }
    stat.lives++;
    if (track !== 'Fixer') { stat.ranks[Math.min(3, char.fingerRank || 0)]++; stat.merit.push(char.merit || 0); }
    seen.forEach((id) => stat.uniq.add(id));
    if (!char.alive) stat.deaths++;
  }
  const per10 = (n) => +(n / Math.max(1, stat.years) * 10).toFixed(2);
  out[track] = { lives: stat.lives, 'years in track': stat.years, 'major/10y': per10(stat.major), 'minor/10y': per10(stat.minor), 'daily/10y': per10(stat.daily), 'contracts/10y': per10(stat.contracts), 'own scenes /10y': per10(stat.major + stat.minor + stat.daily + stat.contracts), 'ranks 0/1/2/3': track === 'Fixer' ? '-' : stat.ranks.join('/'), 'distinct own scenes seen': stat.uniq.size, 'pool (own)': own.major.size + own.minor.size + own.daily.size };
}
console.table(out);
