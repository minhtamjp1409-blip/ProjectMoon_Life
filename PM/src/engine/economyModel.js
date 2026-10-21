// ============================================================================
// ECONOMY MODEL: the year-end numbers behind every resource, in one place.
//
// Design rules (taken from how comparable games keep resources honest):
//   - Every resource that events raise has a way down, so it does not sit on its cap
//     (Reigns: both ends of a bar are dangerous; BitLife: health is lost to age and bought
//     back with money; Cultist Simulator: recovery costs time or goods).
//   - Recovery is a fraction of what is missing, so a nearly-whole character gains little
//     and a broken one gains more, never a flat refill.
//   - How long a life runs comes from the District's own avgLife, not from a global age.
// Everything tunable lives in BALANCE. Pure functions, no randomness.
// ============================================================================

import { REGIONS } from '../data/worldData.js';
import { traitsOf } from './variance.js';

export const BALANCE = {
  refLife: 55,                    // the avgLife a District needs to age at the base rate
  // A Fixer event pays this share of the Merit it lists. The ladder's rungs sit far below what the
  // events add up to, so without this a Fixer would climb a rung a year.
  fixerMeritScale: 0.4,
  heal: {
    below: 76,                    // above this HP, nothing needs mending
    base: { natural: 3, nest: 4, clinic: 4, ampoule: 5 },
    deficitRate: 0.02
  },
  calm: {
    below: 68,
    base: { natural: 3, bond: 4, tavern: 4 },
    deficitRate: 0.02
  },
  aging: {
    start: 50,                    // effective age where the body starts to give
    step: 0.32,
    power: 1.08,
    floor: 1
  },
  drift: {
    resonance: { rate: 0.18, calmBonus: 1, scarFloor: 3, baseFloor: 4 },
    network: { rate: 0.16, anchor: 30, careerBonus: 12, bondBonus: 8 },
    merit: { rate: 0.07, anchor: 40 },
    rep: { rate: 0.18, anchor: 20, fixerBonus: 20, seniorBonus: 35, colorAnchor: 75, syndicateBonus: 15 }
  }
};

const regionOf = (char) => REGIONS.find((r) => r.id === char.regionId) || REGIONS[0];

/** >1 in a harsh District (shorter lives), <1 in a safe one. */
export function frailty(char) {
  const avg = regionOf(char).avgLife || BALANCE.refLife;
  return BALANCE.refLife / avg;
}

/** How old the body is, which is not the same as the calendar in a hard place. */
/** Events that belong to the Fixer career; the Merit they list is scaled by BALANCE.fixerMeritScale. */
export const isFixerCareerEvent = (event) =>
  /^(fixer_|hana_)/.test(event?.id || '') || (event?.jobs || event?.need?.jobs || []).includes('Fixer');

export const effectiveAge = (char) => char.age * frailty(char);

/** HP lost to age this year (0 before the body gives). */
export function agingLoss(char) {
  const a = BALANCE.aging;
  const flags = char.flags || [];
  const start = flags.includes('Bloodfiend') ? 120 : flags.includes('FullBodyProsthetic') ? a.start + 20 : a.start;
  const over = effectiveAge(char) - start;
  if (over <= 0) return 0;
  return Math.round(a.floor + a.step * Math.pow(over, a.power));
}

/** HP mended over a year by the best care available; `kind` is natural | nest | clinic | ampoule. */
export function healAmount(char, kind) {
  const h = BALANCE.heal;
  const hp = char.stats.health;
  if (hp >= h.below) return 0;
  const deficit = 100 - hp;
  const naturalAgePenalty = kind === 'natural' && !char.flags?.includes('FullBodyProsthetic') && !char.flags?.includes('Bloodfiend')
    ? Math.min(2, Math.floor(Math.max(0, effectiveAge(char) - 60) / 12))
    : 0;
  return Math.min(5, Math.max(1, Math.round((h.base[kind] + h.deficitRate * deficit) * traitsOf(char).vigor) - naturalAgePenalty));
}

/** SP settled over a year; `kind` is natural | bond | tavern. */
export function calmAmount(char, kind) {
  const c = BALANCE.calm;
  const sp = char.stats.sanity;
  if (sp >= c.below) return 0;
  const deficit = 100 - sp;
  return Math.min(5, Math.max(3, Math.round((c.base[kind] + c.deficitRate * deficit) * traitsOf(char).nerve)));
}

export function hasEstablishedStanding(char) {
  if ((char.flags || []).includes('ColorFixer')) return true;
  if (char.job === 'Fixer') return (char.fixerGrade || 9) <= 3;
  if (char.job === 'Syndicate') return (char.fingerRank || 0) >= 3;
  if (char.job === 'Wing Employee') return (char.wingRank || 0) >= 2;
  if (char.job === 'Workshop Craftsman') return (char.workshopRank || 0) >= 2;
  return false;
}

/**
 * Slow pull of the resources events keep raising. Returns a (negative or zero) change per key.
 * Resonance sinks toward what the character's scars keep alive, network and rep toward
 * what their work and people keep up.
 */
export function driftOf(char, bonded = 0, protectedThresholds = {}) {
  const d = BALANCE.drift;
  const flags = char.flags || [];
  const out = {};

  if (!flags.includes('Distorted')) {
    const floor = Math.min(60, d.resonance.baseFloor + Math.min(4, (char.scars || []).length) * d.resonance.scarFloor);
    const excess = (char.resonance || 0) - floor;
    if (excess > 0) {
      const calm = char.stats.sanity >= 60 ? d.resonance.calmBonus : 0;
      const rate = flags.includes('EGOAwakened') ? d.resonance.rate / 2 : d.resonance.rate;
      out.resonance = -(Math.round(excess * rate) + calm);
    }
  }

  const career = ['Fixer', 'Syndicate', 'Wing Employee'].includes(char.job);
  const netAnchor = d.network.anchor + (career ? d.network.careerBonus : 0) + (bonded >= 2 ? d.network.bondBonus : 0);
  const netExcess = char.stats.network - netAnchor;
  if (netExcess > 0) out.network = -Math.max(1, Math.round(netExcess * d.network.rate));

  // Fame holds where the work needs it: a Fixer of high Grade, a Syndicate officer, a Color
  let repAnchor = d.rep.anchor;
  if (flags.includes('ColorFixer')) repAnchor = d.rep.colorAnchor;
  else if (char.job === 'Fixer') repAnchor += char.fixerGrade <= 3 ? d.rep.seniorBonus : char.fixerGrade <= 5 ? d.rep.fixerBonus : 0;
  else if (char.job === 'Syndicate' && (char.fingerRank || 0) >= 2) repAnchor += d.rep.syndicateBonus;
  const repExcess = char.stats.rep - repAnchor;
  if (char.age < 60 && !hasEstablishedStanding(char) && repExcess > 0) {
    const available = char.stats.rep - (protectedThresholds.rep ?? 0);
    if (available > 0) out.rep = -Math.min(available, 2, Math.max(1, Math.round(repExcess * d.rep.rate)));
  }

  // Old deeds count for less each year, so the top of a ladder needs a career that keeps earning
  const mer = d.merit;
  if ((char.merit || 0) > mer.anchor) {
    const available = char.merit - (protectedThresholds.merit ?? 0);
    if (available > 0) out.merit = -Math.min(available, 5, Math.max(3, Math.round((char.merit - mer.anchor) * mer.rate)));
  }

  return out;
}
