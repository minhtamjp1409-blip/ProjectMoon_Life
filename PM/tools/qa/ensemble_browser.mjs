import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const BASE = process.argv[2] || 'http://127.0.0.1:5193/';
const out = join(tmpdir(), 'pm-ensemble-qa');
mkdirSync(out, { recursive: true });
const browser = await Browser.launch();

async function scenario(page, { stage = 0, coda = false, forced = false, invite = false, language = 'en', names = false } = {}) {
  await page.eval(({ stage, coda, forced, invite, language, names }) => {
    const engine = window.__ensembleEngine;
    const { useThemeStore } = window.__ensembleTheme;
    useThemeStore.getState().setLang(language);
    useThemeStore.getState().setMotion('reduced');
    const char = engine.createNewCharacter({ seed: 'ensemble-browser', customName: 'The Unwritten', startAge: 35 });
    Object.assign(char, { alive: true, age: 35, job: 'Fixer', fixerGrade: 1, flags: ['ColorFixer', 'EGOAwakened'],
      pendingBirthLogs: [], pendingLead: null, pendingYearPlan: null, pendingEvent: null, pendingMinor: null, pendingContract: null, pendingModal: null, plan: [], taboo: 0, resonance: 85 });
    char.stats = { health: 95, sanity: 90, wealth: 70, rep: 80, network: 65 };
    char.ensemble = { apexSinceAge: 30, declines: forced ? 2 : 0 };
    if (names) { char.egoName = 'Nhịp còn sót lại'; char.lineage = { relic: 'Bản tổng phổ viết dở' }; }
    if (invite) char.pendingEvent = engine.ALL_STORY_EVENTS.find((event) => event.id === (forced ? 'ensemble_last_call' : 'ensemble_first_invitation'));
    else {
      char.pendingDungeon = engine.createDungeonSession('dungeon_reverberation_ensemble', char);
      char.pendingDungeon.currentStageIndex = stage;
      char.pendingDungeon.ensembleCoda = coda;
      if (coda) char.pendingDungeon.ensembleHarmony = 3;
    }
    window.__gameStore.setState({ char, inRun: true, speed: 0, autoPlay: false, activeResolution: null, stageFx: null, postChoicePauseMs: 0, yearProgress: 60 });
  }, { stage, coda, forced, invite, language, names });
  await sleep(250);
}

try {
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({ width, height: 900, mobile: width === 390, reducedMotion: true });
    await page.goto(BASE);
    await page.eval(`window.__ensembleModules = Promise.all([import('/src/engine/gameEngine.js'), import('/src/store/themeStore.js')]).then(([engine, theme]) => { window.__ensembleEngine = engine; window.__ensembleTheme = theme; return true; }); window.__ensembleModules`);
    for (const options of [{}, { stage: 1 }, { stage: 2 }, { stage: 3 }, { coda: true }, { forced: true }, { invite: true }, { invite: true, forced: true, language: 'vi' }]) {
      await scenario(page, options);
      const result = await page.eval(() => {
        const dock = document.querySelector('.dock');
        const r = dock?.getBoundingClientRect();
        return { dock: !!dock, left: r?.left, right: r?.right, top: r?.top, bottom: r?.bottom, width: innerWidth, height: innerHeight,
          overflow: document.documentElement.scrollWidth - innerWidth, scene: !!document.querySelector('.dgs-ensemble'),
          choices: document.querySelectorAll('.dg-choice').length, leave: !!document.querySelector('.dg-leave'),
          leaveChoices: document.querySelectorAll('.dg-choice.is-leave').length,
          badButtons: [...document.querySelectorAll('.dg-choice')].filter((button) => button.getBoundingClientRect().height < 44).length,
          animations: [...document.querySelectorAll('.dgs-ensemble *')].filter((el) => getComputedStyle(el).animationName !== 'none').map((el) => ({ class: el.getAttribute('class'), name: getComputedStyle(el).animationName })) };
      });
      assert(result.dock && result.left >= -1 && result.right <= result.width + 1 && result.overflow <= 0, `${width}px ${JSON.stringify(options)} fits: ${JSON.stringify(result)}`);
      assert(result.top >= 0 && result.bottom <= result.height + 1, 'dock fits screen height');
      assert.equal(result.badButtons, 0, 'choices have touch targets');
      if (!options.invite) {
        assert(result.scene, 'theatre background mounted');
        assert.deepEqual(result.animations, [], `reduced motion stops theatre animation: ${JSON.stringify(result.animations)}`);
        if (options.forced || options.coda || options.stage > 0) assert.equal(result.leave, false, 'no escape after the opening');
        else {
          assert(result.leave, 'opening has its dedicated F exit');
          assert.equal(result.leaveChoices, 0, 'the exit is not duplicated among numbered choices');
        }
      }
      if (options.coda || (!options.stage && !options.invite && !options.forced)) await page.screenshot({ path: join(out, `${width}-${options.coda ? 'coda' : 'overture'}.png`), format: 'png' });
    }
    await scenario(page, { coda: true });
    await page.eval(() => document.querySelector('.dg-choice').click());
    await sleep(200);
    const transformed = await page.eval(() => { const c = window.__gameStore.getState().char; return { job: c.job, dungeon: c.pendingDungeon?.id, alive: c.alive }; });
    assert.equal(transformed.job, 'Distortion');
    assert.equal(transformed.dungeon, undefined);
    assert(transformed.alive);
    const kicker = await page.eval(() => document.querySelector('.dock.is-resolution .dock-kicker')?.textContent);
    assert.match(kicker, /Dungeon · Another voice in the ensemble/, 'Distortion is not labelled as retreat');

    await scenario(page, { names: true });
    if (width < 1000) {
      await page.eval(() => document.querySelector('.hud2-open')?.click());
      await sleep(100);
      await page.eval(() => [...document.querySelectorAll('.m-sheet-tab')].find((tab) => tab.textContent.includes('Career'))?.click());
      await sleep(100);
    }
    const namesText = await page.eval(() => document.body.textContent);
    assert(namesText.includes('The Remaining Beat') && namesText.includes('The Unfinished Score'), 'old saved names are translated in the English dossier');
    assert(!namesText.includes('Nhịp còn sót lại') && !namesText.includes('Bản tổng phổ viết dở'), 'no Vietnamese fallback name leaks into the English dossier');
    await page.eval(() => document.querySelector('.sheet-close-btn')?.click());

    await scenario(page);
    const baton = await page.eval(() => {
      const { useThemeStore } = window.__ensembleTheme;
      useThemeStore.getState().setMotion('full');
      const el = document.querySelector('.ensemble-conductor path:last-child');
      const animation = el.getAnimations().find((a) => a.animationName === 'ensembleHand');
      if (!animation) throw new Error('Full motion must animate the baton');
      animation.pause();
      const point = (x, y, matrix) => { const p = new DOMPoint(x, y).matrixTransform(matrix); return { x: p.x, y: p.y }; };
      const read = (time) => {
        animation.currentTime = time;
        return { anchor: point(724, 490, el.getCTM()), tip: point(849, 398, el.getCTM()), parent: point(724, 490, el.parentElement.getCTM()) };
      };
      const a = read(0), b = read(4800);
      return { pivotDrift: Math.hypot(b.anchor.x - a.anchor.x, b.anchor.y - a.anchor.y),
        attachmentError: Math.hypot(b.anchor.x - b.parent.x, b.anchor.y - b.parent.y),
        tipMotion: Math.hypot(b.tip.x - a.tip.x, b.tip.y - a.tip.y) };
    });
    assert(baton.pivotDrift < 0.1 && baton.attachmentError < 0.1, `baton stays in the conductor's hand: ${JSON.stringify(baton)}`);
    assert(baton.tipMotion > 2, 'full-motion test really moves the baton');
    await page.screenshot({ path: join(out, `${width}-baton-full-motion.png`), format: 'png' });
    await page.eval(() => document.querySelector('.event-peek-toggle')?.click());
    await sleep(1800);
    await page.screenshot({ path: join(out, `${width}-theatre-full-motion.png`), format: 'png' });
    assert.equal(page.consoleErrors.length, 0, page.consoleErrors.join('\n'));
    console.log(`Ensemble browser ${width}px: layout, one exit, correct outcome, English names, reduced/full motion passed; baton ${JSON.stringify(baton)}.`);
    await page.close();
  }
  console.log(`Screenshots: ${out}`);
} finally {
  await browser.close();
}
