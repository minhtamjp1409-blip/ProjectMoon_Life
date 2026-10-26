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
    vi: "[Canh Bạc Nghi Thức: Quyết Đấu Sottocapo] Trong bữa tiệc rượu của Thumb, một Capo đối địch vu cáo rằng người đồng đội thân thiết của bạn đã cúi đầu chào sai góc độ mười lăm độ. Theo kỷ luật sắt của Ngón Cái, hình phạt là chặt đứt ba ngón tay hoặc bước vào Đấu Trường Nghi Thức, nơi hai bên dùng súng lục một phát đạn bắn luân phiên cho đến khi danh dự được gột rửa.",
    en: "[Etiquette Wager: The Sottocapo Duel] At a Thumb banquet, a rival Capo accuses your companion of bowing fifteen degrees off protocol. By the Thumb’s iron law, the penalty is three severed fingers or the Arena of Etiquette, where both sides alternate single-shot pistol fire until honor is restored.",
    choices: [
      {
        labelVi: "Đứng ra nhận thay bạn bè, bước vào Đấu Trường Nghi Thức với khẩu súng nạp một viên",
        labelEn: "Step forward in your comrade’s place, entering the Arena of Etiquette",
        need: { stat: { health: [35, 100], sanity: [30, 100] } },
        outcomes: [
          {
            w: 62,
            resultVi: "Phát đạn của bạn trúng ngay báng súng đối thủ làm bay vũ khí trước khi hắn kịp siết cò. Toàn thể Capo đồng loạt đứng dậy vỗ tay; Sottocapo đích thân nâng ly chúc mừng bản lĩnh thép của bạn.",
            resultEn: "Your bullet clips their pistol grip, disarming them before they pull. The Capos rise in thunderous applause; the Sottocapo toasts your unyielding nerve.",
            effects: { rep: +35, standing: +25, merit: +30, wealth: +30 },
            flagsAdd: ['thumb_etiquette_gamble_done', 'BảnLĩnhThépThumb'],
            recordsAdd: ['thumb_duel_victor']
          },
          {
            w: 38,
            resultVi: "Phát súng của đối thủ sượt qua bả vai bạn làm toác cơ thịt. Bạn đứng vững không rên một tiếng, chứng minh tư cách Thumb nhưng phải dưỡng thương suốt hai tháng.",
            resultEn: "Their bullet grazes your shoulder, tearing muscle. You stand rigid without a whimper, proving Thumb pedigree, but spend two months recuperating.",
            effects: { health: -30, sanity: -15, rep: +15, merit: +15 },
            flagsAdd: ['thumb_etiquette_gamble_done'],
            scarsAdd: ['Vết đạn nghi thức Thumb']
          }
        ]
      },
      {
        labelVi: "Dâng nộp 35 Ahn và một khẩu súng mạ vàng để bồi hoàn danh dự theo nghi lễ phụ",
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
    vi: "[Canh Bạc Chỉ Lệnh Trống] Một Sứ Giả Messenger giao đến tay bạn một cuộn giấy Prescript hoàn toàn để trống. Lời thì thầm của Thần Dệt dội lại trong tâm trí: “Chỉ lệnh không có chữ là chỉ lệnh đòi hỏi sự thấu thị của dòng chảy. Hãy chọn một hành động điên rồ nhất để hoàn tất sứ mệnh, hoặc chấp nhận bị thanh trừng vì bất tuân.”",
    en: "[The Blank Prescript Wager] A Messenger delivers an entirely blank Prescript scroll. The Weaver’s whisper echoes within: “An unwritten directive demands absolute attunement to the flow. Undertake the most radical deed to fulfill it, or face purge for defiance.”",
    choices: [
      {
        labelVi: "Đốt cháy một kho hàng của Wing đối địch lúc nửa đêm đúng vào khoảnh khắc trăng lặn",
        labelEn: "Incinerate a rival Wing warehouse at midnight precisely at moonset",
        outcomes: [
          {
            w: 65,
            resultVi: "Ngọn lửa bốc cao làm lộ ra một đường dây phản nghịch của Syndicate khác, đúng như dự liệu của Dòng Chảy. Một Proxy xuất hiện trao cho bạn huy hiệu thấu thị: bạn đã hiểu được ý chỉ vô ngôn.",
            resultEn: "The blaze exposes a conspiracy by a rival syndicate, aligning with the Flow. A Proxy manifests to confer the Seer’s insignia: you deciphered the silent word.",
            effects: { rep: +30, resonance: +25, merit: +35, wealth: +25 },
            flagsAdd: ['index_blank_prescript_done', 'ThấuThịDòngChảy'],
            recordsAdd: ['prescript_visionary']
          },
          {
            w: 35,
            resultVi: "Ngọn lửa lan sang khu dân cư vô tội. Đội lính cứu hỏa của Liu Association bao vây bạn; bạn thoát được nhưng mang gánh nặng tội lỗi và bị thương tích nặng.",
            resultEn: "Flames engulf innocent dwellings. Liu Association fire brigades encircle you; you break free bearing heavy burns and moral weight.",
            effects: { health: -25, sanity: -25, heat: +30 },
            flagsAdd: ['index_blank_prescript_done'],
            scarsAdd: ['Bỏng tàn tích lửa Index']
          }
        ]
      },
      {
        labelVi: "Dùng thuốc nhuộm thảo dược viết chữ 'TUÂN MỆNH' lên cuộn giấy và đệ trình lên Proxy",
        labelEn: "Inscribe 'OBEY' with herbal dye and present it directly to the Proxy",
        outcomes: [
          {
            w: 75,
            resultVi: "Vị Proxy nhìn nét mực hồi lâu rồi khẽ mỉm cười: “Sự tuân phục tuyệt đối cũng là một dạng thấu thị.” Bạn được phê chuẩn vượt qua bài thử lòng tin.",
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
    vi: "[Đại Canh Bạc Sổ Huyết Hận] Cuốn Sổ Huyết Thù (Book of Vengeance) lật đến một cái tên then chốt: một cựu Capo của Thumb từng phản bội và sát hại mười ba người anh em Middle cách đây mười năm. Hắn hiện là chủ một sòng bạc ngầm kiên cố ở District 10. Đại Trưởng Lão trao xích vàng vào tay bạn: “Mang đầu nó về hoặc để xích lại nơi đó.”",
    en: "[The Blood Ledger Wager] The Book of Vengeance turns to a paramount name: a rogue Thumb Capo who slaughtered thirteen Middle siblings a decade ago. He now fortifies an underground casino in District 10. The Great Elder lays golden chains in your grasp: “Return with his head, or leave your chains there.”",
    choices: [
      {
        labelVi: "Cùng huynh đệ kết nghĩa dẫn đầu mũi đột kích trực diện xuyên thủng sòng bạc",
        labelEn: "Lead a frontal assault with your sworn sibling, smashing the casino gates",
        need: { stat: { health: [40, 100] } },
        outcomes: [
          {
            w: 64,
            resultVi: "Xích vàng của bạn quấn chặt cổ kẻ phản bội trước mặt toàn bộ đàn em hắn. Sòng bạc quy phục; toàn bộ vàng bạc được chia đều cho các gia đình tử sĩ. Tên bạn vang dội khắp Ngón Giữa.",
            resultEn: "Your golden chains snap the traitor’s neck before his entire gang. The casino falls; gold is distributed to martyrs' kin. Your name rings through the Middle.",
            effects: { rep: +40, wealth: +50, merit: +40, health: -15 },
            flagsAdd: ['middle_vendetta_gamble_done', 'HuyếtThùToànThắng'],
            recordsAdd: ['middle_avenger']
          },
          {
            w: 36,
            resultVi: "Hắn kích hoạt chất nổ ngầm dưới sàn sòng bạc. Người anh em kết nghĩa đỡ đòn cho bạn và tử trận; bạn chém gục được kẻ thù nhưng ôm vết thương lòng rỉ máu suốt đời.",
            resultEn: "He triggers charges beneath the gaming tables. Your sworn sibling shields you, falling in the blast; you strike the traitor down but carry enduring sorrow.",
            effects: { health: -35, sanity: -30, merit: +20 },
            flagsAdd: ['middle_vendetta_gamble_done'],
            scarsAdd: ['Sẹo bom sòng bạc Middle']
          }
        ]
      },
      {
        labelVi: "Cải trang thành khách chơi bạc cao cấp, đầu độc rượu của hắn từ bên trong",
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
    vi: "[Đại Triển Lãm Giải Phẫu Kỳ Dị] Đại Nhạc Trưởng Maestro của Ring triệu tập phiên đấu giá nghệ thuật ngầm độc nhất vô nhị. Mọi người tham gia phải trình bày một tác phẩm mang tính đột phá về cấu trúc cơ thể. Giải thưởng là một lọ tinh chất Singularity vô giá; kẻ có tác phẩm tầm thường sẽ bị lột da làm tranh treo tường.",
    en: "[The Macabre Anatomy Gallery] The Maestro convenes an exclusive midnight exhibition. Every attendee must present a breakthrough physical installation. The grand prize is priceless Singularity essence; mediocre artisans have their hides peeled for wall hangings.",
    choices: [
      {
        labelVi: "Dùng chính xương sườn và huyết thanh biến đổi của mình để chạm khắc tác phẩm sống",
        labelEn: "Carve a living masterpiece from your own ribcage and volatile serum",
        need: { stat: { health: [40, 100], sanity: [35, 100] } },
        outcomes: [
          {
            w: 60,
            resultVi: "Tác phẩm điêu khắc từ xương sống và ánh sáng đỏ thẫm khiến cả phòng triển lãm chết lặng. Maestro rơi nước mắt xúc động trao chiếc cúp vàng cho bạn: bạn được phong làm Bậc Thầy Sáng Tác của The Ring.",
            resultEn: "The sculpture woven from living bone and crimson light stuns the gallery into awe. The Maestro weeps, bestowing the golden grail: you are proclaimed a Master Artisan of the Ring.",
            effects: { rep: +45, resonance: +30, merit: +40, health: -15, wealth: +40 },
            flagsAdd: ['ring_flesh_gallery_gamble_done', 'BậcThầyGiảiPhẫuRing'],
            recordsAdd: ['ring_maestro_applauded']
          },
          {
            w: 40,
            resultVi: "Cơn đau xé toạc ý thức làm bạn run tay khiến cấu trúc sụp đổ. Maestro lắc đầu thất vọng; bạn bị rạch nát cánh tay để làm bài học trước khi được ném ra khỏi phòng tranh.",
            resultEn: "Excruciating agony shatters your focus, collapsing the sculpture. The Maestro sighs; guards flay your arm in admonition before casting you into the gutter.",
            effects: { health: -30, sanity: -25, rep: -10 },
            flagsAdd: ['ring_flesh_gallery_gamble_done'],
            scarsAdd: ['Vết rạch kỷ luật Ring']
          }
        ]
      },
      {
        labelVi: "Dâng nộp một gián điệp của Wing đối nghịch được bọc trong lồng kính Singularity",
        labelEn: "Present an infiltrated Wing operative encased in a suspended Singularity prism",
        costAhn: 25,
        outcomes: [
          {
            w: 78,
            resultVi: "Tác phẩm con người sống động sau lồng kính khúc xạ nhận được tràng pháo tay nồng nhiệt từ hội đồng chấm thi. Bạn vượt qua khảo thí an toàn với phần thưởng kếch xù.",
            resultEn: "The living operative suspended in refracting glass draws rapturous praise from the jury. You pass safely with hefty prize drafts.",
            effects: { rep: +25, wealth: +35, merit: +20, sanity: +5 },
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
    vi: "[Quyết Đấu Lập Thệ Trên Bến Sương Mù] Một kiếm khách lưu vong từng bội ước với Pinky quay trở lại khiêu chiến trên chuyến phà đêm mù sương vượt sông District 21. Theo quy tắc của Ngón Út, kẻ rút đao phải hoàn tất lời thề bằng một nhát chém duy nhất; kẻ thất bại sẽ bị chặt đứt ngón tay út và ném xuống dòng sông đen.",
    en: "[The Unbroken Oath Duel on the Ferry] A banished oathbreaker returns, issuing a challenge on the night ferry across District 21’s foggy river. By Pinky rite, drawn steel must settle the vow in a single stroke; the vanquished forfeits their pinky finger to the river.",
    choices: [
      {
        labelVi: "Rút thanh kiếm lập thệ, đặt cược tính mạng vào tuyệt kỹ kiếm pháp một nhịp",
        labelEn: "Draw your sworn blade, wagering your life on a single-beat draw technique",
        need: { stat: { health: [35, 100], sanity: [30, 100] } },
        outcomes: [
          {
            w: 65,
            resultVi: "Đao quang lóe lên như lằn chớp xé toạc màn sương. Thanh kiếm của kẻ bội ước đứt đôi; hắn ngã quỵ thừa nhận thất bại. Bạn giữ vững uy danh của Lưỡi Đao Lập Thệ; các kiếm khách trên phà đồng loạt cúi đầu.",
            resultEn: "Steel flashes like lightning cleaving mist. The oathbreaker’s blade snaps in two; he falls accepting defeat. You uphold the Sworn Blade’s honor; all duelists on deck bow in respect.",
            effects: { rep: +35, merit: +35, standing: +25, wealth: +25 },
            flagsAdd: ['pinky_unbroken_oath_done', 'ĐaoKháchTuyệtĐỉnhPinky'],
            recordsAdd: ['pinky_oath_champion']
          },
          {
            w: 35,
            resultVi: "Mũi kiếm đối thủ đâm xuyên qua bàn tay trái của bạn trước khi gãy. Bạn chém gục được hắn nhưng mất đi sự linh hoạt vĩnh viễn ở các khớp ngón tay.",
            resultEn: "Their steel pierces your off-hand before shattering. You put them down, but suffer lasting stiffness in your fingers.",
            effects: { health: -25, sanity: -15, rep: +15, merit: +15 },
            flagsAdd: ['pinky_unbroken_oath_done'],
            scarsAdd: ['Vết đâm kiếm pháp Pinky']
          }
        ]
      },
      {
        labelVi: "Dẫn luật nghi lễ Ngón Út ép hắn tự phế một ngón tay để chuộc tội tha chết",
        labelEn: "Invoke Pinky elder covenants, compelling him to sever a finger for parley",
        outcomes: [
          {
            w: 80,
            resultVi: "Trước uy thế và kiến thức sâu rộng về luật thề của bạn, kẻ bội ước run rẩy tự chặt đứt ngón tay nộp lên boong tàu rồi lặn xuống sông bỏ trốn. Công lý của Pinky được thực thi mà không tốn giọt máu nào của bạn.",
            resultEn: "Intimidated by your mastery of elder covenants, the oathbreaker severs his own finger, flinging it onto the deck before diving into the fog. Pinky law is upheld bloodlessly.",
            effects: { rep: +25, standing: +15, merit: +20, sanity: +10 },
            flagsAdd: ['pinky_unbroken_oath_done']
          }
        ]
      }
    ]
  }
];
