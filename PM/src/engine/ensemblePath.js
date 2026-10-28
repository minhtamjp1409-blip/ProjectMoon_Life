import { npcIsActive } from './eventConditions.js';

export const ENSEMBLE_DUNGEON_ID = 'dungeon_reverberation_ensemble';
export const ENSEMBLE_INVITE_ID = 'ensemble_first_invitation';
export const ENSEMBLE_LAST_CALL_ID = 'ensemble_last_call';

export function ensembleRoute(char) {
  if ((char?.job === 'Fixer' || char?.job === 'Color Fixer') && (char.flags?.includes('ColorFixer') || char.isColorFixer || char.fixerGrade === 0)) return 'color';
  if (char?.job === 'Syndicate' && (char.fingerRank || 0) >= 3) return 'finger';
  if (char?.job === 'Wing Employee' && (char.wingRank || 0) >= 3) return 'wing';
  if (char?.job === 'Workshop Craftsman' && (char.workshopRank || 0) >= 3) return 'workshop';
  return null;
}

export function ensembleEligible(char) {
  return Boolean(char?.alive && char.age >= 30 && ensembleRoute(char) && !char.flags?.includes('Distorted') &&
    (char.taboo || 0) < 3 && !char.pendingDungeon && !char.ensemble?.completed);
}

export function prepareEnsembleYear(char) {
  if (!char?.alive || !ensembleRoute(char) || char.flags?.includes('Distorted')) {
    if (char?.ensemble && !ensembleRoute(char)) char.ensemble = { ...char.ensemble, apexSinceAge: null };
    return null;
  }
  const state = { apexSinceAge: null, declines: 0, offers: 0, nextAge: null, completed: false, ...char.ensemble };
  if (state.apexSinceAge == null) state.apexSinceAge = char.age;
  char.ensemble = state;
  if (!ensembleEligible(char) || state.started || char.age < state.apexSinceAge + 2 || char.age < (state.nextAge ?? 0)) return null;
  return state.declines >= 2 ? ENSEMBLE_LAST_CALL_ID : ENSEMBLE_INVITE_ID;
}

export function recordEnsembleInvitation(char, accepted) {
  const state = { apexSinceAge: char.age - 2, declines: 0, offers: 0, completed: false, ...char.ensemble };
  state.offers = (state.offers || 0) + 1;
  if (accepted) state.started = true;
  else {
    state.declines = Math.min(2, (state.declines || 0) + 1);
    state.nextAge = char.age + (state.declines >= 2 ? 1 : 3);
  }
  char.ensemble = state;
}

export function recordEnsembleRetreat(char) {
  const state = { ...char.ensemble };
  state.started = false;
  state.declines = Math.min(2, (state.declines || 0) + 1);
  state.nextAge = char.age + (state.declines >= 2 ? 1 : 3);
  char.ensemble = state;
  char.stats.rep = Math.max(0, (char.stats.rep || 0) - 8);
}

export function finishEnsembleRun(char, outcome) {
  char.ensemble = { ...(char.ensemble || {}), started: false, completed: true, outcome, completedAge: char.age };
}

export function ensembleWitness(char) {
  for (const role of ['nemesis', 'rival', 'apprentice', 'friend', 'partner', 'mentor']) {
    const npc = char.npcs?.[role];
    if (npcIsActive(npc) && (npc.nameVi || npc.nameEn || npc.name)) return { role, nameVi: npc.nameVi || npc.nameEn || npc.name, nameEn: npc.nameEn || npc.nameVi || npc.name };
  }
  return { role: 'record', nameVi: 'một người trong hồ sơ cũ', nameEn: 'someone from an old record' };
}
