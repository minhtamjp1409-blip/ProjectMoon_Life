import assert from 'node:assert/strict';
import {
  rollNpcCareer,
  ensureNpcAgency,
  appendNpcMemory,
  getNpcAge as getNpcAgeFromPersonality
} from '../src/data/npcPersonality.js';
import {
  canInteractWithNpc,
  executeNpcInteraction,
  hasSynergyWith,
  getNpcAge as getNpcAgeFromInteractions
} from '../src/engine/npcInteractions.js';
import { hasSynergyWith as hasSynergyWithFromConditions } from '../src/engine/eventConditions.js';
import { simulateNpcAutonomousLife } from '../src/engine/narrativeArcEngine.js';
import { createNewCharacter } from '../src/engine/gameEngine.js';
import { makeNpc } from '../src/data/birthStories.js';
import {
  createDungeonSession,
  resolveDungeonChoice,
  pickDungeonCompanion
} from '../src/engine/dungeonEngine.js';
import { resolveSignatureCombat } from '../src/engine/dungeonSignature.js';
import { settleStake } from '../src/engine/dungeonClash.js';
import { endYear } from '../src/engine/yearPlanner.js';

console.log('--- Testing 11 NPC Mechanics Fixes (docs/NPC_CAN_SUA.md) ---');

// ----------------------------------------------------------------------------
// 1. Item 1: `0 || 50` stat fallback bug fixed with `?? 50` and `?? 0`
// ----------------------------------------------------------------------------
{
  const charZero = createNewCharacter({ seed: 'npc-fix-zero-stats', startAge: 24 });
  charZero.stats.sanity = 0;
  charZero.stats.health = 20;
  charZero.stats.wealth = 20;
  charZero.npcs.friend = ensureNpcAgency({
    role: 'friend',
    nameVi: 'Min-seo',
    nameEn: 'Min-seo',
    archetype: 'hothead',
    bond: 10,
    status: 'alive'
  }, () => 0.2);

  // Drink & confide at sanity = 0 must go to 10 (not 60)
  const drinkAtZero = executeNpcInteraction(charZero, 'friend', 'drink_confide', () => 0.5);
  assert.equal(drinkAtZero.success, true);
  assert.equal(drinkAtZero.nextChar.stats.sanity, 10, 'drink_confide at sanity=0 must add 10 -> 10, not 50+10=60');

  // Autonomous low-bond altercation at sanity = 0 must clamp to 0 (not 50-4=46)
  charZero.stats.sanity = 0;
  simulateNpcAutonomousLife(charZero, () => 0.05);
  assert.equal(charZero.stats.sanity, 0, 'simulateNpcAutonomousLife at sanity=0 must stay 0, not jump to 46');
}

// ----------------------------------------------------------------------------
// 2. Item 2: `companionSynergy` matches role, expires after 1 year, and clears on shield use
// ----------------------------------------------------------------------------
{
  const synChar = createNewCharacter({ seed: 'npc-fix-synergy', startAge: 24 });
  synChar.npcs.friend = ensureNpcAgency({
    role: 'friend',
    nameVi: 'Ji-hoon',
    nameEn: 'Ji-hoon',
    archetype: 'bookish',
    bond: 60,
    status: 'alive'
  }, () => 0.3);
  synChar.npcs.partner = ensureNpcAgency({
    role: 'partner',
    nameVi: 'Soo-jin',
    nameEn: 'Soo-jin',
    archetype: 'gambler',
    bond: 60,
    status: 'alive'
  }, () => 0.3);

  const sparFriend = executeNpcInteraction(synChar, 'friend', 'spar_coordinate', () => 0.5);
  const cAfterSpar = sparFriend.nextChar;
  assert.equal(hasSynergyWith(cAfterSpar, 'friend'), true, 'Synergy must be active for the sparred role (friend)');
  assert.equal(hasSynergyWith(cAfterSpar, 'partner'), false, 'Synergy with friend must NOT apply to partner');

  // Same year or +1 year: still valid; +2 years: expired
  cAfterSpar.age = 25;
  assert.equal(hasSynergyWith(cAfterSpar, 'friend'), true, 'Synergy remains valid within 1 year');
  cAfterSpar.age = 26;
  assert.equal(hasSynergyWith(cAfterSpar, 'friend'), false, 'Synergy expires when age - syn.year > 1');

  // Shield intervention via synergy consumes companionSynergy
  cAfterSpar.age = 24;
  cAfterSpar.npcs.partner = null; // friend is picked as dungeon companion
  const session = createDungeonSession('dungeon_warp_train', cAfterSpar);
  cAfterSpar.pendingDungeon = session;
  cAfterSpar.stats.health = 1;
  const dungRes = resolveDungeonChoice(cAfterSpar, 0, () => 0.99);
  assert.equal(dungRes.char.stats.health, 5, 'Synergy shield saves player at 5 HP');
  assert.equal(dungRes.char.companionSynergy, null, 'Synergy is cleared after shield triggers');
}

// ----------------------------------------------------------------------------
// 3. Item 3: Age gates on NPC interactions (`minAge` / `maxAge`) + NPC age check
// ----------------------------------------------------------------------------
{
  const childChar = createNewCharacter({ seed: 'npc-fix-age-gate', startAge: 8 });
  childChar.age = 8;
  childChar.stats.wealth = 30;
  childChar.npcs.friend = makeNpc('friend', () => 0.4, { metAge: 0, regionId: 'K' });

  const drinkAt8 = canInteractWithNpc(childChar, 'friend', 'drink_confide');
  assert.equal(drinkAt8.ok, false, '8-year-old cannot drink_confide');

  const sparAt8 = canInteractWithNpc(childChar, 'friend', 'spar_coordinate');
  assert.equal(sparAt8.ok, false, '8-year-old cannot spar_coordinate');

  const playAt8 = canInteractWithNpc(childChar, 'friend', 'child_play');
  assert.equal(playAt8.ok, true, '8-year-old can use child_play');
  const playRes = executeNpcInteraction(childChar, 'friend', 'child_play', () => 0.5);
  assert.equal(playRes.success, true);

  // Adult player cannot drink with a 6-year-old child NPC
  const adultWithChild = createNewCharacter({ seed: 'npc-fix-child-npc', startAge: 28 });
  adultWithChild.stats.wealth = 30;
  adultWithChild.npcs.child = makeNpc('child', () => 0.4, { metAge: 22, ageAtMeet: 0 });
  const drinkWithChild = canInteractWithNpc(adultWithChild, 'child', 'drink_confide');
  assert.equal(drinkWithChild.ok, false, 'Adult cannot drink_confide with a 6-year-old child NPC');
}

// ----------------------------------------------------------------------------
// 4. Item 4: Job-specific news for `friend`, 3-year cooldown, and career switch
// ----------------------------------------------------------------------------
{
  const wingFriendChar = createNewCharacter({ seed: 'npc-fix-wing-news', startAge: 24 });
  wingFriendChar.npcs.friend = {
    role: 'friend',
    nameVi: 'Yoon',
    nameEn: 'Yoon',
    archetype: 'ambitious',
    job: 'Wing Employee',
    corpId: 'K',
    rank: 1,
    rankLabelVi: 'Nhân viên K Corp',
    rankLabelEn: 'K Corp Feather',
    bond: 60,
    status: 'alive'
  };

  const newsLogs1 = simulateNpcAutonomousLife(wingFriendChar, () => 0.05);
  const dispatch1 = newsLogs1.find((l) => l.vi.includes('[Tin khu phố]'));
  assert.ok(dispatch1, 'Friend should emit news when rng < 0.14');
  assert.ok(!dispatch1.vi.includes('Văn phòng Fixer'), 'Wing Employee friend must NOT emit Fixer Office contract news');

  // Next year (age 25): 3-year cooldown prevents immediate news repeat
  wingFriendChar.age = 25;
  const newsLogs2 = simulateNpcAutonomousLife(wingFriendChar, () => 0.05);
  const dispatch2 = newsLogs2.find((l) => l.vi.includes('[Tin khu phố]'));
  assert.equal(dispatch2, undefined, 'Friend news must respect 3-year cooldown');

  // Career switch news updates job & rankLabelVi and adds memory
  wingFriendChar.age = 28;
  wingFriendChar.npcs.friend.pendingCareerSwitch = true;
  const switchLogs = simulateNpcAutonomousLife(wingFriendChar, () => 0.05);
  assert.ok(switchLogs.some((l) => l.vi.includes('[Ngã rẽ sự nghiệp]')), 'Career switch news should fire');
  assert.equal(wingFriendChar.npcs.friend.job, 'Fixer', 'Career switch must update friend.job');
}

// ----------------------------------------------------------------------------
// 5. Item 5: Wing promotion preserves Corp name (`K Corp Trưởng phòng`, not `Nhân Chính thức`)
// ----------------------------------------------------------------------------
{
  const promoChar = createNewCharacter({ seed: 'npc-fix-wing-promo', startAge: 26 });
  promoChar.npcs.partner = ensureNpcAgency({
    role: 'partner',
    nameVi: 'Hana',
    nameEn: 'Hana',
    archetype: 'nestdreamer',
    job: 'Wing Employee',
    rank: 1,
    rankLabelVi: 'Nhân viên K Corp',
    rankLabelEn: 'K Corp Feather',
    bond: 50,
    status: 'alive'
  }, () => 0.3);

  simulateNpcAutonomousLife(promoChar, () => 0.02);
  assert.equal(promoChar.npcs.partner.rank, 2);
  assert.ok(
    promoChar.npcs.partner.rankLabelVi.startsWith('K Corp '),
    `Expected K Corp prefix on promoted label, got: ${promoChar.npcs.partner.rankLabelVi}`
  );
  assert.ok(!promoChar.npcs.partner.rankLabelVi.startsWith('Nhân '), 'Must never produce broken "Nhân ..." prefix');
}

// ----------------------------------------------------------------------------
// 6. Item 6: Crisis resolves when severity reaches 100 + prosthetic alert + all archetypes
// ----------------------------------------------------------------------------
{
  const crisisChar = createNewCharacter({ seed: 'npc-fix-crisis-100', startAge: 27 });
  crisisChar.npcs.friend = ensureNpcAgency({
    role: 'friend',
    nameVi: 'Dae',
    nameEn: 'Dae',
    archetype: 'tinkerer',
    bond: 10, // Hostile bond (< 15) -> goes missing at severity >= 100
    status: 'alive',
    crisis: {
      type: 'prosthetic',
      severity: 95,
      labelVi: 'Hội chứng đào thải cơ khí',
      labelEn: 'Prosthetic Rejection'
    }
  }, () => 0.5);

  const cLogs = simulateNpcAutonomousLife(crisisChar, () => 0.5);
  assert.equal(crisisChar.npcs.friend.crisis.severity, 0, 'Crisis reaching 100 must resolve and reset severity to 0');
  assert.equal(crisisChar.npcs.friend.status, 'missing', 'Unresolved crisis at low bond causes NPC to go missing');
  assert.ok(cLogs.some((l) => l.vi.includes('[Đứt đoạn giữa đêm]')), 'Crisis resolution log must be emitted');

  // High bond (>= 15) crisis reaching 100 must set all 4 injury fields via woundByShield
  const crisisSurviveChar = createNewCharacter({ seed: 'npc-fix-crisis-survive', startAge: 29 });
  crisisSurviveChar.npcs.friend = ensureNpcAgency({
    role: 'friend',
    nameVi: 'Eun',
    nameEn: 'Eun',
    archetype: 'tinkerer',
    bond: 40,
    status: 'alive',
    crisis: {
      type: 'prosthetic',
      severity: 96,
      labelVi: 'Hội chứng đào thải cơ khí',
      labelEn: 'Prosthetic Rejection'
    }
  }, () => 0.5);
  simulateNpcAutonomousLife(crisisSurviveChar, () => 0.5);
  assert.equal(crisisSurviveChar.npcs.friend.injured, true);
  assert.equal(crisisSurviveChar.npcs.friend.injurySeverity, 'severe');
  assert.equal(crisisSurviveChar.npcs.friend.injuredAtAge, 29);
  assert.equal(crisisSurviveChar.npcs.friend.healsAtAge, 31);
}

// ----------------------------------------------------------------------------
// 7. Item 7: Mentor estrangement after 3 rebukes & Nemesis reckoning after 3 harassments
// ----------------------------------------------------------------------------
{
  const loopChar = createNewCharacter({ seed: 'npc-fix-loops', startAge: 28 });
  loopChar.npcs.mentor = ensureNpcAgency({
    role: 'mentor',
    nameVi: 'Vergilius',
    nameEn: 'Vergilius',
    archetype: 'veteran',
    bond: 15,
    status: 'alive'
  }, () => 0.5);
  loopChar.npcs.nemesis = ensureNpcAgency({
    role: 'nemesis',
    nameVi: 'Jae-heon',
    nameEn: 'Jae-heon',
    archetype: 'secretive',
    bond: 0,
    status: 'alive'
  }, () => 0.5);

  for (let i = 0; i < 3; i++) {
    loopChar.age = 28 + i;
    simulateNpcAutonomousLife(loopChar, () => 0.05);
  }

  assert.equal(loopChar.npcs.mentor.status, 'estranged', 'Mentor must become estranged after 3 low-bond rebukes');
  const reckoningThread = loopChar.weaver.pendingThreads.find((t) => t.eventId === 'csq_npc_rival_reckoning');
  assert.ok(reckoningThread, 'Nemesis must plant csq_npc_rival_reckoning after 3 harassments');
  assert.equal(reckoningThread.kind, 'major', 'csq_npc_rival_reckoning must be planted with kind="major"');
}

// ----------------------------------------------------------------------------
// 8. Item 8: Promotions for Syndicate, Workshop Artisan, Civilian, and Fixer Grade 4 -> 2
// ----------------------------------------------------------------------------
{
  const multiPromoChar = createNewCharacter({ seed: 'npc-fix-multi-promo', startAge: 30 });
  multiPromoChar.npcs.friend = ensureNpcAgency({
    role: 'friend',
    nameVi: 'Kuro',
    nameEn: 'Kuro',
    archetype: 'gambler',
    job: 'Syndicate',
    finger: 'Thumb',
    rank: 1,
    rankLabelVi: 'Thành viên The Thumb',
    rankLabelEn: 'The Thumb Member',
    bond: 50,
    status: 'alive'
  }, () => 0.5);
  multiPromoChar.npcs.partner = ensureNpcAgency({
    role: 'partner',
    nameVi: 'Mei',
    nameEn: 'Mei',
    archetype: 'veteran',
    job: 'Fixer',
    rank: 4,
    rankLabelVi: 'Fixer Grade 4',
    rankLabelEn: 'Grade 4 Fixer',
    bond: 60,
    status: 'alive'
  }, () => 0.5);
  multiPromoChar.npcs.spouse = ensureNpcAgency({
    role: 'spouse',
    nameVi: 'Ara',
    nameEn: 'Ara',
    archetype: 'tinkerer',
    job: 'Workshop Artisan',
    rank: 1,
    rankLabelVi: 'Thợ chế tác Workshop',
    rankLabelEn: 'Workshop Artisan',
    bond: 70,
    status: 'alive'
  }, () => 0.5);

  simulateNpcAutonomousLife(multiPromoChar, () => 0.02);
  assert.equal(multiPromoChar.npcs.friend.rank, 2, 'Syndicate NPC should promote from rank 1 to 2');
  assert.equal(multiPromoChar.npcs.partner.rank, 3, 'Grade 4 Fixer NPC at age >= 28 should promote to Grade 3');
  assert.equal(multiPromoChar.npcs.spouse.rank, 2, 'Workshop Artisan NPC should promote from rank 1 to 2');
}

// ----------------------------------------------------------------------------
// 9. Item 9: Childhood `friend` starts as `Child` in player's District and transitions at 18
// ----------------------------------------------------------------------------
{
  const kidFriend = makeNpc('friend', () => 0.3, { metAge: 0, regionId: 'T' });
  assert.equal(kidFriend.job, 'Child', 'Childhood friend created at age 0 must start with job="Child"');
  assert.ok(kidFriend.district.includes('District 20'), `Expected District 20 for regionId="T", got ${kidFriend.district}`);

  const growChar = createNewCharacter({ seed: 'npc-fix-grow', startAge: 18 });
  growChar.age = 18;
  growChar.regionId = 'T';
  growChar.npcs.friend = kidFriend;
  simulateNpcAutonomousLife(growChar, () => 0.5);
  assert.notEqual(growChar.npcs.friend.job, 'Child', 'Friend must transition to an adult career at age 18');
}

// ----------------------------------------------------------------------------
// 10. Item 10: `ensureNpcAgency` is pure and does NOT mutate input in place
// ----------------------------------------------------------------------------
{
  const rawInput = Object.freeze({
    role: 'partner',
    nameVi: 'PureCheck',
    nameEn: 'PureCheck',
    bond: 40,
    status: 'alive'
  });
  const result = ensureNpcAgency(rawInput, () => 0.5);
  assert.notEqual(result, rawInput, 'ensureNpcAgency must return a new object');
  assert.equal(rawInput.job, undefined, 'Frozen rawInput must not be mutated in place');
  assert.ok(result.job, 'Returned clone must have enriched job');

  // pickDungeonCompanion must not mutate char.npcs in place
  const pickChar = {
    age: 24,
    npcs: Object.freeze({
      partner: rawInput
    })
  };
  const picked = pickDungeonCompanion(pickChar);
  assert.ok(picked, 'pickDungeonCompanion should return companion info');
  assert.equal(pickChar.npcs.partner, rawInput, 'pickDungeonCompanion must not overwrite char.npcs[role]');

  // Shared helper single-source identity
  assert.equal(hasSynergyWith, hasSynergyWithFromConditions, 'hasSynergyWith must be imported from eventConditions.js');
  assert.equal(getNpcAgeFromInteractions, getNpcAgeFromPersonality, 'getNpcAge must be imported from npcPersonality.js');

  // Natural pendingCareerSwitch activation on high promoRoll
  const switchAutoChar = createNewCharacter({ seed: 'npc-fix-auto-switch', startAge: 25 });
  switchAutoChar.npcs.friend = ensureNpcAgency({
    role: 'friend',
    nameVi: 'Seon',
    nameEn: 'Seon',
    archetype: 'loyal',
    job: 'Civilian',
    rank: 0,
    bond: 50,
    status: 'alive'
  }, () => 0.5);
  simulateNpcAutonomousLife(switchAutoChar, () => 0.98);
  assert.equal(switchAutoChar.npcs.friend.pendingCareerSwitch, true, 'promoRoll >= 0.96 should set pendingCareerSwitch = true');
}

// ----------------------------------------------------------------------------
// 11. Item 11: `appendNpcMemory` preserves `pinned: true` memories beyond 6 entries
// (including dungeonSignature and dungeonClash companion memories)
// ----------------------------------------------------------------------------
{
  let mems = [
    { age: 0, vi: 'Ký ức gốc (pinned)', en: 'Origin memory (pinned)', pinned: true },
    { age: 18, vi: 'Cứu mạng (pinned)', en: 'Saved life (pinned)', pinned: true }
  ];
  for (let i = 1; i <= 8; i++) {
    mems = appendNpcMemory(mems, { age: 18 + i, vi: `Chuyện thường #${i}`, en: `Routine #${i}` });
  }
  assert.ok(mems.some((m) => m.vi === 'Ký ức gốc (pinned)'), 'First pinned memory must never be evicted');
  assert.ok(mems.some((m) => m.vi === 'Cứu mạng (pinned)'), 'Second pinned memory must never be evicted');
  const unpinnedCount = mems.filter((m) => !m.pinned).length;
  assert.equal(unpinnedCount, 6, 'Unpinned memories must be capped at 6');

  // Verify dungeonSignature headAlly memory is pinned and preserves earlier pinned memories
  const sigChar = createNewCharacter({ seed: 'npc-fix-sig-mem', startAge: 32 });
  sigChar.npcs.partner = ensureNpcAgency({
    role: 'partner',
    nameVi: 'Roland',
    nameEn: 'Roland',
    bond: 85,
    status: 'alive',
    memories: mems
  }, () => 0.5);
  const headSession = {
    id: 'dungeon_claw_judgment',
    signature: 'head',
    headAllies: [{ role: 'partner', nameVi: 'Roland', nameEn: 'Roland', used: false }]
  };
  resolveSignatureCombat({}, sigChar, headSession, { combatAction: 'headAlly', allyRole: 'partner' }, null, () => 0.9);
  const partnerMems = sigChar.npcs.partner.memories;
  assert.ok(partnerMems.some((m) => m.vi === 'Ký ức gốc (pinned)'), 'dungeonSignature must preserve old pinned memories');
  assert.ok(partnerMems.some((m) => m.vi.includes('The Head') && m.pinned === true), 'dungeonSignature headAlly memory must be pinned');

  // Verify dungeonClash settleStake memory is pinned and preserves earlier pinned memories
  const clashChar = createNewCharacter({ seed: 'npc-fix-clash-mem', startAge: 33 });
  clashChar.npcs.partner = ensureNpcAgency({
    role: 'partner',
    nameVi: 'Roland',
    nameEn: 'Roland',
    bond: 85,
    status: 'alive',
    memories: mems
  }, () => 0.5);
  settleStake(
    { moveCompanionBond: () => {}, def: () => ({ titleVi: 'Tàu WARP', titleEn: 'WARP Train' }) },
    clashChar,
    { id: 'dungeon_warp_train' },
    { id: 'npc', companion: { role: 'partner', nameVi: 'Roland', nameEn: 'Roland' } },
    'win'
  );
  const clashMems = clashChar.npcs.partner.memories;
  assert.ok(clashMems.some((m) => m.vi === 'Ký ức gốc (pinned)'), 'dungeonClash must preserve old pinned memories');
  assert.ok(clashMems.some((m) => m.vi.includes('Tàu WARP') && m.pinned === true), 'dungeonClash deciding blow memory must be pinned');
}

console.log('All 11 NPC Mechanics Fixes verified successfully!');
