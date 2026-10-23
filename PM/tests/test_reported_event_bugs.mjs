import assert from 'node:assert/strict';
import { createNewCharacter, cloneChar, ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { ageNpcCompanions } from '../src/engine/director.js';
import { matchesEventContext, choiceIsAvailable } from '../src/engine/eventConditions.js';
import { LIFE_DAILIES, LIFE_MINORS, runDueItems, resolveMinor, planYear, endYear } from '../src/engine/yearPlanner.js';
import { COMPANION_QUEST_EVENTS } from '../src/data/eventsCompanionQuests.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
import { selectEventWithWeaverAI } from '../src/engine/weaverAI.js';
import { addScar } from '../src/engine/scarModel.js';

const born = (age = 24) => createNewCharacter({ seed: `reported-event-${age}`, startAge: age });

const officer = born(40);
officer.job = 'Syndicate';
officer.finger = 'Pinky';
officer.fingerRank = 3;
const subordinateOrder = LIFE_MINORS.find((event) => event.id === 'm_syn_order');
const officerOrder = LIFE_MINORS.find((event) => event.id === 'm_syn_officer_protection_order');
assert.equal(matchesEventContext(subordinateOrder, officer), false);
assert.equal(matchesEventContext(officerOrder, officer), true);
officer.fingerRank = 0;
assert.equal(matchesEventContext(subordinateOrder, officer), true);
assert.equal(matchesEventContext(officerOrder, officer), false);

const elder = born(92);
elder.npcs = { mentor: { nameVi: 'Do-yun Shin', nameEn: 'Do-yun Shin', status: 'alive', deceased: false, metAge: 25, ageAtMeet: 45, bond: 80 } };
const deaths = ageNpcCompanions(elder, () => 0);
assert.equal(elder.npcs.mentor.status, 'dead');
assert.equal(elder.npcs.mentor.fateAge, 92);
assert.ok(deaths[0].vi.includes('112'));
assert.equal(ageNpcCompanions(elder, () => 0).length, 0);

const penniless = born(30);
penniless.job = 'Wing Employee';
penniless.flags.push('Nest');
penniless.stats.health = 50;
penniless.stats.wealth = 0;
penniless.plan = [{ kind: 'minor', id: 'm_med_nest_infirmary', t: 0.1 }];
penniless.planCursor = 0;
const care = runDueItems(penniless, 20, () => 0.5).char;
assert.equal(care.pendingMinor.choices[0].costAhn, 25);
assert.equal(choiceIsAvailable(care.pendingMinor.choices[0], care), false);
assert.equal(choiceIsAvailable(care.pendingMinor.choices[3], care), true);
assert.equal(resolveMinor(care, 0, () => 0.5).stats.health, care.stats.health);

const sicklyQuest = COMPANION_QUEST_EVENTS.find((event) => event.id === 'quest_sickly_medicine_hunt');
const companion = born(28);
companion.npcs.friend = { nameVi: 'Friend', nameEn: 'Friend', status: 'alive', tags: ['sickly'], questsDone: 0 };
companion.flags.push('Nest');
assert.equal(matchesEventContext(sicklyQuest, companion), false);
companion.flags = companion.flags.filter((flag) => flag !== 'Nest');
assert.equal(matchesEventContext(sicklyQuest, companion), true);

const backFever = LIFE_DAILIES.find((event) => event.id === 'i_back_fever');
const nestInfant = createNewCharacter({ seed: 'nest-fever-gate', preferredFamilyId: 'nest_feather', startAge: 1 });
assert.ok(nestInfant.flags.includes('Nest'));
assert.equal(matchesEventContext(backFever, nestInfant), false);
nestInfant.flags = nestInfant.flags.filter((flag) => !['Nest', 'NestResident', 'Feather'].includes(flag));
nestInfant.flags.push('Backstreets');
assert.equal(matchesEventContext(backFever, nestInfant), true);

const teen = born(15);
teen.job = 'Child';
const workIds = ['daily_adolescence_gloves', 'daily_adolescence_wages', 'daily_adolescence_birthday'];
for (const id of workIds) {
  const event = LIFE_DAILIES.find((item) => item.id === id);
  assert.equal(matchesEventContext(event, teen), false, id);
}
teen.npcs.friend = { nameVi: 'Friend', nameEn: 'Friend', status: 'alive' };
assert.equal(matchesEventContext(LIFE_MINORS.find((item) => item.id === 'm_t_friend_fixer'), teen), false);
assert.equal(matchesEventContext(LIFE_MINORS.find((item) => item.id === 'm_friend_injured'), teen), false);
teen.age = 20;
teen.job = 'Workshop Craftsman';
assert.equal(matchesEventContext(LIFE_DAILIES.find((item) => item.id === 'daily_adolescence_wages'), teen), true);

const legacy = born(117);
legacy.scars = Array.from({ length: 24 }, (_, index) => `Scar ${index}`);
const normalized = cloneChar(legacy);
assert.equal(normalized.scars.length, 0);
assert.equal(normalized.scarHistory.length, 24);
assert.equal(cloneChar(normalized).scarHistory.length, 24);
normalized.job = 'Outcast';
normalized.resonance = 100;
normalized.stats.sanity = 60;
for (const mark of ['Vết móc câu Sweeper 3:13 AM', 'Ký ức địa ngục tàu WARP', 'Vết mổ trả nợ']) addScar(normalized, mark);
assert.equal(ALL_STORY_EVENTS.find((event) => event.id === 'ego_carmen_crossroad').age[1], 140);
const selected = selectEventWithWeaverAI({ weaver: normalized.weaver, char: normalized, allPools: ALL_STORY_EVENTS, consequencePool: CONSEQUENCE_EVENTS, rng: () => 0.5 });
assert.equal(selected.event.id, 'ego_carmen_crossroad');
planYear(normalized, () => 0.5);
assert.ok(normalized.plan.some((item) => item.kind === 'major'));

const base = born(30);
base.job = 'Outcast';
base.scars = [];
base.resonance = 10;
base.stats.health = 85;
base.stats.sanity = 85;
const scarred = cloneChar(base);
scarred.scars = ['Vết mổ trả nợ', 'Ký ức địa ngục tàu WARP'];
const plainYear = endYear(base, () => 0.5);
const scarYear = endYear(scarred, () => 0.5);
assert.ok(scarYear.stats.health < plainYear.stats.health);
assert.ok(scarYear.stats.sanity < plainYear.stats.sanity);

console.log('Reported event regressions: rank, NPC aging, Ahn, scars, Nest context, and age/job gates passed.');
