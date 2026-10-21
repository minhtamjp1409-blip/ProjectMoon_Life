/**
 * Project Moon - Advanced Utility AI Response Curves & Considerations
 * Implements mathematical non-linear response curves for nuanced, atmospheric AI storytelling:
 * - Exponential Curve: Sharp urgency escalation for low sanity / high heat crises
 * - Sigmoid (Logistic) Curve: S-curve transition for Carmen's Distortion & E.G.O thresholds
 * - Quadratic (Parabolic) Curve: Optimal pacing peak for drama climaxes
 * - Linear & Threshold Clamps: Baseline normalized scoring
 */

/**
 * Normalizes any value into [0, 1] range given min and max bounds.
 */
export function normalize(value, min = 0, max = 100) {
  if (max === min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Mathematical response curves:
 */
export const ResponseCurves = {
  /**
   * Linear: y = m * x + c, clamped to [0, 1]
   */
  linear(x, slope = 1, intercept = 0) {
    return Math.max(0, Math.min(1, slope * x + intercept));
  },

  /**
   * Exponential: y = x^k.
   * Exponent k > 1 creates a curve that stays low then accelerates dramatically (ideal for crises).
   * Exponent k < 1 rises fast then plateaus (diminishing urgency).
   */
  exponential(x, exponent = 2.2) {
    const clamped = Math.max(0, Math.min(1, x));
    return Math.pow(clamped, exponent);
  },

  /**
   * Sigmoid / Logistic: S-curve transition between states.
   * Perfect for psychic collapse (sanity -> distortion) or epiphany (resonance -> E.G.O).
   * x0: midpoint (default 0.5)
   * k: steepness (default 10)
   */
  sigmoid(x, midpoint = 0.5, steepness = 10) {
    const clamped = Math.max(0, Math.min(1, x));
    return 1 / (1 + Math.exp(-steepness * (clamped - midpoint)));
  },

  /**
   * Quadratic / Parabolic: Peaks at center midpoint (0.5), drops off at extremes.
   * Formula: y = 1 - 4 * (x - 0.5)^2
   * Perfect for finding optimal drama balance (not too peaceful, not overwhelmed).
   */
  parabolicPeak(x, peak = 0.5, width = 0.5) {
    const clamped = Math.max(0, Math.min(1, x));
    const dist = Math.abs(clamped - peak) / width;
    return Math.max(0, 1 - Math.pow(dist, 2));
  },

  /**
   * Inverted Exponential: Rises fast then levels off.
   * y = 1 - (1 - x)^k
   */
  invertedExponential(x, exponent = 2.0) {
    const clamped = Math.max(0, Math.min(1, x));
    return 1 - Math.pow(1 - clamped, exponent);
  }
};

/**
 * Evaluates multi-attribute considerations for an event against the character state:
 */
export function evaluateEventConsiderations(event, char, blackboard = {}) {
  let multiplier = 1.0;
  const considerationLogs = [];

  // 1. Sanity Crisis Consideration (Exponential urgency as sanity approaches 0)
  const sanityNorm = normalize(char.stats?.sanity ?? 50, 0, 100);
  const sanityDistress = 1 - sanityNorm;
  if (sanityDistress >= 0.6) {
    const distressWeight = ResponseCurves.exponential(sanityDistress, 2.5);
    if (event.id.includes('carmen') || event.id.includes('distort') || event.id.includes('panic')) {
      const boost = 1 + distressWeight * 2.8;
      multiplier *= boost;
      considerationLogs.push(`Khủng hoảng tâm trí sâu sắc (x${boost.toFixed(2)})`);
    } else if (event.id.startsWith('life_daily')) {
      multiplier *= 0.35; // suppress routine daily life during mental collapse
    }
  }

  // 2. City Heat & Taboo Scrutiny Consideration
  const heatNorm = normalize(char.heat || 0, 0, 100);
  const tabooNorm = normalize(char.taboo || 0, 0, 3);
  const combinedScrutiny = Math.max(heatNorm, tabooNorm);
  if (combinedScrutiny >= 0.5) {
    const scrutinyWeight = ResponseCurves.sigmoid(combinedScrutiny, 0.6, 8);
    if (event.id.includes('claw') || event.id.includes('ambush') || event.id.includes('sweeper') || event.id.includes('raid')) {
      const boost = 1 + scrutinyWeight * 2.5;
      multiplier *= boost;
      considerationLogs.push(`Tầm ngắm của The Head / Hiệp hội dâng cao (x${boost.toFixed(2)})`);
    }
  }

  // 3. E.G.O Resonance Consideration (Sigmoid awakening curve)
  const resoNorm = normalize(char.resonance || 0, 0, 100);
  if (resoNorm >= 0.5) {
    const egoReadiness = ResponseCurves.sigmoid(resoNorm, 0.65, 9);
    if (event.id.includes('efflorescence') || event.id.includes('ego_') || event.id.includes('blade_lineage')) {
      const boost = 1 + egoReadiness * 2.2;
      multiplier *= boost;
      considerationLogs.push(`Cộng hưởng ánh sáng thức tỉnh (x${boost.toFixed(2)})`);
    }
  }

  // 4. Companion Attachment Consideration (Parabolic bonding curve)
  const hasAliveCompanion = ['spouse', 'partner', 'friend', 'mentor'].some(
    k => char.npcs?.[k] && !char.npcs[k].deceased
  );
  if (hasAliveCompanion) {
    const companionAffinity = ResponseCurves.invertedExponential(0.65, 2.0);
    if (event.id.includes('companion') || event.id.includes('bereavement') || (event.vi || '').includes('{spouse}')) {
      multiplier *= (1 + companionAffinity * 1.5);
    }
  }

  // 5. Pacing Tension Parabolic Balance
  const tensionNorm = normalize(char.weaver?.tensionScore ?? 25, 0, 100);
  const dramaSweetSpot = ResponseCurves.parabolicPeak(tensionNorm, 0.7, 0.4);
  if (event.major) {
    multiplier *= (0.7 + dramaSweetSpot * 0.8);
  }

  // 6. Wealth Sink & Rejuvenation Opportunity (When player is wealthy or in acute physical/mental exhaustion)
  const wealthNorm = normalize(char.stats?.wealth ?? 0, 0, 100);
  const healthNorm = normalize(char.stats?.health ?? 50, 0, 100);
  const isEconOrClinic = event.id.startsWith('econ_') || event.id.startsWith('m_med_') || event.id.startsWith('m_wellness_');
  if (isEconOrClinic) {
    if (wealthNorm >= 0.35) {
      const wealthAffluence = ResponseCurves.exponential(wealthNorm, 1.8);
      const boost = 1 + wealthAffluence * 2.2;
      multiplier *= boost;
      considerationLogs.push(`Tích lũy Ahn dồi dào thu hút dịch vụ cao cấp (x${boost.toFixed(2)})`);
    }
    if (healthNorm <= 0.65 || sanityDistress >= 0.35) {
      const needHeal = Math.max(1 - healthNorm, sanityDistress);
      const healUrgency = ResponseCurves.sigmoid(needHeal, 0.5, 6);
      const boost = 1 + healUrgency * 1.9;
      multiplier *= boost;
      considerationLogs.push(`Nhu cầu điều trị sinh mệnh cấp thiết (x${boost.toFixed(2)})`);
    }
  }

  return {
    scoreMultiplier: Math.max(0.05, Math.min(5.0, multiplier)),
    considerationLogs
  };
}
