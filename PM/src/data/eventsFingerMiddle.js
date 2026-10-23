// The Middle: a family that keeps a book. Anyone who is hurt becomes a Sibling the Middle will answer
// for, and the Book of Vengeance remembers every name that was written in it. The missions here ask
// one question over and over: write the name, or strike it out. Both choices are remembered by the
// people who read the Book later.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

const MD = 'Middle';

export const MIDDLE_EVENTS = [
  // ------------------------------------------------------------------ missions
  fe('middle_book_entry_fresh', MD, [0, 3],
    '[Một cái tên mới trong Book] Một Little Sibling bị cướp ở ga tàu điện và nằm viện ba ngày. Người của Middle viết tên kẻ ra tay vào Book of Vengeance, và Big Sibling của tổ bạn đặt cây bút xuống trước mặt bạn. Theo lệ, người ký thứ hai phải là người cùng tổ với nạn nhân.',
    '[A fresh name in the Book] A Little Sibling was robbed at the tram station and lay three days in hospital. The Middle’s scribe writes the attacker’s name into the Book of Vengeance, and your team’s Big Sibling sets the pen before you. By custom the second signature must come from the victim’s own team.',
    [
      fc('Ký tên, chịu trách nhiệm cùng Book', 'Sign and share the Book’s burden',
        'Nét mực khô chậm. Big Sibling gật đầu, và cả tổ cùng im lặng một lúc. Bạn biết từ nay tên ấy là việc của bạn, theo nghĩa không ai có thể rút lại.',
        'The ink dries slowly. The Big Sibling nods, and the whole team goes quiet a moment. You know that from now that name is your business, in a way no one can withdraw.',
        { rep: 5, network: 6, sanity: -3 }, { flagsAdd: ['middle_vengeful'], scheduleConsequences: [later('middle_vengeance_echo', 5, 'Cái tên đã ký vào Book', 'The name you signed into the Book')] }),
      fg('Hỏi trước kẻ ra tay là ai và vì sao', 'Ask who the attacker is and why before signing', [
        [55, 'Kẻ ấy là một cậu bé mười bảy tuổi cần tiền thuốc cho mẹ. Big Sibling lặng đi, rồi gạch ngang dòng mực còn ướt. Cả tổ không ai nói gì, nhưng người nạn nhân hôm sau đến cảm ơn bạn.', 'The attacker is a seventeen-year-old who needed money for his mother’s medicine. The Big Sibling is silent, then strikes through the wet ink. No one on the team says a word, but the victim comes to thank you the next day.', { rep: 3, network: 6, sanity: 4 }, { flagsAdd: ['middle_forgiving'], scheduleConsequences: [later('middle_name_returns', 4, 'Người từng được tha tên', 'The person once forgiven')] }],
        [45, 'Kẻ ấy là một tay chuyên nghiệp, và Big Sibling bực vì bạn làm chậm việc ký. Bạn bị ghi một dòng chậm trễ, và cái tên vẫn được ghi.', 'The attacker is a professional, and the Big Sibling is annoyed that you slowed the signing. You are noted for delay, and the name is still written.', { rep: -4, sanity: -3 }, { flagsAdd: ['middle_vengeful'] }]
      ]),
      fc('Từ chối ký, nói bạn muốn tự tìm kẻ ấy trước', 'Refuse to sign, saying you want to find them yourself first',
        'Big Sibling nhìn bạn, rồi cho bạn ba ngày. Bạn tìm thấy kẻ ấy ở một cầu thang tối, và hắn đưa bạn toàn bộ số tiền cướp được mà không chống cự. Vẫn không rõ đó là chiến thắng hay chỉ là một cách khác của sự im lặng.',
        'The Big Sibling stares at you a long moment, then grants three days. You find the attacker on a dark stairway, and he hands over everything he took without a struggle. It is not clear whether that was a win or just another form of silence.',
        { rep: 4, wealth: 5, sanity: -2, network: 3 })
    ], { weight: 11 }),

  fe('middle_family_dinner', MD, [0, 3],
    '[Bữa cơm của cả nhà] Mỗi tháng một lần, cả tổ Middle ăn chung một bữa ở nhà Big Sibling. Bàn dài, bát đũa không giống nhau, ai mang gì thì ăn nấy. Lần này có người mới, một Little Sibling vừa nhập hội, và bạn là người được giao ngồi cạnh cậu ta.',
    '[The family meal] Once a month the whole Middle team eats together at the Big Sibling’s home. A long table, mismatched bowls, everyone eating what they bring. This time there is a newcomer, a Little Sibling just joined, and you are assigned to sit beside them.',
    [
      fc('Gắp thức ăn cho cậu ấy, hỏi chuyện quê quán', 'Serve them food and ask about their hometown',
        'Cậu ta kể về một thị trấn nhỏ ở rìa District. Cậu ăn rất nhanh, như người chưa bao giờ chắc bữa sau còn có. Bạn gắp thêm hai lần, và cậu không từ chối lần nào.',
        'They tell of a small town on the edge of a District. They eat very fast, like someone never sure of the next meal. You serve them twice more, and they refuse neither.',
        { sanity: 4, network: 6, rep: 2 }),
      fc('Chỉ ăn và nghe người khác nói', 'Just eat and listen to the others',
        'Các câu chuyện cũ lần lượt được kể, và bạn nhận ra mình đã nghe một nửa số đó trước đây. Nửa còn lại thì bạn chưa bao giờ được kể, và bạn không hỏi.',
        'Old stories are told in turn, and you realize you have heard half of them before. The other half you were never told, and you do not ask.',
        { sanity: 2, network: 3 }),
      fg('Đứng lên nâng ly cho những người không còn ở bàn', 'Stand and raise a glass to those no longer at the table', [
        [60, 'Cả bàn lặng đi, rồi từng người nâng ly. Big Sibling nhìn bạn một lúc lâu và đặt cái chén của mình xuống không nói gì. Từ đó bạn là người được nhờ nâng ly mỗi lần như thế.', 'The whole table falls silent, then each raises a glass. The Big Sibling looks at you a long while and sets down their bowl without a word. From then on you are the one asked to raise the glass each time.', { rep: 6, network: 7, sanity: 2 }],
        [40, 'Một người ở cuối bàn đứng dậy bỏ đi, vì lời chúc nhắc đến một cái tên anh ta cố quên. Bữa cơm kết thúc sớm hơn thường lệ.', 'Someone at the table’s end rises and leaves, because the toast named someone they have tried to forget. The meal ends earlier than usual.', { rep: -3, network: -4, sanity: -4 }]
      ])
    ], { weight: 10 }),

  fe('middle_runaway_shelter', MD, [0, 3],
    '[Đứa trẻ bỏ nhà] Một đứa trẻ mười ba tuổi gõ cửa nhà bạn lúc nửa đêm, mang theo một túi quần áo và vết bầm trên vai. Nó nói có người của Middle bảo nếu gặp chuyện thì tìm đến địa chỉ này. Đứa bé không nói người đó là ai, và bạn không nhớ đã cho ai địa chỉ nhà mình.',
    '[The runaway child] A thirteen-year-old knocks on your door at midnight with a bag of clothes and a bruise on the shoulder. The child says someone from the Middle said to come to this address if trouble came. The child will not say who, and you do not recall giving anyone your address.',
    [
      fc('Cho vào nhà, gọi Big Sibling đến xem', 'Let them in and call the Big Sibling over',
        'Big Sibling đến trong mười phút, ngồi xuống cạnh đứa trẻ và không hỏi gì. Ông chỉ bảo mang một cốc sữa nóng, và ngồi đến khi nó ngủ. Sáng hôm sau, tên của người đã gây vết bầm đã nằm trong Book.',
        'The Big Sibling arrives within ten minutes, sits beside the child and asks nothing. They only ask for a cup of hot milk, and stay until the child sleeps. By morning the name of whoever caused the bruise is already in the Book.',
        { sanity: 3, network: 6, rep: 4 }, { flagsAdd: ['middle_vengeful'] }),
      fg('Giấu đứa trẻ vài ngày, tự lo', 'Hide the child for a few days and handle it yourself', [
        [55, 'Bạn lo ăn ở và học cho nó trong một tuần, rồi đưa nó đến một người họ hàng ở khu khác. Big Sibling biết, nhưng ông chỉ nói bạn đã tự xử trí đúng kiểu của người trong nhà. Đứa trẻ viết thư cho bạn hằng tháng.', 'You see to its food, lodging and schooling for a week, then take it to a relative in another district. The Big Sibling knows, but only says you handled it the way family does. The child writes you every month.', { sanity: 4, network: 5, wealth: -6 }, { flagsAdd: ['middle_forgiving', 'middle_took_ward'] }],
        [45, 'Người đã gây vết bầm tìm đến cửa nhà bạn sau hai ngày. Bạn phải đuổi hắn đi với tay không, và đứa trẻ nhìn từ khe cửa. Big Sibling hỏi vì sao bạn không gọi ngay từ đầu.', 'Whoever caused the bruise reaches your door after two days. You have to drive him off bare-handed, with the child watching through the crack. The Big Sibling asks why you did not call at the start.', { health: -10, rep: -4, sanity: -5 }]
      ]),
      fc('Cho ngủ một đêm rồi đưa đến trại tế bần', 'Let them sleep one night, then take them to an almshouse',
        'Đứa trẻ không khóc khi bạn nói điều đó. Nó nhìn bạn hồi lâu, rồi cúi đầu và đi cùng bạn, và bạn nhận ra mình vừa làm đúng điều người ta vẫn làm.',
        'The child does not cry as you say it. It looks at you for a long while, then nods and goes with you, and you realize you have just done what people usually do.',
        { sanity: -6, rep: -3 })
    ]),

  fe('middle_mediate_feud', MD, [1, 3],
    '[Hai nhà cãi nhau] Hai gia đình trong khu của Middle cãi nhau về một bức tường chung đến mức một người đã bị đánh. Cả hai đều nằm trong Book, vì cả hai đều là Sibling. Big Sibling cho bạn nhiệm vụ hòa giải, và nói bạn không được viết thêm tên nào vào sổ.',
    '[Two houses at odds] Two families in the Middle’s district quarrel over a shared wall until someone is struck. Both are in the Book, because both are Siblings. The Big Sibling gives you the task of mediation, and says you may not write any further name in the ledger.',
    [
      fc('Nghe từng bên kể hết, rồi đề nghị đổi vị trí bức tường', 'Hear each side fully, then propose moving the wall',
        'Hai nhà phải trả chi phí xây lại, và không ai hài lòng. Nhưng cả hai đều ký, và bạn nhận ra một bức tường mới có thể ngăn cách hay nối liền tùy cách người ta nhìn.',
        'Both households must pay for rebuilding, and neither is satisfied. But both sign, and you realize a new wall can separate or join depending on how one looks at it.',
        { rep: 6, network: 7, wealth: -4, sanity: -2 }, { meritAdd: 3 }),
      fg('Dùng uy của Middle ép cả hai phải hòa', 'Use the Middle’s authority to force both to peace', [
        [55, 'Cả hai nhà nhượng bộ vì sợ mất vị trí trong Book. Chuyện êm, nhưng sau đó hai nhà không bao giờ chào bạn nữa.', 'Both households yield out of fear of their standing in the Book. All goes quiet, but afterward neither greets you again.', { rep: 4, network: -5, sanity: -3 }],
        [45, 'Một nhà phản đối, và Big Sibling phải đến xử trí. Ông không trách bạn, nhưng nói rằng gia đình không được dạy bằng cách ép người ta im lặng.', 'One household objects, and the Big Sibling must come to settle it. They do not blame you, but say family is not taught by forcing people to be silent.', { rep: -5, sanity: -4 }]
      ]),
      fc('Mời cả hai nhà về ăn một bữa cùng bàn', 'Invite both households to share one table',
        'Bữa ăn kéo dài ba giờ, trong đó cả hai nhà chỉ nói chuyện thời tiết. Lúc ra về, hai người cha đưa tay nhau mà không nhìn nhau.',
        'The meal runs three hours, in which the two households talk only of the weather. On leaving, the two fathers shake hands without looking at each other.',
        { sanity: 3, network: 8, rep: 3, wealth: -3 }, { flagsAdd: ['middle_forgiving'] })
    ], { age: [24, 90] }),

  fe('middle_find_missing_sibling', MD, [0, 3],
    '[Người em mất tích] Một Little Sibling không về nhà ba ngày, và Book of Vengeance chưa có tên nào ghi vào. Big Sibling không muốn viết tên trước khi biết điều gì đã xảy ra. Ông giao bạn đi tìm, với một chiếc áo khoác cũ của người mất tích và một danh sách ba nơi họ thường đến.',
    '[A missing Sibling] A Little Sibling has not come home in three days, and no name has been written in the Book of Vengeance. The Big Sibling will not write a name before knowing what happened. They send you to search, with the missing one’s old coat and a list of three places they used to go.',
    [
      fg('Tìm theo thứ tự danh sách, từng nơi một', 'Search the list in order, one place at a time', [
        [60, 'Nơi thứ ba là một nhà trọ bỏ hoang, và người em nằm trên giường, sốt nặng, tay vẫn nắm chặt chiếc nón cũ. Bạn cõng về, và Big Sibling đứng chờ ở cổng trọ cả đêm.', 'The third is an abandoned boardinghouse, and the Sibling lies on a bed with a high fever, still clutching an old cap. You carry them home, and the Big Sibling waits at the gate all night.', { rep: 8, network: 7, health: -4, sanity: 2 }],
        [40, 'Nơi thứ ba trống không. Bạn quay lại nơi thứ nhất và tìm thấy một lá thư dán dưới ván sàn. Nó nói người em đã đi, và đừng tìm. Bạn không đưa lá thư cho ai trong ba ngày.', 'The third is empty. You return to the first and find a letter taped under a floorboard. It says the Sibling has gone and not to look. You show the letter to no one for three days.', { sanity: -6, rep: 1 }]
      ]),
      fc('Nhờ cả tổ cùng đi tìm, chia khu vực', 'Ask the whole team to search together, splitting districts',
        'Cả tổ tản ra, và đến chiều tối đã có người nhìn thấy người em ở chợ đêm. Họ bị một nhóm bán hàng rong giữ lại vì nợ tiền ăn. Tổ trả nợ, và cậu ấy về với đôi mắt đỏ hoe.',
        'The whole team fans out, and by evening someone has spotted the Sibling at the night market. They were held by a hawkers’ group over an unpaid food bill. The team pays, and the Sibling returns red-eyed.',
        { rep: 5, network: 8, wealth: -5, sanity: 3 }),
      fc('Báo Big Sibling rằng bạn không có thời gian', 'Tell the Big Sibling you have no time',
        'Big Sibling gật đầu và nhờ người khác. Hai ngày sau người em được tìm thấy, an toàn, và nhìn bạn như thể muốn hỏi điều gì đó. Bạn tránh ánh mắt ấy.',
        'The Big Sibling nods and asks someone else. Two days later the Sibling is found safe, and looks at you as though wanting to ask something. You avoid that gaze.',
        { rep: -8, network: -6, sanity: -4 })
    ]),

  fe('middle_collect_the_debt', MD, [1, 3],
    '[Món nợ trong Book] Một người đã làm hại một Sibling của Middle mười năm trước, và tên người ấy vẫn nằm trong Book. Hôm nay họ già, ốm, sống trong căn phòng một cửa sổ. Big Sibling nói theo lệ, món nợ vẫn phải trả. Còn cách trả, ông để bạn quyết.',
    '[A debt in the Book] Someone harmed a Middle Sibling ten years ago, and their name is still in the Book. Today they are old, ill, living in a one-window room. The Big Sibling says by custom the debt must still be paid. How, they leave to you.',
    [
      fc('Đòi đúng như Book ghi', 'Collect exactly what the Book says',
        'Bạn lấy đi số tiền cuối cùng của người già, và bà ta không phản đối. Big Sibling ghi dòng thanh toán vào sổ, và gạch một dấu nhỏ ở mép. Bạn nhìn dấu ấy một lúc, nhưng không biết nó nghĩa là gì.',
        'You take the old person’s last sum, and they do not object. The Big Sibling enters the payment in the ledger and makes a small mark at the margin. You look at that mark a long time but cannot tell what it means.',
        { wealth: 8, rep: 4, sanity: -8, network: -2 }, { flagsAdd: ['middle_vengeful'], scheduleConsequences: [later('middle_vengeance_echo', 5, 'Cái tên đã ký vào Book', 'The name you signed into the Book')] }),
      fg('Xin Big Sibling gạch tên ra khỏi Book', 'Ask the Big Sibling to strike the name from the Book', [
        [60, 'Big Sibling im lặng, rồi đưa bạn cây bút. Bạn tự tay gạch tên ấy. Người già khóc rất lặng khi bạn báo, và tặng bạn một chiếc nhẫn bạc của bà đã nhiều năm không đeo.', 'The Big Sibling is silent, then hands you the pen. You strike the name yourself. The old person weeps very quietly when you tell them, and gives you a silver ring they have not worn in years.', { sanity: 6, rep: 3, network: 5 }, { flagsAdd: ['middle_forgiving'], scheduleConsequences: [later('middle_name_returns', 4, 'Người từng được tha tên', 'The person once forgiven')] }],
        [40, 'Big Sibling từ chối, nói Book không phải của riêng bạn. Bạn bị ghi một dòng cảnh cáo vì đã đặt câu hỏi, và món nợ vẫn còn.', 'The Big Sibling refuses, saying the Book is not yours alone. You are noted with a warning for having asked, and the debt remains.', { rep: -6, sanity: -4 }]
      ]),
      fc('Trả khoản nợ thay cho họ từ túi mình', 'Pay the debt on their behalf from your own pocket',
        'Big Sibling nhận tiền, ghi vào sổ rằng món nợ đã được thanh toán bởi một người khác, và không nói tên bạn. Người già không bao giờ biết ai đã trả, và lần sau bạn đi ngang cửa sổ ấy, rèm đã được kéo ra.',
        'The Big Sibling accepts the money, notes in the ledger that the debt has been paid by another, and does not name you. The old person never learns who paid, and the next time you pass that window, the curtain has been drawn back.',
        { wealth: -12, sanity: 5, network: 5, rep: 2 }, { flagsAdd: ['middle_forgiving'] })
    ], { age: [26, 90] }),

  fe('middle_orphans_home', MD, [1, 3],
    '[Mái nhà cho trẻ mồ côi] Ba đứa trẻ mồ côi sau một vụ hỏa hoạn được đưa về trụ sở Middle, và Big Sibling hỏi cả tổ ai có thể nhận một đứa. Không ai đáp trong một lúc lâu. Rồi một người già đứng lên và nói ông nhận cả ba, nếu có ai chia giúp phần còn lại của căn nhà.',
    '[A roof for orphans] Three children orphaned by a fire are brought to the Middle’s hall, and the Big Sibling asks the team who can take one. No one speaks for a long while. Then an old member rises and says he will take all three, if someone helps with the rest of the house.',
    [
      fc('Nhận một đứa về nuôi', 'Take one of the children in',
        'Đứa bé bảy tuổi, im lặng, ôm một con thú bông đã sờn. Phải mất ba tháng nó mới nói câu đầu tiên với bạn, và nó chỉ nói: Hôm nay cơm có thịt.',
        'The child is seven, silent, clutching a worn stuffed animal. It takes three months for the child to say its first sentence to you, and it says only: There is meat in the rice today.',
        { wealth: -8, sanity: 4, network: 5, rep: 4 }, { flagsAdd: ['middle_took_ward'] }),
      fc('Góp tiền nuôi ba đứa trẻ, không nhận ai', 'Contribute money for the three but take none',
        'Số tiền ấy nuôi cả ba trong hai năm. Bạn đến thăm mỗi mùa, và mỗi lần có một đứa chạy ra đầu ngõ đón bạn mà chưa biết vì sao.',
        'That money feeds all three for two years. You visit each season, and each time one of them runs to the end of the lane to greet you without knowing why.',
        { wealth: -10, sanity: 3, network: 6, rep: 3 }),
      fc('Nói bạn chưa đủ sức, xin được miễn', 'Say you cannot manage and ask to be excused',
        'Không ai trách. Ba đứa trẻ được chia cho ba nhà khác, và bạn thấy người già kia ôm đứa nhỏ nhất vào lòng. Bạn rời bàn họp sớm hơn thường lệ.',
        'No one blames you. The three children are divided among three other homes, and you see the old member hold the smallest in his arms. You leave the meeting earlier than usual.',
        { sanity: -4, rep: -2 })
    ]),

  fe('middle_sibling_funeral', MD, [0, 3],
    '[Tang của một người em] Một Sibling lớn tuổi qua đời vì bệnh. Theo lệ của Middle, mọi người trong tổ phải đứng quanh quan tài và mỗi người nói một câu về người đã mất. Bạn được xếp nói sau cùng, và bạn nhận ra mình chẳng biết người ấy nhiều.',
    '[A Sibling’s funeral] An elder Sibling dies of illness. By Middle custom everyone on the team stands around the coffin and each says a sentence about the dead. You are placed last to speak, and you realize you hardly knew them.',
    [
      fc('Nói điều thật: bạn không biết họ nhiều', 'Say the truth: you hardly knew them',
        'Cả phòng im lặng, rồi một người già nói đó là câu thật nhất đêm nay. Họ kể thêm cho bạn nghe ba câu chuyện về người đã khuất, và bạn thấy mình bắt đầu nhớ họ.',
        'The room goes silent, then an elder says it is the truest sentence of the night. They tell you three more stories of the departed, and you begin to miss them.',
        { sanity: 3, network: 5, rep: 2 }),
      fg('Bịa một chuyện nhỏ để lấp chỗ trống', 'Invent a small tale to fill the gap', [
        [55, 'Câu chuyện bạn bịa rất giản dị, về một lần giúp một đứa trẻ băng qua đường. Một người ở góc phòng khẽ gật đầu, như thể điều đó đã xảy ra thật.', 'The story you invent is simple, about once helping a child across the street. Someone in the corner nods quietly, as if it really happened.', { sanity: -3, network: 4, rep: 2 }],
        [45, 'Người em gái của người đã khuất nhìn bạn và nói người anh em của bà chưa bao giờ giúp đứa trẻ nào qua đường vì bị sợ xe. Cả phòng nín thở, và bạn đỏ mặt đến tận tai.', 'The departed’s sibling looks at you and says her brother never helped any child cross a road because he feared cars. The room holds its breath, and you flush to the ears.', { sanity: -6, rep: -4, network: -2 }]
      ]),
      fc('Đứng im một lúc rồi nâng chén', 'Stand silent a moment, then raise your cup',
        'Không ai ép bạn nói. Cả phòng cùng nâng chén theo bạn, và bạn cảm thấy cái im lặng ấy không phải trống rỗng mà đầy một thứ không tên.',
        'No one pressures you to speak. The whole room raises their cups with you, and you feel that silence is not empty but full of something unnamed.',
        { sanity: 4, network: 4 })
    ]),

  fe('middle_book_forgiveness', MD, [1, 3],
    '[Gạch tên khỏi Book] Chuyện này hiếm, vì Book của Middle không quen buông. Một người đã bị ghi trong Book of Vengeance suốt mười lăm năm đến trụ sở Middle, quỳ ở cửa, xin được gặp một Sibling để xin lỗi. Theo lệ, chỉ ai viết tên mới có quyền gạch. Người viết đã qua đời, và quyền ấy giờ thuộc về cả tổ.',
    '[Strike a name from the Book] This is rare, since the Middle’s Book is not used to letting go. A person who has been in the Book of Vengeance for fifteen years comes to the Middle’s hall, kneels at the door, and begs to meet a Sibling to apologize. By custom only the one who wrote a name may strike it. The writer has since died, and the right now belongs to the whole team.',
    [
      fg('Biểu quyết gạch tên, và bạn lên tiếng đầu tiên', 'Put the strike to a vote and speak first for it', [
        [55, 'Cả tổ nhất trí. Người ấy gục xuống ngay trước cửa mà không nói gì. Bạn đỡ họ dậy, và trong tay áo họ có một cuốn sổ nhỏ ghi mười lăm năm cố gắng làm đền bù. Bạn không đọc hết.', 'The team agrees unanimously. The person collapses at the threshold without a word. You help them up, and in their sleeve is a small notebook recording fifteen years of attempts to atone.', { sanity: 6, rep: 7, network: 6 }, { flagsAdd: ['middle_forgiving'], scheduleConsequences: [later('middle_name_returns', 4, 'Người từng được tha tên', 'The person once forgiven')] }],
        [45, 'Một nửa tổ phản đối. Cuộc tranh luận kéo dài đến đêm, và cuối cùng Big Sibling quyết định giữ nguyên tên trong Book thêm ba năm. Người ấy ra về mà không nói gì.', 'Half the team objects. The debate runs until night, and finally the Big Sibling decides to keep the name in the Book three more years. The person leaves without a word.', { sanity: -4, rep: 1, network: -3 }, { flagsAdd: ['middle_forgiving'] }]
      ]),
      fc('Từ chối, nói món nợ chưa trả hết', 'Refuse, saying the debt is not yet paid',
        'Người ấy cúi đầu, như đã chờ câu này, và đứng dậy rất chậm. Bạn không nhìn họ đi, và nhận ra bạn chưa bao giờ biết rõ mình nợ ai điều gì.',
        'The person nods as if awaiting this answer and rises slowly.',
        { rep: 3, sanity: -6, network: -2 }, { flagsAdd: ['middle_vengeful'] }),
      fc('Rời đi để người khác quyết', 'Leave and let others decide',
        'Cuối cùng cả tổ cũng quyết định, nhưng bạn không biết kết quả. Trong cả tuần sau, bạn không dám hỏi.',
        'The team eventually decides, but you never learn the result. The whole next week you do not dare ask.',
        { sanity: -3, rep: -3 })
    ], { age: [26, 90] }),

  fe('middle_borrowed_money', MD, [0, 3],
    '[Khoản vay của một người em] Một Little Sibling mượn tiền bạn để chữa bệnh cho em gái, hẹn trả trong ba tháng. Ba tháng trôi qua, rồi sáu. Người ấy tránh mặt bạn, và Big Sibling nghe tin, hỏi bạn có muốn ghi tên người ấy vào Book hay không.',
    '[A Sibling’s loan] A Little Sibling borrowed money from you to treat a younger sister, promising to repay in three months. Three months pass, then six. They avoid your eye, and the Big Sibling hears of it and asks whether you wish to write their name in the Book.',
    [
      fc('Nói không, tự tìm gặp họ nói chuyện', 'Say no and seek them out to talk',
        'Người ấy khóc khi nhìn thấy bạn và nói em gái đã mất. Họ muốn trả bằng việc, không bằng tiền, và bạn không biết nên nhận cách nào. Cuối cùng bạn chỉ gật đầu.',
        'They weep on seeing you and say the sister died. They want to repay with work, not money, and you do not know which way to accept. Finally you just nod.',
        { sanity: -2, network: 6, wealth: -2 }, { flagsAdd: ['middle_forgiving'] }),
      fg('Ghi tên vào Book, theo lệ', 'Write the name in the Book as custom allows', [
        [60, 'Big Sibling ghi tên vào Book, và chuyện lan trong khu. Khoản nợ được trả đủ trong hai tuần, và người ấy cắt đứt liên hệ với bạn hoàn toàn. Bạn nhận lại tiền và nhận ra mình mất một người em.', 'The Big Sibling enters the name in the Book, and word spreads through the district. The debt is paid in full within two weeks, and the person cuts off contact entirely. You get your money and realize you lost a Sibling.', { wealth: 8, rep: 3, network: -7, sanity: -4 }, { flagsAdd: ['middle_vengeful'] }],
        [40, 'Một người trong tổ phản đối, nói rằng đây là việc của cá nhân không phải của Book. Big Sibling xóa dòng ghi, và bạn bị nhắc nhở rằng không ai ở Middle cho vay tiền mà muốn đòi.', 'Someone on the team objects, saying this is a personal matter, not the Book’s. The Big Sibling erases the entry, and you are reminded that no one in the Middle lends money meaning to collect.', { rep: -5, sanity: -3 }]
      ]),
      fc('Xóa khoản nợ bằng một lá thư', 'Cancel the debt with a letter',
        'Bạn viết vài dòng và gửi đi. Người ấy trả lời bằng ba chữ cảm ơn, và vài tháng sau gửi lại cho bạn đúng số tiền ấy cùng một giỏ trái cây, kèm tên em gái viết lên mép thiệp.',
        'You write a few lines and send them. They reply with three words of thanks, and months later return exactly that sum along with a basket of fruit, the sister’s name written along the card’s edge.',
        { wealth: -2, sanity: 5, network: 6 }, { flagsAdd: ['middle_forgiving'] })
    ]),

  fe('middle_testify_for_sibling', MD, [1, 3],
    '[Làm chứng cho một Sibling] Một Sibling bị buộc tội gây thương tích cho một người ở Nest. Bạn là người duy nhất thấy sự việc, và bạn biết đó là phòng vệ chính đáng. Nhưng làm chứng nghĩa là phải xuất hiện trước một Wing, và bạn sẽ ghi tên mình vào một sổ sách không phải của Middle.',
    '[Testifying for a Sibling] A Sibling is accused of injuring a Nest resident. You are the only witness and know it was lawful self-defense. But testifying means appearing before a Wing, and writing your own name into a ledger that is not the Middle’s.',
    [
      fc('Ra làm chứng, nói đúng sự thật', 'Testify and tell the exact truth',
        'Phiên tòa ngắn. Người Sibling được trả tự do, và Wing ghi tên bạn vào hồ sơ như một nhân chứng đáng tin. Điều ấy có lợi và có hại theo những cách chưa lộ ra.',
        'The hearing is short. The Sibling is freed, and the Wing logs your name in its files as a reliable witness. That is useful and harmful in ways not yet revealed.',
        { rep: 6, network: 6, heat: 4, sanity: -2 }),
      fg('Làm chứng nhưng giấu một chi tiết bất lợi', 'Testify but hide one unfavorable detail', [
        [55, 'Phiên tòa không ai nhận ra, và người Sibling thoát. Nhưng chi tiết bạn giấu hóa ra liên quan tới một người khác, và bạn không ngủ ngon trong nhiều tuần.', 'No one at the hearing notices, and the Sibling goes free. But the detail you hid turns out to concern someone else, and you do not sleep well for weeks.', { rep: 3, network: 4, sanity: -8 }],
        [45, 'Luật sư của Wing nhận ra mâu thuẫn và truy ép bạn ngay tại chỗ. Bạn mất thể diện, và người Sibling bị kết án nhẹ.', 'The Wing’s advocate spots the inconsistency and presses you right there. You lose face, and the Sibling is given a light sentence.', { rep: -8, sanity: -6, heat: 6 }]
      ]),
      fc('Từ chối ra làm chứng, nói đây là việc của Book', 'Decline to testify, saying this is a matter for the Book',
        'Big Sibling nhìn bạn rất lâu. Người Sibling bị kết án, và Book ghi một tên mới: tên người ở Nest. Bạn cầm cây bút, nhưng không ký.',
        'The Big Sibling stares at you a long while. The Sibling is convicted, and the Book gains a new name: the Nest resident’s. You hold the pen but do not sign.',
        { rep: -7, sanity: -7, network: -4 }, { flagsAdd: ['middle_vengeful'] })
    ], { age: [24, 90] }),

  fe('middle_peace_between_families', MD, [2, 3],
    '[Hòa giải giữa các gia đình] Hai gia đình Syndicate nhỏ ở hai khu láng giềng đã thù nhau ba thế hệ. Middle được mời làm trung gian, và Great Elder cử bạn làm đại diện.',
    '[Peace between families] Two small Syndicate families in neighboring districts have feuded for three generations. The Middle is invited to mediate, and the Great Elder sends you as representative.',
    [
      fc('Đề nghị cả hai bên cùng gạch tên khỏi Book', 'Propose both sides strike their names from the Book together',
        'Hai trưởng lão nhìn nhau trong một khoảnh khắc rất dài. Rồi một người đặt bút xuống, và người kia theo sau. Hai dòng bị gạch cùng lúc, và cả phòng như thở ra một hơi dài.',
        'The two elders look at one another for a long moment. Then one sets down a pen, and the other follows. Two lines are struck at once, and the whole room seems to let out a long breath.',
        { rep: 10, network: 9, sanity: 5, wealth: -4 }, { flagsAdd: ['middle_forgiving'], meritAdd: 5 }),
      fg('Đòi mỗi bên trả một khoản đền bù công bằng', 'Demand a fair compensation from each side', [
        [55, 'Hai bên tranh cãi đến sáng, rồi chấp nhận một con số ở giữa. Không ai vui, nhưng cả hai đều ký, và Book chuyển sang trang mới mà không có tên nào thêm.', 'The two sides argue until dawn then accept a figure in the middle. No one is happy, but both sign, and the Book turns to a new page with no names added.', { rep: 6, network: 6, wealth: 5, sanity: -3 }],
        [45, 'Một bên đứng dậy bỏ đi, và hai tuần sau một vụ xô xát nổ ra ở chợ. Great Elder gọi bạn lên, nói bạn đã cố làm đúng, nhưng đúng chưa đủ.', 'One side walks out, and two weeks later a scuffle breaks out at the market. The Great Elder calls you in, saying you tried to do right, but right is not enough.', { rep: -4, sanity: -6, heat: 4 }]
      ]),
      fc('Rút khỏi vụ này, nói Middle không nên can dự', 'Withdraw, saying the Middle should not interfere',
        'Great Elder nghe bạn xong, rồi nói câu duy nhất: Gia đình thì không có quyền rút. Bạn nhận ra ông không trách bạn. Ông chỉ buồn.',
        'The Great Elder hears you, then says one thing: Family has no right to withdraw. You realize they do not blame you. They are only sad.',
        { rep: -6, sanity: -5, network: -3 })
    ], { age: [30, 90], weight: 11 }),

  fe('middle_dinner_for_enemy', MD, [1, 3],
    '[Bàn ăn cho kẻ thù] Một đối thủ của Middle bị thương nặng trong một vụ cháy, và không ai ở khu ấy dám đến thăm. Big Sibling nghe tin và nói với cả tổ rằng một cái tên trong Book không có nghĩa là một cái bàn trống. Ông hỏi ai muốn mang cơm cho người ấy.',
    '[A table for an enemy] A rival of the Middle is badly burned in a fire, and no one in that district dares visit. The Big Sibling hears and tells the team that a name in the Book does not mean an empty table. They ask who will bring the person a meal.',
    [
      fc('Nhận mang cơm, đưa tận giường', 'Volunteer and bring the meal to the bed',
        'Người ấy nhìn bạn bằng nửa khuôn mặt còn lại, rồi không nói gì suốt bữa. Khi bạn thu bát, họ nói một chữ: Cảm ơn.',
        'The person looks at you with the half of their face that remains, then says nothing through the meal. As you collect the bowl they say one word: Thanks.',
        { sanity: 3, network: 5, rep: 4 }, { flagsAdd: ['middle_forgiving'] }),
      fc('Nói bạn không muốn dính tới người ấy', 'Say you want nothing to do with them',
        'Một người khác trong tổ nhận mang cơm. Bạn nhìn họ đi, và cả buổi chiều cảm thấy một điều gì không ổn mà không gọi tên được.',
        'Someone else on the team takes the meal. You watch them go and spend the whole afternoon feeling something is off that you cannot name.',
        { sanity: -3, rep: -2 }),
      fg('Mang cơm nhưng để người khác đưa vào', 'Bring the meal but let someone else carry it in', [
        [60, 'Bạn đứng ngoài cửa, nghe tiếng thìa chạm bát. Người ấy hỏi ai mang đến, và người đưa nói tên bạn. Một lúc sau, họ gửi lại bát sạch, rửa kỹ, với một cành hoa nhỏ.', 'You stand at the door and hear a spoon touch a bowl. The person asks who brought it, and the carrier names you. A while later they send the bowl back, scrubbed clean, with a small sprig of flowers.', { sanity: 2, network: 4, rep: 2 }],
        [40, 'Người ấy từ chối ăn khi biết bạn là người gửi. Bát cơm được mang trả lại nguyên vẹn, và Big Sibling chỉ nhìn bạn với vẻ dịu dàng.', 'The person refuses to eat on learning it was you. The bowl is carried back full, and the Big Sibling only looks at you gently.', { sanity: -4, rep: 0 }]
      ])
    ], { age: [24, 90] }),

  fe('middle_litter_of_names', MD, [2, 3],
    '[Trang sổ quá dày] Book of Vengeance của khu bạn đã dày đến mức ghi thêm một tên nữa là phải mua cuốn mới. Great Elder hỏi cả hội một câu mà không ai muốn trả lời: Có bao nhiêu trong số những tên này vẫn là một món nợ thật, và bao nhiêu chỉ là thói quen?',
    '[A page too thick] The Book of Vengeance in your district has grown so thick that adding one more name means buying a new volume. The Great Elder asks the gathering a question no one wants to answer: How many of these names are still real debts, and how many are only habit?',
    [
      fc('Đề nghị rà soát từng tên một cùng nhau', 'Propose reviewing each name together',
        'Cuộc rà soát kéo dài ba tuần. Hai mươi tên được gạch, mười bốn tên được giữ, và ba tên bị tranh cãi gay gắt. Cuối cùng cả hội ngồi lại, mệt rã rời, và thấy nhẹ nhõm kỳ lạ.',
        'The review takes three weeks. Twenty names are struck, fourteen kept, and three fiercely contested. At the end the whole gathering sits, exhausted, and feels strangely light.',
        { rep: 8, network: 8, sanity: 5, wealth: -3 }, { flagsAdd: ['middle_forgiving'], meritAdd: 5 }),
      fg('Nói rằng mỗi tên đều là một lời hứa không được phá', 'Say each name is a promise that must not be broken', [
        [55, 'Great Elder gật đầu, và cả hội lặng đi. Những người trẻ nhìn bạn với ánh mắt kính trọng, và bạn nhận ra mình vừa chọn đứng về một phía mà bạn chưa chắc tin.', 'The Great Elder nods, and the gathering falls silent. The young ones look at you with respect, and you realize you have just chosen a side you are not sure you believe in.', { rep: 6, sanity: -5, network: 4 }, { flagsAdd: ['middle_vengeful'] }],
        [45, 'Một người già đứng dậy hỏi bạn đã bao giờ thấy ai chết vì một lời hứa không. Bạn không trả lời, và cả hội nhìn bạn một lúc lâu.', 'An elder rises and asks if you have ever seen anyone die over a promise.', { rep: -3, sanity: -6 }, { flagsAdd: ['middle_vengeful'] }]
      ]),
      fc('Không phát biểu, ngồi nghe cả buổi', 'Say nothing and listen the whole session',
        'Nhiều giờ trôi qua với những ý kiến trái ngược. Cuối buổi Great Elder nhìn bạn và hỏi ý bạn thế nào. Bạn nói bạn chưa biết, và ông cúi đầu như thể đó là câu trả lời tốt nhất.',
        'Hours pass with opposing views. At the end the Great Elder looks at you and asks what you think. You say you do not know yet, and they nod as though that were the best answer.',
        { sanity: 1, rep: 2 })
    ], { age: [32, 90] }),

  fe('middle_name_returns', MD, [1, 3],
    '[Cái tên được tha trở lại] Người từng bị gạch tên khỏi Book nhờ bạn xuất hiện trước cửa nhà bạn, tay cầm một chiếc hộp gỗ nhỏ. Họ nói họ đã sống tử tế suốt năm năm, và muốn đưa bạn một thứ họ giữ từ ngày đó. Họ không nói thứ ấy là gì.',
    '[The forgiven name returns] The person once struck from the Book thanks to you appears at your door, holding a small wooden box. They say they have lived decently for five years, and want to give you something they have kept since that day. They do not say what it is.',
    [
      fc('Mở hộp ngay tại cửa', 'Open the box right at the door',
        'Bên trong là một chiếc răng sữa nhỏ, buộc dây đỏ. Người ấy nói đó là răng của con họ, thứ họ giữ khi tưởng mình sắp chết, và muốn trao cho một người xứng đáng.',
        'Inside is a small baby tooth tied with red thread. The person says it is their child’s, kept when they thought they would die, and they want to give it to someone worthy.',
        { sanity: 5, network: 6, rep: 3 }),
      fc('Mời họ vào nhà ngồi, rồi mới mở', 'Invite them in to sit before opening',
        'Hai người ngồi cạnh nhau uống trà gần một giờ mà không nói gì nhiều. Khi bạn mở hộp, họ quay mặt đi, và bạn nhận ra một số món quà chỉ có thể nhận khi người đưa không nhìn.',
        'The two of you sit side by side drinking tea nearly an hour without saying much. When you open the box they turn their face away, and you realize some gifts can only be received while the giver is not looking.',
        { sanity: 6, network: 7, rep: 3 }),
      fc('Từ chối, nói bạn không muốn nợ gì ai', 'Refuse, saying you want to owe no one anything',
        'Người ấy nhìn bạn một lúc, rồi cúi chào rất sâu và rời đi. Cả đêm bạn không ngủ, và sáng hôm sau chiếc hộp đã nằm trước cửa, kèm một mảnh giấy ghi: Tôi chờ.',
        'The person studies you a moment, then bows very low and leaves.',
        { sanity: -5, rep: -2, network: -3 })
    ], { causal: true, requires: ['middle_forgiving'], age: [26, 95], weight: 9 }),

  fe('middle_vengeance_echo', MD, [1, 3],
    '[Tiếng vọng của một lần báo thù] Cái tên bạn từng ký vào Book nhiều năm trước đã được xử lý. Nhưng hôm nay một đứa trẻ mười hai tuổi, con của người ấy, đứng trước mặt bạn trên phố, và hỏi bạn có phải là người đã làm điều đó không. Nó không khóc, và không có gì trong tay.',
    '[Echo of a vengeance] The name you once signed into the Book years ago has been dealt with. But today a twelve-year-old, that person’s child, stands before you on the street and asks whether you are the one who did it. It does not cry, and holds nothing in its hands.',
    [
      fc('Nói thật, và đứng chịu câu trả lời của nó', 'Tell the truth and stand for whatever answer it gives',
        'Đứa trẻ im lặng, rồi nói: Tôi sẽ nhớ mặt bạn. Nó quay đi, và bạn đứng giữa phố đến lúc đèn đường bật sáng mà không biết mình đang chờ điều gì.',
        'The child is silent a long while, then says: I will remember your face. It turns away, and you stand in the street until the lamps come on, not knowing what you are waiting for.',
        { sanity: -9, rep: 2, network: -3 }),
      fg('Phủ nhận, nói bạn không biết gì', 'Deny it and say you know nothing', [
        [55, 'Đứa trẻ nhìn bạn, và biết bạn nói dối. Nó không nói gì, và đi. Từ ngày ấy, bạn thấy nó đứng ở một góc phố nào đó mỗi tuần, không bao giờ lại gần.', 'The child looks at you, and knows you are lying. It says nothing, and goes. From that day you see it standing at some street corner each week, never coming closer.', { sanity: -7, rep: -3, heat: 2 }],
        [45, 'Đứa trẻ tin bạn. Nó cảm ơn và đi, và bạn mang cái cảm ơn ấy suốt nhiều năm như một viên sỏi trong giày.', 'The child believes you. It thanks you and goes, and you carry that thanks for years like a pebble in a shoe.', { sanity: -10, rep: 1 }]
      ]),
      fc('Mời đứa trẻ ăn một bữa, kể lại mọi chuyện', 'Offer the child a meal and tell it everything',
        'Đứa trẻ nghe cả câu chuyện, ăn bát cơm, và khi đứng dậy nói nó vẫn chưa tha thứ cho bạn, nhưng sẽ quay lại hỏi thêm. Bạn gật đầu, và biết đây không phải là kết thúc.',
        'The child hears the whole story, eats the bowl of rice, and on rising says it has not forgiven you yet, but will come back to ask more. You nod, and know this is no ending.',
        { sanity: -4, network: 4, rep: 3 })
    ], { causal: true, requires: ['middle_vengeful'], age: [28, 95], weight: 9 })
];

export const MIDDLE_MINORS = [
  M('m_middle_shared_bowl', AGE.GROWN, fneed(MD, 0),
    '[Cái bát chung] Trong bếp của trụ sở Middle có một cái bát lớn mà ai muốn thì ăn, không ai biết của ai. Hôm nay nó đầy, và hôm qua nó trống. Bạn nhìn quanh và không thấy ai nhận mình đã nấu.',
    '[The shared bowl] In the Middle’s hall kitchen is a large bowl anyone may eat from, belonging to none. Today it is full, and yesterday it was empty. You look around and no one claims to have cooked it.',
    [C('Ăn và để lại thêm một ít tiền lẻ', 'Eat and leave a few small coins', 'Bạn để vài đồng xu vào chiếc lọ cạnh bát. Hôm sau bát lại đầy, và bạn không biết đó có phải nhờ bạn không.', 'You drop a few coins into the jar beside the bowl. The next day it is full again, and you do not know if that was thanks to you.', { wealth: -1, network: 3, sanity: 2 }), C('Mang một ít về cho người đang ốm', 'Take some home for someone ill', 'Bạn gói cơm trong vải và đem cho một người hàng xóm đang sốt. Họ ăn chậm, và nói đã lâu không được ăn một bữa nóng.', 'You wrap the rice in cloth and bring it to a feverish neighbor. They eat very slowly and say it has been long since they had a hot meal.', { sanity: 3, network: 4 })],
    I('Bạn múc một bát và ngồi ăn một mình.', 'You ladle a bowl and eat alone.'), { theme: 'work' }),
  M('m_middle_book_dust', AGE.GROWN, fneed(MD, 0),
    '[Bụi trên bìa sổ] Cuốn Book of Vengeance được phủ một lớp bụi mỏng vì lâu không ai mở. Bạn lau nó đi thì thấy một dòng chữ nhỏ ở mép bìa, viết bằng bút chì: Đừng viết thêm nếu chưa cần.',
    '[Dust on the book] The Book of Vengeance is covered with a thin layer of dust because no one has opened it lately. You wipe it away and find a tiny line at the cover’s edge, written in pencil: Do not write more unless you must.',
    [C('Lau sạch và để cuốn sổ ở chỗ cũ', 'Wipe it clean and leave it where it was', 'Dòng bút chì mờ dần dưới ngón tay bạn.', 'The pencil line fades under your finger. You do not know if it was a reminder or just someone’s habit, but you write nothing more that month.', { sanity: 2 }), C('Chép dòng chữ vào sổ tay riêng', 'Copy the line into your own notebook', 'Bạn chép lại dòng bút chì, và đôi khi giở ra đọc. Một ngày bạn nhận ra nét chữ ấy giống nét chữ của chính bạn ngày bé.', 'You copy the pencil line, and sometimes flip to read it. One day you realize the handwriting resembles your own childhood script.', { sanity: -1, rep: 1 })],
    I('Bạn lau qua cuốn sổ rồi đi tiếp.', 'You wipe the book in passing and move on.'), { theme: 'work' }),
  M('m_middle_hand_me_down', AGE.GROWN, fneed(MD, 0),
    '[Chiếc áo truyền tay] Một Little Sibling đưa bạn chiếc áo khoác cũ đã qua tay bảy người trước. Nó rộng, rách khuỷu, mùi thuốc lá lạ. Cậu ta bảo mỗi người mặc nó đều gặp may, và ai trả nó đều trả lại vào dịp có người cần.',
    '[The hand-me-down coat] A Little Sibling hands you an old coat that has passed through seven people before. It is wide, torn at the elbow, smelling of foreign tobacco. They say everyone who wears it finds luck, and whoever returns it always does so when someone needs it.',
    [C('Mặc nó một mùa đông', 'Wear it a whole winter', 'Mùa đông ấy bạn vượt qua một cơn sốt nặng và một cuộc ẩu đả mà không bị thương. Đến xuân bạn cất áo vào tủ, chờ ai cần.', 'That winter you survive a bad fever and a brawl without injury. By spring you store the coat in the wardrobe, awaiting someone in need.', { health: 3, sanity: 3, network: 3 }), C('Trả lại ngay, nói bạn không cần', 'Return it at once, saying you need none', 'Cậu ta nhận lại với một nụ cười kỳ lạ. Hai tuần sau bạn bị ướt mưa suốt đêm trong một vụ việc, và nhớ đến chiếc áo ấy rất nhiều.', 'He takes it back with an odd smile. Two weeks later you are soaked through all night on a job, and remember that coat a great deal.', { health: -3, sanity: -1 })],
    I('Bạn gấp chiếc áo lại và đặt lên ghế.', 'You fold the coat and set it on a chair.'), { theme: 'work' }),
  M('m_middle_lullaby_mother', AGE.GROWN, fneed(MD, 0),
    '[Bài hát ru ở tầng dưới] Mỗi đêm bạn nghe một người mẹ hát ru ở tầng dưới nhà trọ Middle. Bài hát có một câu cứ lặp đi lặp lại, và bạn bắt đầu thuộc lòng. Đêm nay người mẹ không hát. Chỉ có tiếng đứa bé khóc, rất nhỏ.',
    '[Lullaby from downstairs] Each night you hear a mother singing to her baby on the floor below in the Middle’s boardinghouse. A line of the song repeats, and you have begun to know it by heart. Tonight the mother does not sing. There is only the baby crying, softly.',
    [C('Xuống hỏi thăm, mang một cốc sữa ấm', 'Go down to ask after them with a warm cup of milk', 'Người mẹ đang ngủ gục bên giường, kiệt sức. Bạn bế đứa bé một giờ, và nó nín ngay khi bạn hát đúng câu lặp lại ấy.', 'The mother has dozed off by the bed, exhausted. You hold the baby an hour, and it quiets the moment you hum that repeated line.', { sanity: 4, network: 5 }), C('Gõ nhẹ lên trần và đợi', 'Tap softly on the ceiling and wait', 'Tiếng khóc ngừng sau một lúc. Hôm sau, người mẹ để lại trước cửa bạn một chiếc bánh nhỏ gói giấy, kèm lời cảm ơn viết nguệch ngoạc.', 'The crying stops after a while. The next day the mother leaves a small paper-wrapped pastry at your door with a scribbled thanks.', { sanity: 2, network: 3 })],
    I('Bạn trùm chăn kín tai và cố ngủ.', 'You pull the blanket over your ears and try to sleep.'), { theme: 'work' }),
  M('m_middle_hospital_visit', AGE.GROWN, fneed(MD, 0),
    '[Thăm bệnh viện] Một Sibling nằm bệnh viện đã hai tuần và chưa ai trong tổ đến thăm vì bận. Big Sibling nhắc một câu bâng quơ: có những phòng bệnh sáng hơn khi có người ngồi trong đó.',
    '[Hospital visit] A Sibling has lain in hospital two weeks and none of the team has visited for being busy. The Big Sibling remarks idly that some hospital rooms are brighter when someone sits in them.',
    [C('Đến thăm, mang theo một ít trái cây', 'Visit, bringing some fruit', 'Người bệnh ngạc nhiên rồi cười, và hai người nói chuyện về những thứ vặt vãnh trong ba giờ. Khi ra về, bạn thấy y tá nhìn bạn với vẻ biết ơn.', 'The patient is surprised then smiles, and you two talk of trivial things for three hours. As you leave, the nurse looks at you gratefully.', { sanity: 4, network: 6, wealth: -2 }), C('Gửi quà qua một người khác', 'Send a gift through someone else', 'Món quà đến, và người bệnh gửi lại lời cảm ơn qua người đưa tin. Cả hai đều biết đó không phải điều bạn nên làm, nhưng không ai nhắc.', 'The gift arrives, and the patient sends thanks back through the messenger. Both know it is not what you should have done, but neither mentions it.', { sanity: -1, network: 1, wealth: -2 })],
    I('Bạn nói bạn sẽ ghé vào tuần sau.', 'You say you will drop by next week.'), { theme: 'work' }),
  M('m_middle_wrong_tea', AGE.GROWN, fneed(MD, 0),
    '[Trà pha sai] Ở trụ sở Middle, một Little Sibling pha trà cho cả tổ và pha sai tỉ lệ nên đắng ngắt. Không ai nói gì, mọi người uống hết, và cậu ta nhìn từng người một với vẻ lo lắng. Đến lượt bạn, cậu ta ngừng thở.',
    '[Wrongly brewed tea] At the Middle’s hall a Little Sibling brews tea for the team and gets the ratio wrong, so it comes out bitter. No one says anything, everyone drinks it through, and the youngster watches each in turn anxiously. When your turn comes, they stop breathing.',
    [C('Uống cạn và khen ngon', 'Drain it and praise it', 'Cậu ta cười rạng rỡ và lần sau pha lại đúng tỉ lệ ấy một cách có ý thức. Bạn uống thêm ba cốc đắng nữa trong tuần đó,.', 'He beams and brews it at that same ratio on purpose next time. You drink three more bitter cups that week and say nothing.', { sanity: 2, network: 5 }), C('Nhẹ nhàng chỉ cho cậu cách pha đúng', 'Gently show him how to brew it right', 'Cậu ta chăm chú nghe, rồi pha lần nữa. Lần này vị trà vừa phải, và cả tổ nhìn bạn với vẻ biết ơn thầm lặng.', 'He listens closely, then brews again. This time the tea is just right, and the whole team looks at you with quiet gratitude.', { sanity: 3, network: 4, rep: 1 })],
    I('Bạn uống hết rồi đặt cốc xuống.', 'You finish and set the cup down.'), { theme: 'work' }),
  M('m_middle_old_promise', AGE.GROWN, fneed(MD, 1),
    '[Lời hứa cũ] Một Sibling già nhắc bạn về lời hứa bạn đã quên: cách đây tám năm, bạn nói sẽ giúp ông sơn lại mái nhà trước mùa đông. Mái nhà đã dột từ lâu. Ông không trách, chỉ hỏi thẳng liệu bạn còn nhớ hay không.',
    '[An old promise] An elder Sibling reminds you of a promise you forgot: eight years ago you said you would help repaint his roof before winter. The roof has leaked a long while. He does not blame, only asks plainly if you still remember.',
    [C('Nhận lỗi và đến sơn ngay cuối tuần', 'Admit the lapse and come to paint this weekend', 'Hai ngày liền bạn trèo mái nhà với người già đứng dưới đưa sơn. Ông kể chuyện cũ không ngừng, và bạn nhận ra mình đã nợ ông nhiều hơn chỉ một mái nhà.', 'Two days running you climb the roof with the old man below passing paint. He tells old stories without pause, and you realize you owed him more than just a roof.', { sanity: 3, network: 6, health: -2 }), C('Nói thật rằng bạn đã quên và xin lỗi', 'Say honestly you forgot and apologize', 'Ông cười hiền và nói chính ông cũng quên mất vài lời hứa của mình. Nhưng bạn thấy ông vẫn nhìn lên mái nhà mỗi khi đi qua sân.', 'He smiles mildly and says he too has forgotten some promises of his own. But you notice he still glances at the roof every time he crosses the yard.', { sanity: -2, network: 2 })],
    I('Bạn hứa lại một lần nữa và quên tiếp.', 'You promise again and forget again.'), { theme: 'work' }),
  M('m_middle_lost_button', AGE.GROWN, fneed(MD, 0),
    '[Chiếc cúc của người khác] Bạn nhặt được một chiếc cúc áo bằng sừng ở sàn nhà trụ sở. Nó thuộc về áo khoác của Big Sibling, nhưng bà đã đổi áo mới từ ba năm trước. Bạn hỏi và biết đó là cúc áo của người con trai bà, người đã mất.',
    '[Someone else’s button] You find a horn button on the floor of the Middle’s hall. It belongs to the Big Sibling’s old coat, but they changed coats three years ago. You ask and learn it is the button from their child’s coat, the child who died.',
    [C('Trả lại tận tay Big Sibling', 'Return it into the Big Sibling’s hand', 'Big Sibling nhận chiếc cúc, khép bàn tay lại, và không nói lời nào trong hồi lâu. Rồi ông bảo bạn rót hai cốc trà. Cả hai ngồi im lặng đến khi trời tối.', 'The Big Sibling takes the button, closes a hand around it, and says nothing for a very long time. Then asks you to pour two cups of tea. You sit silent together until dark.', { sanity: 4, network: 7, rep: 3 }), C('Đặt nó lên bàn và rời đi', 'Set it on the table and leave', 'Hôm sau chiếc cúc đã biến mất, và Big Sibling gật đầu với bạn mà không nói gì. Cái cúi đầu ấy ấm hơn lời cảm ơn nào.', 'The next day the button is gone, and the Big Sibling nods at you wordlessly. That nod is warmer than any thanks.', { sanity: 2, network: 4 })],
    I('Bạn bỏ chiếc cúc vào túi và quên nó.', 'You pocket the button and forget it.'), { theme: 'work' }),
  M('m_middle_rooftop_drying', AGE.GROWN, fneed(MD, 0),
    '[Sân thượng phơi đồ] Cả tổ cùng phơi quần áo trên sân thượng một chiều nắng. Mỗi người mang đồ ra, và đến lúc thu thì không ai nhận ra đồ nào của mình. Bạn mặc đồ của một người khác về nhà, và người khác mặc đồ của bạn.',
    '[Drying clothes on the roof] The whole team hangs washing on the roof one sunny afternoon. Each brings their own, and by collection time no one can tell which is whose. You go home in someone else’s clothes, and someone wears yours.',
    [C('Giữ đồ của người kia mặc tới khi giặt', 'Keep wearing theirs until laundry day', 'Áo ấy hơi rộng, mùi xà phòng lạ. Ba ngày sau người kia mang trả đồ của bạn, và hai người cười rất lâu trước cả tổ.', 'The shirt is a little loose with an unfamiliar soap smell. Three days later the other returns yours, and you both laugh a long while before the team.', { sanity: 3, network: 4 }), C('Đi đổi lại ngay chiều hôm đó', 'Swap back that same evening', 'Cả hai đứng ở cầu thang trao nhau đồ, hơi ngượng ngùng. Người kia nói áo bạn vừa như may cho họ, và bạn không biết nên đáp thế nào.', 'You stand on the stair handing each other clothes, a bit awkward. The other says yours fit as if tailored for them, and you are not sure how to reply.', { sanity: 1, network: 3 })],
    I('Bạn lấy đại một bộ và đi về.', 'You grab a set at random and go home.'), { theme: 'work' }),
  M('m_middle_new_baby', AGE.GROWN, fneed(MD, 0),
    '[Em bé mới sinh trong tổ] Một Sibling trong tổ vừa sinh con, và Big Sibling gửi một tờ giấy quyên góp đến từng người. Bạn không thấy tờ nào ghi số tiền tối thiểu. Chỉ có một dòng: Mỗi người đưa điều mình đưa được.',
    '[A newborn in the team] A Sibling on the team has had a baby, and the Big Sibling circulates a collection sheet. You see no minimum on any line. Only: Each gives what they can.',
    [C('Góp một khoản lớn hơn dự định', 'Give more than you planned', 'Bạn đặt phong bì vào chiếc giỏ mà không nhìn số. Hôm sau bạn thấy cha mẹ đứa bé nhìn bạn và nhẹ nhàng cúi đầu. Bạn không kể với ai.', 'You drop the envelope in the basket without glancing at the sum. The next day you see the baby’s parents look at you and bow gently. You tell no one.', { wealth: -8, sanity: 4, network: 6, rep: 2 }), C('Góp một khoản nhỏ, đủ lễ', 'Give a small, respectable sum', 'Số tiền đủ để không bị chú ý. Bạn đến thăm đứa bé một lần, bế nó nửa phút, và cảm thấy bàn tay mình lúng túng một cách lạ.', 'The sum is enough not to be noticed. You visit the baby once, hold it for half a minute, and feel your hands oddly awkward.', { wealth: -3, sanity: 2, network: 3 })],
    I('Bạn ghi tên vào tờ giấy và chuyển cho người kế tiếp.', 'You write your name on the sheet and pass it on.'), { theme: 'work' }),
  M('m_middle_stranger_in_chair', AGE.GROWN, fneed(MD, 1),
    '[Người lạ ngồi ghế Big Sibling] Một người lạ ngồi vào chiếc ghế của Big Sibling trong sảnh khi không có ai ở đó, rồi bắt đầu uống trà. Cả tổ nhìn bạn, vì bạn là người đứng gần nhất. Người ấy mỉm cười mà không nói tên.',
    '[A stranger in the Big Sibling’s chair] A stranger sits in the Big Sibling’s chair in the hall when no one else is there and starts drinking tea. The whole team looks at you, as you are standing closest. The stranger smiles without giving a name.',
    [C('Mời họ ra ngoài, nhẹ giọng', 'Ask them out, gently', 'Người ấy đứng dậy rất chậm, nói đó là một thói quen từ hồi họ còn nhỏ và đây từng là nhà họ. Bạn nhìn quanh sảnh và nhận ra rằng lâu nay chưa ai hỏi ai từng ở đây trước.', 'The stranger stands very slowly and says it is an old habit, that this used to be their home. You glance around the hall and realize no one ever asked who lived here before.', { sanity: -2, network: 3, rep: 1 }), C('Rót thêm trà cho họ và ngồi xuống cạnh', 'Pour them more tea and sit beside them', 'Hai người nói chuyện suốt một buổi chiều. Khi Big Sibling về, người lạ đã đi, và chiếc ghế nguyên chỗ cũ, nhưng ly trà vẫn còn ấm.', 'You talk through the afternoon. When the Big Sibling returns, the stranger is gone, and the chair is back in place, but the cup of tea is still warm.', { sanity: 3, network: 4 })],
    I('Bạn gọi người ở cổng vào xử lý.', 'You call the gate keeper to handle it.'), { theme: 'work' }),
  M('m_middle_sibling_wedding', AGE.GROWN, fneed(MD, 0),
    '[Đám cưới trong nhà] Hai Sibling cưới nhau, và cả hội gấp rút chuẩn bị. Bạn được giao việc bày bàn, nên tối trước đó bạn đếm từng cái bát, từng đôi đũa không giống nhau. Không có hai bộ nào trùng, và đó là điều Big Sibling muốn.',
    '[A wedding in the family] Two Siblings marry, and the whole team scrambles to prepare. You are assigned to set the tables, so the night before you count each mismatched bowl and pair of chopsticks. No two sets match, which is exactly what the Big Sibling wants.',
    [C('Đặt bát sao cho mỗi người có chỗ riêng', 'Arrange the bowls so each guest has a place of their own', 'Bạn xếp từng cái bát theo cách đoán người nào hợp cái nào. Đám cưới diễn ra, và nhiều khách nhìn chiếc bát trước mặt mình với vẻ như được nhận ra.', 'You arrange each bowl guessing who suits which. The wedding goes ahead, and many guests regard the bowl before them as if recognized.', { sanity: 3, network: 5, rep: 2 }), C('Xếp ngẫu nhiên, để ai muốn lấy gì thì lấy', 'Place them at random and let people take what they like', 'Bữa tiệc ồn ào và lộn xộn hơn, nhưng cô dâu chú rể bảo đó đúng là điều họ mong muốn. Bạn không phải chọn ai cả.', 'The feast is noisier and messier, but the couple says it is exactly what they wanted.', { sanity: 2, network: 4 })],
    I('Bạn bày bàn xong và đứng ra góc nhìn.', 'You finish setting the tables and stand in a corner watching.'), { theme: 'work' }),
  M('m_middle_street_sweeper', AGE.GROWN, fneed(MD, 0),
    '[Người quét đường] Một người quét đường già luôn chào bạn mỗi sáng, và hôm nay bạn nhận ra ông là một Sibling từng bị gạch tên khỏi Book nhiều năm trước. Ông không nói gì về việc đó, chỉ đưa bạn một ổ bánh mì nóng.',
    '[The street sweeper] An old street sweeper greets you each morning, and today you realize he is a Sibling who was struck from the Book many years ago. He says nothing of it, only hands you a hot loaf of bread.',
    [C('Nhận bánh mì và ngồi cạnh ông ăn', 'Take the bread and sit beside him to eat', 'Hai người ngồi trên một bậc thềm trước tiệm thuốc, ăn mà không nói chuyện. Khi xong, ông tiếp tục quét, và bạn đi làm, nhẹ hơn một chút.', 'The two of you sit on a step before the pharmacy and eat without talking. When done, he resumes sweeping, and you go to work, a little lighter.', { sanity: 4, network: 4 }), C('Nhận bánh và đưa lại vài đồng xu', 'Accept the bread and pass back a few coins', 'Ông không nhận tiền, và đặt lại những đồng xu vào lòng bàn tay bạn. Bạn bỏ vào túi, thấy chúng nặng hơn dự đoán.', 'He will not take the coins and places them back in your palm. You pocket them, finding them heavier than expected.', { sanity: 2, network: 3 })],
    I('Bạn cảm ơn và bước tiếp.', 'You thank him and walk on.'), { theme: 'work' }),
  M('m_middle_unsent_letter', AGE.GROWN, fneed(MD, 1),
    '[Lá thư chưa gửi] Trong ngăn kéo của Big Sibling cũ, bạn tìm thấy một lá thư chưa gửi gửi cho một người ở xa. Người ấy đã mất hơn mười năm. Nội dung chỉ có một câu: Tôi luôn nhớ bữa cơm đó.',
    '[The unsent letter] In the old Big Sibling’s drawer you find an unsent letter addressed to someone far away. That person has been dead over ten years. The content is one sentence: I always remember that meal.',
    [C('Đọc lại cho đến thuộc lòng', 'Read it until you know it by heart', 'Bạn không biết bữa cơm ấy là bữa nào, nhưng cái câu đó cứ vang trong đầu bạn mỗi khi ngồi vào mâm.', 'You do not know which meal it was, but the sentence echoes in your head each time you sit at a table.', { sanity: -2, network: 2 }), C('Mang lá thư đến mộ người nhận', 'Take the letter to the recipient’s grave', 'Bạn đặt lá thư trên mộ và đứng đó một lúc. Gió lật phong bì, và bạn không nhặt lên. Nó nằm ở đó cho đến mùa mưa.', 'You lay the letter on the grave and stand a long while. Wind turns the envelope, and you do not pick it up. It lies there until the rainy season.', { sanity: 3, network: 3 })],
    I('Bạn đóng ngăn kéo và quên lá thư.', 'You close the drawer and forget the letter.'), { theme: 'work' }),
  M('m_middle_rooftop_pigeons', AGE.GROWN, fneed(MD, 0),
    '[Chuồng bồ câu trên mái] Cả tổ nuôi chung một chuồng bồ câu trên mái nhà, và hôm nay một con bay đi không về. Một Little Sibling gần như khóc. Big Sibling nhìn bạn và hỏi liệu bạn có thể lên xem có con nào lạc ở các mái bên không.',
    '[The rooftop dovecote] The whole team keeps a shared dovecote on the roof, and today a pigeon flew away and has not returned. A Little Sibling nearly weeps. The Big Sibling looks at you and asks if you could go up and look on neighboring roofs for strays.',
    [C('Leo lên các mái bên tìm', 'Climb the neighboring roofs to look', 'Bạn tìm thấy con chim đậu cạnh ống khói của một xưởng dệt, run vì lạnh. Bạn ủ nó trong áo và mang về, và cậu bé Sibling ôm nó rất lâu.', 'You find the bird perched by a textile mill chimney, shivering with cold. You tuck it inside your coat and carry it home, and the young Sibling holds it a long time.', { sanity: 4, network: 5, health: -2 }), C('Nói con chim sẽ tự về nếu muốn', 'Say the bird will return on its own if it wants to', 'Cậu bé không nói gì, và mỗi sáng sau đó ngồi ở mép mái đợi. Đến ngày thứ ba con chim về, và cậu quay sang nhìn bạn với vẻ khó đoán.', 'The child says nothing, and each morning afterward sits at the roof’s edge waiting. On the third day the bird returns, and the child turns to you with an unreadable look.', { sanity: 1, network: 2 })],
    I('Bạn nhìn lên trời một lúc rồi quay xuống.', 'You look up at the sky a moment then turn back down.'), { theme: 'work' }),
  M('m_middle_greedy_neighbor', AGE.GROWN, fneed(MD, 1),
    '[Người hàng xóm tham lam] Người hàng xóm của một Sibling trong tổ lén dời hàng rào sang đất của họ mỗi đêm một chút, và đã đi được ba bước. Cả khu biết, và không ai nói. Big Sibling hỏi bạn xem nên ghi vào Book hay chỉ nên nói chuyện.',
    '[The greedy neighbor] A Sibling’s neighbor quietly shifts the fence onto their land a little each night and has already gained three steps. The whole district knows and no one speaks. The Big Sibling asks whether to write it in the Book or just talk.',
    [C('Nói chuyện trước, mời người ấy uống trà', 'Talk first and invite the neighbor to tea', 'Người hàng xóm ngượng và đưa hàng rào về lại vị trí cũ trong hai ngày. Hóa ra ông chỉ muốn có ai đó để ý đến mình.', 'The neighbor is embarrassed and moves the fence back in two days. It turns out he only wanted someone to notice him.', { sanity: 3, network: 5, rep: 2 }), C('Ghi tên vào Book, theo lệ', 'Write the name in the Book as custom allows', 'Hàng rào được dời lại ngay đêm đó, và ba tháng sau người hàng xóm dọn đi không nói lời chào. Cả khu im lặng như nhau.', 'The fence is moved back that very night, and three months later the neighbor moves away without a farewell. The whole district is equally silent.', { sanity: -2, rep: 2, network: -3 }, { flagsAdd: ['middle_vengeful'] })],
    I('Bạn nói tùy Big Sibling quyết.', 'You say it is for the Big Sibling to decide.'), { theme: 'work' }),
  M('m_middle_school_fees', AGE.GROWN, fneed(MD, 1),
    '[Tiền học của một đứa nhỏ] Một đứa trẻ trong khu của Middle thi đỗ vào trường tốt, nhưng nhà không đủ tiền đóng học phí. Big Sibling thông báo trong buổi họp. Không ai hứa gì, nhưng bạn thấy cả tổ nhìn xuống tay mình.',
    '[A child’s tuition] A child in the Middle’s district passes into a good school, but the family cannot afford the fees. The Big Sibling announces it at the meeting. No one promises anything, but you see the whole team look down at their hands.',
    [C('Nhận trả nửa học phí năm đầu', 'Offer to pay half the first year’s fees', 'Hai người khác cũng nhận nửa còn lại, và học phí đủ chỉ sau năm phút. Đứa trẻ không biết ai trả, và Big Sibling dặn không được nói.', 'Two others take up the other half, and the fee is covered in five minutes. The child never learns who paid, and the Big Sibling warns that none may tell.', { wealth: -9, sanity: 4, network: 6, rep: 3 }), C('Giới thiệu đứa trẻ cho một người quen ở trường', 'Introduce the child to an acquaintance at the school', 'Người quen giúp xin học bổng nhỏ. Không đủ cho cả học phí, nhưng cũng đủ để cả khu thở phào.', 'The acquaintance helps secure a small scholarship. It does not cover everything but is enough for the whole district to exhale.', { network: 5, sanity: 2, rep: 2 })],
    I('Bạn nghe và không nói gì, như mọi người.', 'You listen and say nothing, like everyone.'), { theme: 'work' }),
  M('m_middle_clinic_queue', AGE.GROWN, fneed(MD, 0),
    '[Hàng chờ ở phòng khám] Phòng khám nhỏ của Middle có hàng người dài từ sáng, và một bà lão đứng giữa hàng lảo đảo. Bạn đứng phía sau cô ấy, và nhận ra bà đã chờ ba tiếng. Cả hàng không ai nhường chỗ vì ai cũng ốm.',
    '[Queue at the clinic] The Middle’s small clinic has a long line from morning, and an old woman sways in the middle. You stand behind her and realize she has waited three hours. No one in the queue offers their place because everyone is ill.',
    [C('Nhường chỗ của mình cho bà', 'Give up your place to her', 'Bà nhìn bạn và nói cám ơn bằng một giọng rất nhỏ. Bạn đứng ở cuối hàng thêm hai giờ, và không cảm thấy mình đã mất điều gì.', 'She looks at you and says thank you softly. You stand at the back of the line two more hours, and do not feel you lost anything.', { health: -2, sanity: 3, network: 4 }), C('Đỡ bà vào trong xin y tá cho khám trước', 'Support her inside and ask the nurse to see her first', 'Y tá gật đầu ngay, và cả hàng không ai phản đối. Bà ngồi xuống ghế bác sĩ và nhìn bạn một cái, rất ngắn, khiến bạn thấy lòng mình ấm lên.', 'The nurse nods at once, and no one in the queue objects. She sits in the doctor’s chair and glances at you very briefly, warming something in you.', { sanity: 3, network: 5, rep: 2 })],
    I('Bạn đứng đợi như mọi người.', 'You wait like everyone else.'), { theme: 'work' }),
  M('m_middle_street_fight', AGE.GROWN, fneed(MD, 0),
    '[Ẩu đả ở đầu phố] Hai người say rượu đấm nhau ở đầu phố nơi Middle bảo vệ. Một đám đông tụ lại xem.',
    '[A fight at the street end] Two drunks trade blows at the head of a street the Middle protects. A crowd gathers to watch. You recognize one as a Sibling, the other a stranger, and both are bleeding.',
    [C('Lao vào tách hai người ra', 'Step in and part them', 'Bạn nhận một cú đấm vào vai nhưng tách được họ. Người Sibling xấu hổ cúi đầu, và người lạ rút đi. Đám đông tản dần, và bạn thấy một đứa trẻ nhìn bạn với vẻ ngưỡng mộ.', 'You take a punch to the shoulder but separate them. The Sibling lowers their head in shame, and the stranger retreats. The crowd disperses, and you notice a child gazing at you with admiration.', { health: -4, rep: 4, network: 3 }), C('Gọi người của tổ đến xử lý', 'Call the team’s people to deal with it', 'Cả hai được đưa về trụ sở và ngủ lại một đêm cho tỉnh. Sáng hôm sau họ bắt tay nhau mà không nhớ vì sao đánh nhau.', 'Both are brought to the hall and sleep off the night. In the morning they shake hands, not recalling why they fought.', { sanity: 1, network: 3 })],
    I('Bạn đi vòng qua đám đông và tiếp tục việc của mình.', 'You skirt the crowd and carry on with your business.'), { theme: 'work' }),
  M('m_middle_birth_certificate', AGE.GROWN, fneed(MD, 1),
    '[Giấy khai sinh của đứa trẻ không tên] Một đứa trẻ trong khu Middle được sinh ra không có giấy khai sinh vì cha mẹ là người nhập cư không giấy tờ. Big Sibling hỏi bạn có người quen ở cơ quan nào có thể giúp không, và biết trước câu trả lời nặng nề.',
    '[A child with no certificate] A child in the Middle’s district was born without a birth certificate because the parents are undocumented migrants. The Big Sibling asks if you know anyone at an office who could help, knowing the answer will be heavy.',
    [C('Nhờ một người quen, trả giá bằng một ân huệ', 'Ask an acquaintance and pay with a favor', 'Giấy tờ đến sau hai tháng. Người quen nhắc bạn rằng ân huệ ấy sẽ được đòi lại, và bạn gật đầu, biết đây không phải lần cuối.', 'The papers arrive after two months. The acquaintance reminds you the favor will be called in, and you nod, knowing it will not be the last time.', { wealth: -4, sanity: 3, network: 4, rep: 3 }), C('Nói bạn không thể, rồi giới thiệu một người khác', 'Say you cannot, then refer someone else', 'Người khác giúp được một phần. Đứa trẻ có giấy tờ tạm, đủ để đi học, và Big Sibling cám ơn bạn một cách hờ hững.', 'The other helps partly. The child gets temporary papers, enough for school, and the Big Sibling thanks you in an offhand way.', { sanity: -2, network: 2 })],
    I('Bạn nói bạn sẽ xem xét.', 'You say you will look into it.'), { theme: 'work' }),
  M('m_middle_family_photo', AGE.GROWN, fneed(MD, 0),
    '[Ảnh gia đình] Một thợ ảnh lưu động đến khu Middle, và cả tổ xếp hàng chụp một tấm ảnh chung. Bạn đứng ở hàng sau, một người không rõ ai đưa tay lên vai bạn. Khi ảnh được rửa ra, bạn thấy mình đang cười, một nụ cười bạn không nhớ.',
    '[Family photograph] A traveling photographer comes to the Middle’s district, and the whole team lines up for a group portrait. You stand in the back row, someone unseen rests a hand on your shoulder. When the print is developed, you see yourself smiling, a smile you do not remember.',
    [C('Giữ một bản ảnh trong ví', 'Keep a copy in your wallet', 'Mỗi lần mở ví bạn thấy khuôn mặt ấy, và dần dần nhớ ra khoảnh khắc đó. Đó là lúc có ai đó kể một câu chuyện vui, và cả tổ đã bật cười cùng lúc.', 'Each time you open your wallet you see that face, and gradually remember the moment. Someone told a funny story and the whole team had laughed together.', { sanity: 4, network: 4 }), C('Tặng bản của mình cho một người trẻ trong tổ', 'Give your copy to a younger member', 'Cậu bé nhận ảnh bằng cả hai tay và nhìn chằm chằm. Hôm sau bạn thấy nó treo bên giường cậu, cạnh tấm ảnh của cha mẹ đã mất.', 'The youngster takes the photo with both hands and stares. The next day you see it hung by his bed beside the photo of his dead parents.', { sanity: 3, network: 5 })],
    I('Bạn nhìn tấm ảnh một lúc rồi cất đi.', 'You look at the photograph a moment then put it away.'), { theme: 'work' }),
  M('m_middle_night_visit', AGE.GROWN, fneed(MD, 1),
    '[Khách đêm] Ba giờ sáng, có người gõ cửa nhà bạn. Một Sibling, mắt đỏ hoe, nói không biết đi đâu. Không có chuyện gì cụ thể, chỉ là anh ta thấy mình sắp làm điều gì đó mà anh ta sẽ hối hận. Bạn mời anh ta vào.',
    '[A night visitor] At three in the morning someone knocks at your door. A Sibling, red-eyed, says they do not know where else to go. Nothing specific, only that they feel they are about to do something they will regret. You invite them in.',
    [C('Ngồi nghe suốt đêm, không khuyên gì', 'Sit and listen all night, giving no advice', 'Đến sáng, anh ta ngủ gục trên ghế, và bạn đắp cho anh một cái chăn. Khi tỉnh dậy, anh nói thấy mình lại thở được. Bạn không cần biết anh đã định làm gì.', 'By morning they have fallen asleep in the chair, and you cover them with a blanket. When they wake they say they can breathe again.', { sanity: -2, network: 7, rep: 3 }), C('Dẫn anh ta đến gặp Big Sibling ngay trong đêm', 'Take them to the Big Sibling right then', 'Big Sibling mở cửa trong bộ đồ ngủ, không hỏi gì và đặt ấm nước lên bếp. Bạn đứng nhìn từ cửa, biết rằng đêm nay anh ta không còn một mình.', 'The Big Sibling opens the door in pajamas, asks nothing, and puts the kettle on. You stand in the doorway watching, knowing they are no longer alone tonight.', { sanity: 2, network: 6, rep: 2 })],
    I('Bạn bảo anh ta quay lại vào sáng mai.', 'You tell them to come back in the morning.'), { theme: 'work' }),
  M('m_middle_neighbors_dog', AGE.GROWN, fneed(MD, 0),
    '[Con chó của hàng xóm] Con chó của một người hàng xóm già bị lạc, và cả khu đi tìm. Bạn tìm thấy nó nằm cạnh một cột đèn, bị thương một chân. Khi mang nó về, người hàng xóm khóc, và bạn nhận ra đó là người bạn quen nhất ở đây mà chưa bao giờ nói chuyện.',
    '[The neighbor’s dog] An old neighbor’s dog goes missing, and the whole district searches. You find it lying by a lamp post, a leg injured. When you carry it back, the neighbor weeps, and you realize it is the person you know best here without ever having spoken.',
    [C('Ở lại giúp băng chân cho con chó', 'Stay to help bandage the dog’s leg', 'Hai người cùng quỳ cạnh con chó, và nó liếm tay cả hai.', 'The two of you kneel together beside the dog, and it licks both your hands.', { sanity: 4, network: 5 }), C('Giao con chó rồi đi', 'Hand over the dog and leave', 'Người hàng xóm gọi theo bạn, nhưng bạn đã đi đến góc phố. Hôm sau trước cửa nhà bạn có một chiếc bánh nhỏ, kèm một mảnh giấy ghi một chữ cảm ơn.', 'The neighbor calls after you, but you are already at the corner. The next day at your door is a small cake with a slip bearing one word of thanks.', { sanity: 1, network: 3 })],
    I('Bạn bế con chó về, đặt nó trước cửa nhà ông ta, rồi đi.', 'You carry the dog back, set it at his door, and go.'), { theme: 'work' }),
  M('m_middle_empty_chair_vigil', AGE.GROWN, fneed(MD, 2),
    '[Ghế trống trong buổi họp] Trong buổi họp tháng, Great Elder luôn để một chiếc ghế trống ở đầu bàn, vì người từng ngồi đó đã mất từ nhiều năm. Hôm nay ông ra hiệu cho bạn ngồi vào ghế ấy một lúc, để thử xem nó hợp với ai.',
    '[The empty chair in the meeting] In the monthly meeting, the Great Elder always leaves one chair empty at the head of the table, because the one who sat there died years ago. Today they gesture for you to sit in it a moment, to see whom it suits.',
    [C('Ngồi xuống ghế một phút', 'Sit in the chair for a minute', 'Chiếc ghế hơi thấp và rất cũ. Bạn thấy cả bàn nhìn mình một cách khác. Sau một phút, Great Elder cúi đầu, và bạn đứng dậy trả ghế lại, không nói lời nào.', 'The chair is a bit low and very old. You see the whole table look at you differently. After a minute the Great Elder nods, and you rise and return the chair without a word.', { sanity: -3, rep: 5, network: 5 }), C('Từ chối, nói ghế này không phải của bạn', 'Decline, saying this chair is not yours', 'Great Elder gật đầu chậm, như đã chờ câu ấy. Cả bàn cùng thở ra, và bạn nhận ra mình vừa vượt qua một bài kiểm tra mà không biết nó tồn tại.', 'The Great Elder nods very slowly, as if awaiting that answer. The whole table exhales, and you realize you have just passed a test you did not know existed.', { sanity: 2, rep: 5, network: 3 })],
    I('Bạn đứng yên và chờ họ chuyển sang việc khác.', 'You stand still and wait for them to move to other business.'), { theme: 'work' }),
  M('m_middle_young_grievance', AGE.GROWN, fneed(MD, 1),
    '[Lời than của người trẻ] Một Little Sibling đến tìm bạn, tay cầm cây bút và Book of Vengeance mượn từ phòng của Big Sibling. Cậu muốn ghi tên một người từng thân với cậu, vì người ấy đã nói xấu cậu. Cậu run lẩy bẩy, và hỏi bạn có đáng không.',
    '[A young grievance] A Little Sibling comes to you, holding a pen and the Book of Vengeance borrowed from the Big Sibling’s room. They want to write the name of a former friend for speaking ill of them. They tremble and ask whether it is worth it.',
    [C('Đặt cuốn Book xuống và nói chuyện với cậu', 'Set the Book down and talk to them', 'Cậu bé khóc vì cảm giác bị phản bội. Bạn không khuyên gì, chỉ nghe. Cuối buổi cậu mang cuốn Book trả lại, và cây bút vẫn còn nắp.', 'The youngster weeps from the sting of betrayal. You advise nothing, only listen. By the end they return the Book, the pen still capped.', { sanity: 2, network: 6, rep: 2 }, { flagsAdd: ['middle_forgiving'] }), C('Nói đó là quyền của cậu, và để cậu quyết', 'Say it is their right, and let them decide', 'Cậu bé nhìn bạn một lúc lâu, rồi viết tên ấy xuống. Bạn không nhìn, nhưng nghe tiếng ngòi bút, và không biết nên cảm thấy gì.', 'The youngster stares at you a long while, then writes the name.', { sanity: -4, network: -1 }, { flagsAdd: ['middle_vengeful'] })],
    I('Bạn bảo cậu đi hỏi Big Sibling.', 'You tell them to go ask the Big Sibling.'), { theme: 'work' })
];

export const MIDDLE_DAILIES = [
  D('d_middle_bowl_sound', AGE.GROWN, fneed(MD, 0), 'Tiếng bát đũa ở trụ sở Middle không bao giờ giống nhau. Bạn nghe được từ ngoài hành lang và biết ngay hôm nay ai ăn ở trong.', 'The clatter of bowls and chopsticks at the Middle’s hall never sounds the same. From the corridor you can tell who is eating inside today.', {}),
  D('d_middle_scribble_margin', AGE.GROWN, fneed(MD, 0), 'Ở lề một trang Book of Vengeance có hình một con mèo con vẽ bằng bút chì, không ai nhận đã vẽ. Cả tổ giữ nó nguyên đó từ lâu.', 'In the margin of a page in the Book of Vengeance is a kitten drawn in pencil, no one claiming to have drawn it. The whole team has left it untouched for years.', {}),
  D('d_middle_warm_bench', AGE.GROWN, fneed(MD, 0), 'Băng ghế ngoài trụ sở luôn ấm dù trời lạnh. Có ai đó ngồi ở đó trước bạn mỗi sáng, và bạn chưa bao giờ bắt gặp họ.', 'The bench outside the hall is always warm though the weather is cold. Someone sits there before you each morning, and you have never caught them.', {}),
  D('d_middle_borrowed_pen', AGE.GROWN, fneed(MD, 0), 'Một Little Sibling mượn cây bút của bạn và trả lại với một giọt mực mới ở đầu, như thể nó đã được dùng để viết một việc quan trọng.', 'A Little Sibling borrows your pen and returns it with a fresh drop of ink at the tip, as if used for something important.', {}),
  D('d_middle_kettle_whistle', AGE.GROWN, fneed(MD, 0), 'Ấm nước ở bếp tổ reo lúc năm giờ chiều mỗi ngày. Cả tổ ngưng việc và tụ lại, không ai ra lệnh.', 'The kettle in the team kitchen whistles at five each afternoon. The whole team stops work and gathers, though no one gives an order.', {}),
  D('d_middle_rain_gutter', AGE.GROWN, fneed(MD, 0), 'Máng nước trên mái trụ sở chảy xuống thành hai dòng, và mỗi dòng rơi vào một cái chậu đặt sẵn. Có người đã sắp chúng từ lâu, không ai nhớ ai.', 'The roof gutter at the hall splits into two streams, each falling into a basin set ready. Someone arranged them long ago, no one recalls who.', {}),
  D('d_middle_sleeping_cat', AGE.GROWN, fneed(MD, 0), 'Con mèo ngủ trên đống sổ sách của Big Sibling lại ở đó hôm nay. Không ai nỡ đuổi, và việc ghi chép bị hoãn đến chiều.', 'The cat asleep on the Big Sibling’s stack of ledgers is there again today. No one has the heart to chase it off, and the entries are postponed until afternoon.', {}),
  D('d_middle_old_coat_hook', AGE.GROWN, fneed(MD, 0), 'Móc áo cuối hành lang luôn treo một chiếc áo mưa cũ của một người đã mất. Không ai dám lấy xuống, và mỗi lần mưa, nó nhỏ giọt như vẫn có người mặc.', 'The coat hook at the corridor’s end always holds an old raincoat belonging to someone dead. No one dares take it down, and each rain it drips as if still worn.', {}),
  D('d_middle_stair_creak', AGE.GROWN, fneed(MD, 0), 'Cầu thang lên phòng họp kêu một tiếng riêng ở bậc thứ chín. Bạn đã quen đến mức đếm nó như một nhịp tim.', 'The stairs up to the meeting room creak one distinct way on the ninth step. You have grown so used to it that you count it like a heartbeat.', {}),
  D('d_middle_candy_tin', AGE.GROWN, fneed(MD, 0), 'Hộp kẹo trên bàn Big Sibling luôn đầy, dù không ai thấy ông mua. Bạn lấy một viên và thấy dưới đáy hộp có một mảnh giấy ghi tên mọi người.', 'The candy tin on the Big Sibling’s desk is always full, though no one sees them buy it. You take one and notice a slip under the bottom listing everyone’s name.', {}),
  D('d_middle_hand_on_shoulder', AGE.GROWN, fneed(MD, 0), 'Ai đó đặt tay lên vai bạn khi bạn đi qua hành lang, rồi nhấc đi ngay. Khi bạn quay lại, không có ai ở đó, nhưng bạn thấy nhẹ hơn một chút.', 'Someone rests a hand on your shoulder as you pass in the corridor, then lifts it at once. When you turn, no one is there, but you feel a little lighter.', {}),
  D('d_middle_name_tag', AGE.GROWN, fneed(MD, 0), 'Tên bạn được viết trên một mảnh vải khâu vào mép chiếc chăn chung ở nhà tập thể. Bạn không nhớ ai khâu, và nét chỉ rất đều.', 'Your name is written on a patch sewn to the edge of the communal blanket in the dormitory.', {}),
  D('d_middle_night_lantern', AGE.GROWN, fneed(MD, 0), 'Một chiếc đèn lồng nhỏ luôn được treo trước cửa trụ sở vào ban đêm, dù không ai nhớ đã thắp. Nó cháy suốt đêm, và tắt đúng lúc bạn đến.', 'A small lantern is always hung outside the hall at night, though no one recalls lighting it. It burns all night and goes out just as you arrive.', {}),
  D('d_middle_shared_umbrella', AGE.GROWN, fneed(MD, 0), 'Một Little Sibling chia sẻ chiếc ô với bạn dưới mưa mà không hỏi. Hai người cùng ướt một bên vai và không ai nói gì.', 'A Little Sibling shares an umbrella with you in the rain without asking. Both get wet on one shoulder and neither says a word.', {}),
  D('d_middle_blanket_stack', AGE.GROWN, fneed(MD, 0), 'Đống chăn ở nhà tập thể được gấp cẩn thận mỗi sáng, và không ai nhận mình làm. Bạn nghĩ đó là cách người ta nói lời cảm ơn mà không phải nói.', 'The stack of blankets in the dormitory is folded carefully each morning, and no one claims to have done it. You think this is how people say thanks without saying.', {}),
  D('d_middle_birthday_cake', AGE.GROWN, fneed(MD, 0), 'Hôm nay là sinh nhật của một người trong tổ và cả hội góp chung một chiếc bánh nhỏ. Cắt xong chỉ mỗi người được một lát mỏng như tờ giấy, nhưng ai cũng cười.', 'Today is a team member’s birthday and everyone chips in for a small cake. Once cut, each gets a slice thin as paper, but everyone smiles.', {}),
  D('d_middle_door_never_locked', AGE.GROWN, fneed(MD, 0), 'Cửa nhà tập thể của Middle không bao giờ khóa, dù ở giữa Backstreets. Bạn đã thôi hỏi vì sao không ai dám vào.', 'The Middle’s dormitory door is never locked, though it stands in the Backstreets. You have stopped asking why no one dares enter.', {}),
  D('d_middle_morning_greeting', AGE.GROWN, fneed(MD, 0), 'Mỗi sáng ai bước vào bếp cũng nói một câu chào, và nghe theo từng giọng bạn đoán được người ấy đang vui hay buồn. Hôm nay có một giọng khác thường.', 'Each morning everyone entering the kitchen says a greeting, and from each voice you can guess whether they are glad or sad. Today one voice is different.', {}),
  D('d_middle_book_ribbon', AGE.GROWN, fneed(MD, 1), 'Dải ruy băng đánh dấu trang trong Book of Vengeance đã thay màu ba lần trong năm nay.', 'The ribbon marking a page in the Book of Vengeance has changed color three times this year.', {}),
  D('d_middle_old_song', AGE.GROWN, fneed(MD, 0), 'Ai đó trong bếp ngân nga một bài hát cũ bằng một thứ tiếng bạn không hiểu. Cả tổ lặng xuống nghe, và khi hết, không ai vỗ tay.', 'Someone in the kitchen hums an old song in a language you do not understand. The whole team falls quiet to listen, and when it ends no one applauds.', {}),
  D('d_middle_bandaged_hands', AGE.GROWN, fneed(MD, 0), 'Bàn tay của người đầu bếp trong tổ luôn quấn băng, và ông ấy nấu rất ngon. Bạn chưa bao giờ hỏi vì sao ông phải quấn.', 'The team cook’s hands are always bandaged, and he cooks very well. You have never asked why he needs to wrap them.', {}),
  D('d_middle_late_footsteps', AGE.GROWN, fneed(MD, 0), 'Tiếng bước chân muộn ở hành lang ngừng ngay trước cửa phòng bạn rồi đi tiếp. Mỗi đêm vào cùng một giờ, và bạn thấy yên lòng vì biết có người đi tuần.', 'Late footsteps in the corridor stop right at your door then continue. Every night at the same hour, and you feel reassured knowing someone is on watch.', {}),
  D('d_middle_apron_stain', AGE.GROWN, fneed(MD, 0), 'Chiếc tạp dề treo ở bếp có một vết ố tròn nhỏ, và mỗi người mới vào tổ đều được kể một câu chuyện khác nhau về nó.', 'The apron hanging in the kitchen has a small round stain, and each newcomer to the team is told a different story about it.', {}),
  D('d_middle_pocket_note', AGE.GROWN, fneed(MD, 1), 'Trong túi áo khoác bạn có một mẩu giấy nhỏ viết: Cố lên. Nét chữ lạ.', 'In your coat pocket is a small slip reading: Hang in there. The handwriting is unfamiliar.', {}),
  D('d_middle_empty_plate', AGE.GROWN, fneed(MD, 0), 'Trên bàn ăn chung luôn có thêm một chiếc đĩa trống, dành cho người chưa đến.', 'At the communal table there is always one extra empty plate, set for someone yet to arrive.', {}),
  D('d_middle_tired_laugh', AGE.GROWN, fneed(MD, 0), 'Tiếng cười của cả tổ sau một ngày dài nghe mệt mà vẫn thật. Bạn đứng ngoài cửa nghe một lúc, và thấy mình cười theo.', 'The team’s laughter after a long day sounds tired but real. You stand outside the door listening a while and find yourself smiling along.', {}),
  D('d_middle_open_window', AGE.GROWN, fneed(MD, 0), 'Cửa sổ trên tầng hai của trụ sở luôn mở, bất kể mùa nào. Người ta nói đó là để người đã mất có thể về, và không ai muốn đóng nó.', 'The upstairs window of the hall is always open in every season. It is said to be so the departed can come home, and no one wishes to close it.', {}),
  D('d_middle_tooth_mark', AGE.GROWN, fneed(MD, 0), 'Trên mép bàn họp có một vết răng nhỏ, của một đứa trẻ nào đó đã lớn lên và rời đi. Bạn lướt ngón tay qua vết ấy mỗi khi ngồi vào bàn.', 'On the edge of the meeting table is a small tooth mark, left by some child who grew up and moved on. You brush a finger across it each time you sit.', {}),
  D('d_middle_quiet_sunday', AGE.GROWN, fneed(MD, 0), 'Chủ nhật ở trụ sở Middle yên lặng một cách dễ chịu. Mỗi người làm một việc nhỏ của riêng mình, và không ai nói một lời cho đến buổi chiều.', 'Sunday at the Middle’s hall is quiet in a comfortable way. Each does some small task of their own, and no one speaks a word until afternoon.', {}),
  D('d_middle_gift_wrapping', AGE.GROWN, fneed(MD, 0), 'Một Sibling gói quà bằng giấy báo cũ, thắt dây gai rất cẩn thận. Bạn nhìn mà thấy món quà đó đẹp hơn mọi thứ bọc lụa.', 'A Sibling wraps a gift in old newspaper, tying twine very carefully. You watch and find that gift lovelier than anything bound in silk.', {})
];
