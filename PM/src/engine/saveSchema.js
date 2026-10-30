import { validYearPoints } from './annualPlan.js';
import { frailty } from './economyModel.js';
import { normalizeLegacyCharacter } from './legacyKeepsake.js';

// Run saves carry a schema number so a changed character shape upgrades old saves instead of breaking them.
export const SAVE_VERSION = 5;

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
  3: (run) => ({ ...run, char: { ...run.char, pendingYearPlan: null, annualPlan: null, ambition: run.char.ambition || null, lastYearPoints: null } }),
  4: (run) => ({ ...run, char: normalizeLegacyCharacter(run.char) })
};

/** Returns an upgraded copy of a saved run, or null when it cannot be resumed. */
export function migrateRun(raw) {
  if (!raw?.char?.seed || !raw.char.alive) return null;
  const version = Number.isInteger(raw.version) ? raw.version : 1;
  if (version > SAVE_VERSION) return null;
  let run = { ...raw, char: { ...raw.char } };
  for (let v = version; v < SAVE_VERSION; v++) run = MIGRATIONS[v]?.(run) || run;
  run.char = normalizeLegacyCharacter(run.char);
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
  if (!Array.isArray(run.char.debts)) run.char.debts = [];
  if (run.char.flags?.includes('FixerLicenseDebt') && !run.char.debts.some((d) => d.id === 'fixer_license_debt')) {
    run.char.debts.push({
      id: 'fixer_license_debt',
      creditorId: 'backstreets_pawn_creditor',
      principalAhn: 8,
      balanceAhn: 8,
      createdAge: run.char.age || 18,
      nextDueAge: (run.char.age || 18) + 1,
      missedPayments: 0,
      status: 'active',
      originEventId: 'ad_career_crossroad_18'
    });
  }
  if (run.char.syndicateRank === undefined) {
    run.char.syndicateRank = 0;
  }
  if (run.char.job === 'Wing Employee' && !run.char.wingEmployerId) run.char.wingEmployerId = run.char.regionId;
  if (!Number.isFinite(run.char.bodyAge)) {
    run.char.bodyAge = Number((run.char.age * frailty(run.char)).toFixed(2));
  }
  if (!Number.isFinite(run.char.bodyAgeRecordedAt)) run.char.bodyAgeRecordedAt = run.char.age;
  if (run.char.colorAwardAge == null && run.char.flags?.includes('ColorFixer')) {
    const awardLog = Array.isArray(run.char.logs)
      ? run.char.logs.find((log) => /^log_color_named_\d+$/.test(log?.id) && Number.isInteger(log.age))
      : null;
    if (awardLog) run.char.colorAwardAge = awardLog.age;
  }
  if (!run.char.directorAppointment && run.char.affiliation?.kind === 'assoc' && run.char.affiliation.director) {
    run.char.directorAppointment = { name: run.char.affiliation.name };
  }
  if (!run.char.colorTitleAtAward && run.char.flags?.includes('ColorFixer') && run.char.customTitle) {
    run.char.colorTitleAtAward = run.char.customTitle;
  }
  if (run.char.job === 'Distortion' && run.char.flags?.includes('ColorFixer')) {
    run.char.unlockedRecords = Array.from(new Set([...(run.char.unlockedRecords || []), 'color_fixer']));
    if (run.char.colorAwardAge != null && run.char.colorAwardAge < 45) {
      run.char.unlockedRecords = Array.from(new Set([...run.char.unlockedRecords, 'color_before_forty_five']));
    }
    run.char.flags = run.char.flags.filter((flag) => flag !== 'ColorFixer');
    run.char.isColorFixer = false;
    run.char.customTitle = null;
  }
  run.version = SAVE_VERSION;
  if (!Array.isArray(run.rngState) || run.rngState.length !== 4 ||
      run.rngState.some((word) => !Number.isInteger(word) || word < 0 || word > 0xffffffff)) run.rngState = null;
  return run;
}
