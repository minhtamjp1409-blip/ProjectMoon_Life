import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { createNewCharacter } from '../../src/engine/gameEngine.js';
import { createDungeonSession } from '../../src/engine/dungeonEngine.js';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.ARTIFACT_DIR || join(process.cwd(), 'output');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const BASE = process.env.DEV_URL || process.argv[2] || 'http://localhost:5173';
const dungeons = [
  { id: 'dungeon_warp_train', name: 'WARP Train' },
  { id: 'dungeon_great_lake', name: 'Great Lake' },
  { id: 'dungeon_claw_judgment', name: 'Claw Judgment' }
];

console.log('Connecting to browser and loading live app at 390x844 mobile...');
const browser = await Browser.launch();

try {
  const page = await browser.newPage({ width: 390, height: 844, mobile: true });
  await page.goto(BASE, { timeoutMs: 30000, settleMs: 3000 });

  const results = [];

  for (const d of dungeons) {
    console.log(`\n--- Measuring dungeon: ${d.name} (${d.id}) ---`);
    const char = createNewCharacter({ seed: `measure-${d.id}`, startAge: 25 });
    char.job = 'Fixer';
    char.fixerGrade = 5;
    char.pendingBirthLogs = [];
    char.pendingEvent = null;
    char.pendingMinor = null;
    char.pendingModal = null;
    char.pendingLead = null;
    char.pendingYearPlan = null;

    const session = createDungeonSession(d.id, char);

    await page.eval(({ char, session }) => {
      const store = window.__gameStore;
      store.setState({
        inRun: true,
        cutscene: null,
        char: {
          ...char,
          pendingDungeon: session,
          pendingYearPlan: null,
          pendingEvent: null,
          pendingMinor: null,
          pendingContract: null,
          pendingModal: null,
          pendingLead: null
        }
      });
    }, { char, session });

    await sleep(1500);

    const metrics = await page.eval(() => {
      const dock = document.querySelector('.dock.is-dungeon');
      const head = document.querySelector('.dg-head');
      const status = document.querySelector('.dg-status');
      const scene = document.querySelector('.dg-scene');
      const tools = document.querySelector('.dg-tools');
      const choices = document.querySelector('.dg-choices');
      const firstChoice = document.querySelector('.dg-choice');
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const getBox = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          height: Math.round(r.height),
          width: Math.round(r.width)
        };
      };

      return {
        viewportHeight,
        scrollY,
        dock: getBox(dock),
        head: getBox(head),
        status: getBox(status),
        scene: getBox(scene),
        tools: getBox(tools),
        choices: getBox(choices),
        firstChoice: getBox(firstChoice)
      };
    });

    const shotPath = join(outDir, `dungeon_measure_${d.id}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`Screenshot saved: ${shotPath}`);

    const bottom = metrics.firstChoice ? metrics.firstChoice.bottom : null;
    const diff = bottom != null ? bottom - 844 : null;
    const fits = bottom != null && bottom <= 844;

    results.push({
      id: d.id,
      name: d.name,
      metrics,
      firstChoiceBottom: bottom,
      viewportHeight: 844,
      overflow: diff,
      fitsFirstScreen: fits
    });

    console.log(`Viewport: 844px`);
    console.log(`First choice bottom: ${bottom}px (overflow: ${diff > 0 ? `+${diff}px (CẦN CUỘN)` : `${diff}px (VỪA MÀN ĐẦU)`})`);
    console.log(`Component heights: Head=${metrics.head?.height}px, Status=${metrics.status?.height}px, Scene=${metrics.scene?.height}px, Tools=${metrics.tools?.height}px, Choice1=${metrics.firstChoice?.height}px`);
  }

  console.log('\n=== TỔNG KẾT ĐO ĐẠC BƯỚC 1 (ĐỢT 117) ===');
  console.table(results.map(r => ({
    Dungeon: r.name,
    'Choice 1 Bottom': `${r.firstChoiceBottom}px`,
    'Screen Height': '844px',
    'Vượt màn đầu': r.overflow > 0 ? `+${r.overflow}px` : '0px (Vừa vặn)',
    'Nằm trong màn đầu?': r.fitsFirstScreen ? 'ĐẠT' : 'CHƯA ĐẠT (Cần cuộn)'
  })));

} finally {
  await browser.close();
}
