import React from 'react';

// E.G.O awakening: Carmen's whispers shatter in the dark, an inner prismatic crystal of will takes shape,
// surrounded by radiant resonance rings and golden light bloom.
// Drawn here, timed in cutscene.css.
const DIAMOND_POINTS = '100,20 180,100 100,180 20,100';
const OCTAGON_POINTS = '100,15 160,40 185,100 160,160 100,185 40,160 15,100 40,40';

export function EgoScene() {
  return (
    <div className="cs-art cs-ego-art" aria-hidden="true">
      <div className="cs-ego-core" />
      <span className="cs-ego-ring" />
      <span className="cs-ego-ring is-outer" />
      <svg className="cs-ego-prism" viewBox="0 0 200 200">
        <polygon className="cs-ego-prism-outer" points={OCTAGON_POINTS} />
        <polygon className="cs-ego-prism-inner" points={DIAMOND_POINTS} />
      </svg>
      <div className="cs-flash" />
    </div>
  );
}
