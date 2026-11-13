// The Index: Prescripts. An order arrives on silk with an hour and a place, and no reason. A
// Proselyte follows it, a Messenger delivers it, a Proxy carries it out, and a Weaver is the one who
// is meant to understand it. Every mission here asks one question: follow the Prescript exactly, or
// bend it. Both answers are remembered by whoever reads the next one.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

const X = 'Index';

export const INDEX_EVENTS = [
  // ------------------------------------------------------------------ missions
  fe('index_red_umbrella', X, [0, 3],
    '[Chiếc ô đỏ] Prescript đêm nay chỉ có ba dòng: mua chiếc ô đỏ ở sạp đầu phố, đứng dưới cột đèn số bảy lúc 11:20, đưa nó cho người đầu tiên bước ra khỏi con hẻm đối diện. Trời không mưa. Trên tờ giấy còn vệt sáp niêm đã khô.',
    '[The red umbrella] Tonight’s Prescript has three lines: buy a red umbrella at the stall at the head of the street, stand under lamp post number seven at 11:20, and hand it to the first person who steps out of the alley opposite. It is not raining, and you see a dried seal of wax on the paper.',
    [
      fc('Làm đúng từng dòng, không thêm gì', 'Do each line exactly, adding nothing',
        'Người bước ra là một bà lão ôm con mèo ướt. Bà nhận chiếc ô không hỏi một lời, chỉ bảo bà đã chờ ba năm để có ai đó đưa thứ này. Bà bước đi. Trời bắt đầu mưa đúng lúc bà dừng dưới ánh đèn.',
        'The first person out is an old woman cradling a wet cat. She accepts the umbrella without a question and says she has waited three years for someone to give her this. She leaves, and rain starts just as she stops under the lamp.',
        { rep: 4, sanity: 2, network: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Đứng chờ nhưng giữ lại chiếc ô, đưa chiếc khác', 'Wait there but keep the umbrella and hand over a different one', [
        [50, 'Người bước ra không nhận ra sự khác biệt nên Prescript vẫn được ghi là hoàn thành. Nhưng suốt tuần sau bạn mất ngủ vì giữ chiếc ô đỏ trong tủ mà chẳng biết nó vốn thuộc về ai.', 'The one who steps out does not notice the difference, and the Prescript is logged as completed. But all the next week you sleep badly, because you keep the red umbrella in a closet without knowing who it belonged to.', { sanity: -5, rep: 2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Người bước ra nhìn chiếc ô một lúc rồi trả lại, nhẹ nhàng như thể đã nhận ra. Ba ngày sau một Messenger đến hỏi vì sao chiếc ô ấy không phải chiếc đã ghi sổ.', 'The person looks at the umbrella a moment, then hands it back gently, as if they had recognized it. Three days later a Messenger calls to ask why that umbrella is not the one on record.', { rep: -6, sanity: -6, heat: 5 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Mở ô và đứng dưới nó chờ người đến', 'Open it and wait underneath for the person',
        'Bạn đứng dưới chiếc ô đỏ suốt mười phút trong đêm khô ráo. Người bước ra nhìn bạn rồi nhìn chiếc ô, bật cười rất nhỏ. Họ nhận lấy, tay giữ cán ô như giữ một lá thư cũ.',
        'You stand under the red umbrella ten minutes on a dry night. The person who steps out looks at you, looks at the umbrella, and laughs quietly. They take it, and you see they hold it the way one holds an old letter.',
        { sanity: 3, rep: 2, network: 2 }, { flagsAdd: ['index_obeyed'] })
    ], { weight: 10 }),

  fe('index_two_prescripts', X, [1, 3],
    '[Hai Prescript trong một đêm] Hai tờ Prescript nằm trên bàn bạn, chung chữ ký, chung sợi chỉ vàng. Tờ thứ nhất bảo bạn ở nhà đến sáng. Tờ thứ hai bảo bạn có mặt ở cổng bến lúc nửa đêm. Cả hai đều không ghi giờ phát hành. Bạn biết chỉ một tờ có thể là thật.',
    '[Two Prescripts in one night] Two Prescripts lie on your desk, same signature, same golden thread. The first tells you to stay home until morning. The second tells you to be at the pier gate at midnight. Neither records an issue time, and you know only one can be real.',
    [
      fg('Ở nhà như tờ thứ nhất', 'Stay home as the first one says', [
        [55, 'Bạn ngồi cả đêm nhìn đồng hồ. Sáng ra, một Proxy gõ cửa bảo tờ thứ hai chỉ là bài kiểm tra: ai đi đã trượt.', 'You sit all night watching the clock. In the morning a Proxy knocks and says the second was a test: anyone who went failed.', { rep: 6, sanity: -2 }, { flagsAdd: ['index_obeyed'] }],
        [45, 'Sáng ra bạn nghe tin có người ra bến lúc nửa đêm đã được Weaver chọn thăng cấp. Tờ thứ nhất hóa ra mới là bài kiểm tra. Bạn chọn đúng theo nghĩa thuận theo nhưng sai ở chiều ngược lại.', 'In the morning you hear someone went to the pier at midnight and was chosen by the Weaver for advancement. The first was the test after all. You chose right in the sense of obedience, and wrong in the other sense.', { rep: -4, sanity: -5 }, { flagsAdd: ['index_obeyed'] }]
      ]),
      fg('Ra bến lúc nửa đêm như tờ thứ hai', 'Go to the pier at midnight as the second says', [
        [50, 'Ở cổng bến chỉ có một người mang cùng sợi chỉ vàng trên tay áo. Hai người nhìn nhau gật đầu rồi im lặng suốt hai giờ. Trời hửng sáng, người ấy trao bạn cuộn tơ nhỏ rồi bỏ đi.', 'At the pier gate stands only one person, wearing the same golden thread on their sleeve. You nod at each other and say nothing for two hours. When dawn comes, they hand you a small spool of silk and leave.', { rep: 7, network: 5, sanity: -3 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Cổng bến vắng tanh; một Proxy đứng cách đó ba mươi bước ghi chép từng chút. Bạn bị gọi lên nghe bài giảng dài về sự tuân phục rồi nhận thêm dòng cảnh cáo.', 'The pier gate is deserted, and a Proxy stands thirty paces off, taking notes. You are summoned to a long lecture on obedience and given a line of warning.', { rep: -8, sanity: -5 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Mang cả hai tờ đến hỏi Proxy', 'Take both to a Proxy and ask',
        'Proxy nhìn hai tờ rồi cất cả vào ngăn kéo, bảo bạn không cần làm gì. Bạn ra về, chợt nhận ra đó có thể là đáp án đúng hoặc cái sai tinh vi nhất.',
        'The Proxy studies both for a long time, files them in a drawer, and says you need do nothing. You leave realizing that may have been the right answer, or the most subtle wrong one.',
        { sanity: -3, rep: 1, network: 2 })
    ], { age: [24, 90] }),

  fe('index_wait_at_stop', X, [0, 3],
    '[Trạm xe không có xe] Prescript bảo bạn ngồi ở trạm xe bỏ hoang từ 2:45 đến 4:10 sáng, không đọc, không hút thuốc, không bắt chuyện với ai. Đã mười một năm không tuyến xe nào ghé trạm này, vậy mà băng ghế vẫn còn ấm khi bạn ngồi xuống.',
    '[The stop with no bus] A Prescript tells you to sit at an abandoned bus stop from 2:45 to 4:10 in the morning, not reading, not smoking, speaking to no one. No route has stopped here in eleven years, and the bench is still warm when you sit down.',
    [
      fc('Ngồi đủ hai tiếng, không nhúc nhích', 'Sit the full time without moving',
        'Lúc ba giờ bốn mươi, một người đàn ông ngồi xuống đầu bên kia băng ghế rồi cũng giữ im lặng. Đến bốn giờ mười ông đứng dậy, cúi đầu thật sâu rồi đi. Bạn không bao giờ biết ông là ai.',
        'At 3:40 a man sits at the other end of the bench and also says nothing. At 4:10 he rises, bows very deeply, and goes. You never learn who he was.',
        { rep: 3, sanity: 3, network: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Đọc một cuốn sách nhỏ để qua thời gian', 'Read a small book to pass the time', [
        [55, 'Không ai hay biết. Prescript vẫn được ghi hoàn thành, nhưng bạn chẳng nhớ nổi một trang sách nào vì suốt hai giờ chỉ nghe tiếng thở của chính mình.', 'Nobody knows. The Prescript is still logged as complete, but you cannot recall a single page of the book, because for two hours you heard only your own breathing.', { sanity: -2, rep: 1 }, { flagsAdd: ['index_deviated'] }],
        [45, 'Một Proxy đứng khuất sau cột đèn suốt đêm, chép lại từng trang bạn lật. Sáng hôm sau bạn nhận bản kê chi tiết.', 'A Proxy stands behind a lamp post all night and records each page you turn. The next morning you receive a detailed list.', { rep: -7, sanity: -4, heat: 4 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Bỏ đi lúc ba giờ, nói không chịu nổi', 'Leave at three, saying you cannot stand it',
        'Bạn đi bộ về trong sương, cả quãng đường cứ nghe như có tiếng bước chân thứ hai bên cạnh. Sáng sau không ai nhắc gì khiến bạn thấy yên tâm đến mức đáng ngờ.',
        'You walk home through fog, and the whole way it sounds as if a second set of footsteps keeps pace. In the morning no one mentions anything, and you feel suspiciously at ease.',
        { sanity: -5, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ]),

  fe('index_golden_letter', X, [0, 3],
    '[Lá thư tơ vàng] Lá thư cuộn trong ống tre buộc chỉ vàng phải tới tay người nhận ở District 14 trước khi chuông tối điểm. Trên đường đi, ba người lạ lần lượt hỏi bạn đang mang gì. Cả ba đều biết tên bạn.',
    '[The golden letter] A letter rolled in a bamboo tube, tied with golden thread, must reach someone in District 14 before the evening bell. On the way three strangers in turn ask what you are carrying, and all three know your name.',
    [
      fc('Không trả lời ai, đi thẳng', 'Answer no one and walk straight through',
        'Người thứ ba chặn bạn lại ngay đầu cầu. Bạn đáp mình không biết ông ta là ai. Ông ta tránh đường như vừa nghe câu trả lời đã thuộc lòng. Bạn đến nơi đúng lúc chuông chạm tiếng cuối.',
        'The third stops you on a bridge. You say you do not know him, and he lets you pass, as if hearing a memorized answer. You arrive just as the bell hits its last note.',
        { rep: 5, network: 4, sanity: -2 }, { flagsAdd: ['index_obeyed'] }),
      fg('Cho người thứ ba xem ống tre để họ tránh đường', 'Show the third stranger the tube so they step aside', [
        [50, 'Ông ta nhìn dấu sáp, cúi đầu rồi nhường đường. Hóa ra ông là Proxy đang kiểm tra và đã chờ bạn đúng lúc này.', 'He studies the wax seal, bows, and yields. It turns out he is a Proxy checking on you, and has been waiting for exactly this moment.', { rep: 7, network: 6, sanity: -2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Ông ta giật phăng ống tre rồi biến vào đám đông. Bạn mất trắng chuyến giao, phải giải trình với Messenger vì sao lá thư không tới đích.', 'He snatches the tube and vanishes into the crowd. You lose the whole delivery and must explain to the Messenger why the letter never arrived.', { rep: -9, sanity: -7, heat: 5 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Mở lá thư đọc thử một dòng', 'Open the letter and read a single line',
        'Dòng đầu chỉ có tên bạn kèm ngày tháng ba mươi năm sau. Bạn gấp thư lại với đôi tay lạnh toát rồi đưa tận nơi, chẳng dám nhìn mặt người nhận. Cả đêm bạn nghĩ mãi về ngày ấy.',
        'The first line holds only your name and a date thirty years ahead. You fold it shut with ice-cold hands and deliver it without looking at the recipient. All night you think about that date.',
        { sanity: -9, rep: 1 }, { flagsAdd: ['index_deviated'] })
    ]),

  fe('index_proselyte_defector', X, [1, 3],
    '[Proselyte bỏ Prescript] Một Proselyte trong tổ bạn đã không làm theo tờ Prescript đêm qua. Không ai biết vì sao vì cậu ta nhất quyết im lặng. Proxy giao bạn nhiệm vụ nhạy cảm: nói chuyện với cậu ta trước khi có Prescript nào nhắc đến tên cậu.',
    '[The Proselyte who defied a Prescript] A Proselyte on your team did not follow a Prescript last night. No one knows why, and he will not say. The Proxy gives you a delicate task: speak with him before any Prescript is issued about him.',
    [
      fc('Nghe cậu ta nói hết, không phán xét', 'Hear him out without judgment',
        'Cậu ta kể Prescript bảo đẩy một đứa trẻ xuống lòng đường đúng lúc xe tải lao qua. Cậu đã không làm. Bạn chẳng rõ cậu đúng hay sai, chỉ chép vào báo cáo một nửa lời cậu nói.',
        'He tells you the Prescript told him to push a child off the curb as a truck passed, and he did not. You do not know whether he is right or wrong. You write only half of what he said in your report.',
        { sanity: -6, network: 5, rep: 1 }, { flagsAdd: ['index_deviated'] }),
      fc('Báo đầy đủ cho Proxy', 'Report everything to the Proxy',
        'Proxy gật đầu bảo chuyện này không thuộc quyền họ phân xử; nếu có hình phạt thì tự nó sẽ tới qua một Prescript. Hai ngày sau cậu Proselyte chuyển sang khu khác rồi không ai nhắc tới nữa. Bạn ghi nhớ cái cách một chỗ trống được lấp đầy quá nhanh.',
        'The Proxy nods and says this is not theirs to decide, since any punishment must arrive as a Prescript. Two days later the Proselyte is moved to another district, and no one speaks of it again. You note how quickly an empty place is filled.',
        { rep: 5, sanity: -5, network: -4 }, { flagsAdd: ['index_obeyed'] }),
      fg('Giúp cậu ta trốn khỏi khu vực', 'Help him slip out of the district', [
        [50, 'Bạn chỉ cho cậu lối sau ra tàu hàng. Cậu không bao giờ quay lại. Hai tháng sau bạn nhận tấm bưu thiếp không đề tên, chỉ vẽ chiếc ô nhỏ.', 'You show him a back way to a freight train. He never returns, and two months later you receive an unsigned postcard with a small drawn umbrella.', { sanity: 3, network: 6, rep: -3 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Đã có Proxy đứng chờ sẵn ở cổng tàu hàng. Cậu bị giữ lại. Sáng hôm sau tên bạn hiện trên tờ Prescript.', 'A Proxy was already standing at the freight gate. He is held, and your name appears on a Prescript the next morning.', { rep: -10, sanity: -8, heat: 8 }, { flagsAdd: ['index_deviated'] }]
      ])
    ], { age: [24, 90] }),

  fe('index_return_lost_item', X, [0, 2],
    '[Vật phải trả lại] Prescript: tìm chủ chiếc đồng hồ bỏ túi hỏng, trả lại trong ba ngày. Không tên tuổi, chỉ có chữ cái khắc sau nắp cùng tấm ảnh cắt mất nửa. Bạn lần dò từng nhà qua bảy con phố.',
    '[An item to return] A Prescript: find the owner of a broken pocket watch and return it within three days. No name, only a letter engraved inside the lid, and a photograph cut in half. You trace it through seven streets, house by house.',
    [
      fc('Tìm đúng người, trả đúng cách', 'Find the right person and return it properly',
        'Người nhận là một góa phụ. Bà nhìn chiếc đồng hồ rất lâu trước khi cầm lấy, bảo chồng cũ đánh mất nó từ ba mươi năm trước. Bạn ngồi nghe bà kể chuyện suốt một giờ rồi trao lại nửa tấm ảnh vừa ghép khớp.',
        'The recipient is a widow, and she looks at the watch a long time before taking it. She says her husband lost it thirty years ago. You sit and listen to her for an hour, and hand back the photograph, now pieced together.',
        { sanity: 5, rep: 3, network: 4 }, { flagsAdd: ['index_obeyed'] }),
      fc('Giữ lại chiếc đồng hồ, báo là không tìm được', 'Keep the watch and report you could not find the owner',
        'Bạn cất chiếc đồng hồ vào ngăn kéo. Nó không bao giờ chạy lại nữa, nhưng thi thoảng nửa đêm bạn nghe nó tích một tiếng rồi lặng im.',
        'You place the watch in a drawer. It never runs again, but sometimes at midnight you hear it tick once, then stop.',
        { sanity: -5, rep: -4 }, { flagsAdd: ['index_deviated'] }),
      fg('Bán chiếc đồng hồ rồi quyên tiền cho một nhà tế bần', 'Sell the watch and donate the proceeds to an almshouse', [
        [60, 'Số tiền không lớn nhưng nhà tế bần ghi tên bạn vào sổ công đức. Proxy thở dài, nhận xét bạn là kiểu Proxy khó đoán.', 'The sum is small, but the almshouse enters your name in its ledger. The Proxy sighs and notes that you are an unpredictable kind of Proxy.', { sanity: 2, rep: 1, wealth: -3 }, { flagsAdd: ['index_deviated'] }],
        [40, 'Proxy tìm ra người chủ thật rồi gọi bạn lên giải thích vì sao chiếc đồng hồ biến mất.', 'The Proxy locates the real owner, and you are summoned to explain why the watch is gone.', { rep: -8, sanity: -5 }, { flagsAdd: ['index_deviated'] }]
      ])
    ], { age: [18, 70] }),

  fe('index_shadow_a_stranger', X, [1, 3],
    '[Người không biết mình bị theo] Prescript yêu cầu bạn theo một người lạ suốt cả ngày, ghi lại từng điểm họ dừng chân mà không để bị phát hiện. Người ấy sống bình dị: mua bánh, đọc báo, đứng ngắm con chó ven đường. Cuối ngày họ bước vào nhà thờ, đặt lên bệ đá một chiếc hộp nhỏ.',
    '[Someone who does not know they are watched] A Prescript orders you to tail a stranger for one day, noting each place they stop, never letting them see you. They live like anyone: buy bread, read a paper, stand looking at a dog. At day’s end they enter a church and set a small box before the altar.',
    [
      fc('Ghi lại đủ và không can thiệp', 'Record it all and do not interfere',
        'Bạn viết bản báo cáo dài hai trang. Người ấy chẳng bao giờ hay biết, còn bạn cũng chẳng rõ lý do. Nhiều tuần sau bạn bỗng thấy mình ghé qua ngôi nhà thờ ấy, đứng nhìn chiếc hộp nhỏ.',
        'You write a two-page report. The person never knows, and you never learn why. But weeks later you find yourself passing that church and standing before a small box.',
        { rep: 4, sanity: -3, network: 2 }, { flagsAdd: ['index_obeyed'] }),
      fg('Mở chiếc hộp sau khi người ấy đi', 'Open the box after they leave', [
        [50, 'Bên trong là lọn tóc trẻ con cùng mảnh giấy ghi ngày sinh. Bạn đặt hộp về chỗ cũ, nhưng dòng cuối bản báo cáo của bạn bỏ trống lần đầu tiên.', 'Inside lie a lock of a child’s hair and a slip with a birthday. You set the box back, but your report is blank on the last line for the first time.', { sanity: -6, rep: 1 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Có người đứng khuất trong lối vào tối đã ghi lại cảnh bạn mở hộp. Tuần sau Proxy gọi bạn lên, đưa bản kê dài hơn cả báo cáo của bạn.', 'Another stands in the dark doorway, recording that you opened the box. The next week the Proxy calls you up and hands over a list longer than your own report.', { rep: -8, sanity: -5, heat: 4 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Tiến đến và nói chuyện với người ấy', 'Approach and speak to them',
        'Người ấy quay lại mà không chút ngạc nhiên. Họ nói đã biết bạn bám theo từ sáng, rủ bạn đi ăn tối. Bạn từ chối nhưng cứ nghĩ về lời mời ấy suốt cả tuần.',
        'The person turns and shows no surprise. They say they knew you were following since morning, and ask whether you would like dinner. You decline, but think about the invitation all week.',
        { sanity: -4, network: 4, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ], { age: [22, 90] }),

  fe('index_flower_for_grave', X, [0, 3],
    '[Hoa cho ngôi mộ] Prescript đưa bạn tới nghĩa địa bắc District 12, tay ôm bó hoa trắng tìm ngôi mộ không bia. Phải đặt hoa lúc 5:50 sáng khi không ai nhìn thấy. Tới nơi đã có sẵn một bó hoa khác còn tươi rói.',
    '[Flowers for a grave] A Prescript sends you to the northern cemetery of District 12 with white flowers and the address of a grave with no marker. You must lay them at 5:50 a.m. unseen. When you arrive, another bunch is already there, still fresh.',
    [
      fc('Đặt hoa của bạn cạnh bó hoa kia', 'Lay your flowers beside the other bunch',
        'Hai bó hoa nằm cạnh nhau trong sương sớm. Bạn đứng thẳng một phút, cảm giác như có ai đó đang cùng làm việc ấy với bạn từ một chốn khuất mặt.',
        'Two bunches lie side by side in the mist. You stand straight for a minute, and feel as if someone is doing the same thing with you from somewhere you cannot see.',
        { sanity: 4, rep: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Đổi hoa cho nhau, mang bó tươi đi', 'Swap the bunches and carry the fresh ones away', [
        [50, 'Bạn mang bó hoa kia về cắm vào bình. Hôm sau nó héo rũ khiến bạn nhận ra mình vừa làm chuyện bất kính mà chẳng hiểu vì sao.', 'You carry the other bunch home and put it in a vase. By the next day it has wilted, and you realize you just did something deeply disrespectful without knowing why.', { sanity: -5, rep: -2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Một người phụ nữ đứng khuất sau bia mộ nhìn bạn hồi lâu. Bà không nói lời nào, chỉ đợi bạn quay lưng rồi đặt lại bó hoa trắng lên mộ thật chậm.', 'A woman stands behind another marker, looking at you for a long time. She says nothing, but as you leave she sets the white flowers back on the grave, very slowly.', { sanity: -4, network: -2, rep: -2 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Ở lại đến khi người kia đến lấy lại', 'Stay until the other person comes back',
        'Bạn đợi đến sáu giờ rồi bảy giờ. Tám giờ có người đàn ông tới, trông thấy bạn liền dừng lại ngoài cổng. Hai người nhìn nhau qua những hàng mộ. Ông ta cúi đầu thật nhẹ trước khi quay đi.',
        'You wait until six, then seven. A man arrives at eight, sees you, and stops at the gate. The two of you look at each other across the rows of graves, and he bows lightly before turning away.',
        { sanity: 2, network: 3, rep: 1 }, { flagsAdd: ['index_deviated'] })
    ]),

  fe('index_count_the_steps', X, [0, 3],
    '[Đếm bước chân] Prescript chỉ có một dòng: đi từ cổng nhà ga District 9 đến quảng trường chính, đếm từng bước rồi dừng đúng bước thứ một nghìn hai trăm bốn mươi mốt. Bạn làm xong, đứng giữa quảng trường vắng. Dưới mũi giày có sợi chỉ vàng nằm thẳng trên mặt đá.',
    '[Counting the steps] A Prescript with a single line: walk from the District 9 station gate to the main square, count each step, and stop on exactly step twelve hundred and forty-one. You finish and stand in an empty square. At your feet a golden thread lies straight on the stones.',
    [
      fc('Nhặt sợi chỉ và mang về', 'Pick up the thread and carry it home',
        'Sợi chỉ nhẹ hơn bạn tưởng. Bạn quấn nó quanh ngón tay, nhận ra đầu bên kia chưa từng bị cắt. Nó dẫn về đâu đó mà bạn không dám dò theo.',
        'The thread is lighter than you expected. You wind it around a finger and realize the other end was never cut. It leads somewhere you do not dare follow.',
        { sanity: -3, rep: 3 }, { flagsAdd: ['index_deviated'] }),
      fc('Để nguyên, ghi vị trí vào báo cáo', 'Leave it and note its position in the report',
        'Bạn ghi vị trí chính xác từng bước rồi rời đi. Đêm đó trời đổ mưa. Sáng hôm sau sợi chỉ biến mất, chẳng ai nhận mình đã nhặt.',
        'You note the exact position to the step and leave. That night it rains, and the next morning the thread is gone. Nobody says who took it.',
        { rep: 4, sanity: 1 }, { flagsAdd: ['index_obeyed'] }),
      fg('Đi theo sợi chỉ thay vì dừng đúng bước', 'Follow the thread instead of stopping on the step', [
        [45, 'Sợi chỉ luồn qua ba con hẻm tới cánh cửa gỗ, sau cửa là căn phòng nhỏ chỉ kê chiếc ghế bên cuộn Prescript trắng. Bạn chẳng biết ai bỏ lại, cứ ngồi đợi mãi mà không ai tới.', 'The thread leads through three alleys to a wooden door, and behind the door is a small room with a chair and a blank scroll of Prescript. You do not know who left it. You sit and wait, and no one comes.', { sanity: -5, rep: 5, network: 3 }, { flagsAdd: ['index_deviated'] }],
        [55, 'Sợi chỉ cụt ngủn trước bức tường trơn. Bạn đứng chôn chân đến sẩm tối rồi quay về với cảm giác vừa bị trêu ngươi.', 'The thread ends at a bare wall. You stand there until dark, then head home feeling you have been played with.', { sanity: -4, rep: -2 }, { flagsAdd: ['index_deviated'] }]
      ])
    ]),

  fe('index_sealed_hour', X, [1, 3],
    '[Giờ bị niêm phong] Messenger đưa bạn cuộn Prescript niêm kín, dặn chỉ mở lúc 3:10 sáng. Bạn biết 3:10 là giờ Sweeper rảo quanh Backstreets; trước nay Index chưa từng bắt ai ra ngoài vào giờ ấy. Đồng hồ trong phòng bạn chạy chậm vài phút.',
    '[The sealed hour] The Messenger hands you a rolled Prescript with instructions to open it at 3:10 a.m. You know 3:10 is when Sweepers roam the Backstreets, and the Index has never sent anyone out at that hour. The clock in your room runs a few minutes slow.',
    [
      fc('Mở đúng giờ và làm theo', 'Open it on time and obey',
        'Prescript bảo bạn ở yên trong phòng, tắt đèn rồi ngồi hướng ra cửa sổ. Bạn ngồi suốt ba mươi phút. Ngoài hẻm có tiếng bước chân đi qua chậm rãi, dừng trước cửa nhà bạn đúng một nhịp rồi đi tiếp.',
        'The Prescript tells you to stay in the room, turn off the light, and sit facing the window. You sit for thirty minutes. In the alley footsteps pass, slow, and pause right at your door for one beat then move on.',
        { sanity: -6, rep: 5 }, { flagsAdd: ['index_obeyed'] }),
      fg('Mở sớm vài phút để chuẩn bị', 'Open it a few minutes early to prepare', [
        [55, 'Bạn đọc dòng đầu: ở yên trong phòng. Bạn thở phào, nhưng dòng thứ hai ghi bạn đã mở sớm bốn phút nên tờ này mới tồn tại. Bạn bật cười rất khẽ, chẳng hiểu vì sao.', 'You read the first line: stay in your room. You exhale, but the second line says you opened it four minutes early, and that is why this one exists. You laugh very quietly, not knowing why.', { sanity: -3, rep: 3 }, { flagsAdd: ['index_deviated'] }],
        [45, 'Tờ Prescript tự cháy xém mép ngay khi bạn mở sớm. Người đưa tin hôm sau không nói lời nào, từ đó bạn chẳng nhận Prescript niêm kín nữa.', 'The Prescript’s edges scorch as you open it early. The courier says nothing the next day, but from then on you are not handed sealed scrolls.', { sanity: -5, rep: -6 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Không mở, trả lại nguyên niêm phong vào sáng hôm sau', 'Leave it unopened and return it sealed the next morning',
        'Messenger nhận lại, thấy niêm phong còn nguyên liền gật đầu chẳng nói gì. Cái gật ấy khiến bạn nghĩ mình vừa vượt qua bài kiểm tra khác hẳn đề bài được giao.',
        'The Messenger takes it back, sees the seal intact, and nods without a word. Something in that nod makes you think you just passed a different test than the one you were given.',
        { sanity: 1, rep: 4 }, { flagsAdd: ['index_deviated'] })
    ], { age: [24, 90] }),

  fe('index_chalk_marks', X, [0, 2],
    '[Vạch phấn trên phố] Prescript bảo bạn dùng phấn trắng vẽ ký hiệu vòng tròn khuyết tại mười hai điểm trên phố, mỗi điểm cách nhau đúng bảy mươi lăm bước. Người qua đường tò mò ngó theo. Một đứa trẻ hỏi bạn đó có phải trò chơi không.',
    '[Chalk marks on the street] A Prescript directs you to draw a small white symbol, a circle with a gap, at twelve different places on the street, each exactly seventy-five steps apart. Passersby watch curiously, and a child asks whether it is a game.',
    [
      fc('Nói đó là một trò chơi và để nó vẽ thêm một vạch', 'Say it is a game and let the child draw one mark',
        'Đứa trẻ vẽ ký hiệu thứ bảy bằng tay trái hơi lệch. Bạn không sửa. Hôm sau mười hai ký hiệu bị mưa rửa sạch, riêng cái thứ bảy vẫn còn nguyên.',
        'The child draws the seventh mark with the left hand, a little crooked. You do not correct it. The next day rain washes away all twelve except the seventh, which remains.',
        { sanity: 4, network: 3, rep: 1 }, { flagsAdd: ['index_deviated'] }),
      fc('Vẽ đủ mười hai và bảo đứa trẻ đừng chạm', 'Draw all twelve and tell the child not to touch',
        'Đứa trẻ lùi lại nghe lời. Mười hai ký hiệu xong đúng hẹn. Bạn ngoái nhìn dọc con phố, nhận ra chúng ghép thành hình khối có lẽ chỉ từ trên cao mới thấy rõ.',
        'The child steps back, obeying. Twelve marks are finished on time. You look back at the whole street and see they form a shape that probably only shows from above.',
        { rep: 4, sanity: -1 }, { flagsAdd: ['index_obeyed'] }),
      fc('Vẽ mười một nơi, bỏ qua một nơi vì có người đang ngủ', 'Draw eleven and skip one where someone is sleeping',
        'Bạn đi vòng qua người vô gia cư đang ngủ trên bậc thềm. Bản báo cáo vẫn ghi đủ mười hai nên không ai kiểm. Tối đó quay lại, bạn thấy người ấy đã thức, đang dõi theo một vạch phấn xa xa.',
        'You skirt a homeless person sleeping on a step. On the report you write twelve, and no one checks. That evening you pass again, and the person is awake, looking at a chalk mark far down the road.',
        { sanity: 2, rep: -2 }, { flagsAdd: ['index_deviated'] })
    ], { age: [18, 70] }),

  fe('index_weight_of_prescript', X, [2, 3],
    '[Sức nặng của Prescript] Tờ Prescript tới tay, lần đầu tiên bạn hiểu ý nó. Nó bắt bạn dẫn người lạ vào phòng kín để người ấy không bao giờ bước ra nữa. Bạn hiểu lý do vì đã đọc đủ nhiều Prescript để thấy sợi chỉ nối chúng với nhau. Bạn biết đó không phải thứ mình muốn hiểu.',
    '[The weight of a Prescript] A Prescript reaches you, and for the first time you understand it. It tells you to lead a stranger into a room, and that person will not come out. You know why, because you have read enough Prescripts to see the thread connecting them. You know it is not something you wanted to know.',
    [
      fc('Làm đúng như Prescript', 'Do exactly as the Prescript says',
        'Người ấy nhìn bạn lúc bước vào, bình tĩnh như thể đã chờ sẵn từ lâu. Cánh cửa khép lại. Bạn đứng ngoài hành lang rất lâu, không khóc nhưng chẳng còn nghe rõ tiếng chuông cuối ngày.',
        'The person looks at you as they enter, very calm, as if having waited long. The door closes, and you stand in the corridor for a long time afterward. You do not cry, but you no longer hear the day’s last bell clearly.',
        { rep: 7, sanity: -14, heat: 4 }, { flagsAdd: ['index_obeyed', 'index_led_the_stranger'] }),
      fg('Đưa người ấy vào phòng, nhưng cho họ biết trước', 'Lead them in, but tell them beforehand', [
        [55, 'Nghe xong, người ấy cười mệt mỏi bảo mình đoán sẵn rồi. Họ nhờ bạn gửi chiếc phong bì theo địa chỉ ghi sẵn rồi tự bước vào phòng. Bạn đi gửi phong bì ngay trong ngày.', 'The person listens, smiles a very tired smile, and says they had guessed. They hand you an envelope, asking you to send it to an address, then step into the room alone. You send the envelope the same day.', { sanity: -8, rep: 3, network: 4 }, { flagsAdd: ['index_deviated', 'index_led_the_stranger'] }],
        [45, 'Người ấy hoảng loạn bỏ chạy ra cửa. Hai Proxy đứng sẵn bên ngoài giữ họ lại, còn bạn bị gọi vào văn phòng nghe giọng nói rất dịu của người vừa thất vọng.', 'The person panics and bolts for the door. Two Proxies waiting outside hold them back, and you are summoned to an office with the very gentle voice of someone disappointed.', { rep: -10, sanity: -9, heat: 6 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Từ chối thi hành Prescript này', 'Refuse to carry out this Prescript',
        'Bạn đặt tờ giấy xuống bàn, nói mình không làm được. Người nhận lặng thinh một lúc rồi cất tờ giấy sang chiếc phong bì khác. Không ai trừng phạt bạn, nhưng trọn một năm sau chẳng có Prescript nào tới tay bạn nữa.',
        'You set the paper down and say you cannot. The recipient is silent a long while, then files the paper in a different envelope. Nobody punishes you. But for a whole year afterward no Prescript reaches your hands.',
        { sanity: 3, rep: -9, network: -5 }, { flagsAdd: ['index_deviated'] })
    ], { age: [30, 90], weight: 11 }),

  fe('index_mirror_proxy', X, [1, 3],
    '[Proxy giống bạn] Một Proxy mới chuyển tới tổ bạn. Bạn nhận ra họ cũng đứng nghiêng đầu khi nghĩ, cũng cắn môi dưới khi đọc Prescript. Đồng nghiệp thì thầm rằng Index đôi lúc chọn những người giống nhau để thay thế. Không ai nói thay thế ai.',
    '[A Proxy like you] A new Proxy joins your team, and you notice they tilt their head when thinking, bite their lower lip when reading a Prescript, just as you do. A colleague whispers that the Index sometimes chooses similar people to replace one another. No one says who is replacing whom.',
    [
      fc('Làm quen và hỏi họ về quá khứ', 'Befriend them and ask about their past',
        'Họ kể về ngôi nhà cạnh ga tàu, con chó cùng đứa em gái. Bạn nhận ra mọi chi tiết trừ tên con chó nên không gặng hỏi thêm.',
        'They tell of a house beside a train station, a dog, and a younger sister. You recognize every detail except one: the dog’s name. You ask no more.',
        { sanity: -6, network: 5 }),
      fc('Giữ khoảng cách, làm việc riêng', 'Keep your distance and work alone',
        'Hai người làm việc cạnh nhau suốt năm mà hiếm khi mở lời. Cuối năm Proxy ấy chuyển đi, để lại trên bàn bạn dòng ghi chú lạ viết bằng nét chữ giống hệt nét chữ chính bạn.',
        'The two of you work side by side for a year and rarely speak. At year’s end the Proxy is transferred, and you find a strange note on your desk in handwriting that looks like your own.',
        { sanity: -4, rep: 1 }),
      fg('Báo cho Messenger về sự giống nhau', 'Tell the Messenger about the resemblance', [
        [50, 'Messenger ghi chép rồi bảo đó là chuyện thường. Họ chuyển bạn sang tổ khác nên bạn không bao giờ gặp lại Proxy ấy nữa. Hai năm sau bạn nghe tin người ấy lên chức Weaver.', 'The Messenger notes it and says it is common. They move you to another team, and you never see that Proxy again. Two years later you hear that person became a Weaver.', { rep: 3, sanity: -5, network: -3 }],
        [50, 'Messenger lặng đi rất lâu rồi dặn chuyện này không được phép nhắc lại nữa.', 'The Messenger is silent a long while, then says this is not to be raised again.', { rep: -4, sanity: -6, heat: 3 }]
      ])
    ], { age: [26, 90] }),

  fe('index_audit_of_deviation', X, [1, 3],
    '[Kiểm toán Prescript] Một Proxy trẻ chuyên giải nghĩa Prescript yêu cầu rà soát từng Prescript bạn đã thi hành để đối chiếu với điều khung cửi mong chờ. Cô ngồi đối diện bạn bên cuốn sổ rất dày.',
    '[Audit of the Prescripts] A young Proxy, one who interprets Prescripts, asks to review every Prescript you have carried out, one by one, against what the loom expected. She sits across from you with a very thick ledger.',
    [
      fc('Trả lời thành thật từng câu hỏi', 'Answer each question truthfully',
        'Cô lật từng trang; mỗi lần bạn kể chỗ đi chệch, cô gật đầu như đã biết sẵn. Cuối buổi cô bảo khung cửi chưa bao giờ đòi hỏi tuân phục tuyệt đối mà cần sự trung thực với lựa chọn của chính mình.',
        'She turns each page, and each time you describe a deviation she nods as if she already knew. At the end she says the loom never demanded perfect obedience. It demanded honesty about one’s own choice.',
        { sanity: 3, rep: 6, network: 4 }, { requires: [] }),
      fc('Nói bạn đã làm theo mọi Prescript đến từng chữ', 'Claim you followed every Prescript to the letter',
        'Cô mỉm cười, lật sang trang đánh dấu một ký hiệu nhỏ kèm ngày giờ rồi không nói thêm lời nào.',
        'She smiles and turns to a page marked with a small symbol, along with a date and hour. She says nothing more.',
        { sanity: -7, rep: -7 }),
      fg('Hỏi cô vì sao khung cửi cần kiểm toán', 'Ask her why the loom needs an audit at all', [
        [50, 'Cô nhìn bạn hồi lâu rồi đáp khung cửi không cần, nhưng Proxy thì cần. Cô nói câu đó khẽ như lời thú nhận. Từ dạo ấy cô nhắn cho bạn thêm vài lần, mỗi lần vỏn vẹn một dòng.', 'She looks at you for a long time, then says the loom does not need it, but Proxys do. She says it quietly, like a confession. From then on she sends you a message a few more times, always a single line.', { rep: 5, network: 6, sanity: -2 }],
        [50, 'Cô khép cuốn sổ, cúi đầu rất nhẹ bảo buổi kiểm toán đến đây là xong. Bạn bước khỏi phòng mà chẳng rõ mình vừa qua hay đã trượt.', 'She closes the ledger, nods very slightly, and says the audit ends here. You leave the room unsure whether you passed or failed.', { sanity: -4, rep: 0 }]
      ])
    ], { age: [28, 90] }),

  fe('index_weaver_ask', X, [2, 3],
    '[Câu hỏi của Weaver] Một Weaver gọi bạn xuống kho ngầm dưới tòa nhà Index, nơi con lắc mực vẫn đung đưa, hỏi một câu: nếu Prescript tiếp theo bảo bạn làm điều ngược lại với mọi niềm tin, bạn sẽ làm gì? Họ không đòi câu trả lời thành lời mà chỉ xem bạn chìa bàn tay nào ra.',
    '[The Weaver’s question] A Weaver calls you down to the vault under the Index building, where the ink pendulum still swings and asks one thing: if the next Prescript tells you to do the opposite of everything you believe, what will you do? They need no spoken answer. They only need to see which hand you reach out.',
    [
      fc('Đưa tay phải ra, nhận Prescript', 'Extend your right hand and accept the Prescript',
        'Weaver đặt tờ giấy vào lòng bàn tay bạn: tờ giấy trống trơn. Họ bảo bạn đã trả lời đúng.',
        'The Weaver places a sheet in your palm, and it is blank. They say you have answered correctly.',
        { rep: 8, sanity: -5, network: 4 }, { flagsAdd: ['index_obeyed'] }),
      fc('Đưa tay trái ra, từ chối', 'Extend your left hand and refuse',
        'Weaver mỉm cười rất khẽ, cất tờ giấy về ngăn kéo. Họ bảo trong chín năm qua bạn là người thứ ba đáp cùng kiểu ấy; người đầu tiên nay đã lên Weaver.',
        'The Weaver smiles very faintly and returns the paper to a drawer. They say you are the third in nine years to give that same answer, and the first has since become a Weaver.',
        { rep: 6, sanity: 2, network: 3 }, { flagsAdd: ['index_deviated'] }),
      fc('Không đưa tay nào, đứng nhìn vào mắt họ', 'Reach out neither hand and look into their eyes',
        'Weaver giữ ánh nhìn của bạn hồi lâu rồi quay đi trước. Họ không nói gì khiến bạn bước khỏi tòa nhà giữa trưa nắng trong im lặng. Một tuần sau tờ Prescript mới gửi tới, không chữ nào ngoài tên bạn.',
        'The Weaver holds your gaze a long time, then looks away first. They say nothing, and you leave the building in bright noon. A week later a Prescript arrives, with no words on it but your name.',
        { rep: 5, sanity: -6, network: 2 }, { flagsAdd: ['index_deviated'] })
    ], { age: [32, 90], weight: 11 }),

  fe('index_old_proselyte', X, [1, 3],
    '[Proselyte già nhất] Một Proselyte làm việc ba mươi năm, dải bịt mắt chưa tháo, không thăng cấp cũng chẳng ai rõ lý do. Ông chưa bao giờ hỏi. Hôm nay ông trao bạn cuộn Prescript giữ suốt hai mươi năm chưa mở rồi nhờ bạn đọc khi ông không còn ở đây.',
    '[The oldest Proselyte] A Proselyte who has served thirty years, blindfold still on, without promotion, and no one knows why, never asks. Today he hands you a Prescript scroll he has kept unopened for twenty years, and asks you to read it when he is no longer here.',
    [
      fc('Nhận cuộn Prescript, hứa sẽ đọc', 'Accept the scroll and promise to read it',
        'Ông cúi đầu rất thấp rồi đi. Ba tháng sau ông ngã quỵ trên bậc cầu thang. Bạn mở cuộn Prescript đọc trong căn phòng nhỏ của mình: chỉ vỏn vẹn một dòng: Anh đã làm đủ rồi.',
        'He bows very low and goes. Three months later he falls on a stairway, and you read the scroll in your small room. It holds a single line: You have done enough.',
        { sanity: -4, network: 4, rep: 3 }, { flagsAdd: ['index_old_proselyte_scroll'] }),
      fc('Từ chối, bảo ông tự mở', 'Refuse and tell him to open it himself',
        'Ông gật đầu chậm chạp, cất cuộn Prescript vào ngực áo. Bạn chẳng bao giờ biết ông có mở nó không. Ông vẫn đứng đúng vị trí cũ mỗi sáng, dõi theo bạn đi qua.',
        'He nods slowly and tucks the scroll into his coat. You never learn whether he opened it. He still stands at the same post each morning, watching you pass.',
        { sanity: -2, network: -2 }),
      fg('Mở cuộn Prescript ngay trước mặt ông', 'Open the scroll right before him', [
        [50, 'Ông thở rất khẽ khi bạn cất tiếng đọc. Dòng chữ chỉ có ba từ. Nước mắt chảy dài trên mặt ông mà ông chẳng đưa tay lên gạt.', 'He breathes very lightly as you read. The line is only three words, and you watch tears run down his face without his lifting a hand to wipe them.', { sanity: -3, network: 6, rep: 2 }],
        [50, 'Cuộn Prescript rỗng tuếch, chỉ hằn vệt mực khô. Ông nhìn nó rồi bật cười lạ lùng, bảo suốt hai mươi năm qua ông đã làm theo một tờ giấy trắng.', 'The scroll is empty, only a dried streak of ink. He looks at it and laughs very strangely. He says for twenty years he has been following a blank sheet.', { sanity: -8, rep: -2, network: 3 }]
      ])
    ], { age: [26, 90] }),

  fe('index_letter_to_self', X, [0, 3],
    '[Thư gửi chính bạn] Một Messenger đưa bạn bức thư ghi địa chỉ nhà bạn bằng chính nét chữ của bạn nhưng đề ngày ba tháng sau. Anh ta bảo đó là thủ tục thường lệ, dặn đừng mở trước ngày hẹn. Khi nói anh ta tránh nhìn thẳng bạn.',
    '[A letter to yourself] A Messenger hands you a letter bearing your home address, in your own handwriting, dated three months ahead. He says it is routine and tells you not to open it before the date. He does not look at you as he speaks.',
    [
      fc('Cất thư vào ngăn kéo và chờ ngày ghi', 'Put it in a drawer and wait for the date',
        'Ba tháng trôi chậm chạp. Đúng ngày ghi, bạn bóc thư đọc một câu: Bạn đã đúng khi đợi.',
        'Three months crawl. On the dated day you open the letter and read one line: You were right to wait.',
        { sanity: 2, rep: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Mở thư ngay trong đêm đó', 'Open the letter that very night', [
        [50, 'Bức thư chỉ có một dòng: Bạn không thể chờ, như tôi đã biết. Bạn ngồi trong bóng tối hồi lâu, cố nhớ xem mình đã viết nó tự lúc nào.', 'The letter holds one line: You could not wait, as I knew. You sit in the dark a long while, trying to recall when you wrote it.', { sanity: -7, rep: 2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Bức thư trống không. Ba tháng sau bạn nhận tờ thư khác cũng do chính mình gửi, lần này viết: Đáng lẽ bạn nên đợi.', 'The letter is blank. Three months later you receive another, also from yourself, and it reads: You should have waited.', { sanity: -5, rep: -4 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Đốt thư không đọc', 'Burn it unread',
        'Bạn châm lửa đốt bức thư ngay trong bếp. Tro rơi xuống bồn rửa rồi theo dòng nước cuốn trôi. Bạn cứ ngỡ sẽ có chuyện gì xảy ra, rốt cuộc chẳng có gì.',
        'You burn the letter in the kitchen. Ash falls into the sink, and the water washes it away. You keep thinking something will happen, but nothing does.',
        { sanity: -3, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ]),

  fe('index_bridge_with_no_name', X, [1, 3],
    '[Cây cầu không tên] Prescript dẫn bạn tới cây cầu không vẽ trên bản đồ nào, bắc giữa hai tòa nhà bỏ hoang. Bạn phải đi qua đúng ba lượt, mỗi lượt cách nhau mười phút, ghi chép mọi điểm khác lạ. Đến lần thứ ba, đầu cầu bên kia đã đổi khác hẳn.',
    '[The nameless bridge] A Prescript leads you to a bridge not on any map, stretching between two abandoned buildings. You must cross it exactly three times, ten minutes apart, and note every difference. By the third crossing the far end no longer looks the same as the first time.',
    [
      fc('Đi đủ ba lần, ghi chi tiết', 'Cross all three times and record every detail',
        'Bạn chép đầy sáu trang giấy. Tới lần thứ ba, cánh cửa bên kia đầu cầu đã đổi màu. Có người đàn ông đứng sẵn nhìn bạn như đã chờ từ lâu. Bạn gật đầu rồi quay gót.',
        'You write six pages of notes. On the third crossing the door at the far end has changed color, and a man stands there looking at you as though he has waited long. You nod, and turn back.',
        { rep: 5, sanity: -4, network: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Bước vào cánh cửa ở lần thứ ba', 'Step through the door on the third crossing', [
        [45, 'Bên trong là phòng đọc sách nhỏ ấm áp đầy ánh đèn. Ông lão đang đọc sách khẽ gật đầu chào bạn như khách quen. Bạn ngồi xuống đọc cùng đến lúc sực nhớ trời đã sáng.', 'Inside is a small reading room, warm and bright. An old man reads, and nods at you like a regular visitor. You sit and read until you notice it is already morning.', { sanity: 6, rep: 3, network: 4 }, { flagsAdd: ['index_deviated'] }],
        [55, 'Bên trong chỉ là căn phòng trống. Lúc quay ra thì cây cầu biến mất, khiến bạn mất trọn buổi chiều tìm đường về.', 'Inside is an empty room. When you turn back out, the bridge is no longer there, and you lose the whole afternoon finding your way home.', { sanity: -8, health: -4, rep: -3 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Dừng sau lần thứ hai và báo là đủ', 'Stop after the second crossing and report it done',
        'Báo cáo của bạn ngắn hơn hẳn. Messenger nhìn bạn bằng ánh mắt dành cho học trò lười, nhưng chẳng ai ép đi lượt thứ ba khiến bạn chợt thấy biết ơn.',
        'Your report is shorter, and the Messenger gives you the sort of look meant for a lazy student. But nobody makes you do the third crossing, and you realize you are feeling grateful.',
        { sanity: 2, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ], { age: [24, 90] }),

  // ------------------------------------------------------------------ stories and consequences
  fe('index_deviation_notice', X, [1, 3],
    '[Giấy báo chệch hướng] Phong bì không đề tên gửi về nhà bạn, bên trong chỉ có tờ giấy kê danh sách những Prescript bạn từng làm lệch kèm ngày giờ chính xác. Dưới cùng ghi một dòng: Khung cửi nhớ. Không một lời đe dọa nào, chính sự im lặng ấy mới đáng sợ.',
    '[Notice of deviation] An unmarked envelope arrives at your home, holding only a sheet listing each Prescript you have bent, with exact dates and hours. At the bottom is a single line: The loom remembers. There is no threat anywhere on it, and that is what is frightening.',
    [
      fc('Đốt tờ giấy và tiếp tục như cũ', 'Burn the sheet and carry on as before',
        'Bạn đốt nó thành tro, vậy mà sáng hôm sau tờ giống hệt lại tới. Lần này bạn cất nó vào ngăn kéo. Lần đầu tiên bạn tự hỏi mình đang sống vì lẽ gì.',
        'You burn it, but the next sheet arrives the following morning, identical. This time you keep it in a drawer, and for the first time you ask yourself what you are living for.',
        { sanity: -6, rep: -3 }),
      fg('Mang tờ giấy đến gặp Weaver', 'Take the sheet to the Weaver', [
        [55, 'Weaver liếc qua tờ giấy rồi mỉm cười nhẹ. Họ bảo đó chỉ là bản lưu kho, chẳng ai dùng để phạt ai, khuyên bạn chọn bừa một Prescript trong danh sách làm lại cho đúng coi như chuộc lỗi.', 'The Weaver looks at the sheet and smiles faintly. They say it is just an archive, and nobody uses it to punish anyone. They suggest you pick one Prescript on the list and redo it properly, as a form of atonement.', { rep: 6, sanity: 3, network: 4 }],
        [45, 'Weaver nhìn tờ giấy mà tắt nụ cười. Họ bảo không ai ở Index gửi tờ ấy. Bạn chợt hiểu có kẻ ngoài Index đang theo dõi mình.', 'The Weaver looks at the sheet and does not smile. They say no one at the Index sent it, and you realize someone outside the Index has been watching you.', { sanity: -10, heat: 8, rep: -2 }]
      ]),
      fc('Làm lại đúng một Prescript đã làm lệch', 'Redo exactly one Prescript you had bent',
        'Bạn chọn tờ đầu tiên: chiếc ô đỏ. Bạn đứng dưới cột đèn số bảy lúc 11:20 chờ một người không tới. Nửa đêm bạn cầm ô đi về. Sáng hôm sau tờ giấy bớt đi một dòng.',
        'You pick the first one: the red umbrella. You stand under lamp post number seven at 11:20 and wait for someone who does not come. At midnight you carry the umbrella home. The next morning, the sheet is missing one line.',
        { sanity: 3, rep: 4 }, { flagsAdd: ['index_obeyed'] })
    ], { requires: ['index_deviated'], age: [26, 90], weight: 8 }),

  fe('index_reward_of_obedience', X, [1, 3],
    '[Phần thưởng của sự tuân phục] Nhiều năm nay bạn gần như chưa làm lệch Prescript nào nên rốt cuộc có Weaver cho gọi bạn tới, bảo chính vì thế bạn được chọn cho nhiệm vụ đặc biệt. Họ dặn nhiệm vụ ấy không phải vinh dự mà là lòng tin; hai thứ ấy nặng nhẹ khác nhau.',
    '[The reward of obedience] For years you have almost never bent a Prescript, and a Weaver finally summons you to say that is why you were chosen for a special task. They say the task is not an honor but a trust, and the two weigh differently.',
    [
      fc('Nhận nhiệm vụ, không hỏi chi tiết', 'Accept the task and ask no details',
        'Nhiệm vụ hóa ra là mang con dấu tới cho một người sắp tắt thở. Bạn ngồi cạnh giường người ấy suốt ba đêm. Chẳng ai bảo trước với bạn rằng đó mới là phần việc chính.',
        'The task turns out to be carrying a seal to a person who is dying. You sit by their bed three nights, and nobody tells you that is what was needed.',
        { rep: 8, sanity: -4, network: 5 }, { meritAdd: 5 }),
      fc('Hỏi rõ trước khi nhận', 'Ask for specifics before accepting',
        'Weaver nhìn bạn rất lâu rồi thở dài bảo đã chọn nhầm người. Dù vậy họ vẫn giao việc, kèm ghi chú rằng biết hỏi cũng là một kiểu tuân phục.',
        'The Weaver looks at you a long while and says they have chosen the wrong person. But they hand you the task anyway, with a note that asking, too, is a form of obedience.',
        { rep: 4, sanity: -3, network: 3 }),
      fc('Từ chối để giữ sự tuân phục không bị thử thêm', 'Decline so your obedience is not tested further',
        'Weaver gật đầu bảo thế cũng rất tuân phục. Bạn bước ra ngoài, nhận ra mình vừa từ chối cánh cửa mà ít ai có cơ hội chạm tới.',
        'The Weaver nods and says that too is very obedient. You leave realizing you have just turned down a door few ever get the chance to knock on.',
        { sanity: 3, rep: -2 })
    ], { requires: ['index_obeyed'], age: [28, 90], weight: 8 })
];

export const INDEX_MINORS = [
  M('m_index_silk_thread', AGE.GROWN, fneed(X, 0),
    '[Sợi chỉ trên cổ tay] Bạn tỉnh dậy với sợi chỉ vàng quấn lỏng quanh cổ tay phải mà không nhớ đã quấn bao giờ. Trên bàn là tờ Prescript chưa mở bên cạnh chiếc cốc nước còn ấm.',
    '[Thread on the wrist] You wake with a golden thread wound loosely around your right wrist. You do not recall winding it. On the desk lies an unopened Prescript, and the glass of water beside it is still warm.',
    [C('Gỡ sợi chỉ ra và đọc Prescript', 'Unwind the thread and read the Prescript', 'Prescript chỉ có bốn chữ: Hôm nay đừng ra ngoài. Bạn ở nhà cả ngày, nghe tiếng mưa rào rất lớn dù ngoài trời khô ráo.', 'The Prescript has four words: Do not go out. You stay home all day, and hear a great deal of rain, though the sky is dry.', { sanity: -2, rep: 2 }), C('Giữ sợi chỉ, không đọc Prescript', 'Keep the thread and leave the Prescript unread', 'Cả ngày bạn thấy sợi chỉ siết chặt thêm chút một sau mỗi giờ. Chiều tối bạn bóc Prescript ra: tờ giấy trống không.', 'All day the thread tightens a little each hour. In the evening you open the Prescript, and it is blank.', { sanity: -4 })],
    I('Bạn tháo sợi chỉ, cất vào ngăn kéo.', 'You unwind the thread and put it in a drawer.'), { theme: 'work' }),
  M('m_index_wax_seal', AGE.GROWN, fneed(X, 0),
    '[Dấu sáp nguội] Dấu sáp niêm phong trên Prescript hôm nay nguội chậm khác thường; lúc chạm tay vào vẫn thấy còn mềm. Người đưa tin đã đi từ lâu, vậy ai đặt nó lên bàn trong lúc bạn ngủ?',
    '[The warm seal] The wax seal on today’s Prescript cools abnormally slowly, and when you touch it, it is still soft. The courier left long ago, so who placed it here while you slept?',
    [C('Hỏi hàng xóm có thấy ai không', 'Ask the neighbors whether they saw anyone', 'Hàng xóm bảo không thấy ai, chỉ nhắc cửa nhà bạn đã bỏ ngỏ suốt ba đêm nay. Bạn kiểm tra lại: cửa quả thực không khóa.', 'The neighbor says they saw no one, but mentions your door has been unlocked for three nights. You check, and it truly is.', { sanity: -4, network: 2 }), C('Mở Prescript và tiếp tục như thường', 'Open the Prescript and carry on', 'Prescript chỉ là một địa chỉ. Bạn ghi nhớ nó, đốt tờ giấy rồi quên bẵng chuyện dấu sáp. Một tuần sau đầu ngón tay vẫn thấy âm ấm mỗi khi nhớ lại.', 'The Prescript is only an address. You memorize it, burn the paper, and forget about the wax. A week later your fingertips still feel warm at the memory.', { sanity: -1, rep: 1 })],
    I('Bạn bỏ qua dấu sáp và quay lại việc.', 'You ignore the seal and return to work.'), { theme: 'work' }),
  M('m_index_stairwell_whisper', AGE.GROWN, fneed(X, 0),
    '[Tiếng thì thầm ở cầu thang] Ở cầu thang tòa nhà Index, bạn nghe hai Proxy rì rầm to nhỏ. Họ im bặt khi thấy bạn rồi cùng gật đầu. Trước khi họ dừng, bạn kịp nghe một cái tên quen thuộc của người mình từng biết.',
    '[A whisper on the stairs] On the stairs of the Index building, you overhear two Proxies whispering. They stop when they see you and both nod. There was a name you caught before they stopped, and it belongs to someone you know.',
    [C('Hỏi thẳng họ về cái tên', 'Ask them directly about the name', 'Họ nhìn nhau bảo bạn chỉ nghe nhầm. Một người khẽ chạm tay áo theo đúng ám hiệu bạn từng học.', 'They look at each other and say you misheard. One touches their sleeve in a way you have learned to recognize.', { sanity: -3, network: -1 }), C('Giả vờ không nghe và đi tiếp', 'Pretend not to have heard and walk on', 'Cả ngày bạn vương vấn cái tên ấy nên đến chiều bèn gửi lời nhắn ngắn cho người mang tên đó. Không có hồi âm.', 'All day you recall that name, and by evening you send a short note to the person who bears it. No reply comes.', { sanity: -2, network: 2 })],
    I('Bạn đi tiếp lên tầng trên.', 'You continue up to the next floor.'), { theme: 'work' }),
  M('m_index_hourglass', AGE.GROWN, fneed(X, 1),
    '[Chiếc đồng hồ cát nhỏ] Một Proxy tặng bạn chiếc đồng hồ cát bằng thủy tinh dày. Cát bên trong chảy rất chậm; bạn bấm giờ thử thấy đúng mười một phút thì ngưng dù chưa cạn. Anh ta nói món quà ấy nhắc bạn biết dừng đúng lúc.',
    '[A small hourglass] A Proxy gives you a small hourglass of thick glass. The sand inside flows slowly, and when you time it, it runs exactly eleven minutes and then stops even though not empty. He says it is a gift to remind you to stop at the right moment.',
    [C('Đặt nó trên bàn làm việc', 'Set it on your desk', 'Mỗi lần bạn liếc nhìn, cát lại dừng ở một ngấn khác nhau. Bạn bắt đầu nhớ lại những lúc mình làm chuyện không nên, nhận ra cát luôn ngưng sớm hơn dự đoán.', 'Each time you look, the sand has stopped at a different level. You begin to recall when you did something you should not, and notice the sand always stops sooner than expected.', { sanity: -2, rep: 1 }), C('Trả lại và nói bạn không cần nó', 'Return it and say you do not need one', 'Anh ta nhận lại chẳng nói nửa lời. Một tuần sau chiếc đồng hồ cát xuất hiện trở lại trong ngăn kéo của bạn, lần này nằm nghiêng.', 'He takes it back without a word. A week later the hourglass reappears in your drawer, lying on its side this time.', { sanity: -3 })],
    I('Bạn cất món quà vào hộc tủ.', 'You tuck the gift into a cabinet.'), { theme: 'work' }),
  M('m_index_quiet_tea', AGE.GROWN, fneed(X, 0),
    '[Ly trà không người rót] Trên bàn văn phòng Index, ly trà nóng đặt sẵn trước chỗ bạn lúc vừa tới. Không ai nhận đã pha. Cả tổ liếc nhìn nhau rồi ngoảnh đi. Hôm sau ly trà lại chờ sẵn đó, lần này kèm thêm viên đường.',
    '[The unpoured tea] At your desk in the Index office, a hot cup of tea waits in front of you when you arrive. No one claims to have set it. The whole team glances at one another and then away. The next day the tea is there again, this time with a sugar cube.',
    [C('Uống ly trà', 'Drink the tea', 'Vị trà giống hệt vị mẹ bạn từng pha. Bạn uống cạn rồi đặt ly xuống thật khẽ. Hôm sau ly trà không còn xuất hiện nữa, chỉ chừa lại khoảng trống trên bàn.', 'The tea tastes exactly like your mother used to make. You finish it and set the cup down carefully. The next day it no longer appears, and you feel an empty place on the desk.', { sanity: 3, rep: -1 }), C('Để nguyên ly trà, không chạm', 'Leave the tea untouched', 'Ly trà nguội dần. Cuối ngày người dọn dẹp mang đi mất. Hôm sau không còn ly trà nào nữa.', 'The tea cools. At day’s end a cleaner takes it away without a word. The next day there is no tea at all.', { sanity: -1, rep: 1 })],
    I('Bạn đẩy ly trà sang một bên và bắt đầu làm việc.', 'You push the tea aside and begin work.'), { theme: 'work' }),
  M('m_index_wrong_number', AGE.GROWN, fneed(X, 0),
    '[Số gọi nhầm] Điện thoại bàn reo; giọng một đứa trẻ xin gặp mẹ. Bạn đáp đây không phải số nhà nó. Đứa trẻ im lặng một lát rồi bảo mẹ dặn gặp chuyện cứ gọi số này, xong đọc rành rọt số điện thoại riêng của bạn.',
    '[A wrong number] Your desk phone rings, and a child’s voice asks for its mother. You say this is not its home. The child is silent a moment, then says its mother told it to call this number if anything happened, and reads out your exact private phone number.',
    [C('Hỏi đứa trẻ đang ở đâu', 'Ask the child where it is', 'Đứa trẻ đọc một địa chỉ căn hộ cách chỗ bạn ba con phố. Bạn tìm tới gõ cửa nhưng không ai mở, chỉ nghe tiếng chiếc radio nhỏ vọng từ bên trong.', 'The child answers with an address, an apartment three streets from yours. You go and knock. No one answers, but a small radio plays from within.', { sanity: -5, network: 2 }), C('Nói đứa trẻ nên gọi người khác, rồi cúp máy', 'Tell the child to call someone else and hang up', 'Một phút sau chuông lại reo nhưng bạn không nhấc máy. Suốt đêm điện thoại đổ chuông thêm hai bận nữa.', 'The phone rings again after a minute, and you do not answer. It rings twice more through the night.', { sanity: -4 })],
    I('Bạn đặt máy xuống và nhìn đồng hồ.', 'You set down the receiver and check the clock.'), { theme: 'work' }),
  M('m_index_ink_stain', AGE.GROWN, fneed(X, 0),
    '[Vết mực trên ngón tay] Cả buổi sáng bạn thấy vệt mực xanh trên ngón trỏ mà không nhớ đã chạm vào đâu. Đến trưa, đồng nghiệp ngồi cạnh cũng mang vệt mực y hệt, cùng ngón cùng vị trí. Hai người nhìn nhau chằm chằm.',
    '[Ink on a fingertip] All morning you notice a blue ink stain on your index finger without recalling touching anything. By noon the colleague beside you has the identical stain, same finger, same spot. The two of you stare at one another for a long time.',
    [C('Rửa sạch và không nhắc đến', 'Wash it off and say nothing', 'Vệt mực bám lì dù bạn chà đỏ ửng da. Hôm sau vẫn còn, hôm sau nữa vẫn còn. Bạn tập thói quen giấu bàn tay phải trong túi áo.', 'The stain will not go, though you scrub until the skin is red. The next day it is still there, and the next. You learn to keep your right hand in your coat pocket.', { sanity: -3 }), C('Hỏi đồng nghiệp xem họ đã làm gì', 'Ask the colleague what they did', 'Họ nói sáng nay vừa mở một Prescript. Bạn cũng vậy. Cả hai cùng lặng đi khi nghĩ hai tờ Prescript ấy có lẽ là một.', 'They say they opened a Prescript this morning. So did you. Both fall silent, realizing the two Prescripts may be one.', { sanity: -2, network: 3 })],
    I('Bạn nhét tay vào túi và quay lại bàn.', 'You tuck your hand in your pocket and return to your desk.'), { theme: 'work' }),
  M('m_index_candle_end', AGE.GROWN, fneed(X, 1),
    '[Mẩu nến cuối] Prescript đêm nay bảo bạn thắp một cây nến rồi để mặc nó cháy cạn. Bạn ngồi trong phòng nhỏ nhìn ngọn lửa thu nhỏ dần. Lúc chỉ còn đốm sáng li ti, bạn nghe tiếng ai đó thở ngay sau lưng.',
    '[The candle’s end] Tonight’s Prescript tells you to light a candle and let it burn out. You sit in your small room watching the flame shrink. When only a point of light remains, you hear someone breathing behind you, very close.',
    [C('Ngồi yên và để nến tắt', 'Sit still and let the candle go out', 'Ngọn nến tắt lịm, tiếng thở cũng dứt theo. Bạn ngồi trong bóng tối rất lâu, chợt nhận ra mình chưa bao giờ thấy an toàn đến thế.', 'The candle dies, and the breathing stops with it. You sit in the dark a long while, realizing you have never felt safer.', { sanity: 2, rep: 2 }), C('Quay lại nhìn', 'Turn around and look', 'Phía sau chỉ có bức tường hắt bóng bạn. Nhưng cái bóng không xoay cùng nhịp với bạn khiến đêm đó bạn thức trắng.', 'Behind you are only the wall and your own shadow on it. But the shadow did not turn at the same time you did, and you do not sleep that night.', { sanity: -7 })],
    I('Bạn thổi tắt nến sớm và đi ngủ.', 'You blow out the candle early and go to bed.'), { theme: 'work' }),
  M('m_index_paper_boat', AGE.GROWN, fneed(X, 0),
    '[Chiếc thuyền giấy] Một Messenger nhờ bạn thả chiếc thuyền giấy xuống con kênh sau tòa nhà. Bên trong đặt mẩu Prescript gấp kín. Bạn thả xuống, chiếc thuyền lại trôi ngược dòng. Messenger nhìn theo, nét mặt dịu hẳn xuống.',
    '[The paper boat] A Messenger asks you to float a paper boat down the canal behind the building. Inside is a folded sliver of Prescript. You release it, and it drifts upstream. The Messenger watches it go, his expression softening.',
    [C('Đi theo chiếc thuyền một đoạn', 'Follow the boat a stretch', 'Chiếc thuyền chui qua gầm cầu thấp rồi biến mất tăm. Bạn sang bờ bên kia nhìn vẫn chẳng thấy gì. Messenger vẫn đứng nguyên chỗ cũ, không hỏi bạn thấy gì.', 'The boat drifts under a low bridge and vanishes. When you reach the other side, nothing is there. The Messenger is still at the same spot, and does not ask what you saw.', { sanity: -2, rep: 2 }), C('Để nó đi và quay về văn phòng', 'Let it go and return to the office', 'Messenger cảm ơn bạn bằng một cái cúi đầu rất thấp.', 'The Messenger thanks you with a very low bow.', { sanity: 3 })],
    I('Bạn nhìn chiếc thuyền trôi một lúc rồi đi.', 'You watch the boat drift a moment, then go.'), { theme: 'work' }),
  M('m_index_birds_at_dawn', AGE.GROWN, fneed(X, 0),
    '[Đàn chim lúc rạng sáng] Prescript đêm qua chỉ bảo bạn bước ra ban công lúc 5:40 sáng. Đàn chim sẻ đậu im phăng phắc trên lan can, nhìn thẳng vào bạn. Khi đồng hồ điểm 5:41, cả đàn vỗ cánh bay đi đồng loạt mà không vang nửa tiếng động.',
    '[Birds at dawn] Last night’s Prescript told you only to step onto the balcony at 5:40 a.m. There a flock of sparrows sits silent on the rail, looking straight at you. When the clock strikes 5:41 they fly off together, without a sound of wings.',
    [C('Ở lại thêm một lúc nhìn trời sáng', 'Stay a while watching the sky brighten', 'Bầu trời chuyển sang màu cam rồi ửng vàng.', 'The sky turns orange then yellow.', { sanity: 4 }), C('Quay vào ngay và ghi lại vào sổ', 'Go back in at once and write it in the ledger', 'Bạn ghi lại đúng từng chi tiết nên Messenger khen bản báo cáo gọn gàng. Nhưng bạn nhớ rõ đàn chim nãy giờ chỉ nhìn mỗi bạn chứ không nhìn gì khác.', 'You record every detail precisely, and the Messenger praises the tidy report. But you remember that the birds were looking at you, not at anything else.', { rep: 2, sanity: -2 })],
    I('Bạn quay vào và uống nước.', 'You step back inside and drink water.'), { theme: 'work' }),
  M('m_index_second_hand', AGE.GROWN, fneed(X, 1),
    '[Kim giây đi ngược] Đồng hồ trong phòng Prescript có kim giây chạy ngược đúng một phút mỗi đêm. Bạn theo dõi suốt nhiều tuần, thấy phút ấy luôn trùng khớp khoảnh khắc bạn mở đọc dòng đầu tờ Prescript mới.',
    '[The second hand runs backward] The clock in your Prescript room has a second hand that runs backward for exactly one minute each night. You have watched for weeks, and that minute always coincides with reading the first line of a new Prescript.',
    [C('Ghi lại mỗi đêm vào một cuốn sổ riêng', 'Log it each night in a private notebook', 'Sau ba tháng bạn phát hiện ra quy luật không dám kể cho ai nghe. Quy luật ấy đoán trúng nội dung từng Prescript sắp tới, chưa lần nào lệch.', 'After three months you see a pattern you dare not mention to anyone. The pattern predicts what the Prescript will say, and you have never been wrong.', { sanity: -4, rep: 1 }), C('Tháo kim giây ra', 'Remove the second hand', 'Bạn gỡ kim giây khỏi mặt số. Đêm đó đồng hồ vẫn chạy đều, nhưng bạn cứ thấy thứ gì đó đang nhìn trừng trừng từ chỗ kim giây từng nằm.', 'You pry the second hand off the dial. That night the clock still runs, but you feel something watching you from where the hand used to be.', { sanity: -3 })],
    I('Bạn ngừng nhìn đồng hồ.', 'You stop looking at the clock.'), { theme: 'work' }),
  M('m_index_forgotten_name', AGE.GROWN, fneed(X, 1),
    '[Cái tên đã quên] Bạn đang viết thư thì sững lại vì quên bẵng tên người nhận dù từng viết hàng trăm lần. Bạn nhìn trang giấy hồi lâu rồi tìm thấy cái tên ấy nằm gọn trong tờ Prescript cũ cất dưới ngăn kéo khóa kín bấy lâu.',
    '[The forgotten name] You are writing a letter and suddenly cannot recall the recipient’s name, though you have written it hundreds of times. You sit staring at the page a long while, then find the name in an old Prescript, in a drawer you had long kept locked.',
    [C('Đọc lại Prescript cũ', 'Read the old Prescript again', 'Prescript ấy chỉ bảo bạn hãy quên cái tên đó tới một ngày hẹn trước. Hôm nay chính là ngày ấy. Bạn đặt lá thư xuống không viết thêm chữ nào.', 'The Prescript only says to forget that name until a certain day. Today is that day. You lay the letter down and write no more.', { sanity: -6, rep: 1 }), C('Viết tên ra giấy và gấp lại', 'Write the name on a slip and fold it', 'Bạn viết cái tên lên mẩu giấy nhỏ rồi kẹp vào ví. Mỗi lần mở ví bạn đều tránh nhìn tới nhưng chẳng dám xé bỏ.', 'You write the name on a small slip and tuck it in your wallet. Each time you open the wallet you avoid looking at it, and do not dare tear it up.', { sanity: -3, network: 2 })],
    I('Bạn đặt bút xuống và không viết nữa.', 'You put down the pen and write no more.'), { theme: 'work' }),
  M('m_index_scarf_gift', AGE.GROWN, fneed(X, 0),
    '[Chiếc khăn từ người không quen] Người lạ để lại chiếc khăn len xám trước cửa nhà bạn kèm mảnh giấy: Mùa đông này sẽ lạnh hơn bạn nghĩ. Chiếc khăn vừa khít cổ bạn, vương mùi sáp nến.',
    '[A scarf from a stranger] A stranger leaves a gray wool scarf at your door with a slip: This winter will be colder than you think. The scarf fits your neck exactly, and smells of candle wax.',
    [C('Quàng khăn đi làm', 'Wear the scarf to work', 'Mùa đông ấy rét tới mức mặt sông đóng băng mỏng hai hôm liền. Bạn chẳng hề bị cóng nên đồng nghiệp ngầm ghen tị mà không nói ra.', 'That winter is so cold the river freezes thinly for two days. You are never chilled, and colleagues envy you without saying.', { health: 3, sanity: 2 }), C('Cất khăn vào tủ, không dùng', 'Put the scarf away unused', 'Mỗi sáng bạn đứng nhìn tủ áo rất lâu, không bao giờ mở ngăn có chiếc khăn. Sang mùa xuân, nó biến mất tự lúc nào.', 'Each morning you stand staring at the wardrobe a long while and never open the compartment holding the scarf. By spring it is no longer there.', { sanity: -2 })],
    I('Bạn đặt chiếc khăn lên ghế và quên nó.', 'You leave the scarf on a chair and forget it.'), { theme: 'work' }),
  M('m_index_prescript_pun', AGE.GROWN, fneed(X, 1),
    '[Prescript đùa] Tờ Prescript mới gửi tới có dòng cuối là câu đùa cợt về con vịt đi giày. Cả tổ đọc qua đều im phăng phắc. Rồi người Proselyte già nhất bật ra tiếng cười ngắn khiến cả phòng nín thở.',
    '[A joking Prescript] A Prescript arrives, and its last line is a small joke about a duck and a shoe. The whole team reads it, and no one laughs. Then the oldest Proselyte lets out one short sound, and the whole room holds its breath.',
    [C('Cười theo, rất khẽ', 'Laugh along, very quietly', 'Vài người khác cũng bật cười theo làm căn phòng bỗng nhẹ bẫng như vừa mở tung cửa sổ. Prescript chiều hôm đó không có câu đùa nào nên cả phòng hơi tiếc.', 'A few others laugh too, and the room suddenly feels lighter, as if someone opened a window. That afternoon’s Prescript holds no joke, and the whole room is mildly sorry.', { sanity: 3, network: 3 }), C('Giữ nét mặt trống rỗng', 'Keep your face blank', 'Bạn giữ gương mặt lạnh như đá. Không ai nhận xét, chỉ có người ngồi cạnh liếc nhanh rồi lặng lẽ xích ghế ra xa.', 'You keep a face like stone. No one comments, but the person beside you glances briefly and quietly slides their chair away.', { sanity: -1, rep: 1 })],
    I('Bạn đọc xong và gấp tờ giấy.', 'You finish reading and fold the paper.'), { theme: 'work' }),
  M('m_index_second_hand_watch', AGE.GROWN, fneed(X, 0),
    '[Người đứng ở góc đường] Sáng nào đi làm bạn cũng gặp người đàn ông mặc áo choàng nâu đứng góc đường. Hôm nay ông ta vắng mặt. Bạn dừng đúng chỗ ấy, thấy trên mặt đá lát vẽ vòng tròn phấn trắng nhỏ hơi khuyết.',
    '[The man at the corner] A man in a long brown coat stands at one street corner every morning you go to work. Today he is not there. You stop at that spot and see on the paving a small white chalk circle with a gap.',
    [C('Bước vào trong vòng tròn phấn', 'Step into the chalk circle', 'Không có gì xảy ra, nhưng bạn thấy quanh mình tĩnh lặng lạ thường như đang đứng giữa mắt bão. Người đi ngang liếc nhìn bạn rồi né sang lề bên kia.', 'Nothing happens. But you feel a strange quiet, as if standing in the eye of a storm. A passerby looks at you and steps aside.', { sanity: 3, rep: -1 }), C('Đi vòng qua vòng tròn', 'Walk around the circle', 'Bạn đi vòng qua; suốt quãng đường tới văn phòng vẫn thấy như có ánh mắt dõi theo từ đâu đó trên cao.', 'You walk around, and the whole way to the office you feel eyes on you from somewhere above.', { sanity: -2 })],
    I('Bạn nhìn vòng tròn rồi đi tiếp.', 'You glance at the circle and walk on.'), { theme: 'work' }),
  M('m_index_hours_gone', AGE.GROWN, fneed(X, 1),
    '[Ba giờ biến mất] Bạn liếc đồng hồ lúc chín giờ, ngẩng lên nhìn lại đã thấy mười hai giờ trưa. Không nhức đầu, không mệt mỏi. Trên bàn là tờ Prescript bạn chắc chắn chưa từng chạm vào nhưng niêm phong đã bật sẵn.',
    '[Three hours gone] You glance at the clock at nine, then look again and it is twelve. Nothing else is odd, no headache, no fatigue. On the desk lies a Prescript you are certain you did not open, and it has been opened.',
    [C('Đọc Prescript đã mở', 'Read the opened Prescript', 'Prescript bảo bạn hãy giữ bình tĩnh rồi làm việc bình thường. Bạn đọc câu ấy ba bận, nhận ra nét chữ hệt như nét ghi chép mỗi ngày của chính mình.', 'The Prescript tells you to stay calm and carry on as usual. You read it three times, and realize the handwriting resembles your own daily notes.', { sanity: -6, rep: 1 }), C('Đem Prescript đến hỏi Messenger', 'Take the Prescript to ask the Messenger', 'Messenger nhìn tờ giấy rồi nhìn bạn, bảo hôm nay chẳng có Prescript nào phát cho bạn cả. Anh ta lật sổ ra cho bạn kiểm chứng: không hề có dòng nào.', 'The Messenger looks at it, then at you, and says no Prescript was issued to you today. He turns the ledger for you to see, and there is no line.', { sanity: -8, network: 1 })],
    I('Bạn cất tờ giấy và quay lại làm việc.', 'You tuck the paper away and return to work.'), { theme: 'work' }),
  M('m_index_stairs_count', AGE.GROWN, fneed(X, 0),
    '[Tầng cầu thang thừa] Cầu thang lên văn phòng có mười bốn bậc. Hôm nay bạn đếm thành mười lăm. Bạn bước xuống đi lại lần nữa vẫn mười lăm. Tới lượt thứ ba bạn dừng ngay bậc mười bốn, nhận ra bậc mười lăm chỉ là tờ giấy dán sát sàn.',
    '[The extra step] The stairs to your office have fourteen steps. Today you count fifteen. You go down and up again, fifteen. By the third time you stop at step fourteen and realize the fifteenth is no step but a sheet of paper taped to the floor.',
    [C('Bóc tờ giấy lên đọc', 'Peel the paper up and read it', 'Tờ giấy chỉ ghi độc một con số: mười lăm.', 'The paper bears one number: fifteen.', { sanity: -4, rep: 1 }), C('Bước lên tờ giấy và đi tiếp', 'Step onto the paper and walk on', 'Tờ giấy dính chặt đế giày bạn suốt ngày. Mỗi bước đi đều in vết mờ trên gạch; đến chiều dấu vết ấy dẫn thẳng tới chân bàn bạn.', 'The paper sticks to your sole the rest of the day. Each step leaves a faint print on the tiles, and by afternoon the prints lead straight to your desk.', { sanity: -3 })],
    I('Bạn đi vòng qua và lên cầu thang kế bên.', 'You skirt around and take the neighboring stairs.'), { theme: 'work' }),
  M('m_index_rain_prescript', AGE.GROWN, fneed(X, 1),
    '[Prescript dưới mưa] Một Messenger tìm gặp bạn giữa trời mưa để đưa tờ Prescript trần không phong bì. Mực lem nhòe khiến bạn chỉ đọc được nửa tờ. Anh ta bảo đó là nửa bạn cần biết, nửa kia sẽ tự tìm đến.',
    '[Prescript in the rain] A Messenger finds you in the rain and hands over a bare Prescript, no envelope. The ink bleeds, and you can read only half. He says that is the half you need to know, the other half will come on its own.',
    [C('Làm theo nửa đọc được', 'Follow the half you can read', 'Nửa Prescript bảo bạn ghé tiệm hỏi mua chiếc khóa. Người chủ tiệm đưa ngay cho bạn mà chẳng hỏi tiền, bảo bạn tới đúng giờ.', 'The half-Prescript tells you to visit a shop and ask for a lock. The seller hands you one without asking a price and says you arrived at the right time.', { sanity: -1, rep: 3, network: 2 }), C('Chờ nửa kia đến rồi mới làm', 'Wait for the other half to arrive first', 'Nửa kia tới sau ba ngày trên mảnh giấy khô ráo khác, ghi ngắn gọn: Anh đã đợi đúng, nhưng ba ngày là quá lâu.', 'The other half arrives three days later on a different sheet, dry. It reads: You waited rightly, but three days was too long.', { rep: -1, sanity: -2 })],
    I('Bạn gấp tờ giấy ướt cho vào áo.', 'You fold the wet paper into your coat.'), { theme: 'work' }),
  M('m_index_blank_hand', AGE.GROWN, fneed(X, 2),
    '[Bàn tay trắng] Một Weaver gọi bạn vào phòng riêng, trao cho bạn tờ giấy trắng tinh. Ông bảo đó là Prescript của bạn, tự bạn phải viết lấy nội dung trước nửa đêm. Ông không dặn thêm gì, khép cửa lại phía sau.',
    '[The blank hand] A Weaver invites you to a private room and hands you only a blank sheet. He says it is your Prescript, and you must write its content yourself. Deadline is tonight. He says nothing else, and closes the door behind you.',
    [C('Viết một dòng duy nhất', 'Write a single line', 'Bạn viết: Hãy tha cho tôi. Bạn nhìn dòng chữ ấy rất lâu rồi mới đưa ra. Weaver đọc xong khẽ gật, ném vào lò sưởi đốt trụi không nói nửa lời.', 'You write: Please forgive me. You stare at the line a long time before handing it over. The Weaver reads, nods, and burns it in the fireplace without a word.', { sanity: -5, rep: 4 }), C('Để tờ giấy trắng, trả lại', 'Leave it blank and return it', 'Weaver nhìn tờ giấy trống rồi mỉm cười rất khẽ. Ông bảo đó cũng là một Prescript, lại thường là tờ khó thi hành nhất.', 'The Weaver looks at the empty sheet and smiles faintly. He says that too is a Prescript, and often the hardest to carry out.', { sanity: 2, rep: 3 })],
    I('Bạn đặt tờ giấy lên bàn và đứng dậy.', 'You lay the sheet on the desk and stand.'), { theme: 'work' }),
  M('m_index_unread_stack', AGE.GROWN, fneed(X, 2),
    '[Đống Prescript chưa đọc] Trên bàn Weaver chất chồng Prescript chưa đọc cao khuất cả ngọn đèn. Sang ngày thứ ba bạn thấy nó vẫn cao nguyên vậy dù mình đã đọc cạn. Hóa ra mỗi tờ bạn đọc xong lại được thay bằng tờ khác.',
    '[The unread stack] On your Weaver’s desk a stack of unread Prescripts reaches high enough to hide the lamp. By the third day you notice it is still as tall, though you have read through them all. Each sheet you finish is replaced by another.',
    [C('Tiếp tục đọc, không hỏi', 'Keep reading and ask nothing', 'Bạn đọc nhanh dần, tới tuần thứ hai thì bắt nhịp cùng chính chồng giấy ấy. Nó không còn là gánh nặng mà hóa thành dòng chảy.', 'You read faster, and by the second week you realize you have begun to read in the rhythm of the stack itself. It is no longer a burden but a current.', { sanity: -3, rep: 3 }), C('Đứng dậy và xin nghỉ một ngày', 'Stand up and ask for a day off', 'Weaver trưởng cho bạn nghỉ phép. Lúc bạn quay lại thì chồng giấy đã biến mất. Mặt bàn sạch trơn nhưng nhìn vào chỉ thấy trống trải đến rợn người.', 'The head Weaver grants it, and the stack is gone when you return. The desk is bare, but you look at it and find it frighteningly empty.', { sanity: 3, rep: -2 })],
    I('Bạn lấy một tờ từ trên cùng và bắt đầu đọc.', 'You take a sheet off the top and begin reading.'), { theme: 'work' })
];

export const INDEX_DAILIES = [
  D('d_index_chalk_dust', AGE.GROWN, fneed(X, 0), 'Bụi phấn trắng dính trên mép ống tay áo bạn mà chẳng nhớ chạm vào đâu. Bạn phủi sạch nhưng vẫn hằn lại vệt vòng cung nhỏ.', 'White chalk dust clings to the edge of your sleeve and you cannot recall touching anything. You brush it off, and it leaves a small arc.', {}),
  D('d_index_silk_whisper', AGE.GROWN, fneed(X, 0), 'Tờ Prescript trượt ra khỏi phong bì với tiếng sột soạt nhẹ như tiếng lụa. Bạn đọc đi đọc lại nhiều lần dù chỉ có một dòng.', 'The Prescript slides from its envelope with a soft rustle like silk. You read it many times though it is only one line.', {}),
  D('d_index_clock_stuck', AGE.GROWN, fneed(X, 0), 'Đồng hồ trên tường văn phòng Index dừng đúng 2:45 rồi chạy tiếp sau một phút. Không ai nhắc tới, cả phòng chỉ nín thở mất một nhịp.', 'The wall clock in the Index office halts at exactly 2:45 and resumes after a minute. No one mentions it, but the whole room stops breathing for one beat.', {}),
  D('d_index_stamp_ink', AGE.GROWN, fneed(X, 0), 'Con dấu Index in lên giấy vết mực rất sâu lại lạnh buốt. Bạn chạm ngón tay thử liền thấy lòng bàn tay tê dại trong chốc lát.', 'The Index stamp leaves a very deep, very cold mark of ink on the paper. You touch it with a finger and your palm goes numb for a moment.', {}),
  D('d_index_corner_man', AGE.GROWN, fneed(X, 0), 'Người đàn ông đứng góc phố sáng nay nhìn bạn lâu hơn mọi bận. Bạn gật đầu chào; ông ta khẽ nhấc mũ đáp lễ rồi quay đi.', 'The man at the street corner looks at you longer than usual this morning. You nod, and he gently lifts his hat and turns away.', {}),
  D('d_index_ten_steps', AGE.GROWN, fneed(X, 0), 'Bạn vô thức đếm mười bước chân từ cửa nhà ra góc phố. Hôm sau cũng thế. Đến ngày thứ ba bạn đếm ra mười một bước rồi khựng lại hẳn.', 'You count ten steps from your door to the street corner without meaning to. The next day, the same. By the third day you count eleven, and stop altogether.', {}),
  D('d_index_umbrella_stand', AGE.GROWN, fneed(X, 0), 'Trong giá ô ở sảnh Index dựng chiếc ô đỏ không chủ. Nó nằm đó bao năm qua mà chẳng ai dám dời đi.', 'In the umbrella stand of the Index lobby is a red umbrella no one claims. It has been there for years, and no one dares move it.', {}),
  D('d_index_empty_chair', AGE.GROWN, fneed(X, 1), 'Chiếc ghế cuối bàn họp lúc nào cũng trống, nhưng ly nước trước mặt nó luôn đầy. Bạn chưa bao giờ thấy ai rót.', 'The chair at the end of the meeting table is always empty, but the glass before it is always full. You never see anyone pour.', {}),
  D('d_index_wet_footprints', AGE.GROWN, fneed(X, 0), 'Dấu chân ướt trên sàn hành lang kéo dài từ cửa vào tới trước bàn bạn rồi đứt đoạn. Trời hôm nay khô ráo, cũng chẳng ai nhận mình vừa bước vào.', 'Wet footprints on the corridor floor run from the entrance to just before your desk and stop. It has not rained today, and no one admits to entering.', {}),
  D('d_index_loom_hum', AGE.GROWN, fneed(X, 1), 'Dưới tầng hầm tòa nhà Index vọng lên tiếng ù đều đặn như khung cửi khổng lồ đang chạy. Hôm nay nó ngưng một nhịp làm cả tòa nhà như khựng lại nhìn nhau.', 'Beneath the Index building a steady hum like a giant loom runs. Today it pauses for one beat, and the whole building seems to look at itself.', {}),
  D('d_index_thread_snag', AGE.GROWN, fneed(X, 0), 'Sợi chỉ vàng mắc vào cúc áo bạn lúc bước khỏi thang máy. Bạn khẽ kéo: sợi chỉ dài ra mãi, vượt quá cả bề ngang hành lang.', 'A golden thread snags on your coat button as you step from the lift. You tug, and it keeps lengthening, longer than the entire corridor’s width.', {}),
  D('d_index_cold_cup', AGE.GROWN, fneed(X, 0), 'Ly cà phê vừa đặt xuống phút trước đã nguội ngắt. Bạn liếc đồng hồ thấy chỉ mới qua một phút nên chẳng buồn uống nữa.', 'The coffee you set down a minute ago has gone stone cold. You check the clock: only a minute has passed.', {}),
  D('d_index_postal_stamp', AGE.GROWN, fneed(X, 0), 'Con tem trên phong bì Prescript hôm nay in hình chiếc thuyền giấy. Bạn ngắm thấy đẹp rồi sực nhớ mình chưa từng thấy mẫu tem này bao giờ.', 'The stamp on today’s Prescript envelope shows a paper boat. You find it pretty, then realize you have never seen this kind of stamp before.', {}),
  D('d_index_shared_glance', AGE.GROWN, fneed(X, 0), 'Hai Proxy bắt gặp ánh mắt nhau lúc bạn đi ngang qua rồi cùng lúc quay mặt đi.', 'Two Proxies meet each other’s eyes as you pass, and both look away at once.', {}),
  D('d_index_scrap_paper', AGE.GROWN, fneed(X, 1), 'Mẩu giấy xé dở rơi dưới gầm bàn chỉ còn nửa dòng chữ: ...đừng tin vào dòng cuối.', 'A torn scrap lies under your desk with half a line of writing. You read: ...do not trust the last line.', {}),
  D('d_index_quiet_lift', AGE.GROWN, fneed(X, 0), 'Thang máy tòa nhà Index im ắng tới mức nghe rõ cả nhịp tim. Cửa vừa mở, người chờ bên ngoài liền dạt sang bên mà chẳng ai bước vào.', 'The lift in the Index building is so quiet you hear your own heartbeat. When the doors open, the person waiting outside steps aside, and no one enters.', {}),
  D('d_index_lamp_flicker', AGE.GROWN, fneed(X, 1), 'Đèn bàn của bạn chớp ba nhịp rồi sáng đều trở lại. Một Messenger đi ngang qua, vội ghi gì đó vào cuốn sổ nhỏ.', 'Your desk lamp flickers three times then glows steady. A passing Messenger jots something in a small notebook.', {}),
  D('d_index_stale_bread', AGE.GROWN, fneed(X, 0), 'Ổ bánh mì bạn mua sáng nay cứng như đá dù mới ra lò. Người bán bảo đó là mẻ cuối hôm qua, chẳng hiểu sao bạn lại chọn nó.', 'The bread you bought this morning is hard as stone though fresh from the oven. The baker says it is yesterday’s last batch, and does not know why you bought it.', {}),
  D('d_index_shoes_wet', AGE.GROWN, fneed(X, 0), 'Đôi giày bạn ướt sũng dù chẳng lội qua con phố nào đọng nước. Bạn ngồi lau khô, nghĩ tới những nơi bàn chân từng đi qua mà trí nhớ bỏ quên.', 'Your shoes are soaked through though you walked no wet street. You sit wiping them and think of the places your feet have been that memory did not keep.', {}),
  D('d_index_phone_hiss', AGE.GROWN, fneed(X, 1), 'Điện thoại bàn kêu rít nhẹ độ ba giây rồi im bặt. Không có ai bên kia đầu dây, chỉ nghe mơ hồ như có người cố nhớ lại một con số.', 'Your desk phone gives a soft hiss for about three seconds, then falls silent. No one is on the line, but you hear what sounds like someone trying to recall a number.', {}),
  D('d_index_tea_leaves', AGE.GROWN, fneed(X, 0), 'Lá trà dưới đáy tách xếp thành vòng tròn khuyết nhỏ. Bạn nhìn nó hồi lâu rồi đem rửa sạch không kể với ai.', 'The tea leaves at the bottom of your cup settle into a small circle with a gap. You watch them a long while, then rinse the cup and tell no one.', {}),
  D('d_index_pinned_note', AGE.GROWN, fneed(X, 0), 'Mẩu giấy ghim trên cửa phòng chỉ ghi một chữ: sớm. Bạn đứng nhìn nó, sực nhận ra mình đến sớm hơn mọi hôm.', 'A slip pinned to your door bears a single word: early. You stand looking at it, then realize you are arriving earlier than any other day.', {}),
  D('d_index_empty_lobby', AGE.GROWN, fneed(X, 0), 'Sảnh Index hôm nay vắng lặng đến mức tiếng giày bạn dội lại ba lần. Bảng chỉ dẫn bị lật ngược mà chẳng thấy ai tới sửa.', 'The Index lobby is so empty today that your shoes echo three times. The directory board has been turned upside down, and no one comes to fix it.', {}),
  D('d_index_unfinished_sentence', AGE.GROWN, fneed(X, 1), 'Đồng nghiệp mở đầu một câu rồi bỏ lửng mãi không nói hết. Cả phòng im lặng chờ đợi mà không ai giục giã. Cuối cùng cô ngồi xuống gật đầu như đã nói xong.', 'A colleague begins a sentence and never finishes it. The whole room waits, and no one urges her on. At last she sits and nods as if she had finished.', {}),
  D('d_index_street_mirror', AGE.GROWN, fneed(X, 0), 'Trong gương lồi ngã tư, bạn thấy mình bước chậm hơn thực tế một nhịp. Bạn đứng đợi rồi rảo bước nhanh hơn cho cái bóng trong gương kịp đuổi theo.', 'In the convex mirror at the crossing you see yourself moving a beat slower than reality. You wait, then hurry, and the reflection catches up.', {}),
  D('d_index_ledger_gap', AGE.GROWN, fneed(X, 1), 'Giữa cuốn sổ Prescript có trang giấy trắng dù bạn đinh ninh mình từng viết kín. Bạn lật qua lật lại mãi vẫn không tìm thấy đoạn bị mất.', 'Your Prescript ledger has a blank page in the middle that you are sure you used. You flip back and forth and cannot find the missing passage.', {}),
  D('d_index_stairs_hum', AGE.GROWN, fneed(X, 0), 'Cầu thang gỗ trong tòa nhà ngân lên một nốt trầm mỗi khi bạn dẫm bậc thứ bảy. Bạn bèn bỏ bước bậc ấy, đi cách quãng.', 'The wooden stairs in the building hum one low note each time you step on the seventh tread. You stop stepping there, and skip a stair.', {}),
  D('d_index_pressed_flower', AGE.GROWN, fneed(X, 0), 'Cánh hoa ép khô rơi khỏi cuốn sổ cũ. Bạn không nhớ mình từng ép nó, cũng chẳng nhớ ai đã tặng bông hoa ấy.', 'A dried pressed petal falls from an old notebook.', {}),
  D('d_index_envelope_weight', AGE.GROWN, fneed(X, 0), 'Phong bì chỉ lệnh hôm nay nặng trịch dù bên trong vỏn vẹn một mảnh giấy. Sức nặng vô hình của những sinh mệnh sắp sửa bị đoạt mạng.', 'Today’s Prescript envelope feels heavy though it holds only one sheet. The unseen weight of lives destined to be severed.', {}),
  D('d_index_twin_umbrellas', AGE.GROWN, fneed(X, 0), 'Hai chiếc ô giống hệt nhau dựng cạnh cửa. Một chiếc ướt, chiếc kia khô. Bạn cầm chiếc khô đi rồi nhận ra mình lấy nhầm của người khác.', 'Two identical umbrellas lean together at the door. One is wet, the other dry. You take the dry one and realize you have picked up someone else’s.', {}),
  D('d_index_night_watch_bell', AGE.GROWN, fneed(X, 1), 'Chuông gác đêm tòa nhà điểm mười hai tiếng nhưng bạn đếm được mười ba. Bạn ngước nhìn quanh: cả phòng đang nhìn chằm chằm vào bạn.', 'The building’s night bell tolls twelve times, but you count thirteen. You look around, and everyone is looking at you.', {}),
  D('d_index_fog_on_glass', AGE.GROWN, fneed(X, 0), 'Hơi thở của bạn đọng sương trên mặt kính, tức thì một ngón tay vô hình vạch lên đó vòng tròn khuyết. Khi bạn chớp mắt thì lớp sương đã tan biến.', 'Your breath fogs on the glass and an unseen finger draws a gapped circle in it. When you blink, the fog has cleared.', {})
];
