import { matchesNeed } from './eventConditions.js';
import { tiltWeight, traitsOf } from './variance.js';
import { hasScarTag } from './scarModel.js';
import { egoEdge, egoMeritTilt } from './egoEdge.js';

/** Someone alive and close enough to be what you refuse the light for. */
const hasAnchor = (char) => ['spouse', 'partner', 'friend', 'mentor', 'child'].some((role) => {
  const npc = char.npcs?.[role];
  return npc && !npc.deceased && npc.status !== 'dead' && (npc.bond || 0) >= 60;
});

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
        weight = Math.round(weight * 1.12);
      }
      // A wielder's trials that pay Merit lean slightly their way; a death or a fall into Distortion does not
      if (egoEdge(char) > 0 && (outcome.meritAdd || 0) > 0 && !outcome.deathCauseVi &&
          !outcome.flagsAdd?.includes('Distorted') && !outcome.flagsAdd?.includes('IncompleteEGO')) {
        weight = Math.round(weight * egoMeritTilt(char));
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
      const outcomeEffects = outcome.effects || outcome.fx || {};
      if (outcome.flagsAdd?.includes('EGOAwakened')) {
        // Canon: an E.G.O grows from refusing Carmen, and what holds a person there is conviction.
        // Resonance gives the raw material, a steady mind and someone to come back to give the footing.
        const res = char.resonance || 0;
        const sp = char.stats?.sanity ?? char.sanity ?? 50;
        const scarBonus = 1 + Math.min(3, (char.scars || []).length) * 0.12;
        const resBonus = res >= 80 ? 1.5 : res >= 70 ? 1.3 : res >= 58 ? 1.15 : 1.0;
        const sanityBonus = sp >= 55 ? 1.3 : sp >= 40 ? 1.15 : sp >= 25 ? 1.0 : 0.7;
        weight = Math.round(weight * scarBonus * resBonus * sanityBonus * (hasAnchor(char) ? 1.15 : 1));
      } else if (outcome.flagsAdd?.includes('Distorted') && !choice.flagsAdd?.includes('Distorted')) {
        const sp = char.stats?.sanity ?? char.sanity ?? 50;
        if (sp >= 45 && (char.resonance || 0) >= 50) {
          weight = Math.max(5, Math.round(weight * 0.6));
        } else if (sp < 30) {
          weight = Math.round(weight * 1.4);
        }
      }
      if (hasScarTag(char, 'survivor') &&
          ((char.stats?.health ?? char.health ?? 50) <= 40 || (char.stats?.sanity ?? char.sanity ?? 50) <= 40) &&
          !outcome.deathCauseVi && ((outcomeEffects.health || 0) > 0 || (outcomeEffects.sanity || 0) > 0 || outcome.survival)) {
        weight = Math.round(weight * 1.15);
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
