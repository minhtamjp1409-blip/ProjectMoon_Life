// The E.G.O road to Color, how a Color name is marked at investiture, and the era events that read those marks.
import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import { isColorEgoRoadEligible, isColorProdigyEligible, checkColorFixerReadiness, COLOR_FIXER_REQ_EGO_ROAD } from '../src/engine/careerPipeline.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { COLOR_ERA_EVENTS } from '../src/data/eventsColorEras.js';
import { checkState } from '../src/engine/storyInvariants.js';

const fixer = (over = {}) => {
  const c = createNewCharacter({ seed: 'color-eras', startAge: over.age || 34 });
  c.regionId = 'A';
  c.job = over.job ?? 'Fixer';
  c.fixerGrade = over.fixerGrade ?? 4;
  c.merit = over.merit ?? 90;
  c.age = over.age ?? 34;
  c.resonance = over.resonance ?? 70;
  c.flags = over.flags ? [...over.flags] : ['EGOAwakened'];
  c.stats = { ...c.stats, health: 90, sanity: 80, wealth: 50, network: 40, rep: over.rep ?? 75 };
  return c;
};

console.log('1. The E.G.O road opens for a settled Awakened wielder at Grade 4 or better...');
assert.equal(isColorEgoRoadEligible(fixer()), true);
assert.equal(isColorProdigyEligible(fixer()), true, 'the road counts as an early path');
assert.equal(isColorEgoRoadEligible(fixer({ fixerGrade: 5 })), false, 'Grade 5 is below the road');
assert.equal(isColorEgoRoadEligible(fixer({ flags: [] })), false, 'no Awakened E.G.O, no road');
assert.equal(isColorEgoRoadEligible(fixer({ resonance: 40 })), false, 'an E.G.O that has not settled does not count');
assert.equal(isColorEgoRoadEligible(fixer({ merit: COLOR_FIXER_REQ_EGO_ROAD.merit - 1 })), false, 'the record still has to be there');
assert.equal(isColorEgoRoadEligible(fixer({ rep: 60 })), false);
assert.equal(isColorEgoRoadEligible(fixer({ age: 24 })), false, 'too young');
assert.equal(isColorEgoRoadEligible(fixer({ age: 48 })), false, 'after the window the ordinary Grade 1 road applies');
assert.equal(isColorEgoRoadEligible(fixer({ flags: ['EGOAwakened', 'Distorted'] })), false);
assert.equal(isColorEgoRoadEligible(fixer({ job: 'Wing Employee' })), false);

console.log('2. Readiness follows the road requirement...');
const ready = checkColorFixerReadiness(fixer());
assert.equal(ready.ready, true);
assert.equal(ready.targetMerit, COLOR_FIXER_REQ_EGO_ROAD.merit);
assert.equal(checkColorFixerReadiness(fixer({ merit: 60 })).ready, false);

console.log('3. Investiture records how the name was reached...');
const trial = ALL_STORY_EVENTS.find((e) => e.id === 'hana_color_ascension_trial');
const attunedIdx = trial.choices.findIndex((c) => c.need?.flags?.includes('EGOAttuned'));
assert.ok(attunedIdx >= 0, 'the trial offers an attuned choice');
const young = fixer({ flags: ['EGOAwakened', 'EGOAttuned'] });
young.pendingEvent = trial;
const named = resolveEventChoice(young, attunedIdx, () => 0.1);
assert.ok(named.flags.includes('ColorFixer'));
assert.ok(named.flags.includes('ColorYoung'), 'named before 45');
assert.ok(named.flags.includes('ColorFromEGO'), 'the E.G.O was already awake');
assert.equal(checkState(named).length, 0);
const older = fixer({ age: 52, fixerGrade: 1, merit: 300, rep: 96, flags: [] });
older.pendingEvent = trial;
const olderNamed = resolveEventChoice(older, 0, () => 0.1);
assert.ok(olderNamed.flags.includes('ColorFixer'));
assert.ok(!olderNamed.flags.includes('ColorYoung') && !olderNamed.flags.includes('ColorFromEGO'), 'late and without an E.G.O carries neither mark');

console.log('4. Era events only reach the Colors they speak to...');
assert.equal(COLOR_ERA_EVENTS.length, 18);
const era = (id) => ALL_STORY_EVENTS.find((e) => e.id === id);
const colorFixer = (flags, age) => fixer({ job: 'Color Fixer', fixerGrade: 0, age, flags: ['ColorFixer', ...flags] });
assert.equal(isEventEligible(era('color_young_snub'), colorFixer(['ColorYoung'], 33)), true);
assert.equal(isEventEligible(era('color_young_snub'), colorFixer([], 33)), false, 'needs ColorYoung');
assert.equal(isEventEligible(era('color_ego_whose_name'), colorFixer(['ColorFromEGO'], 40)), true);
assert.equal(isEventEligible(era('color_ego_whose_name'), colorFixer(['ColorYoung'], 40)), false, 'needs ColorFromEGO');
assert.equal(isEventEligible(era('color_hana_hands_slowing'), colorFixer([], 40)), false, 'too early in life');
assert.equal(isEventEligible(era('color_hana_hands_slowing'), colorFixer([], 62)), true);
assert.equal(isEventEligible(era('ego_attunement_hour'), fixer()), true);
assert.equal(isEventEligible(era('ego_attunement_hour'), fixer({ flags: ['EGOAwakened', 'EGOAttuned'] })), false, 'happens once');

console.log('5. Every era event is complete...');
const ids = new Set();
for (const ev of COLOR_ERA_EVENTS) {
  assert.ok(!ids.has(ev.id), `duplicate ${ev.id}`); ids.add(ev.id);
  assert.ok(ev.vi && ev.en && ev.choices?.length >= 2, `${ev.id} needs text and two choices`);
  for (const ch of ev.choices) {
    assert.ok(ch.labelVi && ch.labelEn, `${ev.id} choice label`);
    const rows = ch.outcomes || [ch];
    for (const row of rows) assert.ok(row.resultVi && row.resultEn, `${ev.id} result text`);
  }
}

console.log('Color eras: E.G.O road, investiture marks, era gating and content checks passed.');
