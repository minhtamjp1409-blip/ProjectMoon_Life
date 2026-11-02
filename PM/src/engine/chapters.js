import { FINGER_RANKS } from '../data/worldData.js';
import { INDEPENDENT_SYNDICATE_RANKS, WING_RANKS } from './gameEngine.js';

// A chapter card in the chronicle: the life has turned (a trade taken up or left, a rank climbed, an E.G.O,
// a Distortion, a Color, or a close companion fallen). One commit writes at most one card, for the biggest
// change in it. A rank that falls, or a trade kept, writes none.

export const CHAPTER_LOSS_LINES = {
  spouse: {
    vi: 'Người từng thức cùng bạn qua những đêm dài đã không còn thức giấc.',
    en: 'The one who kept watch through long nights with you will not wake again.'
  },
  lover: {
    vi: 'Lời hẹn cùng nhau rời đi đã vĩnh viễn dang dở.',
    en: 'The promise to leave together is left forever unfinished.'
  },
  partner: {
    vi: 'Một chiếc bóng quen thuộc không còn bước cạnh bạn trên đường về.',
    en: 'A familiar shadow no longer walks beside you on the way home.'
  },
  mentor: {
    vi: 'Người dẫn đường của bạn đã nằm lại trong lòng The City.',
    en: 'Your guide has fallen into the belly of the City.'
  },
  friend: {
    vi: 'Chiếc ghế quen ở quán ăn cũ từ nay bỏ trống.',
    en: 'A familiar seat at the old diner now sits empty.'
  },
  child: {
    vi: 'Đứa trẻ bạn từng che chở đã không thể lớn lên giữa The City.',
    en: 'The child you once shielded could not grow up in the City.'
  }
};

export const CHAPTER_EXAM_FAIL_LINES = {
  first: {
    vi: 'Hana từ chối công nhận Grade {grade}.',
    en: 'Hana denied Grade {grade}.'
  },
  repeat: {
    vi: 'Hana lại từ chối Grade {grade}.',
    en: 'Hana denied Grade {grade} once more.'
  }
};

const JOBS = {
  Fixer: { vi: 'Fixer', en: 'Fixer' },
  Syndicate: { vi: 'Syndicate', en: 'Syndicate' },
  'Wing Employee': { vi: 'Nhân viên Wing', en: 'Wing Employee' },
  'Workshop Craftsman': { vi: 'Thợ rèn Workshop', en: 'Workshop Craftsman' },
  Outcast: { vi: 'Kẻ đào tẩu', en: 'Outcast' }
};

const has = (char, flag) => Boolean(char?.flags?.includes(flag));
const rose = (before, after) => (after || 0) > (before || 0);

function jobTitle(char) {
  if (char.job === 'Syndicate' && char.finger) return { vi: `The ${char.finger}`, en: `The ${char.finger}` };
  return JOBS[char.job] || { vi: char.job, en: char.job };
}

// The card for prev -> next, or null. Pure: same states, same card.
export function chapterFor(prev, next) {
  if (!prev || !next || !prev.alive || !next.alive) return null;
  const age = next.age;
  // The card sits in the season of the entry that turned the life, so it opens no season divider of its own
  const season = next.logs?.[next.logs.length - 1]?.season;
  const card = (title, subVi, subEn, kind = null) => ({
    id: `chapter_${age}_${next.logs?.length || 0}`,
    age,
    ...(season ? { season } : {}),
    type: 'chapter',
    ...(kind ? { kind } : {}),
    titleVi: title.vi,
    titleEn: title.en,
    subVi,
    subEn,
    // Readers of the log that know nothing of chapters still get one plain sentence
    vi: `${title.vi}. ${subVi}`,
    en: `${title.en}. ${subEn}`
  });

  if (has(next, 'ColorFixer') && !has(prev, 'ColorFixer')) {
    return card({ vi: 'Color Fixer', en: 'Color Fixer' }, 'Hana đã đọc tên bạn.', 'Hana has read your name.', 'color');
  }
  if (has(next, 'Distorted') && !has(prev, 'Distorted')) {
    return card({ vi: 'Distortion', en: 'Distortion' }, 'Bạn không còn giữ hình dạng cũ.', 'You no longer keep your old shape.', 'distortion');
  }
  if (has(next, 'EGOAwakened') && !has(prev, 'EGOAwakened')) {
    return card({ vi: 'E.G.O', en: 'E.G.O' }, 'Nỗi đau của bạn đã thành hình.', 'Your pain has taken shape.', 'ego');
  }
  if (next.job !== prev.job && JOBS[next.job]) {
    return prev.job === 'Child'
      ? card(jobTitle(next), `Năm ${age} tuổi, bạn bước vào nghề.`, `At ${age}, you take up the trade.`, 'job')
      : card(jobTitle(next), `Năm ${age} tuổi, bạn rời con đường cũ.`, `At ${age}, you leave the old road.`, 'job');
  }
  if (next.job !== prev.job) return null;

  // Fixer Grades count down: Grade 7 is above Grade 8. Grade 0 is the Color, handled above.
  if (next.job === 'Fixer' && next.fixerGrade > 0 && next.fixerGrade < prev.fixerGrade) {
    return card({ vi: `Fixer Grade ${next.fixerGrade}`, en: `Fixer Grade ${next.fixerGrade}` },
      `Năm ${age} tuổi, Hana ghi Grade mới vào hồ sơ.`, `At ${age}, Hana enters a new Grade on your file.`, 'rank');
  }
  if (next.job === 'Syndicate' && next.finger && rose(prev.fingerRank, next.fingerRank)) {
    const title = FINGER_RANKS[next.finger]?.[next.fingerRank];
    if (title) return card({ vi: title, en: title }, `Năm ${age} tuổi, The ${next.finger} gọi bạn bằng tước mới.`, `At ${age}, the ${next.finger} calls you by a new title.`, 'rank');
  }
  if (next.job === 'Syndicate' && !next.finger && rose(prev.syndicateRank, next.syndicateRank)) {
    const title = INDEPENDENT_SYNDICATE_RANKS[next.syndicateRank];
    if (title) return card(title, `Năm ${age} tuổi, khu phố đổi cách gọi bạn.`, `At ${age}, the block calls you something new.`, 'rank');
  }
  if (next.job === 'Wing Employee' && rose(prev.wingRank, next.wingRank)) {
    const rank = WING_RANKS[next.wingRank];
    if (rank) return card({ vi: rank.titleVi.split(' (')[0], en: rank.titleEn },
      `Năm ${age} tuổi, Wing ghi tên bạn ở một tầng cao hơn.`, `At ${age}, the Wing writes your name one floor higher.`, 'rank');
  }

  // A close companion fallen (spouse, lover, partner, mentor, friend, child)
  // Dropped if a savior death save played in the same commit (cutscene savior already spoke)
  if (!(next.usedDeathSave && !prev.usedDeathSave)) {
    const CLOSE_ROLES = ['spouse', 'lover', 'partner', 'mentor', 'friend', 'child'];
    const isDead = (n) => Boolean(n) && (n.deceased === true || n.status === 'dead' || n.alive === false);
    const fallbackTitles = {
      spouse: { vi: 'Người bạn đời', en: 'Spouse' },
      lover: { vi: 'Người thương', en: 'Lover' },
      partner: { vi: 'Cộng sự', en: 'Partner' },
      mentor: { vi: 'Người dẫn đường', en: 'Mentor' },
      friend: { vi: 'Người bạn cũ', en: 'Friend' },
      child: { vi: 'Đứa con', en: 'Child' }
    };
    for (const role of CLOSE_ROLES) {
      const nextNpc = next.npcs?.[role];
      const prevNpc = prev.npcs?.[role];
      if (!nextNpc) continue;
      const justDied = !isDead(prevNpc) && isDead(nextNpc);
      const bond = prevNpc?.bond ?? nextNpc.bond ?? 0;
      // Close kin/mentor/lover naturally qualify at 40; friends/partners need 50
      const minBond = ['spouse', 'lover', 'mentor', 'child'].includes(role) ? 40 : 50;
      if (justDied && bond >= minBond) {
        const title = {
          vi: nextNpc.nameVi || nextNpc.name || fallbackTitles[role]?.vi || 'Người thân',
          en: nextNpc.nameEn || nextNpc.name || fallbackTitles[role]?.en || 'Companion'
        };
        const lines = CHAPTER_LOSS_LINES[role];
        if (lines) {
          return card(title, lines.vi, lines.en, 'loss');
        }
      }
    }
  }

  // Fixer exam failure card (Đợt 118b)
  // Dropped if companion died, promotion, color, distortion, ego, or death in same commit
  const prevFailures = prev.fixerExamFailures || {};
  const nextFailures = next.fixerExamFailures || {};
  let failedGrade = null;
  let failCountForGrade = 0;
  for (const [gradeStr, count] of Object.entries(nextFailures)) {
    const prevCount = prevFailures[gradeStr] || 0;
    if (count > prevCount) {
      failedGrade = Number(gradeStr);
      failCountForGrade = count;
      break;
    }
  }

  if (failedGrade !== null) {
    const title = {
      vi: `Fixer Grade ${failedGrade}`,
      en: `Fixer Grade ${failedGrade}`
    };
    const lines = failCountForGrade === 1 ? CHAPTER_EXAM_FAIL_LINES.first : CHAPTER_EXAM_FAIL_LINES.repeat;
    const subVi = lines.vi.replace('{grade}', failedGrade);
    const subEn = lines.en.replace('{grade}', failedGrade);
    return card(title, subVi, subEn, 'exam_fail');
  }

  return null;
}
