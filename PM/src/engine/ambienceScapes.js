// Ambient soundscapes for each world, built from noise, rumble and mechanical events. There is no music
// here on purpose: no melody, no chords, only the sound of the place (rain, a train on its rails, a
// forge, an office's air handling, Carmen's whispering). Each scape is a list of layers; a layer is either
// a bed (a loop that never stops) or an event (a short sound at random intervals).

const rand = (a, b) => a + Math.random() * (b - a);

function bed(ctx, dest, buffer, { type = 'lowpass', freq = 800, q = 0.7, gain = 0.2, lfo = 0, lfoDepth = 0, lfoTarget = 'gain', pan = 0 } = {}) {
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  src.loopStart = 0;
  const flt = ctx.createBiquadFilter();
  flt.type = type;
  flt.frequency.value = freq;
  flt.Q.value = q;
  const g = ctx.createGain();
  g.gain.value = gain;
  let last = g;
  if (pan && ctx.createStereoPanner) {
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    g.connect(p);
    last = p;
  }
  src.connect(flt);
  flt.connect(g);
  last.connect(dest);
  const sources = [src];
  if (lfo) {
    const o = ctx.createOscillator();
    const d = ctx.createGain();
    o.frequency.value = lfo;
    d.gain.value = lfoDepth;
    o.connect(d);
    d.connect(lfoTarget === 'freq' ? flt.frequency : g.gain);
    o.start();
    sources.push(o);
  }
  src.start(0, Math.random() * 2);
  return sources;
}

function burst(ctx, dest, buffer, t, { type = 'bandpass', freq = 2000, q = 1, peak = 0.2, attack = 0.002, decay = 0.08, pan = 0, sweepTo = 0 } = {}) {
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const flt = ctx.createBiquadFilter();
  flt.type = type;
  flt.frequency.setValueAtTime(freq, t);
  if (sweepTo) flt.frequency.exponentialRampToValueAtTime(sweepTo, t + attack + decay);
  flt.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  src.connect(flt);
  flt.connect(g);
  if (pan && ctx.createStereoPanner) {
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    g.connect(p);
    p.connect(dest);
  } else g.connect(dest);
  src.start(t, Math.random() * 1.5);
  src.stop(t + attack + decay + 0.1);
  src.onended = () => { try { src.disconnect(); g.disconnect(); } catch {} };
}

function thud(ctx, dest, t, { from = 90, to = 40, peak = 0.3, decay = 0.25 } = {}) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.setValueAtTime(from, t);
  o.frequency.exponentialRampToValueAtTime(to, t + decay);
  g.gain.setValueAtTime(peak, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  o.connect(g);
  g.connect(dest);
  o.start(t);
  o.stop(t + decay + 0.05);
  o.onended = () => { try { o.disconnect(); g.disconnect(); } catch {} };
}

// A mains hum: fixed partials of 50 Hz, deliberately not a chord
function hum(ctx, dest, gain = 0.03) {
  const out = [];
  [50, 100, 150].forEach((f, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = f;
    g.gain.value = gain / (i + 1);
    o.connect(g);
    g.connect(dest);
    o.start();
    out.push(o);
  });
  return out;
}

// The layer menu. Beds return their sources; events are { every: [min, max] seconds, fire(t) }.
const LAYERS = {
  rain: (c, d, n) => ({ sources: [...bed(c, d, n.pink, { type: 'bandpass', freq: 1100, q: 0.5, gain: 0.22 }), ...bed(c, d, n.white, { type: 'highpass', freq: 5000, gain: 0.03 })], events: [{ every: [0.05, 0.4], fire: (t) => burst(c, d, n.white, t, { freq: rand(2500, 6000), q: 3, peak: rand(0.02, 0.06), decay: 0.03, pan: rand(-0.8, 0.8) }) }] }),
  drizzle: (c, d, n) => ({ sources: bed(c, d, n.pink, { type: 'bandpass', freq: 1500, q: 0.6, gain: 0.08 }), events: [{ every: [0.3, 1.2], fire: (t) => burst(c, d, n.white, t, { freq: rand(3000, 7000), q: 4, peak: rand(0.015, 0.035), decay: 0.025, pan: rand(-0.9, 0.9) }) }] }),
  wind: (c, d, n) => ({ sources: bed(c, d, n.brown, { type: 'lowpass', freq: 380, q: 1.2, gain: 0.22, lfo: 0.09, lfoDepth: 160, lfoTarget: 'freq' }) }),
  gale: (c, d, n) => ({ sources: [...bed(c, d, n.brown, { type: 'bandpass', freq: 520, q: 0.8, gain: 0.3, lfo: 0.07, lfoDepth: 260, lfoTarget: 'freq' }), ...bed(c, d, n.pink, { type: 'highpass', freq: 2600, gain: 0.04, lfo: 0.11, lfoDepth: 0.03 })] }),
  sand: (c, d, n) => ({ sources: bed(c, d, n.white, { type: 'bandpass', freq: 4200, q: 0.6, gain: 0.05, lfo: 0.13, lfoDepth: 0.04 }) }),
  city: (c, d, n) => ({
    sources: bed(c, d, n.brown, { type: 'lowpass', freq: 140, gain: 0.35, lfo: 0.05, lfoDepth: 0.08 }),
    events: [
      { every: [6, 14], fire: (t) => burst(c, d, n.pink, t, { type: 'lowpass', freq: 300, sweepTo: 900, peak: 0.12, attack: 1.6, decay: 2.6, pan: rand(-0.7, 0.7) }) },
      { every: [25, 60], fire: (t) => siren(c, d, t) }
    ]
  }),
  hvac: (c, d, n) => ({ sources: [...bed(c, d, n.pink, { type: 'lowpass', freq: 420, gain: 0.12 }), ...hum(c, d, 0.018)] }),
  typing: (c, d, n) => ({ events: [{ every: [0.08, 0.5], fire: (t) => { if (Math.random() < 0.3) return; burst(c, d, n.white, t, { freq: rand(2600, 4200), q: 6, peak: 0.03, decay: 0.018, pan: rand(-0.4, 0.4) }); } }] }),
  typewriter: (c, d, n) => ({ events: [{ every: [0.11, 0.3], fire: (t) => burst(c, d, n.white, t, { freq: rand(1800, 2600), q: 8, peak: 0.07, decay: 0.03 }) }, { every: [6, 12], fire: (t) => burst(c, d, n.white, t, { type: 'highpass', freq: 3000, peak: 0.06, attack: 0.05, decay: 0.35, sweepTo: 7000 }) }] }),
  clock: (c, d, n) => ({ events: [{ every: [1, 1], fire: (t) => { burst(c, d, n.white, t, { freq: 3400, q: 12, peak: 0.08, decay: 0.02 }); burst(c, d, n.white, t + 0.5, { freq: 2900, q: 12, peak: 0.05, decay: 0.02 }); } }] }),
  rails: (c, d, n) => ({
    sources: [...bed(c, d, n.brown, { type: 'lowpass', freq: 110, gain: 0.5, lfo: 0.3, lfoDepth: 0.1 }), ...bed(c, d, n.pink, { type: 'bandpass', freq: 700, q: 0.6, gain: 0.07 })],
    // the joints of the track pass two by two
    events: [{ every: [1.3, 1.5], fire: (t) => { [0, 0.16].forEach((dt) => { burst(c, d, n.white, t + dt, { freq: 1200, q: 2, peak: 0.16, decay: 0.07 }); thud(c, d, t + dt, { from: 70, to: 45, peak: 0.25, decay: 0.12 }); }); } }]
  }),
  warpRift: (c, d, n) => ({ events: [{ every: [9, 18], fire: (t) => burst(c, d, n.pink, t, { type: 'bandpass', freq: 300, q: 4, sweepTo: 3200, peak: 0.09, attack: 0.9, decay: 1.4 }) }] }),
  forge: (c, d, n) => ({
    sources: bed(c, d, n.brown, { type: 'lowpass', freq: 260, gain: 0.25, lfo: 0.4, lfoDepth: 0.06 }),
    events: [
      { every: [0.04, 0.3], fire: (t) => burst(c, d, n.white, t, { freq: rand(1500, 5000), q: 2, peak: rand(0.01, 0.05), decay: 0.02 }) },
      { every: [2.5, 6], fire: (t) => { burst(c, d, n.white, t, { freq: 2400, q: 30, peak: 0.2, decay: 0.6 }); thud(c, d, t, { from: 140, to: 80, peak: 0.2, decay: 0.12 }); } }
    ]
  }),
  crowd: (c, d, n) => ({ sources: [...bed(c, d, n.pink, { type: 'bandpass', freq: 650, q: 1.4, gain: 0.12, lfo: 0.6, lfoDepth: 0.05, pan: -0.4 }), ...bed(c, d, n.pink, { type: 'bandpass', freq: 1150, q: 1.6, gain: 0.08, lfo: 0.47, lfoDepth: 0.04, pan: 0.4 })], events: [{ every: [4, 10], fire: (t) => burst(c, d, n.pink, t, { freq: rand(800, 1500), q: 2, peak: 0.1, attack: 0.15, decay: 0.8, pan: rand(-0.6, 0.6) }) }] }),
  waves: (c, d, n) => ({ sources: bed(c, d, n.brown, { type: 'lowpass', freq: 260, gain: 0.3, lfo: 0.12, lfoDepth: 0.22 }), events: [{ every: [6, 9], fire: (t) => burst(c, d, n.pink, t, { type: 'lowpass', freq: 400, sweepTo: 2400, peak: 0.18, attack: 1.2, decay: 2.4 }) }] }),
  deep: (c, d, n) => ({ sources: bed(c, d, n.brown, { type: 'lowpass', freq: 70, gain: 0.5, lfo: 0.04, lfoDepth: 0.15 }), events: [{ every: [7, 15], fire: (t) => thud(c, d, t, { from: 50, to: 28, peak: 0.25, decay: 2.2 }) }] }),
  // Carmen: breath-shaped noise through two moving formants, syllables a few per second, left and right
  whispers: (c, d, n) => ({
    events: [{ every: [0.18, 0.5], fire: (t) => {
      if (Math.random() < 0.35) return;
      const pan = Math.random() < 0.5 ? rand(-0.9, -0.3) : rand(0.3, 0.9);
      const f = rand(900, 2600);
      burst(c, d, n.white, t, { freq: f, q: 7, peak: rand(0.02, 0.05), attack: 0.04, decay: rand(0.08, 0.2), pan, sweepTo: f * rand(0.7, 1.4) });
    } }]
  }),
  alarm: (c, d, n) => ({ events: [{ every: [14, 26], fire: (t) => { for (let i = 0; i < 3; i++) klaxon(c, d, t + i * 0.9); } }] }),
  machinery: (c, d, n) => ({ sources: [...bed(c, d, n.brown, { type: 'lowpass', freq: 180, gain: 0.25 }), ...hum(c, d, 0.03)], events: [{ every: [3, 8], fire: (t) => burst(c, d, n.white, t, { type: 'highpass', freq: 2000, peak: 0.05, attack: 0.01, decay: 0.5 }) }] }),
  heartbeat: (c, d) => ({ events: [{ every: [1.05, 1.15], fire: (t) => { thud(c, d, t, { from: 70, to: 40, peak: 0.35, decay: 0.16 }); thud(c, d, t + 0.24, { from: 60, to: 35, peak: 0.22, decay: 0.14 }); } }] }),
  glitch: (c, d, n) => ({ events: [{ every: [0.4, 2.5], fire: (t) => burst(c, d, n.white, t, { type: 'highpass', freq: rand(800, 6000), q: 1, peak: rand(0.03, 0.1), decay: rand(0.01, 0.06), pan: rand(-1, 1) }) }] }),
  lightSwell: (c, d, n) => ({ sources: bed(c, d, n.pink, { type: 'highpass', freq: 3500, gain: 0.04, lfo: 0.15, lfoDepth: 0.03 }) }),
  hush: (c, d, n) => ({ sources: bed(c, d, n.pink, { type: 'lowpass', freq: 600, gain: 0.07 }) })
};

// A distant siren is a slow pitch sweep in the distance: a city sound, not a note
function siren(c, d, t) {
  const o = c.createOscillator();
  const f = c.createBiquadFilter();
  const g = c.createGain();
  o.type = 'triangle';
  o.frequency.setValueAtTime(620, t);
  for (let i = 0; i < 4; i++) {
    o.frequency.linearRampToValueAtTime(860, t + i * 1.6 + 0.8);
    o.frequency.linearRampToValueAtTime(620, t + i * 1.6 + 1.6);
  }
  f.type = 'lowpass';
  f.frequency.value = 900;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.018, t + 1.5);
  g.gain.linearRampToValueAtTime(0.0001, t + 6.4);
  o.connect(f); f.connect(g); g.connect(d);
  o.start(t); o.stop(t + 6.5);
  o.onended = () => { try { o.disconnect(); g.disconnect(); } catch {} };
}

function klaxon(c, d, t) {
  const o = c.createOscillator();
  const f = c.createBiquadFilter();
  const g = c.createGain();
  o.type = 'square';
  o.frequency.setValueAtTime(420, t);
  o.frequency.linearRampToValueAtTime(300, t + 0.6);
  f.type = 'bandpass';
  f.frequency.value = 700;
  f.Q.value = 1.5;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.025, t + 0.05);
  g.gain.linearRampToValueAtTime(0.0001, t + 0.65);
  o.connect(f); f.connect(g); g.connect(d);
  o.start(t); o.stop(t + 0.7);
  o.onended = () => { try { o.disconnect(); g.disconnect(); } catch {} };
}

const WEATHER_LAYER = { drizzle: 'drizzle', rain: 'rain', haze: null, snow: 'hush' };

// Which layers each world plays. "weather" is filled in from the season for the street worlds.
export const SCAPES = {
  title: ['city', 'rain'],
  library: ['hush', 'clock'],
  childhood: ['city', 'weather'],
  nest: ['hvac', 'lightSwell'],
  backstreets: ['city', 'wind', 'weather'],
  outskirts: ['gale', 'sand'],
  fixer: ['city', 'weather'],
  wing: ['hvac', 'typing'],
  workshop: ['forge', 'city'],
  syndicate: ['city', 'wind', 'weather'],
  'finger-index': ['hush', 'typewriter', 'clock'],
  'finger-middle': ['city', 'deep'],
  'finger-ring': ['crowd', 'hush'],
  'finger-pinky': ['wind', 'drizzle'],
  'finger-thumb': ['city', 'machinery'],
  distortion: ['whispers', 'deep', 'glitch'],
  dead: ['wind'],
  'dungeon-warp': ['rails', 'warpRift'],
  'dungeon-lobotomy': ['machinery', 'alarm'],
  'dungeon-bloodfiend': ['crowd', 'deep'],
  'dungeon-greatlake': ['waves', 'gale'],
  'dungeon-night': ['wind', 'clock', 'drizzle'],
  'dungeon-claw': ['hvac', 'deep'],
  'dungeon-outskirts': ['gale', 'sand']
};

/** Starts a world's layers into `dest`; returns everything needed to stop it. */
export function startScape(ctx, dest, noise, world, { weather = 'rain', ego = 'none', danger = false, carmen = false } = {}) {
  const names = [...(SCAPES[world] || SCAPES.backstreets)]
    .map((name) => (name === 'weather' ? WEATHER_LAYER[weather] : name))
    .filter(Boolean);
  // Carmen is heard once the mind is near its edge; the heart when the body is
  if (ego === 'active') names.push('lightSwell');
  if (carmen) names.push('whispers');
  if (danger) names.push('heartbeat');
  const sources = [];
  const handles = [];
  for (const name of [...new Set(names)]) {
    const layer = LAYERS[name]?.(ctx, dest, noise);
    if (!layer) continue;
    sources.push(...(layer.sources || []));
    for (const ev of layer.events || []) {
      const h = { stopped: false, id: null };
      const loop = () => {
        if (h.stopped) return;
        try { if (ctx.state === 'running') ev.fire(ctx.currentTime + 0.05); } catch {}
        h.id = setTimeout(loop, rand(ev.every[0], ev.every[1]) * 1000);
      };
      h.id = setTimeout(loop, rand(0.2, Math.min(3, ev.every[1])) * 1000);
      handles.push(h);
    }
  }
  return { sources, handles };
}
