// ============================================================================
// FATE ENGINE
// What the City does to a person when nobody is making a choice. Two parts:
//
//   1. Perinatal fate: some lives end before they begin. The odds come from where
//      and to whom you were born (medicine, pollution, safety, money), not a coin.
//   2. Mishaps: a seasonal roll for illness, accidents and violence, shaped by age,
//      district, job, health and money. It follows a bathtub curve: risky at the
//      very start, calm in the middle, steeper every year in old age.
//
// Nothing here forces the supernatural. A life can be long, quiet and still cruel
// without ever meeting Carmen or an E.G.O.
// Prose rules: second person, one concrete detail, a cold small last line, no numbers.
// ============================================================================

import { REGIONS } from '../data/worldData.js';
import { traitsOf } from './variance.js';
import { frailty } from './economyModel.js';

const regionOf = (char) => REGIONS.find((r) => r.id === char.regionId) || REGIONS[0];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const isNestFlags = (flags = []) => flags.some((f) => ['Nest', 'NestResident', 'Feather'].includes(f));
const isOutsideFlags = (flags = [], regionId) => regionId === 'OUTSKIRTS' || flags.includes('Outskirts');

/* ---------------------------------------------------------------- perinatal */

const PERINATAL = [
  {
    id: 'cord',
    weight: () => 3,
    preludeVi: (place) => `[Trước khi chào đời] ${place} Cơn đau đến sớm hơn bà đỡ tính ba tuần. Dây rốn quấn quanh cổ bạn, và trong phòng chỉ còn nghe người ta gọi tên một đứa trẻ chưa kịp có tên.`,
    preludeEn: (place) => `[Before the birth] ${place} The pains came three weeks earlier than the midwife had counted. The cord was wound around your neck, and the room could only call the name of a child who had not yet been given one.`,
    deathVi: 'Chưa kịp cất tiếng khóc đầu tiên', deathEn: 'Never drew the first breath'
  },
  {
    id: 'fever',
    weight: (c) => 1 + (10 - c.region.medical) * 0.55,
    preludeVi: (place) => `[Trước khi chào đời] ${place} Mẹ bạn sốt từ đêm thứ hai của trận chuyển dạ. Người hàng xóm đưa đến nửa chai rượu thuốc, và thứ duy nhất họ tìm được để lau là chiếc áo của chính họ.`,
    preludeEn: (place) => `[Before the birth] ${place} Your mother burned with fever from the second night of labor. A neighbor brought half a bottle of medicinal liquor, and the only cloth they could find to wipe her was their own shirt.`,
    deathVi: 'Mất cùng mẹ trong cơn sốt sau sinh', deathEn: 'Lost with your mother to the fever of childbirth'
  },
  {
    id: 'cold',
    weight: (c) => (c.wealth <= 6 ? 2.4 : 0.4) + (c.outside ? 1.4 : 0),
    preludeVi: (place) => `[Trước khi chào đời] ${place} Bạn đến sớm, vào một đêm mà ngay cả bếp than của cả dãy nhà cũng đã tắt. Mẹ bạn ủ bạn trong ba lớp áo, và ba lớp áo không đủ.`,
    preludeEn: (place) => `[Before the birth] ${place} You came early, on a night when even the block’s shared coal stove had gone out. Your mother wrapped you in three layers of clothing, and three layers were not enough.`,
    deathVi: 'Sinh non trong một đêm không có lửa', deathEn: 'Born early on a night without fire'
  },
  {
    id: 'smog',
    weight: (c) => c.region.pollution >= 5 ? 1 + c.region.pollution * 0.45 : 0,
    preludeVi: (place) => `[Trước khi chào đời] ${place} Khói công nghiệp tối hôm ấy dày đến mức bà đỡ phải thắp đèn giữa buổi chiều. Phổi bạn không mở được, và không ai trong phòng dám nói to điều đó.`,
    preludeEn: (place) => `[Before the birth] ${place} The industrial smoke that evening was so thick the midwife lit a lamp at midday. Your lungs would not open, and no one in the room dared say it aloud.`,
    deathVi: 'Phổi không kịp mở trong làn khói của khu', deathEn: 'Lungs never opened in the District’s smoke'
  },
  {
    id: 'crossfire',
    weight: (c) => c.region.safety <= 4 ? 1 + (5 - c.region.safety) * 0.8 : 0,
    preludeVi: (place) => `[Trước khi chào đời] ${place} Hai băng nhóm chạm mặt ở đầu phố đúng lúc mẹ bạn được dìu xuống cầu thang. Không ai nhắm vào bà. Một viên đạn lạc không cần ai nhắm.`,
    preludeEn: (place) => `[Before the birth] ${place} Two gangs met at the head of the street just as your mother was being helped down the stairs. No one was aiming at her. A stray round does not need aiming.`,
    deathVi: 'Mất cùng mẹ dưới một viên đạn lạc', deathEn: 'Lost with your mother to a stray round'
  },
  {
    id: 'sweeper_night',
    weight: (c) => (c.omenId === 'crimson_sweeper_star' ? 4 : 0.8) * (c.nest ? 0.2 : 1),
    preludeVi: (place) => `[Trước khi chào đời] ${place} Cơn chuyển dạ kéo dài đúng qua 3 giờ 10. Cả khu tắt đèn, khóa cửa, nín thở, và bà đỡ không dám mở cửa để gọi thêm người giúp.`,
    preludeEn: (place) => `[Before the birth] ${place} Labor ran straight through 3:10. The whole block turned off its lights, locked its doors and held its breath, and the midwife did not dare open the door to call for help.`,
    deathVi: 'Chào đời giữa lúc cả khu nín thở trong đêm 3 giờ 10', deathEn: 'Born while the whole block held its breath through the 3:10 night'
  },
  {
    id: 'road',
    weight: (c) => c.outside ? 3 : 0,
    preludeVi: (place) => `[Trước khi chào đời] ${place} Đoàn người của mẹ bạn chuyển chỗ trước bão cát. Bà chuyển dạ trên chiếc xe kéo, giữa hai đụn cát, cách điểm nước gần nhất nửa ngày đường.`,
    preludeEn: (place) => `[Before the birth] ${place} Your mother’s caravan was moving ahead of a dust storm. She went into labor on a hand cart between two dunes, half a day from the nearest water.`,
    deathVi: 'Chuyển dạ giữa bão cát, cách nguồn nước nửa ngày đường', deathEn: 'Born mid-storm, half a day from water'
  },
  {
    id: 'clinic',
    weight: (c) => c.nest ? 0.9 : 0,
    preludeVi: (place) => `[Trước khi chào đời] ${place} Phòng sinh của Wing sạch đến mức nghe được tiếng kim loại chạm vào nhau. Có một con số trên màn hình đã lệch từ lâu, và không ai ở đó được trả tiền để để ý.`,
    preludeEn: (place) => `[Before the birth] ${place} The Wing delivery suite was clean enough to hear instruments touch. A number on a screen had been off for some time, and no one there was paid to notice.`,
    deathVi: 'Mất trong một phòng sinh sạch sẽ, vì một con số bị bỏ qua', deathEn: 'Lost in a spotless delivery suite, to a number nobody read'
  }
];

/**
 * Chance a life ends before the first breath. Medicine and pollution dominate, money
 * and safety follow; an orphan's mother is rarely in a clinic. Averages near 6 percent
 * across the City, around 2 in a Nest and over 12 in the Outskirts.
 */
export function perinatalRisk({ region, familyId, omenId, nest, outside, wealth = 6 }) {
  let p = 0.012
    + (10 - region.medical) * 0.0065
    + (10 - region.wealth) * 0.0018
    + region.pollution * 0.0022
    + (10 - region.safety) * 0.0015;
  if (familyId === 'orphan') p += 0.028;
  if (familyId === 'outskirts_nomad') p += 0.015;
  if (omenId === 'crimson_sweeper_star') p += 0.018;
  if (omenId === 'carmen_whisper') p += 0.006;
  if (nest) p -= 0.012;
  if (wealth >= 14) p -= 0.008;
  if (outside) p += 0.02;
  return clamp(p, 0.006, 0.17);
}

/** Rolls the womb. Returns null, or the doomed-birth narrative to play instead of a normal opening. */
export function rollPerinatalFate({ region, familyId, omenId, flags = [], wealth = 6 }, rng) {
  const nest = isNestFlags(flags);
  const outside = isOutsideFlags(flags, region.id);
  const risk = perinatalRisk({ region, familyId, omenId, nest, outside, wealth });
  if (rng() >= risk) return null;
  const ctx = { region, nest, outside, wealth, omenId };
  const pool = PERINATAL.map((p) => ({ p, w: p.weight(ctx) })).filter((x) => x.w > 0);
  const total = pool.reduce((s, x) => s + x.w, 0);
  let roll = rng() * total;
  let chosen = pool[pool.length - 1].p;
  for (const x of pool) {
    roll -= x.w;
    if (roll <= 0) { chosen = x.p; break; }
  }
  return { id: chosen.id, risk, preludeVi: chosen.preludeVi, preludeEn: chosen.preludeEn, deathVi: chosen.deathVi, deathEn: chosen.deathEn };
}

/* ------------------------------------------------------------------ mishaps */

const ANY = [0, 140];

// dmg = [min,max] health lost; san = sanity lost; ahn = wealth lost; lethal = base chance this one kills outright.
const MISHAPS = [
  // ---- the young
  { id: 'mi_fever_night', age: [0, 11], w: (c) => 1 + (10 - c.region.medical) * 0.25, dmg: [6, 14], san: 0, ahn: 0, lethal: 0.028,
    vi: 'Cơn sốt đến vào đêm mưa. Người lớn trong nhà thay nhau thay khăn ướt, và không ai nói họ đang đếm tiền thuốc trong đầu.',
    en: 'The fever came on a rainy night. The adults took turns changing the wet cloth, and no one said they were counting the price of medicine in their heads.',
    deathVi: 'Cơn sốt không chịu lui, trong một đêm mưa', deathEn: 'A fever that would not break, on a rainy night' },
  { id: 'mi_smog_cough', age: [0, 17], w: (c) => (c.region.pollution >= 5 ? 1 + c.region.pollution * 0.3 : 0), dmg: [4, 10], san: 0, ahn: 0, lethal: 0.012,
    vi: 'Làn khói của khu không tan suốt ba tuần liền. Bạn học cách thở nông, và học cách không nhìn chiếc khăn sau mỗi cơn ho.',
    en: 'The District’s smoke did not lift for three weeks. You learned to breathe shallow, and to not look at the cloth after each cough.',
    deathVi: 'Phổi bỏ cuộc sau nhiều mùa khói bụi', deathEn: 'Lungs that gave up after too many seasons of smoke' },
  { id: 'mi_fall_scaffold', age: [5, 15], w: (c) => (c.nest ? 0.2 : 1), dmg: [8, 18], san: 0, ahn: 0, lethal: 0.018,
    vi: 'Bạn trèo lên giàn giáo tòa nhà bỏ dở để nhìn thấy đèn của Nest. Thanh sắt thứ tư không chịu nổi sức nặng của một đứa trẻ đang ngước lên.',
    en: 'You climbed the scaffolding of an abandoned tower to see the lights of the Nest. The fourth bar could not take the weight of a child looking up.',
    deathVi: 'Ngã từ giàn giáo, trong lúc ngước nhìn ánh đèn của Nest', deathEn: 'Fell from scaffolding while looking up at the Nest lights' },
  { id: 'mi_tainted_water', age: [0, 140], w: (c) => (c.region.medical <= 5 ? 1.2 : 0.2), dmg: [5, 12], san: 2, ahn: 0, lethal: 0.012,
    vi: 'Vòi nước chung của dãy nhà có mùi kim loại từ sáng thứ hai. Đến thứ tư thì cả tầng đều nằm xuống.',
    en: 'The shared tap in your row smelled of metal from Monday morning. By Wednesday the whole floor was lying down.',
    deathVi: 'Uống nước từ vòi chung đã nhiễm độc', deathEn: 'Drank from the poisoned shared tap' },
  { id: 'mi_stray_round', age: [3, 17], w: (c) => (c.region.safety <= 5 ? 0.8 + (6 - c.region.safety) * 0.4 : 0.1), dmg: [14, 26], san: 4, ahn: 0, lethal: 0.035,
    vi: 'Đang chơi dưới cửa sổ thì cả con phố nằm xuống một lúc. Bạn không nhớ tiếng súng, chỉ nhớ viên gạch chạm vào má lạnh đến lạ.',
    en: 'You were playing under a window when the whole street dropped at once. You do not remember the shot, only how strangely cold the brick felt against your cheek.',
    deathVi: 'Trúng một viên đạn lạc giữa lúc chơi dưới cửa sổ', deathEn: 'Hit by a stray round while playing under a window' },
  { id: 'mi_rat_bite', age: [2, 12], w: (c) => (c.nest ? 0.05 : 1), dmg: [4, 10], san: 0, ahn: 0, lethal: 0.009,
    vi: 'Vết cắn nhỏ đến mức bạn quên mất. Ba ngày sau nó chuyển sang màu mà người lớn không muốn gọi tên.',
    en: 'The bite was so small you forgot it. Three days later it turned a color the adults did not want to name.',
    deathVi: 'Vết cắn của chuột cống nhiễm trùng', deathEn: 'A rat bite that turned septic' },
  // ---- anyone
  { id: 'mi_flu_season', age: ANY, w: () => 1.3, dmg: [5, 8], san: 0, ahn: 2, lethal: 0.009,
    vi: 'Mùa cúm đi qua The City như mọi năm. Mỗi cửa hàng treo một tấm biển nghỉ, và bạn mất ba tuần để nhớ lại cách đi hết cầu thang.',
    en: 'Flu season went through the City as it does every year. Every shop hung a closed sign, and it took you three weeks to remember how to climb a flight of stairs.',
    deathVi: 'Một trận cúm mùa đông mà cơ thể không đủ sức qua', deathEn: 'A winter flu the body was too worn to survive' },
  { id: 'mi_tenement_fire', age: ANY, w: (c) => (c.nest ? 0.1 : 1), dmg: [10, 24], san: 4, ahn: 6, lethal: 0.03,
    vi: 'Lửa bắt đầu từ bếp dầu của nhà bên và đi theo hành lang nhanh hơn người. Bạn cứu được chiếc túi, và hiểu sau đó rằng mình đã chọn sai thứ để cứu.',
    en: 'The fire started at a neighbor’s oil stove and ran down the corridor faster than people could. You saved the bag, and understood afterward that you had chosen the wrong thing to save.',
    deathVi: 'Mắc kẹt trong đám cháy của một dãy nhà trọ', deathEn: 'Trapped in a tenement fire' },
  { id: 'mi_contaminated_ration', age: [4, 140], w: (c) => (c.wealth <= 8 ? 1.2 : 0.3), dmg: [4, 10], san: 0, ahn: 1, lethal: 0.008,
    vi: 'Hộp khẩu phần rẻ nhất ở quầy có hạn dùng bị in đè bằng mực khác. Bạn ăn nó vì cái giá, và nằm trong nhà vệ sinh chung suốt hai ngày vì cái giá ấy.',
    en: 'The cheapest ration tin on the counter had its date stamped over in a different ink. You ate it for the price, and spent two days in the shared washroom for the same reason.',
    deathVi: 'Ăn phải khẩu phần quá hạn bị đóng dấu đè', deathEn: 'Ate a ration tin with an overstamped date' },
  { id: 'mi_alley_robbery', age: [14, 140], w: (c) => (c.nest ? 0.1 : c.region.safety <= 6 ? 1.3 : 0.5), dmg: [4, 14], san: 3, ahn: 6, lethal: 0.015,
    vi: 'Hai người chặn bạn ở chỗ đèn đường hỏng. Một người nói rất nhẹ nhàng, người kia không nói gì cả, và bạn biết nên sợ người nào hơn.',
    en: 'Two people stopped you where the streetlamp was broken. One spoke very gently and the other did not speak at all, and you knew which to fear more.',
    deathVi: 'Bị chặn đường và bỏ lại ở chỗ đèn đường hỏng', deathEn: 'Stopped and left where the streetlamp was broken' },
  { id: 'mi_shakedown', age: [16, 140], w: (c) => (c.nest || c.job === 'Wing Employee' ? 0.1 : c.job === 'Child' ? 0 : 1), dmg: [0, 6], san: 2, ahn: 5, lethal: 0,
    vi: 'Người của Syndicate địa phương gõ cửa đúng ngày bạn nhận tiền công. Họ gọi nó là phí bảo kê. Bạn gọi nó là tiền ăn tuần sau.',
    en: 'The local Syndicate knocked on exactly the day you were paid. They called it protection. You called it next week’s food.',
    deathVi: 'Từ chối nộp phí cho Syndicate địa phương', deathEn: 'Refused to pay the local Syndicate' },
  { id: 'mi_clinic_error', age: [14, 140], w: (c) => (c.wealth <= 12 && !c.nest ? 1 : 0.3), dmg: [8, 18], san: 3, ahn: 4, lethal: 0.028,
    vi: 'Phòng khám chui không có biển, chỉ có một cái chuông cửa và một cái giá rất hợp lý. Người ta khâu bạn lại bằng tay không vững lắm.',
    en: 'The unlicensed clinic had no sign, only a doorbell and a very reasonable price. They sewed you up with a hand that was not quite steady.',
    deathVi: 'Một ca khâu hỏng tại phòng khám không biển', deathEn: 'A botched stitch at a clinic with no sign' },
  { id: 'mi_sweeper_stray', age: [12, 140], w: (c) => (c.nest ? 0.1 : 0.9 + (10 - c.region.safety) * 0.12), dmg: [14, 30], san: 8, ahn: 0, lethal: 0.05, theme: '313',
    vi: 'Bạn về muộn hơn giờ giới nghiêm có mười phút. Hẻm tắt đèn trước bạn, và bạn nghe thấy thứ gì đó đi chậm hơn nhịp tim của mình.',
    en: 'You were ten minutes past curfew. The alley turned its lights off ahead of you, and you heard something walking slower than your own heartbeat.',
    deathVi: 'Về muộn mười phút trong đêm 3 giờ 10', deathEn: 'Ten minutes late on the 3:10 night' },
  { id: 'mi_old_wound', age: [30, 140], w: (c) => (c.scarCount >= 2 ? 1.4 : 0.15), dmg: [6, 14], san: 2, ahn: 3, lethal: 0.018,
    vi: 'Vết thương cũ lại mở ra vào ngày đầu tiên của mùa lạnh, như thể nó nhớ ngày. Bác sĩ chỉ hỏi bạn đã bỏ qua nó bao nhiêu năm.',
    en: 'The old wound opened again on the first day of the cold season, as if it remembered the date. The doctor only asked how many years you had ignored it.',
    deathVi: 'Vết thương cũ mở lại vào một mùa lạnh', deathEn: 'An old wound that reopened in a cold season' },
  // ---- by work
  { id: 'mi_forge_burn', age: [16, 140], w: (c) => (c.job === 'Workshop Craftsman' ? 2.4 : 0), dmg: [10, 24], san: 2, ahn: 3, lethal: 0.028,
    vi: 'Một mẻ kim loại nguội nhanh hơn bạn dự tính. Bạn mất mười ngày để làm quen lại với việc cầm đũa bằng bàn tay còn lại.',
    en: 'A batch of metal cooled faster than you reckoned. It took you ten days to learn to hold chopsticks with the other hand.',
    deathVi: 'Tai nạn lò rèn trong ca đêm', deathEn: 'A forge accident on the night shift' },
  { id: 'mi_fixer_infection', age: [16, 140], w: (c) => (c.job === 'Fixer' ? 1.8 : 0), dmg: [10, 20], san: 2, ahn: 4, lethal: 0.03,
    vi: 'Vết cắt từ hợp đồng tuần trước trông đã ổn. Đến sáng nay thì nó nóng hơn phần da xung quanh, và hợp đồng mới đã nằm sẵn trên bàn.',
    en: 'The cut from last week’s contract had looked fine. This morning it was hotter than the skin around it, and the new contract was already on the table.',
    deathVi: 'Vết thương từ một hợp đồng cũ bị nhiễm trùng', deathEn: 'A wound from an old contract turned septic' },
  { id: 'mi_syndicate_reprisal', age: [16, 140], w: (c) => (c.job === 'Syndicate' ? 2 : 0), dmg: [12, 26], san: 5, ahn: 0, lethal: 0.045,
    vi: 'Không ai nói đây là chuyện cá nhân. Họ chỉ đứng ở cuối hẻm đủ lâu để bạn nhận ra gương mặt, và đủ gần để bạn hiểu mình không còn đường lui.',
    en: 'No one said it was personal. They stood at the end of the alley long enough for you to recognize the faces, and close enough for you to understand there was no way back.',
    deathVi: 'Bị trả đũa trong một con hẻm cụt', deathEn: 'Reprisal in a dead-end alley' },
  { id: 'mi_night_shift', age: [18, 140], w: (c) => (c.job === 'Wing Employee' ? 1.4 : 0), dmg: [3, 9], san: 6, ahn: 0, lethal: 0.004,
    vi: 'Ca đêm thứ chín liên tiếp. Màn hình hiện ra những con số bạn đã thôi đọc được từ lâu, và bạn vẫn ký vào chúng.',
    en: 'The ninth night shift in a row. The screen showed numbers you had stopped being able to read long ago, and you signed them anyway.',
    deathVi: 'Gục xuống bàn làm việc sau chuỗi ca đêm', deathEn: 'Collapsed at the desk after a run of night shifts' },
  { id: 'mi_aftershock', age: [10, 140], w: (c) => (c.region.fantasm >= 6 ? 1.2 : 0.1), dmg: [4, 10], san: 12, ahn: 0, lethal: 0.015,
    vi: 'Một tiếng nhạc không có nguồn phát ra từ tầng dưới trong nửa đêm. Sáng hôm sau cả khu nói rằng họ không nghe thấy gì, và không ai nhìn vào mắt nhau.',
    en: 'A music with no source came from the floor below in the middle of the night. By morning the whole block said they had heard nothing, and no one looked anyone in the eye.',
    deathVi: 'Đi theo một tiếng nhạc không có nguồn xuống tầng hầm', deathEn: 'Followed a music with no source down to the cellar' },
  { id: 'mi_cold_snap', age: [0, 140], w: (c) => (c.outside ? 1.8 : c.wealth <= 5 ? 1 : 0.15), dmg: [6, 14], san: 2, ahn: 1, lethal: 0.016,
    vi: 'Đợt rét về sớm mười ngày. Bạn ngủ với tất cả quần áo mình có, và vẫn nghe răng mình va vào nhau như một bộ đếm.',
    en: 'The cold came ten days early. You slept in every piece of clothing you owned and still heard your teeth knocking like a counter.',
    deathVi: 'Đợt rét đến sớm hơn mười ngày', deathEn: 'A cold snap ten days early' },
  // ---- old age
  { id: 'mi_heart', age: [52, 140], w: () => 1.4, dmg: [14, 32], san: 4, ahn: 3, lethal: 0.07,
    vi: 'Bậc cầu thang thứ mười một trở nên dài hơn mọi lần. Bạn ngồi xuống giữa chừng và nghe tim mình như tiếng ai gõ cửa từ bên trong.',
    en: 'The eleventh step of the stairs was longer than ever. You sat down halfway and heard your heart like someone knocking at a door from the inside.',
    deathVi: 'Trái tim ngừng giữa chừng cầu thang', deathEn: 'The heart stopped halfway up the stairs' },
  { id: 'mi_quiet_stroke', age: [62, 140], w: () => 1.2, dmg: [12, 30], san: 6, ahn: 4, lethal: 0.09,
    vi: 'Buổi sáng bạn tìm cái tách, và bàn tay trái không nghe lời. Căn phòng yên đến mức bạn nghe thấy rõ từng giây lúc bạn nhận ra điều đó.',
    en: 'In the morning you reached for the cup, and the left hand would not listen. The room was so quiet you heard each second as you understood.',
    deathVi: 'Một cơn đột quỵ lặng lẽ vào buổi sáng', deathEn: 'A quiet stroke in the morning' }
];

/** How exposed this person is, relative to an ordinary Backstreets adult. */
export function exposureIndex(char) {
  const region = regionOf(char);
  let idx = 1 + (10 - region.safety) * 0.09 + (10 - region.medical) * 0.055 + region.pollution * 0.04 + region.fantasm * 0.02;
  const job = { Fixer: 1.6, Syndicate: 1.5, 'Workshop Craftsman': 1.15, 'Wing Employee': 0.8 }[char.job] ?? 1;
  idx *= job;
  if (char.flags?.includes('Distorted')) idx *= 1.8;
  const hp = char.stats?.health ?? 50;
  idx *= hp >= 75 ? 0.8 : hp <= 35 ? 1.5 : 1;
  const wealth = char.stats?.wealth ?? 5;
  idx *= wealth >= 30 ? 0.8 : wealth <= 3 ? 1.3 : 1;
  return idx;
}

/**
 * One seasonal roll. Returns null, or the mishap to apply:
 * { id, vi, en, dmg, san, ahn, fatal, deathVi, deathEn, theme }.
 * `fatal` is already resolved: health is a buffer, not a coin, so a strong body
 * shrugs off what kills a worn one.
 */
export function rollSeasonMishap(char, rng) {
  if (!char.alive) return null;
  const region = regionOf(char);
  const nest = isNestFlags(char.flags);
  const outside = isOutsideFlags(char.flags, char.regionId);
  const ageNow = char.age;
  // Gentle middle of life: baseline 4.5 percent per season, scaled by exposure.
  const ageCurve = ageNow < 5 ? 1.5 : ageNow < 18 ? 2.0 : ageNow < 45 ? 1.45 : ageNow < 60 ? 1.3 : 1.3 + (ageNow - 60) * 0.06;
  const traits = traitsOf(char);
  // A District that cuts lives short (low avgLife in worldData) is more dangerous in every season
  const harshness = Math.pow(frailty(char), 1.4);
  const chance = clamp(0.045 * exposureIndex(char) * ageCurve * traits.drama * harshness, 0.01, 0.5);
  if (rng() >= chance) return null;

  const ctx = { region, nest, outside, wealth: char.stats?.wealth ?? 5, job: char.job, scarCount: (char.scars || []).length };
  const recent = char.recentMishaps || [];
  const pool = MISHAPS
    .filter((m) => ageNow >= m.age[0] && ageNow <= m.age[1] && !recent.includes(m.id))
    .map((m) => ({ m, w: m.w(ctx) }))
    .filter((x) => x.w > 0);
  if (!pool.length) return null;
  const total = pool.reduce((s, x) => s + x.w, 0);
  let roll = rng() * total;
  let m = pool[pool.length - 1].m;
  for (const x of pool) {
    roll -= x.w;
    if (roll <= 0) { m = x.m; break; }
  }

  const dmg = Math.round(m.dmg[0] + rng() * (m.dmg[1] - m.dmg[0]));
  const hp = char.stats?.health ?? 50;
  const shield = hp < 25 ? 2.5 : hp < 50 ? 1.4 : hp > 75 ? 0.5 : 1;
  const agePenalty = ageNow >= 75 ? 3 : ageNow >= 60 ? 1.8 : 1;
  const fatalChance = clamp(m.lethal * shield * agePenalty * (2 - traits.vigor), 0, 0.6);
  return {
    id: m.id, vi: m.vi, en: m.en, dmg, san: m.san, ahn: m.ahn,
    fatal: m.lethal > 0 && rng() < fatalChance,
    deathVi: m.deathVi, deathEn: m.deathEn, theme: m.theme || null
  };
}

export const MISHAP_COUNT = MISHAPS.length;
export const PERINATAL_COUNT = PERINATAL.length;
