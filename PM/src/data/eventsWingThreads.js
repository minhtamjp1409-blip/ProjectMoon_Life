// A Wing clerk finds a ledger line that should not exist. What they do with it decides who they become on the desk
// for the next ten years: the first event opens the thread, each path has its own return and its own end.
// Flags: WingLedgerLine (thread open), WingLedgerReported / Fixed / Kept (the first choice), then the lasting
// WingDeskTrusted, WingDeskWatched, WingOwedFavor, WingCleanHands, WingSoldCopy, WingReturnedCopy, WingBurnedCopy.

const later = (eventId, delayYears, reasonVi, reasonEn) => [{ eventId, delayYears, reasonVi, reasonEn }];

export const WING_THREAD_EVENTS = [
  {
    id: 'wing_thread_stray_ledger_line', age: [21, 58], jobs: ['Wing Employee'], major: true, weight: 60,
    forbids: ['Distorted', 'WingLedgerLine'],
    vi: '[Dòng sổ thừa] Khi đối chiếu sổ cuối quý, bạn thấy một dòng chi không có số hợp đồng. Số tiền nhỏ, chữ ký của người vừa chuyển sang Section khác. Nếu kéo dòng ấy lên, cả trang bên dưới phải làm lại.',
    en: '[A line too many] At the quarter’s reconciliation you find an expense line with no contract number. The sum is small, and the signature belongs to someone who has just moved to another Section. Pull that line up and the whole page beneath it has to be redone.',
    choices: [
      {
        labelVi: 'Báo dòng sổ ấy lên Trưởng phòng của bạn',
        labelEn: 'Report the line to your Section Chief',
        resultVi: 'Trưởng phòng đọc dòng ấy hai lần, không hỏi bạn tìm thấy nó ở đâu, rồi bảo bạn viết lại bằng văn bản. Bạn viết, ký tên, và giữ một bản trong ngăn kéo của mình.',
        resultEn: 'Your Section Chief reads the line twice, does not ask where you found it, and tells you to put it in writing. You write it, sign it, and keep a copy in your own drawer.',
        effects: { rep: 2, sanity: -2 }, flagsAdd: ['WingLedgerLine', 'WingLedgerReported'],
        scheduleConsequences: later('wing_thread_audit_arrives', 2, 'Văn bản bạn ký đã đi lên các tầng', 'The paper you signed has gone up the floors')
      },
      {
        labelVi: 'Làm lại trang sổ cho khớp và không nói với ai',
        labelEn: 'Redo the page so it balances and tell no one',
        resultVi: 'Bạn làm lại ba trang trong một buổi tối. Sáng sau dòng ấy biến mất như chưa từng có, và chỉ bạn biết nó đã nằm ở đó.',
        resultEn: 'You redo three pages in one evening. By morning the line is gone as if it never existed, and only you know it was there.',
        effects: { sanity: -3, network: 1 }, flagsAdd: ['WingLedgerLine', 'WingLedgerFixed'],
        scheduleConsequences: later('wing_thread_unthanked_favor', 3, 'Có người biết trang sổ đã được sửa', 'Someone knows the page was corrected')
      },
      {
        labelVi: 'Chép lại dòng sổ bằng tay rồi đặt trang về chỗ cũ',
        labelEn: 'Copy the line by hand and put the page back',
        resultVi: 'Bạn chép bằng tay vì máy quét ghi lại mọi lần mở tủ. Bản chép nằm trong lớp lót áo khoác, nhẹ hơn một lá thư.',
        resultEn: 'You copy it by hand, because the scanner logs every time the cabinet is opened. The copy sits in your coat lining, lighter than a letter.',
        effects: { sanity: -4 }, flagsAdd: ['WingLedgerLine', 'WingLedgerKept'],
        scheduleConsequences: later('wing_thread_copy_asked_for', 4, 'Có người đang tìm một trang giấy', 'Someone is looking for a page of paper')
      }
    ]
  },
  {
    id: 'wing_thread_audit_arrives', age: [22, 70], jobs: ['Wing Employee'], major: true, weight: 0, causalOnly: true,
    requires: ['WingLedgerReported'], forbids: ['Distorted', 'WingDeskTrusted', 'WingDeskWatched'],
    vi: '[Phiên kiểm toán] Đoàn kiểm toán của Wing xuống Section vào đầu tuần. Họ không hỏi về dòng sổ. Họ hỏi vì sao bạn viết báo cáo mà không đợi lệnh.',
    en: '[The audit] The Wing audit team arrives at your Section at the start of the week. They do not ask about the ledger line. They ask why you wrote the report without waiting for an order.',
    choices: [
      {
        labelVi: 'Đứng nguyên trong báo cáo và nhận trách nhiệm',
        labelEn: 'Stand by the report and take responsibility',
        outcomes: [
          { w: 70, effects: { rep: 4, sanity: 2, standing: 8 }, meritAdd: 14, flagsAdd: ['WingDeskTrusted'],
            scheduleConsequences: later('wing_thread_chief_leaving', 3, 'Người từng nhận báo cáo của bạn được gọi lên cao hơn', 'The person who took your report is called higher'),
            resultVi: 'Bạn đọc lại từng câu mình đã viết. Người kiểm toán gập sổ, và từ hôm ấy người trong Section ngừng hạ giọng khi bạn bước vào.',
            resultEn: 'You read back every sentence you wrote. The auditor closes the ledger, and from that day people in the Section stop lowering their voices when you walk in.' },
          { w: 30, effects: { rep: -2, sanity: -5, standing: -6 }, flagsAdd: ['WingDeskWatched'],
            scheduleConsequences: later('wing_thread_watcher_closes', 2, 'Hồ sơ theo dõi tới lúc phải khép lại', 'The watch file is due to close'),
            resultVi: 'Họ ghi nhận lời bạn rồi hỏi lại cùng câu hỏi bằng ba cách khác nhau. Không ai kết luận gì, nhưng tên bạn nằm thêm một dòng trong hồ sơ theo dõi.',
            resultEn: 'They note your answer and ask the same question three different ways. Nobody concludes anything, but your name gains one more line in a watch file.' }
        ]
      },
      {
        labelVi: 'Nói bạn chỉ chép lại những gì sổ đã ghi',
        labelEn: 'Say you only repeated what the ledger already said',
        outcomes: [
          { w: 60, effects: { sanity: -1 }, meritAdd: 4, flagsAdd: ['WingDeskTrusted'],
            scheduleConsequences: later('wing_thread_chief_leaving', 3, 'Người từng nhận báo cáo của bạn được gọi lên cao hơn', 'The person who took your report is called higher'),
            resultVi: 'Câu trả lời nhỏ và đúng. Người kiểm toán gật đầu như gặp một người biết giữ mình, rồi chuyển sang bàn bên cạnh.',
            resultEn: 'Your answer is small and accurate. The auditor nods like someone meeting a person who knows how to keep safe, and moves to the next desk.' },
          { w: 40, effects: { sanity: -4, standing: -4 }, flagsAdd: ['WingDeskWatched'],
            scheduleConsequences: later('wing_thread_watcher_closes', 2, 'Hồ sơ theo dõi tới lúc phải khép lại', 'The watch file is due to close'),
            resultVi: 'Họ nhận ra bạn đang tránh. Không ai nói ra, nhưng từ tuần sau, thư của bạn đến trễ nửa ngày.',
            resultEn: 'They see that you are dodging. No one says so, but from next week your mail arrives half a day late.' }
        ]
      }
    ]
  },
  {
    id: 'wing_thread_chief_leaving', age: [24, 72], jobs: ['Wing Employee'], major: true, weight: 0, causalOnly: true,
    requires: ['WingDeskTrusted'], forbids: ['Distorted', 'WingDeskLead'],
    vi: '[Chiếc bàn trưởng ca] Trưởng phòng bạn từng báo cáo được gọi lên tầng trên. Ông để lại chìa khóa ngăn tủ cho bạn và nói đúng một câu: người ký tên sau dòng sổ ấy năm xưa vẫn còn ở trong tòa nhà này.',
    en: '[The shift lead’s desk] The Section Chief you once reported to is called to a higher floor. He leaves you the cabinet key and says exactly one thing: the person who signed that ledger line years ago is still in this building.',
    choices: [
      {
        labelVi: 'Nhận chìa khóa và ngồi vào bàn trưởng ca',
        labelEn: 'Take the key and sit at the shift lead’s desk',
        effects: { rep: 4, network: 4, standing: 8, sanity: -3 }, meritAdd: 20, flagsAdd: ['WingDeskLead'],
        resultVi: 'Bàn trưởng ca có tầm nhìn ra cả sàn làm việc, và cũng có tầm nhìn ra bạn. Từ giờ mỗi dòng sổ lạ đều đến tay bạn trước khi tới ai khác.',
        resultEn: 'The shift lead’s desk sees the whole floor, and the whole floor sees you. From now on every strange ledger line reaches your hands before anyone else’s.'
      },
      {
        labelVi: 'Trả chìa khóa và ở lại chỗ cũ',
        labelEn: 'Return the key and stay where you are',
        effects: { sanity: 3, standing: 1 }, meritAdd: 4,
        resultVi: 'Ông không tỏ ra thất vọng. Người ngồi vào bàn ấy một tháng sau là người bạn chưa từng thấy ở sàn làm việc.',
        resultEn: 'He does not look disappointed. The person who sits at that desk a month later is someone you have never seen on the floor.'
      }
    ]
  },
  {
    id: 'wing_thread_watcher_closes', age: [24, 72], jobs: ['Wing Employee'], major: true, weight: 0, causalOnly: true,
    requires: ['WingDeskWatched'], forbids: ['Distorted', 'WingDeskTrusted'],
    vi: '[Hồ sơ theo dõi đóng lại] Một người lạ từ phòng kiểm toán ngồi xuống bàn bạn giờ nghỉ trưa. Họ nói hồ sơ theo dõi sẽ đóng nếu bạn chịu chuyển sang một Section xa hơn. Họ không nói sẽ có gì ở đó.',
    en: '[The watch file closes] A stranger from the audit office sits at your desk during the lunch break. They say the watch file will close if you agree to move to a Section farther out. They do not say what waits there.',
    choices: [
      {
        labelVi: 'Nhận chuyển Section và để hồ sơ khép lại',
        labelEn: 'Accept the transfer and let the file close',
        effects: { sanity: 2, network: -3, standing: 3 }, flagsRemove: ['WingDeskWatched'], flagsAdd: ['WingDeskCleared'],
        resultVi: 'Bạn chuyển đi với một chiếc hộp giấy. Ở Section mới không ai biết bạn từng là một dòng trong hồ sơ, và bạn bắt đầu học cách để chuyện đó không bao giờ lộ.',
        resultEn: 'You move with one cardboard box. No one at the new Section knows you were once a line in a watch file, and you begin learning how to keep it that way.'
      },
      {
        labelVi: 'Từ chối và ở lại dưới sự theo dõi',
        labelEn: 'Refuse and stay under watch',
        effects: { rep: 3, sanity: -4, standing: -3 },
        resultVi: 'Họ đứng dậy mà không hỏi lại. Hồ sơ vẫn mở, và bạn có thêm một lý do để không bao giờ để sổ của mình sai một chữ.',
        resultEn: 'They stand without asking again. The file stays open, and you gain one more reason never to let your own ledger be wrong by a single character.'
      }
    ]
  },
  {
    id: 'wing_thread_unthanked_favor', age: [24, 72], jobs: ['Wing Employee'], major: true, weight: 0, causalOnly: true,
    requires: ['WingLedgerFixed'], forbids: ['Distorted', 'WingOwedFavor', 'WingCleanHands'],
    vi: '[Chiếc phong bì không đề tên] Một phong bì nằm trong ngăn kéo bạn, không đề tên người gửi. Bên trong là một lời cảm ơn viết tay và một con số Ahn. Người viết biết rõ trang sổ nào đã được sửa vào buổi tối nào.',
    en: '[The unlabeled envelope] An envelope sits in your drawer with no sender’s name. Inside are a handwritten thanks and a sum of Ahn. The writer knows exactly which ledger page was corrected on which evening.',
    choices: [
      {
        labelVi: 'Nhận số Ahn và giữ lời cảm ơn',
        labelEn: 'Take the Ahn and keep the note',
        effects: { wealth: 12, sanity: -3, network: 3 }, flagsAdd: ['WingOwedFavor'],
        scheduleConsequences: later('wing_thread_favor_called', 3, 'Một món nợ không ghi sổ đã đến hạn', 'A debt written in no ledger has come due'),
        resultVi: 'Bạn đếm lại số Ahn hai lần. Lời cảm ơn viết bằng nét chữ bạn đã thấy ở đâu đó nhưng chưa nhớ ra.',
        resultEn: 'You count the Ahn twice. The thanks are in a hand you have seen somewhere but cannot place.'
      },
      {
        labelVi: 'Đốt phong bì, không đọc lại',
        labelEn: 'Burn the envelope without rereading it',
        effects: { sanity: 4, rep: 2, standing: 3 }, flagsAdd: ['WingCleanHands'],
        resultVi: 'Bạn đốt nó trong chậu cây ở hành lang. Từ đó, khi ai đó trong Section nhắc đến chuyện sổ sách, bạn là người duy nhất không phải nghĩ xem mình nên nói gì.',
        resultEn: 'You burn it in a corridor planter. From then on, when anyone in the Section raises ledger matters, you are the only one who does not have to think about what to say.'
      }
    ]
  },
  {
    id: 'wing_thread_favor_called', age: [26, 74], jobs: ['Wing Employee'], major: true, weight: 0, causalOnly: true,
    requires: ['WingOwedFavor'], forbids: ['Distorted'],
    vi: '[Món nợ không ghi sổ] Người gửi phong bì năm xưa cuối cùng cũng xuất hiện, trong một cuộc họp có tên bạn ở dưới cùng danh sách. Họ cần một chữ ký của bạn, trên một trang mà bạn chưa được đọc.',
    en: '[The unwritten debt] The person who sent the envelope all those years ago finally appears, at a meeting where your name sits at the bottom of the list. They need your signature on a page you have not been allowed to read.',
    choices: [
      {
        labelVi: 'Ký mà không đọc',
        labelEn: 'Sign without reading',
        outcomes: [
          { w: 70, effects: { wealth: 10, network: 5, sanity: -5, standing: 4 }, meritAdd: 10, flagsRemove: ['WingOwedFavor'],
            resultVi: 'Bạn ký. Trang ấy biến mất vào một chiếc cặp màu xám, và người kia cúi chào như thể bạn vừa mua một thứ gì đó từ họ.',
            resultEn: 'You sign. The page vanishes into a gray briefcase, and the other person bows as if you had just bought something from them.' },
          { w: 30, effects: { sanity: -9, standing: -10, rep: -4 }, flagsRemove: ['WingOwedFavor'], flagsAdd: ['WingDeskWatched'],
            resultVi: 'Tờ giấy hóa ra là một biên bản đã bị đóng dấu hủy. Người kiểm toán đến vào tuần sau với chính chữ ký ấy trên bàn.',
            resultEn: 'The sheet turns out to be a minute already stamped void. An auditor arrives the next week with that same signature on the table.' }
        ]
      },
      {
        labelVi: 'Từ chối và trả lại toàn bộ số Ahn đã nhận',
        labelEn: 'Refuse and repay every Ahn you took',
        need: { stat: { wealth: [12, 100] } },
        effects: { wealth: -12, sanity: 3, rep: 3 }, flagsRemove: ['WingOwedFavor'], flagsAdd: ['WingCleanHands'],
        resultVi: 'Người kia đếm lại số Ahn, không ngạc nhiên, rồi nói họ đã đoán bạn sẽ làm vậy. Bạn không biết đó là khen hay là dự phòng.',
        resultEn: 'The other person recounts the Ahn without surprise and says they had expected you to do this. You cannot tell whether that was praise or a precaution.'
      }
    ]
  },
  {
    id: 'wing_thread_copy_asked_for', age: [25, 74], jobs: ['Wing Employee'], major: true, weight: 0, causalOnly: true,
    requires: ['WingLedgerKept'], forbids: ['Distorted', 'WingSoldCopy', 'WingReturnedCopy', 'WingBurnedCopy'],
    vi: '[Tờ giấy trong áo khoác] Có người dừng bạn ở cầu thang và nói rất nhỏ: họ biết trang chép tay của bạn còn nằm ở đâu. Họ không đe dọa. Họ chỉ mở ví và hỏi bạn muốn giữ nó bao nhiêu năm nữa.',
    en: '[The paper in the coat] Someone stops you on the stairs and says very quietly that they know where your handwritten copy still lies. They do not threaten. They only open a wallet and ask how many more years you plan to keep it.',
    choices: [
      {
        labelVi: 'Bán bản chép với giá họ đưa ra',
        labelEn: 'Sell the copy at their price',
        effects: { wealth: 25, sanity: -6, standing: -5 }, flagsAdd: ['WingSoldCopy'],
        scheduleConsequences: later('wing_thread_buyer_returns', 3, 'Người mua chưa nói hết chuyện', 'The buyer has not finished'),
        resultVi: 'Họ đếm Ahn bằng một tay, còn tay kia cầm tờ giấy lên soi dưới đèn hành lang. Giấy rất nhẹ, và bạn không ngờ mình lại thấy nhẹ theo nó.',
        resultEn: 'They count the Ahn with one hand and hold the paper under the corridor light with the other. The paper is very light, and you did not expect to feel lighter with it gone.'
      },
      {
        labelVi: 'Đưa bản chép về cho Trưởng phòng',
        labelEn: 'Hand the copy back to your Section Chief',
        effects: { rep: 4, sanity: 2, standing: 4 }, meritAdd: 8, flagsAdd: ['WingReturnedCopy'],
        resultVi: 'Trưởng phòng nhìn trang giấy lâu hơn ông cần, rồi bỏ nó vào máy hủy tài liệu ngay trước mặt bạn. Ông không nói cảm ơn. Sáng hôm sau chiếc ghế của bạn được thay bằng cái mới.',
        resultEn: 'Your Section Chief looks at the page longer than he needs to, then feeds it to the shredder in front of you. He does not say thank you. The next morning your chair has been replaced with a new one.'
      },
      {
        labelVi: 'Đốt bản chép và nói người lạ ấy đã tìm nhầm người',
        labelEn: 'Burn the copy and tell the stranger they have the wrong person',
        effects: { sanity: 3, standing: 1 }, flagsAdd: ['WingBurnedCopy'],
        resultVi: 'Bạn đốt nó ở bếp dưới tầng hầm, nơi người ta thường đốt những thứ đã hết hạn. Người lạ ấy không bao giờ hỏi lại, và bạn không bao giờ biết họ làm việc cho ai.',
        resultEn: 'You burn it in the basement kitchen, where people burn things that have expired. The stranger never asks again, and you never learn who they worked for.'
      }
    ]
  },
  {
    id: 'wing_thread_buyer_returns', age: [27, 76], jobs: ['Wing Employee'], major: true, weight: 0, causalOnly: true,
    requires: ['WingSoldCopy'], forbids: ['Distorted'],
    vi: '[Người mua quay lại] Người từng mua bản chép của bạn quay lại, lần này trong bộ đồ của một Section Chief. Họ nhớ giá bạn đã nhận. Họ hỏi bạn có còn biết điều gì khác nằm ở những trang bên cạnh không.',
    en: '[The buyer returns] The person who bought your copy comes back, this time in a Section Chief’s clothes. They remember the price you took. They ask whether you know what else sits on the pages beside it.',
    choices: [
      {
        labelVi: 'Nói những gì bạn nhớ, đổi lấy một chỗ trong phòng họ',
        labelEn: 'Tell what you remember in exchange for a place in their office',
        effects: { network: 6, wealth: 8, sanity: -7, rep: -3, standing: 5 }, meritAdd: 12,
        resultVi: 'Bạn kể, họ ghi bằng bút chì. Một tuần sau, bàn của bạn được chuyển lên tầng của họ, và người ngồi cạnh bạn nhìn bạn như nhìn một món đồ có giá.',
        resultEn: 'You tell it, and they write it in pencil. A week later your desk is moved to their floor, and the person beside you looks at you like an item with a price.'
      },
      {
        labelVi: 'Nói bạn không nhớ gì thêm',
        labelEn: 'Say you remember nothing more',
        effects: { sanity: -3, rep: 2, standing: -2 },
        resultVi: 'Họ mỉm cười như người đã nghe câu này trước đây. Không ai ép bạn. Nhưng những lần sau, họ gọi bạn bằng họ, không bằng tên.',
        resultEn: 'They smile like someone who has heard this answer before. No one presses you. But from then on they call you by surname, never by name.'
      }
    ]
  }
];
