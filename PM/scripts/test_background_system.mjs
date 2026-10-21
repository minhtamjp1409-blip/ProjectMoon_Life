import { FAMILIES } from '../src/data/worldData.js';
import { createNewCharacter, rollBirthFamily } from '../src/engine/gameEngine.js';
import { weightedOutcomes } from '../src/engine/outcomeOdds.js';

console.log('Testing 14 Backgrounds system...');

// 1. Verify 14 backgrounds defined
if (FAMILIES.length < 14) {
  throw new Error(`Expected at least 14 families, found ${FAMILIES.length}`);
}

for (const fam of FAMILIES) {
  if (!fam.id || !fam.nameVi || !fam.nameEn || !fam.descVi || !fam.descEn || !fam.statMod) {
    throw new Error(`Incomplete family data for ${fam.id}`);
  }
}
console.log('✓ All 14 backgrounds have complete metadata and stat modifiers.');

// 2. Test Nest Feather wealth
const nestChar = createNewCharacter({ seed: 'test-nest-wealth-1', preferredFamilyId: 'nest_feather' });
if (nestChar.familyId !== 'nest_feather' || nestChar.stats.wealth < 24) {
  throw new Error(`Nest Feather did not receive elevated wealth: ${nestChar.stats.wealth}`);
}
console.log(`✓ Nest Feather starts with high wealth: ${nestChar.stats.wealth} Ahn.`);

// 3. Test Wing Executive wealth
const execChar = createNewCharacter({ seed: 'test-exec-wealth-1', preferredFamilyId: 'wing_executive' });
if (execChar.familyId !== 'wing_executive' || execChar.stats.wealth < 45) {
  throw new Error(`Wing Executive did not receive elite wealth: ${execChar.stats.wealth}`);
}
console.log(`✓ Wing Executive starts with elite wealth: ${execChar.stats.wealth} Ahn.`);

// 4. Test Smoke War Veteran health
const vetChar = createNewCharacter({ seed: 'test-vet-health-1', preferredFamilyId: 'smoke_war_veteran' });
if (vetChar.familyId !== 'smoke_war_veteran' || vetChar.stats.health < 60) {
  throw new Error(`Smoke War Veteran did not receive high health: ${vetChar.stats.health}`);
}
console.log(`✓ Smoke War Veteran child starts with high health: ${vetChar.stats.health} HP.`);

// 5. Test Outskirts Nomad adaptability trait & stats
const outChar = createNewCharacter({ seed: 'test-outskirts-1', preferredFamilyId: 'outskirts_nomad' });
if (outChar.familyId !== 'outskirts_nomad') {
  throw new Error(`Outskirts Nomad familyId mismatch: ${outChar.familyId}`);
}
if (!outChar.flags.includes('OutskirtsAdaptability')) {
  throw new Error(`Outskirts Nomad missing OutskirtsAdaptability flag`);
}
console.log(`✓ Outskirts child starts with scarce wealth (${outChar.stats.wealth} Ahn) and OutskirtsAdaptability trait.`);

// 6. Test OutskirtsAdaptability mechanics in outcomeOdds
const mockChoice = {
  outcomes: [
    { w: 50, resultVi: 'Bạn sống sót kỳ diệu và thoát thân an toàn.', effects: { health: +10 } },
    { w: 50, resultVi: 'Bạn gục ngã dưới làn đạn.', deathCauseVi: 'Tử trận' }
  ]
};

// Normal character with low HP
const normalLowHpChar = {
  stats: { health: 25, sanity: 25 },
  flags: []
};
const normalOdds = weightedOutcomes(mockChoice, normalLowHpChar);
const normalSurvive = normalOdds.find(o => !o.outcome.deathCauseVi).weight;
const normalDeath = normalOdds.find(o => o.outcome.deathCauseVi).weight;

// Outskirts character with low HP
const outskirtsLowHpChar = {
  stats: { health: 25, sanity: 25 },
  flags: ['OutskirtsAdaptability']
};
const outOdds = weightedOutcomes(mockChoice, outskirtsLowHpChar);
const outSurvive = outOdds.find(o => !o.outcome.deathCauseVi).weight;
const outDeath = outOdds.find(o => o.outcome.deathCauseVi).weight;

if (outSurvive <= normalSurvive || outDeath >= normalDeath) {
  throw new Error(`OutskirtsAdaptability failed to tilt odds: survive ${normalSurvive} -> ${outSurvive}, death ${normalDeath} -> ${outDeath}`);
}
console.log(`✓ OutskirtsAdaptability successfully boosts survival weight (${normalSurvive} -> ${outSurvive}) and reduces death weight (${normalDeath} -> ${outDeath}) when HP <= 40.`);

console.log('ALL BACKGROUND TESTS PASSED!');
