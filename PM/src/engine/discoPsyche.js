import { normalizeScars, getScarProfile } from './scarModel.js';
import { npcIsActive } from './eventConditions.js';
import { REGIONS } from '../data/worldData.js';
import { weightedOutcomes } from './outcomeOdds.js';

// ============================================================================
// DISCO PSYCHE ENGINE: Project Moon x Disco Elysium Narrative Intelligence
// Generates internal psyche voice interjections, dynamic skill checks (Red/White),
// and modifier breakdowns based on character stats, scars, and past deeds.
// ============================================================================

export const PSYCHE_FACULTIES = {
  VOLITION: {
    id: 'volition',
    nameVi: 'Ý Chí Kiên Định · Volition',
    nameEn: 'Stoic Volition · Ayin',
    color: '#63b3ed', // Cobalt ice blue
    icon: '🛡️',
    mottoVi: 'Nghiến răng mà đứng. Đừng để vầng dương hay bóng đêm nuốt chửng',
    mottoEn: 'Grit your teeth. Yield not to the blinding sun nor the abyss'
  },
  CARMEN: {
    id: 'carmen',
    nameVi: 'Vầng Thái Dương Carmen · Inland Empire',
    nameEn: 'Carmen’s Blinding Sun · Inland Empire',
    color: '#ecc94b', // Blinding golden sun
    icon: '☀️',
    mottoVi: 'Buông tay ra. Bạn không cần làm người tử tế cho ai xem',
    mottoEn: 'Let go. You owe nobody a hollow human shape'
  },
  SURVIVAL: {
    id: 'survival',
    nameVi: 'Bản Năng Sinh Tồn · Half-Light',
    nameEn: 'Backstreets Instinct · Half-Light',
    color: '#f56565', // Danger crimson
    icon: '⚡',
    mottoVi: 'Tay trong túi áo. Kẻ chớp mắt trước là kẻ nằm xuống',
    mottoEn: 'Hand on your blade. The first to blink goes down'
  },
  LOGIC: {
    id: 'logic',
    nameVi: 'Toan Tính The City · Interfacing & Logic',
    nameEn: 'City Calculus · Logic & Taboo',
    color: '#4fd1c5', // Cold teal
    icon: '⚖️',
    mottoVi: 'Mỗi hơi thở đều tính bằng Ahn, mỗi lỗi lầm đều trả bằng đầu',
    mottoEn: 'Every breath costs Ahn; every slip pays with blood'
  },
  DRAMA: {
    id: 'drama',
    nameVi: 'Khí Phách Nghệ Thuật & Hiệp Sĩ · Drama',
    nameEn: 'Poetic Passion · Drama & Savoir Faire',
    color: '#b794f4', // Royal purple / La Mancha
    icon: '🎭',
    mottoVi: 'Nếu phải ngã xuống, hãy để lũ khán giả phía dưới phải nín thở',
    mottoEn: 'If fall you must, leave the gallery breathless'
  }
};

function hashSeed(input) {
  let hash = 2166136261;
  const text = String(input || '');
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function resolveRegionNames(char) {
  const regionId = char?.regionId || char?.birthRegionId || '';
  if (!regionId) return { vi: 'khu vực này', en: 'this district', shortVi: 'khu này', shortEn: 'this ward' };
  const found = REGIONS.find((r) => r.id === regionId);
  if (!found) {
    return regionId === 'OUTSKIRTS'
      ? { vi: 'vùng Outskirts', en: 'the Outskirts', shortVi: 'Outskirts', shortEn: 'the Outskirts' }
      : { vi: `District ${regionId}`, en: `District ${regionId}`, shortVi: `District ${regionId}`, shortEn: `District ${regionId}` };
  }
  const baseName = found.nameEn || found.nameVi || `District ${found.ward || regionId}`;
  return {
    vi: baseName,
    en: baseName,
    shortVi: found.ward ? `District ${found.ward}` : baseName,
    shortEn: found.ward ? `District ${found.ward}` : baseName
  };
}

const isNpcDead = (npc) => Boolean(npc && (npc.alive === false || npc.deceased || npc.status === 'dead'));

function resolveScarLabel(rawScar, char) {
  const parentName = char?.lineage?.parentName || 'Tiền Nhân';
  const partner = char?.npcs?.partner?.nameVi || 'Cộng sự';
  const spouse = char?.npcs?.spouse?.nameVi || 'Người thương';
  const child = char?.npcs?.child?.nameVi || 'Đứa con nhỏ';
  const mentor = char?.npcs?.mentor?.nameVi || 'Sư phụ';
  const friend = char?.npcs?.friend?.nameVi || 'đứa bạn cùng hẻm';
  return String(rawScar || '')
    .replace(/\{friend\}/g, friend)
    .replace(/\{parentName\}/g, parentName)
    .replace(/\{parent\}/g, parentName)
    .replace(/\{partner\}/g, partner)
    .replace(/\{spouse\}/g, spouse)
    .replace(/\{child\}/g, child)
    .replace(/\{mentor\}/g, mentor);
}

function pickNpcAnchors(char) {
  const entries = Object.entries(char?.npcs || {}).filter(([, npc]) => npc && (npc.nameVi || npc.nameEn));
  if (!entries.length) return { departed: null, active: null };

  const departedPriority = ['spouse', 'lover', 'friend', 'mentor', 'child', 'rival', 'partner', 'father', 'mother'];
  let departed = null;
  for (const role of departedPriority) {
    const match = entries.find(([r, npc]) => r === role && isNpcDead(npc));
    if (match) { departed = { role: match[0], npc: match[1] }; break; }
  }
  if (!departed) {
    const anyDead = entries.find(([, npc]) => isNpcDead(npc));
    if (anyDead) departed = { role: anyDead[0], npc: anyDead[1] };
  }

  const activePriority = ['rival', 'mentor', 'spouse', 'lover', 'friend', 'child', 'partner', 'ward', 'mentee'];
  let active = null;
  for (const role of activePriority) {
    const match = entries.find(([r, npc]) => r === role && npcIsActive(npc));
    if (match) { active = { role: match[0], npc: match[1] }; break; }
  }
  return { departed, active };
}

function matchScarForEvent(char, eventText) {
  const { scars } = normalizeScars(char || {});
  if (!scars.length) return null;
  const isWingOrDeal = /\bwing\b|\bcorp\b|hợp đồng|giao kèo|người đại diện|chiêu mộ/i.test(eventText);
  const isCombatOrThreat = /sweeper|3:13|phục kích|ám sát|huyết|đấu tay đôi|súng|nhân chứng|trục xuất|bệnh xá|cấp cứu/i.test(eventText);
  const isCraftOrWork = /xưởng rèn|sửa giáp|sửa vũ khí|ủy thác|commission|đơn hàng rèn/i.test(eventText);

  for (const scar of scars) {
    const profile = getScarProfile(scar);
    const tag = profile?.tag || 'injury';
    const isBurnOrWingScar = /bỏng|cháy|wing|tập đoàn|corp|lao công/i.test(scar);
    if ((tag === 'witness' || tag === 'faction') && isWingOrDeal) return { scar, profile, tag, strong: true };
    if (isBurnOrWingScar && isWingOrDeal) return { scar, profile, tag, strong: true };
    if ((tag === 'injury' || tag === 'survivor' || tag === 'trauma') && (isCombatOrThreat || isWingOrDeal)) return { scar, profile, tag, strong: false };
    if ((tag === 'weapon' || tag === 'craft') && isCraftOrWork) return { scar, profile, tag, strong: true };
  }
  return null;
}

/**
 * Determines whether a concrete inner-voice link matches the current moment.
 * Returns null unless anchored in an actual scar, District, NPC, or high Resonance.
 */
export function getPsycheInterjection(char, event, _lang = 'vi') {
  if (!char || !event) return null;

  const eventText = [
    event.titleVi, event.titleEn,
    event.displayVi, event.displayEn,
    event.vi, event.en
  ].filter(Boolean).join(' ').toLowerCase();

  const age = Number(char.age || 0);
  if (age < 6 && !(event.major)) return null;

  const resonance = Number(char.resonance || 0);
  const sanity = Number(char.stats?.sanity ?? 50);
  const heat = Number(char.heat || 0);
  const taboo = Number(char.taboo || 0);
  const roll = hashSeed(`${char.seed || char.name || ''}|${event.id || ''}|${age}`) % 100;
  const district = resolveRegionNames(char);
  const { departed: departedNpc, active: activeNpc } = pickNpcAnchors(char);

  const isContractOrSecret = /hợp đồng|giao kèo|điều khoản|bí mật|chữ ký|arbiter|prescript|contract|fine print/i.test(eventText);
  const isRelationshipOrDebt = /phản bội|món nợ|đồng đội|cộng sự|tri kỷ|hôn ước|office|bỏ rơi/i.test(eventText);
  const isDistrictPressure = /syndicate|taboo|thuế thời gian|giờ giới nghiêm|the head|cưỡng chế|outskirts/i.test(eventText);

  // 1. Concrete Scar anchor
  const scarMatch = matchScarForEvent(char, eventText);
  if (scarMatch && (scarMatch.strong ? (event.major || roll < 50) : roll < 14)) {
    const scarText = resolveScarLabel(scarMatch.scar, char);
    const scarEn = scarMatch.profile?.labelEn?.toLowerCase() || 'old scar';
    const isWoundOrBody = /^(vết|nhát|thương tật|cơn hoảng|bỏng|lưng bỏng|cánh tay bỏng|bả vai|cổ tay|con mắt|đôi mắt|nửa mạn sườn|khối u)/i.test(scarText);
    if (scarMatch.tag === 'witness' || scarMatch.tag === 'faction') {
      return {
        faculty: PSYCHE_FACULTIES.SURVIVAL,
        textVi: isWoundOrBody
          ? `${scarText} nhói lên dưới lớp áo, nhắc bạn những lời hứa của đám tay to ở ${district.shortVi} luôn giấu cái giá viết bằng máu.`
          : `Chuyện cũ "${scarText}" nhắc bạn những lời hứa của đám tay to ở ${district.shortVi} luôn giấu cái giá viết bằng máu.`,
        textEn: isWoundOrBody
          ? `The ${scarEn} stirs under your coat, reminding you that offers in ${district.shortEn} always carry a hidden cost written in blood.`
          : `An old memory reminds you that promises from the big players in ${district.shortEn} always hide a price written in blood.`
      };
    }
    if (scarMatch.tag === 'weapon' || scarMatch.tag === 'craft') {
      return {
        faculty: PSYCHE_FACULTIES.LOGIC,
        textVi: `Thói quen gắn với "${scarText}" giữ nhịp thở bạn đều lại để cân đo thiệt hơn trước khi nhận kèo ở ${district.shortVi}.`,
        textEn: `Muscle memory from that ${scarEn} steadies your breathing so you measure every cut and risk on ${district.shortEn} turf.`
      };
    }
    return {
      faculty: PSYCHE_FACULTIES.VOLITION,
      textVi: isWoundOrBody
        ? `${scarText} bỗng giật nhẹ, buộc bạn đặt sẵn tay lên chỗ thoát hiểm quen thuộc của ${district.shortVi} rồi mới mở lời.`
        : `Nhớ tới "${scarText}", bạn đặt sẵn tay lên chỗ thoát hiểm quen thuộc của ${district.shortVi} rồi mới mở lời.`,
      textEn: isWoundOrBody
        ? `Your ${scarEn} throbs without warning, nudging your stance toward the nearest exit in ${district.shortEn} before you speak.`
        : `Remembering what you carry, you keep a hand near your usual way out of ${district.shortEn} before you speak.`
    };
  }

  // 1b. Wild Hunt rider oath anchored in Wuthering Hills fallout
  if ((char.flags || []).includes('WildHuntRider') && roll < (event.major ? 16 : 5)) {
    return {
      faculty: PSYCHE_FACULTIES.DRAMA,
      textVi: `Tiếng gió rít ở ${district.shortVi} vẫn kéo theo vó ngựa Wild Hunt cũ, nhắc bạn đừng tin bất kỳ lời thề trung thành nào tối nay.`,
      textEn: `The wind over ${district.shortEn} still carries old Wild Hunt hooves, warning against tonight's sworn vows.`
    };
  }

  // 2. High Resonance spotting contract loopholes or departed echoes
  if (resonance >= 42 && isContractOrSecret && (event.major || roll < 60)) {
    if (departedNpc) {
      const npcVi = departedNpc.npc.nameVi || departedNpc.npc.nameEn;
      const npcEn = departedNpc.npc.nameEn || npcVi;
      return {
        faculty: PSYCHE_FACULTIES.CARMEN,
        textVi: `Cộng hưởng lên cao kéo theo giọng ${npcVi} lướt qua kẽ hở tờ giao kèo ở ${district.shortVi}, chỉ đúng dòng chữ ký dễ mất mạng.`,
        textEn: `High Resonance carries ${npcEn}'s voice across the ${district.shortEn} contract, pointing straight at the clause that costs your neck.`
      };
    }
    return {
      faculty: PSYCHE_FACULTIES.CARMEN,
      textVi: `Cộng hưởng lên cao làm dòng chữ nhỏ ở cuối kèo ${district.shortVi} hiện rõ từng điều khoản gài bẫy người ký vội.`,
      textEn: `High Resonance sharpens the fine print on the ${district.shortEn} deal until every buried penalty clause stands out.`
    };
  }

  // 3. Low sanity or high resonance hearing a concrete departed NPC
  if ((sanity <= 16 || resonance >= 60) && departedNpc && roll < 14) {
    const npcVi = departedNpc.npc.nameVi || departedNpc.npc.nameEn;
    const npcEn = departedNpc.npc.nameEn || npcVi;
    return {
      faculty: PSYCHE_FACULTIES.CARMEN,
      textVi: `Đầu óc căng đến mức tiếng bước chân ngoài hành lang ${district.shortVi} nghe hệt như giọng ${npcVi} gọi bạn quay lại.`,
      textEn: `Your nerves fray so thin that footsteps down the ${district.shortEn} hall sound exactly like ${npcEn} calling you back.`
    };
  }

  // 4. Concrete active NPC anchor on social/debt/alliance moments (never dead/missing/estranged)
  if (activeNpc && isRelationshipOrDebt && roll < (event.major ? 14 : 6)) {
    const npcVi = activeNpc.npc.nameVi || activeNpc.npc.nameEn;
    const npcEn = activeNpc.npc.nameEn || npcVi;
    if (activeNpc.role === 'rival' || activeNpc.role === 'mentor') {
      return {
        faculty: PSYCHE_FACULTIES.DRAMA,
        textVi: `Lời ${npcVi} dặn hồi còn chạm mặt nhau ở ${district.shortVi} vang lại đúng lúc bạn chuẩn bị đặt cược bằng thể diện của mình.`,
        textEn: `What ${npcEn} told you back in ${district.shortEn} returns just as you are about to wager your own name.`
      };
    }
    return {
      faculty: PSYCHE_FACULTIES.VOLITION,
      textVi: `Bạn chợt nghĩ tới ${npcVi} đang chờ ở ${district.shortVi} trước khi quyết định xem ván này có đáng mang thêm nợ về nhà hay không.`,
      textEn: `You picture ${npcEn} waiting in ${district.shortEn} before deciding whether tonight's gamble is worth bringing home.`
    };
  }

  // 5. Concrete District pressure (high heat, taboo, or explicit jurisdiction stakes)
  if ((heat >= 55 || taboo >= 1 || (isDistrictPressure && char.regionId)) && roll < (event.major ? 10 : 4)) {
    if (heat >= 55) {
      return {
        faculty: PSYCHE_FACULTIES.SURVIVAL,
        textVi: `Mức Heat đang rát sau gáy khiến đầu óc bạn tự rà lại từng ngõ thoát khỏi ${district.shortVi} trước khi gật đầu.`,
        textEn: `With Heat pressing at your collar, your eyes count every alley leading out of ${district.shortEn} before you nod.`
      };
    }
    return {
      faculty: PSYCHE_FACULTIES.LOGIC,
      textVi: `Luật ngầm ở ${district.vi} chưa bao giờ bỏ sót người đọc lướt điều khoản phụ sau giờ giới nghiêm.`,
      textEn: `Unwritten rules in ${district.en} never spare anyone who skims the side clauses after curfew.`
    };
  }

  return null;
}

/**
 * Calculates Disco Elysium style skill check metadata for a choice
 */
export function evaluateDiscoChoiceCheck(choice, char) {
  const rawOutcomes = choice.outcomes || choice.out;
  if (!Array.isArray(rawOutcomes) || rawOutcomes.length <= 1) {
    return null;
  }

  const available = weightedOutcomes(choice, char);
  const first = available.find((entry) => entry.outcome === rawOutcomes[0]);
  if (!first || available.length <= 1) return null;
  const totalWeight = available.reduce((sum, entry) => sum + entry.weight, 0);
  if (totalWeight <= 0) return null;

  const isRedCheck = Boolean(
    choice.openEgoModal ||
    choice.openColorModal ||
    choice.flagsAdd?.includes('ColorFixer') ||
    choice.flagsAdd?.includes('EGOAwakened') ||
    choice.flagsAdd?.includes('Distorted') ||
    choice.scarsAdd?.length > 0 ||
    rawOutcomes.some(o => o.flagsAdd?.includes('ColorFixer') || o.flagsAdd?.includes('EGOAwakened') || o.flagsAdd?.includes('Distorted') || o.deathCauseVi)
  );

  return {
    isRedCheck,
    checkType: isRedCheck ? 'RED CHECK' : 'WHITE CHECK',
    badgeVi: isRedCheck ? 'THỬ THÁCH ĐỎ · Nhánh đầu' : 'TỶ LỆ NHÁNH ĐẦU',
    badgeEn: isRedCheck ? 'RED CHECK · First outcome' : 'FIRST OUTCOME CHANCE',
    successPct: Math.round(first.weight / totalWeight * 100),
    modifiers: []
  };
}
