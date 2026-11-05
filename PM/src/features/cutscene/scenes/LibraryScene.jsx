import React from 'react';

// The Library threshold: the City wall falls behind, amid the ash of the Outskirts
// a plain wooden door stands open, warm light pouring from its aperture.
// Drawn here, timed in cutscene.css.
export function LibraryScene() {
  return (
    <div className="cs-art cs-library-art" aria-hidden="true">
      <div className="cs-library-glow" />
      <div className="cs-library-portal" />
      <svg className="cs-library-door" viewBox="0 0 200 240">
        {/* Door frame */}
        <rect className="cs-library-frame" x="40" y="20" width="120" height="200" rx="4" />
        {/* Door inner threshold */}
        <rect className="cs-library-leaf" x="50" y="30" width="100" height="180" rx="2" />
        {/* Warm light seam / opening */}
        <line className="cs-library-beam" x1="100" y1="30" x2="100" y2="210" />
      </svg>
      <div className="cs-flash is-amber" />
    </div>
  );
}
