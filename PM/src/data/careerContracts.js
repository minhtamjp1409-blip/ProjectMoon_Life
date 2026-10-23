// ============================================================================
// CAREER CONTRACTS
// A Fixer is handed Requests, each graded by threat tier, and the grade of the
// Fixer decides how high the tiers go. Every other career gets the same loop in
// its own terms: a Thumb collects, a Middle works the Book of Vengeance, an Index
// member carries out a Prescript, a Ring member hunts material for the next piece,
// a Pinky settles an oath, and a Wing Feather answers to a Singularity.
// Tier 0 is the lowest band, tier 5 the highest; templates share the Fixer shape:
//   { id, tier, typeVi, typeEn, vi, en, okVi, okEn, failVi, failEn, deathVi, deathEn,
//     later?: { id, years, reasonVi, reasonEn }, mem?: string }
// ============================================================================

export const rq = (id, tier, typeVi, typeEn, vi, en, okVi, okEn, failVi, failEn, deathVi, deathEn, extra = {}) => ({
  id, tier, typeVi, typeEn, vi, en, okVi, okEn, failVi, failEn, deathVi, deathEn, ...extra
});

const tiers = (...rows) => rows.map(([nameVi, nameEn], level) => ({ level, nameVi, nameEn }));

/**
 * Per career: how a contract is named, what the three approaches mean, what the
 * work does to the heat and the nerves on top of Ahn and Merit, and how the
 * six tiers are called in that career's own vocabulary.
 */
export const CONTRACT_ROUTES = {
  thumb: {
    jobKey: 'Thumb',
    tagVi: 'Việc của Thumb', tagEn: 'Thumb Job',
    kickerVi: 'Sổ của Thumb', kickerEn: 'The Thumb’s ledger',
    careful: ['Làm đúng nghi thức, từng bước một', 'By the book, one step at a time'],
    bold: ['Vào thẳng, lấy cho xong (thêm 50% Ahn và Merit)', 'Walk in and take it (50% more Ahn and Merit)'],
    intel: ['Mua lịch trình và danh sách canh gác từ một thư ký sổ sách (8 Ahn)', 'Buy the schedule and the guard list from a ledger clerk (8 Ahn)'],
    okFx: { heat: 2, network: 1 }, failFx: { heat: 4, wealth: -2 },
    declineVi: 'Capo ghi tên bạn vào cột "chưa sẵn sàng".', declineEn: 'Your Capo writes your name in the “not ready” column.',
    tiers: tiers(
      ['Khoản thu vặt', 'Petty collection'], ['Băng nhóm đường phố', 'Street crew'], ['Một Office Fixer', 'A Fixer Office'],
      ['Địa bàn đối địch', 'Rival turf'], ['Cấp Association', 'Association grade'], ['Mục tiêu cấp Color', 'Color-grade target']
    )
  },
  index: {
    jobKey: 'Index',
    tagVi: 'Prescript', tagEn: 'Prescript',
    kickerVi: 'Prescript của Index', kickerEn: 'An Index Prescript',
    careful: ['Làm đúng từng chữ, không thêm không bớt', 'Follow it word for word, nothing added or left out'],
    bold: ['Làm trước hạn, bỏ qua kiểm tra (thêm 50% Ahn và Merit)', 'Act ahead of schedule and skip the checks (50% more Ahn and Merit)'],
    intel: ['Nhờ một Proselyte chép lại và đối chiếu bản Prescript (8 Ahn)', 'Have a Proselyte copy the Prescript and cross-check it (8 Ahn)'],
    okFx: { sanity: -2 }, failFx: { sanity: -5 },
    declineVi: 'Prescript vẫn nằm đó. Index không hỏi lý do, chỉ ghi lại rằng bạn đã nhìn thấy nó.', declineEn: 'The Prescript stays on the table. Index does not ask why. It only records that you saw it.',
    tiers: tiers(
      ['Một mảnh giấy', 'A slip of paper'], ['Một lời nhắn', 'A message'], ['Một người trong tầm theo dõi', 'A person under watch'],
      ['Một việc không thể hỏi lại', 'A task with no questions'], ['Ý chỉ từ cấp Proxy', 'A Proxy-level directive'], ['Ý chỉ của Weaver', 'A Weaver’s directive']
    )
  },
  middle: {
    jobKey: 'Middle',
    tagVi: 'Book of Vengeance', tagEn: 'Book of Vengeance',
    kickerVi: 'Một tên trong Book of Vengeance', kickerEn: 'A name in the Book of Vengeance',
    careful: ['Đến tận nhà, nói chuyện trước', 'Go to their door and talk first'],
    bold: ['Đòi ngay giữa đường (thêm 50% Ahn và Merit)', 'Collect in the street, in front of everyone (50% more Ahn and Merit)'],
    intel: ['Hỏi người giữ sổ về gia cảnh và thói quen của con nợ (8 Ahn)', 'Ask the keeper of the book about the debtor’s family and habits (8 Ahn)'],
    okFx: { network: 2, heat: 1 }, failFx: { network: -2, heat: 3 },
    declineVi: 'Cái tên vẫn nằm trong sổ. Người khác trong gia đình sẽ nhận nó, và họ sẽ nhớ bạn đã đẩy nó đi.', declineEn: 'The name stays in the book. Someone else in the family will take it, and they will remember you pushed it away.',
    tiers: tiers(
      ['Con nợ tầm thường', 'A common debtor'], ['Fixer Grade 9 hoặc thợ phụ', 'A Grade 9 Fixer or a hired hand'], ['Fixer Grade 6 đến 7', 'A Grade 6 to 7 Fixer'],
      ['Fixer Grade 4 đến 5', 'A Grade 4 to 5 Fixer'], ['Fixer Grade 2 đến 3', 'A Grade 2 to 3 Fixer'], ['Grade 1 hoặc Color', 'Grade 1 or a Color']
    )
  },
  ring: {
    jobKey: 'Ring',
    tagVi: 'Đơn đặt của Ring', tagEn: 'Ring Commission',
    kickerVi: 'Đơn đặt nguyên liệu của Ring', kickerEn: 'A Ring materials order',
    careful: ['Chọn lọc kỹ, mang về ít mà tốt', 'Be selective: bring back little, and good'],
    bold: ['Lấy nhiều nhất có thể (thêm 50% Ahn và Merit)', 'Take as much as you can carry (50% more Ahn and Merit)'],
    intel: ['Thuê một người nhận biết vật liệu đi cùng (8 Ahn)', 'Hire someone who can tell material from rubbish to come along (8 Ahn)'],
    okFx: { sanity: 2 }, failFx: { sanity: -4 },
    declineVi: 'Maestro ghi chú rằng nguyên liệu sẽ đến từ tay người khác, và tên người đó sẽ nằm cạnh tác phẩm.', declineEn: 'The Maestro notes the material will come from someone else’s hands, and that name will sit beside the piece.',
    tiers: tiers(
      ['Chợ vật liệu', 'The material market'], ['Xưởng và bãi phế liệu', 'Workshops and scrapyards'], ['Bộ sưu tập tư nhân', 'A private collection'],
      ['Ruins ngoài tường', 'Ruins past the wall'], ['Nơi từng có Distortion', 'Where a Distortion once stood'], ['Kiệt tác của một Star', 'A Star’s masterpiece']
    )
  },
  pinky: {
    jobKey: 'Pinky',
    tagVi: 'Lời thề của Pinky', tagEn: 'Pinky Oath',
    kickerVi: 'Một lời thề chưa trả của Pinky', kickerEn: 'An unpaid Pinky oath',
    careful: ['Đến đúng giờ, đúng cách, đúng lời thề', 'Arrive on time, in the right manner, true to the oath'],
    bold: ['Kết thúc trong một nhát (thêm 50% Ahn và Merit)', 'End it in a single stroke (50% more Ahn and Merit)'],
    intel: ['Thuê một người dẫn đường biết mặt kẻ bị săn (8 Ahn)', 'Hire a guide who knows the face you are hunting (8 Ahn)'],
    okFx: { heat: 1 }, failFx: { heat: 3, rep: -1 },
    declineVi: 'Một lời thề không được đáp thì vẫn là lời thề. Pinky không bao giờ xóa nó khỏi sổ.', declineEn: 'An oath unanswered is still an oath. The Pinky never strikes it from the book.',
    tiers: tiers(
      ['Kẻ thất hứa vặt', 'A petty oathbreaker'], ['Một kiếm khách làng', 'A hedge swordsman'], ['Kiếm khách có danh', 'A named duelist'],
      ['Người của một dòng kiếm', 'A sworn blade of a lineage'], ['Fixer cấp cao hoặc Capo', 'A high-grade Fixer or a Capo'], ['Một Star của thanh kiếm', 'A Star of the sword']
    )
  },
  wing: {
    jobKey: null,
    tagVi: 'Chỉ thị của Wing', tagEn: 'Wing Directive',
    kickerVi: 'Chỉ thị nội bộ của Wing', kickerEn: 'A Wing internal directive',
    careful: ['Theo quy trình, ghi biên bản đủ', 'Follow procedure and log everything'],
    bold: ['Rút gọn quy trình, nộp báo cáo sớm (thêm 50% Ahn và Merit)', 'Cut the procedure short and file early (50% more Ahn and Merit)'],
    intel: ['Mua quyền xem hồ sơ nội bộ từ phòng lưu trữ (8 Ahn)', 'Buy access to the internal file from the records office (8 Ahn)'],
    okFx: { network: 2 }, failFx: { network: -2, sanity: -2 },
    declineVi: 'Bạn trả lại phiếu giao việc. Hệ thống ghi nhận một lần "không sẵn sàng" vào hồ sơ đánh giá.', declineEn: 'You return the assignment slip. The system logs one “unavailable” against your review file.',
    tiers: tiers(
      ['Việc hành chính', 'Administrative task'], ['Kiểm định hiện trường', 'Field inspection'], ['Sự cố cấp phòng', 'A section-level incident'],
      ['Sự cố Singularity', 'A Singularity incident'], ['Hồ sơ mật cấp quản trị', 'An executive-level sealed file'], ['Việc The Head quan tâm', 'A matter the Head watches']
    )
  }
};

/** Which contract route this character works, or null when they have none. */
export function contractRouteOf(char) {
  if (!char || char.flags?.includes('Distorted')) return null;
  if (char.job === 'Fixer') return 'fixer';
  if (char.job === 'Syndicate' && char.finger) {
    const key = String(char.finger).toLowerCase();
    return CONTRACT_ROUTES[key] ? key : null;
  }
  if (char.job === 'Wing Employee') return 'wing';
  return null;
}

/**
 * Where the character stands on the Fixer scale, so one power formula covers every
 * career. Rank 0 starts at the Grade 7 equivalent (tier 2 reachable), rank 3 at Grade 1.
 */
export function equivalentGrade(char, route) {
  if (route === 'fixer') return char.fixerGrade === 0 ? 0 : (char.fixerGrade ?? 9);
  const rank = route === 'wing' ? (char.wingRank || 0) : (char.fingerRank || 0);
  return [7, 5, 3, 1][Math.min(3, rank)];
}
