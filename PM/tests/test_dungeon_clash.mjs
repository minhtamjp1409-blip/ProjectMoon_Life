// Clash (dungeonClash.js): in a named fight a heavy or quick blow can be met die against die, with one
// stake from the player's life to raise their die. Calling it spends no turn; the odds shown are exact.
import assert from 'node:assert/strict';
import { createNewCharacter } from '../src/engine/gameEngine.js';
import { createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice, evaluateDungeonChoiceOdds, isDungeonChoiceAvailable } from '../src/engine/dungeonEngine.js';
import { CLASH_PROFILES, CLASH_BALANCE, clashOdds, enemyDie, playerDie } from '../src/engine/dungeonClash.js';
import { GAUNTLETS } from '../src/data/dungeonGauntlets.js';

function fighter(seed, extra = {}) {
  const c = createNewCharacter({ seed, startAge: 30, sparePerinatal: true });
  c.scars = [];
  c.stats = { health: 95, sanity: 55, wealth: 40, rep: 40, network: 40 };
  Object.assign(c, { job: 'Fixer', fixerGrade: 6, alive: true, ...extra });
  c.flags = c.flags.filter((f) => f !== 'Distorted');
  c.npcs = {};
  return c;
}
const stageOf = (c) => getDungeonCurrentStage(c.pendingDungeon);
const idxOf = (c, pred) => stageOf(c).choices.findIndex(pred);
// Put the run on its last floor (the boss), on a turn whose intent is of the given kind
function atBoss(c, id, kinds = ['heavy']) {
  const s = c.pendingDungeon;
  const g = GAUNTLETS[id];
  const k = s.combat.plan.length - 1;
  const boss = g.floors.at(-1).enemies[0];
  Object.assign(s.combat, { floor: k, turn: 0, enemy: boss, guard: boss.guard, guardMax: boss.guard, phase: 1, offset: 0, clashes: 0, stakeUsed: false, clashOpen: false });
  while (!kinds.includes(g.intents[boss.intents[s.combat.turn % boss.intents.length]].kind)) s.combat.turn += 1;
  return c;
}
const seq = (...xs) => { let i = 0; return () => xs[Math.min(i++, xs.length - 1)]; };

// 1. Every gauntlet has a profile, and every twist has a line of its own
for (const id of Object.keys(GAUNTLETS)) assert.ok(CLASH_PROFILES[id], `${id} has a clash profile`);

// 2. An ordinary floor offers no clash; a boss's heavy blow does
let c = fighter('clash-offer');
c.pendingDungeon = createDungeonSession('dungeon_warp_train', c);
assert.equal(idxOf(c, (x) => x.combatAction === 'clash'), -1, 'the first, unnamed fight has no clash');
atBoss(c, 'dungeon_warp_train');
const open = idxOf(c, (x) => x.combatAction === 'clash');
assert.ok(open >= 0, 'a boss heavy blow can be clashed');
assert.ok(evaluateDungeonChoiceOdds(stageOf(c).choices[open], c, c.pendingDungeon).clashDie, 'the player die is shown before choosing');

// 3. Calling the clash spends no turn and lists the stakes; stepping back returns to the same intent
const turn0 = c.pendingDungeon.combat.turn;
const hp0 = c.stats.health;
c = resolveDungeonChoice(c, open, () => 0.5).char;
assert.equal(c.pendingDungeon.combat.turn, turn0, 'no turn spent on calling a clash');
assert.equal(c.stats.health, hp0, 'no damage from calling a clash');
assert.ok(stageOf(c).isClash, 'the stake step is shown');
assert.deepEqual(stageOf(c).choices.map((x) => x.stakeId || x.combatAction), ['none', 'ahn', 'clashBack'], 'no scar or companion: only Ahn can be staked');
c = resolveDungeonChoice(c, idxOf(c, (x) => x.combatAction === 'clashBack'), () => 0.5).char;
assert.equal(c.pendingDungeon.combat.turn, turn0, 'stepping back spends no turn');
assert.ok(!stageOf(c).isClash && idxOf(c, (x) => x.combatAction === 'guard') >= 0, 'back to the ordinary answers');

// 4. The odds shown are exact and sum to one
const odds = clashOdds([1, 6], [1, 6]);
assert.ok(Math.abs(odds.reduce((a, b) => a + b, 0) - 1) < 1e-9);
assert.equal(Math.round(odds[0] * 1000), 417, 'two six-sided dice: 15 wins in 36');

// 5. A won clash: no damage, two notches of guard, and the enemy loses its next move
c = resolveDungeonChoice(c, idxOf(c, (x) => x.combatAction === 'clash'), () => 0.5).char;
const guard0 = c.pendingDungeon.combat.guard;
let r = resolveDungeonChoice(c, idxOf(c, (x) => x.stakeId === 'none'), seq(0.99, 0));
c = r.char;
assert.equal(c.pendingDungeon.lastStageResult.clash.outcome, 'win');
assert.equal(c.stats.health, hp0, 'a won clash takes nothing');
assert.equal(c.pendingDungeon.combat.guard, guard0 - CLASH_BALANCE.winBreaks, 'a won clash breaks two notches');
assert.equal(c.pendingDungeon.combat.turn, turn0 + 2, 'the enemy loses its next move');
assert.equal(c.pendingDungeon.combat.clashes, 1);

// 6. A lost clash with a scar staked: Sanity paid, and the blow lands harder than a guard would let it
const guardHit = (seed) => {
  let g = fighter(seed);
  g.pendingDungeon = createDungeonSession('dungeon_warp_train', g);
  atBoss(g, 'dungeon_warp_train');
  const before = g.stats.health;
  g = resolveDungeonChoice(g, idxOf(g, (x) => x.combatAction === 'guard'), () => 0.5).char;
  return before - g.stats.health;
};
let s = fighter('clash-scar', { scars: ['Vết chém trên vai'] });
s.pendingDungeon = createDungeonSession('dungeon_warp_train', s);
atBoss(s, 'dungeon_warp_train');
s = resolveDungeonChoice(s, idxOf(s, (x) => x.combatAction === 'clash'), () => 0.5).char;
const scarIdx = idxOf(s, (x) => x.stakeId === 'scar');
assert.ok(scarIdx >= 0, 'a scar can be staked');
const sp0 = s.stats.sanity;
const hpS = s.stats.health;
s = resolveDungeonChoice(s, scarIdx, seq(0, 0.99)).char;
assert.equal(s.pendingDungeon.lastStageResult.clash.outcome, 'lose');
assert.ok(sp0 - s.stats.sanity >= CLASH_BALANCE.scarSanity, 'the scar costs Sanity');
assert.ok(hpS - s.stats.health > guardHit('clash-guard'), 'a lost clash hurts more than guarding');
// One stake per fight
atBoss(s, 'dungeon_warp_train', ['heavy', 'quick']);
s.pendingDungeon.combat.stakeUsed = true;
s = resolveDungeonChoice(s, idxOf(s, (x) => x.combatAction === 'clash'), () => 0.5).char;
assert.deepEqual(stageOf(s).choices.map((x) => x.stakeId || x.combatAction), ['none', 'clashBack'], 'no second stake in the same fight');

// 7. Staking a companion and losing: they are hurt and leave the run
let n = fighter('clash-npc');
n.npcs = { partner: { name: 'Yan', nameVi: 'Yan', nameEn: 'Yan', bond: 60, status: 'alive' } };
n.pendingDungeon = createDungeonSession('dungeon_warp_train', n);
n.pendingDungeon.companion = { role: 'partner', nameVi: 'Yan', nameEn: 'Yan' };
atBoss(n, 'dungeon_warp_train');
n = resolveDungeonChoice(n, idxOf(n, (x) => x.combatAction === 'clash'), () => 0.5).char;
const npcIdx = idxOf(n, (x) => x.stakeId === 'npc');
assert.ok(npcIdx >= 0, 'a companion in the run can be staked');
n = resolveDungeonChoice(n, npcIdx, seq(0, 0.99)).char;
assert.equal(n.npcs.partner.status, 'wounded', 'the companion is wounded');
assert.ok(n.npcs.partner.bond < 60, 'and trusts you a little less');
assert.equal(n.pendingDungeon.companion, null, 'and leaves the run');

// 8. The Head takes no money; a boss allows three clashes and no more
let j = fighter('clash-claw', { stats: { health: 95, sanity: 55, wealth: 90, rep: 40, network: 40 } });
j.pendingDungeon = createDungeonSession('dungeon_claw_judgment', j);
atBoss(j, 'dungeon_claw_judgment', ['heavy', 'quick']);
j = resolveDungeonChoice(j, idxOf(j, (x) => x.combatAction === 'clash'), () => 0.5).char;
assert.equal(idxOf(j, (x) => x.stakeId === 'ahn'), -1, 'no Ahn stake before the Head');
j.pendingDungeon.combat.clashOpen = false;
j.pendingDungeon.combat.clashes = CLASH_BALANCE.perFight.boss;
assert.equal(idxOf(j, (x) => x.combatAction === 'clash'), -1, 'the clash budget of a fight runs out');
assert.ok(stageOf(j).choices.every((x) => isDungeonChoiceAvailable(x, j)), 'the ordinary answers stay available');

// 9. Balance bands, per dungeon (see the Đợt 125 table in PROGRESS_LOG)
const ctx = { mastery: () => ({ checkBonus: 0.1 }) };
const geared = { stats: { sanity: 55 } };
for (const id of Object.keys(CLASH_PROFILES)) {
  const boss = { id, stance: 'balanced', combat: { floor: 0, phase: 1, plan: [{ kind: 'boss', tier: GAUNTLETS[id].floors.at(-1).tier }] } };
  const bare = clashOdds(playerDie(ctx, geared, boss), enemyDie(boss))[0];
  const staked = clashOdds(playerDie(ctx, geared, boss, { id: 'scar', lo: 1, hi: 3 }), enemyDie(boss))[0];
  if (id === 'dungeon_claw_judgment') {
    assert.ok(bare >= 0.2 && bare < 0.4, `${id}: the Arbiter is the hardest clash (${bare.toFixed(2)})`);
    assert.ok(staked >= 0.4 && staked <= 0.6, `${id}: a stake makes it a real gamble (${staked.toFixed(2)})`);
  } else {
    assert.ok(bare >= 0.4 && bare <= 0.55, `${id}: an unstaked boss clash is close to a coin flip (${bare.toFixed(2)})`);
    assert.ok(staked >= 0.6 && staked <= 0.8, `${id}: a stake makes it about seven in ten (${staked.toFixed(2)})`);
  }
}

console.log('Dungeon clash: named fights only, free to call, exact odds, one stake per fight, per-dungeon bands hold');
