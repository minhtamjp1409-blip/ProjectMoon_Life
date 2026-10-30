// How loudly a chronicle entry reads. The log mixes a daily errand with a promotion, and one card style made both look alike.
// quiet: routine that has already resolved, decision: a choice the player made or a consequence of one, turn: a turning point.
const QUIET_TYPES = new Set(['daily', 'lore', 'summary']);
const TURN_TYPES = new Set(['promo', 'miracle', 'death']);

// type 'major' is a weight class: hundreds of events carry it. A resolved event (it keeps its `review`) is a
// turning point only when the choice moved the life (`turning`: path, rank, E.G.O, Distortion, Color). A 'major'
// the engine writes on its own (a dungeon ending, a cordon) is a landmark by itself.
const isTurn = (entry) => Boolean(entry.major || entry.turning) || TURN_TYPES.has(entry.type) || (entry.type === 'major' && !entry.review);

export function entryTier(entry) {
  if (isTurn(entry)) return 'turn';
  if (QUIET_TYPES.has(entry.type) && !entry.choiceVi && !entry.passed) return 'quiet';
  return 'decision';
}

// Compact reading folds routine entries, and the choices of years already lived. The year in progress and every turning point stay whole.
export function foldsInCompact(entry, tier, currentAge) {
  if (tier === 'quiet') return true;
  if (tier !== 'decision') return false;
  return Boolean(entry.choiceVi || entry.passed) && entry.age < currentAge;
}

// A promotion or a miracle gets the framed turning-point card; a death keeps its own rule
export const framesAsMajor = (entry) => isTurn(entry) && entry.type !== 'death';

// First sentence of a paragraph, for the compact reading mode. Returns null when there is nothing to fold away.
export function splitLead(text) {
  const body = String(text || '').trim();
  const cut = body.search(/[.!?…]["”’)]*\s/);
  if (cut === -1) return null;
  const lead = body.slice(0, cut + 1 + (body.slice(cut + 1).match(/^["”’)]*/)?.[0].length || 0)).trim();
  const rest = body.slice(lead.length).trim();
  return rest ? { lead, rest } : null;
}
