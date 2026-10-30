// ============================================================================
// CITY UPGRADES ENGINE (HARD BUT FAIR EDITION):
// 1. Living Ancestor Echoes & Dynasty Hall of Legends (Prestige + Inherited Heat/Trauma)
// 2. Inter-District Transit (WARP / Devyat') & Regional Singularity Boone/Burden
// 3. Apex Command Directives (Strategic Leadership with Resource & Stress Trade-offs)
// 4. Workshop Singularity Imbuement (Relic Power + Singularity Corrosion Trade-offs)
// ============================================================================

import { REGIONS } from '../data/worldData.js';
import { npcIsActive } from './eventConditions.js';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Declared so tools/lint/lint_story.mjs registers flags granted by this module
export const CITY_UPGRADE_FLAGS = [
  { flagGranted: 'AncestorWasColor' },
  { flagGranted: 'AncestorHadEGO' },
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
    colorTitle: char.colorTitleAtAward || char.customTitle || null,
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
  const isEgoAncestor = Boolean(parentLegacy.isEgoAncestor || parentLegacy.egoName);
  const isFingerBoss = Boolean(
    parentLegacy.isApexSyndicateAncestor || (parentLegacy.fingerRank || 0) >= 2
  );
  const isWingExec = Boolean(
    parentLegacy.isApexWingAncestor || (parentLegacy.wingRank || 0) >= 2
  );
  const isMeister = Boolean(
    parentLegacy.isApexWorkshopAncestor || (parentLegacy.workshopRank || 0) >= 2
  );

  // Hard-but-fair: Every legendary bloodline grants an edge AND attracts eyes/burden
  if (isColor) {
    addFlag('AncestorWasColor');
    state.rep = clamp((state.rep || 0) + 8, 1, 60);
    state.heat = clamp((state.heat || 0) + 8, 0, 100);
    inheritedEchoes.push({
      labelVi: `Di sản Sắc Màu của ${parentLegacy.name}${parentLegacy.colorTitle ? ` (「${parentLegacy.colorTitle}」)` : ''}`,
      labelEn: `Color Legacy of ${parentLegacy.name}${parentLegacy.colorTitle ? ` ("${parentLegacy.colorTitle}")` : ''}`,
      impactVi: '+8 Danh tiếng nhưng +8 Heat (kẻ thù cũ và thanh tra Hana luôn dò xét bạn)',
      impactEn: '+8 starting Rep, +8 Heat (old rivals and Hana evaluators scrutinize you)'
    });
  }

  if (isEgoAncestor) {
    addFlag('AncestorHadEGO');
    inheritedEchoes.push({
      labelVi: `Hồ sơ E.G.O của ${parentLegacy.name}`,
      labelEn: `${parentLegacy.name}'s E.G.O record`,
      impactVi: 'Có thể gặp người từng chứng kiến lần thức tỉnh của người đi trước',
      impactEn: 'May meet someone who witnessed the predecessor awaken'
    });
  }

  if (isDistorted) {
    addFlag('AncestorWasDistortion');
    state.resonance = clamp((state.resonance || 0) + 8, 0, 100);
    if (typeof state.sanity === 'number') state.sanity = clamp(state.sanity - 4, 15, 95);
    inheritedEchoes.push({
      labelVi: `Dư chấn Distortion chưa tan của ${parentLegacy.name}`,
      labelEn: `Lingering Distortion Echo of ${parentLegacy.name}`,
      impactVi: '+8 Resonance, -4 SP (ác mộng từ lãnh địa biến dị của đời trước)',
      impactEn: '+8 starting Resonance, -4 SP (nightmares from ancestral Distortion territory)'
    });
  }

  if (isFingerBoss) {
    addFlag('AncestorWasFingerBoss');
    state.network = clamp((state.network || 0) + 7, 1, 60);
    state.heat = clamp((state.heat || 0) + 10, 0, 100);
    inheritedEchoes.push({
      labelVi: `Uy quyền Ngón Tay của ${parentLegacy.name}`,
      labelEn: `Finger Dominion of ${parentLegacy.name}`,
      impactVi: '+7 Mạng lưới nhưng +10 Heat (các băng đảng đối địch dòm ngó hậu nhân)',
      impactEn: '+7 starting Network, +10 Heat (rival Syndicates watch the bloodline)'
    });
  }

  if (isWingExec) {
    addFlag('AncestorWasWingExec');
    state.wealth = clamp((state.wealth || 0) + 10, 2, 85);
    state.heat = clamp((state.heat || 0) + 6, 0, 100);
    inheritedEchoes.push({
      labelVi: `Quỹ tín thác Wing của ${parentLegacy.name}`,
      labelEn: `Wing Executive Trust of ${parentLegacy.name}`,
      impactVi: '+10 Ahn nhưng +6 Heat (thanh tra nội bộ Wing theo dõi tài sản thừa kế)',
      impactEn: '+10 starting Ahn, +6 Heat (corporate auditors monitor the family trust)'
    });
  }

  if (isMeister) {
    addFlag('AncestorWasMeister');
    state.rep = clamp((state.rep || 0) + 5, 1, 60);
    inheritedEchoes.push({
      labelVi: `Bản vẽ lò rèn của nghệ nhân ${parentLegacy.name}`,
      labelEn: `Master Atelier Blueprints of ${parentLegacy.name}`,
      impactVi: '+5 Danh tiếng khởi đầu, giảm phí khảm Singularity tại Workshop',
      impactEn: '+5 starting Rep, discounts Singularity Imbuement at the Workshop'
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
// 2. INTER-DISTRICT TRANSIT & REGIONAL SINGULARITY MECHANICS (HARD BUT FAIR)
// ============================================================================

export const TRANSIT_HUBS = [
  {
    regionId: 'K',
    nameVi: 'District 11 · K Corp (Trạm Y Sinh Học)',
    nameEn: 'District 11 · K Corp (Bio-Regeneration Hub)',
    carrierVi: 'Tàu WARP Khoang Phổ Thông',
    carrierEn: 'WARP Train Economy Class',
    isWarpEconomy: true,
    baseCostAhn: 22,
    arrivalDescVi: 'Nanobot K Corp hàn gắn mô tổn thương (+12 HP) nhưng cảm giác thịt tự mọc lại gây rùng mình (-3 SP). Vé WARP phổ thông để lại dư chấn tâm lý nhẹ nếu không có thẻ VIP.',
    arrivalDescEn: 'K Corp nanobots mend torn tissue (+12 HP), though the sensation of crawling flesh chills the mind (-3 SP). Economy WARP transit leaves faint dimensional strain without VIP status.',
    arrivalFx: { health: 12, sanity: -3 },
    passiveVi: 'Đặc tính K Corp: +3 HP mỗi cuối năm nếu bị thương, nhưng tốn -2 Ahn phí bảo trì y tế (trừ Quản lý Wing).',
    passiveEn: 'K Corp Singularity: +3 HP at year-end when injured, costing -2 Ahn medical upkeep (waived for Wing Execs).'
  },
  {
    regionId: 'J',
    nameVi: 'District 10 · J Corp (Sòng Bạc Wishpower)',
    nameEn: 'District 10 · J Corp (Wishpower Casino Ward)',
    carrierVi: 'Đoàn Xe Giao Hàng Devyat\'',
    carrierEn: 'Devyat\' Courier Caravan',
    isWarpEconomy: false,
    baseCostAhn: 20,
    arrivalDescVi: 'Bùa Wishpower mở đường cho các phi vụ ngầm (+6 Leverage, +4 Danh tiếng) nhưng thu hút sự chú ý của đám đòi nợ sòng bạc (+4 Heat).',
    arrivalDescEn: 'Wishpower stickers grease underground deals (+6 Leverage, +4 Rep) but draw casino enforcers (+4 Heat).',
    arrivalFx: { leverage: 6, rep: 4, heat: 4 },
    passiveVi: 'Đặc tính J Corp: Cuối năm nếu SP >= 55 thì thắng cược (+3 Ahn, +2 Leverage); nếu tâm loạn (SP < 55) thì cháy túi (-3 Ahn, -2 SP).',
    passiveEn: 'J Corp Singularity: At year-end, if SP >= 55 win +3 Ahn & +2 Leverage; if rattled (SP < 55), lose -3 Ahn & -2 SP.'
  },
  {
    regionId: 'L',
    nameVi: 'District 12 · L Corp Cũ (Vùng Sương Mù Enkephalin)',
    nameEn: 'District 12 · Fallen L Corp (Enkephalin Mist Zone)',
    carrierVi: 'Đoàn Thám Hiểm Ngầm',
    carrierEn: 'Subterranean Salvage Convoy',
    isWarpEconomy: false,
    baseCostAhn: 20,
    arrivalDescVi: 'Sương mù từ ổ L Corp cũ kích thích tâm thức (+8 Resonance, +6 Merit) nhưng bào mòn thần kinh (-5 SP).',
    arrivalDescEn: 'Mist from the fallen L Corp Nest stirs the psyche (+8 Resonance, +6 Merit) at the cost of mental erosion (-5 SP).',
    arrivalFx: { resonance: 8, merit: 6, sanity: -5 },
    passiveVi: 'Đặc tính L Corp Cũ: +2 Resonance và +2 Merit mỗi cuối năm, nhưng mất -2 SP vì khói Enkephalin rò rỉ.',
    passiveEn: 'Fallen L Corp Singularity: +2 Resonance and +2 Merit at year-end, but -2 SP from lingering Enkephalin mist.'
  },
  {
    regionId: 'T',
    nameVi: 'District 20 · T Corp (Quận Đồng Hồ 28 Giờ)',
    nameEn: 'District 20 · T Corp (28-Hour Timebooks Ward)',
    carrierVi: 'Tàu Hơi Nước Liên Quận T-Track',
    carrierEn: 'T-Track Inter-District Steam Line',
    isWarpEconomy: false,
    baseCostAhn: 22,
    arrivalDescVi: 'Vay giờ từ T Corp để ép tiến độ (+6 Merit, +4 Ahn) nhưng nhịp sinh học 28 giờ vắt kiệt thể lực (-5 HP).',
    arrivalDescEn: 'Borrow hours from T Corp collectors (+6 Merit, +4 Ahn), though the 28-hour clock drains vitality (-5 HP).',
    arrivalFx: { merit: 6, wealth: 4, health: -5 },
    flagGranted: 'TCorpTimeBorrowed',
    passiveVi: 'Đặc tính T Corp: +3 Merit mỗi cuối năm, đổi lại hao tổn -2 HP vì ca kíp kéo dài (hoặc -2 Ahn thuế giờ nếu nghèo).',
    passiveEn: 'T Corp Singularity: +3 Merit at year-end, costing -2 HP from grueling shifts (or -2 Ahn Time Tax if poor).'
  },
  {
    regionId: 'P',
    nameVi: 'District 16 · P Corp (Vòm Bảo Tồn Không Gian)',
    nameEn: 'District 16 · P Corp (Preservation Shelter Ward)',
    carrierVi: 'Tàu WARP Khoang Bảo Tồn',
    carrierEn: 'WARP Train Preservation Cabin',
    isWarpEconomy: true,
    baseCostAhn: 24,
    arrivalDescVi: 'Trường lực P Corp cách ly hiểm họa (+8 SP, +5 HP, -6 Heat) nhưng làm đứt gãy các mối liên hệ đường phố (-3 Quan hệ).',
    arrivalDescEn: 'P Corp spatial fields insulate you from danger (+8 SP, +5 HP, -6 Heat) but sever street contacts (-3 Network).',
    arrivalFx: { sanity: 8, health: 5, heat: -6, network: -3 },
    passiveVi: 'Đặc tính P Corp: +3 SP mỗi cuối năm, nhưng giảm -1 Quan hệ do sống khép kín trong buồng bảo tồn.',
    passiveEn: 'P Corp Singularity: +3 SP at year-end, but -1 Network from sheltered isolation.'
  },
  {
    regionId: 'U',
    nameVi: 'District 19 · U Corp (Cảng Đại Hồ Great Lake)',
    nameEn: 'District 19 · U Corp (Great Lake Harbors)',
    carrierVi: 'Phà Bọc Thép U Corp',
    carrierEn: 'U Corp Armored Lake Ferry',
    isWarpEconomy: false,
    baseCostAhn: 20,
    arrivalDescVi: 'Mở rộng giao thương bến cảng (+8 Quan hệ, +4 Danh tiếng) nhưng sương muối và sóng âm thoa bào mòn cơ thể (-4 HP).',
    arrivalDescEn: 'Harbor brokers expand your reach (+8 Network, +4 Rep), though freezing lake spray takes a physical toll (-4 HP).',
    arrivalFx: { network: 8, rep: 4, health: -4 },
    flagGranted: 'GreatLakeHardened',
    passiveVi: 'Đặc tính U Corp: +2 Quan hệ, +1 Merit mỗi cuối năm, nhưng -1 SP trước sóng ngầm Đại Hồ.',
    passiveEn: 'U Corp Singularity: +2 Network, +1 Merit at year-end, costing -1 SP from Great Lake waves.'
  }
];

export function hasVipTransitPass(char) {
  if (!char) return false;
  const flags = char.flags || [];
  return Boolean(
    flags.includes('NestResident') ||
    flags.includes('ColorFixer') ||
    char.job === 'Color Fixer' ||
    (char.wingRank || 0) >= 2
  );
}

export function transitCostFor(hub, char) {
  if (!hub || !char) return 999;
  return hasVipTransitPass(char) ? Math.max(8, Math.round(hub.baseCostAhn * 0.5)) : hub.baseCostAhn;
}

export function canBorderCrossFromOutskirts(char) {
  if (!char) return false;
  // A minor or child cannot independently cross the Wall checkpoint into the City
  if ((char.age || 0) < 18 || char.job === 'Child') return false;

  const flags = char.flags || [];
  if (
    flags.includes('EnteredCity') ||
    flags.includes('NestResident') ||
    flags.includes('ColorFixer') ||
    flags.includes('DevyatPass')
  ) return true;
  const inv = Array.isArray(char.inventory) ? char.inventory : [];
  const PERMIT_ITEM_IDS = [
    'spc_nest_migration_permit',
    'nest_permit',
    'spc_devyat_courier_pass',
    'devyat_pass',
    'con_kcorp_ampoule',
    'k_ampoule'
  ];
  if (inv.some((it) => PERMIT_ITEM_IDS.includes(it?.id || it))) return true;
  if ((char.stats?.network ?? 0) >= 25 || (char.stats?.rep ?? 0) >= 25) return true;
  return false;
}

export function canRelocateDistrict(char, targetRegionId) {
  if (!char || !char.alive) return { ok: false, reasonVi: 'Nhân vật không còn sống', reasonEn: 'Character is not alive' };
  const hub = TRANSIT_HUBS.find((h) => h.regionId === targetRegionId);
  if (!hub) return { ok: false, reasonVi: 'Tuyến đường không hợp lệ', reasonEn: 'Invalid transit hub' };
  const outside = char.regionId === 'OUTSKIRTS' || (char.flags || []).includes('Outskirts');
  if (outside && !canBorderCrossFromOutskirts(char)) {
    return {
      ok: false,
      reasonVi: 'Đang ở Outskirts ngoài Bức Tường: cần đủ 18 tuổi kèm giấy thông hành hoặc Mạng lưới/Danh tiếng >= 25 để vượt tường vào The City',
      reasonEn: 'Currently in the Outskirts beyond the Wall: requires age 18+ with a permit or Network/Rep >= 25 to cross into The City'
    };
  }
  if (!outside && char.regionId === targetRegionId) {
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
  const vip = hasVipTransitPass(char);
  const wasOutside = char.regionId === 'OUTSKIRTS' || (char.flags || []).includes('Outskirts');
  char.stats.wealth = clamp((char.stats.wealth || 0) - cost, 0, 100);
  char.regionId = hub.regionId;
  char.lastRelocatedAge = char.age;
  char.flags = Array.isArray(char.flags) ? [...char.flags] : [];
  if (hub.regionId === 'OUTSKIRTS') {
    char.flags = char.flags.filter((f) => f !== 'Nest' && f !== 'Feather');
    if (!char.flags.includes('Outskirts')) char.flags.push('Outskirts');
  } else {
    char.flags = char.flags.filter((f) => f !== 'Outskirts');
    if (wasOutside && !char.flags.includes('EnteredCity')) char.flags.push('EnteredCity');
  }

  const fx = hub.arrivalFx || {};
  if (fx.health) char.stats.health = clamp((char.stats.health || 0) + fx.health, 1, 100);
  if (fx.sanity) char.stats.sanity = clamp((char.stats.sanity || 0) + fx.sanity, 1, 100);
  if (fx.wealth) char.stats.wealth = clamp((char.stats.wealth || 0) + fx.wealth, 0, 100);
  if (fx.network) char.stats.network = clamp((char.stats.network || 0) + fx.network, 0, 100);
  if (fx.rep) char.stats.rep = clamp((char.stats.rep || 0) + fx.rep, 0, 100);
  if (fx.merit) char.merit = Math.max(0, (char.merit || 0) + fx.merit);
  if (fx.resonance) char.resonance = clamp((char.resonance || 0) + fx.resonance, 0, 100);
  if (fx.leverage) char.leverage = clamp((char.leverage || 0) + fx.leverage, 0, 100);
  if (fx.heat) char.heat = clamp((char.heat || 0) + fx.heat, 0, 100);

  // Canon WARP Economy Class side-effect for non-VIP passengers
  if (hub.isWarpEconomy && !vip) {
    char.stats.sanity = clamp((char.stats.sanity || 0) - 3, 1, 100);
    char.resonance = clamp((char.resonance || 0) + 3, 0, 100);
  }

  if (hub.flagGranted && !char.flags.includes(hub.flagGranted)) {
    char.flags.push(hub.flagGranted);
  }
  if (hub.regionId === 'T' && !char.unlockedRecords.includes('tcorp_time_debtor')) {
    char.unlockedRecords.push('tcorp_time_debtor');
  }

  const reg = REGIONS.find((r) => r.id === hub.regionId);
  const crossVi = wasOutside ? 'Bạn vượt qua cổng kiểm soát Bức Tường từ Outskirts để tiến vào nội thành The City. ' : '';
  const crossEn = wasOutside ? 'You cleared the City Wall border checkpoint from the Outskirts, entering The City proper. ' : '';
  char.logs.push({
    id: `log_relocate_${hub.regionId}_${char.age}_${Date.now()}`,
    age: char.age,
    type: 'major',
    vi: `[${wasOutside ? 'Nhập Thành · ' : 'Chuyển Quận · '}${hub.carrierVi}] ${crossVi}Bạn chi ${cost} Ahn di chuyển tới ${reg?.nameVi || hub.nameVi}. ${hub.arrivalDescVi}`,
    en: `[${wasOutside ? 'City Entry · ' : 'District Transit · '}${hub.carrierEn}] ${crossEn}You spent ${cost} Ahn to relocate to ${reg?.nameEn || hub.nameEn}. ${hub.arrivalDescEn}`
  });

  return { ok: true, char, cost, hub };
}

export function applyRegionalSingularityPassive(char) {
  if (!char || !char.alive || char.age < 16) return;
  const rid = char.regionId;
  if (rid === 'K') {
    if ((char.stats?.health ?? 50) < 92) {
      char.stats.health = clamp((char.stats.health || 0) + 3, 1, 100);
      if ((char.wingRank || 0) < 2 && (char.stats?.wealth ?? 0) >= 8) {
        char.stats.wealth = clamp((char.stats.wealth || 0) - 2, 0, 100);
      }
    }
  } else if (rid === 'J') {
    if ((char.stats?.sanity ?? 50) >= 55) {
      char.stats.wealth = clamp((char.stats.wealth || 0) + 3, 0, 100);
      char.leverage = clamp((char.leverage || 0) + 2, 0, 100);
    } else {
      char.stats.wealth = clamp((char.stats.wealth || 0) - 3, 0, 100);
      char.stats.sanity = clamp((char.stats.sanity || 0) - 2, 1, 100);
    }
  } else if (rid === 'L') {
    char.resonance = clamp((char.resonance || 0) + 2, 0, 100);
    char.merit = Math.max(0, (char.merit || 0) + 2);
    char.stats.sanity = clamp((char.stats.sanity || 0) - 2, 1, 100);
  } else if (rid === 'T') {
    char.merit = Math.max(0, (char.merit || 0) + 3);
    char.stats.health = clamp((char.stats.health || 0) - 2, 1, 100);
    if ((char.stats?.wealth ?? 0) < 12) {
      char.stats.wealth = clamp((char.stats.wealth || 0) - 2, 0, 100);
    }
  } else if (rid === 'P') {
    if ((char.stats?.sanity ?? 50) < 92) {
      char.stats.sanity = clamp((char.stats.sanity || 0) + 3, 1, 100);
    }
    char.stats.network = clamp((char.stats.network || 0) - 1, 0, 100);
  } else if (rid === 'U') {
    char.stats.network = clamp((char.stats.network || 0) + 2, 0, 100);
    char.merit = Math.max(0, (char.merit || 0) + 1);
    char.stats.sanity = clamp((char.stats.sanity || 0) - 1, 1, 100);
  }
}

// ============================================================================
// 3. APEX COMMAND DIRECTIVES (HARD-BUT-FAIR STRATEGIC TRADE-OFFS)
// ============================================================================

export const APEX_DIRECTIVES = [
  {
    id: 'dispatch_squad',
    vi: 'Phái Đội Thực Chiến',
    en: 'Dispatch Subordinate Squad',
    detailVi: 'Cử thuộc hạ nhận hợp đồng nguy hiểm: +5 Ahn, +6 Merit, +3 Danh tiếng, nhưng +5 Heat và -3 SP áp lực chỉ huy.',
    detailEn: 'Send subordinates on hazardous contracts: +5 Ahn, +6 Merit, +3 Rep, at the cost of +5 Heat and -3 SP command strain.',
    fx: { wealth: 5, merit: 6, rep: 3, heat: 5, sanity: -3 }
  },
  {
    id: 'fortify_turf',
    vi: 'Thiết Quân Luật & Củng Cố Địa Bàn',
    en: 'Martial Lockdown & Logistics',
    detailVi: 'Chi -5 Ahn phí an ninh (hoặc -3 Danh tiếng nếu cạn quỹ) để đổi lấy: -8 Heat, +5 HP, +5 SP, +4 Leverage.',
    detailEn: 'Spend -5 Ahn security upkeep (or -3 Rep if broke) to secure: -8 Heat, +5 HP, +5 SP, +4 Leverage.',
    fx: { costAhnOrRep: 5, heat: -8, health: 5, sanity: 5, leverage: 4 }
  },
  {
    id: 'mentor_network',
    vi: 'Đầu Tư Mạng Lưới & Bồi Dưỡng Đệ Tử',
    en: 'Sponsor Protégés & Broker Network',
    detailVi: 'Tiêu hao -4 Ahn và -3 HP trực tiếp chỉ điểm để nhận: +6 Quan hệ, +4 Resonance, +4 Merit, +4 Gắn kết đồng hành.',
    detailEn: 'Invest -4 Ahn and -3 HP in live sparring to gain: +6 Network, +4 Resonance, +4 Merit, +4 Companion Bond.',
    fx: { wealth: -4, health: -3, network: 6, resonance: 4, merit: 4, bondBoost: 4 }
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

// Route-distinct leadership powers & organizational obligations (T19)
export function getApexDirectiveEffects(char, directiveId) {
  const dir = APEX_DIRECTIVES.find((d) => d.id === directiveId);
  if (!dir) return null;
  const isColor = char?.job === 'Color Fixer' || char?.flags?.includes('ColorFixer') || char?.fixerGrade === 0;
  const finger = char?.finger;
  const isWing = char?.job === 'Wing Employee' || (char?.wingRank || 0) >= 2;
  const isWorkshop = char?.job === 'Workshop Craftsman' || (char?.workshopRank || 0) >= 2;

  const fx = { ...(dir.fx || {}) };
  const routeBonus = {};

  if (directiveId === 'dispatch_squad') {
    if (isColor) {
      routeBonus.rep = 3;
      routeBonus.bondBoost = 3;
    } else if (finger === 'Thumb') {
      routeBonus.wealth = 3;
      routeBonus.leverage = 4;
    } else if (finger === 'Index') {
      routeBonus.resonance = 4;
      routeBonus.heat = -3;
    } else if (finger === 'Middle') {
      routeBonus.bondBoost = 4;
      routeBonus.rep = 2;
    } else if (finger === 'Ring') {
      routeBonus.wealth = 4;
      routeBonus.resonance = 2;
    } else if (finger === 'Pinky') {
      routeBonus.leverage = 5;
    } else if (isWing) {
      routeBonus.standing = 4;
    } else if (isWorkshop) {
      routeBonus.wealth = 3;
      routeBonus.merit = 4;
    }
  } else if (directiveId === 'fortify_turf') {
    if (isColor) {
      routeBonus.sanity = 4;
      routeBonus.health = 3;
      routeBonus.heat = -2;
    } else if (finger === 'Thumb') {
      routeBonus.leverage = 4;
      routeBonus.heat = -3;
    } else if (finger === 'Index') {
      routeBonus.resonance = 3;
      routeBonus.heat = -3;
    } else if (finger === 'Middle') {
      routeBonus.bondBoost = 4;
      routeBonus.health = 3;
    } else if (finger === 'Ring') {
      routeBonus.resonance = 3;
      routeBonus.wealth = 2;
    } else if (finger === 'Pinky') {
      routeBonus.leverage = 4;
      routeBonus.heat = -2;
    } else if (isWing) {
      routeBonus.standing = 4;
      routeBonus.heat = -2;
    } else if (isWorkshop) {
      routeBonus.wealth = 3;
      routeBonus.heat = -2;
    }
  } else if (directiveId === 'mentor_network') {
    if (isColor) {
      routeBonus.bondBoost = 3;
      routeBonus.resonance = 3;
      routeBonus.rep = 3;
    } else if (finger === 'Thumb') {
      routeBonus.leverage = 3;
      routeBonus.merit = 3;
    } else if (finger === 'Index') {
      routeBonus.resonance = 4;
      routeBonus.network = 2;
    } else if (finger === 'Middle') {
      routeBonus.bondBoost = 4;
      routeBonus.health = 2;
    } else if (finger === 'Ring') {
      routeBonus.resonance = 3;
      routeBonus.merit = 3;
    } else if (finger === 'Pinky') {
      routeBonus.leverage = 4;
      routeBonus.network = 2;
    } else if (isWing) {
      routeBonus.standing = 4;
      routeBonus.network = 2;
    } else if (isWorkshop) {
      routeBonus.merit = 4;
      routeBonus.wealth = 2;
    }
  }

  return { dir, fx, routeBonus };
}

export function applyApexDirective(char, directiveId) {
  if (!char || !directiveId || !isApexCommander(char)) return false;
  const effects = getApexDirectiveEffects(char, directiveId);
  if (!effects) return false;
  const { dir, fx, routeBonus } = effects;

  const combined = { ...fx };
  for (const [k, v] of Object.entries(routeBonus)) {
    if (k === 'bondBoost') {
      combined.bondBoost = (combined.bondBoost || 0) + v;
    } else {
      combined[k] = (combined[k] || 0) + v;
    }
  }

  if (combined.costAhnOrRep) {
    if ((char.stats.wealth || 0) >= combined.costAhnOrRep) {
      char.stats.wealth = clamp((char.stats.wealth || 0) - combined.costAhnOrRep, 0, 100);
    } else {
      char.stats.rep = clamp((char.stats.rep || 0) - 3, 0, 100);
    }
  }
  if (combined.wealth) char.stats.wealth = clamp((char.stats.wealth || 0) + combined.wealth, 0, 100);
  if (combined.health) char.stats.health = clamp((char.stats.health || 0) + combined.health, 1, 100);
  if (combined.sanity) char.stats.sanity = clamp((char.stats.sanity || 0) + combined.sanity, 1, 100);
  if (combined.network) char.stats.network = clamp((char.stats.network || 0) + combined.network, 0, 100);
  if (combined.rep) char.stats.rep = clamp((char.stats.rep || 0) + combined.rep, 0, 100);
  if (combined.merit) char.merit = Math.max(0, (char.merit || 0) + combined.merit);
  if (combined.resonance) char.resonance = clamp((char.resonance || 0) + combined.resonance, 0, 100);
  if (combined.leverage) char.leverage = clamp((char.leverage || 0) + combined.leverage, 0, 100);
  if (combined.standing) char.standing = clamp((char.standing ?? 50) + combined.standing, 0, 100);
  if (combined.heat) char.heat = clamp((char.heat || 0) + combined.heat, 0, 100);

  if (combined.bondBoost && char.npcs) {
    for (const role of Object.keys(char.npcs)) {
      const npc = char.npcs[role];
      if (npcIsActive(npc)) {
        const currentBond = typeof npc.bond === 'number' ? npc.bond : 40;
        char.npcs[role] = { ...npc, bond: clamp(currentBond + combined.bondBoost, 0, 100) };
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
// 4. WORKSHOP SINGULARITY IMBUEMENT (POWER + SINGULARITY CORROSION)
// ============================================================================

export const IMBUEMENT_RECIPES = [
  {
    relicId: 'rel_qlippoth_core',
    prefixVi: 'Qlippoth Khắc Chế',
    prefixEn: 'Qlippoth-Tempered',
    bonusVi: '+14 Sức chiến đấu, +10 SP, +8 Resonance, nhưng -6 HP do bức xạ Qlippoth ăn mòn dây thần kinh',
    bonusEn: '+14 Combat Power, +10 SP, +8 Resonance, but -6 HP from Qlippoth nerve radiation',
    combatPowerBonus: 14,
    statFx: { sanity: 10, resonance: 8, rep: 5, health: -6 }
  },
  {
    relicId: 'rel_warp_shard',
    prefixVi: 'Xé Chiều W Corp',
    prefixEn: 'Rift-Edge',
    bonusVi: '+18 Sức chiến đấu, +10 Danh tiếng, +8 Merit, nhưng -8 SP và +6 Heat vì tiếng gào trong vết nứt không gian',
    bonusEn: '+18 Combat Power, +10 Rep, +8 Merit, but -8 SP and +6 Heat from dimensional rift screams',
    combatPowerBonus: 18,
    statFx: { rep: 10, merit: 8, sanity: -8, heat: 6 }
  },
  {
    relicId: 'rel_pallid_oil',
    prefixVi: 'Bạch Kình Đại Hồ',
    prefixEn: 'Pallid-Anointed',
    bonusVi: '+12 Sức chiến đấu, +12 SP, +6 HP, nhưng -5 Quan hệ và +6 Resonance do dầu cá voi trắng tẩy mờ ký ức',
    bonusEn: '+12 Combat Power, +12 SP, +6 HP, but -5 Network and +6 Resonance as pallid oil blurs memory',
    combatPowerBonus: 12,
    statFx: { sanity: 12, health: 6, rep: 4, network: -5, resonance: 6 }
  },
  {
    relicId: 'rel_ruin_monolith',
    prefixVi: 'Cổ Ngữ Outskirts',
    prefixEn: 'Monolith-Runed',
    bonusVi: '+16 Sức chiến đấu, +14 Resonance, +10 Merit, nhưng -10 SP và +6 Heat trước cổ ngữ cấm kỵ',
    bonusEn: '+16 Combat Power, +14 Resonance, +10 Merit, but -10 SP and +6 Heat from forbidden Outskirts glyphs',
    combatPowerBonus: 16,
    statFx: { resonance: 14, merit: 10, rep: 6, sanity: -10, heat: 6 }
  },
  {
    relicId: 'rel_sweeper_fluid',
    prefixVi: 'Huyết Dịch 3:13',
    prefixEn: 'Sweeper-Infused',
    bonusVi: '+12 Sức chiến đấu, +12 HP, +6 Danh tiếng, nhưng -6 SP và +8 Heat vì mùi dung dịch tử thi đêm',
    bonusEn: '+12 Combat Power, +12 HP, +6 Rep, but -6 SP and +8 Heat from nocturnal bio-fluid stench',
    combatPowerBonus: 12,
    statFx: { health: 12, rep: 6, merit: 5, sanity: -6, heat: 8 }
  }
];

export function imbuementCostFor(char) {
  if (!char) return 22;
  if (char.job === 'Workshop Craftsman' || (char.flags || []).includes('AncestorWasMeister')) return 0;
  return 22;
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
  char.inventory = structuredClone(char.inventory || []);
  if (char.equipped) char.equipped = structuredClone(char.equipped);
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
    const slot = (char.equipped?.weapon || char.inventory.some((i) => i?.type === 'weapon')) ? 'weapon' : 'armor';
    const eqItem = char.equipped?.[slot];
    const invIdx = eqItem?.id
      ? char.inventory.findIndex((i) => i && (i.id || i) === eqItem.id)
      : char.inventory.findIndex((i) => i?.type === slot);
    const baseItem = eqItem || (invIdx >= 0 ? char.inventory[invIdx] : null);
    if (baseItem) {
      targetNameVi = baseItem.nameVi || baseItem.name || targetNameVi;
      targetNameEn = baseItem.nameEn || baseItem.name || targetNameEn;
      const upgradedItem = {
        ...baseItem,
        nameVi: `${recipe.prefixVi} · ${targetNameVi}`,
        nameEn: `${recipe.prefixEn} ${targetNameEn}`,
        combatPower: (baseItem.combatPower || 10) + powerGain,
        imbuedRelicId: recipe.relicId
      };
      if (invIdx >= 0) {
        char.inventory[invIdx] = upgradedItem;
      }
      if (char.equipped && (char.equipped[slot] || invIdx >= 0)) {
        char.equipped[slot] = upgradedItem;
      }
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
  if (fx.health) char.stats.health = clamp((char.stats.health || 0) + fx.health, 1, 100);
  if (fx.sanity) char.stats.sanity = clamp((char.stats.sanity || 0) + fx.sanity, 1, 100);
  if (fx.rep) char.stats.rep = clamp((char.stats.rep || 0) + fx.rep, 0, 100);
  if (fx.network) char.stats.network = clamp((char.stats.network || 0) + fx.network, 0, 100);
  if (fx.resonance) char.resonance = clamp((char.resonance || 0) + fx.resonance, 0, 100);
  if (fx.heat) char.heat = clamp((char.heat || 0) + fx.heat, 0, 100);
  if (fx.merit || isCraftsman) {
    char.merit = Math.max(0, (char.merit || 0) + (fx.merit || 0) + (isCraftsman ? 8 : 0));
  }
  if (isCraftsman) {
    // Physical toil of hammering a raw Singularity relic on the anvil yourself
    char.stats.health = clamp((char.stats.health || 0) - 3, 1, 100);
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
