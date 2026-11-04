// The way back to a human voice for a Distortion (eventsDistortionVoice.js): a chain of three events,
// each return opened by a flag the earlier choice really sets, ending in HumanVoice, which softens the yearly cost.
import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import { DISTORTION_VOICE_EVENTS } from '../src/data/eventsDistortionVoice.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { endYear } from '../src/engine/yearPlanner.js';

const byId = new Map(DISTORTION_VOICE_EVENTS.map((e) => [e.id, e]));
const START = 'distort_voice_old_name';
const rowsOf = (choice) => choice.outcomes || [choice];
const scheduled = (choice) => rowsOf(choice).flatMap((row) => [...(choice.scheduleConsequences || []), ...(row.scheduleConsequences || [])]);
const flagsAddedBy = (choice) => rowsOf(choice).flatMap((row) => [...(choice.flagsAdd || []), ...(row.flagsAdd || [])]);

// 1. Registered once; only the start is drawn by the Weaver
for (const e of DISTORTION_VOICE_EVENTS) assert.equal(ALL_STORY_EVENTS.filter((x) => x.id === e.id).length, 1, `${e.id} registered once`);
assert(!byId.get(START).causalOnly, 'the start is drawn by the Weaver');
for (const e of DISTORTION_VOICE_EVENTS.filter((x) => x.id !== START)) assert(e.causalOnly && e.weight === 0, `${e.id} only appears as a consequence`);

// 2. Every return is scheduled by some choice and requires a flag that a choice sets
const produced = new Set(DISTORTION_VOICE_EVENTS.flatMap((e) => e.choices.flatMap(flagsAddedBy)));
const targets = new Set(DISTORTION_VOICE_EVENTS.flatMap((e) => e.choices.flatMap(scheduled)).map((s) => s.eventId));
for (const e of DISTORTION_VOICE_EVENTS.filter((x) => x.id !== START)) {
  assert(targets.has(e.id), `${e.id} is never scheduled`);
  for (const flag of e.requires || []) assert(produced.has(flag), `${e.id} requires ${flag}, which no choice sets`);
}
assert(produced.has('HumanVoice'), 'the thread can end in HumanVoice');

// 3. Walking the hopeful path in the engine reaches HumanVoice
const distortion = (seed) => {
  const c = createNewCharacter({ seed, startAge: 24, sparePerinatal: true });
  c.job = 'Distortion'; c.alive = true; c.flags = [...new Set([...(c.flags || []), 'Distorted'])];
  c.stats = { ...c.stats, health: 90, sanity: 50, network: 20, rep: 20 };
  c.heat = 40;
  return c;
};
let c = distortion('voice-path');
assert(isEventEligible(byId.get(START), c, { scripted: true }), 'a Distortion can hear the old name');
const human = createNewCharacter({ seed: 'voice-human', startAge: 24, sparePerinatal: true });
human.job = 'Fixer';
assert(!isEventEligible(byId.get(START), human, { scripted: true }), 'a human never meets the thread');

for (const [id, choiceIdx] of [[START, 0], ['distort_voice_letters', 0], ['distort_voice_reclaimed', 0]]) {
  const event = byId.get(id);
  assert(isEventEligible(event, c, { scripted: true }), `${id} is eligible on the hopeful path`);
  c.pendingEvent = event;
  c = resolveEventChoice(c, choiceIdx, () => 0.1); // 0.1 lands in the 65-weight outcome of the practice choice
  const next = scheduled(event.choices[choiceIdx])[0];
  if (next) c.age += next.delayYears;
}
assert(c.flags.includes('HumanVoice'), 'the hopeful path ends with a human voice');
assert(c.flags.includes('Distorted') && c.job === 'Distortion', 'the body stays Distorted: nothing is cured');
assert(!isEventEligible(byId.get(START), c, { scripted: true }), 'the thread does not open twice');

// 4. Turning away closes the thread for good
let fled = distortion('voice-fled');
fled.pendingEvent = byId.get(START);
fled = resolveEventChoice(fled, 1, () => 0.1);
fled.age += 5;
assert(!isEventEligible(byId.get('distort_voice_letters'), fled, { scripted: true }), 'no notes for one who fled');

// 5. HumanVoice halves Hana's watch and ends the yearly isolation
const yearCost = (flags) => {
  const before = distortion('voice-cost');
  before.flags = [...new Set([...before.flags, ...flags])];
  const after = endYear(before, () => 0.5);
  const entry = after.logs.filter((l) => l.type === 'summary').at(-1);
  const get = (label) => (entry?.breakdown || []).filter((b) => b.labelEn === label).reduce((s, b) => s + b.v, 0);
  return { heat: get('Hana Distortion surveillance'), network: get('Social isolation from Distortion') };
};
assert.deepEqual(yearCost([]), { heat: 6, network: -2 });
assert.deepEqual(yearCost(['HumanVoice']), { heat: 3, network: 0 });

console.log('Distortion voice: three-step thread to HumanVoice, Distortion kept, yearly watch halved and isolation ended');
