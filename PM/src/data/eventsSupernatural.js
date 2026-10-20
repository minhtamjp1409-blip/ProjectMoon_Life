// ============================================================================
// MAJOR EVENTS: WORKSHOPS, BLOODFIENDS, THE GREAT LAKE, HONGYUAN, THE PINKY,
// AND CARMEN'S VOICE. Plus the Fixer request templates.
// The "[Title]" opening each text heads the decision panel.
// ============================================================================

export const SUPERNATURAL_EVENTS = [
  // ------------------------------------------------------------------ the Workshop
  {
    id: 'ws_forge_masterpiece_event',
    age: [20, 65],
    major: true,
    weight: 7,
    jobs: ['Workshop Craftsman'],
    vi: '[Khối kim loại còn chảy máu] Một Fixer Grade 1 đặt lên đe của bạn một khối hợp kim lấy ra từ lõi một Abnormality. Nó vẫn rỉ ra thứ gì đó màu đen. "Làm cho tôi một thanh kiếm từ cái này." Nước tôi thép bình thường sẽ làm nó nứt. Những người thợ già nói chỉ có máu mới giữ được nó.',
    en: '[The metal that still bleeds] A Grade 1 Fixer set a lump of alloy on your anvil, cut from the core of an Abnormality. It was still seeping something black. “Make me a sword from this.” Ordinary quenching water would crack it. The old smiths say only blood will hold it.',
    choices: [
      {
        labelVi: 'Tôi thép bằng máu của chính bạn',
        labelEn: 'Quench it in your own blood',
        resultVi: 'Khi lưỡi thép chạm vào máu bạn, hơi nước bốc lên màu đỏ và có mùi sắt. Thanh kiếm không nứt. Lúc bạn cầm nó lên, nó ấm, như thể có mạch đập.',
        resultEn: 'When the blade met your blood the steam rose red and smelled of iron. It did not crack. When you lifted it, it was warm, as if it had a pulse.',
        openCraftModal: true,
        effects: { health: -22, wealth: +30, rep: +24, network: +16, resonance: +18 },
        flagsAdd: ['유물'],
        recordsAdd: ['workshop_masterpiece'],
        scarsAdd: ['Thanh kiếm tôi bằng máu mình'],
        meritAdd: 28
      },
      {
        labelVi: 'Làm thêm một khẩu súng bắn xuyên tường cho người trả giá cao hơn (vi phạm Taboo)',
        labelEn: 'Also build a wall-piercing gun for a higher bidder (a Taboo violation)',
        resultVi: 'Viên đạn thử xuyên qua bốn bức tường bê tông. Người mua trả gấp đôi, không hỏi gì. Ba ngày sau, có người mặc đồng phục B Corp đứng đối diện xưởng của bạn, không làm gì cả, chỉ nhìn.',
        resultEn: 'The test round went through four concrete walls. The buyer paid double and asked nothing. Three days later someone in a B Corp uniform stood across from your workshop, doing nothing, only watching.',
        effects: { wealth: +48, rep: +18, taboo: +2, sanity: -14, resonance: +16 },
        flagsAdd: ['유물'],
        recordsAdd: ['workshop_masterpiece'],
        scarsAdd: ['Khẩu súng phạm Taboo'],
        meritAdd: 22,
        scheduleConsequences: [
          {
            eventId: 'csq_taboo_workshop_raid',
            delayYears: 4,
            reasonVi: 'Khẩu súng phạm Taboo bị Tres và B Corp phát hiện',
            reasonEn: 'The Taboo firearm was traced by Tres and B Corp'
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ Bloodfiends
  {
    id: 'bf_crimson_awakening',
    age: [19, 48],
    major: true,
    weight: 7,
    forbids: ['Bloodfiend'],
    vi: '[Lời đề nghị của Bloodfiend] Cả đội của bạn đã chết trong căn biệt thự dưới lòng đất. Một Elder Bloodfiend giữ cổ bạn bằng một tay, không cần dùng sức.\n"Ngươi có thể làm Bloodbag, ta sẽ uống ngươi từ từ. Hoặc ngươi uống máu ta, và sống mãi với cơn khát."',
    en: '[A Bloodfiend’s offer] Your whole squad died in the underground manor. An Elder Bloodfiend held you by the throat with one hand, without effort.\n“You can be a Bloodbag, and I will drink you slowly. Or you can drink from me, and live forever with the thirst.”',
    choices: [
      {
        labelVi: 'Uống máu từ cổ tay bà ta',
        labelEn: 'Drink from her wrist',
        resultVi: 'Máu của bà ta nóng như kim loại chảy. Răng của bạn dài ra, xương của bạn gãy rồi tự liền lại theo một hình dạng khác. Bạn sẽ sống rất lâu. Và đêm nào bạn cũng khát.',
        resultEn: 'Her blood burned like molten metal. Your teeth lengthened; your bones broke and set themselves into a different shape. You will live a very long time. And every night you will thirst.',
        flagsAdd: ['Bloodfiend'],
        effects: { health: +35, sanity: -30, rep: +18, resonance: +30 },
        scarsAdd: ['Cơn khát không bao giờ hết'],
        meritAdd: 24,
        scheduleConsequences: [
          {
            eventId: 'csq_bloodfiend_banquet_call',
            delayYears: 5,
            reasonVi: 'Elder triệu tập bạn dự đêm tiệc máu',
            reasonEn: 'The Elder summons you to the blood banquet'
          }
        ]
      },
      {
        labelVi: 'Đập vỡ chai dầu cháy trên người mình',
        labelEn: 'Smash the incendiary flask on yourself',
        resultVi: 'Lửa bắt vào lưng bạn và vào tay bà ta cùng lúc. Bà ta buông ra. Đúng lúc đó, người của Fanghunt Office phá cửa với những cây cọc gỗ. Họ chia cho bạn tiền thưởng.',
        resultEn: 'The fire caught your back and her arm at the same moment. She let go. Right then, Fanghunt Office broke down the door with their stakes. They split the bounty with you.',
        effects: { health: -34, sanity: +8, wealth: +28, rep: +24, network: +16 },
        scarsAdd: ['Lưng bỏng đêm ấy'],
        meritAdd: 26
      }
    ]
  },

  // ------------------------------------------------------------------ the Great Lake
  {
    id: 'lake_calamity_whale_hunt',
    age: [19, 55],
    major: true,
    weight: 8.5,
    vi: '[Cá Voi trên The Great Lake] Giữa cơn bão, một con Cá Voi trồi lên và nuốt nửa đoàn tàu. Những thủy thủ dính phải thứ dịch trắng của nó bắt đầu cứng lại như sáp, chân dính vào nhau thành đuôi cá. Rồi họ quay lại cắn những người còn sống.\nNgười đứng cạnh bạn đã trắng lên đến tận cổ.',
    en: '[The Whale on the Great Lake] In the middle of the storm a Whale surfaced and swallowed half the fleet. Sailors splashed with its white fluid began to harden like wax, their legs fusing into tails. Then they turned and bit the living.\nThe person beside you had turned white up to the neck.',
    choices: [
      {
        labelVi: 'Cắt cánh tay đang hóa trắng của người ấy, rồi buộc mình vào dây lao và phóng thẳng vào mắt con Cá Voi',
        labelEn: 'Cut off their whitening arm, then tie yourself to the harpoon line and drive it into the Whale’s eye',
        outcomes: [
          {
            w: 56,
            resultVi: 'Mũi lao đi vào mắt nó. Con Cá Voi chìm xuống, kéo theo một dòng xoáy trắng. Ở District 21, người ta kể chuyện này trong các quán rượu, và mỗi lần kể con Cá Voi lại to thêm một chút.',
            resultEn: 'The harpoon went into its eye. The Whale sank, dragging a white whirlpool down with it. In District 21 they tell this story in the bars, and every time the Whale gets a little bigger.',
            effects: { health: -32, sanity: -16, wealth: +38, rep: +34, resonance: +24 },
            recordsAdd: ['lake_whale_slayer'],
            scarsAdd: ['Vết trắng trên vai'],
            meritAdd: 36
          },
          {
            w: 44,
            resultVi: 'Đuôi nó đập vỡ thân tàu. Một mảng trắng bám lên vai bạn và bắt đầu lan. Bạn nung dao trên đèn dầu và tự cắt bỏ mảng thịt đó trước khi nó lan xuống tim.',
            resultEn: 'Its tail broke the hull apart. A white patch landed on your shoulder and began to spread. You heated a knife over the oil lamp and cut that flesh out yourself before it reached your heart.',
            effects: { health: -50, sanity: -30, resonance: +30 },
            scarsAdd: ['Mảng thịt tự cắt bỏ']
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ Hongyuan
  {
    id: 'hy_hierarch_evaluation',
    age: [20, 50],
    major: true,
    weight: 8,
    vi: '[Kỳ chọn Gia chủ ở Hongyuan] Ở District 8, những người thừa kế của các đại gia tộc ngồi uống trà và mỉm cười trong khi người hầu của họ giết nhau dưới sân.\nĐể trở thành Gia chủ, bạn phải nuốt một viên Bolus luyện từ máu của những người đã thua. Nếu cơ thể bạn không chịu được, nó sẽ ăn bạn từ bên trong.',
    en: '[Choosing a Hierarch in Hongyuan] In District 8 the heirs of the great families sit drinking tea and smiling while their servants kill each other in the courtyard below.\nTo become Hierarch you must swallow a Bolus refined from the blood of those who lost. If your body cannot bear it, it will eat you from the inside.',
    choices: [
      {
        labelVi: 'Nuốt viên Bolus',
        labelEn: 'Swallow the Bolus',
        outcomes: [
          {
            w: 58,
            resultVi: 'Máu đen chảy ra từ mắt và mũi bạn suốt một đêm. Đến sáng, bạn đứng dậy và cơ thể bạn không còn như trước. Ba người anh em họ chưa kịp đặt chén trà xuống.',
            resultEn: 'Black blood ran from your eyes and nose all night. By morning you stood, and your body was not what it had been. Three cousins had not yet set down their teacups.',
            flagsAdd: ['HongyuanHierarch'],
            recordsAdd: ['hongyuan_lord'],
            effects: { health: +20, wealth: +45, rep: +36, network: +30, sanity: -24, resonance: +26 },
            scarsAdd: ['Viên Bolus của Hongyuan'],
            meritAdd: 38
          },
          {
            w: 42,
            resultVi: 'Viên Bolus làm vỡ các mạch máu của bạn từ bên trong. Bạn phải tự rạch để máu độc chảy ra, rồi bò khỏi sân trong khi những người thừa kế khác tiếp tục uống trà.',
            resultEn: 'The Bolus burst your blood vessels from within. You had to cut yourself open to let the poison out, then crawl from the courtyard while the other heirs went on drinking their tea.',
            effects: { health: -46, sanity: -28, resonance: +28 },
            scarsAdd: ['Viên Bolus không chịu nổi']
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ the Pinky
  {
    id: 'pinky_star_blade_oath',
    age: [22, 55],
    major: true,
    weight: 7.5,
    jobs: ['Syndicate', 'Fixer'],
    vi: '[Lời thề của The Pinky] Trên đỉnh một tháp chuông dưới mưa, một người của The Pinky rút thanh kiếm khỏi ngực kẻ phản bội và đặt nó xuống chân bạn.\n"Ở The Pinky không có cấp bậc, chỉ có lời thề. Hãy lấy một mảnh xương sườn của ngươi gắn vào chuôi kiếm này."',
    en: '[The Pinky’s oath] On top of a bell tower in the rain, someone of the Pinky drew a sword from a traitor’s chest and laid it at your feet.\n“In the Pinky there are no ranks, only oaths. Take a piece of your own rib and set it into this hilt.”',
    choices: [
      {
        labelVi: 'Làm theo',
        labelEn: 'Do it',
        resultVi: 'Bạn tự làm, bằng một con dao nhỏ, trong lúc người kia đứng nhìn không nói gì. Mảnh xương vừa khít với chuôi kiếm, như thể nó đã chờ ở đó. Từ đêm nay, bạn là một Star của The Pinky.',
        resultEn: 'You did it yourself, with a small knife, while the other watched in silence. The piece of bone fit the hilt exactly, as if it had been waiting there. From tonight you are a Star of the Pinky.',
        setFinger: 'Pinky',
        setFingerRank: 2,
        recordsAdd: ['pinky_star'],
        effects: { health: -28, sanity: -15, rep: +36, wealth: +28, resonance: +28 },
        scarsAdd: ['Mảnh xương sườn trong chuôi kiếm'],
        meritAdd: 36
      }
    ]
  },

  // ------------------------------------------------------------------ Carmen
  {
    id: 'ego_carmen_crossroad',
    age: [18, 99],
    major: true,
    weight: 999,
    forbids: ['EGOAwakened', 'Distorted'],
    vi: '[Can you hear my voice?] Mọi thứ bạn từng mất quay về cùng một lúc ({scars}). Căn phòng tan ra thành một thứ ánh sáng ấm, quá ấm. Một giọng phụ nữ dịu dàng vang lên ngay bên trong đầu bạn:\n"Đau lắm, phải không? Ở The City này, cố giữ hình người chỉ khiến bạn bị xé ra từng mảnh. Bạn có thể buông tay. Bạn có thể trở thành điều bạn thật sự muốn."',
    en: '[Can you hear my voice?] Everything you ever lost came back at once ({scars}). The room melted into a warm light, too warm. A gentle woman’s voice spoke from inside your head:\n“It hurts so much, doesn’t it? In this City, holding on to a human shape only gets you torn apart piece by piece. You can let go. You can become what you truly want.”',
    choices: [
      {
        labelVi: '"Nỗi đau này là của tôi. Tôi sẽ giữ nó."',
        labelEn: '“This pain is mine. I’m keeping it.”',
        resultVi: 'Bạn giữ chặt từng ký ức, kể cả những cái làm bạn muốn chết. Ánh sáng vỡ ra. Khi bạn mở mắt, có một thứ mới đang bao quanh bạn, làm từ chính những gì bạn đã chịu đựng. Nó nghe lời bạn.',
        resultEn: 'You held on to every memory, even the ones that made you want to die. The light broke. When you opened your eyes something new surrounded you, made of everything you had endured. It answers to you.',
        openEgoModal: true,
        flagsAdd: ['EGOAwakened', 'ShinAwakened'],
        recordsAdd: ['ego_effloresced'],
        effects: { health: +30, sanity: +55, rep: +38, resonance: +25 },
        scarsAdd: ['Người đã không buông tay'],
        meritAdd: 45
      },
      {
        labelVi: 'Nhắm mắt lại, và để giọng nói ấy dẫn bạn đi',
        labelEn: 'Close your eyes, and let the voice lead you',
        resultVi: 'Không còn đau nữa. Đó là điều đầu tiên bạn nhận ra. Điều thứ hai là cơ thể bạn đang đổi hình, và bạn không muốn nó dừng lại. Sáng hôm sau, Hana Association mở một hồ sơ mới: Distortion, chưa xếp hạng.',
        resultEn: 'It no longer hurt. That was the first thing you noticed. The second was that your body was changing shape, and you didn’t want it to stop. The next morning Hana Association opened a new file: Distortion, unrated.',
        flagsAdd: ['Distorted'],
        recordsAdd: ['distortion_awaken'],
        effects: { health: +45, sanity: -60, rep: +32, heat: +50, resonance: +50 },
        scarsAdd: ['Distortion'],
        meritAdd: 35
      }
    ]
  }
];

// ============================================================================
// FIXER REQUEST TEMPLATES, by threat tier (Canard → Star of the City)
// ============================================================================

export const FIXER_REQUESTS = [
  {
    id: 'req_rats_organ',
    tier: 0,
    typeVi: 'Dẹp một ổ Rat buôn nội tạng',
    typeEn: 'Clear out an organ-trading Rat den',
    vi: 'Một nhóm Rat đang bắt công nhân ca đêm vào tầng hầm để lấy giác mạc và gan. Khu phố góp tiền thuê bạn.',
    en: 'A group of Rats is taking night-shift workers into a cellar for their corneas and livers. The neighborhood pooled money to hire you.',
    okVi: 'Bạn đạp cửa hầm. Bốn tên Rat, một cái bàn, một người còn sống trên bàn. Khi bạn ra, chỉ còn người trên bàn là còn sống.',
    okEn: 'You kicked in the cellar door. Four Rats, one table, one living person on it. When you came out, only the person on the table was still alive.',
    failVi: 'Chúng ném một lọ axit vào mặt bạn rồi chạy xuống cống. Bạn mất một bên lông mày và cả số tiền công.',
    failEn: 'They threw a jar of acid in your face and fled into the sewer. You lost an eyebrow and the whole fee.',
    deathVi: 'Bạn vướng vào dây thép giăng trong bóng tối của tầng hầm, và chúng có thêm một người trên bàn.',
    deathEn: 'You tangled in wire strung across the dark cellar, and they had one more person for the table.'
  },
  {
    id: 'req_zwei_vip_escort',
    tier: 1,
    typeVi: 'Hộ tống một nhân chứng',
    typeEn: 'Escort a witness',
    vi: 'Một người nắm giữ sổ sách của một Syndicate cần đến được cổng Nest. Ba nhóm sát thủ đang tìm họ.',
    en: 'Someone holding a Syndicate’s ledgers needs to reach the Nest gate. Three teams of killers are looking for them.',
    okVi: 'Người cuối cùng chặn đường bạn ở cây cầu. Bạn đẩy thân chủ qua cổng đúng lúc cổng đóng lại.',
    okEn: 'The last of them stopped you at the bridge. You pushed the client through the gate just as it closed.',
    failVi: 'Viên đạn bắn tỉa đi xuyên qua vai bạn trước, rồi mới đến thân chủ.',
    failEn: 'The sniper’s round went through your shoulder first, and then through the client.',
    deathVi: 'Trong con hẻm hẹp, bạn và thân chủ nằm xuống cạnh nhau.',
    deathEn: 'In the narrow alley, you and the client went down side by side.'
  },
  {
    id: 'req_pierre_bistro_rescue',
    tier: 2,
    typeVi: 'Bếp sau của một Bistro ở District 23',
    typeEn: 'The back kitchen of a District 23 bistro',
    vi: 'Con gái một thương nhân bị bắt vào bếp sau của một quán ăn ở District 23. Thời gian còn lại tính bằng giờ, trước khi thực đơn tối nay được in.',
    en: 'A merchant’s daughter was taken into the back kitchen of a District 23 restaurant. There are hours left, before tonight’s menu is printed.',
    okVi: 'Bạn chặt cánh tay cầm dao của bếp trưởng, đá đổ lò, và gỡ cô gái khỏi móc. Cô ấy còn sống. Cô ấy không nói gì suốt đường về.',
    okEn: 'You took off the head chef’s knife arm, kicked over the oven, and lifted the girl off the hook. She was alive. She said nothing the whole way back.',
    failVi: 'Khói trong bếp dày đến mức bạn không thấy đường. Khi bạn tìm được phòng lạnh thì đã muộn.',
    failEn: 'The smoke in the kitchen was so thick you could not see. By the time you found the cold room, it was too late.',
    deathVi: 'Bếp trưởng ra tay từ phía sau. Thực đơn tối nay có một món mới.',
    deathEn: 'The head chef came from behind. Tonight’s menu had a new dish.'
  },
  {
    id: 'req_syndicate_turf_suppression',
    tier: 3,
    typeVi: 'Chặn cuộc chiến giữa Kurokumo và Blade Lineage (Urban Plague)',
    typeEn: 'Stop the Kurokumo and Blade Lineage war (Urban Plague)',
    vi: 'Cuộc chiến giữa Kurokumo Clan và Blade Lineage đã lan đến khu chợ. Người chết nằm trên đường mà không ai dám đến dọn.',
    en: 'The war between the Kurokumo Clan and the Blade Lineage has reached the market. The dead lie in the street and no one dares collect them.',
    okVi: 'Bạn hạ được người dẫn đầu của cả hai bên. Không có ai đứng ra thay họ, nên cả hai bên rút đi.',
    okEn: 'You brought down the leaders of both sides. No one stepped up to replace them, so both sides withdrew.',
    failVi: 'Một nhát kiếm từ khoảng cách không thể với tới mở ngực bạn. Bạn bò đi dưới những cái xác.',
    failEn: 'A cut from a distance no blade should reach opened your chest. You crawled away under the bodies.',
    deathVi: 'Bạn không kịp nhìn thấy người đã chém mình.',
    deathEn: 'You never saw the one who cut you down.'
  },
  {
    id: 'req_sweeper_night_defense',
    tier: 4,
    typeVi: 'Giữ một khu dân cư qua Night in the Backstreets (Urban Nightmare)',
    typeEn: 'Hold a residential block through the Night in the Backstreets (Urban Nightmare)',
    vi: 'Hệ thống bảo vệ của một khu nhà hỏng đúng 3 giờ 10. Nếu không ai giữ cửa, cả khu sẽ không còn ai vào sáng mai.',
    en: 'A block’s protection system failed at exactly 3:10. If no one holds the door, there will be no one left in the block by morning.',
    okVi: 'Tám mươi mốt phút. Khi trời sáng, bạn vẫn đứng ở cửa, và sau lưng bạn vẫn còn tiếng trẻ con khóc.',
    okEn: 'Eighty-one minutes. When dawn came you were still standing in the doorway, and behind you children were still crying.',
    failVi: 'Hàng rào vỡ ở phút thứ bảy mươi. Bạn rút vào trong cùng những người còn lại và mất một mảng thịt đùi.',
    failEn: 'The barricade broke at minute seventy. You fell back inside with whoever was left and lost a piece of your thigh.',
    deathVi: 'Sáng hôm sau, bậc cửa khu nhà sạch bong.',
    deathEn: 'The next morning, the block’s doorstep was spotless.'
  },
  {
    id: 'req_star_of_the_city_raid',
    tier: 5,
    typeVi: 'Chế áp một Distortion cấp Star of the City',
    typeEn: 'Subjugate a Star of the City Distortion',
    vi: 'Một Distortion đã biến cả một khu thành nơi không ai đi qua mà còn tỉnh táo. Ba đội của Association đã không quay về.',
    en: 'A Distortion has turned a whole sector into a place no one crosses and stays sane. Three Association teams did not come back.',
    okVi: 'Bạn tìm thấy phần còn là người bên trong nó, và kết thúc nó ở đó.',
    okEn: 'You found the part of it that was still a person, and ended it there.',
    failVi: 'Nó chỉ nhìn bạn một lần. Các mạch máu dưới da bạn vỡ ra. Bạn về được, không ai hiểu bằng cách nào.',
    failEn: 'It looked at you once. The blood vessels under your skin burst. You made it back, and no one understands how.',
    deathVi: 'Nó thêm bạn vào bài hát của nó.',
    deathEn: 'It added you to its song.'
  }
];


