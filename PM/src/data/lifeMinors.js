// ============================================================================
// MINOR CHOICES, small decisions that appear at the foot of the story while the
// year keeps moving. Unanswered, the moment passes (the `ignore` result).
//
// Every entry opens with [Title] so splitTitle extracts a distinct tag for the UI card.
// Evocative, complete, independent Project Moon story moments.
// ============================================================================

const M = (id, age, need, vi, en, choices, ignore, extra = {}) => ({ id, age, need, vi, en, choices, ignore, ...extra });
const C = (vi, en, rvi, ren, fx = {}, extra = {}) => ({ vi, en, rvi, ren, fx, ...extra });
const O = (w, rvi, ren, fx = {}, extra = {}) => ({ w, rvi, ren, fx, ...extra });
const I = (rvi, ren, fx = {}, extra = {}) => ({ vi: 'Để nó trôi qua', en: 'Let it pass', rvi, ren, fx, ...extra });

const KID = [4, 6];
const CHILD = [7, 11];
const TEEN = [12, 17];
const YOUNG = [7, 17];
const ADULT = [18, 45];
const GROWN = [18, 140];

export const LIFE_MINORS = [
  // ============================================================ childhood
  M(
    'm_k_candy',
    KID,
    {},
    '[Thanh kẹo của {friend}] Một đứa trẻ lớn con và ngổ ngáo hơn ở đầu hẻm bất ngờ lao tới giật phăng thanh kẹo trên tay {friend} ngay trước mắt bạn.',
    '[The Candy of {friend}] An older bully from the end of the alley lunged forward and snatched the candy right out of {friend}’s hand in front of you.',
    [
      C(
        'Lao vào cắn chặt tay nó',
        'Bite its hand furiously',
        'Bạn bị giáng một cú đấm thấu trời vào hốc mắt, nhưng đứa bắt nạt đau đớn buông tay làm rơi thanh kẹo xuống đất.',
        'You took a bruising blow straight to the eye, but the bully yelped in pain and dropped the candy upon the cobbles.',
        { health: -2 },
        { bond: { friend: 10 }, motif: { violence: 1 } }
      ),
      C(
        'Bẻ đôi thanh kẹo của mình chia cho {friend}',
        'Share your own candy with {friend}',
        '{friend} nghẹn ngào ăn một nửa thanh kẹo, rồi cẩn thận nhét nửa còn lại vào túi áo bạn như một lời cảm ơn thầm lặng.',
        '{friend} sniffled, eating half the candy, then gently slipped the remaining piece back into your pocket.',
        { sanity: 2 },
        { bond: { friend: 6 }, motif: { mercy: 1 } }
      )
    ],
    I('Bạn sợ hãi đứng nhìn trơ mắt. {friend} không khóc thành tiếng, chỉ lặng lẽ nhìn bạn bằng ánh mắt trĩu nặng.', 'Paralyzed, you merely watched. {friend} shed no tears, only gazing at you with a heavy, distant silence.', {}, { bond: { friend: -6 } }),
    { tags: ['npc'] }
  ),

  M(
    'm_k_pipe_noise',
    KID,
    { back: true },
    '[Tiếng cào trong ống nước] Đêm khuya thanh vắng, có âm thanh cào cấu sột soạt rợn người phát ra từ sâu bên trong đường ống nước rỉ sét. Cha mẹ bạn đang ngủ say sau một ngày làm việc kiệt sức.',
    '[Scratching Inside the Conduit] In the dead of night, an ominous, rhythmic scratching echoed from deep within the rusted drainage pipe. Your parents were fast asleep from exhaustion.',
    [
      C(
        'Đánh thức cha mẹ dậy',
        'Wake your parents',
        'Cha bạn bật dậy dỏng tai lắng nghe một thoáng, rồi lẳng lặng nhét một búi giẻ rách bịt chặt miệng ống nước. Tiếng cào cấu lập tức im bặt.',
        'Father sat up, listening closely in the dark before firmly jamming a wad of rags into the pipe’s opening. The scratching abruptly ceased.',
        { sanity: 1 }
      ),
      C(
        'Ghé sát tai lắng nghe',
        'Press your ear against the metal',
        'Có một giọng thì thầm ma quái bên trong ống đang gọi chính xác tên bạn. Bạn kinh hãi không dám kể với bất kỳ ai, và từ đó luôn khiếp sợ bóng tối.',
        'A chilling whisper inside the conduit was murmuring your exact name. You told no one, yet dreaded the shadows ever after.',
        { sanity: -4, resonance: 4 },
        { mem: 'heard_pipes' }
      )
    ],
    I('Bạn vội vã kéo chăn trùm kín đầu run rẩy. Đến khi ánh nắng ban mai rọi vào phòng thì âm thanh ấy đã biến mất.', 'You pulled the rough blanket over your ears. By the time morning mist cleared, the sound was gone.')
  ),

  M(
    'm_k_coin',
    KID,
    {},
    '[Đồng Ahn dưới gầm ghế] Bạn tình cờ nhặt được một đồng xu Ahn kim loại sáng loáng nằm lăn lóc dưới gầm ghế gỗ ở khu chợ đông đúc.',
    '[Shiny Ahn Coin under the Bench] You discovered a gleaming Ahn coin resting quietly beneath a wooden bench in the crowded alley market.',
    [
      C(
        'Mang về đưa cho mẹ',
        'Hand it to your mother',
        'Mẹ bạn dùng đồng xu ấy mua thêm được một ổ bánh mì nóng giòn. Cả gia đình có được một bữa tối no nê ấm cúng hơn thường lệ.',
        'Mother used the coin to purchase an extra warm loaf. The family enjoyed a far more comforting dinner than usual.',
        { health: 1, sanity: 1 }
      ),
      C(
        'Giấu kín làm của để dành',
        'Stash it as secret treasure',
        'Đó là đồng tiền đầu tiên trong "kho báu bí mật" của riêng bạn. Đêm nào trước khi ngủ bạn cũng lén lút lôi ra ngắm nghía.',
        'It became the founding coin of your secret treasure horde. Every night before sleep, you inspected it with pride.',
        { wealth: 1 },
        { motif: { greed: 1 } }
      )
    ],
    I('Bạn do dự để đồng xu lại chỗ cũ. Một đứa trẻ khác nhanh tay nhặt lấy nó ngay sau lưng bạn.', 'Hesitating, you left it. Another alley child snatched it up a second later.')
  ),

  M(
    'm_c_dog',
    CHILD,
    { back: true },
    '[Con chó hoang sau thùng rác] Có kẻ độc ác nào đó đã rải bả đầu độc đàn chó hoang trong khu phố. Chú chó nhỏ hay quấn quýt chạy theo bạn đang nằm co giật sùi bọt mép sau thùng rác rỉ sét.',
    '[Poisoned Pup Behind the Bins] A heartless wretch scattered poisoned bait among the block’s strays. The friendly pup that always trailed your heels lay twitching and foaming behind the dumpster.',
    [
      C(
        'Ôm chặt nó chạy đến phòng khám',
        'Sprint to the backstreet clinic',
        null,
        null,
        { wealth: -2 },
        {
          out: [
            O(55, 'Bác sĩ thú y dùng thuốc gây nôn cứu sống nó kịp thời. Chú chó hồi phục thần kỳ, và kể từ đó không bao giờ rời xa bạn nửa bước.', 'The back-alley vet pumped its stomach just in time. It survived, remaining your steadfast companion forever after.', { sanity: 4 }, { mem: 'saved_dog' }),
            O(45, 'Nó trút hơi thở cuối cùng trong vòng tay bạn trước khi kịp đến phòng khám. Bạn gạt nước mắt chôn cất nó dưới gốc cột điện đầu ngõ.', 'It drew its last breath in your arms along the way. Weeping, you buried it beneath the lamppost at the alley entrance.', { sanity: -4 })
          ],
          motif: { mercy: 1 }
        }
      ),
      C(
        'Truy lùng xem kẻ nào đã làm',
        'Track down who scattered the bait',
        'Bạn nhìn thấy lão chủ quán thịt nướng đầu phố đang lén lút rải thêm bả độc. Lão bắt gặp ánh mắt bạn trừng trừng nhìn, và nở một nụ cười lạnh tanh ghê rợn.',
        'You caught the corner grill-master scattering poisonous scraps. Noticing your glare, he offered only a chilling, sinister grin.',
        { sanity: -2 },
        { mem: 'grill_owner' }
      )
    ],
    I('Bạn quay mặt bước đi trong cay đắng. Sáng hôm sau xác chú chó đã biến mất; quán thịt nướng đầu phố lại có thêm món mới.', 'You turned away. Come morning the carcass had vanished; the butcher shop posted a fresh meat special.'),
    { sanity: -3, theme: 'animals' }
  ),

  M(
    'm_c_shoplift',
    CHILD,
    { notNest: true },
    '[Vụ trộm ở tiệm tạp hóa] {friend} rủ rê bạn cùng lẻn vào đánh cắp mấy hộp đồ ăn trong tiệm tạp hóa nhỏ của một ông lão mù lòa neo đơn.',
    '[Shoplifting the Blind Grocer] {friend} urged you to help steal canned goods from the modest corner pantry run by a blind elder.',
    [
      C(
        'Đồng ý đi cùng {friend}',
        'Tag along with {friend}',
        null,
        null,
        {},
        {
          out: [
            O(70, 'Hai đứa trót lọt ôm một túi đầy đồ hộp thơm ngon chạy thục mạng về nhà. Ông lão mù lòa không hề hay biết chuyện gì đã xảy ra.', 'You made off with a satchel of rations undetected. The blind elder never realized what had gone missing.', { health: 2, wealth: 2 }, { bond: { friend: 6 }, motif: { greed: 1 }, mem: 'stole_from_blind' }),
            O(30, 'Ông lão bất thình lình túm chặt lấy cổ tay bạn. Ông không đánh đập hay hô hoán, chỉ buồn bã hỏi: "Con đang đói lắm phải không?" Bạn xấu hổ đến mức muốn chui xuống đất.', 'The old man seized your wrist with surprising speed. He didn’t strike, merely asking softly: “Are you that starved, child?” You burned with deep shame.', { sanity: -3 }, { bond: { friend: 3 }, mem: 'blind_shopkeeper' })
          ]
        }
      ),
      C(
        'Kiên quyết ngăn {friend} lại',
        'Stop {friend} from stealing',
        '{friend} tức tối mắng bạn là kẻ hèn nhát rồi tự mình bỏ đi hành động một mình. Phải mất ba ngày sau người bạn ấy mới chịu mở lời nói chuyện lại với bạn.',
        '{friend} cursed you as a coward, storming off to do it alone. It was three cold days before they spoke a word to you again.',
        { sanity: 1, rep: 1 },
        { bond: { friend: -8 }, motif: { mercy: 1 } }
      )
    ],
    I('Bạn kiếm cớ bận việc nhà rồi lủi thủi đi về. {friend} một mình tiến vào con ngõ.', 'You muttered an excuse and walked away. {friend} slipped into the shop alone.'),
    { bond: { friend: -3 }, tags: ['npc'] }
  ),

  M(
    'm_c_blind_return',
    [9, 17],
    { mem: 'blind_shopkeeper' },
    '[Tiếng gọi của ông lão mù] Ông lão mù ở tiệm tạp hóa năm xưa tình cờ nhận ra giọng nói của bạn khi bạn đi ngang qua. Ông run rẩy cất tiếng nhờ bạn khuân vác giúp mấy thùng hàng nặng vào kho.',
    '[The Blind Grocer’s Request] The blind shopkeeper recognized your cadence as you walked past. He politely asked if you could help carry heavy crates into his storeroom.',
    [
      C(
        'Nhiệt tình vào khuân giúp ông',
        'Help him move the crates',
        'Kể từ đó cứ mỗi tuần ông đều trả cho bạn vài đồng Ahn và một hộp thịt hầm thơm ngon. Đó chính là công việc chân chính đầu tiên trong cuộc đời bạn.',
        'From that day, he paid you a few coins and a tin of stew every week. It became the very first honest work you ever held.',
        { wealth: 3, sanity: 3, network: 2 },
        { motif: { mercy: 1 } }
      ),
      C(
        'Giả vờ như không nghe thấy',
        'Pretend not to hear',
        'Ông lão cất tiếng gọi tên bạn thêm hai lần nữa trong gió lạnh, rồi thở dài lặng lẽ quay lưng vào trong tiệm.',
        'The old man called out your name twice more into the chilly breeze before sighing and retreating inside.',
        { sanity: -2 }
      )
    ],
    I('Bạn rảo bước bước đi thật nhanh qua cửa tiệm.', 'You quickened your pace and hurried past.'),
    { once: true, tags: ['callback'] }
  ),

  M(
    'm_c_grill_return',
    [10, 30],
    { mem: 'grill_owner' },
    '[Vụ bắt giữ lão chủ thịt nướng] Lão chủ quán thịt nướng năm xưa vừa bị lực lượng Fixer ập vào bắt giữ tại trận vì tội tàng trữ và buôn bán thịt người trái phép. Họ đang cần một nhân chứng địa phương đứng ra chỉ điểm.',
    '[Arrest of the Butcher] The grill-house proprietor from your childhood was raided and chained by Fixers for trafficking human meat. They sought an eyewitness to seal the indictment.',
    [
      C(
        'Dũng cảm đứng ra làm chứng',
        'Testify against the butcher',
        'Lão bị kết án tử hình và treo cổ thị chúng ngay trước cửa quán ăn. Hàng xóm láng giềng nhìn bạn bằng ánh mắt khác hẳn: một nửa kiêng nể, một nửa sợ hãi.',
        'He was sentenced to hang outside his blood-slicked shop. The neighborhood viewed you with newfound awe: half respect, half fear.',
        { rep: 5, sanity: -2, heat: 4 }
      ),
      C(
        'Giữ im lặng tuyệt đối',
        'Remain entirely silent',
        'Lão dùng tiền đút lót và được thả tự do chỉ sau ba ngày giam giữ. Quán thịt nướng ghê rợn ấy lại mở cửa hoạt động bình thường vào tuần sau.',
        'He bribed his captors and walked free after three days. The macabre butcher shop resumed operations the very next week.',
        { sanity: -3 }
      )
    ],
    I('Bạn cố tình lẩn tránh mặt các toán Fixer điều tra suốt cả tuần lễ đó.', 'You carefully avoided the investigating Fixers for the entire week.'),
    { once: true, tags: ['callback'] }
  ),

  M(
    'm_c_index_slip',
    CHILD,
    { back: true },
    '[Mảnh giấy Prescript rơi vào cửa] Một mảnh giấy nhỏ bay qua khung cửa sổ rơi vào phòng bạn, trên đó nắn nót dòng chữ mực đen: "Hãy trao chiếc giày bên trái của mẹ ngươi cho người đầu tiên gõ cửa."',
    '[The Prescript on the Sill] A parchment slip drifted through the window frame, inked in precise calligraphy: “Deliver your mother’s left shoe to the first soul who knocks upon your door.”',
    [
      C(
        'Ngoan ngoãn làm theo chỉ thị',
        'Obey the instruction',
        'Người gõ cửa là một kẻ mặc áo choàng trắng toát của Index. Hắn đón lấy chiếc giày, cúi đầu tạ lễ rồi lẳng lặng rời đi. Mẹ bạn phải đi tìm chiếc giày thất lạc suốt cả tháng trời.',
        'The knocker was a white-robed Index Proselyte. Taking the shoe, he bowed with solemn grace and departed. Mother searched in vain for a month.',
        { resonance: 5 },
        { mem: 'obeyed_prescript', motif: { faith: 1 } }
      ),
      C(
        'Châm lửa đốt cháy tờ giấy',
        'Burn the Prescript slip',
        'Đêm hôm đó có tiếng gõ cửa dồn dập vang lên suốt nhiều giờ liền trong bóng tối rợn người. Không một ai trong nhà dám ra mở then cài.',
        'That midnight, relentless knocks thudded against your door for hours in the dark. Nobody inside dared draw the bolt.',
        { sanity: -3 },
        {
          mem: 'burned_prescript',
          later: [{ id: 'm_index_remembers', years: 6, reasonVi: 'Index nhớ tờ Prescript bị đốt', reasonEn: 'The Index remembers the burned Prescript' }]
        }
      )
    ],
    I('Bạn nhét mảnh giấy xuống dưới gối rồi dần quên bẵng nó đi.', 'You tucked the slip under your straw pillow and forgot all about it.'),
    { theme: 'index' }
  ),

  M(
    'm_index_remembers',
    [12, 60],
    { mem: 'burned_prescript' },
    '[Sứ giả Index đòi nợ] Một Proselyte của Index lạnh lùng chặn đầu bạn trong con hẻm cụt. Hắn cất giọng vô cảm: "Nhiều năm trước, ngươi đã đốt một bản Prescript thiêng liêng." Hắn tuốt gươm khỏi vỏ.',
    '[The Index Claims Its Debt] An Index Proselyte blocked your exit in a dead-end alley, intoning flatly: “Years ago, you burned a sacred Prescript.” Steel sang from its scabbard.',
    [
      C(
        'Quay đầu bỏ chạy thục mạng',
        'Turn and sprint away',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Bạn luồn lách thoát thân thành công, nhưng mũi kiếm sắc lẹm của hắn đã kịp rạch một vết thương dài rát buốt trên sống lưng bạn.', 'You slipped past his guard, though his razor edge sliced a searing gash down the length of your spine.', { health: -10 }),
            O(40, 'Hắn tuyệt nhiên không buồn đuổi theo. Bạn bàng hoàng hiểu ra: Prescript hôm nay chỉ thị hắn tuốt gươm đe dọa, chứ không hề hạ lệnh tước đoạt mạng bạn.', 'He did not pursue. You realized with a shudder: his Prescript ordered only the draw of steel, not your demise.', { sanity: -4, resonance: 4 })
          ]
        }
      ),
      C(
        'Đứng lại chấp nhận trừng phạt',
        'Stand your ground and face it',
        'Hắn vung kiếm chém đứt lìa hai ngón tay trái của bạn, rồi lịch thiệp cúi đầu như năm xưa: "Món nợ xưa nay đã được thanh toán sòng phẳng."',
        'His blade severed two fingers of your left hand, after which he bowed politely: “The ancient debt is settled in full.”',
        { health: -14, sanity: -6, rep: 3 },
        { scar: 'Hai ngón tay trả cho Index', motif: { violence: 1 } }
      )
    ],
    I('Bạn đứng chết lặng vì khiếp hãi. Hắn lạnh lùng rạch một đường máu trên má bạn rồi cất bước rời đi.', 'Frozen in fear, you stood still as his blade carved your cheek before he departed.'),
    { health: -6, sanity: -4, once: true, tags: ['callback', 'danger'], theme: 'index' }
  ),

  M(
    'm_c_nest_servant',
    CHILD,
    { nest: true },
    '[Hành vi lén lút của người hầu] Người phụ nữ giúp việc trong căn hộ Nest lén giấu phần thức ăn thừa vào giỏ để mang về cứu đói cho đứa con nhỏ ở Backstreets. Chỉ có duy nhất bạn tình cờ nhìn thấy cảnh tượng đó.',
    '[The Maid’s Secret Ration] The domestic maid in your Nest apartment secretly tucked dinner scraps into her apron for her hungry child in the Backstreets. Only you caught sight of her deed.',
    [
      C(
        'Giữ kín bí mật cho cô ấy',
        'Keep the secret for her',
        'Cô ấy biết ơn vì bạn đã không vạch trần. Sáng nào người hầu cũng lén để thêm một chiếc bánh ngọt thơm phức trên bàn học của bạn.',
        'She realized you kept silent. Every morning, an extra fresh pastry appeared warmly beside your study desk.',
        { sanity: 2 },
        { motif: { mercy: 1 } }
      ),
      C(
        'Mách lại với cha mẹ',
        'Report her to your parents',
        'Cô ấy bị sa thải và tống cổ khỏi Nest ngay trong ngày. Thẻ cư trú của cô bị hủy bỏ vĩnh viễn; bạn được cha mẹ khen ngợi là một đứa trẻ "biết giữ kỷ luật".',
        'She was fired and exiled beyond the Nest perimeter that very afternoon. You were praised by your elders as a “vigilant citizen.”',
        { rep: 2, sanity: -3 },
        {
          mem: 'reported_maid',
          later: [{ id: 'm_maid_child', years: 9, reasonVi: 'Đứa con của người giúp việc bị đuổi', reasonEn: 'The dismissed maid’s child' }]
        }
      )
    ],
    I('Bạn thờ ơ không nói gì. Rồi một ngày nọ, cô ấy không bao giờ đến làm việc nữa.', 'You said nothing. Soon after, she abruptly stopped arriving.')
  ),

  M(
    'm_maid_child',
    [18, 60],
    { mem: 'reported_maid' },
    '[Cuộc tái ngộ ở cổng Nest] Một thanh niên trẻ tuổi đứng chờ bạn trước cổng kiểm soát an ninh của Nest. Người đó nhìn thẳng vào mắt bạn: "Mẹ tôi đã chết rũ xương ở Backstreets hai năm sau khi bị gia đình bạn đuổi. Tôi đến đây chỉ để nhìn rõ mặt kẻ đã tố giác mẹ tôi."',
    '[The Maid’s Child at the Gate] A grim youth waited outside the Nest security turnstiles, looking into your eyes: “My mother starved in the Backstreets two years after you reported her. I came solely to see the face of the one who condemned her.”',
    [
      C(
        'Chân thành nói lời xin lỗi',
        'Offer a sincere apology',
        'Người đó nhổ một bãi nước bọt xuống chân bạn rồi lẳng lặng quay lưng bỏ đi. Một lời xin lỗi muộn màng không bao giờ có thể hồi sinh một sinh mạng đã mất.',
        'They spat onto the asphalt by your boots and walked away. An apology does not return the dead.',
        { sanity: -2 }
      ),
      C(
        'Đưa một xấp tiền bồi thường',
        'Offer a stack of Ahn',
        'Người thanh niên nhận lấy số tiền rồi lạnh lùng quay lưng mà không thèm cảm ơn một tiếng. Bạn cảm thấy lương tâm mình càng thêm cắn rứt và nặng nề hơn.',
        'They pocketed the coin without a word of thanks. You felt an even heavier disgust festering in your gut.',
        { wealth: -6, sanity: -1 }
      ),
      C(
        'Lập tức gọi đội an ninh Nest can thiệp',
        'Call Nest security guards',
        'Lực lượng an ninh lập tức ập tới đánh đập dã man rồi lôi xềnh xệch người thanh niên ấy đi. Bạn không bao giờ biết được số phận tiếp theo của người đó sẽ ra sao.',
        'Security enforcers clubbed the youth and dragged them away. You never learned what became of them.',
        { sanity: -4, rep: 1 },
        { motif: { violence: 1 } }
      )
    ],
    I('Bạn làm ngơ như không nhìn thấy người đó và rảo bước đi thẳng qua cổng.', 'You looked straight ahead as if they did not exist, walking through the gate.'),
    { sanity: -2, once: true, tags: ['callback'] }
  ),

  // ============================================================ teenage years
  M(
    'm_t_friend_fixer',
    TEEN,
    { npc: 'friend', notNest: true },
    '[Lời rủ rê của {friend}] {friend} vừa xin được một chân chạy việc vặt cho một Văn phòng Fixer địa phương. Người bạn ấy hào hứng rủ bạn cùng tham gia kiếm tiền.',
    '[The Office Errand Offer] {friend} landed an odd-job gig at a local Fixer Office, excitedly inviting you to tag along for coin.',
    [
      C(
        'Đồng ý cùng đi làm với bạn',
        'Join {friend} at the Office',
        'Hai đứa cùng nhau chạy thư tín, cọ rửa vết máu trên sàn nhà và được trả công bằng những đồng Ahn thật. Lần đầu tiên bạn cảm thấy bản thân mình có chút giá trị giữa cuộc đời.',
        'You ran dispatches, scrubbed dried gore off floorboards, and earned crisp Ahn. For the first time, you felt your life held value.',
        { wealth: 4, network: 3, health: -1 },
        { bond: { friend: 8 }, flags: ['해결사동경'], mem: 'office_errands' }
      ),
      C(
        'Khuyên ngăn bạn mình đừng dính vào Fixer',
        'Warn them away from the Fixer life',
        '{friend} cười trừ bảo: "Mày muốn cả đời sống trong nghèo đói à?" Rồi người bạn ấy vẫn dứt khoát dấn thân vào con đường nguy hiểm một mình.',
        '{friend} scoffed: “You want to wallow in filth forever?” They marched off into the trade alone.',
        {},
        {
          bond: { friend: -4 },
          later: [{ id: 'm_friend_injured', years: 2, reasonVi: '{friend} đi làm cho Office một mình', reasonEn: '{friend} went to work for the Office alone' }]
        }
      )
    ],
    I('Bạn ngập ngừng chưa kịp trả lời thì {friend} đã quay lưng cất bước đi một mình.', 'You hesitated, and {friend} ventured into the dark alone.'),
    {
      later: [{ id: 'm_friend_injured', years: 2, reasonVi: '{friend} đi làm cho Office một mình', reasonEn: '{friend} went to work for the Office alone' }],
      tags: ['npc']
    }
  ),

  M(
    'm_friend_injured',
    [13, 22],
    { npc: 'friend' },
    '[Chiếc chân nát của {friend}] {friend} được người ta khiêng về nhà trong tình trạng một bên chân bị nghiền nát bấy sau một nhiệm vụ. Văn phòng lạnh lùng bảo đó là "tai nạn nghề nghiệp" và từ chối bồi thường viện phí.',
    '[Crushed Leg of {friend}] Comrades carried {friend} home with one leg pulverized during a contract. The Office dismissed it as an “occupational risk” and refused all clinic coverage.',
    [
      C(
        'Gom sạch tiền tiết kiệm lo cho bạn',
        'Empty your savings for a prosthetic',
        'Số tiền vừa vặn đủ để mua một chiếc chân giả cơ khí cũ kỹ. {friend} đã ôm chầm lấy bạn và bật khóc nức nở lần đầu tiên kể từ ngày quen biết.',
        'The coins barely purchased a reconditioned cybernetic limb. {friend} embraced you, weeping openly for the first time in memory.',
        { wealth: -10, sanity: 2 },
        { bond: { friend: 18 }, motif: { loyalty: 1 } }
      ),
      C(
        'Đến tận Văn phòng đòi lại công bằng',
        'Storm the Office demanding justice',
        null,
        null,
        {},
        {
          out: [
            O(40, 'Vị trưởng văn phòng tặc lưỡi ném ra 15 đồng Ahn "cho êm chuyện". Bạn mang số tiền ấy về cứu chữa cho {friend}.', 'The Office master threw fifteen Ahn on the desk “to silence the matter.” You took the coin to nurse your friend.', { wealth: 2, rep: 4 }, { bond: { friend: 12 } }),
            O(60, 'Đám bảo vệ đánh bạn gãy ba chiếc xương sườn rồi vứt xác bạn ra vỉa hè. Bạn và {friend} cùng nằm dưỡng thương trên một tấm nệm rách.', 'Bouncers broke three of your ribs and tossed you into the mud. You lay beside {friend} upon the same frayed cot.', { health: -12 }, { bond: { friend: 14 }, motif: { violence: 1 } })
          ]
        }
      )
    ],
    I('Bạn ghé thăm bạn vài lần rồi thôi. {friend} không trách móc, nhưng cũng không còn chủ động liên lạc nữa.', 'You visited a few times before drifting away. {friend} never blamed you, but ceased reaching out.'),
    { bond: { friend: -15 }, once: true, tags: ['npc', 'callback'] }
  ),

  M(
    'm_t_rival',
    TEEN,
    { noNpc: 'rival' },
    '[Kẻ đối đầu trong khu] Một đứa trẻ bằng tuổi trong khu phố luôn tìm mọi cách để hơn thua và chèn ép bạn: từ điểm số học nghề, chỗ làm thêm cho đến người mà bạn thầm thương trộm nhớ.',
    '[The Block Contender] A peer on your street constantly sought to outdo you in everything: vocational drills, odd jobs, and even the eyes of the person you fancied.',
    [
      C(
        'Hẹn ra ngõ đánh một trận ra trò',
        'Settle the score with fists',
        null,
        null,
        {},
        {
          out: [
            O(50, 'Bạn giành chiến thắng áp đảo. Nó gạt dòng máu cam trên mũi rồi gầm gừ: "Chuyện này chưa xong đâu."', 'You battered them to the ground. Wiping bloody snot, they snarled: “This score is far from settled.”', { health: -3, rep: 3 }, { npc: { role: 'rival' }, motif: { violence: 1 } }),
            O(50, 'Bạn bị nó đánh cho tơi bời hoa lá. Nó đứng sừng sững nhìn bạn nằm gục dưới đất với ánh mắt lạnh tanh không một nụ cười.', 'You took a brutal beating. They stood over your battered frame in silence, utterly without a smile.', { health: -6, sanity: -2 }, { npc: { role: 'rival' } })
          ]
        }
      ),
      C(
        'Hoàn toàn phớt lờ nó',
        'Completely ignore their antics',
        'Sự thờ ơ lạnh lùng của bạn càng khiến nó tức tối lồng lộn hơn. Kể từ đó, nó luôn rình rập và để mắt soi mói từng đường đi nước bước của bạn.',
        'Your icy indifference infuriated them further. From that day on, they tracked your every move with bitter obsession.',
        { sanity: 1 },
        { npc: { role: 'rival', bond: 30 } }
      )
    ],
    I('Bạn chưa kịp có phản ứng gì thì nó đã tự coi bạn là kẻ thù không đội trời chung.', 'Before you could react, they had already branded you their sworn adversary.'),
    { npc: { role: 'rival', bond: 25 }, once: true, tags: ['npc'] }
  ),

  M(
    'm_t_crush',
    TEEN,
    { noNpc: 'lover' },
    '[Chiếc ghế cạnh cửa sổ tiệm giặt] Có một người trạc tuổi làm việc ở xưởng giặt là đầu phố luôn chu đáo chừa sẵn cho bạn một chỗ ngồi bên cạnh khung cửa sổ thoáng đãng mỗi khi bạn ghé qua.',
    '[The Window Seat at the Laundry] Someone working the steaming machines at the corner laundry always reserved the airy window seat specifically for you.',
    [
      C(
        'Ngồi xuống và mở lời trò chuyện',
        'Sit beside them and talk',
        'Hai người say sưa trò chuyện về đủ thứ trên đời cho đến tận khi xưởng giặt đóng cửa. Lần đầu tiên bạn quên bẵng đi giờ giới nghiêm nguy hiểm.',
        'You talked until the steam vats cooled and doors locked. For the first time in memory, you forgot all about curfew.',
        { sanity: 4 },
        { npc: { role: 'lover', bond: 55 } }
      ),
      C(
        'Ngại ngùng chọn ngồi chỗ khác',
        'Choose a distant bench',
        'Người ấy buồn bã không còn chừa chiếc ghế cạnh cửa sổ cho bạn nữa.',
        'Disappointed by your distance, they ceased holding the seat for you.',
        {}
      )
    ],
    I('Bạn cứ lặng lẽ ngồi đó nhìn nhau mà không cất nên lời suốt từ mùa này sang mùa khác.', 'You sat near each other season after season without ever uttering a confession.'),
    { sanity: 1 }
  ),

  M(
    'm_t_lover_sweepers',
    [14, 30],
    { npc: 'lover' },
    '[Giờ cấm 3:05 và sự vắng mặt của {lover}] Đồng hồ đã điểm 3 giờ 05 phút sáng nhưng {lover} vẫn chưa kịp trở về nhà an toàn. Tiếng còi báo động chết chóc sắp sửa rít lên xé toạc màn đêm.',
    '[The 3:05 Siren and the Absence of {lover}] The clock hand struck 3:05 AM and {lover} had not returned. The apocalyptic curfew siren was about to howl across the tenements.',
    [
      C(
        'Liều mạng lao ra ngoài đường tìm kiếm',
        'Sprint out into the night to find them',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Bạn tìm thấy {lover} đang co ro nấp sau một chiếc xe rác và kéo người ấy chạy thục mạng về nhà đúng 3 giờ 09. Cả hai ngồi run rẩy trong bóng tối cho tới sáng.', 'You found {lover} huddled behind a dumpster and hauled them through the door at 3:09. You shivered together until dawn.', { sanity: -2, health: -2 }, { bond: { lover: 20 }, motif: { loyalty: 1 } }),
            O(40, 'Bạn bị mắc kẹt ngoài đường khi tiếng còi vang lên. Một bầy Sweeper lướt qua cách bạn chỉ hai bước chân; bạn sống sót trở về nhưng vĩnh viễn không dám kể lại những gì đã thấy.', 'The siren trapped you outside. Sweepers glided two paces past your hiding spot. You survived, but never spoke of the nightmare you witnessed.', { sanity: -10, resonance: 6 }, { bond: { lover: 15 }, scar: 'Đêm ở ngoài lúc 3:13' })
          ]
        }
      ),
      C(
        'Khóa chặt ba then cửa và cầu nguyện',
        'Bolt the heavy locks and pray',
        null,
        null,
        {},
        {
          out: [
            O(65, '{lover} vội vã đập cửa lúc 3 giờ 08. Bạn giật mở chốt ôm chầm lấy người ấy, cả hai nghẹn ngào không thốt nên lời.', '{lover} pounded the door at 3:08. You pulled them inside and held them tight, trembling without speech.', { sanity: 2 }, { bond: { lover: 6 } }),
            O(35, 'Sáng hôm sau người ta nhìn thấy đôi giày nhuốm máu của {lover} nằm trơ trọi ở đầu hẻm. Chỉ còn lại duy nhất đôi giày ấy mà thôi.', 'At daybreak, neighbors discovered {lover}’s bloody shoes abandoned at the alley corner. Only the shoes remained.', { sanity: -18 }, { npcFate: { lover: 'dead' }, scar: 'Đôi giày ở đầu hẻm' })
          ]
        }
      )
    ],
    I('Bạn bất lực ngồi chết lặng nhìn kim đồng hồ nhích dần từng giây.', 'Paralyzed by terror, you stared at the sweeping clock hand.', {}, {
      out: [
        O(60, '{lover} may mắn chạy về kịp lúc 3 giờ 09, thở không ra hơi.', '{lover} tumbled inside at 3:09, gasping for breath.', { sanity: -1 }),
        O(40, '{lover} không bao giờ trở về nhà nữa.', '{lover} never came home. Never again.', { sanity: -18 }, { npcFate: { lover: 'dead' }, scar: 'Đôi giày ở đầu hẻm' })
      ]
    }),
    { once: true, tags: ['npc', 'danger'], theme: '313' }
  ),

  M(
    'm_t_nest_exam_cheat',
    TEEN,
    { nest: true },
    '[Đề thi nội bộ Wing] Một học viên khóa trên lén lút chào bán cho bạn bộ đề thi tuyển dụng thực tập sinh Wing bí mật với mức giá 12 đồng Ahn.',
    '[Leaked Wing Examination] A senior scholar discreetly offered to sell you stolen question keys for the Wing internship assessment for twelve Ahn.',
    [
      C(
        'Bỏ tiền mua bộ đề thi',
        'Purchase the leaked test keys',
        null,
        null,
        { wealth: -4 },
        {
          out: [
            O(70, 'Điểm số của bạn đứng thứ hai toàn khu vực Nest. Ban giám sát không hề nghi ngờ bất cứ điều gì.', 'You placed second across the entire Nest sector. Examiners raised no inquiries.', { network: 6, rep: 3 }, { mem: 'cheated_exam', motif: { greed: 1 } }),
            O(30, 'Đó là bộ đề giả mạo. Bạn trượt kỳ thi thảm hại và bị liệt vào danh sách những kẻ "cần theo dõi tư cách đạo đức".', 'The papers were counterfeit. You failed disgracefully, landing on an administrative watch-list.', { rep: -4, sanity: -3 }, { mem: 'cheated_exam' })
          ]
        }
      ),
      C(
        'Tự mình vùi đầu ôn luyện',
        'Study by your own grit',
        'Bạn vượt qua kỳ thi sát nút với số điểm vừa đủ đỗ. Cha bạn không buông lời khen ngợi, chỉ khẽ gật đầu công nhận.',
        'You scraped through the threshold by your own wits. Father offered no praise, merely a stiff nod.',
        { network: 3, sanity: -2 }
      )
    ],
    I('Bạn để lỡ mất hạn chót nộp hồ sơ thi tuyển trong năm nay.', 'You let the enrollment deadline pass you by.'),
    { network: -2 }
  ),

  M(
    'm_t_out_trader',
    TEEN,
    { out: true },
    '[Chuyến buôn lậu vượt tường thành] Một tay buôn lậu từ The City đưa ra đề nghị sẽ lén đưa bạn vượt qua đại tường thành vào trong, với điều kiện bạn phải làm việc không công cho hắn trong suốt ba năm.',
    '[The Smuggler’s Passage Over the Wall] A smuggler from the City offered to haul you over the perimeter wall, demanding three years of unpaid indentured servitude.',
    [
      C(
        'Chấp nhận lời đề nghị vượt tường',
        'Accept the passage into the City',
        'Bạn chui vào một chiếc thùng hàng kín bưng vượt tường, thở cầm hơi qua một ống cao su nhỏ. The City chào đón bạn bằng mùi dầu máy và mùi tiền nồng nặc.',
        'You rode inside a cramped crate breathing through a rubber hose. The City greeted you with stench of diesel and blood-soaked money.',
        { wealth: -2, sanity: -3, network: 3 },
        { flags: ['Backstreets'], mem: 'smuggled_in' }
      ),
      C(
        'Từ chối bản giao kèo nô lệ',
        'Refuse the servitude bond',
        'Hắn nhún vai bỏ đi và chọn một đứa trẻ khác trong trại. Sang tháng sau, người ta nhìn thấy đứa bé ấy nằm chết trong bãi rác nội tạng của thành phố.',
        'He shrugged and recruited another youth. A month later, that child was discovered butchered in a gutter scrap heap.',
        { sanity: -2 }
      )
    ],
    I('Bạn ngập ngừng chưa kịp trả lời thì đoàn xe đã lăn bánh đi mất.', 'While you hesitated, the truck engines roared and vanished.')
  ),

  // ============================================================ adulthood
  M(
    'm_a_debt_neighbor',
    GROWN,
    { notNest: true },
    '[Món nợ The Middle của người hàng xóm] Người hàng xóm quỳ sụp trước cửa nhà bạn trong tuyệt vọng: băng đảng The Middle ra tối hậu thư bắt anh ta phải gom đủ 30 Ahn trước sáng mai nếu không muốn mất mạng.',
    '[The Neighbor’s Debt to the Middle] Your neighbor knelt weeping at your threshold: the Middle gave him until sunrise to scrape together thirty Ahn or surrender his life.',
    [
      C(
        'Cho anh ta vay số tiền cứu mạng',
        'Lend him the required sum',
        null,
        null,
        { wealth: -8 },
        {
          out: [
            O(45, 'Một năm sau anh ta quay lại trả đủ cả vốn lẫn lãi, kèm theo một chai rượu ngon để tạ ơn cứu mạng.', 'He returned a year later paying every coin in full, accompanied by fine spirits in gratitude.', { wealth: 6, network: 3 }),
            O(55, 'Anh ta ôm trọn số tiền của bạn bỏ trốn mất tăm. Nhưng chỉ đúng một tuần sau, các tay sai của The Middle đã tìm ra và thanh trừng anh ta trước.', 'He fled with your coins into the night. Within a week, the Middle’s enforcers hunted him down and butchered him.', { sanity: -3 })
          ],
          motif: { mercy: 1 }
        }
      ),
      C(
        'Lạnh lùng đóng sầm cửa lại',
        'Shut the door in his face',
        'Sáng hôm sau cánh cửa nhà anh ta mở toang hoác. Trong nhà không còn bóng người, chỉ có một dòng chữ sơn màu tím rợn người khắc sâu trên vách tường.',
        'Come morning, his door swung on broken hinges. The flat was empty, save for an ominous purple glyph painted on the wall.',
        { sanity: -4 }
      )
    ],
    I('Bạn giả vờ như vắng nhà và nín thở đợi anh ta bỏ đi.', 'You held your breath in silence until his weeping ceased outside.'),
    { sanity: -3, theme: 'middle' }
  ),

  M(
    'm_a_ampoule_deal',
    GROWN,
    {},
    '[Huyết thanh K Corp giá rẻ] Một gã bán rong ở chợ đen chào mời bạn mua những ống tiêm huyết thanh "chuẩn K Corp" với mức giá chỉ bằng một phần ba giá niêm yết chính thống.',
    '[Black-Market HP Ampoules] A hawker offered vials branded as “authentic K Corp restorative serum” at a third of certified clinic rates.',
    [
      C(
        'Bỏ tiền mua vài ống dự phòng',
        'Purchase several discount vials',
        null,
        null,
        { wealth: -3 },
        {
          out: [
            O(55, 'Đó là hàng thật tuồn ra từ kho hoặc ít nhất là hàng nhái chất lượng cao. Các vết thương cũ trên cơ thể bạn khép miệng lành lặn.', 'It was authentic surplus. Old scars closed smoothly without complications.', { health: 8 }),
            O(45, 'Làn da bạn sủi bọt ngứa ngáy dữ dội suốt ba ngày liền. Khi lớp mủ khô lại, nó để lại một vết sẹo dị dạng hình bông hoa trên ngực bạn.', 'Your skin blistered and bubbled for three agonizing days, leaving an eerie flower-shaped growth scarred upon your chest.', { health: -6, resonance: 4 }, { scar: 'Vết sẹo hình bông hoa' })
          ]
        }
      ),
      C(
        'Báo tin cho các Fixer tuần tra bắt giữ',
        'Report the peddler to patrolling Fixers',
        'Gã bán dạo bị tóm gọn tại trận. Nhưng đồng bọn của hắn trong đường dây đã kịp ghi nhớ rõ khuôn mặt của kẻ báo tin.',
        'The peddler was apprehended. His syndicate associates made sure to memorize your face.',
        { rep: 3, heat: 6 }
      )
    ],
    I('Bạn lắc đầu từ chối và rảo bước đi thẳng.', 'You shook your head and marched on.')
  ),

  M(
    'm_a_child_beggar',
    GROWN,
    {},
    '[Đứa trẻ bám theo xin ăn] Một đứa trẻ gầy trơ xương khoảng sáu tuổi lặng lẽ bám theo sau lưng bạn qua ba dãy phố; nó không cất tiếng xin xỏ, chỉ im lặng đi theo bạn.',
    '[The Silent Following Child] A hollow-cheeked child of six shadowed your footsteps across three avenues, asking for nothing, merely walking behind.',
    [
      C(
        'Mua cho đứa bé một bữa ăn no',
        'Buy the child a hot meal',
        'Đứa trẻ ngấu nghiến nuốt sạch phần ăn trong chớp mắt rồi cắm đầu chạy biến vào hẻm mà không nói một lời cảm ơn.',
        'The child devoured the warm bread in seconds, vanishing into the shadows without a word.',
        { wealth: -2, sanity: 3 },
        { motif: { mercy: 1 } }
      ),
      C(
        'Dắt đứa bé đến cô nhi viện Dieci',
        'Take it to the Dieci Association orphanage',
        'Các nữ tu của Hiệp hội Dieci ân cần tiếp nhận và ghi tên đứa trẻ vào sổ bộ. Đứa bé nắm chặt tay bạn cho đến tận khi bước qua cánh cổng sắt.',
        'Dieci sisters entered the child into their registry. Tiny fingers held your hand tight until the iron gates swung shut.',
        { sanity: 4, rep: 2, wealth: -1 },
        { mem: 'orphan_dieci' }
      ),
      C(
        'Quát tháo xua đuổi nó đi',
        'Harshly chase it away',
        'Đứa trẻ dừng chân ở góc phố, ngước đôi mắt vô hồn nhìn bạn một lúc rồi lủi thủi chìm vào màn đêm Backstreets.',
        'It halted at the corner, fixing you with hollow, ancient eyes before disappearing into the grime.',
        { sanity: -2 }
      )
    ],
    I('Bạn rẽ nhanh vào một khúc ngoặt hẻm tối để cắt đuôi nó.', 'You took a sharp turn into a side alley to lose it.')
  ),

  M(
    'm_a_library_letter',
    [20, 70],
    {},
    '[Bức thư mời màu xanh của Angela] Một phong bì thư màu xanh lam tao nhã nằm ngay ngắn trên gối ngủ của bạn. Đó là bức thư mời đích danh đến một Thư Viện bí ẩn, phía dưới ký tên "Angela".',
    '[The Azure Invitation of Angela] An ornate azure envelope rested neatly upon your bed pillow. It was a formal invitation to the mysterious Library, signed by “Angela.”',
    [
      C(
        'Nhận lời mời và bước qua cánh cửa Thư Viện',
        'Accept the invitation and enter the Library',
        'Bạn ký tên dưới lời mời. Cánh cửa hiện ra nơi cuối hành lang; phía sau là tiếng lật sách và một cuộc tiếp đón mà bạn chưa biết giá phải trả.',
        'You signed the invitation. A door appeared at the end of the hall; beyond it came turning pages and a reception whose price you did not yet know.',
        { sanity: -6, resonance: 8 },
        { mem: 'library_invite_accepted', motif: { curiosity: 1 } }
      ),
      C(
        'Xé nát bức thư vứt đi',
        'Tear the letter to shreds',
        'Phong bì thư tự bốc cháy thành tro tàn trước khi ngón tay bạn kịp chạm vào xé rách. Suốt cả tháng trời sau đó, bạn luôn gặp ác mộng trong từng giấc ngủ.',
        'The parchment combusted into black embers before your nails could tear it. Nightmares plagued your slumber for an entire month.',
        { sanity: -3, resonance: 3 }
      ),
      C(
        'Cất giữ bức thư lại',
        'Store the invitation in a drawer',
        'Bạn cẩn thận cất bức thư vào ngăn kéo bàn. Thỉnh thoảng trong đêm thanh vắng, nó lại nóng ran lên và phát ra những xung động tựa như nhịp tim con người.',
        'You locked the missive away. On cold midnights, it pulsed with uncanny warmth, beating like a living heart.',
        { resonance: 6 },
        { mem: 'library_invite' }
      )
    ],
    I('Bạn để nguyên bức thư nằm trên gối; đến sáng hôm sau nó đã biến mất không dấu vết.', 'You left it untouched; by daybreak, the pillow lay empty.'),
    { once: true, theme: 'library' }
  ),

  M(
    'm_a_fixer_hire',
    GROWN,
    { stat: { wealth: [30, 100] } },
    '[Kẻ theo dõi trước hiên nhà] Một kẻ lạ mặt trùm kín mặt cứ đứng chôn chân quan sát đối diện cửa nhà bạn mỗi khi hoàng hôn buông xuống. Một Văn phòng Fixer nhỏ báo giá 15 Ahn để "dọn dẹp xử lý".',
    '[The Figure Watching the Door] A cloaked watcher stood opposite your window every dusk. A local Fixer Office quoted fifteen Ahn to “clean up the nuisance.”',
    [
      C(
        'Bỏ 15 Ahn thuê Fixer xử lý',
        'Hire the Office to eliminate the threat',
        null,
        null,
        { wealth: -15 },
        {
          out: [
            O(70, 'Kẻ lạ mặt không bao giờ xuất hiện trở lại nữa. Bạn khôn ngoan không tò mò hỏi xem toán Fixer đã xử lý hắn bằng cách nào.', 'The watcher never returned. You wisely asked no questions regarding how the Fixers resolved it.', { sanity: 4 }),
            O(30, 'Văn phòng Fixer cầm trọn tiền cọc rồi ôm tiền chuồn mất. Kẻ lạ mặt vẫn đứng đó mỗi tối, và giờ đây còn giơ tay vẫy chào bạn.', 'The Office absconded with your coin. The stranger remained across the street, now waving politely toward your window.', { sanity: -5 })
          ]
        }
      ),
      C(
        'Tự mình cầm vũ khí bước ra tra hỏi',
        'Step outside armed and demand answers',
        'Hóa ra đó là một người mẹ già đáng thương đang đi tìm đứa con trai mất tích. Bà tưởng nhầm rằng con trai mình từng thuê trọ trong căn nhà của bạn.',
        'It turned out to be a grief-stricken mother hunting for her vanished boy, believing he once resided in your flat.',
        { sanity: -2, network: 2 }
      )
    ],
    I('Bạn kéo rèm cửa sổ kín mít lại để không phải nhìn thấy nữa.', 'You pulled the heavy drapes shut to block out the street.'),
    { sanity: -2 }
  ),

  M(
    'm_a_lover_propose',
    [20, 45],
    { npc: 'lover', noNpc: 'spouse' },
    '[Lời đề nghị thuê chung phòng] {lover} thẹn thùng hỏi bạn có muốn dọn về cùng thuê chung một căn phòng trọ không: "Hai người cùng chia tiền then khóa thì sẽ rẻ hơn nhiều."',
    '[The Shared Tenement Proposal] {lover} softly proposed renting a single room together: “Splitting the price of locks is far cheaper for two.”',
    [
      C(
        'Hạnh phúc đồng ý lời cầu hôn',
        'Accept and move in together',
        'Căn phòng trọ chật chội đến mức hai người phải thay phiên nhau đứng. Nhưng bạn cảm thấy hạnh phúc và bình yên hơn bất kỳ lúc nào trong đời.',
        'The room was so narrow you took turns standing, yet your heart overflowed with rare, sacred warmth.',
        { sanity: 8, wealth: 2 },
        { promote: { from: 'lover', to: 'spouse' }, bond: { lover: 10 } }
      ),
      C(
        'Ngập ngừng bảo chưa phải lúc',
        'Decline, saying the time isn’t right',
        '{lover} khẽ gật đầu mỉm cười gượng gạo, nhưng tối hôm đó người ấy thu dọn về nhà sớm hơn thường lệ với ánh mắt đượm buồn.',
        '{lover} nodded with a forced smile, retreating home earlier than usual with sorrowful eyes.',
        {},
        { bond: { lover: -10 } }
      )
    ],
    I('Bạn lúng túng đánh trống lảng sang chuyện khác. {lover} không bao giờ nhắc lại nữa.', 'You awkwardly changed the topic. {lover} never broached the subject again.'),
    { bond: { lover: -6 }, once: true, tags: ['npc'] }
  ),

  M(
    'm_a_spouse_child',
    [22, 45],
    { npc: 'spouse', noNpc: 'child' },
    '[Lời thì thầm thiêng liêng của {lover}] {lover} nép vào lòng bạn và thì thào rất khẽ: "Chúng mình sắp có con rồi anh/em à."',
    '[The Sacred Whisper of {lover}] {lover} nestled against your chest, whispering softly: “We are going to have a child.”',
    [
      C(
        'Vỡ òa trong niềm vui sướng',
        'Rejoice with deep emotion',
        'Bạn lập tức đăng ký làm thêm các ca đêm và chắt bóp từng đồng Ahn một. Lần đầu tiên trong đời, bạn thực sự sợ hãi cái chết.',
        'You took on overtime shifts, counting every single coin. For the first time in memory, you truly feared death.',
        { sanity: 5, wealth: -4 },
        { npc: { role: 'child', bond: 80 } }
      ),
      C(
        'Lo lắng cho tương lai',
        'Shudder with anxious dread',
        'Bạn ngồi đếm đi đếm lại số then khóa trên cánh cửa suốt cả đêm dài. Đến sáng, bạn quyết định trích tiền mua thêm hai chiếc khóa nữa.',
        'You spent all night counting the iron bolts on the door. By sunrise, you resolved to purchase two more padlocks.',
        { sanity: -2, wealth: -2 },
        { npc: { role: 'child', bond: 65 } }
      )
    ],
    I('Bạn chỉ lặng lẽ ôm chặt lấy {lover} vào lòng trong im lặng nghẹn ngào.', 'You held {lover} tight in your arms without speaking a single word.'),
    { npc: { role: 'child', bond: 70 }, once: true, tags: ['npc'] }
  ),

  M(
    'm_a_rival_rise',
    [18, 50],
    { npc: 'rival' },
    '[Sự thăng tiến của {rival}] Bạn bàng hoàng hay tin {rival} vừa được bổ nhiệm thăng chức vào chính vị trí danh giá mà bấy lâu nay bạn hằng ao ước và nỗ lực.',
    '[The Rise of {rival}] News reached you that {rival} had been promoted into the exact prestigious post you had long strived to secure.',
    [
      C(
        'Đến trực tiếp chúc mừng đối thủ',
        'Offer candid congratulations',
        '{rival} nhìn bạn chăm chú hồi lâu rồi tự tay rót mời bạn một ly rượu: "Lần tới chắc chắn sẽ đến lượt mày đấy."',
        '{rival} scrutinized you for a long moment before pouring you a drink: “Your turn next, surely.”',
        { sanity: 2, network: 3 },
        { bond: { rival: 15 } }
      ),
      C(
        'Tung tin đồn bôi nhọ sau lưng',
        'Spread vicious rumors to ruin them',
        null,
        null,
        {},
        {
          out: [
            O(50, 'Tin đồn thất thiệt lan truyền với tốc độ chóng mặt. {rival} bị cấp trên điều chuyển công tác; bạn giành chiến thắng nhưng thấy lòng đắng ngắt.', 'The slander caught fire. {rival} was reassigned in disgrace; you claimed the victory, yet your mouth tasted of bitter ash.', { rep: 3, sanity: -3 }, { bond: { rival: -25 }, motif: { greed: 1 }, mem: 'ruined_rival' }),
            O(50, '{rival} nhanh chóng phát hiện ra ai là kẻ đâm sau lưng mình. Đúng một tuần sau đó, căn nhà trọ của bạn bị phóng hỏa thiêu rụi trong đêm.', '{rival} swiftly traced the knife in the dark back to you. A week later, your apartment was torched in the dead of night.', { wealth: -10, health: -4 }, { bond: { rival: -30 }, mem: 'ruined_rival' })
          ]
        }
      )
    ],
    I('Bạn cắn răng nuốt cơn tức giận cay đắng vào tận đáy lòng.', 'You swallowed the bitter fury down into your gut.'),
    { sanity: -2, tags: ['npc'] }
  ),

  M(
    'm_a_rival_nemesis',
    [22, 70],
    { mem: 'ruined_rival', npc: 'rival' },
    '[Họng súng báo thù dưới mưa] {rival} đứng sừng sững chờ bạn dưới cơn mưa tầm tã, tay lăm lăm một khẩu súng của Thumb: "Mày đã cướp đoạt tất cả mọi thứ của tao."',
    '[The Thumb Pistol in the Downpour] {rival} stood waiting for you in the pouring rain, holding a Thumb handgun: “You stripped everything away from me.”',
    [
      C(
        'Lập tức rút vũ khí nghênh chiến',
        'Draw steel and strike',
        null,
        null,
        {},
        {
          out: [
            O(55, 'Bạn nhanh hơn một tích tắc. {rival} đổ gục xuống vũng nước đục; bạn đứng lặng dưới mưa hồi lâu cho đến khi nước mưa rửa sạch vết máu trên tay.', 'You were a breath faster. {rival} collapsed into the mud; you stood in the rain until downpours rinsed away the gore.', { sanity: -12, rep: 4, heat: 6 }, { npcFate: { rival: 'dead' }, scar: 'Phát súng dưới mưa', motif: { violence: 2 } }),
            O(45, 'Viên đạn xé toạc bả vai bạn. {rival} hạ súng bỏ đi để bạn sống sót trong đau đớn; có lẽ đó chính là sự báo thù tàn khốc nhất.', 'A heavy bullet punched through your shoulder. {rival} walked away leaving you to bleed—perhaps the cruelest vengeance of all.', { health: -18, sanity: -6 }, { bond: { rival: -10 } })
          ]
        }
      ),
      C(
        'Quỳ sụp xuống nói lời xin lỗi',
        'Kneel and offer humble repentance',
        '{rival} từ từ hạ nòng súng xuống: "Tao không cần những lời xin lỗi rẻ mạt của mày." Nhưng người ấy đã không bóp cò.',
        '{rival} slowly lowered the barrel: “I have no use for your cheap repentance.” Yet they did not fire.',
        { sanity: -4, rep: -4 },
        { bond: { rival: 20 }, motif: { mercy: 1 } }
      )
    ],
    I('Bạn đứng chôn chân bất động. {rival} dứt khoát bóp cò.', 'Paralyzed, you stood still. {rival} pulled the trigger without hesitation.'),
    { health: -24, scar: 'Phát súng dưới mưa', once: true, tags: ['npc', 'callback', 'danger'] }
  ),

  M(
    'm_a_friend_reunion',
    [20, 70],
    { npc: 'friend' },
    '[Tái ngộ người bạn cũ ở quán Bistro] Bạn tình cờ chạm mặt lại {friend} tại một quán rượu Bistro nơi hẻm tối. Cả hai người đều đã già dặn, sương gió và đổi thay quá nhiều theo năm tháng.',
    '[Bistro Reunion with {friend}] You crossed paths with {friend} at a dingy backstreet tavern. Decades of city violence had weathered you both beyond recognition.',
    [
      C(
        'Ngồi lại bên nhau uống rượu suốt đêm',
        'Sit and drink together until dawn',
        'Hai người dốc bầu tâm sự những bí mật chưa từng kể với ai trong đời. Đến sáng, tâm hồn bạn cảm thấy nhẹ nhõm và trong trẻo như thuở mười tuổi.',
        'You unburdened regrets never uttered to another living soul. At daybreak, your spirit felt as buoyant as your childhood days.',
        { sanity: 7, wealth: -2 },
        { bond: { friend: 12 } }
      ),
      C(
        'Chỉ chào hỏi xã giao vài câu rồi rời đi',
        'Nod politely and depart',
        'Bạn thực sự không biết phải nói điều gì với một người từng thấu hiểu mình sâu sắc đến thế.',
        'You felt an awkward chasm speaking to someone who once knew your every thought.',
        { sanity: -1 },
        { bond: { friend: -5 } }
      )
    ],
    I('Bạn cúi mặt giả vờ như không nhận ra người bạn thuở thiếu thời.', 'You lowered your gaze, pretending not to recognize them.'),
    { bond: { friend: -10 }, tags: ['npc'] }
  ),

  M(
    'm_a_friend_debt',
    [18, 60],
    { npc: 'friend', stat: { wealth: [10, 100] } },
    '[Tin nhắn khẩn cấp lúc 2:50 AM] {friend} nhắn một dòng tin tuyệt vọng: "Tao đang cần gấp 20 Ahn để cứu mạng. Đừng hỏi lý do. Tao nhất định sẽ trả." Tin nhắn được gửi lúc đúng 2 giờ 50 sáng.',
    '[The 2:50 AM Emergency Dispatch] {friend} transmitted a frantic message: “I need twenty Ahn instantly to save my skin. Ask no questions. I will repay every coin.” Logged at 2:50 AM.',
    [
      C(
        'Lập tức chuyển tiền cứu bạn',
        'Transfer the funds without delay',
        null,
        null,
        { wealth: -8 },
        {
          out: [
            O(55, 'Đúng một năm sau {friend} mang trả đủ số tiền kèm theo chiếc đồng hồ quả quýt kỷ vật của cha: "Mày đã cứu vớt mạng sống của tao."', 'A year later, {friend} repaid the debt alongside their father’s heirloom watch: “You pulled me back from the grave.”', { wealth: 6, sanity: 4 }, { bond: { friend: 20 } }),
            O(45, '{friend} không bao giờ trả nợ và hoàn toàn bặt vô âm tín. Một người thợ săn Fixer bảo đã từng nhìn thấy bạn mình dạt sang District 12.', '{friend} never repaid the loan and vanished completely. Rumors circulated that they drifted into District 12.', { sanity: -3 }, { npcFate: { friend: 'missing' } })
          ],
          motif: { loyalty: 1 }
        }
      ),
      C(
        'Nhắn lại gặng hỏi xem để làm gì',
        'Demand what the trouble is',
        '{friend} không hồi đáp. Đến sáng sớm hôm sau, bạn nhận được một dòng tin ngắn ngủi lạnh tanh: "Thôi khỏi cần nữa."',
        '{friend} sent no reply. At daybreak, a solitary cold dispatch arrived: “Never mind.”',
        {},
        {
          bond: { friend: -8 },
          later: [{ id: 'm_friend_fate', years: 3, reasonVi: '{friend} đã cần tiền lúc 2 giờ 50 sáng', reasonEn: '{friend} needed money at 2:50 AM' }]
        }
      )
    ],
    I('Bạn đọc xong tin nhắn rồi lẳng lặng tắt máy đi ngủ.', 'You read the screen and placed the terminal facedown.'),
    {
      bond: { friend: -12 },
      later: [{ id: 'm_friend_fate', years: 3, reasonVi: '{friend} đã cần tiền lúc 2 giờ 50 sáng', reasonEn: '{friend} needed money at 2:50 AM' }],
      once: true,
      tags: ['npc']
    }
  ),

  M(
    'm_friend_fate',
    [20, 70],
    { npc: 'friend' },
    '[Hồ sơ truy nã Distortion của {friend}] Bạn bàng hoàng nhận ra ảnh của {friend} trên bảng thông cáo truy nã đặc biệt của Hiệp hội Hana: "Đối tượng đã liên kết với hiện tượng Distortion. Cấp độ hiểm họa Urban Myth."',
    '[Hana Suppression Notice for {friend}] You stared in disbelief at {friend}’s likeness upon a Hana Association priority suppression notice: “Affiliated with active Distortion. Classified Urban Myth.”',
    [
      C(
        'Lập tức lên đường tìm kiếm bạn',
        'Track down your companion',
        null,
        null,
        {},
        {
          out: [
            O(40, 'Bạn tìm thấy {friend} trong một nhà kho hoang ở District 12, đang nói chuyện với một bóng đen vô diện. Nhìn thấy bạn, bạn mình òa khóc nức nở; hai người cùng nhau trốn khỏi The City suốt một tháng.', 'You located {friend} in a derelict District 12 warehouse, communing with a faceless shadow. Recognizing you, they wept; you fled the City together for a month.', { sanity: -6, wealth: -6 }, { bond: { friend: 25 }, motif: { loyalty: 1 } }),
            O(60, 'Bạn đến chậm mất một ngày. Đội thanh trừng của Hana đã quét sạch nhà kho; thứ duy nhất còn sót lại là chiếc khăn quàng cổ rách nát mà {friend} đã đeo từ thuở mười tuổi.', 'You arrived one day too late. Hana enforcers sanitized the sector; only the tattered scarf your friend wore since age ten remained upon the tiles.', { sanity: -16 }, { npcFate: { friend: 'dead' }, scar: 'Chiếc khăn quàng của {friend}' })
          ]
        }
      ),
      C(
        'Báo tin vị trí cho Hiệp hội Hana',
        'Turn over coordinates to Hana',
        'Bạn nhận được 20 đồng Ahn tiền thưởng truy nã. Nhưng bạn không bao giờ có đủ can đảm để hỏi xem số phận của người bạn ấy đã kết thúc ra sao.',
        'You pocketed the twenty-Ahn bounty. Yet you never summoned the stomach to inquire how your friend’s life was extinguished.',
        { wealth: 8, sanity: -10, rep: 2 },
        { npcFate: { friend: 'dead' }, motif: { greed: 1 } }
      )
    ],
    I('Bạn cay đắng gấp tờ lệnh truy nã lại rồi cất sâu vào ngăn kéo.', 'You folded the suppression writ and stashed it deep in your desk.'),
    { sanity: -6, once: true, tags: ['npc', 'callback'] }
  ),

  M(
    'm_a_mentor_meet',
    [16, 40],
    { noNpc: 'mentor' },
    '[Vị Fixer một tay trong quán rượu] Một vị Fixer lão thành bị cụt một cánh tay ngồi ở quầy bar chăm chú quan sát bạn tay đôi hạ gục hai gã say rượu. Ông cất giọng khàn đục: "Mày ra đòn như một con chó dại. Muốn học kiếm pháp thực thụ không?"',
    '[The One-Armed Veteran Fixer] A one-armed veteran Fixer at the tavern counter observed you brawl with two drunks. He rasped: “You strike like a rabid street cur. Want to learn real steel?”',
    [
      C(
        'Kính cẩn nhận lời bái sư',
        'Bow and accept apprenticeship',
        'Ông rèn giũa bạn bằng những đòn gậy gỗ chuẩn xác mỗi sáng sớm lúc 5 giờ. Mỗi lần bạn ngã dập mặt, ông lão lại cười sảng khoái.',
        'He drilled you with heavy wooden staves every dawn at five. Every time you kissed the cobbles, he roared with hearty laughter.',
        { sanity: 5, merit: 4 },
        { npc: { role: 'mentor', bond: 50 }, flags: ['해결사동경'] }
      ),
      C(
        'Lắc đầu từ chối',
        'Decline the tutelage',
        'Ông nhún vai tiếp tục nâng chén rượu: "Thế thì chẳng mấy chốc mày cũng sẽ bỏ mạng nơi đầu đường xó chợ thôi con ạ."',
        'He shrugged, raising his glass: “You’ll end up bleeding in a gutter before long, kid.”',
        { sanity: -1 }
      )
    ],
    I('Bạn quay lưng bỏ đi trước khi ông lão kịp nói hết câu.', 'You walked out before he finished speaking.'),
    { once: true, tags: ['npc'] }
  ),

  M(
    'm_a_mentor_last',
    [20, 70],
    { npc: 'mentor' },
    '[Ủy thác sinh tử của {mentor}] {mentor} gọi bạn đến bên giường bệnh. Người thầy đã già yếu đi rất nhiều, và vừa nhận một bản hợp đồng ủy thác tử thần mà ông không thể từ chối nhưng cũng không thể tự mình sống sót.',
    '[The Final Commission of {mentor}] {mentor} summoned you to his side. Weathered and frail, he received an unavoidable death-contract he could neither decline nor survive alone.',
    [
      C(
        'Kề vai sát cánh cùng thầy ra trận',
        'Stand shoulder to shoulder with him',
        null,
        null,
        {},
        {
          out: [
            O(45, 'Hai thầy trò đẫm máu kiên cường sống sót trở về sau trận kịch chiến. Ông trân trọng trao thanh bảo kiếm cho bạn: "Kể từ nay, nó thuộc về con."', 'Master and student returned drenched in gore but breathing. He yielded his prized katana into your hands: “It is yours now.”', { health: -12, merit: 12, rep: 6 }, { bond: { mentor: 20 }, flags: ['유物'] }),
            O(55, '{mentor} lao mình đỡ trọn nhát chém chí mạng thay cho bạn. Người thầy trút hơi thở cuối cùng với một nụ cười mãn nguyện, tựa như đã chờ đợi ngày được hy sinh từ rất lâu.', '{mentor} took the fatal blow meant for your heart. He expired smiling peacefully, as if he had waited decades for this noble end.', { health: -8, sanity: -14, merit: 8 }, { npcFate: { mentor: 'dead' }, scar: 'Nhát kiếm {mentor} đỡ thay', flags: ['유물'] })
          ],
          motif: { loyalty: 1 }
        }
      ),
      C(
        'Khuyên thầy từ bỏ và từ chối tham gia',
        'Refuse to join the slaughter',
        '{mentor} khẽ gật đầu như đã đoán trước được câu trả lời. Tuần sau đó, tin dữ báo về rằng người thầy già đã vĩnh viễn không bao giờ trở lại.',
        '{mentor} gave a faint nod as if anticipating your choice. A week later, word arrived that the old master fell on the field.',
        { sanity: -8 },
        { npcFate: { mentor: 'dead' } }
      )
    ],
    I('Bạn ngập ngừng chưa kịp trả lời thì người thầy đã lặng lẽ lên đường.', 'Before you could speak, the old master slipped into the fog.'),
    { sanity: -6, npcFate: { mentor: 'missing' }, once: true, tags: ['npc'] }
  ),

  M(
    'm_a_sweeper_door',
    GROWN,
    { notNest: true },
    '[Tiếng đập cửa lúc 3:12 sáng] Đồng hồ điểm 3 giờ 12 phút sáng. Có ai đó đang điên cuồng đập rầm rầm vào cánh cửa nhà bạn, gào khóc van xin được mở cửa cho vào trốn trước giờ quét dọn của Sweeper.',
    '[Pounding at 3:12 AM] The clock showed 3:12 AM. Desperate fists hammered against your doorboards, shrieking for shelter before the Sweepers cleansed the streets.',
    [
      C(
        'Liều mạng mở chốt cửa cứu người',
        'Draw the bolt to pull them inside',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Bạn kéo nhanh người đó vào trong đúng lúc tiếng còi tử thần hú vang. Đó là một cô gái trẻ; cô ngồi co ro run rẩy trong góc phòng suốt đêm.', 'You yanked them inside just as the siren flared. It was a young woman; she shuddered in the corner of your room until sunrise.', { sanity: -2, rep: 3 }, { motif: { mercy: 1 }, mem: 'sheltered_stranger' }),
            O(40, 'Bạn mở chốt cửa chậm mất đúng một giây định mệnh. Thứ đang đứng trừng trừng trước cửa nhà bạn lúc này không còn là con người nữa.', 'You drew the bolt one second too late. What stood upon your doorstep was no longer human.', { health: -15, sanity: -12 }, { scar: 'Cánh cửa mở lúc 3:13' })
          ]
        }
      ),
      C(
        'Giữ chặt then cửa kiên quyết không mở',
        'Hold the iron bolt firm',
        'Tiếng đập cửa và tiếng cào cấu im bặt đúng vào khoảnh khắc 3 giờ 13 phút. Sáng hôm sau tỉnh dậy bước ra, bậc thềm nhà bạn sạch bong sáng bóng hơn bao giờ hết.',
        'The frantic pounding abruptly died at 3:13 AM. At dawn, your threshold was spotless, scoured cleaner than glass.',
        { sanity: -8 }
      )
    ],
    I('Bạn sợ hãi đứng chôn chân bất động sau cánh cửa gỗ dày.', 'Terror-stricken, you stood frozen behind the heavy wood.'),
    { sanity: -8, theme: '313', tags: ['danger'] }
  ),

  M(
    'm_sheltered_return',
    [20, 80],
    { mem: 'sheltered_stranger' },
    '[Sự đền ơn của người được cứu] Cô gái trẻ mà bạn từng mở cửa cứu sống trong đêm 3:13 kinh hoàng năm xưa giờ đây đã trở thành thư ký quyền lực của một Hiệp hội Fixer. Cô tìm đến tận nhà để tri ân ân nhân.',
    '[The Sheltered Stranger’s Gratitude] The young woman you harbored that horrific 3:13 night had ascended as a senior registrar at an Association. She arrived at your doorstep in gratitude.',
    [
      C(
        'Vui vẻ nhận lời cảm ơn',
        'Accept her heartfelt thanks',
        'Cô để lại cho bạn một số liên lạc đặc biệt: "Bất cứ khi nào bạn cần sự hỗ trợ từ Hiệp hội, xin hãy gọi trực tiếp cho tôi."',
        'She provided an encrypted direct channel: “If ever you require backing from the Association, call me at once.”',
        { network: 8, sanity: 3 }
      ),
      C(
        'Nhờ cô sắp xếp một ủy thác béo bở',
        'Request priority on a lucrative contract',
        'Cô lập tức sử dụng quyền hạn điều phối cho bạn một bản hợp đồng ủy thác trả công hậu hĩnh mà không hề thắc mắc điều gì.',
        'She leveraged her influence to hand you a high-yield, privileged commission without asking a single question.',
        { wealth: 6, network: 3 }
      )
    ],
    I('Bạn lắc đầu bảo rằng cô ấy đã tìm nhầm người.', 'You claimed she had mistaken you for another.'),
    { once: true, tags: ['callback'] }
  ),

  M(
    'm_a_organ_offer',
    GROWN,
    { stat: { wealth: [0, 15] } },
    '[Bản hợp đồng bán thận chợ đen] Một gã "thầy thuốc" chợ đen ngỏ lời trả ngay 40 đồng Ahn tiền mặt nếu bạn chấp nhận bán đi một quả thận khỏe mạnh của mình.',
    '[Black-Market Organ Solicitation] A shadowy back-alley surgeon offered forty crisp Ahn if you agreed to part with a healthy kidney.',
    [
      C(
        'Đồng ý lên bàn mổ bán thận',
        'Agree to the surgery',
        'Ca phẫu thuật diễn ra ngay trên một chiếc bàn bếp thô sơ sực mùi cồn. Bạn tỉnh dậy với một đường chỉ khâu dài rát buốt bên hông và một xấp tiền trong túi.',
        'The operation unfolded upon a grease-slicked kitchen slab. You awoke with jagged sutures biting your flank and a fat stack of coin.',
        { health: -18, wealth: 14 },
        { scar: 'Vết khâu bên hông' }
      ),
      C(
        'Dứt khoát từ chối bỏ đi',
        'Refuse and walk away',
        'Gã thầy thuốc nhếch mép cười gằn gọi với theo: "Rồi sớm muộn gì mày cũng sẽ phải quay lại tìm tao thôi." Bạn chỉ thầm cầu mong gã đã đoán sai.',
        'The butcher smirked, calling after you: “Starvation will drive you right back to my table.” You prayed he was wrong.',
        { sanity: -1 }
      )
    ],
    I('Bạn ậm ừ bảo sẽ suy nghĩ thêm rồi lùi dần ra khỏi ngõ.', 'You muttered that you needed time to consider, retreating from the cellar.')
  ),

  M(
    'm_a_ring_gallery',
    [18, 60],
    {},
    '[Phòng trưng bày nghệ thuật Ring] Một kẻ lập dị lạ mặt đưa cho bạn một tấm vé mời miễn phí đến tham quan một "triển lãm nghệ thuật đương đại" do Syndicate The Ring bí mật tổ chức.',
    '[The Ring’s Exhibition Gallery] An eccentric stranger slipped you a complimentary pass to a private “artistic salon” hosted by the Ring syndicate.',
    [
      C(
        'Tò mò bước vào xem triển lãm',
        'Venture into the gallery',
        'Những bức tượng điêu khắc và tác phẩm hội họa quái đản thực chất đều được chế tác từ thân xác con người; một tác phẩm thậm chí vẫn còn đang thở thoi thóp. Bạn chạy về nhà nôn mửa cho tới sáng.',
        'The sculptures and tapestries were fashioned from living flesh; one installation was still breathing in agony. You fled home, vomiting until dawn.',
        { sanity: -10, resonance: 6 },
        { mem: 'saw_ring_art' }
      ),
      C(
        'Lập tức từ chối tấm vé',
        'Refuse the ticket',
        'Kẻ lạ mặt khẽ nghiêng đầu cười ma quái: "Thật là đáng tiếc, đường nét gương mặt của bạn rất phù hợp với ánh sáng trong phòng tranh của chúng tôi."',
        'The stranger tilted his head with an unsettling grin: “What a pity. The contours of your skull would match our display lights so well.”',
        { sanity: -2 }
      )
    ],
    I('Bạn nhận tấm vé rồi ném ngay vào đống rác đầu đường.', 'You accepted the parchment and tossed it straight into the gutter.'),
    { theme: 'ring', tags: ['danger'] }
  ),

  M(
    'm_a_carmen_dream',
    [16, 80],
    { stat: { resonance: [35, 100] } },
    '[Giấc mơ dưới bóng cây chan hòa nắng] Trong cơn mộng ảo, bạn thấy mình ngồi dưới một tán cây ngập tràn ánh nắng ấm áp. Một người phụ nữ dịu dàng khẽ mỉm cười hỏi bạn: "Bạn có đang cảm thấy đau đớn không?"',
    '[The Sunlit Arbor Dream] In deep reverie, you sat beneath a sun-drenched bough. A radiant woman smiled tenderly, asking: “Does your heart ache with pain?”',
    [
      C(
        'Chân thật đáp: "Có."',
        'Honestly answer: “Yes.”',
        'Người phụ nữ mỉm cười nhân từ và khẽ đặt bàn tay ấm áp lên ngực bạn. Bạn tỉnh giấc, nước mắt ướt đẫm gối, cảm thấy một sự nhẹ nhõm đến rợn ngợp trong tâm can.',
        'She smiled with immense warmth, resting her palm over your heart. You woke weeping, filled with an eerie, terrifying serenity.',
        { sanity: 6, resonance: 10 }
      ),
      C(
        'Cứng cỏi đáp: "Không."',
        'Firmly reply: “No.”',
        'Người phụ nữ thoáng nét đượm buồn nhìn bạn: "Ngươi đang dối lòng." Bạn giật mình tỉnh giấc với những giai điệu piano trầm buồn còn vang vọng trong tai.',
        'Her expression saddened: “Liar.” You snapped awake with mournful piano chords still ringing in your ears.',
        { sanity: -3, resonance: 4 }
      )
    ],
    I('Bạn giật mình choàng tỉnh giấc trước khi kịp thốt lên câu trả lời.', 'You startled awake before an answer could pass your lips.'),
    { resonance: 3, theme: 'carmen' }
  ),

  // ============================================================ by trade
  M(
    'm_fx_request_choice',
    GROWN,
    { jobs: ['Fixer'] },
    '[Lựa chọn giữa hai bản hợp đồng] Văn phòng Fixer đồng thời xuất hiện hai bản ủy thác: tìm kiếm một đứa trẻ mất tích của người mẹ nghèo (5 Ahn) hoặc thu hồi một kiện hàng mật cho Thumb (25 Ahn).',
    '[The Commission Crossroads] Two contracts sat upon the Office desk: search for a pauper’s missing child (5 Ahn), or retrieve an undisclosed cargo for the Thumb (25 Ahn).',
    [
      C(
        'Nhận vụ tìm đứa trẻ nghèo',
        'Accept the missing child case',
        null,
        null,
        { wealth: 2, merit: 4 },
        {
          out: [
            O(50, 'Bạn tìm thấy đứa bé vẫn còn sống sót trong một tầng hầm phế liệu. Người mẹ nghèo ôm chầm lấy chân bạn khóc ròng trong biết ơn vô hạn.', 'You found the child alive in a scrap cellar. The weeping mother clung to your boots in boundless gratitude.', { sanity: 6, rep: 4 }),
            O(50, 'Bạn tìm thấy thi thể đứa trẻ. Bạn im lặng không nỡ kể cho người mẹ biết mình đã tìm thấy nó ở đâu và trong tình trạng thê thảm thế nào.', 'You located the remains. You spared the mother the gruesome reality of where and how her child was butchered.', { sanity: -8 })
          ],
          motif: { mercy: 1 }
        }
      ),
      C(
        'Nhận vận chuyển hàng cho Thumb',
        'Deliver the Thumb cargo',
        'Kiện hàng bọc vải đen to bằng kích thước một người trưởng thành và thỉnh thoảng lại cựa quậy run rẩy. Bạn tự dặn lòng tuyệt đối không mở ra xem.',
        'The black canvas crate matched the size of an adult body, squirming faintly on the carriage. You resolved never to unfasten the ropes.',
        { wealth: 8, merit: 6, sanity: -4, heat: 4 },
        { motif: { greed: 1 }, mem: 'thumb_package' }
      )
    ],
    I('Bạn chần chừ nhường lại cả hai bản hợp đồng cho các đồng nghiệp khác trong văn phòng.', 'You hesitated, letting fellow agents claim both commissions.'),
    { merit: -2 }
  ),

  M(
    'm_fx_partner_meet',
    [18, 45],
    { jobs: ['Fixer'], noNpc: 'partner' },
    '[Cộng sự Fixer mới vào nghề] Văn phòng chỉ định một tân binh Fixer trẻ tuổi non nớt làm cộng sự phối thuộc với bạn trong chuỗi ủy thác đầy hiểm nguy của tuần này.',
    '[The Rookie Fixer Pair] The Office assigned an unseasoned rookie to partner your blade for this week’s hazardous contracts.',
    [
      C(
        'Tận tình chỉ bảo kỹ năng thực chiến',
        'Train them with patient care',
        'Người đó tiếp thu rất nhanh và tính tình hoạt bát cởi mở. Đến cuối tuần, bạn đã quen thuộc với những câu chuyện ríu rít bên cạnh mỗi khi làm nhiệm vụ.',
        'They learned rapidly and chattered relentlessly. By week’s end, you grew accustomed to their spirited presence at your side.',
        { merit: 3, sanity: 2 },
        { npc: { role: 'partner', bond: 55 } }
      ),
      C(
        'Để người đó tự bươn chải sinh tồn',
        'Let them learn by harsh fire',
        'Người đồng đội trẻ trầy trật sống sót qua các trận chiến, và kể từ đó luôn lẳng lặng bám theo sau lưng bạn như một cái bóng trung thành.',
        'The rookie survived through sheer grit, shadowing your steps in disciplined, watchful silence.',
        { merit: 4 },
        { npc: { role: 'partner', bond: 35 } }
      )
    ],
    I('Bạn kiên quyết từ chối và xin cấp trên được tác chiến độc hành.', 'You requested to continue taking contracts solo.'),
    { merit: 1, once: true, tags: ['npc'] }
  ),

  M(
    'm_fx_partner_betray',
    [20, 60],
    { jobs: ['Fixer'], npc: 'partner', stat: { wealth: [20, 100] } },
    '[Kế hoạch ôm tiền bỏ trốn của {partner}] {partner} thì thầm rủ rê bạn cùng nhau ôm trọn số tiền thù lao khổng lồ vừa thu hồi của cả nhóm rồi bỏ trốn sang District khác bắt đầu cuộc đời mới.',
    '[The Embezzlement Plot of {partner}] {partner} conspiratorially proposed running off with the team’s massive commission payout to start fresh in a faraway District.',
    [
      C(
        'Đồng ý cùng ôm tiền bỏ trốn',
        'Agree to the daring betrayal',
        null,
        null,
        { wealth: 12 },
        {
          out: [
            O(50, 'Hai người sống sung túc an nhàn được tròn một năm trời. Sau đó, Hiệp hội Hana chính thức xóa sổ tên hai bạn khỏi danh bạ hành nghề và phát lệnh truy lùng.', 'You lived lavishly for a full year. Then Hana revoked your licenses and dispatched hunters.', { rep: -10, heat: 10 }, { bond: { partner: 12 }, motif: { greed: 1 } }),
            O(50, '{partner} lén lút ôm sạch toàn bộ số tiền thù lao tẩu thoát trong đêm, nuốt trọn cả phần chia của bạn.', '{partner} slipped away at midnight with the entire vault, absconding with your share as well.', { wealth: -12, sanity: -8 }, { npcFate: { partner: 'estranged' } })
          ]
        }
      ),
      C(
        'Báo cáo âm mưu cho Văn phòng',
        'Blow the whistle to the Office',
        '{partner} bị bắt giữ và tống khứ khỏi văn phòng trong nhục nhã. Ánh mắt căm thù tột cùng mà người ấy nhìn bạn trước khi bị lôi đi khiến bạn mất ngủ nhiều đêm.',
        '{partner} was stripped of their badge and cast out. That final venomous glare haunted your sleep for months.',
        { rep: 5, merit: 4, sanity: -4 },
        { npcFate: { partner: 'estranged' } }
      ),
      C(
        'Khuyên can {partner} từ bỏ ý định',
        'Talk {partner} out of the madness',
        '{partner} gượng cười bảo rằng đó chỉ là một câu đùa cho vui. Nhưng trong thâm tâm, bạn không hoàn toàn dám chắc.',
        '{partner} laughed it off as a harmless joke. Deep down, you were far from convinced.',
        {},
        { bond: { partner: 4 } }
      )
    ],
    I('Bạn im lặng không đáp. {partner} hiểu sự im lặng đó là một lời cự tuyệt.', 'You gave no reply; {partner} took the silence as a flat refusal.'),
    { bond: { partner: -4 }, once: true, tags: ['npc'] }
  ),

  M(
    'm_syn_order',
    GROWN,
    { jobs: ['Syndicate'], fingerRankAtMost: 2 },
    '[Mệnh lệnh thanh trừng đứa trẻ] Thủ lĩnh băng đảng giao cho bạn một nhiệm vụ tàn nhẫn: "xử lý sạch sẽ" một đứa trẻ vô tình nhìn thấy mặt mũi của nhóm các bạn trong một vụ thanh trừng.',
    '[The Syndicate Execution Order] The captain handed down a grim decree: “silence” an innocent child who caught sight of your crew’s faces during a hit.',
    [
      C(
        'Tuyệt đối phục tùng mệnh lệnh cấp trên',
        'Execute the order swiftly',
        'Bạn ra tay thật nhanh gọn để đứa trẻ không kịp cảm thấy đau đớn hay sợ hãi. Đó là chút lòng thương hại cuối cùng mà bạn có thể dành cho nó.',
        'You struck with merciful swiftness so it knew neither terror nor agony. It was the sole scrap of kindness you could offer.',
        { sanity: -16, rep: 6, merit: 8 },
        { scar: 'Đứa trẻ đã thấy mặt bạn', motif: { violence: 2 } }
      ),
      C(
        'Lén lút tha mạng cho đứa bé',
        'Spare the child and report it slain',
        null,
        null,
        {},
        {
          out: [
            O(55, 'Không một ai trong băng đảng phát hiện ra sự thật. Bạn chỉ thầm hy vọng đứa trẻ ấy sẽ bỏ trốn thật xa khỏi The City.', 'Nobody caught wind of your deceit. You prayed the youth would flee far beyond the city limits.', { sanity: 4 }, { motif: { mercy: 1 }, later: [{ id: 'm_syn_child_grown', years: 10, reasonVi: 'Đứa trẻ bạn tha mạng', reasonEn: 'The child you spared' }] }),
            O(45, 'Đứa bé bị phát hiện khi đang lẩn trốn. Cấp trên tức giận chặt đứt một ngón tay của bạn để làm bài học cảnh cáo cho sự mềm lòng.', 'The runaway was uncovered. The furious captain hacked off your finger as punishment for weakness.', { health: -10, sanity: -6, rep: -6 }, { scar: 'Ngón tay trả cho sự mềm lòng' })
          ]
        }
      )
    ],
    I('Bạn do dự chần chừ. Một tên tay sai khác lập tức ra tay thay và báo cáo thái độ của bạn lên cấp trên.', 'You hesitated. Another enforcer did the deed and logged your wavering disloyalty.'),
    { rep: -4, sanity: -6, once: true, tags: ['danger'] }
  ),

  M(
    'm_syn_officer_protection_order',
    GROWN,
    { jobs: ['Syndicate'], fingerRankAtLeast: 3 },
    '[Lệnh bảo vệ khu phố] Người phụ trách tuyến phố đưa bạn danh sách các hộ đã nộp tiền bảo vệ. Một tổ dưới quyền muốn thu thêm lần nữa trước khi trời tối. Lệnh cuối cùng thuộc về bạn.',
    '[Protection Order] The block steward brought you a list of households that had already paid for protection. A crew under your command wanted to collect again before nightfall. The final order was yours.',
    [
      C('Giữ đúng sổ thu', 'Honour the ledger', 'Bạn gạch tên những hộ đã nộp. Đám lính tỏ vẻ thất vọng, nhưng sáng hôm sau không ai phải giấu cửa hàng sau tấm ván.', 'You struck the paid households from the collection list. Your crew grumbled, but no shop had to board its door by morning.', { rep: 2, network: 2 }, { motif: { loyalty: 1 } }),
      C('Cho phép thu thêm', 'Allow another collection', 'Tiền được đưa lên bàn bạn trước nửa đêm. Hôm sau, khu phố im lặng khi người của bạn đi qua.', 'The money reached your desk before midnight. The block fell silent whenever your crew passed the next day.', { wealth: 3, sanity: -3, heat: 3 }, { motif: { greed: 1 } })
    ],
    I('Bạn trả lại danh sách và không ra lệnh. Tổ dưới quyền tự chọn cách làm, rồi ghi tên bạn ở cuối báo cáo.', 'You returned the list without an order. Your crew chose for itself and put your name at the foot of the report.', { rep: -2 }),
    { tags: ['syndicate'] }
  ),

  M(
    'm_syn_child_grown',
    [25, 80],
    {},
    '[Đứa trẻ năm xưa trở lại] Một tay Fixer trẻ tuổi đĩnh đạc chặn đường bạn trong con ngõ: "Mười năm trước, chính bạn đã tha mạng cho tôi. Hôm nay tôi tìm đến là để trả ơn, hoặc để hiểu vì sao ngày ấy bạn lại làm vậy."',
    '[The Spared Youth Returns] An accomplished young Fixer stepped across your path: “Ten years ago, you spared my life. Today I sought you out to repay the debt, or understand why you showed mercy.”',
    [
      C(
        'Kể hết toàn bộ sự thật năm xưa',
        'Recount the honest truth',
        'Người ấy chăm chú lắng nghe từng lời, rồi trân trọng trao cho bạn một thanh dao găm sắc bén có khắc tên mình: "Bất cứ khi nào bạn lâm nguy, hãy gọi cho tôi."',
        'They listened with reverence, presenting a masterwork dagger engraved with their name: “Call upon me whenever danger looms.”',
        { sanity: 6, network: 6 },
        { npc: { role: 'partner', bond: 70 } }
      ),
      C(
        'Lạnh lùng bảo người đó đã nhận nhầm người',
        'Claim they have mistaken you',
        'Người thợ săn trẻ nhìn bạn hồi lâu với ánh mắt thấu hiểu rồi khẽ gật đầu: "Vậy thì chắc chắn là tôi đã nhận nhầm người rồi."',
        'The young hunter examined you with deep understanding before nodding: “Then I must truly be mistaken.”',
        { sanity: 1 }
      )
    ],
    I('Bạn lạnh lùng bước thẳng qua người họ như hai kẻ xa lạ.', 'You brushed past their shoulder as absolute strangers.'),
    { once: true, tags: ['callback'] }
  ),

  M(
    'm_wing_report',
    GROWN,
    { jobs: ['Wing Employee'] },
    '[Chỉnh sửa báo cáo tai nạn Wing] Cấp trên trực tiếp yêu cầu bạn sửa đổi một số liệu nhỏ trong bản báo cáo tai nạn lao động: đổi từ "ba người chết" thành "ba người bị thương nhẹ".',
    '[Falsifying the Corporate Incident Report] Your superior instructed you to alter a statistic in an industrial accident audit: changing “three fatalities” to “three minor injuries.”',
    [
      C(
        'Chấp thuận sửa lại số liệu theo lệnh',
        'Comply and falsify the numbers',
        'Bản báo cáo được nộp lên sạch sẽ không tì vết. Nhưng đêm hôm đó trong giấc ngủ, những con số vô hồn ấy bỗng hiện lên thành những khuôn mặt người đầy oán hận.',
        'The sanitized document passed audit. Yet that night, the altered digits took the shapes of screaming faces in your nightmares.',
        { wealth: 3, network: 3, sanity: -5 },
        { motif: { greed: 1 } }
      ),
      C(
        'Kiên quyết giữ nguyên số liệu thương vong thật',
        'Refuse and submit true fatalities',
        null,
        null,
        {},
        {
          out: [
            O(40, 'Báo cáo trung thực được chuyển lên ban thanh tra. Nhà máy bị đình chỉ kiểm tra an toàn; những người công nhân bạn không hề quen biết đã được bảo vệ mạng sống.', 'The honest audit reached regulators. Factory lines were overhauled; laborers you will never meet were spared from death.', { rep: 5, sanity: 3, network: -3 }),
            O(60, 'Báo cáo bị cấp trên ném trả về mặt. Bảng đánh giá năng lực quý sau của bạn bị ghi chú: "thiếu tinh thần hợp tác tập thể".', 'The report was rejected with fury. Your quarterly evaluation bore the black mark: “lacks organizational synergy.”', { wealth: -3, network: -4 })
          ]
        }
      )
    ],
    I('Bạn khôn khéo đùn đẩy trách nhiệm xử lý hồ sơ sang cho một đồng nghiệp khác.', 'You cunningly passed the hot potato to an unsuspecting colleague.'),
    { network: -1 }
  ),

  M(
    'm_ws_taboo_order',
    GROWN,
    { jobs: ['Workshop Craftsman'] },
    '[Đơn đặt hàng vũ khí Taboo] Một vị khách hàng bí ẩn trùm kín mặt đến Workshop đặt rèn một loại vũ khí có công năng vượt xa quy chuẩn kiểm định của Tres, thứ mà The Head chắc chắn sẽ phán định là Taboo. Tiền công trả gấp mười lần.',
    '[The Taboo Weapon Commission] A masked patron visited your workshop, offering tenfold pay to forge an armament exceeding Tres specifications—something the Head would brand as Taboo.',
    [
      C(
        'Nhận rèn tác phẩm cấm',
        'Accept the forbidden commission',
        'Bạn thức trắng cả tháng ròng để hoàn thành kiệt tác. Đó là món vũ khí hoàn mỹ và sắc bén nhất trong cuộc đời thợ rèn của bạn, nhưng bạn vĩnh viễn không được phép khắc tên mình lên lưỡi thép.',
        'You spent an entire month forging the taboo masterpiece. It was your life’s crowning creation, yet you could never engrave your mark upon its steel.',
        { wealth: 15, rep: 4, taboo: 1 },
        { mem: 'taboo_weapon' }
      ),
      C(
        'Thẳng thừng từ chối vì sợ Head',
        'Decline out of fear of the Head',
        'Vị khách bí ẩn để lại một tấm danh thiếp trên bàn rồi rời đi. Trên tấm thiếp chỉ in duy nhất một vết cào móng vuốt kỳ quái.',
        'The enigmatic patron dropped a calling card bearing solely a bizarre talon mark before dissolving into the street.',
        { sanity: -2 }
      )
    ],
    I('Bạn ngập ngừng bảo sẽ cân nhắc; vị khách ấy không bao giờ quay trở lại nữa.', 'You stalled, and the masked patron never crossed your threshold again.'),
    { theme: 'taboo' }
  ),

  // =========================================================================
  // ACTIVE MEDICAL & WOUND RECOVERY (BACKSTREET CLINIC / NEST / CHILDHOOD / WELLNESS)
  // =========================================================================
  M(
    'm_med_backstreet_clinic',
    GROWN,
    { back: true, stat: { health: [0, 71] } },
    '[Phòng khám chui Backstreets] Vết thương chém xé và cơn sốt sau chuỗi ngày lăn lộn khiến bước chân bạn nặng trĩu. Trước mặt bạn là ánh đèn neon nhấp nháy của một phòng khám ngầm do một cựu y sĩ Nest đào thoát mở.',
    '[Backstreet Backroom Clinic] Lacerations and infection fever weigh heavily on your steps. Ahead flickers the neon sign of an illicit subterranean clinic run by an exiled Nest surgeon.',
    [
      C(
        'Chi 20 Ahn tiêm ống K Corp Ampoule chính hãng nguyên tem',
        'Pay 20 Ahn for genuine factory-sealed K Corp HP Ampoule',
        'Dung dịch xanh lục khép miệng những vết chém sâu. Cơn đau dịu đi, nhưng cơ thể vẫn cần thời gian để phục sức.',
        'The green solution closed the deepest cuts. The pain eased, though your strength would take time to return.',
        { health: 32, sanity: 5, wealth: -20 },
        { costAhn: 20 }
      ),
      C(
        'Chi 6 Ahn tiêm dung dịch huyết thanh K Corp pha loãng',
        'Pay 6 Ahn for diluted K Corp regenerative ampoule serum',
        'Dung dịch màu ngọc bích rát bỏng chảy dọc tĩnh mạch; các thớ thịt rách nát và miệng vết thương kéo da non với tốc độ thần kỳ.',
        'Emerald fluid burned along your veins; torn muscle tissue and lacerations knitted closed with miraculous speed.',
        { health: 15, wealth: -6 },
        { costAhn: 6 }
      ),
      C(
        'Chi 1 Ahn mua cồn khử trùng, thuốc giảm đau và cuộn băng vải thô',
        'Pay 1 Ahn for disinfectant, crude painkillers and coarse bandages',
        'Bạn tự khử trùng vết rách và quấn chặt băng gạc. Dù vẫn còn đau âm ỉ, tình trạng nhiễm trùng đã được chặn đứng hoàn toàn.',
        'You sanitized the wounds and wrapped tight bandages. Though pain lingered, the creeping sepsis was firmly halted.',
        { health: 10, wealth: -1 },
        { costAhn: 1 }
      ),
      C(
        'Cắn răng tự khử trùng bằng lửa và kiên trì chịu đau để tiết kiệm Ahn',
        'Cauterize wounds with fire and endure the searing pain to save Ahn',
        'Mùi thịt khét và cơn đau thấu xương khiến bạn ngất lịm đi vài phút. Khi tỉnh dậy, vết rách đã cầm máu dù tinh thần kiệt quệ.',
        'The smell of charred flesh and blinding agony made you black out briefly. Wounds ceased bleeding, though mind was battered.',
        { health: 4, sanity: -6 }
      )
    ],
    I('Lảo đảo bước qua phòng khám, phó mặc vết thương cho sức đề kháng tự nhiên.', 'Stagger past the clinic, leaving wounds to natural resilience.', { sanity: -2 }),
    { theme: 'health' }
  ),

  M(
    'm_med_nest_infirmary',
    GROWN,
    { nest: true, stat: { health: [0, 71] } },
    '[Trạm Điều Trị Tự Động Feather] Vòng đeo tay sinh trắc học của bạn nhấp nháy đèn đỏ báo động chấn thương mô mềm. Bạn bước vào buồng điều dưỡng y tế tự động của Cánh.',
    '[Feather Automated Med-Bay] Your biometric bracelet pulses amber, warning of severe tissue trauma. You enter the Wing’s automated residential restorative module.',
    [
      C(
        'Kích hoạt buồng sinh học hồi phục cao cấp K-Tier (-25 Ahn)',
        'Activate high-grade K-Tier biostasis rejuvenation chamber (-25 Ahn)',
        'Dịch phục hồi khép các vết thương nặng nhất. Bạn ra khỏi buồng điều trị với lịch tái khám còn nằm trên vòng tay.',
        'The treatment closed the worst wounds. You left the chamber with a follow-up appointment on your wristband.',
        { health: 35, sanity: 8, wealth: -25 },
        { costAhn: 25 }
      ),
      C(
        'Kích hoạt buồng sinh học hồi phục tiêu chuẩn (-8 Ahn)',
        'Activate standard biostasis rejuvenation chamber (-8 Ahn)',
        'Buồng điều trị xử lý phần mô rách và cho bạn một đêm ngủ không bị đánh thức bởi báo động.',
        'The chamber treated torn tissue and gave you a night without alarms.',
        { health: 19, sanity: 4, wealth: -8 },
        { costAhn: 8 }
      ),
      C(
        'Sử dụng gói y tế cơ bản theo hạn ngạch cư dân (-2 Ahn)',
        'Use standard resident quota treatment (-2 Ahn)',
        'Hệ thống rửa vết thương và dán băng nano. Phần mô dập sâu vẫn cần theo dõi.',
        'The system cleaned the wounds and applied nano-bandages. Deeper tissue damage still needed monitoring.',
        { health: 12, wealth: -2 },
        { costAhn: 2 }
      ),
      C(
        'Chỉ nhận viên sủi dinh dưỡng tăng lực và tiếp tục làm việc',
        'Collect energy vitamin fizz and return to work',
        'Viên vitamin giúp cơ thể bạn bớt mệt mỏi và duy trì thể lực qua ca làm việc dài.',
        'The nutrient tablet eased exhaustion, sustaining your vitality through long shifts.',
        { health: 4 }
      )
    ],
    I('Bỏ qua cảnh báo y tế để không bị trừ điểm chuyên cần.', 'Ignore health warnings to preserve attendance rating.', { sanity: -2 }),
    { theme: 'health' }
  ),

  M(
    'm_wellness_hamham_lunch',
    GROWN,
    { notOut: true, stat: { sanity: [0, 69] } },
    '[Bữa Trưa Ở HamHamPangPang] Mùi bánh mì nướng bơ tỏi thơm lừng phảng phất từ tiệm HamHamPangPang nức tiếng góc phố. Sau những giờ phút căng thẳng tột cùng giữa thành phố lạnh lùng, một bữa ăn nóng hổi có thể xoa dịu tâm trí bạn.',
    '[HamHamPangPang Lunch] The irresistible aroma of toasted garlic butter wafts from the renowned HamHamPangPang parlor down the block. After grueling stress in this callous city, a piping hot sandwich can soothe a frayed mind.',
    [
      C(
        'Gọi Combo Sandwich Đặc Biệt và trà hoa hồng ấm (-10 Ahn)',
        'Order Grand Toast Combo & warm rose tea (-10 Ahn)',
        'Bữa ăn nóng giúp bạn lấy lại hơi sức. Những điều chờ ngoài cửa tiệm vẫn còn đó.',
        'A hot meal helped you catch your breath. What waited outside the shop had not gone away.',
        { sanity: 15, health: 3, wealth: -10, resonance: -4 },
        { costAhn: 10 }
      ),
      C(
        'Gọi một phần bánh mì trứng kẹp sốt mayonnaise truyền thống (-3 Ahn)',
        'Order classic egg-salad toast sandwich (-3 Ahn)',
        'Vị béo ngậy ngọt dịu tiếp thêm năng lượng và nụ cười hiếm hoi trong ngày làm việc.',
        'Rich egg salad and golden crust offered comforting warmth and a rare, peaceful smile.',
        { sanity: 7, health: 1, wealth: -3 },
        { costAhn: 3 }
      )
    ],
    I('Lắc đầu bước nhanh qua tiệm để tiết kiệm từng đồng Ahn.', 'Walk swiftly past the parlor, hoarding every coin.', { sanity: -1 }),
    { theme: 'relief' }
  ),

  M(
    'm_med_blackstreet_doctor_organ',
    GROWN,
    { back: true, stat: { health: [0, 64] } },
    '[Chợ Đen Y Tế · Phẫu Thuật Thay Tạng] Phổi và nội tạng của bạn bị tổn thương nặng nề bởi khói độc Backstreets và những trận giao tranh đẫm máu. Một bác sĩ ngầm đề xuất can thiệp phẫu thuật để cứu vãn tuổi thọ.',
    '[Black Market Clinic · Organ Reconstruction] Acidic smog and deep kinetic trauma take a heavy toll on your lungs and viscera. An underground surgeon offers surgical intervention.',
    [
      C(
        'Cấy ghép phổi sinh học lọc độc vi mô tân tiến (-28 Ahn)',
        'Install advanced biomimetic detox lung graft (-28 Ahn)',
        'Sau ca mổ, bạn thở dễ hơn. Bác sĩ nhắc rằng màng lọc phải được thay định kỳ.',
        'Breathing came easier after surgery. The doctor reminded you that the filter would need regular replacement.',
        { health: 34, sanity: 4, wealth: -28 },
        { costAhn: 28 }
      ),
      C(
        'Tiêm huyết thanh thanh lọc nội tạng và kháng sinh đặc chế (-12 Ahn)',
        'Inject specialized visceral detox serum (-12 Ahn)',
        'Cơn ho ra máu dịu hẳn xuống sau khi liều huyết thanh đậm đặc ngấm vào cơ thể.',
        'The racking bloody cough subsided steadily as the concentrated antitoxin took effect.',
        { health: 18, sanity: 2, wealth: -12 },
        { costAhn: 12 }
      ),
      C(
        'Chỉ mua liều thuốc giảm ho và cồn rửa rẻ tiền (-2 Ahn)',
        'Buy cheap cough suppressants and generic alcohol (-2 Ahn)',
        'Thuốc làm tê liệt cổ họng tạm thời, đủ để bạn gượng dậy tiếp tục bước đi.',
        'The coarse pills numbed your throat temporarily, just enough to keep you on your feet.',
        { health: 8, wealth: -2 },
        { costAhn: 2 }
      )
    ],
    I('Từ chối mổ xẻ, để cơ thể tự chống chọi.', 'Refuse surgery, letting the body fight on its own.', { health: -4 }),
    { theme: 'health' }
  ),

  M(
    'm_wellness_workshop_tuneup',
    GROWN,
    { notOut: true, jobs: ['Fixer', 'Syndicate', 'Workshop Craftsman'] },
    '[Bảo Trì Trang Bị Tại Workshop] Áo khoác chống đạn rách tơi tả, các khớp trợ lực kêu cọt kẹt và lưỡi kiếm mẻ cạnh sau chuỗi giao tranh khốc liệt. Một xưởng rèn uy tín chào mời gói bảo trì toàn diện.',
    '[Workshop Gear Overhaul & Maintenance] Shredded ballistic fabric, creaking pneumatic joints, and notched weapon edges. A reputable workshop offers complete tuning.',
    [
      C(
        'Đại tu toàn diện giáp nano và mài sắc lưỡi cắt phân tử (-22 Ahn)',
        'Commission full armor nano-reinforcement & molecular hone (-22 Ahn)',
        'Bộ giáp được vá kín, lưỡi kiếm mài lại. Chủ xưởng giới thiệu tay nghề của bạn với vài khách quen.',
        'The armor was patched and the blade honed. The proprietor mentioned your work to a few regular clients.',
        { rep: 8, network: 5, wealth: -22 },
        { costAhn: 22 }
      ),
      C(
        'Tra dầu giảm chấn và tán lại đinh chốt chịu lực (-6 Ahn)',
        'Lubricate shock absorbers and re-rivet kinetic plates (-6 Ahn)',
        'Tiếng kêu cót két biến mất. Người thợ nhận ra dấu hiệu xưởng cũ trên bộ giáp và nhớ tên bạn.',
        'The creaking stopped. The mechanic recognized an old workshop mark on your armor and remembered your name.',
        { rep: 3, wealth: -6 },
        { costAhn: 6 }
      )
    ],
    I('Tiếc tiền không bảo dưỡng, mặc kệ trang bị xuống cấp.', 'Spare the coin, leaving worn gear to slowly degrade.', { rep: -2 }),
    { theme: 'wealth' }
  ),

  M(
    'm_med_child_remedy',
    YOUNG,
    { notOut: true, stat: { health: [0, 71] } },
    '[Tiệm thuốc đầu ngõ] Người lớn nhận ra bạn không đủ sức đi hết bậc thang: có thể do cơn sốt, cũng có thể do vết thương chưa được rửa. Tiệm thuốc vẫn sáng đèn; trên bàn nhà còn một ít nước đã đun.',
    '[The corner pharmacy] The adults noticed you could barely climb the stairs, whether from fever or an untreated wound. The pharmacy was still open; a little boiled water remained at home.',
    [
      C(
        'Nhờ người mua thuốc và băng sạch (-1 Ahn)',
        'Ask someone to buy medicine and clean bandages (-1 Ahn)',
        'Người lớn rửa vết đau, cho bạn uống thuốc rồi thay băng. Đêm ấy bạn ngủ được một giấc trọn.',
        'An adult cleaned the sore place, gave you medicine and changed the bandage. You slept through the night.',
        { health: 12, sanity: 3, wealth: -1 }
      ),
      C(
        'Ở nhà, uống nước đun sôi và để cơ thể nghỉ',
        'Stay home, drink boiled water and rest',
        'Bạn nằm yên hai ngày. Khi đứng dậy, chân vẫn hơi run nhưng đã chịu nổi sức nặng của mình.',
        'You lay still for two days. Your legs shook when you rose, but they held your weight.',
        { health: 8 }
      ),
      C(
        'Gượng dậy nhặt ve chai dù chưa khỏe',
        'Go scavenging before you have recovered',
        'Bạn bán được ít kim loại. Trên đường về, bạn phải ngồi lại hai lần để thở.',
        'You sold a little scrap. On the way home, you stopped twice to catch your breath.',
        { health: -3, wealth: 2, sanity: -4 }
      )
    ],
    I('Bạn bỏ qua tiệm thuốc và nằm nghỉ ở nhà.', 'You passed the pharmacy and stayed home to rest.', { health: 4 }),
    { theme: 'health' }
  )
];

export default LIFE_MINORS;
