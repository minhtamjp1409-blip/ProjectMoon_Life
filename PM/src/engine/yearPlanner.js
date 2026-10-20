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
} from './gameEngine';
import { selectEventWithWeaverAI, updateDramaTension, FATE_OMENS } from './weaverAI';
import { CONSEQUENCE_EVENTS } from '../data/eventsChildhood';
import { REGIONS } from '../data/worldData';
import { LIFE_DAILIES as DAILIES_FIRST } from '../data/lifeDailies';
import { LIFE_MINORS as MINORS_FIRST } from '../data/lifeMinors';
import { LIFE_MINORS_2 } from '../data/lifeMinors2';
import { LIFE_DAILIES_3, LIFE_MINORS_3 } from '../data/lifeMinors3';
import { cityArchiveAPI } from '../services/api/cityArchiveAPI';

const LIFE_MINORS = [...MINORS_FIRST, ...LIFE_MINORS_2, ...LIFE_MINORS_3];
const LIFE_DAILIES = [...DAILIES_FIRST, ...LIFE_DAILIES_3];
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
} from './director';

export const MINOR_WINDOW_MS = 15000;
const RECENT_LIMIT = 16;

export const STAT_KEYS = ['health', 'sanity', 'wealth', 'network', 'rep'];
const EXTRA_KEYS = ['heat', 'resonance', 'taboo', 'merit'];
const LIMITS = { heat: [0, 100], resonance: [0, 100], taboo: [0, 3], merit: [0, 9999] };

/* ---------- small helpers ---------- */

const seasonAt = (t) => SEASONS[Math.min(3, Math.floor((t || 0) * 4))];
const seasonIdxAt = (t) => Math.min(3, Math.floor((t || 0) * 4));

function pickWeighted(list, weightOf, rng) {
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

export const isNest = (char) => char.flags.includes('Nest') || char.flags.includes('Feather');
export const isOutskirts = (char) => char.flags.includes('Outskirts') || char.regionId === 'OUTSKIRTS';
export const isBackstreets = (char) => !isNest(char) && !isOutskirts(char);

/** Does an entry's `need` filter match this character right now? */
export function matchNeed(need, char) {
  if (!need) return true;
  if (need.nest && !isNest(char)) return false;
  if (need.back && !isBackstreets(char)) return false;
  if (need.out && !isOutskirts(char)) return false;
  if (need.notNest && isNest(char)) return false;
  if (need.jobs && !need.jobs.includes(char.job)) return false;
  if (need.regions && !need.regions.includes(char.regionId)) return false;
  if (need.flags && !need.flags.every((f) => char.flags.includes(f))) return false;
  if (need.noFlags && need.noFlags.some((f) => char.flags.includes(f))) return false;
  if (need.npc && !npcActive(char.npcs?.[need.npc])) return false;
  if (need.mem && !hasMemory(char, need.mem)) return false;
  if (need.noMem && hasMemory(char, need.noMem)) return false;
  if (need.noNpc && char.npcs?.[need.noNpc]) return false;
  if (need.grade && !(char.job === 'Fixer' && char.fixerGrade <= need.grade[0] && char.fixerGrade >= need.grade[1])) return false;
  if (need.stat) {
    for (const [k, [lo, hi]] of Object.entries(need.stat)) {
      const v = STAT_KEYS.includes(k) ? char.stats[k] : char[k] || 0;
      if (v < lo || v > hi) return false;
    }
  }
  return true;
}

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
  const base = LIFE_DAILIES.filter((d) => ageOk(d, char.age) && matchNeed(d.need, char));
  const unpicked = base.filter((d) => !(char.recent || []).includes(d.id));
  if (unpicked.length >= 4) return unpicked;
  // Fallback: sort all matching by least recently seen to cycle smoothly
  const recent = char.recent || [];
  return [...base].sort((a, b) => recent.lastIndexOf(a.id) - recent.lastIndexOf(b.id));
}

function eligibleMinors(char) {
  const base = LIFE_MINORS.filter((m) => {
    if (!ageOk(m, char.age) || !matchNeed(m.need, char)) return false;
    if (m.once && (char.seenEvents || []).includes(m.id)) return false;
    return true;
  });
  const unpicked = base.filter((m) => !(char.recent || []).includes(m.id));
  if (unpicked.length >= 2) return unpicked;
  const recent = char.recent || [];
  return [...base].sort((a, b) => recent.lastIndexOf(a.id) - recent.lastIndexOf(b.id));
}

const weightOf = (char) => (e) => directorWeight(e, char).w;

function majorIsDue(char, rng) {
  const w = char.weaver || {};
  if (char.age < 4) return false;
  if ((char.age === 18 || (char.age > 18 && char.job === 'Child')) && !(char.seenEvents || []).includes('ad_career_crossroad_18')) return true;
  if ((char.taboo || 0) >= 3) return true;
  if ((w.pendingThreads || []).some((th) => th.kind !== 'minor' && !th.fulfilled && char.age >= th.triggerAge)) return true;
  if (char.age >= 18 && ((char.stats.sanity <= 5 && rng() < 0.12) || ((char.resonance || 0) >= 90 && rng() < 0.15)) && !(char.seenEvents || []).includes('ego_carmen_crossroad') && !char.flags.includes('EGOAwakened') && !char.flags.includes('Distorted')) return true;
  if (char.job === 'Fixer' && char.fixerGrade === 1 && (char.merit || 0) >= 150 && ((char.stats?.rep ?? char.rep) || 0) >= 68 && !char.flags.includes('ColorFixer') && !(char.seenEvents || []).includes('hana_color_ascension_trial')) return true;
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

  // 1. Collect Key / Causal items (Consequences scheduled by earlier choices come first)
  const scheduledKey = [];
  const pending = char.weaver?.pendingThreads || [];
  for (const th of pending) {
    if (th.fulfilled || char.age < th.triggerAge) continue;

    // Check if it matches a minor event
    const minorDef = LIFE_MINORS.find((m) => m.id === th.eventId);
    if (minorDef) {
      const ok = ageOk(minorDef, age) && matchNeed(minorDef.need, char) && !(minorDef.once && (char.seenEvents || []).includes(minorDef.id));
      if (ok && !scheduledKey.some((it) => it.id === minorDef.id)) {
        scheduledKey.push({ kind: 'minor', id: minorDef.id, thread: th.id, isCausal: true });
        logDecision(char, minorDef, { vi: th.reasonVi || 'Hậu quả đến hạn', en: th.reasonEn || 'A consequence comes due', w: 99 }, 'minor');
        continue;
      }
    }

    // Check if it matches a major story consequence
    const storyDef = CONSEQUENCE_EVENTS.find((e) => e.id === th.eventId) || ALL_STORY_EVENTS.find((e) => e.id === th.eventId);
    if (storyDef) {
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

  // Mandatory Age 18 Milestone or unassigned adult must select career immediately
  if ((char.age === 18 || (char.age > 18 && char.job === 'Child')) && !(char.seenEvents || []).includes('ad_career_crossroad_18')) {
    if (!scheduledKey.some((it) => it.forcedEventId === 'ad_career_crossroad_18')) {
      scheduledKey.push({ kind: 'major', forcedEventId: 'ad_career_crossroad_18' });
    }
  } else if (!scheduledKey.some((it) => it.kind === 'major') && majorIsDue(char, rng)) {
    scheduledKey.push({ kind: 'major' });
  }

  // Fixer combat contract: tactical commission
  if (char.job === 'Fixer' && age >= 19 && rng() < 0.42 && !scheduledKey.some((it) => it.kind === 'contract')) {
    scheduledKey.push({ kind: 'contract' });
  }

  // Collect Minor choices: small interactive decisions with time limit
  const roll = rng();
  const targetMinorCount = age < 3 ? 0 : age < 7 ? (roll < 0.45 ? 1 : 0) : roll < 0.25 ? 0 : roll < 0.75 ? 1 : 2;
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

  // Fill remaining slots with Dailies (Storytelling lore slices or resource living events)
  const poolDailies = eligibleDailies(char);
  for (let s = 0; s < 4; s++) {
    if (slots[s] === null) {
      const alreadyPickedIds = slots.filter(Boolean).map((sl) => sl.id);
      let available = poolDailies.filter((d) => !alreadyPickedIds.includes(d.id));
      if (available.length === 0) {
        const allAgeDailies = LIFE_DAILIES.filter((d) => ageOk(d, char.age) && matchNeed(d.need, char));
        available = allAgeDailies.filter((d) => !alreadyPickedIds.includes(d.id));
      }
      const pick = pickWeighted(available, weightOf(char), rng) || available[0];
      if (pick) {
        slots[s] = { kind: 'daily', id: pick.id };
        remember(char, pick.id);
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
      const serverMoments = planRes.value.moments;
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

  if (item.kind === 'daily') {
    const def = LIFE_DAILIES.find((d) => d.id === item.id);
    if (!def) return char;
    const deltas = applyFx(char, def.fx);
    applyChoiceExtras(char, [def], deltas, rng);
    markTheme(char, def);
    const isPureLore = !def.fx || Object.keys(def.fx).length === 0;
    const logType = def.tone || (isPureLore ? 'lore' : 'daily');
    pushLog(char, { key: def.id, type: logType, vi: interpolateText(def.vi, char), en: interpolateText(def.en, char), deltas, season: seasonObj }, item.t);
    return settle(char, item.t);
  }

  if (item.kind === 'minor') {
    const def = LIFE_MINORS.find((m) => m.id === item.id);
    if (!def) return char;
    markTheme(char, def);
    closeThreads(char, def.id);
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
      event = CONSEQUENCE_EVENTS.find((e) => e.id === item.forcedEventId) ||
              ALL_STORY_EVENTS.find((e) => e.id === item.forcedEventId);
      if (item.thread) {
        closeThreads(char, item.forcedEventId);
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

  if (item.kind === 'contract' && char.job === 'Fixer') {
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
  char.pendingMinor = null;
  char.seenEvents = [...char.seenEvents, prompt.id];
  closeThreads(char, prompt.id);

  const def = LIFE_MINORS.find((m) => m.id === prompt.id);
  const ignore = def?.ignore || { vi: 'Để nó trôi qua', en: 'Let it pass', rvi: 'Bạn không làm gì cả. Chuyện cũng qua.', ren: 'You did nothing. It passed.' };
  const choice = idx >= 0 ? def?.choices[idx] : ignore;
  if (!choice) return char;

  let outcome = choice;
  if (Array.isArray(choice.out) && choice.out.length) {
    outcome = pickWeighted(choice.out, (o) => o.w ?? 1, rng) || choice;
  }
  const deltas = applyFx(char, { ...(choice.fx || {}), ...(outcome === choice ? {} : outcome.fx || {}) });
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

  if (char.age >= 18) {
    const cost = nest ? 4 : isOutskirts(char) ? 1 : 2;
    const net = JOB_INCOME(char) - cost + Math.round(rng() * 2 - 1);
    add('wealth', net);
    if (net > 0) {
      vi.push('làm ra nhiều hơn số tiêu');
      en.push('earned more than you spent');
    } else if (net < 0) {
      vi.push('tiền trọ và tiền ăn ăn mòn túi');
      en.push('rent and food ate into your savings');
    }
  } else {
    // Childhood living friction: survival is harsh, money gets spent on family necessities
    if (!nest) {
      if (char.stats.wealth > 4 && rng() < 0.4) {
        const drain = Math.min(2, Math.max(1, Math.floor(char.stats.wealth * 0.15)));
        add('wealth', -drain);
        vi.push('chi phí cơm áo và tiền nộp bảo kê của gia đình');
        en.push('family food rations and syndicate protection money');
      }
    } else {
      if (char.stats.wealth > 14 && rng() < 0.35) {
        const drain = Math.min(3, Math.max(1, Math.floor(char.stats.wealth * 0.12)));
        add('wealth', -drain);
        vi.push('chi phí học tập và tiền duy trì hộ khẩu Nest');
        en.push('Nest tuition and citizen quota maintenance fees');
      }
    }
  }

  // Healthcare & Wounds recovery vs Street clinic expenses
  if (char.stats.health < 60) {
    if (char.flags.includes('KCorpAmpoule')) {
      add('health', 4);
      vi.push('huyết thanh K Corp tái tạo cơ thể');
      en.push('K Corp serum regenerates your flesh');
    } else if (char.stats.wealth >= 3 && char.age >= 18) {
      add('wealth', -2);
      add('health', 4);
      vi.push('chi 2 Ahn cho phòng khám Backstreets để khâu vết thương');
      en.push('spent 2 Ahn at a back-alley clinic to patch wounds');
    } else if (nest) {
      add('health', 2);
      vi.push('chế độ y tế của Nest chăm sóc vết thương');
      en.push('Nest medical benefits tended your wounds');
    } else {
      add('health', 1);
      vi.push('vết thương tự lành thành sẹo');
      en.push('wounds slowly scarred over');
    }
  }

  // Mental Sanity recovery vs Tavern comfort
  const bond = ['spouse', 'partner', 'friend', 'mentor', 'child'].some((k) => char.npcs?.[k] && !char.npcs[k].deceased && (char.npcs[k].bond || 0) >= 50);
  if (char.stats.sanity < 55) {
    if (bond) {
      add('sanity', 3);
      vi.push('sự hiện diện của người thân giữ cho tâm trí bạn không sụp đổ');
      en.push('the presence of loved ones kept your mind steady');
    } else if (char.stats.wealth >= 3 && char.age >= 18) {
      add('wealth', -1);
      add('sanity', 3);
      vi.push('chi 1 Ahn uống rượu giải tỏa căng thẳng trong hẻm');
      en.push('spent 1 Ahn on tavern drinks to unwind the City’s pressure');
    } else if (char.stats.sanity < 40) {
      add('sanity', 1);
    }
  }

  // City environmental hazards (Smog in polluted districts, Crime in dangerous districts)
  if (!nest && char.age >= 4) {
    if (region.pollution >= 5 && rng() < 0.35) {
      add('health', -1);
      vi.push('khói bụi khu này bám vào phổi');
      en.push('the district’s smog settled in your lungs');
    }
    if (region.safety <= 4 && rng() < 0.35) {
      add('sanity', -1);
      vi.push('những đêm mất ngủ vì tiếng còi và đạn nổ');
      en.push('nights lost to sirens and gunfire');
    }
  }

  if ((char.heat || 0) > 0) add('heat', -3);
  // A Distortion is never off Hana's books, and people stop recognizing you
  if (char.flags.includes('Distorted')) {
    add('heat', 6);
    add('network', -2);
    vi.push('hồ sơ Distortion của bạn ở Hana vẫn mở');
    en.push('your Distortion file at Hana stayed open');
  }
  driftBonds(char);

  const oldAge = char.flags.includes('Bloodfiend') ? 135 : char.flags.includes('FullBodyProsthetic') ? 85 : 58;
  if (char.age > oldAge) {
    add('health', -Math.ceil((char.age - oldAge) * 0.45));
    vi.push('cơ thể già đi');
    en.push('your body grew older');
  }

  const deltas = applyFx(char, fx);
  if (deltas.some((d) => d.k !== 'heat')) {
    pushLog(
      char,
      {
        key: 'year_end',
        type: 'summary',
        vi: vi.length ? `Cuối năm: ${vi.join(', ')}.` : 'Một năm nữa trôi qua.',
        en: en.length ? `Year's end: ${en.join(', ')}.` : 'Another year went by.',
        deltas
      },
      0.99
    );
  }

  // Hard knocks the City deals on its own
  if (char.age >= 18 && char.stats.wealth <= 0 && !nest) {
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
