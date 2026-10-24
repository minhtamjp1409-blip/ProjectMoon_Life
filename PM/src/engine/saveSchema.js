// Run saves carry a schema number so a changed character shape upgrades old saves instead of breaking them.
export const SAVE_VERSION = 2;

const MIGRATIONS = {
  // v1 (no field) -> v2: drop drafts and pending prompts that can no longer be answered
  1: (run) => {
    const char = run.char;
    if (char.pendingLead && char.pendingLead.age !== char.age) char.pendingLead = null;
    if (!Array.isArray(char.scars)) char.scars = [];
    if (!Array.isArray(char.scarHistory)) char.scarHistory = [];
    if (!Array.isArray(char.plan)) char.plan = [];
    return run;
  }
};

/** Returns an upgraded copy of a saved run, or null when it cannot be resumed. */
export function migrateRun(raw) {
  if (!raw?.char?.seed || !raw.char.alive) return null;
  const version = Number.isInteger(raw.version) ? raw.version : 1;
  if (version > SAVE_VERSION) return null;
  let run = { ...raw, char: { ...raw.char } };
  for (let v = version; v < SAVE_VERSION; v++) run = MIGRATIONS[v]?.(run) || run;
  const draft = run.char.pendingLead;
  if (draft && (draft.age !== run.char.age || !Array.isArray(draft.offers) || draft.offers.length !== 3 ||
      new Set(draft.offers.map((offer) => offer?.id)).size !== 3 ||
      draft.offers.some((offer) => typeof offer?.id !== 'string' || !offer.id))) {
    run.char.pendingLead = null;
  }
  run.version = SAVE_VERSION;
  return run;
}
