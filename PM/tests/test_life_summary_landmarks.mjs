import assert from 'node:assert/strict';
import { buildLifeSummaryAndLegacy } from '../src/engine/gameEngine.js';

console.log('--- RUNNING LIFE SUMMARY LANDMARKS TESTS (DOT 113a) ---');

// Helper to construct a base mock character
function createMockCharacter(age, logs) {
  return {
    name: 'Landmark Tester',
    gender: 'M',
    age,
    generation: 1,
    alive: false,
    job: 'Color Fixer',
    fixerGrade: 0,
    flags: ['ColorFixer'],
    stats: { health: 0, sanity: 50, wealth: 200, rep: 80, network: 50 },
    scars: [],
    logs
  };
}

// 1. Dựng một đời 60 tuổi có 14 mốc, trong đó Color ở tuổi 52. Color phải nằm trong 8 mốc.
{
  const logs = [
    { age: 18, type: 'major', id: 'ad_career_fixer_18', vi: '[Vào nghề Fixer] Bạn bước vào nghề với giấy phép Grade 9.', en: '[Became a Fixer] You began your career with a Grade 9 license.' },
    { age: 21, type: 'danger', id: 'danger_skirmish_21', vi: '[Giao tranh ngõ hẻm] Sống sót sau trận phục kích.', en: '[Alley Skirmish] Survived an ambush.' },
    { age: 24, type: 'promo', promote: 'Grade 8', id: 'promo_g8_24', vi: '[Fixer Grade 8] Hana thăng cấp sau hợp đồng xuất sắc.', en: '[Fixer Grade 8] Promoted by Hana after an exceptional contract.' },
    { age: 27, type: 'danger', id: 'danger_syndicate_27', vi: '[Huyết chiến Syndicate] Sống sót qua đợt thanh trừng.', en: '[Syndicate Bloodshed] Survived a purge.' },
    { age: 30, type: 'promo', promote: 'Grade 7', id: 'promo_g7_30', vi: '[Fixer Grade 7] Thăng cấp sau năm tháng cống hiến.', en: '[Fixer Grade 7] Promoted after years of service.' },
    { age: 33, type: 'danger', id: 'danger_warden_33', vi: '[Chạm trán Quái vật] Sống sót sau trận đụng độ dị thể.', en: '[Abnormality Encounter] Survived an anomaly encounter.' },
    { age: 36, type: 'promo', promote: 'Grade 5', id: 'promo_g5_36', vi: '[Fixer Grade 5] Đủ điều kiện mở văn phòng riêng.', en: '[Fixer Grade 5] Eligible to establish an independent office.' },
    { age: 40, type: 'danger', id: 'danger_smoke_40', vi: '[Cơn ác mộng khói đen] Thoát chết khỏi khu xưởng sập.', en: '[Black Smoke Nightmare] Narrowly escaped a collapsing workshop.' },
    { age: 44, type: 'promo', promote: 'Grade 3', id: 'promo_g3_44', vi: '[Fixer Grade 3] Trở thành trụ cột của hiệp hội.', en: '[Fixer Grade 3] Became a cornerstone of the association.' },
    { age: 48, type: 'promo', promote: 'Grade 1', id: 'promo_g1_48', vi: '[Fixer Grade 1] Đỉnh cao danh vọng của một Fixer.', en: '[Fixer Grade 1] The pinnacle of a Fixer’s career.' },
    { age: 50, type: 'danger', id: 'danger_anomaly_50', vi: '[Ranh giới sinh tử] Vượt qua cuộc thanh trừng quy mô lớn.', en: '[Brink of Life and Death] Overcame a massive purge.' },
    { age: 52, type: 'major', id: 'hana_color_ascension_trial', vi: '[Color Fixer] Hana trao tặng danh hiệu Color huyền thoại.', en: '[Color Fixer] Hana awarded the legendary Color title.' },
    { age: 56, type: 'danger', id: 'danger_star_56', vi: '[Ngôi sao The City] Trực diện đối đầu thảm họa đô thị.', en: '[Star of the City] Directly confronted an urban star disaster.' },
    { age: 60, type: 'death', id: 'log_death_60', vi: '[Nhắm mắt xuôi tay] Khép lại cuộc đời dài đầy bão táp.', en: '[Breathed Last] Closed a long and stormy life.' }
  ];

  const char = createMockCharacter(60, logs);
  const summary = buildLifeSummaryAndLegacy(char);
  const tps = summary.turningPoints;

  assert.equal(tps.length, 8, `Expected exactly 8 turning points, got ${tps.length}`);

  // Color ở tuổi 52 phải nằm trong 8 mốc
  const hasColor = tps.some(tp => tp.age === 52 && /Color/i.test(tp.titleVi || tp.summaryVi));
  assert.ok(hasColor, 'Color Fixer milestone at age 52 must be present in turningPoints');

  // Mốc cuối cùng của đời (tuổi 60) luôn có mặt
  const hasDeath = tps.some(tp => tp.age === 60);
  assert.ok(hasDeath, 'Final landmark of life (age 60) must be present in turningPoints');
  assert.equal(tps[tps.length - 1].age, 60, 'Final landmark must be at the end of turningPoints');

  // 8 mốc trả về vẫn theo thứ tự tuổi tăng dần
  for (let i = 1; i < tps.length; i++) {
    assert.ok(tps[i].age >= tps[i - 1].age, `Turning points must be ordered by age: ${tps[i - 1].age} <= ${tps[i].age}`);
  }

  console.log('✓ 14-milestone life test passed: Color at 52 and Death at 60 preserved in sorted 8 points.');
}

// 2. Đời ngắn (ít hơn 8 mốc) giữ đúng danh sách cũ
{
  const logsShort = [
    { age: 18, type: 'major', id: 'ad_career_18', vi: '[Vào nghề] Bắt đầu làm việc.', en: '[Career] Started working.' },
    { age: 20, type: 'major', id: 'danger_20', vi: '[Nguy hiểm] Thoát chết.', en: '[Danger] Escaped.' },
    { age: 22, type: 'promo', promote: 'Grade 8', id: 'promo_22', vi: '[Fixer Grade 8] Lên bậc.', en: '[Fixer Grade 8] Promoted.' },
    { age: 25, type: 'death', id: 'log_death_25', vi: '[Chết trẻ] Ngã xuống ở Backstreets.', en: '[Died Young] Fallen in Backstreets.' }
  ];

  const charShort = createMockCharacter(25, logsShort);
  const summaryShort = buildLifeSummaryAndLegacy(charShort);
  const tpsShort = summaryShort.turningPoints;

  assert.equal(tpsShort.length, 4, `Short life should keep all 4 landmarks, got ${tpsShort.length}`);
  assert.equal(tpsShort[0].age, 18);
  assert.equal(tpsShort[1].age, 20);
  assert.equal(tpsShort[2].age, 22);
  assert.equal(tpsShort[3].age, 25);

  console.log('✓ Short life (< 8 milestones) preserved original list without truncation.');
}

// 3. Giữ luật tối đa 2 mốc mỗi tuổi khi có quá nhiều mốc ở một tuổi
{
  const logsClustered = [
    { age: 18, type: 'major', id: 'c1', vi: '[Mốc 18a] Sự kiện 1.', en: '[Milestone 18a] Event 1.' },
    { age: 18, type: 'major', id: 'c2', vi: '[Mốc 18b] Sự kiện 2.', en: '[Milestone 18b] Event 2.' },
    { age: 18, type: 'major', id: 'c3', vi: '[Mốc 18c] Sự kiện 3.', en: '[Milestone 18c] Event 3.' },
    { age: 25, type: 'major', id: 'c4', vi: '[Mốc 25] Sự kiện 4.', en: '[Milestone 25] Event 4.' },
    { age: 30, type: 'promo', promote: 'Grade 5', id: 'c5', vi: '[Mốc 30] Thăng cấp Grade 5.', en: '[Milestone 30] Promo.' },
    { age: 35, type: 'major', id: 'c6', vi: '[Mốc 35] Sự kiện 6.', en: '[Milestone 35] Event 6.' },
    { age: 40, type: 'major', id: 'c7', vi: '[Mốc 40] Sự kiện 7.', en: '[Milestone 40] Event 7.' },
    { age: 45, type: 'major', id: 'c8', vi: '[Mốc 45] Sự kiện 8.', en: '[Milestone 45] Event 8.' },
    { age: 50, type: 'major', id: 'c9', vi: '[Mốc 50] Sự kiện 9.', en: '[Milestone 50] Event 9.' },
    { age: 55, type: 'death', id: 'log_death_55', vi: '[Mốc 55] Cái chết.', en: '[Milestone 55] Death.' }
  ];

  const charCluster = createMockCharacter(55, logsClustered);
  const summaryCluster = buildLifeSummaryAndLegacy(charCluster);
  const tpsCluster = summaryCluster.turningPoints;

  const countAt18 = tpsCluster.filter(tp => tp.age === 18).length;
  assert.ok(countAt18 <= 2, `Age 18 should have at most 2 landmarks, got ${countAt18}`);
  assert.equal(tpsCluster[tpsCluster.length - 1].age, 55, 'Death at 55 must be preserved');

  console.log('✓ Max 2 milestones per age constraint verified.');
}

// 4. Chống bắt nhầm bằng regex chuỗi (Structured data verification)
{
  // Đời 60 tuổi với mốc Color thật ở tuổi 52 có kèm thẻ chapter 'color'
  // Và các mốc thường ở tuổi khác chứa các từ nhạy cảm ("Một Color Fixer đi ngang qua...", "Tin đồn E.G.O", "Fixer Grade 6 chặn bạn", "mất ví trên con đường")
  const logsWithFlavors = [
    { age: 18, type: 'chapter', kind: 'job', vi: 'Fixer. Bạn bước vào nghề.', en: 'Fixer. You take up the trade.' },
    { age: 18, type: 'major', id: 'ad_career_fixer_18', vi: '[Vào nghề Fixer] Nhận giấy phép Grade 9.', en: '[Became a Fixer] Grade 9 license.' },
    { age: 24, type: 'promo', promote: 'Grade 8', id: 'promo_g8_24', vi: '[Fixer Grade 8] Hana thăng cấp.', en: '[Fixer Grade 8] Promoted.' },
    { age: 30, type: 'promo', promote: 'Grade 7', id: 'promo_g7_30', vi: '[Fixer Grade 7] Thăng cấp sau cống hiến.', en: '[Fixer Grade 7] Promoted.' },
    { age: 36, type: 'promo', promote: 'Grade 5', id: 'promo_g5_36', vi: '[Fixer Grade 5] Đủ điều kiện mở văn phòng.', en: '[Fixer Grade 5] Office eligible.' },
    { age: 38, type: 'major', id: 'lost_wallet_38', vi: '[Đánh rơi] Bạn mất đi chiếc ví trên con đường về nhà.', en: '[Lost] You lost your wallet on the way home.' },
    { age: 44, type: 'promo', promote: 'Grade 3', id: 'promo_g3_44', vi: '[Fixer Grade 3] Trụ cột hiệp hội.', en: '[Fixer Grade 3] Pillar.' },
    { age: 46, type: 'major', id: 'thug_g6_46', vi: '[Hẻm tối] Một tên Fixer Grade 6 chặn bạn trong hẻm.', en: '[Alley] A Fixer Grade 6 thug blocked you.' },
    { age: 48, type: 'promo', promote: 'Grade 1', id: 'promo_g1_48', vi: '[Fixer Grade 1] Đỉnh cao sự nghiệp.', en: '[Fixer Grade 1] Apex.' },
    { age: 52, type: 'chapter', kind: 'color', vi: 'Color Fixer. Hana đã đọc tên bạn.', en: 'Color Fixer. Hana has read your name.' },
    { age: 52, type: 'major', id: 'hana_color_ascension_trial', vi: '[Color Fixer] Hana trao tặng danh hiệu Color huyền thoại.', en: '[Color Fixer] Awarded Color.' },
    { age: 54, type: 'major', id: 'rumor_ego_54', vi: '[Tin đồn] Tin đồn về E.G.O lan khắp Backstreets.', en: '[Rumor] Rumors about E.G.O spread.' },
    { age: 58, type: 'major', id: 'color_passerby_58', vi: '[Gặp gỡ] Một Color Fixer đi ngang qua quán ăn.', en: '[Encounter] A Color Fixer walked past the diner.' },
    { age: 60, type: 'death', id: 'log_death_60', vi: '[Nhắm mắt] Khép lại cuộc đời.', en: '[End] Closed eyes.' }
  ];

  const charFlavor = createMockCharacter(60, logsWithFlavors);
  const summaryFlavor = buildLifeSummaryAndLegacy(charFlavor);
  const tpsFlavor = summaryFlavor.turningPoints;

  assert.equal(tpsFlavor.length, 8, `Expected exactly 8 turning points, got ${tpsFlavor.length}`);

  // Mốc Color thật ở tuổi 52 phải nằm trong 8 mốc
  const hasRealColor = tpsFlavor.some(tp => tp.age === 52);
  assert.ok(hasRealColor, 'Real Color Fixer at age 52 must be kept in turningPoints');

  // Mốc thường ở tuổi 58 ("Một Color Fixer đi ngang qua quán ăn") PHẢI BỊ LOẠI
  const hasFakeColor = tpsFlavor.some(tp => tp.age === 58);
  assert.ok(!hasFakeColor, 'Passerby mention of Color Fixer at age 58 must be filtered out as low-priority (not a milestone)');

  // Các mốc thường gây nhiễu chữ (38 ví rơi, 46 côn đồ grade 6, 54 tin đồn ego) cũng phải bị loại
  assert.ok(!tpsFlavor.some(tp => tp.age === 38), 'False-positive wallet loss at 38 must be excluded');
  assert.ok(!tpsFlavor.some(tp => tp.age === 46), 'False-positive thug mention at 46 must be excluded');
  assert.ok(!tpsFlavor.some(tp => tp.age === 54), 'False-positive rumor at 54 must be excluded');

  // Mốc cái chết ở tuổi 60 luôn được giữ
  assert.equal(tpsFlavor[tpsFlavor.length - 1].age, 60, 'Final death milestone must be preserved');

  console.log('✓ False-positive prevention verified: flavor text mentions of Color/EGO/Grade/NPC are never misclassified.');
}

// 5. Thẻ chương cũ không có trường `kind` (Legacy save backward compatibility)
{
  const logsLegacy = [
    { age: 18, type: 'chapter', titleEn: 'The Thumb', vi: 'The Thumb.', en: 'The Thumb.' },
    { age: 18, type: 'major', id: 'syn_join_18', vi: '[Gia nhập The Thumb] Trở thành thành viên Thumb.', en: '[Joined The Thumb] Joined.' },
    { age: 25, type: 'chapter', titleEn: 'Capo', vi: 'Capo.', en: 'Capo.' }, // Không có `kind`, phải nhận diện là 'rank' (500đ)
    { age: 25, type: 'major', id: 'thumb_capo_25', vi: '[Thăng chức Capo] Lãnh đạo một phân nhánh.', en: '[Promoted Capo] Led a branch.' },
    { age: 30, type: 'danger', id: 'danger_30', vi: '[Thanh trừng] Sống sót.', en: '[Purge] Survived.' },
    { age: 35, type: 'death', id: 'log_death_35', vi: '[Kết thúc] Ngã xuống.', en: '[End] Fallen.' }
  ];

  const charLegacy = createMockCharacter(35, logsLegacy);
  const summaryLegacy = buildLifeSummaryAndLegacy(charLegacy);
  const tpsLegacy = summaryLegacy.turningPoints;

  // Capo ở tuổi 25 phải có mặt trong turning points
  assert.ok(tpsLegacy.some(tp => tp.age === 25), 'Legacy chapter without kind { titleEn: "Capo" } must be classified as rank and kept');

  console.log('✓ Legacy chapter fallback verified: titles like "Capo" without kind are correctly recognized as rank.');
}

console.log('=== ALL LIFE SUMMARY LANDMARKS TESTS PASSED (100%) ===');
