// The Thumb, second set of missions: Sunday counts, borrowed drivers, the quiet end of a tribute round,
// and the weeks around an Underboss's death. Spread over every rank so none of them is thin.

import { fe, fc, fg } from './fingerKit.js';

const T = 'Thumb';
const mission = (id, rank, vi, en, choices, weight = 9) => ({ ...fe(id, T, rank, vi, en, choices, { weight }), mission: true });

export const THUMB_DEPTH = [
  mission('thumb_sunday_count', [0, 1],
    '[Buổi điểm danh Chủ nhật] Mỗi Chủ nhật, Capo đếm đầu người ở quán cà phê của The Thumb. Hôm nay thiếu một Soldato, người duy nhất chưa bao giờ trễ. Capo không hỏi gì. Ông chỉ nhìn bạn và chờ.',
    '[Sunday count] Every Sunday your Capo counts heads at the Thumb’s coffee house. Today one Soldato is missing, the only one who has never been late. The Capo asks nothing. He only looks at you and waits.',
    [
      fc('Nói người ấy đang ốm và xin đi xem', 'Say the Soldato is ill and ask to go and see',
        'Capo gật đầu mà không nói gì. Bạn tìm thấy người ấy trên giường, sốt cao, và gọi bác sĩ của Thumb trước khi quay lại báo cáo.', 'The Capo nods without a word. You find the Soldato in bed with a high fever and call the Thumb’s doctor before reporting back.', { rep: 4, network: 3, sanity: -2 }, { meritAdd: 3 }),
      fc('Giữ im lặng, tìm người ấy sau buổi họp', 'Stay silent and find the Soldato after the meeting',
        'Bạn tìm được họ ở một quán rượu, đang ngồi trước một ly chưa động đến. Họ không nói vì sao. Bạn cũng không hỏi, và dắt họ về trước khi Capo kịp ghi tên.', 'You find them in a bar, sitting before an untouched glass. They do not say why. You do not ask, and walk them back before the Capo can write the name.', { network: 6, sanity: -3, rep: 2 }),
      fg('Nói thẳng chỗ bạn đoán người ấy đang ở', 'Say outright where you guess the Soldato is', [
        [55, 'Bạn đoán đúng. Capo cử người đến đón và không ai bị phạt. Ông ghi nhận rằng bạn biết đồng đội mình ở đâu.', 'You guess right. The Capo sends someone to fetch them and no one is punished. He notes that you know where your comrades are.', { rep: 6, network: 4 }],
        [45, 'Bạn đoán sai, và chỗ bạn nói là nhà của một người không muốn bị nhắc tên. Capo cắt nhẹ phần của bạn tháng này.', 'You guess wrong, and the place you named belongs to someone who does not want to be mentioned. The Capo trims your share lightly this month.', { rep: -3, wealth: -6 }]
      ])
    ]),

  mission('thumb_new_boots', [0, 1],
    '[Đôi giày mới] Một Soldato trẻ mang đôi giày da mới đến buổi họp. Giày đắt hơn lương ba tháng. Capo nhìn xuống chân người ấy rất lâu mà chưa nói gì. Cả phòng chờ bạn mở miệng trước.',
    '[The new boots] A young Soldato arrives at the meeting in new leather boots, worth more than three months’ pay. The Capo looks at their feet for a long time and says nothing. The whole room waits for you to speak first.',
    [
      fc('Hỏi thẳng đôi giày từ đâu mà có', 'Ask outright where the boots came from',
        'Người trẻ đỏ mặt và nói đó là quà của bà ngoại. Căn phòng bật cười, và Capo cho qua. Không ai biết bà ngoại ấy có thật không.', 'The young one flushes and says they were a gift from a grandmother. The room laughs and the Capo lets it pass. No one knows whether the grandmother exists.', { rep: 3, sanity: 2 }),
      fc('Khen đôi giày trước mặt cả hội', 'Praise the boots before the whole crew',
        'Người trẻ ngẩng cao đầu. Capo nhìn bạn một thoáng rồi thôi, và tối đó ghi một dòng vào sổ về cả hai người.', 'The young one lifts their head high. The Capo glances at you, then lets it go, and that evening writes one line in the book about both of you.', { network: 5, rep: -2 }),
      fc('Kéo người ấy ra riêng sau buổi họp', 'Pull the young one aside after the meeting',
        'Hóa ra họ giữ tiền hộ một người đã mất. Bạn khuyên họ trả lại trước khi ai khác hỏi, và họ trả. Bạn chưa bao giờ biết ai đã mất.', 'It turns out they hold money for someone dead. You advise them to return it before anyone else asks, and they do. You never learn who died.', { sanity: -3, network: 4, rep: 4 }, { meritAdd: 3 })
    ], 8),

  mission('thumb_borrowed_driver', [1, 2],
    '[Tài xế mượn] Một Fixer của Office hợp tác mượn tài xế của bạn đi đón một vị khách. Tài xế về muộn, tóc ướt mưa, nói không nhớ đã chở ai. Chiếc xe có thêm một lỗ đạn sau cốp.',
    '[The borrowed driver] A Fixer from an allied Office borrows your driver to pick up a guest. The driver returns late, hair wet with rain, saying they cannot remember whom they drove. The car has a new bullet hole in the trunk.',
    [
      fc('Hỏi Fixer ấy thẳng mặt và đòi phí sửa xe', 'Confront the Fixer and demand the repair fee',
        'Fixer ấy trả gấp đôi mà không cãi, và dặn đừng hỏi tài xế nữa. Bạn nhận tiền và không hỏi, nhưng nhớ cái dặn ấy.', 'The Fixer pays double without argument and asks you not to question the driver again. You take the money and do not ask, but you remember the request.', { wealth: 14, sanity: -3, network: 3 }),
      fc('Tự mở cốp xe lúc nửa đêm', 'Open the trunk yourself at midnight',
        'Trong cốp có một chiếc giày nhỏ. Bạn đặt nó lại và đóng nắp. Sáng hôm sau chiếc xe được đem đi sơn lại, và bạn là người ký giấy.', 'In the trunk lies one small shoe. You put it back and close the lid. The next morning the car is sent for repainting, and you are the one who signs the slip.', { sanity: -8, rep: 3 }),
      fg('Báo Capo và để ông quyết', 'Report to the Capo and let him decide', [
        [60, 'Capo hỏi vài câu rồi mỉm cười. Ông biết Fixer ấy là ai, và món nợ nhỏ này giúp ông giữ họ thêm một mùa.', 'The Capo asks a few questions, then smiles. He knows who the Fixer is, and this small debt helps him hold them another season.', { rep: 7, network: 5 }],
        [40, 'Capo cho rằng bạn nhìn quá kỹ chuyện của người khác. Ông chuyển tài xế đi và cho bạn nghỉ một tuần.', 'The Capo decides you look too closely at other people’s business. He moves the driver away and gives you a week off.', { rep: -4, sanity: 3, wealth: -5 }]
      ])
    ]),

  mission('thumb_shared_cigar', [1, 2],
    '[Điếu xì gà của Sottocapo] Sottocapo mời bạn một điếu xì gà và hỏi về cuộc sống ngoài hội. Đó là một lời mời hiếm, và mọi câu trả lời đều sẽ được nhớ. Phía sau ông, một người của đối thủ đứng chờ.',
    '[The Sottocapo’s cigar] The Sottocapo offers you a cigar and asks about your life outside the crew. It is a rare invitation, and every answer will be remembered. Behind him a rival’s man stands waiting.',
    [
      fc('Kể đúng sự thật, kể cả phần không đẹp', 'Tell the truth, including the unflattering parts',
        'Sottocapo nghe hết và không ngắt lời. Khi bạn dừng, ông nói: "Ta thích người không biết nói dối khéo." Người của đối thủ cúi đầu rút lui.', 'The Sottocapo listens through and does not interrupt. When you stop he says: “I like those who lie badly.” The rival’s man bows and withdraws.', { rep: 6, network: 6, sanity: -3 }, { meritAdd: 4 }),
      fc('Kể một câu chuyện đẹp hơn thực tế', 'Tell a story better than the facts',
        'Sottocapo gật đầu và rót thêm rượu. Cả hai đều biết đó là chuyện bịa. Chuyện bịa đúng lễ nghi cũng là một cách trả lời.', 'The Sottocapo nods and pours more wine. Both know it is invented. An invention told with proper form is also a way of answering.', { rep: 3, network: 4, wealth: 6 }),
      fc('Từ chối điếu xì gà và nói bạn không hút', 'Decline the cigar and say you do not smoke',
        'Căn phòng im đi một nhịp. Rồi Sottocapo cười khẽ và cất điếu xì gà vào túi áo. Người của đối thủ ghi nhận rằng bạn không nhận quà ngay cả từ ông.', 'The room goes quiet a beat. Then the Sottocapo chuckles and puts the cigar in his pocket. The rival’s man notes that you do not take gifts even from him.', { rep: 4, network: -3, sanity: 3 })
    ], 8),

  mission('thumb_armory_inventory', [2, 3],
    '[Kiểm kho cuối năm] Sổ kho của cả hội phải được một Sottocapo trở lên ký. Bạn phát hiện ba mươi khẩu súng được ghi là đã nấu chảy, nhưng số seri của chúng vẫn xuất hiện trên chợ đen.',
    '[The year-end inventory] The whole crew’s armory ledger must be signed by a Sottocapo or higher. You find thirty guns recorded as melted down whose serial numbers still appear on the black market.',
    [
      fc('Ký và để vụ ấy chìm đi', 'Sign and let the matter sink',
        'Bạn ký vào trang cuối. Tuần sau ba khẩu súng ấy xuất hiện trong một vụ ở bến. Không ai hỏi bạn đã ký gì, và đó là điều tệ nhất.', 'You sign the last page. A week later three of those guns turn up in a shooting at the dock. No one asks what you signed, and that is the worst part.', { wealth: 10, rep: -4, sanity: -8 }),
      fc('Đối chiếu từng số seri và báo cho Underboss', 'Cross-check each serial number and report to the Underboss',
        'Underboss đọc báo cáo của bạn suốt buổi tối. Sáng hôm sau ba người giữ kho biến mất. Ông gật đầu với bạn trên hành lang và không nói gì.', 'The Underboss reads your report through the evening. The next morning three storekeepers vanish. He nods to you in the corridor and says nothing.', { rep: 9, network: 6, sanity: -6 }, { meritAdd: 5 }),
      fg('Tự đi gặp người mua và chuộc lại những khẩu súng', 'Meet the buyers yourself and buy the guns back', [
        [55, 'Người mua trả lại hai mươi khẩu mà không cãi. Bạn ghi cả hai mươi vào sổ và gạch khỏi danh sách. Ba mươi khẩu thành mười.', 'The buyers return twenty without arguing. You enter all twenty in the ledger and strike them from the list. Thirty becomes ten.', { rep: 8, wealth: -14, network: 4 }],
        [45, 'Người mua cười và nói giá đã tăng gấp đôi. Bạn rời đi với mười khẩu và một lời đe dọa chưa được nói ra.', 'The buyers laugh and say the price has doubled. You leave with ten guns and a threat not yet spoken.', { wealth: -18, health: -6, rep: -2 }]
      ])
    ], 10),

  mission('thumb_orphan_tithe', [2, 3],
    '[Khoản cho trại mồ côi] The Thumb nuôi một trại mồ côi nhiều năm mà không ghi vào sổ nào. Năm nay quỹ thiếu và Underboss muốn cắt. Một đứa trẻ trong trại đến cổng và gọi bạn bằng tên.',
    '[The orphanage fund] The Thumb has kept an orphanage for years without entering it in any ledger. This year the fund is short and the Underboss wants it cut. A child from the home comes to the gate and calls you by name.',
    [
      fc('Bù phần thiếu bằng tiền của mình', 'Cover the shortfall from your own money',
        'Bạn đặt tiền lên bàn ở trại và không để lại tên. Cô trông trẻ nhìn bạn rất lâu. Hôm sau trên bậc cửa nhà bạn có một chiếc bánh nướng nhỏ.', 'You put the money on the home’s table and leave no name. The matron looks at you a long time. The next day there is a small baked cake on your doorstep.', { wealth: -20, sanity: 8, network: 5 }),
      fc('Thuyết phục Underboss giữ nguyên quỹ bằng một lý do khác', 'Persuade the Underboss to keep the fund with another reason',
        'Bạn nói rằng đứa trẻ nào lớn lên trong trại cũng sẽ trả lại cho hội gấp đôi. Underboss im lặng, rồi gật đầu. Lý do là thật, và bạn không chắc nó là lý do của mình.', 'You say that every child raised in the home will repay the crew twice over. The Underboss is silent, then nods. The reason is true, and you are not sure it is yours.', { rep: 7, wealth: -4, sanity: -3 }, { meritAdd: 4 }),
      fc('Để quỹ bị cắt và nhận lệnh', 'Let the fund be cut and take the order',
        'Trại đóng cửa vào mùa đông. Bạn không đến tiễn. Đứa trẻ gọi tên bạn ở cổng hôm ấy không bao giờ gọi nữa.', 'The home closes in winter. You do not go to see them off. The child who called your name at the gate never calls it again.', { wealth: 12, sanity: -10, rep: 2 })
    ]),

  mission('thumb_dying_godfather', [3, 3],
    '[Người đứng trước bạn] Underboss tiền nhiệm sắp mất. Ông muốn bạn đến một mình và hứa một điều. Cả khu đoán lời hứa ấy, và có ít nhất hai người đã chuẩn bị sẵn câu trả lời thay bạn.',
    '[The one before you] The former Underboss is dying. He wants you to come alone and promise one thing. The whole district guesses at the promise, and at least two people have prepared answers on your behalf.',
    [
      fc('Đến một mình và hứa điều ông xin', 'Go alone and promise what he asks',
        'Ông xin bạn đừng bao giờ cho phép ai nâng súng trong nhà ông. Lời hứa nhỏ hơn bạn sợ. Ông nắm tay bạn đến khi đèn tắt, và bạn giữ lời suốt phần đời còn lại.', 'He asks that you never let anyone raise a gun in his house. The promise is smaller than you feared. He holds your hand until the lamp goes out, and you keep your word the rest of your life.', { rep: 12, sanity: 10, network: 8 }, { meritAdd: 6 }),
      fc('Đến một mình và nói rằng bạn chưa thể hứa', 'Go alone and say you cannot promise yet',
        'Ông nhìn bạn rất lâu rồi bật cười. "Ta tưởng ngươi sẽ nói dối." Ông mất vào đêm sau, và chiếc ghế của ông được dọn ra khỏi phòng.', 'He looks at you a long time and laughs. “I thought you would lie.” He dies the next night, and his chair is carried out of the room.', { rep: 8, sanity: 4, wealth: 10 }),
      fg('Mang theo hai người của bạn đến làm chứng', 'Bring two of your people as witnesses', [
        [50, 'Ông chấp nhận người làm chứng và nói điều ông muốn trước ba người. Cả ba nghe được, và điều ấy bảo vệ bạn trước hai người kia.', 'He accepts the witnesses and says what he wants before three people. All three hear it, and that protects you from the other two.', { rep: 10, network: 12 }],
        [50, 'Ông nhìn hai người làm chứng và quay mặt vào tường. Ông mất sáng hôm sau mà chưa nói gì. Hai người kia biết bạn không tin họ.', 'He looks at the two witnesses and turns his face to the wall. He dies the next morning without a word. The other two know you did not trust them.', { rep: -5, network: -8, sanity: -6 }]
      ])
    ], 11),

  mission('thumb_silent_tribute', [3, 3],
    '[Cống nạp không lời] Mùa này mọi sạp đều nộp đủ, trước hạn, và không ai nhìn vào mắt bạn. Sự ngoan ngoãn ấy là thứ bạn đã dạy, và đêm nay nó làm bạn mất ngủ.',
    '[Silent tribute] This season every stall pays in full, before the deadline, and no one meets your eyes. That obedience is what you taught, and tonight it keeps you awake.',
    [
      fc('Đi dọc chợ một mình và hỏi từng sạp có cần gì', 'Walk the market alone and ask each stall whether it needs anything',
        'Có người bật khóc, có người cười gượng, và có người nói thẳng điều họ cần. Bạn ghi từng cái vào sổ nhỏ. Đó là ngày đầu tiên sau nhiều năm cái chợ nói với bạn.', 'Some weep, some laugh stiffly, and one says plainly what they need. You write each in a small notebook. It is the first day in years the market talks to you.', { rep: 6, network: 12, sanity: 8, wealth: -8 }, { meritAdd: 4 }),
      fc('Nhận khoản cống nạp và không đổi gì', 'Take the tribute and change nothing',
        'Khoản thu mùa ấy là cao nhất trong sổ. Bạn đếm hai lần và vẫn thấy thiếu một thứ không có trong sổ.', 'The season’s take is the highest in the ledger. You count it twice and still feel a lack that is not in the book.', { wealth: 28, sanity: -6, rep: 3 }),
      fg('Giảm cống nạp một mùa và xem ai phản ứng', 'Cut the tribute for a season and see who reacts', [
        [60, 'Chợ sống lại trong ba tuần. Doanh thu tăng, và mùa sau họ nộp nhiều hơn mức cũ mà không ai ép.', 'The market comes alive within three weeks. Takings rise, and next season they pay more than before with no one forcing it.', { wealth: 12, rep: 10, network: 8 }],
        [40, 'Một Sottocapo nói bạn yếu mềm. Hai người đi tìm cách thu thay bạn, và chợ phải trả phần của họ lần nữa.', 'A Sottocapo says you have gone soft. Two people go looking for a way to collect in your place, and the market must pay their share again.', { rep: -6, network: -6, sanity: -4 }]
      ])
    ], 9)
];
