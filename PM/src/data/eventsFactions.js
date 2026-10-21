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
    vi: '[Ngã Rẽ Sự Nghiệp Fixer · Ba Bản Giao Kèo Đẫm Máu] Một Fixer tự do không có sự bảo hộ của Văn phòng (Office) hay Hiệp hội (Association) chỉ là con mồi béo bở cho các băng nhóm thanh trừng mà không kẻ nào phải bồi thường một xu Ahn. Sau chuỗi hợp đồng sống sót dưới đáy Backstreets, ba lời mời gia nhập nằm ngay ngắn trên bàn trọ của bạn:\n\n1. Hook Office — Văn phòng chuyên nhận các hợp đồng truy lùng tiền thưởng tàn bạo nhất trong ngõ hẻm.\n2. Hiệp Hội Shi — Phân hội sát thủ kiêm lực lượng xung kích cảm tử, nơi cái chết được tôi luyện thành nghệ thuật kiếm pháp.\n3. Hiệp Hội Öufi — Phân hội chấp pháp hợp đồng của The City, nơi công lý được thực thi lạnh lùng bằng lưỡi kích nặng nề.',
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
        resultVi: 'Tại võ đường Shi Association, bạn bị cuốn vào chuỗi huấn luyện 96 giờ không ngủ giữa những vết thương chưa kịp khâu miệng. Các kiếm sĩ Shi dạy bạn triết lý tối thượng: "Lưỡi đao chỉ đạt độ sắc bén hoàn mỹ nhất khi lồng ngực người cầm kiếm chỉ còn lại hơi thở cuối cùng." Bạn mang vết sẹo khắc của Shi lên ngực, sẵn sàng bước vào ngưỡng tử.',
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
    vi: '[Ranh Giới Tử Thần · Tuyệt Kỹ Boundary of Death] Mười một đêm ròng rã thực thi các bản án ám sát của Hiệp hội Shi mà không được chợp mắt. Toàn thân bạn rách nát, phế quản rít lên lạo xạo sau mỗi hơi thở hụt hơi. Mục tiêu đêm nay là một Capo mang giáp trợ lực hạng nặng — kẻ đã chém gục toàn bộ phân đội của bạn. Lưỡi đại đao của hắn đang gí sát vào yết hầu bạn, máu tươi chảy ròng ròng xuống ngực áo rách. Giữa ranh giới mong manh của sự sống và cái chết, ngọn lửa kiếm pháp tối thượng của Shi bùng cháy.',
    en: '[Boundary of Death] Eleven nights straight working for Shi. Your lungs crackle with each breath. Tonight’s target is stronger than anything in your briefing, and his blade is already at your throat.',
    choices: [
      {
        labelVi: 'Bỏ phòng thủ, dồn tất cả vào một nhát',
        labelEn: 'Drop your guard and put everything into one cut',
        outcomes: [
          {
            w: 50,
            resultVi: 'Bạn buông bỏ mọi phòng thủ, dồn toàn bộ sinh mệnh tàn tạ vào một nhát chém duy nhất — Boundary of Death. Bạn thậm chí không nghe thấy tiếng kim loại rít lên. Trong tích tắc mù lòa, lưỡi kiếm của bạn cắt ngọt qua lớp giáp thép và xẻ đôi thân xác đối thủ. Căn phòng lặng phắc như tờ, chỉ còn lại tiếng máu tươi nhỏ giọt tí tách trên mũi kiếm run rẩy của bạn.',
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
    age: [18, 38],
    major: true,
    weight: 10,
    jobs: ['Syndicate'],
    forbids: ['SwornFinger'],
    vi: '[Hội Nghị Ngầm Dưới Lòng Đất · Lời Tuyên Thệ Của Năm Ngón Tay] Trong một căn hầm vòm bằng đá cổ xưa sâu dưới lòng Backstreets, năm sứ giả đại diện cho Năm Ngón Tay (The Five Fingers) — năm đại Syndicate cai trị toàn bộ thế giới ngầm The City — đang tuyển mộ tân binh. Bước qua ngưỡng cửa này là dấn thân vào con đường không lối thoát, nơi mỗi Ngón Tay cai trị bằng một thứ luật lệ thép khắc nghiệt tột cùng.',
    en: '[Choosing a Finger] In a basement under the Backstreets, emissaries of the Fingers are recruiting. Once you are in, you never leave, and each Finger enforces its own iron law.',
    choices: [
      {
        labelVi: 'The Thumb: kỷ luật và tôn ti',
        labelEn: 'The Thumb: discipline and rank',
        resultVi: 'Tại sảnh tiệc của The Thumb (Ngón Cái), trật tự thứ bậc là chân lý bất di bất dịch. Một tân binh vừa lỡ ngước mắt nhìn thẳng vào Sottocapo liền tự quỳ xuống rút kìm bạc nhổ đứt lưỡi mình để chuộc tội vô lễ. Bạn nhận bộ âu phục đen viền đỏ và khẩu súng hỏa mai của một Soldato, thề tuyệt đối tuân phục mệnh lệnh cấp trên.',
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
        resultVi: 'Sứ Giả của The Index (Ngón Trỏ) với dải băng lụa trắng bịt mắt trao vào tay bạn cuộn chỉ vàng và thanh kiếm ngắn: "Không được nghi vấn Dòng Chảy. Chỉ Lệnh là ý chí của The City." Bạn chính thức trở thành một Giáo Đồ (Proselyte), sẵn sàng hành quyết bất cứ ai cản đường nhân quả.',
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
        resultVi: 'Những người anh em của The Middle (Ngón Giữa) dùng kim nung khắc hình xích sắt chạy dọc cánh tay bạn. Họ ôm chặt lấy bạn giữa tiếng reo hò cuồng nhiệt: "Ai đụng đến một sợi tóc của người anh em này, cả gia tộc chúng sẽ phải trả giá bằng máu trong Book of Vengeance!"',
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
        resultVi: 'Các Docent của The Ring (Ngón Áp Út) dẫn bạn bước vào triển lãm Atelier tráng lệ lót đá cẩm thạch. Trước mắt bạn là những bức tượng sống được tạo hình từ da thịt, xương cốt và mạch máu người còn đang đập. Bạn nôn thốc nôn tháo ở góc phòng. Người Docent đeo mặt nạ thạch cao mỉm cười: "Kinh hãi là bước đầu tiên của sự thấu cảm nghệ thuật. Chào mừng tân sinh viên."',
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
        resultVi: 'Người điều hành của The Pinky (Ngón Út) siết chặt ngón tay út của bạn trong bóng tối ẩm ướt của đường hầm: "Ở đây không có cấp bậc hay sổ sách. Chỉ có những lời thề ngón út. Kẻ thất hứa sẽ bị trừng phạt bằng cách xóa sổ khỏi ký ức người sống." Bạn nhận thanh đoản kiếm mảnh mai và bước vào mạng lưới ngầm.',
        resultEn: 'In the deepest alley shadow, a velvet-gloved figure gripped your pinky finger. “In the Pinky, an oath is heavier than life. Break it, and you forfeit all.” A slender dagger was pressed into your grasp.',
        setFinger: 'Pinky',
        setFingerRank: 0,
        flagsAdd: ['SwornFinger'],
        recordsAdd: ['finger_initiate'],
        effects: { wealth: +16, heat: +10, sanity: -8 },
        meritAdd: 12
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
    vi: '[Lễ Nghi Bất Khả Xâm Phạm Của The Thumb] Trong buổi tiệc chia địa bàn tại sảnh đường lộng lẫy, vị Sottocapo uy nghiêm ra lệnh phóng hỏa san phẳng toàn bộ dãy nhà trọ nơi người anh em kết nghĩa của bạn đang sinh sống. Bạn vừa vô thức cau mày bước lên một bước, một Capo bên cạnh liền rút con dao găm mạ vàng đặt cạch xuống bàn tiệc: "Ngươi định biểu lộ sự phản đối trước mặt Sottocapo sao? Đó là hành vi bất kính tột cùng. Tự rạch mặt tạ tội đúng lễ nghi, hoặc ta sẽ hạ lệnh cho đội Soldato bắn nát đầu toàn bộ tổ đội của ngươi."',
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
    age: [21, 52],
    major: true,
    weight: 8.5,
    jobs: ['Syndicate'],
    finger: 'Ring',
    vi: '[Khảo Thí Tốt Nghiệp Atelier Của The Ring] Giờ thẩm định phong hàm Maestro đã điểm. Gian phòng triển lãm của The Ring thơm nồng mùi dầu lanh, phooc-môn và sơn đỏ chu sa. "Chất liệu thô" được cấp cho bạn là một Fixer thù địch còn sống nguyên vẹn, bị đóng đinh căng trên khung gỗ. Xung quanh, các Giảng Viên (Docents) trong trang phục dạ hội trắng muốt cầm bảng điểm chăm chú theo dõi: "Một tác phẩm dưới điểm B đồng nghĩa với việc chính người nghệ sĩ sẽ bị nấu thành keo dán tranh cho buổi hòa nhạc tối nay."',
    en: '[The Ring’s grading] The Maestro examination has come. Your material is a living Fixer, fixed to a frame. The Docents wait with their scorecards.\nA work below a B and its artist becomes the material for tonight’s concert.',
    choices: [
      {
        labelVi: 'Làm tác phẩm mà họ muốn thấy',
        labelEn: 'Make the work they want to see',
        resultVi: 'Suốt bốn tiếng đồng hồ trong tiếng nhạc cello du dương, bạn dùng dao mổ và sơn màu sắp đặt từng thớ cơ, mạch máu của đối phương thành một bức họa lập thể sống động. Khi nhát cắt cuối cùng hoàn tất, cả khán phòng đứng dậy vỗ tay vang dội: "Điểm A cộng! Một kiệt tác tuyệt mỹ!" Bạn được tấn phong Maestro của The Ring, nhưng tiếng thở thoi thóp từ khung tranh sẽ ám ảnh giấc ngủ của bạn suốt những năm tháng còn lại.',
        resultEn: 'You worked for four hours. You tried not to hear the sounds from the frame. When you were done, the Docents stood and applauded. “A plus.” You are a Maestro. You did not sleep for a week.',
        setFinger: 'Ring',
        setFingerRank: 3,
        recordsAdd: ['ring_maestro'],
        effects: { sanity: -14, rep: +34, wealth: +32, resonance: +16 },
        scarsAdd: ['Tác phẩm được điểm A cộng'],
        meritAdd: 34
      },
      {
        labelVi: 'Dùng da thịt của chính mình thay cho chất liệu',
        labelEn: 'Use your own flesh in place of the material',
        resultVi: 'Các Docent im lặng một lúc lâu. Rồi họ cho bạn qua, và cởi trói người Fixer trên khung, vì "tác phẩm đã đủ". Bạn mất phần da trên cả cánh tay trái.',
        resultEn: 'The Docents were silent a long while. Then they passed you, and untied the Fixer on the frame, because “the work is complete.” You lost the skin of your whole left forearm.',
        setFinger: 'Ring',
        setFingerRank: 1,
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
        effects: { sanity: +12, rep: +26, wealth: +25, resonance: +10 },
        meritAdd: 26
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
    vi: '[Bí Mật Kinh Hoàng Tàu WARP · Đội Dọn Dẹp Toa Cuối] Với người dân The City, chuyến tàu WARP của W Corp chỉ mất đúng 10 giây để di chuyển giữa các Quận. Nhưng đối với những kẻ bước vào toa tàu bị sự cố, 10 giây bên ngoài là hàng ngàn năm giam cầm trong chiều không gian vô tận. Cánh cửa khoang kín bật mở, mùi máu tanh nồng và tiếng gào thét hỗn loạn xộc vào mặt bạn. Hàng trăm hành khách bất tử không thể chết đã tự xé nát cơ thể rồi khâu dính vào nhau thành những khối thịt quái đản ngoe nguẩy trên trần toa: "Đừng đi... ở lại chịu đau cùng chúng tôi..." Nhiệm vụ của bạn: Dùng vũ khí áp chế băm nhỏ các khối thịt xếp về đúng ghế trước khi Singularity phục hồi cơ thể họ.',
    en: '[The last car of the WARP Train] The trip took ten seconds. For those in the last car it took two thousand years. When the doors opened, no one stood like a person anymore. Two hundred passengers had sewn themselves together into one mass on the ceiling, and they were still talking:\n“Don’t go. Stay with us.”',
    choices: [
      {
        labelVi: 'Làm việc của một Cleanup Agent: cắt họ ra, đặt lại vào ghế',
        labelEn: 'Do a Cleanup Agent’s job: cut them apart, put them back in their seats',
        resultVi: 'Bạn vung đao dọn dẹp hiện trường địa ngục suốt bốn tiếng đồng hồ giữa những tiếng khóc van xin. Khi tiếng chuông báo hoàn tất reo lên, cỗ máy Singularity của W Corp kích hoạt, khôi phục tế bào và trí nhớ của toàn bộ hành khách về trạng thái ban đầu. Họ mỉm cười chỉnh lại cà vạt bước xuống sân ga như vừa trải qua một giấc ngủ ngắn mười giây. Bạn đứng dựa vào tường, nốc cạn liều thuốc an thần để quên đi địa ngục ngàn năm.',
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
    vi: '[Thứ biết khóc của K Corp] Sâu trong cơ sở của K Corp, bạn thấy HP Ampoule được làm từ đâu: một con mắt khổng lồ bị xích, bị buộc phải xem cảnh người ta đau đớn trên màn hình để nó khóc. Nước mắt của nó chữa lành mọi thứ.\nĐồng nghiệp đi cùng bạn giơ máy ghi hình lên. Lính gác bắn anh ta bằng một viên Decay Ampoule.',
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
    vi: '[Ngôi Nhà Im Lặng · Cơn Cuồng Nộ Của The Black Silence] Bạn trở về sau một hợp đồng dài ngày ở vùng ngoại ô, trong tay là bọc bánh ngọt còn ấm nóng và món quà nhỏ định tặng {spouse}. Cửa chính căn nhà trọ bị đập vỡ toang hoang. Bên trong, mọi đồ đạc bị xới tung, máu nhuộm đỏ từng bậc thềm. {spouse} nằm bất động trên sàn bếp lạnh ngắt, đôi mắt vẫn mở trừng trừng hướng về phía cánh cửa như đang cố gắng đợi bạn bước vào... Không gian xung quanh bỗng chìm vào sự tĩnh lặng tuyệt đối — một sự câm lặng kinh hoàng của kẻ vừa mất đi toàn bộ thế giới.',
    en: '[The silent house] You came home from a long job. The door was open. Inside, everything had been torn apart, and {spouse} lay on the kitchen floor, eyes still open, facing the door, as if waiting for you.',
    choices: [
      {
        labelVi: 'Tìm ra từng kẻ có liên quan: Cơn Cuồng Nộ The Black Silence',
        labelEn: 'Find every one of them: The Black Silence Rampage',
        resultVi: 'Suốt ba tháng ròng rã, bạn đeo lên khuôn mặt chiếc mặt nạ đen kịt và đôi găng tay hấp thụ âm thanh, biến thành một bóng ma câm lặng (The Black Silence). Mười bốn tổ chức ngầm, các văn phòng liên đới từ Backstreets đến cổng Nest bị nghiền nát thành bình địa dưới lưỡi đao cuồng nộ của bạn. Trong những đêm mưa máu tanh tưởi, đâu đó giữa tâm trí vỡ vụn, bạn thoáng nghe thấy những nốt nhạc piano điên loạn của một bản giao hưởng chết chóc vọng lại từ hư không.',
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
        resultVi: 'Bạn quỳ xuống bên thi thể lạnh ngắt của {spouse}, nhẹ nhàng vuốt lại mái tóc rối và khép đôi mắt người bạn đời lại. Bạn không điên cuồng tàn sát mù quáng, mà cõng thi thể {spouse} ra khoảng đồi vắng ngoài rìa quận, dựng một tấm bia đá giản dị. Nỗi đau khắc sâu thành một vết sẹo vĩnh cửu trong tim, nhắc nhở bạn tiếp tục sống sót giữa The City.',
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
    vi: '[Sát Hạch Trưởng Toán Capo · The Thumb] Khói xì gà nồng nặc trong phòng họp ngầm lát gỗ gụ. Vị Sottocapo uy nghiêm đập bàn sổ sách: "Một Soldato bình thường chỉ biết bắn theo lệnh. Một Capo phải biết tính từng viên đạn, cân từng giọt máu và quản thúc đám lính bên dưới theo đúng lễ nghi của The Thumb." Một nhóm chuột cống vừa cướp một xe tải chở đạn dược của tổ chức ở Backstreets, và bạn được giao quyền chỉ huy đội hành quyết.',
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
    vi: '[Thiết Xa Quân Nhu · Khảo Nghiệm Trưởng Toán Capo The Thumb] Một đoàn xe bọc thép chở ba mươi tấn đạn pháo cao áp của The Thumb đang bị một liên minh các băng đảng Backstreets liều chết bao vây tại hẻm District 8. Vị Sottocapo gửi thông điệp ngắn gọn: "Giữ vững đoàn xe, thực thi lễ nghi bằng hỏa lực không khoan nhượng. Ai sống sót bảo vệ trọn vẹn thùng đạn cuối cùng sẽ mang phù hiệu Capo."',
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
    vi: '[Đại Khảo Hạch Sottocapo · Bàn Tiệc Cẩm Thạch] Trước mặt bạn là bàn tiệc cẩm thạch trắng xóa của Underboss. Một Capo kỳ cựu khác của The Thumb đã phạm phải đại kỵ: lén lút ăn bớt đạn dược cúng nạp và lớn tiếng cãi cự với trưởng bối. Theo luật bất thành văn của The Thumb, một cuộc quyết đấu danh dự bằng lưỡi lê gắn nòng súng cao áp sẽ quyết định ai là kẻ sống sót bước lên ghế Sottocapo.',
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
    vi: '[Đại Lò Rèn Hỏa Khí Ngầm · Sát Hạch Sottocapo The Thumb] Dưới lòng đất District 4, hàng ngàn công nhân và thợ máy đang đúc vỏ đạn cao áp cho The Thumb. Một cuộc nổi loạn bất ngờ nổ ra do một nhóm điệp viên Nest kích động nhằm phá hoại nguồn cung đạn dược. Underboss giao bạn toàn quyền trấn áp và tái lập trật tự bằng kỷ luật sắt.',
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
    vi: '[Nghi Lễ Bịt Mắt Sứ Giả · The Index] Khung cửi cơ khí khổng lồ ở sâu dưới lòng đất nhả ra một cuộn giấy vàng óng ánh. Các Proxy áo trắng đứng trang nghiêm hai bên lễ đường. Để thoát khỏi thân phận Giáo Đồ (Proselyte) cầm kiếm thô sơ và bước lên hàng ngũ Sứ Giả (Messenger), bạn phải quỳ xuống để nhận dải lụa trắng bịt kín đôi mắt và chuyển phát một bản Chỉ Lệnh kỳ quái xuyên qua vùng tranh chấp đẫm máu.',
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
    vi: '[Sứ Mạng Tam Phân Khu · Khảo Nghiệm Sứ Giả The Index] Bản Chỉ Lệnh yêu cầu bạn mang ba cuộn tơ vàng xuyên qua ba quận tranh chấp trong vòng một đêm: cắm một cuộn lên cột đèn District 11, thả một cuộn xuống giếng District 12, và trao cuộn cuối cùng cho người ăn xin cụt chân ở District 13. Mọi hành động phải chuẩn xác đến từng bước chân.',
    en: '[Tri-District Conduit · Index Messenger Crucible] The Prescript commands you to carry three golden spools across three war-torn districts in a single night: affix one to a streetlamp in District 11, drop one into a well in District 12, and hand the last to an amputee beggar in District 13.',
    choices: [
      {
        labelVi: 'Thi triển bộ pháp lướt trên mái nhà, hoàn tất lộ trình trước khi bình minh ló dạng',
        labelEn: 'Leap across rooftops with breathless precision, completing the route before dawn',
        resultVi: 'Dưới ánh trăng mờ ảo, bóng áo choàng trắng của bạn lướt qua các mái nhà như một bóng ma. Cả ba sứ mạng hoàn tất chuẩn xác từng giây. Cuộn tơ vàng tự phát sáng kết thành dải thắt lưng Sứ Giả của The Index.',
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
    vi: '[Bản Án Khung Cửi · Đại Kiếm Proxy] Một bản Chỉ Lệnh bằng mực đen tuyền hạ xuống tay bạn: Một vị ân nhân từng cứu mạng bạn nhiều năm trước vừa phạm tội đốt bỏ Chỉ Lệnh của The Index. Bản Chỉ Lệnh yêu cầu: "Chặt đứt thủ cấp của kẻ phản nghịch trước bình minh, hoặc chính bạn sẽ bị treo lên cọc dệt." Đây là khảo nghiệm cuối cùng để trở thành một Proxy — người thực thi ý chí tối thượng của The City.',
    en: '[Judgement of the Loom · The Proxy Greatsword] A Prescript inscribed in pitch-black ink drops into your hands: An old benefactor who once saved your life burned an Index Prescript. The text decrees: "Decapitate the heretic before sunrise, or dangle from the loom’s gallows." This is your final crucible to become a Proxy — the absolute enforcer of City destiny.',
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
    vi: '[Kim Chỉ Chấp Pháp · Phong Hàm Đại Kiếm Proxy] Một văn phòng Fixer Grade 2 danh tiếng dám bắt giữ một Sứ Giả The Index và đốt bản Chỉ Lệnh trên tay anh ta. Khung cửi cơ khí ngầm phát ra tiếng gầm trầm đục, nhả ra thanh Đại Kiếm Thêu Chỉ Vàng cho bạn: "Cắt đứt toàn bộ vũ khí của kẻ ngạo mạn. Mang đầu thủ lĩnh về trước giờ giao thừa."',
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
    vi: '[Lễ Xăm Xích Vàng: Trở Thành Big Sibling · The Middle] Một Little Sibling yếu ớt trong tổ đội của bạn vừa bị một băng đảng đường phố cướp sạch Ahn và đánh gãy ba xương sườn. Trong căn hầm của The Middle, cuốn Sách Phục Thù (Book of Vengeance) mở toang trước mặt bạn. Dòng chữ đỏ rực như máu đòi hỏi một món nợ tương xứng. Để trở thành Big Sibling (Anh Cả / Chị Cả), bạn phải tự mình dẫn đầu cuộc trả thù và khắc thêm một mắt xích vàng lên cánh tay.',
    en: '[Golden Chain Tattoo: Becoming Big Sibling · The Middle] A fragile Little Sibling in your crew was mugged, robbed of all Ahn, and left with three cracked ribs. Inside the Middle hideout, the Book of Vengeance lies open. Crimson ink burns like fresh arterial blood. To ascend to Big Sibling, you must lead the reprisal and inscribe another glowing link onto your arm.',
    choices: [
      {
        labelVi: 'Quấn xích sắt quanh nắm đấm, đập nát toàn bộ sào huyệt kẻ thù',
        labelEn: 'Wrap heavy iron chains around bare knuckles, flattening the enemy lair',
        resultVi: 'Không một tên côn đồ nào đứng vững sau ba phút cuồng nộ của bạn. Bạn thu hồi từng xu Ahn bị cướp và quỳ trước bàn thờ gia tộc gạch tên kẻ thù trong Sách Phục Thù. Tiếng kim xăm nung đỏ rít lên trên da thịt bạn: Bạn chính thức là Big Brother / Big Sister của The Middle!',
        resultEn: 'Not a single thug stood after three minutes of chain-wrapped fury. You recovered every stolen coin and struck through the enemy’s name in the Book of Vengeance. White-hot needles etched the glowing golden chain into your skin: You are now a Big Sibling of the Middle!',
        setFingerRank: 1,
        flagsAdd: ['promo_middle_big_sibling_done'],
        meritAdd: 20,
        effects: { health: -14, rep: +24, heat: +20, sanity: +5 }
      },
      {
        labelVi: 'Lấy thân mình che chắn làn mưa tên nỏ để toàn bộ đàn em an toàn',
        labelEn: 'Shield your Little Siblings with your own body against a hail of crossbow bolts',
        resultVi: 'Bảy mũi tên cắm sâu vào vai và lưng bạn, nhưng bạn không lùi nửa bước, dùng song quyền đấm gục toàn bộ kẻ địch. Đàn em vừa khóc vừa băng bó cho bạn. Toàn thể gia tộc cúi đầu kính phục tấm lòng bao bọc của một Big Sibling đích thực.',
        resultEn: 'Seven bolts pierced your shoulders and back, yet you refused to yield an inch, pummeling the foes into submission. Weeping with gratitude, your siblings bandaged your wounds. The entire Family cheered: A true Big Sibling has risen!',
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
    vi: '[Đại Chiến Địa Bàn: Bổ Nhiệm Great Elder · The Middle] Một cuộc xung đột đẫm máu bùng nổ giữa The Middle và tàn dư các băng đảng vũ trang District 10. Hai trăm người em của gia tộc đang bị vây hãm trong pháo đài thép. Cuốn Sách Phục Thù yêu cầu một đòn trừng phạt sấm sét. Một Big Sibling phải chứng minh bản lĩnh trước các bô lão để bước lên hàng ngũ Great Elder (Đại Trưởng Lão).',
    en: '[District Turf War: Great Elder Investiture · The Middle] Full-scale war erupts between the Middle and fortified syndicates across District 10. Two hundred siblings are encircled within a steel fortress. The Book of Vengeance demands a thunderous reckoning. A Big Sibling must prove absolute dominance to ascend to Great Elder.',
    choices: [
      {
        labelVi: 'Dẫn đầu toàn bộ gia tộc tổng lực đột kích, phá vỡ cổng thành bằng song quyền',
        labelEn: 'Spearhead an all-out family assault, obliterating the fortress gates with bare fists',
        resultVi: 'Cánh cổng thép dày nửa mét gãy vụn dưới những cú đấm sấm sét bọc xích vàng của bạn. Lực lượng phòng thủ vỡ trận trong tiếng gầm vang của hàng trăm người anh em The Middle. Các bô lão long trọng trao cho bạn ấn tín Great Elder.',
        resultEn: 'The half-meter-thick steel portal crumpled beneath your thunderous golden chain punches. The defenders broke into panicked rout amidst the deafening roar of your family. The Elders presented you with the signet of Great Elder.',
        setFingerRank: 2,
        flagsAdd: ['promo_middle_great_elder_done'],
        meritAdd: 32,
        effects: { health: -18, rep: +36, wealth: +40, heat: +25, sanity: +6 }
      },
      {
        labelVi: 'Khiêu chiến tay đôi sinh tử với Đại tướng kẻ thù trước mặt hai quân',
        labelEn: 'Challenge the enemy warlord to a brutal 1v1 duel of honor before both armies',
        resultVi: 'Cuộc đấu tay đôi kinh hoàng kéo dài 40 hiệp kết thúc bằng một cú siết gãy xương quai xanh đối thủ. Quân địch hoảng loạn vứt vũ khí đầu hàng. Bạn trở thành Great Elder huyền thoại được cả khu phố truyền tụng.',
        resultEn: 'A brutal forty-round brawl concluded with the sickening snap of the warlord’s collarbone. The enemy threw down their armaments in unconditional surrender. You rose as a legendary Great Elder whose name commands awe across the District.',
        setFingerRank: 2,
        flagsAdd: ['promo_middle_great_elder_done'],
        meritAdd: 30,
        effects: { health: -16, rep: +40, wealth: +30, sanity: +12 }
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

  // ------------------------------------------------------------------ The Middle: Big Sibling -> Great Elder (Branch 2: Blood Feast Summit)
  {
    id: 'syn_middle_promo_great_elder_clan',
    age: [21, 65],
    major: true,
    weight: 95,
    allowDistorted: true,
    need: { finger: 'Middle', fingerRank: 1 },
    forbids: ['promo_middle_great_elder_done'],
    vi: '[Đại Yến Huyết Nợ · Phong Chức Great Elder The Middle] Tại đại sảnh ngầm rực lửa của The Middle, hàng ngàn thành viên tụ họp dự Đại Yến Gia Tộc. Ba phân hiệu Syndicate ngoại bang xin gia nhập dưới trướng The Middle nhưng bí mật mang theo thuốc nổ nhằm ám sát ban lãnh đạo. Trọng trách chủ trì và bảo vệ đại yến đặt lên vai bạn.',
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
    vi: '[Kỳ Thi Tốt Nghiệp Atelier: Bổ Nhiệm Docent · The Ring] Trong phòng triển lãm cẩm thạch trắng District 9, mùi cồn sát trùng hòa quyện với mùi sơn dầu và máu tươi. Là một Học Viên (Student), bạn phải hoàn thành tác phẩm tốt nghiệp để chứng minh mình thấu cảm được cái đẹp của sự giải thể hình thể con người trước hội đồng các Maestro nghiêm khắc.',
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
    vi: '[Phòng Trưng Bày Lăng Kính Đa Sắc · Khảo Thí Docent The Ring] Hội đồng Maestro yêu cầu bạn biến một căn phòng ngầm tối đen thành một không gian nghệ thuật thị giác sử dụng hiện tượng tán sắc ánh sáng và gương phản chiếu đa chiều. Hàng chục nhà phê bình danh tiếng từ các Nest lân cận đã mua vé dự khán.',
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
    vi: '[Đại Triển Lãm Salon of Flesh: Thăng Phong Maestro · The Ring] Chuông bạc ngân vang khắp sảnh đường tối thượng của The Ring. Hàng trăm nhà tài phiệt từ các Nest và những Capo quyền lực nhất tề tựu về dự khán Salon of Flesh hàng năm. Để bước lên đỉnh cao Maestro (Đại Nhạc Trưởng / Đại Nghệ Sĩ), bạn phải chỉ huy một buổi hòa nhạc kết hợp giữa lưỡi dao giải phẫu, ánh sáng và nỗi thống khổ tuyệt mỹ.',
    en: '[The Grand Salon of Flesh: Maestro Coronation · The Ring] Silver carillons echo across the Ring’s grand conservatory. Hundreds of Nest oligarchs and high syndicate patrons gather for the annual Salon of Flesh. To attain the summit of Maestro, you must conduct a symphony synthesizing surgical dissection, prism lighting, and transcendent anguish.',
    choices: [
      {
        labelVi: 'Cầm gậy chỉ huy, biến cả sàn đấu thành bản giao hưởng màu sắc rực rỡ',
        labelEn: 'Raise the conductor’s baton, turning the proving arena into a prism symphony',
        resultVi: 'Tiếng va chạm của lưỡi đao, tiếng thở dốc và nhịp tim đập dồn dập hòa quyện vào những cột ánh sáng đa sắc. Khán giả rơi vào trạng thái ngây ngất tột cùng. Chiếc mặt nạ vàng Maestro được trao cho bạn trong tràng pháo tay sấm dậy.',
        resultEn: 'Clashing blades, shallow breaths, and racing pulses harmonized into dazzling columns of chromatic light. The audience wept in aesthetic delirium. The golden Maestro mask was fitted to your brow amidst thunderous ovations.',
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        meritAdd: 32,
        effects: { sanity: -12, resonance: +25, rep: +40, wealth: +60 }
      },
      {
        labelVi: 'Trưng bày bộ sưu tập tranh cộng hưởng tâm thức thức tỉnh E.G.O',
        labelEn: 'Exhibit an introspective resonance series that induces spontaneous E.G.O efflorescence',
        resultVi: 'Những bức tranh sơn mài của bạn lột trần tận cùng bản chất con người, khiến ba khán giả thức tỉnh E.G.O cá nhân ngay tại triển lãm. Các trưởng lão Ring cúi mình bái phục tài hoa vô song của tân Maestro.',
        resultEn: 'Your lacquer canvasses laid bare the rawest core of the human condition, inducing spontaneous E.G.O awakening in three spectators on the spot. The Ring elders bowed to the peerless mastery of their newest Maestro.',
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        meritAdd: 30,
        effects: { sanity: +12, resonance: +35, rep: +36, wealth: +50 }
      },
      {
        labelVi: 'Tạm hoãn buổi hòa nhạc, tinh chỉnh lại nhạc phổ và bảng màu',
        labelEn: 'Defer the concert to fine-tune musical notation and pigment balance',
        resultVi: 'Bạn dành thêm thời gian hiệu chỉnh lại nhạc cụ và nghỉ ngơi hồi phục sinh lực.',
        resultEn: 'You took time to calibrate instruments and recover physical stamina.',
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
    vi: '[Bản Giao Hưởng Ngũ Hành Lang · Thăng Cấp Maestro The Ring] Tại nhà hát thạch anh khổng lồ của District 9, một cuộc thi tài giữa năm Docent xuất sắc nhất diễn ra để chọn ra một Maestro duy nhất. Chủ đề khảo thí là "Sự Vĩnh Cửu của Biến Hóa".',
    en: '[Symphony of the Five Corridors · Ring Maestro Crucible] Inside District 9’s colossal quartz amphitheater, the five top Docents compete for the singular title of Maestro. The theme is "The Eternity of Metamorphosis."',
    choices: [
      {
        labelVi: 'Chỉ huy dàn nhạc giao hưởng cơ khí tự động kết hợp với nghệ thuật múa bóng rối',
        labelEn: 'Conduct an automated mechanical orchestra synced with shadow-puppet choreography',
        resultVi: 'Hàng trăm con rối cơ khí bằng đồng và thủy tinh chuyển động mượt mà như sinh mệnh thực thụ dưới đũa chỉ huy của bạn. Toàn bộ ban giám khảo đứng dậy rơi nước mắt thán phục. Bạn được phong Maestro toàn quyền.',
        resultEn: 'Hundreds of brass-and-glass automata danced with breathtaking grace under your baton. The entire jury stood in awe, crowning you as an undisputed Maestro.',
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        meritAdd: 35,
        effects: { rep: +42, wealth: +65, resonance: +30, sanity: +12 }
      },
      {
        labelVi: 'Khắc họa bức bích họa khổng lồ trên vòm nhà hát bằng màu nhuộm phát quang hữu cơ',
        labelEn: 'Paint a monumental ceiling fresco using bioluminescent organic pigments',
        resultVi: 'Bức tranh khổng lồ phát sáng rực rỡ như một dải ngân hà sống động bao bọc lấy khán giả. Tên tuổi của bạn được ghi vào sử sách vàng của The Ring.',
        resultEn: 'The monumental fresco breathed with living luminescent color, enveloping the audience in cosmic splendor. Your name was etched into the golden annals of the Ring.',
        setFingerRank: 2,
        flagsAdd: ['promo_ring_maestro_done'],
        meritAdd: 34,
        effects: { rep: +40, network: +35, wealth: +55, sanity: +10 }
      },
      {
        labelVi: 'Tạm hoãn buổi hòa nhạc, tinh chỉnh lại nhạc phổ và bảng màu',
        labelEn: 'Defer the concert to fine-tune musical notation and pigment balance',
        resultVi: 'Bạn dành thêm thời gian hiệu chỉnh lại nhạc cụ và nghỉ ngơi hồi phục sinh lực.',
        resultEn: 'You took time to calibrate instruments and recover physical stamina.',
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
    vi: '[Bảo Tàng Vĩnh Cửu: Đại Quản Trưởng Grand Curator · The Ring] Bạn đứng trên đỉnh tháp xoắn ốc của Gallery District 9. Ghế Đại Quản Trưởng (Grand Curator) — người có quyền định đoạt giá trị nghệ thuật của toàn bộ thế giới ngầm The City — đang bỏ trống. Một phái đoàn kiểm tra từ The Head đang tiến vào biên giới quận để điều tra các tác phẩm dị biệt. Bạn sẽ phản ứng ra sao?',
    en: '[The Eternal Museum: Grand Curator Investiture · The Ring] You stand atop the spiral spire of District 9’s premier gallery. The seat of Grand Curator — arbiter of artistic value across the entire City underbelly — lies vacant. An inspection delegation from The Head approaches to audit anomalous installations. How do you respond?',
    choices: [
      {
        labelVi: 'Khai mở Triển Lãm Vĩnh Cửu, biến cả quận thành bảo tàng không thể phá hủy',
        labelEn: 'Unveil the Eternal Exhibition, transforming the entire district into an inviolable museum',
        resultVi: 'Toàn bộ các tác phẩm đồng loạt phát sáng dưới sự điều phối tài tình của bạn. Ngay cả phái đoàn giám sát cũng phải kinh ngạc trước sự hoàn mỹ và không tìm ra kẽ hở Taboo nào để xử phạt. Toàn bộ hội đồng tôn bạn làm Grand Curator tối cao của The Ring.',
        resultEn: 'Every installation ignited in synchronized luminescence under your orchestration. Even the auditors stood mesmerized by the sheer perfection, unable to find a single Taboo violation. The entire Syndicate hailed you as Supreme Grand Curator of The Ring.',
        setFingerRank: 3,
        flagsAdd: ['promo_ring_curator_done'],
        meritAdd: 50,
        effects: { sanity: -10, resonance: +35, rep: +50, wealth: +80 }
      },
      {
        labelVi: 'Chuyển dời các tuyệt tác vô giá vào kho ngầm bí mật ở The Outskirts',
        labelEn: 'Exfiltrate the priceless masterpieces into subterranean vaults in The Outskirts',
        resultVi: 'Bạn bảo toàn được hàng trăm di sản nghệ thuật nguyên bản khỏi bàn tay kiểm duyệt của The Head. Các nghệ sĩ của The City tôn kính bạn như người bảo hộ vĩ đại nhất của nghệ thuật tự do.',
        resultEn: 'You shielded hundreds of original masterpieces from the Head’s iron censorship. The City’s creators revere you as the immortal guardian of unbound creative freedom.',
        setFingerRank: 3,
        flagsAdd: ['promo_ring_curator_done'],
        meritAdd: 45,
        effects: { sanity: +15, resonance: +35, rep: +45, network: +40 }
      },
      {
        labelVi: 'Dưỡng sức và tinh chỉnh lại các phòng trưng bày trước đại lễ',
        labelEn: 'Rest and reorganize gallery wings before the supreme audit',
        resultVi: 'Bạn dành thời gian dưỡng sức và kiểm tra kỹ lưỡng các bảo vật nghệ thuật.',
        resultEn: 'You took time to recuperate and inspect the artistic relics.',
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
    vi: '[Đại Quản Trưởng Tối Cao Ngũ Hành Lang · Đỉnh Cao The Ring] Năm hành lang vĩ đại của The Ring đồng loạt mở toang cánh cửa cẩm thạch đón bạn. Toàn bộ các Docent và Maestro của The City quỳ rạp trước ngai vàng của người nghệ sĩ vĩ đại nhất. Lễ đăng quang Grand Curator bắt đầu giữa bản đại hòa tấu của toàn quận.',
    en: '[Supreme Grand Master of the Five Corridors · Apex Ring Investiture] The five grand corridors of the Ring swing open their alabaster gates in your honor. Every Docent and Maestro across the City kneels before the throne of the supreme visionary. The coronation unfolds amidst a district-wide orchestral movement.',
    choices: [
      {
        labelVi: 'Tuyên bố Hiến Chương Nghệ Thuật Mới cho toàn bộ thế giới ngầm The City',
        labelEn: 'Proclaim the New Manifesto of Art across the entire City underbelly',
        resultVi: 'Lời tuyên ngôn của bạn vang vọng khắp các ngõ ngách Backstreets và Nest. Các tác phẩm của The Ring trở thành thước đo giá trị tuyệt đối. Bạn chính thức là Grand Curator huyền thoại bất tử.',
        resultEn: 'Your manifesto reverberated across the City. The Ring’s creations became the gold standard of cultural currency. You ascended as the immortal Grand Curator.',
        setFingerRank: 3,
        flagsAdd: ['promo_ring_curator_done'],
        meritAdd: 55,
        effects: { rep: +55, wealth: +90, network: +50, sanity: +18 }
      },
      {
        labelVi: 'Khai mở trường phái cộng hưởng giải phóng tâm trí cho muôn người',
        labelEn: 'Inaugurate the Resonance Liberator school, unlocking mental transcendence for all',
        resultVi: 'Triết lý nghệ thuật của bạn giúp hàng ngàn cư dân Backstreets tìm thấy bình yên và sức mạnh nội tại giữa hiện thực nghiệt ngã. Bạn trở thành Đại Quản Trưởng được muôn người kính phục.',
        resultEn: 'Your aesthetic philosophy brought profound enlightenment and solace to thousands of alley dwellers. You are revered as the Enlightened Grand Curator.',
        setFingerRank: 3,
        flagsAdd: ['promo_ring_curator_done'],
        meritAdd: 52,
        effects: { sanity: +22, rep: +50, wealth: +75, network: +45 }
      },
      {
        labelVi: 'Dưỡng sức và tinh chỉnh lại các phòng trưng bày trước đại lễ',
        labelEn: 'Rest and reorganize gallery wings before the supreme audit',
        resultVi: 'Bạn dành thời gian dưỡng sức và kiểm tra kỹ lưỡng các bảo vật nghệ thuật.',
        resultEn: 'You took time to recuperate and inspect the artistic relics.',
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
    vi: '[Lời Thề Ngón Út: Lưỡi Đao Lập Thệ · The Pinky] Trong mật thất không một tia sáng dưới lòng đất, một người mang găng tay nhung đen siết chặt ngón tay út của bạn. Một kẻ đã bội ước với The Pinky, cướp đoạt ngân khố và đang trốn trong biệt thự kiên cố của một Nest lân cận. Để tháo bỏ thân phận Tập Sự và nhận danh vị Sworn Blade (Lưỡi Đao Lập Thệ), bạn phải thi hành bản án trong im lặng tuyệt đối.',
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
    vi: '[Khế Ước Ngón Út Vô Hình · Khảo Nghiệm Sworn Blade The Pinky] Một thương nhân giàu có định bội ước một hợp đồng ngầm ba mươi năm với The Pinky. Bạn nhận nhiệm vụ xuất hiện bên giường ngủ của ông ta vào đúng nửa đêm, chỉ để lại một sợi chỉ đỏ móc vào ngón tay út của ông ta như một lời nhắc nhở lạnh gáy.',
    en: '[Phantom Pinky Pact · Sworn Blade Crucible] A wealthy merchant intends to breach a thirty-year covert pact with the Pinky. You are assigned to materialize beside their bed at midnight, leaving only a crimson thread tied to their pinky as an icy reminder.',
    choices: [
      {
        labelVi: 'Xuất quỷ nhập thần, để lại sợi chỉ đỏ mà không làm lay động một hạt bụi',
        labelEn: 'Materialize like a phantom, binding the red thread without disturbing a speck of dust',
        resultVi: 'Sáng hôm sau, vị thương nhân thức dậy hoảng loạn quỳ sụp tạ tội, chuyển gấp ba lần số tiền cống nạp về kho The Pinky. Các trưởng bối đánh giá tuyệt đối tài nghệ ẩn thân của bạn và trao nhẫn Sworn Blade.',
        resultEn: 'Awakening to the crimson filament, the terrified merchant tripled their tribute payment immediately. The Pinky elders praised your flawless phantom art, ordaining you as a Sworn Blade.',
        setFingerRank: 1,
        flagsAdd: ['promo_pinky_blade_done'],
        meritAdd: 24,
        effects: { rep: +24, wealth: +40, network: +18, sanity: +10 }
      },
      {
        labelVi: 'Vung đoản kiếm diệt trừ toán vệ sĩ đánh thuê do thương nhân bí mật cài cắm',
        labelEn: 'Cut down the mercenary guards secretly stationed to ambush Pinky envoys',
        resultVi: 'Toán vệ sĩ bị tiêu diệt sạch sẽ trong im lặng tuyệt đối. Vị thương nhân run lẩy bẩy cầu xin tha mạng. Bạn hoàn thành nhiệm vụ xuất sắc và thăng cấp Sworn Blade.',
        resultEn: 'The ambushers were silenced in immaculate quietude. The merchant begged for mercy. You ascended to Sworn Blade with flying colors.',
        setFingerRank: 1,
        flagsAdd: ['promo_pinky_blade_done'],
        meritAdd: 25,
        effects: { health: -14, rep: +26, wealth: +35, sanity: +6 }
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

  // ------------------------------------------------------------------ The Pinky: Star -> Sovereign (Branch 1: Phantom Web)
  {
    id: 'syn_pinky_promo_sovereign',
    age: [25, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Pinky', fingerRank: 2 },
    forbids: ['promo_pinky_sovereign_done'],
    vi: '[Mạng Lưới Vô Hình: Chúa Tể Ngón Út Sovereign · The Pinky] Bạn bước vào căn phòng trung tâm của The Pinky, nơi hàng ngàn sợi dây tơ đen kết nối hồ sơ mật của mọi thế lực tại The City. Ngai vị Sovereign (Chúa Tể Ngón Út) đang chờ đón kẻ có đủ bản lĩnh điều phối mạng lưới ngầm này chống lại một cuộc thanh trừng phối hợp từ Hana và các Wing.',
    en: '[The Phantom Web: Pinky Sovereign Investiture · The Pinky] You enter the sanctum sanctorum of The Pinky, where ten thousand obsidian filaments tether classified dossiers of every City faction. The Sovereign seat awaits one capable of manipulating this covert web against a coordinated purge launched by Hana and the Wings.',
    choices: [
      {
        labelVi: 'Giật những sợi tơ bí mật, kích động xung đột nội bộ khiến liên minh kẻ thù tự hủy',
        labelEn: 'Pull the phantom threads, inciting internal schisms that collapse the coalition',
        resultVi: 'Chỉ bằng những mẩu tin mật được tuồn đúng lúc, các văn phòng Fixer và lực lượng an ninh Wing quay sang thanh trừng lẫn nhau trong hỗn loạn. The Pinky an toàn tuyệt đối sau màn sương. Bạn chính thức bước lên ngai Sovereign tối cao.',
        resultEn: 'Through surgical leaks delivered at the exact second, the rival Offices and Wing enforcers turned on each other in chaotic slaughter. The Pinky emerged untouched. You assumed the supreme throne of Pinky Sovereign.',
        setFingerRank: 3,
        flagsAdd: ['promo_pinky_sovereign_done'],
        meritAdd: 50,
        effects: { rep: +50, wealth: +85, network: +50, sanity: +15 }
      },
      {
        labelVi: 'Tung toàn bộ sát thủ bóng đêm bảo vệ người dân vô tội của khu vực lân cận',
        labelEn: 'Mobilize the shadow blades to safeguard innocent alley residents from crossfire',
        resultVi: 'Những lưỡi dao vô hình của The Pinky chặn đứng mọi họng súng của quân đàn áp, cứu sống hàng ngàn người trong Backstreets. Bạn trở thành một Sovereign nhân từ được muôn người tôn kính.',
        resultEn: 'Invisible Pinky blades intercepted every stray shell and executioner, saving thousands of Backstreet lives. You were crowned a benevolent Sovereign whose shadow protects the helpless.',
        setFingerRank: 3,
        flagsAdd: ['promo_pinky_sovereign_done'],
        meritAdd: 45,
        effects: { rep: +45, network: +40, sanity: +20, wealth: +40 }
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

  // ------------------------------------------------------------------ The Pinky: Star -> Sovereign (Branch 2: Apex Shadow Monarch)
  {
    id: 'syn_pinky_apex_monarch',
    age: [25, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Pinky', fingerRank: 2 },
    forbids: ['promo_pinky_sovereign_done'],
    vi: '[Ngai Vàng Hắc Ám · Chúa Tể Tối Cao The Pinky] Mọi bóng tối trong The City dường như đều cúi đầu trước bước chân của bạn. Năm ngàn Sworn Blade giương đoản kiếm tuyên thệ trung thành tuyệt đối. Một cuộc khủng hoảng tài chính và chiến tranh ngầm giữa các Nest đang diễn ra; bạn sẽ định hình tương lai của The City như thế nào?',
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
    vi: '[Bổ Nhiệm Feather Chính Thức · Khảo Hạch An Ninh Nest] Hết thời gian thực tập sinh thử việc, Ban Nhân Sự của Tập Đoàn Wing gửi giấy triệu tập khẩn cấp. Để trở thành một Feather chính thức được hưởng hộ khẩu và sự bảo vệ của Nest, bạn phải vượt qua bài kiểm tra độ trung thành tư tưởng và chấp nhận phẫu thuật cấy chip định danh sinh trắc học vào cột sống.',
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
    vi: '[Sự Cố Lõi Singularity: Thăng Cấp Trưởng Bộ Phận · Wing Section Chief] Còi báo động cấp thảm họa rền vang trong tầng hầm thí nghiệm sâu nhất của Wing. Một thùng chứa Singularity bị nứt vỡ, năng lượng kỳ dị rò rỉ làm tê liệt hệ thống phòng thủ tự động và làm các kỹ sư cấp cao bị cô lập. Người quản lý bỏ chạy, để lại toàn bộ phân khu trong tay bạn.',
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
    vi: '[The Thumb · Grand Etiquette Purge] Capo dei Capi triệu tập bạn đến phòng yến tiệc mạ vàng của The Thumb. Một Sottocapo tiền nhiệm đã có lời nói thiếu tôn kính và bị xử tử. Trước mặt bạn là khẩu súng lục mạ bạc và danh sách các chi nhánh cần thanh trừng.\n"Lòng trung thành không đo bằng lời nói. Đo bằng việc mày có bóp cò mà không chớp mắt hay không."',
    en: '[The Thumb · Grand Etiquette Purge] The Capo dei Capi summoned you to the gilded banquet hall of The Thumb. A former Sottocapo uttered a single disrespectful phrase and was executed. Before you lay a silver pistol and the list of branches to be purged.\n“Loyalty is not measured in speech. It is measured by whether your finger pulls the trigger without a flicker in your eyes.”',
    choices: [
      {
        labelVi: 'Thi hành thanh trừng với lễ nghi tuyệt đối: Trở thành Underboss',
        labelEn: 'Execute the purge with flawless etiquette: Become Underboss',
        setFingerRank: 3,
        recordsAdd: ['thumb_underboss'],
        flagsAdd: ['promo_thumb_underboss_done'],
        effects: { health: -20, sanity: -10, rep: +42, wealth: +50 },
        scarsAdd: ['Sự tuân phục tuyệt đối của The Thumb'],
        meritAdd: 50,
        resultVi: 'Suốt ba đêm, tiếng súng nổ theo đúng nhịp điệu lễ nghi của The Thumb. Bạn không nói thừa một từ, không bắn trượt một viên. Capo dei Capi tự tay trao cho bạn chiếc áo choàng Sottocapo / Underboss: "Từ nay, lời của mày là lễ nghi."',
        resultEn: 'For three nights, gunfire rang out in exact accordance with Thumb etiquette. You uttered not a single wasted word, missed not a single shot. The Capo dei Capi personally draped the Underboss mantle across your shoulders: “From now, your word is etiquette.”'
      },
      {
        labelVi: 'Chĩa súng vào chính bàn yến tiệc: Bẻ gãy xiềng xích của The Thumb',
        labelEn: 'Turn the gun on the banquet table: Shatter the Thumb’s chains',
        flagsAdd: ['ThumbTraitor'],
        effects: { health: -35, sanity: +15, rep: +30, heat: +50 },
        scarsAdd: ['Kẻ đào tẩu vĩ đại của The Thumb'],
        meritAdd: 30,
        resultVi: 'Bạn bắn nổ ngọn đèn chùm pha lê và mở đường máu thoát khỏi sảnh tiệc giữa cơn mưa đạn. Bạn đã tự do, nhưng The Thumb sẽ săn bạn đến tận cùng thế giới.',
        resultEn: 'Shattering the crystal chandelier with gunfire, you carved a bloody path out under a tempest of lead. You are free, but The Thumb will hunt you to the edge of the world.'
      },
      {
        labelVi: 'Tạm hoãn quyết đấu, bảo dưỡng vũ khí và dưỡng thương trước',
        labelEn: 'Request duel deferral to inspect armaments and recover health',
        resultVi: 'Bạn báo cáo xin hoãn cuộc khảo hạch để chuẩn bị nghi lễ chỉn chu hơn. Underboss đồng ý cho bạn thời gian nghỉ ngơi.',
        resultEn: 'You requested a deferral to ensure flawless protocol. The Underboss granted time for recuperation.',
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
    vi: '[Ngai Vàng Cẩm Thạch District 8 · Tấn Phong Underboss The Thumb] Cung điện ngầm nguy nga của The Thumb chật ních hàng trăm Capo và hàng ngàn Soldato bồng súng đứng nghiêm chào. Chiếc ghế Underboss quyền lực tột cùng đang chờ đợi bạn sau khi người tiền nhiệm quy ẩn. Một liên minh ba Syndicate thù địch vừa gửi chiến thư tối hậu thư đòi chia đôi lãnh địa.',
    en: '[The Marble Throne of District 8 · Thumb Underboss Investiture] The subterranean palace of the Thumb stands packed with hundreds of Capos and thousands of Soldatos presenting arms. The Underboss throne awaits you. Simultaneously, a coalition of rival syndicates delivers an ultimatum demanding territorial partition.',
    choices: [
      {
        labelVi: 'Tuyên đọc bản án chiến tranh toàn diện, nghiền nát ba Syndicate trong ba ngày đêm',
        labelEn: 'Declare total war, annihilating the rival syndicates within three nights',
        resultVi: 'Tiếng đại bác cao áp gầm vang suốt bảy mươi hai giờ. Dưới sự điều phối quân sự tột đỉnh của bạn, toàn bộ lãnh địa địch bị bình địa. Bạn chính thức ngự trên ngai vàng Underboss, thống trị toàn bộ thế giới ngầm khu vực.',
        resultEn: 'High-pressure cannons thundered for seventy-two uninterrupted hours. Under your supreme command, the coalition was wiped from the City map. You ascended the Underboss throne as undisputed ruler.',
        setFingerRank: 3,
        recordsAdd: ['thumb_underboss'],
        flagsAdd: ['promo_thumb_underboss_done'],
        meritAdd: 55,
        effects: { health: -18, rep: +55, wealth: +80, sanity: +12 }
      },
      {
        labelVi: 'Mời các thủ lĩnh đối phương đến tiệc trà cẩm thạch, ép họ ký văn tự thần phục vĩnh viễn',
        labelEn: 'Summon rival bosses to a formal banquet, compelling perpetual vassalage under Thumb etiquette',
        resultVi: 'Bằng phong thái vương giả và hỏa lực áp đảo ngầm, bạn ép từng thủ lĩnh kẻ thù quỳ gối tự cắt ngón tay lập thệ trung thành. The Thumb mở rộng địa bàn mà không tốn một viên đạn. Bạn trở thành Underboss huyền thoại.',
        resultEn: 'Through regal bearing and concealed firepower, you compelled each rival boss to swear eternal fealty on bended knee. The Thumb expanded seamlessly. You are hailed as a legendary Underboss.',
        setFingerRank: 3,
        recordsAdd: ['thumb_underboss'],
        flagsAdd: ['promo_thumb_underboss_done'],
        meritAdd: 50,
        effects: { rep: +50, wealth: +90, network: +45, sanity: +15 }
      },
      {
        labelVi: 'Tạm hoãn buổi tấn phong để củng cố phòng tuyến và hồi phục sinh lực',
        labelEn: 'Defer the investiture to consolidate battle lines and restore vitality',
        resultVi: 'Bạn dành thêm thời gian dưỡng thương và chuẩn bị kỹ lưỡng quân bị trước khi ngồi lên đỉnh cao quyền lực.',
        resultEn: 'You took time to heal and ensure supreme readiness before claiming the mantle of absolute authority.',
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
    vi: '[The Index · The Golden Prescript] Một lá Prescript dát vàng từ Yan Vismod rơi xuống trước mặt bạn. Nét chữ sắc lẻm như dao khắc:\n"Đi đến District 11 lúc 2 giờ 45 sáng. Chặt đứt cánh tay cầm vũ khí của người Fixer đang ngồi uống trà, và nuốt một đồng xu rỉ sét. Sau đó, bước lên bậc thềm Proxy & Weaver."',
    en: '[The Index · The Golden Prescript] A gilded Prescript from Yan Vismod fluttered down before you. The calligraphy cut like a blade:\n“Walk to District 11 at 2:45 AM. Sever the weapon-arm of the Fixer sipping tea, and swallow a rusted coin. Thereafter, ascend the Proxy steps.”',
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
    vi: '[The Middle · The Master Vendetta] Cuốn Book of Vengeance (Sách Phục Thù) mở ra trước mặt bạn. Một dòng chữ đỏ rực từ hai mươi năm trước: Kẻ thù cũ từng làm một người em trong gia đình nhỏ lệ đang ẩn náu trong một pháo đài ngầm ở District 14 cùng năm mươi tay súng.\n"Đại gia đình không bao giờ quên. Hôm nay, mày sẽ viết chữ HẾT cho món nợ này."',
    en: '[The Middle · The Master Vendetta] The Book of Vengeance opened before you. A crimson inscription from twenty years ago: The old adversary who once brought tears to a younger sibling hides in an underground fortress in District 14 with fifty gunners.\n“The Great Family never forgets. Today, you write END to this debt.”',
    choices: [
      {
        labelVi: 'Dẫn đầu gia tộc đồ sát pháo đài: Trở thành Great Brother / Sister',
        labelEn: 'Lead the Family to breach the fortress: Become Great Sibling',
        setFingerRank: 3,
        recordsAdd: ['middle_big_sibling'],
        flagsAdd: ['promo_middle_apex_done'],
        effects: { health: -22, sanity: +10, rep: +45, wealth: +40 },
        scarsAdd: ['Nắm đấm sắt của The Middle'],
        meritAdd: 55,
        resultVi: 'Bạn đấm vỡ toang cánh cửa sắt kiên cố và càn quét toàn bộ pháo đài bằng chuỗi xích nhuốm máu. Tên của kẻ thù bị gạch một đường đỏ đậm trong Sách Phục Thù. Hàng trăm anh em The Middle đồng thanh gầm vang: "Chào Great Sibling!"',
        resultEn: 'Shattering the reinforced vault gates with bare fists, you cleared the fortress with blood-soaked chains. The adversary’s name was struck out with a thick crimson line in the Book. Hundreds of Middle siblings roared in chorus: “Hail our Great Sibling!”'
      },
      {
        labelVi: 'Thương lượng nhận tiền bồi thường thỏa đáng cho người em bị tổn thương',
        labelEn: 'Compel massive restitution and public apology for the wronged sibling',
        effects: { wealth: +75, rep: +30, sanity: +15 },
        setFingerRank: 3,
        recordsAdd: ['middle_big_sibling'],
        flagsAdd: ['promo_middle_apex_done'],
        meritAdd: 48,
        resultVi: 'Kẻ thù quỳ gối xin tha mạng, trao nộp toàn bộ tài sản bồi thường và dập đầu tạ lỗi trước mặt toàn thể gia đình. Bạn trở thành Great Sibling đức độ được muôn người kính nể.',
        resultEn: 'The enemy bowed in humble restitution, apologizing before the assembled Family. You assumed Great Sibling rank as a formidable yet magnanimous elder.'
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

  // ------------------------------------------------------------------ The Middle (Branch 2: Apex Patriarch of the Clan)
  {
    id: 'syn_middle_apex_patriarch',
    age: [24, 75],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Middle', fingerRank: 2 },
    forbids: ['promo_middle_apex_done'],
    vi: '[Đại Huynh Trưởng Tối Cao · Ngai Vàng The Middle] Mười vạn người em của The Middle trên khắp The City đồng loạt hướng mắt về bạn. Lễ phong hàm Đại Huynh Trưởng (Apex Patriarch / Matriarch) bắt đầu. Một băng nhóm Fixer cấp cao và cảnh binh quận vừa định vây ráp một khu chợ Backstreets của gia tộc.',
    en: '[Apex Patriarch of the Middle · Supreme Family Throne] A hundred thousand siblings across the City turn their gaze toward you. The investiture of Apex Patriarch begins. Simultaneously, high-ranking enforcers threaten a Middle neighborhood.',
    choices: [
      {
        labelVi: 'Dẫn đầu toàn bộ quân đoàn xích tím đánh tan kẻ xâm phạm tại Quảng Trường',
        labelEn: 'Lead the purple chain legions, crushing the invaders in the District Square',
        resultVi: 'Cơn bão xích tím quét sạch mọi kẻ dám thách thức Gia Tộc. Tiếng reo hò làm rung chuyển màn đêm The City. Bạn bước lên ngai vàng Đại Huynh Trưởng tối cao, bất khả chiến bại.',
        resultEn: 'A tempest of purple chains obliterated all who dared challenge the Family. Shouts of devotion shook the nocturnal skyline. You ascended as the invincible Apex Patriarch.',
        setFingerRank: 3,
        recordsAdd: ['middle_big_sibling'],
        flagsAdd: ['promo_middle_apex_done'],
        meritAdd: 60,
        effects: { health: -18, rep: +60, wealth: +70, sanity: +18 }
      },
      {
        labelVi: 'Lập lời thề vĩnh cửu bảo hộ từng người em nhỏ trước bàn thờ tổ phụ',
        labelEn: 'Swear the eternal covenant of protection before the ancestral altar',
        resultVi: 'Lời thề đanh thép của bạn khắc sâu vào trái tim hàng chục ngàn người em. Sức mạnh đoàn kết của The Middle trở thành bức tường thành không thể xuyên phá. Bạn là Đại Huynh Trưởng vĩ đại nhất lịch sử.',
        resultEn: 'Your iron covenant bound the hearts of every sibling. The Middle’s unity became an impenetrable bulwark. You rule as the most beloved Patriarch in Family history.',
        setFingerRank: 3,
        recordsAdd: ['middle_big_sibling'],
        flagsAdd: ['promo_middle_apex_done'],
        meritAdd: 55,
        effects: { rep: +55, network: +50, wealth: +60, sanity: +22 }
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

  // ------------------------------------------------------------------ The Pinky (Branch 1: Star of the Sky Ascent)
  {
    id: 'syn_pinky_star_blade_pinnacle',
    age: [22, 65],
    major: true,
    weight: 920,
    allowDistorted: true,
    need: { finger: 'Pinky', fingerRank: 1 },
    forbids: ['promo_pinky_star_done'],
    vi: '[The Pinky · Star of the Sky Ascent] Giữa đêm tĩnh mịch, bạn leo lên đỉnh tháp chuông đổ nát ở rìa Outskirts của The Pinky. Gió lạnh rít qua từng khe đá. Người canh gác của The Pinky thắp ngọn đuốc xanh:\n"Chỉ có kẻ dám trói buộc sinh mệnh của mình với lưỡi kiếm mới có thể trở thành Thiên Tinh (Star of the Sky). Mày có dám nhỏ máu vào đe rèn không?"',
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

  // ------------------------------------------------------------------ Workshop Masterpiece
  {
    id: 'workshop_legendary_forge_trial',
    age: [25, 75],
    major: true,
    weight: 930,
    jobs: ['Workshop Craftsman'],
    vi: '[Workshop Masterpiece · Tres Certification] Một vị khách bí ẩn mang đến xưởng của bạn một khối tinh thể Singularity kết tinh từ Abnormality của L Corp cũ. Tres Association phái hai giám định viên cao cấp túc trực bên lò rèn:\n"Nếu bạn tôi luyện thành công thứ này, Tres Association sẽ cấp chứng chỉ Tuyệt tác Thần binh (Masterpiece) và lưu tên xưởng rèn của bạn vào biên niên sử The City. Nếu thất bại, lò rèn sẽ nổ tung."',
    en: '[Workshop Masterpiece · Tres Certification] A shadowy client brought a singularity ingot crystallized from an old L Corp Abnormality to your workshop. Tres Association dispatched two senior appraisers to oversee the furnace:\n“If you successfully temper this alloy, Tres will certify it as a Masterpiece and engrave your workshop’s name into the annals of The City. If you fail, the furnace will explode.”',
    choices: [
      {
        labelVi: 'Dồn toàn bộ tâm thức và tài hoa rèn thần binh tuyệt tác',
        labelEn: 'Pour entire soul and craftsmanship into the Masterpiece forge',
        openCraftModal: true,
        setWorkshopRank: 3,
        recordsAdd: ['workshop_masterpiece'],
        effects: { health: -24, sanity: -18, wealth: +55, rep: +45, resonance: +35 },
        scarsAdd: ['Đại sư rèn thần binh'],
        meritAdd: 60,
        resultVi: 'Tiếng búa đập vang rền suốt bốn mươi tám giờ. Lưỡi kiếm hoàn tất tỏa ra áp lực áp đảo mọi vũ khí thông thường. Giám định viên Tres Association run rẩy đóng con dấu sáp vàng: "Một kiệt tác để đời." Tên tuổi xưởng rèn của bạn vang danh khắp The City.',
        resultEn: 'The hammer rang forty-eight unceasing hours. The finished blade emanated a presence that eclipsed all standard armaments. The Tres appraiser tremblingly pressed the golden wax seal: “A masterpiece for the ages.” Your workshop’s name echoed across The City.'
      },
      {
        labelVi: 'Gia công an toàn: Làm thành vũ khí thương mại cao cấp',
        labelEn: 'Safe refinement: Produce a premium commercial weapon batch',
        effects: { wealth: +35, rep: +18, sanity: +10 },
        resultVi: 'Bạn chọn phương án an toàn, tránh được hiểm họa nổ lò và bán được một khoản Ahn kếch xù cho một văn phòng Fixer giàu có.',
        resultEn: 'Choosing safety, you averted the explosion risk and sold the batch for a tidy sum of Ahn to a wealthy Fixer office.'
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
    vi: '[Wing Board · Singularity Classified Audit] Ban giám đốc Wing triệu tập bạn vào căn hầm ngầm sâu nhất dưới lòng Nest. Cánh cửa thép Singularity mở ra, để lộ bí mật kinh hoàng giúp Wing vận hành (máu của thứ biết khóc, hay những toa tàu WARP). Một Senior Executive nhìn bạn:\n"Mọi Feather muốn bước vào ban điều hành đều phải nhìn thẳng vào sự thật này mà không phát điên. Nếu bạn chịu đựng được, bạn là Giám đốc cấp cao. Nếu không, bộ nhớ của bạn sẽ bị thanh tẩy."',
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
    vi: '[Lễ Nghi Thượng Phạt của Thumb] Trong buổi dạ tiệc ngầm của Ngón Tay Cái (The Thumb), một người em mới gia nhập lỡ miệng nói chen ngang lời một Capo cấp trên. Cả căn phòng lập tức rơi vào sự im lặng chết chóc. Viên Capo quay sang nhìn bạn, trao khẩu súng lục nạp sẵn một viên đạn: "Dạy cho nó biết quy tắc của Thumb."',
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
    vi: '[Sổ Thù Hận của Ngón Giữa · Middle] Một Big Brother bắp tay cuồn cuộn vết xăm xích sắt bước vào sào huyệt, giở cuốn sách da dày cộp (Book of Vengeance): "Một gã Fixer Grade 4 vừa chém đứt ngón tay của một đứa em út trong xóm. Tên hắn đã viết bằng mực đỏ trên trang này. Ai sẽ đi đòi nợ máu?"',
    en: '[The Middle’s Book of Vengeance] A Big Brother with iron-chain tattoos slaps down the heavy leather tome: "A Grade 4 Fixer just severed the finger of an initiate in our ward. His name is inked in red. Who will collect the blood debt?"',
    choices: [
      {
        labelVi: 'Xung phong cầm đầu đội truy sát, săn lùng kẻ thù đến tận chân trời',
        labelEn: 'Step up to lead the vengeance cell, hunting him to the horizon',
        resultVi: 'Bạn cùng các anh em Middle vây ráp gã Fixer trong một xưởng thuộc da. Trận đòn tàn khốc kết thúc bằng việc chặt đứt cả hai bàn tay hắn để gạch tên khỏi Sổ Thù Hận. Cả băng đảng reo hò tên bạn.',
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
    vi: '[Triển Lãm Nghệ Thuật Đẫm Máu của The Ring] Một Maestro của Ngón Tay Áp Út (The Ring) dẫn bạn vào phòng trưng bày ngầm sâu trong lòng đất: Hàng chục cơ thể con người bị biến đổi thành các bức tượng sống phát ra tiếng nhạc réo rắt. Maestro trao cho bạn cây cọ rèn bằng xương: "Hãy đóng góp tác phẩm của bạn vào buổi triển lãm đêm nay."',
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
    vi: '[Sự cố Rò Rỉ Singularity tại Cơ sở Cánh] Còi báo động đỏ rú vang khắp khu nghiên cứu ngầm của Wing bạn đang phục vụ. Một ống chứa Singularity bị nứt vỡ, phát tán khí biến dị sinh học làm các đồng nghiệp biến thành quái vật ăn thịt. Cánh cửa phòng điều khiển chỉ còn 60 giây trước khi tự động khóa vĩnh viễn.',
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
    vi: '[Cưỡng Chế Thu Thuế Thời Gian · T Corp District 20] Bầu trời District 20 xám xịt không một tia nắng. Bạn dẫn đầu đội thu thuế thời gian của T Corp bước vào khu ổ chuột Backstreets. Những chiếc máy hút thời gian bằng đồng rỉ rít lên ken két, sẵn sàng rút sạch tuổi thọ của những người nghèo không đủ Ahn nộp thuế để chuyển vào Nest.',
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
    vi: '[Ca Dọn Dẹp Khoang Hạng Nhất · Chuyến Tàu WARP] Chuyến tàu WARP vừa cập bến District 23 sau 10 giây thời gian thực — tương đương hai ngàn năm thời gian nội tại. Cửa toa tàu bật mở, bốc lên mùi máu tanh tưởi và những khối thịt sống biến dị của hành khách đã tự cắn xé lẫn nhau suốt thiên niên kỷ. Bạn có đúng 10 phút để dọn sạch hiện trường và khôi phục ký ức hành khách bằng công nghệ phục hồi.',
    en: '[First-Class Bio-Cleanup · WARP Train Arrival] The WARP train docks at District 23 after 10 seconds of real time — two millennia of subjective isolation. Doors unseal, vomiting the stench of rotting plasma and writhing flesh masses of passengers who devoured each other across centuries. You have exactly 10 minutes to sanitize the car and restore them via W Corp rewind technology.',
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
    vi: '[Thu Hoạch Dịch Hồi Phục · Nước Mắt K Corp District 11] Bạn được phân công vào buồng nuôi cấy trung tâm của K Corp. Trước mắt bạn là Sinh Vật Khổng Lồ Biết Khóc (The Tearful Thing) — cội nguồn của mọi ống tiêm hồi sinh K Corp. Để nước mắt nó tuôn trào, hệ thống máy móc liên tục chiếu lại những thước phim bi kịch đau đớn nhất của con người.',
    en: '[Biogel Extraction Chamber · K Corp Tears District 11] You are assigned to K Corp’s central containment sanctum. Suspended before you looms The Tearful Thing — the living fountain of all K Corp regenerative ampoules. To stimulate its tears, projectors loop the most heartbreaking mortal tragedies upon its retinas.',
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
    vi: '[Hải Trình Đại Hồ · Thám Hiểm Săn Ngư Quái U Corp] Tàu ngầm bọc thép của U Corp rẽ sóng Great Lake District 21, lặn sâu xuống vùng biển không đáy. Nhiệm vụ của đội thám hiểm là săn bắt một con Cá Voi Dị Thể (Whale) đang phát ra sóng biến dị biến thủy thủ thành người cá Mermaids.',
    en: '[Great Lake Expedition · U Corp Leviathan Hunt] U Corp’s reinforced submarine cuts through the churning black waves of District 21’s Great Lake, diving into the abyss. The directive: Hunt an Abberant Whale whose siren pulses transform sailors into chimeric Mermaids.',
    choices: [
      {
        labelVi: 'Bắn lao móc Singularity ghim chặt con quái vật biển sâu, rút mỡ cá voi quý hiếm',
        labelEn: 'Fire Singularity harpoons into the deep-sea leviathan, siphoning rare whale blubber',
        resultVi: 'Máu xanh thẫm nhuộm đen mặt biển. Đội tàu của bạn kéo được xác con cá voi khổng lồ về bến cảng U Corp. Lượng mỡ cá voi biến thành hợp chất định hình không gian vô giá, đem lại cho bạn danh tiếng lẫy lừng.',
        resultEn: 'Azure ichor stained the churning sea. Your vessel towed the colossal leviathan back to U Corp docks. Its blubber, processed into priceless spatial tuning resin, earned you legendary renown.',
        meritAdd: 30,
        effects: { health: -18, rep: +35, wealth: +90, resonance: +20 },
        flagsAdd: ['ucorp_dive_done']
      },
      {
        labelVi: 'Dẫn dắt thủy thủ đoàn thoát khỏi vùng xoáy ảo ảnh âm thanh an toàn tuyệt đối',
        labelEn: 'Navigate the vessel safely through acoustic siren whirlpools, preserving all hands',
        resultVi: 'Bằng trực giác hàng hải tuyệt vời, bạn đưa con tàu vượt qua vùng chết mà không mất một người lính nào. Toàn thể thủy thủ đoàn tôn bạn làm thuyền trưởng danh dự của Great Lake.',
        resultEn: 'Through uncanny nautical acumen, you guided the submarine out of the acoustic death trap with zero casualties. The crew hailed you as an honorary Great Lake captain.',
        meritAdd: 25,
        effects: { sanity: +15, network: +35, rep: +25, wealth: +40 },
        flagsAdd: ['ucorp_dive_done']
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
    vi: '[Kiểm Kê Đạn Dược The Thumb · Kỷ Luật Quân Sự] Mỗi viên đạn của The Thumb đều được xem là thánh vật. Capo Boris triệu tập bạn vào kho súng ngầm để giải trình về 200 viên đạn xuyên giáp đã bắn trong tháng qua. Từng vỏ đạn rỗng phải khớp với một tên địch ngã xuống.',
    en: '[Thumb Ammunition Ledger · Iron Discipline] Every round of Thumb ammunition is sacred ordnance. Capo Boris summons you to the munitions depot to account for 200 kinetic rounds discharged this month. Every spent brass casing must match a confirmed casualty.',
    choices: [
      {
        labelVi: 'Trình sổ tay chiến thuật ghi rõ từng phát bắn và nộp đủ 200 vỏ đạn đồng',
        labelEn: 'Present the tactical firing log and surrender all 200 brass casings flawlessly',
        resultVi: 'Sự tỉ mỉ và lòng trung thành chuẩn mực của bạn khiến Capo vô cùng hài lòng. Ông ta đích thân thăng thưởng thêm đạn dược cao cấp và giao thêm quyền quản lý cho bạn.',
        resultEn: 'Your textbook discipline and meticulous loyalty deeply impressed the Capo. He commended your conduct, issuing surplus high-grade munitions and operational trust.',
        meritAdd: 20,
        effects: { rep: +22, wealth: +35, network: +15, sanity: +5 }
      },
      {
        labelVi: 'Nhận lỗi về 3 vỏ đạn thất lạc, tự chịu phạt 20 hèo gậy sắt theo lễ tiết',
        labelEn: 'Acknowledge 3 lost casings, accepting 20 iron rod strikes per Thumb etiquette',
        resultVi: 'Bạn cắn răng chịu phạt trong tư thế thẳng tắp mà không kêu nửa lời. Sự kiên cường và tôn trọng lễ tiết tuyệt đối của bạn khiến các Soldato xung quanh vô cùng kính phục.',
        resultEn: 'You endured the brutal punishment at full attention without a whimper. Your unwavering adherence to hierarchy earned reverence across the barracks.',
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
        resultVi: 'Bạn ngồi xoay con quay giữa ánh nhìn ngơ ngác của người qua đường. Đúng 12:14, một quả bom của phe địch phát nổ ở góc phố đối diện — chính hành động xoay con quay đã khiến toán ám sát bị chậm lại và tự hủy diệt! Dòng chảy nhân quả của The Index là tuyệt đối!',
        resultEn: 'You spun the top under baffled civilian stares. At 12:14, an ambush bomb detonated across the boulevard — your trivial delay caused the rival hit squad to mistime and destroy themselves! The causal flow of the Index is omniscient!',
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
        resultVi: 'Tiếng xích sắt quất rầm rập! Tên quản đốc quỳ rạp cầu xin tha mạng. Bạn khoác lại chiếc áo cho người em gái trong tiếng reo hò của cả gia tộc. Tên của hắn được gạch bỏ trong Sách Phục Thù.',
        resultEn: 'Purple chains roared through the forge! The foreman groveled in terror. You draped the coat back over your Little Sister’s shoulders as siblings cheered. His name was struck from the Book.',
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
    vi: '[Cuộc Chiến Phiếu Giảm Giá Tiệm Tóc · The Middle] Một tiệm làm tóc cao cấp tại ranh giới quận phát hành tập phiếu giảm giá đặc biệt — thứ mà Big Brother Ricardo vô cùng yêu thích để chăm sóc mái tóc bóng mượt. Một nhóm côn đồ đường phố dám cướp giật xấp phiếu này ngay trước cửa tiệm.',
    en: '[The Hair Salon Coupon Brawl · The Middle] A luxury salon issues exclusive discount vouchers — prized by Big Brother Ricardo for keeping his hair flawless. A rowdy street gang snatches the voucher bundle right outside the parlor.',
    choices: [
      {
        labelVi: 'Vung đại xích tím quét sạch đám cướp giật, mang trọn vẹn xấp phiếu về dâng đại ca',
        labelEn: 'Unleash purple chains to flatten the thieves, retrieving the vouchers for Big Brother',
        resultVi: 'Bạn đập cho đám côn đồ tơi tả không còn manh giáp. Khi mang xấp phiếu về nộp, Big Brother cười lớn xoa đầu bạn: "Tốt lắm em trai! Mái tóc của gia tộc đã được cứu rỗi!" Bạn nhận được thưởng lớn!',
        resultEn: 'You pulverized the gang into submission. Presenting the vouchers, Big Brother roared in delight, ruffling your hair: "Glorious work! Our family’s locks remain immaculate!" You were richly rewarded!',
        meritAdd: 22,
        effects: { rep: +28, wealth: +38, sanity: +14, health: -6 }
      },
      {
        labelVi: 'Giữ lại một nửa phiếu cho bản thân và các anh em trong nhóm đi tút tát dung nhan',
        labelEn: 'Pocket half the vouchers for your crew to treat yourselves at the salon',
        resultVi: 'Mái tóc và diện mạo của cả nhóm được chăm chút sáng láng, phong thái giang hồ tăng vọt, tinh thần phấn chấn lên hẳn.',
        resultEn: 'Your crew emerged from the parlor freshly groomed and imposing. Morale and underworld charisma surged.',
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
        effects: { rep: +24, wealth: +42, sanity: +8 }
      },
      {
        labelVi: 'Phát hiện một nhóm nhân viên đang lén bòn rút dịch Singularity để bán chợ đen',
        labelEn: 'Uncover rogue technicians embezzling raw Singularity serum for the black market',
        resultVi: 'Bạn bắt quả tang và bàn giao toàn bộ đường dây cho an ninh K Corp. Bạn được thăng chức quản đốc kiểm định với mức lương hậu hĩnh.',
        resultEn: 'You caught the embezzlement ring red-handed and delivered them to security. The Wing elevated you to Chief Auditor with a salary spike.',
        meritAdd: 22,
        effects: { rep: +26, wealth: +50, network: +18 }
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
        labelVi: 'Thu hồi các bình Enkephalin nguyên vẹn và mảnh phế liệu E.G.O mang về tập đoàn',
        labelEn: 'Salvage intact Enkephalin canisters and fractured E.G.O plating for the Wing',
        resultVi: 'Đoàn thám hiểm an toàn mang về nguồn năng lượng vô giá. Các nhà khoa học Wing trầm trồ thán phục; bạn nhận tiền thưởng lớn cùng huân chương cống hiến đặc biệt.',
        resultEn: 'The team safely extracted invaluable energy reserves. Wing scientists marveled at the haul; you received a massive merit bonus and honorary commendations.',
        meritAdd: 28,
        effects: { rep: +32, wealth: +65, resonance: +18, sanity: +6 }
      },
      {
        labelVi: 'Lắng nghe tiếng thì thầm phát ra từ tàn tích, hấp thụ một tia cộng hưởng Ánh Sáng',
        labelEn: 'Listen to the ancient whispers echoing in the ruins, absorbing a spark of Light',
        resultVi: 'Một luồng sáng ấm áp rực rỡ truyền vào tâm thức bạn. Bạn cảm nhận sâu sắc hơn về bản ngã và sức mạnh tiềm ẩn của chính mình.',
        resultEn: 'A warm luminescent spark flooded your psyche. Your comprehension of the soul and latent E.G.O resonance deepened profoundly.',
        meritAdd: 24,
        effects: { sanity: +25, resonance: +25, rep: +15, health: +10 }
      }
    ]
  }
];
