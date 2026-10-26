import assert from 'node:assert/strict';
import { createNewCharacter, ALL_STORY_EVENTS, resolveEventChoice } from '../src/engine/gameEngine.js';
import { LINEAGE_LEGACY_EVENTS } from '../src/data/eventsLineageLegacy.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { audioEngine } from '../src/engine/audioEngine.js';

console.log('--- Testing Generational Lineage & Legacy Narrative System ---');

// 1. Structure & Registration
assert.equal(LINEAGE_LEGACY_EVENTS.length, 3, 'Expected 3 adult lineage legacy events');

for (const event of LINEAGE_LEGACY_EVENTS) {
  assert.ok(event.id, 'Event must have an id');
  assert.ok(event.vi && event.en, `Event ${event.id} must be bilingual`);
  assert.ok(Array.isArray(event.choices) && event.choices.length >= 2, `Event ${event.id} must have at least 2 choices`);
  for (const choice of event.choices) {
    assert.ok(choice.labelVi && choice.labelEn, `Choice in ${event.id} must have bilingual labels`);
    assert.ok(choice.resultVi && choice.resultEn, `Choice in ${event.id} must have bilingual results`);
  }
  assert.ok(
    ALL_STORY_EVENTS.some((e) => e.id === event.id),
    `Event ${event.id} must be registered in ALL_STORY_EVENTS`
  );
}

// 2. Requirement Gating
const vendettaEvent = LINEAGE_LEGACY_EVENTS.find((e) => e.id === 'm_lineage_vendetta_confrontation');
const patronageEvent = LINEAGE_LEGACY_EVENTS.find((e) => e.id === 'm_lineage_sworn_patronage');
const resonanceEvent = LINEAGE_LEGACY_EVENTS.find((e) => e.id === 'm_lineage_relic_resonance');

const charVendetta = createNewCharacter({ seed: 'test-vendetta-char', startAge: 25 });
charVendetta.flags.push('NợMáuĐờiTrước', 'HuyếtThốngKếThừa');
charVendetta.lineage = { parentName: 'Gale', relic: 'Vết Răng Sắt' };

assert.equal(matchesEventContext(vendettaEvent, charVendetta), true, 'Char with NợMáuĐờiTrước should match vendetta event');
assert.equal(matchesEventContext(patronageEvent, charVendetta), false, 'Char with NợMáuĐờiTrước must be forbidden from sworn patronage');
assert.equal(matchesEventContext(resonanceEvent, charVendetta), true, 'Char with HuyếtThốngKếThừa should match relic resonance');

const charPeacefulHeir = createNewCharacter({ seed: 'test-peaceful-heir', startAge: 24 });
charPeacefulHeir.flags.push('HuyếtThốngKếThừa');
charPeacefulHeir.lineage = { parentName: 'Elena', relic: 'Chuông Đen' };

assert.equal(matchesEventContext(vendettaEvent, charPeacefulHeir), false, 'Char without NợMáuĐờiTrước should NOT match vendetta event');
assert.equal(matchesEventContext(patronageEvent, charPeacefulHeir), true, 'Char with HuyếtThốngKếThừa and no vendetta should match patronage event');
assert.equal(matchesEventContext(resonanceEvent, charPeacefulHeir), true, 'Char with HuyếtThốngKếThừa should match relic resonance');

// 3. Choice Execution & Flag Removal
const duelChar = createNewCharacter({ seed: 'test-duel', startAge: 26 });
duelChar.flags.push('NợMáuĐờiTrước', 'HuyếtThốngKếThừa');
duelChar.lineage = { parentName: 'Gale', relic: 'Vết Răng Sắt' };
duelChar.pendingEvent = vendettaEvent;

const afterDuel = resolveEventChoice(duelChar, 0, () => 0.5);
assert.ok(!afterDuel.flags.includes('NợMáuĐờiTrước'), 'Selecting duel option should remove NợMáuĐờiTrước flag');
assert.ok(afterDuel.scars.includes('Chiến tích xóa tên khỏi Sổ Thù'), 'Selecting duel option should add scar');

// 4. Audio Engine SFX Volume & Mixer Controls
console.log('--- Testing Audio Engine Mixer Enhancements ---');
let notifiedState = null;
const unsub = audioEngine.subscribe((st) => {
  notifiedState = st;
});

audioEngine.setSfxVolume(0.65);
assert.equal(audioEngine.sfxVolume, 0.65, 'audioEngine.sfxVolume should be 0.65');
assert.equal(notifiedState?.sfxVolume, 0.65, 'audioEngine subscribers should receive sfxVolume');

audioEngine.setSfxVolume(1.8);
assert.equal(audioEngine.sfxVolume, 1, 'setSfxVolume should clamp above 1 to 1');

audioEngine.setSfxVolume(-0.5);
assert.equal(audioEngine.sfxVolume, 0, 'setSfxVolume should clamp below 0 to 0');

unsub();
console.log('All lineage legacy and audio mixer tests passed successfully!');
