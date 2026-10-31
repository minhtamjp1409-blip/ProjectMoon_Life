import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice, getNextCareerMilestone } from '../src/engine/gameEngine.js';
import {
  isColorProdigyEligible,
  checkColorFixerReadiness,
  COLOR_FIXER_REQ,
  COLOR_FIXER_REQ_PRODIGY
} from '../src/engine/careerPipeline.js';
import { checkState } from '../src/engine/storyInvariants.js';
import { contractRouteOf, equivalentGrade } from '../src/data/careerContracts.js';
import { COLOR_CAREER_EVENTS } from '../src/data/eventsColorCareerArc.js';

console.log('--- RUNNING COLOR FIXER PRODIGY FAST-TRACK & CAREER ARC TESTS ---');

const makeChar = (over = {}) => {
  const c = createNewCharacter({ seed: 'test_color_char', startAge: over.age || 28 });
  c.regionId = 'A';
  c.stats = {
    ...c.stats,
    health: over.stats?.health ?? 90,
    sanity: over.stats?.sanity ?? 85,
    wealth: over.stats?.wealth ?? 60,
    network: over.stats?.network ?? 50,
    rep: over.rep ?? over.stats?.rep ?? 80
  };
  c.job = over.job ?? 'Fixer';
  c.fixerGrade = over.fixerGrade ?? 2;
  c.merit = over.merit ?? 150;
  c.flags = over.flags ? [...over.flags] : ['EGOAwakened'];
  if (over.resonance != null) c.resonance = over.resonance;
  if (over.age != null) c.age = over.age;
  return c;
};

// ----------------------------------------------------------------------------
// 1. Prodigy Fast-Track Eligibility (Hana Directive Zero)
// ----------------------------------------------------------------------------
console.log('1. Testing Hana Directive Zero Prodigy Eligibility...');

// Track A: Early E.G.O Awakening at age 28, Grade 2
const prodigyEgo = makeChar({ age: 28, fixerGrade: 2, merit: 145, rep: 80, flags: ['EGOAwakened'] });
assert.equal(isColorProdigyEligible(prodigyEgo), true, 'Awakened E.G.O at Grade 2 should be prodigy eligible');

// Track B: Martial Prodigy with feat flag & high merit/rep at age 30, Grade 2
const prodigyMartial = makeChar({ age: 30, fixerGrade: 2, merit: 180, rep: 85, flags: ['ProdigyFixer'] });
assert.equal(isColorProdigyEligible(prodigyMartial), true, 'Grade 2 with feat flag and high merit/rep should qualify as Martial Prodigy');

// Track C: High Resonance Anomaly Slayer at age 29, Grade 3
const prodigyResonance = makeChar({ age: 29, fixerGrade: 3, merit: 145, rep: 78, resonance: 82, flags: [] });
assert.equal(isColorProdigyEligible(prodigyResonance), true, 'High resonance Grade 3 Fixer should qualify');

// Disqualifications
const tooYoung = makeChar({ age: 24, fixerGrade: 2, merit: 200, flags: ['EGOAwakened'] });
assert.equal(isColorProdigyEligible(tooYoung), false, 'Under minimum prodigy age 26 should not be eligible');

const tooOldForProdigy = makeChar({ age: 48, fixerGrade: 2, merit: 200, flags: ['EGOAwakened'] });
assert.equal(isColorProdigyEligible(tooOldForProdigy), false, 'Over age 46 must follow standard Grade 1 ascension');

const tooLowGrade = makeChar({ age: 28, fixerGrade: 5, merit: 200, flags: ['EGOAwakened'] });
assert.equal(isColorProdigyEligible(tooLowGrade), false, 'Fixer grade lower than 3 is not eligible for prodigy fast-track');

const distortedProdigy = makeChar({ age: 28, fixerGrade: 2, merit: 200, flags: ['EGOAwakened', 'Distorted'] });
assert.equal(isColorProdigyEligible(distortedProdigy), false, 'Distorted character cannot be prodigy color');

console.log('✓ Prodigy eligibility checks passed across all tracks.');

// ----------------------------------------------------------------------------
// 2. Readiness Engine Evaluation
// ----------------------------------------------------------------------------
console.log('2. Testing checkColorFixerReadiness integration...');

const readinessProdigy = checkColorFixerReadiness(prodigyEgo);
assert.equal(readinessProdigy.ready, true, 'Prodigy should be marked ready for Color trial');
assert.equal(readinessProdigy.targetAge, COLOR_FIXER_REQ_PRODIGY.age, 'Target age should be 26');
assert.equal(readinessProdigy.targetMerit, COLOR_FIXER_REQ_PRODIGY.merit, 'Target merit should be 140');
assert.equal(readinessProdigy.isProdigy, true, 'Should be flagged as prodigy ascension');

// Standard Grade 1 (age 46, merit 320, rep 96)
const standardGrade1 = makeChar({ age: 46, fixerGrade: 1, merit: 320, rep: 96, flags: [] });
const readinessStandard = checkColorFixerReadiness(standardGrade1);
assert.equal(readinessStandard.ready, true, 'Standard Grade 1 should be ready');
assert.equal(readinessStandard.targetAge, 30, 'Target age should be 30 for non-prodigy');
assert.equal(readinessStandard.isProdigy, false, 'Should be flagged as standard ascension');

// Unready Grade 2 Fixer
const unreadyGrade2 = makeChar({ age: 28, fixerGrade: 2, merit: 50, rep: 40, flags: [] });
assert.equal(checkColorFixerReadiness(unreadyGrade2).ready, false, 'Unready Grade 2 should not be ready');

console.log('✓ checkColorFixerReadiness accurately distinguishes prodigies from standard candidates.');

// ----------------------------------------------------------------------------
// 3. Color Ascension Choice Resolution & Invariants
// ----------------------------------------------------------------------------
console.log('3. Testing Color Ascension Choice Resolution & Story Invariants...');

const colorTrialEvent = ALL_STORY_EVENTS.find(e => e.id === 'hana_color_ascension_trial');
assert.ok(colorTrialEvent, 'hana_color_ascension_trial event must exist in ALL_STORY_EVENTS');

let ascendingChar = makeChar({ age: 29, fixerGrade: 2, merit: 160, rep: 85, flags: ['EGOAwakened'] });
ascendingChar.pendingEvent = colorTrialEvent;

// Choose option 0 (Head-on confrontation)
const resolvedChar = resolveEventChoice(ascendingChar, 0, () => 0.1); // Force win outcome (w: 60)
assert.equal(resolvedChar.flags.includes('ColorFixer'), true, 'Should have ColorFixer flag');
assert.equal(resolvedChar.job, 'Color Fixer', 'Job must transition to Color Fixer');
assert.equal(resolvedChar.fixerGrade, 0, 'Fixer grade must become 0');

// Verify story invariants
const invariantViolations = checkState(resolvedChar);
assert.equal(invariantViolations.length, 0, `Invariant violations detected: ${JSON.stringify(invariantViolations)}`);

// Verify invariant validator catches invalid combinations
const badColorJob = { ...resolvedChar, job: 'Color Fixer', flags: [] };
assert.ok(checkState(badColorJob).some(v => v.code === 'color-job-flag'), 'Should catch Color Fixer without flag');

const badColorGrade = { ...resolvedChar, flags: ['ColorFixer'], fixerGrade: 2 };
assert.ok(checkState(badColorGrade).some(v => v.code === 'color-grade'), 'Should catch ColorFixer with non-zero grade');

console.log('✓ Invariants and job transition fully verified.');

// ----------------------------------------------------------------------------
// 4. Color Career Events & Contract Integration
// ----------------------------------------------------------------------------
console.log('4. Testing Dedicated Color Career Events & Contract Route...');

assert.equal(COLOR_CAREER_EVENTS.length, 9, 'Must have exactly 9 dedicated Color Career events');

for (const ev of COLOR_CAREER_EVENTS) {
  assert.ok(ev.id.startsWith('color_arc_'), `Event id should start with color_arc_: ${ev.id}`);
  assert.ok(ev.vi && ev.vi.length > 20, `Event ${ev.id} must have Vietnamese text`);
  assert.ok(ev.en && ev.en.length > 20, `Event ${ev.id} must have English text`);
  assert.ok(ev.major === true, `Event ${ev.id} must be major`);
  assert.ok((ev.requires || []).includes('ColorFixer'), `Event ${ev.id} must require ColorFixer flag`);
  assert.ok(ev.choices?.length >= 2, `Event ${ev.id} must have at least 2 choices`);

  // Verify event is present in the registered game engine pool
  const registered = ALL_STORY_EVENTS.find(e => e.id === ev.id);
  assert.ok(registered, `Event ${ev.id} must be in ALL_STORY_EVENTS`);
}

// Contract route verification
assert.equal(contractRouteOf(resolvedChar), 'fixer', 'Color Fixer must retain Fixer contract route');
assert.equal(equivalentGrade(resolvedChar, 'fixer'), 0, 'Equivalent grade for Color Fixer must be 0 (Apex)');

// Milestone display verification
const milestone = getNextCareerMilestone(resolvedChar);
assert.equal(milestone.category, 'COLOR FIXER ASCENSION', 'Milestone should show COLOR FIXER ASCENSION');

// A Color prodigy below Grade 1 is shown the Color trial, and its checklist agrees with the Color gate, not with the
// next Grade's exam (the rare check 5 failure in run_million_audit, Đợt 105 to 109)
for (const grade of [2, 3]) {
  const prodigy = createNewCharacter({ seed: `prodigy-checklist-${grade}`, startAge: 30 });
  Object.assign(prodigy, { job: 'Fixer', fixerGrade: grade, merit: 135, age: 30, flags: [...prodigy.flags.filter((f) => f !== 'Distorted'), 'ProdigyFixer'] });
  prodigy.stats = { ...prodigy.stats, rep: 76 };
  assert.ok(isColorProdigyEligible(prodigy), `Grade ${grade} with a feat, Merit 135 and Rep 76 is a prodigy`);
  const shown = getNextCareerMilestone(prodigy);
  assert.equal(shown.category, 'STAR OF THE CITY ORDEAL', `Grade ${grade} prodigy is shown the Color trial`);
  assert.equal(shown.requirements.every((r) => r.met), checkColorFixerReadiness(prodigy).ready, `Grade ${grade} prodigy checklist matches the Color gate`);
}

console.log('✓ Color Career Arc events, contracts, and milestones are solid.');
console.log('\nALL COLOR CAREER ARC TESTS PASSED SUCCESSFULLY! (100% OK)');
