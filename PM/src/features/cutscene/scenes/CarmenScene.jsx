import React from 'react';
import { useT } from '../../../i18n';
import { CUTSCENES } from '../registry';

// Carmen's call: warm light beats slowly at the centre while whispers drift in from the edges and thicken,
// then everything goes quiet for the one sentence. Each fragment gets its direction and delay here; cutscene.css runs them.
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const COUNT = { full: 24, lite: 6, still: 6 };

function fragments(cut) {
  const n = COUNT[cut] || 0;
  // The last whisper sets out about 3.1 s in, so the crowd has thinned by the time the sentence is read
  const span = cut === 'full' ? 2700 : 300;
  return Array.from({ length: n }, (_, i) => {
    const a = i * GOLDEN;
    return {
      x: Math.cos(a).toFixed(3),
      y: (Math.sin(a) * 0.8).toFixed(3),
      // Square root spacing: the gaps shrink, so the whispers thicken toward the end
      delay: Math.round((cut === 'full' ? 500 : 0) + span * Math.sqrt(i / n))
    };
  });
}

export function CarmenScene({ cut }) {
  const { t } = useT();
  const words = CUTSCENES.carmen.whispers;
  return (
    <div className="cs-art" aria-hidden="true">
      <div className="cs-sun" />
      <span className="cs-beat" />
      <span className="cs-beat is-wide" />
      {fragments(cut).map((f, i) => (
        <span
          key={i}
          className="cs-whisper"
          style={{ '--wx': f.x, '--wy': f.y, '--wd': `${f.delay}ms` }}
        >
          {t(words[i % words.length].vi, words[i % words.length].en)}
        </span>
      ))}
    </div>
  );
}
