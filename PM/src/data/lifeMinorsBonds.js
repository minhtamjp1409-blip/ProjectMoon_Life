// Small ways to keep a bond alive. Each one is a quiet moment with a person you already know, never a crisis,
// and none of them punishes you for letting it pass: neglect is already paid for by the yearly drift.
// `keepRole` lets the planner lean toward the person you have not seen in a while.
import { M, C, O, I, AGE } from './storyKit.js';

const KEEP = (role) => ({ w: 1.7, keepRole: role });

export const LIFE_MINORS_BONDS = [
  M('mk_friend_cold_noodles', AGE.GROWN, { npc: 'friend' },
    '[Bát mì trước cửa] Bạn về muộn sau một ngày dài. Trước cửa phòng có một bát mì úp dưới cái đĩa, hơi còn ấm. Không có giấy nhắn, chỉ có mùi hành quen thuộc của {friend}.',
    '[A bowl at the door] You come home late after a long day. At your door sits a bowl of noodles under a plate, still warm. No note, only the familiar smell of scallions that means {friend}.',
    [
      C('Ngồi ăn ngay trên bậc thang, đợi người ấy ra', 'Eat right there on the step and wait for them', 'Bạn ăn chậm. {friend} xuất hiện ở đầu cầu thang khi bát đã cạn một nửa, giả vờ đi ngang qua. Hai người không nói chuyện làm ăn nào.', 'You eat slowly. {friend} appears at the head of the stairs when the bowl is half gone, pretending to be passing. Neither of you mentions work.', { sanity: +2 }, { bond: { friend: 6 } }),
      C('Mang vào phòng, mai trả bát', 'Take it inside and return the bowl tomorrow', 'Bạn ăn một mình, và rửa bát cẩn thận hơn cần thiết. Hôm sau {friend} nhận lại cái bát, gật đầu một lần.', 'You eat alone, and wash the bowl more carefully than needed. The next day {friend} takes it back and nods once.', {}, { bond: { friend: 2 } })
    ],
    I('Bạn quá mệt và để bát mì nguội ngoài cửa. Sáng hôm sau cái bát đã được lấy đi, không để lại lời nào.', 'You are too tired and leave the noodles to go cold. By morning the bowl is gone, with no word left behind.', {})),

  M('mk_friend_old_block', AGE.GROWN, { npc: 'friend' },
    '[Dãy phố cũ] {friend} rủ bạn đi ngang dãy phố nơi hai người từng chạy chân đất. Nhiều cửa tiệm đã đổi chủ, nhưng cái cột đèn bị cong thì vẫn còn đó.',
    '[The old block] {friend} asks you to walk past the street where you two once ran barefoot. Many shops have changed owners, but the bent lamp post is still there.',
    [
      C('Đi bộ cùng, ghé từng góc', 'Walk it together, stopping at every corner', 'Hai người đứng rất lâu trước cột đèn. {friend} kể một chuyện bạn đã quên, và bạn cười ở chỗ họ mong bạn cười.', 'You stand a long time before the lamp post. {friend} tells a story you had forgotten, and you laugh where they hoped you would.', { sanity: +3 }, { bond: { friend: 7 } }),
      C('Đi xe điện cho nhanh, trả tiền cả hai', 'Take the tram to save time and pay for both', 'Chuyến đi ngắn và ồn. {friend} nhìn ra cửa sổ suốt đường, rồi nói cảm ơn khi xuống.', 'The ride is short and loud. {friend} looks out of the window the whole way, then says thanks on getting off.', { wealth: -1 }, { bond: { friend: 3 } })
    ],
    I('Bạn bảo để dịp khác. {friend} gật đầu, và hai người vẫn đang nói "dịp khác" như thế từ vài năm nay.', 'You say another time. {friend} nods, and you two have been saying “another time” for a few years now.', {})),

  M('mk_friend_torn_sleeve', AGE.GROWN, { npc: 'friend' },
    '[Tay áo rách] {friend} để ý tay áo bạn rách từ sau lần làm việc trước và không nói gì suốt bữa. Đến cuối bữa, họ rút kim chỉ từ túi ra, như thể luôn mang theo vì lý do này.',
    '[A torn sleeve] {friend} noticed your sleeve has been torn since your last job and said nothing all meal. At the end, they pull a needle and thread from their pocket, as if they always carried them for this reason.',
    [
      C('Để họ khâu giúp', 'Let them mend it', 'Họ khâu rất vụng, mũi chỉ to và lệch. Bạn mặc cái áo ấy thêm nhiều năm, và không ai đoán được vì sao bạn không chịu thay.', 'They sew badly, the stitches big and crooked. You wear that coat for years more, and no one guesses why you refuse to replace it.', { sanity: +2 }, { bond: { friend: 6 } }),
      C('Trả tiền thợ may ở góc phố', 'Pay the tailor at the corner instead', 'Thợ may làm gọn hơn nhiều. {friend} nhìn đường chỉ mới và cất kim chỉ lại, hơi tiếc.', 'The tailor does it far more neatly. {friend} looks at the new seam and puts the needle away, a little sorry.', { wealth: -1 }, { bond: { friend: 1 } })
    ],
    I('Bạn rút tay ra và nói không sao. {friend} cất kim chỉ lại, và tay áo vẫn rách thêm một mùa.', 'You pull your arm away and say it is fine. {friend} puts the needle away, and the sleeve stays torn another season.', {})),

  M('mk_friend_small_loan', AGE.GROWN, { npc: 'friend' },
    '[Một khoản nhỏ] {friend} gõ cửa, không vào, chỉ hỏi bạn có thể cho mượn một ít Ahn đến cuối tháng. Họ nói con số trước khi bạn kịp hỏi, và con số ấy nhỏ.',
    '[A small sum] {friend} knocks, does not come in, and only asks if you can lend a little Ahn until the end of the month. They name the figure before you ask, and it is small.',
    [
      C('Cho mượn, không hỏi thêm', 'Lend it without asking more', '{friend} cầm tiền bằng cả hai tay. Cuối tháng họ trả đủ, thêm một túi hạt dẻ rang mà bạn không đòi.', '{friend} takes the money with both hands. At month’s end they repay it in full, with a bag of roasted chestnuts you did not ask for.', { wealth: -3 }, { bond: { friend: 6 } }),
      C('Từ chối nhẹ nhàng, mời họ ăn tối', 'Decline gently and invite them to dinner', 'Họ hiểu, hoặc giả vờ hiểu. Bữa tối kéo dài lâu hơn dự tính, và họ không nhắc đến tiền nữa.', 'They understand, or pretend to. Dinner runs longer than planned, and they do not mention money again.', { wealth: -1 }, { bond: { friend: 2 } })
    ],
    I('Bạn nói bạn cũng đang khó. Điều đó không hẳn là nói dối. {friend} đi xuống cầu thang và không quay đầu lại.', 'You say you are short too. It is not entirely a lie. {friend} goes down the stairs without turning back.', {})),

  M('mk_partner_gear_check', AGE.GROWN, { npc: 'partner', jobs: ['Fixer', 'Syndicate'] },
    '[Kiểm đồ trước giờ đi] Trước một việc lớn, {partner} kéo đồ nghề của bạn ra bàn và kiểm từng món một, không hỏi ý bạn. Họ tìm ra một quai đeo sắp đứt mà bạn đã bỏ qua.',
    '[A gear check before going out] Before a big job, {partner} pulls your kit onto the table and checks every piece without asking. They find a strap about to snap that you had overlooked.',
    [
      C('Ngồi xuống, kiểm cùng nhau', 'Sit down and go through it together', 'Hai người làm trong im lặng, đổi dụng cụ qua lại mà không cần nói. Khi xong, bộ đồ của cả hai đều gọn hơn lúc bắt đầu.', 'You work in silence, passing tools back and forth without speaking. By the end both kits are tidier than when you started.', { health: +1, sanity: +2 }, { bond: { partner: 6 } }),
      C('Cảm ơn rồi tự làm tiếp', 'Thank them and carry on yourself', '{partner} lùi lại, nhưng ở lại ngồi đó đến khi bạn xong, như một người canh.', '{partner} steps back, but stays seated until you finish, like a watchman.', {}, { bond: { partner: 2 } })
    ],
    I('Bạn bảo mình tự lo được. {partner} nhún vai, nhưng khi bạn đi, quai đeo đã được thay.', 'You say you can handle it. {partner} shrugs, but by the time you leave the strap has been replaced.', {})),

  M('mk_partner_rooftop_tea', AGE.GROWN, { npc: 'partner' },
    '[Trà trên mái] Sau một đêm không ai chết, {partner} mang ấm trà lên mái nhà trọ và gõ vào thành ấm hai lần, tín hiệu cũ của hai người. Gió thổi hướng về phía các ống khói.',
    '[Tea on the roof] After a night in which no one died, {partner} carries a pot of tea up to the boarding house roof and taps the pot twice, your old signal. The wind blows toward the chimneys.',
    [
      C('Lên mái, ngồi cạnh nhau', 'Go up and sit beside them', 'Hai người nhìn ánh đèn của các District xa mà không nhắc tên chỗ nào. Trà đã nguội khi cả hai nhớ ra mình chưa uống.', 'You watch the lights of the far Districts without naming any of them. The tea is cold when you both remember you never drank it.', { sanity: +3 }, { bond: { partner: 6 } }),
      C('Gõ lại hai lần từ cửa sổ, nhưng ở trong', 'Tap back twice from the window, staying inside', '{partner} nhìn xuống, giơ ấm trà một cái rồi uống một mình. Có lẽ vậy cũng là đủ cho đêm nay.', '{partner} looks down, raises the pot once, then drinks alone. Perhaps that is enough for tonight.', {}, { bond: { partner: 2 } })
    ],
    I('Bạn ngủ quên trước khi nghe tín hiệu. Sáng ra, một ấm trà nguội nằm ngoài cửa sổ.', 'You fall asleep before hearing the signal. By morning a cold pot of tea sits outside the window.', {})),

  M('mk_partner_debrief', AGE.GROWN, { npc: 'partner', jobs: ['Fixer', 'Syndicate'] },
    '[Buổi kể lại] {partner} rót hai ly và hỏi bạn việc hôm qua thế nào. Bản báo cáo bạn nộp chỉ có hai trang. Họ biết đó không phải toàn bộ.',
    '[The retelling] {partner} pours two glasses and asks how yesterday’s job really went. The report you filed was two pages. They know that is not all of it.',
    [
      C('Kể cả phần bạn đã bỏ ra khỏi báo cáo', 'Tell them the part you left out of the report', null, null, {}, { out: [
        O(75, '{partner} nghe hết mà không ngắt lời. Khi bạn dừng, họ chỉ nói "ừ", và rót thêm. Bạn thấy nhẹ đi theo cách không giải thích được.', '{partner} listens to the end without cutting in. When you stop they only say “yes,” and pour more. You feel lighter in a way you cannot explain.', { sanity: +4 }, { bond: { partner: 7 } }),
        O(25, 'Họ im lặng quá lâu. Rồi nói rằng họ sẽ không làm cùng bạn một việc như thế nữa. Họ vẫn ở lại uống hết ly.', 'They stay silent too long. Then they say they will not do a job like that with you again. They still stay until the glass is empty.', { sanity: +1 }, { bond: { partner: 3 } })
      ] }),
      C('Chỉ nhắc lại báo cáo', 'Just repeat the report', 'Họ gật đầu, nâng ly, và không hỏi nữa. Bạn nhận ra họ vừa tha cho bạn.', 'They nod, raise the glass, and ask no more. You realize they have just let you off.', {}, { bond: { partner: 2 } })
    ],
    I('Bạn bảo mình mệt. {partner} cất chai, và không nhắc lại chuyện đó thêm lần nữa.', 'You say you are tired. {partner} puts the bottle away and does not raise it again.', {})),

  M('mk_spouse_late_dinner', AGE.GROWN, { npc: 'spouse' },
    '[Bữa tối để lại] Bạn về khi đèn bếp đã tắt. Trên bàn có phần cơm của bạn, đậy lồng bàn, và một cái ghế kéo sẵn ra. {spouse} ngủ ở phòng bên, cửa chỉ khép hờ.',
    '[The saved dinner] You come home when the kitchen lamp is already off. On the table sits your portion under a cover, and a chair pulled out. {spouse} sleeps in the next room, the door left ajar.',
    [
      C('Ăn xong, rửa bát, rồi vào ngồi cạnh giường', 'Eat, wash the dishes, then sit by the bed', '{spouse} mở mắt khi bạn ngồi xuống, không nói gì, chỉ đặt tay lên tay bạn. Cả hai ngủ lại trong yên lặng.', '{spouse} opens their eyes as you sit, says nothing, and only lays a hand on yours. You both fall back asleep in the quiet.', { sanity: +4 }, { bond: { spouse: 6 } }),
      C('Ăn nhanh rồi đi ngủ, để mai nói', 'Eat quickly and sleep, saving talk for tomorrow', 'Sáng hôm sau cả hai đều dậy trễ, và nói những điều cần nói bên bếp lửa. Không muộn như bạn sợ.', 'The next morning you both wake late and say what needed saying by the stove. Not as late as you feared.', { sanity: +1 }, { bond: { spouse: 2 } })
    ],
    I('Bạn ngủ gục trên ghế bếp. Sáng ra, ai đó đã đắp cho bạn một cái chăn.', 'You fall asleep in the kitchen chair. By morning someone has laid a blanket over you.', {})),

  M('mk_spouse_coat_pocket', AGE.GROWN, { npc: 'spouse' },
    '[Trong túi áo khoác] Bạn tìm thấy một mẩu giấy trong túi áo khoác, nét chữ của {spouse}: một danh sách mua đồ ngắn, cuối cùng ghi thêm "nhớ về ăn cơm". Giấy đã ở đó không biết từ bao lâu.',
    '[In the coat pocket] You find a slip in your coat pocket in {spouse}’s handwriting: a short shopping list with “remember to come home for dinner” at the bottom. It has been there no one knows how long.',
    [
      C('Mua đủ thứ trong danh sách và về sớm', 'Buy everything on the list and come home early', '{spouse} mở cửa, nhìn túi đồ, rồi nhìn bạn, và bật cười vì lý do không ai nói ra. Bữa tối hôm đó ồn ào.', '{spouse} opens the door, looks at the bag, then at you, and laughs for a reason neither of you states. Dinner that night is loud.', { wealth: -1, sanity: +4 }, { bond: { spouse: 6 } }),
      C('Giữ mẩu giấy, bỏ vào ví', 'Keep the slip and tuck it in your wallet', 'Bạn không nhắc đến nó. Nhưng nhiều tháng sau {spouse} thấy mẩu giấy trong ví bạn, và không nói gì, chỉ đặt thêm một mẩu mới.', 'You never mention it. But months later {spouse} sees the slip in your wallet and says nothing, only adds a new one.', {}, { bond: { spouse: 3 } })
    ],
    I('Bạn vo mẩu giấy lại và quên nó. Tối đó bạn về đúng giờ vì một lý do khác, và không ai biết.', 'You crumple the slip and forget it. That night you come home on time for another reason, and no one knows.', {})),

  M('mk_mentor_visit', AGE.GROWN, { npc: 'mentor' },
    '[Ghé thăm người dạy] Đã lâu bạn không đến chỗ {mentor}. Căn nhà vẫn mùi dầu máy và trà đậm. Người ấy không hỏi vì sao bạn lâu không tới, chỉ hỏi bạn đã nghe lời dặn cuối cùng của họ chưa.',
    '[Visiting your teacher] It has been a while since you went to {mentor}’s place. The house still smells of machine oil and strong tea. They do not ask why you stayed away, only whether you kept their last piece of advice.',
    [
      C('Nói thật rằng bạn đã không làm theo', 'Admit honestly that you did not', '{mentor} cười như thể đã biết trước. Hai người ngồi đến tối, và họ chỉ lại đúng chỗ bạn sai, nhẹ nhàng như đang chỉ đường.', '{mentor} smiles as if they knew. You sit until evening, and they point out exactly where you went wrong, as gently as giving directions.', { sanity: +3, rep: +1 }, { bond: { mentor: 7 } }),
      C('Nói bạn đã làm theo, dù không hẳn', 'Say you did, though not quite', '{mentor} gật đầu và rót thêm trà, nhưng bạn thấy họ nhìn sang chỗ khác một khoảnh khắc trước khi cười.', '{mentor} nods and pours more tea, but you see them look away for a moment before smiling.', {}, { bond: { mentor: 2 } })
    ],
    I('Bạn đứng ở cửa lâu hơn cần thiết, rồi quay về. Lần sau bạn sẽ vào, bạn tự nhủ.', 'You stand at the door longer than necessary, then turn back. Next time you will go in, you tell yourself.', {})),

  M('mk_friend_far_letter', AGE.GROWN, { npc: 'friend' },
    '[Thư từ xa] Một lá thư của {friend} đến, nét chữ nghiêng. Không có chuyện gì to tát: chỉ là giá cá ở chợ mới, một đứa trẻ mới lớn nhanh, và câu cuối hỏi bạn còn nhớ mùi bánh hẻm Tám không.',
    '[A letter from far] A letter from {friend} arrives in slanted handwriting. Nothing grand: only the price of fish at the new market, a child who has grown fast, and a closing line asking if you still remember the smell of the buns from Alley Eight.',
    [
      C('Viết thư trả lời ngay trong đêm', 'Write back that very night', 'Bạn viết ba trang, gạch bớt nửa số câu, và gửi đi sáng hôm sau. Hồi âm đến sớm hơn bạn nghĩ, chỉ có một dòng: "Nhớ chứ."', 'You write three pages, strike half the sentences, and post it the next morning. The reply comes sooner than you expect, only one line: “Of course I remember.”', { sanity: +3 }, { bond: { friend: 6 } }),
      C('Gửi lại mấy đồng kèm lời hỏi thăm', 'Send back a few coins with a word of greeting', 'Họ nhận tiền và gửi lại một gói hạt giống nhỏ. Có lẽ đây là cách hai người nói chuyện bây giờ.', 'They accept the coins and send back a small packet of seeds. Perhaps this is how the two of you talk now.', { wealth: -1 }, { bond: { friend: 3 } })
    ],
    I('Bạn để lá thư trong ngăn kéo. Mỗi lần mở ngăn, bạn thấy nó, và đóng lại.', 'You leave the letter in a drawer. Every time you open the drawer you see it, and close it again.', {})),

  M('mk_mentee_failed_try', AGE.GROWN, { npc: 'mentee' },
    '[Bản nháp hỏng] Người trẻ bạn đang dìu dắt mang đến một bản kế hoạch cho Request đầu tiên của riêng họ. Kế hoạch có ba chỗ sai nghiêm trọng, và họ tự hào về nó như một đứa trẻ cầm bài kiểm tra.',
    '[A flawed draft] The junior you are training brings a plan for their first Request of their own. It has three serious errors, and they are as proud of it as a child holding a test.',
    [
      C('Chỉ ra từng chỗ sai, rồi hỏi họ muốn sửa thế nào', 'Point out each flaw, then ask how they would fix it', 'Họ cau mày rất lâu, rồi tự tìm ra hai trong ba chỗ trước khi bạn kịp nói. Chỗ thứ ba, họ nói họ sẽ nghĩ thêm. Bạn tin họ.', 'They frown a long while, then find two of the three before you say them. The third, they say they will think about. You believe them.', { sanity: +2 }, { bond: { mentee: 7 } }),
      C('Sửa hộ họ cho nhanh', 'Fix it for them to save time', 'Kế hoạch chạy trơn tru lần này. Người trẻ cảm ơn, nhưng lúc cất giấy, họ nhìn nó như một thứ không còn là của mình.', 'The plan runs smoothly this time. The junior thanks you, but as they put the paper away they look at it as something no longer theirs.', {}, { bond: { mentee: 1 } })
    ],
    I('Bạn bảo họ để đó. Tờ kế hoạch nằm trên bàn bạn đến cuối tuần, rồi biến mất.', 'You tell them to leave it. The plan lies on your desk until the end of the week, then disappears.', {}))
].map((m) => ({ ...m, ...KEEP(m.need.npc) }));
