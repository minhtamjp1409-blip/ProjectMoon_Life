// Opens each dungeon's own rule in Chrome at 390 and 1440 (a Lake omen, the Lobotomy work step, the Backstreets clock,
// the Outskirts oil, a blood market lull, a WARP lull, the Head with an ally), captures each and reports sideways scroll.
//   node tools/qa/signature_browser.mjs <out-dir>
import { createServer } from 'vite';
import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { createNewCharacter } from '../../src/engine/gameEngine.js';
import { createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice } from '../../src/engine/dungeonEngine.js';
import { lawOf } from '../../src/engine/dungeonSignature.js';

const out = process.argv[2] || 'output';
const best = { heavy: 'guard', quick: 'strike', sweep: 'evade', mind: 'guard', grab: 'evade', heal: 'strike' };
const base = (seed, extra = {}) => {
  const c = createNewCharacter({ seed, startAge: 30, sparePerinatal: true });
  Object.assign(c, { job: 'Fixer', fixerGrade: 6, alive: true, pendingBirthLogs: [], pendingEvent: null, pendingMinor: null, pendingYearPlan: null, pendingModal: null, pendingLead: null, ...extra });
  c.stats = { ...c.stats, health: 85, sanity: 70, wealth: 40 };
  return c;
};
const step = (c, pred) => resolveDungeonChoice(c, getDungeonCurrentStage(c.pendingDungeon).choices.findIndex(pred), () => 0).char;
const answer = (c) => { const it = getDungeonCurrentStage(c.pendingDungeon).combat.intent; return step(c, (x) => x.combatAction === (it.kind === 'law' ? lawOf(it.law).answer : best[it.kind])); };
const toRest = (c) => { for (let i = 0; i < 40 && !getDungeonCurrentStage(c.pendingDungeon).isRest; i++) c = answer(c); return c; };
const scenes = {
  lake_omen: () => { let c = base('ui-lake'); c.pendingDungeon = createDungeonSession('dungeon_great_lake', c); return answer(c); },
  lobotomy_work: () => { let c = base('ui-lobo'); c.pendingDungeon = createDungeonSession('dungeon_lobotomy_ruin', c); return step(c, (x) => x.combatAction === 'workOpen'); },
  backstreets_clock: () => { let c = base('ui-night'); c.pendingDungeon = createDungeonSession('dungeon_backstreets_night', c); c.pendingDungeon.clockMin = 84; return c; },
  outskirts_oil: () => { let c = base('ui-oil'); c.pendingDungeon = createDungeonSession('dungeon_outskirts_ruins', c); return step(c, (x) => !x.checkTrait && !x.isFlee); },
  blood_market: () => { let c = base('ui-blood'); c.pendingDungeon = createDungeonSession('dungeon_bloodfiend_carnival', c); return toRest(c); },
  warp_passenger: () => { let c = base('ui-warp'); c.pendingDungeon = createDungeonSession('dungeon_warp_train', c); return toRest(c); },
  head_ally: () => { const c = base('ui-head', { taboo: 3, heat: 40, npcs: { partner: { nameVi: 'Yan', nameEn: 'Yan', bond: 80, status: 'alive' } } }); c.pendingDungeon = createDungeonSession('dungeon_claw_judgment', c); return c; }
};
const server = await createServer({ server: { port: 0 }, logLevel: 'error' });
await server.listen();
const { port } = server.httpServer.address();
const browser = await Browser.launch();
const report = [];
try {
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const page = await browser.newPage({ width: w, height: h, mobile: w < 500 });
    await page.goto(`http://localhost:${port}/`, { timeoutMs: 60000, settleMs: 2500 });
    for (const [name, make] of Object.entries(scenes)) {
      const char = JSON.parse(JSON.stringify(make()));
      await page.eval((ch) => window.__gameStore.setState({ inRun: true, cutscene: null, speed: 0, char: ch }), char);
      await sleep(900);
      report.push(await page.eval((n) => ({ n, overflow: document.documentElement.scrollWidth > innerWidth, meter: document.querySelector('.dg-signature')?.innerText.replace(/\s+/g, ' ').slice(0, 90), choices: [...document.querySelectorAll('.dg-choice .choice-label')].map((e) => e.innerText.slice(0, 60)) }), `${w}-${name}`));
      await page.eval(() => document.querySelector('.dg-signature')?.scrollIntoView({ block: 'start' }));
      await sleep(200);
      await page.screenshot({ path: `${out}/sig-${w}-${name}.jpg` });
    }
    await page.close();
  }
} finally { await browser.close(); await server.close(); }
console.log(JSON.stringify(report, null, 1));
