// The Index: Prescripts. An order arrives on silk with an hour and a place, and no reason. A
// Proselyte follows it, a Messenger delivers it, a Proxy carries it out, and a Weaver is the one who
// is meant to understand it. Every mission here asks one question: follow the Prescript exactly, or
// bend it. Both answers are remembered by whoever reads the next one.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

const X = 'Index';

export const INDEX_EVENTS = [
  // ------------------------------------------------------------------ missions
  fe('index_red_umbrella', X, [0, 3],
    '[Chiếc ô đỏ] Prescript của đêm nay chỉ có ba dòng: mua một chiếc ô đỏ ở sạp đầu phố, đứng dưới cột đèn số bảy lúc 11:20, và đưa nó cho người đầu tiên bước ra khỏi con hẻm đối diện. Trời không mưa, và bạn thấy trên giấy một vệt sáp niêm đã khô.',
    '[The red umbrella] Tonight’s Prescript has three lines: buy a red umbrella at the stall at the head of the street, stand under lamp post number seven at 11:20, and hand it to the first person who steps out of the alley opposite. It is not raining, and you see a dried seal of wax on the paper.',
    [
      fc('Làm đúng từng dòng, không thêm gì', 'Do each line exactly, adding nothing',
        'Người bước ra là một bà lão ôm một con mèo ướt. Bà nhận chiếc ô mà không hỏi, rồi nói bà đã chờ ba năm để có ai đó đưa cái này. Bà đi, và trời bắt đầu mưa đúng lúc bà dừng dưới đèn.',
        'The first person out is an old woman cradling a wet cat. She accepts the umbrella without a question and says she has waited three years for someone to give her this. She leaves, and rain starts just as she stops under the lamp.',
        { rep: 4, sanity: 2, network: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Đứng chờ nhưng giữ lại chiếc ô, đưa chiếc khác', 'Wait there but keep the umbrella and hand over a different one', [
        [50, 'Người bước ra không nhận ra sự khác biệt, và Prescript vẫn được ghi là hoàn thành. Nhưng suốt tuần sau bạn không ngủ ngon, vì bạn cầm chiếc ô đỏ trong tủ mà không biết nó thuộc về ai.', 'The one who steps out does not notice the difference, and the Prescript is logged as completed. But all the next week you sleep badly, because you keep the red umbrella in a closet without knowing who it belonged to.', { sanity: -5, rep: 2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Người bước ra nhìn chiếc ô một lúc rồi trả lại, nhẹ nhàng, như thể đã nhận ra. Ba ngày sau một Messenger đến hỏi bạn vì sao chiếc ô ấy không phải là chiếc đã ghi.', 'The person looks at the umbrella a moment, then hands it back gently, as if they had recognized it. Three days later a Messenger calls to ask why that umbrella is not the one on record.', { rep: -6, sanity: -6, heat: 5 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Mở ô và đứng dưới nó chờ người đến', 'Open it and wait underneath for the person',
        'Bạn đứng dưới chiếc ô đỏ suốt mười phút trong đêm khô ráo. Người bước ra nhìn bạn, nhìn chiếc ô, và bật cười rất nhỏ. Họ nhận lấy, và bạn thấy họ cầm ô theo cách người ta cầm một lá thư cũ.',
        'You stand under the red umbrella ten minutes on a dry night. The person who steps out looks at you, looks at the umbrella, and laughs quietly. They take it, and you see they hold it the way one holds an old letter.',
        { sanity: 3, rep: 2, network: 2 }, { flagsAdd: ['index_obeyed'] })
    ], { weight: 10 }),

  fe('index_two_prescripts', X, [1, 3],
    '[Hai Prescript trong một đêm] Hai tờ Prescript nằm trên bàn bạn, cùng một chữ ký, cùng một sợi chỉ vàng. Tờ thứ nhất bảo bạn ở nhà đến sáng. Tờ thứ hai bảo bạn có mặt ở cổng bến lúc nửa đêm. Không tờ nào ghi giờ phát hành, và bạn biết chỉ một tờ có thể là thật.',
    '[Two Prescripts in one night] Two Prescripts lie on your desk, same signature, same golden thread. The first tells you to stay home until morning. The second tells you to be at the pier gate at midnight. Neither records an issue time, and you know only one can be real.',
    [
      fg('Ở nhà như tờ thứ nhất', 'Stay home as the first one says', [
        [55, 'Bạn ngồi cả đêm nhìn đồng hồ. Sáng ra, một Proxy gõ cửa và nói tờ thứ hai là bài kiểm tra: người nào đi đã không qua.', 'You sit all night watching the clock. In the morning a Proxy knocks and says the second was a test: anyone who went failed.', { rep: 6, sanity: -2 }, { flagsAdd: ['index_obeyed'] }],
        [45, 'Sáng ra bạn nghe tin có người đã ra bến lúc nửa đêm và được Weaver chọn để tiến cấp. Tờ thứ nhất hóa ra mới là bài kiểm tra. Bạn đã chọn đúng, theo nghĩa thuận theo, và sai theo nghĩa còn lại.', 'In the morning you hear someone went to the pier at midnight and was chosen by the Weaver for advancement. The first was the test after all. You chose right in the sense of obedience, and wrong in the other sense.', { rep: -4, sanity: -5 }, { flagsAdd: ['index_obeyed'] }]
      ]),
      fg('Ra bến lúc nửa đêm như tờ thứ hai', 'Go to the pier at midnight as the second says', [
        [50, 'Ở cổng bến chỉ có một người, mang cùng sợi chỉ vàng trên tay áo. Hai người nhìn nhau, gật đầu, và không ai nói gì trong hai giờ. Khi trời sáng, người ấy đưa bạn một cuộn tơ nhỏ rồi đi.', 'At the pier gate stands only one person, wearing the same golden thread on their sleeve. You nod at each other and say nothing for two hours. When dawn comes, they hand you a small spool of silk and leave.', { rep: 7, network: 5, sanity: -3 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Cổng bến vắng tanh, và một Proxy đứng cách đó ba mươi bước, ghi chép. Bạn bị gọi lên nghe một bài giảng dài về sự tuân phục, và nhận một dòng cảnh cáo.', 'The pier gate is deserted, and a Proxy stands thirty paces off, taking notes. You are summoned to a long lecture on obedience and given a line of warning.', { rep: -8, sanity: -5 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Mang cả hai tờ đến hỏi Proxy', 'Take both to a Proxy and ask',
        'Proxy nhìn hai tờ, rồi cất cả hai vào ngăn kéo và nói bạn không cần làm gì cả. Bạn ra về và nhận ra đó có thể là đáp án đúng, hoặc cái sai tinh vi nhất.',
        'The Proxy studies both for a long time, files them in a drawer, and says you need do nothing. You leave realizing that may have been the right answer, or the most subtle wrong one.',
        { sanity: -3, rep: 1, network: 2 })
    ], { age: [24, 90] }),

  fe('index_wait_at_stop', X, [0, 3],
    '[Trạm xe không có xe] Prescript bảo bạn ngồi ở một trạm xe bỏ hoang từ 2:45 đến 4:10 sáng, không đọc, không hút thuốc, không nói chuyện với ai. Đã mười một năm không có tuyến xe nào ghé trạm này, và băng ghế vẫn còn ấm khi bạn ngồi xuống.',
    '[The stop with no bus] A Prescript tells you to sit at an abandoned bus stop from 2:45 to 4:10 in the morning, not reading, not smoking, speaking to no one. No route has stopped here in eleven years, and the bench is still warm when you sit down.',
    [
      fc('Ngồi đủ hai tiếng, không nhúc nhích', 'Sit the full time without moving',
        'Lúc ba giờ bốn mươi, một người đàn ông ngồi xuống đầu bên kia băng ghế và cũng không nói gì. Đến bốn giờ mười, ông đứng dậy, cúi đầu thật sâu rồi đi. Bạn không bao giờ biết ông là ai.',
        'At 3:40 a man sits at the other end of the bench and also says nothing. At 4:10 he rises, bows very deeply, and goes. You never learn who he was.',
        { rep: 3, sanity: 3, network: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Đọc một cuốn sách nhỏ để qua thời gian', 'Read a small book to pass the time', [
        [55, 'Không ai biết. Prescript vẫn được ghi hoàn thành, nhưng bạn đã không thể nhớ nổi một trang nào của cuốn sách, vì suốt hai giờ bạn chỉ nghe tiếng thở của mình.', 'Nobody knows. The Prescript is still logged as complete, but you cannot recall a single page of the book, because for two hours you heard only your own breathing.', { sanity: -2, rep: 1 }, { flagsAdd: ['index_deviated'] }],
        [45, 'Một Proxy đứng phía sau cột đèn cả đêm, và ghi lại từng trang bạn lật. Sáng hôm sau, bạn nhận được một bản kê chi tiết.', 'A Proxy stands behind a lamp post all night and records each page you turn. The next morning you receive a detailed list.', { rep: -7, sanity: -4, heat: 4 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Bỏ đi lúc ba giờ, nói không chịu nổi', 'Leave at three, saying you cannot stand it',
        'Bạn đi bộ về trong sương, và cả quãng đường nghe như có tiếng bước chân thứ hai bên cạnh. Sáng sau không ai nhắc gì, và bạn thấy yên tâm đến mức đáng ngờ.',
        'You walk home through fog, and the whole way it sounds as if a second set of footsteps keeps pace. In the morning no one mentions anything, and you feel suspiciously at ease.',
        { sanity: -5, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ]),

  fe('index_golden_letter', X, [0, 3],
    '[Lá thư tơ vàng] Một lá thư cuộn trong ống tre, buộc bằng chỉ vàng, phải đến tay một người ở District 14 trước khi chuông tối điểm. Trên đường, ba người lạ lần lượt hỏi bạn đang mang gì, và cả ba đều biết tên bạn.',
    '[The golden letter] A letter rolled in a bamboo tube, tied with golden thread, must reach someone in District 14 before the evening bell. On the way three strangers in turn ask what you are carrying, and all three know your name.',
    [
      fc('Không trả lời ai, đi thẳng', 'Answer no one and walk straight through',
        'Người thứ ba chặn bạn lại ở một cây cầu. Bạn nói bạn không biết ông ta là ai, và ông ta để bạn đi, như nghe một câu trả lời đã thuộc lòng. Bạn đến nơi khi chuông vừa chạm tiếng cuối.',
        'The third stops you on a bridge. You say you do not know him, and he lets you pass, as if hearing a memorized answer. You arrive just as the bell hits its last note.',
        { rep: 5, network: 4, sanity: -2 }, { flagsAdd: ['index_obeyed'] }),
      fg('Cho người thứ ba xem ống tre để họ tránh đường', 'Show the third stranger the tube so they step aside', [
        [50, 'Ông ta nhìn dấu sáp, cúi đầu, và nhường đường. Hóa ra ông là một Proxy đang kiểm tra bạn, và đã chờ đúng lúc này.', 'He studies the wax seal, bows, and yields. It turns out he is a Proxy checking on you, and has been waiting for exactly this moment.', { rep: 7, network: 6, sanity: -2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Ông ta giật lấy ống tre và biến vào đám đông. Bạn mất cả chuyến và phải giải thích với Messenger vì sao lá thư không tới.', 'He snatches the tube and vanishes into the crowd. You lose the whole delivery and must explain to the Messenger why the letter never arrived.', { rep: -9, sanity: -7, heat: 5 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Mở lá thư đọc thử một dòng', 'Open the letter and read a single line',
        'Dòng đầu chỉ có tên bạn, kèm một ngày tháng ba mươi năm sau. Bạn gấp thư lại với tay lạnh toát và đưa đến nơi, không nhìn người nhận. Cả đêm bạn nghĩ về ngày ấy.',
        'The first line holds only your name and a date thirty years ahead. You fold it shut with ice-cold hands and deliver it without looking at the recipient. All night you think about that date.',
        { sanity: -9, rep: 1 }, { flagsAdd: ['index_deviated'] })
    ]),

  fe('index_proselyte_defector', X, [1, 3],
    '[Proselyte bỏ Prescript] Một Proselyte trong tổ bạn đã không làm theo một Prescript đêm qua. Không ai biết vì sao, và cậu ta không chịu nói. Proxy giao bạn một nhiệm vụ nhạy cảm: nói chuyện với cậu ta trước khi có Prescript nào ra lệnh về cậu.',
    '[The Proselyte who defied a Prescript] A Proselyte on your team did not follow a Prescript last night. No one knows why, and he will not say. The Proxy gives you a delicate task: speak with him before any Prescript is issued about him.',
    [
      fc('Nghe cậu ta nói hết, không phán xét', 'Hear him out without judgment',
        'Cậu ta kể rằng Prescript bảo cậu đẩy một đứa trẻ ra khỏi lề đường lúc một chiếc xe tải đi qua, và cậu đã không làm. Bạn không biết cậu đúng hay sai. Bạn ghi vào báo cáo một nửa những gì cậu nói.',
        'He tells you the Prescript told him to push a child off the curb as a truck passed, and he did not. You do not know whether he is right or wrong. You write only half of what he said in your report.',
        { sanity: -6, network: 5, rep: 1 }, { flagsAdd: ['index_deviated'] }),
      fc('Báo đầy đủ cho Proxy', 'Report everything to the Proxy',
        'Proxy cúi đầu và nói chuyện này không phải của họ để quyết, vì hình phạt, nếu có, phải đến bằng một Prescript. Hai ngày sau cậu Proselyte được chuyển sang khu khác, và không ai nói đến chuyện đó nữa. Bạn ghi nhớ cái cách một chỗ trống được lấp lại rất nhanh.',
        'The Proxy nods and says this is not theirs to decide, since any punishment must arrive as a Prescript. Two days later the Proselyte is moved to another district, and no one speaks of it again. You note how quickly an empty place is filled.',
        { rep: 5, sanity: -5, network: -4 }, { flagsAdd: ['index_obeyed'] }),
      fg('Giúp cậu ta trốn khỏi khu vực', 'Help him slip out of the district', [
        [50, 'Bạn chỉ cho cậu một cửa sau đến tàu hàng. Cậu không bao giờ quay lại, và hai tháng sau bạn nhận được một tấm bưu thiếp không đề tên, chỉ vẽ một chiếc ô nhỏ.', 'You show him a back way to a freight train. He never returns, and two months later you receive an unsigned postcard with a small drawn umbrella.', { sanity: 3, network: 6, rep: -3 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Một Proxy đã đứng ở cổng tàu hàng từ trước. Cậu bị giữ, và tên bạn xuất hiện trên một tờ Prescript sáng hôm sau.', 'A Proxy was already standing at the freight gate. He is held, and your name appears on a Prescript the next morning.', { rep: -10, sanity: -8, heat: 8 }, { flagsAdd: ['index_deviated'] }]
      ])
    ], { age: [24, 90] }),

  fe('index_return_lost_item', X, [0, 2],
    '[Vật phải trả lại] Prescript: tìm người sở hữu một chiếc đồng hồ bỏ túi hỏng và trả lại trước ba ngày. Không có tên, chỉ một chữ cái khắc phía sau nắp, và một bức ảnh bị cắt mất một nửa. Bạn lần theo từng nhà ở bảy con phố.',
    '[An item to return] A Prescript: find the owner of a broken pocket watch and return it within three days. No name, only a letter engraved inside the lid, and a photograph cut in half. You trace it through seven streets, house by house.',
    [
      fc('Tìm đúng người, trả đúng cách', 'Find the right person and return it properly',
        'Người nhận là một góa phụ, và bà nhìn chiếc đồng hồ rất lâu trước khi cầm. Bà nói người cùng bà đi qua nửa đời đã đánh mất nó ba mươi năm trước. Bạn ngồi nghe bà kể trong một giờ, và trả lại tấm ảnh đã được ghép lại.',
        'The recipient is a widow, and she looks at the watch a long time before taking it. She says her husband lost it thirty years ago. You sit and listen to her for an hour, and hand back the photograph, now pieced together.',
        { sanity: 5, rep: 3, network: 4 }, { flagsAdd: ['index_obeyed'] }),
      fc('Giữ lại chiếc đồng hồ, báo là không tìm được', 'Keep the watch and report you could not find the owner',
        'Bạn đặt chiếc đồng hồ vào ngăn kéo. Nó không bao giờ chạy lại, nhưng đôi khi nửa đêm bạn nghe nó tích một tiếng, rồi thôi.',
        'You place the watch in a drawer. It never runs again, but sometimes at midnight you hear it tick once, then stop.',
        { sanity: -5, rep: -4 }, { flagsAdd: ['index_deviated'] }),
      fg('Bán chiếc đồng hồ rồi quyên tiền cho một nhà tế bần', 'Sell the watch and donate the proceeds to an almshouse', [
        [60, 'Số tiền không lớn, nhưng nhà tế bần ghi tên bạn vào sổ. Proxy thở dài và ghi chú rằng bạn là kiểu Proxy khó đoán.', 'The sum is small, but the almshouse enters your name in its ledger. The Proxy sighs and notes that you are an unpredictable kind of Proxy.', { sanity: 2, rep: 1, wealth: -3 }, { flagsAdd: ['index_deviated'] }],
        [40, 'Proxy tìm ra người chủ thật, và bạn bị gọi giải thích tại sao chiếc đồng hồ đã không còn.', 'The Proxy locates the real owner, and you are summoned to explain why the watch is gone.', { rep: -8, sanity: -5 }, { flagsAdd: ['index_deviated'] }]
      ])
    ], { age: [18, 70] }),

  fe('index_shadow_a_stranger', X, [1, 3],
    '[Người không biết mình bị theo] Prescript yêu cầu bạn theo một người lạ suốt một ngày, ghi lại từng nơi họ dừng lại, và không bao giờ để họ thấy bạn. Người ấy sống như bất cứ ai: mua bánh, đọc báo, đứng nhìn một con chó. Cuối ngày họ bước vào một nhà thờ, và đặt trước bàn thờ một chiếc hộp nhỏ.',
    '[Someone who does not know they are watched] A Prescript orders you to tail a stranger for one day, noting each place they stop, never letting them see you. They live like anyone: buy bread, read a paper, stand looking at a dog. At day’s end they enter a church and set a small box before the altar.',
    [
      fc('Ghi lại đủ và không can thiệp', 'Record it all and do not interfere',
        'Bạn viết bản báo cáo dài hai trang. Người ấy không bao giờ biết, và bạn không bao giờ biết lý do. Nhưng nhiều tuần sau, bạn thấy mình ghé qua nhà thờ ấy, và đứng nhìn một chiếc hộp nhỏ.',
        'You write a two-page report. The person never knows, and you never learn why. But weeks later you find yourself passing that church and standing before a small box.',
        { rep: 4, sanity: -3, network: 2 }, { flagsAdd: ['index_obeyed'] }),
      fg('Mở chiếc hộp sau khi người ấy đi', 'Open the box after they leave', [
        [50, 'Bên trong là một lọn tóc trẻ con và một mảnh giấy ghi ngày sinh. Bạn đặt lại hộp, nhưng bản báo cáo của bạn trống ở dòng cuối cùng, lần đầu tiên.', 'Inside lie a lock of a child’s hair and a slip with a birthday. You set the box back, but your report is blank on the last line for the first time.', { sanity: -6, rep: 1 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Một người khác đứng ở lối vào tối, ghi lại việc bạn mở hộp. Tuần sau Proxy gọi bạn lên và đưa một bản kê dài hơn bản báo cáo của chính bạn.', 'Another stands in the dark doorway, recording that you opened the box. The next week the Proxy calls you up and hands over a list longer than your own report.', { rep: -8, sanity: -5, heat: 4 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Tiến đến và nói chuyện với người ấy', 'Approach and speak to them',
        'Người ấy quay lại và không ngạc nhiên. Họ nói đã biết bạn theo từ sáng, và hỏi bạn có muốn ăn tối không. Bạn từ chối, nhưng bạn nghĩ về lời mời ấy suốt tuần.',
        'The person turns and shows no surprise. They say they knew you were following since morning, and ask whether you would like dinner. You decline, but think about the invitation all week.',
        { sanity: -4, network: 4, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ], { age: [22, 90] }),

  fe('index_flower_for_grave', X, [0, 3],
    '[Hoa cho một ngôi mộ] Prescript đưa bạn đến nghĩa địa phía bắc District 12 với một bó hoa trắng và địa chỉ của một ngôi mộ không bia. Bạn phải để hoa lúc 5:50 sáng, và không ai được thấy bạn. Khi bạn đến, đã có một bó hoa khác ở đó, còn tươi.',
    '[Flowers for a grave] A Prescript sends you to the northern cemetery of District 12 with white flowers and the address of a grave with no marker. You must lay them at 5:50 a.m. unseen. When you arrive, another bunch is already there, still fresh.',
    [
      fc('Đặt hoa của bạn cạnh bó hoa kia', 'Lay your flowers beside the other bunch',
        'Hai bó hoa nằm cạnh nhau trong sương. Bạn đứng thẳng một phút, và cảm giác như có người đang cùng làm việc ấy với bạn, ở một nơi nào đó mà bạn không thấy.',
        'Two bunches lie side by side in the mist. You stand straight for a minute, and feel as if someone is doing the same thing with you from somewhere you cannot see.',
        { sanity: 4, rep: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Đổi hoa cho nhau, mang bó tươi đi', 'Swap the bunches and carry the fresh ones away', [
        [50, 'Bạn mang bó hoa kia về nhà và đặt vào một chiếc bình. Hôm sau nó héo, và bạn nhận ra mình vừa làm điều gì đó rất bất kính mà không biết vì sao.', 'You carry the other bunch home and put it in a vase. By the next day it has wilted, and you realize you just did something deeply disrespectful without knowing why.', { sanity: -5, rep: -2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Một người phụ nữ đứng phía sau bia mộ, nhìn bạn hồi lâu. Bà không nói gì, nhưng lúc bạn đi, bà đặt lại bó hoa trắng lên mộ, thật chậm.', 'A woman stands behind another marker, looking at you for a long time. She says nothing, but as you leave she sets the white flowers back on the grave, very slowly.', { sanity: -4, network: -2, rep: -2 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Ở lại đến khi người kia đến lấy lại', 'Stay until the other person comes back',
        'Bạn đợi đến sáu giờ, rồi bảy giờ. Một người đàn ông đến lúc tám giờ, thấy bạn, và dừng lại ở cổng. Hai người nhìn nhau qua những hàng mộ, và ông ta cúi đầu thật nhẹ trước khi quay đi.',
        'You wait until six, then seven. A man arrives at eight, sees you, and stops at the gate. The two of you look at each other across the rows of graves, and he bows lightly before turning away.',
        { sanity: 2, network: 3, rep: 1 }, { flagsAdd: ['index_deviated'] })
    ]),

  fe('index_count_the_steps', X, [0, 3],
    '[Đếm bước chân] Prescript chỉ có một dòng: đi từ cổng nhà ga District 9 đến quảng trường chính, đếm từng bước, và dừng đúng bước thứ một nghìn hai trăm bốn mươi mốt. Bạn làm xong, và đứng giữa quảng trường vắng. Bên chân bạn có một sợi chỉ vàng nằm thẳng trên đá.',
    '[Counting the steps] A Prescript with a single line: walk from the District 9 station gate to the main square, count each step, and stop on exactly step twelve hundred and forty-one. You finish and stand in an empty square. At your feet a golden thread lies straight on the stones.',
    [
      fc('Nhặt sợi chỉ và mang về', 'Pick up the thread and carry it home',
        'Sợi chỉ nhẹ hơn bạn nghĩ. Bạn quấn nó quanh ngón tay và nhận ra đầu bên kia chưa bao giờ được cắt. Nó dẫn đi đâu đó mà bạn không dám theo.',
        'The thread is lighter than you expected. You wind it around a finger and realize the other end was never cut. It leads somewhere you do not dare follow.',
        { sanity: -3, rep: 3 }, { flagsAdd: ['index_deviated'] }),
      fc('Để nguyên, ghi vị trí vào báo cáo', 'Leave it and note its position in the report',
        'Bạn ghi vị trí chính xác từng bước và đi. Đêm đó mưa, và sáng hôm sau, sợi chỉ không còn ở đó. Không ai nói ai đã nhặt.',
        'You note the exact position to the step and leave. That night it rains, and the next morning the thread is gone. Nobody says who took it.',
        { rep: 4, sanity: 1 }, { flagsAdd: ['index_obeyed'] }),
      fg('Đi theo sợi chỉ thay vì dừng đúng bước', 'Follow the thread instead of stopping on the step', [
        [45, 'Sợi chỉ dẫn qua ba con hẻm đến một cánh cửa bằng gỗ, và sau cánh cửa là một phòng nhỏ có một chiếc ghế và một cuộn Prescript trắng. Bạn không biết ai để lại. Bạn ngồi đợi, và không ai đến.', 'The thread leads through three alleys to a wooden door, and behind the door is a small room with a chair and a blank scroll of Prescript. You do not know who left it. You sit and wait, and no one comes.', { sanity: -5, rep: 5, network: 3 }, { flagsAdd: ['index_deviated'] }],
        [55, 'Sợi chỉ chấm dứt ở một bức tường trơn. Bạn đứng đó cho đến khi trời tối, rồi quay về với cảm giác vừa bị chơi một trò đùa.', 'The thread ends at a bare wall. You stand there until dark, then head home feeling you have been played with.', { sanity: -4, rep: -2 }, { flagsAdd: ['index_deviated'] }]
      ])
    ]),

  fe('index_sealed_hour', X, [1, 3],
    '[Giờ bị niêm phong] Messenger đưa bạn một Prescript cuộn kín, dặn chỉ mở lúc 3:10 sáng. Bạn biết 3:10 là giờ Sweeper lang thang trong Backstreets, và Index chưa từng bắt ai ra ngoài vào giờ ấy. Đồng hồ trong phòng bạn chạy chậm vài phút.',
    '[The sealed hour] The Messenger hands you a rolled Prescript with instructions to open it at 3:10 a.m. You know 3:10 is when Sweepers roam the Backstreets, and the Index has never sent anyone out at that hour. The clock in your room runs a few minutes slow.',
    [
      fc('Mở đúng giờ và làm theo', 'Open it on time and obey',
        'Prescript bảo bạn ở yên trong phòng, tắt đèn, và ngồi hướng ra cửa sổ. Bạn ngồi ba mươi phút. Ngoài hẻm có tiếng bước chân đi qua, chậm, và dừng lại ngay trước cửa nhà bạn một nhịp rồi đi tiếp.',
        'The Prescript tells you to stay in the room, turn off the light, and sit facing the window. You sit for thirty minutes. In the alley footsteps pass, slow, and pause right at your door for one beat then move on.',
        { sanity: -6, rep: 5 }, { flagsAdd: ['index_obeyed'] }),
      fg('Mở sớm vài phút để chuẩn bị', 'Open it a few minutes early to prepare', [
        [55, 'Bạn đọc dòng đầu: ở yên trong phòng. Bạn thở ra, nhưng dòng thứ hai nói bạn đã mở sớm bốn phút, và đó là lý do tờ này tồn tại. Bạn bật cười rất khẽ, và không biết vì sao.', 'You read the first line: stay in your room. You exhale, but the second line says you opened it four minutes early, and that is why this one exists. You laugh very quietly, not knowing why.', { sanity: -3, rep: 3 }, { flagsAdd: ['index_deviated'] }],
        [45, 'Tờ Prescript tự cháy xém mép khi bạn mở sớm. Người đưa tin hôm sau không nói gì, nhưng từ đó bạn không nhận Prescript cuộn kín nữa.', 'The Prescript’s edges scorch as you open it early. The courier says nothing the next day, but from then on you are not handed sealed scrolls.', { sanity: -5, rep: -6 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Không mở, trả lại nguyên niêm phong vào sáng hôm sau', 'Leave it unopened and return it sealed the next morning',
        'Messenger nhận lại, nhìn niêm phong còn nguyên, và gật đầu không nói gì. Có điều gì đó trong cái gật ấy khiến bạn nghĩ mình vừa vượt qua một bài kiểm tra khác với bài đã được giao.',
        'The Messenger takes it back, sees the seal intact, and nods without a word. Something in that nod makes you think you just passed a different test than the one you were given.',
        { sanity: 1, rep: 4 }, { flagsAdd: ['index_deviated'] })
    ], { age: [24, 90] }),

  fe('index_chalk_marks', X, [0, 2],
    '[Vạch phấn trên phố] Prescript chỉ dẫn bạn vẽ bằng phấn trắng một ký hiệu nhỏ, hình một vòng tròn khuyết, ở mười hai nơi khác nhau trên phố, mỗi nơi cách nhau đúng bảy mươi lăm bước. Người dân tò mò nhìn, và một đứa trẻ hỏi bạn đó có phải là một trò chơi không.',
    '[Chalk marks on the street] A Prescript directs you to draw a small white symbol, a circle with a gap, at twelve different places on the street, each exactly seventy-five steps apart. Passersby watch curiously, and a child asks whether it is a game.',
    [
      fc('Nói đó là một trò chơi và để nó vẽ thêm một vạch', 'Say it is a game and let the child draw one mark',
        'Đứa trẻ vẽ ký hiệu thứ bảy bằng tay trái, hơi lệch. Bạn không chữa. Hôm sau, mười hai ký hiệu bị mưa rửa hết trừ cái thứ bảy, vẫn còn đó.',
        'The child draws the seventh mark with the left hand, a little crooked. You do not correct it. The next day rain washes away all twelve except the seventh, which remains.',
        { sanity: 4, network: 3, rep: 1 }, { flagsAdd: ['index_deviated'] }),
      fc('Vẽ đủ mười hai và bảo đứa trẻ đừng chạm', 'Draw all twelve and tell the child not to touch',
        'Đứa trẻ lùi lại, tuân theo. Mười hai ký hiệu hoàn thành đúng giờ. Bạn nhìn lại cả con phố và thấy chúng tạo thành một hình mà từ trên cao có lẽ mới thấy rõ.',
        'The child steps back, obeying. Twelve marks are finished on time. You look back at the whole street and see they form a shape that probably only shows from above.',
        { rep: 4, sanity: -1 }, { flagsAdd: ['index_obeyed'] }),
      fc('Vẽ mười một nơi, bỏ qua một nơi vì có người đang ngủ', 'Draw eleven and skip one where someone is sleeping',
        'Bạn đi vòng qua một người vô gia cư đang ngủ trên bậc thềm. Trên bản báo cáo bạn ghi mười hai, và không ai kiểm. Tối đó bạn đi qua đó lần nữa, và người ấy đã dậy, đang nhìn một vạch phấn xa xa.',
        'You skirt a homeless person sleeping on a step. On the report you write twelve, and no one checks. That evening you pass again, and the person is awake, looking at a chalk mark far down the road.',
        { sanity: 2, rep: -2 }, { flagsAdd: ['index_deviated'] })
    ], { age: [18, 70] }),

  fe('index_weight_of_prescript', X, [2, 3],
    '[Sức nặng của một Prescript] Một Prescript đến tay bạn, và lần đầu tiên bạn hiểu nó. Nó bảo đưa một người lạ vào một căn phòng, và người ấy sẽ không bước ra. Bạn biết lý do, vì bạn đã đọc đủ nhiều Prescript để thấy sợi dây nối chúng với nhau. Bạn biết điều đó không đáng là điều bạn muốn biết.',
    '[The weight of a Prescript] A Prescript reaches you, and for the first time you understand it. It tells you to lead a stranger into a room, and that person will not come out. You know why, because you have read enough Prescripts to see the thread connecting them. You know it is not something you wanted to know.',
    [
      fc('Làm đúng như Prescript', 'Do exactly as the Prescript says',
        'Người ấy nhìn bạn khi bước vào, rất bình tĩnh, như đã chờ lâu. Cửa đóng, và bạn đứng ở hành lang rất lâu sau đó. Bạn không khóc, nhưng bạn không còn nghe rõ tiếng chuông cuối ngày.',
        'The person looks at you as they enter, very calm, as if having waited long. The door closes, and you stand in the corridor for a long time afterward. You do not cry, but you no longer hear the day’s last bell clearly.',
        { rep: 7, sanity: -14, heat: 4 }, { flagsAdd: ['index_obeyed', 'index_led_the_stranger'] }),
      fg('Đưa người ấy vào phòng, nhưng cho họ biết trước', 'Lead them in, but tell them beforehand', [
        [55, 'Người ấy nghe xong, cười một nụ cười rất mệt, và nói đã đoán trước. Họ đưa bạn một phong bì, nhờ gửi đến một địa chỉ, rồi bước vào phòng một mình. Bạn gửi phong bì đúng ngày.', 'The person listens, smiles a very tired smile, and says they had guessed. They hand you an envelope, asking you to send it to an address, then step into the room alone. You send the envelope the same day.', { sanity: -8, rep: 3, network: 4 }, { flagsAdd: ['index_deviated', 'index_led_the_stranger'] }],
        [45, 'Người ấy hoảng sợ và bỏ chạy ra cửa. Hai Proxy đứng sẵn bên ngoài giữ họ lại, và bạn bị gọi vào văn phòng với giọng nói rất dịu của một người đã thất vọng.', 'The person panics and bolts for the door. Two Proxies waiting outside hold them back, and you are summoned to an office with the very gentle voice of someone disappointed.', { rep: -10, sanity: -9, heat: 6 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Từ chối thi hành Prescript này', 'Refuse to carry out this Prescript',
        'Bạn đặt tờ giấy xuống bàn và nói bạn không làm được. Người nhận im lặng một lúc, rồi cất tờ giấy vào một chiếc phong bì khác. Không ai trừng phạt bạn. Nhưng suốt một năm sau đó không có Prescript nào đến tay bạn nữa.',
        'You set the paper down and say you cannot. The recipient is silent a long while, then files the paper in a different envelope. Nobody punishes you. But for a whole year afterward no Prescript reaches your hands.',
        { sanity: 3, rep: -9, network: -5 }, { flagsAdd: ['index_deviated'] })
    ], { age: [30, 90], weight: 11 }),

  fe('index_mirror_proxy', X, [1, 3],
    '[Proxy giống bạn] Một Proxy mới đến tổ bạn, và bạn nhận ra họ cũng đứng nghiêng đầu khi nghĩ, cũng cắn môi dưới khi đọc Prescript. Một đồng nghiệp thì thầm rằng Index đôi khi chọn người giống nhau để thay thế. Không ai nói thay thế ai.',
    '[A Proxy like you] A new Proxy joins your team, and you notice they tilt their head when thinking, bite their lower lip when reading a Prescript, just as you do. A colleague whispers that the Index sometimes chooses similar people to replace one another. No one says who is replacing whom.',
    [
      fc('Làm quen và hỏi họ về quá khứ', 'Befriend them and ask about their past',
        'Họ kể về một ngôi nhà bên cạnh một nhà ga, một con chó và một người em gái. Bạn nhận ra mọi chi tiết, trừ một chi tiết: tên con chó. Bạn không hỏi thêm.',
        'They tell of a house beside a train station, a dog, and a younger sister. You recognize every detail except one: the dog’s name. You ask no more.',
        { sanity: -6, network: 5 }),
      fc('Giữ khoảng cách, làm việc riêng', 'Keep your distance and work alone',
        'Hai người làm việc cạnh nhau suốt một năm mà hiếm nói chuyện. Cuối năm Proxy ấy được chuyển đi, và bạn nhận ra trên bàn mình có một dòng ghi chú lạ bằng nét chữ giống nét chữ của chính mình.',
        'The two of you work side by side for a year and rarely speak. At year’s end the Proxy is transferred, and you find a strange note on your desk in handwriting that looks like your own.',
        { sanity: -4, rep: 1 }),
      fg('Báo cho Messenger về sự giống nhau', 'Tell the Messenger about the resemblance', [
        [50, 'Messenger ghi chú và nói đó là chuyện thường. Họ chuyển bạn sang tổ khác, và bạn không bao giờ gặp lại Proxy ấy. Hai năm sau bạn nghe nói người ấy đã trở thành Weaver.', 'The Messenger notes it and says it is common. They move you to another team, and you never see that Proxy again. Two years later you hear that person became a Weaver.', { rep: 3, sanity: -5, network: -3 }],
        [50, 'Messenger lặng đi rất lâu, rồi nói chuyện này không được phép nhắc nữa.', 'The Messenger is silent a long while, then says this is not to be raised again.', { rep: -4, sanity: -6, heat: 3 }]
      ])
    ], { age: [26, 90] }),

  fe('index_audit_of_deviation', X, [1, 3],
    '[Kiểm toán Prescript] Một Proxy trẻ, người chuyên giải nghĩa các Prescript, yêu cầu xem lại mọi Prescript bạn đã thi hành, từng cái một, và so với những gì khung cửi mong chờ. Cô ngồi đối diện bạn với một cuốn sổ rất dày.',
    '[Audit of the Prescripts] A young Proxy, one who interprets Prescripts, asks to review every Prescript you have carried out, one by one, against what the loom expected. She sits across from you with a very thick ledger.',
    [
      fc('Trả lời thành thật từng câu hỏi', 'Answer each question truthfully',
        'Cô lật từng trang, và mỗi lần bạn kể một chỗ đã đi chệch, cô gật đầu như đã biết. Cuối buổi cô nói khung cửi chưa bao giờ đòi hỏi tuân phục tuyệt đối. Nó đòi hỏi sự trung thực với lựa chọn của mình.',
        'She turns each page, and each time you describe a deviation she nods as if she already knew. At the end she says the loom never demanded perfect obedience. It demanded honesty about one’s own choice.',
        { sanity: 3, rep: 6, network: 4 }, { requires: [] }),
      fc('Nói bạn đã làm theo mọi Prescript đến từng chữ', 'Claim you followed every Prescript to the letter',
        'Cô mỉm cười và lật đến một trang có một ký hiệu nhỏ, kèm ngày giờ. Cô không nói gì thêm.',
        'She smiles and turns to a page marked with a small symbol, along with a date and hour. She says nothing more.',
        { sanity: -7, rep: -7 }),
      fg('Hỏi cô vì sao khung cửi cần kiểm toán', 'Ask her why the loom needs an audit at all', [
        [50, 'Cô nhìn bạn, rồi nói khung cửi không cần, nhưng các Proxy thì cần. Cô nói câu đó rất khẽ, như một lời thú nhận. Từ ngày ấy cô nhắn cho bạn vài lần nữa, mỗi lần chỉ một dòng.', 'She looks at you for a long time, then says the loom does not need it, but Proxys do. She says it quietly, like a confession. From then on she sends you a message a few more times, always a single line.', { rep: 5, network: 6, sanity: -2 }],
        [50, 'Cô đóng cuốn sổ, cúi đầu rất nhẹ, và nói buổi kiểm toán đến đây là hết. Bạn ra khỏi phòng và nhận ra mình không biết mình đã vượt qua hay đã trượt.', 'She closes the ledger, nods very slightly, and says the audit ends here. You leave the room unsure whether you passed or failed.', { sanity: -4, rep: 0 }]
      ])
    ], { age: [28, 90] }),

  fe('index_weaver_ask', X, [2, 3],
    '[Câu hỏi của Weaver] Một Weaver gọi bạn xuống kho ngầm dưới tòa nhà Index, nơi con lắc mực vẫn đung đưa, và hỏi một câu: nếu Prescript tiếp theo bảo bạn làm điều ngược lại với mọi điều bạn tin, bạn sẽ làm gì? Họ không cần câu trả lời bằng lời. Họ chỉ cần xem bạn đưa tay ra phía nào.',
    '[The Weaver’s question] A Weaver calls you down to the vault under the Index building, where the ink pendulum still swings and asks one thing: if the next Prescript tells you to do the opposite of everything you believe, what will you do? They need no spoken answer. They only need to see which hand you reach out.',
    [
      fc('Đưa tay phải ra, nhận Prescript', 'Extend your right hand and accept the Prescript',
        'Weaver đặt tờ giấy vào lòng bàn tay bạn, và nó trống. Họ nói bạn đã trả lời đúng.',
        'The Weaver places a sheet in your palm, and it is blank. They say you have answered correctly.',
        { rep: 8, sanity: -5, network: 4 }, { flagsAdd: ['index_obeyed'] }),
      fc('Đưa tay trái ra, từ chối', 'Extend your left hand and refuse',
        'Weaver mỉm cười rất khẽ và đặt tờ giấy lại vào ngăn kéo. Họ nói bạn là người thứ ba hỏi cùng một câu trong chín năm qua, và người đầu tiên đã trở thành Weaver.',
        'The Weaver smiles very faintly and returns the paper to a drawer. They say you are the third in nine years to give that same answer, and the first has since become a Weaver.',
        { rep: 6, sanity: 2, network: 3 }, { flagsAdd: ['index_deviated'] }),
      fc('Không đưa tay nào, đứng nhìn vào mắt họ', 'Reach out neither hand and look into their eyes',
        'Weaver giữ ánh nhìn của bạn hồi lâu, rồi quay đi trước. Họ không nói gì, và bạn ra khỏi tòa nhà trong buổi trưa nắng. Một tuần sau, một Prescript đến, không có chữ nào ngoài tên bạn.',
        'The Weaver holds your gaze a long time, then looks away first. They say nothing, and you leave the building in bright noon. A week later a Prescript arrives, with no words on it but your name.',
        { rep: 5, sanity: -6, network: 2 }, { flagsAdd: ['index_deviated'] })
    ], { age: [32, 90], weight: 11 }),

  fe('index_old_proselyte', X, [1, 3],
    '[Proselyte già nhất] Một Proselyte đã làm việc ba mươi năm, dải bịt mắt vẫn chưa được tháo, không được thăng cấp và không ai biết vì sao. Ông không bao giờ hỏi. Hôm nay ông đưa bạn một cuộn Prescript mà ông giữ từ hai mươi năm trước và chưa mở, và nhờ bạn đọc nó khi ông không còn ở đây.',
    '[The oldest Proselyte] A Proselyte who has served thirty years, blindfold still on, without promotion, and no one knows why, never asks. Today he hands you a Prescript scroll he has kept unopened for twenty years, and asks you to read it when he is no longer here.',
    [
      fc('Nhận cuộn Prescript, hứa sẽ đọc', 'Accept the scroll and promise to read it',
        'Ông cúi đầu rất thấp và đi. Ba tháng sau ông ngã xuống trên một cầu thang, và bạn đọc cuộn Prescript trong căn phòng nhỏ của mình. Nó chỉ có một dòng: Anh đã làm đủ rồi.',
        'He bows very low and goes. Three months later he falls on a stairway, and you read the scroll in your small room. It holds a single line: You have done enough.',
        { sanity: -4, network: 4, rep: 3 }, { flagsAdd: ['index_old_proselyte_scroll'] }),
      fc('Từ chối, bảo ông tự mở', 'Refuse and tell him to open it himself',
        'Ông gật đầu chậm, và cất cuộn Prescript vào áo. Bạn không bao giờ biết ông có mở nó hay không. Ông vẫn đứng ở vị trí cũ mỗi sáng, nhìn bạn đi qua.',
        'He nods slowly and tucks the scroll into his coat. You never learn whether he opened it. He still stands at the same post each morning, watching you pass.',
        { sanity: -2, network: -2 }),
      fg('Mở cuộn Prescript ngay trước mặt ông', 'Open the scroll right before him', [
        [50, 'Ông thở rất nhẹ khi bạn đọc. Dòng chữ ấy chỉ có ba từ, và bạn thấy nước mắt chảy xuống mặt ông mà ông không đưa tay lên lau.', 'He breathes very lightly as you read. The line is only three words, and you watch tears run down his face without his lifting a hand to wipe them.', { sanity: -3, network: 6, rep: 2 }],
        [50, 'Cuộn Prescript rỗng, chỉ có một vệt mực khô. Ông nhìn nó và cười một cách rất lạ. Ông nói hai mươi năm qua ông đã làm theo một tờ giấy trắng.', 'The scroll is empty, only a dried streak of ink. He looks at it and laughs very strangely. He says for twenty years he has been following a blank sheet.', { sanity: -8, rep: -2, network: 3 }]
      ])
    ], { age: [26, 90] }),

  fe('index_letter_to_self', X, [0, 3],
    '[Thư gửi chính bạn] Một Messenger đưa bạn một bức thư mang địa chỉ nhà bạn, nét chữ của chính bạn, nhưng ghi ngày ba tháng sau. Anh ta nói đó là thủ tục bình thường và bảo bạn đừng mở trước ngày ghi. Anh ta không nhìn bạn khi nói.',
    '[A letter to yourself] A Messenger hands you a letter bearing your home address, in your own handwriting, dated three months ahead. He says it is routine and tells you not to open it before the date. He does not look at you as he speaks.',
    [
      fc('Cất thư vào ngăn kéo và chờ ngày ghi', 'Put it in a drawer and wait for the date',
        'Ba tháng trôi chậm. Đúng ngày ghi, bạn mở thư và đọc một câu: Bạn đã đúng khi đợi.',
        'Three months crawl. On the dated day you open the letter and read one line: You were right to wait.',
        { sanity: 2, rep: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Mở thư ngay trong đêm đó', 'Open the letter that very night', [
        [50, 'Bức thư chỉ có một dòng: Bạn không thể chờ, như tôi đã biết. Bạn ngồi trong bóng tối một lúc, và cố nhớ lại xem mình đã viết nó khi nào.', 'The letter holds one line: You could not wait, as I knew. You sit in the dark a long while, trying to recall when you wrote it.', { sanity: -7, rep: 2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Bức thư trống. Ba tháng sau, bạn nhận được một bức thư khác, cũng từ chính mình, và nó viết: Đáng lẽ bạn nên đợi.', 'The letter is blank. Three months later you receive another, also from yourself, and it reads: You should have waited.', { sanity: -5, rep: -4 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Đốt thư không đọc', 'Burn it unread',
        'Bạn đốt bức thư trong bếp. Tro rơi vào bồn rửa, và nước cuốn đi. Bạn cứ nghĩ sẽ có gì đó xảy ra, nhưng không có gì.',
        'You burn the letter in the kitchen. Ash falls into the sink, and the water washes it away. You keep thinking something will happen, but nothing does.',
        { sanity: -3, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ]),

  fe('index_bridge_with_no_name', X, [1, 3],
    '[Cây cầu không tên] Prescript dẫn bạn đến một cây cầu không có trên bản đồ, nằm giữa hai tòa nhà bỏ hoang. Bạn phải đi qua nó đúng ba lần, mỗi lần cách nhau mười phút, và ghi lại mọi điều khác nhau. Lần thứ ba, đầu cầu bên kia không còn giống lần đầu.',
    '[The nameless bridge] A Prescript leads you to a bridge not on any map, stretching between two abandoned buildings. You must cross it exactly three times, ten minutes apart, and note every difference. By the third crossing the far end no longer looks the same as the first time.',
    [
      fc('Đi đủ ba lần, ghi chi tiết', 'Cross all three times and record every detail',
        'Bạn viết sáu trang ghi chú. Lần thứ ba, cánh cửa ở đầu cầu bên kia đã đổi màu, và có một người đàn ông đứng đó, nhìn bạn với vẻ như thể đang chờ bạn từ lâu. Bạn gật đầu, và quay lại.',
        'You write six pages of notes. On the third crossing the door at the far end has changed color, and a man stands there looking at you as though he has waited long. You nod, and turn back.',
        { rep: 5, sanity: -4, network: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Bước vào cánh cửa ở lần thứ ba', 'Step through the door on the third crossing', [
        [45, 'Bên trong là một phòng đọc sách nhỏ, ấm và sáng. Một ông già đang đọc, và ông cúi đầu với bạn như một người khách quen. Bạn ngồi xuống và đọc đến khi nhận ra đã sáng.', 'Inside is a small reading room, warm and bright. An old man reads, and nods at you like a regular visitor. You sit and read until you notice it is already morning.', { sanity: 6, rep: 3, network: 4 }, { flagsAdd: ['index_deviated'] }],
        [55, 'Bên trong là một căn phòng trống. Khi bạn quay ra, cây cầu không còn ở đó, và bạn mất cả buổi chiều tìm đường về.', 'Inside is an empty room. When you turn back out, the bridge is no longer there, and you lose the whole afternoon finding your way home.', { sanity: -8, health: -4, rep: -3 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Dừng sau lần thứ hai và báo là đủ', 'Stop after the second crossing and report it done',
        'Báo cáo của bạn ngắn hơn, và Messenger nhìn bạn bằng ánh mắt lẽ ra dành cho học trò lười. Nhưng không ai bắt bạn đi lần thứ ba, và bạn nhận ra mình đang cảm thấy biết ơn.',
        'Your report is shorter, and the Messenger gives you the sort of look meant for a lazy student. But nobody makes you do the third crossing, and you realize you are feeling grateful.',
        { sanity: 2, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ], { age: [24, 90] }),

  // ------------------------------------------------------------------ stories and consequences
  fe('index_deviation_notice', X, [1, 3],
    '[Giấy báo chệch hướng] Một phong bì không đề tên đến nhà bạn, bên trong chỉ có một tờ giấy ghi danh sách các Prescript bạn đã làm lệch, kèm ngày giờ chính xác. Dưới cùng là một dòng: Khung cửi nhớ. Không có lời đe dọa nào, và đó mới là điều đáng sợ.',
    '[Notice of deviation] An unmarked envelope arrives at your home, holding only a sheet listing each Prescript you have bent, with exact dates and hours. At the bottom is a single line: The loom remembers. There is no threat anywhere on it, and that is what is frightening.',
    [
      fc('Đốt tờ giấy và tiếp tục như cũ', 'Burn the sheet and carry on as before',
        'Bạn đốt nó, nhưng tờ giấy tiếp theo đến sáng hôm sau, giống hệt. Lần này bạn cất nó vào ngăn kéo, và lần đầu tiên bạn tự hỏi mình đang sống vì điều gì.',
        'You burn it, but the next sheet arrives the following morning, identical. This time you keep it in a drawer, and for the first time you ask yourself what you are living for.',
        { sanity: -6, rep: -3 }),
      fg('Mang tờ giấy đến gặp Weaver', 'Take the sheet to the Weaver', [
        [55, 'Weaver nhìn tờ giấy và cười nhẹ. Họ nói đó chỉ là một bản lưu, không ai dùng nó để phạt ai. Họ khuyên bạn chọn một Prescript trong danh sách và làm lại cho đúng, như một cách chuộc lại.', 'The Weaver looks at the sheet and smiles faintly. They say it is just an archive, and nobody uses it to punish anyone. They suggest you pick one Prescript on the list and redo it properly, as a form of atonement.', { rep: 6, sanity: 3, network: 4 }],
        [45, 'Weaver nhìn tờ giấy và không cười. Họ nói không ai gửi tờ ấy từ Index, và bạn nhận ra có ai đó ngoài Index đang theo dõi bạn.', 'The Weaver looks at the sheet and does not smile. They say no one at the Index sent it, and you realize someone outside the Index has been watching you.', { sanity: -10, heat: 8, rep: -2 }]
      ]),
      fc('Làm lại đúng một Prescript đã làm lệch', 'Redo exactly one Prescript you had bent',
        'Bạn chọn tờ đầu tiên: chiếc ô đỏ. Bạn đứng dưới cột đèn số bảy lúc 11:20 và chờ một người không đến. Đến nửa đêm, bạn cầm ô đi về. Sáng hôm sau, tờ giấy báo mất một dòng.',
        'You pick the first one: the red umbrella. You stand under lamp post number seven at 11:20 and wait for someone who does not come. At midnight you carry the umbrella home. The next morning, the sheet is missing one line.',
        { sanity: 3, rep: 4 }, { flagsAdd: ['index_obeyed'] })
    ], { requires: ['index_deviated'], age: [26, 90], weight: 8 }),

  fe('index_reward_of_obedience', X, [1, 3],
    '[Phần thưởng của sự tuân phục] Nhiều năm qua bạn gần như chưa bao giờ làm lệch một Prescript, và một Weaver cuối cùng gọi bạn đến để nói rằng đó là lý do bạn được chọn cho một nhiệm vụ đặc biệt. Họ cho biết nhiệm vụ ấy không phải một vinh dự, mà là một sự tin cậy, và hai thứ đó nặng khác nhau.',
    '[The reward of obedience] For years you have almost never bent a Prescript, and a Weaver finally summons you to say that is why you were chosen for a special task. They say the task is not an honor but a trust, and the two weigh differently.',
    [
      fc('Nhận nhiệm vụ, không hỏi chi tiết', 'Accept the task and ask no details',
        'Nhiệm vụ hóa ra là mang một con dấu đến một người sắp chết. Bạn ngồi cạnh giường người ấy suốt ba đêm, và không ai nói với bạn rằng đó là việc cần làm.',
        'The task turns out to be carrying a seal to a person who is dying. You sit by their bed three nights, and nobody tells you that is what was needed.',
        { rep: 8, sanity: -4, network: 5 }, { meritAdd: 5 }),
      fc('Hỏi rõ trước khi nhận', 'Ask for specifics before accepting',
        'Weaver nhìn bạn rất lâu, rồi nói họ đã chọn nhầm người. Nhưng họ vẫn đưa bạn nhiệm vụ, kèm một ghi chú rằng hỏi cũng là một cách tuân phục.',
        'The Weaver looks at you a long while and says they have chosen the wrong person. But they hand you the task anyway, with a note that asking, too, is a form of obedience.',
        { rep: 4, sanity: -3, network: 3 }),
      fc('Từ chối để giữ sự tuân phục không bị thử thêm', 'Decline so your obedience is not tested further',
        'Weaver gật đầu và nói điều đó cũng rất tuân phục. Bạn ra về và nhận ra mình vừa từ chối một cánh cửa mà ít người có cơ hội gõ.',
        'The Weaver nods and says that too is very obedient. You leave realizing you have just turned down a door few ever get the chance to knock on.',
        { sanity: 3, rep: -2 })
    ], { requires: ['index_obeyed'], age: [28, 90], weight: 8 })
];

export const INDEX_MINORS = [
  M('m_index_silk_thread', AGE.GROWN, fneed(X, 0),
    '[Sợi chỉ trên cổ tay] Bạn tỉnh dậy với một sợi chỉ vàng quấn lỏng quanh cổ tay phải. Bạn không nhớ đã quấn nó. Trên bàn, một tờ Prescript chưa mở, và chiếc cốc nước bên cạnh còn ấm.',
    '[Thread on the wrist] You wake with a golden thread wound loosely around your right wrist. You do not recall winding it. On the desk lies an unopened Prescript, and the glass of water beside it is still warm.',
    [C('Gỡ sợi chỉ ra và đọc Prescript', 'Unwind the thread and read the Prescript', 'Prescript chỉ có bốn chữ: Hôm nay đừng ra ngoài. Bạn ở nhà cả ngày, và nghe tiếng mưa rất lớn, dù trời không mưa.', 'The Prescript has four words: Do not go out. You stay home all day, and hear a great deal of rain, though the sky is dry.', { sanity: -2, rep: 2 }), C('Giữ sợi chỉ, không đọc Prescript', 'Keep the thread and leave the Prescript unread', 'Cả ngày bạn thấy sợi chỉ siết lại một chút mỗi giờ. Chiều tối bạn mở Prescript, và nó trống.', 'All day the thread tightens a little each hour. In the evening you open the Prescript, and it is blank.', { sanity: -4 })],
    I('Bạn tháo sợi chỉ, cất vào ngăn kéo.', 'You unwind the thread and put it in a drawer.'), { theme: 'work' }),
  M('m_index_wax_seal', AGE.GROWN, fneed(X, 0),
    '[Dấu sáp nguội] Dấu sáp niêm phong trên Prescript hôm nay nguội chậm bất thường, và khi bạn chạm vào, nó còn mềm. Người đưa tin đã đi từ lâu, vậy ai đã đặt nó ở đây trong lúc bạn ngủ?',
    '[The warm seal] The wax seal on today’s Prescript cools abnormally slowly, and when you touch it, it is still soft. The courier left long ago, so who placed it here while you slept?',
    [C('Hỏi hàng xóm có thấy ai không', 'Ask the neighbors whether they saw anyone', 'Người hàng xóm nói không thấy ai, nhưng nhắc bạn rằng cửa nhà bạn đã không khóa từ ba đêm qua. Bạn kiểm tra, và nó đúng là không khóa.', 'The neighbor says they saw no one, but mentions your door has been unlocked for three nights. You check, and it truly is.', { sanity: -4, network: 2 }), C('Mở Prescript và tiếp tục như thường', 'Open the Prescript and carry on', 'Prescript chỉ là một địa chỉ. Bạn ghi nhớ nó, đốt tờ giấy, và quên đi chuyện dấu sáp. Một tuần sau bạn vẫn thấy ngón tay mình ấm khi nhớ.', 'The Prescript is only an address. You memorize it, burn the paper, and forget about the wax. A week later your fingertips still feel warm at the memory.', { sanity: -1, rep: 1 })],
    I('Bạn bỏ qua dấu sáp và quay lại việc.', 'You ignore the seal and return to work.'), { theme: 'work' }),
  M('m_index_stairwell_whisper', AGE.GROWN, fneed(X, 0),
    '[Tiếng thì thầm ở cầu thang] Ở cầu thang tòa nhà Index, bạn nghe hai Proxy thì thầm. Chúng ngừng khi thấy bạn, rồi cùng gật đầu. Có một cái tên bạn nghe được trước khi chúng ngừng, và nó là tên một người bạn đã biết.',
    '[A whisper on the stairs] On the stairs of the Index building, you overhear two Proxies whispering. They stop when they see you and both nod. There was a name you caught before they stopped, and it belongs to someone you know.',
    [C('Hỏi thẳng họ về cái tên', 'Ask them directly about the name', 'Họ nhìn nhau và nói đó là một lỗi nghe nhầm. Một người trong số họ chạm vào tay áo mình theo một cách bạn đã học nhận ra.', 'They look at each other and say you misheard. One touches their sleeve in a way you have learned to recognize.', { sanity: -3, network: -1 }), C('Giả vờ không nghe và đi tiếp', 'Pretend not to have heard and walk on', 'Cả ngày bạn nhớ cái tên ấy, và chiều đến bạn gửi một lời nhắn ngắn cho người mang tên đó. Không có hồi âm.', 'All day you recall that name, and by evening you send a short note to the person who bears it. No reply comes.', { sanity: -2, network: 2 })],
    I('Bạn đi tiếp lên tầng trên.', 'You continue up to the next floor.'), { theme: 'work' }),
  M('m_index_hourglass', AGE.GROWN, fneed(X, 1),
    '[Chiếc đồng hồ cát nhỏ] Một Proxy tặng bạn chiếc đồng hồ cát nhỏ làm bằng thủy tinh dày. Cát bên trong chảy rất chậm, và bạn đo thử: nó chảy đúng mười một phút, rồi ngừng dù chưa hết. Anh ta nói đó là món quà nhắc bạn dừng đúng lúc.',
    '[A small hourglass] A Proxy gives you a small hourglass of thick glass. The sand inside flows slowly, and when you time it, it runs exactly eleven minutes and then stops even though not empty. He says it is a gift to remind you to stop at the right moment.',
    [C('Đặt nó trên bàn làm việc', 'Set it on your desk', 'Mỗi lần bạn nhìn nó, cát lại dừng ở một mức khác. Bạn bắt đầu nhớ lúc nào mình đã làm điều gì không nên, và nhận ra cát luôn dừng sớm hơn dự đoán.', 'Each time you look, the sand has stopped at a different level. You begin to recall when you did something you should not, and notice the sand always stops sooner than expected.', { sanity: -2, rep: 1 }), C('Trả lại và nói bạn không cần nó', 'Return it and say you do not need one', 'Anh ta nhận lại không nói gì. Một tuần sau, chiếc đồng hồ cát xuất hiện lại trong ngăn kéo của bạn, lần này nằm nghiêng.', 'He takes it back without a word. A week later the hourglass reappears in your drawer, lying on its side this time.', { sanity: -3 })],
    I('Bạn cất món quà vào hộc tủ.', 'You tuck the gift into a cabinet.'), { theme: 'work' }),
  M('m_index_quiet_tea', AGE.GROWN, fneed(X, 0),
    '[Ly trà không người rót] Trên bàn ở văn phòng Index, một ly trà nóng chờ sẵn trước mặt bạn khi bạn đến. Không ai nhận đã đặt nó. Cả tổ nhìn nhau rồi nhìn đi chỗ khác. Hôm sau, ly trà ở đó lần nữa, và lần này có một viên đường.',
    '[The unpoured tea] At your desk in the Index office, a hot cup of tea waits in front of you when you arrive. No one claims to have set it. The whole team glances at one another and then away. The next day the tea is there again, this time with a sugar cube.',
    [C('Uống ly trà', 'Drink the tea', 'Vị trà giống đúng vị mẹ bạn từng pha. Bạn uống hết, và đặt ly xuống rất cẩn thận. Hôm sau, ly trà không còn xuất hiện, và bạn thấy một chỗ trống trên bàn.', 'The tea tastes exactly like your mother used to make. You finish it and set the cup down carefully. The next day it no longer appears, and you feel an empty place on the desk.', { sanity: 3, rep: -1 }), C('Để nguyên ly trà, không chạm', 'Leave the tea untouched', 'Trà nguội dần. Cuối ngày một người dọn dẹp mang nó đi. Hôm sau không có ly trà nào cả.', 'The tea cools. At day’s end a cleaner takes it away without a word. The next day there is no tea at all.', { sanity: -1, rep: 1 })],
    I('Bạn đẩy ly trà sang một bên và bắt đầu làm việc.', 'You push the tea aside and begin work.'), { theme: 'work' }),
  M('m_index_wrong_number', AGE.GROWN, fneed(X, 0),
    '[Số gọi nhầm] Điện thoại bàn của bạn reo, và giọng một đứa trẻ hỏi cho gặp mẹ. Bạn nói đây không phải số nhà nó. Đứa trẻ im lặng một lúc, rồi nói mẹ nó bảo hãy gọi số này nếu có chuyện, và đọc đúng số điện thoại cá nhân của bạn.',
    '[A wrong number] Your desk phone rings, and a child’s voice asks for its mother. You say this is not its home. The child is silent a moment, then says its mother told it to call this number if anything happened, and reads out your exact private phone number.',
    [C('Hỏi đứa trẻ đang ở đâu', 'Ask the child where it is', 'Đứa trẻ trả lời bằng một địa chỉ, và đó là một căn hộ cách chỗ bạn ba con phố. Bạn đến đó, và gõ cửa. Không ai mở, nhưng có tiếng một chiếc radio nhỏ vọng ra.', 'The child answers with an address, an apartment three streets from yours. You go and knock. No one answers, but a small radio plays from within.', { sanity: -5, network: 2 }), C('Nói đứa trẻ nên gọi người khác, rồi cúp máy', 'Tell the child to call someone else and hang up', 'Điện thoại reo lại sau một phút, và bạn không nhấc. Cả đêm nó reo thêm hai lần nữa.', 'The phone rings again after a minute, and you do not answer. It rings twice more through the night.', { sanity: -4 })],
    I('Bạn đặt máy xuống và nhìn đồng hồ.', 'You set down the receiver and check the clock.'), { theme: 'work' }),
  M('m_index_ink_stain', AGE.GROWN, fneed(X, 0),
    '[Vết mực trên ngón tay] Cả buổi sáng bạn thấy một vệt mực xanh trên ngón trỏ mà không nhớ đã chạm vào gì. Đến trưa, đồng nghiệp ngồi cạnh cũng có vệt mực y hệt, cùng ngón, cùng vị trí. Hai người nhìn nhau.',
    '[Ink on a fingertip] All morning you notice a blue ink stain on your index finger without recalling touching anything. By noon the colleague beside you has the identical stain, same finger, same spot. The two of you stare at one another for a long time.',
    [C('Rửa sạch và không nhắc đến', 'Wash it off and say nothing', 'Vệt mực không đi, dù bạn chà tới đỏ da. Ngày hôm sau nó vẫn còn, và hôm sau nữa. Bạn học cách giấu bàn tay phải trong túi áo.', 'The stain will not go, though you scrub until the skin is red. The next day it is still there, and the next. You learn to keep your right hand in your coat pocket.', { sanity: -3 }), C('Hỏi đồng nghiệp xem họ đã làm gì', 'Ask the colleague what they did', 'Họ nói họ đã mở một Prescript sáng nay. Bạn cũng vậy. Hai người cùng im lặng, và nhận ra hai Prescript ấy có thể là một.', 'They say they opened a Prescript this morning. So did you. Both fall silent, realizing the two Prescripts may be one.', { sanity: -2, network: 3 })],
    I('Bạn nhét tay vào túi và quay lại bàn.', 'You tuck your hand in your pocket and return to your desk.'), { theme: 'work' }),
  M('m_index_candle_end', AGE.GROWN, fneed(X, 1),
    '[Mẩu nến cuối] Prescript đêm nay bảo bạn thắp một cây nến và để nó cháy đến hết. Bạn ngồi trong căn phòng nhỏ, nhìn ngọn lửa co dần. Khi chỉ còn một chấm sáng, bạn nghe có tiếng ai đó thở ở phía sau, rất gần.',
    '[The candle’s end] Tonight’s Prescript tells you to light a candle and let it burn out. You sit in your small room watching the flame shrink. When only a point of light remains, you hear someone breathing behind you, very close.',
    [C('Ngồi yên và để nến tắt', 'Sit still and let the candle go out', 'Nến tắt, và tiếng thở cũng ngừng. Bạn ngồi trong bóng tối một lúc lâu, và nhận ra bạn chưa bao giờ thấy an toàn hơn thế.', 'The candle dies, and the breathing stops with it. You sit in the dark a long while, realizing you have never felt safer.', { sanity: 2, rep: 2 }), C('Quay lại nhìn', 'Turn around and look', 'Phía sau chỉ có bức tường và cái bóng của bạn trên đó. Nhưng cái bóng không quay cùng lúc với bạn, và bạn không ngủ đêm đó.', 'Behind you are only the wall and your own shadow on it. But the shadow did not turn at the same time you did, and you do not sleep that night.', { sanity: -7 })],
    I('Bạn thổi tắt nến sớm và đi ngủ.', 'You blow out the candle early and go to bed.'), { theme: 'work' }),
  M('m_index_paper_boat', AGE.GROWN, fneed(X, 0),
    '[Chiếc thuyền giấy] Một Messenger nhờ bạn thả một chiếc thuyền giấy xuống con kênh sau tòa nhà. Bên trong chiếc thuyền có một mảnh Prescript đã gấp kín. Bạn thả, và nó trôi đúng hướng ngược dòng. Messenger nhìn theo, nét mặt dịu lại.',
    '[The paper boat] A Messenger asks you to float a paper boat down the canal behind the building. Inside is a folded sliver of Prescript. You release it, and it drifts upstream. The Messenger watches it go, his expression softening.',
    [C('Đi theo chiếc thuyền một đoạn', 'Follow the boat a stretch', 'Chiếc thuyền trôi qua một cây cầu thấp và biến mất dưới nó. Khi bạn qua bên kia, không có gì ở đó. Messenger vẫn đang đứng ở chỗ cũ, và không hỏi bạn thấy gì.', 'The boat drifts under a low bridge and vanishes. When you reach the other side, nothing is there. The Messenger is still at the same spot, and does not ask what you saw.', { sanity: -2, rep: 2 }), C('Để nó đi và quay về văn phòng', 'Let it go and return to the office', 'Messenger cảm ơn bạn bằng một cái cúi đầu rất thấp.', 'The Messenger thanks you with a very low bow.', { sanity: 3 })],
    I('Bạn nhìn chiếc thuyền trôi một lúc rồi đi.', 'You watch the boat drift a moment, then go.'), { theme: 'work' }),
  M('m_index_birds_at_dawn', AGE.GROWN, fneed(X, 0),
    '[Đàn chim lúc rạng sáng] Prescript đêm qua chỉ bảo bạn ra ban công lúc 5:40 sáng. Ở đó, một đàn chim sẻ đậu im trên lan can, nhìn thẳng vào bạn. Khi đồng hồ điểm 5:41, chúng bay đi cùng lúc, và không một tiếng cánh.',
    '[Birds at dawn] Last night’s Prescript told you only to step onto the balcony at 5:40 a.m. There a flock of sparrows sits silent on the rail, looking straight at you. When the clock strikes 5:41 they fly off together, without a sound of wings.',
    [C('Ở lại thêm một lúc nhìn trời sáng', 'Stay a while watching the sky brighten', 'Bầu trời lên màu cam rồi vàng.', 'The sky turns orange then yellow.', { sanity: 4 }), C('Quay vào ngay và ghi lại vào sổ', 'Go back in at once and write it in the ledger', 'Bạn ghi lại đúng từng chi tiết, và Messenger khen bản báo cáo gọn gàng. Nhưng bạn nhớ rằng đàn chim đã nhìn bạn, không nhìn thứ gì khác.', 'You record every detail precisely, and the Messenger praises the tidy report. But you remember that the birds were looking at you, not at anything else.', { rep: 2, sanity: -2 })],
    I('Bạn quay vào và uống nước.', 'You step back inside and drink water.'), { theme: 'work' }),
  M('m_index_second_hand', AGE.GROWN, fneed(X, 1),
    '[Kim giây đi ngược] Đồng hồ trong phòng Prescript của bạn có kim giây chạy ngược trong đúng một phút mỗi đêm. Bạn đã theo dõi nó nhiều tuần, và phút ấy luôn trùng với lúc bạn đọc dòng đầu tiên của một Prescript mới.',
    '[The second hand runs backward] The clock in your Prescript room has a second hand that runs backward for exactly one minute each night. You have watched for weeks, and that minute always coincides with reading the first line of a new Prescript.',
    [C('Ghi lại mỗi đêm vào một cuốn sổ riêng', 'Log it each night in a private notebook', 'Sau ba tháng bạn thấy một quy luật mà bạn không dám nói với ai. Quy luật ấy dự báo Prescript sẽ nói gì, và bạn chưa bao giờ sai.', 'After three months you see a pattern you dare not mention to anyone. The pattern predicts what the Prescript will say, and you have never been wrong.', { sanity: -4, rep: 1 }), C('Tháo kim giây ra', 'Remove the second hand', 'Bạn gỡ kim giây ra khỏi mặt đồng hồ. Đêm đó đồng hồ vẫn chạy, nhưng bạn cảm thấy một thứ gì đó đang nhìn bạn từ chỗ kim giây đã ở.', 'You pry the second hand off the dial. That night the clock still runs, but you feel something watching you from where the hand used to be.', { sanity: -3 })],
    I('Bạn ngừng nhìn đồng hồ.', 'You stop looking at the clock.'), { theme: 'work' }),
  M('m_index_forgotten_name', AGE.GROWN, fneed(X, 1),
    '[Cái tên đã quên] Bạn đang viết một lá thư và đột nhiên không nhớ tên người nhận, dù đã viết nó hàng trăm lần. Bạn ngồi nhìn tờ giấy hồi lâu, rồi tìm thấy cái tên trong một Prescript cũ, nằm trong ngăn kéo đã bị khóa từ lâu.',
    '[The forgotten name] You are writing a letter and suddenly cannot recall the recipient’s name, though you have written it hundreds of times. You sit staring at the page a long while, then find the name in an old Prescript, in a drawer you had long kept locked.',
    [C('Đọc lại Prescript cũ', 'Read the old Prescript again', 'Prescript ấy chỉ bảo bạn quên đi cái tên đó đến một ngày nhất định. Hôm nay là ngày ấy. Bạn đặt lá thư xuống và không viết thêm.', 'The Prescript only says to forget that name until a certain day. Today is that day. You lay the letter down and write no more.', { sanity: -6, rep: 1 }), C('Viết tên ra giấy và gấp lại', 'Write the name on a slip and fold it', 'Bạn viết cái tên lên một mẩu giấy nhỏ và cất vào ví. Mỗi lần mở ví, bạn không nhìn nó, và không dám xé.', 'You write the name on a small slip and tuck it in your wallet. Each time you open the wallet you avoid looking at it, and do not dare tear it up.', { sanity: -3, network: 2 })],
    I('Bạn đặt bút xuống và không viết nữa.', 'You put down the pen and write no more.'), { theme: 'work' }),
  M('m_index_scarf_gift', AGE.GROWN, fneed(X, 0),
    '[Chiếc khăn từ người không quen] Một người lạ để lại chiếc khăn len màu xám trước cửa nhà bạn với một mảnh giấy: Mùa đông này sẽ lạnh hơn bạn nghĩ. Chiếc khăn đúng cỡ cổ bạn, và có mùi nến.',
    '[A scarf from a stranger] A stranger leaves a gray wool scarf at your door with a slip: This winter will be colder than you think. The scarf fits your neck exactly, and smells of candle wax.',
    [C('Quàng khăn đi làm', 'Wear the scarf to work', 'Mùa đông ấy lạnh đến mức sông đóng băng mỏng hai ngày. Bạn không bao giờ bị cóng, và đồng nghiệp ghen tị mà không nói ra.', 'That winter is so cold the river freezes thinly for two days. You are never chilled, and colleagues envy you without saying.', { health: 3, sanity: 2 }), C('Cất khăn vào tủ, không dùng', 'Put the scarf away unused', 'Bạn đứng nhìn tủ quần áo thật lâu mỗi sáng, và không bao giờ mở ngăn có chiếc khăn. Đến mùa xuân, nó không còn ở đó nữa.', 'Each morning you stand staring at the wardrobe a long while and never open the compartment holding the scarf. By spring it is no longer there.', { sanity: -2 })],
    I('Bạn đặt chiếc khăn lên ghế và quên nó.', 'You leave the scarf on a chair and forget it.'), { theme: 'work' }),
  M('m_index_prescript_pun', AGE.GROWN, fneed(X, 1),
    '[Prescript đùa] Một Prescript đến, và dòng cuối là một câu đùa nhỏ về một con vịt và một chiếc giày. Cả tổ đọc nó, và không ai cười. Rồi một Proselyte già nhất bật ra một tiếng ngắn, và cả phòng nín thở.',
    '[A joking Prescript] A Prescript arrives, and its last line is a small joke about a duck and a shoe. The whole team reads it, and no one laughs. Then the oldest Proselyte lets out one short sound, and the whole room holds its breath.',
    [C('Cười theo, rất khẽ', 'Laugh along, very quietly', 'Một vài người khác cũng cười, và căn phòng đột nhiên nhẹ như thể ai đó mở cửa sổ. Prescript chiều hôm đó không có câu đùa nào, và cả phòng thấy hơi tiếc.', 'A few others laugh too, and the room suddenly feels lighter, as if someone opened a window. That afternoon’s Prescript holds no joke, and the whole room is mildly sorry.', { sanity: 3, network: 3 }), C('Giữ nét mặt trống rỗng', 'Keep your face blank', 'Bạn giữ vẻ mặt như đá. Không ai nhận xét, nhưng người ngồi cạnh nhìn bạn ngắn một cái và lặng lẽ dịch ghế ra xa.', 'You keep a face like stone. No one comments, but the person beside you glances briefly and quietly slides their chair away.', { sanity: -1, rep: 1 })],
    I('Bạn đọc xong và gấp tờ giấy.', 'You finish reading and fold the paper.'), { theme: 'work' }),
  M('m_index_second_hand_watch', AGE.GROWN, fneed(X, 0),
    '[Người đứng ở góc đường] Có một người đàn ông đứng ở một góc đường mỗi sáng bạn đi làm, mặc áo khoác dài màu nâu. Hôm nay ông ta không đứng ở đó. Bạn dừng lại ở chỗ ấy, và thấy trên đá lát có một vòng tròn phấn trắng, nhỏ và hơi khuyết.',
    '[The man at the corner] A man in a long brown coat stands at one street corner every morning you go to work. Today he is not there. You stop at that spot and see on the paving a small white chalk circle with a gap.',
    [C('Bước vào trong vòng tròn phấn', 'Step into the chalk circle', 'Không có gì xảy ra. Nhưng bạn cảm thấy một thứ yên tĩnh lạ lùng, như đang đứng trong mắt một cơn bão. Một người đi ngang qua nhìn bạn, và tránh sang bên khác.', 'Nothing happens. But you feel a strange quiet, as if standing in the eye of a storm. A passerby looks at you and steps aside.', { sanity: 3, rep: -1 }), C('Đi vòng qua vòng tròn', 'Walk around the circle', 'Bạn đi vòng, và trong suốt quãng đường tới văn phòng, bạn cảm thấy một đôi mắt theo dõi từ đâu đó phía trên.', 'You walk around, and the whole way to the office you feel eyes on you from somewhere above.', { sanity: -2 })],
    I('Bạn nhìn vòng tròn rồi đi tiếp.', 'You glance at the circle and walk on.'), { theme: 'work' }),
  M('m_index_hours_gone', AGE.GROWN, fneed(X, 1),
    '[Ba giờ biến mất] Bạn nhìn đồng hồ lúc chín giờ, rồi nhìn lại và đã là mười hai giờ. Không có gì khác lạ, không đau đầu, không mệt. Trên bàn là một Prescript mà bạn chắc chắn mình chưa mở, và nó đã được mở.',
    '[Three hours gone] You glance at the clock at nine, then look again and it is twelve. Nothing else is odd, no headache, no fatigue. On the desk lies a Prescript you are certain you did not open, and it has been opened.',
    [C('Đọc Prescript đã mở', 'Read the opened Prescript', 'Prescript bảo bạn hãy bình tĩnh và tiếp tục như thường. Bạn đọc câu ấy ba lần, và nhận ra nét chữ trong đó giống nét chữ bạn dùng để ghi chép mỗi ngày.', 'The Prescript tells you to stay calm and carry on as usual. You read it three times, and realize the handwriting resembles your own daily notes.', { sanity: -6, rep: 1 }), C('Đem Prescript đến hỏi Messenger', 'Take the Prescript to ask the Messenger', 'Messenger nhìn nó, nhìn bạn, và nói không có Prescript nào được giao cho bạn hôm nay. Anh ta lật cuốn sổ cho bạn xem, và không có dòng nào.', 'The Messenger looks at it, then at you, and says no Prescript was issued to you today. He turns the ledger for you to see, and there is no line.', { sanity: -8, network: 1 })],
    I('Bạn cất tờ giấy và quay lại làm việc.', 'You tuck the paper away and return to work.'), { theme: 'work' }),
  M('m_index_stairs_count', AGE.GROWN, fneed(X, 0),
    '[Tầng cầu thang thừa] Cầu thang lên văn phòng bạn có mười bốn bậc. Hôm nay bạn đếm được mười lăm. Bạn xuống rồi đi lên lần nữa, mười lăm. Đến lần thứ ba, bạn dừng ở bậc thứ mười bốn, và nhận ra bậc thứ mười lăm không phải bậc thang, mà là một tờ giấy dán sàn.',
    '[The extra step] The stairs to your office have fourteen steps. Today you count fifteen. You go down and up again, fifteen. By the third time you stop at step fourteen and realize the fifteenth is no step but a sheet of paper taped to the floor.',
    [C('Bóc tờ giấy lên đọc', 'Peel the paper up and read it', 'Tờ giấy chỉ ghi một con số: mười lăm.', 'The paper bears one number: fifteen.', { sanity: -4, rep: 1 }), C('Bước lên tờ giấy và đi tiếp', 'Step onto the paper and walk on', 'Tờ giấy dính vào đế giày bạn đến hết ngày. Mỗi bước chân đều để lại một dấu mờ trên nền gạch, và đến chiều dấu ấy dẫn thẳng đến bàn bạn.', 'The paper sticks to your sole the rest of the day. Each step leaves a faint print on the tiles, and by afternoon the prints lead straight to your desk.', { sanity: -3 })],
    I('Bạn đi vòng qua và lên cầu thang kế bên.', 'You skirt around and take the neighboring stairs.'), { theme: 'work' }),
  M('m_index_rain_prescript', AGE.GROWN, fneed(X, 1),
    '[Prescript dưới mưa] Một Messenger đến tìm bạn giữa trời mưa và đưa Prescript trần, không có phong bì. Mực chảy nhòe, và bạn chỉ đọc được nửa. Anh ta nói đó là nửa bạn cần biết, nửa kia sẽ tự đến.',
    '[Prescript in the rain] A Messenger finds you in the rain and hands over a bare Prescript, no envelope. The ink bleeds, and you can read only half. He says that is the half you need to know, the other half will come on its own.',
    [C('Làm theo nửa đọc được', 'Follow the half you can read', 'Nửa Prescript bảo bạn đi đến một cửa hiệu và hỏi mua một chiếc khóa. Người bán đưa bạn chiếc khóa mà không hỏi giá, và nói bạn đã đến đúng lúc.', 'The half-Prescript tells you to visit a shop and ask for a lock. The seller hands you one without asking a price and says you arrived at the right time.', { sanity: -1, rep: 3, network: 2 }), C('Chờ nửa kia đến rồi mới làm', 'Wait for the other half to arrive first', 'Nửa kia đến ba ngày sau, trên một mảnh giấy khác, khô ráo. Nó viết: Anh đã đợi đúng, nhưng ba ngày là quá lâu.', 'The other half arrives three days later on a different sheet, dry. It reads: You waited rightly, but three days was too long.', { rep: -1, sanity: -2 })],
    I('Bạn gấp tờ giấy ướt cho vào áo.', 'You fold the wet paper into your coat.'), { theme: 'work' }),
  M('m_index_blank_hand', AGE.GROWN, fneed(X, 2),
    '[Bàn tay trắng] Một Weaver mời bạn đến phòng riêng, và chỉ đưa cho bạn một tờ giấy trắng. Ông nói đó là Prescript cho bạn, và bạn phải tự viết nội dung. Hạn chót là đêm nay. Ông không nói điều gì khác, và đóng cửa lại phía sau bạn.',
    '[The blank hand] A Weaver invites you to a private room and hands you only a blank sheet. He says it is your Prescript, and you must write its content yourself. Deadline is tonight. He says nothing else, and closes the door behind you.',
    [C('Viết một dòng duy nhất', 'Write a single line', 'Bạn viết: Hãy tha cho tôi. Và bạn nhìn dòng chữ đó rất lâu trước khi đưa nó ra. Weaver đọc, cúi đầu, và đốt nó trong lò sưởi mà không nói gì.', 'You write: Please forgive me. You stare at the line a long time before handing it over. The Weaver reads, nods, and burns it in the fireplace without a word.', { sanity: -5, rep: 4 }), C('Để tờ giấy trắng, trả lại', 'Leave it blank and return it', 'Weaver nhìn tờ giấy trống và mỉm cười rất khẽ. Ông nói đó cũng là một Prescript, và thường là Prescript khó nhất để thi hành.', 'The Weaver looks at the empty sheet and smiles faintly. He says that too is a Prescript, and often the hardest to carry out.', { sanity: 2, rep: 3 })],
    I('Bạn đặt tờ giấy lên bàn và đứng dậy.', 'You lay the sheet on the desk and stand.'), { theme: 'work' }),
  M('m_index_unread_stack', AGE.GROWN, fneed(X, 2),
    '[Đống Prescript chưa đọc] Trên bàn Weaver của bạn có một đống Prescript chưa đọc cao đến mức che mất cả đèn. Đến ngày thứ ba, bạn nhận ra nó vẫn cao như cũ, dù bạn đã đọc xong hết. Mỗi tờ bạn đọc được thay bằng một tờ khác.',
    '[The unread stack] On your Weaver’s desk a stack of unread Prescripts reaches high enough to hide the lamp. By the third day you notice it is still as tall, though you have read through them all. Each sheet you finish is replaced by another.',
    [C('Tiếp tục đọc, không hỏi', 'Keep reading and ask nothing', 'Bạn đọc nhanh hơn, và đến tuần thứ hai bạn nhận ra mình đã bắt đầu đọc theo nhịp của chính chồng giấy. Nó không còn là một gánh nặng, mà là một dòng chảy.', 'You read faster, and by the second week you realize you have begun to read in the rhythm of the stack itself. It is no longer a burden but a current.', { sanity: -3, rep: 3 }), C('Đứng dậy và xin nghỉ một ngày', 'Stand up and ask for a day off', 'Weaver trưởng cho bạn nghỉ, và chồng giấy biến mất khi bạn quay lại. Bàn sạch trơn, nhưng bạn nhìn nó và thấy trống đến đáng sợ.', 'The head Weaver grants it, and the stack is gone when you return. The desk is bare, but you look at it and find it frighteningly empty.', { sanity: 3, rep: -2 })],
    I('Bạn lấy một tờ từ trên cùng và bắt đầu đọc.', 'You take a sheet off the top and begin reading.'), { theme: 'work' })
];

export const INDEX_DAILIES = [
  D('d_index_chalk_dust', AGE.GROWN, fneed(X, 0), 'Bụi phấn trắng dính trên mép ống tay áo bạn mà bạn không nhớ đã chạm vào đâu. Bạn phủi, và nó để lại một vệt hình vòng cung nhỏ.', 'White chalk dust clings to the edge of your sleeve and you cannot recall touching anything. You brush it off, and it leaves a small arc.', {}),
  D('d_index_silk_whisper', AGE.GROWN, fneed(X, 0), 'Tờ Prescript trượt ra khỏi phong bì với tiếng sột soạt nhẹ như tiếng lụa. Bạn đọc nó nhiều lần dù chỉ có một dòng.', 'The Prescript slides from its envelope with a soft rustle like silk. You read it many times though it is only one line.', {}),
  D('d_index_clock_stuck', AGE.GROWN, fneed(X, 0), 'Đồng hồ trên tường văn phòng Index dừng đúng lúc 2:45 và tiếp tục chạy sau một phút. Không ai nhắc tới, nhưng cả phòng ngừng thở một nhịp.', 'The wall clock in the Index office halts at exactly 2:45 and resumes after a minute. No one mentions it, but the whole room stops breathing for one beat.', {}),
  D('d_index_stamp_ink', AGE.GROWN, fneed(X, 0), 'Con dấu của Index để lại trên giấy một vết mực rất sâu và rất lạnh. Bạn chạm ngón tay vào và thấy lòng bàn tay mình tê đi trong chốc lát.', 'The Index stamp leaves a very deep, very cold mark of ink on the paper. You touch it with a finger and your palm goes numb for a moment.', {}),
  D('d_index_corner_man', AGE.GROWN, fneed(X, 0), 'Người đàn ông ở góc phố mỗi sáng hôm nay nhìn bạn lâu hơn mọi lần. Bạn gật đầu, và ông ta nhẹ nhàng nâng mũ, rồi quay đi.', 'The man at the street corner looks at you longer than usual this morning. You nod, and he gently lifts his hat and turns away.', {}),
  D('d_index_ten_steps', AGE.GROWN, fneed(X, 0), 'Bạn đếm mười bước chân từ cửa nhà đến góc phố mà không cố ý. Hôm sau cũng thế. Đến ngày thứ ba bạn đếm mười một, và ngừng lại hẳn.', 'You count ten steps from your door to the street corner without meaning to. The next day, the same. By the third day you count eleven, and stop altogether.', {}),
  D('d_index_umbrella_stand', AGE.GROWN, fneed(X, 0), 'Trong giá ô ở sảnh Index có một chiếc ô đỏ không ai nhận. Nó ở đó đã nhiều năm, và không ai dám dời đi.', 'In the umbrella stand of the Index lobby is a red umbrella no one claims. It has been there for years, and no one dares move it.', {}),
  D('d_index_empty_chair', AGE.GROWN, fneed(X, 1), 'Chiếc ghế ở cuối bàn họp luôn trống, nhưng ly nước trước mặt nó luôn đầy. Bạn không bao giờ thấy ai rót.', 'The chair at the end of the meeting table is always empty, but the glass before it is always full. You never see anyone pour.', {}),
  D('d_index_wet_footprints', AGE.GROWN, fneed(X, 0), 'Dấu chân ướt trên sàn hành lang đi từ cửa vào đến trước bàn bạn rồi dừng. Trời hôm nay không mưa, và không ai nhận mình đã vào.', 'Wet footprints on the corridor floor run from the entrance to just before your desk and stop. It has not rained today, and no one admits to entering.', {}),
  D('d_index_loom_hum', AGE.GROWN, fneed(X, 1), 'Dưới tầng hầm của tòa nhà Index có tiếng ù đều đặn như một khung cửi khổng lồ đang chạy. Hôm nay nó ngừng một nhịp, và cả tòa nhà dường như nhìn nhau.', 'Beneath the Index building a steady hum like a giant loom runs. Today it pauses for one beat, and the whole building seems to look at itself.', {}),
  D('d_index_thread_snag', AGE.GROWN, fneed(X, 0), 'Một sợi chỉ vàng mắc vào cúc áo bạn khi bước ra khỏi thang máy. Bạn kéo, và nó dài ra mãi, dài hơn chiều rộng của cả hành lang.', 'A golden thread snags on your coat button as you step from the lift. You tug, and it keeps lengthening, longer than the entire corridor’s width.', {}),
  D('d_index_cold_cup', AGE.GROWN, fneed(X, 0), 'Ly cà phê bạn đặt xuống một phút trước đã nguội ngắt. Bạn nhìn đồng hồ: chỉ mới qua một phút. Bạn không uống nữa.', 'The coffee you set down a minute ago has gone stone cold. You check the clock: only a minute has passed.', {}),
  D('d_index_postal_stamp', AGE.GROWN, fneed(X, 0), 'Con tem trên phong bì Prescript hôm nay in hình một chiếc thuyền giấy. Bạn thấy nó đẹp, rồi nhận ra mình chưa bao giờ thấy loại tem này.', 'The stamp on today’s Prescript envelope shows a paper boat. You find it pretty, then realize you have never seen this kind of stamp before.', {}),
  D('d_index_shared_glance', AGE.GROWN, fneed(X, 0), 'Hai Proxy chạm mắt nhau khi bạn đi qua, và cùng lúc nhìn đi chỗ khác.', 'Two Proxies meet each other’s eyes as you pass, and both look away at once.', {}),
  D('d_index_scrap_paper', AGE.GROWN, fneed(X, 1), 'Một mảnh giấy xé dở nằm dưới bàn bạn, chỉ còn nửa dòng chữ. Bạn đọc: ...đừng tin vào dòng cuối.', 'A torn scrap lies under your desk with half a line of writing. You read: ...do not trust the last line.', {}),
  D('d_index_quiet_lift', AGE.GROWN, fneed(X, 0), 'Thang máy trong tòa nhà Index im ắng đến mức bạn nghe cả nhịp tim của mình. Khi cửa mở, người đứng ngoài tránh sang bên, và không ai bước vào.', 'The lift in the Index building is so quiet you hear your own heartbeat. When the doors open, the person waiting outside steps aside, and no one enters.', {}),
  D('d_index_lamp_flicker', AGE.GROWN, fneed(X, 1), 'Đèn bàn của bạn nhấp nháy ba lần rồi sáng đều. Một Messenger đi ngang và ghi chú gì đó vào cuốn sổ nhỏ.', 'Your desk lamp flickers three times then glows steady. A passing Messenger jots something in a small notebook.', {}),
  D('d_index_stale_bread', AGE.GROWN, fneed(X, 0), 'Chiếc bánh mì bạn mua sáng nay đã cứng như đá, dù mới ra lò. Người bán nói đó là mẻ cuối của hôm qua, và không biết vì sao bạn lại mua nó.', 'The bread you bought this morning is hard as stone though fresh from the oven. The baker says it is yesterday’s last batch, and does not know why you bought it.', {}),
  D('d_index_shoes_wet', AGE.GROWN, fneed(X, 0), 'Giày bạn ướt từ đầu đến chân dù bạn không đi qua con phố nào có nước. Bạn ngồi lau và nghĩ về những nơi chân mình đã đi qua mà trí nhớ không giữ.', 'Your shoes are soaked through though you walked no wet street. You sit wiping them and think of the places your feet have been that memory did not keep.', {}),
  D('d_index_phone_hiss', AGE.GROWN, fneed(X, 1), 'Điện thoại bàn của bạn kêu rít nhẹ khoảng ba giây, rồi im. Không ai ở đầu dây, nhưng bạn nghe như có người đang cố nhớ một con số.', 'Your desk phone gives a soft hiss for about three seconds, then falls silent. No one is on the line, but you hear what sounds like someone trying to recall a number.', {}),
  D('d_index_tea_leaves', AGE.GROWN, fneed(X, 0), 'Lá trà trong đáy tách xếp thành một vòng tròn khuyết nhỏ. Bạn nhìn nó một lúc, rồi rửa tách và không nói với ai.', 'The tea leaves at the bottom of your cup settle into a small circle with a gap. You watch them a long while, then rinse the cup and tell no one.', {}),
  D('d_index_pinned_note', AGE.GROWN, fneed(X, 0), 'Một mảnh giấy ghim trên cửa phòng bạn chỉ có một chữ: sớm. Bạn đứng nhìn nó, rồi nhận ra mình đang đến sớm hơn mọi hôm.', 'A slip pinned to your door bears a single word: early. You stand looking at it, then realize you are arriving earlier than any other day.', {}),
  D('d_index_empty_lobby', AGE.GROWN, fneed(X, 0), 'Sảnh Index hôm nay vắng đến mức tiếng giày của bạn dội lại ba lần. Bảng chỉ dẫn bị lật ngược, và không ai đến sửa nó.', 'The Index lobby is so empty today that your shoes echo three times. The directory board has been turned upside down, and no one comes to fix it.', {}),
  D('d_index_unfinished_sentence', AGE.GROWN, fneed(X, 1), 'Đồng nghiệp bắt đầu một câu và không bao giờ kết thúc nó. Cả phòng chờ, và không ai thúc giục. Cuối cùng cô ngồi xuống và gật đầu như đã nói xong.', 'A colleague begins a sentence and never finishes it. The whole room waits, and no one urges her on. At last she sits and nods as if she had finished.', {}),
  D('d_index_street_mirror', AGE.GROWN, fneed(X, 0), 'Trong gương lồi ở ngã tư, bạn thấy mình đi chậm hơn một nhịp so với thực tế. Bạn đợi, rồi đi nhanh, và cái bóng trong gương bắt kịp.', 'In the convex mirror at the crossing you see yourself moving a beat slower than reality. You wait, then hurry, and the reflection catches up.', {}),
  D('d_index_ledger_gap', AGE.GROWN, fneed(X, 1), 'Cuốn sổ Prescript của bạn có một trang trắng ở giữa, mà bạn chắc chắn đã dùng. Bạn lật qua lại, và không tìm được đoạn bị mất.', 'Your Prescript ledger has a blank page in the middle that you are sure you used. You flip back and forth and cannot find the missing passage.', {}),
  D('d_index_stairs_hum', AGE.GROWN, fneed(X, 0), 'Cầu thang gỗ trong tòa nhà ngân nga một nốt thấp mỗi khi bạn bước lên bậc thứ bảy. Bạn thôi không bước lên bậc ấy, và đi cách một bậc.', 'The wooden stairs in the building hum one low note each time you step on the seventh tread. You stop stepping there, and skip a stair.', {}),
  D('d_index_pressed_flower', AGE.GROWN, fneed(X, 0), 'Một cánh hoa ép khô rơi ra khỏi cuốn sổ cũ. Bạn không nhớ đã ép nó, và không nhớ ai đã tặng bạn bông hoa ấy.', 'A dried pressed petal falls from an old notebook.', {}),
  D('d_index_envelope_weight', AGE.GROWN, fneed(X, 0), 'Phong bì hôm nay nặng hơn thường lệ, dù bên trong chỉ có một tờ giấy. Bạn cân nó trên tay, và đoán xem nó chứa thứ gì mà mắt không nhìn thấy.', 'Today’s envelope is heavier than usual though it holds only one sheet. You weigh it on your palm and guess what it carries that the eye cannot see.', {}),
  D('d_index_twin_umbrellas', AGE.GROWN, fneed(X, 0), 'Hai chiếc ô giống hệt nhau dựng cạnh nhau ở cửa. Một chiếc ướt, chiếc kia khô. Bạn lấy chiếc khô, và nhận ra bạn đã cầm nhầm của người khác.', 'Two identical umbrellas lean together at the door. One is wet, the other dry. You take the dry one and realize you have picked up someone else’s.', {}),
  D('d_index_night_watch_bell', AGE.GROWN, fneed(X, 1), 'Chuông gác đêm của tòa nhà điểm mười hai tiếng, nhưng bạn đếm được mười ba. Bạn nhìn quanh, và mọi người đều đang nhìn bạn.', 'The building’s night bell tolls twelve times, but you count thirteen. You look around, and everyone is looking at you.', {}),
  D('d_index_fog_on_glass', AGE.GROWN, fneed(X, 0), 'Hơi thở của bạn đọng thành sương trên cửa kính, và một ngón tay vô hình vẽ một vòng tròn khuyết trong đó. Khi bạn chớp mắt, sương đã tan.', 'Your breath fogs on the glass and an unseen finger draws a gapped circle in it. When you blink, the fog has cleared.', {})
];
