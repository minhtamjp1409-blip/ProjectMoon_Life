import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { useGameStore } from './store/gameStore';

if (typeof window !== 'undefined') {
  window.__gameStore = useGameStore;
}

// A horizontal scroll left over from an earlier layout must not stick
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
