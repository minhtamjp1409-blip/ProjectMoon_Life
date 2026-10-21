import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { LIFE_MINORS, LIFE_DAILIES } from '../src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from '../src/data/eventsChildhood.js';
import { FIXER_REQUESTS } from '../src/data/eventsSupernatural.js';

const pools = [
  ['Biến cố chính', ALL_STORY_EVENTS],
  ['Hệ quả của lựa chọn trước', CONSEQUENCE_EVENTS],
  ['Tình huống ngắn có lựa chọn', LIFE_MINORS],
  ['Nhịp sống thường ngày', LIFE_DAILIES],
  ['Ủy thác Fixer', FIXER_REQUESTS],
];
const lines = [];
const add = (line = '') => lines.push(String(line));
const field = (label, value) => {
  if (value === undefined || value === null || value === '') return;
  add(`${label}: ${typeof value === 'string' ? value : JSON.stringify(value)}`);
};
const choice = (entry, index) => {
  add(`  Lựa chọn ${index + 1}: ${entry.labelVi || entry.vi || ''}`);
  field('    English', entry.labelEn || entry.en);
  field('    Điều kiện', entry.need);
  field('    Phí Ahn', entry.costAhn);
  field('    Kết quả', entry.resultVi || entry.rvi);
  field('    Outcome', entry.resultEn || entry.ren);
  field('    Chỉ số', entry.effects || entry.fx);
  for (const key of ['mem', 'later', 'scheduleConsequences', 'flagsAdd', 'flagsRemove', 'itemAdd', 'npcFate', 'setJob', 'setFixerGrade', 'setFingerRank', 'setWingRank', 'setWorkshopRank']) {
    field(`    ${key}`, entry[key]);
  }
  (entry.outcomes || entry.out || []).forEach((outcome, outcomeIndex) => {
    add(`    Nhánh ngẫu nhiên ${outcomeIndex + 1} (trọng số ${outcome.w ?? 1}): ${outcome.resultVi || outcome.rvi || outcome.vi || ''}`);
    field('      English', outcome.resultEn || outcome.ren || outcome.en);
    field('      Chỉ số', outcome.effects || outcome.fx);
    field('      Điều kiện', outcome.need);
    field('      Hệ quả hẹn giờ', outcome.later);
  });
};

add('THE CITY CHRONICLES — DANH SÁCH SỰ KIỆN VÀ CÁC NHÁNH');
add('Tác phẩm phái sinh lấy cảm hứng từ vũ trụ Project Moon; các quy tắc riêng của trò chơi không phải lore chính thức.');
add(`Xuất ngày: ${new Date().toLocaleString('vi-VN')}`);
add(`Tổng cộng: ${pools.reduce((sum, [, entries]) => sum + entries.length, 0)} mục`);
for (const [name, entries] of pools) add(`${name}: ${entries.length}`);
add();

for (const [name, entries] of pools) {
  add('='.repeat(80));
  add(`${name.toUpperCase()} — ${entries.length}`);
  add('='.repeat(80));
  entries.forEach((entry, index) => {
    add();
    add(`[${index + 1}] ${entry.id}`);
    field('Tuổi', entry.age);
    field('Nghề', entry.jobs);
    field('Vùng', entry.regions);
    field('Điều kiện', entry.need);
    field('Cờ yêu cầu', entry.requires);
    field('Cờ cấm', entry.forbids);
    field('Chỉ dành cho nhân quả', entry.causalOnly);
    field('Nội dung', entry.vi);
    field('English', entry.en);
    (entry.choices || []).forEach(choice);
    if (entry.ignore) {
      field('Bỏ qua', entry.ignore.rvi || entry.ignore.vi);
      field('Ignore', entry.ignore.ren || entry.ignore.en);
      field('Chỉ số khi bỏ qua', entry.ignore.fx);
    }
    field('Chỉ số trực tiếp', entry.fx);
    for (const [vi, en] of [['okVi', 'okEn'], ['failVi', 'failEn'], ['deathVi', 'deathEn']]) {
      field(vi, entry[vi]);
      field(en, entry[en]);
    }
  });
  add();
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'DANH_SACH_TAT_CA_EVENTS.txt');
fs.writeFileSync(output, `${lines.join('\n').trimEnd()}\n`, 'utf8');
console.log(`Đã xuất ${pools.reduce((sum, [, entries]) => sum + entries.length, 0)} mục vào ${output}`);
