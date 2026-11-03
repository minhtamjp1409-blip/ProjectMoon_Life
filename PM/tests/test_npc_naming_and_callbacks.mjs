import assert from 'node:assert/strict';
import {
  createNewCharacter,
  createRNG,
  sanitizeNpcName,
  getNpcNamingPrompt,
  syncNpcNamingPrompt,
  applyNpcName,
  interpolateText
} from '../src/engine/gameEngine.js';
import { makeNpc } from '../src/data/birthStories.js';
import { applyChoiceExtras, applyNpcFate } from '../src/engine/director.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';
import { resolveMinor, runDueItems, LIFE_MINORS } from '../src/engine/yearPlanner.js';
import { NPC_CHOICE_CALLBACKS } from '../src/data/lifeNpcCallbacks.js';
import { chapterFor } from '../src/engine/chapters.js';

// ---------------------------------------------------------------------------
// 121a: Naming close NPCs (friend, lover, spouse)
// ---------------------------------------------------------------------------
{
  // 1. sanitizeNpcName trims and caps at 24 characters
  assert.equal(sanitizeNpcName('   Minh Tâm   '), 'Minh Tâm');
  assert.equal(sanitizeNpcName('123456789012345678901234567890').length, 24);
  assert.equal(sanitizeNpcName('   '), '');

  // 2. Prompt text matches role
  const friendPrompt = getNpcNamingPrompt('friend', { age: 0 });
  assert.equal(friendPrompt.questionVi, 'Đứa trẻ đó tên gì? (để trống để ngẫu nhiên)');
  const loverPrompt = getNpcNamingPrompt('lover', { age: 19 });
  assert.match(loverPrompt.questionVi, /Người thương của bạn tên gì/);
  const spousePrompt = getNpcNamingPrompt('spouse', { age: 24 });
  assert.match(spousePrompt.questionVi, /Người bạn đời của bạn tên gì/);

  // 3. Birth friend waits for pendingBirthLogs, then prompts and updates log_birth_3 + both nameVi/nameEn
  let char = null;
  for (let i = 0; i < 40; i++) {
    const c = createNewCharacter({ customName: 'Test', seed: `naming_${i}` });
    if (c.npcs?.friend) {
      char = c;
      break;
    }
  }
  assert.ok(char && char.npcs?.friend, 'Should find a seed with childhood friend at birth');
  assert.equal(char.npcs.friend.needsNaming, true);

  // Simulate pendingBirthLogs still active -> does not open prompt yet
  char.pendingBirthLogs = [{ id: 'log_birth_3', age: 0, vi: `Bạn quen ${char.npcs.friend.nameVi}.`, en: `You met ${char.npcs.friend.nameEn}.` }];
  syncNpcNamingPrompt(char, { autoPlay: false, waitForBirthPrologue: true });
  assert.equal(char.pendingNpcNaming, null, 'Should wait until birth logs finish revealing');

  // Once birth logs finish revealing -> opens prompt
  const oldRandomName = char.npcs.friend.nameVi;
  char.logs.push(...char.pendingBirthLogs);
  char.pendingBirthLogs = [];
  syncNpcNamingPrompt(char, { autoPlay: false, waitForBirthPrologue: true });
  assert.ok(char.pendingNpcNaming, 'Should open pendingNpcNaming after birth logs finish');
  assert.equal(char.pendingNpcNaming.role, 'friend');

  // Apply custom name -> updates nameVi, nameEn, log_birth_3, and chapter loss card (116)
  char = applyNpcName(char, '  Hải Đăng  ');
  assert.equal(char.pendingNpcNaming, null);
  assert.equal(char.npcs.friend.nameVi, 'Hải Đăng');
  assert.equal(char.npcs.friend.nameEn, 'Hải Đăng');
  assert.equal(char.npcs.friend.needsNaming, false);
  assert.equal(char.npcs.friend.namedPrompted, true);
  const birthFriendLog = char.logs.find((l) => l.id === 'log_birth_3');
  assert.ok(birthFriendLog.vi.includes('Hải Đăng') && !birthFriendLog.vi.includes(oldRandomName), 'log_birth_3 should use custom name');
  assert.ok(birthFriendLog.en.includes('Hải Đăng'), 'log_birth_3 English should use custom name');

  // Verify Batch 116 loss chapter uses custom name
  const beforeDeath = structuredClone(char);
  beforeDeath.npcs.friend.bond = 65;
  const afterDeath = structuredClone(beforeDeath);
  applyNpcFate(afterDeath, 'friend', 'dead', afterDeath.age);
  const lossChapter = chapterFor(beforeDeath, afterDeath);
  assert.ok(lossChapter && lossChapter.kind === 'loss', 'Loss chapter should trigger');
  assert.equal(lossChapter.titleVi, 'Hải Đăng');
  assert.equal(lossChapter.titleEn, 'Hải Đăng');
  assert.ok(lossChapter.vi.includes('Hải Đăng') && lossChapter.en.includes('Hải Đăng'), 'Loss chapter should use custom NPC name');

  // 4. Leaving blank keeps random name and marks prompted
  const charBlank = createNewCharacter({ customName: 'BlankTest', seed: 'naming_blank' });
  charBlank.alive = true;
  delete charBlank.npcs.friend;
  charBlank.npcs.lover = makeNpc('lover', createRNG('lover_blank'), { metAge: 18 });
  const randomLoverName = charBlank.npcs.lover.nameVi;
  syncNpcNamingPrompt(charBlank, { autoPlay: false });
  assert.equal(charBlank.pendingNpcNaming?.role, 'lover');
  const resolvedBlank = applyNpcName(charBlank, '   ');
  assert.equal(resolvedBlank.npcs.lover.nameVi, randomLoverName);
  assert.equal(resolvedBlank.npcs.lover.needsNaming, false);
  assert.equal(resolvedBlank.npcs.lover.namedPrompted, true);

  // 5. Lover promoted to spouse does not prompt a second time
  const deltas = [];
  applyChoiceExtras(resolvedBlank, [{ promote: { from: 'lover', to: 'spouse' } }], deltas, createRNG('promo'));
  assert.ok(resolvedBlank.npcs.spouse, 'Lover should promote to spouse');
  assert.equal(resolvedBlank.npcs.spouse.needsNaming, false);
  assert.equal(resolvedBlank.npcs.spouse.namedPrompted, true);
  syncNpcNamingPrompt(resolvedBlank, { autoPlay: false });
  assert.equal(resolvedBlank.pendingNpcNaming, null, 'Promoted spouse must not prompt a second time');

  // 6. AutoPlay skips prompt and keeps random name
  const charAuto = createNewCharacter({ customName: 'AutoTest', seed: 'naming_auto' });
  charAuto.alive = true;
  delete charAuto.npcs.friend;
  charAuto.npcs.lover = makeNpc('lover', createRNG('lover_auto'), { metAge: 19 });
  const autoRandomName = charAuto.npcs.lover.nameVi;
  syncNpcNamingPrompt(charAuto, { autoPlay: true });
  assert.equal(charAuto.pendingNpcNaming, null, 'AutoPlay must skip naming modal');
  assert.equal(charAuto.npcs.lover.nameVi, autoRandomName);
  assert.equal(charAuto.npcs.lover.needsNaming, false);
  assert.equal(charAuto.npcs.lover.namedPrompted, true);

  // 7. Old save without needsNaming flag does not prompt
  const oldSaveChar = createNewCharacter({ customName: 'OldSave', seed: 'old_save' });
  oldSaveChar.alive = true;
  oldSaveChar.npcs.friend = { role: 'friend', nameVi: 'Cố Nhân', nameEn: 'Cố Nhân', bond: 40, status: 'alive', deceased: false };
  delete oldSaveChar.npcs.lover;
  delete oldSaveChar.npcs.spouse;
  syncNpcNamingPrompt(oldSaveChar, { autoPlay: false });
  assert.equal(oldSaveChar.pendingNpcNaming, null, 'Old save NPC without needsNaming must not prompt');
}

// ---------------------------------------------------------------------------
// 121b: Short NPC choice callback scenes
// ---------------------------------------------------------------------------
{
  // 1. At least 12 callback scenes, all once: true and memMinYears >= 2
  assert.ok(NPC_CHOICE_CALLBACKS.length >= 12, `Expected >= 12 NPC callbacks, got ${NPC_CHOICE_CALLBACKS.length}`);
  for (const cb of NPC_CHOICE_CALLBACKS) {
    assert.equal(cb.once, true, `${cb.id} must have once: true`);
    assert.ok((cb.need?.memMinYears || 0) >= 2, `${cb.id} must require memMinYears >= 2`);
  }

  // 2. Resolving an NPC minor choice records choiceId, eventId, role, and age in char.memory
  const rng = createRNG('cb_test');
  let char = createNewCharacter({ customName: 'CbTester', seed: 'cb_test' });
  char.alive = true;
  char.age = 5;
  char.npcs.friend = makeNpc('friend', rng, { metAge: 0, nameVi: 'Linh', nameEn: 'Linh' });
  const candyDef = LIFE_MINORS.find((m) => m.id === 'm_k_candy');
  char.pendingMinor = {
    id: candyDef.id,
    t: 0.2,
    vi: interpolateText(candyDef.vi, char),
    en: interpolateText(candyDef.en, char),
    choices: candyDef.choices,
    ignore: candyDef.ignore,
    remainingMs: 15000
  };
  char = resolveMinor(char, 0, rng);
  const memEntry = (char.memory || []).find((m) => m.key === 'npc_candy_bite');
  assert.ok(memEntry, 'Should record npc_candy_bite memory');
  assert.equal(memEntry.choiceId, 'm_k_candy_c0');
  assert.equal(memEntry.eventId, 'm_k_candy');
  assert.equal(memEntry.role, 'friend');
  assert.equal(memEntry.age, 5);

  // 3. Callback is not eligible until 2 years later, and once run, never repeats
  const cbDef = NPC_CHOICE_CALLBACKS.find((d) => d.id === 'cb_npc_candy_bite');
  char.age = 6;
  assert.equal(matchesEventContext(cbDef, char), false, 'Should not match only 1 year after choice');
  char.age = 7;
  assert.equal(matchesEventContext(cbDef, char), true, 'Should match 2 years after choice');

  char.plan = [{ kind: 'daily', id: cbDef.id, t: 0.1, seasonIdx: 0 }];
  char = runDueItems(char, 20, rng).char;
  assert.ok(char.seenEvents.includes(cbDef.id), 'Running once:true daily should add id to seenEvents');
  const cbLog = char.logs.find((l) => l.key === cbDef.id);
  assert.ok(cbLog && cbLog.vi.includes('Linh'), 'Callback log should interpolate friend name');

  // Cannot run a second time in the same life
  char.plan = [{ kind: 'daily', id: cbDef.id, t: 0.5, seasonIdx: 2 }];
  const logsBefore = char.logs.length;
  char = runDueItems(char, 60, rng).char;
  assert.equal(char.logs.length, logsBefore, 'once:true callback daily must not fire twice in the same life');

  // 4. Lover choice callback still works after lover marries into spouse
  char.age = 18;
  char.npcs.lover = makeNpc('lover', rng, { metAge: 17, nameVi: 'Mai', nameEn: 'Mai' });
  char.memory.push({ key: 'npc_lover_awning_coat', choiceId: 'm5_lover_under_awning_c0', eventId: 'm5_lover_under_awning', role: 'lover', age: 18 });
  applyChoiceExtras(char, [{ promote: { from: 'lover', to: 'spouse' } }], [], rng);
  char.age = 21;
  const awningCb = NPC_CHOICE_CALLBACKS.find((d) => d.id === 'cb_npc_lover_awning');
  assert.equal(matchesEventContext(awningCb, char), true, 'Lover callback should still match after marrying into spouse');
  assert.ok(interpolateText(awningCb.vi, char).includes('Mai'), 'Lover placeholder should resolve to spouse name');
}

console.log('test_npc_naming_and_callbacks: OK');
