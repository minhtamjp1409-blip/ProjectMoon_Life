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
  if (/[\/]src[\/]data[\/]/.test(id)) return 'story';
  return undefined;
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: { manualChunks: chunkFor }
    }
  },
  server: {
    port: 5173,
    host: true,
    headers: {
      'Cache-Control': 'no-store'
    }
  }
});
