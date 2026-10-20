import { create } from 'zustand';
import { notification } from 'antd';
import {
  SEASONS,
  createRNG,
  createNewCharacter,
  resolveEventChoice,
  resolveFixerContract,
  buildLifeSummaryAndLegacy,
  cloneChar
} from '../engine/gameEngine';
import { planYear, syncPlanWithBackend, runDueItems, resolveMinor, endYear, nextPlanItem, diffStats, MINOR_WINDOW_MS } from '../engine/yearPlanner';
import { CODEX_RECORDS } from '../data/worldData';
import { cityArchiveAPI } from '../services/api/cityArchiveAPI';

const META_KEY = 'pm_city_chronicles_save_v3';
const RUN_KEY = 'pm_city_chronicles_run_v1';
const YEAR_MS = 30000;
const AUTO_MINOR_MS = 2500;

export function buildCharSnapshot(char) {
  if (!char) return null;
  return {
    age: char.age || 0,
    job: char.job || 'Child',
    regionId: char.regionId || '1',
    health: char.stats?.health ?? char.health ?? 50,
    sanity: char.stats?.sanity ?? char.sanity ?? 50,
    wealth: char.stats?.wealth ?? char.wealth ?? 0,
    network: char.stats?.network ?? char.network ?? 0,
    rep: (char.stats?.rep ?? char.rep) || 0,
    merit: char.merit || 0,
    heat: char.heat || 0,
    taboo: char.taboo || 0,
    resonance: char.resonance || 0,
    fixerGrade: char.fixerGrade ?? 9,
    finger: char.finger || 'Thumb',
    fingerRank: char.fingerRank || 0,
    wingRank: char.wingRank || 0,
    workshopRank: char.workshopRank || 0,
    flags: char.flags || [],
    seenEvents: char.seenEvents || [],
    recent: char.recent || [],
    fateOmenId: char.fateOmenId || '',
    yearsSinceLastMajor: char.weaver?.yearsSinceLastMajor || 0,
    activeNpcsCount: Object.values(char.npcs || {}).filter((n) => n && !n.deceased && n.status !== 'dead').length,
    pendingThreads: (char.weaver?.pendingThreads || []).map((th) => ({
      id: th.id || '',
      eventId: th.eventId || '',
      triggerAge: th.triggerAge || 0,
      fulfilled: Boolean(th.fulfilled),
      kind: th.kind || '',
      reasonVi: th.reasonVi || '',
      reasonEn: th.reasonEn || ''
    }))
  };
}

/* ---------- persistence ---------- */

function loadSavedMeta() {
  try {
    const raw = JSON.parse(localStorage.getItem(META_KEY) || '{}');
    return {
      pastLives: Array.isArray(raw.pastLives) ? raw.pastLives : [],
      globalCodex: Array.isArray(raw.globalCodex) ? raw.globalCodex : ['born_city']
    };
  } catch {
    return { pastLives: [], globalCodex: ['born_city'] };
  }
}

function saveMeta(pastLives, globalCodex) {
  try {
    localStorage.setItem(META_KEY, JSON.stringify({ pastLives, globalCodex }));
  } catch {
    // storage full or blocked: the run continues in memory
  }
}

function loadSavedRun() {
  try {
    const raw = JSON.parse(localStorage.getItem(RUN_KEY) || 'null');
    if (!raw?.char?.seed || !raw.char.alive) return null;
    return { char: cloneChar(raw.char), yearProgress: raw.yearProgress || 0, savedAt: raw.savedAt };
  } catch {
    return null;
  }
}

function clearSavedRun() {
  try {
    localStorage.removeItem(RUN_KEY);
  } catch {
    // ignore
  }
  cityArchiveAPI.clearRunState().catch(() => {});
}

// The life's own random stream, separate from the one that built the character
const lifeRngFor = (char) => createRNG(`${char.seed}:life:${char.age}:${char.logs.length}`);

/* ---------- what changed, for the screen ---------- */

// Attach stat changes to the first log line an action produced
function withDeltas(prev, next) {
  const fresh = next.logs.length - prev.logs.length;
  if (fresh <= 0) return next;
  const first = next.logs[prev.logs.length];
  if (first.deltas) return next;
  const d = diffStats(prev, next);
  if (!d.length) return next;
  const logs = [...next.logs];
  logs[prev.logs.length] = { ...first, deltas: d };
  return { ...next, logs };
}

// Which full-stage effect, if any, the newest lines deserve
function stageFxFor(prev, next) {
  const fresh = next.logs.slice(prev.logs.length);
  if (!next.alive && prev.alive) return 'death';
  if (next.pendingModal === 'ego_name' && prev.pendingModal !== 'ego_name') return 'ego';
  if (next.flags.includes('Distorted') && !prev.flags.includes('Distorted')) return 'distort';
  if (fresh.some((l) => (l.deltas || []).some((d) => d.k === 'fate' && d.v === 'dead'))) return 'loss';
  if (fresh.some((l) => l.type === 'miracle' || l.type === 'promo')) return 'gold';
  if (fresh.some((l) => l.type === 'danger')) return 'blood';
  if (fresh.some((l) => l.type === 'causal')) return 'echo';
  return null;
}

const savedMeta = loadSavedMeta();
const initialChar = createNewCharacter({});
let lifeRng = createRNG(initialChar.seed);
let saveTimer = null;

export const useGameStore = create((set, get) => ({
  inRun: false,
  char: initialChar,
  speed: 1,
  autoPlay: false,
  yearProgress: 0,
  minorRemainingMs: 0,
  stageFx: null,
  backendOnline: false,
  telemetry: null,
  savedRun: loadSavedRun(),
  lastSavedAt: null,

  // Start form
  customName: '',
  customSeed: '',
  selectedRegion: 'RANDOM',

  // Meta progression
  pastLives: savedMeta.pastLives,
  globalCodex: savedMeta.globalCodex,
  pendingLegacy: savedMeta.pastLives[0] || null,

  setConfigField: (field, value) => set({ [field]: value }),
  setSpeed: (speed) => set({ speed }),
  toggleAutoPlay: () => set((s) => ({ autoPlay: !s.autoPlay })),
  setPendingLegacy: (legacy) => set({ pendingLegacy: legacy }),

  /* ---------- save / resume ---------- */

  saveRun: (immediate = false) => {
    const write = () => {
      const { char, yearProgress, inRun } = get();
      if (!inRun) return;
      if (!char.alive) {
        clearSavedRun();
        set({ savedRun: null });
        return;
      }
      const savedAt = new Date().toISOString();
      const payload = { char, yearProgress, savedAt };
      try {
        localStorage.setItem(RUN_KEY, JSON.stringify(payload));
      } catch {
        // ignore quota errors
      }
      set({ savedRun: { char, yearProgress, savedAt }, lastSavedAt: savedAt });
      cityArchiveAPI.saveRunState(payload).catch(() => {});
    };
    clearTimeout(saveTimer);
    if (immediate) write();
    else saveTimer = setTimeout(write, 1200);
  },

  resumeRun: () => {
    const run = get().savedRun;
    if (!run) return;
    const char = cloneChar(run.char);
    lifeRng = lifeRngFor(char);
    set({ char, inRun: true, yearProgress: run.yearProgress || 0, speed: 1, stageFx: null, minorRemainingMs: MINOR_WINDOW_MS });
  },

  // Leave the run without losing it
  exitToSetup: () => {
    get().saveRun(true);
    set({ inRun: false, speed: 1 });
  },

  // Throw the current run away and go back to the birth screen
  abandonRun: () => {
    clearTimeout(saveTimer);
    clearSavedRun();
    set({ inRun: false, speed: 1, yearProgress: 0, savedRun: null });
  },

  /* ---------- archive ---------- */

  hydrateFromBackend: async () => {
    try {
      const snapshot = await cityArchiveAPI.getArchiveSnapshot();
      const state = get();
      const mergedCodex = Array.from(new Set([...state.globalCodex, ...(snapshot.globalCodex || [])]));
      const mergedLives = snapshot.pastLives && snapshot.pastLives.length > 0 ? snapshot.pastLives : state.pastLives;
      saveMeta(mergedLives, mergedCodex);

      const nextChar = cloneChar(state.char);
      if (Array.isArray(snapshot.customEvents) && snapshot.customEvents.length > 0) {
        nextChar.weaver = { ...nextChar.weaver, customEvents: snapshot.customEvents };
      }

      // A run saved on the server (cleared storage, another browser) can be resumed too
      let savedRunNext = state.savedRun;
      if (!savedRunNext) {
        const remote = await cityArchiveAPI.getRunState().catch(() => null);
        if (remote?.char?.alive) {
          savedRunNext = { char: cloneChar(remote.char), yearProgress: remote.yearProgress || 0, savedAt: remote.savedAt };
        }
      }

      set({
        backendOnline: true,
        pastLives: mergedLives,
        globalCodex: mergedCodex,
        pendingLegacy: state.pendingLegacy || mergedLives[0] || null,
        telemetry: snapshot.telemetry || null,
        char: state.inRun ? state.char : nextChar,
        savedRun: savedRunNext
      });
    } catch {
      set({ backendOnline: false });
    }
  },

  syncMetaFromChar: (nextChar) => {
    const state = get();
    const newlyUnlocked = (nextChar.unlockedRecords || []).filter((k) => !state.globalCodex.includes(k));
    const mergedCodex = Array.from(new Set([...state.globalCodex, ...(nextChar.unlockedRecords || [])]));
    let nextPastLives = state.pastLives;
    let nextPendingLegacy = state.pendingLegacy;

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach((key) => {
        const rec = CODEX_RECORDS.find((r) => r.key === key);
        if (rec) {
          notification.open({
            message: `Mở khóa thành tựu · ${rec.vi}`,
            description: rec.hintVi,
            placement: 'bottomLeft',
            duration: 3.5
          });
        }
      });
      cityArchiveAPI.syncCodex(mergedCodex).catch(() => {});
    }

    if (!nextChar.alive) {
      const summary = buildLifeSummaryAndLegacy(nextChar);
      nextPendingLegacy = summary;
      if (!nextPastLives.some((p) => p.seed === summary.seed && p.age === summary.age)) {
        nextPastLives = [summary, ...nextPastLives].slice(0, 30);
        cityArchiveAPI
          .saveMemorial(summary)
          .then((res) => {
            if (res?.telemetry) set({ telemetry: res.telemetry, backendOnline: true });
          })
          .catch(() => {});
      }
      clearSavedRun();
    }

    saveMeta(nextPastLives, mergedCodex);
    return {
      globalCodex: mergedCodex,
      pastLives: nextPastLives,
      pendingLegacy: nextPendingLegacy,
      ...(nextChar.alive ? {} : { savedRun: null })
    };
  },

  // Every change to the character goes through here, so deltas, effects and saving stay consistent
  commit: (prev, next, extra = {}) => {
    const withD = withDeltas(prev, next);
    const fx = stageFxFor(prev, withD);
    const meta = get().syncMetaFromChar(withD);
    set({
      char: withD,
      ...(fx ? { stageFx: { kind: fx, at: Date.now() } } : {}),
      ...(withD.pendingMinor && !prev.pendingMinor ? { minorRemainingMs: MINOR_WINDOW_MS } : {}),
      ...meta,
      ...extra
    });
    if (withD.alive) get().saveRun();
  },

  /* ---------- life ---------- */

  startLife: (useLegacy = false) => {
    const state = get();
    const legacyPkg = useLegacy ? state.pendingLegacy : null;
    const nextChar = createNewCharacter({
      customName: state.customName,
      seed: state.customSeed,
      preferredRegionId: state.selectedRegion,
      parentLegacy: legacyPkg
    });
    lifeRng = createRNG(`${nextChar.seed}:life`);
    planYear(nextChar, lifeRng);
    const metaUpdates = get().syncMetaFromChar(nextChar);
    set({ char: nextChar, inRun: true, speed: 1, yearProgress: 0, stageFx: null, ...metaUpdates });
    get().saveRun(true);

    // Offload to .NET 8 Director backend for authoritative verification
    syncPlanWithBackend(nextChar, lifeRng).then((synced) => {
      if (get().inRun && get().char?.age === synced.age) {
        set({ char: cloneChar(synced) });
      }
    });
  },

  /** Advances the year by real elapsed time. Called by the layout's loop. */
  tick: (dtMs) => {
    const s = get();
    const c = s.char;
    if (!s.inRun || !c.alive || s.speed === 0) return;
    if (c.pendingEvent || c.pendingContract || c.pendingModal) return;

    if (c.pendingMinor) {
      const remaining = s.minorRemainingMs - dtMs;
      if (s.autoPlay && MINOR_WINDOW_MS - remaining >= AUTO_MINOR_MS) {
        get().chooseMinor(Math.floor(lifeRng() * c.pendingMinor.choices.length));
        return;
      }
      if (remaining <= 0) {
        get().chooseMinor(-1);
        return;
      }
      // Time keeps moving at 1×, but never past the next moment of the year
      const next = nextPlanItem(c);
      const cap = next ? next.t * 100 - 0.4 : 99.6;
      set({ minorRemainingMs: remaining, yearProgress: Math.max(s.yearProgress, Math.min(cap, s.yearProgress + (dtMs / YEAR_MS) * 100)) });
      return;
    }

    const progress = Math.min(100, s.yearProgress + (dtMs / YEAR_MS) * 100 * s.speed);
    const { char, changed } = runDueItems(c, progress, lifeRng);
    if (changed) {
      const waiting = char.pendingMinor || char.pendingEvent || char.pendingContract || char.pendingModal;
      const item = char.plan?.[(char.planCursor || 1) - 1];
      get().commit(c, char, { yearProgress: waiting && item ? Math.max(s.yearProgress, item.t * 100) : progress });
      if (waiting || !char.alive) return;
    }
    const cur = get().char;
    if (progress >= 100 && cur.alive && !nextPlanItem(cur)) {
      const nextChar = endYear(cur, lifeRng);
      get().commit(cur, nextChar, { yearProgress: 0 });
      syncPlanWithBackend(nextChar, lifeRng).then((synced) => {
        if (get().char?.age === synced.age) {
          get().commit(get().char, synced);
        }
      });
    } else if (!changed) {
      const liveSeason = Math.min(3, Math.floor(progress / 25));
      if (cur.seasonIdx !== liveSeason) {
        cur.seasonIdx = liveSeason;
      }
      set({ yearProgress: progress });
    }
  },

  /**
   * Advances time to either the next scheduled event in the current season,
   * or to the boundary of the next season, whichever comes first.
   * If at the end of the year, advances to the next year.
   */
  stepYear: () => {
    const s = get();
    const c = s.char;
    if (!c.alive || c.pendingEvent || c.pendingContract || c.pendingModal || c.pendingMinor) return;

    const curP = s.yearProgress;
    const nextItem = nextPlanItem(c);
    const curSeasonIdx = Math.min(3, Math.floor((curP + 0.1) / 25));
    const nextSeasonBoundary = Math.min(100, (curSeasonIdx + 1) * 25);
    const itemP = nextItem ? nextItem.t * 100 : null;

    let targetP;
    if (itemP !== null && itemP > curP + 0.2 && itemP <= nextSeasonBoundary) {
      targetP = itemP;
    } else {
      targetP = nextSeasonBoundary;
    }

    const { char, changed } = runDueItems(c, targetP, lifeRng);
    const waiting = char.pendingMinor || char.pendingEvent || char.pendingContract || char.pendingModal;
    if (waiting || !char.alive) {
      const item = char.plan?.[(char.planCursor || 1) - 1];
      get().commit(c, char, { yearProgress: item ? item.t * 100 : targetP });
      return;
    }

    if (targetP >= 100 && !nextPlanItem(char)) {
      const base = changed ? char : c;
      const nextChar = endYear(base, lifeRng);
      get().commit(c, nextChar, { yearProgress: 0 });
      syncPlanWithBackend(nextChar, lifeRng).then((synced) => {
        if (get().char?.age === synced.age) {
          get().commit(get().char, synced);
        }
      });
      return;
    }

    const nextSeasonIdx = Math.min(3, Math.floor(targetP / 25));
    if (char.seasonIdx !== nextSeasonIdx) {
      char.seasonIdx = nextSeasonIdx;
    }
    const base = changed ? char : c;
    get().commit(c, base, { yearProgress: targetP });
  },

  stepSeasonOrEvent: () => get().stepYear(),

  chooseMinor: (idx) => {
    const prev = get().char;
    if (!prev.pendingMinor) return;
    get().commit(prev, resolveMinor(prev, idx, lifeRng));
  },

  selectEventChoice: (choiceIdx) => {
    const prev = get().char;
    if (!prev.pendingEvent) return;
    const nextChar = resolveEventChoice(prev, choiceIdx, lifeRng);
    get().commit(prev, nextChar);

    // Refresh career milestone from backend after event decision
    const snap = buildCharSnapshot(nextChar);
    if (snap) {
      cityArchiveAPI.getCareerMilestone(snap).then((ms) => {
        if (ms && get().char?.age === nextChar.age) {
          set({ char: { ...get().char, serverMilestone: ms } });
        }
      }).catch(() => {});
    }
  },

  selectContractApproach: (approachId) => {
    const prev = get().char;
    if (!prev.pendingContract) return;
    get().commit(prev, resolveFixerContract(prev, approachId, lifeRng));
  },

  confirmColorTitle: (titleText) => {
    const prev = get().char;
    const next = cloneChar(prev);
    next.customTitle = (titleText || '').trim() || 'The Crimson Dusk';
    next.pendingModal = null;
    if (!next.unlockedRecords.includes('color_fixer')) next.unlockedRecords.push('color_fixer');
    next.logs.push({
      id: `log_color_named_${next.age}`,
      age: next.age,
      season: SEASONS[next.seasonIdx],
      type: 'miracle',
      vi: `Hana Association công bố tên Color của bạn. Từ hôm nay, cả 26 District gọi bạn là 「${next.customTitle}」.`,
      en: `Hana Association announced your Color. From today, all 26 Districts call you 「${next.customTitle}」.`
    });
    get().commit(prev, next);
  },

  confirmEgoName: (egoText) => {
    const prev = get().char;
    const next = cloneChar(prev);
    next.egoName = (egoText || '').trim() || 'Penitence of Ash';
    next.pendingModal = null;
    if (!next.unlockedRecords.includes('ego_effloresced')) next.unlockedRecords.push('ego_effloresced');
    next.logs.push({
      id: `log_ego_named_${next.age}`,
      age: next.age,
      season: SEASONS[next.seasonIdx],
      type: 'miracle',
      vi: `Nỗi đau của bạn kết tinh thành E.G.O. Bạn gọi nó là 「${next.egoName}」.`,
      en: `Your pain crystallized into E.G.O. You named it 「${next.egoName}」.`
    });
    get().commit(prev, next);
  },

  completeWorkshopCraft: (weaponObj) => {
    const prev = get().char;
    const next = cloneChar(prev);
    next.craftWeapon = weaponObj;
    next.pendingModal = null;
    if (!next.unlockedRecords.includes('workshop_masterpiece')) next.unlockedRecords.push('workshop_masterpiece');
    next.logs.push({
      id: `log_craft_done_${next.age}`,
      age: next.age,
      season: SEASONS[next.seasonIdx],
      type: 'miracle',
      vi: `Bạn rèn xong 「${weaponObj.name}」 (${weaponObj.gradeLabel}). Tres Association đóng dấu đăng ký.`,
      en: `You finished forging 「${weaponObj.name}」 (${weaponObj.gradeLabel}). Tres Association stamped its registration.`
    });
    get().commit(prev, next);
  },

  addCustomEvent: (customEv) => {
    const state = get();
    const next = cloneChar(state.char);
    next.weaver = { ...next.weaver, customEvents: [customEv, ...(next.weaver.customEvents || [])] };
    cityArchiveAPI.saveCustomEvent(customEv).catch(() => {});
    set({ char: next });
  }
}));

// Keep the run if the tab closes mid-year
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => useGameStore.getState().saveRun(true));
}

export default useGameStore;
