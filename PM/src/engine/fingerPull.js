import { REGIONS } from '../data/worldData.js';
import { activeScarCount } from './scarModel.js';

// Which of the Five Fingers notice a Syndicate member, judged from where they work and what they have done.
// This is an adaptation for the game: the districts and traits below are not taken from Project Moon canon.
const FINGERS = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
const INVITERS = 3;

// Mulberry32 over a string hash, so the same life always sees the same offers
const hashRoll = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  let t = (h += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export function fingerPull(char) {
  const region = REGIONS.find((r) => r.id === char.regionId);
  const tags = region?.tags || [];
  const pull = Object.fromEntries(FINGERS.map((f) => [f, 1]));
  if (tags.includes('industrial')) pull.Thumb += 2;
  if (tags.includes('commercial')) pull.Index += 1;
  if (tags.includes('top')) pull.Index += 2;
  if (tags.includes('entertainment') || tags.includes('medical')) pull.Ring += 2;
  if (region && region.safety <= 5) pull.Middle += 1;
  if (region && region.safety <= 3) pull.Middle += 1;
  if (region && region.orgPressure >= 7) pull.Thumb += 1;
  if (region && region.orgPressure <= 5) pull.Pinky += 1;
  if (region && region.wealth >= 5) pull.Ring += 1;
  if (region && region.wealth >= 7) pull.Pinky += 1;
  if (tags.includes('fantasm') || tags.includes('unmapped')) pull.Pinky += 2;

  if ((char.heat ?? char.stats?.heat ?? 0) >= 40) { pull.Thumb += 1; pull.Middle += 1; }
  if ((char.stats?.sanity ?? 50) <= 35) pull.Index += 1;
  if (activeScarCount(char) >= 2) { pull.Ring += 1; pull.Middle += 1; }
  if ((char.merit || 0) >= 20) pull.Pinky += 1;
  if ((char.stats?.network ?? char.network ?? 0) >= 45) pull.Index += 1;

  for (const f of FINGERS) pull[f] += hashRoll(`${char.seed}:${f}`) * 1.5;
  return pull;
}

/** The Fingers that send word: the three with the strongest pull. */
export function fingersReachingOut(char) {
  const pull = fingerPull(char);
  return FINGERS.slice().sort((a, b) => pull[b] - pull[a]).slice(0, INVITERS);
}
