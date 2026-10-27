/**
 * Project Moon - Distortion Metamorphosis, Carmen Communion & Suppression Path
 * Governs the terrifying journey of a character who surrendered to Carmen's voice.
 * Strictly decoupled from standard human Fixer contracts.
 */

export const DISTORTION_PATH_EVENTS = [
  {
    id: 'distort_carmen_communion_1',
    age: [18, 99],
    major: true,
    weight: 95,
    requires: ['Distorted'],
    forbids: ['carmen_dialogue_done'],
    vi: "[Carmen gọi] Mùi khói Backstreets biến mất. Bạn đứng giữa đồng hoa trắng, và Carmen nói bên tai: \"Đừng kìm cảm xúc nữa.\" Khi cúi nhìn, chân bạn vẫn đứng trên nền đường cũ.",
    en: "[Carmen calls] The smell of Backstreets smoke is gone. You stand in a field of white flowers, and Carmen says at your ear: “Stop holding your feelings back.” When you look down, your feet are still on the old road.",
    choices: [
      {
        labelVi: "Dang tay đón hình thái mới",
        labelEn: "Open your arms to the new shape",
        resultVi: "Xương bạn gãy răng rắc rồi mọc dài thành những thanh kim loại và pha lê. Cơ thể bạn thành một thứ người ta quay mặt đi khi nhìn.",
        resultEn: "Your bones cracked and grew long into rods of metal and crystal. Your body became something people turned their faces from.",
        flagsAdd: ['carmen_dialogue_done', 'DistortionStage2'],
        effects: { health: +50, sanity: -30, rep: +40, resonance: +40 }
      },
      {
        labelVi: "Gào lên đòi lại những gì The City đã lấy của bạn",
        labelEn: "Scream for back what the City took from you",
        resultVi: "Tiếng gào của bạn làm vỡ kính của ba dãy nhà. Carmen mỉm cười, rồi tan vào ánh sáng.",
        resultEn: "Your scream broke the windows of three blocks. Carmen smiled, then dissolved into the light.",
        flagsAdd: ['carmen_dialogue_done', 'DistortionStage2'],
        effects: { health: +40, sanity: -20, heat: +50, resonance: +35 }
      }
    ]
  },
  {
    id: 'distort_suppression_wave_1',
    age: [19, 99],
    major: true,
    weight: 85,
    requires: ['Distorted', 'DistortionStage2'],
    forbids: ['wave1_survived'],
    vi: "[Lệnh thanh trừng: biệt đội Grade 4] Còi báo động rền khắp khu phố. Hana Association ban lệnh thanh trừng khẩn cấp cấp Urban Plague. Bốn Fixer Grade 4 mang súng chống dị thể bao quanh tòa nhà bạn ở.",
    en: "[Suppression order: Grade 4 strike team] Sirens roll across the district. Hana Association has issued an emergency Urban Plague suppression order. Four Grade 4 Fixers with anti-distortion guns surround the building you live in.",
    choices: [
      {
        labelVi: "Xé vòng vây và phá hết vũ khí của chúng",
        labelEn: "Break the cordon and wreck all their weapons",
        resultVi: "Móng kim loại của bạn nghiền nát tấm chắn của chúng. Cả bốn Fixer nằm lại. Hana nâng mức đánh giá của bạn lên Urban Nightmare.",
        resultEn: "Your metal claws crushed their shields. All four Fixers stayed on the ground. Hana raised your rating to Urban Nightmare.",
        flagsAdd: ['wave1_survived', 'DistortionNightmare'],
        effects: { health: -25, heat: +60, rep: +50, resonance: +30 }
      }
    ]
  },
  {
    id: 'distort_manifest_domain',
    age: [20, 99],
    major: true,
    weight: 80,
    requires: ['Distorted', 'DistortionNightmare'],
    forbids: ['domain_manifested'],
    vi: "[Lãnh địa] Sự hiện diện của bạn đã đổi cả một góc Backstreets. Những tòa nhà dựng lên như phím đàn khổng lồ hoặc rối vào nhau thành mê cung gai thép. Ai lạc vào đây cũng nghe thấy tiếng bạn khóc trong đầu mình.",
    en: "[A Domain] Your presence has remade a corner of the Backstreets. Buildings rise like the keys of a giant instrument or knot together into a maze of barbed steel. Anyone who wanders in hears you weeping inside their own head.",
    choices: [
      {
        labelVi: "Hòa ý thức vào lãnh địa và để nó thành thân thể mới của bạn",
        labelEn: "Let your mind sink into the domain and make it your new body",
        resultVi: "Bạn không còn cần ăn hay thở. Bạn là một phần của The City, một vết thương không lành mà Carmen đã gieo.",
        resultEn: "You no longer need to eat or breathe. You are part of The City, an unhealing wound that Carmen sowed.",
        flagsAdd: ['domain_manifested', 'DistortionStar'],
        effects: { health: +60, sanity: -40, rep: +60, resonance: +45 }
      }
    ]
  },
  {
    id: 'distort_climax_color_faceoff',
    age: [22, 99],
    major: true,
    weight: 90,
    requires: ['Distorted', 'DistortionStar'],
    forbids: ['distort_color_clash_done'],
    vi: "[Trận cuối với một Color] Một bóng người khoác áo choàng đi một mình qua màn sương của lãnh địa. Khí thế của họ lạnh và nặng đến mức không gian quanh đó đứng yên. Hana Association đã cử một Color Fixer đến kết thúc thảm họa mang tên bạn.",
    en: "[The last duel with a Color] A cloaked figure walks alone through the mist of your domain. Their presence is so cold and heavy that the space around them stands still. Hana Association has sent a Color Fixer to end the disaster that carries your name.",
    choices: [
      {
        labelVi: "Dốc hết sức, chiến đấu tới hơi thở cuối cùng vì bản ngã của mình",
        labelEn: "Give everything and fight to your last breath for your own self",
        resultVi: "Trận chiến xé rách bầu trời đêm. Bạn làm gãy một phần vũ khí của Color trước khi lõi dị thể của bạn ngừng đập. Hồ sơ mật của Hana ghi tên bạn như một ngôi sao đã tắt.",
        resultEn: "The fight tore the night sky open. You broke part of the Color’s weapon before your warped core stopped. Hana’s sealed file records your name as a star gone dark.",
        flagsAdd: ['distort_color_clash_done'],
        effects: { health: -100 } // Tragic heroic climax death
      },
      {
        labelVi: "Dồn cộng hưởng ngược vào một đòn xé không gian rồi rút vào bóng tối",
        labelEn: "Pour inverted resonance into one space-tearing blow and withdraw into the dark",
        resultVi: "Sóng xung kích của bạn va vào tuyệt kỹ của Color, mở ra một hố đen nuốt cả quảng trường. Bạn bị thương nặng nhưng buộc được Color lùi lại, rồi biến vào giấc mơ của Carmen. Toàn The City từ đó gọi bạn là Apex Calamity.",
        resultEn: "Your shockwave met the Color’s signature art and opened a pit that swallowed the plaza. Badly wounded, you forced the Color back and vanished into Carmen’s dream. The whole City has called you an Apex Calamity since.",
        flagsAdd: ['distort_color_clash_done', 'ApexDistortionSurvivor', 'StarOfTheCityEntity'],
        meritAdd: 60,
        effects: { health: -55, rep: +100, resonance: +50, heat: +80 }
      }
    ]
  },
  {
    id: 'distort_gathering_twisted_flock',
    age: [21, 95],
    major: true,
    weight: 65,
    requires: ['Distorted', 'DistortionStage2'],
    forbids: ['distort_flock_done'],
    vi: "[Tín đồ của nỗi đau] Quanh lãnh địa, hàng trăm người tuyệt vọng của Backstreets, bị Wing bỏ rơi, bị Syndicate siết nợ, quỳ dưới chân bạn. Họ coi cơ thể biến dị và tiếng gào của bạn là thánh ca của một vị thần mới.",
    en: "[Followers of the pain] Around your domain hundreds of desperate people from the Backstreets, abandoned by the Wing and squeezed by Syndicates, kneel at your feet. They take your warped body and your cries for the hymn of a new god.",
    choices: [
      {
        labelVi: "Nhận họ vào, chia cho mỗi người một phần ngọn lửa của Carmen",
        labelEn: "Take them in and give each a share of Carmen’s fire",
        resultVi: "Cả đám đồng loạt mọc ra những biến dạng lạ trên da thịt. Họ thành tín đồ cuồng nhiệt, canh giữ lãnh địa trước mọi đợt thanh trừng của các Office Fixer.",
        resultEn: "The whole crowd sprouted strange growths on their flesh. They became zealots guarding your domain against every purge by the Fixer Offices.",
        meritAdd: 30,
        flagsAdd: ['distort_flock_done', 'DistortionCultLeader'],
        effects: { rep: +45, resonance: +35, sanity: -15, network: +30 }
      },
      {
        labelVi: "Gào lên đuổi họ đi: \"Giữ lấy nhân tính của các người, đừng đi con đường này.\"",
        labelEn: "Shout them away: “Keep your humanity, do not walk this road.”",
        resultVi: "Tiếng thét làm đám đông tản chạy. Bạn chọn cô độc để họ khỏi bị kéo theo. Trong ngực bạn vẫn còn một đóa hoa nhỏ của nhân tính.",
        resultEn: "The shout scattered the crowd. You chose to be alone so they would not be dragged after you. In your chest one small flower of humanity remained.",
        meritAdd: 25,
        flagsAdd: ['distort_flock_done'],
        effects: { sanity: +20, resonance: +25, heat: -10 }
      }
    ]
  },
  {
    id: 'distort_head_claw_interception',
    age: [24, 99],
    major: true,
    weight: 75,
    requires: ['Distorted', 'DistortionNightmare'],
    forbids: ['distort_claw_clash_done'],
    vi: "[The Claw đến] Một Claw của C Corp đáp xuống gần bạn, ba ống Serum trên găng tay đã sáng. \"Distortion. Lệnh xử lý bắt đầu.\" Sau lưng bạn là đường trống, nhưng hắn đứng chắn lối về.",
    en: "[The Claw arrives] A Claw of C Corp lands near you, the three Serum injectors on its gauntlet already lit. “Distortion. Disposal order begins.” The road behind you is empty, but it stands across the way back.",
    choices: [
      {
        labelVi: "Vung móng vuốt dị thể đối đầu Serum W trong một trận quyết đấu",
        labelEn: "Swing your warped claws against Serum W in a duel",
        resultVi: "Móng bạn xé giáp của Claw đúng lúc mũi tiêm Serum R đâm xuyên vai bạn. Cả hai lùi lại sau cú va chạm. Thấy bạn cứng đầu hơn dự đoán, Claw dịch chuyển rút lui để báo cáo với The Head.",
        resultEn: "Your claws tore the Claw’s plating just as its Serum R injector went through your shoulder. Both fell back from the impact. Finding you tougher than expected, the Claw warped away to report to the Head.",
        flagsAdd: ['distort_claw_clash_done', 'ClawSurvivor'],
        meritAdd: 55,
        effects: { health: -45, rep: +80, resonance: +45, heat: +50 }
      },
      {
        labelVi: "Dụ Claw vào mê cung lãnh địa, kích nổ bẫy không gian để thoát",
        labelEn: "Lure the Claw into the domain’s maze and set off the space traps to escape",
        resultVi: "Mê cung sụp, chôn lối đi của Claw vài giây quý giá. Bạn tan vào dòng ngầm của The City, vẫn tính toán được dù trong thân xác quái vật.",
        resultEn: "The maze collapsed and buried the Claw’s path for a few precious seconds. You slipped into the City’s underground currents, still able to calculate in a monster’s body.",
        flagsAdd: ['distort_claw_clash_done'],
        meritAdd: 40,
        effects: { sanity: +15, rep: +50, heat: +30, resonance: +30 }
      }
    ]
  },

  {
    id: 'distort_former_companion_encounter',
    age: [18, 99],
    major: true,
    weight: 65,
    need: { jobs: ['Distortion'] },
    forbids: ['distort_companion_done'],
    vi: "[Người quen cũ] Một người quen cũ từ cuộc đời trước chặn đầu con hẻm, tay cầm thanh kiếm cùn. Người ấy nhìn những chiếc gai và khối dị hình trên người bạn, run giọng hỏi: \"Có thật... là cậu không?\" Lưỡi kiếm run bần bật, nhưng chưa chịu hạ xuống.",
    en: "[A face from the past] A former companion from your past life blocks the alley, wielding a trembling dull sword. Looking upon your crystalline thorns and twisted visage, they stammer: “Is that... truly you?” The blade shakes, yet refuses to lower.",
    choices: [
      {
        labelVi: "Nén cơn khát máu, quay lưng chạy vào bóng tối để bảo vệ bạn mình",
        labelEn: "Hold down the hunger and run into the dark to protect your friend",
        resultVi: "Bạn rít lên đau đớn, cào móng vào vách đá rồi lẩn sâu vào Backstreets. Một giọt nước mắt nóng lăn trên gương mặt méo mó. Bạn vẫn giữ lại một mảnh người.",
        resultEn: "You hissed in pain, raked your claws down the wall and slipped deep into the Backstreets. One hot tear ran down your warped face. You kept a piece of the human.",
        effects: { sanity: +12, resonance: +20, heat: +15 },
        meritAdd: 20,
        flagsAdd: ['distort_companion_done'],
        recordsAdd: ['distortion_spared_companion']
      },
      {
        labelVi: "Buông cho bản năng săn mồi, nuốt luôn cả ký ức xưa",
        labelEn: "Let the hunting instinct go and devour the ancient memory too",
        resultVi: "Máu nhuộm đỏ tường ngõ. Khi cơn cuồng nộ qua đi, bạn đứng cô độc giữa con hẻm hoang tàn trên xác kẻ vừa gục xuống. Không còn ai sống sót nhớ bạn từng là ai. Sức mạnh của bạn tăng vọt.",
        resultEn: "Blood stained the alley wall. When the frenzy passed, you stood alone over the fallen body. No one living remembered who you had been. Your power surged.",
        effects: { health: +35, sanity: -35, rep: +50, heat: +40 },
        meritAdd: 30,
        flagsAdd: ['distort_companion_done'],
        scarsAdd: ['Bàn tay vấy máu']
      }
    ]
  },
  {
    id: 'distort_star_of_city_rampage',
    age: [18, 99],
    major: true,
    weight: 70,
    need: { jobs: ['Distortion'] },
    forbids: ['distort_star_rampage_done'],
    vi: "[Cơn thịnh nộ của Star of the City] Sự méo mó trong tâm trí bạn chạm đỉnh. Cả khu phố quanh bạn biến thành sân khấu riêng: đá đường uốn cong, bầu trời đỏ như mắt Carmen. Ba đội Fixer Grade 1 cùng dàn pháo của Hana bao vây toàn bộ khu vực.",
    en: "[Wrath of a Star of the City] The warping in your mind peaks. The whole district around you becomes a stage of your own: the paving bends, the sky glows red like Carmen’s eye. Three Grade 1 Fixer teams and Hana’s artillery seal the entire area.",
    choices: [
      {
        labelVi: "Gầm lên và đối đầu toàn bộ Fixer của Hana",
        labelEn: "Roar and face every Fixer of Hana",
        resultVi: "Trận chiến san phẳng năm dãy nhà. Bạn chém gãy hàng chục vũ khí Workshop và phá vòng vây của Hana. Tên bạn được khắc vào danh sách Star of the City.",
        resultEn: "The fight levelled five blocks. You broke dozens of Workshop weapons and broke Hana’s cordon. Your name was carved into the list of the Stars of the City.",
        effects: { health: -30, rep: +100, heat: +50, resonance: +40 },
        meritAdd: 50,
        flagsAdd: ['distort_star_rampage_done', 'StarOfTheCityEntity']
      }
    ]
  },

  // =========================================================================
  // DEEP DISTORTION ENCOUNTERS: RESONANCE, LAIRS & CARMEN'S CONVERGENCE
  // =========================================================================
  {
    id: 'distort_abnormality_resonance_communion',
    age: [19, 90],
    major: true,
    weight: 48,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Tiếng vọng dưới đường] Một Abnormality đang ngủ trong tàn tích Lobotomy Corporation bên dưới con hẻm. Cơ thể biến dạng của bạn rung theo nhịp đập của nó. Nắp cống dưới chân bắt đầu chuyển động.",
    en: "[An echo under the street] An Abnormality sleeps in the ruins of Lobotomy Corporation beneath the alley. Your deformed body vibrates with its pulse. The manhole cover under your feet begins to move.",
    choices: [
      {
        labelVi: "Hòa ý thức vào tần số của nó và hấp thụ một phần khái niệm của nó",
        labelEn: "Merge your mind into its frequency and take in part of its concept",
        resultVi: "Một luồng năng lượng hoang dại tràn vào máu biến dị của bạn. Hình thái bạn mọc thêm một tầng gai, và không khí quanh bạn lạnh đi.",
        resultEn: "A wild current poured into your warped blood. Your form grew another layer of spines, and the air around you went cold.",
        meritAdd: 28,
        effects: { rep: +35, resonance: +30, health: +20, sanity: -8 }
      },
      {
        labelVi: "Gầm lên đẩy nguồn ô nhiễm ngoại lai ra, giữ bản ngã biến dị của riêng mình",
        labelEn: "Roar and push the foreign contamination out, keeping your own distorted self",
        resultVi: "Bạn đập tan sự xâm nhập từ phía dưới. Ý chí biến dị của riêng bạn trở nên cứng như kim cương.",
        resultEn: "You smashed the intrusion from below. Your own distorted will went as hard as diamond.",
        meritAdd: 22,
        effects: { sanity: +20, resonance: +15, health: +10 }
      }
    ]
  },
  {
    id: 'distort_backstreet_children_lullaby',
    age: [19, 85],
    major: true,
    weight: 46,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Khúc hát ru của quái vật] Giữa đêm đông, một nhóm trẻ mồ côi Backstreets rón rén tụ lại quanh hang đổ nát của bạn. Chúng không sợ. Chúng bị mê bởi những nốt nhạc buồn phát ra từ các cơ quan biến dị của bạn, và coi bạn là thần hộ vệ của bóng đêm.",
    en: "[The monster’s lullaby] On a winter night a group of Backstreets orphans creeps up around your ruined den. They are not afraid. They are drawn by the sad notes coming from your warped organs, and take you for a guardian of the night.",
    choices: [
      {
        labelVi: "Ngân một giai điệu êm để che lũ trẻ khỏi đợt tuần tra Sweeper lúc 3 giờ sáng",
        labelEn: "Hum a soft tune to shield the children from the 3 AM Sweeper patrol",
        resultVi: "Khi còi Sweeper vang lên, bóng tối biến dị của bạn bọc lấy lũ trẻ. Lũ Sweeper không dám lại gần lãnh địa. Lũ trẻ ngủ say tựa vào bạn, và bạn có một thoáng ấm hiếm hoi.",
        resultEn: "When the Sweeper sirens sounded, your warped darkness wrapped the children. The Sweepers did not dare come near the domain. The children slept leaning on you, and you had one rare moment of warmth.",
        meritAdd: 30,
        effects: { sanity: +35, rep: +20, health: +15 }
      },
      {
        labelVi: "Gầm lên cho chúng sợ mà chạy về nơi an toàn",
        labelEn: "Roar so they run in fear to somewhere safe",
        resultVi: "Lũ trẻ sợ hãi chạy thẳng vào trại tị nạn của Zwei Association trước giờ giới nghiêm. Bạn đứng lại một mình trong bóng tối, vừa làm xong một việc cứu người tàn nhẫn.",
        resultEn: "Terrified, the children ran straight into a Zwei Association refugee camp before curfew. You stood alone in the dark, having done a cruel kind of rescue.",
        meritAdd: 20,
        effects: { sanity: +15, resonance: +12 }
      }
    ]
  },
  {
    id: 'distort_hana_suppression_squad',
    age: [21, 90],
    major: true,
    weight: 48,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Biệt đội trấn áp của Hana Section 2] Ba Fixer tinh nhuệ của Hana Section 2 mang lồng phong tỏa cộng hưởng và xích triệt tiêu năng lượng bao quanh lãnh địa của bạn. Họ đọc án lệnh thanh trừng một hiểm họa cấp Đô Thị.",
    en: "[Hana Section 2 suppression squad] Three elite Fixers of Hana Section 2 surround your domain with resonance containment cages and energy-damping chains. They read out the extermination order for a City-level hazard.",
    choices: [
      {
        labelVi: "Bung toàn bộ sóng biến dị, phá lồng giam và đánh gục đội trưởng",
        labelEn: "Release the full distortion wave, break the cage and drop their captain",
        resultVi: "Sóng xung kích bẻ cong xích phong tỏa như cành khô. Đội trưởng văng vào tường đá, hộc máu, và cả toán rút lui. Tên bạn làm cả giới Fixer lạnh gáy.",
        resultEn: "The shockwave bent the containment chains like dry twigs. The captain was thrown against the stone wall, coughing blood, and the whole squad withdrew. Your name chilled the entire Fixer world.",
        meritAdd: 32,
        effects: { health: -18, rep: +45, heat: +25, resonance: +25 }
      },
      {
        labelVi: "Tan vào sương mù Backstreets, đánh lừa máy dò sinh trắc của chúng rồi biến mất",
        labelEn: "Dissolve into the Backstreets smog, fool their biometric scanners and vanish",
        resultVi: "Máy định vị của Hana mất dấu bạn hoàn toàn. Bạn dời sang khu săn mồi khác mà không bị phát hiện.",
        resultEn: "Hana’s trackers lost you completely. You moved to another hunting ground undetected.",
        meritAdd: 22,
        effects: { rep: +20, sanity: +12, heat: -15 }
      }
    ]
  },
  {
    id: 'distort_domain_expansion_theater',
    age: [23, 90],
    major: true,
    weight: 45,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Sân khấu ký ức] Nỗi đau tích tụ cả đời bạn tràn ra thực tại. Trong bán kính ba trăm mét quanh bạn, tường gạch hóa thành phím đàn piano khổng lồ, và mỗi phím vang lên một đoạn đời của bạn.",
    en: "[The Theater of Memory] The pain you have stored up all your life spills into reality. In a three-hundred-meter radius around you, brick walls turn into giant piano keys, and each key sounds a piece of your life.",
    choices: [
      {
        labelVi: "Chơi bản nhạc của cả cuộc đời bạn và biến nỗi đau thành vũ khí",
        labelEn: "Play the song of your whole life and turn the pain into a weapon",
        resultVi: "Mỗi nốt nhạc cắt qua không khí và đẩy lui bất cứ kẻ nào bước vào. Cả khu trở thành nơi không ai dám tới gần, và bạn là thứ nằm ở giữa nó.",
        resultEn: "Every note cuts through the air and drives back whoever steps in. The whole area becomes a place nobody dares approach, and you are what sits at its center.",
        meritAdd: 35,
        effects: { rep: +50, resonance: +35, health: +25, sanity: +20 }
      },
      {
        labelVi: "Thu lãnh địa vào trong ngực và giữ sân khấu ký ức cho riêng mình",
        labelEn: "Fold the domain back into your chest and keep the theater of memory to yourself",
        resultVi: "Mặt đường thẳng lại, nhưng cơ thể bạn đặc lại như áo giáp. Bạn giữ được cái bản ngã méo mó của mình mà không để nó giữ lại bạn.",
        resultEn: "The pavement straightens, but your body thickens like armor. You keep your twisted self without letting it keep you.",
        meritAdd: 28,
        effects: { sanity: +30, health: +20, resonance: +20 }
      }
    ]
  },
  {
    id: 'distort_head_beholder_observation',
    age: [25, 95],
    major: true,
    weight: 42,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Beholder quan sát] Ánh mắt của một Beholder quét qua hang bạn. Dạng biến dị này đã lọt vào hồ sơ của The Head, và một lệnh xử lý có thể theo sau. Tia sáng dừng đúng trên người bạn.",
    en: "[The Beholder watches] The gaze of a Beholder of B Corp sweeps over your den. This distortion has reached The Head’s files, and a disposal order may follow. The beam stops right on you.",
    choices: [
      {
        labelVi: "Ngẩng lên nhìn thẳng con mắt, khẳng định phần người sâu nhất của mình",
        labelEn: "Look up into the eye and assert the deepest human part of yourself",
        resultVi: "Con mắt khổng lồ chớp chậm. Dù thân hình quái dị, khát vọng và nỗi đau của bạn rõ ràng là của một con người. Con mắt khép lại rồi tan. The Head chấp nhận bạn tồn tại trong The City.",
        resultEn: "The huge eye blinked slowly. Monster though you were, your longing and pain were plainly human. The eye closed and dissolved. The Head tolerated your existence in the City.",
        meritAdd: 35,
        effects: { rep: +60, sanity: +25, resonance: +30, heat: -20 }
      },
      {
        labelVi: "Phun khói đen biến dị để che con mắt",
        labelEn: "Erupt a black cloud of distortion to blind the eye",
        resultVi: "Khói đen phủ kín bầu trời quận ba ngày ba đêm. Con mắt rút đi, nhưng mức chú ý của The Head với tên bạn tăng vọt.",
        resultEn: "Black smoke blanketed the district sky for three days and nights. The eye withdrew, but the Head’s attention to your name rose sharply.",
        meritAdd: 25,
        effects: { rep: +40, heat: +30, resonance: +25 }
      }
    ]
  },
  {
    id: 'distort_carmen_final_solace',
    age: [28, 100],
    major: true,
    weight: 45,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Lời Carmen] Giữa cơn hỗn loạn, Carmen cất tiếng trong đầu bạn: \"Ngươi đã mệt vì phải giữ một hình hài vừa mắt The City. Buông tay đi.\" Giọng nói dịu xuống, chờ câu trả lời.",
    en: "[Carmen’s Voice] In the middle of the chaos Carmen speaks inside your head: “You are tired of holding a shape that suits The City. Let go.” The voice softens and waits for an answer.",
    choices: [
      {
        labelVi: "Mỉm cười chấp nhận và trở thành một huyền thoại của The City",
        labelEn: "Smile, accept, and become a legend of The City",
        resultVi: "Cơn đau biến mất, nhường chỗ cho một sự yên lặng mà bạn không nhớ đã từng có. Bạn không còn là con quái vật đau khổ nữa, mà là một sinh linh sống đúng với phần sâu nhất của mình.",
        resultEn: "The pain disappears and leaves a quiet you do not remember ever having. You are no longer a suffering monster but a being who lives by the deepest part of itself.",
        meritAdd: 40,
        effects: { sanity: +45, resonance: +40, health: +30, rep: +50 }
      },
      {
        labelVi: "Rơi một giọt nước mắt cuối cùng và giữ lại ký ức về lúc ban đầu",
        labelEn: "Shed one last tear and keep the memory of how you began",
        resultVi: "Giọt nước mắt rơi xuống và vỡ như pha lê trên mặt đá. Bạn giữ lại mảnh ký ức quý nhất về những người từng yêu mình, và trở thành một con quái vật vẫn còn nhớ.",
        resultEn: "The tear falls and shatters like crystal on the cobbles. You keep the most precious memory of the people who once loved you, and become a monster that still remembers.",
        meritAdd: 35,
        effects: { sanity: +35, resonance: +25, rep: +35 }
      }
    ]
  }
];
