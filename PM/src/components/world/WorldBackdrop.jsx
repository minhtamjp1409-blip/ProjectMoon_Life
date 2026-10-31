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

// The street skyline by the kind of District: the head Districts in spires, the industrial ones low and wide,
// the commercial ones tall and lit, the clinics in even blocks, the lake shore low over the water, the fallen L Corp dark
const CITY_SHAPE = {
  city: { far: [150, 340, 24, 64], near: [50, 190, 40, 120], lit: 0.12 },
  head: { far: [220, 400, 26, 56], near: [90, 240, 36, 90], lit: 0.16, spire: true },
  industrial: { far: [110, 250, 40, 96], near: [40, 140, 70, 160], lit: 0.06 },
  commercial: { far: [180, 370, 22, 58], near: [70, 230, 36, 100], lit: 0.2 },
  medical: { far: [190, 260, 34, 60], near: [80, 150, 50, 90], lit: 0.14 },
  lake: { far: [90, 210, 28, 70], near: [30, 110, 40, 110], lit: 0.1 },
  fallen: { far: [70, 300, 24, 80], near: [30, 160, 40, 130], lit: 0.01 }
};

function Silhouette({ world, place }) {
  const family = FAMILY[world];
  const art = useMemo(() => {
    if (!family) return null;
    const rnd = seeded(`${world}:${place}`);
    if (family === 'city') {
      const shape = CITY_SHAPE[place] || CITY_SHAPE.city;
      const [fMinH, fMaxH, fMinW, fMaxW] = shape.far;
      const [nMinH, nMaxH, nMinW, nMaxW] = shape.near;
      return {
        far: towers(rnd, { count: 60, minH: fMinH, maxH: fMaxH, minW: fMinW, maxW: fMaxW, windows: 0.03, spire: shape.spire }),
        near: towers(rnd, { count: 40, minH: nMinH, maxH: nMaxH, minW: nMinW, maxW: nMaxW, windows: world === 'fixer' ? shape.lit + 0.1 : world === 'dead' ? 0.02 : shape.lit })
      };
    }
    if (family === 'spires') {
      return {
        far: towers(rnd, { count: 40, minH: 220, maxH: 400, minW: 30, maxW: 64, windows: 0, spire: true }),
        near: towers(rnd, { count: 22, minH: 140, maxH: 300, minW: 50, maxW: 120, windows: 0.05 })
      };
    }
    return null;
  }, [world, family, place]);

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

// A change of weather (the seasons on the street worlds) fades one canvas into the next; the sky and skyline stay put
function WeatherStack({ kind, color }) {
  const [layers, setLayers] = useState([kind]);
  useEffect(() => {
    setLayers((prev) => (prev[prev.length - 1] === kind ? prev : [...prev.slice(-1), kind]));
    const id = setTimeout(() => setLayers((prev) => prev.slice(-1)), 1300);
    return () => clearTimeout(id);
  }, [kind]);
  return layers.map((k, i) => (
    <div key={k} className={`world-weather-layer ${i < layers.length - 1 ? 'is-leaving' : ''}`}>
      <Weather kind={k} color={color} />
    </div>
  ));
}

function Scene({ scene, session, leaving }) {
  return (
    <div className={`world-scene ${leaving ? 'is-leaving' : ''}`} data-world={scene.world} data-place={scene.place}>
      <div className="world-sky" />
      <div className="world-glow" />
      <Silhouette world={scene.world} place={scene.place} />
      {scene.place === 'lake' && FAMILY[scene.world] === 'city' && <div className="world-water" />}
      {session && <DungeonBackdrop session={session} />}
      <WeatherStack kind={scene.weather} color={scene.accent} />
    </div>
  );
}

const sceneId = (s) => `${s?.world}|${s?.place || 'city'}`;

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
  // Only a new world or a new kind of District crossfades the whole scene; weather and accent update the scene already showing
  useEffect(() => {
    setShown((prev) => (sceneId(prev[prev.length - 1]) === sceneId(scene) ? [...prev.slice(0, -1), scene] : [...prev.slice(-1), scene]));
    const id = setTimeout(() => setShown((prev) => prev.slice(-1)), 1700);
    return () => clearTimeout(id);
  }, [scene.world, scene.place, scene.weather, scene.accent]);

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
        <Scene key={sceneId(s)} scene={s} session={s.world.startsWith('dungeon-') ? session : null} leaving={i < shown.length - 1} />
      ))}
      {/* WARP, the Great Lake and K Corp lay a tint of their own over whatever world stands there */}
      <div className="world-mood" data-mood={scene.mood || 'normal'} />
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
