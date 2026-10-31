import React from 'react';

// The top seat of a Finger. Each Finger leaves its own mark in its colour (--cs-color) behind the title:
// the Index a prescript slip unfolding, the Middle the ruled lines of its book of vengeance, the Ring one brush stroke,
// the Pinky an eight-pointed star, the Thumb a heavy bar brought down once.
const STAR = Array.from({ length: 16 }, (_, i) => {
  const a = (Math.PI / 8) * i - Math.PI / 2;
  const r = i % 2 ? 34 : 92;
  return `${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`;
}).join(' ');

function Mark({ variant }) {
  if (variant === 'index') {
    return (
      <div className="cs-mark cs-slip">
        {[0, 1, 2, 3, 4].map((i) => <span key={i} className="cs-slip-line" style={{ '--i': i }} />)}
      </div>
    );
  }
  if (variant === 'middle') {
    return (
      <div className="cs-mark cs-ledger">
        {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="cs-ledger-line" style={{ '--i': i }} />)}
      </div>
    );
  }
  if (variant === 'ring') return <div className="cs-mark cs-stroke" />;
  if (variant === 'pinky') {
    return (
      <svg className="cs-mark cs-star" viewBox="0 0 200 200">
        <polygon points={STAR} />
      </svg>
    );
  }
  return <div className="cs-mark cs-bar" />;
}

export function FingerScene({ variant }) {
  return (
    <div className="cs-art" aria-hidden="true">
      <Mark variant={variant} />
      <div className="cs-flash" />
    </div>
  );
}
