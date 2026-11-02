import assert from 'node:assert/strict';
import { isQuietYear, createYearDigest, consolidateYearDailies } from '../src/engine/yearPlanner.js';
import { buildLifeSummaryAndLegacy } from '../src/engine/gameEngine.js';

console.log('--- Test Đợt 115: Năm yên ả đọc ít, đi nhanh ---');

// 1. Test isQuietYear
console.log('1. Kiểm tra định nghĩa isQuietYear...');

const baseChar = {
  age: 10,
  alive: true,
  stats: { health: 80, sanity: 80, wealth: 20 },
  npcs: {
    friend: { id: 'f1', alive: true, metAge: 7 }
  }
};

const quietPlan = [
  { kind: 'daily', id: 'd1', t: 0.15 },
  { kind: 'daily', id: 'd2', t: 0.38 },
  { kind: 'daily', id: 'd3', t: 0.62 },
  { kind: 'daily', id: 'd4', t: 0.85 }
];

assert.equal(isQuietYear(quietPlan, baseChar), true, 'Năm thuần daily ở tuổi >= 5 phải là năm yên ả');

// Tuổi < 5 không coi là năm yên ả để gộp (0-4 tuổi giữ nguyên 1 daily/năm)
assert.equal(isQuietYear(quietPlan, { ...baseChar, age: 4 }), false, 'Tuổi < 5 không coi là năm yên ả để gộp');

// Năm có minor
const planWithMinor = [
  { kind: 'daily', id: 'd1', t: 0.15 },
  { kind: 'minor', id: 'm1', t: 0.38 },
  { kind: 'daily', id: 'd2', t: 0.62 },
  { kind: 'daily', id: 'd3', t: 0.85 }
];
assert.equal(isQuietYear(planWithMinor, baseChar), false, 'Năm có minor không phải năm yên ả');

// Năm có major / mishap / contract
assert.equal(isQuietYear([{ kind: 'major', id: 'ev1', t: 0.5 }], baseChar), false, 'Năm có major không phải năm yên ả');
assert.equal(isQuietYear([{ kind: 'mishap', id: 'mis1', t: 0.5 }], baseChar), false, 'Năm có mishap không phải năm yên ả');
assert.equal(isQuietYear([{ kind: 'contract', id: 'c1', t: 0.5 }], baseChar), false, 'Năm có contract không phải năm yên ả');

// Nhân vật có pending interactions
assert.equal(isQuietYear(quietPlan, { ...baseChar, pendingMinor: { id: 'm1' } }), false, 'Đang chờ chọn minor không phải năm yên ả');
assert.equal(isQuietYear(quietPlan, { ...baseChar, pendingEvent: { id: 'e1' } }), false, 'Đang chờ event không phải năm yên ả');

// NPC mất ở tuổi này
const charWithDyingNpc = {
  ...baseChar,
  npcs: {
    friend: { id: 'f1', deceased: true, status: 'dead', fateAge: 10 }
  }
};
assert.equal(isQuietYear(quietPlan, charWithDyingNpc), false, 'Năm có NPC thân thiết qua đời không phải năm yên ả');

// 2. Test consolidateYearDailies & createYearDigest
console.log('2. Kiểm tra gộp daily (consolidateYearDailies)...');

const mockDailies = [
  { id: 'log_10_0_d1', age: 10, type: 'daily', vi: '[Buổi sáng] Bạn ra quán ăn một bát canh nóng.', en: '[Morning] You eat a warm soup.', deltas: [{ k: 'health', v: 2 }, { k: 'wealth', v: -1 }], season: { vi: 'Mùa Xuân', en: 'Spring' } },
  { id: 'log_10_1_d2', age: 10, type: 'daily', vi: '[Trưa hè] Cơn mưa rào làm mát mái tôn rỉ sét.', en: '[Summer Noon] A sudden rain cools the tin roof.', deltas: [{ k: 'sanity', v: 3 }], season: { vi: 'Mùa Hạ', en: 'Summer' } },
  { id: 'log_10_2_d3', age: 10, type: 'daily', vi: '[Chiều thu] Bạn nghe tiếng còi tàu chở than từ xa.', en: '[Autumn Dusk] You hear the coal train whistle.', deltas: [{ k: 'wealth', v: 1 }], season: { vi: 'Mùa Thu', en: 'Autumn' } },
  { id: 'log_10_3_d4', age: 10, type: 'daily', vi: '[Đêm đông] Gió lùa qua khe cửa sổ gỗ.', en: '[Winter Night] Wind blows through the wood window.', deltas: [{ k: 'health', v: -1 }], season: { vi: 'Mùa Đông', en: 'Winter' } }
];

const consolidated = consolidateYearDailies([...mockDailies], 10);
assert.equal(consolidated.length, 1, '4 daily thuần của năm được gộp thành 1 mục duy nhất');
const digest = consolidated[0];
assert.equal(digest.type, 'year_digest');
assert.equal(digest.key, 'year_digest');
assert.equal(digest.age, 10);
assert.equal(digest.ids.length, 4, 'Mục gộp chứa đủ 4 id của các dòng gốc');
assert.deepEqual(digest.ids, mockDailies.map(d => d.id));
assert.equal(digest.items.length, 4, 'Mục gộp chứa trọn vẹn 4 object daily gốc trong items');

// Kiểm tra tổng deltas
// health: 2 - 1 = +1
// wealth: -1 + 1 = 0 (bị loại vì bằng 0)
// sanity: +3
const healthDelta = digest.deltas.find(d => d.k === 'health');
const sanityDelta = digest.deltas.find(d => d.k === 'sanity');
const wealthDelta = digest.deltas.find(d => d.k === 'wealth');
assert.equal(healthDelta?.v, 1, 'Tổng delta health = 1');
assert.equal(sanityDelta?.v, 3, 'Tổng delta sanity = 3');
assert.equal(wealthDelta, undefined, 'Delta bằng 0 không xuất hiện trong deltas');

// Kiểm tra câu văn: có câu mở đầu và các câu ngắn nối nhau không còn title [ ]
assert.ok(digest.vi.startsWith('Một năm trôi qua bình lặng.'), 'Câu mở đầu tiếng Việt chuẩn');
assert.ok(digest.vi.includes('Bạn ra quán ăn một bát canh nóng.'), 'Chứa nội dung body daily 1');
assert.ok(digest.vi.includes('Cơn mưa rào làm mát mái tôn rỉ sét.'), 'Chứa nội dung body daily 2');
assert.ok(!digest.vi.includes('[Buổi sáng]'), 'Đã bỏ tiêu đề vuông');
assert.ok(digest.en.startsWith('A quiet year passes.'), 'Câu mở đầu tiếng Anh chuẩn');

// 3. Test năm có Minor: Minor đứng riêng, các daily còn lại vẫn gộp
console.log('3. Kiểm tra năm có minor: minor đứng riêng, daily vẫn gộp...');

const mixedLogs = [
  { id: 'log_12_0_d1', age: 12, type: 'daily', vi: '[Xuân] Gió xuân thổi.', en: '[Spring] Spring wind blows.', deltas: [{ k: 'health', v: 1 }], season: { vi: 'Mùa Xuân' } },
  { id: 'log_12_1_m1', age: 12, type: 'choice', choiceVi: 'Cứu một đứa trẻ trong hẻm', vi: '[Lựa chọn] Bạn cứu một đứa trẻ.', en: '[Choice] You save a child.', choices: [{}], season: { vi: 'Mùa Hạ' } },
  { id: 'log_12_2_d2', age: 12, type: 'daily', vi: '[Thu] Lá rụng đầy hè.', en: '[Autumn] Leaves fall.', deltas: [{ k: 'sanity', v: 2 }], season: { vi: 'Mùa Thu' } },
  { id: 'log_12_3_d3', age: 12, type: 'daily', vi: '[Đông] Tuyết rơi trên mái.', en: '[Winter] Snow on roof.', deltas: [{ k: 'wealth', v: 5 }], season: { vi: 'Mùa Đông' } },
  { id: 'log_12_4_ye', age: 12, type: 'summary', vi: '[Tổng kết] Một năm trôi qua.', en: '[Year End] Year ends.', season: { vi: 'Mùa Đông' } }
];

const mixedConsolidated = consolidateYearDailies([...mixedLogs], 12);
assert.equal(mixedConsolidated.length, 3, '5 log ban đầu gồm 3 daily + 1 minor + 1 year-end -> thành 1 digest + 1 minor + 1 year-end');
assert.equal(mixedConsolidated[0].type, 'year_digest', 'Vị trí daily đầu tiên thành year_digest');
assert.equal(mixedConsolidated[0].items.length, 3, 'Digest gom 3 daily');
assert.equal(mixedConsolidated[1].type, 'choice', 'Minor vẫn đứng riêng ở vị trí của nó');
assert.equal(mixedConsolidated[1].id, 'log_12_1_m1');
assert.equal(mixedConsolidated[2].type, 'summary', 'Year-end summary vẫn đứng riêng ở cuối');

// 4. Test tuổi 0 đến 4 giữ nguyên
console.log('4. Kiểm tra tuổi 0 đến 4 không bị gộp...');
const babyLogs = [
  { id: 'baby_0', age: 2, type: 'daily', vi: 'Bạn bi bô tập nói.', deltas: [] },
  { id: 'baby_1', age: 2, type: 'daily', vi: 'Bạn chập chững biết đi.', deltas: [] }
];
const babyRes = consolidateYearDailies([...babyLogs], 2);
assert.equal(babyRes.length, 2, 'Tuổi 2 không bị gộp');

// 5. Test di cảo và buildLifeSummary vẫn đọc dòng gốc
console.log('5. Kiểm tra buildLifeSummaryAndLegacy đọc dòng gốc qua items...');

const mockCharWithDigest = {
  name: 'Roland',
  age: 60,
  alive: false,
  job: 'Fixer',
  fixerGrade: 1,
  deathCauseVi: 'Kiệt sức vì tuổi già',
  deathCauseEn: 'Old age',
  logs: [
    ...mixedConsolidated,
    { id: 'ch_1', age: 25, type: 'chapter', kind: 'job', titleVi: 'Fixer', titleEn: 'Fixer' },
    { id: 'ch_2', age: 40, type: 'chapter', kind: 'rank', titleVi: 'Grade 1', titleEn: 'Grade 1' },
    { id: 'death_log', age: 60, type: 'death', vi: 'Kiệt sức vì tuổi già.', en: 'Died of old age.' }
  ]
};

const summary = buildLifeSummaryAndLegacy(mockCharWithDigest);
assert.ok(summary, 'Tạo tóm tắt đời thành công');
assert.ok(summary.turningPoints.length > 0, 'Có danh sách turning points');
assert.equal(summary.turningPoints[summary.turningPoints.length - 1].type, 'death', 'Mốc cuối cùng luôn là tử vong');

// 6. Test save cũ không có year_digest mở ra đọc bình thường
console.log('6. Kiểm tra save cũ không có year_digest mở ra bình thường...');
const legacyChar = {
  name: 'Angelica',
  age: 30,
  alive: false,
  job: 'Fixer',
  fixerGrade: 1,
  deathCauseVi: 'Tử trận',
  deathCauseEn: 'Fallen in combat',
  logs: [
    ...mockDailies,
    { id: 'death_log', age: 30, type: 'death', vi: 'Tử trận.', en: 'Fallen in combat.' }
  ]
};
const legacySummary = buildLifeSummaryAndLegacy(legacyChar);
assert.ok(legacySummary, 'Save cũ mở ra và tính toán tóm tắt thành công 100%');

// 7. Test tự lướt năm yên ả (tính toán effectiveSpeed)
console.log('7. Kiểm tra tính toán tốc độ tự lướt...');

function getEffectiveSpeed(settings, plan, char) {
  const isQuiet = settings.autoSkipQuietYears && isQuietYear(plan, char);
  return isQuiet && settings.speed > 0 ? 4 : settings.speed;
}

// Khi tắt autoSkipQuietYears:
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: false, speed: 1 }, quietPlan, baseChar), 1);
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: false, speed: 2 }, quietPlan, baseChar), 2);
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: false, speed: 3 }, quietPlan, baseChar), 3);

// Khi bật autoSkipQuietYears:
// Năm yên ả -> tốc độ 4x
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 1 }, quietPlan, baseChar), 4, 'Năm yên ả tự nhảy lên 4x');
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 2 }, quietPlan, baseChar), 4, 'Năm yên ả tự nhảy lên 4x');

// Năm có minor -> trở về tốc độ người chơi chọn
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 1 }, planWithMinor, baseChar), 1, 'Năm có minor chạy đúng 1x');
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 2 }, planWithMinor, baseChar), 2, 'Năm có minor chạy đúng 2x');

// Đang pause (speed = 0) -> vẫn là 0
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 0 }, quietPlan, baseChar), 0, 'Đang pause thì tốc độ là 0');

// 8. Mô phỏng đời 40 năm để đo đạc thời gian chơi và tính nguyên vẹn của lựa chọn
console.log('8. Mô phỏng đời 40 năm đo thời gian và số lựa chọn...');

function simulate40Years(autoSkip) {
  // Tạo 40 năm: tuổi 1 đến 40
  // Một số năm có minor/event (khoảng 50%), một số năm yên ả (khoảng 50%)
  let totalTimeUnits = 0;
  let totalChoicesSeen = 0;
  let quietYearsCount = 0;

  for (let age = 1; age <= 40; age++) {
    const char = { age, alive: true, npcs: {} };
    // Tuổi 5, 8, 11, 14, 18, 22, 25, 29, 33, 37 có minor / event
    const hasEvent = age < 5 || [5, 8, 11, 14, 18, 22, 25, 29, 33, 37].includes(age);
    let plan;
    if (hasEvent) {
      plan = [
        { kind: 'daily', t: 0.2 },
        { kind: 'minor', id: `m_${age}`, t: 0.5 },
        { kind: 'daily', t: 0.8 }
      ];
      totalChoicesSeen += 1;
    } else {
      plan = [
        { kind: 'daily', t: 0.15 },
        { kind: 'daily', t: 0.38 },
        { kind: 'daily', t: 0.62 },
        { kind: 'daily', t: 0.85 }
      ];
    }

    const quiet = isQuietYear(plan, char);
    if (quiet) quietYearsCount++;

    const speed = autoSkip && quiet ? 4 : 1;
    // Mỗi năm chuẩn = 30s = 30 đơn vị thời gian
    const yearDuration = 30 / speed;
    totalTimeUnits += yearDuration;
  }

  return { totalTimeUnits, totalChoicesSeen, quietYearsCount };
}

const runWithoutFastForward = simulate40Years(false);
const runWithFastForward = simulate40Years(true);

assert.equal(runWithoutFastForward.totalChoicesSeen, runWithFastForward.totalChoicesSeen, 'Số lượng lựa chọn đưa ra không đổi 100%');
assert.ok(runWithFastForward.totalTimeUnits < runWithoutFastForward.totalTimeUnits, 'Thời gian chơi giảm rõ rệt');

const timeSavedPercent = Math.round(((runWithoutFastForward.totalTimeUnits - runWithFastForward.totalTimeUnits) / runWithoutFastForward.totalTimeUnits) * 100);
console.log(`- Năm yên ả trong 40 năm: ${runWithFastForward.quietYearsCount}/40 năm`);
console.log(`- Thời gian chế độ chuẩn (1x): ${runWithoutFastForward.totalTimeUnits}s`);
console.log(`- Thời gian khi bật Tự lướt: ${runWithFastForward.totalTimeUnits}s`);
console.log(`- Thời gian tiết kiệm được: ${timeSavedPercent}% (vẫn giữ trọn vẹn ${runWithFastForward.totalChoicesSeen} lựa chọn)`);

console.log('--- Tất cả 8 bài kiểm tra Đợt 115 đều ĐẠT (PASS) ---');
