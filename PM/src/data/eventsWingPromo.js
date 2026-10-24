// Three more scenes for each Wing rung, so a Feather who sits the same promotion twice (a failed attempt, a retry)
// is not handed the same room. The rung names, flags and reward bands follow the older trial of each rung.
// A promotion here is judged on the record: standing opens the answer, leverage can force one, neither is free.

const win = ([labelVi, labelEn, resultVi, resultEn, effects, meritAdd], rank, done) => ({
  labelVi, labelEn, resultVi, resultEn, setWingRank: rank, flagsAdd: rank === 1 ? [done, 'Feather', 'Nest'] : [done], meritAdd, effects
});
const defer = ([labelVi, labelEn, resultVi, resultEn, effects]) => ({ labelVi, labelEn, resultVi, resultEn, effects });

const promo = (id, from, done, age, weight, vi, en, a, b, d) => ({
  id, age, major: true, weight,
  need: { jobs: ['Wing Employee'], wingRank: from },
  forbids: ['Distorted', done],
  vi, en,
  choices: [win(a, from + 1, done), win(b, from + 1, done), defer(d)]
});

const REST = { health: 12, sanity: 12, wealth: 4 };

export const WING_PROMO_EXTRA = [
  // ------------------------------------------------------------------ Intern -> Feather
  promo('wing_promo_feather_vetting', 0, 'promo_wing_feather_done', [19, 56], 90,
    '[Hồ sơ Feather: buổi thẩm vấn nền] Một người từ phòng nhân sự đặt trước bạn một tập hồ sơ dày bằng hai ngón tay. Trong đó có tên bạn bè cũ, địa chỉ cũ và một lần bạn trả lời sai ở ngày thứ ba của kỳ thử việc. "Chúng tôi chỉ muốn nghe bạn tự kể."',
    '[Feather commission: the background interview] Someone from personnel sets before you a file two fingers thick. In it are old friends’ names, old addresses, and a time you answered wrongly on the third day of probation. “We only want to hear you tell it yourself.”',
    ['Kể hết, kể cả lần trả lời sai', 'Tell all of it, including the wrong answer',
      'Người nhân sự không ghi chép gì trong mười phút, rồi gấp hồ sơ lại. "Hầu hết người ta kể bản đẹp hơn." Họ ký, và bạn bước ra với tấm thẻ tạm thời đổi thành tấm thẻ thật.',
      'The personnel officer takes no notes for ten minutes, then closes the file. “Most people tell a prettier version.” They sign, and you walk out with the temporary badge exchanged for the real one.', { standing: 8, rep: 6, wealth: 18, sanity: -3 }, 22],
    ['Kể gọn và chuyển sang điều bạn có thể làm cho Wing', 'Keep it short and turn to what you can do for the Wing',
      'Họ nghe, gật đầu, và hỏi thêm ba câu về công việc chứ không về quá khứ. Thẻ được ký ngay tại bàn. Có thể bạn đã vượt qua, hoặc có thể họ đã quyết định từ trước.',
      'They listen, nod, and ask three more questions about work and not about the past. The badge is signed at the desk. Perhaps you passed, or perhaps they had decided beforehand.', { standing: 4, network: 8, wealth: 22, sanity: -1 }, 24],
    ['Xin thêm một tuần để chuẩn bị câu trả lời', 'Ask a week to prepare your answers',
      'Họ cho bạn bảy ngày. Bạn dành năm ngày đầu để viết, hai ngày sau để xé, và đến hạn bạn có một câu trả lời ngắn hơn nhiều so với bản đầu.',
      'They give you seven days. You spend the first five writing and the last two tearing it up, and by the deadline you have an answer far shorter than the first draft.', REST]),

  promo('wing_promo_feather_witness', 0, 'promo_wing_feather_done', [19, 56], 90,
    '[Hồ sơ Feather: người làm chứng] Để được nhận vào Nest, cần có một Feather chính thức đứng ra làm chứng cho bạn. Người duy nhất bạn thực sự biết là một nhân viên cũ đang bị để mắt. Cái tên của họ trên đơn bảo lãnh có thể đóng hoặc mở cả hai cánh cửa.',
    '[Feather commission: the sponsor] To be admitted to the Nest an official Feather must stand witness for you. The only one you truly know is a veteran who is under quiet watch. Their name on the guarantee could close or open both doors.',
    ['Nhờ họ ký và nói thật về tình trạng của họ', 'Ask them to sign and speak honestly about their situation',
      'Họ ký ngay, không cần thuyết phục. "Nếu em ở lại được, thì tôi cũng đã làm được một việc đúng." Hồ sơ đi qua, và cái tên của họ không còn bị để mắt lâu sau đó.',
      'They sign at once, no persuading needed. “If you can stay, then I did one thing right.” The file goes through, and their name stops being watched not long after.', { standing: 6, network: 12, wealth: 16, sanity: 2 }, 22],
    ['Tìm một người khác ít rủi ro hơn, dù chỉ biết sơ', 'Find someone else, less risky, though barely known',
      'Người đó ký sau hai bữa cơm trưa gượng gạo và một món quà nhỏ. Hồ sơ đi qua, nhưng người nhân viên cũ không còn chào bạn ở hành lang nữa.',
      'That person signs after two stiff lunches and a small gift. The file goes through, but the veteran no longer greets you in the corridor.', { standing: 5, wealth: 10, network: 5, sanity: -5 }, 22],
    ['Hoãn đơn một tháng để tìm thêm người làm chứng', 'Delay the application a month to find another sponsor',
      'Một tháng không đủ để tìm người ký, nhưng đủ để biết ai đáng tin. Danh sách ngắn hơn bạn nghĩ, và đó cũng là một điều đáng học.',
      'A month is not enough to find a signatory, but enough to learn who can be trusted. The list is shorter than you thought, and that too is worth learning.', REST]),

  promo('wing_promo_feather_ledger', 0, 'promo_wing_feather_done', [19, 56], 90,
    '[Hồ sơ Feather: bài kiểm sổ] Trước khi trao thẻ, Wing đưa bạn một cuốn sổ kiểm kê cũ và một giờ. Bạn không biết đây là bài thi cho đến khi thấy trang thứ bảy có một con số bị chép nhầm cố ý, như một câu hỏi bằng mực.',
    '[Feather commission: the ledger test] Before the badge is handed over, the Wing gives you an old inventory ledger and an hour. You do not know it is a test until you see that the seventh page has a deliberately miscopied figure, like a question in ink.',
    ['Sửa con số và ghi chú lý do bên lề', 'Correct the figure and note the reason in the margin',
      'Người chấm đọc ghi chú bên lề lâu hơn đọc phần còn lại. "Chưa ai ghi lý do." Thẻ đến tay bạn kèm một nụ cười rất ngắn, hiếm như giọt nước ở phòng lưu trữ.',
      'The grader reads the margin note longer than the rest. “No one has noted a reason.” The badge reaches your hand with a very brief smile, rare as a drop of water in the archive.', { standing: 7, rep: 4, wealth: 18, sanity: 0 }, 23],
    ['Để nguyên con số và chỉ báo cáo bạn đã thấy nó', 'Leave the figure and only report that you saw it',
      'Bạn nộp sổ với một dòng ngắn. Người chấm nhíu mày một chút, rồi đóng dấu. Có thể bạn đã làm quá ít, hoặc đúng thứ họ muốn thấy: một người biết đâu là việc của mình.',
      'You hand in the ledger with one short line. The grader frowns a little, then stamps it. Perhaps you did too little, or exactly what they wanted: someone who knows where their job ends.', { standing: 5, network: 6, wealth: 18, sanity: 1 }, 22],
    ['Xin làm lại với một cuốn sổ khác sau vài ngày', 'Ask to retake it with a different ledger after a few days',
      'Họ đồng ý, và cuốn sổ mới mỏng hơn nhưng khó hơn. Bạn học được rằng bài thi nào cũng thay đổi khi bạn thất bại lần đầu.',
      'They agree, and the new ledger is thinner but harder. You learn that every test changes when you fail the first time.', REST]),

  // ------------------------------------------------------------------ Feather -> Section Chief
  promo('wing_promo_chief_reorg', 1, 'promo_wing_specialist_done', [24, 62], 90,
    '[Trưởng phòng: tái cơ cấu] Wing sáp nhập hai phòng làm một và cần một người điều hành. Phòng cũ của bạn, và phòng kia, đang nhìn nhau như hai gia đình cưới nhau. Họ cần người đủ lạnh để hợp nhất và đủ ấm để không ai bỏ đi.',
    '[Section Chief: reorganization] The Wing merges two sections into one and needs someone to run it. Your old section and the other eye each other like two families forced into a marriage. They need someone cold enough to merge and warm enough that no one leaves.',
    ['Gặp từng người một và hỏi họ muốn gì trước khi nói bạn muốn gì', 'Meet each person alone and ask what they want before saying what you want',
      'Hai tuần, ba mươi bốn cuộc nói chuyện. Cuối cùng, khi bạn đưa ra bản cơ cấu mới, không ai ngạc nhiên và hai người thậm chí còn cảm ơn bạn. Phòng mới chạy mà không mất ai.',
      'Two weeks, thirty-four conversations. In the end, when you present the new structure, no one is surprised and two people even thank you. The new section runs without losing anyone.', { standing: 7, network: 12, wealth: 38, sanity: -4 }, 40],
    ['Gom hồ sơ của cả hai bên trước khi họp rồi đặt luật từ ngày đầu', 'Collect both sides’ records before the meeting and set the rules from day one',
      'Cuộc họp đầu tiên kết thúc trong mười lăm phút vì không ai có gì để cãi. Phòng mới chạy rất tốt và rất im, và bạn biết nửa số người không thích bạn nhưng cũng không dám nói.',
      'The first meeting ends in fifteen minutes because no one has anything to argue. The new section runs very well and very quietly, and you know half do not like you but dare not say it.', { standing: 4, leverage: 12, wealth: 42, sanity: -6, network: 4 }, 42],
    ['Xin thêm một tháng quan sát cả hai phòng trước khi nhận', 'Ask a month to observe both sections before accepting',
      'Một tháng ngồi lẫn trong cả hai phòng cho bạn thấy ai thật sự điều hành chỗ nào. Bạn quay lại với một danh sách ngắn, và nó chính xác hơn mọi bản sơ đồ tổ chức.',
      'A month spent sitting among both sections shows you who really runs what. You return with a short list, more accurate than any organization chart.', REST]),

  promo('wing_promo_chief_inheritance', 1, 'promo_wing_specialist_done', [24, 62], 90,
    '[Trưởng phòng: người tiền nhiệm để lại] Người ngồi ở vị trí này trước bạn không rời đi vì đến tuổi nghỉ. Họ để lại ngăn kéo đầy, một chiếc ghế quay về phía cửa sổ, và một ghi chú: "Đọc tờ thứ ba trước khi đọc tờ thứ nhất."',
    '[Section Chief: what the predecessor left] The one who sat in this post before you did not leave because of retirement age. They left a full drawer, a chair turned toward the window, and a note: “Read the third sheet before the first.”',
    ['Làm theo ghi chú và đọc tờ thứ ba trước', 'Follow the note and read the third sheet first',
      'Tờ thứ ba là danh sách những người bạn nên đề phòng, với những lời giải thích ngắn, tàn nhẫn và đúng. Bạn đọc tờ thứ nhất sau và hiểu vì sao họ nói như thế: nó chỉ là một lời xin lỗi.',
      'The third sheet is a list of those to guard against, with short, cruel, accurate explanations. You read the first sheet afterward and understand why they said so: it is only an apology.', { standing: 5, leverage: 10, wealth: 36, sanity: -5 }, 40],
    ['Đóng ngăn kéo lại và bắt đầu như thể chưa ai từng ngồi đây', 'Close the drawer and begin as if no one had ever sat here',
      'Bạn làm việc ba tháng mà không mở nó. Người trong phòng nhìn bạn theo kiểu khác đi: một người không cần bất kỳ ai đã đi trước, hoặc một người chưa biết mình cần gì.',
      'You work three months without opening it. The people in the section look at you differently: someone who needs no one who came before, or someone who does not yet know what is needed.', { standing: 6, rep: 5, wealth: 36, sanity: 1, network: 4 }, 38],
    ['Hỏi người cũ vì sao họ đi trước khi nhận', 'Ask the predecessor why they went before accepting',
      'Họ nhận lời gặp ở một quán không có tên, và nói ít hơn bạn mong nhưng đủ để bạn biết nên đọc gì. Bạn quay về với một nửa câu trả lời và thấy như thế đã nhiều.',
      'They agree to meet at a place with no name and say less than you hoped but enough that you know what to read. You return with half an answer and find that is already a lot.', REST]),

  promo('wing_promo_chief_oversight', 1, 'promo_wing_specialist_done', [24, 62], 90,
    '[Trưởng phòng: thanh tra bất ngờ] Hội đồng cử một thanh tra đến phòng bạn mà không báo trước. Họ ngồi cạnh bàn bạn cả ngày, chỉ nhìn. Cuối ngày họ hỏi một câu duy nhất: "Nếu tôi bắt đầu từ ngày mai, tôi sẽ thấy gì khác?"',
    '[Section Chief: the unannounced inspector] The Council sends an inspector to your section without notice. They sit by your desk all day, only watching. At day’s end they ask one question: “If I began tomorrow, what would I see differently?”',
    ['Nói thật những gì sẽ khác, kể cả điều làm bạn xấu hổ', 'Say honestly what would differ, including what shames you',
      'Họ ghi lại câu trả lời, không phản ứng, và rời đi. Ba ngày sau bạn nhận quyết định thăng cấp, với lời nhắn: "Người duy nhất không nói mọi thứ đều như thường."',
      'They write down the answer, show no reaction, and leave. Three days later you receive the promotion with a message: “The only one who did not say everything is as usual.”', { standing: 8, rep: 5, wealth: 34, sanity: -2 }, 42],
    ['Nói rằng không có gì khác, và rằng đó là điều bạn tự hào', 'Say nothing would differ, and that this is what you are proud of',
      'Họ nhìn bạn rất lâu. "Hầu hết mọi người nói vậy." Họ ký, và bạn không biết mình vừa được chấm điểm vì lời nói hay vì giọng nói.',
      'They look at you a long time. “Most people say that.” They sign, and you do not know whether you were graded on the words or on the voice.', { standing: 3, network: 6, wealth: 36, sanity: -3 }, 38],
    ['Hỏi lại họ sẽ nhìn vào điều gì để xin một ngày chuẩn bị', 'Ask what they would look at, to buy a day to prepare',
      'Họ cười một chút và nói: "Hỏi như vậy là một câu trả lời." Họ cho bạn thêm một ngày, và bạn dùng nó để ngủ.',
      'They smile slightly and say: “To ask that is itself an answer.” They give you a day more, and you use it to sleep.', REST]),

  // ------------------------------------------------------------------ Section Chief -> Senior Executive
  promo('wing_promo_exec_board_vote', 2, 'promo_wing_exec_done', [35, 70], 920,
    '[Senior Executive: phiếu của Hội đồng] Bảy người trong Hội đồng sẽ bỏ phiếu về việc nhận bạn. Bạn biết ba người ủng hộ, hai người chống, và hai người chưa nói. Cả hai người chưa nói đều từng làm việc dưới trướng người tiền nhiệm của bạn.',
    '[Senior Executive: the Council’s vote] Seven members of the Council will vote on admitting you. You know three in favor, two against, and two who have not spoken. Both of the silent ones once worked under your predecessor.',
    ['Gặp riêng hai người chưa nói và hỏi họ cần gì', 'Meet the two silent members privately and ask what they need',
      'Một người cần được nghe, người kia cần được hứa. Bạn cho người thứ nhất sự yên lặng và người thứ hai một lời mà bạn chắc chắn giữ được. Phiếu bảy chọn năm, và bạn bước vào phòng họp với cả hai bàn tay trống.',
      'One needs to be heard, the other needs to be promised. You give the first your silence and the second a word you are certain you can keep. The vote is five to two, and you step into the meeting room with both hands empty.', { standing: 7, network: 14, wealth: 70, sanity: -5, rep: 5 }, 70],
    ['Chuẩn bị hồ sơ về hai người phản đối và đặt nó trên bàn trước phiên họp', 'Prepare a file on the two who oppose you and place it on the table before the session',
      'Không ai nhắc đến hồ sơ. Hai người phản đối bỏ phiếu thuận và nhìn đi chỗ khác. Bạn đã thắng, và biết rằng chiến thắng này sẽ phải được duy trì bằng chính cách đó.',
      'No one mentions the file. The two against vote in favor and look away. You have won, and know this victory will have to be maintained the same way.', { leverage: -18, standing: 4, wealth: 72, sanity: -9, network: 6 }, 68],
    ['Xin hoãn phiên bỏ phiếu để có thêm thời gian vận động', 'Ask that the vote be postponed for more time to canvass',
      'Phiên được lùi hai tuần, và hai tuần đó nói lên nhiều điều về ai muốn bạn thắng, ai muốn bạn chờ. Bạn ghi lại tất cả.',
      'The session is pushed back two weeks, and those two weeks say much about who wants you to win and who wants you to wait. You note it all.', REST]),

  promo('wing_promo_exec_quiet_room', 2, 'promo_wing_exec_done', [35, 70], 920,
    '[Senior Executive: căn phòng yên tĩnh] Một Senior Executive mời bạn vào căn phòng không có cửa sổ và không có bàn. Chỉ có hai chiếc ghế. "Tôi chỉ hỏi một điều và sẽ không nhắc lại: ai là người bạn sẽ bán trước nếu Wing cần?"',
    '[Senior Executive: the quiet room] A Senior Executive invites you into a room with no windows and no desk. Only two chairs. “I will ask one thing and will not repeat it: who would you sell first if the Wing needed it?”',
    ['Nói tên của chính bạn', 'Say your own name',
      'Căn phòng im lặng đến mức bạn nghe thấy cả tiếng tim mình. Người đối diện hỏi lại một lần, và bạn nhắc lại. Họ đứng dậy, bắt tay bạn, và nói đây là lần đầu tiên câu trả lời này không phải là một trò đùa.',
      'The room is so quiet you can hear your own heart. The other asks once more, and you repeat it. They stand, shake your hand, and say this is the first time that answer was not a joke.', { standing: 9, sanity: -6, rep: 6, wealth: 66 }, 72],
    ['Nói một cái tên và giải thích rõ lý do', 'Name a person and explain precisely why',
      'Họ ghi lại cái tên và lý do, nghiêm túc như ghi một đơn đặt hàng. Bạn được thăng cấp và, từ hôm đó, một người ở tầng dưới bắt đầu bị điều chuyển từng chút một.',
      'They write down the name and the reason, as seriously as taking an order. You are promoted, and from that day someone on a lower floor begins to be transferred bit by bit.', { standing: 5, leverage: 10, sanity: -10, wealth: 72, network: 4 }, 70],
    ['Từ chối trả lời và xin hỏi lại một câu khác', 'Decline to answer and ask to be asked something else',
      'Họ không giận. "Đó cũng là một câu trả lời, nhưng không phải là câu trả lời mà tôi cần." Họ hẹn bạn vào tuần sau, ở đúng căn phòng này.',
      'They are not angry. “That is also an answer, but not the one I need.” They set a meeting for next week, in this same room.', REST]),

  promo('wing_promo_exec_the_list', 2, 'promo_wing_exec_done', [35, 70], 920,
    '[Senior Executive: danh sách bạn ký] Bạn được giao bản thanh lọc cuối năm của cả khối, ba trăm cái tên, cần chữ ký cuối cùng của bạn trước khi gửi lên Hội đồng. Trong số đó có hai người bạn biết rất rõ và một người bạn từng nợ.',
    '[Senior Executive: the list you sign] You are handed the year-end purge for the whole division, three hundred names, awaiting your final signature before it goes to the Council. Among them are two you know well and one you once owed.',
    ['Ký toàn bộ danh sách không sửa đổi', 'Sign the entire list without changes',
      'Bút của bạn không dừng. Khi đặt xuống, tay bạn lạnh và sạch. Bạn được thăng cấp như một phần của cùng nghi thức, và không ai nhắc đến ba cái tên ấy nữa.',
      'Your pen does not stop. When you put it down, your hand is cold and clean. You are promoted as part of the same ritual, and no one mentions those three names again.', { standing: 6, sanity: -12, wealth: 70, rep: -2 }, 72],
    ['Gạch hai cái tên bạn quen và ký phần còn lại', 'Strike the two you know and sign the rest',
      'Bạn gạch, và không ai hỏi. Người thay thế họ trong danh sách là hai người bạn không biết, và bạn tự dặn mình đừng tìm hiểu họ.',
      'You strike them and no one asks. Their replacements on the list are two people you do not know, and you tell yourself not to find out who they are.', { standing: 2, sanity: -8, wealth: 66, leverage: 6, network: 4 }, 68],
    ['Từ chối ký cho đến khi có thêm ba ngày để xem lại từng tên', 'Refuse to sign until you have three more days to review each name',
      'Hội đồng cho ba ngày và ghi nhận rằng bạn đã hỏi. Bạn dùng cả ba ngày để đọc và đến cuối vẫn chưa đọc xong. Bạn ký, hoặc không, tùy vào việc bạn còn đủ can đảm hay không.',
      'The Council allows three days and notes that you asked. You spend all three reading and have still not finished by the end. You sign, or not, depending on whether you still have the courage.', REST])
];
