// The life summary, epitaph and the legacy record a life leaves to the next one.
import { AMBITIONS, ambitionComplete } from './annualPlan.js';
import { CODEX_RECORDS, FAMILIES, FINGER_RANKS, REGIONS } from '../data/worldData.js';
import { DUNGEON_DEFINITIONS } from './dungeonEngine.js';
import { FATE_OMENS, SANDBOX_FLAG } from './weaverAI.js';
import { INDEPENDENT_SYNDICATE_RANKS, WING_RANKS } from './careerMilestones.js';
import { determineSuccessorType } from './careerPipeline.js';
import { entryTier, framesAsMajor } from '../features/chronicle/entryTiers.js';
import { extractAncestorEchoProfile } from './cityUpgrades.js';
import { keepsakeForLife } from './legacyKeepsake.js';
import { lifeEndingOf } from '../data/lifeEndings.js';
import { localizeEnsembleName } from '../data/ensembleNames.js';
import { npcIsActive } from './eventConditions.js';

/**
 * Builds the end-of-life Epitaph Summary & Legacy Package for Generation N+1
 */
export function buildLifeSummaryAndLegacy(char) {
  const region = REGIONS.find(r => r.id === char.regionId) || REGIONS[0];
  const birthRegion = REGIONS.find(r => r.id === (char.birthRegionId || char.regionId)) || region;
  const family = char.family || FAMILIES.find(f => f.id === char.familyId) || FAMILIES[0];
  const omen = FATE_OMENS.find(o => o.id === char.fateOmenId) || FATE_OMENS[0];
  const flags = char.flags || [];

  let epitaphTitleVi = 'Một người dân bình thường của The City';
  let epitaphTitleEn = 'An ordinary citizen of the City';
  let occupationVi = 'Cư dân tự do';
  let occupationEn = 'Freelance Citizen';
  let rankTier = 'Canard';

  if (char.age === 0 && char.deathCauseVi) {
    epitaphTitleVi = 'Sinh linh chưa kịp thấy ánh mặt trời';
    epitaphTitleEn = 'A life lost before the first dawn';
    occupationVi = 'Chưa kịp trưởng thành';
    occupationEn = 'Perished at Birth';
    rankTier = 'Canard';
  } else if (char.job === 'Distortion' || flags.includes('Distorted')) {
    epitaphTitleVi = 'Distortion';
    epitaphTitleEn = 'Distortion';
    occupationVi = 'Distortion';
    occupationEn = 'Distortion';
    rankTier = flags.includes('AbyssalDistortionApex') ? 'Star of the City' : 'Urban Nightmare';
  } else if (flags.includes('ColorFixer')) {
    epitaphTitleVi = char.customTitle || 'Color Fixer';
    epitaphTitleEn = char.customTitle || 'Color Fixer';
    occupationVi = `Color Fixer · 「${char.customTitle || 'The Crimson Dusk'}」`;
    occupationEn = `Color Fixer · "${char.customTitle || 'The Crimson Dusk'}"`;
    rankTier = 'Star of the City';
  } else if (flags.includes('EGOAwakened')) {
    epitaphTitleVi = `Người mang E.G.O 「${char.egoName || 'không tên'}」`;
    epitaphTitleEn = `Bearer of the E.G.O 「${localizeEnsembleName(char.egoName, 'en') || 'nameless'}」`;
    occupationVi = `${char.job === 'Fixer' ? `Fixer Grade ${char.fixerGrade}` : char.job} · E.G.O 「${char.egoName || 'Thức Tỉnh'}」`;
    occupationEn = `${char.job === 'Fixer' ? `Grade ${char.fixerGrade} Fixer` : char.job} · E.G.O "${localizeEnsembleName(char.egoName, 'en') || 'Awakened'}"`;
    rankTier = 'Star of the City';
  } else if (flags.includes('HongyuanHierarch')) {
    epitaphTitleVi = 'Gia chủ của Hongyuan';
    epitaphTitleEn = 'Family Hierarch of Hongyuan';
    occupationVi = 'H Corp · Gia chủ Hongyuan';
    occupationEn = 'H Corp · Hierarch of Hongyuan';
    rankTier = 'Star of the City';
  } else if (char.job === 'Fixer') {
    epitaphTitleVi = `Fixer Grade ${char.fixerGrade} · ${char.org?.name || 'tự do'}`;
    epitaphTitleEn = `Grade ${char.fixerGrade} Fixer · ${char.org?.name || 'Freelance'}`;
    occupationVi = `${char.org?.name || 'Fixer tự do'} · Grade ${char.fixerGrade}`;
    occupationEn = `${char.org?.name || 'Freelance Fixer'} · Grade ${char.fixerGrade}`;
    rankTier = char.fixerGrade <= 2 ? 'Urban Nightmare' : (char.fixerGrade <= 5 ? 'Urban Plague' : 'Urban Legend');
  } else if (char.job === 'Syndicate') {
    const indRank = Math.min(3, Math.max(0, char.syndicateRank || 0));
    const rankName =
      char.finger && FINGER_RANKS[char.finger]
        ? FINGER_RANKS[char.finger][char.fingerRank || 0]
        : (INDEPENDENT_SYNDICATE_RANKS[indRank]?.vi || 'Người của Syndicate');
    const rankNameEn =
      char.finger && FINGER_RANKS[char.finger]
        ? FINGER_RANKS[char.finger][char.fingerRank || 0]
        : (INDEPENDENT_SYNDICATE_RANKS[indRank]?.en || 'Syndicate Member');
    const topSynRank = Math.max(char.fingerRank || 0, char.syndicateRank || 0);
    epitaphTitleVi = `${rankName} · ${char.finger ? `The ${char.finger}` : (char.org?.name || 'Backstreets')}`;
    epitaphTitleEn = `${rankNameEn} · ${char.finger ? `The ${char.finger}` : (char.org?.name || 'Backstreets')}`;
    occupationVi = `${char.finger ? `The ${char.finger}` : 'Syndicate'} · ${rankName}`;
    occupationEn = `${char.finger ? `The ${char.finger}` : 'Syndicate'} · ${rankNameEn}`;
    rankTier = topSynRank >= 3 ? 'Star of the City' : topSynRank >= 2 ? 'Urban Nightmare' : 'Urban Plague';
  } else if (char.job === 'Wing Employee') {
    const wRank = Math.min(WING_RANKS.length - 1, char.wingRank || 0);
    const wingTitleVi = WING_RANKS[wRank]?.titleVi || 'Feather của Wing';
    const wingTitleEn = WING_RANKS[wRank]?.titleEn || 'Wing Feather';
    const wingShort = region.nameVi?.split('·')[1]?.trim() || region.nameVi;
    epitaphTitleVi = `${wingTitleVi} · ${char.org?.name || wingShort}`;
    epitaphTitleEn = `${wingTitleEn} · ${char.org?.name || wingShort}`;
    occupationVi = `${wingShort} · ${wingTitleVi.split('(')[0].trim()}`;
    occupationEn = `${wingShort} · ${wingTitleEn}`;
    rankTier = wRank >= 3 ? 'Star of the City' : wRank >= 2 ? 'Urban Nightmare' : 'Urban Legend';
  } else if (char.job === 'Workshop Craftsman') {
    const wsRank = char.workshopRank || 0;
    const wsTitleVi = wsRank >= 3 ? 'Đại Sư Xưởng Rèn Tres' : wsRank === 2 ? 'Nghệ Nhân Vũ Khí Cấp Cao' : wsRank === 1 ? 'Thợ Rèn Chứng Nhận Tres' : 'Thợ rèn Workshop';
    const wsTitleEn = wsRank >= 3 ? 'Tres Grandmaster Smith' : wsRank === 2 ? 'Master Atelier Artisan' : wsRank === 1 ? 'Certified Workshop Smith' : 'Workshop Craftsman';
    epitaphTitleVi = wsTitleVi;
    epitaphTitleEn = wsTitleEn;
    occupationVi = char.craftWeapon ? `${wsTitleVi} · 「${char.craftWeapon.name}」` : wsTitleVi;
    occupationEn = char.craftWeapon ? `${wsTitleEn} · "${char.craftWeapon.name}"` : wsTitleEn;
    rankTier = char.craftWeapon || wsRank >= 2 ? 'Urban Nightmare' : 'Urban Legend';
  } else if (char.age < 18) {
    occupationVi = 'Đứa trẻ của The City';
    occupationEn = 'Child of the City';
  }

  const keepsake = keepsakeForLife(char);
  const relicName = keepsake.vi;

  const succInfo = determineSuccessorType(char);
  const relicNameEn = keepsake.en;
  const successorRelation = succInfo.type;
  let childAgeWhenParentDied = 0;
  if (succInfo.type === 'child') {
    const parentChildBirthAge = Math.min(char.age - 1, Math.max(18, char.age - 18));
    childAgeWhenParentDied = Math.max(1, char.age - parentChildBirthAge);
  } else {
    childAgeWhenParentDied = Math.max(1, Math.min(18, char.age - 5));
  }

  const localAvgLife = region.avgLife || 55;
  const lifespanDiff = char.age - localAvgLife;
  const deathCauseVi = char.deathCauseVi || 'Qua đời ở The City';
  const deathCauseEn = char.deathCauseEn || 'Passed away in the City';

  // Poetic Epitaph Quote tailored to how the life unfolded and ended
  let poeticQuoteVi = '“Họ trút hơi thở cuối cùng vào một buổi chiều mà không một ai trong thành phố này dừng bước.”';
  let poeticQuoteEn = '“They breathed their last on an afternoon when no one in the City was in a hurry.”';

  const topOfCareer =
    flags.includes('ColorFixer') ||
    (char.job === 'Syndicate' && Math.max(char.fingerRank || 0, char.syndicateRank || 0) >= 3) ||
    (char.job === 'Wing Employee' && (char.wingRank || 0) >= 3);
  if (!char.lifeEnding && topOfCareer && char.age >= 100) {
    char.lifeEnding = 'ripe_age';
  }
  const closedBy = lifeEndingOf(char);
  if (closedBy) {
    poeticQuoteVi = closedBy.quoteVi;
    poeticQuoteEn = closedBy.quoteEn;
  } else if (char.endingId === 'library_threshold') {
    poeticQuoteVi = '“B Corp không ghi lại những gì ở phía sau cánh cửa.”';
    poeticQuoteEn = '“B Corp did not record what lay beyond the door.”';
  } else if (char.age === 0) {
    poeticQuoteVi = '“Một sinh linh khép mắt trước khi ánh đèn neon ngoài cửa sổ kịp đổi màu.”';
    poeticQuoteEn = '“A fragile breath extinguished before the neon outside the window could even flicker.”';
  } else if (flags.includes('Distorted') || char.job === 'Distortion') {
    poeticQuoteVi = '“Khi hình hài con người trở nên quá chật hẹp cho nỗi tuyệt vọng, họ đã buông tay để hóa thành chính cơn ác mộng của mình.”';
    poeticQuoteEn = '“When a human shell grew too narrow for their despair, they let go and became the shape of their own sorrow.”';
  } else if (flags.includes('ColorFixer') || flags.includes('EGOAwakened')) {
    poeticQuoteVi = '“Giữa một thành phố nghiền nát mọi linh hồn thành tro bụi, họ đã tự rèn nỗi đau của mình thành một sắc màu không thể phai mờ.”';
    poeticQuoteEn = '“In a City that grinds every soul to ash, they forged their own agony into an indelible radiance.”';
  } else if (char.age >= 70 || /tuổi già|lão|nhắm mắt|old age/i.test(`${deathCauseVi} ${deathCauseEn}`)) {
    poeticQuoteVi = '“Giữa chốn tuổi già là thứ xa xỉ phẩm hiếm hoi nhất, họ đã lặng lẽ khép mắt sau khi chứng kiến biết bao mùa mưa máu đi qua.”';
    poeticQuoteEn = '“In a place where old age is the rarest luxury of all, they quietly closed their eyes after outliving a hundred storms.”';
  } else if (char.age < 18) {
    poeticQuoteVi = '“Những con hẻm của The City chưa bao giờ đủ rộng cho những giấc mơ chưa kịp lớn.”';
    poeticQuoteEn = '“The alleys of the City were never wide enough for dreams that had not yet grown.”';
  } else if (/Hầm ngục|Bỏ mạng tại|WARP|Great Lake|Pallid|Lobotomy|La Manchaland|Outskirts/i.test(deathCauseVi)) {
    poeticQuoteVi = '“Họ bước vào nơi bóng tối sâu thẳm nhất của dị thể và mãi mãi trở thành một phần của truyền thuyết nơi đáy vực.”';
    poeticQuoteEn = '“They stepped into the deepest abyss of the anomaly and became part of the legend whispered in the dark.”';
  } else {
    poeticQuoteVi = '“Máu rơi trên mặt đường ướt lạnh rồi sẽ trôi theo nước mưa, nhưng vết cắt họ để lại trong biên niên sử vẫn còn nguyên vẹn.”';
    poeticQuoteEn = '“Blood spilled on wet cobblestones washes away with the rain, yet the mark they carved into the chronicle remains.”';
  }

  // Extract pivotal turning points using chronicle entry tiers plus collapsed dungeon delves
  // Đợt 115a: Di cảo và buildLifeSummary luôn đọc dòng gốc từ items nếu gặp year_digest
  const rawLogs = Array.isArray(char.logs) ? char.logs : [];
  const logs = [];
  for (const entry of rawLogs) {
    if (entry?.type === 'year_digest' && Array.isArray(entry.items)) {
      logs.push(...entry.items);
    } else {
      logs.push(entry);
    }
  }
  const capFirst = (str) => {
    const clean = String(str || '').trim();
    return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : '';
  };
  const isBareAgeTitle = (str) => /^(tuổi|age)\s+\d+$/i.test(String(str || '').trim());
  const formatLandmark = (entry, idx, overrideType = null) => {
    const rawVi = String(entry.vi || '').trim();
    const rawEn = String(entry.en || '').trim();
    const titleMatchVi = /^\s*\[([^\]]{2,80})\]\s*/.exec(rawVi);
    const titleMatchEn = /^\s*\[([^\]]{2,80})\]\s*/.exec(rawEn);
    const cleanBodyVi = ((titleMatchVi ? rawVi.slice(titleMatchVi[0].length) : rawVi).split(/(?<=[.!?])\s+/)[0] || rawVi).trim();
    const cleanBodyEn = ((titleMatchEn ? rawEn.slice(titleMatchEn[0].length) : rawEn).split(/(?<=[.!?])\s+/)[0] || rawEn).trim();
    const rawTitleVi = titleMatchVi ? titleMatchVi[1] : (entry.choiceVi || '');
    const rawTitleEn = titleMatchEn ? titleMatchEn[1] : (entry.choiceEn || '');
    return {
      order: idx,
      age: entry.age,
      type: overrideType || entry.type,
      titleVi: isBareAgeTitle(rawTitleVi) ? '' : capFirst(rawTitleVi),
      titleEn: isBareAgeTitle(rawTitleEn) ? '' : capFirst(rawTitleEn),
      summaryVi: cleanBodyVi,
      summaryEn: cleanBodyEn
    };
  };

  const primaryLandmarks = [];
  const echoLandmarks = [];
  const fallbackDecisions = [];
  let activeDelveKey = null;
  let activeDelveLandmark = null;
  const flushDelve = () => {
    if (activeDelveLandmark) {
      primaryLandmarks.push(activeDelveLandmark);
      activeDelveLandmark = null;
      activeDelveKey = null;
    }
  };

  logs.forEach((entry, idx) => {
    if (!entry || !(entry.age > 0) || entry.passed) return;
    const id = String(entry.id || '');
    const type = String(entry.type || '');
    if (id.startsWith('log_dungeon_') || type.startsWith('log_dungeon_')) {
      const bracket = /^\s*\[([^\]]+)\]/.exec(String(entry.vi || ''))?.[1] || '';
      const dungeonHead = bracket.split(' · ')[0] || 'dungeon_delve';
      const delveKey = `${entry.age}:${dungeonHead}`;
      if (activeDelveKey && activeDelveKey !== delveKey) flushDelve();
      activeDelveKey = delveKey;
      activeDelveLandmark = formatLandmark(entry, idx, 'major');
      return;
    }
    flushDelve();
    if (framesAsMajor(entry) || entry.type === 'death') {
      primaryLandmarks.push(formatLandmark(entry, idx));
    } else if (entry.type === 'causal') {
      echoLandmarks.push(formatLandmark(entry, idx));
    } else if (entryTier(entry) === 'decision' && (entry.type === 'danger' || /^\s*\[/.test(entry.vi || '') || entry.choiceVi)) {
      fallbackDecisions.push(formatLandmark(entry, idx));
    }
  });
  flushDelve();

  const chosenLandmarks = [...primaryLandmarks];
  const ageCounts = new Map();
  for (const item of chosenLandmarks) ageCounts.set(item.age, (ageCounts.get(item.age) || 0) + 1);
  for (const echo of echoLandmarks) {
    if ((ageCounts.get(echo.age) || 0) < 2) {
      chosenLandmarks.push(echo);
      ageCounts.set(echo.age, (ageCounts.get(echo.age) || 0) + 1);
    }
  }
  if (chosenLandmarks.length < 2) {
    const prioritizedFallbacks = [
      ...fallbackDecisions.filter((item) => item.type === 'danger' || item.titleVi),
      ...fallbackDecisions.filter((item) => item.type !== 'danger' && !item.titleVi)
    ];
    for (const item of prioritizedFallbacks) {
      if (chosenLandmarks.length >= 3) break;
      if (!ageCounts.has(item.age)) {
        chosenLandmarks.push(item);
        ageCounts.set(item.age, 1);
      }
    }
  }
  chosenLandmarks.sort((a, b) => a.order - b.order);

  // Score and select the 8 most important turning points (Đợt 113a: chấm bằng dữ liệu có cấu trúc)
  const LEGACY_JOB_TITLES = new Set(['Fixer', 'Syndicate', 'Wing Employee', 'Workshop Craftsman', 'Outcast']);
  const chapterKindsByAge = new Map();
  for (const entry of logs) {
    if (entry && entry.type === 'chapter' && entry.age) {
      if (!chapterKindsByAge.has(entry.age)) chapterKindsByAge.set(entry.age, new Set());
      const kind = entry.kind || (
        entry.titleEn === 'Color Fixer' ? 'color' :
        entry.titleEn === 'E.G.O' ? 'ego' :
        entry.titleEn === 'Distortion' ? 'distortion' :
        (LEGACY_JOB_TITLES.has(entry.titleEn) || /^The /.test(entry.titleEn || '')) ? 'job' :
        'rank'
      );
      if (kind) chapterKindsByAge.get(entry.age).add(kind);
    }
  }

  const closeRoles = new Set(['spouse', 'partner', 'mentor', 'friend', 'child']);
  const deceasedAges = new Set(
    Object.entries(char.npcs || {})
      .filter(([role, npc]) => closeRoles.has(role) && npc && (npc.deceased || npc.status === 'dead') && npc.fateAge != null)
      .map(([, npc]) => npc.fateAge)
  );

  const getLandmarkScore = (lm, isLast) => {
    if (isLast || lm.type === 'death') return 1000;
    const kinds = chapterKindsByAge.get(lm.age);
    const entry = logs[lm.order] || {};

    if (kinds?.has('color') || kinds?.has('ego') || entry.id === 'hana_color_ascension_trial' || entry.flagsAdd?.includes('ColorFixer') || entry.flagsAdd?.includes('EGOAwakened')) {
      return 600;
    }
    if (lm.type === 'promo' || lm.type === 'miracle' || kinds?.has('rank') || Boolean(entry.promote)) {
      return 500;
    }
    if (kinds?.has('job') || entry.id?.startsWith('ad_career_')) {
      return 400;
    }
    if (kinds?.has('loss') || deceasedAges.has(lm.age)) {
      return 300;
    }
    if (lm.type === 'danger' || entry.type === 'danger') {
      return 200;
    }
    return 100;
  };

  let finalLandmarks = chosenLandmarks;
  if (chosenLandmarks.length > 8) {
    const lastItem = chosenLandmarks[chosenLandmarks.length - 1];
    const scored = chosenLandmarks.map((lm) => ({
      item: lm,
      score: getLandmarkScore(lm, lm === lastItem),
      order: lm.order
    }));

    // Sắp xếp điểm giảm dần; nếu hòa điểm lấy mốc muộn hơn (order lớn hơn)
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.order - a.order;
    });

    const selected = [lastItem];
    const selAgeCounts = new Map();
    selAgeCounts.set(lastItem.age, 1);

    for (const entry of scored) {
      if (selected.length >= 8) break;
      if (entry.item === lastItem) continue;
      const count = selAgeCounts.get(entry.item.age) || 0;
      if (count < 2) {
        selected.push(entry.item);
        selAgeCounts.set(entry.item.age, count + 1);
      }
    }

    // Nếu chưa đủ 8 mốc do ràng buộc 2 mốc/tuổi, bổ sung nốt các mốc còn lại
    if (selected.length < 8) {
      for (const entry of scored) {
        if (selected.length >= 8) break;
        if (!selected.includes(entry.item)) {
          selected.push(entry.item);
        }
      }
    }

    selected.sort((a, b) => a.order - b.order);
    finalLandmarks = selected;
  }

  const turningPoints = finalLandmarks.map(({ order: _order, ...rest }) => rest);

  // Synthesize Deep Multi-Paragraph Life Story (Vi & En)
  const lifeStoryParagraphsVi = [];
  const lifeStoryParagraphsEn = [];

  // Paragraph 1: Origins, Family, Fate Omen & Childhood
  const lineageIntroVi = char.lineage?.parentName
    ? `Mang trong mình huyết thống thế hệ thứ ${char.generation} và kế thừa di vật 「${char.lineage.relic}」 từ ${char.lineage.parentName}, `
    : '';
  const lineageIntroEn = char.lineage?.parentName
    ? `Carrying the bloodline of Generation ${char.generation} and inheriting "${char.lineage.relicEn || localizeEnsembleName(char.lineage.relic, 'en')}" from ${char.lineage.parentName}, `
    : '';

  const lowerLead = (str) => {
    const clean = String(str || '').trim();
    if (!clean || /^[A-Z]{2,}\b/.test(clean)) return clean;
    return clean.charAt(0).toLowerCase() + clean.slice(1);
  };
  const rawFamilyVi = String(family?.nameVi || '').trim();
  const familyClauseVi = !rawFamilyVi
    ? 'trong một gia đình bình thường'
    : /^(Gia đình|Gia quyến)\b/i.test(rawFamilyVi)
      ? `trong một ${lowerLead(rawFamilyVi)}`
      : /^Dòng dõi\b/i.test(rawFamilyVi)
        ? `trong ${lowerLead(rawFamilyVi)}`
        : `, mang thân phận ${lowerLead(rawFamilyVi)}`;
  const rawFamilyEn = String(family?.nameEn || '').trim();
  const familyClauseEn = !rawFamilyEn
    ? 'into a humble household'
    : /\b(Family|Household|Lineage|Elite)\b/i.test(rawFamilyEn)
      ? `into a ${rawFamilyEn}`
      : `as ${/^[aeiou]/i.test(rawFamilyEn) ? 'an' : 'a'} ${rawFamilyEn}`;

  const childhoodLog = logs.find((l) => l.age >= 5 && l.age < 18 && !l.passed && (framesAsMajor(l) || l.type === 'causal' || l.choiceVi));
  const childhoodSnippetVi = childhoodLog
    ? ` Năm ${childhoodLog.age} tuổi, biến cố đầu đời ập đến khi ${childhoodLog.choiceVi ? `bạn chọn "${lowerLead(childhoodLog.choiceVi)}"` : 'bạn phải tự mình đối mặt với sự khắc nghiệt của khu phố'}, sớm định hình bản lĩnh sinh tồn trước tuổi trưởng thành.`
    : (char.age < 18
      ? ' Tuy nhiên, những năm tháng thơ ấu ngắn ngủi sớm khép lại giữa guồng quay của The City.'
      : ' Đi qua những năm tháng thơ ấu giữa khói bụi và tiếng còi giới nghiêm, bạn trưởng thành với ánh mắt không còn bỡ ngỡ.');
  const childhoodSnippetEn = childhoodLog
    ? ` At age ${childhoodLog.age}, an early crucible arrived when ${childhoodLog.choiceEn ? `you chose to "${lowerLead(childhoodLog.choiceEn)}"` : 'you confronted the brutality of the streets firsthand'}, tempering your instincts long before adulthood.`
    : (char.age < 18
      ? ' Yet those fragile early years closed quickly beneath the gears of The City.'
      : ' Surviving a perilous youth amidst industrial smog and distant sirens, you came of age with steady resolve.');

  lifeStoryParagraphsVi.push(
    `${lineageIntroVi}${char.name} cất tiếng khóc chào đời tại ${birthRegion.nameVi}${familyClauseVi.startsWith(',') ? familyClauseVi : ` ${familyClauseVi}`}, dưới điềm báo định mệnh 「${omen?.nameVi || 'Ngôi Sao Mờ'}」.${childhoodSnippetVi}`
  );
  lifeStoryParagraphsEn.push(
    `${lineageIntroEn}${char.name} was born in ${birthRegion.nameEn} ${familyClauseEn}, under the natal omen of "${omen?.nameEn || 'Faint Star'}".${childhoodSnippetEn}`
  );

  // Paragraph 2: Adulthood Career, Promotions, Dungeons & Masterworks
  if (char.age >= 18) {
    let careerArcVi = '';
    let careerArcEn = '';

    if (char.job === 'Distortion') {
      const formerColor = char.colorTitleAtAward ||
        ((char.unlockedRecords || []).includes('color_fixer') ? char.customTitle : null);
      careerArcVi = formerColor
        ? `Hana từng gọi bạn là Color Fixer 「${formerColor}」. Sau khi biến thành Distortion, danh hiệu ấy chỉ còn trong hồ sơ cũ.`
        : 'Đời sống cũ khép lại khi bạn biến thành Distortion.';
      careerArcEn = formerColor
        ? `Hana once named you the Color Fixer "${formerColor}". After your Distortion, the title remained only in its old records.`
        : 'Your former life ended when you became a Distortion.';
    } else if (char.job === 'Fixer') {
      careerArcVi = `Đến tuổi tự kiếm sống, bạn bước vào nghề Fixer${char.org?.name ? ` thuộc ${char.org.name}` : ''}, từng bước leo lên bậc Fixer Grade ${char.fixerGrade}${flags.includes('ColorFixer') ? ` và được Hana Association trao danh hiệu Color 「${char.customTitle}」` : ''}.`;
      careerArcEn = `Old enough to work for your keep, you took up a Fixer license${char.org?.name ? ` with ${char.org.name}` : ''}, carving your way up to Grade ${char.fixerGrade}${flags.includes('ColorFixer') ? ` and claiming the Color title "${char.customTitle}" from Hana Association` : ''}.`;
    } else if (char.job === 'Syndicate') {
      const indRank = Math.min(3, Math.max(0, char.syndicateRank || 0));
      const fRankName = char.finger && FINGER_RANKS[char.finger]
        ? FINGER_RANKS[char.finger][char.fingerRank || 0]
        : (INDEPENDENT_SYNDICATE_RANKS[indRank]?.vi || 'thành viên Syndicate');
      const fRankNameEn = char.finger && FINGER_RANKS[char.finger]
        ? FINGER_RANKS[char.finger][char.fingerRank || 0]
        : (INDEPENDENT_SYNDICATE_RANKS[indRank]?.en || 'Syndicate member');
      const syndicateStandingVi = (char.merit || 0) >= 60
        ? 'với bảng chiến tích khiến các hẻm đều dè chừng'
        : (char.merit || 0) >= 25
          ? 'với nhiều vụ thanh toán ghi tên trong sổ nội bộ'
          : 'qua những đêm trực gác và đòi nợ';
      const syndicateStandingEn = (char.merit || 0) >= 60
        ? 'backed by a heavy ledger of collected debts'
        : (char.merit || 0) >= 25
          ? 'earning a feared name across syndicate turf'
          : 'through night watches and collections';
      careerArcVi = `Ở tuổi trưởng thành, bạn bước vào thế giới ngầm của ${char.finger ? `The ${char.finger}` : 'Syndicate'}, dùng máu và kỷ luật để vươn lên vị trí ${fRankName} ${syndicateStandingVi}.`;
      careerArcEn = `In adulthood, you swore yourself to ${char.finger ? `The ${char.finger}` : 'the Backstreets Syndicates'}, rising through iron discipline to the rank of ${fRankNameEn}, ${syndicateStandingEn}.`;
    } else if (char.job === 'Wing Employee') {
      const wRank = Math.min(WING_RANKS.length - 1, char.wingRank || 0);
      careerArcVi = `Từ tuổi trưởng thành, bạn khoác tấm áo Feather tại ${region.nameVi}, đi qua các đợt thanh lọc nội bộ để giữ chức ${WING_RANKS[wRank]?.titleVi || 'Nhân viên Wing'}.`;
      careerArcEn = `Upon coming of age, you entered corporate service as a Wing Feather in ${region.nameEn}, surviving internal purges and Singularity quotas to reach ${WING_RANKS[wRank]?.titleEn || 'Wing Operative'}.`;
    } else if (char.job === 'Workshop Craftsman') {
      const craftStandingVi = (char.merit || 0) >= 50 ? 'gây dựng tiếng tăm khắp các khu xưởng' : 'bền bỉ giữ đỏ lửa lò qua từng đơn đặt hàng';
      const craftStandingEn = (char.merit || 0) >= 50 ? 'earning renown across the district workshops' : 'keeping the forge lit through steady commissions';
      careerArcVi = `Bạn gắn đời mình với búa sắt người thợ rèn Workshop, ${craftStandingVi}${char.craftWeapon ? ` và tự tay rèn nên vũ khí 「${char.craftWeapon.name}」 được Tres Association đóng dấu đăng ký` : ''}.`;
      careerArcEn = `You dedicated your adulthood to the furnace and anvil as a Workshop Craftsman, ${craftStandingEn}${char.craftWeapon ? ` and forging the registered weapon "${char.craftWeapon.name}"` : ''}.`;
    } else {
      careerArcVi = `Trong suốt những năm trưởng thành tại ${region.nameVi}, bạn xoay xở mưu sinh qua từng mùa biến động của The City.`;
      careerArcEn = `Throughout your adult years in ${region.nameEn}, you fought to carve out a living across the shifting seasons of The City.`;
    }

    const promoMoments = turningPoints.filter((tp) => (tp.type === 'promo' || tp.type === 'miracle') && tp.titleVi).slice(0, 3);
    const milestoneTextVi = promoMoments.length > 0
      ? ` Những dấu mốc lớn nhất của chặng đường ấy nằm ở các năm tuổi ${promoMoments.map((m) => `${m.age} (${m.titleVi})`).join(', ')}.`
      : '';
    const milestoneTextEn = promoMoments.length > 0
      ? ` Defining milestones marked your path at ages ${promoMoments.map((m) => `${m.age} (${m.titleEn || m.titleVi})`).join(', ')}.`
      : '';

    const egoOrDistortVi = flags.includes('EGOAwakened')
      ? ` Trước ánh mặt trời của Carmen, bạn khước từ buông xuôi để kết tinh nỗi đau thành E.G.O 「${char.egoName || 'Bất Khuất'}」.`
      : flags.includes('Distorted')
        ? ' Khi tâm thức chạm ngưỡng rạn vỡ, bạn nghe theo lời thì thầm của Carmen và biến đổi thành Distortion.'
        : (char.resonance || 0) >= 40
          ? ' Tâm thức bạn nhiều lần rung chuyển trước tiếng gọi của Ánh Sáng khi Resonance dâng sát ngưỡng rạn vỡ.'
          : '';
    const egoOrDistortEn = flags.includes('EGOAwakened')
      ? ` Standing before Carmen’s sun, you refused to yield and crystallized your resolve into the Effloresced E.G.O "${localizeEnsembleName(char.egoName, 'en') || 'Unbowed'}".`
      : flags.includes('Distorted')
        ? ' At the breaking point of grief and resonance, you surrendered to Carmen’s whisper and transformed into a Distortion.'
        : (char.resonance || 0) >= 40
          ? ' Your psyche trembled repeatedly before the Light as Resonance surged toward the breaking point.'
          : '';

    lifeStoryParagraphsVi.push(`${careerArcVi}${milestoneTextVi}${egoOrDistortVi}`);
    lifeStoryParagraphsEn.push(`${careerArcEn}${milestoneTextEn}${egoOrDistortEn}`);
  }

  // Paragraph 3: Relationships, Loved Ones & Karma Scars
  const npcs = char.npcs || {};
  const spouseOrLover = npcs.spouse || npcs.lover;
  const childNpc = npcs.child;
  const partnerOrFriend = npcs.partner || npcs.mentor || npcs.friend;
  const bondPartsVi = [];
  const bondPartsEn = [];

  if (spouseOrLover) {
    const spName = spouseOrLover.nameVi || spouseOrLover.name || 'người thương';
    if (spouseOrLover.deceased || spouseOrLover.status === 'dead') {
      bondPartsVi.push(`Bạn từng tìm thấy hơi ấm hiếm hoi bên cạnh ${spName}, trước khi biến cố cướp mất người ấy và để lại khoảng trống khó lấp`);
      bondPartsEn.push(`You once found rare warmth beside ${spName}, before loss tore them away and left a quiet void`);
    } else {
      bondPartsVi.push(`Sau những giờ giới nghiêm của The City, bạn giữ được một mái nhà yên tĩnh bên cạnh ${spName}`);
      bondPartsEn.push(`Behind barred doors after curfew in The City, you kept a quiet home beside ${spName}`);
    }
  }
  if (childNpc) {
    const chName = childNpc.nameVi || childNpc.name || 'con của bạn';
    bondPartsVi.push(`truyền lại cách sống sót cho người con ${chName}`);
    bondPartsEn.push(`passing on how to survive to your child, ${chName}`);
  }
  if (partnerOrFriend) {
    const pfName = partnerOrFriend.nameVi || partnerOrFriend.name || 'người đồng hành';
    bondPartsVi.push(`sát cánh cùng ${pfName} qua những đêm hiểm nguy`);
    bondPartsEn.push(`standing beside ${pfName} through dangerous nights`);
  }

  const scarCount = (char.scars || []).length;
  const scarSentenceVi = scarCount > 0
    ? ` Trên cơ thể và tâm thức bạn hằn lại những vết sẹo không phai (${char.scars.slice(0, 3).join(', ')}), cái giá phải trả để đi hết chặng đường ấy.`
    : ' Bạn đi qua những cơn sóng ngầm mà vẫn giữ được tâm thức không hằn sẹo vĩnh viễn.';
  const scarSentenceEn = scarCount > 0
    ? ` Etched across your flesh and psyche were permanent scars (${char.scars.slice(0, 3).join(', ')}), the price paid to endure.`
    : ' Through caution and steadiness, you navigated the storms while keeping your psyche unmarred by permanent scars.';

  if (bondPartsVi.length > 0 || scarCount > 0) {
    const bondLeadVi = bondPartsVi.length > 0 ? `${bondPartsVi.join(', ')}.` : 'Bạn bước đi độc hành giữa hàng triệu bóng người xa lạ của The City.';
    const bondLeadEn = bondPartsEn.length > 0 ? `${bondPartsEn.join(', ')}.` : 'You walked a solitary road amidst the millions of strangers in The City.';
    lifeStoryParagraphsVi.push(`${bondLeadVi}${scarSentenceVi}`);
    lifeStoryParagraphsEn.push(`${bondLeadEn}${scarSentenceEn}`);
  }

  // Paragraph 4: Final Reckoning, Lifespan Context & Heirloom
  const lifeCompVi = lifespanDiff >= 10
    ? `vượt xa tuổi thọ thường thấy ở ${region.nameVi}`
    : lifespanDiff >= 0
      ? `đi trọn tuổi thọ thường thấy của cư dân ${region.nameVi}`
      : `khép lại sớm hơn tuổi thọ thường thấy ở ${region.nameVi}`;
  const lifeCompEn = lifespanDiff >= 10
    ? `far outliving the usual lifespan in ${region.nameEn}`
    : lifespanDiff >= 0
      ? `reaching a full span of years for ${region.nameEn}`
      : `cut short before the usual lifespan in ${region.nameEn}`;

  if (char.endingId === 'library_threshold') {
    lifeStoryParagraphsVi.push(`Ở tuổi ${char.age}, bạn sống sót qua án của The Head và bị đẩy ra Outskirts. Nhiều ngày sau, giữa vùng đất không tên, bạn tìm thấy The Library. Bạn đặt tay lên tay nắm và đẩy cửa bước vào. Hồ sơ của bạn dừng ở đó.`);
    lifeStoryParagraphsEn.push(`At age ${char.age}, you survived the Head’s judgment and were cast into the Outskirts. Days later, in an unnamed waste, you found the Library. You took the handle and pushed the door open. Your record ends there.`);
  } else if (closedBy?.closing) {
    const closing = closedBy.closing({ age: char.age, relic: relicName });
    lifeStoryParagraphsVi.push(closing.vi);
    lifeStoryParagraphsEn.push(closing.en.replaceAll(relicName, relicNameEn));
  } else {
    const wealthEnd = char.stats?.wealth ?? 0;
    const repEnd = char.stats?.rep ?? 0;
    const estateVi = wealthEnd >= 60 ? 'một gia sản vững vàng' : wealthEnd >= 20 ? 'khoản tích cóp vừa đủ che chở người đi sau' : 'vài đồng tích cóp ít ỏi';
    const standingVi = repEnd >= 60 ? 'danh tiếng vang khắp các khu phố' : repEnd >= 25 ? 'chút tiếng tăm còn người nhắc nhớ' : 'một cái tên lặng lẽ trong sổ cư trú';
    const estateEn = wealthEnd >= 60 ? 'a substantial estate' : wealthEnd >= 20 ? 'modest savings to shelter an heir' : 'meager savings';
    const standingEn = repEnd >= 60 ? 'a name remembered across the districts' : repEnd >= 25 ? 'a quiet measure of renown' : 'an unheralded name in the ward registry';
    lifeStoryParagraphsVi.push(
      `Ở tuổi ${char.age}, ${lifeCompVi}, hành trình ấy dừng lại: ${deathCauseVi}. Khi tấm màn hạ xuống, bạn để lại 「${relicName}」, ${estateVi} cùng ${standingVi} cho thế hệ kế tiếp.`
    );
    lifeStoryParagraphsEn.push(
      `At age ${char.age}, ${lifeCompEn}, your chronicle reached its final page: ${deathCauseEn}. When the curtain fell, you left behind "${relicNameEn}", ${estateEn}, and ${standingEn} for the next generation to carry forward.`
    );
  }

  // Build Rich Records List (combining unlocked CODEX_RECORDS + contextual life achievements)
  const newKeysSet = new Set(char.newRecordsThisLife || []);
  const RARITY_ORDER = { miracle: 6, myth: 5, legend: 4, epic: 3, rare: 2, uncommon: 1, common: 0 };
  const RARITY_LABELS = {
    miracle: { vi: 'Thần tích', en: 'Miracle' },
    myth: { vi: 'Huyền thoại', en: 'Mythic' },
    legend: { vi: 'Truyền thuyết', en: 'Legendary' },
    epic: { vi: 'Sử thi', en: 'Epic' },
    rare: { vi: 'Hiếm', en: 'Rare' },
    uncommon: { vi: 'Khá hiếm', en: 'Uncommon' },
    common: { vi: 'Phổ biến', en: 'Common' }
  };

  const recordsList = (char.unlockedRecords || [])
    .map((key) => {
      const def = CODEX_RECORDS.find((r) => r.key === key);
      if (!def) return null;
      const tier = def.tier || 'common';
      const clearedDungeon = (char.dungeonRecord?.clears || []).find((clear) =>
        (key === 'lobotomy_containment_clear' && clear.id === 'dungeon_lobotomy_ruin') ||
        (key === 'outskirts_ruins_clear' && clear.id === 'dungeon_outskirts_ruins') ||
        (key === 'great_lake_clear' && clear.id === 'dungeon_great_lake') ||
        (key === 'dungeon_first_clear' && Boolean(clear.id))
      );
      const dungeonName = clearedDungeon && DUNGEON_DEFINITIONS[clearedDungeon.id];
      const colorTitle = char.colorTitleAtAward || char.customTitle;
      const directorName = char.directorAppointment?.name ||
        (char.affiliation?.director ? char.affiliation.name : null);
      return {
        key,
        vi: key === 'color_fixer' && colorTitle ? `Color Fixer: ${colorTitle}` : def.vi,
        en: key === 'color_fixer' && colorTitle ? `Color Fixer: ${colorTitle}` : def.en,
        hintVi: def.hintVi,
        hintEn: def.hintEn,
        evidenceVi: key === 'color_fixer' && char.colorAwardAge != null
          ? `Hana trao sắc chỉ ở tuổi ${char.colorAwardAge}.`
          : key === 'association_director' && directorName
            ? `Đã giữ ghế Director của ${directorName}.`
            : dungeonName ? `Tuổi ${clearedDungeon.age}: hoàn thành ${dungeonName.titleVi}.` : null,
        evidenceEn: key === 'color_fixer' && char.colorAwardAge != null
          ? `Hana conferred the title at age ${char.colorAwardAge}.`
          : key === 'association_director' && directorName
            ? `Held the Director's chair at ${directorName}.`
            : dungeonName ? `Age ${clearedDungeon.age}: cleared ${dungeonName.titleEn}.` : null,
        tier,
        rarityVi: RARITY_LABELS[tier]?.vi || 'Phổ biến',
        rarityEn: RARITY_LABELS[tier]?.en || 'Common',
        isNew: newKeysSet.has(key)
      };
    })
    .filter(Boolean);

  if (flags.includes('FullBodyProsthetic') && !recordsList.some(r => r.key === 'fine_prosthetic')) {
    recordsList.push({
      key: 'fine_prosthetic',
      vi: 'Phẫu thuật cơ thể cơ khí toàn phần',
      en: 'Underwent fine prosthetic surgery',
      hintVi: 'Thay thế cơ thể sinh học bằng khung cơ khí cao cấp.',
      hintEn: 'Replaced biological flesh with a high-grade prosthetic frame.',
      tier: 'common',
      rarityVi: 'Phổ biến',
      rarityEn: 'Common',
      isNew: false
    });
  }

  recordsList.sort((a, b) => {
    const rarity = (RARITY_ORDER[b.tier] || 0) - (RARITY_ORDER[a.tier] || 0);
    if (rarity) return rarity;
    if (a.isNew !== b.isNew) return a.isNew ? -1 : 1;
    return a.vi.localeCompare(b.vi, 'vi');
  });

  // Build Final State Tags (Traits, Relationships, Equipment, Encounters & Scars)
  const lifeTags = [];
  if (flags.includes('Married') || npcIsActive(char.npcs?.spouse)) {
    lifeTags.push({ vi: 'Đã lập gia đình', en: 'Has a family', kind: 'bond' });
  } else if (npcIsActive(char.npcs?.lover)) {
    lifeTags.push({ vi: 'Có người thương', en: 'Has a lover', kind: 'bond' });
  }
  if (npcIsActive(char.npcs?.child) || flags.includes('HasChild')) {
    lifeTags.push({ vi: 'Có con nối dõi', en: 'Has a child', kind: 'bond' });
  }
  if (npcIsActive(char.npcs?.partner)) {
    lifeTags.push({ vi: 'Có cộng sự sinh tử', en: 'Sworn partner', kind: 'bond' });
  }
  if (char.job === 'Fixer') {
    lifeTags.push({ vi: `Thẻ Fixer Grade ${char.fixerGrade}`, en: `Grade ${char.fixerGrade} Fixer ID`, kind: 'career' });
  } else if (char.job === 'Wing Employee') {
    lifeTags.push({ vi: 'Thẻ nhân viên Wing', en: 'Wing employee ID', kind: 'career' });
  } else if (char.job === 'Syndicate') {
    lifeTags.push({ vi: `Huy hiệu ${char.finger ? `The ${char.finger}` : 'Syndicate'}`, en: `${char.finger ? `The ${char.finger}` : 'Syndicate'} Crest`, kind: 'career' });
  } else if (char.job === 'Workshop Craftsman') {
    lifeTags.push({ vi: 'Chứng nhận Thợ rèn Tres', en: 'Tres Atelier License', kind: 'career' });
  }
  if (char.org?.name) {
    lifeTags.push({ vi: `Thuộc ${char.org.name}`, en: `Affiliated: ${char.org.name}`, kind: 'career' });
  }
  if (flags.includes('FullBodyProsthetic') || flags.includes('ProstheticClinic')) {
    lifeTags.push({ vi: 'Cơ thể cơ khí tinh xảo', en: 'Fine prosthesis', kind: 'tech' });
  }
  if (char.craftWeapon) {
    lifeTags.push({ vi: `Vũ khí: ${char.craftWeapon.name}`, en: `Weapon: ${char.craftWeapon.name}`, kind: 'tech' });
  }
  if ((char.resonance || 0) >= 25) {
    lifeTags.push({ vi: 'Đã tiếp xúc Dị thể (Abnormality)', en: 'Has seen an Abnormality', kind: 'lore' });
  }
  if ((char.resonance || 0) >= 50 || flags.includes('Distorted') || flags.includes('EGOAwakened')) {
    lifeTags.push({ vi: 'Chứng kiến hiện tượng Distortion', en: 'Witnessed a Distortion', kind: 'lore' });
  }
  if (char.backgroundTrait?.nameVi) {
    lifeTags.push({ vi: char.backgroundTrait.nameVi, en: char.backgroundTrait.nameEn || char.backgroundTrait.nameVi, kind: 'trait' });
  }
  (char.scars || []).slice(0, 5).forEach((s) => {
    lifeTags.push({ vi: `Sẹo: ${s}`, en: `Scar: ${s}`, kind: 'scar' });
  });
  const ambition = AMBITIONS.find((goal) => goal.id === char.ambition?.id);
  const ambitionAchieved = Boolean(ambition && (char.ambition.complete || ambitionComplete(char)));
  if (ambition) lifeTags.push({
    vi: `${ambitionAchieved ? 'Đã đạt' : 'Dở dang'}: ${ambition.vi}`,
    en: `${ambitionAchieved ? 'Fulfilled' : 'Unfinished'}: ${ambition.en}`,
    kind: ambitionAchieved ? 'achievement' : 'ambition'
  });
  if (char.ensembleScore) lifeTags.push({ vi: 'Sống sót qua buổi diễn của Reverberation Ensemble', en: 'Survived the Reverberation Ensemble performance', kind: 'achievement' });

  return {
    endingId: char.endingId || null,
    // a life with hand-written events (the Weaver page): the epitaph and the archive say so
    sandbox: flags.includes(SANDBOX_FLAG),
    ambitionId: ambition?.id || '',
    ambitionAchieved,
    ensembleScore: Boolean(char.ensembleScore),
    lifeEnding: char.lifeEnding || null,
    generation: char.generation,
    seed: char.seed,
    name: char.name,
    age: char.age,
    regionId: char.regionId,
    regionNameVi: region.nameVi,
    regionNameEn: region.nameEn,
    birthRegionNameVi: birthRegion.nameVi,
    birthRegionNameEn: birthRegion.nameEn,
    familyNameVi: family.nameVi || 'Gia đình bình thường',
    familyNameEn: family.nameEn || 'Ordinary family',
    job: char.job,
    finger: char.finger || null,
    colorHex: char.colorData?.color || null,
    signatureRecordKey: char.job === 'Distortion' || flags.includes('Distorted') ? 'distortion_awaken' : null,
    occupationVi,
    occupationEn,
    epitaphTitleVi,
    epitaphTitleEn,
    poeticQuoteVi,
    poeticQuoteEn,
    localAvgLife,
    lifespanDiff,
    rankTier,
    deathCauseVi,
    deathCauseEn,
    health: Math.max(0, char.stats?.health ?? 0),
    sanity: Math.max(0, char.stats?.sanity ?? 0),
    wealth: char.stats?.wealth ?? 0,
    reserveAhn: char.reserveAhn || 0,
    hasLineageEndowment: Boolean(flags.includes('LineageEndowmentFund')),
    // One list for the whole bloodline; a second copy under seenEvents doubled the size of every legacy
    bloodlineSeenEvents: [...new Set([...(char.bloodlineSeenEvents || []), ...(char.seenEvents || [])])],
    rep: char.stats?.rep ?? 0,
    network: char.stats?.network ?? 0,
    resonance: char.resonance || 0,
    merit: char.merit || 0,
    scars: [...(char.scars || [])],
    relic: relicName,
    relicEn: relicNameEn,
    lifeStoryParagraphsVi,
    lifeStoryParagraphsEn,
    turningPoints: turningPoints.slice(0, 8),
    recordsList,
    newRecordsCount: recordsList.filter(r => r.isNew).length,
    lifeTags,
    successorRelation,
    successorInfo: succInfo,
    successorType: succInfo.type,
    successorTitleVi: succInfo.titleVi,
    successorTitleEn: succInfo.titleEn,
    successorIntroVi: succInfo.introVi,
    successorIntroEn: succInfo.introEn,
    childAgeWhenParentDied,
    hasChild: npcIsActive(char.npcs?.child),
    childName: char.npcs?.child?.nameVi || '',
    hasVendetta: (char.heat || 0) >= 40 || flags.includes('MiddleVendetta'),
    npcs: char.npcs || {},
    ...extractAncestorEchoProfile(char)
  };
}
