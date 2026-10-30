import fs from 'fs';
import {
  createNewCharacter,
  createRNG,
  resolveEventChoice,
  resolveFixerContract,
  resolveDungeonChoice,
  getDungeonCurrentStage,
  isDungeonChoiceAvailable,
  checkPromotions,
  ALL_STORY_EVENTS,
  buildLifeSummaryAndLegacy,
  getNextCareerMilestone
} from '../../src/engine/gameEngine.js';

import { getNextFixerPromotion, checkColorFixerReadiness } from '../../src/engine/careerPipeline.js';

import {
  planYear,
  endYear,
  runPlanItem,
  resolveMinor,
  chooseDirectorPacedLead
} from '../../src/engine/yearPlanner.js';

import { choiceIsAvailable } from '../../src/engine/eventConditions.js';
import { tabooGainOf } from '../../src/engine/forbiddenPath.js';

// Usage: node tools/sim/run_million_audit.mjs [scenarios]. Only a full run rewrites the report file.
const FULL_RUN = 1000000;
const TARGET_SCENARIOS = Number(process.argv[2]) || 500;
console.log('================================================================');
console.log(`   KIỂM THỬ TỰ ĐỘNG: ${TARGET_SCENARIOS.toLocaleString()} KHOẢNH KHẮC`);
console.log('              THE CITY CHRONICLES');
console.log('================================================================');
console.log(`Số lượng sự kiện cốt truyện lớn trong Database: ${ALL_STORY_EVENTS.length}`);
console.log(`Mục tiêu kiểm thử: ${TARGET_SCENARIOS.toLocaleString()} khoảnh khắc...\n`);

const STATS = {
  targetScenarios: TARGET_SCENARIOS,
  totalScenariosExecuted: 0,
  totalLivesSimulated: 0,
  totalYearsLived: 0,
  maxAge: 0,
  careers: {},
  fixerGradesReached: {
    g9: 0, g8: 0, g7: 0, g6: 0, g5: 0,
    g4: 0, g3: 0, g2: 0, g1: 0, color: 0
  },
  distortionsCount: 0,
  egoAwakenedCount: 0,
  itemsBought: 0,
  ghostNpcViolations: 0,
  distortionFixerContractViolations: 0,
  fixerGradeSkipViolations: 0,
  biologicalChildWithoutOffspringViolations: 0,
  milestoneGateMismatches: 0,
  multiGradeYears: 0,
  noAvailableMajorChoices: 0,
  noAvailableContractApproaches: 0
};

const startTime = Date.now();
let lifeIdx = 0;

while (STATS.totalScenariosExecuted < TARGET_SCENARIOS) {
  lifeIdx++;
  STATS.totalLivesSimulated++;

  const seed = `million_seed_${lifeIdx}_${startTime}`;
  const lifeRng = createRNG(seed);
  let char = createNewCharacter({
    customName: `Sim_${lifeIdx}`,
    seed,
    startAge: 0
  });

  let previousGrade = 9;
  let leapSeen = false;

  // Check 3 runs after every step that can change the grade, so two exams passed in one
  // year count as two single steps, not as one skip
  const noteGrade = () => {
    if ((char.job === 'Fixer' || char.job === 'Color Fixer') && char.fixerGrade != null) {
      // The allowed exceptions:
      // 1) E.G.O leap: two bands, once per life, and only with that flag
      // 2) Color Fixer appointment (Grade 1 or prodigy Grade 2/3 -> Grade 0)
      const gap = previousGrade - char.fixerGrade;
      if (gap > 1 && !(gap === 2 && char.flags.includes('ego_leap_done') && !leapSeen) && !char.flags.includes('ColorFixer')) STATS.fixerGradeSkipViolations++;
      if (gap === 2 && char.flags.includes('ego_leap_done')) leapSeen = true;
      previousGrade = char.fixerGrade;
    }
  };

  while (char.alive && char.age < 120 && STATS.totalScenariosExecuted < TARGET_SCENARIOS) {
    STATS.totalYearsLived++;
    if (char.age > STATS.maxAge) STATS.maxAge = char.age;
    const yearStartGrade = (char.job === 'Fixer' || char.job === 'Color Fixer') ? char.fixerGrade : null;

    // Check 5: the checklist shown to the player must agree with the gate that opens the exam
    if (char.job === 'Fixer' && !char.flags.includes('Distorted') && !char.flags.includes('ColorFixer') && char.fixerGrade >= 1) {
      const ms = getNextCareerMilestone(char);
      const promo = getNextFixerPromotion(char);
      const gate = promo ? promo.isEligible : checkColorFixerReadiness(char).ready;
      const shown = (promo ? ms.requirements : ms.requirements.slice(0, 2)).every((r) => r.met);
      if (shown !== gate) STATS.milestoneGateMismatches++;
    }

    if (!char.plan?.length) planYear(char, lifeRng);
    if (char.pendingLead) char = chooseDirectorPacedLead(char, lifeRng);
    const plan = char.plan || [];

    for (const item of plan) {
      if (!char.alive || STATS.totalScenariosExecuted >= TARGET_SCENARIOS) break;
      char = runPlanItem(char, item, lifeRng);
      noteGrade();
      STATS.totalScenariosExecuted++;

      // Major Event Resolution
      if (char.pendingEvent) {
        const ev = char.pendingEvent;

        // Check 1: Ghost NPC check
        const text = `${ev.titleVi || ''} ${ev.displayVi || ''}`;
        for (const role of ['spouse', 'partner', 'friend', 'mentor', 'child']) {
          if (text.includes(`{${role}}`)) {
            const npc = char.npcs?.[role];
            if (!npc || npc.deceased || npc.status === 'dead') {
              STATS.ghostNpcViolations++;
            }
          }
        }

        // Check 2: Distortion isolation
        if (char.flags.includes('Distorted')) {
          if (ev.id.startsWith('fixer_promo_') || (ev.jobs && ev.jobs.includes('Fixer') && !ev.id.startsWith('distort_'))) {
            STATS.distortionFixerContractViolations++;
          }
        }

        const choices = ev.choices || [];
        const available = choices.map((_, index) => index).filter((index) => choiceIsAvailable(choices[index], char) && !tabooGainOf(choices[index]));
        if (!available.length) {
          STATS.noAvailableMajorChoices++;
          throw new Error(`No available choice in ${ev.id} at age ${char.age}, seed ${seed}`);
        }
        const pickIdx = available[Math.floor(lifeRng() * available.length)];
        const chosen = choices[pickIdx];
        if (chosen?.costAhn && char.stats.wealth >= chosen.costAhn) {
          STATS.itemsBought++;
        }
        char = resolveEventChoice(char, pickIdx, lifeRng);
        noteGrade();
      }

      // Tactical Contract Resolution
      if (char.pendingContract) {
        if (char.flags.includes('Distorted')) {
          STATS.distortionFixerContractViolations++;
        }
        const approaches = char.pendingContract.approaches.filter((approach) => char.stats.wealth >= (approach.costAhn || 0));
        if (!approaches.length) {
          STATS.noAvailableContractApproaches++;
          throw new Error(`No affordable contract approach at age ${char.age}, seed ${seed}`);
        }
        const chosen = approaches[Math.floor(lifeRng() * approaches.length)];
        char = resolveFixerContract(char, chosen.id, lifeRng);
        noteGrade();
      }

      // Minor Choice Resolution
      if (char.pendingMinor) {
        const prompt = char.pendingMinor;
        const choices = prompt.choices || [];
        const available = choices.map((_, index) => index).filter((index) => choiceIsAvailable(choices[index], char) && !tabooGainOf(choices[index]));
        const pickIdx = available.length ? available[Math.floor(lifeRng() * available.length)] : -1;
        char = resolveMinor(char, pickIdx, lifeRng);
        noteGrade();
      }

      // Micro-Dungeon Delve Resolution
      let dungeonSteps = 0;
      while (char.pendingDungeon && char.alive && dungeonSteps++ < 10) {
        const stage = getDungeonCurrentStage(char.pendingDungeon);
        if (!stage) break;
        const available = stage.choices
          .map((c, idx) => ({ c, idx }))
          .filter(({ c }) => isDungeonChoiceAvailable(c, char));
        const pickIdx = available.length > 0 ? available[Math.floor(lifeRng() * available.length)].idx : 0;
        const res = resolveDungeonChoice(char, pickIdx, lifeRng);
        char = res.char;
        noteGrade();
      }

    }

    if (char.alive && STATS.totalScenariosExecuted < TARGET_SCENARIOS) {
      char = endYear(char, lifeRng);
      noteGrade();
    }
    if (yearStartGrade != null && (char.job === 'Fixer' || char.job === 'Color Fixer') && yearStartGrade - char.fixerGrade > 1 && !char.flags.includes('ColorFixer')) {
      STATS.multiGradeYears++;
    }
  }

  // Record career breakdown
  const finalCareer = char.flags.includes('Distorted')
    ? 'Distortion'
    : char.age < 18
    ? (char.alive ? 'Child' : 'ChildDeath')
    : char.job;
  STATS.careers[finalCareer] = (STATS.careers[finalCareer] || 0) + 1;

  if (char.flags.includes('Distorted')) STATS.distortionsCount++;
  if (char.flags.includes('EGOAwakened')) STATS.egoAwakenedCount++;

  if (char.job === 'Fixer' || char.job === 'Color Fixer') {
    if (char.flags.includes('ColorFixer')) STATS.fixerGradesReached.color++;
    else if (char.fixerGrade >= 1 && char.fixerGrade <= 9) {
      STATS.fixerGradesReached[`g${char.fixerGrade}`]++;
    }
  }

  // Check 4: Biological Child without offspring
  const summary = buildLifeSummaryAndLegacy(char);
  const succ = summary.successorInfo || { type: 'scavenger' };
  const actuallyHadChild = char.npcs?.child && !char.npcs.child.deceased && char.npcs.child.status !== 'dead';
  if (succ.type === 'child' && !actuallyHadChild && !char.flags.includes('HasChild')) {
    STATS.biologicalChildWithoutOffspringViolations++;
  }

  if (STATS.totalLivesSimulated % 1000 === 0) {
    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`... Đã mô phỏng ${STATS.totalLivesSimulated.toLocaleString()} sinh mệnh | ${STATS.totalScenariosExecuted.toLocaleString()} kịch bản (${elapsedSec}s) | Lỗi Ghost: ${STATS.ghostNpcViolations} | Lỗi Grade: ${STATS.fixerGradeSkipViolations}`);
  }
}

const totalDurationSec = ((Date.now() - startTime) / 1000).toFixed(1);
const avgLifespan = (STATS.totalYearsLived / STATS.totalLivesSimulated).toFixed(1);

const checks = [
  {
    name: 'Ghost NPC Event Violations',
    count: STATS.ghostNpcViolations,
    pass: 'Không có bạn đời/sư phụ/bạn bè đã khuất nào xuất hiện như còn sống.',
    fail: 'Có sự kiện nhắc tới người đã khuất như thể còn sống.'
  },
  {
    name: 'Distortion Doing Human Fixer Events',
    count: STATS.distortionFixerContractViolations,
    pass: 'Thực thể biến dị bị cô lập khỏi hợp đồng Fixer và đời sống con người.',
    fail: 'Một Distortion vẫn nhận sự kiện hoặc hợp đồng của Fixer.'
  },
  {
    name: 'Fixer Grade Skipping Violations',
    count: STATS.fixerGradeSkipViolations,
    pass: 'Fixer thăng tiến từng bậc một qua sát hạch Hana, trừ một lần nhảy hai bậc có E.G.O.',
    fail: 'Có Fixer nhảy qua một Grade.'
  },
  {
    name: 'Biological Child without Offspring Violations',
    count: STATS.biologicalChildWithoutOffspringViolations,
    pass: 'Phân biệt đúng con ruột, đệ tử và kẻ nhặt tàn dư Backstreets.',
    fail: 'Người kế thừa được ghi là con ruột dù không có con.'
  },
  {
    name: 'Career Checklist vs Exam Gate Mismatches',
    count: STATS.milestoneGateMismatches,
    pass: 'Danh sách điều kiện hiển thị cho người chơi khớp với cổng mở kỳ sát hạch.',
    fail: 'Danh sách điều kiện hiển thị lệch với cổng mở kỳ sát hạch.'
  }
];
const failedChecks = checks.filter((c) => c.count > 0);
const checkBlock = checks
  .map((c, i) => `[CHECK ${i + 1}] ${c.name}:
  > Kết quả: ${c.count} LỖI / ${STATS.totalScenariosExecuted.toLocaleString()} khoảnh khắc (${c.count === 0 ? 'ĐẠT' : 'KHÔNG ĐẠT'})
  > Đánh giá: ${c.count === 0 ? c.pass : c.fail}`)
  .join('\n\n');
const conclusion = failedChecks.length === 0
  ? `>>> KẾT LUẬN: ĐẠT CẢ ${checks.length} NHÓM KIỂM TRA TRÊN ${STATS.totalScenariosExecuted.toLocaleString()} KHOẢNH KHẮC <<<`
  : `>>> KẾT LUẬN: KHÔNG ĐẠT ${failedChecks.length}/${checks.length} NHÓM: ${failedChecks.map((c) => c.name).join('; ')} <<<`;

const report = `================================================================================
          BÁO CÁO KIỂM ĐỊNH TOÀN VẸN ${STATS.totalScenariosExecuted.toLocaleString()} KHOẢNH KHẮC
                     PROJECT MOON LIFE SIMULATOR ENGINE
================================================================================
Thời gian kiểm thử: ${new Date().toLocaleString('vi-VN')}
Thời lượng thực thi: ${totalDurationSec} giây
Một "kịch bản" ở đây là một khoảnh khắc trong kế hoạch năm (kể cả dòng thường ngày),
chạy trực tiếp qua engine, không qua giao diện, store hay backend.
Tổng số khoảnh khắc đã xử lý: ${STATS.totalScenariosExecuted.toLocaleString()}
Số sinh mệnh đã bắt đầu mô phỏng: ${STATS.totalLivesSimulated.toLocaleString()}
Số năm mô phỏng trung bình mỗi sinh mệnh: ${avgLifespan} (Tuổi cao nhất đã đạt: ${STATS.maxAge})

--------------------------------------------------------------------------------
1. NGHỀ NGHIỆP TẠI THỜI ĐIỂM DỪNG MÔ PHỎNG (CAREER DISTRIBUTION):
${Object.entries(STATS.careers).map(([k, v]) => `  - ${k}: ${v.toLocaleString()} người (${((v / STATS.totalLivesSimulated) * 100).toFixed(2)}%)`).join('\n')}

2. PHÂN TẦNG ĐẲNG CẤP FIXER ĐẠT ĐƯỢC (TUÂN THỦ TUẦN TỰ SÁT HẠCH HANA):
  - Fixer Grade 9: ${STATS.fixerGradesReached.g9.toLocaleString()} người
  - Fixer Grade 8: ${STATS.fixerGradesReached.g8.toLocaleString()} người
  - Fixer Grade 7: ${STATS.fixerGradesReached.g7.toLocaleString()} người
  - Fixer Grade 6: ${STATS.fixerGradesReached.g6.toLocaleString()} người
  - Fixer Grade 5 (Office Eligible): ${STATS.fixerGradesReached.g5.toLocaleString()} người
  - Fixer Grade 4: ${STATS.fixerGradesReached.g4.toLocaleString()} người
  - Fixer Grade 3: ${STATS.fixerGradesReached.g3.toLocaleString()} người
  - Fixer Grade 2: ${STATS.fixerGradesReached.g2.toLocaleString()} người
  - Fixer Grade 1: ${STATS.fixerGradesReached.g1.toLocaleString()} người
  - Color Fixer Huyền Thoại: ${STATS.fixerGradesReached.color.toLocaleString()} người
  - Năm đậu từ 2 kỳ thăng cấp trở lên (vẫn từng bước một): ${STATS.multiGradeYears.toLocaleString()}

3. CƠ CHẾ SIÊU NHIÊN & KINH TẾ WORKSHOP:
  - Thức tỉnh E.G.O Huyền Thoại: ${STATS.egoAwakenedCount.toLocaleString()} người
  - Biến dị sa ngã (Distortion): ${STATS.distortionsCount.toLocaleString()} thực thể
  - Lựa chọn sự kiện có phí Ahn: ${STATS.itemsBought.toLocaleString()} lượt

--------------------------------------------------------------------------------
4. KIỂM ĐỊNH ${checks.length} NHÓM QUY TẮC TOÀN VẸN LOGIC CỐT LÕI (INTEGRITY AUDIT):
--------------------------------------------------------------------------------
${checkBlock}

================================================================================
${conclusion}
================================================================================
`;

console.log(report);
if (TARGET_SCENARIOS >= FULL_RUN) {
  fs.writeFileSync('BAO_CAO_KIEM_THU_1_TRIEU_KICH_BAN.txt', report, 'utf8');
  console.log('Đã lưu báo cáo ra tệp: BAO_CAO_KIEM_THU_1_TRIEU_KICH_BAN.txt');
} else {
  console.log('Lượt chạy rút gọn: không ghi đè tệp báo cáo.');
}
process.exitCode = failedChecks.length === 0 ? 0 : 1;
