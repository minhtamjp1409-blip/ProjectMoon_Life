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
    vi: '[Khối Hợp Kim Còn Nhịp Đập] Mùi lưu huỳnh, bồ hóng và dầu máy nguội ngắt bao trùm gian xưởng nhỏ của bạn. Trong màn sương axit của Backstreets, một Fixer Grade 1 mang áo măng tô chống đạn rách bươm, con mắt cơ khí xoay tít cọt kẹt, bước vào và thả một khối hợp kim nặng trịch xuống đe sắt. Khối kim loại được cắt ra từ lõi của một Abnormality vừa bị triệt hạ — nó rỉ ra thứ dịch đen nhờn nhợt và tỏa ra nhiệt lượng âm độ làm đóng băng mặt đe.\n"Rèn cho tôi một lưỡi kiếm từ thứ này." Những người thợ già ở Zelkova Workshop từng cảnh báo: Nước tôi thép bình thường sẽ làm nứt vỡ cấu trúc dị thể Singularity. Chỉ có máu nóng của một người thợ mang ý chí sắt đá mới thuần hóa được nó.',
    en: '[The metal that still bleeds] A Grade 1 Fixer set a lump of alloy on your anvil, cut from the core of an Abnormality. It was still seeping something black. “Make me a sword from this.” Ordinary quenching water would crack it. The old smiths say only blood will hold it.',
    choices: [
      {
        labelVi: 'Tôi thép bằng máu của chính bạn',
        labelEn: 'Quench it in your own blood',
        resultVi: 'Bạn rạch sâu lòng bàn tay, để dòng máu ấm xối thẳng lên rãnh thép đang đỏ rực trong thùng tôi. Hơi nước bốc lên đỏ quạch, sặc mùi sắt nung và điện tích ozone. Khối kim loại gầm lên một tiếng rền rĩ kỳ dị rồi nguội lại thành một lưỡi đao đen bóng, không hề có một vết nứt vi mô. Khi ngón tay bạn chạm vào chuôi kiếm, nó ấm nóng và truyền lại từng nhịp đập thình thịch đồng điệu với tim bạn. Một kiệt tác Workshop sinh ra từ máu thịt.',
        resultEn: 'When the blade met your blood the steam rose red and smelled of iron. It did not crack. When you lifted it, it was warm, as if it had a pulse.',
        openCraftModal: true,
        effects: { health: -15, wealth: +18, rep: +16, network: +12, resonance: +14 },
        flagsAdd: ['유물'],
        recordsAdd: ['workshop_masterpiece'],
        scarsAdd: ['Thanh kiếm tôi bằng máu mình'],
        meritAdd: 28
      },
      {
        labelVi: 'Làm thêm một khẩu súng bắn xuyên tường cho người trả giá cao hơn (vi phạm Taboo)',
        labelEn: 'Also build a wall-piercing gun for a higher bidder (a Taboo violation)',
        resultVi: 'Viên đạn thử nghiệm từ khẩu súng nén gia tốc xé toạc bốn bức tường bê tông cốt thép dày nửa mét, biến hình nhân thử nghiệm phía sau thành bụi mịn. Gã khách hàng che kín mặt thả xuống bàn một bọc Ahn nặng trịch, không nói một lời rồi biến mất vào bóng đêm. Ba ngày sau, một chấp hành viên mặc vest đen cài huy hiệu của B Corp đứng bất động đối diện cửa xưởng bạn dưới ánh đèn đường vàng vọt. Người đó không bắt giữ bạn ngay, chỉ lặng lẽ ghi chép vào một cuốn sổ kẹp tài liệu và nhìn chằm chằm.',
        resultEn: 'The test round went through four concrete walls. The buyer paid double and asked nothing. Three days later someone in a B Corp uniform stood across from your workshop, doing nothing, only watching.',
        effects: { wealth: +28, rep: +14, taboo: +1, sanity: -10, resonance: +14 },
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
    vi: '[Dạ Khúc Máu Dưới Hầm Ngầm] Đáy sâu tầng hầm của một dinh thự cổ kiểu Baroque tại District 16. Mùi rượu vang mốc meo hòa lẫn với mùi máu tanh nồng nặc. Toàn bộ tiểu đội của bạn nằm la liệt trên sàn gỗ mục nát, xác họ trắng bệch như thạch cao vì bị rút cạn máu. Từ trong bóng tối của những tấm rèm nhung rách tả tơi, một Trưởng Lão Bloodfiend (Kindred thế hệ thứ hai) với làn da trắng sứ không một tì vết, móng tay dài như kim sơn đỏ, một tay nhấc bổng bạn lên không trung mà không cần tốn chút sức lực. Đôi mắt đỏ rực như đá ruby của bà ta nhìn xoáy vào đồng tử bạn:\n"Ngươi có thể làm một chiếc Bloodbag ngoan ngoãn trong hầm ủ, để ta uống dần từng ngụm ấm áp qua năm tháng... Hoặc mở miệng ra, đón lấy dòng máu cấm kỵ của ta, chia sẻ bóng tối và cơn khát vĩnh hằng này."',
    en: '[A Bloodfiend’s offer] Your whole squad died in the underground manor. An Elder Bloodfiend held you by the throat with one hand, without effort.\n“You can be a Bloodbag, and I will drink you slowly. Or you can drink from me, and live forever with the thirst.”',
    choices: [
      {
        labelVi: 'Uống máu từ cổ tay bà ta',
        labelEn: 'Drink from her wrist',
        resultVi: 'Dòng máu từ vết cắn nơi cổ tay bà ta tràn vào cổ họng bạn, nóng bỏng như chì nấu chảy và nồng nặc vị hoa hồng mục ruỗng. Từng thớ cơ bắp của bạn co giật dữ dội; răng nanh dài ra đâm rách môi dưới, các khớp xương tự bẻ gãy rồi ráp lại thành một hình thể dẻo dai phi nhân loại. Cơn đau thấu tận linh hồn tan đi, nhường chỗ cho một sức mạnh bóng tối kinh hoàng. Bạn sẽ sống thêm hàng trăm năm nữa. Nhưng kể từ đêm nay, mỗi khi ánh đèn đường Backstreets vụt tắt, một cơn khát rực lửa sẽ cào xé lồng ngực bạn đến phát điên.',
        resultEn: 'Her blood burned like molten metal. Your teeth lengthened; your bones broke and set themselves into a different shape. You will live a very long time. And every night you will thirst.',
        flagsAdd: ['Bloodfiend'],
        effects: { health: +22, sanity: -20, rep: +14, resonance: +22 },
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
        resultVi: 'Bạn giấu tay sau lưng, đập vỡ bình dầu hỏa cháy dự phòng rồi kích nổ kíp mồi lửa ngay trên ngực mình. Ngọn lửa bùng lên dữ dội giữa hai người, thiêu rụi tấm áo nhung của bà ta và đốt cháy một mảng lưng bạn. Tiếng thét the thé xé tai của vị Trưởng Lão vang lên khi bà ta buông tay lùi lại. Đúng lúc ấy, cánh cửa sồi nặng nề bị phá tung; các thợ săn của Fanghunt Office trong bộ áo mưa đen xông vào với cọc gỗ và máy bắn đinh hơi. Họ bao vây căn phòng, giải cứu bạn và chia cho bạn một phần tiền thưởng kếch xù.',
        resultEn: 'The fire caught your back and her arm at the same moment. She let go. Right then, Fanghunt Office broke down the door with their stakes. They split the bounty with you.',
        effects: { health: -22, sanity: +6, wealth: +18, rep: +18, network: +12 },
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
    regions: ['21'],
    weight: 5.5,
    vi: '[Đại Họa Cá Voi Giữa Biển Sáp U Corp] Giữa tâm bão mù mịt của District 21 · The Great Lake, những con sóng đen như dầu nhớt đập rầm rầm vào mạn thuyền săn. Màn sương nứt toác khi một thực thể Calamity khổng lồ — Pallid Whale — trồi lên từ đáy vực như một ngọn núi đá vôi di động. Mùi hôi thối của vôi rữa và sáp trắng bốc lên nồng nặc. Cú đớp kinh hoàng của nó nuốt chửng phân nửa đoàn thuyền cơ giới vào họng vực sâu. Thứ dịch nhầy màu trắng nhớt bắn tung tóe khắp boong tàu; bất cứ thủy thủ nào chạm phải đều bắt đầu cứng đờ lại như thạch cao, hai chân dính chặt vào nhau biến thành đuôi cá sáp dính bệt. Người bạn đồng hành vừa cùng bạn chia nửa điếu thuốc lúc nãy giờ đã hóa trắng bệch đến tận cằm, đôi mắt đục ngầu vô hồn đang quay sang cắn xé bạn.',
    en: '[The Whale on the Great Lake] In the middle of the storm on District 21’s Great Lake, a Whale surfaced and swallowed half the fleet. Sailors splashed with its white fluid began to harden like wax, their legs fusing into tails. Then they turned and bit the living.\nThe person beside you had turned white up to the neck.',
    choices: [
      {
        labelVi: 'Cắt cánh tay đang hóa trắng của người ấy, rồi buộc mình vào dây lao và phóng thẳng vào mắt con Cá Voi',
        labelEn: 'Cut off their whitening arm, then tie yourself to the harpoon line and drive it into the Whale’s eye',
        outcomes: [
          {
            w: 56,
            resultVi: 'Lưỡi dao Workshop của bạn chém đứt lìa cánh tay đang hóa sáp của người đồng đội trước khi chất độc lan vào ngực anh ta. Bạn lấy dây cáp tời buộc chặt mình vào bệ phóng lao, nạp khối bộc phá áp lực cao và bắn thẳng mũi lao sắt xuyên thủng con ngươi mờ đục của con Cá Voi. Khối thuốc nổ kích hoạt xé toạc hốc mắt nó trong tiếng gầm hạ âm làm rung chuyển cả đại dương. Con quái vật gầm rú chìm sâu xuống đáy biển, cuốn theo một dòng xoáy sáp trắng xoay tròn cuồng loạn. Tại các quán rượu bến cảng District 21, câu chuyện về người săn cá voi mù mắt được kể lại như một huyền thoại sống.',
            resultEn: 'The harpoon went into its eye. The Whale sank, dragging a white whirlpool down with it. In District 21 they tell this story in the bars, and every time the Whale gets a little bigger.',
            effects: { health: -22, sanity: -12, wealth: +24, rep: +24, resonance: +18 },
            recordsAdd: ['lake_whale_slayer'],
            scarsAdd: ['Vết trắng trên vai'],
            meritAdd: 30
          },
          {
            w: 44,
            resultVi: 'Cái đuôi khổng lồ quất ngang boong tàu như một tòa cao ốc sụp đổ, nghiền nát bệ phóng lao thành sắt vụn. Một mảng chất nhờn trắng bám chặt vào bả vai bạn và bắt đầu ăn mòn da thịt, biến các sợi cơ thành sáp đá lạnh ngắt. Giữa cơn bão dữ, bạn ghì chặt vết thương vào ngọn đèn dầu đang cháy rừng rực, tự tay dùng dao gọt bỏ từng mảng thịt trắng đang hoại tử trước khi chất sáp bò đến tim. Bạn sống sót, nhưng vết sẹo sáp trắng trên vai vĩnh viễn không bao giờ lành lặn.',
            resultEn: 'Its tail broke the hull apart. A white patch landed on your shoulder and began to spread. You heated a knife over the oil lamp and cut that flesh out yourself before it reached your heart.',
            effects: { health: -34, sanity: -20, resonance: +22 },
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
    vi: '[Kỳ Sát Hạch Gia Chủ Hongyuan] District 8, bên trong những dinh phủ nguy nga của đại gia tộc Hongyuan. Tiếng mưa rơi thanh tao trên những mái ngói ngọc bích uốn lượn. Trên lầu cao thanh tịnh, các trưởng lão và những người thừa kế khoác áo lụa là ngồi thưởng trà ô long, mỉm cười đàm đạo tao nhã trong khi ở sân đá bên dưới, hàng trăm thuộc hạ và đao phủ chém giết nhau không một tiếng la hét, để máu nhuộm đỏ lòm các rãnh thoát nước. Để bước lên vị trí Gia chủ tối cao, bạn phải tiến lên trước bài vị tổ tiên và nuốt trọn viên Huyết Đan (Crimson Bolus) — thứ tinh hoa luyện từ máu tủy và sinh lực chưng cất của những kẻ bại trận. Nếu kinh mạch và ý chí của bạn không đủ thâm sâu, viên đan dược sẽ thiêu rụi nội tạng bạn từ bên trong thành vũng tro tàn.',
    en: '[Choosing a Hierarch in Hongyuan] In District 8 the heirs of the great families sit drinking tea and smiling while their servants kill each other in the courtyard below.\nTo become Hierarch you must swallow a Bolus refined from the blood of those who lost. If your body cannot bear it, it will eat you from the inside.',
    choices: [
      {
        labelVi: 'Nuốt viên Bolus',
        labelEn: 'Swallow the Bolus',
        outcomes: [
          {
            w: 58,
            resultVi: 'Viên Huyết Đan trôi xuống cuống họng nóng rực như dung nham sôi. Suốt một đêm dài trong mật thất, máu đen rỉ ra từ khóe mắt, lỗ tai và mười đầu ngón tay bạn, từng thớ cơ bị xé toạc rồi tái sinh dưới uy lực của Singularity cổ xưa. Khi tia nắng ban mai đầu tiên rọi qua khung cửa sổ gấm hoa, bạn bước ra sân viện với khí thế áp đảo của một bậc đế vương, ánh mắt thấu suốt tâm can khiến ba người anh em họ đang nâng chén trà bỗng run rẩy đánh rơi tách sứ xuống sàn. Gia tộc Hongyuan chính thức phủ phục dưới chân Gia chủ mới.',
            resultEn: 'Black blood ran from your eyes and nose all night. By morning you stood, and your body was not what it had been. Three cousins had not yet set down their teacups.',
            flagsAdd: ['HongyuanHierarch'],
            recordsAdd: ['hongyuan_lord'],
            effects: { health: +20, wealth: +45, rep: +36, network: +30, sanity: -24, resonance: +26 },
            scarsAdd: ['Viên Bolus của Hongyuan'],
            meritAdd: 38
          },
          {
            w: 42,
            resultVi: 'Dược lực tàn bạo của viên Huyết Đan vượt quá giới hạn chịu đựng của thể xác bạn. Từng mạch máu dưới da nứt toác, máu độc trào ra xé rách lồng ngực. Bạn phải dùng đoản đao tự rạch ba đường dài trên cánh tay và bụng để máu độc thoát ra ngoài, lê lết từng bước rời khỏi sân viện đẫm máu trong khi tiếng cười khẩy của những kẻ thừa kế khác vẫn lanh lảnh bên chén trà bốc khói.',
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
    vi: '[Lời Thề Cốt Nhục Của The Pinky] Đỉnh một tháp chuông rỉ sét chơ vơ giữa cơn mưa rào của Backstreets. Tiếng chuông đồng ngân vang từng nhịp trầm đục trong màn đêm. Một đao thủ của Ngón Út (The Pinky) mặc áo choàng vải lanh xám rút thanh kiếm hẹp hình tam giác ra khỏi lồng ngực một kẻ phản bội, rồi quỳ một chân đặt lưỡi thép sáng loáng xuống dưới chân bạn. Không một giọt máu hay hạt mưa nào bám được trên thân kiếm. Người đó ngước nhìn bạn qua tấm mạng che:\n"The Pinky không có những tờ giấy Prescript vô tri như Index, cũng không có cuốn sổ nợ thù hằn của Middle. Ở đây, thứ duy nhất gắn kết chúng ta là lời thề khắc vào xương cốt. Nếu muốn trở thành một Ngôi Sao dẫn đường của chúng ta, hãy dùng con dao này, rạch thịt và bẻ một mẩu xương sườn của chính ngươi khảm vào đốc kiếm."',
    en: '[The Pinky’s oath] On top of a bell tower in the rain, someone of the Pinky drew a sword from a traitor’s chest and laid it at your feet.\n“In the Pinky there are no ranks, only oaths. Take a piece of your own rib and set it into this hilt.”',
    choices: [
      {
        labelVi: 'Làm theo',
        labelEn: 'Do it',
        resultVi: 'Không một tiếng rên rỉ, bạn nhận lấy con dao găm nhỏ, rạch một đường dứt khoát dưới xương sườn thứ tư và dùng ngón tay bẻ rời một mẩu xương còn vương máu ấm. Người đao thủ đứng bất động quan sát từng cử chỉ với ánh mắt kính nể tuyệt đối. Mẩu xương vừa khít vào hốc trống trên chuôi kiếm như thể nó đã chờ đợi bạn từ hàng thập kỷ. Kim loại đen và tủy xương hợp nhất trong một tiếng "tách" đanh gọn. Kể từ đêm nay dưới sự chứng giám của tháp chuông, bạn chính thức là một Star của The Pinky.',
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

  // ------------------------------------------------------------------ Carmen / E.G.O & Distortion
  {
    id: 'ego_carmen_crossroad',
    age: [18, 99],
    major: true,
    weight: 999,
    forbids: ['EGOAwakened', 'Distorted'],
    vi: '[Can you hear my voice? · Vầng Thái Dương Của Ánh Sáng] Mọi vết thương, nỗi mất mát và những vết sẹo chằng chịt trong cuộc đời bạn ({scars}) bỗng ùa về cùng một lúc, dâng lên thành một cơn bão cảm xúc nghẹn ứ nơi cổ họng. Không gian mục nát của The City tan biến; xung quanh bạn chỉ còn lại một biển ánh sáng ấm áp, rực rỡ và thiêu đốt — một vầng thái dương trắng muốt bao la vô tận. Từ trung tâm của ánh sáng, một người phụ nữ với mái tóc nâu buông xõa, đôi mắt thấu suốt mọi ngóc ngách tâm can và nụ cười dịu dàng vô bờ bến nghiêng đầu nhìn bạn:\n"Đau đớn lắm, phải không con người nhỏ bé? Ở cái thành phố lạnh lẽo này, cố bám víu lấy hình người chỉ khiến bạn bị từng bánh răng nghiền nát từng ngày một mà thôi. Hãy yêu lấy chính bản thân mình đi. Đừng cố gồng gánh nữa. Bạn hoàn toàn có thể buông tay, trút bỏ tấm mặt nạ rách nát này, và trở thành điều mà bạn thật sự khao khát..."',
    en: '[Can you hear my voice? · The Scorching Sun of The Light] Everything you ever lost returned at once ({scars}). The surrounding room dissolved into a blinding white sun — an ocean of radiant, scorching light. From the center of the brilliant sun, a woman with piercing eyes and a gentle smile tilted her head:\n“It hurts so much, doesn’t it? In this City, clinging to a human shape only gets you torn apart. Love yourself. You can let go, and become what you truly desire.”',
    choices: [
      {
        labelVi: '"Nỗi đau này là của tôi. Những vết sẹo này thuộc về tôi. Tôi sẽ không khuất phục trước sự an ủi dối trá của người!"',
        labelEn: '“This pain is mine. I will not yield before your sun.”',
        outcomes: [
          {
            w: 16,
            openEgoModal: true,
            flagsAdd: ['EGOAwakened', 'ShinAwakened'],
            recordsAdd: ['ego_effloresced'],
            effects: { health: +35, sanity: +50, rep: +38, resonance: +25 },
            scarsAdd: ['Người không cúi đầu trước Carmen'],
            meritAdd: 45,
            resultVi: 'Bạn cắn chặt răng đến bật máu, giữ chặt từng mảnh ký ức cay đắng và từng vết sẹo vào tận đáy tim, kiên quyết không lùi bước trước ánh thái dương mê hoặc của Carmen. Biển ánh sáng chói lòa nứt toác ra từng mảng trước ý chí bất khuất của bạn. Từ sâu thẳm tâm thức, ngọn lửa cảm xúc kết tinh thành một bộ giáp vững chắc và vũ khí uy mãnh bao bọc lấy thể xác bạn. Đó không phải là món quà vay mượn từ ai khác — đó là E.G.O thuần khiết của riêng bạn, nở rộ giữa lòng The City.',
            resultEn: 'You held firm to every memory and scar, refusing to yield before Carmen’s radiant sun. The blinding light fractured against your unbending resolve. From the depths of your psyche, armor and a weapon forged from your agony manifested. It is your E.G.O.'
          },
          {
            w: 52,
            flagsAdd: ['IncompleteEGO'],
            effects: { health: -18, sanity: -12, rep: +20, resonance: +18 },
            scarsAdd: ['Vết rạn khung cửi tự ngã'],
            meritAdd: 25,
            scheduleConsequences: [
              {
                eventId: 'ego_second_efflorescence_trial',
                delayYears: 2,
                reasonVi: 'E.G.O chưa hoàn chỉnh đang tìm kiếm khoảnh khắc bộc phát trọn vẹn',
                reasonEn: 'Your incomplete E.G.O seeks its true efflorescence'
              }
            ],
            resultVi: 'Bạn gầm lên kháng cự, nhưng triết lý sống trong lòng chưa đủ tôi luyện để gánh vác trọn vẹn sức nặng của ánh sáng. Bộ giáp E.G.O chỉ vừa kịp hiện hình một nửa đã nứt toác thành từng mảnh, ngọn lửa cảm xúc đốt cháy da thịt bạn thành những vết bỏng rát. Bạn không gục ngã, nhưng tâm thức mang theo một vết rạn nứt sâu hoắm: E.G.O Chưa Hoàn Chỉnh (Incomplete E.G.O), chờ đợi một ngày được khai hoa trọn vẹn.',
            resultEn: 'You roared in resistance, but your inner philosophy was not yet forged enough to bear the full weight of the light. The E.G.O half-manifested then cracked, emotion scorch marks searing your flesh. You did not break, but your soul bears a fissure: an Incomplete E.G.O.'
          },
          {
            w: 32,
            flagsAdd: ['Distorted'],
            recordsAdd: ['distortion_awaken'],
            effects: { health: +40, sanity: -60, rep: +30, heat: +45, resonance: +55 },
            scarsAdd: ['Ý chí gãy đổ'],
            meritAdd: 20,
            resultVi: 'Lời thì thầm từ vầng thái dương của Carmen quá ngọt ngào, như vòng tay người mẹ vỗ về một đứa trẻ kiệt sức giữa đêm đông. Trong khoảnh khắc ngập ngừng buông xuôi, ý chí của bạn vỡ vụn. Cơ thể bạn tan chảy rồi biến dạng thành hình thù quái dị của nỗi ám ảnh và đau khổ sâu kín nhất. Hana Association lập tức cập nhật hồ sơ cảnh báo thảm họa: Một cá thể Biến Dạng (Distorted) vừa xuất hiện.',
            resultEn: 'Carmen’s murmur from the radiant sun was too sweet. In that final hesitation, your resolve shattered. Your flesh morphed into the shape of your sorrow. Hana Association updated its file: Distorted.'
          }
        ]
      },
      {
        labelVi: 'Đốt cháy những vết sẹo quá khứ làm mồi lửa bộc phát',
        labelEn: 'Burn every past scar as living fuel for breakthrough',
        outcomes: [
          {
            w: 12,
            openEgoModal: true,
            flagsAdd: ['EGOAwakened', 'ShinAwakened'],
            recordsAdd: ['ego_effloresced'],
            effects: { health: -28, sanity: +45, rep: +42, resonance: +35 },
            scarsAdd: ['Tro Tàn Tự Ngã'],
            meritAdd: 50,
            resultVi: 'Bạn biến chính những vết sẹo rỉ máu thành mồi lửa, thiêu rụi sự cám dỗ dịu dàng của Carmen. Cơ thể bạn chằng chịt vết rách, nhưng từ trong biển lửa tro tàn, E.G.O hoàn chỉnh xuất hiện với uy lực chấn áp tất cả.',
            resultEn: 'Turning your bleeding scars into kindling, you incinerated Carmen’s gentle whispers. Your body tore with wounds, but from the ashes, complete E.G.O emerged with overwhelming might.'
          },
          {
            w: 58,
            flagsAdd: ['Distorted'],
            recordsAdd: ['distortion_awaken'],
            effects: { health: +50, sanity: -65, rep: +35, heat: +50, resonance: +60 },
            scarsAdd: ['Ngọn Lửa Cuồng Loạn'],
            meritAdd: 30,
            resultVi: 'Ngọn lửa cảm xúc bốc cháy vượt quá tầm kiểm soát của cơ thể bạn. Sức nóng thiêu rụi lý trí; thay vì E.G.O, bạn sụp đổ hoàn toàn vào nỗi ám ảnh tột cùng. Một con quái vật Distortion sinh ra từ tro tàn.',
            resultEn: 'The emotional blaze flared beyond mortal endurance. The heat consumed your sanity; instead of E.G.O, you collapsed entirely into obsession. A ravenous Distortion arose from the ashes.'
          },
          {
            w: 30,
            flagsAdd: ['IncompleteEGO'],
            effects: { health: -35, sanity: -20, rep: +22, resonance: +25 },
            scarsAdd: ['Vết Bỏng Linh Hồn'],
            meritAdd: 25,
            scheduleConsequences: [
              {
                eventId: 'ego_second_efflorescence_trial',
                delayYears: 2,
                reasonVi: 'E.G.O tàn lửa đang chờ tôi luyện lại',
                reasonEn: 'Smoldering incomplete E.G.O awaiting rekindling'
              }
            ],
            resultVi: 'Ngọn lửa đốt cháy da thịt bạn nhưng lụi tàn giữa chừng. Bạn ngã quỵ trên vũng máu, một mảnh giáp E.G.O vỡ vụn dính chặt vào xương ngực: E.G.O Chưa Hoàn Chỉnh.',
            resultEn: 'The inferno scorched your flesh but petered out midway. You collapsed bleeding, a shattered shard of E.G.O armor fused to your breastbone: Incomplete E.G.O.'
          }
        ]
      },
      {
        labelVi: 'Nhắm mắt lại, đắm chìm vào vầng thái dương ấm áp (Distortion)',
        labelEn: 'Close your eyes, immerse into the warm sun (Distort)',
        flagsAdd: ['Distorted'],
        recordsAdd: ['distortion_awaken'],
        effects: { health: -15, sanity: -70, rep: -25, heat: +60, resonance: +50 },
        scarsAdd: ['Distortion'],
        meritAdd: 25,
        resultVi: 'Không còn đau nữa. Đó là điều đầu tiên bạn nhận ra. Vầng thái dương của Carmen bao trùm lấy bạn, cảm giác ấm áp lan tỏa khi cơ thể bạn biến đổi thành hình dạng của nỗi ám ảnh sâu kín nhất. Sáng hôm sau, Hana Association phát lệnh phong tỏa khu vực: Một Distortion cấp độ cao đã xuất hiện.',
        resultEn: 'It no longer hurt. That was the first thing you noticed. Carmen’s blazing sun enveloped you; a soothing warmth spread as your flesh morphed into the shape of your deepest obsession. The next morning Hana Association opened a new file: Distortion, unrated.'
      },
      {
        labelVi: 'Cắn chặt răng quay lưng, dùng ý chí sắt đá và lời thề níu lấy sự tỉnh táo phàm trần',
        labelEn: 'Grit your teeth and turn away, clinging to iron will, creed and mortal sanity',
        effects: { sanity: +45, health: +10, rep: +25, resonance: -25 },
        scarsAdd: ['Kẻ từ chối tiếng gọi thái dương'],
        meritAdd: 25,
        resultVi: 'Bạn nhắm mắt, bịt tai, dùng lời thề với các huynh đệ và tổ chức khước từ mọi cám dỗ từ vầng thái dương của Carmen. Biển ánh sáng tan biến; bạn trở về thực tại: một con người trần thế kiên cường tiếp tục bước đi trên mặt đất The City (+45 SP, +10 HP, -25 Resonance).',
        resultEn: 'You shut your eyes and closed your ears, clinging to oaths and brotherhood to refuse every whisper from Carmen. The blinding sun dissolved; you remained yourself: an ordinary human walking the ground of The City (+45 SP, +10 HP, -25 Resonance).'
      }
    ]
  },

  // ------------------------------------------------------------------ Second Efflorescence Trial
  {
    id: 'ego_second_efflorescence_trial',
    age: [19, 99],
    major: true,
    weight: 950,
    isCausalCallback: true,
    causalReasonVi: 'Vết rạn E.G.O năm xưa đang tìm kiếm sự hoàn thiện',
    causalReasonEn: 'The fissure in your past E.G.O seeks complete efflorescence',
    vi: '[True Efflorescence · Khai Hoa Trọn Vẹn] Ngọn lửa E.G.O chưa hoàn chỉnh trong lồng ngực bạn lại cháy bùng khi một cơn nguy biến Backstreets ập đến. Lần này, bạn không còn bỡ ngỡ. Trước mắt bạn là con đường bạn đã đi qua và cái giá bạn đã trả.',
    en: '[True Efflorescence · Complete Blooming] The incomplete E.G.O flame in your chest flared again as a Backstreets crisis struck. This time, you did not waver. Before your eyes lay every path you had walked and every price you had paid.',
    choices: [
      {
        labelVi: 'Hàn gắn vết rạn tâm thức: Đánh cược tôi luyện để Khai hoa E.G.O',
        labelEn: 'Mend the soul fissure: Forge through trial to Effloresce True E.G.O',
        outcomes: [
          {
            w: 30,
            openEgoModal: true,
            flagsAdd: ['EGOAwakened', 'ShinAwakened'],
            flagsRemove: ['IncompleteEGO'],
            recordsAdd: ['ego_effloresced'],
            effects: { health: +40, sanity: +50, rep: +35, resonance: +25 },
            scarsAdd: ['Bản Ngã Tái Sinh'],
            meritAdd: 50,
            resultVi: 'Vết nứt trên linh hồn liền lại thành một lớp giáp hoàng kim. E.G.O hoàn chỉnh bao bọc lấy bạn, tĩnh lặng và uy nghiêm. Cả khu phố nín thở trước luồng ánh sáng thuần khiết.',
            resultEn: 'The fracture in your soul welded into golden armor. Complete E.G.O enveloped you, serene and sovereign. The entire street held its breath before the pure light.'
          },
          {
            w: 45,
            flagsAdd: ['Distorted'],
            flagsRemove: ['IncompleteEGO'],
            recordsAdd: ['distortion_awaken'],
            effects: { health: +35, sanity: -60, rep: +20, resonance: +40 },
            scarsAdd: ['Lửa Tràn Phá Vỡ'],
            meritAdd: 30,
            resultVi: 'Sức ép từ mảnh E.G.O dang dở quá lớn so với giới hạn chịu đựng. Thay vì khai hoa, vết nứt vỡ toác thành một vụ nổ biến dạng tâm thần. Bạn sụp đổ thành một Distortion tàn bạo.',
            resultEn: 'The strain of the incomplete E.G.O exceeded mortal limits. Instead of blooming, the fissure ruptured into a violent psychic collapse. You distorted into a monstrous entity.'
          },
          {
            w: 25,
            effects: { health: -20, sanity: -15, rep: +10 },
            scarsAdd: ['Vết Nứt Chưa Liền'],
            meritAdd: 15,
            resultVi: 'Mảnh E.G.O rung chuyển dữ dội nhưng vẫn chưa thể nở rộ. Vết rạn vẫn ở đó, nhức nhối nhưng vẫn giữ bạn đứng vững ở lằn ranh phàm nhân.',
            resultEn: 'The E.G.O shard trembled violently but refused to bloom. The fissure remained, aching yet keeping you anchored on the mortal shore.'
          }
        ]
      },
      {
        labelVi: 'Kìm nén ngọn lửa: Bảo toàn sức lực cho ngày sau',
        labelEn: 'Contain the flame: Conserve strength for another day',
        effects: { sanity: +15, health: +10, rep: +10 },
        resultVi: 'Bạn hít sâu và nén ngọn lửa vào tận đáy tim. E.G.O lắng xuống, chờ đợi một ngày khác xứng đáng hơn.',
        resultEn: 'Drawing a deep breath, you compressed the flame to the depths of your heart. The E.G.O subsided, awaiting a more fitting crucible.'
      }
    ]
  },

  // ------------------------------------------------------------------ Hana Color Fixer Supreme Trial
  {
    id: 'hana_color_ascension_trial',
    age: [20, 95],
    major: true,
    weight: 980,
    jobs: ['Fixer'],
    forbids: ['ColorFixer', 'Distorted'],
    vi: '[Star of the City · Hana Color Investiture] Hana Association Section 1 triệu tập bạn đến đài vinh danh tối cao. Một mối họa cấp độ Star of the City vừa bùng phát tại khu vực biên giới. Các Director của Hana nhìn thẳng vào mắt bạn:\n"Cả The City chỉ có chưa đầy mười Color. Chúng tôi không ban phát danh hiệu này cho kẻ chỉ biết làm hợp đồng thông thường. Hãy dập tắt mối họa này, hoặc chết trong đống đổ nát. Khi bạn trở về, chiếc thẻ Color sẽ mang tên bạn."',
    en: '[Star of the City · Hana Color Investiture] Hana Association Section 1 summoned you to the supreme dais. A Star of the City calamity has erupted on the border. The Hana Directors stare straight into your eyes:\n“The entire City holds fewer than ten Colors. We do not bestow this title upon those who merely file routine contracts. Extinguish this calamity, or perish in its wake. When you return, the Color license shall bear your name.”',
    choices: [
      {
        labelVi: 'Tiên phong độc hành: Trực diện đồ sát Calamity',
        labelEn: 'Solo vanguard: Confront and annihilate the Calamity directly',
        outcomes: [
          {
            w: 60,
            need: { stat: { health: [35, 100] } },
            openColorModal: true,
            flagsAdd: ['ColorFixer'],
            recordsAdd: ['color_fixer'],
            effects: { health: -30, sanity: -15, rep: +45, wealth: +60 },
            scarsAdd: ['Vết sẹo của Star of the City'],
            meritAdd: 60,
            resultVi: 'Trận chiến kéo dài mười sáu giờ không ngừng nghỉ. Vũ khí của bạn chém đứt lõi của mối họa Star of the City trước sự bàng hoàng của các chấp hành viên Hana. Máu và tro tàn nhuộm kín chiến trường. Hội đồng Hana đồng loạt đứng dậy cúi đầu: "The City cúi đầu trước Color mới." Họ mời bạn bước lên đài để khắc danh hiệu.',
            resultEn: 'The battle raged sixteen unceasing hours. Your weapon severed the core of the Star of the City before stunned Hana enforcers. Blood and ash coated the battlefield. The Hana Council stood and bowed in unison: “The City honors its new Color.” They invited you to the dais to engrave your title.'
          },
          {
            w: 40,
            effects: { health: -45, sanity: -35, rep: +25, heat: +20 },
            scarsAdd: ['Thương tật từ Star of the City'],
            meritAdd: 30,
            resultVi: 'Sức mạnh của mối họa vượt xa dự tính. Bạn chém đứt được một chi của nó nhưng bị đánh văng qua ba dãy tường bê tông, nát vụn xương sườn. Bạn sống sót nhưng bất tỉnh ba tuần. Hana Association ghi nhận chiến công nhưng hoãn kỳ phong Color cho đến khi bạn bình phục.',
            resultEn: 'The calamity’s might exceeded all projections. You severed one of its limbs but were hurled through three concrete walls, ribs splintered. You survived but lay comatose three weeks. Hana credited your valor but postponed the Color ceremony until your recovery.'
          }
        ]
      },
      {
        labelVi: 'Bày trận khắc chế cùng Seven Association (Chiến thuật & Tình báo)',
        labelEn: 'Coordinate tactical dissection with Seven Association',
        need: { stat: { wealth: [15, 100], sanity: [30, 100] } },
        openColorModal: true,
        flagsAdd: ['ColorFixer'],
        recordsAdd: ['color_fixer'],
        effects: { health: -18, sanity: -15, wealth: -15, rep: +40 },
        scarsAdd: ['Bản đồ giải phẫu Star of the City'],
        meritAdd: 45,
        resultVi: 'Chi trả ngân sách lớn cho Seven Association để phân tích cấu trúc Singularity và sơ hở của mối họa. Bạn đánh trúng tim của nó bằng một nhát duy nhất. Nest được bảo toàn. Hana Association đóng dấu phê chuẩn tuyệt đối: Một Color mới ra đời bằng trí tuệ và sự chuẩn xác.',
        resultEn: 'Expending a substantial purse for Seven Association intel on the singularity weakness, you struck its core in a single fatal blow. The Nest was saved. Hana Association stamped absolute approval: A new Color born of intellect and lethal precision.'
      },
      {
        labelVi: 'Từ chối chiếc vòng kim cô: Tiếp tục là Fixer Grade 1 tự do',
        labelEn: 'Refuse the Color crown: Remain a free Grade 1 Senior Fixer',
        flagsAdd: ['ColorRefused'],
        effects: { sanity: +20, rep: +22, wealth: +25 },
        scarsAdd: ['Người từ chối làm Color'],
        meritAdd: 20,
        resultVi: 'Bạn đặt bản ủy thác xuống bàn và mỉm cười quay lưng: "Làm Color chỉ biến tôi thành công cụ để The Head và các Wing dòm ngó. Tôi thích tự do ở Grade 1 hơn." Cả hội trường chết lặng. Danh tiếng về người Fixer từ chối Color lan truyền khắp Backstreets.',
        resultEn: 'Setting the contract down, you smiled and turned away: “Becoming a Color only makes me a target for The Head and a puppet for the Wings. I prefer my freedom at Grade 1.” The hall fell dead silent. Whispers of the Fixer who refused a Color swept the Backstreets.'
      }
    ]
  },

  // ------------------------------------------------------------------ Wuthering Heights & Wild Hunt (T Corp)
  {
    id: 'canto_wuthering_wild_hunt',
    age: [21, 65],
    major: true,
    regions: ['20'],
    weight: 5.5,
    vi: '[Bão Thời Gian T Corp · Tiếng Hú Của Cuộc Săn Hoang Dã] Tại vùng đồi sương mù của District 20 · T Corp, một cơn bão thời gian nứt toác. Một kỵ sĩ trên lưng con ngựa xương trắng dẫn đầu đoàn quân bóng ma The Wild Hunt tràn qua các hẻm vắng. Kỵ sĩ gầm lên qua chiếc quan tài xích sắt: "Mọi bản thể trong vô số Thế Giới Gương (Mirror Worlds) đều phải chịu chung nỗi thống khổ này!"',
    en: '[Temporal Tempest · Echoes of the Wild Hunt] On the foggy moors of District 20 · T Corp, a temporal storm ruptured. A knight astride a skeletal steed led the phantoms of The Wild Hunt through the alleys. From atop a chained coffin, the knight roared: “Every counterpart across the Mirror Worlds must suffer this exact despair!”',
    choices: [
      {
        labelVi: 'Chém đứt xiềng xích của chiếc quan tài: Khẳng định bản ngã độc nhất',
        labelEn: 'Sever the coffin chains: Affirm your singular unyielding self',
        outcomes: [
          {
            w: 55,
            effects: { health: -25, sanity: +35, rep: +30, resonance: +25 },
            scarsAdd: ['Kẻ chém đứt xiềng xích Erlking'],
            recordsAdd: ['wild_hunt_vanquisher'],
            meritAdd: 35,
            resultVi: 'Bạn lao vào lưỡi kiếm của Erlking, chấp nhận để mảnh thép cứa rách vai trái để đổi lấy một đường chém thẳng vào khớp cổ con ngựa xương. Chiếc quan tài xích sắt nứt toác. Màn sương T Corp tan dần trong tiếng rên rỉ của những bản thể vỡ vụn. Nhân viên T Corp đến hiện trường chỉ kịp ghi chép: "Đã thanh toán một mối nguy thời gian."',
            resultEn: 'Throwing yourself past Erlking’s blade, you took a gash across your shoulder to sever the spectral steed’s neck joint. The chained coffin cracked open. T Corp’s temporal fog cleared amidst dying groans of shattered counterparts. A T Corp clerk arrived only to stamp the log: “Temporal hazard resolved.”'
          },
          {
            w: 45,
            effects: { health: -40, sanity: -25, resonance: +30 },
            scarsAdd: ['Tiếng hú của Cuộc Săn Hoang Dã'],
            resultVi: 'Sức nặng của ngàn linh hồn từ các Thế Giới Gương đè bẹp vũ khí của bạn. Bạn bị đánh văng xuống sườn đồi đầy đá nhọn. Đêm nào trong giấc ngủ bạn cũng nghe thấy tiếng vó ngựa của Erlking rầm rập qua đầu.',
            resultEn: 'The weight of a thousand mirror souls crushed your weapon. Hurled down the rocky crags, you survived, yet every night in sleep you hear Erlking’s ghostly hooves thundering above.'
          }
        ]
      },
      {
        labelVi: 'Giao ước với The Wild Hunt: Nhận lấy cỗ xe linh hồn',
        labelEn: 'Pact with The Wild Hunt: Claim the spectral chariot',
        effects: { sanity: -30, rep: +40, heat: +35, resonance: +40 },
        flagsAdd: ['WildHuntRider'],
        scarsAdd: ['Kỵ sĩ của The Wild Hunt'],
        meritAdd: 40,
        resultVi: 'Bạn nhận lấy thanh đại đao và tấm áo choàng rách rưới. Erlking trao cho bạn dây cương của một con ngựa tử linh. Khi bạn giẫm chân, mặt đất T Corp rung chuyển theo tiếng gọi của cõi chết.',
        resultEn: 'Accepting the jagged blade and tattered mantle, Erlking handed you the reins of a spectral steed. With every step you take, T Corp’s stone quakes to the call of the fallen.'
      }
    ]
  },

  // ------------------------------------------------------------------ La Mancha Land (P Corp)
  {
    id: 'canto_lamancha_carnival',
    age: [20, 60],
    major: true,
    regions: ['16'],
    weight: 5.0,
    vi: '[Hầm Ngầm P Corp · Vòng Quay La Mancha Rỉ Sét] Trong lòng District 16 · P Corp, một công viên giải trí rực rỡ nhưng ma quái mở cửa giữa đêm khuya. Tiếng nhạc đu quay vang vọng cùng mùi bánh churros làm từ máu. Một hiệp sĩ với áo giáp rỉ sét và ngọn giáo dài đứng trước vòng quay ngựa gỗ, đôi mắt sáng rực niềm tin ngây thơ:\n"Hỡi lữ khách! Bạn có muốn cùng chúng ta cưỡi ngựa gỗ, hướng đến một thế giới nơi Bloodfiend và loài người cùng chung một nụ cười?"',
    en: '[Beneath P Corp · The Rusted Carousel of La Mancha] In District 16 · P Corp, a brilliant yet eerie amusement park awakened in the dead of night. Carousel organ tunes mingled with the scent of blood churros. A knight in rusted plate with a gleaming lance stood before the carousel, eyes blazing with naive conviction:\n“Hail, traveler! Wilt thou mount a steed beside us, riding toward a world where Bloodfiend and mankind share a single smile?”',
    choices: [
      {
        labelVi: 'Đồng hành cùng lý tưởng hiệp sĩ: "Công lý và giấc mơ thuần khiết"',
        labelEn: 'Champion the knight’s chivalric dream: “Justice and pure idealism”',
        outcomes: [
          {
            w: 60,
            effects: { health: +15, sanity: +45, rep: +25, resonance: +20 },
            scarsAdd: ['Hiệp sĩ của Giấc Mơ Hoang'],
            recordsAdd: ['lamancha_dreamer'],
            meritAdd: 30,
            resultVi: 'Bạn đứng cạnh hiệp sĩ già trên bục gỗ rỉ sét. Cây thương của ông rung bần bật trong gió, mùi máu từ những chiếc bánh churros bốc lên tanh nồng. Đám Bloodfiend bên dưới ngước nhìn, đôi mắt đỏ ngầu chớp chớp trong ánh đèn màu chập chờn. Không ai cười. Nhưng ít nhất trong đêm nay, tiếng gào xé thịt đã không vang lên.',
            resultEn: 'You stood beside the rusted knight upon the creaking dais. His lance trembled in the wind; the reek of blood from the churros rose thick and heavy. The kindred below looked up, crimson eyes blinking beneath stuttering neon. No one smiled. Yet for this single night, no flesh was torn in the dark.'
          },
          {
            w: 40,
            effects: { health: -30, sanity: -20, resonance: +25 },
            scarsAdd: ['Chiếc mặt nạ đẫm máu của La Mancha'],
            resultVi: 'Ảo mộng sụp đổ quá nhanh. Vòng quay ngựa gỗ biến thành máy nghiền thịt khi cơn khát của những Bloodfiend cấp dưới bùng phát. Bạn và hiệp sĩ phải chém gục hàng chục người trong nước mắt.',
            resultEn: 'The reverie collapsed all too soon. The carousel twisted into a slaughter wheel as starved lesser kindred lost control. You and the knight had to cut down dozens amidst tears.'
          }
        ]
      },
      {
        labelVi: 'Vạch trần trò lừa dối: Giẫm nát bánh churros và thanh tẩy khu vui chơi',
        labelEn: 'Expose the delusion: Crush the blood churros and purge the park',
        effects: { health: -20, sanity: -15, wealth: +35, rep: +30 },
        recordsAdd: ['fanghunt_honorary'],
        scarsAdd: ['Kẻ phá hủy công viên La Mancha'],
        meritAdd: 35,
        resultVi: 'Bạn phóng hỏa thiêu rụi vòng đu quay và đập nát nguồn cung cấp máu của P Corp. Fanghunt Office gửi thư khen ngợi kèm theo số tiền thưởng kếch xù. Hiệp sĩ nhìn bạn bằng đôi mắt vụn vỡ.',
        resultEn: 'Setting the carousel ablaze and severing the blood supply lines, Fanghunt Office wired an immense bounty with commendations. The rusted knight stared at you with shattered eyes.'
      }
    ]
  },

  // ------------------------------------------------------------------ The Ring's Gallery (District 8)
  {
    id: 'canto_ring_carnage_gallery',
    age: [22, 65],
    major: true,
    regions: ['8'],
    weight: 4.5,
    jobs: ['Syndicate', 'Fixer', 'Workshop Craftsman'],
    vi: '[Phòng Trưng Bày The Ring · Nét Cọ Tuyệt Tác] Tại một phòng trưng bày ngầm ở District 8, một Docent của The Ring đón bạn với một bức tượng điêu khắc từ cơ thể sống của 12 kẻ phản bội. Một nữ kiếm sĩ với điếu thuốc đỏ trên môi và bao kiếm quấn vải liệm bước ra:\n"N.T.T.M — Nghệ thuật thật sự đòi hỏi sự hủy diệt tuyệt đối. Ngươi muốn trở thành một nét cọ trong bức tranh này, hay một kẻ thưởng lãm có mắt nhìn?"',
    en: '[The Ring’s Gallery · Brushstroke of Carnage] In a subterranean gallery of District 8, a Docent of The Ring greeted you before a sculpture twisted from the living flesh of 12 traitors. A swordswoman with a burning cigarette and a cloth-wrapped sheath stepped forward:\n“A.R.T. — Absolute Ruin Transcends. Dost thou wish to be a brushstroke in this canvas, or a connoisseur with discerning eyes?”',
    choices: [
      {
        labelVi: 'Rút kiếm phác họa một tuyệt tác kiếm thuật đối lập (I.M.P.A.C.T)',
        labelEn: 'Draw your blade and slash an opposing masterpiece (I.M.P.A.C.T)',
        outcomes: [
          {
            w: 55,
            effects: { health: -20, sanity: +20, rep: +40, resonance: +30 },
            scarsAdd: ['Nét kiếm của Tuyệt Tác'],
            recordsAdd: ['ring_master_curator'],
            meritAdd: 40,
            resultVi: 'Bạn vung kiếm. Ba nhát gọn gàng chém đứt các thớ gân đang co giật, để máu phun thành một vệt đối xứng trên bức tường trắng. Người phụ nữ đứng cạnh nhả một làn khói xám, ngón tay gõ nhẹ lên chuôi kiếm: "K.K.T.H — Khá khen cho kẻ biết vung dao." The Ring đóng dấu thông hành cho bạn qua khu trưng bày.',
            resultEn: 'You swung your steel. Three surgical strokes severed the twitching tendons, letting the crimson spray form an immaculate bilateral arc against the plaster. The woman beside you exhaled a thread of gray smoke and tapped her sheath: “N.B.T. — Not bad at all.” The Ring stamped your safe-conduct pass.'
          },
          {
            w: 45,
            effects: { health: -35, sanity: -25, resonance: +25 },
            scarsAdd: ['Vết rạch từ nét cọ của The Ring'],
            resultVi: 'Ý đồ kiếm thuật của bạn bị Docent bắt bài. Một vết rạch ngọt xớt cắt đứt gân tay phải của bạn. Bạn phải rút lui trong khi tiếng cười chế giễu vang vọng khắp khán phòng.',
            resultEn: 'Your sword intent was read and countered by the Docent. A clean cut severed the tendon of your right wrist. You withdrew as mocking applause echoed through the hall.'
          }
        ]
      },
      {
        labelVi: 'Chê bai thứ nghệ thuật bệnh hoạn và đập phá phòng triển lãm',
        labelEn: 'Denounce the sick display and trash the exhibition hall',
        effects: { health: -30, rep: +25, heat: +45, sanity: +15 },
        scarsAdd: ['Kẻ thù của The Ring'],
        meritAdd: 30,
        resultVi: 'Bạn ném lựu đạn khói, đạp đổ các giá trưng bày và giải thoát những nạn nhân còn thở. The Ring phát lệnh truy nã bạn trên toàn bộ mạng lưới ngầm của năm ngón tay.',
        resultEn: 'Tossing smoke canisters, you toppled the pedestals and freed surviving captives. The Ring issued an all-District bounty on your head across the Five Fingers.'
      }
    ]
  },

  // ------------------------------------------------------------------ Nagel und Hammer Inquisition (N Corp)
  {
    id: 'canto_ncorp_grip_inquisition',
    age: [20, 60],
    major: true,
    regions: ['14'],
    weight: 5.0,
    vi: '[Thanh Trừng Nagel und Hammer · Tiếng Búa Và Đinh] Tại các con phố District 14, đội quân Cuồng Tín của N Corp (The One Who Grips) phong tỏa toàn bộ khu vực. Những chiếc búa tạ và đinh sắt rực lửa đập nát bất kỳ ai gắn tay chân máy hoặc thiết bị cơ khí:\n"Thịt và máu là món quà duy nhất của đấng tạo hóa! Mọi linh kiện kim loại cắm vào da thịt đều là ô uế! Ngươi đứng về phía thân xác thuần khiết, hay lũ máy móc tà giáo?"',
    en: '[Nagel und Hammer · Purge of the Pure Flesh] Across the avenues of District 14, the Zealots of N Corp (The One Who Grips) cordoned off the entire sector. Sledgehammers and scorched nails hammered into anyone bearing mechanical prosthetics or augments:\n“Flesh and bone are the creator’s sole blessings! All machinery pierced into human skin is an abomination! Dost thou stand with Pure Flesh, or the mechanical heretics?”',
    choices: [
      {
        labelVi: 'Đứng lên bảo vệ những người mang bộ phận máy móc (Chống lại N Corp)',
        labelEn: 'Shield the augmented citizens (Stand against N Corp)',
        outcomes: [
          {
            w: 55,
            effects: { health: -30, sanity: +30, network: +35, rep: +35 },
            scarsAdd: ['Tấm khiên của kẻ bị săn đuổi'],
            recordsAdd: ['prosthetic_liberator'],
            meritAdd: 40,
            resultVi: 'Bạn dựng rào chắn, dùng vũ khí đánh gãy hàng chục cây búa của N Corp và đưa những người mang chi máy chạy thoát qua đường cống ngầm. Nghiệp đoàn cơ khí Backstreets vinh danh bạn như một vị cứu tinh.',
            resultEn: 'Forming a barricade, your strikes shattered dozens of N Corp hammers, funneling augmented refugees into the drainage tunnels. The Backstreets machinist guild honored you as a savior.'
          },
          {
            w: 45,
            effects: { health: -45, sanity: -30, resonance: +25 },
            scarsAdd: ['Cây đinh nung đỏ của N Corp'],
            resultVi: 'Một cây đinh sắt nung đỏ bị đóng xuyên qua đùi bạn trước khi bạn kịp rút lui. N Corp để lại vết sẹo nung lửa như một lời cảnh cáo dành cho kẻ dám thách thức giáo điều.',
            resultEn: 'A red-hot nail drove through your thigh before you managed to escape. N Corp left a scorched brand as a grim warning to any who challenge their dogma.'
          }
        ]
      },
      {
        labelVi: 'Tuyên thệ phụng sự Giáo phái Búa và Đinh: Thanh trừng ô uế',
        labelEn: 'Swear allegiance to Nagel und Hammer: Purge the heretical metal',
        forbids: ['FullBodyProsthetic'],
        effects: { health: +20, sanity: -35, rep: +30, heat: +30 },
        flagsAdd: ['InquisitorOfFlesh'],
        scarsAdd: ['Chiếc Búa của N Corp'],
        meritAdd: 35,
        resultVi: 'Bạn nhận lấy chiếc búa tạ đóng dấu N Corp. Tiếng gào thét của những kẻ bị đập nát chân tay cơ khí vang vọng dưới mưa. Bạn trở thành một Inquisitor gieo rắc nỗi khiếp sợ.',
        resultEn: 'Taking up the heavy hammer bearing N Corp’s seal, the screams of crushed machinists echoed under the rain. You became an Inquisitor feared throughout the sector.'
      }
    ]
  },

  // ------------------------------------------------------------------ The Gesellschaft & The Stars (Cosmic Mirror Lore)
  {
    id: 'canto_gesellschaft_star_convergence',
    age: [25, 75],
    major: true,
    weight: 3.5,
    vi: '[Khúc Xạ Thủy Tinh · Tiếng Vọng Đa Chiều Gesellschaft] Một kết cấu hình học lơ lửng bằng thủy tinh khúc xạ mở ra trên đỉnh bầu trời. Vô số phiên bản của Faust từ các Thế Giới Gương đồng loạt cất tiếng nói bằng âm điệu thuần khiết:\n"Faust biết tất cả. Điểm hội tụ của The City và những Ngôi Sao ngoài The Outskirts đã đến. Bạn có muốn nhìn thấy bức màn đằng sau bản hợp đồng của The Head và nguồn cội của Singularity?"',
    en: '[Refraction of Mirrors · Voices of the Gesellschaft] A geometric refraction of floating glass uncoiled across the sky. Countless incarnations of Faust from across the Mirror Worlds spoke in harmonious unison:\n“Faust knows all. The convergence of The City and The Stars beyond the Outskirts has arrived. Dost thou wish to witness the veil behind The Head’s covenants and the origin of Singularities?”',
    choices: [
      {
        labelVi: 'Kết nối tâm trí vào mạng lưới Gesellschaft: Tiếp nhận toàn tri',
        labelEn: 'Interface your mind with the Gesellschaft network: Attain Omniscience',
        outcomes: [
          {
            w: 52,
            effects: { sanity: -35, resonance: +50, rep: +45, network: +40 },
            flagsAdd: ['GesellschaftObserver'],
            recordsAdd: ['gesellschaft_illumination'],
            scarsAdd: ['Con mắt nhìn thấu Đa Vũ Trụ'],
            meritAdd: 50,
            resultVi: 'Hàng vạn đường dây ý thức lạnh ngắt cắm thẳng vào thùy trán bạn. Bạn không nhìn thấy phép màu; bạn nhìn thấy các bản tính toán chi phí, lượng máu cần thiết để duy trì mỗi Singularity, và chiếc lồng kính khổng lồ mà The Head dựng lên bao quanh The City. Khi rút dây ra, mắt bạn rỉ máu, và thế giới này vĩnh viễn mất đi màu sắc của sự ngây thơ.',
            resultEn: 'Tens of thousands of icy data feeds pierced your frontal lobe. You saw no miracles; you perceived cold casualty ledgers, the exact liters of blood demanded by each Singularity, and the colossal glass cage erected by The Head around The City. When you tore the cables free, blood seeped from your eyelids, and the world lost all naive warmth forever.'
          },
          {
            w: 48,
            effects: { health: -20, sanity: -50, resonance: +40 },
            scarsAdd: ['Tâm trí quá tải trước Đa Vũ Trụ'],
            resultVi: 'Lượng dữ liệu vô tận thiêu rụi các rãnh não của bạn. Bạn ngã quỵ, máu mũi chảy ròng ròng. Bạn chỉ kịp nhớ được một điều duy nhất: The City là một cái lồng được bảo vệ nghiêm ngặt.',
            resultEn: 'The sheer magnitude of infinite data scorched your neural synapses. Collapsing with bleeding nostrils, a single conviction burned into memory: The City is a strictly guarded cage.'
          }
        ]
      },
      {
        labelVi: 'Cắt đứt kết nối gương: Giữ vững hiện thực duy nhất của bản thân',
        labelEn: 'Sever the mirror connection: Anchor to your singular reality',
        effects: { sanity: +35, health: +20, rep: +25 },
        scarsAdd: ['Kẻ từ chối chiếc gương toàn tri'],
        meritAdd: 30,
        resultVi: 'Bạn vung vũ khí đập vỡ tấm gương khúc xạ. Hội đồng Faust gật đầu mỉm cười tán thưởng trước ý chí độc lập của bạn: "Lựa chọn đáng chú ý." Bầu trời The City trở lại bình yên.',
        resultEn: 'Swinging your weapon to shatter the refractive glass, the Faust assembly smiled in subtle praise of your independence: “A noteworthy decision.” The City sky returned to silent peace.'
      }
    ]
  }
];

// ============================================================================
// FIXER REQUEST TEMPLATES, by threat tier (Canard → Star of the City)
// ============================================================================

import { EXPANDED_FIXER_REQUESTS } from './narrative/fixerRequests.js';

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
  },
  ...EXPANDED_FIXER_REQUESTS
];


