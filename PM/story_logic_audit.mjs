/**
 * Story logic + variety audit. Plays N seeded lives and reports
 *   - logic violations (see src/engine/storyInvariants.js), each with a seed and age to replay
 *   - variety: distinct moments per life, overlap between lives, repetition inside a life,
 *     and which entries never fire
 * Usage: node story_logic_audit.mjs [lives=500] [policy=random|greedy]
 * Exit code 1 when any logic violation is found.
 */
import { createNewCharacter, resolveEventChoice, createRNG, resolveFixerContract, ALL_STORY_EVENTS } from './src/engine/gameEngine.js';
import { planYear, runDueItems, resolveMinor, endYear, LIFE_MINORS, LIFE_DAILIES } from './src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from './src/data/eventsChildhood.js';
import { choiceIsAvailable } from './src/engine/eventConditions.js';
import { checkState, checkScenes, logEntryId } from './src/engine/storyInvariants.js';

const LIVES = Number(process.argv[2]) || 500;
const POLICY = process.argv[3] === 'greedy' ? 'greedy' : 'random';
const SKIP_IDS = new Set(['year_end', 'npc_autonomy', 'x']);

const violations = {};          // code -> { n, examples[] }
const note = (code, where, msg) => {
  const v = (violations[code] ||= { n: 0, examples: [] });
  v.n++;
  if (v.examples.length < 4) v.examples.push(`${where} ${msg}`);
};

const occurrences = {};          // id -> count over all lives
const lifeSets = [];
const lifeSeqs = [];
let repeatInLife = 0;
let totalMoments = 0;
let closeRepeats = 0;
const ages = [];

const remembersIndex = new Map();
for (const e of [...ALL_STORY_EVENTS, ...CONSEQUENCE_EVENTS, ...LIFE_MINORS, ...LIFE_DAILIES]) {
  if (e.remembers?.length || e.need?.deadNpc) remembersIndex.set(e.id, true);
}
const ctx = { remembers: (id) => remembersIndex.has(id) };

const weightOf = (ch) => {
  const fx = ch.fx || ch.effects || {};
  return (fx.health || 0) * 1.2 + (fx.sanity || 0) + (fx.wealth || 0) * 0.8 + (fx.rep || 0) * 0.6 - (fx.heat || 0) * 0.7 - (fx.taboo || 0) * 3;
};
// A player can only pick what the screen offers, so unavailable choices are never picked
const pick = (choices, rng, char) => {
  const ok = (choices || []).map((c, i) => i).filter((i) => choiceIsAvailable(choices[i], char));
  if (!ok.length) return -1;
  if (POLICY === 'random') return ok[Math.floor(rng() * ok.length)];
  return ok.reduce((b, i) => (weightOf(choices[i]) > weightOf(choices[b]) ? i : b), ok[0]);
};

for (let i = 0; i < LIVES; i++) {
  const seed = `logic_${i}`;
  let char = createNewCharacter({ customName: `L${i}`, seed });
  const rng = createRNG(`${seed}:life`);
  const seq = [];
  const lastAt = {};
  const seenPrompt = new Set();
  const seenState = new Set();
  let guard = 0;
  const where = () => `[${seed} @${char.age}]`;

  const inspect = (prevLen) => {
    const scenes = char.logs.slice(prevLen).map((l) => ({ id: logEntryId(l), vi: l.vi, age: l.age, type: l.type }));
    // Anything the player reads must have its {placeholders} filled in
    const braces = (text, id, what) => { if (/{[a-zA-Z]+}/.test(text || '')) note('unresolved-placeholder', where(), `${id} ${what}: ${String(text).match(/{[a-zA-Z]+}/)[0]}`); };
    for (const l of char.logs.slice(prevLen)) braces(l.vi, logEntryId(l), 'log');
    if (char.pendingEvent) {
      const key = 'ph:' + char.pendingEvent.id + '@' + char.age;
      if (!seenPrompt.has(key)) {
        seenPrompt.add(key);
        braces(char.pendingEvent.displayVi, char.pendingEvent.id, 'text');
        for (const c of char.pendingEvent.choices || []) braces(c.labelVi, char.pendingEvent.id, 'choice label');
      }
    }
    if (char.pendingMinor) {
      const key = 'ph:' + char.pendingMinor.id + '@' + char.age;
      if (!seenPrompt.has(key)) {
        seenPrompt.add(key);
        braces(char.pendingMinor.vi, char.pendingMinor.id, 'text');
        for (const c of char.pendingMinor.choices || []) braces(c.vi, char.pendingMinor.id, 'choice');
      }
    }
    const prompts = [];
    if (char.pendingEvent) prompts.push({ id: char.pendingEvent.id, vi: char.pendingEvent.displayVi || char.pendingEvent.vi, age: char.age });
    if (char.pendingMinor) prompts.push({ id: char.pendingMinor.id, vi: char.pendingMinor.vi, age: char.age });
    for (const p of prompts) {
      const key = p.id + '@' + p.age;
      if (seenPrompt.has(key)) continue;
      seenPrompt.add(key);
      for (const v of checkScenes(char, [p], ctx)) note(v.code, where(), `${v.id}: ${v.msg}`);
    }
    for (const s of scenes) {
      if (!s.id || SKIP_IDS.has(s.id) || s.id.startsWith('log_birth') || s.id.startsWith('year_end')) continue;
      seq.push(s.id);
      totalMoments++;
      occurrences[s.id] = (occurrences[s.id] || 0) + 1;
      if (lastAt[s.id] != null) {
        repeatInLife++;
        if (char.age - lastAt[s.id] <= 5) closeRepeats++;
      }
      lastAt[s.id] = char.age;
    }
    for (const v of checkScenes(char, scenes, ctx)) note(v.code, where(), `${v.id}: ${v.msg}`);
    for (const v of checkState(char)) {
      const key = v.code + '@' + char.age;
      if (!seenState.has(key)) { seenState.add(key); note(v.code, where(), v.msg); }
    }
  };

  while (char.alive && char.age < 120 && guard++ < 200) {
    if (!char.plan?.length) planYear(char, rng);
    for (let t = 0; t <= 100 && char.alive; t += 2) {
      let prev = char.logs.length;
      char = runDueItems(char, t, rng).char;
      inspect(prev);
      let spin = 0;
      while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingModal) && spin++ < 8) {
        prev = char.logs.length;
        if (char.pendingEvent) {
          char = resolveEventChoice(char, Math.max(0, pick(char.pendingEvent.choices, rng, char)), rng);
        } else if (char.pendingMinor) {
          const def = LIFE_MINORS.find((m) => m.id === char.pendingMinor.id);
          char = resolveMinor(char, pick(def?.choices, rng, char), rng); // -1 lets the moment pass
        } else if (char.pendingContract) {
          const ap = char.pendingContract.approaches;
          char = resolveFixerContract(char, ap[Math.floor(rng() * ap.length)].id, rng);
        } else {
          char.pendingModal = null;
        }
        inspect(prev);
      }
    }
    if (char.alive) {
      const prev = char.logs.length;
      char = endYear(char, rng);
      inspect(prev);
    }
  }
  lifeSets.push(new Set(seq));
  lifeSeqs.push(seq);
  ages.push(char.age);
}

/* ---- report ---- */
const total = Object.values(violations).reduce((s, v) => s + v.n, 0);
console.log(`\n=== STORY LOGIC AUDIT, ${LIVES} lives, policy=${POLICY} ===`);
console.log(`Moments seen: ${totalMoments.toLocaleString()}  Mean lifespan ${(ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1)}`);
console.log(`\nLOGIC VIOLATIONS: ${total}`);
for (const [code, v] of Object.entries(violations).sort((a, b) => b[1].n - a[1].n)) {
  console.log(`  ${code.padEnd(24)} ${String(v.n).padStart(6)}`);
  v.examples.forEach((e) => console.log(`      ${e}`));
}

const pools = { major: ALL_STORY_EVENTS, consequence: CONSEQUENCE_EVENTS, minor: LIFE_MINORS, daily: LIFE_DAILIES };
const known = new Set(Object.values(pools).flat().map((e) => e.id));
console.log('\nVARIETY');
const distinct = lifeSets.map((s) => s.size);
const mean = (a) => a.reduce((s, x) => s + x, 0) / (a.length || 1);
console.log(`  distinct entries per life: mean ${mean(distinct).toFixed(1)}  min ${Math.min(...distinct)}  max ${Math.max(...distinct)}`);
let jac = 0, pairs = 0;
for (let k = 0; k < Math.min(400, LIVES - 1); k++) {
  const a = lifeSets[k], b = lifeSets[(k * 7 + 3) % LIVES === k ? (k + 1) % LIVES : (k * 7 + 3) % LIVES];
  const inter = [...a].filter((x) => b.has(x)).length;
  jac += inter / (a.size + b.size - inter || 1);
  pairs++;
}
console.log(`  overlap between two lives (Jaccard): ${(jac / pairs).toFixed(3)}  (lower = more different)`);
console.log(`  repeats inside one life: ${((100 * repeatInLife) / totalMoments).toFixed(1)}% of moments, ${((100 * closeRepeats) / totalMoments).toFixed(1)}% within 5 years`);
const counts = Object.entries(occurrences).filter(([id]) => known.has(id)).sort((a, b) => b[1] - a[1]);
const sum = counts.reduce((s, [, n]) => s + n, 0);
const H = -counts.reduce((s, [, n]) => s + (n / sum) * Math.log(n / sum), 0);
console.log(`  entries that ever fired: ${counts.length}/${known.size}  entropy ${(H / Math.log(known.size) * 100).toFixed(1)}% of max  top-10 share ${(100 * counts.slice(0, 10).reduce((s, [, n]) => s + n, 0) / sum).toFixed(1)}%`);
console.log(`  most frequent: ${counts.slice(0, 6).map(([id, n]) => `${id} ${(100 * n / sum).toFixed(1)}%`).join(', ')}`);
for (const [kind, list] of Object.entries(pools)) {
  const never = list.filter((e) => !occurrences[e.id]).map((e) => e.id);
  console.log(`  never fired (${kind}): ${never.length}/${list.length}${never.length && never.length <= 40 ? '  ' + never.join(', ') : ''}`);
}
process.exitCode = total ? 1 : 0;
