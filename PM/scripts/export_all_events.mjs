import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function exportAllEvents() {
  console.log('Loading event datasets...');
  const { ALL_STORY_EVENTS } = await import('../src/engine/gameEngine.js');
  const { LIFE_MINORS } = await import('../src/engine/yearPlanner.js');
  const { LIFE_DAILIES } = await import('../src/data/lifeDailies.js');

  const lines = [];
  const add = (str = '') => lines.push(str);
  const sep = '='.repeat(90);
  const subsep = '-'.repeat(90);

  add(sep);
  add('THE CITY CHRONICLES (PROJECT MOON) - TOÀN TẬP TẤT CẢ SỰ KIỆN TRONG GAME');
  add('XUẤT DỮ LIỆU ĐẦY ĐỦ: CỐT TRUYỆN, LỰA CHỌN, ĐIỀU KIỆN, CHI PHÍ VÀ KẾT QUẢ');
  add(`Thời gian xuất file: ${new Date().toLocaleString('vi-VN')}`);
  add(sep);
  add();

  // 1. Thống kê tổng quan
  add('==========================================================================================');
  add('I. TỔNG QUAN VÀ THỐNG KÊ DANH MỤC');
  add('==========================================================================================');
  add(`• TỔNG CỘNG TẤT CẢ SỰ KIỆN: ${ALL_STORY_EVENTS.length + LIFE_MINORS.length + LIFE_DAILIES.length} sự kiện`);
  add(`  1. Sự Kiện Lớn (Major Story Events): ${ALL_STORY_EVENTS.length} sự kiện`);
  add(`  2. Sự Kiện Nhỏ Có Lựa Chọn (Interactive Minor Choices): ${LIFE_MINORS.length} sự kiện`);
  add(`  3. Dòng Sự Kiện Thường Nhật Theo Tuổi (Daily Life Milestones): ${LIFE_DAILIES.length} sự kiện`);
  add();

  // Phân loại sự kiện lớn theo nhánh
  const getBranch = (e) => {
    const id = e.id || '';
    if (id.startsWith('fixer_') || id.startsWith('fx_') || id.startsWith('hana_')) return 'Fixer & Các Hiệp Hội (Hana, Zwei, Seven, Shi, Tres, Cinq, Oufi, Dieci, Molar, Devzat...)';
    if (id.startsWith('syn_') || id.startsWith('pinky_') || id.startsWith('kurokumo_') || id.startsWith('bl_')) return 'Syndicate & Năm Ngón Tay (The Thumb, Index, Middle, Ring, Pinky)';
    if (id.startsWith('wing_') || id.startsWith('tcorp_') || id.startsWith('wcorp_') || id.startsWith('smoke_') || id.startsWith('wonderlab_')) return 'Tập Đoàn Cánh (Wing Employees: K, T, W, R, U, N, L Corp...)';
    if (id.startsWith('ws_') || id.startsWith('workshop_') || id.startsWith('econ_atelier')) return 'Xưởng Rèn & Nghệ Nhân Cơ Khí (Workshop Craftsman & Ateliers)';
    if (id.startsWith('distort_') || id.startsWith('ego_carmen')) return 'Tiến Trình Biến Dị & Carmen (Distortion Path & Ego Awakening)';
    if (id.startsWith('econ_')) return 'Kinh Tế, Hồi Phục & Điểm Tiêu Ahn (HamHamPangPang, Spa J Corp, K Corp Tears...)';
    if (id.startsWith('ch_') || id.startsWith('leg_') || id.startsWith('ad_')) return 'Tuổi Thơ, Gia Tộc & Ngã Rẽ Trưởng Thành (Childhood & Career Crossroad)';
    if (id.startsWith('quest_')) return 'Nhiệm Vụ Đồng Đội & Người Thân (Companion Quests)';
    if (id.startsWith('mourn_') || id.startsWith('avenge_')) return 'Ký Ức Tang Tóc & Báo Thù (Bereavement & Retribution)';
    if (id.startsWith('dd_') || id.startsWith('bloodfiend_') || id.startsWith('sweeper_') || id.startsWith('canto_')) return 'Truyền Thuyết The City & Ngoại Ô (Distortion Detective, Bloodfiend, Sweeper, Outskirts)';
    return 'Dị Biến Siêu Nhiên & The Head (Supernatural Anomalies & Head Claws)';
  };

  const branchCounts = {};
  ALL_STORY_EVENTS.forEach(e => {
    const b = getBranch(e);
    branchCounts[b] = (branchCounts[b] || 0) + 1;
  });

  add('Phân bố 193 Sự Kiện Lớn theo nhánh:');
  Object.entries(branchCounts).forEach(([b, c], idx) => {
    add(`  ${idx + 1}. ${b}: ${c} sự kiện`);
  });
  add();

  // 2. Chi tiết Sự Kiện Lớn
  add(sep);
  add('II. CHI TIẾT 193 SỰ KIỆN LỚN (MAJOR STORY EVENTS)');
  add(sep);
  add();

  ALL_STORY_EVENTS.forEach((e, idx) => {
    const num = String(idx + 1).padStart(3, '0');
    add(subsep);
    add(`[SỰ KIỆN LỚN #${num}] ID: ${e.id}`);
    add(`• Nhánh: ${getBranch(e)}`);
    add(`• Độ tuổi hợp lệ: ${e.age ? `${e.age[0]} - ${e.age[1]} tuổi` : 'Mọi lứa tuổi'}`);
    if (e.jobs) add(`• Nghề nghiệp yêu cầu: ${JSON.stringify(e.jobs)}`);
    if (e.need) add(`• Điều kiện bổ sung (need): ${JSON.stringify(e.need)}`);
    if (e.requires && e.requires.length) add(`• Cờ yêu cầu (requires): ${JSON.stringify(e.requires)}`);
    if (e.forbids && e.forbids.length) add(`• Cờ cấm (forbids): ${JSON.stringify(e.forbids)}`);
    if (e.weight) add(`• Trọng số xuất hiện (Weight): ${e.weight}`);

    add();
    add(`[CỐT TRUYỆN - TIẾNG VIỆT]:`);
    add(e.vi || '(Không có nội dung tiếng Việt)');
    add();
    add(`[STORYLINE - ENGLISH]:`);
    add(e.en || '(No English description)');
    add();

    if (Array.isArray(e.choices) && e.choices.length > 0) {
      add('--- CÁC LỰA CHỌN TƯƠNG TÁC (CHOICES) ---');
      e.choices.forEach((c, cIdx) => {
        add(`  [Lựa chọn ${cIdx + 1}]`);
        add(`    - Tiêu đề (VI): ${c.labelVi || c.vi || ''}`);
        add(`    - Title (EN):   ${c.labelEn || c.en || ''}`);
        if (c.costAhn) add(`    - CHI PHÍ TIỀN AHN: Tốn ${c.costAhn} Ahn (Kiểm tra điều kiện tài sản)`);
        if (c.setFixerGrade != null) add(`    - THĂNG CẤP FIXER: Grade ${c.setFixerGrade}`);
        if (c.setFingerRank != null) add(`    - THĂNG HÀM SYNDICATE: Rank ${c.setFingerRank}`);
        if (c.setWingRank != null) add(`    - THĂNG HÀM WING: Rank ${c.setWingRank}`);
        if (c.setWorkshopRank != null) add(`    - THĂNG HÀM WORKSHOP: Rank ${c.setWorkshopRank}`);
        if (c.meritAdd) add(`    - CÔNG TRẠNG (Merit): +${c.meritAdd}`);

        const fx = c.effects || c.fx;
        if (fx && Object.keys(fx).length) {
          add(`    - Tác động chỉ số (Effects): ${JSON.stringify(fx)}`);
        }
        if (c.flagsAdd && c.flagsAdd.length) add(`    - Nhận cờ (Flags): ${JSON.stringify(c.flagsAdd)}`);
        if (c.scarsAdd && c.scarsAdd.length) add(`    - Khắc sẹo (Scars): ${JSON.stringify(c.scarsAdd)}`);
        if (c.itemAdd) add(`    - Nhận vật phẩm / trang bị: ${c.itemAdd}`);
        if (c.recordsAdd) add(`    - Ghi nhận lịch sử (Records): ${JSON.stringify(c.recordsAdd)}`);

        add(`    - Kết quả cốt truyện (VI):`);
        add(`      "${c.resultVi || c.rvi || ''}"`);
        add(`    - Story Outcome (EN):`);
        add(`      "${c.resultEn || c.ren || ''}"`);
        add();
      });
    }
    add();
  });

  // 3. Chi tiết Sự Kiện Nhỏ Có Lựa Chọn
  add(sep);
  add('III. CHI TIẾT 95 SỰ KIỆN NHỎ CÓ LỰA CHỌN (INTERACTIVE MINOR CHOICES)');
  add(sep);
  add();

  LIFE_MINORS.forEach((m, idx) => {
    const num = String(idx + 1).padStart(3, '0');
    add(subsep);
    add(`[SỰ KIỆN NHỎ #${num}] ID: ${m.id}`);
    add(`• Độ tuổi: ${m.age ? `${m.age[0]} - ${m.age[1]} tuổi` : 'Mọi lứa tuổi'}`);
    if (m.need) add(`• Điều kiện (need): ${JSON.stringify(m.need)}`);
    if (m.tags) add(`• Tags: ${JSON.stringify(m.tags)}`);

    add();
    add(`[TÌNH HUỐNG - TIẾNG VIỆT]: ${m.vi || ''}`);
    add(`[SITUATION - ENGLISH]:     ${m.en || ''}`);
    add();

    if (Array.isArray(m.choices) && m.choices.length > 0) {
      add('--- CÁC PHƯƠNG ÁN HÀNH ĐỘNG ---');
      m.choices.forEach((c, cIdx) => {
        add(`  <Phương án ${cIdx + 1}>`);
        add(`    - Quyết định (VI): ${c.vi || ''}`);
        add(`    - Action (EN):    ${c.en || ''}`);
        if (c.costAhn) add(`    - Chi phí: Tốn ${c.costAhn} Ahn`);
        const fx = c.fx || c.effects;
        if (fx && Object.keys(fx).length) add(`    - Hiệu ứng: ${JSON.stringify(fx)}`);
        if (c.bond) add(`    - Gắn kết NPC: ${JSON.stringify(c.bond)}`);
        if (c.motif) add(`    - Điểm tính cách (Motif): ${JSON.stringify(c.motif)}`);
        add(`    - Kết quả (VI): "${c.rvi || ''}"`);
        add(`    - Result (EN): "${c.ren || ''}"`);
      });
    }

    if (m.ignore) {
      add('  <Phương án bỏ qua (Bỏ mặc trôi qua)>');
      add(`    - Kết quả (VI): "${m.ignore.rvi || m.ignore.vi || ''}"`);
      add(`    - Result (EN): "${m.ignore.ren || m.ignore.en || ''}"`);
      if (m.ignore.fx && Object.keys(m.ignore.fx).length) add(`    - Hiệu ứng bỏ qua: ${JSON.stringify(m.ignore.fx)}`);
    }
    add();
  });

  // 4. Dòng Sự Kiện Thường Nhật Theo Tuổi
  add(sep);
  add('IV. CHI TIẾT 128 DÒNG SỰ KIỆN THƯỜNG NHẬT THEO TUỔI (DAILY LIFE MILESTONES)');
  add(sep);
  add();

  LIFE_DAILIES.forEach((d, idx) => {
    const num = String(idx + 1).padStart(3, '0');
    add(`[THƯỜNG NHẬT #${num}] ID: ${d.id} | Tuổi: ${d.age ? `${d.age[0]} - ${d.age[1]}` : 'Tất cả'} | ${d.need ? `Điều kiện: ${JSON.stringify(d.need)}` : ''}`);
    add(`• VI: ${d.vi || ''}`);
    add(`• EN: ${d.en || ''}`);
    if (d.fx && Object.keys(d.fx).length) add(`• Thay đổi chỉ số: ${JSON.stringify(d.fx)}`);
    add();
  });

  add(sep);
  add('HẾT FILE DỮ LIỆU TOÀN BỘ SỰ KIỆN THE CITY CHRONICLES');
  add(sep);

  const outputPath = path.join(rootDir, 'DANH_SACH_TAT_CA_EVENTS.txt');
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
  console.log(`Successfully exported ${lines.length} lines to: ${outputPath}`);
}

exportAllEvents().catch(err => {
  console.error('Error during export:', err);
  process.exit(1);
});
