import assert from 'node:assert/strict';
import { sceneContextOf, WORLDS } from '../src/engine/sceneContext.js';
import { SCAPES } from '../src/engine/ambienceScapes.js';

const life = (patch = {}) => ({ alive: true, age: 26, job: 'Fixer', flags: [], stats: { health: 80, sanity: 70 }, seasonIdx: 0, ...patch });
const at = (char, path = '/') => sceneContextOf({ inRun: true, path, char });

console.log('1. Every world has a palette and a soundscape...');
for (const [id, w] of Object.entries(WORLDS)) {
  assert.match(w.accent, /^#[0-9a-f]{6}$/i, `${id} accent`);
  assert.ok(w.weather, `${id} weather`);
  assert.ok(SCAPES[id], `${id} has a soundscape`);
}

console.log('2. The route picks the world...');
assert.equal(sceneContextOf({ inRun: false }).world, 'title');
assert.equal(sceneContextOf({ inRun: true, path: '/codex', char: life() }).world, 'library');
assert.equal(at(life()).world, 'fixer');
assert.equal(at(life({ job: 'Wing Employee' })).world, 'wing');
assert.equal(at(life({ job: 'Syndicate', finger: 'Index' })).world, 'finger-index');
assert.equal(at(life({ job: 'Syndicate' })).world, 'syndicate');
assert.equal(at(life({ job: 'Child', flags: ['Nest'] })).world, 'nest');
assert.equal(at(life({ job: 'Child' })).world, 'childhood');
assert.equal(at(life({ job: 'Outcast', regionId: 'OUTSKIRTS' })).world, 'outskirts');
assert.equal(at(life({ flags: ['Distorted'] })).world, 'distortion');
assert.equal(at(life({ alive: false })).world, 'dead');

console.log('3. A dungeon, E.G.O, a Color and danger change the scene...');
const dungeon = at(life({ pendingDungeon: { theme: 'warp', egoActive: true, combat: { floor: 0, plan: [{ kind: 'boss' }], enemy: {} } } }));
assert.equal(dungeon.world, 'dungeon-warp');
assert.equal(dungeon.ego, 'active');
assert.equal(dungeon.intensity, 1);
assert.equal(at(life({ pendingDungeon: { theme: 'nowhere' } })).world, 'dungeon-warp', 'an unknown theme falls back');
assert.equal(at(life({ flags: ['EGOAwakened'] })).ego, 'awakened');
assert.equal(at(life({ customTitle: 'Vermilion Gale', colorData: { color: '#e1341e' } })).color, '#e1341e');
assert.equal(at(life({ heat: 80 })).danger, true);
assert.equal(at(life({ stats: { health: 80, sanity: 10 } })).carmen, true, 'a mind near its edge hears Carmen');

console.log('4. The season sets the weather on the street worlds only...');
assert.deepEqual([0, 1, 2, 3].map((s) => at(life({ seasonIdx: s })).weather), ['drizzle', 'haze', 'rain', 'snow']);
assert.equal(at(life({ job: 'Wing Employee', seasonIdx: 3 })).weather, 'data');
console.log('Scene context: worlds, routes, overlays and weather passed.');

console.log('4b. The District sets the place, three Districts and a major event set the mood...');
assert.equal(at(life({ regionId: 'A' })).place, 'head');
assert.equal(at(life({ regionId: 'D' })).place, 'industrial');
assert.equal(at(life({ regionId: 'S' })).place, 'industrial', 'agriculture reads as industrial');
assert.equal(at(life({ regionId: 'J' })).place, 'commercial');
assert.equal(at(life({ regionId: 'K' })).place, 'medical');
assert.equal(at(life({ regionId: 'L' })).place, 'fallen');
assert.equal(at(life({ regionId: 'U' })).place, 'lake');
assert.equal(at(life({ regionId: 'OUTSKIRTS' })).place, 'outskirts');
assert.equal(at(life({ regionId: 'nowhere' })).place, 'city', 'an unknown District falls back');
assert.equal(sceneContextOf({ inRun: false }).place, 'city');
assert.equal(at(life({ regionId: 'W' })).mood, 'warp');
assert.equal(at(life({ regionId: 'U' })).mood, 'lake');
assert.equal(at(life({ regionId: 'K' })).mood, 'kx');
assert.equal(at(life({ regionId: 'F' })).mood, 'normal');
assert.equal(at(life({ regionId: 'W', pendingEvent: { id: 'x', major: true } })).mood, 'hush', 'a major event hushes the room, whatever the District');
assert.equal(at(life({ regionId: 'F', pendingEvent: { id: 'x' } })).mood, 'normal', 'an ordinary event does not');
assert.equal(at(life({ regionId: 'W', pendingDungeon: { theme: 'warp' } })).mood, 'normal', 'a dungeon has its own backdrop and no mood');
assert.equal(at(life({ alive: false, regionId: 'W' })).mood, 'normal');
console.log('Place and mood passed.');

console.log('5. The nameplate marks the top of each branch...');
const { rankPlateOf } = await import('../src/engine/sceneContext.js');
assert.equal(rankPlateOf(life({ customTitle: 'Vermilion Gale', colorData: { color: '#e1341e' } })).tier, 'color');
assert.equal(rankPlateOf(life({ job: 'Syndicate', finger: 'Ring', fingerRank: 3 })).tier, 'apex');
assert.equal(rankPlateOf(life({ job: 'Syndicate', finger: 'Ring', fingerRank: 3 })).color, WORLDS['finger-ring'].accent);
assert.equal(rankPlateOf(life({ job: 'Syndicate', finger: 'Ring', fingerRank: 3 })).route, 'ring');
assert.equal(rankPlateOf(life({ job: 'Syndicate', finger: 'Index', fingerRank: 2 })).tier, 'high');
assert.equal(rankPlateOf(life({ job: 'Wing Employee', wingRank: 3 })).route, 'wing');
assert.equal(rankPlateOf(life({ job: 'Wing Employee', wingRank: 3 })).tier, 'apex');
assert.equal(rankPlateOf(life({ job: 'Fixer', fixerGrade: 1 })).tier, 'high');
assert.equal(rankPlateOf(life({ job: 'Fixer', fixerGrade: 7 })).tier, 'plain');
assert.equal(rankPlateOf(life({ job: 'Child' })).tier, 'plain');
console.log('Nameplates passed.');
