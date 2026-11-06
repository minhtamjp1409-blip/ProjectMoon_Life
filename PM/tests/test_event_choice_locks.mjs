import test from 'node:test';
import assert from 'node:assert/strict';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { choiceIsAvailable } from '../src/engine/eventConditions.js';
import { WING_PARITY_MAJORS } from '../src/data/eventsWingParityExpansion.js';
import { FINGERS_GAMBLE_EVENTS } from '../src/data/eventsFingersGambleSuite.js';
import { rollSeasonMishap, MISHAPS } from '../src/engine/fateEngine.js';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';

test('Scan all 790+ story events: no event can ever present with 0 available choices when eligible', () => {
  assert.ok(ALL_STORY_EVENTS.length >= 750, `Expected >= 750 events, found ${ALL_STORY_EVENTS.length}`);

  let totalEventsWithChoices = 0;
  for (const ev of ALL_STORY_EVENTS) {
    if (!Array.isArray(ev.choices) || ev.choices.length === 0) continue;
    totalEventsWithChoices++;

    // Construct a minimal broke/starved character
    const brokeChar = {
      alive: true,
      age: ev.age ? ev.age[0] : 25,
      job: ev.jobs ? ev.jobs[0] : (ev.need?.jobs ? ev.need.jobs[0] : 'Fixer'),
      regionId: 'D10',
      stats: { health: 1, sanity: 1, wealth: 0, rep: 0, standing: 0 },
      leverage: 0,
      flags: [],
      seenEvents: [],
      weaver: { pendingThreads: [] }
    };

    // If all choices are locked for brokeChar, isEventEligible MUST return false!
    const anyChoiceAvailable = ev.choices.some((c) => choiceIsAvailable(c, brokeChar));
    if (!anyChoiceAvailable) {
      const eligible = isEventEligible(ev, brokeChar);
      assert.equal(
        eligible,
        false,
        `Event "${ev.id}" has all choices locked for broke character but isEventEligible returned true!`
      );
    }
  }

  assert.ok(totalEventsWithChoices >= 500, `Verified ${totalEventsWithChoices} events with choices`);
});

test('isEventEligible systematically rejects events when all choices are locked', () => {
  const dummyChar = {
    alive: true,
    age: 30,
    job: 'Wing Employee',
    wingRank: 2,
    stats: { health: 10, sanity: 10, wealth: 0, rep: 10 },
    leverage: 0,
    flags: [],
    seenEvents: [],
    weaver: { pendingThreads: [] }
  };

  const dummyEventWithAllLocked = {
    id: 'test_locked_event',
    age: [20, 60],
    major: true,
    need: { jobs: ['Wing Employee'] },
    choices: [
      { labelVi: 'A', need: { stat: { wealth: [50, 100] } } },
      { labelVi: 'B', costAhn: 100 }
    ]
  };

  assert.equal(isEventEligible(dummyEventWithAllLocked, dummyChar), false, 'Event with all locked choices must not be eligible');

  const dummyEventWithFallback = {
    id: 'test_open_event',
    age: [20, 60],
    major: true,
    need: { jobs: ['Wing Employee'] },
    choices: [
      { labelVi: 'A', need: { stat: { wealth: [50, 100] } } },
      { labelVi: 'C', labelVi: 'Fallback' }
    ]
  };

  assert.equal(isEventEligible(dummyEventWithFallback, dummyChar), true, 'Event with at least one viable choice should be eligible');
});

test('Patent Warfare event requires leverage for Choice 1 and provides safe Choice 3 fallback', () => {
  const patentEvent = WING_PARITY_MAJORS.find((e) => e.id === 'wing_arc_corporate_patent_warfare');
  assert.ok(patentEvent, 'wing_arc_corporate_patent_warfare must exist');
  
  // Choice 1 check
  const choice1 = patentEvent.choices[0];
  assert.deepEqual(choice1.need?.stat?.leverage, [30, 100], 'Choice 1 should require leverage [30, 100]');
  assert.equal(choice1.need?.stat?.wealth, undefined, 'Choice 1 should not require wealth');

  // Choice 3 fallback check
  const choice3 = patentEvent.choices[2];
  assert.ok(choice3, 'Choice 3 fallback must exist');
  const brokeChar = { stats: { wealth: 0, health: 50, sanity: 50 }, leverage: 0, flags: [] };
  assert.equal(choiceIsAvailable(choice3, brokeChar), true, 'Choice 3 should be available with 0 Ahn and 0 leverage');
});

test('Fingers Gamble suite provides fallback choices on all 3 major gamble events', () => {
  const thumb = FINGERS_GAMBLE_EVENTS.find((e) => e.id === 'syn_thumb_gamble_etiquette_duel');
  const middle = FINGERS_GAMBLE_EVENTS.find((e) => e.id === 'syn_middle_gamble_great_vendetta');
  const ring = FINGERS_GAMBLE_EVENTS.find((e) => e.id === 'syn_ring_gamble_flesh_gallery');

  assert.ok(thumb && middle && ring, 'All 3 gamble events must exist in FINGERS_GAMBLE_EVENTS');

  const exhaustedBrokeChar = {
    stats: { health: 10, sanity: 10, wealth: 0 },
    flags: []
  };

  for (const ev of [thumb, middle, ring]) {
    assert.equal(ev.choices.length, 3, `${ev.id} must have 3 choices`);
    const fallback = ev.choices[2];
    assert.equal(choiceIsAvailable(fallback, exhaustedBrokeChar), true, `${ev.id} fallback choice must be available to broke/exhausted char`);
  }
});

import { DISTORTION_PARITY_MAJORS } from '../src/data/eventsDistortionParityExpansion.js';
import { ANNUAL_MERIT_OPPORTUNITIES } from '../src/data/annualMeritOpportunities.js';
import { LIFE_ENDINGS } from '../src/data/lifeEndings.js';
import { CLAW_DUNGEON_ID } from '../src/data/dungeonClaw.js';

test('Distortion-specific mishaps and filtering work', () => {
  const distChar = {
    alive: true,
    age: 70,
    job: 'Distortion',
    flags: ['Distorted'],
    regionId: 'D10',
    stats: { health: 30, sanity: 30, wealth: 0, heat: 40 },
    resonance: 50,
    recentMishaps: []
  };

  // Fixed pseudo RNG sequence to test mishap drawing
  let seeds = [0.01, 0.5, 0.1, 0.05];
  let seedIdx = 0;
  const mockRng = () => {
    const val = seeds[seedIdx % seeds.length];
    seedIdx++;
    return val;
  };

  const humanMishapIds = new Set(MISHAPS.filter((m) => m.human).map((m) => m.id));
  assert.ok(humanMishapIds.has('mi_clinic_error'), 'mi_clinic_error must be tagged human');
  assert.ok(humanMishapIds.has('mi_shakedown'), 'mi_shakedown must be tagged human');
  assert.ok(humanMishapIds.has('mi_alley_robbery'), 'mi_alley_robbery must be tagged human');

  // Verify that out of 100 mishap rolls, none are human
  for (let i = 0; i < 100; i++) {
    const rolled = rollSeasonMishap(distChar, () => (i % 10) * 0.08);
    if (rolled) {
      assert.equal(humanMishapIds.has(rolled.id), false, `Distortion rolled human mishap: ${rolled.id}`);
    }
  }

  // Distortion-specific mishaps exist
  const distMishaps = MISHAPS.filter((m) => m.distortionOnly);
  assert.equal(distMishaps.length, 3, 'Must have 3 Distortion-specific mishaps');
  const distIds = distMishaps.map((m) => m.id);
  assert.ok(distIds.includes('mi_distort_calcification'));
  assert.ok(distIds.includes('mi_distort_purification'));
  assert.ok(distIds.includes('mi_distort_dissolution'));
});

test('Distortion annual tasks: 6 diverse dilemmas with 0 merit reward', () => {
  const distortTasks = ANNUAL_MERIT_OPPORTUNITIES.filter((t) => t.id.startsWith('m_annual_distort_'));
  assert.equal(distortTasks.length, 6, 'Must have 6 distinct Distortion annual tasks');

  for (const t of distortTasks) {
    assert.deepEqual(t.need?.jobs, ['Distortion'], `${t.id} must require Distortion job`);
    assert.equal(t.allowDistorted, true, `${t.id} must allow Distorted flag`);
    // Verify none of the choices grant merit
    for (const c of t.choices) {
      assert.equal(c.fx?.merit, undefined, `${t.id} choice must not award merit`);
      for (const o of c.out || []) {
        assert.equal(o.fx?.merit, undefined, `${t.id} outcome must not award merit`);
      }
    }
  }
});

test('Century Calamity event at age 100+ offers proactive peaceful ending and Head Claw judgment', () => {
  const climax = DISTORTION_PARITY_MAJORS.find((e) => e.id === 'distort_arc_century_calamity_climax');
  assert.ok(climax, 'distort_arc_century_calamity_climax must exist in DISTORTION_PARITY_MAJORS');
  assert.deepEqual(climax.age, [100, 140], 'Century calamity age must span [100, 140]');

  const centuryDistortChar = {
    alive: true,
    age: 105,
    job: 'Distortion',
    flags: ['Distorted'],
    regionId: 'D23',
    stats: { health: 60, sanity: 60, wealth: 20, rep: 80, heat: 70 },
    resonance: 60,
    seenEvents: [],
    weaver: { pendingThreads: [] }
  };

  assert.equal(isEventEligible(climax, centuryDistortChar), true, 'Century calamity must be eligible at age 105 for Distorted character');

  // Choice 1: Peaceful proactive monument ending
  const choice1 = climax.choices[0];
  assert.equal(choice1.endsLife, true, 'Choice 1 must end life');
  assert.equal(choice1.lifeEnding, 'distort_monument', 'Choice 1 must use distort_monument');
  assert.ok(LIFE_ENDINGS.distort_monument, 'LIFE_ENDINGS.distort_monument must be registered');

  // Choice 2: Head Claw judgment combat
  const choice2 = climax.choices[1];
  assert.equal(choice2.startDungeon, CLAW_DUNGEON_ID, 'Choice 2 must initiate the Head Claw judgment dungeon');

  // Choice 3: Endure as legend
  const choice3 = climax.choices[2];
  assert.ok(choice3.flagsAdd?.includes('distort_arc_century_calamity_done'), 'Choice 3 must flag completion');
});
