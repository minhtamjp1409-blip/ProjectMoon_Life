import { D } from './storyKit.js';

const CB = (role, extraNeed = {}) => ({
  once: true,
  tone: 'story',
  w: 3.5,
  keepRole: role,
  tags: ['callback', 'npc_callback'],
  bond: { [role]: 3 },
  ...extraNeed
});

export const NPC_CHOICE_CALLBACKS = [
  // 1-2. m_k_candy (friend)
  D(
    'cb_npc_candy_bite',
    [6, 140],
    { npc: 'friend', mem: 'npc_candy_bite', memMinYears: 2 },
    '[Vết răng năm cũ] {friend} nhắc lại buổi chiều bạn lao vào cắn tay đứa bắt nạt ở đầu hẻm để giành lại cây kẹo. Nghe đâu đứa trẻ năm ấy giờ vẫn còn vết sẹo mờ trên ngón cái.',
    '[The Old Bite Mark] {friend} brings up the afternoon you bit the alley bully’s hand to win back a piece of candy. Word is that kid still carries a faint scar on his thumb.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_candy_share',
    [6, 140],
    { npc: 'friend', mem: 'npc_candy_share', memMinYears: 2 },
    '[Giấy gói kẹo năm ấy] {friend} vẫn giữ mảnh giấy gói của cây kẹo năm ấy bạn bẻ đôi chia cho ở đầu hẻm. Mép giấy đã sờn trắng, được ép phẳng trong ngăn ví cũ.',
    '[That Candy Wrapper] {friend} still keeps the wrapper from the candy you broke in half to share at the alley corner. Its edges are worn white, pressed flat inside an old wallet.',
    { sanity: 1 },
    CB('friend')
  ),

  // 3-4. mk_back_marbles (friend)
  D(
    'cb_npc_marbles_return',
    [6, 140],
    { npc: 'friend', mem: 'npc_marbles_return', memMinYears: 2 },
    '[Viên bi xanh trong túi áo] {friend} lấy từ túi áo ra viên bi xanh của ông nội mà năm xưa bạn đã trả lại sau ván thắng. Mặt thủy tinh trầy xước vẫn ánh lên màu xanh cũ dưới đèn đường.',
    '[The Blue Marble in the Pocket] {friend} pulls from a coat pocket the blue marble you returned after winning that childhood game. The scratched glass still catches its old blue glint under the streetlamp.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_marbles_keep',
    [6, 140],
    { npc: 'friend', mem: 'npc_marbles_keep', memMinYears: 2 },
    '[Túi bi ngày nhỏ] Đi ngang khoảng sân đất cũ, {friend} nhắc lại buổi chiều bạn thắng sạch cả túi bi rồi ôm về nhà. Giọng họ giờ chỉ còn nửa trách móc, nửa buồn cười.',
    '[That Bag of Marbles] Passing the old dirt yard, {friend} recalls the afternoon you won their whole bag of marbles and took it home. Their voice holds only half a grudge and half a laugh now.',
    { sanity: 1 },
    CB('friend')
  ),

  // 5-6. mc_any_bullied_friend (friend)
  D(
    'cb_npc_bullied_charge',
    [9, 140],
    { npc: 'friend', mem: 'npc_bullied_charge', memMinYears: 2 },
    '[Bức tường sau trường] {friend} chỉ tay về bức tường cũ nơi hai đứa từng chịu đòn cùng nhau. Họ bảo từ buổi chiều hôm đó mới tin bạn sẽ không bao giờ bỏ mặc họ.',
    '[Behind the School Wall] {friend} points toward the old wall where the two of you once took a beating together. They say that afternoon was when they knew you would never abandon them.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_bullied_call_adult',
    [9, 140],
    { npc: 'friend', mem: 'npc_bullied_call_adult', memMinYears: 2 },
    '[Đôi giày mất sau trường] Nhìn một đứa trẻ chạy chân trần qua ngõ, {friend} nhắc lại buổi chiều mất giày năm bạn chạy đi gọi bác bảo vệ. Lần này họ bật cười trước khi bạn kịp thấy áy náy.',
    '[The Shoes Behind School] Watching a barefoot child dash down the lane, {friend} recalls losing their shoes the day you ran for the caretaker. This time they laugh before you can feel guilty.',
    { sanity: 1 },
    CB('friend')
  ),

  // 7-8. m_c_shoplift (friend)
  D(
    'cb_npc_shoplift_join',
    [9, 140],
    { npc: 'friend', mem: 'npc_shoplift_join', memMinYears: 2 },
    '[Tiệm tạp hóa đầu ngõ] Đi qua góc phố cũ, {friend} hạ giọng nhắc lại vụ hai đứa lẻn vào tiệm tạp hóa của ông lão mù năm xưa. Cả hai bước chậm lại một nhịp rồi tự đổi sang chuyện khác.',
    '[The Corner Pantry] Walking past the old corner, {friend} lowers their voice to mention the day you two crept into the blind grocer’s shop. Both of you slow for a beat before changing the subject.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_shoplift_stop',
    [9, 140],
    { npc: 'friend', mem: 'npc_shoplift_stop', memMinYears: 2 },
    '[Ba ngày giận nhau] {friend} bất chợt cảm ơn bạn vì năm xưa đã cản họ lấy trộm đồ trong tiệm tạp hóa. Ba ngày giận không nhìn mặt năm ấy đã giữ cho cả hai khỏi một vết trượt dài.',
    '[Three Days of Silence] {friend} unexpectedly thanks you for stopping them from stealing at the corner pantry years ago. Those three days of cold silence kept you both from a worse slide.',
    { sanity: 1 },
    CB('friend')
  ),

  // 9-10. m5_friend_old_nickname (friend)
  D(
    'cb_npc_nickname_laugh',
    [14, 140],
    { npc: 'friend', mem: 'npc_nickname_laugh', memMinYears: 2 },
    '[Ám hiệu bằng biệt danh] Giữa đám đông ồn ào, {friend} khẽ gọi bạn bằng cái biệt danh hồi nhỏ mà hai người từng cười ra nước mắt. Chỉ một tiếng ấy cũng đủ báo cho bạn biết ai đang đứng sau lưng.',
    '[The Nickname Signal] In a noisy crowd, {friend} softly calls you by the childhood nickname that once made you both laugh to tears. That single word tells you who has your back.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_nickname_drop',
    [14, 140],
    { npc: 'friend', mem: 'npc_nickname_drop', memMinYears: 2 },
    '[Cái tên dừng ở đầu lưỡi] {friend} gọi đúng tên thật của bạn rồi khựng lại nửa nhịp, nuốt xuống cái biệt danh hồi nhỏ từ ngày bạn bảo đừng nhắc lại.',
    '[A Name Caught on the Tongue] {friend} calls you by your proper name and pauses half a beat, swallowing back the childhood nickname you once asked them not to use.',
    { sanity: 1 },
    CB('friend')
  ),

  // 11-12. mk_friend_cold_noodles (friend)
  D(
    'cb_npc_noodles_step',
    [16, 140],
    { npc: 'friend', mem: 'npc_noodles_step', memMinYears: 2 },
    '[Bậc thang ăn mì] Mỗi lần đi ngang bậc thang trước cửa phòng, {friend} lại nhìn chỗ hai người từng ngồi ăn chung bát mì ấm lúc nửa đêm.',
    '[The Noodle Step] Passing the steps outside your room, {friend} glances at the spot where the two of you once sat sharing warm noodles at midnight.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_noodles_bowl',
    [16, 140],
    { npc: 'friend', mem: 'npc_noodles_bowl', memMinYears: 2 },
    '[Chiếc bát úp trước cửa] {friend} nhìn thấy chiếc bát sứ từ đêm để mì trước cửa năm nào vẫn đặt ngay ngắn trên kệ bếp của bạn. Họ gõ nhẹ ngón tay lên vành bát rồi mỉm cười.',
    '[The Bowl on the Shelf] {friend} spots the porcelain bowl from that night of warm noodles still sitting on your kitchen shelf. They tap a finger lightly on its rim and smile.',
    { sanity: 1 },
    CB('friend')
  ),

  // 13-14. mk_friend_old_block (friend)
  D(
    'cb_npc_old_block_walk',
    [16, 140],
    { npc: 'friend', mem: 'npc_old_block_walk', memMinYears: 2 },
    '[Cột đèn cong phố cũ] {friend} báo tin cái cột đèn bị cong ở dãy phố cũ mà hai người từng đứng ngắm năm trước vừa mới bị tháo dỡ tuần rồi.',
    '[The Bent Lamp Post] {friend} mentions that the bent lamp post on the old block where you stood talking years ago was finally taken down last week.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_old_block_tram',
    [16, 140],
    { npc: 'friend', mem: 'npc_old_block_tram', memMinYears: 2 },
    '[Vé tàu điện đi qua phố cũ] {friend} rút ra tấm vé tàu điện cũ kỹ từ chuyến đi ngang dãy phố tuổi thơ mà năm ấy bạn đã trả tiền cho cả hai.',
    '[The Old Tram Ticket] {friend} shows you a creased tram ticket from the ride past your childhood block, the one where you paid the fare for both.',
    { sanity: 1 },
    CB('friend')
  ),

  // 15-16. mk_friend_torn_sleeve (friend)
  D(
    'cb_npc_sleeve_mend',
    [16, 140],
    { npc: 'friend', mem: 'npc_sleeve_mend', memMinYears: 2 },
    '[Đường chỉ lệch trên tay áo] {friend} nhìn cổ tay áo khoác của bạn, nơi những mũi chỉ vụng về họ khâu giúp năm trước vẫn còn nguyên. Họ gật đầu hài lòng vì đường chỉ ấy bền hơn tưởng tượng.',
    '[Crooked Stitches on the Cuff] {friend} glances at your coat cuff, where the clumsy stitches they sewed for you years ago still hold fast. They nod, pleased that the seam outlasted expectations.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_sleeve_tailor',
    [16, 140],
    { npc: 'friend', mem: 'npc_sleeve_tailor', memMinYears: 2 },
    '[Cuộn chỉ cất trong túi] Thấy áo bạn sờn mép, {friend} lại chạm vào cuộn kim chỉ trong túi nhưng cười bảo lần này chắc bạn vẫn chuộng ông thợ may góc phố hơn.',
    '[The Spool in the Pocket] Noticing a frayed hem on your coat, {friend} touches the needle and thread in their pocket, joking that you probably still prefer the corner tailor.',
    { sanity: 1 },
    CB('friend')
  ),

  // 17-20. mk_friend_small_loan & mk_friend_far_letter (friend)
  D(
    'cb_npc_loan_remembered',
    [16, 140],
    { npc: 'friend', mem: 'npc_loan_lent', memMinYears: 2 },
    '[Túi hạt dẻ rang] {friend} đặt lên bàn một túi hạt dẻ rang nóng hổi và nhắc lại tháng thiếu hụt năm ấy bạn đã đưa tiền cho họ bằng cả hai tay mà không hỏi một lời.',
    '[Roasted Chestnuts on the Table] {friend} sets a warm bag of roasted chestnuts on your table, recalling the lean month years ago when you lent them Ahn without a single question.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_loan_dinner',
    [16, 140],
    { npc: 'friend', mem: 'npc_loan_dinner', memMinYears: 2 },
    '[Bữa tối thay lời từ chối] {friend} giành trả tiền bữa ăn hôm nay, nhắc lại tối năm xưa bạn không có tiền cho vay nhưng vẫn giữ họ lại ăn một bữa no lòng.',
    '[Dinner Instead of a Loan] {friend} insists on paying for today’s meal, recalling the evening years ago when you could not lend them Ahn yet kept them at the table for a warm dinner.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_letter_kept',
    [16, 140],
    { npc: 'friend', mem: 'npc_letter_reply', memMinYears: 2 },
    '[Tờ thư hồi âm trong hộp sắt] {friend} kể rằng lá thư bạn thức trắng đêm viết trả lời năm trước vẫn được họ cất kỹ trong chiếc hộp sắt dưới gầm giường.',
    '[The Reply in the Tin Box] {friend} mentions that the three-page letter you stayed up all night writing back years ago is still kept safe inside a tin box at home.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_letter_seeds',
    [16, 140],
    { npc: 'friend', mem: 'npc_letter_coins', memMinYears: 2 },
    '[Chậu cây từ gói hạt giống] {friend} hỏi thăm gói hạt giống họ gửi lại năm xưa sau lần bạn đính kèm mấy đồng tiền vào thư hỏi thăm. Một mầm xanh nhỏ vẫn sống khỏe trên bệ cửa sổ.',
    '[The Sprout from the Seed Packet] {friend} asks after the packet of seeds they sent back years ago when you tucked a few coins into your letter. One small green shoot still thrives on the sill.',
    { sanity: 1 },
    CB('friend')
  ),

  // 21-24. m_t_lover_sweepers & m5_lover_under_awning (lover / spouse)
  D(
    'cb_npc_lover_curfew',
    [16, 140],
    { npc: 'lover', allowSpouseFallback: true, mem: 'npc_lover_305_search', memMinYears: 2 },
    '[Trước giờ còi 3:05] Khi kim đồng hồ nhích gần ba giờ sáng, {lover} nắm lấy cổ tay bạn, nhớ lại đêm bạn từng lao ra phố tìm họ trước tiếng còi Sweeper.',
    '[Before the 3:05 Siren] As the clock hand nears three in the morning, {lover} reaches for your wrist, remembering the night you sprinted into the street to find them before the Sweeper siren.',
    { sanity: 1 },
    CB('lover')
  ),
  D(
    'cb_npc_lover_locks',
    [16, 140],
    { npc: 'lover', allowSpouseFallback: true, mem: 'npc_lover_305_lock', memMinYears: 2 },
    '[Ba then cửa lúc rạng sáng] Nghe tiếng bước chân gấp gáp ngoài hẻm khuya, {lover} nhìn về phía ba then cửa sắt và nhớ lại đêm đập cửa lúc 3 giờ 08 trong vòng tay run rẩy của bạn.',
    '[Three Locks Before Dawn] Hearing hurried footsteps in the late alley, {lover} glances at the three iron bolts and recalls pounding on your door at 3:08 AM into your trembling arms.',
    { sanity: 1 },
    CB('lover')
  ),
  D(
    'cb_npc_lover_awning',
    [18, 140],
    { npc: 'lover', allowSpouseFallback: true, mem: 'npc_lover_awning_coat', memMinYears: 2 },
    '[Mái hiên sau cơn mưa] Đi ngang mái hiên đầu hẻm lúc trời vừa tạnh mưa, {lover} chạm vào vạt áo khoác bạn từng quàng lên vai họ trong buổi chiều đợi nhau năm ấy.',
    '[The Awning After Rain] Walking past the alley awning just as the rain clears, {lover} touches the coat you once draped over their wet shoulders while they waited for you.',
    { sanity: 1 },
    CB('lover')
  ),
  D(
    'cb_npc_lover_awning_wait',
    [18, 140],
    { npc: 'lover', allowSpouseFallback: true, mem: 'npc_lover_awning_wait', memMinYears: 2 },
    '[Chỗ đứng dưới mái hiên cũ] Mỗi lần hẹn nhau ngày mưa, {lover} lại nhắc đến buổi chiều đứng đợi dưới mái hiên đầu hẻm năm xưa và mỉm cười vì cuối cùng bạn đã tới.',
    '[The Old Spot Under the Awning] Whenever you meet on a rainy day, {lover} brings up that afternoon waiting under the alley awning years ago, smiling because you came after all.',
    { sanity: 1 },
    CB('lover')
  ),

  // 25-28. mk_spouse_late_dinner & mk_spouse_coat_pocket (spouse)
  D(
    'cb_npc_spouse_dinner',
    [20, 140],
    { npc: 'spouse', mem: 'npc_spouse_saved_dinner', memMinYears: 2 },
    '[Chiếc ghế kéo sẵn bên bàn bếp] Đêm nay bạn về sớm hơn thường lệ, nhưng {spouse} đã quen tay kéo sẵn chiếc ghế bên bàn bếp từ những đêm để phần cơm năm trước.',
    '[The Chair Pulled Out] You return home early tonight, yet {spouse} has already pulled out your kitchen chair by habit from all those late nights saving dinner for you.',
    { sanity: 1 },
    CB('spouse')
  ),
  D(
    'cb_npc_spouse_stove',
    [20, 140],
    { npc: 'spouse', mem: 'npc_spouse_morning_stove', memMinYears: 2 },
    '[Câu chuyện bên bếp sáng] Nhìn ấm nước sôi trên bếp, {spouse} nhắc lại buổi sáng hai người dậy trễ năm xưa và bảo những chuyện khó nói nhất lúc nào cũng dễ mở lời hơn bên bếp lửa.',
    '[Morning Talk by the Stove] Watching the kettle boil, {spouse} recalls that late morning years ago and says the hardest talks always come easier beside a warm stove.',
    { sanity: 1 },
    CB('spouse')
  ),
  D(
    'cb_npc_spouse_bought_list',
    [20, 140],
    { npc: 'spouse', mem: 'npc_spouse_bought_list', memMinYears: 2 },
    '[Mẩu giấy nhắc về ăn cơm] {spouse} lại nhét một tờ giấy nhỏ vào túi áo khoác của bạn như lần mua đồ về sớm năm trước, dòng cuối vẫn là chữ nhắn về ăn cơm quen thuộc.',
    '[Another Note for Dinner] {spouse} slips another small note into your coat pocket just like the day you came home early with the groceries, ending with the same reminder to come home for dinner.',
    { sanity: 1 },
    CB('spouse')
  ),
  D(
    'cb_npc_spouse_pocket',
    [20, 140],
    { npc: 'spouse', mem: 'npc_spouse_pocket_list', memMinYears: 2 },
    '[Mẩu giấy mua đồ năm cũ] Lúc bạn mở ví ở chợ, {spouse} thoáng thấy mẩu giấy dặn về ăn cơm từ năm nào vẫn kẹp ở ngăn trong cùng và khẽ mỉm cười.',
    '[The Old Shopping Slip] When you open your wallet at the market, {spouse} spots the old dinner note still tucked inside the inner fold and gives a quiet smile.',
    { sanity: 1 },
    CB('spouse')
  ),

  // 29-30. mk_partner_gear_check & mk_partner_rooftop_tea (partner)
  D(
    'cb_npc_partner_strap',
    [20, 140],
    { npc: 'partner', mem: 'npc_partner_strap', memMinYears: 2 },
    '[Quai đeo đã thay] Trước giờ lên đường, {partner} gõ nhẹ vào chiếc quai đeo họ từng kiểm tra và thay giúp bạn năm trước. Chỉ một cử chỉ ngắn cũng đủ thay lời dặn giữ mạng.',
    '[The Replaced Strap] Before heading out, {partner} taps the kit strap they once checked and replaced for you years ago. That single gesture says enough about coming back alive.',
    { sanity: 1 },
    CB('partner')
  ),
  D(
    'cb_npc_partner_roof_tea',
    [20, 140],
    { npc: 'partner', mem: 'npc_partner_roof_tea', memMinYears: 2 },
    '[Hai tiếng gõ vào thành ấm] Đi ngang cầu thang lên sân thượng, {partner} gõ ngón tay hai nhịp vào lan can sắt đúng như tín hiệu gọi uống trà trên mái nhà năm cũ.',
    '[Two Taps on the Pot] Passing the stairs to the roof, {partner} raps two fingers against the iron rail in the exact rhythm of your old rooftop tea signal.',
    { sanity: 1 },
    CB('partner')
  ),

  // 31. mk_mentor_visit (mentor)
  D(
    'cb_npc_mentor_tea',
    [16, 140],
    { npc: 'mentor', mem: 'npc_mentor_tea_visit', memMinYears: 2 },
    '[Chén trà đặc mùi dầu máy] {mentor} rót cho bạn chén trà đậm như buổi chiều bạn ghé thăm năm trước, rồi hỏi xem dạo này bạn còn nhớ lời dặn cũ hay lại tự làm theo ý mình.',
    '[Strong Tea and Machine Oil] {mentor} pours you the same dark tea from your visit years ago, asking whether you have kept their old advice or gone your own way again.',
    { sanity: 1 },
    CB('mentor')
  ),

  // 32-38. Expansion NPC callbacks
  D(
    'cb_npc_exp_partner_ammo',
    [20, 140],
    { npc: 'partner', mem: 'npc_exp_partner_ammo', memMinYears: 2 },
    '[Hộp đạn chia phần] Trước ca trực đêm nay, {partner} tự tay đẩy băng đạn nguyên niêm phong sang phía bạn để bù cho lần chia đạn năm cũ.',
    '[The Shared Magazine Crate] Before tonight’s shift, {partner} slides the factory-sealed clip to your side of the table to make up for that old ammo split.',
    { sanity: 1 },
    CB('partner')
  ),
  D(
    'cb_npc_exp_friend_warn',
    [20, 140],
    { npc: 'friend', mem: 'npc_exp_friend_warn', memMinYears: 2 },
    '[Ba tiếng gõ cửa rạng sáng] {friend} gõ đúng ba nhịp quen thuộc lên khung cửa sổ như đêm từng báo tin giúp bạn thoát cuộc thanh trừng năm trước.',
    '[Three Knocks at Dawn] {friend} taps the same three-beat signal on your window frame from the night they warned you ahead of the lane sweep.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_exp_friend_bar',
    [20, 140],
    { npc: 'friend', mem: 'npc_exp_friend_bar', memMinYears: 2 },
    '[Ly nước lọc ở quán rượu] Ngồi xuống bàn rượu cùng bạn, {friend} tự gọi thêm một ly nước lạnh và cười trừ nhắc lại đêm say khướt năm xưa.',
    '[A Glass of Cold Water at the Bar] Sitting down at the tavern table, {friend} orders a glass of cold water with a sheepish grin, recalling that drunken quarrel years ago.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_exp_mentor_scabbard',
    [20, 140],
    { npc: 'mentor', mem: 'npc_exp_mentor_scabbard', memMinYears: 2 },
    '[Vân da trên bao kiếm cũ] {mentor} nhìn vết sờn trên chiếc bao kiếm da thuộc từng trao cho bạn trong xưởng riêng, gật đầu vì bạn vẫn giữ nó bên người.',
    '[Worn Leather of the Old Scabbard] {mentor} glances at the wear on the leather scabbard they once handed you in the smithy, nodding to see it still at your hip.',
    { sanity: 1 },
    CB('mentor')
  ),
  D(
    'cb_npc_exp_spouse_stew',
    [20, 140],
    { npc: 'spouse', mem: 'npc_exp_spouse_stew', memMinYears: 2 },
    '[Canh chừng nồi súp trên bếp] Thấy bạn bước vào bếp, {spouse} vội hạ nhỏ lửa rồi bật cười nhắc lại nồi canh cháy đen ngày mưa dầm năm trước.',
    '[Watching the Stew Pot] Seeing you step into the kitchen, {spouse} hurries to turn down the flame and laughs about that scorched stew pot on a rainy evening years ago.',
    { sanity: 1 },
    CB('spouse')
  ),
  D(
    'cb_npc_exp_friend_tea',
    [20, 140],
    { npc: 'friend', mem: 'npc_exp_friend_tea', memMinYears: 2 },
    '[Bếp than vụn trước hiên trọ] Đi ngang hiên nhà trọ cũ, {friend} lại nâng bát trà thảo mộc ấm áp mời bạn như buổi chiều ngồi ôn chuyện xưa.',
    '[The Brazier on the Old Stoop] Passing the tenement stoop, {friend} raises a warm bowl of herb tea toward you just like that afternoon trading old memories.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_exp_friend_repay',
    [20, 140],
    { npc: 'friend', mem: 'npc_exp_friend_repay', memMinYears: 2 },
    '[Chữ tín từ món nợ cũ] {friend} khoe công việc dạo này đã khấm khá hơn nhờ khoản tiền năm xưa bạn cho mượn lúc gia đình họ ngặt nghèo.',
    '[Good Standing from an Old Debt] {friend} shares that work has steadied lately thanks to the sum you trusted them with when their family fell ill years ago.',
    { sanity: 1 },
    CB('friend')
  ),
  D(
    'cb_npc_exp_partner_bounty',
    [20, 140],
    { npc: 'partner', mem: 'npc_exp_partner_bounty', memMinYears: 2 },
    '[Phần thưởng chia đều] Nhận khoản thưởng ngoài hợp đồng hôm nay, {partner} chia thẳng làm hai phần bằng nhau trên bàn mà không còn tranh cãi như năm trước.',
    '[An Even Split on the Table] Collecting today’s bonus payout, {partner} divides the Ahn into two equal piles without repeating that old argument.',
    { sanity: 1 },
    CB('partner')
  ),
  D(
    'cb_npc_exp_partner_guard',
    [20, 140],
    { npc: 'partner', mem: 'npc_exp_partner_guard', memMinYears: 2 },
    '[Đổi ca đúng giờ] Đêm mưa tuyết năm nay, {partner} có mặt ở vọng gác sớm mười phút cùng bình trà nóng, không còn trễ ca như đêm cũ.',
    '[Early for the Watch] On tonight’s sleet watch, {partner} arrives ten minutes early with a thermos of hot tea, making good on that late relief years ago.',
    { sanity: 1 },
    CB('partner')
  ),
  D(
    'cb_npc_exp_mentor_hone',
    [20, 140],
    { npc: 'mentor', mem: 'npc_exp_mentor_hone', memMinYears: 2 },
    '[Lưỡi thép không vết mẻ] {mentor} liếc qua lưỡi vũ khí được mài bóng của bạn rồi khẽ gật đầu, không cần gõ tẩu thuốc nhắc nhở như buổi chiều năm trước.',
    '[A Clean Edge] {mentor} glances along your freshly honed blade and gives a quiet nod, needing no pipe-rap reprimand like years ago.',
    { sanity: 1 },
    CB('mentor')
  ),
  D(
    'cb_npc_exp_spouse_umbrella',
    [20, 140],
    { npc: 'spouse', mem: 'npc_exp_spouse_umbrella', memMinYears: 2 },
    '[Chiếc ô chống mưa axit bên cửa] Nghe đài báo mưa độc chiều nay, {spouse} đặt sẵn chiếc ô bọc nhựa quen thuộc ngay cạnh giày của bạn trước giờ ra cửa.',
    '[The Vinyl Umbrella by the Door] Hearing the acid-rain forecast, {spouse} sets that familiar vinyl umbrella right beside your boots before you head out.',
    { sanity: 1 },
    CB('spouse')
  ),
  D(
    'cb_npc_exp_partner_gauze',
    [20, 140],
    { npc: 'partner', mem: 'npc_exp_partner_gauze', memMinYears: 2 },
    '[Cuộn gạc dự phòng trong túi] Trước khi xuất phát, {partner} vỗ nhẹ vào túi cứu thương đã nhét sẵn hai cuộn gạc mới từ sau lần băng bó dã chiến năm cũ.',
    '[Two Rolls of Sterile Gauze] Before moving out, {partner} pats the med-pouch stocked with two fresh rolls since that field dressing years ago.',
    { sanity: 1 },
    CB('partner')
  ),
  D(
    'cb_npc_exp_partner_plan',
    [20, 140],
    { npc: 'partner', mem: 'npc_exp_partner_plan', memMinYears: 2 },
    '[Ám hiệu bọc lót góc khuất] Chỉ bằng một cái liếc mắt trước cổng mục tiêu, {partner} đã vào đúng vị trí bọc lót như lần mật đàm đột kích năm trước.',
    '[The Blind-Spot Signal] With a single glance outside the target gate, {partner} slips into the exact flanking angle from your old breach plan.',
    { sanity: 1 },
    CB('partner')
  ),
  D(
    'cb_npc_exp_mentor_breath',
    [20, 140],
    { npc: 'mentor', mem: 'npc_exp_mentor_breath', memMinYears: 2 },
    '[Nhịp thở trước đòn nặng] Nghe tiếng thở đều của bạn trên sân tập, {mentor} mỉm cười vì bạn đã giữ vững nhịp cơ hoành họ từng chỉnh cho năm xưa.',
    '[Steady Breath Before the Strike] Hearing your even breathing on the training ground, {mentor} smiles to see the diaphragm cadence they taught you years ago.',
    { sanity: 1 },
    CB('mentor')
  ),
  D(
    'cb_npc_partner_debrief',
    [20, 140],
    { npc: 'partner', mem: 'npc_partner_debrief', memMinYears: 2 },
    '[Phần không ghi trong báo cáo] Đặt bản báo cáo mới lên bàn, {partner} rót sẵn hai ly như đêm hai người ngồi nhắc lại những chuyện không viết trên giấy năm trước.',
    '[What Left the Report] Setting the new file on the desk, {partner} pours two glasses just like the night you talked through what never went on paper.',
    { sanity: 1 },
    CB('partner')
  ),
  D(
    'cb_npc_spouse_cold_dinner',
    [22, 140],
    { npc: 'spouse', mem: 'npc_spouse_cold_dinner', memMinYears: 2 },
    '[Nồi canh hâm lại] Đêm nay cả hai cùng về muộn, {spouse} bắc nồi canh lên bếp hâm lại rồi khẽ cười nhắc đến bữa tối nguội ngắt năm xưa.',
    '[Reheated Soup] Coming home late together tonight, {spouse} puts the soup pot back on the burner with a quiet smile for that cold dinner years ago.',
    { sanity: 1 },
    CB('spouse')
  ),
  D(
    'cb_npc_spouse_unopened_letter',
    [22, 140],
    { npc: 'spouse', mem: 'npc_spouse_unopened_letter', memMinYears: 2 },
    '[Phong bì trên bàn bếp] Có thư từ Office gửi tới, lần này {spouse} bóc ra đọc ngay bên bàn ăn với bạn chứ không còn để nguyên ba ngày như năm cũ.',
    '[Envelope on the Kitchen Table] When a letter from an Office arrives today, {spouse} opens it right at the table with you instead of leaving it three days like before.',
    { sanity: 1 },
    CB('spouse')
  ),
  D(
    'cb_npc_spouse_old_scar',
    [25, 140],
    { npc: 'spouse', mem: 'npc_spouse_old_scar', memMinYears: 2 },
    '[Bàn tay đặt lên vết sẹo vai] Lúc thay áo giúp bạn, ngón tay {spouse} chạm nhẹ lên vết sẹo cũ trên vai như đêm đầu tiên họ hỏi chuyện năm xưa.',
    '[A Hand on the Old Shoulder Scar] Helping you with your coat, {spouse} brushes a hand over the old scar on your shoulder just like the night they first asked its story.',
    { sanity: 1 },
    CB('spouse')
  ),
  D(
    'cb_npc_mentor_three_locks',
    [21, 140],
    { npc: 'mentor', mem: 'npc_mentor_three_locks', memMinYears: 2 },
    '[Tiếng chốt cửa lần thứ ba] Trước khi tắt đèn, bạn bất giác kiểm tra chốt cửa đúng ba lần như thói quen cẩn trọng học được từ {mentor} năm trước.',
    '[The Third Turn of the Lock] Before turning out the lamp, you catch yourself checking the door bolt three times in the exact habit learned from {mentor}.',
    { sanity: 1 },
    CB('mentor')
  ),
  D(
    'cb_npc_mentor_small_debt',
    [21, 140],
    { npc: 'mentor', mem: 'npc_mentor_small_debt', memMinYears: 2 },
    '[Tiệm tạp hóa đầu hẻm] Đi ngang tiệm tạp hóa đầu hẻm cùng {mentor}, người bán hàng gật đầu chào cả hai mà không ai nhắc lại món nợ cũ năm xưa.',
    '[The Grocer at the End of the Alley] Walking past the corner shop with {mentor}, the grocer nods to you both without a word about that old debt settled years ago.',
    { sanity: 1 },
    CB('mentor')
  )
];
