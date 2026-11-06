// Who may be offered the forbidden path, how often, and what a choice does to the Taboo count.
// The Claw is close to certain death for an ordinary life (see the dungeon sim), so the path is only
// offered to the top of a branch, a Color or an awakened E.G.O, and never to the autopilot.

import { FORBIDDEN_LEAD_ID } from '../data/eventsForbidden.js';
import { choiceIsAvailable } from './eventConditions.js';

export const FORBIDDEN_MIN_AGE = 25;
// A strong life should meet the door to the Head, not miss it by a coin flip every four years (Đợt 127)
export const FORBIDDEN_OFFER_GAP = 3;
export const FORBIDDEN_OFFER_CHANCE = 0.75;
export const TABOO_LIMIT = 3;
// The second rung of a branch (Sottocapo, Section Chief) or a Grade 1 Fixer is already strong enough to be tempted;
// waiting for the pinnacle left the path closed to almost every life that did not reach a Color
export const STRONG_BRANCH_RANK = 2;
export const STRONG_FIXER_GRADE = 1;

const has = (char, flag) => Boolean(char?.flags?.includes(flag));

export function isStrongLife(char) {
  if (!char) return false;
  const grade = char.fixerGrade;
  return has(char, 'EGOAwakened') || has(char, 'ColorFixer') || Boolean(char.isColorFixer) ||
    (char.job === 'Fixer' && grade != null && grade <= STRONG_FIXER_GRADE) || grade === 0 ||
    (char.job === 'Syndicate' && (char.fingerRank || 0) >= STRONG_BRANCH_RANK) ||
    (char.job === 'Wing Employee' && (char.wingRank || 0) >= STRONG_BRANCH_RANK) ||
    (char.job === 'Workshop Craftsman' && (char.workshopRank || 0) >= STRONG_BRANCH_RANK);
}

/** One chain per life, offered at most once every few years, and only while there is still a Taboo to break. */
export function forbiddenLeadOpen(char) {
  if (!char?.alive || char.age < FORBIDDEN_MIN_AGE || (char.taboo || 0) >= TABOO_LIMIT || char.pendingDungeon) return false;
  if (has(char, 'Distorted') || !isStrongLife(char)) return false;
  if ((char.memory || []).some((m) => m.key === 'forbidden_case_kept')) return false;
  if (char.forbiddenOfferAge != null && char.age - char.forbiddenOfferAge < FORBIDDEN_OFFER_GAP) return false;
  return true;
}

export const isForbiddenLead = (offer) => offer?.id === FORBIDDEN_LEAD_ID;

/** The autopilot never walks into the Head's judgment on the player's behalf. */
export function autoLeadIndex(draft, rng) {
  const open = (draft?.offers || []).map((offer, index) => ({ offer, index })).filter(({ offer }) => !isForbiddenLead(offer));
  return open.length ? open[Math.floor(rng() * open.length)].index : -1;
}

const fxOf = (x) => x?.fx || x?.effects || {};

/** The most Taboo a choice can add, across all its outcomes. */
export function tabooGainOf(choice) {
  const outs = choice?.out || choice?.outcomes || [];
  const base = fxOf(choice).taboo || 0;
  return Math.max(base, ...outs.map((o) => base + (fxOf(o).taboo || 0)));
}

/** True when taking this choice can bring the Taboo to its limit, and with it the Claw. */
export const bringsClaw = (choice, char) => {
  const gain = tabooGainOf(choice);
  return gain > 0 && (char?.taboo || 0) + gain >= TABOO_LIMIT;
};

/** Pick the first available event choice that does not raise Taboo; fall back to any available choice. */
export function autoEventChoiceIndex(event, char) {
  const choices = event?.choices || [];
  const safeIdx = choices.findIndex((choice) => choiceIsAvailable(choice, char) && tabooGainOf(choice) <= 0);
  if (safeIdx !== -1) return safeIdx;
  const openIdx = choices.findIndex((choice) => choiceIsAvailable(choice, char));
  return openIdx !== -1 ? openIdx : 0;
}

/** Pick an affordable contract approach for autoplay, preferring careful work before decline. */
export function autoContractApproachId(contract, char) {
  const approaches = contract?.approaches || [];
  const wealth = char?.stats?.wealth ?? char?.wealth ?? 0;
  const canAfford = (app) => (app?.costAhn ?? 0) <= wealth;
  const careful = approaches.find((app) => app.id === 'careful' && canAfford(app));
  if (careful) return careful.id;
  const working = approaches.find((app) => !app.isDecline && canAfford(app));
  if (working) return working.id;
  const fallback = approaches.find((app) => canAfford(app));
  return fallback?.id || approaches[0]?.id || 'careful';
}
