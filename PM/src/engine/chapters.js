import { FINGER_RANKS } from '../data/worldData.js';
import { INDEPENDENT_SYNDICATE_RANKS, WING_RANKS } from './gameEngine.js';

// A chapter card in the chronicle: the life has turned (a trade taken up or left, a rank climbed, an E.G.O,
// a Distortion, a Color). One commit writes at most one card, for the biggest change in it. A rank that falls,
// or a trade kept, writes none.

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
  const card = (title, subVi, subEn) => ({
    id: `chapter_${age}_${next.logs?.length || 0}`,
    age,
    ...(season ? { season } : {}),
    type: 'chapter',
    titleVi: title.vi,
    titleEn: title.en,
    subVi,
    subEn,
    // Readers of the log that know nothing of chapters still get one plain sentence
    vi: `${title.vi}. ${subVi}`,
    en: `${title.en}. ${subEn}`
  });

  if (has(next, 'ColorFixer') && !has(prev, 'ColorFixer')) {
    return card({ vi: 'Color Fixer', en: 'Color Fixer' }, 'Hana đã đọc tên bạn.', 'Hana has read your name.');
  }
  if (has(next, 'Distorted') && !has(prev, 'Distorted')) {
    return card({ vi: 'Distortion', en: 'Distortion' }, 'Bạn không còn giữ hình dạng cũ.', 'You no longer keep your old shape.');
  }
  if (has(next, 'EGOAwakened') && !has(prev, 'EGOAwakened')) {
    return card({ vi: 'E.G.O', en: 'E.G.O' }, 'Nỗi đau của bạn đã thành hình.', 'Your pain has taken shape.');
  }
  if (next.job !== prev.job && JOBS[next.job]) {
    return prev.job === 'Child'
      ? card(jobTitle(next), `Năm ${age} tuổi, bạn bước vào nghề.`, `At ${age}, you take up the trade.`)
      : card(jobTitle(next), `Năm ${age} tuổi, bạn rời con đường cũ.`, `At ${age}, you leave the old road.`);
  }
  if (next.job !== prev.job) return null;

  // Fixer Grades count down: Grade 7 is above Grade 8. Grade 0 is the Color, handled above.
  if (next.job === 'Fixer' && next.fixerGrade > 0 && next.fixerGrade < prev.fixerGrade) {
    return card({ vi: `Fixer Grade ${next.fixerGrade}`, en: `Fixer Grade ${next.fixerGrade}` },
      `Năm ${age} tuổi, Hana ghi Grade mới vào hồ sơ.`, `At ${age}, Hana enters a new Grade on your file.`);
  }
  if (next.job === 'Syndicate' && next.finger && rose(prev.fingerRank, next.fingerRank)) {
    const title = FINGER_RANKS[next.finger]?.[next.fingerRank];
    if (title) return card({ vi: title, en: title }, `Năm ${age} tuổi, The ${next.finger} gọi bạn bằng tước mới.`, `At ${age}, the ${next.finger} calls you by a new title.`);
  }
  if (next.job === 'Syndicate' && !next.finger && rose(prev.syndicateRank, next.syndicateRank)) {
    const title = INDEPENDENT_SYNDICATE_RANKS[next.syndicateRank];
    if (title) return card(title, `Năm ${age} tuổi, khu phố đổi cách gọi bạn.`, `At ${age}, the block calls you something new.`);
  }
  if (next.job === 'Wing Employee' && rose(prev.wingRank, next.wingRank)) {
    const rank = WING_RANKS[next.wingRank];
    if (rank) return card({ vi: rank.titleVi.split(' (')[0], en: rank.titleEn },
      `Năm ${age} tuổi, Wing ghi tên bạn ở một tầng cao hơn.`, `At ${age}, the Wing writes your name one floor higher.`);
  }
  return null;
}
