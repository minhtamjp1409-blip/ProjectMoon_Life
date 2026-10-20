// ============================================================================
// MINOR CHOICES, SECOND SET: districts, trades, and the people closest to you.
// Same shape as lifeMinors.js.
// ============================================================================

const M = (id, age, need, vi, en, choices, ignore, extra = {}) => ({ id, age, need, vi, en, choices, ignore, ...extra });
const C = (vi, en, rvi, ren, fx = {}, extra = {}) => ({ vi, en, rvi, ren, fx, ...extra });
const O = (w, rvi, ren, fx = {}, extra = {}) => ({ w, rvi, ren, fx, ...extra });
const I = (rvi, ren, fx = {}, extra = {}) => ({ vi: 'Để nó trôi qua', en: 'Let it pass', rvi, ren, fx, ...extra });

const YOUNG = [7, 17];
const GROWN = [18, 140];
const ADULT = [18, 50];

export const LIFE_MINORS_2 = [
  // ------------------------------------------------------------ districts
  M('m2_t_sell_hours', [12, 80], { regions: ['T'] }, 'Một môi giới của T Corp đề nghị mua hai giờ mỗi ngày của bạn trong một năm. Giá đủ trả tiền trọ cả năm.', 'A T Corp broker offered to buy two hours of your day for a year. The price would cover a year’s rent.', [
    C('Bán', 'Sell', 'Ngày của bạn ngắn lại. Bạn ngủ ít hơn, ăn nhanh hơn, và không còn giờ nào để ngồi không.', 'Your days got shorter. You slept less, ate faster, and had no hour left to sit idle.', { wealth: 10, health: -4, sanity: -4 }, { mem: 'sold_hours' }),
    C('Từ chối', 'Refuse', 'Người môi giới nhún vai: "Sớm muộn gì cũng bán thôi." Ông ta đi gõ cửa nhà bên.', 'The broker shrugged: “Everyone sells eventually.” He knocked on the next door.', {})
  ], I('Bạn đóng cửa trước khi ông ta nói hết.', 'You shut the door before he finished.')),

  M('m2_t_time_ripper', [16, 80], { regions: ['T'], mem: 'sold_hours' }, 'Có tin đồn về Time Ripper: kẻ cắt mất những giờ chưa sống của người khác. Một nạn nhân tuần trước sống ở tầng dưới nhà bạn.', 'There are rumors of the Time Ripper, who cuts away the hours people haven’t lived yet. Last week’s victim lived on the floor below you.', [
    C('Đến xem hiện trường', 'Go look at the scene', 'Người đó vẫn ngồi trên ghế, mắt mở, như một bức ảnh bị dừng giữa chừng. Từ hôm đó bạn đếm từng giờ của mình.', 'They were still sitting in the chair, eyes open, like a photograph stopped halfway. Since that day you count every one of your hours.', { sanity: -6, resonance: 4 }),
    C('Ở trong nhà, khóa cửa', 'Stay in, lock the door', 'Bạn thức trắng ba đêm. Không có gì xảy ra, và chính điều đó làm bạn sợ hơn.', 'You stayed up three nights. Nothing happened, and that frightened you more.', { sanity: -3, health: -2 })
  ], I('Bạn tự nhủ đó chỉ là tin đồn.', 'You told yourself it was only a rumor.'), { once: true, tags: ['callback', 'danger'] }),

  M('m2_w_bistro_job', [16, 60], { regions: ['W'], notNest: true }, 'Một quán ở phố ẩm thực District 23 cần người rửa bát, trả gấp ba chỗ khác. Ông chủ nói: "Đừng mở tủ lạnh thứ hai."', 'A restaurant on District 23’s food street needs a dishwasher and pays three times the going rate. The owner says: “Don’t open the second fridge.”', [
    C('Nhận việc', 'Take the job', null, null, { wealth: 6 }, { out: [
      O(65, 'Bạn không mở tủ lạnh thứ hai. Bạn rửa bát suốt một năm và để dành được tiền.', 'You never opened the second fridge. You washed dishes for a year and saved money.', { wealth: 4 }),
      O(35, 'Một đêm, bạn mở nó. Bạn nghỉ việc ngay sáng hôm sau, không lấy lương tuần cuối.', 'One night you opened it. You quit the next morning without collecting your last week’s pay.', { sanity: -8, wealth: -2 }, { mem: 'second_fridge' })
    ] }),
    C('Không nhận', 'Turn it down', 'Ông chủ cười. "Ai cũng nói vậy trước khi đói."', 'The owner laughed. “Everyone says that until they get hungry.”', {})
  ], I('Bạn đi qua quán mà không dừng lại.', 'You walked past without stopping.')),

  M('m2_u_lake_rule', [8, 80], { regions: ['U'] }, 'Đi thuyền trên The Great Lake, bạn nghe thấy nước gọi tên mình bằng giọng của mẹ. Luật số 12 của U Corp: đừng trả lời.', 'Out on the Great Lake in a boat, you heard the water call your name in your mother’s voice. U Corp rule 12: do not answer.', [
    C('Bịt tai, đếm đến một trăm', 'Cover your ears and count to a hundred', 'Đến số 87 thì giọng nói dừng lại. Người lái thuyền gật đầu với bạn như với một người lớn.', 'At 87 the voice stopped. The boatman nodded at you the way you nod at an adult.', { sanity: 2, rep: 1 }),
    C('Trả lời', 'Answer', null, null, {}, { out: [
      O(60, 'Bạn chỉ kịp nói "Mẹ?" thì người lái thuyền tát bạn ngã xuống sàn thuyền. Nước lặng đi. Ông không nói gì đến khi về bến.', 'You had only said “Mum?” when the boatman slapped you to the deck. The water went still. He said nothing until you reached the dock.', { health: -2, sanity: -4, resonance: 5 }),
      O(40, 'Có thứ gì đó trườn lên mạn thuyền và nắm lấy cổ chân bạn. Người lái thuyền chặt nó bằng rìu. Nó để lại một vết bầm xanh không bao giờ phai.', 'Something slid up the side of the boat and took hold of your ankle. The boatman cut it with an axe. It left a blue bruise that never faded.', { health: -6, sanity: -6, resonance: 8 }, { scar: 'Vết bầm xanh ở cổ chân' })
    ] })
  ], I('Bạn ngồi im. Giọng nói gọi thêm ba lần rồi thôi.', 'You sat still. The voice called three more times, then stopped.', { sanity: -1 }), { theme: 'lake' }),

  M('m2_h_restructure', [8, 80], { regions: ['H'] }, 'Restructuring Day đêm qua đã dịch căn phòng của bạn sang cạnh nhà một gia đình lớn của Hongyuan. Sáng ra có người gõ cửa mời bạn uống trà.', 'Last night’s Restructuring Day moved your room next to a great Hongyuan family. In the morning someone knocked to invite you to tea.', [
    C('Nhận lời', 'Accept', null, null, {}, { out: [
      O(60, 'Họ hỏi bạn rất nhiều câu nhẹ nhàng về những người bạn quen. Khi về, bạn nhận ra mình đã kể quá nhiều.', 'They asked you many gentle questions about the people you knew. Walking back, you realized you had said too much.', { network: 5, sanity: -2 }, { mem: 'hongyuan_tea' }),
      O(40, 'Chén trà có vị đắng lạ. Bạn ngủ ba ngày. Khi tỉnh dậy, trên tay có một vết kim, và không ai giải thích.', 'The tea had a strange bitterness. You slept three days. When you woke there was a needle mark on your arm, and no one explained.', { health: -5, resonance: 6 })
    ] }),
    C('Từ chối khéo', 'Decline politely', 'Người hầu cúi đầu, mỉm cười, và ghi gì đó vào sổ.', 'The servant bowed, smiled, and wrote something in a book.', { rep: -1 })
  ], I('Bạn giả vờ không có nhà.', 'You pretended not to be home.')),

  M('m2_l_fog_scavenge', [12, 70], { regions: ['L'] }, 'Có người trả 15 Ahn cho bất cứ thứ gì mang ra từ tòa nhà Lobotomy cũ trong sương. Nhiều người vào, ít người ra.', 'Someone pays 15 Ahn for anything carried out of the old Lobotomy building in the fog. Many go in; few come out.', [
    C('Vào', 'Go in', null, null, {}, { out: [
      O(50, 'Bạn mang ra một tấm thẻ nhân viên cũ có tên một người tên Ayin. Người mua trả gấp đôi, tay run.', 'You came out with an old employee badge bearing the name Ayin. The buyer paid double, hands shaking.', { wealth: 10, resonance: 6 }),
      O(50, 'Trong sương có thứ đi theo bạn suốt ba tầng. Bạn ra được, tay không, và nó vẫn ở trong giấc mơ của bạn.', 'Something in the fog followed you down three floors. You got out empty-handed, and it is still in your dreams.', { sanity: -10, resonance: 8 })
    ] }),
    C('Không vào', 'Stay out', 'Tuần sau, ba người trong khu vào và không ra nữa.', 'The next week, three people from the block went in and never came out.', { sanity: -1 })
  ], I('Bạn đứng ở rìa sương một lúc rồi về.', 'You stood at the edge of the fog a while, then went home.'), { tags: ['danger'] }),

  M('m2_n_prosthetic', [18, 80], { regions: ['N'], stat: { health: [0, 55] } }, 'Bác sĩ nói tay trái của bạn phải thay bằng tay máy. Ở District 14, Nagel und Hammer sẽ biết.', 'The doctor says your left arm must be replaced with a prosthetic. In District 14, Nagel und Hammer will find out.', [
    C('Thay, rồi giấu', 'Get it, and hide it', 'Bạn mặc áo dài tay cả mùa hè. Mỗi lần có tiếng thánh ca ngoài phố, bạn để tay vào túi.', 'You wore long sleeves all summer. Whenever hymns sounded in the street, you put the hand in your pocket.', { health: 10, wealth: -6, sanity: -3 }, { flags: ['Prosthetic'], mem: 'hidden_prosthetic' }),
    C('Chuyển sang District khác để thay', 'Move to another District for it', 'Bạn bán gần hết đồ đạc để chuyển nhà. Tay mới hoạt động tốt. Bạn không có ai quen ở chỗ mới.', 'You sold almost everything to move. The new hand works well. You know no one where you live now.', { health: 10, wealth: -10, network: -6 }, { flags: ['Prosthetic'] })
  ], I('Bạn sống với cánh tay hỏng thêm một năm.', 'You lived with the ruined arm another year.', { health: -3 })),

  M('m2_j_casino', [18, 80], { regions: ['J'], stat: { wealth: [10, 100] } }, 'Một bàn cược ở sòng bạc J Corp cho cược bằng "vận may" thay cho Ahn. Họ nói nó sẽ tự hồi lại.', 'A table at a J Corp casino lets you bet with “luck” instead of Ahn. They say it grows back.', [
    C('Cược', 'Bet', null, null, {}, { out: [
      O(45, 'Bạn thắng. Trên đường về, bạn nhặt được ví, tránh được một vụ nổ, và cảm thấy có ai đó đang tính sổ.', 'You won. On the way home you found a wallet, missed an explosion by a minute, and felt someone was keeping count.', { wealth: 14 }),
      O(55, 'Bạn thua. Từ hôm đó, những chuyện xui nhỏ cứ đến: dây giày đứt, tàu trễ, một vết dao lẽ ra trượt qua lại không trượt.', 'You lost. Since that day small misfortunes keep coming: a snapped lace, a late train, a knife that should have missed and didn’t.', { health: -6, sanity: -4 }, { mem: 'bet_luck' })
    ] }),
    C('Cược bằng Ahn như bình thường', 'Bet Ahn like normal', 'Bạn thua 6 Ahn và về nhà với cảm giác mình đã thoát được thứ gì đó.', 'You lost 6 Ahn and went home feeling you had escaped something.', { wealth: -6 })
  ], I('Bạn chỉ đứng xem.', 'You only watched.')),

  M('m2_k_ampoule_line', [12, 80], { regions: ['K'] }, 'K Corp phát ampoule miễn phí cho người nghèo trong một ngày. Hàng người dài mười con phố. Phía trước, có người đang xô ngã một bà cụ.', 'K Corp is giving out free ampoules to the poor for one day. The line is ten streets long. Up ahead, someone is shoving an old woman to the ground.', [
    C('Đỡ bà ấy dậy, mất chỗ trong hàng', 'Help her up and lose your place', 'Bà cụ đưa bạn ống ampoule của bà. "Tôi già rồi. Cậu còn dùng được lâu."', 'The old woman gave you her ampoule. “I’m old. You’ll get more use out of it.”', { health: 6, sanity: 3, rep: 2 }, { motif: { mercy: 1 } }),
    C('Giữ chỗ của mình', 'Keep your place', 'Bạn nhận được ống ampoule. Bà cụ không đứng dậy được, và hàng người cứ thế đi vòng qua bà.', 'You got your ampoule. The old woman couldn’t get up, and the line simply flowed around her.', { health: 6, sanity: -3 })
  ], I('Bạn quay về, không xếp hàng nữa.', 'You went home and didn’t queue.')),

  M('m2_s_blade_teacher', [10, 30], { regions: ['S'] }, 'Một kiếm sĩ già của Blade Lineage ngồi dưới mái hiên nhà bạn tránh mưa. Ông nhìn cách bạn cầm cây chổi và nói: "Sai."', 'An old Blade Lineage swordsman was sheltering from the rain under your eaves. He watched how you held the broom and said: “Wrong.”', [
    C('Hỏi ông thế nào mới đúng', 'Ask him what right looks like', 'Ông dạy bạn một thế kiếm duy nhất, rồi đi khi mưa tạnh. Bạn tập nó mỗi ngày trong mười năm.', 'He taught you a single stance, then left when the rain stopped. You practiced it every day for ten years.', { health: 3, rep: 2 }, { flags: ['해결사동경'], mem: 'blade_stance' }),
    C('Mời ông vào nhà', 'Invite him inside', 'Ông ăn hết nồi cháo của nhà bạn, cảm ơn, và để lại một thanh kiếm gãy. "Ta không cần nó nữa."', 'He ate the whole pot of porridge, thanked you, and left a broken sword. “I don’t need it anymore.”', { sanity: 2, wealth: -1 }, { flags: ['유물'] })
  ], I('Bạn tiếp tục quét nhà.', 'You kept sweeping.')),

  M('m2_out_caravan', [8, 60], { out: true }, 'Một đoàn thương nhân từ The City đi ngang qua trại. Họ cần người dẫn đường qua vùng có thú lớn.', 'A City caravan is passing the camp. They need a guide through beast country.', [
    C('Dẫn đường', 'Guide them', null, null, {}, { out: [
      O(65, 'Bạn đưa họ qua an toàn. Họ trả bằng thuốc, đạn và một tấm bản đồ The City cũ.', 'You got them through safely. They paid in medicine, bullets and an old map of the City.', { wealth: 6, health: 3, network: 3 }),
      O(35, 'Một con thú tấn công đoàn vào đêm thứ hai. Bạn sống, nhưng ba người trong đoàn thì không, và họ đổ lỗi cho bạn.', 'A beast hit the caravan on the second night. You lived; three of them didn’t, and they blamed you.', { health: -8, rep: -4, sanity: -3 })
    ] }),
    C('Ở lại trại', 'Stay at camp', 'Đoàn thương nhân thuê người khác. Không ai trong số họ quay lại.', 'The caravan hired someone else. None of them came back.', {})
  ], I('Bạn trốn trong lều khi họ hỏi.', 'You hid in your tent when they asked.')),

  // ------------------------------------------------------------ trades
  M('m2_fx_cheap_job', GROWN, { jobs: ['Fixer'], grade: [9, 6] }, 'Một bà mẹ ở Backstreets đặt lên bàn 4 Ahn. Con trai bà bị một nhóm Rat bắt đi đêm qua. Office nói giá thấp nhất là 20.', 'A Backstreets mother put 4 Ahn on the table. Her son was taken by Rats last night. The Office says the minimum is 20.', [
    C('Nhận, ngoài giờ', 'Take it, off the books', null, null, { wealth: 1 }, { out: [
      O(55, 'Bạn tìm thấy cậu bé trong một nhà kho, còn đủ hai quả thận. Bà mẹ khóc và cố trả thêm. Bạn không nhận.', 'You found the boy in a warehouse, both kidneys still in. The mother wept and tried to pay more. You didn’t take it.', { rep: 6, sanity: 5, merit: 3 }, { motif: { mercy: 1 } }),
      O(45, 'Bạn đến muộn một ngày. Bạn trả lại bà 4 Ahn, và bà ném chúng vào mặt bạn.', 'You were a day late. You gave her back the 4 Ahn, and she threw them in your face.', { sanity: -6 })
    ] }),
    C('Từ chối theo quy định', 'Refuse by the rules', 'Bà mẹ không nói gì, chỉ cầm lại 4 Ahn và đi ra. Bạn nhìn theo cho đến khi bà khuất ở cuối phố.', 'She said nothing, took back the 4 Ahn and left. You watched until she disappeared at the end of the street.', { sanity: -4, merit: 1 })
  ], I('Bạn bảo bà đến Office khác.', 'You told her to try another Office.', { sanity: -2 })),

  M('m2_fx_grade_exam', GROWN, { jobs: ['Fixer'] }, 'Hana mở kỳ đánh giá Grade. Một người quen ở Office bán "thông tin về bài thi" với giá 10 Ahn.', 'Hana is holding a Grade assessment. Someone at the Office is selling “information about the test” for 10 Ahn.', [
    C('Mua', 'Buy it', null, null, { wealth: -10 }, { out: [
      O(60, 'Thông tin đúng. Bạn qua dễ dàng.', 'The information was good. You passed easily.', { merit: 10, rep: 2 }),
      O(40, 'Đó là bẫy của Hana để bắt gian lận. Bạn bị ghi vào hồ sơ.', 'It was Hana’s trap for cheaters. It went into your file.', { rep: -8, merit: -4 })
    ] }),
    C('Thi bằng sức mình', 'Sit it on your own', null, null, {}, { out: [
      O(55, 'Bạn qua, sát nút, với hai xương sườn rạn.', 'You passed, barely, with two cracked ribs.', { merit: 8, health: -5 }),
      O(45, 'Bạn trượt. Lần sau.', 'You failed. Next time.', { sanity: -2, merit: 2 })
    ] })
  ], I('Bạn bỏ kỳ thi năm nay.', 'You skipped this year’s assessment.')),

  M('m2_fx_partner_wound', ADULT, { jobs: ['Fixer'], npc: 'partner' }, '{partner} bị thương nặng trong Request tối qua. Office chỉ trả tiền thuốc cho người còn làm được việc.', '{partner} was badly hurt on last night’s Request. The Office only pays for treatment if you can still work.', [
    C('Trả tiền thuốc bằng tiền của bạn', 'Pay for the treatment yourself', '{partner} hồi lại sau hai tháng. Lần đầu đi làm lại, họ đi trước bạn một bước, như để đỡ cho bạn.', '{partner} recovered after two months. On the first job back they walked a step ahead of you, as if to shield you.', { wealth: -10 }, { bond: { partner: 18 }, motif: { loyalty: 1 } }),
    C('Để Office quyết', 'Leave it to the Office', '{partner} bị cho nghỉ việc. Họ không trách bạn, nhưng cũng không gọi cho bạn nữa.', '{partner} was let go. They didn’t blame you, but they stopped calling.', {}, { npcFate: { partner: 'estranged' } })
  ], I('Bạn ghé thăm một lần rồi bận.', 'You visited once, then got busy.', {}, { bond: { partner: -10 } }), { tags: ['npc'] }),

  M('m2_syn_debtor_kid', GROWN, { jobs: ['Syndicate'] }, 'Người nợ tiền không có nhà. Chỉ có đứa con mười tuổi của ông ta, đang làm bài tập trên bàn bếp.', 'The man who owes isn’t home. Only his ten-year-old, doing homework at the kitchen table.', [
    C('Đợi ông ta về', 'Wait for him to come home', 'Bạn ngồi đợi ba tiếng. Đứa bé mời bạn một cốc nước. Khi người cha về, bạn đưa ông ra ngoài hẻm để làm việc.', 'You waited three hours. The child offered you a glass of water. When the father came home, you took him out to the alley to do the job.', { wealth: 4, sanity: -3 }),
    C('Mang đứa bé đi làm tin', 'Take the child as collateral', 'Người cha trả đủ ngay trong đêm. Đứa bé không khóc. Nó nhìn bạn suốt đường về, như đang học thuộc khuôn mặt bạn.', 'The father paid in full that night. The child didn’t cry. It watched you the whole way back, as if memorizing your face.', { wealth: 8, sanity: -8, heat: 4 }, { mem: 'took_child', later: [{ id: 'm2_syn_child_returns', years: 12, reasonVi: 'Đứa bé đã học thuộc khuôn mặt bạn', reasonEn: 'The child memorized your face' }] }),
    C('Bỏ đi, báo là không gặp', 'Leave, report no one was home', 'Cấp trên trừ lương bạn. Bạn không giải thích.', 'Your boss docked your pay. You didn’t explain.', { wealth: -4, rep: -2 }, { motif: { mercy: 1 } })
  ], I('Bạn đứng ở cửa rất lâu.', 'You stood in the doorway a long time.', { sanity: -2 })),

  M('m2_syn_child_returns', [28, 90], { mem: 'took_child' }, 'Một người trẻ của The Middle đứng chắn đường bạn. Bạn mất một lúc mới nhận ra đôi mắt ấy: đứa bé trên bàn bếp năm nào.', 'A young member of the Middle blocked your way. It took you a moment to know those eyes: the child at the kitchen table, years ago.', [
    C('Đứng yên chờ', 'Stand and wait', null, null, {}, { out: [
      O(50, '"Còn nhớ tôi không?" Bạn gật đầu. Họ nhìn bạn rất lâu, rồi bước sang một bên. "Tôi chỉ muốn bạn biết là tôi nhớ."', '“Remember me?” You nodded. They looked at you a long while, then stepped aside. “I just wanted you to know I remember.”', { sanity: -6 }),
      O(50, 'Họ đã ghi tên bạn vào Book of Vengeance từ năm mười tuổi. Hôm nay họ đến để gạch nó đi.', 'They wrote your name in the Book of Vengeance at ten years old. Today they came to strike it out.', { health: -22, sanity: -8 }, { scar: 'Tên trong Book of Vengeance' })
    ] }),
    C('Rút vũ khí trước', 'Draw first', 'Bạn nhanh hơn. Người trẻ ấy ngã xuống, và bạn nhận ra mình đã làm điều này với cả cha lẫn con.', 'You were faster. They went down, and you realized you had now done this to both father and child.', { sanity: -14, heat: 8 }, { motif: { violence: 2 } })
  ], I('Bạn quay lưng đi. Họ không đuổi theo, lần này.', 'You turned and left. They didn’t follow, this time.', { sanity: -3 }), { once: true, tags: ['callback'] }),

  M('m2_wing_layoff', GROWN, { jobs: ['Wing Employee'] }, 'Có tin đồn bộ phận của bạn sắp "tái cấu trúc". Một đồng nghiệp đề nghị hai người cùng báo cáo sai sót của trưởng nhóm để giữ chỗ.', 'There are rumors your department is about to be “restructured.” A colleague suggests the two of you report the team lead’s mistakes to keep your seats.', [
    C('Cùng báo cáo', 'Report together', 'Trưởng nhóm bị đưa ra khỏi Nest trong tuần. Bạn giữ được việc. Đồng nghiệp kia được lên làm trưởng nhóm mới.', 'The team lead was walked out of the Nest within the week. You kept your job. The colleague became the new team lead.', { wealth: 4, network: 3, sanity: -4 }),
    C('Từ chối', 'Refuse', null, null, {}, { out: [
      O(50, 'Tái cấu trúc không xảy ra. Năm sau, đồng nghiệp ấy bị điều chuyển.', 'The restructuring never came. The next year, that colleague was transferred.', { sanity: 2 }),
      O(50, 'Đồng nghiệp tự báo cáo, và báo cáo luôn cả bạn. Bạn bị cắt thưởng và ghi một cảnh cáo.', 'The colleague reported alone, and reported you too. Your bonus was cut and a warning went on your file.', { wealth: -6, rep: -4 })
    ] })
  ], I('Bạn bảo sẽ suy nghĩ.', 'You said you’d think about it.')),

  M('m2_ws_apprentice', GROWN, { jobs: ['Workshop Craftsman'] }, 'Một đứa trẻ Backstreets đứng ngoài xưởng ngày nào cũng nhìn bạn rèn. Hôm nay nó hỏi có được học không.', 'A Backstreets kid has stood outside the workshop every day watching you forge. Today it asked if it could learn.', [
    C('Nhận nó làm học việc', 'Take it on as an apprentice', 'Nó làm hỏng ba lưỡi kiếm trong tháng đầu, và rèn được lưỡi đầu tiên vào tháng thứ tư. Bạn giữ lưỡi kiếm ấy trên tường.', 'It ruined three blades the first month and made its first good one in the fourth. You hung that blade on the wall.', { wealth: -3, sanity: 5, rep: 2 }, { npc: { role: 'partner', bond: 60 } }),
    C('Đuổi nó đi', 'Send it away', 'Nó không đến nữa. Vài tháng sau bạn thấy nó chạy việc cho một Syndicate.', 'It stopped coming. A few months later you saw it running errands for a Syndicate.', { sanity: -2 })
  ], I('Bạn không trả lời, tiếp tục rèn.', 'You didn’t answer and kept forging.')),

  // ------------------------------------------------------------ the people closest to you
  M('m2_child_first_word', [20, 70], { npc: 'child' }, '{child} nói từ đầu tiên. Không phải "bố", không phải "mẹ", mà là tên một con phố bạn hay nhắc khi đi làm về.', '{child} said a first word. Not “mum,” not “dad,” but the name of a street you often mention coming home from work.', [
    C('Cười, và bế con lên', 'Laugh and pick them up', 'Bạn cười đến chảy nước mắt. Đêm đó bạn không nghĩ đến công việc lần nào.', 'You laughed until you cried. That night you didn’t think about work once.', { sanity: 7 }, { bond: { child: 8 } }),
    C('Hứa sẽ không nhắc đến con phố đó nữa', 'Promise never to mention that street again', 'Con phố đó là nơi bạn làm những việc không muốn con biết. Bạn giữ lời hứa.', 'That street is where you do things you don’t want your child to know. You kept the promise.', { sanity: 3 }, { bond: { child: 5 } })
  ], I('Bạn mệt quá, chỉ kịp xoa đầu con.', 'You were too tired to do more than ruffle their hair.', { sanity: 1 }), { once: true, tags: ['npc', 'relief'] }),

  M('m2_child_fixer_dream', [30, 90], { npc: 'child' }, '{child} nói muốn trở thành Fixer, "giống như những người trên tivi".', '{child} says they want to become a Fixer, “like the ones on TV.”', [
    C('Kể cho con nghe sự thật', 'Tell them the truth', 'Bạn kể về những người bạn đã thấy chết. {child} im lặng rất lâu, rồi hỏi: "Vậy sao bố/mẹ vẫn làm?"', 'You told them about the people you’ve seen die. {child} was quiet a long time, then asked: “Then why do you still do it?”', { sanity: -2 }, { bond: { child: 6 } }),
    C('Dạy con cầm vũ khí, cho đúng', 'Teach them to hold a weapon, properly', 'Nếu con đằng nào cũng đi con đường này, ít nhất nó sẽ đi được xa hơn bạn.', 'If they are going down this road anyway, at least they will get further than you did.', { sanity: 1 }, { bond: { child: 10 }, mem: 'trained_child' }),
    C('Cấm', 'Forbid it', '{child} đóng sầm cửa phòng. Họ không nhắc lại chuyện đó với bạn nữa, nhưng bạn biết họ vẫn nghĩ.', '{child} slammed their door. They never brought it up with you again, but you know they still think about it.', {}, { bond: { child: -8 } })
  ], I('Bạn đổi chủ đề.', 'You changed the subject.'), { once: true, tags: ['npc'] }),

  M('m2_spouse_secret', [22, 80], { npc: 'spouse' }, '{lover} nhận được một lá thư và đốt nó trước khi bạn kịp thấy. Người ấy nói đó là "chuyện cũ".', '{lover} received a letter and burned it before you could see. They said it was “an old matter.”', [
    C('Tin, không hỏi', 'Trust them, don’t ask', 'Một năm sau, người ấy tự kể: đó là thư của gia đình cũ, những người đã đuổi họ khỏi Nest. Họ muốn người ấy quay về. Người ấy đã chọn ở lại với bạn.', 'A year later they told you themselves: it was from their old family, who had thrown them out of the Nest. They wanted them back. They chose to stay with you.', { sanity: 4 }, { bond: { lover: 14 } }),
    C('Tìm hiểu sau lưng người ấy', 'Look into it behind their back', 'Bạn tìm ra sự thật, và người ấy biết bạn đã tìm. "Bạn có thể hỏi tôi mà."', 'You found the truth, and they knew you had looked. “You could have just asked me.”', { network: 2 }, { bond: { lover: -12 } })
  ], I('Bạn nhìn tro giấy trong gạt tàn rồi đi ngủ.', 'You looked at the ash in the tray and went to bed.'), { once: true, tags: ['npc'] }),

  M('m2_spouse_threat', [22, 80], { npc: 'spouse', stat: { heat: [30, 100] } }, 'Có người để một bức ảnh {lover} chụp lén ngoài chợ dưới cửa nhà bạn. Mặt sau viết: "Đẹp đấy."', 'Someone slid a photo of {lover}, taken in secret at the market, under your door. On the back: “Pretty.”', [
    C('Gửi {lover} sang District khác một thời gian', 'Send {lover} to another District for a while', 'Người ấy đi trong nước mắt. Ba tháng, bạn ở một mình và tìm ra kẻ chụp ảnh.', 'They left in tears. For three months you were alone, and you found the one who took the photo.', { sanity: -5, heat: -15 }, { bond: { lover: -4 } }),
    C('Tự đi tìm kẻ đã chụp', 'Go find who took it yourself', null, null, {}, { out: [
      O(60, 'Bạn tìm thấy hắn trong hai ngày. Không ai để ảnh dưới cửa nhà bạn nữa.', 'You found him in two days. No more photos came under your door.', { heat: -10, sanity: -4 }, { motif: { violence: 1 } }),
      O(40, 'Trong lúc bạn đi tìm, chúng đến nhà. {lover} sống sót, nhưng không bao giờ ra chợ một mình nữa.', 'While you were out looking, they came to the house. {lover} lived, but never went to the market alone again.', { sanity: -12 }, { bond: { lover: -6 }, scar: 'Ngày bạn không ở nhà' })
    ] })
  ], I('Bạn xé bức ảnh và không kể với ai.', 'You tore up the photo and told no one.', { sanity: -3 }), { tags: ['npc', 'danger'] }),

  M('m2_friend_wedding', [20, 50], { npc: 'friend' }, '{friend} sắp cưới và mời bạn làm người đứng cạnh trong lễ cưới. Hôm đó bạn có một việc được trả rất hậu.', '{friend} is getting married and asked you to stand beside them at the ceremony. That day you have a job that pays very well.', [
    C('Đến lễ cưới', 'Go to the wedding', 'Bạn mặc bộ đồ duy nhất không có vết máu. {friend} ôm bạn và khóc. Đó là một trong những ngày đẹp nhất đời bạn.', 'You wore the only suit without a bloodstain. {friend} hugged you and cried. It was one of the best days of your life.', { sanity: 8, wealth: -3 }, { bond: { friend: 15 } }),
    C('Đi làm', 'Take the job', 'Bạn gửi một món quà đắt tiền. {friend} gửi lại một tấm ảnh cưới, ở chỗ của bạn là một khoảng trống.', 'You sent an expensive gift. {friend} sent back a wedding photo; where you should have stood, there was a gap.', { wealth: 10 }, { bond: { friend: -12 } })
  ], I('Bạn không trả lời lời mời.', 'You didn’t answer the invitation.', {}, { bond: { friend: -15 } }), { once: true, tags: ['npc', 'relief'] }),

  M('m2_mentor_old', [25, 80], { npc: 'mentor' }, '{mentor} giờ đã quá già để cầm kiếm. Ông nhờ bạn đưa đi xem biển, một lần, trước khi chết.', '{mentor} is too old to hold a sword now. He asked you to take him to see the sea, once, before he dies.', [
    C('Đưa ông đi', 'Take him', 'The City không có biển, nên bạn đưa ông đến The Great Lake. Ông ngồi nhìn mặt nước cả buổi chiều và nói đó là biển. Bạn không cãi.', 'The City has no sea, so you took him to the Great Lake. He sat watching the water all afternoon and said it was the sea. You didn’t argue.', { sanity: 6, wealth: -4 }, { bond: { mentor: 15 } }),
    C('Hứa để sau', 'Promise to do it later', 'Mùa đông năm ấy ông mất. Bạn tìm thấy trong túi áo ông một tấm vé đến District 21, chưa dùng.', 'He died that winter. In his coat pocket you found an unused ticket to District 21.', { sanity: -8 }, { npcFate: { mentor: 'dead' } })
  ], I('Bạn bận.', 'You were busy.', { sanity: -4 }, { npcFate: { mentor: 'dead' } }), { once: true, tags: ['npc'] }),

  M('m2_lover_meet_adult', [18, 45], { noNpc: 'lover', noFlags: ['Married'] }, 'Một người cùng ca làm việc chia cho bạn nửa chiếc ô trong cơn mưa axit. Hai người đứng dưới mái hiên đến khi mưa tạnh.', 'Someone on your shift shared half an umbrella with you in the acid rain. The two of you stood under an awning until it stopped.', [
    C('Mời họ ăn tối', 'Ask them to dinner', 'Quán mì đông nghẹt. Hai người phải ngồi chung bàn với một Fixer say rượu, và đó là bữa tối vui nhất trong năm.', 'The noodle shop was packed. You had to share a table with a drunk Fixer, and it was the best dinner of the year.', { sanity: 5, wealth: -1 }, { npc: { role: 'lover', bond: 50 } }),
    C('Cảm ơn rồi về', 'Say thanks and go home', 'Tuần sau người ấy chuyển ca. Bạn thỉnh thoảng nghĩ về chiếc ô.', 'The next week they changed shifts. You think about the umbrella sometimes.', {})
  ], I('Bạn không nói gì cả buổi.', 'You didn’t say a word the whole time.')),

  M('m2_lover_leave_city', [20, 50], { npc: 'lover', noFlags: ['Married'] }, '{lover} có một người họ hàng ở Nest có thể lo giấy tờ cho một người. Chỉ một người.', '{lover} has a relative in a Nest who can arrange papers for one person. Just one.', [
    C('Bảo {lover} đi', 'Tell {lover} to go', 'Người ấy đi. Thư đến đều đặn trong một năm, rồi thưa dần. Ít ra người ấy được an toàn.', 'They went. Letters came regularly for a year, then less often. At least they were safe.', { sanity: -6, rep: 2 }, { npcFate: { lover: 'estranged' }, motif: { mercy: 1 } }),
    C('Xin {lover} ở lại', 'Ask {lover} to stay', 'Người ấy ở lại. Không ai nhắc đến tờ giấy đó nữa, nhưng thỉnh thoảng bạn thấy người ấy nhìn về phía Nest.', 'They stayed. Neither of you mentioned the papers again, but sometimes you see them looking toward the Nest.', { sanity: 3 }, { bond: { lover: 10 } })
  ], I('Bạn để người ấy tự quyết.', 'You let them decide.', {}, { out: [
    O(50, 'Người ấy ở lại, vì bạn.', 'They stayed, for you.', { sanity: 3 }, { bond: { lover: 8 } }),
    O(50, 'Người ấy đi, và để lại một lá thư dài.', 'They went, and left a long letter.', { sanity: -6 }, { npcFate: { lover: 'estranged' } })
  ] }), { once: true, tags: ['npc'] }),

  M('m2_rival_help', [18, 60], { npc: 'rival' }, '{rival} gọi cho bạn lúc nửa đêm. Họ bị kẹt trong một khu bị phong tỏa và không còn ai khác để gọi.', '{rival} called you at midnight. They are trapped in a sealed-off block and have no one else to call.', [
    C('Đến cứu', 'Go get them', null, null, {}, { out: [
      O(60, 'Bạn đưa họ ra. Họ không cảm ơn. Một tuần sau, có người để trước cửa nhà bạn một chai rượu đắt tiền, không ghi tên.', 'You got them out. They didn’t thank you. A week later someone left an expensive bottle at your door, unsigned.', { health: -6, rep: 3 }, { bond: { rival: 25 } }),
      O(40, 'Cả hai bị thương. Hai người nằm cạnh nhau trong một phòng khám và lần đầu tiên nói chuyện như người bình thường.', 'Both of you got hurt. You lay side by side in a clinic and for the first time talked like ordinary people.', { health: -14 }, { bond: { rival: 30 } })
    ] }),
    C('Tắt máy', 'Hang up', 'Sáng hôm sau, bạn nghe tin khu đó đã được "dọn sạch". Bạn không biết {rival} có ra được không.', 'The next morning you heard the block had been “cleaned.” You don’t know if {rival} got out.', { sanity: -6 }, { npcFate: { rival: 'missing' } })
  ], I('Bạn để điện thoại reo đến khi nó tự tắt.', 'You let the phone ring until it stopped.', { sanity: -4 }, { npcFate: { rival: 'missing' } }), { once: true, tags: ['npc'] }),

  // ------------------------------------------------------------ anywhere
  M('m2_any_found_gun', YOUNG, { notNest: true }, 'Bạn tìm thấy một khẩu súng ngắn trong thùng rác sau quán rượu. Còn ba viên đạn.', 'You found a pistol in the bin behind a bar. Three rounds left.', [
    C('Giữ lại', 'Keep it', 'Bạn giấu nó dưới nệm. Mỗi đêm biết nó ở đó, bạn ngủ ngon hơn, và cũng sợ hơn.', 'You hid it under the mattress. Every night, knowing it was there, you slept better, and were more afraid.', { sanity: 1 }, { flags: ['HasGun'], mem: 'kept_gun' }),
    C('Bán', 'Sell it', 'Thằng bán đồ cũ trả 8 Ahn mà không hỏi gì.', 'The junk dealer paid 8 Ahn and asked nothing.', { wealth: 4 }),
    C('Ném xuống cống', 'Throw it in the drain', 'Bạn nghe nó rơi rất lâu mới chạm nước.', 'You heard it fall a long time before it hit water.', { sanity: 2 })
  ], I('Bạn để nó lại trong thùng rác.', 'You left it in the bin.')),

  M('m2_any_gun_night', [10, 30], { mem: 'kept_gun' }, 'Có người cạy cửa nhà bạn lúc 2 giờ sáng. Khẩu súng vẫn nằm dưới nệm.', 'Someone was jimmying your door at 2 AM. The pistol was still under the mattress.', [
    C('Cầm súng ra cửa', 'Take the gun to the door', null, null, {}, { out: [
      O(55, 'Bạn bắn qua cánh cửa. Có tiếng chạy. Sáng ra chỉ còn một vệt máu trên bậc thềm và ba người hàng xóm nhìn bạn khác đi.', 'You fired through the door. Someone ran. In the morning there was only a streak of blood on the step, and three neighbors looking at you differently.', { sanity: -5, rep: 3, heat: 3 }),
      O(45, 'Súng kẹt. Kẻ trộm đánh bạn bằng xà beng rồi lấy luôn khẩu súng.', 'The gun jammed. The burglar hit you with a crowbar and took the gun as well.', { health: -10, wealth: -4 })
    ] }),
    C('Trốn dưới gầm giường', 'Hide under the bed', 'Chúng lấy đi vài thứ rồi bỏ đi. Khẩu súng vẫn ở dưới nệm, ngay trên đầu bạn.', 'They took a few things and left. The gun was still under the mattress, right above your head.', { wealth: -3, sanity: -3 })
  ], I('Bạn nằm im, tim đập thình thịch.', 'You lay still, heart pounding.', { sanity: -3, wealth: -3 }), { once: true, tags: ['callback', 'danger'] }),

  M('m2_any_carmen_song', [12, 90], { stat: { sanity: [0, 35] } }, 'Bạn bắt đầu nghe thấy một bản piano ở những nơi không có đàn piano.', 'You have started hearing piano music in places with no piano.', [
    C('Đi khám', 'See a doctor', 'Bác sĩ cho bạn thuốc ngủ và nhìn bạn lâu hơn mức cần thiết. Bản nhạc nhỏ đi, nhưng không dừng hẳn.', 'The doctor gave you sleeping pills and looked at you longer than necessary. The music got quieter, but did not stop.', { sanity: 4, wealth: -3 }),
    C('Lắng nghe', 'Listen', 'Bản nhạc rất đẹp. Mỗi lần nghe xong, bạn thấy nhẹ đi một chút, và xa mọi người hơn một chút.', 'The music is beautiful. Every time it ends, you feel a little lighter, and a little further from everyone.', { sanity: 2, resonance: 10 })
  ], I('Bạn bật radio to lên.', 'You turned the radio up.', { resonance: 3 }), { theme: 'carmen' }),

  M('m2_any_old_age_letter', [60, 140], {}, 'Bạn ngồi viết một lá thư cho người sẽ đọc nó sau khi bạn chết. Bạn không biết bắt đầu từ đâu.', 'You sat down to write a letter for whoever reads it after you die. You don’t know where to begin.', [
    C('Viết về những điều bạn hối hận', 'Write about your regrets', 'Lá thư dài tám trang. Viết xong, bạn ngủ một giấc dài nhất trong nhiều năm.', 'The letter ran eight pages. When you finished, you slept the longest sleep in years.', { sanity: 6 }),
    C('Viết về những người bạn từng thương', 'Write about the people you loved', 'Bạn viết tên từng người. Có những cái tên bạn tưởng mình đã quên.', 'You wrote each name. There were names you thought you had forgotten.', { sanity: 4, resonance: 2 })
  ], I('Bạn gấp tờ giấy trắng lại.', 'You folded the blank page.'), { once: true, tags: ['relief'] })
];

export default LIFE_MINORS_2;
