// The Wing's own work, played as a desk rather than a contract: a file to read, a seat to take, a name to leave
// on or off a list. Two gauges run through all of it. Standing is how far your superiors trust the record;
// Leverage is what you know about other people. Leverage buys doors and costs standing the longer it is held,
// so the same scene can be answered cleanly, or with a copy kept in a drawer.

const need = (lo, hi, extra = {}) => ({ jobs: ['Wing Employee'], wingRankAtLeast: lo, wingRankAtMost: hi, ...extra });
const keep = { stat: { leverage: [30, 100] } };

// [labelVi, labelEn, resultVi, resultEn, effects, meritAdd]
const pick = ([labelVi, labelEn, resultVi, resultEn, effects, meritAdd], extra = {}) => ({
  labelVi, labelEn, resultVi, resultEn, effects, ...(meritAdd ? { meritAdd } : {}), ...extra
});

const desk = (id, age, weight, n, vi, en, choices) => ({
  id, age, major: true, weight, need: n, forbids: ['Distorted'], vi, en, choices: choices.map((c) => (c.need ? pick(c.row, { need: c.need }) : pick(c)))
});
const gated = (row, needs) => ({ row, need: needs });

export const WING_DESK_EVENTS_A = [
  // ------------------------------------------------------------------ audit: a number that does not close
  desk('wing_desk_stock_gap', [19, 60], 60, need(0, 1),
    '[Con số không khép được] Bảng kiểm kê quý này lệch đúng một khoản, nhỏ đến mức không ai muốn mất một buổi chiều vì nó. Bạn là người duy nhất đọc đến trang cuối, và khoản lệch dẫn về bàn của một trưởng phòng đang được chú ý.',
    '[The Figure That Will Not Close] This quarter’s inventory sheet is off by a single entry, small enough that no one wants to lose an afternoon to it. You are the only one who reads to the last page, and the entry leads to the desk of a section chief who is being watched.',
    [
      ['Ghi nguyên văn vào báo cáo, không thêm không bớt', 'Write it into the report exactly as found, nothing added',
        'Báo cáo lên đúng giờ. Trưởng phòng đọc nó trước mặt bạn, từng dòng một, và không nói gì cho đến dòng cuối. Hồ sơ của bạn được ghi là người không làm tròn số.',
        'The report goes up on time. The chief reads it in front of you, line by line, and says nothing until the last. Your file notes you as someone who does not round figures.', { standing: 6, rep: 2, sanity: -2 }, 3],
      ['Giữ một bản sao, nộp bản đã sửa cho khớp', 'Keep a copy and file the version corrected to close',
        'Bản đã sửa khép lại êm như một cánh cửa tốt. Bản còn lại nằm trong ngăn kéo thứ hai, và từ hôm nay bạn biết một điều về trưởng phòng mà ông ấy không biết bạn biết.',
        'The corrected version closes as smoothly as a good door. The other copy lies in the second drawer, and from today you know something about the chief that the chief does not know you know.', { leverage: 9, standing: -2, sanity: -3 }, 1],
      ['Mang thẳng đến trưởng phòng, nói riêng', 'Take it to the chief directly and speak in private',
        'Ông ấy nghe hết, rồi gấp tờ giấy làm tư. "Cảm ơn vì đã đến trước khi viết." Bạn không biết đó là lời khen hay lời nhắc, và có lẽ ông ấy cũng vậy.',
        'The chief hears it out, then folds the page in four. “Thank you for coming before you wrote.” You do not know whether that was praise or warning, and perhaps the chief does not either.', { network: 5, standing: 2, leverage: 2 }, 2]
    ]),

  desk('wing_desk_double_ledger', [21, 62], 55, need(0, 2),
    '[Hai cuốn sổ] Trong phòng lưu trữ có hai cuốn sổ chi cho cùng một dự án, cùng chữ ký, khác con số. Cuốn dày hơn nằm trên kệ có khóa, cuốn mỏng hơn nằm trong hộp chờ hủy.',
    '[Two Ledgers] In the archive room there are two ledgers of spending for the same project, same signature, different figures. The thicker one sits on a locked shelf, the thinner in a box waiting to be pulped.',
    [
      ['Báo việc có hai cuốn sổ lên phòng kiểm soát nội bộ', 'Report that two ledgers exist to internal control',
        'Phòng kiểm soát ghi nhận, cảm ơn, và hủy cả hai trong tuần sau để "đối chiếu lại từ đầu". Bạn đã làm đúng và chẳng còn gì để chứng minh điều đó.',
        'Internal control logs it, thanks you, and pulps both the following week “to reconcile from the start.” You did the right thing and have nothing left to prove it.', { standing: 5, sanity: -2, rep: 1 }, 3],
      ['Chép lại cuốn mỏng trước khi nó vào máy hủy', 'Copy the thin one out before it reaches the pulper',
        'Bạn chép đến khuya, bằng tay, vì máy in để lại dấu. Sáng hôm sau cuốn sổ biến mất, và trong ngăn kéo của bạn có một thứ chỉ còn tồn tại ở đó.',
        'You copy until late, by hand, because the printer leaves traces. The next morning the ledger is gone, and in your drawer lies something that now exists only there.', { leverage: 12, standing: -3, sanity: -4 }],
      ['Để nguyên và coi như chưa mở hộp', 'Leave it as it is and treat the box as unopened',
        'Bạn đóng nắp hộp lại đúng góc cũ. Không ai biết bạn đã thấy gì, kể cả bạn khi nghĩ lại vào ban đêm.',
        'You close the lid at the same angle. No one knows what you saw, including you when you think about it at night.', { sanity: 2, standing: 1 }]
    ]),

  // ------------------------------------------------------------------ meeting: where you sit
  desk('wing_desk_meeting_seat', [20, 60], 60, need(0, 1),
    '[Chỗ ngồi trong phòng họp] Phòng ban họp để bàn một đề xuất cắt giảm. Có hai người đối đầu và một ghế trống giữa họ. Ai ngồi vào ghế đó sẽ bị coi là đã chọn phe, dù chưa nói lời nào.',
    '[The Seat in the Meeting Room] The section meets to discuss a proposed cut. Two people face each other, with an empty chair between them. Whoever sits in it will be taken to have chosen a side without saying a word.',
    [
      ['Ngồi vào ghế trống và nói bạn chỉ muốn nghe', 'Take the empty chair and say you only want to listen',
        'Cả hai bên nhìn bạn như nhìn một quân cờ chưa biết thuộc về ai. Cuộc họp kéo dài thêm một giờ vì không ai dám nói câu cuối trước một người không chọn phe.',
        'Both sides look at you as at a piece not yet known to belong to anyone. The meeting runs an hour longer because no one dares say the last word before someone who chose no side.', { network: 6, standing: -1, leverage: 3 }, 2],
      ['Đứng sau lưng người có nhiều phiếu hơn', 'Stand behind whoever holds more votes',
        'Bạn đứng đúng chỗ. Người được bạn đứng sau gật đầu một lần, rất nhẹ, và từ đó mọi hồ sơ gửi đến bàn bạn đều đến sớm hơn một ngày.',
        'You stand in the right place. The one you stand behind nods once, very slightly, and from then on every file sent to your desk arrives a day sooner.', { standing: 5, network: 4, sanity: -2 }, 3],
      ['Đứng ở cửa, ghi biên bản, không ngồi', 'Stand at the door, take the minutes, do not sit',
        'Người ghi biên bản là người duy nhất rời phòng với cả hai phiên bản câu chuyện. Bạn viết cả hai ra, cất một bản.',
        'The minute-taker is the only one who leaves with both versions of the story. You write both out and keep one.', { leverage: 8, standing: 1, sanity: -2 }]
    ]),

  desk('wing_desk_policy_vote', [22, 62], 55, need(1, 2),
    '[Cuộc bỏ phiếu về quy định mới] Wing định siết thời gian ra ngoài Nest của nhân viên. Có người nói vì an toàn, có người nói vì muốn biết ai đi đâu. Phiếu của bạn là phiếu thứ chín trong mười bảy.',
    '[The Vote on the New Rule] The Wing intends to tighten how long staff may spend outside the Nest. Some say it is for safety, others that it is to know who goes where. Yours is the ninth ballot of seventeen.',
    [
      ['Bỏ phiếu thuận và ký tên đầy đủ', 'Vote in favor and sign in full',
        'Quy định được thông qua với hơn nửa số phiếu, và tên bạn nằm trong số đó. Ba tháng sau có người nhắc nó trước mặt bạn như một thành tích, ba năm sau có người nhắc nó như một món nợ.',
        'The rule passes with a little over half the votes, and your name is among them. Three months later someone cites it to your face as an accomplishment; three years later someone will cite it as a debt.', { standing: 4, rep: -2, network: 3 }, 3],
      ['Bỏ phiếu chống, bằng phiếu kín', 'Vote against, by secret ballot',
        'Phiếu kín không có tên, nhưng bạn thấy ánh mắt của người đếm phiếu khi đến lá thứ chín. Quy định vẫn được thông qua, chậm hơn hai tuần.',
        'The ballot carries no name, but you saw the counter’s eyes when the ninth slip came up. The rule passes anyway, two weeks later.', { sanity: 3, standing: -2, rep: 2 }],
      ['Bỏ phiếu trắng và xin ghi lý do vào biên bản', 'Abstain and ask that your reason be entered in the record',
        'Lý do của bạn được chép nguyên văn vào biên bản, ở một dòng mà sau này chẳng ai đọc. Nhưng ai đó sẽ đọc nó, vào một ngày bạn không đoán trước.',
        'Your reason is entered verbatim in a line that no one will read later. But someone will read it, on a day you cannot predict.', { leverage: 5, standing: -1, network: 2 }, 1]
    ]),

  // ------------------------------------------------------------------ purge: a list is handed to you
  desk('wing_desk_eviction_list', [24, 62], 60, need(1, 2),
    '[Danh sách rời Nest] Bạn được giao soạn lại danh sách những người phải rời Nest cuối năm. Mười một cái tên đã có sẵn. Cấp trên chỉ cần bạn kiểm tra chính tả và gửi đi.',
    '[The Departure List] You are asked to prepare the list of those who must leave the Nest at year’s end. Eleven names are already there. Your superior only needs you to check the spelling and send it on.',
    [
      ['Kiểm chính tả, gửi đi, không đọc thêm', 'Check the spelling, send it, read no further',
        'Danh sách đến đúng nơi cần đến. Có một cái tên mà bạn quen ngay khi gửi, và bạn không nhắc đến nó, kể cả với chính mình, cho đến sáng hôm sau.',
        'The list reaches where it needs to go. One of the names is familiar to you the moment it is sent, and you do not mention it, even to yourself, until the next morning.', { standing: 5, sanity: -6, network: -3 }, 3],
      ['Bỏ một tên ra và coi như lỗi nhập liệu', 'Drop one name and let it pass as a data-entry error',
        'Cái tên biến mất khỏi trang mà không ai để ý. Người đó ở lại Nest thêm một năm và không bao giờ biết vì sao.',
        'The name vanishes from the page and no one notices. That person stays in the Nest another year and never learns why.', { sanity: 3, standing: -4, leverage: 4 }],
      ['Thêm một ghi chú xin xem lại ba trường hợp', 'Attach a note asking for three cases to be reviewed',
        'Ghi chú của bạn được đọc, và một trong ba trường hợp được giữ lại. Trưởng phòng gọi bạn là "người hay thêm việc" bằng một giọng không hẳn là chê.',
        'Your note is read, and one of the three cases is kept. The chief calls you “the one who adds work” in a voice that is not quite criticism.', { standing: -1, sanity: 2, rep: 2 }, 2],
      gated(['Đối chiếu từng tên với bí mật bạn đã giữ, chọn người nào xóa được', 'Match each name against the secrets you hold and strike whoever can be struck',
        'Bạn đã biết cái tên nào cần giữ và cái tên nào nên bỏ. Ba người ở lại, một người đi, và người đi ấy là kẻ nắm bí mật về bạn. Không ai gọi đó là báo thù, kể cả bạn.',
        'You already know which name to keep and which to drop. Three stay, one goes, and the one who goes is the person holding a secret about you. No one calls it revenge, including you.', { leverage: -10, standing: -3, sanity: -5, network: 5 }, 2], keep)
    ]),

  // ------------------------------------------------------------------ field: work done outside the paper
  desk('wing_desk_night_courier', [20, 58], 55, need(0, 1),
    '[Chiếc hộp không có phiếu gửi] Trưởng phòng đưa bạn một hộp niêm phong và một địa chỉ ngoài Nest. Không có phiếu gửi, không có chữ ký nhận. "Việc này không cần giấy," ông nói, và đó là lý do bạn nên lo.',
    '[The Case With No Slip] The chief hands you a sealed case and an address outside the Nest. No dispatch slip, no receipt signature. “This job needs no paper,” the chief says, and that is the reason to worry.',
    [
      ['Giao đúng địa chỉ và không mở hộp', 'Deliver to the address and do not open the case',
        'Người nhận mở cửa trước khi bạn gõ, đếm cái hộp bằng tay chứ không bằng mắt, rồi đóng cửa. Trên đường về bạn nghe thấy một tiếng gì đó rơi từ trên cao xuống con hẻm sau lưng mình.',
        'The recipient opens the door before you knock, weighs the case by hand rather than by eye, then shuts it. On the way back you hear something fall from a height into the alley behind you.', { wealth: 8, standing: 4, sanity: -4, heat: 2 }, 3],
      ['Mở hộp ở chỗ vắng, xem trong có gì', 'Open the case somewhere quiet and see what is inside',
        'Trong hộp có một bộ chìa khóa và một bức ảnh chụp văn phòng của chính trưởng phòng bạn, nhìn từ bên ngoài cửa sổ. Bạn đóng nó lại bằng chính con dấu cũ và không biết mình đã hiểu gì.',
        'Inside are a set of keys and a photograph of your own chief’s office, taken from outside the window. You seal it again with the same old stamp and do not know what you have understood.', { leverage: 11, standing: -3, sanity: -5 }],
      ['Nhờ một người ngoài Nest đi thay', 'Ask someone outside the Nest to go in your place',
        'Người đó đi, nhận một khoản nhỏ, và trở về với một câu chuyện không ăn khớp. Trưởng phòng nghe, im lặng, và lần sau không giao việc kiểu này cho bạn nữa.',
        'They go, take a small fee, and return with a story that does not fit together. The chief listens, says nothing, and does not hand you work like this again.', { wealth: -4, network: 4, standing: -3, sanity: 2 }]
    ]),

  desk('wing_desk_outside_witness', [24, 62], 50, need(1, 2),
    '[Nhân chứng ngoài tường] Một vụ tai nạn ở xưởng của Wing có một người sống sót, và người đó ở Backstreets. Wing muốn lời khai của họ viết sao cho gọn. Bạn được cử đi nghe, vì bạn "dễ nói chuyện".',
    '[The Witness Beyond the Wall] An accident at a Wing workshop left one survivor, and that person lives in the Backstreets. The Wing wants their statement written so that it is tidy. You are sent to listen, because you are “easy to talk to.”',
    [
      ['Ghi đúng điều họ kể, kể cả phần không có lợi cho Wing', 'Write down exactly what they tell you, including what hurts the Wing',
        'Lời khai của bạn dài hơn hai trang so với bản Wing mong đợi. Bạn nộp nó và biết rằng nó sẽ được "biên tập", nhưng ít nhất có một bản đúng tồn tại trong hồ sơ gốc.',
        'Your statement runs two pages longer than the Wing expected. You file it knowing it will be “edited,” but at least one true copy exists in the original record.', { standing: -3, sanity: 3, rep: 3, leverage: 4 }, 2],
      ['Viết gọn như Wing muốn và trả họ một khoản "hỗ trợ"', 'Write it tidy as the Wing wants and pay them a “support” sum',
        'Người sống sót nhận tiền và không hỏi lời khai nói gì. Trưởng phòng hài lòng và gọi bạn là người biết đường đi nước bước.',
        'The survivor takes the money and does not ask what the statement says. The chief is pleased and calls you someone who knows the way things are done.', { wealth: -6, standing: 5, sanity: -5, network: 3 }, 3],
      ['Đưa họ vào một Office ngoài tường để có người làm chứng thứ hai', 'Bring them to an Office outside the wall to have a second witness',
        'Office nhận ghi lời họ như một Request nhỏ. Wing biết trong vòng một tuần, và bạn bị gọi lên giải thích vì sao tài liệu của họ lại có thêm một bản.',
        'The Office takes their account as a small Request. The Wing learns within a week, and you are called up to explain why their documents now have an extra copy.', { standing: -6, rep: 4, sanity: -2, leverage: 3 }]
    ]),

  // ------------------------------------------------------------------ interview: the next Feather
  desk('wing_desk_new_intern', [26, 62], 55, need(1, 3),
    '[Thực tập sinh đầu tiên của bạn] Phòng nhận một người mới và đặt họ ngồi ngay cạnh bàn bạn. Họ chép lại mọi thao tác của bạn một cách chăm chú, kể cả những thao tác bạn không muốn ai học.',
    '[Your First Intern] The section takes on a newcomer and seats them right beside your desk. They copy every move you make with great care, including the ones you would rather no one learn.',
    [
      ['Dạy họ làm đúng từng bước, kể cả phần mất thời gian', 'Teach them each step properly, including the parts that take time',
        'Họ học nhanh hơn bạn đoán. Sau nửa năm, người ngoài khó phân biệt báo cáo nào của bạn và báo cáo nào của họ, và đó vừa là niềm tự hào vừa là một nỗi lo.',
        'They learn faster than you expected. Half a year on, outsiders can hardly tell which report is yours and which is theirs, which is both a pride and a worry.', { network: 6, standing: 3, sanity: 3 }, 2],
      ['Giao họ những việc ít người muốn làm', 'Hand them the jobs few people want',
        'Họ nhận mà không phàn nàn, và đó là điều làm bạn thấy khó chịu. Bạn bắt đầu tự hỏi mình đã từng không phàn nàn đến mức nào.',
        'They accept without complaint, and that is what troubles you. You begin to ask yourself how long you once went without complaining.', { standing: 2, sanity: -3, leverage: 3 }, 1],
      ['Đưa họ một lời khuyên mà không ai từng đưa bạn', 'Give them the advice no one gave you',
        '"Đừng giữ bản sao của bất cứ thứ gì mà bạn không dám để người khác tìm thấy." Họ ghi lại câu đó, và bạn nhận ra mình vừa nói điều mình chưa làm được.',
        '“Never keep a copy of anything you would not dare let someone else find.” They write it down, and you realize you have just said what you have never managed yourself.', { sanity: 4, network: 4, leverage: -4 }]
    ]),

  desk('wing_desk_rival_applicant', [28, 62], 50, need(2, 3),
    '[Ứng viên cạnh tranh] Hai người nộp hồ sơ vào cùng một vị trí mà bạn đang giữ người kế nhiệm cho. Một người tài hơn, một người có nhiều bạn hơn. Cả hai đều từng giúp bạn một lần, ở một thời điểm bạn cần.',
    '[The Rival Applicant] Two people have applied for the position you are holding a successor slot for. One is more capable, the other has more friends. Each helped you once, at a time you needed it.',
    [
      ['Chọn người tài hơn và ký tên bảo lãnh', 'Pick the more capable one and sign as guarantor',
        'Người tài hơn nhận vị trí. Người còn lại nhìn bạn, không giận, và nói một câu mà bạn vẫn nhớ nhiều năm sau: "Cảm ơn vì đã không giả vờ."',
        'The more capable one takes the post. The other looks at you, not angry, and says a sentence you remember for years: “Thank you for not pretending.”', { standing: 4, rep: 3, network: -3, sanity: -2 }, 3],
      ['Chọn người có nhiều bạn và nhờ họ nhớ ơn', 'Pick the one with friends and let them remember the favor',
        'Người ấy lên vị trí trong sự vui vẻ của gần cả phòng. Một năm sau họ trả ơn bằng một cách mà bạn không ngờ, và bạn không chắc đó là điều bạn muốn.',
        'They rise into the post to the delight of nearly the whole section. A year later they repay you in a way you did not expect, and you are not sure it is what you wanted.', { network: 8, leverage: 4, standing: 1 }, 2],
      ['Đề nghị phòng nhân sự mở thêm một vị trí cho người còn lại', 'Ask personnel to open another post for the other applicant',
        'Phòng nhân sự trả lời bằng ba câu hỏi về ngân sách. Cuối cùng cả hai đều có chỗ, và bạn trở thành người làm tăng thêm một cái bàn trong tòa nhà vốn thiếu bàn.',
        'Personnel answers with three questions about the budget. In the end both have a place, and you become the person who added a desk to a building that was short of desks.', { standing: -2, network: 6, sanity: 3, wealth: -3 }, 2]
    ]),

  // ------------------------------------------------------------------ the Singularity room
  desk('wing_desk_singularity_demo', [26, 62], 50, need(1, 3),
    '[Buổi trình diễn trong phòng kính] Bạn được mời quan sát một lần thử Singularity trong phòng kính ở tầng dưới. Không phải để làm gì, chỉ để có mặt và ký tên rằng mình đã chứng kiến.',
    '[The Demonstration in the Glass Room] You are invited to observe a Singularity trial in a glass room on a lower floor. Not to do anything, only to be present and sign that you witnessed it.',
    [
      ['Quan sát đến cùng và ghi lại những gì mắt thấy', 'Watch to the end and write down what the eye sees',
        'Thứ trong phòng làm một việc đúng như đã định, rất đẹp, và rất ngắn. Lúc bạn ký, tay không run. Chỉ đến khi về phòng mình, bạn mới nhận ra mình đã nín thở suốt chừng ấy thời gian.',
        'The thing in the room does exactly what was intended, very beautifully and very briefly. Your hand does not shake as you sign. Only back in your office do you realize you had held your breath the whole time.', { merit: 0, standing: 3, sanity: -4, rep: 2 }, 4],
      ['Hỏi kỹ sư đang điều khiển điều gì xảy ra nếu nó không dừng', 'Ask the engineer in charge what happens if it does not stop',
        'Người kỹ sư không trả lời ngay. Rồi anh ta chỉ vào một cánh cửa thép phía sau, và bạn hiểu rằng câu hỏi này đã được hỏi trước đây, và đã có người trả giá cho nó.',
        'The engineer does not answer at once. Then points to a steel door behind and you understand the question has been asked before, and someone has paid for it.', { leverage: 8, standing: -2, sanity: -5 }, 2],
      ['Từ chối ký trước khi nhìn thấy nó làm việc', 'Decline to sign before you see it work',
        'Buổi thử bị lùi lại nửa giờ. Khi bạn ký, tên bạn nằm dưới một dòng ghi chú rằng người chứng kiến đã yêu cầu xem trước. Dòng chú thích đó theo bạn rất lâu.',
        'The trial is delayed half an hour. When you sign, your name sits beneath a note that the witness requested to see first. That note follows you for a long time.', { standing: -2, rep: 3, sanity: 2, network: 2 }, 2]
    ]),

  desk('wing_desk_unlabeled_vial', [28, 62], 45, need(2, 3),
    '[Lọ không có nhãn] Một lọ thủy tinh không nhãn bị bỏ quên trên bàn họp sau cuộc họp cuối ngày. Bên trong là một thứ chất lỏng trong suốt hơi ánh xanh. Chỉ còn bạn trong phòng.',
    '[The Unlabeled Vial] An unlabeled glass vial is left on the meeting table after the last meeting of the day. Inside, a clear liquid with a faint blue cast. You are the only one still in the room.',
    [
      ['Mang đến phòng an ninh và ghi giờ nhận', 'Take it to security and log the time of handover',
        'An ninh ghi lại, và hai người mặc đồ tối đến lấy nó trong mười phút. Không ai hỏi bạn về nó nữa, điều đó làm bạn yên tâm hơn lời cảm ơn.',
        'Security logs it, and two people in dark clothes come for it within ten minutes. No one asks you about it again, which reassures you more than any thanks.', { standing: 4, sanity: 1, rep: 1 }, 3],
      ['Cất vào ngăn kéo và chờ xem ai quay lại tìm', 'Put it in your drawer and wait to see who comes back for it',
        'Người quay lại tìm nó là một trưởng phòng mà bạn không ngờ tới, và ông ta không hỏi về cái lọ. Ông chỉ hỏi bạn có "nhìn thấy gì lạ không". Bạn nói không, và biết ông đã nghe được câu trả lời mình cần.',
        'The one who comes back for it is a section chief you did not expect, and he does not ask about the vial. He only asks if you “saw anything strange.” You say no, and know he has heard the answer he wanted.', { leverage: 14, standing: -3, sanity: -4 }],
      ['Đổ nó đi, rửa lọ và coi như chưa từng có', 'Pour it away, rinse the vial and treat it as never having existed',
        'Dòng nước chảy trong suốt xuống ống thoát. Sáng hôm sau, phòng an ninh hỏi cả tầng về một lọ bị mất. Bạn trả lời như bao người khác.',
        'The clear stream runs down the drain. The next morning security asks the whole floor about a missing vial. You answer as everyone else does.', { sanity: -3, standing: -4 }]
    ])
];
