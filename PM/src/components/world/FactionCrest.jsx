import React from 'react';
import { crestKindFor } from '../../engine/sceneContext.js';

export { crestKindFor };

const PATHS = {
  // The Thumb: hierarchical chevron & flintlock barrel
  thumb: (
    <>
      <path d="M4 13L12 5L20 13" />
      <path d="M7 16L12 11L17 16" />
      <circle cx="12" cy="18.5" r="1.5" />
    </>
  ),
  // The Index: pendulum of the Loom & all-seeing eye arc
  index: (
    <>
      <path d="M12 3V13" />
      <polygon points="12,13 9,18 12,21 15,18" />
      <path d="M5 8C8 5 16 5 19 8" />
    </>
  ),
  // The Middle: open Book of Vengeance & chain links
  middle: (
    <>
      <path d="M4 6C7 6 10 7 12 9C14 7 17 6 20 6V18C17 18 14 19 12 21C10 19 7 18 4 18V6Z" />
      <path d="M12 9V21" />
    </>
  ),
  // The Ring: framed ring & diagonal brush-compass
  ring: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M5 19L19 5" />
    </>
  ),
  // The Pinky: sworn pinky hook & knotted thread
  pinky: (
    <>
      <path d="M7 6C7 12 10 15 14 15C16.5 15 18 13.5 18 11.5C18 9.5 16.5 8.5 14.5 8.5C12.5 8.5 10 11.5 10 17.5" />
      <circle cx="7" cy="5" r="1.5" />
    </>
  ),
  // Hana Color Fixer: eight-pointed Star of the City prism
  color: (
    <>
      <polygon points="12,2.5 14.4,9.6 21.5,12 14.4,14.4 12,21.5 9.6,14.4 2.5,12 9.6,9.6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  // Fixer: Hana hexagonal shield & blade line
  fixer: (
    <>
      <polygon points="12,3 19.5,7.5 19.5,16.5 12,21 4.5,16.5 4.5,7.5" />
      <path d="M12 6.5V17.5M8.5 12H15.5" />
    </>
  ),
  // Wing Employee: geometric corporate wing feathers
  wing: (
    <>
      <path d="M4 17C6 10 11 5 20 4C18 10 14 14 7 16" />
      <path d="M6 19C9 15 14 12 19 10" />
      <path d="M8 21C11 18 15 16 18 15" />
    </>
  ),
  // Workshop Craftsman: anvil & precision gear diamond
  workshop: (
    <>
      <path d="M4 9H17L20 12L17 14H7L5 11Z" />
      <path d="M8 14L6 19H16L14 14" />
      <circle cx="12" cy="6" r="1.8" />
    </>
  ),
  // Independent Syndicate: crossed street blades
  syndicate: (
    <>
      <path d="M5 19L19 5M15 5H19V9" />
      <path d="M19 19L5 5M9 5H5V9" />
    </>
  ),
  // Distortion — Labyrinth Sovereign: inward spiral
  'distortion-labyrinth': (
    <>
      <path d="M12 12M12 12L15 12L15 9L9 9L9 16L17 16L17 6L6 6L6 19L19 19" />
    </>
  ),
  // Distortion — Lucid Wanderer: half-masked slit eye
  'distortion-lucid': (
    <>
      <path d="M2.5 12C5.5 7 9 5.5 12 5.5C15 5.5 18.5 7 21.5 12C18.5 17 15 18.5 12 18.5C9 18.5 5.5 17 2.5 12Z" />
      <path d="M12 8V16" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // Distortion — Primordial Calamity: jagged crown & eclipse
  'distortion-primordial': (
    <>
      <polygon points="3,17 6,7 10,13 12,4 14,13 18,7 21,17" />
      <path d="M4 20H20" />
    </>
  ),
  // Distortion (General): fractured halo
  distortion: (
    <>
      <circle cx="12" cy="12" r="6.5" strokeDasharray="5 3" />
      <path d="M12 3L13.5 8.5L19 7L14.5 11.5L20 15L13.5 14.5L12 21L10.5 14.5L4 15L9.5 11.5L5 7L10.5 8.5Z" />
    </>
  ),
  // Outcast: watchfire beyond the wall
  outcast: (
    <>
      <path d="M12 4C15 8 17 11 15 15C14 17 10 17 9 15C7 11 9 8 12 4Z" />
      <path d="M5 20H19" />
    </>
  ),
  // Default City spire mark
  city: (
    <>
      <path d="M6 20V10L12 4L18 10V20" />
      <path d="M10 20V14H14V20" />
    </>
  )
};

export function FactionCrest({ char = null, ev = null, kind = null, size = 15, className = '' }) {
  const resolved = kind || crestKindFor(char, ev);
  const content = PATHS[resolved] || PATHS.city;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`faction-crest is-crest-${resolved} ${className}`.trim()}
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}

export default FactionCrest;
