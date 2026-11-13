// The Pinky: oaths that are kept by blades. A word given to the Pinky is a debt the Pinky collects,
// and a Sworn Blade is the hand that collects it. The missions here are all some form of the same
// request: hold a promise up to the light and decide whether it is the letter or the spirit that
// binds. The Pinky keeps a ledger of both answers.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

const P = 'Pinky';

export const PINKY_EVENTS = [
  // ------------------------------------------------------------------ missions
  fe('pinky_witness_oath', P, [0, 3],
    '[Người chứng lời thề] Hai thương nhân ngồi đối diện qua chiếc bàn trống, giữa họ đặt cuộn dây đỏ bên con dao nhỏ. Họ sắp lập giao kèo ba mươi năm nên The Pinky cử bạn làm người chứng. Bạn không được nói, không được cử động, chỉ được nhìn. Đến cuối, bạn sẽ phải thốt một câu duy nhất: nó đã được lập.',
    '[Witness to an oath] Two merchants sit across an empty table, between them a coil of red thread and a small knife. They are about to swear a thirty-year pact, and the Pinky sends you as witness. You may not speak, may not move, only watch. At the end you must say one sentence: It has been sworn.',
    [
      fc('Chứng kiến trọn vẹn và nói câu cuối đúng như lệ', 'Witness fully and speak the final sentence as custom demands',
        'Hai người cùng rạch đầu ngón tay cho sợi dây đỏ thấm đủ hai giọt máu. Bạn nói ba chữ khiến cả căn phòng như nhẹ hẳn. Cuộn dây được cất vào hộp gỗ. Bạn biết mình sẽ nhớ khoảnh khắc ấy lâu hơn cả họ.',
        'Both nick a fingertip, and the red thread soaks up both drops. You speak your three words and the whole room seems to lighten. The coil is put into a wooden box, and you realize you will remember this moment longer than they will.',
        { rep: 6, network: 5, sanity: -2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nhận thấy một bên đang giấu điều gì và lên tiếng', 'Sense one side is hiding something and speak up', [
        [55, 'Bạn phá lệ lên tiếng trước, hỏi thẳng một câu. Người thương nhân tái mặt khiến buổi lễ phải hoãn lại. Hóa ra ông ta định bán khoản vay cho Syndicate khác ngay sau khi ký. Cả hai bên cảm ơn bạn theo hai kiểu rất khác nhau.', 'You break custom and speak first, asking one direct question. The merchant goes pale, and the ceremony is postponed. It turns out he meant to sell the loan to another Syndicate right after signing. Both sides thank you in very different ways.', { rep: 9, network: 6, sanity: -3 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Lời bạn thiếu căn cứ khiến cả hai thương nhân nổi giận vì buổi lễ bị phá hỏng. The Pinky phạt bạn một khoản rồi ghi vào hồ sơ dòng chữ nhắc sự vội vàng.', 'Your words have no ground, and both merchants are furious at the ceremony’s disruption. The Pinky fines you and notes a line on your record about haste.', { rep: -8, wealth: -6, sanity: -4 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Rời phòng, nói bạn không muốn chứng cho điều bạn không tin', 'Leave the room, saying you will not witness what you do not believe',
        'Hai thương nhân nhìn nhau; một người cười lạnh. The Pinky tìm người thay thế còn bạn bị ghi tên vào sổ chưa đủ lòng tin. Đêm đó bạn lại ngủ rất ngon.',
        'The two merchants look at each other and one laughs coldly. The Pinky finds another witness, and you are logged as lacking faith. But that night you sleep very soundly.',
        { sanity: 4, rep: -5, network: -2 }, { flagsAdd: ['pinky_bent_word'] })
    ], { weight: 11 }),

  fe('pinky_sworn_blade_delivery', P, [1, 3],
    '[Thanh kiếm cho người lập thệ] Đao thủ trẻ sắp lập thệ trọn đời với The Pinky, theo lệ phải nhận thanh kiếm rèn từ sao ngay từ tay Sworn Blade. Hôm nay người trao là bạn. Thanh kiếm nằm trong vỏ gỗ cũ, nặng hơn vẻ ngoài. Cậu đã đứng chờ ở tháp chuông từ rạng sáng.',
    '[A sword for the oath-taker] A young swordsman is about to swear a lifelong oath to the Pinky and by custom must receive a star-forged sword from the hand of a Sworn Blade and appoint it as their one and only. Today that is you. The sword lies in an old wooden scabbard, heavier than it looks. The swordsman has waited at the bell tower since dawn.',
    [
      fc('Trao kiếm đúng nghi thức, không nói thêm', 'Hand over the sword by the rite and say no more',
        'Người đao thủ cúi đầu rất sâu, hai tay đón kiếm chẳng ngước nhìn bạn. Chuông tháp điểm đúng một tiếng. Cả hai lắng nghe tiếng chuông ngân dài, im lặng mãi đến lúc âm vang tắt hẳn.',
        'The swordsman bows very deep, receives the sword with both hands, and does not look at you. The tower bell strikes once. You both hear it ring long, and neither speaks until it fades.',
        { rep: 5, sanity: -1, network: 4 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nhắc người đao thủ rằng họ vẫn có thể từ chối', 'Remind the swordsman they may still refuse', [
        [55, 'Người ấy im lặng rồi đáp: Tôi biết. Cậu đón lấy kiếm. Lần đầu tiên bạn chứng kiến một lời thề được lập với đôi mắt hoàn toàn mở. Tên cậu ghi vào sổ Pinky bằng nét mực đậm hơn.', 'The swordsman is silent a long while. Then says: I know. They take the sword, and for the first time you see an oath sworn with eyes wide open. Their name is entered in the Pinky with a heavier stroke.', { rep: 7, sanity: 3, network: 5 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Người đao thủ hoảng hốt rút lui, chạy xuống cầu thang tháp rồi biệt tích suốt một tháng. The Pinky ghi rằng bạn đã làm lung lay lòng thề của người khác.', 'The swordsman panics and withdraws. They go off down the tower stairs and no one finds them for a month. The Pinky records that you shook a man’s resolve.', { rep: -6, sanity: -5, network: -3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Trao kiếm, kèm một lời chúc của riêng bạn', 'Hand it over with a wish of your own',
        'Bạn nói khẽ về chuyện giữ lời mà không biến nó thành gánh nặng. Người đao thủ nhìn bạn hồi lâu rồi khẽ mỉm cười. Từ dạo ấy, mỗi lần chạm mặt ở hành lang cậu đều cúi chào trước.',
        'You say a quiet line about keeping one’s word without being crushed by it. The swordsman looks at you long, then smiles faintly. From that day each time they see you in a corridor, they bow first.',
        { sanity: 3, network: 6, rep: 4 })
    ]),

  fe('pinky_hunt_oathbreaker', P, [1, 3],
    '[Kẻ bội ước] Một người của The Pinky đã vi phạm lời thề, ôm bốn mươi lượng bạc công quỹ bỏ trốn. Tên hắn bị ghi vào sổ đen nên bạn nhận lệnh đi tìm. The Pinky không dặn phải làm gì lúc gặp mặt, chỉ bảo tới lúc đó bạn sẽ tự biết.',
    '[The oathbreaker] A member of the Pinky has violated their oath and fled with forty silver of the treasury. Their name is added to the black list, and you are ordered to find them. The Pinky does not say what to do when found. Only that you will know.',
    [
      fg('Tìm ra và đưa hắn về trước The Pinky', 'Find them and bring them before the Pinky', [
        [55, 'Hắn sống trong căn phòng nhỏ cùng vợ con, đem số bạc đi chữa bệnh cho đứa lớn. Hắn không chống cự. Lúc bạn áp giải về, The Pinky nghe rõ đầu đuôi bèn giảm nửa án phạt. Bạn đứng ngay sau lưng hắn suốt buổi xét xử.', 'They live in a small room with spouse and two children, and used the silver to treat the elder child’s illness. They do not resist. When you bring them back, the Pinky hears the story and halves the sentence. You stand behind them the whole hearing.', { rep: 8, sanity: -4, network: 5 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Hắn vừa thấy bóng bạn đã vội bỏ chạy khiến bạn mất ba ngày truy đuổi qua đủ ngõ hẻm nhà ga. Khi bắt kịp, trên người hắn chỉ còn chiếc áo sờn vai làm bạn mất cả sức lẫn hứng thú.', 'They bolt on sight of you, and you lose three days chasing through alleys and stations. When you catch up they own nothing but a worn coat, and you have lost both strength and appetite.', { health: -10, rep: 3, sanity: -6 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Tìm thấy rồi để hắn đi sau khi lấy lại số bạc còn dư', 'Find them and let them go after retrieving the remaining silver',
        'Bạn thu lại hai phần ba số bạc rồi báo về chỉ tìm thấy một phần. The Pinky ghi chú rất ngắn.',
        'You recover two thirds of the silver and report finding only part. The Pinky notes it very briefly.',
        { rep: -2, sanity: -3, wealth: 4 }, { flagsAdd: ['pinky_bent_word'] }),
      fc('Từ chối nhiệm vụ, nói bạn không săn người cùng thề', 'Refuse the task, saying you do not hunt someone who swore beside you',
        'The Pinky lặng đi rồi chuyển việc cho một Sworn Blade khác. Ba tuần sau kẻ bội ước bị bắt về; bạn không hỏi thêm chuyện gì xảy ra. Từ đó những việc nhạy cảm chẳng đến tay bạn nữa.',
        'The Pinky is silent, then hands the task to another Sworn Blade. Three weeks later the oathbreaker is found, and you ask what happened. From then on sensitive tasks no longer reach your hands.',
        { sanity: 2, rep: -8, network: -4 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [24, 90] }),

  fe('pinky_bell_tower_watch', P, [0, 3],
    '[Ca gác tháp chuông] Đêm ấy bạn gác một mình trên tháp chuông cũ của The Pinky, cây nến đặt bên, thanh kiếm gác ngang đầu gối. Chuông chỉ ngân khi có kẻ bội ước mà mười năm nay nó nằm im lìm. Sang canh ba, từ trong lòng chuông vọng ra âm thanh lạ bạn chưa từng nghe.',
    '[Watch in the bell tower] A night of watch in the Pinky’s old bell tower, alone, with a candle and a sword across your knees. The bell rings only when someone breaks an oath, and has not rung in ten years. In the third hour you hear a sound you do not recognize from inside the bell.',
    [
      fc('Ngồi yên, lắng nghe, không động đậy', 'Sit still, listen, do not stir',
        'Âm thanh ấy hóa ra là tiếng thở dài rất khẽ như người đang ngủ say. Tới sáng thì dứt hẳn. Bạn không kể cho ai nghe, nhưng từ đêm ấy bạn thôi sợ thứ trước kia mình chẳng rõ vì sao lại sợ.',
        'The sound turns out to be a very faint sigh, like that of someone sleeping. By morning it stops. You tell no one, but from that night you cease to fear something you had not known you feared.',
        { sanity: 2, rep: 4, network: 2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Leo lên kiểm tra bên trong lòng chuông', 'Climb up and check the inside of the bell', [
        [50, 'Bạn thấy chú chim nhỏ làm tổ gọn trong lòng chuông. Nó đã ở đây lâu lắm vì lót cả lớp lông vũ dày. Bạn tụt thang xuống chẳng báo cáo, bởi chẳng ai muốn khuấy động quả chuông.', 'You find a small bird has built a nest inside the bell. It has been there a long time, with a thick layer of down. You climb down and do not report, because no one would want the bell disturbed.', { sanity: 3, rep: 1, network: 3 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Tay bạn vừa chạm vào lòng chuông, nó liền ngân lên một tiếng đơn lẻ, trầm mà vang dài. Cả tháp rung nhẹ; bên dưới tiếng người gọi nhau í ới. Bạn phải giải trình vì sao chuông ngân khi không có ai bội thề.', 'As you touch the inside of the bell, it rings a single low, long note. The whole tower trembles, and below people call out to each other. You must explain why the bell rang when no oath was broken.', { rep: -7, sanity: -6 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Gọi một người gác khác lên cùng', 'Call another watcher up to join you',
        'Hai người ngồi cạnh nhau suốt đêm; âm thanh kỳ lạ vừa có người thứ hai tới liền tắt ngấm. Người gác kia bảo chuyện đó xảy ra hoài: quả chuông chỉ chịu để một người nghe chứ không chịu hai.',
        'The two of you sit side by side all night, and the sound stops when the other arrives. The other watcher says this often happens. They say the bell wants only one listener, not two.',
        { sanity: 1, network: 5, rep: 1 })
    ]),

  fe('pinky_secret_ledger_courier', P, [1, 3],
    '[Sổ cái bí mật] Bạn phải mang cuốn sổ cái nhỏ bọc da đen từ Nest này sang Nest khác, vượt qua ba trạm kiểm soát cùng hai khu Backstreets. Không ai được biết bên trong viết gì, kể cả bạn. The Pinky dặn kẻ nào lén mở sẽ phải trả giá bằng thứ mình không muốn mất.',
    '[The secret ledger] You must carry a small black-leather ledger from one Nest to another, through three checkpoints and two Backstreets districts. No one must know what it holds, including you. The Pinky says whoever opens it will pay with something you would not want to pay.',
    [
      fc('Mang đi, không mở, không dừng', 'Carry it, unopened, without stopping',
        'Bạn tới nơi đúng hẹn để người nhận ký xác nhận mà chẳng liếc nhìn bạn. Suốt đường về, cuốn sổ trong ký ức lại nặng hơn hẳn lúc còn nằm trên tay.',
        'You arrive on time, and the recipient signs for it without looking at you. All the way back the ledger weighs more in memory than it did in hand.',
        { rep: 6, wealth: 6, sanity: -2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Mở một trang để biết mình đang mang gì', 'Open one page to know what you carry', [
        [50, 'Trang giấy chỉ kẻ cột tên người với cột tiền bạc. Dòng cuối ghi đúng tên bạn bên cạnh con số bạn chẳng hiểu. Bạn gập sổ lại, đôi tay lạnh ngắt, nốt quãng đường còn lại không dám nhìn mặt ai.', 'The page holds only a column of names and a column of sums. The last name is yours, with a figure you do not recognize. You shut it, hands ice cold, and reach your destination without daring to look at anyone.', { sanity: -9, rep: 3 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Trang ấy chép bài thề cổ bằng thứ chữ bạn đọc không ra. Cả buổi chiều tiếng lẩm bẩm cứ vẳng trong đầu. Lúc giao sổ, người nhận nhìn bạn thật lâu rồi bảo họ biết bạn đã mở xem.', 'The page is an old oath in a script you cannot read. All afternoon you hear murmuring in your head, and on arrival the recipient looks at you a long while and says they know you opened it.', { sanity: -7, rep: -6 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Giao sổ cho một người khác tin cậy mang hộ', 'Hand the ledger to someone trusted to carry it',
        'Người ấy nhận không hỏi một câu rồi chuyển tới nơi an toàn. The Pinky nghe chuyện bèn nhìn bạn thật lâu, bảo tuy bạn chưa phá thề nhưng đã bẻ cong nó; họ ghi lại điều ấy vào sổ.',
        'They accept without asking and carry it safely. The Pinky hears and regards you a long moment. They say you did not break the oath, but you bent it, and they note that.',
        { sanity: 1, rep: -3, network: 3 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [24, 90] }),

  fe('pinky_vow_trial', P, [1, 3],
    '[Thử lòng thề] Có người xin gia nhập The Pinky nên bạn được giao bài thử lòng thề. Cách thử: bắt họ hứa một chuyện nhỏ rồi dựng cảnh giữ lời phải trả giá đắt. Hôm nay lời hứa là giữ kín tên người nọ, còn tình huống bạn bày ra là đứa trẻ đang bị uy hiếp.',
    '[Testing the vow] A candidate seeks to join the Pinky, and you are assigned to test their vow. The method: let them promise something small, then construct a situation in which keeping it is costly. Today the promise is to tell no one a certain name, and the situation you prepared is a child under threat.',
    [
      fc('Làm bài thử đúng như được giao', 'Carry out the test exactly as assigned',
        'Ứng viên đứng sững, mồ hôi rịn đầy trán nhưng nhất quyết không mở miệng đọc tên. Đứa trẻ hóa ra chỉ là diễn viên; lúc màn thử khép lại, ứng viên trừng mắt nhìn bạn chẳng thốt nửa lời. Bạn không thấy hãnh diện chút nào.',
        'The candidate stands still, sweat dripping from the brow, and does not speak the name. The child in the scene turns out to be an actor, and when the test ends the candidate looks at you a long while without a word. You are not proud.',
        { rep: 5, sanity: -6, network: -3 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nói với ứng viên trước rằng đây chỉ là một bài thử', 'Tell the candidate beforehand that this is only a test', [
        [55, 'Ứng viên thoáng ngạc nhiên rồi phá lên cười rất lớn. Họ bảo mình biết sẵn từ đầu nhưng vẫn chọn giữ thề dù chuyện gì xảy ra, bởi lời thề chỉ có nghĩa như thế. Bạn ghi vào hồ sơ: Đáng tin.', 'The candidate is surprised then laughs very loudly. They say they knew, and had decided to keep the vow whatever, since that is what a vow means. You write in the file: Trustworthy.', { rep: 6, sanity: 3, network: 5 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'The Pinky biết bạn lộ đề bèn hủy ngang bài thử. Ứng viên bị hoãn lại một năm còn bạn ăn án cảnh cáo vì phá vỡ quy trình.', 'The Pinky learns you revealed it and voids the test. The candidate is deferred a year, and you are warned for spoiling the process.', { rep: -8, sanity: -4 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối, nói không thể đem trẻ con ra thử lòng thề', 'Refuse, saying a vow cannot be tested with a child',
        'The Pinky nghe lý do xong lặng im hồi lâu rồi bảo bài thử sẽ được viết lại.',
        'The Pinky hears the reason and is silent a very long time. Then says the test will be redesigned.',
        { sanity: 4, rep: -2, network: 3 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [26, 90] }),

  fe('pinky_blood_contract', P, [0, 3],
    '[Giao kèo bằng máu] Đoàn thương nhân xin đóng dấu máu của The Pinky để bảo chứng chuyến hàng xuyên bốn District. Bạn là người cầm triện. Theo lệ, giao kèo vỡ thì người đóng dấu gánh một phần trách nhiệm, bị bẻ cong lại gánh thêm phần nữa.',
    '[A contract in blood] A merchant caravan requests a contract stamped with the Pinky’s blood seal to guarantee a shipment across four Districts. You are the one who stamps. By custom the stamper bears part of the responsibility if the contract is broken, and another part if it is bent.',
    [
      fc('Đóng dấu, đọc kỹ từng điều khoản trước', 'Stamp it, having read every clause first',
        'Bạn nhặt ra hai điều khoản lập lờ rồi bắt sửa rõ. Đám thương nhân càu nhàu nhưng chịu ký lại. Chuyến hàng cập bến bình yên; mỗi lần nghe nhắc tên giao kèo ấy bạn vẫn nhớ cảm giác nặng tay của chiếc triện đỏ.',
        'You find two vague clauses and demand clarification. The merchants grumble but sign again. The shipment arrives safely, and each time you hear that contract’s name, you recall the feel of the red stamp in your hand.',
        { rep: 7, wealth: 6, network: 4, sanity: -1 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Đóng dấu ngay vì họ đang vội', 'Stamp it at once because they are in a hurry', [
        [55, 'Chuyến hàng trót lọt nên các thương nhân biếu thêm bạn chút thưởng nhỏ. Nhưng cả tuần ấy bạn cứ nghĩ tới những dòng mình chưa kịp đọc, nghe tin tức từ bốn District là lại giật thót.', 'The shipment goes smoothly, and the merchants give you a small bonus. But all week you think of the clauses you did not read, and each news item from the four Districts startles you.', { wealth: 8, rep: 3, sanity: -5 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Sang District thứ ba có điều khoản bị hiểu chệch làm chuyến hàng bị ách lại. The Pinky gọi bạn lên giải trình; phần bạn phải gánh là nửa tổn thất.', 'A clause is misread in the third District, and the shipment is held. The Pinky calls you in to account, and your share is half the loss.', { wealth: -12, rep: -7, sanity: -5 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối đóng dấu, nói giao kèo không hợp lệ', 'Refuse to stamp, saying the contract is invalid',
        'Các thương nhân tức tối đi tìm người Pinky khác. Bạn nghe tin họ kiếm được người ký rồi chuyến hàng gãy gánh giữa đường. Một Sworn Blade già đi ngang hành lang nhìn bạn, gật đầu rất khẽ.',
        'The merchants are angry and seek another Pinky. You hear they found one, and the shipment fails midway. An old Sworn Blade glances at you passing in the corridor and nods very slightly.',
        { sanity: 3, rep: 3, wealth: -3 }, { flagsAdd: ['pinky_kept_word'] })
    ]),

  fe('pinky_unlawful_order', P, [1, 3],
    '[Lệnh trái lời thề] Sovereign của The Pinky ra lệnh bắt bạn làm việc nghịch hẳn lời thề bạn lập cùng người ngoài trước khi nhập hội. Lời thề nào cũng chính đáng nhưng không thể giữ trọn cả đôi. Bạn kẹt cứng ở giữa mà chẳng ai muốn giúp.',
    '[An order against your oath] A Sovereign of the Pinky orders you to do something that goes against an oath you swore to another before joining. Both oaths are valid, and cannot both be kept. You stand between, and no one wishes to help.',
    [
      fc('Giữ lời thề với The Pinky, phá lời thề cũ', 'Keep the oath to the Pinky and break the old one',
        'Bạn thi hành mệnh lệnh. Người giữ lời thề cũ không nói tiếng nào, chỉ nhìn bạn một lúc. Đêm đó bạn ngồi viết thư giải thích rồi châm lửa đốt trước lúc gửi. Bạn không tự tay bội ước, nhưng lời thề đã vỡ nát ngay trong tay bạn.',
        'You carry out the order. The holder of your old oath says nothing, only looks at you a long while. That night you write a letter explaining and burn it before sending.',
        { rep: 5, sanity: -9, network: -4 }, { flagsAdd: ['pinky_bent_word'] }),
      fg('Giữ lời thề cũ, từ chối lệnh của Sovereign', 'Keep the old oath and refuse the Sovereign’s order', [
        [50, 'Sovereign nghe xong, hồi lâu mới bảo ông vốn chờ xem bạn chọn đường nào. Ông nói kẻ dám giữ lời thề đầu tiên bất chấp lệnh trên mới là người The Pinky cần nhất, rồi rút lại mệnh lệnh.', 'The Sovereign hears you and long after says he was waiting to see what you chose. He says one who dares keep the first oath above all, even against orders, is who the Pinky needs most. He withdraws the order.', { rep: 9, sanity: 4, network: 6 }, { flagsAdd: ['pinky_kept_word'] }],
        [50, 'Sovereign lặng thinh nghe hết. Ba ngày sau một Sworn Blade khác đi làm việc đó còn bạn bị gạch khỏi sổ tín nhiệm. Bạn giữ được lời thề nhưng đánh mất con đường nó mở ra.', 'The Sovereign hears. Three days later another Sworn Blade does the task, and you are struck from the trust list. You keep your oath, and lose the road it led to.', { rep: -9, sanity: 2, network: -3 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Xin Sovereign cho một đêm để suy nghĩ', 'Ask the Sovereign for one night to think',
        'Ông gật đầu cho phép. Bạn ngồi một mình trên tháp chuông nghĩ thấu cả hai lời thề rồi hôm sau đưa ra câu trả lời ngay chính bạn cũng không ngờ tới. Cả hai phía đều chẳng hoàn toàn vừa lòng.',
        'He grants it. You sit alone in the bell tower thinking of both oaths, and the next day give an answer even you did not foresee. Neither side is entirely satisfied.',
        { sanity: -3, rep: 2, network: 2 })
    ], { age: [28, 90], weight: 11 }),

  fe('pinky_hostage_oath', P, [1, 3],
    '[Con tin và lời thề] Gia đình một con tin tìm tới nhà bạn giữa đêm khuya, quỳ sụp ngoài cửa. Họ van xin bạn lập thề đưa người thân về trước lúc Syndicate giam giữ hạ quyết định. Lời thề của The Pinky không thể nuốt trôi; họ biết rất rõ sức nặng của nó.',
    '[Hostage and oath] A hostage’s family comes to you at midnight, kneeling at your door. They beg you to swear to bring their kin home before the Syndicate holding them decides anything. The Pinky’s oath cannot be swallowed, and they know exactly its worth.',
    [
      fc('Lập lời thề đưa người ấy về, bất kể giá nào', 'Swear to bring them home at any cost',
        'Bạn trích đầu ngón tay cho máu thấm vào sợi dây đỏ nhỏ. Bạn mất sáu ngày cùng vết thương sâu hoắm mới đưa được con tin về. Nhà ấy chẳng biết cảm tạ sao cho đủ, cứ đều đặn mỗi tuần đặt trước thềm bạn một chiếc bánh ngọt suốt cả năm.',
        'You nick a fingertip, and blood soaks into a small red thread. It takes six days and a deep wound, but the hostage returns. The family does not know how to express thanks, and puts a sweet cake on your doorstep every week for a year.',
        { health: -14, rep: 9, network: 8, sanity: 2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Hứa cố hết sức nhưng không lập lời thề', 'Promise to try your best but not swear', [
        [55, 'Cả nhà nhìn bạn rất lâu rồi cúi đầu chấp thuận. Bạn cứu được con tin sau bốn ngày, đổi lại một tên canh giữ bỏ mạng. Bạn chẳng phá lời nào nhưng cảm giác thiếu hụt cứ đeo bám mãi.', 'The family stares at you a long while then nods. You rescue the hostage after four days, but one of the captors dies. You break no word, but the sense of something lacking follows you.', { health: -8, rep: 6, sanity: -6, network: 5 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Bạn đến chậm một bước. Người ta tìm thấy con tin ba ngày sau tại nơi không ai muốn gọi tên. Gia đình không trách móc, chỉ lặng lẽ hoàn lại món tiền vốn dành cho chuyến đi.', 'You are too late. The hostage is found three days later in a place no one wishes to name. The family does not blame you, only quietly returns the money they had saved for this.', { rep: -3, sanity: -12, wealth: 3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối, nói đó không phải việc của The Pinky', 'Decline, saying this is not the Pinky’s business',
        'Họ chậm rãi đứng lên không van nài thêm câu nào. Nhiều tuần sau bạn nghe tin người con tin được người khác chuộc về. Bạn không tới mừng, cũng chẳng dám nhìn mặt ai nhà ấy ngoài chợ.',
        'They rise slowly and plead no more. Many weeks later you hear the hostage was freed thanks to someone else.',
        { sanity: -8, rep: -4 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [24, 90] }),

  fe('pinky_elder_duel', P, [1, 3],
    '[Lời thách của người già] Ông Sworn Blade về hưu gửi chiến thư đòi đấu với bạn, bảo chuyện bạn bẻ lời thề năm ngoái làm nhơ danh dự The Pinky. Ông không cốt lấy mạng bạn. Ông chỉ muốn xem lúc lưỡi kiếm kề sát người bạn có đứng thẳng nổi hay không.',
    '[The elder’s challenge] A retired Sworn Blade challenges you to a duel, claiming you insulted the Pinky’s honor when you bent an oath a year ago. He does not wish to kill you. He wishes to see whether you stand straight when the blade approaches.',
    [
      fc('Nhận lời, đứng thẳng và đấu hết sức', 'Accept, stand straight and fight with all you have',
        'Ông lão đánh như gã thanh niên ba mươi. Bạn tốn hai mươi phút cùng hai vết chém nhỏ; cuối cùng ông dừng tay hạ kiếm, khen bạn đứng rất thẳng. Ông không nhắc nửa lời về lời thề, trước khi bước đi chỉ đặt bàn tay lên vai bạn.',
        'The old man fights like a thirty-year-old. You spend twenty minutes and two small cuts, and in the end he stops, sets down his sword, and says you stood straight. He says nothing of the oath, but before leaving, he touches your shoulder.',
        { health: -8, rep: 8, sanity: 3, network: 4 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nhận lời, nhưng đấu chỉ để chịu đòn', 'Accept but fight only to take the blows', [
        [55, 'Bạn chỉ đỡ với né chứ không ra đòn lần nào. Cuối cùng ông lão ngừng tay thở dốc, hỏi vì sao. Bạn đáp mình không có gì phải chứng minh. Ông nhìn bạn hồi lâu rồi bật cười, kết thúc trận thách đấu.', 'You parry, dodge, and never strike back. At last the old man stops, panting, and asks why. You say you have nothing to prove. He looks at you a long while, then laughs, and ends the challenge.', { health: -6, rep: 6, sanity: 4, network: 3 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Ông lão coi đó là thái độ khinh nhờn nên ra tay càng nặng. Bạn ngã quỵ xuống đất dưới ánh nhìn thất vọng sâu sắc của ông.', 'The old man takes it as contempt and strikes harder. You fall, and he stands looking on with deep disappointment.', { health: -18, rep: -4, sanity: -5 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối, xin lỗi ông về lời thề đã bẻ', 'Decline and apologize to him for the bent oath',
        'Ông lão im lặng hồi lâu rồi bảo lời xin lỗi ấy quý hơn một trận đấu, miễn là xuất phát từ lòng thật. Bạn thú nhận mình không chắc có thật hoàn toàn không. Ông khẽ gật như thể đó mới là câu ông muốn nghe.',
        'The old man is silent a long time. Then says that apology is worth more than a duel, but only if sincere. You say you are not sure it is, and he nods, as if that too was what he wanted to hear.',
        { sanity: 2, rep: 3, network: 4 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [28, 90] }),

  fe('pinky_bride_escort', P, [0, 3],
    '[Hộ tống cô dâu] Hôn sự bằng giao kèo vừa ký giữa hai gia tộc Nest khiến The Pinky cử bạn áp tải cô dâu từ Nest này sang Nest kia. Cô gái ngồi bất động trong xe, đôi tay siết chặt đầu gối. Giữa đường cô khẽ bảo mình chưa từng gặp mặt người sắp cưới.',
    '[Escorting the bride] A contract marriage is signed between two Nest families, and the Pinky sends you to escort the bride from one Nest to the other. The girl sits still in the carriage, hands pressed hard upon her knees. Midway she says softly that she has never met her future spouse.',
    [
      fc('Đưa cô đến nơi đúng như hợp đồng', 'Deliver her as the contract requires',
        'Cô gái cúi gằm mặt bước vào đại sảnh nhà chồng nên bạn chẳng nhìn lâu. Hợp đồng đã xong xuôi; The Pinky khen bạn làm việc gọn gàng.',
        'The girl walks into her spouse’s hall with head lowered, and you do not look long. The contract is fulfilled, and the Pinky praises your tidiness.',
        { rep: 6, sanity: -7, wealth: 6 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Dừng xe và hỏi cô có muốn tiếp tục', 'Stop the carriage and ask whether she wishes to go on', [
        [50, 'Cô nhìn bạn thật lâu rồi đáp vẫn muốn đi tiếp vì chẳng còn đường nào khác, không quên cảm ơn bạn đã hỏi. Hôm sau bạn nghe tin cô đến nơi an toàn, người bạn đời mới tặng cô chiếc đèn nhỏ.', 'She looks at you a long while then says she wishes to continue, having no other choice. She thanks you for asking. The next day you hear she arrived safely, and her future spouse gave her a small lamp.', { sanity: 3, rep: 4, network: 4 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Cô lắc đầu bảo không. Bạn buộc phải chọn giữa bản hợp đồng với cô gái. Bạn cho xe quay đầu đưa cô tới nhà người họ hàng xa; hai gia tộc Nest đồng loạt triệu The Pinky tới giải trình.', 'She says no. You must choose between the contract and her. You turn the carriage and take her to a distant relative, and both Nest families summon the Pinky to explain.', { rep: -8, sanity: 4, heat: 6 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Im lặng chở cô đến nơi, đứng ở cổng đến khi cô vào hẳn', 'Stay silent and deliver her but wait at the gate until she is fully inside',
        'Cô vào cửa rồi bạn vẫn đứng nán lại thêm một giờ. Tới bậc cửa trong, cô ngoái đầu nhìn lại một lần; hai người lặng lẽ nhìn nhau qua khoảng sân rộng. Rồi cô khuất hẳn còn bạn quay bước đi, chẳng dám nghĩ thêm.',
        'You stand there an hour after she enters. She turns once at the inner door, and the two of you look at each other across the courtyard a long time. Then she goes fully in, and you leave without daring to think.',
        { sanity: -4, rep: 4, network: 2 }, { flagsAdd: ['pinky_kept_word'] })
    ]),

  fe('pinky_loophole', P, [1, 3],
    '[Kẽ hở trong giao kèo] Một khách hàng soi ra kẽ hở trong bản giao kèo ký với The Pinky năm năm trước. Xét từng câu chữ thì ông ta hết sạch nợ. Xét tinh thần giao ước thì ông còn nợ kẻ từng cứu mình thoát khỏi Syndicate. Ông muốn bạn xác nhận chữ nghĩa mới là thứ tối cao.',
    '[A loophole in the contract] A client has found a loophole in the contract he signed with the Pinky five years ago. By the letter, he owes nothing. By the spirit, he owes a debt to someone who helped him escape a Syndicate. He wants you to confirm that the letter matters more.',
    [
      fc('Xác nhận chữ nghĩa và để ông đi', 'Confirm the letter and let him go',
        'Ông khách mỉm cười, đặt xấp tiền thưởng lên bàn rồi bước ra cửa. Bạn chép lại vào sổ đúng từng chữ đã nói. Nhưng sáng hôm sau đi ngang một căn nhà, bạn sực nhận ra đó chính là nhà của người từng cứu ông ta.',
        'The client smiles, sets a gratuity on the table and goes out. You record precisely what was said, to the letter. But next morning you pass a house and realize it is that of the one who helped him.',
        { wealth: 10, rep: 2, sanity: -8 }, { flagsAdd: ['pinky_bent_word'] }),
      fg('Nói với ông rằng tinh thần mới là điều quan trọng', 'Tell him the spirit matters more', [
        [55, 'Ông khách nhìn bạn hồi lâu rồi thú nhận lẽ ra mình phải đoán trước. Ông trả sòng phẳng món nợ, thậm chí trả dư. Người kia từ chối nhận phần thêm nhưng cả hai vẫn ngồi ăn tối cùng nhau; nghe đâu họ giữ liên lạc tới tận giờ.', 'The client looks at you some time, then says he should have known. He pays the debt, even more. The one who helped him declines, but the two sit down to dinner together, and you hear they are still acquainted.', { rep: 8, sanity: 5, network: 6 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Ông khách nổi xung bỏ về, dọa đâm đơn kiện The Pinky. Sovereign triệu bạn lên hỏi liệu bạn có hiểu lời một Sworn Blade nặng tới mức nào không.', 'The client storms off, threatening to sue the Pinky. A Sovereign summons you and asks if you are sure you understand the weight of a Sworn Blade’s words.', { rep: -5, sanity: -3 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Chuyển vụ này lên Sovereign quyết định', 'Pass the matter up to a Sovereign to decide',
        'Sovereign đọc hồ sơ suốt một giờ rồi phán chữ nghĩa lẫn tinh thần đều có lý, nhưng lúc va chạm thì tinh thần thắng. Ông khách buộc phải trả nợ.',
        'The Sovereign reviews the file an hour and rules that both letter and spirit hold weight, but when they conflict, the spirit wins. The client must pay.',
        { sanity: 2, rep: 4, network: 4 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [26, 90] }),

  fe('pinky_mute_witness', P, [1, 3],
    '[Nhân chứng không nói được] Bạn cần lời khai của người tận mắt thấy vụ ám sát, ngặt nỗi họ đã thề không hé răng với ai ngoài chủ nhân. Lời thề ấy lại do một Pinky khác đứng chứng. Ép họ khai thì họ thành kẻ bội thề; buông tay thì người vô tội chịu án oan.',
    '[The witness who cannot speak] You need the testimony of someone who saw an assassination, but that person has vowed to speak to no one except their master. That vow was sworn by another Pinky. If you force them to speak, they break the oath. If you do not, an innocent will be convicted.',
    [
      fg('Xin chủ nhân của người chứng cho phép họ nói', 'Ask the witness’s master to permit them to speak', [
        [55, 'Chủ nhân nghe bạn trình bày, lặng đi hồi lâu rồi cho phép người chứng khai riêng trước mặt ông. Bạn ngồi nghe lời khai trong căn phòng tối để người vô tội được trả tự do. Ông không nói lời cảm ơn, nhưng đêm đó sai người mang biếu bạn bình trà thượng hạng.', 'The master hears you, is silent long, then says the witness may speak, but only in his presence. You hear the testimony in a dark room, and the innocent is freed. He does not thank you, but that night sends you a very fine pot of tea.', { rep: 8, sanity: 3, network: 6 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Chủ nhân khước từ thẳng thừng. Người vô tội lãnh án dưới ánh nhìn của bạn từ cuối phòng xử. Cô ấy không ngoái lại, chỉ lúc bị dẫn đi khẽ thốt một câu bạn nghe không rõ.', 'The master refuses outright. The innocent is convicted, and you watch from the back of the court. She does not look at you, but as she is led away she says something softly that you cannot hear.', { rep: -3, sanity: -10 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Ép người chứng nói và chịu hậu quả', 'Force the witness to speak and bear the consequence',
        'Người chứng run rẩy khai hết sự thật. Người vô tội được thả tự do, đổi lại nhân chứng bị tước danh Pinky rồi gạch tên khỏi mọi sổ sách. Lúc rời đi họ nhìn bạn một cái khiến bạn ám ảnh cả đời.',
        'The witness speaks, trembling throughout. The innocent is freed, but the witness is no longer a Pinky, struck from every ledger. They look at you as they leave, and you never forget that look.',
        { rep: 3, sanity: -11, network: -5 }, { flagsAdd: ['pinky_bent_word'] }),
      fc('Không ép, tìm đường khác để chứng minh', 'Refuse to force and seek another way to prove it',
        'Bạn bỏ hai tuần lùng sục dấu vết bên lề, cuối cùng dựng được bộ chứng cứ gián tiếp. Nó chưa hoàn hảo nhưng đủ để tòa hoãn thi hành án thêm một năm. Người vô tội có thêm cơ hội, còn bạn mang theo thứ thanh thản pha lẫn day dứt.',
        'You spend two weeks tracing side evidence and finally compile an indirect case. It is not perfect but enough to postpone the sentence. The innocent is given another year, and you feel a calm mixed with unease.',
        { rep: 5, sanity: -3, network: 4, wealth: -3 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [26, 90] }),

  fe('pinky_dying_stranger', P, [0, 3],
    '[Lời thề trong mưa] Người lạ trọng thương gục bên mép hẻm. Thoáng thấy dấu ấn The Pinky trên người bạn, họ níu chặt tay áo, van xin bạn thề một điều duy nhất: trao tận tay lá thư này cho thân nhân họ. Họ không còn hơi sức để nói thêm. Trời đổ mưa xối xả.',
    '[An oath in the rain] A badly wounded stranger lies at the edge of an alley, and seeing the Pinky’s mark on you grips your sleeve and begs you to swear one thing: to deliver a letter to their kin. They have no time left to say more. The rain falls very hard.',
    [
      fc('Thề, nhận lá thư rồi hứa sẽ mang đến', 'Swear, take the letter, and promise delivery',
        'Người lạ gật đầu, gương mặt giãn ra nhẹ nhõm rồi tắt thở chỉ sau vài phút. Bạn mất trọn hai tuần lần tìm thân nhân. Tới lúc đứng trước mặt họ, bạn chẳng biết mở lời thế nào nên chỉ trao lá thư rồi lặng lẽ nhìn họ đọc.',
        'The stranger nods, and is so relieved their whole face loosens. They die within minutes. It takes you two weeks to find the kin, and when you meet them you do not know how to begin. You only hand over the letter and stand watching them read.',
        { sanity: -3, rep: 7, network: 6, health: -2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nói bạn sẽ cố gắng, nhưng không thề', 'Say you will try but do not swear', [
        [55, 'Người lạ nhìn bạn, thừa hiểu đó không phải lời thề. Họ vẫn dúi lá thư vào tay bạn rồi nhắm mắt. Tuần sau bạn đưa thư tới nơi; người nhận hỏi có phải bạn là người của Pinky không. Bạn gật đầu xác nhận để nhận lời cảm ơn.', 'The stranger looks at you and knows it is not an oath. They still hand you the letter, then close their eyes. You deliver it the next week, and the recipient asks if you are a Pinky. You say yes, and they thank you.', { sanity: -4, rep: 4, network: 4 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Bạn để quên lá thư trong túi áo suốt ba tháng. Lúc sờ thấy lại thì giấy đã ẩm mủn, chữ nhòe nhoẹt. Bạn chong đèn đọc cả ngày mà chẳng thể nào lần ra người nhận.', 'You forget the letter in your pocket for three months. When found again, it is damp and the ink has run. You spend a whole day trying to read it and never find the recipient.', { sanity: -9, rep: -4 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối, nói bạn không thề với người lạ', 'Refuse, saying you do not swear to strangers',
        'Người lạ nhìn bạn hồi lâu rồi buông lỏng tay áo, chẳng nói thêm câu nào. Bạn đứng đội mưa đến lúc họ dứt hơi thở. Nhiều năm sau mỗi bận nghe tiếng mưa rơi, ánh nhìn ấy vẫn hiện về.',
        'The stranger looks at you a long time, then releases your sleeve. They say no more. You stand there in the rain until they stop breathing, and for many years afterward you see that look each time you hear rain.',
        { sanity: -10, rep: -2 }, { flagsAdd: ['pinky_bent_word'] })
    ]),

  // ------------------------------------------------------------------ stories and consequences
  fe('pinky_forsworn_friend', P, [1, 3],
    '[Người bạn bị bội thề] Người từng đứng lập thệ cùng lúc với bạn trên tháp chuông nay bị The Pinky khép tội phản thề. Hồ sơ ghi họ làm lộ một điểm tập kết. Bạn biết thừa đó không phải sự thật, bởi chính bạn bảo họ làm vậy mà chưa ai hay biết.',
    '[The forsworn friend] An old friend who swore at the bell tower alongside you is accused by the Pinky of breaking an oath. The file says they revealed a location. You know it is not so, because you yourself told them to, and no one yet knows.',
    [
      fc('Nhận trách nhiệm về mình', 'Take the responsibility on yourself',
        'Bạn đứng trước hội đồng kể rõ đầu đuôi sự thật. Hội đồng lặng thinh một lát rồi phán chia đôi hình phạt cho cả hai. Bạn cùng người bạn đều bị phạt tiền, nhưng cả hai bước ra khỏi cửa kề vai nhau chẳng ai cần nói lời nào.',
        'You stand before the council and speak the truth. The council is silent, then rules: half to each. You and your friend are both fined, but you walk out of the room shoulder to shoulder.',
        { rep: -3, sanity: 5, network: 8, wealth: -6 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Giữ im lặng và để họ chịu án', 'Stay silent and let them bear the sentence', [
        [60, 'Người bạn chịu phạt nặng rồi rời bỏ hội. Bạn ở lại, từ đó hễ đi qua tháp chuông là lại nghe nó ngân một tiếng rất khẽ chẳng ai khác nghe thấy.', 'The friend is heavily penalized and leaves the Pinky. You stay on, and each time you pass the bell tower you hear it ring one soft note no one else hears.', { rep: 4, sanity: -12, network: -6 }, { flagsAdd: ['pinky_bent_word'] }],
        [40, 'Lúc bị giải đi, người bạn ngoái lại nhìn bạn thật lâu. Hai ngày sau họ bặt tăm khỏi The City. Bạn nhận mảnh giấy chỉ viết một chữ: Biết.', 'The friend looks at you as they are led away, a very long time and says nothing. Two days later they vanish from the City. You receive a slip with a single word: Knew.', { rep: 2, sanity: -14, network: -8 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Thú nhận riêng với Sovereign trước phiên tòa', 'Confess privately to a Sovereign before the hearing',
        'Sovereign nghe xong lặng đi hồi lâu rồi bảo sẽ thu xếp êm vụ này để khỏi lộ ra ngoài. Người bạn được trắng án, đổi lại bạn nợ ông ta một việc chưa biết ngày nào phải trả.',
        'The Sovereign hears you and is silent a long while. Then says he will handle the matter privately and no one need know. The friend is cleared, but you must do something for him, which he has not yet said.',
        { rep: 2, sanity: 3, network: 4 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [28, 90], weight: 11 }),

  fe('pinky_sovereign_burden', P, [2, 3],
    '[Gánh nặng của Sovereign] Một Sovereign già gọi bạn vào gian phòng nhỏ nhất trên tháp chuông. Ông kể mình đã giữ hàng trăm lời thề suốt ba mươi năm, biết rõ quá nửa chẳng hề đáng giữ. Ông không giải thích thêm, chỉ đặt cuốn sổ xuống trước mặt rồi hỏi bạn có muốn nhận giữ nó không.',
    '[The Sovereign’s burden] An elderly Sovereign calls you into the smallest room of the bell tower. He says he has kept hundreds of oaths over thirty years and knows half were not worth it. He says no more. He only sets a ledger before you and asks whether you wish to keep it.',
    [
      fc('Nhận cuốn sổ, hứa giữ nó đến khi chết', 'Accept the ledger and vow to keep it until death',
        'Cuốn sổ nặng trịch; mỗi trang giấy là lời thề của người đã khuất. Ông già khẽ gật đầu bước khỏi phòng, để mặc bạn ngồi lại bên cuốn sổ cùng ngọn nến sắp tàn.',
        'The ledger is heavier than you thought, and you realize each page is the oath of someone dead. The old man nods very slightly and leaves the room, leaving you alone with the ledger and a dying candle.',
        { rep: 9, sanity: -6, network: 6 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Từ chối cuốn sổ, nói bạn không đủ sức giữ', 'Refuse the ledger, saying you lack the strength to keep it', [
        [55, 'Ông già mỉm cười rất khẽ, bảo đó mới là câu đáp đúng nhất bởi kẻ nhận vội chưa từng hiểu sức nặng của nó. Ông cất cuốn sổ đi, trao bạn chiếc chuông đồng nhỏ dặn hãy rung lên lúc cần.', 'The old man smiles very faintly and says that is the truest answer. Anyone who accepts at once has not understood how heavy it is. He puts away the ledger and gives you a small bronze bell, telling you to ring it when needed.', { rep: 6, sanity: 5, network: 5 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Ông già gật đầu không nói gì. Cuốn sổ được chuyển cho kẻ khác. Mấy năm sau bạn nghe tin người ấy lên chức Sovereign, lòng không khỏi tự hỏi mình vừa để vuột thứ gì.', 'The old man nods. The ledger is passed to another. You hear that person became a Sovereign within a few years, and you wonder what you missed.', { rep: -3, sanity: -3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Xin xem ba trang rồi mới quyết định', 'Ask to read three pages before deciding',
        'Ba trang ghi ba lời thề: của đứa trẻ, của người mẹ, của kẻ sát nhân. Bạn đọc xong liền ngước nhìn ông hồi lâu. Ông bảo đó chính là lý do ông chọn bạn: người dám mở đọc trước khi gật đầu.',
        'The three pages are three oaths: a child’s, a mother’s, and a killer’s. You finish reading and look at him a long while. He says that is why he chose you: someone who dares read before accepting.',
        { rep: 8, sanity: -4, network: 5 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [34, 95], weight: 11 }),

  fe('pinky_blade_that_remembers', P, [1, 3],
    '[Thanh kiếm biết nhớ] Thanh kiếm rèn từ sao bạn chọn làm vật bất ly thân bắt đầu có lúc nặng trịch khác thường, y như chỉ chọn đúng khoảnh khắc bạn sắp làm chuyện trái lòng. Một Sworn Blade già bảo thứ thép ấy đôi khi biết nhớ; chẳng ai rõ tại sao. Ông khuyên bạn đừng cưỡng lại nó.',
    '[The sword that remembers] The star-forged sword you appointed as your own begins to feel heavier at times, precisely when you are about to do something you do not want to. An old Sworn Blade says this happens with some swords and no one knows why. He tells you not to fight it.',
    [
      fc('Lắng nghe, dừng lại khi nó nặng', 'Listen and stop when it grows heavy',
        'Bạn tập để ý mỗi lần chuôi kiếm trở nặng. Vẫn có lúc bạn làm liều cho xong, nhưng phần lớn bạn chịu dừng lại nghĩ kỹ xem mình định làm gì. Quả nhiên lắm chuyện sau nhìn lại hẳn sẽ ân hận.',
        'You begin to notice when the sword grows heavy. Sometimes you do it anyway, but more often you pause and reconsider what you meant to do. Some of those turn out to be things you would have regretted.',
        { sanity: 4, rep: 4 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Cố chống lại, bắt thanh kiếm nhẹ trở lại', 'Fight it and force the sword light again', [
        [50, 'Bạn ép thắng được nó. Thanh kiếm nhẹ bẫng đi nhưng nhẹ kiểu trống rỗng như vừa lìa bỏ chủ. Một Sworn Blade đi ngang liếc bạn rồi khẽ lắc đầu.', 'You win, and the sword lightens, but oddly light, as if it has abandoned you. From then on you feel nothing when you hold it. A Sworn Blade looks at you passing and shakes his head faintly.', { sanity: -7, rep: 3 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Thanh kiếm nặng tới mức bạn không nhấc nổi khỏi sàn, phải nhờ đồng môn khiêng giúp về nhà. Nhiều tuần sau nó mới nhẹ dần; bạn hiểu nó đang chờ một lời xin lỗi.', 'The sword grows so heavy you cannot lift it, and must ask another to carry it home. Many weeks later it lightens again, and you realize it was waiting for an apology.', { health: -4, sanity: -5, rep: -2 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Hỏi thanh kiếm thành tiếng rồi chờ', 'Speak to the sword aloud and wait',
        'Bạn cất tiếng nói một mình trong căn phòng vắng. Thanh kiếm lặng im không đáp, nhưng từ đó hễ rút kiếm bạn lại thấy lưng mình thẳng hơn trước một chút. Có lẽ chỉ là thói quen, hoặc chẳng phải.',
        'You speak alone in your room, and the sword does not reply. But afterward you find yourself standing a little straighter when holding it. Perhaps habit. Perhaps not.',
        { sanity: 3, rep: 2 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [26, 90] }),

  fe('pinky_word_returns', P, [1, 3],
    '[Lời đã giữ quay về] Người bạn từng giúp đỡ nhiều năm trước nhờ lời hứa giữ đúng hẹn nay tìm tới giữa lúc hoạn nạn. Họ đang kẹt rắc rối với một Syndicate, không còn chỗ nào bấu víu. Họ không đòi hỏi gì, chỉ bảo bạn là người duy nhất họ tin sẽ không phản bội.',
    '[A kept word returns] Someone you once helped years ago, thanks to a promise you kept faithfully, comes to you in need. They are in trouble with a Syndicate and have no one else. They demand nothing. They only say you are the one person they know who will not betray them.',
    [
      fc('Giúp họ hết sức, không tính toán', 'Help them with all you have, without calculation',
        'Bạn bỏ trọn một tuần điều đình với Syndicate, thêm một tuần nữa đưa họ thoát khỏi khu vực. Lúc chia tay họ trao bạn chiếc chuông đồng nhỏ, bảo đó là lời thề của riêng họ, dặn hãy rung lên lúc cần.',
        'You spend a week negotiating with the Syndicate and another getting them out of the district. At parting they hand you a small object: a bronze bell. They say it is their oath, and to ring it when needed.',
        { health: -6, rep: 9, network: 9, sanity: 4, wealth: -5 }),
      fc('Giúp một phần, nói rõ bạn không thể làm hơn', 'Help in part, stating plainly you can do no more',
        'Họ biết ơn đón nhận phần giúp đỡ ấy mà không đòi thêm. Bạn vừa nhẹ nhõm vừa mang chút áy náy vì chưa trọn vẹn. Một tháng sau thư cảm ơn gửi qua bưu điện tới tay, ngắn gọn mà chân thành.',
        'They accept the help with gratitude and ask for no more. You feel relief, and also something not quite enough. A month later they send thanks by post, short and real.',
        { rep: 4, network: 5, sanity: -1, wealth: -2 }),
      fc('Từ chối, nói món nợ đó đã được trả lâu rồi', 'Decline, saying that debt was long ago repaid',
        'Họ gật đầu đứng dậy chẳng nửa lời trách móc. Nhưng bạn sực nhận ra mình vừa thốt ra đúng câu từng nói với bao người khác mà chưa bao giờ tự nghe lại. Dư vị ấy bám riết bạn hàng tuần liền.',
        'They nod and rise, not blaming. But you realize you spoke what you usually say to others but have never heard yourself say. That feeling follows you for weeks.',
        { sanity: -6, rep: -3, network: -4 })
    ], { requires: ['pinky_kept_word'], age: [28, 95], weight: 9 }),

  fe('pinky_price_of_exception', P, [1, 3],
    '[Giá của ngoại lệ] Lời thề năm xưa bạn từng bẻ cong vì tin mình có lý do chính đáng nay bị khơi lại. Người tìm tới chẳng phải The Pinky mà là kẻ từng hưởng lợi từ chính ngoại lệ ấy. Họ không biết ơn lấy một chút, bảo suốt bao năm qua phải sống trong cảm giác mang ơn thứ mình không xứng.',
    '[The price of an exception] An oath you once bent, for a reason you then believed just, comes to light. The one who asks is not the Pinky but the one who benefited from that exception. They are not grateful. They say they lived many years feeling indebted for something they did not deserve.',
    [
      fc('Nhận lỗi và xin lỗi họ', 'Admit the fault and apologize to them',
        'Họ lặng đi rất lâu rồi bảo mình chẳng cần lời xin lỗi, chỉ muốn nghe sự thật. Hai người ngồi đối diện uống trà; họ dần kể hết những gì đã làm với món ơn không đáng nhận ấy. Lòng bạn nhẹ bớt phần nào.',
        'They are silent a long while then say they need no apology, only the truth. The two of you sit and drink tea, and gradually they tell you what they did with that undeserved favor. You feel a little lighter.',
        { sanity: 3, rep: 3, network: 5 }),
      fg('Bảo vệ lựa chọn của bạn, nói bạn vẫn làm lại', 'Defend your choice, saying you would do it again', [
        [55, 'Họ nhìn bạn không đồng tình nhưng gật đầu như kẻ hiểu tranh cãi thêm cũng vô ích. Họ bảo sẽ nhớ bạn là người làm thế vì có lý do dù không tán thành. Bạn chợt thấy nhẹ lòng đến kỳ lạ.', 'They look at you and disagree, but nod like someone who knows arguing helps nothing. They say they will remember you as one who did it for a reason, though they do not approve. You feel strangely relieved.', { sanity: 2, rep: 2, network: 3 }],
        [45, 'Họ đùng đùng nổi giận đi tố cáo với The Pinky. Bạn bị triệu tập giải trình; suốt buổi chất vấn bạn nhận ra mình đang cố bảo vệ điều chính bản thân không còn tin chắc.', 'They flare up and go denounce you to the Pinky. You are called to explain, and throughout the questioning you realize you are defending something you are no longer sure of.', { rep: -8, sanity: -7, heat: 4 }]
      ]),
      fc('Im lặng và để họ nói hết điều muốn nói', 'Stay silent and let them say all they wish',
        'Họ trút bầu tâm sự gần trọn một giờ, tới cuối giọng cũng dịu xuống. Họ chẳng tha thứ nhưng cơn giận đã nguôi. Lúc đứng dậy ra về, họ bảo bạn là người duy nhất nghe họ nói hết mà không ngắt lời.',
        'They speak almost an hour, and by the end their voice has softened. They do not forgive, but they are no longer angry. As they leave they say you are the only one who heard them out without interrupting.',
        { sanity: -2, rep: 2, network: 4 })
    ], { requires: ['pinky_bent_word'], age: [28, 95], weight: 9 })
];

export const PINKY_MINORS = [
  M('m_pinky_red_thread_knot', AGE.GROWN, fneed(P, 0),
    '[Nút thắt chỉ đỏ] Sợi chỉ đỏ buộc quanh cổ tay bạn tự tuột rơi giữa buổi sáng. Bạn nhìn nó nằm dưới sàn vì lời thề đầu tiên năm nào cũng thắt bằng thứ chỉ này. Bạn cúi nhặt thắt lại, bàn tay run rẩy thử tới ba lượt mới xong.',
    '[The red thread knot] A red thread tied around your wrist slips off mid-morning. You look at it on the floor a long time, because the first oath you swore was bound with such a thread. You tie it again, but your hand shakes so you must try three times.',
    [C('Thắt lại thật chặt', 'Tie it tight again', 'Nút lần này siết chặt hơn lần đầu. Cả ngày cổ tay thấy nặng trĩu nhưng chắc chắn như đang níu giữ một điều sắp quên.', 'This knot is firmer than the first. All day your wrist feels heavier but also steadier, as though remembering something you were about to forget.', { sanity: 2, rep: 2 }), C('Để sợi chỉ trong túi', 'Keep the thread in your pocket', 'Bạn không buộc lại nữa. Nhưng mỗi bận thọc tay vào túi chạm trúng nó, bạn lại nhớ hóa ra mình đã quen tới mức chẳng còn cảm giác khi nó nằm trên cổ tay.', 'You do not retie it. But each time you touch your pocket you feel it, and realize you had grown so used to it you no longer felt it on your wrist.', { sanity: -1 })],
    I('Bạn nhặt sợi chỉ và đút vào túi.', 'You pick up the thread and tuck it in your pocket.'), { theme: 'work' }),
  M('m_pinky_bell_echo', AGE.GROWN, fneed(P, 0),
    '[Tiếng chuông vang xa] Từ góc chợ bạn đứng, tiếng chuông tháp vọng tới chậm hơn thường lệ một nhịp. Người bán hàng quanh quầy đồng loạt ngước nhìn lên rồi cúi xuống làm tiếp. Duy một bà lão đưa tay đặt lên ngực khẽ gật đầu như vừa nghe bản án.',
    '[The bell’s far echo] From where you stand in the market, the tower bell reaches you a beat later than usual. The vendors around you all look up, then down again. Only one old person lifts a hand to the chest and nods as though hearing a sentence.',
    [C('Hỏi người già vì sao', 'Ask the old person why', 'Bà bảo chuông chỉ ngân trễ mỗi khi có ai đó vừa giữ trọn một lời thề quá khó. Bà chẳng biết là ai, cũng không muốn biết, chỉ muốn nhớ giữa đời vẫn còn kẻ làm nổi.', 'She says the bell rings late only when someone has just kept a very hard oath. She does not know who, and says she does not wish to. She only wants to remember that somewhere someone still can.', { sanity: 3, network: 3 }), C('Giả vờ không nghe thấy', 'Pretend not to have heard', 'Bạn vội mua xong món đồ rồi sải bước đi nhanh. Cả buổi chiều tiếng chuông vẫn ngân nga bên tai, vang vọng mãi ngay cả lúc ngoài tháp đã im tiếng.', 'You finish your buying and leave quickly. All afternoon the bell keeps echoing in your ear, later even after it has gone silent.', { sanity: -2 })],
    I('Bạn ngẩng lên nghe và cúi xuống tiếp tục.', 'You look up to listen then bend back to your task.'), { theme: 'work' }),
  M('m_pinky_sheath_oil', AGE.GROWN, fneed(P, 0),
    '[Dầu bôi vỏ kiếm] Bạn lau dầu lên vỏ kiếm mỗi tối như thói quen không ai bắt buộc. Tối nay mặt vỏ hiện vết nứt nhỏ; từng giọt dầu thấm thẳng vào khe hở như đất nẻ hút nước. Bạn ngồi nhìn nó thấm hồi lâu.',
    '[Oil for the scabbard] You oil your scabbard each night, a ritual no one demands. Tonight it has a small crack never there before, and the oil sinks in like water into dry earth. You sit watching it sink some time.',
    [C('Thay vỏ kiếm mới', 'Replace the scabbard', 'Bạn mang vỏ cũ ra thợ; ông bảo vết nứt này không đáng vá vì nó đã gánh đủ việc đến lúc nghỉ ngơi. Bạn rước về chiếc vỏ mới rồi treo vỏ cũ lên vách tường.', 'You bring the old scabbard to a smith, who says the crack is not worth mending. He says it has done its work and it is time to rest. You bring home a new one and hang the old on the wall.', { wealth: -4, sanity: 2, rep: 1 }), C('Giữ nguyên và tiếp tục bôi dầu', 'Keep it and go on oiling', 'Vết nứt không rạn thêm nữa. Tối nào bạn cũng ngồi ngắm lớp dầu thấm qua khe gỗ, dần thấy nó đẹp theo cách chiếc vỏ lành lặn chẳng bao giờ có được.', 'The crack spreads no further. Each night you watch it drink the oil and begin to see it as beautiful in a way an unbroken sheath could not be.', { sanity: 3 })],
    I('Bạn lau vỏ kiếm và cất nó đi.', 'You wipe the scabbard and put it away.'), { theme: 'work' }),
  M('m_pinky_stranger_bow', AGE.GROWN, fneed(P, 0),
    '[Cái cúi chào của người lạ] Một người qua đường cúi rạp chào bạn lúc chạm mặt trên phố mà chẳng thốt nửa lời. Bạn ngoái lại thì họ đã đi khuất. Chủ sạp bên cạnh kể bạn từng cứu em trai họ nhiều năm về trước mà chính bạn quên bẵng.',
    '[A stranger’s bow] A stranger on the street bows very deeply as you pass. You turn back, and they are gone. A nearby vendor says you once saved that person’s younger brother, many years ago, and you do not remember.',
    [C('Đi tìm người ấy để hỏi', 'Go find them to ask', 'Ba ngày lùng hỏi bạn mới gặp lại họ. Cả hai trò chuyện ngắn ngủi; trước lúc chia tay họ tặng bạn chiếc khăn tay thêu dòng chữ lạ. Bạn không đọc được thứ chữ ấy nhưng vẫn giữ cẩn thận.', 'You find them after three days. They speak very briefly, then give you a handkerchief embroidered with a small line.', { sanity: 3, network: 4, rep: 2 }), C('Để người ấy đi, nhận cái cúi chào như một món quà', 'Let them go and accept the bow as a gift', 'Bạn thấy lưng mình tự nhiên thẳng hơn suốt cả buổi chiều; lắm người nhìn bạn bằng ánh mắt khác hẳn dù chẳng rõ lý do.', 'You realize you stand straighter all afternoon, and many people look at you differently without knowing why.', { sanity: 2, rep: 2 })],
    I('Bạn gật đầu rất nhẹ và đi tiếp.', 'You nod very slightly and walk on.'), { theme: 'work' }),
  M('m_pinky_whetstone_night', AGE.GROWN, fneed(P, 0),
    '[Đêm mài kiếm] Bạn mài kiếm thâu đêm chẳng vì cớ gì. Không có nhiệm vụ, chẳng có kẻ thù nào chờ phía trước. Chỉ có tiếng đá cọ thép đều đặn, cùng cảm giác hễ dừng tay là đầu óc sẽ buộc phải nghĩ tới chuyện mình chưa sẵn lòng đối mặt.',
    '[A night of whetting] You sharpen your sword all night for no reason. No task, no enemy. Only the sound of stone on steel, steady, and a sense that if you stop you will have to think about something you are not ready for.',
    [C('Ngừng và nghĩ về điều ấy', 'Stop and think about it', 'Bạn đặt kiếm xuống, sực nhớ một lời hứa đã trễ hạn lâu nay. Sáng hôm sau bạn tìm đi làm cho tròn bổn phận; lúc nhấc kiếm lên bỗng thấy lưỡi thép nhẹ hẳn.', 'You set the sword down and recall a promise long overdue. The next morning you fulfil it, and find the sword lighter when you lift it.', { sanity: 4, rep: 3 }), C('Tiếp tục mài đến sáng', 'Keep whetting until morning', 'Tới rạng đông, lưỡi kiếm bén đến mức chẳng dám chạm tay. Bạn tra kiếm vào vỏ mà đôi tay nhức nhối suốt hai hôm vì tì đá quá lâu.', 'By morning the blade is so sharp you dare not touch it. You sheathe it, and your hands ache for two days from whetting so long.', { sanity: -3, health: -2 })],
    I('Bạn mài thêm một lúc rồi đi ngủ.', 'You whet a while longer then go to bed.'), { theme: 'work' }),
  M('m_pinky_merchant_gift', AGE.GROWN, fneed(P, 0),
    '[Quà của thương nhân] Ông thương nhân bạn từng đứng chứng giao kèo gửi biếu hộp gỗ nhỏ, bên trong đặt chai rượu quý kèm mảnh giấy cảm ơn. Giao kèo năm xưa trót lọt; ông viết nó đã đổi đời mình. Bạn chẳng còn nhớ lúc ký ông từng hứa hẹn những gì.',
    '[A merchant’s gift] A merchant whose contract you once witnessed sends you a small wooden box containing a fine bottle and a thank-you slip. That contract succeeded, and he writes it changed his life.',
    [C('Mở chai và uống một mình', 'Open the bottle and drink alone', 'Rượu êm nên bạn nhấp từng ngụm chậm rãi. Bạn tự thấy mình chẳng xứng nhưng vẫn uống cạn giọt cuối. Mảnh giấy cảm ơn được kẹp gọn vào cuốn sổ tay giữa hai trang bất kỳ.', 'The wine is very good, and you drink it slowly. You do not feel worthy, but drink to the last drop. The thank-you slip is pressed into your notebook between two random pages.', { sanity: 3, rep: 1 }), C('Gửi lại chai rượu kèm lời cảm ơn', 'Send the bottle back with thanks', 'Người thương nhân gửi trả ngược lại kèm đúng một dòng: Hãy giữ lấy làm kỷ niệm nhắc nhớ. Bạn đem chai rượu cất vào tủ kín, nhiều năm liền không khui.', 'The merchant sends it back with a line: Keep it as a reminder. You store the bottle in a cabinet and do not open it for years.', { sanity: 1, network: 3 })],
    I('Bạn đặt chiếc hộp lên kệ và không nhìn đến.', 'You set the box on a shelf and do not look at it.'), { theme: 'work' }),
  M('m_pinky_borrowed_sword', AGE.GROWN, fneed(P, 0),
    '[Mượn kiếm] Cậu đao thủ trẻ hỏi mượn thanh kiếm của bạn một ngày rồi ba ngày sau mới hoàn trả. Lưỡi kiếm sạch bóng hơn lúc mượn, chuôi hằn vết xước nhỏ như bị ai nghiến chặt bàn tay vào. Cậu ta tuyệt nhiên không hé nửa lời về chuyện đã xảy ra.',
    '[The borrowed sword] A young swordsman borrows your sword for a day and returns it after three. It is cleaner than when you lent it, with a small scratch at the hilt as if gripped very tightly. They say nothing about what happened.',
    [C('Không hỏi và nhận lại kiếm', 'Ask nothing and take the sword back', 'Cậu cúi chào rồi bước đi. Nhiều tháng sau bạn nghe tin cậu thắng một trận đấu không ai ngờ tới. Bạn nhìn vết xước trên chuôi lâu hơn thường lệ mà không đánh bóng xóa đi.', 'They bow and go. Many months later you hear they won an unexpected duel. You look at the scratch on the hilt longer than usual and do not polish it away.', { sanity: 2, rep: 2, network: 3 }), C('Hỏi cậu đã dùng nó vào việc gì', 'Ask what they used it for', 'Cậu im lặng hồi lâu rồi thú nhận vừa dùng nó giải quyết một việc chẳng vẻ vang gì. Bạn khẽ gật đầu, dặn lại cậu vài lời khuyên nhỏ để cậu vội chép ngay lên mu bàn tay.', 'They are silent a long time, then say they used it for something they are not proud of. You nod and give back a small piece of advice, which they copy onto the back of a hand.', { sanity: -2, network: 4 })],
    I('Bạn cất kiếm vào vỏ mà không nói gì.', 'You sheathe the sword without a word.'), { theme: 'work' }),
  M('m_pinky_old_scar_itch', AGE.GROWN, fneed(P, 1),
    '[Vết sẹo cũ ngứa] Vết sẹo mang từ buổi lập thệ đầu đời cứ trở trời sắp mưa là lại ngứa rát cả tuần. Một Sworn Blade già bảo đó là cách vết thương nhớ thứ nó từng đổi lấy. Ông dặn bạn đừng gãi, cũng đừng quên.',
    '[The old scar itches] The scar you got at your first oath-taking itches and stings all week whenever rain approaches. An old Sworn Blade says it is how the wound remembers what it was given. He tells you not to scratch, and not to forget.',
    [C('Nhịn gãi và để nó ngứa', 'Resist scratching and let it itch', 'Qua hai ngày cơn ngứa dịu xuống, nhường chỗ cho hơi ấm âm ỉ khiến bạn cảm thấy như đâu đó vẫn có người nhớ tới mình.', 'Over two days the itch fades, and you realize you have begun to feel warmth when it appears, as if someone is thinking of you.', { sanity: 2, rep: 1 }), C('Bôi thuốc làm dịu', 'Apply a soothing salve', 'Thuốc cắt cơn ngứa tức thì, nhưng đổi lại bạn nhận ra mình không còn nhớ rõ ngày lập thệ năm xưa như trước.', 'The salve soothes the itch at once, but you notice you no longer remember the day of the oath as clearly.', { sanity: -3, health: 1 })],
    I('Bạn kéo tay áo xuống che vết sẹo.', 'You pull your sleeve down to cover the scar.'), { theme: 'work' }),
  M('m_pinky_tower_stair_count', AGE.GROWN, fneed(P, 0),
    '[Số bậc thang tháp] Bạn đếm bậc thang dẫn lên tháp chuông, lần nào cũng ra một con số khác. Hôm nay là hai trăm mười ba. Hôm qua là hai trăm mười bốn. Một Sworn Blade đi cạnh bảo con số đúng chính là số lời thề hiện còn được giữ.',
    '[Counting the tower stairs] You count the stairs up to the bell tower and arrive at a different number each time. Today it is two hundred and thirteen. Yesterday two hundred and fourteen. A Sworn Blade walking beside says the true number is how many oaths are being kept.',
    [C('Hỏi ông có phải ông nói đùa không', 'Ask whether he is joking', 'Ông làm mặt nghiêm trang một thoáng rồi bật cười khẽ, thú nhận mình cũng chẳng rõ thật giả mà chỉ nghe người đi trước truyền miệng, chẳng buồn kiểm chứng.', 'He looks very serious then lets out a soft laugh. He says he does not know, only heard it from his predecessor, and has never wished to learn whether it is true.', { sanity: 2, network: 3 }), C('Đếm lại từ đầu vào hôm sau', 'Count again the next day', 'Con số lần này nhảy lên hai trăm mười lăm. Bạn đứng ngước nhìn đỉnh tháp thật lâu, chẳng biết nên mừng hay nên lo.', 'This time the number is two hundred and fifteen. You stand looking up at the tower’s top very long, unsure whether to feel glad or uneasy.', { sanity: -2, rep: 1 })],
    I('Bạn lên đỉnh tháp mà không đếm thêm.', 'You climb to the top without counting further.'), { theme: 'work' }),
  M('m_pinky_found_oath_stone', AGE.GROWN, fneed(P, 0),
    '[Phiến đá lời thề] Đi ngang con hẻm cũ, bạn bắt gặp phiến đá nhỏ khắc lời thề nét chữ đã mòn gần hết. Bạn đọc lõm bõm được nửa câu: Tôi sẽ không bao giờ... Phần sau đã phai nhòa theo năm tháng.',
    '[The oath stone] Passing through an old alley, you find a small stone engraved with an oath, the writing nearly worn away. You can read half a line: I will never... The rest has faded with the years.',
    [C('Ngồi xuống đọc lại từng nét', 'Sit down and trace each stroke', 'Bạn ngồi đó nửa giờ lần từng nét khắc bằng đầu ngón tay. Có lẽ là lời hứa không bao giờ rời bỏ một ai đó.', 'You sit half an hour reading with your fingers. Perhaps a promise never to leave someone.', { sanity: 3, network: 2 }), C('Đi tiếp mà không dừng lại', 'Walk on without stopping', 'Bạn sải bước qua nhưng cả ngày nửa câu ấy cứ lởn vởn trong đầu. Đêm về bạn tự viết nốt phần đuôi rồi nghĩ bụng biết đâu đó mới là đoạn thật.', 'You step past, but all day the half sentence stays in your head. That night you fill in the rest yourself, then think perhaps that is the true part.', { sanity: -1 })],
    I('Bạn liếc nhìn phiến đá rồi đi qua.', 'You glance at the stone then pass by.'), { theme: 'work' }),
  M('m_pinky_cold_rain_duty', AGE.GROWN, fneed(P, 0),
    '[Trực dưới mưa lạnh] Bạn phải đứng gác cổng Nest trọn một đêm mưa vì có người của The Pinky hẹn tới mà chẳng ai biết giờ nào. Mưa ngấm ướt sũng áo giày khiến bạn quên mất cảm giác khô ráo. Gần rạng sáng, bà lão đem ra cho bạn cốc nước nóng.',
    '[Duty in the cold rain] You must stand watch at a Nest gate all through a rainy night because a member of the Pinky will arrive at an unknown hour. Rain soaks your coat and shoes until you forget what dry feels like. Near dawn an old woman brings a cup of hot water and says nothing.',
    [C('Nhận cốc nước và cảm ơn', 'Take the cup and thank her', 'Hơi ấm từ lòng cốc làm cả người bạn rùng mình. Bà lão đứng cạnh một lát rồi quay đi. Trời sáng hẳn mà người Pinky vẫn bặt tăm, nhưng bạn chẳng thấy đêm trực ấy uổng phí.', 'The cup’s heat makes your whole body shiver. The old woman stands beside you a while, then goes. When morning comes the Pinky member never appears, but you do not feel you wasted the night.', { sanity: 4, network: 3, health: -2 }), C('Từ chối vì đang làm nhiệm vụ', 'Decline because you are on duty', 'Bà lão đặt cốc nước xuống bậc thềm rồi lặng lẽ bước đi. Bạn nhìn nó nguội dần trong mưa; nhiều năm sau hễ nghe tiếng mưa bạn lại nhớ tới cái cốc ấy.', 'The old woman sets the cup on the step and goes. You watch it cool, and recall it many years later each time you hear rain.', { sanity: -3, health: -3 })],
    I('Bạn đứng thẳng và chịu cơn mưa.', 'You stand straight and endure the rain.'), { theme: 'work' }),
  M('m_pinky_young_apprentice', AGE.GROWN, fneed(P, 1),
    '[Người học việc đầu tiên] Một đao thủ trẻ xin học bí quyết giữ lời thề từ bạn. Bạn cũng chẳng rõ mình có bí quyết gì vì chưa từng thử gói ghém nó thành lời. Người trẻ ngồi chờ suốt buổi khiến bạn phải nặn óc tìm câu đáp thật nhanh.',
    '[The first apprentice] A young swordsman asks to learn how you keep your oaths. You do not know what your way is, having never put it into words. They sit waiting the whole session, and you realize you must invent an answer quickly.',
    [C('Nói thật rằng bạn không biết', 'Say honestly you do not know', 'Người trẻ lặng đi rồi bảo đó là câu đáp hay nhất mình từng nghe. Hai người ngồi yên cạnh nhau chẳng nói thêm; bạn sực hiểu mình vừa truyền lại được thứ gì đó mà không hay.', 'The youngster is silent then says it is the best answer they have heard. The two sit together a long time, saying no more, and you realize you taught something without knowing.', { sanity: 3, network: 5, rep: 3 }), C('Kể một câu chuyện về lần bạn suýt phá lời thề', 'Tell a story of the time you nearly broke an oath', 'Câu chuyện khiến người trẻ im lặng hồi lâu.', 'The story leaves the youngster silent for a long while.', { sanity: 4, network: 4, rep: 2 })],
    I('Bạn bảo họ quay lại vào tuần sau.', 'You tell them to come back next week.'), { theme: 'work' }),
  M('m_pinky_silver_coin', AGE.GROWN, fneed(P, 0),
    '[Đồng bạc không đòi] Ba mươi năm sau, người từng mượn bạn đồng bạc gửi trả đúng một đồng kèm mảnh giấy: Cảm ơn vì đã không đòi. Bạn không nhớ mình từng cho vay, nhưng đồng bạc ấm rực như thứ nằm gọn trong lòng bàn tay bấy lâu.',
    '[The silver coin never demanded] Someone who once owed you a silver coin returns it after thirty years, exactly one coin, with a slip: Thank you for never asking.',
    [C('Nhận đồng bạc và giữ nó làm bùa', 'Accept the coin and keep it as a charm', 'Bạn xỏ đồng bạc qua sợi chỉ đỏ đeo trên cổ. Nhiều năm sau mỗi lần đối diện quyết định khó khăn, bạn lại nhớ đồng bạc ấy để nhớ rằng có những món nợ được trả bằng thời gian.', 'You thread the coin on a red thread and wear it at your neck. Many years later when facing a hard decision, you recall that coin and remember that some debts are paid in time.', { sanity: 3, rep: 2 }), C('Gửi lại kèm lời nói món nợ đã xong từ lâu', 'Send it back saying the debt was settled long ago', 'Người ấy gửi trả lần nữa, nhắn thêm: Hãy giữ. Cuối cùng đôi bên đồng ý thả đồng bạc vào hòm từ thiện đầu phố.', 'They send it back again with a line: Keep it. In the end you both agree to drop the coin into a charity box at the head of the street.', { sanity: 2, network: 4 })],
    I('Bạn bỏ đồng bạc vào túi và quên nó.', 'You pocket the coin and forget it.'), { theme: 'work' }),
  M('m_pinky_priest_blessing', AGE.GROWN, fneed(P, 0),
    '[Lời chúc của vị linh mục] Vị linh mục ngôi nhà thờ nhỏ trong khu gặp bạn ngoài cổng, ngỏ ý ban phước cho thanh kiếm. Bạn chẳng mấy tin chuyện ấy, nhưng ông cứ nhẫn nại đứng đợi bằng ánh mắt không chút đòi hỏi.',
    '[The priest’s blessing] A priest at the small church in your district meets you at the gate and offers to bless your sword.',
    [C('Để ông ban phước', 'Let him bless it', 'Ông đặt tay lên chuôi kiếm, đọc một câu ngắn bằng thứ tiếng lạ tai. Bạn không cảm nhận gì khác, nhưng suốt tuần sau thanh kiếm dường như nhẹ tay hơn một chút.', 'He lays a hand on the sword and says a short line in a language you do not understand. You feel nothing, but all the following week the sword seems a little lighter.', { sanity: 3, network: 2 }), C('Từ chối nhã nhặn, nói lời thề của bạn không cần', 'Decline politely, saying your oath needs none', 'Vị linh mục gật đầu bảo: Phải, nhưng đôi khi con người cần được chúc phúc ngay cả khi lời thề chẳng cần. Ông bước đi để lại câu nói ấy theo bạn suốt cả ngày.', 'The priest nods and says: True, but sometimes people need to be blessed even when oaths do not. He goes, and you think about that line all day.', { sanity: 1, rep: 1 })],
    I('Bạn cúi chào lịch sự và đi tiếp.', 'You bow politely and walk on.'), { theme: 'work' }),
  M('m_pinky_unfinished_letter', AGE.GROWN, fneed(P, 1),
    '[Lá thư viết dở] Trong túi một Sworn Blade đã khuất có lá thư gửi người bạn không quen, viết dở ở câu: “Tôi đã hứa sẽ trở về, nhưng...” Bạn có thể tìm người nhận hoặc chôn theo chủ nhân.',
    '[The unfinished letter] A dead Sworn Blade carries a letter addressed to someone you do not know. It ends mid-sentence: “I promised to return, but...” You can find the recipient or bury it with its owner.',
    [C('Tìm người nhận và đưa lá thư', 'Find the recipient and deliver the letter', 'Ba tuần sau bạn lần tới cuối địa chỉ gặp bà lão. Bà đọc lá thư chậm rãi rồi khẽ bảo: “Tôi biết.” Hai người ngồi bên nhau mãi tới lúc trời sập tối.', 'Three weeks later, you find an old woman at the address. She reads the letter slowly and says, “I knew.” You sit together until dark.', { sanity: -3, rep: 5, network: 5 }), C('Chôn lá thư cùng chủ nhân', 'Bury the letter with its owner', 'Bạn đặt lá thư vào bàn tay người đã khuất rồi đậy nắp hòm. Một Sworn Blade khác đứng nhìn không ngăn cản.', 'You put the letter in the dead person’s hand and close the lid. Another Sworn Blade watches without stopping you.', { sanity: 1, rep: 1 })],
    I('Bạn gấp lá thư lại và cất vào túi.', 'You fold the letter and pocket it.'), { theme: 'work' }),
  M('m_pinky_shared_rice', AGE.GROWN, fneed(P, 0),
    '[Bát cơm chung ở nhà tập thể] Tập xong, cả tổ The Pinky ngồi ăn cơm chung chẳng ai nhắc tới lời thề, chỉ tranh cãi chuyện nồi thịt kho hôm nay mặn quá. Lòng bạn tự nhiên nhẹ bẫng.',
    '[Shared rice at the dormitory] The whole Pinky team eats together after practice, and you notice no one speaks of oaths. Only that today’s braised meat is too salty. You feel your heart lighten in an unexplainable way.',
    [C('Ngồi xuống và hùa theo chuyện thịt kho', 'Sit down and join in about the braised meat', 'Cuộc cãi nhau chuyện mặn nhạt kéo dài suốt bữa để rồi cả hội cùng chịu thua. Bạn bật cười thành tiếng, sực nhận ra lâu lắm rồi mình mới cười vô tư đến thế.', 'The argument about saltiness lasts through the meal, and the whole team loses. You laugh in a strange way and realize it has been long since you laughed so.', { sanity: 4, network: 5 }), C('Ăn lặng lẽ và nghe', 'Eat quietly and listen', 'Những câu chuyện vụn vặt trôi qua khiến bạn thấy mình hiểu người ngồi quanh hơn hẳn lúc họ nói chuyện thịt kho thay vì chuyện lời thề.', 'Trifling stories drift by, and you find you understand those around you better when they speak of braised meat than of oaths.', { sanity: 3, network: 3 })],
    I('Bạn ăn nhanh và rời bàn.', 'You eat quickly and leave the table.'), { theme: 'work' }),
  M('m_pinky_name_on_wall', AGE.GROWN, fneed(P, 1),
    '[Tên trên tường tháp] Mỗi người lập thệ với The Pinky đều khắc tên lên tường tháp chuông ở tầm ngang mắt. Hôm nay đi qua, bạn thấy tên mình nằm cạnh cái tên không nhớ từng đứng chung lứa. Hai nét đục khác hẳn nhau nhưng đề cùng một ngày.',
    '[A name on the tower wall] Each oath-taker of the Pinky has their name carved on the bell tower wall at eye level. Today you pass and see your name beside one you do not recall standing next to. The two carvings are very different, but of the same day.',
    [C('Hỏi người giữ sổ về người đó', 'Ask the registry keeper about that name', 'Người giữ sổ tra lại rồi bảo đó là đồng môn cùng khóa lập thệ với bạn, đã mất mười năm trước. Bạn chẳng nhớ nổi gương mặt nhưng đêm đó nằm nghĩ miên man về người từng đứng cạnh mình năm ấy.', 'The keeper says it is someone of your cohort who died ten years ago.', { sanity: -3, network: 3 }), C('Chạm tay lên cả hai cái tên', 'Touch both names with your hand', 'Mặt đá lạnh buốt dưới đầu ngón tay. Hai cái tên dường như tỏa hai hơi ấm khác hẳn khiến bạn rụt tay lại khi thấy tên mình ấm hơn tên người kia.', 'The stone is cold under your fingertips. The two names seem different temperatures, and you withdraw your hand when you notice yours is warmer than the other’s.', { sanity: -2, rep: 1 })],
    I('Bạn liếc nhìn tên mình rồi đi tiếp.', 'You glance at your name then move on.'), { theme: 'work' }),
  M('m_pinky_tea_house_dispute', AGE.GROWN, fneed(P, 1),
    '[Tranh chấp ở quán trà] Hai vị khách trong quán trà cãi vã chuyện một lời hứa mỗi người nhớ một nẻo. Chủ quán biết bạn là Sworn Blade bèn nhờ đứng ra phân xử. Cả hai đều có vẻ thành thật nhưng một mực cho rằng đối phương nói dối.',
    '[Dispute at the tea house] Two patrons in a tea house quarrel about a promise each remembers differently. The owner knows you are a Sworn Blade and asks you to rule. Both seem sincere, and each believes the other lies.',
    [C('Nghe cả hai và đề nghị một lời hứa mới', 'Hear both and propose a new promise', 'Hai người nhìn nhau thật lâu rồi một bên gật đầu bảo thôi, chìa tay ra bắt.', 'The two look at each other a long while. Then one says enough and offers a hand.', { sanity: 3, rep: 4, network: 4 }), C('Chọn một bên dựa trên trực giác', 'Choose a side on instinct', 'Người được bênh thắng lý nhưng bạn thấy người kia nhìn mình bằng ánh mắt đầy oán ức.', 'The chosen one wins, but you see the other regard you as betrayed.', { rep: 1, sanity: -4 })],
    I('Bạn bảo họ tự giải quyết và uống trà tiếp.', 'You tell them to sort it out themselves and go on with your tea.'), { theme: 'work' }),
  M('m_pinky_late_apology', AGE.GROWN, fneed(P, 1),
    '[Lời xin lỗi muộn màng] Người từng bị bạn phạt vì bội thề nhiều năm trước nay tìm đến gặp bạn. Họ không đòi hỏi gì, chỉ muốn nói bây giờ họ hiểu lý do ngày xưa bạn xử như thế rồi cảm ơn bạn. Bạn quên bẵng ngày ấy nhưng gương mặt họ thì còn nhớ nguyên.',
    '[A late apology] Someone you once penalized for breaking an oath, many years ago, comes to see you. They demand nothing, only wish to say that now they understand why you acted so, and thank you.',
    [C('Nhận lời cảm ơn và ngồi nói chuyện', 'Accept their thanks and sit to talk', 'Hai người trò chuyện suốt buổi tới chiều muộn. Họ kể quãng đời sau biến cố cùng những lựa chọn khác; bạn nhìn thấy một con người trưởng thành ngay từ án phạt năm nào. Bạn không dám nhận công nhưng cũng chẳng từ chối.', 'The two of you talk until evening. They tell of the years since, other choices, and you see a person grown from what you penalized. You dare not claim credit, but do not refuse it.', { sanity: 4, rep: 3, network: 5 }), C('Xin lỗi họ trước vì cách mình đã làm', 'Apologize first for how you handled it', 'Họ nhìn bạn bảo đó chẳng phải lời họ tới tìm để nghe. Dù vậy họ vẫn mỉm cười; hai người sóng bước ra phố đi chậm thật chậm.', 'They look at you long and say that is not what they came to hear. But they smile, and the two of you walk out into the street, going slowly.', { sanity: 3, rep: 2, network: 4 })],
    I('Bạn gật đầu và tiễn họ ra cửa.', 'You nod and see them to the door.'), { theme: 'work' }),
  M('m_pinky_sparring_bruise', AGE.GROWN, fneed(P, 0),
    '[Vết bầm sau buổi tập] Buổi tập kiếm gỗ bạn lĩnh trọn một đòn vào mạng sườn để lại vết bầm tím bầm. Đứa học việc lỡ tay cúi đầu xin lỗi rối rít. Bạn xua tay bảo không sao, nhưng cả đêm vết bầm cứ nhói buốt mỗi lúc trở mình.',
    '[Bruise after practice] You take a big bruise at the ribs during wooden-sword practice. The striker is an apprentice, who bows apologizing many times. You say it is nothing, but all night the bruise throbs each time you turn.',
    [C('Nhờ học việc giúp bôi thuốc', 'Ask the apprentice to help apply salve', 'Cậu xoa thuốc rất cẩn thận khiến nỗi áy náy trên mặt vơi đi nhiều. Hai người bàn chuyện thế đánh; bạn còn học ngược được miếng gạt mới từ chính người vừa đánh mình.', 'They are very careful, and through it you see their guilt ease. The two talk technique, and you learn a new parry from the very one who struck you.', { sanity: 2, network: 4, health: 2 }), C('Tự xử lý và không nhắc lại', 'Treat it yourself and mention it no more', 'Vết bầm tím bầm suốt một tuần rồi tan dần. Mỗi lần liếc thấy nó bạn lại nhớ không ai là bất khả chiến bại, lòng bỗng thấy nhẹ nhõm.', 'The bruise stays blue-purple for a week then fades. Each time you look at it you recall no one is invincible, and feel relieved.', { health: -2, sanity: 1 })],
    I('Bạn xoa vết bầm và quay lại tập.', 'You rub the bruise and return to practice.'), { theme: 'work' }),
  M('m_pinky_night_visitor_tea', AGE.GROWN, fneed(P, 2),
    '[Khách đêm với ấm trà] Một Sovereign già ghé nhà bạn lúc nửa đêm, tay xách ấm trà cùng hai chiếc chén. Ông không nói rõ lý do tới thăm. Hai người ngồi đối ẩm; ông chỉ hỏi đúng một câu: Có đêm nào bạn lỡ phá một lời thề chẳng ai hay biết không?',
    '[Night visitor with a teapot] An old Sovereign calls at your home at midnight, carrying a teapot and two cups. He does not say why he came. The two of you sit and drink, and he asks only one question: Is there a night you broke an oath no one knew of?',
    [C('Trả lời thành thật', 'Answer truthfully', 'Bạn kể về một đêm nhiều năm trước; ông khẽ gật đầu chậm chạp như đã biết sẵn. Ông thú nhận đời mình cũng có một đêm như thế chưa từng kể cho ai. Hai người ngồi lặng thinh cạnh nhau tới sáng.', 'You tell of a night many years ago, and he nods very slowly as if he knew. He says he too had such a night and never told anyone. The two of you sit silent until dawn.', { sanity: 3, rep: 4, network: 5 }), C('Nói không có', 'Say there is none', 'Ông nhìn bạn hồi lâu rồi nâng chén cạn sạch. Ông bảo đó là một câu đáp, nhưng không phải câu đáp đúng, xong đứng dậy ra về chẳng nói thêm lời nào.', 'He looks at you very long and drains his cup. He says that is an answer, but not the true one. Then goes, saying no more.', { sanity: -4, rep: 1 })],
    I('Bạn rót thêm trà và đổi chủ đề.', 'You pour more tea and change the subject.'), { theme: 'work' }),
  M('m_pinky_book_of_names', AGE.GROWN, fneed(P, 2),
    '[Cuốn sổ những cái tên] Sổ lời thề của The Pinky đánh dấu từng lần giữ trọn, bẻ cong hay xóa bỏ. Bạn lật tìm thấy tên mình. Số vạch giữ lời thưa thớt hơn hẳn trí nhớ của bạn.',
    '[The book of names] The Pinky’s oath ledger marks each promise kept, bent, or broken. You find your name. There are fewer marks for kept promises than you remember.',
    [C('Đọc hết cuốn sổ của chính mình', 'Read through your own entries', 'Bạn đọc lại từng quyết định mình từng chọn, bên cạnh mỗi dòng đều đính kèm lời phê ngắn bằng nét chữ xa lạ. Bạn ngồi đọc tới tối mịt mới rời đi với cảm giác vừa gặp lại một người lạ mặt thân quen.', 'You see each decision you made, each with a short note in handwriting you do not know. You read until night and leave feeling you have just met again an utter stranger you know well.', { sanity: -4, rep: 3 }), C('Khép sổ lại, không đọc thêm', 'Close the book and read no more', 'Bạn trả cuốn sổ về kệ cũ rồi bước ra ngoài trời sáng. Bạn hiểu có những trang giấy người ta chỉ cần biết mình đủ can đảm lật xem chứ chẳng cần đọc thật.', 'You return the book and step out into daylight. You understand that some things one only wants to know one could look at, not truly look.', { sanity: 2, rep: 1 })],
    I('Bạn lật qua vài trang rồi cất đi.', 'You flip through a few pages and put it away.'), { theme: 'work' })
];

export const PINKY_DAILIES = [
  D('d_pinky_sheath_sound', AGE.GROWN, fneed(P, 0), 'Thanh kiếm trượt vào vỏ đánh tách một tiếng rất khẽ chỉ riêng bạn nghe thấy. Bạn tự hỏi bao nhiêu lời thề đã khép lại bằng thứ âm thanh ấy.', 'The sword slides into its scabbard with a very soft sound only you can hear. You wonder how many oaths have ended with that sound.', {}),
  D('d_pinky_red_ink', AGE.GROWN, fneed(P, 0), 'Mực đỏ ghi sổ lời thề chẳng bao giờ khô ráo hẳn. Bạn đặt đầu ngón tay lên dòng chữ cũ vẫn thấy hơi ẩm như mới viết tức thì.', 'The red ink used in the oath ledgers never dries completely. You rest a finger on an old line and find it slightly damp, as though just written.', {}),
  D('d_pinky_wind_bell', AGE.GROWN, fneed(P, 0), 'Gió lay chiếc chuông nhỏ trước cổng tháp khẽ ngân nga. Bạn đứng lại lắng nghe, sực nhận ra giai điệu ấy từng vang đâu đó trong trí nhớ.', 'Wind makes the small bell at the tower gate chime softly. You stop and listen and realize the same tune once rang somewhere in your memory.', {}),
  D('d_pinky_morning_drill', AGE.GROWN, fneed(P, 0), 'Buổi tập sáng ngoài sân tháp bắt đầu lúc sương chưa kịp tan. Hơi thở mọi người hòa lẫn vào nhau trong im lặng cho tận khi mặt trời nhô lên.', 'The morning drill in the tower yard begins before the mist clears. You watch everyone’s breath blend, and no one speaks until the sun rises.', {}),
  D('d_pinky_blade_edge', AGE.GROWN, fneed(P, 0), 'Bạn thử lưỡi kiếm lên sợi tóc: sợi tóc đứt đôi không một tiếng động. Nhìn hai nửa rơi chầm chậm xuống đất, bạn bỗng nghĩ tới điều gì đó từng bị chém lìa.', 'You test the blade against a single hair, and it parts without a sound. You watch the two halves fall slowly and think of something that has been divided.', {}),
  D('d_pinky_lamp_shadow', AGE.GROWN, fneed(P, 0), 'Cái bóng hắt trên tường tháp dài hơn thường lệ, dường như đứng thẳng thớm hơn cả chính bạn. Bạn chỉnh lại dáng đứng liền thấy chiếc bóng chậm mất một nhịp mới làm theo.', 'Your shadow on the tower wall is longer than usual and seems to stand straighter than you do. You adjust your posture, and the shadow follows, a beat slow.', {}),
  D('d_pinky_wet_stone_step', AGE.GROWN, fneed(P, 0), 'Bậc đá trước cửa tháp trơn ướt sau trận mưa đêm. Bạn bước đi dè dặt, chợt nhận ra mình đang coi mỗi bước chân như một lời thề nhỏ.', 'The stone step before the tower door is wet and slick after the rain. You tread carefully, noticing you are thinking of each step as a small oath.', {}),
  D('d_pinky_old_sword_rack', AGE.GROWN, fneed(P, 0), 'Giá kiếm cũ ngoài sảnh lúc nào cũng chừa trống một ô chính giữa. Chẳng ai nhớ thanh kiếm nào từng dựng đó; mỗi người đi qua đều đặt tay lên khoảng trống ấy như lời chào.', 'The old sword rack in the hall always has one empty slot in the middle. No one knows which sword once stood there, and everyone passing rests a hand on the gap, as in greeting.', {}),
  D('d_pinky_sworn_silence', AGE.GROWN, fneed(P, 0), 'Bữa trưa trôi qua trong im phăng phắc vì hôm nay nhằm ngày giỗ một người trong hội. Tiếng đũa chạm thành bát vang lên như một kiểu trò chuyện không lời.', 'Lunch passes in complete silence, because today is the memorial of one of the team. You hear chopsticks touch bowls and think it is another way of conversation.', {}),
  D('d_pinky_spare_thread', AGE.GROWN, fneed(P, 0), 'Bạn sờ thấy mẩu chỉ đỏ thừa trong túi áo dài chừng một gang tay. Bạn quấn nó quanh ngón tay mà chẳng rõ nó từng thuộc về lời thề nào.', 'You find a spare length of red thread in your coat pocket, about a hand span. You wind it around a finger, not knowing which oath it belonged to.', {}),
  D('d_pinky_candle_vigil', AGE.GROWN, fneed(P, 0), 'Tối nào trong tháp cũng thắp sẵn ngọn nến không rõ ai châm lửa. Trước lúc ra về bạn ngồi ngắm nó một lát, tưởng như ngọn nến ấy đang đếm từng giờ cho ai đó.', 'Each evening a candle is lit in the tower and no one claims to be the lighter. You sit watching it before leaving and feel it is counting time for someone.', {}),
  D('d_pinky_tower_pigeon', AGE.GROWN, fneed(P, 0), 'Con bồ câu đậu trên mái tháp nghiêng đầu nhìn bạn. Bạn khẽ gật đầu, cánh chim liền vỗ bay vào làn sương mù District 16.', 'A pigeon lands on the tower roof and tilts its head at you. You answer with a silent nod, watching it take flight into District 16 fog.', {}),
  D('d_pinky_flour_dust', AGE.GROWN, fneed(P, 0), 'Bụi bột mì từ nhà bếp bay lơ lửng giữa nắng sớm rọi vào sảnh tháp. Từng hạt lóe sáng rồi lịm tắt khiến cả gian sảnh trông như đang thở làn sương mỏng.', 'Flour from the kitchen floats in the tower’s early sunlight. Each grain glints and fades, and the whole hall seems to breathe a thin mist.', {}),
  D('d_pinky_gate_creak', AGE.GROWN, fneed(P, 0), 'Cánh cổng gỗ nặng nề của tháp rít một tiếng dài mỗi lượt mở. Chẳng ai chịu tra dầu bản lề bởi tiếng rít báo hiệu có khách vào, thứ người canh gác buộc phải hay.', 'The tower’s wooden gate gives a long creak when opened. No one oils the hinge because it is said that sound tells someone has entered, and that is what one must know.', {}),
  D('d_pinky_stray_cat', AGE.GROWN, fneed(P, 0), 'Con mèo hoang quen nằm vắt vẻo trên bệ cửa sổ tháp, nhìn đám người tập kiếm không chớp mắt. Từng có người đặt tên cho nó, sau rốt chẳng ai gọi thành tiếng.', 'A stray cat is used to sitting on the tower window ledge, watching everyone practice without blinking. Someone gave it a name, and then no one used it.', {}),
  D('d_pinky_blank_page', AGE.GROWN, fneed(P, 1), 'Góc trang trống trong sổ lời thề dính vệt mực đỏ nhỏ hệt dấu vân tay.', 'A blank page in the oath ledger bears a small red ink mark at the corner, like a fingerprint.', {}),
  D('d_pinky_stove_warmth', AGE.GROWN, fneed(P, 0), 'Bếp lò ngoài sảnh chỉ ấm hiu hiu. Hễ có người mới tới gần, ai ngồi sẵn đều nhích qua một chút như giữ thói lịch sự không cần người dạy.', 'The stove in the hall is always half warm. Everyone sitting near it shifts when another arrives, and you see a courtesy no one needed to teach.', {}),
  D('d_pinky_small_bow', AGE.GROWN, fneed(P, 0), 'Người cùng hội cúi chào bạn thật nhanh lúc lướt ngang qua mà mắt vẫn nhìn thẳng. Bạn gật chào đáp lại đúng chừng mực rồi hai người đi luôn không ngoái đầu.', 'A fellow member bows to you in passing, very briefly, without looking up. You answer the same way and both go on without glancing back.', {}),
  D('d_pinky_long_shadow', AGE.GROWN, fneed(P, 0), 'Chiều muộn, bóng tháp chuông đổ dài qua quảng trường chạm tới mũi giày bạn. Bạn đứng yên trong vệt bóng ấy hồi lâu chẳng mảy may e sợ.', 'In late afternoon the bell tower’s shadow falls across the whole plaza and touches your feet. You stand still in that shadow a while and feel no fear.', {}),
  D('d_pinky_sharpened_pencil', AGE.GROWN, fneed(P, 0), 'Ông giữ sổ ngồi gọt cây bút chì thật nhọn ngay trước mặt bạn. Ông bảo cả đời chỉ mong mỗi điều viết lại đúng những gì thiên hạ thực sự thốt ra.', 'The registry keeper sharpens a pencil to a perfect point before you. He says his whole life he has wanted just one thing: to write down what people truly say.', {}),
  D('d_pinky_rain_on_tiles', AGE.GROWN, fneed(P, 0), 'Mưa gõ lên mái ngói tháp thành nhịp đều tăm tắp trùng khớp tiếng tim đập. Bạn ngồi nghe mãi tới khi tạnh hạt.', 'Rain taps on the tower’s tile roof in an even rhythm, and you realize the beat matches your own heart. You listen until the rain stops.', {}),
  D('d_pinky_forgotten_umbrella', AGE.GROWN, fneed(P, 0), 'Chiếc ô ai bỏ quên ngoài cửa tháp dựng đó đã ba tuần lễ. Chẳng ai đụng tới vì tin người chủ sẽ quay lại; chờ đợi cũng là một phần lời thề.', 'An umbrella left at the tower door has lain there three weeks. No one takes it, because it is said someone will return, and waiting is part of the oath.', {}),
  D('d_pinky_steam_rice', AGE.GROWN, fneed(P, 0), 'Hơi cơm nóng bốc lên làm mờ ô kính bếp tháp. Bạn dùng ngón tay vạch lên lớp sương một con chữ rồi xóa vội trước lúc có người nhìn thấy.', 'Steam from the rice pot fogs the tower kitchen window. You write one character on the glass with a finger, then wipe it away before anyone sees.', {}),
  D('d_pinky_cracked_cup', AGE.GROWN, fneed(P, 0), 'Chiếc chén nứt gắn bó cùng bạn bao năm mà chưa ai bảo nên thay. Sáng nào rót trà nóng vào, đường rạn cũng ngấm thêm một vệt nâu mảnh.', 'Your cracked cup has served years and no one says to replace it. You pour tea in and watch the crack seep a little brown each morning.', {}),
  D('d_pinky_footprint_dew', AGE.GROWN, fneed(P, 0), 'Dấu chân thấm sương của ai đó băng qua sân tháp ngay ngắn thẳng tắp. Bạn dẫm theo đúng lối chân ấy, không chút ngạc nhiên khi thấy chúng dừng ngay bậc cửa nhà mình.', 'Dew-wet footprints of someone ahead of you cross the tower yard, even and straight. You follow exactly those marks and are unsurprised when they stop at your door.', {}),
  D('d_pinky_empty_bench', AGE.GROWN, fneed(P, 0), 'Mọi sáng băng ghế sân tháp đều chật kín, riêng hôm nay trống trơn. Bạn ngồi xuống một mình, chợt nhớ ra đây từng là chỗ quen của người mới mất.', 'The bench in the tower yard is usually full in the morning, and today it is empty. You sit down alone and realize you are sitting in the exact place of someone dead.', {}),
  D('d_pinky_cold_blade_touch', AGE.GROWN, fneed(P, 0), 'Lưỡi kiếm buổi sáng lạnh buốt, tới chiều lại âm ấm trong lòng bàn tay. Không ai cắt nghĩa nổi lý do nên bạn thôi thắc mắc.', 'The blade is icy when you touch it in the morning and warmer in the evening. No one can explain why, and you have stopped asking.', {}),
  D('d_pinky_distant_thunder', AGE.GROWN, fneed(P, 0), 'Tiếng sấm rền xa xăm đều đặn như hồi trống giục trận đấu chưa kịp khai màn. Cả sân tập ngưng tay lắng nghe một nhịp rồi tiếp tục.', 'Thunder rumbles far off, very steady, like a drum beat for a duel not yet begun. The whole tower yard pauses practice to listen, then resumes.', {}),
  D('d_pinky_folded_robe', AGE.GROWN, fneed(P, 0), 'Bộ áo choàng lập thệ gấp nếp gọn gàng trong ngăn tủ; bạn nhận ra lâu lắm rồi mình chưa khoác lại nó. Bạn vuốt nhẹ mặt vải một lát rồi khép cánh tủ.', 'Your oath-taking robe is folded neatly in the wardrobe, and you realize you have not worn it for some time. You touch the cloth a while then close the wardrobe.', {}),
  D('d_pinky_sealed_envelope', AGE.GROWN, fneed(P, 1), 'Phong bì niêm sáp đỏ đặt sẵn trên bàn mà chẳng ai nhận đã gửi tới. Bạn mặc kệ không bóc. Hôm sau chiếc phong bì biến mất như thể đã có cách đọc khác.', 'An envelope sealed in red wax lies on your desk and no one claims to have placed it. You do not open it. You leave it there, and the next day it vanishes, as if read in another way.', {})
];
