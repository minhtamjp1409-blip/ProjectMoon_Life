import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { createNewCharacter, ALL_STORY_EVENTS, interpolateText } from '../../src/engine/gameEngine.js';
import { splitTitle } from '../../src/engine/yearPlanner.js';

const baseUrl = process.argv[2] || 'http://127.0.0.1:5197';
const outDir = process.argv[3] || join(tmpdir(), 'pm-remaining-tasks-qa');
mkdirSync(outDir, { recursive: true });
const event = ALL_STORY_EVENTS.find((entry) => entry.id === 'csq_fixer_license_debt_due');
assert(event, 'Fixer debt event is missing');

function character(wealth, debt = 10) {
  const char = createNewCharacter({ seed: `debt-ui-${wealth}-${debt}`, startAge: 20, customName: 'Debt QA' });
  char.job = 'Fixer';
  char.fixerGrade = 9;
  char.stats.wealth = wealth;
  char.flags.push('FixerLicenseDebt');
  char.debts = [{ id: 'fixer_license_debt', status: 'active', balanceAhn: debt, nextDueAge: 20 }];
  char.pendingBirthLogs = [];
  const vi = splitTitle(interpolateText(event.vi, char));
  const en = splitTitle(interpolateText(event.en, char));
  char.pendingEvent = { ...event, titleVi: vi.title, titleEn: en.title, displayVi: vi.body, displayEn: en.body,
    choices: event.choices.map((choice) => ({ ...choice, labelVi: interpolateText(choice.labelVi, char), labelEn: interpolateText(choice.labelEn, char) })) };
  char.pendingMinor = null;
  char.pendingContract = null;
  char.pendingDungeon = null;
  char.pendingModal = null;
  char.pendingYearPlan = null;
  char.pendingLead = null;
  char.plan = [];
  return char;
}

const browser = await Browser.launch();
const results = [];
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ width, height: 900, mobile: width === 390, reducedMotion: true });
    await page.goto(baseUrl);
    for (const lang of ['vi', 'en']) {
      await page.eval((lang) => localStorage.setItem('pm-lang-mode', lang), lang);
      await page.goto(baseUrl);
      for (const wealth of [2, 3, 5, 15]) {
        await page.eval((char) => window.__gameStore.setState({ char, inRun: true, speed: 0, autoPlay: false, activeResolution: null }), character(wealth));
        await sleep(200);
        const state = await page.eval(() => {
          const dock = document.querySelector('.event-modal-backdrop > .dock');
          const buttons = [...(dock?.querySelectorAll('.choices > button') || [])];
          const bounds = dock?.getBoundingClientRect();
          return {
            dock: Boolean(dock), overflow: document.documentElement.scrollWidth - innerWidth,
            bounds: bounds && { left: bounds.left, right: bounds.right },
            buttons: buttons.map((button) => ({ disabled: button.disabled, text: button.textContent.replace(/\s+/g, ' ').trim(),
              minHeight: getComputedStyle(button).minHeight }))
          };
        });
        assert(state.dock, `event missing at ${width}px ${lang} ${wealth} Ahn`);
        assert(state.overflow <= 1, `horizontal overflow at ${width}px ${lang} ${wealth} Ahn`);
        assert(state.bounds.left >= -1 && state.bounds.right <= width + 1, `dock outside viewport at ${width}px`);
        assert.equal(state.buttons[0].disabled, wealth < 10);
        assert.equal(state.buttons[1].disabled, wealth < 3);
        assert(state.buttons[0].text.includes(wealth < 10 ? (lang === 'vi' ? 'Cần 10' : 'Needs 10') : '10 Ahn'));
        assert(state.buttons[1].text.includes(wealth < 3 ? (lang === 'vi' ? 'Cần 3' : 'Needs 3') : '3 Ahn'));
        if (wealth >= 10) assert.equal((state.buttons[0].text.match(/10 Ahn/g) || []).length, 1, 'full debt cost must appear once');
        if (wealth >= 3) assert.equal((state.buttons[1].text.match(/3 Ahn/g) || []).length, 1, 'partial debt cost must appear once');
        await page.screenshot({ path: join(outDir, `debt-${width}-${lang}-${wealth}.jpg`), quality: 82 });
        results.push({ width, lang, wealth, ...state });
        if (wealth === 15) {
          await page.eval(() => document.querySelector('.choices > button:first-child').focus());
          await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
          await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
          const focus = await page.eval(() => ({ second: document.activeElement === document.querySelector('.choices > button:nth-child(2)'),
            visible: document.activeElement?.matches(':focus-visible'), outline: getComputedStyle(document.activeElement).outlineStyle }));
          assert(focus.second && focus.visible && focus.outline === 'solid', `keyboard focus missing at ${width}px ${lang}`);
        }
      }
    }

    await page.eval(() => localStorage.setItem('pm-lang-mode', 'vi'));
    await page.goto(baseUrl);
    const planChar = character(10);
    planChar.pendingEvent = null;
    planChar.pendingYearPlan = { age: planChar.age };
    planChar.lastYearPoints = { train: 0, work: 0, bond: 0, rest: 3, scheme: 0 };
    await page.eval((char) => window.__gameStore.setState({ char, inRun: true, speed: 0, autoPlay: false, activeResolution: null }), planChar);
    await sleep(200);
    const before = await page.eval(() => ({ slots: [...document.querySelectorAll('.year-plan-stepper output')].map((el) => Number(el.textContent)),
      summary: document.querySelector('.year-plan-net-summary')?.textContent,
      reuse: Boolean(document.querySelector('.year-plan-reuse')) }));
    assert.deepEqual(before.slots, [1, 1, 0, 1, 0]);
    assert(before.reuse);
    await page.eval(() => document.querySelector('.year-plan-reuse').click());
    const after = await page.eval(() => ({ slots: [...document.querySelectorAll('.year-plan-stepper output')].map((el) => Number(el.textContent)),
      summary: document.querySelector('.year-plan-net-summary')?.textContent,
      pending: Boolean(window.__gameStore.getState().char.pendingYearPlan),
      overflow: document.documentElement.scrollWidth - innerWidth }));
    assert.deepEqual(after.slots, [0, 0, 0, 3, 0]);
    assert(after.summary?.includes('SP +9'));
    assert(after.pending, 'reuse must not confirm the plan');
    assert(after.overflow <= 1, `year plan overflows at ${width}px`);
    await page.screenshot({ path: join(outDir, `year-plan-reuse-${width}.jpg`), quality: 82 });
    results.push({ width, yearPlanBefore: before, yearPlanAfter: after });
    const firstYear = { ...planChar, lastYearPoints: null };
    await page.eval((char) => window.__gameStore.setState({ char, inRun: true, speed: 0, autoPlay: false, activeResolution: null }), firstYear);
    await sleep(100);
    assert.equal(await page.eval(() => Boolean(document.querySelector('.year-plan-reuse'))), false, 'first plan must not offer reuse');
    assert.deepEqual(page.consoleErrors, [], `browser errors at ${width}px: ${page.consoleErrors.join('\n')}`);
    await page.close();
  }
} finally {
  writeFileSync(join(outDir, 'report.json'), JSON.stringify(results, null, 2));
  await browser.close();
}
console.log(`Debt choices and plan reuse passed at 390px/1440px, VI/EN. Screenshots: ${outDir}`);
