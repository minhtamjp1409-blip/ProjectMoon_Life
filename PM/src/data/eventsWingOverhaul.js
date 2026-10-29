// ============================================================================
// WING BRANCH OVERHAUL: CORPORATE GAMBLES, SINGULARITY SECRETS & BOARD COUP
// High-stakes bureaucratic warfare, Singularity perils, and NPC political friction.
// Tailored for the ruthless corporate ladder of The City's Wings.
// ============================================================================

export const WING_OVERHAUL_EVENTS = [
  // 1. High-stakes Singularity Blackmail Gamble
  {
    id: 'wing_singularity_blackmail_wager',
    age: [22, 65],
    major: true,
    weight: 20,
    need: { jobs: ['Wing Employee'], wingRankAtLeast: 1 },
    forbids: ['wing_singularity_blackmail_done'],
    vi: "[Tài Liệu Tuyệt Mật] Trong lúc dọn dẹp kho lưu trữ ngầm, bạn phát hiện một cặp tài liệu có dấu niêm phong đỏ của Giám đốc điều hành: bằng chứng chi tiết về việc Singularity của Wing đang tiêu thụ sinh mạng của cư dân Backstreets để vận hành. Bạn nắm trong tay thứ có thể đánh sập cả chi nhánh.",
    en: "[The Red-Sealed File] While clearing the underground archive, you uncover a binder bearing the executive director's crimson wax seal: precise documentation showing the Wing's Singularity consumes Backstreet lives to maintain its output. You hold what could dismantle the entire branch.",
    choices: [
      {
        labelVi: "Tống tiền Ban Giám Đốc để đổi lấy ghế Trưởng phòng và phụ cấp",
        labelEn: "Blackmail the Executive Board for a Section Chief seat and stock stipends",
        outcomes: [
          {
            w: 52,
            resultVi: "Ban Giám Đốc tái mặt trước các bản sao không thể chối cãi. Để bịt miệng bạn trong êm thấm, họ ký quyết định thăng chức bạn lên Trưởng phòng cùng khoản ngân phiếu kếch xù. Từ hôm nay bạn là người bước vào vòng trong của quyền lực.",
            resultEn: "The directors paled before undeniable duplicates. To secure your silence, they signed your appointment to Section Chief alongside a massive draft. From today you walk within the inner circle of power.",
            effects: { standing: +20, leverage: +24, wealth: +45 },
            setWingRank: 2,
            flagsAdd: ['wing_singularity_blackmail_done', 'FeatherNắmThópCorp'],
            meritAdd: 32
          },
          {
            w: 48,
            resultVi: "Đội kiểm soát nội bộ ập vào phòng bạn lúc rạng sáng. Tập tài liệu bị thiêu hủy; bạn bị tịch thu toàn bộ tài sản tích lũy và điều chuyển xuống ca làm việc thấp nhất.",
            resultEn: "Internal security raided your quarters before dawn. The dossier was incinerated; your accumulated savings were seized and you were demoted to the lowest graveyard shift.",
            effects: { standing: -25, leverage: -15, wealth: -25, sanity: -15 },
            flagsAdd: ['wing_singularity_blackmail_done']
          }
        ]
      },
      {
        labelVi: "Đem nộp nguyên vẹn cho cấp trên để chứng minh lòng trung thành",
        labelEn: "Hand it untouched to your superior to prove absolute loyalty",
        resultVi: "Vị Giám đốc nhìn bạn hồi lâu rồi đưa tập tài liệu vào máy cắt vụn. Lòng trung thành mù quáng của bạn được ghi nhận vào hồ sơ bảo mật với điểm tín nhiệm cao.",
        resultEn: "The director watched you for a long moment before feeding the binder into the shredder. Your blind obedience was entered into the sealed register with high clearance marks.",
        effects: { standing: +18, leverage: -8, sanity: -6 },
        flagsAdd: ['wing_singularity_blackmail_done'],
        meritAdd: 16
      }
    ]
  },

  // 2. Departmental Coup with personal rival
  {
    id: 'wing_department_coup_with_rival',
    age: [24, 65],
    major: true,
    weight: 18,
    need: { jobs: ['Wing Employee'], wingRankAtLeast: 1, npc: 'rival' },
    forbids: ['wing_rival_coup_done'],
    vi: "[Cuộc Đảo Chính Phòng Ban] Chiếc ghế Trưởng phòng phụ trách nhân sự đang để trống. Cả bạn và {rival} đều là hai ứng viên sáng giá nhất. {rival} gửi cho bạn một mẩu giấy hẹn gặp sau giờ làm, đề nghị liên minh tạm thời để hạ bệ vị Giám đốc già nua trước đại hội cổ đông.",
    en: "[The Section Coup] The Section Chief chair for personnel sits vacant. Both you and {rival} stand as the leading candidates. {rival} leaves an after-hours note proposing a temporary truce to topple the aging Director before the shareholders convene.",
    choices: [
      {
        labelVi: "Đâm sau lưng {rival} bằng cách nộp chứng cứ gian lận của cả hai lên hội đồng",
        labelEn: "Backstab {rival} by exposing their fraudulent ledgers directly to the board",
        outcomes: [
          {
            w: 56,
            resultVi: "Cú đánh bất ngờ tại cuộc họp khiến {rival} chết đứng. Hội đồng lập tức cách chức vị Giám đốc và trục xuất {rival} khỏi Nest. Chiếc ghế Trưởng phòng được trao trọn vẹn vào tay bạn trong tiếng vỗ tay tán thưởng.",
            resultEn: "Your ambush at the assembly left {rival} speechless. The board stripped the Director of authority and expelled {rival} from the Nest. The chief seat fell into your hands amid polite applause.",
            effects: { standing: +25, leverage: +20, rep: +25 },
            setWingRank: 2,
            flagsAdd: ['wing_rival_coup_done', 'KẻThaoTúngPhòngHọp'],
            meritAdd: 34
          },
          {
            w: 44,
            resultVi: "{rival} đã đi trước một bước, ngụy tạo tài liệu khiến mọi bằng chứng quay lại tố cáo bạn. Bạn bị tước toàn bộ quyền biểu quyết và phạt giam ba mươi ngày.",
            resultEn: "{rival} had anticipated the maneuver, forging records that reflected the blame entirely onto you. You lost all voting authority and were confined for thirty days.",
            effects: { standing: -28, sanity: -18, rep: -14 },
            flagsAdd: ['wing_rival_coup_done']
          }
        ]
      },
      {
        labelVi: "Bắt tay giữ đúng giao kèo để chia sẻ quyền quản lý ngân sách",
        labelEn: "Honor the pact with {rival} to divide departmental budget control",
        resultVi: "Cả hai phối hợp nhịp nhàng ép vị Giám đốc từ chức trong êm đẹp. Bạn và {rival} cùng nắm giữ các mắt xích quan trọng nhất của phòng ban.",
        resultEn: "Both operated in unison, forcing the Director into quiet retirement. You and {rival} divided the section's vital levers of control between yourselves.",
        effects: { standing: +12, leverage: +15, network: +18 },
        flagsAdd: ['wing_rival_coup_done'],
        meritAdd: 20
      }
    ]
  },

  // 3. T Corp Time Harvest Wager in District 4
  {
    id: 'wing_tcorp_time_harvest_gamble',
    age: [20, 60],
    major: true,
    weight: 22,
    need: { jobs: ['Wing Employee'], wingEmployerId: 'T', regions: ['T'] },
    vi: "[Chỉ Tiêu Sắc Tố Thời Gian] Trụ sở T Corp giao chỉ tiêu khẩn: thu hồi lượng thời gian tồn đọng từ các khu xóm đang nợ thuế. Chiếc máy nén sắc tố thời gian cầm tay trên bàn bạn rung lên bần bật: nếu ép van công suất cao, bạn có thể hoàn thành chỉ tiêu cả quý trong một đêm.",
    en: "[Time Pigment Quota] T Corp headquarters issues an urgent directive: harvest overdue time debts from delinquent quarters. The handheld pigment condenser on your desk rattles violently: running it at maximum compression could clear the quarterly quota in a single night.",
    choices: [
      {
        labelVi: "Vặn van áp suất cực đại cưỡng chế hút sạch sắc tố trong một lượt",
        labelEn: "Crank the valve to maximum pressure to extract all pigment in one sweep",
        outcomes: [
          {
            w: 58,
            resultVi: "Máy nén vận hành trơn tru. Dòng chất lỏng thời gian màu hổ phách lấp đầy các ống nghiệm thủy tinh. T Corp ghi nhận thành tích xuất sắc, thưởng đậm Ahn và nâng bậc tín nhiệm cho bạn.",
            resultEn: "The condenser ran without a hitch. Amber time fluid filled every glass ampoule. T Corp logged an exemplary yield, granting an Ahn bonus and advancing your clearance.",
            effects: { standing: +22, wealth: +35 },
            flagsAdd: ['ChuyênViênThờiGianTCorp'],
            meritAdd: 25
          },
          {
            w: 42,
            resultVi: "Van áp suất nổ tung. Bụi thời gian rò rỉ khiến cả dãy phòng bị lão hóa nhanh gấp mười lần; bạn bị T Corp bắt đền bù chi phí sửa chữa máy móc Singularity đắt đỏ.",
            resultEn: "The pressure valve ruptured. Leaking time dust aged the corridor tenfold in seconds; T Corp deducted the costly Singularity repairs directly from your account.",
            effects: { wealth: -30, standing: -18, sanity: -12 }
          }
        ]
      },
      {
        labelVi: "Thu thuế từng hộ theo quy trình an toàn có bảo hộ",
        labelEn: "Harvest household by household following standard safety protocols",
        resultVi: "Bạn đi lại suốt hai tuần lễ, hoàn thành vừa đủ chỉ tiêu quy định. Công việc tẻ nhạt nhưng an toàn cho tính mạng.",
        resultEn: "You trudged for two weeks, meeting the bare minimum baseline. The routine was dreary but preserved your neck intact.",
        effects: { standing: +10, wealth: +15 },
        meritAdd: 12
      }
    ]
  },

  // 4. W Corp Warp Car Incident & Saving Friend
  {
    id: 'wing_warp_cleanup_dilemma',
    age: [22, 65],
    major: true,
    weight: 20,
    need: { jobs: ['Wing Employee'], wingEmployerId: 'W', regions: ['W'], npc: 'friend' },
    forbids: ['wing_warp_incident_done'],
    vi: "[Sự Cố Toa Tàu Số Bốn] Một chuyến tàu WARP cập ga District 23 sau hành trình kẹt chiều không gian. Khi mở cửa toa tàu số bốn, bạn bàng hoàng nhận ra trong khối thịt biến dạng gào thét có {friend}, người bạn thuở nhỏ của bạn. Cỗ máy phục hồi nguyên tử của W Corp sắp kích hoạt chế độ xóa sổ để tiêu hủy dấu vết.",
    en: "[The Car Four Anomaly] A WARP train docks at District 23 after being adrift between dimensions. When opening car four, you discover that among the screaming masses of flesh lies {friend}, your childhood companion. The W Corp atomic restorer is about to initiate full purge to erase all traces.",
    choices: [
      {
        labelVi: "Dùng mã bảo mật cá nhân can thiệp tách {friend} ra trước lệnh tiêu hủy",
        labelEn: "Use your clearance code to extract {friend} before the purge cycle",
        outcomes: [
          {
            w: 55,
            resultVi: "Bạn thao tác chuẩn xác từng phần nghìn giây, tách rời cấu trúc sinh học của {friend} và phục hồi nguyên vẹn cơ thể người bạn trước khi cỗ máy nghiền nát toa tàu. {friend} sống sót và mang ơn cứu mạng suốt đời.",
            resultEn: "You executed the manual override within milliseconds, separating {friend}'s biology and restoring their body whole before the machinery pulverized the car. {friend} survived, indebted to you forever.",
            effects: { sanity: +25, resonance: +20, network: +25 },
            flagsAdd: ['wing_warp_incident_done'],
            scarsAdd: ['Người dám mở khóa toa tàu WARP'],
            meritAdd: 30
          },
          {
            w: 45,
            resultVi: "Hệ thống báo lỗi quá tải. Sóng phản xạ không gian đánh gãy cánh tay bạn; {friend} tan biến vĩnh viễn trong cỗ máy. W Corp xử phạt bạn vì can thiệp quy trình vận hành.",
            resultEn: "The console registered a catastrophic overload. Spatial feedback shattered your arm; {friend} dissolved forever in the machine. W Corp penalized your standing for breach of protocol.",
            effects: { health: -30, sanity: -25, standing: -20 },
            flagsAdd: ['wing_warp_incident_done']
          }
        ]
      },
      {
        labelVi: "Nhắm mắt nhấn nút xóa sổ để bảo toàn thân phận Feather",
        labelEn: "Close your eyes and press the purge trigger to protect your Feather status",
        resultVi: "Toàn bộ toa tàu bị nghiền thành bột mịn vô trùng. Bạn nộp biên bản hoàn tất mà không run tay, nhưng tiếng gào của {friend} sẽ theo bạn vào từng giấc ngủ.",
        resultEn: "The car was reduced to sterile dust. You filed the completion report without a trembling hand, yet {friend}'s screams would follow you into every slumber.",
        effects: { standing: +15, wealth: +20, sanity: -20 },
        flagsAdd: ['wing_warp_incident_done'],
        scarsAdd: ['Ám ảnh toa tàu số 4']
      }
    ]
  },

  // 5. Board Apex: Hostile Boardroom Takeover
  {
    id: 'wing_board_apex_hostile_takeover',
    age: [30, 75],
    major: true,
    weight: 16,
    need: { jobs: ['Wing Employee'], wingRankAtLeast: 2 },
    forbids: ['wing_board_apex_done'],
    vi: "[Đại Chiến Hội Đồng Quản Trị] Phòng họp bọc kính chống đạn trên đỉnh tháp Corp mở ra cho phiên họp bỏ phiếu đặc biệt. Một thành viên cốt cán vừa qua đời; chiếc ghế Hội Đồng Quản Trị danh giá nhất đang được đem ra tranh đoạt. Ai nắm được ghế này sẽ có quyền sinh sát đối với hàng ngàn Feather cấp dưới.",
    en: "[The Boardroom Takeover] The bulletproof glass conference room at the tower summit convenes for a decisive ballot. A core director has mysteriously passed; the most coveted Board Member seat is open for succession. Whoever claims it holds life and death authority over thousands of Feathers.",
    choices: [
      {
        labelVi: "Tung toàn bộ hồ sơ Leverage và tài sản để thâu tóm phiếu biểu quyết",
        labelEn: "Unleash your entire vault of Leverage and wealth to force the vote",
        outcomes: [
          {
            w: 56,
            resultVi: "Bạn tung ra từng tập hồ sơ nắm thóp các thành viên có mặt. Không ai dám phản đối; bạn chính thức bước lên đỉnh cao quyền lực: Thành viên Hội Đồng Quản Trị Wing. Tên bạn được khắc lên bảng đồng của tập đoàn.",
            resultEn: "You tabled confidential dossiers against every voting member present. None dared dissent; you ascended to the absolute peak of corporate power: Wing Board Member. Your name was etched onto the brass monument.",
            effects: { standing: +35, leverage: +30, wealth: +60, rep: +50 },
            setWingRank: 3,
            flagsAdd: ['wing_board_apex_done', 'BoardMemberApex', 'ChủNhânCủaNest'],
            meritAdd: 50
          },
          {
            w: 44,
            resultVi: "Các bô lão lâu năm liên kết phong tỏa tài khoản ngân hàng của bạn. Bạn giữ được mạng nhưng bị tước sạch quyền hành, bị điều chuyển sang chi nhánh xa xôi hẻo lánh.",
            resultEn: "The senior directors formed an alliance, freezing your assets. You preserved your life but lost all authority, reassigned to a remote border facility.",
            effects: { standing: -35, wealth: -40, sanity: -20 },
            flagsAdd: ['wing_board_apex_done']
          }
        ]
      },
      {
        labelVi: "Bỏ phiếu an toàn cho phe đa số để củng cố ghế Giám đốc",
        labelEn: "Cast a safe ballot for the majority faction to secure your Director chair",
        resultVi: "Bạn đứng về phía kẻ chiến thắng, giữ vững vị trí Giám đốc bộ phận và nhận một khoản cổ tức kếch xù từ ngân sách quý.",
        resultEn: "You allied with the prevailing faction, securing your Department Director chair and receiving a handsome dividend from the quarterly surplus.",
        effects: { standing: +18, wealth: +25 },
        flagsAdd: ['wing_board_apex_done'],
        meritAdd: 20
      }
    ]
  }
];
