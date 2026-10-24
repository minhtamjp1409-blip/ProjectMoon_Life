import React, { useEffect, useMemo, useRef, useState } from 'react';
import { startWeather } from './worldWeather';
import { DungeonBackdrop } from './DungeonBackdrop';

// Which silhouette stands under each world's sky
const FAMILY = {
  title: 'city', childhood: 'city', backstreets: 'city', fixer: 'city', syndicate: 'city', workshop: 'city', dead: 'city', distortion: 'city',
  'finger-index': 'city', 'finger-middle': 'city', 'finger-ring': 'city', 'finger-pinky': 'city', 'finger-thumb': 'city',
  nest: 'spires', wing: 'spires', outskirts: 'dunes', library: 'library', 'dungeon-night': 'city'
};

const seeded = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619) >>> 0;
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    h = Math.imul(h ^ (h >>> 13), 3266489909) >>> 0;
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
};

// A row of towers along the bottom of a 1440 x 420 box. Lit windows are few, a handful of them flicker.
function towers(rnd, { count, minH, maxH, minW, maxW, windows, spire = false }) {
  const shapes = [];
  const lights = [];
  let x = -20;
  while (x < 1460 && shapes.length < count) {
    const bw = minW + rnd() * (maxW - minW);
    const bh = minH + rnd() * (maxH - minH);
    const top = 420 - bh;
    shapes.push(spire
      ? `M${x},420 L${x},${top + 30} L${x + bw / 2},${top} L${x + bw},${top + 30} L${x + bw},420 Z`
      : `M${x},420 L${x},${top} L${x + bw * (0.2 + rnd() * 0.3)},${top} L${x + bw * 0.5},${top - (rnd() < 0.3 ? 14 : 0)} L${x + bw * 0.6},${top} L${x + bw},${top} L${x + bw},420 Z`);
    if (windows) {
      const cols = Math.max(1, Math.floor(bw / 9));
      const rows = Math.floor((bh - 14) / 12);
      for (let r = 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rnd() > windows) continue;
          lights.push({ x: x + 4 + c * 9, y: top + 10 + r * 12, f: rnd() < 0.08 });
        }
      }
    }
    x += bw + rnd() * 6;
  }
  return { d: shapes.join(' '), lights: lights.slice(0, 260) };
}

function Silhouette({ world }) {
  const family = FAMILY[world];
  const art = useMemo(() => {
    if (!family) return null;
    const rnd = seeded(world);
    if (family === 'city') {
      return {
        far: towers(rnd, { count: 60, minH: 150, maxH: 340, minW: 24, maxW: 64, windows: 0.03 }),
        near: towers(rnd, { count: 40, minH: 50, maxH: 190, minW: 40, maxW: 120, windows: world === 'fixer' ? 0.22 : world === 'dead' ? 0.02 : 0.12 })
      };
    }
    if (family === 'spires') {
      return {
        far: towers(rnd, { count: 40, minH: 220, maxH: 400, minW: 30, maxW: 64, windows: 0, spire: true }),
        near: towers(rnd, { count: 22, minH: 140, maxH: 300, minW: 50, maxW: 120, windows: 0.05 })
      };
    }
    return null;
  }, [world, family]);

  if (family === 'dunes') {
    return (
      <svg className="world-silhouette is-dunes" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle className="world-sun" cx="1040" cy="190" r="92" />
        <path className="world-far" d="M0,300 C220,250 380,320 620,280 C860,240 1080,310 1440,260 L1440,420 L0,420 Z" />
        <path className="world-near" d="M0,350 C260,320 520,380 760,340 C1000,300 1220,370 1440,330 L1440,420 L0,420 Z" />
      </svg>
    );
  }
  if (family === 'library') {
    return (
      <svg className="world-silhouette is-library" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} className="world-far" d={`M${i * 170 - 20},420 L${i * 170 - 20},170 Q${i * 170 + 55},70 ${i * 170 + 130},170 L${i * 170 + 130},420 Z`} />
        ))}
        {Array.from({ length: 22 }, (_, i) => (
          <rect key={`s${i}`} className="world-near" x={i * 68} y={260 + (i % 3) * 14} width="52" height="160" />
        ))}
      </svg>
    );
  }
  if (!art) return null;
  return (
    <svg className={`world-silhouette is-${family}`} viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path className="world-far" d={art.far.d} />
      <g className="world-lights is-far">
        {art.far.lights.map((l, i) => <rect key={i} x={l.x} y={l.y} width="2" height="3" />)}
      </g>
      <path className="world-near" d={art.near.d} />
      <g className="world-lights">
        {art.near.lights.map((l, i) => (
          <rect key={i} x={l.x} y={l.y} width="3" height="4" className={l.f ? 'is-flicker' : undefined} style={l.f ? { animationDelay: `${(i % 17) * 0.7}s` } : undefined} />
        ))}
      </g>
    </svg>
  );
}

function Weather({ kind, color }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !kind) return undefined;
    const mode = document.documentElement.dataset.motion;
    const reduced = mode === 'reduced' || (mode !== 'full' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
    return startWeather(ref.current, kind, color, { reduced });
  }, [kind, color]);
  return <canvas ref={ref} className="world-weather" aria-hidden="true" />;
}

function Scene({ scene, session, leaving }) {
  return (
    <div className={`world-scene ${leaving ? 'is-leaving' : ''}`} data-world={scene.world}>
      <div className="world-sky" />
      <div className="world-glow" />
      <Silhouette world={scene.world} />
      {session && <DungeonBackdrop session={session} />}
      <Weather kind={scene.weather} color={scene.accent} />
    </div>
  );
}

/**
 * The world behind the whole interface. A change of world crossfades: the old scene stays a moment
 * while the new one rises over it. E.G.O, a Hana Color and danger are overlays on whatever world it is.
 */
export function WorldBackdrop({ scene, session }) {
  const [shown, setShown] = useState([scene]);
  // A Color conferred or an E.G.O awakened gets one burst of light, only on the change itself
  const [burst, setBurst] = useState(null);
  const prev = useRef(scene);
  useEffect(() => {
    const was = prev.current;
    prev.current = scene;
    let kind = null;
    if (scene.color && !was.color) kind = 'color';
    else if (scene.ego !== 'none' && scene.ego !== was.ego) kind = 'ego';
    if (!kind) return undefined;
    setBurst({ kind, at: Date.now() });
    const id = setTimeout(() => setBurst(null), 2800);
    return () => clearTimeout(id);
  }, [scene.color, scene.ego]);
  useEffect(() => {
    setShown((prev) => (prev[prev.length - 1]?.world === scene.world && prev[prev.length - 1]?.weather === scene.weather ? [...prev.slice(0, -1), scene] : [...prev.slice(-1), scene]));
    const id = setTimeout(() => setShown((prev) => prev.slice(-1)), 1700);
    return () => clearTimeout(id);
  }, [scene.world, scene.weather, scene.accent]);

  return (
    <div
      className="world"
      data-ego={scene.ego}
      data-danger={scene.danger ? 'on' : undefined}
      data-color={scene.color ? 'on' : undefined}
      style={scene.color ? { '--w-color': scene.color } : undefined}
      aria-hidden="true"
    >
      {shown.map((s, i) => (
        <Scene key={`${s.world}-${s.weather}`} scene={s} session={s.world.startsWith('dungeon-') ? session : null} leaving={i < shown.length - 1} />
      ))}
      <div className="world-color" />
      <div className="world-ego" />
      <div className="world-danger" />
      {burst && <div key={burst.at} className={"world-burst is-" + burst.kind} />}
      <div className="world-vignette" />
      <div className="world-grain" />
    </div>
  );
}

export default WorldBackdrop;
