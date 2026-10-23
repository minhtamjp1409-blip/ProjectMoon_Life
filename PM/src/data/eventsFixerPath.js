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
    age: [18, 140],
    major: true,
    weight: 90,
    requires: [],
    need: { jobs: ['Fixer'], grade: [9, 9] },
    forbids: ['Distorted', 'promo_g8_done'],
    vi: "[Khảo thí của Hana Section 6] Giấy triệu tập đóng sáp đỏ của Hana Association nằm trong hòm thư bạn. Bạn đã đủ chiến tích ở Backstreets. Hôm nay bạn bước vào sàn đấu của Section 6 để chứng minh mình không còn là một Grade 9.",
    en: "[Hana Section 6 evaluation] A red wax summons from Hana Association lies in your mailbox. You have enough merit from the Backstreets. Today you walk into the Section 6 arena to prove you are no longer a Grade 9.",
    choices: [
      {
        labelVi: "Hạ giám khảo trong ba chiêu",
        labelEn: "Put the examiner down in three moves",
        resultVi: "Thanh kiếm xé khiên phòng hộ của giám khảo. Người thanh tra gật đầu, thu thẻ cũ của bạn và đóng dấu vàng. \"Fixer Grade 8.\"",
        resultEn: "Your blade split the examiner’s ward. The proctor nodded, took your old card and stamped it in gold. “Grade 8 Fixer.”",
        setFixerGrade: 8,
        flagsAdd: ['promo_g8_done'],
        meritAdd: 12,
        effects: { rep: +10, sanity: +5, wealth: +15 }
      },
      {
        labelVi: "Chỉ ra sơ hở của hồ sơ mẫu bằng cách đọc luật Backstreets",
        labelEn: "Point out the holes in the mock dossier by reading the Backstreets rules",
        resultVi: "Bạn vạch ra chỗ sơ hở trong vụ án mẫu của Hana, làm viên giám thị chững lại. Bạn nhận giấy phép Grade 8 kèm một lời mời hợp tác từ Seven Association.",
        resultEn: "You pointed out the hole in Hana’s mock case and the proctor stopped short. You got your Grade 8 license and an invitation to work with Seven Association.",
        setFixerGrade: 8,
        flagsAdd: ['promo_g8_done'],
        meritAdd: 14,
        effects: { rep: +12, network: +10, sanity: +8 }
      },
      {
        labelVi: "Hoãn khảo thí một mùa để luyện thể lực và sắm trang bị",
        labelEn: "Defer the exam a season to train and buy gear",
        resultVi: "Bạn nộp đơn xin hoãn lên Section 6. Viên thanh tra ghi nhận, và bạn dành cả mùa để tĩnh dưỡng.",
        resultEn: "You filed a deferral with Section 6. The proctor logged it, and you spent the season recovering.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 8 -> GRADE 7 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g7_exam',
    age: [19, 140],
    major: true,
    weight: 85,
    need: { jobs: ['Fixer'], grade: [8, 8] },
    forbids: ['Distorted', 'promo_g7_done'],
    vi: "[Thẩm định Grade 7] Lượng hợp đồng của bạn tăng vọt, và Hana yêu cầu bạn tham gia trấn áp một ổ cướp đường có vũ khí lậu. Đây là bài kiểm tra thực tế để lên Grade 7 chính thức.",
    en: "[Grade 7 certification] Your contract volume has surged, and Hana asks you to join the suppression of a highway gang with smuggled weapons. This is the field test for full Grade 7.",
    choices: [
      {
        labelVi: "Xông vào cửa chính, một mình hạ tên đầu sỏ",
        labelEn: "Go in by the front gate and take down the ringleader alone",
        resultVi: "Khói súng và máu nhuộm lưỡi đao. Khi tiếp viện của Zwei đến nơi, bạn đã gom xong số hàng lậu. Thẻ Grade 7 chính thức thuộc về bạn.",
        resultEn: "Gunsmoke and blood stained your blade. By the time Zwei backup arrived, you had secured the contraband. The Grade 7 card was yours.",
        setFixerGrade: 7,
        flagsAdd: ['promo_g7_done'],
        meritAdd: 18,
        effects: { health: -8, rep: +15, wealth: +30 }
      },
      {
        labelVi: "Phối hợp với các Fixer đồng minh, bao vây từ ba phía",
        labelEn: "Work with allied Fixers and surround them from three sides",
        resultVi: "Không một tên nào lọt khỏi vòng vây. Các Office lân cận bắt đầu nhớ tên bạn như một người chỉ huy đáng tin. Bạn lên Grade 7.",
        resultEn: "Not one of them slipped the cordon. The neighboring Offices began to remember your name as a commander they could trust. You made Grade 7.",
        setFixerGrade: 7,
        flagsAdd: ['promo_g7_done'],
        meritAdd: 20,
        effects: { network: +16, rep: +12, sanity: +10 }
      },
      {
        labelVi: "Hoãn chiến dịch để dưỡng thương và chuẩn bị",
        labelEn: "Defer the raid to heal and prepare",
        resultVi: "Bạn xin Hana lùi hạn nhận chiến dịch để dưỡng thương, và dành mùa đó nghỉ ngơi.",
        resultEn: "You asked Hana to push back the raid window to heal, and spent the season resting.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 7 -> GRADE 6 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g6_exam',
    age: [20, 140],
    major: true,
    weight: 80,
    need: { jobs: ['Fixer'], grade: [7, 7] },
    forbids: ['Distorted', 'promo_g6_done'],
    vi: "[Bổ nhiệm thực chiến Grade 6] Một hiểm họa cấp Urban Legend nổ ra ở ranh giới quận: băng Stray Dogs và tàn dư Kurokumo đụng nhau đẫm máu. Hana giao cho bạn quyền chỉ huy biệt đội trấn áp.",
    en: "[Grade 6 field commission] An Urban Legend hazard breaks out on a district boundary: the Stray Dogs and Kurokumo remnants are clashing in blood. Hana gives you command of the suppression team.",
    choices: [
      {
        labelVi: "Lao vào giữa chiến trường, đấu tay đôi với kiếm khách Kurokumo",
        labelEn: "Charge into the middle and duel the Kurokumo swordsman",
        resultVi: "Cuộc đấu tay đôi kết thúc bằng một nhát chém. Lưỡi kiếm đối phương gãy đôi. Hana nâng hồ sơ của bạn lên Grade 6.",
        resultEn: "The duel ended with one cut. The opponent’s blade snapped in two. Hana raised your file to Grade 6.",
        setFixerGrade: 6,
        flagsAdd: ['promo_g6_done'],
        meritAdd: 24,
        effects: { health: -10, rep: +20, wealth: +45 }
      },
      {
        labelVi: "Dùng địa hình hẹp, dụ chúng vào bẫy nổ",
        labelEn: "Use the narrow ground and lure them into explosive traps",
        resultVi: "Bẫy nổ xé tan đội hình đối phương. Bạn xong việc với thương vong tối thiểu. Huy hiệu Grade 6 nằm trên ngực áo bạn.",
        resultEn: "The traps tore their ranks apart. You finished with minimal casualties. The Grade 6 badge sat on your coat.",
        setFixerGrade: 6,
        flagsAdd: ['promo_g6_done'],
        meritAdd: 26,
        effects: { rep: +18, network: +18, wealth: +40 }
      },
      {
        labelVi: "Hoãn tham chiến, nghỉ cho hồi sức",
        labelEn: "Defer deployment and rest to recover",
        resultVi: "Thấy trận hai phe quá hỗn loạn, bạn gửi Hana đơn lùi hạn để củng cố thể trạng.",
        resultEn: "Judging the two-sided brawl too chaotic, you sent Hana a request to postpone and rebuild your strength.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 6 -> GRADE 5 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g5_exam',
    age: [21, 140],
    major: true,
    weight: 75,
    need: { jobs: ['Fixer'], grade: [6, 6] },
    forbids: ['Distorted', 'promo_g5_done'],
    vi: "[Đại hội thăng Grade 5] Lên Grade 5 là qua lằn ranh giữa lính mới và người đã trải. Hana cử bạn xử lý một vụ Sweeper săn mồi ngoài khung giờ 3:13, một vi phạm Taboo nặng.",
    en: "[Grade 5 examination] Reaching Grade 5 is the line between rookies and veterans. Hana sends you to deal with Sweepers hunting outside the 3:13 hour, a serious Taboo violation.",
    choices: [
      {
        labelVi: "Mở hết công suất vũ khí Workshop, thiêu cả bầy Sweeper",
        labelEn: "Run the Workshop weapon at full power and burn the whole pack",
        resultVi: "Chất lỏng màu trà tanh tưởi bốc hơi dưới lửa. Bạn nộp bình mẫu cho Hana, và viên chỉ huy đóng dấu đỏ. \"Fixer Grade 5. Từ nay bạn được mở Office riêng.\"",
        resultEn: "The tea-colored fluid evaporated under the flames. You turned in the sample flasks, and the officer stamped red. “Grade 5 Fixer. You may now open your own Office.”",
        setFixerGrade: 5,
        flagsAdd: ['promo_g5_done', 'OfficeEligible'],
        meritAdd: 30,
        effects: { health: -9, rep: +25, wealth: +60 }
      },
      {
        labelVi: "Cùng Fixer đồng minh dàn trận, đặt bẫy nổ",
        labelEn: "Set a line with allied Fixers and lay explosive traps",
        resultVi: "Bẫy nổ xé đội hình Sweeper, thương vong được giữ thấp. Bạn nộp mẫu mô còn nguyên. Hana cấp phép mở Office riêng cho Fixer Grade 5.",
        resultEn: "The traps tore the Sweeper pack apart, and casualties stayed low. You turned in clean tissue samples. Hana granted a Grade 5 Fixer the right to open an Office.",
        setFixerGrade: 5,
        flagsAdd: ['promo_g5_done', 'OfficeEligible'],
        meritAdd: 28,
        effects: { health: -5, sanity: -2, rep: +20, wealth: +45, network: +10 }
      },
      {
        labelVi: "Chưa nhận việc Sweeper, nghỉ dưỡng thương",
        labelEn: "Hold off on the Sweeper job and rest to heal",
        resultVi: "Bạn xin hoãn lệnh săn Sweeper để dưỡng thương. Ban quản lý của Hana giữ hồ sơ cho đợt khảo thí sau.",
        resultEn: "You deferred the Sweeper summons to heal. Hana’s administrators held your file for the next cycle.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 5 -> GRADE 4 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g4_exam',
    age: [22, 140],
    major: true,
    weight: 70,
    need: { jobs: ['Fixer'], grade: [5, 5] },
    forbids: ['Distorted', 'promo_g4_done'],
    vi: "[Phó chỉ huy Section, Grade 4] Một hiệp ước ngầm giữa hai Finger vỡ, hiểm họa cấp Urban Plague đe dọa cả một khu Backstreets. Shi và Liu Association cần một Fixer Grade 4 đủ gan làm mũi nhọn.",
    en: "[Section officer, Grade 4] A secret truce between two Fingers collapses, and an Urban Plague hazard threatens a whole stretch of the Backstreets. Shi and Liu Association need a Grade 4 Fixer with the nerve to be the spearhead.",
    choices: [
      {
        labelVi: "Dẫn mũi đột kích đâm xuyên phòng tuyến đối phương",
        labelEn: "Lead the spearhead through their line",
        resultVi: "Bạn chém gục Capo chỉ huy và thu hết chứng từ cấm. Liu Association trao bạn huy hiệu Grade 4 cùng một khoản thưởng lớn.",
        resultEn: "You cut down the commanding Capo and seized every forbidden record. Liu Association gave you the Grade 4 badge and a large bounty.",
        setFixerGrade: 4,
        flagsAdd: ['promo_g4_done'],
        meritAdd: 36,
        effects: { health: -10, rep: +32, wealth: +85 }
      },
      {
        labelVi: "Dùng tình báo của Seven Association để mai phục điểm hẹn",
        labelEn: "Use Seven Association’s intelligence to ambush their meeting point",
        resultVi: "Đòn mai phục chính xác tóm gọn đầu não trước khi chúng kịp rút vũ khí. Shi và Liu trao bạn huy hiệu Grade 4 kèm lời khen.",
        resultEn: "A precise ambush took their leaders before they drew a blade. Shi and Liu gave you the Grade 4 badge with praise.",
        setFixerGrade: 4,
        flagsAdd: ['promo_g4_done'],
        meritAdd: 34,
        effects: { health: -5, rep: +26, wealth: +65, network: +14 }
      },
      {
        labelVi: "Từ chối làm mũi nhọn lúc này, dành mùa này điều dưỡng",
        labelEn: "Decline to lead the spearhead now and use the season to recover",
        resultVi: "Bạn báo cho Shi và Liu rằng bạn cần thêm thời gian hồi phục trước khi chỉ huy đột kích.",
        resultEn: "You told Shi and Liu you needed more time to recover before leading an assault.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 4 -> GRADE 3 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g3_exam',
    age: [24, 140],
    major: true,
    weight: 65,
    need: { jobs: ['Fixer'], grade: [4, 4] },
    forbids: ['Distorted', 'promo_g3_done'],
    vi: "[Thẩm định cấp cao, Grade 3] Rất ít Fixer ở The City chạm tới Grade 3. Hana gửi bạn tới vùng biên giới cấm để trấn áp một dị thể cấp Urban Nightmare đang bẻ cong không gian.",
    en: "[Senior commission, Grade 3] Very few Fixers in the City reach Grade 3. Hana sends you to a closed border zone to suppress an Urban Nightmare anomaly bending space.",
    choices: [
      {
        labelVi: "Giữ vững tâm trí và chém đứt lõi không gian của nó",
        labelEn: "Keep your mind steady and cut through its spatial core",
        resultVi: "Không gian rách liền lại. Tiếng rên quái dị tắt. Bạn mang mảnh lõi về nộp, và hội đồng Hana công nhận bạn là Fixer Grade 3.",
        resultEn: "The torn space knit back together. The strange keening stopped. You brought the core fragment back, and the Hana council recognized you as a Grade 3 Fixer.",
        setFixerGrade: 3,
        flagsAdd: ['promo_g3_done'],
        meritAdd: 45,
        effects: { health: -12, sanity: -6, rep: +40, wealth: +120, resonance: +15 }
      },
      {
        labelVi: "Dùng neo không gian và khiên phân giải của Workshop để giam nó",
        labelEn: "Use Workshop space anchors and dispersal barriers to pin it down",
        resultVi: "Trận pháp của Workshop giữ chặt lõi không gian trước khi bạn tung nhát cuối. Hội đồng Hana phê chuẩn bạn lên Grade 3.",
        resultEn: "The Workshop array held the spatial core still before you landed the last cut. The Hana council ratified your rise to Grade 3.",
        setFixerGrade: 3,
        flagsAdd: ['promo_g3_done'],
        meritAdd: 42,
        costAhn: 25,
        effects: { health: -6, sanity: -3, rep: +35, wealth: +80, network: +12 }
      },
      {
        labelVi: "Chưa vào vùng cấm, ưu tiên giữ mạng và hồi phục",
        labelEn: "Stay out of the closed zone for now and put your life and recovery first",
        resultVi: "Bạn xin Hana dời ngày vào vùng dị thể để củng cố tinh thần và thể chất, rồi dành mùa đó nghỉ ngơi.",
        resultEn: "You asked Hana to move the day for entering the anomaly zone so you could steady your mind and body, and spent the season resting.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 3 -> GRADE 2 PROMOTION
  // =========================================================================
  {
    id: 'fixer_promo_g2_exam',
    age: [26, 140],
    major: true,
    weight: 60,
    need: { jobs: ['Fixer'], grade: [3, 3] },
    forbids: ['Distorted', 'promo_g2_done'],
    vi: "[Quân bài của Section 1, Grade 2] Một lá thư mạ bạc từ Section 1 của Hana. Một việc sinh tử: bảo vệ một giám đốc của Wing trước toán sát thủ Section 1 của Shi Association.",
    en: "[A Section 1 trump card, Grade 2] A silver-edged letter from Hana Section 1. A matter of life and death: protect a Wing executive from the Section 1 assassins of Shi Association.",
    choices: [
      {
        labelVi: "Giữ chặt cây cầu trước mọi tay sát thủ trong đêm mưa",
        labelEn: "Hold the bridge against every assassin in the rain",
        resultVi: "Lưỡi kiếm của bạn va nhau tóe lửa suốt sáu giờ. Đến bình minh, viên giám đốc vẫn nguyên vẹn. Hana trao bạn huy chương Grade 2.",
        resultEn: "Your blade sparked against theirs for six hours. By dawn the executive was unharmed. Hana awarded you the Grade 2 cross.",
        setFixerGrade: 2,
        flagsAdd: ['promo_g2_done'],
        meritAdd: 55,
        effects: { health: -12, sanity: -6, rep: +50, wealth: +180, resonance: +20 }
      },
      {
        labelVi: "Cùng vệ sĩ của Zwei Association dựng hàng phòng thủ",
        labelEn: "Form a defensive line with the Zwei Association bodyguards",
        resultVi: "Khiên của Zwei chặn làn ám khí, cho bạn lúc phản công hạ những sát thủ then chốt. Viên giám đốc Wing bình an. Bạn nhận huy chương Grade 2.",
        resultEn: "Zwei shields stopped the volley of throwing weapons and gave you time to counter and drop the key assassins. The Wing executive was safe. You took the Grade 2 cross.",
        setFixerGrade: 2,
        flagsAdd: ['promo_g2_done'],
        meritAdd: 50,
        effects: { health: -7, sanity: -4, rep: +42, wealth: +130, network: +18 }
      },
      {
        labelVi: "Lùi hạn nhận việc hộ tống sinh tử, tĩnh dưỡng",
        labelEn: "Push back the life-or-death escort and rest",
        resultVi: "Bạn gửi thư xin thoái thác vì thương tích chưa lành. Section 1 ghi nhận và cho bảo lưu tư cách của bạn.",
        resultEn: "You sent a letter declining because your injuries had not healed. Section 1 noted it and held your standing.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // GRADE 2 -> GRADE 1 PROMOTION (THE SUMMIT)
  // =========================================================================
  {
    id: 'fixer_promo_g1_exam',
    age: [28, 140],
    major: true,
    weight: 55,
    need: { jobs: ['Fixer'], grade: [2, 2] },
    forbids: ['Distorted', 'promo_g1_done'],
    vi: "[Khảo hạch Fixer Grade 1] Hội đồng Trung ương Hana ở District 1 triệu tập bạn. Đề bài là một bản án cấp Star of the City: một tổ chức Syndicate hoặc một cơ sở Singularity đã sụp đổ phải bị xóa sổ hoàn toàn.",
    en: "[Fixer Grade 1 Evaluation] Hana’s Central Council in District 1 summons you. The assignment is a Star of the City verdict: a Syndicate or a collapsed Singularity facility must be erased entirely.",
    choices: [
      {
        labelVi: "Dẫn đầu cuộc đột kích vào hang ổ",
        labelEn: "Lead the assault on the stronghold",
        resultVi: "Trận đánh kéo dài qua đêm và làm rung kính cả một dãy phố. Khi khói tan, bạn đứng giữa đống đổ nát, tai ù, tay chưa hết run. Hội đồng đọc tên bạn: Fixer Grade 1.",
        resultEn: "The fight runs through the night and rattles windows down the whole street. When the smoke clears you stand in the rubble, ears ringing, hands still shaking. The Council reads your name: Fixer Grade 1.",
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 70,
        effects: { health: -14, sanity: -8, rep: +65, wealth: +280, resonance: +25 }
      },
      {
        labelVi: "Kêu gọi các Văn phòng có tiếng lập liên quân vây quét",
        labelEn: "Call the reputable Offices into a joint sweep",
        resultVi: "Chiến dịch chung san phẳng hang ổ mà không mất người chỉ huy nào. Hội đồng ghi nhận cách bạn dùng người nhiều hơn cách bạn dùng kiếm. Bạn là Fixer Grade 1.",
        resultEn: "The joint operation levels the stronghold without losing a single commander. The Council notes how you used people more than how you used a blade. You are a Fixer Grade 1.",
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 65,
        effects: { health: -8, sanity: -5, rep: +55, wealth: +190, network: +25 }
      },
      {
        labelVi: "Xin hoãn một mùa để lấy lại phong độ",
        labelEn: "Ask for a season’s delay to regain form",
        resultVi: "Hội đồng đồng ý dời ngày. Bạn dùng mùa đó để ngủ, ăn đủ bữa và tập lại các bài cũ.",
        resultEn: "The Council agrees to move the date. You spend the season sleeping, eating proper meals and drilling old forms.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // The Grade 1 -> Color trial lives in eventsSupernatural.js (hana_color_ascension_trial)

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
    vi: "[Con tin ở tiệm cầm đồ J Corp] Một nhóm lính đánh thuê chạy ra từ Smoke War chiếm chi nhánh cầm đồ của J Corp và giữ hai mươi cư dân làm lá chắn. Hana muốn xong việc trước giờ đóng cửa.",
    en: "[Hostages at the J Corp Pawn Shop] A band of mercenaries out of the Smoke War seizes a J Corp pawn branch and holds twenty residents as shields. Hana wants it over before closing time.",
    choices: [
      {
        labelVi: "Chui qua ống thông gió và gỡ ngòi nổ",
        labelEn: "Crawl through the vents and defuse the charges",
        resultVi: "Bạn bò qua ống thông gió đầy bụi than và cắt dây ngòi nổ khi đồng hồ còn ba giây. Rồi bạn đạp cửa, và cuộc đối đầu với tên cầm đầu kéo dài thêm chừng ấy. Cả hai mươi người đi ra.",
        resultEn: "You crawl through soot-lined vents and cut the detonation wire with three seconds left on the clock. Then you kick in the door, and the standoff with the leader lasts about that long. All twenty walk out.",
        meritAdd: 28,
        effects: { health: -20, rep: +24, wealth: +55, sanity: +10 },
        flagsAdd: ['fixer_g6_hostage_done']
      },
      {
        labelVi: "Đàm phán một phần tiền chuộc để đổi lấy trẻ em và phụ nữ trước",
        labelEn: "Negotiate part of the ransom to get the women and children out first",
        resultVi: "Bạn giữ chúng nói chuyện bằng giọng đều và tiền mặt, trong lúc đội Liu âm thầm chiếm chỗ phía sau. Khi họ nổ súng, người bị thương là những kẻ đang cầm súng.",
        resultEn: "You keep them talking with a level voice and cash while the Liu team quietly takes positions behind. When they open fire, the ones hurt are the ones holding guns.",
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
    age: [18, 140],
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
        resultVi: 'Bạn xin hoãn đợt thẩm định để dưỡng thương và chuẩn bị chu đáo hơn.',
        resultEn: 'You postponed the evaluation window to heal wounds and prepare.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g8_zwei',
    age: [18, 140],
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
        resultVi: 'Bạn xin hoãn đợt khảo sát để nghỉ ngơi dưỡng sức.',
        resultEn: 'You deferred the patrol trial to rest and recuperate.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 8 -> 7 ALTERNATIVES ---
  {
    id: 'fixer_promo_g7_shi',
    age: [19, 140],
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
        resultVi: 'Bạn thông báo lùi thời hạn hợp đồng để dưỡng thương.',
        resultEn: 'You requested a deferral to heal your wounds.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g7_tres',
    age: [19, 140],
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
        resultVi: 'Bạn lùi lại đợt đột kích để tĩnh dưỡng.',
        resultEn: 'You deferred the raid to rest and heal.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 7 -> 6 ALTERNATIVES ---
  {
    id: 'fixer_promo_g6_cinq',
    age: [20, 140],
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
        resultVi: 'Bạn gửi đơn xin hoãn tham gia đại hội để dưỡng thương.',
        resultEn: 'You withdrew temporarily from the tournament to heal.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g6_oufi',
    age: [20, 140],
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
        resultVi: 'Bạn hoãn hợp đồng thi hành án để dưỡng sức.',
        resultEn: 'You postponed the enforcement action to recuperate.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 6 -> 5 ALTERNATIVES ---
  {
    id: 'fixer_promo_g5_dieci',
    age: [21, 140],
    major: true,
    weight: 75,
    need: { jobs: ['Fixer'], grade: [6, 6] },
    forbids: ['Distorted', 'promo_g5_done'],
    vi: "[Kho sách Dieci] Dieci tuyển bạn bảo vệ đoàn vào thư viện ngầm từ thời Smoke War. Sách về Singularity vẫn nằm trong đó, cùng những thứ săn người giữa các kệ. Hoàn thành Request này, bạn được xét Grade 5.",
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
        resultVi: 'Bạn hoãn chuyến viễn chinh để tích lũy thể lực.',
        resultEn: 'You deferred the expedition to gather strength.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g5_molar',
    age: [21, 140],
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
        resultVi: 'Bạn dời lại chuyến lặn trục vớt để hồi phục thể lực.',
        resultEn: 'You deferred the salvage operation to rest.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 5 -> 4 ALTERNATIVES ---
  {
    id: 'fixer_promo_g4_devzat',
    age: [22, 140],
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
        resultVi: 'Bạn lùi lại chuyến hàng để tĩnh dưỡng vết thương.',
        resultEn: 'You deferred the dangerous transit to heal wounds.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g4_rhino',
    age: [22, 140],
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
        resultVi: 'Bạn lùi lại chiến dịch đột phá để dưỡng sức.',
        resultEn: 'You postponed the assault to recover.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 4 -> 3 ALTERNATIVES ---
  {
    id: 'fixer_promo_g3_warp',
    age: [24, 140],
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
        resultVi: 'Bạn xin hoãn nhiệm vụ để hồi phục thể lực và tâm trí.',
        resultEn: 'You deferred the containment run to recuperate.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g3_reindeer',
    age: [24, 140],
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
        resultVi: 'Bạn xin phép Hana dời lại đợt trấn áp để bồi dưỡng sức khỏe.',
        resultEn: 'You requested a deferral to regain stamina.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 3 -> 2 ALTERNATIVES ---
  {
    id: 'fixer_promo_g2_black_silence',
    age: [26, 140],
    major: true,
    weight: 60,
    need: { jobs: ['Fixer'], grade: [3, 3] },
    forbids: ['Distorted', 'promo_g2_done'],
    vi: "[Phong tỏa tàn tích] Black Silence đã phá một sào huyệt Syndicate. Kẻ sống sót đang cướp vũ khí trong đống đổ nát. Hana Section 1 giao bạn giữ vòng phong tỏa và đưa những món đó ra ngoài.",
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
        resultVi: 'Bạn lùi lại thời hạn hợp đồng để điều dưỡng thể chất.',
        resultEn: 'You postponed the mission to recuperate.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g2_district_defense',
    age: [26, 140],
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
        resultVi: 'Bạn xin hoãn nắm quyền chỉ huy để dưỡng thương.',
        resultEn: 'You deferred command duties to heal wounds.',
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // --- GRADE 2 -> 1 ALTERNATIVES ---
  {
    id: 'fixer_promo_g1_hana_apex',
    age: [28, 140],
    major: true,
    weight: 55,
    need: { jobs: ['Fixer'], grade: [2, 2] },
    forbids: ['Distorted', 'promo_g1_done'],
    vi: "[Luận kiếm tại Section 1 của Hana · Grade 1] Để vào hàng Fixer Grade 1, bạn được gọi tới quảng trường trung tâm District 1, đứng trước mười hai Viện trưởng của Hiệp hội và đấu sinh tử với các Át chủ bài hàng đầu của The City.",
    en: "[The Section 1 Sword Trial · Grade 1] To join the Fixer Grade 1, you are called to the central square of District 1, before twelve Association Directors, to fight the City’s leading aces in a duel to the death.",
    choices: [
      {
        labelVi: "Thi triển tuyệt kỹ và hạ cả ba giám khảo cùng lúc",
        labelEn: "Show your finest technique and beat all three examiners at once",
        resultVi: "Luồng khí từ đường chém của bạn làm rung cả võ đài. Ba giám khảo của Hana lùi một bước, rồi cúi đầu. Chuông vàng vang lên, công nhận bạn là Fixer Grade 1.",
        resultEn: "The air from your cut rattles the whole arena. The three Hana examiners step back, then bow. The golden bell rings, naming you a Fixer Grade 1.",
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 72,
        effects: { health: -13, sanity: -7, rep: +68, wealth: +300 }
      },
      {
        labelVi: "Cho thấy lối đánh rộng, biết ứng biến theo từng tình huống",
        labelEn: "Show a wide, adaptable way of fighting that answers every situation",
        resultVi: "Mỗi cử chỉ và mỗi quyết định của bạn đều gọn, và Hội đồng không tìm ra chỗ nào để chê. Bạn nhận tấm thẻ Fixer Grade 1 mạ vàng.",
        resultEn: "Every move and every decision is tidy, and the Council finds nothing to fault. You receive the gold-plated Grade 1 card.",
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 68,
        effects: { rep: +60, network: +30, wealth: +240, sanity: +12 }
      },
      {
        labelVi: "Xin hoãn một mùa để lấy lại phong độ",
        labelEn: "Ask for a season’s delay to regain form",
        resultVi: "Hội đồng đồng ý dời ngày khảo thí. Bạn dùng mùa đó để ngủ, ăn và tập lại các bài cũ.",
        resultEn: "The Council agrees to move the date. You spend the season sleeping, eating and drilling old forms.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },
  {
    id: 'fixer_promo_g1_calamity',
    age: [28, 140],
    major: true,
    weight: 55,
    need: { jobs: ['Fixer'], grade: [2, 2] },
    forbids: ['Distorted', 'promo_g1_done'],
    vi: "[Distortion cấp Star of the City] Một Distortion cấp Star of the City vừa thức tỉnh ở rìa khu vực và đang san phẳng cả một phân khu. Hana ra lệnh khẩn, chỉ định bạn dẫn đầu cuộc thanh trừng. Thắng thì bạn lên Fixer Grade 1.",
    en: "[A Star of the City Distortion] A Star of the City Distortion has woken on the district edge and is flattening an entire ward. Hana issues an emergency order and names you to lead the suppression. Win, and you become a Fixer Grade 1.",
    choices: [
      {
        labelVi: "Dồn hết sức vào vũ khí và chém đứt lõi của nó",
        labelEn: "Put everything into your weapon and cut through its core",
        resultVi: "Tiếng thét của nó tắt dần thành tro. Bạn đứng trên xác nó với hai tay không còn cảm giác. Hana đọc tên bạn vào danh sách Fixer Grade 1.",
        resultEn: "Its scream fades into ash. You stand on its body with both hands numb. Hana reads your name into the roll of Fixer Grade 1.",
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 75,
        effects: { health: -14, sanity: -8, rep: +70, wealth: +320, resonance: +20 }
      },
      {
        labelVi: "Dựng trận phong tỏa không gian trước khi ra đòn kết liễu",
        labelEn: "Raise spatial wards before the finishing blow",
        resultVi: "Trận phong tỏa cô lập nó trước khi đòn cuối rơi xuống, nên không ai trong đội bị cuốn theo. Hana ký sắc lệnh nâng bạn lên Fixer Grade 1.",
        resultEn: "The wards isolate it before the last blow falls, so nobody on the team is dragged in. Hana signs the order raising you to Fixer Grade 1.",
        setFixerGrade: 1,
        flagsAdd: ['promo_g1_done'],
        meritAdd: 70,
        effects: { rep: +62, network: +28, wealth: +260, sanity: +10 }
      },
      {
        labelVi: "Xin hoãn một mùa để lấy lại phong độ",
        labelEn: "Ask for a season’s delay to regain form",
        resultVi: "Bạn xin lùi chiến dịch một mùa. Hana ghi lại, và một Fixer khác nhận phần việc tạm thời.",
        resultEn: "You ask to push the campaign back a season. Hana notes it, and another Fixer takes the work in the meantime.",
        effects: { health: +16, sanity: +12 }
      }
    ]
  },

  // =========================================================================
  // FIXER CAREER DIVERSITY: ASSOCIATIONS, DIPLOMACY & INDEPENDENT OFFICES
  // =========================================================================
  {
    id: 'fixer_cinq_duel_of_honor',
    age: [19, 75],
    major: true,
    weight: 48,
    need: { jobs: ['Fixer'] },
    forbids: ['Distorted'],
    vi: "[Trận đấu của Cinq] Hai gia tộc Nest thuê Cinq phân xử tranh chấp hợp đồng bằng đấu kiếm. Kiếm sĩ Section 4 mời bạn làm đại diện trên võ đài hoặc đứng ngoài giám định luật đấu.",
    en: '[Cinq Association Duel of Honor · The Fifth Association] Two Nest merchant dynasties dispute a million-Ahn contract, commissioning Cinq Association to arbitrate via a duel of honor. A Section 4 duelist invites you to step onto the dueling strip as a Champion or serve as adjudicating Second.',
    choices: [
      {
        labelVi: 'Rút liễu kiếm bước lên võ đài, thi triển kiếm kỹ tốc độ cao',
        labelEn: 'Draw your rapier and step onto the strip, matching blinding thrusts',
        resultVi: 'Lưỡi kiếm của bạn lướt đi tựa gió thoảng, đâm thủng bao kiếm đối phương chỉ trong ba hiệp mà không gây tổn hại tính mạng. Trưởng đoàn Cinq cúi chào tán thưởng kỹ năng quý phái của bạn, thanh toán khoản thù lao khổng lồ.',
        resultEn: 'Your rapier moved like whistling wind, disarming the challenger in three flawless passes. The Cinq Captain bowed to your aristocratic precision, paying a lavish bounty.',
        meritAdd: 22,
        effects: { rep: +24, wealth: +45, sanity: +8, resonance: +12 }
      },
      {
        labelVi: 'Đảm nhiệm vai trò Trọng tài Giám định, đảm bảo trận đấu tuân thủ nghiêm ngặt quy tắc',
        labelEn: 'Act as the Adjudicating Second, enforcing strict dueling treaties',
        resultVi: 'Sự am hiểu luật lệ và con mắt quan sát sắc bén của bạn giúp hóa giải một âm mưu dùng độc gian lận. Cả hai gia tộc đều kính nể và tặng bạn huy hiệu danh dự.',
        resultEn: 'Your sharp gaze unmasked a covert poisoning attempt before blood was drawn. Both factions commended your impartiality and presented an honorary crest.',
        meritAdd: 18,
        effects: { rep: +18, wealth: +30, network: +15 }
      }
    ]
  },
  {
    id: 'fixer_oufi_underworld_pact',
    age: [20, 75],
    major: true,
    weight: 46,
    need: { jobs: ['Fixer'] },
    forbids: ['Distorted'],
    vi: '[Hiệp Hội Oufi · Hòa Giải Khế Ước Máu Backstreets] Hiệp hội Oufi, tổ chức chuyên giám sát hợp đồng và công chứng các hiệp ước sinh tử tại District 19, cử bạn đi thẩm định một bản khế ước giữa một xưởng rèn lớn và một băng đảng Syndicate. Bất kỳ bên nào vi phạm sẽ phải trả giá bằng cả mạng sống.',
    en: '[Oufi Association · Backstreet Blood Oath Inquest] The Oufi Association, custodians of binding treaties and lethal contracts in District 19, dispatches you to verify a pact between a major workshop and a syndicate family. Any breach triggers absolute execution.',
    choices: [
      {
        labelVi: 'Dùng uy tín và đao pháp răn đe, buộc cả hai bên ký cam kết hòa bình vĩnh viễn',
        labelEn: 'Use martial leverage to force both parties into a binding non-aggression seal',
        resultVi: 'Trước khí thế áp đảo của bạn, cả ông chủ xưởng rèn lẫn đại diện syndicate đều đặt tay lên dấu mộc Oufi. Khế ước hoàn tất êm thấm, đem lại phần thưởng hoa hồng hậu hĩnh.',
        resultEn: 'Intimidated by your composure, both smith master and syndicate captain pressed blood upon the Oufi seal. Peace held, netting you an opulent commission.',
        meritAdd: 20,
        effects: { rep: +22, wealth: +40, network: +18 }
      },
      {
        labelVi: 'Vạch trần điều khoản ngầm mờ ám có hại cho xưởng rèn, bảo vệ người lao động',
        labelEn: 'Expose the syndicate’s predatory loophole, shielding the craftsmen',
        resultVi: 'Bạn xé toạc mưu đồ lừa đảo của đám côn đồ ngay tại chỗ. Xưởng rèn biết ơn bạn vô cùng, tặng bạn những bộ phận giáp chống đạn tốt nhất.',
        resultEn: 'You ripped their fraudulent clauses to shreds on the spot. Indebted, the forge fitted your gear with their finest kinetic composite plates.',
        meritAdd: 16,
        effects: { rep: +16, health: +15, wealth: +20, heat: +8 }
      }
    ]
  },
  {
    id: 'fixer_dieci_monastery_archive',
    age: [20, 75],
    major: true,
    weight: 46,
    need: { jobs: ['Fixer'] },
    forbids: ['Distorted'],
    vi: '[Hiệp Hội Dieci · Khai Quật Hầm Sách Cổ District 4] Các học giả mang đại kinh thư của Hiệp hội Dieci Section 4 mời bạn cùng khám phá một kho lưu trữ bí mật thời tiền Chiến Tranh Khói (Smoke War) nằm sâu dưới lòng đất. Những tri thức nặng nề nơi đây đòi hỏi thể chất và tinh thần thép để chịu tải.',
    en: '[Dieci Association · Sunken Archive Excavation] Heavy-tome scholars from Dieci Association Section 4 hire you to delve into a pre-Smoke War subterranean vault in District 4. The dense knowledge buried here exerts staggering mental and physical gravity.',
    choices: [
      {
        labelVi: 'Hộ tống các học sĩ Dieci qua bãi sụp đổ, cùng lĩnh hội tri thức cổ xưa',
        labelEn: 'Escort Dieci scholars across subterranean cave-ins, assimilating ancient lore',
        resultVi: 'Đỡ những khối đá đổ và giải mã các cuộn giấy da cổ, bạn mở rộng tầm hiểu biết về các hiện tượng dị thường của The City. Dieci trao thưởng cho bạn một văn bằng nghiên cứu cùng số Ahn hậu hĩnh.',
        resultEn: 'Holding off debris and deciphering parchment, your comprehension of City singularities broadened immensely. Dieci rewarded you with certified scholar honors and generous coin.',
        meritAdd: 24,
        effects: { sanity: +22, rep: +20, wealth: +38, resonance: +16 }
      },
      {
        labelVi: 'Thu thập riêng các cuộn bản đồ hầm ngục quý giá để bán cho Seven Association',
        labelEn: 'Pocket rare subterranean survey maps to broker with Seven Association',
        resultVi: 'Các thám tử Seven trả một số tiền lớn cho các sơ đồ bí mật này, giúp túi tiền của bạn dày lên trông thấy.',
        resultEn: 'Seven intelligence brokers paid handsomely for the classified blueprints, substantially padding your coffers.',
        meritAdd: 14,
        effects: { wealth: +58, rep: +12, sanity: -4 }
      }
    ]
  },
  {
    id: 'fixer_molar_amphibious_salvage',
    age: [20, 72],
    major: true,
    weight: 44,
    need: { jobs: ['Fixer'] },
    forbids: ['Distorted'],
    vi: '[Molar Boatworks · Trục Vớt Phế Liệu Kênh Độc District 21] Xưởng tàu Molar Boatworks nhận hợp đồng nạo vét một xà lan chở hàng chìm tại kênh rạch ô nhiễm của District 21. Bùn lầy axit đặc quánh và lũ cá đột biến rình rập dưới mặt nước tối đen.',
    en: '[Molar Boatworks · Toxic Canal Salvage] Molar Boatworks takes on a salvage contract for a sunken barge in District 21’s foul industrial canal. Caustic sludge and mutant aquatic fauna lurk beneath the opaque surface.',
    choices: [
      {
        labelVi: 'Mặc đồ lặn áp lực, cầm móc sắt nhảy xuống đáy kênh chiến đấu mở đường',
        labelEn: 'Don pressurized diving gear and leap into the sludge, cleaving mutants',
        resultVi: 'Lưỡi đao của bạn chém tan tác bầy thủy quái đột biến trong làn nước đục ngầu, đưa dây cáp tời vào vị trí an toàn. Thợ thuyền Molar vỗ vai bạn khen ngợi hết lời và chia phần chiến lợi phẩm trục vớt.',
        resultEn: 'Your blade carved through toxic beasts in pitch darkness, securing the winch cables. Molar shipwrights cheered your grit and split a rich cut of the salvaged cargo.',
        meritAdd: 22,
        effects: { health: -14, wealth: +50, rep: +18, sanity: +6 }
      },
      {
        labelVi: 'Điều khiển súng lao móc trên boong tàu yểm trợ từ xa',
        labelEn: 'Man the deck harpoon batteries, providing ranged defensive fire',
        resultVi: 'Những mũi lao thép bắn chính xác găm chặt lũ quái vật vào bờ kè. Toàn bộ hàng hóa được trục vớt nguyên vẹn, đảm bảo an toàn tuyệt đối cho bạn.',
        resultEn: 'Accurate harpoon volleys pinned encroaching abominations to the seawall. The haul was recovered without a scratch on you.',
        meritAdd: 18,
        effects: { wealth: +35, rep: +14, sanity: +4 }
      }
    ]
  },
  {
    id: 'fixer_devzat_railway_convoy',
    age: [20, 75],
    major: true,
    weight: 45,
    need: { jobs: ['Fixer'] },
    forbids: ['Distorted'],
    vi: '[Hiệp Hội Devzat · Hộ Tống Đoàn Tàu Thiết Giáp Vượt Hẻm] Hiệp hội Devzat, bậc thầy súng hỏa mai và nỏ nặng, thuê bạn cùng hộ tống một đoàn tàu thiết giáp chở quặng nhiên liệu cao cấp chạy qua ranh giới Backstreets đang bị Syndicate vây hãm.',
    en: '[Devzat Association · Armored Rail Escort] The Devzat Association, masters of heavy arbalests and kinetic firearms, hires you to escort an armored locomotive hauling hyper-refined fuel across syndicate-besieged Backstreets.',
    choices: [
      {
        labelVi: 'Leo lên nóc toa tàu, dùng hỏa lực và vũ khí cận chiến đẩy lùi từng đợt tập kích',
        labelEn: 'Climb atop the railcars, repelling boarding skirmishers hand-to-hand',
        resultVi: 'Tiếng súng nổ rền trời hòa cùng tia lửa cơ khí. Bạn quét sạch toán cướp nhảy tàu, giữ đoàn tàu lao vút an toàn về ga đích. Devzat tặng bạn một khẩu súng hỏa mai gia cố thượng hạng.',
        resultEn: 'Deafening gunfire met sparking blades. You threw every raider off the rushing carriages, pulling into the terminal in triumph. Devzat rewarded you with an arbalest sidearm.',
        meritAdd: 25,
        effects: { health: -15, rep: +28, wealth: +55, resonance: +14 }
      },
      {
        labelVi: 'Cố thủ trong toa máy điều phối, sửa chữa kịp thời các đoạn phanh bị bắn hỏng',
        labelEn: 'Hold the engine cabin, emergency-patching sabotaged brake conduits',
        resultVi: 'Sự nhanh trí cơ học của bạn ngăn chặn một vụ trật bánh thảm khốc. Đoàn tàu cập bến an toàn và công ty đường sắt trả thêm tiền thưởng cho bạn.',
        resultEn: 'Your rapid kinematic repairs averted a catastrophic derailment. The rail authority awarded a substantial safety bonus.',
        meritAdd: 20,
        effects: { wealth: +42, rep: +18, sanity: +5 }
      }
    ]
  },
  {
    id: 'fixer_independent_office_founding',
    age: [23, 75],
    major: true,
    weight: 55,
    need: { jobs: ['Fixer'] },
    forbids: ['Distorted', 'OwnFixerOffice'],
    vi: "[Tấm biển Office] Bạn có đủ tiền và tiếng tăm để mở Office riêng. Hợp đồng lớn hơn sẽ đến trực tiếp, cùng trách nhiệm với Fixer bạn tuyển và hồ sơ trước Hana. Tấm biển mới còn nằm dưới chân bàn.",
    en: '[Chartering an Independent Fixer Office] Amassing hard-won reputation and Ahn, you stand ready to hang your own brass office plaque upon a bustling district boulevard. An independent Office unlocks lucrative direct contracts and apprentices, but answers directly to Hana scrutiny.',
    choices: [
      {
        labelVi: 'Chi 35 Ahn thuê mặt bằng và xin giấy phép Hana thành lập Văn Phòng Độc Lập',
        labelEn: 'Spend 35 Ahn to lease premises and charter your independent Office from Hana',
        resultVi: 'Tấm biển đồng khắc tên bạn sáng lấp lánh dưới ánh đèn neon. Các thân chủ nườm nượp tìm đến đặt hợp đồng, danh tiếng nghề nghiệp của bạn bước lên một tầm cao mới.',
        resultEn: 'The polished brass plaque bearing your name gleamed under neon lights. High-paying clients flooded your parlor; your career prestige reached unprecedented heights.',
        costAhn: 35,
        meritAdd: 35,
        flagsAdd: ['OwnFixerOffice'],
        recordsAdd: ['founded_own_office'],
        effects: { wealth: -35, rep: +40, network: +25, sanity: +15 }
      },
      {
        labelVi: 'Tiếp tục làm Fixer tự do cơ động, không bị ràng buộc bởi văn phòng và giấy phép',
        labelEn: 'Remain a nomadic freelance Fixer, unbound by paperwork and leasehold taxes',
        resultVi: 'Bạn giữ lại số tiền dành dụm. Tự do tung hoành giữa các quận mà không sợ bị đối thủ đánh bom trụ sở cũng là một lựa chọn sáng suốt.',
        resultEn: 'You retained your Ahn. Unfettered mobility across districts without fear of office bombings was its own tactical wisdom.',
        effects: { sanity: +8, wealth: +15 }
      }
    ]
  },
  {
    id: 'fixer_client_betrayal_ambush',
    age: [22, 72],
    major: true,
    weight: 42,
    need: { jobs: ['Fixer'] },
    forbids: ['Distorted'],
    vi: '[Bẫy Phản Bội Của Thân Chủ] Sau khi bạn hoàn thành nhiệm vụ thu hồi một chiếc vali bí mật, vị thân chủ giàu có không những không trả tiền mà còn thuê một toán sát thủ bịt mặt phục kích bạn tại nhà kho bỏ hoang hòng diệt khẩu.',
    en: '[The Client’s Venomous Ambush] Having retrieved a classified lockbox, your affluent client refuses payment, dispatching a hit squad of masked mercenaries to silence you in an abandoned warehouse.',
    choices: [
      {
        labelVi: 'Tung toàn lực hạ gục toàn bộ toán sát thủ, truy lùng kẻ phản bội bắt bồi thường gấp ba',
        labelEn: 'Decimate the hit squad and hunt down the traitorous client for triple recompense',
        resultVi: 'Không một tên sát thủ nào còn đứng vững. Bạn đạp tung cửa biệt thự của tên thân chủ gian ác, kề đao vào cổ buộc hắn giao nộp toàn bộ két sắt Ahn và van xin tha mạng.',
        resultEn: 'Not a single assassin remained upright. Kicking open the client’s manor doors, your blade at his throat extracted the entire vault in triple damages.',
        meritAdd: 28,
        effects: { health: -16, rep: +30, wealth: +75, resonance: +18 },
        later: [{ id: 'csq_fixer_false_bounty', years: 3, reasonVi: "Thân chủ bị bạn bắt trả gấp ba vẫn còn tiền và còn nhớ tên bạn", reasonEn: "The client you made pay triple still has money and still remembers your name" }]
      },
      {
        labelVi: 'Nộp vali cho Hiệp hội Seven, công khai bằng chứng phạm tội của hắn lên báo chí',
        labelEn: 'Turn the lockbox to Seven Association, broadcasting his crimes across public presses',
        resultVi: 'Tên thân chủ bị cảnh sát Zwei và thanh tra thuế gông cổ ngay trong đêm. Bạn nhận tiền thưởng truy nã hợp pháp và được người dân ca tụng vì sự liêm chính.',
        resultEn: 'Zwei enforcers arrested the patron before dawn. You collected a certified bounty and public acclaim for righteous integrity.',
        meritAdd: 22,
        effects: { rep: +26, wealth: +38, network: +18, sanity: +8 }
      }
    ]
  }
];
