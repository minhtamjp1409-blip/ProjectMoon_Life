// One reading of "where is this life right now", shared by the backdrop, route identity and ambience.
// Pure: it takes plain state and returns plain data, so it can be tested in Node.
import { REGIONS } from '../data/worldData.js';

// Each world has a palette for scene art and nameplates (accent, ink, a second hue for glows) and a
// particle weather for the backdrop; ambienceScapes.js keys its soundscape on the same world id.
export const WORLDS = {
  title: { accent: '#d8b265', ink: '#1b1408', glow: '#3d2a14', weather: 'ash' },
  library: { accent: '#c9a25a', ink: '#1b1308', glow: '#4a3218', weather: 'dust' },
  childhood: { accent: '#d9a35a', ink: '#1c1206', glow: '#3d2a14', weather: 'season' },
  nest: { accent: '#8fc6e8', ink: '#08151d', glow: '#16324a', weather: 'motes' },
  backstreets: { accent: '#4fc1b4', ink: '#04160f', glow: '#0e2e33', weather: 'season' },
  outskirts: { accent: '#d4a26a', ink: '#1a1006', glow: '#3a2410', weather: 'sand' },
  fixer: { accent: '#e8a33c', ink: '#1b1104', glow: '#3d2408', weather: 'season' },
  wing: { accent: '#7fb0ff', ink: '#06122a', glow: '#16264a', weather: 'data' },
  workshop: { accent: '#f08a3c', ink: '#1d0d03', glow: '#45200a', weather: 'sparks' },
  syndicate: { accent: '#d0566a', ink: '#1d060b', glow: '#3a0f18', weather: 'season' },
  'finger-index': { accent: '#ece08e', ink: '#191603', glow: '#3a3412', weather: 'prescript' },
  'finger-middle': { accent: '#d9b34a', ink: '#171003', glow: '#2a2010', weather: 'ash' },
  'finger-ring': { accent: '#ec4b55', ink: '#fff0f0', glow: '#4a0e14', weather: 'paint' },
  'finger-pinky': { accent: '#b88ae8', ink: '#140a22', glow: '#2c1a44', weather: 'motes' },
  'finger-thumb': { accent: '#d8743c', ink: '#1d0c03', glow: '#41190a', weather: 'embers' },
  distortion: { accent: '#e2487a', ink: '#fff0f5', glow: '#3a0a2a', weather: 'glitch' },
  dead: { accent: '#a8a29a', ink: '#141210', glow: '#1e1c1a', weather: 'ash' },
  'dungeon-warp': { accent: '#5fd2ff', ink: '#03141d', glow: '#0b2f4a', weather: 'speed' },
  'dungeon-lobotomy': { accent: '#f2a531', ink: '#1d1002', glow: '#40240a', weather: 'alarm' },
  'dungeon-bloodfiend': { accent: '#f0435c', ink: '#fff0f2', glow: '#4a0c1a', weather: 'confetti' },
  'dungeon-greatlake': { accent: '#4fd6c8', ink: '#031613', glow: '#0a3238', weather: 'bubbles' },
  'dungeon-night': { accent: '#9d8cf2', ink: '#0d0820', glow: '#1c1440', weather: 'rain' },
  'dungeon-claw': { accent: '#7fe0ec', ink: '#031619', glow: '#0c2e34', weather: 'motes' },
  'dungeon-ensemble': { accent: '#b8a1df', ink: '#120d1d', glow: '#342341', weather: 'dust' },
  'dungeon-outskirts': { accent: '#d9a463', ink: '#1a1006', glow: '#3a2410', weather: 'sand' }
};

const SEASON_WEATHER = ['drizzle', 'haze', 'rain', 'snow'];

// Where in The City the life stands, read from the District's tags: it picks the skyline under a street world
const PLACE_BY_TAG = [
  ['outskirts', 'outskirts'],
  ['lake', 'lake'],
  ['head', 'head'],
  ['fallen_wing', 'fallen'],
  ['industrial', 'industrial'],
  ['agriculture', 'industrial'],
  ['medical', 'medical'],
  ['commercial', 'commercial'],
  ['entertainment', 'commercial']
];

export function placeOf(char) {
  if (!char) return 'city';
  if (char.regionId === 'OUTSKIRTS') return 'outskirts';
  const tags = REGIONS.find((r) => r.id === char.regionId)?.tags || [];
  return PLACE_BY_TAG.find(([tag]) => tags.includes(tag))?.[1] || 'city';
}

// Three Districts carry a feel of their own on the backdrop: the WARP corridors, the Great Lake, K Corp's clinics
const MOOD_BY_REGION = { W: 'warp', U: 'lake', K: 'kx' };

const routeWorldOf = (char) => {
  if (char.job === 'Syndicate' && char.finger) return `finger-${String(char.finger).toLowerCase()}`;
  if (char.job === 'Syndicate') return 'syndicate';
  if (char.job === 'Wing Employee') return 'wing';
  if (char.job === 'Fixer') return 'fixer';
  if (char.job === 'Workshop Craftsman') return 'workshop';
  const outskirts = char.regionId === 'OUTSKIRTS' || char.flags?.includes('Outskirts');
  if (outskirts) return 'outskirts';
  const nest = char.flags?.includes('Nest') || char.flags?.includes('Feather');
  if (char.job === 'Child' || !char.job) return nest ? 'nest' : 'childhood';
  return nest ? 'nest' : 'backstreets';
};

const isDistorted = (char) =>
  Boolean(char.flags?.includes('Distorted') || char.flags?.includes('Distortion') || char.job === 'Distortion' || (char.distortStage || 0) > 0);

const isColorFixer = (char) => Boolean(char.isColorFixer || char.flags?.includes('ColorFixer') || char.customTitle);

/**
 * place: the District's kind of street (city, head, industrial, commercial, medical, lake, fallen, outskirts).
 * mood: normal; hush while a major event holds the room (the interface around the page steps back);
 * warp, lake or kx in those three Districts (a tint over the backdrop).
 * @returns {{ world: string, accent: string, ink: string, glow: string, weather: string,
 *   intensity: number, ego: 'none'|'awakened'|'active', color: string|null, danger: boolean, carmen: boolean, season: number,
 *   place: string, mood: 'normal'|'hush'|'warp'|'lake'|'kx' }}
 */
export function sceneContextOf({ inRun = false, path = '/', char = null } = {}) {
  let world = 'title';
  let intensity = 0.2;
  let ego = 'none';
  let color = null;
  let danger = false;
  let carmen = false;
  let place = 'city';
  let mood = 'normal';
  const season = char?.seasonIdx ?? 0;

  if (path !== '/') world = 'library';
  else if (inRun && char) {
    const session = char.pendingDungeon;
    if (!char.alive) {
      world = 'dead';
      intensity = 0;
    } else if (session) {
      world = `dungeon-${session.theme || 'warp'}`;
      if (!WORLDS[world]) world = 'dungeon-warp';
      const boss = session.combat?.plan?.[session.combat?.floor]?.kind === 'boss';
      intensity = session.combat?.enemy ? (boss ? 1 : 0.8) : 0.55;
      if ((session.combat?.phase || 1) >= 2) intensity = 1;
    } else if (isDistorted(char)) {
      world = 'distortion';
      intensity = 0.7;
    } else {
      world = routeWorldOf(char);
      danger = (char.heat || 0) >= 65 || (char.taboo || 0) >= 2 || (char.stats?.health ?? 100) <= 20;
      const waiting = Boolean(char.pendingEvent || char.pendingContract);
      intensity = danger ? 0.7 : waiting ? 0.45 : 0.3;
    }
    // Carmen's voice: a mind near its edge, or a scene that is about her
    const ev = char.pendingEvent;
    carmen = char.alive && ((char.stats?.sanity ?? 100) <= 22 || Boolean(session?.ensembleCoda) || Boolean(ev?.isDistortion || /carmen|distort/i.test(ev?.id || '')));
    if (char.alive) {
      if (session?.egoActive) ego = 'active';
      else if (char.flags?.includes('EGOAwakened') || char.egoName) ego = 'awakened';
      if (isColorFixer(char)) color = char.colorData?.color || '#e1341e';
      place = placeOf(char);
      if (!session) mood = ev?.major ? 'hush' : MOOD_BY_REGION[char.regionId] || 'normal';
    }
  }

  const base = WORLDS[world] || WORLDS.title;
  const weather = base.weather === 'season' ? SEASON_WEATHER[season] || 'rain' : base.weather;
  return { world, ...base, weather, intensity, ego, color, danger, carmen, season, place, mood };
}

// The nameplate a life has earned. The top of a branch gets its own frame: a Hana Color carries the
// conferred colour, the top seat of a Finger its Finger's colour, the Wing's board its corporate blue.
// One step below the top gets a quieter frame in the same hue.
export function rankPlateOf(char) {
  if (!char) return { tier: 'plain' };
  const flags = char.flags || [];
  if (isDistorted(char)) {
    const color = WORLDS.distortion.accent;
    if (flags.includes('DistortionLabyrinthSovereign')) {
      return { tier: 'apex', route: 'distortion', color, vi: 'Lãnh Chúa Mê Cung', en: 'Labyrinth Sovereign' };
    }
    if (flags.includes('DistortionLucidWanderer')) {
      return { tier: 'apex', route: 'distortion', color, vi: 'Dị Thể Tỉnh Thức', en: 'Lucid Distortion' };
    }
    if (flags.includes('DistortionPrimordialCalamity')) {
      return { tier: 'apex', route: 'distortion', color, vi: 'Tai Ương Nguyên Thủy', en: 'Primordial Calamity' };
    }
    if ((char.distortStage || 0) >= 3) {
      return { tier: 'apex', route: 'distortion', color, vi: 'Thực Thể Biến Dị Cấp Star', en: 'Star-Class Distortion' };
    }
    if ((char.distortStage || 0) === 2) {
      return { tier: 'high', route: 'distortion', color, vi: 'Thực Thể Đô Thị Ác Mộng', en: 'Urban Nightmare Distortion' };
    }
  }
  if (isColorFixer(char)) {
    return { tier: 'color', route: 'color', color: char.colorData?.color || '#e1341e', vi: 'Color của Hana', en: 'Hana Color' };
  }
  if (char.job === 'Syndicate' && char.finger) {
    const route = String(char.finger).toLowerCase();
    const color = WORLDS[`finger-${route}`]?.accent || WORLDS.syndicate.accent;
    const rank = char.fingerRank || 0;
    if (rank >= 3) return { tier: 'apex', route, color, vi: `Đỉnh của The ${char.finger}`, en: `The top of The ${char.finger}` };
    if (rank === 2) return { tier: 'high', route, color, vi: `Cấp cao The ${char.finger}`, en: `Senior in The ${char.finger}` };
  }
  if (char.job === 'Syndicate' && !char.finger) {
    const rank = char.syndicateRank || 0;
    if (rank >= 3) return { tier: 'apex', route: 'syndicate', color: WORLDS.syndicate.accent, vi: 'Trùm Băng Đảng Độc Lập', en: 'Independent Syndicate Apex' };
    if (rank === 2) return { tier: 'high', route: 'syndicate', color: WORLDS.syndicate.accent, vi: 'Thủ Lĩnh Khu Phố', en: 'Backstreet Warlord' };
  }
  if (char.job === 'Wing Employee') {
    const rank = char.wingRank || 0;
    if (rank >= 3) return { tier: 'apex', route: 'wing', color: WORLDS.wing.accent, vi: 'Hội đồng của Wing', en: 'The Wing board' };
    if (rank === 2) return { tier: 'high', route: 'wing', color: WORLDS.wing.accent, vi: 'Cấp quản lý Wing', en: 'Wing management' };
  }
  if (char.job === 'Workshop Craftsman') {
    if (flags.includes('CraftedColorWeapon')) return { tier: 'apex', route: 'workshop', color: WORLDS.workshop.accent, vi: 'Nghệ Nhân Danh Kiếm', en: 'Masterwork Forger' };
    if (flags.includes('TresCertified')) return { tier: 'high', route: 'workshop', color: WORLDS.workshop.accent, vi: 'Thợ Rèn Chứng Nhận Tres', en: 'Tres-Certified Artisan' };
  }
  if (char.job === 'Fixer' && (char.fixerGrade ?? 9) <= 2) {
    return { tier: 'high', route: 'fixer', color: WORLDS.fixer.accent, vi: `Fixer Grade ${char.fixerGrade}`, en: `Fixer Grade ${char.fixerGrade}` };
  }
  return { tier: 'plain' };
}

/**
 * Resolves the SVG emblem key for a character or pending event.
 */
/** True when an event id names this word as a whole segment (ring in syn_ring_x, not in whispering). */
export const idNames = (id, word) => new RegExp(`(^|_)${word}(_|$)`).test(String(id || '').toLowerCase());

export function crestKindFor(char, ev = null) {
  if (ev) {
    const id = String(ev.id || '').toLowerCase();
    const finger = String(ev.finger || ev.need?.finger || '').toLowerCase();
    if (id.startsWith('distort_') || ev.isDistortion) return 'distortion';
    for (const word of ['thumb', 'index', 'middle', 'ring', 'pinky']) {
      if (finger === word || idNames(id, word)) return word;
    }
    if (idNames(id, 'workshop') || ev.tags?.includes('workshop')) return 'workshop';
    if (idNames(id, 'wing') || ev.need?.jobs?.includes('Wing Employee')) return 'wing';
    if (idNames(id, 'color') || ev.need?.flags?.includes('ColorFixer')) return 'color';
  }
  if (!char) return 'city';
  const flags = char.flags || [];
  if (flags.includes('Distorted') || char.job === 'Distortion') {
    if (flags.includes('DistortionLabyrinthSovereign')) return 'distortion-labyrinth';
    if (flags.includes('DistortionLucidWanderer')) return 'distortion-lucid';
    if (flags.includes('DistortionPrimordialCalamity')) return 'distortion-primordial';
    return 'distortion';
  }
  if (char.isColorFixer || flags.includes('ColorFixer') || char.job === 'Color Fixer') return 'color';
  if (char.job === 'Syndicate' && char.finger) return String(char.finger).toLowerCase();
  if (char.job === 'Syndicate') return 'syndicate';
  if (char.job === 'Wing Employee') return 'wing';
  if (char.job === 'Workshop Craftsman') return 'workshop';
  if (char.job === 'Fixer') return 'fixer';
  if (char.job === 'Outcast') return 'outcast';
  return 'city';
}

/**
 * Classifies how a finished chronicle closed for finale audio and feedback selection.
 * @returns {'library'|'chrysalis'|'retire_90'|'death'}
 */
export function lifeFinaleKindFor(char) {
  if (!char) return 'death';
  if (char.endingId === 'library_threshold') return 'library';
  const lifeEnding = typeof char.lifeEnding === 'string' ? char.lifeEnding : (char.lifeEnding?.id || '');
  const flags = char.flags || [];
  if (
    lifeEnding === 'distort_monument' ||
    (lifeEnding === 'wander' && flags.includes('distort_elder_chrysalis_done'))
  ) {
    return 'chrysalis';
  }
  if (
    (lifeEnding === 'retired' || lifeEnding === 'wander' || lifeEnding === 'ripe_age') &&
    ((char.age || 0) >= 80 || flags.some((f) => f.endsWith('_ending_done')))
  ) {
    return 'retire_90';
  }
  return 'death';
}
