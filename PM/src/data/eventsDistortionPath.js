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
    vi: "[Carmen gọi] Mùi khói Backstreets nhạt đi. Giữa đồng hoa trắng, Carmen hỏi: \"Bạn còn muốn nói gì?\" Dưới chân bạn vẫn là mặt đường cũ.",
    en: "[Carmen calls] The Backstreets smoke fades. In a field of white flowers, Carmen asks, “What else do you want to say?” The old road is still beneath your feet.",
    choices: [
      {
        labelVi: "Để hình dạng mới tiếp tục đổi",
        labelEn: "Let the new shape keep changing",
        resultVi: "Các khớp tay kéo dài. Lớp vỏ cứng phủ lên vai; người đi ngang hẻm thấy bạn thì đổi đường.",
        resultEn: "Your arm joints lengthen. A hard shell covers your shoulders; a passerby sees you and takes another street.",
        flagsAdd: ['carmen_dialogue_done', 'DistortionStage2'],
        effects: { health: +50, sanity: -30, rep: +40, resonance: +40 }
      },
      {
        labelVi: "Nói thành tiếng điều bạn giận The City",
        labelEn: "Say aloud what you resent about the City",
        resultVi: "Tiếng bạn bật ra quá lớn. Kính cửa tiệm gần đó nứt; người bên trong kéo sập cửa cuốn.",
        resultEn: "Your voice comes out too loud. A shop window cracks, and someone inside pulls down the shutter.",
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
    vi: "[Lãnh địa] Từ ngày bạn trú lại, lối hẻm thay đổi. Lan can cong vào trong, tường gạch nổi những vệt cứng như vỏ trên tay bạn. Người qua đường bắt đầu đi vòng.",
    en: "[A domain] Since you settled here, the alley has changed. Railings bend inward and hard ridges rise from the brickwork, like the shell on your arm. Passersby take another route.",
    choices: [
      {
        labelVi: "Để hình dạng của bạn lan sang những bức tường",
        labelEn: "Let your shape spread into the walls",
        resultVi: "Những vệt cứng nối liền các bức tường. Bạn đi trong hẻm mà không còn phân biệt rõ đâu là da mình, đâu là gạch. Đến tối, cả dãy nhà đã khóa cửa.",
        resultEn: "Hard ridges join the walls. As you move through the alley, brick and skin become hard to tell apart. By evening, every door on the block is locked.",
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
    vi: "[Color đến] Một Fixer mang huy hiệu Color đi qua lối hẻm đã biến dạng. Người ấy nhìn những bức tường trước khi nhìn bạn. Trên tay họ là lệnh xử lý của Hana.",
    en: "[The Color arrives] A Fixer wearing a Color insignia enters the altered alley. They study the walls before looking at you. A Hana suppression order is in their hand.",
    choices: [
      {
        labelVi: "Giữ lối hẻm và đánh đến cùng",
        labelEn: "Hold the alley and fight to the end",
        resultVi: "Bạn làm gãy một đoạn vũ khí của Color. Đòn kế tiếp đánh trúng ngực bạn. Khi Hana thu dọn hiện trường, đoạn vũ khí ấy vẫn nằm cạnh xác.",
        resultEn: "You break a section of the Color’s weapon. The next blow strikes your chest. When Hana clears the scene, the broken section lies beside your body.",
        flagsAdd: ['distort_color_clash_done'],
        effects: { health: -100 } // Tragic heroic climax death
      },
      {
        labelVi: "Dồn sức mở một lối thoát rồi rút lui",
        labelEn: "Force an opening and retreat",
        resultVi: "Cú va chạm đẩy cả hai lùi khỏi cửa hẻm. Bạn mất nhiều máu nhưng thoát qua mái nhà phía sau. Hồ sơ Hana giữ nguyên lệnh truy bắt và nâng mức đe dọa.",
        resultEn: "The impact drives you both back from the alley mouth. Bleeding heavily, you escape across the rear rooftops. Hana keeps the order open and raises your threat rating.",
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
    vi: "[Người tìm đến] Vài người mất chỗ ở kéo tới con hẻm của bạn. Họ nghĩ đám thu nợ sẽ không dám theo vào. Có người hỏi liệu họ được ở lại qua đêm không.",
    en: "[People at the alley] A few people who lost their homes come to your alley. They think debt collectors will not follow them in. One asks whether they can stay the night.",
    choices: [
      {
        labelVi: "Cho họ ở lại và giao nhau trông chừng lối vào",
        labelEn: "Let them stay and take turns watching the entrance",
        resultVi: "Họ dựng chỗ ngủ sau bức tường cong. Ngày càng nhiều người tìm đến, nghe bạn sắp xếp người canh lối vào. Khi Office tới, họ báo động trước.",
        resultEn: "They make beds behind the bent wall. More people arrive and follow your orders for watching the entrance. When an Office comes, they sound the alarm first.",
        meritAdd: 30,
        flagsAdd: ['distort_flock_done', 'DistortionCultLeader'],
        effects: { rep: +45, resonance: +35, sanity: -15, network: +30 }
      },
      {
        labelVi: "Bảo họ đi trước khi Office kéo tới",
        labelEn: "Tell them to leave before an Office arrives",
        resultVi: "Họ thu dọn ngay trong đêm. Bạn ở lại một mình; sáng hôm sau, không còn dấu chân nào trước cửa hẻm.",
        resultEn: "They pack up that night. You stay alone; by morning, no footprints remain at the alley entrance.",
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
    vi: "[The Claw đến] Claw của C Corp đáp xuống đầu hẻm. Ba ống Serum trên găng tay sáng lên; nó đọc số hồ sơ của bạn rồi bước tới. Lối ra duy nhất nằm phía sau nó.",
    en: "[The Claw arrives] A C Corp Claw lands at the alley entrance. Three Serum injectors light up on its gauntlet; it reads your file number and steps forward. The only exit is behind it.",
    choices: [
      {
        labelVi: "Đánh vào giáp tay trước khi nó dùng Serum",
        labelEn: "Strike its gauntlet before it uses Serum",
        resultVi: "Móng bạn cào rách giáp tay, nhưng mũi tiêm xuyên qua vai. Cả hai lùi lại. Claw nhận tín hiệu qua máy liên lạc rồi rút khỏi hẻm; lệnh xử lý vẫn còn hiệu lực.",
        resultEn: "You tear the plating on its gauntlet, but the injector goes through your shoulder. You both step back. The Claw receives a radio signal and leaves the alley; the order remains open.",
        flagsAdd: ['distort_claw_clash_done', 'ClawSurvivor'],
        meritAdd: 55,
        effects: { health: -45, rep: +80, resonance: +45, heat: +50 }
      },
      {
        labelVi: "Dụ Claw qua lối tường đang nứt rồi rút xuống cống",
        labelEn: "Draw the Claw past a cracked wall and retreat through the drain",
        resultVi: "Bức tường đổ chắn lối vài giây. Bạn chui xuống đường cống trước khi Claw vòng qua; tiếng giày của nó còn theo bạn một đoạn.",
        resultEn: "The wall falls across the passage for a few seconds. You enter the drain before the Claw circles around; its footsteps follow you for a while.",
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
    vi: "[Người quen cũ] Người từng đi cùng bạn đứng ở đầu hẻm, tay cầm kiếm. Họ nhìn lớp vỏ trên tay bạn rồi gọi tên cũ. Thanh kiếm vẫn chưa hạ xuống.",
    en: "[Someone you knew] A former companion stands at the alley entrance with a sword in hand. They look at the shell on your arm and call your old name. The sword stays raised.",
    choices: [
      {
        labelVi: "Lùi lại để họ rời khỏi hẻm",
        labelEn: "Step back and let them leave the alley",
        resultVi: "Bạn lùi sát tường. Người ấy đi ngang, vẫn giữ kiếm trong tay nhưng không quay đầu. Bạn đợi đến khi họ khuất mới rời đi.",
        resultEn: "You step against the wall. They pass with the sword still in hand and do not look back. You wait until they are gone before leaving.",
        effects: { sanity: +12, resonance: +20, heat: +15 },
        meritAdd: 20,
        flagsAdd: ['distort_companion_done'],
        recordsAdd: ['distortion_spared_companion']
      },
      {
        labelVi: "Tấn công trước khi họ kịp nói thêm",
        labelEn: "Attack before they can speak again",
        resultVi: "Thanh kiếm rơi xuống nền đường. Khi bạn buông tay, người ấy không đứng dậy nữa. Bạn bỏ lại cái tên cũ trong con hẻm.",
        resultEn: "The sword falls to the road. When you let go, they do not get up. You leave your old name in the alley.",
        effects: { health: +35, sanity: -35, rep: +50, heat: +40 },
        meritAdd: 30,
        flagsAdd: ['distort_companion_done'],
        scarsAdd: ['Bàn tay vấy máu']
      }
    ]
  },
  {
    id: 'distort_star_of_city_rampage',
    age: [28, 99],
    major: true,
    weight: 70,
    need: { jobs: ['Distortion'], meritAtLeast: 100, stat: { rep: [65, 100], heat: [60, 100] } },
    forbids: ['distort_star_rampage_done', 'distort_star_calamity_done', 'LivingStarOfCity'],
    vi: "[Vòng vây của Hana] Ba đội Fixer Grade 1 chặn các lối ra khỏi khu phố. Rào chắn mới dựng qua đêm; trên đó dán bản vẽ hình dạng của bạn. Họ đã biết bạn trú ở đâu.",
    en: "[Hana's cordon] Three Grade 1 Fixer teams block the exits from the district. New barricades went up overnight, each carrying a sketch of your shape. They know where you live.",
    choices: [
      {
        labelVi: "Đánh vào chỗ rào chắn chưa khép kín",
        labelEn: "Strike where the barricade is still open",
        resultVi: "Bạn phá một đoạn rào và thoát ra qua đám bụi. Hana ghi lại số Fixer bị thương, rồi nâng hồ sơ của bạn lên Star of the City.",
        resultEn: "You break a section of the barricade and escape through the dust. Hana records the injured Fixers, then raises your file to Star of the City.",
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
    vi: "[Tiếng vọng dưới đường] Nắp cống dưới chân rung lên. Dưới đó là lối vào tàn tích Lobotomy Corporation; từ sâu bên trong, bạn nghe tiếng gõ đều mà cơ thể mình vô thức đáp lại.",
    en: "[An echo below] The manhole cover shakes. Beneath it lies a passage into an old Lobotomy Corporation site; a steady tapping comes from below, and your body answers before you mean it to.",
    choices: [
      {
        labelVi: "Ở lại nghe nhịp gõ dưới nắp cống",
        labelEn: "Stay and listen to the tapping below",
        resultVi: "Nhịp gõ theo bạn tới tận sáng. Lớp vỏ trên tay mọc thêm gai nhỏ; người quét đường thấy chúng trước khi thấy mặt bạn.",
        resultEn: "The tapping stays with you until morning. Small spines grow along the shell of your arm; the street cleaner sees them before seeing your face.",
        meritAdd: 28,
        effects: { rep: +35, resonance: +30, health: +20, sanity: -8 }
      },
      {
        labelVi: "Đậy nắp cống và rời khỏi lối vào",
        labelEn: "Close the cover and leave the entrance",
        resultVi: "Bạn đẩy nắp cống về chỗ cũ. Tiếng gõ còn theo vài con phố rồi dứt; nhịp thở bạn trở lại đều hơn.",
        resultEn: "You push the cover back into place. The tapping follows you for a few blocks, then stops; your breathing steadies.",
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
    vi: "[Trẻ ở đầu hẻm] Vài đứa trẻ Backstreets nấp dưới mái hiên gần chỗ bạn trú. Chúng đã nghe tiếng rền trong lớp vỏ của bạn và tưởng nơi này có máy sưởi. Đêm Quét Dọn sắp bắt đầu.",
    en: "[Children by the alley] A few Backstreets children shelter beneath the awning near you. They heard the hum inside your shell and mistook it for a heater. The Night in the Backstreets is about to begin.",
    choices: [
      {
        labelVi: "Dẫn lũ trẻ vào chỗ khuất và canh lối hẻm",
        labelEn: "Lead the children into cover and watch the alley",
        resultVi: "Bạn che lối vào bằng những mảng vỏ cứng. Sweepers đi ngang rồi khuất; khi trời sáng, lũ trẻ rời đi và để lại chiếc khăn trên bậc cửa.",
        resultEn: "You block the entrance with plates of your shell. Sweepers pass without stopping; at daylight the children leave a scarf on the doorstep.",
        meritAdd: 30,
        effects: { sanity: +35, rep: +20, health: +15 }
      },
      {
        labelVi: "Chỉ chúng tới chốt Zwei rồi đuổi đi",
        labelEn: "Point them toward the Zwei post and send them away",
        resultVi: "Bạn chỉ về phía đèn của Zwei. Lũ trẻ chạy theo hướng ấy; bạn đợi đến khi cửa chốt mở mới quay vào hẻm.",
        resultEn: "You point toward the Zwei lights. The children run that way; you wait until the post door opens before returning to the alley.",
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
    vi: "[Toán trấn áp] Ba Fixer mang phù hiệu Hana Section 2 chặn hai đầu hẻm. Họ kéo xích khóa qua cửa sổ tầng một rồi đọc số hồ sơ của bạn.",
    en: "[Suppression squad] Three Fixers wearing Hana Section 2 insignia block both ends of the alley. They run a restraint chain through the ground-floor window and read out your file number.",
    choices: [
      {
        labelVi: "Bẻ xích và đánh vào chỗ đội trưởng đứng",
        labelEn: "Break the chain and strike toward their leader",
        resultVi: "Xích bật khỏi cửa sổ. Đội trưởng ngã vào tường; hai Fixer còn lại kéo người ấy ra khỏi hẻm. Hana ghi thêm thương vong vào hồ sơ.",
        resultEn: "The chain tears free of the window. Their leader hits the wall; the other two Fixers drag them out. Hana adds the injuries to your file.",
        meritAdd: 32,
        effects: { health: -18, rep: +45, heat: +25, resonance: +25 }
      },
      {
        labelVi: "Đi qua ống thoát nước phía sau",
        labelEn: "Leave through the drain behind you",
        resultVi: "Bạn trườn qua đường ống và ra khỏi vòng vây. Sáng hôm sau, lệnh tìm kiếm của Hana vẫn dán ở đầu phố.",
        resultEn: "You crawl through the drain and beyond the cordon. By morning, Hana’s search order is still posted at the street entrance.",
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
    vi: "[Âm thanh trong tường] Bạn chạm vào bức tường cạnh chỗ trú. Mỗi lần gõ, nó đáp lại bằng một tiếng đàn cũ. Những người ở tầng trên bắt đầu dọn đồ.",
    en: "[Music in the wall] You touch the wall beside your shelter. Each knock answers with the note of an old piano. The tenants upstairs begin packing.",
    choices: [
      {
        labelVi: "Gõ tiếp để giữ người lạ ngoài hẻm",
        labelEn: "Keep the notes sounding to hold strangers back",
        resultVi: "Âm thanh dội qua các bức tường. Những người định vào hẻm lùi lại, rồi đường phố phía trước vắng dần. Bạn có thêm chỗ để nghỉ.",
        resultEn: "The notes carry through the walls. Those approaching the alley turn back, and the street beyond empties. You have room to rest.",
        meritAdd: 35,
        effects: { rep: +50, resonance: +35, health: +25, sanity: +20 }
      },
      {
        labelVi: "Ngừng gõ và kéo tay khỏi bức tường",
        labelEn: "Stop knocking and pull your hand from the wall",
        resultVi: "Tiếng đàn tắt. Phần vỏ trên cánh tay dày lên ở chỗ từng áp vào gạch; người tầng trên thôi dọn đồ.",
        resultEn: "The notes stop. The shell thickens where your arm touched the brick; the upstairs tenants stop packing.",
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
    vi: "[B Corp quan sát] Thiết bị giám sát trên cột điện quay về phía chỗ trú của bạn. Đèn quét dừng ở cửa hẻm. Nếu B Corp đã ghi hình, hồ sơ của bạn sẽ được chuyển lên The Head.",
    en: "[B Corp observes] The surveillance unit on the utility pole turns toward your shelter. Its beam stops at the alley entrance. If B Corp has a recording, your file will reach the Head.",
    choices: [
      {
        labelVi: "Đứng yên cho thiết bị ghi rõ mặt bạn",
        labelEn: "Stand still and let it record your face",
        resultVi: "Đèn quét đi qua rồi tắt. Không có lệnh nào đến trong ngày ấy. Bạn dời chỗ trú trước khi trời tối.",
        resultEn: "The beam passes over you and goes dark. No order arrives that day. You move your shelter before nightfall.",
        meritAdd: 35,
        effects: { rep: +60, sanity: +25, resonance: +30, heat: -20 }
      },
      {
        labelVi: "Phủ khói lên thiết bị rồi rời khỏi hẻm",
        labelEn: "Cover the device in smoke and leave the alley",
        resultVi: "Khói che ống kính vài giây. Bạn đi khỏi hẻm trước khi đèn quét lại, nhưng sáng hôm sau một thiết bị khác đã được lắp trên cột điện.",
        resultEn: "Smoke hides the lens for a few seconds. You leave before the beam returns, but another unit is fitted to the pole by morning.",
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
    vi: "[Lời Carmen] Khi bạn ngồi nghỉ, Carmen lại cất tiếng: \"Bạn còn đang cố giữ điều gì?\" Ngoài cửa, người ta kéo một chiếc xe qua chỗ tường nứt. Giọng nói chờ bạn trả lời.",
    en: "[Carmen's voice] As you rest, Carmen speaks again: “What are you still trying to hold on to?” Outside, someone drags a cart past the cracked wall. The voice waits for your answer.",
    choices: [
      {
        labelVi: "Trả lời Carmen và ngừng chống lại hình dạng này",
        labelEn: "Answer Carmen and stop fighting this shape",
        resultVi: "Bạn nói ra điều mình muốn. Cơn co giật dưới lớp vỏ dịu xuống; bạn đứng dậy mà không cần vịn tường.",
        resultEn: "You say what you want. The spasms beneath your shell ease, and you stand without leaning on the wall.",
        meritAdd: 40,
        effects: { sanity: +45, resonance: +40, health: +30, rep: +50 }
      },
      {
        labelVi: "Nhắc lại một chuyện cũ mà bạn còn nhớ",
        labelEn: "Recall one ordinary thing from before",
        resultVi: "Bạn nhớ đường về một căn phòng cũ. Căn phòng ấy có thể đã đổi chủ; dù vậy, bạn vẫn nhớ được lối đi.",
        resultEn: "You remember the way to an old room. It may have a new tenant now, but you still know the route.",
        meritAdd: 35,
        effects: { sanity: +35, resonance: +25, rep: +35 }
      }
    ]
  }
];
