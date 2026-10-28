// ============================================================================
// MAJOR EVENTS: OFFICES AND ASSOCIATIONS, THE FINGERS, THE WINGS, AND HOME
// The "[Title]" opening each text heads the decision panel. People added here
// without a name get one at random, so no two lives marry the same person.
// ============================================================================

export const FACTION_EVENTS = [
  // ------------------------------------------------------------------ Fixers
  {
    id: 'fx_office_recruitment',
    age: [18, 35],
    major: true,
    weight: 9,
    jobs: ['Fixer'],
    forbids: ['HasAffiliation'],
    vi: "[Ba lời mời] Sau vài Request, ba nơi gửi giấy mời đến phòng trọ: Hook Office săn tiền thưởng trong hẻm; Shi Association nhận việc ám sát; Öufi Association xử tranh chấp hợp đồng. Mỗi giấy đều ghi ngày phải có mặt.",
    en: '[Three offers] A Fixer with no Office or Association behind them can be killed by anyone at no cost. This week, three places want you.',
    choices: [
      {
        labelVi: 'Hook Office: nhận việc săn tiền thưởng ở Backstreets',
        labelEn: 'Hook Office: bounty work in the Backstreets',
        resultVi: 'Người điều phối Hook Office ném xuống bàn chiếc móc câu bọc xích sắt còn vương vệt mỡ máy và máu khô: "Thù lao tính theo đầu lâu mang về. Cố mà sống sót cho đến khi thanh toán xong tiền mua vũ khí." Người cộng sự mới bước tới, vỗ mạnh vào vai bạn với nụ cười lạnh lùng.',
        resultEn: 'The operator tossed you an iron hook with something dried on it. “Paid by the head. Don’t die before your gear is paid off.” The Fixer assigned as your partner held out a hand.',
        setOrg: { type: 'office', name: 'Hook Office' },
        flagsAdd: ['HasAffiliation'],
        npcAdd: { role: 'partner', bond: 60 },
        effects: { network: +10, rep: +8, sanity: -6 },
        meritAdd: 8
      },
      {
        labelVi: 'Shi Association: làm sát thủ theo hợp đồng',
        labelEn: 'Shi Association: contract killing',
        resultVi: "Shi cho bạn tập liên tục trong những vết thương chưa kịp khép. Cuối buổi, người hướng dẫn khắc dấu của Association lên ngực bạn. Request đầu tiên đã nằm trên bàn.",
        resultEn: 'Shi teaches that you cut cleanest when you are about to die. They worked you 96 hours without sleep on unstitched wounds, so you would learn it in your body.',
        setOrg: { type: 'assoc', name: 'Shi Association' },
        flagsAdd: ['HasAffiliation', 'ShiOverdrive'],
        recordsAdd: ['assoc_joined'],
        effects: { health: -14, sanity: -8, rep: +14, wealth: +10 },
        scarsAdd: ['Dấu của Shi Association'],
        meritAdd: 18
      },
      {
        labelVi: 'Öufi Association: thi hành điều khoản hợp đồng',
        labelEn: 'Öufi Association: enforcing contracts',
        resultVi: 'Khoác lên mình chiếc áo choàng nặng nề của Öufi, bạn cầm cây kích chấp pháp bước vào những ngôi nhà nợ hợp đồng. Tiếng đọc bản án vang lên khô khốc trước mặt những gia đình đang quỳ gối van xin. Luật của The City không có điều khoản nào cho lòng trắc ẩn.',
        resultEn: 'When someone breaks a contract Öufi has notarized, you are the one who comes to their home with the halberd. Their family is usually there. The clauses say nothing about that.',
        setOrg: { type: 'assoc', name: 'Öufi Association' },
        flagsAdd: ['HasAffiliation'],
        recordsAdd: ['assoc_joined'],
        effects: { wealth: +12, network: +12, sanity: -6 },
        meritAdd: 14
      }
    ]
  },
  {
    id: 'fx_shi_boundary_of_death',
    age: [20, 48],
    major: true,
    weight: 8,
    jobs: ['Fixer'],
    requires: ['ShiOverdrive'],
    vi: "[Boundary of Death] Sau mười một đêm làm nhiệm vụ cho Shi, bạn gần như đứng không vững. Một Capo mặc giáp trợ lực đã hạ cả đội. Lưỡi đao của hắn chạm cổ bạn; tay cầm kiếm vẫn còn cử động.",
    en: '[Boundary of Death] Eleven nights straight working for Shi. Your lungs crackle with each breath. Tonight’s target is stronger than anything in your briefing, and his blade is already at your throat.',
    choices: [
      {
        labelVi: 'Bỏ phòng thủ, dồn tất cả vào một nhát',
        labelEn: 'Drop your guard and put everything into one cut',
        outcomes: [
          {
            w: 50,
            resultVi: "Bạn dồn sức vào một nhát Boundary of Death. Lưỡi kiếm xuyên qua giáp Capo; hắn đổ xuống. Bạn phải chống kiếm mới đứng được, máu nhỏ từ mũi thép xuống sàn.",
            resultEn: 'You don’t remember drawing. You only remember that afterward he lay in two pieces, and the room was so quiet you could hear the blood dripping on the floor.',
            effects: { health: -20, rep: +22, wealth: +18, resonance: +16 },
            scarsAdd: ['Nhát chém ở ranh giới'],
            meritAdd: 25
          },
          {
            w: 50,
            resultVi: 'Gân vai bạn đứt ngay giữa nhát chém. Hắn ghim bạn vào tường bằng chính lưỡi dao của hắn. Người của Shi đến kịp, nhưng chỉ vừa kịp.',
            resultEn: 'The tendon in your shoulder tore mid-swing. He pinned you to the wall with his own blade. Shi’s people arrived in time, but only just.',
            effects: { health: -32, sanity: -16, resonance: +18 },
            scarsAdd: ['Gân vai đứt']
          }
        ]
      },
      {
        labelVi: 'Tiêm thuốc cầm máu và rút lui',
        labelEn: 'Inject a coagulant and pull back',
        resultVi: 'Bạn còn sống. Hợp đồng thất bại, và Shi trừ toàn bộ tiền thưởng của bạn như thể đó là cái giá rẻ nhất có thể.',
        resultEn: 'You lived. The contract failed, and Shi docked your entire fee as if it were the cheapest price possible.',
        effects: { health: -8, wealth: -10, rep: -6 }
      }
    ]
  },

  // ------------------------------------------------------------------ the Fingers
  {
    id: 'syn_choose_finger_allegiance',
    age: [15, 45],
    major: true,
    weight: 95,
    jobs: ['Syndicate'],
    forbids: ['SwornFinger'],
    vi: "[Tối hậu thư từ Five Fingers] Tiếng tăm và những phi vụ máu me của bạn ở Backstreets đã lọt vào tai các tổ chức cấp cao. Người môi giới ngầm dẫn bạn đến điểm hẹn kín, nơi các nhánh trực thuộc của các Finger gửi tối hậu thư yêu cầu băng đảng của bạn chọn một ngọn cờ để quy phục hoặc bị nghiền nát.",
    en: "[Summons of the Five Fingers] Your notoriety and bloody work in the Backstreets have caught the attention of high syndicates. An underworld broker brings an ultimatum: your crew must swear allegiance to a Finger banner or be crushed as rogue vermin.",
    choices: [
      {
        labelVi: 'The Thumb: kỷ luật và tôn ti',
        labelEn: 'The Thumb: discipline and rank',
        resultVi: "Trong sảnh The Thumb, một tân binh lỡ nhìn thẳng Sottocapo liền quỳ xuống xin chịu phạt. Bạn nhận áo Soldato và khẩu súng. Từ giờ, mệnh lệnh của cấp trên đứng trước mọi lời giải thích.",
        resultEn: 'During initiation, a recruit looked a Capo in the eye by mistake. Unbidden, he drew a knife and cut out his own tongue. They handed you a Soldato’s rifle.',
        setFinger: 'Thumb',
        setFingerRank: 0,
        flagsAdd: ['SwornFinger'],
        recordsAdd: ['finger_initiate'],
        effects: { wealth: +18, rep: +12, sanity: -14 },
        meritAdd: 12
      },
      {
        labelVi: 'The Index: thực thi Prescript tuyệt đối',
        labelEn: 'The Index: absolute Prescript execution',
        resultVi: 'Sứ Giả của The Index với dải băng lụa trắng bịt mắt trao vào tay bạn cuộn chỉ vàng và thanh kiếm ngắn: "Không được nghi vấn Dòng Chảy. Chỉ Lệnh là ý chí của The City." Bạn chính thức trở thành một Giáo Đồ (Proselyte), sẵn sàng hành quyết bất cứ ai cản đường nhân quả.',
        resultEn: 'A white-robed messenger handed you a folded paper slip. “Never ask why. Simply obey what the Prescript decrees.” You strapped a short blade to your hip.',
        setFinger: 'Index',
        setFingerRank: 0,
        flagsAdd: ['SwornFinger'],
        recordsAdd: ['finger_initiate'],
        effects: { rep: +14, network: +12, sanity: -12 },
        meritAdd: 12
      },
      {
        labelVi: 'The Middle: anh em và báo thù',
        labelEn: 'The Middle: family and revenge',
        resultVi: 'Những người anh em của The Middle dùng kim nung khắc hình xích sắt chạy dọc cánh tay bạn. Họ ôm chặt lấy bạn giữa tiếng reo hò cuồng nhiệt: "Ai đụng đến một sợi tóc của người anh em này, cả gia tộc chúng sẽ phải trả giá bằng máu trong Book of Vengeance!"',
        resultEn: 'They tattooed your arm with a heated needle. From now on, anyone who touches one of your brothers goes into the Book of Vengeance, and you will be the one who collects.',
        setFinger: 'Middle',
        setFingerRank: 0,
        flagsAdd: ['SwornFinger'],
        recordsAdd: ['finger_initiate'],
        effects: { health: +10, rep: +14, heat: +20, sanity: -10 },
        meritAdd: 12
      },
      {
        labelVi: 'The Ring: nghệ thuật và giải phẫu',
        labelEn: 'The Ring: art and anatomy',
        resultVi: "Docent dẫn bạn qua phòng tranh làm từ da thịt người sống. Bạn nôn ở góc phòng. Họ đợi bạn lau miệng rồi trao thẻ học việc của The Ring.",
        resultEn: 'They gave you an apron and showed you this year’s Student works. You threw up in the corner. A Docent nodded: “Everyone does at first. Then it becomes beautiful.”',
        setFinger: 'Ring',
        setFingerRank: 0,
        flagsAdd: ['SwornFinger'],
        recordsAdd: ['finger_initiate'],
        effects: { sanity: -22, rep: +14, wealth: +16, resonance: +20 },
        scarsAdd: ['Con mắt của The Ring'],
        meritAdd: 14
      },
      {
        labelVi: 'The Pinky: hợp đồng ngầm và lời thề ngón út',
        labelEn: 'The Pinky: shadow pacts and pinky oaths',
        resultVi: "Người của The Pinky móc ngón út vào tay bạn. \"Đã hứa thì giữ.\" Bạn nhận thanh đoản kiếm. Không có giấy tờ nào ghi lại buổi kết nạp.",
        resultEn: 'In the deepest alley shadow, a velvet-gloved figure gripped your pinky finger. “In the Pinky, an oath is heavier than life. Break it, and you forfeit all.” A slender dagger was pressed into your grasp.',
        setFinger: 'Pinky',
        setFingerRank: 0,
        flagsAdd: ['SwornFinger'],
        recordsAdd: ['finger_initiate'],
        effects: { wealth: +16, heat: +10, sanity: -8 },
        meritAdd: 12
      },
      {
        labelVi: 'Từ chối mọi phe phái: Giữ băng nhóm độc lập, chấp nhận đối đầu các thế lực lớn',
        labelEn: 'Refuse all allegiance: Keep your crew independent and face pressure from all sides',
        resultVi: 'Bạn đập bàn từ chối ký vào bất kỳ bản giao kèo nào. Người môi giới lắc đầu lạnh ngắt: "Một con chó hoang từ chối vòng xích sẽ phải tự liếm máu của mình." Bạn giữ được tự do, nhưng từ nay các ngõ ngách trở nên nguy hiểm gấp bội.',
        resultEn: 'You slammed your fist on the table, refusing every pact. The broker gave a chilled shake of his head: “A stray dog refusing a collar must lick its own blood.” You kept your freedom, but every Backstreets corner just became twice as lethal.',
        flagsAdd: ['IndependentSyndicate'],
        effects: { rep: +16, heat: +24, sanity: -10, health: -6 },
        meritAdd: 6
      }
    ]
  },
  {
    id: 'syn_indie_territory_defense',
    age: [18, 65],
    major: true,
    weight: 18,
    jobs: ['Syndicate'],
    need: { flags: ['IndependentSyndicate'] },
    forbids: ['SwornFinger'],
    vi: "[Chiến tranh giữ đất] Một phân nhánh của Finger gửi côn đồ tới phong tỏa đầu ngõ, yêu cầu băng đảng tự do của bạn nộp ba phần mười tiền thu hàng tháng nếu không muốn bị san phẳng. Đàn em nhìn về phía bạn chờ lệnh.",
    en: "[Turf defense war] A Finger subordinate crew barricaded the alley entrance, demanding thirty percent of your monthly protection earnings or threatened total annihilation. Your crew looks to you for the call.",
    choices: [
      {
        labelVi: "Dẫn đầu đàn em cầm dao tử thủ ngõ ngách",
        labelEn: "Lead your crew to hold the alleys with cold steel",
        resultVi: "Một trận hỗn chiến nổ ra trong hẻm tối trước khi còi báo Sweeper vang lên. Băng của bạn đẩy lùi được đám tay sai, giữ vững thanh danh một tổ chức không chịu cúi đầu, dù vài người anh em phải khâu vết thương trong bóng tối.",
        resultEn: "A brutal clash broke out in the dark alleys before the Sweeper siren wailed. Your crew repelled the invaders, cementing your reputation as an unbroken independent outfit, though several comrades had to sew up wounds in the dark.",
        effects: { rep: +16, heat: +18, health: -12, sanity: -6 },
        meritAdd: 14
      },
      {
        labelVi: "Dùng Ahn và quan hệ ngầm đút lót người trung gian",
        labelEn: "Bribe underworld intermediaries with Ahn and favors",
        resultVi: "Bạn chi ra một món tiền lớn để người trung gian rỉ tai tên đội trưởng bên kia. Cuộc tấn công bị hoãn lại vô thời hạn, đổi lại ví tiền của băng hao hụt đáng kể.",
        resultEn: "You shelled out a hefty sum to have an intermediary whisper in the enemy captain's ear. The raid was postponed indefinitely, at the cost of your crew's coffers.",
        effects: { wealth: -16, heat: -10, sanity: -4 },
        meritAdd: 4
      }
    ]
  },
  {
    id: 'syn_indie_black_market_extortion',
    age: [18, 65],
    major: true,
    weight: 16,
    jobs: ['Syndicate'],
    need: { flags: ['IndependentSyndicate'] },
    forbids: ['SwornFinger'],
    vi: "[Bảo kê chợ đen độc lập] Không phải trích nộp phần trăm cho các Finger bề trên, toàn bộ tiền bảo kê từ các sòng bạc ngầm và tiệm thuốc chui trong khu vực đều chảy thẳng vào túi băng của bạn. Một chủ xưởng lén đề nghị trả thêm Ahn để bạn dẹp yên một nhóm Fixer tọc mạch.",
    en: "[Independent black market tribute] Free from paying tribute to the high Fingers, all protection fees from back-alley gambling dens and unlicensed clinics flow directly into your crew's lockbox. A workshop proprietor quietly offers extra Ahn to silence a snooping Fixer.",
    choices: [
      {
        labelVi: "Đe dọa nhóm Fixer, bảo vệ hoạt động làm ăn của tiệm xưởng",
        labelEn: "Intimidate the snooping Fixers and protect the clinic's trade",
        resultVi: "Bạn chặn đầu tay Fixer ngoài ngõ, cho hắn thấy số lượng áp đảo của băng đảng tự do. Hắn hiểu chuyện và rời đi. Chủ xưởng vui vẻ trao đủ số Ahn đã hứa kèm lời cảm kích.",
        resultEn: "You cornered the Fixer at the alley head, displaying your crew's sheer numbers. He took the hint and backed off. The clinic owner gratefully paid the promised Ahn with nods of respect.",
        effects: { wealth: +22, rep: +12, heat: +8, sanity: -4 },
        meritAdd: 10
      },
      {
        labelVi: "Giữ đúng giới hạn bảo kê, từ chối can thiệp vào công việc của Fixer",
        labelEn: "Keep to strict boundaries, refusing to tangle with Fixers",
        resultVi: "Bạn chỉ thu đúng mức phí an ninh thường kỳ và từ chối nhúng tay vào việc thanh trừng Fixer. Tránh được việc bị Hiệp hội chú ý, nhưng uy thế của băng có phần chững lại.",
        resultEn: "You collected only the standard security fee and declined to meddle in Fixer matters. You avoided Hana's radar, though your crew's street posture softened somewhat.",
        effects: { wealth: +10, rep: +4, sanity: +6, heat: -6 },
        meritAdd: 4
      }
    ]
  },
  {
    id: 'syn_thumb_tongue_etiquette',
    age: [20, 50],
    major: true,
    weight: 8.5,
    jobs: ['Syndicate'],
    need: { finger: 'Thumb', fingerRank: 0 },
    forbids: ['ThumbTraitor'],
    vi: "[Lễ nghi của The Thumb] Sottocapo ra lệnh đốt dãy trọ có người anh em kết nghĩa của bạn. Bạn vừa cau mày, Capo bên cạnh đặt dao lên bàn: \"Phản đối cấp trên là bất kính. Tự rạch mặt, hoặc cả tổ đội chịu thay.\"",
    en: '[The Thumb’s etiquette] At the turf meeting, a Sottocapo ordered a whole row of houses burned, your closest brother’s among them. You had barely opened your mouth when a Capo set a gilded knife on the table.\n“Were you about to question a Sottocapo? Do it yourself, or I shoot your whole crew.”',
    choices: [
      {
        labelVi: 'Cầm dao, tự rạch má mình, và cúi đầu đúng phép',
        labelEn: 'Take the knife, cut your own cheek, and bow exactly as required',
        resultVi: 'Bạn cúi đầu, dùng lưỡi dao rạch má. Sottocapo gật một lần rồi tiếp tục bàn chuyện đạn dược. Không ai nhắc đến dãy nhà đang cháy. Sáng hôm sau bạn vẫn là Soldato; người của ông ta chỉ ghi vào sổ rằng bạn biết giữ đúng chỗ đứng.',
        resultEn: 'You bowed and drew the blade across your cheek. The Sottocapo nodded once and resumed discussing ammunition. By morning you were still a Soldato; his people had merely written down that you knew your place.',
        effects: { health: -10, sanity: -9, rep: +7, resonance: +5 },
        scarsAdd: ['Vết rạch trên má'],
        meritAdd: 4,
        scheduleConsequences: [
          {
            eventId: 'csq_thumb_capo_trial',
            delayYears: 4,
            reasonVi: 'Lòng trung thành với The Thumb được Sottocapo ghi nhận',
            reasonEn: 'Your loyalty to the Thumb was noted by the Sottocapo'
          }
        ]
      },
      {
        labelVi: 'Chộp con dao trước Capo',
        labelEn: 'Grab the knife before the Capo does',
        resultVi: 'Bạn chộp dao. Capo kịp bóp cò trước khi bạn chạm tới cổ hắn. Bạn lao qua cửa sổ, mang theo vết đạn và lệnh truy sát của The Thumb. Dãy nhà vẫn cháy.',
        resultEn: 'You grabbed the knife. The Capo fired before you reached his throat. You escaped through the window with a bullet wound and a Thumb bounty. The houses still burned.',
        flagsAdd: ['ThumbTraitor'],
        setJob: 'Outcast',
        clearFinger: true,
        effects: { health: -42, sanity: -10, rep: -15, heat: +55 },
        meritAdd: 0,
        scheduleConsequences: [
          {
            eventId: 'csq_thumb_etiquette_hunt',
            delayYears: 3,
            reasonVi: 'Kẻ bị treo thưởng luôn bị săn lùng',
            reasonEn: 'Those with a bounty on their head are hunted'
          }
        ]
      }
    ]
  },
  {
    id: 'syn_thumb_etiquette_officer',
    age: [24, 70],
    major: true,
    weight: 7,
    need: { jobs: ['Syndicate'], finger: 'Thumb', fingerRankAtLeast: 1 },
    forbids: ['ThumbTraitor'],
    vi: '[Bản lệnh của cấp trên] Trong buổi kiểm sổ của The Thumb, một cấp trên ra lệnh dọn sạch dãy nhà mà người quen của bạn đang ở. Ở cấp bậc này, bạn được phép trình bày tổn thất đạn dược và nhân lực; bạn không được phép cãi lệnh vì thương người.',
    en: '[A superior’s order] During a Thumb ledger review, a superior ordered the row of houses where someone you knew lived cleared out. Your rank permitted an objection about ammunition and manpower, not one made out of pity.',
    choices: [
      { labelVi: 'Trình bày thiệt hại dự tính, xin đổi mục tiêu', labelEn: 'Present the projected cost and request a different target', resultVi: 'Cấp trên xem con số rồi hoãn lệnh một ngày để kiểm lại. Bạn tranh thủ báo cho dãy nhà sơ tán. Sổ sách không ghi phần đó.', resultEn: 'The superior checked your figures and delayed the order by a day. You warned the residents to leave. That part did not enter the ledger.', effects: { sanity: 3, rep: -3, network: 3 } },
      { labelVi: 'Thi hành lệnh đúng phạm vi đã giao', labelEn: 'Carry out the assigned order', resultVi: 'Bạn kiểm đủ người và đạn khi trở về. Cấp trên ký vào sổ, không hỏi điều gì nằm dưới lớp tro.', resultEn: 'You accounted for every operative and round on return. The superior signed the ledger without asking what lay beneath the ash.', effects: { sanity: -9, rep: 6, merit: 4 } },
      { labelVi: 'Công khai chống lệnh và bỏ đi', labelEn: 'Defy the order in public and leave', resultVi: 'Bạn đặt phù hiệu xuống bàn. Không ai ngăn ở cửa, nhưng tiếng mở khóa súng theo bạn suốt cầu thang.', resultEn: 'You left your insignia on the table. No one stopped you at the door, but the sound of firearms being readied followed you down the stairs.', effects: { health: -12, heat: 35, rep: -12 }, flagsAdd: ['ThumbTraitor'], setJob: 'Outcast', clearFinger: true, scheduleConsequences: [{ eventId: 'csq_thumb_etiquette_hunt', delayYears: 2, reasonVi: 'The Thumb tìm người chống lệnh', reasonEn: 'The Thumb hunts a defector' }] }
    ]
  },
  {
    id: 'syn_ring_maestro_gallery',
    age: [28, 62],
    major: true,
    weight: 8.5,
    jobs: ['Syndicate'],
    finger: 'Ring',
    need: { finger: 'Ring', fingerRank: 1 },
    forbids: ['promo_ring_maestro_done'],
    vi: "[Bài thi Maestro] The Ring đưa một Fixer còn sống vào phòng triển lãm, trói họ lên khung gỗ. Các Docent đứng quanh chấm điểm. Một người nhắc bạn: \"Dưới điểm B, nghệ sĩ sẽ thành vật liệu của tác phẩm kế tiếp.\"",
    en: '[The Ring’s grading] The Maestro examination has come. Your material is a living Fixer, fixed to a frame. The Docents wait with their scorecards.\nA work below a B and its artist becomes the material for tonight’s concert.',
    choices: [
      {
        labelVi: 'Làm tác phẩm mà họ muốn thấy',
        labelEn: 'Make the work they want to see',
        resultVi: "Bạn hoàn thành tác phẩm trên khung gỗ. Các Docent chấm điểm A và gọi bạn là Maestro. Khi khán phòng đã vắng, từ khung tranh vẫn còn tiếng thở.",
        resultEn: 'You worked for four hours. You tried not to hear the sounds from the frame. When you were done, the Docents stood and applauded. “A plus.” You are a Maestro. You did not sleep for a week.',
        setFinger: 'Ring',
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        recordsAdd: ['ring_maestro'],
        effects: { sanity: -14, rep: +28, wealth: +26, resonance: +16 },
        scarsAdd: ['Tác phẩm được điểm A cộng'],
        meritAdd: 24
      },
      {
        labelVi: 'Dùng da thịt của chính mình thay cho chất liệu',
        labelEn: 'Use your own flesh in place of the material',
        resultVi: 'Các Docent im lặng một lúc lâu. Rồi họ cho bạn qua, và cởi trói người Fixer trên khung, vì "tác phẩm đã đủ". Bạn mất phần da trên cả cánh tay trái.',
        resultEn: 'The Docents were silent a long while. Then they passed you, and untied the Fixer on the frame, because “the work is complete.” You lost the skin of your whole left forearm.',
        setFinger: 'Ring',
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        recordsAdd: ['ring_maestro'],
        effects: { health: -20, sanity: -10, rep: +22, wealth: +20, resonance: +12 },
        scarsAdd: ['Cánh tay không còn da'],
        meritAdd: 22
      },
      {
        labelVi: 'Bảo quản tác phẩm bằng phong cách điêu khắc ánh sáng trừu tượng',
        labelEn: 'Render an abstract light-prism installation, sparing the subject’s life',
        resultVi: 'Bằng cách sử dụng lăng kính thủy tinh màu và khúc xạ ánh sáng, bạn tạo nên một ảo ảnh giải phẫu sống động đánh lừa toàn bộ thị giác khán phòng mà không cần vấy máu đối phương. Hội đồng Docent khen ngợi tư duy nghệ thuật tân tiến của bạn.',
        resultEn: 'Using stained prisms and optical refraction, you projected a vivid anatomical illusion without shedding blood. The Docents commended your avant-garde ingenuity.',
        setFinger: 'Ring',
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        recordsAdd: ['ring_maestro'],
        effects: { sanity: +12, rep: +24, wealth: +22, resonance: +10 },
        meritAdd: 22
      }
    ]
  },
  {
    id: 'syn_kurokumo_blade_lineage_showdown',
    age: [20, 48],
    major: true,
    weight: 8.5,
    jobs: ['Fixer', 'Syndicate'],
    vi: '[To Claim Their Bones] Cuộc chiến giữa Kurokumo Clan và Blade Lineage đã lan đến con phố của bạn. Mưa rửa máu chảy xuống cống. Một kiếm sĩ của Blade Lineage chĩa thanh katana về phía bạn.\n"Cho ta thịt của ngươi. Ta lấy xương."',
    en: '[To Claim Their Bones] The war between the Kurokumo Clan and the Blade Lineage has reached your street. Rain washes the blood into the drains. A Blade Lineage swordsman points his katana at you.\n“Yield me your flesh. I will claim your bones.”',
    choices: [
      {
        labelVi: 'Để lưỡi kiếm của hắn cắm vào vai bạn, giữ chặt nó lại, rồi chém',
        labelEn: 'Let his blade bite into your shoulder, trap it there, and cut',
        outcomes: [
          {
            w: 65,
            resultVi: 'Lưỡi kiếm của hắn làm rách bả vai bạn. Lưỡi của bạn đi hết đường của nó. Hắn ngã xuống vũng nước, và bạn đứng đó, thở, cho đến khi mưa tạnh.',
            resultEn: 'His blade tore through your shoulder. Yours went all the way. He fell into the puddle, and you stood there breathing until the rain stopped.',
            effects: { health: -18, sanity: -8, rep: +28, wealth: +24, resonance: +18 },
            recordsAdd: ['claim_their_bones'],
            scarsAdd: ['Xương đòn đổi lấy xương hắn'],
            meritAdd: 32,
            scheduleConsequences: [
              {
                eventId: 'csq_blade_lineage_duel',
                delayYears: 5,
                reasonVi: 'Sasu của Blade Lineage tìm kẻ đã đoạt xương đệ tử mình',
                reasonEn: 'The Sasu of Blade Lineage seeks the one who claimed his disciple’s bones'
              }
            ]
          },
          {
            w: 35,
            resultVi: 'Hắn rút kiếm nhanh hơn bạn giữ. Nhát thứ hai để lại một vết chém dài trước ngực. Bạn giữ chặt vết thương và lăn vào con hẻm tối thoát thân.',
            resultEn: 'He pulled free faster than you could hold, grazing your chest before you rolled into the shadowed alley to safety.',
            effects: { health: -22, sanity: -12, resonance: +16 },
            scarsAdd: ['Vết chém mở ngực']
          }
        ]
      },
      {
        labelVi: 'Lợi dụng màn mưa tầm tã lùi lại, rút lui qua các ngóc ngách',
        labelEn: 'Use the torrential downpour to disengage and slip away',
        resultVi: 'Màn mưa xám che khuất tầm nhìn của kiếm sĩ. Bạn thoát khỏi chiến trường đẫm máu mà không mất một giọt máu.',
        resultEn: 'The grey curtain of rain swallowed your silhouette. You slipped clear of the charnel house unscathed.',
        effects: { sanity: -4, rep: +4 }
      }
    ]
  },

  // ------------------------------------------------------------------ the Wings
  {
    id: 'wing_warp_train_cleanup',
    age: [19, 50],
    major: true,
    weight: 9,
    vi: "[Toa cuối tàu WARP] W Corp giao bạn dọn một toa tàu trước khi hành khách được phục hồi. Cửa mở; ghế và trần dính đầy những cơ thể đã hòa vào nhau. Bảng phân chỗ vẫn sáng. Bạn phải đưa từng người về đúng ghế.",
    en: '[The last car of the WARP Train] The trip took ten seconds. For those in the last car it took two thousand years. When the doors opened, no one stood like a person anymore. Two hundred passengers had sewn themselves together into one mass on the ceiling, and they were still talking:\n“Don’t go. Stay with us.”',
    choices: [
      {
        labelVi: 'Làm việc của một Cleanup Agent: cắt họ ra, đặt lại vào ghế',
        labelEn: 'Do a Cleanup Agent’s job: cut them apart, put them back in their seats',
        resultVi: "Bạn đưa hành khách về đúng ghế trước khi máy phục hồi chạy. Họ xuống tàu, chỉnh lại áo như vừa ngủ một giấc ngắn. Bạn ở lại toa trống, uống thuốc an thần rồi mới cởi găng tay.",
        resultEn: 'It took four hours. When W Corp flipped the restoration switch, each passenger stood, straightened their coat, and stepped onto the platform as if nothing had happened. Only you remember.',
        effects: { sanity: -22, wealth: +18, rep: +14, resonance: +20 },
        recordsAdd: ['warp_cleanup'],
        scarsAdd: ['Hai nghìn năm trong toa cuối'],
        meritAdd: 24
      },
      {
        labelVi: 'Giữ lại một mẩu thịt còn sống để bán ra chợ đen',
        labelEn: 'Keep a piece that is still alive to sell on the black market',
        resultVi: 'Mẩu thịt trong lọ thủy tinh vẫn cử động, và người mua trả cho nó một món tiền hời. Nhưng đây là Taboo, và giờ thì có những con mắt đang tìm bạn.',
        resultEn: 'The piece in the glass jar still moved, and the buyer paid a handsome sum. But this is a Taboo, and now there are eyes looking for you.',
        effects: { wealth: +25, sanity: -18, taboo: +1, heat: +18, resonance: +18 },
        recordsAdd: ['warp_cleanup'],
        scarsAdd: ['Cái lọ thủy tinh'],
        scheduleConsequences: [
          {
            eventId: 'csq_warp_survivor_debt',
            delayYears: 3,
            reasonVi: 'Mẩu thịt của toa cuối bị W Corp và T Corp lần ra',
            reasonEn: 'The flesh from the last car was tracked by W Corp and T Corp'
          }
        ]
      }
    ]
  },
  {
    id: 'wing_rcorp_hatchery_royale',
    age: [20, 46],
    major: true,
    weight: 8.5,
    vi: '[The Hatchery] Để được vào Fourth Pack của R Corp, bạn bị nhốt trong Hatchery cùng 3.999 bản sao của chính bạn: cùng khuôn mặt, cùng giọng nói, cùng ký ức. Bảy ngày, không có thức ăn. Chỉ một người được ra.',
    en: '[The Hatchery] To join R Corp’s Fourth Pack, you were locked in the Hatchery with 3,999 copies of yourself: the same face, the same voice, the same memories. Seven days, no food. Only one walks out.',
    choices: [
      {
        labelVi: 'Sống sót, bằng mọi cách',
        labelEn: 'Survive, whatever it takes',
        outcomes: [
          {
            w: 58,
            resultVi: 'Đến ngày thứ bảy, bạn bước ra trên những khuôn mặt của chính mình. R Corp trao cho bạn bộ giáp của Fourth Pack. Từ đó, mỗi lần soi gương, bạn đều tự hỏi mình là bản sao thứ mấy.',
            resultEn: 'On the seventh day you walked out over your own faces. R Corp gave you Fourth Pack armor. Since then, every time you look in a mirror you wonder which copy you are.',
            effects: { health: +10, sanity: -25, rep: +22, wealth: +18, resonance: +24 },
            recordsAdd: ['rcorp_hatchery'],
            scarsAdd: ['3.999 khuôn mặt của bạn'],
            meritAdd: 30
          },
          {
            w: 42,
            resultVi: 'Bản sao cuối cùng đánh như bạn, nghĩ như bạn, và gần như thắng. Nó lấy đi một bên tai và đâm thủng phổi bạn. Bạn bò ra ngoài, không chắc người bò ra có phải là bạn không.',
            resultEn: 'The last copy fought like you, thought like you, and nearly won. It took one of your ears and punctured your lung. You crawled out, not sure the one crawling was you.',
            effects: { health: -30, sanity: -26, rep: +14, resonance: +25 },
            recordsAdd: ['rcorp_hatchery'],
            scarsAdd: ['Bản sao cuối cùng'],
            meritAdd: 24
          }
        ]
      }
    ]
  },
  {
    id: 'wing_kcorp_tearful_thing',
    age: [20, 52],
    major: true,
    weight: 8,
    vi: "[Thứ biết khóc của K Corp] Trong cơ sở K Corp, bạn thấy con mắt bị xích phải xem người ta chịu đau để lấy nước mắt làm HP Ampoule. Đồng nghiệp giơ máy ghi hình; lính gác bắn anh ta bằng Decay Ampoule. Máy vẫn đang ghi.",
    en: '[K Corp’s weeping thing] Deep inside a K Corp facility, you saw what HP Ampoules are made from: a giant chained eye, made to watch people suffer on screens so it will cry. Its tears heal anything.\nThe colleague with you raised a recorder. A guard shot him with a Decay Ampoule.',
    choices: [
      {
        labelVi: 'Đứng yên, im lặng, và nhận phần thưởng giữ bí mật',
        labelEn: 'Stand still, stay silent, and accept the reward for keeping quiet',
        resultVi: 'Ba giây sau, đồng nghiệp của bạn chỉ còn là một vũng xanh trên sàn. Bạn bước qua vũng đó để nhận chức trưởng ca an ninh, kèm một hộp HP Ampoule loại thật.',
        resultEn: 'Three seconds later your colleague was a green puddle on the floor. You stepped over it to accept a post as security shift lead, with a box of the real HP Ampoules.',
        flagsAdd: ['KCorpAmpoule'],
        recordsAdd: ['kcorp_tearful'],
        effects: { health: +25, wealth: +28, sanity: -26, resonance: +22 },
        scarsAdd: ['Vũng xanh trên sàn'],
        meritAdd: 22,
        scheduleConsequences: [
          {
            eventId: 'csq_kcorp_ampule_blackmail',
            delayYears: 4,
            reasonVi: 'Kẻ môi giới phát hiện bí mật về người đồng nghiệp',
            reasonEn: 'A broker discovered the secret of your melted colleague'
          }
        ]
      },
      {
        labelVi: 'Tiêm năm ống ampoule một lúc và phá đường thoát ra',
        labelEn: 'Inject five ampoules at once and break your way out',
        resultVi: 'Cơ thể bạn lành lại nhanh hơn đạn bắn vào nó, và tiếp tục mọc thêm sau khi không còn vết thương nào để lành. Bạn thoát ra. Những khối u trên lưng bạn thì ở lại mãi.',
        resultEn: 'Your body healed faster than bullets could hit it, and kept growing after there was nothing left to heal. You got out. The growths on your back stayed.',
        flagsAdd: ['KCorpAmpoule'],
        recordsAdd: ['kcorp_tearful'],
        effects: { health: -20, sanity: -15, rep: +24, heat: +20, resonance: +16 },
        scarsAdd: ['Những khối u của K Corp'],
        meritAdd: 25
      }
    ]
  },
  {
    id: 'wing_ncorp_inquisition',
    age: [20, 50],
    major: true,
    weight: 8,
    vi: '[Nagel und Hammer] Đoàn Inquisitor của N Corp đi qua khu phố của bạn, hát thánh ca. Họ trói những người có chân tay giả vào cọc, kể cả một đứa trẻ mồ côi mang mắt nhân tạo, và đóng đinh vào họ để "trả lại sự thuần khiết cho thịt người".',
    en: '[Nagel und Hammer] N Corp’s Inquisitors marched through your neighborhood singing hymns. They bound anyone with prosthetics to stakes, an orphan with an artificial eye among them, and drove nails into them to “return purity to human flesh.”',
    choices: [
      {
        labelVi: 'Lao vào, nhắm vào Großhammer dẫn đầu',
        labelEn: 'Charge in and go for the Großhammer leading them',
        resultVi: 'Chiếc búa của hắn sượt qua sườn bạn và bạn ho ra máu. Nhưng lưỡi của bạn tìm được khe hở trên mũ giáp. Khi hắn ngã, những Inquisitor còn lại rút lui, và bạn cắt dây cho đứa trẻ.',
        resultEn: 'His hammer grazed your ribs and you coughed blood. But your blade found the gap in his helm. When he fell the rest of the Inquisitors withdrew, and you cut the child loose.',
        effects: { health: -32, sanity: +8, rep: +26, network: +18, resonance: +18 },
        scarsAdd: ['Vết búa của Nagel und Hammer'],
        meritAdd: 26,
        scheduleConsequences: [
          {
            eventId: 'csq_ncorp_heretic_hunt',
            delayYears: 5,
            reasonVi: 'Đứa trẻ mang mắt nhân tạo ngày nào nay tìm về bạn',
            reasonEn: 'The orphan with the prosthetic eye seeks you out'
          }
        ]
      },
      {
        labelVi: 'Mặc giáp trắng, cầm búa, và nhận tiền thưởng của N Corp',
        labelEn: 'Put on the white armor, take a hammer, and collect N Corp’s bounty',
        resultVi: 'N Corp trả theo đầu người. Đến cuối ngày, bộ giáp trắng của bạn không còn trắng nữa, và túi bạn nặng hơn bao giờ hết.',
        resultEn: 'N Corp pays by the head. By the end of the day your white armor was no longer white, and your purse was heavier than ever.',
        effects: { wealth: +34, sanity: -14, rep: +14, heat: +15, resonance: +14 },
        scarsAdd: ['Bộ giáp không còn trắng'],
        meritAdd: 20
      }
    ]
  },

  // ------------------------------------------------------------------ home
  {
    id: 'life_marriage_bond',
    age: [21, 42],
    major: true,
    weight: 8,
    forbids: ['Married'],
    vi: '[Một mái nhà cho hai người] Có một người khiến bàn tay bạn thôi run sau mỗi đêm làm việc. Hai người tính chuyện ở chung, dù cả hai đều biết ở The City, người mình thương là thứ đầu tiên kẻ thù sẽ nhắm tới.',
    en: '[A roof for two] There is someone who makes your hands stop shaking after a night’s work. The two of you talk of living together, though you both know that in the City, the one you love is the first thing your enemies will aim for.',
    choices: [
      {
        labelVi: 'Cưới',
        labelEn: 'Marry',
        resultVi: 'Không có tiệc. Chỉ có hai chiếc nhẫn rẻ tiền và một bữa tối ở quán mì quen. Đêm đó còi báo động vang ở xa, và lần đầu tiên bạn không để ý đến nó.',
        resultEn: 'No party. Just two cheap rings and dinner at the usual noodle shop. Sirens sounded far off that night, and for the first time you didn’t notice.',
        flagsAdd: ['Married'],
        recordsAdd: ['family_built'],
        npcAdd: { role: 'spouse', bond: 45 },
        effects: { sanity: +20, wealth: -10, network: +10 }
      },
      {
        labelVi: 'Rời đi trước khi quá muộn',
        labelEn: 'Leave before it is too late',
        resultVi: 'Bạn nói những lời tàn nhẫn nhất có thể, để người ấy không tìm bạn nữa. Có hiệu quả. Không ai có thể dùng người thân để uy hiếp bạn, vì bạn không còn ai.',
        resultEn: 'You said the cruelest things you could, so they would stop looking for you. It worked. No one can threaten you through someone you love, because there is no one.',
        effects: { sanity: -12, rep: +8, resonance: +12 },
        scarsAdd: ['Người bạn đã bỏ lại']
      }
    ]
  },
  {
    id: 'life_childbirth_heir',
    age: [23, 48],
    major: true,
    weight: 10,
    requires: ['Married'],
    forbids: ['HasChild'],
    vi: '[Đêm đứa trẻ chào đời] Đêm {spouse} sinh con, trời mưa to. Đứa bé vừa cất tiếng khóc thì cửa dưới nhà bị phá. Những kẻ bạn từng đắc tội đã chờ đúng đêm bạn yếu nhất.',
    en: '[The night of the birth] The night {spouse} gave birth, it rained hard. The baby had just cried for the first time when the door downstairs was broken in. The people you had wronged had waited for the night you were weakest.',
    choices: [
      {
        labelVi: 'Đứng chặn ở cửa phòng',
        labelEn: 'Stand in the doorway',
        resultVi: 'Không ai bước qua được cánh cửa. Khi xong, bạn bế con bằng đôi tay còn chưa kịp rửa. Đứa bé ngừng khóc khi nghe tiếng tim bạn.',
        resultEn: 'No one got past the door. When it was over you held your child in hands you hadn’t had time to wash. The baby stopped crying at the sound of your heartbeat.',
        flagsAdd: ['HasChild'],
        npcAdd: { role: 'child', bond: 50 },
        effects: { health: -34, sanity: +14, wealth: -12, resonance: +20 },
        scarsAdd: ['Đêm đứng chặn ở cửa'],
        meritAdd: 20
      }
    ]
  },
  {
    id: 'life_black_silence_tragedy',
    age: [25, 55],
    major: true,
    weight: 7.5,
    requires: ['Married'],
    forbids: ['WidowedRampage'],
    vi: "[Ngôi nhà im lặng] Bạn về sau một hợp đồng dài ngày, mang bánh ngọt và món quà cho {spouse}. Cửa bị phá. {spouse} nằm trên sàn bếp giữa đồ đạc vỡ; đôi mắt hướng về lối vào. Bọc bánh còn ấm trong tay bạn.",
    en: '[The silent house] You came home from a long job. The door was open. Inside, everything had been torn apart, and {spouse} lay on the kitchen floor, eyes still open, facing the door, as if waiting for you.',
    choices: [
      {
        labelVi: 'Tìm ra từng kẻ có liên quan: Cơn Cuồng Nộ The Black Silence',
        labelEn: 'Find every one of them: The Black Silence Rampage',
        resultVi: "Bạn đeo mặt nạ và găng tay triệt âm, rồi truy từng kẻ có liên quan. Ba tháng sau, mười bốn tổ chức chỉ còn đống hồ sơ đổ nát. Người ta gọi bóng người ấy là The Black Silence. Bạn vẫn giữ món quà chưa kịp trao.",
        resultEn: 'Three months. You did not say a word to anyone. Fourteen organizations, from the Backstreets to the Nest gates, ceased to exist. People started calling you by another name, and somewhere very close, you heard a piano.',
        flagsAdd: ['WidowedRampage', 'Widowed'],
        flagsRemove: ['Married'],
        npcFate: { spouse: 'dead' },
        effects: { health: -30, sanity: -30, rep: +38, heat: +35, resonance: +30 },
        scarsAdd: ['Sàn bếp đêm ấy'],
        meritAdd: 42
      },
      {
        labelVi: 'Ôm lấy thi thể {spouse}, nén nỗi đau vào lòng và chôn cất trong tĩnh lặng',
        labelEn: 'Cradle {spouse}’s body, bury them in quiet dignity and endure the grief',
        resultVi: "Bạn khép mắt {spouse}, đưa người ấy ra ngọn đồi vắng và dựng một tấm bia. Sau lễ chôn cất, bạn trở về căn nhà đã bị phá cửa. Bọc bánh vẫn nằm trên bàn.",
        resultEn: 'You knelt beside {spouse}’s resting form, gently closing their eyes. Instead of a blind rampage, you carried them to a quiet hilltop beyond the alley din, placing a simple gravestone. The sorrow remains an eternal scar, fueling your quiet will to survive.',
        flagsAdd: ['Widowed'],
        flagsRemove: ['Married'],
        npcFate: { spouse: 'dead' },
        effects: { health: -10, sanity: -14, rep: +12, wealth: -12, resonance: +10 },
        scarsAdd: ['Nấm mồ lặng lẽ của {spouse}'],
        meritAdd: 20
      }
    ]
  },
  {
    id: 'life_prosthetic_replacement',
    age: [22, 60],
    major: true,
    weight: 7,
    forbids: ['FullBodyProsthetic'],
    vi: '[Một cơ thể mới] Sau từng ấy năm, cơ thể bạn không còn chịu nổi nữa. Bác sĩ ở phòng khám chợ đen nói thẳng: muốn sống tiếp, phải thay gần như toàn bộ. Bộ não của bạn sẽ được đặt vào một khung Full-Body Prosthetic.',
    en: '[A new body] After all these years your body cannot take any more. The back-alley doctor is blunt: to keep living, almost all of it must be replaced. Your brain would go into a Full-Body Prosthetic frame.',
    choices: [
      {
        labelVi: 'Nằm lên bàn mổ',
        labelEn: 'Lie down on the table',
        resultVi: 'Ca mổ kéo dài sáu tiếng. Khi tỉnh dậy, bạn mạnh hơn bao giờ hết, và không còn cảm nhận được hơi ấm của bàn tay mình hay vị của thức ăn.',
        resultEn: 'The operation took six hours. When you woke you were stronger than ever, and could no longer feel the warmth of your own hands or taste food.',
        flagsAdd: ['FullBodyProsthetic', '고급장비'],
        effects: { health: +35, sanity: -26, wealth: -25, rep: +14, resonance: +22 },
        scarsAdd: ['Cơ thể không còn là của mình'],
        meritAdd: 18
      },
      {
        labelVi: 'Giữ lại cơ thể này, dù phải sống bằng thuốc giảm đau',
        labelEn: 'Keep this body, even if you live on painkillers',
        resultVi: 'Mỗi hơi thở đều đau. Nhưng khi bạn cắt vào tay mình, máu chảy ra vẫn đỏ, vẫn ấm.',
        resultEn: 'Every breath hurts. But when you cut your hand, the blood that comes out is still red, still warm.',
        effects: { health: -12, sanity: +6, wealth: -12 }
      }
    ]
  },

  // ============================================================================
  // SYSTEMATIC PROMOTION LADDERS (THE FIVE FINGERS)
  // ============================================================================

  // ------------------------------------------------------------------ The Thumb: Soldato -> Capo (Branch 1: Firing Squad)
  {
    id: 'syn_thumb_promo_capo',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Thumb', fingerRank: 0 },
    forbids: ['promo_thumb_capo_done'],
    vi: "[Bài thử Capo] Sottocapo giao bạn chỉ huy một đội Soldato lấy lại xe đạn bị Rat cướp. \"Capo chịu trách nhiệm cả đạn lẫn người,\" ông nói. Trên bàn là sơ đồ tuyến đường và danh sách đội viên.",
    en: '[Capo Promotion Trial · The Thumb] Dense cigar smoke hangs in the mahogany bunker. The Sottocapo slams the ammunition ledger: "A common Soldato merely pulls the trigger on command. A Capo must calculate every single bullet, weigh each drop of blood, and command the rank-and-file with unwavering etiquette." A gang of Backstreet rats hijacked a Thumb ammunition convoy; you are commissioned to lead the firing squad.',
    choices: [
      {
        labelVi: 'Chỉ huy hàng súng hỏa mai bắn đồng loạt theo nhịp đếm lễ nghi',
        labelEn: 'Command synchronized volley-fire according to metronomed etiquette',
        resultVi: 'Tiếng nổ rền vang như sấm sét. Đội Soldato dưới sự chỉ huy gãy gọn của bạn xả đạn nhịp nhàng như một cỗ máy hoàn hảo, tiêu diệt toàn bộ quân địch mà không lãng phí một viên đạn thừa. Sottocapo gật đầu tán thưởng, trao chiếc áo choàng viền lông và bổ nhiệm bạn làm Capo.',
        resultEn: 'The discharge rumbled like rolling thunder. Under your precise rhythm, the firing squad operated with the mechanical grace of a clockwork executioner, annihilating the raiders without a single wasted round. The Sottocapo pinned the bronze epaulets to your chest: You are now a Thumb Capo.',
        setFingerRank: 1,
        flagsAdd: ['promo_thumb_capo_done'],
        meritAdd: 20,
        effects: { rep: +18, wealth: +22, sanity: -6 }
      },
      {
        labelVi: 'Nhận thay 10 roi trừng phạt vì một cấp dưới lỡ lời, giữ uy tín thủ lĩnh',
        labelEn: 'Take ten lashes on behalf of a stammering subordinate to forge iron loyalty',
        resultVi: 'Lưng bạn rách toạc dưới roi gai bọc da thép, nhưng bạn không rên lên một tiếng. Tinh thần thép và sự bao bọc nghiêm khắc của bạn khiến toàn bộ Soldato nguyện dâng trọn tính mạng. Vị Sottocapo tuyên bố: "Biết chịu đựng vì cấp dưới mới xứng đáng làm Capo."',
        resultEn: 'Your back opened beneath the steel-tipped flogger, yet you uttered not a single whisper of pain. Your iron composure and stern protection forged unbreakable devotion among the recruits. The Sottocapo declared: "One who bleeds for their subordinates is worthy of the Capo mantle."',
        setFingerRank: 1,
        flagsAdd: ['promo_thumb_capo_done'],
        meritAdd: 22,
        effects: { health: -14, rep: +24, network: +15, sanity: +6 }
      },
      {
        labelVi: 'Tạm hoãn sát hạch, củng cố đội hình và quân nhu trước',
        labelEn: 'Request deferral to drill the squad and restock ammunition',
        resultVi: 'Bạn báo cáo xin hoãn kỳ khảo hạch để huấn luyện lại đội ngũ và tích lũy thêm đạn dược. Sottocapo hài lòng trước sự cẩn trọng thực tế của bạn.',
        resultEn: 'You requested a deferral to re-drill your squad and amass extra firepower. The Sottocapo respected your calculated prudence.',
        effects: { health: +16, sanity: +12, wealth: +8, rep: +5 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Thumb: Soldato -> Capo (Branch 2: Armored Convoy)
  {
    id: 'syn_thumb_promo_capo_convoy',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Thumb', fingerRank: 0 },
    forbids: ['promo_thumb_capo_done'],
    vi: "[Giữ đoàn xe] Băng đảng Backstreets chặn xe chở đạn của The Thumb ở District 8. Sottocapo ra lệnh giữ bằng được thùng cuối cùng. Ai đưa đoàn xe thoát khỏi hẻm sẽ nhận phù hiệu Capo.",
    en: '[Armored Munitions Convoy · Thumb Capo Crucible] An armored convoy hauling thirty tons of high-pressure Thumb artillery munitions is besieged by desperate alley gangs in District 8. The Sottocapo’s wire reads: "Defend the payload. Enforce etiquette through absolute suppression. Whoever brings the last shell intact wears the Capo crest."',
    choices: [
      {
        labelVi: 'Thiết lập trận địa súng máy cao áp, dội bão lửa đúng theo nhịp trống lễ nghi',
        labelEn: 'Deploy high-pressure machine gun batteries, delivering synchronized suppression fire',
        resultVi: 'Từng tràng đạn xé toạc màn sương Backstreets. Bạn chỉ huy các Soldato nạp đạn và khai hỏa với sự chuẩn xác lạnh lùng của một chiếc đồng hồ quả lắc. Kẻ địch tan tác hoàn toàn. Vị Sottocapo trao huy hiệu Capo và giao cho bạn quyền cai quản tuyến quân nhu huyết mạch.',
        resultEn: 'Disciplined volleys tore the alley mist to shreds. Your firing line operated with clockwork ferocity, shattering the raiders. The Sottocapo pinned the Capo insignia to your chest, entrusting you with the vital supply route.',
        setFingerRank: 1,
        flagsAdd: ['promo_thumb_capo_done'],
        meritAdd: 24,
        effects: { rep: +22, wealth: +28, sanity: -6, health: -14 }
      },
      {
        labelVi: 'Đích thân cầm đại kiếm gắn lưỡi lê đâm thủng xe chỉ huy đối phương',
        labelEn: 'Spearhead the melee counter-charge with a bayoneted greatsword into the enemy flagship',
        resultVi: 'Bạn xông thẳng vào làn đạn, lưỡi lê bén ngọt chặt đứt chỉ huy đối phương ngay trên nóc xe bọc thép. Toàn bộ đám tàn quân quỳ rạp xin tha mạng. Lòng dũng cảm và phong thái thép của bạn được toàn bộ The Thumb ca tụng.',
        resultEn: 'You surged through the lead storm, your bayonet cleaving the enemy commander atop their rig. The remnants surrendered immediately. Your unflinching courage was hailed across the entire Thumb syndicate.',
        setFingerRank: 1,
        flagsAdd: ['promo_thumb_capo_done'],
        meritAdd: 25,
        effects: { health: -18, rep: +26, wealth: +32, sanity: +5 }
      },
      {
        labelVi: 'Tạm hoãn sát hạch, củng cố đội hình và quân nhu trước',
        labelEn: 'Request deferral to drill the squad and restock ammunition',
        resultVi: 'Bạn báo cáo xin hoãn kỳ khảo hạch để huấn luyện lại đội ngũ và tích lũy thêm đạn dược. Sottocapo hài lòng trước sự cẩn trọng thực tế của bạn.',
        resultEn: 'You requested a deferral to re-drill your squad and amass extra firepower. The Sottocapo respected your calculated prudence.',
        effects: { health: +16, sanity: +12, wealth: +8, rep: +5 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Thumb: Capo -> Sottocapo (Branch 1: Duel of Etiquette)
  {
    id: 'syn_thumb_promo_sottocapo',
    age: [21, 65],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Thumb', fingerRank: 1 },
    forbids: ['promo_thumb_sottocapo_done'],
    vi: "[Ghế Sottocapo] Một Capo ăn bớt đạn cống nạp rồi cãi lệnh trưởng bối. The Thumb cho bạn đấu lưỡi lê với hắn trước bàn tiệc của Underboss. Người sống sẽ ngồi vào ghế Sottocapo.",
    en: '[Sottocapo Prove-Out · The Marble Banquet] Before you stretches the alabaster banquet table of the Underboss. A veteran Capo committed an unforgivable taboo: skimming tribute ammunition and barking disrespect at superiors. By immutable Thumb code, a formal bayonet duel will determine who lives to occupy the Sottocapo seat.',
    choices: [
      {
        labelVi: 'Vung đại đao lưỡi lê kết liễu đối thủ trong ba nhịp súng nghi lễ',
        labelEn: 'Decapitate the rival with bayonet precision within three ceremonial discharges',
        resultVi: 'Khói thuốc súng mịt mù sảnh tiệc. Nhát chém chuẩn mực của bạn cắt ngọt yết hầu đối phương đúng vào nốt nhạc cuối của bản sonata cổ điển. Underboss đích thân nâng ly rượu vang đỏ, phong bạn làm Sottocapo cai quản cả một phân khu Backstreets.',
        resultEn: 'Gunsmoke shrouded the hall. Your metered strike severed the traitor’s neck precisely as the final chord of the classical sonata faded. The Underboss raised a goblet of vintage red, confirming your ascension to Sottocapo over an entire Backstreet sector.',
        setFingerRank: 2,
        flagsAdd: ['promo_thumb_sottocapo_done'],
        meritAdd: 30,
        effects: { health: -14, rep: +28, wealth: +45, sanity: -6 }
      },
      {
        labelVi: 'Triệt phá mạng lưới tuồn đạn lậu ngầm của đối phương, bắt hắn quỳ gối tự xử',
        labelEn: 'Expose their illegal munitions smuggling web, forcing them to self-execute',
        resultVi: 'Bằng chứng rành rành được bạn ném lên mặt bàn cẩm thạch. Kẻ phản bội run rẩy không nói nên lời, cúi đầu tạ tội và tự bóp cò súng kết liễu sinh mệnh theo đúng lễ nghi. Bạn nhận trọn vẹn kho vũ khí lậu và nghiễm nhiên trở thành Sottocapo.',
        resultEn: 'Irrefutable ledgers hit the marble tabletop. The traitor, paralyzed with terror, bowed deeply and pulled his own trigger in absolute compliance with etiquette. You confiscated the vast arms cache and assumed the Sottocapo seat unchallenged.',
        setFingerRank: 2,
        flagsAdd: ['promo_thumb_sottocapo_done'],
        meritAdd: 32,
        effects: { rep: +32, wealth: +60, network: +20, sanity: +6 }
      },
      {
        labelVi: 'Tạm hoãn quyết đấu, bảo dưỡng vũ khí và dưỡng thương trước',
        labelEn: 'Request duel deferral to inspect armaments and recover health',
        resultVi: 'Bạn báo cáo xin hoãn cuộc khảo hạch để chuẩn bị nghi lễ chỉn chu hơn. Underboss đồng ý cho bạn thời gian nghỉ ngơi.',
        resultEn: 'You requested a deferral to ensure flawless protocol. The Underboss granted time for recuperation.',
        effects: { health: +16, sanity: +12, wealth: +10 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Thumb: Capo -> Sottocapo (Branch 2: Subterranean Foundry)
  {
    id: 'syn_thumb_promo_sottocapo_armory',
    age: [21, 65],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Thumb', fingerRank: 1 },
    forbids: ['promo_thumb_sottocapo_done'],
    vi: "[Lò đạn District 4] Điệp viên Nest kích động thợ trong lò đạn của The Thumb nổi loạn. Underboss giao bạn dẹp vụ việc và khôi phục nguồn cung. Công nhân vẫn đang giữ kho thuốc nổ.",
    en: '[Subterranean Munitions Foundry · Sottocapo Crucible] Deep beneath District 4, thousands of laborers cast high-pressure shells for the Thumb. A sabotage insurrection triggered by Nest infiltrators threatens the entire armory. The Underboss grants you full authority to enforce order with an iron fist.',
    choices: [
      {
        labelVi: 'Xử trảm kẻ cầm đầu gián điệp trước mặt toàn xưởng, khôi phục sản xuất đúng tiến độ',
        labelEn: 'Publicly execute the ringleader saboteur and restore production lines immediately',
        resultVi: 'Bạn rút súng ngắn mạ vàng kết liễu tên đầu sỏ chỉ bằng một phát đạn duy nhất theo đúng lễ nghi. Dây chuyền đúc đạn rền vang trở lại mà không chậm trễ một phút. Underboss đích thân phong bạn làm Sottocapo tối cao của phân xưởng vũ khí.',
        resultEn: 'A single gilded bullet ended the saboteur with immaculate etiquette. The forge fires roared back to life without losing a minute. The Underboss formally promoted you to Sottocapo of the munitions district.',
        setFingerRank: 2,
        flagsAdd: ['promo_thumb_sottocapo_done'],
        meritAdd: 34,
        effects: { rep: +30, wealth: +50, sanity: +6, health: -14 }
      },
      {
        labelVi: 'Tái tổ chức hệ thống phòng thủ xưởng đúc bằng trận địa pháo liên hoàn tự động',
        labelEn: 'Overhaul foundry defenses with automated interlocking artillery batteries',
        resultVi: 'Bạn bố trí mạng lưới hỏa lực hoàn hảo đến mức biến khu xưởng thành một pháo đài bất khả xâm phạm. Lợi nhuận và kho dự trữ đạn dược tăng vọt gấp ba lần. Toàn thể Capo cúi đầu kính phục tân Sottocapo.',
        resultEn: 'Your tactical overhaul converted the sprawling foundry into an impregnable citadel. Production output tripled. Every Capo in the District bowed to their formidable new Sottocapo.',
        setFingerRank: 2,
        flagsAdd: ['promo_thumb_sottocapo_done'],
        meritAdd: 32,
        effects: { rep: +34, wealth: +65, network: +25, sanity: +5 }
      },
      {
        labelVi: 'Tạm lùi lại dưỡng sức và kiểm tra lại phòng tuyến quân vụ',
        labelEn: 'Take time to recover and double-check ordnance lines',
        resultVi: 'Bạn yêu cầu tạm nghỉ để điều dưỡng vết thương và tính toán kỹ lưỡng lại số lượng đạn dược tồn kho.',
        resultEn: 'You withdrew to tend to your wounds and conduct a rigorous inventory audit before the final trial.',
        effects: { health: +16, sanity: +12, wealth: +8, rep: +5 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Index: Proselyte -> Messenger (Branch 1: Blindfold Delivery)
  {
    id: 'syn_index_promo_messenger',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Index', fingerRank: 0 },
    forbids: ['promo_index_messenger_done'],
    vi: "[Dải lụa của Messenger] Khung cửi nhả ra một Prescript. Để rời hàng Proselyte, bạn phải bịt mắt và mang nó qua vùng tranh chấp. Các Proxy đứng chờ ở cửa, còn tuyến đường đã có người chết.",
    en: '[Blindfold Investiture of the Messenger · The Index] The titanic subterranean mechanical loom spits forth a shimmering parchment scroll. White-robed Proxies flank the nave in chilling silence. To rise from a sword-bearing Proselyte to an ordained Messenger, you must kneel to receive the ceremonial silk blindfold and deliver an absurd Prescript across active warzones.',
    choices: [
      {
        labelVi: 'Đeo dải lụa bịt mắt, cảm nhận Dòng Chảy để vượt qua làn đạn phục kích',
        labelEn: 'Don the blindfold, navigating the crossfire purely through the Flow',
        resultVi: 'Mắt bạn không nhìn thấy gì, nhưng trực giác kiếm thuật và tiếng xào xạc của cuộn chỉ vàng dẫn dắt bạn qua từng làn đạn. Bạn giao cuộn Chỉ Lệnh tận tay người nhận đúng vào giây thứ 32 của canh ba. Một Proxy mỉm cười gật đầu: Bạn đã là Sứ Giả chính thức của The Index.',
        resultEn: 'Blind to the physical world, your blade senses and the hum of golden threads carried you effortlessly through the crossfire. You delivered the Prescript at the precise 32nd second of midnight. A Proxy bowed: You are now an ordained Messenger of the Index.',
        setFingerRank: 1,
        flagsAdd: ['promo_index_messenger_done'],
        meritAdd: 20,
        effects: { rep: +20, resonance: +18, sanity: -6 }
      },
      {
        labelVi: 'Dùng lưỡi kiếm ngắn xẻ đôi đội phục kích, chứng minh quyền năng của Chỉ Lệnh',
        labelEn: 'Sever the ambushers with short-blade fury, proving the absolute authority of the Prescript',
        resultVi: 'Từng tên lính phục kích ngã rạp dưới lưỡi kiếm lạnh lùng. Cuộn Chỉ Lệnh không dính một giọt máu. Bạn hoàn thành sứ mệnh chuyển phát nguyên vẹn và được trao chiếc áo choàng Sứ Giả thêu chỉ vàng.',
        resultEn: 'Every ambusher collapsed under your clinical slashes. The Prescript remained immaculate without a single droplet of blood. You delivered it intact and were adorned with the gold-threaded Messenger mantle.',
        setFingerRank: 1,
        flagsAdd: ['promo_index_messenger_done'],
        meritAdd: 22,
        effects: { health: -14, rep: +22, wealth: +15, resonance: +15 }
      },
      {
        labelVi: 'Tĩnh tâm thiền định bên khung cửi, thấu hiểu quy luật Dòng Chảy trước',
        labelEn: 'Meditate beside the loom to comprehend the Flow before stepping forth',
        resultVi: 'Bạn dành ba ngày tĩnh lặng lắng nghe tiếng thoi dệt của khung cửi ngầm, giải tỏa căng thẳng và cảm nhận rõ hơn những sợi chỉ nhân quả.',
        resultEn: 'You spent three quiet days contemplating the mechanical loom, relieving tension and attuning to causality.',
        effects: { health: +16, sanity: +14, resonance: +6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Index: Proselyte -> Messenger (Branch 2: Tri-District Conduit)
  {
    id: 'syn_index_promo_messenger_conduit',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Index', fingerRank: 0 },
    forbids: ['promo_index_messenger_done'],
    vi: "[Ba cuộn tơ] Prescript giao bạn mang tơ vàng qua ba District trong một đêm: một cuộn lên cột đèn District 11, một xuống giếng District 12, một trao người ăn xin ở District 13. Không được đổi thứ tự.",
    en: '[Tri-District Conduit · Index Messenger Crucible] The Prescript commands you to carry three golden spools across three war-torn districts in a single night: affix one to a streetlamp in District 11, drop one into a well in District 12, and hand the last to an amputee beggar in District 13.',
    choices: [
      {
        labelVi: 'Thi triển bộ pháp lướt trên mái nhà, hoàn tất lộ trình trước khi bình minh ló dạng',
        labelEn: 'Leap across rooftops with breathless precision, completing the route before dawn',
        resultVi: 'Dưới ánh đèn đường mờ, bóng áo choàng trắng của bạn lướt qua các mái nhà như một bóng ma. Cả ba sứ mạng hoàn tất chuẩn xác từng giây. Cuộn tơ vàng tự phát sáng kết thành dải thắt lưng Sứ Giả của The Index.',
        resultEn: 'Your white mantle glided across moonlit rooftops like an apparition. All three tasks concluded with microsecond precision. The golden threads wove into your official Messenger sash.',
        setFingerRank: 1,
        flagsAdd: ['promo_index_messenger_done'],
        meritAdd: 24,
        effects: { rep: +24, resonance: +20, sanity: +5, health: -12 }
      },
      {
        labelVi: 'Dùng kiếm thuật bảo vệ người ăn xin khỏi đám côn đồ truy sát',
        labelEn: 'Defend the beggar recipient from pursuing thugs using clinical swordsmanship',
        resultVi: 'Bạn chém gục toán sát thủ trong ba chiêu, đặt cuộn tơ vàng vào tay người ăn xin. Người ăn xin mỉm cười gật đầu: đó chính là một Proxy đang cải trang thử thách bạn. Bạn được tấn phong Sứ Giả ngay tại chỗ.',
        resultEn: 'You neutralized the assassins in three flawless strokes, delivering the spool into the beggar’s grasp. The beggar smiled: a disguised Proxy testing your fidelity. You were ordained on the spot.',
        setFingerRank: 1,
        flagsAdd: ['promo_index_messenger_done'],
        meritAdd: 25,
        effects: { health: -16, rep: +26, network: +20, sanity: +8 }
      },
      {
        labelVi: 'Tĩnh tâm thiền định bên khung cửi, thấu hiểu quy luật Dòng Chảy trước',
        labelEn: 'Meditate beside the loom to comprehend the Flow before stepping forth',
        resultVi: 'Bạn dành ba ngày tĩnh lặng lắng nghe tiếng thoi dệt của khung cửi ngầm, giải tỏa căng thẳng và cảm nhận rõ hơn những sợi chỉ nhân quả.',
        resultEn: 'You spent three quiet days contemplating the mechanical loom, relieving tension and attuning to causality.',
        effects: { health: +16, sanity: +14, resonance: +6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Index: Messenger -> Proxy (Branch 1: Loom Judgement)
  {
    id: 'syn_index_promo_proxy',
    age: [21, 65],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Index', fingerRank: 1 },
    forbids: ['promo_index_proxy_done'],
    vi: "[Bản án của khung cửi] Prescript gọi tên người từng cứu bạn. Họ đã đốt một Chỉ Lệnh; trước bình minh, bạn phải lấy đầu họ hoặc bị xử thay. Đây là bài thử cuối trước khi trở thành Proxy.",
    en: '[Judgement of the Loom · The Proxy Greatsword] A Prescript inscribed in pitch-black ink drops into your hands: An old benefactor who once saved your life burned an Index Prescript. The text decrees: "Decapitate the heretic before sunrise, or dangle from the loom’s gallows." This is your final crucible to become a Proxy, the absolute enforcer of City destiny.',
    choices: [
      {
        labelVi: 'Vung Đại Kiếm Proxy thi hành án không một tia cảm xúc cá nhân',
        labelEn: 'Cleave the transgressor with the Proxy Greatsword without a trace of hesitation',
        resultVi: 'Lưỡi đại kiếm xé toạc không khí, kết thúc sinh mệnh người ân nhân trong tích tắc không đau đớn. Nước mắt bạn hòa tan vào màn sương lạnh. Các Weaver từ sâu trong lòng đất ban phước cho bạn: Bạn chính thức trở thành Proxy của The Index, mang trên vai Đại Kiếm Chấp Pháp.',
        resultEn: 'The colossal blade parted the nocturnal fog, severing the benefactor’s life in a painless instant. Your tears dissolved into the mist. Deep within the City’s underbelly, the Weavers sang: You are now a revered Proxy of the Index.',
        setFingerRank: 2,
        flagsAdd: ['promo_index_proxy_done'],
        meritAdd: 32,
        effects: { sanity: -14, rep: +35, resonance: +25, wealth: +25 }
      },
      {
        labelVi: 'Tìm ra sơ hở ngôn từ trong bản Chỉ Lệnh, hướng dẫn ân nhân hoàn thành điều khoản thay thế',
        labelEn: 'Exploit a semantic paradox in the Prescript, guiding your benefactor into an alternative sacrifice',
        resultVi: 'Bằng tư duy uyên bác về Dòng Chảy, bạn yêu cầu người ân nhân nuốt trọn chiếc nhẫn vàng và hiến tế cánh tay trái cho khung cửi. Chỉ Lệnh tự động đổi màu công nhận hoàn thành án. Các Proxy kinh ngạc trước trí tuệ của bạn và tôn bạn lên ngôi Proxy.',
        resultEn: 'Through deep comprehension of the Flow, you instructed your benefactor to swallow their gold signet and offer their left forearm to the loom. The Prescript flared green, signaling satisfaction. Stunned by your profound insight, the Proxies elevated you to Proxy rank.',
        setFingerRank: 2,
        flagsAdd: ['promo_index_proxy_done'],
        meritAdd: 30,
        effects: { sanity: +10, rep: +30, network: +25, resonance: +20 }
      },
      {
        labelVi: 'Tạm lùi lại phân tích sâu hơn các tầng nghĩa ẩn của bản Chỉ Lệnh',
        labelEn: 'Defer execution to parse the deeper metaphysical layers of the Prescript',
        resultVi: 'Bạn dành thêm thời gian giải mã các câu từ phức tạp của bản Chỉ Lệnh, ổn định tâm trạng và tĩnh dưỡng cơ thể.',
        resultEn: 'You withdrew into deep grammatical study of the Prescript, stabilizing your sanity and resting your body.',
        effects: { health: +16, sanity: +14, resonance: +8 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Index: Messenger -> Proxy (Branch 2: Needle Executioner)
  {
    id: 'syn_index_promo_proxy_sword',
    age: [21, 65],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Index', fingerRank: 1 },
    forbids: ['promo_index_proxy_done'],
    vi: "[Đại kiếm của Proxy] Một Office Grade 2 bắt Messenger và đốt Prescript của anh ta. Khung cửi trao bạn đại kiếm thêu chỉ vàng: phá vũ khí của Office, mang đầu thủ lĩnh về trước giao thừa.",
    en: '[Needle and Thread Executioner · Proxy Investiture] A Grade 2 Fixer Office captured an Index Messenger, burning the sacred scroll. The subterranean loom rumbles, dispensing the gold-threaded Proxy Greatsword: "Sever every blade of the blasphemers. Present their master’s head before the bell strikes twelve."',
    choices: [
      {
        labelVi: 'Đơn thương độc mã chém sập văn phòng đối phương, giải cứu Sứ Giả và thu hồi tro tàn Chỉ Lệnh',
        labelEn: 'Single-handedly level the enemy office, rescue the Messenger, and retrieve the sacred ashes',
        resultVi: 'Đại kiếm Proxy vung lên như sấm rền chớp giật. Mười hai Fixer vũ trang gục ngã trước lưỡi kiếm hoàn hảo của bạn. Bạn cõng Sứ Giả trở về trong tiếng tụng ca của các môn đồ. Bạn chính thức là Proxy Đại Kiếm của The Index.',
        resultEn: 'The colossal needle blade cleaved through barricades like lightning. Twelve armed Fixers fell before your flawless flow. You carried the Messenger back amidst hymns of praise, formally ordained as an Index Proxy.',
        setFingerRank: 2,
        flagsAdd: ['promo_index_proxy_done'],
        meritAdd: 35,
        effects: { health: -18, rep: +36, resonance: +28, wealth: +30, sanity: +6 }
      },
      {
        labelVi: 'Thao túng Dòng Chảy khiến chính các khách hàng của văn phòng quay sang triệt hạ họ',
        labelEn: 'Manipulate causality so the Office’s own wealthy patrons tear them apart from within',
        resultVi: 'Không cần rút kiếm, bạn gửi ba bức thư ngắn đến các nhà tài phiệt Nest. Trong vòng mười hai giờ, văn phòng nổi loạn bị chính các thân chủ san phẳng. Các Weaver cúi đầu trước trí tuệ siêu phàm của tân Proxy.',
        resultEn: 'Spilling no blood yourself, three terse notes sent to Nest oligarchs prompted clients to dismantle the rogue Office within hours. The Weavers bowed to your terrifying mastery of causality.',
        setFingerRank: 2,
        flagsAdd: ['promo_index_proxy_done'],
        meritAdd: 34,
        effects: { rep: +38, network: +35, wealth: +45, sanity: +12 }
      },
      {
        labelVi: 'Tạm lùi lại phân tích sâu hơn các tầng nghĩa ẩn của bản Chỉ Lệnh',
        labelEn: 'Defer execution to parse the deeper metaphysical layers of the Prescript',
        resultVi: 'Bạn dành thêm thời gian giải mã các câu từ phức tạp của bản Chỉ Lệnh, ổn định tâm trạng và tĩnh dưỡng cơ thể.',
        resultEn: 'You withdrew into deep grammatical study of the Prescript, stabilizing your sanity and resting your body.',
        effects: { health: +16, sanity: +14, resonance: +8 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Middle: Little Sibling -> Big Sibling (Branch 1: Punish the Thieves)
  {
    id: 'syn_middle_promo_big_sibling',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Middle', fingerRank: 0 },
    forbids: ['promo_middle_big_sibling_done'],
    vi: "[Mắt xích vàng] Một Little Sibling bị cướp tiền và đánh gãy xương sườn. Book of Vengeance đã ghi tên băng đảng gây ra việc ấy. Bạn muốn nhận vai Big Sibling thì phải dẫn đầu cuộc đòi nợ.",
    en: '[Golden Chain Tattoo: Becoming Big Sibling · The Middle] A fragile Little Sibling in your crew was mugged, robbed of all Ahn, and left with three cracked ribs. Inside the Middle hideout, the Book of Vengeance lies open. Crimson ink burns like fresh arterial blood. To ascend to Big Sibling, you must lead the reprisal and inscribe another glowing link onto your arm.',
    choices: [
      {
        labelVi: 'Quấn xích sắt quanh nắm đấm, đập nát toàn bộ sào huyệt kẻ thù',
        labelEn: 'Wrap heavy iron chains around bare knuckles, flattening the enemy lair',
        resultVi: 'Không một tên côn đồ nào đứng vững sau ba phút cuồng nộ của bạn. Bạn thu hồi từng xu Ahn bị cướp và quỳ trước bàn thờ gia tộc gạch tên kẻ thù trong Sách Phục Thù. Tiếng kim xăm nung đỏ rít lên trên da thịt bạn: Bạn chính thức là Big Brother / Big Sister của The Middle.',
        resultEn: 'Not a single thug stood after three minutes of chain-wrapped fury. You recovered every stolen coin and struck through the enemy’s name in the Book of Vengeance. White-hot needles etched the glowing golden chain into your skin: You are now a Big Sibling of the Middle.',
        setFingerRank: 1,
        flagsAdd: ['promo_middle_big_sibling_done'],
        meritAdd: 20,
        effects: { health: -14, rep: +24, heat: +20, sanity: +5 }
      },
      {
        labelVi: 'Lấy thân mình che chắn làn mưa tên nỏ để toàn bộ đàn em an toàn',
        labelEn: 'Shield your Little Siblings with your own body against a hail of crossbow bolts',
        resultVi: 'Bảy mũi tên cắm sâu vào vai và lưng bạn, nhưng bạn không lùi nửa bước, dùng song quyền đấm gục toàn bộ kẻ địch. Đàn em vừa khóc vừa băng bó cho bạn. Toàn thể gia tộc cúi đầu kính phục tấm lòng bao bọc của một Big Sibling đích thực.',
        resultEn: 'Seven bolts pierced your shoulders and back, yet you refused to yield an inch, pummeling the foes into submission. Weeping with gratitude, your siblings bandaged your wounds. The entire Family cheered: A true Big Sibling has risen.',
        setFingerRank: 1,
        flagsAdd: ['promo_middle_big_sibling_done'],
        meritAdd: 22,
        effects: { health: -18, rep: +28, network: +18, sanity: +8 }
      },
      {
        labelVi: 'Uống rượu cùng các anh em trong quán bar ngầm để hồi phục thể lực trước',
        labelEn: 'Drink ale with siblings in the subterranean pub to restore body and spirit',
        resultVi: 'Bạn dành đêm nay quây quần bên các anh em trong gia tộc, uống cạn thùng bia mạch nha cay nồng và băng bó lại các vết bầm tím.',
        resultEn: 'You spent the night gathered with your sworn family, sharing hearty ale and tending to bruises.',
        effects: { health: +18, sanity: +14, wealth: -6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Middle: Little Sibling -> Big Sibling (Branch 2: Nest Boundary Rescue)
  {
    id: 'syn_middle_promo_big_sibling_rescue',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Middle', fingerRank: 0 },
    forbids: ['promo_middle_big_sibling_done'],
    vi: '[Giải Cứu Đàn Em Vùng Biên Giới · Thăng Bậc Big Sibling The Middle] Ba Little Siblings vô tình lạc qua chốt gác Nest và bị lực lượng hành pháp vũ trang bao vây trong nhà kho bỏ hoang. Sách Phục Thù ghi rõ: "Không một ai trong Gia Đình bị bỏ lại phía sau." Bạn lao vào giữa tiếng còi báo động.',
    en: '[Border Rescue · Middle Big Sibling Crucible] Three Little Siblings crossed an unmarked Nest border checkpoint and are pinned down inside an abandoned warehouse by security squads. The Book of Vengeance commands: "None in the Family are left behind." You sprint into the wailing sirens.',
    choices: [
      {
        labelVi: 'Phá toang cửa thép, dùng xích gai đập tan đội vũ trang giải vây cho đàn em',
        labelEn: 'Shatter reinforced blast doors, smashing the security perimeter with barbed chains',
        resultVi: 'Nắm đấm bọc xích của bạn như búa tạ nghiền nát khiên chống bạo động của quân Nest. Bạn cõng người em nhỏ nhất trên lưng, đưa cả ba thoát về an toàn. Các bô lão long trọng xăm mắt xích vàng Big Sibling lên ngực bạn.',
        resultEn: 'Your chain-wrapped fists shattered riot shields like dry clay. Bearing the youngest sibling on your back, you brought all three home intact. The elders etched the Big Sibling chain upon your chest.',
        setFingerRank: 1,
        flagsAdd: ['promo_middle_big_sibling_done'],
        meritAdd: 25,
        effects: { health: -16, rep: +26, heat: +25, sanity: +8 }
      },
      {
        labelVi: 'Tung lựu đạn khói gây nhiễu, bí mật dẫn dắt các em thoát ra qua đường hầm cống',
        labelEn: 'Deploy smoke screens, covertly exfiltrating your siblings through subterranean sewers',
        resultVi: 'Bằng trực giác sắc bén, bạn đưa toàn đội luồn lách qua cống ngầm an toàn mà không để kẻ địch chạm vào một sợi tóc. Tinh thần bảo bọc cơ trí của bạn được cả gia đình tôn vinh.',
        resultEn: 'With keen situational awareness, you threaded your team through the drainage conduits undetected. Your protective brilliance was applauded by the entire Family.',
        setFingerRank: 1,
        flagsAdd: ['promo_middle_big_sibling_done'],
        meritAdd: 24,
        effects: { rep: +24, network: +22, sanity: +12, wealth: +15 }
      },
      {
        labelVi: 'Uống rượu cùng các anh em trong quán bar ngầm để hồi phục thể lực trước',
        labelEn: 'Drink ale with siblings in the subterranean pub to restore body and spirit',
        resultVi: 'Bạn dành đêm nay quây quần bên các anh em trong gia tộc, uống cạn thùng bia mạch nha cay nồng và băng bó lại các vết bầm tím.',
        resultEn: 'You spent the night gathered with your sworn family, sharing hearty ale and tending to bruises.',
        effects: { health: +18, sanity: +14, wealth: -6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Middle: Big Sibling -> Great Elder (Branch 1: Fortress Breach)
  {
    id: 'syn_middle_promo_great_elder',
    age: [21, 65],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Middle', fingerRank: 1 },
    forbids: ['promo_middle_great_elder_done'],
    vi: "[Hai trăm người em] Người của The Middle bị vây trong pháo đài District 10. Trưởng bối giao bạn đưa họ ra và trừng phạt nhóm tấn công. Ghế Great Elder sẽ dành cho người hoàn thành cả hai việc.",
    en: "[Two Hundred Siblings] Middle members are besieged in a fortress in District 10. The elders tell you to get them out and punish the attackers. The Great Elder chair goes to whoever does both.",
    choices: [
      {
        labelVi: "Dẫn cả gia tộc tổng tấn công, phá cổng thành bằng nắm đấm",
        labelEn: "Lead the whole Family in an all-out assault and break the gates with your fists",
        resultVi: "Cánh cổng thép dày nửa mét vỡ dưới những cú đấm quấn xích của bạn. Quân phòng thủ tan hàng trong tiếng gầm của hàng trăm người em. Các bô lão trao cho bạn ấn Great Elder.",
        resultEn: "The half-meter steel gate gives way under your chain-wrapped fists. The defenders break ranks under the roar of hundreds of siblings. The elders hand you the Great Elder’s seal.",
        setFingerRank: 2,
        flagsAdd: ['promo_middle_great_elder_done'],
        meritAdd: 32,
        effects: { health: -18, rep: +36, wealth: +40, heat: +25, sanity: +6 }
      },
      {
        labelVi: "Thách tướng địch đấu tay đôi trước mặt hai quân",
        labelEn: "Challenge the enemy general to a duel before both armies",
        resultVi: "Trận đấu kéo dài bốn mươi hiệp và kết thúc bằng một tiếng xương quai xanh gãy. Quân địch thấy vậy bỏ vũ khí. Cả khu phố sẽ nhắc tên bạn như Great Elder.",
        resultEn: "The duel lasts forty rounds and ends with the sound of a snapping collarbone. Seeing it, the enemy lays down their weapons. The whole district will say your name as Great Elder.",
        setFingerRank: 2,
        flagsAdd: ['promo_middle_great_elder_done'],
        meritAdd: 30,
        effects: { health: -16, rep: +40, wealth: +30, sanity: +12 }
      },
      {
        labelVi: "Lùi lại chữa vết thương và đọc lại Book of Vengeance",
        labelEn: "Step back to treat your wounds and reread the Book of Vengeance",
        resultVi: "Bạn dùng thời gian thêm để chuẩn bị người và đọc lại từng trang nợ trong Book of Vengeance.",
        resultEn: "You use the extra time to prepare your people and reread each page of debt in the Book of Vengeance.",
        effects: { health: +16, sanity: +14, wealth: +5 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Middle: Big Sibling -> Great Elder (Branch 2: Blood Feast Summit)
  {
    id: 'syn_middle_promo_great_elder_clan',
    age: [21, 65],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Middle', fingerRank: 1 },
    forbids: ['promo_middle_great_elder_done'],
    vi: "[Đại yến The Middle] Ba nhánh Syndicate đến xin nhập gia đình, nhưng mang thuốc nổ vào sảnh tiệc. Bạn được giao chủ trì buổi đón tiếp và giữ mạng cho các trưởng bối. Khách đã ngồi vào bàn.",
    en: '[Blood Feast Summit · Great Elder Investiture] In the torch-lit cavern of the Middle, thousands gather for the Family Grand Feast. Three external syndicates petition for vassalage while smuggling concealed explosives to assassinate leadership. The responsibility of presiding over the feast falls upon you.',
    choices: [
      {
        labelVi: 'Đập vỡ bàn rượu, tự tay bẻ gãy cổ ba tên thích khách trước khi kíp nổ kịp châm',
        labelEn: 'Shatter the banquet table, snapping the assassins’ necks before the fuses ignite',
        resultVi: 'Tốc độ ra đòn của bạn nhanh như sấm sét. Ba kẻ phản trắc gục ngã trong nháy mắt; thuốc nổ bị vô hiệu hóa an toàn. Cả khán phòng đồng thanh hô vang danh xưng của bạn. Các bô lão trao vương trượng xích vàng Great Elder.',
        resultEn: 'Lightning-fast chain strikes subdued the traitors in a heartbeat, neutralizing the payload. The entire banquet erupted in unison cheers. The Elders crowned you with the Great Elder golden chain regalia.',
        setFingerRank: 2,
        flagsAdd: ['promo_middle_great_elder_done'],
        meritAdd: 35,
        effects: { health: -14, rep: +42, wealth: +50, sanity: +10 }
      },
      {
        labelVi: 'Thu phục lòng quân, biến toàn bộ tay chân của kẻ phản bội thành môn đệ trung thành',
        labelEn: 'Turn the enemy rank-and-file into devoted Family disciples through overwhelming charisma',
        resultVi: 'Bạn vạch trần âm mưu hèn hạ của những kẻ cầm đầu và giang rộng vòng tay đón nhận đám đàn em lầm đường lạc lối. Sức mạnh quân số của gia tộc tăng gấp đôi. Bạn được tôn làm Đại Trưởng Lão đầy uy vọng.',
        resultEn: 'Exposing the betrayal of their greedy leaders, you welcomed their rank-and-file into the Family brotherhood. The clan’s muscle doubled overnight. You rose as a revered Great Elder.',
        setFingerRank: 2,
        flagsAdd: ['promo_middle_great_elder_done'],
        meritAdd: 34,
        effects: { rep: +40, network: +40, wealth: +45, sanity: +15 }
      },
      {
        labelVi: 'Tạm lùi lại dưỡng sức và kiểm tra lại danh sách Book of Vengeance',
        labelEn: 'Pause to tend to wounds and review the Book of Vengeance',
        resultVi: 'Bạn dành thêm thời gian chuẩn bị lực lượng và đọc lại từng trang huyết nợ trong Sách Phục Thù.',
        resultEn: 'You took time to heal and review each outstanding entry in the Book of Vengeance.',
        effects: { health: +16, sanity: +14, wealth: +5 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Ring: Student -> Docent (Branch 1: Anatomical Tapestry)
  {
    id: 'syn_ring_promo_docent',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Ring', fingerRank: 0 },
    forbids: ['promo_ring_docent_done'],
    vi: "[Bài tốt nghiệp Atelier] Hội đồng Maestro đặt bạn trước một tác phẩm còn dang dở trong phòng triển lãm District 9. Hoàn thành nó trước giờ mở cửa; họ sẽ chấm xem bạn có đủ tư cách Docent.",
    en: '[Atelier Graduation Exhibition: Docent Commission · The Ring] Inside District 9’s marble gallery, antiseptic mingles with drying oil paint and warm blood. As a Student, you must unveil your graduation masterpiece to prove mastery over the aesthetics of anatomical dissolution before the stern Maestros.',
    choices: [
      {
        labelVi: 'Dệt nên bức tranh giải phẫu học tinh xảo từ sợi thần kinh và thủy tinh màu',
        labelEn: 'Weave an intricate anatomical tapestry from nerve fibers and stained glass',
        resultVi: 'Tác phẩm của bạn tỏa sáng rực rỡ dưới ánh đèn pha lê, từng nhịp xung điện sinh học phát ra âm thanh du dương như tiếng phong cầm. Hội đồng Maestro đứng dậy vỗ tay trong xúc động cuồng nhiệt: Bạn chính thức là Docent (Giảng viên Nghệ thuật) của The Ring.',
        resultEn: 'Your installation radiated under crystal chandeliers, organic bioelectric pulses emitting ethereal organ chords. The Maestro salon rose in ecstatic applause: You are officially ordained as a Ring Docent.',
        setFingerRank: 1,
        flagsAdd: ['promo_ring_docent_done'],
        meritAdd: 20,
        effects: { sanity: -8, resonance: +20, rep: +24, wealth: +25 }
      },
      {
        labelVi: 'Chế tác cỗ máy điêu khắc động học trừu tượng từ vũ khí của Fixer bại trận',
        labelEn: 'Construct an abstract kinetic sculpture from the shattered weapons of fallen Fixers',
        resultVi: 'Không cần chạm tới máu thịt, cỗ máy kim loại chuyển động với những nhịp điệu lạnh lùng làm say đắm các nhà phê bình bảo thủ. Bạn được phong Docent với tư cách người tiên phong của trường phái cấu trúc trừu tượng.',
        resultEn: 'Spilling no flesh, your kinetic metal automaton operated with cold, mesmerizing geometry, captivating the conservative critics. You were crowned Docent as a pioneer of the abstract structural school.',
        setFingerRank: 1,
        flagsAdd: ['promo_ring_docent_done'],
        meritAdd: 22,
        effects: { sanity: +8, resonance: +15, rep: +20, wealth: +30 }
      },
      {
        labelVi: 'Tạm lùi về xưởng vẽ cá nhân, mài dũa lại ý tưởng phác thảo trước',
        labelEn: 'Withdraw to your personal atelier to refine sketches before the trial',
        resultVi: 'Bạn dành ba ngày trong xưởng vẽ yên tĩnh, nghe nhạc cổ điển và uống trà thảo mộc để ổn định tâm trí.',
        resultEn: 'You retreated to your quiet studio with classical vinyl and herbal tea, centering your psyche.',
        effects: { health: +16, sanity: +14, resonance: +6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Ring: Student -> Docent (Branch 2: Kinetic Prism Salon)
  {
    id: 'syn_ring_promo_docent_gallery',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Ring', fingerRank: 0 },
    forbids: ['promo_ring_docent_done'],
    vi: "[Phòng lăng kính] Hội đồng Maestro giao bạn biến căn phòng tối thành triển lãm ánh sáng và gương. Khách từ các Nest đã mua vé. Khi cửa mở, tác phẩm phải đứng vững dưới mắt họ.",
    en: '[Prism and Mirror Pavilion · Ring Docent Crucible] The Maestro council challenges you to transform a pitch-black subterranean vault into a multifaceted optical gallery using prism refraction and multi-angled mirrors.',
    choices: [
      {
        labelVi: 'Sắp đặt trận địa gương lăng kính, tạo ảo ảnh mê cung vô cực làm mê hoặc người xem',
        labelEn: 'Assemble an infinity mirror labyrinth, enchanting observers with kaleidoscopic illusion',
        resultVi: 'Ánh sáng phản chiếu liên hồi qua hàng ngàn mảnh gương vỡ, biến gian phòng thành một vũ trụ sao rơi lộng lẫy. Khán giả hoàn toàn bị thôi miên bởi vẻ đẹp thị giác siêu thực. Bạn được nhất trí trao chứng chỉ Docent xuất sắc.',
        resultEn: 'Refracted beams bounced across ten thousand mirror facets, transforming the chamber into a dazzling galaxy. Spectators wept in optical wonder. You were unanimously crowned an exceptional Ring Docent.',
        setFingerRank: 1,
        flagsAdd: ['promo_ring_docent_done'],
        meritAdd: 24,
        effects: { rep: +26, resonance: +22, sanity: +8, wealth: +32 }
      },
      {
        labelVi: 'Kết hợp âm thanh cộng hưởng tần số thấp vào các khối điêu khắc chuyển động',
        labelEn: 'Fuse infrasound frequency acoustic waves into dynamic kinetic sculptures',
        resultVi: 'Từng nốt nhạc trầm rung chuyển lồng ngực khán giả đồng nhịp với chuyển động cơ học của tác phẩm. Các Maestro kinh ngạc tán thưởng tư duy âm học đột phá của bạn.',
        resultEn: 'Deep acoustic pulses resonated in harmony with kinetic joints, captivating the conservative salon. The Maestros applauded your boundary-pushing acoustic installation.',
        setFingerRank: 1,
        flagsAdd: ['promo_ring_docent_done'],
        meritAdd: 25,
        effects: { health: -10, rep: +28, resonance: +25, network: +20, sanity: +6 }
      },
      {
        labelVi: 'Tạm lùi về xưởng vẽ cá nhân, mài dũa lại ý tưởng phác thảo trước',
        labelEn: 'Withdraw to your personal atelier to refine sketches before the trial',
        resultVi: 'Bạn dành ba ngày trong xưởng vẽ yên tĩnh, nghe nhạc cổ điển và uống trà thảo mộc để ổn định tâm trí.',
        resultEn: 'You retreated to your quiet studio with classical vinyl and herbal tea, centering your psyche.',
        effects: { health: +16, sanity: +14, resonance: +6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Ring: Docent -> Maestro (Branch 1: Salon of Flesh)
  {
    id: 'syn_ring_promo_maestro',
    age: [21, 65],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Ring', fingerRank: 1 },
    forbids: ['promo_ring_maestro_done'],
    vi: "[Salon of Flesh] The Ring giao bạn điều hành một buổi trình diễn trước khách Nest và các Capo. Dao mổ, ánh sáng và người trên sân khấu đều thuộc trách nhiệm của bạn. Hội đồng sẽ quyết định chức Maestro sau màn cuối.",
    en: "[Salon of Flesh] The Ring puts you in charge of a performance for Nest guests and Capos. The scalpels, the lighting and the people on the stage are your responsibility. The council decides on the Maestro title after the final act.",
    choices: [
      {
        labelVi: "Cầm gậy chỉ huy và biến sàn đấu thành bản giao hưởng ánh sáng",
        labelEn: "Raise the baton and turn the arena into a symphony of light",
        resultVi: "Tiếng lưỡi đao, tiếng thở dốc và nhịp tim dồn dập hòa vào những cột ánh sáng nhiều màu. Khán phòng im đến mức nghe được giọt mồ hôi rơi xuống sàn. Chiếc mặt nạ vàng Maestro được trao cho bạn.",
        resultEn: "Blades, breaths and racing pulses blend with columns of colored light. The hall is so silent you can hear sweat hit the floor. The golden Maestro mask is handed to you.",
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        meritAdd: 32,
        effects: { sanity: -12, resonance: +25, rep: +40, wealth: +60 }
      },
      {
        labelVi: "Trưng bày loạt tranh khiến người xem tự nhận ra E.G.O của mình",
        labelEn: "Exhibit a series of paintings that makes viewers recognize their own E.G.O",
        resultVi: "Những bức sơn mài bóc trần thứ người ta không muốn nhìn. Ba người trong khán phòng thức tỉnh E.G.O ngay tại chỗ. Các trưởng lão của Ring cúi đầu, và chức Maestro là của bạn.",
        resultEn: "The lacquer canvases strip away what people prefer not to look at. Three people in the hall awaken an E.G.O on the spot. The Ring elders bow their heads, and the Maestro title is yours.",
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        meritAdd: 30,
        effects: { sanity: +12, resonance: +35, rep: +36, wealth: +50 }
      },
      {
        labelVi: "Xin hoãn buổi diễn để chỉnh lại nhạc cụ và bảng màu",
        labelEn: "Ask to delay the show to retune the instruments and the palette",
        resultVi: "Bạn dùng thời gian thêm để chỉnh nhạc cụ và ngủ đủ giấc.",
        resultEn: "You spend the extra time retuning your instruments and sleeping properly.",
        effects: { health: +16, sanity: +14, wealth: +10 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Ring: Docent -> Maestro (Branch 2: Symphony of the Five Corridors)
  {
    id: 'syn_ring_promo_maestro_symphony',
    age: [21, 65],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Ring', fingerRank: 1 },
    forbids: ['promo_ring_maestro_done'],
    vi: "[Cuộc thi giành ghế Maestro · The Ring] Ở nhà hát thạch anh của District 9, năm Docent giỏi nhất tranh một ghế Maestro. Đề bài ban giám khảo đọc lên chỉ có một dòng: sự vĩnh cửu của biến hóa.",
    en: "[Contest for the Maestro Chair · The Ring] In District 9’s quartz theater, the five best Docents compete for a single Maestro chair. The jury reads the theme in one line: the permanence of change.",
    choices: [
      {
        labelVi: "Chỉ huy dàn nhạc cơ khí cùng một màn rối bóng",
        labelEn: "Conduct a mechanical orchestra with a shadow-puppet act",
        resultVi: "Những con rối đồng và thủy tinh cử động theo từng nhịp đũa của bạn, êm đến mức khán phòng quên rằng chúng làm bằng kim loại. Ban giám khảo im lặng cho tới nốt cuối, rồi người lớn tuổi nhất đứng dậy trước. Bạn được phong Maestro.",
        resultEn: "The brass-and-glass puppets move with every beat of your baton, so smoothly that the hall forgets they are metal. The jury stays silent until the last note, then the eldest rises first. You are named Maestro.",
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        meritAdd: 35,
        effects: { rep: +42, wealth: +65, resonance: +30, sanity: +12 }
      },
      {
        labelVi: "Vẽ bức bích họa trên vòm nhà hát bằng màu phát quang",
        labelEn: "Paint a ceiling fresco in glowing pigment",
        resultVi: "Màu phát quang khô chậm hơn bạn tính, nên bạn phải vẽ nhanh hơn dự định. Khi đèn tắt, cả vòm trần sáng lên như một dải ngân hà, và ai đó ở hàng ghế sau bật khóc. Bạn được phong Maestro.",
        resultEn: "The glowing pigment dries slower than you planned, so you paint faster than you meant to. When the lights go out the whole vault glows like a galaxy, and someone in the back rows begins to cry. You are named Maestro.",
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        meritAdd: 34,
        effects: { rep: +40, network: +35, wealth: +55, sanity: +10 }
      },
      {
        labelVi: "Xin hoãn buổi diễn để chỉnh lại nhạc cụ và bảng màu",
        labelEn: "Ask to delay the show to retune the instruments and the palette",
        resultVi: "Ban giám khảo đồng ý lùi một tuần. Bạn dùng thời gian đó để ngủ đủ giấc và chỉnh lại những dây đàn đã lệch.",
        resultEn: "The jury agrees to a week’s delay. You spend it sleeping properly and retuning the strings that had drifted.",
        effects: { health: +16, sanity: +14, wealth: +10 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Ring: Maestro -> Grand Curator (Branch 1: Eternal Museum)
  {
    id: 'syn_ring_curator_monument',
    age: [25, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Ring', fingerRank: 2 },
    forbids: ['promo_ring_curator_done'],
    vi: "[Ghế Grand Curator] Ghế quản trưng của The Ring đang bỏ trống. Khi bạn chuẩn bị nhận chức, người của The Head đến điều tra các tác phẩm trong Gallery District 9. Họ sẽ tới cửa trước giờ khai mạc.",
    en: "[The Grand Curator’s Chair] The Ring’s curator seat is empty. As you prepare to take it, men from The Head arrive to inspect the works in the District 9 gallery. They will be at the door before opening.",
    choices: [
      {
        labelVi: "Mở Triển Lãm Vĩnh Cửu và để các tác phẩm tự nói với người kiểm tra",
        labelEn: "Open the Eternal Exhibition and let the works speak to the inspectors",
        resultVi: "Mọi tác phẩm sáng lên cùng lúc theo nhịp bạn dàn dựng. Phái đoàn của The Head đi hết một vòng mà không tìm ra điểm nào vi phạm Taboo. Hội đồng gọi bạn là Grand Curator của The Ring.",
        resultEn: "Every piece lights up on the cue you set. The Head’s delegation walks the full circuit without finding a single Taboo violation. The council names you Grand Curator of The Ring.",
        setFingerRank: 3,
        flagsAdd: ['promo_ring_curator_done'],
        meritAdd: 50,
        effects: { sanity: -10, resonance: +35, rep: +50, wealth: +80 }
      },
      {
        labelVi: "Chuyển các tác phẩm quý vào kho ngầm ở The Outskirts",
        labelEn: "Move the best pieces to underground vaults in the Outskirts",
        resultVi: "Hàng trăm tác phẩm gốc thoát khỏi tay người kiểm duyệt của The Head. Các nghệ sĩ trong The City không nói ra, nhưng họ nhớ ai đã làm điều đó.",
        resultEn: "Hundreds of original works escape The Head’s censors. The artists of The City do not say it aloud, but they remember who did it.",
        setFingerRank: 3,
        flagsAdd: ['promo_ring_curator_done'],
        meritAdd: 45,
        effects: { sanity: +15, resonance: +35, rep: +45, network: +40 }
      },
      {
        labelVi: "Nghỉ ngơi và sắp xếp lại các phòng trưng bày trước buổi kiểm tra",
        labelEn: "Rest and rearrange the galleries before the inspection",
        resultVi: "Bạn ngủ đủ giấc và đi hết các phòng trưng bày một lượt, chỉnh lại từng khung tranh lệch.",
        resultEn: "You sleep properly and walk every gallery once, straightening each crooked frame.",
        effects: { health: +18, sanity: +14, wealth: +10 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Ring: Maestro -> Grand Curator (Branch 2: Apex Grand Master)
  {
    id: 'syn_ring_apex_grand_master',
    age: [25, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Ring', fingerRank: 2 },
    forbids: ['promo_ring_curator_done'],
    vi: "[Lễ nhận chức] Năm hành lang của The Ring mở cửa. Các Docent và Maestro đợi bạn trong đại sảnh; ngôi Grand Curator ở cuối phòng. Một bản nhạc bắt đầu, nhưng chưa ai bước lên trước.",
    en: "[Investiture] The five corridors of The Ring open. Docents and Maestros wait in the great hall; the Grand Curator’s seat stands at the far end. Music begins, but nobody has stepped forward yet.",
    choices: [
      {
        labelVi: "Công bố Hiến Chương Nghệ Thuật mới cho cả thế giới ngầm The City",
        labelEn: "Announce a new Charter of Art to the whole underworld of The City",
        resultVi: "Lời tuyên ngôn của bạn lan khắp các ngõ Backstreets và Nest. Từ đó, tác phẩm của The Ring được dùng làm thước đo giá trị. Bạn chính thức là Grand Curator.",
        resultEn: "Your declaration spreads through every corner of the Backstreets and the Nest. From then on The Ring’s works serve as a measure of value. You are formally Grand Curator.",
        setFingerRank: 3,
        flagsAdd: ['promo_ring_curator_done'],
        meritAdd: 55,
        effects: { rep: +55, wealth: +90, network: +50, sanity: +18 }
      },
      {
        labelVi: "Mở một trường phái dạy người ta thả lỏng đầu óc",
        labelEn: "Open a school that teaches people to loosen their minds",
        resultVi: "Quan điểm nghệ thuật của bạn giúp hàng nghìn cư dân Backstreets tìm được một chút bình yên giữa thực tại. Họ gọi bạn là Grand Curator bằng giọng nhỏ hơn thường lệ.",
        resultEn: "Your view of art gives thousands of Backstreets residents a little peace in a harsh reality. They call you Grand Curator in a lower voice than usual.",
        setFingerRank: 3,
        flagsAdd: ['promo_ring_curator_done'],
        meritAdd: 52,
        effects: { sanity: +22, rep: +50, wealth: +75, network: +45 }
      },
      {
        labelVi: "Nghỉ ngơi và chỉnh lại các phòng trưng bày trước đại lễ",
        labelEn: "Rest and rearrange the galleries before the ceremony",
        resultVi: "Bạn ngủ đủ giấc và đi qua từng phòng trưng bày, lau những tấm kính còn dấu tay.",
        resultEn: "You sleep properly and walk through every gallery, wiping the glass that still shows handprints.",
        effects: { health: +18, sanity: +14, wealth: +10 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Pinky: Initiate -> Sworn Blade (Branch 1: Silent Stiletto)
  {
    id: 'syn_pinky_promo_blade',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Pinky', fingerRank: 0 },
    forbids: ['promo_pinky_blade_done'],
    vi: "[Bản án cho kẻ bội ước] Một người của The Pinky lấy ngân quỹ rồi trốn vào Nest. Để trở thành Sworn Blade, bạn phải tìm hắn và thi hành lời thề cũ. Người giao việc yêu cầu giữ kín tên mình.",
    en: '[The Pinky Vow: Sworn Blade Investiture · The Pinky] In a pitch-black subterranean vault, a velvet-gloved operative interlocks pinky fingers with you. A traitor broke a sacred Pinky oath, embezzling guild funds and hiding within a fortified Nest manor. To cast off Initiate status and claim the Sworn Blade mantle, you must execute the sentence in complete silence.',
    choices: [
      {
        labelVi: 'Đột nhập trong bóng tối, cắt ngọt yết hầu kẻ bội ước mà không kích hoạt chuông báo',
        labelEn: 'Infiltrate the manor, slitting the traitor’s throat without triggering a single alarm',
        resultVi: 'Lưỡi đoản kiếm của bạn trượt qua bóng đêm êm ái như gió thoảng. Kẻ phản bội gục xuống bàn làm việc cùng cuốn sổ tài chính được thu hồi nguyên vẹn. Bạn nhận chiếc nhẫn bạc ngón út và trở thành Sworn Blade chính thức.',
        resultEn: 'Your slender stiletto glided through the gloom like a whisper. The oath-breaker slumped over the ledger, secured intact. The silver pinky ring was slipped onto your finger: You are an ordained Sworn Blade.',
        setFingerRank: 1,
        flagsAdd: ['promo_pinky_blade_done'],
        meritAdd: 20,
        effects: { rep: +20, wealth: +28, heat: +5, sanity: +5 }
      },
      {
        labelVi: 'Cài độc dược thần kinh vô hình vào ly trà, ép hắn tự giao nộp lại tài sản',
        labelEn: 'Spike their evening tea with invisible neurotoxin, compelling full restitution',
        resultVi: 'Trước khi chất độc phát tác, tên đào tẩu run rẩy ký lệnh chuyển toàn bộ tài sản về kho ngầm của The Pinky. Ban chấp hành đánh giá cao sự khôn ngoan và chuẩn xác của bạn, phong bạn làm Sworn Blade.',
        resultEn: 'Before the toxin took hold, the trembling fugitive signed over every stolen coin back to the Pinky vaults. The Directorate commended your subtle intellect, confirming your promotion to Sworn Blade.',
        setFingerRank: 1,
        flagsAdd: ['promo_pinky_blade_done'],
        meritAdd: 22,
        effects: { wealth: +45, rep: +22, network: +15, sanity: +8 }
      },
      {
        labelVi: 'Lui về ẩn mình trong bóng tối ngõ hẻm để quan sát kỹ hơn',
        labelEn: 'Fade into the alley shadows to reconnoiter before striking',
        resultVi: 'Bạn dành thêm thời gian quan sát mục tiêu từ xa, giữ nhịp thở ổn định và tĩnh dưỡng sức khỏe.',
        resultEn: 'You took time to scout from the shadows, maintaining steady breathing and resting your body.',
        effects: { health: +16, sanity: +14, wealth: +6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Pinky: Initiate -> Sworn Blade (Branch 2: Bloodline Pact)
  {
    id: 'syn_pinky_promo_blade_oath',
    age: [19, 58],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Pinky', fingerRank: 0 },
    forbids: ['promo_pinky_blade_done'],
    vi: "[Sợi chỉ đỏ] Một thương nhân định bội giao kèo ba mươi năm với The Pinky. Bạn phải đến bên giường ông ta lúc nửa đêm và buộc chỉ đỏ vào ngón út, đủ để ông ta nhớ lời hứa.",
    en: "[The Red Thread] A merchant plans to break a thirty-year agreement with The Pinky. You are to stand by their bed at midnight and tie a red thread to their pinky, enough to remind them of their word.",
    choices: [
      {
        labelVi: "Vào lặng lẽ và buộc sợi chỉ đỏ mà không làm động một hạt bụi",
        labelEn: "Slip in quietly and tie the thread without disturbing a speck of dust",
        resultVi: "Sáng hôm sau, vị thương nhân tỉnh dậy thấy sợi chỉ, quỳ ngay xuống sàn và chuyển gấp ba tiền cống nạp về kho của The Pinky. Các trưởng bối nhắc đến tài của bạn bằng một chữ: sạch. Bạn nhận nhẫn Sworn Blade.",
        resultEn: "In the morning the merchant wakes to the thread, drops to the floor and sends three times the tribute to The Pinky’s vault. The elders describe your work with one word: clean. You receive the Sworn Blade ring.",
        setFingerRank: 1,
        flagsAdd: ['promo_pinky_blade_done'],
        meritAdd: 24,
        effects: { rep: +24, wealth: +40, network: +18, sanity: +10 }
      },
      {
        labelVi: "Hạ toán vệ sĩ thuê mà thương nhân giấu sẵn để phục kích sứ giả của The Pinky",
        labelEn: "Take out the hired guards the merchant hid to ambush The Pinky’s envoys",
        resultVi: "Toán vệ sĩ ngã xuống không một tiếng động. Vị thương nhân run lẩy bẩy, xin tha mạng và hứa trả đủ nợ. Bạn nhận nhẫn Sworn Blade.",
        resultEn: "The guards go down without a sound. The merchant shakes, begs for mercy and promises to pay in full. You receive the Sworn Blade ring.",
        setFingerRank: 1,
        flagsAdd: ['promo_pinky_blade_done'],
        meritAdd: 25,
        effects: { health: -14, rep: +26, wealth: +35, sanity: +6 }
      },
      {
        labelVi: "Lùi vào bóng ngõ để quan sát thêm trước khi ra tay",
        labelEn: "Back into the alley shadows to watch longer before you act",
        resultVi: "Bạn ngồi sau một dãy thùng gỗ cả đêm, nhìn đèn trong nhà thương nhân tắt từng cái một và giữ nhịp thở đều.",
        resultEn: "You sit behind a stack of crates all night, watching the lights in the merchant’s house go out one by one, keeping your breath even.",
        effects: { health: +16, sanity: +14, wealth: +6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Pinky: Star -> Sovereign (Branch 1: Phantom Web)
  {
    id: 'syn_pinky_promo_sovereign',
    age: [25, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Pinky', fingerRank: 2 },
    forbids: ['promo_pinky_sovereign_done'],
    vi: "[Phòng hồ sơ The Pinky] Những sợi chỉ đen nối hồ sơ của các thế lực trong The City. Hana và vài Wing đang phối hợp thanh trừng mạng lưới này. Muốn ngồi ghế Sovereign, bạn phải giữ nó khỏi đứt.",
    en: "[The Pinky’s Archive] Black threads connect the files of every faction in The City. Hana and several Wings are coordinating a purge of this network. To sit in the Sovereign’s seat, you have to keep it from snapping.",
    choices: [
      {
        labelVi: "Giật những sợi chỉ ngầm để các phe tự quay sang nhau",
        labelEn: "Pull the hidden threads and turn the factions on each other",
        resultVi: "Chỉ với vài mẩu tin mật tuồn ra đúng giờ, các văn phòng Fixer và an ninh Wing quay sang thanh trừng nhau trong hỗn loạn. The Pinky ra khỏi cuộc mà không một vết xước. Bạn ngồi lên ngai Sovereign.",
        resultEn: "With a few secrets leaked at exactly the right hour, the Fixer offices and Wing security turn to purge each other in chaos. The Pinky comes out without a scratch. You sit on the Sovereign’s seat.",
        setFingerRank: 3,
        flagsAdd: ['promo_pinky_sovereign_done'],
        meritAdd: 50,
        effects: { rep: +50, wealth: +85, network: +50, sanity: +15 }
      },
      {
        labelVi: "Điều những lưỡi dao bóng đêm ra che cho dân trong ngõ khỏi làn đạn",
        labelEn: "Send the shadow blades to shield the alley residents from the crossfire",
        resultVi: "Những lưỡi dao vô hình của The Pinky chặn đạn lạc và cứu hàng nghìn người ở Backstreets. Bạn ngồi lên ngai Sovereign như một người được nhớ tới vì một điều tử tế.",
        resultEn: "The invisible blades of The Pinky stop stray rounds and save thousands in the Backstreets. You take the Sovereign’s seat as someone remembered for a kindness.",
        setFingerRank: 3,
        flagsAdd: ['promo_pinky_sovereign_done'],
        meritAdd: 45,
        effects: { rep: +45, network: +40, sanity: +20, wealth: +40 }
      },
      {
        labelVi: "Tĩnh tâm trong mật thất trước khi nhận vương miện",
        labelEn: "Sit quietly in the sanctum before taking the crown",
        resultVi: "Bạn ngồi yên cho nhịp thở đều lại và xem lại từng sợi chỉ trong mạng tin.",
        resultEn: "You sit still until your breathing evens out and go over each thread in the intelligence web.",
        effects: { health: +18, sanity: +14, wealth: +10 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Pinky: Star -> Sovereign (Branch 2: Apex Shadow Monarch)
  {
    id: 'syn_pinky_apex_monarch',
    age: [25, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Pinky', fingerRank: 2 },
    forbids: ['promo_pinky_sovereign_done'],
    vi: "[Ghế Sovereign] Các Sworn Blade chờ lệnh trong lúc hai Nest lôi mạng lưới The Pinky vào cuộc chiến riêng. Bạn vừa nhận quyền điều phối. Lệnh đầu tiên sẽ quyết định họ đi đâu tối nay.",
    en: '[Throne of Obsidian · Supreme Pinky Monarch] Shadows across the City seem to bend to your stride. Five thousand Sworn Blades raise their stilettos in absolute fealty. A covert war among Nest titans rages; how will you steer the City’s destiny?',
    choices: [
      {
        labelVi: 'Thống nhất toàn bộ mạng lưới hợp đồng ngầm, trở thành kẻ giật dây vô hình của The City',
        labelEn: 'Consolidate the global pact network, becoming the invisible puppeteer of the City',
        resultVi: 'Không một thế lực nào có thể ký kết hiệp ước hay khai chiến mà không qua bàn tay của bạn. The Pinky đạt tới đỉnh cao quyền lực chưa từng có trong lịch sử. Bạn là Sovereign Monarch huyền thoại.',
        resultEn: 'No faction could wage war or seal treaties without your silent consent. The Pinky attained unprecedented dominion. You rule as the immortal Sovereign Monarch.',
        setFingerRank: 3,
        flagsAdd: ['promo_pinky_sovereign_done'],
        meritAdd: 55,
        effects: { rep: +55, wealth: +100, network: +55, sanity: +20 }
      },
      {
        labelVi: 'Xóa sạch mọi món nợ máu cho những phận đời cùng khổ trong thế giới ngầm',
        labelEn: 'Erase all blood debts for the destitute underclass across the Backstreets',
        resultVi: 'Bạn hủy bỏ hàng triệu bản khế ước nô dịch, trả lại tự do cho vô số con người. Toàn bộ Backstreets tôn bạn làm Đấng Cứu Thế Bóng Đêm.',
        resultEn: 'You dissolved millions of predatory bond contracts, liberating countless souls. The Backstreets hail you as the Shadow Redeemer.',
        setFingerRank: 3,
        flagsAdd: ['promo_pinky_sovereign_done'],
        meritAdd: 52,
        effects: { rep: +60, network: +50, sanity: +25, wealth: +30 }
      },
      {
        labelVi: 'Tĩnh tâm dưỡng sức trong mật thất trước khi nhận lãnh vương miện bóng đêm',
        labelEn: 'Rest in the subterranean sanctum before accepting the crown of shadows',
        resultVi: 'Bạn dành thêm thời gian điều hòa hơi thở và kiểm tra lại các mạng lưới mật báo.',
        resultEn: 'You took time to center your breathing and review the intelligence threads.',
        effects: { health: +18, sanity: +14, wealth: +10 }
      }
    ]
  },

  // ============================================================================
  // SYSTEMATIC PROMOTION LADDERS (WING EMPLOYEES / FEATHERS)
  // ============================================================================

  // ------------------------------------------------------------------ Wing: Intern -> Feather
  {
    id: 'wing_promo_feather_r1',
    age: [19, 55],
    major: true,
    weight: 95,
    need: { jobs: ['Wing Employee'], wingRank: 0 },
    forbids: ['Distorted', 'promo_wing_feather_done'],
    vi: "[Hồ sơ Feather] Hết kỳ thử việc, Wing gọi bạn đến kiểm tra lòng trung thành và cấy chip định danh. Qua được, bạn có quyền cư trú tại Nest. Bản đồng ý phẫu thuật đặt cạnh hợp đồng lao động.",
    en: '[Official Feather Commission · Nest Clearance Audit] Your grueling corporate probation concludes. Human Resources issues an urgent summons. To become an official Feather entitled to Nest residency and corporate shield, you must pass ideological loyalty screening and undergo biometric spinal chip integration.',
    choices: [
      {
        labelVi: 'Ký hiệp ước bảo mật Singularity bằng máu và hoàn thành cấy ghép sinh trắc học',
        labelEn: 'Sign the blood-bound Singularity NDA and undergo spinal chip implantation',
        resultVi: 'Mũi khoan y tế rít lên sau gáy bạn, cố định con chip vàng sáng chói. Tấm thẻ nhân viên Feather hạng A sáng lên trên ngực áo của bạn. Từ hôm nay, bạn được tự do ra vào Nest mà không bị lính gác chặn lại.',
        resultEn: 'The surgical drill hummed against your cervical vertebra, locking the gleaming chip in place. Your Grade-A Feather ID pulsed to life. From today, you walk freely through the Nest gates with full citizen rights.',
        setWingRank: 1,
        flagsAdd: ['promo_wing_feather_done', 'Feather', 'Nest'],
        meritAdd: 20,
        effects: { health: -10, wealth: +25, rep: +18, network: +15 }
      },
      {
        labelVi: 'Vạch trần một âm mưu tuồn dữ liệu Singularity của đối thủ trong phòng ban',
        labelEn: 'Expose a corporate espionage ring within your department during clearance audit',
        resultVi: 'Bằng chứng sắc bén của bạn khiến đặc vụ gián điệp bị Cục An ninh khống chế ngay tại chỗ. Ban Giám Đốc lập tức phê duyệt đặc cách thăng cấp bạn lên Feather chính thức kèm một khoản tiền thưởng kếch xù.',
        resultEn: 'Your damning audit dossiers caught the corporate mole red-handed before security enforcers. The Board fast-tracked your Feather commission with executive honors and a generous cash bonus.',
        setWingRank: 1,
        flagsAdd: ['promo_wing_feather_done', 'Feather', 'Nest'],
        meritAdd: 24,
        effects: { rep: +24, wealth: +45, network: +20, sanity: +5 }
      }
    ]
  },

  // ------------------------------------------------------------------ Wing: Feather -> Section Chief / Singularity Specialist
  {
    id: 'wing_promo_specialist_r2',
    age: [21, 65],
    major: true,
    weight: 95,
    need: { jobs: ['Wing Employee'], wingRank: 1 },
    forbids: ['Distorted', 'promo_wing_specialist_done'],
    vi: "[Lõi Singularity rò rỉ] Còi báo vang trong tầng hầm Wing. Thùng chứa nứt, hệ thống phòng thủ tê liệt, kỹ sư mắc kẹt bên trong. Người quản lý đã bỏ chạy; đội còn lại nhìn bạn chờ lệnh.",
    en: '[Singularity Core Breach: Section Chief Promotion · Wing R&D] Disaster sirens wail through the deepest subterranean research vault. A Singularity containment cell ruptured, spewing aberrant radiation that disabled automated bulkheads and trapped senior staff. The director fled, leaving the sector’s fate in your hands.',
    choices: [
      {
        labelVi: 'Mặc bộ đồ bảo hộ chống dị thể, tự tay lao vào tâm chấn vặn van an toàn',
        labelEn: 'Don the hazmat armature, plunging into the epicenter to manually seal the primary valve',
        resultVi: 'Nhiệt lượng và bức xạ Singularity làm bỏng rát da thịt qua lớp giáp, nhưng bàn tay kiên định của bạn đã khóa chặt van trước khi lõi phát nổ. Ban Điều Hành công nhận bạn là người hùng và trao quyết định bổ nhiệm Trưởng Bộ Phận (Section Chief).',
        resultEn: 'Singularity heat seared your flesh through the seals, yet your steady hands torqued the valve shut seconds before critical detonation. The Executive Board hailed your valor, confirming your appointment as Section Chief.',
        setWingRank: 2,
        flagsAdd: ['promo_wing_specialist_done'],
        meritAdd: 32,
        effects: { health: -20, sanity: -12, rep: +35, wealth: +60 }
      },
      {
        labelVi: 'Tái lập trình thuật toán điều hướng dòng năng lượng, giải tỏa áp suất từ phòng điều khiển',
        labelEn: 'Recalibrate the energy dispersal algorithms, venting the overpressure from the control room',
        resultVi: 'Mười ngón tay lướt thoăn thoắt trên bảng điều khiển lượng tử. Dòng năng lượng Singularity hung hãn được bạn uốn nắn trở lại các bể chứa an toàn. Bạn được phong danh hiệu Chuyên Viên Cao Cấp Điểm Dị Thường (Singularity Specialist).',
        resultEn: 'Your fingers danced across the quantum terminal. The raging Singularity discharge was steered smoothly into secondary reserve reservoirs. You were decorated as a Senior Singularity Specialist.',
        setWingRank: 2,
        flagsAdd: ['promo_wing_specialist_done'],
        meritAdd: 30,
        effects: { sanity: +10, rep: +30, wealth: +55, network: +25 }
      }
    ]
  },

  // ============================================================================
  // PINNACLE ASCENSION TRIALS (THE FIVE FINGERS · WORKSHOP · WING EXECUTIVES)
  // ============================================================================

  // ------------------------------------------------------------------ The Thumb (Branch 1: Grand Etiquette Purge)
  {
    id: 'syn_thumb_underboss_purge',
    age: [24, 70],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Thumb', fingerRank: 2 },
    forbids: ['promo_thumb_underboss_done'],
    vi: "[Danh sách thanh trừng] Một Sottocapo bị xử vì bất kính. Capo dei Capi trao bạn súng bạc và tên các chi nhánh từng theo người ấy. \"Lòng trung thành bắt đầu từ việc bạn làm với danh sách này.\"",
    en: "[The Purge List] A Sottocapo is executed for disrespect. The Capo dei Capi hands you a silver pistol and the names of the branches that followed him. “Loyalty begins with what you do with this list.”",
    choices: [
      {
        labelVi: "Thi hành thanh trừng đúng lễ nghi và trở thành Underboss",
        labelEn: "Carry out the purge with perfect etiquette and become Underboss",
        setFingerRank: 3,
        recordsAdd: ['thumb_underboss'],
        flagsAdd: ['promo_thumb_underboss_done'],
        effects: { health: -20, sanity: -10, rep: +42, wealth: +50 },
        scarsAdd: ['Sự tuân phục tuyệt đối của The Thumb'],
        meritAdd: 50,
        resultVi: 'Suốt ba đêm, tiếng súng nổ theo đúng nhịp điệu lễ nghi của The Thumb. Bạn không nói thừa một từ, không bắn trượt một viên. Capo dei Capi tự tay trao cho bạn chiếc áo choàng Sottocapo / Underboss: "Từ nay, lời của mày là lễ nghi."',
        resultEn: "For three nights the gunfire keeps the exact rhythm of Thumb etiquette. You say no wasted word and miss no shot. The Capo dei Capi drapes the Underboss mantle over your shoulders in person: “From now on, your word is etiquette.”"
      },
      {
        labelVi: "Chĩa súng vào chính bàn tiệc và bẻ xiềng của The Thumb",
        labelEn: "Turn the gun on the banquet table and break The Thumb’s chains",
        flagsAdd: ['ThumbTraitor'],
        effects: { health: -35, sanity: +15, rep: +30, heat: +50 },
        scarsAdd: ['Kẻ đào tẩu vĩ đại của The Thumb'],
        meritAdd: 30,
        resultVi: "Bạn bắn nổ chùm đèn pha lê và mở một đường máu ra khỏi sảnh giữa mưa đạn. Bạn tự do, nhưng The Thumb sẽ săn bạn tới cùng.",
        resultEn: "You shoot out the crystal chandelier and carve a bloody path out of the hall under a rain of lead. You are free, but The Thumb will hunt you to the end."
      },
      {
        labelVi: "Xin hoãn buổi khảo hạch để bảo dưỡng vũ khí và dưỡng thương",
        labelEn: "Ask to defer the test to service your weapons and recover",
        resultVi: "Bạn xin hoãn khảo hạch để chuẩn bị chỉn chu hơn. Underboss đồng ý cho bạn thời gian nghỉ.",
        resultEn: "You ask to defer the test to prepare more carefully. The Underboss gives you time to rest.",
        effects: { health: +18, sanity: +14, wealth: +10 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Thumb (Branch 2: Marble Throne of District 8)
  {
    id: 'syn_thumb_apex_godfather',
    age: [24, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Thumb', fingerRank: 2 },
    forbids: ['promo_thumb_underboss_done'],
    vi: "[Chiến thư trên ghế Underboss] Người tiền nhiệm rời ghế. Khi bạn đến nhận chức, ba Syndicate đòi chia lãnh địa của The Thumb. Các Capo đã tập hợp, chờ bạn trả lời chiến thư.",
    en: "[Declaration of War on the Underboss’s Chair] The previous holder steps down. As you arrive to take the seat, three Syndicates demand a share of The Thumb’s territory. The Capos have gathered and wait for your answer to the ultimatum.",
    choices: [
      {
        labelVi: "Tuyên chiến toàn diện và nghiền nát ba Syndicate trong ba đêm",
        labelEn: "Declare total war and break all three Syndicates in three nights",
        resultVi: "Súng cao áp nổ suốt bảy mươi hai giờ. Khi nó dừng, lãnh địa của ba Syndicate chỉ còn là những dãy tường cháy. Bạn ngồi lên ghế Underboss trong một căn phòng không ai dám ho.",
        resultEn: "High-pressure guns fire for seventy-two hours. When they stop, the territory of the three Syndicates is rows of burnt walls. You sit in the Underboss’s chair in a room where nobody dares to cough.",
        setFingerRank: 3,
        recordsAdd: ['thumb_underboss'],
        flagsAdd: ['promo_thumb_underboss_done'],
        meritAdd: 55,
        effects: { health: -18, rep: +55, wealth: +80, sanity: +12 }
      },
      {
        labelVi: "Mời các thủ lĩnh đối phương đến một bữa tiệc và buộc họ ký văn tự thần phục",
        labelEn: "Invite the rival bosses to a banquet and make them sign oaths of submission",
        resultVi: "Bạn không nâng giọng lần nào. Từng thủ lĩnh quỳ xuống, tự cắt một ngón tay làm lời thề, và The Thumb mở rộng địa bàn mà không tốn một viên đạn. Bạn là Underboss mà người ta sẽ kể lại nhiều năm.",
        resultEn: "You never raise your voice. One by one the bosses kneel and cut off a finger as their oath, and The Thumb grows without spending a round. You are the Underboss they will talk about for years.",
        setFingerRank: 3,
        recordsAdd: ['thumb_underboss'],
        flagsAdd: ['promo_thumb_underboss_done'],
        meritAdd: 50,
        effects: { rep: +50, wealth: +90, network: +45, sanity: +15 }
      },
      {
        labelVi: "Hoãn buổi tấn phong để củng cố phòng tuyến và dưỡng thương",
        labelEn: "Delay the investiture to shore up the lines and heal",
        resultVi: "Bạn dùng thời gian thêm để vết thương lành và kiểm lại từng khẩu súng trước khi ngồi lên ghế.",
        resultEn: "You use the extra time to heal and check every gun before you take the seat.",
        effects: { health: +18, sanity: +14, wealth: +10 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Index (Branch 1: The Golden Prescript)
  {
    id: 'syn_index_weaver_prescript',
    age: [22, 70],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Index', fingerRank: 2 },
    forbids: ['promo_index_weaver_done'],
    vi: "[Prescript dát vàng] Yan Vismok gửi bạn lệnh đến District 11 lúc 2:45 sáng: chặt tay cầm vũ khí của một Fixer đang uống trà, nuốt một đồng xu gỉ, rồi bước lên thềm Proxy và Weaver. Bạn còn một đêm.",
    en: '[The Index · The Golden Prescript] A gilded Prescript from Yan Vismok fluttered down before you. The calligraphy cut like a blade:\n“Walk to District 11 at 2:45 AM. Sever the weapon-arm of the Fixer sipping tea, and swallow a rusted coin. Thereafter, ascend the Proxy steps.”',
    choices: [
      {
        labelVi: 'Tuyệt đối phục tùng Ý Chỉ: Khai mở kiếm Proxy & Weaver',
        labelEn: 'Absolute obedience to the Prescript: Unlock Proxy blade & Weaver rank',
        setFingerRank: 3,
        recordsAdd: ['index_proxy'],
        flagsAdd: ['promo_index_weaver_done'],
        effects: { health: -18, sanity: -14, rep: +40, resonance: +30 },
        scarsAdd: ['Người thi hành Ý Chỉ tối cao'],
        meritAdd: 50,
        resultVi: 'Bạn làm chính xác từng chữ trong Prescript không một giây do dự. Khi nhát chém hoàn tất và đồng xu trôi qua cuống họng, một Proxy áo trắng bước ra từ bóng tối, trao cho bạn thanh kiếm của The Index. "Ý Chỉ đã dệt xong vị trí của bạn."',
        resultEn: 'You executed every word of the Prescript without a moment’s hesitation. As the cut completed and the rusted coin cleared your throat, a white-robed Proxy emerged from the fog, handing you the Index blade: “The Prescripts have woven your seat.”'
      },
      {
        labelVi: 'Xé toạc lá Prescript dát vàng trước mặt sứ giả',
        labelEn: 'Tear the gilded Prescript to shreds before the Messenger',
        flagsAdd: ['IndexHeretic'],
        effects: { health: -30, sanity: +20, rep: +25, heat: +50 },
        scarsAdd: ['Kẻ xé Prescript'],
        meritAdd: 20,
        resultVi: 'Những mảnh giấy vàng rơi lả tả xuống vũng nước bẩn. Sứ giả nghiêng đầu nhìn bạn: "Sự phản bội của bạn cũng đã nằm trong Prescript tiếp theo." Bạn quay gót bỏ đi, chuẩn bị cho những cuộc ám sát không hồi kết.',
        resultEn: 'Golden paper scraps scattered across the dirty puddle. The Messenger tilted their head: “Your treason was also written in the subsequent Prescript.” You turned and walked away, bracing for endless Proxy assassinations.'
      },
      {
        labelVi: 'Tạm lùi lại phân tích sâu hơn các tầng nghĩa ẩn của bản Chỉ Lệnh',
        labelEn: 'Defer execution to parse the deeper metaphysical layers of the Prescript',
        resultVi: 'Bạn dành thêm thời gian giải mã các câu từ phức tạp của bản Chỉ Lệnh, ổn định tâm trạng và tĩnh dưỡng cơ thể.',
        resultEn: 'You withdrew into deep grammatical study of the Prescript, stabilizing your sanity and resting your body.',
        effects: { health: +18, sanity: +14, resonance: +8 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Index (Branch 2: Grand Proxy of the Subterranean Loom)
  {
    id: 'syn_index_grand_proxy_flow',
    age: [22, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Index', fingerRank: 2 },
    forbids: ['promo_index_weaver_done'],
    vi: '[Đại Sứ Giả Tối Cao Của Khung Cửi · Phong Hàm Index Weaver] Cỗ máy dệt cơ khí ngầm phát ra hàng ngàn cuộn tơ vàng óng ánh hội tụ dưới chân bạn. Là người hiểu sâu sắc nhất về Dòng Chảy, bạn được triệu hồi để viết tiếp những chỉ lệnh định hình sự cân bằng nhân quả của toàn bộ The City.',
    en: '[Grand Proxy of the Subterranean Loom · Index Weaver Investiture] The subterranean mechanical loom weaves ten thousand golden threads converging at your feet. As the master interpreter of the Flow, you are summoned to author the Prescripts governing City equilibrium.',
    choices: [
      {
        labelVi: 'Dệt nên bản Chỉ Lệnh Đại Cục, cứu vãn một quận khỏi thảm họa tuyệt diệt',
        labelEn: 'Weave the Grand Prescript, averting catastrophic annihilation across an entire District',
        resultVi: 'Ngón tay bạn lướt trên khung cửi vàng, sắp đặt hàng ngàn sự kiện ngẫu nhiên kỳ diệu giúp cả quận thoát khỏi thảm họa. Bạn được các Proxy và Weaver suy tôn làm Đại Sứ Giả Tối Cao.',
        resultEn: 'Your fingers danced across the gilded loom, weaving miraculous synchronicity that spared the District from doom. The Proxies and Weavers bowed to the Supreme Grand Proxy.',
        setFingerRank: 3,
        recordsAdd: ['index_proxy'],
        flagsAdd: ['promo_index_weaver_done'],
        meritAdd: 55,
        effects: { rep: +52, resonance: +35, wealth: +60, sanity: +15 }
      },
      {
        labelVi: 'Cầm Đại Kiếm Proxy trấn thủ cửa hang khung cửi, đẩy lùi đội quân xâm nhập',
        labelEn: 'Stand guard at the loom sanctuary, repelling an invading army with the Proxy blade',
        resultVi: 'Đại kiếm xé tan màn đêm, không một kẻ thù nào dám tiến thêm nửa bước. Khung cửi dệt xong chiếc áo choàng Thần Dệt phủ lên vai bạn. Bạn chính thức bước lên đỉnh cao The Index.',
        resultEn: 'Your blade parted the dark, repelling all invaders. The loom completed the Weaver mantle, draping it over your shoulders. You ascended to the pinnacle of the Index.',
        setFingerRank: 3,
        recordsAdd: ['index_proxy'],
        flagsAdd: ['promo_index_weaver_done'],
        meritAdd: 55,
        effects: { health: -18, rep: +50, wealth: +55, sanity: +12 }
      },
      {
        labelVi: 'Tạm lùi lại phân tích sâu hơn các tầng nghĩa ẩn của bản Chỉ Lệnh',
        labelEn: 'Defer execution to parse the deeper metaphysical layers of the Prescript',
        resultVi: 'Bạn dành thêm thời gian giải mã các câu từ phức tạp của bản Chỉ Lệnh, ổn định tâm trạng và tĩnh dưỡng cơ thể.',
        resultEn: 'You withdrew into deep grammatical study of the Prescript, stabilizing your sanity and resting your body.',
        effects: { health: +18, sanity: +14, resonance: +8 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Middle (Branch 1: The Master Vendetta)
  {
    id: 'syn_middle_great_brother_vendetta',
    age: [24, 70],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Middle', fingerRank: 2 },
    forbids: ['promo_middle_apex_done'],
    vi: "[Món nợ hai mươi năm] Book of Vengeance chỉ đến kẻ từng hại một người em. Hắn trốn trong pháo đài District 14 cùng năm mươi tay súng. Gia đình muốn bạn dẫn đầu cuộc đòi nợ.",
    en: "[The Twenty-Year Debt] The Book of Vengeance points to someone who once hurt a younger sibling. He hides in a District 14 fortress with fifty gunmen. The Family wants you to lead the collection.",
    choices: [
      {
        labelVi: "Dẫn gia đình đột phá pháo đài và trở thành Great Sibling",
        labelEn: "Lead the Family through the fortress and become Great Sibling",
        setFingerRank: 3,
        recordsAdd: ['middle_big_sibling'],
        flagsAdd: ['promo_middle_apex_done'],
        effects: { health: -22, sanity: +10, rep: +45, wealth: +40 },
        scarsAdd: ['Nắm đấm sắt của The Middle'],
        meritAdd: 55,
        resultVi: "Bạn đấm bung cánh cửa sắt rồi quét qua pháo đài bằng sợi xích dính máu. Tên kẻ thù bị gạch một nét đỏ đậm trong Book of Vengeance. Hàng trăm người em của The Middle gọi bạn bằng một tiếng: Great Sibling.",
        resultEn: "You punch the iron door open and sweep the fortress with a blood-slick chain. The enemy’s name is struck out with a thick red line in the Book of Vengeance. Hundreds of Middle siblings call you by a single name: Great Sibling."
      },
      {
        labelVi: "Đòi bồi thường và một lời xin lỗi công khai cho người em bị hại",
        labelEn: "Demand restitution and a public apology for the wronged sibling",
        effects: { wealth: +75, rep: +30, sanity: +15 },
        setFingerRank: 3,
        recordsAdd: ['middle_big_sibling'],
        flagsAdd: ['promo_middle_apex_done'],
        meritAdd: 48,
        resultVi: "Kẻ thù quỳ xuống, giao nộp khoản bồi thường và cúi đầu xin lỗi trước toàn gia đình. Bạn trở thành Great Sibling được kính vì sự điềm tĩnh hơn là vì nắm đấm.",
        resultEn: "The enemy kneels, hands over the restitution and bows an apology before the whole Family. You become a Great Sibling respected for your calm more than for your fists."
      },
      {
        labelVi: "Uống với các anh em trong quán ngầm để lấy lại sức trước",
        labelEn: "Drink with the siblings in the underground bar to recover first",
        resultVi: "Bạn ngồi với anh em cả đêm, uống hết một thùng bia mạch nha và băng lại các vết bầm.",
        resultEn: "You sit with the siblings all night, finish a keg of malt beer and bandage the bruises.",
        effects: { health: +18, sanity: +14, wealth: -6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Middle (Branch 2: Apex Patriarch of the Clan)
  {
    id: 'syn_middle_apex_patriarch',
    age: [24, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Middle', fingerRank: 2 },
    forbids: ['promo_middle_apex_done'],
    vi: "[Ngai Great Sibling · The Middle] Hàng chục nghìn người em của The Middle trên khắp The City hướng mắt về bạn. Lễ nhận ngôi Great Sibling vừa bắt đầu thì một nhóm Fixer cấp cao cùng cảnh binh quận định vây một khu chợ Backstreets của gia tộc.",
    en: "[The Great Sibling’s Seat · The Middle] Tens of thousands of Middle siblings across The City turn to look at you. The ceremony for the Great Sibling’s seat has just begun when a group of high-grade Fixers and district police move to surround a Family market in the Backstreets.",
    choices: [
      {
        labelVi: "Dẫn quân đoàn xích tím đánh tan kẻ xâm phạm ngay giữa quảng trường",
        labelEn: "Lead the purple-chain legion and break the intruders in the square",
        resultVi: "Cơn bão xích tím quét qua những kẻ dám thách thức Gia Tộc. Tiếng hô của các người em làm rung kính các cửa sổ quanh quảng trường. Bạn bước lên ngai Great Sibling.",
        resultEn: "A storm of purple chains sweeps over those who dared challenge the Family. The siblings’ shout rattles the windows around the square. You step onto the Great Sibling’s seat.",
        setFingerRank: 3,
        recordsAdd: ['middle_big_sibling'],
        flagsAdd: ['promo_middle_apex_done'],
        meritAdd: 60,
        effects: { health: -18, rep: +60, wealth: +70, sanity: +18 }
      },
      {
        labelVi: "Lập lời thề bảo hộ từng người em trước bàn thờ tổ phụ",
        labelEn: "Swear to protect each sibling before the ancestral altar",
        resultVi: "Lời thề của bạn ngắn, và ai nghe cũng nhớ được. Sau đêm đó The Middle đứng cùng nhau như một bức tường mà không Fixer nào muốn thử. Bạn ngồi lên ngai Great Sibling.",
        resultEn: "Your oath is short, and everyone who hears it remembers it. After that night The Middle stands together like a wall no Fixer wants to test. You sit on the Great Sibling’s seat.",
        setFingerRank: 3,
        recordsAdd: ['middle_big_sibling'],
        flagsAdd: ['promo_middle_apex_done'],
        meritAdd: 55,
        effects: { rep: +55, network: +50, wealth: +60, sanity: +22 }
      },
      {
        labelVi: "Ngồi với những người em nhỏ tuổi nhất trước khi bước lên ngai",
        labelEn: "Sit with the youngest siblings before you take the seat",
        resultVi: "Bạn ngồi với những người em nhỏ tuổi nhất và nghe họ tả khu chợ mà bạn sắp phải bảo vệ.",
        resultEn: "You sit with the youngest siblings and listen to them describe the market you are about to defend.",
        effects: { health: +18, sanity: +14, wealth: -6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Pinky (Branch 1: Star of the Sky Ascent)
  {
    id: 'syn_pinky_star_blade_pinnacle',
    age: [22, 65],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Pinky', fingerRank: 1 },
    forbids: ['promo_pinky_star_done'],
    vi: "[Ngọn đuốc trên tháp] Người gác The Pinky chờ bạn ở tháp chuông gần rìa The City. Họ đặt lưỡi kiếm lên đe: muốn nhận danh Star of the Sky, bạn phải nhỏ máu và giữ lời thề sau đó.",
    en: '[The Pinky · Star of the Sky Ascent] In the dead of night, you ascended the ruined bell tower on the Outskirts border of The Pinky. Cold wind screamed through stone gaps. The Pinky guardian lit a cyan torch:\n“Only those willing to bind their lifeforce to the blade may become a Star of the Sky. Do you dare spill your blood upon the anvil?”',
    choices: [
      {
        labelVi: 'Nhỏ máu lập thệ: Đoạt danh hiệu Star of the Sky',
        labelEn: 'Spill blood and swear the vow: Claim Star of the Sky',
        setFingerRank: 2,
        recordsAdd: ['pinky_star'],
        flagsAdd: ['promo_pinky_star_done'],
        effects: { health: -16, sanity: +20, rep: +42, resonance: +35 },
        scarsAdd: ['Lời thề Thiên Tinh The Pinky'],
        meritAdd: 50,
        resultVi: 'Máu bạn ngấm vào thanh kiếm cổ xưa. Lưỡi kiếm phát ra ánh sáng lam ngọc rực rỡ như một ngôi sao rực cháy trên bầu trời đêm. Bạn trở thành Thiên Tinh (Star of the Sky) của The Pinky, người bảo vệ biên cương The City.',
        resultEn: 'Your blood sank into the ancestral blade. It ignited in brilliant sapphire light like a burning star against the night sky. You became a Star of the Sky of The Pinky, sentinel of the City’s border.'
      },
      {
        labelVi: 'Rút tay lại: Giữ lấy sinh mạng cho chính mình',
        labelEn: 'Pull your hand back: Preserve your life for yourself',
        effects: { sanity: +10, health: +15 },
        resultVi: 'Ngọn đuốc xanh tắt ngấm. Bạn bước xuống tháp chuông trong im lặng, sống sót như một lưỡi kiếm tự do.',
        resultEn: 'The cyan torch guttered out. You descended the bell tower in silence, surviving as a free blade.'
      },
      {
        labelVi: 'Lui về ẩn mình trong bóng tối ngõ hẻm để quan sát kỹ hơn',
        labelEn: 'Fade into the alley shadows to reconnoiter before striking',
        resultVi: 'Bạn dành thêm thời gian quan sát mục tiêu từ xa, giữ nhịp thở ổn định và tĩnh dưỡng sức khỏe.',
        resultEn: 'You took time to scout from the shadows, maintaining steady breathing and resting your body.',
        effects: { health: +16, sanity: +14, wealth: +6 }
      }
    ]
  },

  // ------------------------------------------------------------------ The Pinky (Branch 2: Shadow Arbiter of Pacts)
  {
    id: 'syn_pinky_promo_shadow_arbiter',
    age: [22, 65],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Pinky', fingerRank: 1 },
    forbids: ['promo_pinky_star_done'],
    vi: '[Phán Quan Bóng Đêm · Khảo Thí Thiên Tinh The Pinky] Một bản hợp đồng máu cổ đại bị đánh cắp bởi một tổ chức buôn lậu công nghệ Singularity. The Pinky yêu cầu một Sworn Blade tài năng phải truy vết và thu hồi bản hợp đồng mà không để rò rỉ bất kỳ thông tin nào ra bên ngoài.',
    en: '[Shadow Arbiter · Pinky Star of the Sky Crucible] An ancient blood pact was stolen by singularity smugglers. The Pinky commissions an elite Sworn Blade to track and recover the dossier without a whisper leaking to the outside world.',
    choices: [
      {
        labelVi: 'Thâm nhập hầm ngầm của băng buôn lậu, thu hồi tài liệu và thiêu rụi toàn bộ chứng cứ',
        labelEn: 'Infiltrate the smuggling vault, secure the pact, and incinerate all remaining traces',
        resultVi: 'Lưỡi dao của bạn lướt đi trong bóng tối không một tiếng động. Bản hợp đồng nguyên vẹn được đặt lên bàn Hội Đồng. Ánh sáng lam ngọc bừng nở trên cổ tay bạn: Bạn chính thức là Thiên Tinh (Star of the Sky).',
        resultEn: 'Your stilettos danced in absolute silence. The intact pact was placed before the Directorate. Sapphire luminescence blossomed on your wrist: You are ordained as a Star of the Sky.',
        setFingerRank: 2,
        recordsAdd: ['pinky_star'],
        flagsAdd: ['promo_pinky_star_done'],
        meritAdd: 52,
        effects: { health: -14, rep: +45, wealth: +45, sanity: +15 }
      },
      {
        labelVi: 'Thao túng thị trường chợ đen, ép kẻ trộm tự đem nạp lại tài liệu nguyên vẹn',
        labelEn: 'Corner black-market brokers, forcing the thief to surrender the document unconditionally',
        resultVi: 'Bằng mạng lưới tống tiền ngầm tinh vi, bạn bóp nghẹt mọi đường thoát của kẻ trộm. Hắn tự quỳ trước cửa The Pinky nạp lại tài liệu. Ban lãnh đạo trao danh hiệu Thiên Tinh cho bạn.',
        resultEn: 'Through surgical intelligence leverage, you choked every avenue of escape. The thief knelt before the Pinky gates in unconditional surrender. You were crowned a Star of the Sky.',
        setFingerRank: 2,
        recordsAdd: ['pinky_star'],
        flagsAdd: ['promo_pinky_star_done'],
        meritAdd: 50,
        effects: { rep: +46, network: +40, wealth: +55, sanity: +18 }
      },
      {
        labelVi: 'Lui về ẩn mình trong bóng tối ngõ hẻm để quan sát kỹ hơn',
        labelEn: 'Fade into the alley shadows to reconnoiter before striking',
        resultVi: 'Bạn dành thêm thời gian quan sát mục tiêu từ xa, giữ nhịp thở ổn định và tĩnh dưỡng sức khỏe.',
        resultEn: 'You took time to scout from the shadows, maintaining steady breathing and resting your body.',
        effects: { health: +16, sanity: +14, wealth: +6 }
      }
    ]
  },

  // ------------------------------------------------------------------ Wing Executive Singularity Audit
  {
    id: 'wing_singularity_classified_audit',
    age: [26, 75],
    major: true,
    weight: 930,
    jobs: ['Wing Employee'],
    vi: "[Cửa hầm của Wing] Ban giám đốc cho bạn xem bí mật vận hành Singularity. Muốn vào ban điều hành, bạn phải chứng kiến nó mà vẫn giữ được bình tĩnh. Nếu không, Wing sẽ xóa ký ức buổi hôm nay.",
    en: '[Wing Board · Singularity Classified Audit] The Board summoned you to the deepest vault beneath the Nest. The singularity blast doors opened, revealing the grotesque truth powering the corporation. A Senior Executive looked upon you:\n“Every Feather seeking a seat on the executive board must gaze upon this truth without losing their mind. If you endure, you are a Senior Executive. If you falter, your memory will be purged.”',
    choices: [
      {
        labelVi: 'Nhìn thẳng vào vực thẳm Singularity: Đứng vững và bước vào ban điều hành',
        labelEn: 'Gaze into the Singularity abyss: Stand firm and claim Senior Executive seat',
        setWingRank: 3,
        recordsAdd: ['nest_migration'],
        effects: { health: -15, sanity: -32, wealth: +85, rep: +42 },
        scarsAdd: ['Bí mật đen tối của Wing'],
        meritAdd: 55,
        resultVi: 'Bạn nhìn thẳng vào cỗ máy kinh hoàng của Singularity. Mắt bạn rỉ máu, nhưng nụ cười của bạn vẫn giữ nguyên vẻ điềm tĩnh của một kẻ lọc lõi. Ban giám đốc vỗ tay chào đón: "Chào mừng Giám đốc cấp cao mới của Wing."',
        resultEn: 'You stared into the monstrosity of the Singularity. Your eyes bled, yet your expression retained the cold composure of an apex corporate survivor. The Board applauded: “Welcome, our newest Senior Executive.”'
      },
      {
        labelVi: 'Nhắm mắt quay đầu: Chấp nhận ở lại cấp bậc an toàn',
        labelEn: 'Avert your eyes: Accept safety at a subordinate rank',
        effects: { sanity: +15, rep: -10 },
        resultVi: 'Bạn lùi lại một bước. Bạn không phát điên, nhưng chiếc ghế trong ban điều hành đã khép lại vĩnh viễn.',
        resultEn: 'Stepping back, you kept your sanity, but the door to the executive boardroom closed forever.'
      }
    ]
  },

  // =========================================================================
  // THE FIVE FINGERS DEEP ARCS: THUMB, INDEX, MIDDLE, RING, PINKY
  // =========================================================================
  {
    id: 'syn_thumb_etiquette_execution',
    age: [19, 65],
    major: true,
    weight: 60,
    need: { jobs: ['Syndicate'], flags: ['FingerThumb'] },
    forbids: ['Distorted', 'thumb_etiquette_done'],
    vi: "[Một lời chen ngang] Trong tiệc của The Thumb, tân binh ngắt lời Capo. Ông ta đưa bạn khẩu súng có một viên đạn: \"Dạy nó lễ nghi.\" Cả bàn tiệc chờ bạn nhấc súng.",
    en: '[The Thumb’s Iron Etiquette] During a Thumb banquet, an initiate speaks out of turn before a Capo. Total silence engulfs the room. The Capo turns to you, handing you an ivory pistol loaded with a single round: "Teach him our etiquette."',
    choices: [
      {
        labelVi: 'Bắn thẳng vào trán kẻ bất kính, tuân thủ tuyệt đối trật tự của Bố Già',
        labelEn: 'Shoot the offender cleanly, upholding the Godfather’s absolute code',
        resultVi: 'Tiếng nổ đanh thép vang lên. Khói súng bốc lên từ nòng súng của bạn. Viên Capo gật đầu hài lòng, nâng bạn lên hàng cận vệ thân tín: "Tốt lắm. Kẻ không biết lễ nghi không có quyền hít thở không khí của The City."',
        resultEn: 'A sharp crack echoed. Smoke curled from your barrel. The Capo gave a nod of approval, elevating you to his personal retinue: "A man without manners has no right to draw breath in The City."',
        effects: { sanity: -15, rep: +30, wealth: +45, heat: +10 },
        meritAdd: 25,
        flagsAdd: ['thumb_etiquette_done', 'ThumbLoyalist']
      },
      {
        labelVi: 'Bắn sượt qua vành tai kẻ phạm lỗi, xin Capo tha mạng để hắn chuộc tội',
        labelEn: 'Graze his ear, petitioning the Capo for a trial by combat to atone',
        resultVi: 'Viên đạn xé rách vành tai người đàn em. Bạn quỳ một gối xuống, dẫn lời điều lệ số 42 của Thumb xin lãnh nhận một nhiệm vụ tử trận để chuộc lỗi cho thuộc cấp. Capo chấp thuận lời thỉnh cầu.',
        resultEn: 'Lead tore through cartilage. Dropping to one knee, you cited Thumb Rule 42 to request an ordeal of blood to atone for him. The Capo granted your plea.',
        effects: { sanity: +10, resonance: +12, rep: +18, health: -15 },
        meritAdd: 20,
        flagsAdd: ['thumb_etiquette_done']
      }
    ]
  },
  {
    id: 'syn_index_prescript_bizarre',
    age: [19, 68],
    major: true,
    weight: 60,
    need: { jobs: ['Syndicate'], flags: ['FingerIndex'] },
    forbids: ['Distorted', 'index_prescript_bizarre_done'],
    vi: '[Chỉ Lệnh Kỳ Quái của The Index] Một sứ giả mang mặt nạ lụa trắng (Proselyte) trao tận tay bạn tờ Prescript viết bằng mực đỏ rực: "Vào đúng 2:45 PM, hãy cởi chiếc ủng chân trái, đi lùi qua ngã tư District 10 và trao toàn bộ số Ahn bạn có cho người thứ bảy bạn nhìn thấy."',
    en: '[The Index’s Absurd Prescript] A white-masked Proselyte delivers a Prescript inked in vivid cinnabar: "At exactly 2:45 PM, remove your left boot, walk backwards through District 10’s crossroad, and surrender all Ahn you carry to the seventh soul you behold."',
    choices: [
      {
        labelVi: 'Tuân thủ tuyệt đối chỉ lệnh không một lời thắc mắc',
        labelEn: 'Follow the Prescript to the letter without hesitation',
        resultVi: 'Bạn đi lùi qua ngã tư chân trần, trao sạch tiền cho một bà lão ăn xin mù. Ngay tích tắc sau đó, một vụ sập cầu vượt kinh hoàng diễn ra đè nát toàn bộ người đi xuôi chiều. Bạn thoát chết trong gang tấc nhờ đi lùi. Dệt mạng số phận của Index thật đáng sợ.',
        resultEn: 'Walking backwards barefoot, you handed your purse to a blind beggar. Seconds later, an overpass collapsed, crushing everyone advancing forward. The Loom’s unfathomable weaving spared you.',
        effects: { sanity: +15, resonance: +25, wealth: -20, rep: +25 },
        meritAdd: 28,
        flagsAdd: ['index_prescript_bizarre_done', 'IndexDevotee']
      },
      {
        labelVi: 'Xé bỏ tờ Prescript, từ chối tuân theo sự phi lý trí của The City',
        labelEn: 'Tear up the Prescript, defying the City’s irrational mandate',
        resultVi: 'Mảnh giấy bốc cháy thành tàn tro đen kịt. Bạn giữ lại được tiền bạc, nhưng khắp các ngõ hẻm xung quanh, tiếng bước chân lạnh lẽo của các Proselyte bắt đầu bám theo sau lưng bạn.',
        resultEn: 'The parchment combusted into black soot. You saved your coins, but in surrounding alleys, the synchronized footfalls of stalking Proselytes locked onto your shadow.',
        effects: { sanity: -12, heat: +35, resonance: +20 },
        meritAdd: 15,
        flagsAdd: ['index_prescript_bizarre_done', 'IndexApostate'],
        scarsAdd: ['Kẻ đốt Prescript']
      }
    ]
  },
  {
    id: 'syn_middle_book_of_vengeance',
    age: [19, 65],
    major: true,
    weight: 60,
    need: { jobs: ['Syndicate'], flags: ['FingerMiddle'] },
    forbids: ['Distorted', 'middle_vengeance_done'],
    vi: '[Book of Vengeance của The Middle] Một Big Brother bắp tay cuồn cuộn vết xăm xích sắt bước vào sào huyệt, giở cuốn sách da dày cộp (Book of Vengeance): "Một gã Fixer Grade 4 vừa chém đứt ngón tay của một đứa em út trong xóm. Tên hắn đã viết bằng mực đỏ trên trang này. Ai sẽ đi đòi nợ máu?"',
    en: '[The Middle’s Book of Vengeance] A Big Brother with iron-chain tattoos slaps down the heavy leather tome: "A Grade 4 Fixer just severed the finger of an initiate in our ward. His name is inked in red. Who will collect the blood debt?"',
    choices: [
      {
        labelVi: 'Xung phong cầm đầu đội truy sát, săn lùng kẻ thù đến tận chân trời',
        labelEn: 'Step up to lead the vengeance cell, hunting him to the horizon',
        resultVi: 'Bạn cùng các anh em Middle vây ráp gã Fixer trong một xưởng thuộc da. Trận đòn tàn khốc kết thúc bằng việc chặt đứt cả hai bàn tay hắn để gạch tên khỏi Book of Vengeance. Cả băng đảng reo hò tên bạn.',
        resultEn: 'You and your Middle brothers cornered the Fixer in a tannery. A merciless beating severed both his hands, striking his name from the Book. The gang roared your name in triumph.',
        effects: { sanity: -14, rep: +35, wealth: +50, heat: +25 },
        meritAdd: 30,
        flagsAdd: ['middle_vengeance_done', 'MiddleEnforcer']
      },
      {
        labelVi: 'Đề xuất bắt thân chủ của gã Fixer bồi thường một khoản Ahn kếch xù',
        labelEn: 'Propose forcing the Fixer’s client to pay a crushing blood indemnity',
        resultVi: 'Đoàn Middle kéo đến đập nát văn phòng của thân chủ. Người thương nhân run rẩy nộp phạt gấp mười lần tiền công. Đứa em út được trang bị cánh tay kim loại mới toanh, bạn nhận được sự kính trọng.',
        resultEn: 'The Middle cell trashed the client’s manor. The merchant paid tenfold the bounty in terror. The initiate received a gilded cybernetic arm; you won deep respect.',
        effects: { wealth: +70, rep: +25, network: +20 },
        meritAdd: 26,
        flagsAdd: ['middle_vengeance_done']
      }
    ]
  },
  {
    id: 'syn_ring_atelier_exhibition',
    age: [20, 68],
    major: true,
    weight: 55,
    need: { jobs: ['Syndicate'], flags: ['FingerRing'] },
    forbids: ['Distorted', 'ring_exhibition_done'],
    vi: "[Triển lãm The Ring] Maestro dẫn bạn qua các tác phẩm ghép từ cơ thể còn sống. Ông trao cây cọ bằng xương: \"Đêm nay thêm một tác phẩm của bạn.\" Người xem đang vào cửa.",
    en: '[The Ring’s Sanguine Gallery] A Ring Maestro guides you into an underground salon: Dozens of human bodies sculpted into living, singing installations. The Maestro hands you a bone stylus: "Contribute your own masterpiece to tonight’s vernissage."',
    choices: [
      {
        labelVi: 'Khắc họa bức tranh điêu khắc giải phẫu học rợn người',
        labelEn: 'Sculpt a harrowing anatomical installation from syndicate captives',
        resultVi: 'Tác phẩm của bạn làm chấn động toàn bộ hội đồng Ring. Tiếng thét đau đớn hòa quyện thành bản giao hưởng kỳ quái. Bạn được công nhận là Học Sĩ Tiên Phong (Docent) của The Ring.',
        resultEn: 'Your creation stunned the Ring salon. Screams synthesized into an uncanny harmonic requiem. You were formally invested as a Ring Docent.',
        effects: { sanity: -30, resonance: +35, rep: +45, wealth: +60 },
        meritAdd: 35,
        flagsAdd: ['ring_exhibition_done', 'RingDocent']
      },
      {
        labelVi: 'Dùng màu vẽ thực vật và kim loại phế thải để tạo ra tác phẩm trừu tượng',
        labelEn: 'Use mineral pigments and scrap kinetic plating for abstract sculpture',
        resultVi: 'Không làm tổn hại cơ thể con người, tác phẩm trừu tượng lạnh lẽo của bạn làm Maestro thích thú vì "góc nhìn dị biệt". Bạn vượt qua kỳ sát hạch mà không đánh mất lý trí.',
        resultEn: 'Spill no mortal blood, your cold, abstract kinetic construct intrigued the Maestro for its "alien geometric detachment." You passed without psychic corrosion.',
        effects: { sanity: +10, resonance: +15, rep: +25, wealth: +35 },
        meritAdd: 25,
        flagsAdd: ['ring_exhibition_done']
      }
    ]
  },

  // =========================================================================
  // WING CORPORATE INTRIGUES & SINGULARITY CRISES
  // =========================================================================
  {
    id: 'wing_singularity_leak_crisis',
    age: [21, 65],
    major: true,
    weight: 60,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted', 'wing_leak_done'],
    vi: "[Rò rỉ Singularity] Ống chứa trong cơ sở Wing nứt vỡ. Khí lạ lan ra, biến đồng nghiệp thành mối nguy ngay trước mắt bạn. Phòng điều khiển sắp khóa; còn một phút để chọn ai được vào.",
    en: '[Wing Singularity Rupture Alert] Red klaxons scream through the subterranean R&D lab. A Singularity conduit fractured, spewing mutagenic vapor that converts researchers into feral cannibals. Blast doors seal in 60 seconds.',
    choices: [
      {
        labelVi: 'Bấm nút xả khí tẩy uế toàn diện thiêu hủy cả quái vật lẫn người bị kẹt',
        labelEn: 'Depress the sterilization purge, incinerating sector and trapped staff',
        resultVi: 'Lửa trắng bùng cháy thiêu rụi toàn bộ gian phòng sau lớp kính chống đạn. Thảm họa được ngăn chặn trước khi lan ra Nest. Ban quản trị Wing thăng cấp bạn lên Phó Trưởng Phòng vì "sự dứt khoát cứu vãn tập đoàn."',
        resultEn: 'White-hot incineration engulfed the chamber behind blast-glass. The outbreak was contained. The Board promoted you to Deputy Chief for "ruthless corporate preservation."',
        meritAdd: 32,
        effects: { sanity: -20, rep: +35, wealth: +70 },
        flagsAdd: ['wing_leak_done', 'WingRuthlessExecutive']
      },
      {
        labelVi: 'Đeo mặt nạ phòng độc, liều mình lao vào cứu sống các kỹ sư trưởng',
        labelEn: 'Don a respirator, braving the mutagenic fog to pull out chief engineers',
        resultVi: 'Bạn chém gục hai sinh vật biến dị và kéo được hai kỹ sư trưởng qua khe cửa hẹp ngay trước khi rào chắn dập xuống. Các nhà khoa học mang ơn cứu mạng suốt đời, mở rộng mạng lưới quan hệ của bạn.',
        resultEn: 'Cleaving two mutants, you dragged two chief engineers through the closing blast slit. Indebted for life, the senior researchers bound themselves to your faction.',
        meritAdd: 28,
        effects: { health: -22, sanity: +10, network: +30, rep: +25, wealth: +45 },
        flagsAdd: ['wing_leak_done', 'HeroOfLab']
      }
    ]
  },
  {
    id: 'wing_corporate_espionage_bribe',
    age: [23, 70],
    major: true,
    weight: 55,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted', 'wing_bribe_done'],
    vi: '[Món Tiền Hối Lộ từ Tập đoàn Cạnh Tranh] Một đặc vụ ngầm của một Wing đối thủ tiếp cận bạn tại quán cà phê sang trọng trong Nest. Hắn đặt lên bàn một chiếc thẻ tài khoản chứa 200 Ahn vàng ròng: "Chỉ cần bạn copy dữ liệu tài chính quý này của Wing bạn cho chúng tôi, số tiền này là của bạn."',
    en: '[Bribe from a Rival Wing] An operative from a rival Megacorp corners you inside an upscale Nest café, sliding a certified ledger bearing 200 Ahn: "Simply mirror your division’s quarterly balance sheet. The gold is yours."',
    choices: [
      {
        labelVi: 'Báo cáo ngay cho Ban An ninh Nội bộ, phối hợp bắt sống tên gián điệp',
        labelEn: 'Notify Internal Security immediately, springing a sting operation',
        resultVi: 'Đội thanh tra C Corp ập vào khống chế tên đặc vụ. Ban Giám đốc trao tặng bạn huân chương cống hiến trung thành và một khoản tiền thưởng hợp pháp kếch xù.',
        resultEn: 'Security enforcers breached the café, subduing the operative. The Board commended your incorruptible loyalty with a merit medal and lawful bonus.',
        meritAdd: 30,
        effects: { rep: +35, network: +20, wealth: +80 },
        flagsAdd: ['wing_bribe_done']
      },
      {
        labelVi: 'Nhận thẻ tiền, cắm USB copy dữ liệu bí mật vào ban đêm',
        labelEn: 'Pocket the ledger, exfiltrating the encrypted data at midnight',
        resultVi: 'Giao dịch thành công trót lọt. Bạn giàu có lên trông thấy sau một đêm, mua được căn hộ cao cấp tại Nest, dù mỗi tiếng bước chân lạ ngoài hành lang đều khiến bạn giật thót tim.',
        resultEn: 'The drop went undetected. You became wealthy overnight, acquiring a luxury Nest apartment, though every unfamiliar footstep in the corridor spikes your pulse.',
        effects: { sanity: -15, wealth: +200, heat: +20 },
        meritAdd: 20,
        flagsAdd: ['wing_bribe_done', 'CorporateMole']
      }
    ]
  },
  {
    id: 'wing_tcorp_time_tax_collection',
    age: [20, 65],
    major: true,
    weight: 65,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted', 'tcorp_tax_done'],
    vi: "[Thu thuế thời gian] Bạn dẫn đội T Corp vào Backstreets District 20. Người thiếu Ahn xếp hàng trước máy hút thời gian; phía Nest đang chờ phần thu được. Một người đưa giấy xin hoãn, nhưng đồng hồ thu đã chạy.",
    en: '[Time Tax Enforcement · T Corp District 20] Ash-grey skies hang over District 20. You lead a T Corp temporal collection unit into the Backstreet tenements. Brass time-extractors whir with terrifying hunger, ready to drain the lifespan of destitute citizens who lack Ahn for the Nest’s perpetual daylight.',
    choices: [
      {
        labelVi: 'Vận hành máy hút thời gian theo đúng chỉ tiêu, thu về hàng trăm giờ tinh khiết',
        labelEn: 'Operate the time-extractors strictly to corporate quota, harvesting pure temporal hours',
        resultVi: 'Tiếng kêu khóc vang lên xé lòng khi những cư dân già đi trông thấy trong vài phút. Những khối hộp thời gian phát sáng màu hổ phách được niêm phong cẩn thận. T Corp khen thưởng hiệu suất làm việc gương mẫu của bạn.',
        resultEn: 'Heartbreaking shrieks echoed as residents aged decades in minutes. Amber temporal cubes were sealed with corporate lead. T Corp commended your exemplary quota efficiency.',
        meritAdd: 25,
        effects: { sanity: -18, wealth: +60, rep: +20 },
        flagsAdd: ['tcorp_tax_done']
      },
      {
        labelVi: 'Khai khống hao hụt thời gian do rò rỉ cơ học, miễn giảm thuế cho các gia đình có trẻ nhỏ',
        labelEn: 'Falsify mechanical leakage logs, sparing destitute households with young children',
        resultVi: 'Các gia đình quỳ gối tạ ơn người cán bộ nhân từ. Bạn khéo léo dùng kiến thức máy móc để che mắt thanh tra, bảo toàn được chút nhân tính giữa lòng tập đoàn lạnh lùng.',
        resultEn: 'Families fell to their knees in tearful gratitude. Leveraging your mechanical expertise to deceive the audit, you preserved a fragment of human soul amidst corporate frost.',
        meritAdd: 20,
        effects: { sanity: +15, network: +25, rep: +15, wealth: -10 },
        flagsAdd: ['tcorp_tax_done']
      }
    ]
  },
  {
    id: 'wing_wcorp_first_class_cleanup',
    age: [21, 65],
    major: true,
    weight: 70,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted', 'wcorp_cleanup_done'],
    vi: "[Ca dọn toa hạng nhất] Tàu WARP cập bến. Bên trong toa, hành khách đã hòa lẫn thành những khối thịt. Bạn có mười phút đưa họ về chỗ và chạy quy trình phục hồi trước khi cửa ga mở.",
    en: '[First-Class Bio-Cleanup · WARP Train Arrival] The WARP train docks at District 23 after 10 seconds of real time, two millennia of subjective isolation. Doors unseal, vomiting the stench of rotting plasma and writhing flesh masses of passengers who devoured each other across centuries. You have exactly 10 minutes to sanitize the car and restore them via W Corp rewind technology.',
    choices: [
      {
        labelVi: 'Dùng cưa xích và công cụ tái cấu trúc thịt, gom xác và kích hoạt cỗ máy đảo ngược thời gian',
        labelEn: 'Wield chain-saws and bio-rakes, gathering tissue and triggering the temporal rollback anchor',
        resultVi: 'Bạn làm việc điên cuồng như một con robot không cảm xúc. Ánh sáng Singularity W Corp bùng nổ, các khối thịt tái tạo hoàn hảo thành những hành khách ăn mặc bảnh bao bước ra ngoài với nụ cười sảng khoái như vừa ngủ một giấc ngắn. Bạn nhận tiền bồi dưỡng độc hại khổng lồ.',
        resultEn: 'You worked like a detached automaton. W Corp’s Singularity flared: Writhing flesh snapped back into impeccably suited passengers who disembarked smiling as if waking from a pleasant nap. You pocketed massive hazardous duty hazard bonuses.',
        meritAdd: 28,
        effects: { health: -15, sanity: -24, wealth: +85, rep: +25 },
        flagsAdd: ['wcorp_cleanup_done']
      },
      {
        labelVi: 'Lén thu thập mẫu mô tế bào bất tử của hành khách để bán cho chợ đen Workshop',
        labelEn: 'Harvest immortal cellular samples from the flesh masses for black-market Workshop sale',
        resultVi: 'Mẫu mô sinh học chịu được 2000 năm phân rã được bạn giấu kín trong bình bảo quản nitơ lỏng. Một xưởng rèn trả giá cực cao để nghiên cứu hợp kim sinh học, giúp bạn giàu to.',
        resultEn: 'Biological tissue that survived two millennia of subjective decay was sealed in your liquid nitrogen thermos. An underground Workshop paid a fortune for bio-alloy research.',
        meritAdd: 18,
        effects: { sanity: -15, wealth: +140, heat: +25 },
        flagsAdd: ['wcorp_cleanup_done']
      }
    ]
  },
  {
    id: 'wing_kcorp_tears_harvest',
    age: [21, 65],
    major: true,
    weight: 65,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted', 'kcorp_harvest_done'],
    vi: "[Thu nước mắt K Corp] Trong buồng nuôi cấy, The Tearful Thing bị buộc xem cảnh người ta chịu đau. Nước mắt của nó chảy vào hệ thống làm HP Ampoule. Bạn được giao giữ máy chạy hết ca.",
    en: '[Biogel Extraction Chamber · K Corp Tears District 11] You are assigned to K Corp’s central containment sanctum. Suspended before you looms The Tearful Thing, the living fountain of all K Corp regenerative ampoules. To stimulate its tears, projectors loop the most heartbreaking mortal tragedies upon its retinas.',
    choices: [
      {
        labelVi: 'Vận hành hệ thống kích thích nỗi đau cực đại, thu hoạch dịch hồi phục cấp thượng phẩm',
        labelEn: 'Amplify the emotional agony feeds, harvesting high-purity emerald biogel',
        resultVi: 'Nước mắt lục bảo tuôn chảy như suối đổ đầy các bể chứa chân không. Bạn được thưởng nóng ba ống tiêm K Corp siêu cấp và được Giám đốc nghiên cứu tuyên dương xuất sắc.',
        resultEn: 'Emerald tears poured like waterfalls into vacuum reservoirs. You were awarded three experimental Grade-A K Corp ampoules and a directorate commendation for flawless throughput.',
        meritAdd: 26,
        effects: { sanity: -20, wealth: +70, rep: +22 },
        flagsAdd: ['kcorp_harvest_done']
      },
      {
        labelVi: 'Điều chỉnh tần số chiếu giảm bớt tra tấn tâm lý cho sinh vật',
        labelEn: 'Modulate projector frequencies, softening the psychological torture on the entity',
        resultVi: 'Sinh vật khẽ chớp mắt nhìn bạn với sự nhẹ nhõm hiếm hoi. Nước mắt thu được ít hơn nhưng có độ tinh khiết tâm thức đáng kinh ngạc, giúp bạn ngộ ra sự cộng hưởng E.G.O sâu sắc.',
        resultEn: 'The colossal creature blinked at you with rare, profound relief. The yield was smaller yet possessed crystalline psychic purity, gifting you profound E.G.O resonance insight.',
        meritAdd: 22,
        effects: { sanity: +12, resonance: +25, wealth: +30, rep: +15 },
        flagsAdd: ['kcorp_harvest_done']
      }
    ]
  },
  {
    id: 'wing_ucorp_great_lake_diving',
    age: [22, 68],
    major: true,
    weight: 60,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted', 'ucorp_dive_done'],
    vi: "[Hải trình Đại Hồ] U Corp cử bạn theo tàu bọc thép ra vùng ranh giới của Great Lake, District 21. Một con Whale dị thể đang phát sóng khiến thủy thủ hóa thành Mermaid, và đội tàu cần người ra boong khi sương mù ập tới.",
    en: "[Great Lake Run] U Corp sends you out on an armored ship to the boundary waters of the Great Lake, District 21. An aberrant Whale is broadcasting a signal that turns sailors into Mermaids, and the fleet needs hands on deck when the fog arrives.",
    choices: [
      {
        labelVi: 'Nhận vị trí trên boong và theo tàu ra ranh giới',
        labelEn: 'Take a place on deck and sail out to the boundary',
        startDungeon: 'dungeon_great_lake',
        resultVi: 'Bạn nhận áo phao và một cây lao móc rồi đứng vào hàng. Chuông Luật Đại Hồ bắt đầu rung trước khi bạn kịp thấy nước đổi màu.',
        resultEn: 'You take a life vest and a harpoon and join the line. The Lake Law bells start ringing before you see the water change color.',
        flagsAdd: ['ucorp_dive_done']
      },
      {
        labelVi: 'Xin ở lại khoang chỉ huy, giữ liên lạc và ghi hải đồ',
        labelEn: 'Ask to stay in the command cabin, keeping the radio and charting',
        resultVi: 'Bạn ngồi sau bàn hải đồ cả đêm, đọc tọa độ cho thuyền trưởng qua tiếng rè của loa. Sáng ra tàu về bến thiếu hai người, và tên bạn nằm trong báo cáo ở dòng người giữ liên lạc.',
        resultEn: 'You sit at the chart table all night, reading coordinates to the captain through the crackle of the speaker. By morning the ship is back at port two hands short, and your name sits in the report on the line for the radio keeper.',
        effects: { sanity: +6, network: +10, rep: +8, wealth: +14 },
        flagsAdd: ['ucorp_dive_done'],
        meritAdd: 10
      }
    ]
  },

  // =========================================================================
  // SYNDICATE LIFE & UNDERWORLD DIVERSITY (FIVE FINGERS)
  // =========================================================================
  {
    id: 'syn_thumb_ammunition_quota',
    age: [19, 72],
    major: true,
    weight: 48,
    need: { jobs: ['Syndicate'], flags: ['FingerThumb'] },
    vi: "[Sổ đạn của The Thumb] Với The Thumb, mỗi viên đạn đều là của chung. Capo Boris gọi bạn xuống kho đạn ngầm để giải trình hai trăm viên xuyên giáp đã bắn tháng qua. Mỗi vỏ rỗng phải khớp với một kẻ ngã xuống.",
    en: "[The Thumb’s Ammunition Ledger] In The Thumb every round belongs to everyone. Capo Boris calls you down to the underground armory to account for two hundred armor-piercing rounds fired last month. Every empty casing must match someone who fell.",
    choices: [
      {
        labelVi: "Nộp sổ bắn ghi rõ từng phát và giao đủ hai trăm vỏ đạn đồng",
        labelEn: "Hand over the firing log with every shot recorded and all two hundred brass casings",
        resultVi: "Capo lật sổ chậm rãi và không tìm ra chỗ nào lệch. Ông gật đầu, đẩy tới một hộp đạn tốt hơn và giao thêm vài việc cho bạn quản.",
        resultEn: "The Capo turns the ledger slowly and finds no discrepancy. He nods, slides over a box of better rounds and hands you a few more jobs to manage.",
        meritAdd: 20,
        effects: { rep: +22, wealth: +35, network: +15, sanity: +5 }
      },
      {
        labelVi: "Nhận mất ba vỏ đạn và tự chịu hai mươi roi gậy sắt theo lễ của The Thumb",
        labelEn: "Admit to three lost casings and take twenty strikes with the iron rod, as The Thumb’s etiquette requires",
        resultVi: "Bạn đứng thẳng chịu phạt và không kêu nửa lời. Các Soldato trong kho nhìn bạn khác đi, và có người đưa bạn cốc nước mà không nói gì.",
        resultEn: "You take the punishment standing straight without a sound. The Soldatos in the depot look at you differently, and one hands you a cup of water without a word.",
        meritAdd: 18,
        effects: { health: -14, rep: +25, sanity: +6 }
      }
    ]
  },
  {
    id: 'syn_thumb_boris_brawler_drill',
    age: [20, 70],
    major: true,
    weight: 45,
    need: { jobs: ['Syndicate'], flags: ['FingerThumb'] },
    vi: '[Võ Đài Cận Chiến The Thumb · Bàn Cân Sức Mạnh] Trong gian hầm tập luyện ngầm, những tay búa thép khổng lồ của The Thumb đang so găng tay đôi. Boris yêu cầu bạn bước lên võ đài để kiểm tra sức chịu đòn và phản xạ cận chiến trước khi giao nhiệm vụ thanh trừng mới.',
    en: '[Thumb Heavy Brawler Sparring · Forge of Obedience] In the subterranean sparring grounds, towering Thumb enforcers clash with brass knuckles. Boris commands you into the ring to test your shock tolerance and kinetic reflex before the next deployment.',
    choices: [
      {
        labelVi: 'Tung cú đấm bộc phá trực diện, so găng ngang ngửa với đại hán hộ vệ',
        labelEn: 'Deliver a concussive counter-blow, matching the heavy brawler blow for blow',
        resultVi: 'Tiếng xương thịt va chạm như tiếng búa nện thép. Dù người đầy bầm tím, bạn trụ vững đến tiếng chuông cuối cùng. Các huynh đệ The Thumb gật đầu công nhận bản lĩnh thép của bạn.',
        resultEn: 'Impacts boomed like hydraulic hammers. Bruised but unyielding, you stood tall until the final bell. Thumb brethren roared in respect for your iron spine.',
        meritAdd: 22,
        effects: { health: -15, rep: +24, wealth: +30, resonance: +12 }
      },
      {
        labelVi: 'Sử dụng bộ pháp di chuyển khéo léo, luồn lách né tránh và quật ngã đối thủ',
        labelEn: 'Employ elusive footwork, slipping heavy blows and leveraging a clean takedown',
        resultVi: 'Đòn quật ngã bất ngờ khiến gã khổng lồ ngã uỳnh xuống sàn đấu. Boris vỗ tay tán thưởng: "Nhanh nhẹn và chuẩn xác. The Thumb cần những cái đầu lạnh như ngươi."',
        resultEn: 'A fluid sweep slammed the giant to the canvas. Boris nodded in approval: "Agile and precise. The Thumb values calculating minds like yours."',
        meritAdd: 20,
        effects: { rep: +20, wealth: +28, sanity: +6 }
      }
    ]
  },
  {
    id: 'syn_index_spinning_top_prescript',
    age: [19, 75],
    major: true,
    weight: 48,
    need: { jobs: ['Syndicate'], flags: ['FingerIndex'] },
    vi: '[Mệnh Lệnh Kỳ Quái Của Chỉ Lệnh · The Index] Chim cơ khí thả xuống trước mặt bạn một cuộn Chỉ Lệnh (Prescript) viết bằng mực đỏ: "Vào đúng 12 giờ trưa, hãy xoay một con quay đồng trên bậc thang thứ ba của Cây Cầu Phía Đông suốt 15 phút mà không chớp mắt."',
    en: '[The Bizarre Prescript · The Index] A clockwork bird drops a crimson-inked Prescript before your boots: "At precisely 12:00 PM, spin a brass top upon the third step of the Eastern Bridge for fifteen minutes without blinking."',
    choices: [
      {
        labelVi: 'Tuân thủ tuyệt đối không thắc mắc, ngồi xoay con quay đúng 15 phút',
        labelEn: 'Obey without question, spinning the brass top for precisely 15 minutes',
        resultVi: 'Bạn ngồi xoay con quay giữa ánh nhìn ngơ ngác của người qua đường. Đúng 12:14, một quả bom của phe địch phát nổ ở góc phố đối diện, chính hành động xoay con quay đã khiến toán ám sát bị chậm lại và tự hủy diệt. Dòng chảy nhân quả của The Index là tuyệt đối.',
        resultEn: 'You spun the top under baffled civilian stares. At 12:14, an ambush bomb detonated across the boulevard, your trivial delay caused the rival hit squad to mistime and destroy themselves. The causal flow of the Index is omniscient.',
        meritAdd: 25,
        effects: { sanity: +18, rep: +22, network: +18, resonance: +16 }
      },
      {
        labelVi: 'Bỏ qua mệnh lệnh ngớ ngẩn này và đi làm việc khác',
        labelEn: 'Disregard the absurd command and attend to worldly business',
        resultVi: 'Nửa giờ sau, những sợi tơ đỏ bí ẩn quấn chặt lấy chân bạn, kéo bạn ngã nhào xuống cống nước thải. Một người đưa tin Index lạnh lùng liếc nhìn bạn rồi biến mất: Không ai có thể trốn tránh Chỉ Lệnh.',
        resultEn: 'Thirty minutes later, phantom crimson threads ensnared your shins, dumping you face-first into sewage. An Index Messenger glared chillingly from the fog: None defy the Prescript.',
        effects: { health: -10, sanity: -12, rep: -10 }
      }
    ]
  },
  {
    id: 'syn_index_crimson_thread_execution',
    age: [21, 72],
    major: true,
    weight: 45,
    need: { jobs: ['Syndicate'], flags: ['FingerIndex'] },
    vi: '[Thanh Trừng Kẻ Giả Mạo Chỉ Lệnh · The Index] Proxy Yan phát hiện một nhóm gian thương chế tạo máy in giả để làm giả Chỉ Lệnh nhằm trục lợi cá nhân tại District 20. Bạn được giao nhiệm vụ lần theo những sợi tơ đỏ nhân quả để xử trảm kẻ phản bội.',
    en: '[Purge of the Counterfeit Weavers · The Index] Proxy Yan identifies a cabal of counterfeiters forging bogus Prescripts for illicit profit in District 20. You are dispatched to trace the synthetic crimson threads and sever their destiny.',
    choices: [
      {
        labelVi: 'Dùng kiếm tơ chém đứt máy in giả và xử tử toàn bộ toán gian thương',
        labelEn: 'Use thread-blades to dismantle the counterfeit press and execute the forgers',
        resultVi: 'Những đường kiếm tơ mảnh như sợi tóc cắt đứt gân tay và máy móc của kẻ phạm tội trong im lặng. Proxy mỉm cười tán thưởng, trao thưởng cho bạn một cuộn tơ kiếm Index cao cấp.',
        resultEn: 'Microscopic razor threads sheared through joints and counterfeit presses in utter silence. The Proxy nodded in quiet approval, gifting you a spool of refined Index thread.',
        meritAdd: 26,
        effects: { rep: +28, wealth: +48, resonance: +18, health: -8 }
      },
      {
        labelVi: 'Thu giữ toàn bộ kho Ahn và tang vật giao nộp về trụ sở The Index',
        labelEn: 'Confiscate the hoarded Ahn and illicit ledgers, surrendering all to Index custody',
        resultVi: 'Bạn giao nộp toàn bộ tài sản bất chính về kho gia tộc. Lòng trung thành của bạn được ghi nhận và bạn được nhận một phần hoa hồng xứng đáng.',
        resultEn: 'You surrendered every seized coin to the family vaults. Your integrity earned recognition and a legitimate commission cut.',
        meritAdd: 22,
        effects: { wealth: +38, rep: +20, network: +15 }
      }
    ]
  },
  {
    id: 'syn_middle_cousin_retaliation',
    age: [19, 70],
    major: true,
    weight: 48,
    need: { jobs: ['Syndicate'], flags: ['FingerMiddle'] },
    vi: '[Nợ Máu Đòi Máu · Sách Phục Thù The Middle] Một Little Sister của gia tộc đi giao hàng bị một tên quản đốc xưởng rèn tát vào mặt và cướp mất áo khoác. Tên của hắn lập tức được ghi vào Sách Phục Thù (Book of Vengeance). Cả gia đình trông đợi bạn đi thi hành công lý.',
    en: '[Blood for Blood · Middle Book of Vengeance] A Little Sister was struck and stripped of her coat by a drunken workshop foreman. His name was instantly inscribed in the Book of Vengeance. The entire family looks to you for retribution.',
    choices: [
      {
        labelVi: 'Dẫn mười anh em đập nát xưởng rèn, bẻ gãy tay kẻ xúc phạm và lấy lại áo khoác',
        labelEn: 'Lead ten siblings to smash the forge, breaking the culprit’s arm and reclaiming the coat',
        resultVi: 'Tiếng xích sắt quất rầm rập. Tên quản đốc quỳ rạp cầu xin tha mạng. Bạn khoác lại chiếc áo cho người em gái trong tiếng reo hò của cả gia tộc. Tên của hắn được gạch bỏ trong Sách Phục Thù.',
        resultEn: 'Purple chains roared through the forge. The foreman groveled in terror. You draped the coat back over your Little Sister’s shoulders as siblings cheered. His name was struck from the Book.',
        meritAdd: 24,
        effects: { rep: +30, wealth: +40, sanity: +12, health: -8 }
      },
      {
        labelVi: 'Bắt xưởng rèn bồi thường 50 Ahn viện trợ cho người em và ký cam kết tôn trọng',
        labelEn: 'Force the workshop to pay 50 Ahn in restitution and sign a respectful non-aggression oath',
        resultVi: 'Trước uy lực của bạn, xưởng rèn lập tức nộp phạt toàn bộ số tiền. Người em gái cảm động rơi nước mắt, và gia tộc The Middle ca tụng sự khôn ngoan của bạn.',
        resultEn: 'Bowing before your intimidation, the forge liquidated the indemnity on the spot. The Little Sister wept in gratitude; the Middle praised your calculated strength.',
        meritAdd: 20,
        effects: { wealth: +50, rep: +22, network: +18, sanity: +8 }
      }
    ]
  },
  {
    id: 'syn_middle_hair_coupon_brawl',
    age: [20, 68],
    major: true,
    weight: 44,
    need: { jobs: ['Syndicate'], flags: ['FingerMiddle'] },
    vi: "[Phiếu giảm giá tiệm tóc · The Middle] Một tiệm làm tóc ở ranh giới quận phát tập phiếu giảm giá đặc biệt, thứ mà Big Brother Ricardo rất quý để giữ mái tóc bóng. Một nhóm côn đồ giật xấp phiếu ngay trước cửa tiệm.",
    en: "[The Hair Salon Coupons · The Middle] A salon on the district border issues special discount coupons, which Big Brother Ricardo values for keeping his hair glossy. A street gang snatches the stack right outside the door.",
    choices: [
      {
        labelVi: "Vung xích tím đập đám cướp và mang xấp phiếu về cho đại ca",
        labelEn: "Swing the purple chain at the thieves and bring the coupons back to Big Brother",
        resultVi: "Bạn đập đám côn đồ cho tới khi chúng bỏ chạy. Khi trả lại xấp phiếu, Big Brother cười lớn và xoa đầu bạn: “Giỏi lắm. Tóc cả nhà được cứu rồi.” Bạn được thưởng hậu.",
        resultEn: "You beat the gang until they run. When you hand back the coupons, Big Brother laughs and ruffles your hair: “Good work. The whole family’s hair is saved.” You are well rewarded.",
        meritAdd: 22,
        effects: { rep: +28, wealth: +38, sanity: +14, health: -6 }
      },
      {
        labelVi: "Giữ lại nửa số phiếu cho cả nhóm đi làm đẹp",
        labelEn: "Keep half the coupons so the crew can go and get groomed",
        resultVi: "Cả nhóm bước ra khỏi tiệm tóc chải chuốt và đi ngực thẳng hơn thường lệ. Tinh thần lên hẳn.",
        resultEn: "The crew walks out of the salon neatly groomed and with their chests a little higher. Morale lifts.",
        meritAdd: 16,
        effects: { sanity: +18, rep: +15, wealth: +10 }
      }
    ]
  },
  {
    id: 'syn_ring_corridor_human_statue',
    age: [20, 72],
    major: true,
    weight: 45,
    need: { jobs: ['Syndicate'], flags: ['FingerRing'] },
    vi: '[Bảo Tàng Nghệ Thuật Sống · The Ring] Một Maestro của The Ring mở buổi dạ tiệc triển lãm nghệ thuật cơ thể. Họ yêu cầu bạn mặc bộ giáp sơn màu đá cẩm thạch và đứng bất động làm một bức tượng sống giữa sảnh tiệc, sẵn sàng ám sát bất kỳ vị khách quý nào dám xúc phạm tác phẩm nghệ thuật.',
    en: '[Living Statue Gala · The Ring] A Ring Maestro hosts an avant-garde biological art gala. You are instructed to don marble-lacquered armor and pose as a silent living statue amidst the ballroom, poised to execute any patron who dares critique the art.',
    choices: [
      {
        labelVi: 'Đứng bất động 6 tiếng liền, chém đôi kẻ phản động dám buông lời chê bai tranh',
        labelEn: 'Stand motionless for six hours, cleaving a critic who dared insult the canvas',
        resultVi: 'Nhát chém bất ngờ từ bức tượng khiến máu bắn thành vệt trừu tượng lên tường. Vị Maestro reo lên thích thú: "Một kiệt tác trình diễn hoàn hảo!" Bạn được thăng hàm trong The Ring.',
        resultEn: 'A sudden strike from the marble statue sprayed scarlet ribbons across the gallery wall. The Maestro gasped in ecstasy: “A sublime performance piece!” You advanced in the Ring.',
        meritAdd: 26,
        effects: { rep: +32, wealth: +50, sanity: -6, resonance: +18 }
      },
      {
        labelVi: 'Dùng con mắt nghệ thuật hướng dẫn quan khách thưởng thức tranh một cách tinh tế',
        labelEn: 'Subtly guide bewildered patrons into appreciating the grotesque aesthetics',
        resultVi: 'Quan khách trầm trồ trước sự am hiểu hội họa và phong thái tao nhã của bạn. Buổi triển lãm thành công rực rỡ, mang về bộn tiền bán vé cho viện bảo tàng.',
        resultEn: 'Patrons marveled at your refined critique and cultured aura. The gala triumphed commercially, yielding hefty ticket royalties.',
        meritAdd: 20,
        effects: { rep: +22, wealth: +42, sanity: +8, network: +16 }
      }
    ]
  },
  {
    id: 'syn_pinky_whispering_underground_broker',
    age: [19, 72],
    major: true,
    weight: 45,
    need: { jobs: ['Syndicate'], flags: ['FingerPinky'] },
    vi: '[Mạng Lưới Ám Hiệu Ngầm · The Pinky] Dưới đường cống ngầm ẩm ướt của District 25, một sứ giả đeo mặt nạ chim cú của The Pinky trao cho bạn một dải lụa thêu mật mã. Nhiệm vụ của bạn là chuyển dải lụa này tới tay một điệp viên Wing mà không để thám tử Seven phát hiện.',
    en: '[Subterranean Whisper Network · The Pinky] In the dank sewers of District 25, an owl-masked Pinky envoy passes you an embroidered ribbon cipher. Your directive: deliver it to a rogue Wing spy without alerting Seven Association surveillants.',
    choices: [
      {
        labelVi: 'Luồn lách qua các đường ống thông khí tối tăm, hoàn tất giao liên an toàn',
        labelEn: 'Slip through ventilation shafts in darkness, completing covert delivery',
        resultVi: 'Bản mật mã được trao tận tay điệp viên. Một túi tiền Ahn bóng loáng được nhét vào tay bạn kèm theo cái gật đầu của hội đồng bóng tối The Pinky.',
        resultEn: 'The cipher reached the operative’s hands unseen. A velvet pouch of Ahn was pressed into your palm with the silent nod of the Pinky sovereign council.',
        meritAdd: 22,
        effects: { rep: +22, wealth: +45, network: +20, sanity: +5 }
      },
      {
        labelVi: 'Giải mã dải lụa để nắm bắt tin tức cơ mật trước khi bàn giao',
        labelEn: 'Decipher the cipher ribbon yourself to harvest leverage before handoff',
        resultVi: 'Bạn phát hiện một bí mật chấn động về một vụ bê bối độc quyền của Wing. Tri thức này biến bạn thành kẻ môi giới thông tin đầy quyền lực trong thế giới ngầm.',
        resultEn: 'You uncovered a scandalous Singularity monopoly conspiracy. This leverage cemented your status as a formidable underworld broker.',
        meritAdd: 24,
        effects: { network: +28, rep: +20, sanity: -4, resonance: +12 }
      }
    ]
  },

  // =========================================================================
  // WING CORPORATE INTRIGUE, EXPERIMENTS & CRISES (26 WINGS)
  // =========================================================================
  {
    id: 'wing_tcorp_monocle_time_collection',
    age: [20, 70],
    major: true,
    weight: 46,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted'],
    vi: '[Thu Thuế Thời Gian T Corp · District 4] Đeo chiếc kính một tròng đo thời gian đặc chế của T Corp, bạn dẫn đầu đội thanh tra đến kiểm toán một xưởng rèn bị nghi ngờ ăn cắp 1,200 giờ thời gian chủ quan của công nhân để đẩy nhanh tiến độ sản xuất.',
    en: '[T Corp Time Tax Foreclosure · District 4] Adjusting your brass time-measuring monocle, you lead a T Corp audit squad to seize 1,200 hours of stolen subjective time from a rogue forge that exploited overtime workers.',
    choices: [
      {
        labelVi: 'Kích hoạt hộp hấp thụ thời gian, tịch thu toàn bộ thời gian đánh cắp về kho T Corp',
        labelEn: 'Activate the chronometer condenser, confiscating all stolen hours for the Wing',
        resultVi: 'Chiếc hộp phát ra ánh sáng vàng hổ phách hút cạn các bình chứa thời gian. Giám đốc T Corp khen ngợi báo cáo chuẩn xác của bạn và thưởng lớn bằng cổ phiếu thời gian.',
        resultEn: 'The condenser flared sepia, vacuuming the illicit time vials clean. The T Corp Board praised your audit, rewarding you with certified Time dividends.',
        meritAdd: 22,
        effects: { rep: +24, wealth: +48, sanity: +6 }
      },
      {
        labelVi: 'Trả lại một nửa số giờ thời gian bị đánh cắp cho các công nhân kiệt sức',
        labelEn: 'Quietly return half the reclaimed hours to the haggard factory laborers',
        resultVi: 'Những công nhân già nua trẻ lại trông thấy trong ánh mắt biết ơn vô bờ. Bạn báo cáo là bình chứa bị rò rỉ, giữ trọn vẹn sự thanh thản trong tâm hồn.',
        resultEn: 'Haggard laborers regained lost years, weeping in profound gratitude. You logged a minor gasket leakage, preserving moral solace in a ruthless City.',
        meritAdd: 18,
        effects: { sanity: +18, rep: +14, network: +16 }
      }
    ]
  },
  {
    id: 'wing_wcorp_warp_dimension_anomaly',
    age: [21, 70],
    major: true,
    weight: 46,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted'],
    vi: '[Sự Cố Buồng Khoang WARP Train W Corp] Một chuyến tàu WARP vừa cập bến District 23 nhưng hệ thống tẩy não hành khách khoang hạng Nhất bị chập mạch. Một nhóm hành khách đột biến thành quái vật thịt vặn vẹo đang đập phá cửa toa tàu trước giờ công bố ga.',
    en: '[W Corp WARP Train Containment Breach] A WARP train docks in District 23, but the First-Class memory erasure manifold short-circuits. Mutated passenger horrors are battering the compartment bulkhead minutes before the public station doors open.',
    choices: [
      {
        labelVi: 'Cầm vũ khí W Corp xông vào toa xe, tiêu diệt dị thể và kích hoạt khôi phục hình thể',
        labelEn: 'Breach the carriage with W Corp cleavers, executing mutates and forcing cellular reset',
        resultVi: 'Máu thịt văng tung tóe trong khoang tàu. Bạn kích hoạt công tắc khôi phục thời gian Singularity đúng 3 giây trước giờ mở cửa. Hành khách bước ra tươi cười như vừa ngủ một giấc 10 giây. Ban điều hành thưởng nóng cho bạn.',
        resultEn: 'Gore painted the bulkheads. You slapped the Singularity reset relay three seconds before public boarding. Passengers stepped onto the platform smiling after a "ten-second trip". You received a massive hazard bonus.',
        meritAdd: 26,
        effects: { health: -16, sanity: -8, rep: +30, wealth: +60, resonance: +16 }
      },
      {
        labelVi: 'Cô lập toa tàu bằng vách ngăn chân không, bơm khí gây mê diện rộng',
        labelEn: 'Seal the carriage in a vacuum bulkhead, flooding it with neural anesthetics',
        resultVi: 'Toán hành khách đột biến lịm đi an toàn. Đội kỹ thuật xử lý êm thấm sự cố mà bạn không phải đối mặt với nguy hiểm thể xác.',
        resultEn: 'The abominations slumped into comas safely. Technical crews resolved the glitch cleanly without physical peril to yourself.',
        meritAdd: 20,
        effects: { rep: +20, wealth: +38, sanity: +5 }
      }
    ]
  },
  {
    id: 'wing_kcorp_ampoule_contamination',
    age: [20, 72],
    major: true,
    weight: 45,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted'],
    vi: '[Kiểm Định Huyết Thanh K Corp · Nước Mắt Singularity] Một lô hàng Ống Tiêm K Corp cao cấp chuẩn bị xuất xưởng bị phát hiện có bọt khí bất thường. Bạn nhận nhiệm vụ kiểm tra buồng chứa Singularity Nước Mắt để tìm nguyên nhân rò rỉ.',
    en: '[K Corp Ampoule Quality Audit · Singularity Tears] A flagship crate of K Corp HP Ampoules exhibits erratic froth. You are dispatched into the subterranean tear-well chamber to diagnose the Singularity contamination.',
    choices: [
      {
        labelVi: 'Hiệu chỉnh lại màng lọc sinh học và thay thế bộ lọc nano đúng quy trình',
        labelEn: 'Recalibrate the biological filtration baffles and swap the nano-filters',
        resultVi: 'Dòng dịch ngọc bích trở lại trạng thái trong vắt hoàn mỹ. Lô hàng được xuất xưởng đúng hạn, và bạn được thưởng một ống tiêm hồi phục K Corp nguyên bản phòng thân.',
        resultEn: 'The emerald tears returned to pristine clarity. The batch cleared customs on schedule; the Board gifted you a genuine sealed K Corp ampoule.',
        meritAdd: 24,
        itemAdd: 'con_kcorp_ampoule',
        effects: { rep: +24, wealth: +42, sanity: +8 },
        later: [{ id: 'csq_wing_patent_inquisition', years: 3, reasonVi: "Bạn là người cuối cùng chạm vào buồng chứa Singularity Nước Mắt", reasonEn: "You were the last person to touch the Singularity tear-well chamber" }]
      },
      {
        labelVi: 'Phát hiện một nhóm nhân viên đang lén bòn rút dịch Singularity để bán chợ đen',
        labelEn: 'Uncover rogue technicians embezzling raw Singularity serum for the black market',
        resultVi: 'Bạn bắt quả tang và bàn giao toàn bộ đường dây cho an ninh K Corp. Bạn được thăng chức quản đốc kiểm định với mức lương hậu hĩnh.',
        resultEn: 'You caught the embezzlement ring red-handed and delivered them to security. The Wing elevated you to Chief Auditor with a salary spike.',
        meritAdd: 22,
        effects: { rep: +26, wealth: +50, network: +18 },
        later: [{ id: 'csq_wing_patent_inquisition', years: 3, reasonVi: "Bạn là người cuối cùng chạm vào buồng chứa Singularity Nước Mắt", reasonEn: "You were the last person to touch the Singularity tear-well chamber" }]
      }
    ]
  },
  {
    id: 'wing_rcorp_cloning_selection_drill',
    age: [21, 68],
    major: true,
    weight: 44,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted'],
    vi: '[Lò Ấp Nhân Bản R Corp · Tuyển Chọn Pack Thứ 4] Bạn được cử đến cơ sở huấn luyện R Corp để giám sát buồng đấu sinh tử của 5 bản sao nhân bản (Clones). Theo luật của R Corp, chỉ có 1 bản sao mạnh mẽ nhất được phép sống sót bước ra làm lính đánh thuê.',
    en: '[R Corp 4th Pack Hatchery · Clone Survival Protocol] Dispatched to an R Corp facility, you supervise the lethal battle arena between five identical genetic clones. By R Corp charter, only the single surviving apex clone may deploy into active service.',
    choices: [
      {
        labelVi: 'Ghi nhận và ký giấy chứng nhận cho cá thể bản sao chiến thắng xuất sắc nhất',
        labelEn: 'Certify the victorious apex clone and process survival credentials cleanly',
        resultVi: 'Cá thể sống sót bước ra từ vũng máu với ánh mắt lạnh như băng. Bạn đóng dấu phê chuẩn điều động. R Corp thanh toán khoản thù lao giám sát nguy hiểm hậu hĩnh.',
        resultEn: 'The lone victor stepped from the bloodied arena with eyes of cold obsidian. You stamped the authorization; R Corp wired an opulent hazard appraisal bounty.',
        meritAdd: 24,
        effects: { rep: +24, wealth: +52, sanity: -6 }
      },
      {
        labelVi: 'Bí mật lưu trữ mẫu DNA ưu tú để bán cho xưởng rèn công nghệ sinh học',
        labelEn: 'Secretly duplicate elite genetic telemetry to broker with biotech ateliers',
        resultVi: 'Một xưởng rèn cơ thể ngầm trả giá cao chót vót cho dữ liệu thần kinh phản xạ của R Corp, đem lại tài sản lớn cho bạn.',
        resultEn: 'An underground cybernetics forge paid a fortune for R Corp reflex telemetry, vastly enriching your bank account.',
        meritAdd: 18,
        effects: { wealth: +68, rep: +12, sanity: -4, heat: +10 }
      }
    ]
  },
  {
    id: 'wing_ncorp_prosthetic_purge_tribunal',
    age: [20, 70],
    major: true,
    weight: 44,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted'],
    vi: '[Tòa Án Giáo Hội N Corp · Thanh Trừng Cơ Khí] Các Thẩm Phán và Kẻ Hành Quyết (Inquisitors) của N Corp ghé thăm phân khu làm việc của bạn để thanh tra sự thuần khiết thể xác. Bất kỳ ai mang linh kiện cơ khí hay khớp kim loại đều bị quy là dị giáo.',
    en: '[N Corp Inquisition Tribunal · Prosthetic Purge] Hammer Inquisitors and Nailsmiths of N Corp inspect your administrative sector for bodily purity. Anyone bearing biomechanical augmentations is branded a heretic.',
    choices: [
      {
        labelVi: 'Tuyên bố lòng trung thành với thể xác thuần khiết, giúp đồng nghiệp cất giấu đồ giả',
        labelEn: 'Proclaim devotion to unmarred flesh while secretly hiding colleagues’ implants',
        resultVi: 'Sự khéo léo của bạn giúp phân khu vượt qua cuộc thanh tra mà không ai bị đóng đinh. Các đồng nghiệp mang ơn cứu mạng của bạn suốt đời.',
        resultEn: 'Your quick-witted composure guided the entire division past the Inquisition unscathed. Colleagues pledged lifelong loyalty to you.',
        meritAdd: 22,
        effects: { rep: +20, network: +30, sanity: +10 }
      },
      {
        labelVi: 'Dẫn đầu lực lượng đối chất với Inquisitor bằng quy chế pháp lý liên Wing',
        labelEn: 'Confront the Inquisitors with inter-Wing jurisdictional immunity treaties',
        resultVi: 'Lập luận sắc bén của bạn buộc toán Inquisitor hung hãn phải thu đinh búa rút lui. Danh tiếng bản lĩnh của bạn lan khắp tập đoàn.',
        resultEn: 'Your razor-sharp legal mastery forced the inquisitors to withdraw their hammers. Your organizational reputation surged across the Wing.',
        meritAdd: 24,
        effects: { rep: +28, wealth: +35, sanity: +8 }
      }
    ]
  },
  {
    id: 'wing_lobotomy_ruin_cogito_salvage',
    age: [22, 75],
    major: true,
    weight: 46,
    need: { jobs: ['Wing Employee'] },
    forbids: ['Distorted'],
    vi: '[Khai Quật Tàn Tích L Corp · Tinh Thể Cogito] Bạn được cử làm trưởng đoàn thám hiểm bước xuống tàn tích chi nhánh Lobotomy Corporation đổ nát dưới lòng đất. Trong bóng tối, các bình chứa Cogito và Enkephalin phát quang màu xanh lục kỳ ảo giữa những xác vỏ Abnormality bất động.',
    en: '[Lobotomy Corp Branch Ruins · Cogito Salvage Expedition] Appointed expedition leader, you descend into a collapsed Lobotomy Corporation subterranean branch. Amidst dormant Abnormality casings, crystalline Enkephalin and Cogito canisters hum with phantom viridian light.',
    choices: [
      {
        labelVi: 'Dẫn đoàn đu dây xuống trục thông gió',
        labelEn: 'Lead the team down the ventilation shaft on ropes',
        startDungeon: 'dungeon_lobotomy_ruin',
        resultVi: 'Bạn kiểm tra dây từng mắt một rồi là người đầu tiên bước ra khỏi mép trục. Đèn khẩn cấp phía dưới chớp màu cam, và còi Meltdown vọng lên từ những tầng sâu hơn.',
        resultEn: 'You check the rope knot by knot and step off the shaft edge first. The emergency lamps below pulse amber, and a Meltdown siren echoes up from the deeper floors.'
      },
      {
        labelVi: 'Dừng ở miệng trục và lắng nghe tiếng thì thầm từ bên dưới',
        labelEn: 'Stop at the shaft mouth and listen to the whisper from below',
        meritAdd: 8,
        outcomes: [
          {
            w: 70,
            resultVi: 'Giọng thì thầm không nói gì cả, chỉ ngân lên một nốt. Nốt ấy chạm vào chỗ nào đó trong đầu bạn đã nứt từ lâu, và chỗ ấy khép lại. Bạn dặn đoàn kéo dây lên.',
            resultEn: 'The whisper says nothing, only holds a single note. The note touches a place in your head that has been cracked for a long time, and the crack closes. You tell the team to haul the ropes up.',
            effects: { sanity: +14, resonance: +12, rep: +6, health: +4 }
          },
          {
            w: 30,
            resultVi: 'Giọng thì thầm gọi bạn bằng tên người bạn đã bỏ lại. Bạn trả lời trước khi kịp nghĩ. Cả đoàn phải kéo bạn lên bằng dây.',
            resultEn: 'The whisper calls you by the name of someone you left behind. You answer before you can think. The whole team has to haul you up on the rope.',
            effects: { sanity: -10, resonance: +10, health: -3 }
          }
        ]
      }
    ]
  },

  // ==================================================================
  // SYNDICATE APEX SOVEREIGNTY & BOSS ECONOMY EVENTS (BUG-35)
  // ==================================================================
  {
    id: 'syn_thumb_apex_tribute_summit',
    age: [28, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 88,
    need: { jobs: ['Syndicate'], finger: 'Thumb', fingerRank: 3 },
    vi: "[Đại hội cống nạp của The Thumb] Từ chiếc ghế nhung đỏ trên tầng cao nhất của Red Night Pentagon, bạn nhìn xuống hàng chục Capo và chủ băng chư hầu quỳ dâng những rương sắt đầy tiền bảo kê, thuế thuốc súng và khế ước đất của bốn khu phố.",
    en: "[The Thumb Tribute Summit] From the red velvet chair at the top of the Red Night Pentagon you look down on dozens of Capos and vassal gang bosses kneeling with iron chests of protection money, gunpowder tax and land deeds from four districts.",
    choices: [
      {
        labelVi: "Thu toàn bộ cống nạp quý và siết hạn nộp của các băng chư hầu",
        labelEn: "Collect the full quarterly tribute and tighten the vassal gangs’ payment deadlines",
        resultVi: "Những rương Ahn nặng được khiêng thẳng vào hầm riêng của Underboss. Không Capo nào ngẩng lên nhìn bạn.",
        resultEn: "Heavy chests of Ahn are carried straight to the Underboss’s private vault. No Capo looks up at you.",
        meritAdd: 20,
        effects: { wealth: +38, rep: +18, network: +10 }
      },
      {
        labelVi: "Chi 25 Ahn trang bị đạn áp suất cao cho cả đội Capo dưới quyền",
        labelEn: "Spend 25 Ahn to arm the Capos under you with high-pressure rounds",
        costAhn: 25,
        resultVi: "Tiếng lên đạn đồng loạt vang khắp sảnh. Từ hôm đó, hỏa lực của nhánh The Thumb dưới quyền bạn khiến các ngõ hẹp khó vào hơn nhiều.",
        resultEn: "The sound of rounds being chambered rolls across the hall. From that day the firepower of your branch of The Thumb makes the narrow streets far harder to enter.",
        meritAdd: 25,
        effects: { rep: +28, network: +18, health: +15, sanity: +10, heat: -10 }
      },
      {
        labelVi: "Chi 15 Ahn mở tiệc rượu Nest và thưởng đạn vàng cho các Sottocapo trung thành",
        labelEn: "Spend 15 Ahn on a Nest wine banquet and gold bullets for the loyal Sottocapos",
        costAhn: 15,
        resultVi: "Sự hào phóng vừa đủ khiến thuộc hạ nhớ ơn bạn lâu hơn nhớ sợ bạn. Những mối bất mãn cũ nguội đi.",
        resultEn: "A generosity just large enough makes your men remember the favor longer than the fear. Old grudges cool.",
        meritAdd: 16,
        effects: { sanity: +18, rep: +14, network: +14, heat: -18 }
      }
    ]
  },
  {
    id: 'syn_thumb_apex_wing_treaty',
    age: [28, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 82,
    need: { jobs: ['Syndicate'], finger: 'Thumb', fingerRank: 3 },
    vi: '[Mật Đàm Vũ Khí Với Wing · Phán Quyết Của Underboss] Một Giám đốc hậu cần của Wing lân cận đích thân tìm đến dinh thự của bạn trong đêm, đề nghị ký thỏa thuận ngầm: The Thumb sẽ bảo vệ các đoàn tàu chở hàng Singularity đi qua Backstreets để đổi lấy hoa hồng kếch xù hoặc công nghệ quân giới.',
    en: '[Clandestine Wing Arms Treaty · Underboss Decree] A neighboring Wing logistics director visits your manor by night, proposing a secret pact: The Thumb will guard Singularity freight convoys through the Backstreets in exchange for massive commissions or military tech.',
    choices: [
      {
        labelVi: 'Ký khế ước bảo kê tuyến vận chuyển ngầm, thu tiền mặt trực tiếp bằng Ahn',
        labelEn: 'Sign the convoy protection pact and collect direct Ahn payouts',
        resultVi: 'Mỗi chuyến tàu đi qua lãnh địa của bạn đều để lại những vali tiền mặt nguyên niêm phong. Kho bạc của bạn ngày càng đầy ắp.',
        resultEn: 'Every freight train crossing your turf left behind sealed briefcases of Ahn.',
        meritAdd: 22,
        effects: { wealth: +42, network: +15, rep: +14 }
      },
      {
        labelVi: 'Chi 22 Ahn mua đứt lô lõi năng lượng Singularity để nâng cấp kho vũ khí The Thumb',
        labelEn: 'Spend 22 Ahn to acquire Singularity energy cores for The Thumb armory',
        costAhn: 22,
        resultVi: 'Những khẩu súng lưỡi lê của nhánh bạn được tích hợp lõi năng lượng mới. Uy thế của bạn vượt xa các Underboss cùng thời.',
        resultEn: 'Your branch’s bayonet rifles were fitted with Singularity cores, elevating your prestige above rival Underbosses.',
        meritAdd: 28,
        effects: { rep: +30, resonance: +14, health: +12, network: +12 }
      }
    ]
  },
  {
    id: 'syn_index_apex_loom_decree',
    age: [26, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 88,
    need: { jobs: ['Syndicate'], finger: 'Index', fingerRank: 3 },
    vi: '[Thánh Điện Khung Cửi · Ý Chỉ Của Weaver] Dưới căn hầm sâu nhất nơi hàng vạn sợi chỉ vàng rung lên theo chấn động của The City, các Proxy và Messenger đồng loạt quỳ xuống chờ bạn trao những cuộn Prescript vừa dệt xong. Quyền phân phối định mệnh và tài sản của cả vùng nằm trong tay bạn.',
    en: '[Sanctum of the Loom · Will of the Weaver] In the deepest subterranean chamber where ten thousand golden threads hum with the City’s vibrations, Proxies and Messengers kneel awaiting the newly woven Prescripts from your hand.',
    choices: [
      {
        labelVi: 'Ban hành Prescript thu nạp hiến lễ tài chính từ các thương hội ngầm trong ba District',
        labelEn: 'Issue Prescripts levying financial offerings from underground merchant guilds across three Districts',
        resultVi: 'Không một thương hội nào dám trái lời Chỉ thị. Những đoàn xe chở đầy vàng và Ahn lặng lẽ xếp hàng trước cửa thánh điện của bạn.',
        resultEn: 'No guild dared defy the Prescript. Caravans laden with Ahn queued silently before your sanctum.',
        meritAdd: 22,
        effects: { wealth: +36, rep: +16, resonance: +14, network: +10 }
      },
      {
        labelVi: 'Chi 25 Ahn trùng tu đại sảnh con lắc cộng hưởng và ban giáp lụa trắng mới cho các Proxy',
        labelEn: 'Spend 25 Ahn to consecrate the resonance pendulums and robe your Proxies in new white silk armor',
        costAhn: 25,
        resultVi: 'Âm thanh của Khung Cửi vang ngân trong trẻo chưa từng thấy. Tâm trí bạn hòa làm một với dòng chảy nhân quả của thành phố.',
        resultEn: 'The Loom’s resonance rang with unprecedented clarity. Your mind harmonized with the causal tide of the City.',
        meritAdd: 26,
        effects: { rep: +26, sanity: +18, resonance: +18, network: +14 }
      },
      {
        labelVi: 'Chi 16 Ahn mở kho lương thực cứu tế cư dân Backstreets theo lời dệt của Khung Cửi',
        labelEn: 'Spend 16 Ahn to open granaries for Backstreets residents as woven by the Loom',
        costAhn: 16,
        resultVi: 'Cả khu phố tôn sùng The Index như vị cứu tinh giữa đêm đen. Mọi cuộc điều tra của Hana nhắm vào nhánh của bạn đều bị người dân che giấu.',
        resultEn: 'The streets revered The Index as saviors in the dark. Citizens shielded your branch from every Hana inquiry.',
        meritAdd: 18,
        effects: { sanity: +20, network: +16, rep: +12, heat: -20 }
      }
    ]
  },
  {
    id: 'syn_index_apex_fate_arbitration',
    age: [26, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 82,
    need: { jobs: ['Syndicate'], finger: 'Index', fingerRank: 3 },
    vi: '[Phán Quyết Dòng Chảy · Quyền Năng Weaver] Hai tập đoàn buôn vũ khí lớn đang đứng bên bờ vực hủy diệt lẫn nhau. Cả hai bên đều bí mật cử sứ giả mang rương báu vật đến cầu xin một lời giải mã từ Khung Cửi của bạn để biết ai sẽ là kẻ sống sót.',
    en: '[Arbitration of the Causal Tide · Weaver Sovereignty] Two rival arms cartels stand on the brink of mutual annihilation. Both secretly send envoys bearing treasure chests to beg a reading from your Loom.',
    choices: [
      {
        labelVi: 'Thu phí giải mã định mệnh từ cả hai phía và trao đúng mảnh Prescript phần thắng',
        labelEn: 'Collect divination tribute from both sides and deliver the true Prescript of victory',
        resultVi: 'Lời tiên tri của Khung Cửi ứng nghiệm tuyệt đối chỉ sau một đêm. Bạn thu về khoản tiền khổng lồ và củng cố mạng lưới quyền lực ngầm.',
        resultEn: 'The Loom’s prophecy came to pass overnight. You reaped a massive fortune and expanded your shadow network.',
        meritAdd: 20,
        effects: { wealth: +44, network: +18, rep: +14 }
      },
      {
        labelVi: 'Đích thân dẫn các Messenger xóa sổ cả hai phe để thu hồi tuyến đường buôn về tay The Index',
        labelEn: 'Lead your Messengers to purge both cartels and claim their trade routes for The Index',
        resultVi: 'Những lưỡi kiếm trắng lướt qua trong đêm. Toàn bộ kho hàng và tuyến đường giao thương thuộc về The Index.',
        resultEn: 'White blades flashed through the night. Every warehouse and trade route fell under The Index.',
        meritAdd: 25,
        effects: { wealth: +28, rep: +28, resonance: +16, health: -8 }
      }
    ]
  },
  {
    id: 'syn_middle_apex_vengeance_court',
    age: [26, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 88,
    need: { jobs: ['Syndicate'], finger: 'Middle', fingerRank: 3 },
    vi: '[Đại Sảnh Book of Vengeance · Phán Quyết Của Great Sibling] Bạn ngồi trên chiếc ghế bành chạm khắc xích vàng, trước mặt là cuốn Book of Vengeance dày cộm. Hàng loạt ông chủ sòng bạc, chủ xưởng và hội trưởng thương đoàn đang run rẩy đặt những bao tải Ahn lên bàn để xin xóa tên khỏi danh sách trả thù của đại gia đình.',
    en: '[Grand Hall of the Book of Vengeance · Great Sibling Judgment] Seated upon a throne carved with golden chains, the heavy Book of Vengeance open before you, casino owners and guild masters tremble as they pile sacks of Ahn to beg erasure from the family’s grudge ledger.',
    choices: [
      {
        labelVi: 'Chấp thuận tiền bồi thường danh dự gia tộc và thu tô bảo hộ gấp đôi',
        labelEn: 'Accept the blood-indemnity fortune and double their protection tribute',
        resultVi: 'Bạn gạch một đường mực tím xác nhận món nợ đã trả bằng vàng. Kho quỹ của đại gia đình ngập tràn Ahn.',
        resultEn: 'A stroke of violet ink marked the debt settled in gold. The family treasury overflowed with Ahn.',
        meritAdd: 22,
        effects: { wealth: +40, rep: +20, network: +12 }
      },
      {
        labelVi: 'Chi 25 Ahn mở Đại Tiệc Huynh Đệ suốt ba ngày đêm và rèn xiềng xích vàng mới cho các Big Sibling',
        labelEn: 'Spend 25 Ahn on a three-day Family Feast and forge golden chains for your Big Siblings',
        costAhn: 25,
        resultVi: 'Tiếng cụng ly và tiếng cười vang vọng khắp cả quận. Tình nghĩa huynh đệ gắn kết như sắt thép, hình xăm cường hóa trên cơ thể bạn rực sáng.',
        resultEn: 'Toasts and laughter shook the District. Family bonds hardened like steel as your enhancement tattoos glowed.',
        meritAdd: 25,
        effects: { health: +22, sanity: +20, rep: +25, network: +18 }
      },
      {
        labelVi: 'Hất đổ đống tiền: Đích thân dẫn đại quân nghiền nát kẻ dám xúc phạm Little Sibling của bạn',
        labelEn: 'Kick aside the money: Personally lead the family to crush those who insulted your Little Sibling',
        resultVi: 'Bạn tịch thu toàn bộ gia sản của kẻ thù sau khi san phẳng trụ sở của chúng. Cả The City thêm một lần khiếp sợ câu nói: "The Middle không bao giờ quên".',
        resultEn: 'You seized their entire estate after flattening their headquarters. The City remembered once more: The Middle never forgets.',
        meritAdd: 26,
        effects: { wealth: +30, rep: +32, health: -10, heat: +10 }
      }
    ]
  },
  {
    id: 'syn_middle_apex_turf_crusade',
    age: [26, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 82,
    need: { jobs: ['Syndicate'], finger: 'Middle', fingerRank: 3 },
    vi: "[Chuyến đi của Great Sibling] Các bến cảng và chợ đêm mới mở ở rìa District đang cần một chỗ dựa. Với tư cách Great Sibling, một cái phất tay của bạn quyết định tiền bảo kê chảy về đâu trong mùa này.",
    en: "[The Great Sibling’s Rounds] The newly opened docks and night markets on the District edge need someone to lean on. As Great Sibling, one wave of your hand decides where the protection money flows this season.",
    choices: [
      {
        labelVi: "Thu tiền bảo kê toàn bộ cảng và chợ đêm, chia phần cho các nhánh gia tộc",
        labelEn: "Collect protection from all the docks and night markets and share it with the Family branches",
        resultVi: "Cờ hiệu của The Middle tung bay trên mọi nóc kho cảng. Mỗi tuần, tiền đổ về đều như nước từ vòi.",
        resultEn: "The Middle’s banner flies on every dock warehouse roof. Every week the money arrives as steadily as water from a tap.",
        meritAdd: 20,
        effects: { wealth: +38, rep: +16, network: +14 }
      },
      {
        labelVi: "Chi 20 Ahn khắc hình xăm cường hóa cho thế hệ mới và lập quỹ thưởng cho các Little Sibling",
        labelEn: "Spend 20 Ahn on enhancement tattoos for the new generation and a reward fund for the Little Siblings",
        costAhn: 20,
        resultVi: "Mỗi người em trong nhà đều mạnh hơn, và nhớ rõ ai đã trả tiền. Tên Great Sibling của bạn được nhắc tới trong cả The Five Fingers.",
        resultEn: "Every sibling in the house comes out stronger and remembers clearly who paid. Your name as Great Sibling is mentioned across The Five Fingers.",
        meritAdd: 24,
        effects: { rep: +24, sanity: +16, resonance: +14, health: +12 }
      }
    ]
  },
  {
    id: 'syn_ring_apex_royal_auction',
    age: [26, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 88,
    need: { jobs: ['Syndicate'], finger: 'Ring', fingerRank: 3 },
    vi: "[Đêm đấu giá của Grand Curator] Dưới đèn chùm pha lê của Đại Bảo Tàng Năm Hành Lang, những tỷ phú từ Nest và vài người đeo mặt nạ vàng tranh nhau trả giá cho các tác phẩm mang dấu của bạn, Grand Curator của The Ring.",
    en: "[The Grand Curator’s Auction Night] Beneath the crystal chandeliers of the Five Corridors museum, Nest billionaires and a few people in gold masks bid on works that carry your seal, Grand Curator of The Ring.",
    choices: [
      {
        labelVi: "Gõ búa chốt giá và nhận phần hoa hồng của Grand Curator",
        labelEn: "Strike the gavel and take the Grand Curator’s commission",
        resultVi: "Búa gỗ gõ xuống mặt đá cẩm thạch. Những tấm séc từ Nest được đưa tận tay bạn, và không ai nhìn lâu vào chữ ký.",
        resultEn: "The gavel strikes the marble. Checks from the Nest are handed to you directly, and nobody looks long at the signatures.",
        meritAdd: 24,
        effects: { wealth: +48, rep: +22, network: +16 }
      },
      {
        labelVi: "Chi 25 Ahn tài trợ Năm Trường Phái dựng một triển lãm điêu khắc ánh sáng",
        labelEn: "Spend 25 Ahn to sponsor the Five Corridors in a light-sculpture exhibition",
        costAhn: 25,
        resultVi: "Triển lãm mở cửa ba đêm, và hàng người xếp dài tới tận ga tàu. Các Maestro và Docent không nói gì với bạn, chỉ lần lượt cúi đầu khi đi ngang qua.",
        resultEn: "The exhibition runs for three nights, and the queue stretches back to the station. The Maestros and Docents say nothing to you, only bow as they pass.",
        meritAdd: 28,
        effects: { rep: +30, sanity: +20, resonance: +20, network: +16 }
      },
      {
        labelVi: "Chi 18 Ahn mua cổ vật lạ từ The Ruins cho phòng trưng bày riêng",
        labelEn: "Spend 18 Ahn on strange relics from The Ruins for your private gallery",
        costAhn: 18,
        resultVi: "Những cổ vật ngân lên một âm rất khẽ mỗi khi bạn đứng gần. Bạn bắt đầu hiểu cái đẹp theo cách khó nói thành lời, và ngủ ngon hơn trong những đêm sau.",
        resultEn: "The relics give off a very faint note whenever you stand close. You begin to understand beauty in a way that is hard to put into words, and sleep better in the nights after.",
        meritAdd: 18,
        effects: { sanity: +18, resonance: +18, network: +14, heat: -12 }
      }
    ]
  },
  {
    id: 'syn_ring_apex_critic_tribunal',
    age: [26, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 82,
    need: { jobs: ['Syndicate'], finger: 'Ring', fingerRank: 3 },
    vi: '[Hội Đồng Thẩm Định Tối Cao · Ngai Vàng Grand Curator] Hàng loạt phòng trưng bày tại các vùng Nest và Backstreets gửi đơn xin chứng nhận "Bảo Tàng Không Xâm Phạm" của The Ring. Chỉ cần chữ ký của bạn, họ sẵn sàng dâng nộp cả gia tài.',
    en: '[Supreme Appraisal Tribunal · Throne of the Grand Curator] Galleries across Nests and Backstreets petition for The Ring’s Inviolable Sanctuary seal. For your signature alone, they offer fortunes.',
    choices: [
      {
        labelVi: 'Cấp ấn bảo chứng cho các phòng tranh thượng lưu để thu phí thẩm định hàng năm',
        labelEn: 'Grant sanctuary seals to elite galleries in exchange for annual appraisal fees',
        resultVi: 'Nguồn tiền tài trợ nghệ thuật chảy vào két sắt của bạn không ngừng nghỉ.',
        resultEn: 'Art patronage royalties flowed ceaselessly into your vault.',
        meritAdd: 20,
        effects: { wealth: +38, rep: +18, network: +15 }
      },
      {
        labelVi: 'Đích thân chấm điểm và nâng đỡ một thế hệ Maestro mới cho The Ring',
        labelEn: 'Personally judge and elevate a new generation of Maestros for The Ring',
        resultVi: 'Các tân Maestro tuyên thệ trung thành tuyệt đối với học thuyết thẩm mỹ của bạn.',
        resultEn: 'The newly anointed Maestros swore undying fealty to your aesthetic doctrine.',
        meritAdd: 24,
        effects: { rep: +26, network: +18, sanity: +16, resonance: +10 }
      }
    ]
  },
  {
    id: 'syn_pinky_apex_shadow_bourse',
    age: [26, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 88,
    need: { jobs: ['Syndicate'], finger: 'Pinky', fingerRank: 3 },
    vi: '[Sàn Giao Dịch Mật Ước · Quyền Bính Sovereign] Trên đỉnh tháp chuông cổ nhìn xuống toàn cảnh sương mù The City, các mật sứ của The Pinky đặt trước mặt bạn những chiếc hộp gỗ mun chứa cổ tức chợ đen, tiền chuộc bí mật từ các quan chức Wing và danh sách những kẻ nợ lời thề ngoắc tay.',
    en: '[The Shadow Pact Bourse · Sovereign Authority] Atop the ancient bell tower overlooking the mist-shrouded City, Pinky envoys lay ebony boxes before you containing black-market dividends, hush-money tributes from Wing officials, and pinky-swear ledgers.',
    choices: [
      {
        labelVi: 'Thu toàn bộ cổ tức chợ đen và tiền cống nạp giữ bí mật từ các tài phiệt Nest',
        labelEn: 'Collect all black-market dividends and secrecy tributes from Nest oligarchs',
        resultVi: 'Bạn nắm giữ sinh mạng chính trị của hàng chục nhân vật lớn. Vàng bạc và Ahn được chuyển thẳng vào tài khoản vô danh của Sovereign.',
        resultEn: 'Holding the political lifelines of dozens of elites, vast sums of Ahn flowed into your untraceable Sovereign accounts.',
        meritAdd: 24,
        effects: { wealth: +44, network: +20, rep: +18 }
      },
      {
        labelVi: 'Chi 25 Ahn nuôi dưỡng mạng lưới sát thủ Thập Đao và xóa sạch mọi hồ sơ truy nã tại Hana',
        labelEn: 'Spend 25 Ahn to fund the Ten Blades assassin network and erase all Hana wanted files',
        costAhn: 25,
        resultVi: 'Mọi dấu vết của bạn và các huynh đệ biến mất hoàn toàn khỏi sổ sách Hiệp hội. Tên tuổi Sovereign trở thành bóng ma tối thượng của thế giới ngầm.',
        resultEn: 'Every trace of you and your sworn brethren vanished from Association records.',
        meritAdd: 26,
        effects: { heat: -35, rep: +26, network: +22, sanity: +14 }
      },
      {
        labelVi: 'Chi 16 Ahn lập quỹ tín thác ngầm và trạm y tế bí mật cho các huynh đệ The Pinky',
        labelEn: 'Spend 16 Ahn to establish covert safe houses and medical stations for Pinky brethren',
        costAhn: 16,
        resultVi: 'Bất cứ nơi nào trong 26 District cũng có trạm nghỉ ngơi và bác sĩ riêng chờ đón bạn.',
        resultEn: 'Across all 26 Districts, hidden sanctuaries and private physicians await your call.',
        meritAdd: 18,
        effects: { health: +20, sanity: +18, network: +16, heat: -15 }
      }
    ]
  },
  {
    id: 'syn_pinky_apex_ten_blades_conclave',
    age: [26, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 82,
    need: { jobs: ['Syndicate'], finger: 'Pinky', fingerRank: 3 },
    vi: "[Mật hội Thập Đao] Hai thế lực dọc biên giới District sắp giao chiến, và cả hai đều gửi người mang mật thư cùng một khoản đặt cọc lớn, xin các Ngôi Sao của The Pinky đừng can dự.",
    en: "[Conclave of the Ten Blades] Two powers along the District border are about to go to war, and both send envoys with sealed letters and a large deposit, asking the Stars of The Pinky to stay out of it.",
    choices: [
      {
        labelVi: "Nhận tiền cống trung lập rồi bán tin cho bên trả giá cao hơn",
        labelEn: "Take the neutrality tribute and sell what you know to the higher bidder",
        resultVi: "Vài dòng nhắn qua một người liên lạc đem lại cho bạn cả một món lời mà không phải rút lưỡi dao nào. Cả hai bên đều nghĩ bạn đứng về phía mình.",
        resultEn: "A few lines passed through a go-between earn you a fortune without drawing a blade. Both sides believe you are theirs.",
        meritAdd: 22,
        effects: { wealth: +42, rep: +18, network: +16 }
      },
      {
        labelVi: "Triệu tập các Ngôi Sao của The Pinky và giữ cả tuyến thương mại biên giới",
        labelEn: "Summon the Stars of The Pinky and take the whole border trade route",
        resultVi: "Đến tối, cả tuyến biên giới đã đổi chủ mà không ai nổ một phát súng. Các Fixer cấp cao nhìn bạn lâu hơn một nhịp trước khi chào.",
        resultEn: "By nightfall the whole border route has changed hands without a shot. High-grade Fixers look at you a beat longer before they greet you.",
        meritAdd: 28,
        effects: { wealth: +30, rep: +30, resonance: +16, health: -8 }
      }
    ]
  },
  {
    id: 'syn_boss_underground_casino_tribute',
    age: [24, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 78,
    need: { jobs: ['Syndicate'], fingerRankAtLeast: 2 },
    vi: '[Sòng Bạc Ngầm & Thuế Bảo Kê Liên Quận · Thủ Lĩnh Syndicate] Các quản lý sòng bạc ngầm, chợ đêm và kho hàng lậu trên khắp địa bàn đồng loạt mang sổ sách cuối mùa đến trình diện bạn. Với địa vị đứng đầu một phương của Ngón Tay, bạn toàn quyền quyết định cách thu và tiêu số tiền khổng lồ này.',
    en: '[Underground Casino & Turf Tribute · Syndicate Boss] Managers of underground casinos, night markets, and smuggling depots across your territory present their seasonal ledgers. As a high-ranking Finger leader, the flow of Ahn is yours to command.',
    choices: [
      {
        labelVi: 'Thu toàn bộ lợi nhuận ròng và tiền bảo kê mùa này vào két sắt cá nhân',
        labelEn: 'Sweep all net profits and seasonal protection tribute into your personal vault',
        resultVi: 'Những vali tiền mặt được xếp kín căn phòng làm việc của bạn. Quyền lực ở thế giới ngầm luôn đi kèm với khối tài sản kếch xù.',
        resultEn: 'Briefcases of Ahn lined your office walls. Underworld authority brings immense wealth.',
        meritAdd: 18,
        effects: { wealth: +36, rep: +15, network: +8 }
      },
      {
        labelVi: 'Chi 20 Ahn đầu tư mở rộng thêm hai sòng bạc và bến hàng ngầm ở khu phố kế bên',
        labelEn: 'Spend 20 Ahn to expand two new casinos and smuggling docks in the adjacent ward',
        costAhn: 20,
        outcomes: [
          {
            w: 75,
            meritAdd: 24,
            effects: { wealth: +48, rep: +22, network: +18 },
            resultVi: 'Thương vụ mở rộng địa bàn thành công vang dội. Chỉ sau một quý, tiền lãi thu về đã gấp đôi số vốn bỏ ra.',
            resultEn: 'The turf expansion succeeded brilliantly. Within a single quarter, returns more than doubled your outlay.'
          },
          {
            w: 25,
            meritAdd: 16,
            effects: { wealth: +26, rep: +14, heat: +10 },
            resultVi: 'Dù có chút va chạm với băng nhóm địa phương, đàn em của bạn vẫn áp đảo hoàn toàn và mang về khoản lời đáng kể.',
            resultEn: 'Despite brief friction with local crews, your enforcers secured the turf and brought back solid profits.'
          }
        ]
      }
    ]
  },
  {
    id: 'syn_boss_lavish_syndicate_extravaganza',
    age: [24, 95],
    major: true,
    repeatable: true,
    allowDistorted: true,
    weight: 76,
    need: { jobs: ['Syndicate'], fingerRankAtLeast: 2 },
    vi: "[Tiền của thủ lĩnh] Khi đã ở đỉnh Syndicate, tiền không còn để tiêu cho vui. Nó để mua sự an toàn, và bạn biết rõ mình mua được loại nào.",
    en: "[A Boss’s Money] At the top of the Syndicate, money is no longer for fun. It buys safety, and you know exactly which kind you can afford.",
    choices: [
      {
        labelVi: "Chi 25 Ahn thuê khoang hồi phục K Corp và một biệt thự kín",
        labelEn: "Spend 25 Ahn on a private K Corp regeneration pod and a secluded villa",
        costAhn: 25,
        resultVi: "Vết thương cũ khép lại. Bạn ngủ sáu ngày trong căn phòng có người canh cửa suốt hai mươi bốn giờ, và lần đầu sau nhiều năm bạn thức dậy mà không nghe tiếng bước chân ngoài hành lang.",
        resultEn: "Old wounds close. You sleep six days in a room guarded around the clock, and for the first time in years you wake without footsteps in the corridor.",
        meritAdd: 15,
        effects: { health: +32, sanity: +28, heat: -15, rep: +10 }
      },
      {
        labelVi: "Chi 20 Ahn mua chuộc thanh tra Hiệp hội và quan chức Wing để xóa án tích",
        labelEn: "Spend 20 Ahn to bribe Association inspectors and Wing officials and wipe your record",
        costAhn: 20,
        resultVi: "Những phong bì dày đi qua bốn bàn làm việc. Đến cuối tuần, hồ sơ truy nã mang tên bạn nằm trong một kho lưu trữ không ai mở.",
        resultEn: "Thick envelopes pass over four desks. By the end of the week the bounty file with your name sits in an archive nobody opens.",
        meritAdd: 18,
        effects: { heat: -35, network: +20, rep: +15, sanity: +10 }
      },
      {
        labelVi: "Không tiêu tiền: triệu tập các đội trưởng nộp quỹ dự phòng",
        labelEn: "Spend nothing: summon your captains to pay into the reserve fund",
        resultVi: "Các đội trưởng đặt quỹ lên bàn bạn, và không ai nói gì về chuyện đó. Bạn đếm hai lần rồi cất đi.",
        resultEn: "The captains set the fund on your desk and none of them mentions it. You count it twice, then put it away.",
        meritAdd: 15,
        effects: { wealth: +28, rep: +12 }
      }
    ]
  }
];
