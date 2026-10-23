import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, createRNG, generateFixerContract, resolveEventChoice, resolveFixerContract } from '../src/engine/gameEngine.js';
import { ASSOCIATIONS, OFFICES } from '../src/data/associations.js';
import {
  AFF_INVITE_IDS, affiliationLabel, affiliationYearTick, getAffiliation, getAffiliationInvite, joinAffiliation,
  laneContractMods, laneOf, leaveAffiliation, preferredPromoIds, standingLabel
} from '../src/engine/affiliation.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { contractOfferChance } from '../src/engine/careerPipeline.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { endYear } from '../src/engine/yearPlanner.js';

function fixer(seed, over = {}) {
  const c = createNewCharacter({ seed, startAge: 34 });
  Object.assign(c, { job: 'Fixer', fixerGrade: 6, merit: 80, regionId: 'A', ...over });
  c.stats = { health: 80, sanity: 70, wealth: 50, rep: 60, network: 45 };
  c.flags = c.flags.filter((f) => f !== 'Distorted');
  return c;
}
const byId = (id) => ALL_STORY_EVENTS.find((e) => e.id === id);

// Every invitation event exists, and every Association has its own pool of requests in range
assert.equal(AFF_INVITE_IDS.length, Object.keys(ASSOCIATIONS).length + 1);
for (const id of AFF_INVITE_IDS) assert.ok(byId(id), `missing ${id}`);
for (const [id, def] of Object.entries(ASSOCIATIONS)) {
  assert.ok(def.requests.length >= 7, `${id} has too few requests`);
  assert.ok(def.requests.every((r) => r.id.startsWith(`${id}_`)), `${id} request ids`);
  assert.ok(byId(`aff_conflict_${id}`), `${id} conflict`);
  const tiers = new Set(def.requests.map((r) => r.tier));
  for (const t of [0, 1, 2, 3, 4, 5]) assert.ok(tiers.has(t), `${id} lacks tier ${t}`);
}

// Invitations: only for a free Fixer who has passed Grade 9, deterministic, never twice in the same year
let invited = 0;
for (let i = 0; i < 200; i++) {
  const c = fixer(`aff-invite-${i}`, { fixerGrade: 8 });
  const id = getAffiliationInvite(c);
  assert.equal(getAffiliationInvite(c), id);
  if (!id) continue;
  invited++;
  const ev = byId(id);
  assert.equal(isEventEligible(ev, c), true);
  const other = AFF_INVITE_IDS.find((x) => x !== id);
  assert.equal(isEventEligible(byId(other), c), false, 'only the chosen invitation is eligible');
  assert.equal(getAffiliationInvite({ ...c, fixerGrade: 9 }), null, 'Grade 9 gets no invitation');
}
assert.ok(invited > 90 && invited < 160, `invitation frequency ${invited}/200`);

// Joining sets the badge, the org line and the flags; declining is remembered
const recruit = fixer('aff-join', { fixerGrade: 7 });
const zwei = byId('aff_invite_zwei');
recruit.pendingEvent = zwei;
const joined = resolveEventChoice(recruit, 0, () => 0.5);
assert.equal(laneOf(joined), 'assoc');
assert.equal(joined.affiliation.id, 'zwei');
assert.equal(joined.affiliation.section, 5, 'a Grade 7 Fixer starts at Section 5');
assert.equal(joined.org.name, 'Zwei Association');
assert.ok(joined.flags.includes('HasAffiliation'));
assert.equal(getAffiliationInvite(joined), null);
assert.match(affiliationLabel(joined, 'en'), /Zwei Association · Section 5/);
const turnedDown = fixer('aff-decline', { fixerGrade: 8 });
turnedDown.pendingEvent = zwei;
const declined = resolveEventChoice(turnedDown, 1, () => 0.5);
assert.equal(laneOf(declined), 'free');
assert.equal(declined.affDeclined.zwei, declined.age);
assert.notEqual(getAffiliationInvite(declined), 'aff_invite_zwei');

// The three lanes bend the same Request differently
const same = (lane) => {
  const c = fixer('aff-lanes', { fixerGrade: 5 });
  c.stats.network = 40;
  if (lane === 'assoc') joinAffiliation(c, 'zwei');
  if (lane === 'office') joinAffiliation(c, 'office:hook');
  return generateFixerContract(c, createRNG('aff-lane-roll'));
};
const free = same('free'), assoc = same('assoc'), office = same('office');
assert.equal(assoc.affId, 'zwei');
assert.ok(assoc.template.id.startsWith('zwei_'), 'an Association hands out its own Requests');
assert.equal(assoc.kickerVi, ASSOCIATIONS.zwei.cfg.kickerVi);
assert.equal(office.affId, 'office:hook');
assert.ok(office.template.id.startsWith('office_'));
assert.equal(free.affId, null);
assert.ok(!free.template.id.startsWith('zwei_'));
const careful = (contract) => contract.approaches.find((a) => a.id === 'careful');
assert.ok(careful(free).payAhn / free.tierInfo.basePay > 1.25, 'a lone Fixer keeps more of the fee');
assert.ok(careful(assoc).payAhn / assoc.tierInfo.basePay <= 1.01 + 0.15);
const modsOf = (lane) => laneContractMods(fixerIn(lane), 5);
function fixerIn(lane) {
  const c = fixer(`aff-mods-${lane}`, { fixerGrade: 5 });
  c.stats.network = 40;
  if (lane === 'assoc') joinAffiliation(c, 'zwei');
  if (lane === 'office') joinAffiliation(c, 'office:hook');
  return c;
}
assert.ok(modsOf('assoc').successDelta - modsOf('free').successDelta >= 5, 'a badge makes the work safer');
assert.ok(modsOf('free').payMult > modsOf('office').payMult && modsOf('office').payMult > 1);
assert.ok(free.template.tier <= 2, 'without a name behind you the top Requests do not come');
const vouched = fixer('aff-vouched', { fixerGrade: 3 });
vouched.stats.network = 70;
const lone = fixer('aff-vouched', { fixerGrade: 3 });
lone.stats.network = 40;
let reachHigh = 0, reachLow = 0;
for (let i = 0; i < 60; i++) {
  reachHigh = Math.max(reachHigh, generateFixerContract(vouched, createRNG(`v-${i}`)).template.tier);
  reachLow = Math.max(reachLow, generateFixerContract(lone, createRNG(`v-${i}`)).template.tier);
}
assert.ok(reachHigh > reachLow, 'a Fixer with Network gets bigger Requests than one with none');

// Offers: a badge brings more work, a lone Fixer finds less
const base = fixer('aff-offer', { fixerGrade: 6 });
const mine = fixer('aff-offer', { fixerGrade: 6 });
joinAffiliation(mine, 'seven');
assert.ok(contractOfferChance(mine) > contractOfferChance(base));
assert.ok(contractOfferChance(base) < 0.72);

// Standing moves with the work, and a word tells the player where they stand
const worker = fixer('aff-standing', { fixerGrade: 6 });
joinAffiliation(worker, 'shi');
worker.pendingContract = generateFixerContract(worker, createRNG('aff-standing-roll'));
worker.pendingContract.approaches.find((a) => a.id === 'careful').successPct = 100;
worker.pendingContract.approaches.find((a) => a.id === 'careful').failPct = 0;
worker.pendingContract.approaches.find((a) => a.id === 'careful').deathPct = 0;
const after = resolveFixerContract(worker, 'careful', () => 0.01);
assert.ok(after.affiliation.standing > 50);
assert.equal(after.affiliation.jobsDone, 1);
const refuser = fixer('aff-refuse', { fixerGrade: 6 });
joinAffiliation(refuser, 'shi');
refuser.pendingContract = generateFixerContract(refuser, createRNG('aff-refuse-roll'));
const refused = resolveFixerContract(refuser, 'decline', () => 0.5);
assert.equal(refused.affiliation.standing, 41);
assert.equal(refused.affiliation.refusals, 1);
assert.match(refused.logs.at(-1).vi, /Shi Association|Shi/);

// Warning first, then expulsion; the license and Merit stay, the name behind them does not
const weak = fixer('aff-expel', { fixerGrade: 8 });
joinAffiliation(weak, 'cinq');
weak.affiliation.standing = 20;
weak.affiliation.yearJobs = 1;
let logs = affiliationYearTick(weak, () => 0.5);
assert.ok(logs.some((l) => l.key === 'aff_warning'));
assert.ok(weak.flags.includes('AffWarned'));
assert.ok(getAffiliation(weak));
weak.age += 1;
weak.affiliation.standing = 8;
weak.merit = 120;
logs = affiliationYearTick(weak, () => 0.5);
assert.ok(logs.some((l) => l.key === 'aff_expelled'));
assert.equal(laneOf(weak), 'free');
assert.equal(weak.org, null);
assert.equal(weak.merit, 120);
assert.ok(weak.flags.includes('FormerAffiliate') && !weak.flags.includes('HasAffiliation'));
assert.equal(weak.affBarred.cinq, weak.age);
weak.age += 2;
assert.notEqual(getAffiliationInvite({ ...weak, fixerGrade: 7, lastAffiliationAge: weak.age - 4 }), 'aff_invite_cinq', 'the Association that cut you does not call back soon');

// A Fixer who never climbs loses standing; a Director cannot be dropped by that
const stuck = fixer('aff-stuck', { fixerGrade: 9 });
joinAffiliation(stuck, 'tres');
stuck.affiliation.joinedAge = stuck.age - 8;
stuck.affiliation.yearJobs = 1;
const before = stuck.affiliation.standing;
affiliationYearTick(stuck, () => 0.5);
assert.ok(stuck.affiliation.standing < before);

// Section promotion needs standing and a grade that fits the Section
const climber = fixer('aff-climb', { fixerGrade: 4 });
joinAffiliation(climber, 'liu');
assert.equal(climber.affiliation.section, 4);
climber.affiliation.joinedAge = climber.age - 3;
climber.affiliation.lastPromotedAge = climber.age - 3;
climber.affiliation.standing = 80;
climber.affiliation.yearJobs = 2;
logs = affiliationYearTick(climber, () => 0.5);
assert.equal(climber.affiliation.section, 3);
assert.ok(logs.some((l) => l.key === 'aff_section_up'));
assert.equal(climber.org.section, 3);
climber.age += 3; climber.affiliation.standing = 90; climber.affiliation.yearJobs = 2; climber.affiliation.lastPromotedAge = climber.age - 3;
affiliationYearTick(climber, () => 0.5);
assert.equal(climber.affiliation.section, 2);
climber.age += 3; climber.affiliation.standing = 90; climber.affiliation.yearJobs = 2; climber.affiliation.lastPromotedAge = climber.age - 3;
affiliationYearTick(climber, () => 0.5);
assert.equal(climber.affiliation.section, 2, 'Section 1 asks for Grade 3 or better');
const joinThread = joined.weaver.pendingThreads.find((t) => t.eventId === 'aff_conflict_zwei');
assert.ok(joinThread && joinThread.triggerAge >= joined.age + 4 && joinThread.triggerAge <= joined.age + 6, 'joining plants the test of loyalty');

// A conflict can end in leaving: you become a Defector and the old place comes looking
const rebel = fixer('aff-defect', { fixerGrade: 5 });
joinAffiliation(rebel, 'oufi');
rebel.affiliation.joinedAge = rebel.age - 4;
const conflict = byId('aff_conflict_oufi');
assert.equal(matchesEventContext(conflict, rebel), true);
assert.equal(matchesEventContext(byId('aff_conflict_zwei'), rebel), false);
rebel.pendingEvent = conflict;
const gone = resolveEventChoice(rebel, 2, () => 0.5);
assert.equal(laneOf(gone), 'free');
assert.ok(gone.flags.includes('Defector'));
assert.ok(gone.weaver.pendingThreads.some((t) => t.eventId === 'csq_aff_defector_visit'));
assert.equal(gone.stats.rep, rebel.stats.rep - 5);
const visit = byId('csq_aff_defector_visit');
assert.equal(isEventEligible(visit, gone, { scripted: true }), false, 'not yet');
gone.age += 3;
assert.equal(isEventEligible(visit, gone, { scripted: true }), true);

// Obeying keeps the badge and raises standing
const obey = fixer('aff-obey', { fixerGrade: 5 });
joinAffiliation(obey, 'oufi');
obey.affiliation.joinedAge = obey.age - 4;
obey.pendingEvent = byId('aff_conflict_oufi');
const obeyed = resolveEventChoice(obey, 0, () => 0.5);
assert.equal(obeyed.affiliation.standing, 60);

// Saves from before this system keep their Hook Office, Shi or Öufi
const legacy = fixer('aff-legacy');
legacy.org = { type: 'assoc', name: 'Öufi Association' };
assert.equal(getAffiliation(legacy).id, 'oufi');
assert.equal(laneOf(legacy), 'assoc');
const hook = fixer('aff-legacy-hook');
hook.org = { type: 'office', name: 'Hook Office' };
assert.equal(laneOf(hook), 'office');
assert.equal(hook.affiliation, undefined, 'reading does not write');

// The exam that belongs to the badge is preferred
const examTaker = fixer('aff-exam', { fixerGrade: 9 });
joinAffiliation(examTaker, 'seven');
assert.deepEqual(preferredPromoIds(examTaker), ['fixer_promo_g8_seven']);
assert.deepEqual(preferredPromoIds(fixer('aff-exam2')), []);

// Director: Section 1 and a high grade
const boss = fixer('aff-director', { fixerGrade: 2 });
boss.age = 40;
joinAffiliation(boss, 'liu');
boss.affiliation.joinedAge = boss.age - 10;
assert.equal(matchesEventContext(byId('aff_director_offer'), boss), false, 'needs Section 1');
boss.affiliation.section = 1;
assert.equal(matchesEventContext(byId('aff_director_offer'), boss), true);
boss.pendingEvent = byId('aff_director_offer');
const director = resolveEventChoice(boss, 0, () => 0.5);
assert.ok(director.flags.includes('AssocDirector'));
assert.equal(director.affiliation.director, true);
director.affiliation.standing = 0;
director.age += 1;
affiliationYearTick(director, () => 0.5);
assert.equal(laneOf(director), 'assoc', 'a Director is not cut by standing');

// A junior: taken on, taught over the years, and either graduates or is lost
const mentor = fixer('aff-mentor', { fixerGrade: 3 });
joinAffiliation(mentor, 'zwei');
mentor.affiliation.joinedAge = mentor.age - 5;
const offer = byId('aff_mentee_assoc');
assert.equal(matchesEventContext(offer, mentor), true);
assert.equal(matchesEventContext(byId('aff_mentee_free'), mentor), false);
mentor.pendingEvent = offer;
const teaching = resolveEventChoice(mentor, 0, () => 0.5);
assert.ok(teaching.flags.includes('Mentoring'));
assert.equal(teaching.npcs.mentee.role, 'mentee');
assert.equal(matchesEventContext(offer, teaching), false, 'one junior at a time');
let graduated = false;
for (let y = 0; y < 9 && !graduated; y++) {
  teaching.age += 1;
  const tick = affiliationYearTick(teaching, () => 0.5);
  graduated = tick.some((l) => l.key === 'mentee_graduate');
}
assert.ok(graduated, 'a steady junior graduates within a few years');
assert.ok(teaching.flags.includes('MentorGraduate') && !teaching.flags.includes('Mentoring'));
assert.equal(teaching.menteesTrained, 1);
assert.equal(matchesEventContext(offer, teaching), true, 'a new junior can come later');

const crisis = byId('aff_mentee_crisis');
const lost = { ...teaching };
lost.flags = [...lost.flags, 'Mentoring'];
lost.mentee = { sinceAge: lost.age, progress: 10 };
lost.npcs = { ...lost.npcs, mentee: { ...lost.npcs.mentee, graduated: false, status: 'alive', deceased: false } };
assert.equal(matchesEventContext(crisis, lost), true);
lost.pendingEvent = crisis;
const grief = resolveEventChoice(lost, 1, () => 0.99);
assert.equal(grief.npcs.mentee.deceased, true);
assert.ok(grief.flags.includes('MenteeLost') && !grief.flags.includes('Mentoring'));
assert.equal(grief.mentee, null);
const saved = resolveEventChoice({ ...lost, pendingEvent: crisis }, 0, () => 0);
assert.ok(saved.npcs.mentee.bond > lost.npcs.mentee.bond);
assert.ok(saved.mentee.progress > 10);

// A freelance Fixer can take a junior too
const loner = fixer('aff-free-mentor', { fixerGrade: 4 });
assert.equal(matchesEventContext(byId('aff_mentee_free'), loner), true);
assert.equal(matchesEventContext(byId('aff_mentee_assoc'), loner), false);

// Founding an Office changes the lane, and hiring pays a little
const founder = fixer('aff-owner', { fixerGrade: 5 });
founder.flags.push('OwnFixerOffice');
assert.equal(laneOf(founder), 'owner');
assert.equal(generateFixerContract(founder, createRNG('own')).affId, null);
founder.pendingEvent = byId('aff_office_hire');
const staffed = resolveEventChoice(founder, 2, () => 0.5);
assert.equal(staffed.officeState.staff, 2);
const w0 = staffed.stats.wealth;
affiliationYearTick(staffed, () => 0.5);
assert.ok(staffed.stats.wealth > w0);
const pressured = fixer('aff-pressure', { fixerGrade: 5 });
pressured.flags.push('OwnFixerOffice');
pressured.pendingEvent = byId('aff_office_pressure');
const patron = resolveEventChoice(pressured, 2, () => 0.5);
assert.equal(laneOf(patron), 'assoc');
assert.ok(patron.flags.includes('OwnFixerOffice'));
leaveAffiliation(patron, 'resign');
assert.equal(laneOf(patron), 'owner', 'leaving the patron returns you to your own Office');

// The whole year loop still runs for an affiliated Fixer and writes nothing broken
const yearly = fixer('aff-year', { fixerGrade: 6 });
joinAffiliation(yearly, 'dieci');
const ended = endYear(yearly, createRNG('aff-year-roll'));
assert.ok(ended.affiliation);
assert.ok(Number.isFinite(ended.stats.wealth));
assert.ok(standingLabel(ended, 'vi').length > 0);

assert.ok(Object.keys(OFFICES).length === 3);
console.log(`Affiliation passed: ${invited}/200 invitations, lanes, standing, warning and expulsion, sections, defection, Director, mentees and Offices.`);
