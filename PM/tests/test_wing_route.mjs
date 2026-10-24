import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, createRNG, resolveEventChoice } from '../src/engine/gameEngine.js';
import { LIFE_MINORS, planYear, resolveMinor } from '../src/engine/yearPlanner.js';
import { CAREER_REQUESTS } from '../src/data/careerContractTemplates.js';
import { WING_LADDER_PROMOTIONS, careerTrialForEvent, getNextWingPromotion } from '../src/engine/careerPipeline.js';
import { WING_PROMO_EXTRA } from '../src/data/eventsWingPromo.js';
import { WING_STORY_EVENTS } from '../src/data/eventsWing.js';
import { WING_APEX_EVENTS } from '../src/data/eventsWingApex.js';
import { LIFE_ENDINGS } from '../src/data/lifeEndings.js';
import { apexLongevityEventId } from '../src/data/eventsApexTwilight.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { isEventEligible } from '../src/engine/weaverAI.js';

const byId = new Map(ALL_STORY_EVENTS.map((e) => [e.id, e]));
const wing = (seed, rank, age, extra = {}) => {
  const c = createNewCharacter({ seed, startAge: age });
  c.regionId = 'K'; c.alive = true; c.job = 'Wing Employee'; c.wingRank = rank;
  c.flags = [...(c.flags || []).filter((f) => f !== 'Distorted'), 'Feather', 'Nest'];
  c.stats = { ...c.stats, health: 90, sanity: 80, wealth: 60, network: 60, rep: 80 };
  c.weaver = { ...(c.weaver || {}), pendingThreads: [] };
  return Object.assign(c, extra);
};

console.log('1. Every rung names scenes that exist, four a rung, and each is recognised as that rung\'s trial...');
for (const step of WING_LADDER_PROMOTIONS) {
  assert.equal(step.eventIds.length, 4, `rank ${step.rank} has four trial scenes`);
  for (const id of step.eventIds) {
    assert(byId.has(id), `${id} exists`);
    assert.equal(careerTrialForEvent(id)?.rank, step.rank, `${id} resolves to rank ${step.rank}`);
    const event = byId.get(id);
    assert(event.choices.some((c) => c.setWingRank === step.rank), `${id} can grant rank ${step.rank}`);
    if (WING_PROMO_EXTRA.some((e) => e.id === id)) assert(event.choices.some((c) => c.setWingRank == null), `${id} has a way to wait`);
  }
}

console.log('2. Each rank has enough Wing-only work to play, and contracts match the other routes...');
const wingOnly = (e) => (e.jobs || e.need?.jobs || []).includes('Wing Employee');
for (const [rank, age] of [[0, 30], [1, 36], [2, 46], [3, 60]]) {
  const c = wing(`cov-${rank}`, rank, age, { flags: ['Feather', 'Nest', 'ApexLongevity'] });
  const majors = ALL_STORY_EVENTS.filter((e) => wingOnly(e) && isEventEligible(e, c)).length;
  const minors = LIFE_MINORS.filter((e) => wingOnly(e) && matchesEventContext(e, c)).length;
  console.log(`   rank ${rank}: ${majors} Wing majors, ${minors} Wing minors`);
  assert(majors >= 25, `rank ${rank} has at least 25 Wing majors`);
  assert(minors >= 18, `rank ${rank} has at least 18 Wing minors`);
}
assert(CAREER_REQUESTS.wing.length >= 36, 'Wing has as many contracts as a Finger');
for (let tier = 0; tier <= 5; tier++) assert(CAREER_REQUESTS.wing.filter((r) => r.tier === tier).length >= 6, `six or more contracts at tier ${tier}`);
assert.equal(new Set(CAREER_REQUESTS.wing.map((r) => r.id)).size, CAREER_REQUESTS.wing.length, 'contract ids are unique');

console.log('3. Standing starts clean, leverage starts empty, both move and stay inside 0 to 100...');
const fresh = wing('gauge-1', 1, 36);
assert.equal(fresh.standing ?? 50, 50);
const desk = byId.get('wing_desk_stock_gap');
assert(matchesEventContext(desk, fresh) || isEventEligible(desk, fresh), 'a desk scene comes up for a Feather');
const quiet = resolveEventChoice({ ...fresh, pendingEvent: { eventId: desk.id, ...desk } }, 1, () => 0);
const qc = quiet.char || quiet;
assert(qc.leverage > 0 && qc.standing < 50, 'keeping a copy raises leverage and costs standing');
const clean = resolveEventChoice({ ...fresh, pendingEvent: { eventId: desk.id, ...desk } }, 0, () => 0);
assert((clean.char || clean).standing > 50, 'the plain report raises standing');
const pinned = resolveEventChoice({ ...wing('gauge-2', 1, 36, { standing: 98, leverage: 99 }), pendingEvent: { eventId: desk.id, ...desk } }, 0, () => 0);
assert((pinned.char || pinned).standing <= 100, 'standing is capped at 100');
const floor = resolveEventChoice({ ...wing('gauge-3', 1, 36, { standing: 2 }), pendingEvent: { eventId: 'wing_desk_policy_vote', ...byId.get('wing_desk_policy_vote') } }, 1, () => 0);
assert((floor.char || floor).standing >= 0, 'standing is floored at 0');
const minor = LIFE_MINORS.find((m) => m.id === 'm_wing_second_signature');
const m0 = wing('gauge-4', 0, 25, { pendingMinor: { id: minor.id, t: 0.3 } });
const m1 = resolveMinor(m0, 1, createRNG('gauge-4'));
assert(m1.leverage > 0, 'a minor can move leverage');

console.log('4. Leverage held for years costs standing, and a low standing brings the list to your door...');
const heavy = wing('gauge-5', 2, 45, { leverage: 80, standing: 40 });
assert(!matchesEventContext(byId.get('wing_desk_name_on_list'), heavy), 'a healthy standing is not put on the list');
const exposed = wing('gauge-6', 2, 45, { standing: 12 });
assert(isEventEligible(byId.get('wing_desk_name_on_list'), exposed) || matchesEventContext(byId.get('wing_desk_name_on_list'), exposed), 'a low standing is');
assert(!matchesEventContext(byId.get('wing_desk_name_on_list'), wing('gauge-7', 0, 25, { standing: 12 })), 'an intern is not yet on that list');
const gated = byId.get('wing_desk_eviction_list').choices.find((c) => c.need?.stat?.leverage);
assert(gated, 'one answer needs leverage');
assert(!WING_STORY_EVENTS.some((e) => e.choices.some((c) => c.need?.stat?.leverage) && !e.choices.some((c) => !c.need)), 'a gated answer never stands alone');

console.log('5. The top of the ladder has a longevity offer, three endings of its own, and a way to carry on...');
assert.equal(apexLongevityEventId(wing('top-1', 3, 50)), 'apex_longevity_wing');
assert.equal(apexLongevityEventId(wing('top-2', 2, 50)), null);
assert(byId.has('apex_longevity_wing'));
const endings = new Set();
for (const event of WING_APEX_EVENTS.filter((e) => !e.id.startsWith('apex_longevity'))) {
  const base = wing(`end-${event.id}`, 3, 100, { standing: 20, leverage: 60 });
  base.flags.push('ApexLongevity');
  if (event.need?.npc) base.npcs = { ...base.npcs, [event.need.npc]: { role: event.need.npc, name: 'Aru', nameVi: 'Aru', nameEn: 'Aru', bond: 70, alive: true, status: 'alive' } };
  assert(matchesEventContext(event, base), `${event.id} can come up for the top of the Wing at a hundred`);
  assert(!matchesEventContext(event, { ...base, age: 40 }) || !event.requires, `${event.id} waits for old age when it ends a life`);
  event.choices.forEach((choice, idx) => {
    if (choice.endsLife) {
      assert(LIFE_ENDINGS[choice.lifeEnding], `${event.id} names a real ending`);
      endings.add(choice.lifeEnding);
      const r = resolveEventChoice({ ...base, pendingEvent: { eventId: event.id, ...event } }, idx, () => 0);
      assert.equal((r.char || r).alive, false, `${event.id} closes the life`);
      assert.equal((r.char || r).lifeEnding, choice.lifeEnding);
    } else {
      const r = resolveEventChoice({ ...base, pendingEvent: { eventId: event.id, ...event } }, idx, () => 0);
      assert.equal((r.char || r).alive, true, `${event.id} lets the life go on`);
    }
  });
}
for (const key of ['sealed_seat', 'struck_roll', 'walked_out']) assert(endings.has(key), `the Wing has the ${key} ending`);

console.log('6. A Wing life runs many years without error and the gauges stay in range...');
let ticks = 0;
for (let i = 0; i < 40; i++) {
  let c = wing(`life-${i}`, i % 4, 28 + (i % 4) * 8);
  for (let year = 0; year < 12 && c.alive; year++) {
    c = { ...c, pendingLead: null };
    planYear(c, createRNG(`${c.seed}:${year}`));
    c.age += 1; ticks++;
    assert((c.standing ?? 50) >= 0 && (c.standing ?? 50) <= 100 && (c.leverage || 0) >= 0 && (c.leverage || 0) <= 100);
  }
}
assert(getNextWingPromotion(wing('promo-1', 0, 30, { merit: 200 }))?.currentStanding === 50);
console.log(`Wing route: ladder, coverage, gauges, apex endings and ${ticks} planned years passed.`);
