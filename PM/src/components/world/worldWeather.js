// The weather of a world, drawn on one canvas behind the interface: rain over the Backstreets, snow in
// winter, Prescript strokes falling for the Index, sparks in a Workshop, streaks past a WARP window.
// Capped at 30 frames a second, fewer particles on a small screen, still when motion is reduced.

const KINDS = {
  rain: { n: 130, init: (p, w, h) => Object.assign(p, { x: Math.random() * w * 1.2, y: Math.random() * h, v: 9 + Math.random() * 6, l: 10 + Math.random() * 14, a: 0.12 + Math.random() * 0.18 }),
    step: (p, w, h) => { p.y += p.v; p.x -= p.v * 0.18; if (p.y > h) { p.y = -20; p.x = Math.random() * w * 1.2; } },
    draw: (c, p) => { c.globalAlpha = p.a; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x + p.l * 0.18, p.y - p.l); c.stroke(); } },
  drizzle: { n: 60, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: Math.random() * h, v: 4 + Math.random() * 3, l: 6 + Math.random() * 6, a: 0.1 + Math.random() * 0.12 }),
    step: (p, w, h) => { p.y += p.v; p.x -= p.v * 0.1; if (p.y > h) { p.y = -10; p.x = Math.random() * w; } },
    draw: (c, p) => { c.globalAlpha = p.a; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x + 1, p.y - p.l); c.stroke(); } },
  snow: { n: 90, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: Math.random() * h, v: 0.5 + Math.random() * 1.1, r: 0.8 + Math.random() * 2, ph: Math.random() * 6, a: 0.3 + Math.random() * 0.5 }),
    step: (p, w, h, t) => { p.y += p.v; p.x += Math.sin(t / 1400 + p.ph) * 0.4; if (p.y > h) { p.y = -5; p.x = Math.random() * w; } },
    draw: (c, p) => { c.globalAlpha = p.a; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); } },
  ash: { n: 50, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: Math.random() * h, v: 0.25 + Math.random() * 0.5, r: 0.6 + Math.random() * 1.6, ph: Math.random() * 6, a: 0.15 + Math.random() * 0.35 }),
    step: (p, w, h, t) => { p.y += p.v; p.x += Math.sin(t / 2200 + p.ph) * 0.3 + 0.1; if (p.y > h) { p.y = -5; p.x = Math.random() * w; } },
    draw: (c, p) => { c.globalAlpha = p.a; c.fillRect(p.x, p.y, p.r, p.r); } },
  haze: { n: 40, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: Math.random() * h, v: 0.15 + Math.random() * 0.3, r: 0.6 + Math.random() * 1.2, a: 0.08 + Math.random() * 0.2 }),
    step: (p, w, h) => { p.x += p.v; p.y -= p.v * 0.3; if (p.x > w) { p.x = -5; p.y = Math.random() * h; } },
    draw: (c, p) => { c.globalAlpha = p.a; c.fillRect(p.x, p.y, p.r, p.r); } },
  motes: { n: 46, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: Math.random() * h, v: 0.15 + Math.random() * 0.35, r: 1 + Math.random() * 2.2, ph: Math.random() * 6, a: 0 }),
    step: (p, w, h, t) => { p.y -= p.v; p.a = 0.18 + 0.25 * Math.sin(t / 900 + p.ph); if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; } },
    draw: (c, p) => { c.globalAlpha = Math.max(0, p.a); c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); } },
  dust: { n: 40, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: Math.random() * h, v: 0.1 + Math.random() * 0.2, r: 0.8 + Math.random() * 1.4, ph: Math.random() * 6 }),
    step: (p, w, h, t) => { p.y += Math.sin(t / 3000 + p.ph) * 0.2; p.x += p.v; if (p.x > w) p.x = -5; },
    draw: (c, p, t) => { c.globalAlpha = 0.15 + 0.15 * Math.sin(t / 1300 + p.ph); c.fillRect(p.x, p.y, p.r, p.r); } },
  sand: { n: 110, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: h * (0.35 + Math.random() * 0.65), v: 2 + Math.random() * 4, l: 4 + Math.random() * 12, a: 0.08 + Math.random() * 0.18 }),
    step: (p, w, h) => { p.x += p.v; p.y += Math.random() - 0.5; if (p.x > w) { p.x = -20; p.y = h * (0.35 + Math.random() * 0.65); } },
    draw: (c, p) => { c.globalAlpha = p.a; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x - p.l, p.y); c.stroke(); } },
  sparks: { n: 36, init: (p, w, h) => Object.assign(p, { x: w * (0.2 + Math.random() * 0.6), y: h + Math.random() * 40, vx: (Math.random() - 0.5) * 2, vy: -(2 + Math.random() * 4), life: 0, max: 50 + Math.random() * 60 }),
    step: (p, w, h) => { p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life++; if (p.life > p.max) KINDS.sparks.init(p, w, h); },
    draw: (c, p) => { c.globalAlpha = 1 - p.life / p.max; c.fillRect(p.x, p.y, 2, 2); } },
  embers: { n: 44, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: h + Math.random() * h * 0.3, vy: -(0.4 + Math.random() * 0.9), ph: Math.random() * 6, r: 1 + Math.random() * 1.8 }),
    step: (p, w, h, t) => { p.y += p.vy; p.x += Math.sin(t / 700 + p.ph) * 0.5; if (p.y < -5) KINDS.embers.init(p, w, h); },
    draw: (c, p, t) => { c.globalAlpha = 0.35 + 0.3 * Math.sin(t / 300 + p.ph); c.fillRect(p.x, p.y, p.r, p.r); } },
  data: { n: 34, init: (p, w, h) => Object.assign(p, { x: Math.round(Math.random() * w / 18) * 18, y: Math.random() * h, v: 1.5 + Math.random() * 3, l: 30 + Math.random() * 90, a: 0.08 + Math.random() * 0.16 }),
    step: (p, w, h) => { p.y += p.v; if (p.y - p.l > h) { p.y = -10; p.x = Math.round(Math.random() * w / 18) * 18; } },
    draw: (c, p) => { c.globalAlpha = p.a; c.fillRect(p.x, p.y - p.l, 1, p.l); } },
  prescript: { n: 28, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: -Math.random() * h, v: 0.6 + Math.random() * 1.2, len: 4 + Math.floor(Math.random() * 9), a: 0.12 + Math.random() * 0.25 }),
    step: (p, w, h) => { p.y += p.v; if (p.y > h + 40) KINDS.prescript.init(p, w, h); },
    // a Prescript as a line of tiny marks, the shape of a sentence with no words in it
    draw: (c, p) => { c.globalAlpha = p.a; for (let i = 0; i < p.len; i++) c.fillRect(p.x + i * 5, p.y + (i % 3 === 0 ? 1 : 0), 3, 1.5); } },
  paint: { n: 14, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: Math.random() * h, r: 4 + Math.random() * 26, life: Math.random() * 300, max: 260 + Math.random() * 200 }),
    step: (p, w, h) => { p.life++; if (p.life > p.max) { KINDS.paint.init(p, w, h); p.life = 0; } },
    draw: (c, p) => { const k = p.life / p.max; c.globalAlpha = Math.min(1, k * 6) * (1 - k) * 0.32; c.beginPath(); c.arc(p.x, p.y, p.r * Math.min(1, k * 5), 0, 6.283); c.fill(); } },
  glitch: { n: 8, init: (p, w, h) => Object.assign(p, { y: Math.random() * h, hh: 2 + Math.random() * 10, life: 0, max: 4 + Math.random() * 14, wait: Math.random() * 80 }),
    step: (p, w, h) => { if (p.wait > 0) { p.wait--; return; } p.life++; if (p.life > p.max) { KINDS.glitch.init(p, w, h); } },
    draw: (c, p, t, w) => { if (p.wait > 0) return; c.globalAlpha = 0.2; c.fillRect(0, p.y, w, p.hh); } },
  speed: { n: 40, init: (p, w, h) => Object.assign(p, { x: w + Math.random() * w, y: Math.random() * h, v: 18 + Math.random() * 30, l: 60 + Math.random() * 220, a: 0.06 + Math.random() * 0.2 }),
    step: (p, w, h) => { p.x -= p.v; if (p.x + p.l < 0) { p.x = w + Math.random() * 200; p.y = Math.random() * h; } },
    draw: (c, p) => { c.globalAlpha = p.a; c.fillRect(p.x, p.y, p.l, 1.2); } },
  confetti: { n: 34, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: -Math.random() * h, v: 0.6 + Math.random() * 1.2, r: 2 + Math.random() * 3, ph: Math.random() * 6 }),
    step: (p, w, h, t) => { p.y += p.v; p.x += Math.sin(t / 600 + p.ph) * 0.8; if (p.y > h) KINDS.confetti.init(p, w, h); },
    draw: (c, p, t) => { c.globalAlpha = 0.25; c.fillRect(p.x, p.y, p.r, p.r * Math.abs(Math.sin(t / 300 + p.ph))); } },
  bubbles: { n: 40, init: (p, w, h) => Object.assign(p, { x: Math.random() * w, y: h + Math.random() * h, v: 0.3 + Math.random() * 0.8, r: 1 + Math.random() * 4, ph: Math.random() * 6 }),
    step: (p, w, h, t) => { p.y -= p.v; p.x += Math.sin(t / 1100 + p.ph) * 0.3; if (p.y < -10) KINDS.bubbles.init(p, w, h); },
    draw: (c, p) => { c.globalAlpha = 0.22; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.stroke(); } },
  alarm: { n: 0 }
};

export function startWeather(canvas, kind, color, { reduced = false } = {}) {
  const spec = KINDS[kind];
  const ctx = canvas.getContext('2d');
  if (!ctx || !spec) return () => {};
  let w = 0;
  let h = 0;
  let parts = [];
  const resize = () => {
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const area = Math.min(1.3, (w * h) / (1440 * 900));
    const n = Math.round((spec.n || 0) * Math.max(0.35, area));
    parts = Array.from({ length: n }, () => spec.init({}, w, h));
  };
  resize();
  const paint = (t) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (const p of parts) spec.draw(ctx, p, t, w, h);
    ctx.globalAlpha = 1;
  };
  let frame = 0;
  let last = 0;
  const loop = (t) => {
    frame = requestAnimationFrame(loop);
    if (document.hidden || t - last < 33) return;
    last = t;
    for (const p of parts) spec.step(p, w, h, t);
    paint(t);
  };
  if (reduced) {
    paint(0);
  } else frame = requestAnimationFrame(loop);
  const ro = new ResizeObserver(() => { resize(); if (reduced) paint(0); });
  ro.observe(canvas);
  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
  };
}
