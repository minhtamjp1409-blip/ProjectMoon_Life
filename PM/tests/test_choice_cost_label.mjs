import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { stripCostSuffix } from '../src/engine/eventConditions.js';
import { ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';
import { LIFE_MINORS } from '../src/data/lifeMinors.js';

console.log('=== RUNNING CHOICE COST LABEL & BIRTH SETUP TESTS (ĐỢT 114) ===');

// 1. Unit tests for stripCostSuffix
{
  // Test trailing Ahn cost patterns in parentheses
  assert.equal(stripCostSuffix('Nhờ người mua thuốc và băng sạch (-1 Ahn)'), 'Nhờ người mua thuốc và băng sạch');
  assert.equal(stripCostSuffix('Mua linh kiện (Tốn 40 Ahn)'), 'Mua linh kiện');
  assert.equal(stripCostSuffix('Upgrade tools (cost 40 Ahn)'), 'Upgrade tools');
  assert.equal(stripCostSuffix('Pay fee (Cost 40 Ahn)'), 'Pay fee');
  assert.equal(stripCostSuffix('Trao đổi (8 Ahn)'), 'Trao đổi');
  assert.equal(stripCostSuffix('Thanh toán dứt điểm toàn bộ món nợ ({debtBalance} Ahn)'), 'Thanh toán dứt điểm toàn bộ món nợ');
  assert.equal(stripCostSuffix('Thử nghiệm (cost -10 Ahn)'), 'Thử nghiệm');
  assert.equal(stripCostSuffix('Kích hoạt buồng sinh học hồi phục cao cấp K-Tier (-25 Ahn)'), 'Kích hoạt buồng sinh học hồi phục cao cấp K-Tier');
  assert.equal(stripCostSuffix('Gọi Combo Sandwich Đặc Biệt và trà hoa hồng ấm (-10 Ahn)'), 'Gọi Combo Sandwich Đặc Biệt và trà hoa hồng ấm');

  // Negative tests: non-cost parentheses or other text must be preserved
  assert.equal(stripCostSuffix('Cố gắng hết sức (nếu còn sức)'), 'Cố gắng hết sức (nếu còn sức)');
  assert.equal(stripCostSuffix('Bỏ 15 Ahn thuê Fixer xử lý'), 'Bỏ 15 Ahn thuê Fixer xử lý');
  assert.equal(stripCostSuffix('Lựa chọn bình thường'), 'Lựa chọn bình thường');
  assert.equal(stripCostSuffix('Action with (note)'), 'Action with (note)');
  assert.equal(stripCostSuffix(''), '');
  assert.equal(stripCostSuffix(null), null);
  assert.equal(stripCostSuffix(undefined), undefined);

  console.log('✓ stripCostSuffix unit patterns verified.');
}

// 2. Data sweep across ALL_STORY_EVENTS and LIFE_MINORS
{
  const costRegex = /\(\s*(?:tốn\s+|cost\s+)?-?\s*(?:\d+|\{debtBalance\})\s*ahn\s*\)$/i;

  let eventCostChoices = 0;
  let eventStrippedCount = 0;
  for (const event of ALL_STORY_EVENTS) {
    for (const choice of event.choices || []) {
      if (choice.costAhn > 0) {
        eventCostChoices++;
        if (choice.labelVi) {
          const strippedVi = stripCostSuffix(choice.labelVi);
          assert.equal(costRegex.test(strippedVi), false, `Event ${event.id} Vi label still has trailing cost: "${strippedVi}"`);
          if (strippedVi !== choice.labelVi) eventStrippedCount++;
        }
        if (choice.labelEn) {
          const strippedEn = stripCostSuffix(choice.labelEn);
          assert.equal(costRegex.test(strippedEn), false, `Event ${event.id} En label still has trailing cost: "${strippedEn}"`);
        }
      }
    }
  }

  let minorCostChoices = 0;
  let minorStrippedCount = 0;
  for (const minor of LIFE_MINORS) {
    for (const choice of minor.choices || []) {
      if (choice.costAhn > 0) {
        minorCostChoices++;
        if (choice.vi) {
          const strippedVi = stripCostSuffix(choice.vi);
          assert.equal(costRegex.test(strippedVi), false, `Minor ${minor.id} Vi label still has trailing cost: "${strippedVi}"`);
          if (strippedVi !== choice.vi) minorStrippedCount++;
        }
        if (choice.en) {
          const strippedEn = stripCostSuffix(choice.en);
          assert.equal(costRegex.test(strippedEn), false, `Minor ${minor.id} En label still has trailing cost: "${strippedEn}"`);
        }
      }
    }
  }

  assert.ok(eventCostChoices > 0, 'Must have events with costAhn');
  assert.ok(minorCostChoices > 0, 'Must have minors with costAhn');
  assert.ok(eventStrippedCount > 0, 'Must strip trailing cost from events with redundant labels');
  assert.ok(minorStrippedCount > 0, 'Must strip trailing cost from minors with redundant labels');

  console.log(`✓ Data sweep passed: ${eventCostChoices} event choices and ${minorCostChoices} minor choices checked. All trailing cost suffixes cleanly stripped.`);
}

// 3. Verify LiveStageFeed.jsx integrates stripCostSuffix
{
  const liveFeedSource = fs.readFileSync(path.resolve('src/features/chronicle/components/LiveStageFeed.jsx'), 'utf-8');
  assert.ok(liveFeedSource.includes('stripCostSuffix'), 'LiveStageFeed.jsx must import stripCostSuffix');
  assert.ok(liveFeedSource.includes('costAhn > 0 ? stripCostSuffix('), 'MinorDock must use stripCostSuffix when costAhn > 0');
  assert.ok(liveFeedSource.includes('costDisplay.costAhn > 0 ? stripCostSuffix('), 'EventDock must use stripCostSuffix when costDisplay.costAhn > 0');
  assert.ok(liveFeedSource.includes('app.costAhn > 0 ? stripCostSuffix('), 'ContractDock must use stripCostSuffix when app.costAhn > 0');
  console.log('✓ LiveStageFeed.jsx integration verified for Minor, Event, and Contract choices.');
}

// 4. Verify BirthSetupPanel.jsx footnote rules and mobile atlas strip (Đợt 114b)
{
  const birthSource = fs.readFileSync(path.resolve('src/features/chronicle/components/BirthSetupPanel.jsx'), 'utf-8');
  assert.ok(
    birthSource.includes('Một năm trôi trong 30 giây. Lựa chọn lớn dừng đồng hồ chờ bạn; lựa chọn nhỏ có hạn giờ, hết giờ thì đời đi tiếp.'),
    'BirthSetupPanel.jsx must include updated 30s rule explanation (Vi)'
  );
  assert.ok(
    birthSource.includes('A year passes in 30 seconds. Major choices pause the clock to wait for you; minor choices have a timer, and when time runs out life moves on.'),
    'BirthSetupPanel.jsx must include updated 30s rule explanation (En)'
  );
  assert.ok(
    birthSource.includes('Tự lưu sau mỗi lựa chọn.'),
    'BirthSetupPanel.jsx must state auto-save rule (Vi)'
  );
  assert.ok(
    birthSource.includes('Saved after every choice.'),
    'BirthSetupPanel.jsx must state auto-save rule (En)'
  );
  assert.ok(
    birthSource.includes('CityBirthAtlasStrip'),
    'BirthSetupPanel.jsx must include CityBirthAtlasStrip'
  );
  assert.ok(
    birthSource.includes('atlasRef'),
    'BirthSetupPanel.jsx must hold a ref to opening-atlas'
  );

  const atlasSource = fs.readFileSync(path.resolve('src/features/chronicle/components/CityBirthAtlas.jsx'), 'utf-8');
  assert.ok(atlasSource.includes('export function CityBirthAtlasStrip'), 'CityBirthAtlas.jsx must export CityBirthAtlasStrip');
  assert.ok(atlasSource.includes('export function CityAtlasDefs'), 'CityBirthAtlas.jsx must export CityAtlasDefs');
  assert.ok(atlasSource.includes('export function MapInk'), 'CityBirthAtlas.jsx must export MapInk');

  const cssSource = fs.readFileSync(path.resolve('src/styles/ui/city-atlas.css'), 'utf-8');
  assert.ok(cssSource.includes('.birth-atlas-strip { display: none; }'), 'city-atlas.css must hide strip on desktop');
  assert.ok(cssSource.includes('@media (max-width: 720px)'), 'city-atlas.css must show strip on mobile <= 720px');

  console.log('✓ BirthSetupPanel footnote rules and mobile atlas strip verified.');
}

console.log('=== ALL CHOICE COST LABEL & BIRTH SETUP TESTS PASSED (100%) ===');
