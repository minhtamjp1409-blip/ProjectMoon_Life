// Where the home screen's start button lands on a phone, and what sits above it.
// Usage: node tools/qa/measure_home_fold.mjs [url] (DEV_URL, VIEWPORT=390x844, SHOT=path.jpg)
import { Browser } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const BASE = process.env.DEV_URL || process.argv[2] || 'http://localhost:5173';
const [W, H] = (process.env.VIEWPORT || '390x844').split('x').map(Number);
const browser = await Browser.launch();
try {
  const page = await browser.newPage({ width: W, height: H, mobile: W < 700 });
  await page.goto(BASE, { timeoutMs: 30000, settleMs: 2500 });
  await page.eval(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.goto(BASE, { timeoutMs: 30000, settleMs: 2500 });
  const info = await page.eval(() => {
    const box = (sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height) }; };
    const btn = document.querySelector('.hero-start-btn');
    const nav = document.querySelector('.bottom-nav')?.getBoundingClientRect();
    const navTop = nav && nav.height > 0 ? nav.top : innerHeight;
    const r = btn?.getBoundingClientRect();
    const hit = r ? document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) : null;
    return {
      viewport: [innerWidth, innerHeight],
      navTop: Math.round(navTop),
      startTappable: Boolean(r && r.bottom <= navTop && r.top >= 0 && btn.contains(hit)),
      scrollW: document.documentElement.scrollWidth,
      sections: Object.fromEntries(['.opening-context', '#home-title', '.city-birth-strip, .birth-atlas-strip', '.opening-atlas', '.atlas-note', '.birth-panel', '.birth-heading', '.birth-tabs-bar', '.hero-start-btn'].map((s) => [s, box(s)]))
    };
  });
  console.log(JSON.stringify({ viewport: info.viewport, navTop: info.navTop, startTappable: info.startTappable, scrollW: info.scrollW, start: info.sections['.hero-start-btn'] }));
  if (process.env.REQUIRE && !info.startTappable) { console.error('FAIL: the start button is not tappable on the first screen'); process.exitCode = 1; }
  if (process.env.SHOT) await page.screenshot({ path: process.env.SHOT });
} finally {
  await browser.close();
}
