import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice, generateFixerContract } from '../src/engine/gameEngine.js';
import {
  getEgoLeap, egoLeapSuccessChance, fixerPromotionSuccessChance, careerPromotionSuccessChance,
  getOtherCareerPromotion, checkColorFixerReadiness, COLOR_FIXER_REQ
} from '../src/engine/careerPipeline.js';
import { isEventEligible } from '../src/engine/weaverAI.js';
import { egoEdge } from '../src/engine/egoEdge.js';
import { weightedOutcomes } from '../src/engine/outcomeOdds.js';
import { rememberResonance, rollEgoEncounter } from '../src/engine/awakeningProgress.js';

console.log('--- RUNNING E.G.O LEAP / EDGE / AWAKENING TESTS ---');

const base = (seed, over = {}) => {
  const c = createNewCharacter({ seed, startAge: 40 });
  c.regionId = 'A';
  c.stats = { ...c.stats, health: 90, sanity: 80, wealth: 40, network: 50, rep: 95 };
  c.flags = (c.flags || []).filter((f) => !['Distorted', 'EGOAwakened', 'IncompleteEGO'].includes(f));
  c.weaver.pendingThreads = [];
  return Object.assign(c, over);
};
const fixer = (grade, flags = [], over = {}) => base(`leap-${grade}`, { job: 'Fixer', fixerGrade: grade, merit: 400, flags: [...flags], ...over });
const byId = (id) => ALL_STORY_EVENTS.find((e) => e.id === id);

console.log('1. The edge is small, and only for a wielder...');
assert.equal(egoEdge(fixer(5)), 0);
assert(egoEdge(fixer(5, ['EGOAwakened'])) > 0 && egoEdge(fixer(5, ['EGOAwakened'])) <= 0.06);
assert(egoEdge(fixer(5, ['IncompleteEGO'])) < egoEdge(fixer(5, ['EGOAwakened'])), 'a volatile E.G.O is worth less');
const plain = fixer(4, [], { stats: { health: 70, sanity: 70, wealth: 40, network: 40, rep: 60 } });
const wield = fixer(4, ['EGOAwakened'], { stats: { health: 70, sanity: 70, wealth: 40, network: 40, rep: 60 } });
assert(fixerPromotionSuccessChance(wield, 3) > fixerPromotionSuccessChance(plain, 3), 'Hana trials favour the wielder');
assert(fixerPromotionSuccessChance(wield, 3) - fixerPromotionSuccessChance(plain, 3) <= 0.06);
const finger = (flags) => base('edge-finger', { job: 'Syndicate', finger: 'Pinky', fingerRank: 0, flags, merit: 120 });
const step = getOtherCareerPromotion(finger([]));
assert(careerPromotionSuccessChance(finger(['EGOAwakened']), step) > careerPromotionSuccessChance(finger([]), step), 'Finger trials too');
assert(generateFixerContract(wield, () => 0.5).approaches[0].successPct >= generateFixerContract(plain, () => 0.5).approaches[0].successPct, 'contracts too');

console.log('2. Merit outcomes lean towards a wielder; deaths and Distortion do not...');
const meritChoice = { outcomes: [
  { w: 50, meritAdd: 20, resultVi: 'Bạn qua.' },
  { w: 50, deathCauseVi: 'Chết', resultVi: 'Bạn ngã.' }
] };
const wOf = (char, idx) => weightedOutcomes(meritChoice, char)[idx].weight;
assert(wOf(wield, 0) > wOf(plain, 0), 'the Merit outcome gains weight');
assert.equal(wOf(wield, 1), wOf(plain, 1) === wOf(wield, 1) ? wOf(plain, 1) : wOf(plain, 1), 'the death outcome is untouched by the tilt');

console.log('3. Only a wielder with the next promotion earned is offered the leap...');
assert.equal(getEgoLeap(fixer(5)), null, 'no E.G.O, no leap');
assert.equal(getEgoLeap(fixer(2, ['EGOAwakened'])), null, 'from Grade 2 the ordinary exam already reaches Grade 1');
assert.equal(getEgoLeap(fixer(5, ['EGOAwakened'], { merit: 0, stats: { health: 90, sanity: 80, wealth: 40, network: 50, rep: 0 } })), null, 'the next promotion must be earned first');
const leap = getEgoLeap(fixer(3, ['EGOAwakened']));
assert.equal(leap.route, 'fixer');
assert.equal(leap.from, 3);
assert.equal(leap.to, 1, 'Grade 3 jumps to Grade 1');
assert.equal(getEgoLeap(fixer(9, ['EGOAwakened'], { merit: 40 })).to, 7);
assert.equal(getEgoLeap(fixer(3, ['EGOAwakened', 'Distorted'])), null);
assert.equal(getEgoLeap(fixer(3, ['EGOAwakened', 'ego_leap_done'])), null, 'once per life');
assert.equal(getEgoLeap(fixer(3, ['EGOAwakened'], { lastEgoLeapAge: 38 })), null, 'cooldown after an attempt');
assert.equal(typeof getEgoLeap(fixer(3, ['EGOAwakened'], { lastEgoLeapAge: 30 })), 'object');

console.log('4. The leap is harder than the exam it skips, and every leap event exists and is gated...');
const w3 = fixer(3, ['EGOAwakened']);
assert(egoLeapSuccessChance(w3, leap) <= fixerPromotionSuccessChance(w3, 2) + 1e-9, 'judged against the band it lands in');
assert(egoLeapSuccessChance(w3, leap) < 0.9, 'it can be failed');
const event = byId(leap.eventId);
assert(event && event.repeatable && event.weight === 0, 'scripted only');
assert.equal(isEventEligible(event, w3, { scripted: true }), true);
assert.equal(isEventEligible(event, fixer(3), { scripted: true }), false, 'no E.G.O, no event');
for (let g = 3; g <= 9; g++) assert(byId(`fixer_ego_leap_g${g}`), `fixer leap from Grade ${g}`);
for (const f of ['thumb', 'index', 'middle', 'ring', 'pinky']) for (const r of [0, 1]) assert(byId(`finger_ego_leap_${f}_r${r}`), `${f} r${r}`);
for (const r of [0, 1]) assert(byId(`wing_ego_leap_r${r}`), `wing r${r}`);

console.log('5. A passed leap moves two Grades, a failed one costs and sets the cooldown...');
const passing = fixer(3, ['EGOAwakened']);
passing.pendingEvent = event;
const promoteIdx = event.choices.findIndex((c) => c.leapPromotion);
const passed = resolveEventChoice(passing, promoteIdx, () => 0);
assert.equal(passed.fixerGrade, 1);
assert(passed.flags.includes('ego_leap_done'));
assert.equal(passed.lastEgoLeapAge, passing.age);
const failing = fixer(3, ['EGOAwakened']);
failing.pendingEvent = event;
const failed = resolveEventChoice(failing, promoteIdx, () => 0.999);
assert.equal(failed.fixerGrade, 3, 'a failed leap does not promote');
assert(!failed.flags.includes('ego_leap_done'));
assert.equal(failed.lastEgoLeapAge, failing.age);
assert(failed.stats.health < failing.stats.health, 'failure costs health');
const deferred = fixer(3, ['EGOAwakened']);
deferred.pendingEvent = event;
const waited = resolveEventChoice(deferred, event.choices.findIndex((c) => !c.leapPromotion), () => 0);
assert.equal(waited.fixerGrade, 3);
assert.equal(waited.lastEgoLeapAge, undefined, 'declining does not start the cooldown');

console.log('6. Finger and Wing ranks jump two as well...');
const pinky = base('pinky-leap', { job: 'Syndicate', finger: 'Pinky', fingerRank: 0, merit: 90, flags: ['EGOAwakened'] });
pinky.stats.rep = 60; pinky.stats.network = 40; pinky.lastFingerPromotionAge = null;
const pl = getEgoLeap(pinky);
assert(pl && pl.route === 'finger' && pl.to === 2, JSON.stringify(pl));
pinky.pendingEvent = byId(pl.eventId);
const pj = resolveEventChoice(pinky, pinky.pendingEvent.choices.findIndex((c) => c.leapPromotion), () => 0);
assert.equal(pj.fingerRank, 2);
const wing = base('wing-leap', { job: 'Wing Employee', wingRank: 0, merit: 90, flags: ['EGOAwakened'] });
wing.stats.wealth = 40; wing.stats.network = 40;
const wl = getEgoLeap(wing);
assert(wl && wl.route === 'wing' && wl.to === 2, JSON.stringify(wl));
wing.pendingEvent = byId(wl.eventId);
assert.equal(resolveEventChoice(wing, wing.pendingEvent.choices.findIndex((c) => c.leapPromotion), () => 0).wingRank, 2);

console.log('7. A wielder at Grade 1 is reviewed for Color sooner, on the same kind of trial...');
const g1 = (flags, over) => fixer(1, flags, { age: 29, merit: 250, stats: { health: 90, sanity: 80, wealth: 40, network: 50, rep: 90 }, ...over });
assert.equal(checkColorFixerReadiness(g1([])).ready, false);
assert.equal(checkColorFixerReadiness(g1(['EGOAwakened'])).ready, true, 'lower merit, rep and age with E.G.O');
assert.equal(checkColorFixerReadiness(g1(['EGOAwakened'], { merit: 200 })).ready, false, 'still has to be earned');
assert.equal(COLOR_FIXER_REQ.merit, 300, 'the ordinary gate is unchanged (backend parity)');

console.log('8. Awakening is harder than before but not out of reach...');
const carmen = byId('ego_carmen_crossroad');
const awakenChance = (char, choiceIdx = 0) => {
  const rows = weightedOutcomes(carmen.choices[choiceIdx], char);
  const total = rows.reduce((s, r) => s + r.weight, 0);
  return rows.filter((r) => r.outcome.flagsAdd?.includes('EGOAwakened')).reduce((s, r) => s + r.weight, 0) / total;
};
const seeker = (res, sp, scars, anchored) => {
  const c = base(`seek-${res}-${sp}`, { job: 'Fixer', fixerGrade: 6, resonance: res, flags: [] });
  c.stats.sanity = sp;
  c.scars = Array.from({ length: scars }, (_, i) => ({ nameVi: `s${i}`, name: `s${i}` }));
  c.npcs = anchored ? { ...c.npcs, friend: { nameVi: 'A', nameEn: 'A', status: 'alive', bond: 70 } } : { ...c.npcs, friend: null, partner: null, spouse: null, mentor: null, child: null };
  return c;
};
const typical = awakenChance(seeker(72, 45, 1, false));
const prepared = awakenChance(seeker(82, 60, 2, true));
const frayed = awakenChance(seeker(64, 20, 0, false));
assert(typical >= 0.3 && typical <= 0.6, `typical ${typical}`);
assert(prepared > typical + 0.1, `preparation helps: ${prepared} vs ${typical}`);
assert(frayed < typical - 0.1, `a frayed mind hurts: ${frayed} vs ${typical}`);
assert(prepared < 0.85, 'even the best prepared are not certain');
assert(frayed > 0.1, 'and even a frayed mind can still make it');

console.log('9. The window opens later and is rolled lower...');
const near = base('window', { job: 'Fixer', fixerGrade: 6, resonance: 72, age: 30, flags: [] });
near.stats.sanity = 60; near.scars = [];
rememberResonance(near);
assert.equal(near.egoOpportunityUntil, undefined, '72 Resonance alone no longer opens the window');
near.resonance = 75;
rememberResonance(near);
assert(Number.isFinite(near.egoOpportunityUntil));
let offered = 0;
for (let i = 0; i < 400; i++) {
  const c = base(`roll-${i}`, { job: 'Fixer', fixerGrade: 6, resonance: 80, age: 30, flags: [], egoOpportunityUntil: 31 });
  c.stats.sanity = 60;
  if (rollEgoEncounter(c, createRngFromIndex(i))) offered++;
}
function createRngFromIndex(i) { let s = (i + 1) * 2654435761 >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
assert(offered / 400 > 0.12 && offered / 400 < 0.32, `first-year offer rate ${offered / 400}`);

console.log('PASS: E.G.O leap / edge / awakening tests');
