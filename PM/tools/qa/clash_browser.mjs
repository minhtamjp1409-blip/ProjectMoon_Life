// Opens a Backstreets boss in Chrome at 390 and 1440, on a clashable turn, and captures the offer, the stake step
// and a scar-staked result; prints the choice labels and whether the page scrolls sideways.
//   node tools/qa/clash_browser.mjs <out-dir>
import { createServer } from 'vite';
import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { createNewCharacter } from '../../src/engine/gameEngine.js';
import { createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice } from '../../src/engine/dungeonEngine.js';
import { GAUNTLETS } from '../../src/data/dungeonGauntlets.js';
const out = process.argv[2];
const server = await createServer({ server: { port: 0 }, logLevel: 'error' });
await server.listen();
const { port } = server.httpServer.address();
let c = createNewCharacter({ seed: 'clash-shot', startAge: 30, sparePerinatal: true });
Object.assign(c, { job: 'Fixer', fixerGrade: 6, alive: true, scars: ['Vết chém trên vai'], pendingBirthLogs: [], pendingEvent: null, pendingMinor: null, pendingYearPlan: null, pendingModal: null, pendingLead: null });
c.stats = { ...c.stats, health: 80, sanity: 55, wealth: 40 };
c.pendingDungeon = createDungeonSession('dungeon_backstreets_night', c);
const s = c.pendingDungeon; const g = GAUNTLETS[s.id]; const k = s.combat.plan.length - 1; const boss = g.floors.at(-1).enemies[0];
Object.assign(s.combat, { floor: k, turn: 0, enemy: boss, guard: boss.guard, guardMax: boss.guard, phase: 1, offset: 0, clashes: 0, stakeUsed: false, clashOpen: false });
while (!['heavy', 'quick'].includes(g.intents[boss.intents[s.combat.turn % boss.intents.length]].kind)) s.combat.turn++;
const plain = JSON.parse(JSON.stringify(c));
c = resolveDungeonChoice(c, getDungeonCurrentStage(c.pendingDungeon).choices.findIndex((x) => x.combatAction === 'clash'), () => 0.5).char;
const browser = await Browser.launch();
const report = [];
try {
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const page = await browser.newPage({ width: w, height: h, mobile: w < 500 });
    await page.goto(`http://localhost:${port}/`, { timeoutMs: 60000, settleMs: 2500 });
    for (const [name, ch] of [['offer', plain], ['stake', c]]) {
      await page.eval((char) => window.__gameStore.setState({ inRun: true, cutscene: null, char }), ch);
      await sleep(1200);
      report.push(await page.eval((name) => ({ name, w: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth, choices: [...document.querySelectorAll('.dg-choice')].map((b) => b.innerText.replace(/\s+/g, ' ').slice(0, 120)) }), `${w}-${name}`));
      await page.screenshot({ path: `${out}/clash-${w}-${name}.jpg`, fullPage: false });
    }
    await page.eval(() => { const b = [...document.querySelectorAll('.dg-choice')].find((x) => x.innerText.includes('vết sẹo')); b?.click(); });
    await sleep(900);
    report.push(await page.eval(() => ({ name: 'result', clash: document.querySelector('.dg-clash')?.innerText.replace(/\s+/g, ' '), text: document.querySelector('.dg-result p:last-child')?.innerText.slice(0, 200) })));
    await page.eval(() => document.querySelector('.dg-result')?.scrollIntoView({ block: 'center' }));
    await sleep(300);
    await page.screenshot({ path: `${out}/clash-${w}-result.jpg` });
    await page.close();
  }
} finally { await browser.close(); await server.close(); }
console.log(JSON.stringify(report, null, 1));
