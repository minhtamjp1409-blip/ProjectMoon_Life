import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { createNewCharacter, interpolateText } from '../../src/engine/gameEngine.js';
import { LIFE_MINORS } from '../../src/data/lifeMinors.js';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = 'C:/Users/nguyenhuynhminhtam/.gemini/antigravity/brain/e7e90694-7d57-4cea-90c8-403b1d3593ff';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const BASE = process.argv[2] || 'https://project-moon-life-five.vercel.app';

const scenarios = [
  {
    key: 'minor_cost',
    name: 'Minor có giá (Phòng khám chui)',
    minorId: 'm_med_backstreet_clinic',
    wealth: 50,
    setupChar: (char) => {
      char.age = 22;
      char.job = 'Fixer';
      char.fixerGrade = 7;
      char.stats.wealth = 50;
      char.stats.health = 45;
    }
  },
  {
    key: 'minor_npc',
    name: 'Minor có NPC ({friend})',
    minorId: 'm_k_candy',
    wealth: 10,
    setupChar: (char) => {
      char.age = 10;
      char.job = 'Child';
      char.npcs = {
        friend: {
          id: 'npc_friend_test',
          name: 'Hana',
          nameVi: 'Hana',
          nameEn: 'Hana',
          role: 'friend',
          bond: 35,
          alive: true
        }
      };
    }
  },
  {
    key: 'minor_locked',
    name: 'Minor có điều kiện khóa (Thiếu Ahn)',
    minorId: 'm_med_backstreet_clinic',
    wealth: 5,
    setupChar: (char) => {
      char.age = 22;
      char.job = 'Fixer';
      char.fixerGrade = 7;
      char.stats.wealth = 5;
      char.stats.health = 45;
    }
  }
];

console.log(`Connecting to browser and loading app at ${BASE} (390x844 mobile)...`);
const browser = await Browser.launch();

try {
  const page = await browser.newPage({ width: 390, height: 844, mobile: true });
  await page.goto(BASE, { timeoutMs: 30000, settleMs: 3000 });

  const results = [];

  for (const sc of scenarios) {
    console.log(`\n--- Measuring: ${sc.name} (${sc.minorId}) ---`);
    const char = createNewCharacter({ seed: `measure-${sc.key}`, startAge: 20 });
    sc.setupChar(char);
    char.pendingBirthLogs = [];
    char.pendingEvent = null;
    char.pendingContract = null;
    char.pendingModal = null;
    char.pendingLead = null;
    char.pendingYearPlan = null;
    char.pendingDungeon = null;

    const def = LIFE_MINORS.find((m) => m.id === sc.minorId);
    if (!def) throw new Error(`Minor not found: ${sc.minorId}`);

    const promptObj = {
      id: def.id,
      t: 0.5,
      vi: interpolateText(def.vi, char),
      en: interpolateText(def.en, char),
      choices: def.choices.map((c) => ({
        vi: interpolateText(c.vi, char),
        en: interpolateText(c.en, char),
        fx: c.fx,
        out: c.out,
        need: c.need,
        costAhn: c.costAhn
      })),
      ignore: def.ignore || null,
      remainingMs: 30000
    };

    await page.eval(({ char, promptObj, wealth }) => {
      const store = window.__gameStore;
      store.setState({
        inRun: true,
        speed: 0,
        minorRemainingMs: 30000,
        pendingBirthLogs: [],
        cutscene: null,
        activeResolution: null,
        char: {
          ...char,
          stats: {
            ...char.stats,
            wealth
          },
          pendingBirthLogs: [],
          pendingMinor: promptObj,
          pendingDungeon: null,
          pendingYearPlan: null,
          pendingEvent: null,
          pendingContract: null,
          pendingModal: null,
          pendingLead: null
        }
      });
    }, { char, promptObj, wealth: sc.wealth });

    await sleep(1500);

    const metrics = await page.eval(() => {
      const dock = document.querySelector('.dock.is-minor');
      const inner = document.querySelector('.dock.is-minor .dock-inner');
      const banner = document.querySelector('.dock.is-minor .dock-banner');
      const text = document.querySelector('.dock.is-minor .dock-text');
      const choicesWrap = document.querySelector('.dock.is-minor .choices');
      const allChoices = Array.from(document.querySelectorAll('.dock.is-minor .choice'));
      const lastChoice = allChoices[allChoices.length - 1];

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

      const choiceDetails = allChoices.map((chEl, idx) => {
        const isGhost = chEl.classList.contains('is-ghost');
        const isDisabled = chEl.classList.contains('is-disabled');
        const labelEl = chEl.querySelector('.choice-label');
        const costChipEl = chEl.querySelector('.choice-cost-chip');
        const needEl = chEl.querySelector('.choice-need');
        const previewEl = chEl.querySelector('.preview');
        const previewChips = previewEl ? Array.from(previewEl.querySelectorAll('.delta, .preview-odds, .disco-check-pill')) : [];
        const box = getBox(chEl);

        return {
          idx,
          isGhost,
          isDisabled,
          label: labelEl ? labelEl.textContent.trim() : '',
          hasCostChip: Boolean(costChipEl),
          costText: costChipEl ? costChipEl.textContent.trim() : null,
          hasNeed: Boolean(needEl),
          needText: needEl ? needEl.textContent.trim() : null,
          previewChipCount: previewChips.length,
          previewChipsText: previewChips.map((c) => c.textContent.trim()),
          totalChipsAndBadges: (costChipEl ? 1 : 0) + (needEl ? 1 : 0) + previewChips.length + 1, // +1 for badge
          height: box?.height,
          top: box?.top,
          bottom: box?.bottom
        };
      });

      return {
        viewportHeight: window.innerHeight,
        dock: getBox(dock),
        inner: getBox(inner),
        banner: getBox(banner),
        text: getBox(text),
        choicesWrap: getBox(choicesWrap),
        lastChoice: getBox(lastChoice),
        choiceCount: allChoices.length,
        choiceDetails
      };
    });

    const shotPath = join(outDir, `minor_measure_${sc.key}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`Screenshot saved: ${shotPath}`);

    const lastBottom = metrics.lastChoice ? metrics.lastChoice.bottom : null;
    const diff = lastBottom != null ? lastBottom - 844 : null;
    const fits = lastBottom != null && lastBottom <= 844;

    results.push({
      key: sc.key,
      name: sc.name,
      metrics,
      cardHeight: metrics.dock?.height,
      choiceCount: metrics.choiceCount,
      lastChoiceBottom: lastBottom,
      viewportHeight: 844,
      overflow: diff,
      fitsFirstScreen: fits,
      choices: metrics.choiceDetails
    });

    console.log(`Card height: ${metrics.dock?.height}px`);
    console.log(`Last choice bottom: ${lastBottom}px (overflow: ${diff > 0 ? `+${diff}px (CẦN CUỘN)` : `${diff}px (VỪA MÀN ĐẦU)`})`);
    console.log(`Choices breakdown:`);
    metrics.choiceDetails.forEach((c) => {
      console.log(`  - Choice ${c.idx} (${c.isGhost ? 'Ghost' : 'Regular'}${c.isDisabled ? ', LOCKED' : ''}): ${c.totalChipsAndBadges} chips/labels, height=${c.height}px, bottom=${c.bottom}px`);
      if (c.needText) console.log(`    Need: "${c.needText}"`);
      if (c.costText) console.log(`    Cost: "${c.costText}"`);
      if (c.previewChipsText.length) console.log(`    Preview chips (${c.previewChipCount}): [${c.previewChipsText.join(', ')}]`);
    });
  }

  console.log('\n=== TỔNG KẾT ĐO ĐẠC BƯỚC 1 - MINOR MOBILE (390x844) ===');
  console.table(results.map(r => ({
    Scenario: r.name,
    'Card Height': `${r.cardHeight}px`,
    'Choices': r.choiceCount,
    'Last Choice Bottom': `${r.lastChoiceBottom}px`,
    'Screen Height': '844px',
    'Vượt màn đầu': r.overflow > 0 ? `+${r.overflow}px` : `${r.overflow}px (Vừa vặn)`,
    'Nằm trong màn đầu?': r.fitsFirstScreen ? 'ĐẠT' : 'CHƯA ĐẠT (Cần cuộn)'
  })));

} finally {
  await browser.close();
}
