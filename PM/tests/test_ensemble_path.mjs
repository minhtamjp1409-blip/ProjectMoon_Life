import assert from 'node:assert/strict';
import { buildLifeSummaryAndLegacy, createNewCharacter, createRNG, resolveEventChoice } from '../src/engine/gameEngine.js';
import { DUNGEON_BALANCE, DUNGEON_DEFINITIONS, createDungeonSession, evaluateDungeonChoiceOdds, fleeDungeon, getDungeonCurrentStage, getDungeonMastery, resolveDungeonChoice } from '../src/engine/dungeonEngine.js';
import { ENSEMBLE_DUNGEON_ID, ENSEMBLE_INVITE_ID, ENSEMBLE_LAST_CALL_ID, ensembleEligible, ensembleRoute, prepareEnsembleYear, recordEnsembleInvitation } from '../src/engine/ensemblePath.js';
import { planYear, runPlanItem, syncPlanWithBackend } from '../src/engine/yearPlanner.js';
import { cityArchiveAPI } from '../src/services/api/cityArchiveAPI.js';
import { migrateRun, SAVE_VERSION } from '../src/engine/saveSchema.js';
import { sceneContextOf } from '../src/engine/sceneContext.js';
import { localizeEnsembleName } from '../src/data/ensembleNames.js';

const apex = (route, seed = route) => {
  const char = createNewCharacter({ seed: `ensemble-${seed}`, startAge: 30 });
  char.age = 35;
  char.alive = true;
  char.taboo = 0;
  char.stats = { ...char.stats, health: 100, sanity: 100, rep: 70, wealth: 70 };
  if (route === 'color') { char.job = 'Fixer'; char.flags.push('ColorFixer'); char.fixerGrade = 1; }
  if (route === 'finger') { char.job = 'Syndicate'; char.finger = 'Ring'; char.fingerRank = 3; }
  if (route === 'wing') { char.job = 'Wing Employee'; char.wingRank = 3; }
  if (route === 'workshop') { char.job = 'Workshop Craftsman'; char.workshopRank = 3; }
  return char;
};

const def = DUNGEON_DEFINITIONS[ENSEMBLE_DUNGEON_ID];
assert.equal(def.stages.length, 4);
assert(def.noWager && def.noCompanion && def.noRewards);
const youngApex = apex('color', 'young');
youngApex.age = 28;
assert.equal(prepareEnsembleYear(youngApex), null);
youngApex.age = 30;
assert.equal(prepareEnsembleYear(youngApex), ENSEMBLE_INVITE_ID, 'two apex years count before age thirty');
const ordinaryEgo = apex('color', 'ego-alone');
ordinaryEgo.flags = ['EGOAwakened'];
assert.equal(ensembleEligible(ordinaryEgo), false, 'E.G.O alone is not an apex career');
for (const route of ['color', 'finger', 'wing', 'workshop']) {
  const char = apex(route);
  assert.equal(ensembleRoute(char), route);
  assert(ensembleEligible(char));
  assert.equal(prepareEnsembleYear(char), null);
  char.age = 37;
  assert.equal(prepareEnsembleYear(char), ENSEMBLE_INVITE_ID);
  recordEnsembleInvitation(char, false);
  char.age = 39;
  assert.equal(prepareEnsembleYear(char), null);
  char.age = 40;
  assert.equal(prepareEnsembleYear(char), ENSEMBLE_INVITE_ID);
  recordEnsembleInvitation(char, false);
  char.age = 41;
  assert.equal(prepareEnsembleYear(char), ENSEMBLE_LAST_CALL_ID);
  const session = createDungeonSession(ENSEMBLE_DUNGEON_ID, char);
  assert(session.ensembleForced);
  assert.equal(session.ensembleRoute, route);
  assert.equal(getDungeonCurrentStage(session).canFlee, false);
  assert(getDungeonCurrentStage(session).choices.every((choice) => !choice.isFlee));
  char.pendingDungeon = session;
  assert.equal(fleeDungeon(char).isFinished, false);
  session.currentStageIndex = 1;
  assert.match(getDungeonCurrentStage(session).nameEn, /Tanya|Pluto|Jae-heon|Eileen/);
}

const opened = apex('color', 'retreat');
opened.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, opened);
assert.equal(getDungeonCurrentStage(opened.pendingDungeon).choices.length, 2, 'retreat is only the dedicated F button');
const retreated = fleeDungeon(opened);
assert.equal(retreated.resolution.outcome, 'fled');
assert.equal(retreated.char.stats.rep, 62);
assert.equal(retreated.char.ensemble.declines, 1);

let winner = apex('color', 'win');
winner.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, winner);
let won;
for (let i = 0; i < 4; i++) {
  won = resolveDungeonChoice(winner, 1, () => 0);
  winner = won.char;
  assert(won, `act ${i + 1} resolved`);
}
assert.equal(won.resolution?.outcome, 'conquered');
assert(won.char.ensembleScore);
assert(won.char.unlockedRecords.includes('ensemble_star_unextinguished'));
assert.equal(buildLifeSummaryAndLegacy(won.char).ensembleScore, true);
const heir = createNewCharacter({ seed: 'ensemble-heir', parentLegacy: buildLifeSummaryAndLegacy(won.char) });
assert.equal(heir.lineage.relic, 'Bản tổng phổ viết dở');
assert(heir.inventory.some((item) => item.id === 'spc_unfinished_score'));
assert(!heir.flags.includes('EnsembleSurvivor'), 'the medal is earned, never inherited');

const finale = apex('wing', 'finale');
finale.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, finale);
finale.pendingDungeon.currentStageIndex = 3;
const missed = resolveDungeonChoice(finale, 1, () => 0.999);
assert.equal(missed.resolution?.outcome, 'dead');
assert.equal(missed.char.alive, false);

const coda = apex('finger', 'coda');
coda.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, coda);
coda.pendingDungeon.ensembleHarmony = 2;
const lured = resolveDungeonChoice(coda, 0, () => 0);
assert(lured.char.pendingDungeon?.ensembleCoda);
assert(sceneContextOf({ inRun: true, char: lured.char }).carmen, 'Carmen ambience follows Coda even above low-SP threshold');
assert.equal(getDungeonCurrentStage(lured.char.pendingDungeon).choices.length, 2);
const surrendered = resolveDungeonChoice(lured.char, 0, () => 0);
assert.equal(surrendered.resolution?.outcome, 'distorted');
assert(surrendered.char.flags.includes('Distorted'));
assert(!surrendered.char.flags.includes('EGOAwakened'));

const defiant = apex('workshop', 'defiant');
defiant.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, defiant);
defiant.pendingDungeon.ensembleCoda = true;
const failedDefiance = resolveDungeonChoice(defiant, 1, () => 0.999);
assert.equal(failedDefiance.resolution?.outcome, 'dead');

let marked = apex('color', 'volatile');
marked.flags.push('EGOAwakened');
marked.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, marked);
for (const index of [0, 0, 0, 1, 1]) marked = resolveDungeonChoice(marked, index, () => 0).char;
assert.equal(marked.pendingDungeon, null);
assert(marked.ensembleScore && marked.flags.includes('IncompleteEGO'));
assert(!marked.flags.includes('EGOAwakened'), 'three Harmony marks leave Volatile E.G.O after victory');

const exhausted = apex('color', 'zero-sp');
exhausted.stats.sanity = 1;
exhausted.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, exhausted);
exhausted.pendingDungeon.sanityStrain = 75;
const mentalBreak = resolveDungeonChoice(exhausted, 1, () => 0);
assert(mentalBreak.char.pendingDungeon.ensembleCoda, 'generic resolve awakening cannot erase a zero-SP Carmen choice');
const stage = getDungeonCurrentStage(mentalBreak.char.pendingDungeon);
const odds = evaluateDungeonChoiceOdds(stage.choices[1], mentalBreak.char, mentalBreak.char.pendingDungeon);
const resisted = resolveDungeonChoice(mentalBreak.char, 1, () => 0);
assert.equal(resisted.char.stats.health - mentalBreak.char.stats.health, odds.estHp);
assert.equal(resisted.char.stats.sanity - mentalBreak.char.stats.sanity, odds.estSp);
const savedCoda = migrateRun(JSON.parse(JSON.stringify({ version: SAVE_VERSION, char: mentalBreak.char })));
assert(savedCoda.char.pendingDungeon.ensembleCoda);
assert.equal(getDungeonCurrentStage(savedCoda.char.pendingDungeon).choices.length, 2);

const scheduled = apex('wing', 'schedule');
scheduled.ensemble = { apexSinceAge: 30, declines: 1, nextAge: 35 };
planYear(scheduled, createRNG('ensemble-year'));
const invite = scheduled.plan.find((item) => item.forcedEventId === ENSEMBLE_INVITE_ID);
assert(invite, 'an invitation survives a busy apex year');
assert(!scheduled.pendingLead?.offers.some((offer) => offer.tier === 'forbidden'), 'Ensemble and a new Taboo chain never share a year');
const originalPlanYear = cityArchiveAPI.planYear;
try {
  cityArchiveAPI.planYear = async () => ({ moments: ['Spring', 'Summer', 'Autumn', 'Winter'].map((season, seasonIdx) => ({ kind: 'daily', t: 0.1 + seasonIdx * 0.25, season, seasonIdx })) });
  await syncPlanWithBackend(scheduled, createRNG('ensemble-backend'));
  assert(scheduled.plan.some((item) => item.forcedEventId === ENSEMBLE_INVITE_ID));
} finally { cityArchiveAPI.planYear = originalPlanYear; }
runPlanItem(scheduled, invite, () => 0.5);
assert.equal(scheduled.pendingEvent?.id, ENSEMBLE_INVITE_ID);
const declined = resolveEventChoice(scheduled, 1, () => 0);
assert.equal(declined.ensemble.nextAge, 36);
assert.match(declined.logs.at(-1).en, /one year to prepare/);
assert.equal(scheduled.ensemble.declines, 1, 'resolving an invitation leaves the previous state intact');

const taboo = apex('wing', 'claw-priority');
taboo.taboo = 3;
assert.equal(prepareEnsembleYear(taboo), null);

for (let act = 0; act < 3; act++) {
  const tempted = apex('color', `temptation-${act}`);
  tempted.stats.sanity = 50;
  tempted.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, tempted);
  tempted.pendingDungeon.currentStageIndex = act;
  tempted.pendingDungeon.sanityStrain = 20;
  const harmony = resolveDungeonChoice(tempted, 0, () => 0);
  const own = resolveDungeonChoice(tempted, 1, () => 0);
  assert(harmony.char.stats.sanity > tempted.stats.sanity, 'following the beat actually restores SP');
  assert(harmony.session.sanityStrain < own.session.sanityStrain, 'following the beat relieves pressure');
  assert.equal(harmony.session.ensembleHarmony, 1, 'relief has a Harmony price');
}

const checkFinal = apex('color', 'scaling');
checkFinal.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, checkFinal);
checkFinal.pendingDungeon.currentStageIndex = 3;
const finalChoice = getDungeonCurrentStage(checkFinal.pendingDungeon).choices[1];
checkFinal.traits.nerve = 0.75;
const weaker = evaluateDungeonChoiceOdds(finalChoice, checkFinal, checkFinal.pendingDungeon).successPct;
checkFinal.traits.nerve = 1.25;
const stronger = evaluateDungeonChoiceOdds(finalChoice, checkFinal, checkFinal.pendingDungeon).successPct;
assert(stronger > weaker + 5, 'finale responds to Nerve instead of sticking to the global floor');
const previousFloor = DUNGEON_BALANCE.checkFloor;
try {
  DUNGEON_BALANCE.checkFloor = 0.5;
  assert.equal(evaluateDungeonChoiceOdds(finalChoice, checkFinal, checkFinal.pendingDungeon).successPct, stronger, 'changing ordinary dungeon floor cannot silently retune Ensemble finale');
} finally { DUNGEON_BALANCE.checkFloor = previousFloor; }

const carrier = apex('wing', 'gear');
carrier.flags = []; carrier.inventory = [];
const emptyMastery = getDungeonMastery(def, carrier);
for (const type of ['consumable', 'special']) {
  carrier.inventory = [{ id: type, type }];
  assert.deepEqual(getDungeonMastery(def, carrier), emptyMastery, `${type} is not combat equipment`);
}
for (const type of ['weapon', 'armor']) {
  carrier.inventory = [{ id: type, type }];
  assert(getDungeonMastery(def, carrier).checkBonus > emptyMastery.checkBonus);
}
assert.equal(localizeEnsembleName('Nhịp còn sót lại', 'en'), 'The Remaining Beat');
assert.equal(localizeEnsembleName('Bản tổng phổ viết dở', 'en'), 'The Unfinished Score');
assert.equal(localizeEnsembleName('A player-named E.G.O', 'en'), 'A player-named E.G.O');
assert(!buildLifeSummaryAndLegacy(marked).lifeStoryParagraphsEn.join(' ').includes('Bản tổng phổ viết dở'));
assert(!heir.pendingBirthLogs.some((log) => log.en?.includes('Bản tổng phổ viết dở')));

console.log('Ensemble: four routes, invitation cadence, mandatory finale, retreat, victory, fatal failure and Distortion passed.');
