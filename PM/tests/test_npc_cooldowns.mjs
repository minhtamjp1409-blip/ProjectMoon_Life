import assert from 'node:assert/strict';
import { createNewCharacter } from '../src/engine/gameEngine.js';
import { canInteractWithNpc, executeNpcInteraction, NPC_INTERACTION_ACTIONS } from '../src/engine/npcInteractions.js';
import { ensureNpcAgency } from '../src/data/npcPersonality.js';

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

console.log('PASS: NPC cooldown tests');
