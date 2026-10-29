// Short route scenes between career milestones. Each scene can occur once.
export const ROUTE_CONSEQUENCE_EVENTS = [
  {
    id: 'ad_career_second_application',
    age: [16, 45],
    major: true,
    repeatable: true,
    weight: 900,
    need: { jobs: ['Outcast'], notOut: true, flags: ['CareerApplicationFailed'] },
    vi: '[Một chỗ trống khác] Sau một mùa làm thuê, bạn thấy ba lời tuyển người. Quầy Hana, một nhóm chạy hàng đêm và cổng Wing đều đã đổi người xét hồ sơ.',
    en: '[Another opening] After a season of day labor, three employers are hiring. Hana, a night courier crew and the Wing gate all have new clerks.',
    choices: [
      {
        labelVi: 'Nộp lại hồ sơ Fixer', labelEn: 'Apply for a Fixer license again',
        outcomes: [
          { w: 70, setJob: 'Fixer', setFixerGrade: 9, recordsAdd: ['fixer_license'],
            resultVi: 'Một Office nhận bảo lãnh và trả lệ phí. Quầy Hana cấp thẻ Grade 9; hợp đồng đầu tiên đã nằm trong tay bạn.',
            resultEn: 'An Office sponsors you and pays the fee. Hana issues a Grade 9 card with your first contract already attached.',
            effects: { rep: 5, network: 4 }, meritAdd: 2 },
          { w: 30, resultVi: 'Office rút bảo lãnh trước khi hồ sơ đến quầy. Bạn giữ việc làm thuê thêm một mùa.',
            resultEn: 'The Office withdraws its sponsorship before your file reaches Hana. You keep the day job another season.',
            effects: { wealth: 3, sanity: -4 } }
        ]
      },
      {
        labelVi: 'Nhận chuyến hàng đêm', labelEn: 'Take the night courier run',
        outcomes: [
          { w: 75, setJob: 'Syndicate', recordsAdd: ['syndicate_initiate'],
            resultVi: 'Bạn giao đủ hàng. Sáng ra, tên bạn có trong sổ chia phần của nhóm.',
            resultEn: 'You deliver the parcel. By morning your name is in the crew ledger.',
            effects: { wealth: 8, heat: 8, rep: 4 }, meritAdd: 2 },
          { w: 25, resultVi: 'Người nhận hàng không tới. Bạn giữ lại tiền đặt cọc và tránh mặt nhóm đó.',
            resultEn: 'The buyer never comes. You keep the deposit and avoid the crew.',
            effects: { wealth: 3, heat: 3 } }
        ]
      },
      {
        labelVi: 'Thử lại ở cổng Wing', labelEn: 'Try the Wing gate again',
        outcomes: [
          { w: 55, setJob: 'Wing Employee', setWingRank: 0, flagsAdd: ['Feather', 'Nest'], recordsAdd: ['nest_migration'],
            resultVi: 'Ca thử việc còn thiếu người. Bạn nhận thẻ Feather và lịch trực đầu tiên.',
            resultEn: 'The probationary shift is short staffed. You receive a Feather badge and your first schedule.',
            effects: { wealth: 5, network: 5, sanity: -5 }, meritAdd: 2 },
          { w: 45, resultVi: 'Cổng đóng khi bạn còn trong hàng. Bạn quay về bàn nhận ca thuê.',
            resultEn: 'The gate closes while you are still in line. You return to the day labor desk.',
            effects: { wealth: 3, sanity: -3 } }
        ]
      }
    ]
  },
  {
    id: 'wing_route_badge_audit',
    age: [19, 75], major: true, weight: 105,
    need: { jobs: ['Wing Employee'] },
    vi: '[Kiểm thẻ cuối ca] Máy quét giữ lại thẻ của một đồng nghiệp. Hồ sơ ghi họ đã nghỉ việc từ sáng, dù bạn vừa cùng họ hoàn tất ca.',
    en: '[End-of-shift badge check] The scanner keeps a coworker badge. Their file says they were dismissed this morning, though they worked beside you all day.',
    choices: [
      { labelVi: 'Ký xác nhận họ đã làm ca này', labelEn: 'Confirm their shift',
        resultVi: 'Bộ phận nhân sự nhận biên bản. Họ được trả công; tên bạn nằm ngay dưới.',
        resultEn: 'Personnel accepts the report. They are paid, with your name beneath theirs.',
        effects: { standing: -4, network: 6, sanity: 3 }, meritAdd: 9 },
      { labelVi: 'Giao thẻ cho bảo vệ', labelEn: 'Hand the badge to security',
        resultVi: 'Bảo vệ giữ thẻ. Người đồng nghiệp đứng lại phía ngoài cửa xoay.',
        resultEn: 'Security takes the badge. Your coworker remains outside the turnstile.',
        effects: { standing: 5, sanity: -5 }, meritAdd: 6 }
    ]
  },
  {
    id: 'wing_route_shift_transfer',
    age: [20, 75], major: true, weight: 95,
    need: { jobs: ['Wing Employee'] },
    vi: '[Lệnh đổi ca] Một tổ khác thiếu người sau sự cố Singularity. Quản lý hỏi ai tình nguyện nhận ca đêm. Hợp đồng chỉ ghi tiền phụ cấp, không ghi nguyên nhân thiếu người.',
    en: '[Shift transfer] Another unit is short staffed after a Singularity incident. The manager asks for a night volunteer. The contract lists the allowance, not the reason for the vacancy.',
    choices: [
      { labelVi: 'Nhận ca thay', labelEn: 'Take the shift',
        resultVi: 'Bạn nhận thẻ tạm và bước qua cửa kiểm soát. Ca trước chưa được ghi là đã kết thúc.',
        resultEn: 'You take a temporary badge and pass security. The previous shift is still marked active.',
        effects: { wealth: 6, health: -7, standing: 5, sanity: -5 }, meritAdd: 12 },
      { labelVi: 'Yêu cầu biên bản sự cố', labelEn: 'Ask for the incident report',
        resultVi: 'Quản lý đổi sang người khác. Bạn giữ bản sao biên bản trước khi hồ sơ bị khóa.',
        resultEn: 'The manager picks someone else. You keep a copy before the report is sealed.',
        effects: { standing: -3, network: 5, sanity: 2 }, meritAdd: 7 }
    ]
  },
  {
    id: 'wing_route_tcorp_missing_hours',
    age: [20, 70], major: true, weight: 58,
    need: { jobs: ['Wing Employee'], wingEmployerId: 'T' },
    vi: '[Ca làm bị xóa] Bảng chấm công T Corp thiếu một ca của đội bạn. Hộp lưu thời gian vẫn còn niêm phong. Kế toán bảo bạn ký xác nhận trước giờ đổi ca.',
    en: '[A missing shift] T Corp payroll has lost one of your crew shifts. The time cartridge is still sealed. Accounting wants your signature before the handover.',
    choices: [
      { labelVi: 'Mở hộp đối chiếu', labelEn: 'Open the cartridge',
        resultVi: 'Giờ làm hiện đủ trong lõi. Kế toán sửa sổ và ghi tên người đã ký sai.',
        resultEn: 'The hours are intact in the core. Accounting corrects the ledger and names the clerk who signed it.',
        effects: { standing: 5, network: 3, sanity: -3 }, meritAdd: 9 },
      { labelVi: 'Ký và nhận phần bù', labelEn: 'Sign and take the adjustment',
        resultVi: 'Bạn được trả công. Người cùng ca hỏi khi nào phần của họ tới.',
        resultEn: 'You are paid. Your crewmate asks when their share will arrive.',
        effects: { wealth: 7, standing: -5, sanity: -4 }, meritAdd: 3 }
    ]
  },
  {
    id: 'wing_route_kcorp_recall',
    age: [20, 70], major: true, weight: 58,
    need: { jobs: ['Wing Employee'], wingEmployerId: 'K' },
    vi: '[Lệnh thu hồi] K Corp gọi về một lô HP Ampoule sau khi bệnh nhân mọc thêm mô lạ. Bệnh viện bên ngoài Nest vẫn đang dùng số còn lại.',
    en: '[The recall] K Corp recalls a batch of HP Ampoules after patients develop stray tissue. A clinic outside the Nest still holds the rest.',
    choices: [
      { labelVi: 'Đến bệnh viện trước đội thu hồi', labelEn: 'Reach the clinic before the recall crew',
        resultVi: 'Bạn khóa tủ thuốc và để lại biên bản. Bác sĩ giữ một bản sao.',
        resultEn: 'You lock the medicine cabinet and leave a report. The doctor keeps a copy.',
        effects: { health: -5, network: 5, standing: -3 }, meritAdd: 12 },
      { labelVi: 'Chờ lệnh chính thức', labelEn: 'Wait for the signed order',
        resultVi: 'Lệnh tới sau giờ khám. Danh sách bệnh nhân dài thêm một trang.',
        resultEn: 'The order arrives after clinic hours. The patient list gains another page.',
        effects: { standing: 5, sanity: -7 }, meritAdd: 5 }
    ]
  },
  {
    id: 'wing_route_wcorp_unclaimed_bag',
    age: [20, 70], major: true, weight: 58,
    need: { jobs: ['Wing Employee'], wingEmployerId: 'W' },
    vi: '[Hành lý vô chủ] Sau ca khôi phục tàu WARP, một túi xách còn nằm trên toa. Thẻ hành khách ghi tên người đã bước ra ga. Bên trong túi có thư chưa gửi.',
    en: '[Unclaimed baggage] After a WARP restoration shift, a bag remains aboard. Its owner has already left the station. Inside is an unsent letter.',
    choices: [
      { labelVi: 'Chuyển túi qua quầy thất lạc', labelEn: 'Send it to lost property',
        resultVi: 'Quầy đóng dấu nhận. Lá thư đi theo hành lý, không qua tay đội kiểm duyệt.',
        resultEn: 'The desk stamps the receipt. The letter follows the bag without passing through review.',
        effects: { standing: 3, sanity: 3 }, meritAdd: 7 },
      { labelVi: 'Giao cho đội kiểm duyệt', labelEn: 'Hand it to review',
        resultVi: 'Họ giữ lại lá thư. Chiếc túi rỗng được đặt lên băng chuyền.',
        resultEn: 'They retain the letter. The empty bag returns to the conveyor.',
        effects: { standing: 6, network: -3, sanity: -4 }, meritAdd: 9 }
    ]
  },
  {
    id: 'wing_route_rcorp_batch_roster',
    age: [20, 70], major: true, weight: 58,
    need: { jobs: ['Wing Employee'], wingEmployerId: 'R' },
    vi: '[Danh sách đơn vị] R Corp gửi bảng quân số mới. Một người lính có tên trong hai đơn vị cùng giờ. Chỉ một hồ sơ được phép qua cửa kiểm quân.',
    en: '[The unit roster] R Corp sends a new roster. One soldier appears in two units at the same hour. Only one file may pass inspection.',
    choices: [
      { labelVi: 'Báo sai lệch lên chỉ huy', labelEn: 'Report the duplicate',
        resultVi: 'Chỉ huy giữ cả hai hồ sơ. Buổi kiểm quân bị hoãn, tên bạn ở đầu biên bản.',
        resultEn: 'Command holds both files. Inspection is delayed, with your name atop the report.',
        effects: { standing: 5, heat: 4, sanity: -3 }, meritAdd: 10 },
      { labelVi: 'Chọn hồ sơ đã được ký', labelEn: 'Use the signed file',
        resultVi: 'Một người qua cửa. Hồ sơ còn lại biến mất khỏi hệ thống trước giờ ăn.',
        resultEn: 'One soldier passes. The other file is gone before lunch.',
        effects: { standing: 3, sanity: -6 }, meritAdd: 5 }
    ]
  },
  {
    id: 'distort_route_first_hana_notice',
    age: [19, 85],
    major: true,
    weight: 75,
    need: { jobs: ['Distortion'], stat: { heat: [12, 100] } },
    requires: ['Distorted'],
    vi: '[Tờ thông báo ướt mưa] Hana dán bản phác hình dạng bạn lên tường. Mức truy nã còn thấp. Một Fixer đứng dưới mái hiên, đợi người trong hình bước qua.',
    en: '[Rain-soaked notice] Hana has pinned a sketch of your shape to the wall. The bounty is still small. A Fixer waits beneath the awning for its subject to pass.',
    choices: [
      {
        labelVi: 'Lẩn qua đường cống', labelEn: 'Slip through the drain',
        resultVi: 'Bạn đi dưới chân họ. Đến sáng, tờ giấy đã rách vì mưa.',
        resultEn: 'You pass beneath their feet. By morning the notice has torn in the rain.',
        effects: { health: -4, heat: -8, sanity: 3 }, meritAdd: 7,
        flagsAdd: ['distort_hana_notice_done']
      },
      {
        labelVi: 'Để họ nhìn thấy', labelEn: 'Let them see you',
        resultVi: 'Fixer rút kiếm rồi lùi lại. Bản phác mới của Hana sẽ rõ hơn.',
        resultEn: 'The Fixer draws a blade, then retreats. Hana will have a better sketch tomorrow.',
        effects: { health: -8, rep: 9, heat: 12 }, meritAdd: 13,
        flagsAdd: ['distort_hana_notice_done']
      }
    ]
  },
  {
    id: 'distort_route_neighborhood_quarantine',
    age: [22, 90],
    major: true,
    weight: 65,
    need: { jobs: ['Distortion'], meritAtLeast: 35, stat: { heat: [28, 100] } },
    requires: ['Distorted'],
    vi: '[Con phố bị niêm phong] Hai Office dựng rào ở đầu ngõ. Người còn kẹt bên trong gõ cửa sắt gọi tên bạn. Họ biết bạn là nguyên nhân, nhưng cũng biết bạn có thể mở đường.',
    en: '[The sealed street] Two Offices have barricaded the alley. Those trapped inside call your name through the gate. They know why the street was sealed, and who could break it open.',
    choices: [
      {
        labelVi: 'Xé rào cho họ thoát', labelEn: 'Break the gate for them',
        resultVi: 'Cửa bật khỏi bản lề. Đám đông chạy qua bạn mà không dám ngẩng đầu.',
        resultEn: 'The gate tears free. The crowd passes without meeting your eyes.',
        effects: { health: -12, heat: 10, rep: 6, sanity: 5 }, meritAdd: 18,
        flagsAdd: ['distort_quarantine_done']
      },
      {
        labelVi: 'Đánh lạc hướng hai Office', labelEn: 'Draw both Offices away',
        resultVi: 'Họ đuổi theo bạn tới sáng. Khi quay lại, con phố đã trống.',
        resultEn: 'They pursue you until morning. When you return, the street is empty.',
        effects: { health: -18, heat: 18, rep: 12, sanity: -5 }, meritAdd: 24,
        flagsAdd: ['distort_quarantine_done']
      }
    ]
  },
  {
    id: 'syn_indie_route_shared_ledger',
    age: [19, 80],
    major: true,
    weight: 68,
    need: { jobs: ['Syndicate'], noFinger: true, flags: ['IndependentSyndicate'], syndicateRankAtLeast: 1 },
    vi: '[Sổ chia phần] Người thu tiền của bạn mang về hai cuốn sổ. Một cuốn ghi đúng số Ahn; cuốn kia dành cho người đã bỏ mạng. Tiền trong quỹ không đủ trả cả hai.',
    en: '[The split ledger] Your collector brings two ledgers: one for the crew, one for the dead. The fund cannot cover both.',
    choices: [
      {
        labelVi: 'Trả phần cho người chết trước', labelEn: 'Pay the dead crew first',
        resultVi: 'Người sống im lặng khi nhận phần ít hơn. Không ai xé trang sổ kia.',
        resultEn: 'The living take a smaller cut in silence. No one tears out the other page.',
        effects: { wealth: -8, network: 9, rep: 4, heat: -3 }, meritAdd: 12,
        flagsAdd: ['syn_shared_ledger_done']
      },
      {
        labelVi: 'Giữ đủ tiền cho ca sau', labelEn: 'Fund the next run',
        resultVi: 'Ca sau có đủ dao và thuốc. Trên bàn còn cuốn sổ không ai muốn mở.',
        resultEn: 'The next run has blades and medicine. The second ledger stays closed on your desk.',
        effects: { wealth: 6, rep: 7, heat: 8, sanity: -5 }, meritAdd: 16,
        flagsAdd: ['syn_shared_ledger_done']
      }
    ]
  },
  {
    id: 'syn_indie_route_border_dispute',
    age: [21, 85],
    major: true,
    weight: 65,
    need: { jobs: ['Syndicate'], noFinger: true, flags: ['IndependentSyndicate'], syndicateRankAtLeast: 2 },
    vi: '[Vạch phấn ở ngã tư] Một băng khác kẻ ranh giới xuyên qua tuyến giao hàng của bạn. Người đưa thư đứng chờ. Nếu không qua được ngã tư tối nay, hợp đồng sẽ mất.',
    en: '[Chalk at the crossing] Another crew draws its border across your delivery route. The courier waits. If the parcel cannot cross tonight, the contract is gone.',
    choices: [
      {
        labelVi: 'Mua một lối đi', labelEn: 'Buy passage',
        resultVi: 'Phấn được lau đi vừa đủ cho một chuyến. Ngày mai họ sẽ lại cầm phấn.',
        resultEn: 'They wipe away enough chalk for one delivery. They will have more tomorrow.',
        effects: { wealth: -10, network: 8, heat: -4 }, meritAdd: 13,
        flagsAdd: ['syn_border_dispute_done']
      },
      {
        labelVi: 'Đưa cả đội qua ngã tư', labelEn: 'Take the crew across',
        resultVi: 'Hàng đến nơi. Người đưa thư đếm thiếu một cái bóng trên đường về.',
        resultEn: 'The parcel arrives. The courier counts one fewer shadow on the way back.',
        effects: { health: -12, rep: 13, heat: 14, sanity: -7 }, meritAdd: 20,
        flagsAdd: ['syn_border_dispute_done']
      }
    ]
  },
  {
    id: 'shock_tcorp_time_tax_levy',
    age: [18, 90],
    major: true,
    weight: 45,
    need: { regions: ['T', '20'] },
    forbids: ['shock_tcorp_done'],
    vi: '[Thuế thời gian bất thường của T Corp] Tiếng còi hơi từ tháp đồng hồ trung tâm rền rĩ suốt ba hồi. Sắc lệnh mới dán trước cổng trạm: T Corp truy thu thuế thời gian thặng dư của toàn bộ cư dân trong mùa đông này. Người thu thuế đứng trước cửa, mang theo máy hút nhịp tim.',
    en: '[T Corp emergency time levy] Sirens from the central clocktower howl three times. A new decree is nailed to the station door: T Corp levies a surplus time tax on every resident this winter. The collector stands outside with a pulse-siphon device.',
    choices: [
      {
        labelVi: 'Nộp đủ khoản thuế thời gian bằng tiền Ahn',
        labelEn: 'Pay the time tax in Ahn',
        costAhn: 12,
        effects: { wealth: -12, rep: 3 },
        flagsAdd: ['shock_tcorp_done'],
        resultVi: 'Bạn trả đủ tiền để giữ lại thời gian sinh học của mình. Người thu thuế đóng dấu biên lai và bước sang căn hộ bên cạnh.',
        resultEn: 'You pay to preserve your biological hours. The collector stamps the slip and moves to the next flat.'
      },
      {
        labelVi: 'Chấp nhận để máy hút rút bớt sinh lực',
        labelEn: 'Let the siphon take your biological hours',
        effects: { health: -8, sanity: -6 },
        scarsAdd: ['Vết xăm nợ thời gian T Corp'],
        flagsAdd: ['shock_tcorp_done'],
        resultVi: 'Kim hút cắm vào cổ tay. Nhịp tim bạn chậm lại, thế giới chuyển sang tông màu xám lạnh. Bạn già đi trong vài phút.',
        resultEn: 'The needles bite into your wrist. Your pulse slows, the world draining into cold monochrome. You age years in minutes.'
      }
    ]
  },
  {
    id: 'shock_kcorp_ampoule_recall',
    age: [18, 90],
    major: true,
    weight: 42,
    need: { regions: ['K', '11'] },
    forbids: ['shock_kcorp_done'],
    vi: '[Lệnh phong tỏa dược phẩm K Corp] Một lô tinh chất phục hồi bị nhiễm tạp chất từ Tears, khiến hàng chục phòng khám tư nhân phải đóng cửa. Giá thuốc men và ampoule trên chợ đen tăng vọt trong đêm.',
    en: '[K Corp pharmaceutical quarantine] A contaminated batch of restorative essence from the Tears forces dozens of private clinics to shutter. Black market medical supplies double in price overnight.',
    choices: [
      {
        labelVi: 'Chi tiền mua thuốc kháng độc phòng thân',
        labelEn: 'Spend savings on black-market antidotes',
        costAhn: 15,
        effects: { wealth: -15, sanity: 4 },
        flagsAdd: ['shock_kcorp_done'],
        resultVi: 'Bạn mua được hai lọ kháng độc loại cũ. Cửa tiệm kéo sập cửa sắt ngay khi bạn vừa bước ra ngõ.',
        resultEn: 'You secure two vials of older antidote. The shop slams its iron shutters the moment you step outside.'
      },
      {
        labelVi: 'Dùng thảo dược đường phố và tự cách ly',
        labelEn: 'Rely on street herbs and isolate',
        effects: { health: -7, sanity: -5 },
        flagsAdd: ['shock_kcorp_done'],
        resultVi: 'Cơn sốt kéo dài suốt mười ngày. Bạn vượt qua cơn co giật bằng cách uống nước rỉ từ vách đá.',
        resultEn: 'The fever drags on for ten days. You survive the spasms on seepage water dripping from concrete cracks.'
      }
    ]
  },
  {
    id: 'shock_sweeper_extended_purge',
    age: [18, 90],
    major: true,
    weight: 48,
    need: { notNest: true, notOut: true },
    forbids: ['shock_sweeper_done'],
    vi: '[Còi báo 3:13 bị đứt mạch] Tiếng còi báo hết giờ giới nghiêm Night in the Backstreets không reo lúc rạng sáng. Đám Sweeper tiếp tục lê bước dưới ánh mặt trời nhợt nhạt, càn quét từng căn hầm dân cư.',
    en: '[The severed 3:13 siren] The all-clear siren of the Night in the Backstreets fails to sound at dawn. Sweepers continue their relentless sweep under pale morning light, scouring basement shelters.',
    choices: [
      {
        labelVi: 'Gia cố rào chắn và đổ dầu cản lối',
        labelEn: 'Barricade the entrance and burn waste oil',
        effects: { wealth: -5, sanity: -6, rep: 3 },
        flagsAdd: ['shock_sweeper_done'],
        resultVi: 'Lửa chặn bước chân của bầy Sweeper ngoài ngõ. Khói khét lẹt đặc quánh làm mắt bạn cay xè nhưng căn phòng vẫn nguyên vẹn.',
        resultEn: 'Flames hold the Sweepers at bay outside the alley. Acrid smoke burns your eyes, but your shelter holds.'
      },
      {
        labelVi: 'Rút vũ khí nghênh chiến để mở đường thoát cho người quanh khu',
        labelEn: 'Draw your weapon to carve an escape path for neighbors',
        outcomes: [
          {
            w: 65,
            effects: { health: -14, sanity: -8, rep: 16 },
            meritAdd: 14,
            flagsAdd: ['shock_sweeper_done'],
            resultVi: 'Bạn chém gãy ba ống dẫn dịch của chúng trước khi đưa được nhóm người vào ống cống an toàn. Người ở Backstreets sẽ nhớ trận đánh sáng nay.',
            resultEn: 'You sever three fuel lines before herding the survivors into the drainage tunnels. The Backstreets will remember this morning stand.'
          },
          {
            w: 35,
            effects: { health: -24, sanity: -15, rep: 8 },
            scarsAdd: ['Vết cào Sweeper bình minh'],
            flagsAdd: ['shock_sweeper_done'],
            resultVi: 'Móc sắt của Sweeper xé toạc vai bạn. Bạn phải bò vào hốc gạch vụn và nằm im nín thở cho đến khi chúng rời đi.',
            resultEn: 'A Sweeper iron hook tears through your shoulder. You drag yourself into rubble and hold your breath until they leave.'
          }
        ]
      }
    ]
  },
  {
    id: 'veteran_midlife_joint_creak',
    age: [36, 52],
    major: true,
    weight: 55,
    need: { jobs: ['Fixer', 'Syndicate'] },
    forbids: ['veteran_joint_creak_done', 'FullBodyProsthetic'],
    tags: ['veteran', 'attrition'],
    vi: '[Khớp xương mùa lạnh] Gió mùa đông lùa qua khe cửa. Đầu gối và những khớp kim loại cũ của bạn rền rĩ đau buốt sau một đêm tuần tra. Một Fixer trẻ vừa bước qua, mang vũ khí bóng loáng và bước chân không một tiếng động.',
    en: '[Cold winter joints] Winter wind cuts through the doorframe. Your knees and older mechanical joints ache with piercing throbs after a night patrol. A rookie Fixer walks past, gear gleaming, footfalls silent.',
    choices: [
      {
        labelVi: 'Mua dầu bôi trơn chuyên dụng và nẹp tăng cường (Tốn 10 Ahn)',
        labelEn: 'Buy specialized lubricants and reinforced braces (Cost 10 Ahn)',
        costAhn: 10,
        effects: { wealth: -10, health: 4, sanity: 3 },
        flagsAdd: ['veteran_joint_creak_done'],
        resultVi: 'Dầu nóng ngấm vào khớp kim loại. Tiếng cót két biến mất; bước đi của bạn vững vàng trở lại.',
        resultEn: 'Hot lubricant seeps into the steel joints. The grinding ceases; your stride regains its steady pace.'
      },
      {
        labelVi: 'Cắn răng chịu đựng và chuyển sang lối đánh phòng thủ',
        labelEn: 'Endure the ache and adopt a cautious defensive style',
        effects: { health: -4, sanity: -4, resonance: 4 },
        flagsAdd: ['veteran_joint_creak_done'],
        resultVi: 'Bạn không còn lao lên trước. Thay vào đó, bạn quan sát kỹ từng chuyển động của đối phương từ góc khuất.',
        resultEn: 'You no longer rush the vanguard. Instead, you read every enemy twitch from the shadows.'
      }
    ]
  }
];
