export const MAX_DUNGEON_WAGER = 2;
const DAMAGE = [1, 1.15, 1.35];

export function dungeonWagerLevel(value) {
  return Number.isInteger(value) ? Math.max(0, Math.min(MAX_DUNGEON_WAGER, value)) : 0;
}

export function dungeonWagerDamage(value) {
  return DAMAGE[dungeonWagerLevel(value)];
}

export function dungeonWagerLoot(value) {
  return 1 + dungeonWagerLevel(value) * 0.35;
}
