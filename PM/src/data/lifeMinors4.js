// Small scenes for the Districts that had none. Each one leans on a single fact the world data
// already gives that District and adds no Singularity of its own. Some leave a memory
// that a later scene picks up.

import { M, C, O, I, AGE } from './storyKit.js';

const { GROWN, ANY, YOUNG } = AGE;

export const LIFE_MINORS_4 = [
  // ------------------------------------------------------------ District 4 (D Corp)
  M(
    'm4_d_root_lamp',
    GROWN,
    { regions: ['D'] },
    '[Đèn rễ] Ở tầng hầm cũ của chi nhánh L Corp, người ta trồng dây leo phát sáng thay cho đèn điện. Một cựu binh chìa cho bạn một nhánh còn ướt đất, bảo nó sống lâu hơn mọi bóng đèn trong khu, miễn là đừng cho nó thấy ánh sáng thật.',
    '[Root Lamp] In the old L Corp branch cellar, glowing vines grow where the lamps used to be. A veteran holds out a cutting still wet with soil and says it outlives every bulb in the District, as long as you never show it real daylight.',
    [
      C(
        'Mua nhánh dây leo',
        'Buy the cutting',
        'Bạn trả vài đồng Ahn và mang nó về trong một cái hộp đựng giày. Đêm đó căn phòng sáng một màu xanh lạnh, đủ để đọc chữ nhỏ.',
        'You pay a few Ahn and carry it home in a shoebox. That night the room glows a cold green, bright enough for small print.',
        { wealth: -3, sanity: 2 },
        { costAhn: 3 }
      ),
      C(
        'Hỏi ông lấy nó ở đâu',
        'Ask where he got it',
        'Ông chỉ xuống cầu thang cuối hành lang, nơi một cánh cửa sắt bị hàn kín từ phía bên kia. "Dưới đó nó mọc nhanh hơn người ta cắt," ông nói, và không nói thêm gì nữa.',
        'He points down the corridor to an iron door welded shut from the far side. "It grows faster down there than anyone can cut it," he says, and adds nothing more.',
        { resonance: 3 },
        { mem: 'd_welded_door', later: [{ id: 'm4_d_welded_door', years: 3, reasonVi: 'Cánh cửa bị hàn ở tầng hầm quận D', reasonEn: 'The welded door in District 4' }] }
      ),
      C(
        'Mời ông một bữa ăn thay tiền',
        'Offer him a meal instead of coin',
        'Ông ăn chậm, nhìn từng miếng như đang đếm. Khi đứng dậy, ông để nhánh dây leo lại trên bàn và không cho bạn từ chối.',
        'He eats slowly, watching each bite as if counting it. When he stands he leaves the cutting on the table and does not let you refuse.',
        { wealth: -1, network: 2, sanity: 1 }
      )
    ],
    I('Bạn đi ngang. Phía sau, người cựu binh cất nhánh dây vào túi áo mà không nhìn theo.', 'You walk past. Behind you the veteran tucks the cutting back into his coat without watching you go.'),
    { once: true }
  ),

  M(
    'm4_d_welded_door',
    GROWN,
    { regions: ['D'], mem: 'd_welded_door' },
    '[Cánh cửa bị hàn] Ba năm sau, mối hàn trên cánh cửa sắt cuối hành lang đã nứt một đường mảnh. Qua khe nứt có mùi đất ẩm, và tiếng gì đó như nhiều người thở chậm cùng một lúc.',
    '[The Welded Door] Three years on, the weld on the iron door at the end of the corridor has split along a thin line. Through the crack comes the smell of damp earth and a sound like many people breathing slowly together.',
    [
      C(
        'Áp mắt vào khe nhìn',
        'Press your eye to the crack',
        null,
        null,
        {},
        {
          out: [
            O(50, 'Bạn thấy một khu rừng ngầm dưới ánh đèn xanh, thân cây xếp thẳng hàng như hàng quân. Một thân nghiêng về phía bạn, chỉ một chút.', 'You see an underground forest beneath green light, the trunks ranked like soldiers. One leans toward you, only slightly.', { sanity: -4, resonance: 5 }),
            O(50, 'Bạn chỉ thấy bóng tối và một chiếc rễ to bằng cánh tay đang chậm rãi lùi vào trong.', 'You see only darkness and a root as thick as an arm drawing slowly back inside.', { sanity: -2 })
          ]
        }
      ),
      C(
        'Báo cho đội trưởng khu',
        'Report it to the district captain',
        'Hai thợ hàn đến ngay trong ngày. Họ không hỏi bạn đã thấy gì, chỉ ghi tên bạn vào sổ.',
        'Two welders arrive within the day. They do not ask what you saw, only write your name in a ledger.',
        { rep: 3, network: 2 }
      ),
      C(
        'Mượn máy hàn và tự hàn lại',
        'Borrow a welder and seal it yourself',
        'Mối hàn mới xấu nhưng chắc. Đêm đó bạn ngủ ngon một cách lạ lùng, và sáng ra tay bạn có mùi đất.',
        'The new weld is ugly but firm. You sleep strangely well that night, and in the morning your hands smell of soil.',
        { health: -2, resonance: -4, rep: 1 }
      )
    ],
    I('Bạn dán một tờ giấy lên khe nứt rồi đi tiếp. Tuần sau, tờ giấy mọc rễ.', 'You stick a sheet of paper over the crack and walk on. The following week the paper grows roots.', { sanity: -1 }),
    { once: true, tags: ['callback'] }
  ),

  M(
    'm4_d_veteran_march',
    ANY,
    { regions: ['D'] },
    '[Đoàn diễu hành thưa người] Mỗi năm, các cựu binh của quận đi một vòng quanh chợ ngầm vào một ngày không ai nhớ lý do. Năm nay hàng người ngắn hơn hai chỗ, và không ai nhắc đến hai chỗ ấy.',
    '[A Thinner March] Every year the District’s veterans walk one lap around the underground market on a day nobody remembers the reason for. This year the line is two places shorter, and nobody mentions the gaps.',
    [
      C(
        'Bước vào cuối hàng',
        'Fall in at the back',
        'Một cựu binh nhét vào tay bạn tấm huy hiệu sờn chỉ để cài lên áo. Nó nặng hơn vẻ ngoài, và đi hết vòng bạn vẫn không biết nó của ai.',
        'A veteran presses a frayed badge into your hand to pin on. It is heavier than it looks, and you finish the lap without learning whose it was.',
        { rep: 3, sanity: -2, network: 2 }
      ),
      C(
        'Mang nước ra cho đoàn',
        'Bring water out to the line',
        'Họ uống chung một cái ca, mỗi người một ngụm, kể cả hai người đứng cạnh những chỗ trống. Chủ quán lặng lẽ không tính tiền nước.',
        'They drink from one shared cup, each taking a mouthful, including the two standing beside the gaps. The stall owner quietly declines to charge for the water.',
        { wealth: -1, network: 3, sanity: 1 }
      ),
      C(
        'Đóng cửa để họ đi qua',
        'Shut your door and let them pass',
        'Tiếng giày vang qua cửa gần một phút. Khi nó tắt, bạn nhận ra mình đã đếm từng bước.',
        'Boots echo past your door for nearly a minute. When it fades you realise you were counting the steps.',
        { sanity: -1 }
      )
    ],
    I('Hàng người đi qua dưới cửa sổ. Bạn thấy hai chỗ trống rõ hơn bất cứ ai trong hàng.', 'The line passes beneath your window. You notice the two gaps more clearly than any person in it.'),
    { once: true }
  ),

  // ------------------------------------------------------------ District 6 (F Corp)
  M(
    'm4_f_self_opening_lock',
    YOUNG,
    { regions: ['F'] },
    '[Ổ khóa tự bật] Ổ khóa đồng trên cổng khu nhà bật mở mỗi khi bạn đi ngang, rồi tự đóng lại khi bạn quay đầu nhìn. Bà bán rau gần đó bảo đó là lỗi của một thợ khóa vụng.',
    '[A Lock That Opens by Itself] The brass lock on your building’s gate clicks open whenever you pass, then shuts again when you turn to look. The vegetable seller nearby says it is the fault of a clumsy locksmith.',
    [
      C(
        'Đứng yên và nhìn nó',
        'Stand still and watch it',
        'Bạn đợi gần một giờ. Ổ khóa không bật nữa, và bà bán rau cười như người vừa thắng cược.',
        'You wait nearly an hour. The lock does not click again, and the seller grins like someone who has won a bet.',
        { sanity: 1 }
      ),
      C(
        'Đặt tay lên thanh chốt',
        'Rest a hand on the bolt',
        'Thanh chốt lạnh và rung nhẹ, như một con vật đang ngủ. Khi rút tay ra, ngón tay bạn có mùi kim loại suốt buổi chiều.',
        'The bolt is cold and trembles faintly, like a sleeping animal. Your fingers smell of metal for the rest of the afternoon.',
        { resonance: 4, sanity: -1 }
      ),
      C(
        'Hỏi người lớn trong dãy nhà',
        'Ask an adult in the row',
        'Người coi cổng nhìn bạn rất lâu, rồi dặn đừng kể chuyện ấy với ai ở tiệm khóa đầu phố. Ông không nói vì sao.',
        'The gatekeeper studies you for a long moment, then tells you not to mention it to anyone at the locksmith at the end of the street. He does not say why.',
        { network: 1 },
        { mem: 'f_lock_noticed' }
      )
    ],
    I('Bạn đi ngang như mọi ngày. Phía sau, ổ khóa bật mở thêm một lần nữa, không ai thấy.', 'You walk past as on any day. Behind you the lock clicks open once more, unseen.'),
    { once: true }
  ),

  M(
    'm4_f_locksmith_offer',
    [16, 45],
    { regions: ['F'] },
    '[Lời mời của tiệm khóa] Một thợ khóa lớn tuổi ở quận F hỏi bạn có muốn học nghề. Ông nói tay bạn đủ vững, và ông cần một người nghe được tiếng chốt trượt qua lớp sắt dày.',
    '[The Locksmith’s Offer] An older locksmith in District 6 asks if you want to learn the trade. He says your hands are steady enough, and he needs someone who can hear a bolt slide through thick iron.',
    [
      C(
        'Nhận làm học việc',
        'Take the apprenticeship',
        'Tháng đầu bạn chỉ lau dụng cụ và nghe. Sang tháng thứ hai ông cho bạn mở một chiếc khóa hỏng, và nó chịu mở ở lần thứ ba.',
        'The first month you only wipe tools and listen. In the second he lets you open a broken lock, and it gives way on the third try.',
        { wealth: 4, network: 3, merit: 3 },
        { mem: 'f_locksmith_taught', later: [{ id: 'm4_f_lock_commission', years: 2, reasonVi: 'Người thợ khóa già nhờ bạn thay ông', reasonEn: 'The old locksmith asks you to go in his place' }] }
      ),
      C(
        'Hỏi tiền công trước',
        'Ask about the pay first',
        'Ông đưa ra một con số không né tránh, và bạn nhận ra ông đã trả đúng giá ấy cho người trước. Người trước không còn ở tiệm.',
        'He names a figure without dodging, and you realise he paid the same to the one before you. The one before you is no longer at the shop.',
        { wealth: 2, network: 1 }
      ),
      C(
        'Từ chối, nói bạn không kiếm sống bằng việc mở khóa',
        'Decline, saying you do not open locks for a living',
        'Ông gật như đã nghe câu ấy nhiều lần. Trên đường về, bạn thử tay nắm của mỗi cánh cửa đi ngang, dù biết là vô ích.',
        'He nods as if he has heard the answer many times. On the way home you test the handle of every door you pass, though you know it is pointless.',
        { sanity: 1 }
      )
    ],
    I('Bạn nói sẽ suy nghĩ. Ông gấp tấm khăn lau lại và không nhắc đến chuyện ấy lần nữa.', 'You say you will think about it. He folds his polishing cloth and does not raise the matter again.'),
    { once: true }
  ),

  M(
    'm4_f_lock_commission',
    [18, 60],
    { regions: ['F'], mem: 'f_locksmith_taught' },
    '[Mối khách đầu tiên] Người thợ khóa già nhờ bạn thay ông đến một nhà kho cũ. Chủ nhà làm mất chìa, và ông bảo chốt bên trong là loại chỉ chịu trượt khi người ta thôi sợ nó.',
    '[The First Client] The old locksmith asks you to go in his place to a disused warehouse. The owner has lost the key, and he says the bolt inside is the kind that only slides once you stop fearing it.',
    [
      C(
        'Mở nhanh cho xong việc',
        'Open it quickly and be done',
        'Chốt trượt ngay, nhưng tiếng kêu của nó dài bất thường. Chủ nhà trả công và không dám vào trước bạn.',
        'The bolt slides at once, but its click lasts oddly long. The owner pays you and does not dare to enter before you.',
        { wealth: 4, merit: 2, sanity: -1 }
      ),
      C(
        'Áp tai vào cửa nghe trước',
        'Press your ear to the door and listen first',
        'Bên trong có một nhịp đều, chậm, như ai đó đang gõ đáp lại bước chân bạn. Bạn mở cửa theo đúng nhịp ấy, và nó mở.',
        'Inside is a slow, even beat, as if someone is tapping in answer to your steps. You open the door in that same rhythm, and it gives.',
        { merit: 3, sanity: -2, resonance: 2, network: 1 }
      ),
      C(
        'Bảo chủ nhà gọi chính ông thợ già',
        'Tell the owner to call the old locksmith himself',
        'Chủ nhà chê bạn nhát, nhưng vẫn gọi. Người thợ già đến muộn, mở cửa bằng một thao tác và không nhìn bạn.',
        'The owner calls you a coward but sends for him anyway. The old man arrives late, opens the door in a single motion, and does not look at you.',
        { rep: -1, sanity: 1 }
      )
    ],
    I('Bạn đứng trước cánh cửa một lúc rồi quay đi. Qua vai, bạn thấy chốt trượt nhẹ một nấc, như vừa thở ra.', 'You stand before the door a while and turn away. Over your shoulder you see the bolt slip one notch, as if breathing out.'),
    { once: true, tags: ['callback'] }
  ),

  // ------------------------------------------------------------ District 9 (I Corp)
  M(
    'm4_i_tapping_game',
    YOUNG,
    { regions: ['I'] },
    '[Trò đếm nhịp] Ở đoạn phố cuối khu I, người lớn cấm chơi nhạc cụ từ ngày bản nhạc kia. Trẻ con vẫn chơi trò gõ nhịp lên lan can, và đứa lớn nhất đặt luật: ai gõ ra giai điệu thì thua.',
    '[The Counting Game] On the last stretch of street in District 9, the adults have banned instruments since the day of that song. Children still play a game of tapping rhythms on the railing, and the oldest sets the rule: whoever taps out a melody loses.',
    [
      C(
        'Gõ một nhịp đều, không giai điệu',
        'Tap a steady beat with no melody',
        'Bạn thắng vòng đầu. Đứa lớn nhất nhìn bạn lâu hơn cần thiết, rồi quay sang đứa khác.',
        'You win the first round. The oldest child looks at you a moment longer than needed, then turns to someone else.',
        { rep: 1, network: 1 }
      ),
      C(
        'Cố tình gõ ra vài nốt giai điệu',
        'Tap out a few notes of melody on purpose',
        'Cả nhóm im bặt. Đứa nhỏ nhất bật khóc, còn đứa lớn nhất nhìn dọc con phố như thể có ai vừa nghe thấy.',
        'The whole group goes quiet. The smallest starts crying, and the oldest looks up and down the street as if someone might have heard.',
        { resonance: 5, sanity: -2, network: -1 }
      ),
      C(
        'Bảo mọi người thôi đi',
        'Tell everyone to stop',
        'Họ dừng, nhưng không ai nhìn bạn khi bỏ đi. Hôm sau lan can được lau sạch, như chưa từng có ai chạm vào.',
        'They stop, but no one looks at you as they leave. The next day the railing is wiped clean, as if no one had ever touched it.',
        { sanity: 1, network: -1 }
      )
    ],
    I('Bạn đứng xem. Tiếng gõ trên lan can nghe như mưa đang tìm chỗ rơi.', 'You watch. The tapping on the railing sounds like rain looking for somewhere to fall.'),
    { once: true }
  ),

  M(
    'm4_i_busker_last_note',
    ANY,
    { regions: ['I'] },
    '[Nốt cuối bỏ lửng] Một người hát rong ở phố nhạc luôn dừng trước nốt cuối của mỗi bài. Có người bỏ tiền vào hộp, có người quay mặt đi như vừa thấy ai đó làm điều xấu.',
    '[The Unsung Last Note] A street singer in the music quarter always stops before the final note of every song. Some drop coins in the box; others turn away as if they have seen someone do something wrong.',
    [
      C(
        'Bỏ vài đồng Ahn vào hộp',
        'Drop a few Ahn in the box',
        'Người hát gật đầu mà không ngừng lại. Bài kết thúc giữa chừng, và hai người đứng gần bạn thở ra cùng một lúc.',
        'The singer nods without pausing. The song ends mid-phrase, and two people standing near you let out a breath at the same moment.',
        { wealth: -2, sanity: 1 },
        { costAhn: 2 }
      ),
      C(
        'Hỏi vì sao ông không hát nốt cuối',
        'Ask why they never sing the last note',
        'Ông đáp rằng lần cuối ông hát trọn một bài, cả đoạn phố im lặng suốt một tuần. Rồi ông quay lại đếm tiền trong hộp.',
        'They answer that the last time they sang a song to its end, the whole block fell silent for a week. Then they go back to counting the coins in the box.',
        { sanity: -2, resonance: 2 }
      ),
      C(
        'Ngân nốt cuối thay ông, rất khẽ',
        'Hum the final note in their place, very quietly',
        'Âm thanh ngắn thôi, nhưng người hát rong đứng im, và cả phố như dừng lại nghe một nhịp. Khi bạn mở mắt, hộp tiền đã được đẩy về phía bạn.',
        'It is only a short sound, but the singer stands still and the whole street seems to pause for a beat. When you open your eyes the coin box has been pushed toward you.',
        { resonance: 6, sanity: -3, wealth: 2 },
        { motif: { faith: 1 } }
      )
    ],
    I('Bạn đi qua. Bài hát vẫn dừng đúng chỗ cũ, và cả phố vẫn đợi nốt còn thiếu.', 'You walk on. The song stops in the same place, and the whole street goes on waiting for the missing note.'),
    { once: true }
  ),

  // ------------------------------------------------------------ District 13 (M Corp)
  M(
    'm4_m_moonstone_waiting',
    GROWN,
    { regions: ['M'] },
    '[Phòng chờ đá trăng] Phòng khám tâm thần ở khu M đặt một khối đá trăng thô giữa phòng chờ. Người ngồi gần nó thôi run tay, người ngồi xa nó nghe tiếng đồng hồ rõ hơn bình thường.',
    '[The Moonstone Waiting Room] The psychiatric clinic in District 13 keeps a raw block of moonstone in the middle of its waiting room. Those who sit near it stop trembling; those who sit far away hear the clock more clearly than usual.',
    [
      C(
        'Ngồi sát khối đá, trả phí theo giờ',
        'Sit beside the stone and pay the hourly fee',
        'Tay bạn thôi run sau khoảng nửa giờ. Khi đứng dậy, cái bóng trên tường có vẻ mỏng hơn lúc bạn bước vào.',
        'Your hands stop shaking after about half an hour. When you stand, your shadow on the wall seems thinner than when you came in.',
        { sanity: 6, resonance: -6, wealth: -4 },
        { costAhn: 4 }
      ),
      C(
        'Ngồi cuối phòng, nghe đồng hồ',
        'Sit at the back and listen to the clock',
        'Mỗi tiếng tích kéo dài hơn tiếng trước. Một y tá bước ra nhìn bạn, rồi lặng lẽ dời bạn lại gần khối đá, không tính phí.',
        'Each tick lasts longer than the one before. A nurse steps out, looks at you, and quietly moves you closer to the stone without charge.',
        { sanity: 2, resonance: -2, network: 1 }
      ),
      C(
        'Hỏi y tá khối đá từ đâu ra',
        'Ask the nurse where the stone came from',
        'Cô trả lời bằng giọng đã nói nhiều lần: cắt từ vỉa thứ bảy, và đừng chạm vào mặt có vết nứt. Bạn không thấy mặt nào có vết nứt.',
        'She answers in the voice of someone who has said it many times: cut from the seventh seam, and never touch the cracked face. You cannot see a cracked face.',
        { sanity: -1, network: 1 }
      )
    ],
    I('Bạn nhìn khối đá một lúc rồi đi ra. Tiếng đồng hồ theo bạn đến tận cửa.', 'You look at the stone a while and leave. The clock follows you as far as the door.'),
    { once: true }
  ),

  M(
    'm4_m_night_orderly',
    [18, 60],
    { regions: ['M'] },
    '[Ca đêm của hộ lý] Người trực đêm ở một phòng khám khu M cần thêm tay khi đèn đá trăng tắt trên tầng bệnh nhân. Họ trả công bằng nửa ngày lương và một bữa ăn nóng.',
    '[The Night Orderly] The night attendant at a District 13 clinic needs another pair of hands when the moonstone lamps go out on the patient floor. They pay half a day’s wage and a hot meal.',
    [
      C(
        'Giúp giữ bệnh nhân',
        'Help hold a patient down',
        'Người bệnh không chống cự, chỉ nhắc đi nhắc lại tên một con phố bạn không biết. Đến sáng bạn vẫn nhớ nó.',
        'The patient does not struggle, only repeats the name of a street you do not know. By morning you still remember it.',
        { wealth: 3, sanity: -3, network: 1 }
      ),
      C(
        'Ngồi cạnh giường và nói chuyện',
        'Sit by the bed and talk',
        'Bạn nói về những thứ vô nghĩa như giá bánh mì và thời tiết. Người bệnh ngủ trước khi đèn bật lại, và y tá để bạn ngủ ghế đến sáng.',
        'You talk about nothing: the price of bread, the weather. The patient falls asleep before the lamps come back, and the nurse lets you sleep in the chair until morning.',
        { wealth: 2, sanity: 2, rep: 1 }
      ),
      C(
        'Từ chối, nói bạn không làm việc ở nơi như vậy',
        'Refuse, saying you do not work in places like that',
        'Người trực đêm gật mà không hỏi thêm. Qua cửa sổ, đèn trên tầng bệnh nhân tắt rồi sáng lại, hai lần.',
        'The night attendant nods without asking more. Through the window the lights on the patient floor go out and come back, twice.',
        {}
      )
    ],
    I('Bạn không đáp kịp. Người trực đêm quay vào, và cánh cửa khép nhẹ như cánh cửa một căn phòng có người đang ngủ.', 'You do not answer in time. The attendant goes back in, and the door closes softly, like the door of a room where someone is sleeping.'),
    { once: true }
  ),

  // ------------------------------------------------------------ District 17 (Q Corp)
  M(
    'm4_q_misplaced_seal',
    GROWN,
    { regions: ['Q'] },
    '[Lá bùa dán nhầm chỗ] Người bán bùa ở quận Q dán nhầm lá bùa phong vết thương lên cánh cửa phòng bạn. Từ hôm đó cánh cửa không chịu mở vào những ngày trời mưa.',
    '[A Seal on the Wrong Surface] A talisman seller in District 17 stuck a wound-sealing talisman on your door by mistake. Since then the door refuses to open on rainy days.',
    [
      C(
        'Bóc lá bùa ra',
        'Peel the talisman off',
        'Giấy vàng rách làm đôi, vết mực còn lại in hằn lên gỗ như vết bỏng. Cửa mở được, nhưng cứ mưa là bạn thấy vết ấy sẫm lại.',
        'The yellow paper tears in half and the ink burns a mark into the wood like a scald. The door opens, but whenever it rains you see the mark darken.',
        { sanity: -1, resonance: 2 }
      ),
      C(
        'Quay lại bắt người bán sửa lỗi',
        'Go back and make the seller fix it',
        'Ông ta xin lỗi mà không nhìn bạn, rồi dán thêm một lá nữa bên cạnh lá cũ. Cánh cửa mở ngay, và từ đó không bao giờ nghe lời bạn theo cách cũ.',
        'He apologises without looking at you and sticks a second talisman beside the first. The door opens at once, and never again obeys you in quite the same way.',
        { wealth: -3, rep: 1 },
        { costAhn: 3 }
      ),
      C(
        'Để vậy và leo cửa sổ vào ngày mưa',
        'Leave it and use the window on rainy days',
        'Tuần đầu là phiền, tuần thứ ba thành thói quen. Hàng xóm bắt đầu hỏi bạn học đâu ra thói quen leo cửa sổ.',
        'The first week is an annoyance, the third a habit. The neighbours start asking where you picked up the habit of climbing through windows.',
        { health: -1, network: 1 }
      )
    ],
    I('Bạn đứng trước cánh cửa đóng một lúc rồi đi vòng ra lối sau. Hôm đó trời không mưa, và cánh cửa vẫn đóng.', 'You stand before the shut door a while and go around the back. It does not rain that day, and the door stays shut anyway.'),
    { once: true }
  ),

  M(
    'm4_q_ink_debt',
    [20, 70],
    { regions: ['Q'] },
    '[Món nợ ghi bằng mực bùa] Chủ nợ cho bạn ký vào một tờ giấy vàng thay vì giấy nợ thường. Lúc bạn đặt bút xuống, cổ tay bắt đầu ngứa đúng chỗ ngón tay vừa ký.',
    '[A Debt Written in Talisman Ink] The lender has you sign a sheet of yellow paper instead of an ordinary note. As you set the pen down, your wrist starts to itch exactly where your fingers signed.',
    [
      C(
        'Trả hết ngay để bùa gỡ',
        'Pay it all off at once so the seal lifts',
        'Số tiền không lớn, nhưng khi bạn đếm xong, vệt ngứa biến mất như thể nó chỉ chờ đồng xu cuối cùng.',
        'The sum is not large, but when you finish counting the itch disappears as though it was only waiting for the last coin.',
        { wealth: -6, sanity: 1 },
        { costAhn: 6 }
      ),
      C(
        'Nhờ một Fixer đọc tờ giấy',
        'Have a Fixer read the paper',
        'Người ấy cười khô, bảo điều khoản không ghi bạn nợ gì, chỉ ghi bạn sẽ ngứa đến khi nào. Họ tính tiền xem giấy, không tính tiền gỡ.',
        'They laugh dryly and say the clauses do not state what you owe, only how long you will itch. They charge for reading the paper, not for lifting it.',
        { wealth: -2, network: 2 }
      ),
      C(
        'Gãi và coi như không có chuyện gì',
        'Scratch it and act as if nothing happened',
        'Sau ba ngày vệt ngứa lan lên tới khuỷu tay, và chủ nợ bắt đầu ghé qua mỗi sáng để hỏi thăm sức khỏe bạn.',
        'After three days the itch spreads to your elbow, and the lender starts dropping by each morning to ask after your health.',
        { health: -3, sanity: -2, heat: 4 }
      )
    ],
    I('Bạn gấp tờ giấy cất vào túi. Cổ tay ngứa suốt đêm, và sáng ra tờ giấy đã ấm.', 'You fold the paper into your pocket. Your wrist itches all night, and by morning the paper is warm.', { sanity: -1 }),
    { once: true }
  ),

  // ------------------------------------------------------------ District 22 (V Corp)
  M(
    'm4_v_two_signs',
    GROWN,
    { regions: ['V'], jobs: ['Fixer'] },
    '[Hai tấm biển một bức tường] Hai Office treo biển cạnh nhau trên cùng một bức tường ở quận V, và mỗi sáng biển của bên này lại bị che bởi biển của bên kia. Hôm nay mỗi bên cử một người đến mời bạn nhận Request.',
    '[Two Signs, One Wall] Two Offices in District 22 hang their signs side by side on one wall, and each morning one sign is covered by the other. Today each sends someone to offer you a Request.',
    [
      C(
        'Nhận việc của bên có biển bị che',
        'Take the job from the covered sign',
        'Họ trả ít hơn nhưng ghi tên bạn vào sổ trước. Sáng hôm sau biển của họ lại bị che, và người dọn dẹp nhìn bạn với vẻ biết lỗi.',
        'They pay less but write your name in the ledger first. The next morning their sign is covered again, and the man clearing up looks at you apologetically.',
        { wealth: 2, network: 2, merit: 2 }
      ),
      C(
        'Nhận việc của bên có biển nằm trên',
        'Take the job from the sign on top',
        'Tiền hậu hơn, và người giao việc khen bạn biết chọn. Bên bị che thôi chào bạn khi gặp trên phố.',
        'The pay is better and the one handing it over praises your good sense. The covered Office stops greeting you when you meet on the street.',
        { wealth: 4, network: -2, rep: 1 }
      ),
      C(
        'Từ chối cả hai và đi tiếp',
        'Turn down both and walk on',
        'Hai người nhìn nhau, rồi cùng nhìn bạn, như thể bạn vừa làm điều khó hiểu nhất trong ngày.',
        'The two glance at each other, then both at you, as if you have just done the most incomprehensible thing of the day.',
        { network: 1 }
      )
    ],
    I('Bạn đi qua giữa hai người. Cả hai giữ nụ cười thêm nửa phút, rồi bắt đầu cãi nhau về chỗ treo biển.', 'You walk between them. Both hold their smiles for another half minute, then start arguing about where to hang the signs.'),
    { once: true }
  ),

  M(
    'm4_v_bullet_wall',
    ANY,
    { regions: ['V'] },
    '[Bức tường lỗ đạn] Chủ quán mì chỉ cho bạn những lỗ đạn trên tường mà ông không chịu trát lại. "Khách muốn biết khu này từng thế nào thì nhìn vào đó," ông bảo, rồi hỏi bạn dùng loại nước dùng nào.',
    '[The Wall of Bullet Holes] The noodle stall owner points to the bullet holes in his wall that he refuses to plaster over. "If customers want to know what this District was like, they can look there," he says, then asks which broth you want.',
    [
      C(
        'Gọi một tô và hỏi chuyện đêm hôm đó',
        'Order a bowl and ask about that night',
        'Ông kể bằng giọng bằng phẳng, đếm từng lỗ theo thứ tự. Khi nước dùng của bạn nguội, ông không tính tiền tô thứ hai.',
        'He tells it in a flat voice, counting each hole in order. When your broth goes cold, he does not charge for a second bowl.',
        { wealth: -2, sanity: -1, network: 2 },
        { costAhn: 2 }
      ),
      C(
        'Gọi một tô và ăn trong im lặng',
        'Order a bowl and eat in silence',
        'Ông không nói thêm, nhưng đặt chiếc muỗng thứ hai bên cạnh dù bạn ăn một mình. Bạn dùng cả hai.',
        'He says nothing more, but sets a second spoon beside yours though you are eating alone. You use both.',
        { wealth: -2, sanity: 2 },
        { costAhn: 2 }
      ),
      C(
        'Hỏi giá mua một lỗ đạn làm kỷ niệm',
        'Ask the price of a bullet hole as a keepsake',
        'Ông nhìn bạn một lúc, rồi mời bạn ra khỏi quán. Tô nước dùng của bạn được dọn đi trước khi bạn chạm đến nó.',
        'He looks at you for a while, then asks you to leave. Your broth is cleared away before you touch it.',
        { network: -2, rep: -1 }
      )
    ],
    I('Bạn nghe xong mà không đáp. Ông lau tay vào tạp dề và quay lại nồi nước dùng, lưng thẳng hơn lúc nãy.', 'You hear him out without answering. He wipes his hands on his apron and turns back to the pot, his back straighter than before.'),
    { once: true }
  ),

  // ------------------------------------------------------------ District 24 (X Corp)
  M(
    'm4_x_third_whistle',
    [18, 60],
    { regions: ['X'] },
    '[Còi hầm thứ ba] Còi ở hầm thứ ba kéo một hồi dài rồi tắt. Các kỹ sư mặc giáp bước ra khỏi cửa hầm chậm hơn thường lệ, và không ai trong số họ tháo mũ giáp.',
    '[The Third Shaft Whistle] The whistle at the third shaft sounds one long note and stops. The armoured engineers file out of the shaft mouth more slowly than usual, and none of them removes a helmet.',
    [
      C(
        'Mang nước và băng gạc ra cửa hầm',
        'Carry water and bandages to the shaft mouth',
        'Họ nhận mà không nói gì, và một người đưa bạn mảnh vải thấm thứ gì đó sẫm màu để vứt giúp. Bạn không hỏi đó là gì.',
        'They take it without a word, and one hands you a cloth soaked in something dark to dispose of. You do not ask what it is.',
        { wealth: -1, rep: 2, network: 2, sanity: -2 }
      ),
      C(
        'Hỏi người kỹ sư đứng ngoài cùng',
        'Ask the outermost engineer what happened',
        'Giọng sau lớp giáp khàn và nhỏ: có thứ ở dưới đã thôi đáp lại tiếng gõ. Họ không nói đó là tin tốt hay xấu.',
        'The voice behind the plate is hoarse and low: something down below has stopped answering the tapping. They do not say whether that is good or bad.',
        { sanity: -3, resonance: 3 }
      ),
      C(
        'Lùi lại và nhường lối',
        'Step back and clear the way',
        'Hàng giáp đi qua bạn, kim loại cọ vào nhau nghe như một chuỗi hạt. Mùi dầu hầm bám vào áo bạn đến cuối tuần.',
        'The line of armour passes you, metal rubbing on metal like a string of beads. The smell of shaft oil clings to your coat until the end of the week.',
        {}
      )
    ],
    I('Bạn đứng xa. Một lúc sau còi hầm thứ tư cất lên, ngắn hơn, như thể đang đáp lại.', 'You keep your distance. A while later the fourth shaft’s whistle answers, shorter, as if replying.'),
    { once: true }
  ),

  M(
    'm4_x_alloy_scrap',
    GROWN,
    { regions: ['X'] },
    '[Mảnh hợp kim rơi khỏi xe] Một mảnh kim loại xám sẫm, to bằng bàn tay, rơi khỏi xe chở quặng và nằm giữa đường. Người lái chưa nhận ra, còn người gác thì đang quay lưng.',
    '[Alloy Scrap in the Road] A dark grey slab of metal the size of a hand falls from an ore wagon and lies in the road. The driver has not noticed, and the guard is facing the other way.',
    [
      C(
        'Nhặt lên và giấu vào áo',
        'Pick it up and hide it in your coat',
        'Mảnh kim loại nặng bất ngờ và lạnh xuyên qua lớp vải. Tối đó thợ rèn đầu phố trả gấp đôi số bạn nghĩ nó đáng giá, và không hỏi nó từ đâu ra.',
        'The slab is startlingly heavy and cold through the cloth. That evening the smith at the end of the street pays double what you thought it worth, and does not ask where it came from.',
        { wealth: 6, heat: 4 },
        { motif: { greed: 1 } }
      ),
      C(
        'Gọi người lái xe quay lại',
        'Call the driver back',
        'Anh ta lầm bầm cảm ơn và xếp lại mảnh kim loại như sợ nó. Người gác quay lại, nhìn bạn rất lâu, và ghi gì đó vào sổ.',
        'He mutters his thanks and loads the slab back as if afraid of it. The guard turns around, looks at you for a long time, and writes something in a ledger.',
        { rep: 3, network: 1 },
        { mem: 'x_returned_alloy', later: [{ id: 'm4_x_guard_favor', years: 2, reasonVi: 'Người gác hầm nhớ việc bạn trả mảnh kim loại', reasonEn: 'The shaft guard remembers the alloy you returned' }] }
      ),
      C(
        'Đá nó vào lề đường cho khỏi vướng',
        'Kick it to the roadside to clear the way',
        'Mảnh kim loại trượt vào rãnh nước và biến mất dưới lớp bùn. Mấy đứa trẻ ngồi gần đó nhìn bạn, rồi nhìn rãnh nước, và bắt đầu đào.',
        'The slab slides into the gutter and vanishes under mud. Some children sitting nearby look at you, then at the gutter, and start digging.',
        {}
      )
    ],
    I('Bạn đi qua. Bánh xe sau cán lên mảnh kim loại, và nó không lõm đi chút nào.', 'You walk past. The rear wheel rolls over the slab, and it does not so much as dent.'),
    { once: true }
  ),

  M(
    'm4_x_guard_favor',
    [20, 70],
    { regions: ['X'], mem: 'x_returned_alloy' },
    '[Người gác nhớ tên bạn] Hai năm sau, người gác ở cổng hầm gọi đúng tên bạn giữa đám đông và hỏi bạn có muốn nhận một ca gác phụ. Ông bảo đó là cách duy nhất ông biết để trả ơn.',
    '[The Guard Remembers You] Two years on, the guard at the shaft gate calls you by name across a crowd and asks if you want an extra watch. He says it is the only way he knows to repay a favour.',
    [
      C(
        'Nhận ca gác phụ',
        'Take the extra watch',
        'Ca đêm dài và lạnh, nhưng ông chia cho bạn nửa bình trà nóng và những lối đi nên tránh. Bạn nhớ hết các lối ấy.',
        'The night watch is long and cold, but he shares half a flask of hot tea and the passages to avoid. You remember every one of them.',
        { wealth: 4, merit: 2, health: -2 }
      ),
      C(
        'Xin ông giới thiệu cho một kỹ sư mặc giáp',
        'Ask him to introduce you to an armoured engineer',
        'Ông đưa bạn đến một người chưa bao giờ tháo mũ trước mặt ai. Người ấy nói đúng ba câu với bạn, và cả ba đều hữu ích.',
        'He takes you to someone who has never removed a helmet in front of anyone. They speak exactly three sentences to you, and all three prove useful.',
        { network: 4, rep: 2 }
      ),
      C(
        'Từ chối nhẹ nhàng',
        'Decline gently',
        'Ông gật mà không buồn. "Cái cổng này nhớ người cũng lâu như tôi," ông nói, và quay lại chỗ gác.',
        'He nods without disappointment. "This gate remembers people as long as I do," he says, and goes back to his post.',
        { sanity: 1 }
      )
    ],
    I('Bạn nói để lần sau. Ông cười, và bạn nhận ra ông biết sẽ không có lần sau.', 'You say another time. He smiles, and you realise he knows there will not be one.'),
    { once: true, tags: ['callback'] }
  ),

  // ------------------------------------------------------------ District 25 (Y Corp)
  M(
    'm4_y_coal_queue',
    GROWN,
    { regions: ['Y'] },
    '[Hàng đứng trước kho than] Kho than mở cửa muộn, và hàng đã đứng qua hai đêm. Một người trong hàng đưa bạn chiếc chăn mỏng, nhờ giữ chỗ giúp rồi đi đâu không nói.',
    '[The Coal Depot Queue] The coal depot opens late, and the line has stood through two nights. Someone in the queue hands you a thin blanket, asks you to hold their place, and leaves without saying where.',
    [
      C(
        'Giữ chỗ cho đến khi họ quay lại',
        'Hold their place until they return',
        'Họ quay lại lúc rạng sáng, chân tím lại vì lạnh, và chia cho bạn nửa số than mua được mà không nói tiếng nào.',
        'They return at dawn, feet gone purple with cold, and split the coal they bought with you without a word.',
        { health: -2, network: 3, wealth: 2 }
      ),
      C(
        'Quấn chăn và bước lên chỗ của họ',
        'Wrap yourself in the blanket and take their spot',
        'Bạn nhận than trước khi họ quay về. Khi bạn mang than ra, người ấy đứng ở cuối hàng, nhìn bạn, và không đòi lại chiếc chăn.',
        'You reach the counter before they return. When you carry the coal out, they are standing at the end of the line, watching you, and do not ask for the blanket back.',
        { wealth: 3, rep: -2, sanity: -2 }
      ),
      C(
        'Trả lại chăn và đứng cuối hàng',
        'Give the blanket back and join the end of the line',
        'Người bên cạnh chia cho bạn một mẩu bánh khô mà không hỏi tên. Bạn đứng thêm tám giờ nữa trước khi cánh cửa mở.',
        'The person beside you shares a dry heel of bread without asking your name. You stand another eight hours before the door opens.',
        { health: -3, sanity: 1, network: 2 }
      )
    ],
    I('Bạn đứng nhìn mà không nhận. Chiếc chăn được đưa cho người kế bên, và người ấy mở nó ra cũng im lặng như bạn.', 'You watch without taking it. The blanket is offered to the next person, who unfolds it as silently as you would have.'),
    { once: true }
  ),

  M(
    'm4_y_barefoot_speaker',
    ANY,
    { regions: ['Y'] },
    '[Người đi chân trần] Một người đi chân trần qua khu chợ ở quận Y, tay cầm tấm biển viết bằng than kể nhà ông phải sống thế nào mỗi mùa đông. Một nhóm người đi theo sau, tự gọi mình là Yurodiviye.',
    '[The Barefoot Speaker] A man walks barefoot through the market in District 25, holding a sign written in charcoal that says how his household survives each winter. A small crowd follows him, calling themselves Yurodiviye.',
    [
      C(
        'Đi cùng họ một đoạn',
        'Walk with them for a stretch',
        'Bạn nghe họ kể từng căn nhà theo thứ tự. Không ai bảo bạn làm gì, và điều đó khiến chân bạn mỏi hơn bạn tưởng.',
        'You listen to them list each household in order. No one tells you to do anything, which tires your legs more than you expected.',
        { rep: 2, sanity: -2, network: 2, heat: 3 },
        { motif: { mercy: 1 } }
      ),
      C(
        'Cho ông đôi giày cũ của bạn',
        'Give him your old shoes',
        'Ông cầm đôi giày một lúc rồi đặt xuống đất và đi tiếp. Một người trong đám đông nhặt chúng lên và đi theo, cầm như cầm một bằng chứng.',
        'He holds the shoes a moment, sets them on the ground, and walks on. Someone in the crowd picks them up and follows, carrying them like evidence.',
        { wealth: -1, rep: 1, sanity: 1 }
      ),
      C(
        'Quay đi vì không muốn dính vào',
        'Turn away to stay out of it',
        'Một đứa trẻ trong nhóm nhìn bạn đi ngang. Nó không nói gì, chỉ ghi nhớ mặt bạn như thêm một dòng vào sổ.',
        'A child in the group watches you pass. It says nothing, only memorises your face the way one adds a line to a ledger.',
        { rep: -1 }
      )
    ],
    I('Đám đông đi qua trước mặt bạn. Than từ tấm biển lem vào một góc áo bạn, và giặt mãi không sạch.', 'The crowd passes in front of you. Charcoal from the sign smudges a corner of your coat, and it will not wash clean.'),
    { once: true }
  ),

  // ------------------------------------------------------------ District 7 (G Corp)
  M(
    'm4_g_half_wing',
    GROWN,
    { regions: ['G'] },
    '[Nửa bộ khung cánh] Một cựu binh ở Backstreets quận G vẫn mang bộ khung cánh côn trùng, nhưng chỉ còn một nửa. Ông nhờ bạn giữ nửa kia trong lúc chợp mắt và dặn đừng để nó chạm đất.',
    '[Half a Wing Frame] A veteran in the District 7 Backstreets still wears his insect-wing frame, but only half of it remains. He asks you to hold the other half while he naps, and warns you not to let it touch the ground.',
    [
      C(
        'Giữ nó trên đùi suốt buổi',
        'Hold it across your lap all afternoon',
        'Khung cánh khẽ rung mỗi khi có người đi ngang, như đang nhớ một chuyến bay. Khi tỉnh dậy, ông lấy lại không nói cảm ơn và để cho bạn một nhúm kẹo cứng.',
        'The frame trembles whenever someone walks by, as if remembering a flight. When he wakes he takes it back without thanks and leaves you a handful of hard sweets.',
        { sanity: -1, network: 2 }
      ),
      C(
        'Hỏi vì sao nó không được chạm đất',
        'Ask why it must not touch the ground',
        'Ông nói nó sẽ cố bay đi, và ông không còn đủ chân để đuổi theo. Rồi ông ngủ, và nửa kia ngủ cùng ông.',
        'He says it will try to fly away and he no longer has the legs to chase it. Then he sleeps, and the other half sleeps with him.',
        { sanity: -2, resonance: 2 }
      ),
      C(
        'Từ chối vì sợ bị lôi vào chuyện của ông',
        'Refuse, wary of being pulled into his trouble',
        'Ông đặt nó lên một chiếc ghế gãy chân thay vì xuống đất. Khi bạn ngoái lại, ông vẫn nhìn bạn, nhưng không còn nhờ ai nữa.',
        'He sets it on a three-legged chair instead of the ground. When you look back he is still watching you, but he asks no one else.',
        { rep: -1 }
      )
    ],
    I('Bạn nói bận và đi tiếp. Phía sau, ông đứng dậy chậm, ôm nửa bộ khung cánh vào ngực như ôm một đứa trẻ.', 'You say you are busy and keep walking. Behind you he rises slowly, holding half a wing frame to his chest like a child.'),
    { once: true }
  ),

  M(
    'm4_g_weight_toll',
    GROWN,
    { regions: ['G'] },
    '[Trạm thu phí trọng lực] Người thu phí ở cổng nối khu bạn với phố chợ tính tiền theo sức nặng bạn mang theo, không theo quãng đường. Hôm nay bạn vác một bao gạo trên vai.',
    '[The Weight Toll] The collector at the gate between your district and the market street charges by the weight you carry, not the distance. Today you have a sack of rice on your shoulder.',
    [
      C(
        'Trả phí theo cân',
        'Pay the weight toll',
        'Người thu phí cân bao gạo bằng một quả cầu treo, và quả cầu nghiêng nhiều hơn bạn đoán. Số tiền không lớn, nhưng bạn nhẩm lại nó suốt quãng đường còn lại.',
        'The collector weighs the sack against a hanging sphere, and the sphere tilts more than you guessed. The sum is small, but you go over it in your head for the rest of the way.',
        { wealth: -3 },
        { costAhn: 3 }
      ),
      C(
        'Chia bao gạo làm hai lượt mang qua',
        'Split the sack and carry it through in two trips',
        'Bạn mất cả buổi sáng, và người thu phí đếm từng lượt như đang chờ bạn lỡ tay. Cuối cùng ông gật đầu và cho qua, không lấy gì.',
        'It costs you the whole morning, and the collector counts each trip as if waiting for you to slip. In the end he nods and lets you through for nothing.',
        { health: -2, sanity: 1 }
      ),
      C(
        'Cãi rằng gạo nhẹ hơn quả cầu nói',
        'Argue that the rice weighs less than the sphere says',
        'Ông mời bạn đặt cả người lên cân để so. Quả cầu im một lúc rồi nghiêng về phía bạn, và đám đông phía sau cười.',
        'He invites you to step on the scale yourself to compare. The sphere is quiet a moment, then tilts toward you, and the crowd behind laughs.',
        { rep: -2, wealth: -4 },
        { costAhn: 4 }
      )
    ],
    I('Bạn đứng thẳng dưới bao gạo cho đến khi người phía sau xô bạn tiến lên. Quả cầu rung nhẹ khi bạn đi qua.', 'You stand upright beneath the sack until the person behind pushes you forward. The sphere quivers slightly as you pass.'),
    { once: true }
  ),

  // ------------------------------------------------------------ District 16 (P Corp)
  M(
    'm4_p_larger_room',
    GROWN,
    { regions: ['P'] },
    '[Căn phòng rộng hơn tòa nhà] Cửa sổ căn phòng bạn thuê ở quận P nhìn ra một hành lang dài hơn cả tòa nhà. Chủ nhà bảo đó là điểm cộng, và nhắc bạn đừng đi sang đầu bên kia sau mười giờ đêm.',
    '[A Room Larger Than the Building] The window of your rented room in District 16 looks out on a corridor longer than the building itself. The landlord calls it a feature and reminds you not to walk to the far end after ten at night.',
    [
      C(
        'Đo hành lang bằng bước chân',
        'Pace the corridor to measure it',
        'Bạn đếm được ba trăm bước trước khi quay lại. Khi đứng cạnh cửa sổ lần nữa, bạn ngờ mình đã đếm nhầm hướng.',
        'You count three hundred steps before turning back. Standing by the window again, you suspect you counted in the wrong direction.',
        { sanity: -2, resonance: 2 }
      ),
      C(
        'Hỏi chủ nhà vì sao không nên đi sang đầu kia',
        'Ask the landlord why not the far end',
        'Ông đáp rằng chưa ai quay về kể lại, và đó là lý do đơn giản nhất ông biết. Rồi ông bảo tiền thuê tháng sau vẫn như tháng này.',
        'He answers that no one has come back to tell, which is the simplest reason he knows. Then he says next month’s rent is the same as this month’s.',
        { sanity: -2, network: 1 }
      ),
      C(
        'Kéo rèm và coi như không có hành lang',
        'Draw the curtain and pretend the corridor is not there',
        'Căn phòng nhỏ lại, ấm lên, và đêm đó bạn ngủ ngon một cách đáng ngờ. Sáng ra rèm bị kéo hé, từ phía bên trong cửa sổ.',
        'The room shrinks and warms, and you sleep suspiciously well that night. In the morning the curtain is drawn open a little, from the inside of the window.',
        { sanity: 2, resonance: 2 }
      )
    ],
    I('Bạn nhìn dọc hành lang một lúc. Một ngọn đèn ở xa tắt, và một ngọn khác, gần hơn, bật lên.', 'You look along the corridor a while. A lamp far off goes out, and another, closer, comes on.'),
    { once: true }
  ),

  M(
    'm4_p_cold_deposit',
    [20, 70],
    { regions: ['P'] },
    '[Ngăn lạnh số bảy] Một người họ hàng xa gửi bạn chìa khóa một ngăn bảo quản đông lạnh ở quận P và không nói trong đó có gì. Kèm theo chỉ có một tờ giấy ghi giờ mở cửa.',
    '[Cold Locker Seven] A distant relative sends you the key to a cryo-preservation locker in District 16 and does not say what is inside. The only note names the opening hours.',
    [
      C(
        'Đến mở ngăn',
        'Go and open the locker',
        'Hơi lạnh phả ra có mùi sắt cũ. Bên trong là một chiếc hộp gỗ, và trên nắp hộp có một dấu tay nhỏ, đã đóng băng từ rất lâu.',
        'The cold that rolls out smells of old iron. Inside is a wooden box, and on its lid a small handprint, frozen there a very long time.',
        { sanity: -4, resonance: 4 },
        { mem: 'p_cold_box', later: [{ id: 'm4_p_cold_box_returns', years: 1, reasonVi: 'Chiếc hộp gỗ từ ngăn lạnh số bảy', reasonEn: 'The wooden box from Cold Locker Seven' }] }
      ),
      C(
        'Bán chìa khóa cho người ngoài tiệm',
        'Sell the key to someone outside the locker hall',
        'Người mua trả nhanh và không mặc cả, điều lẽ ra phải khiến bạn nghi ngờ. Khi bạn đếm xong tiền, ông ta đã đi mất.',
        'The buyer pays fast and does not haggle, which should have made you suspicious. By the time you finish counting, he is gone.',
        { wealth: 5, heat: 3, sanity: -1 }
      ),
      C(
        'Gửi trả chìa khóa kèm lời từ chối',
        'Mail the key back with a note refusing it',
        'Hai tuần sau, người họ hàng gửi lại đúng chiếc chìa khóa ấy, không kèm lời nào. Lần này bạn không biết nên làm gì.',
        'Two weeks later the relative sends the same key back with no note at all. This time you do not know what to do.',
        { sanity: -1 }
      )
    ],
    I('Bạn cất chìa khóa vào ngăn kéo. Mỗi lần mở ngăn kéo, nó có vẻ lạnh hơn một chút.', 'You put the key in a drawer. Each time you open the drawer it seems a little colder.', { sanity: -1 }),
    { once: true }
  ),

  M(
    'm4_p_cold_box_returns',
    [20, 80],
    { regions: ['P'], mem: 'p_cold_box' },
    '[Chiếc hộp đã ấm] Chiếc hộp gỗ bạn mang về từ ngăn lạnh số bảy đã ấm lên qua đêm, dù nó nằm ở góc lạnh nhất căn phòng. Dấu tay nhỏ trên nắp không còn đóng băng.',
    '[The Box Is Warm] The wooden box you brought home from Cold Locker Seven has warmed overnight, though it sits in the coldest corner of the room. The small handprint on the lid is no longer frozen.',
    [
      C(
        'Mở nắp hộp',
        'Open the lid',
        null,
        null,
        {},
        {
          out: [
            O(50, 'Bên trong chỉ có một mẩu giấy ghi một cái tên và một ngày đã qua từ rất lâu. Bạn đọc nó đến lần thứ ba mới nhận ra nét chữ giống chữ của mình.', 'Inside is only a slip of paper with a name and a date long past. You read it a third time before you notice the handwriting resembles your own.', { sanity: -6, resonance: 6 }),
            O(50, 'Hộp trống, nhưng lót bằng thứ vải còn ấm mùi người. Bạn đóng nắp lại thật nhẹ, như sợ đánh thức ai.', 'The box is empty, but lined with cloth still warm and smelling of a person. You close the lid very gently, as if afraid to wake someone.', { sanity: -2, resonance: 2 })
          ]
        }
      ),
      C(
        'Mang trả lại ngăn lạnh',
        'Carry it back to the locker',
        'Nhân viên giữ ngăn nhận chiếc hộp bằng hai tay và nhìn dấu tay trên nắp rất lâu. Ông không tính phí gửi, và không hỏi bạn từ đâu có nó.',
        'The locker attendant receives the box in both hands and studies the handprint on the lid for a long time. He charges no fee, and does not ask where you got it.',
        { sanity: 1, wealth: -3 },
        { costAhn: 3 }
      ),
      C(
        'Đặt nó ra ngoài cửa sổ',
        'Set it outside the window',
        'Sáng ra chiếc hộp nằm trên bậu cửa phía trong. Bạn nhìn cái chốt cửa sổ, vẫn cài, và quyết định không hỏi ai.',
        'In the morning the box sits on the inside sill. You look at the window latch, still fastened, and decide not to ask anyone.',
        { sanity: -1, resonance: 2 }
      )
    ],
    I('Bạn để hộp nguyên chỗ cũ. Đêm đó bạn nghe một tiếng gõ nhẹ từ bên trong nắp, đúng ba lần, rồi thôi.', 'You leave the box where it is. That night you hear a soft tap from inside the lid, exactly three times, then nothing.', { sanity: -2 }),
    { once: true, tags: ['callback'] }
  ),

  // ------------------------------------------------------------ District 1 (A Corp)
  M(
    'm4_a_form_without_line',
    GROWN,
    { regions: ['A'] },
    '[Biểu mẫu thiếu một dòng] Văn phòng thuế của A Corp gửi bạn một biểu mẫu hai mươi dòng, và dòng bạn cần khai không nằm trong số đó. Hạn nộp là ngày mai.',
    '[A Form Missing One Line] A Corp’s tax office sends you a twenty-line form, and the line you need to declare is not among them. The deadline is tomorrow.',
    [
      C(
        'Viết thêm dòng đó bằng tay rồi nộp',
        'Write the missing line in by hand and file it',
        null,
        null,
        {},
        {
          out: [
            O(70, 'Nhân viên nhận biểu mẫu, nhìn dòng thêm vào rất lâu, rồi đóng dấu mà không nói gì. Bạn không chắc con dấu ấy có nghĩa gì.', 'The clerk takes the form, studies the added line for a long time, then stamps it without a word. You are not sure what the stamp means.', { rep: 1, sanity: -1 }),
            O(30, 'Nhân viên ngẩng lên, đặt biểu mẫu của bạn sang một ngăn riêng và nói người phụ trách sẽ liên hệ. Bạn nhận ra đó là một ngăn riêng thật sự.', 'The clerk looks up, sets your form in a separate tray, and says the officer in charge will be in touch. You realise it is a very separate tray indeed.', { sanity: -4, heat: 4, taboo: 1 })
          ]
        }
      ),
      C(
        'Đến văn phòng hỏi trực tiếp',
        'Go to the office and ask in person',
        'Hàng chờ dài hơn hạn nộp. Một nhân viên ghi tên bạn vào danh sách gia hạn, và bạn nhận ra mình vừa đồng ý với điều gì đó chưa đọc.',
        'The line is longer than the deadline. A clerk adds your name to an extension list, and you realise you have agreed to something you have not read.',
        { sanity: -2, network: 1, wealth: -2 }
      ),
      C(
        'Nộp biểu mẫu để trống như được phát',
        'File it blank as issued',
        'Ba ngày sau biểu mẫu quay lại với một dấu đỏ ở góc, cạnh dòng bạn không điền. Bên dưới có một dòng chữ nhỏ: cảm ơn sự trung thực của bạn.',
        'After three days the form returns with a red mark in the corner beside the line you did not fill. Beneath it, in small print: thank you for your honesty.',
        { sanity: -1 }
      )
    ],
    I('Hạn nộp trôi qua. Hôm sau một lá thư nhắc đến, lịch sự đến mức bạn thấy lạnh người.', 'The deadline passes. The next day a reminder arrives, so polite that it chills you.', { sanity: -1, wealth: -2 }),
    { once: true }
  ),

  M(
    'm4_a_neighbor_summons',
    GROWN,
    { regions: ['A'] },
    '[Hộ bên cạnh bị triệu tập] Hộ bên cạnh nhận giấy triệu tập lên tầng pháp lý của A Corp. Cả dãy hành lang nghe tiếng cửa họ đóng muộn một nhịp, rồi không nghe gì nữa.',
    '[The Neighbour Is Summoned] The household next door receives a summons to A Corp’s legal floor. The whole corridor hears their door close one beat late, then hears nothing.',
    [
      C(
        'Mang thức ăn sang cho họ',
        'Bring them food',
        'Người mở cửa nhận khay mà không mời bạn vào. Phía sau họ, một chiếc vali đã mở sẵn và chưa có gì bên trong.',
        'The person at the door takes the tray without inviting you in. Behind them a suitcase stands open and empty.',
        { wealth: -2, network: 2, sanity: -1 }
      ),
      C(
        'Đề nghị làm chứng cho họ',
        'Offer to speak as a witness for them',
        'Họ im lặng rất lâu rồi bảo bạn đừng. Giọng họ nghe như người đã tính xong cái giá thay bạn.',
        'They are silent for a long time and tell you not to. Their voice sounds like someone who has already worked out the price for you.',
        { rep: 1, sanity: -2 }
      ),
      C(
        'Đóng cửa và nghe ngóng qua tường',
        'Close your door and listen through the wall',
        'Bạn nghe tiếng bước chân đi một vòng quanh căn hộ rồi ra cửa. Cả đêm bạn không dám bật đèn, và sáng ra không ai chào ai ở hành lang.',
        'You hear footsteps pace once around the flat, then out the door. You do not dare turn on a light all night, and in the morning no one greets anyone in the corridor.',
        { sanity: -3 }
      )
    ],
    I('Bạn đi ngang cửa họ mà không dừng. Một lát sau bạn nhận ra mình đã bước nhẹ hơn thường lệ.', 'You pass their door without stopping. A moment later you realise you walked more quietly than usual.'),
    { once: true }
  ),

  // ------------------------------------------------------------ District 2 (B Corp)
  M(
    'm4_b_sensor_blink',
    GROWN,
    { regions: ['B'] },
    '[Cảm biến chớp hai lần] Cảm biến trên trần hành lang nhấp nháy hai lần khi bạn đi qua, thay vì một. Không ai trong thang máy nhắc đến chuyện đó, kể cả người vừa đi qua ngay sau bạn.',
    '[The Sensor Blinks Twice] The sensor on the corridor ceiling blinks twice as you pass, instead of once. No one in the lift mentions it, including the person who walked through right behind you.',
    [
      C(
        'Báo cho người phụ trách tòa nhà',
        'Report it to the building officer',
        'Ông ghi lại với vẻ mặt không đổi và bảo bạn là người thứ tư trong tuần. Ông không nói ba người kia đã nhận được gì.',
        'He notes it with an unchanged face and says you are the fourth this week. He does not say what the other three received.',
        { rep: 1, sanity: -2 }
      ),
      C(
        'Quay lại đi qua lần nữa để thử',
        'Walk through again to test it',
        'Lần này nó chớp một lần, và nhanh hơn lúc nãy, như người vừa chợt nhớ ra mình phải đóng một vai.',
        'This time it blinks once, and faster than before, like someone who has suddenly remembered to play a part.',
        { sanity: -3, resonance: 3 }
      ),
      C(
        'Cúi đầu chào cảm biến, thật nhẹ',
        'Nod politely at the sensor, very slightly',
        'Chẳng có gì xảy ra. Nhưng bạn đã làm thế, và ở khu B, ngay cả việc đó cũng có thể được ghi vào hồ sơ.',
        'Nothing happens. But you did it, and in District 2 even that may be entered in a file.',
        { sanity: 1 }
      )
    ],
    I('Bạn bước nhanh hơn một chút. Cảm biến không chớp lần thứ ba.', 'You walk a little faster. The sensor does not blink a third time.'),
    { once: true }
  ),

  M(
    'm4_b_returned_letter',
    GROWN,
    { regions: ['B'] },
    '[Lá thư chưa gửi] Bạn viết một lá thư rồi không gửi, để nó trong ngăn kéo. Sáng nay một nhân viên B Corp trả lại đúng lá thư ấy, đã đóng dấu đã đọc, kèm lời xin lỗi vì sự bất tiện.',
    '[The Unsent Letter] You write a letter and never send it, leaving it in a drawer. This morning a B Corp clerk returns exactly that letter, stamped as read, with an apology for the inconvenience.',
    [
      C(
        'Đốt lá thư ngay trước mặt anh ta',
        'Burn the letter in front of him',
        'Anh ta nhìn ngọn lửa như đang đo thời gian cháy, rồi ghi một con số vào sổ. Không ai nói con số ấy có nghĩa gì.',
        'He watches the flame as if timing the burn, then writes a figure in his notebook. No one says what it means.',
        { sanity: -2, heat: 3 }
      ),
      C(
        'Hỏi ai đã mở ngăn kéo của bạn',
        'Ask who opened your drawer',
        'Anh ta đáp bằng giọng lịch sự rằng không ai cần mở gì, và rằng bạn không nên coi ngăn kéo là nơi riêng tư. Anh ta cúi chào trước khi đi.',
        'He replies politely that no one needed to open anything, and that you should not think of a drawer as private. He bows before leaving.',
        { sanity: -3, resonance: 2 }
      ),
      C(
        'Nhận lại lá thư và cất sang chỗ khác',
        'Take the letter and hide it somewhere else',
        'Bạn chọn một chỗ không ai biết, và hôm sau chợt nhận ra mình không còn nhớ đã giấu nó ở đâu.',
        'You pick a place no one knows, and the next day you realise you cannot remember where you hid it.',
        { sanity: -2 }
      )
    ],
    I('Bạn nhận lá thư mà không nói gì. Nét chữ trên đó có vẻ ngay ngắn hơn lúc bạn viết.', 'You take the letter without a word. The handwriting on it looks tidier than when you wrote it.', { sanity: -2 }),
    { once: true }
  ),

  // ------------------------------------------------------------ District 3 (C Corp)
  M(
    'm4_c_masked_neighbor',
    GROWN,
    { regions: ['C'] },
    '[Hàng xóm mang mặt nạ] Người ở căn hộ đối diện đi làm về với chiếc mặt nạ sắt cất trong túi giấy. Hôm nay túi bị rách, và chiếc mặt nạ nằm trên sàn giữa hai cánh cửa.',
    '[The Masked Neighbour] The person in the flat across the corridor comes home from work with an iron mask stowed in a paper bag. Today the bag has torn, and the mask lies on the floor between your two doors.',
    [
      C(
        'Nhặt lên và đưa lại cho họ',
        'Pick it up and hand it back',
        'Chiếc mặt nạ nặng hơn bạn nghĩ và lạnh hơn hành lang. Người hàng xóm nhận nó bằng hai tay, như nhận một đứa trẻ đang ngủ.',
        'The mask is heavier than you expected and colder than the corridor. Your neighbour takes it with both hands, like taking a sleeping child.',
        { network: 2, sanity: -1 }
      ),
      C(
        'Gõ cửa gọi họ ra rồi để họ tự nhặt',
        'Knock and let them pick it up themselves',
        'Họ mở cửa trước khi bạn kịp gõ lần thứ hai và cúi nhặt rất nhanh. Rồi họ nói, nhẹ nhàng, rằng lần sau bạn không cần gõ.',
        'They open the door before your second knock and stoop to pick it up quickly. Then they say, gently, that next time you need not knock.',
        { sanity: -2, rep: 1 }
      ),
      C(
        'Bước qua và vào nhà',
        'Step over it and go inside',
        'Qua mắt mèo, bạn thấy họ đứng im trước chiếc mặt nạ rất lâu. Họ không nhặt nó cho đến khi hành lang tắt đèn.',
        'Through the peephole you see them stand motionless before the mask a long while. They do not pick it up until the corridor lights go out.',
        { sanity: -1, network: -1 }
      )
    ],
    I('Bạn nhìn một lúc rồi vào nhà. Qua khe cửa, chiếc mặt nạ hướng lên trần, và bạn thấy mình không muốn biết nó đang nhìn gì.', 'You look a moment, then go inside. Through the gap in the door the mask faces the ceiling, and you find you do not want to know what it is looking at.'),
    { once: true }
  ),

  M(
    'm4_c_tax_in_kind',
    GROWN,
    { regions: ['C'] },
    '[Biên lai thuế bằng hiện vật] Một nhân viên C Corp đến thu thuế quý này bằng hiện vật. Anh ta không lấy tiền, chỉ yêu cầu bạn chọn một món trong nhà để ghi vào biên lai.',
    '[A Tax Paid in Kind] A C Corp clerk comes to collect this quarter’s tax in kind. He does not take coin, only asks you to choose one item from your home to enter on the receipt.',
    [
      C(
        'Đưa chiếc đồng hồ để bàn',
        'Hand over the desk clock',
        'Anh ta ghi tên chiếc đồng hồ vào biên lai bằng nét chữ tròn, đều. Tối đó phòng bạn yên lặng hơn bạn nghĩ nó sẽ yên lặng.',
        'He writes the clock’s name on the receipt in round, even letters. That evening your room is quieter than you thought it would be.',
        { wealth: -2, sanity: -1 }
      ),
      C(
        'Đưa một món vô giá trị để thử anh ta',
        'Offer something worthless to test him',
        'Anh ta nhận chiếc thìa gãy bằng hai ngón tay và ghi vào biên lai không chút ngạc nhiên. Bạn nhận ra anh ta không đi tìm giá trị.',
        'He accepts the broken spoon between two fingers and records it on the receipt without surprise. You realise he is not looking for value.',
        { sanity: -2 }
      ),
      C(
        'Hỏi anh ta chuyện gì xảy ra nếu bạn từ chối',
        'Ask what happens if you refuse',
        'Anh ta chỉ đặt cây bút xuống bàn và chờ. Không có lời đe dọa nào, nhưng bạn hiểu rõ mình sẽ không muốn nghe câu trả lời.',
        'He only lays his pen on the table and waits. There is no threat in it, but you understand plainly that you would not want the answer.',
        { sanity: -3, heat: 3 }
      )
    ],
    I('Bạn đứng im trong tiếng bút chạy sột soạt trên giấy. Khi anh ta đi, biên lai đã ghi sẵn, và bạn chưa kịp chọn.', 'You stand still amid the scratch of his pen. By the time he leaves the receipt is already filled in, and you never got to choose.', { wealth: -2 }),
    { once: true }
  ),

  // ------------------------------------------------------------ The Outskirts
  M(
    'm4_o_other_lights',
    ANY,
    { regions: ['OUTSKIRTS'] },
    '[Ánh đèn của người khác] Ban đêm, ánh đèn từ phía bức tường hắt lên những đám mây thấp. Một đứa trẻ trong đoàn hỏi bạn vì sao nó sáng hơn các vì sao.',
    '[Other People’s Lights] At night the glow from the wall side lifts onto the low clouds. A child in the caravan asks you why it is brighter than the stars.',
    [
      C(
        'Nói thật: đó là đèn của The City',
        'Tell the truth: those are The City’s lights',
        'Đứa trẻ nhìn rất lâu. "Vậy họ cũng thấy các vì sao của chúng ta," nó nói, như một câu hỏi nó đã tự trả lời.',
        'The child watches a long while. "Then they can see our stars too," it says, like a question it has already answered.',
        { sanity: 1, network: 1 }
      ),
      C(
        'Bảo đó là những vì sao của người khác',
        'Say they are other people’s stars',
        'Nó gật, và bạn thấy nó không muốn gọi chúng bằng tên nào khác nữa. Cả đoàn ngủ muộn hơn mọi đêm.',
        'It nods, and you can see it no longer wants to call them by any other name. The whole caravan sleeps later than usual that night.',
        { sanity: -1, resonance: 2 }
      ),
      C(
        'Kể một câu chuyện về chuyến đi qua bức tường',
        'Tell a story about crossing the wall',
        'Bạn bịa phần lớn, và nó nhận ra ngay. Nhưng nó không nói gì, vì nó thích phần bạn bịa hơn phần thật.',
        'You invent most of it, and it notices at once. But it says nothing, because it likes your invention better than the truth.',
        { sanity: 2, rep: 1, network: 1 }
      )
    ],
    I('Bạn nhìn lên cùng đứa trẻ. Gió đổi hướng, và ánh sáng trên mây đỏ lên một nhịp.', 'You look up with the child. The wind shifts, and the glow on the cloud reddens for a beat.'),
    { once: true }
  ),

  M(
    'm4_o_water_count',
    ANY,
    { regions: ['OUTSKIRTS'] },
    '[Đếm nước] Người giữ nước của đoàn đo lại số bình còn đủ cho đến giếng kế tiếp, và con số lần này thiếu một bình. Cả đoàn nhìn nhau, rồi nhìn bạn.',
    '[Counting Water] The caravan’s water keeper recounts the jars left before the next well, and this time the count is one short. Everyone looks at each other, then at you.',
    [
      C(
        'Nhận phần uống ít hơn cho đến giếng',
        'Take a smaller share until the next well',
        'Ba ngày đầu là đau đầu và môi nứt. Ngày thứ tư người giữ nước đặt vào tay bạn một cái ca đầy mà không nói lý do.',
        'The first three days are headaches and cracked lips. On the fourth the water keeper puts a full cup in your hand without saying why.',
        { health: -4, rep: 2, network: 2 }
      ),
      C(
        'Hỏi cả đoàn bình nước mất thế nào',
        'Ask the whole caravan how the jar went missing',
        'Không ai trả lời cho đến khi một người đứng dậy, rồi người thứ hai. Cuối cùng cả đoàn chia nhau phần thiếu, và không ai nhìn ai nữa.',
        'No one answers until one person rises, then a second. In the end the whole caravan splits the shortfall, and no one looks at anyone else.',
        { network: 3, sanity: -2 }
      ),
      C(
        'Lặng lẽ uống phần của mình trước',
        'Quietly drink your own share first',
        'Nước ngọt hơn bạn nhớ. Khi ngẩng lên, bạn thấy người giữ nước đã chứng kiến, và ông chỉ gật đầu như ghi một khoản vào sổ.',
        'The water tastes sweeter than you remember. When you look up the keeper has seen, and merely nods, like entering a sum in a ledger.',
        { health: 2, rep: -3, network: -2 }
      )
    ],
    I('Bạn đứng nhìn người giữ nước đếm lại. Lần này con số đúng, nhưng không ai thở ra.', 'You watch the keeper count again. This time the figure is right, but no one exhales.'),
    { once: true }
  ),

  M(
    'm4_o_buried_door',
    [16, 60],
    { regions: ['OUTSKIRTS'] },
    '[Cửa sắt nửa chìm] Một người trong đoàn phát hiện cánh cửa sắt nửa chìm trong cát, rãnh ở mép còn mới như vừa bị ai lau sạch. Gió thổi qua khe phát ra tiếng như người đang đếm.',
    '[The Half-Buried Door] A member of the caravan finds an iron door half sunk in the sand, its edge groove oddly fresh, as if recently wiped. The wind through the crack makes a sound like someone counting.',
    [
      C(
        'Mở cửa và nhìn xuống',
        'Open the door and look down',
        'Một cầu thang đá dẫn xuống bóng tối. Ở bậc thứ ba có một dấu chân, nhỏ hơn chân bạn, mới hơn mọi thứ bạn thấy trong nhiều tuần.',
        'A stone stair leads down into the dark. On the third step is a footprint, smaller than yours, newer than anything you have seen in weeks.',
        { sanity: -4, resonance: 5 },
        { mem: 'o_ruins_door' }
      ),
      C(
        'Đánh dấu chỗ này và báo cho đoàn trưởng',
        'Mark the spot and tell the caravan leader',
        'Đoàn trưởng không bảo bạn làm gì, chỉ cho đoàn đổi hướng nửa ngày đường. Bạn hiểu đó là cách người ta trả công ở Outskirts.',
        'The leader tells you nothing, only turns the caravan half a day off course. You understand this is how pay is made in the Outskirts.',
        { rep: 2, network: 2 }
      ),
      C(
        'Phủ cát lên cửa cho kín',
        'Cover the door again with sand',
        'Cát trượt xuống khe đến chiều tối, và tiếng đếm nhỏ dần. Bạn không bao giờ biết nó đếm đến số mấy.',
        'The sand slides into the crack until evening, and the counting fades. You never learn what number it reached.',
        { sanity: 1, resonance: -2 }
      )
    ],
    I('Bạn để người khác nhìn cánh cửa. Họ đứng quanh nó rất lâu, rồi cả đoàn lên đường sớm hơn dự tính.', 'You let others look at the door. They stand around it a long time, and then the whole caravan sets out earlier than planned.'),
    { once: true }
  )
];
