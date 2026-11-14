import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/ui/index.css';
import { useGameStore } from './store/gameStore';
import { audioEngine } from './engine/audioEngine';
import { choiceIsAvailable } from './engine/eventConditions';

if (typeof window !== 'undefined') {
  window.__gameStore = useGameStore;
  if (import.meta.env.DEV || new URLSearchParams(window.location.search).get('qa') === '1') {
    window.__choiceIsAvailable = choiceIsAvailable;
  }
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
