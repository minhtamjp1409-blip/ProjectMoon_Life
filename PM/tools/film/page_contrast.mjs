/**
 * Measures how readable the chronicle page stays over each world: hides the page text, captures what is left behind it
 * (page glass + the world showing through), and reports the contrast of --page-ink and --page-muted against the 95th
 * percentile of that background's luminance. Three captures per world, worst one kept, since the weather moves.
 * Run by hand, not in npm test.
 * Usage: node tools/film/page_contrast.mjs <base url> [--size=390x844] [--only=fixer,wing]
 */
import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const [base] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const arg = (name, dflt) => (process.argv.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1] || dflt;
const [width, height] = arg('size', '390x844').split('x').map(Number);
const only = arg('only', '');

// A state that lands on each world (and each kind of District for the street worlds)
const CASES = [
  ['childhood', { job: 'Child', regionId: 'F' }],
  ['nest', { job: 'Child', regionId: 'B', flags: ['Nest'] }],
  ['backstreets', { job: 'Outcast', regionId: 'F' }],
  ['outskirts', { job: 'Outcast', regionId: 'OUTSKIRTS' }],
  ['fixer (city)', { job: 'Fixer', regionId: 'Z' }],
  ['fixer (head)', { job: 'Fixer', regionId: 'A' }],
  ['fixer (industrial)', { job: 'Fixer', regionId: 'D' }],
  ['fixer (commercial)', { job: 'Fixer', regionId: 'J' }],
  ['fixer (medical, kx)', { job: 'Fixer', regionId: 'K' }],
  ['fixer (fallen)', { job: 'Fixer', regionId: 'L' }],
  ['fixer (lake)', { job: 'Fixer', regionId: 'U' }],
  ['fixer (warp)', { job: 'Fixer', regionId: 'W' }],
  ['syndicate', { job: 'Syndicate', finger: null, regionId: 'F' }],
  ['finger-index', { job: 'Syndicate', finger: 'Index', regionId: 'F' }],
  ['finger-middle', { job: 'Syndicate', finger: 'Middle', regionId: 'F' }],
  ['finger-ring', { job: 'Syndicate', finger: 'Ring', regionId: 'F' }],
  ['finger-pinky', { job: 'Syndicate', finger: 'Pinky', regionId: 'F' }],
  ['finger-thumb', { job: 'Syndicate', finger: 'Thumb', regionId: 'F' }],
  ['wing', { job: 'Wing Employee', regionId: 'J' }],
  ['workshop', { job: 'Workshop Craftsman', regionId: 'D' }],
  ['distortion', { job: 'Distortion', regionId: 'F', flags: ['Distorted'] }]
].filter(([name]) => !only || only.split(',').some((o) => name.startsWith(o)));

const lum = ([r, g, b]) => {
  const c = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
};
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const INK = lum([0xef, 0xe9, 0xe0]);
const MUTED = lum([0xb0, 0xa7, 0x9b]);

const browser = await Browser.launch();
const rows = [];
try {
  const page = await browser.newPage({ width, height, mobile: width < 600 });
  const probe = await browser.newPage({ width: 400, height: 400 });
  await page.goto(base); await sleep(1500);
  await page.eval(() => window.__gameStore.getState().exitToSetup?.()); await sleep(300);
  for (let i = 0; i < 4; i++) { const ok = await page.eval(() => { const x = document.querySelector('.hero-start-btn'); if (x) { x.click(); return true; } const t = [...document.querySelectorAll('.birth-tab')]; t[t.length - 1]?.click(); return false; }); if (ok) break; await sleep(600); }
  for (let i = 0; i < 40; i++) { const r = await page.eval(() => { const s = window.__gameStore.getState(); return Boolean(s.inRun && s.char?.alive && !(s.char.pendingBirthLogs || []).length); }); if (r) break; await page.eval(() => window.__gameStore.getState().skipAllBirthLogs?.()); await sleep(400); }
  // Hold the clock, and hide every word and surface inside the page so only the glass and the world are left
  await page.eval(() => {
    window.__gameStore.setState({ speed: 0, autoPlay: false });
    const s = document.createElement('style');
    s.textContent = '.log-col * { visibility: hidden !important; } .log-col::before { display: none !important; } .mobile-thumb-bar, .ant-notification { display: none !important; }';
    document.head.appendChild(s);
  });
  for (const [name, change] of CASES) {
    await page.eval((c) => {
      const st = window.__gameStore.getState();
      const flags = (st.char.flags || []).filter((f) => !['Nest', 'Feather', 'Distorted', 'Outskirts'].includes(f));
      window.__gameStore.setState({ char: { ...st.char, finger: null, ...c, flags: [...flags, ...(c.flags || [])], pendingEvent: null, pendingYearPlan: null } });
    }, change);
    await sleep(2400);
    const world = await page.eval(() => document.querySelector('.shell')?.dataset.world);
    let worst = null;
    for (let k = 0; k < 3; k++) {
      const rect = await page.eval(() => { const r = document.querySelector('.log-col').getBoundingClientRect(); return { x: Math.max(0, r.x + 8), y: Math.max(0, r.y + 8), w: Math.min(innerWidth, r.right) - Math.max(0, r.x) - 16, h: Math.min(innerHeight, r.bottom) - Math.max(0, r.y) - 16 }; });
      const { data } = await page.send('Page.captureScreenshot', { format: 'png', clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h, scale: 1 } });
      const p95 = await probe.eval(async (src) => {
        const img = new Image();
        img.src = `data:image/png;base64,${src}`;
        await img.decode();
        const c = document.createElement('canvas');
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const x = c.getContext('2d');
        x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data;
        const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const ls = [];
        for (let i = 0; i < d.length; i += 4 * 7) ls.push(0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]));
        ls.sort((a, b) => a - b);
        return ls[Math.floor(ls.length * 0.95)];
      }, data);
      if (worst == null || p95 > worst) worst = p95;
      await sleep(500);
    }
    rows.push({ case: name, world, bgP95: Number(worst.toFixed(4)), ink: Number(ratio(INK, worst).toFixed(2)), muted: Number(ratio(MUTED, worst).toFixed(2)) });
  }
} finally {
  await browser.close();
}
console.table(rows);
const failing = rows.filter((r) => r.muted < 4.5 || r.ink < 4.5);
console.log(failing.length ? `Below 4.5:1 at ${width}x${height}: ${failing.map((r) => r.case).join(', ')}` : `All worlds keep 4.5:1 for ink and muted text at ${width}x${height}.`);
