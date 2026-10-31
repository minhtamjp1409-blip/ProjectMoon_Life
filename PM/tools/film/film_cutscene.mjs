/**
 * Films a cutscene as a strip of screenshots, for checking timing and layout by eye. Run by hand, not in npm test.
 * Usage: node tools/film/film_cutscene.mjs <base url> <out dir> [--sizes=1440x900,390x844] [--every=250] [--cut=full|lite|still|caption]
 * Uses the CDP helper in .agents/skills/design-taste-frontend; needs Chrome or Edge.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const [base, out] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const arg = (name, dflt) => (process.argv.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1] || dflt;
const sizes = arg('sizes', '320x568,390x844,412x915,800x1280,1440x900').split(',').map((s) => s.split('x').map(Number));
const every = Number(arg('every', 250));
const cut = arg('cut', 'full');
if (!base || !out) {
  console.error('usage: node tools/film/film_cutscene.mjs <base url> <out dir> [--sizes=] [--every=] [--cut=]');
  process.exit(1);
}
mkdirSync(out, { recursive: true });

const report = [];
const browser = await Browser.launch();
try {
  for (const [width, height] of sizes) {
    const page = await browser.newPage({ width, height, mobile: width < 600, reducedMotion: cut === 'still' });
    await page.goto(base);
    await sleep(1500);
    // Scene settings for this take: full plays as a first viewing, lite as a repeat, caption as scenes off
    await page.eval((c) => {
      localStorage.removeItem('pm-cutscene-seen:claw');
      if (c === 'lite') localStorage.setItem('pm-cutscene-seen:claw', '1');
      localStorage.setItem('pm-cutscene', c === 'caption' ? 'off' : c === 'full' ? 'full' : 'short');
      if (c === 'still') localStorage.setItem('pm-motion-mode', 'reduced');
    }, cut);
    await page.goto(base);
    await sleep(1500);
    await page.eval(() => window.__gameStore.getState().exitToSetup?.());
    await sleep(300);
    for (let i = 0; i < 4; i++) {
      const started = await page.eval(() => {
        const hero = document.querySelector('.hero-start-btn');
        if (hero) { hero.click(); return true; }
        const tabs = [...document.querySelectorAll('.birth-tab')];
        tabs[tabs.length - 1]?.click();
        return false;
      });
      if (started) break;
      await sleep(600);
    }
    for (let i = 0; i < 40; i++) {
      const ready = await page.eval(() => {
        const s = window.__gameStore.getState();
        return Boolean(s.inRun && s.char?.alive && !(s.char.pendingBirthLogs || []).length && !document.querySelector('.city-loading-overlay, .birth-loading'));
      });
      if (ready) break;
      await page.eval(() => window.__gameStore.getState().skipAllBirthLogs?.());
      await sleep(400);
    }
    await sleep(800);
    // Taboo reaches 3: the next commit opens the judgment
    await page.eval(() => {
      const store = window.__gameStore;
      const s = store.getState();
      const prev = s.char;
      const next = { ...prev, taboo: 3, pendingYearPlan: null, pendingEvent: null, pendingMinor: null, pendingContract: null, stats: { ...prev.stats, health: 90, sanity: 90 } };
      s.commit(prev, next);
    });
    const t0 = Date.now();
    const frames = Math.ceil((cut === 'full' ? 4200 : 1800) / every);
    for (let i = 0; i < frames; i++) {
      const ms = Date.now() - t0;
      await page.screenshot({ path: join(out, `${width}x${height}-${String(i).padStart(2, '0')}-${ms}ms.jpg`), quality: 60 });
      await sleep(every);
    }
    const state = await page.eval(() => {
      const s = window.__gameStore.getState();
      return {
        cutscene: s.cutscene?.cut || null,
        dungeon: s.char.pendingDungeon?.id || null,
        dock: Boolean(document.querySelector('.event-modal-backdrop')),
        overflowX: document.documentElement.scrollWidth > window.innerWidth
      };
    });
    report.push({ size: `${width}x${height}`, ...state, consoleErrors: page.consoleErrors.length });
  }
} finally {
  await browser.close();
}
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
