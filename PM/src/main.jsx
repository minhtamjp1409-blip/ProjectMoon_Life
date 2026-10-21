import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/interface.css';
import { useGameStore } from './store/gameStore';
import { audioEngine } from './engine/audioEngine';

if (typeof window !== 'undefined') {
  window.__gameStore = useGameStore;
  const unlockAudio = () => {
    try {
      audioEngine.init();
    } catch {}
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  };
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
}

// A horizontal scroll left over from an earlier layout must not stick
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
