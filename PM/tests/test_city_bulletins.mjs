import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CITY_BULLETINS } from '../src/data/cityBulletins.js';
import { REGIONS } from '../src/data/worldData.js';
import { createYearDigest, consolidateYearDailies, AMBIENT_YEAR_LINES, planYear, runDueItems, resolveMinor, endYear } from '../src/engine/yearPlanner.js';
import { createNewCharacter, createRNG, resolveEventChoice, resolveFixerContract } from '../src/engine/gameEngine.js';
import { autoEventChoiceIndex, autoContractApproachId } from '../src/engine/forbiddenPath.js';

// 1. Pure data guard: cityBulletins.js must not import from engine/
const rawSrc = readFileSync(new URL('../src/data/cityBulletins.js', import.meta.url), 'utf8');
assert.equal(/from ['"][^'"]*engine\//.test(rawSrc), false, 'cityBulletins.js must not import from src/engine/');

// 2. Scope counts & Wing coverage
const byScope = { backstreets: 0, nest: 0, outskirts: 0, wing: 0 };
const wingRegionsCovered = new Set();
const ids = new Set();

for (const b of CITY_BULLETINS) {
  assert.ok(b.id && !ids.has(b.id), `Duplicate or missing bulletin id: ${b.id}`);
  ids.add(b.id);
  assert.ok(b.vi && typeof b.vi === 'string', `Missing vi on ${b.id}`);
  assert.ok(b.en && typeof b.en === 'string', `Missing en on ${b.id}`);
  assert.ok(byScope[b.scope] !== undefined, `Invalid scope ${b.scope} on ${b.id}`);
  byScope[b.scope]++;
  if (b.scope === 'wing') {
    assert.ok(b.regionId, `Wing bulletin ${b.id} missing regionId`);
    wingRegionsCovered.add(b.regionId);
  }
  assert.ok(Array.isArray(b.age) && b.age.length === 2 && b.age[0] <= b.age[1], `Invalid age range on ${b.id}`);
  assert.ok(b.spDelta === undefined || [-1, 0, 1].includes(b.spDelta), `spDelta out of [-1..1] on ${b.id}`);
  assert.equal(b.vi.startsWith('Một năm trôi qua'), false, `${b.id} must not open with "Một năm trôi qua"`);
  assert.equal((b.vi.match(/[.!?](\s|$)/g) || []).length, 1, `${b.id} must be a single clean sentence in VI`);
}

assert.ok(byScope.backstreets >= 20, `Expected >= 20 backstreets bulletins, got ${byScope.backstreets}`);
assert.ok(byScope.nest >= 20, `Expected >= 20 nest bulletins, got ${byScope.nest}`);
assert.ok(byScope.outskirts >= 20, `Expected >= 20 outskirts bulletins, got ${byScope.outskirts}`);

const districtIds = REGIONS.filter((r) => r.id !== 'OUTSKIRTS').map((r) => r.id);
for (const rid of districtIds) {
  assert.ok(wingRegionsCovered.has(rid), `District ${rid} must have at least 1 Wing bulletin`);
}

// 3. No repeats inside a life; falls back to AMBIENT_YEAR_LINES only after exhausting eligible bulletins;
// stat-changing dailies stay as headline and attach bulletin as secondary line without masking chips
const makeQuietDailies = (age) => [
  { id: `d_${age}_1`, age, type: 'daily', vi: '[Xuân] Gió thổi nhẹ.', en: '[Spring] Light breeze.', deltas: [] },
  { id: `d_${age}_2`, age, type: 'daily', vi: '[Hạ] Trời ấm dần.', en: '[Summer] Warm air.', deltas: [] }
];
const makeDeltaDailies = (age) => [
  { id: `dd_${age}_1`, age, type: 'daily', vi: '[Xuân] Chợ sớm bớt hàng.', en: '[Spring] Morning stall ran short.', deltas: [{ k: 'health', v: -2 }] },
  { id: `dd_${age}_2`, age, type: 'daily', vi: '[Hạ] Nhặt được vài đồng lẻ.', en: '[Summer] Found a few loose Ahn.', deltas: [{ k: 'wealth', v: 1 }] }
];

const char = createNewCharacter({ seed: 'bulletin_test_life' });
char.regionId = 'K';
char.flags = (char.flags || []).filter((f) => !['Nest', 'NestResident', 'Feather'].includes(f));
char.seenBulletins = [];

const eligibleCount = CITY_BULLETINS.filter(
  (b) => b.scope === 'backstreets' || (b.scope === 'wing' && b.regionId === 'K')
).length;

const seenTexts = new Set();
for (let i = 0; i < eligibleCount; i++) {
  const age = 20 + i;
  const d = createYearDigest(makeQuietDailies(age), age, { quiet: true, char });
  assert.ok(!seenTexts.has(d.vi), `Quiet year bulletin repeated before exhaustion at step ${i}: ${d.vi}`);
  seenTexts.add(d.vi);
  assert.equal(d.vi.startsWith('Một năm trôi qua'), false, 'Concrete bulletin should not start with "Một năm trôi qua"');
}
assert.equal(char.seenBulletins.length, eligibleCount, 'All eligible unseen bulletins should be exhausted');

// Next quiet year after exhaustion picks a real daily entry when available, and AMBIENT_YEAR_LINES only when dailyEntries is empty
const fallbackDailyDigest = createYearDigest(makeQuietDailies(50), 50, { quiet: true, char });
const quietDailyTexts = new Set(['Gió thổi nhẹ.', 'Trời ấm dần.']);
assert.ok(quietDailyTexts.has(fallbackDailyDigest.vi), `Expected real daily sentence after exhaustion, got: ${fallbackDailyDigest.vi}`);
const fallbackAmbientDigest = createYearDigest([], 50, { quiet: true, char });
assert.equal(fallbackAmbientDigest, null, 'Empty dailyEntries returns null digest');

// Direct AMBIENT_YEAR_LINES check remains for legacy quiet years with zero bulletins and blank dailies
assert.ok(AMBIENT_YEAR_LINES.backstreets.length > 0, 'AMBIENT_YEAR_LINES remains populated as final safety net');

// Stat-changing dailies MUST keep daily headline intact and place bulletin into bulletinVi
const deltaChar = createNewCharacter({ seed: 'bulletin_delta_test' });
deltaChar.regionId = 'K';
deltaChar.flags = (deltaChar.flags || []).filter((f) => !['Nest', 'NestResident', 'Feather'].includes(f));
deltaChar.seenBulletins = [];
let deltaBulletinSeen = false;
for (let age = 20; age < 45; age++) {
  const deltaDigest = createYearDigest(makeDeltaDailies(age), age, { quiet: true, char: deltaChar });
  assert.equal(deltaDigest.vi, 'Chợ sớm bớt hàng.', 'Stat-changing daily headline must not be overwritten by bulletin');
  if (deltaDigest.bulletinVi && deltaDigest.bulletinVi.length > 10) deltaBulletinSeen = true;
}
assert.ok(deltaBulletinSeen, 'Secondary bulletinVi attaches probabilistically across stat-changing consolidated years');

// 4. Outskirts scope & Nest scope isolation
const outChar = createNewCharacter({ seed: 'out_test' });
outChar.regionId = 'OUTSKIRTS';
outChar.flags = ['Outskirts'];
outChar.seenBulletins = [];
const outDigest = createYearDigest(makeQuietDailies(20), 20, { quiet: true, char: outChar });
const outPoolTexts = new Set(CITY_BULLETINS.filter((b) => b.scope === 'outskirts').map((b) => b.vi));
assert.ok(outPoolTexts.has(outDigest.vi), 'Outskirts quiet year must pick outskirts bulletin');

// 5. 200-life simulation measuring bulletin distribution by age bracket, zero chip masking, and zero within-life repeats
let consolidatedYearsTotal = 0;
let bulletinYearsTotal = 0;
let withinLifeRepeats = 0;
const seenLineCounts = new Map();
const allBulletinTexts = new Set(CITY_BULLETINS.map((b) => b.vi));
const buckets = {
  '5-9': { total: 0, bul: 0 },
  '10-19': { total: 0, bul: 0 },
  '20-29': { total: 0, bul: 0 },
  '30-39': { total: 0, bul: 0 },
  '40-59': { total: 0, bul: 0 }
};
const ageBucket = (age) => (age <= 9 ? '5-9' : age <= 19 ? '10-19' : age <= 29 ? '20-29' : age <= 39 ? '30-39' : '40-59');

for (let i = 0; i < 200; i++) {
  const seed = `sim_bulletin_${i}`;
  const rng = createRNG(seed);
  let sim = createNewCharacter({ seed });
  sim.alive = true;
  sim.pendingBirthLogs = [];
  const lifeBulletinLines = new Set();

  for (let age = 0; age < 60 && sim.alive; age++) {
    if (age > 0) sim = endYear(sim, rng);
    if (!sim.alive) break;
    if (!sim.plan || sim.plan.length === 0) planYear(sim, rng);
    sim.pendingYearPlan = null;
    sim.pendingLead = null;
    sim.pendingModal = null;

    let guard = 0;
    while (sim.alive && guard++ < 12) {
      const res = runDueItems(sim, 100, rng);
      sim = res.char;
      if (sim.pendingDungeon) sim.pendingDungeon = null;
      if (sim.pendingEvent) {
        const idx = autoEventChoiceIndex(sim.pendingEvent, sim);
        sim = resolveEventChoice(sim, idx, rng);
      } else if (sim.pendingContract) {
        const approachId = autoContractApproachId(sim.pendingContract, sim);
        sim = resolveFixerContract(sim, approachId, rng);
      } else if (sim.pendingMinor) {
        sim = resolveMinor(sim, -1, rng);
      } else {
        break;
      }
    }

    if (age >= 5) {
      consolidateYearDailies(sim, age);
      const q = sim.logs.find((e) => e.age === age && e.type === 'year_digest');
      if (q) {
        consolidatedYearsTotal++;
        const bk = buckets[ageBucket(age)];
        bk.total++;
        const nonSanityDeltas = (q.deltas || []).filter((d) => d.k !== 'sanity');
        if (allBulletinTexts.has(q.vi)) {
          assert.equal(nonSanityDeltas.length, 0, `Bulletin headline "${q.vi}" must never mask non-sanity daily chips (${JSON.stringify(q.deltas)})`);
        }
        const bulletinText = q.bulletinVi || (allBulletinTexts.has(q.vi) ? q.vi : '');
        if (bulletinText) {
          bulletinYearsTotal++;
          bk.bul++;
          if (lifeBulletinLines.has(bulletinText)) withinLifeRepeats++;
          lifeBulletinLines.add(bulletinText);
          seenLineCounts.set(bulletinText, (seenLineCounts.get(bulletinText) || 0) + 1);
        }
      }
    }
  }
}

assert.ok(buckets['5-9'].bul < buckets['5-9'].total, 'Ages 5-9 should not get bulletins in 100% of years');
assert.ok(buckets['30-39'].bul / buckets['30-39'].total > 0.2, `Expected healthy bulletin rate in ages 30-39, got ${buckets['30-39'].bul}/${buckets['30-39'].total}`);
assert.ok(buckets['40-59'].bul / buckets['40-59'].total > 0.15, `Expected healthy bulletin rate in ages 40-59, got ${buckets['40-59'].bul}/${buckets['40-59'].total}`);
const bucketSummary = Object.entries(buckets).map(([k, v]) => `${k}:${v.bul}/${v.total}`).join(', ');
const withinLifeRepeatPct = bulletinYearsTotal > 0 ? ((withinLifeRepeats / bulletinYearsTotal) * 100).toFixed(2) : '0.00';
const uniqueLinesSeen = seenLineCounts.size;
console.log(
  `test_city_bulletins: OK (${CITY_BULLETINS.length} bulletins: backstreets=${byScope.backstreets}, nest=${byScope.nest}, outskirts=${byScope.outskirts}, wing=${byScope.wing}; ` +
  `200 lives -> ${bulletinYearsTotal}/${consolidatedYearsTotal} consolidated years [${bucketSummary}], ${uniqueLinesSeen} unique lines, within-life repeats=${withinLifeRepeats} [${withinLifeRepeatPct}%])`
);
