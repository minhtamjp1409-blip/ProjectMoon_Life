/**
 * Project Moon - Distortion Metamorphosis, Carmen Communion & Suppression Path
 * Governs the terrifying journey of a character who surrendered to Carmen's voice.
 * Strictly decoupled from standard human Fixer contracts.
 */

export const DISTORTION_PATH_EVENTS = [
  {
    id: 'distort_carmen_communion_1',
    age: [18, 99],
    major: true,
    weight: 95,
    requires: ['Distorted'],
    forbids: ['carmen_dialogue_done'],
    vi: "[Carmen gọi] Mùi khói Backstreets biến mất. Bạn đứng giữa hoa trắng, nghe Carmen nói: \"Đừng kìm cảm xúc nữa.\" Khi cúi nhìn, chân bạn vẫn chạm nền đường cũ.",
    en: '[Carmen’s Radiant Sun] You no longer feel the biting chill of the Backstreets or the stench of urban smog. You stand amidst an endless field of white blossoms beneath a warm sun. Carmen gently touches your cheek: "Let your emotions burn freely, do not hold them back..."',
    choices: [
      {
        labelVi: 'Dang rộng đôi tay, đón nhận hoàn toàn hình thái dị thể mới',
        labelEn: 'Open your arms, fully embrace your monstrous metamorphosis',
        resultVi: 'Xương cốt bạn gãy răng rắc rồi mọc dài ra thành những cấu trúc kim loại và pha lê lấp lánh. Cơ thể bạn trở thành một tác phẩm nghệ thuật kinh dị, gieo rắc nỗi kinh hoàng cho bất kỳ ai dám nhìn vào.',
        resultEn: 'Bones shattered and reformed into elongated crystal-alloy spines. Your form blossomed into a terrifying masterpiece, radiating existential dread.',
        flagsAdd: ['carmen_dialogue_done', 'DistortionStage2'],
        effects: { health: +50, sanity: -30, rep: +40, resonance: +40 }
      },
      {
        labelVi: 'Gào thét đòi lại những gì The City đã cướp mất từ bạn',
        labelEn: 'Howl against the City that stripped everything away from you',
        resultVi: 'Tiếng thét của bạn làm vỡ vụn cửa kính của ba dãy nhà xung quanh. Carmen mỉm cười dịu dàng rồi tan biến vào luồng sáng chói lòa.',
        resultEn: 'Your shriek shattered every window across three city blocks. Carmen smiled softly and dissolved into blinding luminescence.',
        flagsAdd: ['carmen_dialogue_done', 'DistortionStage2'],
        effects: { health: +40, sanity: -20, heat: +50, resonance: +35 }
      }
    ]
  },
  {
    id: 'distort_suppression_wave_1',
    age: [19, 99],
    major: true,
    weight: 85,
    requires: ['Distorted', 'DistortionStage2'],
    forbids: ['wave1_survived'],
    vi: '[Lệnh Thanh Trừng: Biệt đội Fixer Grade 4] Tiếng còi báo động rền rĩ khắp khu phố. Hana Association đã ban bố lệnh thanh trừng khẩn cấp cấp độ Urban Plague. Bốn Fixer Grade 4 trang bị súng chống dị thể bao vây tòa nhà bạn đang cư ngụ.',
    en: '[Suppression Order: Grade 4 Strike Team] Sirens scream across the sector. Hana Association issues an Urban Plague suppression directive. Four veteran Grade 4 Fixers armed with anti-distortion artillery surround your lair.',
    choices: [
      {
        labelVi: 'Xé toạc vòng vây, biến vũ khí của chúng thành tàn tro',
        labelEn: 'Tear through their perimeter, reducing their weaponry to slag',
        resultVi: 'Móng vuốt kim loại và luồng sóng cảm xúc của bạn nghiền nát khiên chắn của chúng. Cả bốn Fixer bỏ mạng trong vũng máu. Hana nâng mức cảnh báo của bạn lên Urban Nightmare.',
        resultEn: 'Your alloy claws and psychic resonance pulverized their defensive barriers. All four Fixers lay ruined. Hana elevates your bounty to Urban Nightmare.',
        flagsAdd: ['wave1_survived', 'DistortionNightmare'],
        effects: { health: -25, heat: +60, rep: +50, resonance: +30 }
      }
    ]
  },
  {
    id: 'distort_manifest_domain',
    age: [20, 99],
    major: true,
    weight: 80,
    requires: ['Distorted', 'DistortionNightmare'],
    forbids: ['domain_manifested'],
    vi: "[Lãnh địa] Sự hiện diện của bạn đã đổi cả một góc Backstreets. Những tòa nhà dựng lên như phím đàn khổng lồ hoặc rối vào nhau thành mê cung gai thép. Ai lạc vào đây cũng nghe thấy tiếng bạn khóc trong đầu mình.",
    en: "[A Domain] Your presence has remade a corner of the Backstreets. Buildings rise like the keys of a giant instrument or knot together into a maze of barbed steel. Anyone who wanders in hears you weeping inside their own head.",
    choices: [
      {
        labelVi: "Hòa ý thức vào lãnh địa và để nó thành thân thể mới của bạn",
        labelEn: "Let your mind sink into the domain and make it your new body",
        resultVi: "Bạn không còn cần ăn hay thở. Bạn là một phần của The City, một vết thương không lành mà Carmen đã gieo.",
        resultEn: "You no longer need to eat or breathe. You are part of The City, an unhealing wound that Carmen sowed.",
        flagsAdd: ['domain_manifested', 'DistortionStar'],
        effects: { health: +60, sanity: -40, rep: +60, resonance: +45 }
      }
    ]
  },
  {
    id: 'distort_climax_color_faceoff',
    age: [22, 99],
    major: true,
    weight: 90,
    requires: ['Distorted', 'DistortionStar'],
    forbids: ['distort_color_clash_done'],
    vi: '[Đại Chiến Đỉnh Cao: Color Fixer Hạ Phàm] Một bóng hình khoác áo choàng đơn độc bước qua màn sương lãnh địa của bạn. Khí tức tỏa ra sắc lạnh và áp đảo đến mức không gian xung quanh đóng băng. Một Color Fixer do Hana Association đích thân phái tới để kết thúc thảm họa mang tên bạn.',
    en: '[Apex Cataclysm: Descent of the Color Fixer] A solitary cloaked figure strides through your domain’s mist. The radiating aura is so chilling and absolute that warped space freezes solid. A Color Fixer, dispatched in person by the Hana Directorate, arrives to terminate your existence.',
    choices: [
      {
        labelVi: 'Bùng nổ khúc ca diệt vong: Chiến đấu đến hơi thở cuối cùng vì sự tự do của bản ngã',
        labelEn: 'Unleash your apocalyptic dirge: Fight to your dying breath for sovereign ego',
        resultVi: 'Trận chiến xé toạc bầu trời đêm The City. Bạn đánh gãy một phần vũ khí của Color Fixer trước khi trái tim dị thể của bạn ngừng đập. Tên tuổi của bạn sẽ mãi mãi được ghi vào hồ sơ tuyệt mật của Hana Association như một Ngôi sao Đen tối bất tử.',
        resultEn: 'The duel tore open the nocturnal firmament. You shattered part of the Color’s relic before your warped core finally shattered. Your name is etched into Hana’s classified archives as an immortal Sovereign Dark Star.',
        flagsAdd: ['distort_color_clash_done'],
        effects: { health: -100 } // Tragic heroic climax death
      },
      {
        labelVi: 'Cộng hưởng nghịch đảo cực hạn: Giáng một đòn xé rách không gian rồi thoái lui vào bóng tối',
        labelEn: 'Extreme inverted resonance: Unleash a void-rending blow and withdraw into the abyss',
        resultVi: 'Sóng xung kích dị thể va chạm với tuyệt kỹ của Color Fixer, tạo ra một hố đen nuốt chửng cả quảng trường. Bị thương nặng nhưng bạn đẩy lùi được Color Fixer và biến mất vào cõi mộng của Carmen. Bạn trở thành một Huyền thoại Dị thể Sống sót (Apex Calamity) mà toàn The City phải khiếp sợ.',
        resultEn: 'Distorted shockwaves clashed with the Color’s apex art, carving a spatial sinkhole through the plaza. Gravely wounded yet triumphant, you repelled the Color Fixer and dissolved into Carmen’s dreamscape as a living Apex Calamity.',
        flagsAdd: ['distort_color_clash_done', 'ApexDistortionSurvivor', 'StarOfTheCityEntity'],
        meritAdd: 60,
        effects: { health: -55, rep: +100, resonance: +50, heat: +80 }
      }
    ]
  },
  {
    id: 'distort_gathering_twisted_flock',
    age: [21, 95],
    major: true,
    weight: 65,
    requires: ['Distorted', 'DistortionStage2'],
    forbids: ['distort_flock_done'],
    vi: '[Tín Đồ Của Nỗi Thống Khổ · Giáo Phái Biến Dị] Xung quanh lãnh địa của bạn, hàng trăm con người tuyệt vọng từ Backstreets, những kẻ bị Wing ruồng bỏ, bị Syndicate siết nợ, quỳ rạp dưới chân bạn. Họ tôn sùng cơ thể biến dị và tiếng gầm của bạn như thánh ca của một vị thần mới.',
    en: '[Disciples of Anguish · Cult of the Warped] Around your domain, hundreds of destitute alley dwellers, cast out by Wings, hounded by Syndicates, prostrate themselves before you. They worship your warped form and tortured shrieks as the gospel of a new messiah.',
    choices: [
      {
        labelVi: 'Thu nhận họ vào vòng tay biến dị, ban phát một phần sức mạnh của Carmen',
        labelEn: 'Embrace them into your fold, imparting a fraction of Carmen’s sovereign flame',
        resultVi: 'Cả giáo phái đồng loạt thức tỉnh những biến đổi kỳ dị trên da thịt. Họ trở thành những người hầu cận cuồng nhiệt bảo vệ lãnh địa của bạn trước mọi đợt thanh trừng từ các Văn phòng Fixer.',
        resultEn: 'The entire congregation sprouted aberrant bio-armature. They became ferocious zealots safeguarding your sanctum against encroaching Fixer squads.',
        meritAdd: 30,
        flagsAdd: ['distort_flock_done', 'DistortionCultLeader'],
        effects: { rep: +45, resonance: +35, sanity: -15, network: +30 }
      },
      {
        labelVi: 'Gào thét xua đuổi họ: "Hãy giữ lấy nhân tính của các ngươi, đừng đi vào con đường này!"',
        labelEn: 'Howl to drive them away: "Cling to your humanity, do not tread this path of ruin!"',
        resultVi: 'Tiếng thét dữ dội của bạn làm đám đông hoảng sợ bỏ chạy. Bạn chấp nhận cô độc tuyệt đối trong bóng tối để bảo vệ họ khỏi sự tha hóa. Trái tim bạn vẫn còn lại một đóa hoa nhân tính ấm áp.',
        resultEn: 'Your terrifying shriek scattered the flock in panic. You chose utter solitude to shield them from the fall. In the deepest chamber of your aberration, a warm flower of human conscience bloomed.',
        meritAdd: 25,
        flagsAdd: ['distort_flock_done'],
        effects: { sanity: +20, resonance: +25, heat: -10 }
      }
    ]
  },
  {
    id: 'distort_head_claw_interception',
    age: [24, 99],
    major: true,
    weight: 75,
    requires: ['Distorted', 'DistortionNightmare'],
    forbids: ['distort_claw_clash_done'],
    vi: "[The Claw đến] Một Claw của C Corp đáp xuống gần bạn, ba ống Serum trên găng tay đã sáng. \"Distortion. Lệnh xử lý bắt đầu.\" Con đường sau lưng trống, nhưng hắn đứng chắn lối về.",
    en: '[Claw of The Head · Serum W Enforcer] An emerald spatial tear cleaves the night sky: A Claw of A Corp touches down within your domain. Wielding tri-colored injectors of Serum K, R, and W upon colossal talons, the apex enforcer rumbles: "Aberrant creature, you have disrupted City balance. Liquidation commences."',
    choices: [
      {
        labelVi: 'Vung móng vuốt dị thể nghênh chiến Serum W trong một trận quyết đấu long trời',
        labelEn: 'Clash talons against Serum W in a titan duel that shatters the earth',
        resultVi: 'Móng vuốt của bạn xé rách lớp giáp của Claw ngay khi mũi tiêm Serum R đâm xuyên qua vai bạn. Hai bên lùi lại sau một đòn va chạm hủy diệt. Nhận thấy sự ngoan cường phi thường của bạn, Claw kích hoạt dịch chuyển thoái lui để báo cáo cho A Corp.',
        resultEn: 'Your talons gouged the Claw’s plating just as his Serum R injector impaled your shoulder. Both retreated from the cataclysmic impact. Recognizing your terrifying resilience, the Claw warped back to file an A Corp report.',
        flagsAdd: ['distort_claw_clash_done', 'ClawSurvivor'],
        meritAdd: 55,
        effects: { health: -45, rep: +80, resonance: +45, heat: +50 }
      },
      {
        labelVi: 'Dẫn dụ Claw vào mê cung lãnh địa, kích nổ bẫy không gian để tẩu thoát',
        labelEn: 'Bait the Claw into your spatial labyrinth, detonating terrain traps to slip away',
        resultVi: 'Mê cung biến dị sụp đổ chôn vùi lối đi của Claw trong vài giây quý giá. Bạn biến mất vào dòng chảy ngầm của The City, chứng minh trí tuệ vượt trội ngay cả trong hình hài quái vật.',
        resultEn: 'Your warped domain collapsed, entombing the Claw’s vector for precious seconds. You melted into the City’s subterranean currents, proving cunning intellect even in monstrous flesh.',
        flagsAdd: ['distort_claw_clash_done'],
        meritAdd: 40,
        effects: { sanity: +15, rep: +50, heat: +30, resonance: +30 }
      }
    ]
  },

  {
    id: 'distort_former_companion_encounter',
    age: [20, 80],
    major: true,
    weight: 65,
    need: { jobs: ['Distortion'], npc: 'friend' },
    forbids: ['distort_companion_done'],
    vi: "[Người quen cũ] Bạn thuở nhỏ chặn đầu hẻm, tay cầm thanh kiếm cùn. Người ấy nhìn những chiếc gai trên người bạn, hỏi: \"Có thật là cậu không?\" Lưỡi kiếm run, nhưng chưa hạ xuống.",
    en: '[Tearful Encounter in Aberrant Flesh] In a derelict alley, a familiar silhouette blocks your path: Your childhood friend. Beholding your thorned carapace and dilated eyes, they raise a trembling blade, weeping: "Is that really you? Why did you let yourself become this horror?"',
    choices: [
      {
        labelVi: 'Kìm nén cơn khát máu, quay lưng bỏ chạy vào màn đêm để bảo vệ bạn mình',
        labelEn: 'Suppress predatory thirst, fleeing into the dark to spare them',
        resultVi: 'Bạn rít lên một tiếng đau đớn, cào móng vuốt vào vách tường đá rồi lẩn sâu vào bóng tối Backstreets. Một giọt nước mắt nóng hổi lăn trên khuôn mặt méo mó của bạn. Bạn vẫn giữ được một mảnh hồn người.',
        resultEn: 'Howling in anguish, you raked your talons across the masonry and dissolved into the pitch. A single warm tear rolled down your chitinous cheek. A fragment of your soul remained human.',
        effects: { sanity: +12, resonance: +20, heat: +15 },
        meritAdd: 20,
        flagsAdd: ['distort_companion_done'],
        recordsAdd: ['distortion_spared_companion']
      },
      {
        labelVi: 'Buông thả bản năng săn mồi cuồng nộ, lao tới nuốt chửng ký ức quá khứ',
        labelEn: 'Unleash feral predatory fury, devouring the past without mercy',
        resultVi: 'Máu tươi nhuộm đỏ bức tường hẻm. Khi cơn cuồng sát đi qua, bạn đứng trên thi thể người bạn cũ. Không còn ai trên đời này nhớ bạn từng là ai. Sức mạnh của bạn tăng vọt tột cùng.',
        resultEn: 'Crimson washed the alley walls. When the frenzy abated, you stood over their carcass. None remained alive who recalled your mortal name. Your monstrous calamity peaked.',
        effects: { health: +35, sanity: -35, rep: +50, heat: +40 },
        meritAdd: 30,
        flagsAdd: ['distort_companion_done'],
        scarsAdd: ['Bàn tay vấy máu người bạn cũ']
      }
    ]
  },
  {
    id: 'distort_star_of_city_rampage',
    age: [22, 90],
    major: true,
    weight: 70,
    need: { jobs: ['Distortion'] },
    forbids: ['distort_star_rampage_done'],
    vi: '[Cơn Thịnh Nộ Star of the City · Biến Dị Tối Thượng] Sự méo mó trong tâm trí bạn đạt tới đỉnh điểm. Cả một khu phố xung quanh biến đổi thành sân khấu của riêng bạn: Đất đá uốn lượn, bầu trời rực đỏ như mắt Carmen. Ba đội Fixer Grade 1 cùng dàn pháo kích của Hana bao vây phong tỏa toàn bộ khu vực.',
    en: '[Star of the City Calamity · Apex Distortion] Your psychic corrosion reaches singularity. The entire ward warps into your personal theatre: Pavement bends, skies scorch crimson like Carmen’s gaze. Three Grade 1 strike cells and Hana artillery quarantine the perimeter.',
    choices: [
      {
        labelVi: 'Gầm vang tiếng thét hủy diệt, nghênh chiến toàn bộ Fixer của Hana',
        labelEn: 'Roar in cataclysmic fury, waging war against the entire City',
        resultVi: 'Trận chiến long trời lở đất san phẳng năm dãy nhà. Bạn chém gãy hàng chục vũ khí Workshop và đẩy lùi đợt vây hãm của Hana. Tên quái vật của bạn chính thức được khắc lên danh sách Star of the City.',
        resultEn: 'A titanic clash flattened five city blocks. Snapping dozens of Workshop arms, you broke Hana’s containment grid. Your moniker was etched into the Star of the City archives.',
        effects: { health: -30, rep: +100, heat: +50, resonance: +40 },
        meritAdd: 50,
        flagsAdd: ['distort_star_rampage_done', 'StarOfTheCityEntity']
      }
    ]
  },

  // =========================================================================
  // DEEP DISTORTION ENCOUNTERS: RESONANCE, LAIRS & CARMEN'S CONVERGENCE
  // =========================================================================
  {
    id: 'distort_abnormality_resonance_communion',
    age: [19, 90],
    major: true,
    weight: 48,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Tiếng vọng dưới đường] Một Abnormality ngủ trong tàn tích Lobotomy Corporation bên dưới con hẻm. Cơ thể biến dạng của bạn rung theo nhịp đập của nó. Nắp cống dưới chân bắt đầu chuyển động.",
    en: '[Subterranean Abnormality Communion · Cogito Resonances] Deep beneath the alley asphalt, you sense the psychic wavelength of a dormant Abnormality from Lobotomy Corporation ruins. Your mutated tendrils and warped carapace vibrate in synchronization with its subterranean heartbeat.',
    choices: [
      {
        labelVi: 'Hòa quyện ý thức của bản thân vào tần số dị thể, hấp thụ một phần khái niệm kinh hoàng',
        labelEn: 'Harmonize your consciousness with the Abnormality, assimilating its terror concept',
        resultVi: 'Một luồng năng lượng hoang dại trào dâng trong huyết quản dị biến của bạn. Hình thái méo mó của bạn tiến hóa thêm một tầng gai góc và uy lực, khiến không khí xung quanh lạnh toát.',
        resultEn: 'A surge of feral concept flooded your warped veins. Your mutated form evolved another layer of razor chitin and spatial dread, plunging the temperature below freezing.',
        meritAdd: 28,
        effects: { rep: +35, resonance: +30, health: +20, sanity: -8 }
      },
      {
        labelVi: 'Gầm gừ áp chế nguồn ô nhiễm ngoại lai, bảo tồn bản ngã biến dị thuần khiết của chính mình',
        labelEn: 'Roar in defiance, purging foreign infection to preserve your pure individual distortion',
        resultVi: 'Bạn đập tan sự can thiệp từ dị thể bên dưới. Ý chí cá nhân biến dị của bạn trở nên vững chắc như kim cương, bất khả xâm phạm.',
        resultEn: 'You repelled the alien intrusive ego. Your twisted individual identity solidified like diamond, impervious to outside psychic tampering.',
        meritAdd: 22,
        effects: { sanity: +20, resonance: +15, health: +10 }
      }
    ]
  },
  {
    id: 'distort_backstreet_children_lullaby',
    age: [19, 85],
    major: true,
    weight: 46,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: '[Khúc Hát Ru Của Quái Vật · Lũ Trẻ Backstreets] Giữa đêm đông lạnh giá, một nhóm trẻ em mồ côi Backstreets rón rén tụ tập quanh hang ổ đổ nát của bạn. Thay vì sợ hãi, chúng bị mê hoặc bởi những nốt nhạc u sầu phát ra từ các cơ quan biến dị của bạn và xem bạn như một vị thần bảo hộ bóng đêm.',
    en: '[The Monster’s Lullaby · Backstreet Orphans] In the bitter winter midnight, shivering orphans gather near the entrance of your ruined lair. Instead of fleeing, they listen entranced to the mournful chimes echoing from your warped appendages, mistaking you for a dark guardian spirit.',
    choices: [
      {
        labelVi: 'Phát ra những giai điệu êm dịu, che chở lũ trẻ khỏi đàn Sweeper đi săn lúc 3 giờ sáng',
        labelEn: 'Chime a soothing harmonic hum, shielding the children from the 3:13 AM Sweeper patrol',
        resultVi: 'Khi tiếng còi Sweeper vang lên, bóng tối biến dị của bạn bao bọc lấy lũ trẻ. Lũ Sweeper không dám bén mảng tới gần lãnh địa của bạn. Lũ trẻ nép vào bạn ngủ say, mang lại một thoáng ấm áp hiếm hoi cho tâm hồn méo mó.',
        resultEn: 'As the Sweeper sirens wailed, your shadowy domain engulfed the children. Sweepers steered clear of your apex lair. The children slept peacefully against your chitin, granting a rare, tender warmth.',
        meritAdd: 30,
        effects: { sanity: +35, rep: +20, health: +15 }
      },
      {
        labelVi: 'Gầm lên một tiếng rùng rợn xua đuổi chúng chạy về nơi an toàn',
        labelEn: 'Roar with terrifying ferocity, driving them toward safe Nest refugee sectors',
        resultVi: 'Lũ trẻ sợ hãi bỏ chạy nhưng kịp trốn vào khu trại cứu trợ an toàn của Hiệp hội Zwei trước giờ giới nghiêm. Bạn đứng một mình trong bóng tối cô đơn, hoàn thành sự cứu rỗi tàn nhẫn.',
        resultEn: 'Terrified, the children fled directly into a fortified Zwei refugee enclave before curfew. You remained alone in the darkness, having enacted cruel salvation.',
        meritAdd: 20,
        effects: { sanity: +15, resonance: +12 }
      }
    ]
  },
  {
    id: 'distort_hana_suppression_squad',
    age: [21, 90],
    major: true,
    weight: 48,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: '[Biệt Đội Trấn Áp Hana Section 2] Ba Fixer tinh nhuệ của Hana Section 2 mang theo lồng phong tỏa cộng hưởng và dây xích triệt tiêu năng lượng bao vây lãnh địa của bạn. Họ tuyên đọc án lệnh thanh trừng một hiểm họa cấp Đô Thị.',
    en: '[Hana Section 2 Suppression Cell] Three elite Fixers from Hana Section 2 bearing resonance damper cages and suppression anchors cordon your territory. They read aloud the extermination writ for an Urban Calamity anomaly.',
    choices: [
      {
        labelVi: 'Bùng nổ làn sóng biến dị toàn diện, đánh vỡ lồng giam và phản sát đội trưởng',
        labelEn: 'Detonate a total psychic shockwave, shattering the containment cage and felling the captain',
        resultVi: 'Sóng xung kích biến dị bẻ cong các xích phong tỏa như cành củi khô. Vị đội trưởng Hana văng vào tường đá hộc máu, buộc toán Fixer phải thu quân rút lui trong kinh hoàng. Danh tiếng của bạn chấn động khắp giới Fixer.',
        resultEn: 'Your psychic eruption snapped suppression chains like dry twigs. The Hana captain was hurled against the masonry, forcing a frantic retreat. Your legend struck terror across the Association.',
        meritAdd: 32,
        effects: { health: -18, rep: +45, heat: +25, resonance: +25 }
      },
      {
        labelVi: 'Hòa mình vào sương mù Backstreets, đánh lừa hệ thống radar truy quét rồi biến mất',
        labelEn: 'Dissolve into Backstreet smog, spoofing their biometric radars and vanishing',
        resultVi: 'Hệ thống định vị của Hana hoàn toàn mất dấu bạn. Bạn chuyển địa bàn săn mồi sang một phân khu khác một cách an toàn.',
        resultEn: 'Hana’s trackers struck static. You relocated your hunting domain into a fresh district, completely undetected.',
        meritAdd: 22,
        effects: { rep: +20, sanity: +12, heat: -15 }
      }
    ]
  },
  {
    id: 'distort_domain_expansion_theater',
    age: [23, 90],
    major: true,
    weight: 45,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Sân khấu ký ức] Nỗi đau tích tụ cả đời bạn tràn ra thực tại. Trong bán kính ba trăm mét quanh bạn, tường gạch hóa thành phím đàn piano khổng lồ, và mỗi phím vang lên một đoạn đời của bạn.",
    en: "[The Theater of Memory] The pain you have stored up all your life spills into reality. In a three-hundred-meter radius around you, brick walls turn into giant piano keys, and each key sounds a piece of your life.",
    choices: [
      {
        labelVi: "Chơi bản nhạc của cả cuộc đời bạn và biến nỗi đau thành vũ khí",
        labelEn: "Play the song of your whole life and turn the pain into a weapon",
        resultVi: "Mỗi nốt nhạc cắt qua không khí và đẩy lui bất cứ kẻ nào bước vào. Cả khu trở thành nơi không ai dám tới gần, và bạn là thứ nằm ở giữa nó.",
        resultEn: "Every note cuts through the air and drives back whoever steps in. The whole area becomes a place nobody dares approach, and you are what sits at its center.",
        meritAdd: 35,
        effects: { rep: +50, resonance: +35, health: +25, sanity: +20 }
      },
      {
        labelVi: "Thu lãnh địa vào trong ngực và giữ sân khấu ký ức cho riêng mình",
        labelEn: "Fold the domain back into your chest and keep the theater of memory to yourself",
        resultVi: "Mặt đường thẳng lại, nhưng cơ thể bạn đặc lại như áo giáp. Bạn giữ được cái bản ngã méo mó của mình mà không để nó giữ lại bạn.",
        resultEn: "The pavement straightens, but your body thickens like armor. You keep your twisted self without letting it keep you.",
        meritAdd: 28,
        effects: { sanity: +30, health: +20, resonance: +20 }
      }
    ]
  },
  {
    id: 'distort_head_beholder_observation',
    age: [25, 95],
    major: true,
    weight: 42,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Beholder quan sát] Ánh mắt của Beholder quét qua hang ổ bạn. Dạng biến dị này đã lọt vào hồ sơ của The Head; một lệnh xử lý có thể theo sau. Tia sáng dừng lại ngay trên người bạn.",
    en: '[Gaze of the Head · The Beholder] A titanic luminous eye suspends high in the smog above your lair. A Beholder of A Corp observes, evaluating whether your aberrant form has crossed the threshold of Non-Human Impurity to warrant Claw deployment.',
    choices: [
      {
        labelVi: 'Ngẩng đầu nhìn thẳng vào con mắt, khẳng định bản ngã con người sâu sắc nhất của mình',
        labelEn: 'Gaze directly into the ocular abyss, asserting your profound human core',
        resultVi: 'Con mắt khổng lồ chớp nhẹ. Dù hình thù dị dạng, khát vọng và nỗi đau của bạn thuần khiết là của loài người. Con mắt thu nhỏ lại rồi biến mất. The Head thừa nhận sự tồn tại của bạn trong The City.',
        resultEn: 'The colossal eye blinked slowly. Monster as you were, your yearning and torment were undeniably human. The aperture closed and dissolved. The Head tolerated your existence in The City.',
        meritAdd: 35,
        effects: { rep: +60, sanity: +25, resonance: +30, heat: -20 }
      },
      {
        labelVi: 'Gầm thét phóng thích toàn bộ hắc khí biến dị, che khuất tầm nhìn của con mắt',
        labelEn: 'Erupt in a black cloud of distortion ichor, blinding the celestial eye',
        resultVi: 'Màn khói đen che kín bầu trời quận trong ba ngày ba đêm. Con mắt rút lui nhưng độ chú ý của The Head đối với bạn tăng vọt.',
        resultEn: 'Obsidian smog blanketed the ward for three days and nights. The eye withdrew, but the Head’s scrutiny upon your name escalated sharply.',
        meritAdd: 25,
        effects: { rep: +40, heat: +30, resonance: +25 }
      }
    ]
  },
  {
    id: 'distort_carmen_final_solace',
    age: [28, 100],
    major: true,
    weight: 45,
    allowDistorted: true,
    need: { jobs: ['Distortion'] },
    vi: "[Lời Carmen] Giữa cơn hỗn loạn, Carmen cất tiếng trong đầu bạn: \"Ngươi đã mệt vì phải giữ một hình hài vừa mắt The City. Buông tay đi.\" Giọng nói dịu xuống, chờ câu trả lời.",
    en: "[Carmen’s Voice] In the middle of the chaos Carmen speaks inside your head: “You are tired of holding a shape that suits The City. Let go.” The voice softens and waits for an answer.",
    choices: [
      {
        labelVi: "Mỉm cười chấp nhận và trở thành một huyền thoại của The City",
        labelEn: "Smile, accept, and become a legend of The City",
        resultVi: "Cơn đau biến mất, nhường chỗ cho một sự yên lặng mà bạn không nhớ đã từng có. Bạn không còn là con quái vật đau khổ nữa, mà là một sinh linh sống đúng với phần sâu nhất của mình.",
        resultEn: "The pain disappears and leaves a quiet you do not remember ever having. You are no longer a suffering monster but a being who lives by the deepest part of itself.",
        meritAdd: 40,
        effects: { sanity: +45, resonance: +40, health: +30, rep: +50 }
      },
      {
        labelVi: "Rơi một giọt nước mắt cuối cùng và giữ lại ký ức về lúc ban đầu",
        labelEn: "Shed one last tear and keep the memory of how you began",
        resultVi: "Giọt nước mắt rơi xuống và vỡ như pha lê trên mặt đá. Bạn giữ lại mảnh ký ức quý nhất về những người từng yêu mình, và trở thành một con quái vật vẫn còn nhớ.",
        resultEn: "The tear falls and shatters like crystal on the cobbles. You keep the most precious memory of the people who once loved you, and become a monster that still remembers.",
        meritAdd: 35,
        effects: { sanity: +35, resonance: +25, rep: +35 }
      }
    ]
  }
];
