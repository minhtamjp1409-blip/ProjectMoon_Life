import { simulateNpcAutonomousLife } from './narrativeArcEngine.js';
import { matchesNeed, matchesEventContext, choiceIsAvailable, mergeEffects, isNestResident, isOutsideCity } from './eventConditions.js';
import {
  getNextFixerPromotion,
  checkColorFixerReadiness,
  getNextFingerPromotion,
  getNextWingPromotion,
  getNextWorkshopPromotion
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
import { LIFE_MINORS_2 } from '../data/lifeMinors2.js';
import { LIFE_DAILIES_3, LIFE_MINORS_3 } from '../data/lifeMinors3.js';
import { EXPANDED_DAILIES } from '../data/narrative/dailies.js';
import { cityArchiveAPI } from '../services/api/cityArchiveAPI.js';

export const LIFE_MINORS = [...MINORS_FIRST, ...LIFE_MINORS_2, ...LIFE_MINORS_3];
export const LIFE_DAILIES = [...DAILIES_FIRST, ...LIFE_DAILIES_3, ...EXPANDED_DAILIES];
import {
  directorWeight,
  markTheme,
  logDecision,
  dueMinorThreads,
  closeThreads,
  applyChoiceExtras,
  driftBonds,
  npcActive,
  hasMemory
} from './director.js';

export const MINOR_WINDOW_MS = 15000;
const RECENT_LIMIT = 36;

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

const ageOk = (entry, age) => !entry.age || (age >= entry.age[0] && age <= entry.age[1]);

/**
 * Applies an effect map and returns the deltas that actually landed after clamping,
 * in a fixed order so the UI always lists them the same way.
 */
export function applyFx(char, fx = {}) {
  const deltas = [];
  const omen = FATE_OMENS.find((o) => o.id === char.fateOmenId);
  for (const k of STAT_KEYS) {
    if (!fx[k]) continue;
    const before = char.stats[k];
    char.stats[k] = clamp(before + fx[k], 0, 100);
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
}

// Split a "[Title] body" event text into its title and body.
export function splitTitle(text) {
  const m = /^\s*\[([^\]]{2,80})\]\s*/.exec(text || '');
  return m ? { title: m[1], body: text.slice(m[0].length) } : { title: null, body: text || '' };
}

/* ---------- choosing what happens this year ---------- */

function eligibleDailies(char) {
  const base = LIFE_DAILIES.filter((d) => matchesEventContext(d, char));
  const unpicked = base.filter((d) => !(char.recent || []).includes(d.id));
  if (unpicked.length > 0) return unpicked;
  // Fallback: sort all matching by least recently seen to cycle smoothly
  const recent = char.recent || [];
  return [...base].sort((a, b) => recent.lastIndexOf(a.id) - recent.lastIndexOf(b.id));
}

function eligibleMinors(char) {
  const base = LIFE_MINORS.filter((m) => {
    if (!matchesEventContext(m, char)) return false;
    if (m.once && (char.seenEvents || []).includes(m.id)) return false;
    return true;
  });
  const unpicked = base.filter((m) => !(char.recent || []).includes(m.id));
  if (unpicked.length > 0) return unpicked;
  const recent = char.recent || [];
  return [...base].sort((a, b) => recent.lastIndexOf(a.id) - recent.lastIndexOf(b.id));
}

const weightOf = (char) => (e) => directorWeight(e, char).w;

function majorIsDue(char, rng) {
  const w = char.weaver || {};
  if (char.age <= 4) return false;
  // If Fixer is eligible for next grade exam, schedule major
  if (char.job === 'Fixer' && !char.flags.includes('Distorted')) {
    const nextPromo = getNextFixerPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  // If Syndicate is eligible for next finger promotion, schedule major
  if (char.job === 'Syndicate' && !char.flags.includes('Distorted')) {
    const nextPromo = getNextFingerPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  // If Wing Employee is eligible for next wing promotion, schedule major
  if (char.job === 'Wing Employee' && !char.flags.includes('Distorted')) {
    const nextPromo = getNextWingPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  // If Workshop Craftsman is eligible for next workshop promotion, schedule major
  if (char.job === 'Workshop Craftsman' && !char.flags.includes('Distorted')) {
    const nextPromo = getNextWorkshopPromotion(char);
    if (nextPromo && nextPromo.isEligible) return true;
  }
  if ((char.age >= 18 && char.job === 'Child') && !(char.seenEvents || []).includes('ad_career_crossroad_18')) return true;
  if (char.job === 'Syndicate' && !char.finger && !(char.seenEvents || []).includes('syn_choose_finger_allegiance')) return true;
  if ((char.taboo || 0) >= 3) return true;
  if ((w.pendingThreads || []).some((th) => th.kind !== 'minor' && !th.fulfilled && char.age >= th.triggerAge)) return true;
  if (char.age >= 18 && ((char.stats.sanity <= 5 && rng() < 0.12) || ((char.resonance || 0) >= 90 && rng() < 0.15)) && !(char.seenEvents || []).includes('ego_carmen_crossroad') && !char.flags.includes('EGOAwakened') && !char.flags.includes('Distorted')) return true;
  if (char.job === 'Fixer' && !char.flags.includes('Distorted') && checkColorFixerReadiness(char).ready && !char.flags.includes('ColorFixer') && !(char.seenEvents || []).includes('hana_color_ascension_trial')) return true;
  if (char.job === 'Syndicate' && (char.fingerRank || 0) >= 2 && (char.merit || 0) >= 75) return true;
  if (char.job === 'Wing Employee' && (char.wingRank || 0) >= 1 && (char.merit || 0) >= 65 && !(char.seenEvents || []).includes('wing_singularity_classified_audit')) return true;
  if (char.job === 'Workshop Craftsman' && (char.workshopRank || 0) >= 1 && (char.merit || 0) >= 65 && !(char.seenEvents || []).includes('workshop_legendary_forge_trial')) return true;
  const gap = w.yearsSinceLastMajor || 0;
  if (gap >= 5) return true;
  return gap >= 2 && rng() < 0.32;
}

/** Builds this year's plan. Called at birth and after every birthday. */
export function planYear(charState, rng) {
  const char = charState;
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

  // Mandatory Age 18 Milestone or unassigned adult must select career immediately
  if ((char.age >= 18 && char.job === 'Child') && !(char.seenEvents || []).includes('ad_career_crossroad_18')) {
    if (!scheduledKey.some((it) => it.forcedEventId === 'ad_career_crossroad_18')) {
      scheduledKey.push({ kind: 'major', forcedEventId: 'ad_career_crossroad_18' });
    }
  } else if (!scheduledKey.some((it) => it.kind === 'major') && majorIsDue(char, rng)) {
    scheduledKey.push({ kind: 'major' });
  }

  // Fixer combat contract: tactical commission
  if (char.job === 'Fixer' && !char.flags.includes('Distorted') && age >= 19 && rng() < 0.42 && !scheduledKey.some((it) => it.kind === 'contract')) {
    scheduledKey.push({ kind: 'contract' });
  }

  // Active Medical Recovery minor choice when injured or sick
  if (char.stats.health < 65 && !char.flags.includes('Distorted') && rng() < 0.75) {
    const medId = nest ? 'm_med_nest_infirmary' : (age < 18 ? 'm_med_child_remedy' : 'm_med_backstreet_clinic');
    if (!scheduledKey.some((it) => it.id === medId)) {
      scheduledKey.push({ kind: 'minor', id: medId });
    }
  }

  // Collect Minor choices: small interactive decisions with time limit
  const roll = rng();
  const targetMinorCount = age <= 4 ? 0 : age < 7 ? (roll < 0.45 ? 1 : 0) : roll < 0.25 ? 0 : roll < 0.75 ? 1 : 2;
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

  // Build the final chronological plan with precise seasonal coordinates
  const planItems = [];
  for (let s = 0; s < 4; s++) {
    const it = slots[s];
    if (it) {
      const band = SEASON_BANDS[s];
      const t = Math.round((band.minT + rng() * (band.maxT - band.minT)) * 1000) / 1000;
      planItems.push({
        ...it,
        t,
        seasonIdx: s,
        season: band.season
      });
    }
  }

  planItems.sort((a, b) => a.t - b.t);

  char.plan = planItems;
  char.planCursor = 0;
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
      activeNpcsCount: Object.values(charState.npcs || {}).filter((n) => n && !n.deceased && n.status !== 'dead').length,
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

    const [planRes, milestoneRes] = await Promise.allSettled([
      cityArchiveAPI.planYear({ seed: `${charState.seed}:${charState.age}`, char: snap }),
      cityArchiveAPI.getCareerMilestone(snap)
    ]);

    if (milestoneRes.status === 'fulfilled' && milestoneRes.value) {
      charState.serverMilestone = milestoneRes.value;
    }

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
              const allAgeDailies = LIFE_DAILIES.filter((d) => ageOk(d, charState.age) && matchNeed(d.need, charState));
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
              const allAgeMinors = LIFE_MINORS.filter((m) => ageOk(m, charState.age) && matchNeed(m.need, charState) && !(m.once && (charState.seenEvents || []).includes(m.id)));
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
          hydrated.push({
            kind: 'major',
            forcedEventId: sm.forcedEventId || sm.id || '',
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
    return settle(char, item.t, rng);
  }

  if (item.kind === 'daily') {
    const def = LIFE_DAILIES.find((d) => d.id === item.id);
    if (!def || !matchesEventContext(def, char)) return char;
    const deltas = applyFx(char, def.fx);
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
      vi: interpolateText(def.vi, char),
      en: interpolateText(def.en, char),
      choices: def.choices.map((c) => ({ vi: interpolateText(c.vi, char), en: interpolateText(c.en, char), fx: c.fx, out: c.out, need: c.need })),
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
      const threadObj = item.thread ? char.weaver?.pendingThreads?.find((t) => t.id === item.thread) : null;
      char.pendingEvent = {
        ...event,
        titleVi: vi.title,
        titleEn: en.title,
        displayVi: vi.body,
        displayEn: en.body,
        t: item.t,
        isCausalCallback: Boolean(item.isCausal || event.isCausalCallback),
        causalReasonVi: threadObj?.reasonVi || null,
        causalReasonEn: threadObj?.reasonEn || null
      };
    }
    return char;
  }

  if (item.kind === 'contract' && char.job === 'Fixer' && !char.flags.includes('Distorted')) {
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
  if (Array.isArray(choice.out) && choice.out.length) {
    outcome = pickWeighted(choice.out, (o) => o.w ?? 1, rng) || choice;
  }
  const deltas = applyFx(char, mergeEffects(choice, outcome));
  [...(choice.flags || []), ...(outcome === choice ? [] : outcome.flags || [])].forEach((f) => {
    if (!char.flags.includes(f)) char.flags.push(f);
  });
  // Resolve names before a fate removes the person from the text
  const resultVi = interpolateText(outcome.rvi || choice.rvi || '', char);
  const resultEn = interpolateText(outcome.ren || choice.ren || '', char);
  const scar = interpolateText(outcome.scar || choice.scar || '', char);
  if (scar && !char.scars.includes(scar)) {
    char.scars.push(scar);
    deltas.push(...applyFx(char, { resonance: 6 }));
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
      return 3 + (char.fingerRank || 0);
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

  if (char.age >= 18 && !char.flags.includes('Distorted')) {
    let livingCost = nest ? 5 : isOutskirts(char) ? 2 : 3;

    // Head Weapons & Firearms Tax: Strictly enforced by The Head & Tres Association
    const hasFirearms = (char.inventory || []).some(i => i.id?.includes('revolver') || i.id?.includes('logic')) || char.flags.includes('Firearms');
    if (hasFirearms) {
      livingCost += 3;
      vi.push('Thuế đạn dược và phí đăng ký vũ khí nóng của The Head khấu trừ 3 Ahn ngân quỹ.');
      en.push('The Head’s firearms ammunition excise and verification fee drained 3 Ahn.');
    }

    // Workshop Master Weapon Maintenance
    const hasWorkshopGear = (char.inventory || []).some(i => i.id?.startsWith('wpn_') || i.id?.startsWith('arm_')) || char.craftWeapon;
    if (hasWorkshopGear && rng() < 0.6) {
      livingCost += 2;
      vi.push('Phí bảo trì mài bén lưỡi đao và thay dầu cơ khí tại Workshop tiêu tốn 2 Ahn.');
      en.push('Workshop sharpening and lubrication maintenance costs took 2 Ahn.');
    }

    // Full-Body Cybernetic Maintenance
    if (char.flags.includes('FullBodyProsthetic')) {
      livingCost += 3;
      vi.push('Dung dịch làm mát tủy máy và linh kiện thay thế Full-Body Prosthetic ngốn 3 Ahn.');
      en.push('Full-Body Prosthetic coolant flushes and servo maintenance consumed 3 Ahn.');
    }

    const net = JOB_INCOME(char) - livingCost + Math.round(rng() * 2 - 1);
    add('wealth', net);
    if (net > 0) {
      vi.push('Thu nhập năm nay vượt mức chi tiêu, bạn tích lũy thêm được chút vốn liếng.');
      en.push('Your earnings exceeded living expenses this year, allowing you to save a modest sum.');
    } else if (net < 0) {
      vi.push('Tiền thuê trọ đắt đỏ và chi phí ăn uống leo thang đã ăn mòn phần lớn tiền tiết kiệm.');
      en.push('Steep tenement rent and rising food costs ate heavily into your savings.');
    }
  } else {
    // Childhood living friction: survival is harsh, money gets spent on family necessities
    if (!nest) {
      if (char.stats.wealth > 4 && rng() < 0.4) {
        const drain = Math.min(2, Math.max(1, Math.floor(char.stats.wealth * 0.15)));
        add('wealth', -drain);
        vi.push('Gia đình phải chắt bóp từng đồng Ahn để trang trải bữa ăn đạm bạc và nộp tiền bảo kê cho băng đảng đầu ngõ.');
        en.push('The family pinched every Ahn to cover meager meals and local syndicate protection quotas.');
      }
    } else {
      if (char.stats.wealth > 14 && rng() < 0.35) {
        const drain = Math.min(3, Math.max(1, Math.floor(char.stats.wealth * 0.12)));
        add('wealth', -drain);
        vi.push('Học phí đào tạo ưu tú và lệ phí duy trì hạn ngạch công dân Nest trở thành gánh nặng kinh tế đáng kể.');
        en.push('Elite tutoring costs and Nest citizen quota upkeep fees placed a noticeable burden on the household.');
      }
    }
  }

  // Healthcare & Wounds recovery vs Street clinic expenses
  if (char.stats.health < 85 && !char.flags.includes('Distorted')) {
    if (char.flags.includes('KCorpAmpoule')) {
      add('health', 25);
      vi.push('Dược chất huyết thanh K Corp liên tục tuần hoàn, tái tạo thần tốc các mô thịt bị rách nát (+25 HP).');
      en.push('K Corp restorative serum continuously circulated, rapidly regenerating damaged tissues (+25 HP).');
    } else if (char.stats.wealth >= 3 && char.age >= 18) {
      add('wealth', -2);
      add('health', 18);
      vi.push('Bạn tốn 2 Ahn tại phòng khám chui nơi hẻm tối để khâu lại vết chém, khử trùng và phục hồi thể lực (+18 HP, -2 Ahn).');
      en.push('You paid 2 Ahn at a backstreet clinic to stitch wounds, sanitize, and restore vigor (+18 HP, -2 Ahn).');
    } else if (nest) {
      add('health', 16);
      vi.push('Gói bảo hiểm y tế nội bộ của Nest hỗ trợ khử trùng và điều trị chu đáo các tổn thương thể chất (+16 HP).');
      en.push('Nest residential medical coverage attended to your physical injuries with clinical care (+16 HP).');
    } else {
      add('health', 10);
      vi.push('Nhờ sức đề kháng tự nhiên và thời gian tĩnh dưỡng, những vết rách trên cơ thể bạn dần kéo da non (+10 HP).');
      en.push('Through natural resilience and quiet rest, your physical wounds gradually healed over (+10 HP).');
    }
  }

  // Mental Sanity recovery vs Tavern comfort
  const bond = ['spouse', 'partner', 'friend', 'mentor', 'child'].some((k) => char.npcs?.[k] && !char.npcs[k].deceased && (char.npcs[k].bond || 0) >= 50);
  if (char.stats.sanity < 85 && !char.flags.includes('Distorted')) {
    if (bond) {
      add('sanity', 16);
      vi.push('Sự kề cận và sẻ chia của người thân yêu giúp tâm trí bạn giữ được sự tỉnh táo và xua tan ám ảnh (+16 SP).');
      en.push('The steady presence of a loved one anchored your sanity and cleared lingering horrors (+16 SP).');
    } else if (char.stats.wealth >= 2 && char.age >= 18) {
      add('wealth', -1);
      add('sanity', 12);
      vi.push('Bạn bỏ 1 Ahn vào quán rượu bình dân cuối phố, mượn men cay để xoa dịu những cơn đau đầu dai dẳng (+12 SP, -1 Ahn).');
      en.push('You spent 1 Ahn at a gritty dive tavern, dulling persistent headaches with cheap liquor (+12 SP, -1 Ahn).');
    } else {
      add('sanity', 8);
      vi.push('Những khoảnh khắc tĩnh lặng hiếm hoi trong đêm giúp tâm trí bạn lắng đọng và hồi phục tinh thần (+8 SP).');
      en.push('Rare quiet moments in the night allowed your mind to settle and regain mental composure (+8 SP).');
    }
  }

  // City environmental hazards (Smog in polluted districts, Crime in dangerous districts)
  if (!nest && char.age >= 4) {
    if (region.pollution >= 5 && rng() < 0.35) {
      add('health', -1);
      vi.push('Màn khói bụi công nghiệp nồng nặc của khu vực này dần ngấm sâu vào phế quản, gây ra những cơn ho khan.');
      en.push('The district’s acrid industrial smog settled deep into your lungs, leaving a dry cough.');
    }
    if (region.safety <= 4 && rng() < 0.35) {
      add('sanity', -1);
      vi.push('Những đêm trằn trọc mất ngủ vì tiếng còi báo động rít gào và tiếng nổ đì đùng của các cuộc thanh trừng băng đảng.');
      en.push('Restless nights were pierced by shrieking sirens and gunfire from nearby syndicate turf wars.');
    }
  }

  if ((char.heat || 0) > 0) add('heat', -3);
  // A Distortion is never off Hana's books, and people stop recognizing you
  if (char.flags.includes('Distorted')) {
    add('heat', 6);
    add('network', -2);
    vi.push('Hồ sơ theo dõi cá thể Distortion của bạn tại trụ sở Hana Association vẫn giữ nguyên trạng thái truy vết.');
    en.push('Your active Distortion dossier at Hana Association remained open under high-priority watch.');
  }
  driftBonds(char);

  const oldAge = char.flags.includes('Bloodfiend') ? 135 : char.flags.includes('FullBodyProsthetic') ? 85 : 58;
  if (char.age > oldAge) {
    add('health', -Math.ceil((char.age - oldAge) * 0.45));
    vi.push('Cơ thể bạn bắt đầu xuất hiện những dấu hiệu rệu rã rõ rệt của sự già nua và suy kiệt.');
    en.push('Your aging body showed undeniable signs of wear, fatigue, and declining vitality.');
  }

  const deltas = applyFx(char, fx);
  if (deltas.some((d) => d.k !== 'heat')) {
    const textVi = vi.length ? vi.join(' ') : 'Một năm nữa lặng lẽ trôi qua dưới màn đêm không bao giờ tắt của The City.';
    const textEn = en.length ? en.join(' ') : 'Another year quietly drifted by beneath the never-dimming lights of the City.';
    // Autonomous Living Companions Drama
  const npcAutonomyLogs = simulateNpcAutonomousLife(char, rng);
  if (npcAutonomyLogs && npcAutonomyLogs.length > 0) {
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
  }

  pushLog(
      char,
      {
        key: 'year_end',
        type: 'summary',
        vi: `[Lắng đọng cuối năm] ${textVi}`,
        en: `[Year-End Reckoning] ${textEn}`,
        deltas
      },
      0.99
    );
  }

  // Hard knocks the City deals on its own
  if (char.age >= 18 && char.stats.wealth <= 0 && !nest && !char.flags.includes('Distorted')) {
    const d = applyFx(char, { health: -20, sanity: -12, wealth: 14, resonance: 10 });
    if (!char.scars.includes('Vết mổ trả nợ')) char.scars.push('Vết mổ trả nợ');
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
      char.age > oldAge ? 'Ra đi vì tuổi già, dưới ánh đèn không bao giờ tắt của The City' : woundVi,
      char.age > oldAge ? 'Passed of old age beneath the City’s never-dimming lights' : woundEn
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
  if (char.age >= 18 && (char.job === 'Fixer' || char.job === 'Syndicate')) applyFx(char, { merit: 2 });
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
  }
  return { char, changed };
}
