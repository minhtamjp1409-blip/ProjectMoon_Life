import assert from 'node:assert/strict';
import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

// usage: node tools/qa/annual_plan_browser.mjs [base url], with Vite running
const BASE = process.argv[2] || 'http://127.0.0.1:5193/';

// withLeads: the year's leads sit on the same screen and picking one starts the year
async function openPlan(page, withLeads) {
  await page.goto(BASE);
  await page.eval(async (withLeads) => {
    const { createNewCharacter, createRNG } = await import('/src/engine/gameEngine.js');
    const { planYear } = await import('/src/engine/yearPlanner.js');
    const char = createNewCharacter({ seed: 'browser-annual-plan', startAge: 30 });
    char.job = 'Fixer';
    char.pendingBirthLogs = [];
    char.pendingEvent = null;
    char.pendingDungeon = null;
    char.pendingContract = null;
    char.pendingMinor = null;
    char.pendingLead = null;
    char.plan = [];
    if (withLeads) planYear(char, createRNG('browser-annual-plan-leads'));
    char.pendingYearPlan = { age: char.age };
    window.__gameStore.setState({ char, inRun: true, speed: 0, autoPlay: false, yearProgress: 0, activeResolution: null });
  }, withLeads);
  await sleep(350);
}

const browser = await Browser.launch();
try {
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({ width, height: 820, mobile: width === 390, reducedMotion: true });
    await openPlan(page, false);
    const before = await page.eval(() => {
      const dock = document.querySelector('.year-plan');
      const r = dock?.getBoundingClientRect();
      return { dock: !!dock, width: r?.width, left: r?.left, right: r?.right, bottom: r?.bottom, screen: innerWidth, overflow: document.documentElement.scrollWidth - innerWidth,
        buttons: [...document.querySelectorAll('.year-plan button')].filter((button) => button.getBoundingClientRect().height < 40).map((button) => button.textContent) };
    });
    assert(before.dock && before.left >= -1 && before.right <= before.screen + 1 && before.overflow <= 0, `annual plan fits ${width}px`);
    assert.deepEqual(before.buttons, [], `annual plan buttons remain touchable at ${width}px`);
    await page.eval(() => document.querySelector('.year-plan-confirm').click());
    const after = await page.eval(() => ({ pending: window.__gameStore.getState().char.pendingYearPlan, points: window.__gameStore.getState().char.annualPlan?.points, ambition: window.__gameStore.getState().char.ambition?.id, yearItems: window.__gameStore.getState().char.plan?.length }));
    assert.equal(after.pending, null);
    assert.equal(after.points.train, 1);
    assert.equal(after.ambition, 'survive');
    assert(after.yearItems > 0);

    await openPlan(page, true);
    const leads = await page.eval(() => ({ count: document.querySelectorAll('.year-plan .year-lead').length, confirm: !!document.querySelector('.year-plan-confirm'), overflow: document.documentElement.scrollWidth - innerWidth }));
    assert(leads.count > 0, `leads sit on the plan screen at ${width}px`);
    assert.equal(leads.confirm, false, 'with leads on screen, a lead starts the year');
    assert(leads.overflow <= 0, `plan with leads fits ${width}px`);
    await page.eval(() => document.querySelector('.year-plan .year-lead').click());
    const started = await page.eval(() => { const c = window.__gameStore.getState().char; return { pending: c.pendingYearPlan, lead: c.pendingLead, chosenAge: c.leadChoice?.age, age: c.age, plan: !!c.annualPlan }; });
    assert.equal(started.pending, null);
    assert.equal(started.lead, null);
    assert.equal(started.chosenAge, started.age);
    assert(started.plan);

    assert.equal(page.consoleErrors.length, 0, page.consoleErrors.join('\n'));
    console.log(`Annual plan browser ${width}px: layout, plan only, plan with a lead passed.`);
    await page.close();
  }
} finally {
  await browser.close();
}
