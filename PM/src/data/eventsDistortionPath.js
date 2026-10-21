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
    vi: '[Vầng Thái Dương của Carmen] Bạn không còn cảm thấy cái lạnh thấu xương của Backstreets hay mùi khói nồng nặc của The City nữa. Bạn đang đứng giữa một biển hoa trắng ngút ngàn, dưới vầng thái dương ấm áp. Người phụ nữ tóc nâu Carmen khẽ chạm vào má bạn: "Hãy để mọi cảm xúc bùng cháy đi, đừng kìm nén nữa..."',
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
    vi: '[Mê Cung Bất Tận: Lãnh Địa Biến Dị] Sự hiện diện của bạn đã thay đổi cấu trúc vật lý của cả một góc Backstreets. Những tòa nhà biến thành phím đàn khổng lồ hoặc những mê cung gai thép rỉ sét. Kẻ nào lạc vào đây đều nghe thấy tiếng gào khóc trong tâm trí bạn.',
    en: '[The Infinite Labyrinth: Distortion Domain] Your presence permanently warps the physics of the Backstreets sector. Tenements twist into colossal iron instruments or barbed lattices. All who wander within hear the eternal cadence of your anguish.',
    choices: [
      {
        labelVi: 'Hòa tan ý thức vào lãnh địa, trở thành chúa tể bóng tối',
        labelEn: 'Melt your consciousness into the domain, becoming its absolute sovereign',
        resultVi: 'Bạn không còn cần ăn uống hay thở nữa. Bạn là một phần của The City, một vết thương không bao giờ lành do Carmen gieo rắc.',
        resultEn: 'You no longer require sustenance or breath. You are part of The City itself — an unhealing wound sown by Carmen.',
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
    vi: '[Tín Đồ Của Nỗi Thống Khổ · Giáo Phái Biến Dị] Xung quanh lãnh địa của bạn, hàng trăm con người tuyệt vọng từ Backstreets — những kẻ bị Wing ruồng bỏ, bị Syndicate siết nợ — quỳ rạp dưới chân bạn. Họ tôn sùng cơ thể biến dị và tiếng gầm của bạn như thánh ca của một vị thần mới.',
    en: '[Disciples of Anguish · Cult of the Warped] Around your domain, hundreds of destitute alley dwellers — cast out by Wings, hounded by Syndicates — prostrate themselves before you. They worship your warped form and tortured shrieks as the gospel of a new messiah.',
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
    vi: '[Móng Vuốt Phán Quyết Của The Head · Serum W Enforcer] Một vết rách không gian màu lục thẫm xé toạc bầu trời đêm: Một Claw (Móng Vuốt của A Corp) giáng xuống lãnh địa của bạn. Với ba ống tiêm Serum K, R, và W lấp lánh trên găng tay móng vuốt kim loại, sinh vật chấp pháp tối thượng này cất giọng trầm đục: "Sinh vật biến dị, ngươi đã làm nhiễu loạn trật tự The City. Lệnh thanh tẩy bắt đầu."',
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
    need: { jobs: ['Distortion'] },
    forbids: ['distort_companion_done'],
    vi: '[Cuộc Gặp Gỡ Đẫm Lệ Dưới Lốt Quái Vật] Trong một con hẻm hoang tàn, một bóng người quen thuộc chặn trước mặt bạn: Đó là người bạn cũ từ thuở nhỏ. Nhìn thấy cơ thể quái dị đầy gai nhọn và đôi mắt biến đổi của bạn, người ấy run rẩy giơ thanh kiếm cùn lên, nước mắt lưng tròng: "Có phải bạn không? Tại sao bạn lại trở thành thứ quái vật gớm ghiếc này?"',
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
    vi: '[Cộng Hưởng Abnormality Dưới Lòng Đất · Tiếng Vọng Cogito] Sâu dưới lớp nhựa đường của con hẻm, bạn cảm nhận được tần số tâm linh của một Dị Thể (Abnormality) đang say ngủ từ tàn tích của Lobotomy Corporation. Những xúc tu hoặc cơ quan biến dị trên cơ thể bạn rung lên bần bật theo từng nhịp đập của nó.',
    en: '[Subterranean Abnormality Communion · Cogito Resonances] Deep beneath the alley asphalt, you sense the psychic wavelength of a dormant Abnormality from Lobotomy Corporation ruins. Your mutated tendrils and warped carapace vibrate in synchronization with its subterranean heartbeat.',
    choices: [
      {
        labelVi: 'Hòa quyện ý thức của bản thân vào tần số dị thể, hấp thụ một phần khái niệm kinh hoàng',
        labelEn: 'Harmonize your consciousness with the Abnormality, assimilating its terror concept',
        resultVi: 'Một luồng năng lượng hoang dại trào dâng trong huyết quản dị biến của bạn! Hình thái méo mó của bạn tiến hóa thêm một tầng gai góc và uy lực, khiến không khí xung quanh lạnh toát.',
        resultEn: 'A surge of feral concept flooded your warped veins! Your mutated form evolved another layer of razor chitin and spatial dread, plunging the temperature below freezing.',
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
        resultVi: 'Sóng xung kích biến dị bẻ cong các xích phong tỏa như cành củi khô. Vị đội trưởng Hana văng vào tường đá hộc máu, buộc toán Fixer phải thu quân rút lui trong kinh hoàng. Danh tiếng của bạn chấn động khắp giới Fixer!',
        resultEn: 'Your psychic eruption snapped suppression chains like dry twigs. The Hana captain was hurled against the masonry, forcing a frantic retreat. Your legend struck terror across the Association!',
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
    vi: '[Mở Rộng Lãnh Địa Biến Dị · Sân Khấu Ký Ức] Nỗi đau khổ và uất ức tích tụ suốt cả đời bạn tràn ra ngoài thực tại. Một bán kính 300 mét quanh bạn biến thành một Sân Khấu Ký Ức siêu thực: Tường gạch biến thành những phím đàn piano khổng lồ phát ra giai điệu rỉ máu của cuộc đời bạn.',
    en: '[Distortion Domain Expansion · Theatre of Memory] A lifetime of unhealed agony spills into physical reality. A 300-meter radius warps into a surreal Theatre of Memory: Brick walls morph into colossal piano keys chiming arterial melodies of your past.',
    choices: [
      {
        labelVi: 'Tấu lên bản giao hưởng cuộc đời, biến nỗi đau thành vũ khí tuyệt đối',
        labelEn: 'Play the grand symphony of your life, converting past suffering into lethal cadence',
        resultVi: 'Mỗi nốt nhạc giáng xuống cắt đứt không gian và đánh bại bất kỳ kẻ nào dám xâm phạm lãnh địa. Cả khu vực trở thành thánh địa bất khả xâm phạm dưới sự thống trị của bạn!',
        resultEn: 'Each resounding chord severed spatial planes, repelling all intruders. The ward solidified into your sovereign, untouchable sanctuary!',
        meritAdd: 35,
        effects: { rep: +50, resonance: +35, health: +25, sanity: +20 }
      },
      {
        labelVi: 'Thu nhỏ lãnh địa vào bên trong trái tim, giữ kín sân khấu ký ức cho riêng mình',
        labelEn: 'Fold the domain inwards into your chest, keeping the theater of memory private',
        resultVi: 'Không gian trở lại bình thường nhưng cơ thể bạn đặc quánh lại thành một bức tượng bất hoại. Bạn làm chủ hoàn toàn bản ngã méo mó mà không bị mất kiểm soát.',
        resultEn: 'Pavements straightened, but your inner form condensed into unyielding armor. You achieved absolute mastery over your warped ego without succumbing to frenzy.',
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
    vi: '[Con Mắt Giám Sát Của The Head · The Beholder] Một con mắt khổng lồ phát sáng lơ lửng trên tầng mây ô nhiễm phía trên hang ổ của bạn. Một Beholder của A Corp đang ghi nhận xem dạng biến dị của bạn có vượt qua ranh giới "Phi Nhân Loại" (Non-human impurity) để ban bố lệnh cử Claw xuống tiêu diệt hay không.',
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
    vi: '[Lời Thầm Thì Của Carmen · Sự Giải Thoát Thuần Khiết] Giữa tâm bão của sự điên loạn, giọng nói dịu dàng quen thuộc vang lên trong ánh hào quang màu đỏ ấm áp. Carmen xuất hiện trong tâm thức bạn: "Hãy nhìn ngươi xem. Ngươi không còn phải ép mình vừa vặn với cỗ máy vô hồn của The City nữa. Đây mới chính là hình hài chân thật nhất của tình yêu và khao khát trong ngươi."',
    en: '[Carmen’s Final Solace · Unbound Efflorescence] At the eye of the psychic storm, a soothing voice echoes within warm crimson light. Carmen embraces your mind: "Look at you. You no longer break your bones to fit their callous City machine. This is the truest, most beautiful form of your heart’s desire."',
    choices: [
      {
        labelVi: 'Mỉm cười đón nhận sự thật, biến thành một tồn tại thần thoại của The City',
        labelEn: 'Embrace the solar truth with a smile, ascending into City myth',
        resultVi: 'Cơn đau biến mất hoàn toàn, nhường chỗ cho sự thanh thản tuyệt đối. Bạn không còn là một con quái vật đau khổ, mà là một sinh linh tự do tự tại sống đúng với bản ngã tận cùng của mình.',
        resultEn: 'All agony vanished into sublime serenity. You were no longer a pitiable beast, but a transcendent sovereign living in absolute truth to your soul.',
        meritAdd: 40,
        effects: { sanity: +45, resonance: +40, health: +30, rep: +50 }
      },
      {
        labelVi: 'Rơi một giọt nước mắt con người cuối cùng, giữ lại ký ức về thuở ban đầu',
        labelEn: 'Shed a single final human tear, preserving the memory of who you once were',
        resultVi: 'Giọt nước mắt rơi xuống vỡ tan như pha lê. Bạn giữ lại được mảnh ký ức thiêng liêng nhất về những người bạn từng yêu thương, trở thành một quái vật mang trái tim hoài niệm.',
        resultEn: 'The tear shattered like crystal upon the cobbles. You preserved the sacred memory of those you once cherished — a beast holding an eternal, nostalgic human heart.',
        meritAdd: 35,
        effects: { sanity: +35, resonance: +25, rep: +35 }
      }
    ]
  }
];
