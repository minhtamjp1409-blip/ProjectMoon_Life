import { advanceCityCondition } from './cityConditions.js';
import { contractRouteOf } from '../data/careerContracts.js';
import { affiliationYearTick } from './affiliation.js';
import { planFirstGate } from './dungeonPacing.js';
import { careerAgeOf, reachedCareerAge, effectiveMinAge } from './careerAge.js';
import { rememberResonance, hasEgoOpportunity, colorTrialAvailable, rollEgoEncounter } from './awakeningProgress.js';
import { simulateNpcAutonomousLife } from './narrativeArcEngine.js';
import { matchesNeed, matchesEventContext, choiceIsAvailable, mergeEffects, isNestResident, isOutsideCity, npcIsActive } from './eventConditions.js';
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
  careerPromotionFailureEffects
} from './careerPipeline.js';
import { rollSeasonMishap } from './fateEngine.js';
// ============================================================================
// YEAR PLANNER: each year is a plan of 1–4 moments spread across the seasons.
// The bar sweeps the year; when it passes a moment's time `t` (0–1) that moment
// runs: a daily line that nudges stats, a minor choice that keeps time flowing
// (and lets the moment pass if you don't answer), a major event or a Fixer
// contract that stops time. Every stat change is recorded as a visible delta.
// ============================================================================

import {
  SEASONS,
  ALL_STORY_EVENTS,
  clamp,
  cloneChar,
  interpolateText,
  checkPromotions,
  evaluateCharacterAchievements,
  applyFatalOrCompanionSave,
  handleSanityBreakdown,
  woundDeath,
  generateFixerContract
} from './gameEngine.js';
import { selectEventWithWeaverAI, updateDramaTension, FATE_OMENS, isEventEligible } from './weaverAI.js';
import { CONSEQUENCE_EVENTS } from '../data/eventsChildhood.js';
import { REGIONS } from '../data/worldData.js';
import { LIFE_DAILIES as DAILIES_FIRST } from '../data/lifeDailies.js';
import { LIFE_MINORS as MINORS_FIRST } from '../data/lifeMinors.js';
import { LIFE_MINORS_BONDS } from '../data/lifeMinorsBonds.js';
import { LIFE_MINORS_2 } from '../data/lifeMinors2.js';
import { LIFE_DAILIES_3, LIFE_MINORS_3 } from '../data/lifeMinors3.js';
import { YEAR_END_LINES } from '../data/yearEndLines.js';
import { LIFE_MINORS_4 } from '../data/lifeMinors4.js';
import { LIFE_MINORS_5 } from '../data/lifeMinors5.js';
import { LIFE_MINORS_SEEDS } from '../data/lifeMinorsSeeds.js';
import { WORKSHOP_VISIT_MINORS, WORKSHOP_VISIT_DAILIES } from '../data/eventsWorkshopVisits.js';
import { FINGER_MINORS, FINGER_DAILIES, FINGER_MISSIONS } from '../data/eventsFingers.js';
import { LIFE_MINORS_KIDS } from '../data/lifeMinorsKids.js';
import { LIFE_MINORS_CONTRACTS } from '../data/lifeMinorsContracts.js';
import { THREAD_MINORS } from '../data/narrative/causalThreads.js';
import { SCAR_CALLBACKS } from '../data/lifeScarCallbacks.js';
import { LIFE_CAREER_OPPORTUNITIES } from '../data/lifeCareerOpportunities.js';
import { ANNUAL_MERIT_OPPORTUNITIES } from '../data/annualMeritOpportunities.js';
import { apexLongevityEventId } from '../data/eventsApexTwilight.js';
import { EXPANDED_DAILIES } from '../data/narrative/dailies.js';
import { DAILIES_2 } from '../data/narrative/dailies2.js';
import { EXPANSION_LIFE_MINORS, EXPANSION_LIFE_DAILIES } from '../data/lifeMinorsAndDailiesExpansion.js';
import { cityArchiveAPI } from '../services/api/cityArchiveAPI.js';

const FINGER_MISSION_CHANCE = 0.4;

export const LIFE_MINORS = [...MINORS_FIRST, ...LIFE_MINORS_2, ...LIFE_MINORS_3, ...LIFE_MINORS_4, ...LIFE_MINORS_5, ...LIFE_MINORS_SEEDS, ...WORKSHOP_VISIT_MINORS, ...FINGER_MINORS, ...LIFE_MINORS_KIDS, ...LIFE_MINORS_CONTRACTS, ...LIFE_MINORS_BONDS, ...THREAD_MINORS, ...SCAR_CALLBACKS, ...LIFE_CAREER_OPPORTUNITIES, ...ANNUAL_MERIT_OPPORTUNITIES, ...EXPANSION_LIFE_MINORS];
export const LIFE_DAILIES = [...DAILIES_FIRST, ...LIFE_DAILIES_3, ...EXPANDED_DAILIES, ...DAILIES_2, ...EXPANSION_LIFE_DAILIES, ...WORKSHOP_VISIT_DAILIES, ...FINGER_DAILIES];
import {
  directorWeight,
  markTheme,
  logDecision,
  dueMinorThreads,
  closeThreads,
  applyChoiceExtras,
  driftBonds,
  keepInTouch,
  ageNpcCompanions,
  npcActive,
  hasMemory
} from './director.js';
import { freshness, varyEffects, traitsOf, PRINTED_NUMBERS } from './variance.js';
import { BALANCE, healAmount, calmAmount, agingLoss, effectiveAge, driftOf, hasEstablishedStanding, reputationGain } from './economyModel.js';
import { activeScarCount, addScar, scarAnnualEffects } from './scarModel.js';
import { weightedOutcomes } from './outcomeOdds.js';

export const MINOR_WINDOW_MS = 15000;
// How many recent moments freshness looks back over (see variance.js)
const RECENT_LIMIT = 120;

export const STAT_KEYS = ['health', 'sanity', 'wealth', 'network', 'rep'];
const EXTRA_KEYS = ['heat', 'resonance', 'taboo', 'merit'];
const LIMITS = { heat: [0, 100], resonance: [0, 100], taboo: [0, 3], merit: [0, 9999] };

/* ---------- small helpers ---------- */

const seasonAt = (t) => SEASONS[Math.min(3, Math.floor((t || 0) * 4))];
const seasonIdxAt = (t) => Math.min(3, Math.floor((t || 0) * 4));

function pickWeighted(list, weightOf, rng) {
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
    char.stats[k] = clamp(before + amount, 0, 100);
    const d = char.stats[k] - before;
    if (d) deltas.push({ k, v: d });
  }
  for (const k of EXTRA_KEYS) {
    if (!fx[k]) continue;
    const [lo, hi] = LIMITS[k];
    const before = char[k] || 0;
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
    const d = (next[k] || 0) - (prev[k] || 0);
    if (d) out.push({ k, v: d });
  }
  return out;
}

function pushLog(char, entry, t) {
  const idx = seasonIdxAt(t);
  char.logs.push({
    id: `log_${char.age}_${char.logs.length}_${entry.key || 'x'}`,
    age: char.age,
    season: entry.season || SEASONS[idx],
    ...entry
  });
}

function remember(char, id) {
  char.recent = [...(char.recent || []), id].slice(-RECENT_LIMIT);
  char.seenCount = { ...(char.seenCount || {}), [id]: ((char.seenCount || {})[id] || 0) + 1 };
}

// Split a "[Title] body" event text into its title and body.
export function splitTitle(text) {
  const m = /^\s*\[([^\]]{2,80})\]\s*/.exec(text || '');
  return m ? { title: m[1], body: text.slice(m[0].length) } : { title: null, body: text || '' };
}

/* ---------- choosing what happens this year ---------- */

// Everything that fits the character. Repeats are discouraged by weight (see weightOf), not forbidden,
// so a small pool still draws at random instead of cycling in a fixed order.
function eligibleDailies(char) {
  return LIFE_DAILIES.filter((d) => matchesEventContext(d, char));
}

function eligibleMinors(char) {
  return LIFE_MINORS.filter((m) => {
    if (!matchesEventContext(m, char)) return false;
    if (m.once && (char.seenEvents || []).includes(m.id)) return false;
    return true;
  });
}

const leadEffects = (choice) => [choice?.fx || choice?.effects || {}, ...(choice?.out || choice?.outcomes || []).map((outcome) => outcome.fx || outcome.effects || {})];

function leadRisk(event) {
  const effects = (event.choices || []).flatMap(leadEffects);
  const worst = Math.min(0, ...effects.map((fx) => (fx.health || 0) + (fx.sanity || 0) + Math.min(0, fx.wealth || 0) * 0.4));
  if (worst <= -12 || event.tags?.includes('danger')) return 'danger';
  if (event.choices?.some((choice) => (choice.out || choice.outcomes || []).length) || worst <= -5) return 'uncertain';
  return 'steady';
}

function offerYearLeads(char, rng) {
  if (!char.alive || char.age < 15) {
    char.pendingLead = null;
    return;
  }
  const reserved = new Set((char.plan || []).map((item) => item.id).filter(Boolean));
  const pool = eligibleMinors(char).filter((entry) => !entry.careerOpportunity && !reserved.has(entry.id) && entry.choices?.some((choice) => choiceIsAvailable(choice, char)));
  const selected = [];
  for (const tier of ['steady', 'uncertain', 'danger']) {
    const available = pool.filter((entry) => !selected.some((item) => item.id === entry.id));
    const matched = available.filter((entry) => leadRisk(entry) === tier);
    const pick = pickWeighted(matched.length ? matched : available, weightOf(char), rng);
    // The label is the event's real risk, not the slot it was drawn for, so a fallback pick is never sold as something it is not
    if (pick) selected.push({ id: pick.id, tier: leadRisk(pick) });
  }
  char.pendingLead = selected.length === 3 ? { age: char.age, offers: selected } : null;
}

export function isYearLeadUsable(offer, char) {
  return LIFE_MINORS.some((entry) => entry.id === offer?.id && matchesEventContext(entry, char) && entry.choices?.some((choice) => choiceIsAvailable(choice, char)));
}

export function chooseYearLead(charState, index) {
  const char = cloneChar(charState);
  const draft = char.pendingLead;
  if (!draft) return charState;
  // A draft from another year (old save) or with no offer left can never be answered, so drop it instead of stalling the run
  if (draft.age !== char.age) { char.pendingLead = null; return char; }
  const offers = draft.offers || [];
  const chosen = offers[index];
  if (!isYearLeadUsable(chosen, char)) {
    if (offers.some((offer) => isYearLeadUsable(offer, char))) return charState;
    char.pendingLead = null;
    return char;
  }
  const event = LIFE_MINORS.find((entry) => entry.id === chosen.id);
  const t = 0.265;
  char.plan = [...(char.plan || []), { kind: 'minor', id: chosen.id, t, seasonIdx: 1, season: SEASONS[1], extra: true, lead: true }].sort((a, b) => a.t - b.t);
  char.pendingLead = null;
  char.leadChoice = { age: char.age, id: chosen.id, tier: chosen.tier };
  remember(char, chosen.id);
  logDecision(char, event, { vi: 'Bạn chọn theo manh mối này', en: 'You followed this lead', w: 1 }, 'minor');
  return char;
}

const minorCanEarnMerit = (id) => LIFE_MINORS.some((entry) => entry.id === id &&
  entry.choices?.some((choice) => (choice.fx?.merit || 0) > 0 ||
    (choice.out || choice.outcomes || []).some((outcome) => (outcome.fx?.merit || 0) > 0)));

function annualMeritMoment(char, moments, rng) {
  if (char.job === 'Child' || char.age < careerAgeOf(char) || !char.alive) return null;
  if (moments.some((item) => item?.kind === 'contract')) return null;
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
  const event = pickWeighted(pool, (entry) => freshness(entry.id, char.recent, char.seenCount), rng);
  if (!event) return null;
  const t = [0.235, 0.485, 0.735][Math.floor(rng() * 3)];
  const seasonIdx = seasonIdxAt(t);
  remember(char, event.id);
  logDecision(char, event, { vi: 'Một việc làm có thể ghi vào hồ sơ công trạng', en: 'A commission that can enter the merit record', w: 1 }, 'minor');
  return { kind: 'minor', id: event.id, t, seasonIdx, season: SEASONS[seasonIdx], extra: true, annualMerit: true };
}

// Director weights reach x6; the 0.8 power keeps their order but lets weaker entries through
const weightOf = (char) => (e) => {
  let weight = Math.pow(directorWeight(e, char).w, 0.8) * freshness(e.id, char.recent, char.seenCount);
  if (char.job === 'Syndicate' && e.need?.finger === char.finger && e.id.startsWith('d_')) weight *= 5;
  if (e.id === 'm_fx_request_choice') {
    const next = getNextFixerPromotion(char);
    if (next && next.currentRep < next.repReq) {
      weight *= Math.min(3, 1.5 + (next.repReq - next.currentRep) / 8);
    }
  }
  // The longer you have not seen someone, the more likely a quiet moment with them comes up
  if (e.keepRole) {
    const npc = char.npcs?.[e.keepRole];
    const apart = npc ? Math.max(0, char.age - (npc.lastSeen ?? npc.metAge ?? char.age)) : 0;
    weight *= 1 + Math.min(3, apart * 0.75);
  }
  const opportunity = careerOpportunity(char);
  if (opportunity?.ids?.includes(e.id)) weight *= 1.5 + opportunity.shortage;
  return weight;
};

function majorIsDue(char, rng) {
  const w = char.weaver || {};
  if (char.age <= 4) return false;
  // If Fixer is eligible for next grade exam, schedule major
  if (char.job === 'Fixer' && !char.flags.includes('Distorted')) {
    const nextPromo = getNextFixerPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  // If Syndicate is eligible for next finger promotion, schedule major (Unblocked for Distorted)
  if ((char.job === 'Syndicate' || (char.flags.includes('Distorted') && char.finger)) && char.finger) {
    const nextPromo = getNextFingerPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  // If Wing Employee is eligible for next wing promotion, schedule major
  if (char.job === 'Wing Employee' && !char.flags.includes('Distorted')) {
    const nextPromo = getNextWingPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  if ((reachedCareerAge(char) && char.job === 'Child') && !(char.seenEvents || []).includes('ad_career_crossroad_18')) return true;
  if (char.job === 'Syndicate' && !char.finger && !(char.seenEvents || []).includes('syn_choose_finger_allegiance')) return true;
  if ((w.pendingThreads || []).some((th) => th.kind !== 'minor' && !th.fulfilled && char.age >= th.triggerAge)) return true;
  if (rollEgoEncounter(char, rng) && !(char.seenEvents || []).includes('ego_carmen_crossroad') && !char.flags.includes('EGOAwakened') && !char.flags.includes('Distorted')) return true;
  if (char.job === 'Fixer' && !char.flags.includes('Distorted') && checkColorFixerReadiness(char).ready && !char.flags.includes('ColorFixer') && colorTrialAvailable(char)) return true;
  const gap = w.yearsSinceLastMajor || 0;
  // Childhood: the gap counts from birth, so "every 5 years" used to put the first
  // major event at exactly 5 for everyone. Spread it over 5-9 instead.
  if (char.age < 12) {
    if (gap >= 9) return true;
    return gap >= 3 && rng() < (char.age <= 6 ? 0.3 : 0.4);
  }
  if (gap >= 5) return true;
  if ((char.job === 'Syndicate' || (char.flags?.includes('Distorted') && char.finger)) && (char.fingerRank || 0) >= 3 && gap >= 2 && rng() < 0.65) return true;
  if (char.job === 'Fixer' && char.flags?.includes('ColorFixer') && gap >= 2 && rng() < 0.55) return true;
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
    const storyDef = CONSEQUENCE_EVENTS.find((e) => e.id === th.eventId) || ALL_STORY_EVENTS.find((e) => e.id === th.eventId);
    if (storyDef && isEventEligible(storyDef, char, { scripted: true })) {
      if (!scheduledKey.some((it) => it.forcedEventId === storyDef.id)) {
        scheduledKey.push({ kind: 'major', forcedEventId: storyDef.id, thread: th.id, isCausal: true });
        logDecision(char, storyDef, { vi: th.reasonVi || 'Quả báo đến hạn', en: th.reasonEn || 'Karma comes due', w: 99 }, 'major');
        continue;
      }
    }

    // Drop if far overdue and cannot be resolved
    if (age > th.triggerAge + 8) {
      closeThreads(char, th.eventId);
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
    const careerEventId = isOutskirts(char) ? 'ad_outskirts_crossroad_18' : 'ad_career_crossroad_18';
    if (!(char.seenEvents || []).includes(careerEventId) && !scheduledKey.some((it) => it.forcedEventId === careerEventId)) {
      scheduledKey.push({ kind: 'major', forcedEventId: careerEventId });
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
    const careDue = (id, p) => !scheduledKey.some((it) => it.id === id) && rng() < p * Math.max(0.2, freshness(id, char.recent, char.seenCount));
    const scheduleCare = (id) => {
      scheduledKey.push({ kind: 'minor', id });
      remember(char, id);
    };
    if (char.stats.health < 72 && !isOutskirts(char)) {
      const medId = age < 18 ? 'm_med_child_remedy' : nest ? 'm_med_nest_infirmary' : (char.stats.health <= 64 && char.stats.wealth >= 20 && rng() < 0.45 ? 'm_med_blackstreet_doctor_organ' : 'm_med_backstreet_clinic');
      if (careDue(medId, 0.75)) scheduleCare(medId);
    } else if (char.stats.sanity < 70 && age >= 16 && !isOutskirts(char)) {
      if (careDue('m_wellness_hamham_lunch', 0.65)) scheduleCare('m_wellness_hamham_lunch');
    } else if (char.stats.wealth >= 35 && age >= 18 && !isOutskirts(char) && ['Fixer', 'Syndicate', 'Workshop Craftsman'].includes(char.job)) {
      if (careDue('m_wellness_workshop_tuneup', 0.25)) scheduleCare('m_wellness_workshop_tuneup');
    }
  }

  // Collect Minor choices: small interactive decisions with time limit
  // A calm temperament runs quiet years, a dramatic one busy years
  const drama = traitsOf(char).drama;
  const roll = rng();
  const noneP = Math.min(0.45, Math.max(0.08, 0.25 / drama));
  const twoP = Math.min(0.45, Math.max(0.12, 0.25 * drama));
  const targetMinorCount = age <= 4 ? 0 : age < 7 ? (roll < 0.45 * drama ? 1 : 0) : roll < noneP ? 0 : roll < 1 - twoP ? 1 : 2;
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
      const pick = pickWeighted(poolDailies, weightOf(char), rng) || poolDailies[0];
      if (pick) {
        slots[targetSlot] = { kind: 'daily', id: pick.id };
        remember(char, pick.id);
      }
    }
  } else {
    for (let s = 0; s < 4; s++) {
      if (slots[s] === null) {
        const alreadyPickedIds = slots.filter(Boolean).map((sl) => sl.id);
        let available = poolDailies.filter((d) => !alreadyPickedIds.includes(d.id));
        if (available.length === 0) {
          const allAgeDailies = LIFE_DAILIES.filter((d) => matchesEventContext(d, char));
          available = allAgeDailies.filter((d) => !alreadyPickedIds.includes(d.id));
        }
        const pick = pickWeighted(available, weightOf(char), rng) || available[0];
        if (pick) {
          slots[s] = { kind: 'daily', id: pick.id };
          remember(char, pick.id);
        }
      }
    }
  }

  // A quiet year may leave one plain slot empty; a busy one adds a second small moment to a season
  const isPlain = (it) => it && (it.kind === 'daily');
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
      const pool = (useMinor ? eligibleMinors(char) : poolDailies).filter((e) => !taken.has(e.id));
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
  offerYearLeads(char, rng);
  return char;
}

/**
 * Offloads year planning & career milestone computation to the .NET 8 Director API.
 * Hydrates server-validated 4-season time coordinates and tension scores with full client content.
 */
export async function syncPlanWithBackend(charState, rng) {
  if (!charState || !charState.alive) return charState;
  try {
    const snap = {
      age: charState.age || 0,
      job: charState.job || 'Child',
      regionId: charState.regionId || '1',
      health: charState.stats?.health ?? charState.health ?? 50,
      sanity: charState.stats?.sanity ?? charState.sanity ?? 50,
      wealth: charState.stats?.wealth ?? charState.wealth ?? 0,
      network: charState.stats?.network ?? charState.network ?? 0,
      rep: (charState.stats?.rep ?? charState.rep) || 0,
      merit: charState.merit || 0,
      heat: charState.heat || 0,
      taboo: charState.taboo || 0,
      resonance: charState.resonance || 0,
      fixerGrade: charState.fixerGrade ?? 9,
      finger: charState.finger || 'Thumb',
      fingerRank: charState.fingerRank || 0,
      wingRank: charState.wingRank || 0,
      workshopRank: charState.workshopRank || 0,
      flags: charState.flags || [],
      seenEvents: charState.seenEvents || [],
      recent: charState.recent || [],
      fateOmenId: charState.fateOmenId || '',
      yearsSinceLastMajor: charState.weaver?.yearsSinceLastMajor || 0,
      activeNpcsCount: Object.values(charState.npcs || {}).filter(npcIsActive).length,
      pendingThreads: (charState.weaver?.pendingThreads || []).map((th) => ({
        id: th.id || '',
        eventId: th.eventId || '',
        triggerAge: th.triggerAge || 0,
        fulfilled: Boolean(th.fulfilled),
        kind: th.kind || '',
        reasonVi: th.reasonVi || '',
        reasonEn: th.reasonEn || ''
      }))
    };

    // Saves from before the milestone was computed locally still carry a stale copy
    delete charState.serverMilestone;
    const localPlan = charState.plan || [];

    const [planRes] = await Promise.allSettled([
      cityArchiveAPI.planYear({ seed: `${charState.seed}:${charState.age}`, char: snap })
    ]);

    if (planRes.status === 'fulfilled' && planRes.value?.moments?.length > 0) {
      let serverMoments = planRes.value.moments;
      if (charState.age <= 4 && serverMoments.length > 1) {
        serverMoments = [serverMoments[0]];
      }
      const poolDailies = eligibleDailies(charState);
      const poolMinors = eligibleMinors(charState);
      const hydrated = [];

      for (const sm of serverMoments) {
        if (sm.kind === 'daily') {
          let dailyId = sm.id;
          if (!dailyId || !LIFE_DAILIES.some((d) => d.id === dailyId)) {
            const alreadyPickedIds = hydrated.map((h) => h.id);
            let available = poolDailies.filter((d) => !alreadyPickedIds.includes(d.id));
            if (available.length === 0) {
              const allAgeDailies = LIFE_DAILIES.filter((d) => ageOk(d, charState.age, charState) && matchNeed(d.need, charState));
              available = allAgeDailies.filter((d) => !alreadyPickedIds.includes(d.id));
            }
            const pick = pickWeighted(available, weightOf(charState), rng) || available[0];
            dailyId = pick ? pick.id : (available[0]?.id || poolDailies[0]?.id || 'daily_city_dawn');
          }
          remember(charState, dailyId);
          hydrated.push({
            kind: 'daily',
            id: dailyId,
            t: sm.t,
            season: sm.season,
            seasonIdx: sm.seasonIdx
          });
        } else if (sm.kind === 'minor') {
          let minorId = sm.id;
          if (!minorId || !LIFE_MINORS.some((m) => m.id === minorId)) {
            const alreadyPickedIds = hydrated.map((h) => h.id);
            let available = poolMinors.filter((m) => !alreadyPickedIds.includes(m.id));
            if (available.length === 0) {
              const allAgeMinors = LIFE_MINORS.filter((m) => ageOk(m, charState.age, charState) && matchNeed(m.need, charState) && !(m.once && (charState.seenEvents || []).includes(m.id)));
              available = allAgeMinors.filter((m) => !alreadyPickedIds.includes(m.id));
            }
            const pick = pickWeighted(available, weightOf(charState), rng) || available[0];
            minorId = pick ? pick.id : (available[0]?.id || poolMinors[0]?.id || 'minor_alley_crossroad');
          }
          remember(charState, minorId);
          hydrated.push({
            kind: 'minor',
            id: minorId,
            t: sm.t,
            season: sm.season,
            seasonIdx: sm.seasonIdx,
            thread: sm.thread || '',
            isCausal: sm.isCausal || false
          });
        } else if (sm.kind === 'major') {
          const serverId = sm.forcedEventId || sm.id || '';
          hydrated.push({
            kind: 'major',
            forcedEventId: careerTrialForEvent(serverId) ? '' : serverId,
            t: sm.t,
            season: sm.season,
            seasonIdx: sm.seasonIdx,
            thread: sm.thread || '',
            isCausal: sm.isCausal || false
          });
        } else if (sm.kind === 'contract') {
          hydrated.push({
            kind: 'contract',
            t: sm.t,
            season: sm.season,
            seasonIdx: sm.seasonIdx
          });
        }
      }

      if (contractRouteOf(charState)) {
        const localContract = localPlan.find((item) => item.kind === 'contract');
        const serverContractAt = hydrated.findIndex((item) => item.kind === 'contract');
        if (localContract && serverContractAt < 0) {
          let replaceAt = hydrated.findIndex((item) => item.kind === 'daily');
          if (replaceAt < 0) replaceAt = hydrated.findIndex((item) => item.kind === 'minor' && !item.isCausal);
          if (replaceAt >= 0) hydrated[replaceAt] = localContract;
          else if (hydrated.length < 4) hydrated.push(localContract);
        } else if (!localContract && serverContractAt >= 0) {
          const old = hydrated[serverContractAt];
          const usedIds = new Set(hydrated.map((item) => item.id));
          const available = poolDailies.filter((item) => !usedIds.has(item.id));
          const pick = pickWeighted(available, weightOf(charState), rng) || available[0] || poolDailies[0];
          if (pick) {
            hydrated[serverContractAt] = { kind: 'daily', id: pick.id, t: old.t, season: old.season, seasonIdx: old.seasonIdx };
            remember(charState, pick.id);
          }
        }
        const next = getNextFixerPromotion(charState);
        if (next && next.currentRep < next.repReq) {
          const localOffice = localPlan.find((item) => item.id === 'm_fx_request_choice');
          if (localOffice && !hydrated.some((item) => item.id === localOffice.id)) {
            let replaceAt = hydrated.findIndex((item) => item.kind === 'daily');
            if (replaceAt < 0) replaceAt = hydrated.findIndex((item) => item.kind === 'minor' && !item.isCausal);
            if (replaceAt >= 0) hydrated[replaceAt] = localOffice;
          }
        }
      }

      const nextFixerTrial = getNextFixerPromotion(charState);
      const retryDue = (nextFixerTrial?.isEligible && charState.fixerTrialRetryGrade === nextFixerTrial.grade &&
        charState.lastFixerExamAge != null && charState.age > charState.lastFixerExamAge) ||
        careerTrialRetryDue(charState);
      if (retryDue && !hydrated.some((item) => item.kind === 'major' && !item.forcedEventId)) {
        const localTrial = localPlan.find((item) => item.kind === 'major' && !item.forcedEventId);
        const replaceAt = hydrated.findIndex((item) => item.kind === 'daily');
        if (localTrial && replaceAt >= 0) hydrated[replaceAt] = localTrial;
        else if (localTrial) hydrated.push(localTrial);
      }

      // The server forces the career crossroads at 18. A character whose working age came sooner
      // (15 to 20) keeps the crossroads the local planner scheduled.
      const crossroadId = isOutskirts(charState) ? 'ad_outskirts_crossroad_18' : 'ad_career_crossroad_18';
      if (reachedCareerAge(charState) && charState.job === 'Child' && !(charState.seenEvents || []).includes(crossroadId) &&
          !hydrated.some((item) => item.forcedEventId === crossroadId)) {
        const localCross = localPlan.find((item) => item.forcedEventId === crossroadId);
        if (localCross) {
          let at = hydrated.findIndex((item) => item.kind === 'major' && !item.forcedEventId);
          if (at < 0) at = hydrated.findIndex((item) => item.kind === 'daily');
          if (at < 0) at = hydrated.findIndex((item) => item.kind === 'minor' && !item.isCausal);
          if (at >= 0) hydrated[at] = { ...localCross, t: hydrated[at].t, season: hydrated[at].season, seasonIdx: hydrated[at].seasonIdx };
          else hydrated.push(localCross);
        }
      }

      // The server only knows daily/minor/major/contract. The mishap and medical-care
      // moments the client rolled would be lost, so they take over a plain slot.
      const isLocalOnly = (it) => it.kind === 'mishap' || it.extra || it.annualMerit || (it.kind === 'minor' && (/^m_(med|wellness)_/.test(String(it.id)) || LIFE_CAREER_OPPORTUNITIES.some((event) => event.id === it.id)));
      const isReplaceable = (it) => it.kind === 'daily' || (it.kind === 'minor' && !it.isCausal);
      for (const keep of localPlan.filter(isLocalOnly)) {
        if (hydrated.some((h) => h.id === keep.id && h.kind === keep.kind)) continue;
        if (keep.extra || keep.annualMerit) {
          // A protected commission rides along when the server has filled its season
          let t = keep.t;
          while (hydrated.some((h) => Math.abs(h.t - t) < 0.03) && t < 0.97) t = Math.round((t + 0.04) * 1000) / 1000;
          hydrated.push({ ...keep, t });
          continue;
        }
        const sameSeason = hydrated.findIndex((h) => h.seasonIdx === keep.seasonIdx);
        if (sameSeason < 0) hydrated.push(keep);
        else if (isReplaceable(hydrated[sameSeason])) hydrated[sameSeason] = keep;
        else if (keep.kind === 'mishap') {
          const free = hydrated.findIndex(isReplaceable);
          if (free >= 0) hydrated[free] = keep;
        }
      }

      for (const item of localPlan.filter(it => it.kind === 'major' &&
        (it.forcedEventId?.startsWith('fixer_seven_') || (!it.forcedEventId &&
          (hasEgoOpportunity(charState) || (checkColorFixerReadiness(charState).ready && colorTrialAvailable(charState))))))) {
        if (!hydrated.some(it => it.kind === 'major' && (it.forcedEventId || '') === (item.forcedEventId || ''))) hydrated.push(item);
      }
      hydrated.sort((a, b) => a.t - b.t);
      charState.plan = hydrated;
      charState.planCursor = 0;
      if (charState.weaver) {
        charState.weaver.tensionScore = planRes.value.tensionScore ?? charState.weaver.tensionScore;
        charState.weaver.dramaPhase = planRes.value.dramaPhase ?? charState.weaver.dramaPhase;
      }
    }
  } catch {
    // Fail gracefully to local deterministic plan
  }
  return charState;
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
          choices: care.choices.map((choice) => ({ vi: interpolateText(choice.vi, char), en: interpolateText(choice.en, char), fx: choice.fx, out: choice.out, need: choice.need, costAhn: choice.costAhn })),
          ignore: care.ignore || null,
          remainingMs: MINOR_WINDOW_MS
        };
      }
    }
    return char;
  }

  if (item.kind === 'daily') {
    const def = LIFE_DAILIES.find((d) => d.id === item.id);
    if (!def || !matchesEventContext(def, char)) return char;
    const dailyFx = PRINTED_NUMBERS.test(def.vi || '') ? def.fx : varyEffects(def.fx, rng, traitsOf(char));
    const deltas = applyFx(char, dailyFx);
    applyChoiceExtras(char, [def], deltas, rng);
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
      choices: def.choices.map((c) => ({ vi: interpolateText(c.vi, char), en: interpolateText(c.en, char), fx: c.fx, out: c.out, need: c.need, costAhn: c.costAhn })),
      ignore: def.ignore || null,
      remainingMs: MINOR_WINDOW_MS
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
          closeThreads(char, item.forcedEventId);
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
      const threadObj = item.thread ? char.weaver?.pendingThreads?.find((t) => t.id === item.thread) : null;
      char.pendingEvent = {
        ...event,
        // Choice labels name people too ({spouse}, {parentName}), so they get the same treatment as the text
        choices: (event.choices || []).map((c) => ({ ...c, labelVi: interpolateText(c.labelVi, char), labelEn: interpolateText(c.labelEn, char) })),
        titleVi: vi.title,
        titleEn: en.title,
        displayVi: vi.body + examNoteVi,
        displayEn: en.body + examNoteEn,
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
function settle(char, t, rng = Math.random) {
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
  applyChoiceExtras(char, outcome === choice ? [choice] : [choice, outcome], deltas, rng);
  if (outcome.setJob || choice.setJob) char.job = outcome.setJob || choice.setJob;

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

/* ---------- the turn of the year ---------- */

const JOB_INCOME = (char) => {
  switch (char.job) {
    case 'Fixer':
      return 2 + Math.round((9 - Math.min(9, char.fixerGrade)) * 0.7);
    case 'Syndicate':
      return 3 + (char.fingerRank || 0) * 2 + ((char.fingerRank || 0) >= 3 ? 3 : 0);
    case 'Wing Employee':
      return 4 + (char.wingRank || 0);
    case 'Workshop Craftsman':
      return 3;
    default:
      return 1;
  }
};

/**
 * Closes the year: income against living costs, slow healing, the Backstreets'
 * wear, ageing (each written into one plain line with its deltas), then the
 * birthday and the next year's plan.
 */
/**
 * One sentence for a year-end reason, fitted to the life stage, and never the
 * variant this character got last time for the same reason.
 */
function yearLine(char, rng, key, n) {
  const set = YEAR_END_LINES[key];
  const stage = char.age < 4 ? 'baby' : char.age < 13 ? 'kid' : 'adult';
  const pool = set[stage] || set.kid || set.adult;
  const last = char.yearEndLast?.[key];
  let idx = Math.floor(rng() * pool.length);
  if (pool.length > 1 && idx === last) idx = (idx + 1) % pool.length;
  char.yearEndLast = { ...(char.yearEndLast || {}), [key]: idx };
  const fill = (s) => (n == null ? s : s.replace('{n}', n));
  return [fill(pool[idx][0]), fill(pool[idx][1])];
}

export function endYear(charState, rng) {
  const char = cloneChar(charState);
  if (!char.alive) return char;
  const region = REGIONS.find((r) => r.id === char.regionId) || REGIONS[0];
  const nest = isNest(char);
  const fx = {};
  const vi = [];
  const en = [];
  const add = (k, v) => {
    if (v) fx[k] = (fx[k] || 0) + v;
  };
  const line = (key, n) => {
    const [lv, le] = yearLine(char, rng, key, n);
    vi.push(lv);
    en.push(le);
  };

  if (reachedCareerAge(char) && !char.flags.includes('Distorted')) {
    let livingCost = nest ? 5 : isOutskirts(char) ? 2 : 3;

    // Head Weapons & Firearms Tax: Strictly enforced by The Head & Tres Association
    const hasFirearms = (char.inventory || []).some(i => i.id?.includes('revolver') || i.id?.includes('logic')) || char.flags.includes('Firearms');
    if (hasFirearms) {
      livingCost += 3;
      line('firearms_tax');
    }

    // Workshop Master Weapon Maintenance
    const hasWorkshopGear = (char.inventory || []).some(i => i.id?.startsWith('wpn_') || i.id?.startsWith('arm_')) || char.craftWeapon;
    if (hasWorkshopGear && rng() < 0.6) {
      livingCost += 2;
      line('gear_upkeep');
    }

    // Full-Body Cybernetic Maintenance
    if (char.flags.includes('FullBodyProsthetic')) {
      livingCost += 3;
      line('prosthetic_upkeep');
    }

    const assetCost = Math.min(4, Math.max(0, Math.floor((char.stats.wealth - 45) / 15) + 1));
    if (assetCost > 0) {
      livingCost += assetCost;
      line('asset_cost', assetCost);
    }

    const net = JOB_INCOME(char) - livingCost + Math.round(rng() * 2 - 1);
    add('wealth', net);
    if (net > 0) {
      line('income_up');
    } else if (net < 0) {
      line('income_down');
    }
  } else {
    // Childhood living friction: survival is harsh, money gets spent on family necessities
    if (!nest) {
      if (char.stats.wealth > 4 && rng() < 0.4) {
        const drain = Math.min(2, Math.max(1, Math.floor(char.stats.wealth * 0.15)));
        add('wealth', -drain);
        line('child_friction');
      }
    } else {
      if (char.stats.wealth > 14 && rng() < 0.35) {
        const drain = Math.min(3, Math.max(1, Math.floor(char.stats.wealth * 0.12)));
        add('wealth', -drain);
        line('nest_tuition');
      }
    }
  }

  // Healthcare & Wounds recovery vs Street clinic expenses
  if (char.stats.health < BALANCE.heal.below && !char.flags.includes('Distorted')) {
    if (char.flags.includes('KCorpAmpoule')) {
      add('health', healAmount(char, 'ampoule'));
      line('heal_ampoule');
    } else if (nest) {
      add('health', healAmount(char, 'nest'));
      line('heal_nest');
    } else if (char.stats.wealth >= 3 && reachedCareerAge(char)) {
      add('wealth', -2);
      add('health', healAmount(char, 'clinic'));
      line('heal_clinic');
    } else {
      add('health', healAmount(char, 'natural'));
      line('heal_natural');
    }
  }

  // Mental Sanity recovery vs Tavern comfort
  const bond = ['spouse', 'partner', 'friend', 'mentor', 'child'].some((k) => npcIsActive(char.npcs?.[k]) && (char.npcs[k].bond || 0) >= 50);
  if (char.stats.sanity < BALANCE.calm.below && !char.flags.includes('Distorted')) {
    if (bond) {
      add('sanity', calmAmount(char, 'bond'));
      line('calm_bond');
    } else if (char.stats.wealth >= 2 && reachedCareerAge(char)) {
      add('wealth', -1);
      add('sanity', calmAmount(char, 'tavern'));
      line('calm_tavern');
    } else {
      add('sanity', calmAmount(char, 'natural'));
      line('calm_natural');
    }
  }

  const scarEffects = scarAnnualEffects(char);
  if (Object.keys(scarEffects).length) {
    for (const [key, value] of Object.entries(scarEffects)) add(key, value);
    vi.push('Những dấu tích còn mang đã đòi phần của chúng.');
    en.push('The marks you carry took their toll.');
  }
  if ((char.resonance || 0) >= 90 && !char.flags.includes('Distorted') && !char.flags.includes('EGOAwakened')) {
    add('sanity', -2);
    vi.push('Cộng hưởng quá cao khiến tiếng nói của Carmen khó lắng xuống.');
    en.push('High resonance made Carmen’s voice harder to quiet.');
  }

  if (reachedCareerAge(char) && ['Fixer', 'Syndicate', 'Wing Employee', 'Workshop Craftsman'].includes(char.job) && !char.flags.includes('Distorted')) {
    const wear = char.job === 'Fixer' || char.job === 'Syndicate' ? 2 : 1;
    add('health', -wear);
    add('sanity', -(char.job === 'Wing Employee' || char.job === 'Syndicate' ? 3 : 2));
    line('job_wear');
  }

  // City environmental hazards (Smog in polluted districts, Crime in dangerous districts)
  if (!nest && char.age >= 4) {
    if (region.pollution >= 5 && rng() < 0.35) {
      add('health', -2);
      line('smog');
    }
    if (region.safety <= 4 && rng() < 0.35) {
      add('sanity', -2);
      line('gunfire');
    }
  }

  if ((char.heat || 0) > 0) add('heat', -1);
  // A Distortion is never off Hana's books, and people stop recognizing you
  if (char.flags.includes('Distorted')) {
    add('heat', 6);
    add('network', -2);
    vi.push('Hồ sơ theo dõi cá thể Distortion của bạn tại trụ sở Hana Association vẫn giữ nguyên trạng thái truy vết.');
    en.push('Your active Distortion dossier at Hana Association remained open under high-priority watch.');
  }
  for (const meet of keepInTouch(char, rng)) pushLog(char, { key: 'keep_in_touch', type: 'story', ...meet }, 0.97);
  driftBonds(char);

  // What events keep raising also wears off: resonance, fame and connections need feeding
  const nextFixerExam = getNextFixerPromotion(char);
  const nextOtherExam = getOtherCareerPromotion(char);
  const protectedThresholds = nextFixerExam?.isEligible
    ? { rep: nextFixerExam.repReq, merit: nextFixerExam.meritReq }
    : nextOtherExam?.isEligible
      ? { merit: nextOtherExam.meritReq, rep: nextOtherExam.repReq, network: nextOtherExam.networkReq }
      : {};
  const drift = driftOf(char, bond ? 2 : 0, protectedThresholds);
  for (const [k, v] of Object.entries(drift)) add(k, v);
  if (drift.network) {
    line(hasEstablishedStanding(char) || (char.age >= 60 && char.stats.rep >= 70) ? 'drift_network_established' : 'drift_network');
  }
  if (drift.rep) {
    line('drift_rep');
  }
  if (drift.resonance) {
    line('drift_resonance');
  }

  const wear = agingLoss(char);
  const oldAge = wear > 0;
  if (wear > 0) {
    add('health', -wear);
    line(char.flags.includes('FullBodyProsthetic') ? 'aging_prosthetic' : effectiveAge(char) >= 65 ? 'aging_late' : 'aging_early', wear);
  }

  const deltas = applyFx(char, fx);
  const npcAutonomyLogs = [...ageNpcCompanions(char, rng), ...simulateNpcAutonomousLife(char, rng)];
  for (const nlog of npcAutonomyLogs) {
    pushLog(
      char,
      {
        key: 'npc_autonomy',
        type: 'story',
        vi: nlog.vi,
        en: nlog.en
      },
      0.98
    );
  }

  for (const affLog of affiliationYearTick(char, rng)) pushLog(char, affLog, 0.985);
  planFirstGate(char);

  if (deltas.some((d) => d.k !== 'heat')) {
    const textVi = vi.length ? vi.join(' ') : 'Một năm nữa lặng lẽ trôi qua dưới màn đêm không bao giờ tắt của The City.';
    const textEn = en.length ? en.join(' ') : 'Another year quietly drifted by beneath the never-dimming lights of the City.';
    pushLog(
      char,
      {
        key: 'year_end',
        type: 'summary',
        vi: `[Cuối năm] ${textVi}`,
        en: `[Year's end] ${textEn}`,
        deltas
      },
      0.99
    );
  }

  // Hard knocks the City deals on its own
  if (reachedCareerAge(char) && char.stats.wealth <= 0 && !nest && !char.flags.includes('Distorted')) {
    const d = applyFx(char, { health: -20, sanity: -12, wealth: 14, resonance: 10 });
    addScar(char, 'Vết mổ trả nợ');
    pushLog(
      char,
      {
        key: 'organ_debt',
        type: 'danger',
        vi: 'Không còn đồng Ahn nào để trả tiền trọ. Đám đòi nợ đưa bạn tới một phòng khám không biển hiệu và lấy đi thứ đáng giá nhất bạn còn: một quả thận.',
        en: 'You had no Ahn left for rent. The collectors took you to an unmarked clinic and took the most valuable thing you still had: a kidney.',
        deltas: d
      },
      0.99
    );
  }
  if (char.age >= 16 && (char.heat || 0) >= 65 && rng() < 0.35) {
    const distorted = char.flags.includes('Distorted');
    const d = applyFx(char, distorted ? { health: -24, sanity: -6, heat: -14 } : { health: -18, sanity: -8, heat: -18 });
    pushLog(
      char,
      {
        key: 'heat_ambush',
        type: 'danger',
        vi: distorted
          ? 'Một đội Fixer của Hana chặn cả hai đầu hẻm, mang theo lưới thép và đèn pha. Bạn phá được một bức tường để thoát, và để lại một phần cơ thể dưới lưới.'
          : 'Ba kẻ đeo mặt nạ chờ sẵn ở đầu hẻm. Bạn thoát được, nhưng mang về một vết dao dài trên sườn.',
        en: distorted
          ? 'A Hana-sent Fixer team sealed both ends of the alley with steel nets and floodlights. You broke through a wall to escape, and left part of your body under the net.'
          : 'Three masked figures were waiting at the mouth of the alley. You got away, with a long knife wound along your ribs.',
        deltas: d
      },
      0.99
    );
  }

  if (char.stats.health <= 0) {
    const [woundVi, woundEn] = woundDeath(char, 'Gục xuống vì vết thương và kiệt sức', 'Collapsed from wounds and exhaustion');
    applyFatalOrCompanionSave(
      char,
      oldAge ? 'Ra đi vì tuổi già, dưới ánh đèn không bao giờ tắt của The City' : woundVi,
      oldAge ? 'Passed of old age beneath the City’s never-dimming lights' : woundEn
    );
    return char;
  }
  if (char.stats.sanity <= 0) {
    handleSanityBreakdown(char, rng);
    if (!char.alive) return char;
  }

  // Birthday
  char.age += 1;
  char.seasonIdx = 0;
  char.weaver = {
    ...char.weaver,
    yearsSinceLastMajor: (char.weaver?.yearsSinceLastMajor || 0) + 1,
    yearsSinceLastCrisis: (char.weaver?.yearsSinceLastCrisis || 0) + 1
  };
  if (reachedCareerAge(char) && (char.job === 'Fixer' || char.job === 'Syndicate')) applyFx(char, { merit: 2 });
  settle(char, 0, rng);
  char.weaver = updateDramaTension(char.weaver, char);
  if (char.alive) planYear(char, rng);
  return char;
}

/** The moment the bar is waiting for next, or null when the year is done. */
export const nextPlanItem = (char) => (char.plan || [])[char.planCursor || 0] || null;

/**
 * Runs every moment whose time has come at `progress` (0–100). Stops at the first
 * moment that asks for a decision.
 */
export function runDueItems(charState, progress, rng) {
  let char = charState;
  let changed = false;
  while (char.alive && !char.pendingEvent && !char.pendingContract && !char.pendingModal && !char.pendingMinor) {
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
