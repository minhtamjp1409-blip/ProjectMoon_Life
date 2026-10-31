import React from 'react';

// A companion dies in your place: their name on the dark, and under it a candle that burns a moment and goes out.
export function SaviorScene() {
  return (
    <div className="cs-art" aria-hidden="true">
      <div className="cs-candle">
        <span className="cs-candle-glow" />
        <span className="cs-flame" />
        <span className="cs-candle-stick" />
      </div>
    </div>
  );
}
