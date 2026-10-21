import fs from 'fs';
import path from 'path';

import { CHILDHOOD_EVENTS, CONSEQUENCE_EVENTS } from './src/data/eventsChildhood.js';
import { FACTION_EVENTS } from './src/data/eventsFactions.js';
import { SUPERNATURAL_EVENTS, FIXER_REQUESTS } from './src/data/eventsSupernatural.js';
import { FIXER_PATH_EVENTS } from './src/data/eventsFixerPath.js';
import { DISTORTION_PATH_EVENTS } from './src/data/eventsDistortionPath.js';
import { WORKSHOP_ECONOMY_EVENTS } from './src/data/eventsWorkshopEconomy.js';
import { BEREAVEMENT_EVENTS } from './src/data/eventsBereavementMemories.js';
import { DERIVATIVE_LORE_EVENTS } from './src/data/eventsDerivativeLore.js';
import { COMPANION_QUEST_EVENTS } from './src/data/eventsCompanionQuests.js';
import { EXPANDED_DAILIES } from './src/data/narrative/dailies.js';
import { LIFE_MINORS } from './src/data/lifeMinors.js';
import { LIFE_MINORS_2 } from './src/data/lifeMinors2.js';
import { LIFE_MINORS_3, LIFE_DAILIES_3 } from './src/data/lifeMinors3.js';
import { LIFE_DAILIES } from './src/data/lifeDailies.js';
import { ITEMS_CATALOG } from './src/data/itemsData.js';
import { GLOSSARY_TERMS } from './src/data/glossary.js';
import { REGIONS, FAMILIES, ASSOCIATIONS, OFFICES, WORKSHOPS, FINGER_RANKS, THREAT_TIERS } from './src/data/worldData.js';

const sep1 = '='.repeat(80);
const sep2 = '-'.repeat(80);
const sep3 = '~'.repeat(80);

let lines = [];
function log(str = '') {
  lines.push(str);
}

log(sep1);
log('   BẢN GHI TOÀN BỘ KỊCH BẢN, SỰ KIỆN VÀ VĂN TRẢI NGHIỆM - THE CITY CHRONICLES');
log('            (PROJECT MOON CANONICAL NARRATIVE & SCRIPT DATABASE)');
log(sep1);
log(`Ngày xuất bản: ${new Date().toLocaleString('vi-VN')}`);
log('Phiên bản: 2.0 (Overhaul: Hệ thống Sát hạch Hana, Cách ly Distortion & Kinh tế Công xưởng)');
log('Định dạng: Toàn bộ Kịch bản chi tiết, Lựa chọn, Kết quả trần thuật và Hệ quả cơ chế');
log('\n' + sep1);
log('                                   MỤC LỤC');
log(sep1);
log('PHẦN I:    THIẾT LẬP THẾ GIỚI & GIA CẢNH KHỞI ĐẦU (WORLD DATA & ROOTS)');
log('PHẦN II:   LỘ TRÌNH THĂNG HẠNG FIXER CHUẨN HANA (FIXER PROMOTION PATH: GRADE 9 -> COLOR)');
log('PHẦN III:  TIẾN TRÌNH BIẾN DỊ (DISTORTION PATHWAY & CARMEN\'S WHISPERS)');
log('PHẦN IV:   BIẾN CỐ TUỔI THƠ & NGÃ RẼ TRƯỞNG THÀNH 18 TUỔI (CHILDHOOD & CAREER CROSSROADS)');
log('PHẦN V:    CHIẾN DỊCH PHE PHÁI, CÁNH & NĂM NGÓN TAY (FACTIONS: WINGS & FIVE FINGERS)');
log('PHẦN VI:   SIÊU NHIÊN, THỨC TỈNH E.G.O & CẤP ĐỘ NGUY HIỂM (SUPERNATURAL, LIGHT & E.G.O)');
log('PHẦN VII:  HỢP ĐỒNG & YÊU CẦU ỦY THÁC FIXER (TACTICAL COMMISSIONS & REQUESTS)');
log('PHẦN VIII: KÝ ỨC TANG THƯƠNG, BÁO THÙ & DI VẬT (BEREAVEMENT & VENGEANCE CAUSALITY)');
log('PHẦN IX:   KINH TẾ CÔNG XƯỞNG, CHỢ ĐEN & THỊ THỰC NEST (WORKSHOP DEPOT & ECONOMY)');
log('PHẦN X:    QUYẾT ĐỊNH TÌNH HUỐNG TỨC THỜI (LIFE MINORS - BỘ 1, 2, 3)');
log('PHẦN XI:   NHỊP SỐNG SINH HOẠT THƯỜNG NHẬT (LIFE DAILIES - BỘ 1, 2, 3)');
log('PHẦN XII:  HỆ QUẢ NHÂN QUẢ KÉO DÀI (CONSEQUENCE & KARMA THREADS)');
log('PHẦN XIII: TÁC PHẨM PHÁI SINH & GIAI THOẠI CỘNG ĐỒNG (DERIVATIVE & FAN-FAVORITE LORE)');
log('PHẦN XIV:  TỪ ĐIỂN THUẬT NGỮ CHUẨN NGUYÊN TÁC PROJECT MOON (CANONICAL GLOSSARY)');
log(sep1 + '\n\n');

function formatFx(fx) {
  if (!fx || Object.keys(fx).length === 0) return 'Không thay đổi chỉ số trực tiếp';
  const parts = [];
  const map = {
    health: 'Sinh lực (Health)',
    sanity: 'Tinh thần (Sanity)',
    wealth: 'Tiền Ahn (Wealth)',
    network: 'Mối quan hệ (Network)',
    rep: 'Danh tiếng (Reputation)',
    heat: 'Độ chú ý ngầm (Heat)',
    taboo: 'Vi phạm Taboo',
    resonance: 'Cộng hưởng E.G.O (Resonance)',
    merit: 'Chiến công (Merit)'
  };
  for (const [k, v] of Object.entries(fx)) {
    const name = map[k] || k;
    const sign = v > 0 ? `+${v}` : `${v}`;
    parts.push(`${name}: ${sign}`);
  }
  return parts.join(' | ');
}

function dumpEvent(ev, idx, categoryName) {
  log(`[${categoryName} #${idx + 1}] ID: ${ev.id}`);
  if (ev.age) log(`- Độ tuổi kích hoạt: từ ${ev.age[0]} đến ${ev.age[1]} tuổi`);
  if (ev.jobs) log(`- Nghề nghiệp yêu cầu: ${ev.jobs.join(', ')}`);
  if (ev.regions) log(`- Khu vực áp dụng: ${ev.regions.join(', ')}`);
  if (ev.need) log(`- Điều kiện chi tiết (Need): ${JSON.stringify(ev.need)}`);
  if (ev.requires && ev.requires.length) log(`- Cờ nhân quả bắt buộc (Requires): [${ev.requires.join(', ')}]`);
  if (ev.forbids && ev.forbids.length) log(`- Cờ cấm kỵ (Forbids): [${ev.forbids.join(', ')}]`);
  
  log(`\n* NỘI DUNG DẪN CHUYỆN (TIẾNG VIỆT):`);
  log(`  ${(ev.vi || '').replace(/\n/g, '\n  ')}`);
  log(`\n* SCENARIO PROSE (ENGLISH):`);
  log(`  ${(ev.en || '').replace(/\n/g, '\n  ')}`);

  if (Array.isArray(ev.choices) && ev.choices.length > 0) {
    log(`\n* CÁC NHÁNH LỰA CHỌN (CHOICES):`);
    ev.choices.forEach((c, cIdx) => {
      log(`  ------------------------------------------------------------------------`);
      log(`  [Lựa chọn ${cIdx + 1}]: ${c.labelVi || c.vi || 'Hành động'} (${c.labelEn || c.en || 'Action'})`);
      if (c.resultVi || c.rvi) {
        log(`  > Kết quả (VI): ${c.resultVi || c.rvi}`);
      }
      if (c.resultEn || c.ren) {
        log(`  > Outcome (EN): ${c.resultEn || c.ren}`);
      }
      log(`  > Thay đổi chỉ số: ${formatFx(c.effects || c.fx)}`);
      if (c.setJob) log(`  > Bổ nhiệm chức nghiệp: ${c.setJob}`);
      if (c.setFixerGrade !== undefined) log(`  > Cấp bậc Fixer chính thức: Grade ${c.setFixerGrade === 0 ? 'Color Fixer' : c.setFixerGrade}`);
      if (c.costAhn) log(`  > Tiêu tốn Ahn: -${c.costAhn} Ahn`);
      if (c.meritAdd) log(`  > Thưởng Merit: +${c.meritAdd}`);
      if (c.flagsAdd && c.flagsAdd.length) log(`  > Gắn cờ trạng thái: [${c.flagsAdd.join(', ')}]`);
      if (c.flagsRemove && c.flagsRemove.length) log(`  > Xóa cờ trạng thái: [${c.flagsRemove.join(', ')}]`);
      if (c.scarsAdd && c.scarsAdd.length) log(`  > Khắc vết sẹo tâm hồn: [${c.scarsAdd.join(', ')}]`);
      if (c.recordsAdd && c.recordsAdd.length) log(`  > Ghi danh Codex thành tựu: [${c.recordsAdd.join(', ')}]`);
      if (c.mem) log(`  > Ký ức khắc sâu: [${c.mem}]`);
      if (c.out && c.out.length) {
        log(`  > Các nhánh xác suất ngẫu nhiên (Outcomes):`);
        c.out.forEach((o, oIdx) => {
          log(`    - Nhánh ${oIdx + 1} (Tỷ trọng: ${o.w || 1}): ${o.rvi || o.vi || ''}`);
          log(`      Chỉ số: ${formatFx(o.fx || o.effects)} | Cờ: [${(o.flagsAdd || []).join(', ')}]`);
        });
      }
    });
  }
  log('\n' + sep2 + '\n');
}

// SECTION I
log(sep1);
log('PHẦN I: THIẾT LẬP THẾ GIỚI & GIA CẢNH KHỞI ĐẦU (WORLD DATA & ROOTS)');
log(sep1);
log('1. CÁC QUẬN CỦA THE CITY (DISTRICTS 1-26):');
REGIONS.forEach(r => {
  log(`- District ${r.id}: ${r.nameVi} (${r.nameEn}) | Thuộc tính: ${r.type} | Văn hóa: ${r.descVi}`);
});
log('\n2. TẦNG LỚP GIA ĐÌNH XUẤT THÂN:');
FAMILIES.forEach(f => {
  log(`- ${f.nameVi} (${f.nameEn}): Tài sản khởi điểm: ${f.wealth} Ahn | Mô tả: ${f.descVi}`);
});
log('\n3. CÁC HIỆP HỘI FIXER HÀNG ĐẦU (ASSOCIATIONS):');
ASSOCIATIONS.forEach(a => {
  log(`- Hiệp hội ${a.nameVi} (${a.nameEn}): Trách nhiệm: ${a.specialtyVi}`);
});
log('\n4. NĂM NGÓN TAY SYNDICATE (THE FIVE FINGERS):');
log('- The Thumb (Ngón Cái): Kỷ luật, tôn ti trật tự quân sự tuyệt đối, súng đạn và lễ nghi.');
log('- The Index (Ngón Trỏ): Thánh chỉ (Prescripts) định đoạt số phận, dệt sợi chỉ nhân quả.');
log('- The Middle (Ngón Giữa): Tình anh em gia tộc, Sổ Thù Hận (Book of Vengeance) thanh toán món nợ máu.');
log('- The Ring (Ngón Nhẫn): Nghệ thuật cực đoan, coi biến dạng thể xác và máu là kiệt tác hội họa.');
log('- The Pinky (Ngón Út): Mạng lưới giao ước bí ẩn nơi góc tối sâu thẳm nhất.');
log('\n\n');

// SECTION II
log(sep1);
log('PHẦN II: LỘ TRÌNH THĂNG HẠNG FIXER CHUẨN HANA (FIXER PROMOTION PATH: GRADE 9 -> COLOR)');
log(sep1);
log('Hệ thống gồm 9 kỳ đại sát hạch tuần tự. Không thể nhảy cóc bậc. Mọi Fixer đều bắt đầu từ Grade 9.\n');
FIXER_PATH_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'HANA PROMOTION EXAM'));

// SECTION III
log(sep1);
log('PHẦN III: TIẾN TRÌNH BIẾN DỊ (DISTORTION PATHWAY & CARMEN\'S WHISPERS)');
log(sep1);
log('Khi ý chí sụp đổ và đáp lời Carmen, nhân vật biến dạng thành thảm họa bị The City truy sát.\n');
DISTORTION_PATH_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'DISTORTION PROGRESSION'));

// SECTION IV
log(sep1);
log('PHẦN IV: BIẾN CỐ TUỔI THƠ & NGÃ RẼ TRƯỞNG THÀNH 18 TUỔI (CHILDHOOD & CAREER CROSSROADS)');
log(sep1);
log('Từ 0 đến 18 tuổi, định hình nhân sinh quan, tính cách và ngã rẽ chọn sự nghiệp.\n');
CHILDHOOD_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'CHILDHOOD & ADULTHOOD'));

// SECTION V
log(sep1);
log('PHẦN V: CHIẾN DỊCH PHE PHÁI, CÁNH & NĂM NGÓN TAY (FACTIONS: WINGS & FIVE FINGERS)');
log(sep1);
log('Nội chiến băng đảng, kiểm toán Singularities của Cánh, nhiệm vụ của các Ngón Tay.\n');
FACTION_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'FACTION & SYNDICATE CAMPAIGN'));

// SECTION VI
log(sep1);
log('PHẦN VI: SIÊU NHIÊN, THỨC TỈNH E.G.O & CẤP ĐỘ NGUY HIỂM (SUPERNATURAL, LIGHT & E.G.O)');
log(sep1);
log('Gặp gỡ Vầng Thái Dương Ánh Sáng của Carmen, Thức tỉnh E.G.O, móng vuốt The Claw và Star of the City.\n');
SUPERNATURAL_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'SUPERNATURAL & E.G.O'));

// SECTION VII
log(sep1);
log('PHẦN VII: HỢP ĐỒNG & YÊU CẦU ỦY THÁC FIXER (TACTICAL COMMISSIONS & REQUESTS)');
log(sep1);
FIXER_REQUESTS.forEach((ev, i) => dumpEvent(ev, i, 'FIXER COMMISSION'));

// SECTION VIII
log(sep1);
log('PHẦN VIII: KÝ ỨC TANG THƯƠNG, BÁO THÙ & DI VẬT (BEREAVEMENT & VENGEANCE CAUSALITY)');
log(sep1);
log('Xảy ra khi đồng đội, bạn đời đã hy sinh cứu người chơi. Ngăn chặn triệt để lỗi Ghost NPC.\n');
BEREAVEMENT_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'BEREAVEMENT & REVENGE'));

// SECTION IX
log(sep1);
log('PHẦN IX: KINH TẾ CÔNG XƯỞNG, CHỢ ĐEN & THỊ THỰC NEST (WORKSHOP DEPOT & ECONOMY)');
log(sep1);
log('Nơi tiêu Ahn chiến lược: Mua sắm vũ khí Công xưởng, cấy ghép sinh học và vé định cư Cánh.\n');
WORKSHOP_ECONOMY_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'WORKSHOP ECONOMY'));
log('DANH MỤC VẬT PHẨM WORKSHOP TIÊU BIỂU (ITEMS CATALOG):');
ITEMS_CATALOG.forEach((it, i) => {
  log(`[Vật phẩm #${i + 1}] ${it.nameVi} (${it.nameEn}) | Loại: ${it.type} | Giá: ${it.costAhn} Ahn | Độ hiếm: ${it.rarity}`);
  log(`  Mô tả: ${it.descVi}`);
  log(`  Hiệu ứng: ${JSON.stringify(it.effects)} | Kỹ năng đặc biệt: ${it.specialAction || 'Không'}`);
  log('  ------------------------------------------------------------------------');
});
log('\n\n');

// SECTION X
log(sep1);
log('PHẦN X: QUYẾT ĐỊNH TÌNH HUỐNG TỨC THỜI (LIFE MINORS - BỘ 1, 2, 3)');
log(sep1);
const allMinors = [...LIFE_MINORS, ...LIFE_MINORS_2, ...LIFE_MINORS_3];
log(`Tổng cộng: ${allMinors.length} sự kiện tương tác ngắn đa dạng trong đời sống.\n`);
allMinors.forEach((ev, i) => {
  log(`[Minor #${i + 1}] ID: ${ev.id}`);
  log(`* Tình huống (VI): ${ev.vi}`);
  log(`* Situation (EN): ${ev.en}`);
  if (ev.choices && ev.choices.length) {
    log(`* Lựa chọn:`);
    ev.choices.forEach((c, ci) => {
      log(`  - [${ci + 1}]: ${c.vi} (${c.en})`);
      log(`    Thay đổi chỉ số: ${formatFx(c.fx || c.effects)}`);
      if (c.out && c.out.length) {
        c.out.forEach((o, oi) => {
          log(`      + Biến thể ${oi + 1}: ${o.rvi || o.vi} | Chỉ số: ${formatFx(o.fx)}`);
        });
      }
    });
  }
  if (ev.ignore) {
    log(`* Bỏ qua không làm gì: ${ev.ignore.vi} -> ${ev.ignore.rvi || 'Trôi qua im lặng'}`);
  }
  log(sep3);
});
log('\n\n');

// SECTION XI
log(sep1);
log('PHẦN XI: NHỊP SỐNG SINH HOẠT THƯỜNG NHẬT (LIFE DAILIES - BỘ 1, 3)');
log(sep1);
const allDailies = [...LIFE_DAILIES, ...LIFE_DAILIES_3, ...EXPANDED_DAILIES];
log(`Tổng cộng: ${allDailies.length} nhịp sống ngẫu nhiên theo mùa và khu vực.\n`);
allDailies.forEach((d, i) => {
  log(`[Daily #${i + 1}] ID: ${d.id} | Yêu cầu: ${JSON.stringify(d.need || {})}`);
  log(`* Văn cảnh (VI): ${d.vi}`);
  log(`* Context (EN): ${d.en}`);
  log(`* Tác động môi trường: ${formatFx(d.fx)}`);
  log(sep3);
});
log('\n\n');

// SECTION XII
log(sep1);
log('PHẦN XII: HỆ QUẢ NHÂN QUẢ KÉO DÀI (CONSEQUENCE & KARMA THREADS)');
log(sep1);
CONSEQUENCE_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'CONSEQUENCE THREAD'));

// SECTION XIII: DERIVATIVE & FAN-FAVORITE LORE
log(sep1);
log('PHẦN XIII: TÁC PHẨM PHÁI SINH & GIAI THOẠI CỘNG ĐỒNG (DERIVATIVE & FAN-FAVORITE LORE)');
log(sep1);
log('Lấy cảm hứng từ Distortion Detective, Leviathan, WonderLab, Bloodfiends of La Manchaland, Blade Lineage & Kurokumo feuds.\n');
DERIVATIVE_LORE_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'DERIVATIVE & COMMUNITY LORE'));


// SECTION XV: COMPANION PERSONALITY QUERIES & ARCHETYPES
log(sep1);
log('PHẦN XV: NHIỆM VỤ ĐỒNG ĐỘI & GẮN KẾT NPC (NPC COMPANION QUESTS & ARCS)');
log(sep1);
log('Gắn kết chiều sâu tính cách từng NPC (Gambler, Sickly, Proud, Ambitious, Secretive, Partner, Spouse...)\n');
COMPANION_QUEST_EVENTS.forEach((ev, i) => dumpEvent(ev, i, 'COMPANION QUEST'));

// SECTION XIV
log(sep1);
log('PHẦN XIV: TỪ ĐIỂN THUẬT NGỮ CHUẨN NGUYÊN TÁC PROJECT MOON (CANONICAL GLOSSARY)');
log(sep1);
GLOSSARY_TERMS.forEach((t, i) => {
  log(`[Thuật ngữ #${i + 1}] ${t.titleVi} (${t.titleEn})`);
  log(`  Phân loại: ${t.category}`);
  log(`  Giải nghĩa: ${t.descVi}`);
  log('  ------------------------------------------------------------------------');
});

const outputPath = path.resolve('TOAN_BO_KICH_BAN_PROJECT_MOON.txt');
fs.writeFileSync(outputPath, lines.join('\r\n'), 'utf8');
console.log(`Đã xuất thành công toàn bộ kịch bản ra tệp: ${outputPath}`);
console.log(`Tổng số dòng văn bản: ${lines.length} dòng`);
