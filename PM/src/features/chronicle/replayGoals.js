// What the next life could still open, read from the codex the player has not filled yet.
// One record follows the trade of the last life, one comes from somewhere else, both the easiest left.
const TIER_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legend', 'myth', 'miracle'];

const CATEGORY_OF_JOB = {
  Fixer: 'fixer',
  'Color Fixer': 'fixer',
  Syndicate: 'syndicate',
  'Wing Employee': 'wing',
  Distortion: 'supernatural'
};

const byTier = (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);

/**
 * @param pastLives newest first, as the store keeps them
 * @param unlocked keys already in the codex
 * @param records CODEX_RECORDS
 * @returns up to `count` records with their hints, or [] before the first life has ended
 */
export function replayGoalsFor(pastLives = [], unlocked = [], records = [], count = 2) {
  if (!pastLives.length) return [];
  const have = new Set(unlocked);
  const open = records.filter((r) => !have.has(r.key) && r.hintVi && r.hintEn).sort(byTier);
  if (!open.length) return [];
  const lastCategory = CATEGORY_OF_JOB[pastLives[0]?.job] || 'survival';
  const picks = [];
  const route = open.find((r) => r.category === lastCategory);
  if (route) picks.push(route);
  for (const r of open) {
    if (picks.length >= count) break;
    if (!picks.includes(r) && !picks.some((p) => p.category === r.category)) picks.push(r);
  }
  return picks.slice(0, count);
}
