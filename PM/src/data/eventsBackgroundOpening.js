// ============================================================================
// BACKGROUND OPENING EVENTS (Tuổi 0 - 7)
// Các sự kiện lớn đặc thù theo từng Xuất Thân & Gia Cảnh của nhân vật
// Phản ánh chân thực bối cảnh The City, tạo dấu ấn gameplay và định hình số phận
// ============================================================================

export const BACKGROUND_OPENING_EVENTS = [
  {
    id: 'ev_open_smoke_war_father',
    age: [3, 7],
    major: true,
    weight: 35,
    need: { flags: ['SmokeWarLineage'] },
    vi: "[Cơn ho của cha] Giữa đêm, cha bật dậy lục chiếc mặt nạ phòng độc cũ. Ông không nhận ra căn phòng, chỉ gọi tên những người đã chết trong Smoke War. Cơn ho vẫn chưa dứt.",
    en: "[Father’s cough] In the middle of the night your father sits up and searches for his old gas mask. He does not know the room and calls out the names of those who died in the Smoke War. The cough does not stop.",
    choices: [
      {
        labelVi: "Ôm cha, ép ông thở chậm, xoa ngực cho tới khi cơn co giật dịu",
        labelEn: "Hold him, make him breathe slowly and rub his chest until the spasm eases",
        resultVi: "Hơi thở ông chậm lại dưới tay bạn. Ông đặt bàn tay thô lên đầu bạn. \"Phổi con khỏe hơn phổi cha. Ở The City, phải biết thở thì mới sống.\"",
        resultEn: "His breathing slowed under your hands. He laid a rough palm on your head. “Your lungs are better than mine. In the City you have to know how to breathe to live.”",
        effects: { health: +8, sanity: +6, network: +6 },
        flagsAdd: ['HơiThởKhóiBếp']
      },
      {
        labelVi: "Lục hộp kim loại dưới gầm giường, lấy mặt nạ đeo cho ông",
        labelEn: "Dig the mask out of the metal box under the bed and fit it on him",
        resultVi: "Van thở rít lên theo nhịp quen. Đôi mắt đỏ của cha dần tìm lại tiêu cự. Ông tháo mặt nạ, đặt vào tay bạn. \"Giữ lấy. Khói ở The City không bao giờ tan hẳn.\"",
        resultEn: "The valve hissed in its old rhythm. His red eyes slowly found focus. He took off the mask and put it in your hands. “Keep it. The smoke in the City never fully clears.”",
        effects: { health: +4, sanity: -4, rep: +6 },
        flagsAdd: ['KỷVậtKhói']
      },
      {
        labelVi: "Ngồi nghe ông lẩm bẩm về những kho quân nhu bị khói chôn",
        labelEn: "Sit and listen to him mutter about the supply depots buried in smoke",
        resultVi: "Bạn ngồi im trong bóng tối và nhớ từng tọa độ, từng ký hiệu của đơn vị ông. Năm tuổi, bạn đã biết Smoke War không kết thúc khi người ta ngừng bắn.",
        resultEn: "You sat still in the dark and memorized each coordinate and each mark of his unit. At five you already knew the Smoke War did not end when the shooting did.",
        effects: { sanity: -8, wealth: +8, resonance: +12 },
        flagsAdd: ['BíMậtChiếnTranhKhói']
      }
    ]
  },
  {
    id: 'ev_open_outskirts_beast_stalk',
    age: [2, 6],
    major: true,
    weight: 35,
    need: { flags: ['OutskirtsAdaptability'] },
    vi: "[Bóng ngoài cồn cát] Bão xé rách bạt trại. Qua khe hở, bạn thấy một bóng thú lớn lướt trên cồn cát, móng chạm tới đâu cát sáng lên tới đó. Nó dừng ngay ngoài lều.",
    en: "[The shape beyond the dunes] A storm tears the tarp of your Outskirts camp. Through the gap you see a huge shape move over the dunes, the sand glowing wherever its claws touch. It stops right outside the tent.",
    choices: [
      {
        labelVi: "Vùi mình vào cát và nín thở",
        labelEn: "Bury yourself in the sand and hold your breath",
        resultVi: "Cát nóng rát phủ kín mặt, nhưng bạn nằm im. Con thú khịt mũi ngay trên đầu rồi đi qua. Bạn trồi lên, run bần bật, và biết mình vừa qua một phép thử mà không ai chấm điểm.",
        resultEn: "Hot sand covered your face, but you lay still. The beast snorted right above you and moved on. You came up shaking, knowing you had passed a test no one graded.",
        effects: { health: +4, sanity: -4, rep: +4 },
        flagsAdd: ['SinhTồnHoangDã']
      },
      {
        labelVi: "Chộp thanh xà beng nhặt từ Ruins, nhắm vào chỗ yếu của nó",
        labelEn: "Snatch the iron bar from the Ruins and aim for its weak point",
        resultVi: "Ánh mắt của một đứa trẻ cầm xà beng làm con thú chững lại một nhịp, rồi nó quay đi trong bão cát. Bạn không biết nó sợ hay chỉ đã chán.",
        resultEn: "A child with an iron bar made the beast hesitate for one beat, then it turned away into the storm. You did not know whether it was afraid or only bored.",
        effects: { health: -6, rep: +10, resonance: +14 },
        flagsAdd: ['DãTínhOutskirts']
      },
      {
        labelVi: "Đợi nó đi rồi lần theo dấu, nhặt những mảnh vảy rơi",
        labelEn: "Wait for it to pass and follow the tracks to pick up fallen scales",
        resultVi: "Những mảnh vảy phát sáng cứng hơn thép bỏ đầy túi áo bạn. Một thương nhân lang thang đổi chúng lấy một túi lương khô và ít Ahn.",
        resultEn: "Glowing scales harder than steel filled your pockets. A wandering trader gave you a sack of rations and some Ahn for them.",
        effects: { wealth: +10, sanity: -4 },
        flagsAdd: ['MẩuVảyQuáiVật']
      }
    ]
  },
  {
    id: 'ev_open_nest_quota_exam',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['NestSilverSpoon'] },
    vi: "[Bài kiểm tra cư trú] Thanh tra Wing đến Nest với máy quét đồng tử và kim tiêm vi mạch. Điểm của bạn quyết định gia đình được gia hạn quyền ở lại hay phải xuống Backstreets. Họ đặt phiếu đồng ý trước mặt cha mẹ.",
    en: "[The residency audit] Wing inspectors arrive at your Nest flat with pupil scanners and micro-needles. Your score decides whether the family keeps its place or goes down to the Backstreets. They set the consent form in front of your parents.",
    choices: [
      {
        labelVi: "Làm đúng mọi chỉ dẫn, ngồi thẳng như một công dân Nest",
        labelEn: "Follow every instruction and sit straight like a Nest citizen",
        resultVi: "Máy quét kêu một tiếng xanh. Bản đánh giá ghi: \"Phản xạ thần kinh ổn định, dễ tuân phục.\" Cha mẹ bạn thở ra, và mua cho bạn một hộp kẹo.",
        resultEn: "The scanner gave one green chime. The report read: “Stable neural response, easily compliant.” Your parents exhaled, and bought you a box of candy.",
        effects: { sanity: +6, network: +8, rep: +6 },
        flagsAdd: ['CôngDânGươngMẫu']
      },
      {
        labelVi: "Giấu máy ghi âm nhỏ và thu cuộc nói chuyện riêng của thanh tra",
        labelEn: "Hide a small recorder and capture the inspectors’ private talk",
        resultVi: "Bạn thu được cảnh hai thanh tra bàn chuyện sửa hạn ngạch để tống tiền một gia đình khác. Tin nguy hiểm, và bạn còn quá nhỏ để giữ nó.",
        resultEn: "You recorded two inspectors discussing how to alter quotas to extort another family. Dangerous news, and you were far too young to hold it.",
        effects: { sanity: -4, wealth: +12, taboo: +1 },
        flagsAdd: ['BíMậtGiámĐịnh']
      },
      {
        labelVi: "Làm bài logic Singularity thật tốt để lấy học bổng",
        labelEn: "Do the Singularity logic trial as well as you can and go for the stipend",
        resultVi: "Trưởng đoàn thanh tra nhìn kết quả và gật đầu. \"Một hạt giống tốt.\" Khoản học bổng được chuyển thẳng vào tài khoản gia đình.",
        resultEn: "The lead inspector looked at the result and nodded. “A good seed.” The stipend went straight to the family account.",
        effects: { wealth: +20, merit: +5, sanity: +2 },
        flagsAdd: ['HọcBổngTàiTrợ']
      }
    ]
  },
  {
    id: 'ev_open_wing_elite_tutelage',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['WingElite'] },
    vi: "[Bài học đầu đời] Người hầu làm đổ rượu lên thảm rồi quỳ trước cha bạn. Ông đưa bạn cây bút ký. \"Con xử lý người này thế nào?\" Người hầu vẫn cúi đầu, chờ chữ ký.",
    en: "[The first lesson] A servant spills wine on the rug and kneels before your father. He hands you the signing pen. “How do you deal with this one?” The servant keeps their head bowed, waiting for the signature.",
    choices: [
      {
        labelVi: "Ký lệnh sa thải và đuổi xuống Backstreets theo đúng quy định của Wing",
        labelEn: "Sign the dismissal and send them down to the Backstreets as Wing rules demand",
        resultVi: "An ninh kéo người hầu ra cửa trong tiếng khóc. Cha gật đầu. \"Ở The City, thương hại là bệnh của kẻ nắm quyền.\" Bạn học cách để mặt mình không đổi.",
        resultEn: "Security dragged the servant out, weeping. Father nodded. “In the City, pity is the disease of those who hold power.” You learned to keep your face still.",
        effects: { sanity: -6, wealth: +22, rep: +10 },
        flagsAdd: ['MáuLạnhThượngLưu']
      },
      {
        labelVi: "Nhận lỗi về mình để người hầu mang ơn bạn",
        labelEn: "Take the blame yourself so the servant owes you",
        resultVi: "Người hầu dập đầu cảm ơn trong nước mắt. Cha bạn khẽ nhếch môi. \"Mua lòng trung bằng một món ơn. Con học nhanh hơn ta tưởng.\"",
        resultEn: "The servant bowed to the floor in tears. Your father’s mouth moved slightly. “Buying loyalty with a favor. You learn faster than I expected.”",
        effects: { sanity: +6, network: +18, wealth: -6 },
        flagsAdd: ['MạngLướiÂnNghĩa']
      },
      {
        labelVi: "Chuyển người hầu vào phòng thí nghiệm Singularity làm đối tượng thử",
        labelEn: "Send the servant to the Singularity labs as a test subject",
        resultVi: "Ngay cả trợ lý đứng quanh cũng lặng đi. Dữ liệu thu được có giá trị. Ánh mắt người hầu lúc bị dẫn đi thì bạn còn nhớ lâu.",
        resultEn: "Even the aides standing around went quiet. The data was valuable. The servant’s look as they were led away stayed with you longer.",
        effects: { sanity: -12, taboo: +1, resonance: +18, wealth: +26 },
        flagsAdd: ['ThíNghiệmBíMật']
      }
    ]
  },
  {
    id: 'ev_open_workshop_first_spark',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['WorkshopApprentice'] },
    vi: "[Tia lửa đầu tiên] Trong xưởng rèn đặc mùi dầu tôi và bột sắt, người thợ cả đặt vào tay bạn một chiếc búa nhỏ rồi chỉ vào thanh phôi đang đỏ trên đe. \"Ở The City, hoặc bạn rèn được lưỡi sắc nhất, hoặc bạn thành kẻ bị chém. Bắt đầu đi.\"",
    en: "[The first spark] In a workshop thick with quench oil and iron dust, the master smith puts a small hammer in your hand and points at the glowing billet on the anvil. “In the City you either forge the sharpest edge or get cut by one. Begin.”",
    choices: [
      {
        labelVi: "Giáng nhát búa đầu bằng toàn bộ sức, chịu phản lực chạy dọc cánh tay",
        labelEn: "Bring the hammer down with all your strength and take the shock up your arm",
        resultVi: "Tia lửa bắn khắp đe. Tay bạn đau tê, nhưng nhát búa trúng giữa phôi. Người thợ cả bật cười, vỗ vai bạn. \"Xương tốt. Đôi tay này sinh ra để rèn.\"",
        resultEn: "Sparks flew across the anvil. Your arm went numb, but the blow landed dead center. The master laughed and clapped your shoulder. “Good bones. These hands were made to forge.”",
        effects: { health: +8, rep: +8, wealth: +6 },
        flagsAdd: ['TayBúaVữngVàng']
      },
      {
        labelVi: "Nhìn kỹ thớ kim loại, chỉ ra vết rạn nhỏ dưới lớp xỉ trước khi đập",
        labelEn: "Study the grain and point out the hairline flaw under the slag before striking",
        resultVi: "Người thợ cả nhìn vào chỗ rạn mà mắt thường khó thấy, rồi nhìn bạn lâu hơn. Ông nói bạn có mắt của một người thẩm định vật liệu.",
        resultEn: "The master looked at the flaw hard to see by eye, then at you for longer. He said you had the eye of a materials assessor.",
        effects: { sanity: +8, wealth: +12, network: +6 },
        flagsAdd: ['MắtNhìnKimKhí']
      },
      {
        labelVi: "Nhặt những mẩu thép xỉ tốt rơi dưới chân và đúc lén một con dao",
        labelEn: "Gather the good scrap steel at your feet and forge a knife in secret",
        resultVi: "Sau ba đêm mài lén, bạn giấu một con dao nhỏ sắc lẻm trong tay áo. Mỗi lần ra hẻm tối, bạn đi thẳng lưng hơn.",
        resultEn: "After three nights of secret grinding you hid a small, wicked knife in your sleeve. Each time you went into a dark alley, you walked a little straighter.",
        effects: { health: +4, wealth: +4, rep: +4 },
        flagsAdd: ['DaoGămTựChế']
      }
    ]
  },
  {
    id: 'ev_open_syndicate_tribute_knock',
    age: [3, 7],
    major: true,
    weight: 35,
    need: { flags: ['SyndicateBloodline'] },
    vi: "[Ba tiếng gõ cửa] Hai giờ sáng, Capo đến cùng hai Soldato. Ông nhìn quanh phòng rồi nhìn bạn, như đang tính xem bạn làm được việc gì cho Syndicate.",
    en: "[Three knocks] At two in the morning a Capo arrives with two Soldati. He looks around the room, then at you, as if working out what you could do for the Syndicate.",
    choices: [
      {
        labelVi: "Cúi đầu thật thấp, giữ đúng lễ cho tới khi được phép ngẩng",
        labelEn: "Bow low and keep proper form until allowed to rise",
        resultVi: "Capo nhếch mép gật đầu. \"Nhà này dạy con có thứ tự.\" Ông đặt lên bàn một túi kẹo Nest và giảm hạn ngạch bảo kê tháng này.",
        resultEn: "The Capo gave a faint nod. “This house raises children with order.” He set a bag of Nest sweets on the table and eased this month’s protection levy.",
        effects: { sanity: +6, rep: +10, heat: -4 },
        flagsAdd: ['LễNghiSyndicate']
      },
      {
        labelVi: "Nhìn thẳng vào mắt Capo, không chớp trước họng súng lộ dưới vạt áo",
        labelEn: "Meet the Capo’s eyes without blinking before the gun showing under his coat",
        resultVi: "Capo bật cười. \"Gan lắm nhóc. Các Finger cần người như vậy.\" Ông ném cho bạn một huy hiệu đồng.",
        resultEn: "The Capo laughed. “Nerve, kid. The Fingers need people like that.” He tossed you a brass token.",
        effects: { health: +6, sanity: -4, rep: +14, heat: +8 },
        flagsAdd: ['DũngKhíHắcĐạo']
      },
      {
        labelVi: "Lén cất chiếc bật lửa mạ vàng khắc huy hiệu mà Capo để quên",
        labelEn: "Pocket the gold-plated lighter with the emblem that the Capo left behind",
        resultVi: "Chiếc bật lửa theo bạn khắp Backstreets. Tay côn đồ nào thấy biểu tượng trên nắp cũng lùi một bước.",
        resultEn: "The lighter went with you through the Backstreets. Any thug who saw the emblem on its lid took a step back.",
        effects: { wealth: +10, heat: +6, rep: +6 },
        flagsAdd: ['KỷVậtCapo']
      }
    ]
  },
  {
    id: 'ev_open_dieci_torn_scripture',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['DieciScholastic'] },
    vi: "[Trang sách rời] Khi dọn kho sách của Dieci, bạn nhặt được trang giấy rơi từ một cuốn bị xích khóa. Các ký tự đổi chỗ mỗi lần bạn đọc lại. Cuốn sách vẫn ở trên giá, nhưng ổ khóa đã mở.",
    en: "[The loose page] While cleaning the Dieci archive you pick up a page that has fallen from a chained book. The characters change places each time you read it again. The book is still on the shelf, but its lock is open.",
    choices: [
      {
        labelVi: "Đọc ngấu nghiến và ghi nhớ từng công thức trước khi có người đến",
        labelEn: "Read it greedily and memorize every formula before anyone comes",
        resultVi: "Đầu bạn đau như bị bổ khi những điều lạ tràn vào. Nhưng từ hôm đó, tâm trí bạn có thêm một lớp chắn trước những thứ điên loạn.",
        resultEn: "Your head split with pain as the strange things poured in. But from that day your mind had an extra wall against madness.",
        effects: { sanity: -6, resonance: +18, network: +4 },
        flagsAdd: ['TriThứcDịThường']
      },
      {
        labelVi: "Gói trang giấy lại và đem nộp cho Thầy Viện Trưởng",
        labelEn: "Wrap the page and hand it to the Dean of the monastery",
        resultVi: "Thầy Viện Trưởng đặt tay lên đầu bạn. \"Thật thà và kỷ luật là hai ngọn đèn duy nhất trong sương mù của The City.\" Bạn được thưởng kinh sách và một suất ăn tốt.",
        resultEn: "The Dean rested a hand on your head. “Honesty and discipline are the only two lamps in the City’s fog.” You were rewarded with books and a good ration.",
        effects: { sanity: +14, network: +10, rep: +6 },
        flagsAdd: ['ĐạoĐứcKinhViện']
      },
      {
        labelVi: "Đem những phép tính trên trang giấy vào bài tập đấm bao cát",
        labelEn: "Apply the calculations on the page to your punching-bag drills",
        resultVi: "Cú đấm của một đứa trẻ bỗng nặng gấp ba nhờ góc vung hoàn hảo. Các huấn luyện viên của Dieci im lặng nhìn nhau.",
        resultEn: "A child’s punch suddenly landed with three times the weight thanks to a perfect angle. The Dieci instructors looked at each other in silence.",
        effects: { health: +10, sanity: +6, rep: +8 },
        flagsAdd: ['QuyềnThuậtLogic']
      }
    ]
  },
  {
    id: 'ev_open_lake_tide_whisper',
    age: [3, 7],
    major: true,
    weight: 35,
    need: { flags: ['GreatLakeHardened'] },
    vi: "[Tiếng dưới mặt hồ] Nước Great Lake tràn lên sàn nhà bè. Từ xa, tiếng Whale vọng tới làm cọc neo rung bần bật. Dưới lớp nước đen, một bóng lớn lướt qua chân bạn.",
    en: "[The sound under the lake] Water from the Great Lake spills over the floor of the houseboat. From far off, the call of a Whale shakes the mooring posts. Under the black water a huge shape passes your feet.",
    choices: [
      {
        labelVi: "Đứng vững trên mạn thuyền, hứng gió muối và tiếng rống từ ngoài khơi",
        labelEn: "Stand firm on the gunwale and take the salt wind and the roar from the deep",
        resultVi: "Chấn động làm người yếu bóng vía ngất đi, còn bạn đứng yên như đá ngầm. Dòng máu người đi biển cho bạn một bộ gan lì trước những thứ quá lớn.",
        resultEn: "The shock knocked the faint-hearted down, but you stood like a reef. Sailor’s blood gave you a stubborn nerve before things too big to fight.",
        effects: { health: +12, sanity: +8, rep: +6 },
        flagsAdd: ['ChinhPhụcSóngĐen']
      },
      {
        labelVi: "Lội xuống vùng nước nông vớt những con cá phát sáng dạt vào để bán",
        labelEn: "Wade into the shallows and haul out the glowing fish washed in, to sell",
        resultVi: "Nước lạnh buốt tận xương, nhưng bạn vớt được đầy một giỏ cá phát sáng. Chợ đêm bến nước trả bạn một món Ahn kha khá.",
        resultEn: "The water bit to the bone, but you brought out a full basket of glowing fish. The night dock market paid a decent sum of Ahn.",
        effects: { wealth: +14, health: -4 },
        flagsAdd: ['CáPhátQuang']
      },
      {
        labelVi: "Khắc hình âm thoa lên mảnh gỗ trôi dạt làm bùa chắn",
        labelEn: "Carve a tuning-fork sign into drift timber as a ward",
        resultVi: "Mảnh gỗ rung nhẹ, và những bóng Mermaid quanh nhà bè lùi đi. Cha bạn xoa đầu bạn, tay còn ướt nước.",
        resultEn: "The wood hummed faintly, and the Mermaid shapes around the houseboat drew back. Your father ruffled your hair with a wet hand.",
        effects: { sanity: +8, rep: +6, resonance: +6 },
        flagsAdd: ['BùaÂmThoa']
      }
    ]
  },
  {
    id: 'ev_open_warp_curtain_peek',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['WarpCleanupCrew'] },
    vi: "[Khe cửa toa WARP] Bạn theo cha mẹ tới trạm bảo dưỡng ngầm của W Corp. Cửa niêm phong của một toa vừa hoàn thành chuyến \"mười giây\" hé ra một khe nhỏ trước khi đội khử khuẩn bước vào. Mùi máu và tiếng thì thầm không thành lời rỉ ra từ bên trong.",
    en: "[The gap in the WARP car door] You tag along with your parents to W Corp’s underground depot. The sealed door of a car that has just finished its “ten second” trip opens a small gap before the sterilization crew enters. A smell of blood and a wordless whisper seep out.",
    choices: [
      {
        labelVi: "Nhìn thẳng qua khe hở",
        labelEn: "Look straight through the gap",
        resultVi: "Thứ bạn thấy là thịt và xương dính vào nhau, vẫn còn cử động. Đầu bạn trống rỗng. Sau cú sốc ấy, bạn thấy mọi thứ khác chậm lại và nhạt đi.",
        resultEn: "What you saw was flesh and bone fused together, still moving. Your head went blank. After that shock everything else seemed slower and paler.",
        effects: { sanity: -14, resonance: +22, taboo: +1 },
        flagsAdd: ['ThấuThịWARP']
      },
      {
        labelVi: "Quay lưng, bịt tai, hát to một bài đồng dao Backstreets để át tiếng rên",
        labelEn: "Turn away, cover your ears and sing a Backstreets nursery rhyme to drown the moaning",
        resultVi: "Bạn giữ được đầu óc mình trước khi vực sâu kịp nuốt nó. Cha chạy tới, ôm bạn vào lòng rồi kéo đi.",
        resultEn: "You kept your mind before the abyss could swallow it. Your father ran over, took you in his arms and pulled you away.",
        effects: { sanity: +8, health: +4 },
        flagsAdd: ['BịtTaiLàmNgơ']
      },
      {
        labelVi: "Lén nhặt chiếc đồng hồ vàng của hành khách rơi ngoài cửa toa",
        labelEn: "Pick up the passenger’s gold watch dropped outside the car door",
        resultVi: "Chiếc đồng hồ cổ của một quý tộc Nest nằm gọn trong ống quần bạn. Khi mang đi cầm, nó đủ nuôi cả nhà nhiều tháng.",
        resultEn: "A Nest noble’s antique watch sat in your sock. Pawned, it fed the household for months.",
        effects: { wealth: +18, taboo: +1 },
        flagsAdd: ['KỷVậtHànhKháchWARP']
      }
    ]
  },
  {
    id: 'ev_open_bistro_kitchen_fire',
    age: [3, 7],
    major: true,
    weight: 35,
    need: { flags: ['BistroHeir'] },
    vi: '[Ngọn Lửa Bếp Đêm Backstreets] Một vị khách lạ đẫm máu vừa ngã gục vào cửa sau quán mì đêm của gia đình bạn, để lại một túi tiền Ahn trước chảo dầu đang sôi sùng sục. Ngoài ngõ, tiếng ủng da gõ dồn dập của toán đòi nợ mang theo mã tấu đang tiến sát.',
    en: '[Backstreets Kitchen Fire] A bleeding stranger collapses through the rear kitchen door of your family diner, dropping a heavy purse of Ahn beside a boiling oil wok while debt-enforcers march outside.',
    choices: [
      {
        labelVi: 'Giấu người khách xuống hầm than, bưng bát súp nóng hổi ra tươi cười tiếp đãi toán truy sát',
        labelEn: 'Shove the stranger into the coal chute, greeting enforcers with hot bowls and fake smiles',
        resultVi: 'Toán đòi nợ ăn sạch bát súp cay rồi bỏ đi mà không nghi ngờ gì. Vị khách sống sót tặng lại cho gia đình bạn một nửa túi tiền Ahn và một lời hứa bảo kê.',
        resultEn: 'Enforcers devour the spicy broth and leave unsuspectingly. The grateful fugitive leaves half the purse and an Office contact.',
        effects: { sanity: +6, network: +16, wealth: +10 },
        flagsAdd: ['KhéoLéoĐưaĐẩy']
      },
      {
        labelVi: 'Hắt chảo dầu sôi vào mặt tên dẫn đầu khi hắn vừa thò đầu vào cửa bếp',
        labelEn: 'Heave the boiling wok directly into the lead thug’s face as he breaches the door',
        resultVi: 'Tiếng thét xé lòng vang lên trong ngõ hẻm. Toán côn đồ hoảng sợ khiêng đồng bọn bỏ chạy. Sự liều lĩnh của bạn khiến cả khu phố phải kiêng dè quán ăn nhà bạn.',
        resultEn: 'Screams echo through the alley as scalding grease does its work. The thugs flee in horror, leaving the street terrified of your diner.',
        effects: { health: -4, rep: +12, heat: +8 },
        flagsAdd: ['HăngMáuBếpNóng']
      },
      {
        labelVi: 'Nhanh tay cất túi tiền Ahn rồi chỉ tay ra hướng ngược lại đánh lừa toán giang hồ',
        labelEn: 'Pocket the purse in a blink, pointing enforcers down the opposite blind alley',
        resultVi: 'Toán côn đồ hùng hổ đuổi theo hướng chỉ tay của bạn. Bạn nhét túi tiền Ahn căng phồng vào hũ gạo của mẹ một cách êm thấm.',
        resultEn: 'Enforcers sprint down the false path. You slip the heavy purse into your mother’s rice urn without a ripple.',
        effects: { wealth: +18, sanity: -2 },
        flagsAdd: ['ThựcDụngĐườngPhố']
      }
    ]
  },
  {
    id: 'ev_open_prosthetic_spark_wire',
    age: [3, 7],
    major: true,
    weight: 35,
    need: { flags: ['ProstheticClinic'] },
    vi: '[Bó Dây Thần Kinh Nhân Tạo Đầu Tiên] Máy cấp điện trong phòng khám chân tay giả của gia đình bạn bị chập lửa giữa ca phẫu thuật nối cánh tay cơ khí cho một Fixer bị trọng thương. Vết thương phun máu xối xả và bệnh nhân bắt đầu co giật nguy kịch.',
    en: '[The First Nerve Spark] The generator shorts out mid-surgery in your unlicensed cybernetics clinic while attaching a battle-grade arm to a Fixer. Blood spurts as the patient convulses.',
    choices: [
      {
        labelVi: 'Dùng kìm cách điện nối tắt hai đầu dây bình ắc quy dự phòng để khởi động lại máy cầm máu',
        labelEn: 'Use insulated pliers to bridge the backup cell, restarting the cauterizer',
        resultVi: 'Tia lửa bắn vào ngón tay làm bạn bỏng rát, nhưng máy cầm máu đã kịp hoạt động trở lại. Fixer qua cơn nguy kịch và cúi đầu cảm tạ bạn.',
        resultEn: 'Sparks scorch your fingers, but the cauterizer hums to life in the nick of time. The Fixer survives and bows deeply to you.',
        effects: { health: -4, sanity: +8, rep: +10 },
        flagsAdd: ['BànTayCứuSinh']
      },
      {
        labelVi: 'Giữ chặt van xả áp suất của cánh tay giả để ngăn dòng dầu thủy lực rò rỉ vào mạch máu',
        labelEn: 'Clamp down the hydraulic release valve to stop toxic motor fluid entering arteries',
        resultVi: 'Đôi bàn tay nhỏ bé của bạn siết chặt chốt van không buông suốt 10 phút. Bác sĩ khen ngợi bạn có sự bình tĩnh và phản xạ của một phẫu thuật viên thiên tài.',
        resultEn: 'Your small hands clamp the valve tight for ten grueling minutes. The surgeon praises your icy nerves and surgical instinct.',
        effects: { health: +6, wealth: +8, network: +6 },
        flagsAdd: ['BìnhTĩnhPhẫuThuật']
      },
      {
        labelVi: 'Tranh thủ lúc hỗn loạn tháo lấy chiếc van gia tốc bằng titan rơi ra từ cánh tay cơ khí',
        labelEn: 'Pocket an unfastened titanium accelerator valve jarred loose in the chaos',
        resultVi: 'Món linh kiện cơ khí cao cấp được bạn cất giấu cẩn thận. Về sau, đây là nguyên liệu quý giá để chế tạo vũ khí cho riêng bạn.',
        resultEn: 'A high-grade alloy valve slips cleanly into your pocket. Later, it becomes the beating heart of your own gear.',
        effects: { wealth: +14, sanity: -2 },
        flagsAdd: ['ChiTiếtMáyHiếm']
      }
    ]
  },
  {
    id: 'ev_open_orphan_garbage_pile',
    age: [2, 6],
    major: true,
    weight: 35,
    need: { flags: ['StreetRatInstinct'] },
    vi: '[Bãi Rác Sau Giờ Sweeper] Đồng hồ chỉ 4:35 sáng, tiếng còi báo hết giờ giới nghiêm Night in the Backstreets vừa dứt. Bạn bò ra khỏi nắp cống hôi thối, chạy đua cùng bầy chuột và những đứa trẻ mồ côi khác để bới tìm bất kỳ thứ gì có thể ăn được hoặc bán được trước khi xe dọn đường của khu đến.',
    en: '[The Scavenge Post-Sweepers] At 4:35 AM, curfew sirens cut out. You scramble from the sewer grate, racing alley rats and other starving orphans to strip the morning gutters before municipal incinerators arrive.',
    choices: [
      {
        labelVi: 'Tranh cướp được một mẩu bánh mì khô nguyên vẹn dưới gầm chiếc xe rác hỏng',
        labelEn: 'Wrest a dry crust of bread from beneath a crumpled disposal cart',
        resultVi: 'Bị hai đứa trẻ khác cào rách vai, nhưng bạn cắn chặt mẩu bánh và nuốt chửng nó. Lồng ngực ấm lại, xua tan cơn đói cồn cào sau một đêm đông lạnh giá.',
        resultEn: 'Scratched across the shoulders by rivals, you swallow the dry crust whole. Warmth returns to your ribs against the frost.',
        effects: { health: +8, sanity: +4 },
        flagsAdd: ['MiếngĂnSinhTồn']
      },
      {
        labelVi: 'Nhặt được một thanh sắt nhọn hoắt dính mỡ Sweeper để mài làm vũ khí tự vệ',
        labelEn: 'Claim a rusted metal stake slick with Sweeper tallow as your weapon',
        resultVi: 'Thanh sắt nhọn hoắt trở thành chiếc nanh vuốt đầu tiên của bạn trong thế giới ngầm. Những đứa trẻ khác nhìn thấy thanh sắt trong tay bạn đều phải lùi bước.',
        resultEn: 'The rusted stake becomes your very first fang. Other alley urchins glance at your iron bar and back off into the dark.',
        effects: { health: -4, rep: +8 },
        flagsAdd: ['ThanhSắtBén']
      },
      {
        labelVi: 'Mò mẫm dưới bùn đen của cống thoát nước nhặt được vài đồng Ahn rơi vãi',
        labelEn: 'Sift through the black sludge of the runoff drain to fish out dropped Ahn coins',
        resultVi: 'Bàn tay bạn mò mẫm trong chất nhờn tanh tưởi và chạm vào những đồng xu kim loại lạnh ngắt. Ba đồng Ahn nhặt được là kho báu đầu đời của bạn.',
        resultEn: 'Fingers sifting foul muck strike cold metal discs. Three tarnished Ahn become your first earned fortune in The City.',
        effects: { wealth: +8, sanity: +2 },
        flagsAdd: ['ĐồngAhnMayMắn']
      }
    ]
  }
];
