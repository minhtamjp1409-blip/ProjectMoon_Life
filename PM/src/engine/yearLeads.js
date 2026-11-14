// Year leads: the offers a working life picks from each year, and the director's pick when nobody chooses.
import { ENSEMBLE_INVITE_ID, ENSEMBLE_LAST_CALL_ID } from './ensemblePath.js';
import { FORBIDDEN_LEAD_ID } from '../data/eventsForbidden.js';
import { FORBIDDEN_OFFER_CHANCE, forbiddenLeadOpen } from './forbiddenPath.js';
import { LIFE_MINORS, eligibleMinors, pickWeighted, remember, seasonIdxAt, weightOf } from './yearPlanner.js';
import { SEASONS, cloneChar } from './gameEngine.js';
import { choiceIsAvailable, matchesEventContext } from './eventConditions.js';
import { logDecision } from './director.js';

const leadEffects = (choice) => [choice?.fx || choice?.effects || {}, ...(choice?.out || choice?.outcomes || []).map((outcome) => outcome.fx || outcome.effects || {})];

function leadRisk(event) {
  const effects = (event.choices || []).flatMap(leadEffects);
  const worst = Math.min(0, ...effects.map((fx) => (fx.health || 0) + (fx.sanity || 0) + Math.min(0, fx.wealth || 0) * 0.4));
  if (worst <= -12 || event.tags?.includes('danger')) return 'danger';
  if (event.choices?.some((choice) => (choice.out || choice.outcomes || []).length) || worst <= -5) return 'uncertain';
  return 'steady';
}

export function offerYearLeads(char, rng) {
  if (!char.alive || char.age < 15 || (char.plan || []).some((item) => item.id === FORBIDDEN_LEAD_ID)) {
    char.pendingLead = null;
    return;
  }
  const plannedMinors = (char.plan || []).filter((item) => item.kind === 'minor').length;
  const busyYear = (char.plan || []).some((item) => item.kind === 'major' || item.kind === 'contract' || item.kind === 'dungeon');
  const chance = plannedMinors >= 2 ? 0.18 : busyYear ? 0.35 : 0.65;
  if (rng() >= chance) {
    char.pendingLead = null;
    return;
  }
  const reserved = new Set((char.plan || []).map((item) => item.id).filter(Boolean));
  const pool = eligibleMinors(char).filter((entry) => !entry.careerOpportunity && !reserved.has(entry.id) && entry.choices?.some((choice) => choiceIsAvailable(choice, char)));
  const selected = [];
  for (const tier of ['steady', 'uncertain', 'danger']) {
    const available = pool.filter((entry) => !selected.some((item) => item.id === entry.id));
    const matched = available.filter((entry) => leadRisk(entry) === tier);
    const pick = pickWeighted(matched.length ? matched : available, weightOf(char), rng);
    // The label is the event's real risk, not the slot it was drawn for, so a fallback pick is never sold as something it is not
    if (pick) selected.push({ id: pick.id, tier: leadRisk(pick) });
  }
  char.pendingLead = selected.length === 3 ? { age: char.age, offers: selected } : null;
}

export function scheduleForbiddenEncounter(char, rng) {
  const hasEnsemble = (char.plan || []).some((item) => item.forcedEventId === ENSEMBLE_INVITE_ID || item.forcedEventId === ENSEMBLE_LAST_CALL_ID);
  if (hasEnsemble || !forbiddenLeadOpen(char) || rng() >= FORBIDDEN_OFFER_CHANCE) return;
  const event = LIFE_MINORS.find((entry) => entry.id === FORBIDDEN_LEAD_ID);
  if (!event || !matchesEventContext(event, char)) return;
  const t = 0.275;
  const seasonIdx = seasonIdxAt(t);
  char.plan.push({ kind: 'minor', id: event.id, t, seasonIdx, season: SEASONS[seasonIdx], extra: true, forbiddenEncounter: true });
  char.plan.sort((a, b) => a.t - b.t);
  char.forbiddenOfferAge = char.age;
  remember(char, event.id);
}

export function isYearLeadUsable(offer, char) {
  return LIFE_MINORS.some((entry) => entry.id === offer?.id && matchesEventContext(entry, char) && entry.choices?.some((choice) => choiceIsAvailable(choice, char)));
}

export function chooseYearLead(charState, index) {
  const char = cloneChar(charState);
  const draft = char.pendingLead;
  if (!draft) return charState;
  // A draft from another year (old save) or with no offer left can never be answered, so drop it instead of stalling the run
  if (draft.age !== char.age) { char.pendingLead = null; return char; }
  const offers = draft.offers || [];
  const chosen = offers[index];
  if (!isYearLeadUsable(chosen, char)) {
    if (offers.some((offer) => isYearLeadUsable(offer, char))) return charState;
    char.pendingLead = null;
    return char;
  }
  const event = LIFE_MINORS.find((entry) => entry.id === chosen.id);
  const t = 0.265;
  char.plan = [...(char.plan || []), { kind: 'minor', id: chosen.id, t, seasonIdx: 1, season: SEASONS[1], extra: true, lead: true }].sort((a, b) => a.t - b.t);
  char.pendingLead = null;
  char.leadChoice = { age: char.age, id: chosen.id, tier: chosen.tier };
  remember(char, chosen.id);
  logDecision(char, event, { vi: 'Bạn chọn theo manh mối này', en: 'You followed this lead', w: 1 }, 'minor');
  return char;
}

/** Select an optional extra encounter while protecting a wounded life from another dangerous lead. */
export function chooseDirectorPacedLead(charState, rng = Math.random) {
  const char = cloneChar(charState);
  const draft = char.pendingLead;
  if (!draft || !Array.isArray(draft.offers) || draft.offers.length === 0) return charState;
  if (draft.age !== char.age) {
    char.pendingLead = null;
    return char;
  }

  const usableIndices = draft.offers
    .map((offer, idx) => ({ offer, idx }))
    .filter(({ offer }) => isYearLeadUsable(offer, char));

  if (usableIndices.length === 0) {
    char.pendingLead = null;
    return char;
  }

  const safeIndices = usableIndices.filter(({ offer }) => offer.id !== FORBIDDEN_LEAD_ID);
  if (safeIndices.length === 0) {
    char.pendingLead = null;
    return char;
  }
  if (safeIndices.length === 1) return chooseYearLead(char, safeIndices[0].idx);

  const hp = char.stats?.health ?? char.health ?? 50;
  const sp = char.stats?.sanity ?? char.sanity ?? 50;
  const tension = char.weaver?.tensionScore ?? 25;
  const recentTiers = char.recentLeadTiers || [];

  const recentDangerCount = recentTiers.slice(-3).filter((t) => t === 'danger' || t === 'forbidden').length;
  const recentSteadyCount = recentTiers.slice(-3).filter((t) => t === 'steady').length;

  const scoredOffers = safeIndices.map(({ offer, idx }) => {
    let weight = 30;
    const tier = offer.tier || 'uncertain';

    if (tier === 'steady') {
      weight = 35;
      if (hp < 45) weight += 45;
      if (sp < 40) weight += 40;
      if (tension >= 65) weight += 35;
      if (recentDangerCount >= 2) weight += 60;
      if (recentSteadyCount >= 2) weight = Math.max(20, weight - 10);
    } else if (tier === 'uncertain') {
      weight = 40;
      if (recentSteadyCount >= 1 && recentDangerCount >= 1) weight += 20;
    } else if (tier === 'danger') {
      weight = 25;
      if (recentSteadyCount >= 2) weight += 15;
      if (hp < 40 || sp < 30 || recentDangerCount >= 2) weight = 0;
      else if (tension >= 70 || recentDangerCount >= 1) weight = Math.max(5, weight - 15);
    }

    return { idx, tier, weight: Math.max(0, weight) };
  });

  const totalWeight = scoredOffers.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight <= 0) {
    const fallback = scoredOffers.find((o) => o.tier === 'steady') || scoredOffers[0];
    char.recentLeadTiers = [...recentTiers, fallback.tier].slice(-5);
    return chooseYearLead(char, fallback.idx);
  }

  let roll = rng() * totalWeight;
  let chosenIdx = scoredOffers[0].idx;
  let chosenTier = scoredOffers[0].tier;

  for (const item of scoredOffers) {
    if (roll < item.weight) {
      chosenIdx = item.idx;
      chosenTier = item.tier;
      break;
    }
    roll -= item.weight;
  }

  char.recentLeadTiers = [...recentTiers, chosenTier].slice(-5);
  return chooseYearLead(char, chosenIdx);
}
