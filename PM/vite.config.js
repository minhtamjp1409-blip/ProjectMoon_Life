import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vendor code and story data change at different rates from the UI, so they get
// their own chunks and stay cached between deploys.
const chunkFor = (id) => {
  if (id.includes('node_modules')) {
    if (/[\/]node_modules[\/](antd|@ant-design|rc-[^\/]+|@rc-component)[\/]/.test(id)) return 'antd';
    if (/[\/]node_modules[\/](react|react-dom|react-router|react-router-dom|scheduler)[\/]/.test(id)) return 'react';
    return 'vendor';
  }
  // Event text, everyday scenes and world data change separately, so each keeps its own cache entry.
  // The five Finger stories are the largest single block of text, so they get a chunk of their own.
  if (/[/]src[/]data[/]eventsFinger/.test(id)) return 'story-fingers';
  if (/[/]src[/]data[/]events(Fixer|Color|Ego|Apex|Affiliation|Workshop)/.test(id)) return 'story-career';
  if (/[/]src[/]data[/]events(Wing|Faction|Distortion|Supernatural|Dungeon)/.test(id)) return 'story-factions';
  if (/[\/]src[\/]data[\/]events/.test(id)) return 'story-events';
  if (/[\/]src[\/]data[\/](lifeMinors|lifeDailies|narrative)/.test(id)) return 'story-life';
  if (/[\/]src[\/]data[\/]/.test(id)) return 'story';
  return undefined;
};

// Two chunks that import each other run in the wrong order in the browser ("Cannot access ... before
// initialization") and the page stays blank, while Node tests pass. Fail the build instead of shipping that.
const noChunkCycles = () => ({
  name: 'no-chunk-cycles',
  generateBundle(_, bundle) {
    const graph = new Map(Object.values(bundle)
      .filter((item) => item.type === 'chunk')
      .map((chunk) => [chunk.fileName, chunk.imports.filter((name) => bundle[name]?.type === 'chunk')]));
    const state = new Map();
    const visit = (name, trail) => {
      if (state.get(name) === 2) return;
      if (state.get(name) === 1) {
        this.error(`Chunk import cycle: ${[...trail.slice(trail.indexOf(name)), name].join(' -> ')}. Move the module that creates the edge into the chunk it belongs with (see chunkFor).`);
      }
      state.set(name, 1);
      for (const next of graph.get(name) || []) visit(next, [...trail, name]);
      state.set(name, 2);
    };
    for (const name of graph.keys()) visit(name, []);
  }
});

export default defineConfig({
  plugins: [react(), tailwindcss(), noChunkCycles()],
  build: {
    // The story chunks hold all event text and are cached separately, so the default 500 kB warning does not apply to them
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: { manualChunks: chunkFor }
    }
  },
  server: {
    port: 5173,
    host: true,
    headers: {
      'Cache-Control': 'no-store'
    },
    watch: {
      ignored: ['**/Data/**', '**/scratch/**', '**/*.md', '**/*.log']
    }
  }
});
