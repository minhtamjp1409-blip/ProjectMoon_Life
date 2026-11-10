// The four rungs of dungeon difficulty (src/data/dungeonDifficulty.js), measured with the simulated player who
// takes risks while healthy and steps back when hurt ("measured" in tools/sim/dungeon_sim.mjs). The seeds are
// fixed, so a change to any dungeon's damage, checks or enemies that moves it out of its rung fails here.
import assert from 'node:assert/strict';
import { runDungeonSim } from '../tools/sim/dungeon_sim.mjs';
import { DUNGEON_DIFFICULTY } from '../src/data/dungeonDifficulty.js';

const RUNS = 300;
const pct = (s) => Number(String(s).replace('%', ''));
const rows = runDungeonSim(RUNS, { ids: Object.keys(DUNGEON_DIFFICULTY), policies: ['measured'] });
const by = Object.fromEntries(rows.map((r) => [`dungeon_${r.id}`, { dead: pct(r.dead), full: pct(r.full), restored: pct(r.restored) }]));
const ofRung = (n) => Object.entries(DUNGEON_DIFFICULTY).filter(([, d]) => d.rung === n).map(([id]) => id);
const line = Object.entries(by).map(([id, r]) => `${id.replace('dungeon_', '')} ${r.dead}/${r.full}`).join(', ');

// Rung 1, the Head: few walk out, and they must have prepared
const [head] = ofRung(1);
assert.ok(by[head].full >= 5 && by[head].full <= 15, `the Head lets 5 to 15% survive (${line})`);

// Rung 2, the Great Lake
const [lake] = ofRung(2);
assert.ok(by[lake].full >= 18 && by[lake].full <= 30 && by[lake].dead >= 7 && by[lake].dead <= 14, `the Lake: 18 to 30% clear, 7 to 14% die (${line})`);

// Rung 3: level with each other
const middle = ofRung(3);
for (const id of middle) assert.ok(by[id].full >= 35 && by[id].full <= 60 && by[id].dead <= 8, `${id}: 35 to 60% clear, at most 8% die (${line})`);
// WARP has no exit: a run it does not clear is a stopped heart W Corp puts back, which costs more than a retreat
for (const id of middle) assert.ok(by[id].restored <= 50, `${id}: at most 50% of runs end restored by W Corp (${by[id].restored}%)`);
const fulls = middle.map((id) => by[id].full);
assert.ok(Math.max(...fulls) - Math.min(...fulls) <= 15, `the middle rung stays within 15 points of itself (${line})`);

// Rung 4, the Outskirts: the easiest, and still not a walk
const [outskirts] = ofRung(4);
assert.ok(by[outskirts].full >= 60 && by[outskirts].full <= 82 && by[outskirts].dead <= 3, `the Outskirts: 60 to 82% clear, at most 3% die (${line})`);

// The order holds
assert.ok(by[head].full < by[lake].full, 'the Head is harder than the Lake');
assert.ok(by[lake].full < Math.min(...fulls), 'the Lake is harder than every middle dungeon');
assert.ok(Math.max(...fulls) < by[outskirts].full, 'every middle dungeon is harder than the Outskirts');

console.log(`Dungeon difficulty: four rungs hold (${line})`);
