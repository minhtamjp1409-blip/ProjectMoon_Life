// How a finished year reads in the feed: quiet years, city bulletins and the folded daily digest.
import { CITY_BULLETINS } from '../data/cityBulletins.js';
import { REGIONS } from '../data/worldData.js';
import { createRNG } from './gameEngine.js';
import { isNest, isOutskirts, splitTitle } from './yearPlanner.js';

/**
 * A year is quiet when its plan contains only routine daily slots:
 * no minor choices, mishaps, major events, contracts, dungeons, cutscenes, or chapter turns,
 * and no NPC changes state (death / historic passing).
 * Early childhood (ages 0-4) is excluded since it already has only one daily per year.
 */
export function isQuietYear(plan, char) {
  if (!plan || !Array.isArray(plan) || plan.length === 0) return false;
  if (!char || (char.age ?? 0) < 5) return false;

  // Plan must contain only 'daily' moments with no forced events or causal hooks
  const onlyDailies = plan.every((it) => it && it.kind === 'daily' && !it.forcedEventId && !it.isCausal && !it.thread);
  if (!onlyDailies) return false;

  // No pending interactions
  if (
    char.pendingMinor ||
    char.pendingEvent ||
    char.pendingContract ||
    char.pendingDungeon ||
    char.pendingModal ||
    char.pendingLead ||
    char.pendingYearPlan
  ) {
    return false;
  }

  // No close NPC passed away or changed state at this age
  if (char.npcs) {
    for (const npc of Object.values(char.npcs)) {
      if (!npc) continue;
      if ((npc.deceased || npc.status === 'dead') && npc.fateAge === char.age) return false;
      if (npc.statusChangedAge === char.age) return false;
    }
  }

  // Parent historic passing milestone
  if (char.npcs?.parent?.alive && char.age >= char.npcs.parent.deathAgeInChildLife) {
    return false;
  }

  return true;
}

export const AMBIENT_YEAR_LINES = {
  backstreets: [
    { vi: 'Một năm trôi qua giữa tiếng mưa axit rơi đều đều trên mái tôn Backstreets.', en: 'A year passes beneath the steady drone of acid rain upon Backstreets roofs.' },
    { vi: 'Khói xả công nghiệp và tiếng còi ca kíp lấp đầy một năm không biến cố lớn.', en: 'Industrial exhaust and shift whistles fill a year free of major turmoil.' },
    { vi: 'Sau 3:13 AM, cửa phòng trọ đóng chặt, nhịp sống ngõ hẻm vẫn lặp lại từng ngày.', en: 'Past 3:13 AM, tenement doors stay bolted as the alley rhythm repeats day by day.' },
    { vi: 'Ánh đèn neon nhấp nháy trên mặt đường ướt đánh dấu những ngày tháng thường nhật.', en: 'Flickering neon over wet asphalt marks the passage of routine days.' },
    { vi: 'Tiếng búa đập từ các xưởng cơ khí nhỏ vang vọng qua bốn mùa bình lặng.', en: 'Hammer strikes from small machine workshops echo through four quiet seasons.' },
    { vi: 'Bạn quen dần với nhịp bước trên hè phố cũ và mùi dầu máy Backstreets.', en: 'You walk the familiar pavements amid the customary scent of Backstreets machine oil.' },
    { vi: 'Một năm trôi qua không xáo trộn, chỉ có những bữa ăn đạm bạc sau giờ làm.', en: 'An undisturbed year drifts by, marked only by frugal meals after work.' },
    { vi: 'Những mùa mưa nắng Backstreets lặng lẽ đi qua khung cửa sổ gỉ sét.', en: 'Seasons of rain and haze slip quietly past your rusted window.' },
    { vi: 'Cuộc sống ngõ ngách trôi đi đều đặn, không có hợp đồng rắc rối nào gõ cửa.', en: 'Alley life rolls on steadily, with no troubled contracts at your door.' },
    { vi: 'Một năm trôi qua bình ổn giữa nhịp thở không ngừng của The City.', en: 'A steady year passes within the ceaseless pulse of The City.' }
  ],
  nest: [
    { vi: 'Một năm trôi qua êm ả dưới trật tự kỷ luật nghiêm ngặt của Nest.', en: 'A tranquil year passes beneath the strict disciplinary order of the Nest.' },
    { vi: 'Những tiếng chuông đổi ca và dòng người đều đặn đánh dấu một năm bình yên.', en: 'Shift bells and punctual crowds mark a peaceful year.' },
    { vi: 'Cuộc sống trong Nest diễn ra chuẩn mực, không một gợn sóng bất thường.', en: 'Life in the Nest moves orderly, without a ripple of unrest.' },
    { vi: 'Thời gian trôi đi ngăn nắp sau những tòa cao ốc kính phản quang của Wing.', en: 'Time glides smoothly behind the reflective glass towers of the Wing.' },
    { vi: 'Một năm bình ổn trôi qua theo đúng biểu đồ điều phối công việc định sẵn.', en: 'A stable year unfolds precisely according to corporate scheduling.' },
    { vi: 'Bạn trải qua những ngày tháng trật tự giữa khuôn viên sạch sẽ của Nest.', en: 'You spend orderly days along the pristine avenues of the Nest.' },
    { vi: 'Mọi thủ tục sinh hoạt đều tuân thủ quy chuẩn của Wing trong suốt một năm qua.', en: 'Every daily routine complied with Wing regulations over the past year.' },
    { vi: 'Mùa tiếp mùa trôi qua yên ắng dưới sự bảo hộ của Wing.', en: 'Season follows season in quiet safety under the protection of the Wing.' },
    { vi: 'Tiếng máy điều hòa trung tâm rì rầm lấp đầy một năm làm việc chuẩn mực.', en: 'The hum of central climate control fills a year of standard shifts.' },
    { vi: 'Không có sự cố an ninh nào làm xáo trộn cuộc sống ngăn nắp nơi đây.', en: 'No security alarms disturbed the neat routine of this quarter.' }
  ],
  outskirts: [
    { vi: 'Một năm lặng lẽ trôi qua giữa vùng hoang tàn của Outskirts.', en: 'A quiet year passes across the windswept Outskirts.' },
    { vi: 'Ngoài Bức Tường, gió cát và tro bụi lặng lẽ trôi qua từng mùa.', en: 'Dust and wild winds blow through the seasons beyond the Wall.' },
    { vi: 'Bạn trải qua một năm yên ắng bên ngoài bức tường The City.', en: 'You spend an undisturbed year outside the City walls.' },
    { vi: 'Thời gian chậm rãi trôi qua giữa những tàn tích đổ nát không bóng người.', en: 'Time drifts slowly past the desolate ruins without a living soul.' },
    { vi: 'Một năm sinh tồn bình thản dưới vòm trời u trầm của Outskirts.', en: 'A year of quiet survival beneath the overcast Outskirts sky.' },
    { vi: 'Không có quái vật hay bão tro bụi nào ập đến nơi dựng lều trong năm nay.', en: 'Neither monsters nor ash storms swept over your shelter this year.' },
    { vi: 'Những ngày tháng nơi Outskirts trôi qua chậm chạp bên ánh lửa trại.', en: 'Days in the Outskirts slip by slow and silent beside the campfire.' },
    { vi: 'Bạn gom góp thêm một năm bình yên giữa bãi đất hoang ngoài vòng rào.', en: 'You gather another peaceful year amid the rough expanse outside the perimeter.' },
    { vi: 'Một năm êm ả trôi qua mà không có toán cướp hay dị thể nào quấy phá.', en: 'A calm year passes with no marauders or entities disturbing your path.' },
    { vi: 'Cuộc sống tự do nhưng đơn độc lặng lẽ đi qua thêm một vòng tuổi.', en: 'A solitary, untroubled life marks another year lived in the wastes.' }
  ]
};

function formatDistrictLabel(regionId) {
  const found = REGIONS.find((r) => r.id === regionId);
  if (found?.ward) return `District ${found.ward}`;
  return regionId === 'OUTSKIRTS' ? 'Outskirts' : `District ${regionId || ''}`.trim();
}

function buildAncestorBulletin(lm) {
  const distLabel = formatDistrictLabel(lm.districtId);
  const id = lm.key || `ancestor_${lm.kind}_${lm.districtId}_${lm.name}`;
  if (lm.kind === 'color') {
    const titlePart = lm.title ? ` (${lm.title})` : '';
    return {
      id,
      isAncestorBulletin: true,
      vi: `Tượng đồng của Color Fixer ${lm.name}${titlePart} dựng giữa quảng trường ${distLabel}. Đám Fixer trẻ đi ngang vẫn dừng lại đọc bia tên.`,
      en: `A bronze statue of Color Fixer ${lm.name}${titlePart} stands on the ${distLabel} plaza. Young Fixers still pause to read its plaque.`
    };
  }
  if (lm.kind === 'distortion') {
    return {
      id,
      isAncestorBulletin: true,
      vi: `Dãy phố cũ ở ${distLabel} vẫn căng dây rào trắng từ vụ Distortion ${lm.name}. Lính tuần bảo dấu cộng hưởng còn hằn trên vách tường.`,
      en: `The old block in ${distLabel} still sits behind white cordon tape from ${lm.name}'s Distortion. Patrols say resonance clings to the brickwork.`
    };
  }
  if (lm.kind === 'office') {
    const officeVi = lm.officeName || `Office cũ của ${lm.name}`;
    const officeEn = lm.officeName || `${lm.name}'s old Office`;
    return {
      id,
      isAncestorBulletin: true,
      vi: `Biển hiệu ${officeVi} vẫn treo trên phố chính ${distLabel}. Khách đặt kèo mới vẫn quen gọi tên người mở đầu là ${lm.name}.`,
      en: `The signboard of ${officeEn} still hangs over ${distLabel}'s main lane. Clients still know ${lm.name} as its founder.`
    };
  }
  const synLabel = lm.finger ? `The ${lm.finger}` : 'Syndicate';
  return {
    id,
    isAncestorBulletin: true,
    vi: `Đám đàn em vùng ${distLabel} vẫn giữ quy tắc cũ từ thời ${lm.name} cầm nhánh ${synLabel}. Bàn cuối quán trà hẻm tư chưa ai dám ngồi.`,
    en: `Crews in ${distLabel} still keep the house rules from when ${lm.name} ran the ${synLabel} branch. Nobody takes the back table at the alley teahouse.`
  };
}

export function pickCityBulletin(char, age, rng = Math.random) {
  if (!char) return null;
  const out = isOutskirts(char);
  const nest = isNest(char);
  const regionKey = out ? 'outskirts' : (nest ? 'nest' : 'backstreets');
  const seen = new Set(char.seenBulletins || []);
  const regionId = char.regionId || char.birthRegion || null;

  const ancestorShown = Number(char.ancestorBulletinsShown || 0);
  if (age >= 8 && regionId && ancestorShown < 2) {
    const landmarks = Array.isArray(char.ancestorLandmarks) ? char.ancestorLandmarks : [];
    const matchingAncestor = landmarks.filter((lm) => {
      if (!lm || lm.districtId !== regionId) return false;
      const key = lm.key || `ancestor_${lm.kind}_${lm.districtId}_${lm.name}`;
      return !seen.has(key);
    });
    if (matchingAncestor.length > 0 && rng() < 0.45) {
      const picked = matchingAncestor[Math.floor(rng() * matchingAncestor.length)];
      const built = buildAncestorBulletin(picked);
      if (!Array.isArray(char.seenBulletins)) char.seenBulletins = [];
      char.seenBulletins.push(built.id);
      char.ancestorBulletinsShown = ancestorShown + 1;
      return built;
    }
  }

  const eligible = CITY_BULLETINS.filter((b) => {
    if (seen.has(b.id)) return false;
    if (Array.isArray(b.age) && (age < b.age[0] || age > b.age[1])) return false;
    if (b.era && b.era !== char.era) return false;
    if (b.scope === regionKey) return true;
    if (b.scope === 'wing' && !out && regionId && b.regionId === regionId) return true;
    return false;
  });
  if (eligible.length === 0) return null;

  const chosen = eligible[Math.floor(rng() * eligible.length)];
  if (!Array.isArray(char.seenBulletins)) char.seenBulletins = [];
  char.seenBulletins.push(chosen.id);
  return chosen;
}

/**
 * Creates a year_digest log entry from a list of routine daily log entries.
 * Đợt 120a: Năm yên ả chỉ đúng 1 dòng (daily đáng nhớ nhất, bản tin City hoặc câu ambient theo nơi chốn).
 */
export function createYearDigest(dailyEntries, age, { quiet = true, char = null, rng = null } = {}) {
  if (!dailyEntries || dailyEntries.length === 0) return null;
  const ids = dailyEntries.map((e) => e.id);

  // Sum deltas across all merged dailies
  const deltaMap = {};
  for (const e of dailyEntries) {
    if (Array.isArray(e.deltas)) {
      for (const d of e.deltas) {
        if (d && d.k && typeof d.v === 'number') {
          deltaMap[d.k] = (deltaMap[d.k] || 0) + d.v;
        }
      }
    }
  }
  const STAT_ORDER = ['health', 'sanity', 'wealth', 'network', 'rep', 'merit', 'heat', 'taboo', 'resonance'];
  const deltas = [];
  for (const k of STAT_ORDER) {
    if (deltaMap[k]) deltas.push({ k, v: deltaMap[k] });
  }
  for (const [k, v] of Object.entries(deltaMap)) {
    if (v && !STAT_ORDER.includes(k)) deltas.push({ k, v });
  }

  // Đợt 120a: Chọn một câu duy nhất cho năm yên ả (tình huống đáng nhớ nhất, bản tin City hoặc câu ambient theo nơi chốn)
  const r = typeof rng === 'function' ? rng : createRNG(`${char?.seed || 'digest'}:${age}:${ids.join(':')}`);

  // Tìm daily đáng nhớ nhất: có tên NPC hoặc có tổng delta (độ lớn) lớn nhất
  const scored = dailyEntries.map((e) => {
    const mag = (e.deltas || []).reduce((acc, d) => acc + Math.abs(d.v || 0), 0);
    let hasNpc = Boolean(e.npc || e.npcId || e.npcRole || e.hasNpc);
    if (!hasNpc && char?.npcs) {
      for (const role of Object.keys(char.npcs)) {
        const npc = char.npcs[role];
        if (npc?.nameVi && (e.vi || '').includes(npc.nameVi)) { hasNpc = true; break; }
        if (npc?.nameEn && (e.en || '').includes(npc.nameEn)) { hasNpc = true; break; }
      }
    }
    const score = (hasNpc ? 100 : 0) + mag;
    return { entry: e, score, mag };
  });

  const bestScore = Math.max(...scored.map((s) => s.score));
  const candidates = scored.filter((s) => s.score === bestScore && s.score > 0);

  let vi = '';
  let en = '';
  let bulletinVi = '';
  let bulletinEn = '';

  if (candidates.length > 0) {
    // Keep the stat-changing or NPC daily as headline so chips always match the story
    const chosen = candidates[Math.floor(r() * candidates.length)].entry;
    const bVi = splitTitle(chosen.vi || '').body.trim();
    const bEn = splitTitle(chosen.en || '').body.trim();
    vi = /[.!?]$/.test(bVi) ? bVi : `${bVi}.`;
    en = /[.!?]$/.test(bEn) ? bEn : `${bEn}.`;
    // Spread City bulletins evenly across the whole life (~1/4-1/2 of consolidated years)
    if (char && r() < (quiet ? 0.45 : 0.25)) {
      const bulletin = pickCityBulletin(char, age, r);
      if (bulletin) {
        bulletinVi = bulletin.vi;
        bulletinEn = bulletin.en;
      }
    }
  } else {
    // No daily shifted stats or featured an NPC: let a concrete City bulletin lead
    const bulletin = char ? pickCityBulletin(char, age, r) : null;
    if (bulletin) {
      vi = bulletin.vi;
      en = bulletin.en;
      if (bulletin.spDelta && char.stats) {
        const prevSp = char.stats.sanity ?? 0;
        const nextSp = Math.max(0, Math.min(100, prevSp + bulletin.spDelta));
        const actualSp = nextSp - prevSp;
        if (actualSp !== 0) {
          char.stats.sanity = nextSp;
          deltaMap.sanity = (deltaMap.sanity || 0) + actualSp;
          const idx = deltas.findIndex((d) => d.k === 'sanity');
          if (deltaMap.sanity === 0) {
            if (idx >= 0) deltas.splice(idx, 1);
          } else if (idx >= 0) {
            deltas[idx] = { k: 'sanity', v: deltaMap.sanity };
          } else {
            deltas.push({ k: 'sanity', v: deltaMap.sanity });
          }
        }
      }
    } else if (dailyEntries.length > 0) {
      const chosen = dailyEntries[Math.floor(r() * dailyEntries.length)];
      const bVi = splitTitle(chosen.vi || '').body.trim();
      const bEn = splitTitle(chosen.en || '').body.trim();
      vi = /[.!?]$/.test(bVi) ? bVi : `${bVi}.`;
      en = /[.!?]$/.test(bEn) ? bEn : `${bEn}.`;
    } else {
      const out = char ? isOutskirts(char) : false;
      const nest = char ? isNest(char) : false;
      const regionKey = out ? 'outskirts' : (nest ? 'nest' : 'backstreets');
      const pool = AMBIENT_YEAR_LINES[regionKey] || AMBIENT_YEAR_LINES.backstreets;
      const chosen = pool[Math.floor(r() * pool.length)];
      vi = chosen.vi;
      en = chosen.en;
    }
  }

  return {
    id: `log_${age}_digest`,
    key: 'year_digest',
    type: 'year_digest',
    age,
    quiet: Boolean(quiet),
    season: { vi: 'Cả năm', en: 'All year' },
    vi,
    en,
    ...(bulletinVi ? { bulletinVi, bulletinEn } : {}),
    deltas,
    ids,
    items: dailyEntries
  };
}

/**
 * Consolidates routine daily logs of a given age (>= 5) into a single year_digest entry.
 * Routine entries: type === 'daily' || type === 'lore', no choices, no danger/mishap/story.
 * Items with choices, consequences, danger, or mishaps are NEVER consolidated and keep their season positions.
 */
export function consolidateYearDailies(charOrLogs, targetAge) {
  const isChar = charOrLogs && Array.isArray(charOrLogs.logs);
  const char = isChar ? charOrLogs : null;
  const logs = isChar ? charOrLogs.logs : (Array.isArray(charOrLogs) ? charOrLogs : []);
  if (targetAge < 5) return charOrLogs;

  const isPureDaily = (e) =>
    e &&
    e.age === targetAge &&
    (e.type === 'daily' || e.type === 'lore') &&
    !e.choiceVi &&
    !e.choices &&
    !e.passed &&
    e.key !== 'year_digest' &&
    e.type !== 'danger' &&
    e.type !== 'mishap' &&
    e.type !== 'summary' &&
    e.type !== 'year_end' &&
    e.type !== 'chapter' &&
    e.key !== 'npc_autonomy';

  const dailyIndices = [];
  const dailyEntries = [];
  logs.forEach((e, idx) => {
    if (isPureDaily(e)) {
      dailyIndices.push(idx);
      dailyEntries.push(e);
    }
  });

  // Only consolidate if there are at least 2 routine dailies
  if (dailyEntries.length < 2) return charOrLogs;

  const hasOthers = logs.some(
    (e) => e && e.age === targetAge && !isPureDaily(e) && !['summary', 'year_end'].includes(e.type)
  );

  const digest = createYearDigest(dailyEntries, targetAge, { quiet: !hasOthers, char });
  if (!digest) return charOrLogs;

  const firstIdx = dailyIndices[0];
  const removeSet = new Set(dailyIndices.slice(1));
  const newLogs = [];

  for (let i = 0; i < logs.length; i++) {
    if (i === firstIdx) {
      newLogs.push(digest);
    } else if (!removeSet.has(i)) {
      newLogs.push(logs[i]);
    }
  }

  if (isChar) {
    charOrLogs.logs = newLogs;
    return charOrLogs;
  }
  return newLogs;
}
