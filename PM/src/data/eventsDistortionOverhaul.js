// ============================================================================
// DISTORTION PATH OVERHAUL: HIGH-STAKES GAMBLES & EMOTIONAL METAMORPHOSIS
// High-tension, consequential events for characters undergoing or living as Distortion.
// Decoupled from mundane human storytelling; rich in NPC bonds and risk-reward outcomes.
// ============================================================================

export const DISTORTION_OVERHAUL_EVENTS = [
  // 1. Communion gamble with Carmen in the White Field
  {
    id: 'distort_gamble_carmen_communion',
    age: [18, 80],
    major: true,
    weight: 20,
    requires: ['Distorted'],
    forbids: ['carmen_communion_overhaul_done'],
    vi: "[Tiếng Gọi Trong Đồng Hoa Trắng] Biển hoa trắng trải dài vô tận trong tâm trí bạn. Carmen bước ra từ hư vô, ngón tay lạnh buốt khẽ chạm vào gò má biến dị của bạn. \"Ngươi đã chịu đựng quá nhiều nhục nhã từ The City. Đừng kìm nén ngọn lửa trong lòng nữa. Ngươi có dám đánh cược toàn bộ sự tỉnh táo còn lại để bộc phát bản ngã hoàn mỹ không?\"",
    en: "[The Call in the White Field] An endless sea of white flowers stretches through your mind. Carmen emerges from nothingness, cold fingers brushing against your warped cheek. “You have endured far too much misery from The City. Stop holding the fire back. Do you dare wager what little sanity remains to unleash your perfect self?”",
    choices: [
      {
        labelVi: "Dốc toàn bộ tâm trí vào tiếng thì thầm của Carmen",
        labelEn: "Pour your entire mind into Carmen's whisper",
        outcomes: [
          {
            w: 54,
            resultVi: "Bạn hòa ý thức vào giai điệu đỏ thẫm. Cơn đau thể xác biến mất, nhường chỗ cho một cảm giác tự do tuyệt đối. Cơ thể biến dị của bạn kết tinh thành một cấu trúc hoàn chỉnh; tiếng gầm của bạn làm rung chuyển ba khu phố.",
            resultEn: "You fused your consciousness with the crimson melody. Physical agony dissolved into absolute liberation. Your distorted form crystallized into a perfected shell; your roar rattled three districts.",
            effects: { resonance: +35, rep: +45, sanity: -15 },
            flagsAdd: ['carmen_communion_overhaul_done', 'DịThểHoànMỹ', 'DistortionStar'],
            meritAdd: 32
          },
          {
            w: 46,
            resultVi: "Dòng lũ cảm xúc quá cuồng bạo làm nứt toác khung xương dị thể. Máu đen trào ra từ các khe hở trên da thịt; Carmen mỉm cười thương hại trước khi bóng dáng người tan biến.",
            resultEn: "The torrent of emotion proved too violent, fracturing your warped frame. Dark blood seeped from fissures across your flesh; Carmen gave a pitying smile before fading away.",
            effects: { health: -30, sanity: -25, heat: +35 },
            flagsAdd: ['carmen_communion_overhaul_done'],
            scarsAdd: ['Vết rạn linh hồn của Carmen']
          }
        ]
      },
      {
        labelVi: "Cắn chặt răng giữ lại mảnh nhân tính cuối cùng",
        labelEn: "Clench your teeth and hold onto the last shard of humanity",
        resultVi: "Bạn khước từ lời mời gọi ngọt ngào, dùng nỗi đau thể xác làm chiếc neo giữ tâm trí không rơi vào vực thẳm. Biển hoa trắng tan rã, để lại bạn thở dốc giữa con hẻm lạnh ngắt.",
        resultEn: "You rejected the sweet invitation, using physical agony as an anchor to keep your mind from falling into the abyss. The white field dissolved, leaving you gasping in the cold alley.",
        effects: { sanity: +18, resonance: +10, health: -8 },
        flagsAdd: ['carmen_communion_overhaul_done']
      }
    ]
  },

  // 2. Midnight predator gamble: Hunting Sweepers during 3:13 AM
  {
    id: 'distort_gamble_night_sweeper_raid',
    age: [18, 75],
    major: true,
    weight: 22,
    requires: ['Distorted'],
    vi: "[Săn Ngược Trong Đêm Quét Dọn] Còi báo động 3:13 AM rền vang khắp Backstreets. Lũ Sweeper trong trang phục bảo hộ tràn ra đường thu gom mọi sinh vật sống để nghiền thành nhiên liệu sinh học. Nhưng đêm nay, chúng không biết một thực thể biến dị đang phục kích trên mái tôn.",
    en: "[Hunting the Night Sweepers] The 3:13 AM siren rolls across the Backstreets. Sweepers in heavy suits pour into the streets to liquefy all living things for biofuel. But tonight, they do not realize a distorted entity is watching from the tin rooftops.",
    choices: [
      {
        labelVi: "Lao xuống phục kích toán Sweeper để cướp lõi nhiên liệu",
        labelEn: "Pounce from above to shatter the Sweepers and seize their fuel cores",
        outcomes: [
          {
            w: 58,
            resultVi: "Móng vuốt của bạn xé toang bộ đồ bảo hộ của năm tên Sweeper. Bạn nghiền nát bình chứa, hấp thụ toàn bộ dòng chất lỏng sinh học đậm đặc. Vết thương cũ khép lại, lớp vỏ ngoài của bạn rắn chắc như thép nguội.",
            resultEn: "Your claws tore through the suits of five Sweepers. You crushed their tanks, absorbing the dense biological fluids. Old scars sealed over; your outer carapace hardened like tempered steel.",
            effects: { health: +35, sanity: +12, rep: +30 },
            flagsAdd: ['KẻSănĐêm313'],
            meritAdd: 26
          },
          {
            w: 42,
            resultVi: "Toán Sweeper phản ứng nhanh hơn dự đoán. Móc câu của chúng cắm sâu vào vai bạn, kéo giật bạn xuống đường nhựa trước khi bạn kịp vùng vẫy tẩu thoát.",
            resultEn: "The Sweeper squad reacted faster than expected. Their hook-irons sank deep into your shoulder, dragging you down onto the asphalt before you could tear yourself free.",
            effects: { health: -28, sanity: -10, heat: +25 }
          }
        ]
      },
      {
        labelVi: "Ẩn mình trong ống khói quan sát kỹ thuật di chuyển của chúng",
        labelEn: "Conceal yourself in a chimney to study their movement patterns",
        resultVi: "Bạn kiềm chế cơn khát máu, ghi nhớ từng nhịp bước và hướng quét của bầy dọn dẹp. Đêm qua đi mà không để lại dấu vết.",
        resultEn: "You held back your hunger, mapping every step and sweep route of the pack. The night passed leaving no trace behind.",
        effects: { network: +14, rep: +10 }
      }
    ]
  },

  // 3. Ambush on Hana suppression cordon: High-risk apex clash
  {
    id: 'distort_gamble_ambush_hana_cordon',
    age: [20, 85],
    major: true,
    weight: 18,
    requires: ['Distorted', 'DistortionStage2'],
    forbids: ['distort_cordon_crushed'],
    vi: "[Phá Vỡ Vòng Vây Hana] Hiệp Hội Hana nâng cấp độ thảm họa của bạn lên Urban Nightmare. Hai đội Fixer mang súng chống dị thể Workshop và rào chắn điện trường phong tỏa toàn bộ lối ra của khu phố. Bạn nghe thấy tiếng nạp đạn của chúng ngoài đầu ngõ.",
    en: "[Breaking Hana's Cordon] Hana Association has escalated your disaster rating to Urban Nightmare. Two Fixer teams armed with anti-distortion Workshop weaponry and electric barriers seal every exit. You hear their weapons cycling outside.",
    choices: [
      {
        labelVi: "Mở rộng Lãnh địa biến cả khu phố thành cạm bẫy hủy diệt",
        labelEn: "Expand your Domain to turn the entire street into a lethal snare",
        outcomes: [
          {
            w: 55,
            resultVi: "Đá đường dựng đứng thành những mũi chông nhọn hoắt. Lưới điện trường của Hana bị xé nát trong tích tắc; cả hai đội Fixer bị nhấn chìm dưới sức mạnh dị thể. Hana buộc phải ghi tên bạn vào danh sách thảm họa Star of the City.",
            resultEn: "Paving stones rose into jagged spikes. Hana's electric net snapped in an instant; both strike teams were overwhelmed by your anomaly force. Hana was forced to enter your name into the Stars of the City register.",
            effects: { rep: +50, resonance: +30, heat: +45 },
            flagsAdd: ['distort_cordon_crushed', 'StarOfTheCityEntity'],
            meritAdd: 36
          },
          {
            w: 45,
            resultVi: "Đạn Workshop xuyên qua lớp vảy phòng ngự. Lưới điện kích hoạt làm tê liệt các dây thần kinh dị thể, thiêu cháy một mảng lớn cơ bắp trước khi bạn kịp trốn thoát qua đường cống ngầm.",
            resultEn: "Workshop rounds penetrated your defensive plates. The electric snare flared, paralyzing your anomalous nerves and scorching muscle tissue before you scrambled through the drainage pipes.",
            effects: { health: -34, sanity: -15 },
            scarsAdd: ['Vết bỏng điện trường Hana']
          }
        ]
      },
      {
        labelVi: "Phóng độc mù và rút sâu vào lòng đất",
        labelEn: "Discharge blinding mist and withdraw into the subterranean depths",
        resultVi: "Màn sương đen che phủ tầm nhìn của các ống ngắm nhiệt. Bạn lướt qua kẽ hở giữa hai tòa nhà, để lại vòng vây trống rỗng phía sau.",
        resultEn: "Black mist blinded their thermal scopes. You slipped between two cracked facades, leaving an empty perimeter behind.",
        effects: { heat: +15, rep: +15 }
      }
    ]
  },

  // 4. Dramatic NPC confrontation: protecting or abandoning partner
  {
    id: 'distort_npc_partner_confrontation',
    age: [19, 75],
    major: true,
    weight: 20,
    requires: ['Distorted'],
    need: { npc: 'partner' },
    forbids: ['distort_partner_confrontation_done'],
    vi: "[Người Đứng Ở Ngã Rẽ] {partner} đứng chặn ở góc hẻm, vũ khí hạ thấp, đôi mắt mở to nhìn vào thân xác dị dạng của bạn. \"Tôi đã tìm bạn suốt ba tháng qua. Đừng để tiếng nói đó cướp mất bạn.\" Phía sau {partner}, tiếng ủng sắt của toán thợ săn tiền thưởng đang tiến đến rất gần.",
    en: "[At the Crossroads] {partner} stands at the alley turn, weapon lowered, eyes wide as they take in your warped flesh. “I have looked for you for three months. Do not let that voice consume who you were.” Behind {partner}, the iron boots of bounty hunters draw near.",
    choices: [
      {
        labelVi: "Lao ra chắn đạn xé xác toán thợ săn để bảo vệ {partner}",
        labelEn: "Lunge forward to shield {partner} and tear through the hunters",
        outcomes: [
          {
            w: 60,
            resultVi: "Bạn chắn toàn bộ hỏa lực trước ngực, móng vuốt nghiền nát toán thợ săn trong chớp mắt. Bạn gầm lên xua {partner} chạy trốn. Giữa thân xác quái vật, ánh nhìn của {partner} trở thành chiếc neo giữ vững nhân tính của bạn.",
            resultEn: "You took the full volley into your chest, claws crushing the bounty hunters in seconds. You let out a warning roar pushing {partner} to flee. Through the monster's shell, {partner}'s gaze became your anchor of humanity.",
            effects: { health: -22, sanity: +25, rep: +35, resonance: +20 },
            flagsAdd: ['distort_partner_confrontation_done'],
            scarsAdd: ['Tấm khiên quái vật bảo vệ tri kỷ'],
            meritAdd: 30
          },
          {
            w: 40,
            resultVi: "Đạn pháo phá giáp đâm xuyên ngực bạn. Bạn ngã gục, chỉ kịp thấy {partner} thét gào trong tuyệt vọng trước khi dòng nước cống cuốn bạn trôi đi.",
            resultEn: "Armor-piercing shells tore through your chest. You collapsed, only catching {partner}'s desperate cry before the sewer current swept you under.",
            effects: { health: -40, sanity: -15, resonance: +25 },
            flagsAdd: ['distort_partner_confrontation_done']
          }
        ]
      },
      {
        labelVi: "Lặng lẽ quay lưng biến mất vào màn đêm",
        labelEn: "Silently turn away and vanish into the shadows",
        resultVi: "Bạn không muốn làm tổn thương {partner}, nhưng bạn hiểu con quái vật này không còn chỗ trong cuộc đời của người ấy nữa. Bạn lặn vào bóng tối, để lại một đóa hoa pha lê trên bờ tường.",
        resultEn: "You had no wish to harm {partner}, yet understood this monster had no place in their future. You faded into darkness, leaving a single crystal blossom upon the wall.",
        effects: { sanity: -10, resonance: +15 },
        flagsAdd: ['distort_partner_confrontation_done']
      }
    ]
  },

  // 5. Vendetta predation against personal rival
  {
    id: 'distort_npc_rival_predation',
    age: [20, 80],
    major: true,
    weight: 18,
    requires: ['Distorted'],
    need: { npc: 'rival' },
    forbids: ['distort_rival_predation_done'],
    vi: "[Kẻ Đi Săn Trở Thành Con Mồi] {rival}, kẻ từng dồn bạn vào chỗ chết năm xưa, đêm nay đang chỉ huy một đoàn xe Workshop săn lùng dấu vết của bạn. Tiếng cười ngạo mạn của hắn vang qua máy liên lạc, không hề biết bạn đang bám ngay dưới gầm xe chỉ huy.",
    en: "[The Hunter Becomes Prey] {rival}, who drove you toward ruin years ago, leads a Workshop convoy tonight hunting your trail. Their arrogant laugh echoes through the radio, unaware you are clinging beneath their command vehicle.",
    choices: [
      {
        labelVi: "Xé toang sàn xe lôi {rival} ra quyết đấu sinh tử",
        labelEn: "Tear through the vehicle floor to drag {rival} into a duel",
        outcomes: [
          {
            w: 58,
            resultVi: "Móng vuốt bạn xé toạc lớp hợp kim bọc thép. Bạn bẻ gãy thanh kiếm đắt tiền của {rival}, khắc sâu nỗi kinh hoàng tột cùng lên ánh mắt kẻ thù trước khi bồi một đòn đoạt mạng. Mối thù cũ chính thức được thanh toán.",
            resultEn: "Your claws ripped through the armored floor. You snapped {rival}'s prized blade, carving terror into their eyes before delivering the finishing blow. The ancient grudge was settled in blood.",
            effects: { health: -18, sanity: +25, rep: +40 },
            flagsAdd: ['distort_rival_predation_done', 'MốiThùĐượcRửa'],
            meritAdd: 32
          },
          {
            w: 42,
            resultVi: "{rival} đã chuẩn bị sẵn lựu đạn lân tinh tầm gần. Vụ nổ thiêu rụi một bên sườn bạn, buộc bạn phải nhảy khỏi xe đang lao dốc trong biển lửa.",
            resultEn: "{rival} had prepared point-blank phosphorus charges. The detonation scorched your flank, forcing you to leap from the burning vehicle as it skidded away.",
            effects: { health: -32, sanity: -12, heat: +25 },
            flagsAdd: ['distort_rival_predation_done']
          }
        ]
      },
      {
        labelVi: "Đánh sập cầu đường phá hủy toàn bộ đoàn xe hậu cần",
        labelEn: "Collapse the bridge struts to destroy their logistics convoy",
        resultVi: "Cột trụ cầu gãy gập dưới lực ép dị thể. Cả đoàn xe rơi xuống vực sâu, khiến chiến dịch săn lùng của {rival} phá sản hoàn toàn mà bạn không tốn một giọt máu.",
        resultEn: "Bridge pillars yielded under your anomalous pressure. The entire convoy crashed into the ravine, ruining {rival}'s expedition without costing you a drop of blood.",
        effects: { rep: +25, wealth: +20 },
        meritAdd: 20,
        flagsAdd: ['distort_rival_predation_done']
      }
    ]
  }
];
