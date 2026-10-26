// ============================================================================
// MAJOR EVENTS: CHILDHOOD, ADOLESCENCE, THE BLOODLINE, AND WHAT COMES BACK
// These stop time. The "[Title]" at the start of each text becomes the heading of
// the decision panel. Violence is written once and exactly; the City is cruel
// because it is ordinary about it.
// ============================================================================

export const CHILDHOOD_EVENTS = [
  // --- the bloodline ---
  {
    id: 'leg_inherited_relic',
    age: [7, 11],
    major: true,
    weight: 12,
    requires: ['HuyếtThốngKếThừa'],
    vi: "[Di vật của {parentName}] Chủ trọ đã lấy sạch đồ để trừ nợ, nhưng bỏ sót một hộp thiếc dưới ván sàn. Bên trong, 「{relic}」 nằm dưới chiếc áo cũ, mép lưỡi còn vết máu khô. Không có thư.",
    en: "[The box under the floor] The landlord took everything to cover the debt, but missed an iron box under a loose board. Inside, 「{relic}」 lies wrapped in an old shirt, dried blood still on its edge. There is no note. It is {parentName}’s.",
    choices: [
      {
        labelVi: "Cứa tay, nhỏ máu lên lưỡi và thề tìm ra kẻ đã giết họ",
        labelEn: "Cut your palm, bleed on the edge and swear to find whoever killed them",
        resultVi: "Máu bạn chảy dọc rãnh lưỡi, hòa vào vệt cũ. Bạn mười tuổi. Từ hôm đó bạn thôi chơi với lũ trẻ trong dãy trọ, và học cách nhìn người lạ để đoán xem họ giấu dao ở đâu. 「{relic}」 vẫn nằm trong hộp, đã quen thêm một bàn tay.",
        resultEn: "Your blood ran along the groove and joined the old stain. You were ten. From that day you stopped playing with the other children in the boarding house, and learned to look at strangers and guess where they kept their knives. 「{relic}」 stayed in its box, used to one more hand.",
        effects: { health: -6, sanity: -8, rep: +10, resonance: +14 },
        flagsAdd: ['유물', '해결사동경'],
        scarsAdd: ['Lời thề trên di vật'],
        scheduleConsequences: [
          {
            eventId: 'csq_parent_old_comrade',
            delayYears: 6,
            reasonVi: "Một người từng sống sót cùng {parentName} sẽ nhận ra món di vật",
            reasonEn: "Someone who survived alongside {parentName} will recognize the relic"
          }
        ]
      },
      {
        labelVi: "Mang ra chợ đen bán lấy tiền ăn",
        labelEn: "Sell it on the black market for food money",
        resultVi: "Gã cầm đồ nhìn vệt máu trên 「{relic}」, rồi đặt một xấp Ahn xuống quầy. \"Cầm lấy mà sống. Đừng quay lại tìm nó.\" Tối ấy bạn ăn bánh mì nóng, và không ngủ được.",
        resultEn: "The pawnbroker looked at the blood on 「{relic}」, then at you. He counted the Ahn onto the counter. “Live on it. Do not come back for it.” You ate hot bread that night and could not sleep.",
        effects: { wealth: +12, sanity: -8, rep: -4 },
        scarsAdd: ['Món di vật đã bán']
      }
    ]
  },
  {
    id: 'leg_inherited_vendetta',
    age: [14, 17],
    major: true,
    weight: 16,
    requires: ['NợMáuĐờiTrước'],
    vi: "[Món nợ của {parentName}] Hai người của The Middle ngồi chờ sẵn trong phòng bạn. Một người mở Book of Vengeance tới trang có tên {parentName}: một mạng người và sáu ngón tay còn thiếu. \"Người chết rồi, dòng này vẫn còn. Bạn trả bằng gì?\"",
    en: "[{parentName}’s debt] Two members of the Middle are waiting in your room. One holds the Book of Vengeance open to the page with {parentName}’s name: a life and six fingers still owed. “The debtor is dead and the line stays. What do you pay with?”",
    choices: [
      {
        labelVi: "Đưa hết Ahn bạn có, phần còn lại để chúng lấy bằng dao",
        labelEn: "Hand over every Ahn you have and let them take the rest with a knife",
        resultVi: "Gã lớn tuổi hơn đâm dao qua bắp đùi bạn, gọn và không vội, như đóng dấu lên một tờ khai. Hắn quẹt máu bạn qua dòng tên {parentName}, rồi khép sổ. \"Tất toán.\"",
        resultEn: "The older one put a knife through your thigh, neat and unhurried, like stamping a form. He drew your blood across {parentName}’s line and closed the book. “Settled.”",
        effects: { health: -20, wealth: -12, sanity: -10, heat: -20, resonance: +12 },
        scarsAdd: ['Vết dao trả nợ']
      },
      {
        labelVi: "Hất nồi nước sôi trên bếp vào mặt chúng, rồi nhảy qua cửa sổ",
        labelEn: "Throw the boiling pot at their faces and go out the window",
        resultVi: "Bạn hất nồi vào mặt gã gác cửa, đâm xuyên mái tôn rơi xuống cống, gãy một xương sườn. Đến tối, tên bạn đã nằm trong Book of Vengeance bằng mực đỏ, ngay dưới tên {parentName}. Nợ cũ chưa trả, nợ mới đã thêm vào.",
        resultEn: "You hurled the pot at the one by the door and went through the tin roof into the drain, cracking a rib. By nightfall your name was in the Book of Vengeance in red ink, right under {parentName}’s. The old debt was unpaid, and a new one added.",
        effects: { health: -18, sanity: -10, rep: +10, heat: +25, resonance: +14 },
        flagsAdd: ['MiddleVendetta'],
        scarsAdd: ['Tên viết bằng mực đỏ'],
        scheduleConsequences: [
          {
            eventId: 'csq_middle_ambush_adult',
            delayYears: 4,
            reasonVi: "The Middle không quên kẻ đã làm bỏng mặt người của chúng",
            reasonEn: "The Middle does not forget who scalded one of their own"
          }
        ]
      }
    ]
  },

  // --- childhood, by where you grew up ---
  {
    id: 'ch_nest_early_screening',
    age: [4, 7],
    major: true,
    weight: 9,
    requires: ['Nest'],
    vi: "[Buổi kiểm tra của Wing] Trong phòng khám của Nest, bác sĩ đặt trước mặt bạn một ống thuốc sáng màu. Nó có thể đưa điểm tương thích Singularity của bạn vào nhóm đầu, và cũng có thể làm hỏng khả năng vận động. Điểm thấp thì gia đình mất suất ở Nest. Cha mẹ chờ bạn gật đầu.",
    en: "[The Wing’s screening] In the Nest clinic, a doctor sets a bright vial in front of you. It may lift your Singularity compatibility into the top group. It may also damage your motor control. A low score costs your family its place in the Nest. Your parents wait for you to nod.",
    choices: [
      {
        labelVi: "Nhận mũi tiêm",
        labelEn: "Take the injection",
        resultVi: "Mũi kim chạm đốt sống. Bạn sốt ba ngày, rồi tên bạn xuất hiện trong nhóm điểm cao nhất. Cha đóng khung tờ chứng nhận. Bạn giấu bàn tay còn run dưới gầm bàn.",
        resultEn: "The needle touched your spine. You shook with fever for three days, and then your name appeared in the top group. Your father framed the certificate. You hid your trembling hand under the table.",
        effects: { health: -10, sanity: -8, rep: +10, network: +12, resonance: +8 },
        flagsAdd: ['ThượngLưu'],
        scarsAdd: ['Vết kim trên cột sống']
      },
      {
        labelVi: "Làm bài như bình thường",
        labelEn: "Sit the test as you are",
        resultVi: "Bạn đạt điểm \"Đạt yêu cầu\". Bữa tối hôm đó không ai nói gì, chỉ có tiếng dao nĩa chạm đĩa. Cha mẹ nhìn bạn như nhìn một chiếc ghế sắp bị lấy lại.",
        resultEn: "You scored “Satisfactory”. Nobody spoke at dinner, only the scrape of knives on plates. Your parents looked at you the way one looks at a chair about to be taken back.",
        effects: { sanity: +6, health: +4, rep: -3 }
      }
    ]
  },
  {
    id: 'ch_sweeper_night_313',
    age: [5, 10],
    major: true,
    weight: 3, // was 6; with the larger childhood pool it no longer needs to carry the Backstreets alone
    requires: ['Backstreets'],
    forbids: ['Nest', 'Outskirts'],
    vi: "[Đêm 3:13] Còi giới nghiêm tắt, đèn Backstreets cũng tắt theo. Dưới gầm giường, bạn nghe móc sắt của Sweeper cào trên mặt đường. Ông Kang phòng bên đập cửa, giọng đứt quãng: \"Mở cửa! Tay chú mắc kẹt rồi. Chúng đang tới.\"",
    en: "[3:13] The curfew siren stops and the Backstreets lamps go out with it. Under the bed you hear a Sweeper’s hook scrape along the road. Old Kang from next door pounds on your door, voice breaking: “Open up, please. My arm is caught. They are coming.”",
    choices: [
      {
        labelVi: "Rút chốt, kéo ông ấy vào",
        labelEn: "Pull the bolt and drag him in",
        outcomes: [
          {
            w: 65,
            resultVi: "Bạn kéo ông Kang qua ngưỡng cửa đúng lúc móc sắt quét tới. Vai bạn bị rạch, cánh tay trái của ông ở lại ngoài bậc thềm. Ông còn sống. Cả hai giữ chặt then cửa đến sáng.",
            resultEn: "You dragged Kang over the threshold as the hook swept in. It tore your shoulder, and his left arm stayed on the step outside. He lived. The two of you held the bolt shut until morning.",
            effects: { health: -14, sanity: -6, rep: +6, resonance: +10 },
            recordsAdd: ['survive_night'],
            scarsAdd: ['Vết móc đêm 3:13'],
            scheduleConsequences: [
              {
                eventId: 'csq_saved_neighbor_gift',
                delayYears: 7,
                reasonVi: "Ông Kang nợ bạn một mạng",
                reasonEn: "Old Kang owes you a life"
              }
            ]
          },
          {
            w: 35,
            resultVi: "Một vòi của Sweeper luồn qua khe cửa, phun axit lên cẳng tay bạn. Bạn vẫn kéo được ông Kang vào và cài then. Hai người nằm trên sàn đến sáng, không ai dám nhìn vết thương của người kia.",
            resultEn: "A Sweeper’s nozzle pushed through the gap and sprayed acid across your forearm. You still dragged Kang in and slid the bolt. The two of you lay on the floor until morning, neither daring to look at the other’s wound.",
            effects: { health: -22, sanity: -14, resonance: +15 },
            recordsAdd: ['survive_night'],
            scarsAdd: ['Cánh tay bỏng đêm 3:13'],
            scheduleConsequences: [
              {
                eventId: 'csq_saved_neighbor_gift',
                delayYears: 7,
                reasonVi: "Ông Kang sống sót, và cả hai mang chung một vết thương",
                reasonEn: "Kang survived, and the two of you share a wound"
              }
            ]
          }
        ]
      },
      {
        labelVi: "Giữ chặt chốt cửa, bịt tai lại",
        labelEn: "Hold the bolt shut and cover your ears",
        resultVi: "Tiếng đập cửa yếu dần rồi tắt. Một thứ chất lỏng ấm rỉ qua khe ván, chạm vào chân bạn. Khi còi báo hết giờ vang lên, bậc thềm đã sạch trơn.",
        resultEn: "The pounding weakened and stopped. Something warm ran under the door and touched your toes. By the time the all-clear sounded, the step was spotless.",
        effects: { sanity: -15, resonance: +14 },
        recordsAdd: ['survive_night'],
        scarsAdd: ['Thứ chảy qua khe cửa']
      }
    ]
  },
  {
    id: 'ch_organ_harvester_alley',
    age: [7, 12],
    major: true,
    weight: 8.5,
    requires: ['Backstreets'],
    forbids: ['Nest', 'Outskirts'],
    vi: "[Ngõ cụt của lũ Rat] Bạn đi nhặt linh kiện và rẽ nhầm vào một ngõ cụt. Hai tên Rat đang đè một đứa trẻ lên bàn sắt, một tên cầm dao mổ, tên kia ôm thùng đá. Đứa trẻ không còn sức kêu. Mảnh kính dưới chân bạn vỡ, và cả hai quay lại.",
    en: "[The Rats’ dead end] Scavenging for parts, you turn into the wrong alley. Two Rats are holding a child down on a metal table, one with a scalpel, the other with a cooler. The child has stopped screaming. Glass cracks under your foot and both of them turn.",
    choices: [
      {
        labelVi: "Nhặt thanh sắt dưới chân và lao vào",
        labelEn: "Grab the iron bar at your feet and charge",
        outcomes: [
          {
            w: 55,
            resultVi: "Thanh sắt trúng cổ gã cầm dao trước khi hắn kịp giơ tay. Tên kia ôm thùng đá chạy mất. Đứa trẻ trên bàn đã chết từ trước. Bạn lấy ví và con dao của gã Rat, về nhà, không kể với ai.",
            resultEn: "The bar caught the one with the scalpel in the throat before he could raise it. The other ran off with the cooler. The child on the table was already dead. You took the Rat’s purse and knife, went home and told no one.",
            effects: { health: -10, sanity: -10, wealth: +8, rep: +6, resonance: +10 },
            flagsAdd: ['해결사동경'],
            scarsAdd: ['Lần đầu giết người']
          },
          {
            w: 45,
            resultVi: "Hắn nhanh hơn. Lưỡi dao rạch từ vai xuống ngực bạn. Bạn bò vào một thùng rác và nằm im giữa mùi thối bốn tiếng, cho tới khi tiếng chân chúng xa hẳn.",
            resultEn: "He was faster. The blade opened a line from your shoulder to your chest. You crawled into a dumpster and lay still in the rot for four hours, until their footsteps were gone.",
            effects: { health: -20, sanity: -14, resonance: +14 },
            scarsAdd: ['Vết dao dọc ngực']
          }
        ]
      },
      {
        labelVi: "Nói \"Tôi biết chỗ lũ trẻ khác ngủ\", đổi chỗ trốn của chúng lấy mạng mình",
        labelEn: "Say “I know where the other kids sleep” and trade their hiding place for your life",
        resultVi: "Hai tên Rat cười, ném cho bạn tám Ahn rồi đi về phía đường cống. Đêm đó có tiếng gào vọng lên từ nắp cống đầu ngõ. Trong số những đứa bị lôi đi có đứa từng bẻ đôi mẩu bánh mì chia cho bạn.",
        resultEn: "The Rats laughed, threw you eight Ahn and walked toward the drain tunnels. That night screaming came up through the grate at the end of the alley. One of the children dragged away had once split a loaf with you.",
        effects: { wealth: +8, sanity: -18, heat: +10, resonance: +18 },
        scarsAdd: ['Chỗ trốn đã bán'],
        scheduleConsequences: [
          {
            eventId: 'csq_bread_victim_revenge',
            delayYears: 6,
            reasonVi: "Có một đứa trẻ sống sót đêm ấy, và nó biết ai đã chỉ chỗ",
            reasonEn: "One child survived that night, and knows who told"
          }
        ]
      }
    ]
  },
  {
    id: 'ch_nest_elite_tutoring',
    age: [8, 12],
    major: true,
    weight: 9,
    requires: ['Nest'],
    vi: "[Cuối bảng điểm] Tháng này, học sinh xếp chót bị bảo an của Wing đưa khỏi lớp giữa giờ học, cả nhà bị tiễn ra cổng Nest trước bữa tối. Hôm sau, giáo viên đặt lên bàn bạn một lọ thuốc không nhãn. \"Uống trước kỳ thi. Chỉ chảy máu mũi một chút.\" Tên bạn đang gần cuối danh sách.",
    en: "[The bottom of the class] This month the student ranked last was walked out of lesson by Wing security, and the whole family was escorted to the Nest gate before dinner. The next day the teacher sets an unlabeled vial on your desk. “Take it before the exam. A little nosebleed, nothing more.” Your name sits near the bottom of the list.",
    choices: [
      {
        labelVi: "Uống thuốc",
        labelEn: "Take the vial",
        resultVi: "Máu mũi rỏ xuống bài thi, nhưng tay bạn không dừng. Bạn đứng nhất. Người ngồi cạnh xếp cuối, và tháng sau chỗ đó trống.",
        resultEn: "Blood dripped from your nose onto the paper, but your hand did not stop. You came first. The student beside you came last, and the next month their seat was empty.",
        effects: { health: -18, sanity: -16, wealth: +15, network: +16, rep: +10, resonance: +12 },
        flagsAdd: ['ThượngLưu'],
        scarsAdd: ['Máu mũi trên bài thi']
      },
      {
        labelVi: "Đổ lọ thuốc vào cốc nước của người đứng đầu lớp",
        labelEn: "Pour the vial into the top student’s water",
        resultVi: "Người đứng đầu lớp gục xuống co giật ngay giữa giờ thi và bị khiêng ra. Bạn bước qua vũng nước đổ để lên nhận suất học bổng của Wing.",
        resultEn: "The top student collapsed mid-exam and was carried out. You stepped over the spilled water to collect the Wing’s scholarship.",
        effects: { sanity: -22, wealth: +20, network: +14, heat: +15, resonance: +18 },
        scarsAdd: ['Cốc nước trong phòng thi']
      }
    ]
  },
  {
    id: 'ch_outskirts_ruins_expedition',
    age: [12, 17],
    major: true,
    weight: 9.5,
    requires: ['Outskirts'],
    vi: "[Lối xuống Ruins] Một trận sạt cát mở ra đường hầm dưới Outskirts. Ở đáy, một Fixer của Eight Association nằm chết, tay vẫn ôm hộp hợp kim khóa kín. Có thứ gì đang gặm xác họ trong bóng tối. Bạn phải quyết định trước khi nó ngẩng đầu.",
    en: "[The shaft under the Ruins] A landslide opens a tunnel beneath the Outskirts. At the bottom lies a dead Eight Association Fixer, still clutching a sealed alloy case. Something is feeding on the body in the dark. You must decide before it lifts its head.",
    choices: [
      {
        labelVi: "Trét bùn lên người cho mất mùi, bò vào lấy chiếc hộp",
        labelEn: "Smear yourself with mud to hide your scent and crawl in for the case",
        startDungeon: 'dungeon_outskirts_ruins',
        resultVi: "Bạn trét bùn khắp người, nín thở, bò sát mặt đá. Đường hầm hẹp dần, và mùi của thứ đang ăn chuyển từ tanh sang ngọt.",
        resultEn: "You smeared mud over yourself, held your breath and crawled along the stone. The tunnel narrowed, and the smell of whatever was feeding turned from rank to sweet."
      },
      {
        labelVi: "Bán chỗ cái hầm cho một nhóm săn tiền thưởng",
        labelEn: "Sell the tunnel’s location to a bounty crew",
        resultVi: "Họ trả mười bốn Ahn và cho bạn đi theo. Bạn học cách đặt bẫy, nghe đất rung, và không bao giờ quay lưng về phía chỗ tối.",
        resultEn: "They paid fourteen Ahn and let you tag along. You learned to set traps, to hear the ground shake, and never to turn your back on the dark.",
        effects: { wealth: +14, network: +12, health: +4 }
      }
    ]
  },

  // --- adolescence ---
  {
    id: 'ad_nest_succession_sabotage',
    age: [13, 17],
    major: true,
    weight: 9.5,
    requires: ['Nest'],
    vi: "[Suất thực tập duy nhất] Gia tộc chỉ được đề cử một người vào Wing. Anh họ vu cho bạn tội bán bí mật phòng thí nghiệm, và các trưởng bối tin anh ta. Bạn có đoạn ghi âm cho thấy anh ta thuê người của Shi Association dọa giám khảo tuần trước. Cả nhà chờ bạn giải thích.",
    en: "[The one nomination] The family may nominate only one person to the Wing this year. Your cousin has accused you of leaking lab documents, and the elders believe him. You hold a recording of him hiring someone from Shi Association to threaten an examiner last week. The whole house waits for your explanation.",
    choices: [
      {
        labelVi: "Gửi đoạn ghi âm cho ban thanh tra nội bộ của Wing",
        labelEn: "Send the recording to the Wing’s internal inspectors",
        resultVi: "Thanh tra của Wing bắt anh ta ngay trong đêm, cha mẹ anh ta bị triệu tập sau đó. Bạn nhận suất đề cử. Từ đó, trong các bữa tiệc gia tộc, ghế bên cạnh bạn luôn trống.",
        resultEn: "The inspectors took him that night, and his parents were summoned after. You got the nomination. At family dinners from then on, the seat beside you stayed empty.",
        effects: { wealth: +22, network: +18, rep: +14, sanity: -12, resonance: +12 },
        flagsAdd: ['ThượngLưu'],
        scarsAdd: ['Cả một nhánh họ bị đưa đi']
      },
      {
        labelVi: "Giữ đoạn ghi âm và bắt anh ta làm việc cho bạn",
        labelEn: "Keep the recording and make him work for you",
        resultVi: "Anh ta rút đơn, đưa bạn quỹ riêng, và từ đó nói chuyện với bạn bằng một giọng lễ phép đến lạ.",
        resultEn: "He withdrew, handed you his private savings, and from then on spoke to you with strange politeness.",
        effects: { wealth: +28, network: +15, sanity: -6 }
      }
    ]
  },
  {
    id: 'ad_index_paper_slip',
    age: [13, 16],
    major: true,
    weight: 8,
    requires: ['Backstreets'],
    forbids: ['Nest', 'Outskirts'],
    vi: "[Prescript của The Index] Một Messenger, mắt bịt vải trắng, đặt cuộn giấy vào tay bạn. Prescript viết: trước nửa đêm, cắt ngón áp út tay trái của người đầu tiên đã mỉm cười với bạn sáng nay, ngâm trong rượu ấm, đặt trên bậu cửa sổ tầng ba của khu nhà đổ nát. Người đó là bà Hwa, người từng băng vết thương cho bạn mà không lấy tiền.",
    en: "[A Prescript of the Index] An Index Messenger with eyes bound in white presses a slip into your hand: 「Before midnight, cut off the left ring finger of the first person who smiled at you today. Steep it in warm liquor. Leave it on a third-floor windowsill of the ruined block.」 The first person who smiled at you this morning was Mrs. Hwa, who once bandaged your wounds for free.",
    choices: [
      {
        labelVi: "Làm theo Prescript",
        labelEn: "Follow the Prescript",
        resultVi: "Bà Hwa không kêu. Bà chỉ nhìn bạn. Khi bạn đặt cái cốc lên bậu cửa sổ, ai đó trong bóng tối dưới đường cúi chào.",
        resultEn: "Mrs. Hwa did not scream. She only looked at you. When you set the glass on the windowsill, someone in the dark below the street bowed.",
        effects: { sanity: -14, rep: +10, resonance: +12 },
        flagsAdd: ['IndexAttention'],
        scarsAdd: ['Ngón tay của bà Hwa'],
        scheduleConsequences: [
          {
            eventId: 'csq_index_recruitment_call',
            delayYears: 4,
            reasonVi: "The Index nhớ người đã làm theo không chút do dự",
            reasonEn: "The Index remembers the one who obeyed without hesitating"
          }
        ]
      },
      {
        labelVi: "Cắt ngón út của chính mình thay vào, mong chúng không nhận ra",
        labelEn: "Cut off your own little finger instead and hope they cannot tell",
        resultVi: "Chúng nhận ra. Ba Proselyte đến gần sáng, bẻ gãy ba xương sườn của bạn rồi để bạn sống. \"Bạn đã hiến máu. Lần sau, làm cho đúng.\"",
        resultEn: "They could tell. Three Proselytes came just before dawn, broke three of your ribs and let you live. “You gave blood. Next time, do it right.”",
        effects: { health: -14, sanity: -8, resonance: +12 },
        scarsAdd: ['Bàn tay thiếu một ngón']
      },
      {
        labelVi: "Đốt tờ Prescript và lẩn vào đám đông Backstreets",
        labelEn: "Burn the Prescript and slip into the Backstreets crowd",
        resultVi: "Tờ giấy thành tro trên ngọn đèn dầu. Mấy ngày liền bạn không dám qua con phố cũ, và mỗi lần thấy dải vải trắng là tim bạn đập mạnh.",
        resultEn: "The paper turned to ash over an oil flame. For days you avoided the old street, and your heart jumped at every strip of white cloth.",
        effects: { sanity: -8, heat: +8 },
        flagsAdd: ['PrescriptDefied']
      }
    ]
  },
  {
    id: 'ad_retired_fixer_mentor',
    age: [14, 17],
    major: true,
    weight: 9,
    requires: ['Backstreets'],
    forbids: ['Nest'],
    vi: "[Bài thử của Salvador] Salvador, cựu Fixer Grade 4 với nửa khuôn mặt hỏng vì axit, dẫn bạn xuống hầm của một Office cũ. Trong lồng là một con chó chiến bị bỏ đói năm ngày. Ông ném cho bạn đoạn ống thép gỉ. \"Vào đi. Ra được thì ta dạy tiếp.\"",
    en: "[Salvador’s test] Salvador, a retired Grade 4 Fixer with half his face ruined by acid, leads you down to the cellar of an old Office. In the cage is a fighting dog starved for five days. He tosses you a length of rusted steel pipe. “Get in. If you come out, I keep teaching you.”",
    choices: [
      {
        labelVi: "Đưa tay trái cho nó cắn, dùng tay phải đâm",
        labelEn: "Give it your left arm to bite and strike with your right",
        resultVi: "Răng nó cắm tới xương. Đoạn ống của bạn tìm thấy mắt nó. Salvador mở lồng, ném cho bạn cuộn băng, và lần đầu gọi bạn bằng tên.",
        resultEn: "Its teeth went to the bone. Your pipe found its eye. Salvador opened the cage, tossed you a roll of bandage, and for the first time called you by name.",
        effects: { health: -14, sanity: -6, rep: +14, network: +12, resonance: +12 },
        flagsAdd: ['FixerTrained'],
        npcAdd: { role: 'mentor', nameVi: 'Salvador', nameEn: 'Salvador', bond: 70, traitVi: 'Fixer Grade 4 đã giải nghệ, nửa mặt bị axit, ít khen nhưng không bao giờ bỏ rơi học trò', traitEn: 'retired Grade 4 Fixer, half his face burned by acid, stingy with praise, never abandons a student' },
        scarsAdd: ['Vết răng trên cánh tay trái'],
        meritAdd: 12
      },
      {
        labelVi: "Dùng ống thép giữ khoảng cách, ghìm mõm nó xuống sàn",
        labelEn: "Keep your distance with the pipe and pin its jaws to the floor",
        resultVi: "Bạn né cú chồm đầu tiên, rồi dồn cả sức nặng đè ống thép ngang họng nó. Salvador mở lồng và gật đầu. \"Biết dùng đầu. Tốt hơn là chỉ biết đưa mạng ra.\"",
        resultEn: "You dodged the first lunge and put your whole weight behind the pipe across its throat. Salvador opened the cage and nodded. “At least you use your head instead of throwing your life away.”",
        effects: { health: -8, sanity: -4, rep: +10, network: +10, resonance: +8 },
        flagsAdd: ['FixerTrained'],
        npcAdd: { role: 'mentor', nameVi: 'Salvador', nameEn: 'Salvador', bond: 65, traitVi: 'Fixer Grade 4 đã giải nghệ, nửa mặt bị axit, ít khen nhưng không bao giờ bỏ rơi học trò', traitEn: 'retired Grade 4 Fixer, half his face burned by acid, stingy with praise, never abandons a student' },
        scarsAdd: ['Vết cào ở bắp đùi'],
        meritAdd: 10
      },
      {
        labelVi: "Bám vào song sắt, xin ông mở cửa",
        labelEn: "Grab the bars and beg him to open the door",
        resultVi: "Ông bắn con chó qua song sắt, rồi đá gãy mũi bạn và đuổi bạn ra đường. \"Ngoài kia không ai mở cửa cho mày đâu.\"",
        resultEn: "He shot the dog through the bars. Then he broke your nose with his boot and threw you out. “Out there, no one opens the door for you.”",
        effects: { health: -6, sanity: -10, rep: -8 },
        scarsAdd: ['Cái mũi gãy của Salvador']
      }
    ]
  },

  // --- eighteen ---
  {
    id: 'ad_outskirts_crossroad_18',
    age: [15, 99],
    jobs: ['Child'],
    regions: ['OUTSKIRTS'],
    major: true,
    weight: 999,
    vi: "[Bên kia bức tường] Đến tuổi phải tự lo thân, bạn theo đoàn phế liệu tới cổng kiểm hàng. Ánh đèn The City đã gần, nhưng bạn vẫn đứng ngoài tường. Người dẫn đường chỉ ba người đang cần thêm tay chân. Mỗi người có một lối đưa bạn vào Backstreets, và không ai hứa lối quay về.",
    en: "[Across the wall] Old enough to carry your own weight, you leave camp with a scrap caravan and reach the cargo checkpoint. The City lights are near, but you still stand outside the wall. Your guide points out three people who need workers. Each has a way into the Backstreets. None promises a way back.",
    choices: [
      {
        labelVi: "Theo người chở hàng vào xưởng",
        labelEn: "Follow the freight crew to a workshop",
        resultVi: "Bạn đẩy xe phế liệu qua cổng. Bên trong, một thợ ở District T giữ bạn lại vì đôi tay còn lành và trả công theo ngày, không ghi tên vào sổ nào. Đêm đầu trong Backstreets, bạn ngủ cạnh một lò rèn đã nguội.",
        resultEn: "You pushed the scrap cart through the gate. Inside, a District T smith kept you for your sound hands and paid by the day, entering your name in no ledger. Your first night in the Backstreets was spent beside a cold forge.",
        setRegion: 'T',
        setJob: 'Outcast',
        effects: { health: -5, wealth: 5, network: 4 },
        flagsAdd: ['EnteredCity']
      },
      {
        labelVi: "Nhận lời người tuyển việc của một Office",
        labelEn: "Take an offer from an Office recruiter",
        resultVi: "Người tuyển việc ghi bạn vào danh sách khuân vác có bảo lãnh. Qua cổng District J, hắn dẫn bạn tới quầy đăng ký Fixer. Lệ phí ngốn gần hết tiền công ứng trước. Thẻ Grade 9 có tên bạn, nhưng không ghi nơi bạn sinh ra.",
        resultEn: "The recruiter put you on a sponsored labor list. Past the District J gate he took you to a Fixer registration desk. The fee ate most of your advance. The Grade 9 card carried your name, but not where you were born.",
        setRegion: 'J',
        setJob: 'Fixer',
        setFixerGrade: 9,
        effects: { wealth: -5, network: 5, rep: 3 },
        flagsAdd: ['EnteredCity'],
        recordsAdd: ['fixer_license']
      },
      {
        labelVi: "Đi theo kẻ buôn lậu qua lối khuất",
        labelEn: "Follow a smuggler through a hidden route",
        resultVi: "Bạn bỏ xe hàng, theo hắn qua lối phục vụ dưới chân tường. Tới Backstreets của District K, hắn đưa bạn một con dao và nói tiền dẫn đường sẽ trừ vào việc đầu tiên. Bạn chưa hỏi việc đó là gì.",
        resultEn: "You left the caravan and followed him through a service passage under the wall. In District K’s Backstreets he handed you a knife and said the passage fee would come out of your first job. You had not asked what the job was.",
        setRegion: 'K',
        setJob: 'Syndicate',
        effects: { wealth: 6, heat: 10, sanity: -6 },
        flagsAdd: ['EnteredCity']
      }
    ]
  },
  {
    id: 'ad_career_crossroad_18',
    age: [15, 99],
    major: true,
    weight: 999,
    vi: "[Đến tuổi phải tự lo] Tiền ăn, tiền ở và các khoản nợ giờ đứng tên bạn. Dưới mái hiên Backstreets, bạn nhìn ba nơi còn nhận người: quầy cấp thẻ Fixer, một Syndicate, và cổng tuyển dụng của Wing. Bạn chỉ đủ sức nộp một đơn.",
    en: "[Working age] Food, rent and debts are now in your name. Under a Backstreets awning you look at the three places still taking people: the Fixer licensing desk, a Syndicate, and the Wing’s hiring gate. You have strength for one application.",
    choices: [
      {
        labelVi: "Đăng ký làm Fixer Grade 9 với Hana Association",
        labelEn: "Register with Hana Association as a Grade 9 Fixer",
        resultVi: "Bạn nộp lệ phí ở quầy Hana và nhận thẻ Fixer Grade 9. Người thư ký không ngẩng đầu. \"Giữ thẻ cho khô. Nếu qua được năm đầu, bạn sẽ cần nó.\"",
        resultEn: "You paid the fee at the Hana desk and took your Grade 9 card. The clerk did not look up. “Keep the card dry. If you last the first year, you will need it.”",
        setJob: 'Fixer',
        setFixerGrade: 9,
        effects: { rep: +14, network: +10, wealth: +12, sanity: -4 },
        recordsAdd: ['fixer_license'],
        meritAdd: 6
      },
      {
        labelVi: "Theo một Syndicate trong khu",
        labelEn: "Join a local Syndicate",
        resultVi: "Capo đưa bạn một con dao và danh sách các hộ nợ tiền bảo kê. \"Thu đủ trước bình minh.\" Không ai hỏi bạn đã cầm dao bao giờ chưa.",
        resultEn: "A Capo handed you a knife and a list of households behind on protection money. “Collect it all before dawn.” No one asked whether you had ever held a knife.",
        setJob: 'Syndicate',
        effects: { wealth: +22, rep: +12, heat: +8, sanity: -6 },
        recordsAdd: ['finger_initiate'],
        meritAdd: 6
      },
      {
        labelVi: "Nộp đơn vào làm cho một Wing",
        labelEn: "Apply to work for a Wing",
        resultVi: "Bạn qua vòng tuyển, nhận thẻ thử việc và đồng phục Feather. Hợp đồng cho phép Wing điều động cơ thể nhân viên khi Singularity gặp sự cố. Chữ ký của bạn nằm ngay dưới điều khoản đó.",
        resultEn: "You passed the interview and received a probationary badge and a Feather uniform. The contract let the Wing dispose of an employee’s body when a Singularity failed. Your signature sat directly under that clause.",
        setJob: 'Wing Employee',
        setWingRank: 0,
        effects: { wealth: +18, network: +14, rep: +6, sanity: -6 },
        meritAdd: 6,
        flagsAdd: ['Feather', 'Nest'],
        recordsAdd: ['nest_migration']
      }
    ]
  },
  // --- found in childhood, not scheduled by any earlier choice ---
  {
    id: 'child_rusty_workshop_blade',
    age: [7, 13],
    major: true,
    weight: 60,
    forbids: ['child_blade_found'],
    vi: "[Thanh đao rỉ dưới bãi rác] Đang bới linh kiện trong bãi phế thải Backstreets, tay bạn chạm vào chuôi kiếm bọc da sờn. Đó là một thanh đao Workshop bị bỏ lại sau vụ thanh trừng đêm qua. Lưỡi đã mẻ vài chỗ, nhưng thép vẫn sáng dưới đèn đường.",
    en: "[A rusted blade in the dump] Digging for parts in the Backstreets refuse, your hand closes on worn leather: a Workshop sabre left behind after last night’s purge. The edge is nicked, but the steel still shines under the streetlamp.",
    choices: [
      {
        labelVi: "Giấu dưới gầm giường và tập vung kiếm lén",
        labelEn: "Hide it under your cot and practice forms in secret",
        resultVi: "Những vết chai đầu tiên mọc trên lòng bàn tay bạn. Cầm thép trong tay cho bạn chút can đảm hiếm hoi giữa khu ổ chuột này.",
        resultEn: "The first calluses hardened across your palms. Holding steel gave you a little courage, rare in that neighborhood.",
        effects: { health: +5, sanity: +5, rep: +4 },
        meritAdd: 6,
        flagsAdd: ['child_blade_found', 'EarlySwordAptitude']
      },
      {
        labelVi: "Bán cho một lò rèn Workshop ở đầu hẻm lấy mười Ahn",
        labelEn: "Sell it to the alley forge for ten Ahn",
        resultVi: "Người thợ rèn khen mắt bạn tinh, trả mười Ahn và cho một đĩa bánh bao nóng. Cả nhà bạn đủ ăn suốt một tuần.",
        resultEn: "The smith praised your eye, paid ten Ahn and gave you hot dumplings. The household ate for a week.",
        effects: { wealth: +10, sanity: +6 },
        meritAdd: 10,
        flagsAdd: ['child_blade_found']
      }
    ]
  },
  {
    id: 'child_middle_brother_protection',
    age: [10, 16],
    major: true,
    weight: 55,
    forbids: ['child_middle_favor_done'],
    vi: "[Người của Middle] Đám cướp giật giày của bạn. Một người mặc áo tím thêu xích bước tới và hất tên cầm đầu ngã vào thùng rác bằng một cú tay. \"Đứng dậy, nhóc. Ở đây không đấm trả thì bị ăn.\" Người ấy nhìn bạn, chờ.",
    en: "[One of the Middle] Muggers corner you for your shoes. A man in a purple coat embroidered with chains strolls up and knocks the ringleader into the bins with one backhand. “Stand up, kid. In this alley, if you don’t hit back, you get eaten.” He waits to see what you do.",
    choices: [
      {
        labelVi: "Lau máu mũi và xin được dạy cách đấm",
        labelEn: "Wipe your bloody nose and ask to be taught to fight",
        resultVi: "Người ấy cười, vỗ vai bạn đau điếng, chỉ cho bạn thế thủ cơ bản của Middle và cho phép bạn nhắc tên mình khi gặp rắc rối ở khu này.",
        resultEn: "The Big Brother laughed, clapped your shoulder hard, showed you the Middle’s basic guard and gave you leave to use his name in these alleys.",
        effects: { health: +8, sanity: +8, rep: +10 },
        meritAdd: 8,
        flagsAdd: ['child_middle_favor_done', 'MiddleSympathy']
      },
      {
        labelVi: "Cúi đầu cảm ơn rồi chạy về nhà",
        labelEn: "Bow in thanks and run home",
        resultVi: "Bạn giữ được mình và tránh xa mối thù giữa các Finger.",
        resultEn: "You stayed safe and kept clear of the Fingers’ feuds for now.",
        effects: { sanity: +4 },
        flagsAdd: ['child_middle_favor_done']
      }
    ]
  }
];

// ============================================================================
// WHAT COMES BACK, consequences planted by earlier choices, run by the Loom
// ============================================================================

import { THREAD_CONSEQUENCES } from './narrative/causalThreads.js';
import { FORBIDDEN_ACTS } from './eventsForbidden.js';
import { EXPANSION_CONSEQUENCE_EVENTS } from './eventsNpcAndWorldExpansion.js';

export const CONSEQUENCE_EVENTS = [
  {
    id: 'csq_saved_neighbor_gift',
    major: true,
    isCausalCallback: true,
    vi: "[Ông Kang trở lại] Bảy năm sau đêm 3:13, ông Kang gõ cửa nhà bạn. Cánh tay vẫn thiếu, cơn ho nặng hơn trước. Ông đặt lên bàn lưỡi đao răng cưa và cuốn sổ liên lạc của một Fixer cũ. \"Năm đó cháu cho chú thêm thời gian. Giờ chú trả lại thứ còn dùng được.\"",
    en: "[Old Kang returns] Seven years after the 3:13 night, Old Kang knocks at your door. The arm is still missing and the cough is worse. He sets a serrated blade and a Fixer’s old contact book on the table. “That year you bought me time. Now I give back what still works.”",
    choices: [
      {
        labelVi: "Nhận lấy và ở lại với ông đến cuối",
        labelEn: "Take them and stay with him to the end",
        resultVi: "\"Ít ra tao chết trên giường,\" ông nói. Ông mất trước khi trời sáng. Cuốn sổ có những cái tên sau này sẽ mở cho bạn nhiều cánh cửa.",
        resultEn: "“At least I die in a bed,” he said. He was gone before dawn. The book held names that would open many doors for you.",
        effects: { health: +6, sanity: -4, wealth: +12, network: +12, rep: +10, resonance: +8 },
        flagsAdd: ['고급장비'],
        meritAdd: 16
      }
    ]
  },
  {
    id: 'csq_bread_victim_revenge',
    major: true,
    isCausalCallback: true,
    vi: "[Đứa trẻ ở cống] Một sợi dây thép siết vào cổ bạn trong kho hàng tối. Kẻ cầm dây chỉ còn một mắt, vết sẹo mổ chạy dọc sườn. Bạn nhận ra đứa trẻ duy nhất sống sót đêm ở đường cống. \"Tám Ahn của lũ Rat. Có đáng không?\"",
    en: "[The child from the drain] A steel wire tightens around your throat in a dark warehouse. The one holding it has a single eye and a surgical scar along the ribs. You know them: the only child who lived through that night in the drain. “Eight Ahn from the Rats. Was it worth it?”",
    choices: [
      {
        labelVi: "Chống trả",
        labelEn: "Fight back",
        outcomes: [
          {
            w: 55,
            resultVi: "Sợi dây cắt sâu vào cổ, nhưng bạn vẫn với tới được họ. Khi xong, bạn ngồi cạnh cái xác rất lâu. Hai người từng ngủ chung một đường cống.",
            resultEn: "The wire cut deep into your neck, but you still reached them. When it was over you sat beside the body a long time. The two of you had once slept in the same drain.",
            effects: { health: -12, sanity: -6, rep: +12, resonance: +10 },
            scarsAdd: ['Vết dây thép quanh cổ'],
            meritAdd: 14
          },
          {
            w: 45,
            resultVi: "Họ ghì bạn xuống. Họ lấy một mắt của bạn, chậm rãi, rồi lấy hết tiền, rồi đi. \"Giờ thì mình giống nhau.\"",
            resultEn: "They held you down. They took one of your eyes, slowly, then all your money, then left. “Now we match.”",
            effects: { health: -14, wealth: -10, sanity: -10, resonance: +14 },
            scarsAdd: ['Con mắt trả cho đêm ấy']
          }
        ]
      },
      {
        labelVi: "Đưa họ mười tám Ahn và một ngón tay",
        labelEn: "Give them eighteen Ahn and one finger",
        resultVi: "Họ nhận cả hai. Trước khi đi, họ nói: \"Vậy chưa đủ. Nhưng tao mệt rồi.\"",
        resultEn: "They took both. Before leaving they said: “It isn’t enough. But I’m tired.”",
        effects: { health: -8, wealth: -10, sanity: -6, heat: -8 },
        scarsAdd: ['Ngón tay trả nợ']
      }
    ]
  },
  {
    id: 'csq_parent_historic_passing',
    age: [1, 99],
    major: true,
    isCausalCallback: true,
    vi: '[Ngày {parentName} ngã xuống] Năm bạn {age} tuổi, người bảo hộ lớn nhất đời bạn đã không trở về. {parentName} qua đời vì {parentDeath}. Trước khi trút hơi thở cuối, người ấy gửi lại cho bạn 「{relic}」.\nBạn đứng trong căn phòng vắng lặng, nhận ra từ nay bạn phải tự mình bước đi giữa The City.',
    en: '[The Fall of {parentName}] When you reached age {age}, your greatest protector never returned. {parentName} fell due to {parentDeath}. With their last breath, they entrusted you with 「{relic}」.\nYou stand in the empty room, realizing from this day forward, you walk The City alone.',
    choices: [
      {
        labelVi: 'Nắm chặt di vật, thề tiếp nối con đường của {parentName}',
        labelEn: 'Grip the relic, swearing to carry on {parentName}’s path',
        resultVi: 'Bạn lau khô nước mắt, quấn chặt di vật vào người. Danh tiếng và sự kiên cường của {parentName} hòa vào dòng máu bạn.',
        resultEn: 'You wiped away your tears and bound the relic close. {parentName}’s name and resolve became one with your blood.',
        effects: { sanity: +15, rep: +15, network: +10 },
        scarsAdd: ['Người tiếp bước {parentName}'],
        meritAdd: 15
      },
      {
        labelVi: 'Khắc cốt ghi tâm mối thù, thề bắt kẻ thủ ác phải trả giá',
        labelEn: 'Inscribe the vengeance in your marrow, swearing retribution',
        resultVi: 'Đôi mắt bạn ánh lên ngọn lửa căm hờn. Ký ức về {parentName} hóa thành động lực sinh tồn tàn nhẫn nhất.',
        resultEn: 'A bitter fire ignited behind your eyes. Memories of {parentName} became your most ruthless weapon for survival.',
        effects: { sanity: -10, heat: +20, resonance: +18 },
        scarsAdd: ['Mối Thù Của {parentName}'],
        meritAdd: 15
      }
    ]
  },
  {
    id: 'csq_parent_old_comrade',
    major: true,
    isCausalCallback: true,
    vi: "[Người từng đi cùng {parentName}] Trong một quán rượu dưới hầm, một Fixer cụt chân ngồi xe lăn túm cổ tay bạn khi thấy 「{relic}」. \"Cái này là của {parentName}.\" Ông kể: đêm đó {parentName} đứng chắn trước một băng đạn của Thumb để ông bò ra được.",
    en: "[Someone who rode with {parentName}] In a basement bar, a legless Fixer in a wheelchair catches your wrist when he sees 「{relic}」. “That is {parentName}’s.” He tells you that night {parentName} stood in front of a Thumb magazine so he could crawl out.",
    choices: [
      {
        labelVi: "Nhờ ông dạy bạn những gì {parentName} từng biết",
        labelEn: "Ask him to teach you what {parentName} knew",
        resultVi: "Ông dạy bạn mười bốn ngày, không nương tay. Đến ngày cuối, mỗi khi bạn giận, có thứ gì đó cháy quanh lưỡi vũ khí. Ông gọi nó là Shin.",
        resultEn: "He taught you for fourteen days without mercy. By the last day, whenever you were angry, something burned around the blade. He called it Shin.",
        effects: { health: -10, sanity: +10, network: +22, rep: +18, resonance: +16 },
        flagsAdd: ['ShinAwakened'],
        meritAdd: 20
      }
    ]
  },
  {
    id: 'csq_index_recruitment_call',
    major: true,
    isCausalCallback: true,
    vi: "[Lời triệu tập] Bạn tỉnh dậy lúc nửa đêm. Trên gối có một dải vải trắng gấp gọn, bên dưới là một Prescript: 「Người đã đặt chiếc cốc lên bậu cửa sổ năm ấy: hãy khâu mắt lại trong ba ngày và đến với chúng ta. Nếu không, con phố này sẽ không còn ai.」",
    en: "[The summons] You wake at midnight. On your pillow lies a strip of white cloth, folded neatly, and under it a Prescript: 「You who set the glass on the windowsill that year: sew your eyes shut within three days and come to us. If not, this street will have no one left.」",
    choices: [
      {
        labelVi: "Khâu mắt lại và đi",
        labelEn: "Sew your eyes shut and go",
        resultVi: "Bạn khâu từng mũi bằng tay. Trong bóng tối, bạn bắt đầu nghe những thứ trước đây không nghe: bước chân ba tầng dưới, một người nói dối. Một Proselyte nắm tay bạn dẫn đi.",
        resultEn: "You made each stitch by hand. In the dark you began to hear what you had never heard: footsteps three floors down, someone telling a lie. A Proselyte took your hand and led you away.",
        setJob: 'Syndicate',
        setFinger: 'Index',
        setFingerRank: 1,
        effects: { health: -15, sanity: -12, rep: +18, network: +16, resonance: +20 },
        recordsAdd: ['finger_initiate'],
        scarsAdd: ['Đôi mắt đã khâu'],
        meritAdd: 18
      },
      {
        labelVi: "Gài bẫy chờ chúng đến",
        labelEn: "Set a trap and wait for them",
        resultVi: "Ba ngày sau, hai Proselyte bước qua cửa và không bước ra nữa. Mảnh kim loại găm đầy lưng bạn. Bạn rời khu phố qua đường cống, và từ đó The Index tìm bạn.",
        resultEn: "Three days later two Proselytes walked through your door and did not walk out. Shrapnel filled your back. You left the neighborhood through the sewers, and the Index has looked for you since.",
        effects: { health: -14, sanity: -8, rep: +15, heat: +20, resonance: +12 },
        scarsAdd: ['Mảnh kim loại trong lưng']
      }
    ]
  },
  {
    id: 'csq_lost_contraband_collector',
    major: true,
    isCausalCallback: true,
    vi: '[Đến lúc trả] Ba người của Syndicate năm xưa tìm ra chỗ bạn ở. Một người đặt lên bàn chiếc kìm cắt xương. "Kiện hàng của J Corp mày làm mất. Tính cả lãi là 35 Ahn. Hoặc bốn ngón tay phải."',
    en: '[Time to pay] Three Syndicate men from years ago found where you live. One set a pair of bone cutters on the table. “The J Corp package you lost. With interest, 35 Ahn. Or four fingers off your right hand.”',
    choices: [
      {
        labelVi: 'Trả 35 Ahn',
        labelEn: 'Pay the 35 Ahn',
        resultVi: 'Tiền dành dụm của bạn biến mất trong một buổi chiều. Bàn tay cầm vũ khí của bạn vẫn còn đủ ngón.',
        resultEn: 'Your savings were gone in an afternoon. Your weapon hand still has all its fingers.',
        effects: { wealth: -35, heat: -20, sanity: -5 }
      },
      {
        labelVi: 'Chộp lấy chiếc kìm trước',
        labelEn: 'Grab the cutters first',
        resultVi: 'Căn phòng quá chật cho bốn người đánh nhau. Khi xong, chỉ còn bạn đứng được. Bạn mất cả đêm để lau sàn.',
        resultEn: 'The room was too small for four people to fight in. When it was over, only you were standing. It took you all night to clean the floor.',
        effects: { health: -28, sanity: -12, rep: +16, heat: +22, resonance: +14 },
        meritAdd: 14
      }
    ]
  },
  {
    id: 'csq_middle_ambush_adult',
    major: true,
    isCausalCallback: true,
    vi: "[Book of Vengeance] Cả con phố bỗng im. Xích kéo lê trên mặt đường. Một Big Brother của The Middle bước ra, hình xăm tím trên tay sáng trong bóng tối, mười Little Brother đứng sau. \"Chương bảy, điều bốn mươi hai. Kẻ làm nhục The Middle bị bẻ tay chân trước, cột sống sau.\"",
    en: "[Book of Vengeance] The whole street goes quiet. Chains drag on the asphalt. A Big Brother of the Middle steps forward, the purple tattoos on his arms glowing in the dark, ten Little Brothers behind him. “Chapter seven, clause forty-two. Whoever shames the Middle has their limbs broken first, the spine after.”",
    choices: [
      {
        labelVi: "Đánh đến cùng",
        labelEn: "Fight to the end",
        outcomes: [
          {
            w: 50,
            resultVi: "Cú đầu tiên của hắn gãy ba xương sườn bạn. Bạn vẫn đứng. Khi sợi xích của hắn đứt, đám Little Brother lùi lại. Từ hôm đó cả khu biết tên bạn.",
            resultEn: "He broke three of your ribs with the first blow. You stayed up. When his chain snapped, the Little Brothers stepped back. From that day the whole district knew your name.",
            effects: { health: -24, sanity: -10, rep: +22, heat: -20, resonance: +18 },
            scarsAdd: ['Người làm đứt xích của The Middle'],
            meritAdd: 30
          },
          {
            w: 50,
            resultVi: "Cú thứ hai làm vỡ xương vai. Chúng bẻ chân bạn, lấy hết những gì bạn có, rồi bỏ đi vì nghĩ bạn đã chết. Chúng nghĩ sai, nhưng chỉ suýt soát.",
            resultEn: "The second blow shattered your shoulder. They broke your leg, took everything you had, and left when they thought you were dead. They were wrong, but only just.",
            effects: { health: -38, sanity: -20, wealth: -18, resonance: +24 },
            scarsAdd: ['Bả vai vỡ dưới nắm đấm']
          }
        ]
      }
    ]
  },
  {
    id: 'csq_hana_corruption_audit',
    major: true,
    isCausalCallback: true,
    vi: "[Thanh tra của Öufi] Người của Öufi Association và Seven Association khóa cửa văn phòng, hai thanh tra ngồi hai bên bàn bạn như hai cây cột. Bản báo cáo giả bạn nộp năm ấy đã để một Abnormality ăn cả một dãy nhà. Hợp đồng ghi hình phạt là cái chết, thi hành tại chỗ. Họ chỉ chờ bạn nói ai đã ký.",
    en: "[Öufi’s auditors] People from Öufi and Seven Association lock your office door and sit on either side of your desk like two pillars. The false report you filed years ago let an Abnormality devour a whole block. The contract names the penalty: death, carried out on the spot. They only wait for you to say who signed it.",
    choices: [
      {
        labelVi: "Đổ tội cho người cấp dưới tin bạn nhất",
        labelEn: "Pin it on the subordinate who trusts you most",
        resultVi: "Người đó nhìn bạn, chưa hiểu gì, cho tới khi Öufi đọc tên họ. Thanh tra đóng dấu \"Đã giải quyết\" và đi. Bạn giữ được chức. Bạn không còn nhìn vào gương được lâu.",
        resultEn: "They looked at you without understanding, until Öufi read out their name. The auditor stamped “Resolved” and left. You kept your post. You could no longer look in a mirror for long.",
        effects: { wealth: -18, sanity: -22, rep: +5, resonance: +22 },
        scarsAdd: ['Người cấp dưới đã chết thay']
      },
      {
        labelVi: "Phá cửa sổ mà chạy",
        labelEn: "Break the window and run",
        resultVi: "Lưỡi kích của Öufi rạch ngang lưng khi bạn nhảy xuống nóc một đoàn tàu đang chạy. Bạn sống. Từ giờ bạn là kẻ bị truy nã.",
        resultEn: "An Öufi halberd opened your back as you jumped onto the roof of a passing train. You lived. From then on you were wanted.",
        effects: { health: -28, wealth: -18, rep: -18, heat: +25, resonance: +16 },
        scarsAdd: ['Vết kích của Öufi'],
        meritAdd: -25
      }
    ]
  },
  {
    id: 'csq_warp_survivor_debt',
    major: true,
    isCausalCallback: true,
    vi: "[Mẩu thịt toa cuối] Thanh tra W Corp tìm ra thứ bạn mang khỏi tàu WARP. Họ đặt chiếc lọ lên bàn. \"Trả phí vi phạm, hoặc đi dọn chuyến tàu sau.\" Cửa đã có người canh.",
    en: "[Tissue from the last car] A W Corp inspector and a T Corp auditor cordon off your quarters. On the table is the glass jar you carried out of the last car. “WARP trains do not lose passengers. This tissue breaches W Corp’s patent. Pay forty-two Ahn in fines, or clean the next departure unpaid.” The door is already guarded.",
    choices: [
      {
        labelVi: "Nộp 42 Ahn để khép lại vụ việc",
        labelEn: "Pay 42 Ahn to close the case",
        resultVi: "Thanh tra đóng dấu đỏ lên hồ sơ rồi đem cái lọ đi đốt. Bạn mất sạch tiền dành dụm, nhưng không phải bước lên toa đó lần nữa.",
        resultEn: "The inspector stamped the file in red and burned the jar. Your savings were gone, but you did not have to step into that car a second time.",
        effects: { wealth: -42, sanity: +5, taboo: -2 }
      },
      {
        labelVi: "Rút vũ khí, phá vòng vây, chạy vào đường ngầm",
        labelEn: "Draw your weapon, break the cordon and run into the tunnels",
        resultVi: "Lưỡi cưa của một W Corp Cleaner xé vai bạn trước khi bạn rơi qua nắp cống. Bạn sống sót trong bóng tối Backstreets, với một vết thương đau mỗi khi trời lạnh.",
        resultEn: "A W Corp Cleaner’s rip-saw tore your shoulder before you dropped through the sewer grate. You survived in the dark of the Backstreets with a wound that ached whenever the cold came.",
        effects: { health: -38, rep: +20, heat: +35, resonance: +20 },
        scarsAdd: ['Vết cưa của W Corp Cleaner'],
        meritAdd: 18
      }
    ]
  },
  {
    id: 'csq_ncorp_heretic_hunt',
    major: true,
    isCausalCallback: true,
    vi: "[Đứa trẻ trở lại] Ba Inquisitor của N Corp dồn bạn vào ngõ cụt, búa và đinh sáng lên trong bóng tối. Khi chiếc đinh đầu tiên gần chạm vai, một bóng người nhảy từ mái nhà xuống, tay cầm lưỡi cưa Workshop lớn. Đứa trẻ bạn từng cắt dây trói năm xưa, giờ là Fixer Grade 3 với mắt và tay mạ crôm. \"Lần này để tôi nhổ đinh cho bạn.\"",
    en: "[The child comes back] Three N Corp Inquisitors back you into a dead end, hammers and nails gleaming in the dark. As the first nail nears your shoulder, a figure drops from the rooftops with a Workshop chainsaw blade: the orphan you cut loose years ago, now a Grade 3 Fixer with chrome eyes and arms. “This time I pull the nails for you.”",
    choices: [
      {
        labelVi: "Kề vai chiến đấu, cùng đập tan toán Inquisitor",
        labelEn: "Fight shoulder to shoulder and break the Inquisitor squad",
        resultVi: "Hai lưỡi vũ khí khớp nhịp. Ba Inquisitor ngã. Người ấy lau máu trên lưỡi cưa, cười, và đưa bạn một khẩu súng ngắn Workshop đặc chế. \"Giờ mình là người một nhà.\"",
        resultEn: "Your weapons moved in one rhythm. The three Inquisitors fell. They wiped the blood off the saw, laughed, and handed you a custom Workshop sidearm. “We are family now.”",
        effects: { health: -14, sanity: +18, rep: +28, network: +24, resonance: +15 },
        flagsAdd: ['고급장비'],
        npcAdd: { role: 'partner', bond: 85, traitVi: 'Đứa trẻ mang mắt nhân tạo bạn từng cứu, nay là Fixer thiện chiến' },
        meritAdd: 28
      }
    ]
  },
  {
    id: 'csq_bloodfiend_banquet_call',
    major: true,
    isCausalCallback: true,
    vi: "[Lời mời Bloodfiend] Lá thư sáp đỏ của Elder Bloodfiend nằm trên gối bạn. Đêm nay, bà ta đòi bạn mang một người sống tới hầm rượu ở District 23. Nếu không, chiếc ly trên bàn tiệc sẽ nhận máu bạn.",
    en: "[The Bloodfiend’s invitation] A red wax letter from the Elder Bloodfiend lies on your pillow. Tonight she demands a living person at the cellar in District 23. If not, the chalice on the banquet table will take your blood.",
    choices: [
      {
        labelVi: "Mang một kẻ săn tiền thưởng bất lương đến thế chỗ",
        labelEn: "Deliver a corrupt bounty hunter in your place",
        resultVi: "Các Bloodfiend vỗ tay khen sự tàn nhẫn của bạn. Bạn được rót thêm huyết thanh cổ, làm da thịt cứng như đá, nhưng đêm nào bạn cũng nghe tiếng kêu của nạn nhân.",
        resultEn: "The Bloodfiends applauded your ruthlessness. You were poured more of the old serum, hardening your flesh like stone, but every night you heard the victim’s cries.",
        effects: { health: +20, sanity: -25, rep: +22, resonance: +25 },
        scarsAdd: ['Kẻ dự tiệc của Bloodfiend'],
        meritAdd: 22
      },
      {
        labelVi: "Tẩm dầu lên lưỡi kiếm, châm lửa, chém nát bàn tiệc",
        labelEn: "Coat your blade in oil, light it and smash the banquet table",
        resultVi: "Lửa thiêu rụi hầm rượu. Elder gào lên khi váy bà ta bắt lửa. Bạn thoát ra đầy vết cắn và bỏng nặng, nhưng thoát khỏi sự kìm kẹp của dòng máu.",
        resultEn: "Fire swallowed the cellar. The Elder shrieked as her gown caught. You tore away with deep bites and burns, free of the blood’s hold.",
        effects: { health: -38, sanity: +22, rep: +32, resonance: +18 },
        scarsAdd: ['Lửa thiêu đêm tiệc máu'],
        meritAdd: 34
      }
    ]
  },
  {
    id: 'csq_blade_lineage_duel',
    major: true,
    isCausalCallback: true,
    vi: "[Kiếm dưới mưa] Kim đội nón tre chặn bạn trên cầu, mưa chảy dọc sống đao. Ông nhớ lần bạn đánh bại đệ tử của mình. \"Rút kiếm. Ta muốn xem ngươi học được gì từ trận ấy.\"",
    en: "[Swords in the rain] Kim in a bamboo hat stops you on the bridge, rain running down the spine of the sword. He remembers the day you beat his disciple. “Draw your sword. I want to see what you learned from that fight.”",
    choices: [
      {
        labelVi: "Dồn hết ý chí vào thế thủ To Claim Their Bones",
        labelEn: "Channel all your will into the stance To Claim Their Bones",
        outcomes: [
          {
            w: 55,
            resultVi: "Nhát chém của Kim rạch ngực bạn, nhưng bạn không lùi nửa bước. Mũi kiếm của bạn dừng ngay yết hầu ông. Kim mỉm cười, tra kiếm vào vỏ. \"Xương tốt.\" Ông truyền lại cho bạn cuốn bí kíp thất truyền của Blade Lineage.",
            resultEn: "Kim’s cut opened your chest, but you gave no ground. Your point stopped at his throat. Kim smiled and sheathed his sword. “Good bones.” He handed you the lost manuscript of the Blade Lineage.",
            effects: { health: -28, sanity: +12, rep: +38, resonance: +26 },
            flagsAdd: ['BladeLineageMastery'],
            scarsAdd: ['Vết kiếm của Kim'],
            meritAdd: 40
          },
          {
            w: 45,
            resultVi: "Kiếm phong hất vũ khí của bạn xuống sông. Kim nhìn bạn nằm trong bùn và thở dài. \"Chưa đủ.\" Ông tha mạng bạn, nhưng lấy một ngón cầm kiếm.",
            resultEn: "His sword wind knocked your blade into the river. Kim looked down at you in the mud and sighed. “Not enough.” He spared your life and took one sword finger.",
            effects: { health: -45, sanity: -20, rep: -10, resonance: +20 },
            scarsAdd: ['Ngón tay rơi trên cầu gỗ']
          }
        ]
      }
    ]
  },
  {
    id: 'csq_taboo_workshop_raid',
    major: true,
    isCausalCallback: true,
    vi: '[Tres siết lại] Một người của Tres đến cùng một Beholder của B Corp. Khẩu súng xuyên tường bạn từng nhờ người thợ rèn quen chế tạo vừa xuất hiện trong một vụ ám sát một Giám đốc Wing. Họ không hỏi ai đã làm ra nó. Họ hỏi ai đã đặt nó.',
    en: '[Tres closes in] A Tres Association inspector arrives with a B Corp Beholder. The wall-piercing gun you once had your regular smith build has just surfaced in the assassination of a Wing Director. They do not ask who made it. They ask who ordered it.',
    choices: [
      {
        labelVi: 'Nộp 40 Ahn và khai bạn chỉ là người trung gian',
        labelEn: 'Pay 40 Ahn and say you were only the go-between',
        resultVi: 'Người của Tres ghi tên bạn vào dòng "bên trung gian" và đóng dấu "Đã giải quyết". Bạn mất hết tiền, giữ lại được mạng, và người thợ rèn quen từ nay không nhận đơn của bạn nữa.',
        resultEn: 'Tres writes your name on the "intermediary" line and stamps it Resolved. You lose your money, keep your life, and your regular smith stops taking your orders.',
        costAhn: 40,
        effects: { wealth: -40, sanity: -12, taboo: -2, network: -6 }
      },
      {
        labelVi: 'Bỏ chạy qua cống ngầm, để người thợ rèn lại',
        labelEn: 'Run through the drains and leave the smith behind',
        resultVi: 'Bạn thoát qua cống với vài vết bỏng nhẹ. Hôm sau nghe tin xưởng bị niêm phong, và người thợ rèn quen không có mặt khi họ vào. Hana ghi tên bạn vào danh sách theo dõi.',
        resultEn: 'You escape through the drains with minor burns. The next day you hear the shop has been sealed, and the smith was not there when they entered. Hana adds your name to a watch list.',
        effects: { health: -18, heat: 32, rep: -10, resonance: 12 },
        scarsAdd: ['Kẻ đặt khẩu súng phạm Taboo']
      }
    ]
  },
  {
    id: 'csq_thumb_capo_trial',
    major: true,
    isCausalCallback: true,
    vi: "[Lệnh của Sottocapo] Hai Unterkapo của The Thumb đứng trước cửa nhà bạn, mang theo hộp gấm đựng khẩu súng mạ vàng và danh sách mục tiêu. \"Sottocapo nhớ lòng trung của bạn năm ấy. Hôm nay bạn đích thân dọn một băng Syndicate đã phạm lễ nghi ở District 8. Không để ai thở.\"",
    en: "[The Sottocapo’s mandate] Two Thumb Unterkapos stand at your door with a brocade case holding a gilded firearm and a target list. “The Sottocapo remembers your loyalty that year. Today you personally clear a crew that broke etiquette in District 8. Leave none breathing.”",
    choices: [
      {
        labelVi: "Chấp hành mệnh lệnh với kỷ luật sắt thép của The Thumb",
        labelEn: "Execute the order with iron Thumb discipline",
        resultVi: "Bạn nộp báo cáo cùng số vỏ đạn khớp sổ cấp phát. Sottocapo trả tiền công và giữ bản ghi về cách bạn chấp hành. Chuyện thăng cấp vẫn phải qua khảo hạch riêng.",
        resultEn: "You filed your report with the spent casings accounted for. The Sottocapo paid you and kept the record of your discipline. Promotion still required its own trial.",
        effects: { wealth: +12, rep: +8, sanity: -5 },
        meritAdd: 6
      }
    ]
  },
  {
    id: 'csq_kcorp_ampule_blackmail',
    major: true,
    isCausalCallback: true,
    vi: "[Bí mật của ống tiêm] Một tay môi giới chợ đen ném lên bàn bạn tấm ảnh chụp vũng dịch xanh của người đồng nghiệp năm ấy. \"Bọn tao biết mấy ống HP Ampoule thật của mày từ đâu ra. Đưa 35 Ahn, hoặc mỗi tháng giao hai ống. Nếu không, mai Wing sẽ nhận cuộn phim này.\"",
    en: "[The ampoule’s secret] A black-market broker slaps a photo on your table: the green puddle that was your colleague years ago. “We know where your genuine HP Ampoules came from. Hand over 35 Ahn, or deliver two ampoules a month. Otherwise the Wing gets this film tomorrow.”",
    choices: [
      {
        labelVi: "Trả 35 Ahn để mua lại cuộn phim và sự im lặng",
        labelEn: "Pay 35 Ahn to buy the film and their silence",
        resultVi: "Bạn đốt tấm ảnh ngay trước mặt hắn. Hắn nhếch mép, nhận tiền, biến mất. Bạn tạm yên, dù biết bí mật ở The City không bao giờ chôn sâu.",
        resultEn: "You burned the photo in front of him. He smirked, took the Ahn and vanished. You were safe for now, though secrets in the City never stay buried.",
        effects: { wealth: -35, sanity: -8 }
      },
      {
        labelVi: "Giết kẻ tống tiền ngay đêm đó và phi tang xác",
        labelEn: "Kill the blackmailer that night and dispose of the body",
        resultVi: "Lưỡi dao không để lại dấu vết. Bạn mất nửa đêm để lau căn phòng. Không ai tìm thấy cuộn phim nữa, nhưng ánh mắt hắn lúc hấp hối sẽ theo bạn.",
        resultEn: "Your blade left no trace. You spent half the night scrubbing the room. No one would find the film, but his dying look stayed with you.",
        effects: { health: -12, sanity: -22, rep: +18, heat: +20, resonance: +20 },
        scarsAdd: ['Xác kẻ tống tiền trong đêm'],
        meritAdd: 20
      }
    ]
  },

      ...THREAD_CONSEQUENCES,
  ...FORBIDDEN_ACTS,
  ...EXPANSION_CONSEQUENCE_EVENTS
];
