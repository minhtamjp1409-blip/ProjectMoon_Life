import React from 'react';

/**
 * Sổ Nợ Thù Hận Ngón Giữa (The Middle Vengeance).
 * The open ledger of the Family, ruled rows steeped in violet ink,
 * encircled by binding chains of loyalty and retribution.
 */
export function VengeanceScene({ cut = 'full' }) {
  return (
    <div className={`cs-art cs-vengeance ${cut === 'still' ? 'is-still' : ''}`} aria-hidden="true">
      <div className="cs-vengeance-veil" />
      
      <div className="cs-vengeance-stage">
        {/* Tattoo Chain Ring */}
        <div className="cs-vengeance-chain-ring">
          <svg className="cs-vengeance-chains" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="14 8" />
            <circle cx="80" cy="80" r="58" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
          </svg>
        </div>

        {/* The Open Ledger */}
        <div className="cs-vengeance-tome">
          <div className="cs-vengeance-spine" />
          <div className="cs-vengeance-page is-left">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="cs-vengeance-row" style={{ '--i': i }} />
            ))}
          </div>
          <div className="cs-vengeance-page is-right">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="cs-vengeance-row" style={{ '--i': i }} />
            ))}
            <div className="cs-vengeance-ink-blot" />
          </div>
        </div>

        {/* Retribution mark */}
        <div className="cs-vengeance-mark">
          <svg viewBox="0 0 80 80">
            <polygon points="40,8 72,40 40,72 8,40" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="40" cy="40" r="14" fill="currentColor" opacity="0.8" />
          </svg>
        </div>
      </div>

      <div className="cs-flash is-violet" />
    </div>
  );
}
