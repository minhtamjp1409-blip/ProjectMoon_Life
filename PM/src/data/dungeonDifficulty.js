// How hard each dungeon is, in one place. Four rungs, set by the owner (Đợt 126):
//   1  The Head's suppression (dungeon_claw_judgment): the hardest; few survive, and only prepared lives
//   2  The Great Lake
//   3  WARP, Lobotomy, Bloodfiend, Backstreets: about level with each other
//   4  The Outskirts: the easiest, still a real test (checks that bite, wounds, a real chance of turning back)
// damage multiplies every wound the dungeon deals; guard adds notches to each enemy's guard in a chain of
// fights; check moves the odds of every check and evasion inside the dungeon. The bands each rung must land
// in are pinned by tests/test_dungeon_difficulty.mjs against tools/sim/dungeon_sim.mjs.
// The Reverberation Ensemble is a story stage, not a rung, and keeps its own balance.

export const DUNGEON_DIFFICULTY = {
  dungeon_claw_judgment: { rung: 1, damage: 1.8, guard: 1, check: 0 },
  dungeon_great_lake: { rung: 2, damage: 1, guard: 0, check: 0 },
  dungeon_warp_train: { rung: 3, damage: 1.6, guard: 0, check: 0 },
  dungeon_lobotomy_ruin: { rung: 3, damage: 1.1, guard: 0, check: 0 },
  dungeon_bloodfiend_carnival: { rung: 3, damage: 0.7, guard: 0, check: 0 },
  dungeon_backstreets_night: { rung: 3, damage: 0.95, guard: 0, check: 0 },
  dungeon_outskirts_ruins: { rung: 4, damage: 2.6, guard: 0, check: -0.38 }
};

const NEUTRAL = { rung: 0, damage: 1, guard: 0, check: 0 };
export const difficultyOf = (dungeonId) => DUNGEON_DIFFICULTY[dungeonId] || NEUTRAL;
