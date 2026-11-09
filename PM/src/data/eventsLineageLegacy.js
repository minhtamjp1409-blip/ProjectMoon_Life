// ============================================================================
// LINEAGE & GENERATIONAL LEGACY EVENTS (ADULT ARCS)
// Narrative turning points for characters inheriting from ancestors
// (HuyếtThốngKếThừa, NợMáuĐờiTrước).
// Fulfills the generational promise: +Starting Ahn, Heirloom & Ancestral consequences.
// ============================================================================

export const LINEAGE_LEGACY_EVENTS = [
  // 1. Confrontation over ancestral blood debt with The Middle
  {
    id: 'm_lineage_vendetta_confrontation',
    age: [18, 35],
    major: true,
    weight: 15,
    requires: ['NợMáuĐờiTrước'],
    vi: "[Nợ máu đời trước] Một Great Sister cùng toán chấp pháp chặn lối rẽ vào ngõ hẹp. Trang giấy trong cuốn Book of Vengeance mở ra, vết mực tím ghi tên {parentName} nối liền với tên bạn. \"Nợ của đời trước, tính cả lãi hai mươi năm. Gãy hai tay và nộp 60 Ahn, hoặc bước vào vòng đấu để xóa tên.\"",
    en: "[Blood Debt: The Middle's Decree] A Great Sister and her enforcers block the alley mouth. The Book of Vengeance lies open, yellowed pages stained with purple ink where {parentName}’s name is bound to yours by a dark scarlet stroke. “The debt of the preceding generation, compounded by twenty years of interest. Either shatter both your forearms and surrender 60 Ahn, or step into the duel ring to purge the ink.”",
    choices: [
      {
        labelVi: "Bước vào vòng đấu để xóa tên",
        labelEn: "Step into the duel ring and settle the debt in blood",
        resultVi: "Xích sắt đập vào vũ khí của bạn làm gãy hai xương sườn trước khi bạn khóa được cổ tay Great Sister. Bà ta dừng tay, gật đầu một cái rồi gạch bút lông ngang tên dòng họ bạn trên trang sổ.",
        resultEn: "Your weapon met heavy iron chains with a spray of sparks. Though bruised and nursing two fractured ribs, you broke the Great Sister’s hold. She gave a curt nod and drew a thick stroke through your family’s line in the Book of Vengeance.",
        effects: { health: -22, sanity: +8, rep: +20, resonance: +18, heat: -25 },
        flagsRemove: ['NợMáuĐờiTrước'],
        scarsAdd: ['Chiến tích xóa tên khỏi Sổ Thù'],
        meritAdd: 25
      },
      {
        labelVi: "Nộp tiền tích góp để đền bù",
        labelEn: "Surrender your accumulated wealth to buy out the grievance",
        resultVi: "Từng cọc Ahn bạn gom góp được xếp vào rương sắt của The Middle. Nắp rương đóng sập, cuốn sổ gấp lại. Bạn trắng tay nhưng hai cánh tay còn lành lặn để đi tiếp.",
        resultEn: "Every stack of Ahn you had bled to gather was handed over to the Middle. The iron chest latched shut; the book was closed. You were penniless, but your limbs were unbroken to see another dawn.",
        effects: { wealth: -45, sanity: -8, heat: -30 },
        flagsRemove: ['NợMáuĐờiTrước'],
        scarsAdd: ['Chuộc thân khỏi Sổ Thù']
      },
      {
        labelVi: "Tung khói mù, rút qua ngách ngầm",
        labelEn: "Use Backstreet alleyways to spring an ambush and vanish",
        resultVi: "Bạn ném ống khói mù rồi lách qua đường cống ngầm đã dò sẵn từ trước. Toán chấp pháp mất dấu ở ngã ba, nhưng dòng tên trong cuốn sổ vẫn còn nguyên.",
        resultEn: "You detonated smoke canisters and led the enforcers into a maze of chemical runoffs you had scouted in advance. You shook them off, but knew full well the Middle never forgets an unpaid ledger.",
        effects: { health: -10, sanity: -6, network: +16, heat: +20, resonance: +12 },
        flagsAdd: ['BóngMaNgõTối'],
        meritAdd: 12
      }
    ]
  },

  // 2. Sworn patronage from an old ally of the parent
  {
    id: 'm_lineage_sworn_patronage',
    age: [18, 32],
    major: true,
    weight: 14,
    requires: ['HuyếtThốngKếThừa'],
    forbids: ['NợMáuĐờiTrước'],
    vi: "[Người mang ơn cũ] Chủ một Workshop lâu năm cho người đón bạn lên phòng làm việc. Nhiều năm trước, {parentName} từng kéo bà ta ra khỏi cuộc thanh trừng ở Backstreets. \"Cách cháu cầm vũ khí giống hệt người đó. Ta còn nợ một mạng, giờ trả dần.\"",
    en: "[An Old Obligation] The master of a high-tier Workshop sends an escort inviting you to a tower rooftop. Long ago, {parentName} dragged them out of a slaughter in the Backstreets. “Your eyes and your stance are identical to theirs back then. I carried a debt of life, and today I begin paying it back.”",
    choices: [
      {
        labelVi: "Nhận tiền mặt và linh kiện từ Workshop",
        labelEn: "Accept the workshop funding and custom armaments",
        resultVi: "Bà chủ Workshop đẩy qua bàn hòm linh kiện thay thế cùng xấp ngân phiếu đã ký sẵn. Trang bị của bạn được chỉnh lại ngay trong đêm, còn giới môi giới quanh quận bắt đầu nhắc đến tên người thừa kế của {parentName}.",
        resultEn: "The Workshop master handed you a case of high-grade augments alongside a substantial Ahn draft. Your gear was upgraded on the spot, and your name as {parentName}’s heir traveled through the district.",
        effects: { wealth: +30, network: +18, rep: +16 },
        flagsAdd: ['BảoHộTiềnNhân'],
        meritAdd: 18
      },
      {
        labelVi: "Xin học lại thói quen giữ nhịp thở và ra đòn của đời trước",
        labelEn: "Ask for hard lessons and ancestral combat techniques instead of coin",
        resultVi: "Ba tháng tập ở sân sau xưởng để lại vài vết bầm dọc xương sườn, nhưng tay bạn không còn thừa động tác khi rút vũ khí. Đó là lối đánh mà {parentName} từng dùng để sống sót.",
        resultEn: "Through three months of relentless sparring, fresh bruises faded into hardened muscle. Your breath control and reflexes reached a new plateau, fully grasping the martial legacy {parentName} practiced.",
        effects: { health: -12, sanity: +14, rep: +24, resonance: +18 },
        flagsAdd: ['DiHuấnChiếnTrận'],
        meritAdd: 24
      },
      {
        labelVi: "Cảm ơn rồi từ chối nhận đồ",
        labelEn: "Politely decline, declaring you will stand on your own merits",
        resultVi: "Bà chủ xưởng nhìn bạn một lúc rồi đóng nắp hòm lại. \"Tính nết vẫn y như thế.\" Bà không ép nữa, chỉ bảo thợ gác cổng nhớ mặt bạn phòng khi cần chỗ trú.",
        resultEn: "The Workshop master blinked in surprise, then gave a hearty laugh. “Just like them after all.” Though you took no handouts, your fierce self-reliance steeled your resolve and deepened your presence.",
        effects: { sanity: +22, rep: +18, resonance: +22 },
        flagsAdd: ['ÝChíTựLập'],
        meritAdd: 20
      }
    ]
  },

  // 3. The predecessor's record can guide a choice; it carries no E.G.O of its own.
  {
    id: 'm_lineage_relic_resonance',
    age: [20, 36],
    major: true,
    weight: 12,
    requires: ['HuyếtThốngKếThừa'],
    vi: "[Địa chỉ bị gạch] Kèm theo 「{relic}」 là một mẩu giấy ghi tên {parentName} và địa chỉ đã bị gạch đi. Không có lời giải thích. Địa chỉ ấy vẫn còn trên bản đồ.",
    en: "[The Crossed-Out Address] A scrap of paper came with the keepsake. It bears {parentName}’s name and a crossed-out address, with no explanation. The address is still on the map.",
    choices: [
      {
        labelVi: "Tìm đến địa chỉ ấy",
        labelEn: "Go to the address",
        resultVi: "Căn phòng đã đổi chủ. Người gác cửa nhớ {parentName}, nhưng chỉ chịu nói sau khi bạn trả tiền cho hồ sơ cũ. Bạn mang về một cái tên để hỏi tiếp.",
        resultEn: "The room has a new tenant. The doorman remembers {parentName}, but asks for payment before showing you the old register. You leave with one name to follow up.",
        effects: { wealth: -5, network: +6, sanity: -2 },
        flagsAdd: ['DiHuấnĐãĐọc']
      },
      {
        labelVi: "Nhờ người của Seven tra hồ sơ",
        labelEn: "Ask Seven to trace the record",
        resultVi: "Seven tìm được tên người thuê cũ và một biên bản đã bị niêm phong. Họ giữ bản gốc. Bạn nhận bản sao có hai dòng bị bôi đen.",
        resultEn: "Seven finds the former tenant and a sealed report. They keep the original. Your copy has two lines blacked out.",
        effects: { wealth: -10, network: +4 },
        flagsAdd: ['HồSơTiềnNhân']
      },
      {
        labelVi: "Cất mẩu giấy đi",
        labelEn: "Put the scrap away",
        resultVi: "Bạn cất mẩu giấy cùng 「{relic}」 vào ngăn tủ. Nếu có câu trả lời, người đã khuất không để lại ở đây.",
        resultEn: "You put the scrap and the keepsake in a drawer. If the dead had an answer, they did not leave it here.",
        effects: { sanity: +6 },
        flagsAdd: ['KỷVậtNgủYên']
      }
    ]
  },

  {
    id: 'm_lineage_ego_witness',
    age: [18, 48],
    major: true,
    once: true,
    weight: 14,
    requires: ['AncestorHadEGO'],
    vi: '[Người từng chứng kiến] Một người từng làm cùng {parentName} tìm đến bạn. Họ kể về lần người ấy bộc lộ E.G.O, rồi đặt lên bàn bản sao lời khai. Họ hỏi bạn có muốn giữ nó không.',
    en: '[The Witness] A former colleague of {parentName} finds you. They recount the day your predecessor manifested E.G.O, then place a copy of their statement on the table. They ask if you want it.',
    choices: [
      {
        labelVi: 'Nhận bản sao và hỏi thêm',
        labelEn: 'Take the copy and ask more',
        resultVi: 'Người ấy kể thêm một việc {parentName} đã làm sau hôm đó. Bạn ghi lại lời kể, kể cả chỗ họ không nhớ rõ.',
        resultEn: 'They tell you what {parentName} did afterward. You write it down, including the parts they cannot recall clearly.',
        effects: { network: 5, sanity: -2 },
        flagsAdd: ['ĐãNgheChuyệnEGOĐờiTrước']
      },
      {
        labelVi: 'Để bản sao lại',
        labelEn: 'Leave the copy behind',
        resultVi: 'Bạn cảm ơn họ. Chuyện của {parentName} vẫn là chuyện của người ấy; bạn còn việc của mình.',
        resultEn: 'You thank them. {parentName}’s story remains theirs; you have your own life to attend to.',
        effects: { sanity: 5 },
        flagsAdd: ['KhướcTừCáiBóngEGO']
      }
    ]
  },

  // 4. Living Ancestor Echo: Ancestor was a Color Fixer
  {
    id: 'm_lineage_color_shadow_trial',
    age: [19, 36],
    major: true,
    weight: 16,
    requires: ['AncestorWasColor'],
    forbids: ['Distorted'],
    vi: "[Cái bóng của Color] Một thanh tra Hana đặt hồ sơ của {parentName} lên bàn. Ông nhìn tên bạn rồi nói: \"Danh hiệu Color không truyền đời. Muốn được xét, hãy nộp việc của chính mình.\"",
    en: "[A Color's Shadow] A Hana evaluator sets {parentName}’s file on the desk. He reads your name and says, “A Color title is not inherited. Submit your own record if you want to be considered.”",
    choices: [
      {
        labelVi: "Nhận bài kiểm tra thực chiến ngay tại sân tập Hana",
        labelEn: "Accept an immediate live-combat evaluation in the Hana courtyard (Trial by combat)",
        outcomes: [
          {
            w: 65,
            resultVi: "Trước mặt các Fixer trực sảnh, bạn đỡ ba đòn của viên thanh tra theo thế thủ học từ {parentName} rồi trả đòn vào sườn ông ta. Máu rỉ qua kẽ tay, nhưng ông ta tra kiếm vào vỏ và ký giấy ghi nhận công trạng.",
            resultEn: "Under the gaze of dozens of Fixers, you parried three lethal strikes using {parentName}’s stance and countered cleanly. Blood dripped from your knuckles, yet the evaluator sheathed his blade and logged a special merit commendation.",
            effects: { health: -16, sanity: +8, rep: +22, resonance: +14, heat: +6 },
            flagsAdd: ['ProdigyFixer'],
            meritAdd: 24
          },
          {
            w: 35,
            resultVi: "Áp lực từ cái tên {parentName} khiến bạn chậm nửa nhịp. Đòn khảo sát đánh bật vũ khí khỏi tay; vai bạn rách một đường sâu.",
            resultEn: "The weight of {parentName}’s name slows you by half a beat. The evaluator knocks your weapon aside and cuts deep into your shoulder.",
            effects: { health: -24, sanity: -12, rep: -6, resonance: +8 },
            scarsAdd: ['Thất bại dưới bóng Color tiền bối'],
            meritAdd: 8
          }
        ]
      },
      {
        labelVi: "Đưa con dấu cũ của tiền nhân để vào thẳng phòng môi giới",
        labelEn: "Leverage your predecessor's prestige to access upper-tier brokerage (Trade pride for access)",
        resultVi: "Bạn từ chối đấu tập và đặt con dấu cũ của {parentName} lên bàn. Các tay môi giới mở cửa phòng riêng cho bạn, nhưng đám Fixer thực chiến ngoài hành lang nhìn bạn bằng ánh mắt khinh rẻ, còn kẻ thù cũ của đời trước bắt đầu hỏi thăm.",
        resultEn: "You declined the duel and presented {parentName}’s old seal. Brokers opened their parlors, yet combat Fixers openly disdained riding a predecessor’s coattails, and old enemies immediately caught your scent.",
        effects: { wealth: +22, network: +16, rep: -8, heat: +10 },
        meritAdd: 10
      },
      {
        labelVi: "Đẩy trả hồ sơ, từ chối diện xét duyệt gia tộc",
        labelEn: "Renounce the comparison and walk a path unbound by their name",
        resultVi: "Bạn trả lại tập hồ sơ và gạch tên khỏi danh sách ưu tiên của gia đình. Vài đầu mối cũ ngừng liên lạc, nhưng bạn không còn phải nghe ai nhắc đến cái bóng của người đi trước.",
        resultEn: "You pushed the dossier back and forfeited all hereditary privileges. Your cold refusal cost you ready-made connections, yet steadied your mind and sharpened your own identity.",
        effects: { sanity: +14, resonance: +14, network: -10, rep: -4 },
        meritAdd: 14
      }
    ]
  },

  // 5. Living Ancestor Echo: Ancestor became a Distortion
  {
    id: 'm_lineage_distortion_labyrinth_echo',
    age: [20, 38],
    major: true,
    weight: 16,
    requires: ['AncestorWasDistortion'],
    vi: "[Dư chấn Distortion] Khu phố nơi {parentName} biến đổi vẫn bị Hana phong tỏa. Bạn tìm được tên người ấy trong biên bản trực chốt. Đêm đó, sương dị dạng lại tràn qua hàng rào.",
    en: "[Distortion Aftermath] Hana still cordons off the block where {parentName} transformed. Their name appears in the checkpoint log. That night, the altered fog spills across the barricade again.",
    choices: [
      {
        labelVi: "Bước qua rào chắn, tìm cách hạ gục phần xác còn sót lại",
        labelEn: "Step into the core, confront the remnant, and grant them release",
        outcomes: [
          {
            w: 60,
            resultVi: "Tiếng ù đặc trong sương làm tai bạn rỉ máu, nhưng bạn vẫn áp sát và chém vỡ lớp vỏ dị dạng còn mang dáng dấp {parentName}. Khi khối sương tan hẳn, nhịp cộng hưởng nặng nề dội ngược vào lồng ngực bạn.",
            resultEn: "Amidst mind-crushing pressure, you endured dozens of psychic lacerations to sever the shell of despair caging {parentName}’s echo. As the figure dissolved, a fierce resonance surged into your soul.",
            effects: { health: -20, sanity: -8, resonance: +24, rep: +16 },
            scarsAdd: ['Người giải thoát dư ảnh Distortion'],
            meritAdd: 24
          },
          {
            w: 40,
            resultVi: "Tiếng gào của {parentName} trong sương đặc làm đầu óc bạn quay cuồng. Sóng chấn động hất bạn văng ngược qua rào sắt, máu mũi chảy ròng xuống cổ áo.",
            resultEn: "The anguished wail of {parentName} inside the anomaly proved overwhelming. A distorted shockwave hurled you back across the barricade with a bleeding nose and a fractured psyche.",
            effects: { health: -22, sanity: -20, resonance: +10, taboo: +1 },
            scarsAdd: ['Ám ảnh tiếng gào tiền kiếp']
          }
        ]
      },
      {
        labelVi: "Gom tinh thể Enkephalin kết tủa ngoài rìa đem bán chợ đen",
        labelEn: "Harvest the crystallized Enkephalin around the lair for black-market buyers",
        resultVi: "Bạn men theo rào chắn, cạy những mảnh tinh thể kết tủa quanh khu phong tỏa. Khoản tiền thu về khá dày, nhưng đội tuần tra Hana đã ghi lại dấu giày của bạn ở vành đai ngoài.",
        resultEn: "Keeping to the outer perimeter, you gathered crystals precipitated from your predecessor’s grief. The payout was substantial, yet guilt and the scrutiny of Hana purgers immediately latched onto you.",
        effects: { wealth: +24, sanity: -14, heat: +10, taboo: +1 },
        meritAdd: 10
      },
      {
        labelVi: "Báo hướng sương tràn cho đội phong tỏa Hana",
        labelEn: "Report the fog's structural weak point to the Hana containment squad",
        resultVi: "Bạn giao bản phác đường sương tràn cho đội phong tỏa rồi rời khỏi hiện trường. Họ trả phí cung cấp tin.",
        resultEn: "You hand the containment squad a sketch of the fog's path and leave. They pay you for the information.",
        effects: { wealth: +10, sanity: +8, rep: +8, resonance: -6 },
        meritAdd: 12
      }
    ]
  },

  // 6. Living Ancestor Echo: Ancestor was a Finger Underboss / Maestro / Proxy
  {
    id: 'm_lineage_finger_turf_remnant',
    age: [18, 35],
    major: true,
    weight: 15,
    requires: ['AncestorWasFingerBoss'],
    forbids: ['Distorted'],
    vi: "[Di sản địa bàn cũ] Khi bạn đi ngang nhà kho ngầm từng thuộc quyền {parentName}, một toán cựu binh Syndicate bước ra chắn lối. Nhận ra 「{relic}」, gã đội trưởng mặt sẹo cúi đầu: \"Hậu nhân của ngài {parentName}. Khu này đã đổi chủ, nhưng hầm bạc và sổ mật báo cũ vẫn chờ tín vật trên tay ngài.\"",
    en: "[Finger Turf Remnant] As you pass an underground depot once ruled by {parentName}, a squad of veteran Syndicate enforcers steps from the shadows. Recognizing 「{relic}」, their scarred captain bows low: “Heir of {parentName}. This turf has changed hands many times, yet the hidden war chest and informant web they planted still answer only to the token you carry.”",
    choices: [
      {
        labelVi: "Tiếp quản sổ mật báo và hầm bạc ngầm",
        labelEn: "Claim the informant network and underground war chest (Accept the target on your back)",
        resultVi: "Bạn lấy sổ mật mã và các hòm bạc dưới hầm lạnh. Ngay đêm đó, băng đảng đang giữ khu phố phát hiện hầm trống và treo thưởng lấy đầu người thừa kế của {parentName}.",
        resultEn: "You took the cipher ledgers and silver crates from the sub-vault. That very night, rival gangs holding the block discovered the drained war chest and placed a kill-order on {parentName}’s heir.",
        effects: { wealth: +24, network: +18, leverage: +14, heat: +16, sanity: -8 },
        meritAdd: 16
      },
      {
        labelVi: "Thuê lại toán cựu binh và đánh mở đường ra khỏi hẻm",
        labelEn: "Induct the veteran enforcers and carve a bloody path out of the block",
        outcomes: [
          {
            w: 65,
            resultVi: "Bạn trả tiền giữ chân toán cựu binh rồi cùng họ đánh bật chốt chặn của băng đảng địa phương ở đầu hẻm. Máu loang trên mặt gạch, nhưng cả khu phố biết bạn đã quay lại.",
            resultEn: "You paid a heavy retainer to the veterans and fought through a local gang ambush together. Blood stained the alley, yet your standing was forged in iron and fire.",
            effects: { wealth: -12, health: -14, rep: +20, network: +16, leverage: +12, heat: +10 },
            meritAdd: 20
          },
          {
            w: 35,
            resultVi: "Nửa toán cựu binh đã ngầm báo tin cho chủ mới của khu phố. Bạn mất cả tiền lẫn mảng máu trên bả vai mới phá được vòng vây dưới hầm kho.",
            resultEn: "Half the veteran squad had secretly sold you out to the block’s new bosses. You paid dearly in blood and coin just to break out of the underground depot ambush.",
            effects: { wealth: -16, health: -24, sanity: -10, rep: +6, heat: +12 },
            scarsAdd: ['Vết đâm phản bội ở kho ngầm']
          }
        ]
      },
      {
        labelVi: "Đốt sổ mật mã để giữ yên cho cả hai phía",
        labelEn: "Burn the cipher ledger to buy clean safety for both sides",
        resultVi: "Bạn ném cuốn sổ mật mã vào lò than trước mặt toán cựu binh, xóa lời thề cũ cho họ. Bạn ra về tay trắng, nhưng không ai có cớ đuổi theo.",
        resultEn: "You tossed the cipher ledger into the brazier before the veterans, releasing them from their old oath. You walked away without dirty coin, yet erased a lethal vendetta.",
        effects: { heat: -12, sanity: +12, rep: +8 },
        meritAdd: 12
      }
    ]
  },

  // 7. Living Ancestor Echo: Ancestor was a Wing Executive / Department Head
  {
    id: 'm_lineage_wing_trust_vault',
    age: [18, 36],
    major: true,
    weight: 15,
    requires: ['AncestorWasWingExec'],
    forbids: ['Distorted'],
    vi: "[Két sắt sinh trắc tại Nest] Ngân hàng lưu ký tự động trong Nest gửi giấy báo khi mẫu sinh trắc của bạn khớp với cố quản lý {parentName}. Cửa hợp kim mở ra, bên trong là cổ phiếu ưu đãi cùng bìa hồ sơ đen ghi chép các ca thử nghiệm Singularity chưa công bố.",
    en: "[Biometric Nest Vault] An automated depository in the Nest core issues a priority alert upon matching your genetic sequence to former executive {parentName}. The alloy vault parts, revealing preferred corporate shares alongside a black binder of undisclosed Singularity trials.",
    choices: [
      {
        labelVi: "Bán cổ phiếu sau khi trừ thuế thừa kế và phí kiểm toán",
        labelEn: "Liquidate the shares after paying Nest inheritance tariffs and audit fees",
        resultVi: "Hệ thống tự động trừ hơn nửa giá trị cho phí giữ két hai mươi năm và thuế chuyển nhượng Nest. Khoản tiền sạch còn lại vẫn khá lớn, dù tên bạn đã nằm trong sổ theo dõi tài sản của phòng nội vụ.",
        resultEn: "After automated deductions claimed over half the value in vault arrears and Nest transfer tariffs, the clean remainder still bolstered your coffers, though Internal Affairs flagged your name on their asset watchlists.",
        effects: { wealth: +24, sanity: -6, rep: +8, heat: +8 },
        meritAdd: 14
      },
      {
        labelVi: "Dùng tập hồ sơ đen để mặc cả với ban giám đốc Wing",
        labelEn: "Use the black binder as political leverage over Wing directors (High-stakes gamble)",
        outcomes: [
          {
            w: 60,
            resultVi: "Số liệu {parentName} cất giữ chạm đúng sai phạm của hai giám đốc bộ phận đương nhiệm. Họ phải chia lại hạn ngạch cho bạn, đổi lại bạn phải đổi khóa cửa và lộ trình đi làm mỗi tuần.",
            resultEn: "The secrets {parentName} archived struck the vital nerve of two department directors. They conceded influence to you, though you now sleep with one eye open against corporate cleaners.",
            effects: { network: +20, leverage: +18, rep: +14, heat: +14, sanity: -10 },
            meritAdd: 22
          },
          {
            w: 40,
            resultVi: "Ban giám đốc đương nhiệm đã dọn sạch các đầu mối trong tập hồ sơ từ nhiều năm trước. Đội an ninh thu giữ bìa tài liệu, khóa tài khoản phụ của bạn và lập biên bản vi phạm bảo mật.",
            resultEn: "The sitting board had already prepared countermeasures for the archived files. Corporate security confiscated the binder, froze your secondary accounts, and logged a confidentiality penalty.",
            effects: { wealth: -18, sanity: -14, rep: -10, heat: +16, taboo: +1 },
            scarsAdd: ['Án phạt rò rỉ mật vụ Wing']
          }
        ]
      },
      {
        labelVi: "Nộp nguyên tập hồ sơ đen cho ban kiểm soát nội bộ",
        labelEn: "Surrender the sealed black binder to corporate compliance for immunity",
        resultVi: "Bạn nộp thẳng bìa tài liệu còn niêm phong cho ban kiểm soát. Họ chi một khoản tiền thưởng đúng quy định và gạch dấu cảnh báo an ninh khỏi hồ sơ gia đình bạn.",
        resultEn: "You voluntarily surrendered the classified binder to corporate compliance. They granted you a modest compliance stipend and cleared lingering security flags around your family name.",
        effects: { wealth: +12, heat: -10, sanity: +10, standing: +8 },
        meritAdd: 12
      }
    ]
  }
];
