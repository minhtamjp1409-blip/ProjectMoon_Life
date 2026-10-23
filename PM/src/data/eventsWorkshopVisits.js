// The Workshop is no longer a career a player can pick. It stays in the City as a place: smiths who
// forge for Fixers, Tres Association stamping every blade, Mook, Zelkova and the rest. These scenes
// are what a Fixer, a Syndicate member or a drifter sees from the customer's side of the counter.

import { M, C, I, D, AGE } from './storyKit.js';

const VISITORS = ['Fixer', 'Syndicate', 'Outcast'];

export const WORKSHOP_VISIT_EVENTS = [
  {
    id: 'wsv_abnormality_core', age: [24, 70], jobs: ['Fixer'], major: true, weight: 9, need: { grade: [1, 5] },
    forbids: ['Distorted', 'wsv_core_done'],
    vi: '[Khối hợp kim còn nhịp đập] Bạn mang ra khỏi một ca Request một lõi kim loại cắt từ Abnormality. Nó rỉ dịch đen và làm lạnh cả túi vải. Một thợ rèn ở Backstreets nhìn lõi, nhìn bạn, rồi nói ông chỉ làm được nếu bạn ở lại tôi nó. Nước thường sẽ làm nó nứt.',
    en: '[The metal that still bleeds] You carry a core of metal, cut from an Abnormality, out of a Request. It seeps black and chills the whole canvas bag. A Backstreets smith looks at the core, then at you, and says he can only do it if you stay to quench it. Ordinary water will crack it.',
    choices: [
      { labelVi: 'Ở lại, tôi lưỡi kiếm bằng máu của chính bạn', labelEn: 'Stay and quench the blade in your own blood',
        openCraftModal: true, effects: { health: -14, rep: 10, resonance: 14, wealth: -8 }, meritAdd: 16,
        flagsAdd: ['wsv_core_done', '유물'], recordsAdd: ['workshop_masterpiece'], scarsAdd: ['Thanh kiếm tôi bằng máu mình'],
        resultVi: 'Bạn rạch lòng bàn tay và để máu nhỏ vào bể. Hơi nước bốc lên đỏ và có mùi sắt. Thanh kiếm nguội lại thành màu đen, không nứt. Khi bạn cầm chuôi, nhịp đập trong kim loại khớp với tim mình.',
        resultEn: 'You cut your palm and let the blood drip into the tank. The steam rises red and smells of iron. The blade cools black and does not crack. When you grip it, the pulse in the metal matches your own.' },
      { labelVi: 'Bán lõi cho ông thợ, lấy tiền rồi đi', labelEn: 'Sell the core to the smith and take the money',
        effects: { wealth: 20, sanity: 3 }, flagsAdd: ['wsv_core_done'],
        resultVi: 'Ông cân lõi rất lâu trước khi đưa giá. Bạn nhận tiền, và đến cửa còn nghe ông tự nói rằng ông sẽ không dám đụng vào nó trước ngày mai.',
        resultEn: 'He weighs the core for a long time before naming a price. You take the money, and at the door you still hear him tell himself he will not dare touch it before tomorrow.' },
      { labelVi: 'Nhờ ông làm thêm một khẩu súng xuyên tường cho người trả cao hơn (vi phạm Taboo)', labelEn: 'Have him build a wall-piercing gun for a higher bidder (a Taboo violation)',
        effects: { wealth: 26, taboo: 1, sanity: -8, resonance: 8 }, flagsAdd: ['wsv_core_done'], scarsAdd: ['Khẩu súng phạm Taboo'],
        scheduleConsequences: [{ eventId: 'csq_taboo_workshop_raid', delayYears: 4, reasonVi: 'Khẩu súng xuyên tường lộ ra', reasonEn: 'The wall-piercing gun surfaces' }],
        resultVi: 'Viên đạn thử xé qua bốn bức tường bê tông. Người mua trả gấp đôi và không hỏi gì. Ba ngày sau, một người mặc áo B Corp đứng đối diện xưởng, chỉ nhìn.',
        resultEn: 'The test round goes through four concrete walls. The buyer pays double and asks nothing. Three days later someone in a B Corp uniform stands across from the shop, doing nothing, only watching.' }
    ]
  },
  {
    id: 'wsv_color_commission', age: [30, 95], jobs: ['Fixer'], major: true, weight: 10, requires: ['ColorFixer'],
    forbids: ['wsv_color_done'],
    vi: '[Thanh kiếm cho một cái tên] Một thợ rèn già ở Backstreets đóng cửa tiệm giữa ban ngày để gặp bạn. Ông không cần tiền. Ông chỉ muốn rèn một thanh kiếm cho người mang tên Color, một lần trong đời, và ông nói thanh kiếm ấy cần bảy ngày bạn không rời xưởng.',
    en: '[A sword for a name] An old Backstreets smith shuts his shop in broad daylight to meet you. He does not want money. He wants to forge one sword for a named Color, once in his life, and says it needs seven days with you in the shop.',
    choices: [
      { labelVi: 'Ở lại bảy ngày', labelEn: 'Stay the seven days',
        openCraftModal: true, effects: { health: -12, rep: 14, wealth: -20, resonance: 12 }, meritAdd: 12,
        flagsAdd: ['wsv_color_done', 'ColorBlade'], recordsAdd: ['workshop_masterpiece'],
        resultVi: 'Bạn ngủ ngồi trên một chiếc ghế gỗ cạnh bễ lò, thức dậy mỗi lần ông đổi nhịp búa. Ngày thứ bảy ông đặt thanh kiếm vào tay bạn và quay đi, không muốn nhìn bạn thử nó.',
        resultEn: 'You sleep upright on a wooden chair beside the bellows, waking each time he changes the rhythm of the hammer. On the seventh day he puts the sword in your hand and turns away, unwilling to watch you test it.' },
      { labelVi: 'Cảm ơn ông và từ chối, nói bạn không có thời gian', labelEn: 'Thank him and decline, saying you have no time',
        effects: { rep: -2, sanity: 2 }, flagsAdd: ['wsv_color_done'],
        resultVi: 'Ông gật đầu, mở lại cửa tiệm, và bạn nghe tiếng búa lại vang lên trước khi mình đi hết con phố, đều như chưa có ai đến.',
        resultEn: 'He nods and reopens the shop, and you hear the hammer begin again before you reach the end of the street, steady as if nobody had come.' }
    ]
  },
  {
    id: 'wsv_mook_prototype', age: [22, 68], jobs: VISITORS, major: true, weight: 8, forbids: ['Distorted', 'wsv_mook_done'],
    vi: '[Mẫu thử của Mook] Một người của Mook Workshop chặn bạn ngoài cửa hàng vũ khí và mời xem một lưỡi katana chưa đăng ký. Họ nói nó cắt không khí thành hai lớp, và chỉ cần một người đủ liều thử trước khi Tres kịp đến kiểm tra.',
    en: '[The Mook prototype] A Mook Workshop rep stops you outside a weapon shop and offers to show you an unregistered katana. They say it cuts the air into two layers, and all they need is someone reckless enough to try it before Tres inspects.',
    choices: [
      { labelVi: 'Thử lưỡi kiếm trên bãi phế liệu (Tốn 40 Ahn)', labelEn: 'Test the blade at the scrapyard (cost 40 Ahn)', costAhn: 40,
        outcomes: [
          { w: 60, effects: { wealth: -40, rep: 12, resonance: 6, sanity: 3 }, flagsAdd: ['wsv_mook_done'], meritAdd: 8,
            resultVi: 'Lưỡi kiếm đi qua một thanh thép dày như qua cái chăn, và không để lại tiếng. Người của Mook ghi vào sổ rằng bạn thử không run tay. Bạn được giữ tên trong danh sách khách trước của xưởng.',
            resultEn: 'The blade passes through a thick steel bar as through a blanket and makes no sound. The Mook rep writes that your hand did not shake. You stay on the workshop’s list of first customers.' },
          { w: 40, effects: { wealth: -40, health: -16, heat: 6 }, flagsAdd: ['wsv_mook_done'], scarsAdd: ['Vết rạch không khép của lưỡi Mook'],
            resultVi: 'Lưỡi kiếm cắt xong một nhịp sau khi bạn dừng tay. Vết rạch nằm ngang cẳng tay bạn và không chảy máu ngay, như chờ ai đó cho phép.',
            resultEn: 'The blade finishes cutting one beat after you stop. The line lies across your forearm and does not bleed at once, as if waiting for permission.' }
        ] },
      { labelVi: 'Từ chối, nói bạn không thử đồ chưa có dấu Tres', labelEn: 'Decline, saying you do not test anything without a Tres stamp',
        effects: { sanity: 4, rep: 2 }, flagsAdd: ['wsv_mook_done'],
        resultVi: 'Người của Mook ghi chép lại câu nói của bạn như thể đó cũng là một loại phản hồi hữu ích, rồi cúi đầu mời người khác.',
        resultEn: 'The Mook rep writes down your answer as if it were also useful feedback, then bows and approaches someone else.' }
    ]
  },
  {
    id: 'wsv_tres_stamp', age: [20, 72], jobs: VISITORS, major: true, weight: 9, forbids: ['Distorted', 'wsv_tres_done'],
    vi: '[Dấu của Tres] Hai thanh tra áo xám của Tres Association chặn bạn trên phố và hỏi thanh đao bên hông có số đăng ký nào không. Thanh đao ấy bạn mua từ một người thợ đã đóng cửa xưởng, và con dấu ở sống đao đã bị mài đi từ lâu.',
    en: '[The Tres stamp] Two gray-coated Tres Association inspectors stop you on the street and ask whether the sword at your hip has a registration number. You bought it from a smith who has since closed shop, and the stamp on the spine was ground off long ago.',
    choices: [
      { labelVi: 'Nộp phí đăng ký lại ở Tres (Tốn 25 Ahn)', labelEn: 'Pay Tres to register it again (cost 25 Ahn)', costAhn: 25,
        effects: { wealth: -25, rep: 5, sanity: 3 }, flagsAdd: ['wsv_tres_done'],
        resultVi: 'Thanh tra mất mười phút đo thanh đao và hai phút đóng dấu. Họ không nhìn bạn lần nào trong suốt thời gian đó. Lúc trả lại, con dấu mới nằm sát chuôi, lạnh hơn phần còn lại của lưỡi.',
        resultEn: 'The inspector spends ten minutes measuring the sword and two stamping it. They never look at you. When they hand it back, the new stamp sits near the hilt, colder than the rest of the blade.' },
      { labelVi: 'Đút lót cho thanh tra để họ bỏ qua', labelEn: 'Slip the inspector money to look away',
        outcomes: [
          { w: 55, effects: { wealth: -12, heat: 4, sanity: -4 }, flagsAdd: ['wsv_tres_done'],
            resultVi: 'Một thanh tra quay sang nhìn thứ khác, thanh còn lại nhìn bạn rất lâu rồi mới quay đi theo. Tiền biến mất vào găng tay trắng mà không ai thấy tay nào lấy.',
            resultEn: 'One inspector turns to look at something else, the other looks at you for a long time before following. The money vanishes into a white glove, and nobody sees which hand took it.' },
          { w: 45, effects: { wealth: -12, rep: -10, heat: 16 }, flagsAdd: ['wsv_tres_done'],
            resultVi: 'Thanh tra ghi số tiền vào biên bản và đọc to cho cả phố nghe. Thanh đao bị giữ lại cho tới khi bạn trả khoản phạt, và hai người đứng gần đó nhớ mặt bạn.',
            resultEn: 'The inspector enters the amount in the report and reads it aloud for the whole street. The sword is held until you pay the fine, and two bystanders remember your face.' }
        ] }
    ]
  },
  {
    id: 'wsv_ruins_alloy', age: [22, 75], jobs: VISITORS, major: true, weight: 7, forbids: ['Distorted', 'wsv_ruins_done'],
    vi: '[Quặng từ tàn tích] Một toán thợ săn tàn tích Outskirts bí mật ghé quán bạn hay ngồi. Họ mở bọc vải, bên trong là một khối kim loại cổ chưa ai gọi tên. Họ muốn bán trước khi The Head nghe tin, và hỏi bạn có biết thợ nào đủ gan nhận.',
    en: '[Ore from the ruins] A crew of Outskirts ruin hunters quietly joins you at your usual table. They open a cloth bundle: a lump of ancient metal nobody has named. They want to sell before The Head hears, and ask whether you know a smith with the nerve.',
    choices: [
      { labelVi: 'Mua khối quặng và mang tới một thợ rèn quen (Tốn 60 Ahn)', labelEn: 'Buy the ore and take it to a smith you know (cost 60 Ahn)', costAhn: 60,
        effects: { wealth: -60, resonance: 20, rep: 14, heat: 14 }, meritAdd: 14, flagsAdd: ['wsv_ruins_done'],
        resultVi: 'Người thợ rèn quen nhìn khối quặng bằng ánh mắt của người nhìn một đứa trẻ bị bỏ ngoài cửa. Ông nhận làm, và đặt nó xuống đe bằng cả hai tay.',
        resultEn: 'The smith you know looks at the ore the way one looks at a child left outside a door. He takes the job and sets it on the anvil with both hands.' },
      { labelVi: 'Nói bạn không biết ai, rồi rời quán', labelEn: 'Say you know nobody and leave the table',
        effects: { sanity: 4 }, flagsAdd: ['wsv_ruins_done'],
        resultVi: 'Bạn thanh toán phần nước của mình và đi ra. Phía sau, một người trong toán nói gì đó rất nhỏ, và cả bàn im lặng như thể đó là lời chúc.',
        resultEn: 'You pay for your own drink and walk out. Behind you, someone in the crew says something quietly, and the whole table goes silent as if it were a blessing.' }
    ]
  },
  {
    id: 'wsv_night_guard', age: [20, 66], jobs: VISITORS, major: true, weight: 8, forbids: ['Distorted', 'wsv_guard_done'],
    vi: '[Ca đêm ở lò rèn] Người thợ rèn đầu hẻm trả bạn thêm tiền để ngủ ở xưởng ba đêm. Ông nói có người cứ đứng ngoài cửa sổ lúc hai giờ sáng, và đó là lúc ông thôi tin vào cái khóa. Đêm thứ hai, kính ở tầng hầm vỡ.',
    en: '[Night watch at the forge] The smith at the end of the alley pays you extra to sleep in his shop for three nights. He says someone keeps standing outside the window at two in the morning, and that is when he stopped trusting the lock. On the second night, glass breaks in the cellar.',
    choices: [
      { labelVi: 'Xuống tầng hầm bằng búa rèn đang nóng', labelEn: 'Go down to the cellar with a hot forging hammer',
        outcomes: [
          { w: 65, effects: { health: -8, rep: 10, wealth: 14 }, meritAdd: 8, flagsAdd: ['wsv_guard_done'],
            resultVi: 'Hai kẻ phá hoại bỏ chạy khi bạn xuống tới bậc cuối, để lại một can dầu và một bó giẻ chưa kịp châm. Người thợ rèn đứng trên cầu thang với bàn tay còn run.',
            resultEn: 'The two saboteurs run when you reach the last step, leaving a can of oil and a bundle of rags they never lit. The smith stands at the top of the stairs, hands still shaking.' },
          { w: 35, effects: { health: -22, wealth: 6, sanity: -6 }, flagsAdd: ['wsv_guard_done'],
            resultVi: 'Một trong hai kẻ đã chờ sẵn sau cửa. Bạn thắng, nhưng búa nóng làm cháy lòng bàn tay bạn trước khi làm gì được hắn. Người thợ rèn bôi thuốc cho bạn đến sáng mà không nói lời nào.',
            resultEn: 'One of the pair was already waiting behind the door. You win, but the hot hammer burns your palm before it does anything to him. The smith dresses the wound until morning without a word.' }
        ] },
      { labelVi: 'Mở van hơi nước và nhốt chúng lại chờ Hana', labelEn: 'Open the steam valve and trap them for Hana',
        effects: { rep: 8, wealth: 10, sanity: 3 }, flagsAdd: ['wsv_guard_done'],
        resultVi: 'Hơi nước phủ kín tầng hầm trong mười giây. Khi các Fixer của Hana đến, hai kẻ phá hoại đang ngồi đối diện nhau cạnh cửa, mắt đỏ và không ai nói gì.',
        resultEn: 'Steam fills the cellar in ten seconds. When Hana’s Fixers arrive, the two saboteurs are sitting against the door, red-eyed and silent.' }
    ]
  },
  {
    id: 'wsv_ego_casing', age: [24, 75], jobs: ['Fixer'], major: true, weight: 9, requires: ['EGOAwakened'],
    forbids: ['Distorted', 'wsv_ego_casing_done'],
    vi: '[Chuôi cho E.G.O] Người thợ quen của bạn đề nghị làm một chuôi cầm bằng hợp kim nén ba lớp, để vũ khí E.G.O khi hiện ra có chỗ bám và không ăn ngược vào tay bạn. Ông nói chỉ cần một mẻ máu mỏng, để kim loại nhận ra ai là chủ.',
    en: '[A grip for the E.G.O] Your regular smith offers to make a handle from three-layer pressed alloy so your E.G.O has something to bind to and does not eat back into your hand when it appears. He says one thin draw of blood will do, so the metal knows its owner.',
    choices: [
      { labelVi: 'Cho ông máu, để chuôi nhận mình', labelEn: 'Give him the blood and let the grip learn you',
        effects: { health: -10, resonance: 12, rep: 10, wealth: -14 }, flagsAdd: ['wsv_ego_casing_done'],
        resultVi: 'Chuôi nguội trong vòng một phút, và lần đầu tiên sau nhiều tháng bạn thấy vũ khí hiện ra không kéo theo cơn buốt ở khuỷu tay. Người thợ rèn lau tay, nói bạn đừng thử trước khi ngủ đủ một đêm.',
        resultEn: 'The grip cools within a minute, and for the first time in months the weapon appears without the cold ache in your elbow. The smith wipes his hands and tells you not to test it before a full night’s sleep.' },
      { labelVi: 'Chỉ lấy khung đệm nano, không đưa máu', labelEn: 'Take only the nano damping frame and give no blood',
        effects: { wealth: -10, sanity: 5, resonance: 2 }, flagsAdd: ['wsv_ego_casing_done'],
        resultVi: 'Khung đệm hơi cồng kềnh, nhưng bạn biết nó chỉ là kim loại. Người thợ rèn không nài, chỉ đặt tay lên vai bạn như cách người ta tiễn một người sẽ quay lại.',
        resultEn: 'The damping frame is a little bulky, but you know it is only metal. The smith does not press, only rests a hand on your shoulder the way one sees off someone who will come back.' }
    ]
  },
  {
    id: 'wsv_apprentice_vouch', age: [26, 80], jobs: VISITORS, major: true, weight: 7, forbids: ['Distorted', 'wsv_vouch_done'],
    vi: '[Thư bảo lãnh cho đứa trẻ] Người thợ rèn quen nhờ bạn viết thư bảo lãnh cho một đứa trẻ mồ côi ở Backstreets, tay đầy vết bỏng, mắt sáng quá mức. Tres chỉ ghi tên học việc khi có một người trưởng thành chịu trách nhiệm, và ông không có ai để hỏi ngoài bạn.',
    en: '[A letter for the child] The smith you know asks you to write a letter of guarantee for an orphaned Backstreets child, hands covered in burns, eyes too bright. Tres only enters an apprentice’s name when an adult takes responsibility, and he has nobody else to ask.',
    choices: [
      { labelVi: 'Viết thư, ký tên mình', labelEn: 'Write the letter and sign it',
        effects: { rep: 6, network: 6, sanity: 4, wealth: -4 }, flagsAdd: ['wsv_vouch_done'], npcAdd: { role: 'ward', bond: 45 },
        resultVi: 'Bạn viết ba dòng và ký tên. Đứa trẻ đọc ngược từng chữ một, rồi cúi đầu thật sâu như người vừa nhận được thứ không dám giữ lâu.',
        resultEn: 'You write three lines and sign. The child reads every word upside down, then bows deeply like someone who has been handed something they dare not hold for long.' },
      { labelVi: 'Từ chối, nói bạn không muốn chịu trách nhiệm cho ai', labelEn: 'Refuse, saying you will not answer for anyone',
        effects: { sanity: -3, network: -2 }, flagsAdd: ['wsv_vouch_done'],
        resultVi: 'Người thợ rèn cúi đầu và không tỏ ra thất vọng. Hôm sau bạn đi ngang xưởng, và đứa trẻ đang quét sàn rất chăm chú, không nhìn lên.',
        resultEn: 'The smith nods and shows no disappointment. The next day you pass the shop, and the child is sweeping the floor with great care, not looking up.' }
    ]
  },
  {
    id: 'wsv_elder_blade_judge', age: [62, 140], jobs: VISITORS, major: true, weight: 8, forbids: ['wsv_elder_blade_done'],
    vi: '[Lưỡi kiếm của người trẻ] Một thợ rèn trẻ mang thanh kiếm vừa xuất lò đến nhờ bạn xem, vì bạn đã dùng vũ khí hơn bốn mươi năm. Lưỡi đẹp và cân. Nhưng bạn nhận ra một vết lấp ở phần gốc, chỗ chỉ một người từng đánh nhau thật mới thấy.',
    en: '[The young smith’s blade] A young smith brings a freshly finished sword for you to judge, since you have carried weapons for over forty years. The edge is clean and balanced. But you spot a seam near the root, a place only someone who has really fought would notice.',
    choices: [
      { labelVi: 'Nói thẳng về vết lấp', labelEn: 'Tell him about the seam plainly',
        effects: { rep: 6, sanity: 4, network: 4 }, flagsAdd: ['wsv_elder_blade_done'],
        resultVi: 'Người thợ trẻ tái mặt rồi ghi lại từng chữ bạn nói. Một tháng sau, anh gửi bạn một lưỡi dao nhỏ làm lại từ phôi đó, không đòi tiền, chỉ kèm một mẩu giấy ghi tên bạn.',
        resultEn: 'The young smith goes pale, then writes down every word. A month later he sends you a small knife made from the same billet, no charge, with a slip of paper bearing your name.' },
      { labelVi: 'Khen thanh kiếm và trả tiền công xem', labelEn: 'Praise the sword and pay for the viewing',
        effects: { sanity: -2, wealth: -3 }, flagsAdd: ['wsv_elder_blade_done'],
        resultVi: 'Anh ta cười rất rộng, và cả tuần sau đó bạn nhớ cái vết lấp ấy mỗi lần đi ngang xưởng.',
        resultEn: 'He smiles very wide, and all the following week you recall that seam each time you pass the shop.' }
    ]
  }
];

export const WORKSHOP_VISIT_MINORS = [
  M(
    'm_wsv_whetstone', AGE.GROWN, { jobs: VISITORS },
    '[Đá mài ở đầu hẻm] Người thợ rèn quen mài lại con dao của bạn khi bạn chưa kịp hỏi, và không chịu nhận tiền. Ông nói con dao này đang cắt lệch về bên trái, một thói quen của chủ.',
    '[The whetstone at the alley’s end] Your regular smith sharpens your knife before you can ask and refuses payment. He says the blade drifts left, which is a habit of the owner.',
    [
      C('Hỏi ông về thói quen đó', 'Ask him about the habit',
        'Ông chỉ cho bạn thấy tay trái bạn luôn rút về trước nửa phân khi đâm. Bạn tập sửa nó suốt một buổi tối, và con dao bắt đầu đi thẳng.',
        'He shows you your left hand always pulls forward half a finger when you thrust. You practice correcting it all evening, and the knife starts to run straight.',
        { sanity: 2, rep: 1 }),
      C('Cảm ơn rồi đi', 'Thank him and go',
        'Bạn để một túi quả khô trên bàn. Ông gật đầu như thể đó là một khoản thanh toán hợp lệ.',
        'You leave a bag of dried fruit on the counter. He nods as if it were a valid payment.',
        { network: 1 })
    ],
    I('Bạn nhún vai và để ông làm, lòng không muốn nợ ai.', 'You shrug and let him work, unwilling to owe anyone.'),
    { theme: 'work' }
  ),
  M(
    'm_wsv_scrap_cart', AGE.GROWN, { jobs: VISITORS },
    '[Xe phế liệu titan] Một phu xe đẩy qua trước mặt bạn một xe cút kít đầy mảnh titan thừa từ một công trường Wing, hét giá rẻ. Hàng không có nguồn gốc rõ, và người thợ rèn ở cuối phố đã nhắn nhờ bạn để ý loại này.',
    '[The titanium scrap cart] A cart puller shoves a barrow of titanium offcuts from a Wing site past you and shouts a cheap price. The load has no clear origin, and the smith down the street left word asking you to watch for exactly this.',
    [
      C('Mua cả xe và mang tới xưởng (Tốn 10 Ahn)', 'Buy the whole cart and bring it to the shop (cost 10 Ahn)',
        'Người thợ rèn cân từng mảnh và trả lại bạn gấp rưỡi. Ông không hỏi nguồn gốc, bạn cũng không nói.',
        'The smith weighs every piece and pays you back half again. He asks no questions about the source, and you offer no answers.',
        { wealth: 4, heat: 3 }, { costAhn: 10 }),
      C('Bỏ qua, đây là hàng của Wing', 'Pass, this is Wing property',
        'Bạn nhìn xe đi khuất. Hai ngày sau, bạn nghe tin một phu xe bị Wing giữ lại vì chuyện nào đó liên quan đến phế liệu.',
        'You watch the cart leave. Two days later you hear a cart puller was held by a Wing over something involving scrap.',
        { sanity: 1 })
    ],
    I('Bạn đi qua xe hàng mà không nhìn.', 'You walk past the cart without looking.'),
    { theme: 'work' }
  ),
  M(
    'm_wsv_knife_return', AGE.GROWN, { jobs: VISITORS },
    '[Con dao mua từ chợ] Con dao bạn mua tuần trước nóng bất thường ở phần cán, nhất là về đêm. Người thợ rèn nhận kiểm tra giúp và nhìn lâu vào mối hàn, rồi nói đây không phải hàng của ông.',
    '[The market knife] The knife you bought last week runs oddly warm at the handle, especially at night. The smith agrees to check it and looks at the weld for a long time, then says it is not his make.',
    [
      C('Mang nó đến Tres', 'Take it to Tres',
        'Một thanh tra Tres ghi số của con dao và không nói gì thêm. Một tuần sau, người bán ở chợ biến mất khỏi hàng cũ của hắn.',
        'A Tres inspector notes the knife’s number and says nothing more. A week later, the market seller vanishes from his old stall.',
        { rep: 2, network: 1 }),
      C('Để ông tháo cán và giữ lại phần lưỡi', 'Have him strip the handle and keep the blade',
        'Phần cán bị tháo ra để lộ một mẩu kim loại lạ, nhỏ như hạt gạo, vẫn còn ấm. Ông bọc nó vào vải và giấu vào ngăn kéo sâu nhất.',
        'The handle comes off to reveal a scrap of odd metal, small as a rice grain, still warm. He wraps it in cloth and tucks it into the deepest drawer.',
        { sanity: -2, resonance: 2 })
    ],
    I('Bạn bỏ con dao vào hộc tủ và không đụng tới nó nữa.', 'You put the knife in a drawer and do not touch it again.'),
    { theme: 'work' }
  ),
  M(
    'm_wsv_taboo_errand', AGE.GROWN, { jobs: VISITORS },
    '[Người lạ nhờ chuyển đơn] Một người đàn ông trùm kín mặt nhét vào tay bạn một phong bì dày và nhờ chuyển đến người thợ rèn quen, kèm một số Ahn đủ để bạn nghĩ thêm. Phong bì có mùi dầu máy, và nặng hơn tờ giấy.',
    '[A stranger’s errand] A man with his face wrapped presses a thick envelope into your hand and asks you to deliver it to the smith you know, with enough Ahn to make you think twice. The envelope smells of machine oil and is heavier than paper.',
    [
      C('Mang đi, không mở', 'Carry it and leave it sealed',
        'Người thợ rèn mở phong bì ngay tại cửa, đọc nửa trang rồi gấp lại. Ông nói bạn nên về, và đừng đi ngang con phố này mấy hôm.',
        'The smith opens the envelope at the door, reads half a page, and folds it shut. He tells you to go home and avoid this street for a few days.',
        { wealth: 8, heat: 5, sanity: -3 }),
      C('Từ chối, trả lại phong bì', 'Refuse and hand it back',
        'Người đàn ông nhận lại bằng cả hai tay, cúi đầu và biến vào đám đông như chưa từng đến.',
        'The man takes it back with both hands, bows, and vanishes into the crowd as if never there.',
        { sanity: 2 })
    ],
    I('Bạn bước qua người đó và giả vờ không nghe.', 'You step past him and pretend not to hear.'),
    { theme: 'work' }
  ),
  M(
    'm_wsv_kid_at_door', AGE.GROWN, { jobs: VISITORS },
    '[Đứa trẻ ngoài cửa xưởng] Một đứa trẻ gầy đứng nép ngoài cửa xưởng mỗi ngày bạn ghé, nhìn thợ rèn làm việc không chớp mắt. Hôm nay nó đưa bạn một mảnh kim loại nhỏ tự mài, và hỏi nó có đủ tốt để làm lưỡi dao không.',
    '[The child at the shop door] A thin child stands outside the shop each day you visit, watching the smith without blinking. Today it hands you a small piece of metal it ground itself and asks whether it is good enough to make a blade.',
    [
      C('Xem kỹ rồi nói sự thật', 'Look closely and tell the truth',
        'Mảnh kim loại lệch hai chỗ nhưng được mài bằng tay thật. Bạn nói điều đó, và đứa trẻ gật đầu rất nghiêm, như vừa nhận một điều lệnh.',
        'The piece is off in two places but was ground by real hands. You say so, and the child nods very seriously, as if receiving an order.',
        { sanity: 3, rep: 1 }),
      C('Khen và đưa thêm vài Ahn', 'Praise it and give a few Ahn',
        'Đứa trẻ cầm tiền mà không biết làm gì với nó. Cuối ngày bạn thấy nó đưa số Ahn ấy cho người thợ rèn, nhờ mua thêm phôi.',
        'The child holds the money without knowing what to do with it. At the end of the day you see it give the Ahn to the smith, asking him to buy more billets.',
        { wealth: -2, sanity: 2 })
    ],
    I('Bạn cúi đầu và đi tiếp.', 'You nod and walk on.'),
    { theme: 'work' }
  )
];

export const WORKSHOP_VISIT_DAILIES = [
  D('d_wsv_quench_smell', AGE.GROWN, { jobs: VISITORS },
    'Áo khoác bạn mang mùi dầu tôi sau một buổi chiều ngồi chờ ở xưởng. Cả buổi tối người ta nhìn bạn như thể bạn vừa trở về từ một nơi nóng hơn.',
    'Your coat smells of quenching oil after an afternoon waiting in the shop. All evening people look at you as if you had just come back from somewhere hotter.', {}),
  D('d_wsv_hammer_rhythm', AGE.GROWN, { jobs: VISITORS },
    'Tiếng búa ở xưởng đầu hẻm có nhịp riêng của ông thợ cả.',
    'The hammer at the shop at the end of the alley has the old smith’s own rhythm. You notice when it changes, then notice you are counting along.', {}),
  D('d_wsv_tres_stamp_cold', AGE.GROWN, { jobs: VISITORS },
    'Dấu Tres đóng trên sống vũ khí lạnh hơn phần kim loại còn lại. Bạn chạm vào nó khi chờ ai đó, mà không biết vì sao.',
    'The Tres stamp on a weapon’s spine is colder than the rest of the metal. You touch it while waiting for someone, not knowing why.', {}),
  D('d_wsv_sparks_window', AGE.GROWN, { jobs: VISITORS },
    'Đi ngang xưởng lúc tối, bạn thấy tia lửa tắt dần sau cửa sổ và thợ rèn ngồi nhìn chúng thật lâu, chẳng làm gì thêm.',
    'Passing the shop at dusk you see sparks die behind the window, and the smith sitting watching them for a long time, doing nothing more.', {}),
  D('d_wsv_burn_hands', AGE.GROWN, { jobs: VISITORS },
    'Người thợ rèn quen chìa tay ra để bạn trả tiền, và bạn thấy lòng bàn tay ông chai đến mức không còn vân. Bạn đặt tiền vào lòng bàn tay ấy rất nhẹ.',
    'Your regular smith holds out his hand for payment, and you see his palm is callused until the lines are gone. You set the money into it very gently.', {}),
  D('d_wsv_shop_cat', AGE.GROWN, { jobs: VISITORS },
    'Con mèo ngủ trên chiếc ghế bên bễ lò đã quen mùi bạn. Nó không nhúc nhích khi bạn ngồi xuống cạnh, chỉ mở một mắt rồi nhắm lại.',
    'The cat asleep on the chair by the bellows has learned your smell. It does not move when you sit beside it, only opens one eye and closes it again.', {})
];
