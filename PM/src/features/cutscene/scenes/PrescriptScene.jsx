import React from 'react';

/**
 * Mệnh Lệnh Chỉ Ngón (The Index Prescript).
 * A sacred parchment scroll descends from above, sealed with vermilion wax.
 * The seal fractures, releasing radiant silver directives across the page.
 */
export function PrescriptScene({ cut = 'full' }) {
  return (
    <div className={`cs-art cs-prescript ${cut === 'still' ? 'is-still' : ''}`} aria-hidden="true">
      <div className="cs-prescript-veil" />
      <div className="cs-prescript-aura" />
      
      <div className="cs-prescript-scroll">
        <div className="cs-prescript-rod is-top" />
        <div className="cs-prescript-parchment">
          <div className="cs-prescript-margin" />
          <div className="cs-prescript-body">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="cs-prescript-script-line" style={{ '--i': i }} />
            ))}
          </div>
          <div className="cs-prescript-seal-container">
            <div className="cs-prescript-seal">
              <svg className="cs-prescript-insignia" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M50 15 L50 85 M25 50 L75 50 M32 32 L68 68 M32 68 L68 32" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="10" fill="currentColor" />
              </svg>
            </div>
            <div className="cs-prescript-shards">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="cs-prescript-shard" style={{ '--i': i }} />
              ))}
            </div>
          </div>
        </div>
        <div className="cs-prescript-rod is-bottom" />
      </div>

      <div className="cs-flash is-silver" />
    </div>
  );
}
