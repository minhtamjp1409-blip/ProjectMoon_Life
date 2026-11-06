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
    vi: "[Đồng hoa trắng] Con hẻm trước mắt nhòe đi. Giữa đồng hoa trắng, Carmen hỏi: \"Bạn vẫn đang cố giấu điều gì?\" Tiếng xe ngoài đường kéo bạn trở lại trong chốc lát.",
    en: "[The white field] The alley blurs. In a field of white flowers, Carmen asks, “What are you still trying to hide?” A vehicle passing outside briefly draws you back.",
    choices: [
      {
        labelVi: "Nói ra điều bạn vẫn giấu",
        labelEn: "Say what you have been hiding",
        outcomes: [
          {
            w: 54,
            resultVi: "Bạn nói hết câu. Các khớp xương thôi giật, lớp vỏ quanh người khép lại. Ngoài hẻm, cửa sổ gần nhất rung lên.",
            resultEn: "You finish the sentence. Your joints stop jerking and the shell around you closes. The nearest window rattles.",
            effects: { resonance: +35, rep: +45, sanity: -15 },
            flagsAdd: ['carmen_communion_overhaul_done', 'DịThểHoànMỹ', 'DistortionStar'],
            meritAdd: 32
          },
          {
            w: 46,
            resultVi: "Bạn vừa mở miệng thì một vết nứt chạy dọc lớp vỏ trước ngực. Máu thấm qua áo; khi ngẩng lên, đồng hoa đã biến mất.",
            resultEn: "You begin to speak, and a crack runs down the shell over your chest. Blood seeps through your clothes. When you look up, the field is gone.",
            effects: { health: -30, sanity: -25, heat: +35 },
            flagsAdd: ['carmen_communion_overhaul_done'],
            scarsAdd: ['Vết rạn linh hồn của Carmen']
          }
        ]
      },
      {
        labelVi: "Không trả lời; tập trung vào tiếng xe ngoài hẻm",
        labelEn: "Say nothing and follow the sound of traffic",
        resultVi: "Tiếng xe rõ dần. Bạn đứng lại trong con hẻm, tay bấu vào tường cho tới khi nhịp thở chậm xuống.",
        resultEn: "The traffic grows louder. You remain in the alley, holding the wall until your breathing slows.",
        effects: { sanity: +18, resonance: +10, health: -8 },
        flagsAdd: ['carmen_communion_overhaul_done']
      }
    ]
  },

  // 2. Sweeper encounter during the night sweep
  {
    id: 'distort_gamble_night_sweeper_raid',
    age: [18, 75],
    major: true,
    weight: 22,
    requires: ['Distorted'],
    vi: "[Đêm Quét Dọn] Sau 3 giờ 10, tiếng bình chứa va nhau vọng lên từ con hẻm. Toán Sweeper đi dưới mái tôn chỗ bạn đang nấp. Một tên dừng lại, ngẩng đầu.",
    en: "[The Sweeping] After 3:10, tanks knock together in the alley below. A Sweeper squad passes beneath the tin roof where you are hiding. One of them stops and looks up.",
    choices: [
      {
        labelVi: "Đánh toán Sweeper, lấy bình chứa của chúng",
        labelEn: "Attack the Sweepers and take their tanks",
        outcomes: [
          {
            w: 58,
            resultVi: "Bạn kéo tên đi đầu khỏi hàng rồi đập vỡ bình chứa. Chất lỏng ngấm qua lớp vỏ; vết thương ở vai khép lại. Những tên còn lại kéo đồng đội lùi khỏi hẻm.",
            resultEn: "You pull the lead Sweeper out of line and break its tank. Fluid seeps through your shell; the wound in your shoulder closes. The others drag their companion out of the alley.",
            effects: { health: +35, sanity: +12, rep: +30 },
            flagsAdd: ['KẻSănĐêm313'],
            meritAdd: 26
          },
          {
            w: 42,
            resultVi: "Móc câu ghim vào vai ngay khi bạn nhảy xuống. Bạn giật đứt dây, bỏ lại một mảng vỏ trên mặt đường. Toán Sweeper quay theo dấu máu.",
            resultEn: "A hook catches your shoulder as you land. You tear the line free, leaving a piece of shell on the road. The Sweepers follow the blood.",
            effects: { health: -28, sanity: -10, heat: +25 }
          }
        ]
      },
      {
        labelVi: "Nằm yên, ghi nhớ lối tuần của chúng",
        labelEn: "Stay hidden and learn their patrol route",
        resultVi: "Bạn đếm số bình chứa và ghi nhớ lối chúng rẽ. Đến khi tiếng bước chân khuất hẳn, bạn mới rời mái tôn.",
        resultEn: "You count their tanks and note where they turn. You leave the roof only when their footsteps fade.",
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
    vi: "[Vòng vây của Hana] Hồ sơ Hana xếp bạn vào diện Urban Nightmare. Hai đội Fixer chặn các lối ra, đặt rào điện ở đầu ngõ. Một người gọi qua loa: \"Ra ngoài. Chúng tôi còn phải kiểm tra nhà dân.\"",
    en: "[Hana's cordon] Hana's file lists you as an Urban Nightmare. Two Fixer teams block the exits and set an electric barrier at the alley mouth. Someone calls through a speaker: \"Come out. We still need to check the houses.\"",
    choices: [
      {
        labelVi: "Mở rộng Lãnh địa qua hàng rào điện",
        labelEn: "Extend your Domain through the electric barrier",
        outcomes: [
          {
            w: 55,
            resultVi: "Mặt đường đội lên, đẩy đổ rào điện. Hai đội Fixer rút khỏi ngõ, bỏ lại bộ phát còn cháy. Sáng hôm sau, hồ sơ Hana ghi thêm tên bạn dưới mục Star of the City.",
            resultEn: "The road buckles and overturns the barrier. Both Fixer teams withdraw, leaving a burning generator behind. The next morning, Hana's file adds your name under Star of the City.",
            effects: { rep: +50, resonance: +30, heat: +45 },
            flagsAdd: ['distort_cordon_crushed', 'StarOfTheCityEntity'],
            meritAdd: 36
          },
          {
            w: 45,
            resultVi: "Đạn Workshop xuyên qua lớp vỏ. Điện giật khóa cứng chân bạn trong vài nhịp; bạn chui xuống cống, để lại vệt cháy trên miệng hầm.",
            resultEn: "Workshop rounds pierce your shell. The current locks your legs for a few seconds; you crawl into the drain, leaving a burn mark at its mouth.",
            effects: { health: -34, sanity: -15 },
            scarsAdd: ['Vết bỏng điện trường Hana']
          }
        ]
      },
      {
        labelVi: "Dùng màn sương che lối rút qua cống",
        labelEn: "Use the mist to cover your retreat through the drain",
        resultVi: "Đội Fixer chờ màn sương tan mới vào ngõ. Khi họ mở nắp cống, bạn đã sang dãy nhà bên kia.",
        resultEn: "The Fixers wait for the mist to clear before entering. By the time they lift the drain cover, you are across the next block.",
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
    vi: "[{partner} ở đầu hẻm] {partner} tìm thấy bạn ở góc hẻm, tay vẫn cầm vũ khí nhưng chưa rút. “Tôi đã tìm bạn ba tháng.” Phía sau người ấy, toán săn tiền thưởng đang đến gần.",
    en: "[{partner} at the alley] {partner} finds you at the alley corner, hand on a weapon they have not drawn. “I have been looking for you for three months.” Behind them, bounty hunters are closing in.",
    choices: [
      {
        labelVi: "Đứng chắn giữa {partner} và toán săn tiền thưởng",
        labelEn: "Stand between {partner} and the bounty hunters",
        outcomes: [
          {
            w: 60,
            resultVi: "Đạn ghim vào lớp vỏ trước ngực bạn. Bạn đẩy lùi toán săn, ra hiệu cho {partner} rời hẻm. Người ấy đi được vài bước rồi ngoái lại.",
            resultEn: "Rounds strike the shell over your chest. You drive the hunters back and signal {partner} to leave. They take a few steps, then look back.",
            effects: { health: -22, sanity: +25, rep: +35, resonance: +20 },
            flagsAdd: ['distort_partner_confrontation_done'],
            scarsAdd: ['Tấm khiên quái vật bảo vệ tri kỷ'],
            meritAdd: 30
          },
          {
            w: 40,
            resultVi: "Đạn xuyên qua lớp vỏ. Bạn ngã xuống gần miệng cống; {partner} kéo bạn khỏi tầm bắn nhưng phải bỏ lại vũ khí.",
            resultEn: "A round passes through your shell. You fall beside the drain; {partner} drags you out of the firing line and leaves their weapon behind.",
            effects: { health: -40, sanity: -15, resonance: +25 },
            flagsAdd: ['distort_partner_confrontation_done']
          }
        ]
      },
      {
        labelVi: "Rời hẻm trước khi toán săn thấy {partner}",
        labelEn: "Leave before the hunters see {partner}",
        resultVi: "Bạn đi qua lối sau. {partner} gọi thêm một lần nhưng không đuổi theo; toán săn chạy vụt qua góc phố.",
        resultEn: "You take the rear passage. {partner} calls once more but does not follow; the hunters run past the corner.",
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
    vi: "[Đoàn xe của {rival}] {rival} đi cùng đoàn xe Workshop đang tìm bạn. Qua máy liên lạc, người ấy đọc lại mô tả hình dạng bạn. Bạn bám dưới gầm chiếc xe đi đầu.",
    en: "[{rival}'s convoy] {rival} rides with a Workshop convoy looking for you. Over the radio, they repeat the description of your altered body. You cling beneath the lead vehicle.",
    choices: [
      {
        labelVi: "Phá sàn xe để chặn {rival}",
        labelEn: "Break through the floor and stop {rival}",
        outcomes: [
          {
            w: 58,
            resultVi: "Bạn bẻ gãy kiếm của {rival}. Khi xe dừng hẳn, người ấy không còn cử động. Bạn rời đi trước lúc những xe sau tới nơi.",
            resultEn: "You break {rival}'s sword. By the time the vehicle stops, they no longer move. You leave before the other vehicles arrive.",
            effects: { health: -18, sanity: +25, rep: +40 },
            flagsAdd: ['distort_rival_predation_done', 'MốiThùĐượcRửa'],
            meritAdd: 32
          },
          {
            w: 42,
            resultVi: "{rival} ném lựu đạn lân tinh xuống sàn xe. Bạn nhảy ra trước khi lửa tràn qua cửa, nhưng một bên sườn đã bỏng nặng.",
            resultEn: "{rival} drops a phosphorus charge through the floor. You jump clear before fire reaches the door, but one side of your body is badly burned.",
            effects: { health: -32, sanity: -12, heat: +25 },
            flagsAdd: ['distort_rival_predation_done']
          }
        ]
      },
      {
        labelVi: "Phá trụ cầu để cắt đường của đoàn xe",
        labelEn: "Break the bridge support to cut off the convoy",
        resultVi: "Trụ cầu gãy; đoàn xe phải dừng ở đầu bên kia. Bạn nhặt được thùng hàng rơi khỏi xe cuối rồi rút khỏi đường chính. {rival} mất dấu bạn.",
        resultEn: "The support breaks and the convoy stops on the far side. You take a crate that fell from the last vehicle and leave the main road. {rival} loses your trail.",
        effects: { rep: +25, wealth: +20 },
        meritAdd: 20,
        flagsAdd: ['distort_rival_predation_done']
      }
    ]
  }
];
