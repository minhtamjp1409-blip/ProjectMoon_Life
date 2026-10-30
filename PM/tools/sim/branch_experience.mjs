/**
 * What does an adult life look like per career branch? Counts distinct major scenes, minor scenes
 * and adult years, so a thin branch shows up next to Fixer. Random-choice bot, so read it as relative.
 * Usage: node tools/sim/branch_experience.mjs [lives=500] [--watch=id,id] [--json=path]
 */
import { createNewCharacter, resolveEventChoice, resolveDungeonChoice, getDungeonCurrentStage, isDungeonChoiceAvailable, createRNG, resolveFixerContract } from '../../src/engine/gameEngine.js';
import { planYear, chooseDirectorPacedLead, runDueItems, resolveMinor, endYear, LIFE_MINORS } from '../../src/engine/yearPlanner.js';
import { tabooGainOf } from '../../src/engine/forbiddenPath.js';
import { choiceIsAvailable } from '../../src/engine/eventConditions.js';
import { writeFileSync } from 'node:fs';

const LIVES = Number(process.argv[2]) || 500;
const pick = (list, rng, char) => {
  const ok = (list || []).map((c, i) => i).filter((i) => choiceIsAvailable(list[i], char));
  return ok.length ? ok[Math.floor(rng() * ok.length)] : -1;
};
const WATCH = (process.argv.find((a) => a.startsWith('--watch=')) || '').slice(8).split(',').filter(Boolean);
const REPORT_PATH = (process.argv.find((a) => a.startsWith('--json=')) || '').slice(7);
const watched = Object.fromEntries(WATCH.map((id) => [id, 0]));
const rows = {};
const lifeRows = [];
const ageBand = (age) => age < 30 ? '18-29' : age < 45 ? '30-44' : age < 60 ? '45-59' : '60+';
const percentile = (values, p) => values.length ? [...values].sort((a, b) => a - b)[Math.min(values.length - 1, Math.floor(values.length * p))] : null;
const careerState = (char) => [char.job, char.fixerGrade, char.finger, char.fingerRank, char.wingRank, char.syndicateRank,
  char.flags.includes('ColorFixer'), char.flags.includes('EGOAwakened'), char.flags.includes('Distorted')].join('|');
const relationshipState = (char) => Object.entries(char.npcs || {}).sort(([a], [b]) => a.localeCompare(b))
  .map(([role, npc]) => `${role}:${npc?.fate || ''}:${Math.floor((npc?.bond || 0) / 20)}`).join('|');
for (let i = 0; i < LIVES; i++) {
  const seed = `branch_${i}`;
  let char = createNewCharacter({ customName: `B${i}`, seed });
  const rng = createRNG(`${seed}:life`);
  const jobYears = {};
  const sceneByJob = {};
  const lifeDetails = {};
  const seenMajor = new Set();
  const seenMinor = new Set();
  let guard = 0;
  const seenWatch = new Set();
  while (char.alive && char.age < 120 && guard++ < 200) {
    if (!char.plan?.length) planYear(char, rng);
    if (char.pendingLead) char = chooseDirectorPacedLead(char, rng);
    const yearAge = char.age;
    const job = char.age >= 18 ? (char.flags.includes('Distorted') ? 'Distortion' : char.job || 'none') : 'youth';
    if (job !== 'youth') jobYears[job] = (jobYears[job] || 0) + 1;
    const detail = (lifeDetails[job] ||= { major: 0, minor: 0, repeatedMajor: 0, repeatedMinor: 0, quietYears: 0, stalledYears: 0, ageBands: {} });
    const beforeCareer = careerState(char);
    const beforeRelationships = relationshipState(char);
    let yearMajor = 0;
    let yearMinor = 0;
    let yearOther = 0;
    for (let t = 0; t <= 100 && char.alive; t += 2) {
      char = runDueItems(char, t, rng).char;
      let spin = 0;
      while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 8) {
        const s = (sceneByJob[job] ||= { major: new Set(), minor: new Set() });
        if (char.pendingEvent) {
          const id = char.pendingEvent.id;
          s.major.add(id);
          detail.major++;
          yearMajor++;
          if (seenMajor.has(id)) detail.repeatedMajor++;
          seenMajor.add(id);
          if (WATCH.includes(id)) seenWatch.add(id);
          char = resolveEventChoice(char, pick(char.pendingEvent.choices, rng, char), rng);
        }
        else if (char.pendingDungeon) {
          yearOther++;
          const st = getDungeonCurrentStage(char.pendingDungeon);
          const u = st.choices.map((c, k) => k).filter((k) => isDungeonChoiceAvailable(st.choices[k], char));
          char = resolveDungeonChoice(char, u[Math.floor(rng() * u.length)], rng).char;
        } else if (char.pendingMinor) {
          const id = char.pendingMinor.id;
          s.minor.add(id);
          detail.minor++;
          yearMinor++;
          if (seenMinor.has(id)) detail.repeatedMinor++;
          seenMinor.add(id);
          const def = LIFE_MINORS.find((m) => m.id === char.pendingMinor.id);
          const safeChoices = (def?.choices || []).map((choice, index) => choiceIsAvailable(choice, char) && !tabooGainOf(choice) ? index : -1).filter((index) => index >= 0);
          char = resolveMinor(char, safeChoices.length ? safeChoices[Math.floor(rng() * safeChoices.length)] : -1, rng);
        } else if (char.pendingContract) {
          yearOther++;
          const ap = char.pendingContract.approaches;
          char = resolveFixerContract(char, ap[Math.floor(rng() * ap.length)].id, rng);
        } else char.pendingModal = null;
      }
    }
    if (char.alive) char = endYear(char, rng);
    if (job !== 'youth') {
      if (!yearMajor && !yearMinor && !yearOther) detail.quietYears++;
      if (careerState(char) === beforeCareer && relationshipState(char) === beforeRelationships) detail.stalledYears++;
      const band = ageBand(yearAge);
      detail.ageBands[band] = (detail.ageBands[band] || 0) + 1;
    }
  }
  seenWatch.forEach((id) => watched[id]++);
  lifeRows.push({ seed, exitAge: char.age, aliveAtLimit: char.alive, finalJob: char.job,
    routes: Object.fromEntries(Object.entries(lifeDetails).filter(([job]) => job !== 'youth').map(([job, row]) => [job, {
      ...row, years: jobYears[job] || 0, majorIds: [...(sceneByJob[job]?.major || [])], minorIds: [...(sceneByJob[job]?.minor || [])]
    }])),
    openThreadIds: (char.weaver?.pendingThreads || []).filter((thread) => !thread.fulfilled).map((thread) => thread.id) });
  for (const [job, y] of Object.entries(jobYears)) {
    const r = (rows[job] ||= { lives: 0, years: 0, major: 0, minor: 0, uniqMajor: new Set(), majorCounts: [], yearsCounts: [],
      majorEvents: 0, minorEvents: 0, repeatedMajor: 0, repeatedMinor: 0, quietYears: 0, stalledYears: 0, ageBands: {}, unresolvedThreads: 0 });
    r.lives++; r.years += y;
    r.major += sceneByJob[job]?.major.size || 0; r.minor += sceneByJob[job]?.minor.size || 0;
    r.majorCounts.push(lifeDetails[job]?.major || 0);
    r.yearsCounts.push(y);
    for (const key of ['majorEvents', 'minorEvents', 'repeatedMajor', 'repeatedMinor', 'quietYears', 'stalledYears']) {
      r[key] += lifeDetails[job]?.[key === 'majorEvents' ? 'major' : key === 'minorEvents' ? 'minor' : key] || 0;
    }
    for (const [band, count] of Object.entries(lifeDetails[job]?.ageBands || {})) r.ageBands[band] = (r.ageBands[band] || 0) + count;
    if (job === (char.flags.includes('Distorted') ? 'Distortion' : char.job)) {
      r.unresolvedThreads += (char.weaver?.pendingThreads || []).filter((thread) => !thread.fulfilled).length;
    }
    sceneByJob[job]?.major.forEach((id) => r.uniqMajor.add(id));
  }
}
const out = {};
for (const [job, r] of Object.entries(rows)) {
  out[job] = { lives: r.lives, 'years/life': +(r.years / r.lives).toFixed(1), 'major/life': +(r.major / r.lives).toFixed(1), 'major/10y': +(r.major / r.years * 10).toFixed(1), 'minor/10y': +(r.minor / r.years * 10).toFixed(1), 'pool seen': r.uniqMajor.size };
}
console.table(out);
const detail = Object.fromEntries(Object.entries(rows).map(([job, r]) => [job, {
  lives: r.lives, years: r.years, majorEvents: r.majorEvents, minorEvents: r.minorEvents,
  majorPer10Years: +(r.majorEvents / r.years * 10).toFixed(1),
  minorPer10Years: +(r.minorEvents / r.years * 10).toFixed(1),
  repeatedMajor: r.repeatedMajor, repeatedMinor: r.repeatedMinor,
  quietYearPct: +(r.quietYears / r.years * 100).toFixed(1),
  stalledYearPct: +(r.stalledYears / r.years * 100).toFixed(1),
  majorPerLifeP10: percentile(r.majorCounts, 0.1), majorPerLifeMedian: percentile(r.majorCounts, 0.5), majorPerLifeP90: percentile(r.majorCounts, 0.9),
  yearsPerLifeP10: percentile(r.yearsCounts, 0.1), yearsPerLifeMedian: percentile(r.yearsCounts, 0.5), yearsPerLifeP90: percentile(r.yearsCounts, 0.9),
  ageBands: r.ageBands, unresolvedThreadsAtExit: r.unresolvedThreads
}]));
console.table(Object.fromEntries(Object.entries(detail).map(([job, r]) => [job, {
  lives: r.lives, 'major/10y': r.majorPer10Years, 'minor/10y': r.minorPer10Years,
  'repeated majors': r.repeatedMajor, 'quiet years %': r.quietYearPct, 'stalled years %': r.stalledYearPct,
  'major/life p10-med-p90': `${r.majorPerLifeP10}-${r.majorPerLifeMedian}-${r.majorPerLifeP90}`
}])));
if (REPORT_PATH) writeFileSync(REPORT_PATH, `${JSON.stringify({ lives: LIVES, seedPrefix: 'branch_', policy: 'random', note: 'Events belong to the job at the start of each year; unresolved threads at exit include death.', routes: detail, lifeRows }, null, 2)}\n`);
if (WATCH.length) console.log(`Lives (of ${LIVES}) that saw each watched scene:`, watched);
