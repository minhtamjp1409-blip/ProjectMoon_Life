// How loudly a chronicle entry reads. The log mixes a daily errand with a promotion, and one card style made both look alike.
// quiet: routine that has already resolved, decision: a choice the player made or a consequence of one, turn: a turning point.
const QUIET_TYPES = new Set(['daily', 'lore', 'summary']);
const TURN_TYPES = new Set(['promo', 'miracle', 'death']);

export function entryTier(entry) {
  if (entry.major || TURN_TYPES.has(entry.type)) return 'turn';
  if (QUIET_TYPES.has(entry.type) && !entry.choiceVi && !entry.passed) return 'quiet';
  return 'decision';
}

// A promotion or a miracle gets the framed turning-point card; a death keeps its own rule
export const framesAsMajor = (entry) => Boolean(entry.major) || entry.type === 'promo' || entry.type === 'miracle';

// First sentence of a paragraph, for the compact reading mode. Returns null when there is nothing to fold away.
export function splitLead(text) {
  const body = String(text || '').trim();
  const cut = body.search(/[.!?…]["”’)]*\s/);
  if (cut === -1) return null;
  const lead = body.slice(0, cut + 1 + (body.slice(cut + 1).match(/^["”’)]*/)?.[0].length || 0)).trim();
  const rest = body.slice(lead.length).trim();
  return rest ? { lead, rest } : null;
}
