import assert from 'node:assert/strict';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { endYear } from '../src/engine/yearPlanner.js';
import { applyAnnualPlan, annualTrainingBonus, ambitionComplete, ambitionsFor, defaultYearPoints, previousYearPoints, validYearPoints } from '../src/engine/annualPlan.js';
import { fixerPromotionSuccessChance } from '../src/engine/careerPipeline.js';
import { migrateRun, SAVE_VERSION } from '../src/engine/saveSchema.js';

const char = createNewCharacter({ seed: 'annual-plan', startAge: 30 });
char.job = 'Fixer';
char.fixerGrade = 8;
char.stats.health = 60;
char.stats.rep = 40;
char.merit = 50;
char.pendingYearPlan = { age: 30 };
const beforeOdds = fixerPromotionSuccessChance(char, 7);
assert.equal(previousYearPoints(char), null, 'the first plan has no reusable allocation');
assert.equal(validYearPoints({ train: 3, work: 0, bond: 0, rest: 0, scheme: 0 }), true);
assert.equal(validYearPoints({ train: 4, work: 0, bond: 0, rest: 0, scheme: 0 }), false);
assert.equal(applyAnnualPlan(char, { train: 3, work: 0, bond: 0, rest: 0, scheme: 0 }, 'rank'), true);
assert.deepEqual(previousYearPoints(char), { train: 3, work: 0, bond: 0, rest: 0, scheme: 0 });
const reusedCopy = previousYearPoints(char);
reusedCopy.train = 0;
assert.equal(char.lastYearPoints.train, 3, 'editing a reused draft must not mutate the saved allocation');
assert.equal(annualTrainingBonus(char), 0.06);
assert(fixerPromotionSuccessChance(char, 7) >= beforeOdds);
assert.equal(applyAnnualPlan(char, defaultYearPoints(), 'rank'), false, 'plan can only be spent once');
const saved = migrateRun({ version: SAVE_VERSION, char });
assert.equal(saved.char.annualPlan.points.train, 3);
assert.equal(previousYearPoints(saved.char).train, 3);
assert.equal(saved.char.ambition.id, 'rank');
char.age = 31;
assert.equal(annualTrainingBonus(char), 0, 'training ends with the year');
char.fixerGrade = 1;
assert.equal(ambitionComplete(char), true);

// Only ambitions that still mean something are offered
const outskirtsBorn = createNewCharacter({ seed: 'annual-plan-outskirts', startAge: 20 });
outskirtsBorn.regionId = 'OUTSKIRTS';
outskirtsBorn.job = 'Outcast';
const offered = ambitionsFor(outskirtsBorn).map((goal) => goal.id);
assert(!offered.includes('outskirts'), 'someone already in the Outskirts is not offered reaching it');
assert(!offered.includes('rank'), 'a life with no ladder is not offered climbing one');
outskirtsBorn.pendingYearPlan = { age: 20 };
assert.equal(applyAnnualPlan(outskirtsBorn, defaultYearPoints(), 'outskirts'), false);

// A working year ends with its plan and its leads waiting on the same screen
const worker = createNewCharacter({ seed: 'annual-plan-year-end', startAge: 24 });
worker.job = 'Fixer';
worker.fixerGrade = 9;
worker.pendingEvent = null; worker.pendingMinor = null; worker.pendingContract = null; worker.pendingLead = null;
const nextYear = endYear(worker, createRNG('annual-plan-year-end'));
assert.equal(nextYear.pendingYearPlan?.age, nextYear.age);
assert(Array.isArray(nextYear.plan) && nextYear.plan.length > 0, 'the year is planned before the screen opens');
console.log('Annual plan: points, once-only effects, promotion odds, expiry, ambition choices, year-end screen and save passed.');
