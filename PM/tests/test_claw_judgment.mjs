import assert from 'node:assert/strict';
import { createNewCharacter, buildLifeSummaryAndLegacy, cloneChar } from '../src/engine/gameEngine.js';
import { DUNGEON_DEFINITIONS, createDungeonSession, fleeDungeon, getDungeonCurrentStage, isDungeonChoiceAvailable, resolveDungeonChoice } from '../src/engine/dungeonEngine.js';
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

// The judgment is a chain of three: a Beholder of the Eye, an Executioner of the Claw, an Arbiter
const plan = accused('claw-plan').pendingDungeon;
assert.equal(plan.mode, 'gauntlet');
assert.deepEqual(plan.combat.plan.map((f) => f.kind), ['fight', 'rest', 'fight', 'rest', 'boss']);
assert.equal(getDungeonCurrentStage(plan).nameEn, 'Beholder of the Eye');
const breath = { ...plan, combat: { ...plan.combat, floor: 1, enemy: null } };
const breathStage = getDungeonCurrentStage(breath);
assert(breathStage.isRest && breathStage.choices.every((c) => !c.isFlee && !['side', 'shortcut'].includes(c.restAction)), 'a breath, never a way out');

const best = { heavy: 'guard', quick: 'strike', sweep: 'evade', mind: 'guard', grab: 'evade', heal: 'strike' };
function play(char, rng, until = () => false) {
  for (let i = 0; i < 80 && char.pendingDungeon; i++) {
    if (until(char)) return { char, resolution: null };
    const stage = getDungeonCurrentStage(char.pendingDungeon);
    let idx = 0;
    if (stage.isCombat) {
      const want = best[stage.combat.intent.kind];
      idx = stage.choices.findIndex((c) => c.combatAction === want && !c.sealed);
      if (idx < 0) idx = stage.choices.findIndex((c) => c.combatAction === 'guard');
    }
    const r = resolveDungeonChoice(char, idx, rng);
    char = r.char;
    if (r.resolution) return r;
  }
  return { char, resolution: null };
}

// Read every blow right and land every dodge: the Arbiter falls and the Library ending follows
let survivor = accused('claw-winner');
const won = play(survivor, () => 0);
survivor = won.char;
assert.equal(won.resolution.outcome, 'library');
assert.equal(won.resolution.isDead, false);
assert.equal(won.resolution.isEnding, true);
assert.equal(survivor.endingId, 'library_threshold');
assert.equal(survivor.regionId, 'OUTSKIRTS');
assert(survivor.stats.health > 0, 'the protagonist lives in the Library ending');
assert(survivor.unlockedRecords.includes('defied_the_claw'));
assert(survivor.unlockedRecords.includes('library_threshold'));
const summary = buildLifeSummaryAndLegacy(survivor);
assert.equal(summary.endingId, 'library_threshold');
assert.match(summary.lifeStoryParagraphsEn.at(-1), /pushed the door open/);
assert(!summary.lifeStoryParagraphsEn.at(-1).includes('When the curtain fell'));

// Serum K closes the Claw's wounds unless a strike cuts it short
const atClaw = (seed) => {
  const c = accused(seed);
  const s = c.pendingDungeon;
  c.pendingDungeon = { ...s, combat: { ...s.combat, plan: s.combat.plan.map((f) => ({ ...f })) } };
  let r = { char: c };
  r = play(c, () => 0, (ch) => ch.pendingDungeon?.combat?.floor === 2);
  return r.char;
};
const toK = (char) => {
  for (let i = 0; i < 10; i++) {
    const stage = getDungeonCurrentStage(char.pendingDungeon);
    if (stage.combat.intent.kind === 'heal') return char;
    const want = best[stage.combat.intent.kind];
    char = resolveDungeonChoice(char, stage.choices.findIndex((c) => c.combatAction === want), () => 0).char;
  }
  return char;
};
const healer = toK(atClaw('claw-serum-k'));
const kStage = getDungeonCurrentStage(healer.pendingDungeon);
assert.equal(kStage.combat.intent.kind, 'heal');
const before = healer.pendingDungeon.combat.guard;
const ignored = resolveDungeonChoice(healer, kStage.choices.findIndex((c) => c.combatAction === 'guard'), () => 0);
assert(ignored.char.pendingDungeon.combat.guard > before || before === healer.pendingDungeon.combat.guardMax, 'left alone, Serum K restores guard');
const cut = resolveDungeonChoice(healer, kStage.choices.findIndex((c) => c.combatAction === 'strike'), () => 0);
assert.equal(cut.char.pendingDungeon.combat.guard, before - 1, 'a strike cuts the recovery short');

// The Arbiter's Birdcage locks the strike for a turn when it lands
const caged = accused('claw-cage');
const cs = caged.pendingDungeon;
caged.pendingDungeon = { ...cs, combat: { ...cs.combat, plan: cs.combat.plan.map((f) => ({ ...f })), floor: 4, guard: 8, guardMax: 8, phase: 1, turn: 0, offset: 0, enemy: null } };
// enter the Arbiter floor through the engine's own route: finish the rest before it
caged.pendingDungeon.combat.floor = 3;
let cageRun = resolveDungeonChoice(caged, 0, () => 0).char;
let cageStage = getDungeonCurrentStage(cageRun.pendingDungeon);
for (let i = 0; i < 6 && cageStage.combat.intent.nameEn !== 'Birdcage'; i++) {
  const want = best[cageStage.combat.intent.kind];
  cageRun = resolveDungeonChoice(cageRun, cageStage.choices.findIndex((c) => c.combatAction === want), () => 0).char;
  cageStage = getDungeonCurrentStage(cageRun.pendingDungeon);
}
assert.equal(cageStage.combat.intent.nameEn, 'Birdcage');
const hitByCage = resolveDungeonChoice(cageRun, cageStage.choices.findIndex((c) => c.combatAction === 'guard'), () => 0).char;
const lockedStage = getDungeonCurrentStage(hitByCage.pendingDungeon);
const strike = lockedStage.choices.find((c) => c.combatAction === 'strike');
assert.equal(strike.sealed, true, 'the cage locks the strike next turn');
assert.equal(isDungeonChoiceAvailable(strike, hitByCage), false);

// Any death on the way is the sentence carried out
const exhausted = accused('claw-break');
exhausted.pendingDungeon.sanityStrain = 99;
const broken = resolveDungeonChoice(exhausted, 1, () => 0.99);
assert.equal(broken.resolution.outcome, 'dead', 'mental collapse cannot grant an escape');

const wounded = accused('claw-wounded');
wounded.stats.health = 1;
const fell = resolveDungeonChoice(wounded, 1, () => 0.99);
assert.equal(fell.resolution.outcome, 'dead', 'HP reaching zero ends the run');
assert.equal(fell.char.alive, false);

// Played carelessly, almost no one walks out
let escaped = 0;
for (let i = 0; i < 60; i++) {
  let c = accused(`claw-careless-${i}`);
  let seed = i * 7 + 1;
  const rng = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let k = 0; k < 80 && c.pendingDungeon; k++) {
    const stage = getDungeonCurrentStage(c.pendingDungeon);
    const open = stage.choices.map((ch, idx) => [ch, idx]).filter(([ch]) => isDungeonChoiceAvailable(ch, c));
    const r = resolveDungeonChoice(c, open[Math.floor(rng() * open.length)][1], rng);
    c = r.char;
    if (r.resolution) { if (r.resolution.outcome === 'library') escaped++; break; }
  }
}
assert(escaped <= 6, `random play should almost never survive the Head, got ${escaped}/60`);

console.log('Head’s judgment: immediate trigger, no retreat, Eye then Claw then Arbiter, Serum K and Birdcage, fatal failures, living Library ending and archive passed.');
