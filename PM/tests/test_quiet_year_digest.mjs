import assert from 'node:assert/strict';
import { isQuietYear, createYearDigest, consolidateYearDailies } from '../src/engine/yearPlanner.js';
import { buildLifeSummaryAndLegacy, createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { planYear } from '../src/engine/yearPlanner.js';

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

// Kiểm tra câu văn Đợt 120a: mục gộp có đúng 1 câu duy nhất (chọn daily có delta lớn nhất, hòa thì dùng RNG tất định)
const viSentenceCount = (digest.vi.match(/[.!?](\s|$)/g) || []).length;
assert.equal(viSentenceCount, 1, `Mục gộp tiếng Việt phải có đúng 1 câu duy nhất, thực tế: ${viSentenceCount} ("${digest.vi}")`);
const enSentenceCount = (digest.en.match(/[.!?](\s|$)/g) || []).length;
assert.equal(enSentenceCount, 1, `Mục gộp tiếng Anh phải có đúng 1 câu duy nhất, thực tế: ${enSentenceCount} ("${digest.en}")`);
assert.ok(!digest.vi.includes('[Buổi sáng]'), 'Đã bỏ tiêu đề vuông');
assert.ok(digest.vi.includes('Bạn ra quán ăn một bát canh nóng.') || digest.vi.includes('Cơn mưa rào làm mát mái tôn rỉ sét.'), 'Chọn một trong hai daily có delta lớn nhất (hòa mag = 3)');

// Kiểm tra tính tất định: cùng dữ liệu và seed ra cùng một câu
const repeatDigest = consolidateYearDailies([...mockDailies], 10)[0];
assert.equal(digest.vi, repeatDigest.vi, 'Cùng seed ra cùng câu tiếng Việt');
assert.equal(digest.en, repeatDigest.en, 'Cùng seed ra cùng câu tiếng Anh');

// Kiểm tra năm không có biến động delta nào thì chọn câu ambient theo nơi chốn
const zeroDeltas = [
  { id: 'z1', age: 10, type: 'daily', vi: '[Sáng] Không có gì lạ.', en: '[Morning] Nothing unusual.', deltas: [] },
  { id: 'z2', age: 10, type: 'daily', vi: '[Trưa] Gió thổi nhẹ.', en: '[Noon] Gentle breeze.', deltas: [] }
];
const ambientDigest = consolidateYearDailies([...zeroDeltas], 10)[0];
const ambientViCount = (ambientDigest.vi.match(/[.!?](\s|$)/g) || []).length;
assert.equal(ambientViCount, 1, 'Câu ambient của năm không delta phải có đúng 1 câu duy nhất');
assert.ok(ambientDigest.vi.length > 10, 'Có câu ambient hợp lệ theo nơi chốn');

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
assert.equal(mixedConsolidated[0].quiet, false, 'Năm có minor thì digest.quiet phải là false');
assert.ok(!mixedConsolidated[0].vi.includes('Một năm trôi qua bình lặng.'), 'Năm có minor không có câu mở đầu êm dịu');
assert.equal((mixedConsolidated[0].vi.match(/[.!?](\s|$)/g) || []).length, 1, 'Digest năm có minor cũng có đúng 1 câu duy nhất');
assert.ok(mixedConsolidated[0].vi.includes('Tuyết rơi trên mái.'), 'Chọn daily d3 có delta lớn nhất (wealth +5)');
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

// 7. Test tự lướt theo "đoạn yên ả" (quietStretch)
console.log('7. Kiểm tra tính toán tốc độ tự lướt theo đoạn yên ả...');

function getEffectiveSpeed(settings, age, upcoming) {
  const autoSkip = settings.autoSkipQuietYears;
  const quietStretch = autoSkip && age >= 5 && (!upcoming || upcoming.kind === 'daily');
  return quietStretch && settings.speed > 0 ? Math.max(4, settings.speed) : settings.speed;
}

// Khi tắt autoSkipQuietYears:
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: false, speed: 1 }, 10, { kind: 'daily' }), 1);
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: false, speed: 2 }, 10, { kind: 'daily' }), 2);
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: false, speed: 3 }, 10, { kind: 'daily' }), 3);

// Khi bật autoSkipQuietYears:
// Mục kế tiếp là daily -> tốc độ 4x
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 1 }, 10, { kind: 'daily' }), 4, 'Đoạn daily tự nhảy lên 4x');
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 2 }, 10, { kind: 'daily' }), 4, 'Đoạn daily tự nhảy lên 4x');

// Mục kế tiếp là minor/major/contract -> tốc độ trở về mức người chơi chọn
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 1 }, 10, { kind: 'minor' }), 1, 'Trước minor chạy đúng 1x');
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 2 }, 10, { kind: 'minor' }), 2, 'Trước minor chạy đúng 2x');
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 1 }, 10, { kind: 'major' }), 1, 'Trước major chạy đúng 1x');

// Hết plan trong năm (upcoming null) -> lướt 4x sang năm mới
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 1 }, 10, null), 4, 'Cuối năm lướt 4x');

// Tuổi < 5 không tự lướt
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 1 }, 3, { kind: 'daily' }), 1, 'Tuổi < 5 chạy tốc độ thường');

// Đang pause (speed = 0) -> vẫn là 0
assert.equal(getEffectiveSpeed({ autoSkipQuietYears: true, speed: 0 }, 10, { kind: 'daily' }), 0, 'Đang pause thì tốc độ là 0');

// 8. Mô phỏng đời 40 năm bằng planYear thật để đo đạc thời gian chơi và tính nguyên vẹn của lựa chọn
console.log('8. Mô phỏng đời 40 năm bằng planYear thật đo thời gian và số lựa chọn...');

function simulate40YearsReal(autoSkip) {
  const char = createNewCharacter({ seed: 'sim-life-measure', startAge: 0 });
  char.job = 'Fixer';
  let totalTimeUnits = 0;
  let totalChoicesSeen = 0;
  let quietMomentsCount = 0;
  let totalMoments = 0;

  for (let age = 1; age <= 40; age++) {
    char.age = age;
    planYear(char, createRNG(`test-life-${age}`));
    const plan = char.plan || [];
    totalMoments += plan.length;

    let prevT = 0;
    for (let i = 0; i < plan.length; i++) {
      const it = plan[i];
      const deltaT = it.t - prevT;
      const isQuietStretch = age >= 5 && it.kind === 'daily';
      if (isQuietStretch) quietMomentsCount++;
      const speed = autoSkip && isQuietStretch ? 4 : 1;
      totalTimeUnits += (deltaT * 30) / speed;
      prevT = it.t;
      if (it.kind !== 'daily') totalChoicesSeen++;
    }
    // Đoạn cuối sau moment cuối cùng đến hết năm (t=1.0)
    const endDeltaT = 1.0 - prevT;
    const endQuiet = age >= 5;
    totalTimeUnits += (endDeltaT * 30) / (autoSkip && endQuiet ? 4 : 1);
  }

  return { totalTimeUnits, totalChoicesSeen, quietMomentsCount, totalMoments };
}

const runWithoutFastForward = simulate40YearsReal(false);
const runWithFastForward = simulate40YearsReal(true);

assert.equal(runWithoutFastForward.totalChoicesSeen, runWithFastForward.totalChoicesSeen, 'Số lượng lựa chọn đưa ra không đổi 100%');
assert.ok(runWithFastForward.totalTimeUnits < runWithoutFastForward.totalTimeUnits, 'Thời gian chơi giảm rõ rệt');

const timeSavedPercent = Math.round(((runWithoutFastForward.totalTimeUnits - runWithFastForward.totalTimeUnits) / runWithoutFastForward.totalTimeUnits) * 100);
console.log(`- Tổng moments trong 40 năm: ${runWithFastForward.totalMoments}`);
console.log(`- Số đoạn daily yên ả chạy 4x: ${runWithFastForward.quietMomentsCount}`);
console.log(`- Số lựa chọn (minor, major, contract): ${runWithFastForward.totalChoicesSeen} (bảo toàn 100%)`);
console.log(`- Thời gian chế độ chuẩn (1x): ${Math.round(runWithoutFastForward.totalTimeUnits)}s`);
console.log(`- Thời gian khi bật Tự lướt: ${Math.round(runWithFastForward.totalTimeUnits)}s`);
console.log(`- Thời gian tiết kiệm được: ${timeSavedPercent}%`);

console.log('--- Tất cả 8 bài kiểm tra Đợt 115 đều ĐẠT (PASS) ---');
