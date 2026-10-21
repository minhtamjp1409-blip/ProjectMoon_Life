/**
 * Project Moon - Fixer Career Progression & Promotion Quests
 * Strictly enforces canonical Fixer Grade milestones from Grade 9 to Color Fixer.
 * Written in rich, immersive Vietnamese and English Project Moon canon lore.
 */

export const FIXER_PATH_EVENTS = [
  // =========================================================================
  // GRADE 9 -> GRADE 8 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g8_exam',
    age: [18, 55],
    major: true,
    weight: 90,
    requires: [],
    need: { jobs: ['Fixer'], grade: [9, 9] },
    forbids: ['Distorted', 'promo_g8_done'],
    vi: '[Khảo thí Hana Section 6] Giấy triệu tập của Hana Association đóng dấu sáp đỏ gửi tới hòm thư của bạn. Bạn đã tích lũy đủ chiến tích ban đầu ở Backstreets. Hôm nay là ngày bạn bước vào sàn đấu ngầm của Section 6 để chứng minh mình không còn là một con chuột cống Grade 9.',
    en: '[Hana Section 6 Evaluation] A wax-sealed summons arrives from Hana Association. You have accumulated enough Backstreet merit. Today you enter the Section 6 proving arena to prove you are no longer a bottom-tier Grade 9 rat.',
    choices: [
      {
        labelVi: 'Vung vũ khí hạ gục đối thủ sát hạch trong 3 chiêu',
        labelEn: 'Strike down the examiner within three paces',
        resultVi: 'Thanh kiếm chém rách khiên phòng hộ của giám khảo. Người thanh tra Hana Section 6 gật đầu lạnh lùng, thu lại tấm thẻ cũ và đóng dấu vàng: "Chúc mừng, Fixer Grade 8."',
        resultEn: 'Your weapon shattered the examiner’s kinetic ward. The Hana proctor gave a cold nod, retrieving your old card and stamping gold: "Congratulations, Grade 8 Fixer."',
        setFixerGrade: 8,
        flagsAdd: ['promo_g8_done'],
        meritAdd: 12,
        effects: { rep: +10, sanity: +5, wealth: +15 }
      },
      {
        labelVi: 'Thể hiện tư duy điều tra và đọc hiểu quy tắc Backstreets',
        labelEn: 'Demonstrate tactical deduction and Backstreet rule mastery',
        resultVi: 'Bạn vạch trần sơ hở trong vụ án mẫu của Hana trước sự ngạc nhiên của viên giám thị. Bạn nhận giấy phép Grade 8 danh giá cùng lời mời hợp tác từ phân hội Seven.',
        resultEn: 'You exposed flaws in Hana’s mock dossier, impressing the proctor. You receive your Grade 8 license and a commendation from Seven Association.',
        setFixerGrade: 8,
        flagsAdd: ['promo_g8_done'],
        meritAdd: 14,
        effects: { rep: +12, network: +10, sanity: +8 }
      },
      {
        labelVi: 'Chưa vội sát hạch, dành thêm một mùa tích lũy thể lực và trang bị',
        labelEn: 'Defer evaluation: Take another season to prepare gear and stamina',
        resultVi: 'Bạn gửi đơn xin hoãn khảo thí lên Hana Section 6 để luyện tập thêm. Viên thanh tra ghi nhận đơn; bạn dành trọn mùa này tĩnh dưỡng (+16 HP, +12 SP).',
        resultEn: 'You filed a formal deferral with Hana Section 6 to train further. The proctor accepted; you spent the season recovering (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 8 -> GRADE 7 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g7_exam',
    age: [19, 60],
    major: true,
    weight: 85,
    need: { jobs: ['Fixer'], grade: [8, 8] },
    forbids: ['Distorted', 'promo_g7_done'],
    vi: '[Thẩm định Văn phòng Grade 7] Lượng hợp đồng xử lý tăng vọt, Hana Association yêu cầu bạn tham gia chiến dịch trấn áp một ổ cướp đường có trang bị vũ khí lậu. Đây là bước kiểm tra thực tế để bước lên Fixer Grade 7 chính thức.',
    en: '[Grade 7 Office Certification] Contract volumes surge. Hana assigns you to lead a live suppression raid against armed smugglers to verify your Grade 7 eligibility.',
    choices: [
      {
        labelVi: 'Xông thẳng vào cửa chính, một mình triệt hạ đầu sỏ',
        labelEn: 'Breach the front gate and decapitate the ringleader',
        resultVi: 'Khói súng và máu tanh Backstreets nhuộm đỏ lưỡi đao. Khi tiếp viện Zwei đến nơi, bạn đã thu gom xong chiến lợi phẩm. Tấm thẻ Grade 7 chính thức thuộc về bạn.',
        resultEn: 'Gunsmoke and arterial spray stained your blade. When Zwei backup arrived, you had already secured the contraband. The Grade 7 license is officially yours.',
        setFixerGrade: 7,
        flagsAdd: ['promo_g7_done'],
        meritAdd: 18,
        effects: { health: -8, rep: +15, wealth: +30 }
      },
      {
        labelVi: 'Phối hợp nhịp nhàng với Fixer đồng minh bao vây',
        labelEn: 'Coordinate perimeter encirclement with allied Fixers',
        resultVi: 'Không một tên tội phạm nào thoát khỏi lưới vây. Các Văn phòng lân cận bắt đầu nhớ tên bạn như một chỉ huy đáng tin cậy. Bạn được phong Fixer Grade 7.',
        resultEn: 'Not a single fugitive breached the perimeter. Neighboring Offices recognize your name as a dependable coordinator. You are promoted to Grade 7.',
        setFixerGrade: 7,
        flagsAdd: ['promo_g7_done'],
        meritAdd: 20,
        effects: { network: +16, rep: +12, sanity: +10 }
      },
      {
        labelVi: 'Hoãn nhận chiến dịch nguy hiểm, tập trung dưỡng thương và chuẩn bị',
        labelEn: 'Defer dangerous raid: Focus on healing wounds and preparation',
        resultVi: 'Bạn xin phép Hana lùi thời hạn nhận chiến dịch trấn áp để dưỡng thương. Bạn dành thời gian nghỉ ngơi tĩnh dưỡng (+16 HP, +12 SP).',
        resultEn: 'You requested Hana defer the raid window to heal wounds. You spent the season resting (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 7 -> GRADE 6 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g6_exam',
    age: [20, 65],
    major: true,
    weight: 80,
    need: { jobs: ['Fixer'], grade: [7, 7] },
    forbids: ['Distorted', 'promo_g6_done'],
    vi: '[Bổ nhiệm Thực chiến Grade 6] Một hiểm họa cấp Urban Legend bùng phát tại ranh giới quận: Băng đảng Stray Dogs và tàn dư Kurokumo đụng độ đẫm máu. Hana giao cho bạn quyền chỉ huy biệt đội trấn áp.',
    en: '[Grade 6 Field Commission] An Urban Legend outbreak erupts: Stray Dogs clash violently with rogue Kurokumo ronin. Hana commissions you to command a suppression taskforce.',
    choices: [
      {
        labelVi: 'Đâm thẳng vào trung tâm chiến trường, đối đầu kiếm khách Kurokumo',
        labelEn: 'Charge the epicenter, duel the Kurokumo swordsman',
        resultVi: 'Trận đấu tay đôi rực lửa kết thúc bằng một nhát chém quyết định. Lưỡi kiếm đối phương gãy đôi. Hana Association nâng bậc hồ sơ của bạn lên Fixer Grade 6.',
        resultEn: 'The fierce duel concluded with a decisive strike, snapping the rival blade. Hana elevates your dossier to Grade 6 Fixer.',
        setFixerGrade: 6,
        flagsAdd: ['promo_g6_done'],
        meritAdd: 24,
        effects: { health: -10, rep: +20, wealth: +45 }
      },
      {
        labelVi: 'Khai thác địa hình hiểm trở, dẫn dụ kẻ địch vào bẫy kinetic',
        labelEn: 'Use hazardous alley terrain, lure them into kinetic traps',
        resultVi: 'Bẫy nổ kích hoạt xé tan đội hình địch. Bạn hoàn thành nhiệm vụ với thương vong tối thiểu. Huy hiệu Fixer Grade 6 lấp lánh trên ngực áo bạn.',
        resultEn: 'Kinetic charges detonated, shattering their ranks. You completed the contract with minimal casualties. The Grade 6 emblem glints on your coat.',
        setFixerGrade: 6,
        flagsAdd: ['promo_g6_done'],
        meritAdd: 26,
        effects: { rep: +18, network: +18, wealth: +40 }
      },
      {
        labelVi: 'Hoãn tham gia vùng chiến sự, tập trung nghỉ ngơi hồi phục thể lực',
        labelEn: 'Defer frontline deployment: Focus on physical rest and recuperation',
        resultVi: 'Nhận thấy chiến trường hai phe quá hỗn loạn, bạn gửi thông báo lùi thời hạn tham chiến để củng cố thể trạng (+16 HP, +12 SP).',
        resultEn: 'Deeming the turf war too chaotic, you notified Hana of a tactical postponement to recover (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 6 -> GRADE 5 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g5_exam',
    age: [21, 68],
    major: true,
    weight: 75,
    need: { jobs: ['Fixer'], grade: [6, 6] },
    forbids: ['Distorted', 'promo_g5_done'],
    vi: '[Đại hội Thăng cấp Trung cấp Grade 5] Bước vào ngưỡng Grade 5 là bước qua lằn ranh sinh tử giữa lính mới và cựu binh. Bạn được phái đi giải quyết một vụ án Sweeper săn mồi ngoài khung giờ 3:13 AM — một vi phạm Taboo nghiêm trọng.',
    en: '[Grade 5 Veteran Examination] Crossing into Grade 5 divides rookies from veterans. Hana dispatches you to neutralize rogue Sweepers hunting outside 3:13 AM hours — a severe Taboo violation.',
    choices: [
      {
        labelVi: 'Kích hoạt vũ khí Workshop công suất tối đa thiêu rụi bầy Sweeper',
        labelEn: 'Overdrive Workshop weapons to incinerate the rogue Sweepers',
        resultVi: 'Dịch lỏng màu trà tanh tưởi bốc hơi dưới ngọn lửa rực cháy. Bạn đem bình mẫu về nộp cho Hana. Viên chỉ huy đóng dấu đỏ: "Fixer Grade 5. Kể từ nay, bạn được phép mở Văn phòng riêng."',
        resultEn: 'Vile tea-colored fluid evaporated under intense flames. You delivered the core samples to Hana. The officer stamped: "Grade 5 Fixer. You may now found an Office."',
        setFixerGrade: 5,
        flagsAdd: ['promo_g5_done', 'OfficeEligible'],
        meritAdd: 30,
        effects: { health: -9, rep: +25, wealth: +60 }
      },
      {
        labelVi: 'Dàn trận phối hợp cùng Fixer đồng minh và đặt bẫy kinetic',
        labelEn: 'Coordinate a defensive perimeter with allied Fixers and deploy kinetic snares',
        resultVi: 'Bẫy nổ kích hoạt xé tan đội hình Sweeper, hạn chế tối đa thương vong. Bạn giao nộp mẫu mô an toàn. Hana Association cấp phép mở Văn phòng riêng cho Fixer Grade 5.',
        resultEn: 'Kinetic snares detonated, scattering the Sweeper pack with controlled damage. You submitted clean samples. Hana certifies your Grade 5 license and Office rights.',
        setFixerGrade: 5,
        flagsAdd: ['promo_g5_done', 'OfficeEligible'],
        meritAdd: 28,
        effects: { health: -5, sanity: -2, rep: +20, wealth: +45, network: +10 }
      },
      {
        labelVi: 'Chưa nhận nhiệm vụ Sweeper, tạm thời nghỉ ngơi hồi phục thể trạng',
        labelEn: 'Postpone Sweeper assignment: Temporarily rest and restore physical condition',
        resultVi: 'Bạn xin hoãn lệnh triệu tập săn Sweeper để dưỡng thương. Ban quản lý Hana chấp thuận lưu hồ sơ của bạn cho đợt khảo thí sau (+16 HP, +12 SP).',
        resultEn: 'You deferred the Sweeper hunt summons to heal. Hana proctors archived your eligibility for the next cycle (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 5 -> GRADE 4 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g4_exam',
    age: [22, 70],
    major: true,
    weight: 70,
    need: { jobs: ['Fixer'], grade: [5, 5] },
    forbids: ['Distorted', 'promo_g4_done'],
    vi: '[Phó Chỉ Huy Section Grade 4] Một hiệp ước ngầm giữa hai Syndicate ngón tay bị xé bỏ, hiểm họa cấp Urban Plague đe dọa cả một khu phố Backstreets. Phân hội Shi và Liu cần một Fixer Grade 4 đủ gan lì để làm mũi nhọn đột kích.',
    en: '[Section 4 Officer Advancement] A truce between Fingers collapses, plunging the district into an Urban Plague crisis. Shi and Liu Associations recruit an ironclad Grade 4 spearhead.',
    choices: [
      {
        labelVi: 'Dẫn đầu mũi đột kích đâm xuyên phòng tuyến đối phương',
        labelEn: 'Lead the vanguard piercing their fortified perimeter',
        resultVi: 'Bạn chém gục Capo chỉ huy và thu giữ toàn bộ chứng từ cấm. Hiệp hội Liu trao cho bạn huy hiệu Fixer Grade 4 cùng một khoản tiền thưởng kếch xù.',
        resultEn: 'You felled the enemy Capo and seized their forbidden records. Liu Association awards you the Grade 4 license and a hefty bounty.',
        setFixerGrade: 4,
        flagsAdd: ['promo_g4_done'],
        meritAdd: 36,
        effects: { health: -10, rep: +32, wealth: +85 }
      },
      {
        labelVi: 'Khai thác tài liệu tình báo của Seven Association để đón lõng điểm hẹn',
        labelEn: 'Use Seven Association intelligence dossiers to ambush their clandestine rendezvous',
        resultVi: 'Đòn mai phục chính xác tóm gọn toán đầu não trước khi chúng kịp phản kháng. Phân hội Shi và Liu trao bạn huy hiệu Fixer Grade 4 kèm lời khen ngợi tác chiến xuất sắc.',
        resultEn: 'A surgical ambush neutralized their commanders before blades were drawn. Shi and Liu Associations award you the Grade 4 crest for exemplary tactical prowess.',
        setFixerGrade: 4,
        flagsAdd: ['promo_g4_done'],
        meritAdd: 34,
        effects: { health: -5, rep: +26, wealth: +65, network: +14 }
      },
      {
        labelVi: 'Từ chối làm mũi nhọn đột kích lúc này, dành thời gian điều dưỡng',
        labelEn: 'Decline spearheading right now: Dedicate season to medical recuperation',
        resultVi: 'Bạn thông báo cho phân hội Shi và Liu rằng bản thân cần thêm thời gian tĩnh dưỡng vết thương trước khi chỉ huy đột kích (+16 HP, +12 SP).',
        resultEn: 'You notified Shi and Liu Associations that physical recovery takes priority before leading assaults (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 4 -> GRADE 3 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g3_exam',
    age: [24, 72],
    major: true,
    weight: 65,
    need: { jobs: ['Fixer'], grade: [4, 4] },
    forbids: ['Distorted', 'promo_g3_done'],
    vi: '[Thẩm định Cấp cao Grade 3] Chỉ 3% Fixer toàn The City chạm tới Grade 3. Hana Association gửi bạn tới vùng biên giới cấm để trấn áp một dị thể Urban Nightmare đang biến đổi không gian.',
    en: '[Senior Specialist Commission Grade 3] Only 3% of all Fixers reach Grade 3. Hana dispatches you to an exclusion zone to suppress an Urban Nightmare aberration distorting space.',
    choices: [
      {
        labelVi: 'Giữ vững tâm trí, chém đứt lõi không gian của dị thể',
        labelEn: 'Anchor your sanity and cleave the aberration’s dimensional core',
        resultVi: 'Không gian rách nát liền lại. Tiếng rên rỉ quái đản tan biến. Bạn mang mảnh lõi về giao nộp. Hội đồng Hana chính thức công nhận: Fixer Grade 3.',
        resultEn: 'Warped space snapped back together. The monstrous keening silenced. You returned with the core: officially recognized as a Grade 3 Fixer.',
        setFixerGrade: 3,
        flagsAdd: ['promo_g3_done'],
        meritAdd: 45,
        effects: { health: -12, sanity: -6, rep: +40, wealth: +120, resonance: +15 }
      },
      {
        labelVi: 'Sử dụng neo không gian và khiên phân giải của Workshop để cô lập dị thể',
        labelEn: 'Deploy Workshop dimensional anchors and dispersion barriers to isolate the anomaly',
        resultVi: 'Trận pháp công nghệ Workshop giữ chặt lõi không gian trước khi bạn tung nhát chém kết liễu. Hội đồng Hana chính thức phê duyệt danh xưng Fixer Grade 3.',
        resultEn: 'Workshop barrier wards locked the spatial anomaly in stasis before you delivered the severing blow. Hana Council ratifies your Grade 3 ascension.',
        setFixerGrade: 3,
        flagsAdd: ['promo_g3_done'],
        meritAdd: 42,
        costAhn: 25,
        effects: { health: -6, sanity: -3, rep: +35, wealth: +80, network: +12 }
      },
      {
        labelVi: 'Chưa tiến vào vùng cấm không gian, ưu tiên bảo toàn tính mạng và hồi phục',
        labelEn: 'Hold off entering the exclusion zone: Prioritize life preservation and recovery',
        resultVi: 'Bạn xin phép Hana dời ngày thâm nhập dị thể không gian để củng cố tâm trí và thể chất. Bạn dành thời gian nghỉ ngơi (+16 HP, +12 SP).',
        resultEn: 'You requested Hana postpone spatial anomaly infiltration to consolidate mind and body (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 3 -> GRADE 2 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g2_exam',
    age: [26, 75],
    major: true,
    weight: 60,
    need: { jobs: ['Fixer'], grade: [3, 3] },
    forbids: ['Distorted', 'promo_g2_done'],
    vi: '[Át Chủ Bài Section 1 Grade 2] Một bức thư mạ bạc từ Section 1 của Hiệp hội Hana. Một nhiệm vụ sinh tử: Bảo vệ một giám đốc điều hành của Wing trước cuộc thanh trừng từ các sát thủ Section 1 của Shi Association.',
    en: '[Section 1 Ace Grade 2] A silver-inscribed missive from Hana Section 1. A life-or-death mission: Escort a Wing executive targeted for execution by Shi Section 1 death squads.',
    choices: [
      {
        labelVi: 'Chặn đứng toàn bộ sát thủ trong đêm mưa máu',
        labelEn: 'Hold the bridge against every assassin in the pouring rain',
        resultVi: 'Lưỡi kiếm của bạn va chạm tóe lửa suốt 6 giờ liền. Đến bình minh, người điều hành vẫn sống sót nguyên vẹn. Hana Association trao tặng huy chương Grade 2 danh giá.',
        resultEn: 'Your blade sparked against death for six relentless hours. At dawn, the executive breathed unharmed. Hana bestows the prestigious Grade 2 cross.',
        setFixerGrade: 2,
        flagsAdd: ['promo_g2_done'],
        meritAdd: 55,
        effects: { health: -12, sanity: -6, rep: +50, wealth: +180, resonance: +20 }
      },
      {
        labelVi: 'Phối hợp cùng hộ vệ Zwei Association lập phòng tuyến kiên cố',
        labelEn: 'Form a resilient defensive phalanx with Zwei Association bodyguards',
        resultVi: 'Khiên chắn Zwei chặn đứng làn mưa ám khí, tạo điều kiện cho bạn phản công hạ gục các sát thủ then chốt. Viên giám đốc Wing bình an vô sự. Bạn nhận huy chương Grade 2.',
        resultEn: 'Zwei kinetic shields deflected the assassination salvo, allowing you to counter and neutralize key strikers. The executive survived unharmed. You gain the Grade 2 cross.',
        setFixerGrade: 2,
        flagsAdd: ['promo_g2_done'],
        meritAdd: 50,
        effects: { health: -7, sanity: -4, rep: +42, wealth: +130, network: +18 }
      },
      {
        labelVi: 'Lùi hạn nhận hợp đồng hộ tống sinh tử, tập trung tĩnh dưỡng',
        labelEn: 'Defer life-or-death escort contract: Focus on resting and recuperating',
        resultVi: 'Bạn gửi thư thoái thác nhiệm vụ hộ tống giám đốc vì lý do chấn thương chưa lành. Section 1 ghi nhận và cho phép bạn bảo lưu tư cách (+16 HP, +12 SP).',
        resultEn: 'You sent word declining the escort due to unhealed trauma. Section 1 noted the medical deferral (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 2 -> GRADE 1 PROMOTION (THE SUMMIT)
  // =========================================================================
  {
    id: 'fixer_promo_g1_exam',
    age: [28, 80],
    major: true,
    weight: 55,
    need: { jobs: ['Fixer'], grade: [2, 2] },
    forbids: ['Distorted', 'promo_g1_done'],
    vi: '[Đại Khảo Hạch Fixer Grade 1] Đỉnh cao của giới Fixer. Bạn được triệu tập vào Hội đồng Trung ương Hana tại District 1. Trước mặt bạn là bản án Star of the City: Một đại tổ chức Syndicate hoặc phòng thí nghiệm Singularities bị sụp đổ cần bị tiêu diệt hoàn toàn.',
    en: '[Hana Supreme Grade 1 Evaluation] The summit of Fixer hierarchy. Summoned to District 1 before Hana’s Grand Council. Your assignment is a Star of the City verdict: Total annihilation of a rogue syndicate syndicate or collapsed Singularity facility.',
    choices: [
      {
        labelVi: 'Một mình dẫn quân công phá hang ổ Star of the City',
        labelEn: 'Lead the vanguard and shatter the Star of the City stronghold',
        resultVi: 'Trận chiến kinh thiên động địa làm rung chuyển cả một khu vực. Khi tro tàn lắng xuống, bạn đứng vững giữa đống đổ nát. Hội đồng Hana đồng loạt đứng dậy bái phục: "Chúc mừng, Fixer Grade 1 của The City."',
        resultEn: 'A cataclysmic clash that rattled the entire district. When the ash settled, you stood victorious amidst the ruin. The Hana Council rose in solemn reverence: "Congratulations, Grade 1 Fixer of The City."',
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 70,
        effects: { health: -14, sanity: -8, rep: +65, wealth: +280, resonance: +25 }
      },
      {
        labelVi: 'Hiệu triệu liên minh các Văn phòng uy tín mở chiến dịch vây quét tổng lực',
        labelEn: 'Summon an allied coalition of elite Offices to conduct a coordinated grand raid',
        resultVi: 'Chiến dịch hiệp đồng quy mô lớn san phẳng hang ổ hiểm họa mà vẫn bảo toàn mạng sống các chỉ huy. Hội đồng Tối cao Hana đứng dậy cúi đầu: "Chúc mừng, Fixer Grade 1."',
        resultEn: 'A magnificent combined assault leveled the catastrophic stronghold while keeping command casualties low. Hana Grand Council stands in reverence: "Welcome, Grade 1 Fixer."',
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 65,
        effects: { health: -8, sanity: -5, rep: +55, wealth: +190, network: +25 }
      },
      {
        labelVi: 'Bảo lưu quyền khảo thí Star of the City, dành một mùa hồi phục phong độ đỉnh cao',
        labelEn: 'Preserve Star of the City trial rights: Spend a season regaining peak form',
        resultVi: 'Hội đồng Trung ương Hana đồng ý cho bạn dời ngày viễn chinh để đạt trạng thái thể lực sung mãn nhất (+16 HP, +12 SP).',
        resultEn: 'Hana Grand Council agreed to reschedule the expedition so you may achieve peak physical prowess (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 1 -> COLOR FIXER SUPREME INVESTITURE (THE LEGEND)
  // =========================================================================
  {
    id: 'hana_color_ascension_trial',
    age: [30, 90],
    major: true,
    weight: 120,
    need: { jobs: ['Fixer'], grade: [1, 1] },
    forbids: ['ColorFixer', 'Distorted'],
    vi: '[Đại Khảo Thí Phong Color · Hana Supreme] Chuông vàng của Hiệp hội Hana ngân vang trên toàn bộ 26 District. Đã nhiều thập kỷ trôi qua kể từ khi một cá nhân chạm tới danh xưng huyền thoại sánh ngang Red Mist, Black Silence hay Vermilion Cross. Bạn bước lên bục phong danh trước mặt 12 Viện trưởng Hiệp hội.',
    en: '[The Color Fixer Investiture · Hana Supreme] Golden chimes of Hana Association resound across all 26 Districts. Decades have passed since an operative achieved legendary stature alongside the Red Mist, Black Silence, and Vermilion Cross. You ascend the dais before the 12 Association Directors.',
    choices: [
      {
        labelVi: 'Khắc danh hiệu Color của riêng bạn vào bia đá vĩnh hằng',
        labelEn: 'Engrave your own Color title upon the eternal monument',
        resultVi: 'Cả khán phòng nín thở. Ánh sáng vàng kim bùng phát rực rỡ quanh lưỡi đao và linh hồn bạn. Kể từ hôm nay, The City gọi bạn bằng Danh hiệu Color.',
        resultEn: 'The grand hall held its breath. Incandescent golden brilliance erupted around your soul and steel. From this day forth, The City shall revere you as a Color Fixer.',
        setFixerGrade: 0,
        flagsAdd: ['ColorFixer', 'EGOAwakened'],
        meritAdd: 100,
        effects: { rep: +100, wealth: +500, resonance: +50 }
      }
    ]
  },

  // =========================================================================
  // FIXER INTERMEDIATE INVESTIGATIVE & CRISIS ARCS (GRADE 9 TO 1)
  // =========================================================================
  {
    id: 'fixer_g8_rookie_investigation',
    age: [18, 56],
    major: true,
    weight: 65,
    need: { jobs: ['Fixer'], grade: [8, 8] },
    forbids: ['Distorted', 'fixer_g8_investigation_done'],
    vi: '[Vụ án Mất tích Khu phố Grade 8] Một dãy nhà trọ ở Backstreets bỗng nhiên trống rỗng sau một đêm mưa. Không có vết máu, nhưng trên cửa sổ dán những dải ruy băng màu xanh lam kỳ lạ. Người quản lý khu phố thuê bạn vào điều tra bên trong.',
    en: '[Tenement Vanishing Case · Grade 8] An entire Backstreet rowhouse sat vacant overnight after rain. No gore, but strange indigo ribbons fluttered on the sills. The landlord hires you to inspect the silent corridors.',
    choices: [
      {
        labelVi: 'Dùng kinh nghiệm lần theo dấu vết bột huỳnh quang',
        labelEn: 'Track luminescent powder trails across floorboards',
        resultVi: 'Bạn phát hiện đường hầm bí mật dẫn xuống một phòng thí nghiệm cấy ghép lậu của một Workshop vô danh. Bạn giải cứu được 4 người còn sống và giao bằng chứng cho Seven Association. Tên tuổi bạn được ngợi khen.',
        resultEn: 'You uncovered a hidden bulkhead leading to an illicit Workshop grafting den. Rescuing four living captives, you passed the files to Seven Association, earning acclaim.',
        meritAdd: 16,
        effects: { rep: +14, network: +12, wealth: +25 },
        flagsAdd: ['fixer_g8_investigation_done']
      },
      {
        labelVi: 'Cảnh giác báo cáo ngay cho Zwei Association trước khi vào',
        labelEn: 'Report the anomaly immediately to Zwei prior to breach',
        resultVi: 'Biệt đội Zwei mang khiên hạng nặng tiến vào dọn dẹp hiện trường. Họ chia lại cho bạn một phần tiền công và khen ngợi tính cẩn trọng chuẩn mực của bạn.',
        resultEn: 'Heavy Zwei shield units sanitized the facility. They credited you with an intelligence bounty and praised your textbook vigilance.',
        meritAdd: 12,
        effects: { rep: +10, wealth: +18, sanity: +5 },
        flagsAdd: ['fixer_g8_investigation_done']
      }
    ]
  },
  {
    id: 'fixer_g7_zwei_escort_mission',
    age: [19, 60],
    major: true,
    weight: 60,
    need: { jobs: ['Fixer'], grade: [7, 7] },
    forbids: ['Distorted', 'fixer_g7_escort_done'],
    vi: '[Chiến dịch Bảo an Zwei Section 5] Đại diện Zwei Section 5 mời bạn tham gia đội cận vệ bảo vệ đoàn xe chở thuốc hồi sinh của K Corp đi qua vùng tranh chấp giữa hai Syndicate. Mùi thuốc súng khét lẹt bốc lên từ hai bên hẻm.',
    en: '[Zwei Section 5 Convoy Escort] Zwei Section 5 contracts you to reinforce an armed convoy hauling K Corp regenerative ampoules through contested syndicate turf. Gunpowder stings the air.',
    choices: [
      {
        labelVi: 'Cầm khiên phòng hộ đứng ở vị trí mũi xe, hứng trọn đợt tập kích đầu tiên',
        labelEn: 'Stand vanguard with kinetic shield, taking the initial volley',
        resultVi: 'Đạn bắn xối xả vào khiên của bạn tóe lửa. Bạn đứng vững như bàn thạch cho đến khi pháo Zwei phản kích quét sạch kẻ phục kích. Bạn được Zwei tặng một huy hiệu danh dự.',
        resultEn: 'Rounds sparked furiously against your ward. Unshaken, you anchored the line until Zwei artillery neutralized the attackers. Zwei awarded you an honorary cross.',
        meritAdd: 20,
        effects: { health: -18, rep: +18, wealth: +35 },
        flagsAdd: ['fixer_g7_escort_done', 'ZweiCommendation']
      },
      {
        labelVi: 'Dẫn đội thọc sườn đánh úp sào huyệt bắn tỉa của địch',
        labelEn: 'Flank and eliminate enemy sniper perches above the alley',
        resultVi: 'Bạn leo lên mái nhà bằng móc sắt, tiêu diệt gọn ba tay súng bắn tỉa của Syndicate. Đoàn xe đi qua an toàn tuyệt đối.',
        resultEn: 'Grappling to the rooftops, you eliminated three syndicate marksmen in close combat. The convoy rolled through without a scratch.',
        meritAdd: 22,
        effects: { rep: +16, network: +14, wealth: +40 },
        flagsAdd: ['fixer_g7_escort_done']
      }
    ]
  },
  {
    id: 'fixer_g6_blackstreet_hostage_crisis',
    age: [20, 65],
    major: true,
    weight: 60,
    need: { jobs: ['Fixer'], grade: [6, 6] },
    forbids: ['Distorted', 'fixer_g6_hostage_done'],
    vi: '[Bắt cóc Con tin tại Nhà băng J Corp] Một nhóm lính đánh thuê dạt từ Smoke War trang bị súng tự động đã chiếm giữ chi nhánh ngân hàng cầm đồ của J Corp, bắt 20 cư dân làm bia đỡ đạn. Hana Association yêu cầu giải quyết nhanh trước giờ đóng cửa.',
    en: '[J Corp Pawn Vault Hostage Crisis] Deserters from the Smoke War armed with automatic weapons seized a J Corp pawn branch, holding twenty civilians as human shields. Hana demands resolution before close of business.',
    choices: [
      {
        labelVi: 'Đột nhập qua đường ống thông gió, vô hiệu hóa ngòi nổ chất dẻo',
        labelEn: 'Infiltrate via ventilation shafts, disarming plastic charges',
        resultVi: 'Bạn bò qua ống thông gió đầy bụi than, cắt dây ngòi nổ chỉ 3 giây trước khi phát nổ rồi đạp cửa xông vào chém gục tên đầu sỏ. Toàn bộ con tin được giải cứu.',
        resultEn: 'Crawling through soot-lined vents, you clipped the detonation wire with three seconds left, bursting into the vault to cleave the ringleader. All hostages lived.',
        meritAdd: 28,
        effects: { health: -20, rep: +24, wealth: +55, sanity: +10 },
        flagsAdd: ['fixer_g6_hostage_done']
      },
      {
        labelVi: 'Đàm phán trả một phần tiền cọc để đổi lấy tự do cho trẻ em và phụ nữ',
        labelEn: 'Negotiate partial ransom to extract women and children first',
        resultVi: 'Bạn giữ chân bọn cướp bằng sự điềm tĩnh phi thường trong khi phân đội Liu bí mật triển khai hỏa trận phía sau. Khi đòn hỏa tiễn nổ ra, thương vong được giảm thiểu tối đa.',
        resultEn: 'You held the bandits’ attention with ice-cold poise while Liu shock teams deployed behind. When the flame volley cracked, civilian losses were minimized.',
        meritAdd: 25,
        effects: { rep: +20, network: +18, wealth: +45 },
        flagsAdd: ['fixer_g6_hostage_done']
      }
    ]
  },
  {
    id: 'fixer_g4_shi_assassination_moral_crossroad',
    age: [23, 70],
    major: true,
    weight: 55,
    need: { jobs: ['Fixer'], grade: [4, 4] },
    forbids: ['Distorted', 'fixer_g4_crossroad_done'],
    vi: '[Lệnh Ám Sát Tranh Cãi của Hiệp hội Shi] Phân hội Shi trao cho bạn một cuộn giấy đỏ: Mục tiêu là một bác sĩ phòng khám từ thiện ở Backstreets, người bị một Wing tố cáo là ăn cắp công thức thuốc chống độc để phát miễn phí cho người nghèo. Phần thưởng cực lớn.',
    en: '[Controversial Shi Execution Writ] Shi Association tenders a crimson writ: The target is a philanthropic alley medic accused by a Wing of leaking antitoxin formulas to the poor. The bounty is immense.',
    choices: [
      {
        labelVi: 'Thực thi đúng bản hợp đồng lạnh lùng của The City: Chém đầu mục tiêu',
        labelEn: 'Execute the cold mandate of The City: Decapitate the target',
        resultVi: 'Lưỡi kiếm hạ xuống trong đêm tối. Bạn mang thủ cấp về nộp cho Shi và nhận trọn vẹn số tiền thưởng kếch xù cùng huy hiệu thâm niên, dù ánh mắt tuyệt vọng của vị bác sĩ sẽ mãi ám ảnh bạn.',
        resultEn: 'Steel cleaved the dark. You delivered the head to Shi, pocketing the fortune and senior credentials, though the medic’s forgiving gaze would haunt your dreams.',
        meritAdd: 35,
        effects: { sanity: -22, rep: +30, wealth: +120 },
        flagsAdd: ['fixer_g4_crossroad_done'],
        scarsAdd: ['Ánh mắt vị bác sĩ đêm mưa']
      },
      {
        labelVi: 'Cảnh báo cho bác sĩ trốn sang Outskirts, ngụy tạo một cái xác giả giao nộp',
        labelEn: 'Warn the medic to flee to the Outskirts, faking a corpse for Shi',
        resultVi: 'Bạn dùng thi thể của một tên cướp chết trôi làm giả hiện trường và đưa vị bác sĩ vượt tường an toàn. Shi chấp nhận hồ sơ, còn lòng bạn giữ lại được một chút ánh sáng nhân tính hiếm hoi.',
        resultEn: 'Using a drowned bandit’s corpse, you staged the kill and guided the doctor beyond the walls. Shi closed the file; you preserved a fragile ember of humanity.',
        meritAdd: 30,
        effects: { sanity: +15, resonance: +18, network: +20, wealth: +40 },
        flagsAdd: ['fixer_g4_crossroad_done', 'MedicSavior']
      }
    ]
  },
  {
    id: 'fixer_g2_wing_conspiracy',
    age: [26, 75],
    major: true,
    weight: 50,
    need: { jobs: ['Fixer'], grade: [2, 2] },
    forbids: ['Distorted', 'fixer_g2_conspiracy_done'],
    vi: '[Mưu đồ Tối Mật của Wing Cấp Cao · Grade 2] Một giám đốc cấp cao của T Corp thuê bạn điều tra vụ rò rỉ công nghệ lưu trữ thời gian. Manh mối dẫn thẳng tới một văn phòng thanh trừng bí mật của chính Wing đó: Họ dự định hiến tế cả một khu phố Backstreets để sạc đầy cỗ máy thời gian.',
    en: '[Classified Wing Conspiracy · Grade 2] A senior T Corp executive hires you to probe temporal energy leaks. Clues lead directly to an internal Wing black-ops unit: They plan to harvest an entire Backstreet ward to recharge chronotanks.',
    choices: [
      {
        labelVi: 'Tung toàn bộ bằng chứng mật lên mạng thông tin của Seven Association',
        labelEn: 'Leak the classified archive onto Seven Association’s global network',
        resultVi: 'Cơn bão truyền thông làm rung chuyển The City. The Head buộc phải vào cuộc cảnh cáo T Corp, chiến dịch hiến tế bị hủy bỏ. Bạn trở thành anh hùng ngầm của giới Fixer, dù các sát thủ T Corp sẽ không bao giờ tha cho bạn.',
        resultEn: 'The disclosure rattled the City. The Head issued a formal censure, aborting the harvest. You became an underground legend, marked by T Corp assassins for life.',
        meritAdd: 50,
        effects: { rep: +60, network: +40, heat: +35, resonance: +25 },
        flagsAdd: ['fixer_g2_conspiracy_done', 'WhistleblowerHero']
      },
      {
        labelVi: 'Chấp nhận nhận một thỏi vàng thời gian của T Corp để chôn vùi hồ sơ',
        labelEn: 'Accept a dense temporal bullion bar from T Corp to burn the records',
        resultVi: 'Bạn châm lửa đốt tập tài liệu trước mặt viên giám đốc. Đổi lại, tài khoản của bạn nhận một số Ahn khổng lồ và quyền tiếp cận phòng thí nghiệm thời gian cao cấp của T Corp.',
        resultEn: 'You burned the dossier before the executive. In exchange, an astronomical sum of Ahn and classified T Corp chronotank privileges were wired to your name.',
        meritAdd: 40,
        effects: { sanity: -18, wealth: +250, rep: +35 },
        flagsAdd: ['fixer_g2_conspiracy_done']
      }
    ]
  },

  // =========================================================================
  // DIVERSIFIED ALTERNATIVE PROMOTION PATHS (GRADES 8 TO 1)
  // Randomized trials across Seven, Zwei, Shi, Tres, Cinq, Oufi, Dieci, Devzat,
  // R Corp, W Corp, and Hana Sections ensuring every career path is unique.
  // =========================================================================

  // --- GRADE 9 -> 8 ALTERNATIVES ---
  {
    id: 'fixer_promo_g8_seven',
    age: [18, 55],
    major: true,
    weight: 90,
    need: { jobs: ['Fixer'], grade: [9, 9] },
    forbids: ['Distorted', 'promo_g8_done'],
    vi: '[Thẩm định Điều tra Seven Section 6 · Grade 8] Hiệp hội Seven chi nhánh Section 6 gửi thông báo: Một xưởng chế tác ngầm đang tuồn giấy phép Fixer giả mạo ra Backstreets. Seven cần một Fixer tân binh chưa lộ mặt thâm nhập hiện trường và thu thập chứng cứ để được cấp bằng Grade 8.',
    en: '[Seven Section 6 Investigative Trial · Grade 8] Seven Association Section 6 summons you: An illicit workshop is circulating counterfeit Fixer licenses. Seven requires an unfamiliar rookie to infiltrate the den and extract evidence for Grade 8 certification.',
    choices: [
      {
        labelVi: 'Phân tích sơ đồ dấu vân tay và sổ sách kế toán để bắt trọn ổ',
        labelEn: 'Analyze ledger fingerprints and accounting anomalies to bust the ring',
        resultVi: 'Khả năng quan sát sắc bén của bạn giúp Seven tóm gọn cả đường dây làm bằng giả mà không tốn một viên đạn. Viên điều tra viên Seven đóng dấu phê chuẩn: "Fixer Grade 8 xuất sắc."',
        resultEn: 'Your keen deduction allowed Seven to dismantle the counterfeit syndicate without a single shot fired. The proctor stamped: "Exemplary Grade 8 Fixer."',
        setFixerGrade: 8,
        flagsAdd: ['promo_g8_done'],
        meritAdd: 15,
        effects: { rep: +14, network: +12, sanity: +6, wealth: +20 }
      },
      {
        labelVi: 'Dụ kẻ cầm đầu ra giao dịch rồi đánh úp bất ngờ',
        labelEn: 'Bait the ringleader into a staged exchange, then execute an ambush',
        resultVi: 'Trận phục kích chớp nhoáng khiến toán tội phạm không kịp trở tay. Bạn bàn giao toàn bộ tang vật cho Seven và chính thức nhận bằng Fixer Grade 8.',
        resultEn: 'The lightning ambush incapacitated the criminals before they could draw steel. You surrendered the contraband to Seven, officially earning your Grade 8 license.',
        setFixerGrade: 8,
        flagsAdd: ['promo_g8_done'],
        meritAdd: 14,
        effects: { health: -6, rep: +12, wealth: +25 }
      },
      {
        labelVi: 'Chưa vội sát hạch, dành thêm một mùa tích lũy thể lực và trang bị',
        labelEn: 'Defer evaluation: Take another season to prepare gear and stamina',
        resultVi: 'Bạn xin hoãn đợt thẩm định để dưỡng thương và chuẩn bị chu đáo hơn (+16 HP, +12 SP).',
        resultEn: 'You postponed the evaluation window to heal wounds and prepare (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g8_zwei',
    age: [18, 55],
    major: true,
    weight: 90,
    need: { jobs: ['Fixer'], grade: [9, 9] },
    forbids: ['Distorted', 'promo_g8_done'],
    vi: '[Khảo sát Hộ vệ & Tuần tra Zwei Association · Grade 8] Phân hội Zwei Section 6 mở đợt sát hạch thực địa: Hộ tống một chuyến hàng lương thực viện trợ đi qua ngõ hẻm tranh chấp giữa các băng đảng Backstreets.',
    en: '[Zwei Section 6 Patrol Escort Trial · Grade 8] Zwei Section 6 opens a field commission: Escort a civilian food convoy traversing violent Backstreet alleyways contested by street gangs.',
    choices: [
      {
        labelVi: 'Dựng khiên phòng ngự kiên cố, bảo vệ an toàn tuyệt đối cho đoàn hàng',
        labelEn: 'Deploy defensive bulwark, guaranteeing zero convoy casualties',
        resultVi: 'Dưới sự che chắn vững chắc của bạn, không một thùng hàng nào bị cướp phá. Chỉ huy Zwei vỗ vai khen ngợi và ký giấy đề bạt bạn lên Fixer Grade 8.',
        resultEn: 'Under your steadfast guard, not a single crate was compromised. The Zwei captain commended your resolve, certifying your Grade 8 status.',
        setFixerGrade: 8,
        flagsAdd: ['promo_g8_done'],
        meritAdd: 16,
        effects: { health: -7, rep: +15, network: +10, wealth: +18 }
      },
      {
        labelVi: 'Chủ động dẫn đường qua ngõ tắt hẻo lánh né tránh điểm mai phục',
        labelEn: 'Scout obscure bypass alleys to outmaneuver syndicate choke-points',
        resultVi: 'Đoàn xe vượt qua khu phố nguy hiểm êm thấm mà không phải nổ súng. Bạn nhận thù lao đầy đủ cùng giấy phép Fixer Grade 8.',
        resultEn: 'The convoy traversed the warzone cleanly without a single clash. You earned full wages and your Grade 8 Fixer license.',
        setFixerGrade: 8,
        flagsAdd: ['promo_g8_done'],
        meritAdd: 13,
        effects: { rep: +10, network: +14, sanity: +8, wealth: +22 }
      },
      {
        labelVi: 'Chưa vội sát hạch, dành thêm một mùa tích lũy thể lực và trang bị',
        labelEn: 'Defer evaluation: Take another season to prepare gear and stamina',
        resultVi: 'Bạn xin hoãn đợt khảo sát để nghỉ ngơi dưỡng sức (+16 HP, +12 SP).',
        resultEn: 'You deferred the patrol trial to rest and recuperate (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 8 -> 7 ALTERNATIVES ---
  {
    id: 'fixer_promo_g7_shi',
    age: [19, 60],
    major: true,
    weight: 85,
    need: { jobs: ['Fixer'], grade: [8, 8] },
    forbids: ['Distorted', 'promo_g7_done'],
    vi: '[Nhiệm vụ Đột kích Ám sát Shi Association · Grade 7] Một cuộn giấy da đỏ của Shi Section 5 gửi tới: Một thủ lĩnh cướp bóc vũ trang đang trốn trong pháo đài thép ở Backstreets. Shi cần một Fixer Grade 8 đủ bản lĩnh để đột kích ban đêm và trừ khử mục tiêu.',
    en: '[Shi Section 5 Night Infiltration Raid · Grade 7] A crimson parchment arrives from Shi Section 5: An armed warlord is entrenched in a reinforced bunker. Shi contracts a Grade 8 operative to conduct a nocturnal assassination.',
    choices: [
      {
        labelVi: 'Ẩn mình trong cơn mưa đêm, tung nhát chém chí mạng từ bóng tối',
        labelEn: 'Melt into the torrential rain, striking the lethal blow from the dark',
        resultVi: 'Lưỡi đao vung lên không một tiếng động giữa tiếng sấm rền. Kẻ cầm đầu gục ngã. Hiệp hội Shi công nhận chiến tích và trao cho bạn huy hiệu Fixer Grade 7.',
        resultEn: 'Steel flashed silently beneath rolling thunder. The warlord fell. Shi Association ratified your contract and promoted you to Grade 7.',
        setFixerGrade: 7,
        flagsAdd: ['promo_g7_done'],
        meritAdd: 20,
        effects: { health: -8, rep: +16, wealth: +35 }
      },
      {
        labelVi: 'Vô hiệu hóa hệ thống phát điện của pháo đài rồi đột kích hỗn loạn',
        labelEn: 'Sabotage the fortress power grid, sowing panic before breach',
        resultVi: 'Bóng tối bao trùm khiến toán lính hoảng loạn bắn nhầm nhau. Bạn tóm gọn mục tiêu dễ dàng và được phong thăng Fixer Grade 7.',
        resultEn: 'Pitch blackness plunged the guards into chaotic friendly fire. You eliminated the target effortlessly, earning your Grade 7 crest.',
        setFixerGrade: 7,
        flagsAdd: ['promo_g7_done'],
        meritAdd: 19,
        effects: { rep: +14, network: +12, wealth: +30, sanity: +5 }
      },
      {
        labelVi: 'Hoãn nhận chiến dịch nguy hiểm, tập trung dưỡng thương và chuẩn bị',
        labelEn: 'Defer dangerous raid: Focus on healing wounds and preparation',
        resultVi: 'Bạn thông báo lùi thời hạn hợp đồng để dưỡng thương (+16 HP, +12 SP).',
        resultEn: 'You requested a deferral to heal your wounds (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g7_tres',
    age: [19, 60],
    major: true,
    weight: 85,
    need: { jobs: ['Fixer'], grade: [8, 8] },
    forbids: ['Distorted', 'promo_g7_done'],
    vi: '[Chiến dịch Thu hồi Trang bị Lậu Tres Association · Grade 7] Thanh tra Tres Association cần một Fixer Grade 8 phối hợp đột kích kho súng đạn lậu vi phạm Taboo của The Head. Phần thưởng là chứng chỉ nâng bậc Fixer Grade 7 cùng một khoản hoa hồng lớn.',
    en: '[Tres Contraband Seizure Operation · Grade 7] Tres Association inspectors require an operative to raid an arms cache violating Head caliber restrictions. Reward: Grade 7 credentials and a major commission cut.',
    choices: [
      {
        labelVi: 'Tịch thu toàn bộ kho súng và niêm phong theo quy chuẩn kiểm định Tres',
        labelEn: 'Confiscate the entire arms cache, sealing containers under Tres protocol',
        resultVi: 'Chiến dịch thu giữ hoàn tất sạch sẽ theo đúng pháp lệnh The City. Tres cấp phép cho bạn bước lên Fixer Grade 7.',
        resultEn: 'The seizure concluded impeccably under City statutes. Tres certified your elevation to Grade 7 Fixer.',
        setFixerGrade: 7,
        flagsAdd: ['promo_g7_done'],
        meritAdd: 21,
        effects: { rep: +18, wealth: +38, sanity: +6 }
      },
      {
        labelVi: 'Đấu súng tầm gần với nhóm buôn lậu ngoan cố',
        labelEn: 'Engage in close-quarters firefight against resisting arms traffickers',
        resultVi: 'Khói đạn mù mịt tan đi, toàn bộ toán buôn lậu bị trấn áp. Bạn nhận huy hiệu Grade 7 cùng lời khen ngợi tác chiến dũng cảm.',
        resultEn: 'As the smoke cleared, the smugglers lay neutralized. You received the Grade 7 crest for valorous combat conduct.',
        setFixerGrade: 7,
        flagsAdd: ['promo_g7_done'],
        meritAdd: 22,
        effects: { health: -9, rep: +16, wealth: +42 }
      },
      {
        labelVi: 'Hoãn nhận chiến dịch nguy hiểm, tập trung dưỡng thương và chuẩn bị',
        labelEn: 'Defer dangerous raid: Focus on healing wounds and preparation',
        resultVi: 'Bạn lùi lại đợt đột kích để tĩnh dưỡng (+16 HP, +12 SP).',
        resultEn: 'You deferred the raid to rest and heal (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 7 -> 6 ALTERNATIVES ---
  {
    id: 'fixer_promo_g6_cinq',
    age: [20, 65],
    major: true,
    weight: 80,
    need: { jobs: ['Fixer'], grade: [7, 7] },
    forbids: ['Distorted', 'promo_g6_done'],
    vi: '[Đại Hội Quyết Đấu Danh Dự Cinq Association · Grade 6] Phân hội Cinq tổ chức đại hội quyết đấu kiếm thuật tại District 3 để phân xử một tranh chấp hợp đồng giữa hai thương hội lớn. Fixer nào đứng vững đến vòng chung kết sẽ được phong hàm Grade 6.',
    en: '[Cinq Association Duel of Honor Trial · Grade 6] Cinq Association hosts a grand fencing tournament in District 3 to arbitrate a corporate contract breach. Operatives surviving to the finals earn Grade 6 status.',
    choices: [
      {
        labelVi: 'Thi triển bộ pháp hoa mỹ và nhát kiếm chớp nhoáng áp đảo đối thủ',
        labelEn: 'Execute dazzling footwork and lightning thrusts to dominate the duel',
        resultVi: 'Đường kiếm sắc lẹm hất tung vũ khí đối phương trong tràng pháo tay tán thưởng. Trưởng phân hội Cinq trao tặng bạn huy hiệu danh giá: Fixer Grade 6.',
        resultEn: 'Your rapier disarmed the rival amidst roaring applause. Cinq Director awarded you the esteemed Grade 6 crest.',
        setFixerGrade: 6,
        flagsAdd: ['promo_g6_done'],
        meritAdd: 26,
        effects: { rep: +22, network: +18, wealth: +45 }
      },
      {
        labelVi: 'Tập trung phản công chuẩn xác vào điểm yếu phòng ngự của địch',
        labelEn: 'Focus on precise parries, exploiting defensive openings',
        resultVi: 'Mũi kiếm của bạn dừng lại cách yết hầu đối phương chỉ một phân. Chiến thắng thuyết phục đưa bạn chính thức bước lên Fixer Grade 6.',
        resultEn: 'Your blade halted a hair from the examiner’s throat. A decisive victory elevating you to Grade 6 Fixer.',
        setFixerGrade: 6,
        flagsAdd: ['promo_g6_done'],
        meritAdd: 25,
        effects: { health: -7, rep: +19, wealth: +40, sanity: +6 }
      },
      {
        labelVi: 'Hoãn tham gia quyết đấu, tập trung nghỉ ngơi hồi phục thể lực',
        labelEn: 'Defer duel tournament: Focus on physical rest and recuperation',
        resultVi: 'Bạn gửi đơn xin hoãn tham gia đại hội để dưỡng thương (+16 HP, +12 SP).',
        resultEn: 'You withdrew temporarily from the tournament to heal (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g6_oufi',
    age: [20, 65],
    major: true,
    weight: 80,
    need: { jobs: ['Fixer'], grade: [7, 7] },
    forbids: ['Distorted', 'promo_g6_done'],
    vi: '[Cưỡng Chế Trọng Tài Hợp Đồng Oufi Association · Grade 6] Oufi Association giao cho bạn lệnh cưỡng chế tịch biên tài sản đối với một Syndicate ngỗ ngược dám xé bỏ giao kèo thương mại. Hoàn thành nhiệm vụ sẽ được Hana và Oufi công nhận Fixer Grade 6.',
    en: '[Oufi Contract Enforcement Trial · Grade 6] Oufi Association charges you to enforce judicial repossession against a rogue syndicate that tore up an adjudicated pact. Success guarantees Grade 6 certification.',
    choices: [
      {
        labelVi: 'Đưa phán quyết trọng tài và dùng vũ lực áp đảo bọn ngoan cố',
        labelEn: 'Present the judicial writ, subduing defiers with overwhelming force',
        resultVi: 'Băng nhóm phản kháng bị đánh tan tác trong chốc lát. Oufi niêm phong toàn bộ tài sản và chứng nhận cho bạn tư cách Fixer Grade 6.',
        resultEn: 'The rebellious gang shattered beneath your assault. Oufi sealed the premises, granting you Grade 6 certification.',
        setFixerGrade: 6,
        flagsAdd: ['promo_g6_done'],
        meritAdd: 27,
        effects: { health: -9, rep: +20, wealth: +50 }
      },
      {
        labelVi: 'Đàm phán vạch trần điều khoản phạt nặng, ép chúng đầu hàng nộp phạt',
        labelEn: 'Negotiate the penalty clauses, forcing compliance without bloodshed',
        resultVi: 'Sự am hiểu luật định lạnh lùng của bạn khiến tên trùm syndicate phải cúi đầu nộp phạt đầy đủ. Oufi khen ngợi và phong bạn lên Grade 6.',
        resultEn: 'Your razor-sharp command of City statutes forced the syndicate boss to pay every Ahn. Oufi promoted you to Grade 6.',
        setFixerGrade: 6,
        flagsAdd: ['promo_g6_done'],
        meritAdd: 26,
        effects: { rep: +22, network: +20, wealth: +42, sanity: +8 }
      },
      {
        labelVi: 'Hoãn tham gia thi hành án, tập trung nghỉ ngơi hồi phục thể lực',
        labelEn: 'Defer enforcement: Focus on physical rest and recuperation',
        resultVi: 'Bạn hoãn hợp đồng thi hành án để dưỡng sức (+16 HP, +12 SP).',
        resultEn: 'You postponed the enforcement action to recuperate (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 6 -> 5 ALTERNATIVES ---
  {
    id: 'fixer_promo_g5_dieci',
    age: [21, 68],
    major: true,
    weight: 75,
    need: { jobs: ['Fixer'], grade: [6, 6] },
    forbids: ['Distorted', 'promo_g5_done'],
    vi: '[Khai Quật Tàng Thư Cổ Dieci Association · Grade 5] Hiệp hội Dieci tổ chức đoàn khảo sát tiến vào tàn tích một thư viện ngầm bị chôn vùi từ Smoke War. Những cuốn sách phủ bụi chứa đầy tri thức Singularity đang bị lũ quái dị săn đuổi. Dieci tuyển chọn bạn làm cận vệ tiên phong để nhận chứng nhận Grade 5.',
    en: '[Dieci Subterranean Archives Expedition · Grade 5] Dieci Association organizes an expedition into a buried library from the Smoke War. Anomaly scavengers stalk the ruins. Dieci enlists you as vanguard for Grade 5 certification.',
    choices: [
      {
        labelVi: 'Vung chìa khóa khai phá mở đường máu xuyên qua bầy quái vật',
        labelEn: 'Wield monumental key-axes to cleave a path through anomaly scavengers',
        resultVi: 'Quái vật tan tác trước sức mạnh của bạn. Đoàn học giả Dieci thu hồi an toàn các bộ tàng thư vô giá và trao cho bạn bằng Fixer Grade 5 kèm quyền mở Văn phòng.',
        resultEn: 'The monsters scattered. Dieci scholars recovered priceless codices, awarding you Grade 5 Fixer status and Office founding rights.',
        setFixerGrade: 5,
        flagsAdd: ['promo_g5_done', 'OfficeEligible'],
        meritAdd: 31,
        effects: { health: -8, rep: +26, wealth: +65 }
      },
      {
        labelVi: 'Tiếp thu tri thức từ các cuộn sách cổ để củng cố sức mạnh tâm thức',
        labelEn: 'Absorb ancient philosophies from the scrolls, bolstering psychic fortitude',
        resultVi: 'Ánh sáng tri thức giúp tâm trí bạn được khai mở và soi sáng. Bạn hộ tống đoàn Dieci trở về an toàn tuyệt đối và nhận bằng Grade 5.',
        resultEn: 'Ancient wisdom illuminated your psyche. You guided the scholars back unharmed, receiving your Grade 5 license.',
        setFixerGrade: 5,
        flagsAdd: ['promo_g5_done', 'OfficeEligible'],
        meritAdd: 29,
        effects: { sanity: +15, rep: +22, wealth: +50, network: +12 }
      },
      {
        labelVi: 'Chưa nhận nhiệm vụ khảo cổ, tạm thời nghỉ ngơi hồi phục thể trạng',
        labelEn: 'Postpone expedition: Temporarily rest and restore physical condition',
        resultVi: 'Bạn hoãn chuyến viễn chinh để tích lũy thể lực (+16 HP, +12 SP).',
        resultEn: 'You deferred the expedition to gather strength (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g5_molar',
    age: [21, 68],
    major: true,
    weight: 75,
    need: { jobs: ['Fixer'], grade: [6, 6] },
    forbids: ['Distorted', 'promo_g5_done'],
    vi: '[Trục Vớt Bản Vẽ Xưởng Vũ Khí Molar · Grade 5] Văn phòng Molar Office thuê bạn tham gia chiến dịch lặn sâu vào một xưởng cơ khí ngập nước phế liệu để thu hồi bản vẽ máy khoan cao áp. Đây là bài kiểm tra sức chịu đựng khắc nghiệt để bước lên Fixer Grade 5.',
    en: '[Molar Office High-Torque Salvage · Grade 5] Molar Office contracts you to dive into a flooded workshop vault to recover high-torque drill blueprints. A grueling endurance trial to reach Grade 5.',
    choices: [
      {
        labelVi: 'Kích hoạt động cơ máy khoan nghiền nát vật cản và quái vật ngầm',
        labelEn: 'Overdrive heavy pneumatic drills to grind through bulkheads and beasts',
        resultVi: 'Kim loại gầm rú xé tan mọi trở ngại. Bạn mang bản vẽ nguyên vẹn trở về. Molar Office và Hana ký quyết định phong bạn lên Fixer Grade 5.',
        resultEn: 'Pneumatic steel chewed through the dark. You returned with pristine schematics. Molar and Hana certified you as Grade 5.',
        setFixerGrade: 5,
        flagsAdd: ['promo_g5_done', 'OfficeEligible'],
        meritAdd: 30,
        effects: { health: -9, rep: +24, wealth: +62 }
      },
      {
        labelVi: 'Tận dụng phao nổi và thiết bị hàn cắt Workshop để trục vớt an toàn',
        labelEn: 'Deploy Workshop cutting torches and flotation riggings for safe recovery',
        resultVi: 'Kỹ thuật xử lý khéo léo giúp bạn hoàn thành nhiệm vụ với thương vong bằng không. Bạn nhận chứng chỉ mở Văn phòng riêng cho Fixer Grade 5.',
        resultEn: 'Flawless engineering delivered clean success without casualty. You earned your Grade 5 license and Office rights.',
        setFixerGrade: 5,
        flagsAdd: ['promo_g5_done', 'OfficeEligible'],
        meritAdd: 28,
        effects: { rep: +20, wealth: +55, network: +14, sanity: +6 }
      },
      {
        labelVi: 'Chưa nhận nhiệm vụ trục vớt, tạm thời nghỉ ngơi hồi phục thể trạng',
        labelEn: 'Postpone salvage: Temporarily rest and restore physical condition',
        resultVi: 'Bạn dời lại chuyến lặn trục vớt để hồi phục thể lực (+16 HP, +12 SP).',
        resultEn: 'You deferred the salvage operation to rest (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 5 -> 4 ALTERNATIVES ---
  {
    id: 'fixer_promo_g4_devzat',
    age: [22, 70],
    major: true,
    weight: 70,
    need: { jobs: ['Fixer'], grade: [5, 5] },
    forbids: ['Distorted', 'promo_g4_done'],
    vi: '[Chuyến Hàng Tốc Hành Nguy Cấp Devzat Association · Grade 4] Hiệp hội Vận tải Devzat cần một Fixer Grade 4 bản lĩnh thép để hộ tống một công-ten-nơ chứa phụ phẩm Singularity đang rò rỉ năng lượng xuyên qua vùng chiến sự Urban Plague.',
    en: '[Devzat Volatile Singularity Express · Grade 4] Devzat Association seeks an ironclad Grade 4 vanguard to escort leaking Singularity canisters across an active Urban Plague conflict zone.',
    choices: [
      {
        labelVi: 'Đạp ga hết cỡ, mở đường máu xuyên qua làn mưa tên lửa của Syndicate',
        labelEn: 'Floor the accelerator, punching through syndicate missile barrages',
        resultVi: 'Xe bọc thép lao đi như mũi tên xé toang mọi ổ phục kích. Kiện hàng đến nơi đúng hẹn. Devzat và Hana trao cho bạn tấm thẻ vàng Fixer Grade 4.',
        resultEn: 'The armored hauler smashed through ambushes. The shipment arrived intact. Devzat and Hana awarded you the golden Grade 4 credential.',
        setFixerGrade: 4,
        flagsAdd: ['promo_g4_done'],
        meritAdd: 36,
        effects: { health: -10, rep: +30, wealth: +85 }
      },
      {
        labelVi: 'Kích hoạt khiên phân tán năng lượng bảo vệ kiện hàng không phát nổ',
        labelEn: 'Overcharge kinetic dampeners to stabilize volatile resonance',
        resultVi: 'Sự bình tĩnh tuyệt đối của bạn giữ cho khối năng lượng không phát nổ, cứu cả khu phố khỏi thảm họa. Bạn được phong Fixer Grade 4 đầy vẻ vang.',
        resultEn: 'Your icy composure stabilized the reactor, sparing the district from ruin. You were gloriously elevated to Grade 4.',
        setFixerGrade: 4,
        flagsAdd: ['promo_g4_done'],
        meritAdd: 35,
        effects: { rep: +28, network: +18, wealth: +75, sanity: +8 }
      },
      {
        labelVi: 'Từ chối làm mũi nhọn tốc hành lúc này, dành thời gian điều dưỡng',
        labelEn: 'Decline express courier run: Dedicate season to medical recuperation',
        resultVi: 'Bạn lùi lại chuyến hàng để tĩnh dưỡng vết thương (+16 HP, +12 SP).',
        resultEn: 'You deferred the dangerous transit to heal wounds (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g4_rhino',
    age: [22, 70],
    major: true,
    weight: 70,
    need: { jobs: ['Fixer'], grade: [5, 5] },
    forbids: ['Distorted', 'promo_g4_done'],
    vi: '[Chiến Dịch Đột Phá Công Sự R Corp Rhino Team · Grade 4] Biệt đội Tê Giác (Rhino Team) thuộc Đại Đội 4 của R Corp ký hợp đồng liên minh với Fixer ưu tú để san phẳng công sự kiên cố của một Syndicate ngón tay. Bạn bước vào hàng ngũ Fixer Grade 4 nếu sống sót hoàn thành.',
    en: '[R Corp Rhino Team Fortification Assault · Grade 4] R Corp 4th Pack Rhino Team contracts an elite Fixer to breach an underground syndicate fortress. Surviving guarantees Grade 4 status.',
    choices: [
      {
        labelVi: 'Cùng đội Rhino húc sập cổng thành bằng xung lực bọc thép hạng nặng',
        labelEn: 'Charge alongside Rhino vanguards, obliterating the blast doors',
        resultVi: 'Bức tường dày 2 mét đổ sập như cát vụn. Khói lửa mịt mù chứng kiến sự áp đảo tuyệt đối. Chỉ huy R Corp gật đầu tán thưởng và chứng nhận bạn là Fixer Grade 4.',
        resultEn: 'Two-meter blast doors collapsed into gravel. Total dominance in the smoke. The R Corp commander affirmed your Grade 4 status.',
        setFixerGrade: 4,
        flagsAdd: ['promo_g4_done'],
        meritAdd: 37,
        effects: { health: -11, rep: +32, wealth: +90 }
      },
      {
        labelVi: 'Yểm trợ hỏa lực Workshop từ phía sau, tiêu diệt các hỏa điểm bắn tỉa',
        labelEn: 'Provide precision Workshop fire support, silencing heavy artillery nests',
        resultVi: 'Từng ổ pháo của đối phương nổ tung trước những phát bắn chính xác của bạn. Chiến dịch thành công rực rỡ, đưa bạn bước lên Fixer Grade 4.',
        resultEn: 'Enemy artillery nests were neutralized by your pinpoint fire. A magnificent victory confirming your Grade 4 ascension.',
        setFixerGrade: 4,
        flagsAdd: ['promo_g4_done'],
        meritAdd: 34,
        effects: { rep: +26, network: +16, wealth: +70, sanity: +6 }
      },
      {
        labelVi: 'Từ chối công phá lúc này, dành thời gian điều dưỡng',
        labelEn: 'Decline assault: Dedicate season to medical recuperation',
        resultVi: 'Bạn lùi lại chiến dịch đột phá để dưỡng sức (+16 HP, +12 SP).',
        resultEn: 'You postponed the assault to recover (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 4 -> 3 ALTERNATIVES ---
  {
    id: 'fixer_promo_g3_warp',
    age: [24, 72],
    major: true,
    weight: 65,
    need: { jobs: ['Fixer'], grade: [4, 4] },
    forbids: ['Distorted', 'promo_g3_done'],
    vi: '[Chiến Dịch Phong Tỏa Toa Tàu WARP với W Corp · Grade 3] Một chuyến tàu WARP đến sớm hơn dự kiến với khoang hạng Nhất bị rách toác không gian. W Corp bí mật tuyển dụng Fixer Grade 3 tương lai để vào trong dọn dẹp các khối thịt hợp thể bất tử trước khi cửa ga mở ra.',
    en: '[W Corp WARP Train Containment Protocol · Grade 3] A WARP Train arrived early with a fractured First-Class carriage. W Corp recruits elite Grade 3 candidates to purge immortal flesh amalgams before the platform doors unlock.',
    choices: [
      {
        labelVi: 'Vung vũ khí phân giải cắt đứt các mối nối không gian của khối hợp thể',
        labelEn: 'Sever the spatial flesh joints of the amalgams with dimensional cleavers',
        resultVi: 'Thịt nát và không gian méo mó được dọn sạch không còn một dấu vết. W Corp trả khoản thù lao kếch xù và Hana chứng nhận bạn là Fixer Grade 3 danh giá.',
        resultEn: 'Twisted flesh and warped spacetime were sanitized without trace. W Corp paid a king’s ransom and Hana certified you as Grade 3.',
        setFixerGrade: 3,
        flagsAdd: ['promo_g3_done'],
        meritAdd: 44,
        effects: { health: -12, sanity: -6, rep: +38, wealth: +125 }
      },
      {
        labelVi: 'Kích hoạt thiết bị tua lại ký ức T Corp để ổn định ý thức nạn nhân',
        labelEn: 'Deploy T Corp mnemonic rewinding rigs to stabilize passenger psyches',
        resultVi: 'Cơn ác mộng 2.000 năm bị xóa sạch khỏi tâm trí những hành khách sống sót. Bạn hoàn thành hợp đồng hoàn hảo và được phong Fixer Grade 3.',
        resultEn: 'The 2,000-year nightmare was wiped clean from passenger minds. You fulfilled the contract flawlessly, promoted to Grade 3.',
        setFixerGrade: 3,
        flagsAdd: ['promo_g3_done'],
        meritAdd: 42,
        effects: { sanity: +10, rep: +35, wealth: +110, network: +15 }
      },
      {
        labelVi: 'Chưa tiến vào toa tàu WARP, ưu tiên bảo toàn tính mạng và hồi phục',
        labelEn: 'Hold off entering WARP carriage: Prioritize life preservation and recovery',
        resultVi: 'Bạn xin hoãn nhiệm vụ để hồi phục thể lực và tâm trí (+16 HP, +12 SP).',
        resultEn: 'You deferred the containment run to recuperate (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g3_reindeer',
    age: [24, 72],
    major: true,
    weight: 65,
    need: { jobs: ['Fixer'], grade: [4, 4] },
    forbids: ['Distorted', 'promo_g3_done'],
    vi: '[Trấn Áp Cuồng Nộ Tâm Trí Reindeer Team · Grade 3] Đội Hươu (Reindeer Team) của R Corp trong một cuộc chạm trán dị thể đã bị quá tải não bộ do sóng não Mind Whip phản phệ. Hana cử bạn tới thiết lập lồng xung lực và khống chế các binh sĩ điên cuồng trước khi họ phá hủy cả quận.',
    en: '[Reindeer Team Mindbreak Suppression · Grade 3] R Corp Reindeer Team suffered catastrophic psychic overload from Mind Whip backlash. Hana sends you to erect kinetic barriers and suppress the berserk operatives.',
    choices: [
      {
        labelVi: 'Chịu đựng luồng sét tâm linh, một mình áp sát đánh ngất chỉ huy Reindeer',
        labelEn: 'Endure psychic lightning discharges, subduing the Reindeer captain',
        resultVi: 'Dòng điện tâm trí thiêu đốt da thịt bạn, nhưng bạn đã kịp thời vô hiệu hóa nguồn năng lượng phản phệ. Đội Reindeer hồi tỉnh. Hana công nhận bạn là Fixer Grade 3 xuất chúng.',
        resultEn: 'Psychic current scorched your nerves, yet you severed the feedback loop. The Reindeer troops stabilized. Hana ratified your Grade 3 status.',
        setFixerGrade: 3,
        flagsAdd: ['promo_g3_done'],
        meritAdd: 45,
        effects: { health: -11, sanity: -6, rep: +42, wealth: +130 }
      },
      {
        labelVi: 'Dựng trận pháp khiên cách điện Workshop để tiêu hao nguồn điện tích',
        labelEn: 'Deploy insulated Workshop ground-rods to safely ground psychic arcs',
        resultVi: 'Sấm sét tâm linh bị dẫn xuống lòng đất an toàn. Bạn cứu sống toàn bộ biệt đội mà không tổn hao nhiều sức lực. Bạn nhận huy hiệu Fixer Grade 3.',
        resultEn: 'Psychic lightning grounded harmlessly into the bedrock. You saved the squad with elegant precision, earning Grade 3 honors.',
        setFixerGrade: 3,
        flagsAdd: ['promo_g3_done'],
        meritAdd: 43,
        effects: { rep: +36, network: +18, wealth: +100, sanity: +8 }
      },
      {
        labelVi: 'Chưa tham gia trấn áp lúc này, dành thời gian nghỉ ngơi dưỡng sức',
        labelEn: 'Defer psychic suppression: Prioritize rest and recovery',
        resultVi: 'Bạn xin phép Hana dời lại đợt trấn áp để bồi dưỡng sức khỏe (+16 HP, +12 SP).',
        resultEn: 'You requested a deferral to regain stamina (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 3 -> 2 ALTERNATIVES ---
  {
    id: 'fixer_promo_g2_black_silence',
    age: [26, 75],
    major: true,
    weight: 60,
    need: { jobs: ['Fixer'], grade: [3, 3] },
    forbids: ['Distorted', 'promo_g2_done'],
    vi: '[Tác Chiến Phong Tỏa Hậu Biến Cố Black Silence · Grade 2] Một tàn tích sào huyệt Syndicate vừa bị cơn thịnh nộ của Black Silence san phẳng thành bình địa. Tàn dư quái vật và các tay súng liều chết đang cướp bóc vũ khí tối mật còn sót lại. Hana Section 1 cử bạn tới phong tỏa khu vực và thanh trừng toàn bộ.',
    en: '[Black Silence Aftermath Containment · Grade 2] A syndicate fortress was pulverized by the Black Silence’s grief rampage. Anomaly scavengers and rogue gunmen loot classified armaments. Hana Section 1 assigns you to quarantine and cleanse the sector.',
    choices: [
      {
        labelVi: 'Băng qua đống đổ nát đẫm máu, tiêu diệt toàn bộ những kẻ hôi của',
        labelEn: 'Advance through blood-soaked rubble, terminating all rogue scavengers',
        resultVi: 'Khí thế áp đảo của bạn đè bẹp mọi sự phản kháng giữa tro tàn đổ nát. Hana Section 1 thu hồi trọn vẹn vũ khí cấm và trao tặng bạn huy chương Fixer Grade 2.',
        resultEn: 'Your overwhelming might crushed all resistance amidst the ruins. Hana Section 1 secured the weapons, awarding you the Grade 2 star.',
        setFixerGrade: 2,
        flagsAdd: ['promo_g2_done'],
        meritAdd: 54,
        effects: { health: -12, sanity: -6, rep: +48, wealth: +170 }
      },
      {
        labelVi: 'Khai thác tài liệu tình báo thu giữ được từ hiện trường giao cho Hana',
        labelEn: 'Extract classified dossiers from the ruined vault for Hana Grand Council',
        resultVi: 'Tập hồ sơ mật bạn giao nộp hé lộ âm mưu nguy hiểm của một tập đoàn ngầm. Đóng góp to lớn này đưa bạn thẳng lên hàng ngũ Fixer Grade 2 tối cao.',
        resultEn: 'Your intelligence dossier exposed a vast conspiracy. This colossal contribution propelled you directly into Grade 2 Fixer ranks.',
        setFixerGrade: 2,
        flagsAdd: ['promo_g2_done'],
        meritAdd: 52,
        effects: { rep: +45, network: +25, wealth: +150, sanity: +10 }
      },
      {
        labelVi: 'Lùi hạn nhận hợp đồng phong tỏa nguy hiểm, tập trung tĩnh dưỡng',
        labelEn: 'Defer quarantine contract: Focus on resting and recuperating',
        resultVi: 'Bạn lùi lại thời hạn hợp đồng để điều dưỡng thể chất (+16 HP, +12 SP).',
        resultEn: 'You postponed the mission to recuperate (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g2_district_defense',
    age: [26, 75],
    major: true,
    weight: 60,
    need: { jobs: ['Fixer'], grade: [3, 3] },
    forbids: ['Distorted', 'promo_g2_done'],
    vi: '[Thống Lĩnh Phòng Tuyến Ngăn Chặn Đại Thanh Trừng · Grade 2] Một liên minh ba Syndicate Backstreets bất ngờ mở cuộc tấn công tổng lực vào ranh giới quận nhằm cướp đoạt một cơ sở Singularity. Hana Association ủy nhiệm bạn nắm quyền chỉ huy tối cao liên minh các Văn phòng Fixer để bảo vệ toàn khu phố.',
    en: '[District-Wide Purge Defense Command · Grade 2] A coalition of three syndicates launches an all-out assault against the district boundary to plunder a Singularity facility. Hana entrusts you with supreme command over allied Fixer Offices.',
    choices: [
      {
        labelVi: 'Trực tiếp chỉ huy mũi phản kích, chém gục cả ba tên đầu lĩnh Syndicate',
        labelEn: 'Lead the counter-offensive personally, cutting down all three syndicate lords',
        resultVi: 'Đầu lĩnh địch rơi xuống, liên minh tội phạm lập tức vỡ trận tháo chạy trong hoảng loạn. Cả khu phố reo hò vang dội tên bạn. Bạn được phong Fixer Grade 2.',
        resultEn: 'The syndicate lords fell; their army routed in utter disarray. The district cheered your name. Hana confirmed your Grade 2 rank.',
        setFixerGrade: 2,
        flagsAdd: ['promo_g2_done'],
        meritAdd: 56,
        effects: { health: -12, sanity: -6, rep: +52, wealth: +190 }
      },
      {
        labelVi: 'Dàn trận phòng ngự nhiều lớp, phân tán sinh lực địch vào các bẫy kinetic',
        labelEn: 'Deploy layered kinetic defenses, exhausting the invasion forces',
        resultVi: 'Chiến thuật phòng ngự khoa học bẻ gãy đợt tấn công mà không để một cư dân nào bị thương. Hana Section 1 đồng loạt đứng dậy chào đón tân Fixer Grade 2.',
        resultEn: 'Flawless defensive doctrine broke the invasion without civilian losses. Hana Section 1 saluted you as a new Grade 2 Fixer.',
        setFixerGrade: 2,
        flagsAdd: ['promo_g2_done'],
        meritAdd: 53,
        effects: { rep: +46, network: +22, wealth: +160, sanity: +8 }
      },
      {
        labelVi: 'Lùi hạn nhận quyền chỉ huy chiến sự, tập trung dưỡng thương',
        labelEn: 'Defer command: Focus on resting and recuperating',
        resultVi: 'Bạn xin hoãn nắm quyền chỉ huy để dưỡng thương (+16 HP, +12 SP).',
        resultEn: 'You deferred command duties to heal wounds (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 2 -> 1 ALTERNATIVES ---
  {
    id: 'fixer_promo_g1_hana_apex',
    age: [28, 80],
    major: true,
    weight: 55,
    need: { jobs: ['Fixer'], grade: [2, 2] },
    forbids: ['Distorted', 'promo_g1_done'],
    vi: '[Đại Hội Luận Kiếm Tối Cao Section 1 Hana · Grade 1] Để bước chân vào hàng ngũ Fixer Grade 1 đỉnh cao, bạn được triệu tập tới quảng trường trung tâm District 1 trước mặt 12 Viện trưởng Hiệp hội để tham gia khảo thí đối kháng sinh tử với các Át Chủ Bài hàng đầu của The City.',
    en: '[Hana Apex Martial Summit · Grade 1] To cross into the summit of Grade 1 Fixers, you are summoned to District 1’s grand forum before the 12 Association Directors to face the fiercest combat trials against the City’s top aces.',
    choices: [
      {
        labelVi: 'Vung tuyệt kỹ vũ khí tối thượng, một mình đánh bại ba đối thủ khảo hạch',
        labelEn: 'Unleash your apex weapon art, overcoming three grand examiners simultaneously',
        resultVi: 'Khí kình bùng nổ rung chuyển cả võ đài. Cả ba giám khảo Hana đều lùi bước tâm phục khẩu phục. Tiếng chuông vàng ngân vang công nhận bạn là Fixer Grade 1 của The City.',
        resultEn: 'A colossal shockwave rattled the arena. All three examiners bowed in solemn respect. Golden chimes proclaimed you as a Grade 1 Fixer of The City.',
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 72,
        effects: { health: -13, sanity: -7, rep: +68, wealth: +300 }
      },
      {
        labelVi: 'Thể hiện triết lý chiến đấu toàn diện và khả năng ứng biến mọi tình huống',
        labelEn: 'Demonstrate holistic combat philosophy and flawless strategic adaptability',
        resultVi: 'Sự hoàn mỹ trong từng cử chỉ và quyết định của bạn chinh phục trọn vẹn Hội đồng Tối cao Hana. Bạn nhận tấm thẻ Fixer Grade 1 mạ vàng ròng.',
        resultEn: 'Flawless mastery in every movement conquered the Hana Grand Council. You received the solid gold Grade 1 credential.',
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 68,
        effects: { rep: +60, network: +30, wealth: +240, sanity: +12 }
      },
      {
        labelVi: 'Bảo lưu quyền khảo thí tối cao, dành một mùa hồi phục phong độ đỉnh cao',
        labelEn: 'Preserve trial rights: Spend a season regaining peak form',
        resultVi: 'Hội đồng Hana đồng ý cho bạn dời ngày khảo thí để đạt trạng thái thể lực sung mãn nhất (+16 HP, +12 SP).',
        resultEn: 'Hana Council agreed to reschedule so you may achieve peak physical prowess (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g1_calamity',
    age: [28, 80],
    major: true,
    weight: 55,
    need: { jobs: ['Fixer'], grade: [2, 2] },
    forbids: ['Distorted', 'promo_g1_done'],
    vi: '[Tiêu Diệt Thực Thể Biến Dị Cấp Thảm Họa · Grade 1] Một cá thể Distortion cấp độ Star of the City vừa thức tỉnh ở rìa khu vực, gieo rắc sự điên cuồng và hủy diệt cả một phân khu. Hana Association ban bố lệnh khẩn cấp, chỉ định bạn dẫn đầu cuộc thanh trừng để bước lên Fixer Grade 1.',
    en: '[Apex Calamity Distortion Extermination · Grade 1] A Star of the City tier Distortion awakened on the district border, spreading madness and leveling buildings. Hana issues an emergency decree designating you to lead the suppression for Grade 1 investiture.',
    choices: [
      {
        labelVi: 'Kích hoạt toàn bộ công lực vũ khí, chém đứt lõi sinh mệnh của thực thể Biến Dị',
        labelEn: 'Overdrive your armaments, severing the core of the Calamity Distortion',
        resultVi: 'Tiếng thét quái đản tan biến trong tro tàn. Bạn đứng sừng sững trên xác con quái vật khổng lồ. Toàn thể The City nghiêng mình trước tân Fixer Grade 1.',
        resultEn: 'The monstrous screech dissolved into ash. You stood triumphant atop the fallen behemoth. The City bowed before its newest Grade 1 Fixer.',
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 75,
        effects: { health: -14, sanity: -8, rep: +70, wealth: +320, resonance: +20 }
      },
      {
        labelVi: 'Dựng trận đồ phong tỏa không gian, vô hiệu hóa nguồn ô nhiễm tâm thức của nó',
        labelEn: 'Erect spatial containment wards, neutralizing its psychic infection aura',
        resultVi: 'Trận đồ phong tỏa cô lập dị thể trước khi đòn kết liễu được tung ra. Hiệp hội Hana chính thức phê chuẩn sắc lệnh thăng bạn lên Fixer Grade 1.',
        resultEn: 'Spatial wards isolated the anomaly before the finishing strike fell. Hana officially confirmed your ascension to Grade 1 Fixer.',
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 70,
        effects: { rep: +62, network: +28, wealth: +260, sanity: +10 }
      },
      {
        labelVi: 'Bảo lưu quyền tham chiến, dành một mùa hồi phục phong độ đỉnh cao',
        labelEn: 'Preserve trial rights: Spend a season regaining peak form',
        resultVi: 'Bạn lùi lại chiến dịch để bồi dưỡng thể lực đạt trạng thái tối ưu (+16 HP, +12 SP).',
        resultEn: 'You postponed the raid to achieve peak physical condition (+16 HP, +12 SP).',
        effects: { health: +16, sanity: +12 }
      }
    ]
  }
];
