import { rememberResonance, hasEgoOpportunity, colorTrialAvailable } from './awakeningProgress.js';
import { advanceActiveNarrativeArcs } from './narrativeArcEngine.js';
import { choiceIsAvailable, getChoiceAhnCost, matchesEventContext, mergeEffects, npcIsActive, recordColorTrialCompanion, colorTrialCompanionOf, isIndependentSyndicateEligibleForRank } from './eventConditions.js';
import { ITEMS_CATALOG } from '../data/itemsData.js';
import { rollPerinatalFate } from './fateEngine.js';
import { keepsakeForLife, normalizeLegacyRecord } from './legacyKeepsake.js';
import { rollTraits, traitsOf, varyEffects, PRINTED_NUMBERS } from './variance.js';
import {
  extractAncestorEchoProfile,
  applyAncestorEchoInheritance,
  getImbuedCombatBonus
} from './cityUpgrades.js';
// ============================================================================
// CORE LIFE-SIMULATION & GENERATIONAL BLOODLINE ENGINE
// Connects World Data, Event Pools, Persistent NPCs, Tension Clocks & Weaver AI
// ============================================================================

import {
  REGIONS,
  FAMILIES,
  ASSOCIATIONS,
  OFFICES,
  WORKSHOPS,
  FINGER_RANKS,
  THREAT_TIERS,
  CODEX_RECORDS
} from '../data/worldData.js';
import { CHILDHOOD_EVENTS, CONSEQUENCE_EVENTS } from '../data/eventsChildhood.js';
import { CHILDHOOD_EVENTS_2 } from '../data/eventsChildhood2.js';
import { LINEAGE_LEGACY_EVENTS } from '../data/eventsLineageLegacy.js';
import { BACKGROUND_OPENING_EVENTS } from '../data/eventsBackgroundOpening.js';
import { composeBirth, makeNpc } from '../data/birthStories.js';
import { evaluateCompanionSupport, ensureNpcAgency, bondCapFor } from '../data/npcPersonality.js';
import { generatePersonName } from '../data/nameGenerator.js';
import { FACTION_EVENTS } from '../data/eventsFactions.js';
import { EXPANSION_EVENTS } from '../data/eventsExpansion.js';
import { SUPERNATURAL_EVENTS, FIXER_REQUESTS } from '../data/eventsSupernatural.js';
import { FIXER_PATH_EVENTS } from '../data/eventsFixerPath.js';
import { CONTRACT_ROUTES, contractRouteOf, equivalentGrade } from '../data/careerContracts.js';
import { rollCareerAge, careerAgeOf } from './careerAge.js';
import { AMBITIONS, ambitionComplete } from './annualPlan.js';
import { CAREER_REQUESTS } from '../data/careerContractTemplates.js';
import { DISTORTION_PATH_EVENTS } from '../data/eventsDistortionPath.js';
import { DISTORTION_OVERHAUL_EVENTS } from '../data/eventsDistortionOverhaul.js';
import { WORKSHOP_ECONOMY_EVENTS } from '../data/eventsWorkshopEconomy.js';
import { BEREAVEMENT_EVENTS } from '../data/eventsBereavementMemories.js';
import { DERIVATIVE_LORE_EVENTS } from '../data/eventsDerivativeLore.js';
import { COMPANION_QUEST_EVENTS } from '../data/eventsCompanionQuests.js';
import { CAREER_DRAMA_EVENTS } from '../data/eventsCareerDrama.js';
import { EXPANSION_STORY_EVENTS } from '../data/eventsNpcAndWorldExpansion.js';
import { DUNGEON_GATE_EVENTS } from '../data/eventsDungeonGates.js';
import { DUNGEON_GATE_EVENTS_2 } from '../data/eventsDungeonGates2.js';
import { EGO_COLOR_EVENTS } from '../data/eventsEgoColorPerks.js';
import { APEX_COLOR_EVENTS } from '../data/apexPath.js';
import { APEX_TWILIGHT_EVENTS } from '../data/eventsApexTwilight.js';
import { LIFE_ENDINGS, lifeEndingOf } from '../data/lifeEndings.js';
import { BRANCH_DEPTH_EVENTS } from '../data/eventsBranchDepth.js';
import { WORKSHOP_VISIT_EVENTS } from '../data/eventsWorkshopVisits.js';
import { FINGER_STORY_EVENTS } from '../data/eventsFingers.js';
import { WING_STORY_EVENTS } from '../data/eventsWing.js';
import { EGO_LEAP_EVENTS } from '../data/eventsEgoLeap.js';
import { AFFILIATION_EVENTS } from '../data/eventsAffiliation.js';
import { ENSEMBLE_EVENTS, ENSEMBLE_SCORE_ITEM } from '../data/dungeonEnsemble.js';
import { COLOR_CAREER_EVENTS } from '../data/eventsColorCareerArc.js';
import { COLOR_ERA_EVENTS } from '../data/eventsColorEras.js';
import { WING_PARITY_MAJORS } from '../data/eventsWingParityExpansion.js';
import { DISTORTION_PARITY_MAJORS } from '../data/eventsDistortionParityExpansion.js';
import { ROUTE_CONSEQUENCE_EVENTS } from '../data/eventsRouteConsequences.js';
import { FINGERS_GAMBLE_EVENTS } from '../data/eventsFingersGambleSuite.js';
import { localizeEnsembleName } from '../data/ensembleNames.js';
import { ENSEMBLE_INVITE_ID, ENSEMBLE_LAST_CALL_ID, recordEnsembleInvitation } from './ensemblePath.js';
import { egoEdge, hasAwakenedEgo } from './egoEdge.js';
import { laneContractSet, laneContractMods, noteAffiliationContract, applyAffiliationChoice, ensureAffiliation, getAffiliation } from './affiliation.js';
import {
  FIXER_LADDER,
  FINGER_LADDERS,
  COLOR_FIXER_REQ,
  getNextFixerPromotion,
  fixerPromotionOfferChance,
  fixerPromotionSuccessChance,
  fixerPromotionFailureEffects,
  checkColorFixerReadiness,
  isColorProdigyEligible,
  getNextFingerPromotion,
  getNextWingPromotion,
  getOtherCareerPromotion,
  careerTrialForEvent,
  careerPromotionSuccessChance,
  careerPromotionFailureEffects,
  getEgoLeap,
  meritRetentionAfterPromotion,
  isEgoLeapEvent,
  egoLeapSuccessChance,
  egoLeapFailureEffects,
  RETIRED_WORKSHOP_TRIAL_IDS,
  triggerDistortionTransformation,
  tryItemAutoRevive,
  determineSuccessorType
} from './careerPipeline.js';
import {
  FATE_OMENS,
  rollRandomFateOmen,
  createInitialWeaverState,
  selectEventWithWeaverAI,
  recordChoiceInGraph,
  updateDramaTension
} from './weaverAI.js';
import { hasMemory, closeThreads, applyNpcFate, namesInUse, applyBonds } from './director.js';
import { BALANCE, frailty, isFixerCareerEvent, reputationGain } from './economyModel.js';
import { activeScarCount, addScar, normalizeScars, scarContractPower } from './scarModel.js';
import { weightedOutcomes } from './outcomeOdds.js';
import { dungeonWagerLevel } from './dungeonWager.js';
import {
  DUNGEON_DEFINITIONS,
  createDungeonSession,
  getDungeonCurrentStage,
  getDungeonMastery,
  isDungeonChoiceAvailable,
  evaluateDungeonChoiceOdds,
  DUNGEON_BALANCE,
  getStrainTier,
  dungeonSupplyState,
  setDungeonStance,
  useDungeonSupply,
  playDungeonCard,
  cardPlayable,
  cardBudgetLeft,
  DUNGEON_CARDS,
  CARD_BUDGET,
  useDungeonEgo,
  dungeonEgoState,
  egoChargesOf,
  hasColorSignatureWeapon,
  resolveDungeonChoice,
  fleeDungeon
} from './dungeonEngine.js';

export const ALL_STORY_EVENTS = [
  ...CHILDHOOD_EVENTS,
  ...CHILDHOOD_EVENTS_2,
  ...LINEAGE_LEGACY_EVENTS,
  ...BACKGROUND_OPENING_EVENTS,
  ...FACTION_EVENTS,
  ...SUPERNATURAL_EVENTS,
  ...FIXER_PATH_EVENTS,
  ...DISTORTION_PATH_EVENTS,
  ...DISTORTION_OVERHAUL_EVENTS,
  ...WORKSHOP_ECONOMY_EVENTS,
  ...BEREAVEMENT_EVENTS,
  ...DERIVATIVE_LORE_EVENTS,
  ...COMPANION_QUEST_EVENTS,
  ...CAREER_DRAMA_EVENTS,
  ...EXPANSION_EVENTS,
  ...EXPANSION_STORY_EVENTS,
  ...DUNGEON_GATE_EVENTS,
  ...DUNGEON_GATE_EVENTS_2,
  ...EGO_COLOR_EVENTS,
  ...APEX_COLOR_EVENTS,
  ...APEX_TWILIGHT_EVENTS,
  ...BRANCH_DEPTH_EVENTS,
  ...WORKSHOP_VISIT_EVENTS,
  ...FINGER_STORY_EVENTS,
  ...WING_STORY_EVENTS,
  ...EGO_LEAP_EVENTS,
  ...AFFILIATION_EVENTS,
  ...ENSEMBLE_EVENTS,
  ...COLOR_CAREER_EVENTS,
  ...COLOR_ERA_EVENTS,
  ...WING_PARITY_MAJORS,
  ...DISTORTION_PARITY_MAJORS,
  ...ROUTE_CONSEQUENCE_EVENTS,
  ...FINGERS_GAMBLE_EVENTS
];

export const SEASONS = [
  { id: 'spring', vi: 'Mùa Xuân', en: 'Spring' },
  { id: 'summer', vi: 'Mùa Hạ', en: 'Summer' },
  { id: 'autumn', vi: 'Mùa Thu', en: 'Autumn' },
  { id: 'winter', vi: 'Mùa Đông', en: 'Winter' }
];

export const CANON_NAMES_BLACKLIST = new Set([
  // 12 Sinners of Limbus Company
  'yi sang', 'faust', 'don quixote', 'ryoshu', 'meursault', 'hong lu', 'honglu',
  'heathcliff', 'ishmael', 'rodion', 'rodya', 'sinclair', 'outis', 'gregor',
  // Key Cast & Protagonists
  'dante', 'vergilius', 'vergil', 'charon', 'roland', 'angela', 'ayin', 'carmen',
  // Sephirah & Librarians
  'malkuth', 'yesod', 'hod', 'netzach', 'tiphereth', 'chesed', 'gebura', 'hokma', 'binah',
  // Historical / Red Mist
  'kali', 'garion',
  // Notable Fixers / Syndicate / Reverberation Ensemble
  'xiao', 'lowell', 'miris', 'philip', 'salvador', 'yuna', 'yujin', 'valentin',
  'tenma', 'olga', 'rain', 'mika', 'argalia', 'iori', 'kromer', 'bamboo-hatted kim',
  'tanya', 'oswald', 'jae-heon', 'elena', 'pluto', 'greta', 'bremen', 'baral',
  'zena', 'luda', 'demian', 'rimbaud', 'sonya', 'aschenbach', 'samjo', 'shrenne',
  'dongbaek', 'dongrang', 'ran', 'marile', 'smee', 'alyssa', 'saude', 'effie', 'hopkins'
]);

/**
 * Generates an original citizen name suited to the character's district culture,
 * strictly guaranteed never to clash with existing canon protagonists/sinners (Hong Lu, Dante, etc.)
 */
export function rollOriginalCityName(rng, { regionId = null, nest = false } = {}) {
  for (let attempt = 0; attempt < 30; attempt++) {
    const id = generatePersonName(rng, { regionId, nest, forceAlias: false });
    // Newborns at birth receive a proper given name or full name, never a street alias
    const candidate = nest ? id.full : (rng() < 0.65 ? id.given : id.full);
    const lower = candidate.toLowerCase();
    const isCanon = CANON_NAMES_BLACKLIST.has(lower) ||
      Array.from(CANON_NAMES_BLACKLIST).some(c => lower === c || lower.startsWith(c + ' ') || lower.endsWith(' ' + c));
    if (!isCanon) {
      return candidate;
    }
  }
  return 'Julian';
}

// Retained for backward-compatibility with external mocks/tests
export const FIRST_NAMES_VI = [
  'julian', 'nathan', 'silas', 'clara', 'vivienne', 'cedric', 'arthur', 'diana',
  'marcus', 'caleb', 'felix', 'valerie', 'corwin', 'beatrice', 'edmund', 'hazel',
  'min-jae', 'do-yun', 'ji-ho', 'yeon-woo', 'tae-oh', 'hyun-seok', 'jun-seo',
  'wen hao', 'bo yan', 'jian yu', 'chen xi', 'ming zhe', 'lan yin', 'mei ling',
  'haruka', 'ren', 'sora', 'kaito', 'daichi', 'shun', 'takumi', 'kenji',
  'matthias', 'ansgar', 'konrad', 'rainer', 'dieter', 'lorenz', 'jonas', 'falk',
  'ilya', 'pavel', 'dmitri', 'lev', 'oleg', 'vadim', 'roman', 'anya', 'zoya'
];

export function formatName(str) {
  if (!str) return 'Wanderer';
  return str
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Mulberry32 Seeded PRNG for reproducible City lives & shareable seeds
 */
// cyrb128 spreads even near-identical seeds ("CITY-A1B2C3" / "CITY-A1B2C4")
// across all 128 bits, and sfc32 turns them into a long, well-mixed stream.
function cyrb128(str) {
  let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
  for (let i = 0; i < str.length; i++) {
    const k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

export function createRNG(seedStr, savedState = null) {
  let [a, b, c, d] = savedState || cyrb128(String(seedStr || `${Date.now()}:${Math.random()}`));
  const next = () => {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
  if (!savedState) for (let i = 0; i < 15; i++) next(); // discard the warm-up outputs
  next.getState = () => [a >>> 0, b >>> 0, c >>> 0, d >>> 0];
  return next;
}

// A fresh seed from the browser's crypto source: 10 characters, ~50 bits.
export function freshSeed() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(10);
  (globalThis.crypto || window.crypto).getRandomValues(bytes);
  return `CITY-${Array.from(bytes, (x) => alphabet[x % alphabet.length]).join('')}`;
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Interpolates dynamic lore & NPC variables into event strings
 */
export function interpolateText(text, char, values = {}) {
  if (!text) return '';
  const parentName = char.lineage?.parentName || 'Tiền Nhân';
  const parentDeath = char.lineage?.parentDeathVi || 'tai ương The City';
  const relic = char.lineage?.relic || 'Thanh Đao Cũ';
  const partner = char.npcs?.partner?.nameVi || 'Cộng sự';
  const spouse = char.npcs?.spouse?.nameVi || 'Người thương';
  const child = char.npcs?.child?.nameVi || 'Đứa con nhỏ';
  const mentor = char.npcs?.mentor?.nameVi || 'Sư phụ';
  const scars =
    char.scars && char.scars.length > 0
      ? char.scars.slice(-2).join(', ')
      : 'Những đêm trắng chạy trốn trong hẻm tối';

  const npcName = (role, fallback) => char.npcs?.[role]?.nameVi || fallback;
  const trialCompanion = char.colorTrialCompanion?.nameVi || partner;
  const fixerDebt = (char.debts || []).find((d) => d.id === 'fixer_license_debt' && d.status === 'active') ||
    (char.debts || []).find((d) => d.status === 'active');
  const debtBalance = values.debtBalance ?? (fixerDebt ? fixerDebt.balanceAhn : 0);
  const partialPay = values.partialPay ?? (fixerDebt ? Math.min(3, fixerDebt.balanceAhn) : 0);
  return text
    .replace(/\{debtBalance\}/g, String(debtBalance))
    .replace(/\{partialPay\}/g, String(partialPay))
    .replace(/\{name\}/g, char.name || '')
    .replace(/\{trialCompanion\}/g, trialCompanion)
    .replace(/\{age\}/g, String(char.age ?? ''))
    .replace(/\{friend\}/g, npcName('friend', 'đứa bạn cùng hẻm'))
    .replace(/\{rival\}/g, npcName('rival', 'kẻ kia'))
    .replace(/\{lover\}/g, npcName('lover', npcName('spouse', 'người ấy')))
    .replace(/\{nemesis\}/g, npcName('nemesis', 'kẻ thù'))
    .replace(/\{parentName\}/g, parentName)
    .replace(/\{parentDeath\}/g, parentDeath)
    .replace(/\{parent\}/g, parentName)
    .replace(/\{relic\}/g, relic)
    .replace(/\{partner\}/g, partner)
    .replace(/\{spouse\}/g, spouse)
    .replace(/\{child\}/g, child)
    .replace(/\{ward\}/g, npcName('ward', 'đứa trẻ'))
    .replace(/\{mentor\}/g, mentor)
    .replace(/\{mentee\}/g, npcName('mentee', 'đệ tử'))
    .replace(/\{scars\}/g, scars);
}

/**
 * Creates a new character (Generation 1 or Generational Heir of Generation N)
 * The newborn is also given a random fate omen.
 */
/**
 * A birthplace left to chance: weighted by population, with a 65% pull back to
 * the previous generation's District. The home screen's wheel spins to this
 * result, so it must stay the only place the roll happens.
 */
export function rollBirthRegion(rng = Math.random, parentLegacy = null, preferredFamilyId = 'RANDOM') {
  if (preferredFamilyId === 'outskirts_nomad') return REGIONS.find(r => r.id === 'OUTSKIRTS');
  const regions = preferredFamilyId && preferredFamilyId !== 'RANDOM'
    ? REGIONS.filter(r => r.id !== 'OUTSKIRTS')
    : REGIONS;
  if (parentLegacy?.regionId && rng() < 0.65) {
    const inherited = REGIONS.find(r => r.id === parentLegacy.regionId);
    if (inherited && regions.includes(inherited)) return inherited;
  }
  const totalWeight = regions.reduce((s, r) => s + (r.birthWeight || 1), 0);
  let pick = rng() * totalWeight;
  for (const r of regions) {
    pick -= r.birthWeight || 1;
    if (pick <= 0) return r;
  }
  return regions[0];
}

export function rollBirthFamily(region, rng, parentLegacy = null, preferredFamilyId = 'RANDOM') {
  if (region.id === 'OUTSKIRTS') {
    return FAMILIES.find((f) => f.id === 'outskirts_nomad');
  }
  if (preferredFamilyId && preferredFamilyId !== 'RANDOM') {
    const selected = FAMILIES.find((f) => f.id === preferredFamilyId);
    if (selected && selected.id !== 'outskirts_nomad') return selected;
  }
  if (region.tags?.includes('head')) {
    const headFamilies = FAMILIES.filter((f) => ['nest_feather', 'wing_executive'].includes(f.id));
    return headFamilies[Math.floor(rng() * headFamilies.length)] || FAMILIES[0];
  }
  if (region.tags?.includes('fallen_wing')) {
    const fallenFamilies = FAMILIES.filter((f) => ['smoke_war_veteran', 'orphan', 'backstreet_worker', 'fixer_lineage', 'workshop_apprentice'].includes(f.id));
    return fallenFamilies[Math.floor(rng() * fallenFamilies.length)] || FAMILIES[0];
  }
  if (parentLegacy) {
    if (parentLegacy.wealth >= 60) {
      const nestFam = FAMILIES.find((f) => f.id === 'nest_feather' || f.id === 'wing_executive');
      if (nestFam) return nestFam;
    } else if (parentLegacy.job === 'Fixer' || parentLegacy.job === 'Color Fixer') {
      const fixerFam = FAMILIES.find((f) => f.id === 'fixer_lineage');
      if (fixerFam) return fixerFam;
    }
  }

  const weights = {
    orphan: 14,
    backstreet_worker: 18,
    smoke_war_veteran: region.ward === 4 || region.id === 'D' || region.id === 'G' ? 24 : 8,
    fixer_lineage: 12,
    workshop_apprentice: region.id === 'T' || region.ward === 20 || region.id === 'J' ? 18 : 10,
    syndicate_soldato: region.id === 'J' || region.id === 'K' || region.id === 'N' ? 18 : 12,
    nest_feather: region.wealth >= 8 ? 24 : 8,
    wing_executive: region.wealth >= 9 ? 12 : 2,
    dieci_orphan: region.ward === 11 || region.id === 'K' ? 18 : 8,
    great_lake_mariner: region.id === 'U' || region.ward === 21 ? 30 : 2,
    warp_cleaner_offspring: region.id === 'W' || region.ward === 23 ? 24 : 4,
    backstreet_bistro: region.ward === 23 || region.id === 'H' ? 18 : 10,
    prosthetic_tinkerer: region.id === 'T' || region.id === 'V' || region.id === 'G' ? 18 : 10
  };

  const pool = FAMILIES.filter((f) => f.id !== 'outskirts_nomad');
  const total = pool.reduce((sum, f) => sum + (weights[f.id] || 10), 0);
  let pick = rng() * total;
  for (const f of pool) {
    pick -= (weights[f.id] || 10);
    if (pick <= 0) return f;
  }
  return pool[0] || FAMILIES[0];
}

export function createNewCharacter({
  customName = '',
  gender = 'unspecified',
  seed = '',
  preferredRegionId = 'RANDOM',
  preferredFamilyId = 'RANDOM',
  parentLegacy = null,
  startAge = 0
} = {}) {
  parentLegacy = normalizeLegacyRecord(parentLegacy);
  const actualSeed = seed.trim() || freshSeed();
  const rng = createRNG(actualSeed);
  const actualAge = Math.max(0, startAge);

  // Pick Region
  let region = null;
  if (preferredRegionId && preferredRegionId !== 'RANDOM') {
    region = REGIONS.find(r => r.id === preferredRegionId);
  }
  if (!region) region = rollBirthRegion(rng, parentLegacy, preferredFamilyId);

  // Pick Family Background
  const family = rollBirthFamily(region, rng, parentLegacy, preferredFamilyId);

  // Roll RNG Fate Omen at birth!
  const fateOmen = rollRandomFateOmen(rng, Boolean(parentLegacy));
  const omenMod = fateOmen.statMod || {};

  const defaultName =
    customName.trim() ||
    (parentLegacy?.childName
      ? parentLegacy.childName
      : rollOriginalCityName(rng, { regionId: region.id, nest: family.tier === 'nest' || family.id === 'nest_feather' }));

  const generation = parentLegacy ? (parentLegacy.generation || 1) + 1 : 1;

  // Base Stats (0 - 100) + Family Background + RNG Fate Omen modifiers - Balanced for Project Moon lore
  let health = clamp(52 + (family.statMod.health || 0) + (omenMod.health || 0) + Math.floor(rng() * 10 - 4), 20, 95);
  let sanity = clamp(52 + (family.statMod.sanity || 0) + (omenMod.sanity || 0) + Math.floor(rng() * 10 - 4), 20, 95);
  let wealth = clamp(6 + (family.statMod.wealth || 0) + (omenMod.wealth || 0) + Math.floor(rng() * 4 - 1), 1, 95);
  let network = clamp(2 + (family.statMod.network || 0) + Math.floor(rng() * 3), 0, 50);
  let rep = clamp(0 + (family.statMod.rep || 0) + Math.floor(rng() * 2), 0, 50);

  const flags = [...(family.flags || [])];
  if (family.trait?.id && !flags.includes(family.trait.id)) {
    flags.push(family.trait.id);
  }
  const scars = [];
  const unlockedRecords = [region.id === 'OUTSKIRTS' ? 'born_outskirts' : 'born_city'];
  let heat = clamp((family.statMod.heat || 0) + (omenMod.heat || 0), 0, 100);
  let taboo = clamp((family.statMod.taboo || 0) + (omenMod.taboo || 0), 0, 2);
  let resonance = clamp(5 + (family.statMod.resonance || 0) + (omenMod.resonance || 0), 0, 100);

  if (['merciless_head', 'carmen_whisper', 'crimson_sweeper_star'].includes(fateOmen.id)) {
    unlockedRecords.push('omen_cursed_birth');
  }
  if (generation >= 3) unlockedRecords.push('dynasty_gen3');
  if (generation >= 5) unlockedRecords.push('dynasty_gen5');
  if (region.id === 'T') unlockedRecords.push('tcorp_time_debtor');

  // Apply Generational Inheritance based on the 5 Successor Archetypes
  let lineageInfo = null;
  const inheritedEchoes = [];

  if (parentLegacy) {
    flags.push('HuyếtThốngKếThừa');
    if (!unlockedRecords.includes('lineage_heir')) unlockedRecords.push('lineage_heir');
    if (parentLegacy.ensembleScore) resonance = clamp(resonance + 3, 0, 100);
    const inheritedRelicEn = parentLegacy.relicEn || localizeEnsembleName(parentLegacy.relic, 'en');

    const succRel = parentLegacy.successorRelation || (parentLegacy.age < 14 ? 'sibling' : parentLegacy.age < 18 ? 'companion' : parentLegacy.hasChild ? 'child' : 'scavenger');

    if (succRel === 'child') {
      wealth = clamp(wealth + Math.round((parentLegacy.wealth || 0) * 0.25), 2, 75);
      rep = clamp(rep + Math.round((parentLegacy.rep || 0) * 0.15), 1, 50);
      network = clamp(network + Math.round((parentLegacy.network || 0) * 0.18), 1, 50);
      inheritedEchoes.push({
        labelVi: `Huyết tử thừa kế từ ${parentLegacy.name}: ${parentLegacy.relic}`,
        labelEn: `Biological inheritance from ${parentLegacy.name} (${inheritedRelicEn})`,
        impactVi: `Thêm Ahn lúc đầu, người cũ của ${parentLegacy.name} có thể tìm đến`,
        impactEn: `+Starting Ahn, unlocks Heirloom & Old Comrade causal events`
      });
    } else if (succRel === 'sibling') {
      wealth = clamp(wealth + Math.round((parentLegacy.wealth || 0) * 0.10), 2, 45);
      resonance = clamp(resonance + 6, 0, 100);
      sanity = clamp(sanity + 5, 10, 95);
      scars.push('Nỗi đau kẻ sống sót');
      inheritedEchoes.push({
        labelVi: `Kỷ vật của người ngã xuống tuổi thơ: ${parentLegacy.relic}`,
        labelEn: `Keepsake of one fallen young (${inheritedRelicEn})`,
        impactVi: `+6 Resonance, mang Vết sẹo Nỗi đau kẻ sống sót kiên cường khi nguy cấp`,
        impactEn: `+6 Resonance, Survivor's Guilt scar grants resilience in crisis`
      });
    } else if (succRel === 'companion') {
      network = clamp(network + Math.round((parentLegacy.network || 0) * 0.20), 1, 50);
      rep = clamp(rep + Math.round((parentLegacy.rep || 0) * 0.12), 1, 50);
      resonance = clamp(resonance + 4, 0, 100);
      inheritedEchoes.push({
        labelVi: `Di nguyện của bạn đồng hành: ${parentLegacy.relic}`,
        labelEn: `Companion's parting vow (${inheritedRelicEn})`,
        impactVi: `+Mạng lưới Backstreets và Resonance từ lời thề đồng hành`,
        impactEn: `+Starting Network and Resonance from shared youthful vows`
      });
    } else if (succRel === 'apprentice') {
      rep = clamp(rep + Math.round((parentLegacy.rep || 0) * 0.25), 1, 50);
      network = clamp(network + Math.round((parentLegacy.network || 0) * 0.22), 1, 50);
      health = clamp(health + 8, 20, 95);
      inheritedEchoes.push({
        labelVi: `Truyền nhân ý chí của ${parentLegacy.name}: ${parentLegacy.relic}`,
        labelEn: `Protege inheritor of ${parentLegacy.name} (${inheritedRelicEn})`,
        impactVi: `+Khởi điểm Danh tiếng, Mạng lưới và Thân pháp võ học được rèn giũa`,
        impactEn: `+Higher starting Rep, Network and trained physical fortitude`
      });
    } else if (succRel === 'debt_bearer') {
      network = clamp(network + 16, 1, 50);
      resonance = clamp(resonance + 6, 0, 100);
      heat = clamp(heat + 32, 0, 100);
      flags.push('NợMáuĐờiTrước');
      scars.push(`Món Nợ Máu Của ${parentLegacy.name}`);
      inheritedEchoes.push({
        labelVi: `Món nợ ép gánh từ thời ${parentLegacy.name}`,
        labelEn: `Blood debt forced upon you from ${parentLegacy.name}`,
        impactVi: `Syndicate bắt thế nợ, Heat cao kích thích tiềm năng phản kháng`,
        impactEn: `Forced debt, starts with Syndicate Heat and resistance drive`
      });
    } else {
      // scavenger / solitary
      wealth = clamp(wealth + Math.round((parentLegacy.wealth || 0) * 0.08), 2, 40);
      resonance = clamp(resonance + 5, 0, 100);
      flags.push('BảnLĩnhNgõCùng');
      inheritedEchoes.push({
        labelVi: `Di vật nhặt từ đống đổ nát của ${parentLegacy.name}: ${parentLegacy.relic}`,
        labelEn: `Scavenged relic of ${parentLegacy.name} (${inheritedRelicEn})`,
        impactVi: `Nhận di vật vô chủ, tiềm năng thức tỉnh vũ khí bí mật`,
        impactEn: `Found unowned relic, hidden weapon awakening potential`
      });
    }

    lineageInfo = {
      generation,
      parentName: parentLegacy.name,
      parentAge: parentLegacy.age || 0,
      parentTitle: parentLegacy.epitaphTitleVi,
      parentJob: parentLegacy.job,
      parentDeathVi: parentLegacy.deathCauseVi,
      parentDeathEn: parentLegacy.deathCauseEn,
      relic: parentLegacy.relic || keepsakeForLife(parentLegacy).vi,
      relicEn: inheritedRelicEn || keepsakeForLife(parentLegacy).en,
      inheritedDebt: Boolean(parentLegacy.hasVendetta || succRel === 'debt_bearer'),
      successorRelation: succRel,
      successorTitleVi: parentLegacy.successorTitleVi,
      successorTitleEn: parentLegacy.successorTitleEn,
      successorIntroVi: parentLegacy.successorIntroVi,
      successorIntroEn: parentLegacy.successorIntroEn
    };

    if (parentLegacy.ensembleScore) inheritedEchoes.push({
      labelVi: 'Bản tổng phổ viết dở', labelEn: 'The Unfinished Score',
      impactVi: 'Thêm 3 Resonance khi bắt đầu đời mới', impactEn: 'Start the next life with 3 extra Resonance'
    });

    if (parentLegacy.hasVendetta && succRel !== 'debt_bearer') {
      flags.push('NợMáuĐờiTrước');
      heat = clamp(heat + 28, 0, 100);
      scars.push(`Món Nợ Máu Của ${parentLegacy.name}`);
      inheritedEchoes.push({
        labelVi: `Món nợ trong Book of Vengeance từ thời ${parentLegacy.name}`,
        labelEn: `Book of Vengeance blood debt from ${parentLegacy.name}`,
        impactVi: `Syndicate sẽ tìm đến đòi nợ khi bạn trưởng thành`,
        impactEn: `The Syndicate will come to collect when you come of age`
      });
    }

    const echoState = { wealth, rep, network, resonance, heat, sanity, flags, inheritedEchoes };
    applyAncestorEchoInheritance(parentLegacy, echoState);
    wealth = echoState.wealth;
    rep = echoState.rep;
    network = echoState.network;
    resonance = echoState.resonance;
    heat = echoState.heat;
    sanity = echoState.sanity;
  }

  let deathAtChildAge = 0;
  const isBiologicalChild = Boolean(parentLegacy && parentLegacy.successorRelation === 'child');
  if (isBiologicalChild && parentLegacy.age >= 18) {
    const parentChildBirthAge = Math.min(parentLegacy.age - 1, Math.max(18, parentLegacy.age - 18));
    deathAtChildAge = Math.max(1, parentLegacy.age - parentChildBirthAge);
  }

  const parentNpc = parentLegacy ? ensureNpcAgency({
    id: 'npc_parent',
    name: parentLegacy.name,
    nameVi: parentLegacy.name,
    nameEn: parentLegacy.name,
    role: 'parent',
    job: parentLegacy.job,
    district: parentLegacy.regionNameVi || null,
    relic: parentLegacy.relic,
    alive: isBiologicalChild && actualAge < deathAtChildAge,
    deathAgeInChildLife: deathAtChildAge
  }, rng) : null;

  if (actualAge >= 18) {
    health = clamp(health + 18, 20, 95);
    sanity = clamp(sanity + 18, 20, 95);
    wealth = clamp(wealth + 14, 5, 85);
    network = clamp(network + 10, 0, 50);
    rep = clamp(rep + 10, 0, 50);
  }

  // The opening lines are assembled from independent random pieces (see birthStories.js)
  const birthKind = flags.includes('Outskirts') || region.id === 'OUTSKIRTS' ? 'out' : flags.includes('Nest') || flags.includes('Feather') ? 'nest' : 'back';
  const birth = composeBirth({
    kind: birthKind,
    familyId: family.id,
    omenId: fateOmen.id,
    regionVi: region.nameVi,
    regionEn: region.nameEn,
    regionId: region.id,
    name: defaultName,
    generation,
    rng
  });

  // Check Pre-Birth / Perinatal Mortality (District medicine, pollution, safety, poverty)
  const perinatal = actualAge === 0 ? rollPerinatalFate({
    region,
    familyId: family.id,
    omenId: fateOmen.id,
    flags,
    wealth
  }, rng) : null;

  let initialLogs = [];
  if (perinatal) {
    initialLogs.push({
      id: 'log_birth_perinatal_0',
      age: 0,
      season: SEASONS[0],
      type: 'danger',
      vi: perinatal.preludeVi(region.nameVi),
      en: perinatal.preludeEn(region.nameEn)
    });
    initialLogs.push({
      id: 'log_birth_perinatal_1',
      age: 0,
      season: SEASONS[0],
      type: 'death',
      vi: region.id === 'OUTSKIRTS'
        ? `[Mất trước khi cất tiếng khóc] ${perinatal.deathVi}. Đoàn xe chôn bạn ở nơi họ dừng chân đêm ấy.`
        : `[Mất trước khi cất tiếng khóc] ${perinatal.deathVi}. Một sinh linh nữa rời The City khi ánh đèn neon ngoài cửa sổ còn chưa kịp đổi màu.`,
      en: region.id === 'OUTSKIRTS'
        ? `[Perished before drawing breath] ${perinatal.deathEn}. The caravan buried you where it stopped that night.`
        : `[Perished before drawing breath] ${perinatal.deathEn}. Another life slipped from The City before neon lights outside could change color.`
    });
  } else if (actualAge > 0) {
    initialLogs.push({
      id: 'log_adult_start_0',
      age: actualAge,
      season: SEASONS[0],
      type: 'story',
      vi: region.id === 'OUTSKIRTS'
        ? `Năm bạn ${actualAge} tuổi, đoàn xe dừng bên ngoài bức tường The City. Bạn mang theo 「${lineageInfo?.relic || 'kỷ vật cũ'}」 của ${parentLegacy?.name || 'người đi trước'} và tự chọn đường đi tiếp.`
        : `Năm bạn ${actualAge} tuổi, ${parentLegacy ? parentLegacy.name : 'người đi trước'} đã ngã xuống trong biến cố The City. Bạn tiếp nhận di vật 「${lineageInfo?.relic || 'Kỷ vật cũ'}」 và chính thức bắt đầu hành trình của riêng mình.`,
      en: region.id === 'OUTSKIRTS'
        ? `At age ${actualAge}, the caravan stops beyond the City wall. You carry 「${lineageInfo?.relicEn || 'an old keepsake'}」 from ${parentLegacy?.name || 'the one before you'} and choose your next road.`
        : `At age ${actualAge}, ${parentLegacy ? parentLegacy.name : 'your predecessor'} fell in the perils of The City. You take up 「${lineageInfo?.relicEn || 'a keepsake'}」 and begin your own path.`
    });
  } else {
    initialLogs = birth.lines.map((line, i) => ({
      id: `log_birth_${i}`,
      age: 0,
      season: SEASONS[0],
      ...line
    }));

    if (lineageInfo) {
      if (parentNpc && parentNpc.alive) {
        initialLogs.push({
          id: 'log_parent_living',
          age: 0,
          season: SEASONS[1],
          type: 'causal',
          vi: `Bạn chào đời tại ${region.nameVi}. Cha/mẹ bạn (${parentLegacy.name}, ${parentLegacy.job || 'cư dân The City'}) lúc này vẫn còn sống và che chở bạn qua những năm tháng ấu thơ.`,
          en: `You were born in ${region.nameEn}. Your parent (${parentLegacy.name}) is alive and watching over your early childhood.`
        });
      } else {
        let legacyVi = `Bạn là con của ${lineageInfo.parentName}. Thứ duy nhất người ấy để lại là 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', và một món nợ máu với Syndicate.' : '.'}`;
        let legacyEn = `You are the child of ${lineageInfo.parentName}. All they left you was 「${lineageInfo.relicEn}」${lineageInfo.inheritedDebt ? ', and a blood debt to a Syndicate.' : '.'}`;

        if (lineageInfo.successorRelation === 'sibling' || (lineageInfo.parentAge > 0 && lineageInfo.parentAge < 14)) {
          legacyVi = `${lineageInfo.parentName} ngã xuống năm ${lineageInfo.parentAge} tuổi khi chưa kịp lớn. Bạn là đứa trẻ trốn cùng buồng trọ lúc 3:13 AM nhặt lại 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', cùng món nợ máu dở dang với Syndicate.' : '.'}`;
          legacyEn = `${lineageInfo.parentName} perished young at age ${lineageInfo.parentAge}. You are the room-child who hid beside them at 3:13 AM, clutching 「${lineageInfo.relicEn}」${lineageInfo.inheritedDebt ? ', along with an unsettled Syndicate blood debt.' : '.'}`;
        } else if (lineageInfo.successorRelation === 'companion' || (lineageInfo.parentAge >= 14 && lineageInfo.parentAge < 18)) {
          legacyVi = `${lineageInfo.parentName} ngã xuống giữa tuổi thiếu niên (${lineageInfo.parentAge} tuổi). Bạn là người bạn cùng ngõ hẻm tiếp bước mang theo 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', cùng món nợ máu dở dang với Syndicate.' : '.'}`;
          legacyEn = `${lineageInfo.parentName} fell at age ${lineageInfo.parentAge}. You are the alley companion who took up their 「${lineageInfo.relicEn}」${lineageInfo.inheritedDebt ? ', along with an unsettled Syndicate blood debt.' : '.'}`;
        } else if (lineageInfo.successorRelation === 'apprentice') {
          legacyVi = `${lineageInfo.parentName} qua đời năm ${lineageInfo.parentAge} tuổi. Bạn là môn sinh được người ấy dìu dắt, tiếp nhận 「${lineageInfo.relic}」 và ý chí chiến đấu chưa hoàn tất.`;
          legacyEn = `${lineageInfo.parentName} passed away at age ${lineageInfo.parentAge}. You are the protégé they mentored, taking up 「${lineageInfo.relicEn}」 and their martial will.`;
        } else if (lineageInfo.successorRelation === 'debt_bearer') {
          legacyVi = `${lineageInfo.parentName} qua đời năm ${lineageInfo.parentAge} tuổi khi nợ máu chưa trả hết. Bạn bị Syndicate ép gánh cuốn sổ nợ cùng di vật 「${lineageInfo.relic}」.`;
          legacyEn = `${lineageInfo.parentName} died at age ${lineageInfo.parentAge} with an unsettled blood debt. The Syndicate forced their ledger and 「${lineageInfo.relicEn}」 into your hands.`;
        } else if (lineageInfo.successorRelation === 'scavenger' || lineageInfo.successorRelation === 'heir') {
          legacyVi = `${lineageInfo.parentName} qua đời cô độc năm ${lineageInfo.parentAge} tuổi. Bạn là kẻ nhặt rác Backstreets tình cờ đào được 「${lineageInfo.relic}」 từ đống gạch vụn trước giờ Sweeper dọn sạch.`;
          legacyEn = `${lineageInfo.parentName} died alone at age ${lineageInfo.parentAge}. You are a Backstreet scavenger who unearthed 「${lineageInfo.relicEn}」 before the Sweepers arrived.`;
        }

        initialLogs.push({
          id: 'log_legacy_0',
          age: 0,
          season: SEASONS[1],
          type: 'causal',
          vi: legacyVi,
          en: legacyEn
        });
      }
    }
  }

  const weaver = createInitialWeaverState(fateOmen.id, inheritedEchoes);
  if (parentNpc && parentNpc.alive && deathAtChildAge > actualAge) {
    weaver.pendingThreads.push({
      id: 'thread_parent_passing',
      eventId: 'csq_parent_historic_passing',
      triggerAge: deathAtChildAge,
      kind: 'major',
      reasonVi: `Năm bạn ${deathAtChildAge} tuổi: Biến cố ${parentLegacy.name} ngã xuống`,
      reasonEn: `At age ${deathAtChildAge}: The historic fall of ${parentLegacy.name}`
    });
  }

  return {
    seed: actualSeed,
    generation,
    name: defaultName,
    gender: gender === 'male' || gender === 'female' ? gender : 'unspecified',
    age: actualAge,
    bodyAge: Number((actualAge * frailty({ regionId: region.id })).toFixed(2)),
    bodyAgeRecordedAt: actualAge,
    seasonIdx: 0,
    alive: !perinatal,
    deathCauseVi: perinatal ? perinatal.deathVi : null,
    deathCauseEn: perinatal ? perinatal.deathEn : null,
    regionId: region.id,
    birthRegionId: region.id,
    familyId: family.id,
    family: {
      id: family.id,
      nameVi: family.nameVi,
      nameEn: family.nameEn,
      descVi: family.descVi,
      descEn: family.descEn,
      trait: family.trait || null
    },
    backgroundTrait: family.trait || null,
    fateOmenId: fateOmen.id,
    traits: rollTraits(createRNG(`${actualSeed}:traits`)),
    job: actualAge >= 18 && region.id !== 'OUTSKIRTS'
      ? (parentLegacy?.job === 'Syndicate' ? 'Syndicate' : parentLegacy?.job === 'Wing Employee' ? 'Wing Employee' : 'Fixer')
      : 'Child',
    careerAge: rollCareerAge(actualSeed, {
      nest: flags.includes('Nest') || flags.includes('Feather'),
      outskirts: region.id === 'OUTSKIRTS',
      poor: ['orphan', 'backstreet_worker', 'smoke_war_veteran'].includes(family.id)
    }),
    fixerGrade: 9,
    lastFixerExamAge: null,
    fixerTrialRetryGrade: null,
    merit: actualAge >= 18 ? 10 : 0,
    finger: actualAge >= 18 && parentLegacy?.job === 'Syndicate' ? parentLegacy?.finger : null,
    fingerRank: actualAge >= 18 && parentLegacy?.job === 'Syndicate' ? 1 : 0,
    wingRank: 0,
    wingEmployerId: actualAge >= 18 && parentLegacy?.job === 'Wing Employee' ? region.id : null,
    syndicateRank: 0,
    org: null,
    customTitle: null,
    egoName: null,
    craftWeapon: null,
    inventory: parentLegacy?.ensembleScore ? [{ ...ENSEMBLE_SCORE_ITEM }] : [],
    debts: [],
    stats: {
      health: perinatal ? 0 : health,
      sanity: perinatal ? 0 : sanity,
      wealth,
      network,
      rep
    },
    get health() { return this.stats.health; },
    get sanity() { return this.stats.sanity; },
    get wealth() { return this.stats.wealth; },
    get network() { return this.stats.network; },
    get rep() { return this.stats.rep; },
    heat,
    taboo,
    resonance,
    flags,
    activeArcs: [],
    scars,
    npcs: {
      friend: birth.friend ? { ...birth.friend, metAge: 0 } : null,
      parent: parentNpc,
      mentor: (parentLegacy && parentLegacy.successorRelation === 'apprentice' && parentLegacy.npcs?.partner && parentLegacy.npcs.partner.status !== 'dead')
        ? ensureNpcAgency({
            ...parentLegacy.npcs.partner,
            role: 'mentor',
            metAge: 0,
            bond: 65,
            traitVi: `Cộng sự cũ của ${parentLegacy.name}, nay trở thành người dìu dắt bạn`,
            traitEn: `Former comrade of ${parentLegacy.name}, now guiding you`,
            memories: [{ age: 0, vi: `Năm 0 tuổi: Nhận lời dìu dắt từ người bạn chiến đấu của ${parentLegacy.name}.`, en: `Age 0: Taken under the wing of ${parentLegacy.name}'s comrade.` }]
          }, rng)
        : null,
      partner: null,
      spouse: null,
      child: null,
      nemesis: (parentLegacy?.npcs?.nemesis && parentLegacy.npcs.nemesis.status !== 'dead')
        ? ensureNpcAgency({
            ...parentLegacy.npcs.nemesis,
            role: 'nemesis',
            metAge: 0,
            traitVi: `Kẻ thù truyền kiếp của ${parentLegacy.name}, nay chuyển tầm ngắm sang hậu bối`,
            traitEn: `Sworn nemesis of ${parentLegacy.name}, now hunting the heir`,
            memories: [{ age: 0, vi: `Năm 0 tuổi: Thừa kế mối thù sâu nặng từ thời ${parentLegacy.name}.`, en: `Age 0: Inherited the blood feud from ${parentLegacy.name}.` }]
          }, rng)
        : null
    },
    lineage: lineageInfo,
    seenEvents: [],
    recent: [],
    plan: [],
    planCursor: 0,
    pendingMinor: null,
    memory: [],
    motifs: {},
    unlockedRecords,
    contractRecord: { fixer: 0, wing: 0, independent: 0, fingers: {}, highestFixerTier: 0 },
    dungeonRecord: { clears: [] },
    logs: [],
    pendingBirthLogs: initialLogs,
    weaver,
    pendingEvent: null,
    pendingContract: null,
    pendingDungeon: null,
    pendingModal: null
  };
}

/**
 * Helper to clone and normalize character object so getters stay intact
 */
/** Records how a Color name was reached, so the years after it can speak to that: young, or grown from an E.G.O. */
function markColorInvestiture(char) {
  if (char.colorAwardAge !== char.age) return;
  if (char.age < 45 && !char.flags.includes('ColorYoung')) char.flags.push('ColorYoung');
  if (hasAwakenedEgo(char) && !char.flags.includes('ColorFromEGO')) char.flags.push('ColorFromEGO');
}

export function cloneChar(char) {
  const scarState = normalizeScars(char);
  const invClone = structuredClone(char.inventory || []);
  const eqClone = char.equipped ? structuredClone(char.equipped) : undefined;
  if (eqClone) {
    for (const slot of ['weapon', 'armor', 'consumable', 'utility']) {
      if (eqClone[slot]?.id) {
        const matchInInv = invClone.find((it) => it && (it.id || it) === eqClone[slot].id);
        if (matchInInv && typeof matchInInv === 'object') {
          eqClone[slot] = matchInInv;
        }
      }
    }
  }
  const copy = {
    ...char,
    stats: { ...char.stats },
    flags: [...char.flags],
    scars: scarState.scars,
    scarHistory: scarState.scarHistory,
    npcs: structuredClone(char.npcs || {}),
    weaver: structuredClone(char.weaver),
    inventory: invClone,
    debts: structuredClone(char.debts || []),
    ...(eqClone !== undefined ? { equipped: eqClone } : {}),
    ...(char.craftWeapon !== undefined ? { craftWeapon: structuredClone(char.craftWeapon) } : {}),
    imbuedRelics: structuredClone(char.imbuedRelics || []),
    themes: { ...(char.themes || {}) },
    plan: structuredClone(char.plan || []),
    seenEvents: [...char.seenEvents],
    recent: [...(char.recent || [])],
    recentMishaps: [...(char.recentMishaps || [])],
    memory: [...(char.memory || [])],
    motifs: { ...(char.motifs || {}) },
    unlockedRecords: [...char.unlockedRecords],
    logs: [...char.logs],
    pendingBirthLogs: char.pendingBirthLogs ? [...char.pendingBirthLogs] : undefined
  };
  Object.defineProperties(copy, {
    health: { get() { return this.stats.health; }, enumerable: true },
    sanity: { get() { return this.stats.sanity; }, enumerable: true },
    wealth: { get() { return this.stats.wealth; }, enumerable: true },
    network: { get() { return this.stats.network; }, enumerable: true },
    rep: { get() { return this.stats.rep; }, enumerable: true }
  });
  return copy;
}

export function evaluateCharacterAchievements(char) {
  char.unlockedRecords ||= [];
  const unlock = (key) => {
    if (!char.unlockedRecords.includes(key)) {
      char.unlockedRecords.push(key);
    }
  };

  if (char.age >= 70 && char.alive) unlock('elder_survivor_70');
  if (char.age >= 80) unlock('life_eighty');
  if (char.age >= 100) unlock('life_century');
  if (char.stats.wealth >= 95) unlock('wealth_tycoon');
  if (char.flags.includes('Feather') || char.flags.includes('Nest')) unlock('nest_migration');
  if (char.npcs?.spouse) unlock('family_built');
  if (char.generation >= 3) unlock('dynasty_gen3');
  if (char.generation >= 5) unlock('dynasty_gen5');

  if (char.job === 'Fixer' || char.job === 'Color Fixer') {
    unlock('fixer_license');
    if (char.fixerGrade <= 5) unlock('fixer_grade5');
    if (char.fixerGrade <= 1) unlock('fixer_grade1');
    if (char.fixerGrade === 0 || char.flags.includes('ColorFixer')) unlock('color_fixer');
  }
  if (char.org?.type === 'assoc') unlock('assoc_joined');
  if (char.affiliation?.kind === 'assoc' && char.affiliation.id === 'Liu' && char.merit >= 80) unlock('liu_warfare_flame');
  if (char.flags.includes('AssocDirector') || char.affiliation?.director) unlock('association_director');
  if (char.flags.includes('OwnFixerOffice')) unlock('office_owner');
  if (char.flags.includes('ColorFixer') && (char.colorAwardAge ?? char.age) < 45) unlock('color_before_forty_five');
  const work = char.contractRecord || {};
  if ((work.fixer || 0) >= 3) unlock('three_requests');
  if ((work.fixer || 0) >= 10) unlock('ten_requests');
  if ((work.highestFixerTier || 0) >= 4) unlock('hard_request');
  if ((work.wing || 0) >= 5) unlock('wing_five_assignments');
  if ((work.independent || 0) >= 5) unlock('independent_five_jobs');
  if (Object.values(work.fingers || {}).some((count) => count >= 5)) unlock('five_finger_jobs');
  if (char.job === 'Wing Employee' && (char.wingRank || 0) >= 2) unlock('wing_section_chief');
  if (char.job === 'Wing Employee' && (char.wingRank || 0) >= 3) unlock('wing_senior_executive');
  if (char.finger && (char.fingerRank || 0) >= 3) unlock('finger_top_rank');
  if (char.craftWeapon) unlock('workshop_masterpiece');

  if (char.finger) {
    unlock('finger_initiate');
    if (char.finger === 'Thumb' && (char.fingerRank || 0) >= 2) unlock('thumb_underboss');
    if (char.finger === 'Index' && (char.fingerRank || 0) >= 2) unlock('index_proxy');
    if (char.finger === 'Middle' && (char.fingerRank || 0) >= 2) unlock('middle_big_sibling');
    if (char.finger === 'Ring' && (char.fingerRank || 0) >= 2) unlock('ring_maestro');
    if (char.finger === 'Pinky' && (char.fingerRank || 0) >= 2) unlock('pinky_star');
  }

  if ((char.heat || 0) >= 80 && char.alive) unlock('max_heat_outlaw');
  if (char.regionId === 'T') unlock('tcorp_time_debtor');
  if (activeScarCount(char) >= 3 && char.alive) unlock('scarred_psyche_4');
  if ([...char.scars, ...(char.scarHistory || [])].includes('Vết Mổ Cưỡng Chế Thuế Nội Tạng')) unlock('organ_harvest_victim');
  if (char.flags.includes('Distorted')) unlock('distortion_awaken');
  if (char.flags.includes('EGOAwakened') || char.egoName) unlock('ego_effloresced');

  if (char.flags.includes('SurvivedBackstreetsNight')) unlock('survive_night');
  if ((char.unlockedRecords || []).includes('warp_cleanup') && char.alive) {
    unlock('warp_cleanup');
  }
  if (char.seenEvents.some((id) => id.includes('hatchery') || id.includes('r_corp')) && char.alive) {
    unlock('rcorp_hatchery');
  }
  if (char.seenEvents.some((id) => id.includes('inquisition') || id.includes('n_corp'))) {
    unlock('ncorp_heretic_purge');
  }
  if (char.seenEvents.some((id) => id.includes('massacre') || id.includes('black_silence'))) {
    unlock('black_silence_grief');
  }

  if (!char.alive) {
    const dc = (char.deathCauseVi || '').toLowerCase();
    if (char.age < 18) unlock('died_young_alley');
    if (dc.includes('sweeper') || dc.includes('hòa tan') || dc.includes('3:13')) unlock('sweeper_soup');
    if (dc.includes('warp') || dc.includes('thị trấn tình yêu') || dc.includes('2.000 năm')) unlock('love_town_amalgam');
    if (dc.includes('claw') || dc.includes('huyết thanh') || dc.includes('c corp')) unlock('executed_by_claw');
  }
}

export const WING_RANKS = [
  { rank: 0, titleVi: 'Nhân viên tập sự (Contract Intern)', titleEn: 'Contract Intern', merit: 0, wealth: 0, network: 0 },
  { rank: 1, titleVi: 'Feather chính thức (Feather Agent)', titleEn: 'Feather Agent', merit: 25, wealth: 18, network: 14 },
  { rank: 2, titleVi: 'Trưởng phòng ban (Section Chief)', titleEn: 'Section Chief', merit: 65, wealth: 45, network: 32 },
  { rank: 3, titleVi: 'Giám đốc cấp cao (Senior Executive)', titleEn: 'Senior Executive', merit: 125, wealth: 85, network: 60 }
];

/**
 * Calculates the player's active career milestone and required checklist objectives.
 * Fixer thresholds are read from careerPipeline, the same table that gates the exams.
 */
export function getNextCareerMilestone(char) {
  if (!char || !char.alive) {
    return {
      category: 'MEMORIAL',
      titleVi: 'Kiếp sống đã khép lại',
      titleEn: 'Life Concluded',
      progressPct: 100,
      requirements: [],
      tipVi: 'Xem bia ký tưởng niệm và ghi chép gia phả.',
      tipEn: 'Review the epitaph and legacy records.'
    };
  }

  // 1. Childhood, until the character has a livelihood
  if (char.job === 'Child') {
    if (char.age < 7) {
      const curAge = char.age;
      const targetAge = 7;
      const curHp = char.stats?.health ?? char.health ?? 0;
      const targetHp = 30;
      const curSp = char.stats?.sanity ?? char.sanity ?? 0;
      const targetSp = 30;

      const p1 = Math.min(100, (curAge / targetAge) * 100);
      const p2 = Math.min(100, (curHp / targetHp) * 100);
      const p3 = Math.min(100, (curSp / targetSp) * 100);
      const progressPct = Math.round((p1 + p2 + p3) / 3);

      return {
        category: 'CHILDHOOD SURVIVAL',
        titleVi: 'Sinh tồn thơ ấu tại The City',
        titleEn: 'Childhood Survival in The City',
        progressPct,
        requirements: [
          { labelVi: 'Đạt tuổi 7', labelEn: 'Reach Age 7', current: curAge, target: targetAge, met: curAge >= targetAge, sources: ['Sống qua từng năm'] },
          { labelVi: 'Sinh lực an toàn (HP)', labelEn: 'Safe Health (HP)', current: curHp, target: targetHp, met: curHp >= targetHp, sources: ['Phòng khám khu phố', 'Dinh dưỡng cơ bản'] },
          { labelVi: 'Tỉnh táo an toàn (SP)', labelEn: 'Safe Sanity (SP)', current: curSp, target: targetSp, met: curSp >= targetSp, sources: ['Nghỉ ngơi', 'Gia đình bảo bọc'] }
        ],
        tipVi: 'Bảo toàn mạng sống và giữ tâm trí ổn định trước những nguy hiểm đầu đời.',
        tipEn: 'Stay alive and keep your mind sound amidst early city perils.'
      };
    }

    if (char.age < 14) {
      const curAge = char.age;
      const targetAge = 14;
      const curNet = char.stats?.network ?? char.network ?? 0;
      const targetNet = 15;
      const activeNpcs = Object.values(char.npcs || {}).filter(npcIsActive).length;
      const targetNpcs = 1;

      const p1 = Math.min(100, (curAge / targetAge) * 100);
      const p2 = Math.min(100, (curNet / targetNet) * 100);
      const p3 = activeNpcs >= 1 ? 100 : 0;
      const progressPct = Math.round((p1 + p2 + p3) / 3);

      return {
        category: 'STREET APPRENTICESHIP',
        titleVi: 'Xây dựng quan hệ & Nền tảng đường phố',
        titleEn: 'Street Aptitude & Bonds',
        progressPct,
        requirements: [
          { labelVi: 'Đạt tuổi 14', labelEn: 'Reach Age 14', current: curAge, target: targetAge, met: curAge >= targetAge, sources: ['Sống qua từng năm'] },
          { labelVi: 'Mối quan hệ (Network)', labelEn: 'Network', current: curNet, target: targetNet, met: curNet >= targetNet, sources: ['Gặp gỡ Backstreets', 'Kết thân đồng trang lứa'] },
          { labelVi: 'Bạn bè / Người thân đồng hành', labelEn: 'Companions', current: activeNpcs, target: targetNpcs, met: activeNpcs >= targetNpcs, sources: ['Tương tác NPC', 'Biến cố đường phố'] }
        ],
        tipVi: 'Kết thân với bạn bè hoặc người thầy, học hỏi quy tắc sinh tồn ở Backstreets hoặc Nest.',
        tipEn: 'Befriend companions or mentors, learning the survival codes of the City.'
      };
    }

    // From 14 until the first livelihood: preparing for the career crossroads
    const curAge = char.age;
    const targetAge = careerAgeOf(char);
    const curMerit = char.merit || 0;
    const curWealth = char.stats?.wealth ?? char.wealth ?? 0;
    const curRep = char.stats?.rep ?? char.rep ?? 0;

    const pAge = Math.min(100, (curAge / targetAge) * 100);
    const pStat = Math.min(100, Math.max((curMerit / 8) * 100, (curWealth / 12) * 100, (curRep / 10) * 100));
    const progressPct = Math.round((pAge * 0.6) + (pStat * 0.4));

    return {
      category: 'CAREER CROSSROADS',
      titleVi: `Chuẩn bị bước ngoặt cuộc đời (Tuổi ${targetAge})`,
      titleEn: `Preparation for the Career Crossroads (Age ${targetAge})`,
      progressPct,
      requirements: [
        { labelVi: `Đến tuổi phải tự kiếm sống (${targetAge})`, labelEn: `Reach working age (${targetAge})`, current: curAge, target: targetAge, met: curAge >= targetAge, sources: ['Trưởng thành theo năm tháng'] },
        { labelVi: 'Tích lũy nền tảng (Merit, Ahn hoặc Rep)', labelEn: 'Merit, Ahn or Rep', current: Math.max(curMerit, curWealth, curRep), target: 10, met: Math.max(curMerit, curWealth, curRep) >= 10, sources: ['Học việc đường phố', 'Làm thuê thời vụ', 'Bảo vệ khu phố'] }
      ],
      tipVi: `Đến tuổi ${targetAge}, bạn phải chọn nơi kiếm sống: Fixer, Syndicate hay Wing.`,
      tipEn: `At ${targetAge} you must choose how you earn a living: Fixer, Syndicate or Wing.`
    };
  }

  // 2. Fixer Career / Color Fixer
  if (char.job === 'Fixer' || char.job === 'Color Fixer') {
    if (char.fixerGrade === 0 || char.job === 'Color Fixer' || char.flags.includes('ColorFixer')) {
      const targetMerit = 250;
      const targetRep = 90;
      const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
      const p2 = Math.min(100, (((char.stats?.rep ?? char.rep) || 0) / targetRep) * 100);
      const progressPct = Math.round((p1 + p2) / 2);

      return {
        category: 'COLOR FIXER ASCENSION',
        titleVi: 'Huyền thoại The City (City Legend)',
        titleEn: 'Sovereign Legend of The City',
        progressPct,
        requirements: [
          { labelVi: 'Chiến công tối thượng (Merit)', labelEn: 'Merit', current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Hợp đồng Star of the City', 'Nhiệm vụ đặc biệt Hana', 'Săn Abnormality cấp cao'] },
          { labelVi: 'Danh tiếng vang dội (Rep)', labelEn: 'Reputation', current: (char.stats?.rep ?? char.rep) || 0, target: targetRep, met: ((char.stats?.rep ?? char.rep) || 0) >= targetRep, sources: ['Uy danh The City', 'Nhiệm vụ chấn động'] }
        ],
        tipVi: 'Bạn là một Color. Tên tuổi bạn sánh ngang Red Mist hay Black Silence, ghi dấu vào lịch sử.',
        tipEn: 'You are a Color. Your name stands alongside the Red Mist and Black Silence.'
      };
    }

    const isProdigy = isColorProdigyEligible(char);
    if (char.fixerGrade === 1 || isProdigy) {
      const readiness = checkColorFixerReadiness(char);
      const targetMerit = readiness.targetMerit;
      const targetRep = readiness.targetRep;
      const curRep = (char.stats?.rep ?? char.rep) || 0;
      const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
      const p2 = Math.min(100, (curRep / targetRep) * 100);
      const progressPct = Math.round((p1 + p2) / 2);

      if (isProdigy) {
        return {
          category: 'STAR OF THE CITY ORDEAL',
          titleVi: 'Đại Khảo Thí Phong Color (Hana Đặc Cách Thần Đồng)',
          titleEn: 'Hana Star of the City: Prodigy Color Investiture',
          progressPct,
          requirements: [
            { labelVi: `Chiến công thần đồng (Merit >= ${targetMerit})`, labelEn: `Prodigy Merit (>= ${targetMerit})`, current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Hợp đồng đặc biệt', 'Chinh phục Dungeon', 'Tiêu diệt mối họa cấp cao'] },
            { labelVi: `Danh tiếng vượt bậc (Rep >= ${targetRep})`, labelEn: `Prodigy Rep (>= ${targetRep})`, current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Uy danh The City', 'Nhiệm vụ chấn động'] },
            { labelVi: `Tuổi xét hồ sơ thần đồng (>= ${readiness.targetAge || 26})`, labelEn: `Prodigy Age Review (>= ${readiness.targetAge || 26})`, current: char.age, target: readiness.targetAge || 26, met: char.age >= (readiness.targetAge || 26), sources: ['Tuổi từ 26 đến 34 kèm kỳ tích'] }
          ],
          tipVi: `Bạn đạt chuẩn Thần Đồng Đặc Cách (Fixer Grade ${char.fixerGrade} xuất chúng). Hana Association sẵn sàng mở đại khảo thí phong Color mà không cần thăng từng bậc!`,
          tipEn: `You qualify for the Hana Prodigy Fast-Track (Grade ${char.fixerGrade} prodigy). Hana will convene the Color Investiture directly without climbing grade by grade!`
        };
      }

      return {
        category: 'STAR OF THE CITY ORDEAL',
        titleVi: 'Đại Khảo Thí Phong Color (Hana Council)',
        titleEn: 'Hana Star of the City: Color Investiture',
        progressPct,
        requirements: [
          { labelVi: `Chiến công (Merit >= ${targetMerit})`, labelEn: `Merit (>= ${targetMerit})`, current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Đại hợp đồng Star of the City', 'Khủng hoảng Hiệp hội cấp cao', 'Chinh phục Dungeon'] },
          { labelVi: `Danh tiếng (Rep >= ${targetRep})`, labelEn: `Reputation (>= ${targetRep})`, current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Ủy thác Association', 'Tiêu diệt mối họa cấp cao'] },
          { labelVi: 'Tuổi để Hana xét hồ sơ', labelEn: 'Age for Hana review', current: char.age, target: readiness.targetAge, met: char.age >= readiness.targetAge, sources: ['Năm tháng rèn giũa (Thức tỉnh E.G.O để xét sớm)'] }
        ],
        tipVi: char.flags.includes('EGOAwakened')
          ? 'E.G.O của bạn khiến Hana xét hồ sơ sớm hơn và với ngưỡng thấp hơn. Bài khảo thí vẫn là bài khảo thí: bạn có thể trượt.'
          : 'Đủ Merit và Rep thì Hana Association triệu tập đại khảo thí phong Color. E.G.O không bắt buộc, nhưng người mang E.G.O được xét sớm hơn.',
        tipEn: char.flags.includes('EGOAwakened')
          ? 'Your E.G.O makes Hana review your file earlier and at lower thresholds. The trial is still a trial: you can fail it.'
          : 'With enough Merit and Rep, Hana Association convenes the Color Investiture trial. E.G.O is not required, but wielders are reviewed sooner.'
      };
    }

    const targetThreshold = FIXER_LADDER.find((step) => step.grade === char.fixerGrade - 1) || FIXER_LADDER[0];
    const targetMerit = targetThreshold.meritReq;
    const targetRep = targetThreshold.repReq;
    const curRep = (char.stats?.rep ?? char.rep) || 0;
    const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
    const p2 = Math.min(100, (curRep / targetRep) * 100);
    const progressPct = Math.round((p1 + p2) / 2);

    return {
      category: 'HANA EVALUATION',
      titleVi: `Thăng cấp: Fixer Grade ${targetThreshold.grade}`,
      titleEn: `Promotion: Grade ${targetThreshold.grade} Fixer`,
      progressPct,
      requirements: [
        { labelVi: 'Chiến công (Merit)', labelEn: 'Merit', current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Hợp đồng Fixer thường niên', 'Ủy thác Hiệp hội', 'Chiến đấu hẻm tối', 'Dungeon Delve'] },
        { labelVi: 'Danh tiếng (Rep)', labelEn: 'Reputation', current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Hoàn tất hợp đồng xuất sắc', 'Sự kiện khu vực'] }
      ],
      tipVi: char.flags.includes('EGOAwakened') && char.fixerGrade >= 3
        ? 'Có E.G.O, bạn đủ điều kiện để Hana mở một bài tái định hạng đặc biệt nhảy hai bậc, sau khi đã đủ Merit và Rep cho bậc kế tiếp. Bài này khó hơn bài thường và vẫn có thể thất bại.'
        : 'Nhận hợp đồng Fixer, giải quyết ủy thác từ Association hoặc can thiệp bạo lực để tích lũy Merit và Rep.',
      tipEn: char.flags.includes('EGOAwakened') && char.fixerGrade >= 3
        ? 'With an E.G.O, Hana can open a special re-rating that skips two bands, once you have the Merit and Rep for the next one. It is harder than the ordinary exam and can still be failed.'
        : 'Accept Fixer contracts, resolve Association requests, or survive clashes to earn Merit and Rep.'
    };
  }

  // 3. Syndicate Career
  if (char.job === 'Syndicate') {
    if (!char.finger) {
      const isIndependent = char.flags?.includes('IndependentSyndicate');
      const rank = char.syndicateRank || 0;
      const INDIE_RANKS = [
        { vi: 'Kẻ bảo kê đường phố', en: 'Street Enforcer' },
        { vi: 'Đầu gấu khu phố', en: 'Turf Lieutenant' },
        { vi: 'Đại ca băng đảng tự do', en: 'Independent Syndicate Boss' },
        { vi: 'Bá chủ ngõ tối', en: 'Underground Kingpin' }
      ];
      const curTitle = INDIE_RANKS[Math.min(rank, INDIE_RANKS.length - 1)];
      const nextRank = rank + 1;
      if (nextRank >= INDIE_RANKS.length) {
        return {
          category: 'INDEPENDENT SYNDICATE HEGEMONY',
          titleVi: `Bá chủ hẻm tối: ${curTitle.vi}`,
          titleEn: `Alley Hegemony: ${curTitle.en}`,
          progressPct: 100,
          requirements: [
            { labelVi: 'Chiến công Backstreets', labelEn: 'Street Merit', current: char.merit || 0, target: 80, met: true, sources: ['Bảo vệ địa bàn', 'Chiến tranh băng đảng'] }
          ],
          tipVi: 'Băng đảng của bạn kiểm soát hoàn toàn khu vực ngầm mà không cần cúi đầu trước bất kỳ Ngón Tay nào.',
          tipEn: 'Your syndicate firmly commands the underground turf without bowing to any Finger.'
        };
      }
      const nextTitle = INDIE_RANKS[nextRank];
      const targetMerit = [0, 20, 50, 90][nextRank];
      const targetRep = [0, 20, 45, 75][nextRank];
      const targetHeat = [0, 15, 30, 50][nextRank];
      const curMerit = char.merit || 0;
      const curRep = char.stats?.rep || 0;
      const curHeat = char.heat || 0;
      const meritPct = Math.min(100, (curMerit / targetMerit) * 100);
      const repPct = Math.min(100, (curRep / targetRep) * 100);
      const heatPct = Math.min(100, (curHeat / targetHeat) * 100);
      const progressPct = Math.round((meritPct + repPct + heatPct) / 3);

      return {
        category: isIndependent ? 'INDEPENDENT SYNDICATE' : 'LOCAL STREET SYNDICATE',
        titleVi: `Vị thế: ${nextTitle.vi}`,
        titleEn: `Station: ${nextTitle.en}`,
        progressPct,
        requirements: [
          { labelVi: 'Chiến công Backstreets', labelEn: 'Street Merit', current: curMerit, target: targetMerit, met: curMerit >= targetMerit, sources: ['Đòi nợ ngầm', 'Hỗn chiến bảo kê'] },
          { labelVi: 'Danh tiếng hẻm tối', labelEn: 'Street Rep', current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Thanh toán đối thủ', 'Mở rộng địa bàn'] },
          { labelVi: 'Độ khét tiếng (Heat)', labelEn: 'Street Heat', current: curHeat, target: targetHeat, met: curHeat >= targetHeat, sources: ['Đụng độ gác đêm', 'Chống lại áp lực thâu tóm'] }
        ],
        tipVi: isIndependent
          ? 'Băng đảng độc lập tự chủ địa bàn, không đóng thuế cho Finger nhưng phải tự chịu áp lực truy quét và thanh trừng.'
          : 'Băng nhóm đường phố địa phương. Khi danh tiếng và chiến công đủ lớn, các đại tổ chức sẽ gửi tối hậu thư.',
        tipEn: isIndependent
          ? 'An independent crew holds its own turf, paying no tribute to Fingers but facing constant raids and assimilation pressure.'
          : 'A local street crew. When your reputation and merit grow enough, major syndicates will send an ultimatum.'
      };
    }

    const finger = char.finger;
    const ladder = FINGER_RANKS[finger] || FINGER_RANKS.Thumb;
    const currentRank = char.fingerRank || 0;

    if (currentRank >= ladder.length - 1) {
      return {
        category: `THE ${finger.toUpperCase()} SOVEREIGNTY`,
        titleVi: `Đỉnh cao quyền lực: ${ladder[currentRank]}`,
        titleEn: `Peak Authority: ${ladder[currentRank]}`,
        progressPct: 100,
        requirements: [
          { labelVi: 'Chiến công (Merit)', labelEn: 'Merit', current: char.merit || 0, target: FINGER_LADDERS[finger]?.[2]?.meritReq || 115, met: true, sources: ['Mệnh lệnh Ngón', 'Thu hồi nợ máu'] }
        ],
        tipVi: 'Bạn đã là người đứng đầu một nhánh của Ngón. Mệnh lệnh của bạn là luật trong hẻm.',
        tipEn: 'You hold supreme authority within your Finger branch. Your word is alley law.'
      };
    }

    const nextRank = currentRank + 1;
    const nextTitle = ladder[nextRank];
    const minAge = [0, 22, 28, 36][nextRank];
    const minTenure = [0, 0, 4, 5][nextRank];
    const yearsInRank = currentRank === 0 || char.lastFingerPromotionAge == null ? minTenure : Math.max(0, char.age - char.lastFingerPromotionAge);
    const nextStep = FINGER_LADDERS[finger]?.[nextRank - 1];
    const targetMerit = nextStep?.meritReq || nextRank * 28;
    const targetRep = nextStep?.repReq || nextRank * 18;
    const targetNet = nextStep?.networkReq || 0;
    const curRep = (char.stats?.rep ?? char.rep) || 0;
    const curNet = (char.stats?.network ?? char.network) || 0;
    const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
    const p2 = Math.min(100, (curRep / targetRep) * 100);
    const pNet = targetNet > 0 ? Math.min(100, (curNet / targetNet) * 100) : 100;
    const p3 = minTenure > 0 ? Math.min(100, (yearsInRank / minTenure) * 100) : 100;
    const p4 = Math.min(100, (char.age / minAge) * 100);
    const progressPct = Math.round(Math.min((p1 + p2 + (targetNet > 0 ? pNet : p1)) / 3, p3, p4));

    return {
      category: `THE ${finger.toUpperCase()} TRIAL`,
      titleVi: `Thăng bậc: ${nextTitle}`,
      titleEn: `Syndicate Rank: ${nextTitle}`,
      progressPct,
      requirements: [
        { labelVi: 'Công trạng với Ngón (Merit)', labelEn: 'Syndicate Merit', current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Mệnh lệnh thanh trừng của Ngón', 'Thu hồi nợ máu', 'Apex Command Directives'] },
        { labelVi: 'Uy danh giang hồ (Rep)', labelEn: 'Reputation', current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Đàn áp đối thủ', 'Huyết chiến đường phố'] },
        ...(targetNet > 0 ? [{ labelVi: 'Mạng lưới chân rết (Network)', labelEn: 'Syndicate Network', current: curNet, target: targetNet, met: curNet >= targetNet, sources: ['Kết thân đàn em', 'Mở rộng cơ sở bảo kê'] }] : []),
        { labelVi: 'Tuổi tối thiểu', labelEn: 'Minimum age', current: char.age, target: minAge, met: char.age >= minAge, sources: ['Thâm niên sinh tồn trong hắc đạo'] },
        ...(currentRank > 0 && minTenure > 0 ? [{ labelVi: 'Năm giữ bậc hiện tại', labelEn: 'Years at current rank', current: yearsInRank, target: minTenure, met: yearsInRank >= minTenure, sources: ['Cống hiến qua các năm'] }] : [])
      ],
      tipVi: 'Thực thi mệnh lệnh của Ngón, thu hồi nợ máu và chứng minh lòng trung thành.',
      tipEn: 'Execute Finger orders, claim vengeance debts, and prove unquestioned loyalty.'
    };
  }

  // 4. Wing Employee Career
  if (char.job === 'Wing Employee') {
    const currentRank = char.wingRank || 0;
    const nextRank = Math.min(WING_RANKS.length - 1, currentRank + 1);
    const target = WING_RANKS[nextRank];

    if (currentRank >= WING_RANKS.length - 1) {
      return {
        category: 'WING EXECUTIVE',
        titleVi: 'Giám đốc cấp cao (Wing Executive)',
        titleEn: 'Senior Wing Executive',
        progressPct: 100,
        requirements: [],
        tipVi: 'Bạn ngồi trong ban điều hành Wing, nắm giữ bí mật Singularity.',
        tipEn: 'You sit on the executive board, guarding the secrets of the Singularity.'
      };
    }

    const curWealth = (char.stats?.wealth ?? char.wealth) || 0;
    const curNet = (char.stats?.network ?? char.network) || 0;
    const p1 = Math.min(100, ((char.merit || 0) / target.merit) * 100);
    const p2 = Math.min(100, (curWealth / target.wealth) * 100);
    const p3 = Math.min(100, (curNet / target.network) * 100);
    const yearsInRank = currentRank === 0 || char.lastWingPromotionAge == null ? 3 : Math.max(0, char.age - char.lastWingPromotionAge);
    const p4 = Math.min(100, (yearsInRank / 3) * 100);
    const progressPct = Math.round(Math.min(p1, p2, p3, p4));

    return {
      category: 'WING ADVANCEMENT',
      titleVi: `Thăng chức: ${target.titleVi}`,
      titleEn: `Promotion: ${target.titleEn}`,
      progressPct,
      requirements: [
        { labelVi: 'Hiệu suất công việc (Merit)', labelEn: 'Merit', current: char.merit || 0, target: target.merit, met: (char.merit || 0) >= target.merit, sources: ['Nghiên cứu dự án Singularity', 'Báo cáo hiệu suất', 'Apex Directive'] },
        { labelVi: 'Cổ phần & Ahn (Wealth)', labelEn: 'Wealth (Ahn)', current: curWealth, target: target.wealth, met: curWealth >= target.wealth, sources: ['Lương tập đoàn', 'Cổ phần nội bộ Wing'] },
        { labelVi: 'Mối quan hệ nội bộ (Network)', labelEn: 'Network', current: curNet, target: target.network, met: curNet >= target.network, sources: ['Quan hệ với cấp quản lý', 'Ngoại giao phòng ban'] },
        ...(currentRank > 0 ? [{ labelVi: 'Năm giữ chức hiện tại', labelEn: 'Years in current post', current: yearsInRank, target: 3, met: yearsInRank >= 3, sources: ['Thâm niên công tác'] }] : [])
      ],
      tipVi: 'Hoàn thành các dự án nghiên cứu của Wing, giữ quan hệ với ban quản trị và tích lũy Ahn.',
      tipEn: 'Deliver Wing research quotas, cultivate corporate ties, and amass Ahn.'
    };
  }

  // 5. Distortion Metamorphosis Milestone
  if (char.job === 'Distortion' || char.flags.includes('Distorted')) {
    const curRes = char.resonance || 0;
    const targetRes = 100;
    const curHp = char.stats?.health ?? char.health ?? 0;
    const targetHp = 80;
    const p1 = Math.min(100, (curRes / targetRes) * 100);
    const p2 = Math.min(100, (curHp / targetHp) * 100);
    const progressPct = Math.round((p1 + p2) / 2);
    const isApex = progressPct >= 100 || char.flags.includes('AbyssalDistortionApex');

    return {
      category: 'DISTORTION METAMORPHOSIS',
      titleVi: isApex ? 'Đỉnh Cao Dị Thường Vực Thẳm (Abyssal Apex Metamorphosed)' : 'Biến Dị Vực Thẳm (Distortion Metamorphosis)',
      titleEn: isApex ? 'Abyssal Apex Metamorphosis Achieved' : 'Abyssal Distortion Metamorphosis',
      progressPct: isApex ? 100 : progressPct,
      requirements: [
        {
          labelVi: 'Cộng hưởng Vực thẳm (Resonance >= 100)',
          labelEn: 'Abyssal Resonance (>= 100)',
          current: curRes,
          target: targetRes,
          met: curRes >= targetRes || isApex,
          sources: ['Tiếng gọi của Carmen', 'Giải phóng dục vọng bản ngã', 'Nghi thức bóng tối']
        },
        {
          labelVi: 'Thể xác Dị Thường cường hóa (HP >= 80)',
          labelEn: 'Reinforced Anomaly Flesh (HP >= 80)',
          current: curHp,
          target: targetHp,
          met: curHp >= targetHp || isApex,
          sources: ['Tái tạo tế bào dị thường (Tissue Regen)', 'Hấp thụ tinh hoa bóng đêm', 'Đè bẹp thợ săn']
        }
      ],
      tipVi: isApex
        ? 'Bản ngã của bạn đã hoàn tất biến dị tột cùng. Các thớ thịt và giác quan cổ xưa hoàn toàn hòa làm một với dục vọng, ban tặng nội lực tái sinh mô thịt (+4 HP/năm) và áp đảo mọi kẻ săn đuổi (+14 Sức mạnh chiến đấu).'
        : 'Bạn là một Distortion. Các mô thịt dị thường tự co bóp tái sinh hàng năm theo chỉ số Cộng hưởng. Vực thẳm không phục vụ The Head hay các Wing: bạn là bản ngã trần trụi nhất.',
      tipEn: isApex
        ? 'Your ego has achieved apex metamorphosis. Ancient sinews and senses are unified with pure desire, granting perpetual tissue regeneration (+4 HP/year) and overwhelming combat power (+14).'
        : 'You are a Distortion. Anomalous tissues pulsate and knit together each year based on Resonance. The abyss answers neither Head nor Wings: you are the rawest self.'
    };
  }

  if (char.job === 'Workshop Craftsman') {
    return {
      category: 'WORKSHOP',
      titleVi: 'Một ngày ở xưởng',
      titleEn: 'A Day at the Workshop',
      progressPct: 0,
      requirements: [],
      tipVi: 'Nhận đơn đặt hàng, giữ lò hoạt động và chọn người được cầm vũ khí bạn rèn.',
      tipEn: 'Take commissions, keep the forge running, and decide who receives your weapons.'
    };
  }

  // Fallback
  return {
    category: 'SURVIVAL',
    titleVi: 'Sống sót và khẳng định vị thế',
    titleEn: 'Survival & Renown',
    progressPct: Math.min(100, (char.merit || 0) * 2),
    requirements: [
      { labelVi: 'Chiến công (Merit)', labelEn: 'Merit', current: char.merit || 0, target: 50, met: (char.merit || 0) >= 50, sources: ['Hợp đồng Backstreets', 'Bảo vệ khu trọ'] }
    ],
    tipVi: 'Gia tăng tài nguyên và tạo dựng danh tiếng trong khu vực.',
    tipEn: 'Build your wealth and cement your reputation across the District.'
  };
}

/**
 * Returns character's E.G.O Awakening & Distortion psychological readiness horizon
 */
export function getEgoReadiness(char) {
  if (!char) return null;
  const flags = char.flags || [];
  if (flags.includes('EGOAwakened')) {
    return {
      status: 'awakened',
      progressPct: 100,
      labelVi: 'Đã Thức Tỉnh E.G.O Toàn Phần',
      labelEn: 'Fully Awakened E.G.O',
      descVi: 'Bản ngã của bạn đã kết tinh thành vũ khí và ý chí bất khuất, tỏa sáng giữa màn đêm The City.',
      descEn: 'Your ego has crystallized into unique armaments and resolve that cannot waver.',
      sourcesVi: ['Vũ khí và giáp trụ cá nhân đã thức tỉnh']
    };
  }
  if (char.job === 'Distortion' || flags.includes('Distorted')) {
    return {
      status: 'distorted',
      progressPct: 100,
      labelVi: 'Đã Biến Dị Thành Distortion',
      labelEn: 'Metamorphosed into Distortion',
      descVi: 'Bạn đã lắng nghe tiếng gọi ngọt ngào của Carmen và chấp nhận hình thái trần trụi nhất của dục vọng.',
      descEn: 'You embraced Carmen’s honeyed whispers and abandoned your humanity into pure form.',
      sourcesVi: ['Tái tạo tế bào dị thường', 'Tiếng gọi Carmen']
    };
  }
  const res = char.resonance || 0;
  const sanity = (char.stats?.sanity ?? char.sanity) || 0;
  const age = char.age || 0;

  // An unfinished E.G.O has its own second road; the first crossroad is not offered again
  if (flags.includes('IncompleteEGO')) {
    return {
      status: 'incomplete',
      progressPct: 80,
      resonance: res,
      sanity,
      labelVi: 'E.G.O Chưa Hoàn Chỉnh',
      labelEn: 'Incomplete E.G.O',
      descVi: 'Bản ngã đã thành hình nhưng còn vết rạn. Một cơn nguy biến về sau có thể cho bạn cơ hội hàn gắn nó, hoặc làm nó vỡ thành Distortion. Không có gì bảo đảm cơ hội ấy sẽ đến.',
      descEn: 'The ego took shape but still carries a fissure. A later crisis may let you mend it, or break it into Distortion. Nothing guarantees that chance will come.',
      sourcesVi: ['Sống sót qua nguy biến lớn', 'Giữ tâm trí đủ vững']
    };
  }
  if (char.seenEvents?.includes('ego_carmen_crossroad')) {
    return {
      status: 'crossroad_passed',
      progressPct: 100,
      resonance: res,
      sanity,
      labelVi: 'Đã Đi Qua Giao Lộ',
      labelEn: 'Crossroad Already Passed',
      descVi: 'Bạn đã đứng trước giao lộ của Carmen và rời đi mà không mang theo E.G.O. Giao lộ ấy không mở lại, nên tích thêm Resonance không gọi nó trở về.',
      descEn: 'You stood at Carmen’s crossroad and left without an E.G.O. It does not open again, so more Resonance will not call it back.',
      sourcesVi: []
    };
  }

  // Strict adulthood requirement for psychological crystallization
  if (age < 18) {
    return {
      status: 'dormant',
      progressPct: Math.min(50, Math.round((res / 74) * 50)),
      resonance: res,
      sanity,
      labelVi: 'Tâm Trí Trẻ Thơ (Chưa Đủ 18 Tuổi Để Thức Tỉnh E.G.O)',
      labelEn: 'Adolescent Mind (Must Reach Age 18 for E.G.O Awakening)',
      descVi: 'Bản ngã chỉ có thể kết tinh hoàn chỉnh khi đã trưởng thành (từ 18 tuổi). Hãy bảo toàn sinh mạng qua những năm tháng niên thiếu.',
      descEn: 'The ego can only fully crystallize in adulthood (from age 18). Preserve your life through your youth.',
      sourcesVi: ['Trưởng thành theo thời gian (Tuổi >= 18)', 'Tích lũy kinh nghiệm sinh tử']
    };
  }

  const scars = activeScarCount(char);
  // Real E.G.O mechanics matching awakeningProgress.js line 7:
  // Apex Resonance >= 74 OR (Resonance >= 62 && ((scars >= 1 && sanity <= 38) || (scars >= 2 && sanity <= 45)))
  const isCrisisEligible = res >= 62 && ((scars >= 1 && sanity <= 38) || (scars >= 2 && sanity <= 45));
  const isApexResonance = res >= 74;
  const isImminent = hasEgoOpportunity(char) || isApexResonance || isCrisisEligible;
  const isStirring = res >= 40;

  const targetRes = isCrisisEligible ? 62 : 74;
  const progressPct = isImminent
    ? 100
    : (isStirring ? Math.min(95, Math.round((res / targetRes) * 100)) : Math.round((res / 74) * 50));

  if (isImminent) {
    return {
      status: 'imminent',
      progressPct: Math.max(90, progressPct),
      resonance: res,
      sanity,
      labelVi: 'Giao Lộ Ngàn Cân Treo Sợi Tóc (E.G.O hoặc Distortion)',
      labelEn: 'Psychic Precipice: E.G.O or Distortion Crossroads',
      descVi: isCrisisEligible || sanity <= 38
        ? `Tâm trí rơi vào khủng hoảng (Sanity: ${sanity}, Resonance: ${res} với ${scars} vết sẹo). Giọng nói của Carmen đang thầm thì bên tai. Giữ vững niềm tin để thức tỉnh E.G.O, hoặc gục ngã thành Distortion.`
        : `Tần số Ánh Sáng đã đạt cực điểm (Resonance >= 74). Một bài khảo nghiệm tinh thần có thể xuất hiện bất cứ lúc nào để tôi luyện vũ khí bản ngã E.G.O.`,
      descEn: isCrisisEligible || sanity <= 38
        ? `Sanity has fractured under peak resonance with scars. Carmen whispers in your ear. Hold fast to awaken E.G.O, or surrender to Distortion.`
        : `Resonance has reached apex (>= 74). A mental crucible may manifest at any moment to forge your personal E.G.O weapon.`,
      sourcesVi: ['Vượt qua khủng hoảng tâm trí', 'Đối diện chấn thương quá khứ', 'Kiên định với nguyên tắc']
    };
  }

  if (isStirring) {
    return {
      status: 'stirring',
      progressPct,
      resonance: res,
      sanity,
      labelVi: 'Bản Ngã Bắt Đầu Dao Động (Resonance Đang Tăng)',
      labelEn: 'Ego Awakening Stirring (Resonance Rising)',
      descVi: `Tần số Ánh Sáng đang cộng hưởng trong máu thịt. Khi Resonance đạt 74 (hoặc 62 khi mang sẹo và gặp khủng hoảng tâm trí), cánh cửa E.G.O sẽ mở ra.`,
      descEn: `The Light echoes in your pulse. Once Resonance reaches 74 (or 62 with scars during a mental crisis), the E.G.O threshold opens.`,
      sourcesVi: ['Chiến đấu sinh tử', 'Chinh phục Dungeon Dị Thường', 'Khảo nghiệm số phận']
    };
  }

  return {
    status: 'dormant',
    progressPct,
    resonance: res,
    sanity,
    labelVi: 'Tâm Thức Bình Thường (Chưa Thức Tỉnh)',
    labelEn: 'Dormant Psychic Threshold',
    descVi: 'Chưa có dấu hiệu cộng hưởng bất thường với Ánh Sáng của The City.',
    descEn: 'No unusual psychic resonance with the City’s Light has manifested yet.',
    sourcesVi: ['Tiếp xúc với Abnormality', 'Chấn thương tâm lý', 'Nghi thức siêu nhiên']
  };
}

/**
 * Evaluates Fixer Grade / Syndicate Rank / Wing Rank promotions
 */
export function checkPromotions(char) {
  const logsToAdd = [];
  const curRep = (char.stats?.rep ?? char.rep) || 0;

  // Distortions never participate in human promotions
  if (char.flags.includes('Distorted')) return logsToAdd;

  if (char.job === 'Fixer') {
    const nextPromo = getNextFixerPromotion(char);
    if (nextPromo && nextPromo.isEligible && !char.flags.includes(`promo_ready_g${nextPromo.grade}`)) {
      char.flags.push(`promo_ready_g${nextPromo.grade}`);
      const offerChance = Math.round(fixerPromotionOfferChance(char, nextPromo) * 100);
      logsToAdd.push({
        id: `log_promo_ready_${char.age}_g${nextPromo.grade}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: `[Hana Association Thông Báo] Hồ sơ của bạn đủ ngưỡng dự tuyển Grade ${nextPromo.grade}. Mỗi năm, cơ hội được triệu tập hiện là ${offerChance}% và tăng khi điểm dư cao hơn. Nếu trượt hoặc hoãn mà vẫn đủ điều kiện, Hana sẽ gọi lại vào năm sau.`,
        en: `[Hana Association Notice] Your record qualifies for the Grade ${nextPromo.grade} candidate pool. Your current annual summons chance is ${offerChance}% and rises with surplus points. If you fail or defer and still qualify, Hana will call you back next year.`
      });
    }

    // Color Fixer Candidacy
    const colorCheck = checkColorFixerReadiness(char);
    if (colorCheck.ready && !char.flags.includes('ColorCandidate')) {
      char.flags.push('ColorCandidate');
      logsToAdd.push({
        id: `log_color_cand_${char.age}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: `[Hana Association] Hồ sơ của bạn đã đủ tiêu chuẩn để Hội đồng Tối cao triệu tập đại khảo thí Star of the City nhằm phong Color.`,
        en: `[Hana Association] Your achievements qualify you for the Supreme Council's Star of the City trial for a Color designation.`
      });
    }
  }

  // Syndicate / Five Fingers Rank Promotions: emit notifications when ready for next trial (Unblocked for Distorted)
  if ((char.job === 'Syndicate' || (char.flags.includes('Distorted') && char.finger)) && char.finger) {
    const nextPromo = getNextFingerPromotion(char);
    if (nextPromo && nextPromo.isEligible && !char.flags.includes(`finger_promo_ready_r${nextPromo.rank}`)) {
      char.flags.push(`finger_promo_ready_r${nextPromo.rank}`);
      logsToAdd.push({
        id: `log_finger_ready_${char.age}_r${nextPromo.rank}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: `[The ${char.finger} Thông Báo] Bạn đã tích lũy đủ công trạng và uy danh để bước vào đại lễ thăng bậc: ${nextPromo.titleVi}.`,
        en: `[The ${char.finger} Notice] Your merits and renown qualify you for the advancement trial: ${nextPromo.titleEn}.`
      });
    }
  }

  // Wing Employee Promotions: emit notifications when ready for next corporate appointment
  if (char.job === 'Wing Employee') {
    const nextPromo = getNextWingPromotion(char);
    if (nextPromo && nextPromo.isEligible && !char.flags.includes(`wing_promo_ready_r${nextPromo.rank}`)) {
      char.flags.push(`wing_promo_ready_r${nextPromo.rank}`);
      logsToAdd.push({
        id: `log_wing_ready_${char.age}_r${nextPromo.rank}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: `[Ban Giám Đốc Wing] Bạn đã đạt đủ chỉ tiêu hiệu suất và quan hệ để được xét duyệt thăng chức: ${nextPromo.titleVi}.`,
        en: `[Wing Directorate] You have fulfilled corporate quotas and are eligible for promotion: ${nextPromo.titleEn}.`
      });
    }
  }

  evaluateCharacterAchievements(char);
  return logsToAdd;
}

/**
 * Generates an interactive Fixer Contract with 3 tactical choices (Methodical, Bold, Seven Intel)
 */
export function generateFixerContract(char, rng, overrideTemplate = null) {
  const route = contractRouteOf(char) || 'fixer';
  // A Fixer's work comes by lane: an Association's own board, an Office's, or the open one
  const laneSet = route === 'fixer' ? laneContractSet(char) : null;
  const mods = route === 'fixer' ? laneContractMods(char, equivalentGrade(char, route)) : laneContractMods({}, 9);
  const cfg = laneSet ? laneSet.cfg : route === 'fixer' ? null : CONTRACT_ROUTES[route];
  const effGrade = equivalentGrade(char, route);
  let maxTier = 0;
  if (effGrade <= 1) maxTier = 5;
  else if (effGrade <= 3) maxTier = 4;
  else if (effGrade <= 5) maxTier = 3;
  else if (effGrade <= 7) maxTier = 2;
  else maxTier = 1;
  maxTier = Math.max(1, maxTier - mods.tierCap);

  const pool = laneSet ? laneSet.pool : cfg ? CAREER_REQUESTS[route] : FIXER_REQUESTS;
  const inBand = pool.filter(r => r.tier <= maxTier && r.tier >= Math.max(0, maxTier - 2));
  // A career should not hand out the same commission twice in a row
  const recent = new Set((char.contractLog || []).slice(-6));
  const fresh = inBand.filter((r) => !recent.has(r.id));
  const candidateReqs = fresh.length >= 2 ? fresh : inBand;
  const template = overrideTemplate || candidateReqs[Math.floor(rng() * candidateReqs.length)] || pool[0];
  const baseTier = THREAT_TIERS[template.tier] || THREAT_TIERS[0];
  const tierInfo = cfg ? { ...baseTier, nameVi: cfg.tiers[template.tier].nameVi, nameEn: cfg.tiers[template.tier].nameEn } : baseTier;

  // Specific stakes and danger scaling matching narrated peril
  const isHighStakes = Boolean(
    template.highDanger ||
    template.tier >= 3 ||
    (template.vi && /vòng vây|sát thủ|tử thủ|dị thể|thanh trừng|bắn tỉa|chợ đen|tử chiến|liều mạng/i.test(template.vi))
  );
  const stakePayBonus = template.payBonus ?? (isHighStakes ? Math.max(2, Math.round(tierInfo.basePay * 0.25)) : 0);
  const stakeMeritBonus = template.meritBonus ?? (isHighStakes ? Math.max(1, Math.round(tierInfo.baseMerit * 0.2)) : 0);
  const effectiveBasePay = tierInfo.basePay + stakePayBonus;
  const effectiveBaseMerit = tierInfo.baseMerit + stakeMeritBonus;
  const stakesTag = isHighStakes
    ? { vi: 'Nguy cơ cao · Thù lao bổng lộc', en: 'High Peril · Premium Pay' }
    : null;

  let power = 48 + (9 - effGrade) * 7.5;
  if (route === 'middle' || route === 'wing') power += ((char.stats.network ?? 40) - 40) * 0.12;
  if (route === 'thumb' || route === 'pinky') power += ((char.stats.health ?? 50) - 50) * 0.1;
  power += (char.stats.health - 50) * 0.25;
  power += (char.stats.sanity - 50) * 0.2;
  power += scarContractPower(char);
  const hasCombatGear = Boolean(
    char.craftWeapon ||
    (char.inventory || []).some((item) => item?.type === 'weapon' || item?.type === 'armor') ||
    hasColorSignatureWeapon(char) ||
    char.flags.includes('유물') ||
    char.flags.includes('CraftedColorWeapon')
  );
  if (hasCombatGear && (char.flags.includes('고급장비') || char.flags.includes('유물') || char.craftWeapon)) {
    power += 12;
  }
  // The Color commission and the engraved blade are carried into every contract after
  if (hasColorSignatureWeapon(char)) power += 16;
  power += getImbuedCombatBonus(char) * 0.6;
  if (char.flags.includes('EGOAwakened') || char.flags.includes('ShinAwakened')) power += 18;
  if (char.flags.includes('AbyssalDistortionApex')) power += 14;
  const compSupport = evaluateCompanionSupport(char);
  power += compSupport.contractPower;

  const difficulty = 32 + template.tier * 16;
  const baseSuccess = clamp(Math.round(55 + (power - difficulty) * 1.1 + egoEdge(char) * 100 + mods.successDelta), 18, 94);
  const pay = (base) => Math.max(1, Math.round(base * mods.payMult));
  const baseDeath = clamp(Math.round((100 - baseSuccess) * (0.12 + template.tier * 0.05)), 2, 42);
  const approachOdds = (successPct, wantedDeathPct) => {
    const deathPct = clamp(wantedDeathPct, 1, 100 - successPct);
    return { successPct, failPct: 100 - successPct - deathPct, deathPct };
  };

  return {
    id: `${template.id}_${char.age}`,
    combatPower: power,
    route,
    lane: laneSet?.lane || null,
    affId: laneSet?.affId || null,
    kickerVi: cfg?.kickerVi || null,
    kickerEn: cfg?.kickerEn || null,
    template,
    tierInfo,
    stakesTag,
    companionSupport: compSupport.active ? {
      role: compSupport.role,
      nameVi: compSupport.npc.nameVi,
      nameEn: compSupport.npc.nameEn,
      bond: compSupport.npc.bond ?? 22,
      stateId: compSupport.state.id,
      stateVi: compSupport.state.vi,
      stateEn: compSupport.state.en,
      powerDelta: compSupport.contractPower,
      betrayalRisk: compSupport.betrayalRisk
    } : null,
    approaches: [
      {
        id: 'careful',
        labelVi: cfg?.careful[0] || 'Làm chậm mà chắc',
        labelEn: cfg?.careful[1] || 'Slow and careful',
        ...approachOdds(clamp(baseSuccess + 8, 25, 96), Math.max(1, Math.round(baseDeath * 0.55))),
        payAhn: pay(effectiveBasePay),
        meritGain: effectiveBaseMerit,
        costAhn: 0
      },
      {
        id: 'bold',
        labelVi: cfg?.bold[0] || 'Xông vào, xong sớm (thêm 50% Ahn và Merit)',
        labelEn: cfg?.bold[1] || 'Go in hard, finish fast (50% more Ahn and Merit)',
        ...approachOdds(clamp(baseSuccess - 8, 15, 90), clamp(Math.round(baseDeath * 1.45), 4, 55)),
        payAhn: pay(effectiveBasePay * 1.5),
        meritGain: Math.round(effectiveBaseMerit * 1.5),
        costAhn: 0
      },
      {
        id: 'intel',
        labelVi: cfg?.intel[0] || 'Mua hồ sơ mục tiêu của Seven Association (8 Ahn)',
        labelEn: cfg?.intel[1] || 'Buy the target file from Seven Association (8 Ahn)',
        ...approachOdds(clamp(baseSuccess + 18, 35, 98), 1),
        payAhn: pay(effectiveBasePay),
        meritGain: effectiveBaseMerit + 3,
        costAhn: 8
      },
      {
        id: 'decline',
        labelVi: 'Trả lại ủy thác',
        labelEn: 'Return the contract',
        successPct: 0,
        failPct: 0,
        deathPct: 0,
        payAhn: 0,
        meritGain: 0,
        costAhn: 0,
        isDecline: true
      }
    ]
  };
}

/**
 * What a non-Fixer contract leaves behind besides Ahn and Merit: heat, nerves, a name that remembers you.
 * Only a finished job plants a memory and a delayed callback; a failed one just costs.
 */
function applyContractAftermath(char, cfg, template, ok) {
  if (!cfg) return;
  const fx = ok ? cfg.okFx : cfg.failFx;
  for (const [key, value] of Object.entries(fx || {})) {
    if (key === 'heat') char.heat = clamp((char.heat || 0) + value, 0, 100);
    else if (key === 'standing') char.standing = clamp((char.standing ?? 50) + value, 0, 100);
    else if (key === 'leverage') char.leverage = clamp((char.leverage || 0) + value, 0, 100);
    else char.stats[key] = clamp((char.stats[key] ?? 0) + value, 0, 100);
  }
  if (ok && template.mem && !(char.memory || []).some((m) => m.key === template.mem)) {
    char.memory = [...(char.memory || []), { key: template.mem, age: char.age }];
  }
  if (ok && template.later) {
    const l = template.later;
    char.weaver = {
      ...char.weaver,
      pendingThreads: [...(char.weaver?.pendingThreads || []), {
        id: `thr_${char.age}_${l.id}`,
        kind: 'minor',
        eventId: l.id,
        plantedAtAge: char.age,
        triggerAge: char.age + (l.years || 3),
        reasonVi: l.reasonVi,
        reasonEn: l.reasonEn,
        fulfilled: false
      }]
    };
  }
}

/**
 * Resolves the player's chosen tactical approach on a Fixer Contract
 */
export function resolveFixerContract(charState, approachId, rng = Math.random) {
  const char = cloneChar(charState);
  const contract = char.pendingContract;
  if (!contract) return char;

  const approach = contract.approaches.find(a => a.id === approachId);
  if (!approach || char.stats.wealth < approach.costAhn) return char;
  const { template, tierInfo } = contract;
  const fixerRoute = !contract.route || contract.route === 'fixer';
  const cfg = !fixerRoute ? CONTRACT_ROUTES[contract.route] : contract.affId ? laneContractSet(char)?.cfg || null : null;
  const appendStandingNote = (outcome) => {
    const note = fixerRoute && contract.affId ? noteAffiliationContract(char, outcome, template) : null;
    const last = char.logs[char.logs.length - 1];
    if (note && last) { last.vi += ` ${note.vi}`; last.en += ` ${note.en}`; }
  };
  const tagVi = cfg?.tagVi || 'Request';
  const tagEn = cfg?.tagEn || 'Request';
  char.pendingContract = null;
  char.contractLog = [...(char.contractLog || []), template.id].slice(-12);

  if (approach.costAhn > 0) {
    char.stats.wealth = clamp(char.stats.wealth - approach.costAhn, 0, 100);
  }

  if (approach.id === 'decline') {
    const isHanaDispatch = template.tier >= 3;
    if (isHanaDispatch) char.stats.rep = clamp(char.stats.rep - 2, 0, 100);
    char.logs.push({
      id: `log_req_decline_${char.age}`,
      age: char.age,
      season: SEASONS[char.seasonIdx || 0],
      type: 'story',
      vi: cfg
        ? `[Từ chối · ${tagVi}] ${cfg.declineVi}${isHanaDispatch ? ' Uy tín giảm 2.' : ''}`
        : `[Từ chối ủy thác] Bạn trả lại hồ sơ ${template.nameVi || ''} trước khi nhận việc.${isHanaDispatch ? ' Hana ghi nhận một lần từ chối điều động; uy tín giảm 2.' : ' Không có thù lao hay công trạng.'}`,
      en: cfg
        ? `[Declined · ${tagEn}] ${cfg.declineEn}${isHanaDispatch ? ' Reputation fell by 2.' : ''}`
        : `[Contract Declined] You returned the file for ${template.nameEn || 'this assignment'} before accepting it.${isHanaDispatch ? ' Hana recorded a refused dispatch; reputation fell by 2.' : ' There is no pay or merit.'}`
    });
    appendStandingNote('decline');
    char.weaver = updateDramaTension(char.weaver, char);
    return char;
  }

  const omenObj = FATE_OMENS.find((o) => o.id === char.fateOmenId);
  const meritMult = omenObj?.meritMult || 1.0;
  const compSupport = evaluateCompanionSupport(char);

  // Low-bond companion clash or mid-mission betrayal check
  if (compSupport.active && compSupport.betrayalRisk > 0 && rng() < compSupport.betrayalRisk) {
    const traitor = compSupport.npc;
    const role = compSupport.role;
    const isFullBetrayal = (traitor.bond ?? 20) < 18 || rng() < 0.45;
    if (isFullBetrayal) {
      applyNpcFate(char, role, 'betrayer', char.age);
      if (!char.npcs.nemesis) {
        char.npcs = { ...char.npcs, nemesis: { ...traitor, role: 'nemesis', status: 'alive', bond: 0, lastSeen: char.age } };
      }
      char.stats.health = clamp(char.stats.health - (14 + template.tier * 4), 0, 100);
      char.stats.sanity = clamp(char.stats.sanity - 14, 0, 100);
      char.heat = clamp((char.heat || 0) + 12, 0, 100);
      char.resonance = clamp((char.resonance || 0) + 12, 0, 100);
      rememberResonance(char, 12);
      if (!char.flags.includes('BetrayedByCompanion')) char.flags.push('BetrayedByCompanion');
      char.weaver.pendingThreads = [
        ...(char.weaver.pendingThreads || []),
        {
          id: `thr_${char.age}_csq_npc_betrayer_ambush`,
          kind: 'major',
          eventId: 'csq_npc_betrayer_ambush',
          plantedAtAge: char.age,
          triggerAge: char.age + 3,
          reasonVi: `${traitor.nameVi} đã bán đứng bạn và vẫn còn ở ngoài kia`,
          reasonEn: `${traitor.nameEn} sold you out and is still out there`,
          fulfilled: false
        }
      ];
      char.logs.push({
        id: `log_req_betrayal_${char.age}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'danger',
        vi: `[Phản bội giữa nhiệm vụ · ${traitor.nameVi}] Giữa lúc giao chiến trong vụ ${template.nameVi || tierInfo.nameVi}, ${traitor.nameVi} đã bán lộ trình của bạn cho đối phương để lấy tiền thưởng, rồi bỏ mặc bạn giữa vòng vây.`,
        en: `[Mid-Contract Betrayal · ${traitor.nameEn}] In the middle of ${template.nameEn || tierInfo.nameEn}, ${traitor.nameEn} sold your route to the enemy for a payout and left you surrounded.`
      });
      if (char.stats.health <= 0) {
        applyFatalOrCompanionSave(char, template.deathVi, template.deathEn);
      }
      char.weaver = updateDramaTension(char.weaver, char);
      return char;
    } else {
      // Insubordination / clash during contract reduces successPct by 18% and costs HP/SP
      char.stats.health = clamp(char.stats.health - 5, 0, 100);
      char.stats.sanity = clamp(char.stats.sanity - 5, 0, 100);
      char.npcs = { ...char.npcs, [role]: { ...traitor, bond: Math.max(5, (traitor.bond || 20) - 4), lastSeen: char.age } };
      char.logs.push({
        id: `log_req_clash_${char.age}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'danger',
        vi: `[Xô xát nội bộ · ${traitor.nameVi}] Mối quan hệ rạn nứt khiến bạn và ${traitor.nameVi} cãi vã ngay trước giờ hành động, làm lộ vị trí và giảm mạnh tỉ lệ thành công.`,
        en: `[Internal Clash · ${traitor.nameEn}] Strained trust led to a bitter argument with ${traitor.nameEn} right before the strike, exposing your position and hurting your odds.`
      });
    }
  }

  const roll = rng() * 100;
  if (roll < approach.successPct) {
    const completed = char.contractRecord || { fixer: 0, wing: 0, independent: 0, fingers: {}, highestFixerTier: 0 };
    const route = contractRouteOf(char);
    char.contractRecord = {
      ...completed,
      fixer: (completed.fixer || 0) + (route === 'fixer' ? 1 : 0),
      wing: (completed.wing || 0) + (route === 'wing' ? 1 : 0),
      independent: (completed.independent || 0) + (route === 'independent_syndicate' ? 1 : 0),
      fingers: ['thumb', 'index', 'middle', 'ring', 'pinky'].includes(route) && char.finger
        ? { ...(completed.fingers || {}), [char.finger]: ((completed.fingers || {})[char.finger] || 0) + 1 }
        : { ...(completed.fingers || {}) },
      highestFixerTier: route === 'fixer' ? Math.max(completed.highestFixerTier || 0, template.tier || 0) : (completed.highestFixerTier || 0)
    };
    if (char.stats.health <= 25 && !char.unlockedRecords.includes('shi_boundary_of_death')) {
      char.unlockedRecords.push('shi_boundary_of_death');
    }
    // Near the top the Requests that matter are few; a Grade 1 or 2 Fixer is paid in Merit like it
    const topGradeMult = fixerRoute && (char.fixerGrade ?? 9) <= 2 ? 1.25 : 1;
    const gainedMerit = Math.round(approach.meritGain * meritMult * topGradeMult);
    char.stats.wealth = clamp(char.stats.wealth + approach.payAhn, 0, 100);
    char.stats.rep = clamp(char.stats.rep + reputationGain(char.stats.rep, Math.max(2, template.tier + 2)), 0, 100);
    char.merit += gainedMerit;
    if (compSupport.active && compSupport.state.id === 'sworn' && rng() < 0.45) {
      char.npcs = { ...char.npcs, [compSupport.role]: { ...compSupport.npc, bond: Math.min(100, (compSupport.npc.bond || 80) + 2), lastSeen: char.age } };
    }
    const assistNoteVi = compSupport.active && compSupport.contractPower >= 8
      ? ` Sự phối hợp ăn ý của ${compSupport.npc.nameVi} giúp bạn kết thúc gọn gàng.`
      : '';
    const assistNoteEn = compSupport.active && compSupport.contractPower >= 8
      ? ` ${compSupport.npc.nameEn}’s tight coordination made the finish clean.`
      : '';
    char.logs.push({
      id: `log_req_ok_${char.age}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'choice',
      vi: `[${cfg ? tagVi : 'Request hoàn thành'} · ${tierInfo.nameVi}] ${template.okVi}${assistNoteVi}`,
      en: `[${cfg ? tagEn : 'Request completed'} · ${tierInfo.nameEn}] ${template.okEn}${assistNoteEn}`
    });
    applyContractAftermath(char, cfg, template, true);
    appendStandingNote('ok');
  } else if (roll < approach.successPct + approach.failPct) {
    const isHighStakes = Boolean(contract.stakesTag);
    const hpLoss = (10 + template.tier * 5) + (isHighStakes ? 4 : 0);
    const spLoss = (6 + template.tier * 3) + (isHighStakes ? 3 : 0);
    char.stats.health = clamp(char.stats.health - hpLoss, 0, 100);
    char.stats.sanity = clamp(char.stats.sanity - spLoss, 0, 100);
    char.resonance = clamp((char.resonance || 0) + 8, 0, 100);
      rememberResonance(char, 8);
    if (compSupport.active && compSupport.contractPower < 0) {
      char.npcs = { ...char.npcs, [compSupport.role]: { ...compSupport.npc, bond: Math.max(5, (compSupport.npc.bond || 20) - 3), lastSeen: char.age } };
    }
    const frictionNoteVi = compSupport.active && compSupport.contractPower < 0
      ? ` Sự thiếu ăn ý và bất đồng với ${compSupport.npc.nameVi} khiến bạn trả giá đắt.`
      : '';
    const frictionNoteEn = compSupport.active && compSupport.contractPower < 0
      ? ` Friction and hesitation with ${compSupport.npc.nameEn} cost you dearly.`
      : '';

    char.logs.push({
      id: `log_req_fail_${char.age}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'danger',
      vi: `[${cfg ? `${tagVi} thất bại` : 'Request thất bại'} · ${tierInfo.nameVi}] ${template.failVi}${frictionNoteVi}`,
      en: `[${cfg ? `${tagEn} failed` : 'Request failed'} · ${tierInfo.nameEn}] ${template.failEn}${frictionNoteEn}`
    });
    applyContractAftermath(char, cfg, template, false);
    appendStandingNote('fail');

    if (char.stats.health <= 0) {
      applyFatalOrCompanionSave(char, template.deathVi, template.deathEn);
    }
  } else {
    applyFatalOrCompanionSave(char, template.deathVi, template.deathEn);
  }

  const promoLogs = checkPromotions(char);
  char.logs.push(...promoLogs);
  char.weaver = updateDramaTension(char.weaver, char);
  return char;
}

/**
 * Checks if a high-bond Partner or Spouse intercepts a fatal blow (Death Save Mechanic)
 */
/** A Distortion does not just die of its wounds; someone was sent to make sure. */
export function woundDeath(char, vi, en) {
  if (!char.flags.includes('Distorted')) return [vi, en];
  return [
    'Bị một đội Fixer do Hana cử tới xử lý như một Distortion. Hồ sơ của bạn được đóng lại trong cùng ngày',
    'Put down as a Distortion by a Fixer team Hana sent. Your file was closed the same day'
  ];
}

export function applyFatalOrCompanionSave(char, deathCauseVi, deathCauseEn) {
  if (tryItemAutoRevive(char)) {
    char.logs.push({
      id: `log_ampoule_revive_${char.age}_${Date.now()}`,
      age: char.age,
      season: SEASONS[char.seasonIdx || 0],
      type: 'miracle',
      vi: '[Ống Tiêm K Corp Tự Động Kích Hoạt] Khi tim bạn vừa ngừng đập, dung dịch sinh học màu xanh lá của K Corp tự động bơm thẳng vào động mạch chủ. Thịt và xương gãy liền lại trong cơn đau mà bạn không muốn nhớ. Vết thương lẽ ra đã giết bạn.',
      en: '[K Corp Ampoule Auto-Activated] As your heart flatlined, green K Corp biomass auto-injected into your aorta. Flesh and broken bone knit together in a pain you would rather not remember. The wound should have killed you.'
    });
    evaluateCharacterAchievements(char);
    return;
  }

  // Companion Sacrifice (Death Save): Strictly ONCE per lifetime, requires supreme Bond (>= 90)
  const saviorKey = !char.usedDeathSave
    ? ['spouse', 'partner', 'friend', 'mentor'].find(
        k => char.npcs?.[k] &&
             !char.npcs[k].deceased &&
             char.npcs[k].status === 'alive' &&
             (char.npcs[k].bond || 0) >= (['spouse', 'partner'].includes(k) ? 90 : 95)
      )
    : null;

  if (saviorKey) {
    char.usedDeathSave = true; // Exceeded lifetime quota - no infinite lives!
    const savior = char.npcs[saviorKey];
    char.npcs[saviorKey] = { ...savior, deceased: true, status: 'dead', fateAge: char.age };
    if (saviorKey === 'spouse') {
      char.flags = char.flags.filter(f => f !== 'Married');
      if (!char.flags.includes('Widowed')) char.flags.push('Widowed');
    } else if (saviorKey === 'partner') {
      if (!char.flags.includes('PartnerLost')) char.flags.push('PartnerLost');
    } else if (saviorKey === 'friend') {
      if (!char.flags.includes('FriendLost')) char.flags.push('FriendLost');
    } else if (saviorKey === 'mentor') {
      if (!char.flags.includes('MentorLost')) char.flags.push('MentorLost');
    }
    char.stats.health = 20;
    char.stats.sanity = clamp(char.stats.sanity - 45, 1, 100);
    char.resonance = clamp((char.resonance || 0) + 40, 0, 100);
      rememberResonance(char, 40);
    if (!char.unlockedRecords.includes('savior_sacrifice')) {
      char.unlockedRecords.push('savior_sacrifice');
    }
    const scarName = `${savior.nameVi} đã chết thay bạn`;
    addScar(char, scarName);
    char.logs.push({
      id: `log_savior_${char.age}_${saviorKey}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'miracle',
      vi: `[${savior.nameVi}] Đòn đó lẽ ra đã giết bạn. ${savior.nameVi} bước vào giữa, và nhận trọn nhát chém thay bạn. Người ấy chết trong tay bạn, máu tuôn xối xả mà bạn không thể làm gì để cứu vãn.`,
      en: `[${savior.nameEn}] That blow should have killed you. ${savior.nameEn} stepped between, taking the fatal strike instead. They died in your trembling arms amidst pooling gore.`
    });
    evaluateCharacterAchievements(char);
    return;
  }

  char.alive = false;
  char.stats.health = 0;
  char.deathCauseVi = deathCauseVi || 'Chết ở The City, như rất nhiều người khác';
  char.deathCauseEn = deathCauseEn || 'Died in the City, like so many others';
  char.logs.push({
    id: `log_death_${char.age}`,
    age: char.age,
    season: SEASONS[char.seasonIdx],
    type: 'death',
    vi: `${char.deathCauseVi}.`,
    en: `${char.deathCauseEn}.`
  });
  evaluateCharacterAchievements(char);
}

/** Closes the chronicle without a death: no ampoule or companion can step in, and the epitaph tells why. */
export function closeLifeByChoice(char, lifeEnding, causeVi, causeEn) {
  char.alive = false;
  char.lifeEnding = lifeEnding || 'retired';
  char.deathCauseVi = causeVi || 'Rời khỏi câu chuyện theo ý mình';
  char.deathCauseEn = causeEn || 'Left the story on their own terms';
  const ending = LIFE_ENDINGS[char.lifeEnding];
  char.logs.push({
    id: `ending_${char.lifeEnding}_${char.age}`,
    age: char.age,
    season: SEASONS[char.seasonIdx || 0],
    type: 'major',
    vi: `[${ending?.titleVi || 'Kết thúc'}] ${char.deathCauseVi}.`,
    en: `[${ending?.titleEn || 'An ending'}] ${char.deathCauseEn}.`
  });
  evaluateCharacterAchievements(char);
}

export function handleSanityBreakdown(char, rng = Math.random) {
  if (!char.alive || char.stats.sanity > 0) return;
  if (char.flags.includes('Distorted') || char.flags.includes('EGOAwakened')) return;

  // Mental Anchor Save: Strictly ONCE per lifetime, requires Bond >= 85
  const saviorKey = !char.usedSanitySave
    ? ['spouse', 'partner', 'friend', 'mentor'].find(
        k => char.npcs?.[k] &&
             !char.npcs[k].deceased &&
             char.npcs[k].status === 'alive' &&
             (char.npcs[k].bond || 0) >= 85
      )
    : null;

  if (saviorKey) {
    char.usedSanitySave = true;
    const savior = char.npcs[saviorKey];
    char.stats.sanity = 22;
    char.stats.health = Math.max(15, char.stats.health);
    char.logs.push({
      id: `log_sanity_save_${char.age}_${saviorKey}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'miracle',
      vi: `[${savior.nameVi}] Khi bạn gục xuống trong cơn hoảng loạn tột cùng, ${savior.nameVi} đã ôm chặt lấy bạn, thức trắng nhiều đêm để gọi bạn trở về từ bờ vực điên loạn.`,
      en: `[${savior.nameEn}] When you collapsed in total panic, ${savior.nameEn} held you tight, staying awake through the nights to call you back from the abyss of madness.`
    });
    return;
  }

  // Without a close companion: 40% fatal panic, 60% survive with lasting psychological trauma & physical toll
  if (rng() < 0.40) {
    applyFatalOrCompanionSave(
      char,
      'Tâm thần sụp đổ hoàn toàn trong hoảng loạn',
      'Succumbed to catastrophic psychic breakdown'
    );
  } else {
    char.stats.sanity = 22;
    char.stats.health = clamp(char.stats.health - 16, 1, 100);
    addScar(char, 'Di chứng sụp đổ tinh thần');
    char.logs.push({
      id: `log_panic_survive_${char.age}_${Date.now()}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'danger',
      vi: 'Bạn trải qua những tuần lễ sống trong hoảng loạn tột cùng, gào thét trong bóng tối trước khi hồi tỉnh với những vết thương tâm lý vĩnh viễn.',
      en: 'You endured weeks of sheer terror, screaming into the darkness before regaining composure, forever bearing deep psychological scars.'
    });
  }
}

/**
 * The Color trial companion is a real NPC with a real wound: recorded by identity when they take the blow,
 * marked injured so they cannot fight, then either healed or moved to an advisor post by the aftermath.
 */
export function applyColorTrialCompanionState(char, flagsAdd = []) {
  if (!char.npcs) return;
  if (flagsAdd.includes('PartnerShieldedYouInColorTrial') && !char.colorTrialCompanion) {
    const rec = recordColorTrialCompanion(char);
    if (rec) char.npcs[rec.role] = { ...char.npcs[rec.role], injured: true, injurySeverity: 'severe', injuredAtAge: char.age };
  }
  const healed = flagsAdd.includes('CompanionFullyHealed');
  const advisor = flagsAdd.includes('CompanionSeniorAdvisor');
  if (!healed && !advisor) return;
  const npc = colorTrialCompanionOf(char) || (!char.colorTrialCompanion ? char.npcs.partner : null);
  const role = char.colorTrialCompanion?.role || 'partner';
  // Treatment never brings back someone who is already gone
  if (!npcIsActive(npc)) return;
  char.npcs[role] = {
    ...npc,
    injured: false,
    injurySeverity: null,
    ...(advisor ? { advisor: true, advisorSinceAge: char.age } : {}),
    bond: clamp((npc.bond ?? 0) + (healed ? 40 : 30), 0, 100),
    lastSeen: char.age
  };
}

/**
 * Resolves a player's choice on a Story / Causal Event
 */
export function resolveEventChoice(charState, choiceIdx, rng = Math.random, dungeonStake = 0) {
  const char = cloneChar(charState);
  const event = char.pendingEvent;
  if (!event) return char;
  if (RETIRED_WORKSHOP_TRIAL_IDS.has(event.id)) {
    char.pendingEvent = null;
    return char;
  }

  const choice = event.choices?.[choiceIdx];
  if (!choiceIsAvailable(choice, char)) return char;
  const debtAtChoice = choice.debtId
    ? (char.debts || []).find((debt) => debt.id === choice.debtId && debt.status === 'active')
    : null;
  const debtBalanceAtChoice = debtAtChoice?.balanceAhn;
  const debtTextValues = debtAtChoice
    ? { debtBalance: debtBalanceAtChoice, partialPay: Math.min(3, debtBalanceAtChoice) }
    : {};
  if (choice.useItem) {
    const index = char.inventory.findIndex(i => (i.id || i) === choice.useItem);
    char.inventory.splice(index, 1);
    if (!char.inventory.some(i => (i.id || i) === choice.useItem) && char.equipped) {
      char.equipped = { ...char.equipped };
      for (const [slot, item] of Object.entries(char.equipped)) {
        if ((item?.id || item) === choice.useItem) char.equipped[slot] = null;
      }
    }
  }
  if (choice.favorCost) {
    const { role, amount } = choice.favorCost;
    char.npcs[role] = { ...char.npcs[role], bond: char.npcs[role].bond - amount };
  }
  const review = {
    vi: event.displayVi || interpolateText(event.vi || '', char),
    en: event.displayEn || interpolateText(event.en || '', char),
    choices: (event.choices || []).map((entry) => ({
      vi: interpolateText(entry.labelVi || '', char),
      en: interpolateText(entry.labelEn || '', char)
    })),
    selected: choiceIdx
  };
  char.pendingEvent = null;
  if (event.id.startsWith('fixer_promo_')) {
    const requiredGrade = event.choices?.find((entry) => entry.setFixerGrade != null)?.setFixerGrade;
    const nextGrade = getNextFixerPromotion(char);
    if (!nextGrade?.isEligible || requiredGrade !== nextGrade.grade || !matchesEventContext(event, char)) {
      char.fixerTrialRetryGrade = null;
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_invalid`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: 'Hana hủy giấy triệu tập cũ vì Grade hoặc hồ sơ hiện tại không còn khớp. Không có thay đổi chỉ số.',
        en: 'Hana withdrew an outdated summons because your current Grade or record no longer matches. No resources changed.'
      });
      return char;
    }
  }
  const otherTrial = careerTrialForEvent(event.id);
  if (otherTrial) {
    const next = getOtherCareerPromotion(char);
    if (!next?.isEligible || next.route !== otherTrial.route || next.rank !== otherTrial.rank ||
        (next.route === 'finger' && next.finger !== otherTrial.finger)) {
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_invalid`, age: char.age, season: SEASONS[char.seasonIdx], type: 'promo',
        vi: 'Giấy gọi xét bậc không còn khớp với hồ sơ hiện tại. Không có chỉ số nào thay đổi.',
        en: 'The promotion summons no longer matches your record. No resources changed.'
      });
      return char;
    }
  }
  if (isEgoLeapEvent(event.id)) {
    const leap = getEgoLeap(char);
    if (!leap || leap.eventId !== event.id) {
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_invalid`, age: char.age, season: SEASONS[char.seasonIdx], type: 'promo',
        vi: 'Giấy gọi tái định hạng đặc biệt không còn khớp với hồ sơ hiện tại. Không có chỉ số nào thay đổi.',
        en: 'The special re-rating summons no longer matches your record. No resources changed.'
      });
      return char;
    }
    if (choice.leapPromotion) {
      char.lastEgoLeapAge = char.age;
      if (rng() >= Math.min(0.92, egoLeapSuccessChance(char, leap) + (choice.leapOdds || 0))) {
        const loss = egoLeapFailureEffects(leap);
        const deltas = [];
        for (const [key, amount] of Object.entries(loss)) {
          const statsKey = ['health', 'sanity', 'wealth', 'network', 'rep'].includes(key);
          const before = statsKey ? char.stats[key] : char[key] || 0;
          const after = clamp(before + amount, 0, key === 'merit' ? 9999 : 100);
          if (statsKey) char.stats[key] = after; else char[key] = after;
          if (after !== before) deltas.push({ k: key, v: after - before });
        }
        const vi = leap.route === 'fixer'
          ? 'Hana không đóng dấu cho bài tái định hạng đặc biệt. Vũ khí của bạn vẫn có thật, nhưng hồ sơ chưa nhảy được hai bậc. Bạn trở về với thương tích và phí điều trị, và Hana sẽ không mở lại bài này trong ba năm.'
          : 'Buổi xét bậc đặc biệt không cho kết quả. Vũ khí không bị tước, nhưng ghế vẫn chưa thuộc về bạn. Họ sẽ không mở lại chuyện này trong ba năm.';
        const en = leap.route === 'fixer'
          ? 'Hana did not stamp the special re-rating. The weapon is real, but the record cannot jump two bands. You return with wounds and a treatment bill, and Hana will not reopen this for three years.'
          : 'The special review gives no result. The weapon is not taken from you, but the seat is not yet yours. They will not reopen it for three years.';
        char.logs.push({
          id: `log_ev_${char.age}_${event.id}_failed`, age: char.age, season: SEASONS[char.seasonIdx], type: 'major',
          choiceVi: choice.labelVi, choiceEn: choice.labelEn, vi, en, deltas, review
        });
        char.weaver = recordChoiceInGraph(char.weaver, char, event, { effects: loss }, vi, en);
        closeThreads(char, event.id);
        if (char.stats.health <= 0) {
          const [woundVi, woundEn] = woundDeath(char, 'Gục ngã trong bài tái định hạng đặc biệt', 'Succumbed during a special re-rating trial');
          applyFatalOrCompanionSave(char, woundVi, woundEn);
        } else if (char.stats.sanity <= 0) handleSanityBreakdown(char, rng);
        char.weaver = updateDramaTension(char.weaver, char);
        return char;
      }
    }
  }
  if (!char.seenEvents.includes(event.id)) {
    char.seenEvents.push(event.id);
  }
  if (otherTrial) {
    const prefix = otherTrial.route === 'finger' ? 'Finger' : 'Wing';
    const retryKey = `${prefix.toLowerCase()}TrialRetryRank`;
    char[`last${prefix}TrialAge`] = char.age;
    char[retryKey] = otherTrial.rank;
    const promotionChoice = choice[`set${prefix}Rank`] === otherTrial.rank;
    if (promotionChoice && rng() >= careerPromotionSuccessChance(char, otherTrial)) {
      const loss = careerPromotionFailureEffects(otherTrial);
      const deltas = [];
      for (const [key, amount] of Object.entries(loss)) {
        const statsKey = ['health', 'sanity', 'wealth', 'network', 'rep'].includes(key);
        const before = statsKey ? char.stats[key] : char[key] || 0;
        const after = clamp(before + amount, 0, key === 'merit' ? 9999 : 100);
        if (statsKey) char.stats[key] = after;
        else char[key] = after;
        if (after !== before) deltas.push({ k: key, v: after - before });
      }
      const verdict = otherTrial.route === 'finger'
        ? `The ${otherTrial.finger} chưa trao bậc mới. Tổ chức giữ lại hồ sơ; bạn có thể trở lại từ năm sau nếu còn đủ điều kiện.`
        : otherTrial.route === 'wing'
          ? 'Hội đồng Wing gạch tên bạn khỏi đợt bổ nhiệm. Hồ sơ được giữ lại cho kỳ sau nếu bạn đáp ứng lại chỉ tiêu.'
          : 'Đại diện Tres không đóng dấu kiểm định. Bạn phải bù lại vật liệu và có thể trình mẫu mới từ năm sau.';
      const verdictEn = otherTrial.route === 'finger'
        ? `The ${otherTrial.finger} withheld the new rank. Your record remains open; you may return next year if you qualify.`
        : otherTrial.route === 'wing'
          ? 'The Wing board passed over your appointment. Your file remains open for a later review if you meet the quotas again.'
          : 'The Tres representative withheld the proofmark. You must replace the materials before presenting another sample next year.';
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_failed`, age: char.age, season: SEASONS[char.seasonIdx], type: 'major',
        choiceVi: choice.labelVi, choiceEn: choice.labelEn, vi: verdict, en: verdictEn, deltas, review
      });
      char.weaver = recordChoiceInGraph(char.weaver, char, event, { effects: loss }, verdict, verdictEn);
      closeThreads(char, event.id);
      if (char.stats.health <= 0) {
        const [woundVi, woundEn] = woundDeath(char, 'Gục ngã trong kỳ xét bậc', 'Succumbed during a promotion trial');
        applyFatalOrCompanionSave(char, woundVi, woundEn);
      } else if (char.stats.sanity <= 0) handleSanityBreakdown(char, rng);
      char.weaver = updateDramaTension(char.weaver, char);
      return char;
    }
    if (promotionChoice) char[retryKey] = null;
  }
  if (event.id.startsWith('fixer_promo_')) {
    char.lastFixerExamAge = char.age;
    const trialGrade = event.choices?.find((entry) => entry.setFixerGrade != null)?.setFixerGrade;
    char.fixerTrialRetryGrade = trialGrade ?? null;
    if (choice.setFixerGrade != null && rng() >= fixerPromotionSuccessChance(char, choice.setFixerGrade)) {
      const loss = fixerPromotionFailureEffects(choice.setFixerGrade);
      const before = { ...char.stats };
      // The attempt still goes into Hana's report: a little Merit, and a better chance next time
      const noted = Math.max(2, 9 - choice.setFixerGrade);
      char.merit = (char.merit || 0) + noted;
      char.fixerExamFailures = { ...(char.fixerExamFailures || {}), [choice.setFixerGrade]: (char.fixerExamFailures?.[choice.setFixerGrade] || 0) + 1 };
      char.stats.health = clamp(char.stats.health + loss.health, 0, 100);
      char.stats.wealth = clamp(char.stats.wealth + loss.wealth, 0, 100);
      char.stats.sanity = clamp(char.stats.sanity + loss.sanity, 0, 100);
      const vi = `Hana không công nhận kết quả sát hạch Grade ${choice.setFixerGrade}. Bạn trở về với thương tích, phí điều trị và bồi hoàn; có thể xin thi lại từ năm sau nếu vẫn đủ điều kiện.`;
      const en = `Hana did not certify your Grade ${choice.setFixerGrade} trial. You returned injured, with treatment and compensation costs; you may try again next year if you still qualify.`;
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_failed`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'major',
        choiceVi: choice.labelVi,
        choiceEn: choice.labelEn,
        review,
        vi,
        en,
        deltas: Object.keys(loss).map((k) => ({ k, v: char.stats[k] - before[k] })).filter((delta) => delta.v)
      });
      char.weaver = recordChoiceInGraph(char.weaver, char, event, { effects: loss }, vi, en);
      closeThreads(char, event.id);
      if (char.stats.health <= 0) {
        const [woundVi, woundEn] = woundDeath(char, 'Gục ngã trong kỳ sát hạch của Hana', 'Succumbed during a Hana qualification trial');
        applyFatalOrCompanionSave(char, woundVi, woundEn);
      } else if (char.stats.sanity <= 0) {
        handleSanityBreakdown(char, rng);
      }
      char.weaver = updateDramaTension(char.weaver, char);
      return char;
    }
    if (choice.setFixerGrade != null) char.fixerTrialRetryGrade = null;
  }
  advanceActiveNarrativeArcs(char, event.id);
  if (event.id === 'distort_arc_star_calamity_ascension' &&
      char.activeArcs?.some((arc) => arc.id === 'arc_carmen_distortion_abyss' && arc.status === 'active' && arc.currentStage === 3)) {
    advanceActiveNarrativeArcs(char, 'distort_star_of_city_rampage');
    closeThreads(char, 'distort_star_of_city_rampage', { playedEventId: event.id });
  }
  if (event.id === 'ad_career_second_application') char.lastCareerApplicationAge = char.age;

  // Determine outcome (direct choice or weighted outcome roll)
  let outcome = choice;
  const rawOutcomes = choice.outcomes || choice.out;
  if (Array.isArray(rawOutcomes) && rawOutcomes.length > 0) {
    const evaluatedOutcomes = weightedOutcomes(choice, char);
    const totalW = evaluatedOutcomes.reduce((s, entry) => s + entry.weight, 0);
    let roll = rng() * totalW;
    for (const { outcome: candidate, weight } of evaluatedOutcomes) {
      roll -= weight;
      if (roll <= 0) {
        outcome = candidate;
        break;
      }
    }
  }

  // Merge effects from both choice and rolled outcome (supports both .effects and .fx formats)
  const startDungeonId = outcome.startDungeon || choice.startDungeon;
  // A gate answered, entered or not, starts the wait before the next one
  if (event.id.startsWith('gate_')) char.lastGateAge = char.age;
  const printsNumbers = PRINTED_NUMBERS.test(`${outcome.resultVi || outcome.rvi || ''}${choice.resultVi || choice.rvi || ''}`);
  const rolled = mergeEffects(choice, outcome);
  const effectiveCostAhn = getChoiceAhnCost(choice, char);
  if (effectiveCostAhn && (choice.fx?.wealth ?? choice.effects?.wealth ?? rolled.wealth) === -effectiveCostAhn) {
    rolled.wealth = (rolled.wealth || 0) + effectiveCostAhn;
  }
  const effects = printsNumbers ? rolled : varyEffects(rolled, rng, traitsOf(char));
  for (const key of [...(choice.exactFx || []), ...(outcome === choice ? [] : outcome.exactFx || [])]) {
    if (key in rolled) effects[key] = rolled[key];
  }
  if (/^fixer_promo_/.test(event.id) && effects.health < 0) effects.health = Math.ceil(effects.health * 0.65);
  // Entering a dungeon only sets the scene: the stages pay out, so the entry itself never pays twice
  if (startDungeonId) for (const key of Object.keys(effects)) effects[key] = 0;
  if (effectiveCostAhn) effects.wealth = (effects.wealth || 0) - effectiveCostAhn;
  const itemId = outcome.itemAdd || choice.itemAdd;
  const purchasedItem = ITEMS_CATALOG.find(i => i.id === itemId);
  if (purchasedItem) char.inventory.push({ ...purchasedItem });
  if (effects.health) char.stats.health = clamp(char.stats.health + effects.health, 0, 100);
  if (effects.sanity) char.stats.sanity = clamp(char.stats.sanity + effects.sanity, 0, 100);
  if (effects.wealth) char.stats.wealth = clamp(char.stats.wealth + effects.wealth, 0, 100);
  if (effects.network) char.stats.network = clamp(char.stats.network + effects.network, 0, 100);
  if (effects.rep) char.stats.rep = clamp(char.stats.rep + (printsNumbers ? effects.rep : reputationGain(char.stats.rep, effects.rep)), 0, 100);
  if (effects.heat) char.heat = clamp((char.heat || 0) + effects.heat, 0, 100);
  if (effects.taboo) char.taboo = clamp((char.taboo || 0) + effects.taboo, 0, 3);
  if (effects.resonance) char.resonance = clamp((char.resonance || 0) + effects.resonance, 0, 100);
  if (effects.standing) char.standing = clamp((char.standing ?? 50) + effects.standing, 0, 100);
  if (effects.leverage) char.leverage = clamp((char.leverage || 0) + effects.leverage, 0, 100);

  rememberResonance(char, effects.resonance || 0);
  if (event.id === 'hana_color_ascension_trial') char.lastColorTrialAge = char.age;

  // Career / Faction / Region mutations
  const setJob = outcome.setJob || choice.setJob;
  if (event.id === 'ad_career_crossroad_18' && setJob === 'Outcast') char.lastCareerApplicationAge = char.age;
  if (char.job === 'Child' && setJob && setJob !== 'Child') char.merit = 0;
  if (setJob === 'Wing Employee' && char.job !== 'Wing Employee') char.wingEmployerId = char.regionId;
  if (setJob) char.job = setJob;
  if (choice.clearFinger || outcome.clearFinger) {
    char.finger = null;
    char.fingerRank = 0;
  }

  const setFixerGrade = outcome.setFixerGrade ?? choice.setFixerGrade;
  const previousFixerGrade = char.fixerGrade;
  if (setFixerGrade !== undefined) {
    char.fixerGrade = setFixerGrade;
  }

  // Color Fixer Promotion & Title Assignment
  const isColorPromote = choice.promote === 'ColorFixer' || outcome.promote === 'ColorFixer' ||
    choice.flagsAdd?.includes('ColorFixer') || outcome.flagsAdd?.includes('ColorFixer') ||
    choice.flags?.includes('ColorFixer') || outcome.flags?.includes('ColorFixer') ||
    choice.openColorModal || outcome.openColorModal;
  if (isColorPromote) {
    char.fixerGrade = 0;
    if (!char.flags.includes('ColorFixer')) char.flags.push('ColorFixer');
    char.colorAwardAge ??= char.age;
    markColorInvestiture(char);
  }

  const assignedTitle = outcome.customTitle || choice.customTitle ||
    outcome.customTitleVi || choice.customTitleVi ||
    outcome.customTitleEn || choice.customTitleEn;
  if (assignedTitle) {
    char.customTitle = assignedTitle;
  }

  const setFinger = outcome.setFinger || choice.setFinger;
  if (setFinger) {
    char.finger = setFinger;
    char.flags = char.flags.filter(f => !/^Finger(Thumb|Index|Middle|Ring|Pinky)$/.test(f));
    char.flags.push(`Finger${setFinger}`);
  }

  const previousFingerRank = char.fingerRank || 0;
  const setFingerRank = outcome.setFingerRank ?? choice.setFingerRank;
  if (setFingerRank !== undefined) {
    if (setFingerRank > (char.fingerRank || 0)) char.lastFingerPromotionAge = char.age;
    char.fingerRank = setFingerRank;
  }

  const setWingRank = outcome.setWingRank ?? choice.setWingRank;
  if (setWingRank !== undefined) {
    if (setWingRank > (char.wingRank || 0)) char.lastWingPromotionAge = char.age;
    char.wingRank = setWingRank;
  }

  const setSyndicateRank = outcome.setSyndicateRank ?? choice.setSyndicateRank;
  if (setSyndicateRank !== undefined) {
    char.syndicateRank = setSyndicateRank;
  }

  const setOrg = outcome.setOrg || choice.setOrg;
  if (setOrg) {
    char.org = setOrg;
    ensureAffiliation(char);
  }

  const setRegion = outcome.setRegion || choice.setRegion;
  if (setRegion) char.regionId = setRegion;

  // Finger missions were written without Merit, so a member's ladder stalled while a Fixer's did not
  const missionMerit = event.mission && char.job === 'Syndicate' ? 4 + (char.fingerRank || 0) * 3 : 0;
  const listedMerit = startDungeonId ? 0 : (choice.meritAdd || 0) + (outcome === choice ? 0 : outcome.meritAdd || 0) ||
    (startDungeonId ? 0 : missionMerit);
  const meritAdd = isFixerCareerEvent(event) ? Math.round(listedMerit * BALANCE.fixerMeritScale) : listedMerit;
  if (meritAdd) {
    if (char.job === 'Child') {
      char.stats.rep = clamp((char.stats.rep || 0) + Math.round(meritAdd * 0.5), 0, 100);
    } else {
      char.merit = Math.max(0, char.merit + meritAdd);
    }
  }
  if ((event.id.startsWith('fixer_promo_') || event.id.startsWith('fixer_ego_leap_')) && char.fixerGrade < previousFixerGrade) {
    const earnedAtGrade = FIXER_LADDER.find((step) => step.grade === char.fixerGrade)?.meritReq || 0;
    const nextRequirement = FIXER_LADDER.find((step) => step.grade === char.fixerGrade - 1)?.meritReq || COLOR_FIXER_REQ.merit;
    const retained = earnedAtGrade + Math.floor(Math.max(0, char.merit - earnedAtGrade) *
      (char.flags.includes('SevenExceptionalRecord') ? 0.85 : meritRetentionAfterPromotion(char.fixerGrade)));
    char.merit = char.flags.includes('SevenExceptionalRecord') ? retained : Math.min(nextRequirement - 10, retained);
  }
  if ((char.fingerRank || 0) > previousFingerRank && char.finger && FINGER_LADDERS[char.finger]) {
    const ladder = FINGER_LADDERS[char.finger];
    const earnedAtRank = ladder.find((step) => step.rank === char.fingerRank)?.meritReq || 0;
    const nextRequirement = ladder.find((step) => step.rank === char.fingerRank + 1)?.meritReq || 220;
    char.merit = Math.min(nextRequirement - 12,
      earnedAtRank + Math.floor(Math.max(0, char.merit - earnedAtRank) * 0.25));
  }

  // Flags, Scars, Codex Records, NPCs, Memories (Persistent Causality)
  const flagsAdd = [
    ...(choice.flagsAdd || []),
    ...(choice.flags || []),
    ...(outcome.flagsAdd || []),
    ...(outcome.flags || [])
  ];
  flagsAdd.forEach(f => {
    if (!char.flags.includes(f)) {
      char.flags.push(f);
      if (f === 'Married') char.flags = char.flags.filter((x) => x !== 'Widowed' && x !== 'Separated');
      if (f === 'ColorFixer') {
        char.job = 'Color Fixer';
        char.fixerGrade = 0;
      }
      if (f === 'Distorted') {
        const distortLogs = triggerDistortionTransformation(char);
        char.logs.push(...distortLogs);
      }
    }
  });

  const flagsRemove = [
    ...(choice.flagsRemove || []),
    ...(outcome.flagsRemove || [])
  ];
  applyColorTrialCompanionState(char, flagsAdd);
  if (flagsRemove.length > 0) {
    char.flags = char.flags.filter(f => !flagsRemove.includes(f));
  }
  if (setRegion === 'OUTSKIRTS') {
    char.flags = char.flags.filter(f => f !== 'Nest' && f !== 'Feather');
    if (!char.flags.includes('Outskirts')) char.flags.push('Outskirts');
  } else if (setRegion) {
    const wasOutside = char.regionId === 'OUTSKIRTS' || char.flags.includes('Outskirts');
    char.flags = char.flags.filter(f => f !== 'Outskirts');
    if (wasOutside && !char.flags.includes('EnteredCity')) char.flags.push('EnteredCity');
  }

  const scarsAdd = [
    ...(choice.scarsAdd || []),
    ...(choice.scars || []),
    ...(choice.scar ? [choice.scar] : []),
    ...(outcome.scarsAdd || []),
    ...(outcome.scars || []),
    ...(outcome.scar ? [outcome.scar] : [])
  ];
  scarsAdd.forEach(s => {
    const interpolated = interpolateText(s, char);
    addScar(char, interpolated);
  });

  // Persistent Memories: Choices remain etched into character's past
  const memList = [
    choice.mem,
    outcome.mem,
    choice.memory,
    outcome.memory,
    ...(choice.memories || []),
    ...(outcome.memories || [])
  ].filter(Boolean);
  memList.forEach(m => {
    if (!hasMemory(char, m)) {
      char.memory = [...(char.memory || []), { key: m, age: char.age }];
    }
  });

  const recordsAdd = [...(choice.recordsAdd || []), ...(outcome.recordsAdd || [])];
  recordsAdd.forEach(r => {
    if (!char.unlockedRecords.includes(r)) char.unlockedRecords.push(r);
  });

  applyBonds(char, outcome === choice ? [choice] : [choice, outcome]);

  const allSources = outcome === choice ? [choice] : [choice, outcome];

  // Process companion personal quests (npcQuest) and relationship promotions
  for (const src of allSources) {
    if (src.npcQuest && Array.isArray(src.npcQuest)) {
      for (const role of src.npcQuest) {
        const key = char.npcs?.[role] ? role : role === 'lover' && char.npcs?.spouse ? 'spouse' : null;
        const target = key && char.npcs[key];
        if (!target || !npcIsActive(target)) continue;
        const questsDone = (target.questsDone || 0) + 1;
        const yearsTogether = Math.max(0, (char.age || 0) - Math.max(15, target.metAge || char.age || 0));
        const lifted = { ...target, questsDone, lastSeen: char.age };
        const cap = bondCapFor({ ...lifted, yearsTogether });
        const bondNow = Math.min(cap, (lifted.bond || 0) + 14);
        char.npcs = { ...char.npcs, [key]: { ...lifted, bond: Math.max(lifted.bond || 0, bondNow) } };
        char.memory = [...(char.memory || []), { key: `quest_${key}_${questsDone}`, age: char.age }];
      }
    }
    if (src.promote) {
      const p = src.promote;
      const from = char.npcs?.[p.from];
      if (from && npcIsActive(from) && !npcIsActive(char.npcs?.[p.to])) {
        char.npcs = { ...char.npcs, [p.to]: { ...from, role: p.to, lastSeen: char.age }, [p.from]: null };
        if (p.to === 'spouse') {
          char.flags = [...(char.flags || []).filter((x) => x !== 'Widowed' && x !== 'Separated'), ...(char.flags.includes('Married') ? [] : ['Married'])];
        }
      }
    }
  }

  const npcAdd = outcome.npcAdd || choice.npcAdd;
  if (npcAdd && npcAdd.role) {
    const lover = char.npcs?.lover;
    if (npcAdd.role === 'spouse' && npcIsActive(lover)) {
      char.npcs.spouse = { ...lover, role: 'spouse', bond: Math.max(lover.bond || 0, npcAdd.bond || 0), lastSeen: char.age };
      char.npcs.lover = null;
    } else if (!char.npcs[npcAdd.role] || char.npcs[npcAdd.role].deceased) {
      const base = makeNpc(npcAdd.role, rng, { metAge: char.age, lastSeen: char.age, ...(npcAdd.ageAtMeet == null ? {} : { ageAtMeet: npcAdd.ageAtMeet }), avoidNames: namesInUse(char) });
      char.npcs[npcAdd.role] = {
        ...base,
        ...(npcAdd.nameVi ? { nameVi: npcAdd.nameVi, nameEn: npcAdd.nameEn || npcAdd.nameVi } : {}),
        ...(npcAdd.traitVi ? { traitVi: npcAdd.traitVi, traitEn: npcAdd.traitEn || npcAdd.traitVi } : {}),
        bond: Math.abs(npcAdd.bond || 70)
      };
      // Someone new in a role that was lost ends that loss flag
      const lostFlag = { friend: 'FriendLost', partner: 'PartnerLost', mentor: 'MentorLost', child: 'ChildLost' }[npcAdd.role];
      if (lostFlag) char.flags = char.flags.filter((f) => f !== lostFlag);
    }
  }

  const npcFate = outcome.npcFate || choice.npcFate;
  if (npcFate) {
    for (const [role, status] of Object.entries(npcFate)) {
      applyNpcFate(char, role, status);
    }
  }

  // Joining, leaving or standing in an Association or Office, and the junior under your wing
  applyAffiliationChoice(char, choice);
  if (outcome !== choice) applyAffiliationChoice(char, outcome);

  // Structured Debts Management (Fixer license & street loans)
  if (!char.debts) char.debts = [];
  const debtsAdd = [...(choice.debtsAdd || []), ...(outcome.debtsAdd || [])];
  debtsAdd.forEach((d) => {
    if (!char.debts.some((existing) => existing.id === d.id)) {
      char.debts.push({
        id: d.id,
        creditorId: d.creditorId || 'backstreets_pawn_creditor',
        principalAhn: d.principalAhn ?? d.balanceAhn ?? 8,
        balanceAhn: d.balanceAhn ?? d.principalAhn ?? 8,
        createdAge: d.createdAge ?? char.age,
        nextDueAge: d.nextDueAge ?? (char.age + 1),
        missedPayments: d.missedPayments ?? 0,
        status: d.status || 'active',
        originEventId: d.originEventId || event.id
      });
    }
  });

  const debtsSettle = [...(choice.debtsSettle || []), ...(outcome.debtsSettle || [])];
  debtsSettle.forEach((debtId) => {
    const d = char.debts.find((item) => item.id === debtId);
    if (d) {
      d.status = 'settled';
      d.balanceAhn = 0;
    }
    if (debtId === 'fixer_license_debt') {
      char.flags = char.flags.filter((f) => f !== 'FixerLicenseDebt');
    }
  });

  const debtRepay = outcome.debtRepay || choice.debtRepay;
  if (debtRepay && debtRepay.id) {
    const d = char.debts.find((item) => item.id === debtRepay.id && item.status === 'active');
    if (d) {
      const repayAmount = debtRepay.amount === 'partial' ? Math.min(3, d.balanceAhn) : (debtRepay.amount || 0);
      const amount = Math.min(d.balanceAhn, repayAmount);
      d.balanceAhn -= amount;
      if (debtRepay.nextDueAge != null) d.nextDueAge = debtRepay.nextDueAge;
      else if (debtRepay.deferYears) d.nextDueAge = char.age + debtRepay.deferYears;
      if (d.balanceAhn <= 0) {
        d.status = 'settled';
        d.balanceAhn = 0;
        if (d.id === 'fixer_license_debt') {
          char.flags = char.flags.filter((f) => f !== 'FixerLicenseDebt');
        }
      }
    }
  }

  const debtPenalty = outcome.debtPenalty || choice.debtPenalty;
  if (debtPenalty && debtPenalty.id) {
    const d = char.debts.find((item) => item.id === debtPenalty.id && item.status === 'active');
    if (d) {
      d.missedPayments = (d.missedPayments || 0) + 1;
      if (debtPenalty.principalAdd) {
        d.principalAhn += debtPenalty.principalAdd;
        d.balanceAhn += debtPenalty.principalAdd;
      }
      if (debtPenalty.deferYears) d.nextDueAge = char.age + debtPenalty.deferYears;
    }
  }

  // Interactive Modals (Workshop Crafting / Naming E.G.O / Color Title)
  if (choice.openCraftModal || outcome.openCraftModal) {
    char.pendingModal = 'craft_weapon';
  }
  if (choice.openEgoModal || outcome.openEgoModal) {
    char.pendingModal = 'ego_name';
  }
  if (choice.openColorModal || outcome.openColorModal) {
    char.pendingModal = 'color_title';
    char.fixerGrade = 0;
    char.job = 'Color Fixer';
    if (!char.flags.includes('ColorFixer')) char.flags.push('ColorFixer');
    char.colorAwardAge ??= char.age;
    markColorInvestiture(char);
  }

  // Micro-Dungeon Delve trigger
  if (startDungeonId && char.alive) {
    char.pendingDungeon = createDungeonSession(startDungeonId, char);
    if (char.pendingDungeon && !DUNGEON_DEFINITIONS[startDungeonId]?.noRetreat && !DUNGEON_DEFINITIONS[startDungeonId]?.noWager) char.pendingDungeon.delveStake = dungeonWagerLevel(dungeonStake);
    if (choice.dungeonPrep === 'supplies') {
      char.pendingDungeon.maxSupplies += 1;
      char.pendingDungeon.supplyCharges += 1;
    }
    // A run taken for the Association moves standing when it ends
    if (char.pendingDungeon && (choice.dungeonAff || outcome.dungeonAff)) char.pendingDungeon.aff = getAffiliation(char)?.id || null;
  }
  if (event.id === ENSEMBLE_INVITE_ID || event.id === ENSEMBLE_LAST_CALL_ID) recordEnsembleInvitation(char, Boolean(startDungeonId));

  const partialDebtSettled = choice.debtCost === 'partial' && debtBalanceAtChoice != null && debtBalanceAtChoice <= 3;
  const resultVi = partialDebtSettled ? choice.resultViSettled : outcome.resultVi || outcome.rvi || choice.resultVi || choice.rvi;
  const resultEn = partialDebtSettled ? choice.resultEnSettled : outcome.resultEn || outcome.ren || choice.resultEn || choice.ren;
  let textVi = interpolateText(resultVi || '', char, debtTextValues);
  let textEn = interpolateText(resultEn || '', char, debtTextValues);
  if (choice.ensembleDecline) {
    const final = char.ensemble.declines >= 2;
    textVi += final ? ` Lần tới, ở tuổi ${char.ensemble.nextAge}, buổi diễn sẽ bắt buộc bắt đầu. Bạn có một năm để chuẩn bị; lần đó không được rút lui.` : ` Lời mời sẽ trở lại sớm nhất ở tuổi ${char.ensemble.nextAge}. Bạn còn một lần từ chối.`;
    textEn += final ? ` At age ${char.ensemble.nextAge}, the performance will begin by force. You have one year to prepare; that visit allows no retreat.` : ` The invitation will return no earlier than age ${char.ensemble.nextAge}. You have one refusal left.`;
  }

  char.logs.push({
    id: `log_ev_${char.age}_${event.id}`,
    age: char.age,
    season: SEASONS[char.seasonIdx],
    type: event.isCausalCallback ? 'causal' : (event.major ? 'major' : 'choice'),
    choiceVi: choice.labelVi,
    choiceEn: choice.labelEn,
    review,
    vi: textVi,
    en: textEn
  });

  // Record in the Weaver AI Causal Memory Graph & schedule any delayed consequences!
  const allConsequences = [
    ...(choice.scheduleConsequences || []),
    ...(outcome === choice ? [] : outcome.scheduleConsequences || []),
    ...(choice.later || []).map(l => ({ eventId: l.id, delayYears: l.years, reasonVi: l.reasonVi, reasonEn: l.reasonEn })),
    ...(outcome === choice ? [] : outcome.later || []).map(l => ({ eventId: l.id, delayYears: l.years, reasonVi: l.reasonVi, reasonEn: l.reasonEn }))
  ];
  const effectiveChoice = {
    ...choice,
    ...outcome,
    scheduleConsequences: allConsequences,
    scarsAdd
  };
  char.weaver = recordChoiceInGraph(char.weaver, char, event, effectiveChoice, textVi, textEn);

  // Mark any thread targeting this event as fulfilled
  closeThreads(char, event.id);

  // A life can end by choice: the character walks away or hands the seat on, and the chronicle closes
  if ((outcome.endsLife || choice.endsLife) && char.alive) {
    closeLifeByChoice(char, outcome.lifeEnding || choice.lifeEnding, outcome.deathCauseVi || choice.deathCauseVi, outcome.deathCauseEn || choice.deathCauseEn);
  } else if (outcome.deathCauseVi || char.stats.health <= 0) {
    const [woundVi, woundEn] = woundDeath(char, 'Gục ngã vì vết thương quá nặng', 'Succumbed to fatal wounds');
    applyFatalOrCompanionSave(char, outcome.deathCauseVi || woundVi, outcome.deathCauseEn || woundEn);
    if (!char.alive && (outcome.lifeEnding || choice.lifeEnding)) char.lifeEnding = outcome.lifeEnding || choice.lifeEnding;
  } else if (char.stats.sanity <= 0) {
    handleSanityBreakdown(char, rng);
  }

  const promoLogs = checkPromotions(char);
  char.logs.push(...promoLogs);
  char.weaver = updateDramaTension(char.weaver, char);

  return char;
}



/**
 * Builds the end-of-life Epitaph Summary & Legacy Package for Generation N+1
 */
export function buildLifeSummaryAndLegacy(char) {
  const region = REGIONS.find(r => r.id === char.regionId) || REGIONS[0];
  const birthRegion = REGIONS.find(r => r.id === (char.birthRegionId || char.regionId)) || region;
  const family = char.family || FAMILIES.find(f => f.id === char.familyId) || FAMILIES[0];
  const omen = FATE_OMENS.find(o => o.id === char.fateOmenId) || FATE_OMENS[0];
  const flags = char.flags || [];

  let epitaphTitleVi = 'Một người dân bình thường của The City';
  let epitaphTitleEn = 'An ordinary citizen of the City';
  let occupationVi = 'Cư dân tự do';
  let occupationEn = 'Freelance Citizen';
  let rankTier = 'Canard';

  if (char.age === 0 && char.deathCauseVi) {
    epitaphTitleVi = 'Sinh linh chưa kịp thấy ánh mặt trời';
    epitaphTitleEn = 'A life lost before the first dawn';
    occupationVi = 'Chưa kịp trưởng thành';
    occupationEn = 'Perished at Birth';
    rankTier = 'Canard';
  } else if (char.job === 'Distortion' || flags.includes('Distorted')) {
    epitaphTitleVi = 'Distortion';
    epitaphTitleEn = 'Distortion';
    occupationVi = 'Distortion';
    occupationEn = 'Distortion';
    rankTier = flags.includes('AbyssalDistortionApex') ? 'Star of the City' : 'Urban Nightmare';
  } else if (flags.includes('ColorFixer')) {
    epitaphTitleVi = char.customTitle || 'Color Fixer';
    epitaphTitleEn = char.customTitle || 'Color Fixer';
    occupationVi = `Color Fixer · 「${char.customTitle || 'The Crimson Dusk'}」`;
    occupationEn = `Color Fixer · "${char.customTitle || 'The Crimson Dusk'}"`;
    rankTier = 'Star of the City';
  } else if (flags.includes('EGOAwakened')) {
    epitaphTitleVi = `Người mang E.G.O 「${char.egoName || 'không tên'}」`;
    epitaphTitleEn = `Bearer of the E.G.O 「${localizeEnsembleName(char.egoName, 'en') || 'nameless'}」`;
    occupationVi = `${char.job === 'Fixer' ? `Fixer Grade ${char.fixerGrade}` : char.job} · E.G.O 「${char.egoName || 'Thức Tỉnh'}」`;
    occupationEn = `${char.job === 'Fixer' ? `Grade ${char.fixerGrade} Fixer` : char.job} · E.G.O "${localizeEnsembleName(char.egoName, 'en') || 'Awakened'}"`;
    rankTier = 'Star of the City';
  } else if (flags.includes('HongyuanHierarch')) {
    epitaphTitleVi = 'Gia chủ của Hongyuan';
    epitaphTitleEn = 'Family Hierarch of Hongyuan';
    occupationVi = 'H Corp · Gia chủ Hongyuan';
    occupationEn = 'H Corp · Hierarch of Hongyuan';
    rankTier = 'Star of the City';
  } else if (char.job === 'Fixer') {
    epitaphTitleVi = `Fixer Grade ${char.fixerGrade} · ${char.org?.name || 'tự do'}`;
    epitaphTitleEn = `Grade ${char.fixerGrade} Fixer · ${char.org?.name || 'Freelance'}`;
    occupationVi = `${char.org?.name || 'Fixer tự do'} · Grade ${char.fixerGrade}`;
    occupationEn = `${char.org?.name || 'Freelance Fixer'} · Grade ${char.fixerGrade}`;
    rankTier = char.fixerGrade <= 2 ? 'Urban Nightmare' : (char.fixerGrade <= 5 ? 'Urban Plague' : 'Urban Legend');
  } else if (char.job === 'Syndicate') {
    const rankName =
      char.finger && FINGER_RANKS[char.finger]
        ? FINGER_RANKS[char.finger][char.fingerRank || 0]
        : 'Người của Syndicate';
    epitaphTitleVi = `${rankName} · ${char.finger ? `The ${char.finger}` : (char.org?.name || 'Backstreets')}`;
    epitaphTitleEn = `${rankName} · ${char.finger ? `The ${char.finger}` : (char.org?.name || 'Backstreets')}`;
    occupationVi = `${char.finger ? `The ${char.finger}` : 'Syndicate'} · ${rankName}`;
    occupationEn = `${char.finger ? `The ${char.finger}` : 'Syndicate'} · ${rankName}`;
    rankTier = (char.fingerRank || 0) >= 2 ? 'Urban Nightmare' : 'Urban Plague';
  } else if (char.job === 'Wing Employee') {
    const wRank = Math.min(WING_RANKS.length - 1, char.wingRank || 0);
    const wingTitleVi = WING_RANKS[wRank]?.titleVi || 'Feather của Wing';
    const wingTitleEn = WING_RANKS[wRank]?.titleEn || 'Wing Feather';
    const wingShort = region.nameVi?.split('·')[1]?.trim() || region.nameVi;
    epitaphTitleVi = `${wingTitleVi} · ${char.org?.name || wingShort}`;
    epitaphTitleEn = `${wingTitleEn} · ${char.org?.name || wingShort}`;
    occupationVi = `${wingShort} · ${wingTitleVi.split('(')[0].trim()}`;
    occupationEn = `${wingShort} · ${wingTitleEn}`;
    rankTier = wRank >= 3 ? 'Star of the City' : wRank >= 2 ? 'Urban Nightmare' : 'Urban Legend';
  } else if (char.job === 'Workshop Craftsman') {
    const wsRank = char.workshopRank || 0;
    const wsTitleVi = wsRank >= 3 ? 'Đại Sư Xưởng Rèn Tres' : wsRank === 2 ? 'Nghệ Nhân Vũ Khí Cấp Cao' : wsRank === 1 ? 'Thợ Rèn Chứng Nhận Tres' : 'Thợ rèn Workshop';
    const wsTitleEn = wsRank >= 3 ? 'Tres Grandmaster Smith' : wsRank === 2 ? 'Master Atelier Artisan' : wsRank === 1 ? 'Certified Workshop Smith' : 'Workshop Craftsman';
    epitaphTitleVi = wsTitleVi;
    epitaphTitleEn = wsTitleEn;
    occupationVi = char.craftWeapon ? `${wsTitleVi} · 「${char.craftWeapon.name}」` : wsTitleVi;
    occupationEn = char.craftWeapon ? `${wsTitleEn} · "${char.craftWeapon.name}"` : wsTitleEn;
    rankTier = char.craftWeapon || wsRank >= 2 ? 'Urban Nightmare' : 'Urban Legend';
  } else if (char.age < 18) {
    occupationVi = 'Đứa trẻ của The City';
    occupationEn = 'Child of the City';
  }

  const keepsake = keepsakeForLife(char);
  const relicName = keepsake.vi;

  const succInfo = determineSuccessorType(char);
  const relicNameEn = keepsake.en;
  const successorRelation = succInfo.type;
  let childAgeWhenParentDied = 0;
  if (succInfo.type === 'child') {
    const parentChildBirthAge = Math.min(char.age - 1, Math.max(18, char.age - 18));
    childAgeWhenParentDied = Math.max(1, char.age - parentChildBirthAge);
  } else {
    childAgeWhenParentDied = Math.max(1, Math.min(18, char.age - 5));
  }

  const localAvgLife = region.avgLife || 55;
  const lifespanDiff = char.age - localAvgLife;
  const deathCauseVi = char.deathCauseVi || 'Qua đời ở The City';
  const deathCauseEn = char.deathCauseEn || 'Passed away in the City';

  // Poetic Epitaph Quote tailored to how the life unfolded and ended
  let poeticQuoteVi = '“Họ trút hơi thở cuối cùng vào một buổi chiều mà không một ai trong thành phố này dừng bước.”';
  let poeticQuoteEn = '“They breathed their last on an afternoon when no one in the City was in a hurry.”';

  const closedBy = lifeEndingOf(char);
  const topOfCareer = flags.includes('ColorFixer') || (char.job === 'Syndicate' && (char.fingerRank || 0) >= 3);
  if (closedBy) {
    poeticQuoteVi = closedBy.quoteVi;
    poeticQuoteEn = closedBy.quoteEn;
  } else if (topOfCareer && char.age >= 100) {
    poeticQuoteVi = LIFE_ENDINGS.ripe_age.quoteVi;
    poeticQuoteEn = LIFE_ENDINGS.ripe_age.quoteEn;
  } else if (char.endingId === 'library_threshold') {
    poeticQuoteVi = '“B Corp không ghi lại những gì ở phía sau cánh cửa.”';
    poeticQuoteEn = '“B Corp did not record what lay beyond the door.”';
  } else if (char.age === 0) {
    poeticQuoteVi = '“Một sinh linh khép mắt trước khi ánh đèn neon ngoài cửa sổ kịp đổi màu.”';
    poeticQuoteEn = '“A fragile breath extinguished before the neon outside the window could even flicker.”';
  } else if (flags.includes('Distorted') || char.job === 'Distortion') {
    poeticQuoteVi = '“Khi hình hài con người trở nên quá chật hẹp cho nỗi tuyệt vọng, họ đã buông tay để hóa thành chính cơn ác mộng của mình.”';
    poeticQuoteEn = '“When a human shell grew too narrow for their despair, they let go and became the shape of their own sorrow.”';
  } else if (flags.includes('ColorFixer') || flags.includes('EGOAwakened')) {
    poeticQuoteVi = '“Giữa một thành phố nghiền nát mọi linh hồn thành tro bụi, họ đã tự rèn nỗi đau của mình thành một sắc màu không thể phai mờ.”';
    poeticQuoteEn = '“In a City that grinds every soul to ash, they forged their own agony into an indelible radiance.”';
  } else if (char.age >= 70 || /tuổi già|lão|nhắm mắt|old age/i.test(`${deathCauseVi} ${deathCauseEn}`)) {
    poeticQuoteVi = '“Giữa một nơi mà tuổi già là thứ xa xỉ phẩm hiếm hoi nhất, họ đã lặng lẽ khép mắt sau khi chứng kiến biết bao mùa mưa máu đi qua.”';
    poeticQuoteEn = '“In a place where old age is the rarest luxury of all, they quietly closed their eyes after outliving a hundred storms.”';
  } else if (char.age < 18) {
    poeticQuoteVi = '“Những con hẻm của The City chưa bao giờ đủ rộng cho những giấc mơ chưa kịp lớn.”';
    poeticQuoteEn = '“The alleys of the City were never wide enough for dreams that had not yet grown.”';
  } else if (/Hầm ngục|Bỏ mạng tại|WARP|Great Lake|Pallid|Lobotomy|La Manchaland|Outskirts/i.test(deathCauseVi)) {
    poeticQuoteVi = '“Họ bước vào nơi bóng tối sâu thẳm nhất của dị thể và mãi mãi trở thành một phần của truyền thuyết nơi đáy vực.”';
    poeticQuoteEn = '“They stepped into the deepest abyss of the anomaly and became part of the legend whispered in the dark.”';
  } else {
    poeticQuoteVi = '“Máu rơi trên mặt đường ướt lạnh rồi sẽ trôi theo nước mưa, nhưng vết cắt họ để lại trong biên niên sử vẫn còn nguyên vẹn.”';
    poeticQuoteEn = '“Blood spilled on wet cobblestones washes away with the rain, yet the mark they carved into the chronicle remains.”';
  }

  // Extract pivotal turning points from logs for the timeline & deep narrative synthesis
  const logs = Array.isArray(char.logs) ? char.logs : [];
  const majorLogs = logs.filter(l => l.age > 0 && ['major', 'promo', 'miracle', 'causal', 'choice', 'danger'].includes(l.type) && !l.passed);
  const turningPoints = [];
  const seenMilestoneAges = new Set();

  for (const entry of majorLogs) {
    const rawVi = entry.vi || '';
    const rawEn = entry.en || '';
    const titleMatchVi = /^\s*\[([^\]]{2,80})\]\s*/.exec(rawVi);
    const titleMatchEn = /^\s*\[([^\]]{2,80})\]\s*/.exec(rawEn);
    const cleanBodyVi = (titleMatchVi ? rawVi.slice(titleMatchVi[0].length) : rawVi).split(/(?<=[.!?])\s+/)[0] || rawVi;
    const cleanBodyEn = (titleMatchEn ? rawEn.slice(titleMatchEn[0].length) : rawEn).split(/(?<=[.!?])\s+/)[0] || rawEn;
    const isPriority = ['promo', 'miracle', 'causal'].includes(entry.type) || entry.age === 18;
    if (isPriority || !seenMilestoneAges.has(entry.age)) {
      seenMilestoneAges.add(entry.age);
      turningPoints.push({
        age: entry.age,
        type: entry.type,
        titleVi: titleMatchVi ? titleMatchVi[1] : (entry.choiceVi || `Tuổi ${entry.age}`),
        titleEn: titleMatchEn ? titleMatchEn[1] : (entry.choiceEn || `Age ${entry.age}`),
        summaryVi: cleanBodyVi,
        summaryEn: cleanBodyEn
      });
    }
  }

  // Synthesize Deep Multi-Paragraph Life Story (Vi & En)
  const lifeStoryParagraphsVi = [];
  const lifeStoryParagraphsEn = [];

  // Paragraph 1: Origins, Family, Fate Omen & Childhood
  const lineageIntroVi = char.lineage?.parentName
    ? `Mang trong mình huyết thống thế hệ thứ #${char.generation} và kế thừa di vật 「${char.lineage.relic}」 từ ${char.lineage.parentName}, `
    : '';
  const lineageIntroEn = char.lineage?.parentName
    ? `Carrying the bloodline of Generation #${char.generation} and inheriting "${char.lineage.relicEn || localizeEnsembleName(char.lineage.relic, 'en')}" from ${char.lineage.parentName}, `
    : '';

  const childhoodLog = majorLogs.find(l => l.age >= 5 && l.age < 18);
  const childhoodSnippetVi = childhoodLog
    ? ` Năm ${childhoodLog.age} tuổi, biến cố đầu đời ập đến khi ${childhoodLog.choiceVi ? `bạn chọn "${childhoodLog.choiceVi.toLowerCase()}"` : 'bạn phải tự mình đối mặt với sự khắc nghiệt của khu phố'}, sớm định hình bản lĩnh sinh tồn trước tuổi trưởng thành.`
    : (char.age < 18
      ? ' Tuy nhiên, những năm tháng thơ ấu ngắn ngủi đã sớm khép lại giữa vòng xoáy tàn nhẫn của thành phố.'
      : ' Vượt qua những năm tháng thơ ấu đầy bất trắc giữa khói bụi và tiếng còi báo động, bạn từng bước trưởng thành với đôi mắt không còn biết sợ hãi.');
  const childhoodSnippetEn = childhoodLog
    ? ` At age ${childhoodLog.age}, an early crucible arrived when ${childhoodLog.choiceEn ? `you chose to "${childhoodLog.choiceEn.toLowerCase()}"` : 'you confronted the brutality of the streets firsthand'}, tempering your instincts long before adulthood.`
    : (char.age < 18
      ? ' Yet those fragile early years were cut tragically short by the merciless gears of the City.'
      : ' Surviving a perilous youth amidst industrial smog and distant sirens, you came of age with hardened resolve.');

  lifeStoryParagraphsVi.push(
    `${lineageIntroVi}${char.name} cất tiếng khóc chào đời tại ${birthRegion.nameVi} trong một ${family.nameVi?.toLowerCase() || 'gia đình bình thường'}, dưới điềm báo định mệnh 「${omen?.nameVi || 'Ngôi Sao Mờ'}」.${childhoodSnippetVi}`
  );
  lifeStoryParagraphsEn.push(
    `${lineageIntroEn}${char.name} was born in ${birthRegion.nameEn} into a ${family.nameEn || 'humble household'}, under the natal omen of "${omen?.nameEn || 'Faint Star'}".${childhoodSnippetEn}`
  );

  // Paragraph 2: Adulthood Career, Promotions, Dungeons & Masterworks
  if (char.age >= 18) {
    let careerArcVi = '';
    let careerArcEn = '';

    if (char.job === 'Distortion') {
      const formerColor = char.colorTitleAtAward ||
        ((char.unlockedRecords || []).includes('color_fixer') ? char.customTitle : null);
      careerArcVi = formerColor
        ? `Hana từng gọi bạn là Color Fixer 「${formerColor}」. Sau khi biến thành Distortion, danh hiệu ấy chỉ còn trong hồ sơ cũ.`
        : 'Đời sống cũ khép lại khi bạn biến thành Distortion.';
      careerArcEn = formerColor
        ? `Hana once named you the Color Fixer "${formerColor}". After your Distortion, the title remained only in its old records.`
        : 'Your former life ended when you became a Distortion.';
    } else if (char.job === 'Fixer') {
      careerArcVi = `Đến tuổi phải tự kiếm sống, bạn dấn thân vào con đường Fixer chuyên nghiệp${char.org?.name ? ` thuộc ${char.org.name}` : ''}, từng bước leo lên tới cấp bậc Fixer Grade ${char.fixerGrade}${flags.includes('ColorFixer') ? ` và được Hana Association sắc phong danh hiệu huyền thoại 「${char.customTitle}」` : ''}.`;
      careerArcEn = `Old enough to work for your keep, you took up the Fixer’s license${char.org?.name ? ` with ${char.org.name}` : ''}, carving your way up to Grade ${char.fixerGrade}${flags.includes('ColorFixer') ? ` and claiming the legendary Color title "${char.customTitle}" from Hana Association` : ''}.`;
    } else if (char.job === 'Syndicate') {
      const fRankName = char.finger && FINGER_RANKS[char.finger] ? FINGER_RANKS[char.finger][char.fingerRank || 0] : 'thành viên Syndicate';
      careerArcVi = `Ở tuổi trưởng thành, bạn bước vào thế giới ngầm của ${char.finger ? `Ngón Tay The ${char.finger}` : 'Syndicate'}, dùng máu và kỷ luật sắt để vươn lên địa vị ${fRankName} với ${char.merit || 0} điểm công trạng giang hồ.`;
      careerArcEn = `In adulthood, you swore yourself to the underworld of ${char.finger ? `The ${char.finger}` : 'the Backstreets Syndicates'}, rising through blood and iron discipline to the rank of ${fRankName} with ${char.merit || 0} Merit.`;
    } else if (char.job === 'Wing Employee') {
      const wRank = Math.min(WING_RANKS.length - 1, char.wingRank || 0);
      careerArcVi = `Từ tuổi trưởng thành, bạn khoác lên mình tấm áo Feather của tập đoàn Wing tại ${region.nameVi}, thăng tiến qua các cuộc thanh trừng nội bộ để đạt chức vụ ${WING_RANKS[wRank]?.titleVi || 'Nhân viên Wing'}.`;
      careerArcEn = `Upon coming of age, you entered corporate service as a Wing Feather in ${region.nameEn}, navigating boardroom purges and Singularity quotas to rise to ${WING_RANKS[wRank]?.titleEn || 'Wing Operative'}.`;
    } else if (char.job === 'Workshop Craftsman') {
      careerArcVi = `Bạn chọn gắn đời mình với lửa lò và búa sắt của một nghệ nhân Workshop, tích lũy ${char.merit || 0} điểm danh tiếng chế tác${char.craftWeapon ? ` và tự tay rèn nên tuyệt tác vũ khí 「${char.craftWeapon.name}」 được Tres Association đóng dấu công nhận` : ''}.`;
      careerArcEn = `You dedicated your adulthood to the furnace and anvil as a Workshop Craftsman, earning ${char.merit || 0} Merit${char.craftWeapon ? ` and forging the registered masterpiece "${char.craftWeapon.name}"` : ''}.`;
    } else {
      careerArcVi = `Trong suốt những năm tháng trưởng thành tại ${region.nameVi}, bạn vật lộn mưu sinh qua từng mùa biến động của The City.`;
      careerArcEn = `Throughout your adult years in ${region.nameEn}, you fought to carve out a living across the shifting seasons of the City.`;
    }

    const promoMoments = turningPoints.filter(tp => tp.type === 'promo' || tp.type === 'miracle').slice(0, 3);
    const milestoneTextVi = promoMoments.length > 0
      ? ` Những cột mốc chói lọi nhất trong sự nghiệp của bạn được ghi dấu vào các năm tuổi ${promoMoments.map(m => `${m.age} (${m.titleVi})`).join(', ')}.`
      : '';
    const milestoneTextEn = promoMoments.length > 0
      ? ` Defining milestones marked your ascent at ages ${promoMoments.map(m => `${m.age} (${m.titleEn})`).join(', ')}.`
      : '';

    const egoOrDistortVi = flags.includes('EGOAwakened')
      ? ` Trước ánh mặt trời chói lòa của Carmen, bạn đã khước từ sự buông xuôi để kết tinh nỗi đau thành E.G.O 「${char.egoName || 'Bất Khuất'}」.`
      : flags.includes('Distorted')
        ? ' Giữa tột cùng bi kịch và độ cộng hưởng tâm thức chạm ngưỡng, bạn đã nghe theo lời thì thầm của Carmen và biến đổi thành một thực thể Distortion.'
        : (char.resonance || 0) >= 40
          ? ` Tâm thức bạn nhiều lần rung chuyển dữ dội trước tiếng gọi của Ánh Sáng với độ Cộng hưởng (Resonance) lên tới ${char.resonance}%.`
          : '';
    const egoOrDistortEn = flags.includes('EGOAwakened')
      ? ` Standing before Carmen’s blinding sun, you refused to yield and crystallized your soul into the Effloresced E.G.O "${localizeEnsembleName(char.egoName, 'en') || 'Unbowed'}".`
      : flags.includes('Distorted')
        ? ' At the breaking point of grief and psychic resonance, you surrendered to Carmen’s whisper and transformed into a Distortion.'
        : (char.resonance || 0) >= 40
          ? ` Your psyche resonated deeply with the Light, reaching ${char.resonance}% Resonance amidst the City’s horrors.`
          : '';

    lifeStoryParagraphsVi.push(`${careerArcVi}${milestoneTextVi}${egoOrDistortVi}`);
    lifeStoryParagraphsEn.push(`${careerArcEn}${milestoneTextEn}${egoOrDistortEn}`);
  }

  // Paragraph 3: Relationships, Loved Ones & Karma Scars
  const npcs = char.npcs || {};
  const spouseOrLover = npcs.spouse || npcs.lover;
  const childNpc = npcs.child;
  const partnerOrFriend = npcs.partner || npcs.mentor || npcs.friend;
  const bondPartsVi = [];
  const bondPartsEn = [];

  if (spouseOrLover) {
    const spName = spouseOrLover.nameVi || spouseOrLover.name || 'người thương';
    if (spouseOrLover.deceased || spouseOrLover.status === 'dead') {
      bondPartsVi.push(`Bạn từng tìm thấy hơi ấm hiếm hoi bên cạnh ${spName}, nhưng bi kịch đã cướp mất người ấy, để lại khoảng trống không gì bù đắp nổi`);
      bondPartsEn.push(`You once found rare warmth beside ${spName}, before tragedy tore them away and left an aching void`);
    } else {
      bondPartsVi.push(`Giữa thành phố lạnh lùng, bạn đã xây dựng được một mái nhà bình yên bên cạnh ${spName}`);
      bondPartsEn.push(`Amidst a merciless metropolis, you built a quiet sanctuary beside ${spName}`);
    }
  }
  if (childNpc) {
    const chName = childNpc.nameVi || childNpc.name || 'con của bạn';
    bondPartsVi.push(`truyền lại ngọn lửa sinh tồn cho người con ${chName}`);
    bondPartsEn.push(`passing the torch of survival to your child, ${chName}`);
  }
  if (partnerOrFriend) {
    const pfName = partnerOrFriend.nameVi || partnerOrFriend.name || 'người đồng hành';
    bondPartsVi.push(`sát cánh cùng tri kỷ ${pfName} qua những đêm dài hiểm nguy`);
    bondPartsEn.push(`standing shoulder to shoulder with ${pfName} through the darkest nights`);
  }

  const scarCount = (char.scars || []).length;
  const scarSentenceVi = scarCount > 0
    ? ` Trên cơ thể và tâm hồn bạn khắc sâu ${scarCount} vết sẹo không thể xóa nhòa (${char.scars.slice(0, 3).join(', ')}) — minh chứng sống động cho cái giá phải trả để tồn tại.`
    : ' Bạn khéo léo đi qua những cơn bão ngầm mà vẫn giữ được tâm hồn mình không bị vấy bẩn bởi những vết sẹo tâm thức.';
  const scarSentenceEn = scarCount > 0
    ? ` Etched across your flesh and psyche were ${scarCount} permanent Karma Scars (${char.scars.slice(0, 3).join(', ')}) — living proof of the price paid to endure.`
    : ' Through caution and resilience, you navigated the storms while keeping your psyche unmarred by permanent scars.';

  if (bondPartsVi.length > 0 || scarCount > 0) {
    const bondLeadVi = bondPartsVi.length > 0 ? `${bondPartsVi.join(', ')}.` : 'Bạn bước đi độc hành giữa hàng triệu bóng người xa lạ của The City.';
    const bondLeadEn = bondPartsEn.length > 0 ? `${bondPartsEn.join(', ')}.` : 'You walked a solitary road amidst the millions of strangers in the City.';
    lifeStoryParagraphsVi.push(`${bondLeadVi}${scarSentenceVi}`);
    lifeStoryParagraphsEn.push(`${bondLeadEn}${scarSentenceEn}`);
  }

  // Paragraph 4: Final Reckoning, Lifespan Comparison & Heirloom
  const lifeCompVi = lifespanDiff >= 0
    ? `thọ hơn mức tuổi trung bình của cư dân ${region.nameVi} (${localAvgLife} tuổi) tới +${lifespanDiff} năm`
    : `ngắn hơn mức tuổi thọ trung bình của ${region.nameVi} (${localAvgLife} tuổi) ${Math.abs(lifespanDiff)} năm`;
  const lifeCompEn = lifespanDiff >= 0
    ? `outliving the local average lifespan of ${region.nameEn} (${localAvgLife} yrs) by +${lifespanDiff} years`
    : `falling ${Math.abs(lifespanDiff)} years short of ${region.nameEn}’s average lifespan (${localAvgLife} yrs)`;

  if (char.endingId === 'library_threshold') {
    lifeStoryParagraphsVi.push(`Ở tuổi ${char.age}, bạn sống sót qua án của The Head và bị đẩy ra Outskirts. Nhiều ngày sau, giữa vùng đất không tên, bạn tìm thấy The Library. Bạn đặt tay lên tay nắm và đẩy cửa bước vào. Hồ sơ của bạn dừng ở đó.`);
    lifeStoryParagraphsEn.push(`At age ${char.age}, you survived the Head’s judgment and were cast into the Outskirts. Days later, in an unnamed waste, you found the Library. You took the handle and pushed the door open. Your record ends there.`);
  } else if (closedBy?.closing) {
    const closing = closedBy.closing({ age: char.age, relic: relicName });
    lifeStoryParagraphsVi.push(closing.vi);
    lifeStoryParagraphsEn.push(closing.en.replaceAll(relicName, relicNameEn));
  } else {
    lifeStoryParagraphsVi.push(
      `Ở tuổi ${char.age} (${lifeCompVi}), hành trình ấy khép lại: ${deathCauseVi}. Khi tấm màn sinh mệnh hạ xuống, bạn để lại 「${relicName}」, ${char.stats?.wealth ?? 0} Ahn tài sản cùng ${char.stats?.rep ?? 0} điểm uy danh cho thế hệ kế tiếp viết tiếp câu chuyện còn dang dở.`
    );
    lifeStoryParagraphsEn.push(
      `At age ${char.age} (${lifeCompEn}), your chronicle reached its final page: ${deathCauseEn}. When the curtain fell, you left behind "${relicNameEn}", ${char.stats?.wealth ?? 0} Ahn in wealth, and ${char.stats?.rep ?? 0} Reputation for the next generation to carry forward.`
    );
  }

  // Build Rich Records List (combining unlocked CODEX_RECORDS + contextual life achievements)
  const newKeysSet = new Set(char.newRecordsThisLife || []);
  const RARITY_ORDER = { miracle: 6, myth: 5, legend: 4, epic: 3, rare: 2, uncommon: 1, common: 0 };
  const RARITY_LABELS = {
    miracle: { vi: 'Thần tích', en: 'Miracle' },
    myth: { vi: 'Huyền thoại', en: 'Mythic' },
    legend: { vi: 'Truyền thuyết', en: 'Legendary' },
    epic: { vi: 'Sử thi', en: 'Epic' },
    rare: { vi: 'Hiếm', en: 'Rare' },
    uncommon: { vi: 'Khá hiếm', en: 'Uncommon' },
    common: { vi: 'Phổ biến', en: 'Common' }
  };

  const recordsList = (char.unlockedRecords || [])
    .map((key) => {
      const def = CODEX_RECORDS.find((r) => r.key === key);
      if (!def) return null;
      const tier = def.tier || 'common';
      const clearedDungeon = (char.dungeonRecord?.clears || []).find((clear) =>
        (key === 'lobotomy_containment_clear' && clear.id === 'dungeon_lobotomy_ruin') ||
        (key === 'outskirts_ruins_clear' && clear.id === 'dungeon_outskirts_ruins') ||
        (key === 'great_lake_clear' && clear.id === 'dungeon_great_lake') ||
        (key === 'dungeon_first_clear' && Boolean(clear.id))
      );
      const dungeonName = clearedDungeon && DUNGEON_DEFINITIONS[clearedDungeon.id];
      const colorTitle = char.colorTitleAtAward || char.customTitle;
      const directorName = char.directorAppointment?.name ||
        (char.affiliation?.director ? char.affiliation.name : null);
      return {
        key,
        vi: key === 'color_fixer' && colorTitle ? `Color Fixer: ${colorTitle}` : def.vi,
        en: key === 'color_fixer' && colorTitle ? `Color Fixer: ${colorTitle}` : def.en,
        hintVi: def.hintVi,
        hintEn: def.hintEn,
        evidenceVi: key === 'color_fixer' && char.colorAwardAge != null
          ? `Hana trao sắc chỉ ở tuổi ${char.colorAwardAge}.`
          : key === 'association_director' && directorName
            ? `Đã giữ ghế Director của ${directorName}.`
            : dungeonName ? `Tuổi ${clearedDungeon.age}: hoàn thành ${dungeonName.titleVi}.` : null,
        evidenceEn: key === 'color_fixer' && char.colorAwardAge != null
          ? `Hana conferred the title at age ${char.colorAwardAge}.`
          : key === 'association_director' && directorName
            ? `Held the Director's chair at ${directorName}.`
            : dungeonName ? `Age ${clearedDungeon.age}: cleared ${dungeonName.titleEn}.` : null,
        tier,
        rarityVi: RARITY_LABELS[tier]?.vi || 'Phổ biến',
        rarityEn: RARITY_LABELS[tier]?.en || 'Common',
        isNew: newKeysSet.has(key)
      };
    })
    .filter(Boolean);

  if (flags.includes('FullBodyProsthetic') && !recordsList.some(r => r.key === 'fine_prosthetic')) {
    recordsList.push({
      key: 'fine_prosthetic',
      vi: 'Phẫu thuật cơ thể cơ khí toàn phần',
      en: 'Underwent fine prosthetic surgery',
      hintVi: 'Thay thế cơ thể sinh học bằng khung cơ khí cao cấp.',
      hintEn: 'Replaced biological flesh with a high-grade prosthetic frame.',
      tier: 'common',
      rarityVi: 'Phổ biến',
      rarityEn: 'Common',
      isNew: false
    });
  }

  recordsList.sort((a, b) => {
    const rarity = (RARITY_ORDER[b.tier] || 0) - (RARITY_ORDER[a.tier] || 0);
    if (rarity) return rarity;
    if (a.isNew !== b.isNew) return a.isNew ? -1 : 1;
    return a.vi.localeCompare(b.vi, 'vi');
  });

  // Build Final State Tags (Traits, Relationships, Equipment, Encounters & Scars)
  const lifeTags = [];
  if (flags.includes('Married') || npcIsActive(char.npcs?.spouse)) {
    lifeTags.push({ vi: 'Đã lập gia đình', en: 'Has a family', kind: 'bond' });
  } else if (npcIsActive(char.npcs?.lover)) {
    lifeTags.push({ vi: 'Có người thương', en: 'Has a lover', kind: 'bond' });
  }
  if (npcIsActive(char.npcs?.child) || flags.includes('HasChild')) {
    lifeTags.push({ vi: 'Có con nối dõi', en: 'Has a child', kind: 'bond' });
  }
  if (npcIsActive(char.npcs?.partner)) {
    lifeTags.push({ vi: 'Có cộng sự sinh tử', en: 'Sworn partner', kind: 'bond' });
  }
  if (char.job === 'Fixer') {
    lifeTags.push({ vi: `Thẻ Fixer Grade ${char.fixerGrade}`, en: `Grade ${char.fixerGrade} Fixer ID`, kind: 'career' });
  } else if (char.job === 'Wing Employee') {
    lifeTags.push({ vi: 'Thẻ nhân viên Wing', en: 'Wing employee ID', kind: 'career' });
  } else if (char.job === 'Syndicate') {
    lifeTags.push({ vi: `Huy hiệu ${char.finger ? `The ${char.finger}` : 'Syndicate'}`, en: `${char.finger ? `The ${char.finger}` : 'Syndicate'} Crest`, kind: 'career' });
  } else if (char.job === 'Workshop Craftsman') {
    lifeTags.push({ vi: 'Chứng nhận Thợ rèn Tres', en: 'Tres Atelier License', kind: 'career' });
  }
  if (char.org?.name) {
    lifeTags.push({ vi: `Thuộc ${char.org.name}`, en: `Affiliated: ${char.org.name}`, kind: 'career' });
  }
  if (flags.includes('FullBodyProsthetic') || flags.includes('ProstheticClinic')) {
    lifeTags.push({ vi: 'Cơ thể cơ khí tinh xảo', en: 'Fine prosthesis', kind: 'tech' });
  }
  if (char.craftWeapon) {
    lifeTags.push({ vi: `Vũ khí: ${char.craftWeapon.name}`, en: `Weapon: ${char.craftWeapon.name}`, kind: 'tech' });
  }
  if ((char.resonance || 0) >= 25) {
    lifeTags.push({ vi: 'Đã tiếp xúc Dị thể (Abnormality)', en: 'Has seen an Abnormality', kind: 'lore' });
  }
  if ((char.resonance || 0) >= 50 || flags.includes('Distorted') || flags.includes('EGOAwakened')) {
    lifeTags.push({ vi: 'Chứng kiến hiện tượng Distortion', en: 'Witnessed a Distortion', kind: 'lore' });
  }
  if (char.backgroundTrait?.nameVi) {
    lifeTags.push({ vi: char.backgroundTrait.nameVi, en: char.backgroundTrait.nameEn || char.backgroundTrait.nameVi, kind: 'trait' });
  }
  (char.scars || []).slice(0, 5).forEach((s) => {
    lifeTags.push({ vi: `Sẹo: ${s}`, en: `Scar: ${s}`, kind: 'scar' });
  });
  const ambition = AMBITIONS.find((goal) => goal.id === char.ambition?.id);
  const ambitionAchieved = Boolean(ambition && (char.ambition.complete || ambitionComplete(char)));
  if (ambition) lifeTags.push({
    vi: `${ambitionAchieved ? 'Đã đạt' : 'Dở dang'}: ${ambition.vi}`,
    en: `${ambitionAchieved ? 'Fulfilled' : 'Unfinished'}: ${ambition.en}`,
    kind: ambitionAchieved ? 'achievement' : 'ambition'
  });
  if (char.ensembleScore) lifeTags.push({ vi: 'Sống sót qua buổi diễn của Reverberation Ensemble', en: 'Survived the Reverberation Ensemble performance', kind: 'achievement' });

  return {
    endingId: char.endingId || null,
    ambitionId: ambition?.id || '',
    ambitionAchieved,
    ensembleScore: Boolean(char.ensembleScore),
    lifeEnding: char.lifeEnding || null,
    generation: char.generation,
    seed: char.seed,
    name: char.name,
    age: char.age,
    regionId: char.regionId,
    regionNameVi: region.nameVi,
    regionNameEn: region.nameEn,
    birthRegionNameVi: birthRegion.nameVi,
    birthRegionNameEn: birthRegion.nameEn,
    familyNameVi: family.nameVi || 'Gia đình bình thường',
    familyNameEn: family.nameEn || 'Ordinary family',
    job: char.job,
    signatureRecordKey: char.job === 'Distortion' || flags.includes('Distorted') ? 'distortion_awaken' : null,
    occupationVi,
    occupationEn,
    epitaphTitleVi,
    epitaphTitleEn,
    poeticQuoteVi,
    poeticQuoteEn,
    localAvgLife,
    lifespanDiff,
    rankTier,
    deathCauseVi,
    deathCauseEn,
    health: Math.max(0, char.stats?.health ?? 0),
    sanity: Math.max(0, char.stats?.sanity ?? 0),
    wealth: char.stats?.wealth ?? 0,
    rep: char.stats?.rep ?? 0,
    network: char.stats?.network ?? 0,
    resonance: char.resonance || 0,
    merit: char.merit || 0,
    scars: [...(char.scars || [])],
    relic: relicName,
    relicEn: relicNameEn,
    lifeStoryParagraphsVi,
    lifeStoryParagraphsEn,
    turningPoints: turningPoints.slice(0, 8),
    recordsList,
    newRecordsCount: recordsList.filter(r => r.isNew).length,
    lifeTags,
    successorRelation,
    successorInfo: succInfo,
    successorType: succInfo.type,
    successorTitleVi: succInfo.titleVi,
    successorTitleEn: succInfo.titleEn,
    successorIntroVi: succInfo.introVi,
    successorIntroEn: succInfo.introEn,
    childAgeWhenParentDied,
    hasChild: npcIsActive(char.npcs?.child),
    childName: char.npcs?.child?.nameVi || '',
    hasVendetta: (char.heat || 0) >= 40 || flags.includes('MiddleVendetta'),
    npcs: char.npcs || {},
    ...extractAncestorEchoProfile(char)
  };
}

export { isIndependentSyndicateEligibleForRank };

export {
  DUNGEON_DEFINITIONS,
  createDungeonSession,
  getDungeonCurrentStage,
  getDungeonMastery,
  isDungeonChoiceAvailable,
  evaluateDungeonChoiceOdds,
  DUNGEON_BALANCE,
  getStrainTier,
  dungeonSupplyState,
  setDungeonStance,
  useDungeonSupply,
  playDungeonCard,
  cardPlayable,
  cardBudgetLeft,
  DUNGEON_CARDS,
  CARD_BUDGET,
  useDungeonEgo,
  dungeonEgoState,
  egoChargesOf,
  resolveDungeonChoice,
  fleeDungeon
} from './dungeonEngine.js';
