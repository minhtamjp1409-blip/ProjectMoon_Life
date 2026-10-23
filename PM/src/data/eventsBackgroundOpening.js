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
    vi: "[Cơn ho của cha] Giữa đêm, cha bạn bật dậy tìm chiếc mặt nạ phòng độc cũ. Ông không nhận ra căn phòng, chỉ gọi tên những đồng đội đã chết trong Smoke War. Bạn đứng cạnh giường; cơn ho vẫn chưa dứt.",
    en: "[Father’s Cough] In the middle of the night your father sits up and searches for his old gas mask. He does not recognize the room and calls out the names of comrades who died in the Smoke War. You stand by the bed; the cough has not stopped.",
    choices: [
      {
        labelVi: 'Ôm chặt lấy cha, ép ông thở chậm lại và xoa bóp lồng ngực cho đến khi cơn co giật dịu đi',
        labelEn: "Hold him close and make him breathe slowly, rubbing his chest until the coughing eases",
        resultVi: 'Hơi ấm từ bàn tay nhỏ bé của bạn thấm qua chiếc áo đẫm mồ hôi lạnh của cha. Hơi thở ông từ từ chậm lại, từng giọt nước mắt lăn dài trên gò má nám đen. Ông đặt bàn tay thô ráp lên đầu bạn: "Phổi của con khỏe hơn của cha... Ở The City này, phải biết thở để sống."',
        resultEn: "The warmth of your small hands soaks through his cold-sweat shirt. His breathing slows, and tears run down his soot-darkened cheeks. He lays a rough hand on your head: “Your lungs are stronger than mine… In The City you have to know how to breathe to live.”",
        effects: { health: +8, sanity: +6, network: +6 },
        flagsAdd: ['HơiThởKhóiBếp']
      },
      {
        labelVi: 'Lục tìm chiếc hộp kim loại dưới gầm giường, lấy chiếc mặt nạ phòng độc cũ đeo vào mặt ông',
        labelEn: "Dig the old gas mask out of the metal box under the bed and fit it over his face",
        resultVi: 'Tiếng van thở kim loại rít lên nhịp nhàng quen thuộc. Hít sâu luồng không khí lọc qua lớp than hoạt tính cũ kỹ, đôi mắt vằn đỏ của cha bạn dần lấy lại tiêu cự. Ông tháo chiếc mặt nạ, trao nó vào tay bạn: "Cầm lấy. Khói ở The City chưa bao giờ tan hẳn đâu."',
        resultEn: "The metal valve hisses in a familiar rhythm. He breathes the air filtered through old charcoal, and his bloodshot eyes slowly regain focus. He takes off the mask and puts it in your hands: “Take it. The smoke in The City never really clears.”",
        effects: { health: +4, sanity: -4, rep: +6 },
        flagsAdd: ['KỷVậtKhói']
      },
      {
        labelVi: 'Lắng nghe từng lời mê sảng của ông về vị trí kho quân nhu bị chôn vùi trong khói',
        labelEn: "Listen to his fevered mutter about the buried supply depots",
        resultVi: 'Bạn ngồi im trong bóng tối, ghi nhớ từng con số tọa độ và ký hiệu mật mã của sư đoàn cựu chiến binh. Sự tàn nhẫn của cuộc chiến tranh khói ngấm sâu vào tâm trí bạn từ thuở lên năm.',
        resultEn: "You sit still in the dark and memorize every coordinate and cipher mark of the veterans’ division. The cruelty of the Smoke War sinks into you at age five.",
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
    vi: "[Bóng ngoài cồn cát] Bão xé rách bạt trại. Qua khe hở, bạn thấy một bóng thú lớn lướt trên cồn cát, để lại những vệt sáng nơi móng chạm đất. Nó dừng ngay ngoài lều.",
    en: '[The Stalker Beyond the Dunes] A venomous gale tore through your Outskirts camp. In violet lightning flashes, the silhouette of a towering non-human horror stalked past, talons carving phosphorescent furrows into the sand.',
    choices: [
      {
        labelVi: 'Vùi sâu mình vào đụn cát độc, nín thở tuyệt đối theo bản năng sinh tồn',
        labelEn: 'Burrow deep into the toxic dunes and hold your breath in absolute stillness',
        resultVi: 'Cát nóng rát vùi lấp cả mặt mũi, nhưng bạn nằm im bất động không phát ra một tiếng động nhỏ. Con quái vật khịt mũi trên đầu bạn rồi lướt qua. Bạn trồi lên khỏi đống cát, toàn thân run rẩy nhưng nhận ra mình vừa sống sót qua thử thách đầu đời.',
        resultEn: 'Acrid sand burns your skin, yet you stay deathly still. The beast snorts above your head and lumbers away. You crawl out shaking, baptised by Outskirts survival.',
        effects: { health: +4, sanity: -4, rep: +4 },
        flagsAdd: ['SinhTồnHoangDã']
      },
      {
        labelVi: 'Chộp lấy thanh xà beng nhặt từ Ruins, mắt trừng trừng sẵn sàng đâm vào tử huyệt quái vật',
        labelEn: 'Snatch an iron bar scavenged from Ruins, glaring through the slit ready to strike',
        resultVi: 'Ánh mắt sắc lẹm và sát khí hoang dại của một đứa trẻ khiến con quái vật chững lại một nhịp trước khi quay đầu hòa vào bão cát. Sự hung hãn của vùng đất hoang đã ăn sâu vào huyết quản bạn.',
        resultEn: 'Your fierce, feral glare makes the monstrosity hesitate before vanishing into the storm. The untamed savagery of the wastes takes root in your blood.',
        effects: { health: -6, rep: +10, resonance: +14 },
        flagsAdd: ['DãTínhOutskirts']
      },
      {
        labelVi: 'Chờ quái vật đi qua rồi lần theo dấu vết nhặt nhạnh mẩu vảy kim loại rơi rụng',
        labelEn: 'Trail its heavy tracks once it passes to pry off dropped chitin flakes',
        resultVi: 'Những mẩu vảy phát quang cứng hơn thép thường được bạn thu thập vào túi áo. Một thương nhân lang bạt sau đó đã đổi cho bạn một túi lương khô và vài đồng Ahn quý giá.',
        resultEn: 'You harvest phosphorescent scales harder than tempered iron. A wandering trader trades a sack of rations and precious Ahn for the prize.',
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
    vi: "[Bài kiểm tra cư trú] Thanh tra Wing đến Nest với máy quét đồng tử và kim tiêm vi mạch. Điểm của bạn sẽ quyết định gia đình được gia hạn quyền ở lại hay phải xuống Backstreets. Họ đặt phiếu đồng ý trước mặt cha mẹ.",
    en: '[The Nest Biometric Audit] Wing evaluators in spotless coats arrive at your Nest flat with retinal scanners and micro-needles to assess your "Potential Asset Index" determining your citizenship renewal.',
    choices: [
      {
        labelVi: 'Ngoan ngoãn tuân thủ mọi chỉ dẫn, thể hiện tư chất của một công dân Nest kỷ luật',
        labelEn: 'Comply with clinical obedience, displaying the textbook poise of a model Nest citizen',
        resultVi: 'Máy quét phát ra tiếng tít xanh hài lòng. Bản đánh giá ghi rõ: "Phản xạ thần kinh ổn định, khả năng tuân phục cao." Cha mẹ bạn thở phào nhẹ nhõm, thưởng cho bạn một hộp bánh ngọt thượng hạng.',
        resultEn: 'The scanner chimes a reassuring green. The report reads: "Compliant neural response, prime feeder stock." Your parents weep with relief and buy you candied fruit.',
        effects: { sanity: +6, network: +8, rep: +6 },
        flagsAdd: ['CôngDânGươngMẫu']
      },
      {
        labelVi: 'Lén giấu máy ghi âm mini Backstreets thu lại cuộc trao đổi nội bộ của giám định viên',
        labelEn: 'Pocket a hidden recorder to capture the inspector’s private corruption talk',
        resultVi: 'Bạn thu được đoạn ghi âm thanh tra viên bàn về việc làm sai lệch hạn ngạch để tống tiền một gia đình khác. Một món tin tức nguy hiểm nhưng đầy giá trị trong tay một đứa trẻ.',
        resultEn: 'You record inspectors plotting extortion over falsified quotas. Dangerous leverage, precocious and sharp.',
        effects: { sanity: -4, wealth: +12, taboo: +1 },
        flagsAdd: ['BíMậtGiámĐịnh']
      },
      {
        labelVi: 'Thể hiện xuất sắc vượt trội trong bài toán Singularity để giật học bổng ưu tú',
        labelEn: 'Ace the Singularity logic trial with chilling precision to claim a juvenile grant',
        resultVi: 'Trưởng đoàn thanh tra nhìn chằm chằm vào bản kết quả với nụ cười hài lòng: "Một hạt giống tốt." Bạn được trao một khoản trợ cấp học bổng lớn chuyển thẳng vào tài khoản gia đình.',
        resultEn: 'The lead inspector marks your file with an approving nod: "Promising raw material." A handsome education stipend is wired to your family account.',
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
    vi: "[Bài học đầu đời] Gia nhân làm đổ rượu lên thảm và quỳ trước cha bạn. Ông đưa bạn cây bút ký: \"Con sẽ xử lý người này thế nào?\" Người gia nhân vẫn cúi đầu, chờ chữ ký.",
    en: '[The Highborn Lesson] High atop the 50th floor spire, your father stands over a trembling servant who spilled vintage wine onto imported rug. Handing you an executive stylus, he asks: "How do you dispose of broken tools?"',
    choices: [
      {
        labelVi: 'Ký lệnh sa thải và trục xuất người hầu xuống Backstreets theo đúng quy tắc tàn nhẫn của Wing',
        labelEn: 'Sign the termination and banishment order to Backstreets as corporate protocol demands',
        resultVi: 'Người hầu bị an ninh kéo lê ra cửa trong tiếng gào khóc. Cha gật đầu tán thưởng: "Ở The City, thương hại là căn bệnh chết người của kẻ nắm quyền." Bạn học được sự lạnh lùng của giới thượng lưu.',
        resultEn: 'Security drags the screaming servant out. Father nods softly: "Pity is the fatal cancer of rulers." You absorb the ice of the ruling caste.',
        effects: { sanity: -6, wealth: +22, rep: +10 },
        flagsAdd: ['MáuLạnhThượngLưu']
      },
      {
        labelVi: 'Đứng ra nhận lỗi thay, khiến người hầu phải mang ơn cứu mạng suốt đời',
        labelEn: 'Take the blame yourself, binding the servant to an unbreakable debt of life loyalty',
        resultVi: 'Người hầu dập đầu cảm tạ bạn trong nước mắt. Cha bạn khẽ mỉm cười: "Thu phục lòng trung thành bằng một món nợ sinh tử... Con hiểu chuyện nhanh hơn ta tưởng."',
        resultEn: 'The servant sobs in tearful gratitude. Father smirks: "Binding loyalty through manufactured grace... You learn faster than I hoped."',
        effects: { sanity: +6, network: +18, wealth: -6 },
        flagsAdd: ['MạngLướiÂnNghĩa']
      },
      {
        labelVi: 'Chuyển người hầu vào phòng thí nghiệm Singularity bí mật làm đối tượng thử nghiệm',
        labelEn: 'Reassign the servant to classified Singularity labs as a biological test subject',
        resultVi: 'Một quyết định tàn nhẫn đến mức khiến cả những trợ lý xung quanh rùng mình. Dữ liệu thử nghiệm mang lại những kết quả giá trị, nhưng ánh mắt của người hầu trước khi bị đưa đi ám ảnh bạn mãi.',
        resultEn: 'A decision so cold even executive aides shiver. Test data advances corporate standing, but their parting eyes haunt your dreams.',
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
    vi: '[Tia Lửa Lò Rèn Đầu Tiên] Trong xưởng rèn nồng nặc mùi dầu tôi kim loại và bột sắt, người thợ cả đặt vào tay bạn một chiếc búa nhỏ vừa vặn và chỉ vào thanh phôi thép đang rực đỏ trên đe. "Muốn sống sót ở The City, hoặc là rèn nên vũ khí bén nhất, hoặc là trở thành kẻ bị chém. Bắt đầu đi."',
    en: '[The Forge’s First Spark] In a workshop reeking of quench acid and iron dust, the master smith hands you a scaled mallet, pointing at white-hot billet steel. "In this City, you either temper the keenest edge, or get cut down. Strike."',
    choices: [
      {
        labelVi: 'Dồn hết sức bình sinh giáng nhát búa đầu tiên, đón nhận phản lực tê dại chạy dọc sống lưng',
        labelEn: 'Bring the hammer down with all your might, absorbing the jarring reverberation',
        resultVi: 'Tia lửa bắn tung tóe quanh chiếc đe. Cánh tay đau nhức nhưng nhát búa rơi trúng hồng tâm thanh phôi. Người thợ cả cười lớn vỗ vai bạn: "Cốt cách tốt! Đôi bàn tay này sinh ra là để đúc thép."',
        resultEn: 'Sparks scatter across the soot. Muscles ache, but the blow landed dead-center. The master laughs: "Good bones! Those hands were born to forge."',
        effects: { health: +8, rep: +8, wealth: +6 },
        flagsAdd: ['TayBúaVữngVàng']
      },
      {
        labelVi: 'Chăm chú quan sát thớ kim loại, chỉ ra vết rạn vi mô ẩn dưới lớp xỉ than trước khi đập',
        labelEn: 'Examine the glowing grain closely, spotting hidden micro-fractures before striking',
        resultVi: 'Người thợ cả kinh ngạc nhìn vào điểm rạn mà mắt thường khó thấy. Ông gật đầu thán phục thị lực và khả năng thẩm định vật liệu hiếm có của bạn.',
        resultEn: 'The smith gapes at the faint flaw unseen by common eyes. He praises your unnatural diagnostic instinct for structural weaknesses.',
        effects: { sanity: +8, wealth: +12, network: +6 },
        flagsAdd: ['MắtNhìnKimKhí']
      },
      {
        labelVi: 'Nhặt nhạnh những mẩu xỉ thép cao cấp rơi vãi đem đúc thành một chiếc dao găm tự chế',
        labelEn: 'Gather high-grade alloy scraps to fashion a concealed shiv of your own',
        resultVi: 'Sau ba đêm mài giũa bí mật, bạn giấu trong tay áo một con dao găm nhỏ sắc lẻm. Món vũ khí đầu đời giúp bạn tự tin hơn mỗi khi bước ra ngoài hẻm tối.',
        resultEn: 'After three nights of stealth grinding, a wicked pocket blade rests up your sleeve. Your very first steel companion.',
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
    vi: "[Ba tiếng gõ cửa] Lúc hai giờ sáng, Capo đến cùng hai Soldato. Ông ta nhìn quanh phòng rồi nhìn bạn, như đang tính xem bạn làm được việc gì cho Syndicate.",
    en: '[The Capo’s Midnight Knock] At 2 AM sharp, three heavy knocks sound the syndicate code. A trenchcoated Capo enters trailing gunsmoke, his dead eyes auditing you like fresh recruits.',
    choices: [
      {
        labelVi: 'Cúi đầu 90 độ, giữ nghiêm lễ nghi của tổ chức cho đến khi được phép ngẩng lên',
        labelEn: 'Bow at a strict right angle, holding silent etiquette until dismissed',
        resultVi: 'Vị Capo khẽ nhếch mép gật đầu: "Gia đình dạy dỗ rất có tôn ti trật tự." Ông đặt lên bàn một túi bánh kẹo Nest cao cấp và giảm bớt hạn ngạch bảo kê tháng này.',
        resultEn: 'The Capo smirks faintly: "Proper manners run in the blood." He drops a tin of Nest sweets on the table, easing this month’s protection levy.',
        effects: { sanity: +6, rep: +10, heat: -4 },
        flagsAdd: ['LễNghiSyndicate']
      },
      {
        labelVi: 'Dám nhìn thẳng vào mắt vị Capo, không hề chớp mắt trước họng súng lộ ra dưới vạt áo',
        labelEn: 'Hold his icy gaze without flinching, unblinking before the holstered steel beneath his coat',
        resultVi: 'Capo bật cười sảng khoái: "Có gan lắm đứa nhóc! Ngón Tay cần những kẻ có máu liều như thế này." Ông ta rút ra một chiếc huy hiệu đồng ném cho bạn.',
        resultEn: 'The Capo bursts into a harsh laugh: "Good spine! The Fingers need beasts who don’t piss themselves." He tosses you a brass token.',
        effects: { health: +6, sanity: -4, rep: +14, heat: +8 },
        flagsAdd: ['DũngKhíHắcĐạo']
      },
      {
        labelVi: 'Lén cất chiếc bật lửa mạ vàng khắc huy hiệu tổ chức mà Capo để quên trên bàn',
        labelEn: 'Pocket the gold-plated syndicate emblem lighter he absentmindedly left behind',
        resultVi: 'Chiếc bật lửa trở thành vật bất ly thân của bạn trong Backstreets. Bất kỳ tên côn đồ vặt nào nhìn thấy biểu tượng trên nắp bật lửa đều phải e dè lùi bước.',
        resultEn: 'The engraved lighter becomes your pocket talisman. Backstreet thugs shy away whenever the polished brass catches the streetlight.',
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
    vi: "[Trang sách rời] Khi dọn kho sách Dieci, bạn nhặt được trang giấy rơi từ một cuốn bị xích khóa. Các ký tự đổi chỗ mỗi lần bạn đọc lại. Cuốn sách vẫn ở trên giá, nhưng ổ khóa đã mở.",
    en: '[The Torn Dieci Folio] Dusting the high rafters of the Dieci monastery archive, a loose parchment slips from a chained codex. Its arcane geometry rearranges itself as you read, detailing forbidden mental theorems.',
    choices: [
      {
        labelVi: 'Đọc ngấu nghiến và ghi nhớ từng công thức tâm trí trước khi có người đến',
        labelEn: 'Devour the forbidden formulas, searing the equations into your memory',
        resultVi: 'Đầu bạn đau như búa bổ khi những chân lý kỳ dị tràn vào tiềm thức. Nhưng từ hôm đó, tâm trí bạn có một lớp giáp vô hình bảo vệ trước những điều điên loạn.',
        resultEn: 'A blinding headache rips through your skull, yet an invisible bulwark forms in your psyche against madness.',
        effects: { sanity: -6, resonance: +18, network: +4 },
        flagsAdd: ['TriThứcDịThường']
      },
      {
        labelVi: 'Cẩn thận bọc trang giấy lại và dâng nộp cho Thầy Viện Trưởng',
        labelEn: 'Reverently wrap the parchment and surrender it to the Monastery Dean',
        resultVi: 'Thầy Viện Trưởng đặt tay chúc phúc lên đầu bạn: "Sự trung thực và kỷ luật là ngọn đuốc soi đường trong bóng đêm The City." Bạn được ban thưởng sách kinh và khẩu phần ăn đặc biệt.',
        resultEn: 'The Dean rests a heavy palm on your brow: "Honesty and discipline are the lone lanterns in the City’s fog." You receive sacred texts and prime rations.',
        effects: { sanity: +14, network: +10, rep: +6 },
        flagsAdd: ['ĐạoĐứcKinhViện']
      },
      {
        labelVi: 'Áp dụng những phép tính trên trang giấy vào bài tập đấm bao cát thực chiến',
        labelEn: 'Apply its kinetic calculations directly to your heavy punching bag drills',
        resultVi: 'Cú đấm của một đứa trẻ bỗng phát ra lực công phá mạnh gấp ba lần bình thường nhờ góc vung hoàn hảo. Các huấn luyện viên võ thuật Dieci phải trầm trồ thán phục.',
        resultEn: 'Your small fist hits with triple force, momentum channelled flawlessly by geometric leverage. Instructors nod in quiet shock.',
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
    en: '[The Great Lake Whale Breathing] Night tide surges over District 21 docks, churning oily black foam. From fathomless depths, the brass trumpet call of a colossal Whale rattles mooring pilings and washes eerie shadows across your barge floor.',
    choices: [
      {
        labelVi: 'Đứng vững trên mạn thuyền, dang tay đón làn gió muối mặn chát và tiếng rống biển khơi',
        labelEn: 'Stand firm on the bow, embracing the salt spray and the leviathan’s roar',
        resultVi: 'Cơn chấn động khiến những người yếu tim ngất lịm, nhưng bạn đứng sừng sững như một mẩu đá ngầm. Dòng máu của người đi biển tôi rèn cho bạn một lá gan thép trước mọi dị vật khổng lồ.',
        resultEn: 'The shockwave fells frail souls, but you remain planted like bedrock. The saltwater bloodline hardens your nerve against all leviathans.',
        effects: { health: +12, sanity: +8, rep: +6 },
        flagsAdd: ['ChinhPhụcSóngĐen']
      },
      {
        labelVi: 'Nhảy xuống vùng nước nông mò mẫm bắt những con cá phát quang dạt vào bờ để đem bán',
        labelEn: 'Wade into churning shallows to haul out phosphorescent anomaly fish for market',
        resultVi: 'Nước biển lạnh cóng thấu xương, nhưng bạn vớt được một giỏ đầy cá phát quang quý hiếm. Chợ đêm thủy sản trả cho bạn một món tiền Ahn hậu hĩnh.',
        resultEn: 'Biting brine chills your bones, but your basket overflows with rare glowing catch. The dock market pays handsomely.',
        effects: { wealth: +14, health: -4 },
        flagsAdd: ['CáPhátQuang']
      },
      {
        labelVi: 'Dùng dao khắc biểu tượng âm thoa điều sóng lên mảnh gỗ trôi dạt làm bùa trừ tà',
        labelEn: 'Carve tuning-fork resonance runes into drift timber as an anomaly ward',
        resultVi: 'Bùa gỗ phát ra rung cảm nhẹ nhàng, xua đi những chiếc bóng Mermaid lởn vởn quanh nhà bè. Cha bạn mỉm cười xoa đầu bạn khen ngợi.',
        resultEn: 'The rune hums softly, driving off curious Mermaid shapes from the hull. Your father ruffles your damp hair in pride.',
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
    vi: '[Kẽ Hở Sau Cửa Toa Tàu WARP] Trong một lần theo cha mẹ đến trạm bảo dưỡng ngầm của W Corp, cánh cửa niêm phong của một toa tàu vừa kết thúc chuyến hành trình "10 giây" hé mở một khe nhỏ trước khi đội phun khử khuẩn bước vào. Mùi máu tanh nồng và tiếng thì thầm vô thanh rỉ ra từ bên trong.',
    en: '[The WARP Carriage Slit] Tagging along to W Corp’s subterranean depot, an unsealed door of a carriage fresh off its "10-second" jump cracks open before sterilization teams enter, leaking visceral stench.',
    choices: [
      {
        labelVi: 'Nhìn thẳng qua khe hở, chứng kiến toàn bộ sự thật kinh hoàng không thể diễn tả',
        labelEn: 'Peer straight through the gap, witnessing the unspeakable reality within',
        resultVi: 'Cảnh tượng thịt xương quằn quại kết dính qua hàng ngàn năm tra tấn đập thẳng vào mắt bạn. Đầu bạn nổ tung vì kinh hoàng, nhưng một sự chai sạn dị thường bỗng bao phủ lấy giác quan.',
        resultEn: 'Thousands of years of conjoined flesh and screaming marrow sear into your pupils. Your sanity fractures, yet a grim immunity coats your mind.',
        effects: { sanity: -14, resonance: +22, taboo: +1 },
        flagsAdd: ['ThấuThịWARP']
      },
      {
        labelVi: 'Nhanh chóng quay lưng lại, bịt tai và hát lớn một bài đồng dao Backstreets để xua đi tiếng rên',
        labelEn: 'Spin around, cover your ears, and sing a loud street nursery rhyme to drown out moans',
        resultVi: 'Bạn giữ vững được tâm trí non nớt của mình trước khi vực thẳm kịp nuốt chửng nó. Cha bạn vội vã chạy đến ôm bạn vào lòng kéo đi.',
        resultEn: 'You shield your young soul before the abyss can swallow it. Your father rushes over and hauls you away in trembling arms.',
        effects: { sanity: +8, health: +4 },
        flagsAdd: ['BịtTaiLàmNgơ']
      },
      {
        labelVi: 'Lén nhặt lấy chiếc đồng hồ vàng của hành khách vương vãi trên sàn ga trước cửa toa',
        labelEn: 'Snatch an antique passenger wristwatch dropped on the platform grating',
        resultVi: 'Chiếc đồng hồ cổ đắt giá của một quý tộc Nest được bạn giấu kỹ trong ống quần. Khi bán lại cho tiệm cầm đồ, bạn có đủ tiền nuôi sống cả nhà nhiều tháng.',
        resultEn: 'An opulent timepiece dropped by Nest royalty stays safely in your sock. Pawning it feeds your household for months.',
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
