import { advanceActiveNarrativeArcs } from './narrativeArcEngine.js';
import { choiceIsAvailable, matchesEventContext, mergeEffects, npcIsActive } from './eventConditions.js';
import { ITEMS_CATALOG } from '../data/itemsData.js';
import { rollPerinatalFate } from './fateEngine.js';
import { rollTraits, traitsOf, varyEffects, PRINTED_NUMBERS } from './variance.js';
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
  THREAT_TIERS
} from '../data/worldData.js';
import { CHILDHOOD_EVENTS, CONSEQUENCE_EVENTS } from '../data/eventsChildhood.js';
import { CHILDHOOD_EVENTS_2 } from '../data/eventsChildhood2.js';
import { BACKGROUND_OPENING_EVENTS } from '../data/eventsBackgroundOpening.js';
import { composeBirth, makeNpc } from '../data/birthStories.js';
import { generatePersonName } from '../data/nameGenerator.js';
import { FACTION_EVENTS } from '../data/eventsFactions.js';
import { EXPANSION_EVENTS } from '../data/eventsExpansion.js';
import { SUPERNATURAL_EVENTS, FIXER_REQUESTS } from '../data/eventsSupernatural.js';
import { FIXER_PATH_EVENTS } from '../data/eventsFixerPath.js';
import { DISTORTION_PATH_EVENTS } from '../data/eventsDistortionPath.js';
import { WORKSHOP_ECONOMY_EVENTS } from '../data/eventsWorkshopEconomy.js';
import { BEREAVEMENT_EVENTS } from '../data/eventsBereavementMemories.js';
import { DERIVATIVE_LORE_EVENTS } from '../data/eventsDerivativeLore.js';
import { COMPANION_QUEST_EVENTS } from '../data/eventsCompanionQuests.js';
import { CAREER_DRAMA_EVENTS } from '../data/eventsCareerDrama.js';
import {
  FIXER_LADDER,
  FINGER_LADDERS,
  COLOR_FIXER_REQ,
  getNextFixerPromotion,
  fixerPromotionOfferChance,
  fixerPromotionSuccessChance,
  fixerPromotionFailureEffects,
  checkColorFixerReadiness,
  getNextFingerPromotion,
  getNextWingPromotion,
  getOtherCareerPromotion,
  careerTrialForEvent,
  careerPromotionSuccessChance,
  careerPromotionFailureEffects,
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
import { BALANCE, isFixerCareerEvent, reputationGain } from './economyModel.js';
import { activeScarCount, addScar, normalizeScars, scarContractPower } from './scarModel.js';
import { weightedOutcomes } from './outcomeOdds.js';
import {
  DUNGEON_DEFINITIONS,
  createDungeonSession,
  getDungeonCurrentStage,
  isDungeonChoiceAvailable,
  resolveDungeonChoice,
  fleeDungeon
} from './dungeonEngine.js';

export const ALL_STORY_EVENTS = [
  ...CHILDHOOD_EVENTS,
  ...CHILDHOOD_EVENTS_2,
  ...BACKGROUND_OPENING_EVENTS,
  ...FACTION_EVENTS,
  ...SUPERNATURAL_EVENTS,
  ...FIXER_PATH_EVENTS,
  ...DISTORTION_PATH_EVENTS,
  ...WORKSHOP_ECONOMY_EVENTS,
  ...BEREAVEMENT_EVENTS,
  ...DERIVATIVE_LORE_EVENTS,
  ...COMPANION_QUEST_EVENTS,
  ...CAREER_DRAMA_EVENTS,
  ...EXPANSION_EVENTS
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

export function createRNG(seedStr) {
  let [a, b, c, d] = cyrb128(String(seedStr || `${Date.now()}:${Math.random()}`));
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
  for (let i = 0; i < 15; i++) next(); // discard the warm-up outputs
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
export function interpolateText(text, char) {
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
  return text
    .replace(/\{name\}/g, char.name || '')
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
    } else if (parentLegacy.job === 'Fixer') {
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
  seed = '',
  preferredRegionId = 'RANDOM',
  preferredFamilyId = 'RANDOM',
  parentLegacy = null,
  startAge = 0
} = {}) {
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

  // Apply Generational Inheritance if continuing as Child / Disciple
  let lineageInfo = null;
  const inheritedEchoes = [];

  if (parentLegacy) {
    flags.push('HuyếtThốngKếThừa');
    if (!unlockedRecords.includes('lineage_heir')) unlockedRecords.push('lineage_heir');
    wealth = clamp(wealth + Math.round((parentLegacy.wealth || 0) * 0.22), 2, 75);
    rep = clamp(rep + Math.round((parentLegacy.rep || 0) * 0.15), 1, 50);
    network = clamp(network + Math.round((parentLegacy.network || 0) * 0.18), 1, 50);

    lineageInfo = {
      generation,
      parentName: parentLegacy.name,
      parentAge: parentLegacy.age || 0,
      parentTitle: parentLegacy.epitaphTitleVi,
      parentJob: parentLegacy.job,
      parentDeathVi: parentLegacy.deathCauseVi,
      parentDeathEn: parentLegacy.deathCauseEn,
      relic: parentLegacy.relic || (parentLegacy.age < 16 ? `Kỷ vật của ${parentLegacy.name}` : `Di vật của ${parentLegacy.name}`),
      inheritedDebt: Boolean(parentLegacy.hasVendetta),
      successorRelation: parentLegacy.successorRelation || (parentLegacy.age < 14 ? 'sibling' : parentLegacy.age < 18 ? 'companion' : parentLegacy.hasChild ? 'child' : 'heir')
    };

    inheritedEchoes.push({
      labelVi: `Thừa kế từ ${parentLegacy.name}: ${parentLegacy.relic}`,
      labelEn: `Inherited legacy of ${parentLegacy.name} (${parentLegacy.relic})`,
      impactVi: `Thêm Ahn lúc đầu, và người cũ của ${parentLegacy.name} có thể tìm đến`,
      impactEn: `+Starting Ahn, unlocks Heirloom & Old Comrade causal events`
    });

    if (parentLegacy.hasVendetta) {
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
  }

  let deathAtChildAge = 0;
  if (parentLegacy && parentLegacy.age >= 18) {
    const parentChildBirthAge = Math.min(parentLegacy.age - 1, Math.max(18, parentLegacy.age - 18));
    deathAtChildAge = Math.max(1, parentLegacy.age - parentChildBirthAge);
  }

  const parentNpc = parentLegacy ? {
    id: 'npc_parent',
    name: parentLegacy.name,
    nameVi: parentLegacy.name,
    nameEn: parentLegacy.name,
    role: 'parent',
    job: parentLegacy.job,
    relic: parentLegacy.relic,
    alive: actualAge < deathAtChildAge,
    deathAgeInChildLife: deathAtChildAge
  } : null;

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
        ? `At age ${actualAge}, the caravan stops beyond the City wall. You carry 「${lineageInfo?.relic || 'an old keepsake'}」 from ${parentLegacy?.name || 'the one before you'} and choose your next road.`
        : `At age ${actualAge}, ${parentLegacy ? parentLegacy.name : 'your predecessor'} fell in the perils of The City. You take up 「${lineageInfo?.relic || 'Relic'}」 and begin your own path.`
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
        let legacyEn = `You are the child of ${lineageInfo.parentName}. All they left you was 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', and a blood debt to a Syndicate.' : '.'}`;

        if (lineageInfo.successorRelation === 'sibling' || (lineageInfo.parentAge > 0 && lineageInfo.parentAge < 14)) {
          legacyVi = `${lineageInfo.parentName} mất năm ${lineageInfo.parentAge} tuổi khi chưa kịp lớn. Bạn là em ruột (hoặc đứa trẻ cùng xóm) nhặt lại 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', cùng món nợ máu dở dang với Syndicate.' : '.'}`;
          legacyEn = `${lineageInfo.parentName} died young at age ${lineageInfo.parentAge}. You are a younger sibling (or local child) who found their 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', along with an unsettled Syndicate blood debt.' : '.'}`;
        } else if (lineageInfo.successorRelation === 'companion' || (lineageInfo.parentAge >= 14 && lineageInfo.parentAge < 18)) {
          legacyVi = `${lineageInfo.parentName} ngã xuống năm ${lineageInfo.parentAge} tuổi. Bạn là người tiếp bước mang theo 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', cùng món nợ máu dở dang với Syndicate.' : '.'}`;
          legacyEn = `${lineageInfo.parentName} fell at age ${lineageInfo.parentAge}. You are the one who took up their 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', along with an unsettled Syndicate blood debt.' : '.'}`;
        } else if (lineageInfo.successorRelation === 'heir') {
          legacyVi = `${lineageInfo.parentName} qua đời năm ${lineageInfo.parentAge} tuổi mà không có con cái. Bạn là hậu bối tiếp nhận 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', và món nợ máu của người ấy.' : '.'}`;
          legacyEn = `${lineageInfo.parentName} passed away at age ${lineageInfo.parentAge} without an heir. You are the successor taking up 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', and their Syndicate blood debt.' : '.'}`;
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
    age: actualAge,
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
    fixerGrade: 9,
    lastFixerExamAge: null,
    fixerTrialRetryGrade: null,
    merit: actualAge >= 18 ? 10 : 0,
    finger: actualAge >= 18 && parentLegacy?.job === 'Syndicate' ? parentLegacy?.finger : null,
    fingerRank: actualAge >= 18 && parentLegacy?.job === 'Syndicate' ? 1 : 0,
    wingRank: 0,
    org: null,
    customTitle: null,
    egoName: null,
    craftWeapon: null,
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
      mentor: null,
      partner: null,
      spouse: null,
      child: null,
      nemesis: null
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
export function cloneChar(char) {
  const scarState = normalizeScars(char);
  const copy = {
    ...char,
    stats: { ...char.stats },
    flags: [...char.flags],
    scars: scarState.scars,
    scarHistory: scarState.scarHistory,
    npcs: structuredClone(char.npcs || {}),
    weaver: structuredClone(char.weaver),
    inventory: structuredClone(char.inventory || []),
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
  const unlock = (key) => {
    if (!char.unlockedRecords.includes(key)) {
      char.unlockedRecords.push(key);
    }
  };

  if (char.age >= 70 && char.alive) unlock('elder_survivor_70');
  if (char.stats.wealth >= 95) unlock('wealth_tycoon');
  if (char.flags.includes('Feather') || char.flags.includes('Nest')) unlock('nest_migration');
  if (char.npcs?.spouse) unlock('family_built');
  if (char.generation >= 3) unlock('dynasty_gen3');
  if (char.generation >= 5) unlock('dynasty_gen5');

  if (char.job === 'Fixer') {
    unlock('fixer_license');
    if (char.fixerGrade <= 5) unlock('fixer_grade5');
    if (char.fixerGrade <= 1) unlock('fixer_grade1');
    if (char.fixerGrade === 0 || char.flags.includes('ColorFixer')) unlock('color_fixer');
  }
  if (char.org?.type === 'assoc') unlock('assoc_joined');
  if (char.merit >= 80) unlock('liu_warfare_flame');
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

  if (char.seenEvents.some((id) => id.includes('night_in_backstreets') || id.includes('sweeper')) && char.alive) {
    unlock('survive_night');
  }
  if (char.seenEvents.some((id) => id.includes('warp_train') || id.includes('w_corp')) && char.alive) {
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

  // 1. Childhood (Age < 18)
  if (char.age < 18 || char.job === 'Child') {
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
          { labelVi: 'Đạt tuổi 7', labelEn: 'Reach Age 7', current: curAge, target: targetAge, met: curAge >= targetAge },
          { labelVi: 'Sinh lực an toàn (HP)', labelEn: 'Safe Health (HP)', current: curHp, target: targetHp, met: curHp >= targetHp },
          { labelVi: 'Tỉnh táo an toàn (SP)', labelEn: 'Safe Sanity (SP)', current: curSp, target: targetSp, met: curSp >= targetSp }
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
          { labelVi: 'Đạt tuổi 14', labelEn: 'Reach Age 14', current: curAge, target: targetAge, met: curAge >= targetAge },
          { labelVi: 'Mối quan hệ (Network)', labelEn: 'Network', current: curNet, target: targetNet, met: curNet >= targetNet },
          { labelVi: 'Bạn bè / Người thân đồng hành', labelEn: 'Companions', current: activeNpcs, target: targetNpcs, met: activeNpcs >= targetNpcs }
        ],
        tipVi: 'Kết thân với bạn bè hoặc người thầy, học hỏi quy tắc sinh tồn ở Backstreets hoặc Nest.',
        tipEn: 'Befriend companions or mentors, learning the survival codes of the City.'
      };
    }

    // Age 14 - 17: Preparing for Age 18 Crossroads
    const curAge = char.age;
    const targetAge = 18;
    const curMerit = char.merit || 0;
    const curWealth = char.stats?.wealth ?? char.wealth ?? 0;
    const curRep = char.stats?.rep ?? char.rep ?? 0;

    const pAge = Math.min(100, (curAge / targetAge) * 100);
    const pStat = Math.min(100, Math.max((curMerit / 8) * 100, (curWealth / 12) * 100, (curRep / 10) * 100));
    const progressPct = Math.round((pAge * 0.6) + (pStat * 0.4));

    return {
      category: 'CAREER CROSSROADS (AGE 18)',
      titleVi: 'Chuẩn bị bước ngoặt cuộc đời (Tuổi 18)',
      titleEn: 'Preparation for Age 18 Crossroads',
      progressPct,
      requirements: [
        { labelVi: 'Đạt tuổi trưởng thành (18)', labelEn: 'Reach Adulthood (18)', current: curAge, target: targetAge, met: curAge >= targetAge },
        { labelVi: 'Tích lũy nền tảng (Merit, Ahn hoặc Rep)', labelEn: 'Merit, Ahn or Rep', current: Math.max(curMerit, curWealth, curRep), target: 10, met: Math.max(curMerit, curWealth, curRep) >= 10 }
      ],
      tipVi: 'Tại tuổi 18, bạn sẽ quyết định con đường: Hana Fixer, Syndicate, Wing Feather hay Workshop.',
      tipEn: 'At age 18, you will choose your path: Hana Fixer, Syndicate, Wing Feather, or Workshop.'
    };
  }

  // 2. Fixer Career
  if (char.job === 'Fixer') {
    if (char.fixerGrade === 0) {
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
          { labelVi: 'Chiến công tối thượng (Merit)', labelEn: 'Merit', current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit },
          { labelVi: 'Danh tiếng vang dội (Rep)', labelEn: 'Reputation', current: (char.stats?.rep ?? char.rep) || 0, target: targetRep, met: ((char.stats?.rep ?? char.rep) || 0) >= targetRep }
        ],
        tipVi: 'Bạn là một Color. Tên tuổi bạn sánh ngang Red Mist hay Black Silence, ghi dấu vào lịch sử.',
        tipEn: 'You are a Color. Your name stands alongside the Red Mist and Black Silence.'
      };
    }

    if (char.fixerGrade === 1) {
      const readiness = checkColorFixerReadiness(char);
      const targetMerit = readiness.targetMerit;
      const targetRep = readiness.targetRep;
      const curRep = (char.stats?.rep ?? char.rep) || 0;
      const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
      const p2 = Math.min(100, (curRep / targetRep) * 100);
      const progressPct = Math.round((p1 + p2) / 2);

      return {
        category: 'STAR OF THE CITY ORDEAL',
        titleVi: 'Đại Khảo Thí Phong Color (Hana Council)',
        titleEn: 'Hana Star of the City: Color Investiture',
        progressPct,
        requirements: [
          { labelVi: `Chiến công (Merit >= ${targetMerit})`, labelEn: `Merit (>= ${targetMerit})`, current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit },
          { labelVi: `Danh tiếng (Rep >= ${targetRep})`, labelEn: `Reputation (>= ${targetRep})`, current: curRep, target: targetRep, met: curRep >= targetRep },
          { labelVi: 'Tuổi để Hana xét hồ sơ', labelEn: 'Age for Hana review', current: char.age, target: 30, met: char.age >= 30 }
        ],
        tipVi: 'Đủ Merit và Rep thì Hana Association triệu tập đại khảo thí phong Color. E.G.O không phải điều kiện bắt buộc.',
        tipEn: 'With enough Merit and Rep, Hana Association convenes the Color Investiture trial. E.G.O is not a prerequisite.'
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
        { labelVi: 'Chiến công (Merit)', labelEn: 'Merit', current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit },
        { labelVi: 'Danh tiếng (Rep)', labelEn: 'Reputation', current: curRep, target: targetRep, met: curRep >= targetRep }
      ],
      tipVi: 'Nhận hợp đồng Fixer, giải quyết ủy thác từ Association hoặc can thiệp bạo lực để tích lũy Merit và Rep.',
      tipEn: 'Accept Fixer contracts, resolve Association requests, or survive clashes to earn Merit and Rep.'
    };
  }

  // 3. Syndicate Career
  if (char.job === 'Syndicate') {
    const finger = char.finger || 'Thumb';
    const ladder = FINGER_RANKS[finger] || FINGER_RANKS.Thumb;
    const currentRank = char.fingerRank || 0;

    if (currentRank >= ladder.length - 1) {
      return {
        category: `THE ${finger.toUpperCase()} SOVEREIGNTY`,
        titleVi: `Đỉnh cao quyền lực: ${ladder[currentRank]}`,
        titleEn: `Peak Authority: ${ladder[currentRank]}`,
        progressPct: 100,
        requirements: [
          { labelVi: 'Chiến công (Merit)', labelEn: 'Merit', current: char.merit || 0, target: FINGER_LADDERS[finger]?.[2]?.meritReq || 115, met: true }
        ],
        tipVi: 'Bạn đã là người đứng đầu một nhánh của Ngón. Mệnh lệnh của bạn là luật trong hẻm.',
        tipEn: 'You hold supreme authority within your Finger branch. Your word is alley law.'
      };
    }

    const nextRank = currentRank + 1;
    const nextTitle = ladder[nextRank];
    const minAge = [0, 22, 28, 35][nextRank];
    const yearsInRank = currentRank === 0 || char.lastFingerPromotionAge == null ? 3 : Math.max(0, char.age - char.lastFingerPromotionAge);
    const nextStep = FINGER_LADDERS[finger]?.[nextRank - 1];
    const targetMerit = nextStep?.meritReq || nextRank * 26;
    const targetRep = nextStep?.repReq || nextRank * 16;
    const curRep = (char.stats?.rep ?? char.rep) || 0;
    const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
    const p2 = Math.min(100, (curRep / targetRep) * 100);
    const p3 = Math.min(100, (yearsInRank / 3) * 100);
    const p4 = finger === 'Thumb' ? Math.min(100, (char.age / minAge) * 100) : 100;
    const progressPct = Math.min(Math.round((p1 + p2) / 2), p3, p4);

    return {
      category: `THE ${finger.toUpperCase()} TRIAL`,
      titleVi: `Thăng bậc: ${nextTitle}`,
      titleEn: `Syndicate Rank: ${nextTitle}`,
      progressPct,
      requirements: [
        { labelVi: 'Công trạng với Ngón (Merit)', labelEn: 'Syndicate Merit', current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit },
        { labelVi: 'Uy danh giang hồ (Rep)', labelEn: 'Reputation', current: curRep, target: targetRep, met: curRep >= targetRep },
        ...(finger === 'Thumb' ? [{ labelVi: 'Tuổi tối thiểu', labelEn: 'Minimum age', current: char.age, target: minAge, met: char.age >= minAge }] : []),
        ...(currentRank > 0 ? [{ labelVi: 'Năm giữ bậc hiện tại', labelEn: 'Years at current rank', current: yearsInRank, target: 3, met: yearsInRank >= 3 }] : [])
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
        { labelVi: 'Hiệu suất công việc (Merit)', labelEn: 'Merit', current: char.merit || 0, target: target.merit, met: (char.merit || 0) >= target.merit },
        { labelVi: 'Cổ phần & Ahn (Wealth)', labelEn: 'Wealth (Ahn)', current: curWealth, target: target.wealth, met: curWealth >= target.wealth },
        { labelVi: 'Mối quan hệ nội bộ (Network)', labelEn: 'Network', current: curNet, target: target.network, met: curNet >= target.network },
        ...(currentRank > 0 ? [{ labelVi: 'Năm giữ chức hiện tại', labelEn: 'Years in current post', current: yearsInRank, target: 3, met: yearsInRank >= 3 }] : [])
      ],
      tipVi: 'Hoàn thành các dự án nghiên cứu của Wing, giữ quan hệ với ban quản trị và tích lũy Ahn.',
      tipEn: 'Deliver Wing research quotas, cultivate corporate ties, and amass Ahn.'
    };
  }

  if (char.job === 'Workshop Craftsman') {
    return {
      category: 'WORKSHOP',
      titleVi: 'M?t ng?y ? x??ng',
      titleEn: 'A Day at the Workshop',
      progressPct: 0,
      requirements: [],
      tipVi: 'Nh?n ??n ??t h?ng, gi? l? ho?t ??ng v? ch?n ng??i ???c c?m v? kh? b?n r?n.',
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
      { labelVi: 'Chiến công (Merit)', labelEn: 'Merit', current: char.merit || 0, target: 50, met: (char.merit || 0) >= 50 }
    ],
    tipVi: 'Gia tăng tài nguyên và tạo dựng danh tiếng trong khu vực.',
    tipEn: 'Build your wealth and cement your reputation across the District.'
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
        vi: `[The ${char.finger} Thông Báo] Bạn đã tích lũy đủ công trạng và uy danh để bước vào đại lễ thăng bậc: ${nextPromo.titleVi}!`,
        en: `[The ${char.finger} Notice] Your merits and renown qualify you for the advancement trial: ${nextPromo.titleEn}!`
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
        vi: `[Ban Giám Đốc Wing] Bạn đã đạt đủ chỉ tiêu hiệu suất và quan hệ để được xét duyệt thăng chức: ${nextPromo.titleVi}!`,
        en: `[Wing Directorate] You have fulfilled corporate quotas and are eligible for promotion: ${nextPromo.titleEn}!`
      });
    }
  }

  evaluateCharacterAchievements(char);
  return logsToAdd;
}

/**
 * Generates an interactive Fixer Contract with 3 tactical choices (Methodical, Bold, Seven Intel)
 */
export function generateFixerContract(char, rng) {
  const effGrade = char.fixerGrade === 0 ? 0 : char.fixerGrade;
  let maxTier = 0;
  if (effGrade <= 1) maxTier = 5;
  else if (effGrade <= 3) maxTier = 4;
  else if (effGrade <= 5) maxTier = 3;
  else if (effGrade <= 7) maxTier = 2;
  else maxTier = 1;

  const candidateReqs = FIXER_REQUESTS.filter(r => r.tier <= maxTier && r.tier >= Math.max(0, maxTier - 2));
  const template = candidateReqs[Math.floor(rng() * candidateReqs.length)] || FIXER_REQUESTS[0];
  const tierInfo = THREAT_TIERS[template.tier] || THREAT_TIERS[0];

  let power = 48 + (9 - effGrade) * 7.5;
  power += (char.stats.health - 50) * 0.25;
  power += (char.stats.sanity - 50) * 0.2;
  power += scarContractPower(char);
  if (char.flags.includes('고급장비') || char.flags.includes('유물') || char.craftWeapon) power += 12;
  if (char.flags.includes('EGOAwakened') || char.flags.includes('ShinAwakened')) power += 18;
  if (npcIsActive(char.npcs?.partner)) power += 9;

  const difficulty = 32 + template.tier * 16;
  const baseSuccess = clamp(Math.round(55 + (power - difficulty) * 1.1), 18, 94);
  const baseDeath = clamp(Math.round((100 - baseSuccess) * (0.12 + template.tier * 0.05)), 2, 42);
  const approachOdds = (successPct, wantedDeathPct) => {
    const deathPct = clamp(wantedDeathPct, 1, 100 - successPct);
    return { successPct, failPct: 100 - successPct - deathPct, deathPct };
  };

  return {
    id: `${template.id}_${char.age}`,
    template,
    tierInfo,
    approaches: [
      {
        id: 'careful',
        labelVi: 'Làm chậm mà chắc',
        labelEn: 'Slow and careful',
        ...approachOdds(clamp(baseSuccess + 8, 25, 96), Math.max(1, Math.round(baseDeath * 0.55))),
        payAhn: tierInfo.basePay,
        meritGain: tierInfo.baseMerit,
        costAhn: 0
      },
      {
        id: 'bold',
        labelVi: 'Xông vào, xong sớm (thêm 50% Ahn và Merit)',
        labelEn: 'Go in hard, finish fast (50% more Ahn and Merit)',
        ...approachOdds(clamp(baseSuccess - 8, 15, 90), clamp(Math.round(baseDeath * 1.45), 4, 55)),
        payAhn: Math.round(tierInfo.basePay * 1.5),
        meritGain: Math.round(tierInfo.baseMerit * 1.5),
        costAhn: 0
      },
      {
        id: 'intel',
        labelVi: 'Mua hồ sơ mục tiêu của Seven Association (8 Ahn)',
        labelEn: 'Buy the target file from Seven Association (8 Ahn)',
        ...approachOdds(clamp(baseSuccess + 18, 35, 98), 1),
        payAhn: tierInfo.basePay,
        meritGain: tierInfo.baseMerit + 3,
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
 * Resolves the player's chosen tactical approach on a Fixer Contract
 */
export function resolveFixerContract(charState, approachId, rng = Math.random) {
  const char = cloneChar(charState);
  const contract = char.pendingContract;
  if (!contract) return char;

  const approach = contract.approaches.find(a => a.id === approachId);
  if (!approach || char.stats.wealth < approach.costAhn) return char;
  const { template, tierInfo } = contract;
  char.pendingContract = null;

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
      vi: `[Từ chối ủy thác] Bạn trả lại hồ sơ ${template.nameVi || ''} trước khi nhận việc.${isHanaDispatch ? ' Hana ghi nhận một lần từ chối điều động; uy tín giảm 2.' : ' Không có thù lao hay công trạng.'}`,
      en: `[Contract Declined] You returned the file for ${template.nameEn || 'this assignment'} before accepting it.${isHanaDispatch ? ' Hana recorded a refused dispatch; reputation fell by 2.' : ' There is no pay or merit.'}`
    });
    char.weaver = updateDramaTension(char.weaver, char);
    return char;
  }

  const omenObj = FATE_OMENS.find((o) => o.id === char.fateOmenId);
  const meritMult = omenObj?.meritMult || 1.0;

  const roll = rng() * 100;
  if (roll < approach.successPct) {
    if (char.stats.health <= 25 && !char.unlockedRecords.includes('shi_boundary_of_death')) {
      char.unlockedRecords.push('shi_boundary_of_death');
    }
    const gainedMerit = Math.round(approach.meritGain * meritMult);
    char.stats.wealth = clamp(char.stats.wealth + approach.payAhn, 0, 100);
    char.stats.rep = clamp(char.stats.rep + reputationGain(char.stats.rep, Math.max(2, template.tier + 2)), 0, 100);
    char.merit += gainedMerit;
    char.logs.push({
      id: `log_req_ok_${char.age}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'choice',
      vi: `[Request hoàn thành · ${tierInfo.nameVi}] ${template.okVi}`,
      en: `[Request completed · ${tierInfo.nameEn}] ${template.okEn}`
    });
  } else if (roll < approach.successPct + approach.failPct) {
    const hpLoss = 10 + template.tier * 5;
    const spLoss = 6 + template.tier * 3;
    char.stats.health = clamp(char.stats.health - hpLoss, 0, 100);
    char.stats.sanity = clamp(char.stats.sanity - spLoss, 0, 100);
    char.resonance = clamp((char.resonance || 0) + 8, 0, 100);

    char.logs.push({
      id: `log_req_fail_${char.age}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'danger',
      vi: `[Request thất bại · ${tierInfo.nameVi}] ${template.failVi}`,
      en: `[Request failed · ${tierInfo.nameEn}] ${template.failEn}`
    });

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
      vi: '[Ống Tiêm K Corp Tự Động Kích Hoạt] Khi tim bạn vừa ngừng đập, dung dịch sinh học màu xanh lá của K Corp tự động bơm thẳng vào động mạch chủ. Mô tế bào và xương gãy tái tạo trong đau đớn dữ dội. Bạn sống sót qua vết thương chí mạng!',
      en: '[K Corp Ampoule Auto-Activated] As your heart flatlined, green K Corp biomass auto-injected into your aorta. Flesh and shattered bone reconstituted amid agony. You survived a fatal blow!'
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
 * Resolves a player's choice on a Story / Causal Event
 */
export function resolveEventChoice(charState, choiceIdx, rng = Math.random) {
  const char = cloneChar(charState);
  const event = char.pendingEvent;
  if (!event) return char;
  if (RETIRED_WORKSHOP_TRIAL_IDS.has(event.id)) {
    char.pendingEvent = null;
    return char;
  }

  const choice = event.choices?.[choiceIdx];
  if (!choiceIsAvailable(choice, char)) return char;
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
  const printsNumbers = PRINTED_NUMBERS.test(`${outcome.resultVi || outcome.rvi || ''}${choice.resultVi || choice.rvi || ''}`);
  const rolled = mergeEffects(choice, outcome);
  const effects = printsNumbers ? rolled : varyEffects(rolled, rng, traitsOf(char));
  if (/^fixer_promo_/.test(event.id) && effects.health < 0) effects.health = Math.ceil(effects.health * 0.65);
  if (choice.costAhn) effects.wealth = (effects.wealth || 0) - Math.max(0, choice.costAhn + Math.min(0, effects.wealth || 0));
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

  // Career / Faction / Region mutations
  const setJob = outcome.setJob || choice.setJob;
  if (char.job === 'Child' && setJob && setJob !== 'Child') char.merit = 0;
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

  const setOrg = outcome.setOrg || choice.setOrg;
  if (setOrg) char.org = setOrg;

  const setRegion = outcome.setRegion || choice.setRegion;
  if (setRegion) char.regionId = setRegion;

  const listedMerit = (choice.meritAdd || 0) + (outcome === choice ? 0 : outcome.meritAdd || 0);
  const meritAdd = isFixerCareerEvent(event) ? Math.round(listedMerit * BALANCE.fixerMeritScale) : listedMerit;
  if (meritAdd) {
    if (char.job === 'Child') {
      char.stats.rep = clamp((char.stats.rep || 0) + Math.round(meritAdd * 0.5), 0, 100);
    } else {
      char.merit = Math.max(0, char.merit + meritAdd);
    }
  }
  if (event.id.startsWith('fixer_promo_') && char.fixerGrade < previousFixerGrade) {
    const earnedAtGrade = FIXER_LADDER.find((step) => step.grade === char.fixerGrade)?.meritReq || 0;
    const nextRequirement = FIXER_LADDER.find((step) => step.grade === char.fixerGrade - 1)?.meritReq || COLOR_FIXER_REQ.merit;
    char.merit = Math.min(nextRequirement - 10,
      earnedAtGrade + Math.floor(Math.max(0, char.merit - earnedAtGrade) * 0.25));
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
  if (flagsRemove.length > 0) {
    char.flags = char.flags.filter(f => !flagsRemove.includes(f));
  }
  if (setRegion === 'OUTSKIRTS') {
    char.flags = char.flags.filter(f => f !== 'Nest' && f !== 'Feather');
    if (!char.flags.includes('Outskirts')) char.flags.push('Outskirts');
  } else if (setRegion) {
    char.flags = char.flags.filter(f => f !== 'Outskirts');
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
    if (!char.flags.includes('ColorFixer')) char.flags.push('ColorFixer');
  }

  // Micro-Dungeon Delve trigger
  const startDungeonId = outcome.startDungeon || choice.startDungeon;
  if (startDungeonId && char.alive) {
    char.pendingDungeon = createDungeonSession(startDungeonId, char, rng);
  }

  const textVi = interpolateText(outcome.resultVi || outcome.rvi || choice.resultVi || choice.rvi || '', char);
  const textEn = interpolateText(outcome.resultEn || outcome.ren || choice.resultEn || choice.ren || '', char);

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

  // Check if outcome caused immediate death or health <= 0
  if (outcome.deathCauseVi || char.stats.health <= 0) {
    const [woundVi, woundEn] = woundDeath(char, 'Gục ngã vì vết thương quá nặng', 'Succumbed to fatal wounds');
    applyFatalOrCompanionSave(char, outcome.deathCauseVi || woundVi, outcome.deathCauseEn || woundEn);
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

  let epitaphTitleVi = 'Một người dân bình thường của The City';
  let epitaphTitleEn = 'An ordinary citizen of the City';
  let rankTier = 'Canard';

  if (char.age === 0 && char.deathCauseVi) {
    epitaphTitleVi = 'Sinh linh chưa kịp thấy ánh mặt trời';
    epitaphTitleEn = 'A life lost before the first dawn';
    rankTier = 'Canard';
  } else if (char.flags.includes('ColorFixer')) {
    epitaphTitleVi = char.customTitle || 'Color Fixer';
    epitaphTitleEn = char.customTitle || 'Color Fixer';
    rankTier = 'Star of the City';
  } else if (char.flags.includes('EGOAwakened')) {
    epitaphTitleVi = `Người mang E.G.O 「${char.egoName || 'không tên'}」`;
    epitaphTitleEn = `Bearer of the E.G.O 「${char.egoName || 'nameless'}」`;
    rankTier = 'Star of the City';
  } else if (char.flags.includes('HongyuanHierarch')) {
    epitaphTitleVi = 'Gia chủ của Hongyuan';
    epitaphTitleEn = 'Family Hierarch of Hongyuan';
    rankTier = 'Star of the City';
  } else if (char.job === 'Fixer') {
    epitaphTitleVi = `Fixer Grade ${char.fixerGrade} · ${char.org?.name || 'tự do'}`;
    epitaphTitleEn = `Grade ${char.fixerGrade} Fixer · ${char.org?.name || 'Freelance'}`;
    rankTier = char.fixerGrade <= 2 ? 'Urban Nightmare' : (char.fixerGrade <= 5 ? 'Urban Plague' : 'Urban Legend');
  } else if (char.job === 'Syndicate') {
    const rankName =
      char.finger && FINGER_RANKS[char.finger]
        ? FINGER_RANKS[char.finger][char.fingerRank || 0]
        : 'Người của Syndicate';
    epitaphTitleVi = `${rankName} · ${char.finger ? `The ${char.finger}` : (char.org?.name || 'Backstreets')}`;
    epitaphTitleEn = `${rankName} · ${char.finger ? `The ${char.finger}` : (char.org?.name || 'Backstreets')}`;
    rankTier = (char.fingerRank || 0) >= 2 ? 'Urban Nightmare' : 'Urban Plague';
  } else if (char.job === 'Wing Employee') {
    epitaphTitleVi = `Feather của Wing · ${char.org?.name || region.nameVi}`;
    epitaphTitleEn = `Wing Feather Operative · ${char.org?.name || region.nameEn}`;
    rankTier = 'Urban Legend';
  } else if (char.job === 'Workshop Craftsman') {
    epitaphTitleVi = `Thợ rèn Workshop`;
    epitaphTitleEn = `Workshop Craftsman`;
    rankTier = char.craftWeapon ? 'Urban Nightmare' : 'Urban Legend';
  }

  const relicName =
    char.craftWeapon?.name ||
    (char.egoName ? `Mảnh E.G.O 「${char.egoName}」` : null) ||
    (char.customTitle ? `Huy hiệu Color 「${char.customTitle}」` : null) ||
    (char.lineage?.relic ? char.lineage.relic : (char.age < 16 ? `Kỷ vật của ${char.name}` : `Di vật của ${char.name}`));

  const succInfo = determineSuccessorType(char);
  let successorRelation = succInfo.type;
  let childAgeWhenParentDied = 0;
  if (char.age < 14) {
    successorRelation = 'sibling';
  } else if (char.age < 18) {
    successorRelation = 'companion';
  } else if (npcIsActive(char.npcs?.child)) {
    successorRelation = 'child';
    const parentChildBirthAge = Math.min(char.age - 1, Math.max(18, char.age - 18));
    childAgeWhenParentDied = Math.max(1, char.age - parentChildBirthAge);
  } else {
    successorRelation = succInfo.type;
    childAgeWhenParentDied = Math.max(1, Math.min(18, char.age - 5));
  }

  return {
    generation: char.generation,
    seed: char.seed,
    name: char.name,
    age: char.age,
    regionId: char.regionId,
    regionNameVi: region.nameVi,
    regionNameEn: region.nameEn,
    job: char.job,
    epitaphTitleVi,
    epitaphTitleEn,
    rankTier,
    deathCauseVi: char.deathCauseVi || 'Qua đời ở The City',
    deathCauseEn: char.deathCauseEn || 'Passed away in the City',
    wealth: char.stats.wealth,
    rep: char.stats.rep,
    network: char.stats.network,
    scars: [...char.scars],
    relic: relicName,
    successorRelation,
    successorInfo: succInfo,
    childAgeWhenParentDied,
    hasChild: npcIsActive(char.npcs?.child),
    childName: char.npcs?.child?.nameVi || '',
    hasVendetta: (char.heat || 0) >= 40 || char.flags.includes('MiddleVendetta')
  };
}

export {
  DUNGEON_DEFINITIONS,
  createDungeonSession,
  getDungeonCurrentStage,
  isDungeonChoiceAvailable,
  resolveDungeonChoice,
  fleeDungeon
} from './dungeonEngine.js';
