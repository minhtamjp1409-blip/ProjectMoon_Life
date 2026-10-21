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
      if (char.flags?.includes('OutskirtsAdaptability') &&
          ((char.stats?.health ?? char.health ?? 50) <= 40 || (char.stats?.sanity ?? char.sanity ?? 50) <= 40)) {
        if (!outcome.deathCauseVi && (result.includes('sống') || result.includes('thoát') || result.includes('né') || (outcome.effects?.health || 0) > 0 || (outcome.effects?.sanity || 0) > 0)) {
          weight = Math.round(weight * 1.35);
        } else if (outcome.deathCauseVi) {
          weight = Math.max(1, Math.round(weight * 0.4));
        }
      }
      if (char.flags?.includes('SmokeWarInstinct') &&
          (result.includes('chiến') || result.includes('thắng') || result.includes('đánh') || result.includes('chém') || result.includes('súng'))) {
        weight = Math.round(weight * 1.25);
      }
      if (char.flags?.includes('WorkshopTinkerer') &&
          (result.includes('sửa') || result.includes('rèn') || result.includes('máy') || result.includes('vũ khí') || result.includes('xưởng'))) {
        weight = Math.round(weight * 1.3);
      }
      if (char.flags?.includes('SyndicateStreetCred') &&
          (result.includes('đe dọa') || result.includes('băng') || result.includes('tổ chức') || result.includes('Ngón Tay') || (outcome.effects?.heat || 0) < 0)) {
        weight = Math.round(weight * 1.3);
      }
      if (char.flags?.includes('DieciScholastic') &&
          ((outcome.effects?.sanity || 0) > 0 || result.includes('sách') || result.includes('tri thức') || result.includes('nghiên cứu'))) {
        weight = Math.round(weight * 1.3);
      }
      if (char.flags?.includes('StreetRatInstinct') &&
          (result.includes('trốn') || result.includes('chạy') || result.includes('né') || result.includes('thoát'))) {
        weight = Math.round(weight * 1.25);
      }
    }
    const adjusted = Math.max(0, tiltWeight(weight, outcome.effects || outcome.fx, traitsOf(char)));
    return adjusted > 0 ? [{ outcome, weight: adjusted }] : [];
  });
}
