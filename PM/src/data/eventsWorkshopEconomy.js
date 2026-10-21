/**
 * Project Moon - Workshop Depot, Black Market & High-Stakes Economy Events
 * Provides crucial Ahn sinks: buying masterwork weapons, life-saving K Corp ampoules,
 * cybernetic augmentations, and paying for Nest migration visas.
 */

export const WORKSHOP_ECONOMY_EVENTS = [
  {
    id: 'econ_stigma_atelier_merchant',
    age: [18, 75],
    major: true,
    weight: 45,
    forbids: ['Distorted'],
    vi: '[Thương nhân Stigma Atelier] Một tay buôn vũ khí lưu động của Stigma Atelier mở hòm kim loại chống nhiệt giữa một con hẻm Backstreets được canh gác nghiêm ngặt. Những lưỡi kiếm hỏa nhiệt rực đỏ phát ra tiếng xèo xèo đầy quyến rũ.',
    en: '[Stigma Atelier Arms Dealer] An itinerant arms merchant from Stigma Atelier unlocks a thermal alloy vault in a fortified Backstreet alley. Glowing incandescent blades hum with lethal heat.',
    choices: [
      {
        labelVi: 'Mua Lưỡi Hỏa Kiếm Stigma Atelier (Tốn 65 Ahn)',
        labelEn: 'Purchase Stigma Atelier Heat Blade (Cost 65 Ahn)',
        resultVi: 'Bạn đếm từng đồng tiền Ahn đặt lên bàn cân. Cầm lấy thanh kiếm rực lửa, bạn cảm nhận sức nóng truyền thẳng vào mạch máu. Sức mạnh chiến đấu tăng vượt trội!',
        resultEn: 'You stacked the Ahn onto the scales. Grasping the searing hilt, raw thermal energy surged through your veins. Combat prowess vastly augmented!',
        costAhn: 65,
        itemAdd: 'wpn_stigma_blade',
        effects: { wealth: -65, rep: +15, heat: +5 }
      },
      {
        labelVi: 'Mua Ống tiêm hồi sinh K Corp phòng thân (Tốn 45 Ahn)',
        labelEn: 'Buy K Corp HP Ampoule for emergency survival (Cost 45 Ahn)',
        resultVi: 'Người bán cẩn thận trao cho bạn ống tiêm chứa dịch xanh lục bảo được bọc đệm sốc. "Giữ lấy mạng sống của bạn giữa nơi này, Fixer."',
        resultEn: 'The dealer handed you the emerald vial encased in shockproof foam. "Keep your life intact in this graveyard, Fixer."',
        costAhn: 45,
        itemAdd: 'con_kcorp_ampoule',
        effects: { wealth: -45, sanity: +10 }
      },
      {
        labelVi: 'Lắc đầu rời đi, tiết kiệm tiền cho việc khác',
        labelEn: 'Shake your head and walk away, saving your funds',
        resultVi: 'Người thương nhân nhún vai khóa lại chiếc rương: "Hi vọng lần tới tôi gặp lại bạn, bạn vẫn chưa thành một cái xác chết cóng."',
        resultEn: 'The dealer shrugged, relocking the case: "Hope the next time I see you, you aren’t a cold corpse on the cobbles."',
        effects: { sanity: -2 }
      }
    ]
  },
  {
    id: 'econ_nest_visa_opportunity',
    age: [21, 80],
    major: true,
    weight: 50,
    need: { notNest: true },
    forbids: ['NestResident', 'Distorted'],
    vi: '[Cơ Hội Đổi Đời: Thị Thực Định Cư Nest] Một viên chức tham nhũng của Wing bí mật liên hệ với bạn. Ông ta có một suất Thị thực Định cư Nest (Nest Visa) hợp pháp có thể đưa bạn vĩnh viễn thoát khỏi địa ngục Backstreets đầy rẫy Sweeper và thanh trừng.',
    en: '[Once in a Lifetime: Nest Migration Visa] A corrupt Wing official quietly approaches you. He holds a legitimate Nest Migration Visa that can permanently liberate you from the Sweeper-haunted Backstreets.',
    choices: [
      {
        labelVi: 'Dốc cạn tiền bạc mua Thị thực Nest (Tốn 180 Ahn)',
        labelEn: 'Liquidate all savings for the Nest Visa (Cost 180 Ahn)',
        resultVi: 'Toàn bộ tài sản tích cóp cả đời đổi lấy tấm thẻ cư dân bằng kim loại bóng bẩy. Cánh cổng Nest District mở ra, để lại Backstreets mịt mù phía sau lưng bạn!',
        resultEn: 'A lifetime of blood money traded for a polished citizen badge. The fortified Nest gates swung open, leaving the grim Backstreets behind forever!',
        costAhn: 180,
        flagsAdd: ['NestResident', 'Feather'],
        recordsAdd: ['nest_migration'],
        effects: { wealth: -180, sanity: +35, rep: +25 }
      },
      {
        labelVi: 'Từ chối, 180 Ahn là quá đắt đỏ cho một giấc mơ',
        labelEn: 'Decline, 180 Ahn is far too exorbitant for a dream',
        resultVi: 'Bạn quay gót trở lại con hẻm tối. Backstreets vẫn là nhà của bạn, nơi bạn thuộc về.',
        resultEn: 'You turned back into the dimly lit alley. The Backstreets remain your home — where you belong.',
        effects: { sanity: -5 }
      }
    ]
  },
  {
    id: 'econ_cybernetic_clinic',
    age: [20, 75],
    major: true,
    weight: 40,
    forbids: ['Distorted'],
    vi: '[Phòng khám Cấy ghép Cơ thể Backstreets] Mùi cồn sát trùng rẻ tiền và tiếng máy khoan xương réo rắt. Bác sĩ ngầm đưa cho bạn bản danh mục các bộ phận cường hóa sinh học và khung xương trợ lực.',
    en: '[Backstreet Cybernetic Clinic] The stench of cheap disinfectant and shrieking bone drills. An underground ripperdoc presents a catalog of biomimetic grafts and kinetic frames.',
    choices: [
      {
        labelVi: 'Cấy ghép cánh tay cơ khí Old G Corp (Tốn 70 Ahn)',
        labelEn: 'Install Old G Corp biomimetic arm (Cost 70 Ahn)',
        resultVi: 'Cơn đau xé ruột khi xương thịt được kết nối với mạch điện sinh học. Khi vết khâu lành lặn, bạn có thể dễ dàng bóp nát một thanh sắt đặc!',
        resultEn: 'Agonizing fire as nerves fused with bio-circuits. Once healed, your new arm crushed solid rebar like chalk!',
        costAhn: 70,
        itemAdd: 'arm_old_gcorp_graft',
        effects: { wealth: -70, health: +25, sanity: -6, rep: +10 }
      },
      {
        labelVi: 'Mua 2 Ống tiêm Enkephalin an thần (Tốn 35 Ahn)',
        labelEn: 'Purchase 2 Enkephalin Inhalers (Cost 35 Ahn)',
        resultVi: 'Bạn cất kỹ hai lọ thuốc vào túi áo trong. Bất cứ khi nào tâm trí chao đảo, bạn đã có liều thuốc cứu cánh.',
        resultEn: 'You tucked the vials securely into your inner coat. Whenever your mind wavers, salvation is at hand.',
        costAhn: 35,
        itemAdd: 'con_enkephalin_inhaler',
        effects: { wealth: -35, sanity: +15 }
      }
    ]
  },

  {
    id: 'workshop_tres_patent_dispute',
    age: [19, 70],
    major: true,
    weight: 60,
    need: { jobs: ['Workshop Craftsman'] },
    forbids: ['Distorted', 'workshop_tres_done'],
    vi: '[Thanh Tra Bản Quyền của Tres Association] Hai thanh tra đeo găng tay trắng của Hiệp hội Tres bước vào xưởng của bạn. Họ cầm bản vẽ và cáo buộc cơ chế tản nhiệt trên mẫu đao mới của bạn vi phạm bằng sáng chế độc quyền của Stigma Atelier. Nếu bị phạt, xưởng sẽ phá sản.',
    en: '[Tres Association Patent Inquest] Two white-gloved Tres inspectors enter your forge. Holding blueprints, they allege your new thermal heatsink breaches Stigma Atelier’s patent. A fine means bankruptcy.',
    choices: [
      {
        labelVi: 'Trình diễn cấu trúc cơ khí cải tiến độc lập, chứng minh tính nguyên bản',
        labelEn: 'Demonstrate independent kinematic innovation, proving originality',
        resultVi: 'Bạn tháo rời thanh kiếm trước mặt thanh tra, chỉ ra rãnh ma sát kép hoàn toàn khác biệt với Stigma. Khâm phục tài năng cơ khí của bạn, Tres hủy bỏ đơn kiện và cấp chứng chỉ sáng chế vàng.',
        resultEn: 'Disassembling the blade before them, you proved your dual-friction channel was utterly distinct. Impressed, Tres dismissed the claim and granted you a gold patent seal.',
        meritAdd: 25,
        effects: { rep: +25, network: +18, wealth: +40 },
        flagsAdd: ['workshop_tres_done']
      },
      {
        labelVi: 'Đút lót 25 Ahn cho viên thanh tra trưởng để đổi lấy sự êm thấm',
        labelEn: 'Slip 25 Ahn to the lead inspector for an expedited clearance',
        resultVi: 'Chiếc phong bì trượt êm vào túi áo khoác viên thanh tra. Ông ta đóng dấu "Đạt chuẩn" lên hồ sơ xưởng rồi rời đi. Bạn thoát hiểm trong gang tấc nhưng túi tiền hao hụt.',
        resultEn: 'The envelope slipped cleanly into his coat. He stamped "Approved" on your ledger and departed. You dodged ruin at the expense of hard currency.',
        effects: { wealth: -25, rep: +12, sanity: -5 },
        meritAdd: 15,
        flagsAdd: ['workshop_tres_done']
      }
    ]
  },
  {
    id: 'workshop_color_fixer_custom_order',
    age: [25, 75],
    major: true,
    weight: 55,
    need: { jobs: ['Workshop Craftsman'] },
    forbids: ['Distorted', 'workshop_color_order_done'],
    vi: '[Đơn Đặt Hàng của một Color Fixer Huyền Thoại] Một nhân vật trùm áo choàng kín mít bước vào xưởng lúc 1 giờ sáng. Khi chiếc mũ trùm hạ xuống, bạn nhận ra đó là một Color Fixer danh trấn thiên hạ. Họ đặt lên đe rèn một khối thiên thạch nhặt từ Outskirts: "Hãy rèn cho tôi một thanh kiếm có thể chém đứt không gian."',
    en: '[Commission from a Legendary Color Fixer] A cloaked figure enters your forge at 1:00 AM. Lowering their hood reveals an internationally renowned Color Fixer. They place a meteorite upon your anvil: "Forge me a steel that cleaves through space."',
    choices: [
      {
        labelVi: 'Thức trắng 7 ngày 7 đêm dốc toàn bộ tâm huyết rèn nên thần binh',
        labelEn: 'Labor seven relentless days and nights, forging the master blade',
        resultVi: 'Khi nhát búa cuối cùng giáng xuống, lưỡi đao phát ra hào quang xé rách làn khói xưởng. Vị Color Fixer vung đao thử nghiệm, hài lòng để lại một túi tiền Ahn khổng lồ cùng danh xưng "Xưởng Rèn Của Thần Binh."',
        resultEn: 'At the final hammer strike, the blade cracked the air with spatial resonance. Testing the balance, the Color Fixer left a fortune in Ahn and hailed you as a Legendary Forge Master.',
        meritAdd: 45,
        effects: { health: -20, rep: +60, wealth: +220, resonance: +25 },
        flagsAdd: ['workshop_color_order_done', 'LegendarySmith']
      }
    ]
  },

  // =========================================================================
  // SYSTEMATIC PROMOTION LADDERS (WORKSHOP CRAFTSMAN)
  // =========================================================================

  // ------------------------------------------------------------------ Workshop: Apprentice -> Certified Artisan (R1)
  {
    id: 'ws_promo_journeyman_r1',
    age: [19, 58],
    major: true,
    weight: 95,
    need: { jobs: ['Workshop Craftsman'], workshopRank: 0 },
    forbids: ['Distorted', 'promo_ws_journeyman_done'],
    vi: '[Khảo Hạch Thợ Chính Tres Association · Chứng Chỉ Dấu Thép] Hai thanh tra giám định Tres Association cầm thước kẹp và máy đo cộng hưởng động năng bước vào lò rèn của bạn. Để tháo bỏ danh xưng Học Việc (Apprentice) và được phép khắc dấu ấn thương hiệu riêng lên vũ khí, bạn phải tự tay rèn một món vũ khí vượt qua bài kiểm tra chém nát khối thép tôi áp lực mà lưỡi không mẻ.',
    en: '[Tres Association Proofmark Audit · Journeyman Commission] Two Tres appraisers wielding micrometers and kinetic resonators enter your forge. To cast off the Apprentice label and earn the right to strike your personal maker’s mark, you must forge a weapon that shears through pressurized test steel without a micro-fracture.',
    choices: [
      {
        labelVi: 'Rèn đại đao dao động cao tần từ hợp kim siêu nhẹ, chém đứt đôi khối thép mẫu',
        labelEn: 'Forge a high-frequency vibration blade from ultra-light alloy, bisecting the test ingot',
        resultVi: 'Tiếng rít xé gió chói tai vang lên! Lưỡi đao cắt khối thép dày như cắt bơ. Thanh tra Tres cúi đầu kính cẩn, dùng búa đồng dập dấu mộc Tres Proofmark lên chuôi kiếm của bạn: Bạn chính thức là Thợ Rèn Được Cấp Phép (Certified Artisan)!',
        resultEn: 'A piercing sonic hum tore the air! The blade cleaved the thick test block like warm butter. The Tres appraiser bowed in respect, stamping the official Tres Proofmark upon your hilt: You are an ordained Certified Artisan!',
        setWorkshopRank: 1,
        flagsAdd: ['promo_ws_journeyman_done'],
        meritAdd: 20,
        effects: { rep: +20, wealth: +25, resonance: +15 }
      },
      {
        labelVi: 'Đúc chiếc khiên hấp thụ nhiệt động cơ học, chịu đựng ba phát đạn đại bác của Tres',
        labelEn: 'Cast a thermo-kinetic absorbing buckler, withstanding three direct cannon discharges',
        resultVi: 'Tiếng nổ đinh tai nhức óc làm rung chuyển lò rèn. Lớp khiên của bạn hấp thụ trọn vẹn xung lực và tỏa nhiệt qua các rãnh đồng tinh tế mà không suy xuyển. Tres Association cấp chứng chỉ Thợ Chính chuyên phòng hộ cho bạn.',
        resultEn: 'Deafening concussions rattled the workshop walls. Your buckler absorbed the violent kinetic payload, venting heat through brass heat-sinks without warping. Tres certified you as a defensive Journeyman artisan.',
        setWorkshopRank: 1,
        flagsAdd: ['promo_ws_journeyman_done'],
        meritAdd: 22,
        effects: { rep: +22, wealth: +30, resonance: +12, sanity: +5 }
      }
    ]
  },

  // ------------------------------------------------------------------ Workshop: Certified Artisan -> Master Craftsman (R2)
  {
    id: 'ws_promo_master_r2',
    age: [21, 65],
    major: true,
    weight: 95,
    need: { jobs: ['Workshop Craftsman'], workshopRank: 1 },
    forbids: ['Distorted', 'promo_ws_master_done'],
    vi: '[Khai Mở Xưởng Độc Quyền: Đại Sư Rèn Đúc · Master Craftsman] Danh tiếng của bạn vang dội khắp Backstreets. Bạn đã đủ tích lũy để nộp đơn xin thành lập một Atelier độc lập tại District 11. Các xưởng đối thủ lập tức khởi kiện bạn vi phạm bằng sáng chế và thuê các Fixer cướp đường đến đập phá lò rèn. Bạn sẽ làm gì để khẳng định vị thế Đại Sư?',
    en: '[Founding an Independent Atelier: Master Craftsman Trial] Your renown echoes across the alleys. You have amassed sufficient Ahn to charter an independent Atelier in District 11. Rival workshops immediately lodge predatory patent injunctions and hire rogue Fixers to smash your hydraulic hammers.',
    choices: [
      {
        labelVi: 'Cầm chính vũ khí khắc lửa vừa rèn, một mình đánh lui toàn bộ toán côn đồ phá xưởng',
        labelEn: 'Wield your newly forged flame-brand blade, driving off the saboteurs single-handedly',
        resultVi: 'Ngọn lửa rực cháy trên lưỡi kiếm thiêu rụi giáp sắt của đám cướp. Trận chiến được các Fixer xung quanh chứng kiến và tán thưởng nồng nhiệt. Tres Association chính thức trao biển hiệu Atelier Độc Quyền cho bạn, thăng phong bạn lên Master Craftsman.',
        resultEn: 'White flames danced along the edge, incinerating the intruders’ armor. Witnessing the spectacle, neighboring Fixers roared in approval. Tres awarded you your official Atelier Charter, elevating you to Master Craftsman.',
        setWorkshopRank: 2,
        flagsAdd: ['promo_ws_master_done'],
        meritAdd: 32,
        effects: { health: -15, rep: +35, wealth: +60, resonance: +25 }
      },
      {
        labelVi: 'Trình bản vẽ cơ khí vi mô trước Tòa Trọng Tài Tres, buộc đối thủ bồi thường phá sản',
        labelEn: 'Present micro-kinematic blueprints before the Tres Tribunal, bankrupting the litigious rivals',
        resultVi: 'Từng lập luận và phép tính cơ học của bạn đập tan mọi luận điệu vu khống. Tòa án Tres phán quyết xưởng đối thủ phải bồi thường toàn bộ gia sản cho bạn. Bạn tiếp quản xưởng rèn của chúng và bước lên ghế Master Craftsman lẫy lừng.',
        resultEn: 'Your elegant mechanical calculations demolished their fraudulent claims. The Tres Tribunal awarded you their entire estate in damages. Absorbing their assets, you ascended to Master Craftsman with undisputed authority.',
        setWorkshopRank: 2,
        flagsAdd: ['promo_ws_master_done'],
        meritAdd: 30,
        effects: { rep: +32, wealth: +90, network: +30, sanity: +10 }
      }
    ]
  },

  // ------------------------------------------------------------------ Workshop: Rich Craft Lore & Dilemmas
  {
    id: 'ws_mook_spatial_edge_experiment',
    age: [20, 68],
    major: true,
    weight: 60,
    need: { jobs: ['Workshop Craftsman'] },
    forbids: ['Distorted', 'ws_mook_done'],
    vi: '[Thử Nghiệm Lưỡi Cắt Không Gian · Mook Workshop Tech] Bạn có trong tay một bản vẽ thất lạc về công nghệ rạch nứt không gian của Mook Workshop. Để lưỡi kiếm đạt độ mỏng một phân tử, buồng cộng hưởng phải chịu áp suất cực lớn có thể làm nát vụn đôi bàn tay người thợ rèn.',
    en: '[Dimensional Slicing Resonance · Mook Workshop Tech] You acquire a lost blueprint detailing Mook Workshop’s spatial fissure metallurgy. To grind an edge one molecule thick, the acoustic resonance chamber must withstand pressures capable of pulverizing a blacksmith’s hands.',
    choices: [
      {
        labelVi: 'Gia công mài dũa bằng cảm ứng vi mô, hoàn thành thanh Katana xé không gian',
        labelEn: 'Hone the edge via micro-sensory feedback, forging the dimensional-slash Katana',
        resultVi: 'Lưỡi kiếm khi vung lên không tạo ra tiếng gió mà để lại một vết nứt đen lơ lửng giữa không trung trong nửa giây. Một kiếm sĩ Shi Association trả một gia tài để sở hữu thanh kiếm này.',
        resultEn: 'The blade swing made no sound through the air, leaving a hairline spatial rift suspended for half a second. A Shi Association swordmaster paid a small fortune to claim it.',
        meritAdd: 28,
        effects: { health: -14, wealth: +85, rep: +30, resonance: +20 },
        flagsAdd: ['ws_mook_done']
      },
      {
        labelVi: 'Lắp thêm cơ chế giới hạn an toàn, sản xuất hàng loạt phiên bản thương mại',
        labelEn: 'Install safety dampers, mass-producing a stabilized commercial version',
        resultVi: 'Dù sức mạnh cắt giảm đi một nửa nhưng vũ khí an toàn tuyệt đối và bán rất chạy cho các Văn phòng hạng trung, đem lại nguồn thu nhập ổn định.',
        resultEn: 'Though cutting potency halved, the arm was 100% reliable and sold out instantly to mid-tier Offices, securing steady royalties.',
        meritAdd: 20,
        effects: { wealth: +55, rep: +18, sanity: +5 },
        flagsAdd: ['ws_mook_done']
      }
    ]
  },
  {
    id: 'ws_wheels_industry_colossus',
    age: [21, 70],
    major: true,
    weight: 55,
    need: { jobs: ['Workshop Craftsman'] },
    forbids: ['Distorted', 'ws_wheels_done'],
    vi: '[Đại Chùy Chiến 180kg · Đơn Hàng Wheels Industry] Một đại hán Fixer Grade 1 từ Hiệp hội Liu đặt hàng một cây chiến chùy nặng 180kg làm từ thép nén tỷ trọng cực cao của Wheels Industry. Cây chùy này phải chịu được cú đập nổ tung giáp xe tăng của Syndicate.',
    en: '[The 180kg Colossus Maul · Wheels Industry Commission] A towering Grade 1 Liu Fixer commissions a 180kg great-maul forged from hyper-dense Wheels Industry alloy. It must withstand kinetic impacts capable of crushing syndicate assault crawlers.',
    choices: [
      {
        labelVi: 'Đúc lõi năng lượng thủy lực bên trong thân chùy, tạo lực bộc phá khi va chạm',
        labelEn: 'Cast hydraulic kinetic accumulators inside the shaft, detonating on impact',
        resultVi: 'Cú vung thử nghiệm của vị Fixer đập vỡ nát tảng đá thử tải ba tấn thành bụi mịn. Vị khách cười vang như sấm, thanh toán gấp rưỡi số Ahn đã hứa và giới thiệu cả phân hội Liu đến đặt hàng ở xưởng bạn.',
        resultEn: 'The Fixer’s test swing pulverized a three-ton granite ballast into powder. Roaring with delight, he paid 150% of the bounty and directed the entire Liu branch to your smithy.',
        meritAdd: 30,
        effects: { health: -16, rep: +35, wealth: +110 },
        flagsAdd: ['ws_wheels_done']
      },
      {
        labelVi: 'Tôi luyện bề mặt bằng hợp kim chống ăn mòn, tối ưu độ bền vĩnh cửu',
        labelEn: 'Temper the exterior with anti-corrosive lacquer, guaranteeing eternal durability',
        resultVi: 'Cây chùy trở nên bất hoại trước mọi loại axit và nhiệt độ cực đoan. Vị khách vô cùng hài lòng với sự chắc chắn và uy tín của xưởng bạn.',
        resultEn: 'The maul became completely impervious to acid and extreme thermal shock. Highly impressed by your reliability, the client commended your shop.',
        meritAdd: 24,
        effects: { rep: +25, wealth: +70, sanity: +5 },
        flagsAdd: ['ws_wheels_done']
      }
    ]
  },
  {
    id: 'ws_outskirts_ruins_alloy',
    age: [22, 75],
    major: true,
    weight: 50,
    need: { jobs: ['Workshop Craftsman'] },
    forbids: ['Distorted', 'ws_ruins_done'],
    vi: '[Quặng Kim Loại Cổ Đại từ Outskirts] Một toán thợ săn tàn tích Outskirts bí mật ghé vào sân sau xưởng của bạn. Họ mở bọc vải bạt để lộ một khối kim loại rỉ sét khai quật từ Di Tích Cổ Đại (Ruins) nằm ngoài bức tường The City — thứ vật liệu chưa từng thấy trong hồ sơ của The Head.',
    en: '[Ancient Ruins Alloy from The Outskirts] A squad of Outskirts scavengers sneaks into your backyard forge. Peeling back greasy tarps, they reveal a corroded ingot exhumed from the ancient Ruins beyond City borders — an alloy missing from all Head registries.',
    choices: [
      {
        labelVi: 'Mua lại khối quặng cổ đại (Tốn 80 Ahn) và tinh luyện thành hợp kim kỳ dị',
        labelEn: 'Purchase the ancient ingot (Cost 80 Ahn) and refine it into an aberrant superalloy',
        resultVi: 'Ngọn lửa lò rèn chuyển sang màu xanh lam ma mị. Kim loại nóng chảy tự kết tinh lại với độ cứng vượt xa mọi hợp kim đương đại của các Wing! Bạn thu được vật liệu huyền thoại để rèn thần binh.',
        resultEn: 'Furnace flames flared phantom sapphire. The molten metal self-crystallized with hardness far exceeding any contemporary Wing alloy! You acquired legendary masterwork stock.',
        costAhn: 80,
        meritAdd: 32,
        effects: { wealth: -80, resonance: +30, rep: +30, heat: +20 },
        flagsAdd: ['ws_ruins_done', 'RuinsAlloyMaster']
      },
      {
        labelVi: 'Từ chối mua, đề phòng bị The Head kết tội tàng trữ vật phẩm phi nhân',
        labelEn: 'Refuse the transaction, avoiding Head prosecution for non-human contraband',
        resultVi: 'Toán thợ săn gói ghém đồ đạc rời đi trong bóng đêm. Bạn giữ được sự an toàn trước thanh tra kiểm duyệt, dù có chút tiếc nuối.',
        resultEn: 'The scavengers wrapped their goods and vanished into the fog. You remained safely beneath the Head’s radar, albeit with lingering curiosity.',
        effects: { sanity: +5 }
      }
    ]
  }
];
