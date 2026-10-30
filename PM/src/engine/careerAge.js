// The age a character is made to pick a livelihood. In The City a child who can carry a crate is already
// working, so the old fixed 18 becomes a spread of 15 to 20 that depends on who raised them:
// a Nest family keeps a child in school longer, the Backstreets and the Outskirts do not.
//
// Everything written for "an adult in a career" was authored with 18 as its floor. A character who starts
// earlier is shifted down by the same amount, so a Fixer who signs at 15 meets the Grade 9 stories at 15
// instead of waiting three years for an empty pool.

export const CAREER_AGE_MIN = 15;
export const CAREER_AGE_MAX = 20;
export const CAREER_AGE_CLASSIC = 18;

// Mulberry32 over a string hash, so the same seed always yields the same age
const hashRoll = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  let t = (h += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const BASE_WEIGHTS = { 15: 14, 16: 18, 17: 20, 18: 22, 19: 14, 20: 12 };

/** Rolls the age at creation. Nest and Feather children start later; Outskirts and orphans earlier. */
export function rollCareerAge(seed, { nest = false, outskirts = false, poor = false } = {}) {
  const weights = { ...BASE_WEIGHTS };
  for (const age of Object.keys(weights)) {
    const a = Number(age);
    if (nest) weights[a] *= a >= 18 ? 1.6 : 0.45;
    if (outskirts || poor) weights[a] *= a <= 17 ? 1.5 : 0.7;
  }
  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
  let pick = hashRoll(`${seed}:careerAge`) * total;
  for (const age of Object.keys(weights)) {
    pick -= weights[age];
    if (pick <= 0) return Number(age);
  }
  return CAREER_AGE_CLASSIC;
}

/** Saves from before this existed keep the classic 18. */
export const careerAgeOf = (char) => {
  const age = char?.careerAge;
  return Number.isInteger(age) && age >= CAREER_AGE_MIN && age <= CAREER_AGE_MAX ? age : CAREER_AGE_CLASSIC;
};

/** Years an early starter is ahead of the classic schedule (never negative: late starters are not delayed further). */
export const careerAgeShift = (char) => Math.max(0, CAREER_AGE_CLASSIC - careerAgeOf(char));

/** Lowest age at which `entry` can fire for this character, after the early-start shift. */
export function effectiveMinAge(entry, char) {
  const lo = entry?.age?.[0];
  if (lo == null) return null;
  // Childhood stories keep their age; only adult-career stories shift, and only once a career exists
  if (lo < CAREER_AGE_CLASSIC || !char || char.job === 'Child') return lo;
  return Math.max(careerAgeOf(char), lo - careerAgeShift(char));
}

export const reachedCareerAge = (char) => (char?.age ?? 0) >= careerAgeOf(char);

export const CAREER_CROSSROAD_IDS = ['ad_career_crossroad_18', 'ad_nest_crossroad_18', 'ad_outskirts_crossroad_18'];

/** The livelihood choice a child meets at working age depends on where they grew up. */
export function careerCrossroadIdFor(char) {
  if (char?.regionId === 'OUTSKIRTS' || char?.flags?.includes('Outskirts')) return 'ad_outskirts_crossroad_18';
  if (['Nest', 'NestResident', 'Feather'].some((flag) => char?.flags?.includes(flag))) return 'ad_nest_crossroad_18';
  return 'ad_career_crossroad_18';
}
