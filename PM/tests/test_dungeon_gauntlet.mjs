import assert from 'node:assert/strict';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import {
  DUNGEON_DEFINITIONS, createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice,
  isDungeonChoiceAvailable, evaluateDungeonChoiceOdds, fleeDungeon, useDungeonEgo
} from '../src/engine/dungeonEngine.js';
import { ANSWERS, gauntletRoute } from '../src/engine/dungeonCombat.js';
import { GAUNTLETS, INTENT_KINDS } from '../src/data/dungeonGauntlets.js';

const best = { heavy: 'guard', quick: 'strike', sweep: 'evade', mind: 'guard', grab: 'evade', heal: 'strike' };
function fighter(seed, extra = {}) {
  const c = createNewCharacter({ seed, startAge: 30 });
  Object.assign(c, { job: 'Fixer', fixerGrade: 6, alive: true, ...extra });
  c.flags = c.flags.filter((f) => f !== 'Distorted');
  c.stats = { health: 95, sanity: 90, wealth: 40, rep: 40, network: 40 };
  c.npcs = {};
  return c;
}
const enter = (c, id) => { c.pendingDungeon = createDungeonSession(id, c); return c; };
const stageOf = (c) => getDungeonCurrentStage(c.pendingDungeon);
const idxOf = (c, pred) => stageOf(c).choices.findIndex(pred);
const answer = (c, rng = () => 0) => {
  const st = stageOf(c);
  const want = best[st.combat.intent.kind];
  return resolveDungeonChoice(c, st.choices.findIndex((x) => x.combatAction === want && !x.sealed), rng);
};

// Five dungeons fight floor by floor; the Outskirts keep exploration stages
const fighting = ['dungeon_warp_train', 'dungeon_lobotomy_ruin', 'dungeon_bloodfiend_carnival', 'dungeon_great_lake', 'dungeon_backstreets_night'];
for (const id of fighting) {
  const g = GAUNTLETS[id];
  assert.ok(g, id);
  assert.deepEqual(g.floors.map((f) => f.kind), ['fight', 'fight', 'rest', 'fight', 'fight', 'rest', 'boss'], `${id} floor plan`);
  assert.ok(g.elite, `${id} has an elite behind the side door`);
  for (const floor of g.floors.filter((f) => f.enemies)) {
    for (const e of floor.enemies) {
      assert.ok(e.intents.every((i) => g.intents[i]), `${id}: ${e.nameEn} uses known intents`);
      const kinds = new Set(e.intents.map((i) => g.intents[i].kind));
      assert.ok(kinds.size >= 2, `${id}: ${e.nameEn} has at least two kinds of attack`);
    }
  }
  const boss = g.floors.at(-1).enemies[0];
  assert.ok(boss.phase2?.length && boss.phaseVi && boss.phaseEn, `${id} boss has a second phase`);
  for (const intent of Object.values(g.intents)) assert.ok(INTENT_KINDS[intent.kind], `${id}: kind ${intent.kind}`);
  const s = createDungeonSession(id, fighter(`g-${id}`));
  assert.equal(s.mode, 'gauntlet');
  assert.equal(gauntletRoute(s)[0].state, 'now');
}
assert.equal(createDungeonSession('dungeon_outskirts_ruins', fighter('g-out')).mode, undefined);

// The answer table: every kind has a best answer that takes little and breaks the guard
for (const kind of ['heavy', 'quick', 'sweep', 'mind', 'grab']) {
  const [taken, breaks] = ANSWERS[best[kind]][kind];
  assert.ok(taken <= 0.35 && breaks >= 1, `${kind}: the right answer is cheap and works`);
}
assert.ok(ANSWERS.strike.heavy[0] > 1, 'striking into a heavy blow costs more than the blow');
assert.ok(ANSWERS.guard.grab[0] > 1, 'guarding a grab does not help');

// A turn shows what is coming and the odds of each answer
const c0 = enter(fighter('g-turn'), 'dungeon_warp_train');
const st0 = stageOf(c0);
assert.ok(st0.isCombat && st0.combat.intent.kindVi && st0.combat.guard === st0.combat.guardMax);
assert.ok(st0.choices.length >= 3 && st0.choices.every((ch) => ch.combatAction));
for (const ch of st0.choices) {
  const odds = evaluateDungeonChoiceOdds(ch, c0, c0.pendingDungeon);
  assert.ok(odds && Number.isFinite(odds.successPct) && odds.estHp <= 0);
}
assert.equal(st0.canFlee, false);
assert.equal(fleeDungeon(c0).isFinished, false, 'no leaving in the middle of a fight');

// The right answer breaks the guard; the wrong one costs more health
const right = answer(enter(fighter('g-right'), 'dungeon_lobotomy_ruin'));
assert.ok(right.char.pendingDungeon.combat.guard < st0.combat.guardMax || right.char.pendingDungeon.combat.floor === 1);
const wrongChar = enter(fighter('g-right'), 'dungeon_lobotomy_ruin');
const wrongKind = stageOf(wrongChar).combat.intent.kind;
const worst = { heavy: 'strike', quick: 'evade', sweep: 'strike', mind: 'evade', grab: 'guard' }[wrongKind];
const wrong = resolveDungeonChoice(wrongChar, idxOf(wrongChar, (x) => x.combatAction === worst), () => 0.999);
assert.ok(wrong.char.stats.health < right.char.stats.health, 'the wrong answer hurts more');
assert.ok(wrong.char.pendingDungeon.lastStageResult.fx, 'every turn leaves an effect for the screen');
assert.ok(wrong.char.pendingDungeon.lastStageResult.nonce > 0);

// Clear two floors, reach a rest; the rest heals, pushes, opens the side door, or lets you leave
let run = enter(fighter('g-run'), 'dungeon_backstreets_night');
for (let i = 0; i < 20 && !stageOf(run).isRest; i++) run = answer(run).char;
assert.ok(stageOf(run).isRest, 'two fights, then a rest');
assert.ok(run.merit > 0 && run.pendingDungeon.accumulatedLootAhn > 0, 'cleared floors pay');
const restStage = stageOf(run);
assert.ok(restStage.canFlee);
for (const action of ['rest', 'push', 'side', 'shortcut', 'leave']) assert.ok(restStage.choices.some((ch) => ch.restAction === action), `first rest offers ${action}`);
const hurtRun = { ...run, stats: { ...run.stats, health: 40 } };
const rested = resolveDungeonChoice(hurtRun, idxOf(hurtRun, (x) => x.restAction === 'rest'), () => 0);
assert.ok(rested.char.stats.health > 40);
assert.equal(rested.char.pendingDungeon.combat.floor, 3);
const opened = resolveDungeonChoice(run, idxOf(run, (x) => x.restAction === 'side'), () => 0);
assert.equal(opened.char.pendingDungeon.combat.plan.length, 8, 'the side door adds an elite floor');
assert.equal(stageOf(opened.char).nameEn, GAUNTLETS.dungeon_backstreets_night.elite.nameEn);
const skipped = resolveDungeonChoice(run, idxOf(run, (x) => x.restAction === 'shortcut'), () => 0);
assert.equal(skipped.char.pendingDungeon.combat.floor, 4, 'a good shortcut skips a floor');
const left = fleeDungeon(run);
assert.equal(left.isFinished, true, 'a rest is where you can leave');
assert.equal(left.resolution.outcome, 'fled');

// The boss turns at half its guard, and when it falls the old last stage is the ending
let boss = enter(fighter('g-boss'), 'dungeon_great_lake');
for (let i = 0; i < 40 && stageOf(boss).combat?.isBoss !== true; i++) {
  const st = stageOf(boss);
  boss = st.isRest ? resolveDungeonChoice(boss, idxOf(boss, (x) => x.restAction === 'rest'), () => 0).char : answer(boss).char;
  boss.stats.health = 95; boss.stats.sanity = 90; boss.pendingDungeon = { ...boss.pendingDungeon, sanityStrain: 0 };
}
assert.ok(stageOf(boss).combat.isBoss);
let sawPhase = false;
for (let i = 0; i < 20 && boss.pendingDungeon?.combat && !boss.pendingDungeon.combat.done; i++) {
  boss = answer(boss).char;
  boss.stats.health = 95; boss.stats.sanity = 90;
  if (boss.pendingDungeon?.combat?.phase === 2) sawPhase = true;
}
assert.ok(sawPhase, 'the boss reaches its second phase');
assert.ok(boss.pendingDungeon.combat.done);
const ending = stageOf(boss);
assert.equal(ending.isCombat, undefined);
assert.ok(ending.choices.some((ch) => ch.reportAff), 'the old last stage, with its report choice, is the ending');
const done = resolveDungeonChoice(boss, 0, () => 0);
assert.equal(done.resolution.outcome, 'conquered');

// A companion can take a blow, at most twice
const withAlly = fighter('g-ally');
withAlly.npcs.partner = { role: 'partner', nameVi: 'Hạ', nameEn: 'Ha', bond: 80, status: 'alive', metAge: 20, lastSeen: 30 };
let ally = enter(withAlly, 'dungeon_bloodfiend_carnival');
const hp0 = ally.stats.health;
const allyIdx = idxOf(ally, (x) => x.combatAction === 'ally');
assert.ok(allyIdx >= 0);
ally = resolveDungeonChoice(ally, allyIdx, () => 0).char;
assert.equal(ally.stats.health, hp0, 'a companion who comes through spares you the blow');
assert.equal(ally.npcs.partner.bond, 82);
ally = resolveDungeonChoice(ally, idxOf(ally, (x) => x.combatAction === 'ally'), () => 0).char;
assert.equal(idxOf(ally, (x) => x.combatAction === 'ally'), -1, 'two calls a run');

// E.G.O makes a strike break more
const wielder = fighter('g-ego', { flags: ['EGOAwakened'] });
let ego = enter(wielder, 'dungeon_warp_train');
ego = useDungeonEgo(ego);
assert.equal(ego.pendingDungeon.egoActive, true);
const before = ego.pendingDungeon.combat.guard;
const egoHit = resolveDungeonChoice(ego, idxOf(ego, (x) => x.combatAction === 'strike'), () => 0.99).char;
assert.ok(before - (egoHit.pendingDungeon.combat.guard ?? before) >= 2 || egoHit.pendingDungeon.combat.floor > 0);

// Difficulty: a careful player usually wins, a careless one usually dies
const tally = { careful: { won: 0, dead: 0 }, careless: { won: 0, dead: 0 } };
for (const id of fighting) {
  for (let n = 0; n < 40; n++) {
    for (const style of ['careful', 'careless']) {
      let c = enter(fighter(`g-mc-${id}-${n}`), id);
      const rng = createRNG(`g-mc-${id}-${n}-${style}`);
      for (let i = 0; i < 70 && c.pendingDungeon; i++) {
        const st = stageOf(c);
        const open = st.choices.map((x, k) => [x, k]).filter(([x]) => isDungeonChoiceAvailable(x, c));
        let k = open[Math.floor(rng() * open.length)][1];
        if (style === 'careful') {
          if (st.isRest) k = (open.find(([x]) => x.restAction === (c.stats.health < 32 ? 'leave' : c.stats.health < 70 ? 'rest' : 'push')) || open[0])[1];
          else if (st.isCombat) k = (open.find(([x]) => x.combatAction === best[st.combat.intent.kind]) || open[0])[1];
          else k = open[0][1];
        }
        const r = resolveDungeonChoice(c, k, rng);
        c = r.char;
        if (r.resolution) { if (r.resolution.outcome === 'conquered') tally[style].won++; if (r.resolution.isDead) tally[style].dead++; break; }
      }
    }
  }
}
const runs = fighting.length * 40;
assert.ok(tally.careful.won / runs >= 0.7, `careful players should usually win, got ${tally.careful.won}/${runs}`);
assert.ok(tally.careful.dead / runs <= 0.12, `careful players should rarely die, got ${tally.careful.dead}/${runs}`);
assert.ok(tally.careless.dead / runs >= 0.5, `careless players should usually die, got ${tally.careless.dead}/${runs}`);
assert.ok(tally.careless.won / runs <= 0.1, `careless play should almost never win, got ${tally.careless.won}/${runs}`);

console.log(`Dungeon gauntlet: 5 fighting dungeons, telegraphed intents, answers, rests, side door, shortcut, boss phases, companions, E.G.O; careful ${tally.careful.won}/${runs} won ${tally.careful.dead} died, careless ${tally.careless.won} won ${tally.careless.dead} died.`);
