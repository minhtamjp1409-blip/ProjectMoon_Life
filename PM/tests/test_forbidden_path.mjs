import assert from 'node:assert/strict';
import { createNewCharacter, createRNG, cloneChar, resolveEventChoice } from '../src/engine/gameEngine.js';
import { planYear, chooseYearLead, runDueItems, resolveMinor, endYear, LIFE_MINORS } from '../src/engine/yearPlanner.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
import { FORBIDDEN_LEAD_ID, FORBIDDEN_ACT_IDS } from '../src/data/eventsForbidden.js';
import { forbiddenLeadOpen, autoLeadIndex, bringsClaw, tabooGainOf, FORBIDDEN_OFFER_GAP } from '../src/engine/forbiddenPath.js';

const quiet = (char) => {
  char.pendingEvent = null; char.pendingMinor = null; char.pendingContract = null; char.pendingDungeon = null; char.pendingLead = null;
  char.pendingBirthLogs = [];
  return char;
};
const lifeAt = (seed, age, setup) => {
  const char = quiet(createNewCharacter({ seed, startAge: age }));
  char.taboo = 0;
  Object.assign(char, setup);
  char.flags = [...(char.flags || []), ...(setup.flags || [])];
  return char;
};
// Plans each year from `from` to `to` and returns the ages at which the forbidden lead was on offer
const offersOver = (char, from, to, seed) => {
  const ages = [];
  for (let age = from; age <= to; age++) {
    char.age = age;
    quiet(char);
    char.plan = [];
    planYear(char, createRNG(`${seed}:${age}`));
    if (char.pendingLead?.offers?.some((offer) => offer.id === FORBIDDEN_LEAD_ID)) ages.push(age);
  }
  return ages;
};

// 1. An ordinary life is never offered the path
const ordinary = lifeAt('forbidden-ordinary', 30, { job: 'Fixer', fixerGrade: 7 });
assert.equal(forbiddenLeadOpen(ordinary), false);
assert.deepEqual(offersOver(ordinary, 30, 50, 'ordinary'), [], 'an ordinary Fixer never sees the forbidden lead');

// 2. A strong life is offered it, never more often than the gap allows, and never in the ordinary minor draw
const strong = lifeAt('forbidden-strong', 30, { job: 'Fixer', fixerGrade: 1, flags: ['EGOAwakened'] });
assert.equal(forbiddenLeadOpen(strong), true);
const offers = offersOver(strong, 30, 50, 'strong');
assert(offers.length >= 2, `a strong life meets the forbidden lead over twenty years (got ${offers.join(',')})`);
offers.slice(1).forEach((age, i) => assert(age - offers[i] >= FORBIDDEN_OFFER_GAP, 'offers keep their gap'));
for (const profile of [{ job: 'Syndicate', finger: 'Ring', fingerRank: 3 }, { job: 'Wing Employee', wingRank: 3, flags: ['Nest'] }, { job: 'Fixer', fixerGrade: 0, flags: ['ColorFixer'] }]) {
  assert.equal(forbiddenLeadOpen(lifeAt('forbidden-apex', 35, profile)), true, `${profile.job} at the top is offered the path`);
}
assert.equal(forbiddenLeadOpen(lifeAt('forbidden-young', 22, { job: 'Fixer', fixerGrade: 1, flags: ['EGOAwakened'] })), false, 'too young');
assert.equal(forbiddenLeadOpen(lifeAt('forbidden-distorted', 35, { job: 'Fixer', flags: ['EGOAwakened', 'Distorted'] })), false, 'not for a Distortion');
const plainYear = lifeAt('forbidden-plain', 40, { job: 'Fixer', fixerGrade: 1, flags: ['EGOAwakened'] });
for (let i = 0; i < 30; i++) {
  plainYear.plan = [];
  planYear(plainYear, createRNG(`plain:${i}`));
  assert(!plainYear.plan.some((item) => item.id === FORBIDDEN_LEAD_ID && !item.lead), 'the lead never arrives as an ordinary minor');
}

// 3. The autopilot never picks it, and never raises Taboo
const draft = { offers: [{ id: 'a' }, { id: 'b' }, { id: FORBIDDEN_LEAD_ID, tier: 'forbidden' }] };
for (let i = 0; i < 200; i++) assert.notEqual(autoLeadIndex(draft, createRNG(`auto:${i}`)), 2);
const leadDef = LIFE_MINORS.find((m) => m.id === FORBIDDEN_LEAD_ID);
assert.equal(tabooGainOf(leadDef.choices[0]), 1);
assert.equal(tabooGainOf(leadDef.choices[1]), 0);

// 4. Walking the path: the lead, then two chapters a year apart, each one Taboo, then the Claw's threshold
let char = lifeAt('forbidden-walk', 32, { job: 'Fixer', fixerGrade: 1, flags: ['EGOAwakened'] });
char.plan = [];
planYear(char, createRNG('walk'));
char.pendingLead = { age: char.age, offers: [{ id: 'x' }, { id: 'y' }, { id: FORBIDDEN_LEAD_ID, tier: 'forbidden' }] };
char = chooseYearLead(char, 2);
assert(char.plan.some((item) => item.id === FORBIDDEN_LEAD_ID && item.lead), 'the chosen lead is on this year’s plan');
for (let guard = 0; guard < 40 && char.pendingMinor?.id !== FORBIDDEN_LEAD_ID; guard++) {
  quiet(char);
  char = runDueItems(char, 100, createRNG(`walk:${guard}`)).char;
}
assert.equal(char.pendingMinor?.id, FORBIDDEN_LEAD_ID);
char = resolveMinor(char, 0, createRNG('walk-accept'));
assert.equal(char.taboo, 1, 'taking the case is the first Taboo');
const act2Thread = char.weaver.pendingThreads.find((th) => th.eventId === FORBIDDEN_ACT_IDS[0] && !th.fulfilled);
assert(act2Thread, 'the next chapter is queued as a consequence');
assert.equal(forbiddenLeadOpen(char), false, 'one chain per life');

const act2 = CONSEQUENCE_EVENTS.find((e) => e.id === FORBIDDEN_ACT_IDS[0]);
const act3 = CONSEQUENCE_EVENTS.find((e) => e.id === FORBIDDEN_ACT_IDS[1]);
assert(act2 && act3, 'both chapters are in the consequence pool');
const stranger = lifeAt('forbidden-stranger', 40, { job: 'Fixer', fixerGrade: 1, flags: ['EGOAwakened'] });
assert.equal(isEventEligible(act2, stranger), false, 'a chapter never comes up at random');

quiet(char);
char = endYear(char, createRNG('walk-year'));
assert(char.plan.some((item) => item.forcedEventId === FORBIDDEN_ACT_IDS[0]), 'chapter two arrives the next year');
char.pendingEvent = { ...act2 };
assert.equal(bringsClaw(act2.choices[0], char), false);
char = resolveEventChoice(char, 0, createRNG('walk-act2'));
assert.equal(char.taboo, 2);
assert(char.weaver.pendingThreads.some((th) => th.eventId === FORBIDDEN_ACT_IDS[1] && !th.fulfilled), 'chapter three is queued');

char.pendingEvent = { ...act3 };
assert.equal(bringsClaw(act3.choices[0], char), true, 'the last step is flagged before it is taken');
assert.equal(bringsClaw(act3.choices[1], char), false, 'stopping never brings the Claw');
const posted = resolveEventChoice(cloneChar(char), 0, createRNG('walk-act3'));
assert.equal(posted.taboo, 3, 'the third Taboo is the threshold the Claw answers');
const stopped = resolveEventChoice(cloneChar(char), 1, createRNG('walk-stop'));
assert.equal(stopped.taboo, 2, 'stopping keeps what was done but adds nothing');
assert(stopped.flags.includes('forbidden_path_closed'));

console.log('Forbidden path: offered only to strong lives, gap, lead-only, autopilot guard, three chapters and the Claw threshold passed.');
