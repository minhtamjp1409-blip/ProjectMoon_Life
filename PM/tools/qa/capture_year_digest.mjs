import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { createNewCharacter } from '../../src/engine/gameEngine.js';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = 'C:/Users/nguyenhuynhminhtam/.gemini/antigravity/brain/e7e90694-7d57-4cea-90c8-403b1d3593ff';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const BASE = 'https://project-moon-life-five.vercel.app';

console.log('Connecting to browser and loading live app...');
const browser = await Browser.launch();

try {
  const page = await browser.newPage({ width: 800, height: 900 });
  await page.goto(BASE, { timeoutMs: 25000, settleMs: 2500 });

  const fullChar = createNewCharacter({ seed: 'test-digest-view', startAge: 11 });
  fullChar.job = 'Fixer';
  fullChar.pendingBirthLogs = [];
  fullChar.pendingEvent = null;
  fullChar.pendingMinor = null;
  fullChar.pendingDungeon = null;
  fullChar.pendingModal = null;
  fullChar.pendingLead = null;
  fullChar.plan = [];

  const digestQuiet = {
    id: 'log_10_digest',
    key: 'year_digest',
    type: 'year_digest',
    age: 10,
    quiet: true,
    season: { vi: 'Cả năm', en: 'All year' },
    vi: 'Một năm trôi qua bình lặng. Bạn ra quán ăn một bát canh nóng. Cơn mưa rào làm dịu cái nóng trên mái tôn. Tiếng còi tàu than vang vọng từ xa. Gió lùa qua khe liếp.',
    en: 'A quiet year passes. Warm soup at a local stall. Rain cools the tin roof. Distant whistle of a coal train. Cold draft through the door.',
    deltas: [{ k: 'health', v: 1 }, { k: 'sanity', v: 3 }, { k: 'wealth', v: 1 }],
    ids: ['d_10_0', 'd_10_1', 'd_10_2', 'd_10_3'],
    items: [
      { id: 'd_10_0', age: 10, type: 'daily', vi: 'Bạn ra quán ăn một bát canh nóng.', en: 'Warm soup at a local stall.', deltas: [{ k: 'health', v: 2 }], season: { vi: 'Mùa Xuân', en: 'Spring' } },
      { id: 'd_10_1', age: 10, type: 'daily', vi: 'Cơn mưa rào làm dịu cái nóng trên mái tôn.', en: 'Rain cools the tin roof.', deltas: [{ k: 'sanity', v: 3 }], season: { vi: 'Mùa Hạ', en: 'Summer' } },
      { id: 'd_10_2', age: 10, type: 'daily', vi: 'Tiếng còi tàu than vang vọng từ xa.', en: 'Distant whistle of a coal train.', deltas: [{ k: 'wealth', v: 1 }], season: { vi: 'Mùa Thu', en: 'Autumn' } },
      { id: 'd_10_3', age: 10, type: 'daily', vi: 'Gió lùa qua khe liếp.', en: 'Cold draft through the door.', deltas: [{ k: 'health', v: -1 }], season: { vi: 'Mùa Đông', en: 'Winter' } }
    ]
  };

  const digestBusy = {
    id: 'log_11_digest',
    key: 'year_digest',
    type: 'year_digest',
    age: 11,
    quiet: false,
    season: { vi: 'Cả năm', en: 'All year' },
    vi: 'Bạn tập vung kiếm gỗ sau nhà. Lá khô cuốn bay theo làn gió lạnh.',
    en: 'Practicing with a wooden sword. Dry leaves swirl in the cold air.',
    deltas: [{ k: 'health', v: 1 }, { k: 'sanity', v: 1 }],
    ids: ['d_11_0', 'd_11_2'],
    items: [
      { id: 'd_11_0', age: 11, type: 'daily', vi: 'Bạn tập vung kiếm gỗ sau nhà.', en: 'Practicing with a wooden sword.', deltas: [{ k: 'health', v: 1 }], season: { vi: 'Mùa Xuân', en: 'Spring' } },
      { id: 'd_11_2', age: 11, type: 'daily', vi: 'Lá khô cuốn bay theo làn gió lạnh.', en: 'Dry leaves swirl in the cold air.', deltas: [{ k: 'sanity', v: 1 }], season: { vi: 'Mùa Thu', en: 'Autumn' } }
    ]
  };

  const minorChoice = {
    id: 'log_11_minor',
    age: 11,
    type: 'choice',
    choiceVi: 'Lượm khẩu súng ngắn trong thùng rác',
    choiceEn: 'Pick up the revolver from the bin',
    vi: '[Hẻm sau] Bạn phát hiện khẩu súng còn nguyên hộp đạn.',
    en: '[Back alley] You find a loaded firearm in the trash.',
    deltas: [{ k: 'heat', v: 5 }],
    season: { vi: 'Mùa Hạ', en: 'Summer' }
  };

  fullChar.logs = [digestQuiet, digestBusy, minorChoice];

  // Nạp vào store của page
  await page.eval((charData) => {
    window.__gameStore.setState({ char: charData, inRun: true, speed: 0, yearProgress: 10 });
  }, fullChar);

  await sleep(1000);

  // Chụp ảnh khi đóng
  const pathClosed = join(outDir, 'year_digest_closed.png');
  await page.screenshot({ path: pathClosed, format: 'png' });
  console.log('Saved screenshot (closed):', pathClosed);

  // Mở thẻ "Xem từng mùa" của digestQuiet
  await page.eval(() => {
    const details = document.querySelector('.year-digest-fold');
    if (details) details.open = true;
  });
  await sleep(500);

  // Chụp ảnh khi mở
  const pathOpen = join(outDir, 'year_digest_open.png');
  await page.screenshot({ path: pathOpen, format: 'png' });
  console.log('Saved screenshot (open):', pathOpen);

} finally {
  await browser.close();
}
