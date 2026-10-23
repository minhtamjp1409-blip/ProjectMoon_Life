/**
 * Project Moon - Derivative & Fan-Favorite Lore Chronicles
 * Inspired by Distortion Detective, Leviathan, WonderLab, Library of Ruina Workshop expansions,
 * Bloodfiend Kindred, and Backstreets legendary side stories.
 * Written with authentic Project Moon dystopian obsidian prose.
 */

export const DERIVATIVE_LORE_EVENTS = [
  // =========================================================================
  // 1. DISTORTION DETECTIVE (MOSES & EZRA'S INVESTIGATION)
  // =========================================================================
  {
    id: 'dd_pipe_smoke_investigation',
    age: [19, 65],
    major: true,
    weight: 12,
    requires: [],
    forbids: ['Distorted', 'dd_investigation_done'],
    vi: "[Ống tẩu chỉ đường] Moses đến cùng Ezra, gõ tẩu lên bàn bạn. Khói bạc không bay lên mà trườn về bức tường phía sau. \"Ở đây có thứ gì đang méo đi,\" Moses nói. \"Bạn nghe thấy nó chưa?\"",
    en: '[Distortion Detective Agency] A dry rap at the door at midnight. An older woman with clouded blind eyes steps inside, smoking a silver pipe exhaling bone-chilling smoke (Moses), shadowed by a burly young assistant with heavy goggles carrying a colossal workshop hammer (Ezra). Moses taps her pipe: "This alley stinks of twisted egos. My smoke drifts straight behind your walls. Tell me, what voice have you been hearing?"',
    choices: [
      {
        labelVi: 'Thành thật mô tả âm thanh đàn piano và vầng thái dương của Carmen',
        labelEn: 'Describe the broken piano notes and Carmen’s solar whispers honestly',
        resultVi: 'Moses nhả một ngụm khói dày bao bọc lấy bạn, làm dịu đi những vết nứt trong tâm trí. Ezra dúi vào tay bạn một lọ thuốc an thần của xưởng YuRia: "Uống đi bạn tôi! Lần sau nghe thấy tiếng đàn bà thầm thì thì bịt tai lại ngay!" Bạn lấy lại được sự tỉnh táo và kết giao với Văn phòng Thám tử.',
        resultEn: 'Moses exhaled a thick cloud that wrapped around you, calming the fissures in your psyche. Ezra shoved a YuRia Workshop sedative phial into your coat: "Drink up, pal! Next time a lady whispers from the sun, plug your ears!" You stabilized your sanity and gained a rare connection.',
        effects: { sanity: +35, resonance: +15, network: +18 },
        flagsAdd: ['dd_investigation_done', 'MosesSmokeBlessing'],
        recordsAdd: ['distortion_detective_ally'],
        meritAdd: 10
      },
      {
        labelVi: 'Cảnh giác rút vũ khí, từ chối chia sẻ bí mật của bản thân',
        labelEn: 'Draw your weapon warily, refusing to divulge inner vulnerabilities',
        resultVi: 'Cây chùy của Ezra nện xuống sàn nhà làm rung chuyển cả gian phòng trong tích tắc. Moses xua tay ngăn trợ lý: "Một kẻ tự ôm lấy sự tha hóa của chính mình. Khi bạn vỡ vụn thành quái vật, đừng trách chúng tôi không báo trước." Họ rời đi, để lại bạn trong sự cô lập rợn ngợp.',
        resultEn: 'Ezra’s hammer slammed the floorboards, shaking the room in a microsecond. Moses waved her off: "Another fool cradling their own corrosion. When you shatter into an aberration, don’t say we didn’t warn you." They departed, leaving you in chilling isolation.',
        effects: { sanity: -15, heat: +12, rep: +10 },
        flagsAdd: ['dd_investigation_done'],
        recordsAdd: ['distortion_detective_clash'],
        meritAdd: 8
      }
    ]
  },

  // =========================================================================
  // 2. BLADE LINEAGE: TO CLAIM THEIR BONES
  // =========================================================================
  {
    id: 'bl_claim_their_bones_oath',
    age: [18, 60],
    major: true,
    weight: 11,
    need: { jobs: ['Fixer', 'Syndicate'] },
    forbids: ['Distorted', 'blade_lineage_sworn', 'kurokumo_tattooed'],
    vi: "[Bài học của Kim] Bamboo-hatted Kim lau máu khỏi đao, bên cạnh là xác người Kurokumo. \"Muốn lấy xương đối thủ, trước hết phải dám nhận lưỡi kiếm của hắn.\" Ông đưa bạn một thanh đao tập.",
    en: '[To Claim Their Bones · Blade Lineage] Amid a blood-soaked Backstreet alley, a lone swordsman in a frayed bamboo hat (Bamboo-hatted Kim) wipes a curved blade stained with Kurokumo ichor. Without turning, he speaks: "Cutting flesh is simple. But yielding your flesh so you may crush their bone is the swordsman’s true path. Dare you let your skin tear to sever their marrow?"',
    choices: [
      {
        labelVi: 'Quỳ xuống xin lĩnh hội tuyệt kỹ "To Claim Their Bones"',
        labelEn: 'Kneel and swear fealty to master "To Claim Their Bones"',
        resultVi: 'Lưỡi đao của vị đại kiếm sư vung lên như tia chớp, rạch một vết sâu trên ngực bạn làm minh chứng nhập môn. Cơn đau thấu xương đánh thức ngọn lửa kiếm đạo kiên định. Bạn trở thành môn đồ Blade Lineage, nhận kiếm bản mệnh.',
        resultEn: 'The swordsman’s blade flashed like lightning, carving a deep initiation furrow across your chest. The searing agony ignited an unyielding martial clarity. You became an initiate of the Blade Lineage, receiving their ceremonial blade.',
        effects: { health: -18, sanity: +20, rep: +22, resonance: +18 },
        flagsAdd: ['blade_lineage_sworn', 'SwordMastery'],
        scarsAdd: ['Vết kiếm khắc Cốt Nhục Tương Tàn'],
        recordsAdd: ['blade_lineage_initiate'],
        meritAdd: 12,
        scheduleConsequences: [{ eventId: 'csq_kurokumo_retribution', delayYears: 3, reasonVi: 'Kurokumo nhận ra môn đồ Blade Lineage', reasonEn: 'Kurokumo recognized a Blade Lineage disciple' }]
      },
      {
        labelVi: 'Cảnh báo ông ta về quân tiếp viện của Kurokumo rồi rút lui',
        labelEn: 'Warn him of incoming Kurokumo reinforcements and withdraw',
        resultVi: 'Kiếm sĩ nón tre gật đầu nhẹ, ném cho bạn một túi Ahn chiến lợi phẩm thu từ tay chân Kurokumo: "Khôn ngoan để sống sót cũng là một cách sinh tồn ở The City." Ông ta xoay người biến mất vào màn mưa.',
        resultEn: 'The swordsman gave a slight nod, tossing you a pouch of Ahn stripped from Kurokumo ronin: "Prudence to live another dawn is its own survival in this City." He turned and dissolved into the rain.',
        effects: { wealth: +35, rep: +10, sanity: +5 },
        meritAdd: 2
      }
    ]
  },

  // =========================================================================
  // 3. KUROKUMO CLAN: INK & CRIMSON BLEED
  // =========================================================================
  {
    id: 'kurokumo_ink_slash_vendetta',
    age: [18, 58],
    major: true,
    weight: 11,
    need: { jobs: ['Syndicate', 'Fixer'] },
    forbids: ['Distorted', 'kurokumo_tattooed', 'blade_lineage_sworn'],
    vi: "[Mực Hắc Vân] Sayo đặt kim xăm và một lưỡi kiếm trước mặt bạn. \"Gia nhập Kurokumo, ngươi sẽ học cách để vết chém không khép miệng.\" Mực đã pha xong; bà chờ bạn chọn.",
    en: '[Kurokumo Clan Blood Ink] A tatami den reeking of sumi ink and antiseptic. Vice-Captain Sayo, ink-black storm clouds sprawling across bare shoulders, pins you with a predator’s stare: "A Kurokumo blade does not merely sever muscle. It carves wounds that bleed until the victim is hollow. Inscribe our dark clouds upon your flesh, and hunt under our banner."',
    choices: [
      {
        labelVi: 'Chấp nhận nghi thức xăm mực Hắc Vân đầy đau đớn',
        labelEn: 'Endure the agonizing Kurokumo ink tattooing ritual',
        resultVi: 'Kim xăm đâm sâu suốt mười hai canh giờ, đưa độc dược và mực đen thấm vào kinh mạch. Bạn mở mắt với làn da mang hình rồng mây đen, lưỡi đao vung ra mang theo hiệu ứng rỉ máu tàn khốc.',
        resultEn: 'For twelve relentless hours, bone needles pounded venom and sumi ink into your veins. You arose with dark storm dragons undulating across your skin, your blade strikes weeping arterial venom.',
        effects: { health: -15, sanity: -10, rep: +20, heat: +22 },
        flagsAdd: ['kurokumo_tattooed', 'BleedMastery'],
        scarsAdd: ['Hình xăm Hắc Vân triền miên'],
        recordsAdd: ['kurokumo_lieutenant'],
        meritAdd: 10,
        scheduleConsequences: [{ eventId: 'csq_blade_lineage_retribution', delayYears: 3, reasonVi: 'Blade Lineage nhận ra hình xăm Hắc Vân', reasonEn: 'Blade Lineage recognized the dark-cloud tattoo' }]
      },
      {
        labelVi: 'Từ chối dính líu đến tranh chấp giang hồ của các gia tộc',
        labelEn: 'Refuse entanglements in syndicate clan feuds',
        resultVi: 'Sayo hạ mi mắt lạnh lùng: "Một con chuột Backstreets nhát gan. Hãy cầu nguyện đừng bao giờ chạm trán đao thủ Kurokumo trong hẻm tối." Bạn rời khỏi trà quán an toàn nhưng mang theo sự dè chừng.',
        resultEn: 'Sayo’s gaze turned icy: "A craven Backstreet rat. Pray you never cross our blade paths in the dark." You stepped into the rain unscathed, yet watched by shadowed eyes.',
        effects: { rep: -5, sanity: +10 },
        meritAdd: 5
      }
    ]
  },

  // =========================================================================
  // 4. NIGHT IN THE BACKSTREETS: 3:13 AM SWEEPER SOUP
  // =========================================================================
  {
    id: 'sweeper_mother_soup_night',
    age: [14, 75],
    major: true,
    weight: 10,
    forbids: ['Distorted'],
    vi: "[Đêm của Sweepers] Cửa hầm trú kẹt cứng. Sweepers tiến tới từ hai đầu hẻm, móc sắt gõ vào thùng chứa. Kẻ đi đầu dừng trước bạn, lặp từng tiếng: \"Súp... cho gia đình.\"",
    en: '[3:13 AM · Mother’s Sweeper Cauldron] Sirens shriek through the fog: Night in the Backstreets has commenced. Your tenement bulkhead jammed shut. From both ends of the alley, dozens of faceless figures in airtight rubber hazmat suits exhaling rattling hiss through filters (Sweepers) emerge, dragging fluid barrels and butchering hooks. A matriarch Sweeper clinks her hook rhythmically, clicking in synthesized static: "We... brew... soup... for... the... children..."',
    choices: [
      {
        labelVi: 'Dốc toàn lực chiến đấu phá vỡ vòng vây trước 4:34 AM',
        labelEn: 'Fight with ferocious desperation to break out before 4:34 AM',
        resultVi: 'Máu tanh và chất lỏng màu nâu sẫm của Sweeper bắn tung tóe. Bạn cắn răng chịu nhiều vết đâm xuyên giáp, đạp qua đống phế liệu và lao ra đại lộ đúng lúc ánh đèn đường bật sáng trở lại báo hiệu bình minh. Bạn sống sót qua đêm ác mộng.',
        resultEn: 'Sweeper fuel and dark tea-colored fluid splattered the walls. Enduring punctured armor and jagged slashes, you scrambled through wreckage onto the main avenue just as streetlights flared back on at 4:34 AM. You survived the legendary nightmare.',
        effects: { health: -16, sanity: -8, rep: +20, heat: -8 },
        flagsAdd: ['SweeperSurvivor'],
        scarsAdd: ['Vết móc câu Sweeper 3:13 AM'],
        recordsAdd: ['sweeper_night_veteran'],
        meritAdd: 30
      },
      {
        labelVi: 'Dùng lựu đạn khói nhiệt và hy sinh một phần hành lý để tẩu thoát',
        labelEn: 'Deploy thermal smoke canisters and sacrifice gear to flee',
        resultVi: 'Bạn kích nổ hộp cứu hỏa và ném toàn bộ tiền của cùng đồ tiếp tế để đánh lạc hướng bầy Sweeper. Chúng tập trung thu gom các bọc dinh dưỡng, cho phép bạn trèo qua đường ống thông gió trốn thoát.',
        resultEn: 'You detonated a pressurized conduit and flung your rations and purse into the dark. The pack swarmed the organic matter, granting you precious seconds to scale a grease-slick chimney pipe.',
        effects: { wealth: -15, health: -6, sanity: -4 },
        flagsAdd: ['SweeperSurvivor'],
        meritAdd: 15
      }
    ]
  },

  // =========================================================================
  // 5. BLOODFIEND KINDRED: LA MANCHALAND
  // =========================================================================
  {
    id: 'bloodfiend_carnival_pcorp',
    age: [20, 70],
    major: true,
    weight: 10,
    forbids: ['Distorted', 'bloodfiend_met'],
    vi: "[Công viên dưới lòng đất] Bạn lần theo người mất tích tới cổng một công viên ngầm ở District 16. Đu quay vẫn sáng dù các quầy đều vắng. Một con rối khâu bằng da người cúi chào và chìa ra tấm vé còn ấm: \"Khách mới. Vào chơi chứ?\"",
    en: '[La Manchaland] Tracking a missing convoy, you reach the gate of an underground amusement park beneath District 16. The Ferris wheel is lit though every stall is empty. A marionette stitched from human hide bows and holds out a ticket that is still warm: “New guest. Coming in?”',
    choices: [
      {
        labelVi: 'Nhận tấm vé và bước qua cổng',
        labelEn: 'Take the ticket and walk through the gate',
        startDungeon: 'dungeon_bloodfiend_carnival',
        resultVi: 'Tấm vé ấm như vừa rời khỏi tay ai đó. Cánh cổng quay một vòng sau lưng bạn, và bản nhạc kèn bắt đầu lại từ đầu.',
        resultEn: 'The ticket is warm, as if it just left someone’s hand. The turnstile completes a turn behind you, and the organ music starts again from the beginning.',
        flagsAdd: ['bloodfiend_met']
      },
      {
        labelVi: 'Đứng ngoài cổng, nhắn chủ công viên rằng bạn muốn thỏa thuận',
        labelEn: 'Stay outside the gate and send word to the park’s owner that you want to deal',
        resultVi: 'Con rối biến vào bóng tối rồi quay lại với một tấm bùa huyết thạch. Chủ công viên chịu giữ im lặng, miễn là bạn quên con đường dẫn tới đây.',
        resultEn: 'The marionette vanishes into the dark and returns with a bloodstone talisman. The owner will keep quiet as long as you forget the way back here.',
        effects: { wealth: +24, sanity: -10, taboo: +1, resonance: +10 },
        flagsAdd: ['bloodfiend_met', 'BloodfiendContract'],
        recordsAdd: ['bloodfiend_pact'],
        meritAdd: 8
      }
    ]
  },

  // =========================================================================
  // 6. OLD G CORP CHIMERA VETERANS REBELLION
  // =========================================================================
  {
    id: 'smoke_war_veteran_chimeric_rage',
    age: [21, 65],
    major: true,
    weight: 10,
    forbids: ['Distorted', 'gcorp_veteran_helped'],
    vi: "[Cựu binh Smoke War] Một nhóm cựu binh G Corp cũ bị đội săn tiền thưởng dồn vào bãi phế liệu. Người chỉ huy gãy cánh, ôm đứa con nhỏ sau lưng. Ông nhận ra bạn và xin một đường thoát.",
    en: '[Echoes of Smoke War · Old G Corp Veterans] In a rusted scrapyard, you discover mutated veterans bearing beetle carapaces and insect antennae from the Old G Corp Smoke War. A mercenary kill-team from New G Corp has cornered them to incinerate "defective wartime bio-assets." The veteran sergeant with a sheared chitin wing shields a deformed child, pleading for aid.',
    choices: [
      {
        labelVi: 'Rút vũ khí nghênh chiến, bảo vệ các cựu binh bị phản bội',
        labelEn: 'Draw your weapon and stand with the betrayed war veterans',
        resultVi: 'Đạn súng và giáp động năng va chạm dữ dội. Bạn tiêu diệt toán lính đánh thuê. Người cựu binh già run rẩy tháo một cánh tay cơ học cường hóa trọng lực trao tặng bạn trước khi đưa gia đình lẩn trốn vào Outskirts.',
        resultEn: 'Gunfire and kinetic wards shattered the alley. You wiped out the corporate hit-squad. The weeping veteran sergeant unbolted a heavy Gravitational Prosthetic Arm and gifted it to you before fleeing toward the Outskirts.',
        effects: { health: -14, sanity: +12, rep: +16, heat: +14 },
        flagsAdd: ['gcorp_veteran_helped', 'ChimeraSympathizer'],
        recordsAdd: ['smoke_war_savior'],
        meritAdd: 25
      },
      {
        labelVi: 'Đứng ngoài cuộc, không can thiệp vào công việc dọn dẹp của Wing',
        labelEn: 'Stand aside, refusing to interfere with Wing cleanups',
        resultVi: 'Súng phun lửa của toán lính rực sáng trong tiếng gào thét bi thương. Khi mọi thứ chỉ còn là tro tàn xám ngắt, viên chỉ huy ném cho bạn một xấp tiền bịt miệng: "Biết điều đấy, đồ chuột cống."',
        resultEn: 'Flamethrowers roared amidst agonizing shrieks. When only gray ash remained, the corporate officer tossed you a bloodstained bounty envelope: "Smart choice keeping your snout clean, rat."',
        effects: { wealth: +25, sanity: -20, rep: -8 },
        meritAdd: 5
      }
    ]
  },

  // =========================================================================
  // 7. T CORP: STOLEN COLOR CONTRABAND
  // =========================================================================
  {
    id: 'tcorp_stolen_color_contraband',
    age: [18, 70],
    major: true,
    weight: 11,
    need: { regions: ['T', 'Backstreets', 'Nest'] },
    forbids: ['Distorted', 'color_contraband_done'],
    vi: "[Lọ màu lậu] Giữa District 20 xám màu, tay buôn mở rương chì cho bạn xem một lọ màu sắc bị giấu kín. \"Một giọt thôi, mọi thứ sẽ khác.\" Tiếng giày tuần tra vang lên ngoài ngõ.",
    en: '[The Stolen Colors of T Corp] You enter a covert black-market cellar in District 20 (T Corp), where the entire world has been drained of hue into dreary sepia-gray. A contrabandist cracks a lead coffer, revealing a glass flask swirling with vibrant, incandescent iridescent pigment, natural color forbidden under T Corp time-patents. "One drop, and you will see the world in divine brilliance. Interested?"',
    choices: [
      {
        labelVi: 'Chi 20 Ahn mua lọ sắc màu và uống trọn để giải thoát tâm thức',
        labelEn: 'Spend 20 Ahn to purchase and ingest the forbidden iridescent pigment',
        resultVi: 'Thế giới bùng nổ trong sắc đỏ rực rỡ, sắc xanh biếc và ánh vàng chói lọi. Tâm trí bạn như được tái sinh khỏi sự ngột ngạt ngàn cân của The City, giải phóng toàn bộ áp lực tinh thần.',
        resultEn: 'The sepia veil detonated into vivid scarlet, sapphire, and radiant emerald. Your senses rejuvenated from decades of dreary monochromatic oppression, purging mental rot instantly.',
        costAhn: 20,
        effects: { sanity: +40, resonance: +25, heat: +15, taboo: +1 },
        flagsAdd: ['color_contraband_done', 'ColorAwakened'],
        recordsAdd: ['tcorp_color_rebel'],
        meritAdd: 18
      },
      {
        labelVi: 'Báo cáo vị trí ổ buôn lậu cho Time Track Collectors của T Corp',
        labelEn: 'Report the smuggler’s vault to T Corp Time Track Collectors',
        resultVi: 'Các chấp pháp viên T Corp vác máy hút thời gian ập vào phong tỏa hiện trường. Tên buôn lậu bị đóng băng thành tượng đá vĩnh cửu. Bạn được T Corp thưởng một phiếu bù 20 giờ sinh hoạt chất lượng cao.',
        resultEn: 'T Corp Collectors in trenchcoats and vacuum rigs breached the room, instantly siphoning the smuggler’s time into stone stasis. You received a requisition voucher for 20 hours of prime Nest living time.',
        effects: { wealth: +30, rep: +15, sanity: -8, network: +10 },
        flagsAdd: ['color_contraband_done'],
        recordsAdd: ['tcorp_loyalist'],
        meritAdd: 15
      }
    ]
  },

  // =========================================================================
  // 8. W CORP: THE WARP TRAIN CLEANUP SQUAD
  // =========================================================================
  {
    id: 'wcorp_cleaning_crew_amnesia',
    age: [20, 60],
    major: true,
    weight: 10,
    forbids: ['Distorted', 'wcorp_cleaned'],
    vi: "[Ca dọn tàu WARP] W Corp trả hậu hĩnh cho một ca dọn tàu và phát thuốc xóa trí nhớ. Cửa toa mở ra: hành khách không còn ngồi đúng hình dạng của mình. Bạn phải đưa họ về ghế trước khi hệ thống khôi phục khởi động.",
    en: '[WARP Train Cleanup] W Corp pays well for one hour of work and hands out amnestics. The car door opens: the passengers no longer sit in their own shapes. You have to get them back into their seats before the restoration system starts.',
    choices: [
      {
        labelVi: 'Nhận ca, đeo mặt nạ khí và bước vào toa',
        labelEn: 'Take the shift, pull on the rebreather and step into the car',
        startDungeon: 'dungeon_warp_train',
        resultVi: 'Bạn kéo mặt nạ xuống và gài khóa. Cửa toa đóng lại sau lưng với tiếng rít của áp suất, và đồng hồ T Corp trên tường bắt đầu đếm.',
        resultEn: 'You pull the mask down and seat the clasp. The car door seals behind you with a hiss of pressure, and the T Corp clock on the wall begins to count.',
        flagsAdd: ['wcorp_cleaned']
      },
      {
        labelVi: 'Chỉ nhận phần canh cửa ga, đứng ngoài toa chờ nửa công',
        labelEn: 'Take only the platform watch and wait outside for half the pay',
        resultVi: 'Bạn đứng ở sân ga hai mươi phút và nghe tiếng thịt va vào vách thép. Khi cửa mở lại, hành khách bước ra như vừa ngủ gật. Nhân viên W Corp không nhìn bạn.',
        resultEn: 'You stand on the platform for twenty minutes and listen to flesh knocking against steel. When the doors open again, the passengers step out like people who dozed off. The W Corp staff do not look at you.',
        effects: { wealth: +14, sanity: -4 },
        flagsAdd: ['wcorp_cleaned'],
        meritAdd: 5
      }
    ]
  },

  // =========================================================================
  // 9. WONDERLAB: THE ABERRANT SPECIMEN
  // =========================================================================
  {
    id: 'wonderlab_aberrant_specimen',
    age: [18, 65],
    major: true,
    weight: 10,
    forbids: ['Distorted', 'aberration_encountered'],
    vi: "[Mẫu vật WonderLab] Một nhà nghiên cứu chạy vào chỗ trú của bạn, ôm lồng kính chứa bông hoa thủy tinh đang hát. \"Nó thoát khỏi phân viện. Giúp tôi phong ấn, hoặc mang nó ra Outskirts.\" Chốt lồng đã lỏng.",
    en: '[WonderLab · The Aberrant Specimen] A researcher in a torn white lab coat bursts into your sanctuary, clutching a containment capsule. Inside writhes an Aberration, a glass blossom weeping crimson nectar, harmonizing a siren lullaby: "It breached the entire WonderLab branch... please, help me seal it, or smuggle it past the City walls!"',
    choices: [
      {
        labelVi: 'Sử dụng sóng tâm thức và ý chí kiên định để áp chế phong ấn Dị thể',
        labelEn: 'Exert iron mental focus and resonance to force-contain the Aberration',
        resultVi: 'Giai điệu ru ngủ cào xé màng nhĩ của bạn. Bằng ý chí sắt đá, bạn kích hoạt van áp suất của lồng chứa, khóa chặt thực thể. Bạn nhận được vũ khí E.G.O sơ khai từ tinh chất của nó.',
        resultEn: 'The siren melody scraped your sanity like broken glass. Gritting your teeth, you slammed the hydraulic pressure locks shut. The researcher rewarded you with a nascent E.G.O prototype weapon harvested from its core.',
        effects: { sanity: -18, resonance: +25, rep: +15 },
        flagsAdd: ['aberration_encountered', 'EGOSeedAcquired'],
        recordsAdd: ['wonderlab_containment_hero'],
        meritAdd: 22
      },
      {
        labelVi: 'Tiêu diệt nhà khoa học và bán chiếc lồng cho Chợ Đen The Ring',
        labelEn: 'Eliminate the researcher and auction the capsule to The Ring',
        resultVi: 'The Ring trả giá cực cao cho mẫu vật nghệ thuật sống động này. Bạn kiếm được một món hời lớn nhưng để lại một mối họa kinh hoàng tiềm ẩn cho toàn bộ Backstreets.',
        resultEn: 'The Ring Maestro paid an exorbitant sum for the living artistic atrocity. You walked away wealthy, having unleashed a catastrophic biohazard upon the lower alleys.',
        effects: { wealth: +65, sanity: -14, heat: +20, taboo: +1 },
        flagsAdd: ['aberration_encountered'],
        recordsAdd: ['black_market_specimen_dealer'],
        meritAdd: 20
      }
    ]
  },

  // =========================================================================
  // 10. SEVEN ASSOCIATION: DOSSIER 0 ON SINGULARITIES
  // =========================================================================
  {
    id: 'seven_dossier_singularity_leak',
    age: [25, 75],
    major: true,
    weight: 9,
    need: { jobs: ['Fixer', 'Wing Employee'] },
    forbids: ['Distorted', 'seven_dossier_read'],
    vi: "[Hồ sơ của Seven] Trên mái nhà giữa cơn mưa, chuyên viên Seven đưa bạn cặp tài liệu về những Singularity của các Wing. Hana đang tới phong tỏa khu này. \"Đọc ngay, hoặc đốt nó cùng tôi.\"",
    en: "[Seven’s Dossier] On a rooftop in the rain, a Seven analyst hands you a case of documents about the Wings’ Singularities. Hana is on its way to seal the district. “Read it now, or burn it with me.”",
    choices: [
      {
        labelVi: "Đọc hết tập tài liệu và nhìn thẳng vào cái nền của The City",
        labelEn: "Read the whole dossier and look straight at the foundation of The City",
        resultVi: "Sự thật trần trụi làm sụp mọi ảo tưởng bạn từng có. Từ đêm đó bạn không còn sợ một Wing hay một Syndicate nào theo cách cũ, và cũng không còn ngủ như cũ.",
        resultEn: "The plain truth brings down every illusion you had. From that night you no longer fear any Wing or Syndicate the old way, and you no longer sleep the old way either.",
        effects: { sanity: -16, resonance: +25, rep: +18 },
        flagsAdd: ['seven_dossier_read', 'EnlightenedMind'],
        scarsAdd: ['Vết rách nhận thức: Chân tướng The City'],
        recordsAdd: ['reader_of_dossier_zero'],
        meritAdd: 30
      },
      {
        labelVi: "Châm lửa đốt tập hồ sơ ngay trước mặt viên chuyên viên",
        labelEn: "Set the dossier on fire right in front of the analyst",
        resultVi: "Ngọn lửa nuốt những trang giấy dưới mưa. Viên chuyên viên Seven thở ra: “Đôi khi không biết là ân huệ duy nhất để sống lâu ở đây.” Seven gửi lời cảm ơn và bảo đảm cho bạn một sự nghiệp yên ổn.",
        resultEn: "The fire eats the pages in the rain. The Seven analyst exhales: “Sometimes not knowing is the only mercy that lets you grow old here.” Seven thanks you and guarantees you a quiet career.",
        effects: { sanity: +20, network: +25, rep: +15 },
        flagsAdd: ['seven_dossier_read'],
        meritAdd: 20
      }
    ]
  },
  {
    id: 'csq_kurokumo_retribution',
    major: true,
    isCausalCallback: true,
    causalOnly: true,
    need: { flags: ['blade_lineage_sworn'] },
    vi: '[Mực trên danh sách truy sát] Một người của Kurokumo chặn bạn bên sạp sửa kiếm. Hắn mở cuốn sổ bảo kê, chỉ vào tên bạn được khoanh bằng mực đen. “Kiếm của Blade Lineage không được đi qua địa bàn này mà không trả giá.”',
    en: '[Ink on the bounty ledger] A Kurokumo collector stopped you by a sword repair stall. Your name was circled in black ink in his protection ledger. “Blade Lineage steel does not cross our ground for free.”',
    choices: [
      { labelVi: 'Bỏ lại kiếm, thoát qua cửa sau', labelEn: 'Leave the sword and slip through the rear door', resultVi: 'Bạn thoát được, nhưng thanh kiếm bản mệnh nằm lại trên quầy. Lần sau họ sẽ tìm bằng tên thay vì bằng kiếm.', resultEn: 'You escaped, leaving your sworn sword on the counter. Next time they would search for your name instead.', effects: { sanity: -6, wealth: -5, heat: 8 } },
      { labelVi: 'Giữ kiếm, mở đường qua toán thu nợ', labelEn: 'Keep the sword and fight through the collectors', resultVi: 'Bạn chém đứt cuốn sổ, còn bọn họ kịp ghi nhớ mặt bạn. Đường về nhà từ nay dài hơn.', resultEn: 'You cut through the ledger, but they had already learned your face. The way home grew longer.', effects: { health: -12, heat: 16, rep: 5 } }
    ]
  },
  {
    id: 'csq_blade_lineage_retribution',
    major: true,
    isCausalCallback: true,
    causalOnly: true,
    need: { flags: ['kurokumo_tattooed'] },
    vi: '[Kiếm khách dưới mái hiên] Một kiếm khách Blade Lineage nhận ra hình xăm Hắc Vân trên cổ tay bạn. Người ấy đặt bát trà xuống, nhích ghế chắn lối ra. “Người mang dấu của Kurokumo còn nợ chúng ta một câu trả lời.”',
    en: '[Swordsman beneath the eaves] A Blade Lineage swordsman recognized the dark-cloud tattoo on your wrist. They set down their tea and blocked the exit. “Someone carrying Kurokumo ink still owes us an answer.”',
    choices: [
      { labelVi: 'Thừa nhận mình đã chọn phe, rút đao', labelEn: 'Own your allegiance and draw', resultVi: 'Hai lưỡi đao chạm nhau dưới mái hiên. Bạn rời đi với vết rách trên tay áo và cái tên bị truyền sang người kế tiếp.', resultEn: 'Steel met beneath the eaves. You left with a torn sleeve and a name passed to the next swordsman.', effects: { health: -10, heat: 12, rep: 4 } },
      { labelVi: 'Để vũ khí lại làm vật thế chấp rồi đi', labelEn: 'Leave your weapon as collateral and go', resultVi: 'Kiếm khách để bạn đi sau khi nhận vũ khí. Kurokumo sẽ hỏi vì sao bạn trở về tay không.', resultEn: 'The swordsman let you go after taking your weapon. Kurokumo would ask why you returned empty-handed.', effects: { wealth: -6, sanity: -5, rep: -3 } }
    ]
  },
  {
    id: 'csq_thumb_etiquette_hunt',
    major: true,
    isCausalCallback: true,
    causalOnly: true,
    need: { flags: ['ThumbTraitor'] },
    vi: '[Sổ đạn chưa khép] Ba Soldato của The Thumb tìm đến chỗ bạn ngủ. Họ mang cùng một danh sách truy nã, nhưng mỗi người đã nhận một lệnh khác nhau về cách đưa bạn về.',
    en: '[An open ammunition ledger] Three Thumb Soldato found your sleeping place. They carried the same bounty notice, but each had been given different instructions on how to bring you back.',
    choices: [
      { labelVi: 'Bỏ lại đồ đạc, chạy qua mái nhà', labelEn: 'Leave your belongings and flee across the roofs', resultVi: 'Bạn thoát trước khi họ khép vòng vây. Quần áo và tiền bạc nằm lại trong căn phòng.', resultEn: 'You escaped before they closed the cordon. Your clothes and money remained in the room.', effects: { wealth: -12, sanity: -5, heat: 8 } },
      { labelVi: 'Đánh thủng vòng vây', labelEn: 'Fight through the cordon', resultVi: 'Bạn bước ra khỏi con hẻm còn sống; sau lưng là tiếng súng gọi thêm người.', resultEn: 'You came out of the alley alive. Behind you, gunfire called for reinforcements.', effects: { health: -18, heat: 20, rep: 5 } }
    ]
  }
];
