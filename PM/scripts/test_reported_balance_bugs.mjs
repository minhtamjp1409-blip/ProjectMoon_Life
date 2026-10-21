import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { weightedOutcomes } from '../src/engine/outcomeOdds.js';
import { reputationGain } from '../src/engine/economyModel.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { LIFE_MINORS, resolveMinor } from '../src/engine/yearPlanner.js';
import { simulateNpcAutonomousLife } from '../src/engine/narrativeArcEngine.js';

const newChar = () => createNewCharacter({ seed: 'reported-balance-bugs', startAge: 18 });
const crossroad = ALL_STORY_EVENTS.find((event) => event.id === 'ad_career_crossroad_18');
const child = newChar();
child.job = 'Child';
child.merit = 240;
child.stats.rep = 95;
child.pendingEvent = crossroad;
const licensed = resolveEventChoice(child, 0, () => 0);
assert.equal(licensed.job, 'Fixer');
assert.equal(licensed.fixerGrade, 9);
assert.ok(licensed.merit < 10);

const grade2 = ALL_STORY_EVENTS.find((event) => event.id === 'fixer_promo_g2_exam');
const grade1 = ALL_STORY_EVENTS.find((event) => event.id === 'fixer_promo_g1_exam');
licensed.fixerGrade = 2;
licensed.age = 45;
licensed.merit = 400;
licensed.stats.rep = 100;
assert.equal(isEventEligible(grade2, licensed), false);
assert.equal(isEventEligible(grade1, licensed), true);
licensed.pendingEvent = grade2;
const stale = resolveEventChoice(licensed, 0, () => 0);
assert.equal(stale.fixerGrade, 2);
assert.match(stale.logs.at(-1).vi, /Hana hủy giấy triệu tập cũ/);

licensed.fixerGrade = 3;
licensed.pendingEvent = grade2;
const promoted = resolveEventChoice(licensed, 0, () => 0);
assert.equal(promoted.fixerGrade, 2);
assert.ok(promoted.merit < 200);
assert.equal(isEventEligible(grade1, promoted), false);

const candy = LIFE_MINORS.find((event) => event.id === 'm_k_candy');
const deadFriend = newChar();
deadFriend.age = 5;
deadFriend.npcs.friend = { nameVi: 'X', nameEn: 'X', status: 'dead', deceased: true };
assert.equal(matchesEventContext(candy, deadFriend), false);
assert.equal(matchesEventContext({ id: 'synthetic_npc_choice', vi: 'A quiet street', choices: [{ rvi: '{friend} joins you.' }] }, deadFriend), false);
deadFriend.age = 25;
assert.equal(simulateNpcAutonomousLife(deadFriend, () => 0).length, 0);

const letter = LIFE_MINORS.find((event) => event.id === 'm_a_library_letter');
const accept = letter.choices.findIndex((choice) => choice.mem === 'library_invite_accepted');
assert.ok(accept >= 0);
const invited = newChar();
invited.age = 30;
invited.pendingMinor = { id: letter.id, t: 0.4 };
const accepted = resolveMinor(invited, accept, () => 0.5);
assert.ok(accepted.memory.some((entry) => entry.key === 'library_invite_accepted'));

const oddsChoice = { outcomes: [
  { w: 50, effects: { health: 5 } },
  { w: 50, effects: { health: -5 }, need: { flags: ['Impossible'] } }
] };
assert.equal(weightedOutcomes(oddsChoice, newChar()).length, 1);
assert.equal(reputationGain(30, 8), 8);
assert.ok(reputationGain(95, 8) < reputationGain(65, 8));

console.log('Reported balance bugs 23–28: childhood Merit reset, rank gate, carryover, NPC context, Angela choice and effective odds passed.');
