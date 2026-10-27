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
    vi: "[Nợ Máu Đời Trước: Bản án của The Middle] Một Great Sister cùng toán chấp pháp chặn lối rẽ vào ngõ hẹp. Cuốn Book of Vengeance mở ra, trang giấy ố vàng mang vết mực tím ghi tên {parentName}, nối liền với tên bạn bằng một vệt mực đỏ thẫm. \"Nợ của đời trước, tính cả lãi của hai mươi năm. Hoặc gãy cả hai cánh tay và nộp 60 Ahn, hoặc đứng vào vòng quyết đấu để xóa tên.\"",
    en: "[Blood Debt: The Middle's Decree] A Great Sister and her enforcers block the alley mouth. The Book of Vengeance lies open, yellowed pages stained with purple ink where {parentName}’s name is bound to yours by a dark scarlet stroke. “The debt of the preceding generation, compounded by twenty years of interest. Either shatter both your forearms and surrender 60 Ahn, or step into the duel ring to purge the ink.”",
    choices: [
      {
        labelVi: "Bước vào vòng quyết đấu để chấm dứt món nợ bằng máu",
        labelEn: "Step into the duel ring and settle the debt in blood",
        resultVi: "Lưỡi vũ khí va chạm với xích sắt phát ra chuỗi tia lửa chói lòa. Dù bầm dập và gãy hai xương sườn, bạn bẻ gãy đòn khóa của Great Sister. Bà ta gật đầu trong im lặng, dùng bút lông gạch một đường dứt khoát xóa sạch tên dòng họ bạn khỏi trang sổ.",
        resultEn: "Your weapon met heavy iron chains with a spray of sparks. Though bruised and nursing two fractured ribs, you broke the Great Sister’s hold. She gave a curt nod and drew a thick stroke through your family’s line in the Book of Vengeance.",
        effects: { health: -22, sanity: +8, rep: +20, resonance: +18, heat: -25 },
        flagsRemove: ['NợMáuĐờiTrước'],
        scarsAdd: ['Chiến tích xóa tên khỏi Sổ Thù'],
        meritAdd: 25
      },
      {
        labelVi: "Giao nộp toàn bộ của cải tích góp để đền bù",
        labelEn: "Surrender your accumulated wealth to buy out the grievance",
        resultVi: "Từng cọc tiền Ahn bạn đổ mồ hôi gom góp được chuyển sang tay The Middle. Họ đóng nắp rương, cuốn sổ được gấp lại. Bạn trắng tay nhưng các khớp tay chân còn nguyên vẹn để tiếp tục sống.",
        resultEn: "Every stack of Ahn you had bled to gather was handed over to the Middle. The iron chest latched shut; the book was closed. You were penniless, but your limbs were unbroken to see another dawn.",
        effects: { wealth: -45, sanity: -8, heat: -30 },
        flagsRemove: ['NợMáuĐờiTrước'],
        scarsAdd: ['Chuộc thân khỏi Sổ Thù']
      },
      {
        labelVi: "Lợi dụng mạng lưới Backstreets để mai phục và rút lui",
        labelEn: "Use Backstreet alleyways to spring an ambush and vanish",
        resultVi: "Bạn tung bom khói và dẫn đám tay sai vào mê cung cống rãnh ngập khói độc đã gài sẵn. Bạn cắt đuôi được chúng, nhưng biết rõ The Middle sẽ không bao giờ nguôi giận khi món nợ bị kéo dài thêm.",
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
    vi: "[Người mang ơn cũ] Một chủ Workshop cao cấp gửi người mang thư mời bạn tới tầng thượng một tòa tháp. Người đó từng được {parentName} cứu mạng trong một trận thanh trừng ở Backstreets nhiều năm trước. \"Gương mặt và cách cầm vũ khí của cháu không khác gì người đó năm xưa. Ta đã nợ một món ân tình, và hôm nay là lúc hoàn trả.\"",
    en: "[An Old Obligation] The master of a high-tier Workshop sends an escort inviting you to a tower rooftop. Long ago, {parentName} dragged them out of a slaughter in the Backstreets. “Your eyes and your stance are identical to theirs back then. I carried a debt of life, and today I begin paying it back.”",
    choices: [
      {
        labelVi: "Nhận tiền tài trợ và vũ khí tùy chỉnh từ Workshop",
        labelEn: "Accept the workshop funding and custom armaments",
        resultVi: "Vị chủ Workshop trao cho bạn một hòm linh kiện trợ lực tinh xảo cùng ngân phiếu có giá trị lớn. Trang bị của bạn lập tức được nâng cấp, và danh tiếng người kế thừa của {parentName} lan khắp khu vực.",
        resultEn: "The Workshop master handed you a case of high-grade augments alongside a substantial Ahn draft. Your gear was upgraded on the spot, and your name as {parentName}’s heir traveled through the district.",
        effects: { wealth: +30, network: +18, rep: +16 },
        flagsAdd: ['BảoHộTiềnNhân'],
        meritAdd: 18
      },
      {
        labelVi: "Xin truyền thụ lại các bài học sinh tồn và kỹ thuật chiến đấu",
        labelEn: "Ask for hard lessons and ancestral combat techniques instead of coin",
        resultVi: "Suốt ba tháng rèn luyện không ngơi nghỉ, những vết sẹo mới xuất hiện nhưng phản xạ và khả năng điều khiển nhịp thở của bạn đạt tầm mức mới. Bạn đã thấu suốt phong cách chiến đấu mà {parentName} từng để lại.",
        resultEn: "Through three months of relentless sparring, fresh bruises faded into hardened muscle. Your breath control and reflexes reached a new plateau, fully grasping the martial legacy {parentName} practiced.",
        effects: { health: -12, sanity: +14, rep: +24, resonance: +18 },
        flagsAdd: ['DiHuấnChiếnTrận'],
        meritAdd: 24
      },
      {
        labelVi: "Từ chối khéo léo, khẳng định sẽ tự bước đi bằng đôi chân mình",
        labelEn: "Politely decline, declaring you will stand on your own merits",
        resultVi: "Vị chủ xưởng ngạc nhiên rồi bật cười sảng khoái. \"Đúng là cốt cách của người nhà đó.\" Dù không nhận viện trợ, ý chí độc lập kiên định khiến tâm trí và khí chất của bạn thêm phần vững vàng.",
        resultEn: "The Workshop master blinked in surprise, then gave a hearty laugh. “Just like them after all.” Though you took no handouts, your fierce self-reliance steeled your resolve and deepened your presence.",
        effects: { sanity: +22, rep: +18, resonance: +22 },
        flagsAdd: ['ÝChíTựLập'],
        meritAdd: 20
      }
    ]
  },

  // 3. Spiritual resonance and awakening of the inherited relic
  {
    id: 'm_lineage_relic_resonance',
    age: [20, 36],
    major: true,
    weight: 12,
    requires: ['HuyếtThốngKếThừa'],
    vi: "[Hơi Thở Của Di Vật] Trong đêm mưa lạnh giữa lòng City, 「{relic}」 bỗng phát ra tiếng ngân rung nhẹ như nhịp đập của quả tim thứ hai. Vết máu khô nhiều năm trước trên chuôi vũ khí khẽ ánh lên tia sáng mờ nhạt: ký ức và khát vọng chưa thành của {parentName} đang tìm cách cộng hưởng với cảm xúc của bạn.",
    en: "[Resonance of the Relic] On a cold, rain-soaked night in the City, 「{relic}」 emits a low chime like a second pulse. Dried blood along the hilt catches a pale shimmer: {parentName}’s unresolved memories and will stir, seeking alignment with your heartbeat.",
    choices: [
      {
        labelVi: "Mở rộng tâm trí, hòa nhịp cảm xúc để đánh thức toàn bộ tiềm năng",
        labelEn: "Open your mind and synchronize your spirit to awaken its full power",
        resultVi: "Một luồng nhiệt sắc bén truyền thẳng từ cán 「{relic}」 vào lồng ngực bạn. Trong giây lát bạn nhìn thấy mọi trận tử chiến mà {parentName} từng trải qua. Khi cơn choáng qua đi, ánh sáng E.G.O mờ ảo bao phủ lưỡi dao.",
        resultEn: "A sharp surge of heat flooded from 「{relic}」’s hilt directly into your chest. For a fleeting second you witnessed every lethal clash {parentName} survived. When the vertigo subsided, a faint E.G.O glow enveloped the edge.",
        effects: { sanity: -14, resonance: +28, rep: +16 },
        flagsAdd: ['CộngHưởngDiVật'],
        scarsAdd: ['Dấu ấn linh hồn tiền nhân'],
        meritAdd: 25
      },
      {
        labelVi: "Đưa di vật đến xưởng vũ khí để tinh chỉnh và bọc hợp kim mới",
        labelEn: "Bring the relic to an armory to reinforce it with modern alloy",
        resultVi: "Thợ rèn gia cố cấu trúc kim loại và lắp thêm bộ hãm lực thế hệ mới, biến 「{relic}」 thành một món trang bị thực dụng và chết chóc hơn mà vẫn giữ nguyên hồn cốt cũ.",
        resultEn: "The smith reinforced the frame with modern shock-absorbers, turning 「{relic}」 into a deadlier, more utilitarian weapon while preserving its original core.",
        effects: { wealth: -22, health: +16, rep: +18, resonance: +12 },
        flagsAdd: ['KhíTàiTáiSinh'],
        meritAdd: 20
      },
      {
        labelVi: "Cất vào hộp nhung như một lời nhắc nhở tĩnh lặng về quá khứ",
        labelEn: "Rest it inside a velvet box as a quiet tribute to the past",
        resultVi: "Bạn lau sạch bụi đường trên 「{relic}」 rồi khép nắp hộp. Bạn không cần mượn sức mạnh của người đã khuất; việc nhớ về họ đã là đủ điểm tựa để bạn giữ vững tinh thần giữa thành phố tàn khốc này.",
        resultEn: "You wiped the road grime from 「{relic}」 and closed the lid. You did not need to borrow the strength of the dead; remembering them was anchor enough to hold your mind intact in this cruel City.",
        effects: { sanity: +25, health: +12 },
        flagsAdd: ['KỷVậtNgủYên'],
        meritAdd: 15
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
    vi: "[Cái Bóng Của Sắc Màu] Tại phân khu địa phương của Hana Association, một thanh tra lão niên dừng bước trước bàn làm thủ tục của bạn. Ông ta nhìn chằm chằm vào 「{relic}」 bên hông bạn rồi đặt xuống tấm hồ sơ đóng dấu mật của {parentName}. \"Cả District này vẫn còn nhớ cái tên đó. Nhưng danh hiệu Color không phải là tước vị cha truyền con nối. Chứng minh cho ta thấy ngươi mang bản lĩnh của người đó, hay chỉ đang nấp dưới cái bóng quá lớn.\"",
    en: "[Shadow of a Color] At the local Hana Association branch, an aging evaluator stops before your desk. He stares at 「{relic}」 at your hip and sets down {parentName}’s sealed dossier. “This entire District still remembers that name. Yet a Color title is no hereditary peerage. Show me whether you carry their edge, or merely hide beneath an oversized shadow.”",
    choices: [
      {
        labelVi: "Chấp nhận bài khảo sát thực chiến ngay tại sân tập Hana",
        labelEn: "Accept an immediate live-combat evaluation in the Hana courtyard",
        resultVi: "Dưới ánh mắt của hàng chục Fixer, bạn đỡ trọn ba đòn sát thủ của viên thanh tra bằng kỹ pháp kế thừa từ {parentName} rồi phản kích chuẩn xác. Ông ta thu vũ khí, gật đầu ghi nhận công trạng đặc cách cho bạn.",
        resultEn: "Under the gaze of dozens of Fixers, you parried three lethal strikes using {parentName}’s stance and countered cleanly. The evaluator sheathed his blade and logged a special merit commendation.",
        effects: { health: -14, sanity: +10, rep: +24, resonance: +16 },
        flagsAdd: ['ProdigyFixer'],
        meritAdd: 28
      },
      {
        labelVi: "Sử dụng uy tín của tiền nhân để mở rộng mạng lưới ủy thác cấp cao",
        labelEn: "Leverage your predecessor's prestige to access upper-tier brokerage",
        resultVi: "Bạn không cần đôi co bằng vũ lực. Chỉ riêng con dấu cũ của {parentName} đã đủ để các môi giới Section 3 mở cửa phòng riêng và chuyển giao những hợp đồng béo bở nhất.",
        resultEn: "You had no need to prove yourself in a spar. {parentName}’s old seal alone was enough for Section 3 brokers to open their private parlors and hand over lucrative contracts.",
        effects: { wealth: +28, network: +22, rep: +14 },
        meritAdd: 18
      },
      {
        labelVi: "Tuyên bố xóa bỏ liên hệ, tự đi con đường không mang tên người cũ",
        labelEn: "Renounce the comparison and walk a path unbound by their name",
        resultVi: "Bạn đẩy trả tập hồ sơ. Không dựa dẫm cũng không sợ hãi, sự lạnh lùng dứt khoát của bạn khiến tâm trí nhẹ nhõm và ý chí riêng càng thêm sắc bén.",
        resultEn: "You pushed the dossier back across the counter. Neither leaning on nor fearing the past, your quiet resolve steadied your mind and sharpened your own identity.",
        effects: { sanity: +20, resonance: +20, rep: +12 },
        meritAdd: 20
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
    vi: "[Dư Chấn Distortion Tiền Kiếp] Một khu phố bỏ hoang ở rìa Backstreets bị phong tỏa bởi sương mù dị dạng suốt nhiều năm kể từ ngày {parentName} biến đổi thành Distortion. Khi bạn bước đến gần hàng rào cảnh báo của Hana, 「{relic}」 rung lên dữ dội và màn sương tự động tách làm đôi. Ở tâm điểm vùng dị biến, tàn dư ý thức méo mó của {parentName} vẫn đang lặp lại nỗi ám ảnh cuối đời.",
    en: "[Ancestral Distortion Echo] A cordoned block on the Backstreets fringe has remained steeped in anomalous fog since the day {parentName} turned into a Distortion. As you approach the Hana barricade, 「{relic}」 vibrates fiercely and the mist parts. At the anomaly’s heart, {parentName}’s warped remnant still replays their final obsession.",
    choices: [
      {
        labelVi: "Bước vào tâm vùng dị biến, đối mặt và giải thoát cho ý thức người cũ",
        labelEn: "Step into the core, confront the remnant, and grant them release",
        resultVi: "Giữa không gian bóp nghẹt lý trí, bạn chém tan lớp vỏ tuyệt vọng đang giam cầm hình bóng {parentName}. Khi bóng hình ấy tan thành những hạt sáng ấm áp, một nguồn cộng hưởng thuần khiết truyền thẳng vào tâm hồn bạn.",
        resultEn: "Amidst mind-crushing pressure, you severed the shell of despair caging {parentName}’s echo. As the figure dissolved into warm motes of light, pure resonance surged into your soul.",
        effects: { health: -18, sanity: +16, resonance: +28, rep: +20 },
        scarsAdd: ['Người giải thoát dư ảnh Distortion'],
        meritAdd: 30
      },
      {
        labelVi: "Thu hoạch tinh thể Enkephalin kết tụ quanh lãnh địa rồi bán cho Wing",
        labelEn: "Harvest the crystallized Enkephalin around the lair for a Wing buyer",
        resultVi: "Bạn giữ khoảng cách an toàn, thu gom những khối tinh thể quý hiếm kết tủa từ nỗi đau của đời trước. Khoản tiền thu về rất lớn, dù đôi lúc tiếng vọng trong sương vẫn ám ảnh giấc ngủ của bạn.",
        resultEn: "Keeping a cautious distance, you gathered rare crystals precipitated from your predecessor’s grief. The payout was immense, though echoes in the fog still trouble your sleep.",
        effects: { wealth: +36, sanity: -10, resonance: +14, network: +12 },
        meritAdd: 16
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
    vi: "[Di Sản Địa Bàn Ngón Tay] Khi bạn đi ngang qua một kho hàng ngầm từng thuộc quyền cai quản của {parentName}, một toán cựu binh Syndicate bước ra từ bóng tối. Nhận ra 「{relic}」, gã chỉ huy vết sẹo đầy mặt lập tức cúi đầu: \"Hậu nhân của ngài {parentName}. Địa bàn này đã đổi chủ nhiều lần, nhưng quỹ đen và mạng lưới mật báo mà ngài ấy cài lại vẫn chỉ mở theo tín vật trên tay ngài.\"",
    en: "[Finger Turf Remnant] As you pass an underground depot once ruled by {parentName}, a squad of veteran Syndicate enforcers steps from the shadows. Recognizing 「{relic}」, their scarred captain bows low: “Heir of {parentName}. This turf has changed hands many times, yet the hidden war chest and informant web they planted still answer only to the token you carry.”",
    choices: [
      {
        labelVi: "Tiếp quản mạng lưới mật báo và kho quỹ ngầm",
        labelEn: "Claim the informant network and underground war chest",
        resultVi: "Bạn nhận lấy sổ mật mã và các hòm bạc cất giấu dưới hầm lạnh. Quyền lực ngầm của {parentName} trở thành bàn đạp vững chắc cho con đường của bạn.",
        resultEn: "You took the cipher ledgers and silver crates from the sub-vault. {parentName}’s underground dominion became a formidable springboard for your ascent.",
        effects: { wealth: +30, network: +24, leverage: +16, heat: +10 },
        meritAdd: 22
      },
      {
        labelVi: "Tuyển mộ toán cựu binh làm đội hộ vệ trung thành",
        labelEn: "Induct the veteran enforcers as your loyal retinue",
        resultVi: "Những tay đao dày dạn kinh nghiệm nguyện đi theo bảo vệ bạn, giúp vị thế và sức chiến đấu của bạn tăng vọt trên khắp các ngõ ngách Backstreets.",
        resultEn: "The battle-hardened enforcers swore themselves to your banner, bolstering your standing and reach across the Backstreets.",
        effects: { health: +12, rep: +22, network: +16, leverage: +12 },
        meritAdd: 24
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
    vi: "[Két Sắt Sinh Trắc Học Tại Nest] Một ngân hàng lưu ký tự động tại trung tâm Nest gửi thông báo bảo mật khi quét thấy chuỗi gen của bạn trùng khớp với cố quản lý cấp cao {parentName}. Cánh cửa hợp kim mở ra, để lộ một két an toàn chứa cổ phiếu ưu đãi của Tập đoàn cùng tập hồ sơ đen ghi chép các dự án Singularity chưa từng công bố.",
    en: "[Biometric Nest Vault] An automated depository in the Nest core issues a priority alert upon matching your genetic sequence to former executive {parentName}. The alloy vault parts, revealing preferred corporate shares alongside a black binder of undisclosed Singularity trials.",
    choices: [
      {
        labelVi: "Thanh khoản cổ phiếu và kích hoạt quỹ tín thác gia tộc",
        labelEn: "Liquidate the preferred shares and activate the family trust",
        resultVi: "Tài khoản Ahn của bạn nhảy vọt lên mức thượng lưu, kèm theo quyền ưu tiên giao dịch tại các trạm cung ứng của Nest.",
        resultEn: "Your Ahn balance surged into upper-class brackets, accompanied by priority clearance at Nest supply depots.",
        effects: { wealth: +38, sanity: +10, rep: +14 },
        meritAdd: 18
      },
      {
        labelVi: "Sử dụng hồ sơ đen làm đòn bẩy chính trị với giới quản lý Wing",
        labelEn: "Use the black binder as political leverage over Wing directors",
        resultVi: "Những bí mật mà {parentName} để lại giúp bạn nắm thóp nhiều nhân vật tai to mặt lớn, mở toang cánh cửa thăng tiến và quan hệ cấp cao.",
        resultEn: "The secrets {parentName} archived gave you ironclad leverage over senior directors, throwing open the doors to elite networks and advancement.",
        effects: { network: +24, leverage: +22, rep: +18, heat: +8 },
        meritAdd: 25
      }
    ]
  }
];
