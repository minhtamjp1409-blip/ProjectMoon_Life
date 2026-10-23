// Scenes built straight from what the Project Moon wikis say about each Finger, added after a
// lore check of the earlier Finger stories. The sources are named in PROGRESS_LOG.md. Where the
// wiki is silent the scene stays small and keeps the Finger's known temperament.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

export const FINGER_CANON_EVENTS = [
  // ------------------------------------------------------------------ Thumb: rank shown on badges, etiquette, collective punishment
  fe('thumb_badge_pins', 'Thumb', [0, 2],
    '[Ghim mới trên cổ áo] Capo gọi bạn ra giữa phòng và gài một chiếc ghim nhỏ lên cổ áo bạn. The Thumb phân cấp bằng số mũi tên trên huy hiệu, còn bậc nhỏ bên trong thì bằng những chiếc ghim như thế này. Không ai vỗ tay. Mỗi Soldato trong phòng liếc nhanh vào cổ áo bạn, đếm, rồi nhìn đi chỗ khác.',
    '[A new pin on the collar] The Capo calls you into the middle of the room and fastens a small pin to your collar. The Thumb marks rank by the number of arrows on a badge, and the smaller step within a rank by pins like this one. No one applauds. Every Soldato in the room glances at your collar, counts, and looks away.',
    [
      fc('Cúi đầu cảm ơn, không nhìn thẳng vào mặt Capo', 'Bow thanks without looking the Capo in the face',
        'Capo gật rất nhẹ. Theo lệ, nhìn thẳng vào mặt cấp trên là thất lễ, và bạn đã học điều đó bằng cách khó. Cả buổi chiều bạn lấy ngón tay sờ vào chiếc ghim mỗi khi không ai thấy.',
        'The Capo nods very slightly. By custom, looking a superior in the face is a breach of etiquette, and you learned that the hard way. All afternoon you touch the pin with a finger whenever no one is watching.',
        { rep: 5, sanity: 2, network: 3 }),
      fg('Hỏi nhỏ xem chiếc ghim này cần bạn làm thêm gì', 'Ask quietly what this pin will require of you', [
        [55, 'Capo im lặng rồi nói: Nó không đòi hỏi gì. Nó chỉ báo rằng người ta đã bắt đầu đòi hỏi.', 'The Capo is silent then says: It demands nothing. It only signals that others have begun to demand.', { rep: 4, sanity: -3, network: 2 }],
        [45, 'Câu hỏi bị coi là đòi hỏi quyền lợi. Capo nói chỉ một câu, rất lịch sự, rằng người đeo ghim không hỏi ghim để làm gì. Cả phòng nghe thấy.', 'The question is taken as claiming privilege. The Capo says one line, very politely, that those who wear pins do not ask what pins are for. The whole room hears.', { rep: -5, sanity: -3 }]
      ]),
      fc('Đeo ghim, nhưng giấu nó dưới cổ áo suốt một tuần', 'Wear the pin but hide it under your collar for a week',
        'Không ai nhắc, nhưng bạn thấy hai Soldato cùng bậc nhìn bạn như thể bạn vừa làm điều gì kỳ lạ. Đến cuối tuần bạn lật cổ áo ra, và họ nhìn rất lâu rồi nhìn đi.',
        'No one mentions it, but two Soldato of your step look at you as if you had done something odd. At week’s end you fold the collar back, and they look long then look away.',
        { sanity: -1, rep: 1 })
    ], { age: [18, 70] }),

  fe('thumb_blameless_comrade', 'Thumb', [1, 3],
    '[Người vô can bị phạt thay] Một Soldato trong tổ làm mất một chuyến hàng, và theo lệ The Thumb, hình phạt không chỉ rơi lên người ấy. Bốn người cùng ca bị gọi vào kho, trong đó có một người trẻ chưa từng chạm vào chuyến hàng. Hình phạt là cái lưỡi, và Capo nói bạn sẽ là người cầm dao.',
    '[The blameless punished too] A Soldato on your team loses a shipment, and by Thumb custom the punishment does not stop at that person. Four who shared the shift are called into the store, among them a young one who never touched the cargo. The punishment is the tongue, and the Capo says you will be the one holding the knife.',
    [
      fc('Làm theo lệnh, nhanh và gọn', 'Carry out the order, quick and clean',
        'Bạn làm xong trong một phút, và người trẻ không phát ra tiếng nào cho đến khi dao rời ra. Capo gật đầu. Suốt nhiều tuần sau bạn không thể ăn món gì cần nhai kỹ mà không nhớ đến chuyện ấy.',
        'You finish in a minute, and the young one makes no sound until the knife is withdrawn. The Capo nods. For many weeks afterward you cannot eat anything that needs chewing without remembering.',
        { rep: 6, sanity: -14, network: -6, heat: 3 }),
      fg('Xin nhận phần hình phạt của người trẻ về mình', 'Ask to take the young one’s share on yourself', [
        [50, 'Capo nhìn bạn, rồi nói The Thumb không đổi người, nhưng ông cho phép bạn chịu một phần nhẹ hơn. Bạn bị một vết cắt dài ở cánh tay, và người trẻ chỉ mất một phần nhỏ. Cả hai đều nhớ điều đó cả đời.', 'The Capo looks at you long then says the Thumb does not swap people, but permits you a lighter share. You take a long cut along the arm, and the young one loses only a small part. Both remember it for life.', { health: -14, rep: 3, network: 8, sanity: -5 }],
        [50, 'Capo coi đó là một sự xúc phạm đến luật, và cả hai bạn đều bị phạt đủ phần. Người trẻ nhìn bạn khi bị dẫn đi, không trách, chỉ nhìn.', 'The Capo takes it as an insult to the law, and you both receive the full share. The young one looks at you as they are led away, not blaming, only looking.', { health: -18, rep: -8, sanity: -10 }]
      ]),
      fc('Từ chối cầm dao, nói bạn sẽ chịu thay phần của mình', 'Refuse to hold the knife and take your own share',
        'Capo gọi một người khác. Bạn đứng chờ đến lượt, và khi đến, bạn không thốt ra một chữ nào. Bạn không còn là người cầm dao, nhưng cũng không còn là người có thể giữ nguyên lời nói.',
        'The Capo calls another to the knife. You stand waiting your turn, and when it comes you utter not a word. You are no longer the one holding the blade, but neither are you someone who can keep speech intact.',
        { health: -12, sanity: -9, rep: 2, network: 4 })
    ], { age: [26, 90], weight: 10 }),

  fe('thumb_outsider_rank_etiquette', 'Thumb', [1, 3],
    '[Lễ nghi với người ngoài] Một thành viên hội đồng của một Wing, người mà The Thumb coi ngang một Sottocapo, đến thăm trụ sở. Bạn được giao đón. The Thumb dạy thành viên học thuộc cấp bậc của mọi phe để không bao giờ thất lễ với một người cao hơn, kể cả khi người đó không phải người của họ. Bạn nhớ rõ cấp bậc ấy, nhưng không biết ông này có biết mình được coi thế nào.',
    '[Etiquette toward an outsider] A board member of a Wing, whom the Thumb counts as equal to a Sottocapo, visits the hall. You are assigned to receive them. The Thumb teaches its members the ranks of every faction so they never slight a superior, even one who is not their own. You recall that rank well, but do not know whether this person knows how they are counted.',
    [
      fc('Chào theo lễ dành cho một Sottocapo, không nhìn thẳng', 'Greet as one would a Sottocapo, not looking straight at them',
        'Vị khách hơi sững lại, rồi đáp lễ rất đúng mực. Ông nói đã lâu không có ai chào ông bằng cách đó, và hỏi bạn học từ đâu. Bạn nói đó là lệ. Ông nhìn bạn với vẻ nể sợ nhẹ nhàng.',
        'The guest is briefly startled then returns the courtesy precisely. They say no one has greeted them that way in a long time and ask where you learned it. You say it is custom. They look at you with mild awe.',
        { rep: 7, network: 7, sanity: -1 }),
      fg('Đón như một vị khách thường, tránh gây chú ý', 'Receive them as an ordinary guest, avoiding attention', [
        [55, 'Vị khách không phàn nàn, nhưng trong buổi họp ông ngồi ghế kém hơn một bậc so với vị trí ông nghĩ. Underboss nhận ra, và hôm sau gọi bạn lên.', 'The guest does not complain, but at the meeting sits one seat lower than they think they should. The Underboss notices and summons you the next day.', { rep: -5, sanity: -4 }],
        [45, 'Cả buổi họp trôi qua suôn sẻ, và không ai nhắc đến lễ nghi. Bạn nhẹ nhõm và nhận ra mình vừa may mắn hơn là đúng.', 'The whole meeting passes smoothly and no one mentions etiquette. You are relieved and realize you were lucky rather than right.', { rep: 2, sanity: 2 }]
      ]),
      fc('Hỏi thẳng vị khách muốn được đón theo cách nào', 'Ask the guest directly how they wish to be received',
        'Ông cười và nói đó là câu hỏi thực tế nhất ông nghe suốt tuần. Hai người đi dọc hành lang nói chuyện về cấp bậc của cả hai bên, và bạn biết thêm hai điều mà không sách nào dạy.',
        'They laugh and say that is the most practical question they have heard all week. The two of you walk the corridor discussing the ranks of both sides, and you learn two things no book teaches.',
        { network: 7, rep: 3, sanity: 2 })
    ], { age: [28, 90] }),

  // ------------------------------------------------------------------ Index: pneumatic tubes, pagers, blindfolds, absurd Prescripts
  fe('index_pneumatic_tube', 'Index', [0, 3],
    '[Ống khí nén kêu lúc nửa đêm] Ống khí nén cũ trong phòng làm việc của bạn kêu lên một tiếng thở, rồi nhả ra một tờ giấy cuộn nhỏ, có đóng dấu và ghi một mã bạn chưa thấy. Mực còn ướt. Nó đến từ dưới sâu, nơi con lắc vẫn đung đưa theo cả thành phố. Chỉ có một dòng: Đứng ở cầu thang tầng ba đến khi có người hỏi bạn đang làm gì.',
    '[The pneumatic tube sounds at midnight] The old pneumatic tube in your office gives a breathy sound and spits out a small rolled slip, stamped, with a code you have not seen. The ink is still wet. It came from deep below, where the pendulum swings with the whole city. There is one line: Stand on the third-floor stairs until someone asks what you are doing.',
    [
      fc('Đứng ở đó đến khi có người hỏi', 'Stand there until someone asks',
        'Bạn đứng suốt đêm, và người hỏi là một lao công đến lau cầu thang lúc năm giờ sáng. Bạn nói bạn đang chờ. Bà cúi đầu, và nói bà cũng đã từng chờ ở đó thế này. Cả hai không nói gì thêm.',
        'You stand all night, and the one who asks is a cleaner arriving to mop the stairs at five in the morning. You say you are waiting. She nods and says she too once waited here like this. Neither says more.',
        { rep: 4, sanity: 2, network: 3 }, { flagsAdd: ['index_obeyed'] }),
      fg('Hỏi chính mình thành tiếng để kết thúc sớm hơn', 'Ask yourself aloud to end it sooner', [
        [50, 'Bạn thì thầm câu hỏi vào bóng tối, và tờ Prescript trong tay bạn ấm lên một thoáng, như ai đó thở ra. Bạn về ngủ, và không biết mình vừa hoàn thành hay vừa làm trò.', 'You whisper the question into the dark, and the Prescript in your hand warms a moment, as if someone exhaled. You go to bed and do not know whether you completed it or played a trick.', { sanity: -3, rep: 2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Sáng hôm sau một Proxy đến hỏi bạn đã làm gì ở cầu thang. Bạn kể thật, và anh ta ghi chép hồi lâu. Prescript không bao giờ nói rằng ai được phép hỏi.', 'The next morning a Proxy comes to ask what you did on the stairs. You tell the truth, and they write for a long time. The Prescript never said who was allowed to ask.', { rep: -5, sanity: -5, heat: 3 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Bỏ cầu thang, ngồi trong phòng chờ tờ giấy khác', 'Leave the stairs and wait in your office for another slip',
        'Tờ giấy thứ hai không đến. Sáng ra, bạn thấy ống khí nén đã im, và tờ giấy đầu vẫn nằm trên bàn, mực đã khô hẳn, chữ cũng không còn đọc được.',
        'The second slip never arrives. By morning the tube is silent, and the first slip still lies on the desk, the ink fully dry and the words no longer legible.',
        { sanity: -4, rep: -3 }, { flagsAdd: ['index_deviated'] })
    ], { weight: 10 }),

  fe('index_pager_prescript', 'Index', [0, 3],
    '[Máy nhắn tin lúc ba giờ] Chiếc máy nhắn tin cũ bạn được phát kêu lên lúc ba giờ sáng, và trên màn hình chỉ có một câu: Không nói với ai một lời nào trong năm ngày. Thời hạn bắt đầu ngay bây giờ. Bạn nhìn quanh phòng, rồi nhìn lịch, và nhận ra ngày mốt có một cuộc họp mà bạn phải phát biểu.',
    '[The pager at three] The old pager you were issued sounds at three in the morning, and the screen holds only one sentence: Speak to no one for five days. The deadline starts now. You look around the room, then at the calendar, and realize the day after tomorrow holds a meeting where you must speak.',
    [
      fc('Im lặng năm ngày, mặc cuộc họp', 'Stay silent five days, meeting or no',
        'Bạn viết ra giấy mọi thứ cần nói, và đưa cho từng người. Cuộc họp trôi qua với một bầu không khí kỳ lạ, và đồng nghiệp nhìn bạn như một người đang cầm một món đồ dễ vỡ. Đến ngày thứ năm, máy nhắn tin im lặng, và bạn nói chữ đầu tiên rất khẽ.',
        'You write down everything you need to say and hand it to each person. The meeting passes in a strange hush, and colleagues regard you as someone carrying something fragile. On the fifth day the pager goes quiet, and you say your first word softly.',
        { rep: 6, sanity: -4, network: -2 }, { flagsAdd: ['index_obeyed'] }),
      fg('Nói đúng ba câu trong cuộc họp và giữ im lặng phần còn lại', 'Say exactly three sentences at the meeting and stay silent otherwise', [
        [50, 'Cuộc họp trôi qua. Máy nhắn tin không kêu thêm lần nào, và đến ngày thứ sáu bạn nhận ra mình chưa bao giờ biết liệu mình đã làm đúng hay không. Không có ai nói gì cả.', 'The meeting passes. The pager never sounds again, and on the sixth day you realize you never learn whether you did right. No one says anything at all.', { sanity: -3, rep: 2 }, { flagsAdd: ['index_deviated'] }],
        [50, 'Một Proxy ngồi ở cuối phòng, ghi lại ba câu bạn nói, và gật đầu như đã chờ chính điều đó. Không ai giải thích. Bạn bị gọi vào văn phòng sau đó, và nghe một giọng rất nhẹ nói rằng bạn đã hiểu sai ý của Prescript.', 'A Proxy sits at the room’s end, noting your three sentences, nodding as if awaiting exactly that. No one explains. You are called to an office afterward and hear a very gentle voice say you misread the Prescript.', { rep: -6, sanity: -6, heat: 3 }, { flagsAdd: ['index_deviated'] }]
      ]),
      fc('Tắt máy nhắn tin và nói chuyện như thường', 'Switch off the pager and speak as usual',
        'Màn hình đen lại, nhưng bạn thấy cả ngày như có thứ gì đó nhìn mình qua nó. Bạn nói chuyện bình thường, và mỗi lần mở miệng bạn nghe thấy một khoảng im lặng sau câu nói của mình, dài hơn mức cần thiết.',
        'The screen goes black, but all day you feel as if something looks at you through it. You speak as usual, and each time you open your mouth you hear a silence after your sentence, longer than necessary.',
        { sanity: -7, rep: -4 }, { flagsAdd: ['index_deviated'] })
    ], { weight: 10 }),

  fe('index_blindfold_removed', 'Index', [1, 2],
    '[Dải bịt mắt được tháo] Trong căn phòng nhỏ nhất của tòa nhà Index, một Proxy tháo dải bịt mắt viền vàng của bạn và đặt xuống bàn. Lần đầu tiên sau nhiều năm, bạn thấy khuôn mặt của những người đã ra lệnh cho mình. Họ trông bình thường đến đáng ngại. Một người trong số đó đang cầm một thanh kiếm riêng, đặt lên tay bạn.',
    '[The blindfold is removed] In the smallest room of the Index building, a Proxy unties your gold-trimmed blindfold and lays it on the table. For the first time in years you see the faces of those who gave you orders. They look disturbingly ordinary. One of them holds a sword of your own and sets it in your hands.',
    [
      fc('Nhận thanh kiếm, không nói gì', 'Take the sword and say nothing',
        'Thanh kiếm hơi nặng hơn thanh chuẩn mà bạn quen. Proxy nói từ nay bạn sẽ không chỉ nhận Prescript mà còn phải giải nghĩa chúng. Bạn gật đầu, và cảm thấy nơi dải bịt mắt từng nằm có một cảm giác trống trải.',
        'The sword is slightly heavier than the standard one you knew. The Proxy says from now you will not only receive Prescripts but must interpret them. You nod, and feel an emptiness where the blindfold used to rest.',
        { rep: 6, sanity: -3, network: 4 }),
      fg('Hỏi vì sao họ lại trông bình thường đến thế', 'Ask why they look so ordinary', [
        [55, 'Proxy mỉm cười rất nhẹ và nói ý chí của thành phố không có hình dáng riêng, nên những người phục vụ nó cũng không cần. Bạn nghĩ về câu ấy cả tuần, và dần dần thấy nó vừa an ủi vừa đáng sợ.', 'The Proxy smiles faintly and says the city’s will has no shape of its own, so those who serve it need none. You think of that sentence all week, and gradually find it both comforting and frightening.', { sanity: -2, rep: 4, network: 3 }],
        [45, 'Cả phòng lặng đi, rồi Proxy nói câu hỏi ấy chưa từng được hỏi, và không biết nên ghi vào sổ nào.', 'The whole room is silent, then the Proxy says the question has never been asked and they know not which ledger to record it in.', { rep: -4, sanity: -5 }]
      ]),
      fc('Giữ dải bịt mắt trong túi áo', 'Keep the blindfold in your coat pocket',
        'Không ai ngăn. Mỗi lần bạn thấy một Proselyte đi ngang với dải vải trên mắt, bạn chạm vào túi, và nhớ cảm giác không phải nhìn thấy gì.',
        'No one stops you. Each time you see a Proselyte pass with the cloth over their eyes, you touch your pocket and remember the feeling of not having to see.',
        { sanity: 1, rep: 1 })
    ], { age: [24, 80] }),

  // ------------------------------------------------------------------ Middle: Labors, tattoos, chains, collective vengeance, leaving
  fe('middle_pilgrimage_of_loyalty', 'Middle', [1, 2],
    '[Chuyến hành hương của lòng trung thành] Để lên bậc Great Sibling, một Big Sibling phải trải qua Pilgrimage of Loyalty, gồm một hoặc nhiều Labor, những cuộc báo thù nhiều rủi ro nhất trong Book of Vengeance. Hội giao bạn Labor đầu tiên: một người ngoài bị ghi vào Book ba mươi năm trước vì làm hại một Sibling đã mất. Hắn đã già, giàu, và có vệ sĩ.',
    '[The Pilgrimage of Loyalty] To rise to Great Sibling, a Big Sibling must undertake the Pilgrimage of Loyalty, made up of one or more Labors, the riskiest vengeances in the Book. The team assigns your first Labor: an outsider entered in the Book thirty years ago for harming a dead Sibling. He is old, rich, and guarded.',
    [
      fc('Thực hiện Labor đúng như Book ghi, bằng chính tay bạn', 'Carry out the Labor exactly as the Book writes, with your own hands',
        'Bạn mất hai tuần theo dõi, và một đêm để hoàn thành. Khi xong, hội cho bạn thêm một hình xăm và một sợi xích vàng. Người ta chào bạn bằng cái cúi đầu sâu hơn trước, nhưng bạn thấy ánh mắt họ khác đi.',
        'You spend two weeks watching and one night to finish. When done, the team grants you another tattoo and a gold chain. People greet you with a deeper bow than before, but you see their eyes have changed.',
        { rep: 9, sanity: -11, network: 5, heat: 6, health: -6 }, { meritAdd: 6, flagsAdd: ['middle_vengeful'] }),
      fg('Báo cho hắn biết trước, để hắn có cơ hội bồi thường', 'Warn him first so he has a chance to make amends', [
        [50, 'Ông già trả một khoản tiền khổng lồ và quỳ xuống trước một bức ảnh người đã mất. Hội ghi Labor ấy là hoàn thành theo kiểu khác, nhưng một Great Sibling nhìn bạn một lúc và nói đó không phải kiểu của Middle. Bạn được cho đi tiếp, vì hắn đã trả đủ.', 'The old man pays a huge sum and kneels before a photograph of the dead. The team records the Labor as completed in another manner, but a Great Sibling looks at you long and says that is not the Middle’s way. You are let through anyway, since he has paid enough.', { rep: 3, sanity: 3, network: 4, wealth: 14 }, { flagsAdd: ['middle_forgiving'] }],
        [50, 'Ông già báo cho vệ sĩ, và Labor biến thành một trận hỗn chiến. Bạn thoát được, nhưng hai Little Sibling đi cùng bị thương nặng, và Great Sibling gọi đó là sự thiếu quyết đoán của bạn.', 'The old man tells his guards, and the Labor turns into a melee. You escape, but two Little Siblings with you are badly hurt, and the Great Sibling calls it your lack of resolve.', { health: -12, rep: -8, sanity: -7 }, { flagsAdd: ['middle_forgiving'] }]
      ]),
      fc('Xin hội đổi Labor khác, nói bạn chưa sẵn sàng', 'Ask the team for another Labor, saying you are not ready',
        'Hội nghe bạn và không giận. Một Labor khác đến sau ba tháng, nhẹ hơn nhưng không kém phần nặng nề: bạn phải đến từng nhà một nhóm Sibling, và nghe họ kể về điều họ đã mất.',
        'The team hears you and is not angry. Another Labor arrives after three months, lighter but no less heavy: you must visit the home of each in a group of Siblings and hear them tell what they lost.',
        { sanity: -4, rep: 4, network: 7 })
    ], { age: [32, 90], weight: 10 }),

  fe('middle_tattoo_for_vengeance', 'Middle', [0, 3],
    '[Hình xăm của một báo thù] Một Vengeance mà bạn tham gia vừa hoàn thành, và theo lệ mỗi người hoàn thành một Vengeance được xăm một hình. Số hình xăm cho biết bạn ở bậc nào. Thợ xăm của hội đặt kim lên cánh tay bạn và hỏi bạn muốn hình gì. Hắn nói hầu hết mọi người chỉ chọn tên của người bị báo thù.',
    '[A tattoo for a vengeance] A Vengeance you took part in has just been completed, and by custom each who completes one receives a tattoo. The number shows how high you stand. The team’s tattooist rests the needle on your arm and asks what image you want. He says most people simply choose the name of the one avenged.',
    [
      fc('Xăm tên người bị báo thù, như mọi người', 'Ink the name of the one avenged, like everyone',
        'Cây kim lạnh và đều. Khi xong, bạn nhìn tên ấy trên da mình, và nhận ra bạn không biết người ấy sống ra sao. Hội cúi đầu hài lòng, và bạn thấy mình được nhìn khác.',
        'The needle is cold and even. When done you look at that name on your skin and realize you do not know how that person lived. The team nods in satisfaction, and you feel regarded differently.',
        { rep: 6, sanity: -4, network: 5, health: -2 }, { flagsAdd: ['middle_vengeful'] }),
      fc('Xăm tên người đã bị hại, không phải tên kẻ bị báo thù', 'Ink the name of the one harmed, not of the one avenged',
        'Thợ xăm dừng tay một nhịp, rồi gật đầu chậm. Hắn nói đã mười năm hắn không được xăm tên như thế. Cả hội nhìn cánh tay bạn khi bạn bước vào, và có người cúi đầu thật nhẹ.',
        'The tattooist pauses a beat then nods very slowly. He says it has been ten years since he inked a name like that. The whole team looks at your arm when you enter, and some bow lightly.',
        { sanity: 4, rep: 5, network: 7, health: -2 }, { flagsAdd: ['middle_forgiving'] }),
      fc('Từ chối xăm, nói bạn chỉ làm vì bổn phận', 'Decline the tattoo, saying you acted only from duty',
        'Thợ xăm cất kim đi mà không bình luận. Nhưng trong những tuần sau, bạn nhận ra hội để ý cánh tay trần của bạn, và một Big Sibling nói rằng một người không mang dấu thì khó được tin.',
        'The tattooist puts away the needle without comment. But in the following weeks you notice the team watching your bare arm, and a Big Sibling says one who bears no mark is hard to trust.',
        { sanity: 2, rep: -4, network: -3 })
    ], { age: [18, 70] }),

  fe('middle_collective_vengeance', 'Middle', [1, 3],
    '[Báo thù lan sang cả khu] Một Sibling bị đánh trong một quán rượu ở District 21, và Book of Vengeance ghi hình phạt cho người ra tay. Nhưng người ra tay đã bỏ trốn, và hội muốn trả đũa tất cả những ai ở quán lúc đó. Họ nói Middle không bao giờ để ai chạm vào gia đình mà không phải trả giá. Danh sách có mười hai người, trong đó có cả người phục vụ.',
    '[Vengeance spreads to the whole bar] A Sibling was beaten in a District 21 tavern, and the Book of Vengeance records the punishment for the one who struck. But that person has fled, and the team wants to retaliate against everyone in the tavern at the time. They say the Middle never lets anyone touch family without paying. The list has twelve names, including the waiter.',
    [
      fc('Đi cùng đoàn trả đũa, đúng như Book ghi', 'Join the retaliation party, as the Book writes',
        'Bạn đứng ở cửa trong suốt buổi tối, và không động tay. Nhưng sáng hôm sau cả khu im lặng, và bạn thấy một nữ phục vụ khóc ngoài hẻm. Hội thưởng bạn vì đã có mặt, và bạn không biết đó có phải sự khen ngợi.',
        'You stand at the door through the evening and lift no hand. But the next morning the whole district is silent, and you see a waitress weeping in the alley. The team rewards you for attending, and you do not know whether that is praise.',
        { rep: 5, sanity: -10, network: 3, heat: 5 }, { flagsAdd: ['middle_vengeful'] }),
      fg('Đề nghị chỉ trừng phạt kẻ ra tay và kẻ đã giúp hắn trốn', 'Propose punishing only the attacker and whoever helped him flee', [
        [55, 'Big Sibling nghe, rất lâu, rồi nói Book thật sự có điều khoản cho trường hợp ấy, ở mục sau. Danh sách rút còn hai tên. Bạn đứng nhìn ông gạch mười tên, và hiểu rằng ngay cả trong Middle, đôi khi vẫn có người đọc đến mục sau.', 'The Big Sibling listens very long then says the Book does indeed have a clause for such a case, in a later section. The list shrinks to two names. You watch them strike ten and understand that even in the Middle someone sometimes reads on to the later section.', { rep: 7, sanity: 4, network: 6 }, { flagsAdd: ['middle_forgiving'] }],
        [45, 'Hội coi đề nghị ấy là yếu mềm, và bạn bị bỏ ra ngoài đoàn. Hai người khác đi thay, và khi họ về, bạn không hỏi, và không ai kể.', 'The team takes the proposal as weakness, and you are left out of the party. Two others go instead, and when they return you do not ask and no one tells.', { rep: -7, sanity: -5, network: -4 }, { flagsAdd: ['middle_forgiving'] }]
      ]),
      fc('Cảnh báo bí mật cho người phục vụ và vài người vô can', 'Secretly warn the waiter and a few of the blameless',
        'Bạn đưa tin cho họ trong chợ, và bốn người rời khu trước đêm. Hội phát hiện chỉ có tám người ở nhà. Big Sibling nhìn bạn một lần rất dài,, nhưng bạn biết ông biết.',
        'You pass word to them in the market, and four leave the district before nightfall. The team finds only eight at home. The Big Sibling gives you one very long look, but you know he knows.',
        { sanity: 3, rep: -2, network: 4, heat: 4 }, { flagsAdd: ['middle_forgiving'] })
    ], { age: [26, 90], weight: 10 }),

  fe('middle_leaver_hunt', 'Middle', [1, 3],
    '[Một Sibling muốn rời hội] Một Sibling cùng thời với bạn đến tìm bạn lúc nửa đêm và nói họ muốn rời Middle. Họ biết điều đó nghĩa là gì: thành viên Middle ở lại suốt đời, và ai bỏ đi bị chính những người từng gọi mình là anh chị em săn đến khi chết hoặc khi xóa sạch mọi dấu vết của hội khỏi người mình. Họ không xin bạn giúp. Họ chỉ muốn bạn biết trước.',
    '[A Sibling wants to leave] A Sibling of your cohort finds you at midnight and says they wish to leave the Middle. They know what that means: members of the Middle stay for life, and anyone who leaves is hunted by those who once called them family until they die or erase every trace of the Middle from themselves. They do not ask your help. They only want you to know beforehand.',
    [
      fc('Nói bạn không thấy gì và để họ đi', 'Say you saw nothing and let them go',
        'Họ cúi đầu rất sâu, rồi biến mất trong ngõ. Ba tháng sau bạn nghe tin họ đã xóa hết hình xăm bằng axit trên một chiếc tàu hàng.',
        'They bow very deep then vanish in the alley. Three months later you hear they burned off every tattoo with acid aboard a freight train.',
        { sanity: -6, rep: -2, network: 3 }, { flagsAdd: ['middle_forgiving'] }),
      fg('Báo Big Sibling theo đúng lệ', 'Report to the Big Sibling as custom demands', [
        [60, 'Big Sibling nghe xong và nói người ấy sẽ được cho ba ngày để đổi ý. Trong ba ngày ấy bạn là người phải ngồi cạnh họ. Họ không đổi ý, và đêm cuối họ nói họ không giận bạn.', 'The Big Sibling hears you and says the person will be granted three days to reconsider. In those three days you are the one who must sit beside them. They do not change their mind, and on the last night say they are not angry at you.', { rep: 6, sanity: -9, network: -5 }, { flagsAdd: ['middle_vengeful'] }],
        [40, 'Người ấy đã biết trước, và đã đi ngay đêm gặp bạn. Hội truy lùng, và khi họ về không mang theo gì, chỉ mang theo một câu hỏi: Anh có biết không?', 'The person already knew and left the very night they met you. The team hunts, and when they return they carry nothing, only a question: Did you know?', { rep: -5, sanity: -7, heat: 4 }, { flagsAdd: ['middle_vengeful'] }]
      ]),
      fc('Giúp họ chuẩn bị: tiền, giấy tờ, một lối ra khỏi District', 'Help them prepare: money, papers, a way out of the District',
        'Bạn dành cả đêm lo cho họ, và khi họ đi lúc rạng sáng, họ nắm tay bạn. Bạn biết mình đã bước qua một ranh giới mà không ai trong hội muốn thấy, và bạn đứng nhìn họ khuất sau cổng với một cảm giác nhẹ nhõm kỳ lạ.',
        'You spend the whole night preparing them, and when they leave at dawn they hold your hand a long time. You know you have crossed a line no one in the team wishes to see, and watch them vanish past the gate with a strange lightness.',
        { wealth: -10, sanity: 3, rep: -6, network: 5, heat: 8 }, { flagsAdd: ['middle_forgiving'] })
    ], { age: [28, 90], weight: 10 }),

  // ------------------------------------------------------------------ Ring: grading, auctions, schools, the Maestro's three pieces
  fe('ring_grade_civilian_art', 'Ring', [0, 1],
    '[Chấm điểm tranh của dân Backstreets] Dân Backstreets muốn được The Ring bảo vệ thì phải nộp một tác phẩm để chấm điểm, theo thang chữ cái. Một điểm trượt là lời cảnh cáo, hai điểm là mất sự bảo vệ, ba điểm là bị xử ngay tại chỗ. Hôm nay bạn là người chấm một bức tranh của một bà bán rau, vẽ lại khu chợ bằng than. Bà đã bị một điểm trượt từ trước.',
    '[Grading Backstreets art] Backstreets residents who want the Ring’s protection must submit a work to be graded on a letter scale. One failing mark is a warning, two remove protection, three mean execution on the spot. Today you grade a painting by a vegetable seller, a charcoal rendering of her market. She already carries one failing mark.',
    [
      fc('Cho điểm đúng theo thước đo của Ring', 'Grade strictly by the Ring’s own measure',
        'Bức tranh vụng và hơi lệch. Bạn cho điểm trượt, và bà bán rau đứng im, nhìn tờ giấy, không phản đối. Bà bị mất sự bảo vệ của Ring. Cả buổi chiều bạn cố nhớ đường nét chiếc xe rau bà đã vẽ, vì nó thật ra khá đẹp.',
        'The painting is clumsy and slightly crooked. You give a failing mark, and the vegetable seller stands still, regarding the paper, not objecting. She loses the Ring’s protection. All afternoon you try to recall the lines of the vegetable cart she drew, because it was actually rather lovely.',
        { rep: 4, sanity: -9, network: -4 }, { flagsAdd: ['ring_chased_perfection'] }),
      fg('Cho điểm đạt, dù bức tranh chưa tới', 'Give a passing mark though the work falls short', [
        [55, 'Bà bán rau cảm ơn bằng một cái cúi đầu rất sâu và để lại một giỏ rau trước cửa nhà bạn. Một Docent đứng sau lưng bạn đọc điểm, và chỉ nói rằng chuẩn của Ring là chuẩn, bất kể ai chấm. Bạn bị ghi một dấu nhẹ.', 'The vegetable seller thanks you with a very deep bow and leaves a basket of greens at your door. A Docent standing behind you reads the mark and says only that the Ring’s standard is the standard, whoever grades. You are noted lightly.', { sanity: 4, network: 6, rep: -3 }, { flagsAdd: ['ring_kept_conscience'] }],
        [45, 'Docent đứng sau lưng bạn xem lại, và đổi điểm ngay trước mặt bà bán rau. Bà không phản ứng, như đã quen. Bạn mất mặt, và bà mất bảo hộ, và cả hai đều phải đứng đó đến khi mọi chuyện xong.', 'The Docent behind you reviews and changes the mark right before the vegetable seller. She does not react, as if used to it. You lose face, and she loses protection, and both of you must stand there until it is done.', { rep: -7, sanity: -7 }, { flagsAdd: ['ring_kept_conscience'] }]
      ]),
      fc('Hướng dẫn bà sửa bức tranh và hẹn chấm lại', 'Coach her to revise the painting and arrange a regrade',
        'Bạn chỉ cho bà ba chỗ cần sửa, trong một giờ, dưới một mái hiên. Bà nộp lại ba ngày sau, và bức tranh tốt hơn hẳn. Một điểm đạt, thấp nhưng đủ. Bà không nói gì, chỉ nắm tay bạn một lúc.',
        'You show her three places to correct, in an hour, beneath an awning. She resubmits three days later, and the painting is much better. A passing mark, low but enough. She says nothing, only holds your hand a moment.',
        { sanity: 3, network: 6, rep: 2 }, { flagsAdd: ['ring_kept_conscience'] })
    ], { age: [18, 70], weight: 10 }),

  fe('ring_veiled_auction', 'Ring', [1, 3],
    '[Đêm đấu giá che mặt] Tại buổi đấu giá riêng của một Maestro, mỗi người trả giá đều đeo một tấm voan phủ kín đầu, đại diện cho các tập đoàn không muốn lộ danh tính. Tác phẩm tối nay là một bức mà ngay cả bạn cũng chưa được nhìn trước. Người điều hành giơ búa, và tay bạn run khi nhận ra người đang trả giá cao nhất cầm cây bút của một người bạn từng biết.',
    '[Veiled auction night] At a Maestro’s private auction, each bidder wears a veil covering the whole head, standing for corporations that wish to hide their identity. Tonight’s piece is one even you have not been allowed to see beforehand. The auctioneer raises the gavel, and your hand trembles when you realize the highest bidder holds a pen once belonging to someone you knew.',
    [
      fc('Giữ vị trí, không để lộ gì', 'Hold your post and reveal nothing',
        'Búa hạ, và người cầm bút thắng. Tác phẩm được kéo màn ra, và cả phòng nín thở trong một khoảnh khắc.',
        'The gavel falls, and the pen holder wins. The cloth is drawn from the work, and the whole room holds its breath a moment. You recognize that stroke, and never tell anyone.',
        { rep: 5, wealth: 6, sanity: -6 }, { flagsAdd: ['ring_chased_perfection'] }),
      fg('Theo người thắng đấu giá ra cửa sau và hỏi cây bút', 'Follow the winner to the back door and ask about the pen', [
        [50, 'Người ấy gỡ voan, và đó là một người đàn ông trung niên với đôi mắt đỏ hoe. Ông nói ông mua cây bút để giữ nó khỏi bị chôn. Ông đưa bạn xem ba bức phác thảo cuối cùng của người đã mất, và bạn đứng im trong ánh đèn hành lang.', 'They lift the veil, and it is a middle-aged man with red-rimmed eyes. He says he bought the pen to keep it from being buried. He shows you the last three sketches of the dead, and you stand motionless in the corridor light.', { sanity: -4, rep: 4, network: 6 }, { flagsAdd: ['ring_kept_conscience'] }],
        [50, 'Người ấy giữ voan trên mặt và từ chối mọi lời. Bạn bị một vệ sĩ giữ lại, và Maestro gọi bạn vào sau đó. Ông chỉ hỏi: Luật của buổi đấu giá này là gì? Bạn nói, và ông gật đầu rất chậm.', 'The person keeps the veil down and refuses every word. A guard holds you, and the Maestro calls you in afterward. He asks only: What is the rule of this auction? You say it, and he nods slowly.', { rep: -7, sanity: -5 }, { flagsAdd: ['ring_kept_conscience'] }]
      ]),
      fc('Rút khỏi vị trí giữa buổi, nói bạn không khỏe', 'Leave your post mid-auction, saying you feel unwell',
        'Bạn ngồi ngoài hành lang nghe tiếng búa từ xa. Khi buổi đấu giá kết thúc, một Docent đi ngang và nói bạn đã bỏ lỡ điều hay nhất đêm nay. Bạn không hỏi là điều gì.',
        'You sit in the corridor and hear the gavel from afar. When the auction ends a Docent passes and says you missed the best of the night.',
        { sanity: -3, rep: -4 }, { flagsAdd: ['ring_chased_perfection'] })
    ], { age: [26, 90] }),

  fe('ring_school_dispute', 'Ring', [1, 3],
    '[Hai Trường phái trong một đơn đặt hàng] Một đơn hàng lớn buộc một nhóm Fauvism và một nhóm Pointillism làm chung một tác phẩm. Hai bên cãi nhau về phương pháp từ ngày đầu: một bên muốn màu vỡ ra thành những mảng lớn, bên kia muốn từng chấm nhỏ đặt cạnh nhau. Bạn là người điều phối, và cả hai bên đều nhìn bạn như thể bạn là kẻ thù.',
    '[Two Schools on one commission] A large order forces a Fauvist group and a Pointillist group to work together on one piece. From the first day they quarrel over method: one side wants color to break into large patches, the other wants small dots set side by side. You are the coordinator, and both sides look at you as if you were the enemy.',
    [
      fc('Chia tác phẩm thành hai nửa, mỗi nhóm một nửa', 'Divide the piece into two halves, one for each group',
        'Hai nửa hoàn thành đúng hạn và nằm cạnh nhau trên tường, không hòa nhưng không chọi nhau. Người xem nói đó là sự đối thoại thú vị nhất của triển lãm. Cả hai nhóm không ai thừa nhận điều đó, nhưng cả hai đều gửi bạn một lời cảm ơn riêng.',
        'The two halves finish on time and hang side by side, not blending but not warring. Viewers call it the most interesting dialogue in the exhibition. Neither group admits it, but both send you a private thanks.',
        { rep: 6, network: 7, sanity: 2 }),
      fg('Ép cả hai nhóm làm theo một phương pháp thứ ba', 'Force both groups to adopt a third method', [
        [45, 'Phương pháp mới khiến cả hai nhóm phải học lại từ đầu, và kết quả khiến Maestro im lặng rất lâu rồi cúi đầu. Cả hai nhóm đều ghét bạn, nhưng tác phẩm được treo ở sảnh chính.', 'The new method forces both groups to relearn from scratch, and the result leaves the Maestro silent a long while then nodding. Both groups hate you, but the work hangs in the main hall.', { rep: 8, network: -6, sanity: -4 }, { flagsAdd: ['ring_chased_perfection'] }],
        [55, 'Cả hai nhóm làm theo, nhưng không ai đặt tâm vào. Tác phẩm hoàn thành đúng yêu cầu, và vô hồn. Maestro nói nó không phải của Trường phái nào, và vì thế không là của ai.', 'Both groups comply but neither puts heart in. The work finishes to specification, and is lifeless. The Maestro says it belongs to no School and therefore to no one.', { rep: -6, sanity: -5, network: -3 }, { flagsAdd: ['ring_chased_perfection'] }]
      ]),
      fc('Nhờ Maestro phân xử theo Trường phái nào đúng', 'Ask the Maestro to rule which School is right',
        'Maestro lặng đi, rồi nói cả hai đều đúng, và chính vì thế họ không thể làm chung. Ông giao việc cho một nhóm khác, và hai nhóm kia được nghỉ. Bạn thấy cả hai thở ra cùng lúc.',
        'The Maestro is silent then says both are right, and precisely for that cannot work together. He hands the work to another group, and the two are stood down. You see both exhale at once.',
        { sanity: 1, rep: 1, network: 2 })
    ], { age: [28, 90], weight: 10 }),

  fe('ring_three_pieces', 'Ring', [1, 1],
    '[Ba tác phẩm để thành Maestro] Muốn mang danh Maestro, một Docent phải có ba tác phẩm chứng minh giá trị của mình. Bạn đã có hai, và Hội đồng đang chờ cái thứ ba. Chiếc nhẫn trên tay trái bạn có hai vòng xoắn, và bạn nhìn nó mỗi sáng. Một người khách hứa trả một khoản lớn nếu bạn làm cái thứ ba theo ý họ, nhanh và an toàn.',
    '[Three works to become Maestro] To bear the title of Maestro, a Docent must have three works establishing their worth. You have two, and the council awaits the third. The ring on your left hand has two coils, and you look at it each morning. A patron offers a large sum if you make the third to their wishes, quick and safe.',
    [
      fc('Nhận đơn hàng, làm nhanh và hoàn hảo theo yêu cầu', 'Take the commission and make it fast and perfect to specification',
        'Tác phẩm thứ ba hoàn thành trong hai tháng. Hội đồng nhận hồ sơ xét Maestro, nhưng cuộc sát hạch vẫn còn phía trước. Có điều trong tác phẩm ấy bạn không muốn nhìn lại.',
        'The third work is finished in two months. The council accepts your Maestro dossier, but the trial still lies ahead. There is something in the work you never wish to see again.',
        { rep: 9, wealth: 16, sanity: -8, network: 5 }, { flagsAdd: ['ring_chased_perfection'], meritAdd: 6 }),
      fg('Từ chối đơn hàng, làm tác phẩm thứ ba theo ý riêng', 'Refuse the commission and make the third as you wish', [
        [50, 'Bạn mất một năm, và tác phẩm làm Hội đồng im lặng. Một Maestro già nói ông không thể xếp nó vào Trường phái nào. Hồ sơ của bạn được chuyển sang sát hạch, còn bạn trở về xưởng chờ ngày gọi tên.', 'It takes a year, and the work leaves the council silent. An elder Maestro cannot place it in any School. Your dossier goes to the trial, and you return to the studio to wait.', { rep: 10, sanity: 3, wealth: -6, network: 3 }, { flagsAdd: ['ring_kept_conscience'], meritAdd: 6 }],
        [50, 'Hội đồng nhìn tác phẩm và từ chối. Họ nói nó thật, nhưng không đủ cho một Maestro. Bạn mang nó về xưởng, và nhìn nó nhiều tháng sau mà không biết nên đau hay tự hào.', 'The council looks at the work and declines. They say it is true, but not enough for a Maestro. You carry it back to the studio and look at it for months without knowing whether to grieve or take pride.', { rep: -4, sanity: -3, wealth: -6 }, { flagsAdd: ['ring_kept_conscience'] }]
      ]),
      fc('Hoãn tác phẩm thứ ba thêm vài năm', 'Postpone the third work another few years',
        'Hội đồng gật đầu một cách khó đoán. Bạn quay về xưởng và làm những việc nhỏ trong nhiều tháng, đến khi cảm giác ngột ngạt dịu bớt. Nhẫn hai vòng xoắn của bạn vẫn đó, và bạn thôi nhìn nó mỗi sáng.',
        'The council nods inscrutably. You return to the studio and do small things for months until the suffocating feeling eases. Your two-coil ring is still there, and you stop looking at it each morning.',
        { sanity: 3, rep: -2 })
    ], { age: [30, 90] }),

  fe('ring_outskirts_clash', 'Ring', [1, 3],
    '[Giao chiến với The Pinky ngoài Outskirts] Ring và Pinky đang đánh nhau ở Outskirts, và bạn được cử theo một đoàn mang vật liệu và người đến một nơi dựng tạm. Người ta nói Pinky không có cấp bậc rõ ràng, và không ai biết ai là thành viên. Trong đoàn của bạn, một người lạ đi đúng nhịp với bạn từ sáng, mà không ai nhớ đã gặp họ ở đâu.',
    '[Clash with the Pinky in the Outskirts] The Ring and the Pinky are fighting in the Outskirts, and you are sent with a party carrying materials and people to a makeshift site. It is said the Pinky have no clear ranks, and no one knows who is a member. In your party a stranger has kept exact pace with you since morning, and no one recalls where they met them.',
    [
      fc('Theo dõi người lạ mà không nói gì với ai', 'Watch the stranger and tell no one',
        'Người lạ làm việc cần mẫn, và đến chiều, một chiếc hộp biến mất khỏi xe. Bạn thấy họ nhìn bạn một lần, rất ngắn, và gật đầu như cảm ơn vì đã không nói.',
        'The stranger works diligently, and by afternoon one crate vanishes from the cart. You see them glance at you once, very briefly, and nod as in thanks for saying nothing.',
        { sanity: -4, rep: -2, network: 3 }),
      fg('Báo trưởng đoàn và chỉ vào người lạ', 'Tell the party leader and point out the stranger', [
        [55, 'Người lạ bị giữ lại và khám. Họ không mang gì, và chỉ nói tên một người mà không ai biết. Đoàn đi tiếp, nhưng không khí nặng hơn, và bạn nghe nói họ được thả đêm đó.', 'The stranger is held and searched. They carry nothing and give only a name no one knows. The party proceeds, but the mood is heavier, and you hear they were released that night.', { rep: 4, sanity: -3, network: -2 }],
        [45, 'Người bạn chỉ là một thợ khuân vác thật, và bị đánh rất nặng trước khi mọi người nhận ra. Trưởng đoàn nhìn bạn. Cả đoàn im lặng suốt đường còn lại.', 'The one you point out is simply a real porter, and is beaten badly before anyone realizes. The leader looks at you. The whole party stays silent the rest of the way.', { rep: -9, sanity: -9, heat: 4 }]
      ]),
      fc('Đến gần người lạ và nói chuyện bình thường', 'Approach the stranger and speak plainly',
        'Người lạ nói chuyện về thời tiết và đường đi, hoàn toàn bình thường. Chỉ đến cuối ngày bạn nhận ra mình đã kể họ nghe nhiều hơn mình định, và họ chưa hề kể gì về mình.',
        'The stranger speaks of weather and road, entirely ordinary. Only at day’s end do you realize you told them more than you intended, and they told you nothing of themselves.',
        { sanity: -3, network: 2 })
    ], { age: [26, 90] }),

  // ------------------------------------------------------------------ Pinky: star-forged blades, seats, hidden members, scatter and gather
  fe('pinky_appoint_blade', 'Pinky', [0, 1],
    '[Chọn một thanh kiếm sao] Trong phòng cất kiếm của The Pinky có một dãy thanh kiếm rèn từ sao, mỗi cái gắn với một ghế. Để ngồi vào ghế ấy, bạn phải chọn đúng một thanh kiếm làm của mình, và từ đó không bao giờ được dùng thanh khác, vì dùng thanh khác là điềm xấu. Người giữ phòng đặt bạn trước dãy kiếm và rời đi.',
    '[Appointing a star-forged blade] In the Pinky’s blade room stands a row of star-forged swords, each bound to a seat. To take that seat you must appoint exactly one blade as your own, and from then on never use another, for using another is an ill omen. The keeper sets you before the row and leaves.',
    [
      fc('Chọn thanh kiếm mà bạn thấy nặng nhất', 'Choose the blade that feels heaviest',
        'Thanh kiếm lạnh trong tay bạn, như đã chờ lâu. Bạn nói ra thành tiếng rằng bạn chọn nó, và nghe tiếng mình dội lại trong căn phòng đá. Người giữ phòng cúi đầu từ cửa, và không nói gì.',
        'The blade is cold in your hand, as if it had waited long. You say aloud that you choose it and hear your voice echo in the stone room. The keeper nods from the door and says nothing.',
        { rep: 5, sanity: -2, network: 3 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Chọn thanh kiếm nhẹ nhất, vì bạn tin tay hơn sao', 'Choose the lightest blade, trusting your hand over the star', [
        [55, 'Thanh kiếm ấy hóa ra nhanh nhất bạn từng cầm. Một Pinky già, người không bao giờ nói tên mình, nhìn bạn múa thử và nói rằng ghế ấy đã trống từ lâu vì không ai dám chọn thanh kiếm đó.', 'That blade turns out the quickest you have ever held. An old Pinky, who never gives a name, watches you try it and says that seat has stood empty long because no one dared choose that sword.', { rep: 6, sanity: 2, network: 3 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Thanh kiếm không nhận bạn. Không có gì xảy ra, nhưng mỗi lần bạn rút nó, bạn cảm thấy một thứ gì đó nhìn bạn từ trong lưỡi. Bạn không đổi, và không nói với ai.', 'The blade does not accept you. Nothing happens, but each time you draw it you feel something looking at you from within the edge.', { sanity: -6, rep: 1 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Đứng yên lâu trước dãy kiếm, để thanh nào gọi bạn thì chọn', 'Stand long before the row and let the one that calls you decide',
        'Bạn đứng suốt một buổi chiều. Không thanh nào gọi. Đến khi nắng tắt, bạn thấy mình đang đứng trước một thanh kiếm nhỏ ở cuối dãy, và không nhớ vì sao mình bước đến đó. Bạn chọn nó.',
        'You stand all afternoon. None calls. By the time the sun dims you find yourself before a small blade at the row’s end and cannot recall why you walked there. You choose it.',
        { sanity: 3, rep: 3, network: 2 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [18, 60] }),

  fe('pinky_claim_dead_blade', 'Pinky', [1, 3],
    '[Thanh kiếm của người đã khuất] Một thành viên của The Pinky ngã xuống ở một nơi không ai ngờ, và ghế của họ bỏ trống. Theo lệ, ghế ấy chỉ được lấp khi có người nhận thanh kiếm sao của họ làm kiếm của mình. Thanh kiếm nằm trên một tấm vải đỏ ở giữa phòng, và không ai trong số những người có mặt dám bước tới.',
    '[The dead member’s blade] A member of the Pinky falls somewhere no one expected, and their seat stands vacant. By custom that seat is filled only when someone takes the dead member’s star-forged blade as their own. The sword lies on a red cloth in the middle of the room, and none of those present dares step forward.',
    [
      fc('Bước tới và nhận thanh kiếm', 'Step forward and take the sword',
        'Cả phòng thở ra. Thanh kiếm nặng hơn thanh của bạn một chút, và có một vết xước nhỏ ở chuôi, nơi một ngón tay đã từng nắm quá chặt. Bạn không bao giờ dùng thanh cũ nữa, và mỗi lần thấy nó trên giá, bạn cảm thấy mình vừa bỏ lại một người bạn.',
        'The whole room exhales. The sword is slightly heavier than yours and bears a small scratch on the hilt where a finger once gripped too hard. You never use your old one again, and each time you see it on the rack you feel you have just abandoned someone.',
        { rep: 8, sanity: -5, network: 5 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Đề nghị chôn thanh kiếm cùng chủ, để ghế bỏ trống', 'Propose burying the sword with its owner and leaving the seat vacant', [
        [55, 'Cả phòng lặng đi hồi lâu. Rồi một Pinky già đứng dậy và nói có những ghế nên để trống, như một lời nhắc. Thanh kiếm được chôn cùng người đã khuất, và ghế ấy trống suốt nhiều năm sau, có người nói nó sẽ trống mãi.', 'The whole room is silent a long time. Then an elder Pinky rises and says some seats should stand empty, as a reminder. The sword is buried with the dead, and the seat stays vacant for many years after, some say forever.', { rep: 5, sanity: 4, network: 4 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Câu nói bị coi là bất kính với lệ. Một Sworn Blade nói giữ lệ không phải bất kính, và hai người nhìn nhau một lúc. Cuối cùng thanh kiếm vẫn nằm đó, và không ai nhận trong tháng ấy.', 'The remark is taken as disrespect to custom. A Sworn Blade says keeping custom is not disrespect, and the two look at each other a long time. In the end the sword stays there, and no one claims it that month.', { rep: -5, sanity: -3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Đứng yên, chờ người khác bước ra trước', 'Stand still and wait for someone else to step forward',
        'Người khác bước ra, vừa nhận kiếm vừa nhìn bạn một lần ngắn. Bạn không biết ánh nhìn ấy là biết ơn hay thương hại. Khi buổi lễ kết thúc, bạn thấy một chỗ trống trong lòng mình không biết đặt tên.',
        'Someone else steps out, receiving the sword while giving you one short glance. You do not know whether that look was gratitude or pity. When the ceremony ends you feel an empty place within you that you cannot name.',
        { sanity: -4, rep: -2 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [28, 90], weight: 10 }),

  fe('pinky_hidden_member', 'Pinky', [0, 3],
    '[Người cùng hội mà bạn không biết] Bạn làm một việc nhỏ trong một Syndicate khác, và một người lạ trong đó nhìn bạn một lần thật ngắn, rồi làm một cử chỉ mà chỉ thành viên của The Pinky mới nhận ra. Họ không nói gì, và bạn không nói gì. Hai người ngồi cạnh nhau suốt buổi, như những người xa lạ, biết rằng mỗi bên đang ở đó vì một lý do không phải của nơi này.',
    '[A fellow member you did not know] You do a small job inside another Syndicate, and a stranger there looks at you once, very briefly, then makes a gesture only a member of the Pinky would recognize. They say nothing and you say nothing. The two of you sit side by side all evening like strangers, each knowing the other is here for a reason that is not this place’s.',
    [
      fc('Giữ im lặng và làm như không nhận ra', 'Stay silent and behave as if you did not recognize them',
        'Cuộc gặp kết thúc mà không ai trao đổi gì. Nhưng khi bạn ra về, bạn thấy trên bàn có một đồng xu bị lật ngửa, đúng chỗ người ấy ngồi.',
        'The meeting ends and no word is exchanged. But as you leave you see on the table a coin flipped face up exactly where the person sat.',
        { sanity: -2, rep: 3, network: 3 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Đáp lại bằng cùng một cử chỉ', 'Answer with the same gesture', [
        [50, 'Người lạ gật đầu rất nhẹ, và vài ngày sau một phong bì nhỏ đến nhà bạn, không tên, chỉ có một địa chỉ. Bạn biết mình đã được ghi nhận, và cũng biết mình vừa lộ ra một điều không nên lộ.', 'The stranger nods very faintly, and a few days later a small envelope arrives at your home, unnamed, bearing only an address. You know you have been noted, and also that you just revealed something you should not have.', { rep: 5, sanity: -4, network: 5, heat: 4 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Người lạ giữ nét mặt trống rỗng, và bạn nhận ra mình đã nhầm. Bạn bị nhìn bằng một ánh mắt khó chịu, và bắt đầu tự hỏi ai khác đã thấy cử chỉ của mình.', 'The stranger keeps a blank face, and you realize you were mistaken. You are regarded with discomfort, and begin to wonder who else saw your gesture.', { rep: -5, sanity: -6, heat: 5 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Rời đi sớm, nói bạn có việc gấp', 'Leave early, saying you have urgent business',
        'Bạn ra khỏi cửa và đi nhanh, không ngoái lại. Cả tuần sau bạn nghĩ đến người ấy, và nhận ra mình không còn chắc ai trong số những người bạn quen thật sự là họ.',
        'You go out the door and walk fast without looking back. All the following week you think of that person and realize you are no longer sure who among those you know truly is who they say.',
        { sanity: -5, rep: -2 }, { flagsAdd: ['pinky_bent_word'] })
    ], { weight: 10 }),

  fe('pinky_gather_call', 'Pinky', [1, 3],
    '[Tiếng gọi để tụ họp] Không có lệnh nào được gửi, không có ai hô hào. Chỉ có một dấu hiệu nhỏ: ba lần chuông chiều, một vòng phấn đỏ trên tường một con hẻm, và một chiếc áo choàng treo ở cửa tháp. Điều kiện đã đủ. Các thành viên của The Pinky, đang ẩn mình khắp thành phố, bắt đầu đến từng người một, và không ai nhìn nhau.',
    '[The gathering call] No order is sent, no one shouts. Only a small sign: three evening bell strokes, a red chalk circle on the wall of an alley, and a cloak hung at the tower door. The conditions are met. The Pinky’s members, hiding across the city, begin to arrive one by one, and no one looks at another.',
    [
      fc('Đến tháp theo tiếng gọi và ngồi vào chỗ không ai ngồi', 'Go to the tower at the call and take the seat nobody sits in',
        'Phòng họp đầy người im lặng. Không ai nói tên, không ai nói việc. Bạn ngồi trong bóng tối của một cái cột, nghe một giọng nói rất thấp đặt ra một câu hỏi, và nhận ra mọi người đang nghe cùng một thứ. Khi cuộc họp tan, mỗi người rời theo một cửa khác nhau.',
        'The meeting room fills with silent people. No one gives a name, no one a task. You sit in the shadow of a pillar, hear a very low voice pose a question, and realize everyone is listening to the same thing. When it disperses each leaves by a different door.',
        { rep: 7, sanity: -3, network: 5 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Đến muộn, và chỉ đứng ngoài cửa', 'Come late and stand only at the door', [
        [50, 'Bạn thấy ánh sáng nến dưới khe cửa, nghe tiếng thì thầm. Rồi cánh cửa mở ra và người đầu tiên đi ra nhìn bạn một lần rất lâu. Họ không nói gì, và bạn không hỏi, và cả hai biết bạn đã bỏ lỡ điều quan trọng.', 'You see candlelight under the door and hear whispers. Then the door opens and the first out looks at you a very long time. They say nothing, you ask nothing, and both know you missed something important.', { rep: -4, sanity: -4 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Cuộc họp vừa tan, và cả phòng vắng. Chỉ còn một ngọn nến và một cái ghế. Bạn ngồi xuống, và nhận ra có ai đó đã để lại một lời nhắn dưới ghế: lần sau, đừng muộn.', 'The meeting has just dispersed and the whole room is empty. Only a candle and a chair remain. You sit down and notice someone left a message under the chair: next time, do not be late.', { rep: -2, sanity: -3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Không đến, nói bạn không nhận ra dấu hiệu', 'Do not go, saying you did not recognize the sign',
        'Không ai hỏi vì sao. Nhưng vài ngày sau, bạn thấy một vòng phấn đỏ nhỏ trên cánh cửa nhà bạn, và nhận ra mình đang bị nhớ.',
        'No one asks why. But a few days later you see a small red chalk circle on your own door and realize you are being remembered.',
        { sanity: -7, rep: -5, heat: 3 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [26, 90] }),

  fe('pinky_wrong_blade', 'Pinky', [0, 3],
    '[Dùng nhầm kiếm của người khác] Giữa một trận ẩu đả bất ngờ, thanh kiếm của bạn gãy, và người ngã xuống cạnh bạn là một thành viên của The Pinky với thanh kiếm sao còn nguyên trong tay. Theo lệ, mỗi người chỉ được dùng thanh kiếm đã chọn, và dùng của người khác là điềm xấu. Nhưng kẻ địch đang chạy tới.',
    '[Using someone else’s blade] In the middle of a sudden brawl your sword breaks, and the one who falls beside you is a member of the Pinky with a star-forged sword still in hand. By custom each uses only their appointed blade, and using another’s is an ill omen. But the enemy is rushing at you.',
    [
      fc('Cầm kiếm của người ngã xuống và chiến đấu', 'Take the fallen one’s sword and fight',
        'Bạn thắng, và thanh kiếm sao chém như nó biết đường. Sau trận, bạn không dám trả lại ngay, và người ngã xuống không còn thở. Bạn phải quyết định làm gì với điềm xấu trong tay.',
        'You win, and the star-forged blade cuts as if knowing the way. After the fight you dare not return it at once, and the fallen one no longer breathes. You must decide what to do with the ill omen in your hands.',
        { health: -8, rep: 4, sanity: -6, network: 2 }, { flagsAdd: ['pinky_bent_word'] }),
      fg('Chiến đấu tay không, giữ lời lệ', 'Fight bare-handed, keeping custom', [
        [50, 'Bạn thoát với vài vết thương nhẹ, và một Pinky từ đầu hẻm bên kia nhìn thấy tất cả. Người ấy không nói gì, nhưng gật đầu với bạn rất nhẹ trước khi biến mất.', 'You escape with a few light wounds, and a Pinky at the alley’s far end sees it all. They say nothing but nod at you faintly before vanishing.', { health: -14, rep: 6, sanity: 3, network: 3 }, { flagsAdd: ['pinky_kept_word'] }],
        [50, 'Bạn bị đánh nặng, và người ngã xuống chết thêm một lần nữa trong tay kẻ địch. Bạn sống sót, nhưng nhiều tuần sau vẫn nghĩ rằng một lời lệ không đáng một mạng.', 'You are beaten badly, and the fallen one is killed once more by the enemy. You survive, but for weeks after still think that no custom is worth a life.', { health: -22, sanity: -9, rep: -2 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Chạy khỏi trận, bỏ lại người ngã xuống', 'Flee the fight and leave the fallen one behind',
        'Bạn thoát, và ngoái nhìn một lần ở góc phố. Thanh kiếm sao nằm trên mặt đường, còn nguyên, và không ai đến nhặt trong lúc bạn nhìn. Bạn không quay lại, và đó là điều bạn mang theo suốt nhiều năm.',
        'You escape and glance back once at the corner. The star-forged blade lies on the road, intact, and no one comes to pick it up while you look.',
        { sanity: -9, rep: -4, health: -3 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [20, 90] })
];

export const FINGER_CANON_MINORS = [
  M('m_thumb_bayonet_drill', AGE.GROWN, fneed('Thumb', 0), '[Buổi tập lưỡi lê] Capo bắt cả tổ tập đánh bằng báng súng và lưỡi lê suốt một chiều. Ông nói đạn đắt hơn mạng của một Soldato, và vì thế một Soldato giỏi là người biết khi nào không cần bắn. Bạn đánh trúng nhiều hơn dự đoán, và Capo ghi nhận.', '[Bayonet drill] The Capo makes the whole team drill with rifle butts and bayonets all afternoon. He says bullets cost more than a Soldato’s life, and so a good Soldato knows when not to shoot. You land more hits than expected, and the Capo notes it.', [C('Tập hết sức, không than phiền', 'Drill hard without complaint', 'Cánh tay bạn đau suốt hai ngày, nhưng ánh mắt Capo dừng ở bạn lâu hơn ở người khác.', 'Your arms ache two days, but the Capo’s gaze stays on you longer than on others.', { health: -2, rep: 3 }), C('Xin ít nhất một buổi tập bắn thật', 'Ask for at least one session of live firing', 'Capo cười và nói bạn nên học cách quý đạn. Bạn bị giao thêm một ca dọn kho, và nhận ra câu hỏi ấy cũng có giá của nó.', 'The Capo laughs and says you should learn to treasure bullets. You are assigned an extra shift cleaning the store and realize that question had its price.', { rep: -1, sanity: -1 })], I('Bạn chịu đựng buổi tập và về nhà.', 'You endure the drill and go home.'), { theme: 'work' }),
  M('m_thumb_pin_count', AGE.GROWN, fneed('Thumb', 0), '[Đếm ghim trên cổ áo] Trên tàu điện, một Soldato lạ liếc cổ áo bạn, đếm ghim và mũi tên, rồi đổi cách đứng một chút.', '[Counting the pins] On the tram, an unfamiliar Soldato glances at your collar, counts pins and arrows, and shifts his stance slightly.', [C('Gật đầu nhẹ và ngồi xuống', 'Nod lightly and sit', 'Anh ta không nhìn thẳng bạn, nhưng đứng thẳng hơn một chút. Cả toa tàu tiếp tục như không có gì, và bạn thấy lòng hơi nặng.', 'He does not look straight at you but stands a little straighter. The whole carriage goes on as if nothing happened, and you feel a mild weight.', { rep: 2, sanity: -1 }), C('Mời anh ta ngồi', 'Invite him to sit', 'Anh ta bối rối, rồi từ chối rất lịch sự. Cả hai đều đứng đến ga cuối, không ai nói gì.', 'He is flustered then declines very politely. Both stand to the terminus, neither speaking.', { sanity: 1, network: 2 })], I('Bạn đứng nhìn ra cửa sổ.', 'You stand looking out the window.'), { theme: 'work' }),
  M('m_index_familia_roll', AGE.GROWN, fneed('Index', 0), '[Điểm danh familia] Mỗi sáng nhóm năm sáu Proselyte dưới một Proxy xếp hàng, mắt bịt kín, và đọc tên nhau mà không thấy mặt. Hôm nay có một chỗ trống ở giữa hàng, và tiếng gọi tên đi qua nó mà không ai nhắc.', '[Roll call of the familia] Each morning the five or six Proselytes under a Proxy line up, eyes bound, and recite each other’s names without seeing faces. Today there is a gap in the middle of the row, and the call passes over it without anyone remarking.', [C('Gọi tên người vắng, rất khẽ', 'Say the absent name very softly', 'Proxy nghe thấy và không ngăn. Cả hàng lặng đi một nhịp, và từ ngày ấy mỗi sáng bạn gọi một cái tên nữa.', 'The Proxy hears and does not stop you. The whole row is silent a beat, and from that day each morning you call one more name.', { sanity: 3, network: 3, rep: -1 }), C('Đọc tiếp, như mọi người', 'Read on like everyone else', 'Hàng điểm danh kết thúc đúng giờ.', 'The roll ends on time.', { sanity: -2, rep: 1 })], I('Bạn đứng thẳng và chờ đến lượt.', 'You stand straight and await your turn.'), { theme: 'work' }),
  M('m_index_pizza_prescript', AGE.GROWN, fneed('Index', 0), '[Prescript về một hộp pizza] Prescript hôm nay: giao một hộp pizza nóng đến một địa chỉ ở District 7 trước 8 giờ tối. Không ghi người nhận, không ghi lý do. Bạn mua nó ở tiệm gần nhất, và suốt đường đi hộp pizza nóng lên tay bạn, một cách quá bình thường.', '[A pizza Prescript] Today’s Prescript: deliver a hot box of pizza to an address in District 7 before eight in the evening. No recipient named, no reason given. You buy it at the nearest shop, and all the way the box warms your hands, in a way far too ordinary.', [C('Giao tận tay người mở cửa', 'Hand it to whoever opens the door', 'Một bà lão mở cửa, nhìn hộp pizza, và bật cười. Bà nói đã ba mươi năm không ai mang cho bà món này, và mời bạn vào ăn cùng. Bạn từ chối, nhưng nhớ nụ cười ấy lâu.', 'An old woman opens the door, looks at the box, and bursts into laughter. She says no one has brought her this in thirty years and invites you in to share. You decline but remember that laugh long.', { sanity: 4, rep: 3, network: 3 }), C('Đặt hộp trước cửa, gõ rồi đi', 'Set the box at the door, knock and leave', 'Bạn nấp ở góc hẻm, và thấy cửa mở. Một đứa trẻ nhìn hộp pizza, rồi nhìn quanh, và mang nó vào. Cánh cửa đóng lại, và bạn thấy lòng nhẹ như vừa làm một việc không biết là gì.', 'You hide at the alley corner and see the door open. A child looks at the box a long while, then around, and carries it in. The door closes, and you feel light as if you had done something unnamed.', { sanity: 3, rep: 2 })], I('Bạn nhìn hộp pizza và nghĩ nó thật tầm thường.', 'You look at the pizza box and think it so mundane.'), { theme: 'work' }),
  M('m_middle_gold_chain_polish', AGE.GROWN, fneed('Middle', 0), '[Đánh bóng xích vàng] Sợi xích vàng quanh cánh tay bạn xỉn đi sau một mùa. Một Big Sibling dạy bạn cách đánh bóng bằng vải len và một chút nước chanh, và nói mỗi sợi xích là một lời hứa mà người ta đã giữ cho nhau.', '[Polishing the gold chain] The gold chain around your forearm dulls after a season. A Big Sibling shows you how to polish it with wool cloth and a little lemon juice, and says each chain is a promise people have kept to one another.', [C('Đánh bóng cả sợi xích của người ngồi cạnh', 'Polish the neighbor’s chain too', 'Người ngồi cạnh nhìn sợi xích sáng lên,, nhưng tối hôm đó họ để lại trước cửa bạn một túi quýt.', 'The neighbor looks at their brightened chain, but that evening leaves a bag of tangerines at your door.', { sanity: 3, network: 5 }), C('Chỉ đánh bóng của mình', 'Polish only your own', 'Sợi xích sáng lên dưới ánh đèn. Bạn nhìn nó lâu, và nhớ ra từng người đã trao nó cho bạn.', 'The chain brightens under the lamp. You look at it long and recall each person who passed it to you.', { sanity: 2, rep: 1 })], I('Bạn lau qua loa rồi đeo lại.', 'You wipe it carelessly and put it back on.'), { theme: 'work' }),
  M('m_middle_district_clause', AGE.GROWN, fneed('Middle', 1), '[Điều khoản theo District] Một Little Sibling hỏi bạn vì sao hình phạt cho cùng một tội lại khác nhau giữa hai District. Bạn mở Book và thấy các điều khoản chung cho mọi cuốn nhưng được chia theo từng nơi, và một số đã bị viết thêm bằng nét chữ khác nhau qua nhiều năm.', '[Clauses by District] A Little Sibling asks why the punishment for the same offense differs between two Districts. You open the Book and see that clauses are shared across every copy but divided by place, and some were added in different hands over many years.', [C('Cùng cậu ấy đọc từng điều khoản', 'Read each clause together', 'Hai người ngồi đến khuya. Bạn nhận ra một số hình phạt nặng hơn tội, và không ai dám đổi. Cậu ấy hỏi vì sao, và bạn không có câu trả lời.', 'The two of you sit late. You realize some punishments outweigh the offense and no one dares change them. They ask why, and you have no answer.', { sanity: -3, network: 4 }), C('Bảo cậu ấy cứ theo điều khoản của District mình', 'Tell them to follow their own District’s clause', 'Cậu ấy cúi đầu, và đi. Nhưng bạn thấy cậu ấy còn quay lại nhìn cuốn Book thêm một lần, hồi lâu.', 'They nod and go. But you see them look back at the Book once more, very long.', { sanity: -1, rep: 1 })], I('Bạn nói hỏi Big Sibling.', 'You tell them to ask the Big Sibling.'), { theme: 'work' }),
  M('m_ring_coil_count', AGE.GROWN, fneed('Ring', 0), '[Số vòng trên chiếc nhẫn] Chiếc nhẫn trên tay trái bạn có một vòng xoắn, và bạn nhận ra mình đã nhìn nó nhiều hơn nhìn tác phẩm của mình. Một Docent đi ngang, và bàn tay của bà có hai vòng. Bà thấy bạn nhìn, và nói không ai ở đây không đếm.', '[Counting the coils] The ring on your left hand has a single coil, and you realize you have looked at it more than at your own work. A Docent passes, and her hand bears two coils. She sees you looking and says there is no one here who does not count.', [C('Hỏi bà đã mất bao lâu để có vòng thứ hai', 'Ask how long it took her to earn the second coil', 'Bà kể rằng mất bảy năm và bốn tác phẩm bị bỏ. Bà nói điều khó nhất không phải làm tác phẩm đủ tốt mà là chấp nhận rằng cái tốt cũng có thể bị từ chối.', 'She says it took seven years and four abandoned works. She says the hardest part was not making a work good enough but accepting that good too can be refused.', { sanity: 2, network: 4 }), C('Giấu tay trong túi', 'Hide your hand in your pocket', 'Bà mỉm cười như đã hiểu. Cả ngày bạn thấy chiếc nhẫn như nóng lên mỗi khi nghĩ đến nó.', 'She smiles as if understanding. All day the ring seems to warm each time you think of it.', { sanity: -2 })], I('Bạn xoay chiếc nhẫn một vòng rồi bỏ tay xuống.', 'You turn the ring once and lower your hand.'), { theme: 'work' }),
  M('m_ring_white_stain', AGE.GROWN, fneed('Ring', 0), '[Vết bẩn trên áo trắng] Áo trắng của bạn có một vệt sơn đỏ lớn sau buổi làm việc. Ở Ring người ta mặc trắng để vết bẩn nói lên quá trình làm việc. Một Maestro đi qua nhìn vết ấy một lúc, rồi nói đó là vết bẩn thành thật nhất mà ông thấy trong tháng.', '[A stain on the white coat] Your white coat bears a large red paint stain after work. In the Ring people wear white so stains tell the story of the work. A Maestro passes, looks at the stain some time, then says it is the most honest stain he has seen this month.', [C('Không giặt chiếc áo ấy', 'Do not wash that coat', 'Vết đỏ khô lại thành màu nâu sẫm. Mỗi lần bạn mặc nó, bạn thấy người ta nhìn lâu hơn, và một vài người gật đầu rất nhẹ.', 'The red dries to dark brown. Each time you wear it people look longer, and a few nod very slightly.', { rep: 3, sanity: 2 }), C('Giặt sạch, bắt đầu lại', 'Wash it clean and start again', 'Áo trắng lại như mới. Nhưng trong buổi làm việc tiếp theo, bạn cẩn thận đến nỗi tác phẩm trông thiếu một điều gì đó.', 'The white is new again. But in the next session you work so carefully the piece seems to lack something.', { sanity: -2, rep: -1 })], I('Bạn phủi áo và quay lại bàn.', 'You brush the coat and return to the desk.'), { theme: 'work' }),
  M('m_pinky_unknown_fellow', AGE.GROWN, fneed('Pinky', 0), '[Đồng hội không rõ mặt] Một người bán hàng quen ngoài chợ bắt đầu để dành cho bạn một món hàng nhỏ mỗi tuần mà không lấy tiền. Bạn nhận ra họ cũng có cùng cách đứng thẳng, cùng cách nhìn lối thoát trước khi nhìn người. Bạn không hỏi, và họ cũng không nói.', '[A fellow of unknown face] A familiar vendor at the market begins setting aside a small item for you each week without charge. You notice they share your stance, the same habit of checking exits before faces.', [C('Nhận và đáp lại bằng một món nhỏ', 'Accept and return a small item in kind', 'Hai bên trao nhau những thứ nhỏ trong im lặng. Một ngày họ không còn đứng ở sạp, và sạp bị người khác thuê. Bạn không bao giờ biết điều gì xảy ra.', 'You exchange small items in silence. One day they no longer stand at the stall and another rents it. You never learn what happened.', { sanity: 2, network: 4 }), C('Từ chối nhẹ nhàng', 'Decline gently', 'Họ gật đầu, và tuần sau ngừng để dành. Bạn thấy lòng nhẹ đi, và cũng thấy mình đã bỏ lỡ một điều.', 'They nod, and next week stop setting aside. You feel lighter, and also that you missed something.', { sanity: 1, network: -2 })], I('Bạn mua đồ khác ở sạp bên cạnh.', 'You buy elsewhere at the next stall.'), { theme: 'work' }),
  M('m_pinky_marsh_tale', AGE.GROWN, fneed('Pinky', 1), '[Chuyện bên đầm lầy] Một Pinky già kể cho cả tổ một chuyện xưa về một nhóm người hảo hán sống bên đầm, mỗi người mang một danh hiệu sao và một thanh kiếm riêng. Ông nói chuyện ấy chưa bao giờ chép thành sách, vì người nào biết nó thì đã sống nó.', '[A tale from the marsh] An elder Pinky tells the whole team an old story of outlaws living beside a marsh, each bearing a star title and a sword of their own. He says it was never written in a book, because whoever knows it has lived it.', [C('Hỏi ông chuyện ấy kết thúc ra sao', 'Ask how the story ends', 'Ông mỉm cười và nói nó chưa kết thúc, vì vẫn còn ghế sao bỏ trống. Bạn nhìn ông rất lâu, và không biết ông đang kể chuyện hay đang kể về mình.', 'He smiles and says it has not ended, for star seats remain vacant. You look at him very long, unsure whether he tells a tale or speaks of himself.', { sanity: 2, rep: 2, network: 3 }), C('Ngồi nghe, không hỏi gì', 'Sit listening and ask nothing', 'Ông kể đến khuya. Khi ngọn nến tàn, mọi người rời đi mỗi người một ngả, và không ai nhắc lại chuyện ấy.', 'He tells until late. When the candle dies everyone leaves in different directions, and no one mentions the tale again.', { sanity: 3 })], I('Bạn nghe một lúc rồi về phòng.', 'You listen a while then go to your room.'), { theme: 'work' })
];

export const FINGER_CANON_DAILIES = [
  D('d_thumb_badge_arrows', AGE.GROWN, fneed('Thumb', 0), 'Bạn đếm mũi tên trên huy hiệu của người đối diện trước khi đếm lời họ nói. Thói quen ấy đến từ lúc nào, bạn không còn nhớ, nhưng nó đã trở thành một cách nghe.', 'You count the arrows on the badge of the one before you before counting their words. When that habit began you no longer recall, but it has become a way of listening.', {}),
  D('d_thumb_no_eye_contact', AGE.GROWN, fneed('Thumb', 0), 'Bạn nhìn vào cà vạt của cấp trên, không nhìn vào mắt. Cả buổi họp bạn nói chuyện với một chiếc cà vạt đỏ, và nhận ra nó là người nghe tốt nhất ở đây.', 'You look at your superior’s tie, not their eyes. All through the meeting you speak to a red tie and realize it is the best listener here.', {}),
  D('d_index_blindfold_fabric', AGE.GROWN, fneed('Index', 0), 'Một mảnh vải mới được khâu vào áo choàng trắng của một Proselyte cùng nhóm, nhỏ như đầu ngón tay. Không ai nói đó là gì, nhưng cả nhóm nhìn nó một lúc, rồi nhìn đi.', 'A new scrap of fabric is stitched onto a fellow Proselyte’s white cloak, small as a fingertip. No one says what it is, but the whole group looks at it a moment, then away.', {}),
  D('d_index_aconite', AGE.GROWN, fneed('Index', 0), 'Một bông hoa tím nhỏ nằm trên bệ cửa văn phòng bạn, mà không ai nhớ ai đặt. Người ta nói đó là hoa phụ tử, có độc, và không ai trong tòa nhà dám vứt nó đi.', 'A small purple flower lies on your office windowsill and no one recalls who placed it. They say it is aconite, poisonous, and no one in the building dares throw it away.', {}),
  D('d_middle_purple_shirt', AGE.GROWN, fneed('Middle', 0), 'Một Little Sibling mặc chiếc áo sơ mi màu tím chói đến tận cổ, và cả tổ nhìn nó một lúc rồi không ai nói gì.', 'A Little Sibling arrives in a violently purple shirt buttoned to the neck, and the whole team looks at it a moment.', {}),
  D('d_middle_chain_clink', AGE.GROWN, fneed('Middle', 0), 'Tiếng xích vàng chạm nhau trên cánh tay của một Big Sibling khi ông đi qua hành lang.', 'The sound of gold chains clinking on a Big Sibling’s arm as they pass in the corridor.', {}),
  D('d_ring_left_hand_ring', AGE.GROWN, fneed('Ring', 0), 'Chiếc nhẫn trên tay trái bạn bị sơn dính, và bạn không muốn lau, vì mỗi lớp sơn là một ngày làm việc. Đến cuối tháng, vòng xoắn gần như biến mất dưới màu.', 'The ring on your left hand collects paint and you do not wish to clean it, since each layer is a day’s work. By month’s end the coil nearly vanishes beneath the color.', {}),
  D('d_ring_white_coat', AGE.GROWN, fneed('Ring', 0), 'Cả Atelier mặc áo trắng, và đến cuối ngày mỗi người mang một bản đồ riêng của những vết bẩn. Bạn nhìn lưng áo người ngồi trước, và đọc được cả buổi sáng của họ.', 'The whole Atelier wears white, and by day’s end each carries a private map of stains. You look at the back of the coat of the person ahead and read their whole morning.', {}),
  D('d_pinky_star_forged_hum', AGE.GROWN, fneed('Pinky', 0), 'Thanh kiếm sao của bạn ngân rất khẽ khi có ai khác mang một thanh cùng chất liệu đi ngang. Bạn nghe, và ngẩng lên, nhưng người ấy đã biến mất vào đám đông, mặt không có gì lạ.', 'Your star-forged blade hums faintly when someone else carrying a sword of the same make passes. You listen and look up, but they have vanished into the crowd, their face unremarkable.', {}),
  D('d_pinky_no_signal', AGE.GROWN, fneed('Pinky', 0), 'Cả tuần không có dấu hiệu nào, không có tiếng chuông, không vòng phấn đỏ.', 'A whole week passes with no sign, no bell, no red chalk circle.', {})
];
