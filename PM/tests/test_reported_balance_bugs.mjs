import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ALL_STORY_EVENTS, createNewCharacter, generateFixerContract, getNextCareerMilestone, resolveEventChoice, resolveFixerContract, evaluateCharacterAchievements } from '../src/engine/gameEngine.js';
import { matchesEventContext, choiceIsAvailable } from '../src/engine/eventConditions.js';
import { weightedOutcomes } from '../src/engine/outcomeOdds.js';
import { reputationGain, driftOf } from '../src/engine/economyModel.js';
import { isEventEligible, selectEventWithWeaverAI } from '../src/engine/weaverAI.js';
import { LIFE_MINORS, resolveMinor, planYear, endYear } from '../src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
import { syndicateApexOpportunity, isFixerPromotionChoice, FIXER_LADDER, WING_LADDER_PROMOTIONS } from '../src/engine/careerPipeline.js';
import { useGameStore } from '../src/store/gameStore.js';
import { addScar } from '../src/engine/scarModel.js';
import { simulateNpcAutonomousLife } from '../src/engine/narrativeArcEngine.js';
import { evaluateDiscoChoiceCheck } from '../src/engine/discoPsyche.js';
import { WORKSHOP_ECONOMY_EVENTS } from '../src/data/eventsWorkshopEconomy.js';
import { settleRun, getDungeonMastery } from '../src/engine/dungeonEngine.js';
import { applyApexDirective } from '../src/engine/cityUpgrades.js';
import { applyAnnualPlan, previewAnnualPlanDeltas } from '../src/engine/annualPlan.js';

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
assert.ok(promoted.merit < FIXER_LADDER.find((step) => step.grade === 1).meritReq);
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
assert.equal(getNextCareerMilestone(wing).progressPct, Math.round(18 / WING_LADDER_PROMOTIONS[1].meritReq * 100));
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
const pausedLife = newChar();
pausedLife.plan = [];
pausedLife.planCursor = 0;
useGameStore.setState({ char: pausedLife, inRun: true, speed: 0, postChoicePauseMs: 3000, yearProgress: 25 });
useGameStore.getState().stepYear();
assert.equal(useGameStore.getState().yearProgress, 50);
assert.equal(useGameStore.getState().postChoicePauseMs, 0);

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

// BUG-36: E.G.O Resonance reachable & triggers Carmen crossroad at 62-74% without massive yearly decay
const egoSeeker = newChar();
egoSeeker.age = 24;
egoSeeker.job = 'Fixer';
egoSeeker.resonance = 64;
egoSeeker.stats.sanity = 36;
addScar(egoSeeker, 'Vết móc câu Sweeper 3:13 AM');
const resDrift = driftOf(egoSeeker).resonance || 0;
assert.ok(resDrift >= -3, `Resonance drift too harsh: ${resDrift}`);
const pickedEgo = selectEventWithWeaverAI({
  weaver: egoSeeker.weaver,
  char: egoSeeker,
  allPools: ALL_STORY_EVENTS,
  consequencePool: CONSEQUENCE_EVENTS,
  rng: () => 0
});
assert.equal(pickedEgo.event.id, 'ego_carmen_crossroad');
planYear(egoSeeker, () => 0.5);
assert.ok(egoSeeker.plan.some((it) => it.kind === 'major'));

// BUG-37: CharacterDossierCard renders multi-line District & Background perks without truncation
const dossierSrc = fs.readFileSync('src/features/chronicle/components/CharacterDossierCard.jsx', 'utf8');
assert.ok(dossierSrc.includes('kv-stack') && dossierSrc.includes('kv-perk-note'));

// BUG-38: career registration is a certain choice, not a Fixer promotion exam.
assert.equal(isFixerPromotionChoice(crossroad.choices[0], child), false);
assert.equal(isFixerPromotionChoice(grade2.choices.find((choice) => choice.setFixerGrade === 2), { ...licensed, fixerGrade: 3 }), true);

const pendingMinor = (event) => ({ id: event.id, vi: event.vi, en: event.en,
  choices: event.choices.map((choice) => ({ vi: choice.vi, en: choice.en })), t: 0.4 });

// BUG-39: the four coins are kept only when the child is rescued.
const cheapJob = LIFE_MINORS.find((event) => event.id === 'm2_fx_cheap_job');
for (const [roll, expectedAhn] of [[0, 4], [0.99, 0]]) {
  const worker = newChar();
  worker.job = 'Fixer';
  worker.fixerGrade = 9;
  worker.stats.wealth = 20;
  worker.pendingMinor = pendingMinor(cheapJob);
  const resolved = resolveMinor(worker, 0, () => roll);
  assert.equal(resolved.stats.wealth - worker.stats.wealth, expectedAhn, `Four Ahn case at roll ${roll}`);
}

// BUG-40: the 22-Ahn overhaul requires owning gear, grants '고급장비', and buffs both contract and dungeon mastery.
const overhaul = LIFE_MINORS.find((event) => event.id === 'm_wellness_workshop_tuneup');
const bareChar = newChar();
bareChar.job = 'Fixer';
bareChar.inventory = [];
assert.equal(matchesEventContext(overhaul, bareChar), false, 'Overhaul event requires owning gear');

const wounded = newChar();
wounded.job = 'Fixer';
wounded.inventory = [{ id: 'workshop_blade', type: 'weapon', nameVi: 'Kiếm xưởng', nameEn: 'Workshop blade' }];
Object.assign(wounded.stats, { wealth: 40, health: 50, sanity: 50, network: 20, rep: 80 });
wounded.pendingMinor = pendingMinor(overhaul);
const serviced = resolveMinor(wounded, 0, () => 0.5);
assert.equal(serviced.stats.wealth - wounded.stats.wealth, -22);
assert.equal(serviced.stats.health, wounded.stats.health);
assert.ok(serviced.stats.sanity - wounded.stats.sanity >= 6);
assert.ok(serviced.stats.network - wounded.stats.network >= 10);
assert.ok(serviced.flags.includes('고급장비'), 'BUG-40: Overhaul grants Advanced Gear flag');

const dummyDef = { id: 'dungeon_test', theme: 'backstreets' };
const baseMastery = getDungeonMastery(dummyDef, wounded);
const tunedMastery = getDungeonMastery(dummyDef, serviced);
assert.ok(tunedMastery.checkBonus > baseMastery.checkBonus, 'Tuned gear provides higher dungeon check bonus');
assert.ok(tunedMastery.dmgMult < baseMastery.dmgMult, 'Tuned gear reduces dungeon damage taken');

// Having '고급장비' flag without any equipment must NOT grant phantom +12 contract power
const nakedTuned = newChar();
nakedTuned.job = 'Fixer';
nakedTuned.flags = ['고급장비'];
nakedTuned.inventory = [];
const contractNaked = generateFixerContract(nakedTuned, () => 0.5);
const controlNaked = generateFixerContract(bareChar, () => 0.5);
assert.equal(contractNaked.combatPower, controlNaked.combatPower, 'Empty inventory with 고급장비 flag must not grant free contract power');

// BUG-42: Syndicate Middle rank 2 milestone progressPct must be rounded integer, not 91.66666666666666
const middleChar = newChar();
middleChar.job = 'Syndicate';
middleChar.finger = 'Middle';
middleChar.fingerRank = 2;
middleChar.age = 33;
middleChar.merit = 120;
middleChar.stats.rep = 60;
middleChar.stats.network = 50;
middleChar.lastFingerPromotionAge = 28;
const msMiddle = getNextCareerMilestone(middleChar);
assert.equal(typeof msMiddle.progressPct, 'number');
assert.equal(Number.isInteger(msMiddle.progressPct), true, 'progressPct must be an integer');

// BUG-43: csq_lost_contraband_collector debt payment must require 35 Ahn
const contrabandEvent = CONSEQUENCE_EVENTS.find(e => e.id === 'csq_lost_contraband_collector');
const brokeDebtor = newChar();
brokeDebtor.stats.wealth = 19;
brokeDebtor.pendingEvent = contrabandEvent;
assert.equal(choiceIsAvailable(contrabandEvent.choices[0], brokeDebtor), false, 'Cannot pay 35 Ahn debt with only 19 Ahn');
const solventDebtor = newChar();
solventDebtor.stats.wealth = 50;
solventDebtor.pendingEvent = contrabandEvent;
assert.equal(choiceIsAvailable(contrabandEvent.choices[0], solventDebtor), true);
const paidDebtor = resolveEventChoice(solventDebtor, 0, () => 0.5);
assert.equal(paidDebtor.stats.wealth, 15, '50 Ahn - 35 Ahn = 15 Ahn');

// BUG-46: Conquering dungeon_warp_train awards warp_cleanup record, while merely encountering an event does not
const warpSurvivor = newChar();
const warpSession = { id: 'dungeon_warp_train', stages: [] };
settleRun(warpSurvivor, warpSession, 'conquered');
assert.ok((warpSurvivor.unlockedRecords || []).includes('warp_cleanup'), 'BUG-46: Conquering WARP train must award warp_cleanup');

const bystander = newChar();
bystander.seenEvents = ['wing_warp_cleanup_dilemma', 'gate_outcast_warp_cleanup_done'];
evaluateCharacterAchievements(bystander);
assert.equal((bystander.unlockedRecords || []).includes('warp_cleanup'), false, 'BUG-46: Merely seeing W Corp dilemma or declining gate must not unlock warp_cleanup');

// BUG-49: econ_stigma_atelier_merchant fixed cost must not be inflated by jitter
const stigmaEvent = WORKSHOP_ECONOMY_EVENTS.find(e => e.id === 'econ_stigma_atelier_merchant');
for (const roll of [0, 0.5, 1]) {
  const buyer = newChar();
  buyer.stats.wealth = 100;
  buyer.pendingEvent = stigmaEvent;
  const afterBuy = resolveEventChoice(buyer, 0, () => roll);
  assert.equal(100 - afterBuy.stats.wealth, 65, `BUG-49: Stigma blade cost must strictly be 65 Ahn across roll ${roll}`);
}

// BUG-44: Year-end log card provides detailed breakdown separating income, living costs, recovery & wear
const workingAdult = newChar();
workingAdult.job = 'Fixer';
workingAdult.age = 25;
workingAdult.fixerGrade = 7;
workingAdult.stats.wealth = 2; // low wealth to exercise lower bound clamping
workingAdult.stats.health = 40;
workingAdult.heat = 5; // ensure heat dissipation is triggered
const yearEnded = endYear(workingAdult, () => 0.0); // roll 0 gives negative market jitter
const yearEndLog = yearEnded.logs.find(l => l.key === 'year_end');
assert.ok(yearEndLog, 'Must generate year_end log');
assert.ok(Array.isArray(yearEndLog.breakdown), 'Must provide breakdown array');
assert.ok(yearEndLog.breakdown.some(b => b.cat === 'economy' && b.k === 'wealth'), 'Breakdown must track economy/wealth changes');
assert.ok(yearEndLog.breakdown.some(b => b.k === 'heat' && b.v === -1), 'Breakdown must explain Heat reduction');
// Reconciled breakdown sum must strictly match actual deltas for all stats
const allStats = new Set([...yearEndLog.breakdown.map(b => b.k), ...yearEndLog.deltas.map(d => d.k)]);
for (const k of allStats) {
  const bSum = yearEndLog.breakdown.filter(b => b.k === k).reduce((s, b) => s + (b.v || 0), 0);
  const dVal = yearEndLog.deltas.find(d => d.k === k)?.v ?? 0;
  assert.equal(bSum, dVal, `Breakdown sum for ${k} (${bSum}) must strictly equal delta (${dVal})`);
}

// Apex Directive bond boost must strictly target active NPCs and not leak to deceased NPCs or default bond: 0 to 40
const apexLeader = newChar();
apexLeader.job = 'Fixer';
apexLeader.fixerGrade = 1;
apexLeader.npcs = {
  friend: { nameVi: 'Người bạn quá cố', nameEn: 'Fallen Friend', alive: false, bond: 0, status: 'dead' },
  partner: { nameVi: 'Cộng sự còn sống', nameEn: 'Active Partner', alive: true, bond: 10, status: 'alive' }
};
applyApexDirective(apexLeader, 'mentor_network');
assert.equal(apexLeader.npcs.friend.bond, 0, 'Deceased NPC bond must remain 0 and not jump to 40+');
assert.equal(apexLeader.npcs.partner.bond, 14, 'Active NPC bond must be properly boosted by mentor_network');

// Scheme Annual Plan: active companions without explicit status field must be correctly penalized
const schemer = newChar();
schemer.npcs = {
  companion: { nameVi: 'Cộng sự thân thiết', nameEn: 'Close Companion', alive: true, bond: 50 }
};
const planPreview = previewAnnualPlanDeltas(schemer, { work: 0, train: 0, rest: 0, bond: 0, scheme: 3 });
assert.equal(planPreview.companionBond, -4, 'Preview must anticipate -4 Bond penalty');
schemer.pendingYearPlan = { age: schemer.age };
schemer.ambition = { id: 'fortune' };
const planApplied = applyAnnualPlan(schemer, { work: 0, train: 0, rest: 0, bond: 0, scheme: 3 }, 'fortune');
assert.ok(planApplied, 'applyAnnualPlan must succeed');
assert.equal(schemer.npcs.companion.bond, 46, 'Scheme points must decrease active companion bond from 50 to 46');

// Annual Plan Preview edge case 1: No active NPCs must not project phantom bond from Apex directives
const soloCommander = newChar();
soloCommander.job = 'Fixer';
soloCommander.fixerGrade = 1;
soloCommander.npcs = {}; // No NPCs
const soloPreview = previewAnnualPlanDeltas(soloCommander, { work: 1, train: 1, rest: 1, bond: 0, scheme: 0 }, 'mentor_network');
assert.equal(soloPreview.companionBond, 0, 'Preview must not project phantom bond when character has no NPCs');
assert.equal(soloPreview.companionDetails.length, 0, 'No companion details when no NPCs exist');

// Annual Plan Preview edge case 2: NPC with 1 Bond under Scheme 3 must predict -1, clamped at 0
const lowBondChar = newChar();
lowBondChar.npcs = {
  friend: { nameVi: 'Bạn cũ', nameEn: 'Old Friend', alive: true, bond: 1 }
};
const lowBondPreview = previewAnnualPlanDeltas(lowBondChar, { work: 0, train: 0, rest: 0, bond: 0, scheme: 3 });
assert.equal(lowBondPreview.companionBond, -1, 'Preview must predict -1 when NPC has only 1 Bond to lose');
assert.equal(lowBondPreview.companionDetails[0].delta, -1);
assert.equal(lowBondPreview.companionDetails[0].nextBond, 0);
lowBondChar.pendingYearPlan = { age: lowBondChar.age };
lowBondChar.ambition = { id: 'fortune' };
applyAnnualPlan(lowBondChar, { work: 0, train: 0, rest: 0, bond: 0, scheme: 3 }, 'fortune');
assert.equal(lowBondChar.npcs.friend.bond, 0, 'Actual bond reduction must strictly clamp at 0');

// Annual Plan Preview edge case 3: NPC with 98 Bond under directive bondBoost +4 must predict +2, clamped at 100
const highBondCommander = newChar();
highBondCommander.job = 'Fixer';
highBondCommander.fixerGrade = 1;
highBondCommander.npcs = {
  partner: { nameVi: 'Cộng sự lâu năm', nameEn: 'Veteran Partner', alive: true, bond: 98 }
};
const highBondPreview = previewAnnualPlanDeltas(highBondCommander, { work: 1, train: 1, rest: 1, bond: 0, scheme: 0 }, 'mentor_network');
assert.equal(highBondPreview.companionBond, 2, 'Preview must predict +2 when NPC bond clamps at 100');
assert.equal(highBondPreview.companionDetails[0].nextBond, 100);

// BUG-45: High-danger contracts award premium pay & merit matching narrative stakes
const eliteFixer = newChar();
eliteFixer.job = 'Fixer';
eliteFixer.fixerGrade = 3;
eliteFixer.age = 35;
const dangerReq = {
  id: 'req_dangerous_raid',
  tier: 4,
  highDanger: true,
  typeVi: 'Đột kích cứ điểm Syndicate tử thủ',
  typeEn: 'Raid a fortified Syndicate redoubt',
  vi: 'Vòng vây sát thủ phong tỏa khu vực...',
  en: 'Assassins encircled the perimeter...',
  okVi: 'Thắng lợi',
  okEn: 'Victory',
  failVi: 'Thất bại',
  failEn: 'Defeat',
  deathVi: 'Tử trận',
  deathEn: 'Death'
};
const customContract = generateFixerContract(eliteFixer, () => 0.5, dangerReq);
// Test that high stakes contract assigns stakesTag and buffs pay/merit over base tier
assert.ok(customContract.stakesTag, 'High-danger contract must receive stakesTag');
assert.equal(customContract.template.id, 'req_dangerous_raid', 'Custom contract must use provided template');
const tier4BasePay = 24;
const tier4BaseMerit = 18;
const expectedPayBonus = Math.max(2, Math.round(tier4BasePay * 0.25)); // 6
const expectedMeritBonus = Math.max(1, Math.round(tier4BaseMerit * 0.2)); // 4
for (const approach of customContract.approaches.filter(a => !a.isDecline)) {
  assert.ok(approach.payAhn >= tier4BasePay + expectedPayBonus, 'Approach pay must include high-danger premium bonus');
  assert.ok(approach.meritGain >= tier4BaseMerit + expectedMeritBonus, 'Approach merit must include high-danger premium bonus');
}
// Test that failure penalty properly inflicts the high-stakes damage (+4 HP, +3 SP)
const failingFixer = newChar();
failingFixer.stats.health = 50;
failingFixer.stats.sanity = 50;
failingFixer.pendingContract = customContract;
const app0 = customContract.approaches[0];
// Choose roll strictly in failure window
const failRoll = (app0.successPct + 1) / 100;
const afterFailure = resolveFixerContract(failingFixer, app0.id, () => failRoll);
// Base tier 4 damage: HP = 10 + 4*5 = 30; SP = 6 + 4*3 = 18. Stakes bonus: +4 HP, +3 SP => HP loss = 34, SP loss = 21.
assert.equal(afterFailure.stats.health, 50 - 34, 'Failure on stakes contract must inflict base + 4 extra HP damage (34 total)');
assert.equal(afterFailure.stats.sanity, 50 - 21, 'Failure on stakes contract must inflict base + 3 extra SP damage (21 total)');

// BUG-41 & BUG-50: chronicle.css contains .choice-need styling and .epitaph-spotlight-section rules
const chronicleCss = fs.readFileSync('src/styles/ui/chronicle.css', 'utf8');
assert.ok(chronicleCss.includes('.choice-need'), 'chronicle.css must define .choice-need');
assert.ok(chronicleCss.includes('.epitaph-spotlight-section'), 'chronicle.css must define .epitaph-spotlight-section');
assert.ok(chronicleCss.includes('.spotlight-milestone-card'), 'chronicle.css must define .spotlight-milestone-card');

console.log('Reported balance bugs 23–50: progression gates, paused step, Syndicate Apex, E.G.O, dossier, career preview and exact Ahn/recovery rewards passed.');
