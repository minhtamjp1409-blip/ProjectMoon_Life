// Scenes built straight from what the Project Moon wikis say about each Finger, added after a
// lore check of the earlier Finger stories. The sources are named in PROGRESS_LOG.md. Where the
// wiki is silent the scene stays small and keeps the Finger's known temperament.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

export const FINGER_CANON_EVENTS = [
  // ------------------------------------------------------------------ Thumb: rank shown on badges, etiquette, collective punishment
  fe('thumb_badge_pins', 'Thumb', [0, 2],
    '[Ghim mới trên cổ áo] Capo gọi bạn ra giữa phòng rồi gài chiếc ghim nhỏ lên cổ áo bạn. The Thumb phân cấp bằng số mũi tên trên huy hiệu, còn bậc nhỏ bên trong thì phân biệt qua những chiếc ghim như thế này. Không ai vỗ tay. Mỗi Soldato trong phòng liếc nhanh cổ áo bạn, đếm thầm rồi nhìn đi chỗ khác.',
    '[A new pin on the collar] The Capo calls you into the middle of the room and fastens a small pin to your collar. The Thumb marks rank by the number of arrows on a badge, and the smaller step within a rank by pins like this one. No one applauds. Every Soldato in the room glances at your collar, counts, and looks away.',
    [
      fc('Cúi đầu cảm ơn, không nhìn thẳng vào mặt Capo', 'Bow thanks without looking the Capo in the face',
        'Capo gật rất nhẹ. Theo lệ, nhìn thẳng mặt cấp trên là thất lễ; bạn từng học bài học ấy bằng cách trả giá đắt. Cả buổi chiều bạn lấy ngón tay sờ chiếc ghim mỗi khi không ai để ý.',
        'The Capo nods very slightly. By custom, looking a superior in the face is a breach of etiquette, and you learned that the hard way. All afternoon you touch the pin with a finger whenever no one is watching.',
        { rep: 5, sanity: 2, network: 3 }),
      fg('Hỏi nhỏ xem chiếc ghim này cần bạn làm thêm gì', 'Ask quietly what this pin will require of you', [
        [55, 'Capo im lặng rồi đáp: Nó không đòi hỏi gì, chỉ báo rằng người ta đã bắt đầu đòi hỏi.', 'The Capo is silent then says: It demands nothing. It only signals that others have begun to demand.', { rep: 4, sanity: -3, network: 2 }],
        [45, 'Câu hỏi bị coi là đòi hỏi quyền lợi. Capo nói đúng một câu rất lịch sự rằng người đeo ghim không hỏi ghim để làm gì. Cả phòng đều nghe rõ.', 'The question is taken as claiming privilege. The Capo says one line, very politely, that those who wear pins do not ask what pins are for. The whole room hears.', { rep: -5, sanity: -3 }]
      ]),
      fc('Đeo ghim, nhưng giấu nó dưới cổ áo suốt một tuần', 'Wear the pin but hide it under your collar for a week',
        'Chẳng ai nhắc, nhưng bạn thấy hai Soldato cùng bậc nhìn mình như thể vừa làm chuyện kỳ quặc. Tới cuối tuần bạn lật cổ áo ra; họ nhìn thật lâu rồi ngoảnh đi.',
        'No one mentions it, but two Soldato of your step look at you as if you had done something odd. At week’s end you fold the collar back, and they look long then look away.',
        { sanity: -1, rep: 1 })
    ], { age: [18, 70] }),

  fe('thumb_blameless_comrade', 'Thumb', [1, 3],
    '[Người vô can bị phạt thay] Một Soldato trong tổ làm mất chuyến hàng; theo lệ The Thumb, hình phạt không dừng lại ở riêng người ấy. Bốn người cùng ca bị lùa vào kho, trong đó có người trẻ chưa từng chạm tay vào chuyến hàng. Hình phạt nhắm vào cái lưỡi, còn Capo chỉ định bạn là người cầm dao.',
    '[The blameless punished too] A Soldato on your team loses a shipment, and by Thumb custom the punishment does not stop at that person. Four who shared the shift are called into the store, among them a young one who never touched the cargo. The punishment is the tongue, and the Capo says you will be the one holding the knife.',
    [
      fc('Làm theo lệnh, nhanh và gọn', 'Carry out the order, quick and clean',
        'Bạn ra tay xong trong một phút; người trẻ không hé nửa tiếng cho tới khi mũi dao rút ra. Capo khẽ gật đầu. Nhiều tuần sau đó bạn chẳng nuốt nổi món nào cần nhai kỹ mà không nhớ lại cảnh ấy.',
        'You finish in a minute, and the young one makes no sound until the knife is withdrawn. The Capo nods. For many weeks afterward you cannot eat anything that needs chewing without remembering.',
        { rep: 6, sanity: -14, network: -6, heat: 3 }),
      fg('Xin nhận phần hình phạt của người trẻ về mình', 'Ask to take the young one’s share on yourself', [
        [50, 'Capo nhìn bạn hồi lâu rồi bảo The Thumb không đổi người, nhưng cho phép bạn gánh phần nhẹ hơn. Cánh tay bạn hứng vết rạch dài còn người trẻ chỉ mất chút ít. Cả hai nhớ mãi chuyện ấy cả đời.', 'The Capo looks at you long then says the Thumb does not swap people, but permits you a lighter share. You take a long cut along the arm, and the young one loses only a small part. Both remember it for life.', { health: -14, rep: 3, network: 8, sanity: -5 }],
        [50, 'Capo coi đó là sự xúc phạm luật hội khiến cả hai bạn đều lĩnh đủ phần phạt. Lúc bị dẫn đi, người trẻ nhìn bạn không trách móc, chỉ nhìn.', 'The Capo takes it as an insult to the law, and you both receive the full share. The young one looks at you as they are led away, not blaming, only looking.', { health: -18, rep: -8, sanity: -10 }]
      ]),
      fc('Từ chối cầm dao, nói bạn sẽ chịu thay phần của mình', 'Refuse to hold the knife and take your own share',
        'Capo gọi người khác thế chỗ. Bạn đứng đợi tới lượt mình; đến lúc dao hạ xuống bạn không thốt nửa chữ. Bạn không còn là kẻ cầm dao nhưng cũng chẳng còn giữ nguyên được lời nói.',
        'The Capo calls another to the knife. You stand waiting your turn, and when it comes you utter not a word. You are no longer the one holding the blade, but neither are you someone who can keep speech intact.',
        { health: -12, sanity: -9, rep: 2, network: 4 })
    ], { age: [26, 90], weight: 10 }),

  fe('thumb_outsider_rank_etiquette', 'Thumb', [1, 3],
    '[Lễ nghi với người ngoài] Vị thành viên hội đồng Wing, người được The Thumb xếp ngang hàng Sottocapo, ghé thăm trụ sở nên bạn được cử ra đón. The Thumb bắt thuộc lòng cấp bậc mọi phe để khỏi thất lễ với bề trên dù không cùng hội. Bạn nhớ rõ cấp bậc ấy nhưng chẳng rõ ông ta có biết mình đang được xếp ngang hàng nào.',
    '[Etiquette toward an outsider] A board member of a Wing, whom the Thumb counts as equal to a Sottocapo, visits the hall. You are assigned to receive them. The Thumb teaches its members the ranks of every faction so they never slight a superior, even one who is not their own. You recall that rank well, but do not know whether this person knows how they are counted.',
    [
      fc('Chào theo lễ dành cho một Sottocapo, không nhìn thẳng', 'Greet as one would a Sottocapo, not looking straight at them',
        'Vị khách thoáng sững người rồi đáp lễ rất đúng mực. Ông bảo lâu lắm rồi chẳng ai chào mình kiểu đó, hỏi bạn học ở đâu. Bạn đáp đó là lệ khiến ông nhìn bạn với chút nể sợ nhẹ nhàng.',
        'The guest is briefly startled then returns the courtesy precisely. They say no one has greeted them that way in a long time and ask where you learned it. You say it is custom. They look at you with mild awe.',
        { rep: 7, network: 7, sanity: -1 }),
      fg('Đón như một vị khách thường, tránh gây chú ý', 'Receive them as an ordinary guest, avoiding attention', [
        [55, 'Vị khách không than phiền, nhưng vào phòng họp lại ngồi ghế thấp hơn một bậc so với vị thế ông nghĩ. Underboss tinh ý nhận ra nên hôm sau cho gọi bạn lên.', 'The guest does not complain, but at the meeting sits one seat lower than they think they should. The Underboss notices and summons you the next day.', { rep: -5, sanity: -4 }],
        [45, 'Cả buổi họp trôi qua êm thấm chẳng ai nhắc tới lễ nghi. Bạn thở phào nhẹ nhõm, tự nhận ra mình vừa gặp may chứ chẳng phải đúng.', 'The whole meeting passes smoothly and no one mentions etiquette. You are relieved and realize you were lucky rather than right.', { rep: 2, sanity: 2 }]
      ]),
      fc('Hỏi thẳng vị khách muốn được đón theo cách nào', 'Ask the guest directly how they wish to be received',
        'Ông bật cười bảo đó là câu hỏi thực tế nhất mình nghe suốt tuần. Hai người đi dọc hành lang bàn chuyện cấp bậc hai bên giúp bạn học lỏm thêm hai điều chẳng sách nào chép.',
        'They laugh and say that is the most practical question they have heard all week. The two of you walk the corridor discussing the ranks of both sides, and you learn two things no book teaches.',
        { network: 7, rep: 3, sanity: 2 })
    ], { age: [28, 90] }),

  // ------------------------------------------------------------------ Index: pneumatic tubes, pagers, blindfolds, absurd Prescripts
  fe('index_pneumatic_tube', 'Index', [0, 3],
    '[Ống khí nén kêu lúc nửa đêm] Ống khí nén cũ trong phòng làm việc phì ra tiếng thở rồi nhả cuộn giấy nhỏ đóng dấu mang mã số lạ hoắc. Mực trên giấy còn ướt. Nó tới từ dưới sâu, nơi con lắc vẫn đung đưa nhịp cùng cả thành phố, ghi đúng một dòng: Đứng ở cầu thang tầng ba cho đến khi có người hỏi bạn đang làm gì.',
    '[The pneumatic tube sounds at midnight] The old pneumatic tube in your office gives a breathy sound and spits out a small rolled slip, stamped, with a code you have not seen. The ink is still wet. It came from deep below, where the pendulum swings with the whole city. There is one line: Stand on the third-floor stairs until someone asks what you are doing.',
    [
      fc('Đứng ở đó đến khi có người hỏi', 'Stand there until someone asks',
        'Bạn đứng chôn chân suốt đêm; người cất tiếng hỏi là bà lao công lên lau cầu thang lúc năm giờ sáng. Bạn đáp mình đang chờ. Bà khẽ gật đầu bảo ngày trước bà cũng từng đứng chờ y như vậy. Cả hai không nói thêm lời nào.',
        'You stand all night, and the one who asks is a cleaner arriving to mop the stairs at five in the morning. You say you are waiting. She nods and says she too once waited here like this. Neither says more.',
        { rep: 4, sanity: 2, network: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Hỏi chính mình thành tiếng để kết thúc sớm hơn', 'Ask yourself aloud to end it sooner', [
        [50, 'Bạn thì thầm câu hỏi vào bóng tối khiến tờ Prescript trong tay chợt ấm lên thoáng chốc như ai đó vừa hà hơi. Bạn về ngủ mà chẳng rõ mình vừa làm xong hay vừa bày trò.', 'You whisper the question into the dark, and the Prescript in your hand warms a moment, as if someone exhaled. You go to bed and do not know whether you completed it or played a trick.', { sanity: -3, rep: 2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Sáng hôm sau có Proxy ghé hỏi bạn đã làm gì ngoài cầu thang. Bạn kể thật để anh ta cắm cúi chép hồi lâu. Prescript xưa nay có bao giờ nói ai mới được phép hỏi đâu.', 'The next morning a Proxy comes to ask what you did on the stairs. You tell the truth, and they write for a long time. The Prescript never said who was allowed to ask.', { rep: -5, sanity: -5, heat: 3 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Bỏ cầu thang, ngồi trong phòng chờ tờ giấy khác', 'Leave the stairs and wait in your office for another slip',
        'Tờ giấy thứ hai chẳng bao giờ tới. Sáng ra ống khí nén im bặt còn mẩu giấy đầu vẫn nằm trơ trên bàn, mực khô cong đến mức chữ không đọc nổi nữa.',
        'The second slip never arrives. By morning the tube is silent, and the first slip still lies on the desk, the ink fully dry and the words no longer legible.',
        { sanity: -4, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ], { weight: 10 }),

  fe('index_pager_prescript', 'Index', [0, 3],
    '[Máy nhắn tin lúc ba giờ] Chiếc máy nhắn tin cũ được phát bỗng kêu tít lúc ba giờ sáng, màn hình hiện vỏn vẹn một câu: Không nói với ai một lời nào trong năm ngày. Thời hạn tính ngay từ lúc này. Bạn nhìn quanh phòng rồi liếc tờ lịch, nhớ ngay ngày mốt có cuộc họp mình buộc phải phát biểu.',
    '[The pager at three] The old pager you were issued sounds at three in the morning, and the screen holds only one sentence: Speak to no one for five days. The deadline starts now. You look around the room, then at the calendar, and realize the day after tomorrow holds a meeting where you must speak.',
    [
      fc('Im lặng năm ngày, mặc cuộc họp', 'Stay silent five days, meeting or no',
        'Bạn chép lời cần nói ra giấy. Vào cuộc họp, từng trang giấy chuyền tay thay cho giọng bạn. Hết ngày thứ năm bạn mới mở miệng; chẳng ai gặng hỏi vì sao.',
        'You write down what you need to say. At the meeting, the pages pass from hand to hand in place of your voice. After the fifth day, you speak again; nobody asks why.',
        { rep: 6, sanity: -4, network: -2 }, { flagsAdd: ['index_obeyed'] }),
      fg('Nói đúng ba câu trong cuộc họp và giữ im lặng phần còn lại', 'Say exactly three sentences at the meeting and stay silent otherwise', [
        [50, 'Cuộc họp khép lại. Máy nhắn tin im re không kêu thêm tiếng nào; tới ngày thứ sáu bạn sực nhận ra mình mãi chẳng biết lần ấy làm đúng hay sai vì chẳng ai hé môi nửa lời.', 'The meeting passes. The pager never sounds again, and on the sixth day you realize you never learn whether you did right. No one says anything at all.', { sanity: -3, rep: 2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Tay Proxy ngồi cuối phòng chép nguyên ba câu bạn nói rồi gật đầu như chờ sẵn điều ấy. Không ai giải thích gì. Sau đó bạn bị gọi vào văn phòng nghe giọng nói rất khẽ bảo bạn hiểu sai ý Prescript rồi.', 'A Proxy sits at the room’s end, noting your three sentences, nodding as if awaiting exactly that. No one explains. You are called to an office afterward and hear a very gentle voice say you misread the Prescript.', { rep: -6, sanity: -6, heat: 3 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Tắt máy nhắn tin và nói chuyện như thường', 'Switch off the pager and speak as usual',
        'Màn hình tối thui, nhưng suốt ngày bạn vẫn cảm thấy có gì đó nhìn trừng trừng qua lớp kính đen ấy. Bạn trò chuyện bình thường mà mỗi bận mở miệng lại nghe khoảng lặng rơi phía sau câu nói dài hơn cần thiết.',
        'The screen goes black, but all day you feel as if something looks at you through it. You speak as usual, and each time you open your mouth you hear a silence after your sentence, longer than necessary.',
        { sanity: -7, rep: -4 }, { flagsAdd: ['index_deviated'] })
    ], { weight: 10 }),

  fe('index_blindfold_removed', 'Index', [1, 2],
    '[Dải bịt mắt được tháo] Trong gian phòng nhỏ nhất tòa nhà Index, một Proxy tháo dải bịt mắt viền vàng của bạn đặt lên bàn. Lần đầu sau bao năm bạn nhìn thấy mặt những người từng ra lệnh cho mình. Họ trông bình thường đến đáng ngại. Một người trong số ấy cầm thanh kiếm riêng đặt vào tay bạn.',
    '[The blindfold is removed] In the smallest room of the Index building, a Proxy unties your gold-trimmed blindfold and lays it on the table. For the first time in years you see the faces of those who gave you orders. They look disturbingly ordinary. One of them holds a sword of your own and sets it in your hands.',
    [
      fc('Nhận thanh kiếm, không nói gì', 'Take the sword and say nothing',
        'Thanh kiếm đầm tay hơn thanh tiêu chuẩn bạn từng quen. Proxy dặn từ nay bạn không chỉ nhận Prescript mà còn phải giải nghĩa chúng. Bạn khẽ gật đầu, thấy hụt hẫng trống trải ngay chỗ dải bịt mắt từng che.',
        'The sword is slightly heavier than the standard one you knew. The Proxy says from now you will not only receive Prescripts but must interpret them. You nod, and feel an emptiness where the blindfold used to rest.',
        { rep: 6, sanity: -3, network: 4 }),
      fg('Hỏi vì sao họ lại trông bình thường đến thế', 'Ask why they look so ordinary', [
        [55, 'Proxy mỉm cười thật khẽ bảo ý chí thành phố vốn chẳng có hình thù riêng nên kẻ phụng sự nó cũng chẳng cần. Bạn ngẫm câu ấy suốt tuần, thấy nó vừa an ủi vừa rờn rợn.', 'The Proxy smiles faintly and says the city’s will has no shape of its own, so those who serve it need none. You think of that sentence all week, and gradually find it both comforting and frightening.', { sanity: -2, rep: 4, network: 3 }],
        [45, 'Cả phòng lặng phắc; lát sau Proxy bảo câu hỏi ấy chưa từng được nêu ra nên chẳng biết chép vào cuốn sổ nào.', 'The whole room is silent, then the Proxy says the question has never been asked and they know not which ledger to record it in.', { rep: -4, sanity: -5 }]
      ]),
      fc('Giữ dải bịt mắt trong túi áo', 'Keep the blindfold in your coat pocket',
        'Chẳng ai cản trở. Hễ gặp một Proselyte đeo dải vải che mắt đi ngang qua, bạn lại chạm tay vào túi áo nhớ cảm giác không phải nhìn bất cứ thứ gì.',
        'No one stops you. Each time you see a Proselyte pass with the cloth over their eyes, you touch your pocket and remember the feeling of not having to see.',
        { sanity: 1, rep: 1 })
    ], { age: [24, 80] }),

  // ------------------------------------------------------------------ Middle: Labors, tattoos, chains, collective vengeance, leaving
  fe('middle_pilgrimage_of_loyalty', 'Middle', [1, 2],
    '[Chuyến hành hương của lòng trung thành] Muốn lên bậc Great Sibling, Big Sibling phải vượt qua Pilgrimage of Loyalty gồm một hoặc nhiều Labor, những vụ báo thù hiểm nguy bậc nhất trong Book of Vengeance. Hội giao bạn Labor đầu tiên: một kẻ ngoài hội bị ghi tên vào Book từ ba mươi năm trước vì làm hại một Sibling quá cố. Lão đã già, giàu có lại vây kín vệ sĩ.',
    '[The Pilgrimage of Loyalty] To rise to Great Sibling, a Big Sibling must undertake the Pilgrimage of Loyalty, made up of one or more Labors, the riskiest vengeances in the Book. The team assigns your first Labor: an outsider entered in the Book thirty years ago for harming a dead Sibling. He is old, rich, and guarded.',
    [
      fc('Tự tay làm Labor đúng như Book ghi', 'Carry out the Labor exactly as the Book writes, with your own hands',
        'Bạn theo dõi suốt hai tuần rồi ra tay dứt điểm trong một đêm. Việc xong, hội trao bạn thêm hình xăm cùng sợi xích vàng. Người ta cúi đầu chào bạn sâu hơn trước, nhưng ánh mắt họ nhìn bạn cũng đổi khác.',
        'You spend two weeks watching and one night to finish. When done, the team grants you another tattoo and a gold chain. People greet you with a deeper bow than before, but you see their eyes have changed.',
        { rep: 9, sanity: -11, network: 5, heat: 6, health: -6 }, { meritAdd: 6, flagsAdd: ['middle_vengeful'] }),
      fg('Báo cho hắn biết trước, để hắn có cơ hội bồi thường', 'Warn him first so he has a chance to make amends', [
        [50, 'Ông già nôn ra khoản tiền khổng lồ rồi quỳ sụp trước di ảnh người quá cố. Hội ghi nhận Labor hoàn thành theo lối khác, nhưng Great Sibling nhìn bạn rất lâu bảo đó chẳng phải kiểu của Middle. Dù vậy họ vẫn cho qua vì lão trả đủ giá.', 'The old man pays a huge sum and kneels before a photograph of the dead. The team records the Labor as completed in another manner, but a Great Sibling looks at you long and says that is not the Middle’s way. You are let through anyway, since he has paid enough.', { rep: 3, sanity: 3, network: 4, wealth: 14 }, { flagsAdd: ['middle_forgiving'] }],
        [50, 'Ông già báo động đám vệ sĩ biến vụ Labor thành cuộc hỗn chiến. Bạn thoát thân được nhưng hai Little Sibling đi kèm bị thương nặng; Great Sibling kết tội bạn thiếu quyết đoán.', 'The old man tells his guards, and the Labor turns into a melee. You escape, but two Little Siblings with you are badly hurt, and the Great Sibling calls it your lack of resolve.', { health: -12, rep: -8, sanity: -7 }, { flagsAdd: ['middle_forgiving'] }]
      ]),
      fc('Xin hội đổi Labor khác, nói bạn chưa sẵn sàng', 'Ask the team for another Labor, saying you are not ready',
        'Hội lắng nghe không hề nổi giận. Ba tháng sau họ giao Labor khác nhẹ hơn nhưng chẳng kém phần nặng nề: bạn phải đi tới tận nhà từng Sibling để nghe họ kể về mất mát của mình.',
        'The team hears you and is not angry. Another Labor arrives after three months, lighter but no less heavy: you must visit the home of each in a group of Siblings and hear them tell what they lost.',
        { sanity: -4, rep: 4, network: 7 })
    ], { age: [32, 90], weight: 10 }),

  fe('middle_tattoo_for_vengeance', 'Middle', [0, 3],
    '[Hình xăm báo thù] Vụ Vengeance bạn góp tay vừa khép lại; theo lệ ai xong một Vengeance đều xăm thêm một hình. Số hình xăm trên da định rõ thứ bậc trong hội. Thợ xăm đặt mũi kim lên cánh tay bạn hỏi muốn xăm hình gì, bảo phần đông chỉ chọn tên kẻ bị báo thù.',
    '[A tattoo for a vengeance] A Vengeance you took part in has just been completed, and by custom each who completes one receives a tattoo. The number shows how high you stand. The team’s tattooist rests the needle on your arm and asks what image you want. He says most people simply choose the name of the one avenged.',
    [
      fc('Xăm tên người bị báo thù, như mọi người', 'Ink the name of the one avenged, like everyone',
        'Mũi kim lạnh ngắt đi đều nét. Xong việc, bạn ngắm cái tên ấy trên da thịt mình mà nhận ra chẳng biết người ấy từng sống ra sao. Cả hội gật đầu hài lòng còn bạn thấy người ta nhìn mình khác hẳn.',
        'The needle is cold and even. When done you look at that name on your skin and realize you do not know how that person lived. The team nods in satisfaction, and you feel regarded differently.',
        { rep: 6, sanity: -4, network: 5, health: -2 }, { flagsAdd: ['middle_vengeful'] }),
      fc('Xăm tên người đã bị hại, không phải tên kẻ bị báo thù', 'Ink the name of the one harmed, not of the one avenged',
        'Thợ xăm khựng tay đúng một nhịp rồi gật đầu chậm chạp, bảo đã mười năm chưa từng xăm kiểu tên như thế. Cả tổ liếc nhìn cánh tay bạn lúc bước vào; vài người khẽ cúi đầu rất nhẹ.',
        'The tattooist pauses a beat then nods very slowly. He says it has been ten years since he inked a name like that. The whole team looks at your arm when you enter, and some bow lightly.',
        { sanity: 4, rep: 5, network: 7, health: -2 }, { flagsAdd: ['middle_forgiving'] }),
      fc('Từ chối xăm, nói bạn chỉ làm vì bổn phận', 'Decline the tattoo, saying you acted only from duty',
        'Thợ xăm cất kim không bình phẩm nửa lời. Nhưng mấy tuần sau bạn thấy mọi người chăm chú ngó cánh tay trần của bạn; một Big Sibling bóng gió người không mang dấu khó lòng khiến hội tin cậy.',
        'The tattooist puts away the needle without comment. But in the following weeks you notice the team watching your bare arm, and a Big Sibling says one who bears no mark is hard to trust.',
        { sanity: 2, rep: -4, network: -3 })
    ], { age: [18, 70] }),

  fe('middle_collective_vengeance', 'Middle', [1, 3],
    '[Báo thù lan sang cả khu] Có Sibling bị hành hung trong quán rượu khu District 21 nên Book of Vengeance ghi án phạt cho kẻ động thủ. Tên đó cao chạy xa bay khiến hội đòi trả đũa toàn bộ những ai có mặt ở quán lúc ấy: chạm vào người nhà là cả đám phải trả giá. Danh sách dài mười hai người, tính cả cô phục vụ.',
    '[Vengeance spreads to the whole bar] A Sibling was beaten in a District 21 tavern, and the Book of Vengeance records the punishment for the one who struck. But that person has fled, and the team wants to retaliate against everyone in the tavern at the time. They say the Middle never lets anyone touch family without paying. The list has twelve names, including the waiter.',
    [
      fc('Đi cùng đoàn trả đũa, đúng như Book ghi', 'Join the retaliation party, as the Book writes',
        'Bạn đứng canh ngoài cửa suốt buổi tối không hề động tay. Nhưng sáng hôm sau cả dãy phố im phăng phắc; ngoài con hẻm có nữ phục vụ ngồi khóc nức nở. Hội thưởng bạn vì đã có mặt mà bạn chẳng rõ đó có đáng gọi là lời khen.',
        'You stand at the door through the evening and lift no hand. But the next morning the whole district is silent, and you see a waitress weeping in the alley. The team rewards you for attending, and you do not know whether that is praise.',
        { rep: 5, sanity: -10, network: 3, heat: 5 }, { flagsAdd: ['middle_vengeful'] }),
      fg('Đề nghị chỉ trừng phạt kẻ ra tay và kẻ đã giúp hắn trốn', 'Propose punishing only the attacker and whoever helped him flee', [
        [55, 'Big Sibling lắng nghe thật lâu rồi bảo Book quả thực chép điều khoản riêng cho trường hợp này ở phần sau. Danh sách rút gọn còn hai cái tên. Bạn đứng nhìn ông gạch mười cái tên, chợt hiểu ngay trong Middle vẫn có người đọc tới trang sau.', 'The Big Sibling listens very long then says the Book does indeed have a clause for such a case, in a later section. The list shrinks to two names. You watch them strike ten and understand that even in the Middle someone sometimes reads on to the later section.', { rep: 7, sanity: 4, network: 6 }, { flagsAdd: ['middle_forgiving'] }],
        [45, 'Hội chê đề nghị đó yếu đuối nên gạt bạn ra rìa. Hai người khác đi thay; lúc họ quay về bạn chẳng hỏi còn họ chẳng kể.', 'The team takes the proposal as weakness, and you are left out of the party. Two others go instead, and when they return you do not ask and no one tells.', { rep: -7, sanity: -5, network: -4 }, { flagsAdd: ['middle_forgiving'] }]
      ]),
      fc('Cảnh báo bí mật cho người phục vụ và vài người vô can', 'Secretly warn the waiter and a few of the blameless',
        'Bạn đánh tiếng cho họ ngoài chợ nên bốn người kịp rời khu trước tối. Cả hội tới nơi chỉ thấy tám người ở nhà. Big Sibling nhìn bạn một cái thật dài nhưng chẳng nói; bạn biết thừa ông đoán ra.',
        'You pass word to them in the market, and four leave the district before nightfall. The team finds only eight at home. The Big Sibling gives you one very long look, but you know he knows.',
        { sanity: 3, rep: -2, network: 4, heat: 4 }, { flagsAdd: ['middle_forgiving'] })
    ], { age: [26, 90], weight: 10 }),

  fe('middle_leaver_hunt', 'Middle', [1, 3],
    '[Một Sibling muốn rời hội] Nửa đêm, người Sibling cùng thời tìm gặp báo tin muốn rời Middle. Ai cũng thấu lệ hội: bước chân vào là gắn bó trọn đời, kẻ bỏ đi sẽ bị chính anh chị em truy sát tới chết hoặc phải tự tay lột sạch mọi dấu tích hội khỏi da thịt. Họ không cầu cứu bạn, chỉ muốn báo trước một tiếng.',
    '[A Sibling wants to leave] A Sibling of your cohort finds you at midnight and says they wish to leave the Middle. They know what that means: members of the Middle stay for life, and anyone who leaves is hunted by those who once called them family until they die or erase every trace of the Middle from themselves. They do not ask your help. They only want you to know beforehand.',
    [
      fc('Nói bạn không thấy gì và để họ đi', 'Say you saw nothing and let them go',
        'Họ cúi đầu rất sâu rồi biến mất vào con ngõ tối. Ba tháng sau bạn nghe phong phanh họ tự tay dùng axit xóa sạch mọi hình xăm trên chuyến tàu hàng.',
        'They bow very deep then vanish in the alley. Three months later you hear they burned off every tattoo with acid aboard a freight train.',
        { sanity: -6, rep: -2, network: 3 }, { flagsAdd: ['middle_forgiving'] }),
      fg('Báo Big Sibling theo đúng lệ', 'Report to the Big Sibling as custom demands', [
        [60, 'Big Sibling nghe xong cho người ấy ba ngày suy nghĩ lại. Ba ngày đó chính bạn phải ngồi canh bên cạnh. Họ không đổi ý; đêm cuối cùng họ bảo chẳng hề giận bạn.', 'The Big Sibling hears you and says the person will be granted three days to reconsider. In those three days you are the one who must sit beside them. They do not change their mind, and on the last night say they are not angry at you.', { rep: 6, sanity: -9, network: -5 }, { flagsAdd: ['middle_vengeful'] }],
        [40, 'Người ấy đoán sẵn nên bỏ đi ngay đêm gặp bạn. Hội tung quân truy lùng; lúc trở về tay không, họ chỉ ném lại cho bạn câu hỏi: Có biết gì không?', 'The person already knew and left the very night they met you. The team hunts, and when they return they carry nothing, only a question: Did you know?', { rep: -5, sanity: -7, heat: 4 }, { flagsAdd: ['middle_vengeful'] }]
      ]),
      fc('Giúp họ chuẩn bị: tiền, giấy tờ, một lối ra khỏi District', 'Help them prepare: money, papers, a way out of the District',
        'Bạn thức trọn đêm lo liệu cho họ chu toàn để tới rạng sáng họ nắm chặt tay bạn từ biệt. Bạn thừa biết mình vừa bước qua lằn ranh hội cấm kỵ, vậy mà nhìn theo bóng họ khuất sau cổng lòng lại nhẹ nhõm lạ kỳ.',
        'You spend the whole night preparing them, and when they leave at dawn they hold your hand a long time. You know you have crossed a line no one in the team wishes to see, and watch them vanish past the gate with a strange lightness.',
        { wealth: -10, sanity: 3, rep: -6, network: 5, heat: 8 }, { flagsAdd: ['middle_forgiving'] })
    ], { age: [28, 90], weight: 10 }),

  // ------------------------------------------------------------------ Ring: grading, auctions, schools, the Maestro's three pieces
  fe('ring_grade_civilian_art', 'Ring', [0, 1],
    '[Chấm điểm tranh của dân Backstreets] Dân Backstreets muốn được The Ring bảo kê phải nộp tác phẩm chấm theo thang chữ cái. Trượt lần đầu bị cảnh cáo, lần hai mất bảo hộ, lần ba xử tử ngay tại chỗ. Hôm nay bạn chấm bức tranh than của bà bán rau vẽ cảnh chợ cũ. Bà đã dính sẵn một phiếu trượt trước đó.',
    '[Grading Backstreets art] Backstreets residents who want the Ring’s protection must submit a work to be graded on a letter scale. One failing mark is a warning, two remove protection, three mean execution on the spot. Today you grade a painting by a vegetable seller, a charcoal rendering of her market. She already carries one failing mark.',
    [
      fc('Cho điểm đúng theo thước đo của Ring', 'Grade strictly by the Ring’s own measure',
        'Bức tranh vẽ vụng về lại hơi méo đường nét. Bạn đành cho trượt; bà bán rau đứng lặng nhìn tờ phiếu không cãi nửa lời rồi mất quyền bảo hộ của Ring. Cả buổi chiều bạn cứ nhớ mãi nét vẽ chiếc xe rau vì thật tình nó khá đẹp.',
        'The painting is clumsy and slightly crooked. You give a failing mark, and the vegetable seller stands still, regarding the paper, not objecting. She loses the Ring’s protection. All afternoon you try to recall the lines of the vegetable cart she drew, because it was actually rather lovely.',
        { rep: 4, sanity: -9, network: -4 }, { flagsAdd: ['ring_chased_perfection'] }),
      fg('Cho điểm đạt, dù bức tranh chưa tới', 'Give a passing mark though the work falls short', [
        [55, 'Bà bán rau cúi rạp đầu cảm ơn rồi hôm sau đặt giỏ rau tươi trước cửa nhà bạn. Một Docent đứng ngay sau lưng liếc bảng điểm, buông lời nhắc chuẩn của Ring là bất di bất dịch dù ai chấm đi nữa. Bạn bị ghi nhẹ một dấu.', 'The vegetable seller thanks you with a very deep bow and leaves a basket of greens at your door. A Docent standing behind you reads the mark and says only that the Ring’s standard is the standard, whoever grades. You are noted lightly.', { sanity: 4, network: 6, rep: -3 }, { flagsAdd: ['ring_kept_conscience'] }],
        [45, 'Tay Docent sau lưng xem lại bài rồi gạch sửa điểm ngay trước mặt bà bán rau. Bà không phản ứng như đã quen sẵn cảnh này. Bạn bẽ mặt còn bà mất quyền bảo hộ; cả hai cứ đứng sững đó tới lúc buổi chấm kết thúc.', 'The Docent behind you reviews and changes the mark right before the vegetable seller. She does not react, as if used to it. You lose face, and she loses protection, and both of you must stand there until it is done.', { rep: -7, sanity: -7 }, { flagsAdd: ['ring_kept_conscience'] }]
      ]),
      fc('Hướng dẫn bà sửa bức tranh và hẹn chấm lại', 'Coach her to revise the painting and arrange a regrade',
        'Bạn bỏ một giờ dưới mái hiên chỉ cho bà ba chỗ cần sửa. Ba hôm sau bà nộp lại bức tranh khá hơn hẳn nên đạt điểm đậu tuy thấp nhưng vừa đủ. Bà không nói tiếng nào, chỉ nắm chặt tay bạn một lúc.',
        'You show her three places to correct, in an hour, beneath an awning. She resubmits three days later, and the painting is much better. A passing mark, low but enough. She says nothing, only holds your hand a moment.',
        { sanity: 3, network: 6, rep: 2 }, { flagsAdd: ['ring_kept_conscience'] })
    ], { age: [18, 70], weight: 10 }),

  fe('ring_veiled_auction', 'Ring', [1, 3],
    '[Đêm đấu giá che mặt] Tại buổi đấu giá kín của Maestro, khách trả giá nào cũng trùm voan kín mặt thay mặt cho những tập đoàn giấu danh. Tác phẩm tối nay ngay cả bạn cũng chưa từng được xem trước. Chủ trì giơ búa lên khiến tay bạn run rẩy khi nhận ra người trả cao nhất đang kẹp cây bút của người cũ bạn quen.',
    '[Veiled auction night] At a Maestro’s private auction, each bidder wears a veil covering the whole head, standing for corporations that wish to hide their identity. Tonight’s piece is one even you have not been allowed to see beforehand. The auctioneer raises the gavel, and your hand trembles when you realize the highest bidder holds a pen once belonging to someone you knew.',
    [
      fc('Giữ vị trí, không để lộ gì', 'Hold your post and reveal nothing',
        'Tiếng búa gõ xuống trao món đồ cho người cầm bút. Tấm màn che kéo mở làm cả phòng nín thở trong khoảnh khắc.',
        'The gavel falls, and the pen holder wins. The cloth is drawn from the work, and the whole room holds its breath a moment. You recognize that stroke, and never tell anyone.',
        { rep: 5, wealth: 6, sanity: -6 }, { flagsAdd: ['ring_chased_perfection'] }),
      fg('Theo người thắng đấu giá ra cửa sau và hỏi cây bút', 'Follow the winner to the back door and ask about the pen', [
        [50, 'Người ấy vén voan để lộ gương mặt đàn ông trung niên với đôi mắt đỏ hoe. Ông bảo mình mua lại cây bút để giữ khỏi bị chôn mất rồi mở cho bạn coi ba bức phác thảo cuối của người quá cố. Bạn đứng chết lặng dưới ánh đèn hành lang.', 'They lift the veil, and it is a middle-aged man with red-rimmed eyes. He says he bought the pen to keep it from being buried. He shows you the last three sketches of the dead, and you stand motionless in the corridor light.', { sanity: -4, rep: 4, network: 6 }, { flagsAdd: ['ring_kept_conscience'] }],
        [50, 'Người ấy giữ nguyên tấm voan che mặt không hé nửa lời. Một vệ sĩ giữ bạn lại để sau buổi đấu giá Maestro gọi vào hỏi đúng một câu: Luật buổi đấu giá này là gì? Bạn đáp lại khiến ông gật đầu rất chậm.', 'The person keeps the veil down and refuses every word. A guard holds you, and the Maestro calls you in afterward. He asks only: What is the rule of this auction? You say it, and he nods slowly.', { rep: -7, sanity: -5 }, { flagsAdd: ['ring_kept_conscience'] }]
      ]),
      fc('Rút khỏi vị trí giữa buổi, nói bạn không khỏe', 'Leave your post mid-auction, saying you feel unwell',
        'Bạn ngồi ngoài hành lang lắng tiếng búa vọng ra từ xa. Lúc phiên đấu giá tan, một Docent đi ngang bảo bạn vừa bỏ lỡ khoảnh khắc đắt giá nhất đêm nay. Bạn không gặng hỏi thêm.',
        'You sit in the corridor and hear the gavel from afar. When the auction ends a Docent passes and says you missed the best of the night.',
        { sanity: -3, rep: -4 }, { flagsAdd: ['ring_chased_perfection'] })
    ], { age: [26, 90] }),

  fe('ring_school_dispute', 'Ring', [1, 3],
    '[Hai Trường phái trong một đơn đặt hàng] Đơn hàng lớn buộc nhóm Fauvism với nhóm Pointillism bắt tay làm chung một tác phẩm. Ngay từ hôm đầu hai bên cãi vã dữ dội chuyện thủ pháp: bên đòi phá màu thành mảng lớn, bên khăng khăng ghép từng chấm nhỏ li ti. Bạn đóng vai điều phối giữa ánh mắt hằn học của cả hai phía.',
    '[Two Schools on one commission] A large order forces a Fauvist group and a Pointillist group to work together on one piece. From the first day they quarrel over method: one side wants color to break into large patches, the other wants small dots set side by side. You are the coordinator, and both sides look at you as if you were the enemy.',
    [
      fc('Chia tác phẩm thành hai nửa, mỗi nhóm một nửa', 'Divide the piece into two halves, one for each group',
        'Hai nửa xong đúng hạn, treo kề bên nhau trên vách dù chẳng hòa trộn cũng chẳng đánh nhau. Người xem tấm tắc gọi đó là cuộc đối thoại đặc sắc nhất triển lãm. Cả hai nhóm tuy chẳng chịu nhận công nhưng đều gửi riêng lời cảm ơn bạn.',
        'The two halves finish on time and hang side by side, not blending but not warring. Viewers call it the most interesting dialogue in the exhibition. Neither group admits it, but both send you a private thanks.',
        { rep: 6, network: 7, sanity: 2 }),
      fg('Ép cả hai nhóm làm theo một phương pháp thứ ba', 'Force both groups to adopt a third method', [
        [45, 'Phương pháp mới bắt cả hai nhóm phải học lại từ đầu để rồi thành quả làm Maestro im lặng rất lâu trước khi khẽ gật đầu. Cả hai nhóm đều ghét cay ghét đắng bạn, bù lại bức tranh được treo ngay sảnh chính.', 'The new method forces both groups to relearn from scratch, and the result leaves the Maestro silent a long while then nodding. Both groups hate you, but the work hangs in the main hall.', { rep: 8, network: -6, sanity: -4 }, { flagsAdd: ['ring_chased_perfection'] }],
        [55, 'Cả hai nhóm răm rắp làm theo nhưng chẳng ai đặt hồn vào nét cọ. Tác phẩm hoàn thành đúng chuẩn mà vô hồn. Maestro bảo nó chẳng thuộc Trường phái nào nên cũng chẳng thuộc về ai.', 'Both groups comply but neither puts heart in. The work finishes to specification, and is lifeless. The Maestro says it belongs to no School and therefore to no one.', { rep: -6, sanity: -5, network: -3 }, { flagsAdd: ['ring_chased_perfection'] }]
      ]),
      fc('Nhờ Maestro phân xử theo Trường phái nào đúng', 'Ask the Maestro to rule which School is right',
        'Maestro lặng đi một nhịp rồi đáp cả hai đều có lý, chính vì thế họ không thể chung mâm. Ông giao đơn hàng cho nhóm khác cho hai nhóm kia nghỉ xả hơi; bạn thấy cả hai phía đồng loạt thở phào.',
        'The Maestro is silent then says both are right, and precisely for that cannot work together. He hands the work to another group, and the two are stood down. You see both exhale at once.',
        { sanity: 1, rep: 1, network: 2 })
    ], { age: [28, 90], weight: 10 }),

  fe('ring_three_pieces', 'Ring', [1, 1],
    '[Ba tác phẩm để thành Maestro] Muốn phong danh hiệu Maestro, một Docent phải trình đủ ba tác phẩm chứng minh thực lực. Bạn đã hoàn tất hai, Hội đồng đang chờ tác phẩm thứ ba. Chiếc nhẫn trên ngón tay trái cuộn hai vòng xoắn. Có vị khách hứa trả giá hời nếu bạn dựng tác phẩm thứ ba theo ý họ, vừa nhanh vừa an toàn.',
    '[Three works to become Maestro] To bear the title of Maestro, a Docent must have three works establishing their worth. You have two, and the council awaits the third. The ring on your left hand has two coils, and you look at it each morning. A patron offers a large sum if you make the third to their wishes, quick and safe.',
    [
      fc('Nhận đơn hàng, làm nhanh và hoàn hảo theo yêu cầu', 'Take the commission and make it fast and perfect to specification',
        'Tác phẩm thứ ba xong xuôi sau hai tháng. Hội đồng nhận hồ sơ xét Maestro dù vòng sát hạch vẫn chờ phía trước. Chỉ có điều bên trong tác phẩm ấy ẩn chứa thứ bạn chẳng muốn ngắm lại lần hai.',
        'The third work is finished in two months. The council accepts your Maestro dossier, but the trial still lies ahead. There is something in the work you never wish to see again.',
        { rep: 9, wealth: 16, sanity: -8, network: 5 }, { flagsAdd: ['ring_chased_perfection'], meritAdd: 6 }),
      fg('Từ chối đơn hàng, làm tác phẩm thứ ba theo ý riêng', 'Refuse the commission and make the third as you wish', [
        [50, 'Bạn dồn sức suốt một năm để rồi tác phẩm khiến cả Hội đồng lặng ngắt. Một Maestro lão thành thú nhận không xếp nổi nó vào Trường phái nào. Hồ sơ chuyển thẳng sang vòng sát hạch còn bạn về xưởng đợi ngày gọi tên.', 'It takes a year, and the work leaves the council silent. An elder Maestro cannot place it in any School. Your dossier goes to the trial, and you return to the studio to wait.', { rep: 10, sanity: 3, wealth: -6, network: 3 }, { flagsAdd: ['ring_kept_conscience'], meritAdd: 6 }],
        [50, 'Hội đồng xem kỹ tác phẩm rồi lắc đầu từ chối, bảo nó chân thật nhưng chưa đủ tầm bậc Maestro. Bạn ôm tác phẩm về xưởng nhìn ngắm nhiều tháng trời mà chẳng phân định nổi nên buồn hay tự hào.', 'The council looks at the work and declines. They say it is true, but not enough for a Maestro. You carry it back to the studio and look at it for months without knowing whether to grieve or take pride.', { rep: -4, sanity: -3, wealth: -6 }, { flagsAdd: ['ring_kept_conscience'] }]
      ]),
      fc('Hoãn tác phẩm thứ ba thêm vài năm', 'Postpone the third work another few years',
        'Hội đồng gật đầu đầy ẩn ý khó đoán. Bạn rút về xưởng làm những việc nhỏ suốt nhiều tháng cho cảm giác ngột ngạt dịu dần. Chiếc nhẫn hai vòng xoắn vẫn đeo trên tay, chỉ khác là bạn thôi nhìn chằm chằm vào nó mỗi sáng.',
        'The council nods inscrutably. You return to the studio and do small things for months until the suffocating feeling eases. Your two-coil ring is still there, and you stop looking at it each morning.',
        { sanity: 3, rep: -2 })
    ], { age: [30, 90] }),

  fe('ring_outskirts_clash', 'Ring', [1, 3],
    '[Giao chiến với The Pinky ngoài Outskirts] Ring cùng Pinky đang đụng độ ngoài Outskirts; bạn đi theo đoàn vận chuyển người lẫn vật tư tới khu trại tạm. Thiên hạ đồn Pinky chẳng phân cấp rạch ròi nên không biết ai với ai. Từ sáng trong đoàn xuất hiện kẻ lạ bước đúng nhịp chân bạn mà chẳng ai nhớ quen từ lúc nào.',
    '[Clash with the Pinky in the Outskirts] The Ring and the Pinky are fighting in the Outskirts, and you are sent with a party carrying materials and people to a makeshift site. It is said the Pinky have no clear ranks, and no one knows who is a member. In your party a stranger has kept exact pace with you since morning, and no one recalls where they met them.',
    [
      fc('Theo dõi người lạ mà không nói gì với ai', 'Watch the stranger and tell no one',
        'Kẻ lạ làm việc cần mẫn chẳng khác thợ thường, tới xế chiều bỗng biến mất một thùng hàng trên xe. Bạn kịp thấy họ liếc qua mình thật nhanh rồi khẽ gật như cảm ơn vì giữ im lặng.',
        'The stranger works diligently, and by afternoon one crate vanishes from the cart. You see them glance at you once, very briefly, and nod as in thanks for saying nothing.',
        { sanity: -4, rep: -2, network: 3 }),
      fg('Báo trưởng đoàn và chỉ vào người lạ', 'Tell the party leader and point out the stranger', [
        [55, 'Kẻ lạ bị giữ lại lục soát nhưng chẳng mang thứ gì, chỉ khai ra cái tên chẳng ai biết. Đoàn người tiếp tục hành trình trong bầu không khí nặng nề; nghe nói đêm đó họ thả người đi.', 'The stranger is held and searched. They carry nothing and give only a name no one knows. The party proceeds, but the mood is heavier, and you hear they were released that night.', { rep: 4, sanity: -3, network: -2 }],
        [45, 'Người bị chỉ mặt hóa ra chỉ là anh phu khuân vác thật, ăn một trận đòn nhừ tử trước lúc mọi người vỡ lẽ. Trưởng đoàn gườm gườm nhìn bạn khiến cả đoàn câm nín suốt chặng đường còn lại.', 'The one you point out is simply a real porter, and is beaten badly before anyone realizes. The leader looks at you. The whole party stays silent the rest of the way.', { rep: -9, sanity: -9, heat: 4 }]
      ]),
      fc('Đến gần người lạ và nói chuyện bình thường', 'Approach the stranger and speak plainly',
        'Kẻ lạ tán gẫu chuyện nắng mưa đường sá bình thường như mọi người. Mãi tới cuối ngày bạn mới giật mình nhận ra mình lỡ kể cho họ nghe quá nhiều trong khi họ chưa tiết lộ nửa chữ về bản thân.',
        'The stranger speaks of weather and road, entirely ordinary. Only at day’s end do you realize you told them more than you intended, and they told you nothing of themselves.',
        { sanity: -3, network: 2 })
    ], { age: [26, 90] }),

  // ------------------------------------------------------------------ Pinky: star-forged blades, seats, hidden members, scatter and gather
  fe('pinky_appoint_blade', 'Pinky', [0, 1],
    '[Chọn thanh kiếm sao] Phòng chứa kiếm của The Pinky dựng cả hàng kiếm rèn từ sao, mỗi thanh gắn chặt với một chiếc ghế. Muốn nhận ghế bạn buộc phải chọn đúng một thanh làm của riêng, từ đó tuyệt đối không dùng thanh khác vì đổi kiếm là điềm gở. Người giữ phòng dẫn bạn đứng trước hàng kiếm rồi bỏ ra ngoài.',
    '[Appointing a star-forged blade] In the Pinky’s blade room stands a row of star-forged swords, each bound to a seat. To take that seat you must appoint exactly one blade as your own, and from then on never use another, for using another is an ill omen. The keeper sets you before the row and leaves.',
    [
      fc('Chọn thanh kiếm mà bạn thấy nặng nhất', 'Choose the blade that feels heaviest',
        'Thanh kiếm lạnh toát trong lòng tay như đã đợi từ lâu. Bạn dõng dạc tuyên bố chọn nó để nghe giọng mình dội lại khắp vách đá. Người giữ phòng khẽ cúi đầu từ ngưỡng cửa chẳng nói thêm.',
        'The blade is cold in your hand, as if it had waited long. You say aloud that you choose it and hear your voice echo in the stone room. The keeper nods from the door and says nothing.',
        { rep: 5, sanity: -2, network: 3 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Chọn thanh kiếm nhẹ nhất, vì bạn tin tay hơn sao', 'Choose the lightest blade, trusting your hand over the star', [
        [55, 'Thanh kiếm ấy hóa ra lanh lẹ bậc nhất trong số từng cầm. Một Pinky già không bao giờ tiết lộ tên thật xem bạn vung thử liền bảo chiếc ghế ấy bỏ trống bấy lâu chỉ vì chưa ai dám chọn thanh này.', 'That blade turns out the quickest you have ever held. An old Pinky, who never gives a name, watches you try it and says that seat has stood empty long because no one dared choose that sword.', { rep: 6, sanity: 2, network: 3 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Lưỡi kiếm không chịu nhận chủ. Chẳng có biến cố nào xảy ra, chỉ là mỗi bận tuốt vỏ bạn lại thấy thứ gì đó nhìn chằm chằm từ mặt thép. Bạn không đổi kiếm mà cũng chẳng hé răng với ai.', 'The blade does not accept you. Nothing happens, but each time you draw it you feel something looking at you from within the edge.', { sanity: -6, rep: 1 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Đứng yên lâu trước dãy kiếm, để thanh nào gọi bạn thì chọn', 'Stand long before the row and let the one that calls you decide',
        'Bạn đứng sững suốt một buổi chiều mà chẳng nghe thanh nào lên tiếng. Nắng tắt hẳn, bạn sực thấy mình đang đứng đối diện thanh kiếm nhỏ tuốt cuối hàng, không nhớ bước tới từ lúc nào. Bạn bèn chọn nó.',
        'You stand all afternoon. None calls. By the time the sun dims you find yourself before a small blade at the row’s end and cannot recall why you walked there. You choose it.',
        { sanity: 3, rep: 3, network: 2 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [18, 60] }),

  fe('pinky_claim_dead_blade', 'Pinky', [1, 3],
    '[Thanh kiếm của người đã khuất] Thành viên The Pinky tử nạn nơi không ai ngờ để lại chiếc ghế bỏ trống. Theo lệ, ghế chỉ được lấp khi có người nhận thanh kiếm sao của người đã khuất làm kiếm riêng. Thanh kiếm đặt trên tấm vải đỏ giữa phòng mà cả đám người có mặt chẳng ai dám bước lên.',
    '[The dead member’s blade] A member of the Pinky falls somewhere no one expected, and their seat stands vacant. By custom that seat is filled only when someone takes the dead member’s star-forged blade as their own. The sword lies on a red cloth in the middle of the room, and none of those present dares step forward.',
    [
      fc('Bước tới và nhận thanh kiếm', 'Step forward and take the sword',
        'Cả căn phòng đồng loạt thở phào. Thanh kiếm nặng hơn cây cũ đôi chút, chuôi hằn vết xước nhỏ chỗ ngón tay từng siết quá gắt. Bạn cất hẳn thanh cũ đi; mỗi lần ngó thấy nó trên giá lòng lại thấy như vừa bỏ rơi cố nhân.',
        'The whole room exhales. The sword is slightly heavier than yours and bears a small scratch on the hilt where a finger once gripped too hard. You never use your old one again, and each time you see it on the rack you feel you have just abandoned someone.',
        { rep: 8, sanity: -5, network: 5 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Đề nghị chôn thanh kiếm cùng chủ, để ghế bỏ trống', 'Propose burying the sword with its owner and leaving the seat vacant', [
        [55, 'Cả phòng im phăng phắc hồi lâu rồi một Pinky già đứng dậy bảo có những chiếc ghế nên bỏ trống như một lời nhắc nhở. Thanh kiếm được hạ huyệt theo chủ; chiếc ghế trống suốt nhiều năm, có người đồn sẽ trống mãi.', 'The whole room is silent a long time. Then an elder Pinky rises and says some seats should stand empty, as a reminder. The sword is buried with the dead, and the seat stays vacant for many years after, some say forever.', { rep: 5, sanity: 4, network: 4 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Lời đề nghị bị quy là bất kính với lệ cổ. Một Sworn Blade gằn giọng bảo giữ lệ không phải bất kính khiến hai người gườm nhau thật lâu. Sau rốt thanh kiếm vẫn nằm yên đó suốt tháng không ai đụng.', 'The remark is taken as disrespect to custom. A Sworn Blade says keeping custom is not disrespect, and the two look at each other a long time. In the end the sword stays there, and no one claims it that month.', { rep: -5, sanity: -3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Đứng yên, chờ người khác bước ra trước', 'Stand still and wait for someone else to step forward',
        'Người khác bước ra nhận kiếm, tiện mắt liếc bạn thật nhanh. Bạn không đoán nổi ánh nhìn ấy hàm ý biết ơn hay thương hại. Buổi lễ tan, lòng bạn bỗng khuyết một khoảng trống khó gọi tên.',
        'Someone else steps out, receiving the sword while giving you one short glance. You do not know whether that look was gratitude or pity. When the ceremony ends you feel an empty place within you that you cannot name.',
        { sanity: -4, rep: -2 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [28, 90], weight: 10 }),

  fe('pinky_hidden_member', 'Pinky', [0, 3],
    '[Người cùng hội bạn không biết] Bạn nhận việc vặt cho Syndicate khác. Có kẻ lạ mặt ở đó liếc bạn thật nhanh rồi ra ám hiệu chỉ thành viên The Pinky mới hiểu. Họ im lặng để bạn cũng im lặng theo. Suốt buổi hai người ngồi kề như người dưng, thừa biết bên kia tới đây vì chuyện chẳng dính dáng tới chỗ này.',
    '[A fellow member you did not know] You do a small job inside another Syndicate, and a stranger there looks at you once, very briefly, then makes a gesture only a member of the Pinky would recognize. They say nothing and you say nothing. The two of you sit side by side all evening like strangers, each knowing the other is here for a reason that is not this place’s.',
    [
      fc('Giữ im lặng và làm như không nhận ra', 'Stay silent and behave as if you did not recognize them',
        'Buổi gặp tàn trong cảnh không ai trao đổi nửa câu. Tới lúc đứng dậy về, bạn thấy trên mặt bàn lật ngửa một đồng xu đặt đúng chỗ người ấy vừa ngồi.',
        'The meeting ends and no word is exchanged. But as you leave you see on the table a coin flipped face up exactly where the person sat.',
        { sanity: -2, rep: 3, network: 3 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Đáp lại bằng cùng một cử chỉ', 'Answer with the same gesture', [
        [50, 'Người lạ khẽ gật đầu rất nhẹ rồi vài hôm sau nhà bạn nhận được phong bì không đề tên, bên trong vỏn vẹn một địa chỉ. Bạn biết mình đã lọt vào sổ ghi chú nhưng cũng vừa tự phơi bày điều chẳng nên lộ.', 'The stranger nods very faintly, and a few days later a small envelope arrives at your home, unnamed, bearing only an address. You know you have been noted, and also that you just revealed something you should not have.', { rep: 5, sanity: -4, network: 5, heat: 4 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Người lạ giữ mặt lạnh như tờ khiến bạn chột dạ nhận ra mình hớ. Ánh mắt khó chịu đổ dồn làm bạn đâm lo chẳng rõ còn ai khác kịp thấy ám hiệu của mình.', 'The stranger keeps a blank face, and you realize you were mistaken. You are regarded with discomfort, and begin to wonder who else saw your gesture.', { rep: -5, sanity: -6, heat: 5 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Rời đi sớm, nói bạn có việc gấp', 'Leave early, saying you have urgent business',
        'Bạn đẩy cửa bước nhanh không ngoái lại. Cả tuần lễ bạn nghĩ vẩn vơ tới người ấy để rồi chẳng còn chắc ai trong đám người quen quanh mình thực sự là ai.',
        'You go out the door and walk fast without looking back. All the following week you think of that person and realize you are no longer sure who among those you know truly is who they say.',
        { sanity: -5, rep: -2 }, { flagsAdd: ['pinky_bent_word'] })
    ], { weight: 10 }),

  fe('pinky_gather_call', 'Pinky', [1, 3],
    '[Tiếng gọi để tụ họp] Không có lệnh ban ra, chẳng ai hò hét gọi tên. Chỉ xuất hiện vài dấu hiệu nhỏ: ba hồi chuông chiều, vòng phấn đỏ vẽ trên vách hẻm, chiếc áo choàng vắt trước cửa tháp. Chừng đó đủ rồi. Thành viên The Pinky ẩn thân khắp thành phố lần lượt kéo về từng người một, tuyệt nhiên không ai nhìn ai.',
    '[The gathering call] No order is sent, no one shouts. Only a small sign: three evening bell strokes, a red chalk circle on the wall of an alley, and a cloak hung at the tower door. The conditions are met. The Pinky’s members, hiding across the city, begin to arrive one by one, and no one looks at another.',
    [
      fc('Đến tháp theo tiếng gọi và ngồi vào chỗ không ai ngồi', 'Go to the tower at the call and take the seat nobody sits in',
        'Bạn kéo chiếc ghế trống ngồi xuống. Giọng nói trầm đục cất câu hỏi từ phía sau cột đá nhưng không ai đáp thành tiếng. Lúc tan họp mỗi người tản ra bằng một cánh cửa khác.',
        'You take the empty seat. A low voice asks a question from behind the pillar; nobody answers aloud. When the meeting ends, each person leaves by a different door.',
        { rep: 7, sanity: -3, network: 5 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Đến muộn rồi đứng ngoài cửa', 'Come late and stand only at the door', [
        [50, 'Ánh nến hắt qua khe cửa cùng tiếng rì rầm vọng nhẹ ra ngoài. Cánh cửa bật mở để người bước ra đầu tiên nhìn bạn thật lâu không nói, bạn cũng chẳng hỏi. Cả hai hiểu bạn vừa bỏ qua chuyện trọng đại.', 'You see candlelight under the door and hear whispers. Then the door opens and the first out looks at you a very long time. They say nothing, you ask nothing, and both know you missed something important.', { rep: -4, sanity: -4 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Buổi họp vừa vãn, gian phòng trống hoác chỉ trơ ngọn nến với chiếc ghế đơn. Bạn ngồi xuống chợt thấy mảnh giấy nhắn kẹp dưới gầm ghế: lần sau, đừng muộn.', 'The meeting has just dispersed and the whole room is empty. Only a candle and a chair remain. You sit down and notice someone left a message under the chair: next time, do not be late.', { rep: -2, sanity: -3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Không đến, nói bạn không nhận ra dấu hiệu', 'Do not go, saying you did not recognize the sign',
        'Chẳng ai chất vấn lý do. Vài ngày sau ngay trên cánh cửa nhà bạn hiện lên vòng phấn đỏ nhỏ đủ nhắc rằng mình vẫn nằm trong sổ nhớ của hội.',
        'No one asks why. But a few days later you see a small red chalk circle on your own door and realize you are being remembered.',
        { sanity: -7, rep: -5, heat: 3 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [26, 90] }),

  fe('pinky_wrong_blade', 'Pinky', [0, 3],
    '[Dùng nhầm kiếm của người khác] Giữa trận hỗn chiến bất ngờ thanh kiếm của bạn gãy đôi; ngay bên cạnh vừa có thành viên The Pinky ngã xuống với thanh kiếm sao còn nguyên trên tay. Theo lệ, mỗi người chỉ dùng thanh kiếm đã chọn; dùng nhầm kiếm người khác là điềm dữ. Thế nhưng kẻ thù đang lao thẳng tới.',
    '[Using someone else’s blade] In the middle of a sudden brawl your sword breaks, and the one who falls beside you is a member of the Pinky with a star-forged sword still in hand. By custom each uses only their appointed blade, and using another’s is an ill omen. But the enemy is rushing at you.',
    [
      fc('Cầm kiếm của người ngã xuống và chiến đấu', 'Take the fallen one’s sword and fight',
        'Bạn thắng trận khi thanh kiếm sao chém ngọt như tự thuộc đường. Tàn cuộc bạn chẳng dám hoàn trả ngay vì người ngã xuống đã ngừng thở. Bạn phải tự định đoạt cách xử lý món điềm gở nằm trong tay.',
        'You win, and the star-forged blade cuts as if knowing the way. After the fight you dare not return it at once, and the fallen one no longer breathes. You must decide what to do with the ill omen in your hands.',
        { health: -8, rep: 4, sanity: -6, network: 2 }, { flagsAdd: ['pinky_bent_word'] }),
      fg('Chiến đấu tay không, giữ lời lệ', 'Fight bare-handed, keeping custom', [
        [50, 'Bạn thoát hiểm với vài vết xước nhẹ dưới ánh nhìn từ một Pinky đứng tuốt đầu hẻm bên kia. Người ấy không nói câu nào, chỉ khẽ gật đầu với bạn rồi khuất bóng.', 'You escape with a few light wounds, and a Pinky at the alley’s far end sees it all. They say nothing but nod at you faintly before vanishing.', { health: -14, rep: 6, sanity: 3, network: 3 }, { flagsAdd: ['pinky_kept_word'] }],
        [50, 'Bạn lĩnh trận đòn nhừ tử còn người ngã gục bị kẻ địch bồi thêm nhát nữa. Bạn giữ được mạng, nhưng nhiều tuần sau vẫn tự hỏi liệu một điều lệ có xứng đáng đánh đổi mạng người.', 'You are beaten badly, and the fallen one is killed once more by the enemy. You survive, but for weeks after still think that no custom is worth a life.', { health: -22, sanity: -9, rep: -2 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Chạy khỏi trận, bỏ lại người ngã xuống', 'Flee the fight and leave the fallen one behind',
        'Bạn thoát ra tới đầu phố mới ngoái lại một thoáng. Thanh kiếm sao nằm trơ giữa mặt đường nguyên vẹn không ai tới nhặt trong lúc bạn đứng nhìn. Bạn không quay trở lại để rồi mang theo nỗi day dứt ấy nhiều năm.',
        'You escape and glance back once at the corner. The star-forged blade lies on the road, intact, and no one comes to pick it up while you look.',
        { sanity: -9, rep: -4, health: -3 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [20, 90] })
];

export const FINGER_CANON_MINORS = [
  M('m_thumb_bayonet_drill', AGE.GROWN, fneed('Thumb', 0), '[Buổi tập lưỡi lê] Capo bắt cả tổ tập đánh bằng báng súng kèm lưỡi lê trọn một buổi chiều. Ông bảo viên đạn đắt hơn mạng Soldato nên Soldato giỏi phải biết lúc nào đừng bóp cò. Bạn đánh trúng đích vượt xa dự liệu khiến Capo ghi chú lại.', '[Bayonet drill] The Capo makes the whole team drill with rifle butts and bayonets all afternoon. He says bullets cost more than a Soldato’s life, and so a good Soldato knows when not to shoot. You land more hits than expected, and the Capo notes it.', [C('Tập hết sức, không than phiền', 'Drill hard without complaint', 'Cánh tay bạn nhức mỏi suốt hai ngày, bù lại ánh mắt Capo dừng trên người bạn lâu hơn hẳn đám khác.', 'Your arms ache two days, but the Capo’s gaze stays on you longer than on others.', { health: -2, rep: 3 }), C('Xin ít nhất một buổi tập bắn thật', 'Ask for at least one session of live firing', 'Capo bật cười bảo bạn nên học cách quý đạn dược. Bạn bị phạt thêm ca dọn kho, sực hiểu câu hỏi vừa rồi có giá của nó.', 'The Capo laughs and says you should learn to treasure bullets. You are assigned an extra shift cleaning the store and realize that question had its price.', { rep: -1, sanity: -1 })], I('Bạn chịu đựng buổi tập và về nhà.', 'You endure the drill and go home.'), { theme: 'work' }),
  M('m_thumb_pin_count', AGE.GROWN, fneed('Thumb', 0), '[Đếm ghim trên cổ áo] Trên tàu điện, một Soldato lạ mặt liếc cổ áo bạn, đếm từng ghim với mũi tên rồi đổi nhẹ thế đứng.', '[Counting the pins] On the tram, an unfamiliar Soldato glances at your collar, counts pins and arrows, and shifts his stance slightly.', [C('Gật đầu nhẹ và ngồi xuống', 'Nod lightly and sit', 'Anh ta tránh nhìn thẳng nhưng ưỡn lưng thẳng hơn đôi chút. Cả toa tàu trôi đi như không có chuyện gì khiến lòng bạn hơi nằng nặng.', 'He does not look straight at you but stands a little straighter. The whole carriage goes on as if nothing happened, and you feel a mild weight.', { rep: 2, sanity: -1 }), C('Mời anh ta ngồi', 'Invite him to sit', 'Anh ta thoáng lúng túng rồi từ chối thật nhã nhặn. Hai người cứ đứng suốt tới bến cuối không nói nửa câu.', 'He is flustered then declines very politely. Both stand to the terminus, neither speaking.', { sanity: 1, network: 2 })], I('Bạn đứng nhìn ra cửa sổ.', 'You stand looking out the window.'), { theme: 'work' }),
  M('m_index_familia_roll', AGE.GROWN, fneed('Index', 0), '[Điểm danh familia] Sáng nào nhóm năm sáu Proselyte dưới quyền Proxy cũng xếp hàng bịt kín mắt, đọc tên nhau dù chẳng thấy mặt. Hôm nay giữa hàng trống mất một chỗ; tiếng gọi tên cứ lướt qua khoảng trống ấy không ai nhắc tới.', '[Roll call of the familia] Each morning the five or six Proselytes under a Proxy line up, eyes bound, and recite each other’s names without seeing faces. Today there is a gap in the middle of the row, and the call passes over it without anyone remarking.', [C('Gọi tên người vắng, rất khẽ', 'Say the absent name very softly', 'Proxy nghe thấy nhưng chẳng cản. Cả hàng im bặt đúng một nhịp; từ hôm đó sáng nào bạn cũng xướng thêm cái tên ấy.', 'The Proxy hears and does not stop you. The whole row is silent a beat, and from that day each morning you call one more name.', { sanity: 3, network: 3, rep: -1 }), C('Đọc tiếp, như mọi người', 'Read on like everyone else', 'Buổi điểm danh kết thúc đúng giờ.', 'The roll ends on time.', { sanity: -2, rep: 1 })], I('Bạn đứng thẳng và chờ đến lượt.', 'You stand straight and await your turn.'), { theme: 'work' }),
  M('m_index_pizza_prescript', AGE.GROWN, fneed('Index', 0), '[Prescript về hộp pizza] Prescript hôm nay: giao hộp pizza nóng tới địa chỉ khu District 7 trước 8 giờ tối. Không đề tên người nhận, chẳng ghi lý do. Bạn ghé tiệm gần nhất mua; suốt quãng đường hộp bánh ấm nóng trên tay bình dị đến phát sợ.', '[A pizza Prescript] Today’s Prescript: deliver a hot box of pizza to an address in District 7 before eight in the evening. No recipient named, no reason given. You buy it at the nearest shop, and all the way the box warms your hands, in a way far too ordinary.', [C('Giao tận tay người mở cửa', 'Hand it to whoever opens the door', 'Bà lão mở cửa, trố mắt nhìn hộp pizza rồi bật cười giòn giã. Bà kể ba mươi năm rồi chẳng có ai mang cho bà món này, mời bạn vào ăn chung. Bạn từ chối nhưng nhớ mãi tiếng cười ấy.', 'An old woman opens the door, looks at the box, and bursts into laughter. She says no one has brought her this in thirty years and invites you in to share. You decline but remember that laugh long.', { sanity: 4, rep: 3, network: 3 }), C('Đặt hộp trước cửa, gõ rồi đi', 'Set the box at the door, knock and leave', 'Bạn đứng nấp góc hẻm trông thấy cửa mở. Đứa trẻ nhìn hộp bánh hồi lâu, ngó quanh rồi bê vào nhà. Cánh cửa khép lại để lòng bạn nhẹ tênh như vừa làm xong việc chẳng rõ tên.', 'You hide at the alley corner and see the door open. A child looks at the box a long while, then around, and carries it in. The door closes, and you feel light as if you had done something unnamed.', { sanity: 3, rep: 2 })], I('Bạn nhìn hộp pizza và nghĩ nó thật tầm thường.', 'You look at the pizza box and think it so mundane.'), { theme: 'work' }),
  M('m_middle_gold_chain_polish', AGE.GROWN, fneed('Middle', 0), '[Đánh bóng xích vàng] Sợi xích vàng quấn quanh cánh tay bạn xỉn màu sau một mùa. Big Sibling bày cách lau sáng bằng vải len thấm chút nước chanh, bảo mỗi vòng xích tượng trưng cho lời hứa giữ cùng nhau.', '[Polishing the gold chain] The gold chain around your forearm dulls after a season. A Big Sibling shows you how to polish it with wool cloth and a little lemon juice, and says each chain is a promise people have kept to one another.', [C('Đánh bóng cả sợi xích của người ngồi cạnh', 'Polish the neighbor’s chain too', 'Người ngồi cạnh ngắm sợi xích sáng bóng lại, tới tối bèn lặng lẽ đặt trước cửa bạn túi quýt tươi.', 'The neighbor looks at their brightened chain, but that evening leaves a bag of tangerines at your door.', { sanity: 3, network: 5 }), C('Chỉ đánh bóng của mình', 'Polish only your own', 'Sợi xích lấp lánh dưới ánh đèn. Bạn nhìn nó hồi lâu, điểm lại từng người từng trao nó cho mình.', 'The chain brightens under the lamp. You look at it long and recall each person who passed it to you.', { sanity: 2, rep: 1 })], I('Bạn lau qua loa rồi đeo lại.', 'You wipe it carelessly and put it back on.'), { theme: 'work' }),
  M('m_middle_district_clause', AGE.GROWN, fneed('Middle', 1), '[Điều khoản theo District] Một Little Sibling thắc mắc sao mức phạt cho cùng một tội lại khác nhau giữa hai District. Bạn lật Book ra xem, thấy tuy điều khoản gốc dùng chung nhưng được chia theo từng vùng; lắm dòng còn viết chèn thêm bằng nhiều nét chữ qua năm tháng.', '[Clauses by District] A Little Sibling asks why the punishment for the same offense differs between two Districts. You open the Book and see that clauses are shared across every copy but divided by place, and some were added in different hands over many years.', [C('Cùng cậu ấy đọc từng điều khoản', 'Read each clause together', 'Hai người chong đèn ngồi đọc tới khuya. Bạn sực nhận ra nhiều án phạt nặng quá tội mà chẳng ai dám sửa. Cậu hỏi lý do làm bạn cứng họng không đáp nổi.', 'The two of you sit late. You realize some punishments outweigh the offense and no one dares change them. They ask why, and you have no answer.', { sanity: -3, network: 4 }), C('Bảo cậu ấy cứ theo điều khoản của District mình', 'Tell them to follow their own District’s clause', 'Cậu cúi đầu bước đi, nhưng vẫn ngoái lại ngắm cuốn Book thêm lần nữa hồi lâu.', 'They nod and go. But you see them look back at the Book once more, very long.', { sanity: -1, rep: 1 })], I('Bạn nói hỏi Big Sibling.', 'You tell them to ask the Big Sibling.'), { theme: 'work' }),
  M('m_ring_coil_count', AGE.GROWN, fneed('Ring', 0), '[Số vòng trên chiếc nhẫn] Chiếc nhẫn trên ngón tay trái có một vòng xoắn; bạn phát hiện mình cứ ngắm nó còn nhiều hơn ngắm tác phẩm của mình. Một Docent đi ngang mang trên tay chiếc nhẫn hai vòng. Bà bắt gặp ánh nhìn của bạn, bảo ở đây chẳng ai là không đếm cả.', '[Counting the coils] The ring on your left hand has a single coil, and you realize you have looked at it more than at your own work. A Docent passes, and her hand bears two coils. She sees you looking and says there is no one here who does not count.', [C('Hỏi bà đã mất bao lâu để có vòng thứ hai', 'Ask how long it took her to earn the second coil', 'Bà kể phải tốn bảy năm cùng bốn tác phẩm bỏ đi, bảo cái khó nhất chẳng phải làm ra đồ tốt mà là chấp nhận đồ tốt vẫn có thể bị gạt đi.', 'She says it took seven years and four abandoned works. She says the hardest part was not making a work good enough but accepting that good too can be refused.', { sanity: 2, network: 4 }), C('Giấu tay trong túi', 'Hide your hand in your pocket', 'Bà mỉm cười như hiểu thấu. Suốt ngày bạn cảm giác chiếc nhẫn nóng rực lên mỗi khi nghĩ tới nó.', 'She smiles as if understanding. All day the ring seems to warm each time you think of it.', { sanity: -2 })], I('Bạn xoay chiếc nhẫn một vòng rồi bỏ tay xuống.', 'You turn the ring once and lower your hand.'), { theme: 'work' }),
  M('m_ring_white_stain', AGE.GROWN, fneed('Ring', 0), '[Vết bẩn trên áo trắng] Áo trắng của bạn dính vệt sơn đỏ to tướng sau buổi vẽ. Ở Ring người ta mặc đồ trắng cốt để vết màu ghi dấu quá trình lao động. Một Maestro đi ngang ngắm vệt sơn một lúc rồi khen đó là vết bẩn thật thà nhất ông thấy cả tháng nay.', '[A stain on the white coat] Your white coat bears a large red paint stain after work. In the Ring people wear white so stains tell the story of the work. A Maestro passes, looks at the stain some time, then says it is the most honest stain he has seen this month.', [C('Không giặt chiếc áo ấy', 'Do not wash that coat', 'Vết sơn đỏ khô cứng thành nâu sẫm. Mỗi bận bạn mặc chiếc áo ấy, người qua đường lại nhìn lâu hơn; vài người khẽ gật đầu thật nhẹ.', 'The red dries to dark brown. Each time you wear it people look longer, and a few nod very slightly.', { rep: 3, sanity: 2 }), C('Giặt sạch, bắt đầu lại', 'Wash it clean and start again', 'Áo trắng tinh như mới. Vậy mà vào buổi vẽ tiếp theo bạn rón rén quá mức khiến bức tranh cứ thiếu mất chút gì đó.', 'The white is new again. But in the next session you work so carefully the piece seems to lack something.', { sanity: -2, rep: -1 })], I('Bạn phủi áo và quay lại bàn.', 'You brush the coat and return to the desk.'), { theme: 'work' }),
  M('m_pinky_unknown_fellow', AGE.GROWN, fneed('Pinky', 0), '[Đồng hội không rõ mặt] Một chủ sạp quen ngoài chợ tự dưng tuần nào cũng cất sẵn phần quà nhỏ cho bạn chẳng lấy xu nào. Bạn để ý họ đứng thẳng y hệt mình, lại có thói quen liếc lối thoát trước khi nhìn mặt khách. Bạn không gặng hỏi để họ cũng giữ im lặng.', '[A fellow of unknown face] A familiar vendor at the market begins setting aside a small item for you each week without charge. You notice they share your stance, the same habit of checking exits before faces.', [C('Nhận và đáp lại bằng một món nhỏ', 'Accept and return a small item in kind', 'Hai người cứ trao qua đổi lại những thứ vụn vặt trong im lặng. Rồi một hôm sạp đổi chủ chẳng còn thấy bóng họ nữa. Bạn mãi chẳng biết chuyện gì xảy ra.', 'You exchange small items in silence. One day they no longer stand at the stall and another rents it. You never learn what happened.', { sanity: 2, network: 4 }), C('Từ chối nhẹ nhàng', 'Decline gently', 'Họ khẽ gật đầu rồi tuần sau thôi không cất phần nữa. Bạn thấy nhẹ nhõm nhưng cũng thoáng tiếc mình vừa bỏ qua một mối duyên.', 'They nod, and next week stop setting aside. You feel lighter, and also that you missed something.', { sanity: 1, network: -2 })], I('Bạn mua đồ khác ở sạp bên cạnh.', 'You buy elsewhere at the next stall.'), { theme: 'work' }),
  M('m_pinky_marsh_tale', AGE.GROWN, fneed('Pinky', 1), '[Chuyện bên đầm lầy] Ông Pinky già tụ cả tổ nghe chuyện xưa về đám hảo hán tụ nghĩa bên đầm lầy, mỗi người mang tên một vì sao cùng thanh kiếm riêng. Ông bảo chuyện ấy chẳng bao giờ chép thành sách vì ai thấu hiểu nó đều tự sống nó cả rồi.', '[A tale from the marsh] An elder Pinky tells the whole team an old story of outlaws living beside a marsh, each bearing a star title and a sword of their own. He says it was never written in a book, because whoever knows it has lived it.', [C('Hỏi ông chuyện ấy kết thúc ra sao', 'Ask how the story ends', 'Ông mỉm cười đáp chuyện chưa khép lại bởi vẫn còn những ghế sao bỏ trống. Bạn nhìn ông hồi lâu chẳng đoán nổi ông đang kể tích xưa hay tự kể đời mình.', 'He smiles and says it has not ended, for star seats remain vacant. You look at him very long, unsure whether he tells a tale or speaks of himself.', { sanity: 2, rep: 2, network: 3 }), C('Ngồi nghe, không hỏi gì', 'Sit listening and ask nothing', 'Ông kể tới khuya. Ngọn nến vừa tàn, mọi người tản đi mỗi người một ngả rồi chẳng ai nhắc lại chuyện cũ nữa.', 'He tells until late. When the candle dies everyone leaves in different directions, and no one mentions the tale again.', { sanity: 3 })], I('Bạn nghe một lúc rồi về phòng.', 'You listen a while then go to your room.'), { theme: 'work' })
];

export const FINGER_CANON_DAILIES = [
  D('d_thumb_badge_arrows', AGE.GROWN, fneed('Thumb', 0), 'Bạn đếm số mũi tên trên huy hiệu người đối diện trước cả khi nghe lời họ nói. Thói quen ấy ngấm tự bao giờ chẳng rõ, chỉ biết nó biến thành cách bạn lắng nghe thiên hạ.', 'You count the arrows on the badge of the one before you before counting their words. When that habit began you no longer recall, but it has become a way of listening.', {}),
  D('d_thumb_no_eye_contact', AGE.GROWN, fneed('Thumb', 0), 'Bạn nhìn chằm chằm vào cà vạt cấp trên chứ chẳng dám ngước mắt. Cả buổi họp chỉ trò chuyện với chiếc cà vạt đỏ, sực thấy nó biết lắng nghe nhất chỗ này.', 'You look at your superior’s tie, not their eyes. All through the meeting you speak to a red tie and realize it is the best listener here.', {}),
  D('d_index_blindfold_fabric', AGE.GROWN, fneed('Index', 0), 'Áo choàng trắng của gã Proselyte cùng nhóm mới khâu thêm mẩu vải nhỏ bằng đầu ngón tay. Chẳng ai nói nó là thứ gì; cả nhóm nhìn chằm chằm một lát rồi ngoảnh đi.', 'A new scrap of fabric is stitched onto a fellow Proselyte’s white cloak, small as a fingertip. No one says what it is, but the whole group looks at it a moment, then away.', {}),
  D('d_index_aconite', AGE.GROWN, fneed('Index', 0), 'Bông hoa tím nhỏ nằm gọn trên bệ cửa sổ văn phòng mà không ai nhớ nổi kẻ đặt. Người ta đồn đó là hoa phụ tử có độc nên cả tòa nhà chẳng ai dám vứt đi.', 'A small purple flower lies on your office windowsill and no one recalls who placed it. They say it is aconite, poisonous, and no one in the building dares throw it away.', {}),
  D('d_middle_purple_shirt', AGE.GROWN, fneed('Middle', 0), 'Một Little Sibling diện chiếc áo sơ mi tím chói cài kín tới cổ khiến cả tổ nhìn sững một lát rồi chẳng ai nói tiếng nào.', 'A Little Sibling arrives in a violently purple shirt buttoned to the neck, and the whole team looks at it a moment.', {}),
  D('d_middle_chain_clink', AGE.GROWN, fneed('Middle', 0), 'Xích vàng trên tay ông Big Sibling kêu leng keng khi ông đi qua hành lang.', 'The sound of gold chains clinking on a Big Sibling’s arm as they pass in the corridor.', {}),
  D('d_ring_left_hand_ring', AGE.GROWN, fneed('Ring', 0), 'Chiếc nhẫn trên ngón tay trái dính bết sơn màu mà bạn chẳng muốn cạo rửa vì mỗi lớp sơn ghi lại một ngày vẽ. Tới cuối tháng vòng xoắn gần như chìm nghỉm dưới lớp màu.', 'The ring on your left hand collects paint and you do not wish to clean it, since each layer is a day’s work. By month’s end the coil nearly vanishes beneath the color.', {}),
  D('d_ring_white_coat', AGE.GROWN, fneed('Ring', 0), 'Cả Atelier đều mặc áo trắng để tới chiều mỗi người mang một tấm bản đồ vết bẩn riêng. Nhìn tấm lưng người ngồi trước, bạn đọc làu làu trọn buổi sáng của họ.', 'The whole Atelier wears white, and by day’s end each carries a private map of stains. You look at the back of the coat of the person ahead and read their whole morning.', {}),
  D('d_pinky_star_forged_hum', AGE.GROWN, fneed('Pinky', 0), 'Thanh kiếm sao của bạn ngân rất khẽ mỗi lúc có kẻ mang thanh cùng chất liệu lướt ngang qua. Bạn lắng tai ngẩng đầu tìm mà người ấy đã hòa mất vào đám đông với gương mặt bình dị.', 'Your star-forged blade hums faintly when someone else carrying a sword of the same make passes. You listen and look up, but they have vanished into the crowd, their face unremarkable.', {}),
  D('d_pinky_no_signal', AGE.GROWN, fneed('Pinky', 0), 'Cả tuần trôi qua tuyệt không dấu hiệu nào: không tiếng chuông, không vòng phấn đỏ.', 'A whole week passes with no sign, no bell, no red chalk circle.', {})
];
