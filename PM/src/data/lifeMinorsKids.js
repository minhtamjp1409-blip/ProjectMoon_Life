// ============================================================================
// CHILDHOOD MINOR CHOICES (ages 4-11).
// Before this set, a child aged 4-6 had two or three eligible minor choices in
// the whole pool, so every life opened on the same coin, candy or staircase.
// Same shape as lifeMinors.js. need: back | nest | out | notNest | npc ...
// ============================================================================

const M = (id, age, need, vi, en, choices, ignore, extra = {}) => ({ id, age, need, vi, en, choices, ignore, ...extra });
const C = (vi, en, rvi, ren, fx = {}, extra = {}) => ({ vi, en, rvi, ren, fx, ...extra });
const O = (w, rvi, ren, fx = {}, extra = {}) => ({ w, rvi, ren, fx, ...extra });
const I = (rvi, ren, fx = {}, extra = {}) => ({ vi: 'Để nó trôi qua', en: 'Let it pass', rvi, ren, fx, ...extra });

const KID = [4, 6];
const CHILD = [7, 11];

export const LIFE_MINORS_KIDS = [
  // ------------------------------------------------------------ ages 4-6
  M('mk_back_leak', KID, { back: true }, '[Mái dột] Mưa axit nhỏ giọt qua mái tôn, rơi đúng chỗ bạn ngủ. Nhà chỉ có một cái xô. Em họ ngủ ở góc bên kia, chỗ cũng dột.', '[The leak] Acid rain dripped through the tin roof right where you sleep. The family has one bucket. Your cousin sleeps in the other corner, which leaks too.', [
    C('Đặt xô dưới chỗ của em', 'Put the bucket under your cousin', 'Bạn ngủ co người né những giọt mưa. Sáng ra vai bạn rát đỏ, còn em bạn ngủ ngon cả đêm.', 'You slept curled up, dodging the drops. In the morning your shoulder was red and raw, and your cousin had slept through the night.', { health: -2, sanity: +2 }, { motif: { mercy: 1 } }),
    C('Đặt xô dưới chỗ mình', 'Put the bucket under yourself', 'Bạn ngủ được. Em bạn thì không, và sáng ra nó không nói chuyện với bạn.', 'You slept. Your cousin didn’t, and wouldn’t speak to you in the morning.', { health: +1, sanity: -1 })
  ], I('Bạn kéo chiếu ra giữa phòng, chỗ không dột, và nằm sát cửa cho đến sáng.', 'You dragged your mat to the middle of the room where it was dry and lay by the door until morning.', { health: -1 })),

  M('mk_back_stair_man', KID, { back: true }, '[Người ngủ ở cầu thang] Có một người đàn ông ngủ ở chiếu nghỉ cầu thang đã ba đêm. Mẹ dặn bạn đi qua đừng nhìn. Trong túi bạn còn mẩu bánh mì để dành.', '[The man on the stairs] A man has slept on the stair landing for three nights. Your mother told you not to look when you pass. You still have a crust of bread saved in your pocket.', [
    C('Đặt mẩu bánh cạnh ông ấy', 'Leave the crust beside him', null, null, {}, { out: [
      O(65, 'Sáng hôm sau mẩu bánh không còn. Ông ta gật đầu với bạn khi bạn đi học. Một tuần sau ông đi mất, để lại một chiếc cúc áo bằng đồng trên bậc thang.', 'The next morning the crust was gone. He nodded to you on your way to school. A week later he was gone, leaving a brass button on the step.', { sanity: +3 }, { motif: { mercy: 1 } }),
      O(35, 'Ông ta túm lấy cổ tay bạn, rất chặt, rồi buông ra và quay mặt vào tường. Bạn chạy lên nhà. Cổ tay bầm mất mấy ngày.', 'He grabbed your wrist, hard, then let go and turned to the wall. You ran upstairs. The bruise lasted days.', { health: -1, sanity: -3 })
    ] }),
    C('Mách mẹ', 'Tell your mother', 'Mẹ gọi chủ nhà. Chiều hôm đó chiếu nghỉ đã sạch trơn, và không ai nói ông ta đi đâu.', 'Your mother called the landlord. By afternoon the landing was bare, and no one said where he went.', { sanity: -1, rep: +1 })
  ], I('Bạn đi qua, mắt nhìn xuống chân, đúng như mẹ dặn.', 'You walked past with your eyes on your feet, as you were told.')),

  M('mk_back_marbles', KID, { back: true, npc: 'friend' }, '[Ván bi] {friend} thua bạn hết sạch bi, kể cả viên bi xanh ông nội để lại. Nó cố không khóc.', '[The marbles] {friend} lost every marble to you, including the blue one their grandfather left them. They’re trying not to cry.', [
    C('Trả lại viên bi xanh', 'Give back the blue one', '{friend} nắm chặt viên bi và không nói gì. Hôm sau nó chia cho bạn nửa củ khoai nướng.', '{friend} clutched the marble and said nothing. The next day they shared half a roasted potato with you.', { sanity: +2 }, { bond: { friend: 8 } }),
    C('Thắng là thắng', 'A win is a win', 'Bạn giữ cả túi bi. {friend} về nhà một mình, và từ hôm đó chơi với đứa khác.', 'You kept the whole bag. {friend} went home alone, and played with someone else after that.', { wealth: +1 }, { bond: { friend: -8 }, motif: { greed: 1 } })
  ], I('Bạn bỏ túi bi xuống đất rồi đi về. Không ai nhặt.', 'You dropped the bag and went home. Neither of you picked it up.'), { tags: ['npc'] }),

  M('mk_back_tram_fixer', KID, { back: true }, '[Trên tàu điện] Một Fixer ngồi xuống cạnh bạn trên tàu điện. Tay áo anh ta ướt đẫm, và mùi tanh lan khắp toa. Mẹ bạn đang ngủ gật.', '[On the tram] A Fixer sat down next to you on the tram. His sleeve was soaked through, and the smell filled the car. Your mother was dozing.', [
    C('Đưa anh ta chiếc khăn tay của mẹ', 'Offer him your mother’s handkerchief', 'Anh ta nhìn chiếc khăn, cười, rồi buộc nó quanh cánh tay. Xuống tàu, anh ta đặt vào tay bạn một viên kẹo bọc giấy bạc.', 'He looked at the handkerchief, smiled, and tied it round his arm. Getting off, he pressed a foil-wrapped sweet into your hand.', { sanity: +3, resonance: +2 }, { flags: ['해결사동경'] }),
    C('Nhìn chằm chằm vào thanh kiếm của anh ta', 'Stare at his sword', 'Anh ta để yên cho bạn nhìn. Cả chuyến đi bạn đếm được ba vết mẻ trên lưỡi kiếm.', 'He let you look. By the end of the ride you had counted three nicks in the blade.', { resonance: +2 }, { flags: ['해결사동경'] })
  ], I('Bạn úp mặt vào áo mẹ cho đến khi anh ta xuống tàu.', 'You buried your face in your mother’s coat until he got off.', { sanity: -1 })),

  M('mk_any_lost_shoe', KID, { notNest: true }, '[Chiếc giày] Giữa chợ đông, ai đó giẫm lên chân bạn và chiếc giày bên trái tuột mất. Mẹ đã đi trước một đoạn. Đôi giày này phải đi thêm hai năm nữa.', '[The shoe] In the crowded market someone stepped on your foot and your left shoe came off. Your mother is a little way ahead. These shoes have to last two more years.', [
    C('Chui vào đám đông tìm', 'Crawl back into the crowd for it', null, null, {}, { out: [
      O(55, 'Bạn tìm thấy nó dưới một sạp cá, dính đầy nhớt. Mẹ mắng bạn cả đường về, nhưng tối đó lau chiếc giày rất kỹ.', 'You found it under a fish stall, slimy. Your mother scolded you all the way home, but that night she cleaned the shoe very carefully.', { health: -1, sanity: +1 }),
      O(45, 'Bạn không tìm thấy giày, mà lạc mất mẹ suốt hai tiếng. Một bà bán rau dắt bạn ra đầu chợ. Mẹ ôm bạn, rồi tát bạn, rồi lại ôm.', 'You didn’t find the shoe, and lost your mother for two hours. A vegetable seller walked you to the market gate. Your mother hugged you, slapped you, then hugged you again.', { sanity: -4, wealth: -1 })
    ] }),
    C('Đi chân trần chạy theo mẹ', 'Run after your mother barefoot', 'Bạn về nhà với bàn chân rướm máu. Suốt mùa đông đó bạn đi một chiếc giày và một chiếc dép.', 'You got home with a bleeding foot. All that winter you wore one shoe and one sandal.', { health: -3, wealth: -1 })
  ], I('Bạn đứng khóc giữa chợ cho đến khi mẹ quay lại tìm.', 'You stood crying in the market until your mother came back for you.', { sanity: -2 })),

  M('mk_any_charcoal_wall', KID, {}, '[Bức vẽ trên tường] Bạn lấy than vẽ kín một mảng tường: một ngôi nhà, một mặt trời, và cả nhà mình đứng trước cửa. Cha sắp về.', '[The drawing on the wall] You covered a patch of wall in charcoal: a house, a sun, and your whole family standing at the door. Your father is about to come home.', [
    C('Đứng chờ để khoe', 'Wait to show him', null, null, {}, { out: [
      O(60, 'Cha đứng nhìn rất lâu. Ông không bắt bạn lau đi. Bức vẽ còn trên tường đến tận ngày cả nhà chuyển đi.', 'Your father looked at it a long time. He didn’t make you wash it off. The drawing stayed on the wall until the day the family moved.', { sanity: +5 }),
      O(40, 'Cha mệt sau ca làm. Ông bắt bạn lau sạch, và đánh vào tay bạn hai cái vì tốn nước.', 'Your father was tired from his shift. He made you scrub it off and smacked your hand twice for wasting water.', { sanity: -3 })
    ] }),
    C('Lau đi trước khi cha về', 'Wipe it off before he’s home', 'Bạn lau đến khi chỉ còn một vệt xám. Bạn vẫn nhớ chính xác mình đã vẽ những gì.', 'You scrubbed until only a grey smear remained. You still remember exactly what you drew.', { sanity: -1 })
  ], I('Bạn đi ngủ và để bức vẽ ở đó.', 'You went to bed and left it there.')),

  M('mk_any_radio_report', KID, {}, '[Bản tin trên radio] Radio đang đọc tin về một "Distortion" ở District bên cạnh. Người lớn vội tắt đi. Bạn chưa từng nghe từ đó.', '[The radio bulletin] The radio was reporting a "Distortion" in the next District. The adults switched it off fast. You had never heard the word.', [
    C('Hỏi Distortion là gì', 'Ask what a Distortion is', 'Không ai trả lời. Đêm đó bạn mơ thấy một người hàng xóm biến thành một thứ khác, rất chậm, trong khi vẫn mỉm cười với bạn.', 'No one answered. That night you dreamed of a neighbor slowly turning into something else, smiling at you the whole time.', { sanity: -3, resonance: +4 }),
    C('Bật lại radio khi người lớn đi ngủ', 'Turn the radio back on once the adults are asleep', 'Bạn nghe được nửa bản tin, rồi chỉ còn tiếng rè. Bạn thức đến sáng, tai áp vào loa.', 'You caught half the bulletin, then only static. You stayed up until dawn with your ear against the speaker.', { sanity: -2, resonance: +5, health: -1 })
  ], I('Bạn tiếp tục chơi với cái nút chai.', 'You went back to playing with a bottle cap.')),

  M('mk_nest_tutor_unit', KID, { nest: true }, '[Câu hỏi của máy gia sư] Máy gia sư hỏi một câu bạn không biết. Nếu trả lời sai, điểm của bạn sẽ gửi thẳng về máy của cha mẹ.', '[The tutor unit’s question] The tutor unit asked a question you didn’t know. A wrong answer goes straight to your parents’ terminal.', [
    C('Đoán', 'Guess', null, null, {}, { out: [
      O(40, 'Đoán đúng. Máy phát một tiếng chuông vui vẻ. Bạn không học được gì cả.', 'Right guess. The unit chimed happily. You learned nothing.', { rep: +1 }),
      O(60, 'Sai. Tối đó cha mẹ không mắng, chỉ đăng ký thêm cho bạn hai giờ học mỗi ngày.', 'Wrong. That evening your parents didn’t scold you; they just booked you two more hours of lessons a day.', { sanity: -3 })
    ] }),
    C('Nói là con không biết', 'Say you don’t know', 'Máy ghi nhận "trung thực" và mở bài giảng. Bạn ngồi nghe hết, và lần này thì nhớ.', 'The unit logged "honest" and opened the lesson. You sat through it, and this time it stuck.', { sanity: +1, network: +1 })
  ], I('Bạn tắt máy. Nó tự bật lại sau mười giây.', 'You switched it off. It switched itself back on ten seconds later.', { sanity: -1 })),

  M('mk_nest_bird', KID, { nest: true }, '[Con chim ở ban công] Một con chim đâm vào cửa kính và nằm co giật trên ban công. Đó là con vật sống đầu tiên bạn thấy không ở trong lồng.', '[The bird on the balcony] A bird flew into the glass and lay twitching on the balcony. It’s the first living animal you’ve seen outside a cage.', [
    C('Ôm nó vào lòng', 'Hold it', 'Nó chết trong tay bạn, ấm, rồi nguội dần. Người làm lấy nó đi bằng một chiếc kẹp và lau tay cho bạn bằng cồn.', 'It died in your hands, warm, then cooling. The housekeeper took it away with tongs and wiped your hands with alcohol.', { sanity: -3, resonance: +3 }),
    C('Gọi người làm', 'Call the housekeeper', 'Người làm bảo bạn vào trong. Hôm sau tấm kính có một lớp phim mới để chim không đâm vào nữa.', 'The housekeeper sent you inside. The next day the glass had a new film on it so birds wouldn’t hit it again.', { sanity: -1 })
  ], I('Bạn đứng nhìn qua kính cho đến khi nó thôi cử động.', 'You watched through the glass until it stopped moving.', { sanity: -2 })),

  M('mk_nest_party_list', KID, { nest: true }, '[Danh sách khách mời] Mẹ hỏi bạn muốn mời ai đến sinh nhật. Đứa bạn thân nhất của bạn sống ở tầng thấp, và mẹ nói "con nên cân nhắc".', '[The guest list] Your mother asked who you want at your birthday. Your best friend lives on a lower floor, and your mother said, "you should think about that."', [
    C('Vẫn mời nó', 'Invite them anyway', 'Bạn ấy đến, mặc chiếc áo đẹp nhất, và ngồi một mình gần như cả buổi. Lúc về, bạn ấy cảm ơn bạn hai lần.', 'They came in their best shirt and sat alone most of the party. Leaving, they thanked you twice.', { sanity: +1, rep: -2, network: +1 }),
    C('Mời những đứa mẹ muốn', 'Invite the ones your mother wants', 'Bữa tiệc rất đẹp. Bạn không nhớ tên được nửa số khách.', 'The party was beautiful. You couldn’t remember half the guests’ names.', { rep: +3, sanity: -2, network: +2 })
  ], I('Bạn nói không cần tiệc. Mẹ vẫn tổ chức.', 'You said you didn’t want a party. Your mother held one anyway.', { rep: +1 })),

  M('mk_out_tooth', KID, { out: true }, '[Chiếc răng trong cát] Bạn đào được một chiếc răng to bằng bàn tay mình, vàng và nhọn. Người lớn trong trại nói đừng mang những thứ như thế về.', '[The tooth in the sand] You dug up a tooth as big as your hand, yellow and sharp. The adults in the camp say not to bring things like that back.', [
    C('Giấu nó trong túi ngủ', 'Hide it in your bedroll', 'Đêm nào bạn cũng nghe tiếng cào rất khẽ bên ngoài lều. Bạn vẫn không vứt nó đi.', 'Every night you heard soft scratching outside the tent. You still didn’t throw it away.', { sanity: -3, resonance: +5 }, { flags: ['유물'] }),
    C('Đưa cho trưởng trại', 'Give it to the camp elder', 'Ông ngắm nó rất lâu, rồi chôn nó thật sâu ở ngoài vành đai trại, và đặt một hòn đá lên trên.', 'He looked at it a long time, then buried it deep outside the camp ring and set a stone on top.', { rep: +2, sanity: +1 })
  ], I('Bạn lấp nó lại như cũ.', 'You covered it back up.')),

  M('mk_out_water', KID, { out: true }, '[Phần nước] Hôm nay mỗi người được nửa bình nước. Đứa bé nhà bên uống hết phần mình từ trưa, và giờ đang khóc.', '[The water share] Everyone gets half a flask of water today. The little one next door drank theirs by noon and is crying now.', [
    C('Chia cho nó một ngụm', 'Give it a mouthful', 'Môi bạn nứt nẻ đến sáng. Mẹ đứa bé để phần cho bạn một miếng thịt khô.', 'Your lips cracked by morning. The little one’s mother saved you a piece of dried meat.', { health: -2, sanity: +2, network: +2 }, { motif: { mercy: 1 } }),
    C('Uống hết phần mình', 'Drink your share', 'Bạn uống chậm từng ngụm, quay lưng lại để không phải nghe.', 'You drank it in slow sips, back turned so you wouldn’t have to hear.', { health: +1, sanity: -2 })
  ], I('Bạn giữ bình nước trong áo và không uống, cũng không cho.', 'You kept the flask in your shirt and neither drank nor shared.', { health: -1 })),

  // ------------------------------------------------------------ ages 7-11
  M('mc_back_parcel', CHILD, { back: true }, '[Gói hàng] Một người lạ đưa bạn 1 Ahn để mang một gói giấy báo đến tiệm sửa đồng hồ cuối phố. "Đừng mở. Đừng dừng lại."', '[The parcel] A stranger gave you 1 Ahn to carry a newspaper parcel to the watch repair shop at the end of the street. "Don’t open it. Don’t stop."', [
    C('Đi thẳng, không mở', 'Go straight there, don’t open it', null, null, { wealth: +1 }, { out: [
      O(70, 'Ông thợ đồng hồ nhận gói, không nhìn bạn, và đưa thêm nửa Ahn. Tuần sau người lạ lại tìm bạn.', 'The watchmaker took the parcel without looking at you and gave you another half Ahn. The next week the stranger came looking for you again.', { wealth: +1, heat: +2 }, { mem: 'ran_parcels' }),
      O(30, 'Giữa đường, hai người mặc áo khoác dài chặn bạn lại và lấy gói hàng. Họ không làm gì bạn. Người lạ thì không bao giờ quay lại nữa.', 'Halfway there, two men in long coats stopped you and took the parcel. They didn’t hurt you. The stranger never came back.', { sanity: -3, heat: +3 })
    ] }),
    C('Mở ra xem', 'Open it', 'Bên trong là một bàn tay người, được gói rất cẩn thận, ngón áp út vẫn đeo nhẫn. Bạn gói lại và mang đi, tay run suốt quãng đường.', 'Inside was a human hand, wrapped very neatly, a ring still on the fourth finger. You wrapped it back up and delivered it, shaking the whole way.', { wealth: +1, sanity: -8, resonance: +5 }, { scar: 'Chiếc nhẫn trên ngón áp út' }),
    C('Từ chối', 'Refuse', 'Người lạ nhún vai và gọi một đứa trẻ khác. Đứa đó tối ấy có kẹo ăn.', 'The stranger shrugged and called another kid over. That kid had sweets that night.', {})
  ], I('Bạn giả vờ không nghe thấy và chạy đi.', 'You pretended not to hear and ran.')),

  M('mc_back_school_fee', CHILD, { back: true }, '[Tiền học] Trường đòi thêm 2 Ahn tiền học kỳ này. Cha mẹ bạn ngồi trong bếp, nói chuyện rất nhỏ.', '[The school fee] The school wants another 2 Ahn this term. Your parents are sitting in the kitchen, talking very quietly.', [
    C('Nói là con muốn nghỉ học đi làm', 'Say you’d rather leave school and work', 'Cha mẹ không cãi lại. Sáng hôm sau bạn đi phụ một xe bán mì. Bạn học được cách đếm tiền thối nhanh hơn ở trường.', 'Your parents didn’t argue. The next morning you started helping at a noodle cart. You learned to count change faster than school ever taught you.', { wealth: +2, network: +2, rep: -1 }, { mem: 'left_school' }),
    C('Đi nhặt phế liệu để góp tiền', 'Scavenge scrap to make up the money', null, null, {}, { out: [
      O(60, 'Ba tuần nhặt sắt vụn đủ 2 Ahn. Bạn được đi học tiếp, móng tay đen sì cả năm.', 'Three weeks of scrap made the 2 Ahn. You stayed in school with black fingernails all year.', { health: -2, sanity: +2 }),
      O(40, 'Bạn cắt tay vào một tấm tôn gỉ. Tiền học thành tiền thuốc, và bạn vẫn phải nghỉ học.', 'You cut your hand on a rusted sheet. The school money became medicine money, and you left school anyway.', { health: -6, sanity: -3 }, { mem: 'left_school' })
    ] })
  ], I('Bạn đi ngủ sớm và giả vờ không nghe thấy gì.', 'You went to bed early and pretended you hadn’t heard.', { sanity: -1 })),

  M('mc_back_rat_lookout', CHILD, { back: true }, '[Canh cửa cho lũ Rat] Mấy đứa Rat mười bốn, mười lăm tuổi hỏi bạn có muốn đứng canh đầu hẻm cho chúng không. Mỗi tối nửa Ahn, và không ai trong khu dám bắt nạt bạn nữa.', '[Lookout for the Rats] Some Rats, fourteen or fifteen, asked if you’d keep watch at the mouth of the alley for them. Half an Ahn a night, and no one on the block would bully you again.', [
    C('Nhận', 'Say yes', null, null, { wealth: +2 }, { mem: 'rat_lookout', out: [
      O(60, 'Bạn huýt sáo mỗi khi có người lạ đi tới. Bạn không hỏi chúng làm gì trong hẻm. Cả khu bắt đầu nhìn bạn khác đi.', 'You whistled whenever a stranger came near. You never asked what they did in the alley. The whole block started to look at you differently.', { rep: -2, heat: +3 }),
      O(40, 'Đêm thứ năm, Syndicate càn qua hẻm. Bạn huýt sáo, nhưng đã muộn. Bạn chạy thoát. Hai trong ba đứa Rat thì không.', 'On the fifth night a Syndicate swept the alley. You whistled, too late. You got away. Two of the three Rats didn’t.', { sanity: -8, heat: +4, resonance: +4 })
    ] }),
    C('Từ chối', 'Say no', 'Chúng cười và gọi bạn là "con nhà ngoan". Tuần sau một đứa trong số đó giật mất cái túi của bạn.', 'They laughed and called you "good kid." The next week one of them snatched your bag.', { wealth: -1, sanity: -1 })
  ], I('Bạn nói sẽ nghĩ thêm, và từ đó đi đường khác.', 'You said you’d think about it, and took another way home after that.')),

  M('mc_back_fixer_bar', CHILD, { back: true }, '[Fixer ở quán rượu] Một Fixer Grade 3 ngồi uống một mình ở quán đầu phố, vũ khí dựng cạnh ghế. Lũ trẻ thách nhau lại gần.', '[The Fixer at the bar] A Grade 3 Fixer is drinking alone at the bar on the corner, weapon leaning against the chair. The kids are daring each other to go near.', [
    C('Đến hỏi xin xem vũ khí', 'Go and ask to see the weapon', null, null, {}, { out: [
      O(55, 'Chị ta cười, đưa cho bạn cầm thử. Nó nặng gấp đôi bạn tưởng. "Muốn làm Fixer thì ăn nhiều vào," chị nói.', 'She laughed and let you hold it. It was twice as heavy as you thought. "Want to be a Fixer? Eat more," she said.', { sanity: +3, resonance: +2 }, { flags: ['해결사동경'] }),
      O(45, 'Chị ta không quay lại, chỉ nói: "Đi chỗ khác." Giọng chị làm bạn lạnh sống lưng, và bạn đi ngay.', 'She didn’t turn round, just said, "Go away." Her voice sent a chill down your back, and you went.', { sanity: -2 })
    ] }),
    C('Đứng ngoài cửa sổ nhìn', 'Watch through the window', 'Bạn đứng đến khi chị ta trả tiền và đi. Bạn nhớ cách chị đeo vũ khí lên lưng, chỉ bằng một tay.', 'You watched until she paid and left. You remember how she slung the weapon onto her back with one hand.', { resonance: +2 }, { flags: ['해결사동경'] })
  ], I('Bạn về nhà ăn tối.', 'You went home for dinner.')),

  M('mc_any_bullied_friend', CHILD, { notNest: true, npc: 'friend' }, '[Lũ lớn chặn {friend}] Ba đứa lớn hơn dồn {friend} vào góc tường sau trường và lục túi nó. {friend} nhìn thấy bạn.', '[The big kids and {friend}] Three older kids cornered {friend} behind the school and went through their pockets. {friend} saw you.', [
    C('Lao vào', 'Charge in', null, null, {}, { out: [
      O(50, 'Bạn ăn một trận đòn, nhưng chúng bỏ đi. {friend} dìu bạn về, vừa đi vừa khóc vừa cười.', 'You took a beating, but they left. {friend} helped you home, crying and laughing at once.', { health: -5, rep: +3 }, { bond: { friend: 12 } }),
      O(50, 'Cả hai bị đánh. Hôm sau chúng chặn cả hai đứa. Hai đứa bắt đầu đi học bằng đường cống.', 'You both got beaten. The next day they cornered you both. The two of you started going to school by way of the drain.', { health: -7, sanity: -2 }, { bond: { friend: 6 } })
    ] }),
    C('Chạy đi gọi người lớn', 'Run for an adult', 'Khi bạn quay lại với bác bảo vệ, lũ kia đã đi. {friend} không sao, chỉ mất đôi giày. Nó không nhìn bạn suốt buổi chiều.', 'By the time you came back with the caretaker, they were gone. {friend} was fine, minus their shoes. They didn’t look at you all afternoon.', { sanity: -1 }, { bond: { friend: -3 } })
  ], I('Bạn quay đi như không thấy. {friend} cũng không bao giờ nhắc lại chuyện đó.', 'You turned away as if you hadn’t seen. {friend} never mentioned it either.', { sanity: -4 }, { bond: { friend: -12 } }), { tags: ['npc'] }),

  M('mc_any_window', CHILD, { notNest: true }, '[Ô cửa kính vỡ] Quả bóng của bạn bay thẳng vào cửa kính tiệm tạp hóa. Ông chủ chưa ra. Cả đám bạn đã chạy hết.', '[The broken window] Your ball went straight through the grocer’s window. The owner hasn’t come out yet. The other kids have all run.', [
    C('Đứng lại và nhận lỗi', 'Stay and own up', 'Ông chủ bắt bạn quét kính và làm không công cho ông hai tuần. Đến cuối tuần thứ hai ông cho bạn một quả táo.', 'The grocer made you sweep up the glass and work for him unpaid for two weeks. At the end of the second week he gave you an apple.', { wealth: -1, rep: +3, network: +1 }),
    C('Chạy', 'Run', null, null, {}, { out: [
      O(60, 'Không ai biết. Mỗi lần đi qua tiệm, bạn thấy miếng ván ông chủ đóng tạm vào chỗ kính vỡ.', 'No one found out. Every time you passed the shop, you saw the board he’d nailed over the hole.', { sanity: -2 }),
      O(40, 'Ông chủ nhận ra quả bóng. Tối đó ông đến nhà bạn, và cha bạn phải trả tiền kính bằng một tuần lương.', 'The grocer recognized the ball. That evening he came to your door, and your father paid for the glass with a week’s wages.', { wealth: -3, sanity: -3, rep: -2 })
    ] })
  ], I('Bạn đứng chết lặng cho đến khi ông chủ bước ra.', 'You stood frozen until the grocer came out.', { wealth: -1, rep: +1 })),

  M('mc_any_wing_test', CHILD, { notNest: true }, '[Áp phích của Wing] Một tấm áp phích mới dán đầu ngõ: Wing tìm "trẻ em có năng khiếu", kiểm tra miễn phí, gia đình được trả 5 Ahn.', '[The Wing poster] A new poster at the end of the lane: a Wing is looking for "gifted children," free testing, 5 Ahn paid to the family.', [
    C('Xin cha mẹ cho đi', 'Ask to go', null, null, {}, { out: [
      O(65, 'Bạn ngồi trong một căn phòng trắng làm bài kiểm tra cả ngày. Gia đình nhận 5 Ahn. Không ai gọi lại.', 'You spent all day in a white room doing tests. The family got the 5 Ahn. No one called back.', { wealth: +3, sanity: -2 }),
      O(35, 'Họ lấy máu, chụp mắt bạn, và giữ bạn lại thêm một đêm "để theo dõi". Bạn về nhà với một con số xăm nhỏ sau tai.', 'They drew blood, scanned your eyes, and kept you one more night "for observation." You came home with a small number tattooed behind your ear.', { wealth: +3, sanity: -5, resonance: +4 }, { scar: 'Con số sau tai', mem: 'wing_tested' })
    ] }),
    C('Xé tấm áp phích', 'Tear the poster down', 'Hôm sau có một tấm mới, dán cao hơn. Mấy đứa trẻ trong khu vẫn đi.', 'The next day there was a new one, pasted higher. Kids from the block still went.', { sanity: +1 })
  ], I('Bạn đọc hết rồi đi tiếp.', 'You read it and walked on.')),

  M('mc_nest_answers', CHILD, { nest: true }, '[Đáp án] Một bạn cùng lớp chuyền cho bạn tờ đáp án bài kiểm tra xếp hạng. Ai cũng biết thứ hạng năm nay quyết định trường cấp hai.', '[The answers] A classmate slipped you the answers to the ranking exam. Everyone knows this year’s rank decides which secondary school you get.', [
    C('Dùng', 'Use them', null, null, {}, { out: [
      O(65, 'Bạn đứng hạng nhì. Cha mẹ mở tiệc. Bạn không dám nhìn đứa đã đưa đáp án.', 'You placed second. Your parents threw a party. You couldn’t look at the kid who gave you the answers.', { rep: +5, sanity: -3 }, { mem: 'cheated_exam' }),
      O(35, 'Giám thị phát hiện. Cả hai bị hạ hạng. Cha bạn không nói chuyện với bạn suốt một tháng.', 'The proctor caught it. You were both dropped in rank. Your father didn’t speak to you for a month.', { rep: -5, sanity: -6 })
    ] }),
    C('Báo giám thị', 'Report it', 'Bạn cùng lớp bị đuổi trong tuần. Bạn được ghi một dòng "đáng tin cậy" vào hồ sơ. Không ai trong lớp ngồi cạnh bạn nữa.', 'Your classmate was expelled that week. You got a line saying "reliable" in your file. No one in class would sit next to you after that.', { rep: +3, sanity: -4, network: -2 }),
    C('Xé tờ giấy, làm bài bằng sức mình', 'Tear it up and do it yourself', 'Bạn đứng hạng mười một. Đủ, nhưng không hơn.', 'You placed eleventh. Enough, and no more.', { sanity: +2 })
  ], I('Bạn để tờ giấy trong ngăn bàn và quên mất. Hôm sau nó không còn ở đó.', 'You left it in your desk and forgot. The next day it was gone.')),

  M('mc_nest_laundry_kid', CHILD, { nest: true }, '[Đứa trẻ trong phòng giặt] Con của người giúp việc trốn trong phòng giặt. Trẻ con của người làm không được lên tầng cư dân. Nó đang ăn vụng bánh của bạn.', '[The kid in the laundry room] The maid’s child is hiding in the laundry room. Staff children aren’t allowed on resident floors. They’re eating your cake.', [
    C('Ngồi xuống ăn cùng', 'Sit down and eat with them', 'Hai đứa ăn hết đĩa bánh và kể cho nhau nghe về hai thế giới khác nhau. Bạn biết được tên của nó, và giữ bí mật đó.', 'The two of you finished the cake and told each other about two different worlds. You learned their name, and kept the secret.', { sanity: +4, network: +1 }, { mem: 'laundry_friend' }),
    C('Gọi bảo vệ', 'Call security', 'Người giúp việc bị trừ lương một tháng. Sáng hôm sau, bánh của bạn được để sẵn trên bàn như mọi khi, cắt rất ngay ngắn.', 'The maid lost a month’s pay. The next morning your cake was on the table as always, cut very neatly.', { rep: +1, sanity: -3 })
  ], I('Bạn đóng cửa phòng giặt lại và đi.', 'You closed the laundry door and left.')),

  M('mc_out_wall_climb', CHILD, { out: true }, '[Leo chân tường] Lũ trẻ trong trại thách nhau leo lên gờ đá đầu tiên của bức tường The City. Từ trên đó nhìn được vào trong.', '[Climbing the wall] The camp kids are daring each other to climb to the first stone ledge of the City wall. From up there you can see inside.', [
    C('Leo', 'Climb', null, null, {}, { out: [
      O(60, 'Bạn lên được. Bên trong là ánh đèn, nhiều đến mức không đếm được, và tiếng ồn như một con thú khổng lồ đang thở. Bạn ngồi trên gờ đá đến khi trời tối.', 'You made it. Inside were lights, too many to count, and a noise like a huge animal breathing. You sat on the ledge until dark.', { sanity: +3, resonance: +4 }, { mem: 'saw_inside_wall' }),
      O(40, 'Đá vỡ dưới tay bạn ở lưng chừng. Bạn rơi xuống, gãy hai ngón tay, và không được nhìn thấy gì.', 'The stone crumbled under your hand halfway up. You fell, broke two fingers, and saw nothing.', { health: -6, sanity: -2 })
    ] }),
    C('Đứng dưới giữ dây', 'Stay below and hold the rope', 'Đứa leo lên kể lại cho cả trại nghe suốt một tuần. Mỗi lần kể, ánh đèn trong đó lại nhiều thêm.', 'The kid who climbed told the whole camp about it for a week. Every telling, there were more lights inside.', { network: +2 })
  ], I('Bạn về lều trước khi người lớn phát hiện.', 'You went back to the tent before the adults noticed.')),

  M('mc_out_elder_ruins', CHILD, { out: true }, '[Chuyện về Ruins] Ông lão già nhất trại kể về những tầng hầm dưới Ruins, nơi có những cánh cửa không ai mở được. Người lớn đã đi ngủ hết.', '[The Ruins story] The oldest man in the camp is telling about the basements under the Ruins, where there are doors nobody can open. The adults have all gone to sleep.', [
    C('Ngồi nghe đến hết', 'Listen to the end', 'Ông kể đến khi lửa tàn. Câu cuối cùng ông nói là "có những cánh cửa không nên mở". Bạn nhớ hình dáng cánh cửa ông tả, từng chi tiết.', 'He talked until the fire died. The last thing he said was "some doors shouldn’t be opened." You remember the door he described, every detail.', { resonance: +6, sanity: -1 }, { mem: 'elder_ruins_story' }),
    C('Hỏi ông đã từng mở một cánh cửa chưa', 'Ask if he ever opened one', 'Ông im lặng rất lâu, rồi kéo ống quần lên. Từ đầu gối trở xuống là gỗ.', 'He was silent a long time, then rolled up his trouser leg. Below the knee, it was wood.', { resonance: +4, sanity: -2 })
  ], I('Bạn ngủ gật bên đống lửa.', 'You dozed off by the fire.')),

  M('mc_any_cut_photo', CHILD, {}, '[Tấm ảnh bị cắt] Dưới đáy hộp đồ của mẹ có một tấm ảnh cha mẹ hồi trẻ. Có một người thứ ba đã bị cắt đi, chỉ còn bàn tay đặt trên vai cha.', '[The cut photo] At the bottom of your mother’s box there’s a photo of your parents when they were young. A third person has been cut out; only a hand is left, resting on your father’s shoulder.', [
    C('Hỏi mẹ', 'Ask your mother', null, null, {}, { out: [
      O(50, 'Mẹ lấy lại tấm ảnh và nói đó là một người quen cũ "đã đi Office". Từ đó bạn không thấy chiếc hộp đâu nữa.', 'Your mother took the photo and said it was someone they used to know who "went to an Office." You never saw the box again.', { sanity: -2, resonance: +2 }, { mem: 'cut_photo' }),
      O(50, 'Mẹ ngồi xuống và kể. Đó là chị gái của cha. Một Syndicate bắt chị đi năm chị mười bảy tuổi. Đêm đó mẹ ngủ cạnh bạn.', 'Your mother sat down and told you. It was your father’s sister. A Syndicate took her when she was seventeen. That night your mother slept beside you.', { sanity: -3, network: +1 }, { mem: 'cut_photo' })
    ] }),
    C('Cất lại, không hỏi gì', 'Put it back and say nothing', 'Bạn để tấm ảnh lại đúng chỗ cũ. Thỉnh thoảng bạn bắt gặp cha nhìn vào khoảng trống bên cạnh mình trong những tấm ảnh khác.', 'You put the photo back exactly where it was. Sometimes you catch your father looking at the empty space beside him in other photos.', { resonance: +2 })
  ], I('Bạn đậy nắp hộp lại thật nhanh.', 'You shut the lid quickly.'))
];
