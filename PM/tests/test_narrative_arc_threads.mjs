import assert from 'node:assert/strict';
import { NARRATIVE_ARCS, advanceActiveNarrativeArcs } from '../src/engine/narrativeArcEngine.js';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { closeThreads } from '../src/engine/director.js';

const eventIds = new Set(ALL_STORY_EVENTS.map((event) => event.id));
for (const def of NARRATIVE_ARCS) {
  assert(def.stages.every((stage) => eventIds.has(stage.eventId)), `${def.id} references live events`);
  const char = { age: 25, activeArcs: [], weaver: { pendingThreads: [] }, unlockedRecords: [] };
  advanceActiveNarrativeArcs(char, def.stages[0].eventId);
  assert.equal(char.weaver.pendingThreads.length, 1, `${def.id} schedules chapter 2`);
  assert.equal(char.weaver.pendingThreads[0].triggerAge, 26);
  advanceActiveNarrativeArcs(char, def.stages[0].eventId);
  assert.equal(char.weaver.pendingThreads.length, 1, 'replaying chapter 1 does not duplicate its thread');
  char.age = 26;
  closeThreads(char, def.stages[1].eventId);
  advanceActiveNarrativeArcs(char, def.stages[1].eventId);
  assert.equal(char.weaver.pendingThreads.filter((thread) => !thread.fulfilled).length, 1);
  assert.equal(char.weaver.pendingThreads.at(-1).eventId, def.stages[2].eventId);
  closeThreads(char, def.stages[2].eventId);
  advanceActiveNarrativeArcs(char, def.stages[2].eventId);
  assert.equal(char.activeArcs[0].status, 'completed');
  assert.equal(char.weaver.pendingThreads.filter((thread) => !thread.fulfilled).length, 0);
}
console.log('Narrative arcs: all six use the causal thread queue, advance once and complete.');
