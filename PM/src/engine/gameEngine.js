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
} from '../data/worldData';
import { CHILDHOOD_EVENTS, CONSEQUENCE_EVENTS } from '../data/eventsChildhood';
import { composeBirth, makeNpc } from '../data/birthStories';
import { FACTION_EVENTS } from '../data/eventsFactions';
import { SUPERNATURAL_EVENTS, FIXER_REQUESTS } from '../data/eventsSupernatural';
import {
  FATE_OMENS,
  rollRandomFateOmen,
  createInitialWeaverState,
  selectEventWithWeaverAI,
  recordChoiceInGraph,
  updateDramaTension
} from './weaverAI';

export const ALL_STORY_EVENTS = [
  ...CHILDHOOD_EVENTS,
  ...FACTION_EVENTS,
  ...SUPERNATURAL_EVENTS
];

export const SEASONS = [
  { id: 'spring', vi: 'Mùa Xuân', en: 'Spring' },
  { id: 'summer', vi: 'Mùa Hạ', en: 'Summer' },
  { id: 'autumn', vi: 'Mùa Thu', en: 'Autumn' },
  { id: 'winter', vi: 'Mùa Đông', en: 'Winter' }
];

const FIRST_NAMES_VI = [
  'roland', 'angela', 'kali', 'garion', 'binah', 'chesed', 'gebura', 'hokma',
  'xiao', 'lowell', 'miris', 'philip', 'salvador', 'yuna', 'yujin', 'valentin',
  'tenma', 'olga', 'rain', 'mika', 'argalia', 'iori', 'vergil', 'faust',
  'yi sang', 'don quixote', 'ryoshu', 'meursault', 'hong lu', 'heathcliff',
  'ishmael', 'rodion', 'sinclair', 'outis', 'gregor', 'bamboo-hatted kim', 'kromer'
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
    .replace(/\{relic\}/g, relic)
    .replace(/\{partner\}/g, partner)
    .replace(/\{spouse\}/g, spouse)
    .replace(/\{child\}/g, child)
    .replace(/\{mentor\}/g, mentor)
    .replace(/\{scars\}/g, scars);
}

/**
 * Creates a new character (Generation 1 or Generational Heir of Generation N)
 * The newborn is also given a random fate omen.
 */
export function createNewCharacter({
  customName = '',
  seed = '',
  preferredRegionId = 'RANDOM',
  parentLegacy = null
} = {}) {
  const actualSeed = seed.trim() || freshSeed();
  const rng = createRNG(actualSeed);

  // Pick Region
  let region = null;
  if (preferredRegionId && preferredRegionId !== 'RANDOM') {
    region = REGIONS.find(r => r.id === preferredRegionId);
  }
  if (!region && parentLegacy?.regionId && rng() < 0.65) {
    region = REGIONS.find(r => r.id === parentLegacy.regionId);
  }
  if (!region) {
    const totalWeight = REGIONS.reduce((s, r) => s + (r.birthWeight || 1), 0);
    let pick = rng() * totalWeight;
    for (const r of REGIONS) {
      pick -= r.birthWeight || 1;
      if (pick <= 0) {
        region = r;
        break;
      }
    }
    if (!region) region = REGIONS[0];
  }

  // Pick Family Background strictly consistent with the birthplace Region
  const cityFamilies = FAMILIES.filter(f => f.id !== 'outskirts_nomad');
  let family = cityFamilies[Math.floor(rng() * cityFamilies.length)];

  if (region.id === 'OUTSKIRTS') {
    family = FAMILIES.find(f => f.id === 'outskirts_nomad') || FAMILIES[0];
  } else if (region.tags?.includes('head')) {
    // Districts A, B, C (The Head / Eye / Claw): strictly Nest Feather or Wing Executive households
    const headFamilies = cityFamilies.filter(f => ['nest_feather', 'wing_executive'].includes(f.id));
    family = headFamilies[Math.floor(rng() * headFamilies.length)] || family;
  } else if (region.tags?.includes('fallen_wing')) {
    // District 12 (Fallen L Corp): Nest collapsed into fog & Syndicate warzone, no active Wing Executives
    const fallenFamilies = cityFamilies.filter(f => ['orphan', 'backstreet_worker', 'fixer_lineage'].includes(f.id));
    family = fallenFamilies[Math.floor(rng() * fallenFamilies.length)] || family;
  } else if (parentLegacy) {
    if (parentLegacy.wealth >= 60) {
      family = FAMILIES.find(f => f.id === 'nest_feather') || family;
    } else if (parentLegacy.job === 'Fixer') {
      family = FAMILIES.find(f => f.id === 'fixer_lineage') || family;
    }
  }

  // Roll RNG Fate Omen at birth!
  const fateOmen = rollRandomFateOmen(rng, Boolean(parentLegacy));
  const omenMod = fateOmen.statMod || {};

  const defaultName =
    customName.trim() ||
    (parentLegacy?.childName
      ? parentLegacy.childName
      : formatName(FIRST_NAMES_VI[Math.floor(rng() * FIRST_NAMES_VI.length)]));

  const generation = parentLegacy ? (parentLegacy.generation || 1) + 1 : 1;

  // Base Stats (0 - 100) + RNG Fate Omen modifiers
  let health = clamp(65 + (family.statMod.health || 0) + (omenMod.health || 0) + Math.floor(rng() * 14 - 5), 25, 95);
  let sanity = clamp(65 + (family.statMod.sanity || 0) + (omenMod.sanity || 0) + Math.floor(rng() * 14 - 5), 25, 95);
  let wealth = clamp(28 + (family.statMod.wealth || 0) + (omenMod.wealth || 0) + Math.floor(rng() * 12 - 4), 5, 95);
  let network = clamp(18 + (family.statMod.network || 0) + Math.floor(rng() * 10 - 3), 0, 95);
  let rep = clamp(10 + (family.statMod.rep || 0) + Math.floor(rng() * 8), 0, 95);

  const flags = [...(family.flags || [])];
  const scars = [];
  const unlockedRecords = ['born_city'];
  let heat = clamp(omenMod.heat || 0, 0, 100);
  let taboo = clamp(omenMod.taboo || 0, 0, 2);
  let resonance = clamp(5 + (omenMod.resonance || 0), 0, 100);

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
    wealth = clamp(wealth + Math.round((parentLegacy.wealth || 0) * 0.38), 10, 100);
    rep = clamp(rep + Math.round((parentLegacy.rep || 0) * 0.25), 5, 100);
    network = clamp(network + Math.round((parentLegacy.network || 0) * 0.3), 5, 100);

    lineageInfo = {
      generation,
      parentName: parentLegacy.name,
      parentTitle: parentLegacy.epitaphTitleVi,
      parentJob: parentLegacy.job,
      parentDeathVi: parentLegacy.deathCauseVi,
      parentDeathEn: parentLegacy.deathCauseEn,
      relic: parentLegacy.relic || 'Huy hiệu cũ của người đi trước',
      inheritedDebt: Boolean(parentLegacy.hasVendetta)
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

  // The opening lines are assembled from independent random pieces (see birthStories.js)
  const birthKind = flags.includes('Outskirts') || region.id === 'OUTSKIRTS' ? 'out' : flags.includes('Nest') || flags.includes('Feather') ? 'nest' : 'back';
  const birth = composeBirth({
    kind: birthKind,
    familyId: family.id,
    omenId: fateOmen.id,
    regionVi: region.nameVi,
    regionEn: region.nameEn,
    name: defaultName,
    generation,
    rng
  });
  const initialLogs = birth.lines.map((line, i) => ({
    id: `log_birth_${i}`,
    age: 0,
    season: SEASONS[0],
    ...line
  }));

  if (lineageInfo) {
    initialLogs.push({
      id: 'log_legacy_0',
      age: 0,
      season: SEASONS[1],
      type: 'causal',
      vi: `Bạn là con của ${lineageInfo.parentName}. Thứ duy nhất người ấy để lại là 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', và một món nợ máu với Syndicate.' : '.'}`,
      en: `You are the child of ${lineageInfo.parentName}. All they left you was 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', and a blood debt to a Syndicate.' : '.'}`
    });
  }

  const weaver = createInitialWeaverState(fateOmen.id, inheritedEchoes);

  return {
    seed: actualSeed,
    generation,
    name: defaultName,
    age: 0,
    seasonIdx: 0,
    alive: true,
    deathCauseVi: null,
    deathCauseEn: null,
    regionId: region.id,
    familyId: family.id,
    fateOmenId: fateOmen.id,
    job: 'Child',
    fixerGrade: 9,
    merit: 0,
    finger: null,
    fingerRank: 0,
    wingRank: 0,
    org: null,
    customTitle: null,
    egoName: null,
    craftWeapon: null,
    stats: {
      health,
      sanity,
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
    scars,
    npcs: {
      friend: { ...birth.friend, metAge: 0 },
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
    logs: initialLogs,
    weaver,
    pendingEvent: null,
    pendingContract: null,
    pendingModal: null
  };
}

/**
 * Helper to clone and normalize character object so getters stay intact
 */
export function cloneChar(char) {
  const copy = {
    ...char,
    stats: { ...char.stats },
    flags: [...char.flags],
    scars: [...char.scars],
    npcs: { ...char.npcs },
    seenEvents: [...char.seenEvents],
    recent: [...(char.recent || [])],
    memory: [...(char.memory || [])],
    motifs: { ...(char.motifs || {}) },
    unlockedRecords: [...char.unlockedRecords],
    logs: [...char.logs]
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
  if (char.scars.length >= 4 && char.alive) unlock('scarred_psyche_4');
  if (char.scars.includes('Vết Mổ Cưỡng Chế Thuế Nội Tạng')) unlock('organ_harvest_victim');
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

/**
 * Evaluates Fixer Grade / Syndicate Rank promotions based on accumulated Merit & Reputation
 */
export function checkPromotions(char) {
  const logsToAdd = [];
  const omenObj = FATE_OMENS.find((o) => o.id === char.fateOmenId);

  if (char.job === 'Fixer') {
    const thresholds = [
      { grade: 8, merit: 8 },
      { grade: 7, merit: 18 },
      { grade: 6, merit: 30 },
      { grade: 5, merit: 45 },
      { grade: 4, merit: 64 },
      { grade: 3, merit: 86 },
      { grade: 2, merit: 112 },
      { grade: 1, merit: 142 }
    ];

    for (const t of thresholds) {
      if (char.fixerGrade > t.grade && char.merit >= t.merit) {
        char.fixerGrade = t.grade;
        logsToAdd.push({
          id: `log_promo_${char.age}_g${t.grade}`,
          age: char.age,
          season: SEASONS[char.seasonIdx],
          type: 'promo',
          vi: `[Thăng cấp] Hana Association xem lại hồ sơ của bạn và đóng dấu lên thẻ mới: Fixer Grade ${t.grade}.`,
          en: `[Promotion] Hana Association reviewed your record and stamped a new license: Grade ${t.grade} Fixer.`
        });
      }
    }

    // Color Fixer Ascension!
    if (
      char.fixerGrade === 1 &&
      char.merit >= 175 &&
      char.stats.rep >= 72 &&
      !char.flags.includes('ColorFixer')
    ) {
      char.fixerGrade = 0; // 0 represents Color Fixer
      char.flags.push('ColorFixer');
      char.pendingModal = 'color_title';
      logsToAdd.push({
        id: `log_color_ascend_${char.age}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'miracle',
        vi: `[Color Fixer] Hana Association mời bạn đến trụ sở. Họ nói bạn sẽ được trao một Color, như Red Mist, Black Silence, Purple Tear. Từ nay cả The City sẽ gọi bạn bằng nó.`,
        en: `[Color Fixer] Hana Association called you to headquarters. You are to be given a Color, like the Red Mist, the Black Silence, the Purple Tear. From now on the whole City will call you by it.`
      });
    }
  }

  // Syndicate / Five Fingers Rank Promotions
  if (char.job === 'Syndicate' && char.finger && FINGER_RANKS[char.finger]) {
    const ladder = FINGER_RANKS[char.finger];
    const targetRank = Math.min(ladder.length - 1, Math.floor(char.merit / 26));
    if (targetRank > (char.fingerRank || 0)) {
      char.fingerRank = targetRank;
      const rankTitle = ladder[targetRank];
      logsToAdd.push({
        id: `log_finger_promo_${char.age}_${targetRank}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: `[The ${char.finger}] Những người trên bạn đã để ý. Từ hôm nay bạn là ${rankTitle}.`,
        en: `[The ${char.finger}] Those above you have noticed. From today you are ${rankTitle}.`
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
  if (char.flags.includes('고급장비') || char.flags.includes('유물') || char.craftWeapon) power += 12;
  if (char.flags.includes('EGOAwakened') || char.flags.includes('ShinAwakened')) power += 18;
  if (char.npcs?.partner && !char.npcs.partner.deceased) power += 9;

  const difficulty = 32 + template.tier * 16;
  const baseSuccess = clamp(Math.round(55 + (power - difficulty) * 1.1), 18, 94);
  const baseDeath = clamp(Math.round((100 - baseSuccess) * (0.12 + template.tier * 0.05)), 2, 42);
  const baseFail = Math.max(0, 100 - baseSuccess - baseDeath);

  return {
    id: `${template.id}_${char.age}`,
    template,
    tierInfo,
    approaches: [
      {
        id: 'careful',
        labelVi: 'Làm chậm mà chắc',
        labelEn: 'Slow and careful',
        successPct: clamp(baseSuccess + 8, 25, 96),
        failPct: clamp(baseFail, 3, 70),
        deathPct: Math.max(1, Math.round(baseDeath * 0.55)),
        payAhn: tierInfo.basePay,
        meritGain: tierInfo.baseMerit,
        costAhn: 0
      },
      {
        id: 'bold',
        labelVi: 'Xông vào, xong sớm (thêm 50% Ahn và Merit)',
        labelEn: 'Go in hard, finish fast (50% more Ahn and Merit)',
        successPct: clamp(baseSuccess - 8, 15, 90),
        failPct: clamp(baseFail, 5, 70),
        deathPct: clamp(Math.round(baseDeath * 1.45), 4, 55),
        payAhn: Math.round(tierInfo.basePay * 1.5),
        meritGain: Math.round(tierInfo.baseMerit * 1.5),
        costAhn: 0
      },
      {
        id: 'intel',
        labelVi: 'Mua hồ sơ mục tiêu của Seven Association (8 Ahn)',
        labelEn: 'Buy the target file from Seven Association (8 Ahn)',
        successPct: clamp(baseSuccess + 18, 35, 98),
        failPct: Math.max(1, 99 - clamp(baseSuccess + 18, 35, 98)),
        deathPct: 1,
        payAhn: tierInfo.basePay,
        meritGain: tierInfo.baseMerit + 3,
        costAhn: 8
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

  const approach = contract.approaches.find(a => a.id === approachId) || contract.approaches[0];
  const { template, tierInfo } = contract;
  char.pendingContract = null;

  if (approach.costAhn > 0) {
    char.stats.wealth = clamp(char.stats.wealth - approach.costAhn, 0, 100);
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
    char.stats.rep = clamp(char.stats.rep + Math.max(2, template.tier + 2), 0, 100);
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
  const saviorKey = ['partner', 'spouse'].find(
    k => char.npcs?.[k] && !char.npcs[k].deceased && (char.npcs[k].bond || 0) >= 65
  );

  if (saviorKey) {
    const savior = char.npcs[saviorKey];
    char.npcs[saviorKey] = { ...savior, deceased: true };
    char.stats.health = 22;
    char.stats.sanity = clamp(char.stats.sanity - 24, 1, 100);
    char.resonance = clamp((char.resonance || 0) + 32, 0, 100);
    if (!char.unlockedRecords.includes('savior_sacrifice')) {
      char.unlockedRecords.push('savior_sacrifice');
    }
    const scarName = `${savior.nameVi} đã chết thay bạn`;
    if (!char.scars.includes(scarName)) {
      char.scars.push(scarName);
    }
    char.logs.push({
      id: `log_savior_${char.age}_${saviorKey}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'miracle',
      vi: `[${savior.nameVi}] Đòn đó lẽ ra đã giết bạn. ${savior.nameVi} bước vào giữa, và nhận nó thay bạn. Người ấy chết trong tay bạn, vẫn còn cố nói điều gì đó mà bạn không nghe kịp.`,
      en: `[${savior.nameEn}] That blow should have killed you. ${savior.nameEn} stepped between, and took it instead. They died in your arms, still trying to say something you didn’t catch.`
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

/**
 * Resolves a player's choice on a Story / Causal Event
 */
export function resolveEventChoice(charState, choiceIdx, rng = Math.random) {
  const char = cloneChar(charState);
  const event = char.pendingEvent;
  if (!event) return char;

  const choice = event.choices?.[choiceIdx] || event.choices?.[0];
  char.pendingEvent = null;
  if (!char.seenEvents.includes(event.id)) {
    char.seenEvents.push(event.id);
  }

  // Determine outcome (direct choice or weighted outcome roll)
  let outcome = choice;
  if (Array.isArray(choice.outcomes) && choice.outcomes.length > 0) {
    const totalW = choice.outcomes.reduce((s, o) => s + (o.w || 50), 0);
    let roll = rng() * totalW;
    for (const o of choice.outcomes) {
      roll -= o.w || 50;
      if (roll <= 0) {
        outcome = o;
        break;
      }
    }
  }

  // Merge effects from both choice and rolled outcome
  const effects = { ...(choice.effects || {}), ...(outcome.effects || {}) };
  if (effects.health) char.stats.health = clamp(char.stats.health + effects.health, 0, 100);
  if (effects.sanity) char.stats.sanity = clamp(char.stats.sanity + effects.sanity, 0, 100);
  if (effects.wealth) char.stats.wealth = clamp(char.stats.wealth + effects.wealth, 0, 100);
  if (effects.network) char.stats.network = clamp(char.stats.network + effects.network, 0, 100);
  if (effects.rep) char.stats.rep = clamp(char.stats.rep + effects.rep, 0, 100);
  if (effects.heat) char.heat = clamp((char.heat || 0) + effects.heat, 0, 100);
  if (effects.taboo) char.taboo = clamp((char.taboo || 0) + effects.taboo, 0, 3);
  if (effects.resonance) char.resonance = clamp((char.resonance || 0) + effects.resonance, 0, 100);

  // Career / Faction / Region mutations
  const setJob = outcome.setJob || choice.setJob;
  if (setJob) char.job = setJob;

  const setFixerGrade = outcome.setFixerGrade ?? choice.setFixerGrade;
  if (setFixerGrade !== undefined) char.fixerGrade = setFixerGrade;

  const setFinger = outcome.setFinger || choice.setFinger;
  if (setFinger) char.finger = setFinger;

  const setFingerRank = outcome.setFingerRank ?? choice.setFingerRank;
  if (setFingerRank !== undefined) char.fingerRank = setFingerRank;

  const setWingRank = outcome.setWingRank ?? choice.setWingRank;
  if (setWingRank !== undefined) char.wingRank = setWingRank;

  const setOrg = outcome.setOrg || choice.setOrg;
  if (setOrg) char.org = setOrg;

  const setRegion = outcome.setRegion || choice.setRegion;
  if (setRegion) char.regionId = setRegion;

  const meritAdd = (choice.meritAdd || 0) + (outcome.meritAdd || 0);
  if (meritAdd) char.merit = Math.max(0, char.merit + meritAdd);

  // Flags, Scars, Codex Records, NPCs
  const flagsAdd = [...(choice.flagsAdd || []), ...(outcome.flagsAdd || [])];
  flagsAdd.forEach(f => {
    if (!char.flags.includes(f)) char.flags.push(f);
  });

  const scarsAdd = [...(choice.scarsAdd || []), ...(outcome.scarsAdd || [])];
  scarsAdd.forEach(s => {
    if (!char.scars.includes(s)) {
      char.scars.push(s);
      char.resonance = clamp((char.resonance || 0) + 10, 0, 100);
    }
  });

  const recordsAdd = [...(choice.recordsAdd || []), ...(outcome.recordsAdd || [])];
  recordsAdd.forEach(r => {
    if (!char.unlockedRecords.includes(r)) char.unlockedRecords.push(r);
  });

  const npcAdd = outcome.npcAdd || choice.npcAdd;
  if (npcAdd && npcAdd.role) {
    const lover = char.npcs?.lover;
    if (npcAdd.role === 'spouse' && lover && !lover.deceased && lover.status !== 'dead') {
      // The person you were already seeing is the one you marry
      char.npcs.spouse = { ...lover, role: 'spouse', bond: Math.max(lover.bond || 0, npcAdd.bond || 0), lastSeen: char.age };
      char.npcs.lover = null;
    } else if (!char.npcs[npcAdd.role] || char.npcs[npcAdd.role].deceased) {
      const base = makeNpc(npcAdd.role, Math.random, { metAge: char.age, lastSeen: char.age });
      char.npcs[npcAdd.role] = {
        ...base,
        ...(npcAdd.nameVi ? { nameVi: npcAdd.nameVi, nameEn: npcAdd.nameEn || npcAdd.nameVi } : {}),
        ...(npcAdd.traitVi ? { traitVi: npcAdd.traitVi, traitEn: npcAdd.traitEn || npcAdd.traitVi } : {}),
        bond: Math.abs(npcAdd.bond || 70)
      };
    }
  }

  const npcFate = outcome.npcFate || choice.npcFate;
  if (npcFate) {
    for (const [role, status] of Object.entries(npcFate)) {
      const target = char.npcs?.[role];
      if (target && !target.deceased) {
        char.npcs[role] = { ...target, status, deceased: status === 'dead', fateAge: char.age };
      }
    }
  }

  // Interactive Modals (Workshop Crafting / Naming E.G.O)
  if (choice.openCraftModal || outcome.openCraftModal) {
    char.pendingModal = 'craft_weapon';
  }
  if (choice.openEgoModal || outcome.openEgoModal) {
    char.pendingModal = 'ego_name';
  }

  const textVi = interpolateText(outcome.resultVi || choice.resultVi || '', char);
  const textEn = interpolateText(outcome.resultEn || choice.resultEn || '', char);

  char.logs.push({
    id: `log_ev_${char.age}_${event.id}`,
    age: char.age,
    season: SEASONS[char.seasonIdx],
    type: event.isCausalCallback ? 'causal' : (event.major ? 'major' : 'choice'),
    choiceVi: choice.labelVi,
    choiceEn: choice.labelEn,
    vi: textVi,
    en: textEn
  });

  // Record in the Weaver AI Causal Memory Graph & schedule any delayed consequences!
  char.weaver = recordChoiceInGraph(char.weaver, char, event, choice, textVi, textEn);

  // Check if outcome caused immediate death or health <= 0
  if (outcome.deathCauseVi || char.stats.health <= 0) {
    const [woundVi, woundEn] = woundDeath(char, 'Gục ngã vì vết thương quá nặng', 'Succumbed to fatal wounds');
    applyFatalOrCompanionSave(char, outcome.deathCauseVi || woundVi, outcome.deathCauseEn || woundEn);
  } else if (char.stats.sanity <= 0 && !char.flags.includes('Distorted') && !char.flags.includes('EGOAwakened')) {
    // Sanity hit 0 -> Trigger Carmen Crossroad next or immediate Distortion breakdown
    char.resonance = 100;
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

  if (char.flags.includes('ColorFixer')) {
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
    epitaphTitleEn = `Master Workshop Craftsman`;
    rankTier = char.craftWeapon ? 'Urban Nightmare' : 'Urban Legend';
  }

  const relicName =
    char.craftWeapon?.name ||
    (char.egoName ? `Mảnh E.G.O 「${char.egoName}」` : null) ||
    (char.customTitle ? `Huy hiệu Color 「${char.customTitle}」` : null) ||
    (char.lineage?.relic ? char.lineage.relic : `Đồ của ${char.name}`);

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
    hasChild: Boolean(char.npcs?.child),
    childName: char.npcs?.child?.nameVi || '',
    hasVendetta: (char.heat || 0) >= 40 || char.flags.includes('MiddleVendetta')
  };
}
