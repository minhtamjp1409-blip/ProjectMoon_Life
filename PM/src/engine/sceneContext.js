// One reading of "where is this life right now", shared by the backdrop, the interface accent and the ambience.
// Pure: it takes plain state and returns plain data, so it can be tested in Node.

// Each world has a palette the interface borrows (accent, its ink, a second hue for glows) and a
// particle weather for the backdrop; ambienceScapes.js keys its soundscape on the same world id.
export const WORLDS = {
  title: { accent: '#d23b3b', ink: '#fff2ef', glow: '#5a1418', weather: 'ash' },
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
  'dungeon-outskirts': { accent: '#d9a463', ink: '#1a1006', glow: '#3a2410', weather: 'sand' }
};

const SEASON_WEATHER = ['drizzle', 'haze', 'rain', 'snow'];

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
 * @returns {{ world: string, accent: string, ink: string, glow: string, weather: string,
 *   intensity: number, ego: 'none'|'awakened'|'active', color: string|null, danger: boolean, carmen: boolean, season: number }}
 */
export function sceneContextOf({ inRun = false, path = '/', char = null } = {}) {
  let world = 'title';
  let intensity = 0.2;
  let ego = 'none';
  let color = null;
  let danger = false;
  let carmen = false;
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
    carmen = char.alive && ((char.stats?.sanity ?? 100) <= 22 || Boolean(ev?.isDistortion || /carmen|distort/i.test(ev?.id || '')));
    if (char.alive) {
      if (session?.egoActive) ego = 'active';
      else if (char.flags?.includes('EGOAwakened') || char.egoName) ego = 'awakened';
      if (isColorFixer(char)) color = char.colorData?.color || '#e1341e';
    }
  }

  const base = WORLDS[world] || WORLDS.title;
  const weather = base.weather === 'season' ? SEASON_WEATHER[season] || 'rain' : base.weather;
  return { world, ...base, weather, intensity, ego, color, danger, carmen, season };
}
