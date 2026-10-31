import React from 'react';

// The Head's judgment: the room goes dark, a blue cut runs across it, the Claw's sight turns once,
// and the dark splits along the cut to show the judgment room behind. Drawn here, timed in cutscene.css.
const HEX = (r) => [0, 1, 2, 3, 4, 5].map((i) => {
  const a = (Math.PI / 3) * i - Math.PI / 2;
  return `${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`;
}).join(' ');

export function ClawScene() {
  return (
    <div className="cs-art" aria-hidden="true">
      <div className="cs-half is-top" />
      <div className="cs-half is-bottom" />
      <svg className="cs-sight" viewBox="0 0 200 200">
        <polygon className="cs-sight-outer" points={HEX(92)} />
        <polygon className="cs-sight-mid" points={HEX(70)} />
        <polygon className="cs-sight-inner" points={HEX(40)} />
      </svg>
      <div className="cs-cut">
        <span className="cs-cut-band" />
        <span className="cs-cut-core" />
      </div>
      <div className="cs-flash" />
    </div>
  );
}
