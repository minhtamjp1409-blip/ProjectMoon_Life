import { activeScarCount } from './scarModel.js';

export function rememberResonance(char, gain = 0) {
  if (gain > 0) char.lastResonanceGainAge = char.age;
  char.resonancePeak = Math.max(char.resonancePeak || 0, char.resonance || 0);
  const scars = activeScarCount(char);
  const ready = char.age >= 18 && ((char.resonance || 0) >= 74 ||
    ((char.resonance || 0) >= 62 && ((scars >= 1 && char.stats.sanity <= 38) || (scars >= 2 && char.stats.sanity <= 45))));
  if (ready && !char.flags?.some(f => ['EGOAwakened', 'Distorted'].includes(f)) && !char.seenEvents?.includes('ego_carmen_crossroad')) {
    if (!hasEgoOpportunity(char)) char.egoOpportunityUntil = char.age + 3;
  }
}

export function hasEgoOpportunity(char) {
  return char.age >= 18 && Number.isFinite(char.egoOpportunityUntil) && char.age <= char.egoOpportunityUntil;
}

export function rollEgoEncounter(char, rng) {
  if (char.age < 18 || char.flags?.some(f => ['EGOAwakened', 'Distorted'].includes(f)) ||
      char.seenEvents?.includes('ego_carmen_crossroad')) return false;
  rememberResonance(char);
  if (!hasEgoOpportunity(char) && char.stats.sanity > 12) return false;
  if (char.egoEncounterRollAge !== char.age) {
    const elapsed = hasEgoOpportunity(char) ? Math.max(0, char.age - (char.egoOpportunityUntil - 3)) : 0;
    char.egoEncounterRollAge = char.age;
    char.egoEncounterOffered = rng() < Math.min(0.5, 0.24 + elapsed * 0.14);
  }
  return char.egoEncounterOffered === true;
}

export function colorTrialAvailable(char) {
  return !char.flags?.some(f => ['ColorFixer', 'Distorted', 'ColorRefused'].includes(f)) &&
    (!char.seenEvents?.includes('hana_color_ascension_trial') ||
      (!Number.isFinite(char.lastColorTrialAge) || char.age >= char.lastColorTrialAge + 3));
}
