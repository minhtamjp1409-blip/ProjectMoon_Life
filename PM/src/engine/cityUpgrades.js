// ============================================================================
// CITY UPGRADES ENGINE:
// 1. Living Ancestor Echoes & Dynasty Hall of Legends
// 2. Inter-District Transit (WARP / Devyat') & Regional Singularity Passives
// 3. Apex Command Directives (Office / Syndicate / Wing / Color Leadership)
// 4. Workshop Singularity Imbuement (Relic + Equipment Synthesis)
// ============================================================================

import { REGIONS } from '../data/worldData.js';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Declared so tools/lint/lint_story.mjs registers flags granted by this module
export const CITY_UPGRADE_FLAGS = [
  { flagGranted: 'AncestorWasColor' },
  { flagGranted: 'AncestorWasDistortion' },
  { flagGranted: 'AncestorWasFingerBoss' },
  { flagGranted: 'AncestorWasWingExec' },
  { flagGranted: 'AncestorWasMeister' },
  { flagGranted: 'SingularityImbued' },
  { flagGranted: 'TCorpTimeBorrowed' },
  { flagGranted: 'ApexDirectiveIssued' }
];

// ============================================================================
// 1. LIVING ANCESTOR ECHOES & HALL OF LEGENDS
// ============================================================================

export function extractAncestorEchoProfile(char) {
  if (!char) return {};
  const flags = char.flags || [];
  const isColorAncestor = Boolean(
    flags.includes('ColorFixer') || char.job === 'Color Fixer' || char.fixerGrade === 0 || char.isColorFixer
  );
  const isDistortedAncestor = Boolean(flags.includes('Distorted') || char.job === 'Distortion');
  const isEgoAncestor = Boolean(flags.includes('EGOAwakened') || char.egoName);
  const isApexSyndicateAncestor = Boolean(char.job === 'Syndicate' && (char.fingerRank || 0) >= 2);
  const isApexWingAncestor = Boolean(char.job === 'Wing Employee' && (char.wingRank || 0) >= 2);
  const isApexWorkshopAncestor = Boolean(
    char.job === 'Workshop Craftsman' && ((char.workshopRank || 0) >= 2 || Boolean(char.craftWeapon))
  );

  return {
    isColorAncestor,
    colorTitle: char.customTitle || null,
    isDistortedAncestor,
    isEgoAncestor,
    egoName: char.egoName || null,
    isApexSyndicateAncestor,
    isApexWingAncestor,
    isApexWorkshopAncestor,
    finger: char.finger || null,
    fingerRank: char.fingerRank || 0,
    wingRank: char.wingRank || 0,
    workshopRank: char.workshopRank || 0,
    fixerGrade: char.fixerGrade ?? 9
  };
}

export function applyAncestorEchoInheritance(parentLegacy, state) {
  if (!parentLegacy || !state) return;
  const { flags, inheritedEchoes } = state;
  const addFlag = (f) => {
    if (!flags.includes(f)) flags.push(f);
  };

  const isColor = Boolean(
    parentLegacy.isColorAncestor ||
    parentLegacy.job === 'Color Fixer' ||
    (parentLegacy.rankTier && String(parentLegacy.rankTier).includes('Color'))
  );
  const isDistorted = Boolean(
    parentLegacy.isDistortedAncestor ||
    parentLegacy.job === 'Distortion' ||
    (parentLegacy.epitaphTitleEn && String(parentLegacy.epitaphTitleEn).includes('Distortion'))
  );
  const isFingerBoss = Boolean(
    parentLegacy.isApexSyndicateAncestor || (parentLegacy.fingerRank || 0) >= 2
  );
  const isWingExec = Boolean(
    parentLegacy.isApexWingAncestor || (parentLegacy.wingRank || 0) >= 2
  );
  const isMeister = Boolean(
    parentLegacy.isApexWorkshopAncestor || (parentLegacy.workshopRank || 0) >= 2
  );

  if (isColor) {
    addFlag('AncestorWasColor');
    state.rep = clamp((state.rep || 0) + 10, 1, 60);
    inheritedEchoes.push({
      labelVi: `Di sản Sắc Màu của ${parentLegacy.name}${parentLegacy.colorTitle ? ` (「${parentLegacy.colorTitle}」)` : ''}`,
      labelEn: `Color Legacy of ${parentLegacy.name}${parentLegacy.colorTitle ? ` ("${parentLegacy.colorTitle}")` : ''}`,
      impactVi: '+10 Uy danh khởi đầu, mở khóa Sự kiện Dư Ảnh Color Fixer tiền bối',
      impactEn: '+10 starting Reputation, unlocks Ancestral Color Echo events'
    });
  }

  if (isDistorted) {
    addFlag('AncestorWasDistortion');
    state.resonance = clamp((state.resonance || 0) + 10, 0, 100);
    inheritedEchoes.push({
      labelVi: `Dư chấn Distortion chưa tan của ${parentLegacy.name}`,
      labelEn: `Lingering Distortion Echo of ${parentLegacy.name}`,
      impactVi: '+10 Resonance khởi đầu, có thể chạm trán lãnh địa Distortion của đời trước',
      impactEn: '+10 starting Resonance, unlocks confrontation with ancestral Distortion territory'
    });
  }

  if (isFingerBoss) {
    addFlag('AncestorWasFingerBoss');
    state.network = clamp((state.network || 0) + 8, 1, 60);
    inheritedEchoes.push({
      labelVi: `Uy quyền Ngón Tay của ${parentLegacy.name}`,
      labelEn: `Finger Dominion of ${parentLegacy.name}`,
      impactVi: '+8 Mạng lưới khởi đầu, thuộc hạ cũ của đời trước vẫn còn giữ địa bàn',
      impactEn: '+8 starting Network, old Syndicate lieutenants remember your bloodline'
    });
  }

  if (isWingExec) {
    addFlag('AncestorWasWingExec');
    state.wealth = clamp((state.wealth || 0) + 12, 2, 85);
    inheritedEchoes.push({
      labelVi: `Quỹ tín thác Wing của ${parentLegacy.name}`,
      labelEn: `Wing Executive Trust of ${parentLegacy.name}`,
      impactVi: '+12 Ahn khởi đầu, mở khóa Két Sắt Sinh Trắc Học tại Nest',
      impactEn: '+12 starting Ahn, unlocks Biometric Nest Vault event'
    });
  }

  if (isMeister) {
    addFlag('AncestorWasMeister');
    state.rep = clamp((state.rep || 0) + 6, 1, 60);
    inheritedEchoes.push({
      labelVi: `Bản vẽ lò rèn của nghệ nhân ${parentLegacy.name}`,
      labelEn: `Master Atelier Blueprints of ${parentLegacy.name}`,
      impactVi: '+6 Uy danh khởi đầu, giảm chi phí khảm Singularity tại Workshop',
      impactEn: '+6 starting Reputation, discounts Singularity Imbuement at the Workshop'
    });
  }
}

export function summarizeDynastyHallOfLegends(pastLives = []) {
  const list = Array.isArray(pastLives) ? pastLives : [];
  let colorCount = 0;
  let distortionCount = 0;
  let egoCount = 0;
  let apexLeaderCount = 0;
  let totalWealth = 0;
  const legends = [];

  for (const life of list) {
    if (!life) continue;
    totalWealth += life.wealth || 0;
    const isColor = Boolean(
      life.isColorAncestor ||
      life.job === 'Color Fixer' ||
      String(life.rankTier || '').includes('Color')
    );
    const isDistorted = Boolean(
      life.isDistortedAncestor ||
      life.job === 'Distortion' ||
      (life.lifeTags || []).some((t) => String(t.en || '').includes('Distortion') && (life.resonance || 0) >= 80)
    );
    const isEgo = Boolean(
      life.isEgoAncestor ||
      life.egoName ||
      (life.recordsList || []).some((r) => r.key === 'ego_effloresced')
    );
    const isLeader = Boolean(
      life.isApexSyndicateAncestor ||
      life.isApexWingAncestor ||
      life.isApexWorkshopAncestor ||
      (life.fingerRank || 0) >= 2 ||
      (life.wingRank || 0) >= 2 ||
      (life.fixerGrade ?? 9) <= 1
    );

    if (isColor) colorCount += 1;
    if (isDistorted) distortionCount += 1;
    if (isEgo) egoCount += 1;
    if (isLeader) apexLeaderCount += 1;

    if (isColor || isDistorted || isEgo || isLeader) {
      legends.push({
        generation: life.generation || 1,
        name: life.name,
        age: life.age,
        badgeVi: isColor
          ? `Color Fixer${life.colorTitle ? ` · ${life.colorTitle}` : ''}`
          : isDistorted
            ? 'Distortion'
            : isEgo
              ? `E.G.O${life.egoName ? ` · ${life.egoName}` : ''}`
              : life.epitaphTitleVi || life.rankTier,
        badgeEn: isColor
          ? `Color Fixer${life.colorTitle ? ` · ${life.colorTitle}` : ''}`
          : isDistorted
            ? 'Distortion'
            : isEgo
              ? `E.G.O${life.egoName ? ` · ${life.egoName}` : ''}`
              : life.epitaphTitleEn || life.rankTier
      });
    }
  }

  return {
    totalLives: list.length,
    colorCount,
    distortionCount,
    egoCount,
    apexLeaderCount,
    totalWealth,
    legends: legends.slice(0, 6)
  };
}

// ============================================================================
// 2. INTER-DISTRICT TRANSIT & REGIONAL SINGULARITY MECHANICS
// ============================================================================

export const TRANSIT_HUBS = [
  {
    regionId: 'K',
    nameVi: 'District 11 · K Corp (Trạm Y Sinh Học)',
    nameEn: 'District 11 · K Corp (Bio-Regeneration Hub)',
    carrierVi: 'Tàu WARP Khoang Phổ Thông',
    carrierEn: 'WARP Train Economy Class',
    baseCostAhn: 22,
    arrivalDescVi: 'Bụi nanobot K Corp trong không khí chữa lành vết thương cũ (+12 HP) và mỗi năm hồi phục thêm +3 HP.',
    arrivalDescEn: 'Ambient K Corp nanobots mend old wounds (+12 HP) and restore +3 HP every year.',
    arrivalFx: { health: 12, sanity: 2 },
    passiveVi: 'Đặc tính K Corp: +3 HP mỗi cuối năm nếu bị thương.',
    passiveEn: 'K Corp Singularity: +3 HP at year-end when injured.'
  },
  {
    regionId: 'J',
    nameVi: 'District 10 · J Corp (Sòng Bạc Wishpower)',
    nameEn: 'District 10 · J Corp (Wishpower Casino Ward)',
    carrierVi: 'Đoàn Xe Giao Hàng Devyat\'',
    carrierEn: 'Devyat\' Courier Caravan',
    baseCostAhn: 20,
    arrivalDescVi: 'Bùa vận mệnh J Corp mở đường cho các phi vụ ngầm (+8 Leverage, +4 Danh tiếng) và sinh lời +2 Ahn mỗi năm.',
    arrivalDescEn: 'J Corp wish-stickers grease underground deals (+8 Leverage, +4 Rep) and yield +2 Ahn yearly.',
    arrivalFx: { leverage: 8, rep: 4 },
    passiveVi: 'Đặc tính J Corp: +2 Ahn và +2 Leverage mỗi cuối năm.',
    passiveEn: 'J Corp Singularity: +2 Ahn and +2 Leverage at year-end.'
  },
  {
    regionId: 'L',
    nameVi: 'District 12 · L Corp Cũ (Vùng Sương Mù Enkephalin)',
    nameEn: 'District 12 · Fallen L Corp (Enkephalin Mist Zone)',
    carrierVi: 'Đoàn Thám Hiểm Ngầm',
    carrierEn: 'Subterranean Salvage Convoy',
    baseCostAhn: 20,
    arrivalDescVi: 'Sương mù từ ổ L Corp cũ kích thích tâm thức (+8 Resonance, +6 Merit) và tăng +2 Merit mỗi năm.',
    arrivalDescEn: 'Mist from the fallen L Corp Nest stirs the psyche (+8 Resonance, +6 Merit) and grants +2 Merit yearly.',
    arrivalFx: { resonance: 8, merit: 6 },
    passiveVi: 'Đặc tính L Corp Cũ: +2 Resonance và +2 Merit mỗi cuối năm.',
    passiveEn: 'Fallen L Corp Singularity: +2 Resonance and +2 Merit at year-end.'
  },
  {
    regionId: 'T',
    nameVi: 'District 20 · T Corp (Quận Đồng Hồ 28 Giờ)',
    nameEn: 'District 20 · T Corp (28-Hour Timebooks Ward)',
    carrierVi: 'Tàu Hơi Nước Liên Quận T-Track',
    carrierEn: 'T-Track Inter-District Steam Line',
    baseCostAhn: 22,
    arrivalDescVi: 'Vay giờ từ quỹ T Corp để ép tiến độ rèn luyện (+6 Merit, +4 Ahn) và tăng hiệu suất làm việc hàng năm.',
    arrivalDescEn: 'Borrow hours from T Corp collectors to compress training (+6 Merit, +4 Ahn) and boost annual output.',
    arrivalFx: { merit: 6, wealth: 4 },
    flagGranted: 'TCorpTimeBorrowed',
    passiveVi: 'Đặc tính T Corp: +2 Merit mỗi cuối năm nhờ nhịp đồng hồ công nghiệp.',
    passiveEn: 'T Corp Singularity: +2 Merit at year-end from extended industrial hours.'
  },
  {
    regionId: 'P',
    nameVi: 'District 16 · P Corp (Vòm Bảo Tồn Không Gian)',
    nameEn: 'District 16 · P Corp (Preservation Shelter Ward)',
    carrierVi: 'Tàu WARP Khoang Bảo Tồn',
    carrierEn: 'WARP Train Preservation Cabin',
    baseCostAhn: 24,
    arrivalDescVi: 'Trường lực P Corp cách ly tiếng ồn và hiểm họa của The City (+10 SP, +6 HP, -6 Heat).',
    arrivalDescEn: 'P Corp spatial fields insulate you from the City’s clamor (+10 SP, +6 HP, -6 Heat).',
    arrivalFx: { sanity: 10, health: 6, heat: -6 },
    passiveVi: 'Đặc tính P Corp: +3 SP mỗi cuối năm.',
    passiveEn: 'P Corp Singularity: +3 SP at year-end.'
  },
  {
    regionId: 'U',
    nameVi: 'District 19 · U Corp (Cảng Đại Hồ Great Lake)',
    nameEn: 'District 19 · U Corp (Great Lake Harbors)',
    carrierVi: 'Phà Bọc Thép U Corp',
    carrierEn: 'U Corp Armored Lake Ferry',
    baseCostAhn: 20,
    arrivalDescVi: 'Đóng gói hàng hóa bằng Singularity của U Corp và kết nối với giới thủy thủ (+8 Quan hệ, +4 Danh tiếng).',
    arrivalDescEn: 'Resonant tuning forks and mariner brokers expand your reach (+8 Network, +4 Rep).',
    arrivalFx: { network: 8, rep: 4 },
    flagGranted: 'GreatLakeHardened',
    passiveVi: 'Đặc tính U Corp: +2 Quan hệ mỗi cuối năm và kháng hiểm họa Đại Hồ.',
    passiveEn: 'U Corp Singularity: +2 Network at year-end and Great Lake mastery.'
  }
];

export function transitCostFor(hub, char) {
  if (!hub || !char) return 999;
  const flags = char.flags || [];
  const hasVipPass =
    flags.includes('NestResident') ||
    flags.includes('ColorFixer') ||
    char.job === 'Color Fixer' ||
    (char.wingRank || 0) >= 2;
  return hasVipPass ? Math.max(8, Math.round(hub.baseCostAhn * 0.5)) : hub.baseCostAhn;
}

export function canRelocateDistrict(char, targetRegionId) {
  if (!char || !char.alive) return { ok: false, reasonVi: 'Nhân vật không còn sống', reasonEn: 'Character is not alive' };
  const hub = TRANSIT_HUBS.find((h) => h.regionId === targetRegionId);
  if (!hub) return { ok: false, reasonVi: 'Tuyến đường không hợp lệ', reasonEn: 'Invalid transit hub' };
  if (char.regionId === targetRegionId) {
    return { ok: false, reasonVi: 'Bạn đang ở tại District này rồi', reasonEn: 'You are already in this District' };
  }
  if (char.lastRelocatedAge === char.age) {
    return { ok: false, reasonVi: 'Mỗi năm chỉ có thể chuyển District một lần', reasonEn: 'Can only relocate once per year' };
  }
  const cost = transitCostFor(hub, char);
  const wealth = char.stats?.wealth ?? char.wealth ?? 0;
  if (wealth < cost) {
    return { ok: false, reasonVi: `Cần ${cost} Ahn để mua vé di chuyển`, reasonEn: `Requires ${cost} Ahn for transit ticket` };
  }
  return { ok: true, cost, hub };
}

export function relocateCharacterDistrict(char, targetRegionId) {
  const check = canRelocateDistrict(char, targetRegionId);
  if (!check.ok) return { ok: false, char, reasonVi: check.reasonVi, reasonEn: check.reasonEn };

  const { hub, cost } = check;
  char.stats.wealth = clamp((char.stats.wealth || 0) - cost, 0, 100);
  char.regionId = hub.regionId;
  char.lastRelocatedAge = char.age;

  const fx = hub.arrivalFx || {};
  if (fx.health) char.stats.health = clamp((char.stats.health || 0) + fx.health, 0, 100);
  if (fx.sanity) char.stats.sanity = clamp((char.stats.sanity || 0) + fx.sanity, 0, 100);
  if (fx.wealth) char.stats.wealth = clamp((char.stats.wealth || 0) + fx.wealth, 0, 100);
  if (fx.network) char.stats.network = clamp((char.stats.network || 0) + fx.network, 0, 100);
  if (fx.rep) char.stats.rep = clamp((char.stats.rep || 0) + fx.rep, 0, 100);
  if (fx.merit) char.merit = Math.max(0, (char.merit || 0) + fx.merit);
  if (fx.resonance) char.resonance = clamp((char.resonance || 0) + fx.resonance, 0, 100);
  if (fx.leverage) char.leverage = clamp((char.leverage || 0) + fx.leverage, 0, 100);
  if (fx.heat) char.heat = clamp((char.heat || 0) + fx.heat, 0, 100);

  if (hub.flagGranted && !char.flags.includes(hub.flagGranted)) {
    char.flags.push(hub.flagGranted);
  }
  if (hub.regionId === 'T' && !char.unlockedRecords.includes('tcorp_time_debtor')) {
    char.unlockedRecords.push('tcorp_time_debtor');
  }

  const reg = REGIONS.find((r) => r.id === hub.regionId);
  char.logs.push({
    id: `log_relocate_${hub.regionId}_${char.age}_${Date.now()}`,
    age: char.age,
    type: 'major',
    vi: `[Chuyển Quận · ${hub.carrierVi}] Bạn chi ${cost} Ahn di chuyển tới ${reg?.nameVi || hub.nameVi}. ${hub.arrivalDescVi}`,
    en: `[District Transit · ${hub.carrierEn}] You spent ${cost} Ahn to relocate to ${reg?.nameEn || hub.nameEn}. ${hub.arrivalDescEn}`
  });

  return { ok: true, char, cost, hub };
}

export function applyRegionalSingularityPassive(char) {
  if (!char || !char.alive || char.age < 16) return;
  const rid = char.regionId;
  if (rid === 'K') {
    if ((char.stats?.health ?? 50) < 92) {
      char.stats.health = clamp((char.stats.health || 0) + 3, 1, 100);
    }
  } else if (rid === 'J') {
    char.stats.wealth = clamp((char.stats.wealth || 0) + 2, 0, 100);
    char.leverage = clamp((char.leverage || 0) + 2, 0, 100);
  } else if (rid === 'L') {
    char.resonance = clamp((char.resonance || 0) + 2, 0, 100);
    char.merit = Math.max(0, (char.merit || 0) + 2);
  } else if (rid === 'T') {
    char.merit = Math.max(0, (char.merit || 0) + 2);
  } else if (rid === 'P') {
    if ((char.stats?.sanity ?? 50) < 92) {
      char.stats.sanity = clamp((char.stats.sanity || 0) + 3, 1, 100);
    }
  } else if (rid === 'U') {
    char.stats.network = clamp((char.stats.network || 0) + 2, 0, 100);
  }
}

// ============================================================================
// 3. APEX COMMAND DIRECTIVES (OFFICE / SYNDICATE / WING / COLOR LEADERSHIP)
// ============================================================================

export const APEX_DIRECTIVES = [
  {
    id: 'dispatch_squad',
    vi: 'Phái Đội Thực Chiến',
    en: 'Dispatch Subordinate Squad',
    detailVi: 'Cử thuộc hạ giải quyết ủy thác phụ: +5 Ahn, +6 Merit, +3 Danh tiếng.',
    detailEn: 'Send subordinates on secondary contracts: +5 Ahn, +6 Merit, +3 Rep.',
    fx: { wealth: 5, merit: 6, rep: 3 }
  },
  {
    id: 'fortify_turf',
    vi: 'Củng Cố Lãnh Địa & Hậu Cần',
    en: 'Fortify Turf & Logistics',
    detailVi: 'Siết chặt an ninh địa bàn và trạm y tế: -8 Heat, +5 HP, +5 SP, +4 Leverage.',
    detailEn: 'Lock down perimeter security and medical bays: -8 Heat, +5 HP, +5 SP, +4 Leverage.',
    fx: { heat: -8, health: 5, sanity: 5, leverage: 4 }
  },
  {
    id: 'mentor_network',
    vi: 'Bồi Dưỡng Đệ Tử & Thế Lực',
    en: 'Cultivate Protégés & Influence',
    detailVi: 'Truyền dạy kỹ năng và mở rộng mạng lưới: +6 Quan hệ, +5 Resonance, +4 Merit, +5 Gắn kết đồng hành.',
    detailEn: 'Train protégés and expand influence: +6 Network, +5 Resonance, +4 Merit, +5 Companion Bond.',
    fx: { network: 6, resonance: 5, merit: 4, bondBoost: 5 }
  }
];

export function isApexCommander(char) {
  if (!char || !char.alive || char.age < 18) return false;
  const flags = char.flags || [];
  if (char.job === 'Color Fixer' || flags.includes('ColorFixer') || char.fixerGrade === 0) return true;
  if (char.job === 'Fixer' && ((char.fixerGrade ?? 9) <= 2 || flags.includes('OwnFixerOffice') || flags.includes('AssocDirector') || char.affiliation?.director)) {
    return true;
  }
  if (char.job === 'Syndicate' && (char.fingerRank || 0) >= 2) return true;
  if (char.job === 'Wing Employee' && (char.wingRank || 0) >= 2) return true;
  if (char.job === 'Workshop Craftsman' && ((char.workshopRank || 0) >= 2 || Boolean(char.craftWeapon))) return true;
  return false;
}

export function applyApexDirective(char, directiveId) {
  if (!char || !directiveId || !isApexCommander(char)) return false;
  const dir = APEX_DIRECTIVES.find((d) => d.id === directiveId);
  if (!dir) return false;

  const fx = dir.fx || {};
  if (fx.wealth) char.stats.wealth = clamp((char.stats.wealth || 0) + fx.wealth, 0, 100);
  if (fx.health) char.stats.health = clamp((char.stats.health || 0) + fx.health, 0, 100);
  if (fx.sanity) char.stats.sanity = clamp((char.stats.sanity || 0) + fx.sanity, 0, 100);
  if (fx.network) char.stats.network = clamp((char.stats.network || 0) + fx.network, 0, 100);
  if (fx.rep) char.stats.rep = clamp((char.stats.rep || 0) + fx.rep, 0, 100);
  if (fx.merit) char.merit = Math.max(0, (char.merit || 0) + fx.merit);
  if (fx.resonance) char.resonance = clamp((char.resonance || 0) + fx.resonance, 0, 100);
  if (fx.leverage) char.leverage = clamp((char.leverage || 0) + fx.leverage, 0, 100);
  if (fx.heat) char.heat = clamp((char.heat || 0) + fx.heat, 0, 100);

  if (fx.bondBoost && char.npcs) {
    for (const role of ['partner', 'child', 'spouse', 'friend']) {
      const npc = char.npcs[role];
      if (npc && !npc.deceased && npc.status !== 'dead') {
        char.npcs[role] = { ...npc, bond: clamp((npc.bond || 40) + fx.bondBoost, 0, 100) };
      }
    }
  }

  if (!char.flags.includes('ApexDirectiveIssued')) {
    char.flags.push('ApexDirectiveIssued');
  }
  char.lastApexDirective = { age: char.age, id: dir.id };
  return true;
}

// ============================================================================
// 4. WORKSHOP SINGULARITY IMBUEMENT (RELIC + EQUIPMENT SYNTHESIS)
// ============================================================================

export const IMBUEMENT_RECIPES = [
  {
    relicId: 'rel_qlippoth_core',
    prefixVi: 'Qlippoth Khắc Chế',
    prefixEn: 'Qlippoth-Tempered',
    bonusVi: '+14 Sức chiến đấu, +12 SP, +8 Resonance, giảm áp lực tinh thần Hầm ngục',
    bonusEn: '+14 Combat Power, +12 SP, +8 Resonance, reduces Dungeon mental strain',
    combatPowerBonus: 14,
    statFx: { sanity: 12, resonance: 8, rep: 6 }
  },
  {
    relicId: 'rel_warp_shard',
    prefixVi: 'Xé Chiều W Corp',
    prefixEn: 'Rift-Edge',
    bonusVi: '+18 Sức chiến đấu, +10 Danh tiếng, +8 Quan hệ, xuyên giáp không gian',
    bonusEn: '+18 Combat Power, +10 Rep, +8 Network, dimensional rift severance',
    combatPowerBonus: 18,
    statFx: { rep: 10, network: 8, merit: 8 }
  },
  {
    relicId: 'rel_pallid_oil',
    prefixVi: 'Bạch Kình Đại Hồ',
    prefixEn: 'Pallid-Anointed',
    bonusVi: '+12 Sức chiến đấu, +14 SP, +8 HP, kháng hoảng loạn tuyệt đối',
    bonusEn: '+12 Combat Power, +14 SP, +8 HP, unwavering panic resistance',
    combatPowerBonus: 12,
    statFx: { sanity: 14, health: 8, rep: 5 }
  },
  {
    relicId: 'rel_ruin_monolith',
    prefixVi: 'Cổ Ngữ Outskirts',
    prefixEn: 'Monolith-Runed',
    bonusVi: '+16 Sức chiến đấu, +16 Resonance, +10 Merit, đánh thức tiềm năng E.G.O',
    bonusEn: '+16 Combat Power, +16 Resonance, +10 Merit, accelerates E.G.O awakening',
    combatPowerBonus: 16,
    statFx: { resonance: 16, merit: 10, rep: 8 }
  },
  {
    relicId: 'rel_sweeper_fluid',
    prefixVi: 'Huyết Dịch 3:13',
    prefixEn: 'Sweeper-Infused',
    bonusVi: '+12 Sức chiến đấu, +14 HP, +6 Danh tiếng, hút sinh lực giao tranh đêm',
    bonusEn: '+12 Combat Power, +14 HP, +6 Rep, nocturnal bio-regeneration',
    combatPowerBonus: 12,
    statFx: { health: 14, rep: 6, merit: 6 }
  }
];

export function imbuementCostFor(char) {
  if (!char) return 20;
  if (char.job === 'Workshop Craftsman' || (char.flags || []).includes('AncestorWasMeister')) return 0;
  return 20;
}

export function getImbuableRelics(char) {
  const inv = Array.isArray(char?.inventory) ? char.inventory : [];
  const imbuedSet = new Set((char?.imbuedRelics || []).map((r) => r.relicId));
  return IMBUEMENT_RECIPES.filter(
    (rec) => inv.some((it) => (it.id || it) === rec.relicId) && !imbuedSet.has(rec.relicId)
  );
}

export function hasTargetEquipmentForImbuement(char) {
  if (!char) return false;
  if (char.craftWeapon) return true;
  if (char.equipped?.weapon || char.equipped?.armor) return true;
  const inv = Array.isArray(char.inventory) ? char.inventory : [];
  return inv.some((it) => it && (it.type === 'weapon' || it.type === 'armor'));
}

export function canImbueEquipment(char, relicId) {
  if (!char || !char.alive) return { ok: false, reasonVi: 'Nhân vật không còn sống', reasonEn: 'Character is not alive' };
  const recipe = IMBUEMENT_RECIPES.find((r) => r.relicId === relicId);
  if (!recipe) return { ok: false, reasonVi: 'Không tìm thấy công thức khảm', reasonEn: 'Imbuement recipe not found' };

  const inv = Array.isArray(char.inventory) ? char.inventory : [];
  const relicIdx = inv.findIndex((it) => (it.id || it) === relicId);
  if (relicIdx === -1) {
    return { ok: false, reasonVi: 'Bạn không sở hữu cổ vật này trong túi đồ', reasonEn: 'Relic not found in inventory' };
  }
  if (!hasTargetEquipmentForImbuement(char)) {
    return {
      ok: false,
      reasonVi: 'Cần sở hữu ít nhất một Vũ khí hoặc Giáp Workshop để khảm cổ vật',
      reasonEn: 'Requires at least one Workshop Weapon or Armor to imbue'
    };
  }
  const cost = imbuementCostFor(char);
  const wealth = char.stats?.wealth ?? char.wealth ?? 0;
  if (wealth < cost) {
    return { ok: false, reasonVi: `Cần ${cost} Ahn phí dung hợp lò rèn`, reasonEn: `Requires ${cost} Ahn forge synthesis fee` };
  }
  return { ok: true, recipe, relicIdx, cost };
}

export function imbueCharacterEquipment(char, relicId) {
  const check = canImbueEquipment(char, relicId);
  if (!check.ok) return { ok: false, char, reasonVi: check.reasonVi, reasonEn: check.reasonEn };

  const { recipe, relicIdx, cost } = check;
  const relicItem = char.inventory[relicIdx];
  char.inventory.splice(relicIdx, 1);
  char.stats.wealth = clamp((char.stats.wealth || 0) - cost, 0, 100);

  const isCraftsman = char.job === 'Workshop Craftsman';
  const powerGain = recipe.combatPowerBonus + (isCraftsman ? 6 : 0);

  // Target weapon/armor name & upgrade
  let targetNameVi = 'Khí tài Workshop';
  let targetNameEn = 'Workshop Armament';
  if (char.craftWeapon) {
    targetNameVi = char.craftWeapon.name;
    targetNameEn = char.craftWeapon.name;
    char.craftWeapon = {
      ...char.craftWeapon,
      name: `${recipe.prefixVi} · ${char.craftWeapon.name}`,
      combatPower: (char.craftWeapon.combatPower || 25) + powerGain,
      imbuedRelicId: recipe.relicId
    };
  } else {
    const eqWeapon = char.equipped?.weapon || char.inventory.find((i) => i?.type === 'weapon');
    const eqArmor = char.equipped?.armor || char.inventory.find((i) => i?.type === 'armor');
    const target = eqWeapon || eqArmor;
    if (target) {
      targetNameVi = target.nameVi || target.name || targetNameVi;
      targetNameEn = target.nameEn || target.name || targetNameEn;
      target.nameVi = `${recipe.prefixVi} · ${targetNameVi}`;
      target.nameEn = `${recipe.prefixEn} ${targetNameEn}`;
      target.combatPower = (target.combatPower || 10) + powerGain;
      target.imbuedRelicId = recipe.relicId;
    }
  }

  char.imbuedRelics = [
    ...(char.imbuedRelics || []),
    {
      relicId: recipe.relicId,
      age: char.age,
      combatPowerBonus: powerGain,
      prefixVi: recipe.prefixVi,
      prefixEn: recipe.prefixEn
    }
  ];

  const fx = recipe.statFx || {};
  if (fx.health) char.stats.health = clamp((char.stats.health || 0) + fx.health, 0, 100);
  if (fx.sanity) char.stats.sanity = clamp((char.stats.sanity || 0) + fx.sanity, 0, 100);
  if (fx.rep) char.stats.rep = clamp((char.stats.rep || 0) + fx.rep, 0, 100);
  if (fx.network) char.stats.network = clamp((char.stats.network || 0) + fx.network, 0, 100);
  if (fx.resonance) char.resonance = clamp((char.resonance || 0) + fx.resonance, 0, 100);
  if (fx.merit || isCraftsman) {
    char.merit = Math.max(0, (char.merit || 0) + (fx.merit || 0) + (isCraftsman ? 10 : 0));
  }

  if (!char.flags.includes('SingularityImbued')) {
    char.flags.push('SingularityImbued');
  }

  char.logs.push({
    id: `log_imbue_${recipe.relicId}_${char.age}_${Date.now()}`,
    age: char.age,
    type: 'miracle',
    vi: `[Khảm Cổ Vật Singularity] Bạn dung hợp 「${relicItem?.nameVi || recipe.relicId}」 vào 「${targetNameVi}」 (${recipe.bonusVi}).`,
    en: `[Singularity Imbuement] You fused "${relicItem?.nameEn || recipe.relicId}" into "${targetNameEn}" (${recipe.bonusEn}).`
  });

  return { ok: true, char, recipe, powerGain };
}

export function getImbuedCombatBonus(char) {
  if (!char) return 0;
  const list = Array.isArray(char.imbuedRelics) ? char.imbuedRelics : [];
  if (list.length === 0) return (char.flags || []).includes('SingularityImbued') ? 12 : 0;
  return list.reduce((sum, item) => sum + (item.combatPowerBonus || 12), 0);
}
