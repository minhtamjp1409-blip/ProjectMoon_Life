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
        labelVi: 'Dốc cạn tiền bạc mua Thị thực Nest (Tốn 85 Ahn)',
        labelEn: 'Liquidate savings for the Nest Visa (Cost 85 Ahn)',
        resultVi: 'Toàn bộ tài sản tích cóp cả đời đổi lấy tấm thẻ cư dân bằng kim loại bóng bẩy. Cánh cổng Nest District mở ra, để lại Backstreets mịt mù phía sau lưng bạn!',
        resultEn: 'A lifetime of blood money traded for a polished citizen badge. The fortified Nest gates swung open, leaving the grim Backstreets behind forever!',
        costAhn: 85,
        flagsAdd: ['NestResident', 'Feather'],
        recordsAdd: ['nest_migration'],
        effects: { wealth: -85, sanity: +35, rep: +25 }
      },
      {
        labelVi: 'Từ chối, 85 Ahn là quá đắt đỏ cho một giấc mơ',
        labelEn: 'Decline, 85 Ahn is far too exorbitant for a dream',
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

  // =========================================================================
  // CANON HEALING, WELLNESS & WEALTH SINK EVENTS (LORE-ACCURATE PROJECT MOON)
  // =========================================================================
  {
    id: 'econ_kcorp_regeneration_pavilion',
    age: [18, 85],
    major: true,
    weight: 55,
    forbids: ['Distorted'],
    vi: '[Viện Tái Sinh Sinh Học K Corp · Singularity Tears] Giữa khu phố ranh giới rực rỡ đèn thủy tinh, một trạm cấp cứu đặc biệt của K Corp mở cửa phục vụ cư dân và Fixer có đủ khả năng chi trả. Trong các ống trụ thủy tinh, dòng dịch lỏng màu ngọc bích từ Singularity của K Corp xoay tròn mê hoặc, có khả năng nối liền xương thịt đứt lìa trong chớp mắt.',
    en: '[K Corp Bio-Regeneration Pavilion · Singularity Tears] At the border boulevard gleaming under crystal lamps, a licensed K Corp emergency station caters to Fixers and citizens with deep pockets. Within cylindrical stasis vats, swirling emerald Singularity fluid promises instantaneous flesh and nerve reconstitution.',
    choices: [
      {
        labelVi: 'Ngâm mình trọn vẹn trong Buồng Tái Tạo K-Tier (Tốn 48 Ahn)',
        labelEn: 'Full immersion in K-Tier Singularity Restoration Pod (Cost 48 Ahn)',
        resultVi: 'Dòng dịch ngọc bích ùa vào phổi và bao phủ toàn thân mà không hề gây ngạt. Từng vết rách cơ, mô hoại tử và sẹo chém sâu lành lại như một phép màu. Bạn bước ra khỏi kén trong trạng thái sinh lực tràn trề nhất cuộc đời!',
        resultEn: 'The emerald Singularity tears engulfed your form without suffocating. Torn viscera and agonizing combat scars fused seamlessly as if by magic. You stepped from the vat at the pinnacle of physical perfection!',
        costAhn: 48,
        itemAdd: 'con_kcorp_ampoule',
        effects: { wealth: -48, health: +60, sanity: +18, heat: -5 }
      },
      {
        labelVi: 'Tiêm trực tiếp Ống Tiêm Cấp Cứu K Corp cao cấp (Tốn 26 Ahn)',
        labelEn: 'Direct injection of high-grade K Corp HP Ampoule (Cost 26 Ahn)',
        resultVi: 'Y sĩ cắm chiếc kim tiêm áp lực vào cơ ngực bạn. Làn sóng hồi phục mãnh liệt quét qua các cơ quan nội tạng, xoa dịu triệt để những cơn đau kinh niên.',
        resultEn: 'The surgeon drove the pneumatic syringe into your pectoral muscles. A surge of regenerative energy flushed through your organs, extinguishing chronic agony.',
        costAhn: 26,
        effects: { wealth: -26, health: +35, sanity: +8 }
      },
      {
        labelVi: 'Lắc đầu từ chối trước mức phí trên trời của Wing',
        labelEn: 'Decline before the exorbitant Wing price tag',
        resultVi: 'Bạn ôm vết thương quay lưng rời đi. K Corp chỉ cứu người giàu — đó là quy luật bất biến của The City.',
        resultEn: 'Clutching your wounds, you turned away. K Corp only saves the affluent — the eternal iron law of The City.',
        effects: { sanity: -2 }
      }
    ]
  },
  {
    id: 'econ_tcorp_chrono_restoration',
    age: [20, 85],
    major: true,
    weight: 50,
    forbids: ['Distorted'],
    vi: '[Buồng Tua Ngược Thời Gian Tế Bào T Corp · District 4] Bạn dừng chân trước chi nhánh dịch vụ phục hồi sinh học sử dụng Singularity Thời Gian của T Corp. Thay vì phẫu thuật dao kéo đau đớn, cỗ máy Chrono-Pod tua ngược đồng hồ sinh học của cơ thể bạn về hai tuần trước — thời điểm trước khi bạn chịu những vết thương chí mạng.',
    en: '[T Corp Chrono-Restorative Pod · District 4 Tech] You pause before a licensed temporal restoration outpost harnessing T Corp’s Time Singularity. Forgoing scalpels and stitches, the Chrono-Pod rewinds your biological clock by two subjective weeks — restoring tissues to their state before catastrophic trauma.',
    choices: [
      {
        labelVi: 'Kích hoạt Liệu Trình Tua Ngược Thời Gian Sinh Học (Tốn 52 Ahn)',
        labelEn: 'Initiate Temporal Biological Reversal Treatment (Cost 52 Ahn)',
        resultVi: 'Các bánh răng đồng thau và tinh thể thời gian phát ra tiếng tích tắc nghẹt thở. Trong tích tắc ánh sáng vàng óng bừng lên, toàn bộ tế bào rách nát và độc tố trong máu tự động biến mất về trạng thái nguyên vẹn thuở ban đầu!',
        resultEn: 'Brass chronometer gears ticked in breathless rhythm. A flash of sepia light engulfed the pod; ruptured cells and metabolic toxins rewound cleanly into flawless prior health!',
        costAhn: 52,
        effects: { wealth: -52, health: +45, sanity: +30, resonance: -10 }
      },
      {
        labelVi: 'Mua Thiết Bị Chrono-Stabilizer Cầm Tay phòng thân (Tốn 28 Ahn)',
        labelEn: 'Purchase portable Chrono-Stabilizer capsule (Cost 28 Ahn)',
        resultVi: 'Thiết bị phát ra tiếng tíc tắc êm dịu, bảo toàn nhịp tim và làm chậm lại phản ứng căng thẳng tâm lý khi bạn chịu áp lực cực hạn.',
        resultEn: 'The compact brass canister pulsed with rhythmic ticking, steadying cardiac cadence and halting acute panic under duress.',
        costAhn: 28,
        itemAdd: 'acc_chrono_pocket_watch',
        effects: { wealth: -28, sanity: +22, health: +15 }
      },
      {
        labelVi: 'Không can thiệp vào dòng chảy thời gian, rời khỏi buồng',
        labelEn: 'Leave the chronometer pod, letting time flow untamed',
        resultVi: 'Bạn rảo bước ra phố. Món nợ thời gian của T Corp luôn đi kèm cái giá quá đắt nếu lạm dụng.',
        resultEn: 'You returned to the cobbles. T Corp’s temporal debts are perilous to toy with.',
        effects: { sanity: +2 }
      }
    ]
  },
  {
    id: 'econ_hamhampangpang_feast',
    age: [18, 90],
    major: true,
    weight: 65,
    vi: '[Đại Tiệc Hương Vị HamHamPangPang] Mùi bánh mì nướng bơ tỏi vàng giòn, thịt hun khói nướng than hồng và sốt mayonnaise thượng hạng dẫn lối bạn đến cửa tiệm bánh mì HamHamPangPang huyền thoại. Nơi đây từng là chốn dừng chân bình yên nhất của những bậc thầy Fixer giữa lòng đô thị khắc nghiệt.',
    en: '[HamHamPangPang Grand Tasting Feast] The aroma of golden butter toast, charcoal-smoked tender pork, and velvety house mayonnaise leads you straight into the legendary HamHamPangPang bistro. A fabled sanctuary where even world-weary Color Fixers found solace amidst the City’s merciless grind.',
    choices: [
      {
        labelVi: 'Gọi Đại Tiệc Master Set Kèm Trà Thảo Mộc Thượng Hạng (Tốn 24 Ahn)',
        labelEn: 'Feast on the Grand Master Sandwich Set & Herbal Vintage (Cost 24 Ahn)',
        resultVi: 'Cắn miếng bánh mì giòn rụm với lớp phô mai béo ngậy và thịt mềm tan trong miệng, ngụm trà thảo mộc ấm áp chảy tràn lồng ngực. Mọi đau khổ, sang chấn tinh thần và tiếng thì thầm méo mó tan biến hoàn toàn thành sự bình yên thuần khiết!',
        resultEn: 'Savoring the golden crust overflowing with savory cutlets and molten cheese, washed down by warm herbal brew. Existential dread and lingering distortions dissolved into sheer, unadulterated contentment!',
        costAhn: 24,
        effects: { wealth: -24, sanity: +45, health: +20, resonance: -20, rep: +5 }
      },
      {
        labelVi: 'Mua Hộp Sandwich Thập Cẩm & Xúc Xích Đặc Biệt Mang Đi (Tốn 10 Ahn)',
        labelEn: 'Takeaway signature Sandwich Box & spiced sausages (Cost 10 Ahn)',
        resultVi: 'Bữa ăn thịnh soạn trên ghế đá công viên sưởi ấm tâm hồn bạn. Bạn cảm thấy như được tái sinh để tiếp tục chiến đấu vì mục tiêu của mình.',
        resultEn: 'A warm, decadent meal on a park bench breathed warmth into your spirit. You felt rejuvenated, ready to brave the City’s trials once more.',
        costAhn: 10,
        effects: { wealth: -10, sanity: +22, health: +8, resonance: -8 }
      },
      {
        labelVi: 'Hít hà hương thơm rồi mỉm cười bước qua',
        labelEn: 'Inhale the savory steam and walk onward with a smile',
        resultVi: 'Dù không mua đồ ăn, chỉ riêng mùi hương nồng ấm của quán cũng khiến một ngày cô độc trở nên tươi sáng hơn một chút.',
        resultEn: 'Though your wallet stayed shut, the hearty aroma alone lifted the chill from an otherwise solitary afternoon.',
        effects: { sanity: +3 }
      }
    ]
  },
  {
    id: 'econ_jcorp_luxury_spa_lounge',
    age: [21, 85],
    major: true,
    weight: 50,
    forbids: ['Distorted'],
    vi: '[Sảnh Spa Khoáng Nóng & Jazz Club J Corp · District 10] Tiếng kèn saxophone êm dịu hòa cùng tiếng nước khoáng nóng lưu huỳnh róc rách trong một tổ hợp thư giãn xa hoa của J Corp. Nơi đây là thánh địa rửa sạch stress, giảm thiểu nguy cơ Biến dị (Distortion) và làm nguội độ truy nã (Heat) sau các phi vụ đẫm máu.',
    en: '[J Corp Luxury Jazz & Thermal Spa Lounge · District 10] Silky saxophone melodies blend with bubbling sulfur mineral baths inside J Corp’s opulent relaxation haven. A sanctuary designed to melt away City trauma, suppress Distortion resonance, and cool down faction Heat.',
    choices: [
      {
        labelVi: 'Bao trọn Gói Nghỉ Dưỡng VIP Thượng Hạng & Trị Liệu Trầm Hương (Tốn 42 Ahn)',
        labelEn: 'Reserve Presidential VIP Suite & Aromatic Thermal Soak (Cost 42 Ahn)',
        resultVi: 'Ngâm mình trong dòng nước ấm thơm nồng tinh dầu thảo mộc và thưởng thức rượu vang, toàn bộ căng thẳng thần kinh tan rã. Lực lượng truy đuổi cũng mất dấu bạn giữa khu phức hợp sòng bạc bảo mật cao!',
        resultEn: 'Submerged in thermal minerals laced with aromatic oils while sipping fine vintage, every ounce of nervous tension melted away. Pursuers completely lost your trail in the high-security district!',
        costAhn: 42,
        effects: { wealth: -42, sanity: +50, heat: -25, resonance: -18, rep: +5 }
      },
      {
        labelVi: 'Vào Phòng Tắm Khoáng Lưu Huỳnh Tiêu Chuẩn (Tốn 18 Ahn)',
        labelEn: 'Standard sulfur bath admission & sauna (Cost 18 Ahn)',
        resultVi: 'Hơi nước nóng bốc lên mịt mù cuốn trôi mồ hôi và bụi bặm Backstreets. Tâm trí bạn sáng suốt và thanh thản trở lại.',
        resultEn: 'Billowing thermal steam washed away grime and bloodstains. Your mind recovered clarity and measured peace.',
        costAhn: 18,
        effects: { wealth: -18, sanity: +25, heat: -12 }
      },
      {
        labelVi: 'Rời sảnh, tiếp tục bận rộn với cơm áo gạo tiền',
        labelEn: 'Depart the lobby, returning to the daily grind',
        resultVi: 'Bạn tự nhủ khi nào kiếm thêm được nhiều Ahn hơn sẽ quay lại hưởng thụ.',
        resultEn: 'You promised yourself a visit once your coffers were even more bountiful.',
        effects: { sanity: -2 }
      }
    ]
  },
  {
    id: 'econ_atelier_armor_overhaul',
    age: [19, 80],
    major: true,
    weight: 50,
    forbids: ['Distorted'],
    vi: '[Đại Tu Giáp Trụ & Vũ Khí Tại Atelier Độc Quyền] Bạn bước vào một xưởng rèn Atelier được Tres Association cấp phép (như Zelkova hay Wheels Industry). Những người thợ rèn bậc thầy chào đón bạn với bản nâng cấp khung xương động lực, phủ lớp men nano chống đạn và tôi luyện lại lưỡi vũ khí.',
    en: '[Atelier Master Armor & Kinematics Overhaul] You enter a prestigious Tres-certified Atelier (such as Zelkova or Wheels Industry). Master armorsmiths offer comprehensive exo-frame reinforcement, kinetic ballistic nano-coatings, and razor-edge metallurgy.',
    choices: [
      {
        labelVi: 'Đặt Trọn Gói Đại Tu Giáp Nano & Hiệu Chỉnh Khớp Động Lực (Tốn 45 Ahn)',
        labelEn: 'Commission Complete Nano-Plate Armor & Joint Calibration (Cost 45 Ahn)',
        resultVi: 'Bộ áo khoác và giáp bảo hộ được đan xen sợi siêu chịu lực chống cắt xé. Cơ thể bạn như được bao bọc trong một pháo đài thép di động, tự tin đương đầu với mọi đòn hiểm hóc!',
        resultEn: 'Your coat was woven with hyper-tensile ballistic weave and carbon plating. Moving like a walking armored citadel, your resilience against fatal blows skyrocketed!',
        costAhn: 45,
        itemAdd: 'arm_atelier_coat',
        effects: { wealth: -45, health: +40, rep: +15, sanity: +8 }
      },
      {
        labelVi: 'Thay thế đệm chống sốc và mài bén vũ khí cơ bản (Tốn 18 Ahn)',
        labelEn: 'Replace shock dampeners and hone primary blade (Cost 18 Ahn)',
        resultVi: 'Lưỡi đao sắc ngọt trở lại và áo giáp được khâu vá chắc chắn, mang lại sự bảo vệ đáng tin cậy trong các hợp đồng mới.',
        resultEn: 'The blade gleamed razor-sharp and shock pads were renewed, offering dependable protection in upcoming contracts.',
        costAhn: 18,
        effects: { wealth: -18, health: +16, rep: +6 }
      },
      {
        labelVi: 'Tự mài đao tại nhà để tiết kiệm tiền',
        labelEn: 'Hone your weapons at home to save Ahn',
        resultVi: 'Đá mài cùn làm lưỡi kiếm không đều, nhưng bạn giữ lại được số tiền trong túi.',
        resultEn: 'A worn whetstone gave an uneven edge, but your coin remained unspent.',
        effects: { sanity: -2 }
      }
    ]
  },
  {
    id: 'econ_seven_safehouse_diplomacy',
    age: [20, 80],
    major: true,
    weight: 45,
    forbids: ['Distorted'],
    vi: '[Trú Ẩn Bí Mật Tại Safehouse Seven Association] Bị săn đuổi bởi kẻ thù hoặc kiệt quệ sau những vụ thanh trừng, bạn gõ cánh cửa mật mã của Hiệp hội Seven — tổ chức môi giới thông tin và điều tra hàng đầu The City. Nơi đây cung cấp dịch vụ bảo hộ ngoại giao, chữa trị vết thương kín và tẩy trắng hồ sơ truy nã.',
    en: '[Sanctuary at Seven Association Safehouse] Hunted by adversaries or exhausted from syndicate turf wars, you signal the coded door of Seven Association — The City’s apex information brokers. Behind reinforced blast doors lies diplomatic immunity, confidential surgery, and record laundering.',
    choices: [
      {
        labelVi: 'Mua Trọn Gói Tẩy Rửa Hồ Sơ & Điều Trị Y Tế Bí Mật (Tốn 55 Ahn)',
        labelEn: 'Purchase Complete Identity Laundering & Covert Trauma Care (Cost 55 Ahn)',
        resultVi: 'Các thám tử Seven lập tức can thiệp xóa sạch camera và tài liệu lưu trữ của các phe phái, trong khi bác sĩ ngoại giao vá lành từng vết đạn trên người bạn. Bạn bước ra hoàn toàn tự do và khỏe mạnh!',
        resultEn: 'Seven intelligence officers purged security feeds and faction bounties while surgeons sealed every ballistic tear under diplomatic privilege. You stepped out entirely cleared and restored!',
        costAhn: 55,
        effects: { wealth: -55, health: +35, sanity: +30, heat: -40, rep: +12 }
      },
      {
        labelVi: 'Thuê Quyền Trú Ẩn Khẩn Cấp 3 Ngày Trong Phòng An Toàn (Tốn 22 Ahn)',
        labelEn: 'Rent 3-day emergency safehouse bunk & medical triage (Cost 22 Ahn)',
        resultVi: 'Bạn có được ba ngày ngủ sâu dưới sự canh gác của các Fixer Seven trang bị đao nhọn. Cơn sốt hạ dần và kẻ thù tạm thời mất dấu bạn.',
        resultEn: 'Three nights of unbroken sleep guarded by Seven rapiers. Your fever broke and pursuing syndicates lost your scent.',
        costAhn: 22,
        effects: { wealth: -22, sanity: +20, heat: -18, health: +12 }
      },
      {
        labelVi: 'Không đủ tin tưởng Seven, quay trở lại con hẻm tối',
        labelEn: 'Distrust Seven intelligence brokers, returning to the alleys',
        resultVi: 'Bạn tiếp tục lang thang trong sự căng thẳng tột cùng giữa tầm ngắm của các sát thủ.',
        resultEn: 'You stayed on the run, nerves frayed as assassins prowled the shadows.',
        effects: { sanity: -8, heat: +5 }
      }
    ]
  },
  {
    id: 'econ_district23_gourmet_pie',
    age: [20, 80],
    major: true,
    weight: 45,
    vi: '[Ẩm Thực Đen Tối District 23 · Bánh Thịt Pierre] Tại con hẻm ranh giới District 23, một quán ăn ngầm tỏa ra mùi bơ nướng và gia vị thơm nồng đến rỏ dãi. Món bánh nướng thịt của nghệ nhân nơi đây nổi tiếng với hương vị bùng nổ và hàm lượng dưỡng chất kỳ lạ có thể phục hồi sinh lực sắp cạn kiệt chỉ sau vài miếng cắn.',
    en: '[District 23 Underground Gastronomy · Pierre’s Savory Pie] In an alley bordering District 23, an illicit bistro radiates the intoxicating scent of spiced pastry and rich caramelized broth. The artisan meat pie here boasts legendary regenerative potency, rekindling near-fatal exhaustion within minutes.',
    choices: [
      {
        labelVi: 'Thưởng thức Chiếc Bánh Thịt Thượng Hạng Của Nghệ Nhân (Tốn 25 Ahn)',
        labelEn: 'Savor the Artisan Meat Pie Special (Cost 25 Ahn)',
        resultVi: 'Vị giác của bạn bùng nổ trước sự hòa quyện hoàn hảo của thịt và thảo mộc. Dù có một thoáng rùng mình ớn lạnh về nguồn gốc nguyên liệu của Quận 23, cơ thể bạn phục hồi mãnh liệt như chưa từng bị thương!',
        resultEn: 'Flavors exploded across your palate in exquisite harmony. Though an uncanny shiver gripped your spine regarding District 23’s ingredient sourcing, miraculous vitality flooded your muscles and bones!',
        costAhn: 25,
        effects: { wealth: -25, health: +55, sanity: -6, rep: +10 }
      },
      {
        labelVi: 'Chỉ gọi một Bát Súp Hầm Bổ Dưỡng thanh đạm (Tốn 12 Ahn)',
        labelEn: 'Order a warm bowl of simmered broth (Cost 12 Ahn)',
        resultVi: 'Nước dùng nóng hổi làm ấm cơ thể và xoa dịu những vết bầm tím sau ca làm việc nhọc nhằn.',
        resultEn: 'The scalding savory broth warmed your core, soothing deep bruises from brutal shifts.',
        costAhn: 12,
        effects: { wealth: -12, health: +25, sanity: -2 }
      },
      {
        labelVi: 'Buồn nôn từ chối khi nhớ lại các tin đồn về District 23',
        labelEn: 'Refuse with revulsion, recalling District 23 urban legends',
        resultVi: 'Bạn nuốt nước bọt bỏ đi. Dù đói lả, bạn thà giữ cho tâm trí mình không bị vấy bẩn bởi sự thật hắc ám.',
        resultEn: 'You swallowed hard and walked away. Famished as you were, some truths were better left uneaten.',
        effects: { sanity: +4 }
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
  },

  // =========================================================================
  // WORKSHOP ARTISAN DIVERSITY: COMMISSIONS, ATELIER PATENTS & GUILD RIVALRIES
  // =========================================================================
  {
    id: 'ws_zelkova_telescopic_quarterstaff',
    age: [20, 75],
    major: true,
    weight: 48,
    need: { jobs: ['Workshop Craftsman'] },
    vi: '[Chế Tác Trượng Cơ Khí Đa Năng · Phong Cách Zelkova Workshop] Một Fixer kỳ cựu mang đến bản vẽ trượng khớp thu phóng của xưởng Zelkova huyền thoại. Họ yêu cầu bạn tích hợp cơ chế thủy lực nén khí để biến thanh trượng gỗ bọc thép thành một món vũ khí vừa có thể đập tan khiên nặng, vừa có thể vươn dài 4 mét chỉ trong một cái búng tay.',
    en: '[Zelkova Telescopic Staff Commission] A veteran Fixer brings blueprints for a Zelkova-style collapsible kinetic quarterstaff. They commission you to integrate pressurized hydraulic servos, allowing the iron-banded staff to crush shields at close quarters or extend four meters in a microsecond.',
    choices: [
      {
        labelVi: 'Gia công khớp nối vi cơ khí chuẩn xác, tối ưu hóa tốc độ vươn dài tức thì',
        labelEn: 'Mill micro-kinematic joint couplings, optimizing instant deployment velocity',
        resultVi: 'Cú vung thử của vị Fixer đập vỡ nát tảng đá thử tải trong chớp mắt. Vị khách vô cùng kinh ngạc trước độ chuẩn xác của bạn, thanh toán toàn bộ hợp đồng kèm theo tiền thưởng lớn!',
        resultEn: 'The Fixer’s test swing pulverized a granite block in the blink of an eye. Astounded by your mechanical precision, they paid the bounty in full plus a handsome tip!',
        meritAdd: 22,
        effects: { rep: +24, wealth: +48, resonance: +12, sanity: +6 }
      },
      {
        labelVi: 'Tăng cường vỏ bọc chống sốc bằng hợp kim nặng, đảm bảo trượng không bao giờ cong vênh',
        labelEn: 'Reinforce the outer casing with dense shock alloy, guaranteeing absolute unbendability',
        resultVi: 'Thanh trượng trở nên chắc nịch như một cột thép nguyên khối. Khách hàng tấm tắc khen ngợi độ bền vĩnh cửu của sản phẩm xưởng bạn.',
        resultEn: 'The staff felt as solid as an unyielding steel pillar. The client commended the eternal durability of your handiwork.',
        meritAdd: 18,
        effects: { rep: +18, wealth: +36, sanity: +5 }
      }
    ]
  },
  {
    id: 'ws_tres_singularity_infringement_audit',
    age: [22, 75],
    major: true,
    weight: 46,
    need: { jobs: ['Workshop Craftsman'] },
    vi: '[Thanh Tra Bằng Sáng Chế Lò Rèn · Hiệp Hội Tres] Hai viên thanh tra áo khoác xám của Hiệp hội Tres bất ngờ ập vào lò rèn của bạn lúc nửa đêm. Họ nghi ngờ cuộn dây nhiệt độ siêu cao trên lò nấu thép của bạn vi phạm công nghệ Singularity được cấp bằng sáng chế độc quyền của R Corp.',
    en: '[Tres Association Furnace Patent Inquest] Two grey-coated Tres inspectors raid your forge at midnight. They allege your super-thermal smelting coils unlawfully infringe upon R Corp’s patented kinetic metallurgy singularities.',
    choices: [
      {
        labelVi: 'Mở buồng máy chứng minh nguyên lý phản ứng nhiệt cơ học hoàn toàn độc lập',
        labelEn: 'Disassemble the furnace to prove independent thermodynamic mechanics',
        resultVi: 'Các phép tính áp suất và lưu nhiệt của bạn đập tan mọi nghi ngờ của thanh tra Tres. Họ phải cúi đầu xin lỗi và cấp Dấu Mộc Độc Lập cho lò rèn của bạn!',
        resultEn: 'Your thermodynamic calculations completely dispelled their allegations. The inspectors apologized and awarded an official Independent Maker’s Mark to your forge!',
        meritAdd: 24,
        effects: { rep: +26, wealth: +40, network: +18, sanity: +8 }
      },
      {
        labelVi: 'Kín đáo đút lót 20 Ahn để đẩy nhanh thủ tục kiểm định và tiễn thanh tra ra cửa',
        labelEn: 'Discreetly slip 20 Ahn to expedite the inspection ledger and see them off',
        resultVi: 'Chiếc phong bì giúp lò rèn của bạn tiếp tục đỏ lửa mà không bị niêm phong điều tra, bảo toàn tiến độ các đơn hàng gấp.',
        resultEn: 'The grease expedited the paperwork, keeping your forges roaring without downtime and preserving client delivery schedules.',
        costAhn: 20,
        effects: { wealth: -20, rep: +15, sanity: -3 }
      }
    ]
  },
  {
    id: 'ws_workshop_turf_sabotage',
    age: [20, 72],
    major: true,
    weight: 44,
    need: { jobs: ['Workshop Craftsman'] },
    vi: '[Phục Kích Phá Hoại Lò Rèn Lúc 2 Giờ Sáng] Tiếng kính vỡ lách cách ở tầng hầm đánh thức bạn dậy. Hai kẻ phá hoại do một xưởng rèn đối thủ thuê đang định đổ axit ăn mòn vào bồn dầu tôi thép và các pít-tông thủy lực của bạn.',
    en: '[2:00 AM Workshop Sabotage] The crunch of shattered glass in your cellar wakes you. Two hired saboteurs from a rival atelier are poised to pour corrosive acid into your quenching vats and hydraulic rams.',
    choices: [
      {
        labelVi: 'Cầm cây búa rèn đang nóng đỏ lao xuống tầng hầm đánh gục cả hai tên phá hoại',
        labelEn: 'Charge into the cellar wielding a glowing-red hammer, subduing both saboteurs',
        resultVi: 'Sức mạnh và độ hung bạo của bạn khiến hai tên phá hoại ngã gục rên rỉ xin tha mạng. Bạn trói nghiến chúng lại, buộc xưởng đối thủ phải nộp một khoản tiền chuộc khổng lồ!',
        resultEn: 'Your ferocious counter-attack flattened both saboteurs. Tying them up, you forced their sponsoring atelier to pay exorbitant restitution!',
        meritAdd: 22,
        effects: { health: -10, rep: +25, wealth: +55, sanity: +6 }
      },
      {
        labelVi: 'Kích hoạt hệ thống phun hơi nước áp lực cao, giam giữ chúng đợi hiệp hội xử lý',
        labelEn: 'Trigger the high-pressure steam venting grid, trapping them for Association arrest',
        resultVi: 'Hơi nước nóng rát phong tỏa tầng hầm khiến chúng không kịp trở tay. Hiệp hội Tres đến tiếp quản hiện trường và xử phạt nặng xưởng rèn đối thủ.',
        resultEn: 'Scalding steam trapped the intruders instantly. Tres Association enforcers took custody, penalizing the rival forge with heavy fines.',
        meritAdd: 20,
        effects: { rep: +20, wealth: +32, sanity: +8 }
      }
    ]
  },
  {
    id: 'ws_ego_casing_resonance_craft',
    age: [24, 75],
    major: true,
    weight: 48,
    need: { jobs: ['Workshop Craftsman'] },
    vi: '[Gia Công Chuôi Kiếm Cộng Hưởng E.G.O] Một Fixer Grade 1 mang đến một mảnh vỡ tinh thể hữu cơ phát quang nhặt từ tàn tích của Lobotomy Corp. Khối tinh thể đập từng nhịp như một trái tim sống; họ yêu cầu bạn rèn một bộ vỏ kim loại cách nhiệt tâm lý để kìm hãm sự méo mó khi sử dụng.',
    en: '[E.G.O Resonance Hilt Metallurgy] A Grade 1 Fixer brings an organic crystal shard salvaged from Lobotomy Corp ruins. The crystal pulses with a living heartbeat; they commission an insulated hilt assembly to contain psychological bleed-through during combat.',
    choices: [
      {
        labelVi: 'Dùng hợp kim nén ba lớp và vòng đệm nano để khóa chặt sóng cộng hưởng tinh thần',
        labelEn: 'Forge triple-layer compressed alloy with nano-dampers to stabilize mental resonance',
        resultVi: 'Khi thanh kiếm được lắp ráp hoàn chỉnh, ánh sáng dị thường bị kìm nén hoàn hảo trong chuôi kiếm. Vị Fixer vung thử và reo lên kinh ngạc trước sự ổn định phi thường của vũ khí, thưởng bạn một khoản tiền lớn!',
        resultEn: 'Assembled flawlessly, the aberrant luminescence was perfectly contained within the grip. Testing the balance, the Fixer marveled at the stability and showered you in coin!',
        meritAdd: 28,
        effects: { rep: +30, wealth: +70, resonance: +18, sanity: +8 }
      },
      {
        labelVi: 'Hòa quyện một phần máu của chính bạn vào khuôn đúc để tăng tính liên kết tâm linh',
        labelEn: 'Temper the casting mold with a drop of your own blood for psychic attunement',
        resultVi: 'Lò rèn bùng lên ngọn lửa màu lam ma mị. Lưỡi kiếm rèn ra đạt độ sắc bén thần thoại và có khả năng tương tác sâu sắc với cảm xúc người cầm.',
        resultEn: 'Flames flared phantom sapphire. The blade attained mythic sharpness, resonating in uncanny harmony with its bearer’s soul.',
        meritAdd: 25,
        effects: { health: -15, rep: +28, wealth: +55, resonance: +25 }
      }
    ]
  },
  {
    id: 'ws_allonge_rapier_molecular_grind',
    age: [21, 72],
    major: true,
    weight: 45,
    need: { jobs: ['Workshop Craftsman'] },
    vi: '[Mài Lưỡi Kiếm Liễu Độ Dày Phân Tử · Cinq Allonge Rapier] Một quý cô kiếm sĩ Cinq Section 3 đặt hàng một thanh liễu kiếm Allonge siêu mảnh, nhẹ dưới 300 gram nhưng phải chịu được va đập trực diện với đại chùy bọc thép mà không gãy. Bài toán đòi hỏi kỹ thuật mài dũa phân tử tinh xảo nhất của nghề rèn.',
    en: '[Cinq Allonge Rapier Molecular Grind] A Cinq Section 3 swordswoman commissions an ultra-slender Allonge rapier: weighing under 300 grams yet capable of parrying heavy kinetic mauls without fracturing. A challenge demanding peak molecular grinding craftsmanship.',
    choices: [
      {
        labelVi: 'Sử dụng bột kim cương nano mài thủ công suốt 48 giờ liên tục',
        labelEn: 'Grind the edge with nano-diamond slurry across 48 continuous hours',
        resultVi: 'Lưỡi kiếm khi hoàn thành mỏng đến mức gần như vô hình dưới ánh sáng, nhẹ bẫng và sắc ngọt đến rợn người. Nữ kiếm sĩ Cinq cúi chào bạn với lòng biết ơn sâu sắc, giới thiệu cả phân hội Cinq đến xưởng bạn.',
        resultEn: 'The finished rapier was so slender it was nearly invisible in daylight, terrifyingly razor-sharp. The Cinq duelist bowed deeply, directing her entire Section to your shop.',
        meritAdd: 24,
        effects: { rep: +26, wealth: +52, sanity: +8, resonance: +10 }
      },
      {
        labelVi: 'Lắp thêm lò xo giảm chấn vi mô bên trong chuôi kiếm để hấp thụ phản lực',
        labelEn: 'Install micro-damper springs within the hilt to absorb heavy recoil',
        resultVi: 'Thanh kiếm vừa giữ được trọng lượng nhẹ vừa bảo vệ cổ tay kiếm sĩ trước các đòn đánh nặng nề. Khách hàng vô cùng hài lòng với thiết kế thông minh của bạn.',
        resultEn: 'The rapier retained featherweight agility while shielding the duelist’s wrist against blunt shocks. Highly pleased, the client praised your ingenuity.',
        meritAdd: 20,
        effects: { rep: +20, wealth: +38, sanity: +6 }
      }
    ]
  },
  {
    id: 'ws_workshop_apprentice_legacy',
    age: [26, 80],
    major: true,
    weight: 50,
    need: { jobs: ['Workshop Craftsman'] },
    forbids: ['HasWorkshopApprentice'],
    vi: '[Người Kế Thừa Lò Rèn · Đứa Trẻ Backstreets] Một đứa trẻ mồ côi Backstreets với đôi bàn tay đầy vết bỏng và đôi mắt sáng ngời quỳ trước cửa lò rèn của bạn trong màn mưa. Nó xin được quét dọn tro than và gánh nước không công, chỉ để được học nghệ thuật rèn thép và cơ khí của bạn.',
    en: '[The Forge Apprentice · Child of the Alleys] A scarred Backstreet orphan with blistered hands and burning eyes kneels before your forge in the rain. The child begs to sweep ashes and haul water for free, merely to learn your craft of steel and kinematics.',
    choices: [
      {
        labelVi: 'Nhận đứa trẻ vào xưởng làm Đồ Đệ Kế Thừa, truyền dạy bí quyết luyện kim',
        labelEn: 'Take the child in as your Sworn Apprentice, passing down your metallurgy',
        resultVi: 'Đứa trẻ học việc chăm chỉ ngày đêm, giúp lò rèn vận hành trơn tru hơn và luôn tràn ngập sức sống mới. Bạn không còn đơn độc trên con đường của một người thợ rèn giữa The City lạnh lẽo!',
        resultEn: 'The apprentice labored tirelessly, bringing warmth and vital momentum to your smithy. You were no longer alone on the craftsman’s arduous journey!',
        meritAdd: 30,
        flagsAdd: ['HasWorkshopApprentice'],
        effects: { rep: +25, sanity: +20, wealth: +15, network: +18 }
      },
      {
        labelVi: 'Cho đứa trẻ một túi tiền Ahn và chiếc áo khoác ấm rồi khuyên nó tìm công việc an toàn hơn',
        labelEn: 'Give the child a pouch of Ahn and a warm coat, advising a safer path',
        resultVi: 'Nghề thợ rèn đầy khói bụi, độc hại và nguy hiểm đến tính mạng. Bạn giúp đứa trẻ có bữa ăn no ấm mà không phải chịu khổ cực như bạn thuở ban đầu.',
        resultEn: 'The forge is toxic and peril-laden. You spared the child the grueling hardships you endured, giving them means to survive the winter.',
        effects: { sanity: +12, wealth: -8 }
      }
    ]
  }
];
