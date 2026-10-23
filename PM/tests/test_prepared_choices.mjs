import assert from 'node:assert/strict';
import { createNewCharacter, createRNG, resolveEventChoice } from '../src/engine/gameEngine.js';
import { rollEgoEncounter } from '../src/engine/awakeningProgress.js';
import { choiceIsAvailable, matchesEventContext } from '../src/engine/eventConditions.js';
import { PREPARED_CHOICE_EVENTS as events } from '../src/data/eventsPreparedChoices.js';
import { planYear, runPlanItem } from '../src/engine/yearPlanner.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { SUPERNATURAL_EVENTS } from '../src/data/eventsSupernatural.js';

function born(seed = 'prepared') {
  const c = createNewCharacter({ seed });
  Object.assign(c, { age: 30, job: 'Fixer', regionId: '1', flags: [], resonance: 70, inventory: [] });
  c.stats = { health: 90, sanity: 70, wealth: 60, rep: 40, network: 40 };
  return c;
}
let offers = 0;
for (let seed = 0; seed < 500; seed++) {
  const c = born(`ego-offer-${seed}`), rng = createRNG(`ego-offer-${seed}`);
  let offered = false;
  for (let year = 0; year < 3; year++) {
    c.age = 30 + year;
    let draws = 0;
    const roll = () => { draws++; return rng(); };
    const first = rollEgoEncounter(c, roll);
    assert.equal(rollEgoEncounter(c, roll), first);
    assert.equal(draws, 1, 'one draw per year, even if the selector is called again');
    if (first) { offered = true; break; }
  }
  if (offered) offers++;
}
assert.ok(offers > 340 && offers < 460, `unexpected encounter frequency ${offers}/500`);
const c = born();
const carmen = SUPERNATURAL_EVENTS.find(e => e.id === 'ego_carmen_crossroad');
assert.equal(rollEgoEncounter(c, () => 0.99), false);
assert.equal(isEventEligible(carmen, c, { scripted: true }), false, 'forced/server event cannot bypass the annual roll');
const abno = events.find(e => e.id === 'abno_observation_archive');
c.pendingEvent = abno;
assert.equal(choiceIsAvailable(abno.choices[1], c), false);
assert.equal(resolveEventChoice(c, 1, () => 0).pendingEvent.id, abno.id);
c.inventory.push({ id: 'con_enkephalin_inhaler' });
const used = resolveEventChoice(c, 1, () => 0);
assert.equal(used.inventory.length, 0);
assert.equal(c.inventory.length, 1, 'original state stays intact');
assert.ok(used.flags.includes('AbnoCycleNotes'));
used.age++;
planYear(used, () => 0.5);
const callback = used.plan.find(it => it.forcedEventId === 'abno_archive_recovery');
assert.ok(callback);
assert.equal(runPlanItem(used, callback, () => 0).pendingEvent.id, 'abno_archive_recovery');
const escort = events.find(e => e.id === 'mid_fixer_cordon');
const favorIndex = escort.choices.findIndex(ch => ch.favorCost);
c.pendingEvent = escort;
c.npcs.friend = { alive: false, bond: 100 };
assert.equal(choiceIsAvailable(escort.choices[favorIndex], c), false);
c.npcs.friend = { alive: true, bond: 30 };
const helped = resolveEventChoice(c, favorIndex, () => 0);
assert.equal(helped.npcs.friend.bond, 15);
assert.equal(c.npcs.friend.bond, 30);
for (const event of events.filter(e => e.need?.finger)) {
  c.job = 'Syndicate'; c.finger = event.need.finger;
  assert.equal(matchesEventContext(event, c), true);
  c.finger = 'WrongFinger';
  assert.equal(matchesEventContext(event, c), false);
}
globalThis.localStorage = { getItem: () => null };
const { audioEngine } = await import('../src/engine/audioEngine.js');
const ramps = [];
audioEngine.ctx = { currentTime: 0 };
audioEngine.ambienceGain = { gain: { value: 0.1, cancelScheduledValues() {}, setValueAtTime() {}, linearRampToValueAtTime(v) { ramps.push(v); } } };
audioEngine.duckAmbience(0.2, 1);
audioEngine.isAmbienceMuted = true;
await new Promise(resolve => setTimeout(resolve, 10));
assert.equal(ramps.at(-1), 0, 'duck recovery respects mute');
console.log(`Prepared choices passed; Carmen encountered in ${offers}/500 three-year windows, never rerolled within a year.`);
