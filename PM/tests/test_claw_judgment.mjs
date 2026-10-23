import assert from 'node:assert/strict';
import { createNewCharacter, buildLifeSummaryAndLegacy, cloneChar } from '../src/engine/gameEngine.js';
import { DUNGEON_DEFINITIONS, createDungeonSession, evaluateDungeonChoiceOdds, fleeDungeon, getDungeonCurrentStage, resolveDungeonChoice } from '../src/engine/dungeonEngine.js';
import { CLAW_DUNGEON_ID } from '../src/data/dungeonClaw.js';

globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
const { useGameStore } = await import('../src/store/gameStore.js');

function accused(seed = 'claw-judgment') {
  const char = createNewCharacter({ seed, startAge: 30 });
  char.age = 30;
  char.taboo = 3;
  char.stats = { ...char.stats, health: 100, sanity: 100, wealth: 50 };
  char.pendingEvent = null;
  char.pendingMinor = null;
  char.pendingContract = null;
  char.pendingDungeon = createDungeonSession(CLAW_DUNGEON_ID, char);
  return char;
}

const def = DUNGEON_DEFINITIONS[CLAW_DUNGEON_ID];
assert.equal(def.stages.length, 4);
assert(def.noRetreat && def.fatalOnBreak && def.fatalOnFinalFailure);
assert(def.stages.every((stage) => stage.choices.every((choice) => choice.checkTrait)));

const below = accused('claw-trigger');
below.taboo = 2;
below.pendingDungeon = null;
const crossed = cloneChar(below);
crossed.taboo = 3;
useGameStore.setState({ char: below, inRun: true, speed: 0, activeResolution: null });
useGameStore.getState().commit(below, crossed, { postChoicePauseMs: 3000 });
assert.equal(useGameStore.getState().char.pendingDungeon?.id, CLAW_DUNGEON_ID, '3/3 starts the Claw immediately');
assert.equal(useGameStore.getState().postChoicePauseMs, 0, 'the judgment interrupts the ordinary reading pause');
assert.equal(fleeDungeon(useGameStore.getState().char).isFinished, false, 'F/Escape cannot bypass the judgment');

const savedAccused = accused('claw-old-save');
savedAccused.pendingDungeon = null;
savedAccused.pendingEvent = { id: 'csq_claw_taboo_visitation' };
useGameStore.setState({ savedRun: { char: savedAccused, yearProgress: 30 }, char: below });
useGameStore.getState().resumeRun();
assert.equal(useGameStore.getState().char.pendingDungeon?.id, CLAW_DUNGEON_ID, 'old saves with 3/3 migrate into the new dungeon');
assert.equal(useGameStore.getState().char.pendingEvent, null);

const waiverBuyer = accused('claw-waiver');
waiverBuyer.taboo = 2;
waiverBuyer.heat = 40;
waiverBuyer.pendingDungeon = null;
waiverBuyer.stats.wealth = 100;
useGameStore.setState({ char: waiverBuyer });
useGameStore.getState().buyItem('spc_hana_audit_waiver');
assert.equal(useGameStore.getState().char.taboo, 0, 'the costly waiver actually removes two Taboo before the threshold');
assert.equal(useGameStore.getState().char.heat, 15);

const first = def.stages[0].choices[0];
const last = def.stages.at(-1).choices[0];
const base = accused('claw-odds');
const openingOdds = evaluateDungeonChoiceOdds(first, base, base.pendingDungeon).successPct;
const finalOdds = evaluateDungeonChoiceOdds(last, base, { ...base.pendingDungeon, currentStageIndex: 3, sanityStrain: 60 }).successPct;
assert(finalOdds < openingOdds, 'the final check must be harder as the fight wears on');
assert(finalOdds < 70, 'an unprepared final check must remain dangerous');

let survivor = accused('claw-winner');
for (let stage = 0; stage < 4; stage++) {
  assert.equal(getDungeonCurrentStage(survivor.pendingDungeon).stageIndex, stage);
  const result = resolveDungeonChoice(survivor, 0, () => 0);
  survivor = result.char;
  if (stage < 3) assert.equal(result.isFinished, false);
  else {
    assert.equal(result.resolution.outcome, 'library');
    assert.equal(result.resolution.isDead, false);
    assert.equal(result.resolution.isEnding, true);
  }
}
assert.equal(survivor.endingId, 'library_threshold');
assert.equal(survivor.regionId, 'OUTSKIRTS');
assert(survivor.stats.health > 0, 'the protagonist lives in the Library ending');
assert(survivor.unlockedRecords.includes('defied_the_claw'));
assert(survivor.unlockedRecords.includes('library_threshold'));
const summary = buildLifeSummaryAndLegacy(survivor);
assert.equal(summary.endingId, 'library_threshold');
assert.match(summary.lifeStoryParagraphsEn.at(-1), /pushed the door open/);
assert(!summary.lifeStoryParagraphsEn.at(-1).includes('When the curtain fell'));

const finalFailure = accused('claw-final-fail');
finalFailure.pendingDungeon.currentStageIndex = 3;
const killed = resolveDungeonChoice(finalFailure, 0, () => 0.999);
assert.equal(killed.resolution.outcome, 'dead');
assert.equal(killed.char.alive, false);
assert.equal(killed.char.stats.health, 0);

const exhausted = accused('claw-break');
exhausted.pendingDungeon.sanityStrain = 99;
const broken = resolveDungeonChoice(exhausted, 0, () => 0);
assert.equal(broken.resolution.outcome, 'dead', 'mental collapse cannot grant an escape');

const wounded = accused('claw-wounded');
wounded.stats.health = 1;
const fell = resolveDungeonChoice(wounded, 0, () => 0);
assert.equal(fell.resolution.outcome, 'dead', 'HP reaching zero ends the run');

console.log('Claw judgment: immediate trigger, no retreat, visible odds, fatal failures, living Library ending and archive passed.');
