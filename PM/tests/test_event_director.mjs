import assert from 'node:assert/strict';
import { createNewCharacter, createRNG, ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { directorScore, directorTags, drawDirectorCandidate, rememberDirectorEvent } from '../src/engine/eventDirector.js';
import { isEventEligible, selectEventWithWeaverAI } from '../src/engine/weaverAI.js';

const dangerous = { id: 'test_hazard', choices: [{ effects: { health: -12 } }, { startDungeon: 'night' }] };
const relief = { id: 'test_breather', choices: [{ effects: { health: 8 } }, { effects: { sanity: 7 } }] };
const char = createNewCharacter({ seed: 'director-contract', startAge: 29 });
char.job = 'Outcast';
char.stats.health = 22;
char.stats.sanity = 25;
const weaver = { ...char.weaver, recentBeats: [
  { id: 'hurt-1', age: 27, tags: ['danger'] },
  { id: 'hurt-2', age: 28, tags: ['danger'] }
] };

assert(directorTags(dangerous).includes('danger'));
assert(directorTags(relief).includes('relief'));
assert(directorScore(dangerous, char, weaver, 100).utility < 100);
assert(directorScore(relief, char, weaver, 100).utility > 100);
assert.equal(rememberDirectorEvent(weaver, dangerous, 29).at(-1).id, dangerous.id);
assert.equal(drawDirectorCandidate([{ utility: 1, event: relief }], 0.5).event.id, relief.id);

char.weaver = weaver;
char.weaver.directorPolicy = 'shadow';
const draw = createRNG('director-pick')();
const shadow = selectEventWithWeaverAI({ weaver: char.weaver, char, allPools: ALL_STORY_EVENTS, consequencePool: [], rng: () => draw });
const shadowRecord = shadow.weaver.decisionLog[0].director;
assert.equal(shadow.event.id, shadowRecord.legacyId);
assert(isEventEligible(shadow.event, char));

const active = selectEventWithWeaverAI({ weaver: { ...weaver, directorPolicy: 'active' }, char, allPools: ALL_STORY_EVENTS, consequencePool: [], rng: () => draw });
assert.equal(active.event.id, active.weaver.decisionLog[0].director.directedId);
assert(isEventEligible(active.event, char));
assert.equal(active.weaver.decisionLog[0].director.legacyId, shadowRecord.legacyId);

console.log('Event director: bounded tags, pacing, shadow comparison, seeded draw and eligibility passed.');
