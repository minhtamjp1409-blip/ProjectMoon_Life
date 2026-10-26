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
  }
];
