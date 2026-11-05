import React from 'react';

/**
 * Thức Tỉnh E.G.O Hoàn Chỉnh (Complete E.G.O Awakening / Effloresced E.G.O).
 * Radiant prismatic halo, expansive geometric light wings, and the true physical
 * crystallization of the bearer's unyielding selfhood.
 */
export function EgoFullScene({ cut = 'full' }) {
  return (
    <div className={`cs-art cs-egofull ${cut === 'still' ? 'is-still' : ''}`} aria-hidden="true">
      <div className="cs-egofull-veil" />
      <div className="cs-egofull-radiance" />

      <div className="cs-egofull-stage">
        {/* Prismatic geometric halo */}
        <div className="cs-egofull-halo">
          <svg viewBox="0 0 200 200" className="cs-egofull-halo-svg">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12 6" />
            <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="100,14 125,75 186,100 125,125 100,186 75,125 14,100 75,75" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Expansive geometric light wings */}
        <div className="cs-egofull-wings">
          <div className="cs-egofull-wing is-left">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="cs-egofull-feather" style={{ '--i': i }} />
            ))}
          </div>
          <div className="cs-egofull-wing is-right">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="cs-egofull-feather" style={{ '--i': i }} />
            ))}
          </div>
        </div>

        {/* Effloresced Crystal Sigil & Weapon Blade */}
        <div className="cs-egofull-core-container">
          <div className="cs-egofull-blade">
            <svg viewBox="0 0 80 240" className="cs-egofull-blade-svg">
              <path d="M40 8 L54 60 L48 180 L40 232 L32 180 L26 60 Z" fill="currentColor" />
              <line x1="40" y1="18" x2="40" y2="220" stroke="var(--ego-core)" strokeWidth="2" />
            </svg>
          </div>
          <div className="cs-egofull-sigil" />
        </div>
      </div>

      <div className="cs-flash is-gold" />
    </div>
  );
}
