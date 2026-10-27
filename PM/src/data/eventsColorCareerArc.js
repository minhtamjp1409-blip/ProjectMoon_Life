/**
 * Project Moon Universe - Dedicated Color Fixer Career Arc Events
 * Exclusive to Color Fixers (job === 'Color Fixer' or flags.includes('ColorFixer')).
 * Grounded in canon lore: Wing Singularity proxy wars, Star of the City suppressions,
 * Beholder/Claw encounters, Signature Color Office establishment, and mentoring disciples.
 */

export const COLOR_CAREER_EVENTS = [
  // ------------------------------------------------------------------ 1. Establish Signature Color Office
  {
    id: 'color_arc_found_office',
    repeatable: false,
    age: [26, 80],
    major: true,
    weight: 95,
    jobs: ['Color Fixer'],
    requires: ['ColorFixer'],
    forbids: ['OwnColorOffice', 'Distorted'],
    vi: "[Văn Phòng Riêng Của Color] Với danh hiệu Color Fixer vừa thụ phong, các nhà đầu tư và môi giới lũ lượt kéo đến quỳ trước cửa trọ của bạn. Họ mang theo hợp đồng thuê mướn và xấp séc bảo chứng của các ngân hàng Nest: “Một Color không thể hành nghề ngoài lề đường được. Xin ngài hãy đặt bảng hiệu.”",
    en: "[Signature Color Office] With your Color Title recognized, brokers and patrons swarm your lodging with certified bank drafts: “A Color cannot take contracts from a street corner. Please raise your own shingle.”",
    choices: [
      {
        labelVi: "Chi 60 Ahn dựng bảng hiệu tại Backstreets District 23, mở cửa đón những kẻ tuyệt vọng",
        labelEn: "Spend 60 Ahn to raise your sign in Backstreets District 23, taking contracts from the desperate",
        costAhn: 60,
        flagsAdd: ['OwnColorOffice', 'BackstreetOffice'],
        effects: { rep: +25, network: +20, sanity: +15 },
        resultVi: "Bảng hiệu mang sắc Màu của bạn được treo lên đầu con hẻm. Từ hôm nay, người dân nghèo Backstreets biết nơi nào để tìm đến khi cả The City quay lưng với họ.",
        resultEn: "Your Color emblem hangs over the alley entrance. From this day forward, the people of the Backstreets know where to turn when the City turns away."
      },
      {
        labelVi: "Chi 90 Ahn thuê tầng thượng cao ốc Nest, ký hợp đồng đối tác chiến lược với Wing",
        labelEn: "Spend 90 Ahn for a Nest high-rise penthouse, entering a strategic partnership with the Wing",
        costAhn: 90,
        flagsAdd: ['OwnColorOffice', 'NestOffice'],
        effects: { rep: +35, wealth: +40, merit: +15 },
        resultVi: "Văn phòng mới nhìn xuống toàn cảnh Nest qua lớp kính chống đạn. Thư ký riêng và Fixer Grade 1 xếp hàng ngoài sảnh để xin gia nhập dưới trướng bạn.",
        resultEn: "Your new office overlooks the entire Nest behind reinforced glass. A personal staff and Grade 1 Fixers wait outside to serve under your banner."
      },
      {
        labelVi: "Từ chối mọi lời mời, chỉ giữ một thanh kiếm và bước đi như một lãng khách tự do",
        labelEn: "Refuse all offers, keeping only your blade and walking as an unchained wanderer",
        effects: { sanity: +25, resonance: +15 },
        resultVi: "Bạn bước qua đám đông ồn ào mà không ngoảnh lại. Không văn phòng, không bàn giấy, không xiềng xích ràng buộc. Bạn là một Color tự do.",
        resultEn: "You walk past the clamoring crowd without looking back. No office, no ledgers, no shackles. You remain a free Color."
      }
    ]
  },

  // ------------------------------------------------------------------ 2. Star of the City Aberration Subjugation
  {
    id: 'color_arc_star_aberration',
    repeatable: true,
    age: [26, 85],
    major: true,
    weight: 85,
    jobs: ['Color Fixer'],
    requires: ['ColorFixer'],
    forbids: ['Distorted'],
    vi: "[Hợp Đồng Cấp Màu · Star of the City] Hiệp hội Hana gióng hồi chuông báo động toàn đô thị. Một thực thể sa ngã cấp độ Star of the City trốn thoát khỏi cơ sở thí nghiệm cũ, đang nuốt chửng ba khu phố công nghiệp. Mười văn phòng Grade 1 đã bị xóa sổ trong đêm. Hana gửi hợp đồng đỏ trực tiếp đến tay bạn.",
    en: "[Color Directive · Star of the City] Hana sounds the citywide alarm. A Star of the City entity broke from an old facility, swallowing three industrial blocks. Ten Grade 1 offices were wiped out in one night. Hana sends a scarlet directive straight to you.",
    choices: [
      {
        labelVi: "Đơn thương độc mã vung vũ khí xé toạc màn sương máu",
        labelEn: "Charge alone, cutting through the crimson mist with your bare blade",
        checkTrait: 'vigor',
        outcomes: [
          {
            w: 65,
            effects: { health: -22, sanity: -14, rep: +30, merit: +28, wealth: +45 },
            scarsAdd: ['Chiến tích Star of the City'],
            resultVi: "Lưỡi vũ khí của bạn va chạm với lõi thực thể trong một tiếng nổ chấn động. Khi lớp sương tan, bạn đứng vững trên đống đổ nát với lõi Dị thể trong tay. Cả The City lặng đi trước sức mạnh của Color.",
            resultEn: "Your weapon shatters the core in a deafening thunderclap. When the mist clears, you stand over the ruin holding the core. The entire City falls silent before the Color’s might."
          },
          {
            w: 35,
            effects: { health: -36, sanity: -22, rep: +14, merit: +12, wealth: +24 },
            scarsAdd: ['Vết rách từ lõi Star of the City'],
            resultVi: "Thực thể phát nổ ngay khoảnh khắc bị chém vỡ lõi, phóng thích luồng sóng ăn mòn xuyên qua giáp hộ thân của bạn. Bạn hoàn thành hợp đồng nhưng phải trả giá bằng máu tươi và nhiều tuần dưỡng thương.",
            resultEn: "The entity detonated the instant its core split, driving a corrosive wave through your armor. You fulfilled the directive, yet paid in blood and weeks of recovery."
          }
        ]
      },
      {
        labelVi: "Phối hợp với phái đoàn Hana và các chi hội Association dàn thế trận vây hãm",
        labelEn: "Coordinate with the Hana delegation and Association sections to encircle the beast",
        checkTrait: 'nerve',
        effects: { health: -12, sanity: -10, rep: +22, merit: +22, wealth: +32 },
        resultVi: "Trận địa khép lại chuẩn xác từng nhịp. Nhát chém kết liễu của bạn dập tắt sinh lực con quái vật mà không gây thêm thương vong cho cư dân xung quanh, dù thù lao phải chia sẻ cùng các chi hội hỗ trợ.",
        resultEn: "The perimeter closes with clockwork precision. Your finishing blow extinguishes the beast without further civilian casualties, sharing the bounty across the supporting sections."
      }
    ]
  },

  // ------------------------------------------------------------------ 3. Wing Corporate Proxy War
  {
    id: 'color_arc_wing_proxy_war',
    repeatable: true,
    age: [27, 85],
    major: true,
    weight: 80,
    jobs: ['Color Fixer'],
    requires: ['ColorFixer'],
    forbids: ['Distorted'],
    vi: "[Chiến Tranh Tập Đoàn Wing] Hai tập đoàn Cánh đối địch chuẩn bị nổ ra chiến tranh ngầm tranh giành bằng sáng chế Singularity. Cả hai bên đều bí mật cử giám đốc điều hành mang vali chứa 48 Ahn đến trước cửa bạn, thỉnh cầu bạn trở thành cán cân quyết định chiến trường.",
    en: "[Corporate Proxy War] Two rival Wings prepare for an underground war over a Singularity patent. Both send executive directors with briefcases of 48 Ahn to your door, begging you to serve as their decisive deterrent.",
    choices: [
      {
        labelVi: "Ký hợp đồng với Wing trả giá cao hơn, ra tay nghiền nát lực lượng đối thủ",
        labelEn: "Sign with the higher bidder and crush the opposing strike force",
        outcomes: [
          {
            w: 70,
            effects: { wealth: +48, rep: +14, heat: +18, sanity: -14, health: -14 },
            resultVi: "Trận chiến kết thúc chỉ sau mười lăm phút khi bạn bước vào tiền tuyến. Wing thuê bạn thâu tóm toàn bộ phòng thí nghiệm, còn tập đoàn bại trận ghi tên bạn vào sổ đen trả thù.",
            resultEn: "The battle ends fifteen minutes after you step onto the front. The hiring Wing secures the lab, while the defeated corporation inscribes your name onto its retaliation ledger."
          },
          {
            w: 30,
            effects: { wealth: +24, health: -28, sanity: -18, heat: +24 },
            scarsAdd: ['Dư chấn vũ khí Singularity cấp Wing'],
            resultVi: "Đối phương tung ra mẫu vũ khí Singularity thử nghiệm tự hủy ngay khi bạn áp sát. Bạn sống sót bước ra khỏi biển lửa với một nửa số tiền cọc và vết thương âm ỉ.",
            resultEn: "The opposing force detonated an experimental Singularity prototype as you closed in. You walked out of the inferno with half the retainer and a smoldering wound."
          }
        ]
      },
      {
        labelVi: "Từ chối cả hai bên, tuyên bố quyền trung lập của một Color độc lập",
        labelEn: "Refuse both sides, asserting the neutrality of an independent Color",
        effects: { rep: +18, sanity: +14, resonance: +10, heat: +8 },
        resultVi: "Bạn đóng cửa từ chối cả hai vali tiền. Cả hai tập đoàn đều không dám manh động vì sợ bạn nghiêng về phía đối phương, dù mật vụ của họ vẫn âm thầm canh chừng nhất cử nhất động của bạn.",
        resultEn: "You shut the door on both briefcases. Neither Wing dares strike first fearing you might side with the other, though their operatives quietly monitor your every move."
      }
    ]
  },

  // ------------------------------------------------------------------ 4. Gaze of the Beholder
  {
    id: 'color_arc_beholder_scrutiny',
    repeatable: true,
    age: [28, 90],
    major: true,
    weight: 75,
    jobs: ['Color Fixer'],
    requires: ['ColorFixer'],
    forbids: ['Distorted'],
    vi: "[Ánh Mắt Kẻ Quan Sát] Trong một quán trà vắng vẻ ở Backstreets, một Beholder của B Corp xuất hiện ngay đối diện bàn bạn. Con mắt cơ khí toàn giác xoay tròn không một tiếng động, quét qua nhịp tim, vết sẹo và trường năng lượng của bạn: “Sức mạnh của một Color đã tiệm cận lằn ranh xáo trộn trật tự đô thị. The Head đang dõi theo ngươi.”",
    en: "[Gaze of the Beholder] In a deserted Backstreet teahouse, a Beholder from B Corp sits across from you. Its omniscient mechanical lens hums silently, scanning your pulse, scars, and energy field: “A Color’s strength borders on disrupting urban order. The Head is watching you.”",
    choices: [
      {
        labelVi: "Điềm tĩnh rót chén trà mời đối phương, không để lộ nửa phần sợ hãi",
        labelEn: "Calmly pour a cup of tea for the watcher without showing a trace of fear",
        checkTrait: 'nerve',
        effects: { sanity: +18, resonance: +15, rep: +15 },
        resultVi: "Kẻ Quan Sát nhìn chén trà bốc khói rồi khẽ gật đầu: “Một tâm trí vững như bàn thạch. Hãy nhớ lấy vị trí của ngươi trong bức tranh của The City.” Bóng dáng hắn tan vào không khí.",
        resultEn: "The Beholder regards the steaming tea and nods faintly: “A steady mind. Remember your place in the City’s design.” The figure dissolves into thin air."
      },
      {
        labelVi: "Đặt tay lên chuôi kiếm, nhắc nhở rằng không ai được phép đe dọa bạn",
        labelEn: "Rest your hand on your hilt, reminding the watcher that no one threatens you",
        effects: { rep: +25, heat: +20, taboo: +1 },
        resultVi: "Sát khí của một Color khiến không khí trong quán trà đông cứng lại. Beholder ghi nhận một dòng mã vào sổ lưu trữ tối cao rồi rút lui. Ánh mắt The Eye sẽ không bao giờ rời khỏi bạn.",
        resultEn: "A Color’s bloodlust freezes the teahouse air. The Beholder logs a code into the supreme registry and retreats. The Eye will never look away from you."
      }
    ]
  },

  // ------------------------------------------------------------------ 5. Recruiting the Prodigy Disciple
  {
    id: 'color_arc_disciple_recruitment',
    repeatable: true,
    age: [28, 80],
    major: true,
    weight: 70,
    jobs: ['Color Fixer'],
    requires: ['ColorFixer'],
    forbids: ['Distorted'],
    vi: "[Truyền Thừa Môn Đệ] Một thiếu niên ở Backstreets từng chứng kiến nhát chém kinh thiên của bạn đã lẳng lặng quỳ suốt ba ngày ba đêm trước cổng văn phòng. Bất chấp mưa axit và những kẻ say xỉn đi qua, ánh mắt của nó kiên định như một phiến thép vừa tôi: “Xin ngài hãy dạy tôi cách cầm kiếm.”",
    en: "[Mentoring a Disciple] A Backstreet youth who witnessed your legendary strike has knelt before your office gate for three days and nights through acid rain: “Please teach me how to hold steel.”",
    choices: [
      {
        labelVi: "Thu nhận làm đệ tử chân truyền, truyền dạy võ học và tôi luyện tâm tính",
        labelEn: "Accept the youth as your sworn disciple, training their blade and spirit",
        effects: { sanity: +15, rep: +15, wealth: -15 },
        flagsAdd: ['MentoringColorDisciple'],
        resultVi: "Bạn đỡ đứa trẻ đứng dậy và đưa cho nó thanh kiếm gỗ đầu tiên. Từ ngày hôm nay, ngọn lửa của bạn đã có người kế thừa tại The City.",
        resultEn: "You raise the youth up and hand them their first wooden practice sword. From this day, your flame has an heir in the City."
      },
      {
        labelVi: "Dúi vào tay nó một túi Ahn và khuyên nó rời xa chốn đao kiếm máu me",
        labelEn: "Press a pouch of Ahn into their hands and urge them away from bloodshed",
        effects: { rep: +10, wealth: -12, sanity: +10 },
        resultVi: "Đứa trẻ nhìn túi tiền rồi rơi nước mắt. Nó cúi lạy bạn ba lần rồi quay lưng bước đi, tìm kiếm một cuộc đời bình an bên ngoài vòng chém giết.",
        resultEn: "The youth looks at the purse with tears, bows three times, and walks away to seek an ordinary life beyond slaughter."
      }
    ]
  },

  // ------------------------------------------------------------------ 6. Clash of the Living Colors
  {
    id: 'color_arc_rival_color_duel',
    repeatable: true,
    age: [28, 85],
    major: true,
    weight: 65,
    jobs: ['Color Fixer'],
    requires: ['ColorFixer'],
    forbids: ['Distorted'],
    vi: "[Hội Ngộ Đỉnh Cao: So Kiếm Giữa Hai Color] Một phong thư niêm phong sáp đỏ gửi đến bàn làm việc. Một Color Fixer lừng danh khác mời bạn đến đồi phế tích Outskirts vào lúc hoàng hôn: “Đã lâu lắm rồi ta mới thấy một lưỡi kiếm sắc bén đến vậy ở The City. Hãy uống một chén rượu rồi so tài một trăm hiệp.”",
    en: "[Clash of Colors: Duel of Legends] A red-waxed letter arrives. Another renowned Color invites you to an Outskirts ruin hill at dusk: “It has been too long since I saw a blade this sharp in the City. Let us share a drink and exchange a hundred strikes.”",
    choices: [
      {
        labelVi: "Đến điểm hẹn, rút vũ khí giao phong một trăm hiệp đến khi trời rạng",
        labelEn: "Arrive at dusk and cross blades for a hundred passes until sunrise",
        checkTrait: 'vigor',
        outcomes: [
          {
            w: 65,
            effects: { health: -18, rep: +26, merit: +22, sanity: +14 },
            scarsAdd: ['Vết kiếm của Color đối địch'],
            resultVi: "Kiếm khí của hai vị Color xé toạc màn đêm và san phẳng những cột đá cổ đại. Trận đấu khép lại trong tiếng cười sảng khoái của hai đỉnh cao võ đạo.",
            resultEn: "The shockwaves of two Colors tear open the night and level ancient stone pillars. The duel closes with the roaring laughter of two peerless masters."
          },
          {
            w: 35,
            effects: { health: -32, sanity: -8, rep: +12, merit: +10 },
            scarsAdd: ['Thương tích từ tuyệt kỹ của Color'],
            resultVi: "Ở hiệp thứ chín mươi chín, tuyệt kỹ sát chiêu của đối phương xẻ dọc sườn bạn trước khi hai lưỡi vũ khí cùng gãy vụn. Bạn giữ vững uy danh nhưng phải mất hàng tháng trời để lành vết thương.",
            resultEn: "On the ninety-ninth pass, your rival’s signature technique carved across your ribs before both blades shattered. You upheld your honor, yet needed months to mend."
          }
        ]
      },
      {
        labelVi: "Ngồi lại bên đống lửa, uống cạn bình rượu mạnh và đàm đạo về cái giá của sức mạnh",
        labelEn: "Sit by the fire, finish the spirits, and discuss the toll of supreme power",
        effects: { sanity: +22, network: +16, resonance: +12, rep: -4 },
        resultVi: "Hai huyền thoại ngồi tựa lưng vào phế tích dưới bầu trời đầy bụi xám. Đêm nay không ai rút kiếm; dù đám hiếu kỳ ở The City có phần hụt hẫng, cả hai đều hiểu thấu tâm tư của đối phương.",
        resultEn: "Two legends sit against ancient stone under gray motes. Neither blade is drawn tonight; though City spectators feel cheated of a spectacle, both understand the other’s burden."
      }
    ]
  },

  // ------------------------------------------------------------------ 7. Signature Color Workshop Forge
  {
    id: 'color_arc_taboo_workshop_commission',
    repeatable: false,
    age: [27, 80],
    major: true,
    weight: 75,
    jobs: ['Color Fixer'],
    requires: ['ColorFixer'],
    forbids: ['Distorted', 'CraftedColorWeapon'],
    vi: "[Lò Rèn Bản Mệnh Color] Trưởng xưởng rèn của một Workshop cổ xưa đích thân tìm đến văn phòng của bạn: “Danh hiệu Color của ngài đã vang dội, nhưng ngài vẫn chưa có một vũ khí mang chính sắc diện linh hồn mình. Hãy để xưởng rèn của chúng tôi khắc tên ngài vào lịch sử.”",
    en: "[Signature Color Forge] A master artisan from an ancient Workshop calls upon your office: “Your Color title echoes across districts, yet you lack a weapon forged in the likeness of your soul. Let our fires engrave your name into history.”",
    choices: [
      {
        labelVi: "Chi 80 Ahn và cung cấp mẫu phôi Singularity để đúc vũ khí tối thượng",
        labelEn: "Spend 80 Ahn and provide Singularity ore to forge your supreme armament",
        costAhn: 80,
        flagsAdd: ['CraftedColorWeapon'],
        effects: { rep: +28, merit: +20, health: -10, heat: +10 },
        resultVi: "Sau bảy ngày trích máu hòa vào lò lửa áp suất cao, một thanh vũ khí mang ánh hào quang sắc Màu độc nhất của bạn ra lò. Cầm nó trong tay, uy lực của bạn tăng gấp bội nhưng sát khí cũng thu hút thêm vô số kẻ địch.",
        resultEn: "After seven days tempering high-pressure fires with your own blood, a masterpiece glowing with your signature Color emerges. Your lethality surges, alongside the scrutiny of every rival in the City."
      },
      {
        labelVi: "Từ chối vì thanh kiếm cũ đã thấm đẫm đủ máu và ký ức của cuộc đời bạn",
        labelEn: "Refuse, for your old blade has already absorbed enough blood and memories",
        effects: { sanity: +18, resonance: +16 },
        resultVi: "Bạn lau nhẹ thanh kiếm đã sứt mẻ bên hông. Với một chiến binh thực thụ, vũ khí mạnh nhất là thứ đã cùng mình đi qua sinh tử.",
        resultEn: "You gently wipe the nicked steel at your hip. For a true combatant, the deadliest steel is the one that weathered death with you."
      }
    ]
  },

  // ------------------------------------------------------------------ 8. Backstreets Aegis
  {
    id: 'color_arc_backstreets_aegis',
    repeatable: true,
    age: [27, 85],
    major: true,
    weight: 70,
    jobs: ['Color Fixer'],
    requires: ['ColorFixer'],
    forbids: ['Distorted'],
    vi: "[Tấm Khiên Phố Ngầm] Một liên minh Syndicate tàn bạo phối hợp với toán cướp có vũ trang chuẩn bị thảm sát một khu chợ Backstreets để thu gom nội tạng. Hàng trăm người già và trẻ nhỏ kêu khóc trong đêm tối, không có bất kỳ hiệp hội Fixer nào nhận can thiệp vì không có tiền cọc.",
    en: "[Aegis of the Backstreets] A brutal Syndicate alliance marches to slaughter a Backstreet market for organs. Hundreds of elders and children weep in the dark; no Fixer office moves without a retainer.",
    choices: [
      {
        labelVi: "Đứng sừng sững ở đầu cầu, một nhát chém vạch ra ranh giới sinh tử",
        labelEn: "Stand upon the bridge, drawing a lethal boundary line with one strike",
        checkTrait: 'vigor',
        effects: { health: -16, rep: +28, merit: +18, resonance: +12, heat: +14 },
        resultVi: "Cả đoàn quân Syndicate khựng lại khi nhìn thấy bóng hình của Color dưới ánh đèn đường. Bọn chúng vứt vũ khí bỏ chạy tán loạn nhưng thề sẽ báo thù; cả khu chợ sống sót trong nước mắt cảm tạ.",
        resultEn: "The entire syndicate host halts upon recognizing the Color’s silhouette. They scatter into the dark swearing vengeance, while the whole quarter survives in grateful tears."
      },
      {
        labelVi: "Bỏ qua vì một Color Fixer không nên can thiệp vào vòng xoay bạo lực tự nhiên của Phố Ngầm",
        labelEn: "Walk away, for a Color Fixer should not interfere with the City’s natural violence",
        effects: { sanity: -15, rep: -10 },
        resultVi: "Tiếng la hét tắt dần phía sau lưng bạn khi màn đêm buông xuống. The City vẫn là The City, tàn nhẫn và lạnh lùng.",
        resultEn: "The screams fade behind you as night descends. The City remains the City, ruthless and uncaring."
      }
    ]
  },

  // ------------------------------------------------------------------ 9. Transmitting the Color Mantle
  {
    id: 'color_arc_legacy_transmission',
    repeatable: false,
    age: [45, 95],
    major: true,
    weight: 85,
    jobs: ['Color Fixer'],
    requires: ['ColorFixer'],
    forbids: ['Distorted', 'TransmittedColorMantle'],
    vi: "[Trao Lại Sắc Lệnh Màu] Nhìn lại những vết sẹo khắp cơ thể và mái tóc đã pha sương, bạn hiểu rằng ngọn lửa của một đời người không thể cháy mãi. Các đồ đệ và đồng nghiệp trẻ tuổi đứng quây quần trong văn phòng, chờ đợi quyết định truyền thừa của một huyền thoại.",
    en: "[Passing the Color Mantle] Looking upon your scars and graying hair, you understand that no mortal flame burns forever. Your disciples and young peers gather in the office, awaiting a legend’s succession decree.",
    choices: [
      {
        labelVi: "Trao lại thanh kiếm và con dấu Color cho đồ đệ xuất sắc nhất",
        labelEn: "Bestow your blade and Color seal upon your foremost disciple",
        flagsAdd: ['TransmittedColorMantle'],
        effects: { sanity: +30, rep: +20 },
        resultVi: "Đứa đệ tử run rẩy đón nhận thanh kiếm với đôi mắt rực lửa quyết tâm. Di sản của bạn sẽ tiếp tục bảo vệ The City qua thế hệ tiếp theo.",
        resultEn: "The disciple receives the blade with trembling hands and fiery determination. Your legacy will guard the City across the next generation."
      },
      {
        labelVi: "Khuyên các đồ đệ tự bước đi và tự tìm ra Màu Sắc của riêng chính họ",
        labelEn: "Urge your disciples to walk their own paths and forge their own Colors",
        effects: { sanity: +25, resonance: +20 },
        resultVi: "Bạn mỉm cười xoa đầu từng đứa trẻ. Mỗi sinh mệnh ở The City đều xứng đáng có một câu chuyện riêng, thay vì chỉ là cái bóng của tiền nhân.",
        resultEn: "You smile and pat each student’s shoulder. Every life in the City deserves its own chronicle, not merely the shadow of an ancestor."
      }
    ]
  }
];
