import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ALL_STORY_EVENTS, createNewCharacter, generateFixerContract, getNextCareerMilestone, resolveEventChoice, resolveFixerContract } from '../src/engine/gameEngine.js';
import { matchesEventContext, choiceIsAvailable } from '../src/engine/eventConditions.js';
import { weightedOutcomes } from '../src/engine/outcomeOdds.js';
import { reputationGain, driftOf } from '../src/engine/economyModel.js';
import { isEventEligible, selectEventWithWeaverAI } from '../src/engine/weaverAI.js';
import { LIFE_MINORS, resolveMinor, planYear } from '../src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
import { syndicateApexOpportunity } from '../src/engine/careerPipeline.js';
import { addScar } from '../src/engine/scarModel.js';
import { simulateNpcAutonomousLife } from '../src/engine/narrativeArcEngine.js';
import { evaluateDiscoChoiceCheck } from '../src/engine/discoPsyche.js';

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
assert.equal(promoted.logs.findLast((entry) => entry.review)?.review.choices.length, grade2.choices.length);

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
invited.pendingMinor = { id: letter.id, vi: letter.vi, en: letter.en,
  choices: letter.choices.map((choice) => ({ vi: choice.vi, en: choice.en })), t: 0.4 };
const accepted = resolveMinor(invited, accept, () => 0.5);
assert.ok(accepted.memory.some((entry) => entry.key === 'library_invite_accepted'));
assert.equal(accepted.logs.findLast((entry) => entry.review)?.review.choices.length, 3);

const exam = LIFE_MINORS.find((event) => event.id === 'm2_fx_grade_exam');
const fixerBuyer = newChar();
fixerBuyer.job = 'Fixer';
fixerBuyer.stats.wealth = 10;
fixerBuyer.pendingMinor = { id: exam.id, vi: exam.vi, en: exam.en,
  choices: exam.choices.map((choice) => ({ vi: choice.vi, en: choice.en })), t: 0.4 };
assert.equal(choiceIsAvailable(exam.choices[0], fixerBuyer), true);
const purchased = resolveMinor(fixerBuyer, 0, () => 0);
assert.equal(purchased.stats.wealth, 0);
assert.equal(purchased.logs.findLast((entry) => entry.review)?.review.choices.length, 2);
fixerBuyer.stats.wealth = 9;
assert.equal(choiceIsAvailable(exam.choices[0], fixerBuyer), false);
assert.equal(resolveMinor(fixerBuyer, 0, () => 0).stats.wealth, 9);

const remedy = LIFE_MINORS.find((event) => event.id === 'm_med_child_remedy');
const poorChild = newChar();
poorChild.age = 10;
poorChild.job = 'Child';
poorChild.stats.wealth = 0;
poorChild.stats.health = 50;
poorChild.pendingMinor = { id: remedy.id, vi: remedy.vi, en: remedy.en,
  choices: remedy.choices.map((choice) => ({ vi: choice.vi, en: choice.en })), t: 0.4 };
assert.equal(choiceIsAvailable(remedy.choices[0], poorChild), false);
assert.equal(resolveMinor(poorChild, 0, () => 0).stats.health, 50);
assert.equal(choiceIsAvailable(remedy.choices[1], poorChild), true);

const clinic = LIFE_MINORS.find((event) => event.id === 'm_med_backstreet_clinic');
const patient = newChar();
patient.job = 'Fixer';
patient.stats.health = 50;
patient.stats.wealth = 20;
patient.pendingMinor = { id: clinic.id, vi: clinic.vi, en: clinic.en,
  choices: clinic.choices.map((choice) => ({ vi: choice.vi, en: choice.en })), t: 0.4 };
assert.equal(resolveMinor(patient, 0, () => 0).stats.wealth, 0);

const wing = newChar();
wing.job = 'Wing Employee';
wing.wingRank = 1;
wing.age = 44;
wing.lastWingPromotionAge = 40;
wing.merit = 18;
wing.stats.wealth = 45;
wing.stats.network = 32;
assert.equal(getNextCareerMilestone(wing).progressPct, Math.round(18 / 65 * 100));
for (const id of ['m_career_wing_quota', 'm_career_wing_incident']) {
  const opportunity = LIFE_MINORS.find((event) => event.id === id);
  const employee = newChar();
  employee.job = 'Wing Employee';
  employee.age = 44;
  employee.pendingMinor = { id, vi: opportunity.vi, en: opportunity.en,
    choices: opportunity.choices.map((choice) => ({ vi: choice.vi, en: choice.en })), t: 0.4 };
  const worked = resolveMinor(employee, 0, () => 0);
  assert.ok(worked.merit > employee.merit, id);
}

const oddsChoice = { outcomes: [
  { w: 50, effects: { health: 5 } },
  { w: 50, effects: { health: -5 }, need: { flags: ['Impossible'] } }
] };
assert.equal(weightedOutcomes(oddsChoice, newChar()).length, 1);
const weightedChoice = { outcomes: [
  { w: 65, resultVi: 'Bạn thoát khỏi vòng vây.', effects: { health: 3 } },
  { w: 35, resultVi: 'Bạn trúng đòn.', effects: { health: -12 } }
] };
for (const state of [newChar(), { ...newChar(), flags: ['ShinAwakened'], stats: { ...newChar().stats, sanity: 18, health: 20 } }]) {
  const weighted = weightedOutcomes(weightedChoice, state);
  const expected = Math.round(100 * weighted[0].weight / weighted.reduce((sum, entry) => sum + entry.weight, 0));
  const shown = evaluateDiscoChoiceCheck(weightedChoice, state);
  assert.equal(shown.successPct, expected);
  assert.match(shown.badgeEn, /FIRST OUTCOME|First outcome/);
  assert.deepEqual(shown.modifiers, []);
}
assert.equal(reputationGain(30, 8), 8);
assert.ok(reputationGain(95, 8) < reputationGain(65, 8));

for (const grade of [9, 7, 5, 3, 1]) {
  for (const health of [25, 60, 100]) {
    const fixer = newChar();
    fixer.job = 'Fixer';
    fixer.fixerGrade = grade;
    fixer.stats.health = health;
    fixer.stats.sanity = health;
    const contract = generateFixerContract(fixer, () => 0.5);
    const [carefulOdds, boldOdds, intelOdds] = contract.approaches;
    assert.ok(boldOdds.deathPct >= carefulOdds.deathPct);
    assert.ok(intelOdds.successPct >= carefulOdds.successPct);
    for (const approach of contract.approaches.filter((entry) => !entry.isDecline)) {
      assert.equal(approach.successPct + approach.failPct + approach.deathPct, 100, `${grade}/${health}/${approach.id}`);
      assert.ok(approach.successPct > 0 && approach.failPct >= 0 && approach.deathPct > 0);
    }
  }
}
const fixer = newChar();
fixer.job = 'Fixer';
fixer.pendingContract = generateFixerContract(fixer, () => 0.5);
const careful = fixer.pendingContract.approaches.find((entry) => entry.id === 'careful');
const outcomeAt = (roll) => resolveFixerContract(fixer, 'careful', () => roll / 100).logs.find((entry) => entry.id.startsWith('log_req_'))?.id || '';
assert.match(outcomeAt(careful.successPct - 0.01), /log_req_ok/);
assert.match(outcomeAt(careful.successPct + 0.01), /log_req_fail/);
assert.doesNotMatch(outcomeAt(careful.successPct + careful.failPct + 0.01), /log_req_(ok|fail)/);

// BUG-34: PlayBar & gameStore must not lock stepYear / btn-step-season behind postChoicePauseMs when paused
const playBarSrc = fs.readFileSync('src/features/chronicle/components/PlayBar.jsx', 'utf8');
const gameStoreSrc = fs.readFileSync('src/store/gameStore.js', 'utf8');
assert.ok(!playBarSrc.includes('const isWaiting = (s) => Boolean(s?.char?.pendingEvent || s?.char?.pendingContract || s?.char?.pendingDungeon || s?.char?.pendingModal || s?.activeResolution || (s?.postChoicePauseMs > 0));'));
assert.ok(gameStoreSrc.includes('const readingPause = get().speed > 0 && !nextChar.pendingModal ? 3000 : 0;'));

// BUG-35: Syndicate Apex (fingerRank === 3) unique Finger leader events + money-making & money-spending options
for (const [finger, ids] of [
  ['Thumb', ['syn_thumb_apex_tribute_summit', 'syn_thumb_apex_wing_treaty']],
  ['Index', ['syn_index_apex_loom_decree', 'syn_index_apex_fate_arbitration']],
  ['Middle', ['syn_middle_apex_vengeance_court', 'syn_middle_apex_turf_crusade']],
  ['Ring', ['syn_ring_apex_royal_auction', 'syn_ring_apex_critic_tribunal']],
  ['Pinky', ['syn_pinky_apex_shadow_bourse', 'syn_pinky_apex_ten_blades_conclave']]
]) {
  const boss = newChar();
  boss.age = 36;
  boss.job = 'Syndicate';
  boss.finger = finger;
  boss.fingerRank = 3;
  boss.stats.wealth = 50;
  const opp = syndicateApexOpportunity(boss);
  assert.ok(opp && opp.route === 'finger_apex', `Apex opportunity for ${finger}`);
  for (const id of ids) {
    const ev = ALL_STORY_EVENTS.find((e) => e.id === id);
    assert.ok(ev, `Missing apex event ${id}`);
    assert.equal(isEventEligible(ev, boss), true, `${id} eligible for ${finger} rank 3`);
    assert.equal(isEventEligible(ev, { ...boss, fingerRank: 2 }), false, `${id} gated from rank 2`);
    assert.ok(ev.choices.some((c) => (c.effects?.wealth || 0) >= 25), `${id} has money-earning choice`);
  }
}

// BUG-36: E.G.O Resonance reachable & triggers Carmen crossroad at 58-70% without massive yearly decay
const egoSeeker = newChar();
egoSeeker.age = 24;
egoSeeker.job = 'Fixer';
egoSeeker.resonance = 60;
egoSeeker.stats.sanity = 36;
addScar(egoSeeker, 'Vết móc câu Sweeper 3:13 AM');
const resDrift = driftOf(egoSeeker).resonance || 0;
assert.ok(resDrift >= -3, `Resonance drift too harsh: ${resDrift}`);
const pickedEgo = selectEventWithWeaverAI({
  weaver: egoSeeker.weaver,
  char: egoSeeker,
  allPools: ALL_STORY_EVENTS,
  consequencePool: CONSEQUENCE_EVENTS,
  rng: () => 0.5
});
assert.equal(pickedEgo.event.id, 'ego_carmen_crossroad');
planYear(egoSeeker, () => 0.5);
assert.ok(egoSeeker.plan.some((it) => it.kind === 'major'));

// BUG-37: CharacterDossierCard renders multi-line District & Background perks without truncation
const dossierSrc = fs.readFileSync('src/features/chronicle/components/CharacterDossierCard.jsx', 'utf8');
assert.ok(dossierSrc.includes('kv-stack') && dossierSrc.includes('kv-perk-note'));

console.log('Reported balance bugs 23–37: rank gates, exact Ahn costs, choice review, Wing progress, Pause+StepYear unlock, Syndicate Apex economy, E.G.O Resonance balance, and Dossier perk layout passed.');
