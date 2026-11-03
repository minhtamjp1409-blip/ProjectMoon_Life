import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const outDir = process.env.ARTIFACT_DIR || join(process.cwd(), 'output');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const BASE = process.env.DEV_URL || process.argv[2] || 'http://localhost:5173';

console.log('Connecting to browser and loading live app at 390x844 mobile...');
const browser = await Browser.launch();

try {
  const page = await browser.newPage({ width: 390, height: 844, mobile: true });
  await page.goto(BASE, { timeoutMs: 30000, settleMs: 3000 });

  // Đảm bảo trạng thái ban đầu sạch (không có pendingLegacy cũ trong localStorage)
  await page.eval(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.__gameStore?.getState?.()?.abandonRun?.();
  });
  await page.goto(BASE, { timeoutMs: 30000, settleMs: 2000 });

  // 1. Kiểm tra màn khai sinh (BirthSetupPanel)
  console.log('--- 1. Kiểm tra màn khai sinh (119c) ---');
  const setupInfo = await page.eval(() => {
    const spoilerEl = Array.from(document.querySelectorAll('p, div, span')).find(
      (el) => el.textContent.includes('Trò chơi có tiết lộ nội dung cốt truyện') || el.textContent.includes('Project Moon')
    );
    const shortcutEl = document.querySelector('.birth-shortcut-hint');
    const shortcutDisplay = shortcutEl ? window.getComputedStyle(shortcutEl).display : null;
    return {
      hasSpoiler: Boolean(spoilerEl),
      hasShortcutEl: Boolean(shortcutEl),
      shortcutDisplay
    };
  });
  console.log('Setup Info:', setupInfo);
  assert.ok(setupInfo.hasSpoiler, 'Phải có dòng cảnh báo spoiler 15+');
  assert.ok(setupInfo.hasShortcutEl, 'Phải có phần tử phím tắt');

  // 2. Bấm "Bắt đầu" và kiểm tra dòng log đầu tiên xuất hiện ngay khi vào đời (119a)
  console.log('--- 2. Bấm bắt đầu và kiểm tra dòng log đầu xuất hiện ngay lập tức (119a) ---');
  const birthStartResult = await page.eval(async () => {
    const btn = document.querySelector('.hero-start-btn') || Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent.includes('Bắt đầu') || b.textContent.includes('Begin')
    );
    if (!btn) return { error: 'Không tìm thấy nút Bắt đầu' };
    btn.click();

    // Chờ quá trình quay vòng hoàn tất và startLife kích hoạt
    let startLifeTime = null;
    let logRenderedTime = null;
    for (let i = 0; i < 150; i++) {
      const s = window.__gameStore?.getState?.();
      if (s?.inRun && !startLifeTime) {
        startLifeTime = performance.now();
      }
      const logEntry = document.querySelector('.log .entry, .stage .entry');
      if (logEntry && startLifeTime) {
        logRenderedTime = performance.now() - startLifeTime;
        break;
      }
      await new Promise((r) => setTimeout(r, 30));
    }
    return {
      inRun: Boolean(window.__gameStore?.getState?.()?.inRun),
      firstLogTime: logRenderedTime,
      firstLogText: document.querySelector('.log .entry, .stage .entry')?.textContent
    };
  });
  console.log('Birth Start Result:', birthStartResult);
  assert.ok(birthStartResult.inRun, 'Phải vào run sau khi bấm bắt đầu');
  assert.ok(birthStartResult.firstLogTime !== null, 'Phải có dòng log đầu tiên');
  assert.ok(birthStartResult.firstLogTime < 500, `Dòng đầu phải hiện tại frame 0 (<500ms), thực tế: ${birthStartResult.firstLogTime}ms`);

  // Chụp ảnh ngay sau khi bắt đầu khai sinh
  await page.screenshot(join(outDir, 'birth_frame0_mobile.png'));
  console.log('Saved screenshot: birth_frame0_mobile.png');

  // 3. Cho chạy qua prologue khai sinh và tiến sang tuổi 1 (120c)
  console.log('--- 3. Kiểm tra bố cục màn đầu sau khai sinh (120c) ---');
  // Chờ prologue kết thúc hoặc skip
  await page.eval(() => {
    const s = window.__gameStore?.getState?.();
    if (s?.skipAllBirthLogs) s.skipAllBirthLogs();
  });
  await sleep(600);

  // Tiến 1 bước để có sự kiện tuổi 1
  await page.eval(() => {
    const s = window.__gameStore?.getState?.();
    if (s?.stepYear) s.stepYear();
  });
  await sleep(1000);

  // Đo vị trí các phần tử trên viewport 390x844
  const feedLayout = await page.eval(() => {
    const entries = Array.from(document.querySelectorAll('.log .entry'));
    const fold = document.querySelector('.birth-extra-fold');
    const summary = fold ? fold.querySelector('summary')?.textContent : null;
    const yearlines = Array.from(document.querySelectorAll('.yearline')).map((el) => el.textContent.trim());
    
    // Tìm vị trí dòng sự kiện đầu tiên
    const firstEventCard = entries.find((e) => !e.classList.contains('birth-extra-fold-card') && e.textContent.includes('Tuổi 1') || e.closest('.log'));
    const lastVisibleInFirstScreen = entries[entries.length - 1];
    const rect = lastVisibleInFirstScreen ? lastVisibleInFirstScreen.getBoundingClientRect() : null;

    return {
      entriesCount: entries.length,
      hasFold: Boolean(fold),
      foldSummary: summary,
      yearlines,
      lastRect: rect ? { top: rect.top, bottom: rect.bottom } : null,
      viewportHeight: window.innerHeight
    };
  });
  console.log('Feed Layout:', feedLayout);
  assert.ok(feedLayout.hasFold, 'Phải có fold chi tiết thời thơ ấu & nguồn cội');
  assert.ok(feedLayout.foldSummary?.includes('thời thơ ấu') || feedLayout.foldSummary?.includes('Childhood'), 'Tiêu đề fold đúng');

  // Chụp ảnh màn đầu tuổi 1
  await page.screenshot(join(outDir, 'birth_first_screen_age1.png'));
  console.log('Saved screenshot: birth_first_screen_age1.png');

  // 4. Mở fold chi tiết để chụp ảnh trạng thái mở
  await page.eval(() => {
    const details = document.querySelector('.birth-extra-fold');
    if (details) details.open = true;
  });
  await sleep(400);
  await page.screenshot(join(outDir, 'birth_fold_open_mobile.png'));
  console.log('Saved screenshot: birth_fold_open_mobile.png');

  // 5. Kiểm tra notification toast placement trên mobile (119b)
  console.log('--- 4. Kiểm tra Achievement Toast placement trên mobile (119b) ---');
  await page.eval(() => {
    const s = window.__gameStore?.getState?.();
    if (s?.char) {
      // Kích hoạt thành tựu thật có trong CODEX_RECORDS (fixer_license)
      s.commit(s.char, {
        ...s.char,
        unlockedRecords: [...(s.char.unlockedRecords || []), 'fixer_license']
      });
      if (s.dismissResolution) s.dismissResolution();
    }
  });
  await sleep(600);

  const toastLayout = await page.eval(() => {
    const notice = document.querySelector('.ant-notification-notice, .ant-notification');
    if (!notice) return { found: false };
    const wrapper = notice.closest('.ant-notification') || notice;
    const rect = wrapper.getBoundingClientRect();
    const style = window.getComputedStyle(wrapper);
    return {
      found: true,
      top: rect.top,
      bottom: rect.bottom,
      cssTop: style.top,
      cssBottom: style.bottom,
      role: notice.getAttribute('role') || notice.querySelector('[role]')?.getAttribute('role')
    };
  });
  console.log('Toast Layout:', toastLayout);
  assert.ok(toastLayout.found, 'Phải tìm thấy notification toast thành tựu');
  assert.ok(
    toastLayout.top >= 180 && toastLayout.top <= 230,
    `Toast mobile phải nằm dưới HUD (top: 180-230px) để không che nút đáy, thực tế top: ${toastLayout.top}`
  );

  console.log('=== TẤT CẢ ĐO ĐẠC CDP TRÊN MOBILE ĐÃ HOÀN TẤT THÀNH CÔNG ===');
} finally {
  await browser.close();
}
