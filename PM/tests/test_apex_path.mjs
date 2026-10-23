import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice, buildLifeSummaryAndLegacy } from '../src/engine/gameEngine.js';
import { LIFE_MINORS } from '../src/engine/yearPlanner.js';
import { ANNUAL_MERIT_OPPORTUNITIES } from '../src/data/annualMeritOpportunities.js';
import { APEX_TWILIGHT_EVENTS, apexLongevityEventId } from '../src/data/eventsApexTwilight.js';
import { LIFE_ENDINGS } from '../src/data/lifeEndings.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { freshness } from '../src/engine/variance.js';
import { agingLoss, healAmount } from '../src/engine/economyModel.js';
import { createRNG } from '../src/engine/gameEngine.js';

console.log('--- RUNNING APEX PATH TESTS ---');

const color = (seed, over = {}) => {
  const c = createNewCharacter({ seed, startAge: 60 });
  c.regionId = 'K';
  c.job = 'Fixer'; c.fixerGrade = 0; c.customTitle = 'Ochre Spire';
  c.flags = [...(c.flags || []).filter((f) => !['Distorted'].includes(f)), 'ColorFixer'];
  c.stats = { ...c.stats, health: 90, sanity: 80, wealth: 60, network: 60, rep: 90 };
  c.weaver.pendingThreads = [];
  return Object.assign(c, over);
};
const head = (finger, seed, over = {}) => {
  const c = createNewCharacter({ seed, startAge: 60 });
  c.regionId = 'K';
  c.job = 'Syndicate'; c.finger = finger; c.fingerRank = 3;
  c.flags = (c.flags || []).filter((f) => f !== 'Distorted');
  c.stats = { ...c.stats, health: 90, sanity: 80, wealth: 60, network: 60, rep: 90 };
  c.weaver.pendingThreads = [];
  return Object.assign(c, over);
};
const byId = (id) => ALL_STORY_EVENTS.find((e) => e.id === id);

console.log('1. The pool is large and every apex entry is well formed...');
assert(LIFE_MINORS.length + ALL_STORY_EVENTS.length > 1000, 'over a thousand events in all');
const ids = ANNUAL_MERIT_OPPORTUNITIES.map((e) => e.id);
assert.equal(new Set(ids).size, ids.length, 'no duplicate commission ids');
for (const e of ANNUAL_MERIT_OPPORTUNITIES.filter((x) => x.tags?.includes('apex'))) {
  assert(e.vi && e.en && e.choices.length === 2 && e.ignore, `${e.id} is complete`);
  assert(!/\{[A-Za-z]+\}/.test(`${e.vi}${e.en}${JSON.stringify(e.choices)}`), `${e.id} has no unfilled placeholder`);
  assert((e.choices[0].fx.merit || 0) > 0 && (e.choices[1].out[0].fx.merit || 0) > 0, `${e.id} earns Merit`);
  assert(e.choices[1].out[0].fx.rep > 0, `${e.id} raises standing on a good outcome`);
}

console.log('2. One life at the top does not repeat a commission until the whole set is spent...');
const draw = (char, years, seed) => {
  const rng = createRNG(seed);
  const seen = {}; const recent = []; const played = [];
  for (let y = 0; y < years; y++) {
    const pool = ANNUAL_MERIT_OPPORTUNITIES.filter((e) => matchesEventContext(e, char));
    const weights = pool.map((e) => freshness(e.id, recent, seen));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = rng() * total; let pick = pool[pool.length - 1];
    for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) { pick = pool[i]; break; } }
    played.push(pick.id); seen[pick.id] = (seen[pick.id] || 0) + 1; recent.push(pick.id);
  }
  return { played, pool: ANNUAL_MERIT_OPPORTUNITIES.filter((e) => matchesEventContext(e, char)).length };
};
const poolOf = [['Color', color('apex-pool')], ...['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'].map((f) => [f, head(f, `apex-pool-${f}`)])];
for (const [name, char] of poolOf) {
  const { played, pool } = draw(char, 55, `draw-${name}`);
  const distinct = new Set(played).size;
  console.log(`   ${name}: pool ${pool}, 55 years, ${distinct} distinct`);
  assert(pool >= 56, `${name} has a deep enough pool`);
  assert(distinct >= Math.min(55, pool) - 2, `${name} barely repeats across a 55-year stay at the top`);
  assert(!played.some((id) => id.startsWith('m_annual_')), `${name} no longer draws the commissions meant for climbers`);
}

console.log('3. The offer of a long life is scheduled for the apex, and it moves the body...');
assert.equal(apexLongevityEventId(color('lg-1')), 'apex_longevity_color');
assert.equal(apexLongevityEventId(head('Ring', 'lg-2')), 'apex_longevity_ring');
assert.equal(apexLongevityEventId({ ...head('Ring', 'lg-3'), fingerRank: 2 }), null);
const offer = color('lg-4', { age: 45 });
assert(matchesEventContext(byId('apex_longevity_color'), offer));
const taken = resolveEventChoice({ ...offer, pendingEvent: { eventId: 'apex_longevity_color', ...byId('apex_longevity_color') } }, 0, () => 0);
const tc = taken.char || taken;
assert(tc.flags.includes('ApexLongevity') && tc.flags.includes('apex_longevity_done'), 'accepting grants the flag');
const lifespan = (flags, regionId) => {
  const c = { age: 50, regionId, flags, stats: { health: 85 }, npcs: {} };
  while (c.stats.health > 0 && c.age < 200) {
    c.stats.health = Math.min(100, c.stats.health - agingLoss(c));
    if (c.stats.health > 0) c.stats.health = Math.min(100, c.stats.health + healAmount(c, 'natural'));
    c.age++;
  }
  return c.age;
};
const withCare = lifespan(['ApexLongevity'], 'K');
const without = lifespan([], 'K');
console.log(`   District K: ${without} ordinary, ${withCare} with the City's care`);
assert(withCare >= 105 && withCare <= 135, 'about a hundred and twenty');
assert(without < 95, 'an ordinary life stays where it was');

console.log('4. Every ending names a real entry and closes the life in its own way...');
const endingIds = [];
const walk = (event, char, idx) => {
  const c = { ...char, pendingEvent: { eventId: event.id, ...event } };
  return resolveEventChoice(c, idx, () => 0);
};
for (const event of APEX_TWILIGHT_EVENTS.filter((e) => !e.id.startsWith('apex_longevity'))) {
  const isColor = event.jobs.includes('Fixer');
  const finger = event.finger || 'Thumb';
  const base = isColor ? color(`end-${event.id}`, { age: 100 }) : head(finger, `end-${event.id}`, { age: 100 });
  base.flags.push('ApexLongevity');
  if (event.need?.npc) base.npcs = { ...base.npcs, [event.need.npc]: { role: event.need.npc, name: 'Aru', nameVi: 'Aru', nameEn: 'Aru', bond: 70, alive: true, status: 'alive' } };
  assert(matchesEventContext(event, base), `${event.id} can come up for the apex at a hundred`);
  assert(!matchesEventContext(event, { ...base, age: 60 }), `${event.id} waits for old age`);
  event.choices.forEach((choice, idx) => {
    const outs = choice.outcomes || [choice];
    outs.forEach((o) => {
      if (!o.endsLife && !o.deathCauseVi) return;
      assert(LIFE_ENDINGS[o.lifeEnding], `${event.id} names a known ending`);
      assert(o.deathCauseVi && o.deathCauseEn, `${event.id} says how it ended`);
      endingIds.push(o.lifeEnding);
    });
  });
}
for (const key of ['wander', 'retired', 'usurped', 'last_bout', 'purged']) assert(endingIds.includes(key), `the ending ${key} can be reached`);

const road = byId('color_long_road');
const wanderer = resolveEventChoice({ ...color('road', { age: 100, flags: [...color('road').flags, 'ApexLongevity'] }), pendingEvent: { eventId: road.id, ...road } }, 0, () => 0);
const wc = wanderer.char || wanderer;
assert.equal(wc.alive, false);
assert.equal(wc.lifeEnding, 'wander');
assert(wc.stats.health > 0, 'a wanderer is not a corpse');
const sum = buildLifeSummaryAndLegacy(wc);
assert.equal(sum.lifeEnding, 'wander');
assert.equal(sum.endingId, null, 'a chosen ending does not lock inheritance');
assert.match(sum.lifeStoryParagraphsEn.at(-1), /side gate/);
assert.equal(sum.poeticQuoteEn, LIFE_ENDINGS.wander.quoteEn);

const bedside = buildLifeSummaryAndLegacy({ ...wc, lifeEnding: null, age: 118, deathCauseVi: 'Ra đi vì tuổi già', deathCauseEn: 'Passed of old age' });
assert.equal(bedside.poeticQuoteEn, LIFE_ENDINGS.ripe_age.quoteEn, 'a natural death at the top reads differently');

const usurp = byId('finger_usurped_thumb');
const knifed = resolveEventChoice({ ...head('Thumb', 'knife', { age: 100, flags: [...head('Thumb', 'knife').flags, 'ApexLongevity'] }), pendingEvent: { eventId: usurp.id, ...usurp } }, 1, () => 0);
const kc = knifed.char || knifed;
assert.equal(kc.alive, false);
assert.equal(kc.lifeEnding, 'usurped');

const handed = resolveEventChoice({ ...head('Middle', 'handed', { age: 100, flags: [...head('Middle', 'handed').flags, 'ApexLongevity'] }), pendingEvent: { eventId: 'finger_usurped_middle', ...byId('finger_usurped_middle') } }, 2, () => 0);
assert.equal((handed.char || handed).lifeEnding, 'retired');

const refuse = resolveEventChoice({ ...color('stay', { age: 100, flags: [...color('stay').flags, 'ApexLongevity'] }), pendingEvent: { eventId: road.id, ...road } }, 1, () => 0);
assert.equal((refuse.char || refuse).alive, true, 'staying keeps the story going');

console.log('Apex path: deep non-repeating pool, long life by event, five distinct endings and the epitaph for each.');
