import { matchesNeed } from './eventConditions.js';
import { tiltWeight, traitsOf } from './variance.js';

export function weightedOutcomes(choice, char, kind = 'major') {
  const outcomes = choice?.outcomes || choice?.out || [];
  if (!Array.isArray(outcomes)) return [];
  return outcomes.flatMap((outcome) => {
    if (kind === 'major' && (!matchesNeed(outcome.need, char) || (outcome.w ?? 50) <= 0)) return [];
    let weight = outcome.w ?? (kind === 'minor' ? 1 : 50);
    if (kind === 'major') {
      const result = outcome.resultVi || outcome.rvi || '';
      if (char.flags?.includes('ShinAwakened') &&
          (result.includes('đứng') || result.includes('thắng') || result.includes('sống') || !outcome.deathCauseVi)) {
        weight = Math.round(weight * 1.35);
      }
      if (char.flags?.includes('Distorted') &&
          ((outcome.effects?.sanity || 0) < 0 || (outcome.effects?.rep || 0) > 0)) {
        weight = Math.round(weight * 1.4);
      }
    }
    const adjusted = Math.max(0, tiltWeight(weight, outcome.effects || outcome.fx, traitsOf(char)));
    return adjusted > 0 ? [{ outcome, weight: adjusted }] : [];
  });
}
