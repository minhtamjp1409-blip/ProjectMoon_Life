import { workshopPrice } from '../engine/cityConditions.js';
import { create } from 'zustand';
import { notification } from 'antd';
import {
  SEASONS,
  createRNG,
  createNewCharacter,
  resolveEventChoice,
  resolveFixerContract,
  setDungeonStance,
  useDungeonSupply,
  playDungeonCard,
  useDungeonEgo,
  resolveDungeonChoice,
  fleeDungeon,
  createDungeonSession,
  buildLifeSummaryAndLegacy,
  cloneChar,
  interpolateText
} from '../engine/gameEngine.js';
import { planYear, chooseYearLead, syncPlanWithBackend, runDueItems, resolveMinor, endYear, nextPlanItem, diffStats, MINOR_WINDOW_MS, splitTitle, LIFE_MINORS } from '../engine/yearPlanner.js';
import { CODEX_RECORDS } from '../data/worldData.js';
import { getItemById } from '../data/itemsData.js';
import { cityArchiveAPI } from '../services/api/cityArchiveAPI.js';
import { migrateRun, SAVE_VERSION } from '../engine/saveSchema.js';
import { createPlanSynchronizer } from '../engine/planSync.js';
import { useThemeStore } from './themeStore.js';
import { choiceIsAvailable } from '../engine/eventConditions.js';
import { CLAW_DUNGEON_ID } from '../data/dungeonClaw.js';
import { applyAnnualPlan, ambitionsFor, defaultYearPoints } from '../engine/annualPlan.js';

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
    })),
    annualTrain: char.annualPlan?.age === char.age ? char.annualPlan.points?.train || 0 : 0,
    annualWork: char.annualPlan?.age === char.age ? char.annualPlan.points?.work || 0 : 0,
    annualBond: char.annualPlan?.age === char.age ? char.annualPlan.points?.bond || 0 : 0,
    annualRest: char.annualPlan?.age === char.age ? char.annualPlan.points?.rest || 0 : 0,
    annualScheme: char.annualPlan?.age === char.age ? char.annualPlan.points?.scheme || 0 : 0,
    ambition: char.ambition?.id || ''
  };
}

/* ---------- persistence ---------- */

function loadSavedMeta() {
  try {
    const raw = JSON.parse(localStorage.getItem(META_KEY) || '{}');
    return {
      pastLives: Array.isArray(raw.pastLives) ? raw.pastLives : [],
      globalCodex: Array.isArray(raw.globalCodex) ? raw.globalCodex : []
    };
  } catch {
    return { pastLives: [], globalCodex: [] };
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
    const raw = migrateRun(JSON.parse(localStorage.getItem(RUN_KEY) || 'null'));
    if (!raw) return null;
    return { char: cloneChar(raw.char), yearProgress: raw.yearProgress || 0, rngState: raw.rngState, activePlayMs: raw.activePlayMs || 0, savedAt: raw.savedAt };
  } catch {
    return null;
  }
}

function clearSavedRun() {
  const clearAfterRequest = ++saveRequestId;
  try {
    localStorage.removeItem(RUN_KEY);
  } catch {
    // ignore
  }
  Promise.allSettled([...pendingRunWrites]).then(() => {
    if (clearAfterRequest === saveRequestId) return cityArchiveAPI.clearRunState();
    return null;
  }).catch(() => {});
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
  if (next.endingId === 'library_threshold' && prev.endingId !== next.endingId) return 'gold';
  if (!next.alive && prev.alive) return 'death';
  if (next.pendingModal === 'ego_name' && prev.pendingModal !== 'ego_name') return 'ego';
  if (next.flags.includes('Distorted') && !prev.flags.includes('Distorted')) return 'distort';
  if (fresh.some((l) => (l.deltas || []).some((d) => d.k === 'fate' && d.v === 'dead'))) return 'loss';
  if (fresh.some((l) => l.type === 'miracle' || l.type === 'promo')) return 'gold';
  if (fresh.some((l) => l.type === 'danger')) return 'blood';
  if (fresh.some((l) => l.type === 'causal')) return 'echo';
  return null;
}

function enforceTabooJudgment(char) {
  if (!char?.alive || (char.taboo || 0) < 3 || char.pendingDungeon) return char;
  const next = cloneChar(char);
  next.pendingEvent = null;
  next.pendingMinor = null;
  next.pendingContract = null;
  next.pendingModal = null;
  next.pendingDungeon = createDungeonSession(CLAW_DUNGEON_ID, next);
  next.logs.push({
    id: `claw_arrival_${next.age}_${next.logs.length}`,
    age: next.age,
    type: 'danger',
    vi: '[Án của The Head] Taboo Gaze đã chạm 3/3. Một đường cắt xanh mở ra ngay trước mặt bạn. Claw đã đến.',
    en: '[The Head’s Judgment] Taboo Gaze has reached 3/3. A blue cut opens before you. The Claw has arrived.'
  });
  return next;
}

// A finished delve is summarized once, against the state the player went in with
function dungeonResolution(prevChar, nextChar, resolution) {
  return {
    id: `res_dungeon_${Date.now()}`,
    kind: 'dungeon',
    outcome: resolution.outcome,
    age: nextChar.age,
    seasonIdx: nextChar.seasonIdx,
    titleVi: resolution.titleVi,
    titleEn: resolution.titleEn,
    choiceLabelVi: '',
    choiceLabelEn: '',
    narrativeVi: resolution.resultVi,
    narrativeEn: resolution.resultEn,
    deltas: dungeonDeltas(prevChar.pendingDungeon, nextChar),
    isDead: Boolean(resolution.isDead),
    isEnding: Boolean(resolution.isEnding),
    isCausal: false
  };
}

function dungeonDeltas(prevSession, nextChar) {
  const snap = prevSession?.startSnapshot;
  if (!snap) return [];
  const deltas = diffStats({ stats: snap.stats, merit: snap.merit, resonance: snap.resonance, heat: snap.heat, taboo: snap.taboo }, nextChar);
  for (const scar of nextChar.scars || []) if (!(snap.scars || []).includes(scar)) deltas.push({ k: 'scar', name: scar });
  return deltas;
}

export function buildResolutionPayload({
  prevChar,
  nextChar,
  kind,
  titleVi,
  titleEn,
  choiceLabelVi,
  choiceLabelEn
}) {
  if (!prevChar || !nextChar) return null;

  // Fresh logs added in this step
  const freshLogs = nextChar.logs.slice(prevChar.logs.length);
  const mainLog = freshLogs[0] || nextChar.logs[nextChar.logs.length - 1];

  // Deltas
  const deltas = [...(mainLog?.deltas || diffStats(prevChar, nextChar))];

  // Scars
  const newScars = (nextChar.scars || []).filter((s) => !(prevChar.scars || []).includes(s));
  newScars.forEach((s) => {
    if (!deltas.some((d) => d.k === 'scar' && d.name === s)) {
      deltas.push({ k: 'scar', name: s });
    }
  });

  // Job / Path
  if (nextChar.job && nextChar.job !== prevChar.job) {
    deltas.push({ k: 'job', v: nextChar.job });
  }

  // Fixer Grade
  if (nextChar.fixerGrade !== undefined && nextChar.fixerGrade !== prevChar.fixerGrade) {
    deltas.push({ k: 'fixerGrade', v: nextChar.fixerGrade });
  }

  // Faction Ranks
  if ((nextChar.fingerRank || 0) > (prevChar.fingerRank || 0)) {
    deltas.push({ k: 'fingerRank', v: nextChar.fingerRank });
  }
  if ((nextChar.wingRank || 0) > (prevChar.wingRank || 0)) {
    deltas.push({ k: 'wingRank', v: nextChar.wingRank });
  }

  // NPC relationships
  const prevNpcs = prevChar.npcs || {};
  const nextNpcs = nextChar.npcs || {};
  for (const role of Object.keys(nextNpcs)) {
    const pNpc = prevNpcs[role];
    const nNpc = nextNpcs[role];
    if (nNpc && !pNpc) {
      const name = nNpc.nameVi || nNpc.nameEn || role;
      if (!deltas.some((d) => d.k === 'meet' && d.name === name)) {
        deltas.push({ k: 'meet', name });
      }
    } else if (nNpc && pNpc) {
      const name = nNpc.nameVi || nNpc.nameEn || role;
      if (nNpc.status === 'dead' && pNpc.status !== 'dead') {
        if (!deltas.some((d) => d.k === 'fate' && d.v === 'dead' && d.name === name)) {
          deltas.push({ k: 'fate', v: 'dead', name });
        }
      } else if (nNpc.bond !== pNpc.bond) {
        if (!deltas.some((d) => d.k === 'bond' && d.name === name)) {
          deltas.push({ k: 'bond', v: nNpc.bond - pNpc.bond, name });
        }
      }
    }
  }

  const rawVi = mainLog?.vi || '';
  const rawEn = mainLog?.en || '';
  const splitVi = splitTitle(rawVi);
  const splitEn = splitTitle(rawEn);

  const cleanTitleVi = interpolateText(titleVi || splitVi.title || 'Kết quả biến cố', nextChar);
  const cleanTitleEn = interpolateText(titleEn || splitEn.title || 'Decision Outcome', nextChar);

  return {
    id: `res_${nextChar.age}_${Date.now()}`,
    kind,
    age: nextChar.age,
    seasonIdx: nextChar.seasonIdx,
    titleVi: cleanTitleVi,
    titleEn: cleanTitleEn,
    choiceLabelVi: interpolateText(choiceLabelVi || mainLog?.choiceVi || '', nextChar),
    choiceLabelEn: interpolateText(choiceLabelEn || mainLog?.choiceEn || '', nextChar),
    narrativeVi: interpolateText(splitVi.body || rawVi, nextChar),
    narrativeEn: interpolateText(splitEn.body || rawEn, nextChar),
    deltas,
    isDead: !nextChar.alive,
    isCausal: Boolean(prevChar.pendingEvent?.isCausalCallback)
  };
}

const savedMeta = loadSavedMeta();
const initialChar = createNewCharacter({});
let lifeRng = createRNG(initialChar.seed);
let lifeActiveMs = 0;
let saveTimer = null;
let saveRequestId = 0;
const pendingRunWrites = new Set();
const synchronizePlan = createPlanSynchronizer({ plan: syncPlanWithBackend, clone: cloneChar, createRng: createRNG });
const requestPlanSync = (get) => get().char?.pendingYearPlan
  ? Promise.resolve(false)
  : synchronizePlan(get, (before, synced) => get().commit(before, synced)).catch(() => false);
const reportGameplaySample = (char, abandoned = false) => {
  if (!char?.seed || !useThemeStore.getState().gameplayMetricsEnabled) return;
  cityArchiveAPI.recordGameplaySample({
    runKey: char.seed,
    age: Math.max(0, Math.min(200, char.age || 0)),
    minutes: Math.max(0, Math.min(100000, Math.round(lifeActiveMs / 60000))),
    firstDungeonOutcome: char.firstDungeonOutcome || 'none',
    abandoned
  }).catch(() => {});
};

export const useGameStore = create((set, get) => ({
  inRun: false,
  char: initialChar,
  speed: 1,
  autoPlay: false,
  yearProgress: 0,
  minorRemainingMs: 0,
  stageFx: null,
  activeResolution: null,
  postChoicePauseMs: 0,
  backendOnline: false,
  telemetry: null,
  savedRun: loadSavedRun(),
  lastSavedAt: null,
  saveError: false,

  // Start form
  customName: '',
  gender: 'male',
  customSeed: '',
  selectedRegion: 'RANDOM',
  selectedFamily: 'RANDOM',

  // Meta progression
  pastLives: savedMeta.pastLives,
  globalCodex: savedMeta.globalCodex,
  pendingLegacy: savedMeta.pastLives.find((life) => !life.endingId) || null,

  setConfigField: (field, value) => set({ [field]: value }),
  setSpeed: (speed) => set((s) => ({ speed, ...(speed === 0 ? { postChoicePauseMs: 0 } : {}) })),
  toggleAutoPlay: () => set((s) => ({ autoPlay: !s.autoPlay })),
  dismissResolution: () => set({ activeResolution: null, postChoicePauseMs: 0 }),
  clearPostChoicePause: () => set({ postChoicePauseMs: 0 }),
  setPendingLegacy: (legacy) => set({ pendingLegacy: legacy }),

  discardPendingLegacy: (deleteFromArchive = false) => {
    const state = get();
    const legacy = state.pendingLegacy;
    if (!legacy) return;
    let nextPastLives = state.pastLives;
    if (deleteFromArchive) {
      nextPastLives = state.pastLives.filter((l) => !(l.seed === legacy.seed && l.age === legacy.age));
      cityArchiveAPI.deleteMemorial(legacy.seed, legacy.age).catch(() => {});
    }
    saveMeta(nextPastLives, state.globalCodex);
    set({ pendingLegacy: null, pastLives: nextPastLives });
  },

  deletePastLife: (seed, age) => {
    const state = get();
    const nextPastLives = state.pastLives.filter((l) => !(l.seed === seed && l.age === age));
    const isCurrentLegacy = state.pendingLegacy?.seed === seed && state.pendingLegacy?.age === age;
    const nextLegacy = isCurrentLegacy ? (nextPastLives[0] || null) : state.pendingLegacy;
    saveMeta(nextPastLives, state.globalCodex);
    set({ pastLives: nextPastLives, pendingLegacy: nextLegacy });
    cityArchiveAPI.deleteMemorial(seed, age).catch(() => {});
  },

  clearBloodline: () => {
    const state = get();
    saveMeta([], state.globalCodex);
    set({ pastLives: [], pendingLegacy: null });
    cityArchiveAPI.clearMemorials().catch(() => {});
  },

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
      const rngState = lifeRng.getState();
      const activePlayMs = Math.floor(lifeActiveMs);
      const payload = { version: SAVE_VERSION, char, yearProgress, rngState, activePlayMs, savedAt };
      const requestId = ++saveRequestId;
      let savedLocally = false;
      try {
        localStorage.setItem(RUN_KEY, JSON.stringify(payload));
        savedLocally = true;
      } catch {}
      if (savedLocally) set({ savedRun: { char, yearProgress, rngState, activePlayMs, savedAt }, lastSavedAt: savedAt, saveError: false });
      const remoteWrite = cityArchiveAPI.saveRunState(payload)
        .then(() => {
          if (!savedLocally && requestId === saveRequestId) {
            set({ savedRun: { char, yearProgress, rngState, activePlayMs, savedAt }, lastSavedAt: savedAt, saveError: false });
          }
        })
        .catch(() => {
          if (!savedLocally && requestId === saveRequestId) set({ saveError: true });
        });
      pendingRunWrites.add(remoteWrite);
      remoteWrite.finally(() => pendingRunWrites.delete(remoteWrite));
    };
    clearTimeout(saveTimer);
    if (immediate) write();
    else saveTimer = setTimeout(write, 1200);
  },

  resumeRun: () => {
    const run = get().savedRun;
    if (!run) return;
    const char = enforceTabooJudgment(cloneChar(run.char));
    lifeRng = run.rngState ? createRNG(`${char.seed}:life:${char.age}`, run.rngState) : lifeRngFor(char);
    lifeActiveMs = run.activePlayMs || 0;
    set({ char, inRun: true, yearProgress: run.yearProgress || 0, speed: 1, stageFx: null, activeResolution: null, postChoicePauseMs: 0, minorRemainingMs: MINOR_WINDOW_MS });
  },

  // Leave the run without losing it
  exitToSetup: () => {
    get().saveRun(true);
    set({ inRun: false, speed: 1, activeResolution: null, postChoicePauseMs: 0 });
  },

  buyItem: (itemId) => {
    const state = get();
    const char = state.char;
    if (!char || !char.alive) return;
    const item = getItemById(itemId);
    if (!item) return;
    const wealth = char.stats?.wealth ?? char.wealth ?? 0;
    const price = workshopPrice(item, char);
    if (wealth < price) return;

    const nextChar = cloneChar(char);
    if (!Array.isArray(nextChar.inventory)) nextChar.inventory = [];
    nextChar.inventory.push(item);
    nextChar.stats.wealth = wealth - price;

    if (!nextChar.equipped) nextChar.equipped = { weapon: null, armor: null, consumable: null };
    if (item.type === 'weapon') nextChar.equipped.weapon = item;
    if (item.type === 'armor') {
      nextChar.equipped.armor = item;
      if (item.stats?.health) nextChar.stats.health = Math.min(100, nextChar.stats.health + item.stats.health);
    }
    if (item.type === 'consumable') nextChar.equipped.consumable = item;
    if (item.flagGranted && !nextChar.flags.includes(item.flagGranted)) {
      nextChar.flags.push(item.flagGranted);
    }
    if (item.tabooClear) nextChar.taboo = Math.max(0, (nextChar.taboo || 0) - item.tabooClear);
    if (item.heatClear) nextChar.heat = Math.max(0, (nextChar.heat || 0) - item.heatClear);

    nextChar.logs.push({
      id: `log_buy_${itemId}_${Date.now()}`,
      age: nextChar.age,
      season: SEASONS[nextChar.seasonIdx || 0],
      type: 'major',
      vi: `[Mua sắm Workshop] Bạn đã chi ${price} Ahn để sở hữu 「${item.nameVi}」.`,
      en: `[Workshop Purchase] You spent ${price} Ahn to acquire "${item.nameEn}".`
    });

    set({ char: nextChar });
    get().saveRun(true);
  },

  useConsumableItem: (itemId) => {
    const state = get();
    const char = state.char;
    if (!char || !char.alive) return;
    const inv = Array.isArray(char.inventory) ? char.inventory : [];
    const idx = inv.findIndex(i => i.id === itemId);
    if (idx === -1) return;

    const item = inv[idx];
    const nextChar = cloneChar(char);
    nextChar.inventory.splice(idx, 1);

    if (item.sanityRestore) {
      nextChar.stats.sanity = Math.min(100, nextChar.stats.sanity + item.sanityRestore);
    }
    if (item.autoReviveHp) {
      nextChar.stats.health = Math.min(100, nextChar.stats.health + item.autoReviveHp);
    }

    set({ char: nextChar });
    get().saveRun(true);
  },

  // Throw the current run away and go back to the birth screen
  abandonRun: () => {
    if (get().inRun && get().char?.alive) reportGameplaySample(get().char, true);
    clearTimeout(saveTimer);
    clearSavedRun();
    set({ inRun: false, speed: 1, yearProgress: 0, savedRun: null, activeResolution: null, postChoicePauseMs: 0 });
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
        const upgraded = migrateRun(remote);
        if (upgraded) {
          savedRunNext = { char: cloneChar(upgraded.char), yearProgress: upgraded.yearProgress || 0, rngState: upgraded.rngState, activePlayMs: upgraded.activePlayMs || 0, savedAt: upgraded.savedAt };
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
    if (newlyUnlocked.length > 0) {
      nextChar.newRecordsThisLife = Array.from(new Set([...(nextChar.newRecordsThisLife || []), ...newlyUnlocked]));
    }
    const mergedCodex = Array.from(new Set([...state.globalCodex, ...(nextChar.unlockedRecords || [])]));
    let nextPastLives = state.pastLives;
    let nextPendingLegacy = state.pendingLegacy;

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach((key) => {
        const rec = CODEX_RECORDS.find((r) => r.key === key);
        if (rec) {
          try {
            // On a phone the bottom edge is the decision dock, so the toast goes to the top
            notification.open({
              title: `Mở khóa thành tựu · ${rec.vi}`,
              description: rec.hintVi,
              placement: typeof window !== 'undefined' && window.innerWidth <= 820 ? 'top' : 'bottomLeft',
              className: 'achievement-toast',
              duration: 3.2
            });
          } catch {
            // ignore in headless / test environment
          }
        }
      });
      cityArchiveAPI.syncCodex(mergedCodex).catch(() => {});
    }

    if (!nextChar.alive) {
      const summary = buildLifeSummaryAndLegacy(nextChar);
      reportGameplaySample(nextChar);
      nextPendingLegacy = summary.endingId ? null : summary;
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
    const withD = withDeltas(prev, enforceTabooJudgment(next));
    if (!withD.firstDungeonId && withD.pendingDungeon?.id) withD.firstDungeonId = withD.pendingDungeon.id;
    if (!withD.firstDungeonOutcome && prev.pendingDungeon && !withD.pendingDungeon &&
        prev.pendingDungeon.id === (withD.firstDungeonId || prev.firstDungeonId)) {
      withD.firstDungeonOutcome = extra.activeResolution?.outcome || (!withD.alive ? 'dead' : 'broken');
    }
    const fx = stageFxFor(prev, withD);
    const meta = get().syncMetaFromChar(withD);
    set({
      char: withD,
      ...(fx ? { stageFx: { kind: fx, at: Date.now() } } : {}),
      ...(withD.pendingMinor && !prev.pendingMinor ? { minorRemainingMs: MINOR_WINDOW_MS } : {}),
      ...meta,
      ...extra,
      ...(withD.pendingDungeon?.id === CLAW_DUNGEON_ID && !prev.pendingDungeon ? { postChoicePauseMs: 0, activeResolution: null } : {})
    });
    if (withD.alive) get().saveRun();
  },

  /* ---------- life ---------- */

  revealNextBirthLog: () => {
    const s = get();
    const c = s.char;
    if (!c || !c.pendingBirthLogs || c.pendingBirthLogs.length === 0) return false;
    const [nextLog, ...remaining] = c.pendingBirthLogs;
    const nextLogs = [...(c.logs || []), nextLog];
    const isDone = remaining.length === 0;
    const nextChar = cloneChar({
      ...c,
      logs: nextLogs,
      pendingBirthLogs: remaining
    });
    set({
      char: nextChar,
      speed: isDone && nextChar.alive ? 1 : 0
    });
    if (isDone) {
      get().saveRun(true);
    }
    return true;
  },

  skipAllBirthLogs: () => {
    const s = get();
    const c = s.char;
    if (!c || !c.pendingBirthLogs || c.pendingBirthLogs.length === 0) return;
    const nextLogs = [...(c.logs || []), ...c.pendingBirthLogs];
    const nextChar = cloneChar({
      ...c,
      logs: nextLogs,
      pendingBirthLogs: []
    });
    set({
      char: nextChar,
      speed: nextChar.alive ? 1 : 0
    });
    get().saveRun(true);
  },

  // regionId: where the home screen's wheel landed, when the birthplace was left to chance
  startLife: (useLegacy = false, startAge = 0, regionId = null) => {
    const state = get();
    const legacyPkg = useLegacy ? state.pendingLegacy : null;
    const nextChar = createNewCharacter({
      customName: state.customName,
      gender: state.gender === 'female' ? 'female' : 'male',
      seed: state.customSeed,
      preferredRegionId: regionId || state.selectedRegion,
      preferredFamilyId: state.selectedFamily || 'RANDOM',
      parentLegacy: legacyPkg,
      startAge
    });
    lifeRng = createRNG(`${nextChar.seed}:life:${nextChar.age}`);
    lifeActiveMs = 0;
    planYear(nextChar, lifeRng);
    if (nextChar.job !== 'Child') nextChar.pendingYearPlan = { age: nextChar.age };
    const metaUpdates = get().syncMetaFromChar(nextChar);
    const hasBirthLogs = Boolean(nextChar.pendingBirthLogs && nextChar.pendingBirthLogs.length > 0);
    set({
      char: nextChar,
      inRun: true,
      speed: hasBirthLogs ? 0 : 1,
      yearProgress: 0,
      stageFx: null,
      activeResolution: null,
      postChoicePauseMs: 0,
      ...metaUpdates
    });
    if (!hasBirthLogs) {
      get().saveRun(true);
    }

    requestPlanSync(get);
  },

  /** Advances the year by real elapsed time. Called by the layout's loop. */
  tick: (dtMs) => {
    const s = get();
    const c = s.char;
    if (!s.inRun || !c.alive) return;
    if (s.speed > 0) lifeActiveMs += Math.max(0, Math.min(1000, dtMs));
    if (s.activeResolution) return;
    if (c.pendingYearPlan) {
      if (s.autoPlay && s.speed > 0 && !(c.pendingBirthLogs || []).length) {
        const leadIndex = c.pendingLead ? Math.floor(lifeRng() * c.pendingLead.offers.length) : null;
        get().chooseAnnualPlan(c.lastYearPoints || defaultYearPoints(), c.ambition?.id || ambitionsFor(c)[0].id, leadIndex);
      }
      return;
    }
    if (c.pendingLead) {
      if (s.autoPlay && s.speed > 0 && !(c.pendingBirthLogs || []).length) get().chooseYearLead(Math.floor(lifeRng() * c.pendingLead.offers.length));
      return;
    }
    if (c.pendingEvent || c.pendingContract || c.pendingDungeon || c.pendingModal) return;

    // Post-choice reading pause: gives ~3 seconds on outer screen before timeline flows
    if (s.postChoicePauseMs > 0) {
      const nextPause = s.speed === 0 ? 0 : Math.max(0, s.postChoicePauseMs - dtMs);
      set({ postChoicePauseMs: nextPause });
      return;
    }

    if (s.speed === 0) return;

    if (c.pendingMinor) {
      if (c.pendingMinor.annualMerit && !s.autoPlay) return;
      const remaining = s.minorRemainingMs - dtMs;
      if (s.autoPlay && MINOR_WINDOW_MS - remaining >= AUTO_MINOR_MS) {
        const def = LIFE_MINORS.find((event) => event.id === c.pendingMinor.id);
        const available = (def?.choices || []).map((choice, index) => choiceIsAvailable(choice, c) ? index : -1).filter((index) => index >= 0);
        get().chooseMinor(available.length ? available[Math.floor(lifeRng() * available.length)] : -1);
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
      const waiting = char.pendingMinor || char.pendingEvent || char.pendingContract || char.pendingDungeon || char.pendingModal;
      const item = char.plan?.[(char.planCursor || 1) - 1];
      get().commit(c, char, { yearProgress: waiting && item ? Math.max(s.yearProgress, item.t * 100) : progress });
      if (waiting || !char.alive) return;
    }
    const cur = get().char;
    if (progress >= 100 && cur.alive && !nextPlanItem(cur)) {
      const nextChar = endYear(cur, lifeRng);
      get().commit(cur, nextChar, { yearProgress: 0 });
      requestPlanSync(get);
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
    if (!c.alive || c.pendingYearPlan || c.pendingLead || c.pendingEvent || c.pendingContract || c.pendingDungeon || c.pendingModal || c.pendingMinor || s.activeResolution) return;

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
    const waiting = char.pendingMinor || char.pendingEvent || char.pendingContract || char.pendingDungeon || char.pendingModal;
    if (waiting || !char.alive) {
      const item = char.plan?.[(char.planCursor || 1) - 1];
      get().commit(c, char, { yearProgress: item ? item.t * 100 : targetP, postChoicePauseMs: 0 });
      return;
    }

    if (targetP >= 100 && !nextPlanItem(char)) {
      const base = changed ? char : c;
      const nextChar = endYear(base, lifeRng);
      get().commit(c, nextChar, { yearProgress: 0, postChoicePauseMs: 0 });
      requestPlanSync(get);
      return;
    }

    const nextSeasonIdx = Math.min(3, Math.floor(targetP / 25));
    if (char.seasonIdx !== nextSeasonIdx) {
      char.seasonIdx = nextSeasonIdx;
    }
    const base = changed ? char : c;
    get().commit(c, base, { yearProgress: targetP, postChoicePauseMs: 0 });
  },

  stepSeasonOrEvent: () => get().stepYear(),

  skipQuietTime: () => {
    const startAge = get().char?.age;
    for (let step = 0; step < 5; step++) {
      const before = get();
      if (!before.char?.alive || before.char.age !== startAge || before.char.pendingYearPlan || before.char.pendingLead || before.char.pendingEvent || before.char.pendingContract || before.char.pendingDungeon || before.char.pendingMinor || before.char.pendingModal || before.activeResolution) break;
      const cursor = before.char.planCursor;
      const progress = before.yearProgress;
      get().stepYear();
      const after = get();
      if (after.char.age !== startAge || after.char.planCursor !== cursor || after.yearProgress === progress) break;
    }
  },

  // The year's plan and its lead are one decision: picking a lead also starts the year
  chooseAnnualPlan: (points, ambitionId, leadIndex = null) => {
    const prev = get().char;
    if (!prev?.pendingYearPlan) return false;
    let next = cloneChar(prev);
    if (!applyAnnualPlan(next, points, ambitionId)) return false;
    if (!next.plan?.length) planYear(next, lifeRng);
    if (next.pendingLead && Number.isInteger(leadIndex)) next = chooseYearLead(next, leadIndex);
    get().commit(prev, next, { postChoicePauseMs: 0 });
    requestPlanSync(get);
    return true;
  },

  chooseYearLead: (index) => {
    const prev = get().char;
    if (!prev?.pendingLead || prev.pendingYearPlan) return false;
    const next = chooseYearLead(prev, index);
    if (next === prev) return false;
    get().commit(prev, next, { postChoicePauseMs: 0 });
    return true;
  },

  chooseMinor: (idx) => {
    const prev = get().char;
    if (!prev.pendingMinor) return;
    const prompt = prev.pendingMinor;
    const def = LIFE_MINORS.find((m) => m.id === prompt.id);
    const ignore = def?.ignore || { vi: 'Để nó trôi qua', en: 'Let it pass' };
    const choice = idx >= 0 ? def?.choices?.[idx] : ignore;
    const nextChar = resolveMinor(prev, idx, lifeRng);
    const readingPause = get().speed > 0 && !nextChar.pendingModal ? 3000 : 0;

    get().commit(prev, nextChar, { activeResolution: null, postChoicePauseMs: readingPause });
  },

  selectEventChoice: (choiceIdx, dungeonStake = 0) => {
    const prev = get().char;
    if (!prev.pendingEvent) return;
    const event = prev.pendingEvent;
    const choice = event.choices?.[choiceIdx];
    const nextChar = resolveEventChoice(prev, choiceIdx, lifeRng, dungeonStake);
    if (prev.job === 'Child' && nextChar.job !== 'Child' && nextChar.alive && !nextChar.pendingDungeon) nextChar.pendingYearPlan = { age: nextChar.age };
    const readingPause = get().speed > 0 && !nextChar.pendingModal ? 3000 : 0;

    get().commit(prev, nextChar, { activeResolution: null, postChoicePauseMs: readingPause });
  },

  selectContractApproach: (approachId) => {
    const prev = get().char;
    if (!prev.pendingContract) return;
    const contract = prev.pendingContract;
    const approach = contract.approaches.find((a) => a.id === approachId);
    const nextChar = resolveFixerContract(prev, approachId, lifeRng);
    const readingPause = get().speed > 0 && !nextChar.pendingModal ? 3000 : 0;

    get().commit(prev, nextChar, { activeResolution: null, postChoicePauseMs: readingPause });
  },

  setDungeonStance: (stance) => {
    const prev = get().char;
    if (!prev?.pendingDungeon) return;
    const nextChar = setDungeonStance(prev, stance);
    set({ char: nextChar });
    get().saveRun(false);
  },

  useDungeonSupply: (supplyType) => {
    const prev = get().char;
    if (!prev?.pendingDungeon) return false;
    const nextChar = useDungeonSupply(prev, supplyType);
    if (nextChar === prev) return false;
    get().commit(prev, nextChar, { activeResolution: null });
    return true;
  },

  playDungeonCard: (cardId) => {
    const prev = get().char;
    if (!prev?.pendingDungeon) return false;
    const nextChar = playDungeonCard(prev, cardId);
    if (nextChar === prev) return false;
    get().commit(prev, nextChar, { activeResolution: null });
    return true;
  },

  useDungeonEgo: () => {
    const prev = get().char;
    if (!prev?.pendingDungeon) return false;
    const nextChar = useDungeonEgo(prev);
    if (nextChar === prev) return false;
    get().commit(prev, nextChar, { activeResolution: null });
    return true;
  },

  chooseDungeonAction: (choiceIdx) => {
    const prev = get().char;
    if (!prev.pendingDungeon) return;
    const { char: nextChar, isFinished, resolution } = resolveDungeonChoice(prev, choiceIdx, lifeRng);
    get().commit(prev, nextChar, {
      activeResolution: resolution ? dungeonResolution(prev, nextChar, resolution) : null,
      postChoicePauseMs: isFinished && get().speed > 0 ? 3000 : 0
    });
  },

  fleeDungeon: () => {
    const prev = get().char;
    if (!prev.pendingDungeon) return;
    const { char: nextChar, resolution } = fleeDungeon(prev);
    get().commit(prev, nextChar, {
      activeResolution: resolution ? dungeonResolution(prev, nextChar, resolution) : null,
      postChoicePauseMs: get().speed > 0 ? 3000 : 0
    });
  },

  confirmColorTitle: (colorInput) => {
    const prev = get().char;
    const next = cloneChar(prev);
    const title = typeof colorInput === 'object' && colorInput?.title ? colorInput.title : (colorInput || 'Vermilion Gale');
    const colorData = typeof colorInput === 'object' && colorInput?.color ? colorInput : {
      title,
      color: '#e1341e',
      glow: 'rgba(225, 52, 30, 0.45)'
    };
    next.customTitle = title;
    next.colorData = colorData;
    next.isColorFixer = true;
    next.pendingModal = null;
    if (!next.unlockedRecords.includes('color_fixer')) next.unlockedRecords.push('color_fixer');
    next.logs.push({
      id: `log_color_named_${next.age}`,
      age: next.age,
      season: SEASONS[next.seasonIdx],
      type: 'miracle',
      vi: `Hiệp Hội Hana Phân Khu 1 long trọng ban sắc chỉ phong Color. Kể từ hôm nay, cả 26 Quận đều tôn kính gọi bạn là 「${next.customTitle}」.`,
      en: `Hana Association Section 1 decrees your Color Title. From this day forward, all 26 Districts call you 「${next.customTitle}」.`
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
  window.useGameStore = useGameStore;
  window.addEventListener('beforeunload', () => useGameStore.getState().saveRun(true));
}

export default useGameStore;
