// The Head's judgment: at three Taboo the Claw comes, whatever else the year was doing. Kept in the engine
// (it used to live in gameStore) so the simulators meet the Head exactly as a player does.
import { cloneChar } from './gameEngine.js';
import { createDungeonSession } from './dungeonEngine.js';
import { CLAW_DUNGEON_ID } from '../data/dungeonClaw.js';
import { TABOO_LIMIT } from './forbiddenPath.js';

export function enforceTabooJudgment(char) {
  if (!char?.alive || (char.taboo || 0) < TABOO_LIMIT || char.pendingDungeon) return char;
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
