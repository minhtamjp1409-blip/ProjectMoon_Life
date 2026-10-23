// The Pinky: oaths that are kept by blades. A word given to the Pinky is a debt the Pinky collects,
// and a Sworn Blade is the hand that collects it. The missions here are all some form of the same
// request: hold a promise up to the light and decide whether it is the letter or the spirit that
// binds. The Pinky keeps a ledger of both answers.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

const P = 'Pinky';

export const PINKY_EVENTS = [
  // ------------------------------------------------------------------ missions
  fe('pinky_witness_oath', P, [0, 3],
    '[Người chứng lời thề] Hai thương nhân ngồi đối diện trên một chiếc bàn trống, giữa họ là một cuộn dây đỏ và một con dao nhỏ. Họ sắp lập một giao kèo ba mươi năm, và The Pinky cử bạn làm người chứng. Bạn không được nói, không được cử động, chỉ được nhìn. Đến cuối, bạn sẽ phải nói một câu duy nhất: nó đã được lập.',
    '[Witness to an oath] Two merchants sit across an empty table, between them a coil of red thread and a small knife. They are about to swear a thirty-year pact, and the Pinky sends you as witness. You may not speak, may not move, only watch. At the end you must say one sentence: It has been sworn.',
    [
      fc('Chứng kiến trọn vẹn và nói câu cuối đúng như lệ', 'Witness fully and speak the final sentence as custom demands',
        'Hai người cùng cắt đầu ngón tay, và sợi dây đỏ thấm cả hai giọt máu. Bạn nói ba chữ, và cả căn phòng như nhẹ đi. Cuộn dây được cất vào một hộp gỗ, và bạn nhận ra mình sẽ nhớ khoảnh khắc ấy lâu hơn họ.',
        'Both nick a fingertip, and the red thread soaks up both drops. You speak your three words and the whole room seems to lighten. The coil is put into a wooden box, and you realize you will remember this moment longer than they will.',
        { rep: 6, network: 5, sanity: -2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nhận thấy một bên đang giấu điều gì và lên tiếng', 'Sense one side is hiding something and speak up', [
        [55, 'Bạn phá lệ nói trước, và hỏi thẳng một câu. Người thương nhân tái mặt, và buổi lễ bị hoãn. Hóa ra ông ta định bán khoản vay cho một Syndicate khác ngay sau khi ký. Cả hai bên cảm ơn bạn bằng những cách rất khác nhau.', 'You break custom and speak first, asking one direct question. The merchant goes pale, and the ceremony is postponed. It turns out he meant to sell the loan to another Syndicate right after signing. Both sides thank you in very different ways.', { rep: 9, network: 6, sanity: -3 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Lời bạn không có cơ sở, và cả hai thương nhân nổi giận vì buổi lễ bị phá. The Pinky phạt bạn một khoản và ghi một dòng vào hồ sơ về sự vội vàng.', 'Your words have no ground, and both merchants are furious at the ceremony’s disruption. The Pinky fines you and notes a line on your record about haste.', { rep: -8, wealth: -6, sanity: -4 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Rời phòng, nói bạn không muốn chứng cho điều bạn không tin', 'Leave the room, saying you will not witness what you do not believe',
        'Hai thương nhân nhìn nhau, và một người cười lạnh. The Pinky tìm người khác, và bạn bị ghi tên vào danh sách chưa đủ lòng tin. Nhưng đêm đó bạn ngủ rất ngon.',
        'The two merchants look at each other and one laughs coldly. The Pinky finds another witness, and you are logged as lacking faith. But that night you sleep very soundly.',
        { sanity: 4, rep: -5, network: -2 }, { flagsAdd: ['pinky_bent_word'] })
    ], { weight: 11 }),

  fe('pinky_sworn_blade_delivery', P, [1, 3],
    '[Thanh kiếm cho người lập thệ] Một đao thủ trẻ sắp lập lời thề trọn đời với The Pinky, và theo lệ phải nhận từ tay một Sworn Blade một thanh kiếm rèn từ sao, rồi chọn nó làm thanh kiếm duy nhất của mình. Hôm nay là bạn. Thanh kiếm nằm trong một vỏ gỗ cũ, nặng hơn nó trông. Người đao thủ đã đứng chờ ở tháp chuông từ lúc rạng sáng.',
    '[A sword for the oath-taker] A young swordsman is about to swear a lifelong oath to the Pinky and by custom must receive a star-forged sword from the hand of a Sworn Blade and appoint it as their one and only. Today that is you. The sword lies in an old wooden scabbard, heavier than it looks. The swordsman has waited at the bell tower since dawn.',
    [
      fc('Trao kiếm đúng nghi thức, không nói thêm', 'Hand over the sword by the rite and say no more',
        'Người đao thủ cúi đầu rất sâu, hai tay nhận kiếm, và không nhìn bạn. Chuông tháp điểm đúng một tiếng. Cả hai nghe nó ngân dài, và không ai nói gì cho đến khi nó tắt.',
        'The swordsman bows very deep, receives the sword with both hands, and does not look at you. The tower bell strikes once. You both hear it ring long, and neither speaks until it fades.',
        { rep: 5, sanity: -1, network: 4 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nhắc người đao thủ rằng họ vẫn có thể từ chối', 'Remind the swordsman they may still refuse', [
        [55, 'Người ấy im lặng. Rồi cậu ta nói: Tôi biết. Cậu nhận kiếm, và lần đầu tiên bạn thấy một lời thề được lập với đôi mắt hoàn toàn mở. Tên cậu được ghi vào Pinky với một nét viết đậm hơn.', 'The swordsman is silent a long while. Then says: I know. They take the sword, and for the first time you see an oath sworn with eyes wide open. Their name is entered in the Pinky with a heavier stroke.', { rep: 7, sanity: 3, network: 5 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Người đao thủ hoảng hốt và rút lui. Cậu bỏ đi qua cầu thang tháp, và không ai tìm thấy cậu trong một tháng. The Pinky ghi rằng bạn làm lung lay lòng thề của một người.', 'The swordsman panics and withdraws. They go off down the tower stairs and no one finds them for a month. The Pinky records that you shook a man’s resolve.', { rep: -6, sanity: -5, network: -3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Trao kiếm, kèm một lời chúc của riêng bạn', 'Hand it over with a wish of your own',
        'Bạn nói một câu khẽ về việc giữ lời mà không gánh nặng. Người đao thủ nhìn bạn hồi lâu, rồi mỉm cười rất khẽ. Từ ngày ấy, mỗi lần thấy bạn ở hành lang, cậu cúi chào trước.',
        'You say a quiet line about keeping one’s word without being crushed by it. The swordsman looks at you long, then smiles faintly. From that day each time they see you in a corridor, they bow first.',
        { sanity: 3, network: 6, rep: 4 })
    ]),

  fe('pinky_hunt_oathbreaker', P, [1, 3],
    '[Kẻ bội ước] Một người của The Pinky đã vi phạm lời thề, bỏ trốn cùng bốn mươi lượng bạc của ngân quỹ. Tên hắn được ghi vào danh sách đen, và bạn nhận lệnh đi tìm. The Pinky không nói phải làm gì khi tìm thấy. Chỉ nói bạn sẽ biết.',
    '[The oathbreaker] A member of the Pinky has violated their oath and fled with forty silver of the treasury. Their name is added to the black list, and you are ordered to find them. The Pinky does not say what to do when found. Only that you will know.',
    [
      fg('Tìm ra và đưa hắn về trước The Pinky', 'Find them and bring them before the Pinky', [
        [55, 'Hắn đang sống trong một căn phòng nhỏ với người nhà và hai đứa con, và dùng số bạc để chữa bệnh cho đứa lớn. Hắn không chống cự. Khi bạn đưa hắn về, The Pinky nghe câu chuyện và giảm một nửa án phạt. Bạn đứng sau hắn suốt buổi.', 'They live in a small room with spouse and two children, and used the silver to treat the elder child’s illness. They do not resist. When you bring them back, the Pinky hears the story and halves the sentence. You stand behind them the whole hearing.', { rep: 8, sanity: -4, network: 5 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Hắn bỏ chạy ngay khi thấy bạn, và bạn mất ba ngày đuổi theo qua các hẻm và nhà ga. Khi bắt kịp, hắn không có gì ngoài chiếc áo đã sờn, và bạn mất cả sức lẫn hứng thú.', 'They bolt on sight of you, and you lose three days chasing through alleys and stations. When you catch up they own nothing but a worn coat, and you have lost both strength and appetite.', { health: -10, rep: 3, sanity: -6 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Tìm thấy, và để hắn đi sau khi lấy lại số bạc còn dư', 'Find them and let them go after retrieving the remaining silver',
        'Bạn nhận lại hai phần ba số bạc và báo là chỉ tìm được một phần. The Pinky ghi chú rất ngắn.',
        'You recover two thirds of the silver and report finding only part. The Pinky notes it very briefly.',
        { rep: -2, sanity: -3, wealth: 4 }, { flagsAdd: ['pinky_bent_word'] }),
      fc('Từ chối nhiệm vụ, nói bạn không săn người cùng thề', 'Refuse the task, saying you do not hunt someone who swore beside you',
        'The Pinky lặng đi, rồi giao việc cho một Sworn Blade khác. Ba tuần sau người bội ước được tìm thấy, và bạn không hỏi chuyện gì xảy ra. Từ đó, những việc nhạy cảm không đến tay bạn nữa.',
        'The Pinky is silent, then hands the task to another Sworn Blade. Three weeks later the oathbreaker is found, and you ask what happened. From then on sensitive tasks no longer reach your hands.',
        { sanity: 2, rep: -8, network: -4 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [24, 90] }),

  fe('pinky_bell_tower_watch', P, [0, 3],
    '[Ca gác tháp chuông] Một đêm gác trong tháp chuông cũ của The Pinky, một mình, với một cây nến và một chiếc kiếm đặt trên đầu gối. Chuông chỉ được rung khi có kẻ vi phạm lời thề, và đã mười năm nó không rung. Đến giờ thứ ba, bạn nghe một âm thanh mà bạn không nhận ra từ bên trong lòng chuông.',
    '[Watch in the bell tower] A night of watch in the Pinky’s old bell tower, alone, with a candle and a sword across your knees. The bell rings only when someone breaks an oath, and has not rung in ten years. In the third hour you hear a sound you do not recognize from inside the bell.',
    [
      fc('Ngồi yên, lắng nghe, không động đậy', 'Sit still, listen, do not stir',
        'Âm thanh ấy hóa ra là một tiếng thở dài rất nhỏ, như của người đang ngủ. Đến sáng nó ngừng. Bạn không kể với ai, nhưng từ đêm ấy bạn thôi sợ một thứ mà trước đó bạn không biết mình sợ.',
        'The sound turns out to be a very faint sigh, like that of someone sleeping. By morning it stops. You tell no one, but from that night you cease to fear something you had not known you feared.',
        { sanity: 2, rep: 4, network: 2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Leo lên kiểm tra bên trong lòng chuông', 'Climb up and check the inside of the bell', [
        [50, 'Bạn thấy một con chim nhỏ làm tổ trong lòng chuông. Nó đã ở đây một lúc, vì có cả một lớp lông vũ dày. Bạn xuống thang và không báo cáo, vì không ai muốn nghe chuông bị làm phiền.', 'You find a small bird has built a nest inside the bell. It has been there a long time, with a thick layer of down. You climb down and do not report, because no one would want the bell disturbed.', { sanity: 3, rep: 1, network: 3 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Khi bạn chạm vào lòng chuông, nó ngân lên một tiếng đơn lẻ, thấp và dài. Cả tháp rung nhẹ, và bên dưới, tiếng người gọi nhau vang lên. Bạn phải giải thích vì sao chuông rung khi không có vi phạm.', 'As you touch the inside of the bell, it rings a single low, long note. The whole tower trembles, and below people call out to each other. You must explain why the bell rang when no oath was broken.', { rep: -7, sanity: -6 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Gọi một người gác khác lên cùng', 'Call another watcher up to join you',
        'Hai người ngồi cạnh nhau cả đêm, và âm thanh ngừng khi người kia đến. Người gác kia nói điều đó thường xảy ra. Họ nói rằng chuông chỉ muốn một người nghe, không muốn hai.',
        'The two of you sit side by side all night, and the sound stops when the other arrives. The other watcher says this often happens. They say the bell wants only one listener, not two.',
        { sanity: 1, network: 5, rep: 1 })
    ]),

  fe('pinky_secret_ledger_courier', P, [1, 3],
    '[Sổ cái bí mật] Bạn phải mang một cuốn sổ cái nhỏ, bọc da đen, từ một Nest này sang một Nest khác, qua ba cửa kiểm soát và hai khu Backstreets. Không ai được biết bên trong có gì, kể cả bạn. The Pinky nói ai mở nó sẽ phải trả bằng một thứ bạn không muốn trả.',
    '[The secret ledger] You must carry a small black-leather ledger from one Nest to another, through three checkpoints and two Backstreets districts. No one must know what it holds, including you. The Pinky says whoever opens it will pay with something you would not want to pay.',
    [
      fc('Mang đi, không mở, không dừng', 'Carry it, unopened, without stopping',
        'Bạn đến nơi đúng giờ, và người nhận ký xác nhận mà không nhìn bạn. Suốt đường về, bạn thấy cuốn sổ nặng hơn trong trí nhớ so với trong tay.',
        'You arrive on time, and the recipient signs for it without looking at you. All the way back the ledger weighs more in memory than it did in hand.',
        { rep: 6, wealth: 6, sanity: -2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Mở một trang để biết mình đang mang gì', 'Open one page to know what you carry', [
        [50, 'Trang ấy chỉ có một cột tên người, và một cột số tiền. Tên cuối cùng là của bạn, với một con số bạn không nhận ra. Bạn đóng lại, tay lạnh toát, và đến nơi mà không dám nhìn ai.', 'The page holds only a column of names and a column of sums. The last name is yours, with a figure you do not recognize. You shut it, hands ice cold, and reach your destination without daring to look at anyone.', { sanity: -9, rep: 3 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Trang ấy là một lời thề cổ bằng một thứ chữ bạn không đọc được. Cả buổi chiều bạn nghe tiếng lẩm bẩm trong đầu, và đến nơi, người nhận nhìn bạn rất lâu rồi nói họ biết bạn đã mở nó.', 'The page is an old oath in a script you cannot read. All afternoon you hear murmuring in your head, and on arrival the recipient looks at you a long while and says they know you opened it.', { sanity: -7, rep: -6 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Giao sổ cho một người khác tin cậy mang hộ', 'Hand the ledger to someone trusted to carry it',
        'Người ấy nhận mà không hỏi, và mang đến nơi an toàn. The Pinky nghe chuyện và nhìn bạn một lúc rất lâu. Họ nói bạn không phá lời thề, nhưng bạn đã bẻ cong nó, và họ ghi lại điều đó.',
        'They accept without asking and carry it safely. The Pinky hears and regards you a long moment. They say you did not break the oath, but you bent it, and they note that.',
        { sanity: 1, rep: -3, network: 3 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [24, 90] }),

  fe('pinky_vow_trial', P, [1, 3],
    '[Thử lòng thề] Một ứng viên xin vào The Pinky, và bạn được giao thử lòng thề của người ấy. Cách thử: để họ hứa một điều nhỏ, rồi dựng một tình huống mà giữ lời có giá đắt. Hôm nay lời hứa là không nói với ai tên của một người, và tình huống bạn đã chuẩn bị là một đứa trẻ bị đe dọa.',
    '[Testing the vow] A candidate seeks to join the Pinky, and you are assigned to test their vow. The method: let them promise something small, then construct a situation in which keeping it is costly. Today the promise is to tell no one a certain name, and the situation you prepared is a child under threat.',
    [
      fc('Thực hiện bài thử đúng như được giao', 'Carry out the test exactly as assigned',
        'Ứng viên đứng im, mồ hôi nhỏ xuống trán, và không nói tên. Đứa trẻ trong tình huống hóa ra là một diễn viên, và khi bài thử kết thúc ứng viên nhìn bạn mà không nói gì. Bạn không hãnh diện.',
        'The candidate stands still, sweat dripping from the brow, and does not speak the name. The child in the scene turns out to be an actor, and when the test ends the candidate looks at you a long while without a word. You are not proud.',
        { rep: 5, sanity: -6, network: -3 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nói với ứng viên trước rằng đây chỉ là một bài thử', 'Tell the candidate beforehand that this is only a test', [
        [55, 'Ứng viên ngạc nhiên rồi cười rất lớn. Họ nói họ biết, và đã quyết định giữ lời thề dù thế nào, vì đó chính là điều lời thề nghĩa là. Bạn ghi vào hồ sơ: Đáng tin.', 'The candidate is surprised then laughs very loudly. They say they knew, and had decided to keep the vow whatever, since that is what a vow means. You write in the file: Trustworthy.', { rep: 6, sanity: 3, network: 5 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'The Pinky biết bạn đã tiết lộ, và hủy bài thử. Ứng viên bị hoãn một năm, và bạn bị cảnh cáo vì làm hỏng quy trình.', 'The Pinky learns you revealed it and voids the test. The candidate is deferred a year, and you are warned for spoiling the process.', { rep: -8, sanity: -4 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối thực hiện, nói lòng thề không thể thử bằng một đứa trẻ', 'Refuse, saying a vow cannot be tested with a child',
        'The Pinky nghe lý do và im lặng hồi lâu. Rồi họ nói bài thử sẽ được thiết kế lại.',
        'The Pinky hears the reason and is silent a very long time. Then says the test will be redesigned.',
        { sanity: 4, rep: -2, network: 3 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [26, 90] }),

  fe('pinky_blood_contract', P, [0, 3],
    '[Giao kèo bằng máu] Một đoàn thương nhân yêu cầu một giao kèo có đóng dấu máu của The Pinky để bảo đảm một chuyến hàng xuyên bốn District. Bạn là người đóng dấu. Theo lệ, người đóng dấu chịu một phần trách nhiệm nếu giao kèo bị phá, và một phần nữa nếu nó bị bẻ cong.',
    '[A contract in blood] A merchant caravan requests a contract stamped with the Pinky’s blood seal to guarantee a shipment across four Districts. You are the one who stamps. By custom the stamper bears part of the responsibility if the contract is broken, and another part if it is bent.',
    [
      fc('Đóng dấu, đọc kỹ từng điều khoản trước', 'Stamp it, having read every clause first',
        'Bạn tìm thấy hai điều khoản mơ hồ và yêu cầu làm rõ. Các thương nhân bất mãn nhưng ký lại. Chuyến hàng đến nơi an toàn, và mỗi lần nghe tên giao kèo ấy, bạn nhớ cái cảm giác của chiếc dấu đỏ trong tay.',
        'You find two vague clauses and demand clarification. The merchants grumble but sign again. The shipment arrives safely, and each time you hear that contract’s name, you recall the feel of the red stamp in your hand.',
        { rep: 7, wealth: 6, network: 4, sanity: -1 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Đóng dấu ngay vì họ đang vội', 'Stamp it at once because they are in a hurry', [
        [55, 'Chuyến hàng diễn ra suôn sẻ, và các thương nhân tặng bạn một khoản thưởng nhỏ. Nhưng suốt tuần bạn nghĩ về những điều khoản mình chưa đọc, và mỗi tin tức ở bốn District làm bạn giật mình.', 'The shipment goes smoothly, and the merchants give you a small bonus. But all week you think of the clauses you did not read, and each news item from the four Districts startles you.', { wealth: 8, rep: 3, sanity: -5 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Một điều khoản bị hiểu sai ở District thứ ba, và chuyến hàng bị chặn. The Pinky gọi bạn ra giải trình, và phần trách nhiệm của bạn là một nửa tổn thất.', 'A clause is misread in the third District, and the shipment is held. The Pinky calls you in to account, and your share is half the loss.', { wealth: -12, rep: -7, sanity: -5 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối đóng dấu, nói giao kèo không hợp lệ', 'Refuse to stamp, saying the contract is invalid',
        'Các thương nhân giận và đi tìm một Pinky khác. Bạn nghe tin họ tìm được, và chuyến hàng thất bại giữa đường. Một Sworn Blade già nhìn bạn khi đi qua hành lang và gật đầu rất khẽ.',
        'The merchants are angry and seek another Pinky. You hear they found one, and the shipment fails midway. An old Sworn Blade glances at you passing in the corridor and nods very slightly.',
        { sanity: 3, rep: 3, wealth: -3 }, { flagsAdd: ['pinky_kept_word'] })
    ]),

  fe('pinky_unlawful_order', P, [1, 3],
    '[Lệnh trái lời thề] Một Sovereign của The Pinky ra lệnh cho bạn làm một việc đi ngược lời thề bạn từng lập với một người khác trước khi vào hội. Cả hai lời thề đều đúng, và cả hai đều không thể giữ cùng lúc. Bạn đứng giữa, và không ai muốn giúp.',
    '[An order against your oath] A Sovereign of the Pinky orders you to do something that goes against an oath you swore to another before joining. Both oaths are valid, and cannot both be kept. You stand between, and no one wishes to help.',
    [
      fc('Giữ lời thề với The Pinky, phá lời thề cũ', 'Keep the oath to the Pinky and break the old one',
        'Bạn làm theo lệnh. Người nhận lời thề cũ không nói gì, chỉ nhìn bạn một lúc. Đêm đó bạn ngồi viết một lá thư giải thích, và đốt nó trước khi gửi. Bạn không phá lời thề, nhưng nó đã vỡ trong tay bạn.',
        'You carry out the order. The holder of your old oath says nothing, only looks at you a long while. That night you write a letter explaining and burn it before sending.',
        { rep: 5, sanity: -9, network: -4 }, { flagsAdd: ['pinky_bent_word'] }),
      fg('Giữ lời thề cũ, từ chối lệnh của Sovereign', 'Keep the old oath and refuse the Sovereign’s order', [
        [50, 'Sovereign nghe xong, và lâu sau mới nói rằng ông đã chờ xem bạn chọn gì. Ông nói người dám giữ lời thề trước nhất, dù trái lệnh, là loại người The Pinky cần nhất. Ông rút lại lệnh.', 'The Sovereign hears you and long after says he was waiting to see what you chose. He says one who dares keep the first oath above all, even against orders, is who the Pinky needs most. He withdraws the order.', { rep: 9, sanity: 4, network: 6 }, { flagsAdd: ['pinky_kept_word'] }],
        [50, 'Sovereign nghe. Ba ngày sau, một Sworn Blade khác làm việc đó, và bạn bị gạch khỏi danh sách tín nhiệm. Bạn giữ được lời thề, và mất đi con đường mà nó dẫn tới.', 'The Sovereign hears. Three days later another Sworn Blade does the task, and you are struck from the trust list. You keep your oath, and lose the road it led to.', { rep: -9, sanity: 2, network: -3 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Xin Sovereign cho một đêm để suy nghĩ', 'Ask the Sovereign for one night to think',
        'Ông cho. Bạn ngồi một mình trong tháp chuông, nghĩ về cả hai lời thề, và ngày hôm sau đưa ra một câu trả lời mà ngay cả bạn cũng không đoán trước. Hai bên đều không hoàn toàn bằng lòng.',
        'He grants it. You sit alone in the bell tower thinking of both oaths, and the next day give an answer even you did not foresee. Neither side is entirely satisfied.',
        { sanity: -3, rep: 2, network: 2 })
    ], { age: [28, 90], weight: 11 }),

  fe('pinky_hostage_oath', P, [1, 3],
    '[Con tin và lời thề] Gia đình một con tin tìm đến bạn lúc nửa đêm, quỳ trước cửa. Họ xin bạn lập lời thề mang người thân về, trước khi Syndicate giữ người ấy quyết định điều gì. Lời thề của The Pinky không thể nuốt, và họ biết rõ giá trị của nó.',
    '[Hostage and oath] A hostage’s family comes to you at midnight, kneeling at your door. They beg you to swear to bring their kin home before the Syndicate holding them decides anything. The Pinky’s oath cannot be swallowed, and they know exactly its worth.',
    [
      fc('Lập lời thề đưa người ấy về, bất kể giá nào', 'Swear to bring them home at any cost',
        'Bạn cắt đầu ngón tay, và máu thấm vào một sợi dây đỏ nhỏ. Bạn mất sáu ngày và một vết thương sâu, nhưng người con tin trở về. Gia đình không biết bày tỏ thế nào, và đặt một chiếc bánh ngọt trước cửa nhà bạn mỗi tuần suốt năm.',
        'You nick a fingertip, and blood soaks into a small red thread. It takes six days and a deep wound, but the hostage returns. The family does not know how to express thanks, and puts a sweet cake on your doorstep every week for a year.',
        { health: -14, rep: 9, network: 8, sanity: 2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Hứa cố hết sức nhưng không lập lời thề', 'Promise to try your best but not swear', [
        [55, 'Gia đình nhìn bạn rất lâu, rồi cúi đầu. Bạn cứu được người con tin sau bốn ngày, nhưng một người trong nhóm giữ tin bị chết. Bạn không phá lời nào, nhưng cảm giác thiếu một thứ vẫn theo bạn.', 'The family stares at you a long while then nods. You rescue the hostage after four days, but one of the captors dies. You break no word, but the sense of something lacking follows you.', { health: -8, rep: 6, sanity: -6, network: 5 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Bạn không kịp. Người con tin được tìm thấy ba ngày sau ở một nơi không ai muốn nhắc. Gia đình không trách bạn, chỉ lặng lẽ trả lại số tiền họ đã dành cho chuyến này.', 'You are too late. The hostage is found three days later in a place no one wishes to name. The family does not blame you, only quietly returns the money they had saved for this.', { rep: -3, sanity: -12, wealth: 3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối, nói đó không phải việc của The Pinky', 'Decline, saying this is not the Pinky’s business',
        'Họ đứng dậy chậm, không van xin thêm. Nhiều tuần sau bạn nghe người con tin được thả ra nhờ một người khác. Bạn không đến chúc mừng, và không dám nhìn ai trong gia đình ấy ngoài chợ.',
        'They rise slowly and plead no more. Many weeks later you hear the hostage was freed thanks to someone else.',
        { sanity: -8, rep: -4 }, { flagsAdd: ['pinky_bent_word'] })
    ], { age: [24, 90] }),

  fe('pinky_elder_duel', P, [1, 3],
    '[Lời thách của người già] Một Sworn Blade đã nghỉ hưu thách bạn đấu vì ông cho rằng bạn xúc phạm danh dự The Pinky khi bẻ một lời thề cách đây một năm. Ông không muốn giết bạn. Ông muốn xem bạn có đứng thẳng hay không khi lưỡi kiếm đến gần.',
    '[The elder’s challenge] A retired Sworn Blade challenges you to a duel, claiming you insulted the Pinky’s honor when you bent an oath a year ago. He does not wish to kill you. He wishes to see whether you stand straight when the blade approaches.',
    [
      fc('Nhận lời, đứng thẳng và đấu hết sức', 'Accept, stand straight and fight with all you have',
        'Ông già đấu như một người ba mươi tuổi. Bạn mất hai mươi phút và hai vết cắt nhỏ, và cuối cùng ông dừng lại, đặt kiếm xuống, và nói bạn đã đứng thẳng. Ông không nói lời nào về lời thề, nhưng trước khi đi, ông chạm vào vai bạn.',
        'The old man fights like a thirty-year-old. You spend twenty minutes and two small cuts, and in the end he stops, sets down his sword, and says you stood straight. He says nothing of the oath, but before leaving, he touches your shoulder.',
        { health: -8, rep: 8, sanity: 3, network: 4 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nhận lời, nhưng đấu chỉ để chịu đòn', 'Accept but fight only to take the blows', [
        [55, 'Bạn đỡ, né, và không đánh trả một lần. Cuối cùng ông già dừng lại, thở dốc, và hỏi bạn vì sao. Bạn nói bạn không có gì để chứng minh. Ông nhìn bạn, rồi cười, và chấm dứt cuộc thách đấu.', 'You parry, dodge, and never strike back. At last the old man stops, panting, and asks why. You say you have nothing to prove. He looks at you a long while, then laughs, and ends the challenge.', { health: -6, rep: 6, sanity: 4, network: 3 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Ông già coi đó là sự khinh thường và đánh nặng tay hơn. Bạn gục xuống, và ông đứng nhìn với vẻ thất vọng sâu sắc.', 'The old man takes it as contempt and strikes harder. You fall, and he stands looking on with deep disappointment.', { health: -18, rep: -4, sanity: -5 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối, xin lỗi ông về lời thề đã bẻ', 'Decline and apologize to him for the bent oath',
        'Ông già im lặng hồi lâu. Rồi ông nói lời xin lỗi ấy đáng giá hơn một trận đấu, nhưng chỉ khi nó thành thật. Bạn nói bạn không chắc nó có thành thật, và ông gật đầu, như đó cũng là điều ông muốn nghe.',
        'The old man is silent a long time. Then says that apology is worth more than a duel, but only if sincere. You say you are not sure it is, and he nods, as if that too was what he wanted to hear.',
        { sanity: 2, rep: 3, network: 4 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [28, 90] }),

  fe('pinky_bride_escort', P, [0, 3],
    '[Hộ tống cô dâu] Một hôn sự bằng giao kèo được ký giữa hai gia đình Nest, và The Pinky cử bạn hộ tống cô dâu từ Nest này sang Nest kia. Cô gái ngồi im trong xe, bàn tay đặt chặt lên đầu gối. Giữa đường, cô khẽ nói rằng cô chưa bao giờ gặp người sẽ cưới mình.',
    '[Escorting the bride] A contract marriage is signed between two Nest families, and the Pinky sends you to escort the bride from one Nest to the other. The girl sits still in the carriage, hands pressed hard upon her knees. Midway she says softly that she has never met her future spouse.',
    [
      fc('Đưa cô đến nơi đúng như hợp đồng', 'Deliver her as the contract requires',
        'Cô gái bước vào sảnh nhà người ta với cái đầu cúi thấp, và bạn không nhìn lâu. Hợp đồng được hoàn thành, và The Pinky khen bạn gọn gàng.',
        'The girl walks into her spouse’s hall with head lowered, and you do not look long. The contract is fulfilled, and the Pinky praises your tidiness.',
        { rep: 6, sanity: -7, wealth: 6 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Dừng xe và hỏi cô có muốn tiếp tục', 'Stop the carriage and ask whether she wishes to go on', [
        [50, 'Cô nhìn bạn một lúc lâu, rồi nói cô muốn tiếp tục, vì không còn lựa chọn nào khác. Cô cảm ơn bạn đã hỏi. Hôm sau bạn nghe cô đã đến nơi an toàn, và người sắp thành người nhà của cô tặng cô một chiếc đèn nhỏ.', 'She looks at you a long while then says she wishes to continue, having no other choice. She thanks you for asking. The next day you hear she arrived safely, and her future spouse gave her a small lamp.', { sanity: 3, rep: 4, network: 4 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Cô nói không. Bạn phải chọn giữa hợp đồng và cô. Bạn quay xe đưa cô đến một người họ hàng xa, và hai gia đình Nest cùng gọi The Pinky đến giải thích.', 'She says no. You must choose between the contract and her. You turn the carriage and take her to a distant relative, and both Nest families summon the Pinky to explain.', { rep: -8, sanity: 4, heat: 6 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Im lặng và chở cô đến nơi, nhưng ở lại cổng đến khi cô vào hẳn', 'Stay silent and deliver her but wait at the gate until she is fully inside',
        'Bạn đứng đó một giờ sau khi cô vào. Cô quay lại một lần ở cánh cửa trong, và hai người nhìn nhau qua khoảng sân một lúc. Rồi cô vào hẳn, và bạn rời đi mà không dám nghĩ.',
        'You stand there an hour after she enters. She turns once at the inner door, and the two of you look at each other across the courtyard a long time. Then she goes fully in, and you leave without daring to think.',
        { sanity: -4, rep: 4, network: 2 }, { flagsAdd: ['pinky_kept_word'] })
    ]),

  fe('pinky_loophole', P, [1, 3],
    '[Kẽ hở trong giao kèo] Một khách hàng tìm ra một kẽ hở trong giao kèo ông ký với The Pinky năm năm trước. Theo từng chữ, ông không còn nợ gì. Theo tinh thần, ông nợ một người đã giúp ông thoát khỏi một Syndicate. Ông muốn bạn xác nhận rằng chữ nghĩa quan trọng hơn.',
    '[A loophole in the contract] A client has found a loophole in the contract he signed with the Pinky five years ago. By the letter, he owes nothing. By the spirit, he owes a debt to someone who helped him escape a Syndicate. He wants you to confirm that the letter matters more.',
    [
      fc('Xác nhận chữ nghĩa và để ông đi', 'Confirm the letter and let him go',
        'Ông khách mỉm cười, đặt một khoản tiền thưởng lên bàn và bước ra. Bạn ghi vào sổ chính xác những gì đã nói, đúng từng chữ. Nhưng sáng hôm sau bạn đi ngang một ngôi nhà, và nhận ra đó chính là nhà của người đã giúp ông.',
        'The client smiles, sets a gratuity on the table and goes out. You record precisely what was said, to the letter. But next morning you pass a house and realize it is that of the one who helped him.',
        { wealth: 10, rep: 2, sanity: -8 }, { flagsAdd: ['pinky_bent_word'] }),
      fg('Nói với ông rằng tinh thần mới là điều quan trọng', 'Tell him the spirit matters more', [
        [55, 'Ông khách nhìn bạn rất lâu, rồi nói lẽ ra ông phải biết. Ông trả món nợ, thậm chí nhiều hơn. Người giúp ông không nhận, nhưng cả hai ngồi cùng nhau ăn tối, và bạn nghe nói họ vẫn còn quen nhau.', 'The client looks at you some time, then says he should have known. He pays the debt, even more. The one who helped him declines, but the two sit down to dinner together, and you hear they are still acquainted.', { rep: 8, sanity: 5, network: 6 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Ông khách nổi giận và rời đi, đe dọa kiện The Pinky. Một Sovereign gọi bạn lên và hỏi bạn có chắc chắn mình hiểu rõ sức nặng lời nói của một Sworn Blade hay không.', 'The client storms off, threatening to sue the Pinky. A Sovereign summons you and asks if you are sure you understand the weight of a Sworn Blade’s words.', { rep: -5, sanity: -3 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Chuyển vụ này lên Sovereign quyết định', 'Pass the matter up to a Sovereign to decide',
        'Sovereign xem hồ sơ một giờ và tuyên rằng chữ nghĩa và tinh thần đều có lý, nhưng khi mâu thuẫn, tinh thần thắng. Ông khách phải trả.',
        'The Sovereign reviews the file an hour and rules that both letter and spirit hold weight, but when they conflict, the spirit wins. The client must pay.',
        { sanity: 2, rep: 4, network: 4 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [26, 90] }),

  fe('pinky_mute_witness', P, [1, 3],
    '[Nhân chứng không nói được] Bạn cần lời khai của một người chứng kiến một vụ ám sát, nhưng người ấy đã thề không nói với bất kỳ ai ngoài chủ nhân. Lời thề ấy do một Pinky khác lập. Nếu bạn ép họ nói, họ phá lời thề. Nếu bạn không ép, một người vô tội sẽ bị kết án.',
    '[The witness who cannot speak] You need the testimony of someone who saw an assassination, but that person has vowed to speak to no one except their master. That vow was sworn by another Pinky. If you force them to speak, they break the oath. If you do not, an innocent will be convicted.',
    [
      fg('Xin chủ nhân của người chứng cho phép họ nói', 'Ask the witness’s master to permit them to speak', [
        [55, 'Chủ nhân nghe bạn, lặng đi lâu, rồi nói người chứng có thể nói, nhưng chỉ trước mặt ông. Bạn ngồi nghe lời khai trong một căn phòng tối, và người vô tội được thả. Ông không cảm ơn, nhưng đêm đó đã gửi đến cho bạn một bình trà rất tốt.', 'The master hears you, is silent long, then says the witness may speak, but only in his presence. You hear the testimony in a dark room, and the innocent is freed. He does not thank you, but that night sends you a very fine pot of tea.', { rep: 8, sanity: 3, network: 6 }, { flagsAdd: ['pinky_kept_word'] }],
        [45, 'Chủ nhân từ chối thẳng. Người vô tội bị kết án, và bạn đứng nhìn từ phía sau phòng xử. Cô ấy không nhìn bạn, nhưng khi bị dẫn đi, cô khẽ nói một câu mà bạn không nghe được.', 'The master refuses outright. The innocent is convicted, and you watch from the back of the court. She does not look at you, but as she is led away she says something softly that you cannot hear.', { rep: -3, sanity: -10 }, { flagsAdd: ['pinky_kept_word'] }]
      ]),
      fc('Ép người chứng nói và chịu hậu quả', 'Force the witness to speak and bear the consequence',
        'Người chứng nói, và run rẩy suốt buổi. Người vô tội được thả, nhưng người chứng không còn là một Pinky, bị gạch tên khỏi mọi sổ sách. Họ nhìn bạn khi rời đi, và bạn không bao giờ quên cái nhìn ấy.',
        'The witness speaks, trembling throughout. The innocent is freed, but the witness is no longer a Pinky, struck from every ledger. They look at you as they leave, and you never forget that look.',
        { rep: 3, sanity: -11, network: -5 }, { flagsAdd: ['pinky_bent_word'] }),
      fc('Từ chối ép, tìm một cách khác để chứng minh', 'Refuse to force and seek another way to prove it',
        'Bạn mất hai tuần tìm các dấu vết phụ, và cuối cùng lập được một bản chứng cứ gián tiếp. Nó không hoàn hảo, nhưng đủ để hoãn bản án. Người vô tội được cho thêm một năm, và bạn cảm thấy một thứ thanh thản xen lẫn day dứt.',
        'You spend two weeks tracing side evidence and finally compile an indirect case. It is not perfect but enough to postpone the sentence. The innocent is given another year, and you feel a calm mixed with unease.',
        { rep: 5, sanity: -3, network: 4, wealth: -3 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [26, 90] }),

  fe('pinky_dying_stranger', P, [0, 3],
    '[Lời thề trong mưa] Một người lạ bị thương nặng nằm ở rìa một con hẻm, và khi thấy bạn mang dấu The Pinky, họ nắm lấy tay áo bạn và xin bạn thề một điều: đưa một lá thư cho người thân của họ. Họ không còn thời gian để nói thêm. Mưa rơi rất lớn.',
    '[An oath in the rain] A badly wounded stranger lies at the edge of an alley, and seeing the Pinky’s mark on you grips your sleeve and begs you to swear one thing: to deliver a letter to their kin. They have no time left to say more. The rain falls very hard.',
    [
      fc('Thề, nhận lá thư, và hứa sẽ mang đến', 'Swear, take the letter, and promise delivery',
        'Người lạ gật đầu, và nhẹ nhõm đến độ cả khuôn mặt giãn ra. Họ mất trong vòng vài phút. Bạn mất hai tuần tìm người thân, và khi gặp họ, bạn không biết nên nói câu đầu tiên thế nào. Bạn chỉ đưa lá thư, và đứng nhìn họ đọc.',
        'The stranger nods, and is so relieved their whole face loosens. They die within minutes. It takes you two weeks to find the kin, and when you meet them you do not know how to begin. You only hand over the letter and stand watching them read.',
        { sanity: -3, rep: 7, network: 6, health: -2 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Nói bạn sẽ cố gắng, nhưng không thề', 'Say you will try but do not swear', [
        [55, 'Người lạ nhìn bạn, và biết đó không phải là một lời thề. Họ vẫn đưa bạn lá thư, rồi nhắm mắt. Bạn mang nó đến nơi vào tuần sau, và người nhận hỏi bạn có phải một Pinky không. Bạn nói phải, và họ cảm ơn bạn.', 'The stranger looks at you and knows it is not an oath. They still hand you the letter, then close their eyes. You deliver it the next week, and the recipient asks if you are a Pinky. You say yes, and they thank you.', { sanity: -4, rep: 4, network: 4 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Bạn quên lá thư trong túi trong ba tháng. Khi tìm thấy lại, nó đã ẩm và mực nhòe. Bạn mất cả ngày cố đọc, và không bao giờ tìm được người nhận.', 'You forget the letter in your pocket for three months. When found again, it is damp and the ink has run. You spend a whole day trying to read it and never find the recipient.', { sanity: -9, rep: -4 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Từ chối, nói bạn không thề với người lạ', 'Refuse, saying you do not swear to strangers',
        'Người lạ nhìn bạn, rồi buông tay áo. Họ không nói gì thêm. Bạn đứng đó trong mưa cho đến khi họ ngừng thở, và nhiều năm sau, bạn vẫn thấy cái nhìn ấy mỗi lần nghe tiếng mưa.',
        'The stranger looks at you a long time, then releases your sleeve. They say no more. You stand there in the rain until they stop breathing, and for many years afterward you see that look each time you hear rain.',
        { sanity: -10, rep: -2 }, { flagsAdd: ['pinky_bent_word'] })
    ]),

  // ------------------------------------------------------------------ stories and consequences
  fe('pinky_forsworn_friend', P, [1, 3],
    '[Người bạn bị bội thề] Một người từng cùng bạn lập thệ một lúc ở tháp chuông, bị The Pinky buộc tội phá lời thề. Hồ sơ nói họ đã tiết lộ một địa điểm. Bạn biết đó không phải sự thật, vì chính bạn đã dặn họ làm thế, và chưa ai biết.',
    '[The forsworn friend] An old friend who swore at the bell tower alongside you is accused by the Pinky of breaking an oath. The file says they revealed a location. You know it is not so, because you yourself told them to, and no one yet knows.',
    [
      fc('Nhận trách nhiệm về mình', 'Take the responsibility on yourself',
        'Bạn đứng trước hội đồng và nói đúng sự thật. Hội đồng im lặng, rồi tuyên án: một nửa mỗi người. Bạn và người bạn cùng bị phạt, nhưng cả hai bước ra khỏi phòng sát vai nhau, không ai nói gì.',
        'You stand before the council and speak the truth. The council is silent, then rules: half to each. You and your friend are both fined, but you walk out of the room shoulder to shoulder.',
        { rep: -3, sanity: 5, network: 8, wealth: -6 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Giữ im lặng và để họ chịu án', 'Stay silent and let them bear the sentence', [
        [60, 'Người bạn bị phạt nặng và rời hội. Bạn tiếp tục ở lại, và mỗi lần đi ngang tháp chuông, bạn nghe nó ngân nhẹ một tiếng mà không ai khác nghe thấy.', 'The friend is heavily penalized and leaves the Pinky. You stay on, and each time you pass the bell tower you hear it ring one soft note no one else hears.', { rep: 4, sanity: -12, network: -6 }, { flagsAdd: ['pinky_bent_word'] }],
        [40, 'Người bạn nhìn bạn khi bị dẫn đi, hồi lâu,. Hai ngày sau họ biến mất khỏi The City. Bạn nhận được một mảnh giấy chỉ có một chữ: Biết.', 'The friend looks at you as they are led away, a very long time and says nothing. Two days later they vanish from the City. You receive a slip with a single word: Knew.', { rep: 2, sanity: -14, network: -8 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Thú nhận riêng với Sovereign trước phiên tòa', 'Confess privately to a Sovereign before the hearing',
        'Sovereign nghe xong và lặng đi lâu. Rồi ông nói ông sẽ xử vụ này kín, và không ai cần biết. Người bạn được trắng án, nhưng bạn thì phải làm một việc cho ông, mà ông chưa nói là gì.',
        'The Sovereign hears you and is silent a long while. Then says he will handle the matter privately and no one need know. The friend is cleared, but you must do something for him, which he has not yet said.',
        { rep: 2, sanity: 3, network: 4 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [28, 90], weight: 11 }),

  fe('pinky_sovereign_burden', P, [2, 3],
    '[Gánh nặng của Sovereign] Một Sovereign già gọi bạn vào căn phòng nhỏ nhất của tháp chuông. Ông nói ông đã giữ hàng trăm lời thề trong ba mươi năm, và biết một nửa số đó không đáng. Ông không nói thêm. Ông chỉ đặt một cuốn sổ trước mặt bạn, và hỏi bạn có muốn giữ nó không.',
    '[The Sovereign’s burden] An elderly Sovereign calls you into the smallest room of the bell tower. He says he has kept hundreds of oaths over thirty years and knows half were not worth it. He says no more. He only sets a ledger before you and asks whether you wish to keep it.',
    [
      fc('Nhận cuốn sổ, hứa giữ nó đến khi chết', 'Accept the ledger and vow to keep it until death',
        'Cuốn sổ nặng hơn bạn tưởng, và bạn nhận ra mỗi trang là một lời thề của một người đã mất. Ông già cúi đầu rất nhẹ, và rời phòng, để bạn một mình với cuốn sổ và cây nến đang tàn.',
        'The ledger is heavier than you thought, and you realize each page is the oath of someone dead. The old man nods very slightly and leaves the room, leaving you alone with the ledger and a dying candle.',
        { rep: 9, sanity: -6, network: 6 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Từ chối cuốn sổ, nói bạn không đủ sức giữ', 'Refuse the ledger, saying you lack the strength to keep it', [
        [55, 'Ông già mỉm cười rất khẽ, và nói đó là câu trả lời đúng nhất. Người nào nhận ngay là người chưa hiểu nó nặng thế nào. Ông cất cuốn sổ và tặng bạn một chiếc chuông nhỏ bằng đồng, nói bạn hãy rung nó khi cần.', 'The old man smiles very faintly and says that is the truest answer. Anyone who accepts at once has not understood how heavy it is. He puts away the ledger and gives you a small bronze bell, telling you to ring it when needed.', { rep: 6, sanity: 5, network: 5 }, { flagsAdd: ['pinky_bent_word'] }],
        [45, 'Ông già gật đầu và không nói gì. Cuốn sổ được trao cho một người khác. Bạn nghe nói người ấy trở thành Sovereign trong vài năm sau, và bạn tự hỏi mình đã bỏ lỡ điều gì.', 'The old man nods. The ledger is passed to another. You hear that person became a Sovereign within a few years, and you wonder what you missed.', { rep: -3, sanity: -3 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Xin xem ba trang rồi mới quyết định', 'Ask to read three pages before deciding',
        'Ba trang ấy là ba lời thề: của một đứa trẻ, một người mẹ, và một kẻ sát nhân. Bạn đọc xong và nhìn ông một lúc. Ông nói đó là lý do ông chọn bạn: người dám đọc trước khi nhận.',
        'The three pages are three oaths: a child’s, a mother’s, and a killer’s. You finish reading and look at him a long while. He says that is why he chose you: someone who dares read before accepting.',
        { rep: 8, sanity: -4, network: 5 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [34, 95], weight: 11 }),

  fe('pinky_blade_that_remembers', P, [1, 3],
    '[Thanh kiếm biết nhớ] Thanh kiếm rèn từ sao mà bạn đã chọn làm của riêng bắt đầu có những lúc nặng hơn bình thường, đúng những lúc bạn sắp làm một việc mà bạn không muốn. Một Sworn Blade già nói điều đó xảy ra với một số kiếm, và không ai biết tại sao. Ông bảo bạn đừng chống lại nó.',
    '[The sword that remembers] The star-forged sword you appointed as your own begins to feel heavier at times, precisely when you are about to do something you do not want to. An old Sworn Blade says this happens with some swords and no one knows why. He tells you not to fight it.',
    [
      fc('Lắng nghe, dừng lại khi nó nặng', 'Listen and stop when it grows heavy',
        'Bạn bắt đầu nhận ra những lúc kiếm nặng đi. Đôi khi bạn vẫn làm điều đó, nhưng có nhiều lúc bạn dừng lại, và nhìn lại chuyện đã định làm. Một vài trong đó thật sự là điều bạn sẽ hối hận.',
        'You begin to notice when the sword grows heavy. Sometimes you do it anyway, but more often you pause and reconsider what you meant to do. Some of those turn out to be things you would have regretted.',
        { sanity: 4, rep: 4 }, { flagsAdd: ['pinky_kept_word'] }),
      fg('Cố chống lại, bắt thanh kiếm nhẹ trở lại', 'Fight it and force the sword light again', [
        [50, 'Bạn thắng, và thanh kiếm nhẹ đi, nhưng nó nhẹ một cách lạ lùng, như đã bỏ rơi bạn. Từ đó bạn không còn cảm thấy gì khi cầm nó. Một Sworn Blade nhìn bạn khi bạn đi ngang, và lắc đầu rất khẽ.', 'You win, and the sword lightens, but oddly light, as if it has abandoned you. From then on you feel nothing when you hold it. A Sworn Blade looks at you passing and shakes his head faintly.', { sanity: -7, rep: 3 }, { flagsAdd: ['pinky_bent_word'] }],
        [50, 'Thanh kiếm nặng đến mức bạn không nhấc được, và phải nhờ một người khác mang nó đến nhà. Nhiều tuần sau nó mới nhẹ lại, và bạn nhận ra nó đang chờ bạn xin lỗi.', 'The sword grows so heavy you cannot lift it, and must ask another to carry it home. Many weeks later it lightens again, and you realize it was waiting for an apology.', { health: -4, sanity: -5, rep: -2 }, { flagsAdd: ['pinky_bent_word'] }]
      ]),
      fc('Hỏi thanh kiếm thành tiếng, và chờ', 'Speak to the sword aloud and wait',
        'Bạn nói một mình trong phòng, và thanh kiếm không đáp. Nhưng sau đó bạn thấy mình đứng thẳng hơn một chút khi cầm nó. Có thể đó chỉ là thói quen. Có thể không.',
        'You speak alone in your room, and the sword does not reply. But afterward you find yourself standing a little straighter when holding it. Perhaps habit. Perhaps not.',
        { sanity: 3, rep: 2 }, { flagsAdd: ['pinky_kept_word'] })
    ], { age: [26, 90] }),

  fe('pinky_word_returns', P, [1, 3],
    '[Lời đã giữ quay về] Một người bạn từng giúp một lần, nhiều năm trước, nhờ lời hứa bạn giữ đúng, đến tìm bạn lúc cần. Họ đang gặp rắc rối với một Syndicate, và họ không có ai khác. Họ không đòi hỏi gì. Họ chỉ nói rằng bạn là người duy nhất họ biết sẽ không phản bội.',
    '[A kept word returns] Someone you once helped years ago, thanks to a promise you kept faithfully, comes to you in need. They are in trouble with a Syndicate and have no one else. They demand nothing. They only say you are the one person they know who will not betray them.',
    [
      fc('Giúp họ hết sức, không tính toán', 'Help them with all you have, without calculation',
        'Bạn dành một tuần thương lượng với Syndicate và một tuần nữa đưa họ ra khỏi khu vực. Khi chia tay, họ trao bạn một vật nhỏ: một chiếc chuông đồng. Họ nói đó là lời thề của họ, và bạn hãy rung nó khi cần.',
        'You spend a week negotiating with the Syndicate and another getting them out of the district. At parting they hand you a small object: a bronze bell. They say it is their oath, and to ring it when needed.',
        { health: -6, rep: 9, network: 9, sanity: 4, wealth: -5 }),
      fc('Giúp một phần, nói rõ bạn không thể làm hơn', 'Help in part, stating plainly you can do no more',
        'Họ nhận sự giúp đỡ ấy với lòng biết ơn, và không đòi hơn. Bạn cảm thấy nhẹ nhõm, và cũng thấy có gì đó chưa đủ. Một tháng sau họ gửi một lời cảm ơn qua bưu điện, ngắn và thật.',
        'They accept the help with gratitude and ask for no more. You feel relief, and also something not quite enough. A month later they send thanks by post, short and real.',
        { rep: 4, network: 5, sanity: -1, wealth: -2 }),
      fc('Từ chối, nói món nợ đó đã được trả lâu rồi', 'Decline, saying that debt was long ago repaid',
        'Họ gật đầu và đứng dậy, không trách. Nhưng bạn nhận ra mình đã nói ra điều mình vẫn thường nói với người khác, nhưng chưa bao giờ nghe mình nói. Cái cảm giác ấy theo bạn nhiều tuần.',
        'They nod and rise, not blaming. But you realize you spoke what you usually say to others but have never heard yourself say. That feeling follows you for weeks.',
        { sanity: -6, rep: -3, network: -4 })
    ], { requires: ['pinky_kept_word'], age: [28, 95], weight: 9 }),

  fe('pinky_price_of_exception', P, [1, 3],
    '[Giá của một ngoại lệ] Một lời thề bạn từng bẻ cong, cho một lý do mà lúc ấy bạn tin là chính đáng, bị tìm ra. Người đến hỏi không phải The Pinky, mà là người từng hưởng lợi từ ngoại lệ đó. Họ không biết ơn. Họ nói họ đã sống nhiều năm với cảm giác mắc nợ một thứ không đáng nhận.',
    '[The price of an exception] An oath you once bent, for a reason you then believed just, comes to light. The one who asks is not the Pinky but the one who benefited from that exception. They are not grateful. They say they lived many years feeling indebted for something they did not deserve.',
    [
      fc('Nhận lỗi và xin lỗi họ', 'Admit the fault and apologize to them',
        'Họ im lặng rất lâu, rồi nói họ không cần lời xin lỗi, chỉ cần biết sự thật. Hai người ngồi cạnh nhau uống trà, và dần dần họ kể bạn nghe điều họ đã làm với cái ơn không đáng ấy. Bạn thấy nhẹ đi một chút.',
        'They are silent a long while then say they need no apology, only the truth. The two of you sit and drink tea, and gradually they tell you what they did with that undeserved favor. You feel a little lighter.',
        { sanity: 3, rep: 3, network: 5 }),
      fg('Bảo vệ lựa chọn của bạn, nói bạn vẫn làm lại', 'Defend your choice, saying you would do it again', [
        [55, 'Họ nhìn bạn, và không đồng ý, nhưng cúi đầu như một người biết cãi nhau không giúp gì. Họ nói họ sẽ nhớ bạn như người đã làm điều đó vì một lý do, dù họ không tán thành. Bạn thấy nhẹ nhõm một cách kỳ quặc.', 'They look at you and disagree, but nod like someone who knows arguing helps nothing. They say they will remember you as one who did it for a reason, though they do not approve. You feel strangely relieved.', { sanity: 2, rep: 2, network: 3 }],
        [45, 'Họ nổi giận và đi tố cáo bạn với The Pinky. Bạn bị gọi lên giải thích, và cả buổi chất vấn bạn nhận ra mình đang bảo vệ điều mà chính mình không còn chắc.', 'They flare up and go denounce you to the Pinky. You are called to explain, and throughout the questioning you realize you are defending something you are no longer sure of.', { rep: -8, sanity: -7, heat: 4 }]
      ]),
      fc('Im lặng và để họ nói hết điều muốn nói', 'Stay silent and let them say all they wish',
        'Họ nói trong gần một giờ, và đến cuối giọng họ đã dịu đi. Họ không tha thứ, nhưng họ cũng không còn tức. Khi họ rời đi, họ nói bạn là người duy nhất nghe họ không ngắt lời.',
        'They speak almost an hour, and by the end their voice has softened. They do not forgive, but they are no longer angry. As they leave they say you are the only one who heard them out without interrupting.',
        { sanity: -2, rep: 2, network: 4 })
    ], { requires: ['pinky_bent_word'], age: [28, 95], weight: 9 })
];

export const PINKY_MINORS = [
  M('m_pinky_red_thread_knot', AGE.GROWN, fneed(P, 0),
    '[Nút thắt chỉ đỏ] Một sợi chỉ đỏ buộc quanh cổ tay bạn tự tuột ra giữa buổi sáng. Bạn nhìn nó nằm dưới sàn, vì lời thề đầu tiên bạn lập có buộc chỉ ấy. Bạn thắt lại, nhưng bàn tay run đến nỗi phải thử ba lần.',
    '[The red thread knot] A red thread tied around your wrist slips off mid-morning. You look at it on the floor a long time, because the first oath you swore was bound with such a thread. You tie it again, but your hand shakes so you must try three times.',
    [C('Thắt lại thật chặt', 'Tie it tight again', 'Nút lần này chắc hơn lần đầu. Cả ngày bạn thấy cổ tay mình nặng hơn, nhưng cũng chắc chắn hơn, như đang nhớ một điều mình sắp quên.', 'This knot is firmer than the first. All day your wrist feels heavier but also steadier, as though remembering something you were about to forget.', { sanity: 2, rep: 2 }), C('Để sợi chỉ trong túi', 'Keep the thread in your pocket', 'Bạn không buộc lại. Nhưng mỗi lần chạm vào túi, bạn cảm thấy nó, và nhớ ra mình đã quen đến mức không còn cảm thấy khi nó ở cổ tay.', 'You do not retie it. But each time you touch your pocket you feel it, and realize you had grown so used to it you no longer felt it on your wrist.', { sanity: -1 })],
    I('Bạn nhặt sợi chỉ và đút vào túi.', 'You pick up the thread and tuck it in your pocket.'), { theme: 'work' }),
  M('m_pinky_bell_echo', AGE.GROWN, fneed(P, 0),
    '[Tiếng chuông vang xa] Từ chỗ bạn đứng ở chợ, tiếng chuông tháp vọng đến một nhịp muộn hơn bình thường. Người bán hàng quanh bạn đều ngẩng lên, rồi cúi xuống lại. Chỉ có một người già đưa tay lên ngực và gật đầu như nghe một bản án.',
    '[The bell’s far echo] From where you stand in the market, the tower bell reaches you a beat later than usual. The vendors around you all look up, then down again. Only one old person lifts a hand to the chest and nods as though hearing a sentence.',
    [C('Hỏi người già vì sao', 'Ask the old person why', 'Bà nói chuông chỉ ngân muộn khi có người vừa giữ một lời thề rất khó. Bà không biết ai, và bà nói bà cũng không muốn biết. Bà chỉ muốn nhớ rằng ở đâu đó vẫn có người làm được.', 'She says the bell rings late only when someone has just kept a very hard oath. She does not know who, and says she does not wish to. She only wants to remember that somewhere someone still can.', { sanity: 3, network: 3 }), C('Giả vờ không nghe thấy', 'Pretend not to have heard', 'Bạn mua xong thứ cần mua và đi nhanh. Cả buổi chiều tiếng chuông vẫn vọng trong tai, muộn hơn cả khi nó đã tắt.', 'You finish your buying and leave quickly. All afternoon the bell keeps echoing in your ear, later even after it has gone silent.', { sanity: -2 })],
    I('Bạn ngẩng lên nghe và cúi xuống tiếp tục.', 'You look up to listen then bend back to your task.'), { theme: 'work' }),
  M('m_pinky_sheath_oil', AGE.GROWN, fneed(P, 0),
    '[Dầu bôi vỏ kiếm] Bạn bôi dầu lên vỏ kiếm mỗi tối, như một nghi thức không ai ép. Tối nay vỏ kiếm có một vết nứt nhỏ chưa từng có, và dầu thấm vào nó như nước thấm vào đất khô. Bạn ngồi nhìn nó thấm hồi lâu.',
    '[Oil for the scabbard] You oil your scabbard each night, a ritual no one demands. Tonight it has a small crack never there before, and the oil sinks in like water into dry earth. You sit watching it sink some time.',
    [C('Thay vỏ kiếm mới', 'Replace the scabbard', 'Bạn mang vỏ cũ đến thợ, và ông nói vết nứt không đáng sửa. Ông bảo vỏ ấy đã làm đủ việc, và đã đến lúc nghỉ. Bạn mang về một vỏ mới, và treo cái cũ lên tường.', 'You bring the old scabbard to a smith, who says the crack is not worth mending. He says it has done its work and it is time to rest. You bring home a new one and hang the old on the wall.', { wealth: -4, sanity: 2, rep: 1 }), C('Giữ nguyên và tiếp tục bôi dầu', 'Keep it and go on oiling', 'Vết nứt không lan thêm. Mỗi tối bạn nhìn nó thấm dầu, và bắt đầu thấy nó đẹp theo một cách mà vỏ nguyên không thể đẹp.', 'The crack spreads no further. Each night you watch it drink the oil and begin to see it as beautiful in a way an unbroken sheath could not be.', { sanity: 3 })],
    I('Bạn lau vỏ kiếm và cất nó đi.', 'You wipe the scabbard and put it away.'), { theme: 'work' }),
  M('m_pinky_stranger_bow', AGE.GROWN, fneed(P, 0),
    '[Cái cúi chào của người lạ] Một người lạ trên phố cúi chào bạn rất sâu khi bạn đi ngang, mà không nói gì. Bạn quay lại, và người ấy đã đi. Một người bán hàng gần đó nói bạn từng cứu em trai người ấy, nhiều năm trước, và bạn không nhớ.',
    '[A stranger’s bow] A stranger on the street bows very deeply as you pass. You turn back, and they are gone. A nearby vendor says you once saved that person’s younger brother, many years ago, and you do not remember.',
    [C('Đi tìm người ấy để hỏi', 'Go find them to ask', 'Bạn tìm được họ sau ba ngày. Họ nói chuyện rất ngắn, rồi tặng bạn một chiếc khăn tay thêu một dòng chữ nhỏ. Bạn không đọc được thứ chữ ấy, nhưng giữ nó.', 'You find them after three days. They speak very briefly, then give you a handkerchief embroidered with a small line.', { sanity: 3, network: 4, rep: 2 }), C('Để người ấy đi, nhận cái cúi chào như một món quà', 'Let them go and accept the bow as a gift', 'Bạn nhận ra mình đang đứng thẳng hơn suốt cả buổi chiều, và nhiều người nhìn bạn khác đi mà không rõ vì sao.', 'You realize you stand straighter all afternoon, and many people look at you differently without knowing why.', { sanity: 2, rep: 2 })],
    I('Bạn gật đầu rất nhẹ và đi tiếp.', 'You nod very slightly and walk on.'), { theme: 'work' }),
  M('m_pinky_whetstone_night', AGE.GROWN, fneed(P, 0),
    '[Đêm mài kiếm] Bạn mài kiếm cả đêm không có lý do. Không có nhiệm vụ nào, không có kẻ thù nào. Chỉ có tiếng đá trên thép, đều đặn, và một cảm giác rằng nếu ngừng, bạn sẽ phải nghĩ về một điều gì đó bạn chưa sẵn sàng.',
    '[A night of whetting] You sharpen your sword all night for no reason. No task, no enemy. Only the sound of stone on steel, steady, and a sense that if you stop you will have to think about something you are not ready for.',
    [C('Ngừng và nghĩ về điều ấy', 'Stop and think about it', 'Bạn đặt kiếm xuống, và nhớ ra một lời hứa đã quá hạn. Sáng hôm sau bạn thực hiện nó, và thấy thanh kiếm trở nên nhẹ hơn khi bạn cầm nó lên.', 'You set the sword down and recall a promise long overdue. The next morning you fulfil it, and find the sword lighter when you lift it.', { sanity: 4, rep: 3 }), C('Tiếp tục mài đến sáng', 'Keep whetting until morning', 'Đến sáng, lưỡi kiếm sắc đến mức bạn không dám chạm. Bạn cất nó vào vỏ, và tay bạn đau suốt hai ngày vì mài quá lâu.', 'By morning the blade is so sharp you dare not touch it. You sheathe it, and your hands ache for two days from whetting so long.', { sanity: -3, health: -2 })],
    I('Bạn mài thêm một lúc rồi đi ngủ.', 'You whet a while longer then go to bed.'), { theme: 'work' }),
  M('m_pinky_merchant_gift', AGE.GROWN, fneed(P, 0),
    '[Quà của thương nhân] Một thương nhân mà bạn từng chứng một giao kèo gửi cho bạn một chiếc hộp gỗ nhỏ chứa một chai rượu quý và một mảnh giấy cảm ơn. Giao kèo ấy đã thành công, và ông viết rằng nó thay đổi cuộc đời mình. Bạn không nhớ ông từng nói gì khi ký.',
    '[A merchant’s gift] A merchant whose contract you once witnessed sends you a small wooden box containing a fine bottle and a thank-you slip. That contract succeeded, and he writes it changed his life.',
    [C('Mở chai và uống một mình', 'Open the bottle and drink alone', 'Rượu rất ngon, và bạn uống chậm. Bạn không thấy mình xứng đáng, nhưng vẫn uống đến giọt cuối. Mảnh giấy cảm ơn được ép vào cuốn sổ của bạn, nằm giữa hai trang bất kỳ.', 'The wine is very good, and you drink it slowly. You do not feel worthy, but drink to the last drop. The thank-you slip is pressed into your notebook between two random pages.', { sanity: 3, rep: 1 }), C('Gửi lại chai rượu kèm lời cảm ơn', 'Send the bottle back with thanks', 'Người thương nhân gửi lại, kèm một dòng: Hãy giữ nó như một lời nhắc. Bạn cất chai vào tủ, và không mở trong nhiều năm.', 'The merchant sends it back with a line: Keep it as a reminder. You store the bottle in a cabinet and do not open it for years.', { sanity: 1, network: 3 })],
    I('Bạn đặt chiếc hộp lên kệ và không nhìn đến.', 'You set the box on a shelf and do not look at it.'), { theme: 'work' }),
  M('m_pinky_borrowed_sword', AGE.GROWN, fneed(P, 0),
    '[Mượn kiếm] Một đao thủ trẻ mượn kiếm của bạn một ngày, và trả lại sau ba. Thanh kiếm sạch hơn lúc bạn đưa, và có một vết xước nhỏ ở chuôi, như ai đó đã nắm rất chặt. Cậu ta không nói gì về chuyện đã xảy ra.',
    '[The borrowed sword] A young swordsman borrows your sword for a day and returns it after three. It is cleaner than when you lent it, with a small scratch at the hilt as if gripped very tightly. They say nothing about what happened.',
    [C('Không hỏi và nhận lại kiếm', 'Ask nothing and take the sword back', 'Cậu cúi đầu và đi. Nhiều tháng sau, bạn nghe tin cậu thắng một cuộc đấu không ai ngờ. Bạn nhìn vết xước ở chuôi kiếm lâu hơn bình thường, và không lau nó đi.', 'They bow and go. Many months later you hear they won an unexpected duel. You look at the scratch on the hilt longer than usual and do not polish it away.', { sanity: 2, rep: 2, network: 3 }), C('Hỏi cậu đã dùng nó vào việc gì', 'Ask what they used it for', 'Cậu im lặng một lúc, rồi nói đã dùng nó để làm một việc cậu không tự hào. Bạn cúi đầu, và đưa trả cậu một lời khuyên nhỏ, mà cậu chép lại vào mu bàn tay.', 'They are silent a long time, then say they used it for something they are not proud of. You nod and give back a small piece of advice, which they copy onto the back of a hand.', { sanity: -2, network: 4 })],
    I('Bạn cất kiếm vào vỏ mà không nói gì.', 'You sheathe the sword without a word.'), { theme: 'work' }),
  M('m_pinky_old_scar_itch', AGE.GROWN, fneed(P, 1),
    '[Vết sẹo cũ ngứa] Vết sẹo bạn nhận từ buổi lập thệ đầu tiên ngứa rát suốt cả tuần mỗi khi trời sắp mưa. Một Sworn Blade già nói đó là cách vết thương nhớ mình đã được gì. Ông bảo bạn đừng gãi, và đừng quên.',
    '[The old scar itches] The scar you got at your first oath-taking itches and stings all week whenever rain approaches. An old Sworn Blade says it is how the wound remembers what it was given. He tells you not to scratch, and not to forget.',
    [C('Nhịn gãi và để nó ngứa', 'Resist scratching and let it itch', 'Qua hai ngày, cơn ngứa dịu đi, và bạn nhận ra mình đã bắt đầu thấy ấm khi nó xuất hiện, như có ai đó đang nhớ bạn.', 'Over two days the itch fades, and you realize you have begun to feel warmth when it appears, as if someone is thinking of you.', { sanity: 2, rep: 1 }), C('Bôi thuốc làm dịu', 'Apply a soothing salve', 'Thuốc làm cơn ngứa dịu ngay, nhưng bạn nhận ra mình không còn nhớ rõ ngày lập thệ như trước.', 'The salve soothes the itch at once, but you notice you no longer remember the day of the oath as clearly.', { sanity: -3, health: 1 })],
    I('Bạn kéo tay áo xuống che vết sẹo.', 'You pull your sleeve down to cover the scar.'), { theme: 'work' }),
  M('m_pinky_tower_stair_count', AGE.GROWN, fneed(P, 0),
    '[Số bậc thang tháp] Bạn đếm số bậc thang lên tháp chuông và ra con số khác nhau mỗi lần. Hôm nay là hai trăm mười ba. Hôm qua là hai trăm mười bốn. Một Sworn Blade đi cạnh nói con số đúng là số lời thề đang được giữ.',
    '[Counting the tower stairs] You count the stairs up to the bell tower and arrive at a different number each time. Today it is two hundred and thirteen. Yesterday two hundred and fourteen. A Sworn Blade walking beside says the true number is how many oaths are being kept.',
    [C('Hỏi ông có phải ông nói đùa không', 'Ask whether he is joking', 'Ông nhìn bạn rất nghiêm, rồi bật cười khẽ. Ông nói ông không biết, chỉ nghe được từ người đi trước, và ông chưa bao giờ muốn biết nó có thật hay không.', 'He looks very serious then lets out a soft laugh. He says he does not know, only heard it from his predecessor, and has never wished to learn whether it is true.', { sanity: 2, network: 3 }), C('Đếm lại từ đầu vào hôm sau', 'Count again the next day', 'Con số lần này là hai trăm mười lăm. Bạn đứng nhìn lên đỉnh tháp rất lâu, và không biết nên cảm thấy mừng hay lo.', 'This time the number is two hundred and fifteen. You stand looking up at the tower’s top very long, unsure whether to feel glad or uneasy.', { sanity: -2, rep: 1 })],
    I('Bạn lên đỉnh tháp mà không đếm thêm.', 'You climb to the top without counting further.'), { theme: 'work' }),
  M('m_pinky_found_oath_stone', AGE.GROWN, fneed(P, 0),
    '[Phiến đá lời thề] Khi đi qua một con hẻm cũ, bạn thấy một phiến đá nhỏ có khắc một lời thề, nét chữ đã mòn gần hết. Bạn đọc được nửa câu: Tôi sẽ không bao giờ... Phần còn lại biến mất theo năm tháng.',
    '[The oath stone] Passing through an old alley, you find a small stone engraved with an oath, the writing nearly worn away. You can read half a line: I will never... The rest has faded with the years.',
    [C('Ngồi xuống đọc lại từng nét', 'Sit down and trace each stroke', 'Bạn ngồi đó nửa giờ, đọc bằng ngón tay. Có thể là một lời hứa không bao giờ rời bỏ ai đó.', 'You sit half an hour reading with your fingers. Perhaps a promise never to leave someone.', { sanity: 3, network: 2 }), C('Đi tiếp mà không dừng lại', 'Walk on without stopping', 'Bạn bước qua, nhưng cả ngày nửa câu ấy vẫn còn trong đầu. Đêm đó bạn tự điền nốt phần còn lại, rồi nghĩ rằng có lẽ đó là phần đúng.', 'You step past, but all day the half sentence stays in your head. That night you fill in the rest yourself, then think perhaps that is the true part.', { sanity: -1 })],
    I('Bạn liếc nhìn phiến đá rồi đi qua.', 'You glance at the stone then pass by.'), { theme: 'work' }),
  M('m_pinky_cold_rain_duty', AGE.GROWN, fneed(P, 0),
    '[Trực dưới mưa lạnh] Bạn phải đứng gác ngoài cổng một Nest suốt đêm mưa vì một người của The Pinky sẽ đến, mà không ai biết giờ nào. Mưa thấm ướt áo và giày bạn đến mức bạn thôi nhớ cảm giác khô ráo. Gần sáng, một bà lão mang đến một cốc nước nóng.',
    '[Duty in the cold rain] You must stand watch at a Nest gate all through a rainy night because a member of the Pinky will arrive at an unknown hour. Rain soaks your coat and shoes until you forget what dry feels like. Near dawn an old woman brings a cup of hot water and says nothing.',
    [C('Nhận cốc nước và cảm ơn', 'Take the cup and thank her', 'Hơi nóng từ cốc làm cả người bạn rùng lên. Bà lão đứng cạnh bạn một lúc, rồi đi. Sáng đến, người của The Pinky không xuất hiện, nhưng bạn không thấy mình đã phí đêm ấy.', 'The cup’s heat makes your whole body shiver. The old woman stands beside you a while, then goes. When morning comes the Pinky member never appears, but you do not feel you wasted the night.', { sanity: 4, network: 3, health: -2 }), C('Từ chối vì đang làm nhiệm vụ', 'Decline because you are on duty', 'Bà lão đặt cốc nước xuống bậc thềm rồi đi. Bạn nhìn nó nguội dần, và nhớ lại điều đó nhiều năm sau, mỗi khi nghe tiếng mưa.', 'The old woman sets the cup on the step and goes. You watch it cool, and recall it many years later each time you hear rain.', { sanity: -3, health: -3 })],
    I('Bạn đứng thẳng và chịu cơn mưa.', 'You stand straight and endure the rain.'), { theme: 'work' }),
  M('m_pinky_young_apprentice', AGE.GROWN, fneed(P, 1),
    '[Người học việc đầu tiên] Một đao thủ trẻ xin được học cách bạn giữ lời thề. Bạn không biết cách mình là gì, vì bạn chưa từng nghĩ về nó thành lời. Người ấy ngồi đợi suốt buổi, và bạn nhận ra mình phải nghĩ ra một câu trả lời thật nhanh.',
    '[The first apprentice] A young swordsman asks to learn how you keep your oaths. You do not know what your way is, having never put it into words. They sit waiting the whole session, and you realize you must invent an answer quickly.',
    [C('Nói thật rằng bạn không biết', 'Say honestly you do not know', 'Người trẻ lặng đi, rồi nói đó là câu trả lời hay nhất họ từng nghe. Hai người ngồi cùng nhau, không nói thêm, và bạn nhận ra mình vừa dạy được điều gì đó mà không biết.', 'The youngster is silent then says it is the best answer they have heard. The two sit together a long time, saying no more, and you realize you taught something without knowing.', { sanity: 3, network: 5, rep: 3 }), C('Kể một câu chuyện về lần bạn suýt phá lời thề', 'Tell a story of the time you nearly broke an oath', 'Câu chuyện làm người trẻ im lặng hồi lâu.', 'The story leaves the youngster silent for a long while.', { sanity: 4, network: 4, rep: 2 })],
    I('Bạn bảo họ quay lại vào tuần sau.', 'You tell them to come back next week.'), { theme: 'work' }),
  M('m_pinky_silver_coin', AGE.GROWN, fneed(P, 0),
    '[Đồng bạc không đòi] Một người từng nợ bạn một đồng bạc trả lại, sau ba mươi năm, đúng một đồng, kèm một mảnh giấy: Cảm ơn vì đã không đòi. Bạn không nhớ cho họ vay, nhưng đồng bạc có hơi ấm của thứ được giữ trong lòng bàn tay lâu.',
    '[The silver coin never demanded] Someone who once owed you a silver coin returns it after thirty years, exactly one coin, with a slip: Thank you for never asking.',
    [C('Nhận đồng bạc và giữ nó làm bùa', 'Accept the coin and keep it as a charm', 'Bạn xỏ đồng bạc vào một sợi chỉ đỏ và đeo trên cổ. Nhiều năm sau, khi bạn phải đưa ra một quyết định khó, bạn nhớ đồng bạc ấy, và nhớ rằng có những món nợ trả bằng thời gian.', 'You thread the coin on a red thread and wear it at your neck. Many years later when facing a hard decision, you recall that coin and remember that some debts are paid in time.', { sanity: 3, rep: 2 }), C('Gửi lại kèm lời nói món nợ đã xong từ lâu', 'Send it back saying the debt was settled long ago', 'Người ấy gửi lại lần nữa, kèm một lời: Hãy giữ. Cuối cùng cả hai thỏa thuận bỏ đồng bạc vào một hộp từ thiện ở đầu phố.', 'They send it back again with a line: Keep it. In the end you both agree to drop the coin into a charity box at the head of the street.', { sanity: 2, network: 4 })],
    I('Bạn bỏ đồng bạc vào túi và quên nó.', 'You pocket the coin and forget it.'), { theme: 'work' }),
  M('m_pinky_priest_blessing', AGE.GROWN, fneed(P, 0),
    '[Lời chúc của vị linh mục] Một vị linh mục ở nhà thờ nhỏ trong khu bạn gặp bạn ngoài cổng, và đề nghị ban phước cho thanh kiếm của bạn. Bạn không tin điều đó, nhưng ông đứng rất kiên nhẫn, và đôi mắt ông có một vẻ chờ đợi không đòi hỏi.',
    '[The priest’s blessing] A priest at the small church in your district meets you at the gate and offers to bless your sword.',
    [C('Để ông ban phước', 'Let him bless it', 'Ông đặt tay lên thanh kiếm và nói một câu ngắn bằng thứ ngôn ngữ bạn không hiểu. Bạn không cảm thấy gì, nhưng suốt cả tuần sau, thanh kiếm hình như nhẹ hơn một chút.', 'He lays a hand on the sword and says a short line in a language you do not understand. You feel nothing, but all the following week the sword seems a little lighter.', { sanity: 3, network: 2 }), C('Từ chối nhã nhặn, nói lời thề của bạn không cần', 'Decline politely, saying your oath needs none', 'Vị linh mục gật đầu và nói: Phải, nhưng đôi khi người ta cần được chúc phúc, dù chúng không cần. Ông đi, và bạn nghĩ về câu nói ấy cả ngày.', 'The priest nods and says: True, but sometimes people need to be blessed even when oaths do not. He goes, and you think about that line all day.', { sanity: 1, rep: 1 })],
    I('Bạn cúi chào lịch sự và đi tiếp.', 'You bow politely and walk on.'), { theme: 'work' }),
  M('m_pinky_unfinished_letter', AGE.GROWN, fneed(P, 1),
    '[Lá thư viết dở] Trong túi áo một Sworn Blade đã mất bạn tìm thấy một lá thư viết dở gửi cho một cái tên mà bạn không biết. Nó dừng ở giữa câu: Tôi đã hứa là sẽ trở về, nhưng... Bạn cầm nó trong tay một lúc, và không biết nên hoàn thành hay chôn nó cùng chủ nhân.',
    '[The unfinished letter] In the pocket of a dead Sworn Blade you find an unfinished letter addressed to a name you do not know. It stops mid-sentence: I promised I would return, but... You hold it in your hand a very long time, unsure whether to complete it or bury it with its owner.',
    [C('Tìm người nhận và đưa lá thư', 'Find the recipient and deliver the letter', 'Bạn mất ba tuần, và khi tìm được, người nhận là một bà già đã mong ngóng suốt bao năm. Bà đọc rất chậm, rồi nói bà đã biết. Hai người ngồi lặng một buổi chiều.', 'It takes three weeks, and when you find the recipient she is an old woman who has waited all these years. She reads slowly then says she knew. The two of you sit silent one afternoon.', { sanity: -3, rep: 5, network: 5 }), C('Chôn lá thư cùng chủ nhân', 'Bury the letter with its owner', 'Bạn đặt nó vào lòng bàn tay người đã mất và đóng nắp. Một Sworn Blade khác nhìn bạn làm,.', 'You place it into the dead’s palm and close the lid. Another Sworn Blade watches you do it.', { sanity: 1, rep: 1 })],
    I('Bạn gấp lá thư lại và cất vào túi.', 'You fold the letter and pocket it.'), { theme: 'work' }),
  M('m_pinky_shared_rice', AGE.GROWN, fneed(P, 0),
    '[Bát cơm chung ở nhà tập thể] Cả tổ The Pinky ăn cơm chung sau một buổi tập, và bạn nhận ra không ai nói về lời thề. Chỉ nói về thịt kho hôm nay mặn quá. Bạn thấy lòng nhẹ đi một cách không giải thích được.',
    '[Shared rice at the dormitory] The whole Pinky team eats together after practice, and you notice no one speaks of oaths. Only that today’s braised meat is too salty. You feel your heart lighten in an unexplainable way.',
    [C('Ngồi xuống và hùa theo chuyện thịt kho', 'Sit down and join in about the braised meat', 'Cuộc tranh cãi về độ mặn kéo dài suốt bữa, và cả hội đều thua. Bạn cười một cách lạ lùng, và nhận ra đã lâu rồi bạn chưa cười như thế.', 'The argument about saltiness lasts through the meal, and the whole team loses. You laugh in a strange way and realize it has been long since you laughed so.', { sanity: 4, network: 5 }), C('Ăn lặng lẽ và nghe', 'Eat quietly and listen', 'Những câu chuyện vụn vặt trôi qua, và bạn thấy mình hiểu những người ngồi quanh nhiều hơn khi họ nói chuyện thịt kho so với khi họ nói chuyện lời thề.', 'Trifling stories drift by, and you find you understand those around you better when they speak of braised meat than of oaths.', { sanity: 3, network: 3 })],
    I('Bạn ăn nhanh và rời bàn.', 'You eat quickly and leave the table.'), { theme: 'work' }),
  M('m_pinky_name_on_wall', AGE.GROWN, fneed(P, 1),
    '[Tên trên tường tháp] Mỗi người lập thệ với The Pinky được khắc tên trên tường tháp chuông, ở độ cao ngang mắt. Hôm nay bạn đi ngang và thấy tên mình nằm cạnh một cái tên bạn không nhớ đã từng đứng cạnh. Hai nét khắc rất khác nhau, nhưng cùng một ngày.',
    '[A name on the tower wall] Each oath-taker of the Pinky has their name carved on the bell tower wall at eye level. Today you pass and see your name beside one you do not recall standing next to. The two carvings are very different, but of the same day.',
    [C('Hỏi người giữ sổ về người đó', 'Ask the registry keeper about that name', 'Người giữ sổ nói đó là một người cùng lứa lập thệ với bạn và đã mất mười năm trước. Bạn không nhớ gương mặt, nhưng đêm đó bạn nằm nghĩ rằng người ấy cũng từng đứng cạnh bạn lúc đó.', 'The keeper says it is someone of your cohort who died ten years ago.', { sanity: -3, network: 3 }), C('Chạm tay lên cả hai cái tên', 'Touch both names with your hand', 'Đá lạnh dưới đầu ngón tay. Cả hai cái tên như có một nhiệt độ khác nhau, và bạn rút tay lại khi nhận ra tên bạn ấm hơn tên người kia.', 'The stone is cold under your fingertips. The two names seem different temperatures, and you withdraw your hand when you notice yours is warmer than the other’s.', { sanity: -2, rep: 1 })],
    I('Bạn liếc nhìn tên mình rồi đi tiếp.', 'You glance at your name then move on.'), { theme: 'work' }),
  M('m_pinky_tea_house_dispute', AGE.GROWN, fneed(P, 1),
    '[Tranh chấp ở quán trà] Hai khách trong một quán trà cãi nhau về một lời hứa mỗi người nhớ khác nhau. Chủ quán biết bạn là một Sworn Blade và nhờ bạn phân xử. Hai người đều có vẻ thành thật, và cả hai đều cho rằng người kia nói dối.',
    '[Dispute at the tea house] Two patrons in a tea house quarrel about a promise each remembers differently. The owner knows you are a Sworn Blade and asks you to rule. Both seem sincere, and each believes the other lies.',
    [C('Nghe cả hai và đề nghị một lời hứa mới', 'Hear both and propose a new promise', 'Hai người nhìn nhau rất lâu. Rồi một người nói thôi, và đưa tay ra.', 'The two look at each other a long while. Then one says enough and offers a hand.', { sanity: 3, rep: 4, network: 4 }), C('Chọn một bên dựa trên trực giác', 'Choose a side on instinct', 'Người được chọn thắng cuộc, nhưng bạn thấy người kia nhìn bạn với vẻ bị phản bội.', 'The chosen one wins, but you see the other regard you as betrayed.', { rep: 1, sanity: -4 })],
    I('Bạn bảo họ tự giải quyết và uống trà tiếp.', 'You tell them to sort it out themselves and go on with your tea.'), { theme: 'work' }),
  M('m_pinky_late_apology', AGE.GROWN, fneed(P, 1),
    '[Lời xin lỗi muộn màng] Một người từng bị bạn phạt vì phá lời thề, nhiều năm trước, đến gặp bạn. Họ không đòi gì, chỉ muốn nói rằng bây giờ họ hiểu vì sao bạn làm thế, và cảm ơn bạn. Bạn không nhớ rõ ngày ấy, nhưng gương mặt họ thì không quên.',
    '[A late apology] Someone you once penalized for breaking an oath, many years ago, comes to see you. They demand nothing, only wish to say that now they understand why you acted so, and thank you.',
    [C('Nhận lời cảm ơn và ngồi nói chuyện', 'Accept their thanks and sit to talk', 'Hai người nói chuyện đến chiều. Họ kể về những năm sau đó, những lựa chọn khác, và bạn thấy một người trưởng thành từ cái đã bị bạn phạt. Bạn không dám nhận công, nhưng cũng không từ chối.', 'The two of you talk until evening. They tell of the years since, other choices, and you see a person grown from what you penalized. You dare not claim credit, but do not refuse it.', { sanity: 4, rep: 3, network: 5 }), C('Xin lỗi họ trước vì cách mình đã làm', 'Apologize first for how you handled it', 'Họ nhìn bạn và nói đó không phải điều họ đến để nghe. Nhưng họ cười, và hai người cùng bước ra ngoài phố, đi chậm.', 'They look at you long and say that is not what they came to hear. But they smile, and the two of you walk out into the street, going slowly.', { sanity: 3, rep: 2, network: 4 })],
    I('Bạn gật đầu và tiễn họ ra cửa.', 'You nod and see them to the door.'), { theme: 'work' }),
  M('m_pinky_sparring_bruise', AGE.GROWN, fneed(P, 0),
    '[Vết bầm sau buổi tập] Bạn bị đánh trúng một vết bầm lớn ở sườn trong buổi tập kiếm gỗ. Người đánh là một học việc, và cậu ta cúi đầu xin lỗi rất nhiều lần. Bạn nói không sao, nhưng cả đêm vết bầm nhói lên mỗi lần bạn trở mình.',
    '[Bruise after practice] You take a big bruise at the ribs during wooden-sword practice. The striker is an apprentice, who bows apologizing many times. You say it is nothing, but all night the bruise throbs each time you turn.',
    [C('Nhờ học việc giúp bôi thuốc', 'Ask the apprentice to help apply salve', 'Cậu ta làm rất cẩn thận, và qua đó bạn thấy nỗi áy náy của cậu giảm đi. Hai người nói chuyện về kỹ thuật, và bạn học được một cách đỡ đòn mới từ chính người đánh bạn.', 'They are very careful, and through it you see their guilt ease. The two talk technique, and you learn a new parry from the very one who struck you.', { sanity: 2, network: 4, health: 2 }), C('Tự xử lý và không nhắc lại', 'Treat it yourself and mention it no more', 'Vết bầm xanh tím trong một tuần rồi nhạt dần. Mỗi lần nhìn nó, bạn nhớ rằng không ai là bất khả chiến bại, và thấy nhẹ nhõm.', 'The bruise stays blue-purple for a week then fades. Each time you look at it you recall no one is invincible, and feel relieved.', { health: -2, sanity: 1 })],
    I('Bạn xoa vết bầm và quay lại tập.', 'You rub the bruise and return to practice.'), { theme: 'work' }),
  M('m_pinky_night_visitor_tea', AGE.GROWN, fneed(P, 2),
    '[Khách đêm với ấm trà] Một Sovereign già ghé nhà bạn vào lúc nửa đêm, mang theo một ấm trà và hai cái chén. Ông không nói tại sao đến. Hai người ngồi uống, và ông chỉ hỏi bạn một câu: Có đêm nào bạn thấy mình phá một lời thề không ai biết không?',
    '[Night visitor with a teapot] An old Sovereign calls at your home at midnight, carrying a teapot and two cups. He does not say why he came. The two of you sit and drink, and he asks only one question: Is there a night you broke an oath no one knew of?',
    [C('Trả lời thành thật', 'Answer truthfully', 'Bạn kể về một đêm nhiều năm trước, và ông cúi đầu chậm, như đã biết. Ông nói ông cũng có một đêm như thế, và không bao giờ kể ai. Hai người cùng im lặng đến sáng.', 'You tell of a night many years ago, and he nods very slowly as if he knew. He says he too had such a night and never told anyone. The two of you sit silent until dawn.', { sanity: 3, rep: 4, network: 5 }), C('Nói không có', 'Say there is none', 'Ông nhìn bạn hồi lâu, và nâng chén uống cạn. Ông nói đó là một câu trả lời, nhưng không phải câu trả lời đúng. Rồi ông ra về, không nói thêm.', 'He looks at you very long and drains his cup. He says that is an answer, but not the true one. Then goes, saying no more.', { sanity: -4, rep: 1 })],
    I('Bạn rót thêm trà và đổi chủ đề.', 'You pour more tea and change the subject.'), { theme: 'work' }),
  M('m_pinky_book_of_names', AGE.GROWN, fneed(P, 2),
    '[Cuốn sổ những cái tên] Trong thư viện của The Pinky có một cuốn sổ ghi tên mọi người từng lập thệ, và bên cạnh mỗi tên là một ký hiệu nhỏ: một chấm nếu họ giữ lời, một vạch nếu họ bẻ cong, một vòng tròn nếu họ phá. Bạn tìm thấy tên mình, và thấy số chấm ít hơn bạn nghĩ.',
    '[The book of names] In the Pinky’s library is a book listing everyone who ever took an oath, with a small mark beside each name: a dot if they kept their word, a stroke if they bent it, a circle if they broke it. You find your name and see fewer dots than you expected.',
    [C('Đọc hết cuốn sổ của chính mình', 'Read through your own entries', 'Bạn thấy từng quyết định bạn đã đưa ra, và mỗi cái có một ghi chú ngắn bằng nét chữ bạn không biết. Bạn đọc đến tối, và rời đi với cảm giác vừa được gặp lại một người xa lạ rất quen.', 'You see each decision you made, each with a short note in handwriting you do not know. You read until night and leave feeling you have just met again an utter stranger you know well.', { sanity: -4, rep: 3 }), C('Khép sổ lại, không đọc thêm', 'Close the book and read no more', 'Bạn trả sổ về chỗ cũ, và bước ra ngoài trời sáng. Bạn hiểu rằng có những điều người ta chỉ muốn biết là mình có thể nhìn, chứ không phải nhìn thật.', 'You return the book and step out into daylight. You understand that some things one only wants to know one could look at, not truly look.', { sanity: 2, rep: 1 })],
    I('Bạn lật qua vài trang rồi cất đi.', 'You flip through a few pages and put it away.'), { theme: 'work' })
];

export const PINKY_DAILIES = [
  D('d_pinky_sheath_sound', AGE.GROWN, fneed(P, 0), 'Thanh kiếm trượt vào vỏ với một tiếng rất khẽ mà chỉ bạn nghe được. Bạn tự hỏi bao nhiêu lời thề đã kết thúc bằng âm thanh ấy.', 'The sword slides into its scabbard with a very soft sound only you can hear. You wonder how many oaths have ended with that sound.', {}),
  D('d_pinky_red_ink', AGE.GROWN, fneed(P, 0), 'Mực đỏ dùng trong sổ ghi lời thề không bao giờ khô hẳn. Bạn đặt ngón tay lên một dòng cũ, và thấy nó hơi ẩm, như vừa mới viết.', 'The red ink used in the oath ledgers never dries completely. You rest a finger on an old line and find it slightly damp, as though just written.', {}),
  D('d_pinky_wind_bell', AGE.GROWN, fneed(P, 0), 'Gió làm chuông nhỏ ở cổng tháp khẽ ngân. Bạn đứng lại nghe, và nhận ra cùng một giai điệu đã vang lên ở một nơi nào đó trong trí nhớ bạn.', 'Wind makes the small bell at the tower gate chime softly. You stop and listen and realize the same tune once rang somewhere in your memory.', {}),
  D('d_pinky_morning_drill', AGE.GROWN, fneed(P, 0), 'Buổi tập sáng ở sân tháp bắt đầu khi sương chưa tan. Bạn nhìn hơi thở của mọi người hòa vào nhau, và không ai nói một lời cho đến khi mặt trời lên.', 'The morning drill in the tower yard begins before the mist clears. You watch everyone’s breath blend, and no one speaks until the sun rises.', {}),
  D('d_pinky_blade_edge', AGE.GROWN, fneed(P, 0), 'Bạn thử lưỡi kiếm trên một sợi tóc, và nó đứt không một tiếng. Bạn nhìn hai nửa sợi tóc rơi xuống rất chậm, và nghĩ đến một điều gì đó đã được chia đôi.', 'You test the blade against a single hair, and it parts without a sound. You watch the two halves fall slowly and think of something that has been divided.', {}),
  D('d_pinky_lamp_shadow', AGE.GROWN, fneed(P, 0), 'Bóng của bạn trên tường tháp dài hơn thường lệ, và hình như đứng thẳng hơn chính bạn. Bạn chỉnh lại tư thế, và thấy bóng cũng làm theo, chậm một nhịp.', 'Your shadow on the tower wall is longer than usual and seems to stand straighter than you do. You adjust your posture, and the shadow follows, a beat slow.', {}),
  D('d_pinky_wet_stone_step', AGE.GROWN, fneed(P, 0), 'Bậc đá trước cửa tháp ướt và trơn sau đêm mưa. Bạn bước cẩn thận, và nhận ra mình đang nghĩ về mỗi bước như một lời thề nhỏ.', 'The stone step before the tower door is wet and slick after the rain. You tread carefully, noticing you are thinking of each step as a small oath.', {}),
  D('d_pinky_old_sword_rack', AGE.GROWN, fneed(P, 0), 'Giá kiếm cũ ở sảnh luôn có một chỗ trống ở giữa. Không ai biết kiếm nào từng ở đó, và mỗi người đi qua đều đặt tay lên khoảng trống ấy, như chào.', 'The old sword rack in the hall always has one empty slot in the middle. No one knows which sword once stood there, and everyone passing rests a hand on the gap, as in greeting.', {}),
  D('d_pinky_sworn_silence', AGE.GROWN, fneed(P, 0), 'Bữa cơm trưa trong im lặng hoàn toàn, vì hôm nay là ngày giỗ một người của hội. Bạn nghe tiếng đũa chạm bát, và nghĩ đó là một cách khác để nói chuyện.', 'Lunch passes in complete silence, because today is the memorial of one of the team. You hear chopsticks touch bowls and think it is another way of conversation.', {}),
  D('d_pinky_spare_thread', AGE.GROWN, fneed(P, 0), 'Bạn tìm thấy một đoạn chỉ đỏ thừa trong túi áo, dài chừng một gang. Bạn cuộn nó quanh ngón tay, và không biết nó là của lời thề nào.', 'You find a spare length of red thread in your coat pocket, about a hand span. You wind it around a finger, not knowing which oath it belonged to.', {}),
  D('d_pinky_candle_vigil', AGE.GROWN, fneed(P, 0), 'Mỗi tối có một ngọn nến được thắp trong tháp, và không ai nhận mình là người thắp. Bạn ngồi nhìn nó trước khi về, và thấy nó đang đếm thời gian cho một ai đó.', 'Each evening a candle is lit in the tower and no one claims to be the lighter. You sit watching it before leaving and feel it is counting time for someone.', {}),
  D('d_pinky_tower_pigeon', AGE.GROWN, fneed(P, 0), 'Một con bồ câu đậu trên mái tháp, và nghiêng đầu nhìn bạn như thể muốn hỏi điều gì. Bạn đáp lại bằng một cái gật đầu, và nó bay đi ngay.', 'A pigeon lands on the tower roof and tilts its head at you as if to ask something. You answer with a nod, and it flies off at once.', {}),
  D('d_pinky_flour_dust', AGE.GROWN, fneed(P, 0), 'Bột mì từ nhà bếp bay lơ lửng trong ánh nắng sớm của tháp. Mỗi hạt sáng lên rồi tắt, và bạn thấy cả sảnh như đang thở một hơi sương mỏng.', 'Flour from the kitchen floats in the tower’s early sunlight. Each grain glints and fades, and the whole hall seems to breathe a thin mist.', {}),
  D('d_pinky_gate_creak', AGE.GROWN, fneed(P, 0), 'Cánh cổng gỗ của tháp kêu một tiếng dài khi mở. Không ai tra dầu vào bản lề, vì người ta nói tiếng ấy cho biết có người vào, và đó là điều cần biết.', 'The tower’s wooden gate gives a long creak when opened. No one oils the hinge because it is said that sound tells someone has entered, and that is what one must know.', {}),
  D('d_pinky_stray_cat', AGE.GROWN, fneed(P, 0), 'Một con mèo hoang quen ngồi trên bệ cửa sổ tháp, và nhìn mọi người tập kiếm mà không chớp mắt. Có người đặt cho nó một cái tên, rồi không ai gọi.', 'A stray cat is used to sitting on the tower window ledge, watching everyone practice without blinking. Someone gave it a name, and then no one used it.', {}),
  D('d_pinky_blank_page', AGE.GROWN, fneed(P, 1), 'Một trang trống trong sổ lời thề có một vệt mực đỏ nhỏ ở góc, như dấu ngón tay.', 'A blank page in the oath ledger bears a small red ink mark at the corner, like a fingerprint.', {}),
  D('d_pinky_stove_warmth', AGE.GROWN, fneed(P, 0), 'Bếp lò ở sảnh luôn ấm một nửa. Mỗi người ngồi gần đều chuyển chỗ khi người khác đến, và bạn thấy một thứ lịch sự không cần ai dạy.', 'The stove in the hall is always half warm. Everyone sitting near it shifts when another arrives, and you see a courtesy no one needed to teach.', {}),
  D('d_pinky_small_bow', AGE.GROWN, fneed(P, 0), 'Một người cùng hội cúi chào bạn khi đi ngang, rất ngắn, không nhìn lên. Bạn đáp lại cùng một cách, và cả hai đi tiếp mà không ngoái lại.', 'A fellow member bows to you in passing, very briefly, without looking up. You answer the same way and both go on without glancing back.', {}),
  D('d_pinky_long_shadow', AGE.GROWN, fneed(P, 0), 'Lúc chiều muộn, bóng tháp chuông rơi lên cả quảng trường và chạm đến chân bạn. Bạn đứng yên trong cái bóng ấy một lúc, và không thấy sợ.', 'In late afternoon the bell tower’s shadow falls across the whole plaza and touches your feet. You stand still in that shadow a while and feel no fear.', {}),
  D('d_pinky_sharpened_pencil', AGE.GROWN, fneed(P, 0), 'Người giữ sổ gọt chì thành một đầu nhọn hoàn hảo trước mặt bạn. Ông nói cả đời ông chỉ muốn một điều: viết ra những gì người ta thật sự nói.', 'The registry keeper sharpens a pencil to a perfect point before you. He says his whole life he has wanted just one thing: to write down what people truly say.', {}),
  D('d_pinky_rain_on_tiles', AGE.GROWN, fneed(P, 0), 'Mưa gõ lên mái ngói tháp thành một nhịp đều, và bạn nhận ra nhịp ấy trùng với nhịp tim của chính mình. Bạn nghe cho đến khi mưa tạnh.', 'Rain taps on the tower’s tile roof in an even rhythm, and you realize the beat matches your own heart. You listen until the rain stops.', {}),
  D('d_pinky_forgotten_umbrella', AGE.GROWN, fneed(P, 0), 'Một chiếc ô để quên ở cửa tháp đã nằm đó ba tuần. Không ai lấy, vì người ta nói một người sẽ quay lại, và chờ là một phần của lời thề.', 'An umbrella left at the tower door has lain there three weeks. No one takes it, because it is said someone will return, and waiting is part of the oath.', {}),
  D('d_pinky_steam_rice', AGE.GROWN, fneed(P, 0), 'Hơi nước từ nồi cơm phủ mờ cửa sổ bếp tháp. Bạn vẽ một chữ lên mặt kính bằng ngón tay, rồi xóa đi trước khi ai thấy.', 'Steam from the rice pot fogs the tower kitchen window. You write one character on the glass with a finger, then wipe it away before anyone sees.', {}),
  D('d_pinky_cracked_cup', AGE.GROWN, fneed(P, 0), 'Chiếc chén nứt của bạn đã dùng nhiều năm, và không ai nói bạn nên đổi. Bạn rót trà vào, và nhìn vết nứt thấm một chút màu nâu mỗi buổi sáng.', 'Your cracked cup has served years and no one says to replace it. You pour tea in and watch the crack seep a little brown each morning.', {}),
  D('d_pinky_footprint_dew', AGE.GROWN, fneed(P, 0), 'Dấu chân ướt sương của ai đó đi trước bạn qua sân tháp, bước đều và thẳng. Bạn đi theo đúng những dấu ấy, và không ngạc nhiên khi chúng dừng trước cửa bạn.', 'Dew-wet footprints of someone ahead of you cross the tower yard, even and straight. You follow exactly those marks and are unsurprised when they stop at your door.', {}),
  D('d_pinky_empty_bench', AGE.GROWN, fneed(P, 0), 'Băng ghế ngoài sân tháp thường đầy người vào buổi sáng, và hôm nay nó vắng. Bạn ngồi xuống một mình, và nhận ra bạn đang ngồi vào đúng chỗ của một người đã mất.', 'The bench in the tower yard is usually full in the morning, and today it is empty. You sit down alone and realize you are sitting in the exact place of someone dead.', {}),
  D('d_pinky_cold_blade_touch', AGE.GROWN, fneed(P, 0), 'Lưỡi kiếm lạnh buốt khi bạn chạm vào buổi sáng, và nóng hơn ở buổi tối. Không ai giải thích được vì sao, và bạn đã thôi hỏi.', 'The blade is icy when you touch it in the morning and warmer in the evening. No one can explain why, and you have stopped asking.', {}),
  D('d_pinky_distant_thunder', AGE.GROWN, fneed(P, 0), 'Sấm rền ở xa, rất đều, như một nhịp trống cho một cuộc đấu chưa bắt đầu. Cả sân tháp ngừng luyện tập để nghe, rồi lại tiếp tục.', 'Thunder rumbles far off, very steady, like a drum beat for a duel not yet begun. The whole tower yard pauses practice to listen, then resumes.', {}),
  D('d_pinky_folded_robe', AGE.GROWN, fneed(P, 0), 'Bộ áo choàng lập thệ của bạn được gấp gọn trong tủ, và bạn nhận ra chưa mặc nó từ một lúc. Bạn chạm vào vải một lúc, rồi đóng tủ lại.', 'Your oath-taking robe is folded neatly in the wardrobe, and you realize you have not worn it for some time. You touch the cloth a while then close the wardrobe.', {}),
  D('d_pinky_sealed_envelope', AGE.GROWN, fneed(P, 1), 'Một phong bì niêm sáp đỏ nằm trên bàn bạn mà không ai nhận đã đặt. Bạn không mở. Bạn để nó ở đó, và hôm sau nó biến mất, như đã được đọc theo cách khác.', 'An envelope sealed in red wax lies on your desk and no one claims to have placed it. You do not open it. You leave it there, and the next day it vanishes, as if read in another way.', {})
];
