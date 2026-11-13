// Renders the play screen's main components on the server in the states a life passes through.
// Node tests import the engine only, so a component that reads a variable it never declared
// (PlayBar's `skimOn`, 04/11/2026) passed `npm test` and broke every new life in production.
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';

const rr = (p) => fileURLToPath(new URL('../node_modules/' + p, import.meta.url));

// Just enough browser for the modules to load; effects never run during a server render.
const memory = new Map();
globalThis.localStorage = {
  getItem: (k) => (memory.has(k) ? memory.get(k) : null),
  setItem: (k, v) => memory.set(k, String(v)),
  removeItem: (k) => memory.delete(k),
  clear: () => memory.clear()
};
globalThis.sessionStorage = globalThis.localStorage;
globalThis.window = globalThis;
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
globalThis.innerWidth = 390;
globalThis.innerHeight = 844;
// React warns that layout effects do not run on the server; that is expected here
const consoleError = console.error;
console.error = (...args) => {
  if (String(args[0]).includes('useLayoutEffect does nothing on the server')) return;
  consoleError(...args);
};

const server = await createServer({
  server: { middlewareMode: true, watch: null, hmr: false },
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true },
  ssr: { noExternal: ['react-router-dom', 'react-router'] },
  // react-router's package entry resolves to its CommonJS build here; point at the ESM files instead
  resolve: { alias: [
    // On the server zustand renders the state a store was created with; this one renders the live state
    { find: /^zustand$/, replacement: fileURLToPath(new URL('./support/zustand-live-snapshot.mjs', import.meta.url)) },
    { find: /^react-router-dom$/, replacement: rr('react-router-dom/dist/index.mjs') },
    { find: /^react-router\/dom$/, replacement: rr('react-router/dist/development/dom-export.mjs') },
    { find: /^react-router$/, replacement: rr('react-router/dist/development/index.mjs') }
  ] }
});
let failed = 0;
try {
  const load = (p) => server.ssrLoadModule(p);
  const React = (await import('react')).default;
  const { renderToString } = await import('react-dom/server');
  const { MemoryRouter } = await load('react-router-dom');
  const { useGameStore } = await load('/src/store/gameStore.js');
  const { createNewCharacter } = await load('/src/engine/gameEngine.js');
  const { LIFE_MINORS } = await load('/src/engine/yearPlanner.js');
  const components = {
    PlayBar: (await load('/src/features/chronicle/components/PlayBar.jsx')).PlayBar,
    LiveStageFeed: (await load('/src/features/chronicle/components/LiveStageFeed.jsx')).LiveStageFeed,
    CharacterDossierCard: (await load('/src/features/chronicle/components/CharacterDossierCard.jsx')).CharacterDossierCard
  };

  const base = () => {
    const char = createNewCharacter({ seed: 'smoke-render' });
    char.alive = true;
    char.pendingBirthLogs = [];
    return char;
  };
  const minorDef = LIFE_MINORS.find((m) => m.choices?.length >= 2);
  const states = {
    'đời vừa bắt đầu': { char: base(), speed: 1 },
    'đang Lướt': { char: base(), speed: 8, skimOn: true, preSkimSpeed: 2 },
    'đang chờ minor': {
      char: { ...base(), age: 9, pendingMinor: { id: minorDef.id, t: 0.5, vi: minorDef.vi, en: minorDef.en, choices: minorDef.choices, ignore: minorDef.ignore || null, remainingMs: 15000 } },
      speed: 1,
      minorRemainingMs: 15000
    },
    'đang hỏi tên NPC': { char: { ...base(), pendingNpcNaming: { role: 'friend' } }, speed: 1 },
    'đã chết': { char: { ...base(), age: 41, alive: false, endingId: 'smoke' }, speed: 0 }
  };

  for (const [stateName, patch] of Object.entries(states)) {
    useGameStore.setState({ inRun: true, yearProgress: 30, autoPlay: false, cutscene: null, activeResolution: null, ...patch });
    for (const [name, Component] of Object.entries(components)) {
      try {
        const html = renderToString(React.createElement(MemoryRouter, null, React.createElement(Component)));
        assert(html.length > 0, `${name} rendered nothing`);
        if (name === 'LiveStageFeed' && patch.char.pendingMinor) assert(html.includes('choice-label'), 'the minor dock shows its choices');
      } catch (error) {
        failed++;
        console.error(`FAIL ${name} (${stateName}): ${error.message}`);
      }
    }
  }

  // The home screen, before any life and after one has ended (the replay goals appear then)
  const { BirthSetupPanel } = await load('/src/features/chronicle/components/BirthSetupPanel.jsx');
  const homes = {
    'trang chủ lần đầu': { pastLives: [], globalCodex: [] },
    'trang chủ sau một đời': { pastLives: [{ name: 'Smoke', job: 'Fixer', age: 33, generation: 1, seed: 'smoke-home' }], globalCodex: ['born_city'] }
  };
  const { useThemeStore } = await load('/src/store/themeStore.js');
  for (const [stateName, patch] of Object.entries(homes)) {
    useThemeStore.setState({ firstLifeGuideDismissed: false });
    useGameStore.setState({ inRun: false, savedRun: null, pendingLegacy: null, ...patch });
    try {
      const html = renderToString(React.createElement(MemoryRouter, null, React.createElement(BirthSetupPanel)));
      if (patch.pastLives.length) {
        assert(html.includes('replay-goals'), 'the home screen shows what the next life could open');
        assert(!html.includes('first-life-guide'), 'returning players do not see the first-life guide');
      } else {
        assert(!html.includes('replay-goals'), 'no replay goals before the first life');
        assert(html.includes('first-life-guide'), 'first-time players see the compact 4-line guide');
        assert(html.includes('Thời gian tự trôi'), 'first-life guide contains line 1');
      }
    } catch (error) {
      failed++;
      console.error(`FAIL BirthSetupPanel (${stateName}): ${error.message}`);
    }
  }
  const { Header } = await load('/src/layouts/Header.jsx');
  const expectedLangCodes = { vi: 'VI', en: 'EN', bi: 'VI+EN' };
  for (const [code, short] of Object.entries(expectedLangCodes)) {
    useThemeStore.setState({ lang: code });
    try {
      const html = renderToString(React.createElement(MemoryRouter, null, React.createElement(Header)));
      assert(html.includes('app-tool-lang'), `Header (${code}) missing language toggle button`);
      assert(html.includes(short), `Header (${code}) missing language code ${short}`);
    } catch (error) {
      failed++;
      console.error(`FAIL Header (${code}): ${error.message}`);
    }
  }
  useThemeStore.setState({ lang: 'vi' });
} finally {
  await server.close();
}

if (failed) {
  console.error(`Play screen smoke: ${failed} render(s) failed`);
  process.exit(1);
}
console.log('Play screen smoke: PlayBar, LiveStageFeed and CharacterDossierCard render in 5 states, the home screen in 2');
process.exit(0);
