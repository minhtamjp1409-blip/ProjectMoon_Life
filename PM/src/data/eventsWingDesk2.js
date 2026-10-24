// The upper half of the Wing desk: kickbacks and budgets, a quiet transfer, the season a District is audited,
// and what a Section Chief or Senior Executive is asked to do when a name on a list is a name they know.

const need = (lo, hi, extra = {}) => ({ jobs: ['Wing Employee'], wingRankAtLeast: lo, wingRankAtMost: hi, ...extra });
const keep = { stat: { leverage: [30, 100] } };

const pick = ([labelVi, labelEn, resultVi, resultEn, effects, meritAdd, flags], extra = {}) => ({
  labelVi, labelEn, resultVi, resultEn, effects, ...(meritAdd ? { meritAdd } : {}), ...(flags ? { flagsAdd: flags } : {}), ...extra
});

const desk = (id, age, weight, n, vi, en, choices, extra = {}) => ({
  id, age, major: true, weight, need: n, forbids: ['Distorted'], vi, en, ...extra,
  choices: choices.map((c) => (c.need ? pick(c.row, { need: c.need }) : pick(c)))
});
const gated = (row, needs) => ({ row, need: needs });

export const WING_DESK_EVENTS_B = [
  desk('wing_desk_vendor_kickback', [24, 62], 55, need(1, 2),
    '[Nhà cung cấp quá hiền] Một nhà cung cấp vật liệu cho phòng bạn giao hàng đúng hẹn suốt ba năm và chưa bao giờ bị phạt. Bạn nhận ra điều đó khi thấy một tên quen trên danh sách khách mời tiệc cuối năm của họ.',
    '[The Vendor Who Is Too Kind] A materials vendor to your section has delivered on time for three years and never once been fined. You notice it when you see a familiar name on the guest list for their year-end dinner.',
    [
      ['Lập hồ sơ riêng và đưa cho phòng kiểm soát', 'Build a separate file and hand it to internal control',
        'Phòng kiểm soát nhận hồ sơ, hỏi bạn ba câu về nguồn gốc, rồi đóng cửa lại. Hai tháng sau nhà cung cấp đổi tên, và người trong danh sách đổi phòng.',
        'Internal control takes the file, asks three questions about where it came from, then closes the door. Two months later the vendor changes its name and the person on the list changes departments.', { standing: 5, rep: 3, sanity: -3, network: -4 }, 4],
      ['Đến tiệc và nói chuyện riêng với người quen', 'Go to the dinner and speak privately to the familiar name',
        'Người ấy hiểu ngay bạn đang nói gì mà không cần ai nhắc. Họ ngừng nhận quà, và từ đó nợ bạn một thứ không bao giờ ghi vào sổ.',
        'They understand at once what you are saying without anyone spelling it out. They stop accepting gifts, and from then on owe you something that will never be entered in any ledger.', { leverage: 12, network: 5, standing: -1 }, 2],
      ['Nhận lời mời và nhận cả phần quà kèm theo', 'Accept the invitation and the gift that comes with it',
        'Món quà không đắt, và đó chính là điểm đáng sợ nhất. Từ hôm nay bạn là một trong số những người mà nhà cung cấp gọi là "người đáng tin cậy".',
        'The gift is not expensive, and that is the most frightening part. From today you are one of those the vendor calls “a person one can rely on.”', { wealth: 14, standing: -5, leverage: -6, sanity: -5 }]
    ]),

  desk('wing_desk_budget_cut', [26, 62], 55, need(1, 2),
    '[Dòng ngân sách bị gạch] Phòng bạn phải cắt một dòng chi trong quý. Có ba dòng: lương thưởng cuối năm, quỹ thương tật, và quỹ nghiên cứu mà cả phòng không ai dám nói rõ dùng vào việc gì.',
    '[The Line That Gets Struck] Your section must cut one line of spending this quarter. There are three: year-end bonuses, the injury fund, and a research fund that no one in the section dares to say clearly what it is for.',
    [
      ['Cắt thưởng cuối năm và nói thẳng với cả phòng', 'Cut the year-end bonuses and tell the whole section directly',
        'Phòng im lặng cả buổi họp. Có người không nhìn bạn suốt một tháng, có người cảm ơn bạn vì đã không nói dối. Cả hai đều đúng về bạn.',
        'The section is silent for the whole meeting. Some will not look at you for a month; others thank you for not lying. Both are right about you.', { wealth: -4, standing: 3, network: -4, rep: 1 }, 2],
      ['Cắt quỹ nghiên cứu mà không hỏi nó dùng vào đâu', 'Cut the research fund without asking what it is for',
        'Quỹ bị gạch đúng như bạn muốn. Ba tuần sau một người từ tầng trên xuống hỏi vì sao một dự án ngừng đột ngột, và bạn nhận ra mình vừa cắt thứ có người đang cần giữ.',
        'The fund is struck as you intended. Three weeks later someone from an upper floor comes down to ask why a project stopped so suddenly, and you realize you have cut something someone needed kept.', { standing: -4, sanity: -3, leverage: 8 }, 2],
      ['Cắt quỹ thương tật rồi tự bù từ tiền cá nhân', 'Cut the injury fund and cover it yourself from personal money',
        'Không ai biết bạn đã bù, và đó là điều bạn muốn. Nhưng sổ sách vẫn có một dòng không khớp, và sớm muộn gì cũng có người tìm ra nó.',
        'No one knows you covered it, which is how you wanted it. But the books still carry one line that does not match, and sooner or later someone will find it.', { wealth: -12, sanity: 4, standing: -1, network: 3 }]
    ]),

  desk('wing_desk_quiet_transfer', [28, 64], 50, need(1, 3),
    '[Lệnh điều chuyển lặng lẽ] Một đồng nghiệp lâu năm sắp bị chuyển sang một phòng ở tầng hầm, và bạn là người phải trao lệnh. Họ chưa biết lý do, và bạn cũng chỉ biết một nửa.',
    '[The Quiet Transfer Order] A long-serving colleague is about to be moved to a department in the basement, and you are the one who must hand over the order. They do not know the reason yet, and you know only half of it.',
    [
      ['Trao lệnh đúng giờ, giữ khuôn mặt bình thản', 'Hand over the order on time with a calm face',
        'Họ đọc lệnh hai lần rồi gấp lại, cẩn thận như gấp một lá thư tình. "Cảm ơn đã đưa tận tay." Họ không nói thêm, và bạn nhận ra mình đứng đó lâu hơn cần thiết.',
        'They read the order twice and fold it, carefully, like a love letter. “Thank you for bringing it by hand.” They say no more, and you realize you have stood there longer than needed.', { standing: 4, sanity: -5, network: -3 }, 3],
      ['Báo trước họ một ngày, bằng lời, ở ngoài tòa nhà', 'Warn them a day early, aloud, outside the building',
        'Họ hiểu và không hỏi gì. Hôm sau họ nộp đơn xin nghỉ trước khi lệnh đến, và lệnh trở thành một tờ giấy vô nghĩa. Có người ở trên để ý rằng nó đã vô nghĩa quá sớm.',
        'They understand and ask nothing. The next day they file for leave before the order arrives, and the order becomes a meaningless sheet. Someone above notes that it became meaningless too soon.', { sanity: 4, standing: -5, network: 5, leverage: 3 }],
      ['Hỏi cấp trên lý do thật và chỉ trao lệnh sau khi biết', 'Ask your superior for the real reason and hand it over only once you know',
        'Cấp trên nhìn bạn rất lâu rồi đưa cho bạn một trang hồ sơ. Sau khi đọc, bạn trao lệnh mà không nói gì, và hiểu rằng một vài thứ không được biết thì dễ sống hơn.',
        'Your superior looks at you a long time, then gives you a page of the file. After reading it you hand over the order without speaking, and understand that some things are easier to live with unknown.', { leverage: 10, sanity: -4, standing: 1 }, 1]
    ]),

  desk('wing_desk_district_audit', [26, 62], 50, need(1, 3),
    '[Mùa kiểm toán của District] Một đoàn từ trụ sở Wing xuống kiểm tra toàn bộ phòng ban trong ba tuần. Cả tòa nhà dọn dẹp, giấu bớt giấy tờ, và tập cười. Bạn nằm trong nhóm được phân công tiếp đoàn.',
    '[The District Audit Season] A delegation from Wing headquarters descends to inspect every department for three weeks. The whole building tidies, hides a few papers, and rehearses smiling. You are among the group assigned to host them.',
    [
      ['Mở mọi hồ sơ cho đoàn và đi cùng từng bước', 'Open every file to the delegation and accompany them at each step',
        'Đoàn rời đi với một bản đánh giá tốt cho cả phòng và một dòng riêng khen bạn. Cả tòa nhà thở ra, và vài người sẽ không bao giờ gọi bạn là bạn nữa vì bạn đã làm quá tốt.',
        'The delegation leaves with a good evaluation for the whole department and a separate line praising you. The whole building exhales, and a few people will never call you friend again for having done it too well.', { standing: 6, rep: 4, network: -3, sanity: -4 }, 4, ['wing_fortune_high']],
      ['Giấu giúp những hồ sơ chưa sẵn sàng', 'Quietly hide the files that are not ready',
        'Mọi thứ trôi qua như một ca trực bình thường. Người bạn đã giúp biết ơn, và biết ơn là một thứ có thể được ghi nhớ rất kỹ.',
        'Everything passes as an ordinary shift. The people you helped are grateful, and gratitude is something that can be remembered very carefully.', { leverage: 11, network: 6, standing: -3, sanity: -3 }, 1, ['wing_fortune_low']],
      ['Đứng ngoài và nhường việc tiếp đoàn cho người khác', 'Stand aside and leave hosting to someone else',
        'Bạn dành ba tuần làm việc của mình như thường, và đó chính là điều đoàn kiểm toán ghi nhận: một phòng làm việc bình thường khi có người nhìn. Phòng được đánh giá trung bình, không hơn không kém.',
        'You spend three weeks doing your own work as usual, which is exactly what the auditors note: a department that works normally when watched. The section is rated average, no more, no less.', { sanity: 3, standing: 1, rep: 1 }, 1]
    ]),

  desk('wing_desk_press_leak', [28, 62], 45, need(1, 3),
    '[Tin rò ra ngoài] Một đoạn nội dung từ cuộc họp kín xuất hiện trong một bản tin lề đường ở Backstreets. Chỉ có mười một người dự họp, và bạn là một trong số đó. Người ta bắt đầu nhìn nhau lâu hơn bình thường.',
    '[The Leak] A passage from a closed meeting appears in a roadside bulletin in the Backstreets. Only eleven people attended, and you are one of them. People begin to look at one another longer than usual.',
    [
      ['Tự nguyện trình biên bản cá nhân cho phòng điều tra', 'Volunteer your personal notes to the investigators',
        'Phòng điều tra đọc ghi chép của bạn rất kỹ và trả lại không một dấu vết. Bạn được loại khỏi danh sách nghi vấn sớm hơn mười người khác, và biết rằng sự trong sạch này là loại có thể bị thu hồi.',
        'The investigators read your notes closely and return them without a mark. You are cleared from the list of suspects sooner than ten others, and know that this innocence is the kind that can be revoked.', { standing: 5, sanity: -3, network: -2 }, 3],
      ['Tìm ra kẻ rò rỉ trước phòng điều tra và giữ thông tin lại', 'Find the leaker before the investigators do and keep what you learn',
        'Người ấy là một cái tên bạn không ngờ. Bạn không nói với ai, và từ nay họ làm việc bên cạnh bạn với đôi vai hơi cứng như người biết có ai đó đang đọc mình.',
        'It is a name you did not expect. You tell no one, and from now on they work beside you with slightly stiff shoulders, like someone who knows they are being read.', { leverage: 13, standing: -2, sanity: -5 }],
      ['Giả vờ không biết gì và tiếp tục làm việc', 'Pretend to know nothing and carry on with your work',
        'Cuộc điều tra kéo dài sáu tuần rồi lặng lẽ khép lại. Không ai bị kết luận, và mọi người nhìn nhau thêm một chút lâu hơn trong nhiều năm.',
        'The investigation runs six weeks and then closes quietly. No one is concluded against, and people go on looking at one another a little longer for years.', { sanity: -2, standing: 0, rep: 0, network: -1 }]
    ]),

  desk('wing_desk_board_books', [38, 66], 50, need(2, 3),
    '[Sổ sách của Hội đồng] Một tập sổ chi của cấp cao nhất được chuyển đến bàn bạn "để đóng dấu chứng nhận". Mọi thứ đều khép kín. Chỉ là khép kín quá hoàn hảo, như một căn phòng được lau sạch sau một trận đánh.',
    '[The Council’s Books] A set of the highest tier’s spending ledgers is delivered to your desk “for a certifying stamp.” Everything closes. It simply closes too perfectly, like a room wiped clean after a fight.',
    [
      ['Đóng dấu và ký tên', 'Stamp it and sign',
        'Con dấu ấn xuống êm như đóng lên một tấm khăn. Từ hôm nay tên bạn nằm trên một trang mà hàng trăm người khác sẽ dựa vào, và bạn không còn là người bên ngoài của nó nữa.',
        'The stamp comes down as soft as on a cloth. From today your name sits on a page that hundreds of others will rely on, and you are no longer an outsider to it.', { standing: 5, wealth: 12, sanity: -5, network: 5 }, 4],
      ['Trả lại với một ghi chú xin thêm chứng từ gốc', 'Return it with a note asking for the original vouchers',
        'Sổ sách được trả lại sau hai tuần, kèm chứng từ, và còn có thêm một lời nhắn không ký tên: "Bạn là người đầu tiên hỏi trong mười năm." Bạn không biết đó là lời khen hay lời cảnh báo.',
        'The ledgers come back after two weeks with the vouchers and an unsigned note: “You are the first to ask in ten years.” You do not know whether it is praise or warning.', { standing: -3, rep: 4, leverage: 8, sanity: -3 }, 3],
      ['Chép một bản để dành rồi mới đóng dấu', 'Make a copy for yourself and then stamp it',
        'Chiếc hộp bạn đặt bản chép vào không có tên và không có chìa khóa. Bạn vừa làm điều mà người bạn từng căm ghét ở người khác, và nó nhẹ hơn bạn tưởng, điều đó mới đáng lo.',
        'The box in which you place the copy has no name and no key. You have just done what you once despised in others, and it is lighter than you thought, which is the worrying part.', { leverage: 18, standing: -4, sanity: -6 }]
    ]),

  desk('wing_desk_succession_whisper', [38, 66], 50, need(2, 3),
    '[Lời thì thầm về người kế nhiệm] Một Senior Executive già bắt đầu hỏi bạn những câu có vẻ vô tình: bạn sẽ làm gì nếu ngồi ở vị trí của họ, bạn có tin vào một số người ở dưới không. Ai cũng hiểu những câu này nghĩa là gì.',
    '[The Whisper of Succession] An aging Senior Executive begins to ask you questions that seem casual: what you would do if you sat in their place, whether you trust certain people below. Everyone understands what such questions mean.',
    [
      ['Trả lời thật lòng, kể cả những điều họ không muốn nghe', 'Answer truthfully, including what they do not want to hear',
        'Họ nghe hết, gật đầu chậm, rồi nói: "Hầu hết những người ngồi ở ghế này đều trả lời ngược lại." Từ hôm đó tên bạn xuất hiện trong những cuộc trò chuyện mà bạn không có mặt.',
        'They hear it all, nod slowly, and say: “Most who sat in this chair answered the opposite.” From that day your name comes up in conversations at which you are not present.', { standing: 6, network: 6, sanity: 2 }, 4],
      ['Trả lời khéo, không hứa gì và không từ chối gì', 'Answer artfully, promising nothing and refusing nothing',
        'Họ mỉm cười, đúng loại nụ cười của người nhận ra mình đang nhìn một bản sao. Bạn được mời vào thêm hai cuộc họp, và mất một bữa trưa yên tĩnh.',
        'They smile, the smile of someone who recognizes they are looking at a copy of themselves. You are invited to two more meetings, and lose one quiet lunch.', { network: 5, standing: 2, leverage: 4, sanity: -2 }, 2],
      ['Nhắc đến một người ở dưới mà bạn biết có điểm yếu', 'Name a person below whose weakness you happen to know',
        'Bạn nói ra, và nó đúng. Cái tên đó không bao giờ được nhắc lại, và người mang tên ấy sẽ không biết vì sao con đường của họ đóng lại.',
        'You say it, and it is true. That name is never raised again, and its owner will never know why their road closed.', { leverage: -8, standing: 3, sanity: -6, network: 2 }, 3]
    ]),

  desk('wing_desk_name_on_list', [26, 66], 90, need(1, 3, { stat: { standing: [0, 24] } }),
    '[Tên bạn trong danh sách] Một đồng nghiệp lén đẩy tờ giấy về phía bạn rồi đi ngay. Danh sách rời Nest năm nay có mười ba cái tên. Cái thứ chín là của bạn, viết bằng nét chữ đã quen.',
    '[Your Name on the List] A colleague slides a sheet toward you and leaves at once. This year’s departure list has thirteen names. The ninth is yours, written in a hand you recognize.',
    [
      ['Đến gặp người ký và hỏi thẳng lý do', 'Go to the signatory and ask the reason directly',
        'Người ký không giấu giếm. Ông đưa bạn một xấp giấy, mỗi tờ là một lần bạn trả lời quá thật hoặc quá khéo. Ông nói bạn có hai tuần, và bạn dùng chúng để học cách đứng thẳng lưng lần nữa.',
        'The signatory does not hide it. He hands you a stack of pages, each one a time you answered too truthfully or too cleverly. He says you have two weeks, and you use them to learn to stand upright again.', { standing: 8, sanity: -7, network: -4 }, 2],
      ['Nhờ người từng mắc nợ bạn xóa cái tên', 'Ask someone who owes you to strike the name',
        'Cái tên biến mất đúng như đã hứa. Ba tháng sau bạn nhận ra mọi người ở tầng của mình đối xử với bạn lịch sự hơn, và biết rằng sự lịch sự ấy là một thứ tiền tệ có thể đổi.',
        'The name vanishes as promised. Three months later you notice everyone on your floor treats you more politely, and know that politeness is a currency that can be exchanged.', { leverage: -14, standing: 10, sanity: -4 }],
      gated(['Đặt tập hồ sơ bạn giữ lên bàn người ký và nói bạn chưa đọc hết', 'Lay the file you have kept on the signatory’s desk and say you have not finished reading it',
        'Người ký nhìn tập hồ sơ rất lâu, rồi rút tên bạn ra khỏi danh sách bằng chính bút của ông. Bạn ra về mà không nói thêm gì, và biết từ hôm nay tên bạn trên mọi danh sách sẽ không còn là của bạn nữa.',
        'The signatory looks at the file a long time, then strikes your name from the list with his own pen. You leave without saying more, and know that from today your name on every list will no longer be yours alone.', { leverage: -20, standing: 12, sanity: -8, network: -5 }, 1], keep),
      ['Thu dọn bàn và rời Nest trước khi bị đuổi', 'Clear your desk and leave the Nest before being thrown out',
        'Bạn đi trước giờ, mang theo một chiếc hộp nhỏ và không ai tiễn. Cánh cổng đóng lại phía sau mà không tiếng động. Ngoài kia, một đời khác bắt đầu, và nó không còn là đời của một Feather.',
        'You go before the hour, carrying one small box and with no one to see you off. The gate closes behind you without a sound. Out there another life begins, and it is no longer a Feather’s.', { standing: -10, sanity: 6, rep: -4, wealth: -10 }, 0, ['wing_left_nest']]
    ]),

  desk('wing_desk_extraction', [38, 66], 45, need(2, 3),
    '[Đưa một người ra khỏi Nest] Một nhà khoa học của Wing xin bạn giúp đưa họ rời Nest trong đêm, mang theo thứ họ nói là "không nên bị giữ trong một cái hộp". Họ không nói đó là gì và bạn không dám hỏi.',
    '[Getting Someone Out of the Nest] A Wing scientist asks you to help them leave the Nest tonight, carrying what they call “something that should not be kept in a box.” They do not say what it is and you do not dare ask.',
    [
      ['Mở cổng phụ và ký giả một giờ ra vào', 'Open the side gate and forge a log entry for an hour',
        'Họ đi qua cổng mà không ngoảnh lại. Sáng hôm sau, ba người mặc đồ tối hỏi bạn ca trực đêm qua có gì bất thường không, và bạn trả lời với một khuôn mặt không có gì để giấu.',
        'They pass through the gate without looking back. The next morning three people in dark clothes ask if last night’s shift had anything unusual, and you answer with a face that has nothing to hide.', { standing: -6, sanity: -7, leverage: 6, rep: 3 }, 2],
      ['Báo trước cho phòng an ninh và nhận công', 'Warn security beforehand and take the credit',
        'Họ bị chặn ở cổng. Người nhà khoa học nhìn bạn một lần, không giận, chỉ như một người đã hiểu thêm một điều. Bạn được thưởng và không ăn nổi bữa tối hôm đó.',
        'They are stopped at the gate. The scientist looks at you once, not angry, like someone who has learned one more thing. You are rewarded and cannot eat dinner that night.', { standing: 7, wealth: 18, sanity: -9, network: 3 }, 4],
      ['Từ chối và không nói với ai', 'Refuse and tell no one',
        'Họ gật đầu, cảm ơn bạn đã không báo, rồi biến mất. Một tuần sau, tên họ nằm trong danh sách báo cáo mất tích. Bạn không biết mình đã giúp họ hay đã bỏ mặc họ.',
        'They nod, thank you for not reporting, then disappear. A week later their name is on a missing-persons list. You do not know whether you helped them or abandoned them.', { sanity: -4, standing: -1 }]
    ]),

  desk('wing_desk_protege_turns', [40, 66], 45, need(2, 3),
    '[Người bạn dạy lật lại] Người từng là thực tập sinh của bạn nay ngồi ở vị trí đủ cao để đọc hồ sơ của bạn. Họ không làm gì sai, họ chỉ đọc. Bạn biết họ đã đọc vì ngăn kéo thứ hai của bạn đã bị mở và đóng lại rất cẩn thận.',
    '[The Protégé Turns the Page] The person who was once your intern now sits high enough to read your file. They do nothing wrong; they only read. You know they have read because your second drawer has been opened and closed very carefully.',
    [
      ['Mời họ ăn tối và nói thẳng bạn biết', 'Invite them to dinner and say plainly that you know',
        'Họ không chối. Họ nói: "Em học điều đó từ anh chị." Bạn ăn hết bữa tối mà không cảm nhận được vị gì, và về nhà biết mình đã được tha thứ hoặc bị đánh giá, hoặc cả hai.',
        'They do not deny it. They say: “I learned that from you.” You finish the dinner without tasting it, and go home knowing you have been forgiven or judged, or both.', { network: 6, standing: 2, sanity: -4, leverage: -6 }, 2],
      ['Chuyển ngăn kéo thứ hai và thay những gì nằm trong đó', 'Move the second drawer and replace what lies in it',
        'Bạn dành một đêm xóa dấu vết của chính mình, và nhận ra việc đó mệt hơn việc tạo ra chúng. Người học trò vẫn chào bạn mỗi sáng, giọng đều như cũ.',
        'You spend a night erasing your own traces, and find it more tiring than leaving them. The former pupil still greets you every morning, in the same even voice.', { leverage: -10, standing: 2, sanity: -5 }],
      ['Để họ đọc và ghi lại những gì bạn muốn họ thấy', 'Let them read, and plant what you want them to see',
        'Trong hai tháng, bạn cho thêm vào ngăn kéo những thứ đẹp hơn sự thật một chút. Họ đọc mỗi tuần. Đến một ngày bạn không còn nhớ phần nào là thật, và đó là lúc bạn nhận ra mình đã trở thành người viết ra chính hồ sơ của mình.',
        'For two months you add things to the drawer that are a little better than the truth. They read each week. One day you no longer remember which part is real, and that is when you realize you have become the author of your own file.', { standing: 5, leverage: 6, sanity: -8 }, 1]
    ]),

  desk('wing_desk_core_shift', [42, 70], 45, need(3, 3),
    '[Lõi Singularity xê dịch] Một đêm, mọi thiết bị trong tầng của bạn rung lên cùng một nhịp, rồi dừng. Phòng kỹ thuật bảo đó là nhiễu. Nhưng bạn đã thấy sắc mặt của người trực, và bạn đủ cao để biết nhiễu không bao giờ làm sắc mặt ai như vậy.',
    '[The Core Shifts] One night every device on your floor shudders in the same beat, then stops. Engineering says it was interference. But you saw the duty officer’s face, and you are high enough to know interference never puts that look on anyone.',
    [
      ['Triệu tập phòng kỹ thuật và đòi báo cáo thật trước sáng', 'Summon engineering and demand the real report by morning',
        'Báo cáo đến lúc ba giờ sáng, dày gấp ba lần dự kiến. Đọc đến trang cuối bạn hiểu vì sao họ đã nói dối, và đó là lần đầu tiên bạn mong mình không ngồi ở chiếc ghế này.',
        'The report arrives at three in the morning, three times as thick as expected. By the last page you understand why they lied, and it is the first time you wish you did not sit in this chair.', { standing: 4, sanity: -8, rep: 3, leverage: 9 }, 4],
      ['Giữ im lặng trong ba ngày và theo dõi ai hành động khác thường', 'Stay silent for three days and watch who acts strangely',
        'Hai người đổi giờ làm, một người xin nghỉ phép dài, và một người bắt đầu đến sớm hơn một giờ. Bạn có danh sách trong tay trước khi phòng điều tra biết có vấn đề.',
        'Two people change their shifts, one requests extended leave, and one starts arriving an hour early. You have the list in hand before investigators know there is a problem.', { leverage: 16, sanity: -4, standing: 1 }, 2],
      ['Đóng cửa tầng và gửi một báo cáo ngắn lên Hội đồng', 'Seal the floor and send a short report to the Council',
        'Hội đồng trả lời trong mười phút và cảm ơn bạn đã không làm lớn chuyện. Ở đây, không làm lớn chuyện có nghĩa là bạn đã đúng, và có nghĩa là có thứ cần phải được giữ nhỏ.',
        'The Council answers in ten minutes and thanks you for not making a fuss. Here, not making a fuss means you were right, and also means something needs to be kept small.', { standing: 6, network: 4, sanity: -3, wealth: 8 }, 3]
    ]),

  desk('wing_desk_old_friend_in_ledger', [36, 66], 50, need(2, 3),
    '[Cái tên quen trong sổ] Giữa một cuộc kiểm tra thường lệ, bạn thấy tên người bạn thời thực tập, người từng chia cho bạn bữa trưa cuối cùng của mình, trong một khoản chi không có chứng từ. Khoản không lớn nhưng đủ để bị đuổi.',
    '[The Old Friend in the Ledger] In the middle of a routine check you find the name of a friend from your intern days, the one who once shared their last lunch with you, against a payment with no voucher. The sum is small but enough to get someone dismissed.',
    [
      ['Báo cáo đúng theo quy trình', 'Report it according to procedure',
        'Bạn gửi báo cáo lúc năm giờ chiều và về nhà. Người bạn bị gọi lên sáng hôm sau. Họ không trách bạn, nhưng không bao giờ gọi bạn bằng tên cũ nữa.',
        'You send the report at five in the evening and go home. Your friend is called up the next morning. They do not blame you, but never again call you by the old name.', { standing: 6, sanity: -8, network: -6, rep: 2 }, 4],
      ['Tự trả khoản chi và xóa khoản đó khỏi sổ', 'Cover the payment yourself and remove the line from the book',
        'Số tiền đi khỏi ví bạn lặng lẽ như nước thấm vào đất. Người bạn không bao giờ biết, và đó là kiểu ân huệ khiến bạn có thể ngủ, và không thể quên.',
        'The money leaves your purse as quietly as water into soil. Your friend never knows, which is the kind of favor that lets you sleep and never forget.', { wealth: -16, standing: -2, sanity: 2, leverage: 5 }],
      gated(['Dùng bí mật bạn nắm về người ký khoản chi để khoản chi được "xử lý nội bộ"', 'Use what you hold on the person who signed it so the payment is “handled internally”',
        'Mọi thứ khép lại trong một buổi chiều, êm đến mức đáng sợ. Người bạn được giữ lại và bạn mất đi một mảnh của thứ bạn đã giữ rất lâu. Bạn không chắc mình vừa cứu một người hay vừa bán đi một thứ khác.',
        'Everything closes in one afternoon, so smoothly it is frightening. Your friend stays and you lose a piece of what you held for a long time. You are not sure whether you have just saved a person or sold something else.', { leverage: -16, standing: -2, sanity: -3, network: 7 }, 1], keep)
    ])
];
