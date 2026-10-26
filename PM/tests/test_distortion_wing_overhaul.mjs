import assert from 'node:assert/strict';
import { DISTORTION_OVERHAUL_EVENTS } from '../src/data/eventsDistortionOverhaul.js';
import { WING_OVERHAUL_EVENTS } from '../src/data/eventsWingOverhaul.js';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { getScarProfile } from '../src/engine/scarModel.js';

console.log('Testing Distortion and Wing overhaul events...');

// 1. Basic counts
assert.equal(DISTORTION_OVERHAUL_EVENTS.length, 5, 'Must have 5 Distortion overhaul events');
assert.equal(WING_OVERHAUL_EVENTS.length, 5, 'Must have 5 Wing overhaul events');

const allOverhaulEvents = [...DISTORTION_OVERHAUL_EVENTS, ...WING_OVERHAUL_EVENTS];

// 2. Uniqueness of IDs
const seenIds = new Set();
for (const ev of allOverhaulEvents) {
  assert.ok(ev.id, 'Event must have an id');
  assert.ok(!seenIds.has(ev.id), `Duplicate event id detected: ${ev.id}`);
  seenIds.add(ev.id);
}

// 3. Integration into ALL_STORY_EVENTS
const storyEventMap = new Map(ALL_STORY_EVENTS.map(e => [e.id, e]));
for (const ev of allOverhaulEvents) {
  assert.ok(storyEventMap.has(ev.id), `Event ${ev.id} must be registered in ALL_STORY_EVENTS`);
}

// 4. Bilingual text and structure
for (const ev of allOverhaulEvents) {
  assert.ok(ev.vi && ev.vi.trim().length > 0, `${ev.id} missing Vietnamese prose (vi)`);
  assert.ok(ev.en && ev.en.trim().length > 0, `${ev.id} missing English prose (en)`);
  assert.ok(Array.isArray(ev.choices) && ev.choices.length >= 2, `${ev.id} must offer at least 2 choices`);

  for (const [idx, ch] of ev.choices.entries()) {
    assert.ok(ch.labelVi && ch.labelVi.trim().length > 0, `${ev.id} choice ${idx} missing labelVi`);
    assert.ok(ch.labelEn && ch.labelEn.trim().length > 0, `${ev.id} choice ${idx} missing labelEn`);
    if (!ch.outcomes) {
      assert.ok(ch.resultVi && ch.resultVi.trim().length > 0, `${ev.id} choice ${idx} missing resultVi`);
      assert.ok(ch.resultEn && ch.resultEn.trim().length > 0, `${ev.id} choice ${idx} missing resultEn`);
    }

    // 5. If choice has weighted outcomes, verify sum to 100
    if (ch.outcomes) {
      assert.ok(Array.isArray(ch.outcomes) && ch.outcomes.length >= 2, `${ev.id} choice ${idx} has invalid outcomes array`);
      const weightSum = ch.outcomes.reduce((acc, o) => acc + (o.w || 0), 0);
      assert.equal(weightSum, 100, `${ev.id} choice ${idx} outcome weights must sum to 100 (got ${weightSum})`);

      for (const [outIdx, out] of ch.outcomes.entries()) {
        assert.ok(out.resultVi && out.resultVi.trim().length > 0, `${ev.id} choice ${idx} outcome ${outIdx} missing resultVi`);
        assert.ok(out.resultEn && out.resultEn.trim().length > 0, `${ev.id} choice ${idx} outcome ${outIdx} missing resultEn`);
      }
    }
  }
}

// 6. Check Distortion Requirement Gates
for (const ev of DISTORTION_OVERHAUL_EVENTS) {
  const hasDistortedGate =
    (ev.requires && ev.requires.includes('Distorted')) ||
    (ev.need && (ev.need.status === 'Distorted' || ev.need.flags?.includes('Distorted')));
  assert.ok(hasDistortedGate, `Distortion event ${ev.id} must gate on Distorted flag`);
}

// 7. Check Wing Requirement Gates
for (const ev of WING_OVERHAUL_EVENTS) {
  const hasWingGate =
    (ev.jobs && ev.jobs.includes('Wing Employee')) ||
    (ev.need && ev.need.jobs && ev.need.jobs.includes('Wing Employee'));
  assert.ok(hasWingGate, `Wing event ${ev.id} must gate on Wing Employee`);
}

// 8. Check specific NPC anchors
const partnerEvent = allOverhaulEvents.find(e => e.id === 'distort_npc_partner_confrontation');
assert.ok(partnerEvent?.need?.npc === 'partner', 'Partner confrontation event must require partner NPC');

const rivalEvent = allOverhaulEvents.find(e => e.id === 'distort_npc_rival_predation');
assert.ok(rivalEvent?.need?.npc === 'rival', 'Rival predation event must require rival NPC');

const friendEvent = allOverhaulEvents.find(e => e.id === 'wing_warp_cleanup_dilemma');
assert.ok(friendEvent?.need?.npc === 'friend', 'WARP cleanup dilemma event must require friend NPC');

const coupEvent = allOverhaulEvents.find(e => e.id === 'wing_department_coup_with_rival');
assert.ok(coupEvent?.need?.npc === 'rival', 'Department coup event must require rival NPC');

// 9. Scars classification verification
const scarsToCheck = [
  'tấm khiên quái vật bảo vệ tri kỷ',
  'người dám mở khóa toa tàu warp',
  'vết rạn linh hồn của carmen',
  'ám ảnh toa tàu số 4',
  'vết bỏng điện trường hana'
];

for (const sc of scarsToCheck) {
  const profile = getScarProfile(sc);
  assert.ok(profile && profile.tag, `Scar "${sc}" should classify to a specific profile, got: ${JSON.stringify(profile)}`);
}

// 10. Simulation of resolveEventChoice on overhaul gamble events
import { createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';

// Test Distortion Gamble Simulation
{
  const char = createNewCharacter({ seed: 'test-distort-gamble', startAge: 25 });
  char.flags = ['Distorted'];
  char.alive = true;
  char.pendingEvent = DISTORTION_OVERHAUL_EVENTS.find(e => e.id === 'distort_gamble_carmen_communion');
  assert.ok(char.pendingEvent, 'Carmen communion event exists');

  // RNG returning 0.1 -> should hit first outcome (w: 54)
  const resolvedCharSuccess = resolveEventChoice(char, 0, () => 0.1);
  assert.ok(resolvedCharSuccess.flags.includes('carmen_communion_overhaul_done'), 'Flags should include communion done');
  assert.ok(resolvedCharSuccess.flags.includes('DịThểHoànMỹ'), 'Flags should include perfected distortion');
  assert.ok(resolvedCharSuccess.logs.length > 0, 'Should have logged the outcome');

  // RNG returning 0.9 -> should hit second outcome (w: 46)
  const char2 = createNewCharacter({ seed: 'test-distort-gamble-2', startAge: 25 });
  char2.flags = ['Distorted'];
  char2.alive = true;
  char2.pendingEvent = DISTORTION_OVERHAUL_EVENTS.find(e => e.id === 'distort_gamble_carmen_communion');
  const resolvedCharFail = resolveEventChoice(char2, 0, () => 0.9);
  assert.ok(resolvedCharFail.flags.includes('carmen_communion_overhaul_done'), 'Flags should include communion done on fail branch too');
  assert.ok(resolvedCharFail.scars.includes('Vết rạn linh hồn của Carmen'), 'Scars should include Carmen soul fracture');
}

// Test Wing Blackmail Gamble Simulation
{
  const char = createNewCharacter({ seed: 'test-wing-gamble', startAge: 30 });
  char.job = 'Wing Employee';
  char.wingRank = 1;
  char.alive = true;
  char.pendingEvent = WING_OVERHAUL_EVENTS.find(e => e.id === 'wing_singularity_blackmail_wager');
  assert.ok(char.pendingEvent, 'Wing blackmail event exists');

  // RNG returning 0.1 -> should hit first outcome (w: 52 -> promotion to Section Chief rank 2)
  const resolvedWin = resolveEventChoice(char, 0, () => 0.1);
  assert.equal(resolvedWin.wingRank, 2, 'Winning outcome should elevate to rank 2');
  assert.ok(resolvedWin.flags.includes('FeatherNắmThópCorp'), 'Winning outcome grants leverage flag');

  // RNG returning 0.9 -> should hit second outcome (w: 48 -> demoted)
  const char2 = createNewCharacter({ seed: 'test-wing-gamble-2', startAge: 30 });
  char2.job = 'Wing Employee';
  char2.wingRank = 1;
  char2.alive = true;
  char2.pendingEvent = WING_OVERHAUL_EVENTS.find(e => e.id === 'wing_singularity_blackmail_wager');
  const resolvedLoss = resolveEventChoice(char2, 0, () => 0.9);
  assert.ok(resolvedLoss.flags.includes('wing_singularity_blackmail_done'), 'Losing outcome sets done flag');
}

console.log('Distortion and Wing overhaul event tests passed successfully!');
