// Deaths, companion saves and sanity breakdowns.
import { LIFE_ENDINGS } from '../data/lifeEndings.js';
import { SEASONS, clamp, endSentence, evaluateCharacterAchievements } from './gameEngine.js';
import { addScar } from './scarModel.js';
import { colorTrialCompanionOf, npcIsActive, recordColorTrialCompanion } from './eventConditions.js';
import { rememberResonance } from './awakeningProgress.js';
import { tryItemAutoRevive } from './careerPipeline.js';

/**
 * Checks if a high-bond Partner or Spouse intercepts a fatal blow (Death Save Mechanic)
 */
/** A Distortion does not just die of its wounds; someone was sent to make sure. */
export function woundDeath(char, vi, en) {
  if (!char.flags.includes('Distorted')) return [vi, en];
  return [
    'Bị một đội Fixer do Hana cử tới xử lý như một Distortion. Hồ sơ của bạn được đóng lại trong cùng ngày',
    'Put down as a Distortion by a Fixer team Hana sent. Your file was closed the same day'
  ];
}

export function applyFatalOrCompanionSave(char, deathCauseVi, deathCauseEn) {
  if (tryItemAutoRevive(char)) {
    char.logs.push({
      id: `log_ampoule_revive_${char.age}_${Date.now()}`,
      age: char.age,
      season: SEASONS[char.seasonIdx || 0],
      type: 'miracle',
      vi: '[Ống Tiêm K Corp Tự Động Kích Hoạt] Khi tim bạn vừa ngừng đập, dung dịch sinh học màu xanh lá của K Corp tự động bơm thẳng vào động mạch chủ. Thịt và xương gãy liền lại trong cơn đau mà bạn không muốn nhớ. Vết thương lẽ ra đã giết bạn.',
      en: '[K Corp Ampoule Auto-Activated] As your heart flatlined, green K Corp biomass auto-injected into your aorta. Flesh and broken bone knit together in a pain you would rather not remember. The wound should have killed you.'
    });
    evaluateCharacterAchievements(char);
    return;
  }

  // Companion Sacrifice (Death Save): Strictly ONCE per lifetime, requires supreme Bond (>= 90)
  const saviorKey = !char.usedDeathSave
    ? ['spouse', 'partner', 'friend', 'mentor'].find(
        k => char.npcs?.[k] &&
             !char.npcs[k].deceased &&
             char.npcs[k].status === 'alive' &&
             (char.npcs[k].bond || 0) >= (['spouse', 'partner'].includes(k) ? 90 : 95)
      )
    : null;

  if (saviorKey) {
    char.usedDeathSave = true; // Exceeded lifetime quota - no infinite lives!
    const savior = char.npcs[saviorKey];
    char.npcs[saviorKey] = { ...savior, deceased: true, status: 'dead', fateAge: char.age };
    if (saviorKey === 'spouse') {
      char.flags = char.flags.filter(f => f !== 'Married');
      if (!char.flags.includes('Widowed')) char.flags.push('Widowed');
    } else if (saviorKey === 'partner') {
      if (!char.flags.includes('PartnerLost')) char.flags.push('PartnerLost');
    } else if (saviorKey === 'friend') {
      if (!char.flags.includes('FriendLost')) char.flags.push('FriendLost');
    } else if (saviorKey === 'mentor') {
      if (!char.flags.includes('MentorLost')) char.flags.push('MentorLost');
    }
    char.stats.health = 20;
    char.stats.sanity = clamp(char.stats.sanity - 45, 1, 100);
    char.resonance = clamp((char.resonance || 0) + 40, 0, 100);
      rememberResonance(char, 40);
    if (!char.unlockedRecords.includes('savior_sacrifice')) {
      char.unlockedRecords.push('savior_sacrifice');
    }
    const scarName = `${savior.nameVi} đã chết thay bạn`;
    addScar(char, scarName);
    char.logs.push({
      id: `log_savior_${char.age}_${saviorKey}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'miracle',
      vi: `[${savior.nameVi}] Đòn đó lẽ ra đã giết bạn. ${savior.nameVi} bước vào giữa, và nhận trọn nhát chém thay bạn. Người ấy chết trong tay bạn, máu tuôn xối xả mà bạn không thể làm gì để cứu vãn.`,
      en: `[${savior.nameEn}] That blow should have killed you. ${savior.nameEn} stepped between, taking the fatal strike instead. They died in your trembling arms amidst pooling gore.`
    });
    evaluateCharacterAchievements(char);
    return;
  }

  char.alive = false;
  char.stats.health = 0;
  char.deathCauseVi = deathCauseVi || 'Chết ở The City, như rất nhiều người khác';
  char.deathCauseEn = deathCauseEn || 'Died in the City, like so many others';
  char.logs.push({
    id: `log_death_${char.age}`,
    age: char.age,
    season: SEASONS[char.seasonIdx],
    type: 'death',
    vi: endSentence(char.deathCauseVi),
    en: endSentence(char.deathCauseEn)
  });
  evaluateCharacterAchievements(char);
}

/** Closes the chronicle without a death: no ampoule or companion can step in, and the epitaph tells why. */
export function closeLifeByChoice(char, lifeEnding, causeVi, causeEn) {
  char.alive = false;
  char.lifeEnding = lifeEnding || 'retired';
  char.deathCauseVi = causeVi || 'Rời khỏi câu chuyện theo ý mình';
  char.deathCauseEn = causeEn || 'Left the story on their own terms';
  const ending = LIFE_ENDINGS[char.lifeEnding];
  char.logs.push({
    id: `ending_${char.lifeEnding}_${char.age}`,
    age: char.age,
    season: SEASONS[char.seasonIdx || 0],
    type: 'major',
    vi: `[${ending?.titleVi || 'Kết thúc'}] ${char.deathCauseVi}.`,
    en: `[${ending?.titleEn || 'An ending'}] ${char.deathCauseEn}.`
  });
  evaluateCharacterAchievements(char);
}

export function handleSanityBreakdown(char, rng = Math.random) {
  if (!char.alive || char.stats.sanity > 0) return;
  if (char.flags.includes('Distorted') || char.flags.includes('EGOAwakened')) return;

  // Mental Anchor Save: Strictly ONCE per lifetime, requires Bond >= 85
  const saviorKey = !char.usedSanitySave
    ? ['spouse', 'partner', 'friend', 'mentor'].find(
        k => char.npcs?.[k] &&
             !char.npcs[k].deceased &&
             char.npcs[k].status === 'alive' &&
             (char.npcs[k].bond || 0) >= 85
      )
    : null;

  if (saviorKey) {
    char.usedSanitySave = true;
    const savior = char.npcs[saviorKey];
    char.stats.sanity = 22;
    char.stats.health = Math.max(15, char.stats.health);
    char.logs.push({
      id: `log_sanity_save_${char.age}_${saviorKey}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'miracle',
      vi: `[${savior.nameVi}] Khi bạn gục xuống trong cơn hoảng loạn tột cùng, ${savior.nameVi} đã ôm chặt lấy bạn, thức trắng nhiều đêm để gọi bạn trở về từ bờ vực điên loạn.`,
      en: `[${savior.nameEn}] When you collapsed in total panic, ${savior.nameEn} held you tight, staying awake through the nights to call you back from the abyss of madness.`
    });
    return;
  }

  // Without a close companion: 40% fatal panic, 60% survive with lasting psychological trauma & physical toll
  if (rng() < 0.40) {
    applyFatalOrCompanionSave(
      char,
      'Tâm thần sụp đổ hoàn toàn trong hoảng loạn',
      'Succumbed to catastrophic psychic breakdown'
    );
  } else {
    char.stats.sanity = 22;
    char.stats.health = clamp(char.stats.health - 16, 1, 100);
    addScar(char, 'Di chứng sụp đổ tinh thần');
    char.logs.push({
      id: `log_panic_survive_${char.age}_${Date.now()}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'danger',
      vi: 'Bạn trải qua những tuần lễ sống trong hoảng loạn tột cùng, gào thét trong bóng tối trước khi hồi tỉnh với những vết thương tâm lý vĩnh viễn.',
      en: 'You endured weeks of sheer terror, screaming into the darkness before regaining composure, forever bearing deep psychological scars.'
    });
  }
}

/**
 * The Color trial companion is a real NPC with a real wound: recorded by identity when they take the blow,
 * marked injured so they cannot fight, then either healed or moved to an advisor post by the aftermath.
 */
export function applyColorTrialCompanionState(char, flagsAdd = []) {
  if (!char.npcs) return;
  if (flagsAdd.includes('PartnerShieldedYouInColorTrial') && !char.colorTrialCompanion) {
    const rec = recordColorTrialCompanion(char);
    if (rec) char.npcs[rec.role] = { ...char.npcs[rec.role], injured: true, injurySeverity: 'severe', injuredAtAge: char.age };
  }
  const healed = flagsAdd.includes('CompanionFullyHealed');
  const advisor = flagsAdd.includes('CompanionSeniorAdvisor');
  if (!healed && !advisor) return;
  const npc = colorTrialCompanionOf(char) || (!char.colorTrialCompanion ? char.npcs.partner : null);
  const role = char.colorTrialCompanion?.role || 'partner';
  // Treatment never brings back someone who is already gone
  if (!npcIsActive(npc)) return;
  char.npcs[role] = {
    ...npc,
    injured: false,
    injurySeverity: null,
    ...(advisor ? { advisor: true, advisorSinceAge: char.age } : {}),
    bond: clamp((npc.bond ?? 0) + (healed ? 40 : 30), 0, 100),
    lastSeen: char.age
  };
}
