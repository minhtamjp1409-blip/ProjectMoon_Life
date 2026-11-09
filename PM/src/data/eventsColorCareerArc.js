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
    vi: "[Văn Phòng Riêng Của Color] Khi danh hiệu Color Fixer vừa được công bố, giới môi giới và nhà đầu tư kéo đến đứng chật hành lang khu trọ của bạn. Họ mang theo hợp đồng thuê dài hạn cùng séc bảo chứng của ngân hàng Nest: “Một Color không thể nhận việc ngoài quán nước mãi. Xin ngài chọn chỗ treo biển hiệu.”",
    en: "[Signature Color Office] With your Color Title recognized, brokers and patrons swarm your lodging with certified bank drafts: “A Color cannot take contracts from a street corner. Please raise your own shingle.”",
    choices: [
      {
        labelVi: "Dựng biển hiệu ở Backstreets District 23, mở cửa nhận việc từ dân nghèo",
        labelEn: "Spend 60 Ahn to raise your sign in Backstreets District 23, taking contracts from the desperate",
        costAhn: 60,
        flagsAdd: ['OwnColorOffice', 'BackstreetOffice'],
        effects: { rep: +25, network: +20, sanity: +15 },
        resultVi: "Biển hiệu mang màu của bạn treo lên đầu con hẻm. Người ở Backstreets biết có một cửa văn phòng không đuổi họ về khi túi nhẹ tiền.",
        resultEn: "Your Color emblem hangs over the alley entrance. From this day forward, the people of the Backstreets know where to turn when the City turns away."
      },
      {
        labelVi: "Thuê tầng thượng cao ốc Nest, ký hợp đồng cố vấn với Wing",
        labelEn: "Spend 90 Ahn for a Nest high-rise penthouse, entering a strategic partnership with the Wing",
        costAhn: 90,
        flagsAdd: ['OwnColorOffice', 'NestOffice'],
        effects: { rep: +35, wealth: +40, merit: +15 },
        resultVi: "Văn phòng mới nhìn xuống toàn cảnh Nest qua lớp kính chống đạn. Thư ký riêng và các Fixer Grade 1 xếp hàng ngoài sảnh chờ bạn duyệt hồ sơ.",
        resultEn: "Your new office overlooks the entire Nest behind reinforced glass. A personal staff and Grade 1 Fixers wait outside to serve under your banner."
      },
      {
        labelVi: "Từ chối mọi lời mời, giữ lối làm việc độc hành không thuộc về ai",
        labelEn: "Refuse all offers, keeping only your blade and walking as an unchained wanderer",
        effects: { sanity: +25, resonance: +15 },
        resultVi: "Bạn bước qua đám môi giới ngoài hành lang mà không ký tờ giấy nào. Không văn phòng, không sổ sách, không ai biết ngày mai bạn ở Quận mấy.",
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
    vi: "[Hợp Đồng Cấp Màu · Star of the City] Một thực thể cấp Star of the City vừa phá khu thí nghiệm cũ và nuốt chửng ba dãy phố công nghiệp. Mười Office Grade 1 đi đợt đầu đã mất liên lạc trong đêm. Hana Association chuyển chỉ thị đỏ thẳng tới thiết bị của bạn.",
    en: "[Color Directive · Star of the City] Hana sounds the citywide alarm. A Star of the City entity broke from an old facility, swallowing three industrial blocks. Ten Grade 1 offices were wiped out in one night. Hana sends a scarlet directive straight to you.",
    choices: [
      {
        labelVi: "Một mình tiến vào vùng sương đỏ để chém vỡ lõi thực thể",
        labelEn: "Charge alone, cutting through the crimson mist with your bare blade",
        checkTrait: 'vigor',
        outcomes: [
          {
            w: 65,
            effects: { health: -22, sanity: -14, rep: +30, merit: +28, wealth: +45 },
            scarsAdd: ['Chiến tích Star of the City'],
            resultVi: "Lưỡi vũ khí của bạn chém vỡ lõi thực thể giữa khu xưởng sập. Khi sương tan, đội thu dọn của Hana đứng ngoài hàng rào chỉ lặng lẽ cúi đầu khi bạn bước ra.",
            resultEn: "Your weapon shatters the core in a deafening thunderclap. When the mist clears, you stand over the ruin holding the core. The entire City falls silent before the Color’s might."
          },
          {
            w: 35,
            effects: { health: -36, sanity: -22, rep: +14, merit: +12, wealth: +24 },
            scarsAdd: ['Vết rách từ lõi Star of the City'],
            resultVi: "Thực thể phát nổ ngay lúc vỡ lõi, tạt luồng chất ăn mòn xuyên qua áo giáp của bạn. Bạn nộp đủ mẫu vật cho Hana nhưng phải nằm viện nhiều tuần.",
            resultEn: "The entity detonated the instant its core split, driving a corrosive wave through your armor. You fulfilled the directive, yet paid in blood and weeks of recovery."
          }
        ]
      },
      {
        labelVi: "Phối hợp với các Section của Hiệp Hội khóa vòng vây từ bốn phía",
        labelEn: "Coordinate with the Hana delegation and Association sections to encircle the beast",
        checkTrait: 'nerve',
        effects: { health: -12, sanity: -10, rep: +22, merit: +22, wealth: +32 },
        resultVi: "Vòng vây khép lại đúng giờ đã hẹn. Đòn dứt điểm của bạn hạ gục mục tiêu trước khi nó tràn sang khu dân cư, còn tiền thưởng chia theo tỷ lệ đóng góp.",
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
    vi: "[Chiến Tranh Tập Đoàn Wing] Hai Wing đối địch chuẩn bị đánh ngầm để giành một bằng sáng chế Singularity. Cả hai bên đều cử giám đốc mang vali chứa bốn mươi tám Ahn tới cửa nhà bạn, muốn thuê bạn ra mặt ở tuyến đầu.",
    en: "[Corporate Proxy War] Two rival Wings prepare for an underground war over a Singularity patent. Both send executive directors with briefcases of 48 Ahn to your door, begging you to serve as their decisive deterrent.",
    choices: [
      {
        labelVi: "Nhận lời bên trả giá cao hơn, đánh sập tuyến phòng thủ đối phương",
        labelEn: "Sign with the higher bidder and crush the opposing strike force",
        outcomes: [
          {
            w: 70,
            effects: { wealth: +48, rep: +14, heat: +18, sanity: -14, health: -14 },
            resultVi: "Cuộc giao tranh kết thúc mười lăm phút sau khi bạn vào trận. Wing thuê bạn thâu tóm toàn bộ phòng thí nghiệm, còn tập đoàn thua cuộc ghi tên bạn vào sổ đen.",
            resultEn: "The battle ends fifteen minutes after you step onto the front. The hiring Wing secures the lab, while the defeated corporation inscribes your name onto its retaliation ledger."
          },
          {
            w: 30,
            effects: { wealth: +24, health: -28, sanity: -18, heat: +24 },
            scarsAdd: ['Dư chấn vũ khí Singularity cấp Wing'],
            resultVi: "Đối phương kích nổ mẫu vũ khí Singularity thử nghiệm ngay khi bạn áp sát. Bạn bước ra khỏi đám cháy với nửa số tiền cọc và vết bỏng sâu.",
            resultEn: "The opposing force detonated an experimental Singularity prototype as you closed in. You walked out of the inferno with half the retainer and a smoldering wound."
          }
        ]
      },
      {
        labelVi: "Từ chối cả hai bên, giữ thế trung lập của Color độc lập",
        labelEn: "Refuse both sides, asserting the neutrality of an independent Color",
        effects: { rep: +18, sanity: +14, resonance: +10, heat: +8 },
        resultVi: "Bạn đóng cửa trước cả hai chiếc vali. Không bên nào dám nổ súng trước vì sợ bạn ngả về phía kia, dù mật vụ của họ vẫn rình quanh khu phố.",
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
    vi: "[Ánh Mắt Kẻ Quan Sát] Trong quán trà vắng ở Backstreets, một Beholder của B Corp ngồi xuống bàn đối diện từ lúc nào. Ống kính cơ khí xoay nhẹ, quét qua nhịp mạch và vết sẹo của bạn: “Mức ảnh hưởng của ngươi đã chạm ranh giới giám sát. The Head đang nhìn ngươi.”",
    en: "[Gaze of the Beholder] In a deserted Backstreet teahouse, a Beholder from B Corp sits across from you. Its omniscient mechanical lens hums silently, scanning your pulse, scars, and energy field: “A Color’s strength borders on disrupting urban order. The Head is watching you.”",
    choices: [
      {
        labelVi: "Điềm tĩnh rót một chén trà đẩy sang phía đối diện",
        labelEn: "Calmly pour a cup of tea for the watcher without showing a trace of fear",
        checkTrait: 'nerve',
        effects: { sanity: +18, resonance: +15, rep: +15 },
        resultVi: "Beholder nhìn chén trà bốc khói rồi gật đầu: “Mạch đập không đổi. Hãy nhớ ranh giới của mình trong The City.” Khi bạn chớp mắt, ghế đối diện đã trống không.",
        resultEn: "The Beholder regards the steaming tea and nods faintly: “A steady mind. Remember your place in the City’s design.” The figure dissolves into thin air."
      },
      {
        labelVi: "Đặt tay lên chuôi vũ khí, nhìn thẳng vào ống kính của hắn",
        labelEn: "Rest your hand on your hilt, reminding the watcher that no one threatens you",
        effects: { rep: +25, heat: +20, taboo: +1 },
        resultVi: "Chén trà trên bàn rung nhẹ. Beholder ghi một dòng mã vào thiết bị rồi biến mất; từ hôm đó bạn biết mình luôn nằm trong tầm ngắm của The Eye.",
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
    vi: "[Truyền Thừa Môn Đệ] Một thiếu niên Backstreets từng thấy bạn giao chiến đứng đợi suốt ba ngày dưới mưa bụi trước cửa văn phòng. Hai bàn tay nó băng vải rách, mắt nhìn thẳng vào bạn: “Xin ngài dạy tôi cách cầm vũ khí.”",
    en: "[Mentoring a Disciple] A Backstreet youth who witnessed your legendary strike has knelt before your office gate for three days and nights through acid rain: “Please teach me how to hold steel.”",
    choices: [
      {
        labelVi: "Nhận làm học trò, dạy từ cách cầm vũ khí và giữ nhịp thở",
        labelEn: "Accept the youth as your sworn disciple, training their blade and spirit",
        effects: { sanity: +15, rep: +15, wealth: -15 },
        flagsAdd: ['MentoringColorDisciple'],
        resultVi: "Bạn mở cửa cho đứa trẻ vào sảnh và ném cho nó thanh kiếm tập bằng gỗ. Văn phòng từ hôm đó có thêm tiếng bước chân tập luyện mỗi sáng.",
        resultEn: "You raise the youth up and hand them their first wooden practice sword. From this day, your flame has an heir in the City."
      },
      {
        labelVi: "Đưa một túi Ahn và bảo nó đi học nghề khác",
        labelEn: "Press a pouch of Ahn into their hands and urge them away from bloodshed",
        effects: { rep: +10, wealth: -12, sanity: +10 },
        resultVi: "Đứa trẻ cầm túi tiền, cúi đầu chào rồi lặng lẽ đi khuất cuối con hẻm. Ít nhất có một người không bước vào nghề này vì bạn.",
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
    vi: "[So Kiếm Giữa Hai Color] Một bức thư gắn sáp đỏ nằm trên bàn làm việc. Một Color Fixer khác hẹn bạn ra ngọn đồi phế tích ngoài Outskirts lúc chạng vạng: “Lâu rồi chưa gặp ai có đường đao gọn như vậy ở The City. Ra uống một chén rồi thử với nhau vài chục hiệp.”",
    en: "[Clash of Colors: Duel of Legends] A red-waxed letter arrives. Another renowned Color invites you to an Outskirts ruin hill at dusk: “It has been too long since I saw a blade this sharp in the City. Let us share a drink and exchange a hundred strikes.”",
    choices: [
      {
        labelVi: "Tới điểm hẹn, rút vũ khí so chiêu đến khi trời sáng",
        labelEn: "Arrive at dusk and cross blades for a hundred passes until sunrise",
        checkTrait: 'vigor',
        outcomes: [
          {
            w: 65,
            effects: { health: -18, rep: +26, merit: +22, sanity: +14 },
            scarsAdd: ['Vết kiếm của Color đối địch'],
            resultVi: "Hai lưỡi vũ khí va nhau làm gãy đổ hàng cột đá cũ ngoài phế tích. Khi trời hửng sáng, cả hai thu đao vào vỏ và ngồi chia nhau bình rượu còn nửa.",
            resultEn: "The shockwaves of two Colors tear open the night and level ancient stone pillars. The duel closes with the roaring laughter of two peerless masters."
          },
          {
            w: 35,
            effects: { health: -32, sanity: -8, rep: +12, merit: +10 },
            scarsAdd: ['Thương tích từ tuyệt kỹ của Color'],
            resultVi: "Ở hiệp cuối, đòn chém của đối phương rạch sâu qua sườn bạn trước khi hai thanh vũ khí cùng nứt. Bạn giữ được thế đứng nhưng phải nghỉ dưỡng thương hàng tháng.",
            resultEn: "On the ninety-ninth pass, your rival’s signature technique carved across your ribs before both blades shattered. You upheld your honor, yet needed months to mend."
          }
        ]
      },
      {
        labelVi: "Ngồi lại bên đống lửa, uống cạn bình rượu rồi trò chuyện tới khuya",
        labelEn: "Sit by the fire, finish the spirits, and discuss the toll of supreme power",
        effects: { sanity: +22, network: +16, resonance: +12, rep: -4 },
        resultVi: "Hai người ngồi tựa lưng vào tảng đá vỡ dưới bầu trời xám bụi. Đêm đó không ai rút vũ khí; những kẻ bám theo rình xem từ xa đành lủi thủi quay về.",
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
    vi: "[Lò Rèn Bản Mệnh Color] Thợ cả bên Workshop lâu đời tìm tới văn phòng bạn: “Danh hiệu Color của ngài đã có, nhưng vũ khí đang dùng vẫn là hàng đúc sẵn theo lô. Hãy để xưởng chúng tôi rèn một thanh vừa khít với tay ngài.”",
    en: "[Signature Color Forge] A master artisan from an ancient Workshop calls upon your office: “Your Color title echoes across districts, yet you lack a weapon forged in the likeness of your soul. Let our fires engrave your name into history.”",
    choices: [
      {
        labelVi: "Đặt xưởng rèn đúc vũ khí riêng theo đúng lối đánh của bạn",
        labelEn: "Spend 80 Ahn for the forge to cast a signature weapon fitted to how you fight",
        costAhn: 80,
        flagsAdd: ['CraftedColorWeapon'],
        itemAdd: 'wpn_color_signature',
        effects: { rep: +28, merit: +20, health: -10, heat: +10 },
        resultVi: "Sau bảy ngày canh lò áp suất cao, một thanh vũ khí mang dấu ấn riêng của bạn ra lò. Cầm nó trên tay, đòn đánh gọn hơn hẳn nhưng cũng dễ bị nhận diện từ xa.",
        resultEn: "After seven days tempering high-pressure fires with your own blood, a masterpiece glowing with your signature Color emerges. Your lethality surges, alongside the scrutiny of every rival in the City."
      },
      {
        labelVi: "Từ chối vì thanh kiếm cũ đã quen tay qua bao trận",
        labelEn: "Refuse, for your old blade has already absorbed enough blood and memories",
        effects: { sanity: +18, resonance: +16 },
        resultVi: "Bạn lau nhẹ lưỡi kiếm sứt mẻ bên hông. Thứ vũ khí đáng tin nhất vẫn là thứ đã cùng mình sống sót qua ngần ấy năm.",
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
    vi: "[Tấm Khiên Phố Ngầm] Một liên minh Syndicate phối hợp với toán cướp vũ trang chuẩn bị tràn vào một khu chợ Backstreets để thu gom nội tạng. Không có Office nào nhận can thiệp vì người dân ở đây không đủ tiền đặt cọc.",
    en: "[Aegis of the Backstreets] A brutal Syndicate alliance marches to slaughter a Backstreet market for organs. Hundreds of elders and children weep in the dark; no Fixer office moves without a retainer.",
    choices: [
      {
        labelVi: "Đứng chắn ở đầu cầu, chém một nhát vạch ranh giới cấm bước qua",
        labelEn: "Stand upon the bridge, drawing a lethal boundary line with one strike",
        checkTrait: 'vigor',
        effects: { health: -16, rep: +28, merit: +18, resonance: +12, heat: +14 },
        resultVi: "Toán quân Syndicate khựng lại khi nhận ra bóng dáng một Color dưới đèn đường. Chúng rút lui vào bóng tối, còn khu chợ giữ được mạng qua đêm nay.",
        resultEn: "The entire syndicate host halts upon recognizing the Color’s silhouette. They scatter into the dark swearing vengeance, while the whole quarter survives in grateful tears."
      },
      {
        labelVi: "Quay lưng bỏ đi vì không có hợp đồng nào trả cho việc này",
        labelEn: "Walk away, for a Color Fixer should not interfere with the City’s natural violence",
        effects: { sanity: -15, rep: -10 },
        resultVi: "Tiếng la hét tắt dần phía sau lưng bạn khi màn đêm buông xuống. The City vẫn vận hành theo đúng quy luật của nó.",
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
    vi: "[Trao Lại Sắc Lệnh Màu] Nhìn lại những vết sẹo khắp người và mái tóc đã bạc, bạn biết mình không thể cầm vũ khí mãi. Các học trò và đàn em trẻ tuổi đứng chờ trong văn phòng, đợi bạn chọn người kế thừa danh hiệu.",
    en: "[Passing the Color Mantle] Looking upon your scars and graying hair, you understand that no mortal flame burns forever. Your disciples and young peers gather in the office, awaiting a legend’s succession decree.",
    choices: [
      {
        labelVi: "Trao lại thanh kiếm và con dấu Color cho học trò giỏi nhất",
        labelEn: "Bestow your blade and Color seal upon your foremost disciple",
        flagsAdd: ['TransmittedColorMantle'],
        effects: { sanity: +30, rep: +20 },
        resultVi: "Người học trò nhận lấy thanh kiếm bằng hai tay. Từ ngày mai, danh hiệu của bạn sẽ tiếp tục xuất hiện trên bảng nhiệm vụ của Hana.",
        resultEn: "The disciple receives the blade with trembling hands and fiery determination. Your legacy will guard the City across the next generation."
      },
      {
        labelVi: "Khuyên các học trò tự đi con đường riêng và tìm danh hiệu của mình",
        labelEn: "Urge your disciples to walk their own paths and forge their own Colors",
        effects: { sanity: +25, resonance: +20 },
        resultVi: "Bạn vỗ vai từng người trước khi giải tán văn phòng. Họ không cần sống dưới cái bóng của Color đời trước.",
        resultEn: "You smile and pat each student’s shoulder. Every life in the City deserves its own chronicle, not merely the shadow of an ancestor."
      }
    ]
  }
];
