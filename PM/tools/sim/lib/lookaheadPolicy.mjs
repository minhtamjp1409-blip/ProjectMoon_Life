// Shallow 1-2 year deterministic lookahead policy for AI-6 balance probing.
// Simulates candidate major choices cleanly on cloned character state without mutating live play.
import {
  cloneChar,
  createRNG,
  resolveEventChoice,
  resolveDungeonChoice,
  getDungeonCurrentStage,
  isDungeonChoiceAvailable,
  evaluateDungeonChoiceOdds,
  resolveFixerContract
} from '../../../src/engine/gameEngine.js';
import { choiceIsAvailable } from '../../../src/engine/eventConditions.js';
import { applyAnnualPlan, ambitionsFor, CONVALESCE } from '../../../src/engine/annualPlan.js';
import { planYear, chooseDirectorPacedLead, chooseYearLead, runDueItems, resolveMinor, endYear } from '../../../src/engine/yearPlanner.js';
import { CAREER_CROSSROAD_IDS } from '../../../src/engine/careerAge.js';
import { enforceTabooJudgment } from '../../../src/engine/tabooJudgment.js';

const LOOKAHEAD_WEIGHT = { health: 1.5, sanity: 1.1, wealth: 0.9, network: 0.45, rep: 0.75, heat: -0.9, taboo: -4, resonance: -0.2, merit: 0.6 };

function scoreFx(fx = {}) {
  let total = 0;
  for (const [k, v] of Object.entries(fx)) {
    total += (LOOKAHEAD_WEIGHT[k] || 0) * (v || 0);
  }
  return total;
}

function fastChoiceScore(choice) {
  if (!choice) return -999;
  const rows = choice.out || choice.outcomes;
  let score = scoreFx(choice.fx || choice.effects);
  if (Array.isArray(rows) && rows.length) {
    const totalW = rows.reduce((s, o) => s + (o.w ?? 50), 0) || 1;
    score += rows.reduce((s, o) => s + ((o.w ?? 50) / totalW) * scoreFx(o.fx || o.effects), 0);
  }
  if (choice.setJob === 'Fixer') score += 45;
  if (choice.setFixerGrade != null) score += 60;
  return score;
}

/** Fast non-branching inner choice heuristic used inside simulated lookahead rollouts. */
export function fastTacticalPick(choices, _rng, char, eventId = '') {
  const ok = (choices || []).map((_, i) => i).filter((i) => choiceIsAvailable(choices[i], char));
  if (!ok.length) return -1;
  const healthy = (char?.stats?.health ?? 100) >= 58;
  if (healthy) {
    if (eventId.startsWith('fixer_seven_')) return ok[0];
    if (eventId === 'hana_color_ascension_trial') return ok.includes(1) ? 1 : ok[0];
    if (eventId === 'ego_carmen_crossroad' || eventId === 'ego_second_efflorescence_trial') return ok[0];
    if (CAREER_CROSSROAD_IDS.includes(eventId)) {
      const fixer = ok.find((i) => choices[i].setJob === 'Fixer');
      if (fixer !== undefined) return fixer;
    }
    if (eventId.startsWith('fixer_promo_')) {
      const promo = ok.find((i) => choices[i].setFixerGrade != null);
      if (promo !== undefined) return promo;
    }
  }
  return ok.reduce((best, i) => (fastChoiceScore(choices[i]) > fastChoiceScore(choices[best]) ? i : best), ok[0]);
}

/** Annual point split used by lookahead agents (prefers healing when injured, training when strong). */
export function lookaheadYearPoints(char) {
  const hp = char?.stats?.health ?? 100;
  const sp = char?.stats?.sanity ?? 100;
  if (hp < CONVALESCE.below) return { train: 0, work: 1, bond: 0, rest: 2, scheme: 0 };
  if (sp < 45) return { train: 1, work: 0, bond: 0, rest: 2, scheme: 0 };
  if (hp >= 72 && sp >= 58) return { train: 2, work: 1, bond: 0, rest: 0, scheme: 0 };
  return { train: 1, work: 1, bond: 0, rest: 1, scheme: 0 };
}

/** Ambition selection for lookahead agents. */
export function lookaheadAmbition(char) {
  const list = ambitionsFor(char);
  const preferred = (char?.stats?.health ?? 100) < 55 ? 'survive' : 'rank';
  return list.find((g) => g.id === preferred)?.id || list[0]?.id;
}

/** Dungeon entry wager for lookahead: stakes high only when well above survival thresholds. */
export function lookaheadDungeonStake(char, choice) {
  const hasDungeon = Boolean(choice?.startDungeon || (choice?.out || choice?.outcomes)?.some((o) => o.startDungeon));
  if (!hasDungeon) return 0;
  const hp = char?.stats?.health ?? 100;
  const sp = char?.stats?.sanity ?? 100;
  if (hp >= 78 && sp >= 68 && (char?.stats?.wealth ?? 0) >= 22) return 2;
  if (hp >= 62 && sp >= 52 && (char?.stats?.wealth ?? 0) >= 12) return 1;
  return 0;
}

/** Lead offer choice for lookahead agents based on current vitals. */
export function pickLookaheadLead(char, rng = Math.random) {
  const offers = char?.pendingLead?.offers || [];
  if (!offers.length) return chooseDirectorPacedLead(char, rng);
  const hp = char?.stats?.health ?? 100;
  const sp = char?.stats?.sanity ?? 100;
  if (hp < 55 || sp < 45) {
    const steadyIdx = offers.findIndex((o) => o.tier === 'steady');
    if (steadyIdx >= 0) return chooseYearLead(char, steadyIdx);
  }
  if (hp >= 78 && sp >= 68) {
    const dangerIdx = offers.findIndex((o) => o.tier === 'danger');
    if (dangerIdx >= 0) return chooseYearLead(char, dangerIdx);
  }
  return chooseDirectorPacedLead(char, rng);
}

/** Expected-value selector for Fixer Request approaches under lookahead play. */
export function pickLookaheadContract(char, contract) {
  const approaches = contract?.approaches || [];
  const wealth = char?.stats?.wealth ?? 0;
  const hp = char?.stats?.health ?? 100;
  const deathPenalty = (char?.age || 0) >= 18 ? 3800 : 1800;
  let best = approaches[0];
  let bestScore = -Infinity;
  for (const ap of approaches) {
    if ((ap.costAhn || 0) > wealth) continue;
    const pSucc = (ap.successPct || 0) / 100;
    const pDeath = (ap.deathPct || 0) / 100;
    const pFail = (ap.failPct || 0) / 100;
    const gain = pSucc * ((ap.payAhn || 0) * 0.8 + (ap.meritGain || 0) * 1.9);
    const risk = pDeath * deathPenalty + (hp < 45 ? pFail * 35 : pFail * 12) + (ap.costAhn || 0) * 0.75;
    const ev = ap.isDecline ? (hp < 28 ? 8 : -20) : (gain - risk);
    if (ev > bestScore) {
      bestScore = ev;
      best = ap;
    }
  }
  return best?.id || approaches[0]?.id || 'careful';
}

/** Tactical dungeon choice selector powered by `evaluateDungeonChoiceOdds`. */
export function pickLookaheadDungeonChoice(char, stage, usable, session) {
  const choices = stage?.choices || [];
  const hp = char?.stats?.health ?? 100;
  const sp = char?.stats?.sanity ?? 100;
  const flee = usable.find((k) => choices[k].isFlee);
  const rest = usable.find((k) => choices[k].restAction === 'rest');
  if ((hp < 30 || sp < 20) && flee !== undefined) return flee;
  if (stage?.isRest) {
    if (hp < 40 && flee !== undefined) return flee;
    return rest !== undefined ? rest : usable[0];
  }

  let best = usable[0];
  let bestScore = -Infinity;
  for (const idx of usable) {
    const c = choices[idx];
    if (c.sealed) continue;
    const odds = evaluateDungeonChoiceOdds(c, char, session);
    let score = (odds?.estHp || 0) * 1.9 + (odds?.estSp || 0) * 1.3 + (odds?.estLoot || 0) * 4.5 +
      (odds?.estMerit || 0) * 2.2 + (odds?.estWealth || 0) * 1.0 + (odds?.estRep || 0) * 0.8;
    if (stage?.isCombat) {
      const passive = c.combatAction === 'guard' || c.combatAction === 'evade' || c.combatAction === 'ally';
      if (!passive && hp >= 36 && !odds?.failLethal) score += 22;
      else if (c.combatAction === 'strike' || c.combatAction === 'workOpen') score += 16;
    }
    if (odds?.failLethal) score -= 340;
    if (c.isFlee) score -= (hp < 42 ? 0 : 120);
    if (score > bestScore) {
      bestScore = score;
      best = idx;
    }
  }
  return best;
}

/** Strategic utility function evaluating post-rollout character state. */
export function evaluateLookaheadState(char) {
  if (!char?.alive) return -10000 - Math.max(0, 80 - (char?.age || 0)) * 100;
  const stats = char.stats || {};
  const flags = char.flags || [];
  const activeDebt = (char.debts || []).reduce((s, d) => s + (d.status === 'active' ? (d.balanceAhn || 0) : 0), 0);
  const fixerStation = (char.job === 'Fixer' || char.job === 'Color Fixer') ? (10 - (char.fixerGrade ?? 9)) * 75 : 0;
  const otherStations = (char.wingRank || 0) * 60 + (char.fingerRank || 0) * 65 + (char.syndicateRank || 0) * 55 + (char.workshopTier || 0) * 55;
  const milestoneScore = (flags.includes('ColorFixer') ? 380 : 0) + (flags.includes('EGOAwakened') ? 320 : 0) + (flags.includes('Distorted') ? -140 : 0);
  const vitals = (stats.health || 0) * 1.8 + (stats.sanity || 0) * 1.4 + (stats.wealth || 0) * 0.9 + (stats.rep || 0) * 1.1 + (stats.network || 0) * 0.5;
  const standing = (char.merit || 0) * 1.5 + (char.standing || 50) * 0.6 + (char.inventory?.length || 0) * 18;
  const frailty = ((stats.health || 0) < 30 ? -180 : 0) + ((stats.sanity || 0) < 25 ? -140 : 0);
  const threats = (char.heat || 0) * 1.2 + (char.taboo || 0) * 220 + activeDebt * 1.4;
  return (char.age || 0) * 3 + fixerStation + otherStations + milestoneScore + vitals + standing + frailty - threats;
}

function drainPendingForRollout(charState, rng) {
  let char = charState;
  let spin = 0;
  while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 12) {
    if (char.pendingEvent) {
      const idx = fastTacticalPick(char.pendingEvent.choices, rng, char, char.pendingEvent.id);
      const stake = lookaheadDungeonStake(char, char.pendingEvent.choices?.[idx]);
      char = resolveEventChoice(char, Math.max(0, idx), rng, stake);
    } else if (char.pendingDungeon) {
      const stage = getDungeonCurrentStage(char.pendingDungeon);
      const usable = stage.choices.map((_, k) => k).filter((k) => isDungeonChoiceAvailable(stage.choices[k], char));
      const idx = usable.length ? pickLookaheadDungeonChoice(char, stage, usable, char.pendingDungeon) : 0;
      char = resolveDungeonChoice(char, idx, rng).char;
    } else if (char.pendingMinor) {
      const idx = fastTacticalPick(char.pendingMinor.choices, rng, char, char.pendingMinor.id);
      char = resolveMinor(char, idx, rng);
    } else if (char.pendingContract) {
      char = resolveFixerContract(char, pickLookaheadContract(char, char.pendingContract), rng);
    } else {
      char.pendingModal = null;
    }
  }
  return char;
}

function simulateRollout(charState, choiceIdx, choices, eventId, rolloutSeed, horizonYears = 2) {
  const rng = createRNG(rolloutSeed);
  let branch = cloneChar(charState);
  branch.logs = [];
  if (branch.weaver) branch.weaver.decisionLog = [];
  branch.pendingLead = charState.pendingLead ? structuredClone(charState.pendingLead) : null;
  branch.pendingContract = charState.pendingContract ? structuredClone(charState.pendingContract) : null;
  branch.pendingMinor = charState.pendingMinor ? structuredClone(charState.pendingMinor) : null;
  branch.pendingYearPlan = charState.pendingYearPlan ? structuredClone(charState.pendingYearPlan) : null;

  const stake = lookaheadDungeonStake(branch, choices?.[choiceIdx]);
  branch = resolveEventChoice(branch, choiceIdx, rng, stake);
  branch = drainPendingForRollout(branch, rng);

  const startSeasonTick = Math.min(100, Math.max(0, (branch.seasonIdx || 0) * 25));
  for (let t = startSeasonTick; t <= 100 && branch.alive; t += 12) {
    branch = runDueItems(branch, t, rng).char;
    branch = enforceTabooJudgment(branch);
    branch = drainPendingForRollout(branch, rng);
  }
  if (branch.alive && startSeasonTick < 100) {
    branch = runDueItems(branch, 100, rng).char;
    branch = enforceTabooJudgment(branch);
    branch = drainPendingForRollout(branch, rng);
  }
  if (branch.alive) branch = endYear(branch, rng);

  const extraYears = Math.max(0, horizonYears - 1);
  for (let y = 0; y < extraYears && branch.alive; y++) {
    if (branch.pendingYearPlan && branch.pendingYearPlan.age === branch.age) {
      if (!applyAnnualPlan(branch, lookaheadYearPoints(branch), lookaheadAmbition(branch))) {
        branch.pendingYearPlan = null;
      }
    }
    if (!branch.plan?.length) planYear(branch, rng);
    if (branch.pendingLead) branch = pickLookaheadLead(branch, rng);
    for (let t = 0; t <= 100 && branch.alive; t += 12) {
      branch = runDueItems(branch, t, rng).char;
      branch = enforceTabooJudgment(branch);
      branch = drainPendingForRollout(branch, rng);
    }
    if (branch.alive) {
      branch = runDueItems(branch, 100, rng).char;
      branch = enforceTabooJudgment(branch);
      branch = drainPendingForRollout(branch, rng);
    }
    if (branch.alive) branch = endYear(branch, rng);
  }
  return evaluateLookaheadState(branch);
}

/**
 * Creates a shallow 1-2 year lookahead picker for major events.
 * Falls back to fast tactical heuristics for minors and single-choice prompts.
 */
export function makeLookaheadPicker({ horizonYears = 2, rollouts = 1 } = {}) {
  const pick = (choices, rng, char, eventId = '') => {
    const ok = (choices || []).map((_, i) => i).filter((i) => choiceIsAvailable(choices[i], char));
    if (!ok.length) return -1;
    if (ok.length === 1) return ok[0];
    if (!char?.pendingEvent || char.pendingEvent.id !== eventId) {
      return fastTacticalPick(choices, rng, char, eventId);
    }

    let bestIdx = ok[0];
    let bestValue = -Infinity;
    for (const idx of ok) {
      let total = 0;
      for (let r = 0; r < rollouts; r++) {
        const seed = `la:${char.seed || 'life'}:${char.age}:${char.seasonIdx || 0}:${eventId}:${idx}:${r}`;
        total += simulateRollout(char, idx, choices, eventId, seed, horizonYears);
      }
      const meanVal = total / rollouts;
      if (meanVal > bestValue) {
        bestValue = meanVal;
        bestIdx = idx;
      }
    }
    return bestIdx;
  };
  pick.policy = 'lookahead';
  return pick;
}
