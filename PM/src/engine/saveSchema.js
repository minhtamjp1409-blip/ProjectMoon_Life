import { validYearPoints } from './annualPlan.js';

// Run saves carry a schema number so a changed character shape upgrades old saves instead of breaking them.
export const SAVE_VERSION = 4;

const MIGRATIONS = {
  // v1 (no field) -> v2: drop drafts and pending prompts that can no longer be answered
  1: (run) => {
    const char = run.char;
    if (char.pendingLead && char.pendingLead.age !== char.age) char.pendingLead = null;
    if (!Array.isArray(char.scars)) char.scars = [];
    if (!Array.isArray(char.scarHistory)) char.scarHistory = [];
    if (!Array.isArray(char.plan)) char.plan = [];
    return run;
  },
  2: (run) => ({ ...run, rngState: null }),
  3: (run) => ({ ...run, char: { ...run.char, pendingYearPlan: null, annualPlan: null, ambition: run.char.ambition || null, lastYearPoints: null } })
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
  if (run.char.pendingYearPlan?.age !== run.char.age) run.char.pendingYearPlan = null;
  if (run.char.annualPlan?.age !== run.char.age) run.char.annualPlan = null;
  if (run.char.annualPlan && !validYearPoints(run.char.annualPlan.points)) run.char.annualPlan = null;
  if (!validYearPoints(run.char.lastYearPoints)) run.char.lastYearPoints = null;
  run.version = SAVE_VERSION;
  if (!Array.isArray(run.rngState) || run.rngState.length !== 4 ||
      run.rngState.some((word) => !Number.isInteger(word) || word < 0 || word > 0xffffffff)) run.rngState = null;
  return run;
}
