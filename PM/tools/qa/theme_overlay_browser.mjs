import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { createNewCharacter, ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { createDungeonSession } from '../../src/engine/dungeonEngine.js';

const baseUrl = process.argv[2] || 'http://127.0.0.1:5197';
const out = process.argv[3] || join(tmpdir(), 'pm-theme-overlay-qa');
mkdirSync(out, { recursive: true });
const measurements = [];
const character = () => {
  const char = createNewCharacter({ seed: 'theme-overlay-qa', startAge: 30, customName: 'Người giữ lời hứa' });
  Object.assign(char, {
    job: 'Fixer', fixerGrade: 3, merit: 125, resonance: 70,
    pendingBirthLogs: [], pendingEvent: null, pendingMinor: null, pendingContract: null,
    pendingDungeon: null, pendingModal: null, pendingYearPlan: null, pendingLead: null, plan: [],
    logs: [{ id: 'qa-entry', age: 30, type: 'daily', vi: 'Bạn trở về Văn phòng sau một chuyến đi dài.', en: 'You return to the Office after a long journey.' }],
    npcs: { partner: { role: 'partner', nameVi: 'Kael', nameEn: 'Kael', status: 'alive', bond: 72, metAge: 20, ageAtMeet: 23 } }
  });
  Object.assign(char.stats, { health: 62, sanity: 60, wealth: 48, network: 42, rep: 69 });
  return char;
};

const browser = await Browser.launch();
try {
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({ width, height: 900, mobile: width === 390, reducedMotion: true });
    const capture = async (name, selector = null) => {
      await sleep(350);
      const result = await page.eval((selector) => {
        const shell = document.querySelector('.shell');
        if (!shell) return { error: document.body.textContent };
        const element = selector ? document.querySelector(selector) : null;
        const root = getComputedStyle(document.documentElement);
        const rect = element?.getBoundingClientRect();
        const style = element ? getComputedStyle(element) : null;
        return {
          overflow: document.documentElement.scrollWidth - innerWidth,
          accent: getComputedStyle(shell).getPropertyValue('--accent').trim(),
          surface: style?.backgroundColor, expectedSurface: root.getPropertyValue('--dialog-surface').trim(),
          panel: rect ? { x: rect.x, right: rect.right, y: rect.y, bottom: rect.bottom } : null,
          text: element?.textContent.slice(0, 160)
        };
      }, selector);
      assert(!result.error, `${name} failed to render: ${result.error}; ${page.consoleErrors.join('\n')}`);
      assert(result.overflow <= 0, `${name} overflows at ${width}px`);
      assert.equal(result.accent, '#d8b265', `${name} changes the control accent at ${width}px`);
      if (selector) {
        assert(result.panel, `${name} did not open at ${width}px`);
        assert(result.panel.x >= -1 && result.panel.right <= width + 1 && result.panel.y >= -1 && result.panel.bottom <= 901,
          `${name} lies outside the viewport at ${width}px: ${JSON.stringify(result.panel)}`);
        assert.equal(result.surface, 'rgb(37, 33, 39)', `${name} must have an opaque reading surface`);
      }
      measurements.push({ name, width, ...result });
      await page.screenshot({ path: join(out, `${name}-${width}.jpg`), quality: 84 });
    };
    const setCharacter = async (char) => {
      await page.eval((char) => window.__gameStore.setState({ char, inRun: true, speed: 0, autoPlay: false, yearProgress: 25, activeResolution: null }), char);
    };
    const click = async (selector) => page.eval((selector) => {
      const button = [...document.querySelectorAll(selector)].find((el) => el.getBoundingClientRect().width > 0);
      if (!button) throw new Error(`No visible control: ${selector}`);
      button.click();
    }, selector);

    await page.goto(baseUrl);
    await capture('home');
    await click('.topbar-tools .app-tool:last-child');
    await capture('settings', '.settings-panel');
    await click('.settings-close-btn');

    for (const [name, path] of [['glossary', '/glossary'], ['codex', '/codex'], ['bloodline', '/bloodline'], ['weaver', '/weaver-ai']]) {
      await page.goto(baseUrl + path);
      await capture(name);
    }
    await page.goto(baseUrl);
    for (const [name, job] of [['fixer', 'Fixer'], ['wing', 'Wing Employee'], ['finger', 'Syndicate']]) {
      const char = character(); char.job = job;
      if (job === 'Syndicate') { char.finger = 'Ring'; char.fingerRank = 2; }
      await setCharacter(char);
      await capture(name);
    }
    await setCharacter(character());
    if (width <= 860) {
      await click('.playbar-mobile-more button');
      await sleep(200);
      await page.eval(() => {
        const item = [...document.querySelectorAll('.ant-dropdown-menu-item')].find((el) => el.textContent.includes('Workshop'));
        if (!item) throw new Error('Workshop is missing from the mobile menu');
        item.click();
      });
    } else {
      await click('.playbar-desktop-actions button');
    }
    await capture('shop', '.ant-modal-container, .ant-modal-content');
    await click('.ant-modal-close');
    if (width <= 860) {
      await click('.hud2-open');
      await capture('dossier', '.mobile-dossier-sheet');
      assert(await page.eval(() => Boolean(document.elementFromPoint(innerWidth / 2, innerHeight - 12)?.closest('.mobile-dossier-sheet'))),
        'The bottom navigation must not cover the dossier');
      await click('.m-sheet-tab:nth-child(3)');
    }
    await click('.npc.is-interactive');
    await capture('npc', '.npc-dossier-sheet');
    await click('.npc-close-btn');
    if (width <= 860) {
      await click('.mobile-dossier-sheet .icon-btn');
    }

    const event = ALL_STORY_EVENTS.find((event) => event.id === 'hana_color_ascension_trial');
    const char = character();
    char.pendingEvent = { ...event, titleVi: 'Bài thử Color', titleEn: 'Color Trial', displayVi: event.vi, displayEn: event.en };
    await setCharacter(char);
    await capture('event', '.event-modal-backdrop > .dock');
    const planChar = character(); planChar.pendingYearPlan = { age: planChar.age };
    await setCharacter(planChar);
    await capture('year-plan', '.event-modal-backdrop > .dock');
    const dungeonChar = character(); dungeonChar.pendingDungeon = createDungeonSession('dungeon_warp_train', dungeonChar);
    await setCharacter(dungeonChar);
    await capture('dungeon', '.event-modal-backdrop > .dock');
    assert.deepEqual(page.consoleErrors, [], `Browser errors at ${width}px: ${page.consoleErrors.join('\n')}`);
    await page.close();
    console.log(`${width}px: consistent home/route controls, opaque dialogs, Workshop opens/closes, viewport bounds and console passed.`);
  }
} finally {
  writeFileSync(join(out, 'report.json'), JSON.stringify(measurements, null, 2));
  await browser.close();
}
console.log(`Screenshots and measurements: ${out}`);
