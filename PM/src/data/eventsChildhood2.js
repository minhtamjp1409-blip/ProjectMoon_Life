// ============================================================================
// CHILDHOOD MAJOR EVENTS, second set (ages 4-12).
// Before this set, a Backstreets child aged 5-6 had exactly one eligible major
// event (the 3:13 night), so nearly every life opened with it. These spread the
// first turning point across neighborhoods and kinds of trouble.
// Same shape as eventsChildhood.js. Two callbacks at the end return years later.
// ============================================================================

const BACK = { requires: ['Backstreets'], forbids: ['Nest', 'Outskirts'] };
const NEST = { requires: ['Nest'] };
const OUT = { requires: ['Outskirts'] };
const CITY = { forbids: ['Nest', 'Outskirts'] };

export const CHILDHOOD_EVENTS_2 = [
  {
    id: 'ch2_rat_toll',
    age: [5, 10],
    major: true,
    weight: 7,
    ...BACK,
    vi: '[Phí qua hẻm] Ba đứa Rat lớn hơn bạn vài tuổi chặn lối tắt ra chợ. Muốn đi qua thì nộp 1 Ahn. Trong túi bạn có đúng 1 Ahn, là tiền mẹ đưa để mua thuốc.',
    en: '[The toll in the alley] Three Rats a few years older than you were blocking the shortcut to the market. One Ahn to pass. You had exactly one Ahn in your pocket, the money your mother gave you for medicine.',
    choices: [
      {
        labelVi: 'Nộp tiền',
        labelEn: 'Pay',
        resultVi: 'Đứa cầm đầu cắn thử đồng xu rồi cho bạn đi. Tối đó bạn nói dối là hiệu thuốc hết hàng. Mẹ bạn ho suốt đêm.',
        resultEn: 'The leader bit the coin and waved you through. That night you lied that the pharmacy was sold out. Your mother coughed all night.',
        effects: { wealth: -2, sanity: -6 }
      },
      {
        labelVi: 'Chạy vòng qua đường cống',
        labelEn: 'Go the long way, through the drain',
        outcomes: [
          {
            w: 60,
            resultVi: 'Đường cống dài gấp ba và ngập tới đầu gối. Bạn về muộn, ướt sũng, nhưng mua được thuốc.',
            resultEn: 'The drain was three times as long and knee-deep. You got home late and soaked, but you got the medicine.',
            effects: { health: -4, sanity: +3 }
          },
          {
            w: 40,
            resultVi: 'Bọn chúng biết lối đó. Đứa nhỏ nhất đợi sẵn ở miệng cống với một mảnh kính. Bạn mất đồng xu và một ít da trên mu bàn tay.',
            resultEn: 'They knew that way too. The smallest one was waiting at the mouth of the drain with a shard of glass. You lost the coin and some skin off the back of your hand.',
            effects: { health: -9, wealth: -2, sanity: -4 },
            scarsAdd: ['Vết kính trên mu bàn tay']
          }
        ]
      },
      {
        labelVi: 'Gọi {friend} đi cùng, rồi đi thẳng qua',
        labelEn: 'Fetch {friend}, then walk straight through',
        need: { npc: 'friend' },
        outcomes: [
          {
            w: 55,
            resultVi: 'Hai đứa nắm tay nhau đi qua, mắt nhìn thẳng. Bọn Rat cười, nhưng không đứa nào động tay. Từ hôm đó {friend} gọi bạn là "đồ liều".',
            resultEn: 'The two of you walked through holding hands, eyes straight ahead. The Rats laughed, but none of them moved. From then on {friend} called you "the reckless one."',
            effects: { sanity: +4, rep: +3 },
            bond: { friend: 8 }
          },
          {
            w: 45,
            resultVi: 'Chúng xô {friend} ngã trước. Bạn đứng chắn, ăn hai cú đấm, và cả hai chạy thoát với đồng xu vẫn còn trong túi.',
            resultEn: 'They shoved {friend} down first. You stood over them, took two punches, and you both got away with the coin still in your pocket.',
            effects: { health: -6, rep: +4 },
            bond: { friend: 12 },
            mem: 'stood_for_friend'
          }
        ]
      }
    ]
  },
  {
    id: 'ch2_workshop_shavings',
    age: [6, 11],
    major: true,
    weight: 6.5,
    ...BACK,
    vi: '[Mạt sắt dưới sàn Workshop] Một Workshop nhỏ cuối phố trả bạn nửa Ahn mỗi tuần để quét mạt sắt. Chiều nay một Fixer đến nhận vũ khí. Người thợ cả đuổi bạn ra sau, nhưng cửa sau không đóng kín.',
    en: '[Shavings on the Workshop floor] A small Workshop at the end of the street pays you half an Ahn a week to sweep up metal shavings. This afternoon a Fixer came to collect a weapon. The master sent you out back, but the back door didn’t quite close.',
    choices: [
      {
        labelVi: 'Nhìn qua khe cửa',
        labelEn: 'Watch through the gap',
        resultVi: 'Fixer cầm thanh kiếm lên, xoay một vòng, rồi chém đôi tấm thép thử trên bàn. Người thợ cả không nói gì, chỉ ghi giá. Tối đó bạn quét sàn cẩn thận hơn mọi ngày.',
        resultEn: 'The Fixer picked up the sword, turned it once, and cut the test plate on the bench in half. The master said nothing, only wrote down the price. That evening you swept more carefully than ever.',
        effects: { sanity: +3, resonance: +4 },
        flagsAdd: ['해결사동경'],
        mem: 'workshop_shavings',
        later: [{ id: 'cb2_workshop_apprentice', years: 7, reasonVi: 'Người thợ cả nhớ đứa trẻ quét mạt sắt', reasonEn: 'The master remembers the kid who swept the shavings' }]
      },
      {
        labelVi: 'Nhặt một mảnh lưỡi hỏng giấu vào túi',
        labelEn: 'Pocket a broken blade fragment',
        outcomes: [
          {
            w: 60,
            resultVi: 'Không ai để ý. Bạn mài mảnh thép đó suốt mùa đông cho đến khi nó thành một con dao nhỏ.',
            resultEn: 'No one noticed. You spent the winter grinding the fragment until it became a small knife.',
            effects: { health: +2, sanity: +2 },
            flagsAdd: ['유물']
          },
          {
            w: 40,
            resultVi: 'Người thợ cả thấy. Ông lấy lại mảnh thép, trừ hết tiền công tháng đó, và không thuê bạn nữa.',
            resultEn: 'The master saw. He took the fragment back, kept that month’s pay, and never hired you again.',
            effects: { wealth: -2, rep: -3, sanity: -3 }
          }
        ]
      },
      {
        labelVi: 'Đi ra sau, đúng như được bảo',
        labelEn: 'Go out back, as you were told',
        resultVi: 'Bạn ngồi trên thùng phế liệu nghe tiếng mặc cả qua tường. Lúc về, người thợ cả cho thêm nửa Ahn mà không giải thích.',
        resultEn: 'You sat on a scrap bin listening to the haggling through the wall. When you left, the master gave you an extra half Ahn without saying why.',
        effects: { wealth: +2, rep: +2 },
        npcAdd: { role: 'mentor', bond: 45 },
        mem: 'workshop_shavings',
        later: [{ id: 'cb2_workshop_apprentice', years: 6, reasonVi: 'Người thợ cả nhớ đứa trẻ biết nghe lời', reasonEn: 'The master remembers the kid who did as told' }]
      }
    ]
  },
  {
    id: 'ch2_night_shift_missing',
    age: [5, 10],
    major: true,
    weight: 6,
    ...CITY,
    vi: '[Ca đêm không về] Sáng nay cha bạn không về sau ca đêm. Nhà máy cách bốn con phố. Người lớn trong khu bảo đợi thêm, nhưng từ sáng đến giờ không ai đi tìm.',
    en: '[The night shift] Your father didn’t come home from the night shift this morning. The factory is four streets away. The adults on the block say to wait, but no one has gone to look.',
    choices: [
      {
        labelVi: 'Tự đi tìm',
        labelEn: 'Go and look yourself',
        outcomes: [
          {
            w: 50,
            resultVi: 'Bạn tìm thấy cha ngồi sau bãi xe, mặt sưng, túi lương trống trơn. Người thu nợ của một Syndicate đã đợi ở cổng nhà máy. Hai người đi về, không ai nói gì.',
            resultEn: 'You found your father sitting behind the lot, face swollen, pay envelope empty. A Syndicate collector had been waiting at the factory gate. The two of you walked home without a word.',
            effects: { sanity: -6, wealth: -3, resonance: +4 },
            mem: 'saw_collector'
          },
          {
            w: 30,
            resultVi: 'Ca đêm bị giữ lại vì một vụ nổ ở xưởng. Cha về lúc trưa với hai bàn tay băng kín, và ôm bạn lâu hơn mọi khi.',
            resultEn: 'The night shift had been held over after a blast in the plant. He came home at noon with both hands bandaged, and held you longer than usual.',
            effects: { sanity: +2, health: -2 }
          },
          {
            w: 20,
            resultVi: 'Bạn đi khắp bốn con phố đến tối. Không ai thấy cha bạn. Tuần sau, nhà máy gửi về một chiếc hộp nhỏ đựng đồng hồ và giày, kèm một tờ giấy ghi "tai nạn lao động".',
            resultEn: 'You walked all four streets until dark. No one had seen him. The next week the factory sent a small box with a watch and a pair of shoes, and a slip that said "workplace accident."',
            effects: { sanity: -14, resonance: +10 },
            scarsAdd: ['Chiếc hộp từ nhà máy'],
            mem: 'parent_lost_shift'
          }
        ]
      },
      {
        labelVi: 'Ngồi đợi ở bậc cửa',
        labelEn: 'Wait on the doorstep',
        resultVi: 'Bạn ngồi đến khi đèn đường bật. Cha về, đi tập tễnh, và nói chỉ là bị ngã. Bạn biết là không phải.',
        resultEn: 'You sat until the streetlights came on. He came home limping and said it was only a fall. You knew it wasn’t.',
        effects: { sanity: -3, network: +1 }
      }
    ]
  },
  {
    id: 'ch2_stray_dog',
    age: [4, 9],
    major: true,
    weight: 5.5,
    forbids: ['Nest'],
    tags: ['relief'],
    vi: '[Con chó đi theo] Một con chó gầy đi theo bạn suốt ba ngày. Nó không sủa, chỉ đứng cách bạn mười bước. Phần ăn tối của bạn hôm nay là nửa ổ bánh mì.',
    en: '[The dog that followed you] A thin dog has followed you for three days. It doesn’t bark, it just stays ten steps behind. Your dinner today is half a loaf of bread.',
    choices: [
      {
        labelVi: 'Chia cho nó một nửa',
        labelEn: 'Give it half',
        outcomes: [
          {
            w: 70,
            resultVi: 'Từ hôm đó nó ngủ trước cửa nhà bạn. Có một đêm nó sủa đến khàn giọng, và sáng ra cả khu biết có kẻ đã định cạy cửa.',
            resultEn: 'From then on it slept outside your door. One night it barked itself hoarse, and in the morning the whole block knew someone had tried to force the lock.',
            effects: { health: -1, sanity: +8, network: +2 },
            mem: 'kept_dog'
          },
          {
            w: 30,
            resultVi: 'Nó ăn rồi đi mất. Một tuần sau bạn thấy nó trong lồng của người bán thịt ở chợ. Bạn không đi lối đó nữa.',
            resultEn: 'It ate and was gone. A week later you saw it in the butcher’s cage at the market. You stopped going that way.',
            effects: { health: -1, sanity: -6 }
          }
        ]
      },
      {
        labelVi: 'Ném đá đuổi nó đi',
        labelEn: 'Throw a stone to chase it off',
        resultVi: 'Nó lùi lại, nhìn bạn một lúc, rồi đi. Bạn ăn hết ổ bánh và vẫn thấy đói.',
        resultEn: 'It backed off, looked at you a while, and left. You ate the whole loaf and were still hungry.',
        effects: { health: +2, sanity: -3 }
      }
    ]
  },
  {
    id: 'ch2_thumb_procession',
    age: [7, 12],
    major: true,
    weight: 6.5,
    ...BACK,
    theme: 'thumb',
    vi: '[Khi The Thumb đi qua] Một đoàn soldato của The Thumb đi qua phố, áo đen, bước đều. Người lớn đứng dọc hai bên và cúi đầu. Bên cạnh bạn, {friend} vẫn đang cười vì một chuyện gì đó, rất to.',
    en: '[When the Thumb passes] A column of the Thumb’s soldati came down the street in black, in step. The adults lined both sides with their heads bowed. Next to you, {friend} was still laughing about something, loudly.',
    need: { npc: 'friend' },
    choices: [
      {
        labelVi: 'Ấn đầu {friend} cúi xuống',
        labelEn: 'Push {friend}’s head down',
        resultVi: 'Một Capo dừng lại trước hai đứa, nhìn rất lâu, rồi gật đầu với bạn như với một người lớn. Khi đoàn đi khuất, {friend} khóc vì sợ, không phải vì đau.',
        resultEn: 'A Capo stopped in front of you both, looked a long time, then nodded at you the way one nods at an adult. When the column was gone, {friend} cried from fear, not pain.',
        effects: { sanity: -2, rep: +4 },
        bond: { friend: 10 },
        mem: 'thumb_etiquette'
      },
      {
        labelVi: 'Cúi đầu, mặc kệ nó',
        labelEn: 'Bow, and leave them be',
        outcomes: [
          {
            w: 55,
            resultVi: 'Đoàn người đi qua như không nghe thấy. Tối đó cha của {friend} đánh nó một trận, và nó không chơi với bạn cả tháng.',
            resultEn: 'The column passed as if it hadn’t heard. That night {friend}’s father beat them, and they didn’t play with you for a month.',
            effects: { sanity: -2 },
            bond: { friend: -6 }
          },
          {
            w: 45,
            resultVi: 'Một soldato bước ra khỏi hàng và tát {friend} ngã xuống mặt đường. Không ai nhúc nhích, kể cả bạn. Răng cửa của {friend} không bao giờ mọc lại.',
            resultEn: 'A soldato stepped out of line and struck {friend} to the pavement. No one moved, you included. {friend}’s front tooth never grew back.',
            effects: { sanity: -8, resonance: +5 },
            bond: { friend: -10 },
            mem: 'froze_for_friend'
          }
        ]
      }
    ]
  },
  {
    id: 'ch2_ring_square',
    age: [8, 12],
    major: true,
    weight: 5.5,
    ...BACK,
    theme: 'ring',
    vi: '[Tác phẩm ở quảng trường] Sáng nay quảng trường có một "tác phẩm" mới của The Ring. Trẻ con trong khu đứng thành vòng tròn quanh nó. Người lớn kéo con mình về, nhưng không ai kéo bạn.',
    en: '[The piece in the square] This morning there was a new "piece" by the Ring in the square. The kids on the block stood around it in a circle. Adults pulled their own children away, but no one pulled you.',
    choices: [
      {
        labelVi: 'Lại gần nhìn cho rõ',
        labelEn: 'Go closer and look',
        resultVi: 'Nó được sắp đặt rất cẩn thận, và có một tấm thẻ nhỏ ghi tên tác phẩm. Bạn đọc được tên đó. Bạn còn nhớ nó đến tận bây giờ.',
        resultEn: 'It had been arranged very carefully, with a small card giving its title. You could read the title. You still remember it.',
        effects: { sanity: -12, resonance: +12 },
        scarsAdd: ['Tên của một tác phẩm']
      },
      {
        labelVi: 'Quay lưng và về nhà',
        labelEn: 'Turn around and go home',
        resultVi: 'Bạn không nhìn, nhưng mùi thì vẫn theo bạn về tới cửa. Bạn không ăn được gì cả ngày.',
        resultEn: 'You didn’t look, but the smell followed you to the door. You couldn’t eat all day.',
        effects: { sanity: -4, health: -2 }
      },
      {
        labelVi: 'Kéo những đứa nhỏ hơn đi chỗ khác',
        labelEn: 'Lead the younger kids away',
        resultVi: 'Bạn dắt bốn đứa nhỏ ra bờ kênh và kể cho chúng nghe một câu chuyện bịa, dài đến tận trưa. Có một bà mẹ cảm ơn bạn bằng một quả trứng luộc.',
        resultEn: 'You took four little ones down to the canal and told them a made-up story that lasted until noon. One mother thanked you with a boiled egg.',
        effects: { sanity: -3, rep: +5, network: +2 }
      }
    ]
  },
  {
    id: 'ch2_block_fire',
    age: [5, 12],
    major: true,
    weight: 6,
    ...CITY,
    vi: '[Cháy dãy nhà] Lửa bắt từ một bếp than ở tầng dưới và lan lên cầu thang gỗ. Khói đã kín hành lang. Trong phòng bạn có cái hộp sắt đựng tiền dành dụm của cả nhà. Phòng bên cạnh có tiếng một đứa bé khóc.',
    en: '[Fire in the block] A charcoal stove downstairs caught, and the fire climbed the wooden stairs. Smoke filled the corridor. In your room was the tin box with the family’s savings. In the next room, a baby was crying.',
    choices: [
      {
        labelVi: 'Ôm đứa bé chạy ra',
        labelEn: 'Grab the baby and run',
        outcomes: [
          {
            w: 70,
            resultVi: 'Bạn ra được tới sân với đứa bé trong tay và tóc cháy xém một bên. Hộp tiền cháy cùng căn phòng. Mẹ đứa bé quỳ xuống trước mặt bạn ngay giữa phố.',
            resultEn: 'You made it to the yard with the baby in your arms and one side of your hair singed. The savings burned with the room. The baby’s mother knelt in front of you in the middle of the street.',
            effects: { health: -8, wealth: -6, rep: +8, sanity: +3 },
            mem: 'saved_baby_fire'
          },
          {
            w: 30,
            resultVi: 'Cầu thang sập sau lưng bạn. Bạn nhảy từ cửa sổ tầng hai xuống đống rác, đứa bé vẫn trong tay, và gãy cổ tay trái.',
            resultEn: 'The stairs collapsed behind you. You jumped from a second-floor window onto a rubbish heap with the baby still in your arms, and broke your left wrist.',
            effects: { health: -16, wealth: -6, rep: +10 },
            scarsAdd: ['Cổ tay gãy năm ấy'],
            mem: 'saved_baby_fire'
          }
        ]
      },
      {
        labelVi: 'Ôm hộp tiền chạy ra',
        labelEn: 'Grab the tin box and run',
        resultVi: 'Cả nhà giữ được tiền thuê chỗ ở mới. Tiếng khóc ở phòng bên tắt trước khi bạn ra tới sân. Không ai trách bạn. Bạn vẫn tự trách.',
        resultEn: 'The family kept enough to rent a new place. The crying next door stopped before you reached the yard. No one blamed you. You still do.',
        effects: { wealth: +4, sanity: -12, resonance: +8 },
        scarsAdd: ['Tiếng khóc ở phòng bên']
      }
    ]
  },
  {
    id: 'ch2_fever_ampoule',
    age: [4, 9],
    major: true,
    weight: 5.5,
    ...CITY,
    vi: '[Cơn sốt thứ tư] Đứa em họ ngủ cùng giường với bạn sốt đến ngày thứ tư. Hiệu thuốc đầu phố có HP Ampoule của K Corp, giá bằng hai tháng tiền nhà. Đêm nay hiệu thuốc khóa cửa, nhưng cửa sổ sau thì không.',
    en: '[The fourth day of fever] The cousin who shares your bed has had a fever for four days. The pharmacy at the corner has K Corp HP Ampoules, at two months’ rent each. Tonight the pharmacy is locked, but the back window isn’t.',
    choices: [
      {
        labelVi: 'Trèo vào lấy một ống',
        labelEn: 'Climb in and take one',
        outcomes: [
          {
            w: 55,
            resultVi: 'Bạn ra được với một ống ampoule trong áo. Sáng hôm sau em bạn ngồi dậy ăn cháo. Ông chủ hiệu thuốc dán ảnh bạn, vẽ rất xấu, lên cửa kính.',
            resultEn: 'You got out with an ampoule inside your shirt. The next morning your cousin sat up and ate porridge. The pharmacist taped a drawing of you, a bad one, to his window.',
            effects: { sanity: +4, rep: -4, heat: +6 },
            mem: 'stole_ampoule'
          },
          {
            w: 45,
            resultVi: 'Ông chủ ngủ ngay trong tiệm. Ông túm được cổ áo bạn, đánh cho một trận, rồi gọi cha mẹ bạn đến. Cả nhà trả tiền ống ampoule trong nửa năm.',
            resultEn: 'The pharmacist slept in the shop. He caught you by the collar, beat you, then sent for your parents. The family paid off the ampoule for half a year.',
            effects: { health: -8, wealth: -8, sanity: +2 }
          }
        ]
      },
      {
        labelVi: 'Ngồi lau người cho em suốt đêm',
        labelEn: 'Sit up all night cooling them down',
        outcomes: [
          {
            w: 60,
            resultVi: 'Gần sáng cơn sốt hạ. Hai đứa ngủ gục vào nhau. Bạn thấy mình già đi một chút trong đêm đó.',
            resultEn: 'Near dawn the fever broke. The two of you fell asleep against each other. You felt a little older after that night.',
            effects: { health: -3, sanity: +4 }
          },
          {
            w: 40,
            resultVi: 'Gần sáng em bạn thôi thở. Bạn vẫn cầm chiếc khăn ướt cho đến khi người lớn tới gỡ nó khỏi tay bạn.',
            resultEn: 'Near dawn your cousin stopped breathing. You were still holding the wet cloth when an adult came and took it from your hand.',
            effects: { sanity: -16, resonance: +10 },
            scarsAdd: ['Chiếc khăn ướt']
          }
        ]
      }
    ]
  },
  {
    id: 'ch2_library_doors',
    age: [8, 12],
    major: true,
    weight: 4.5,
    forbids: ['Outskirts'],
    vi: '[Cánh cửa của The Library] Có tin đồn về một tòa nhà mọc lên chỉ sau một đêm, gọi là The Library. Người đi vào có thể ra với một cuốn sách, hoặc không ra nữa. Lũ trẻ trong khu thách nhau đi tới gõ cửa.',
    en: '[The doors of the Library] There are rumors of a building that rose overnight, called the Library. People who go in come out with a book, or not at all. The kids on the block dare each other to go and knock.',
    choices: [
      {
        labelVi: 'Đi tới gõ cửa',
        labelEn: 'Go and knock',
        outcomes: [
          {
            w: 70,
            resultVi: 'Cánh cửa mở hé. Một người phụ nữ nhìn bạn từ đầu đến chân rồi nói: "Chưa phải lúc. Khi nào lớn hãy quay lại." Cánh cửa đóng. Lúc bạn quay đầu, cả con phố im phăng phắc.',
            resultEn: 'The door opened a crack. A woman looked you over and said, "Not yet. Come back when you are grown." The door closed. When you turned around, the whole street was silent.',
            effects: { sanity: -2, rep: +6, resonance: +8 },
            mem: 'library_not_yet'
          },
          {
            w: 30,
            resultVi: 'Bạn chưa kịp gõ thì cánh cửa đã không còn ở đó. Chỉ có bức tường gạch, và tay bạn đang đặt lên nó.',
            resultEn: 'Before you could knock, the door was no longer there. Only a brick wall, with your hand resting on it.',
            effects: { sanity: -5, resonance: +6 }
          }
        ]
      },
      {
        labelVi: 'Không đi, và bị gọi là nhát',
        labelEn: 'Don’t go, and be called a coward',
        resultVi: 'Chúng gọi bạn là "đồ nhát" hết một mùa. Đứa đã đi gõ cửa thay bạn thì không về nữa.',
        resultEn: 'They called you a coward for a whole season. The kid who went to knock in your place never came back.',
        effects: { rep: -3, sanity: -6 }
      }
    ]
  },
  {
    id: 'ch2_nest_empty_desk',
    age: [6, 11],
    major: true,
    weight: 6,
    ...NEST,
    vi: '[Chiếc bàn trống] Bạn ngồi cạnh nhau với cậu bạn ấy suốt hai năm. Sáng nay bàn của cậu đã bị dọn đi. Cô giáo nói gia đình cậu "đã chuyển xuống dưới". Ai cũng biết "dưới" nghĩa là Backstreets.',
    en: '[The empty desk] You sat next to him for two years. This morning his desk was gone. The teacher said his family had "moved down." Everyone knows "down" means the Backstreets.',
    choices: [
      {
        labelVi: 'Hỏi cô giáo địa chỉ mới của cậu ấy',
        labelEn: 'Ask the teacher for his new address',
        resultVi: 'Cô giáo im lặng rất lâu, rồi ghi chú gì đó vào sổ. Tuần sau cha mẹ bạn bị gọi lên gặp ban giám hiệu. Bạn không bao giờ hỏi nữa.',
        resultEn: 'The teacher was silent a long time, then wrote something in a book. The next week your parents were called in to see the principal. You never asked again.',
        effects: { sanity: -4, rep: -3, network: +1 },
        mem: 'asked_about_fallen'
      },
      {
        labelVi: 'Giữ lại cây bút cậu ấy để quên',
        labelEn: 'Keep the pen he left behind',
        resultVi: 'Đó là một cây bút rẻ tiền, loại người Nest không dùng. Bạn giữ nó trong ngăn kéo nhiều năm, như một lời nhắc rằng chỗ ngồi của mình cũng có thể bị dọn đi.',
        resultEn: 'It was a cheap pen, the kind Nest people don’t use. You kept it in a drawer for years, a reminder that your seat could be cleared away too.',
        effects: { sanity: -2, resonance: +4 },
        flagsAdd: ['유물']
      },
      {
        labelVi: 'Ngồi vào chỗ trống, gần cửa sổ hơn',
        labelEn: 'Take the empty seat, closer to the window',
        resultVi: 'Chỗ đó có nắng hơn. Đến cuối tuần thì không còn ai nhắc tới tên cậu ấy nữa, kể cả bạn.',
        resultEn: 'It was sunnier there. By the end of the week no one mentioned his name anymore, you included.',
        effects: { sanity: +2, rep: +2 }
      }
    ]
  },
  {
    id: 'ch2_nest_service_lift',
    age: [7, 11],
    major: true,
    weight: 5.5,
    ...NEST,
    vi: '[Thang máy chở hàng] Thang máy chở hàng ở tầng hầm không cần thẻ cư dân. Người giao hàng bảo nó đi thẳng xuống Backstreets. Bạn có hai giờ trước khi bảo mẫu phát hiện.',
    en: '[The freight lift] The freight lift in the basement doesn’t need a resident card. The delivery man said it goes straight down to the Backstreets. You have two hours before the nanny notices.',
    choices: [
      {
        labelVi: 'Đi xuống',
        labelEn: 'Go down',
        outcomes: [
          {
            w: 55,
            resultVi: 'Dưới đó ồn, bẩn, và đông người đến mức bạn không thở nổi. Một bà cụ bán cho bạn một xiên thịt nướng ngon nhất đời. Bạn về kịp, giày dính đầy bùn, và giấu chúng dưới giường.',
            resultEn: 'Down there it was loud, filthy, and so crowded you could barely breathe. An old woman sold you the best skewer of your life. You got back in time, shoes caked in mud, and hid them under the bed.',
            effects: { sanity: +6, resonance: +4, network: +2 },
            mem: 'saw_backstreets_young'
          },
          {
            w: 45,
            resultVi: 'Một gã đàn ông đi theo bạn ba con phố, hỏi bạn sống ở tầng nào. Bạn chạy về thang máy. An ninh của Nest đã đợi sẵn ở cửa, và cha mẹ bạn đứng phía sau họ.',
            resultEn: 'A man followed you for three streets, asking what floor you lived on. You ran back to the lift. Nest security was waiting at the doors, with your parents behind them.',
            effects: { sanity: -8, rep: -3 },
            mem: 'saw_backstreets_young'
          }
        ]
      },
      {
        labelVi: 'Bấm nút rồi chạy ra trước khi cửa đóng',
        labelEn: 'Press the button and jump out before the doors close',
        resultVi: 'Thang máy đi xuống không có ai. Bạn nghe tiếng nó rơi xa dần, rất lâu, lâu hơn bạn tưởng một tòa nhà có thể cao.',
        resultEn: 'The lift went down empty. You listened to it fall away, for a long time, longer than you thought a building could be tall.',
        effects: { sanity: -1, resonance: +3 }
      }
    ]
  },
  {
    id: 'ch2_out_wall_trader',
    age: [5, 11],
    major: true,
    weight: 7,
    ...OUT,
    vi: '[Người buôn ở chân tường] Một người buôn từ trong The City dựng lều ở chân tường. Ông ta đổi muối và thuốc lấy kim loại vụn, và nói cần một đứa trẻ nhanh tay theo ông vào trong làm việc. Ông trả trước cho gia đình một túi muối.',
    en: '[The trader at the wall] A trader from inside the City set up a tent at the foot of the wall. He traded salt and medicine for scrap metal, and said he needed a quick-handed child to come inside and work for him. He would pay the family a sack of salt up front.',
    choices: [
      {
        labelVi: 'Xin đi theo',
        labelEn: 'Ask to go with him',
        outcomes: [
          {
            w: 40,
            resultVi: 'Bạn qua được bức tường trong một thùng hàng. Bên trong, ông ta bán lại bạn cho một xưởng ở Backstreets với giá gấp mười túi muối. Ít ra ở đây có mái che.',
            resultEn: 'You crossed the wall in a crate. Inside, he sold you on to a Backstreets workshop for ten times a sack of salt. At least there was a roof.',
            effects: { health: -6, sanity: -8, wealth: +2 },
            flagsAdd: ['Backstreets'],
            flagsRemove: ['Outskirts'],
            mem: 'sold_inside_wall'
          },
          {
            w: 60,
            resultVi: 'Cha mẹ bạn không cho. Đêm đó họ nhổ lều của ông ta và đuổi ông đi bằng gậy. Sáng ra cả trại chia nhau túi muối ông bỏ lại.',
            resultEn: 'Your parents refused. That night they tore down his tent and drove him off with sticks. In the morning the camp shared out the sack of salt he left behind.',
            effects: { sanity: +3, health: +2, network: +2 }
          }
        ]
      },
      {
        labelVi: 'Lấy trộm thuốc trong lều của ông ta',
        labelEn: 'Steal medicine from his tent',
        resultVi: 'Bạn lấy được hai lọ. Một lọ là thuốc thật. Lọ kia là nước lã có màu. Cả trại biết ông ta là ai từ hôm đó.',
        resultEn: 'You got two bottles. One was real medicine. The other was coloured water. From then on the whole camp knew what he was.',
        effects: { health: +4, rep: +4, heat: +3 }
      }
    ]
  },
  {
    id: 'ch2_out_circling',
    age: [4, 10],
    major: true,
    weight: 6,
    ...OUT,
    vi: '[Thứ đi vòng quanh trại] Ba đêm liền có thứ gì đó đi vòng quanh trại, ngoài tầm đuốc. Người lớn thay nhau thức. Đêm nay đến lượt cha bạn, và ông ngủ gục bên đống lửa.',
    en: '[The thing circling the camp] For three nights something has been circling the camp, just beyond the torchlight. The adults take turns staying awake. Tonight is your father’s turn, and he has fallen asleep by the fire.',
    choices: [
      {
        labelVi: 'Ngồi thức thay ông',
        labelEn: 'Keep watch in his place',
        outcomes: [
          {
            w: 60,
            resultVi: 'Gần sáng bạn thấy nó: cao, gầy, đi bằng bốn chân như người đang bò. Bạn ném đuốc về phía nó và hét. Nó bỏ đi. Cha bạn thức dậy, nhìn đuốc tắt dưới đất, và hiểu.',
            resultEn: 'Near dawn you saw it: tall, thin, moving on all fours like a crawling man. You threw the torch at it and screamed. It left. Your father woke, saw the torch burnt out on the ground, and understood.',
            effects: { sanity: -6, rep: +8, resonance: +6 },
            mem: 'kept_watch'
          },
          {
            w: 40,
            resultVi: 'Bạn cũng ngủ thiếp đi. Sáng ra lều cuối trại trống trơn. Không ai nói ra, nhưng cha bạn không nhìn vào mắt ai suốt cả tháng.',
            resultEn: 'You fell asleep too. In the morning the last tent in the camp was empty. No one said it aloud, but your father couldn’t meet anyone’s eyes for a month.',
            effects: { sanity: -12, resonance: +8 },
            scarsAdd: ['Lều cuối trại']
          }
        ]
      },
      {
        labelVi: 'Đánh thức ông dậy',
        labelEn: 'Wake him up',
        resultVi: 'Ông giật mình, cầm ngay lấy rìu, và cảm ơn bạn bằng một cái gật đầu. Hai cha con ngồi canh đến sáng. Đêm đó không có gì xảy ra.',
        resultEn: 'He started awake, grabbed the axe, and thanked you with a nod. The two of you sat watch until dawn. Nothing happened that night.',
        effects: { sanity: +2, health: -2 }
      }
    ]
  },

  // ---------------------------------------------------------------- callbacks
  {
    id: 'cb2_workshop_apprentice',
    age: [12, 30],
    major: true,
    weight: 9,
    causalOnly: true,
    isCausalCallback: true,
    need: { mem: 'workshop_shavings' },
    forbids: ['Nest'],
    vi: '[Người thợ cả cuối phố] Người thợ cả ngày xưa trả bạn nửa Ahn để quét mạt sắt giờ đã già, tay run. Ông tìm đến nhà bạn và hỏi bạn có muốn học nghề không. "Mắt mày nhìn thép giống tao hồi trẻ."',
    en: '[The master at the end of the street] The master who once paid you half an Ahn to sweep shavings is old now, his hands shaking. He came to your door and asked if you wanted to learn the trade. "You look at steel the way I did when I was young."',
    choices: [
      {
        labelVi: 'Nhận lời',
        labelEn: 'Accept',
        resultVi: 'Ông dạy bạn đúng một năm trước khi không cầm búa được nữa. Đến cuối năm, ông để lại cho bạn chiếc búa và tấm biển treo trước cửa.',
        resultEn: 'He taught you for exactly one year before he couldn’t hold a hammer anymore. At the end of it, he left you the hammer and the sign over the door.',
        effects: { wealth: +6, rep: +6, resonance: +4 },
        flagsAdd: ['유물'],
        npcAdd: { role: 'mentor', bond: 70 }
      },
      {
        labelVi: 'Từ chối',
        labelEn: 'Decline',
        resultVi: 'Ông gật đầu, như đã đoán trước. Mùa đông năm đó Workshop đóng cửa. Lúc đi ngang qua, bạn thấy tấm biển đã bị gỡ xuống.',
        resultEn: 'He nodded, as if he had expected it. That winter the Workshop closed. Walking past, you saw the sign had been taken down.',
        effects: { sanity: -3 }
      }
    ]
  }
];
