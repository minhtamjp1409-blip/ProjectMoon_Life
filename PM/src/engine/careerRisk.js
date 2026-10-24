import {
  isFixerPromotionChoice, fixerPromotionSuccessChance, fixerPromotionFailureEffects,
  careerTrialForEvent, careerPromotionSuccessChance, careerPromotionFailureEffects,
  getEgoLeap, egoLeapSuccessChance, egoLeapFailureEffects
} from './careerPipeline.js';

export function promotionRiskOf(choice, char) {
  if (!choice || !char) return null;
  let chance;
  let loss;
  const leap = choice.leapPromotion ? getEgoLeap(char) : null;
  if (leap && leap.eventId === char.pendingEvent?.id) {
    chance = Math.min(0.92, egoLeapSuccessChance(char, leap) + (choice.leapOdds || 0));
    loss = egoLeapFailureEffects(leap);
  } else if (isFixerPromotionChoice(choice, char)) {
    chance = fixerPromotionSuccessChance(char, choice.setFixerGrade);
    loss = fixerPromotionFailureEffects(choice.setFixerGrade);
  } else {
    const step = careerTrialForEvent(char.pendingEvent?.id);
    const rank = step?.route === 'finger' ? choice.setFingerRank : choice.setWingRank;
    if (!step || rank !== step.rank) return null;
    chance = careerPromotionSuccessChance(char, step);
    loss = careerPromotionFailureEffects(step);
  }
  const hp = char.stats?.health ?? 0;
  const sp = char.stats?.sanity ?? 0;
  return {
    pass: Math.round(chance * 100), fail: Math.round((1 - chance) * 100), loss,
    lethal: (loss.health || 0) < 0 && hp + loss.health <= 0,
    breakdown: (loss.sanity || 0) < 0 && sp + loss.sanity <= 0,
    affordable: (char.stats?.wealth || 0) + (loss.wealth || 0) >= 0
  };
}
