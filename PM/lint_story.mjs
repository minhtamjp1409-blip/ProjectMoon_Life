/**
 * Static lint for story data. Hard errors (exit 1): duplicate ids, references to events that do not
 * exist, unknown effect keys, choices that cannot resolve. Warnings: text that names a relationship
 * without requiring that person, events gated on a flag or memory nothing ever grants.
 * Usage: node lint_story.mjs [--verbose]
 */
import fs from 'fs';
import path from 'path';
import { ALL_STORY_EVENTS } from './src/engine/gameEngine.js';
import { LIFE_MINORS, LIFE_DAILIES } from './src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from './src/data/eventsChildhood.js';
import { FIXER_REQUESTS } from './src/data/eventsSupernatural.js';
import { ROLE_WORDS, entryGatesRole } from './src/engine/storyInvariants.js';
import { FINGER_LADDERS, WING_LADDER_PROMOTIONS, FIXER_LADDER } from './src/engine/careerPipeline.js';
import { NARRATIVE_ARCS } from './src/engine/narrativeArcEngine.js';
import { FINGER_RANKS } from './src/data/worldData.js';

const VERBOSE = process.argv.includes('--verbose');
const EFFECT_KEYS = new Set(['health', 'sanity', 'wealth', 'network', 'rep', 'heat', 'taboo', 'resonance', 'merit']);

const pools = [
  ['major', ALL_STORY_EVENTS],
  ['consequence', CONSEQUENCE_EVENTS],
  ['minor', LIFE_MINORS],
  ['daily', LIFE_DAILIES]
];

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

/* ---- ids ---- */
const idKinds = new Map();
for (const [kind, list] of pools) {
  for (const e of list) {
    if (!e.id) { err(`${kind}: entry without id (${String(e.vi || '').slice(0, 40)})`); continue; }
    if (idKinds.has(e.id)) err(`duplicate id ${e.id} (${idKinds.get(e.id)} and ${kind})`);
    else idKinds.set(e.id, kind);
  }
}

/* ---- what each entry grants and asks ---- */
const choicesOf = (e) => e.choices || [];
const outcomesOf = (c) => c.outcomes || c.out || [];
const textOf = (e) => {
  const parts = [e.vi, e.en];
  for (const c of choicesOf(e)) {
    parts.push(c.labelVi, c.resultVi, c.vi, c.rvi);
    for (const o of outcomesOf(c)) parts.push(o.resultVi, o.rvi);
  }
  if (e.ignore) parts.push(e.ignore.rvi);
  return parts.filter(Boolean).join('\n');
};

const producedFlags = new Set();
const producedMem = new Set();
const targetIds = new Set();

for (const [, list] of pools) {
  for (const e of list) {
    for (const c of choicesOf(e)) {
      for (const src of [c, ...outcomesOf(c)]) {
        [...(src.flagsAdd || []), ...(src.flags || [])].forEach((f) => producedFlags.add(f));
        [src.mem, src.memory, ...(src.memories || [])].filter(Boolean).forEach((m) => producedMem.add(m));
        (src.later || []).forEach((l) => targetIds.add(l.id));
        (src.scheduleConsequences || []).forEach((s) => targetIds.add(s.eventId));
        if (src.setFinger) producedFlags.add(`Finger${src.setFinger}`);
        if (src.setFixerGrade !== undefined) producedFlags.add('Fixer');
      }
    }
    if (e.ignore) {
      [e.ignore.mem, ...(e.ignore.later || []).map((l) => l.id)].filter(Boolean).forEach((x) => targetIds.add(x));
    }
  }
}
const contractIds = new Set();
for (const request of FIXER_REQUESTS) {
  if (!request.id || contractIds.has(request.id)) err(`duplicate or missing Fixer request id: ${request.id}`);
  contractIds.add(request.id);
  if (!Number.isInteger(request.tier) || request.tier < 0 || request.tier > 5) err(`request ${request.id}: invalid tier`);
  for (const key of ['typeVi', 'typeEn', 'vi', 'en', 'okVi', 'okEn', 'failVi', 'failEn', 'deathVi', 'deathEn']) {
    if (!request[key]) err(`request ${request.id}: missing ${key}`);
  }
}

// Flags the engine and the world data hand out outside any event
const srcDir = path.resolve('src');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((f) => (f.isDirectory() ? walk(path.join(d, f.name)) : [path.join(d, f.name)]));
for (const file of walk(srcDir).filter((f) => /\.(js|jsx)$/.test(f))) {
  const code = fs.readFileSync(file, 'utf8');
  for (const m of code.matchAll(/flags(?:\.push)?\(\s*['"`]([A-Za-z0-9_À-ỹ]+)['"`]/g)) producedFlags.add(m[1]);
  for (const m of code.matchAll(/flags:\s*\[([^\]]*)\]/g)) for (const f of m[1].matchAll(/['"`]([^'"`]+)['"`]/g)) producedFlags.add(f[1]);
  for (const m of code.matchAll(/flagGranted:\s*['"`]([^'"`]+)['"`]/g)) producedFlags.add(m[1]);
  for (const m of code.matchAll(/`(Finger|promo_ready_g|finger_promo_ready_r|wing_promo_ready_r)\$\{/g)) producedFlags.add(`${m[1]}*`);
}
const flagKnown = (f) => producedFlags.has(f) || [...producedFlags].some((p) => p.endsWith('*') && f.startsWith(p.slice(0, -1)));
// Memories the director writes by itself
const memKnown = (k) => producedMem.has(k) || /^(quest_|lost_)/.test(k);

for (const [kind, list] of pools) {
  for (const e of list) {
    const need = e.need || {};
    const asked = [...(need.flags || []), ...(e.requires || [])];
    for (const f of asked) if (!flagKnown(f)) warn(`${kind} ${e.id}: needs flag "${f}" that nothing grants`);
    for (const k of [need.mem, need.noMem].filter(Boolean)) if (k === need.mem && !memKnown(k)) warn(`${kind} ${e.id}: needs memory "${k}" that no choice writes`);

    for (const c of choicesOf(e)) {
      const outs = outcomesOf(c);
      if (outs.length && outs.every((o) => (o.w ?? 50) <= 0)) err(`${kind} ${e.id}: all outcomes have zero weight`);
      const noText = !(c.resultVi || c.rvi) && !outs.length;
      if (noText && kind !== 'daily') warn(`${kind} ${e.id}: a choice has no result text`);
      for (const src of [c, ...outs]) {
        for (const k of Object.keys(src.effects || src.fx || {})) if (!EFFECT_KEYS.has(k)) err(`${kind} ${e.id}: unknown effect key "${k}"`);
      }
    }
    if (e.choices?.length && !e.ignore && e.choices.every((choice) => (choice.costAhn || 0) > 0)) {
      err(`${kind} ${e.id}: every choice costs Ahn, so an insolvent player cannot continue`);
    }
    if (kind === 'daily') for (const k of Object.keys(e.fx || {})) if (!EFFECT_KEYS.has(k)) err(`daily ${e.id}: unknown effect key "${k}"`);

    // Roles named in prose
    const text = textOf(e);
    for (const [role, rx] of Object.entries(ROLE_WORDS)) {
      if (rx.vi.test(text) && !entryGatesRole(e, role)) {
        const makesThem = choicesOf(e).some((c) => [c, ...outcomesOf(c)].some((s) => s.npc?.role === role || s.npcAdd?.role === role));
        if (!makesThem) warn(`${kind} ${e.id}: names a ${role} without requiring one`);
      }
    }
  }
}
for (const id of targetIds) if (!idKinds.has(id)) err(`reference to missing event "${id}"`);

// Ids the engine itself points at: ladders and story arcs
const engineRefs = [
  ...Object.entries(FINGER_LADDERS).flatMap(([f, l]) => l.map((s) => [s.eventId, `Finger ${f} rank ${s.rank}`])),
  ...WING_LADDER_PROMOTIONS.map((s) => [s.eventId, `Wing rank ${s.rank}`]),
  ...FIXER_LADDER.map((s) => [`fixer_promo_g${s.grade}_exam`, `Fixer grade ${s.grade}`]),
  ...NARRATIVE_ARCS.flatMap((a) => a.stages.map((s) => [s.eventId, `arc ${a.id} stage ${s.stage}`]))
];
// One name per rank 0..N, or the milestone shows a rank that does not exist
for (const [f, ladder] of Object.entries(FINGER_LADDERS)) {
  if ((FINGER_RANKS[f] || []).length !== ladder.length + 1) err(`FINGER_RANKS.${f} has ${(FINGER_RANKS[f] || []).length} names for ${ladder.length + 1} ranks`);
}
for (const [id, where] of engineRefs) if (!idKinds.has(id)) err(`${where} points at missing event "${id}"`);
for (const [kind, list] of pools) {
  for (const e of list) {
    for (const k of [(e.need || {}).mem].filter(Boolean)) void k;
  }
}

const show = (title, arr) => {
  console.log(`\n${title}: ${arr.length}`);
  for (const m of arr.slice(0, VERBOSE ? arr.length : 25)) console.log('  - ' + m);
  if (!VERBOSE && arr.length > 25) console.log(`  … ${arr.length - 25} more (use --verbose)`);
};
console.log(`Pools: ${pools.map(([k, l]) => `${k} ${l.length}`).join(', ')}, contract ${FIXER_REQUESTS.length}`);
show('ERRORS', errors);
show('WARNINGS', warns);
process.exitCode = errors.length ? 1 : 0;
