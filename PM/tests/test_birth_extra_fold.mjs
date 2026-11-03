import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { isExtraBirthEntry } from '../src/data/birthStories.js';

console.log('=== TEST ĐỢT 120c: GỌN PHẦN KHAI SINH HIỆN MẶC ĐỊNH ===');

const liveStageSource = fs.readFileSync(path.resolve('src/features/chronicle/components/LiveStageFeed.jsx'), 'utf-8');
const chronicleCss = fs.readFileSync(path.resolve('src/styles/ui/chronicle.css'), 'utf-8');

// 1. Kiểm tra tích hợp trong LiveStageFeed.jsx
assert.ok(liveStageSource.includes('isExtraBirthEntry'), 'LiveStageFeed phải định nghĩa hàm isExtraBirthEntry');
assert.ok(liveStageSource.includes('birth-extra-fold'), 'LiveStageFeed phải sử dụng class birth-extra-fold');
assert.ok(
  liveStageSource.includes("t('Chi tiết thời thơ ấu & nguồn cội', 'Childhood & heritage details')"),
  'LiveStageFeed phải có tiêu đề fold song ngữ cho thời thơ ấu & nguồn cội'
);
assert.ok(liveStageSource.includes('pushExtraBirthFold'), 'LiveStageFeed phải có cơ chế pushExtraBirthFold sau 3 dòng mặc định');

// 2. Kiểm tra styling trong chronicle.css
assert.ok(chronicleCss.includes('.entry.birth-extra-fold-card'), 'chronicle.css phải có class .entry.birth-extra-fold-card');
assert.ok(chronicleCss.includes('.birth-extra-fold summary'), 'chronicle.css phải có class .birth-extra-fold summary');
assert.ok(chronicleCss.includes('.birth-extra-rows'), 'chronicle.css phải có class .birth-extra-rows');
assert.ok(chronicleCss.includes('.birth-extra-row'), 'chronicle.css phải có class .birth-extra-row');
assert.ok(chronicleCss.includes('.birth-extra-tag'), 'chronicle.css phải có class .birth-extra-tag');
assert.ok(chronicleCss.includes('.birth-extra-text'), 'chronicle.css phải có class .birth-extra-text');

// 3. Kiểm tra logic phân loại entry khai sinh (Đợt 120/121)
// log_birth_0 (Nơi sinh), log_birth_2 (Điềm báo), log_birth_3 (Bạn thơ ấu) và log_legacy_0 (Di sản) hiện trực tiếp
assert.equal(isExtraBirthEntry({ id: 'log_birth_0', age: 0 }), false, 'Nơi sinh không bị gộp');
assert.equal(isExtraBirthEntry({ id: 'log_birth_2', age: 0 }), false, 'Điềm báo không bị gộp');
assert.equal(isExtraBirthEntry({ id: 'log_birth_3', age: 0 }), false, 'Bạn thời thơ ấu không bị gộp (Đợt 121)');
assert.equal(isExtraBirthEntry({ id: 'log_legacy_0', age: 0 }), false, 'Kế thừa di sản không bị gộp');
assert.equal(isExtraBirthEntry({ id: 'log_parent_living', age: 0 }), false, 'Cha mẹ còn sống không bị gộp');

// Phần mô tả dài đêm sinh & gia cảnh (log_birth_1) được gộp vào fold
assert.equal(isExtraBirthEntry({ id: 'log_birth_1', age: 0 }), true, 'Mô tả dài đêm sinh & gia cảnh được gộp vào fold');

// Tử vong lúc mới sinh (perinatal) hoặc bắt đầu người lớn không bị gộp
assert.equal(isExtraBirthEntry({ id: 'log_birth_perinatal_0', age: 0 }), false, 'Perinatal không bị gộp');
assert.equal(isExtraBirthEntry({ id: 'log_birth_perinatal_1', age: 0 }), false, 'Perinatal không bị gộp');
assert.equal(isExtraBirthEntry({ id: 'log_adult_start_0', age: 18 }), false, 'Adult start không bị gộp');

// Bất kỳ sự kiện nào từ tuổi 1 trở lên không bao giờ bị coi là extra birth
assert.equal(isExtraBirthEntry({ id: 'log_1_0_d1', age: 1 }), false, 'Sự kiện tuổi 1 không bị gộp');
assert.equal(isExtraBirthEntry({ id: 'log_birth_1', age: 1 }), false, 'Sai lệch age không bị gộp');

console.log('Test 120c: Tất cả kiểm tra gọn phần khai sinh mặc định ĐẠT 100%.');
