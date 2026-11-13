// The Thumb: rank, etiquette, bullets and tribute. A Soldato is judged by what comes back to the
// ledger, a Capo by what stays quiet, an Underboss by what no one dares ask. The missions below are
// the work of that hierarchy; every one of them can be done correctly and still cost something.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

const T = 'Thumb';

export const THUMB_EVENTS = [
  // ------------------------------------------------------------------ missions
  fe('thumb_market_tribute', T, [0, 1],
    '[Cống nạp ở chợ cá] Capo giao bạn thu khoản cống nạp tháng ở chợ cá District 12. Mười hai sạp thì mười một phong bì đã chuẩn bị sẵn. Sạp thứ mười hai thuộc về góa phụ nuôi hai đứa cháu; bà đặt lên quầy nắm tiền lẻ kèm mảnh giấy kê những khoản đã đóng cho Wing.',
    '[Tribute at the fish market] Your Capo sends you to collect the monthly tribute at the District 12 fish market. Twelve stalls, eleven envelopes already waiting. The twelfth belongs to a widow with two grandchildren, and she sets a handful of small change on the counter with a slip listing what she has already paid the Wing.',
    [
      fc('Thu đủ, không bớt một xu', 'Take the full amount, not a coin short',
        'Bạn đếm đủ từng đồng lẻ rồi ghi vào sổ. Bà chẳng nói nửa lời, nhưng hai đứa nhỏ sau quầy dõi theo cho tới khi bạn khuất bóng. Capo gật đầu lúc nhận phong bì cuối cùng.',
        'You count every small coin and enter it in the ledger. She says nothing, but the two grandchildren behind the counter watch you until you are out of sight. Your Capo nods as he takes the last envelope.',
        { wealth: 8, rep: 5, sanity: -6, network: -3 }, { meritAdd: 3 }),
      fc('Báo thiếu, tự bù phần còn lại', 'Report a shortfall and cover the rest yourself',
        'Bạn bảo Capo sạp này chưa kịp mở hàng. Phần tiền hụt bạn tự bỏ tiền túi bù vào nên không ai nhắc lại nữa. Lần sau ghé qua, bà góa gói tặng bạn con cá khô bọc giấy báo.',
        'You tell your Capo that stall had not sold yet. You make up the missing amount from your own pocket, and nobody mentions it again. Next time the widow leaves you a dried fish wrapped in newspaper.',
        { wealth: -9, network: 5, sanity: 3 }),
      fg('Cho bà nợ đến tháng sau, ghi tên bạn bảo đảm', 'Let her owe until next month, putting your name as guarantee', [
        [60, 'Tháng sau bà trả đủ, còn kẹp thêm phong bì nhỏ biếu riêng bạn. Capo ghi nhận bạn biết cách giữ mối thu lâu dài.', 'Next month she pays in full and adds a small envelope for you alone. Your Capo notes that you know how to keep payers.', { rep: 6, wealth: 5, network: 4 }],
        [40, 'Sang tháng sau bà vẫn trắng tay. Capo trừ thẳng khoản thiếu vào phần chia của bạn; sạp cá đổi chủ trước khi hết quý.', 'She has no money the next month. Your Capo deducts the shortfall from your share, and the fish stall changes hands before the quarter ends.', { wealth: -14, rep: -4, sanity: -5 }]
      ])
    ], { weight: 10 }),

  fe('thumb_ammo_count', T, [0, 1],
    '[Ba hộp đạn thiếu] Kho đạn của The Thumb báo hụt ba hộp sau kỳ kiểm sổ. Sổ lưu tên ba Soldato từng ký nhận nên Capo đòi phải có một cái tên trước khi Sottocapo xuống tới nơi. Một trong ba người là bạn cũ từng chia điếu thuốc với bạn hồi mới nhập hội.',
    '[Three missing crates] The Thumb’s ammunition store reports three crates missing after the ledger check. The book carries three Soldato names who signed for them, and your Capo wants one name before the Sottocapo arrives. One of the three is the person who shared cigarettes with you from your first week in.',
    [
      fc('Điều tra tới cùng, bất kể là ai', 'Investigate to the end, whoever it is',
        'Bạn lần theo số lô, tìm ra hộp thứ nhất ở lò rèn, hộp thứ hai nơi tay người mua, còn hộp thứ ba vẫn nằm ngay trong kho nhưng xếp nhầm kệ. Hóa ra một nửa sự việc chỉ do thư ký ghi nhầm, nửa kia thì không.',
        'You trace the lot numbers and find the first crate at a smithy, the second with a buyer, the third still in the store, shelved wrong. Half of this turns out to be a clerk’s mistake. The other half is not.',
        { rep: 8, sanity: -4, network: -2 }, { meritAdd: 4 }),
      fg('Chỉ vào một kẻ mới nhập hội để chắn tiếng', 'Name a recent recruit to take the blame', [
        [65, 'Capo hài lòng với cái tên ấy chẳng hỏi thêm. Gã tân binh biến mất khỏi danh sách sau ba ngày. Từ đó bạn tránh đi qua chỗ hắn từng đứng.', 'Your Capo is satisfied with the name and asks nothing more. The recruit vanishes from the roll within three days. You avoid walking past where they used to stand.', { rep: 3, sanity: -10, network: -4 }, { flagsAdd: ['thumb_framed_recruit'] }],
        [35, 'Tên tân binh có chứng cứ ngoại phạm rõ ràng, mà Sottocapo cực ghét bị dắt mũi. Bạn bị gọi lên chất vấn suốt cả buổi tối.', 'The recruit has an alibi, and the Sottocapo hates being misled. You are called up to explain yourself for a whole evening.', { rep: -8, sanity: -7, heat: 4 }]
      ]),
      fc('Tự nhận mình ký nhầm', 'Claim you signed wrongly yourself',
        'Bạn nhận chữ ký dòng thứ ba là của mình, bảo chẳng nhớ đã lĩnh hộp nào. Capo nhìn bạn hồi lâu rồi ghi mức phạt nhẹ, gạch tên cả ba người kia khỏi danh sách nghi vấn.',
        'You say the third signature is yours and you do not remember receiving anything. Your Capo looks at you for a long time, then writes a small fine and strikes the other three names from the suspect list.',
        { wealth: -10, rep: 2, network: 6, sanity: 2 })
    ]),

  fe('thumb_wedding_guard', T, [0, 2],
    '[Tiệc cưới của Capo] Con gái Capo xuất giá tại nhà hàng bao trọn một tầng. Lệ The Thumb cấm nổ súng trong đám cưới nên mọi Soldato phải gửi vũ khí ngoài sảnh. Riêng bạn nhận mật lệnh đứng gác hành lang kèm khẩu súng giấu dưới vạt áo vì có tin vị khách nọ mang theo thứ chẳng phải quà mừng.',
    '[The Capo’s daughter’s wedding] The Capo’s daughter marries in a restaurant that has rented a whole floor. Thumb etiquette says no gunfire at a wedding, and every Soldato must leave weapons at the door. You are given the opposite task: stand in the corridor with a pistol under your coat, because word has it one guest is bringing something other than a gift.',
    [
      fg('Chặn người khách ở thang máy', 'Stop the guest at the lift', [
        [60, 'Bạn lịch sự mời vị khách rẽ sang góc khuất rồi thu gọn khẩu súng ngắn giấu trong túi quà. Cả đại sảnh chẳng ai hay biết. Capo biết chuyện ngay tối đó nhưng chỉ nâng ly hướng về bạn từ xa.', 'You invite the guest aside and find a small pistol in the gift bag. Nobody in the hall hears a thing. The Capo learns of it that night but only raises a glass to you from across the room.', { rep: 10, network: 5, health: -2 }],
        [40, 'Vị khách rút súng nhanh trước khi bạn kịp mở lời. Tiếng nổ vang lên khiến cả sảnh câm bặt, nghi thức The Thumb tan vỡ ngay giữa tuần rượu chúc mừng.', 'The guest draws before you can speak. The shot silences the whole hall, and Thumb etiquette is broken in the middle of a toast.', { health: -16, rep: -3, heat: 8 }]
      ]),
      fc('Báo Capo để ông tự xử trí', 'Tell the Capo and let him handle it',
        'Capo nghe xong vẫn mỉm cười tươi tắn, mời thẳng vị khách tới ngồi bàn chính. Suốt tiệc bạn đứng dựa khung cửa sổ, mắt không rời hai bàn tay người ấy.',
        'The Capo listens, keeps smiling, and invites the guest to the head table. All through the feast you stand by the window and never take your eyes off the person’s hands.',
        { sanity: -4, rep: 4, network: 3 }),
      fc('Nhường việc này cho Soldato khác', 'Hand the task to another Soldato',
        'Bạn báo lại cho người đồng cấp rồi quay về bàn tiệc. Cả hai chẳng ai nhắc chuyện đó nữa, nhưng sáng hôm sau tên người ấy được xướng lên trong buổi họp ở vị trí cao hơn bạn.',
        'You pass the word to a peer and return to the feast. Neither of you mentions it again, but the next morning their name is raised in the meeting in a better place than yours.',
        { sanity: 2, rep: -4 })
    ]),

  fe('thumb_funeral_salute', T, [0, 3],
    '[Loạt súng tiễn đưa] Một Sottocapo ngã xuống trong trận đụng độ với băng Backstreets. Nghi thức The Thumb đòi bắn mười hai phát súng tiễn đưa ngay ngoài mộ phần đúng cùng một nhịp. Bạn đứng cuối hàng, vị trí dễ lộ nhất nếu lỡ trật nhịp.',
    '[The salute] A Sottocapo has fallen in a gunfight with a Backstreets crew. Thumb etiquette demands twelve rounds skyward at the burial, fired on a single beat. You are picked to stand at the end of the line, where a missed beat shows most.',
    [
      fc('Bắn đúng nhịp, giữ mắt nhìn thẳng', 'Fire on the beat and keep your eyes straight',
        'Mười hai phát đạn vang lên gọn như một tiếng nổ duy nhất. Khói súng tan dần, ba vị Capo lần lượt liếc nhìn bạn rồi quay đi. Lễ an táng khép lại đúng giờ.',
        'Twelve shots sound as one. When the smoke clears, three Capo glance at you in turn and none look long. The burial ends on time.',
        { rep: 7, sanity: -3, network: 3 }),
      fg('Chĩa họng súng xuống để hỏi người đứng gần hàng', 'Lower your barrel to question the man at the rail', [
        [50, 'Kẻ đó chính là người bán đứng vị trí vị Sottocapo. Hắn chẳng ngờ có người phát hiện; mặt hắn tái mét trước khi phát súng thứ mười hai kịp nổ.', 'He is the one who sold the Sottocapo’s position. He never expected anyone to notice, and you watch him go pale before the twelfth round goes off.', { rep: 6, sanity: -5, heat: 6 }, { flagsAdd: ['thumb_funeral_informer'] }],
        [50, 'Bạn nhận nhầm người. Buổi lễ bị khựng mất một nhịp khiến Capo bắt bạn phải tạ lỗi trước toàn thể hàng ngũ.', 'You have the wrong man. The ceremony stalls for a beat, and the Capo demands an apology before the whole line.', { rep: -9, sanity: -6 }]
      ]),
      fc('Nhờ đổi chỗ với người đứng giữa', 'Ask to swap places with the man in the middle',
        'Người đứng giữa gật đầu nhận lời không hỏi han. Bạn vào thế chỗ rồi bắn rất chuẩn, nhưng suốt buổi lễ bạn thừa biết mình vừa để lộ thứ không muốn cho ai thấy.',
        'The man in the middle accepts without a word. You stand in his place and shoot well, but all through the ceremony you know you have just shown something you did not want shown.',
        { sanity: -2, rep: -2 })
    ]),

  fe('thumb_bridge_swap', T, [1, 3],
    '[Đổi con tin trên cầu] Middle giữ một Soldato của The Thumb còn Thumb giữ một người bên Middle. Hai phe hẹn trao đổi trên cây cầu rìa District 12 lúc bình minh, mỗi bên cử ba người tay không. Bạn có chân trong nhóm ba người ấy, biết tỏng Underboss thực chất chỉ cần đón đúng một người về.',
    '[Hostage swap on the bridge] A Thumb Soldato is held by the Middle, and a Middle member by the Thumb. Both sides agree to exchange on a bridge at the edge of District 12 at dawn, each bringing three unarmed people. You are one of the three, and you know the Underboss only wants one of them back.',
    [
      fc('Làm đúng thỏa thuận, đưa cả hai bên về', 'Honor the deal and bring everyone back',
        'Hai hàng người lướt qua nhau không ngoái lại. Mặt cầu hẹp chỉ vừa hai người tránh vai; suốt mười bước bạn nghe rõ tiếng thở người đối diện. Underboss chẳng vui vẻ gì nhưng không có cớ trách.',
        'The two lines pass each other without looking back. The bridge is barely two shoulders wide, and you hear the breathing of the person opposite for ten steps. The Underboss is not pleased, but has nothing to blame you for.',
        { rep: 6, network: 6, sanity: -3 }),
      fg('Lén đổi chỗ để người Underboss cần được thoát trước', 'Quietly reorder the line so the one the Underboss wants goes first', [
        [55, 'Người quan trọng bước qua cầu an toàn trước khi Middle kịp nhận ra. Underboss nhớ bạn biết đọc ý ông, còn Middle vội ghi tên bạn sang một cuốn sổ khác.', 'The one who matters crosses before the Middle notices. The Underboss remembers you as someone who reads his mind, and the Middle write your name somewhere else.', { rep: 9, network: 3, heat: 6 }, { flagsAdd: ['thumb_middle_grudge'] }],
        [45, 'Middle nhận ra ngay lập tức rồi khóa chặt hai đầu cầu. Súng hai bên chĩa thẳng vào nhau suốt mười phút ngay chỗ bạn đang đứng giữa.', 'The Middle notice at once and close the bridge. Both ends point guns at each other for ten minutes, and you are standing in the middle.', { health: -10, sanity: -8, rep: -4 }]
      ]),
      fc('Từ chối đi, nói bạn không đủ cấp để làm đại diện', 'Refuse to go, saying you do not rank enough to represent them',
        'Underboss chọn người khác thay thế không chút chần chừ. Bạn đứng nhìn từ xa thấy cuộc trao đổi diễn ra êm xuôi, khiến lời từ chối lúc nãy nghe hệt một nỗi hèn nhát.',
        'The Underboss finds someone else without a pause. You watch from a distance as the whole bridge goes smoothly, making your refusal sound like fear.',
        { rep: -6, sanity: 2 })
    ], { age: [24, 90] }),

  fe('thumb_bar_protection', T, [0, 2],
    '[Quán bar không chịu nộp] Ông chủ quán bar khu District 8 cự tuyệt nộp tiền bảo kê vì trót đóng cho băng khác rồi. Cô ca sĩ hát trên bục là con gái ông; suốt tối cô đứng sau quầy dõi mắt nhìn bạn không rời. Capo đòi câu trả lời dứt khoát trước thứ Sáu.',
    '[The bar that will not pay] The owner of a District 8 bar refuses protection money, having already paid another crew. The girl who sings there is his daughter, and she has watched you from behind the bar all evening. Your Capo needs an answer by Friday.',
    [
      fg('Đập vỡ vài chai và nói rõ luật', 'Smash a few bottles and spell out the rule', [
        [60, 'Ông chủ móc tiền đóng đủ tháng đầu bằng bàn tay run rẩy. Lần sau bạn bước vào quán, chẳng ai sau quầy dám nhìn thẳng mặt bạn.', 'The owner pays the first month in full with his hands still shaking. The next time you walk in, nobody at the bar looks straight at you.', { wealth: 10, rep: 5, sanity: -6, heat: 5 }],
        [40, 'Băng kia đánh hơi được tin nên kéo tới trước người nhà Capo hai ngày. Bạn ăn đòn sứt đầu mẻ trán ngay con hẻm sau quán mà ông chủ vẫn không chịu nộp.', 'The other crew hears and arrives two days before the Capo’s men. You are hurt in the alley behind the bar, and the owner still does not pay.', { health: -16, rep: -5, heat: 8 }]
      ]),
      fc('Thương lượng, đề nghị chia đôi với băng kia', 'Negotiate and offer a split with the other crew',
        'Bạn thức trắng đêm bàn bạc cùng ba gã đàn ông trong căn phòng kín bưng không cửa sổ. Sáng ra bạn cầm về tờ giao ước chia đôi cùng một cái tên mới để vào sổ.',
        'You spend the night talking to three men in a windowless room. In the morning you leave with a split agreement and a new name to enter in the ledger.',
        { wealth: 5, network: 8, rep: 4, sanity: -3 }, { meritAdd: 3 }),
      fc('Báo Capo rằng quán đã có người bảo kê', 'Tell the Capo the bar is already covered',
        'Capo ghi chú ngắn gọn không bình phẩm. Hai tuần sau tốp khác của The Thumb tới nhận phần việc này mà không hề hỏi lại bạn nửa lời.',
        'The Capo writes it down without comment. Two weeks later another team from the Thumb takes the job and asks you nothing.',
        { sanity: 3, rep: -3 })
    ]),

  fe('thumb_rat_recruit', T, [1, 3],
    '[Tuyển người từ đám Rat] The Thumb cần bổ sung Soldato nên Capo bảo bạn lọc lấy người trong đám Rat mới tóm từ vụ cướp kho. Ba kẻ, một khẩu súng, một khoảng sân. Luật cũ đặt ra: ai cầm súng lên mà tay không run thì được nhận. Một đứa trong ba người còn chưa tới tuổi.',
    '[Recruiting from the Rats] The Thumb needs more Soldato, and your Capo has you choose from a group of Rats caught in a warehouse raid. Three people, one gun, one courtyard. The old rite: whoever stays steady on receiving the gun may join. One of the three is not yet of age.',
    [
      fc('Làm đúng nghi thức, không ngoại lệ', 'Follow the rite exactly, no exceptions',
        'Hai kẻ đứng vững chãi. Đứa nhỏ tuổi nhất đánh rơi khẩu súng rồi bật khóc; Capo bảo chuyện này đành chờ thêm hai năm nữa. Bạn thoáng thấy trong mắt nó nét gì đó mà bạn không nỡ gọi là nhẹ nhõm.',
        'Two stay steady. The youngest drops the gun and weeps, and the Capo says that can wait two more years. You see something in the child’s eyes that you do not want to call relief.',
        { rep: 6, sanity: -5, network: 4 }),
      fg('Đứng ra bảo lãnh đứa nhỏ, xin cho học việc', 'Vouch for the youngster and ask that they train first', [
        [60, 'Capo gật đầu với điều kiện bạn đứng ra bảo lãnh. Đứa nhỏ lẽo đẽo theo bạn học cách ghi sổ cùng cách đứng gác cửa; từ dạo ấy bạn tự nhiên ít nói hẳn đi mỗi lần có nó bên cạnh.', 'The Capo allows it on condition you answer for them. The child follows you to learn bookkeeping and how to stand at a door, and you notice you talk less whenever they are there.', { network: 6, sanity: 4, wealth: -4 }, { flagsAdd: ['thumb_took_ward'] }],
        [40, 'Capo bác phăng đề nghị rồi phê thẳng vào sổ rằng bạn yếu lòng. Đứa nhỏ bị tống sang chỗ khác chẳng rõ tung tích.', 'The Capo rejects the request and writes in the ledger that you are soft. The child is sent somewhere else, and you do not know where.', { rep: -7, sanity: -6 }]
      ]),
      fc('Chọn người đứng vững nhất, bỏ qua hai người kia', 'Choose the steadiest and ignore the other two',
        'Kẻ được chọn đón khẩu súng như nhận lại món đồ vốn thuộc về mình. Hai kẻ còn lại bị giải về trại giam; bạn không hỏi tiếp họ bị đưa đi đâu.',
        'The chosen one takes the gun as if taking back something that was theirs. The other two are returned to holding, and you do not ask where they go next.',
        { rep: 4, sanity: -6 })
    ], { age: [24, 90] }),

  fe('thumb_nest_debt', T, [0, 3],
    '[Món nợ ở Nest] Tên nhân viên Wing sống trong Nest mắc nợ The Thumb từ sới bạc hai năm trước, gán cả hợp đồng lao động làm tin. Nếu Thumb xiết nợ, Wing sẽ lộ chuyện người nhà đánh bạc với băng đảng khiến hắn bay luôn chỗ ở. Capo đẩy việc này cho bạn giải quyết.',
    '[Debt in the Nest] A Nest resident who works for a Wing owes the Thumb from a card game two years ago. He has pledged his work contract to pay. If the Thumb collects, the Wing will learn its employee gambles with gangs, and he may lose his housing. Your Capo tells you to deal with it.',
    [
      fc('Đòi nợ đúng hạn, báo luôn với Wing', 'Collect on time and tell the Wing as well',
        'Wing cắt hợp đồng của hắn ngay trong tuần để Thumb trừ nợ từ tiền thanh lý. Capo khen bạn làm ăn dứt khoát. Nghe đâu hắn cuốn gói khỏi Nest vào một buổi sáng mưa.',
        'The Wing cuts his contract within a week, and the Thumb receives the debt from the liquidation. Your Capo notes you work cleanly. You hear he moved out of the Nest on a rainy morning.',
        { wealth: 12, rep: 5, sanity: -7, heat: 3 }),
      fg('Đề nghị hắn làm tai mắt cho Thumb trong Wing để trừ nợ', 'Offer to cancel the debt if he becomes the Thumb’s eyes in the Wing', [
        [60, 'Hắn gật đầu đồng ý. Tháng sau bạn cầm trên tay bản sao lịch vận chuyển của Wing; Capo bắt đầu gọi thẳng tên bạn thay vì gọi theo cấp bậc.', 'He accepts. The next month you hold a copy of the Wing’s shipping schedule, and your Capo starts calling you by name instead of rank.', { network: 9, rep: 6, wealth: 4, heat: 4 }, { flagsAdd: ['thumb_wing_informant'] }],
        [40, 'Hắn quay lưng báo thẳng cho Wing ngay trong đêm. Sáng hôm sau một Feather tìm tận cửa nhà bạn cùng hai Fixer đứng kèm.', 'He reports back to the Wing that same night. A Feather comes to find you the next morning, with two Fixers standing outside the door.', { rep: -6, heat: 12, health: -8 }]
      ]),
      fc('Xóa nợ trong sổ, tự gánh lên mình', 'Wipe the debt in the ledger and shoulder it yourself',
        'Bạn cố tình điền sai ngày tháng trong sổ rồi tự trích phần lương bù dần từng tháng. Người dân Nest ấy chẳng bao giờ hay biết, nhưng thi thoảng đụng mặt ngoài chợ ông ta lại cúi chào bạn mà chẳng rõ lý do.',
        'You enter a line with a wrong date and pay it off monthly from your own share. The Nest resident never learns, but sometimes you see him at the market and he bows to you, unsure why.',
        { wealth: -12, sanity: 4, network: 3 })
    ]),

  fe('thumb_shooting_range', T, [1, 3],
    '[Trường bắn lúc nửa đêm] Hai Capo tranh nhau khoảng địa bàn nên Sottocapo cho phép phân định theo luật cũ: mỗi bên cử đại diện so tài ở trường bắn tầng hầm của The Thumb. Capo nhà bạn chọn đích danh bạn, bảo đó là vinh dự. Đối thủ là tay Soldato khét tiếng bách phát bách trúng.',
    '[Range at midnight] Two Capo quarrel over a turf, and the Sottocapo permits them to settle it the old way: each picks a representative, to shoot it out at the Thumb’s cellar range. Your Capo picks you and calls it an honor. The opponent is a Soldato famed for never missing.',
    [
      fg('Nhận lời và bắn thật', 'Accept and shoot for real', [
        [45, 'Bạn thắng sát nút với một phát cách tâm bia chưa đầy đốt ngón tay. Địa bàn về tay Capo của bạn; tiếng tăm bạn vang xa quá một mùa.', 'You win by a hair, one round less than a fingertip from the center ring. The turf goes to your Capo, and your name travels farther than a season.', { rep: 12, wealth: 8, network: 4 }],
        [55, 'Đối thủ siết cò nhanh hơn một nhịp lại chuẩn hơn nửa vòng. Capo của bạn mất đất; ông nhìn chằm chằm vào bạn hồi lâu chẳng thốt nửa lời.', 'The opponent shoots one beat faster and half a ring cleaner. Your Capo loses the turf and looks at you for a long time without saying a word.', { rep: -8, sanity: -5 }]
      ]),
      fc('Đề nghị chia địa bàn thay vì đấu', 'Propose dividing the turf instead of shooting',
        'Cả hai Capo sững người tới nỗi quên phản đối ngay. Sottocapo nhấp ngụm trà rồi gật gù khen đó là lối nghĩ của kẻ nhìn xa. Khoảng địa bàn chia đôi không đều nhưng chẳng ai phải nằm xuống.',
        'Both Capo are so surprised that they do not object at once. The Sottocapo takes a sip of tea and says that is how someone thinking ahead behaves. The turf splits unevenly, but nobody lies down.',
        { rep: 5, network: 7, sanity: 2 }, { meritAdd: 2 }),
      fc('Nhờ Sottocapo cho đổi người đại diện', 'Ask the Sottocapo to let you swap representatives',
        'Sottocapo không gật cũng chẳng giận dữ. Bạn rời phòng cùng cảm giác người ta vừa ghi chép lại tận tay cách bạn thoái thác.',
        'The Sottocapo does not agree and is not angry. You leave the room with the feeling that someone has just recorded how you decline.',
        { rep: -5, sanity: -2 })
    ], { age: [24, 90] }),

  fe('thumb_envelope_bullet', T, [0, 3],
    '[Phong bì có một viên đạn] Capo đưa bạn chiếc phong bì dày đựng độc một viên đạn kèm mảnh giấy ghi tên. Theo lệ The Thumb, đây là lời cảnh cáo sau chót buộc người giao phải đặt tận tay kẻ nhận. Người mang cái tên ấy từng ngồi chung mâm ăn với bạn ba lần.',
    '[An envelope with a bullet] Your Capo hands you a thick envelope holding exactly one bullet and a slip with a name. By Thumb custom this is the final warning, and the carrier must place it in the recipient’s own hand. You have sat at the same table with that name three times.',
    [
      fc('Giao tận tay như đúng lệ', 'Deliver it by hand as custom demands',
        'Người nhận bóc phong bì ngay trước mặt bạn, ngắm nghía viên đạn một lúc rồi bỏ tọt vào túi áo như chiếc khuy cài. Họ cảm ơn bạn cất công tới tận nơi. Bạn không đáp.',
        'The recipient opens the envelope right in front of you, looks at the bullet a moment, then tucks it into a coat pocket like a button. They thank you for coming in person.',
        { rep: 5, sanity: -9, network: -3 }),
      fg('Báo trước vài ngày để họ kịp đi', 'Give them a few days’ warning to get away', [
        [55, 'Người nhận bốc hơi ngay đêm đó. Capo chỉ ghi sổ phong bì giao trễ chứ chẳng gặng hỏi thêm. Một tháng sau bạn nhặt được mẩu giấy nặc danh chỉ viết vỏn vẹn hai chữ cảm ơn.', 'The recipient disappears that night. The Capo notes only that the envelope arrived late, and you are not questioned further. A month later you receive an unsigned slip of paper with two words of thanks.', { sanity: 5, rep: -3, network: 5 }, { flagsAdd: ['thumb_warned_target'] }],
        [45, 'Capo đã bố trí người đón lõng sẵn. Kẻ nhận bị tóm ngay cổng nhà ga còn bạn bị triệu lên chất vấn vì sao tin tức rò rỉ trước.', 'The Capo already has a man posted. The recipient is caught outside the station, and you are called up to explain why anyone knew in advance.', { rep: -10, sanity: -8, heat: 8 }]
      ]),
      fc('Đưa phong bì cho người khác chuyển giúp', 'Pass the envelope to someone else to carry',
        'Gã Soldato khác nhận việc chẳng hỏi nửa lời. Hôm sau ánh mắt hắn nhìn bạn khác hẳn đi như vừa phát hiện bạn chẳng làm nổi việc đơn giản nhất.',
        'Another Soldato takes the task without asking why. The next day he looks at you a little differently, as though he has just learned you could not manage a simple job.',
        { sanity: -3, rep: -4 })
    ]),

  fe('thumb_turf_redraw', T, [1, 3],
    '[Vẽ lại ranh giới] Sottocapo trải tấm bản đồ khu phố ra bàn rồi lấy bút đỏ khoanh lại ranh giới địa bàn. Hai dãy nhà, một ngôi trường cùng nhà thờ nhỏ bị khoanh lọt vào vùng đóng cống nạp mới. Bạn phải đích thân đi báo tin cho từng nhà dù mặt nào ở đó bạn cũng nhẵn.',
    '[Redrawing the lines] The Sottocapo spreads a district map on the table and redraws the turf with a red pencil. Two blocks, a school and a small church are circled into the new tribute zone. You are the one who must tell them, and every household has someone who knows your face.',
    [
      fc('Đến từng nhà báo luật mới, không giấu', 'Go door to door with the new rule, hiding nothing',
        'Bạn đứng trước cửa nhà thầy giáo, nhà vị linh mục, tiệm ông thợ bánh mà đọc đúng từng chữ lệnh trên. Không ai đôi co lấy một câu. Bước ra khỏi ngôi nhà cuối cùng khi trời sập tối, hai bàn tay bạn lạnh buốt lạ thường.',
        'You stand at the teacher’s door, the priest’s, a baker’s, and say exactly what you were given. Nobody argues. When you step out of the last house it is dark and your hands are strangely cold.',
        { rep: 5, wealth: 7, sanity: -8, network: -3 }),
      fg('Xin Sottocapo miễn trường học và nhà thờ', 'Ask the Sottocapo to exempt the school and the church', [
        [50, 'Sottocapo nhìn bạn thật lâu rồi gạch tên hai chỗ ấy khỏi bản đồ. Ông bảo đây là món nợ sau này bạn phải trả bằng việc khác; bạn thừa biết việc ấy chẳng nhẹ nhàng gì.', 'The Sottocapo looks at you for a long time then crosses two places off the map. He says this is a debt you will repay with another task, and you know that task will not be easy.', { rep: 3, sanity: 6, network: 5 }, { scheduleConsequences: [later('thumb_sottocapo_favor', 2, 'Món nợ đã xin từ Sottocapo', 'The favor owed to the Sottocapo')] }],
        [50, 'Sottocapo cho là bạn đang động lòng trắc ẩn bèn đánh dấu đen cạnh tên bạn. Cả hai nơi vẫn nằm nguyên trong vòng bút đỏ.', 'The Sottocapo takes it as pity and marks a black point beside your name. Both places stay inside the red circle.', { rep: -8, sanity: -4 }]
      ]),
      fc('Cử người khác đến báo thay mình', 'Send someone else to deliver the news',
        'Bạn đẩy việc cho một Soldato mới vào nghề. Hắn nói trôi chảy mọi thứ vì chẳng quen biết ai trong khu. Bạn ngồi trong quán rượu nghe tiếng chuông nhà thờ ngân vang.',
        'You ask a new Soldato to go in your place. He says everything, because he knows none of them. You sit in a bar and listen to the church bell ring.',
        { sanity: 3, rep: -2, network: -4 })
    ], { age: [26, 90] }),

  fe('thumb_mole_hunt', T, [1, 3],
    '[Con chuột trong hội] Ba lần liên tiếp tuyến hàng của The Thumb bị phục kích đúng giờ chuyển. Underboss kết luận có nội gián bán lịch trình ra ngoài; nếu không lôi được thủ phạm thì cả đám liên đới chịu phạt chung. Ông trao bạn danh sách bảy người phải theo dõi; tên thứ năm thuộc về kẻ từng cứu mạng bạn.',
    '[The mole] Three times in a row, the Thumb’s shipments have been intercepted at precisely the right moment. The Underboss concludes someone inside is selling the schedule, and that if no one is found the punishment will fall on the blameless too, and gives you a list of seven names to watch. The fifth is the person who once saved your life.',
    [
      fg('Theo dõi cả bảy người đúng quy trình', 'Watch all seven by the book', [
        [55, 'Bạn tóm được kẻ bán đứng là người thứ bảy, gã kế toán nhút nhát chuyên tới sở sớm. Người thứ năm hoàn toàn trong sạch khiến bạn phải mở lời xin lỗi mà chẳng dám nêu lý do.', 'You find the seller is the seventh, a timid accountant who always arrives early. The fifth has nothing to hide, and you apologize without saying why.', { rep: 9, sanity: -4, network: -2 }, { meritAdd: 4 }],
        [45, 'Bạn đeo bám nhầm mục tiêu suốt hai tuần. Thêm một chuyến hàng nữa bị chặn đứng nên Underboss điền tên bạn thẳng vào danh sách thứ hai.', 'You tail the wrong person for two weeks. Another shipment is intercepted, and the Underboss puts your name on the second list.', { rep: -9, sanity: -6, heat: 4 }]
      ]),
      fc('Nói với người thứ năm, nhờ họ tự chứng minh', 'Tell the fifth name and ask them to clear themselves',
        'Người ấy cười chua chát rồi giao hết cho bạn cuốn sổ chi tiêu gia đình. Họ không trách cứ. Một tuần sau chính họ vạch mặt kẻ nói dối trong sáu người còn lại trước cả khi bạn lần ra.',
        'The person smiles wryly and hands you their entire household ledger. They do not blame you. A week later they point out who among the other six is lying, before you could find out yourself.',
        { rep: 6, network: 6, sanity: -2 }),
      fc('Trả danh sách, nói bạn không làm việc này', 'Return the list and say you will not do this',
        'Underboss nhận lại danh sách mà chẳng hỏi lý do. Ông giao việc cho người khác rồi từ đó né gọi tên bạn mỗi lúc có chuyện kín.',
        'The Underboss takes the list back and asks no reason. He gives the job to someone else and from then on avoids calling your name for anything sensitive.',
        { sanity: 4, rep: -8, network: -3 })
    ], { age: [26, 90] }),

  fe('thumb_commissary_winter', T, [0, 3],
    '[Mùa đông thiếu than] Giá rét kéo dài làm kho than của The Thumb cạn kiệt nên Capo hạ lệnh chỉ phát cho ai đóng đủ cống nạp. Các gia đình trong khu kéo tới gõ cửa suốt ba đêm liền. Một thằng bé ôm bó củi ướt đứng sững trước mặt bạn chẳng xin xỏ câu nào.',
    '[A winter short of coal] The winter drags on, the Thumb’s coal store is nearly empty, and the Capo orders it issued only to members current on tribute. The families in the district have come knocking three nights running. A boy clutching wet kindling stands in front of you and asks nothing.',
    [
      fc('Làm đúng lệnh, chỉ phát cho người đóng đủ', 'Obey and issue only to those who paid',
        'Bạn giở sổ dò từng tên, gạch từng bao than. Phần lớn các hộ đều nhận đủ phần mình; nhà nào vắng tên trong sổ đành nghe hẹn sang tháng sau. Bạn lặng người nghe tiếng bước chân thằng bé đếm từng nhịp quay về.',
        'You turn the pages, find each name, mark each sack. Most families receive their share. Households not in the book are told to wait until next month, and you hear the boy counting his footsteps as he goes home.',
        { rep: 3, sanity: -7, network: -3 }),
      fg('Phát nửa số than còn lại cho cả khu, ghi sổ là hao hụt', 'Hand out half the remaining coal to the whole district, logging it as shrinkage', [
        [60, 'Cả khu phố nhà nào cũng có chút than sưởi. Capo ghi nhận phần hao hụt mà chẳng hỏi; trong trí nhớ người dân khu ấy bạn bắt đầu mang một cái tên khác hẳn sổ sách The Thumb.', 'The whole district receives something. The Capo notes the shrinkage without asking, and in the district’s memory you begin to carry a different name than the one in the Thumb’s ledger.', { network: 8, sanity: 5, wealth: -6, rep: 3 }],
        [40, 'Có kẻ đi đếm lại số bao rồi báo thẳng lên Sottocapo. Bạn bị lôi ra giải trình; khoản than hụt trừ thẳng vào ba tháng lương.', 'Someone recounts the sacks and reports upward to the Sottocapo. You are called up to explain, and the shrinkage is deducted from three months’ pay.', { wealth: -14, rep: -6, sanity: -4 }]
      ]),
      fc('Bán số than dư cho một thương nhân Nest', 'Sell the surplus coal to a Nest merchant',
        'Bạn bán nốt chỗ than còn lại với mức giá cao nhất mùa. Quỹ Capo dày thêm còn bạn bỏ túi riêng một phần. Chiều hôm sau không còn thấy bóng thằng bé ngoài cửa nữa.',
        'You sell what is left at the highest price of the season. The Capo’s fund grows thicker, and you take a cut for yourself. The next afternoon the boy is no longer outside the door.',
        { wealth: 16, rep: 2, sanity: -9, network: -4 })
    ]),

  fe('thumb_rival_dinner', T, [2, 3],
    '[Bữa tối với đối thủ] Capo băng Thumb bên District khác mời Underboss nhà bạn dùng bữa nên ông cử bạn đi thay. Bàn tiệc dọn sáu món kèm ba loại rượu bên cạnh chiếc ghế bỏ trống chẳng rõ dành cho ai. Chủ nhà bao giờ cũng rót đầy cả hai chén trước lúc tự uống phần mình.',
    '[Dinner with a rival] A Capo of another Thumb crew in another District invites your Underboss to dine, and he sends you in his place. The table holds six dishes, three wines, and an empty chair for someone unnamed. The host always pours for both before drinking his own.',
    [
      fg('Uống rượu họ rót, ăn mọi món', 'Drink what is poured and eat every dish', [
        [65, 'Bữa tối trôi qua êm đẹp chẳng có bất ngờ nào. Chủ nhà tiễn bạn ra cửa, khen Underboss chọn được người đại diện đáng tin rồi nhét thẳng vào túi áo bạn chiếc phong bì dày cộp.', 'Dinner ends without surprises. The host sees you to the door, says the Underboss has a most dependable representative, and slips a thick envelope into your pocket.', { network: 8, rep: 5, wealth: 8, sanity: -2 }],
        [35, 'Tới chén rượu thứ hai bạn thấy vị khác lạ. Hai ngày sau bạn mới tỉnh dậy trong nhà khách của Thumb; người ta bảo bạn ngã gục ngay trên ghế.', 'The second glass tastes different. You wake in a Thumb guesthouse two days later, and they tell you that you fell out of your chair.', { health: -18, rep: -5, sanity: -6 }]
      ]),
      fc('Từ chối rượu, chỉ uống nước', 'Decline the wine and drink only water',
        'Chủ nhà mỉm cười hạ ly rượu xuống, uống nước lọc cùng bạn. Suốt bữa tiệc hai bên chỉ tán gẫu chuyện nắng mưa với chợ đen. Lúc ra về bạn chẳng rõ bên nào vừa thắng thế.',
        'The host smiles, sets his wine aside, and drinks water with you. All dinner is weather and the black market. When you leave you are not sure who won.',
        { rep: 2, sanity: 2, network: 3 }),
      fg('Hỏi thẳng ai ngồi ghế trống', 'Ask outright who sits in the empty chair', [
        [50, 'Chủ nhà buông dao xuống đĩa, bảo đó là chỗ người vừa ngã xuống trong trận đụng độ giữa hai băng mà ông chưa từng quên. Bạn gật đầu chậm rãi. Từ dạo đó hai băng nhắc tới nhau bằng thứ trọng thị kỳ lạ.', 'The host sets down his knife. He says that is the seat of someone who fell in a clash between the two crews, and he has not forgotten. You nod slowly. From then on the two crews speak each other’s names with an odd respect.', { rep: 8, network: 5, sanity: -3 }],
        [50, 'Câu hỏi bị xem là xúc phạm nặng nề. Bữa tiệc tan rã tức khắc; toàn bộ câu chuyện bay về tai Underboss trước cả khi bạn đặt chân về tới nhà.', 'The question is taken as disrespect. Dinner ends right after, and the Underboss hears the whole tale before you reach home.', { rep: -8, network: -4, sanity: -3 }]
      ])
    ], { age: [28, 90] }),

  fe('thumb_sottocapo_favor', T, [1, 3],
    '[Món nợ với Sottocapo] Sottocapo gọi bạn vào căn phòng chỉ đặt một ngọn đèn bên chiếc ghế đơn. Ông nhắc lại ân huệ bạn từng xin, bảo đã tới hạn trả nợ. Việc ông giao không ghi trong bất cứ cuốn sổ nào của The Thumb: tìm một người giùm ông mà cấm để ai đánh hơi được ông đang tìm.',
    '[The favor owed] The Sottocapo calls you into an office with one lamp and one chair. He reminds you of what you asked of him once, and says it is time to repay. What he needs is in no Thumb ledger: a person he wants found without anyone knowing he is looking.',
    [
      fg('Nhận việc, đi tìm một mình', 'Take the task and search alone', [
        [60, 'Bạn tốn trọn ba tuần, mòn hai đôi giày qua lời chỉ dẫn từ người quen cũ. Người cần tìm hóa ra là con riêng của Sottocapo bỏ nhà đi từ nhiều năm. Ông nhìn tấm ảnh thật lâu rồi cất kín vào ngăn kéo.', 'It takes three weeks, two pairs of shoes, and one old acquaintance. The person you find is the Sottocapo’s own child, who left home years ago. He looks at the photograph for a long time, then puts it in a drawer.', { rep: 8, network: 6, sanity: -3, wealth: 6 }],
        [40, 'Người bạn truy tìm đã qua đời hai năm trước trong một nhà tế bần chẳng ai buồn ghi tên. Bạn buộc phải tự quyết nên khai thật hay giấu bớt một nửa.', 'The person you seek died two years ago at an almshouse nobody wrote down. You must decide whether to tell the truth or half of it.', { sanity: -9, rep: 4 }, { flagsAdd: ['thumb_knew_the_dead'] }]
      ]),
      fc('Nhờ người khác trong hội giúp tìm', 'Ask others in the crew to help look',
        'Tin tức lan nhanh hơn bạn lường. Hai ngày sau Sottocapo biết cả hội đã xì xào bèn gạch dấu nhỏ cạnh tên bạn. Việc vẫn xong xuôi nhưng bí mật coi như tan biến.',
        'The word spreads faster than you expect. Two days later the Sottocapo knows the whole crew has heard, and he makes a small mark beside your name. The task still gets done, but it is no longer a secret.',
        { rep: -3, network: 4, sanity: -2 }),
      fc('Từ chối, nói món nợ ấy đã được trả bằng một việc khác', 'Refuse, saying the debt was repaid with something else',
        'Sottocapo lặng thinh một nhịp rồi bảo bạn lui ra. Từ hôm ấy ông chỉ gọi bạn bằng họ chứ chẳng gọi tên riêng nữa.',
        'The Sottocapo is silent, then says you may go. From that day he calls you by surname instead of first name.',
        { rep: -10, sanity: 4, network: -5 })
    ], { causal: true, age: [22, 90], requires: [] }),

  // ------------------------------------------------------------------ stories
  fe('thumb_soldato_mentor', T, [0, 2],
    '[Người dạy nghi thức] Một Soldato già nhất hội được cử dạy bạn dáng đứng, cách rót rượu, phép chào Capo cùng cách tránh nhìn thẳng mắt Underboss. Ông bảo đằng sau mỗi quy tắc đều có một xác người nằm lại, nhưng tuyệt nhiên chẳng bao giờ kể đó là ai.',
    '[The etiquette teacher] The oldest Soldato in the crew is assigned to teach you how to stand, how to pour wine, how to greet a Capo, and how not to look straight at the Underboss. He says each rule has a dead person behind it. He never says who.',
    [
      fc('Học thật kỹ, hỏi ông về những người đã chết', 'Study hard and ask about the dead behind each rule',
        'Chiều nào bạn cũng gặng hỏi thêm một câu để ông đáp lại nửa chừng. Hết một năm bạn chép đầy cuốn sổ quy tắc kèm tên những người ông chịu nhắc tới. Cuốn sổ ấy dày hơn bạn tưởng.',
        'Each afternoon you ask one more question and he answers half. After a year you have a notebook of rules with the names he agreed to mention. It is thicker than you expected.',
        { rep: 4, sanity: -2, network: 5 }, { flagsAdd: ['thumb_has_mentor'] }),
      fc('Học đúng những gì cần thiết, không hơn', 'Learn only what is needed and no more',
        'Bạn thuộc lòng nghi thức đủ tránh bị phạt trong phòng họp. Ông lão gật đầu công nhận nhưng tuyệt nhiên không truyền thêm chút nào quá buổi cuối.',
        'You learn the etiquette well enough not to be fined at meetings. The old man nods, but teaches nothing beyond that last session.',
        { rep: 2, sanity: 2 }),
      fc('Cãi lại một quy tắc, hỏi tại sao phải tuân theo', 'Argue with a rule and ask why it must be obeyed',
        'Ông nhìn bạn rồi kể đúng một chuyện về gã Soldato năm xưa từng cãi lại quy tắc ấy. Ông bỏ lửng phần kết khiến bạn chẳng dám hỏi thêm.',
        'He looks at you and tells exactly one story: about a Soldato who once argued with that very rule. He does not tell the ending, and you do not dare ask.',
        { sanity: -4, rep: 1, network: 2 })
    ], { age: [18, 60], weight: 11 }),

  fe('thumb_capo_retirement', T, [1, 3],
    '[Capo về hưu] Capo của bạn sắp nghỉ hưu sau ba mươi năm lăn lộn nên mời cả tổ ăn bữa tối chia tay. Theo lệ, người rời ghế được quyền tiến cử người nối nghiệp dù quyền quyết sau cùng thuộc về Sottocapo. Giữa tiệc ông liếc nhìn bạn đúng một lần thật nhanh.',
    '[The Capo retires] Your Capo is retiring after thirty years, and invites the whole crew to a last dinner. By custom the retiree names a successor, though the Sottocapo has the final say. He lets his eyes rest on you exactly once, very briefly.',
    [
      fg('Đề nghị phụ giúp ông trong thời gian chuyển giao', 'Offer to assist him through the handover', [
        [60, 'Ông vui vẻ nhận lời để rồi suốt mùa ấy bạn được kèm đọc sổ sách cả khu. Ngày ông rút lui, Sottocapo điền tên bạn vào danh sách đề cử.', 'He accepts, and all season you learn to read the ledger of the whole district. When he leaves, the Sottocapo puts your name on the nomination list.', { rep: 8, network: 8, sanity: -3 }, { meritAdd: 5 }],
        [40, 'Một Soldato khác đánh hơi thấy bèn ngỏ ý y hệt. Hai người gồng mình tranh đua ròng rã ba tháng để rồi kẻ thua cuộc rút lui trong lặng lẽ nặng nề.', 'Another Soldato hears and makes the same offer. The two of you race for three months, and the loser withdraws in a heavy silence.', { rep: 2, sanity: -6, network: -3 }]
      ]),
      fc('Chúc ông an hưởng tuổi già và không xin gì', 'Wish him a peaceful retirement and ask for nothing',
        'Capo thoáng ngạc nhiên rồi bật cười, vỗ nhẹ lên vai bạn. Ai lên thay thì tới lúc công bố chung bạn mới biết, nhưng mùa đông năm ấy ông gửi biếu bạn chiếc bút máy cũ.',
        'The Capo is surprised, then smiles, and rests a hand on your shoulder. You learn the successor’s name when everyone else does, but he sends you an old fountain pen in winter.',
        { sanity: 4, network: 4, rep: 1 }),
      fc('Tố cáo một sai sót trong sổ của ông trước bữa tiệc', 'Report an error in his ledger before the dinner',
        'Sottocapo cảm ơn bạn đã báo rồi ghi chép lại. Capo thừa biết kẻ nào vừa thọc gậy. Bữa tiệc vẫn diễn ra suôn sẻ nhưng ông không bao giờ nhìn về phía bạn thêm lần nào.',
        'The Sottocapo thanks you for reporting and writes it down. The Capo knows at once who. The dinner goes on, but he never glances your way again.',
        { rep: 4, network: -7, sanity: -6 })
    ], { age: [26, 90] }),

  fe('thumb_widow_of_fallen', T, [0, 3],
    '[Góa phụ của người ngã xuống] Một Soldato tử trận trong cuộc đấu súng tuần trước; theo lệ, vợ ông được lãnh khoản tiền tuất trích từ quỹ The Thumb. Tháng này quỹ chưa thu đủ. Bạn được sai mang phong bì cuối cùng tới nhà mà bà đã dọn sẵn cơm nóng chờ từ trước lúc bạn kịp mở lời.',
    '[The widow of the fallen] A Soldato died in last week’s gunfight, and by custom his wife receives a pension from the Thumb’s fund. The fund has not collected enough this month. You are sent with the last envelope to her door, and she has already cooked a meal for you before you can speak.',
    [
      fc('Đưa đủ số tiền, tự bù chỗ thiếu', 'Give the full sum, covering the shortfall yourself',
        'Bạn đặt chiếc phong bì nguyên vẹn lên bàn, chẳng nhắc nửa lời chuyện tiền thiếu. Bà bưng bát cơm đặt trước mặt rồi ngồi lặng lẽ nhìn bạn ăn. Lúc bạn chào về, bà cúi rạp rất thấp hệt như tiễn người ruột thịt.',
        'You hand over the envelope and say nothing about the shortfall. She sets a bowl of rice before you and watches you eat. As you leave, she bows very low, as she would to family.',
        { wealth: -11, sanity: 6, network: 5, rep: 2 }, { flagsAdd: ['thumb_widow_kin'] }),
      fc('Đưa phần có, nói thật là quỹ còn thiếu', 'Give what you have and say plainly the fund is short',
        'Bà gật đầu như đã liệu trước. Mâm cơm vẫn bưng lên nhưng chẳng ai thốt nổi câu nào. Về tới nhà bạn mới nhận ra mình không tìm nổi một lời tử tế nào đáng nói.',
        'She nods as if she had guessed. The meal is still served, but without conversation. By the time you reach home you realize you could not find a single sentence worth saying.',
        { sanity: -6, rep: 1 }),
      fg('Xin Sottocapo bổ sung quỹ ngay trong tuần', 'Press the Sottocapo to top up the fund this week', [
        [55, 'Sottocapo nhăn mặt khó chịu nhưng vẫn ký duyệt cho đủ vào thứ Năm. Quỹ giữ trọn uy tín; nghe đâu anh em trong hội càng kính trọng bà góa hơn trước.', 'The Sottocapo is irritated but signs, and the top-up arrives on Thursday. The fund keeps its name, and you hear the widow is respected by the crew more than ever.', { rep: 7, network: 5, sanity: 3 }],
        [45, 'Sottocapo gạt phắt bảo chuyện quỹ không tới lượt Soldato xía vào rồi tặng bạn một dòng cảnh cáo.', 'The Sottocapo answers that the fund is no concern of a Soldato, and writes you a line of warning.', { rep: -7, sanity: -5 }]
      ])
    ]),

  fe('thumb_daughter_match', T, [2, 3],
    '[Hôn sự cho con gái] Underboss muốn gả con gái cho con trai Capo bên District khác để thắt chặt liên minh. Cô gái lén tìm gặp bạn chẳng nhắc nửa lời tới chuyện cưới xin, chỉ hỏi bạn từng thấy ai thoát khỏi The Thumb mà giữ được mạng chưa. Bạn hiểu nghe câu hỏi đó thôi là đã bước qua lằn ranh.',
    '[A daughter’s match] The Underboss wants to marry his daughter to a Capo’s son in another District to cement an alliance. The girl has come to you, saying nothing about the match, only asking whether you have ever seen anyone leave the Thumb without dying. You know that hearing the question already oversteps custom.',
    [
      fc('Nói thật, rằng có và không nhiều', 'Answer truthfully: yes, and not many',
        'Bạn kể về một người từng xin rút lui để rồi được tiễn bằng loạt đạn chào. Cô khẽ gật đầu cảm ơn rồi không hỏi thêm. Tháng sau cô gửi tặng bạn con dao nhỏ khắc tên mình không kèm thư từ.',
        'You tell of one who left and was sent off with a salute. She nods, thanks you, and says nothing more. A month later she sends you a small knife with her name engraved, no note attached.',
        { sanity: -3, network: 6, rep: 1 }, { flagsAdd: ['thumb_daughter_confidant'] }),
      fg('Báo cho Underboss về câu hỏi của cô', 'Tell the Underboss about her question', [
        [50, 'Underboss khen bạn trung thành rồi thưởng riêng một khoản. Cô gái từ đó chẳng bao giờ ngước mắt nhìn bạn nữa; lễ cưới vẫn diễn ra đúng lịch.', 'The Underboss thanks you for loyalty and rewards you. The girl never looks at you again, and the wedding takes place on schedule.', { wealth: 10, rep: 7, sanity: -9 }],
        [50, 'Underboss lặng thinh hồi lâu rồi bảo ông đã biết sẵn, chẳng nói biết từ bao giờ. Bạn bước khỏi phòng cùng cảm giác mình vừa lọt vào bài thử.', 'The Underboss is silent for a long time, then says he already knew. He does not say since when. You leave the room feeling you have just been tested.', { rep: 3, sanity: -6, network: -3 }]
      ]),
      fc('Nói rằng việc này không phải việc của bạn', 'Say this is not your business',
        'Cô điềm tĩnh gật đầu. Hôn lễ cử hành linh đình; cô đứng giữa hai gia đình với ánh mắt vô hồn. Bạn đứng tuốt hàng sau mà chẳng tìm ra lý do ngẩng mắt khỏi mặt sàn.',
        'She nods calmly. The wedding takes place, and she stands between two families looking nowhere. You stand in the back row and cannot find a reason to lift your eyes from the floor.',
        { sanity: -5, rep: 1 })
    ], { age: [28, 90] }),

  fe('thumb_old_blood', T, [2, 3],
    '[Máu cũ trên sổ nợ] Lúc dọn kho hồ sơ vị Capo quá cố, bạn nhặt được cuốn sổ kẹp giữa hai tấm ván gỗ. Bên trong chép rõ những khoản tiền The Thumb nhận từ Wing suốt mười lăm năm, cột kề bên ghi danh sách người đã chết để dòng tiền ấy không bị đứt đoạn.',
    '[Old blood in the ledger] While clearing a dead Capo’s archive, you find a notebook wedged between two boards. It lists sums the Thumb has taken from a Wing for fifteen years, and a column beside it names the dead who kept the payments flowing.',
    [
      fg('Đưa cuốn sổ lên Underboss', 'Bring the ledger to the Underboss', [
        [50, 'Underboss đọc thật lâu rồi khóa kín vào két, bảo bạn làm rất đúng. Ba tuần sau hai Capo bặt tăm khỏi danh sách còn bạn nhận thưởng chiếc đồng hồ vàng.', 'The Underboss reads for a long time, locks it in a safe, and says you did right. Three weeks later two Capo vanish from the roster and you are given a gold watch.', { rep: 10, wealth: 8, sanity: -6, network: -3 }],
        [50, 'Underboss đã tường tận cuốn sổ ấy từ lâu. Ông không nổi giận, nhưng từ đó bạn biến thành kẻ biết quá nhiều khiến những cánh cửa quanh bạn khép chậm hơn thường lệ.', 'The Underboss has known its contents for years. He is not angry, but from then on you are someone who knows too much, and doors around you begin closing a little slower than usual.', { rep: 3, sanity: -9, heat: 8 }]
      ]),
      fc('Đốt cuốn sổ và quên nó', 'Burn the ledger and forget it',
        'Bạn châm lửa đốt cuốn sổ ngay trong lò sưởi nhà kho, từng trang một. Tàn tro phủ xuống khe ván rồi tan theo gió lạnh. Nhiều tuần sau bạn vẫn nhớ vanh vách từng cái tên.',
        'You burn the notebook in the archive’s fireplace, page by page. Ash falls onto the boards and disappears in the cold air. Weeks later you still remember every name.',
        { sanity: -7, heat: -3 }),
      fg('Dùng cuốn sổ để tống tiền Wing', 'Use the ledger to squeeze the Wing', [
        [50, 'Wing chi gọn một khoản đủ cho bạn sống dư dả nhiều năm. Một tuần sau bạn thấy hai Fixer đứng lì đầu hẻm ngoài cửa nhà mình chẳng làm gì cả.', 'The Wing pays enough to keep you comfortable for years. A week later you see two Fixers at the end of the alley outside your home, doing nothing.', { wealth: 28, heat: 14, sanity: -8, rep: -4 }, { flagsAdd: ['thumb_blackmailed_wing'] }],
        [50, 'Wing gọi bạn lên gặp trên sân thượng. Bộ dạng lúc bạn bước xuống chẳng còn nguyên vẹn như lúc lên.', 'The Wing summons you to a meeting on a roof.', { health: -24, wealth: -10, rep: -8, heat: 10 }]
      ])
    ], { age: [30, 90] })
];

export const THUMB_MINORS = [
  M('m_thumb_cigarette_count', AGE.GROWN, fneed(T, 0),
    '[Điếu thuốc cuối hàng] Một Soldato cùng ca đưa bạn nửa bao thuốc, bảo đó là phần thưởng phiên gác tuần trước. Ông bỏ thuốc theo lệnh bác sĩ, hỏi bạn có còn nhớ lần cuối thấy ông cười là bao giờ.',
    '[The last cigarette] A Soldato on your shift hands you half a pack and says it is a reward for last week’s watch. He no longer smokes, doctor’s orders. He asks if you remember the last time he laughed.',
    [C('Nói thật là không nhớ', 'Say honestly that you cannot recall', 'Ông gật đầu rồi rít một hơi thuốc không đầu lọc. Hai người ngồi nghe tiếng máy phát điện rì rầm tới sáng.', 'He nods and takes a drag on an unfiltered cigarette. The two of you sit listening to the generator until morning.', { sanity: 2, network: 2 }), C('Kể một chuyện cũ để ông cười', 'Tell an old story to make him laugh', 'Ông bật cười rất khẽ, rất ngắn.', 'He laughs, very quietly and briefly.', { sanity: 4, network: 3 })],
    I('Bạn nhận nửa bao thuốc và cúi đầu.', 'You take the half pack and nod.'), { theme: 'work' }),
  M('m_thumb_boot_polish', AGE.GROWN, fneed(T, 0),
    '[Giày bóng cho buổi họp] Capo dặn buổi họp tuần sau có mặt Sottocapo nên giày bạn phải bóng lộn hơn mọi lần. Tay Soldato đồng cấp chỉ cho bạn mẹo đánh giày bằng thìa nước bọt pha giẻ nỉ cũ.',
    '[Shoes for the meeting] The Capo reminds you the Sottocapo attends next week’s meeting, and your shoes must shine more than ever. A peer shows you how to buff them with a spoon of spit and old felt.',
    [C('Học theo, đánh cả đôi giày của người ngồi cạnh', 'Learn it and polish the neighbor’s pair too', 'Người ngồi cạnh ngắm đôi giày sáng loáng của mình hồi lâu. Hôm sau gã dúi cho bạn điếu xì gà lẻ.', 'The neighbor stares at his gleaming shoes for a long while. The next day he hands you a single cigar.', { network: 3, rep: 1 }), C('Tự lo phần mình, giữ bí quyết', 'Mind your own pair and keep the trick', 'Đôi giày bạn bóng tới nỗi Sottocapo phải liếc xuống lần thứ hai. Chẳng ai biết chi tiết nhỏ ấy làm hài lòng ai.', 'Your shoes shine so much that the Sottocapo looks down a second time. Nobody knows whom this small matter pleased.', { rep: 2 })],
    I('Bạn chỉnh lại giày và quên đi.', 'You straighten your shoes and forget it.'), { theme: 'work' }),
  M('m_thumb_ledger_typo', AGE.GROWN, fneed(T, 0),
    '[Con số lệch một chữ số] Bạn phát hiện sổ cống nạp tháng này chép lệch một chữ số, lại khéo có lợi cho đúng ông Capo nọ. Biết đâu chỉ là lỡ tay, hoặc chẳng phải.',
    '[One digit off] You notice this month’s tribute ledger has a figure written one digit off, and the digit favors a specific Capo. It could be a slip of the pen. It could also not be.',
    [C('Sửa lại im lặng, không báo ai', 'Fix it quietly and tell no one', 'Con số được sửa khớp lại sổ sách. Chẳng ai thắc mắc để rồi bạn tự hỏi mình vừa tha một tội hay chỉ gạt bỏ một lời nhắc.', 'The figure is corrected and the ledger balances. Nobody asks, and you wonder if you just spared an offense or only brushed away a warning.', { sanity: -1, network: 2 }), C('Báo lên Sottocapo kèm bằng chứng', 'Report it to the Sottocapo with evidence', 'Sottocapo ghi nhận rồi dặn bạn giữ kín miệng. Một tháng sau tay Capo ấy bị điều chuyển sang khu khác.', 'The Sottocapo acknowledges it and asks you to tell no one. A month later that Capo is moved to another district.', { rep: 4, network: -3 })],
    I('Bạn đóng sổ và không nghĩ thêm.', 'You close the book and think no more.'), { theme: 'work' }),
  M('m_thumb_stray_dog', AGE.GROWN, fneed(T, 0),
    '[Con chó ở kho đạn] Một con chó hoang mò tới ngủ trước cửa kho đạn khiến Capo dọa nếu qua thứ Sáu vẫn còn lảng vảng thì bạn phải xử lý. Con chó nhớ mặt bạn chỉ sau hai ngày nên chẳng bao giờ sủa mỗi lúc bạn tới.',
    '[The dog at the armory] A stray starts sleeping outside the armory door, and the Capo says if it is still there after Friday you must deal with it. The dog knows you by the second day and never barks when you come.',
    [C('Mang nó về nhà', 'Take it home', 'Con chó lững thững đi theo bạn suốt hai con phố chẳng cần dây xích. Nó nằm ngủ dưới gầm giường rồi thức giấc hễ có bóng người lướt qua cửa.', 'The dog walks beside you through two streets with no leash. It sleeps under your bed and wakes whenever anyone passes the door.', { sanity: 4, wealth: -2 }), C('Cho nó ăn, để nó ở lại', 'Feed it and let it stay', 'Capo quên bẵng chuyện đó luôn. Con chó ở lì lại để rồi cả hội quen mắt tới nỗi điền tên nó vào bảng phân ca trực.', 'The Capo never mentions it again. The dog stays, and the crew grows so used to it that they pencil its name on the duty board.', { sanity: 2, network: 3 })],
    I('Bạn đi qua con chó và không nhìn.', 'You pass the dog without looking.'), { theme: 'work' }),
  M('m_thumb_pistol_clean', AGE.GROWN, fneed(T, 0),
    '[Lau súng đêm khuya] Bạn lau khẩu súng lúc hai giờ sáng như thói quen cũ, chợt nhận ra gần một năm nay chưa từng bóp cò nhắm ai. Ở vị trí này chẳng rõ đó là điềm lành hay điềm gở.',
    '[Cleaning the pistol at night] You clean your pistol at two in the morning as always, and realize it has been nearly a year since you shot anyone. It is not clear whether that is good or bad for someone in your position.',
    [C('Tập bắn thêm một buổi cho khỏi rỉ', 'Do another practice session to keep sharp', 'Bạn nã mười hai viên vào bia ngoài trường bắn. Bàn tay vẫn vững chãi đến mức bạn ngồi nhìn nó hồi lâu.', 'You fire twelve rounds at the range target. Your hand does not shake, and that is what makes you sit looking at your hand for a long while.', { sanity: -3, rep: 1 }), C('Cất súng vào ngăn kéo, ngủ sớm', 'Put the pistol in the drawer and sleep early', 'Giấc ngủ ập tới nhanh hơn mọi đêm. Sáng hôm sau trời hửng nắng; bạn bỗng thấy lạ vì mình còn để tâm xem hôm nay có nắng.', 'Sleep comes faster than usual. The morning is sunny, and you find it strange that you noticed the sun at all.', { sanity: 4 })],
    I('Bạn lau súng xong và đi ngủ.', 'You finish cleaning and go to bed.'), { theme: 'work' }),
  M('m_thumb_soldato_birthday', AGE.GROWN, fneed(T, 0),
    '[Sinh nhật một Soldato] Một Soldato trong tổ bước sang tuổi bốn mươi, cột mốc thiên hạ bảo sống tới đã đáng ăn mừng. Capo cho phép bày bữa nhỏ ngay trong kho đạn. Ông ta chỉ nhờ riêng bạn đừng gọi ông bằng cấp bậc trong bữa ấy.',
    '[A Soldato’s birthday] A Soldato in your team turns forty, the age people say anyone who survives to deserves a toast. The Capo allows a small meal in the armory. He asks you one favor: do not call him by rank during it.',
    [C('Gọi ông bằng tên thật suốt buổi', 'Use his real name all evening', 'Ông thoáng giật mình rồi bật cười, bảo mười năm rồi chẳng ai gọi thẳng tên mình. Bạn nhớ mãi cái tên ấy tận tới ngày ông ngã xuống.', 'He is startled, then laughs, and says no one has used his name in ten years. You remember that name until the day he falls.', { sanity: 4, network: 6 }), C('Giữ cấp bậc, nâng ly theo nghi thức', 'Keep to rank and toast by the book', 'Bữa tiệc trôi qua gọn ghẽ mà khô khốc. Ông nâng ly cảm ơn qua lệ rồi chẳng gắp thêm miếng nào.', 'The party goes by neat and dry. He raises a glass in thanks, but eats nothing more after that.', { rep: 1, sanity: -2 })],
    I('Bạn gửi một lời chúc và quay lại ca trực.', 'You send a greeting and return to your shift.'), { theme: 'work' }),
  M('m_thumb_rain_collection', AGE.GROWN, fneed(T, 0),
    '[Đi thu dưới mưa] Mưa dầm suốt ba ngày chẳng có chủ sạp nào thò mặt ra đường. Capo bảo vẫn phải đi thu đủ vì tiền cống nạp không biết tránh mưa. Cánh cửa nào bạn gõ cũng mở chậm hơn thường lệ một nhịp.',
    '[Collecting in the rain] Rain lasts three days and no stall owner goes out. The Capo tells you to collect anyway, because tribute does not pause for weather. Each door you knock on opens a beat slower than usual.',
    [C('Thu vào ngày mưa như lệnh', 'Collect as ordered', 'Bạn ướt lướt thướt từ đầu xuống chân nhưng gom đủ mười một phong bì. Capo ném cho bạn chiếc khăn khô chẳng nói một lời.', 'You are soaked to the bone and carry all eleven envelopes. The Capo hands you a dry towel without a word.', { rep: 2, health: -3 }), C('Hoãn đến khi tạnh, tự nhận trách nhiệm', 'Delay until it clears and take the blame', 'Hai hôm sau bạn thu đủ cả phần thiếu, Capo chỉ ghi vào sổ lỗi nộp muộn. Chủ sạp đặt sẵn giữa bàn bạn tách trà nóng bốc hơi.', 'Two days later you collect in full, and the Capo writes only a line about the delay. The stall owners leave a hot cup of tea right on the table.', { wealth: -2, network: 3, sanity: 2 })],
    I('Bạn đứng trú ở hiên một quán và đếm giọt nước.', 'You shelter under a tavern awning and count raindrops.'), { theme: 'work' }),
  M('m_thumb_gun_oil', AGE.GROWN, fneed(T, 0),
    '[Dầu súng hết] Kho cạn sạch dầu bảo quản súng nên Capo nhờ bạn mua chui ngoài chợ đen tránh lộ dấu. Tay lái buôn nhìn bạn chằm chằm hồi lâu rồi hét giá gấp ba vì thừa biết bạn từ đâu tới.',
    '[Out of gun oil] The armory is out of oil for the guns, and the Capo asks you to fetch more from the black market without being traced. The seller looks at you for a long time and names triple the price, because he already knows where you are from.',
    [C('Trả giá gấp ba', 'Pay triple', 'Bạn trả đủ tiền rồi xách về mười lọ dầu. Capo kẹp hóa đơn bảo bạn cần tập thêm bài mặc cả; bạn chỉ biết gật đầu.', 'You pay and bring back ten jars. The Capo files the receipt and says you should learn to bargain. You only nod.', { wealth: -8, rep: 1 }), C('Mặc cả, nhắc ông rằng Thumb mua mỗi tháng', 'Bargain and remind him the Thumb buys every month', 'Lão chịu nhượng đúng một nửa giá. Cả hai thừa hiểu lão vẫn lời khẳm nhưng chẳng ai buồn nói ra.', 'He concedes exactly half. Both know he still profits, but neither mentions it.', { wealth: -4, network: 3 })],
    I('Bạn ghi vào sổ rằng dầu hết và để Capo lo.', 'You note that the oil is gone and leave it for the Capo.'), { theme: 'work' }),
  M('m_thumb_tongue_slip', AGE.GROWN, fneed(T, 0),
    '[Lỡ miệng trong buổi họp] Bạn lỡ miệng gọi tên riêng một Capo ngay giữa buổi họp có mặt Sottocapo. Chẳng ai cười nhạo hay quở trách, nhưng bạn biết thừa mười con người quanh bàn vừa ghim chặt khoảnh khắc ấy vào đầu.',
    '[A slip of the tongue] In a meeting with the Sottocapo present, you call a Capo by his first name. Nobody laughs, nobody speaks, but you realize ten people have just committed the moment to memory.',
    [C('Xin lỗi trước toàn thể, đúng nghi thức', 'Apologize before everyone, by the book', 'Capo khẽ gật cho buổi họp trôi tiếp rồi ai đó lặng lẽ để lại trên bàn bạn mẩu giấy chép câu tục ngữ cũ. Bạn hiểu mình vừa được bỏ qua.', 'The Capo nods, the meeting goes on, and one of them leaves you a slip of paper with an old proverb. You understand you have just been forgiven.', { rep: -1, sanity: 2 }), C('Giữ im lặng, không xin lỗi', 'Stay silent and do not apologize', 'Chẳng ai nhắc lại. Vậy mà suốt ba tuần sau bạn bị gạt ra ngoài mọi buổi họp kín nên đoán đây chính là cái giá.', 'Nobody mentions it. But for three weeks you are not invited to small meetings, and you guess that is the price.', { rep: -4, sanity: -2 })],
    I('Bạn cúi đầu và tránh nhìn ai.', 'You bow your head and avoid every eye.'), { theme: 'work' }),
  M('m_thumb_letter_home', AGE.GROWN, fneed(T, 0),
    '[Thư gửi về nhà] Bạn ngồi viết lá thư cho người thân lâu ngày chưa gặp, sực nhận ra mình chẳng còn chuyện gì thật lòng có thể kể. Câu nào viết xong cũng vội gạch bỏ vì nghe cứ như tiết lộ điều cấm kỵ.',
    '[A letter home] You write a letter to a relative you have not seen in ages, and realize you have nothing true to say. Each sentence you write is crossed out because it sounds like something you are not permitted to say.',
    [C('Gửi lá thư ngắn nhất có thể', 'Send the shortest letter possible', 'Bạn gửi vỏn vẹn ba dòng kèm chút tiền. Một tháng sau hồi âm về cũng đúng ba dòng. Hai đầu dây cứ giữ nhau bằng sợi chỉ buộc hờ.', 'You send three lines and some money. A month later you receive an answer, also three lines. The two of you hold on like loosely tied cords.', { wealth: -3, sanity: 2 }), C('Xé lá thư và không viết nữa', 'Tear it up and write no more', 'Bạn ngồi nhìn đống giấy vụn dưới sọt rác. Có một câu vẫn nguyên vẹn chưa gạch mực mà bạn chẳng nhặt lên.', 'You sit looking at the scraps in the bin. One sentence was never crossed out, and you do not pick it up.', { sanity: -4 })],
    I('Bạn đặt bút xuống và nhìn ra cửa sổ.', 'You set the pen down and look out the window.'), { theme: 'work' }),
  M('m_thumb_new_vest', AGE.GROWN, fneed(T, 1),
    '[Chiếc áo vest mới] Cuối năm Sottocapo tặng mỗi Capo chiếc áo vest may đo. Bạn khoác thử lên người thấy vừa vặn đến rợn người như có kẻ lén đo kích cỡ bạn từ lâu.',
    '[A new vest] The Sottocapo gives each Capo a tailored vest at year end. You try it on and find it fits suspiciously well, as if someone measured you long ago without your knowing.',
    [C('Hỏi thợ may ai đã đo', 'Ask the tailor who took your measurements', 'Ông thợ may bật cười bảo mình chỉ cắt theo bảng số đo lưu sẵn của hội.', 'The tailor laughs and says he only follows the crew’s measurement sheet.', { sanity: -3, network: 2 }), C('Mặc nó đi họp, không nói gì', 'Wear it to the meeting and say nothing', 'Cả phòng đều liếc chiếc áo trước rồi mới nhìn mặt bạn. Bạn dần hiểu một chiếc áo may vừa vặn đôi khi cũng là lời nhắc khéo.', 'Everyone looks at the vest before they look at you. You begin to understand that a vest can be a very polite reminder.', { rep: 3, sanity: -1 })],
    I('Bạn treo chiếc áo vào tủ và để đó.', 'You hang the vest in the closet and leave it there.'), { theme: 'work' }),
  M('m_thumb_alley_cat', AGE.GROWN, fneed(T, 0),
    '[Con mèo đường hẻm] Lần nào bạn đi thu cống nạp, đứa nhỏ bán diêm cũng đứng cuối ngõ chẳng xin xỏ gì mà chỉ lầm bầm đếm bước chân bạn. Hôm nay nó bạo dạn hỏi bạn có phải người của The Thumb không, hỏi luôn mẹ nó tháng này có phải đóng tiền nữa không.',
    '[The child at the alley end] A matchbox seller keeps standing at the end of the alley when you collect tribute. It asks nothing, only counts your steps. Today it asks whether you work for the Thumb, and whether its mother must pay.',
    [C('Nói thật, mẹ nó có phải đóng', 'Answer truthfully: its mother must pay', 'Đứa nhỏ cúi gằm đầu thật chậm rồi co giò chạy mất. Hôm sau mẹ nó đứng đón sẵn với phong bì tiền trên tay chẳng hề run rẩy.', 'The child nods slowly, then runs. The next day its mother waits with the envelope ready, and her hand does not shake.', { sanity: -3, rep: 1 }), C('Nói bạn sẽ hỏi lại Capo', 'Say you will ask the Capo again', 'Đứa nhỏ nhìn bạn rồi cười khẩy như nghe câu này quen lắm. Bạn về hỏi lại Capo để nghe câu đáp chẳng đổi một chữ.', 'The child looks at you then smiles, as if it has heard this answer many times. You ask the Capo, and the answer stays the same.', { sanity: -2, network: 2 })],
    I('Bạn mỉm cười mệt mỏi và bước tiếp.', 'You smile wearily and walk on.'), { theme: 'work' }),
  M('m_thumb_new_recruit_nerves', AGE.GROWN, fneed(T, 0),
    '[Người mới run tay] Tân binh mới điều về tổ bạn tay run bần bật tới độ đánh rơi băng đạn hai lần một ngày. Capo bảo bạn tùy nghi xử lý, miễn tuần sau cậu ta không làm hỏng chuyện.',
    '[The recruit’s shaking hands] A new recruit assigned to your team shakes so badly he drops his magazine twice in one day. The Capo tells you do whatever you like so long as he does not ruin anything next week.',
    [C('Ngồi cùng cậu ấy một buổi tối, kể cách bạn từng run', 'Sit with him one evening and tell how you once shook', 'Cậu nghe xong im lặng hồi lâu. Sáng sau tay vẫn còn run nhưng đỡ hẳn; cậu cảm ơn bạn bằng chai nước lọc.', 'He listens in silence for a long time. The next day his hands still shake, but a little less, and he thanks you with a bottle of water.', { sanity: 2, network: 4 }), C('Cho cậu ấy ca đêm đứng một mình', 'Give him a night shift standing alone', 'Cậu đứng gác suốt đêm tới sáng vẫn bình yên vô sự. Biết đâu đấy là bài học, hoặc chẳng phải.', 'He stands all night and is still in one piece at dawn. Maybe it was a lesson, maybe not.', { rep: 2, network: -2 })],
    I('Bạn bảo cậu ta tự lo và quay đi.', 'You tell him to sort himself out and turn away.'), { theme: 'work' }),
  M('m_thumb_coin_flip', AGE.GROWN, fneed(T, 1),
    '[Đồng xu quyết định] Hai Soldato trong tổ tranh cãi chuyện phân ca đêm chẳng ai chịu nhường ai. Cả hai bèn đòi tung đồng xu, dúi đồng xu vào tay bạn vì chỉ có bạn là người cả hai không nghi ngờ.',
    '[The coin that decides] Two Soldato on your team argue about who gets the night shift, and neither will yield. Both offer a coin flip, and hand the coin to you, since you are the only one neither suspects.',
    [C('Tung đồng xu, chấp nhận kết quả', 'Flip the coin and accept the result', 'Đồng xu rơi xuống mặt bàn, nảy hai nhịp rồi nằm im. Kẻ thua nhún vai, người thắng gật đầu rồi suốt ba hôm liền chẳng ai nhìn mặt bạn.', 'The coin hits the table, bounces twice, and lies still. The loser shrugs. The winner nods, and neither looks at you for three days.', { rep: 2, sanity: -1 }), C('Chia ca đêm cho cả hai, mỗi người nửa tuần', 'Split the night shift, half a week each', 'Cả hai đều ấm ức một chút, chính nhờ vậy không ai thấy mình bị thiên vị. Bạn bắt đầu hiểu nghệ thuật hòa giải vận hành thế nào.', 'Both are a little unhappy, and so neither feels cheated. You start to understand how mediation really works.', { network: 5, rep: 3 })],
    I('Bạn trả lại đồng xu và bước đi.', 'You give back the coin and walk away.'), { theme: 'work' }),
  M('m_thumb_tobacco_tax', AGE.GROWN, fneed(T, 0),
    '[Thuế thuốc lá] Ông chủ sạp thuốc lá thắc mắc sao The Thumb đánh thuế thuốc nặng hơn rượu trong khi thuốc đâu làm ai phát điên. Ông hỏi rất nghiêm túc làm bạn cứng họng chẳng kiếm nổi lý do nào ngoài chữ lệ.',
    '[The tobacco tax] A tobacco stall owner asks why the Thumb taxes cigarettes higher than liquor, since cigarettes make no one go mad. He asks very seriously, and you have no answer except that it is custom.',
    [C('Nói thật rằng bạn không biết', 'Say honestly that you do not know', 'Ông gật gù rồi nộp đủ tiền. Hai người đứng im một lúc trước khi ông dúi cho bạn bao thuốc không tính tiền.', 'He nods and pays in full. The two of you stand silent a moment, then he hands you a pack, free of charge.', { network: 4, sanity: 1 }), C('Hứa hỏi Capo và trả lời lại', 'Promise to ask the Capo and answer later', 'Capo nghe xong cười lớn rồi bảo bạn đừng phí hơi để tâm.', 'The Capo laughs aloud and tells you not to bother.', { sanity: -2, rep: -1 })],
    I('Bạn lấy phong bì và đi.', 'You take the envelope and leave.'), { theme: 'work' }),
  M('m_thumb_stolen_gun', AGE.GROWN, fneed(T, 0),
    '[Khẩu súng bị mất] Khẩu súng của gã Soldato ngang cấp bỗng mất tăm khỏi tủ khóa khiến hắn năn nỉ bạn đừng báo Capo. Hắn thề sẽ tự kiếm ra trong ba ngày, mồ hôi lạnh vã đầy trán tự lúc nào chẳng rõ.',
    '[The missing gun] A peer’s pistol vanishes from the locked cabinet, and he begs you not to tell the Capo. He says he will find it himself in three days, and has already begun to sweat cold without knowing when it started.',
    [C('Giữ kín và giúp hắn tìm', 'Keep quiet and help him look', 'Hai hôm sau bạn lục thấy khẩu súng nằm lọt trong tủ đồ người lao công. Hắn chẳng thốt nổi câu nào, chỉ siết chặt tay bạn thật lâu.', 'Two days later you find the gun in the cleaner’s locker. He does not know what to say and only holds your hand a long while.', { network: 6, sanity: 2 }), C('Báo Capo ngay, đúng quy định', 'Report to the Capo at once, by the book', 'Capo ưng bụng vì bạn trình báo kịp lúc để phạt nặng hắn. Cả năm sau đó hắn tuyệt giao không mở miệng với bạn nửa lời.', 'The Capo is pleased you reported, and he is fined heavily. He says nothing to you for the following year.', { rep: 4, network: -6, sanity: -3 })],
    I('Bạn lắc đầu và nói bạn không biết gì.', 'You shake your head and say you know nothing.'), { theme: 'work' }),
  M('m_thumb_night_watch_radio', AGE.GROWN, fneed(T, 0),
    '[Máy thu thanh ca đêm] Trực đêm trong kho, bạn dò trúng bài hát cũ phát từ đài xa kể về miền đất mặt trời lặn ở hướng khác. Bạn vội tắt máy trước giờ đổi gác.',
    '[Radio on the night watch] On the night shift at the store, you catch an old song from a distant station. The singer sings of a place where the sun sets in another direction. You switch it off before the next guard arrives.',
    [C('Ghi lại tên bài hát trên mu bàn tay', 'Write the song’s name on the back of your hand', 'Bạn chẳng bao giờ tìm nghe lại được bài hát ấy nữa; dòng mực vẫn bám nguyên trên tay tới ngày bị bụi bẩn xóa nhòa.', 'You never find the song again, but the ink stays until your hand gets dirty.', { sanity: 3 }), C('Quên bài hát', 'Forget the song', 'Bạn ép mình nhìn chằm chằm vào cửa kho. Tới sáng bạn phát bực vì giai điệu ấy vẫn văng vẳng trong đầu.', 'You focus on the store door. By morning it irritates you how much of the tune you still remember.', { sanity: -1 })],
    I('Bạn tắt đài và ngồi lặng.', 'You switch off the radio and sit still.'), { theme: 'work' }),
  M('m_thumb_ammo_inspection', AGE.GROWN, fneed(T, 1),
    '[Kiểm kê đạn cuối năm] Cuối năm Sottocapo tự tay kiểm đếm từng viên đạn. Bạn phát hiện tổ mình dư hẳn mười hai viên so với sổ sách, thừa hiểu thừa đạn cũng đáng ăn phạt chẳng kém thiếu đạn.',
    '[Year-end ammunition count] Year end is when the Sottocapo counts every round. You notice your team holds twelve more than the ledger shows, and know that surplus is as punishable as shortage.',
    [C('Báo dư và nộp lại', 'Report the surplus and hand it in', 'Sottocapo ghi biên bản miễn phạt, đổi lại từ đó ông điều người tới kiểm đột xuất tổ bạn dày hơn hẳn các tổ khác.', 'The Sottocapo notes it and does not fine you, but next time he sends surprise counters to your team more often than to others.', { rep: 3, sanity: 1 }), C('Giấu mười hai viên vào một chỗ khác', 'Hide the twelve rounds somewhere else', 'Số liệu khớp phóc cho buổi kiểm kê qua êm. Mười hai viên đạn nằm chỗ chỉ riêng bạn hay để rồi bạn quen dần cảm giác giữ một thứ ngoài sổ.', 'The count matches, the audit passes. The twelve rounds lie where only you know, and you begin living with something that is not in the ledger.', { sanity: -3, heat: 2 })],
    I('Bạn ký xác nhận và để cho Sottocapo đếm.', 'You sign and let the Sottocapo count.'), { theme: 'work' }),
  M('m_thumb_apology_gift', AGE.GROWN, fneed(T, 1),
    '[Quà xin lỗi] Tay Capo trẻ gửi biếu chai rượu kèm thư xin lỗi chuyện từng nói xấu sau lưng bạn. Người đưa tin dặn thêm anh ta rất thành khẩn khi giá chai rượu đắt hơn cả tháng lương.',
    '[An apology gift] A young Capo sends you a bottle of liquor and an apology for speaking ill of you behind your back. The messenger adds that he is very sincere, and the bottle costs more than a month of his pay.',
    [C('Nhận và mời anh ta uống chung', 'Accept and invite him to share it', 'Hai người cạn sạch chai rượu trong một buổi chiều rồi anh ta thú thật lý do sâu xa.', 'The two of you finish the bottle in one afternoon, and he tells the real reason.', { network: 7, sanity: 2, rep: 2 }), C('Gửi trả, nói lời xin lỗi là đủ', 'Send it back, saying the apology is enough', 'Anh ta nhận lại chai rượu với vẻ nhẹ nhõm lạ lùng. Từ dạo ấy chạm mặt bao giờ anh ta cũng chào trước nhưng tránh nhìn thẳng mắt bạn.', 'He takes it back with a strange relief. From then on he always greets you first, and never looks you in the eye.', { rep: 3, sanity: 1 })],
    I('Bạn đặt chai rượu lên kệ và để đó.', 'You set the bottle on a shelf and leave it.'), { theme: 'work' }),
  M('m_thumb_underboss_gaze', AGE.GROWN, fneed(T, 2),
    '[Ánh mắt của Underboss] Giữa buổi họp, Underboss liếc nhìn bạn đúng một thoáng rồi quay đi. Chẳng ai khác kịp nhận ra, riêng bạn biết thừa trong ánh nhìn ấy ẩn chứa một câu hỏi mình chưa kịp đoán.',
    '[The Underboss’s glance] In the meeting, the Underboss looks at you once, very briefly, then turns away. No one else sees, but you know there was a question in it, and you do not yet know what.',
    [C('Tìm cơ hội hỏi trực tiếp sau buổi họp', 'Seek a chance to ask him directly afterward', 'Ông đáp câu hỏi chỉ đáng thốt ra khi người ta chưa biết đáp án. Bạn đứng chôn chân nhìn cánh cửa khép lại mà quên bẵng mình đang nín thở.', 'He replies that a question is only worth asking when you do not yet know the answer. You watch the door close and do not notice you are holding your breath.', { sanity: -3, rep: 3 }), C('Đợi, xem ông có hỏi lần nữa không', 'Wait to see if he asks again', 'Ông chẳng hỏi lại nữa. Trọn một năm sau bạn tua lại cái liếc mắt ấy hàng trăm lần vẫn không tìm nổi đáp án.', 'He does not ask again. For a year afterward you replay that glance hundreds of times without finding any answer.', { sanity: -4 })],
    I('Bạn giả vờ không nhận ra.', 'You pretend not to notice.'), { theme: 'work' }),
  M('m_thumb_charity_envelope', AGE.GROWN, fneed(T, 2),
    '[Phong bì từ thiện] Quý nào Underboss cũng bắt từng Capo đóng phong bì góp vào quỹ trẻ mồ côi của The Thumb. Kỳ này bạn nhận danh sách từng đứa trẻ, bất ngờ thấy một đứa trùng tên người cũ bạn từng biết.',
    '[Charity envelope] The Underboss requires each Capo to give an envelope to the Thumb’s orphan fund each quarter. This time you receive a list of specific children, and one carries the name of someone you once knew.',
    [C('Đến thăm đứa trẻ, đưa phong bì tận tay', 'Visit the child and hand over the envelope yourself', 'Đứa nhỏ mang đôi mắt giống hệt người năm xưa. Nó đón lấy phong bì mà chẳng biết bạn là ai; bạn cũng chẳng nói cho nó hay.', 'The child has exactly the same eyes as your old friend. It takes the envelope without knowing who you are.', { wealth: -6, sanity: 5, network: 3 }), C('Gửi qua quỹ như thường lệ', 'Send it through the fund as usual', 'Tiền bạc tới đúng tay người nhận. Chẳng ai cảm ơn bạn vì bạn cũng chẳng mong ai nhớ.', 'The money reaches its destination. Nobody thanks you, and you do not expect anyone to.', { wealth: -4, sanity: 1 })],
    I('Bạn đặt phong bì lên bàn và quay đi.', 'You set the envelope on the desk and turn away.'), { theme: 'work' }),
  M('m_thumb_corner_table', AGE.GROWN, fneed(T, 1),
    '[Chiếc bàn ở góc quán] Quán cà phê quen của hội luôn chừa riêng chiếc bàn trong góc cho bậc Capo trở lên. Hôm nay có người lạ ngồi ngay đó nhâm nhi cà phê như chẳng hay biết gì khiến ông chủ quán liếc nhìn bạn cầu cứu.',
    '[The corner table] The crew’s usual cafe always keeps a corner table for Capo and above. Today a stranger sits there sipping coffee slowly as if knowing nothing. The owner glances at you pleadingly.',
    [C('Mời người ấy sang bàn khác, lịch sự', 'Politely invite them to another table', 'Người ấy nhún vai đổi bàn ngay. Ông chủ quán lẳng lặng mang tặng bạn thêm đĩa bánh không tính tiền.', 'They shrug and move. The owner sets down an extra plate of pastry for you at no charge.', { rep: 2, network: 2 }), C('Ngồi xuống cùng người ấy, nói chuyện', 'Sit down with them and talk', 'Hóa ra họ mới dọn tới thành phố nên chưa nghe danh The Thumb bao giờ. Hai người trò chuyện suốt hai tiếng khiến bạn quên khuấy luôn vai vế mình.', 'It turns out they are new to the City and have never heard of the Thumb. The talk runs two hours, and you find you have forgotten your role entirely.', { sanity: 4, network: 3 })],
    I('Bạn chọn một bàn khác và uống cà phê một mình.', 'You pick another table and drink your coffee alone.'), { theme: 'work' }),
  M('m_thumb_inheritance_dispute', AGE.GROWN, fneed(T, 1),
    '[Tranh chấp thừa kế] Hai người con trai của Soldato quá cố cãi vã chuyện tiền tuất với căn nhà cha để lại. Theo lệ The Thumb, mâu thuẫn trong nhà hội viên do Capo đứng ra xử; hôm nay Capo bận nên đẩy sang bạn.',
    '[A dispute over inheritance] Two sons of a late Soldato quarrel over his pension and the house he left. By Thumb custom, disputes within a member’s family are judged by the Capo, and today the Capo is busy, so the task falls to you.',
    [C('Chia đôi, bất kể lý lẽ', 'Split in half regardless of argument', 'Cả hai anh em đều hơi hậm hực.', 'Both are slightly dissatisfied.', { rep: 3, network: 4 }), C('Hỏi từng người về ông già lúc còn sống rồi mới quyết', 'Ask each about the old man’s life before deciding', 'Chưa kể dứt câu cả hai đã bật khóc. Cuối buổi tự họ đề xuất chia đều cho đôi bên để bạn chỉ việc gật đầu khép sổ.', 'Both cry before finishing. By the end they propose an even split themselves, and you need only nod to close the book.', { sanity: 3, rep: 4, network: 5 })],
    I('Bạn đưa vụ việc về Capo xử lý.', 'You pass the matter back to the Capo.'), { theme: 'work' }),
  M('m_thumb_cold_message', AGE.GROWN, fneed(T, 2),
    '[Lời nhắn lạnh] Người truyền tin của Underboss đặt lên bàn bạn mẩu giấy ghi vỏn vẹn địa chỉ kèm giờ hẹn không chữ ký. Luật The Thumb buộc bạn phải có mặt đúng giờ, đồng thời cấm tuyệt không được hỏi lý do.',
    '[A cold message] The Underboss’s courier sets a slip on your desk: an address, an hour, no signature. By Thumb rule you must go, and the rule also says you may never ask why.',
    [C('Đến đúng giờ, không hỏi', 'Go at the hour and ask nothing', 'Căn phòng chỉ kê độc chiếc ghế bên ly nước lọc. Bạn ngồi đợi hai tiếng chẳng thấy bóng ai trước khi người truyền tin ghé ghi nhận bạn đã có mặt. Đích đến hóa ra chỉ có vậy.', 'The room holds only a chair and a glass of water. You wait two hours, no one comes, then the courier records that you arrived. That was the whole point.', { rep: 4, sanity: -3 }), C('Đến sớm một giờ, quan sát nơi hẹn', 'Arrive an hour early and survey the place', 'Bạn bắt gặp hai kẻ khác làm động tác y hệt ngay góc đường đối diện. Ba người nhìn nhau trong im lặng để rồi bạn hiểu buổi hẹn này là bài thử chung cho cả ba.', 'You see two others doing exactly the same from the opposite corner. The three of you regard each other in silence, and you understand this meeting is a test for all of you.', { rep: 2, sanity: -2, network: 2 })],
    I('Bạn cất mảnh giấy vào túi và quên đi.', 'You pocket the slip and forget it.'), { theme: 'work' }),
  M('m_thumb_silent_toast', AGE.GROWN, fneed(T, 0),
    '[Chén rượu lặng] Cuối bữa cơm của hội, cả bàn lẳng lặng nâng ly không nói nửa lời tưởng nhớ người đã khuất đúng như lệ cũ.',
    '[The silent toast] At the end of the crew’s dinner, everyone raises a glass without a word for someone dead, by old custom.',
    [C('Nâng ly cùng mọi người, giữ im', 'Raise your glass with the rest and keep still', 'Cả phòng cùng uống cạn trên một nhịp.', 'The whole room drains together on one beat.', { sanity: 2, network: 2 }), C('Hỏi nhỏ người ngồi cạnh về người đã khuất', 'Whisper to your neighbor to ask about the dead', 'Họ thì thầm trả lại một cái tên để rồi bạn nhớ mãi suốt nhiều tháng sau.', 'They give you a name, and you remember it for months.', { sanity: -1, network: 3 })],
    I('Bạn uống cạn và ngồi lặng.', 'You drain your glass and sit still.'), { theme: 'work' })
];

export const THUMB_DAILIES = [
  D('d_thumb_ledger_ink', AGE.GROWN, fneed(T, 0), 'Mực trong sổ cống nạp chưa kịp khô lúc Capo gập lại. Một vệt đen in lem sang trang đối diện, chạm đúng dòng tên bạn.', 'The ink in the tribute ledger is not yet dry when the Capo folds it shut. A black smear prints onto the facing page, right over the line bearing your name.', {}),
  D('d_thumb_coat_check', AGE.GROWN, fneed(T, 0), 'Ngoài cửa quán, người giữ áo đón lấy áo khoác rồi nhìn chằm chằm vào vết trên vạt lót lâu hơn cần thiết một giây trước khi mỉm cười trao thẻ.', 'At the tavern door, the coat check takes your coat and glances at one place on the lining a second longer than necessary. Then smiles, and hands you the ticket.', {}),
  D('d_thumb_bullet_count', AGE.GROWN, fneed(T, 0), 'Bạn đếm số đạn trong băng ba lượt trước khi ngủ, lần nào cũng khớp một con số. Thói quen ấy bám lấy từ lúc nào chẳng nhớ nổi.', 'You count the rounds in the magazine three times before sleeping, and each time reach the same number. You no longer recall when that habit began.', {}),
  D('d_thumb_cigar_smoke', AGE.GROWN, fneed(T, 1), 'Mùi khói xì gà từ phòng họp ám chặt vạt áo tới tận hôm sau. Ngồi trên tàu điện, hành khách bên cạnh nhích hẳn sang nửa ghế chẳng ai mở lời.', 'Cigar smoke from the meeting room clings to your coat until the next day. On the tram the person beside you shifts half a seat away and neither speaks.', {}),
  D('d_thumb_shoeshine_boy', AGE.GROWN, fneed(T, 0), 'Thằng bé đánh giày đầu ngõ liếc đôi bốt da là biết ngay cấp bậc nên thoăn thoắt chải bóng mà không hé miệng hỏi tiền.', 'The shoeshine boy at the head of the street never asks a price. He looks at your boots and knows your rank, polishing swiftly in silence.', {}),
  D('d_thumb_tram_seat', AGE.GROWN, fneed(T, 0), 'Trên tàu điện, chỗ ngồi sát cửa bao giờ cũng chừa trống đợi bạn bước lên. Chẳng ai thắc mắc vì sao; bạn cũng thôi hỏi chính mình từ lâu.', 'On the tram, a seat near the door is always empty when you board. Nobody asks why, and you stopped asking yourself long ago.', {}),
  D('d_thumb_funeral_flower', AGE.GROWN, fneed(T, 0), 'Bó hoa trắng đặt trước cửa nhà hội viên quá cố hôm nay đã héo rũ. Bạn đi ngang qua đặt lên bậc thềm đồng xu đúng như lệ cũ.', 'A bunch of white flowers lies outside a dead member’s door, dry today. You pass and set a coin on the step, as custom taught.', {}),
  D('d_thumb_rain_stripe', AGE.GROWN, fneed(T, 0), 'Nước mưa ngoài kho đạn kéo vệt dài trên kính. Bạn ngắm dòng nước chảy mà sực nhớ lâu lắm rồi mình không biết ngắm mưa mà không đếm thầm thứ gì.', 'Rain outside the armory runs in a straight line down the glass. You watch it fall and realize you cannot remember the last time you watched rain without counting something.', {}),
  D('d_thumb_bar_stool', AGE.GROWN, fneed(T, 1), 'Chiếc ghế quầy bar quen thuộc bị kẻ lạ mặt ngồi mất. Ông chủ quán liếc nhìn bạn rồi chậm rãi lau kỹ chiếc ly thủy tinh.', 'Your usual bar stool is taken by a stranger. The owner watches you, and you see him begin wiping a glass very carefully, very slowly.', {}),
  D('d_thumb_midnight_call', AGE.GROWN, fneed(T, 1), 'Điện thoại kho đạn đổ đúng ba hồi lúc nửa đêm rồi tắt lịm. Đó là mật hiệu báo có người tới hoặc vừa rời đi mà bạn chưa từng hỏi.', 'The armory phone rings exactly three times at midnight and stops. It is a signal someone is arriving, or has already left, and you have never asked.', {}),
  D('d_thumb_cuff_links', AGE.GROWN, fneed(T, 1), 'Khuy măng sét bạc của bạn xước nhẹ sau cú quẹt lan can. Bạn đánh bóng mãi mà vết xước vẫn lì ra đó như cột mốc nhỏ.', 'Your silver cufflink is scratched from a knock against a railing. You polish it, but the scratch remains like a small landmark.', {}),
  D('d_thumb_tea_server', AGE.GROWN, fneed(T, 0), 'Người hầu trà trong phòng họp lúc nào cũng rót cho bạn sau chót lại rót đầy tràn nhất.', 'The tea server in the meeting room always pours for you last and fills yours fullest.', {}),
  D('d_thumb_phone_booth', AGE.GROWN, fneed(T, 0), 'Từ bốt điện thoại góc phố bạn bấm gọi dãy số không người nhận. Sau ba tiếng chuông, giọng quen vang lên đúng một chữ: được. Bạn đặt máy.', 'You dial a number with no listener from the phone booth at the corner. Three rings, then a familiar voice says exactly one word: understood. You hang up.', {}),
  D('d_thumb_bakery_loaf', AGE.GROWN, fneed(T, 0), 'Lò bánh đầu phố sáng thứ Hai nào cũng chừa sẵn cho bạn ổ bánh mì nguội vì một ân huệ cũ bạn chẳng nhớ nổi. Bạn vẫn nhận mà không từ chối.', 'The bakery at the head of the street saves you a cold loaf each Monday morning, for a favor you once did them that you can no longer recall.', {}),
  D('d_thumb_street_lamp', AGE.GROWN, fneed(T, 0), 'Bóng đèn đường ngoài ngõ sau kho đạn chớp tắt theo nhịp điệu quen tai tới mức bạn thuộc lòng. Hễ đèn đứng bóng là biết ca trực sắp đổi.', 'The streetlamp in the alley behind the armory flickers in a familiar rhythm you have learned by heart. When it stops, you know the shift is about to change.', {}),
  D('d_thumb_mirror_tie', AGE.GROWN, fneed(T, 1), 'Đứng thắt cà vạt trước gương, bạn không nhớ nổi lần cuối làm việc này mà đầu chẳng bận nghĩ tới cuộc họp. Hôm nay cũng lại có một cuộc họp y như mọi ngày.', 'You knot your tie in the mirror and cannot recall the last time you did it without thinking of a meeting. Today there is a meeting too, and it is the same as ever.', {}),
  D('d_thumb_old_photo', AGE.GROWN, fneed(T, 0), 'Tấm ảnh cũ chụp chung cả tổ rơi tuột khỏi trang sổ. Trong ảnh góp mặt bốn người nhưng bạn chỉ gọi nổi tên hai.', 'An old group photo slides out of a ledger. There are four people in it, but you can only recall the names of two.', {}),
  D('d_thumb_sausage_stand', AGE.GROWN, fneed(T, 0), 'Ông bán xúc xích góc phố gọi bạn bằng thứ biệt danh lạ hoắc chưa từng nghe ai kêu. Bạn chỉ gật đầu mua lấy một xiên.', 'The sausage vendor at the corner calls you by a nickname you have never heard anyone use. You nod and buy a skewer.', {}),
  D('d_thumb_cold_hand', AGE.GROWN, fneed(T, 1), 'Bàn tay Sottocapo lạnh ngắt lúc siết tay bạn, thứ hơi lạnh vô hồn của kẻ quen hạ lệnh xử tử. Bạn lặng lẽ rụt tay giấu sâu vào túi áo khoác.', 'The Sottocapo’s hand is cold when he grips yours, devoid of warmth. You withdraw your hand and tuck it deep into your coat pocket.', {}),
  D('d_thumb_hat_tip', AGE.GROWN, fneed(T, 0), 'Gã Soldato lạ mặt bên kia đường khẽ chạm vành nón chào nên bạn gật đáp theo phản xạ. Tới tối mới sực nhớ đó chính là tay súng từng bắn hụt mình ba năm trước.', 'A Soldato you do not know tips his hat at you across the street, and you answer by reflex. Only that evening do you remember he was the one who missed you three years ago.', {}),
  D('d_thumb_pay_envelope', AGE.GROWN, fneed(T, 0), 'Phong bì lương tháng này mỏng hơn tháng trước đôi chút mà chẳng ai giải thích. Bạn đếm kỹ hai lượt rồi ký nhận như thường lệ.', 'This month’s pay envelope is a little lighter than last month’s, and no one explains. You count twice and sign as usual.', {}),
  D('d_thumb_elevator_music', AGE.GROWN, fneed(T, 2), 'Thang máy lên văn phòng Underboss phát khúc nhạc khẽ tới mức bạn phải nín thở mới nghe ra.', 'The lift to the Underboss’s office plays music so softly you have to hold your breath to hear it.', {}),
  D('d_thumb_ash_tray', AGE.GROWN, fneed(T, 1), 'Gạt tàn trên bàn họp lúc nào cũng ngập đầu lọc từ trước giờ khai mạc, quyện mùi khói đặc che giấu nỗi căng thẳng của những cái đầu lọc lõi.', 'The ashtray on the meeting table is already full of stubs before the session begins, heavy smoke masking the tension in the room.', {}),
  D('d_thumb_nest_gate', AGE.GROWN, fneed(T, 0), 'Lính gác cổng Nest soi thẻ của bạn quá lâu rồi trả lại không nửa lời. Bạn nghe tiếng họ rì rầm sau lưng lúc quay bước nhưng không ngoái đầu.', 'The guard at the Nest gate studies your pass too long and returns it without a word. You hear them whisper as you turn away, and do not turn back.', {}),
  D('d_thumb_birthday_card', AGE.GROWN, fneed(T, 0), 'Trong ngăn kéo bàn nằm sẵn tấm thiệp chúc mừng sinh nhật không rõ tên người gửi, viết vỏn vẹn một dòng. Nét chữ ấy hình như bạn từng thấy đâu đó trong sổ cái.', 'In your drawer lies a birthday card from an unknown sender with a single line. You have seen that handwriting somewhere in the ledger.', {}),
  D('d_thumb_dark_window', AGE.GROWN, fneed(T, 1), 'Tháng nào cũng vậy, hễ đúng ngày bạn tới thu cống nạp thì ô cửa sổ tầng ba nhà trọ nọ tắt ngóm đèn, bạn rời đi mới bật sáng lại. Chẳng bao giờ bạn biết ai sống sau ô kính đó.', 'The third-floor window of a boarding house in the district where you collect goes dark each month the day you come and lights up when you leave. You have never known who lives inside.', {}),
  D('d_thumb_knot_tie', AGE.GROWN, fneed(T, 0), 'Bạn thắt dây giày theo đúng kiểu nút cũ ông thầy dạy nghi thức từng chỉ. Người lạ đi ngang liếc thấy bèn gật đầu khẽ như nhận ra ám hiệu.', 'You tie your shoelaces in the old knot the etiquette teacher showed you. A stranger notices and nods very slightly, as if recognizing something.', {}),
  D('d_thumb_dock_foghorn', AGE.GROWN, fneed(T, 0), 'Còi sương mù ngoài bến rống lên ba hồi dài, ngắn rồi lại dài. Đó là hiệu lệnh băng khác khiến đám Soldato quanh bạn đồng loạt nín bặt.', 'The fog horn at the pier sounds three times, long, short, long. It is another crew’s signal, and you see the Soldato around you stop talking at once.', {}),
  D('d_thumb_ink_blot', AGE.GROWN, fneed(T, 1), 'Bạn lỡ tay làm rớt giọt mực xuống biên bản họp. Chẳng ai để ý, chỉ mình bạn biết giọt mực đọng trúng tên người tuần sau không còn có mặt ở đây.', 'You spill a drop of ink on the meeting minutes. No one notices, but you know the drop lies right on the name of someone who will not be here next week.', {}),
  D('d_thumb_quiet_corridor', AGE.GROWN, fneed(T, 2), 'Hành lang dẫn vào phòng Underboss tĩnh mịch tới độ vang rõ từng nhịp đế giày. Bạn đếm đủ mười bảy bước rồi dừng khựng trước cửa.', 'The corridor leading to the Underboss’s room is so quiet you hear your own shoes. You count exactly seventeen steps and stop at the door.', {}),
  D('d_thumb_wire_service', AGE.GROWN, fneed(T, 0), 'Bức điện báo gửi về văn phòng vỏn vẹn ba chữ kèm một con số. Cả tổ liếc nhìn nhau thật nhanh rồi ai nấy lại cúi xuống việc riêng như chẳng hề hay biết.', 'A wire arrives at the office carrying three words and a number. The whole team glances at one another very quickly, then each returns to their work as if nothing had been seen.', {})
];
