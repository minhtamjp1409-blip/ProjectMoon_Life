import { advanceCityCondition } from './cityConditions.js';
import { contractRouteOf } from '../data/careerContracts.js';
import { careerAgeOf, reachedCareerAge, effectiveMinAge, careerCrossroadIdFor } from './careerAge.js';
import { rememberResonance, colorTrialAvailable, rollEgoEncounter } from './awakeningProgress.js';
import { matchesNeed, matchesEventContext, choiceIsAvailable, mergeEffects, isNestResident, isOutsideCity, colorTrialCompanionAlive, isIndependentSyndicateEligibleForRank, charHasWorkshopAccess, jobMatchesWithInheritance } from './eventConditions.js';
import {
  getNextFixerPromotion,
  contractOfferChance,
  fixerPromotionSuccessChance,
  fixerPromotionFailureEffects,
  checkColorFixerReadiness,
  getNextFingerPromotion,
  getNextWingPromotion,
  getOtherCareerPromotion,
  careerTrialRetryDue,
  careerOpportunity,
  syndicateApexOpportunity,
  careerTrialForEvent,
  careerPromotionSuccessChance,
  careerPromotionFailureEffects,
  TRIAL_MIN_HP
} from './careerPipeline.js';
import { rollSeasonMishap } from './fateEngine.js';
// ============================================================================
// YEAR PLANNER: each year is a plan of 1–4 moments spread across the seasons.
// The bar sweeps the year; when it passes a moment's time `t` (0–1) that moment
// runs: a daily line that nudges stats, a minor choice that keeps time flowing
// (and lets the moment pass if you don't answer), a major event or a Fixer
// contract that stops time. Every stat change is recorded as a visible delta.
// ============================================================================

import { SEASONS, ALL_STORY_EVENTS, clamp, cloneChar, interpolateText, checkPromotions, evaluateCharacterAchievements, applyFatalOrCompanionSave, handleSanityBreakdown, generateFixerContract } from './gameEngine.js';
import { selectEventWithWeaverAI, updateDramaTension, FATE_OMENS, isEventEligible } from './weaverAI.js';
import { markHabitChallengeTriggered } from './eventDirector.js';
import { CONSEQUENCE_EVENTS } from '../data/eventsChildhood.js';
import { LIFE_DAILIES as DAILIES_FIRST } from '../data/lifeDailies.js';
import { LIFE_MINORS as MINORS_FIRST } from '../data/lifeMinors.js';
import { LIFE_MINORS_BONDS } from '../data/lifeMinorsBonds.js';
import { LIFE_MINORS_2 } from '../data/lifeMinors2.js';
import { LIFE_DAILIES_3, LIFE_MINORS_3 } from '../data/lifeMinors3.js';
import { LIFE_MINORS_4 } from '../data/lifeMinors4.js';
import { LIFE_MINORS_5 } from '../data/lifeMinors5.js';
import { LIFE_MINORS_WING } from '../data/lifeMinorsWing.js';
import { LIFE_MINORS_SEEDS } from '../data/lifeMinorsSeeds.js';
import { WORKSHOP_VISIT_MINORS, WORKSHOP_VISIT_DAILIES } from '../data/eventsWorkshopVisits.js';
import { FINGER_MINORS, FINGER_DAILIES, FINGER_MISSIONS } from '../data/eventsFingers.js';
import { LIFE_MINORS_KIDS } from '../data/lifeMinorsKids.js';
import { LIFE_MINORS_CONTRACTS } from '../data/lifeMinorsContracts.js';
import { THREAD_MINORS } from '../data/narrative/causalThreads.js';
import { FORBIDDEN_MINORS } from '../data/eventsForbidden.js';
import { SCAR_CALLBACKS } from '../data/lifeScarCallbacks.js';
import { LIFE_CAREER_OPPORTUNITIES } from '../data/lifeCareerOpportunities.js';
import { ANNUAL_MERIT_OPPORTUNITIES } from '../data/annualMeritOpportunities.js';
import { apexNoveltyWeight } from '../data/apexCommissions.js';
import { apexLongevityEventId } from '../data/eventsApexTwilight.js';
import { EXPANDED_DAILIES } from '../data/narrative/dailies.js';
import { DAILIES_2 } from '../data/narrative/dailies2.js';
import { EXPANSION_LIFE_MINORS, EXPANSION_LIFE_DAILIES } from '../data/lifeMinorsAndDailiesExpansion.js';
import { WING_PARITY_MINORS, WING_PARITY_DAILIES } from '../data/eventsWingParityExpansion.js';
import { DISTORTION_PARITY_MINORS, DISTORTION_PARITY_DAILIES } from '../data/eventsDistortionParityExpansion.js';
import { COLOR_EXPANSION_MINORS, COLOR_EXPANSION_DAILIES } from '../data/eventsColorExpansionSuite.js';
import { NPC_CHOICE_CALLBACKS } from '../data/lifeNpcCallbacks.js';

const FINGER_MISSION_CHANCE = 0.4;

export const LIFE_MINORS = [...MINORS_FIRST, ...LIFE_MINORS_2, ...LIFE_MINORS_3, ...LIFE_MINORS_4, ...LIFE_MINORS_5, ...LIFE_MINORS_WING, ...LIFE_MINORS_SEEDS, ...WORKSHOP_VISIT_MINORS, ...FINGER_MINORS, ...LIFE_MINORS_KIDS, ...LIFE_MINORS_CONTRACTS, ...LIFE_MINORS_BONDS, ...THREAD_MINORS, ...FORBIDDEN_MINORS, ...SCAR_CALLBACKS, ...LIFE_CAREER_OPPORTUNITIES, ...ANNUAL_MERIT_OPPORTUNITIES, ...EXPANSION_LIFE_MINORS, ...WING_PARITY_MINORS, ...DISTORTION_PARITY_MINORS, ...COLOR_EXPANSION_MINORS];
export const LIFE_DAILIES = [...DAILIES_FIRST, ...LIFE_DAILIES_3, ...EXPANDED_DAILIES, ...DAILIES_2, ...EXPANSION_LIFE_DAILIES, ...WORKSHOP_VISIT_DAILIES, ...FINGER_DAILIES, ...WING_PARITY_DAILIES, ...DISTORTION_PARITY_DAILIES, ...COLOR_EXPANSION_DAILIES, ...NPC_CHOICE_CALLBACKS];
import { directorWeight, markTheme, logDecision, closeThreads, applyChoiceExtras, npcActive } from './director.js';
import { freshness, varyEffects, traitsOf, PRINTED_NUMBERS } from './variance.js';
import { reputationGain } from './economyModel.js';
import { addScar } from './scarModel.js';
import { ambitionWeight } from './annualPlan.js';
import { prepareEnsembleYear } from './ensemblePath.js';
import { weightedOutcomes } from './outcomeOdds.js';
import { offerYearLeads, scheduleForbiddenEncounter } from './yearLeads.js';
export { isYearLeadUsable, chooseYearLead, chooseDirectorPacedLead } from './yearLeads.js';
export { JOB_INCOME, endYear } from './yearEnd.js';
export { isQuietYear, AMBIENT_YEAR_LINES, pickCityBulletin, createYearDigest, consolidateYearDailies } from './yearDigest.js';

export const MINOR_WINDOW_MS = 15000;
export const FIRST_MINOR_WINDOW_MS = 30000;

const minorWindowFor = (char) => char.firstTimedMinorSeen ? MINOR_WINDOW_MS : FIRST_MINOR_WINDOW_MS;
// How many recent moments freshness looks back over (see variance.js)
const RECENT_LIMIT = 120;

export const STAT_KEYS = ['health', 'sanity', 'wealth', 'network', 'rep'];
const EXTRA_KEYS = ['heat', 'resonance', 'taboo', 'merit', 'standing', 'leverage'];
const LIMITS = { heat: [0, 100], resonance: [0, 100], taboo: [0, 3], merit: [0, 9999], standing: [0, 100], leverage: [0, 100] };
// A Wing record starts clean: standing reads 50 until something moves it
const extraBase = (char, k) => char[k] ?? (k === 'standing' ? 50 : 0);

/* ---------- small helpers ---------- */

const seasonAt = (t) => SEASONS[Math.min(3, Math.floor((t || 0) * 4))];
export const seasonIdxAt = (t) => Math.min(3, Math.floor((t || 0) * 4));

export function pickWeighted(list, weightOf, rng) {
  list = list.filter(x => weightOf(x) > 0);
  const total = list.reduce((s, x) => s + Math.max(0, weightOf(x)), 0);
  if (total <= 0) return null;
  let roll = rng() * total;
  for (const x of list) {
    roll -= Math.max(0, weightOf(x));
    if (roll <= 0) return x;
  }
  return list[list.length - 1] || null;
}

function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const isNest = isNestResident;
export const isOutskirts = isOutsideCity;
export const isBackstreets = (char) => !isNest(char) && !isOutskirts(char);

/** Does an entry's `need` filter match this character right now? */
export const matchNeed = matchesNeed;

const ageOk = (entry, age, char = null) => !entry.age || (age >= (char ? effectiveMinAge(entry, char) : entry.age[0]) && age <= entry.age[1]);

/**
 * Applies an effect map and returns the deltas that actually landed after clamping,
 * in a fixed order so the UI always lists them the same way.
 */
export function applyFx(char, fx = {}, { exactRep = false } = {}) {
  const deltas = [];
  const omen = FATE_OMENS.find((o) => o.id === char.fateOmenId);
  for (const k of STAT_KEYS) {
    if (!fx[k]) continue;
    const before = char.stats[k];
    const amount = k === 'rep' && fx[k] > 0 && !exactRep ? reputationGain(before, fx[k]) : fx[k];
    if (k === 'wealth' && amount > 0 && before + amount > 100) {
      char.reserveAhn = (char.reserveAhn || 0) + (before + amount - 100);
    }
    char.stats[k] = clamp(before + amount, 0, 100);
    const d = char.stats[k] - before;
    if (d) deltas.push({ k, v: d });
  }
  for (const k of EXTRA_KEYS) {
    if (!fx[k]) continue;
    const [lo, hi] = LIMITS[k];
    const before = extraBase(char, k);
    const raw = k === 'merit' && fx[k] > 0 ? Math.round(fx[k] * (omen?.meritMult || 1)) : fx[k];
    char[k] = clamp(before + raw, lo, hi);
    const d = char[k] - before;
    if (d) deltas.push({ k, v: d });
  }
  rememberResonance(char, fx.resonance || 0);
  return deltas;
}

/** Stat differences between two character snapshots, for actions resolved elsewhere. */
export function diffStats(prev, next) {
  const out = [];
  for (const k of STAT_KEYS) {
    const d = (next.stats[k] || 0) - (prev.stats[k] || 0);
    if (d) out.push({ k, v: d });
  }
  for (const k of EXTRA_KEYS) {
    const d = extraBase(next, k) - extraBase(prev, k);
    if (d) out.push({ k, v: d });
  }
  return out;
}

export function pushLog(char, entry, t) {
  const idx = seasonIdxAt(t);
  char.logSerial = (char.logSerial ?? char.logs.length) + 1;
  char.logs.push({
    id: `log_${char.age}_${char.logSerial}_${entry.key || 'x'}`,
    age: char.age,
    season: entry.season || SEASONS[idx],
    ...entry
  });
}

export function remember(char, id) {
  char.recent = [...(char.recent || []), id].slice(-RECENT_LIMIT);
  char.seenCount = { ...(char.seenCount || {}), [id]: ((char.seenCount || {})[id] || 0) + 1 };
}

// Split a "[Title] body" event text into its title and body.
/**
 * A decision this life really made between 12 and 25, at least 25 years ago: a turning point if there was one,
 * otherwise the earliest on record. Events marked youthEcho quote it, so each life remembers its own youth.
 */
export function youthEchoOf(char) {
  const past = (char?.logs || []).filter((l) => l.choiceVi && l.age >= 12 && l.age <= 25 && (char.age || 0) - l.age >= 25);
  // A major's log keeps the scene without its heading, so the heading is read back from the event itself
  const titled = (log) => {
    const event = ALL_STORY_EVENTS.find((e) => log.id === `log_ev_${log.age}_${e.id}`);
    const titleVi = splitTitle(event ? interpolateText(event.vi, char) : log.review?.vi).title;
    const titleEn = splitTitle(event ? interpolateText(event.en, char) : log.review?.en).title;
    return titleVi ? { log, titleVi, titleEn: titleEn || titleVi } : null;
  };
  const big = past.filter((l) => l.type === 'major' || l.type === 'causal');
  let found = null;
  for (const log of [...big.filter((l) => l.turning), ...big, ...past]) {
    found = titled(log);
    if (found) break;
  }
  if (!found) return null;
  const bare = (text) => String(text || '').replace(/\.\s*$/, '');
  return { age: found.log.age, titleVi: found.titleVi, titleEn: found.titleEn, choiceVi: bare(found.log.choiceVi), choiceEn: bare(found.log.choiceEn || found.log.choiceVi) };
}

export function splitTitle(text) {
  const m = /^\s*\[([^\]]{2,80})\]\s*/.exec(text || '');
  return m ? { title: m[1], body: text.slice(m[0].length) } : { title: null, body: text || '' };
}

/* ---------- choosing what happens this year ---------- */

// Everything that fits the character. Repeats are discouraged by weight (see weightOf), not forbidden,
// so a small pool still draws at random instead of cycling in a fixed order.
function eligibleDailies(char) {
  return LIFE_DAILIES.filter((d) => {
    if (d.once && (char.seenEvents || []).includes(d.id)) return false;
    return matchesEventContext(d, char);
  });
}

export function eligibleMinors(char) {
  return LIFE_MINORS.filter((m) => {
    // A lead-only scene arrives only as one of the year's leads, never in the ordinary draw
    if (m.leadOnly || !matchesEventContext(m, char)) return false;
    if (m.once && (char.seenEvents || []).includes(m.id)) return false;
    return true;
  });
}

const minorCanEarnMerit = (id) => LIFE_MINORS.some((entry) => entry.id === id &&
  entry.choices?.some((choice) => (choice.fx?.merit || 0) > 0 ||
    (choice.out || choice.outcomes || []).some((outcome) => (outcome.fx?.merit || 0) > 0)));

function annualMeritMoment(char, moments, rng) {
  if (char.job === 'Child' || char.age < careerAgeOf(char) || !char.alive) return null;
  if (moments.some((item) => item?.kind === 'contract')) return null;
  if (char.job === 'Distortion') {
    if (char.lastDistortionAnnualAge && char.age - char.lastDistortionAnnualAge < 2) return null;
    if (rng() >= 0.60) return null;
  }
  const existing = moments.find((item) => item?.kind === 'minor' &&
    (item.id === 'm_fx_request_choice' ||
      LIFE_CAREER_OPPORTUNITIES.some((event) => event.id === item.id) ||
      ANNUAL_MERIT_OPPORTUNITIES.some((event) => event.id === item.id)) &&
    minorCanEarnMerit(item.id));
  if (existing) {
    existing.annualMerit = true;
    return null;
  }
  const pool = ANNUAL_MERIT_OPPORTUNITIES.filter((entry) => matchesEventContext(entry, char));
  const event = pickWeighted(pool, (entry) => freshness(entry.id, char.recent, char.seenCount) * apexNoveltyWeight(entry, char.recent), rng);
  if (!event) return null;
  const t = [0.235, 0.485, 0.735][Math.floor(rng() * 3)];
  const seasonIdx = seasonIdxAt(t);
  remember(char, event.id);
  if (char.job === 'Distortion') {
    char.lastDistortionAnnualAge = char.age;
    logDecision(char, event, { vi: 'Biến động bản ngã và sinh tồn trong bóng tối', en: 'A surge of ego and survival in the dark', w: 1 }, 'minor');
  } else {
    logDecision(char, event, { vi: 'Một việc làm có thể ghi vào hồ sơ công trạng', en: 'A commission that can enter the merit record', w: 1 }, 'minor');
  }
  return { kind: 'minor', id: event.id, t, seasonIdx, season: SEASONS[seasonIdx], extra: true, annualMerit: true };
}

// Director weights reach x6; the 0.8 power keeps their order but lets weaker entries through
export const weightOf = (char) => (e) => {
  let weight = Math.pow(directorWeight(e, char).w, 0.8) * freshness(e.id, char.recent, char.seenCount) * apexNoveltyWeight(e, char.recent);
  if (char.job === 'Syndicate' && e.need?.finger === char.finger && e.id.startsWith('d_')) weight *= 5;
  if (e.id === 'm_fx_request_choice') {
    const next = getNextFixerPromotion(char);
    if (next && next.currentRep < next.repReq) {
      weight *= Math.min(3, 1.5 + (next.repReq - next.currentRep) / 8);
    }
  }
  // The longer you have not seen someone, the more likely a quiet moment with them comes up
  if (e.keepRole) {
    const npc = char.npcs?.[e.keepRole] || (e.keepRole === 'lover' && e.need?.allowSpouseFallback ? char.npcs?.spouse : null);
    const apart = npc ? Math.max(0, char.age - (npc.lastSceneAge ?? npc.metAge ?? char.age)) : 0;
    weight *= 1 + Math.min(3, apart * 0.75);
  }
  if (e.need?.npc && !(char.seenEvents || []).includes(e.id) && e.choices) {
    const npc = char.npcs?.[e.need.npc];
    if (npc && npcActive(npc) && (char.age - (npc.lastSceneAge ?? -99)) >= 2) {
      weight *= 1.25;
    }
  }
  const opportunity = careerOpportunity(char);
  if (opportunity?.ids?.includes(e.id)) weight *= 1.5 + opportunity.shortage;
  weight *= ambitionWeight(e, char.ambition?.id);
  return weight;
};

function majorIsDue(char, rng) {
  const w = char.weaver || {};
  if (char.age <= 4) return false;
  const fitForTrial = (char.stats?.health ?? 50) >= TRIAL_MIN_HP;
  // If Fixer is eligible for next grade exam, schedule major
  if (fitForTrial && char.job === 'Fixer' && !char.flags.includes('Distorted')) {
    const nextPromo = getNextFixerPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  // If Syndicate is eligible for next finger promotion, schedule major (Unblocked for Distorted)
  if (fitForTrial && (char.job === 'Syndicate' || (char.flags.includes('Distorted') && char.finger)) && char.finger) {
    const nextPromo = getNextFingerPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  if (fitForTrial && char.job === 'Syndicate' && !char.finger) {
    const rank = char.syndicateRank || 0;
    const targetMerit = [0, 20, 50, 90][rank + 1];
    const targetRep = [0, 20, 45, 75][rank + 1];
    const targetHeat = [0, 15, 30, 50][rank + 1];
    if (targetMerit != null && (char.merit || 0) >= targetMerit && (char.stats?.rep || 0) >= targetRep && (char.heat || 0) >= targetHeat) {
      return true;
    }
  }
  if ((char.debts || []).some((d) => d.id === 'fixer_license_debt' && d.status === 'active' && char.age >= d.nextDueAge)) return true;
  // If Wing Employee is eligible for next wing promotion, schedule major
  if (char.job === 'Wing Employee' && !char.flags.includes('Distorted')) {
    const nextPromo = getNextWingPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  if ((reachedCareerAge(char) && char.job === 'Child') && !(char.seenEvents || []).includes(careerCrossroadIdFor(char))) return true;
  if (char.job === 'Syndicate' && !char.finger && !(char.seenEvents || []).includes('syn_choose_finger_allegiance') && ((char.merit || 0) >= 15 && ((char.stats?.rep || 0) >= 20 || (char.heat || 0) >= 25))) return true;
  if ((w.pendingThreads || []).some((th) => th.kind !== 'minor' && !th.fulfilled && char.age >= th.triggerAge)) return true;
  if (rollEgoEncounter(char, rng) && !(char.seenEvents || []).includes('ego_carmen_crossroad') && !char.flags.includes('EGOAwakened') && !char.flags.includes('Distorted')) return true;
  if ((char.job === 'Fixer' || char.job === 'Color Fixer') && !char.flags.includes('Distorted') && checkColorFixerReadiness(char).ready && !char.flags.includes('ColorFixer') && colorTrialAvailable(char)) return true;
  const gap = w.yearsSinceLastMajor || 0;
  // Childhood: the gap counts from birth, so "every 5 years" used to put the first
  // major event at exactly 5 for everyone. Spread it over 5-9 instead.
  if (char.age < 12) {
    if (gap >= 9) return true;
    return gap >= 3 && rng() < (char.age <= 6 ? 0.3 : 0.4);
  }
  if (gap >= 5) return true;
  if ((char.job === 'Syndicate' || (char.flags?.includes('Distorted') && char.finger)) && (char.fingerRank || 0) >= 3 && gap >= 2 && rng() < 0.65) return true;
  if ((char.job === 'Fixer' || char.job === 'Color Fixer') && char.flags?.includes('ColorFixer') && gap >= 2 && rng() < 0.55) return true;
  if (char.flags?.includes('Distorted') && gap >= 2 && rng() < 0.55) return true;
  return gap >= 2 && rng() < 0.32;
}

/** Builds this year's plan. Called at birth and after every birthday. */
export function planYear(charState, rng) {
  const char = charState;
  rememberResonance(char);
  advanceCityCondition(char, rng);
  const age = char.age;
  const nest = isNest(char);

  // 1. Collect Key / Causal items (Consequences scheduled by earlier choices come first)
  const scheduledKey = [];
  const ensembleDue = prepareEnsembleYear(char);
  if (ensembleDue) scheduledKey.push({ kind: 'major', forcedEventId: ensembleDue });
  const pending = char.weaver?.pendingThreads || [];
  for (const th of pending) {
    if (th.fulfilled || char.age < th.triggerAge) continue;

    // Check if it matches a minor event
    const minorDef = LIFE_MINORS.find((m) => m.id === th.eventId);
    if (minorDef) {
      const ok = matchesEventContext(minorDef, char) && !(minorDef.once && (char.seenEvents || []).includes(minorDef.id));
      if (ok && !scheduledKey.some((it) => it.id === minorDef.id)) {
        scheduledKey.push({ kind: 'minor', id: minorDef.id, thread: th.id, isCausal: true });
        logDecision(char, minorDef, { vi: th.reasonVi || 'Hậu quả đến hạn', en: th.reasonEn || 'A consequence comes due', w: 99 }, 'minor');
        continue;
      }
    }

    // Check if it matches a major story consequence
    let targetEventId = th.eventId;
    if (targetEventId === 'csq_color_sponsor_aftermath' && !colorTrialCompanionAlive(char)) {
      targetEventId = 'csq_color_sponsor_aftermath_fallen';
    }
    const storyDef = CONSEQUENCE_EVENTS.find((e) => e.id === targetEventId) || ALL_STORY_EVENTS.find((e) => e.id === targetEventId);
    if (storyDef && isEventEligible(storyDef, char, { scripted: true })) {
      if (!scheduledKey.some((it) => it.forcedEventId === storyDef.id)) {
        scheduledKey.push({ kind: 'major', forcedEventId: storyDef.id, thread: th.id, isCausal: true });
        logDecision(char, storyDef, { vi: th.reasonVi || 'Quả báo đến hạn', en: th.reasonEn || 'Karma comes due', w: 99 }, 'major');
        continue;
      }
    }

    if (th.waitsForGate) {
      const trial = careerTrialForEvent(targetEventId);
      const reqJobs = storyDef?.need?.jobs || storyDef?.jobs;
      const reqFinger = trial?.finger || storyDef?.need?.finger || storyDef?.finger;
      const leftFinger = Boolean(reqFinger && (char.finger !== reqFinger || (char.job !== 'Syndicate' && !char.flags?.includes('Distorted'))));
      const leftWing = Boolean(trial?.route === 'wing' && char.job !== 'Wing Employee');
      const leftFixer = Boolean((targetEventId === 'hana_color_ascension_trial' || targetEventId.startsWith('fixer_promo_')) && char.job !== 'Fixer' && char.job !== 'Color Fixer');
      const leftJobs = Boolean(Array.isArray(reqJobs) && reqJobs.length > 0 && !jobMatchesWithInheritance(reqJobs, char, storyDef));
      if (leftFinger || leftWing || leftFixer || leftJobs || !char.alive) {
        closeThreads(char, th.eventId, { threadId: th.id });
      }
      continue;
    }

    // Drop if far overdue and cannot be resolved
    const graceYears = th.eventId === 'distort_star_of_city_rampage' ? 20 : 8;
    if (age > th.triggerAge + graceYears) {
      closeThreads(char, th.eventId, { threadId: th.id });
    }
  }

  // Living Parent Support & Historic Fall Milestone
  if (char.npcs?.parent?.alive) {
    if (char.age < char.npcs.parent.deathAgeInChildLife && char.parentSupportAge !== char.age) {
      char.parentSupportAge = char.age;
      char.stats.wealth = Math.min(100, (char.stats.wealth || 0) + 2);
      char.stats.rep = Math.min(100, (char.stats.rep || 0) + 1);
    } else if (char.age >= char.npcs.parent.deathAgeInChildLife && !(char.seenEvents || []).includes('csq_parent_historic_passing')) {
      if (!scheduledKey.some((it) => it.forcedEventId === 'csq_parent_historic_passing')) {
        scheduledKey.unshift({ kind: 'major', forcedEventId: 'csq_parent_historic_passing' });
      }

    }
  }

  // The career crossroads comes at the character's own working age (15 to 20), not a fixed 18
  if (reachedCareerAge(char) && char.job === 'Child') {
    const careerEventId = careerCrossroadIdFor(char);
    if (!(char.seenEvents || []).includes(careerEventId) && !scheduledKey.some((it) => it.forcedEventId === careerEventId)) {
      scheduledKey.push({ kind: 'major', forcedEventId: careerEventId });
    }
  } else if (char.job === 'Outcast' && char.flags?.includes('CareerApplicationFailed') &&
             !isOutskirts(char) && age >= 16 && age <= 45 && char.lastCareerApplicationAge !== age) {
    scheduledKey.push({ kind: 'major', forcedEventId: 'ad_career_second_application' });
  } else if (char.job === 'Syndicate' && !char.finger && !char.flags?.includes('IndependentSyndicate') && !(char.seenEvents || []).includes('syn_choose_finger_allegiance') &&
             ((char.merit || 0) >= 15 && ((char.stats?.rep || 0) >= 20 || (char.heat || 0) >= 25))) {
    if (!scheduledKey.some((it) => it.forcedEventId === 'syn_choose_finger_allegiance')) {
      scheduledKey.push({ kind: 'major', forcedEventId: 'syn_choose_finger_allegiance' });
    }
  } else if (!scheduledKey.some((it) => it.kind === 'major') && majorIsDue(char, rng)) {
    scheduledKey.push({ kind: 'major' });
  }

  if (char.job === 'Fixer' && age >= 28 && age <= 38 && char.fixerGrade >= 2 && char.fixerGrade <= 6 &&
      !char.flags.includes('Distorted') && !char.seenEvents.includes('fixer_seven_unclaimed_dossier') && rng() < 0.018) {
    scheduledKey.push({ kind: 'major', forcedEventId: 'fixer_seven_unclaimed_dossier' });
  }

  // The city keeps its Colors and its Finger heads alive: that offer comes soon after they reach the top
  const longevityId = apexLongevityEventId(char);
  if (longevityId && age >= 38 && !char.flags.includes('apex_longevity_done') && !(char.seenEvents || []).includes(longevityId) &&
      !scheduledKey.some((it) => it.forcedEventId === longevityId) && rng() < 0.5) {
    scheduledKey.push({ kind: 'major', forcedEventId: longevityId });
  }

  const nextFixerTrial = getNextFixerPromotion(char);
  if (nextFixerTrial?.isEligible && char.fixerTrialRetryGrade === nextFixerTrial.grade &&
      char.lastFixerExamAge != null && char.age > char.lastFixerExamAge &&
      !scheduledKey.some((it) => it.kind === 'major' && !it.forcedEventId)) {
    scheduledKey.unshift({ kind: 'major' });
  }
  const nextOtherTrial = getOtherCareerPromotion(char);
  if (careerTrialRetryDue(char, nextOtherTrial) &&
      !scheduledKey.some((it) => it.kind === 'major' && !it.forcedEventId)) {
    scheduledKey.unshift({ kind: 'major' });
  }

  // Fixer license debt collection due (1-year grace period ended)
  const activeDebt = (char.debts || []).find((d) => d.id === 'fixer_license_debt' && d.status === 'active' && char.age >= d.nextDueAge);
  if (activeDebt && !scheduledKey.some((it) => it.forcedEventId === 'csq_fixer_license_debt_due')) {
    scheduledKey.unshift({ kind: 'major', forcedEventId: 'csq_fixer_license_debt_due' });
  }

  // Independent Syndicate rank promotion when requirements are met
  const nextIndieRank = (char.syndicateRank || 0) + 1;
  if (nextIndieRank <= 3 && isIndependentSyndicateEligibleForRank(char, nextIndieRank)) {
    const promoId = `syn_indie_promo_rank${nextIndieRank}`;
    if (!(char.seenEvents || []).includes(promoId) && !scheduledKey.some((it) => it.forcedEventId === promoId)) {
      scheduledKey.unshift({ kind: 'major', forcedEventId: promoId });
    }
  }

  // Finger mission: a member is handed one of their Finger's own jobs in most years, as a Fixer is handed a Request
  if (char.job === 'Syndicate' && char.finger && !char.flags.includes('Distorted') && age >= 19 && rng() < FINGER_MISSION_CHANCE) {
    const pool = FINGER_MISSIONS.filter((e) => e.finger === char.finger && isEventEligible(e, char));
    const mission = pool.length ? pool[Math.floor(rng() * pool.length)] : null;
    if (mission && !scheduledKey.some((it) => it.forcedEventId === mission.id)) {
      scheduledKey.push({ kind: 'major', forcedEventId: mission.id });
    }
  }

  // Fixer combat contract: tactical commission
  // Every career with contracts is offered them, not only Fixers (see careerContracts.js)
  if (contractRouteOf(char) && age >= careerAgeOf(char) + 1 && rng() < contractOfferChance(char) && !scheduledKey.some((it) => it.kind === 'contract')) {
    scheduledKey.push({ kind: 'contract' });
  }

  const opportunity = careerOpportunity(char) || syndicateApexOpportunity(char);
  if (opportunity && rng() < opportunity.chance && scheduledKey.length < 4 &&
      !scheduledKey.some((item) => opportunity.ids.includes(item.id))) {
    const id = opportunity.ids[Math.floor(rng() * opportunity.ids.length)];
    const event = LIFE_MINORS.find((item) => item.id === id);
    if (event && matchesEventContext(event, char)) {
      scheduledKey.push({ kind: 'minor', id });
      remember(char, id);
      logDecision(char, event, { vi: opportunity.route === 'finger_apex' ? 'Đặc quyền người đứng đầu Ngón Tay' : 'Thiếu thành tích cho bậc kế tiếp', en: opportunity.route === 'finger_apex' ? 'Syndicate Apex privilege' : 'A chance to close the next rank gap', w: opportunity.chance }, 'minor');
    }
  }

  // Offer care when injured or distressed, and gear maintenance for equipped careers.
  // Need decides whether one is due; how recently and how often it played decides how likely.
  if (!char.flags.includes('Distorted')) {
    const careDue = (id, p) => !scheduledKey.some((it) => it.id === id) && !(char.recent || []).slice(-3).includes(id) && rng() < p * Math.max(0.1, freshness(id, char.recent, char.seenCount));
    const scheduleCare = (id) => {
      scheduledKey.push({ kind: 'minor', id });
      remember(char, id);
    };
    if (char.stats.health < 72 && !isOutskirts(char)) {
      const medId = age < 18 ? 'm_med_child_remedy' : nest ? 'm_med_nest_infirmary' : (char.stats.health <= 64 && char.stats.wealth >= 20 && rng() < 0.45 ? 'm_med_blackstreet_doctor_organ' : 'm_med_backstreet_clinic');
      if (careDue(medId, 0.75)) scheduleCare(medId);
    } else if (char.stats.sanity < 70 && age >= 16 && !isOutskirts(char)) {
      if (careDue('m_wellness_hamham_lunch', 0.65)) scheduleCare('m_wellness_hamham_lunch');
    } else if (char.stats.wealth >= 35 && age >= 18 && !isOutskirts(char) && (['Fixer', 'Color Fixer', 'Syndicate'].includes(char.job) || charHasWorkshopAccess(char))) {
      if (careDue('m_wellness_workshop_tuneup', 0.25)) scheduleCare('m_wellness_workshop_tuneup');
    }
  }

  // Collect Minor choices: small interactive decisions with time limit
  // A calm temperament runs quiet years, a dramatic one busy years
  const drama = traitsOf(char).drama;
  const roll = rng();
  const noneP = Math.min(0.45, Math.max(0.08, 0.25 / drama));
  const twoP = Math.min(0.45, Math.max(0.12, 0.25 * drama));
  const targetMinorCount = age <= 2 ? 0 : age < 7 ? (roll < 0.45 * drama ? 1 : 0) : roll < noneP ? 0 : roll < 1 - twoP ? 1 : 2;
  const scheduledMinors = scheduledKey.filter((it) => it.kind === 'minor').length;
  const pickedMinors = [];
  for (let i = scheduledMinors; i < targetMinorCount; i++) {
    const pool = eligibleMinors(char).filter((m) => !scheduledKey.some((it) => it.id === m.id) && !pickedMinors.some((it) => it.id === m.id));
    const pick = pickWeighted(pool, weightOf(char), rng);
    if (pick) {
      pickedMinors.push({ kind: 'minor', id: pick.id });
      remember(char, pick.id);
      const r = directorWeight(pick, char);
      logDecision(char, pick, { ...r.reason, w: r.w }, 'minor');
    }
  }

  // 2. Seasonal slot orchestration across the 4 seasons:
  // Slot 0: Spring (t ~ 0.08 - 0.20)
  // Slot 1: Summer (t ~ 0.32 - 0.44)
  // Slot 2: Autumn (t ~ 0.56 - 0.68)
  // Slot 3: Winter (t ~ 0.80 - 0.92)
  const SEASON_BANDS = [
    { idx: 0, minT: 0.08, maxT: 0.20, season: SEASONS[0] }, // Spring
    { idx: 1, minT: 0.32, maxT: 0.44, season: SEASONS[1] }, // Summer
    { idx: 2, minT: 0.56, maxT: 0.68, season: SEASONS[2] }, // Autumn
    { idx: 3, minT: 0.80, maxT: 0.92, season: SEASONS[3] }  // Winter
  ];

  const slots = [null, null, null, null];

  // Distribute key moments to appropriate dramatic seasons:
  for (const it of scheduledKey) {
    if (slots.every(Boolean)) break;
    if (it.kind === 'major') {
      // Majors feel climactic in Autumn (2) or Winter (3)
      const s = slots[3] === null ? 3 : (slots[2] === null ? 2 : (slots[1] === null ? 1 : 0));
      slots[s] = it;
    } else if (it.kind === 'contract') {
      // Fixer contracts open in Spring (0) or Summer (1)
      const s = slots[0] === null ? 0 : (slots[1] === null ? 1 : (slots[2] === null ? 2 : 3));
      slots[s] = it;
    } else if (it.kind === 'minor') {
      const s = slots.findIndex((sl) => sl === null);
      if (s >= 0) slots[s] = it;
    }
  }

  // Distribute minors to remaining empty slots
  for (const it of pickedMinors) {
    const s = slots.findIndex((sl) => sl === null);
    if (s >= 0) slots[s] = it;
  }

  // Seasonal Mishap check (Fate Engine: accidental hazard, illness, violence, wear)
  if (char.age >= 1) {
    const mishap = rollSeasonMishap(char, rng);
    if (mishap) {
      const targetSlot = slots[3] === null ? 3 : (slots[2] === null ? 2 : slots.findIndex((sl) => sl === null));
      if (targetSlot >= 0) {
        slots[targetSlot] = { kind: 'mishap', mishap };
      }
    }
  }

  // Fill remaining slots with Dailies (Storytelling lore slices or resource living events)
  const poolDailies = eligibleDailies(char);
  if (char.age <= 4) {
    // In early childhood (ages 0-4), exactly ONE passive daily event is scheduled per year
    // This allows young life to feel atmospheric without repetitive text spamming
    const existingCount = slots.filter(Boolean).length;
    if (existingCount === 0) {
      // Rotate natural seasons: age 0 -> slot 1 (Summer), age 1 -> slot 2 (Autumn), age 2 -> slot 3 (Winter), etc.
      const targetSlot = (char.age + 1) % 4;
      const unseen = poolDailies.filter((d) => !char.seenEvents?.includes(d.id) && !char.recent?.includes(d.id));
      const pool = unseen.length > 0 ? unseen : poolDailies;
      const pick = pickWeighted(pool, weightOf(char), rng) || pool[0];
      if (pick) {
        slots[targetSlot] = { kind: 'daily', id: pick.id };
        remember(char, pick.id);
      }
    }
  } else {
    const canScheduleNpcCallback = (char.npcCallbackCount || 0) < 6 && (char.age - (char.lastCallbackAge ?? -99)) >= 2;
    let scheduledNpcCallback = false;
    for (let s = 0; s < 4; s++) {
      if (slots[s] === null) {
        const alreadyPickedIds = slots.filter(Boolean).map((sl) => sl.id);
        let available = poolDailies.filter((d) => !alreadyPickedIds.includes(d.id));
        if (available.length === 0) {
          const allAgeDailies = LIFE_DAILIES.filter((d) => !(d.once && (char.seenEvents || []).includes(d.id)) && matchesEventContext(d, char));
          available = allAgeDailies.filter((d) => !alreadyPickedIds.includes(d.id));
        }
        if (!canScheduleNpcCallback || scheduledNpcCallback) {
          available = available.filter((d) => !d.tags?.includes('npc_callback'));
        }
        const callbackCandidates = (canScheduleNpcCallback && !scheduledNpcCallback) ? available.filter((d) => d.tags?.includes('npc_callback')) : [];
        const pickPool = callbackCandidates.length > 0 ? callbackCandidates : available;
        const pick = pickWeighted(pickPool, weightOf(char), rng) || pickPool[0];
        if (pick) {
          const isCallback = Boolean(pick.tags?.includes('npc_callback'));
          if (isCallback) scheduledNpcCallback = true;
          slots[s] = { kind: 'daily', id: pick.id, callback: isCallback };
          remember(char, pick.id);
        }
      }
    }
  }

  // A quiet year may leave one plain slot empty; a busy one adds a second small moment to a season
  const isPlain = (it) => it && (it.kind === 'daily') && !it.callback;
  const extras = {};
  if (age > 4) {
    const plainSlots = [0, 1, 2, 3].filter((s) => isPlain(slots[s]));
    if (plainSlots.length > 1 && rng() < 0.10 / drama) {
      slots[plainSlots[Math.floor(rng() * plainSlots.length)]] = null;
    }
    for (let s = 0; s < 4; s++) {
      if (!slots[s] || rng() >= 0.14 * drama) continue;
      const taken = new Set([...slots.filter(Boolean).map((sl) => sl.id), ...Object.values(extras).map((e) => e.id)]);
      const useMinor = rng() < 0.3;
      const pool = (useMinor ? eligibleMinors(char) : poolDailies).filter((e) => !taken.has(e.id) && (useMinor || !e.tags?.includes('npc_callback')));
      const pick = pickWeighted(pool, weightOf(char), rng);
      if (pick) {
        extras[s] = { kind: useMinor ? 'minor' : 'daily', id: pick.id, extra: true };
        remember(char, pick.id);
      }
    }
  }

  // Build the final chronological plan with precise seasonal coordinates
  const planItems = [];
  for (let s = 0; s < 4; s++) {
    const band = SEASON_BANDS[s];
    const it = slots[s];
    const extra = extras[s];
    if (!it && !extra) continue;
    const mid = (band.minT + band.maxT) / 2;
    const at = (lo, hi) => Math.round((lo + rng() * (hi - lo)) * 1000) / 1000;
    // Two moments in one season share the band's halves so they never land on top of each other
    if (it) planItems.push({ ...it, t: extra ? at(band.minT, mid) : at(band.minT, band.maxT), seasonIdx: s, season: band.season });
    if (extra) planItems.push({ ...extra, t: it ? at(mid, band.maxT) : at(band.minT, band.maxT), seasonIdx: s, season: band.season });
  }

  const annual = annualMeritMoment(char, planItems, rng);
  if (annual) planItems.push(annual);

  planItems.sort((a, b) => a.t - b.t);

  char.plan = planItems;
  char.planCursor = 0;
  scheduleForbiddenEncounter(char, rng);
  offerYearLeads(char, rng);
  return char;
}

/* ---------- running a moment ---------- */

export function runPlanItem(charState, item, rng) {
  const char = charState;
  const sIdx = item.seasonIdx ?? seasonIdxAt(item.t);
  char.seasonIdx = sIdx;
  const seasonObj = SEASONS[sIdx];

  if (item.kind === 'mishap') {
    const m = item.mishap;
    if (!m) return char;
    char.recentMishaps = [...(char.recentMishaps || []).slice(-4), m.id];
    const fx = {};
    if (m.dmg) fx.health = -m.dmg;
    if (m.san) fx.sanity = -m.san;
    if (m.ahn) fx.wealth = -m.ahn;
    const deltas = applyFx(char, fx);
    pushLog(char, { key: m.id, type: 'danger', vi: interpolateText(m.vi, char), en: interpolateText(m.en, char), deltas, season: seasonObj }, item.t);

    if (m.fatal) {
      applyFatalOrCompanionSave(char, m.deathVi, m.deathEn, rng);
    }
    settle(char, item.t, rng);
    if (char.alive && !char.pendingMinor && !char.flags.includes('Distorted') && char.stats.health <= 65 && rng() < 0.7) {
      const careId = char.age < 18 ? 'm_med_child_remedy' : isNest(char) ? 'm_med_nest_infirmary' : 'm_med_backstreet_clinic';
      const care = LIFE_MINORS.find((entry) => entry.id === careId);
      if (care && matchesEventContext(care, char)) {
        char.pendingMinor = {
          id: care.id,
          t: item.t,
          vi: interpolateText(care.vi, char),
          en: interpolateText(care.en, char),
          choices: care.choices.map((choice) => ({ vi: interpolateText(choice.vi, char), en: interpolateText(choice.en, char), fx: choice.fx, out: choice.out, need: choice.need, costAhn: choice.costAhn, ...(choice.lasting ? { lasting: { vi: interpolateText(choice.lasting.vi, char), en: interpolateText(choice.lasting.en, char) } } : {}) })),
          ignore: care.ignore || null,
          remainingMs: minorWindowFor(char)
        };
      }
    }
    return char;
  }

  if (item.kind === 'daily') {
    const def = LIFE_DAILIES.find((d) => d.id === item.id);
    if (!def || !matchesEventContext(def, char) || (def.once && (char.seenEvents || []).includes(def.id))) return char;
    if (def.tags?.includes('npc_callback')) {
      if ((char.npcCallbackCount || 0) >= 6 || (char.age - (char.lastCallbackAge ?? -99)) < 2) return char;
      char.lastCallbackAge = char.age;
      char.npcCallbackCount = (char.npcCallbackCount || 0) + 1;
    }
    if (def.once) {
      char.seenEvents = [...(char.seenEvents || []), def.id];
    }
    const dailyFx = PRINTED_NUMBERS.test(def.vi || '') ? def.fx : varyEffects(def.fx, rng, traitsOf(char));
    const deltas = applyFx(char, dailyFx);
    applyChoiceExtras(char, [def], deltas, rng, { eventId: def.id, role: def.need?.npc || def.keepRole || null });
    markTheme(char, def);
    const isPureLore = !def.fx || Object.keys(def.fx).length === 0;
    const logType = def.tone || (isPureLore ? 'lore' : 'daily');
    pushLog(char, { key: def.id, type: logType, vi: interpolateText(def.vi, char), en: interpolateText(def.en, char), deltas, season: seasonObj }, item.t);
    return settle(char, item.t, rng);
  }

  if (item.kind === 'minor') {
    const def = LIFE_MINORS.find((m) => m.id === item.id);
    if (!def || !matchesEventContext(def, char)) return char;
    markTheme(char, def);

    char.pendingMinor = {
      id: def.id,
      t: item.t,
      annualMerit: Boolean(item.annualMerit),
      vi: interpolateText(def.vi, char),
      en: interpolateText(def.en, char),
      choices: def.choices.map((c) => ({ vi: interpolateText(c.vi, char), en: interpolateText(c.en, char), fx: c.fx, out: c.out, need: c.need, costAhn: c.costAhn, ...(c.lasting ? { lasting: { vi: interpolateText(c.lasting.vi, char), en: interpolateText(c.lasting.en, char) } } : {}) })),
      ignore: def.ignore || null,
      remainingMs: item.forbiddenEncounter ? FIRST_MINOR_WINDOW_MS : minorWindowFor(char)
    };
    return char;
  }

  if (item.kind === 'major') {
    let event = null;
    let weaver = char.weaver;
    if (item.forcedEventId) {
      const candidate = CONSEQUENCE_EVENTS.find((e) => e.id === item.forcedEventId) ||
              ALL_STORY_EVENTS.find((e) => e.id === item.forcedEventId);
      if (candidate && isEventEligible(candidate, char, { scripted: true })) {
        event = candidate;
        if (item.thread) {
          closeThreads(char, item.forcedEventId, { threadId: item.thread, playedEventId: item.forcedEventId });
          weaver = char.weaver;
        }
      }
    }
    if (!event) {
      const res = selectEventWithWeaverAI({
        weaver: char.weaver,
        char,
        allPools: ALL_STORY_EVENTS,
        consequencePool: CONSEQUENCE_EVENTS,
        rng
      });
      event = res.event;
      weaver = res.weaver;
    }
    char.weaver = weaver;
    if (event) {
      markTheme(char, event);
      const vi = splitTitle(interpolateText(event.vi, char));
      const en = splitTitle(interpolateText(event.en, char));
      const targetGrade = event.id.startsWith('fixer_promo_')
        ? event.choices?.find((choice) => choice.setFixerGrade != null)?.setFixerGrade
        : null;
      const examChance = targetGrade == null ? null : Math.round(fixerPromotionSuccessChance(char, targetGrade) * 100);
      const examLoss = targetGrade == null ? null : fixerPromotionFailureEffects(targetGrade);
      const otherTrial = careerTrialForEvent(event.id);
      const otherChance = otherTrial ? Math.round(careerPromotionSuccessChance(char, otherTrial) * 100) : null;
      const otherLoss = otherTrial ? careerPromotionFailureEffects(otherTrial) : null;
      const lossText = otherLoss ? Object.entries(otherLoss).map(([key, value]) => `${value} ${key}`).join(', ') : '';
      const examNoteVi = examChance != null
        ? ` Tỉ lệ đỗ hiện tại: ${examChance}%. Nếu trượt: ${examLoss.health} HP, ${examLoss.wealth} Ahn, ${examLoss.sanity} SP. Có thể thi lại từ năm sau nếu còn đủ điều kiện.`
        : otherChance != null ? ` Tỉ lệ được công nhận: ${otherChance}%. Nếu trượt: ${lossText}. Có thể trở lại từ năm sau nếu còn đủ điều kiện.` : '';
      const examNoteEn = examChance != null
        ? ` Current pass chance: ${examChance}%. On failure: ${examLoss.health} HP, ${examLoss.wealth} Ahn, ${examLoss.sanity} SP. You may retry next year if still eligible.`
        : otherChance != null ? ` Recognition chance: ${otherChance}%. On failure: ${lossText}. You may return next year if still eligible.` : '';
      const echo = event.youthEcho ? youthEchoOf(char) : null;
      const echoNoteVi = echo ? ` Mặt sau là nét chữ của chính bạn năm ${echo.age} tuổi: "${echo.titleVi}". Dòng dưới ghi điều bạn đã quyết hồi đó: ${echo.choiceVi}.` : '';
      const echoNoteEn = echo ? ` On the back, in your own hand at ${echo.age}: "${echo.titleEn}". The line beneath records what you decided then: ${echo.choiceEn}.` : '';
      const threadObj = item.thread ? char.weaver?.pendingThreads?.find((t) => t.id === item.thread) : null;
      char.pendingEvent = {
        ...event,
        // Choice labels name people too ({spouse}, {parentName}), so they get the same treatment as the text
        choices: (event.choices || []).map((c) => ({ ...c, labelVi: interpolateText(c.labelVi, char), labelEn: interpolateText(c.labelEn, char), ...(c.lasting ? { lasting: { vi: interpolateText(c.lasting.vi, char), en: interpolateText(c.lasting.en, char) } } : {}) })),
        titleVi: vi.title,
        titleEn: en.title,
        displayVi: vi.body + examNoteVi + echoNoteVi,
        displayEn: en.body + examNoteEn + echoNoteEn,
        t: item.t,
        isCausalCallback: Boolean(item.isCausal || event.isCausalCallback),
        causalReasonVi: threadObj?.reasonVi || null,
        causalReasonEn: threadObj?.reasonEn || null
      };
    }
    return char;
  }

  if (item.kind === 'contract' && contractRouteOf(char)) {
    char.pendingContract = { ...generateFixerContract(char, rng), t: item.t };
  }
  return char;
}

/** Checks death and promotions after anything changed the character. */
export function settle(char, t, rng = Math.random) {
  if (char.alive && char.stats.health <= 0) {
    applyFatalOrCompanionSave(
      char,
      'Gục xuống vì vết thương và kiệt sức',
      'Collapsed from wounds and exhaustion'
    );
  }
  if (char.alive && char.stats.sanity <= 0) {
    handleSanityBreakdown(char, rng);
  }
  if (char.alive) {
    const promo = checkPromotions(char);
    promo.forEach((p) => char.logs.push({ ...p, season: seasonAt(t) }));
  }
  evaluateCharacterAchievements(char);
  return char;
}

/** Resolves a minor choice. idx = -1 lets the moment pass. */
export function resolveMinor(charState, idx, rng) {
  const char = cloneChar(charState);
  const prompt = char.pendingMinor;
  if (!prompt) return char;
  const currentDef = LIFE_MINORS.find(m => m.id === prompt.id);
  if (!matchesEventContext(currentDef, char)) { char.pendingMinor = null; return char; }
  char.pendingMinor = null;
  char.seenEvents = [...char.seenEvents, prompt.id];
  closeThreads(char, prompt.id);

  const def = LIFE_MINORS.find((m) => m.id === prompt.id);
  const ignore = def?.ignore || { vi: 'Để nó trôi qua', en: 'Let it pass', rvi: 'Bạn không làm gì cả. Chuyện cũng qua.', ren: 'You did nothing. It passed.' };
  const choice = idx >= 0 ? def?.choices[idx] : ignore;
  if (!choiceIsAvailable(choice, char)) return cloneChar(charState);
  if (!prompt.annualMerit) char.firstTimedMinorSeen = true;

  let outcome = choice;
  const traits = traitsOf(char);
  if (Array.isArray(choice.out) && choice.out.length) {
    const weighted = weightedOutcomes(choice, char, 'minor');
    outcome = pickWeighted(weighted, (entry) => entry.weight, rng)?.outcome || choice;
  }
  const resultText = `${outcome.rvi || ''}${choice.rvi || ''}`;
  const baseEffects = mergeEffects(choice, outcome);
  if (choice.costAhn && (choice.fx?.wealth ?? choice.effects?.wealth) === -choice.costAhn) {
    baseEffects.wealth = (baseEffects.wealth || 0) + choice.costAhn;
  }
  // A result that prints its own numbers must land on exactly those numbers
  const mergedEffects = PRINTED_NUMBERS.test(resultText) ? baseEffects : varyEffects(baseEffects, rng, traits);
  for (const key of [...(choice.exactFx || []), ...(outcome === choice ? [] : outcome.exactFx || [])]) {
    if (key in baseEffects) mergedEffects[key] = baseEffects[key];
  }
  if (choice.costAhn) mergedEffects.wealth = (mergedEffects.wealth || 0) - choice.costAhn;
  const deltas = applyFx(char, mergedEffects, { exactRep: PRINTED_NUMBERS.test(resultText) });
  [...(choice.flags || []), ...(outcome === choice ? [] : outcome.flags || [])].forEach((f) => {
    if (!char.flags.includes(f)) char.flags.push(f);
  });
  // Resolve names before a fate removes the person from the text
  const resultVi = interpolateText(outcome.rvi || choice.rvi || '', char);
  const resultEn = interpolateText(outcome.ren || choice.ren || '', char);
  const scar = interpolateText(outcome.scar || choice.scar || '', char);
  if (addScar(char, scar)) {
    deltas.push({ k: 'scar', name: scar });
  }
  markHabitChallengeTriggered(char, def);
  applyChoiceExtras(char, outcome === choice ? [choice] : [choice, outcome], deltas, rng, {
    eventId: prompt.id,
    choiceId: idx >= 0 ? `${prompt.id}_c${idx}` : `${prompt.id}_ignore`,
    event: def,
    role: currentDef?.need?.npc || null
  });
  if (outcome.setJob || choice.setJob) {
    const nextJob = outcome.setJob || choice.setJob;
    if (nextJob === 'Wing Employee' && char.job !== 'Wing Employee') char.wingEmployerId = char.regionId;
    char.job = nextJob;
  }

  pushLog(
    char,
    {
      key: prompt.id,
      type: idx < 0 ? 'daily' : 'choice',
      choiceVi: idx < 0 ? null : interpolateText(choice.vi, char),
      choiceEn: idx < 0 ? null : interpolateText(choice.en, char),
      review: {
        vi: prompt.vi,
        en: prompt.en,
        choices: (prompt.choices || []).map((entry) => ({ vi: entry.vi, en: entry.en })),
        selected: idx
      },
      vi: `${prompt.vi}\n${resultVi}`.trim(),
      en: `${prompt.en}\n${resultEn}`.trim(),
      deltas,
      passed: idx < 0
    },
    prompt.t
  );
  char.weaver = updateDramaTension(char.weaver, char);
  return settle(char, prompt.t, rng);
}

/** The moment the bar is waiting for next, or null when the year is done. */
export const nextPlanItem = (char) => (char.plan || [])[char.planCursor || 0] || null;

/**
 * Runs every moment whose time has come at `progress` (0–100). Stops at the first
 * moment that asks for a decision.
 */
export function runDueItems(charState, progress, rng) {
  if (charState.pendingDungeon) return { char: charState, changed: false };
  let char = charState;
  let changed = false;
  while (char.alive && !char.pendingDungeon && !char.pendingEvent && !char.pendingContract && !char.pendingModal && !char.pendingMinor) {
    const item = nextPlanItem(char);
    if (!item || item.t * 100 > progress) break;
    if (!changed) {
      char = cloneChar(char);
      changed = true;
    }
    char.planCursor = (char.planCursor || 0) + 1;
    char = runPlanItem(char, item, rng);
    if ((char.taboo || 0) >= 3) break;
  }
  return { char, changed };
}

