// More ways into the dungeons. The Night in the Backstreets has one gate per Finger (each Finger
// has its own reason to be outside at 3:13), one for Fixers and Outcasts, and one for Öufi.
// Associations send their own people into the dungeon that fits their specialty; a run taken
// for the Association (`dungeonAff`) moves standing at the end, and turning it down costs a little.

const gate = ({ done, ...spec }) => ({ major: true, forbids: ['Distorted', done], ...spec });

const enter = (dungeon, done, labelVi, labelEn, resultVi, resultEn, extra = {}) => ({
  labelVi, labelEn, resultVi, resultEn, startDungeon: dungeon, flagsAdd: [done], ...extra
});

const prepare = (dungeon, done, labelVi, labelEn, resultVi, resultEn, extra = {}) => ({
  labelVi, labelEn, resultVi, resultEn, startDungeon: dungeon, dungeonPrep: 'supplies', costAhn: 12, flagsAdd: [done], ...extra
});

const decline = (done, labelVi, labelEn, resultVi, resultEn, effects, extra = {}) => ({
  labelVi, labelEn, resultVi, resultEn, effects, flagsAdd: [done], ...extra
});

const NIGHT = 'dungeon_backstreets_night';
const PREP_NIGHT = ['Chi 12 Ahn mua thuốc giữ tỉnh và một chiếc đèn bọc vải', 'Spend 12 Ahn on stay-awake tablets and a cloth-hooded lamp'];

export const DUNGEON_GATE_EVENTS_2 = [
  // ---- Night in the Backstreets, one door per Finger ----
  gate({
    id: 'gate_night_thumb_debt', done: 'gate_night_thumb_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Thumb' },
    vi: '[Con nợ mở cửa lúc 3 giờ 13] Capo đặt sổ nợ trước mặt bạn. Một chủ tiệm chỉ mở cửa sau 3 giờ 13, vì biết không người đòi nợ nào dám ở ngoài phố lúc ấy. "The Thumb không có giờ giới nghiêm", Capo nói, rồi chờ bạn đứng dậy.',
    en: '[The debtor who opens at 3:13] The Capo sets the ledger before you. A shopkeeper only opens up after 3:13, knowing no collector would dare be in the street then. “The Thumb keeps no curfew,” the Capo says, and waits for you to stand.',
    choices: [
      enter(NIGHT, 'gate_night_thumb_done', 'Nhận sổ, ra phố trước giờ', 'Take the ledger and be in the street before the hour',
        'Bạn đứng ở đầu hẻm khi đồng hồ nhảy sang 3 giờ 13. Cánh cửa tiệm vẫn khóa. Phía sau lưng bạn, có tiếng chất lỏng bắt đầu chảy.', 'You stand at the head of the alley as the clock flips to 3:13. The shop door is still locked. Behind you, liquid begins to run.'),
      prepare(NIGHT, 'gate_night_thumb_done', ...PREP_NIGHT,
        'Thằng bé bán thuốc ở chợ đêm không hỏi bạn mua để làm gì. Nó chỉ nhìn đồng hồ rồi nhìn bạn, và bớt cho bạn một đồng.', 'The boy selling tablets at the night market does not ask what they are for. He just looks at the clock, then at you, and knocks off a coin.'),
      decline('gate_night_thumb_done', 'Xin đòi vào ban ngày, chịu mất mặt trước Capo', 'Ask to collect by day, losing face before the Capo',
        'Capo gạch tên bạn khỏi việc ấy bằng một nét chậm. Tháng sau, phần chia của bạn mỏng hơn.', 'The Capo strikes you off the job with a slow stroke. Next month your cut is thinner.', { rep: -3, wealth: -3 })
    ]
  }),
  gate({
    id: 'gate_night_index_prescript', done: 'gate_night_index_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Index' },
    vi: '[Prescript lúc nửa đêm] Một Messenger dúi vào tay bạn mảnh giấy gấp tư. Prescript chỉ có một dòng: "Đứng ở ngã tư phố Bảy từ 3 giờ 13 đến 4 giờ 34. Đếm số bộ vest đi qua. Không được chạy."',
    en: '[A midnight Prescript] A Messenger presses a folded slip into your hand. The Prescript has a single line: “Stand at the Seventh Street crossing from 3:13 to 4:34. Count the suits that pass. Do not run.”',
    choices: [
      enter(NIGHT, 'gate_night_index_done', 'Ra ngã tư và bắt đầu đếm', 'Go to the crossing and begin to count',
        'Bạn đứng đúng chỗ, chân không dịch một bước. Bộ vest đầu tiên đi qua lúc 3 giờ 14. Bạn đếm thầm: một.', 'You stand on the exact spot without shifting a foot. The first suit passes at 3:14. You count silently: one.'),
      prepare(NIGHT, 'gate_night_index_done', ...PREP_NIGHT,
        'Bạn mua đèn và thuốc, rồi đọc lại Prescript để chắc nó không cấm mang theo. Nó không cấm.', 'You buy the lamp and tablets, then reread the Prescript to be sure it does not forbid them. It does not.'),
      decline('gate_night_index_done', 'Đốt mảnh giấy và ở trong nhà', 'Burn the slip and stay indoors',
        'Mảnh giấy cháy gọn. Sáng hôm sau, một Proselyte lạ đứng đợi trước cửa nhà bạn, không nói gì, chỉ ghi chép.', 'The slip burns cleanly. The next morning an unfamiliar Proselyte waits at your door, saying nothing, only taking notes.', { sanity: -4, heat: 6 })
    ]
  }),
  gate({
    id: 'gate_night_middle_name', done: 'gate_night_middle_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Middle' },
    vi: '[Cái tên trốn trong đêm] Một cái tên trong Book of Vengeance đã sống ngoài phố suốt nhiều tháng, chỉ ló mặt lúc 3 giờ 13, vì tin rằng không người anh em nào theo nổi. Người giữ sổ gõ ngón tay lên dòng ấy và nhìn bạn.',
    en: '[The name hiding in the night] A name in the Book of Vengeance has lived in the street for months, showing their face only at 3:13, sure that no sibling would follow. The keeper of the book taps the line and looks at you.',
    choices: [
      enter(NIGHT, 'gate_night_middle_done', 'Theo cái tên ra phố lúc 3 giờ 13', 'Follow the name into the street at 3:13',
        'Bạn thấy bóng người ấy ở cuối dãy phố, quay đầu nhìn lại bạn với vẻ không tin. Rồi cả hai nghe thấy tiếng chất lỏng từ cống ngầm.', 'You see their figure at the end of the street, looking back at you in disbelief. Then you both hear the liquid in the drains.'),
      prepare(NIGHT, 'gate_night_middle_done', ...PREP_NIGHT,
        'Những người anh em góp tiền mua cho bạn đèn và thuốc. Một người buộc thêm sợi xích vàng nhỏ vào cổ tay bạn, như một lời chúc.', 'The siblings chip in for your lamp and tablets. One ties a thin gold chain to your wrist, like a blessing.'),
      decline('gate_night_middle_done', 'Đợi cái tên ấy ra ban ngày, dù mất thêm nhiều tháng', 'Wait for the name to show by day, however many months it takes',
        'Người giữ sổ không nói gì, nhưng dòng ấy được giao cho một người anh em khác. Họ trở về một mình vào sáng hôm sau.', 'The keeper says nothing, but the line goes to another sibling. They come back alone the next morning.', { sanity: -3, network: -3 })
    ]
  }),
  gate({
    id: 'gate_night_ring_material', done: 'gate_night_ring_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Ring' },
    vi: '[Âm thanh của bộ vest rách] Docent muốn một tác phẩm làm từ thứ không ai giữ được: âm thanh một bộ vest Sweeper rách ra giữa đêm. "Sweepers không để lại gì", Docent nói. "Vậy hãy mang về thứ duy nhất chúng để lại: kỷ niệm của người đã thấy."',
    en: '[The sound of a tearing suit] A Docent wants a piece made from something no one can keep: the sound of a Sweeper’s suit tearing in the night. “Sweepers leave nothing,” the Docent says. “So bring back the only thing they do leave: the memory of whoever saw.”',
    choices: [
      enter(NIGHT, 'gate_night_ring_done', 'Mang máy thu âm ra phố trước 3 giờ 13', 'Take a recorder into the street before 3:13',
        'Máy thu âm chạy rè rè trong túi áo. Bạn đứng giữa đường, như một nghệ sĩ chờ khán giả, và khán giả bắt đầu đến.', 'The recorder hisses in your coat pocket. You stand in the road like an artist awaiting an audience, and the audience begins to arrive.'),
      prepare(NIGHT, 'gate_night_ring_done', ...PREP_NIGHT,
        'Bạn mua đèn, thuốc, và một cuộn băng dự phòng. Docent nói cuộn dự phòng thường là cuộn hay nhất.', 'You buy the lamp, the tablets and a spare reel. The Docent says the spare reel is usually the best one.'),
      decline('gate_night_ring_done', 'Nói với Docent rằng tác phẩm này không đáng một mạng người', 'Tell the Docent this piece is not worth a life',
        'Docent mỉm cười như thể bạn vừa nói một điều ngây thơ đáng yêu. Tên bạn được ghi vào cột học trò chưa trưởng thành.', 'The Docent smiles as if you had said something charmingly naive. Your name is entered under the immature students.', { rep: -3, sanity: 2 })
    ]
  }),
  gate({
    id: 'gate_night_pinky_duel', done: 'gate_night_pinky_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Pinky' },
    vi: '[Lời thề lúc 3 giờ 13] Kẻ phá lời thề với bạn đã chọn giờ hẹn quyết đấu: 3 giờ 13, giữa phố, không người làm chứng. Một lời thề của Pinky không có điều khoản nào cho việc từ chối giờ hẹn.',
    en: '[An oath at 3:13] The one who broke their oath to you has named the hour of the duel: 3:13, in the street, with no witness. A Pinky oath has no clause for refusing the hour.',
    choices: [
      enter(NIGHT, 'gate_night_pinky_done', 'Ra phố đúng giờ, kiếm ở tay', 'Be in the street on the hour, sword in hand',
        'Đối thủ đã đứng chờ ở giữa phố. Hai người cúi chào. Lưỡi kiếm chưa kịp chạm nhau thì cả hai đều nghe thấy tiếng bước chân thứ ba, rồi thứ tư.', 'Your opponent is already waiting mid-street. You bow. Before the blades can meet, you both hear a third set of footsteps, then a fourth.'),
      prepare(NIGHT, 'gate_night_pinky_done', ...PREP_NIGHT,
        'Bạn mài kiếm, mua đèn, và nuốt viên thuốc đầu tiên lúc 3 giờ đúng. Đối thủ cũng sẽ làm như thế, bạn nghĩ.', 'You sharpen the blade, buy a lamp, and swallow the first tablet at exactly three. Your opponent will be doing the same, you think.'),
      decline('gate_night_pinky_done', 'Không ra phố, chấp nhận lời thề của mình bị coi là gãy', 'Stay in and accept that your own oath is counted broken',
        'Sáng hôm sau, trước cửa nhà bạn có một ngón út bằng gỗ, gãy làm đôi. Không ai trong Pinky nhắc lại chuyện này, và chính điều đó là hình phạt.', 'The next morning a wooden little finger lies broken in two at your door. No one in the Pinky mentions it again, and that is the punishment.', { rep: -5, sanity: -3 })
    ]
  }),
  gate({
    id: 'gate_night_body_retrieval', done: 'gate_night_body_done', age: [18, 70], weight: 30,
    need: { jobs: ['Fixer', 'Outcast'] },
    vi: '[Trước khi Sweepers dọn] Một người mẹ trả cho bạn mọi thứ bà có. Con bà nằm ở cuối hẻm Mười Hai từ chiều, và sau 3 giờ 13 sẽ không còn gì để chôn. Bà không khóc. Bà chỉ nhìn đồng hồ.',
    en: '[Before the Sweepers clean] A mother pays you everything she has. Her child has lain at the end of Alley Twelve since afternoon, and after 3:13 there will be nothing left to bury. She does not cry. She only watches the clock.',
    choices: [
      enter(NIGHT, 'gate_night_body_done', 'Nhận tiền và đi về phía hẻm Mười Hai', 'Take the money and head for Alley Twelve',
        'Bạn đến cuối hẻm lúc 3 giờ 11. Bạn còn hai phút, và đường về dài hơn hai phút rất nhiều.', 'You reach the end of the alley at 3:11. You have two minutes, and the way back is much longer than two minutes.'),
      prepare(NIGHT, 'gate_night_body_done', ...PREP_NIGHT,
        'Bạn tiêu một phần tiền của bà để mua đèn và thuốc. Bà gật đầu, như thể đã tính trước khoản ấy.', 'You spend part of her money on a lamp and tablets. She nods, as if she had already counted on it.'),
      decline('gate_night_body_done', 'Trả lại tiền và nói thật rằng bạn sẽ không về kịp', 'Return the money and tell her honestly you would not make it back',
        'Bà nhận lại tiền và cảm ơn bạn vì đã nói thật. Đêm ấy, bà tự đi. Bạn không biết bà có về không.', 'She takes the money back and thanks you for the truth. That night she goes herself. You never learn whether she came back.', { sanity: -6 })
    ]
  }),

  // ---- Association runs: the dungeon that fits the badge ----
  gate({
    id: 'gate_assoc_zwei_carnival', done: 'gate_assoc_zwei_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'zwei' },
    vi: '[Zwei: đội cứu hộ xuống La Manchaland] Một nhóm trẻ em mất tích được thấy lần cuối gần lối xuống công viên ngầm ở District 16. Zwei lập đội hộ tống cho người đi tìm. Phòng điều phối ghi tên bạn ở vị trí đi sau cùng.',
    en: '[Zwei: a rescue team into La Manchaland] A group of missing children was last seen near the way down to the underground park in District 16. Zwei forms an escort for the searchers. Dispatch writes your name in the rear guard.',
    choices: [
      enter('dungeon_bloodfiend_carnival', 'gate_assoc_zwei_done', 'Nhận vị trí và xuống cùng đội', 'Take the post and go down with the team',
        'Cây gậy sắt của Zwei nặng trong tay. Đội tìm kiếm đi trước, và bạn là người cuối cùng thấy cửa hầm đóng lại.', 'Zwei’s iron bar is heavy in your hand. The searchers go ahead, and you are the last to see the hatch close.', { dungeonAff: true }),
      prepare('dungeon_bloodfiend_carnival', 'gate_assoc_zwei_done', 'Chi 12 Ahn mua thêm băng gạc và đèn cho đội', 'Spend 12 Ahn on extra dressings and lamps for the team',
        'Bạn chia đèn cho từng người trong đội. Không ai cảm ơn, nhưng ai cũng cầm chặt.', 'You hand a lamp to everyone on the team. No one says thanks, but everyone grips theirs tight.', { dungeonAff: true }),
      decline('gate_assoc_zwei_done', 'Xin đổi sang ca gác trên mặt đất', 'Ask to be moved to the surface watch',
        'Phòng điều phối đổi tên bạn sang ca khác mà không hỏi. Người đi thay bạn là một Fixer trẻ hơn.', 'Dispatch moves you to another shift without asking. Whoever goes in your place is a younger Fixer.', { sanity: 1 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_dieci_ruins', done: 'gate_assoc_dieci_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'dieci' },
    vi: '[Dieci: khảo sát Ruins] Dieci xác nhận một lối xuống Ruins mới mở ngoài Outskirts. Nhà nghiên cứu cần một Fixer đi trước, ghi chép và không mang gì ra ngoài mà chưa được phép.',
    en: '[Dieci: a Ruins survey] Dieci has confirmed a newly opened way down into Ruins beyond the Outskirts. The researcher needs a Fixer to go first, take notes, and bring nothing out without permission.',
    choices: [
      enter('dungeon_outskirts_ruins', 'gate_assoc_dieci_done', 'Nhận sổ khảo sát và đi trước', 'Take the survey book and go first',
        'Nhà nghiên cứu đưa bạn cuốn sổ và một cây bút chì đã gọt sẵn. "Viết những gì bạn thấy, không phải những gì bạn nghĩ", họ dặn.', 'The researcher hands you the book and a sharpened pencil. “Write what you see, not what you think,” they say.', { dungeonAff: true }),
      prepare('dungeon_outskirts_ruins', 'gate_assoc_dieci_done', 'Chi 12 Ahn mua thêm nước và dây', 'Spend 12 Ahn on extra water and rope',
        'Đám trẻ trong nhà Dieci giúp bạn cuộn dây và nhét thêm một ổ bánh vào túi, dù không ai bảo.', 'The children in Dieci’s house help you coil the rope and tuck an extra loaf into your pack, though no one told them to.', { dungeonAff: true }),
      decline('gate_assoc_dieci_done', 'Từ chối: bạn chưa sẵn sàng cho Ruins', 'Decline: you are not ready for the Ruins',
        'Nhà nghiên cứu ghi lại, không trách. Họ nói Ruins vẫn sẽ ở đó, và bạn thì có thể không.', 'The researcher notes it without reproach. They say the Ruins will still be there, and you might not be.', { sanity: 2 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_seven_lobotomy', done: 'gate_assoc_seven_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'seven' },
    vi: '[Seven: hồ sơ trong chi nhánh sụp đổ] Một khách của Seven muốn biết chuyện gì thực sự xảy ra trong một chi nhánh L Corp đã sụp. Hồ sơ nằm ở tầng dưới, và không ai từng đi xuống mà quay lên với hồ sơ.',
    en: '[Seven: files in a collapsed branch] A Seven client wants to know what really happened inside a collapsed L Corp branch. The files are on the lower floors, and no one who went down has come back up with them.',
    choices: [
      enter('dungeon_lobotomy_ruin', 'gate_assoc_seven_done', 'Nhận hồ sơ nhiệm vụ và xuống trục thông gió', 'Take the case file and go down the ventilation shaft',
        'Bạn đọc hồ sơ nhiệm vụ một lần, rồi đốt nó như Seven dặn. Những gì cần nhớ, bạn đã nhớ.', 'You read the case file once, then burn it as Seven instructs. What needs remembering, you remember.', { dungeonAff: true }),
      prepare('dungeon_lobotomy_ruin', 'gate_assoc_seven_done', 'Chi 12 Ahn mua bộ lọc khí và đèn', 'Spend 12 Ahn on a filter mask and a lamp',
        'Người bán bộ lọc hỏi bạn xuống chi nhánh nào. Bạn không trả lời, và họ gật đầu như thể đó là câu trả lời đúng.', 'The mask seller asks which branch you are going into. You do not answer, and they nod as if that were the right answer.', { dungeonAff: true }),
      decline('gate_assoc_seven_done', 'Trả hồ sơ lại cho phòng lưu trữ', 'Return the file to the archive',
        'Seven nhận lại hồ sơ, đóng dấu "đã từ chối", và cất nó vào ngăn kéo. Bạn biết ngăn kéo ấy có tên mình.', 'Seven takes the file back, stamps it “declined” and puts it in a drawer. You know that drawer has your name on it.', { sanity: 1 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_devyat_warp', done: 'gate_assoc_devyat_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'devyat' },
    vi: '[Devyat’: một chuyến hàng đi bằng WARP] Một kiện hàng của Devyat’ phải sang được bờ kia của The City trong một ngày, và chỉ có tàu WARP đủ nhanh. Hàng phải đi ở toa cuối. Không ai trong phòng phát hàng nói vì sao.',
    en: '[Devyat’: a consignment by WARP] A Devyat’ consignment must cross the City within a day, and only the WARP train is fast enough. It has to ride in the last car. No one at dispatch says why.',
    choices: [
      enter('dungeon_warp_train', 'gate_assoc_devyat_done', 'Ôm kiện hàng vào toa cuối', 'Carry the consignment into the last car',
        'Kiện hàng nhẹ hơn bạn tưởng. Cửa toa khóa lại, và bạn nhận ra mình sẽ phải giữ nó suốt hai nghìn năm trong mười giây.', 'The consignment is lighter than you expected. The car door locks, and you realize you will have to hold it for two thousand years within ten seconds.', { dungeonAff: true }),
      prepare('dungeon_warp_train', 'gate_assoc_devyat_done', 'Chi 12 Ahn mua bình dưỡng khí và dây buộc hàng', 'Spend 12 Ahn on a rebreather and cargo straps',
        'Bạn buộc kiện hàng vào lưng bằng ba lớp dây. Người phát hàng gật đầu, lần đầu tiên tỏ ra hài lòng.', 'You strap the consignment to your back in three layers. The dispatcher nods, pleased for the first time.', { dungeonAff: true }),
      decline('gate_assoc_devyat_done', 'Đề nghị đi đường bộ, dù sẽ trễ', 'Offer to go by road, though it will be late',
        'Devyat’ từ chối đề nghị của bạn và giao kiện hàng cho người khác. Hàng đến đúng hạn. Người mang thì không.', 'Devyat’ turns down your offer and hands the consignment to someone else. It arrives on time. Its carrier does not.', { sanity: -3 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_liu_lake', done: 'gate_assoc_liu_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'liu' },
    vi: '[Liu: cả nhà ra Đại Hồ] U Corp thuê nhà Liu cho một chuyến săn cá voi, trả cho cả nhà chứ không cho từng người. Người đứng đầu đọc tên những ai sẽ lên tàu trong bữa tối. Tên bạn ở giữa danh sách.',
    en: '[Liu: the whole house to the Great Lake] U Corp hires the Liu house for a whaling run, paying the house rather than each person. The head reads out who will board at dinner. Your name is in the middle of the list.',
    choices: [
      enter('dungeon_great_lake', 'gate_assoc_liu_done', 'Lên tàu cùng cả nhà', 'Board with the house',
        'Cả nhà đứng chật boong tàu, áo phao buộc chéo. Ai đó bắt đầu hát, và tiếng hát át đi tiếng chuông Luật Đại Hồ trong một lúc.', 'The whole house crowds the deck, life vests strapped crosswise. Someone starts singing, and for a while the song drowns the Lake Law bells.', { dungeonAff: true }),
      prepare('dungeon_great_lake', 'gate_assoc_liu_done', 'Chi 12 Ahn mua thêm lao móc và thuốc', 'Spend 12 Ahn on extra harpoons and medicine',
        'Bạn chia lao móc cho những người trẻ nhất trong nhà. Họ cầm như cầm quà.', 'You share the harpoons among the youngest of the house. They hold them like presents.', { dungeonAff: true }),
      decline('gate_assoc_liu_done', 'Xin ở lại giữ nhà', 'Ask to stay and keep the house',
        'Người đứng đầu đồng ý, không hỏi lý do. Khi tàu về, cả nhà kể chuyện suốt ba bữa tối, và bạn chỉ có thể nghe.', 'The head agrees without asking why. When the ship returns, the house tells stories for three dinners, and you can only listen.', { sanity: 2 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_oufi_night', done: 'gate_assoc_oufi_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'oufi' },
    vi: '[Öufi: bản án chỉ thi hành được lúc 3 giờ 13] Một kẻ phá hợp đồng đã học được rằng người thi hành Öufi cũng phải ở trong nhà khi Night in the Backstreets đến. Kẻ ấy chỉ ra đường vào giờ đó. Bản án của bạn có hiệu lực mọi giờ.',
    en: '[Öufi: a verdict only enforceable at 3:13] A contract breaker has learned that Öufi’s enforcers must also be indoors when the Night in the Backstreets comes. They only go out at that hour. Your verdict is valid at every hour.',
    choices: [
      enter(NIGHT, 'gate_assoc_oufi_done', 'Mang bản án ra phố đúng giờ', 'Carry the verdict into the street on the hour',
        'Áo choàng Öufi nặng hơn trong đêm. Bạn đọc thầm điều khoản một lần, rồi bước ra khi đồng hồ nhảy sang 3 giờ 13.', 'Öufi’s coat is heavier at night. You read the clause silently once, then step out as the clock flips to 3:13.', { dungeonAff: true }),
      prepare(NIGHT, 'gate_assoc_oufi_done', ...PREP_NIGHT,
        'Thủ kho của Öufi cấp đèn và thuốc cho bạn, kèm một biên bản ghi rõ số lượng. Bạn ký nhận.', 'Öufi’s storekeeper issues you a lamp and tablets, with a receipt listing the quantities. You sign for them.', { dungeonAff: true }),
      decline('gate_assoc_oufi_done', 'Ghi vào biên bản rằng bản án không thể thi hành an toàn', 'Record that the verdict cannot be enforced safely',
        'Öufi chấp nhận biên bản của bạn, nhưng ghi thêm một dòng bên dưới: "Người thi hành đã chọn an toàn".', 'Öufi accepts your record, but adds a line beneath: “The enforcer chose safety.”', { sanity: 1 }, { affStanding: -5 })
    ]
  }),

  // ---- what you carried out comes back ----
  {
    id: 'csq_dungeon_trophy_kept', age: [18, 99], major: true, weight: 0, causalOnly: true, requires: ['KeptDungeonTrophy'],
    vi: '[Thứ mang lên từ bên dưới] Một người lạ chờ bạn ở quán quen. Họ biết bạn đã xuống đâu, và biết bạn đã mang thứ gì lên. Họ không đe dọa. Họ đặt lên bàn một phong bì dày, và một tấm ảnh chụp cửa nhà bạn.',
    en: '[What came up from below] A stranger waits for you at your usual bar. They know where you went down, and what you brought back up. They do not threaten. They set a thick envelope on the table, and a photograph of your front door.',
    choices: [
      { labelVi: 'Bán cho họ và nhận phong bì', labelEn: 'Sell it to them and take the envelope',
        resultVi: 'Bạn giao món đồ vào ngày hôm sau. Người lạ kiểm tra nó bằng găng tay, gật đầu, và biến mất vào đám đông. Tấm ảnh cửa nhà bạn ở lại trên bàn.', resultEn: 'You hand it over the next day. The stranger examines it in gloves, nods, and vanishes into the crowd. The photograph of your door stays on the table.',
        effects: { wealth: 18, sanity: -2 }, flagsRemove: ['KeptDungeonTrophy'] },
      { labelVi: 'Giữ lại, trả phong bì và tấm ảnh', labelEn: 'Keep it, and hand back the envelope and the photograph',
        outcomes: [
          { w: 60, resultVi: 'Người lạ cất phong bì, nói rằng họ hiểu, và rời đi. Cả tháng sau không có gì xảy ra. Thứ bạn giữ vẫn nằm trong ngăn kéo, đôi khi ấm lên.', resultEn: 'The stranger pockets the envelope, says they understand, and leaves. Nothing happens for a month. What you kept lies in the drawer, sometimes growing warm.',
            effects: { resonance: 8, sanity: -3 } },
          { w: 40, resultVi: 'Một tuần sau, cửa nhà bạn bị cạy. Kẻ đột nhập không tìm được thứ họ muốn, vì bạn đã mang nó theo người. Họ để lại tấm ảnh thứ hai.', resultEn: 'A week later your door is forced. The intruder does not find what they wanted, because you carry it on you. They leave a second photograph.',
            effects: { heat: 12, sanity: -6, resonance: 6 } }
        ] },
      { labelVi: 'Giao nó cho Hana hoặc Association của bạn', labelEn: 'Hand it over to Hana or your Association',
        resultVi: 'Bạn mang món đồ đến văn phòng và ký vào ba tờ giấy. Người lạ không bao giờ xuất hiện ở quán quen nữa. Ai đó trong văn phòng nhìn bạn với chút kính nể.', resultEn: 'You bring it to the office and sign three forms. The stranger never shows up at your bar again. Someone in the office looks at you with a little respect.',
        effects: { rep: 6, sanity: 3 }, affStanding: 6, flagsRemove: ['KeptDungeonTrophy'], meritAdd: 6 }
    ]
  }
];
