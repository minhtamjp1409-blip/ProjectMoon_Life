import { CLAW_DUNGEON_ID } from '../data/dungeonClaw.js';

const CARMEN_EVENT_ID = 'ego_carmen_crossroad';

// Which full-screen scene a change of state deserves. The engine only asks; the screen decides how it looks and how long it runs.
// One commit plays at most one scene: the higher rank wins and a lower one is dropped, never queued.
export const CUTSCENE_RANK = { death: 5, color: 4, savior: 4, finger: 4, claw: 3, carmen: 2, dungeon: 1 };

export function cutsceneFor(prev, next) {
  if (!prev || !next) return null;
  if (prev.alive && !next.alive && next.endingId !== 'library_threshold') return 'death';
  if (next.pendingModal === 'color_title' && prev.pendingModal !== 'color_title') return 'color';
  // A companion took the blow that should have killed you (the once-a-life Death Save in gameEngine)
  if (next.alive && next.usedDeathSave && !prev.usedDeathSave) return 'savior';
  // The top seat of a Finger
  if (next.job === 'Syndicate' && next.finger && (next.fingerRank || 0) >= 3 && (prev.fingerRank || 0) < 3) return 'finger';
  if (next.pendingDungeon?.id === CLAW_DUNGEON_ID && prev.pendingDungeon?.id !== CLAW_DUNGEON_ID) return 'claw';
  if (next.pendingEvent?.id === CARMEN_EVENT_ID && prev.pendingEvent?.id !== CARMEN_EVENT_ID) return 'carmen';
  // Every other dungeon gets its gate the moment its session opens (the Claw has its own scene above)
  if (next.pendingDungeon?.id && next.pendingDungeon.id !== prev.pendingDungeon?.id) return 'dungeon';
  return null;
}

export const outranks = (id, currentId) => !currentId || (CUTSCENE_RANK[id] || 0) > (CUTSCENE_RANK[currentId] || 0);
