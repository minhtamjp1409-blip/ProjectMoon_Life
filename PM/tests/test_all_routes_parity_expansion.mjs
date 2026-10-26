import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { LIFE_MINORS, LIFE_DAILIES } from '../src/engine/yearPlanner.js';
import { WING_PARITY_MAJORS, WING_PARITY_MINORS, WING_PARITY_DAILIES } from '../src/data/eventsWingParityExpansion.js';
import { DISTORTION_PARITY_MAJORS, DISTORTION_PARITY_MINORS, DISTORTION_PARITY_DAILIES } from '../src/data/eventsDistortionParityExpansion.js';
import { COLOR_EXPANSION_MINORS, COLOR_EXPANSION_DAILIES } from '../src/data/eventsColorExpansionSuite.js';
import { FINGERS_GAMBLE_EVENTS } from '../src/data/eventsFingersGambleSuite.js';

console.log('--- RUNNING ALL-ROUTES PARITY & POLISH EXPANSION TESTS ---');

// ----------------------------------------------------------------------------
// 1. Wing Employee Route Parity
// ----------------------------------------------------------------------------
console.log('1. Verifying Wing Employee Expansion Suite...');
assert.ok(WING_PARITY_MAJORS.length >= 2, 'Must have at least 2 Wing expansion majors');
for (const m of WING_PARITY_MAJORS) {
  assert.ok(m.id.startsWith('wing_arc_'), `Major event ID should start with wing_arc_: ${m.id}`);
  assert.ok(m.need?.jobs?.includes('Wing Employee'), `Major ${m.id} must require Wing Employee`);
  assert.ok(m.choices?.length >= 2, `Major ${m.id} must offer multiple choices`);
  assert.ok(ALL_STORY_EVENTS.some(e => e.id === m.id), `Major ${m.id} must be in ALL_STORY_EVENTS`);
}

assert.ok(WING_PARITY_MINORS.length >= 6, 'Must have multiple Wing expansion minors');
for (const minor of WING_PARITY_MINORS) {
  assert.ok(minor.id.startsWith('m_wing_'), `Minor ID should start with m_wing_: ${minor.id}`);
  assert.ok(minor.need?.jobs?.includes('Wing Employee'), `Minor ${minor.id} must be for Wing Employee`);
  assert.ok(minor.choices?.length >= 2, `Minor ${minor.id} must have choices`);
  assert.ok(LIFE_MINORS.some(item => item.id === minor.id), `Minor ${minor.id} must be in LIFE_MINORS`);
}

assert.ok(WING_PARITY_DAILIES.length >= 8, 'Must have multiple Wing expansion dailies');
for (const daily of WING_PARITY_DAILIES) {
  assert.ok(daily.id.startsWith('d_wing_'), `Daily ID should start with d_wing_: ${daily.id}`);
  assert.ok(daily.need?.jobs?.includes('Wing Employee'), `Daily ${daily.id} must be for Wing Employee`);
  assert.ok(LIFE_DAILIES.some(item => item.id === daily.id), `Daily ${daily.id} must be in LIFE_DAILIES`);
}
console.log(`✓ Wing Employee: ${WING_PARITY_MAJORS.length} majors, ${WING_PARITY_MINORS.length} minors, ${WING_PARITY_DAILIES.length} dailies registered.`);

// ----------------------------------------------------------------------------
// 2. Distortion Route Parity
// ----------------------------------------------------------------------------
console.log('2. Verifying Distortion Metamorphosis Expansion Suite...');
assert.ok(DISTORTION_PARITY_MAJORS.length >= 2, 'Must have at least 2 Distortion expansion majors');
for (const m of DISTORTION_PARITY_MAJORS) {
  assert.ok(m.id.startsWith('distort_arc_'), `Major ID should start with distort_arc_: ${m.id}`);
  assert.ok(m.requires?.includes('Distorted'), `Major ${m.id} must require Distorted`);
  assert.ok(m.choices?.length >= 2, `Major ${m.id} must have choices`);
  assert.ok(ALL_STORY_EVENTS.some(e => e.id === m.id), `Major ${m.id} must be in ALL_STORY_EVENTS`);
}

assert.ok(DISTORTION_PARITY_MINORS.length >= 6, 'Must have multiple Distortion expansion minors');
for (const minor of DISTORTION_PARITY_MINORS) {
  assert.ok(minor.id.startsWith('m_distort_'), `Minor ID should start with m_distort_: ${minor.id}`);
  assert.ok(minor.extra?.requires?.includes('Distorted') || minor.requires?.includes('Distorted'), `Minor ${minor.id} must require Distorted`);
  assert.ok(minor.choices?.length >= 2, `Minor ${minor.id} must have choices`);
  assert.ok(LIFE_MINORS.some(item => item.id === minor.id), `Minor ${minor.id} must be in LIFE_MINORS`);
}

assert.ok(DISTORTION_PARITY_DAILIES.length >= 6, 'Must have multiple Distortion expansion dailies');
for (const daily of DISTORTION_PARITY_DAILIES) {
  assert.ok(daily.id.startsWith('d_distort_'), `Daily ID should start with d_distort_: ${daily.id}`);
  assert.ok(daily.need?.jobs?.includes('Distortion'), `Daily ${daily.id} must target Distortion job`);
  assert.ok(LIFE_DAILIES.some(item => item.id === daily.id), `Daily ${daily.id} must be in LIFE_DAILIES`);
}
console.log(`✓ Distortion Route: ${DISTORTION_PARITY_MAJORS.length} majors, ${DISTORTION_PARITY_MINORS.length} minors, ${DISTORTION_PARITY_DAILIES.length} dailies registered.`);

// ----------------------------------------------------------------------------
// 3. Color Fixer Living Legend Parity
// ----------------------------------------------------------------------------
console.log('3. Verifying Color Fixer Living Legend Expansion Suite...');
assert.ok(COLOR_EXPANSION_MINORS.length >= 4, 'Must have Color expansion minors');
for (const minor of COLOR_EXPANSION_MINORS) {
  assert.ok(minor.id.startsWith('m_color_'), `Minor ID should start with m_color_: ${minor.id}`);
  assert.ok(minor.extra?.requires?.includes('ColorFixer') || minor.requires?.includes('ColorFixer'), `Minor ${minor.id} must require ColorFixer`);
  assert.ok(minor.choices?.length >= 2, `Minor ${minor.id} must have choices`);
  assert.ok(LIFE_MINORS.some(item => item.id === minor.id), `Minor ${minor.id} must be in LIFE_MINORS`);
}

assert.ok(COLOR_EXPANSION_DAILIES.length >= 6, 'Must have Color expansion dailies');
for (const daily of COLOR_EXPANSION_DAILIES) {
  assert.ok(daily.id.startsWith('d_color_'), `Daily ID should start with d_color_: ${daily.id}`);
  assert.ok(daily.need?.jobs?.includes('Color Fixer'), `Daily ${daily.id} must be for Color Fixer`);
  assert.ok(LIFE_DAILIES.some(item => item.id === daily.id), `Daily ${daily.id} must be in LIFE_DAILIES`);
}
console.log(`✓ Color Fixer: ${COLOR_EXPANSION_MINORS.length} minors, ${COLOR_EXPANSION_DAILIES.length} dailies registered.`);

// ----------------------------------------------------------------------------
// 4. Five Fingers High-Stakes Gamble Suite
// ----------------------------------------------------------------------------
console.log('4. Verifying Five Fingers High-Stakes Gambles...');
assert.equal(FINGERS_GAMBLE_EVENTS.length, 5, 'Must have exactly 5 Finger gamble events');
const expectedFingers = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];

for (const finger of expectedFingers) {
  const ev = FINGERS_GAMBLE_EVENTS.find(e => e.need?.finger === finger);
  assert.ok(ev, `Missing gamble event for Finger: ${finger}`);
  assert.ok(ev.major === true, `Event ${ev.id} must be major`);
  assert.ok(ev.need.fingerRankAtLeast >= 1, `Event ${ev.id} should require rank >= 1`);
  assert.ok(ev.choices?.length >= 2, `Event ${ev.id} must have at least 2 choices`);
  assert.ok(ALL_STORY_EVENTS.some(e => e.id === ev.id), `Event ${ev.id} must be in ALL_STORY_EVENTS`);
}
console.log('✓ Five Fingers: All 5 high-stakes gamble events verified.');

console.log('\nALL-ROUTES PARITY & POLISH EXPANSION TESTS PASSED! (100% OK)');
