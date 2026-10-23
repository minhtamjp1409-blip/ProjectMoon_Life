// Small builders shared by the five Finger story files, so each Finger's data stays readable.
// A "mission" is a major event only a member of that Finger can receive; a "story" is a longer thread;
// minors and dailies are the ordinary weeks of that Finger.

import { M, C, I, D, AGE } from './storyKit.js';

export { M, C, I, D, AGE };

/** Major event for one Finger. rank = [lowest, highest] fingerRank that can receive it. */
export const fe = (id, finger, rank, vi, en, choices, extra = {}) => ({
  id,
  age: extra.age || [20, 90],
  jobs: ['Syndicate'],
  finger,
  major: true,
  weight: extra.weight ?? 9,
  need: { fingerRankAtLeast: rank[0], fingerRankAtMost: rank[1], ...(extra.need || {}) },
  forbids: ['Distorted', ...(extra.forbids || [])],
  ...(extra.requires ? { requires: extra.requires } : {}),
  ...(extra.causal ? { causalOnly: true, isCausalCallback: true, weight: 0 } : {}),
  vi,
  en,
  choices
});

/** A plain choice. */
export const fc = (labelVi, labelEn, resultVi, resultEn, effects = {}, extra = {}) => ({
  labelVi, labelEn, resultVi, resultEn, effects, ...extra
});

/** A choice that can go two ways: pass [[weight, resultVi, resultEn, effects, extra], ...]. */
export const fg = (labelVi, labelEn, outs, extra = {}) => ({
  labelVi,
  labelEn,
  ...extra,
  outcomes: outs.map(([w, resultVi, resultEn, effects = {}, ox = {}]) => ({ w, resultVi, resultEn, effects, ...ox }))
});

/** Consequence to schedule from a choice. */
export const later = (eventId, delayYears, reasonVi, reasonEn) => ({ eventId, delayYears, reasonVi, reasonEn });

/** Need block for a minor or daily that only one Finger sees. */
export const fneed = (finger, atLeast = 0, atMost = 3) => ({
  jobs: ['Syndicate'], finger, fingerRankAtLeast: atLeast, fingerRankAtMost: atMost
});
