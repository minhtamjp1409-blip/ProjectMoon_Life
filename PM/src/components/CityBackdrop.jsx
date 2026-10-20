import React from 'react';

/**
 * CityBackdrop - Architectural & Geometric Dystopian Wireframe
 * Pure SVG & CSS procedural backdrop inspired by Project Moon (Library of Ruina / Limbus Company).
 * Supports variants:
 * - 'hero': Full-screen hero section with multi-tier rotating wheels, blueprint tech boxes, and laser scanline.
 * - 'banner': Sleek horizontal terminal header backdrop for secondary archive pages.
 * - 'compact': Minimalist grid & glow.
 */
export const CityBackdrop = ({ variant = 'hero', tag = 'ARCHIVE // 0x7E3' }) => {
  if (variant === 'banner') {
    return (
      <div className="city-backdrop banner-backdrop" aria-hidden="true">
        <div className="city-glow banner-glow-gold" />
        <div className="city-glow banner-glow-indigo" />

        <svg className="city-svg-grid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bannerGridMinor" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(208, 169, 79, 0.04)" strokeWidth="1" />
            </pattern>
            <pattern id="bannerGridMajor" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(208, 169, 79, 0.08)" strokeWidth="1.2" />
              <path d="M -6 0 L 6 0 M 0 -6 L 0 6" fill="none" stroke="rgba(208, 169, 79, 0.25)" strokeWidth="1" />
            </pattern>
            <linearGradient id="bannerScanGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(208, 169, 79, 0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#bannerGridMinor)" />
          <rect width="100%" height="100%" fill="url(#bannerGridMajor)" />

          {/* Right-aligned Radar Compass Dial */}
          <g className="banner-radar-group" transform="translate(900, 60)">
            <circle cx="0" cy="0" r="110" fill="none" stroke="rgba(208, 169, 79, 0.12)" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="0" cy="0" r="85" fill="none" stroke="rgba(208, 169, 79, 0.18)" strokeWidth="1.2" />
            <polygon
              points="0,-65 46,-46 65,0 46,46 0,65 -46,46 -65,0 -46,-46"
              fill="none"
              stroke="rgba(208, 169, 79, 0.1)"
              strokeWidth="1"
            />
            <line x1="-125" y1="0" x2="125" y2="0" stroke="rgba(208, 169, 79, 0.2)" strokeWidth="1" />
            <line x1="0" y1="-80" x2="0" y2="80" stroke="rgba(208, 169, 79, 0.2)" strokeWidth="1" />
          </g>

          {/* Sweeping scanline */}
          <line className="banner-scan-line" x1="0" y1="0" x2="0" y2="100%" stroke="url(#bannerScanGrad)" strokeWidth="3" />
        </svg>

        {/* Technical Watermark Tag */}
        <div className="banner-tech-tag">
          <span className="banner-tech-pulse" />
          <code>{tag}</code>
        </div>

        {/* Reticles */}
        <span className="banner-reticle reticle-tl">+</span>
        <span className="banner-reticle reticle-tr">+</span>
        <span className="banner-reticle reticle-bl">+</span>
        <span className="banner-reticle reticle-br">+</span>
      </div>
    );
  }

  // Default: 'hero' variant
  return (
    <div className="city-backdrop" aria-hidden="true">
      {/* Ambient Atmospheric Radial Gradients */}
      <div className="city-glow glow-gold" />
      <div className="city-glow glow-purple" />
      <div className="city-glow glow-crimson" />

      {/* Primary SVG Technical Blueprint Geometry */}
      <svg className="city-svg-grid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 40px Minor Grid Pattern */}
          <pattern id="techGridMinor" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(208, 169, 79, 0.04)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1" fill="rgba(208, 169, 79, 0.12)" />
          </pattern>

          {/* 200px Major Grid Pattern with Crosshairs */}
          <pattern id="techGridMajor" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(208, 169, 79, 0.08)" strokeWidth="1.5" />
            <path d="M -8 0 L 8 0 M 0 -8 L 0 8" fill="none" stroke="rgba(208, 169, 79, 0.28)" strokeWidth="1" />
            <path d="M 194 0 L 200 0 200 6" fill="none" stroke="rgba(208, 169, 79, 0.2)" strokeWidth="1" />
          </pattern>

          {/* Linear gradient for scanning beam */}
          <linearGradient id="scanBeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(208, 169, 79, 0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Gold wireframe ring gradient */}
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(208, 169, 79, 0.25)" />
            <stop offset="50%" stopColor="rgba(208, 169, 79, 0.05)" />
            <stop offset="100%" stopColor="rgba(208, 169, 79, 0.3)" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#techGridMinor)" />
        <rect width="100%" height="100%" fill="url(#techGridMajor)" />

        {/* Rotating Architectural Wheels & City Mandalas */}
        <g className="city-ring-group city-ring-slow" transform="translate(380, 320)">
          <circle cx="0" cy="0" r="280" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="6 14" />
          <circle cx="0" cy="0" r="255" fill="none" stroke="rgba(208, 169, 79, 0.08)" strokeWidth="1" />
          
          <polygon
            points="0,-220 155,-155 220,0 155,155 0,220 -155,155 -220,0 -155,-155"
            fill="none"
            stroke="rgba(208, 169, 79, 0.12)"
            strokeWidth="1.2"
          />

          <circle cx="0" cy="0" r="160" fill="none" stroke="rgba(208, 169, 79, 0.18)" strokeWidth="1" strokeDasharray="3 9" />
          <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(208, 169, 79, 0.08)" strokeWidth="1.5" />
          <polygon
            points="0,-90 64,-64 90,0 64,64 0,90 -64,64 -90,0 -64,-64"
            fill="none"
            stroke="rgba(208, 169, 79, 0.16)"
            strokeWidth="1"
          />

          <line x1="-300" y1="0" x2="-260" y2="0" stroke="rgba(208, 169, 79, 0.3)" strokeWidth="1.5" />
          <line x1="260" y1="0" x2="300" y2="0" stroke="rgba(208, 169, 79, 0.3)" strokeWidth="1.5" />
          <line x1="0" y1="-300" x2="0" y2="-260" stroke="rgba(208, 169, 79, 0.3)" strokeWidth="1.5" />
          <line x1="0" y1="260" x2="0" y2="300" stroke="rgba(208, 169, 79, 0.3)" strokeWidth="1.5" />
        </g>

        {/* Counter-rotating Secondary Tech Wheel */}
        <g className="city-ring-group city-ring-reverse" transform="translate(380, 320)">
          <circle cx="0" cy="0" r="195" fill="none" stroke="rgba(208, 169, 79, 0.1)" strokeWidth="1" strokeDasharray="12 24" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="185"
              y1="0"
              x2="195"
              y2="0"
              stroke="rgba(208, 169, 79, 0.22)"
              strokeWidth="1"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Animated Scanning Light Beam */}
        <rect className="city-scan-beam" x="0" y="0" width="100%" height="80" fill="url(#scanBeam)" />
      </svg>

      {/* Floating Geometric Blueprint Panels with Corner Brackets */}
      <div className="tech-box tech-box-top-left">
        <div className="tech-box-header">
          <span className="tech-box-tag">ARCHIVE // SEC-26</span>
          <span className="tech-box-status">SYS.ACT</span>
        </div>
        <div className="tech-box-content">
          <p className="tech-box-code">0x7F · CITY_COORD [35.68, 139.76]</p>
          <p className="tech-box-label">HANA ASSOC. ARCHIVAL INDEX</p>
        </div>
        <div className="tech-box-ruler">
          <span /><span /><span /><span /><span /><span />
        </div>
      </div>

      <div className="tech-box tech-box-bottom-left">
        <div className="tech-box-header">
          <span className="tech-box-tag">DISTRICTS: I - XXVI</span>
          <span className="tech-box-pulse" />
        </div>
        <div className="tech-box-content">
          <p className="tech-box-label">WING HEADQUARTERS // NEST MATRIX</p>
          <div className="tech-box-bars">
            <i style={{ width: '68%' }} />
            <i style={{ width: '42%' }} />
            <i style={{ width: '85%' }} />
          </div>
        </div>
      </div>

      <div className="tech-box tech-box-top-right">
        <div className="tech-box-header">
          <span className="tech-box-tag">SWEEPER WATCH // 03:13</span>
          <span className="tech-box-status is-warn">TABOO_04</span>
        </div>
        <div className="tech-box-content">
          <p className="tech-box-code">CURFEW_STATUS: ENFORCED</p>
          <p className="tech-box-label">BACKSTREETS PURGE PROTOCOL</p>
        </div>
      </div>

      {/* Screen Corner Reticles */}
      <div className="city-reticle reticle-tl">
        <span>+</span>
        <small>001 // N</small>
      </div>
      <div className="city-reticle reticle-tr">
        <small>E // 026</small>
        <span>+</span>
      </div>
      <div className="city-reticle reticle-bl">
        <span>+</span>
        <small>SEC // OUT</small>
      </div>
      <div className="city-reticle reticle-br">
        <small>CORP // L</small>
        <span>+</span>
      </div>
    </div>
  );
};

export default CityBackdrop;
