/**
 * Project Moon - City Blackboard Runtime System
 * Acts as the centralized shared memory for the AI Director, tracking global city states,
 * regional crisis levels, Carmen's resonance, and the Arbiter's surveillance.
 */

export function createCityBlackboard(char) {
  const regionId = char.regionId || 'Backstreets';
  const heat = char.heat || 0;
  const taboo = char.taboo || 0;
  const sanity = char.stats?.sanity ?? 50;
  const resonance = char.resonance || 0;

  // Derive City Threat Tier for current character
  let threatTier = 'Canard';
  if (char.flags?.includes('ColorFixer') || char.flags?.includes('EGOAwakened') || (char.merit || 0) >= 200) {
    threatTier = 'Star of the City';
  } else if ((char.fixerGrade || 9) <= 2 || (char.fingerRank || 0) >= 2) {
    threatTier = 'Urban Nightmare';
  } else if ((char.fixerGrade || 9) <= 5 || (char.merit || 0) >= 80) {
    threatTier = 'Urban Plague';
  } else if ((char.merit || 0) >= 30) {
    threatTier = 'Urban Legend';
  } else if ((char.merit || 0) >= 10) {
    threatTier = 'Urban Myth';
  }

  // Head Scrutiny Index (0 to 100)
  const headScrutiny = Math.min(100, taboo * 30 + Math.floor(heat * 0.4) + (char.flags?.includes('Distorted') ? 40 : 0));

  // Carmen's Whispering Resonance (0 to 100)
  const carmenWhispers = Math.min(100, Math.max(0, (100 - sanity) * 0.6 + resonance * 0.4));

  // Backstreets Chaos Index
  const districtChaos = Math.min(100, Math.floor(heat * 0.6) + (regionId === 'Backstreets' ? 25 : 10));

  return {
    threatTier,
    headScrutiny,
    carmenWhispers,
    districtChaos,
    isSweeperCurfew: false, // 3:13 AM to 4:34 AM active during specific ticks
    activeSyndicateWar: (char.motifs?.violence || 0) >= 3,
    causalKarmaDebt: Math.min(4, (char.scars || []).length) * 15 + (char.flags || []).filter(f => f.includes('Debt') || f.includes('Kurokumo') || f.includes('Vengeance')).length * 25
  };
}
