// ============================================================================
// CORE LIFE-SIMULATION & GENERATIONAL BLOODLINE ENGINE
// Connects World Data, Event Pools, Persistent NPCs, Tension Clocks & Weaver AI
// ============================================================================

import { CHILDHOOD_EVENTS } from '../data/eventsChildhood.js';
import { CHILDHOOD_EVENTS_2 } from '../data/eventsChildhood2.js';
import { LINEAGE_LEGACY_EVENTS } from '../data/eventsLineageLegacy.js';
import { BACKGROUND_OPENING_EVENTS } from '../data/eventsBackgroundOpening.js';
import { NAMING_ROLES, sanitizeNpcName, formatNpcTrait, replaceWholeName, getNpcNamingPrompt, syncNpcNamingPrompt, applyNpcName } from './npcNaming.js';
export { NAMING_ROLES, sanitizeNpcName, formatNpcTrait, replaceWholeName, getNpcNamingPrompt, syncNpcNamingPrompt, applyNpcName };
import { generatePersonName } from '../data/nameGenerator.js';
import { FACTION_EVENTS } from '../data/eventsFactions.js';
import { EXPANSION_EVENTS } from '../data/eventsExpansion.js';
import { SUPERNATURAL_EVENTS } from '../data/eventsSupernatural.js';
import { FIXER_PATH_EVENTS } from '../data/eventsFixerPath.js';
import { DISTORTION_PATH_EVENTS } from '../data/eventsDistortionPath.js';
import { DISTORTION_OVERHAUL_EVENTS } from '../data/eventsDistortionOverhaul.js';
import { WORKSHOP_ECONOMY_EVENTS } from '../data/eventsWorkshopEconomy.js';
import { BEREAVEMENT_EVENTS } from '../data/eventsBereavementMemories.js';
import { DERIVATIVE_LORE_EVENTS } from '../data/eventsDerivativeLore.js';
import { DUNGEON_OBJECTIVE_EVENTS } from '../data/dungeonObjectives.js';
import { COMPANION_QUEST_EVENTS } from '../data/eventsCompanionQuests.js';
import { CAREER_DRAMA_EVENTS } from '../data/eventsCareerDrama.js';
import { EXPANSION_STORY_EVENTS } from '../data/eventsNpcAndWorldExpansion.js';
import { DUNGEON_GATE_EVENTS } from '../data/eventsDungeonGates.js';
import { DUNGEON_GATE_EVENTS_2 } from '../data/eventsDungeonGates2.js';
import { EGO_COLOR_EVENTS } from '../data/eventsEgoColorPerks.js';
import { APEX_COLOR_EVENTS } from '../data/apexPath.js';
import { APEX_TWILIGHT_EVENTS, ELDER_TWILIGHT_EVENTS } from '../data/eventsApexTwilight.js';
import { BRANCH_DEPTH_EVENTS } from '../data/eventsBranchDepth.js';
import { WORKSHOP_VISIT_EVENTS } from '../data/eventsWorkshopVisits.js';
import { FINGER_STORY_EVENTS } from '../data/eventsFingers.js';
import { WING_STORY_EVENTS } from '../data/eventsWing.js';
import { EGO_LEAP_EVENTS } from '../data/eventsEgoLeap.js';
import { AFFILIATION_EVENTS } from '../data/eventsAffiliation.js';
import { ENSEMBLE_EVENTS } from '../data/dungeonEnsemble.js';
import { COLOR_CAREER_EVENTS } from '../data/eventsColorCareerArc.js';
import { COLOR_ERA_EVENTS } from '../data/eventsColorEras.js';
import { WING_THREAD_EVENTS } from '../data/eventsWingThreads.js';
import { DISTORTION_VOICE_EVENTS } from '../data/eventsDistortionVoice.js';
import { WING_PARITY_MAJORS } from '../data/eventsWingParityExpansion.js';
import { DISTORTION_PARITY_MAJORS } from '../data/eventsDistortionParityExpansion.js';
import { ROUTE_CONSEQUENCE_EVENTS } from '../data/eventsRouteConsequences.js';
import { DUNGEON_ECHO_EVENTS } from '../data/eventsDungeonEchoes.js';
import { FINGERS_GAMBLE_EVENTS } from '../data/eventsFingersGambleSuite.js';
import { hasAwakenedEgo } from './egoEdge.js';
import { isIndependentSyndicateEligibleForRank, getNextIndependentSyndicatePromotion } from './eventConditions.js';
import { getPromotionProgress } from './careerPipeline.js';
import { activeScarCount } from './scarModel.js';
export { rollBirthRegion, rollBirthFamily, createNewCharacter, cloneChar } from './characterCreation.js';
export { INDEPENDENT_SYNDICATE_RANKS, WING_RANKS, getNextCareerMilestone, getEgoReadiness, checkPromotions } from './careerMilestones.js';
export { generateFixerContract, resolveFixerContract } from './fixerContracts.js';
export { woundDeath, applyFatalOrCompanionSave, closeLifeByChoice, handleSanityBreakdown, applyColorTrialCompanionState } from './lifeEnding.js';
export { resolveEventChoice } from './eventResolution.js';
export { buildLifeSummaryAndLegacy } from './lifeSummary.js';

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
  // only ever opened by a dungeon's last stage (causalOnly keeps them out of ordinary draws)
  ...DUNGEON_OBJECTIVE_EVENTS,
  ...COMPANION_QUEST_EVENTS,
  ...CAREER_DRAMA_EVENTS,
  ...EXPANSION_EVENTS,
  ...EXPANSION_STORY_EVENTS,
  ...DUNGEON_GATE_EVENTS,
  ...DUNGEON_GATE_EVENTS_2,
  ...EGO_COLOR_EVENTS,
  ...APEX_COLOR_EVENTS,
  ...APEX_TWILIGHT_EVENTS,
  ...ELDER_TWILIGHT_EVENTS,
  ...BRANCH_DEPTH_EVENTS,
  ...WORKSHOP_VISIT_EVENTS,
  ...FINGER_STORY_EVENTS,
  ...WING_STORY_EVENTS,
  ...EGO_LEAP_EVENTS,
  ...AFFILIATION_EVENTS,
  ...ENSEMBLE_EVENTS,
  ...COLOR_CAREER_EVENTS,
  ...COLOR_ERA_EVENTS,
  ...WING_THREAD_EVENTS,
  ...DISTORTION_VOICE_EVENTS,
  ...WING_PARITY_MAJORS,
  ...DISTORTION_PARITY_MAJORS,
  ...ROUTE_CONSEQUENCE_EVENTS,
  ...DUNGEON_ECHO_EVENTS,
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
    .replace(/\{departed\}/g, char.recentBereavementNameVi || 'Người ấy')
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
 * Helper to clone and normalize character object so getters stay intact
 */
/** A cause of death often already ends in a full stop; adding another printed two. */
export const endSentence = (text) => (/[.!?…”"’)]$/.test(text) ? text : `${text}.`);

/** Records how a Color name was reached, so the years after it can speak to that: young, or grown from an E.G.O. */
export function markColorInvestiture(char) {
  if (char.colorAwardAge !== char.age) return;
  if (char.age < 45 && !char.flags.includes('ColorYoung')) char.flags.push('ColorYoung');
  if (hasAwakenedEgo(char) && !char.flags.includes('ColorFromEGO')) char.flags.push('ColorFromEGO');
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

export { isIndependentSyndicateEligibleForRank, getNextIndependentSyndicatePromotion, getPromotionProgress };

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
