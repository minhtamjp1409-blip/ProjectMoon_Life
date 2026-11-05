import React from 'react';

/**
 * Thiết Luật Ngón Cái (The Thumb Discipline).
 * Heavy gunmetal barrel silhouette, stamped discipline bullet, and an unbending
 * steel bar brought down with absolute authority.
 */
export function IronruleScene({ cut = 'full' }) {
  return (
    <div className={`cs-art cs-ironrule ${cut === 'still' ? 'is-still' : ''}`} aria-hidden="true">
      <div className="cs-ironrule-veil" />
      
      <div className="cs-ironrule-stage">
        {/* Heavy muzzle aperture */}
        <div className="cs-ironrule-muzzle">
          <svg className="cs-ironrule-rifling" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="4" />
            <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="60" y1="6" x2="60" y2="28" stroke="currentColor" strokeWidth="3" />
            <line x1="60" y1="92" x2="60" y2="114" stroke="currentColor" strokeWidth="3" />
            <line x1="6" y1="60" x2="28" y2="60" stroke="currentColor" strokeWidth="3" />
            <line x1="92" y1="60" x2="114" y2="60" stroke="currentColor" strokeWidth="3" />
            <circle cx="60" cy="60" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Stamped discipline cartridge */}
        <div className="cs-ironrule-bullet">
          <div className="cs-ironrule-bullet-tip" />
          <div className="cs-ironrule-bullet-body">
            <span className="cs-ironrule-stamp" />
            <span className="cs-ironrule-stamp" />
          </div>
          <div className="cs-ironrule-bullet-rim" />
        </div>

        {/* Heavy steel discipline bar */}
        <div className="cs-ironrule-bar-container">
          <div className="cs-ironrule-bar" />
          <div className="cs-ironrule-sparks">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="cs-ironrule-spark" style={{ '--i': i }} />
            ))}
          </div>
        </div>
      </div>

      <div className="cs-flash is-bronze" />
    </div>
  );
}
