import React, { useMemo } from 'react';
import { DUNGEON_DEFINITIONS } from '../../engine/gameEngine';

// Every dungeon is drawn on a 1440 x 900 stage that fills the screen (cropped, never stretched).
// The pieces move with CSS (dungeon-scenes.css); the weather canvas of the world runs on top.

const seeded = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619) >>> 0;
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    h = Math.imul(h ^ (h >>> 13), 3266489909) >>> 0;
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
};

// A soft round glow without a filter: a radial gradient from the colour to nothing
const Glow = ({ id, color, opacity = 1 }) => (
  <radialGradient id={id} cx=".5" cy=".5" r=".5">
    <stop offset="0" stopColor={color} stopOpacity={opacity} />
    <stop offset="1" stopColor={color} stopOpacity="0" />
  </radialGradient>
);

const Stage = ({ children, name }) => (
  <svg className={`dgs dgs-${name}`} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">{children}</svg>
);

// A side wall in one-point perspective: from the screen edge (x = 0) to the far end (x = X).
// at(x, f) is the point a fraction f of the way from the wall's top to its bottom.
const wall = ({ X, T0, Ti, B0, Bi }) => {
  const at = (x, f) => {
    const top = T0 + (Ti - T0) * (x / X);
    const bottom = B0 + (Bi - B0) * (x / X);
    return top + (bottom - top) * f;
  };
  const quad = (x1, x2, f1, f2, mirror = false) => {
    const px = (x) => (mirror ? 1440 - x : x);
    return `${px(x1)},${at(x1, f1)} ${px(x2)},${at(x2, f1)} ${px(x2)},${at(x2, f2)} ${px(x1)},${at(x1, f2)}`;
  };
  return { at, quad };
};

/* WARP: inside a car at full speed. The City streaks past the windows, the straps sway. */
function WarpCar() {
  const streaks = useMemo(() => {
    // One screen's width of streaks, drawn twice side by side so the loop has no seam
    const rnd = seeded('warp');
    const one = Array.from({ length: 36 }, () => ({ x: rnd() * 1440, y: 250 + rnd() * 270, len: 60 + rnd() * 320, w: rnd() < 0.2 ? 3 : 1.2, hot: rnd() < 0.25 }));
    return [...one, ...one.map((s) => ({ ...s, x: s.x + 1440 }))];
  }, []);
  const windows = [0, 1, 2, 3, 4].map((i) => 40 + i * 284);
  return (
    <Stage name="warp">
      <defs>
        <linearGradient id="dgs-warp-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b3a5c" />
          <stop offset=".55" stopColor="#1590c4" stopOpacity=".55" />
          <stop offset="1" stopColor="#061b2b" />
        </linearGradient>
        <clipPath id="dgs-warp-clip">
          {windows.map((x) => <rect key={x} x={x} y="240" width="236" height="290" rx="22" />)}
        </clipPath>
        <Glow id="dgs-warp-rift" color="#5fd2ff" opacity={0.5} />
      </defs>
      <g className="warp-sway">
        <rect className="warp-wall" x="-40" y="0" width="1520" height="900" />
        <rect className="warp-ceiling" x="-40" y="0" width="1520" height="150" />
        <rect className="warp-ceil-light" x="80" y="118" width="1280" height="8" rx="4" />
        {windows.map((x) => <rect key={x} className="warp-window" x={x} y="240" width="236" height="290" rx="22" fill="url(#dgs-warp-win)" />)}
        <g clipPath="url(#dgs-warp-clip)">
          <g className="warp-streaks">
            {streaks.map((s, i) => (
              <line key={i} className={s.hot ? 'is-hot' : undefined} x1={s.x} y1={s.y} x2={s.x + s.len} y2={s.y} strokeWidth={s.w} />
            ))}
          </g>
        </g>
        {windows.map((x) => <rect key={`f${x}`} className="warp-frame" x={x} y="240" width="236" height="290" rx="22" />)}
        <line className="warp-rail" x1="-40" y1="196" x2="1480" y2="196" />
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`translate(${70 + i * 118} 196)`}>
            <g className="warp-strap" style={{ animationDelay: `${(i % 4) * -0.4}s` }}>
              <line x1="0" y1="0" x2="0" y2="34" />
              <circle cx="0" cy="46" r="12" />
            </g>
          </g>
        ))}
        <rect className="warp-seat" x="-40" y="600" width="1520" height="80" />
        <rect className="warp-floor" x="-40" y="680" width="1520" height="240" />
        {Array.from({ length: 9 }, (_, i) => <line key={i} className="warp-floor-line" x1={i * 180} y1="680" x2={i * 180 - 220} y2="900" />)}
      </g>
      <circle className="warp-rift" cx="720" cy="390" r="260" fill="url(#dgs-warp-rift)" />
    </Stage>
  );
}

/* L Corp: a containment corridor in the ruins. Unit doors along both walls, lamps blink, a siren turns. */
function Facility() {
  const w = wall({ X: 560, T0: 0, Ti: 330, B0: 900, Bi: 560 });
  const doors = [[30, 170], [230, 330], [380, 450], [480, 525]];
  return (
    <Stage name="lobotomy">
      <defs>
        <pattern id="dgs-lob-hazard" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="28" fill="#f2a531" />
          <rect x="14" width="14" height="28" fill="#120b02" />
        </pattern>
        <radialGradient id="dgs-lob-core" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffd27a" stopOpacity=".9" />
          <stop offset="1" stopColor="#f2a531" stopOpacity="0" />
        </radialGradient>
      </defs>
      <polygon className="lob-ceiling" points="0,0 1440,0 880,330 560,330" />
      <polygon className="lob-wall" points="0,0 560,330 560,560 0,900" />
      <polygon className="lob-wall" points="1440,0 880,330 880,560 1440,900" />
      <polygon className="lob-floor" points="0,900 560,560 880,560 1440,900" />
      <polygon className="lob-hazard" fill="url(#dgs-lob-hazard)" points="0,900 560,560 575,560 60,900" />
      <polygon className="lob-hazard" fill="url(#dgs-lob-hazard)" points="1440,900 880,560 865,560 1380,900" />
      {[0.1, 0.32, 0.5, 0.64, 0.74].map((f, i) => {
        const y = 330 * f * 1.1;
        const half = 360 - 180 * f * 1.8;
        return <polygon key={i} className="lob-ceil-light" style={{ animationDelay: `${i * -1.3}s` }} points={`${720 - half},${y} ${720 + half},${y} ${720 + half * 0.92},${y + 10} ${720 - half * 0.92},${y + 10}`} />;
      })}
      {doors.map(([x1, x2], i) => (
        <g key={i}>
          <polygon className="lob-door" points={w.quad(x1, x2, 0.22, 0.86)} />
          <polygon className="lob-door" points={w.quad(x1, x2, 0.22, 0.86, true)} />
          <polygon className="lob-lamp" style={{ animationDelay: `${i * -0.7}s` }} points={w.quad(x1 + (x2 - x1) * 0.3, x2 - (x2 - x1) * 0.3, 0.15, 0.19)} />
          <polygon className="lob-lamp" style={{ animationDelay: `${i * -0.7 - 0.35}s` }} points={w.quad(x1 + (x2 - x1) * 0.3, x2 - (x2 - x1) * 0.3, 0.15, 0.19, true)} />
        </g>
      ))}
      <rect className="lob-end" x="560" y="330" width="320" height="230" />
      <rect className="lob-end-door" x="640" y="380" width="160" height="180" />
      <line className="lob-end-seam" x1="720" y1="380" x2="720" y2="560" />
      <circle className="lob-core" cx="720" cy="470" r="140" fill="url(#dgs-lob-core)" />
      <g className="lob-siren">
        <polygon points="720,352 1500,180 1500,520" />
        <polygon points="720,352 -60,520 -60,180" />
      </g>
      <circle className="lob-siren-head" cx="720" cy="352" r="9" />
    </Stage>
  );
}

/* La Manchaland: the carnival at night. A wheel turns against a red moon, bulbs blink along the wires. */
function Carnival() {
  const bulbs = (y0, sag, n, offset) => Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const x = -20 + t * 1480;
    const y = y0 + sag * 4 * t * (1 - t);
    return <circle key={`${y0}-${i}`} className={`car-bulb ${(i + offset) % 2 ? 'is-b' : 'is-a'}`} cx={x} cy={y} r="5" />;
  });
  return (
    <Stage name="bloodfiend">
      <defs>
        <Glow id="dgs-car-glow" color="#f0435c" opacity={0.5} />
        <Glow id="dgs-car-mist" color="#f0435c" opacity={0.35} />
      </defs>
      <circle className="car-moon-glow" cx="300" cy="190" r="240" fill="url(#dgs-car-glow)" />
      <circle className="car-moon" cx="300" cy="190" r="74" />
      <ellipse className="car-mist is-far" cx="720" cy="640" rx="900" ry="130" fill="url(#dgs-car-mist)" />
      <g className="car-wheel-legs">
        <line x1="1080" y1="430" x2="930" y2="900" />
        <line x1="1080" y1="430" x2="1230" y2="900" />
      </g>
      <g className="car-wheel">
        <circle className="car-rim" cx="1080" cy="430" r="290" />
        <circle className="car-rim is-inner" cx="1080" cy="430" r="250" />
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <g key={i}>
              <line className="car-spoke" x1="1080" y1="430" x2={1080 + Math.cos(a) * 290} y2={430 + Math.sin(a) * 290} />
              <circle className={`car-rim-light ${i % 2 ? 'is-b' : 'is-a'}`} cx={1080 + Math.cos(a) * 290} cy={430 + Math.sin(a) * 290} r="7" />
              <circle className="car-gondola" cx={1080 + Math.cos(a) * 312} cy={430 + Math.sin(a) * 312} r="14" />
            </g>
          );
        })}
        <circle className="car-hub" cx="1080" cy="430" r="22" />
      </g>
      {[[40, 640, 150], [250, 680, 120], [520, 700, 90]].map(([x, y, s], i) => (
        <g key={i} className="car-tent">
          <polygon points={`${x},${y + s} ${x + s / 2},${y} ${x + s},${y + s}`} />
          <polygon className="car-tent-stripe" points={`${x + s / 2},${y} ${x + s * 0.38},${y + s} ${x + s * 0.62},${y + s}`} />
        </g>
      ))}
      <rect className="car-ground" x="-20" y="820" width="1480" height="100" />
      <path className="car-wire" d="M-20,60 Q720,260 1460,60" />
      <path className="car-wire" d="M-20,140 Q720,300 1460,140" />
      {bulbs(60, 200, 25, 0)}
      {bulbs(140, 160, 21, 1)}
      <ellipse className="car-mist" cx="420" cy="860" rx="700" ry="110" fill="url(#dgs-car-mist)" />
    </Stage>
  );
}

/* The Outskirts: ruins older than the City under a low sun; the heat bends the air, the dunes creep. */
function Ruins() {
  return (
    <Stage name="outskirts">
      <defs><Glow id="dgs-ruin-glow" color="#e8a85c" opacity={0.55} /></defs>
      <circle className="ruin-sun-glow" cx="980" cy="470" r="380" fill="url(#dgs-ruin-glow)" />
      <circle className="ruin-sun" cx="980" cy="470" r="130" />
      <path className="ruin-mesa" d="M0,560 L120,520 L180,470 L330,470 L380,520 L620,540 L700,500 L860,500 L900,540 L1440,560 L1440,900 L0,900 Z" />
      <g className="ruin-stones">
        <path d="M150,700 L170,380 L240,372 L262,700 Z" />
        <path d="M300,700 L318,300 L360,290 L392,330 L378,700 Z" />
        <path d="M560,700 L560,430 L600,410 L640,430 L640,700 Z" />
        <path d="M1180,700 L1200,330 L1290,330 L1290,360 L1240,360 L1236,700 Z" />
        <path d="M1290,700 L1290,420 L1330,420 L1345,700 Z" />
        <path className="ruin-arch" d="M740,700 L740,420 Q860,300 980,420 L980,700 L940,700 L940,440 Q860,370 780,440 L780,700 Z" />
      </g>
      <rect className="ruin-heat" x="0" y="440" width="1440" height="120" />
      <path className="ruin-dune is-far" d="M-60,700 C200,640 420,720 700,670 C980,620 1200,700 1500,650 L1500,900 L-60,900 Z" />
      <path className="ruin-dune" d="M-80,780 C220,740 520,820 800,770 C1080,720 1280,800 1520,760 L1520,900 L-80,900 Z" />
    </Stage>
  );
}

/* The Great Lake: under the surface. Light falls in shafts, something vast passes far off, the U Corp rings hum. */
function Abyss() {
  return (
    <Stage name="greatlake">
      <defs>
        <linearGradient id="dgs-lake-shaft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9fff6" stopOpacity=".34" />
          <stop offset="1" stopColor="#4fd6c8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="lake-surface" d="M-40,40 Q60,20 160,40 T360,40 T560,40 T760,40 T960,40 T1160,40 T1360,40 T1560,40 T1760,40 L1760,-20 L-40,-20 Z" />
      <g className="lake-shafts">
        {[[180, 60, 300], [470, 90, 380], [760, 70, 320], [1050, 100, 420], [1300, 60, 260]].map(([x, w, spread], i) => (
          <polygon key={i} className="lake-shaft" style={{ animationDelay: `${i * -1.7}s` }} points={`${x},0 ${x + w},0 ${x + w + spread / 2},900 ${x - spread / 2},900`} fill="url(#dgs-lake-shaft)" />
        ))}
      </g>
      <g className="lake-whale">
        <path d="M0,0 C140,-74 420,-86 600,-18 C650,0 700,-6 742,-40 L776,-86 L770,-8 L800,52 L748,22 C700,6 650,18 600,32 C420,96 140,84 0,0 Z" />
        <circle className="lake-whale-eye" cx="96" cy="-6" r="6" />
      </g>
      {[0, 1, 2].map((i) => <ellipse key={i} className="lake-ring" style={{ animationDelay: `${i * -2.6}s` }} cx="720" cy="700" rx="260" ry="60" />)}
      {Array.from({ length: 14 }, (_, i) => {
        const x = 30 + i * 105 + (i % 3) * 18;
        const h = 160 + ((i * 53) % 140);
        return <path key={i} className="lake-weed" style={{ animationDelay: `${i * -0.6}s` }} d={`M${x},900 C${x - 26},${900 - h * 0.4} ${x + 30},${900 - h * 0.7} ${x},${900 - h}`} />;
      })}
    </Stage>
  );
}

/* Night in the Backstreets: shut doors, a lamp that will not hold, ink in the gutters. At 3:13 the suits walk in. */
function Alley() {
  const w = wall({ X: 600, T0: -120, Ti: 250, B0: 900, Bi: 600 });
  const shutters = [[20, 170], [250, 360], [420, 495], [530, 570]];
  return (
    <Stage name="night">
      <defs>
        <linearGradient id="dgs-night-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe3a0" stopOpacity=".42" />
          <stop offset="1" stopColor="#ffe3a0" stopOpacity="0" />
        </linearGradient>
        <pattern id="dgs-night-shutter" width="8" height="9" patternUnits="userSpaceOnUse">
          <rect width="8" height="9" fill="#14111f" />
          <rect y="7" width="8" height="2" fill="#221d33" />
        </pattern>
      </defs>
      <polygon className="night-wall" points="0,-120 600,250 600,600 0,900" />
      <polygon className="night-wall" points="1440,-120 840,250 840,600 1440,900" />
      <polygon className="night-street" points="0,900 600,600 840,600 1440,900" />
      <rect className="night-far" x="600" y="250" width="240" height="350" />
      {shutters.map(([x1, x2], i) => (
        <g key={i}>
          <polygon className="night-shutter" fill="url(#dgs-night-shutter)" points={w.quad(x1, x2, 0.45, 0.94)} />
          <polygon className="night-shutter" fill="url(#dgs-night-shutter)" points={w.quad(x1, x2, 0.45, 0.94, true)} />
          <polygon className={`night-window ${i === 1 ? 'is-lit' : ''}`} points={w.quad(x1 + 10, x2 - 10, 0.12, 0.3)} />
          <polygon className={`night-window ${i === 2 ? 'is-lit is-late' : ''}`} points={w.quad(x1 + 10, x2 - 10, 0.12, 0.3, true)} />
        </g>
      ))}
      <g className="night-clock">
        <circle cx="1210" cy="250" r="54" />
        <text x="1210" y="262" textAnchor="middle">3:13</text>
      </g>
      <line className="night-pole" x1="300" y1="900" x2="300" y2="300" />
      <path className="night-pole" d="M300,300 Q300,270 340,270 L380,270" />
      <g className="night-lamp">
        <polygon points="300,290 400,290 640,900 40,900" fill="url(#dgs-night-cone)" />
        <rect className="night-bulb" x="360" y="272" width="40" height="12" rx="4" />
      </g>
      <ellipse className="night-ink" cx="520" cy="820" rx="200" ry="26" />
      <ellipse className="night-ink is-late" cx="1010" cy="760" rx="150" ry="18" />
      {[[690, 0], [740, -3], [790, -6]].map(([x, delay], i) => (
        <g key={i} transform={`translate(${x} 600)`}>
          <g className="night-suit" style={{ animationDelay: `${delay}s` }}>
            <circle cx="0" cy="-96" r="8" />
            <path d="M-10,-86 L10,-86 L16,0 L-16,0 Z" />
          </g>
        </g>
      ))}
    </Stage>
  );
}

/* The Claw: the Head's judgment. A sterile room, a sight that does not blink, the serums appear one by one. */
function Judgment() {
  return (
    <Stage name="claw">
      <rect className="claw-back" x="380" y="160" width="680" height="420" />
      <polygon className="claw-side" points="0,0 380,160 380,580 0,900" />
      <polygon className="claw-side" points="1440,0 1060,160 1060,580 1440,900" />
      <polygon className="claw-floor" points="0,900 380,580 1060,580 1440,900" />
      {Array.from({ length: 11 }, (_, i) => <line key={i} className="claw-grid" x1={380 + i * 68} y1="580" x2={-300 + i * 204} y2="900" />)}
      {[620, 680, 760, 860].map((y) => <line key={y} className="claw-grid" x1={380 - (y - 580) * 1.19} y1={y} x2={1060 + (y - 580) * 1.19} y2={y} />)}
      <line className="claw-seam" x1="720" y1="160" x2="720" y2="580" />
      <g className="claw-sight">
        <circle className="claw-ring is-outer" cx="720" cy="380" r="250" />
        <circle className="claw-ring is-inner" cx="720" cy="380" r="160" />
        <line x1="720" y1="90" x2="720" y2="200" />
        <line x1="720" y1="560" x2="720" y2="670" />
        <line x1="430" y1="380" x2="540" y2="380" />
        <line x1="900" y1="380" x2="1010" y2="380" />
      </g>
      <line className="claw-scan" x1="0" y1="0" x2="1440" y2="0" />
      <g className="claw-serums">
        <rect className="claw-serum is-w" x="1230" y="300" width="26" height="110" rx="12" />
        <rect className="claw-serum is-r" x="1280" y="300" width="26" height="110" rx="12" />
        <rect className="claw-serum is-k" x="1330" y="300" width="26" height="110" rx="12" />
      </g>
      <line className="claw-cut" x1="260" y1="640" x2="1180" y2="180" />
    </Stage>
  );
}

const SCENES = { warp: WarpCar, lobotomy: Facility, bloodfiend: Carnival, outskirts: Ruins, greatlake: Abyss, night: Alley, claw: Judgment };

export const DungeonBackdrop = ({ session }) => {
  if (!session) return null;
  const def = DUNGEON_DEFINITIONS[session.id];
  const theme = def?.theme || 'warp';
  const Scene = SCENES[theme] || WarpCar;
  const strain = session.sanityStrain || 0;
  const fight = session.combat && !session.combat.done ? session.combat : null;
  const floorKind = fight ? fight.plan[fight.floor]?.kind : null;
  const fx = session.lastStageResult?.fx;

  return (
    <div
      className={`dungeon-backdrop theme-${theme} is-stage-${session.currentStageIndex || 0} ${fight ? `is-floor-${fight.floor} is-${floorKind}` : ''} ${fight?.phase === 2 ? 'is-phase-2' : ''} ${strain >= 60 ? 'is-high-strain' : ''} ${strain >= 85 ? 'is-crit-strain' : ''}`}
      aria-hidden="true"
    >
      <Scene />
      {/* A hit, a block or a fallen enemy ripples through the whole scene once */}
      {fx && <span key={session.lastStageResult?.nonce || 0} className={`dgb-flash fx-${fx}`} />}
      {/* Strain darkens the edges and bleeds them red */}
      <div className="strain-vignette" style={{ opacity: Math.min(0.7, Math.max(0, (strain - 15) / 100)) }} />
    </div>
  );
};
