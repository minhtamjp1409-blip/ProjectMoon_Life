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
        effects: { health: -14, rep: +15, wealth: +30 }
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
        effects: { health: -22, rep: +20, wealth: +45 }
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
        effects: { health: -16, rep: +25, wealth: +60 }
      },
      {
        labelVi: 'Dàn trận phối hợp cùng Fixer đồng minh và đặt bẫy kinetic',
        labelEn: 'Coordinate a defensive perimeter with allied Fixers and deploy kinetic snares',
        resultVi: 'Bẫy nổ kích hoạt xé tan đội hình Sweeper, hạn chế tối đa thương vong. Bạn giao nộp mẫu mô an toàn. Hana Association cấp phép mở Văn phòng riêng cho Fixer Grade 5.',
        resultEn: 'Kinetic snares detonated, scattering the Sweeper pack with controlled damage. You submitted clean samples. Hana certifies your Grade 5 license and Office rights.',
        setFixerGrade: 5,
        flagsAdd: ['promo_g5_done', 'OfficeEligible'],
        meritAdd: 28,
        effects: { health: -10, sanity: -4, rep: +20, wealth: +45, network: +10 }
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
        effects: { health: -18, rep: +32, wealth: +85 }
      },
      {
        labelVi: 'Khai thác tài liệu tình báo của Seven Association để đón lõng điểm hẹn',
        labelEn: 'Use Seven Association intelligence dossiers to ambush their clandestine rendezvous',
        resultVi: 'Đòn mai phục chính xác tóm gọn toán đầu não trước khi chúng kịp phản kháng. Phân hội Shi và Liu trao bạn huy hiệu Fixer Grade 4 kèm lời khen ngợi tác chiến xuất sắc.',
        resultEn: 'A surgical ambush neutralized their commanders before blades were drawn. Shi and Liu Associations award you the Grade 4 crest for exemplary tactical prowess.',
        setFixerGrade: 4,
        flagsAdd: ['promo_g4_done'],
        meritAdd: 34,
        effects: { health: -10, rep: +26, wealth: +65, network: +14 }
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
        effects: { health: -20, sanity: -10, rep: +40, wealth: +120, resonance: +15 }
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
        effects: { health: -12, sanity: -6, rep: +35, wealth: +80, network: +12 }
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
        effects: { health: -22, sanity: -12, rep: +50, wealth: +180, resonance: +20 }
      },
      {
        labelVi: 'Phối hợp cùng hộ vệ Zwei Association lập phòng tuyến kiên cố',
        labelEn: 'Form a resilient defensive phalanx with Zwei Association bodyguards',
        resultVi: 'Khiên chắn Zwei chặn đứng làn mưa ám khí, tạo điều kiện cho bạn phản công hạ gục các sát thủ then chốt. Viên giám đốc Wing bình an vô sự. Bạn nhận huy chương Grade 2.',
        resultEn: 'Zwei kinetic shields deflected the assassination salvo, allowing you to counter and neutralize key strikers. The executive survived unharmed. You gain the Grade 2 cross.',
        setFixerGrade: 2,
        flagsAdd: ['promo_g2_done'],
        meritAdd: 50,
        effects: { health: -14, sanity: -8, rep: +42, wealth: +130, network: +18 }
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
        effects: { health: -24, sanity: -14, rep: +65, wealth: +280, resonance: +25 }
      },
      {
        labelVi: 'Hiệu triệu liên minh các Văn phòng uy tín mở chiến dịch vây quét tổng lực',
        labelEn: 'Summon an allied coalition of elite Offices to conduct a coordinated grand raid',
        resultVi: 'Chiến dịch hiệp đồng quy mô lớn san phẳng hang ổ hiểm họa mà vẫn bảo toàn mạng sống các chỉ huy. Hội đồng Tối cao Hana đứng dậy cúi đầu: "Chúc mừng, Fixer Grade 1."',
        resultEn: 'A magnificent combined assault leveled the catastrophic stronghold while keeping command casualties low. Hana Grand Council stands in reverence: "Welcome, Grade 1 Fixer."',
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 65,
        effects: { health: -16, sanity: -10, rep: +55, wealth: +190, network: +25 }
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
];
