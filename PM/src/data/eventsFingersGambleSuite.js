/**
 * Project Moon Universe - Syndicate Five Fingers High-Stakes Gamble & Risk-Reward Suite
 * Introduces intense, high-tension interactive gambles for Thumb, Index, Middle, Ring, Pinky.
 * Directly addresses user request for gamified risk-reward choices and deep NPC interactions.
 */

export const FINGERS_GAMBLE_EVENTS = [
  // ------------------------------------------------------------------ 1. Thumb: Etiquette Duel Gamble
  {
    id: 'syn_thumb_gamble_etiquette_duel',
    age: [20, 75],
    major: true,
    weight: 35,
    need: { jobs: ['Syndicate'], finger: 'Thumb', fingerRankAtLeast: 1 },
    forbids: ['thumb_etiquette_gamble_done'],
    vi: "[Canh Bạc Nghi Thức: Quyết Đấu Sottocapo] Giữa tiệc rượu của Thumb, một Capo nhánh khác kết tội đồng đội bạn cúi chào lệch mười lăm độ. Theo lệ Ngón Cái, hình phạt là chặt ba ngón tay hoặc bước vào Đấu Trường Nghi Thức, nạp một viên đạn và bắn luân phiên đến khi gỡ lại danh dự.",
    en: "[Etiquette Wager: The Sottocapo Duel] At a Thumb banquet, a rival Capo accuses your companion of bowing fifteen degrees off protocol. By the Thumb’s iron law, the penalty is three severed fingers or the Arena of Etiquette, where both sides alternate single-shot pistol fire until honor is restored.",
    choices: [
      {
        labelVi: "Đứng ra nhận thay bạn bè, cầm súng nạp một viên vào Đấu Trường",
        labelEn: "Step forward in your comrade’s place, entering the Arena of Etiquette",
        need: { stat: { health: [35, 100], sanity: [30, 100] } },
        outcomes: [
          {
            w: 62,
            resultVi: "Phát đạn của bạn bắn văng khẩu súng khỏi tay đối thủ trước khi hắn kịp bóp cò. Các Capo quanh bàn nâng ly; Sottocapo gật đầu ghi nhận bản lĩnh của bạn.",
            resultEn: "Your bullet clips their pistol grip, disarming them before they pull. The Capos rise in thunderous applause; the Sottocapo toasts your unyielding nerve.",
            effects: { rep: +35, standing: +25, merit: +30, wealth: +30 },
            flagsAdd: ['thumb_etiquette_gamble_done', 'BảnLĩnhThépThumb'],
            recordsAdd: ['thumb_duel_victor']
          },
          {
            w: 38,
            resultVi: "Viên đạn sượt qua bả vai làm rách cơ thịt. Bạn đứng thẳng không rên một tiếng, giữ trọn lễ nghi của Thumb nhưng phải nằm dưỡng thương hai tháng.",
            resultEn: "Their bullet grazes your shoulder, tearing muscle. You stand rigid without a whimper, proving Thumb pedigree, but spend two months recuperating.",
            effects: { health: -30, sanity: -15, rep: +15, merit: +15 },
            flagsAdd: ['thumb_etiquette_gamble_done'],
            scarsAdd: ['Vết đạn nghi thức Thumb']
          }
        ]
      },
      {
        labelVi: "Nộp một khẩu súng mạ vàng để bồi hoàn danh dự theo lệ phụ",
        labelEn: "Present 35 Ahn and an ornate gilded firearm to settle honor via auxiliary rite",
        costAhn: 35,
        outcomes: [
          {
            w: 80,
            resultVi: "Viên Capo kiểm tra khẩu súng mạ vàng, hài lòng tuyên bố danh dự của phân khu đã được bồi hoàn thỏa đáng. Bạn mất tiền nhưng bảo toàn được tính mạng đồng đội.",
            resultEn: "The Capo inspects the gilded steel, declaring branch honor satisfied. You forfeit coin but safeguard your companion intact.",
            effects: { standing: +10, sanity: +5, network: +5 },
            flagsAdd: ['thumb_etiquette_gamble_done']
          }
        ]
      },
      {
        labelVi: "Chấp nhận nhận lỗi nghi thức cấp thấp, nộp phạt danh dự nhẹ",
        labelEn: "Plead an etiquette oversight and accept a minor dishonor penalty",
        outcomes: [
          {
            w: 100,
            resultVi: "Bạn cúi gập người tạ lỗi theo đúng bộ luật tiền lệ thứ mười tám. Phân khu đối địch cười khẩy bỏ qua; bạn và đồng đội giữ được mạng sống nhưng chịu giảm sút vị thế.",
            resultEn: "You bow in formal apology under Precedent Clause Eighteen. The rival branch scoffs and lets it drop; you and your comrade survive, at the cost of standing.",
            effects: { standing: -6, rep: -4 },
            flagsAdd: ['thumb_etiquette_gamble_done']
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ 2. Index: Blank Prescript Gamble
  {
    id: 'syn_index_gamble_blank_prescript',
    age: [20, 80],
    major: true,
    weight: 35,
    need: { jobs: ['Syndicate'], finger: 'Index', fingerRankAtLeast: 1 },
    forbids: ['index_blank_prescript_done'],
    vi: "[Canh Bạc Chỉ Lệnh Trống] Một Messenger giao cho bạn cuộn giấy Prescript trắng trơn. Theo lệ Index, tờ giấy không chữ đòi hỏi người nhận tự đoán ý của Khung Cửi qua biến động quanh mình, hoặc chịu thanh trừng vì chậm trễ.",
    en: "[The Blank Prescript Wager] A Messenger delivers an entirely blank Prescript scroll. The Weaver’s whisper echoes within: “An unwritten directive demands absolute attunement to the flow. Undertake the most radical deed to fulfill it, or face purge for defiance.”",
    choices: [
      {
        labelVi: "Đốt kho hàng của Wing đối địch đúng vào lúc trăng lặn",
        labelEn: "Incinerate a rival Wing warehouse at midnight precisely at moonset",
        outcomes: [
          {
            w: 65,
            resultVi: "Đám cháy làm lộ kho vũ khí của băng Syndicate đang tính đánh úp Index. Một Proxy bước ra từ bóng tối, trao cho bạn huy hiệu ghi công.",
            resultEn: "The blaze exposes a conspiracy by a rival syndicate, aligning with the Flow. A Proxy manifests to confer the Seer’s insignia: you deciphered the silent word.",
            effects: { rep: +30, resonance: +25, merit: +35, wealth: +25 },
            flagsAdd: ['index_blank_prescript_done', 'ThấuThịDòngChảy'],
            recordsAdd: ['prescript_visionary']
          },
          {
            w: 35,
            resultVi: "Lửa cháy lan sang dãy nhà dân bên cạnh. Đội của Liu Association kéo tới vây bắt; bạn mở đường máu thoát ra nhưng mang đầy vết bỏng.",
            resultEn: "Flames engulf innocent dwellings. Liu Association fire brigades encircle you; you break free bearing heavy burns and moral weight.",
            effects: { health: -25, sanity: -25, heat: +30 },
            flagsAdd: ['index_blank_prescript_done'],
            scarsAdd: ['Bỏng tàn tích lửa Index']
          }
        ]
      },
      {
        labelVi: "Viết chữ 'TUÂN MỆNH' bằng thuốc nhuộm lên giấy rồi nộp cho Proxy",
        labelEn: "Inscribe 'OBEY' with herbal dye and present it directly to the Proxy",
        outcomes: [
          {
            w: 75,
            resultVi: "Vị Proxy nhìn nét mực hồi lâu rồi khẽ gật đầu: “Biết tự điền chỗ trống cũng là hiểu ý Chỉ Lệnh.” Bạn qua được kỳ thử thách.",
            resultEn: "The Proxy studies the ink before nodding faintly: “Absolute surrender is itself foresight.” Your loyalty test clears with high praise.",
            effects: { standing: +20, sanity: +10, merit: +15 },
            flagsAdd: ['index_blank_prescript_done']
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ 3. Middle: Great Vendetta Gamble
  {
    id: 'syn_middle_gamble_great_vendetta',
    age: [21, 80],
    major: true,
    weight: 35,
    need: { jobs: ['Syndicate'], finger: 'Middle', fingerRankAtLeast: 1 },
    forbids: ['middle_vendetta_gamble_done'],
    vi: "[Đại Canh Bạc Sổ Huyết Hận] Book of Vengeance lật tới tên cựu Capo của Thumb từng sát hại mười ba anh em Middle. Hắn đang cố thủ trong sòng bạc ngầm ở District 10. Big Brother đưa dây xích cho bạn: “Mang đầu nó về, hoặc để xích lại đó.”",
    en: "[The Blood Ledger Wager] The Book of Vengeance turns to a paramount name: a rogue Thumb Capo who slaughtered thirteen Middle siblings a decade ago. He now fortifies an underground casino in District 10. The Great Elder lays golden chains in your grasp: “Return with his head, or leave your chains there.”",
    choices: [
      {
        labelVi: "Cùng anh em kết nghĩa dẫn đầu mũi đột kích phá cổng sòng bạc",
        labelEn: "Lead a frontal assault with your sworn sibling, smashing the casino gates",
        need: { stat: { health: [40, 100] } },
        outcomes: [
          {
            w: 64,
            resultVi: "Dây xích của bạn siết gãy cổ kẻ phản bội ngay giữa sòng bạc. Tiền trong két được chia cho gia đình những người đã khuất; tên bạn được ghi vào trang đầu cuốn sổ.",
            resultEn: "Your golden chains snap the traitor’s neck before his entire gang. The casino falls; gold is distributed to martyrs' kin. Your name rings through the Middle.",
            effects: { rep: +40, wealth: +50, merit: +40, health: -15 },
            flagsAdd: ['middle_vendetta_gamble_done', 'HuyếtThùToànThắng'],
            recordsAdd: ['middle_avenger']
          },
          {
            w: 36,
            resultVi: "Hắn bấm kíp nổ giấu dưới bàn bạc. Người anh em kết nghĩa đẩy bạn ra và nằm lại dưới đống đổ nát; bạn lấy được đầu kẻ thù nhưng mang vết bỏng dọc sườn.",
            resultEn: "He triggers charges beneath the gaming tables. Your sworn sibling shields you, falling in the blast; you strike the traitor down but carry enduring sorrow.",
            effects: { health: -35, sanity: -30, merit: +20 },
            flagsAdd: ['middle_vendetta_gamble_done'],
            scarsAdd: ['Sẹo bom sòng bạc Middle']
          }
        ]
      },
      {
        labelVi: "Cải trang thành khách đánh bạc, bỏ độc vào rượu của hắn",
        labelEn: "Disguise as high-rolling gamblers, poisoning his cellar reserve from within",
        costAhn: 20,
        outcomes: [
          {
            w: 75,
            resultVi: "Chất độc phát tác êm thấm giữa bữa tiệc. Kẻ phản bội gục xuống bàn tiệc; bạn thu hồi huy hiệu cũ của hắn và rút lui an toàn trong tiếng hoảng loạn của sòng bạc.",
            resultEn: "The toxin works silently amidst the banquet. The traitor slumps over velvet; you retrieve his badge and slip away under cover of panic.",
            effects: { rep: +25, wealth: +30, merit: +25, sanity: +5 },
            flagsAdd: ['middle_vendetta_gamble_done']
          }
        ]
      },
      {
        labelVi: "Tạm hoãn đột kích, tiếp tục theo dõi sòng bạc chờ thời cơ",
        labelEn: "Delay the raid to trail the casino and await a cleaner opening",
        outcomes: [
          {
            w: 100,
            resultVi: "Bạn nhận định phòng tuyến của kẻ thù quá dày đặc. Việc rút lui tạm thời bị huynh đệ cằn nhằn, nhưng mạng sống toàn đội được bảo toàn nguyên vẹn.",
            resultEn: "You assess their defenses as too fortified. Your retreat draws grumbling from sworn siblings, but the crew survives intact.",
            effects: { sanity: -4, standing: -3 },
            flagsAdd: ['middle_vendetta_gamble_done']
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ 4. Ring: Grotesque Flesh Gallery Gamble
  {
    id: 'syn_ring_gamble_flesh_gallery',
    age: [21, 80],
    major: true,
    weight: 35,
    need: { jobs: ['Syndicate'], finger: 'Ring', fingerRankAtLeast: 1 },
    forbids: ['ring_flesh_gallery_gamble_done'],
    vi: "[Triển Lãm Giải Phẫu Ngầm] Maestro của Ring mở phiên chấm tác phẩm lúc nửa đêm. Mọi người tham dự phải trưng bày một cấu trúc cơ thể biến đổi mới. Giải nhất là một ống tinh chất Singularity; kẻ nộp bài tầm thường sẽ bị lột da đóng khung ngay tại phòng tranh.",
    en: "[The Macabre Anatomy Gallery] The Maestro convenes an exclusive midnight exhibition. Every attendee must present a breakthrough physical installation. The grand prize is priceless Singularity essence; mediocre artisans have their hides peeled for wall hangings.",
    choices: [
      {
        labelVi: "Dùng xương sườn và huyết thanh của chính mình để dựng tác phẩm sống",
        labelEn: "Carve a living masterpiece from your own ribcage and volatile serum",
        need: { stat: { health: [40, 100], sanity: [35, 100] } },
        outcomes: [
          {
            w: 60,
            resultVi: "Khung xương sống uốn dưới đèn đỏ khiến cả phòng tranh im bặt. Maestro gật đầu chấm điểm tuyệt đối và trao ống tinh chất cho bạn.",
            resultEn: "The sculpture woven from living bone and crimson light stuns the gallery into awe. The Maestro weeps, bestowing the golden grail: you are proclaimed a Master Artisan of the Ring.",
            effects: { rep: +45, resonance: +30, merit: +40, health: -15, wealth: +40 },
            flagsAdd: ['ring_flesh_gallery_gamble_done', 'BậcThầyGiảiPhẫuRing'],
            recordsAdd: ['ring_maestro_applauded']
          },
          {
            w: 40,
            resultVi: "Cơn đau làm bạn run tay khiến khung xương sụp xuống. Maestro lắc đầu; đám hộ vệ rạch dọc cánh tay bạn để cảnh cáo trước khi ném ra hẻm.",
            resultEn: "Excruciating agony shatters your focus, collapsing the sculpture. The Maestro sighs; guards flay your arm in admonition before casting you into the gutter.",
            effects: { health: -30, sanity: -25, rep: -10 },
            flagsAdd: ['ring_flesh_gallery_gamble_done'],
            scarsAdd: ['Vết rạch kỷ luật Ring']
          }
        ]
      },
      {
        labelVi: "Dâng nộp một gián điệp Wing bị nhốt trong lồng kính khúc xạ",
        labelEn: "Present an infiltrated Wing operative encased in a suspended Singularity prism",
        costAhn: 25,
        outcomes: [
          {
            w: 78,
            resultVi: "Tác phẩm sống sau lồng kính nhận được điểm cao từ hội đồng chấm thi. Bạn qua kỳ khảo hạch an toàn cùng tiền thưởng.",
            resultEn: "The living operative suspended in refracting glass draws rapturous praise from the jury. You pass safely with hefty prize drafts.",
            effects: { rep: +25, wealth: +35, merit: +20, sanity: +5 },
            flagsAdd: ['ring_flesh_gallery_gamble_done']
          }
        ]
      },
      {
        labelVi: "Rút lui khỏi buổi đấu giá, chấp nhận bị hộ vệ trục xuất",
        labelEn: "Withdraw from the exhibition and accept ejection by gallery guards",
        outcomes: [
          {
            w: 100,
            resultVi: "Thấy bài dự thi của mình chưa đủ chuẩn, bạn lùi về sau rèm rồi rời đi. Hội đồng chấm thi gạch tên bạn khỏi sổ khen thưởng, nhưng bạn giữ được mạng.",
            resultEn: "Deeming your art insufficiently radical, you slip behind the drapes and depart. The jury derides your cowardice, but your skin remains intact.",
            effects: { rep: -8, standing: -5 },
            flagsAdd: ['ring_flesh_gallery_gamble_done']
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ 5. Pinky: Unbroken Oath Duel Gamble
  {
    id: 'syn_pinky_gamble_unbroken_oath',
    age: [21, 80],
    major: true,
    weight: 35,
    need: { jobs: ['Syndicate'], finger: 'Pinky', fingerRankAtLeast: 1 },
    forbids: ['pinky_unbroken_oath_done'],
    vi: "[Lời Thề Trên Phà Đêm] Một tay đao từng bội ước với Pinky quay lại chặn bạn trên chuyến phà đêm qua sông District 21. Theo lệ Ngón Út, hai bên chỉ ra một nhát đao; kẻ thua phải để lại ngón út trên boong tàu.",
    en: "[The Unbroken Oath Duel on the Ferry] A banished oathbreaker returns, issuing a challenge on the night ferry across District 21’s foggy river. By Pinky rite, drawn steel must settle the vow in a single stroke; the vanquished forfeits their pinky finger to the river.",
    choices: [
      {
        labelVi: "Rút đao lập thệ, phân thắng bại trong một nhát chém",
        labelEn: "Draw your sworn blade, wagering your life on a single-beat draw technique",
        need: { stat: { health: [35, 100], sanity: [30, 100] } },
        outcomes: [
          {
            w: 65,
            resultVi: "Nhát chém một nhịp làm gãy đôi lưỡi đao của kẻ bội ước. Hắn quỳ xuống chịu phạt; đám người của Pinky trên phà lặng lẽ nhường đường cho bạn.",
            resultEn: "Steel flashes like lightning cleaving mist. The oathbreaker’s blade snaps in two; he falls accepting defeat. You uphold the Sworn Blade’s honor; all duelists on deck bow in respect.",
            effects: { rep: +35, merit: +35, standing: +25, wealth: +25 },
            flagsAdd: ['pinky_unbroken_oath_done', 'ĐaoKháchTuyệtĐỉnhPinky'],
            recordsAdd: ['pinky_oath_champion']
          },
          {
            w: 35,
            resultVi: "Mũi kiếm đối thủ đâm xuyên bàn tay trái của bạn trước khi gãy. Bạn hạ được hắn, nhưng các khớp ngón tay trái không còn co duỗi được như cũ.",
            resultEn: "Their steel pierces your off-hand before shattering. You put them down, but suffer lasting stiffness in your fingers.",
            effects: { health: -25, sanity: -15, rep: +15, merit: +15 },
            flagsAdd: ['pinky_unbroken_oath_done'],
            scarsAdd: ['Vết đâm kiếm pháp Pinky']
          }
        ]
      },
      {
        labelVi: "Dẫn luật Ngón Út ép hắn tự chặt một ngón tay chuộc tội",
        labelEn: "Invoke Pinky elder covenants, compelling him to sever a finger for parley",
        outcomes: [
          {
            w: 80,
            resultVi: "Bị bạn đọc đúng điều khoản thề máu, kẻ bội ước tự chặt ngón út để lại trên boong tàu rồi nhảy xuống sông. Việc của Pinky xong mà đao chưa cần rút.",
            resultEn: "Intimidated by your mastery of elder covenants, the oathbreaker severs his own finger, flinging it onto the deck before diving into the fog. Pinky law is upheld bloodlessly.",
            effects: { rep: +25, standing: +15, merit: +20, sanity: +10 },
            flagsAdd: ['pinky_unbroken_oath_done']
          }
        ]
      }
    ]
  }
];
