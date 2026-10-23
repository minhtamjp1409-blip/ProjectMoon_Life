// ============================================================================
// VARIANCE: where two lives with the same start part ways.
//
//  - Temperament: five hidden numbers rolled once per life from the seed. They tilt odds and
//    scale damage and gain a little (never enough to decide a life alone), so the same event
//    plays out differently for a lucky, a frail or a hard-working character.
//  - Jitter: a fixed effect (+6 Ahn) lands as 4 to 8, mean unchanged. The screen never shows
//    exact numbers, so a choice stays a gamble.
//  - Freshness: the weight of an entry falls with how recently, and how often, it played in
//    this life. This replaces a hard "no repeats" window, which ran dry and fell back to a
//    fixed order.
// Pure functions: no imports, the caller supplies the random stream.
// ============================================================================

export const NEUTRAL_TRAITS = { luck: 0, vigor: 1, nerve: 1, hustle: 1, drama: 1 };

// A result that spells out its own numbers ("+16 HP") must land on exactly those numbers
export const PRINTED_NUMBERS = /[+\-−]\s?\d+\s?(HP|SP|Ahn|Merit|Rep)/i;

// Sum of three uniforms: bell-shaped on [-1, 1] without a log or sqrt
const bell = (rng) => (rng() + rng() + rng() - 1.5) / 1.5;

export function rollTraits(rng) {
  const r2 = (x) => Math.round(x * 100) / 100;
  return {
    luck: r2(bell(rng) * 1.5),            // -1.5 .. 1.5, tilts outcome odds
    vigor: r2(1 + bell(rng) * 0.25),      // 0.75 .. 1.25, damage taken and healing
    nerve: r2(1 + bell(rng) * 0.25),      // 0.75 .. 1.25, sanity damage
    hustle: r2(1 + bell(rng) * 0.25),     // 0.75 .. 1.25, Ahn earned
    drama: r2(1 + bell(rng) * 0.4)        // 0.6 .. 1.4, how eventful the years run
  };
}

export const traitsOf = (char) => char?.traits || NEUTRAL_TRAITS;

/** A rough "is this good for the character" score, only used to tilt odds. */
export function fxGood(fx = {}) {
  return (fx.health || 0) * 1.2 + (fx.sanity || 0) + (fx.wealth || 0) * 0.6 + (fx.rep || 0) * 0.6 + (fx.network || 0) * 0.4 +
    (fx.merit || 0) * 0.3 - (fx.heat || 0) * 0.6 - (fx.taboo || 0) * 6 - (fx.resonance || 0) * 0.2;
}

/** Same sign, mean unchanged: |v| >= 2 moves by up to +-30%; +-1 stays. */
export function jitterEffects(fx, rng, spread = 0.3) {
  const out = {};
  for (const [k, v] of Object.entries(fx || {})) {
    if (!Number.isFinite(v) || Math.abs(v) < 2 || k === 'taboo') { out[k] = v; continue; }
    const f = 1 + (rng() * 2 - 1) * spread;
    const next = Math.round(v * f);
    out[k] = next === 0 ? Math.sign(v) : next;
  }
  return out;
}

/** Temperament scales what hurts and what pays. */
export function scaleByTraits(fx, traits) {
  const t = traits || NEUTRAL_TRAITS;
  const out = { ...fx };
  if (out.health < 0) out.health = Math.round(out.health * (2 - t.vigor));
  if (out.sanity < 0) out.sanity = Math.round(out.sanity * (2 - t.nerve));
  if (out.wealth > 0) out.wealth = Math.round(out.wealth * t.hustle);
  return out;
}

/** Jitter then temperament, in one call for a resolved choice. */
export function varyEffects(fx, rng, traits) {
  return scaleByTraits(jitterEffects(fx, rng), traits);
}

/** Luck makes good outcomes likelier and bad ones rarer, up to about +-35%. */
export function tiltWeight(weight, outcomeFx, traits) {
  const luck = (traits || NEUTRAL_TRAITS).luck;
  if (!luck) return weight;
  const g = fxGood(outcomeFx);
  if (g === 0) return weight;
  return Math.max(0, weight * (1 + 0.23 * luck * Math.sign(g)));
}

/**
 * Freshness of an entry in this life, 0..1.
 * `recent` is the list of ids that just played (newest last); `seen` maps id -> times played.
 * Recent entries are damped hard, familiar ones gently, never-played ones keep full weight.
 */
export function freshness(id, recent = [], seen = {}) {
  const count = seen[id] || 0;
  if (count === 0) return 1;
  const at = recent.lastIndexOf(id);
  const since = at < 0 ? Infinity : recent.length - at;           // 1 = just played
  const recency = since === Infinity ? 0.15 : (1 - Math.exp(-since / 65)) * 0.12;
  const familiarity = 1 / Math.pow(1 + count * 6, 2.2);
  return Math.max(0.0005, recency * familiarity);
}
