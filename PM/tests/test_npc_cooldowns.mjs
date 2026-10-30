import assert from 'node:assert/strict';
import { createNewCharacter } from '../src/engine/gameEngine.js';
import { canInteractWithNpc, executeNpcInteraction, NPC_INTERACTION_ACTIONS } from '../src/engine/npcInteractions.js';
import { ensureNpcAgency } from '../src/data/npcPersonality.js';
import { entryTier, foldsInCompact } from '../src/features/chronicle/entryTiers.js';
import { readFileSync } from 'node:fs';

console.log('--- RUNNING NPC COOLDOWN TESTS ---');

const fresh = (seed = 'npc-cool') => {
  const c = createNewCharacter({ seed, startAge: 30 });
  c.npcs.partner = ensureNpcAgency({ role: 'partner', nameVi: 'Roland', nameEn: 'Roland', archetype: 'veteran', bond: 80, status: 'alive', job: 'Fixer' }, () => 0.5);
  c.stats = { ...c.stats, wealth: 60, health: 70, sanity: 40, rep: 30 };
  return c;
};

console.log('1. Every action that declares a cooldown is held to it...');
for (const action of NPC_INTERACTION_ACTIONS.filter((a) => a.cooldownYears)) {
  assert(Number.isInteger(action.cooldownYears) && action.cooldownYears >= 1, `${action.id} has a whole-year cooldown`);
}

console.log('2. A cheap action cannot be repeated within the year...');
let c = fresh();
const first = executeNpcInteraction(c, 'partner', 'drink_confide', () => 0.5);
assert(first.success);
const again = canInteractWithNpc(first.nextChar, 'partner', 'drink_confide');
assert.strictEqual(again.ok, false);
assert.strictEqual(again.cooldown, true, 'the reason is a cooldown, not a shortage');
assert(/năm/.test(again.reasonVi) && /year/.test(again.reasonEn));
const spam = executeNpcInteraction(first.nextChar, 'partner', 'drink_confide', () => 0.5);
assert.strictEqual(spam.success, false, 'executing it again is refused too');
assert.strictEqual(spam.nextChar.stats.wealth, first.nextChar.stats.wealth, 'a refused action costs nothing');

console.log('3. The next year opens it again, and other actions are not blocked...');
const nextYear = { ...first.nextChar, age: first.nextChar.age + 1 };
assert.strictEqual(canInteractWithNpc(nextYear, 'partner', 'drink_confide').ok, true);
assert.strictEqual(canInteractWithNpc(first.nextChar, 'partner', 'spar_coordinate').ok, true, 'sparring is a different action');

console.log('4. A favour waits two years between uses...');
c = fresh('npc-favour');
const used = executeNpcInteraction(c, 'partner', 'call_favor', () => 0.5);
assert(used.success);
assert.strictEqual(canInteractWithNpc({ ...used.nextChar, age: used.nextChar.age + 1 }, 'partner', 'call_favor').cooldown, true);
assert.strictEqual(canInteractWithNpc({ ...used.nextChar, age: used.nextChar.age + 2 }, 'partner', 'call_favor').ok, true);

console.log('5. Someone in trouble cannot lend a favour...');
c = fresh('npc-trouble');
c.npcs.partner.crisis = { type: 'ambush', severity: 40, labelVi: 'x', labelEn: 'x' };
const trouble = canInteractWithNpc(c, 'partner', 'call_favor');
assert.strictEqual(trouble.ok, false);
assert(/gặp nạn/.test(trouble.reasonVi));
c.npcs.partner.crisis = { type: 'none', severity: 0 };
c.npcs.partner.status = 'wounded';
assert.strictEqual(canInteractWithNpc(c, 'partner', 'call_favor').ok, false, 'a wounded friend cannot help either');

console.log('6. The log carries the numbers as chips and none in the prose...');
c = fresh('npc-log');
c.npcs.partner.bond = 40;
const res = executeNpcInteraction(c, 'partner', 'drink_confide', () => 0.5);
const entry = res.nextChar.logs.at(-1);
assert(entry.deltas.some((d) => d.k === 'sanity' && d.v > 0), 'a sanity chip');
assert(entry.deltas.some((d) => d.k === 'wealth' && d.v < 0), 'an Ahn chip');
assert(entry.deltas.some((d) => d.k === 'bond' && d.v > 0 && d.name), 'a bond chip with the person named');
for (const text of [entry.vi, entry.en]) {
  assert(!/[+\-−]\d+\s?(HP|Sanity|Ahn|Merit|Heat|Gắn kết|Bond|Rep)/i.test(text), `no stat tally in the sentence: ${text.slice(0, 60)}`);
  assert(!text.includes('!'), 'no exclamation mark in narration');
}
const spar = executeNpcInteraction(fresh('npc-spar'), 'partner', 'spar_coordinate', () => 0.5).nextChar.logs.at(-1);
assert(!spar.vi.includes('!') && !spar.en.includes('!'));

console.log('7. The log entry can sit in the feed: id, age, season and type, and the compact fold still sees the years...');
for (const id of ['drink_confide', 'spar_coordinate', 'call_favor']) {
  const out = executeNpcInteraction(fresh(`npc-feed-${id}`), 'partner', id, () => 0.5).nextChar;
  const e = out.logs.at(-1);
  assert(e.id && typeof e.id === 'string', `${id}: has an id for the React key`);
  assert.strictEqual(e.age, out.age, `${id}: carries the age`);
  assert(e.season?.id, `${id}: carries the season`);
  assert(e.type, `${id}: carries a type`);
}
const keys = new Set();
let play = fresh('npc-keys');
for (const id of ['drink_confide', 'spar_coordinate']) { play = executeNpcInteraction(play, 'partner', id, () => 0.5).nextChar; keys.add(play.logs.at(-1).id); }
assert.strictEqual(keys.size, 2, 'two interactions in one year do not share a key');
const past = { type: 'choice', choiceVi: 'Nhận việc', age: play.age - 1 };
assert(foldsInCompact(past, entryTier(past), play.age), 'a last-year choice still folds after an NPC interaction');

console.log('8. A rescue and a favour move the favour count, and the log chips say so...');
c = fresh('npc-aid');
c.npcs.partner.crisis = { type: 'ambush', severity: 60, labelVi: 'bị săn', labelEn: 'hunted' };
c.npcs.partner.bond = 100;
const aid = executeNpcInteraction(c, 'partner', 'emergency_aid', () => 0.5);
assert(aid.success);
assert(aid.nextChar.logs.at(-1).deltas.some((d) => d.k === 'favour' && d.v === 1 && d.name), 'the favour owed to you is a chip');
assert.strictEqual(aid.nextChar.npcs.partner.bond, 100, 'bond was already at the cap, so it cannot be the only signal');
const called = executeNpcInteraction({ ...aid.nextChar, age: aid.nextChar.age + 2 }, 'partner', 'call_favor', () => 0.5);
assert(called.success && called.nextChar.logs.at(-1).deltas.some((d) => d.k === 'favour' && d.v === -1), 'spending it shows as minus one');

console.log('9. The dossier recomputes when only the crisis changed...');
const modalSrc = readFileSync('src/features/chronicle/components/NpcDossierModal.jsx', 'utf8');
assert(/useMemo\(\(\) => ensureNpcAgency\(rawNpc\), \[rawNpc\]\)/.test(modalSrc), 'the memo keys on the npc object, not a hand-picked field list');
assert(modalSrc.indexOf('useMemo(() => ensureNpcAgency') < modalSrc.indexOf('return null'), 'the hook runs before any early return');

console.log('PASS: NPC cooldown tests');
