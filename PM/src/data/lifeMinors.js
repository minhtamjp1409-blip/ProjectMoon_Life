// ============================================================================
// MINOR CHOICES, small decisions that appear at the foot of the story while the
// year keeps moving. Unanswered, the moment passes (the `ignore` result).
//
// A choice may: change stats (fx), roll an outcome (out), shift a bond with a
// named person (bond), decide that person's fate (npcFate), bring someone new
// into your life (npc), leave a memory the City will recall (mem), schedule a
// consequence years later (later), lean your character (motif), scar you (scar).
// Entries gated by `need.mem` only appear if you once made that choice.
// ============================================================================

const M = (id, age, need, vi, en, choices, ignore, extra = {}) => ({ id, age, need, vi, en, choices, ignore, ...extra });
const C = (vi, en, rvi, ren, fx = {}, extra = {}) => ({ vi, en, rvi, ren, fx, ...extra });
const O = (w, rvi, ren, fx = {}, extra = {}) => ({ w, rvi, ren, fx, ...extra });
const I = (rvi, ren, fx = {}, extra = {}) => ({ vi: 'Để nó trôi qua', en: 'Let it pass', rvi, ren, fx, ...extra });

const KID = [4, 6];
const CHILD = [7, 11];
const TEEN = [12, 17];
const YOUNG = [7, 17];
const ADULT = [18, 45];
const GROWN = [18, 140];

export const LIFE_MINORS = [
  // ============================================================ childhood
  M('m_k_candy', KID, {}, 'Một đứa lớn hơn giật kẹo của {friend} ngay trước mặt bạn.', 'An older kid snatched {friend}’s candy right in front of you.', [
    C('Lao vào cắn tay nó', 'Bite its hand', 'Bạn bị đấm một cú vào mắt, nhưng nó buông kẹo ra.', 'You took a punch to the eye, but it let go of the candy.', { health: -2 }, { bond: { friend: 10 }, motif: { violence: 1 } }),
    C('Chia kẹo của mình cho {friend}', 'Share your own candy with {friend}', '{friend} ăn một nửa, nhét nửa kia lại vào túi bạn.', '{friend} ate half and slipped the other half back into your pocket.', { sanity: 2 }, { bond: { friend: 6 }, motif: { mercy: 1 } })
  ], I('Bạn đứng nhìn. {friend} không khóc, chỉ nhìn bạn rất lâu.', 'You just watched. {friend} didn’t cry, only looked at you for a long time.', {}, { bond: { friend: -6 } }), { tags: ['npc'] }),

  M('m_k_pipe_noise', KID, { back: true }, 'Đêm khuya có tiếng cào trong đường ống. Cha mẹ đang ngủ say.', 'Late at night something scratched inside the pipes. Your parents were fast asleep.', [
    C('Đánh thức cha mẹ', 'Wake your parents', 'Cha bạn dỏng tai nghe, rồi lặng lẽ chèn giẻ vào miệng ống. Tiếng cào dừng lại.', 'Your father listened, then quietly stuffed a rag into the pipe’s mouth. The scratching stopped.', { sanity: 1 }),
    C('Ghé tai nghe xem là gì', 'Put your ear to it', 'Có ai đó đang thì thầm tên bạn. Bạn không kể với ai, nhưng từ đó sợ bóng tối.', 'Someone was whispering your name. You told no one, but from then on you feared the dark.', { sanity: -4, resonance: 4 }, { mem: 'heard_pipes' })
  ], I('Bạn trùm chăn kín đầu. Đến sáng thì hết.', 'You pulled the blanket over your head. By morning it was gone.')),

  M('m_k_coin', KID, {}, 'Bạn nhặt được một đồng Ahn bóng loáng dưới gầm ghế ở chợ.', 'You found a shiny Ahn coin under a bench at the market.', [
    C('Đưa cho mẹ', 'Give it to your mother', 'Mẹ bạn mua thêm được một ổ bánh. Cả nhà ăn tối no hơn mọi khi.', 'Your mother bought an extra loaf. The family ate better than usual that night.', { health: 1, sanity: 1 }),
    C('Giấu đi để dành', 'Hide it away', 'Đó là đồng xu đầu tiên trong "kho báu" của bạn. Bạn kiểm tra nó mỗi đêm.', 'It was the first coin of your “treasure.” You checked on it every night.', { wealth: 1 }, { motif: { greed: 1 } })
  ], I('Bạn để nó lại. Một đứa khác nhặt ngay sau lưng bạn.', 'You left it. Another kid grabbed it right behind you.')),

  M('m_c_dog', CHILD, { back: true }, 'Có kẻ đầu độc chó hoang trong khu. Con chó nhỏ hay theo bạn đang nằm co giật sau thùng rác.', 'Someone was poisoning the strays on the block. The little dog that followed you around lay twitching behind the bins.', [
    C('Ôm nó chạy đến phòng khám', 'Carry it to the clinic', null, null, { wealth: -2 }, { out: [
      O(55, 'Bác sĩ thú y bắt nó nôn ra. Nó sống, và từ đó không rời bạn nửa bước.', 'The vet made it throw up. It lived, and never left your side again.', { sanity: 4 }, { mem: 'saved_dog' }),
      O(45, 'Nó chết trên tay bạn trước khi tới nơi. Bạn chôn nó dưới cột điện đầu hẻm.', 'It died in your arms before you got there. You buried it under the lamppost at the end of the alley.', { sanity: -4 })
    ], motif: { mercy: 1 } }),
    C('Tìm xem ai đã làm', 'Find out who did it', 'Bạn thấy ông chủ quán thịt nướng rải bả. Ông ta thấy bạn nhìn, và mỉm cười.', 'You saw the grill-house owner scattering the bait. He saw you watching, and smiled.', { sanity: -2 }, { mem: 'grill_owner' })
  ], I('Bạn quay đi. Sáng hôm sau cái xác đã biến mất. Quán thịt nướng có món mới.', 'You turned away. By morning the body was gone. The grill house had a new dish.', { sanity: -3 }), { theme: 'animals' }),

  M('m_c_shoplift', CHILD, { notNest: true }, '{friend} rủ bạn đánh cắp đồ hộp ở tiệm tạp hóa của một ông già mù.', '{friend} wanted to steal canned food from a blind old man’s shop.', [
    C('Đi cùng {friend}', 'Go with {friend}', null, null, {}, { out: [
      O(70, 'Hai đứa chạy về với túi đầy đồ hộp. Ông già không bao giờ biết.', 'You ran home with a bag full of tins. The old man never knew.', { health: 2, wealth: 2 }, { bond: { friend: 6 }, motif: { greed: 1 }, mem: 'stole_from_blind' }),
      O(30, 'Ông già túm được tay bạn. Ông không đánh, chỉ hỏi: "Con đói lắm à?" Bạn xấu hổ đến mức muốn chết.', 'The old man caught your wrist. He didn’t hit you, only asked, “Are you that hungry?” You wanted to die of shame.', { sanity: -3 }, { bond: { friend: 3 }, mem: 'blind_shopkeeper' })
    ] }),
    C('Ngăn {friend} lại', 'Stop {friend}', '{friend} gọi bạn là đồ hèn rồi bỏ đi một mình. Ba ngày sau mới chịu nói chuyện lại.', '{friend} called you a coward and went alone. It was three days before they spoke to you again.', { sanity: 1, rep: 1 }, { bond: { friend: -8 }, motif: { mercy: 1 } })
  ], I('Bạn viện cớ về nhà. {friend} đi một mình.', 'You made an excuse to go home. {friend} went alone.', {}, { bond: { friend: -3 } }), { tags: ['npc'] }),

  M('m_c_blind_return', [9, 17], { mem: 'blind_shopkeeper' }, 'Ông già mù ở tiệm tạp hóa nhận ra giọng bạn. Ông nhờ bạn khuân giúp mấy thùng hàng.', 'The blind shopkeeper recognized your voice. He asked you to help carry some crates.', [
    C('Giúp ông', 'Help him', 'Từ đó mỗi tuần ông trả bạn vài Ahn và một hộp đồ ăn. Đó là công việc đầu tiên của bạn.', 'After that he paid you a few Ahn and a tin of food every week. It was your first job.', { wealth: 3, sanity: 3, network: 2 }, { motif: { mercy: 1 } }),
    C('Giả vờ không nghe thấy', 'Pretend you didn’t hear', 'Ông gọi tên bạn thêm hai lần, rồi thôi.', 'He called your name twice more, then stopped.', { sanity: -2 })
  ], I('Bạn đi qua thật nhanh.', 'You hurried past.'), { once: true, tags: ['callback'] }),

  M('m_c_grill_return', [10, 30], { mem: 'grill_owner' }, 'Ông chủ quán thịt nướng năm xưa bị Fixer bắt vì buôn thịt người. Họ cần nhân chứng.', 'The grill-house owner from years ago was arrested by Fixers for selling human meat. They needed a witness.', [
    C('Làm chứng', 'Testify', 'Ông ta bị treo cổ trước quán. Hàng xóm nhìn bạn khác đi, một nửa kính trọng, một nửa sợ.', 'He was hanged outside his shop. The neighbors looked at you differently, half respect, half fear.', { rep: 5, sanity: -2, heat: 4 }),
    C('Im lặng', 'Stay silent', 'Ông ta được thả sau ba ngày. Quán mở cửa lại vào tuần sau.', 'He was released after three days. The shop reopened the next week.', { sanity: -3 })
  ], I('Bạn tránh mặt Fixer suốt tuần đó.', 'You avoided the Fixers all week.'), { once: true, tags: ['callback'] }),

  M('m_c_index_slip', CHILD, { back: true }, 'Một tờ giấy bay vào cửa sổ, chữ viết tay ngay ngắn: "Hãy đưa chiếc giày trái của mẹ ngươi cho người đầu tiên gõ cửa."', 'A slip of paper drifted through the window, in neat handwriting: “Give your mother’s left shoe to the first person who knocks.”', [
    C('Làm theo', 'Do as it says', 'Người gõ cửa mặc áo choàng trắng. Hắn nhận chiếc giày, cúi chào, và đi. Mẹ bạn tìm giày suốt một tháng.', 'The one who knocked wore a white cloak. They took the shoe, bowed, and left. Your mother searched for it for a month.', { resonance: 5 }, { mem: 'obeyed_prescript', motif: { faith: 1 } }),
    C('Đốt tờ giấy', 'Burn the slip', 'Đêm đó có người gõ cửa rất lâu. Không ai ra mở.', 'That night someone knocked for a very long time. No one opened.', { sanity: -3 }, { mem: 'burned_prescript', later: [{ id: 'm_index_remembers', years: 6, reasonVi: 'Index nhớ tờ Prescript bị đốt', reasonEn: 'The Index remembers the burned Prescript' }] })
  ], I('Bạn nhét tờ giấy dưới gối và quên nó đi.', 'You tucked it under your pillow and forgot it.'), { theme: 'index' }),

  M('m_index_remembers', [12, 60], { mem: 'burned_prescript' }, 'Một Proselyte của Index chặn bạn ở hẻm. "Nhiều năm trước, ngươi đã đốt một Prescript." Hắn rút kiếm.', 'An Index Proselyte blocked your way in an alley. “Years ago, you burned a Prescript.” They drew a blade.', [
    C('Chạy', 'Run', null, null, {}, { out: [
      O(60, 'Bạn thoát, nhưng lưỡi kiếm kịp rạch một đường dài trên lưng.', 'You escaped, but the blade left a long cut down your back.', { health: -10 }),
      O(40, 'Hắn không đuổi theo. Bạn hiểu: Prescript chỉ bảo hắn rút kiếm, không bảo hắn giết.', 'They didn’t follow. You understood: the Prescript only told them to draw, not to kill.', { sanity: -4, resonance: 4 })
    ] }),
    C('Đứng lại đối mặt', 'Stand your ground', 'Hắn chém đứt hai ngón tay trái của bạn, rồi cúi chào như lần trước. "Món nợ đã trả."', 'They cut off two fingers of your left hand, then bowed as before. “The debt is paid.”', { health: -14, sanity: -6, rep: 3 }, { scar: 'Hai ngón tay trả cho Index', motif: { violence: 1 } })
  ], I('Bạn đứng chết lặng. Hắn rạch má bạn một đường rồi bỏ đi.', 'You froze. They cut a line across your cheek and walked away.', { health: -6, sanity: -4 }), { once: true, tags: ['callback', 'danger'], theme: 'index' }),

  M('m_c_nest_servant', CHILD, { nest: true }, 'Người giúp việc trong nhà lén lấy đồ ăn thừa mang về cho con. Chỉ bạn nhìn thấy.', 'The household maid was secretly taking leftovers home to her child. Only you saw.', [
    C('Giữ bí mật', 'Keep the secret', 'Cô ấy biết bạn đã thấy. Sáng nào cô cũng để thêm một chiếc bánh trên bàn học của bạn.', 'She knew you’d seen. Every morning she left an extra pastry on your desk.', { sanity: 2 }, { motif: { mercy: 1 } }),
    C('Mách cha mẹ', 'Tell your parents', 'Cô ấy bị đuổi trong ngày. Hồ sơ cư trú Nest của cô bị hủy. Bạn được khen là "biết điều".', 'She was dismissed that day. Her Nest residency was revoked. You were praised as “sensible.”', { rep: 2, sanity: -3 }, { mem: 'reported_maid', later: [{ id: 'm_maid_child', years: 9, reasonVi: 'Đứa con của người giúp việc bị đuổi', reasonEn: 'The dismissed maid’s child' }] })
  ], I('Bạn không nói gì. Rồi một ngày cô ấy không đến nữa.', 'You said nothing. Then one day she stopped coming.')),

  M('m_maid_child', [18, 60], { mem: 'reported_maid' }, 'Một người trẻ đứng chờ bạn ở cổng Nest. "Mẹ tôi chết ở Backstreets hai năm sau khi bị đuổi. Tôi chỉ muốn nhìn mặt người đã nói ra."', 'A young person was waiting at the Nest gate. “My mother died in the Backstreets two years after she was dismissed. I just wanted to see the face of the one who told.”', [
    C('Xin lỗi', 'Apologize', 'Người đó nhổ xuống chân bạn rồi bỏ đi. Lời xin lỗi không làm ai sống lại.', 'They spat at your feet and left. An apology brings no one back.', { sanity: -2 }),
    C('Đưa tiền', 'Offer money', 'Họ cầm tiền. Họ không nói cảm ơn. Bạn cảm thấy tệ hơn.', 'They took the money. They didn’t say thank you. You felt worse.', { wealth: -6, sanity: -1 }),
    C('Gọi an ninh', 'Call security', 'An ninh Nest lôi họ đi. Bạn không bao giờ biết chuyện gì xảy ra sau đó.', 'Nest security dragged them away. You never learned what happened next.', { sanity: -4, rep: 1 }, { motif: { violence: 1 } })
  ], I('Bạn đi qua như không thấy họ.', 'You walked past as if you didn’t see them.', { sanity: -2 }), { once: true, tags: ['callback'] }),

  // ============================================================ teenage years
  M('m_t_friend_fixer', TEEN, { npc: 'friend', notNest: true }, '{friend} xin được việc chạy vặt cho một Office. Nó rủ bạn cùng đi.', '{friend} got work running errands for an Office. They asked you to come along.', [
    C('Đi cùng', 'Go with them', 'Hai đứa chạy thư, rửa máu trên sàn, và được trả bằng tiền thật. Lần đầu tiên bạn thấy mình có giá.', 'You ran messages, mopped blood off floors, and got paid in real money. For the first time you felt worth something.', { wealth: 4, network: 3, health: -1 }, { bond: { friend: 8 }, flags: ['해결사동경'], mem: 'office_errands' }),
    C('Khuyên nó đừng', 'Talk them out of it', '{friend} cười: "Mày muốn cả đời nghèo à?" Nó vẫn đi.', '{friend} laughed: “You want to be poor forever?” They went anyway.', {}, { bond: { friend: -4 }, later: [{ id: 'm_friend_injured', years: 2, reasonVi: '{friend} đi làm cho Office một mình', reasonEn: '{friend} went to work for the Office alone' }] })
  ], I('Bạn chưa trả lời. {friend} đi một mình.', 'You didn’t answer. {friend} went alone.', {}, { later: [{ id: 'm_friend_injured', years: 2, reasonVi: '{friend} đi làm cho Office một mình', reasonEn: '{friend} went to work for the Office alone' }] }), { tags: ['npc'] }),

  M('m_friend_injured', [13, 22], { npc: 'friend' }, '{friend} được khiêng về với một bên chân nát. Office nói đó là "rủi ro nghề nghiệp" và không trả tiền chữa.', '{friend} was carried home with one leg crushed. The Office called it an “occupational hazard” and wouldn’t pay for treatment.', [
    C('Gom hết tiền của bạn cho nó', 'Give them all your savings', 'Đủ cho một cái chân giả cũ. {friend} khóc lần đầu tiên trước mặt bạn.', 'Enough for an old prosthetic leg. {friend} cried in front of you for the first time.', { wealth: -10, sanity: 2 }, { bond: { friend: 18 }, motif: { loyalty: 1 } }),
    C('Đến Office đòi công bằng', 'Go to the Office and demand justice', null, null, {}, { out: [
      O(40, 'Trưởng Office ném cho bạn 15 Ahn "cho xong chuyện". Bạn mang về cho {friend}.', 'The Office head tossed you 15 Ahn “to be done with it.” You brought it to {friend}.', { wealth: 2, rep: 4 }, { bond: { friend: 12 } }),
      O(60, 'Họ đánh bạn gãy ba xương sườn và vứt ra đường. {friend} nằm cạnh bạn trên cùng một tấm nệm.', 'They broke three of your ribs and threw you into the street. {friend} lay beside you on the same mattress.', { health: -12 }, { bond: { friend: 14 }, motif: { violence: 1 } })
    ] })
  ], I('Bạn đến thăm vài lần rồi thôi. {friend} không trách, nhưng không còn gọi bạn nữa.', 'You visited a few times, then stopped. {friend} didn’t blame you, but stopped calling.', {}, { bond: { friend: -15 } }), { once: true, tags: ['npc', 'callback'] }),

  M('m_t_rival', TEEN, { noNpc: 'rival' }, 'Một đứa cùng tuổi trong khu luôn tìm cách vượt mặt bạn, điểm số, chỗ làm, cả người bạn thích.', 'A kid your age on the block always tried to outdo you, grades, jobs, even the person you liked.', [
    C('Đấu tay đôi cho ra lẽ', 'Settle it with a fight', null, null, {}, { out: [
      O(50, 'Bạn thắng. Nó lau máu mũi và nói: "Chưa xong đâu."', 'You won. It wiped its bloody nose and said: “This isn’t over.”', { health: -3, rep: 3 }, { npc: { role: 'rival' }, motif: { violence: 1 } }),
      O(50, 'Bạn thua, thua đau. Nó đứng nhìn bạn nằm dưới đất, không cười.', 'You lost, badly. It stood over you on the ground, not smiling.', { health: -6, sanity: -2 }, { npc: { role: 'rival' } })
    ] }),
    C('Phớt lờ nó', 'Ignore it', 'Nó càng điên hơn khi bị phớt lờ. Từ đó nó để ý bạn từng bước.', 'Being ignored only made it angrier. From then on it watched your every step.', { sanity: 1 }, { npc: { role: 'rival', bond: 30 } })
  ], I('Bạn chưa kịp làm gì. Nó đã quyết định bạn là kẻ thù.', 'You hadn’t done anything yet. It had already decided you were its enemy.', {}, { npc: { role: 'rival', bond: 25 } }), { once: true, tags: ['npc'] }),

  M('m_t_crush', TEEN, { noNpc: 'lover' }, 'Có một người ở xưởng giặt hay để dành cho bạn chỗ ngồi cạnh cửa sổ.', 'Someone at the laundry always saved you the seat by the window.', [
    C('Ngồi xuống và bắt chuyện', 'Sit down and talk', 'Hai người nói chuyện đến khi xưởng đóng cửa. Lần đầu tiên bạn quên mất giờ giới nghiêm.', 'You talked until the laundry closed. For the first time you forgot the curfew.', { sanity: 4 }, { npc: { role: 'lover', bond: 55 } }),
    C('Ngồi chỗ khác', 'Sit somewhere else', 'Họ không để dành chỗ nữa.', 'They stopped saving the seat.', {})
  ], I('Bạn cứ ngồi đó mà không nói gì, mùa này qua mùa khác.', 'You kept sitting there without a word, season after season.', { sanity: 1 })),

  M('m_t_lover_sweepers', [14, 30], { npc: 'lover' }, '{lover} chưa về nhà lúc 3 giờ 05. Tiếng còi sắp vang lên.', '{lover} still wasn’t home at 3:05. The siren was about to sound.', [
    C('Chạy ra ngoài tìm', 'Run out to find them', null, null, {}, { out: [
      O(60, 'Bạn tìm thấy {lover} đang nấp sau một xe rác và kéo về kịp lúc 3 giờ 09. Hai người ngồi run trong bóng tối đến sáng.', 'You found {lover} hiding behind a garbage truck and dragged them home at 3:09. You both sat shaking in the dark until morning.', { sanity: -2, health: -2 }, { bond: { lover: 20 }, motif: { loyalty: 1 } }),
      O(40, 'Bạn bị kẹt ngoài đường khi còi vang. Một Sweeper lướt qua cách bạn hai bước. Bạn sống sót. Bạn không bao giờ kể điều mình đã thấy.', 'You were caught outside when the siren sounded. A Sweeper glided past two steps from you. You survived. You never told anyone what you saw.', { sanity: -10, resonance: 6 }, { bond: { lover: 15 }, scar: 'Đêm ở ngoài lúc 3:13' })
    ] }),
    C('Khóa cửa, cầu nguyện', 'Lock the door and pray', null, null, {}, { out: [
      O(65, '{lover} gõ cửa lúc 3 giờ 08. Bạn mở cửa và ôm họ, cả hai không nói được gì.', '{lover} knocked at 3:08. You opened the door and held them; neither could speak.', { sanity: 2 }, { bond: { lover: 6 } }),
      O(35, 'Sáng hôm sau người ta tìm thấy giày của {lover} ở đầu hẻm. Chỉ có giày.', 'The next morning they found {lover}’s shoes at the end of the alley. Only the shoes.', { sanity: -18 }, { npcFate: { lover: 'dead' }, scar: 'Đôi giày ở đầu hẻm' })
    ] })
  ], I('Bạn ngồi nhìn kim đồng hồ.', 'You sat watching the clock hand.', {}, { out: [
    O(60, '{lover} về lúc 3 giờ 09, thở không ra hơi.', '{lover} made it back at 3:09, breathless.', { sanity: -1 }),
    O(40, '{lover} không về. Không bao giờ về.', '{lover} didn’t come back. Ever.', { sanity: -18 }, { npcFate: { lover: 'dead' }, scar: 'Đôi giày ở đầu hẻm' })
  ] }), { once: true, tags: ['npc', 'danger'], theme: '313' }),

  M('m_t_nest_exam_cheat', TEEN, { nest: true }, 'Một đàn anh bán đề thi thực tập sinh Wing với giá 12 Ahn.', 'An older student was selling the Wing internship exam for 12 Ahn.', [
    C('Mua', 'Buy it', null, null, { wealth: -4 }, { out: [
      O(70, 'Điểm của bạn đứng thứ hai toàn khu. Không ai hỏi gì.', 'You scored second in the whole district. No one asked a thing.', { network: 6, rep: 3 }, { mem: 'cheated_exam', motif: { greed: 1 } }),
      O(30, 'Đề giả. Bạn trượt, và bị ghi tên vào danh sách "theo dõi".', 'The exam was fake. You failed, and your name went on a “watch” list.', { rep: -4, sanity: -3 }, { mem: 'cheated_exam' })
    ] }),
    C('Tự ôn', 'Study on your own', 'Bạn qua, sát nút. Cha bạn không khen, chỉ gật đầu.', 'You passed, barely. Your father didn’t praise you, only nodded.', { network: 3, sanity: -2 })
  ], I('Bạn để lỡ kỳ thi năm nay.', 'You let this year’s exam slip by.', { network: -2 })),

  M('m_t_out_trader', TEEN, { out: true }, 'Một thương nhân từ The City đề nghị đưa bạn qua tường, đổi lại bạn làm cho hắn ba năm.', 'A trader from the City offered to smuggle you over the wall in exchange for three years of work.', [
    C('Đồng ý', 'Accept', 'Bạn qua tường trong một thùng hàng, thở bằng ống cao su. The City có mùi dầu và tiền.', 'You crossed the wall in a cargo crate, breathing through a rubber tube. The City smelled of oil and money.', { wealth: -2, sanity: -3, network: 3 }, { flags: ['Backstreets'], mem: 'smuggled_in' }),
    C('Từ chối', 'Refuse', 'Hắn nhún vai và chọn một đứa khác. Tháng sau người ta thấy đứa đó trong một bãi rác nội tạng.', 'He shrugged and picked another kid. The next month that kid turned up in an organ dump.', { sanity: -2 })
  ], I('Bạn chưa trả lời. Hắn đi mất.', 'You didn’t answer. He left.')),

  // ============================================================ adulthood, any path
  M('m_a_debt_neighbor', GROWN, { notNest: true }, 'Người hàng xóm quỳ trước cửa nhà bạn: The Middle cho anh ta đến sáng mai để trả 30 Ahn.', 'Your neighbor knelt at your door: the Middle gave him until tomorrow morning to pay 30 Ahn.', [
    C('Cho mượn', 'Lend it', null, null, { wealth: -8 }, { out: [
      O(45, 'Anh ta trả lại sau một năm, kèm một chai rượu ngon.', 'He paid you back a year later, with a good bottle.', { wealth: 6, network: 3 }),
      O(55, 'Anh ta biến mất cùng tiền của bạn. Một tuần sau The Middle tìm thấy anh ta trước.', 'He vanished with your money. A week later the Middle found him first.', { sanity: -3 })
    ], motif: { mercy: 1 } }),
    C('Đóng cửa lại', 'Close the door', 'Sáng hôm sau cửa nhà anh ta mở toang. Trong nhà không còn ai, chỉ có một dòng chữ sơn tím trên tường.', 'The next morning his door stood open. No one was inside, only a line of purple paint on the wall.', { sanity: -4 })
  ], I('Bạn giả vờ không có nhà.', 'You pretended not to be home.', { sanity: -3 }), { theme: 'middle' }),

  M('m_a_ampoule_deal', GROWN, {}, 'Một gã bán dạo mời bạn mua ampoule "chính hãng K Corp" với giá chỉ bằng một phần ba.', 'A street dealer offered “genuine K Corp” ampoules at a third of the price.', [
    C('Mua vài ống', 'Buy a few', null, null, { wealth: -3 }, { out: [
      O(55, 'Hàng thật, hoặc đủ gần với hàng thật. Vết thương cũ lành hẳn.', 'Genuine, or close enough. Your old wounds closed up.', { health: 8 }),
      O(45, 'Da bạn sủi bọt trong ba ngày. Khi bọt khô, bạn có một vết sẹo hình bông hoa.', 'Your skin bubbled for three days. When it dried, you had a flower-shaped scar.', { health: -6, resonance: 4 }, { scar: 'Vết sẹo hình bông hoa' })
    ] }),
    C('Báo cho Fixer', 'Report him to a Fixer', 'Hắn bị bắt. Đồng bọn hắn biết ai đã báo.', 'He was arrested. His friends knew who had reported him.', { rep: 3, heat: 6 })
  ], I('Bạn lắc đầu đi tiếp.', 'You shook your head and walked on.')),

  M('m_a_child_beggar', GROWN, {}, 'Một đứa trẻ khoảng sáu tuổi bám theo bạn ba con phố, không xin gì, chỉ đi theo.', 'A child of about six followed you for three streets, asking for nothing, just following.', [
    C('Mua cho nó một bữa ăn', 'Buy it a meal', 'Nó ăn rất nhanh, rồi chạy mất mà không nói một lời.', 'It ate very fast, then ran off without a word.', { wealth: -2, sanity: 3 }, { motif: { mercy: 1 } }),
    C('Đưa nó đến cô nhi viện Dieci', 'Take it to the Dieci orphanage', 'Các nữ tu ghi tên nó vào sổ. Nó nắm tay bạn đến tận cổng.', 'The sisters wrote its name in the ledger. It held your hand all the way to the gate.', { sanity: 4, rep: 2, wealth: -1 }, { mem: 'orphan_dieci' }),
    C('Đuổi nó đi', 'Chase it off', 'Nó dừng lại ở góc phố, nhìn bạn, rồi biến vào bóng tối.', 'It stopped at the corner, looked at you, and vanished into the dark.', { sanity: -2 })
  ], I('Bạn rẽ vào hẻm và cắt đuôi nó.', 'You ducked into an alley and lost it.')),

  M('m_a_library_letter', [20, 70], {}, 'Một phong bì xanh nằm trên gối của bạn. Thư mời đến một Thư viện, ký tên "Angela".', 'A blue envelope lay on your pillow. An invitation to a Library, signed “Angela.”', [
    C('Xé bỏ', 'Tear it up', 'Phong bì cháy thành tro trước khi bạn kịp xé. Bạn ngủ không yên cả tháng.', 'The envelope burned to ash before you could tear it. You slept badly for a month.', { sanity: -3, resonance: 3 }),
    C('Giữ lại', 'Keep it', 'Bạn cất nó trong ngăn kéo. Thỉnh thoảng nó ấm lên như có nhịp tim.', 'You kept it in a drawer. Sometimes it grew warm, as if it had a heartbeat.', { resonance: 6 }, { mem: 'library_invite' })
  ], I('Bạn để nó nằm đó. Sáng hôm sau nó đã biến mất.', 'You left it there. By morning it was gone.'), { once: true, theme: 'library' }),

  M('m_a_fixer_hire', GROWN, { stat: { wealth: [30, 100] } }, 'Có kẻ lạ cứ đứng đối diện nhà bạn mỗi tối. Một Office nhỏ báo giá 15 Ahn để "xử lý".', 'A stranger stood across from your home every evening. A small Office quoted 15 Ahn to “handle it.”', [
    C('Thuê họ', 'Hire them', null, null, { wealth: -15 }, { out: [
      O(70, 'Kẻ lạ không xuất hiện nữa. Bạn không hỏi Office đã làm gì.', 'The stranger never came back. You didn’t ask what the Office did.', { sanity: 4 }),
      O(30, 'Office nhận tiền rồi biến mất. Kẻ lạ vẫn đứng đó, giờ thì vẫy tay chào bạn.', 'The Office took the money and vanished. The stranger was still there, now waving at you.', { sanity: -5 })
    ] }),
    C('Tự ra hỏi chuyện', 'Go and ask yourself', 'Đó là một người mẹ đang tìm đứa con mất tích. Bà nghĩ nó từng sống trong căn nhà của bạn.', 'It was a mother searching for her missing child. She thought it had once lived in your home.', { sanity: -2, network: 2 })
  ], I('Bạn kéo rèm kín lại.', 'You drew the curtains shut.', { sanity: -2 })),

  M('m_a_lover_propose', [20, 45], { npc: 'lover', noNpc: 'spouse' }, '{lover} hỏi bạn có muốn cùng thuê một căn phòng không. "Hai người thì trả tiền khóa rẻ hơn."', '{lover} asked if you wanted to rent a room together. “Locks are cheaper split two ways.”', [
    C('Đồng ý', 'Say yes', 'Căn phòng nhỏ đến mức hai người phải thay nhau đứng. Bạn hạnh phúc hơn bao giờ hết.', 'The room was so small you had to take turns standing. You were happier than ever.', { sanity: 8, wealth: 2 }, { promote: { from: 'lover', to: 'spouse' }, bond: { lover: 10 } }),
    C('Chưa phải lúc', 'Not yet', '{lover} gật đầu, nhưng tối đó về nhà sớm hơn thường lệ.', '{lover} nodded, but went home earlier than usual that night.', {}, { bond: { lover: -10 } })
  ], I('Bạn đổi chủ đề. {lover} không hỏi lại.', 'You changed the subject. {lover} never asked again.', {}, { bond: { lover: -6 } }), { once: true, tags: ['npc'] }),

  M('m_a_spouse_child', [22, 45], { npc: 'spouse', noNpc: 'child' }, '{lover} nói với bạn, rất khẽ: "Mình có con rồi."', '{lover} told you, very softly: “We’re having a child.”', [
    C('Vui mừng', 'Be glad', 'Bạn bắt đầu làm thêm ca đêm và đếm từng đồng Ahn. Lần đầu tiên bạn sợ chết.', 'You started working night shifts and counting every Ahn. For the first time you were afraid to die.', { sanity: 5, wealth: -4 }, { npc: { role: 'child', bond: 80 } }),
    C('Lo sợ', 'Be afraid', 'Bạn ngồi đếm số khóa trên cửa cả đêm. Đến sáng bạn quyết định mua thêm hai cái.', 'You sat up all night counting the locks on the door. By morning you’d decided to buy two more.', { sanity: -2, wealth: -2 }, { npc: { role: 'child', bond: 65 } })
  ], I('Bạn ôm {lover} mà không nói gì.', 'You held {lover} without a word.', {}, { npc: { role: 'child', bond: 70 } }), { once: true, tags: ['npc'] }),

  M('m_a_rival_rise', [18, 50], { npc: 'rival' }, 'Bạn nghe tin {rival} vừa được thăng chức, vào đúng vị trí bạn từng nhắm tới.', 'You heard {rival} had just been promoted, into the exact position you’d wanted.', [
    C('Đến chúc mừng', 'Congratulate them', '{rival} nhìn bạn rất lâu, rồi rót cho bạn một ly. "Lần sau chắc đến lượt mày."', '{rival} looked at you a long time, then poured you a drink. “Your turn next, probably.”', { sanity: 2, network: 3 }, { bond: { rival: 15 } }),
    C('Tung tin đồn bẩn', 'Spread a dirty rumor', null, null, {}, { out: [
      O(50, 'Tin đồn lan nhanh. {rival} bị điều chuyển. Bạn thắng, nhưng thấy miệng mình đắng.', 'The rumor spread fast. {rival} was transferred. You won, and it tasted bitter.', { rep: 3, sanity: -3 }, { bond: { rival: -25 }, motif: { greed: 1 }, mem: 'ruined_rival' }),
      O(50, '{rival} biết ai tung tin. Một tuần sau, nhà bạn bị đốt.', '{rival} knew who started it. A week later your home was set on fire.', { wealth: -10, health: -4 }, { bond: { rival: -30 }, mem: 'ruined_rival' })
    ] })
  ], I('Bạn nuốt cục tức vào trong.', 'You swallowed your anger.', { sanity: -2 }), { tags: ['npc'] }),

  M('m_a_rival_nemesis', [22, 70], { mem: 'ruined_rival', npc: 'rival' }, '{rival} đứng chờ bạn dưới mưa, tay cầm một khẩu súng của Thumb. "Mày lấy của tao mọi thứ."', '{rival} was waiting for you in the rain, holding a Thumb pistol. “You took everything from me.”', [
    C('Rút vũ khí', 'Draw your weapon', null, null, {}, { out: [
      O(55, 'Bạn nhanh hơn. {rival} ngã xuống vũng nước. Bạn đứng đó rất lâu, cho đến khi mưa rửa sạch mọi thứ.', 'You were faster. {rival} fell into a puddle. You stood there a long time, until the rain washed everything away.', { sanity: -12, rep: 4, heat: 6 }, { npcFate: { rival: 'dead' }, scar: 'Phát súng dưới mưa', motif: { violence: 2 } }),
      O(45, 'Viên đạn xuyên qua vai bạn. {rival} bỏ đi, để bạn sống, có lẽ đó là cách trả thù tàn nhẫn nhất.', 'The bullet went through your shoulder. {rival} walked away and let you live, perhaps the cruelest revenge of all.', { health: -18, sanity: -6 }, { bond: { rival: -10 } })
    ] }),
    C('Quỳ xuống xin lỗi', 'Kneel and apologize', '{rival} hạ súng. "Tao không cần lời xin lỗi của mày." Nhưng hắn không bắn.', '{rival} lowered the gun. “I don’t need your apology.” But they didn’t shoot.', { sanity: -4, rep: -4 }, { bond: { rival: 20 }, motif: { mercy: 1 } })
  ], I('Bạn đứng yên. {rival} bóp cò.', 'You stood still. {rival} pulled the trigger.', { health: -24 }, { scar: 'Phát súng dưới mưa' }), { once: true, tags: ['npc', 'callback', 'danger'] }),

  M('m_a_friend_reunion', [20, 70], { npc: 'friend' }, 'Bạn tình cờ gặp lại {friend} ở một quán Bistro. Cả hai đều đã khác đi nhiều.', 'You ran into {friend} at a bistro. You had both changed a great deal.', [
    C('Ngồi uống cả đêm', 'Drink all night', 'Hai người kể cho nhau những chuyện chưa từng kể với ai. Đến sáng, bạn thấy nhẹ lòng như hồi mười tuổi.', 'You told each other things you’d never told anyone. By morning you felt as light as when you were ten.', { sanity: 7, wealth: -2 }, { bond: { friend: 12 } }),
    C('Chào qua rồi đi', 'Say hello and leave', 'Bạn không biết nói gì với một người từng biết rõ bạn đến thế.', 'You didn’t know what to say to someone who once knew you so well.', { sanity: -1 }, { bond: { friend: -5 } })
  ], I('Bạn giả vờ không nhận ra.', 'You pretended not to recognize them.', {}, { bond: { friend: -10 } }), { tags: ['npc'] }),

  M('m_a_friend_debt', [18, 60], { npc: 'friend', stat: { wealth: [10, 100] } }, '{friend} nhắn: "Tao cần 20 Ahn. Đừng hỏi để làm gì. Tao sẽ trả." Tin nhắn gửi lúc 2 giờ 50 sáng.', '{friend} texted: “I need 20 Ahn. Don’t ask what for. I’ll pay you back.” It was sent at 2:50 AM.', [
    C('Gửi tiền ngay', 'Send it right away', null, null, { wealth: -8 }, { out: [
      O(55, 'Một năm sau {friend} trả đủ, cùng một chiếc đồng hồ cũ của cha nó. "Mày đã cứu mạng tao."', 'A year later {friend} paid it all back, with their father’s old watch. “You saved my life.”', { wealth: 6, sanity: 4 }, { bond: { friend: 20 } }),
      O(45, '{friend} không bao giờ trả, và cũng không bao giờ nhắn lại. Một Fixer nói đã thấy nó ở District 12.', '{friend} never paid it back, and never texted again. A Fixer said they saw them in District 12.', { sanity: -3 }, { npcFate: { friend: 'missing' } })
    ], motif: { loyalty: 1 } }),
    C('Hỏi để làm gì', 'Ask what it’s for', '{friend} không trả lời. Sáng hôm sau bạn nhận được một tin: "Thôi khỏi."', '{friend} didn’t answer. The next morning: “Forget it.”', {}, { bond: { friend: -8 }, later: [{ id: 'm_friend_fate', years: 3, reasonVi: '{friend} đã cần tiền lúc 2 giờ 50 sáng', reasonEn: '{friend} needed money at 2:50 AM' }] })
  ], I('Bạn đọc tin nhắn và đặt điện thoại xuống.', 'You read the message and put the phone down.', {}, { bond: { friend: -12 }, later: [{ id: 'm_friend_fate', years: 3, reasonVi: '{friend} đã cần tiền lúc 2 giờ 50 sáng', reasonEn: '{friend} needed money at 2:50 AM' }] }), { once: true, tags: ['npc'] }),

  M('m_friend_fate', [20, 70], { npc: 'friend' }, 'Bạn nhận ra {friend} trong danh sách truy nã của Hana: "Đã liên kết với một Distortion. Urban Myth."', 'You recognized {friend} on a Hana wanted list: “Associated with a Distortion. Urban Myth.”', [
    C('Đi tìm {friend}', 'Go and find {friend}', null, null, {}, { out: [
      O(40, 'Bạn tìm thấy {friend} trong một nhà kho ở District 12, đang nói chuyện với một thứ không có mặt. Nó nhìn bạn, nhận ra bạn, và khóc. Hai người cùng trốn khỏi The City một tháng.', 'You found {friend} in a District 12 warehouse, talking to something with no face. They looked at you, knew you, and wept. The two of you hid from the City for a month.', { sanity: -6, wealth: -6 }, { bond: { friend: 25 }, motif: { loyalty: 1 } }),
      O(60, 'Bạn đến chậm một ngày. Hana đã dọn sạch nhà kho. Thứ duy nhất còn lại là chiếc khăn quàng {friend} đeo từ hồi mười tuổi.', 'You were a day late. Hana had cleaned out the warehouse. All that remained was the scarf {friend} had worn since they were ten.', { sanity: -16 }, { npcFate: { friend: 'dead' }, scar: 'Chiếc khăn quàng của {friend}' })
    ] }),
    C('Báo cho Hana', 'Report to Hana', 'Bạn nhận 20 Ahn tiền thưởng. Bạn không dám hỏi kết cục.', 'You received a 20 Ahn reward. You didn’t dare ask how it ended.', { wealth: 8, sanity: -10, rep: 2 }, { npcFate: { friend: 'dead' }, motif: { greed: 1 } })
  ], I('Bạn gấp tờ danh sách lại và cất đi.', 'You folded the list and put it away.', { sanity: -6 }), { once: true, tags: ['npc', 'callback'] }),

  M('m_a_mentor_meet', [16, 40], { noNpc: 'mentor' }, 'Một Fixer già, cụt một tay, ngồi ở quán nhìn bạn đánh nhau với hai tên say. "Mày đánh như chó dại. Muốn học không?"', 'An old one-armed Fixer at the bar watched you fight two drunks. “You fight like a rabid dog. Want to learn?”', [
    C('Muốn', 'Yes', 'Ông ấy dạy bạn bằng gậy gỗ mỗi sáng lúc năm giờ. Mỗi lần bạn ngã, ông ấy cười.', 'He trained you with a wooden stick every morning at five. Every time you fell, he laughed.', { health: 3, merit: 4 }, { npc: { role: 'mentor', bond: 50 }, flags: ['해결사동경'] }),
    C('Không cần', 'No need', 'Ông ấy nhún vai uống tiếp. "Rồi mày sẽ chết sớm thôi."', 'He shrugged and kept drinking. “You’ll die young, then.”', { sanity: -1 })
  ], I('Bạn bỏ đi trước khi ông nói hết câu.', 'You left before he finished his sentence.'), { once: true, tags: ['npc'] }),

  M('m_a_mentor_last', [20, 70], { npc: 'mentor' }, '{mentor} gọi bạn đến. Ông ấy đã già hơn nhiều, và có một Request mà ông không thể từ chối, cũng không thể sống sót.', '{mentor} called you over. Much older now, with a Request he could neither refuse nor survive.', [
    C('Đi cùng ông', 'Go with him', null, null, {}, { out: [
      O(45, 'Hai thầy trò sống sót trở về, máu me đầy người. Ông ấy trao cho bạn thanh kiếm của mình. "Giờ nó là của mày."', 'Master and student came back alive, soaked in blood. He handed you his sword. “It’s yours now.”', { health: -12, merit: 12, rep: 6 }, { bond: { mentor: 20 }, flags: ['유물'] }),
      O(55, '{mentor} chắn nhát cuối thay bạn. Ông chết với một nụ cười, như thể đã chờ ngày này rất lâu.', '{mentor} took the final blow for you. He died smiling, as if he’d waited a long time for this day.', { health: -8, sanity: -14, merit: 8 }, { npcFate: { mentor: 'dead' }, scar: 'Nhát kiếm {mentor} đỡ thay', flags: ['유물'] })
    ], motif: { loyalty: 1 } }),
    C('Từ chối', 'Refuse', '{mentor} gật đầu, như đã đoán trước. Tuần sau bạn nghe tin ông không trở về.', '{mentor} nodded, as if he’d expected it. The next week you heard he never came back.', { sanity: -8 }, { npcFate: { mentor: 'dead' } })
  ], I('Bạn chưa kịp trả lời thì ông đã đi.', 'Before you could answer, he had gone.', { sanity: -6 }, { npcFate: { mentor: 'missing' } }), { once: true, tags: ['npc'] }),

  M('m_a_sweeper_door', GROWN, { notNest: true }, '3 giờ 12 sáng. Có người đập cửa nhà bạn, van xin cho vào trốn.', '3:12 AM. Someone was pounding on your door, begging to be let in.', [
    C('Mở cửa', 'Open the door', null, null, {}, { out: [
      O(60, 'Bạn kéo người đó vào đúng lúc tiếng còi tắt. Đó là một cô gái trẻ. Cô ấy run cả đêm trong góc nhà bạn.', 'You pulled them in just as the siren died. It was a young woman. She shook all night in the corner of your room.', { sanity: -2, rep: 3 }, { motif: { mercy: 1 }, mem: 'sheltered_stranger' }),
      O(40, 'Bạn mở cửa chậm một giây. Thứ đứng ngoài không còn là người.', 'You opened the door one second too late. What stood outside was no longer a person.', { health: -15, sanity: -12 }, { scar: 'Cánh cửa mở lúc 3:13' })
    ] }),
    C('Giữ chặt cửa', 'Hold the door shut', 'Tiếng đập cửa ngừng lúc 3 giờ 13. Sáng ra bậc thềm sạch bong, sạch hơn bao giờ hết.', 'The pounding stopped at 3:13. In the morning the doorstep was spotless, cleaner than ever.', { sanity: -8 })
  ], I('Bạn đứng chết lặng sau cánh cửa.', 'You stood frozen behind the door.', { sanity: -8 }), { theme: '313', tags: ['danger'] }),

  M('m_sheltered_return', [20, 80], { mem: 'sheltered_stranger' }, 'Cô gái bạn cứu đêm 3 giờ 13 năm ấy giờ là thư ký của một Association. Cô ấy tìm đến cảm ơn.', 'The young woman you saved that 3:13 night is now a clerk at an Association. She came to thank you.', [
    C('Nhận lời cảm ơn', 'Accept her thanks', 'Cô ấy để lại số liên lạc. "Nếu cần gì ở Association, cứ gọi."', 'She left her number. “If you ever need anything from the Association, call.”', { network: 8, sanity: 3 }),
    C('Nhờ cô ấy một việc', 'Ask her a favor', 'Cô ấy giúp bạn có một Request ngon, không hỏi han gì.', 'She got you a lucrative Request, no questions asked.', { wealth: 6, network: 3 })
  ], I('Bạn bảo cô ấy nhầm người.', 'You told her she had the wrong person.'), { once: true, tags: ['callback'] }),

  M('m_a_organ_offer', GROWN, { stat: { wealth: [0, 15] } }, 'Một "bác sĩ" ở chợ đen trả 40 Ahn cho một quả thận khỏe.', 'A black-market “doctor” offered 40 Ahn for a healthy kidney.', [
    C('Bán', 'Sell', 'Ca mổ diễn ra trên một chiếc bàn bếp. Bạn tỉnh dậy với một vết khâu dài và một xấp tiền.', 'The operation took place on a kitchen table. You woke with a long row of stitches and a stack of cash.', { health: -18, wealth: 14 }, { scar: 'Vết khâu bên hông' }),
    C('Bỏ đi', 'Walk away', 'Gã nói với theo: "Rồi mày sẽ quay lại." Bạn hy vọng gã sai.', 'He called after you: “You’ll be back.” You hoped he was wrong.', { sanity: -1 })
  ], I('Bạn nói sẽ suy nghĩ.', 'You said you’d think about it.')),

  M('m_a_ring_gallery', [18, 60], {}, 'Một người lạ mời bạn đến "triển lãm nghệ thuật" của Ring. Vé vào cửa miễn phí.', 'A stranger invited you to a Ring “art exhibition.” Admission was free.', [
    C('Đi xem', 'Go and see', 'Những tác phẩm từng là người. Một bức còn đang thở. Bạn về nhà và nôn đến sáng.', 'The works had once been people. One of them was still breathing. You went home and vomited until dawn.', { sanity: -10, resonance: 6 }, { mem: 'saw_ring_art' }),
    C('Từ chối', 'Decline', 'Người lạ nghiêng đầu: "Tiếc thật, mặt bạn rất hợp với ánh sáng ở đó."', 'The stranger tilted their head: “Pity. Your face would suit the lighting there.”', { sanity: -2 })
  ], I('Bạn nhận tấm vé rồi vứt vào thùng rác.', 'You took the ticket and threw it in the bin.'), { theme: 'ring', tags: ['danger'] }),

  M('m_a_carmen_dream', [16, 80], { stat: { resonance: [35, 100] } }, 'Trong mơ, bạn ngồi dưới một tán cây đầy nắng. Một người phụ nữ hỏi: "Bạn có đang đau không?"', 'In a dream you sat beneath a sunlit tree. A woman asked: “Are you in pain?”', [
    C('"Có."', '“Yes.”', 'Bà ấy mỉm cười và chạm vào ngực bạn. Bạn thức dậy, khóc, và thấy nhẹ nhõm đến đáng sợ.', 'She smiled and touched your chest. You woke up crying, frighteningly at peace.', { sanity: 6, resonance: 10 }),
    C('"Không."', '“No.”', 'Bà ấy buồn bã nhìn bạn: "Nói dối." Bạn tỉnh dậy với tiếng piano còn văng vẳng.', 'She looked at you sadly: “Liar.” You woke with piano notes still ringing.', { sanity: -3, resonance: 4 })
  ], I('Bạn tỉnh dậy trước khi kịp trả lời.', 'You woke before you could answer.', { resonance: 3 }), { theme: 'carmen' }),

  // ============================================================ by trade
  M('m_fx_request_choice', GROWN, { jobs: ['Fixer'] }, 'Office có hai Request: tìm một đứa trẻ mất tích (5 Ahn) hoặc thu hồi một kiện hàng cho Thumb (25 Ahn).', 'The Office had two Requests: find a missing child (5 Ahn), or recover a package for the Thumb (25 Ahn).', [
    C('Tìm đứa trẻ', 'Find the child', null, null, { wealth: 2, merit: 4 }, { out: [
      O(50, 'Bạn tìm thấy nó còn sống trong một tầng hầm. Người mẹ ôm chân bạn, không chịu buông.', 'You found it alive in a basement. The mother clung to your legs and wouldn’t let go.', { sanity: 6, rep: 4 }),
      O(50, 'Bạn tìm thấy nó. Bạn không nói cho người mẹ biết đã tìm thấy ở đâu, trong tình trạng nào.', 'You found it. You didn’t tell the mother where, or in what condition.', { sanity: -8 })
    ], motif: { mercy: 1 } }),
    C('Làm cho Thumb', 'Work for the Thumb', 'Kiện hàng to bằng một người và thỉnh thoảng cựa quậy. Bạn không mở ra xem.', 'The package was the size of a person and occasionally squirmed. You didn’t open it.', { wealth: 8, merit: 6, sanity: -4, heat: 4 }, { motif: { greed: 1 }, mem: 'thumb_package' })
  ], I('Bạn để đồng nghiệp nhận cả hai.', 'You let your colleagues take both.', { merit: -2 })),

  M('m_fx_partner_meet', [18, 45], { jobs: ['Fixer'], noNpc: 'partner' }, 'Office ghép bạn với một Fixer mới vào nghề cho Request tuần này.', 'The Office paired you with a rookie Fixer for this week’s Request.', [
    C('Dạy họ cẩn thận', 'Teach them properly', 'Họ học nhanh và nói nhiều. Đến cuối tuần bạn đã quen với tiếng lải nhải bên cạnh.', 'They learned fast and talked a lot. By the end of the week you were used to the chatter beside you.', { merit: 3, sanity: 2 }, { npc: { role: 'partner', bond: 55 } }),
    C('Để họ tự xoay xở', 'Let them fend for themselves', 'Họ sống sót, và từ đó im lặng làm theo bạn như một cái bóng.', 'They survived, and from then on followed you silently like a shadow.', { merit: 4 }, { npc: { role: 'partner', bond: 35 } })
  ], I('Bạn xin làm một mình.', 'You asked to work alone.', { merit: 1 }), { once: true, tags: ['npc'] }),

  M('m_fx_partner_betray', [20, 60], { jobs: ['Fixer'], npc: 'partner', stat: { wealth: [20, 100] } }, '{partner} đề nghị ôm tiền thù lao của cả nhóm và bỏ trốn sang District khác.', '{partner} proposed running off to another District with the whole team’s fee.', [
    C('Đồng ý', 'Agree', null, null, { wealth: 12 }, { out: [
      O(50, 'Hai người sống sung túc một năm. Rồi Hana gạch tên cả hai khỏi danh sách Fixer.', 'You lived well for a year. Then Hana struck both your names from the Fixer registry.', { rep: -10, heat: 10 }, { bond: { partner: 12 }, motif: { greed: 1 } }),
      O(50, '{partner} biến mất cùng toàn bộ số tiền, kể cả phần của bạn.', '{partner} vanished with all of it, including your share.', { wealth: -12, sanity: -8 }, { npcFate: { partner: 'estranged' } })
    ] }),
    C('Báo lại Office', 'Report it to the Office', '{partner} bị đuổi. Ánh mắt cuối cùng nó nhìn bạn khiến bạn mất ngủ nhiều đêm.', '{partner} was expelled. The last look they gave you cost you many nights of sleep.', { rep: 5, merit: 4, sanity: -4 }, { npcFate: { partner: 'estranged' } }),
    C('Can ngăn {partner}', 'Talk {partner} out of it', '{partner} cười, bảo chỉ đùa thôi. Bạn không chắc.', '{partner} laughed and said it was a joke. You weren’t sure.', {}, { bond: { partner: 4 } })
  ], I('Bạn không trả lời. {partner} hiểu đó là lời từ chối.', 'You didn’t answer. {partner} took it as a no.', {}, { bond: { partner: -4 } }), { once: true, tags: ['npc'] }),

  M('m_syn_order', GROWN, { jobs: ['Syndicate'] }, 'Cấp trên giao bạn "xử lý" một đứa trẻ đã nhìn thấy mặt các bạn trong một phi vụ.', 'Your superior ordered you to “take care of” a child who saw your faces on a job.', [
    C('Làm theo lệnh', 'Follow the order', 'Bạn làm nhanh, để nó không kịp sợ. Đó là lòng tốt duy nhất bạn có thể cho.', 'You did it quickly, so it wouldn’t have time to be afraid. It was the only kindness you could give.', { sanity: -16, rep: 6, merit: 8 }, { scar: 'Đứa trẻ đã thấy mặt bạn', motif: { violence: 2 } }),
    C('Thả nó đi, báo đã xong', 'Let it go and report it done', null, null, {}, { out: [
      O(55, 'Không ai phát hiện. Bạn hy vọng nó đã đi thật xa.', 'No one found out. You hoped it had gone far away.', { sanity: 4 }, { motif: { mercy: 1 }, later: [{ id: 'm_syn_child_grown', years: 10, reasonVi: 'Đứa trẻ bạn tha mạng', reasonEn: 'The child you spared' }] }),
      O(45, 'Nó bị tìm thấy. Cấp trên chặt một ngón tay của bạn "để nhớ".', 'It was found. Your superior cut off one of your fingers “so you remember.”', { health: -10, sanity: -6, rep: -6 }, { scar: 'Ngón tay trả cho sự mềm lòng' })
    ] })
  ], I('Bạn trì hoãn. Một người khác làm thay, và báo lại rằng bạn đã chần chừ.', 'You stalled. Someone else did it, and reported your hesitation.', { rep: -4, sanity: -6 }), { tags: ['danger'] }),

  M('m_syn_child_grown', [25, 80], {}, 'Một Fixer trẻ chặn bạn ở hẻm. "Mười năm trước, chính bạn đã tha cho tôi. Tôi đến để trả ơn, hoặc để hiểu vì sao."', 'A young Fixer stopped you in an alley. “Ten years ago, you spared me. I came to repay that, or to understand why.”', [
    C('Kể sự thật', 'Tell the truth', 'Họ nghe hết, rồi để lại một con dao găm khắc tên mình. "Nếu gặp nguy, hãy gọi tôi."', 'They listened to the end, then left a dagger engraved with their name. “If you’re ever in danger, call me.”', { sanity: 6, network: 6 }, { npc: { role: 'partner', bond: 70 } }),
    C('Bảo họ nhầm người', 'Say they have the wrong person', 'Họ nhìn bạn lâu, rồi gật đầu. "Vậy chắc là tôi nhầm."', 'They looked at you a long time, then nodded. “Then I must be mistaken.”', { sanity: 1 })
  ], I('Bạn bước qua họ.', 'You walked past them.'), { once: true, tags: ['callback'] }),

  M('m_wing_report', GROWN, { jobs: ['Wing Employee'] }, 'Sếp nhờ bạn sửa một con số trong báo cáo tai nạn: "ba người chết" thành "ba người bị thương nhẹ".', 'Your boss asked you to change a number in an accident report: “three dead” to “three lightly injured.”', [
    C('Sửa', 'Change it', 'Báo cáo sạch sẽ. Đêm đó, trong mơ, những con số có khuôn mặt người.', 'The report came out clean. That night in your dreams, the numbers had faces.', { wealth: 3, network: 3, sanity: -5 }, { motif: { greed: 1 } }),
    C('Giữ nguyên', 'Leave it as it is', null, null, {}, { out: [
      O(40, 'Báo cáo được gửi lên. Nhà máy bị thanh tra. Có những người bạn không bao giờ biết tên đã được sống.', 'The report went up. The factory was inspected. People whose names you’ll never know got to live.', { rep: 5, sanity: 3, network: -3 }),
      O(60, 'Báo cáo bị trả về. Đánh giá quý sau của bạn ghi: "thiếu tinh thần hợp tác".', 'The report was rejected. Your next review read: “lacks a cooperative spirit.”', { wealth: -3, network: -4 })
    ] })
  ], I('Bạn chuyển việc đó cho đồng nghiệp.', 'You passed it on to a colleague.', { network: -1 })),

  M('m_ws_taboo_order', GROWN, { jobs: ['Workshop Craftsman'] }, 'Một khách hàng giấu mặt đặt làm một vũ khí vượt chuẩn của Tres, thứ The Head sẽ coi là Taboo. Giá gấp mười.', 'A masked client ordered a weapon beyond Tres standards, something The Head would call Taboo. Ten times the price.', [
    C('Nhận làm', 'Take the job', 'Bạn làm xong trong một tháng. Đó là tác phẩm đẹp nhất đời bạn, và bạn không được ký tên lên nó.', 'You finished it in a month. It was the finest work of your life, and you couldn’t sign it.', { wealth: 15, rep: 4, taboo: 1 }, { mem: 'taboo_weapon' }),
    C('Từ chối', 'Refuse', 'Khách hàng để lại danh thiếp. Trên đó chỉ có một dấu móng vuốt.', 'The client left a card. It bore only a claw mark.', { sanity: -2 })
  ], I('Bạn bảo sẽ cân nhắc. Khách không quay lại.', 'You said you’d consider it. The client never returned.'), { theme: 'taboo' })
];

export default LIFE_MINORS;
