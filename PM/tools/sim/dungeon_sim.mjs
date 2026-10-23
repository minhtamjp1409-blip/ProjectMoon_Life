/**
 * Dungeon balance: sends many characters through each dungeon with a few play styles and reports
 * how often they die, how much they earn, and what it does to the resources the rest of the game balances.
 * Usage: node tools/sim/dungeon_sim.mjs [runs=600]
 */
import { createNewCharacter, createRNG, DUNGEON_DEFINITIONS, createDungeonSession, getDungeonCurrentStage, isDungeonChoiceAvailable, evaluateDungeonChoiceOdds, setDungeonStance, useDungeonSupply, resolveDungeonChoice } from '../../src/engine/gameEngine.js';

const RUNS = Number(process.argv[2] || 600);
const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

function startChar(seed, rng) {
  const c = createNewCharacter({ customName: 'Sim', seed });
  c.age = 22 + Math.floor(rng() * 25);
  c.alive = true;
  c.job = rng() < 0.5 ? 'Fixer' : 'Wing Employee';
  c.stats.health = 40 + Math.floor(rng() * 56);
  c.stats.sanity = 35 + Math.floor(rng() * 56);
  c.stats.wealth = Math.floor(rng() * 12);
  c.stats.rep = 20 + Math.floor(rng() * 50);
  c.merit = Math.floor(rng() * 120);
  c.resonance = Math.floor(rng() * 60);
  c.inventory = rng() < 0.3 ? [{ id: 'con_kcorp_ampoule' }] : [];
  return c;
}

const POLICIES = {
  random: (stage, char, sess, rng) => {
    const ok = stage.choices.map((c, i) => [c, i]).filter(([c]) => isDungeonChoiceAvailable(c, char, sess));
    return ok[Math.floor(rng() * ok.length)][1];
  },
  push: (stage, char, sess) => {
    const ok = stage.choices.map((c, i) => [c, i]).filter(([c]) => isDungeonChoiceAvailable(c, char, sess) && !c.isFlee);
    ok.sort((a, b) => (b[0].lootAhn || 0) + (b[0].fx?.wealth || 0) - (a[0].lootAhn || 0) - (a[0].fx?.wealth || 0));
    return ok[0][1];
  },
  careful: (stage, char, sess) => {
    // Flee when hurt, otherwise take the choice that costs the least health
    const hurt = char.stats.health < 45 || char.stats.sanity < 30;
    const ok = stage.choices.map((c, i) => [c, i]).filter(([c]) => isDungeonChoiceAvailable(c, char, sess));
    if (hurt) { const f = ok.find(([c]) => c.isFlee); if (f) return f[1]; }
    const safe = ok.filter(([c]) => !c.isFlee).sort((a, b) => (b[0].fx?.health || 0) - (a[0].fx?.health || 0));
    return (safe[0] || ok[0])[1];
  }
};

const rows = [];
for (const id of Object.keys(DUNGEON_DEFINITIONS)) {
  for (const [pname, pol] of Object.entries(POLICIES)) {
    const acc = { broken: 0, dead: 0, full: 0, fled: 0, wealth: [], merit: [], res: [], rep: [], hp: [], sp: [], stages: [], capHit: 0, strainMax: [] };
    for (let i = 0; i < RUNS; i++) {
      const seed = `dun_${id}_${pname}_${i}`;
      const rng = createRNG(seed);
      let char = startChar(seed, rng);
      const before = { w: char.stats.wealth, m: char.merit, r: char.resonance, rep: char.stats.rep, hp: char.stats.health, sp: char.stats.sanity };
      char.pendingDungeon = createDungeonSession(id, char, rng);
      let guard = 0, finished = false, resolution = null, maxStrain = 0;
      while (char.pendingDungeon && guard++ < 20) {
        const sess = char.pendingDungeon;
        const stage = getDungeonCurrentStage(sess);
        // light tactical play: guarded when hurt, scan on checks, breather when low
        if (pname !== 'random') {
          if (char.stats.health < 50 && sess.supplyCharges > 0) char = useDungeonSupply(char, 'breather');
          if (char.pendingDungeon.supplyCharges > 0 && stage.choices.some((c) => c.checkTrait) && pname === 'careful') char = useDungeonSupply(char, 'scan');
          if (pname === 'careful' && char.pendingDungeon.stance !== 'guarded') char = setDungeonStance(char, 'guarded');
          if (pname === 'push' && char.pendingDungeon.stance !== 'reckless') char = setDungeonStance(char, 'reckless');
        }
        const idx = pol(stage, char, char.pendingDungeon, rng);
        const r = resolveDungeonChoice(char, idx, rng);
        char = r.char; maxStrain = Math.max(maxStrain, r.session?.sanityStrain ?? 0);
        if (r.isFinished) { finished = true; resolution = r.resolution; break; }
      }
      const stagesDone = (char.logs || []).filter((l) => String(l.id).startsWith(`log_dungeon_${id}`)).length;
      acc.stages.push(stagesDone);
      if (!char.alive) acc.dead++;
      else if (resolution?.outcome === 'conquered') acc.full++;
else if (resolution?.outcome === 'broken') acc.broken++;
      else acc.fled++;
      acc.wealth.push(char.stats.wealth - before.w); acc.merit.push(char.merit - before.m); acc.res.push(char.resonance - before.r);
      acc.rep.push(char.stats.rep - before.rep); acc.hp.push(char.stats.health - before.hp); acc.sp.push(char.stats.sanity - before.sp);
      if (char.stats.wealth >= 100) acc.capHit++;
      acc.strainMax.push(maxStrain);
    }
    rows.push({ id: id.replace('dungeon_', ''), pol: pname, dead: (acc.dead / RUNS * 100).toFixed(1) + '%', full: (acc.full / RUNS * 100).toFixed(1) + '%', broke: (acc.broken / RUNS * 100).toFixed(1) + '%', fled: (acc.fled / RUNS * 100).toFixed(1) + '%', stages: mean(acc.stages).toFixed(1), Ahn: mean(acc.wealth).toFixed(0), merit: mean(acc.merit).toFixed(0), reson: mean(acc.res).toFixed(0), rep: mean(acc.rep).toFixed(0), hp: mean(acc.hp).toFixed(0), sp: mean(acc.sp).toFixed(0), wCap: (acc.capHit / RUNS * 100).toFixed(0) + '%', strain: mean(acc.strainMax).toFixed(0) });
  }
}
console.table(rows);
