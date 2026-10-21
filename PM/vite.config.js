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
  // Event text, everyday scenes and world data change separately, so each keeps its own cache entry
  if (/[\/]src[\/]data[\/]events/.test(id)) return 'story-events';
  if (/[\/]src[\/]data[\/](lifeMinors|lifeDailies|narrative)/.test(id)) return 'story-life';
  if (/[\/]src[\/]data[\/]/.test(id)) return 'story';
  return undefined;
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
