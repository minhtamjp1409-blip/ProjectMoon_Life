import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { createNewCharacter, interpolateText } from '../../src/engine/gameEngine.js';
import { LIFE_MINORS } from '../../src/data/lifeMinors.js';
import { chapterFor } from '../../src/engine/chapters.js';

const BASE = process.env.DEV_URL || process.argv[2] || 'http://localhost:5173';

console.log(`Connecting to browser at ${BASE} to test Screen Reader (NVDA) traversal order...`);
const browser = await Browser.launch();

try {
  const page = await browser.newPage({ width: 390, height: 844 });
  await page.goto(BASE, { timeoutMs: 30000, settleMs: 2000 });

  const nvdaLog = [];
  const logSpeech = (context, text) => {
    const entry = `[NVDA Spoken :: ${context}] ${text}`;
    console.log(entry);
    nvdaLog.push(entry);
  };

  // Helper to extract accessible reading text in DOM order
  const getAccessibleTextOrder = async (selector) => {
    return page.eval((sel) => {
      const root = document.querySelector(sel);
      if (!root) return null;

      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.getAttribute('aria-hidden') === 'true') return NodeFilter.FILTER_REJECT;
              const style = window.getComputedStyle(node);
              if (style.display === 'none' || style.visibility === 'hidden') return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const items = [];
      const visitedElements = new Set();

      const walk = (el) => {
        if (!el || el.getAttribute?.('aria-hidden') === 'true') return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return;

        // Check aria-label
        const ariaLabel = el.getAttribute?.('aria-label');
        const role = el.getAttribute?.('role') || el.tagName.toLowerCase();

        if (ariaLabel && (role === 'document' || role === 'timer' || role === 'button' || role === 'section' || role === 'article')) {
          items.push({ type: role, text: ariaLabel });
        }

        for (const child of el.childNodes) {
          if (child.nodeType === Node.TEXT_NODE) {
            const txt = child.textContent.trim();
            if (txt) items.push({ type: 'text', text: txt });
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            walk(child);
          }
        }
      };

      walk(root);
      return items;
    }, selector);
  };

  // --- SCENARIO 1: MINOR DOCK ---
  console.log('\n=== 1. KIỂM THỬ TRÌNH ĐỌC MÀN HÌNH: THẺ MINOR ===');
  const char1 = createNewCharacter({ seed: 'nvda-minor', startAge: 20 });
  char1.stats.wealth = 5; // Locked choice 1
  const defMinor = LIFE_MINORS.find((m) => m.id === 'm_med_backstreet_clinic');
  const promptMinor = {
    id: defMinor.id,
    t: 0.5,
    vi: interpolateText(defMinor.vi, char1),
    en: interpolateText(defMinor.en, char1),
    choices: defMinor.choices.map((c) => ({
      vi: interpolateText(c.vi, char1),
      en: interpolateText(c.en, char1),
      fx: c.fx,
      out: c.out,
      need: c.need,
      costAhn: c.costAhn
    })),
    ignore: defMinor.ignore || null,
    remainingMs: 30000
  };

  await page.eval(({ char, promptMinor }) => {
    const store = window.__gameStore;
    store.setState({
      inRun: true,
      speed: 0,
      minorRemainingMs: 30000,
      cutscene: null,
      activeResolution: null,
      char: {
        ...char,
        pendingMinor: promptMinor,
        pendingDungeon: null,
        pendingYearPlan: null,
        pendingEvent: null,
        pendingContract: null
      }
    });
  }, { char: char1, promptMinor });

  await sleep(1000);

  const minorOrder = await getAccessibleTextOrder('.dock.is-minor');
  console.log('Thứ tự đọc Minor (DOM):');
  minorOrder?.forEach((item) => {
    logSpeech('MinorDock', `${item.type.toUpperCase()}: ${item.text}`);
  });

  // Verify toggle detail on Choice 0
  console.log('\n--- Thử nghiệm chạm mở chi tiết (Fold/Unfold) trên Choice 0 ---');
  const beforeToggle = await page.eval(() => {
    const ch = document.querySelector('.choice');
    const sec = ch?.querySelector('.preview-secondary');
    return {
      isOpen: sec?.classList.contains('is-open'),
      display: sec ? window.getComputedStyle(sec).display : null
    };
  });
  console.log('Trước khi chạm toggle:', beforeToggle);

  await page.eval(() => {
    const toggle = document.querySelector('.choice .choice-detail-toggle');
    if (toggle) toggle.click();
  });
  await sleep(500);

  const afterToggle = await page.eval(() => {
    const ch = document.querySelector('.choice');
    const sec = ch?.querySelector('.preview-secondary');
    return {
      isOpen: sec?.classList.contains('is-open'),
      display: sec ? window.getComputedStyle(sec).display : null
    };
  });
  console.log('Sau khi chạm toggle lần 1 (Mở chi tiết):', afterToggle);

  await page.eval(() => {
    const toggle = document.querySelector('.choice .choice-detail-toggle');
    if (toggle) toggle.click();
  });
  await sleep(500);

  const afterToggle2 = await page.eval(() => {
    const ch = document.querySelector('.choice');
    const sec = ch?.querySelector('.preview-secondary');
    return {
      isOpen: sec?.classList.contains('is-open'),
      display: sec ? window.getComputedStyle(sec).display : null
    };
  });
  console.log('Sau khi chạm toggle lần 2 (Gấp lại chi tiết):', afterToggle2);

  // --- SCENARIO 2: CUTSCENE & KHI CẢNH KẾT THÚC ---
  console.log('\n=== 2. KIỂM THỬ TRÌNH ĐỌC MÀN HÌNH: CẢNH CUTSCENE (CLAW) VÀ THÔNG BÁO SAU CẢNH ===');
  await page.eval(() => {
    const store = window.__gameStore;
    store.setState({
      cutscene: {
        id: 'claw',
        key: 'claw_test_1',
        cut: 'caption',
        durationMs: 1200
      }
    });
  });

  await sleep(500);
  const cutsceneCaptionText = await page.eval(() => {
    const lines = document.querySelector('.cs-lines');
    return lines ? lines.innerText.trim() : null;
  });
  logSpeech('Cutscene Caption', cutsceneCaptionText);

  // End cutscene and check aria-live region
  await page.eval(() => {
    const store = window.__gameStore;
    store.getState().endCutscene('finished');
  });

  await sleep(600);
  const postSceneAnnounce = await page.eval(() => {
    const liveRegion = document.querySelector('.sr-only[aria-live="polite"]');
    return liveRegion ? liveRegion.textContent.trim() : null;
  });
  logSpeech('Vùng thông báo ẩn (Hậu Cutscene)', postSceneAnnounce);

  // --- SCENARIO 3: THẺ CHƯƠNG ---
  console.log('\n=== 3. KIỂM THỬ TRÌNH ĐỌC MÀN HÌNH: THẺ CHƯƠNG (CHAPTER CARD) ===');
  const prevChar = createNewCharacter({ seed: 'nvda-chap', startAge: 25 });
  prevChar.fixerGrade = 7;
  const nextChar = {
    ...prevChar,
    fixerGrade: 6,
    logs: [
      {
        id: 'chapter_25_1',
        type: 'chapter',
        kind: 'rank',
        age: 25,
        titleVi: 'Fixer Grade 6',
        titleEn: 'Fixer Grade 6',
        subVi: 'Năm 25 tuổi, Hana ghi Grade mới vào hồ sơ.',
        subEn: 'At 25, Hana enters a new Grade on your file.'
      }
    ]
  };

  await page.eval(({ char }) => {
    const store = window.__gameStore;
    store.setState({
      cutscene: null,
      char
    });
  }, { char: nextChar });

  await sleep(600);
  const chapterOrder = await getAccessibleTextOrder('.chapter-card');
  chapterOrder?.forEach((item) => {
    logSpeech('ChapterCard', `${item.type.toUpperCase()}: ${item.text}`);
  });

  // --- SCENARIO 4: CÁI CHẾT VÀ DI CẢO ---
  console.log('\n=== 4. KIỂM THỬ TRÌNH ĐỌC MÀN HÌNH: CÁI CHẾT VÀ DI CẢO ===');
  const deadChar = {
    ...nextChar,
    alive: false,
    deathCause: 'Gục ngã trước lưỡi kiếm Sweeper lúc 3:13 AM tại Backstreets.',
    deathCauseVi: 'Gục ngã trước lưỡi kiếm Sweeper lúc 3:13 AM tại Backstreets.',
    deathCauseEn: 'Fell before a Sweeper blade at 3:13 AM in the Backstreets.',
    poeticQuoteVi: 'Những ngọn đèn đường Backstreets tắt dần, chỉ còn lại màn sương đen.',
    poeticQuoteEn: 'The Backstreet lamps flicker out, leaving only black mist.'
  };

  await page.eval(({ char }) => {
    const store = window.__gameStore;
    store.setState({
      cutscene: null,
      pendingBirthLogs: [],
      char: {
        ...char,
        pendingBirthLogs: []
      }
    });
  }, { char: deadChar });

  await sleep(600);

  const activeFocus = await page.eval(() => {
    const el = document.activeElement;
    return {
      tag: el?.tagName,
      className: el?.className,
      ariaLabel: el?.getAttribute('aria-label'),
      text: el?.textContent?.slice(0, 100)
    };
  });
  console.log('Phần tử nhận Focus khi Cái chết xuất hiện:', activeFocus);

  const deathOrder = await getAccessibleTextOrder('.life-end-card');
  deathOrder?.forEach((item) => {
    logSpeech('LifeEndCard', `${item.type.toUpperCase()}: ${item.text}`);
  });

  console.log('\n=== TỔNG KẾT KIỂM THỬ TRÌNH ĐỌC MÀN HÌNH HOÀN TẤT ===');
} finally {
  await browser.close();
}
