/**
 * Project Moon Universe - Wing Employee Route Expansion & Parity Suite
 * Elevates the corporate Wing Feather/Executive career to parity with Fixer and Fingers.
 * Focuses on Singularity dilemmas, corporate espionage, internal audits, and Nest life.
 */

import { M, C, I, D } from './storyKit.js';

// ============================================================================
// 1. WING EMPLOYEE EXPANSION MINORS (15-second Dilemmas & Rapid Risk-Reward)
// ============================================================================

const W = (id, lo, hi, vi, en, choices, ignore) =>
  M(id, [19, 75], { jobs: ['Wing Employee'], wingRankAtLeast: lo, wingRankAtMost: hi }, vi, en, choices, ignore, { forbids: ['Distorted'] });

export const WING_PARITY_MINORS = [
  // Rank 0-1: Feather / Field Operations
  W('m_wing_tcorp_time_tax_leak', 0, 1,
    '[Đồng hồ thuế thời gian T Corp] Một đồng nghiệp bộ phận kế toán để quên thẻ lưu trữ thời gian trên bàn máy pha cà phê. Bên trong nạp sẵn hai trăm giờ tiêu chuẩn chưa đánh dấu xuất xứ.',
    '[T Corp Time Tax Token] An accounting colleague left a time-storage token by the coffee machine. Inside are two hundred untagged standard hours.',
    [
      C('Lén chuyển mười giờ vào đồng hồ cá nhân để bù ca làm việc',
        'Pocket ten hours into your personal chronometer for overtime',
        'Cơ thể bạn bỗng nhẹ nhõm như vừa ngủ đũ giấc sau ba tuần tăng ca. Không ai nhận ra sự thiếu hụt nhỏ này.',
        'Your body feels as refreshed as if you slept after three weeks of overtime. No one notices the tiny discrepancy.',
        { sanity: 6, health: 4, leverage: 2 }),
      C('Nộp ngay cho Ban Kiểm Soát Thuế Thời Gian',
        'Surrender it immediately to the Time Tax Audit Board',
        'Viên thanh tra gật đầu lạnh lùng, ghi một điểm cộng trung thực vào hồ sơ quý của bạn.',
        'The auditor gives a cold nod, stamping a commendation mark onto your quarterly review.',
        { standing: 2, merit: 4, leverage: -1 })
    ],
    I('Bạn làm ngơ quay đi. Chiếc thẻ biến mất sau năm phút.', 'You look away. The token vanishes within five minutes.', {})
  ),

  W('m_wing_kcorp_ampoule_defect', 0, 1,
    '[Ống huyết thanh lỗi của K Corp] Trong ca phân loại vật tư y tế, bạn phát hiện một ống huyết thanh phục hồi có màu xanh vẩn đục khác thường. Tiêu hủy nó sẽ làm hụt chỉ tiêu tháng.',
    '[Defective K Corp Ampoule] Sorting clinic shipments, you discover a recovery ampoule with an abnormal cloudy hue. Scrapping it cuts your monthly quota.',
    [
      C('Tiêu hủy đúng quy trình và chấp nhận chịu trừ lương',
        'Incinerate it per protocol and absorb the payroll penalty',
        'Chỉ tiêu tháng bị trừ hai điểm, nhưng bạn biết chắc mình vừa cứu sống một người nào đó không rõ tên.',
        'Your monthly quota drops two ticks, but you know you spared some nameless soul.',
        { standing: -1, sanity: 4, wealth: -2 }),
      C('Đóng gói chung với lô hàng xuất khẩu sang Backstreets',
        'Pack it into the export crate bound for the Backstreets',
        'Lô hàng hoàn thành đúng hạn. Bạn nhận đủ tiền thưởng năng suất mà không ai tra hỏi.',
        'The shipment clears on schedule. You receive full bonus stipends without scrutiny.',
        { wealth: 6, standing: 1, sanity: -4, heat: 2 })
    ],
    I('Bạn đẩy ống thuốc sang khay chờ kiểm duyệt lại.', 'You slide the ampoule into the pending inspection tray.', {})
  ),

  W('m_wing_wcorp_dimension_cleanse', 1, 2,
    '[Khoang hành khách W Corp] Đội dọn dẹp khoang hạng nhất tìm thấy một chiếc vali bọc da cá voi còn vấy máu tươi sau cú nhảy không gian. Bên trong là xấp séc bảo chứng chưa ký tên.',
    '[W Corp Dimension Cleanse] The First-Class cleaning detail recovers a whalebone trunk after a dimensional warp. Inside lies an unsigned bearer draft.',
    [
      C('Chia đôi với đội trưởng đội dọn dẹp để giữ im lặng',
        'Split it with the cleaning foreman to buy silence',
        'Người đội trưởng nhét phong bì vào tạp dề, vỗ vai bạn như một người bạn đồng hành tin cậy.',
        'The foreman slips the envelope into his apron, patting your shoulder as a trusted comrade.',
        { wealth: 18, leverage: 4, sanity: -3 }),
      C('Giao nộp toàn bộ cho phòng thu giữ tang vật',
        'Turn everything over to the Evidence Repository',
        'Biên bản thu giữ được ký nhận. Vài ngày sau, bạn thấy vị Trưởng ban đi chiếc xe hơi mới toanh.',
        'The seizure receipt is signed. Days later, you see the Director arriving in a pristine luxury sedan.',
        { standing: 3, merit: 6, sanity: -2 })
    ],
    I('Bạn đóng nắp vali lại và để đội bảo vệ tự xử lý.', 'You close the trunk lid and let security handle it.', {})
  ),

  W('m_wing_rcorp_hatchery_inspection', 1, 2,
    '[Buồng nhân bản R Corp] Một mẫu nhân bản vượt rào kiểm định tinh thần, ánh mắt của nó nhìn bạn đầy van lơn qua lớp kính dung dịch: "Tôi nhớ tên con gái tôi... xin đừng xóa ký ức."',
    '[R Corp Hatchery Inspection] A clone specimen breaches psychological filters, gazing desperately through the glass: “I remember my daughter’s name... please do not purge.”',
    [
      C('Bấm nút xóa sạch bộ nhớ theo quy chuẩn thao tác',
        'Depress the purge button according to standard manual',
        'Dòng điện xanh lóe lên. Ánh mắt tuyệt vọng trở lại vẻ trống rỗng vô hồn của một người lính hoàn hảo.',
        'Blue currents flash. Desperation fades into the hollow, unblinking stare of a flawless soldier.',
        { standing: 3, merit: 5, sanity: -6 }),
      C('Ghi chú sai lệch thông số để trì hoãn quy trình thanh trừng',
        'Falsify parameters to delay the purge cycle',
        'Mẫu nhân bản được chuyển sang buồng theo dõi bổ sung. Bạn tự hỏi mình vừa trì hoãn cái chết hay kéo dài sự tra tấn.',
        'The specimen is routed to observation. You wonder if you delayed death or prolonged torment.',
        { sanity: 3, leverage: 3, standing: -2 })
    ],
    I('Bạn giao ca lại cho kỹ thuật viên tiếp theo.', 'You hand the console to the incoming shift technician.', {})
  ),

  W('m_wing_cafeteria_whistleblower', 0, 2,
    '[Người tố giác trong căng tin] Một nhà nghiên cứu trẻ run rẩy ngồi đối diện bạn, đẩy qua một chiếc USB: "Bộ phận thí nghiệm đang xả chất thải Singularity xuống cống ngầm D District. Giúp tôi gửi nó cho Seven Association."',
    '[Canteen Whistleblower] A trembling researcher sits across from you, sliding a flash drive: “Research is dumping Singularity runoff into District D sewers. Help me pass this to Seven Association.”',
    [
      C('Báo ngay cho Cục An Ninh Nội Bộ của Wing',
        'Report immediately to Wing Internal Security',
        'Hai nhân viên an ninh mặc vest xám dẫn người nghiên cứu đi ngay trong bữa ăn. Bạn nhận quyết định thăng điểm trung thành.',
        'Two security agents in gray suits escort the researcher away mid-meal. You earn a loyalty badge.',
        { standing: 4, leverage: -2, sanity: -5, merit: 8 }),
      C('Nhận lấy USB và giấu vào hộp trà cá nhân',
        'Accept the drive and conceal it inside your tea tin',
        'Chiếc USB nằm lạnh ngắt trong túi bạn. Một ngày nào đó nó sẽ là chiếc phao cứu sinh hoặc chiếc thòng lọng.',
        'The drive sits cold in your coat. Someday it will be either a life preserver or a noose.',
        { leverage: 8, sanity: -2, network: 2 })
    ],
    I('Bạn đứng dậy đổi sang bàn khác như không thấy gì.', 'You stand up and change tables as if seeing nothing.', { sanity: -1 })
  ),

  W('m_wing_executive_elevator_encounter', 1, 3,
    '[Thang máy điều hành] Giám Đốc Cấp Cao bước vào thang máy riêng. Trong mười lăm giây đi lên tầng thượng, người đó đột ngột hỏi bạn: "Feather, bạn nghĩ tập đoàn này nợ The City hay The City nợ tập đoàn?"',
    '[Executive Elevator Encounter] A Senior Executive steps into the private lift. During the fifteen-second ascent, they ask: “Feather, does this Wing owe The City, or does The City owe this Wing?”',
    [
      C('Đáp: "The City chỉ là bãi rác nếu không có ánh sáng Singularity của ngài."',
        'Answer: “The City is but refuse without our Singularity’s light.”',
        'Vị Giám Đốc khẽ nhếch mép hài lòng: "Biết nịnh đúng chỗ là phẩm chất của người có thể sống sót ở tầng trên."',
        'The Executive smirks with cold approval: “Flattery with precision is how one survives on the upper decks.”',
        { standing: 3, merit: 4, sanity: -2 }),
      C('Đáp: "Cả hai đều đang ăn thịt lẫn nhau, thưa ngài."',
        'Answer: “Both are devouring each other, Director.”',
        'Vị Giám Đốc im lặng nhìn cửa thang máy. Trước khi bước ra, người đó nói: "Ít nhất bạn không mù."',
        'The Executive stares silently at the doors. Before stepping out, they murmur: “At least you are not blind.”',
        { leverage: 4, sanity: 2, standing: 1 })
    ],
    I('Bạn cúi đầu nhìn mũi giày cho đến khi thang dừng.', 'You stare at your shoes until the lift halts.', {})
  ),

  // Rank 2-3: Management & Senior Executive Dilemmas
  W('m_wing_board_leak_trade', 2, 3,
    '[Thương vụ rò rỉ trước phiên họp] Một công ty môi giới bí mật gửi đề nghị mua trước số liệu kết quả tài chính quý của Wing với giá 30 Ahn. Số tiền này bằng cả năm lương của một nhân viên quầy.',
    '[Pre-Board Leak Offer] A shadow brokerage offers 30 Ahn for early access to the quarterly earnings report. It equals a full year’s clerical wage.',
    [
      C('Bán tài liệu qua kênh mã hóa nặc danh',
        'Sell the dossier through an encrypted shadow channel',
        'Tài khoản ngân hàng Thụy Sĩ của bạn tăng số dư ngay lập tức. Cổ phiếu Wing biến động đúng như dự tính.',
        'Your offshore account registers the deposit instantly. Wing stock plunges right on cue.',
        { wealth: 30, leverage: 5, sanity: -4, standing: -2 }),
      C('Cài bẫy người mua và lập công với Chủ tịch Hội đồng',
        'Sting the buyer and deliver the collar to the Board Chairman',
        'Kẻ môi giới bị bắt sống tại điểm hẹn. Chủ tịch đích thân gửi thư khen ngợi sự cảnh giác thép của bạn.',
        'The broker is apprehended at the drop. The Chairman personally commends your iron vigilance.',
        { standing: 5, merit: 12, rep: 4, wealth: 5 })
    ],
    I('Bạn xóa lời nhắn và khóa két sắt tài liệu.', 'You purge the memo and lock the vault.', { standing: 1 })
  ),

  W('m_wing_singularity_radiation_purge', 1, 3,
    '[Báo động rò rỉ bức xạ Singularity] Còi báo động tầng ngầm rú liên hồi. Một van áp suất bị nứt; nếu không có người chịu nhiễm độc vào khóa van tay, toàn bộ khu phức hợp sẽ phát nổ.',
    '[Singularity Radiation Alarm] Sub-level klaxons blare. A pressure valve has cracked; unless someone enters the hot zone to manually crank it, the sector detonates.',
    [
      C('Mặc đồ chì xông vào khóa van cứu sống phân khu',
        'Don lead shielding and brave the hot zone to seal the valve',
        'Bạn vặn chặt bánh lái bằng cả tính mạng. Da bạn phỏng rộp vì bức xạ nhưng hàng trăm Feather được bảo toàn mạng sống.',
        'You crank the wheel with everything you have. Flesh blisters from radiation, but hundreds of Feathers survive.',
        { health: -18, sanity: -6, standing: 8, merit: 18, rep: 6 }),
      C('Hạ cửa ngăn cách khu vực, cô lập sáu nhân viên bên trong',
        'Drop blast doors, sealing the six personnel trapped inside',
        'Cánh cửa thép đóng sầm. Tiếng đập cửa tuyệt vọng tắt lịm sau ba phút. Khu phức hợp an toàn, biên bản ghi: tổn thất tối thiểu.',
        'The blast doors slam shut. Pounding fists fall silent after three minutes. Sector saved; report logs: acceptable loss.',
        { standing: 4, sanity: -8, leverage: 4 })
    ],
    I('Bạn đợi đội ứng phó sự cố khẩn cấp đến.', 'You await the emergency containment squad.', { health: -8, standing: -2 })
  )
];

// ============================================================================
// 2. WING EMPLOYEE EXPANSION DAILIES (Seasonal Nest Living & Corporate Atmosphere)
// ============================================================================

export const WING_PARITY_DAILIES = [
  D('d_wing_fluorescent_dawn', [18, 80], { jobs: ['Wing Employee'] },
    'Ánh đèn huỳnh quang bật sáng rực rỡ lúc 6:00 AM trong khu chung cư Feather. Một ngày tăng ca mới bắt đầu mà không thấy ánh mặt trời.',
    'Fluorescent lights flicker to full brilliance at 6:00 AM across the Feather dormitory. Another overtime shift begins without daylight.',
    { sanity: -1 }),

  D('d_wing_nutrient_paste_canteen', [18, 80], { jobs: ['Wing Employee'] },
    'Bữa sáng tại căng tin là tuýp gel dinh dưỡng tổng hợp vị vani. Bao bì in dòng chữ: “Cơ thể khỏe mạnh là tài sản của tập đoàn.”',
    'Canteen breakfast is a synthetic vanilla nutrition tube stamped: “A sound body is the corporation’s asset.”',
    { health: 1 }),

  D('d_wing_singularity_hum_sleep', [18, 80], { jobs: ['Wing Employee'] },
    'Tiếng máy phát Singularity bên dưới lòng đất rung nhẹ từng đợt qua tường phòng ngủ. Sau ba năm, bạn không thể ngủ nếu thiếu âm thanh này.',
    'The subterranean Singularity generators hum gently through bedroom drywall. After three years, you cannot sleep without it.',
    { sanity: -1 }),

  D('d_wing_quarterly_ranking_board', [18, 80], { jobs: ['Wing Employee'] },
    'Bảng xếp hạng hiệu suất quý được chiếu lên màn hình kính sảnh lớn. Tên bạn nằm ở nhóm an toàn, cách vạch sa thải mười hai bậc.',
    'Quarterly efficiency rankings project across the grand lobby glass. Your name rests in the safe zone, twelve ticks above termination.',
    { merit: 1 }),

  D('d_wing_nest_security_checkpoint', [18, 80], { jobs: ['Wing Employee'] },
    'Qua trạm kiểm soát an ninh Nest, bạn nhìn đám đông Backstreets đứng xếp hàng xin visa lao động dưới mưa lạnh.',
    'Passing the Nest security checkpoint, you glance at the Backstreet crowd queuing in the cold rain for temporary labor passes.',
    { rep: 1 }),

  D('d_wing_mandatory_wellness_check', [18, 80], { jobs: ['Wing Employee'] },
    'Buổi kiểm tra sức khỏe tâm thần định kỳ kết thúc trong hai phút. Chiếc máy in phiếu: “Trạng thái cảm xúc: Phù hợp tiếp tục làm việc.”',
    'The mandatory psychiatric evaluation concludes in two minutes. The terminal prints: “Emotional state: Suitable for active labor.”',
    { sanity: 1 }),

  D('d_wing_executive_car_convoy', [18, 80], { jobs: ['Wing Employee'] },
    'Đoàn xe bọc thép của Hội Đồng Quản Trị chạy qua đại lộ kính. Mọi nhân viên trên vỉa hè đều dừng bước và đứng nghiêm cúi đầu.',
    'The Board of Directors’ armored convoy cruises down the glass boulevard. Every Feather on the sidewalk halts and bows in silence.',
    { standing: 1 }),

  D('d_wing_overtime_coffee_machine', [18, 80], { jobs: ['Wing Employee'] },
    'Máy bán cà phê tự động tầng bốn bị kẹt đồng xu. Một nhân viên phòng nghiên cứu đứng gục đầu vào vỏ máy ngủ thiếp đi.',
    'The fourth-floor vending machine jams on a coin. A research aide slumps against the metal casing, fast asleep.',
    { health: -1, sanity: -1 }),

  D('d_wing_cleanroom_airlock_cycle', [18, 80], { jobs: ['Wing Employee'] },
    'Khí khử trùng xịt mạnh qua buồng chân không trước khi bước vào khu thí nghiệm. Mùi cồn sát khuẩn lấn át mọi ký ức về bụi bặm phố ngầm.',
    'Decontamination jets hiss through the airlock before the laboratory threshold. Antiseptic alcohol drowns every memory of Backstreet dust.',
    { health: 1 }),

  D('d_wing_whispering_breakroom', [18, 80], { jobs: ['Wing Employee'] },
    'Trong phòng nghỉ, hai đồng nghiệp bàn tán về một Trưởng phòng vừa biến mất tối qua sau khi nhận thư triệu tập từ B Corp.',
    'In the breakroom, two peers whisper of a Section Chief who vanished last night after receiving a summons from B Corp.',
    { sanity: -1 })
];

// ============================================================================
// 3. WING EMPLOYEE EXPANSION MAJORS (High-Impact Story Arcs & Singularity Crises)
// ============================================================================

export const WING_PARITY_MAJORS = [
  {
    id: 'wing_arc_singularity_meltdown_containment',
    age: [21, 75],
    major: true,
    weight: 40,
    need: { jobs: ['Wing Employee'], wingRankAtLeast: 1 },
    forbids: ['wing_singularity_meltdown_done', 'Distorted'],
    vi: "[Khủng Hoảng Lò Phản Ứng Singularity] Đêm trực của bạn bị gián đoạn bởi hồi còi đỏ chói tai. Lõi Singularity của Wing đang vượt ngưỡng kiểm soát nhiệt độ; chất lỏng kỳ dị sôi sùng sục và bắt đầu nuốt chửng cấu trúc sàn thí nghiệm. Ban điều hành chuẩn bị ấn nút kích hoạt khí độc tiêu diệt toàn bộ khu vực để giữ bí mật.",
    en: "[Singularity Core Meltdown] Your night shift is shattered by deafening scarlet sirens. The Wing’s Singularity core is breaching thermal containment; aberrant fluids boil and dissolve laboratory decks. Executive control prepares to deploy lethal nerve gas across the sector to safeguard corporate secrets.",
    choices: [
      {
        labelVi: "Dẫn đầu đội kỹ sư xông vào hạ nhiệt thủ công trước khi khí độc xả",
        labelEn: "Lead an engineering detail to manually depressurize before gas deployment",
        need: { stat: { health: [35, 100], sanity: [30, 100] } },
        outcomes: [
          {
            w: 62,
            resultVi: "Bạn và đồng đội đóng thành công van làm lạnh trong gang tấc. Lõi Singularity ổn định trở lại; lệnh xả khí độc bị hủy bỏ. Giám đốc điều hành đích thân xuống gắn huân chương cứu nguy cho bạn.",
            resultEn: "You and your crew seal the coolant bypass in the nick of time. The Singularity stabilizes; the purge protocol aborts. The Director personally descends to pin a medal on your uniform.",
            effects: { standing: +25, merit: +30, rep: +20, wealth: +30 },
            flagsAdd: ['wing_singularity_meltdown_done', 'HeroOfSingularity'],
            recordsAdd: ['singularity_stabilizer']
          },
          {
            w: 38,
            resultVi: "Sóng xung kích từ lõi hất tung bạn qua bức tường hợp kim. Van được đóng lại nhưng hai đồng nghiệp bị dịch Singularity hòa tan; bạn hôn mê ba tuần trong bồn dưỡng sinh.",
            resultEn: "A shockwave from the core hurls you across alloy bulkheads. The valve locks, but two peers dissolve into the substrate; you spend three weeks comatose in a biovat.",
            effects: { health: -30, sanity: -20, standing: +10, merit: +15 },
            flagsAdd: ['wing_singularity_meltdown_done'],
            scarsAdd: ['Bỏng Singularity kỳ dị']
          }
        ]
      },
      {
        labelVi: "Sơ tán qua lối thoát hiểm dành riêng cho quản lý và mang theo mẫu phẩm",
        labelEn: "Evacuate via the executive tunnel, smuggling out a raw Singularity sample",
        outcomes: [
          {
            w: 70,
            resultVi: "Bạn thoát ra ngoài an toàn với lọ mẫu phẩm quý giá. Khu vực bị phong tỏa; một tổ chức tài chính ngầm trả bạn 80 Ahn để sở hữu dữ liệu giải phẫu của Singularity này.",
            resultEn: "You escape safely with the precious vial. The sector is purged; a shadow syndicate pays you 80 Ahn for the unredacted Singularity blueprints.",
            effects: { wealth: +80, leverage: +15, sanity: -10, heat: +20 },
            flagsAdd: ['wing_singularity_meltdown_done', 'SingularitySmuggler']
          },
          {
            w: 30,
            resultVi: "Thanh tra B Corp chặn bạn ngay tại cửa hầm. Mẫu phẩm bị tịch thu; bạn phải đem toàn bộ quỹ đen ra hối lộ để không bị đưa về District 2 xét xử.",
            resultEn: "B Corp auditors intercept you at the tunnel hatch. The sample is confiscated; you surrender your entire hidden reserve to avoid extradition to District 2.",
            effects: { wealth: -50, standing: -20, sanity: -15 },
            flagsAdd: ['wing_singularity_meltdown_done']
          }
        ]
      }
    ]
  },

  {
    id: 'wing_arc_corporate_patent_warfare',
    age: [24, 80],
    major: true,
    weight: 35,
    need: { jobs: ['Wing Employee'], wingRankAtLeast: 1 },
    forbids: ['wing_patent_warfare_done', 'Distorted'],
    vi: "[Chiến Tranh Bằng Sáng Chế Giữa Hai Wing] Wing đối thủ gửi tối hậu thư đòi chuyển giao một sáng chế Singularity phụ trợ, đe dọa tung tài liệu mật về tội ác thử nghiệm của tập đoàn bạn lên Hana Association. Hội đồng cử bạn làm đặc sứ đàm phán cuộc chiến sống còn này.",
    en: "[Inter-Wing Patent Warfare] A rival Wing delivers an ultimatum demanding transfer of an auxiliary Singularity patent, threatening to leak human experimentation records to Hana. The Board dispatches you as plenipotentiary envoy for this existential clash.",
    choices: [
      {
        labelVi: "Dùng các hồ sơ Leverage mật phản công, ép đối thủ phải ký hiệp ước hòa hoãn",
        labelEn: "Counterattack with classified leverage dossiers, forcing an armistice",
        need: { stat: { wealth: [20, 100] } },
        outcomes: [
          {
            w: 65,
            resultVi: "Bạn đặt lên bàn đàm phán bằng chứng về việc đối thủ vi phạm Điều Cấm Kỵ The Head. Phái đoàn đối phương tái mét mặt và chấp nhận ký hiệp ước đình chiến, nhượng lại 20% thị phần Nest.",
            resultEn: "You lay evidence of their Head Taboo violations on the table. Their delegation blanches and signs an unconditional armistice, surrendering 20% Nest market share.",
            effects: { standing: +30, merit: +35, rep: +25, wealth: +45 },
            flagsAdd: ['wing_patent_warfare_done', 'NestDiplomatStar']
          },
          {
            w: 35,
            resultVi: "Đối phương tung sát thủ Shi Association phục kích phái đoàn của bạn ngay tại sảnh khách sạn. Bạn thoát chết nhưng cuộc đàm phán đổ vỡ, kéo theo cuộc chiến tiêu hao khốc liệt.",
            resultEn: "They ambush your delegation with Shi Association assassins in the hotel foyer. You survive, but talks collapse into a protracted war of attrition.",
            effects: { health: -25, sanity: -15, standing: -10 },
            flagsAdd: ['wing_patent_warfare_done']
          }
        ]
      },
      {
        labelVi: "Bán đứng bản sao sáng chế cho đối phương để lấy quốc tịch Nest đối địch",
        labelEn: "Sell a copy to the rival Wing in exchange for rival Nest citizenship",
        costAhn: 10,
        outcomes: [
          {
            w: 80,
            resultVi: "Giao dịch bí mật hoàn tất trong đêm. Bạn nhận một vali đầy kim phiếu và sự bảo hộ của Wing đối thủ; vị thế của bạn trong tập đoàn cũ được thăng chức vì công trạng 'bảo toàn bí mật'.",
            resultEn: "The secret exchange concludes by midnight. You secure a suitcase of bearer drafts and rival protection; your old Wing promotes you for 'safeguarding secrets'.",
            effects: { wealth: +75, leverage: +20, sanity: -8 },
            flagsAdd: ['wing_patent_warfare_done', 'DoubleAgentFeather']
          }
        ]
      }
    ]
  }
];
