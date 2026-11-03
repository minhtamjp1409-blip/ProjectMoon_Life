import { bringsClaw } from '../../engine/forbiddenPath.js';
import { getChoiceAhnCost } from '../../engine/eventConditions.js';
import {
  isFixerPromotionChoice,
  fixerPromotionSuccessChance
} from '../../engine/careerPipeline.js';
import { weightedOutcomes } from '../../engine/outcomeOdds.js';

export const STAT_ORDER = ['health', 'sanity', 'wealth', 'rep', 'network', 'resonance', 'heat', 'taboo', 'leverage', 'standing', 'merit'];

export const fxOf = (obj) => obj?.effects || obj?.fx || {};
export const outsOf = (choice) => choice?.out || choice?.outcomes;

/**
 * What a choice will do: list of affected resources (without exact numbers to maintain
 * suspense and gamble), plus odds when multiple outcomes exist.
 */
export function previewChoice(choice, char, kind = 'major') {
  const base = fxOf(choice);
  const costAhn = getChoiceAhnCost(choice, char);
  const costOutsideEffects = costAhn && base.wealth !== -costAhn ? costAhn : 0;
  if (isFixerPromotionChoice(choice, char)) {
    const pass = Math.round(fixerPromotionSuccessChance(char, choice.setFixerGrade) * 100);
    const affected = [...new Set([...STAT_ORDER.filter((key) => Boolean(base[key])), 'health', 'wealth', 'sanity'])];
    const directions = {};
    for (const k of affected) {
      const v = (base[k] || 0) - (k === 'wealth' ? costOutsideEffects : 0);
      if (v > 0) directions[k] = 'rise';
      else if (v < 0) directions[k] = 'fall';
      else if (k === 'health') directions[k] = 'fall';
      else if (k === 'wealth') directions[k] = costAhn ? 'fall' : 'rise';
      else directions[k] = 'vary';
    }
    return { affected, fixed: [], ranges: [], directions, odds: null, examOdds: { pass, fail: 100 - pass } };
  }
  const weighted = char ? weightedOutcomes(choice, char, kind) : (outsOf(choice) || []).map((outcome) => ({ outcome, weight: outcome.w ?? 1 }));
  const outs = weighted.map((entry) => entry.outcome);
  if (!outs?.length) {
    const affected = STAT_ORDER.filter((k) => Boolean(base[k]) || (k === 'wealth' && Boolean(costAhn)));
    const fixed = affected.map((k) => ({ k, v: (base[k] || 0) - (k === 'wealth' ? costOutsideEffects : 0) }));
    const directions = Object.fromEntries(fixed.map(({ k, v }) => [k, v > 0 ? 'rise' : v < 0 ? 'fall' : 'vary']));
    return { affected, fixed, ranges: [], directions, odds: null };
  }
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  const affected = [];
  const ranges = [];
  const directions = {};
  for (const k of STAT_ORDER) {
    const values = outs.map((o) => (base[k] || 0) + (fxOf(o)[k] || 0) - (k === 'wealth' ? costOutsideEffects : 0));
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    if (lo === 0 && hi === 0 && !base[k] && !(k === 'wealth' && costAhn)) continue;
    affected.push(k);
    ranges.push({ k, lo, hi });
    directions[k] = lo >= 0 && hi > 0 ? 'rise' : hi <= 0 && lo < 0 ? 'fall' : 'vary';
  }
  const odds = weighted.map((entry) => Math.round((entry.weight / total) * 100));
  return { affected, fixed: [], ranges, directions, odds };
}

// Helper to determine if a minor choice has secondary details (bonds, risks, extra stats, lasting consequences)
export function hasMinorExtraDetails(choice, char, npcs) {
  if (!choice) return false;
  const { affected } = previewChoice(choice, char, 'minor');
  const bonds = Object.entries(choice.bond || {})
    .map(([role]) => ({ name: npcs?.[role]?.nameVi || npcs?.spouse?.nameVi }))
    .filter((b) => b.name);
  const secondaryStats = (affected || []).slice(1);
  const hasLasting = Boolean(choice.lasting && (choice.lasting.vi || choice.lasting.en));
  return secondaryStats.length > 0 || bonds.length > 0 || hasLasting || Boolean(choice.later || choice.scar || bringsClaw(choice, char));
}
