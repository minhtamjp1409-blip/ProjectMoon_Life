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
        resultVi: 'Bạn đếm từng đồng tiền Ahn đặt lên bàn cân. Cầm lấy thanh kiếm rực lửa, bạn cảm nhận sức nóng truyền thẳng vào mạch máu. Sức mạnh chiến đấu tăng vượt trội.',
        resultEn: 'You stacked the Ahn onto the scales. Grasping the searing hilt, raw thermal energy surged through your veins. Combat prowess vastly augmented.',
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
        resultVi: 'Toàn bộ tài sản tích cóp cả đời đổi lấy tấm thẻ cư dân bằng kim loại bóng bẩy. Cánh cổng Nest District mở ra, để lại Backstreets mịt mù phía sau lưng bạn.',
        resultEn: 'A lifetime of blood money traded for a polished citizen badge. The fortified Nest gates swung open, leaving the grim Backstreets behind forever.',
        costAhn: 85,
        flagsAdd: ['NestResident', 'Feather'],
        recordsAdd: ['nest_migration'],
        effects: { wealth: -85, sanity: +35, rep: +25 }
      },
      {
        labelVi: 'Từ chối, 85 Ahn là quá đắt đỏ cho một giấc mơ',
        labelEn: 'Decline, 85 Ahn is far too exorbitant for a dream',
        resultVi: 'Bạn quay gót trở lại con hẻm tối. Backstreets vẫn là nhà của bạn, nơi bạn thuộc về.',
        resultEn: 'You turned back into the dimly lit alley. The Backstreets remain your home, where you belong.',
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
        resultVi: 'Cơn đau xé ruột khi xương thịt được kết nối với mạch điện sinh học. Khi vết khâu lành lặn, bạn có thể dễ dàng bóp nát một thanh sắt đặc.',
        resultEn: 'Agonizing fire as nerves fused with bio-circuits. Once healed, your new arm crushed solid rebar like chalk.',
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
      },
      {
        labelVi: 'Gấp danh mục lại và rời phòng khám',
        labelEn: 'Close the catalogue and leave the clinic',
        resultVi: 'Bác sĩ không giữ bạn lại. Ngoài cửa, tiếng máy khoan vẫn chạy; bạn kiểm tra túi tiền rồi đi tiếp.',
        resultEn: 'The doctor does not stop you. The drill keeps running behind the door; you check your purse and walk on.',
        effects: { sanity: -1 }
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
    vi: "[Trạm chữa trị K Corp] Trạm K Corp nhận khách có tiền ngay sát ranh Nest. Dịch xanh chạy trong ống thủy tinh; bảng giá ghi cả chi phí nối lại xương thịt. Nhân viên hỏi bạn cần chữa đến mức nào.",
    en: '[K Corp Bio-Regeneration Pavilion · Singularity Tears] At the border boulevard gleaming under crystal lamps, a licensed K Corp emergency station caters to Fixers and citizens with deep pockets. Within cylindrical stasis vats, swirling emerald Singularity fluid promises instantaneous flesh and nerve reconstitution.',
    choices: [
      {
        labelVi: 'Ngâm mình trọn vẹn trong Buồng Tái Tạo K-Tier (Tốn 48 Ahn)',
        labelEn: 'Full immersion in K-Tier Singularity Restoration Pod (Cost 48 Ahn)',
        resultVi: 'Dòng dịch ngọc bích ùa vào phổi và bao phủ toàn thân mà không hề gây ngạt. Từng vết rách cơ, mô hoại tử và sẹo chém sâu lành lại như một phép màu. Bạn bước ra khỏi kén trong trạng thái sinh lực tràn trề nhất cuộc đời.',
        resultEn: 'The emerald Singularity tears engulfed your form without suffocating. Torn viscera and agonizing combat scars fused seamlessly as if by magic. You stepped from the vat at the pinnacle of physical perfection.',
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
        resultVi: 'Bạn ôm vết thương quay lưng rời đi. K Corp chỉ cứu người giàu, đó là quy luật bất biến của The City.',
        resultEn: 'Clutching your wounds, you turned away. K Corp only saves the affluent, the eternal iron law of The City.',
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
    vi: "[Buồng phục hồi T Corp] Chi nhánh T Corp đề nghị tua cơ thể bạn về trước lúc bị thương. Đồng hồ trên buồng chạy ngược; hợp đồng tính phí theo thời gian thu hồi. Nhân viên đưa bút cho bạn.",
    en: '[T Corp Chrono-Restorative Pod · District 4 Tech] You pause before a licensed temporal restoration outpost harnessing T Corp’s Time Singularity. Forgoing scalpels and stitches, the Chrono-Pod rewinds your biological clock by two subjective weeks, restoring tissues to their state before catastrophic trauma.',
    choices: [
      {
        labelVi: 'Kích hoạt Liệu Trình Tua Ngược Thời Gian Sinh Học (Tốn 52 Ahn)',
        labelEn: 'Initiate Temporal Biological Reversal Treatment (Cost 52 Ahn)',
        resultVi: 'Các bánh răng đồng thau và tinh thể thời gian phát ra tiếng tích tắc nghẹt thở. Trong tích tắc ánh sáng vàng óng bừng lên, toàn bộ tế bào rách nát và độc tố trong máu tự động biến mất về trạng thái nguyên vẹn thuở ban đầu.',
        resultEn: 'Brass chronometer gears ticked in breathless rhythm. A flash of sepia light engulfed the pod; ruptured cells and metabolic toxins rewound cleanly into flawless prior health.',
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
        resultVi: 'Cắn miếng bánh mì giòn rụm với lớp phô mai béo ngậy và thịt mềm tan trong miệng, ngụm trà thảo mộc ấm áp chảy tràn lồng ngực. Mọi đau khổ, sang chấn tinh thần và tiếng thì thầm méo mó tan biến hoàn toàn thành sự bình yên thuần khiết.',
        resultEn: 'Savoring the golden crust overflowing with savory cutlets and molten cheese, washed down by warm herbal brew. Existential dread and lingering distortions dissolved into sheer, unadulterated contentment.',
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
    vi: "[Sảnh nghỉ J Corp] Sau cánh cửa là nước nóng, nhạc jazz và một quầy tiếp tân kín đáo. Dịch vụ hứa giúp bạn nghỉ ngơi, đồng thời sắp xếp lại dấu vết của phi vụ gần đây. Giá niêm yết không rẻ.",
    en: '[J Corp Luxury Jazz & Thermal Spa Lounge · District 10] Silky saxophone melodies blend with bubbling sulfur mineral baths inside J Corp’s opulent relaxation haven. A sanctuary designed to melt away City trauma, suppress Distortion resonance, and cool down faction Heat.',
    choices: [
      {
        labelVi: 'Bao trọn Gói Nghỉ Dưỡng VIP Thượng Hạng & Trị Liệu Trầm Hương (Tốn 42 Ahn)',
        labelEn: 'Reserve Presidential VIP Suite & Aromatic Thermal Soak (Cost 42 Ahn)',
        resultVi: 'Ngâm mình trong dòng nước ấm thơm nồng tinh dầu thảo mộc và thưởng thức rượu vang, toàn bộ căng thẳng thần kinh tan rã. Lực lượng truy đuổi cũng mất dấu bạn giữa khu phức hợp sòng bạc bảo mật cao.',
        resultEn: 'Submerged in thermal minerals laced with aromatic oils while sipping fine vintage, every ounce of nervous tension melted away. Pursuers completely lost your trail in the high-security district.',
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
        resultVi: 'Bộ áo khoác và giáp bảo hộ được đan xen sợi siêu chịu lực chống cắt xé. Cơ thể bạn như được bao bọc trong một pháo đài thép di động, tự tin đương đầu với mọi đòn hiểm hóc.',
        resultEn: 'Your coat was woven with hyper-tensile ballistic weave and carbon plating. Moving like a walking armored citadel, your resilience against fatal blows skyrocketed.',
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
    vi: "[Chỗ trú của Seven] Bạn tìm đến cửa mật mã của Seven Association. Bên trong có giường bệnh, hồ sơ và người biết cách thương lượng với kẻ đang săn bạn. Nhân viên chỉ mở cửa sau khi nghe tên bạn.",
    en: '[Sanctuary at Seven Association Safehouse] Hunted by adversaries or exhausted from syndicate turf wars, you signal the coded door of Seven Association, The City’s apex information brokers. Behind reinforced blast doors lies diplomatic immunity, confidential surgery, and record laundering.',
    choices: [
      {
        labelVi: 'Mua Trọn Gói Tẩy Rửa Hồ Sơ & Điều Trị Y Tế Bí Mật (Tốn 55 Ahn)',
        labelEn: 'Purchase Complete Identity Laundering & Covert Trauma Care (Cost 55 Ahn)',
        resultVi: 'Các thám tử Seven lập tức can thiệp xóa sạch camera và tài liệu lưu trữ của các phe phái, trong khi bác sĩ ngoại giao vá lành từng vết đạn trên người bạn. Bạn bước ra hoàn toàn tự do và khỏe mạnh.',
        resultEn: 'Seven intelligence officers purged security feeds and faction bounties while surgeons sealed every ballistic tear under diplomatic privilege. You stepped out entirely cleared and restored.',
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
    vi: "[Bánh thịt District 23] Quán của Pierre thơm mùi bơ nướng. Người bán đặt một lát bánh thịt trước mặt bạn, không nói nguyên liệu lấy từ đâu. Bạn đói đến mức tay đã chạm đĩa.",
    en: '[District 23 Underground Gastronomy · Pierre’s Savory Pie] In an alley bordering District 23, an illicit bistro radiates the intoxicating scent of spiced pastry and rich caramelized broth. The artisan meat pie here boasts legendary regenerative potency, rekindling near-fatal exhaustion within minutes.',
    choices: [
      {
        labelVi: 'Thưởng thức Chiếc Bánh Thịt Thượng Hạng Của Nghệ Nhân (Tốn 25 Ahn)',
        labelEn: 'Savor the Artisan Meat Pie Special (Cost 25 Ahn)',
        resultVi: 'Vị giác của bạn bùng nổ trước sự hòa quyện hoàn hảo của thịt và thảo mộc. Dù có một thoáng rùng mình ớn lạnh về nguồn gốc nguyên liệu của Quận 23, cơ thể bạn phục hồi mãnh liệt như chưa từng bị thương.',
        resultEn: 'Flavors exploded across your palate in exquisite harmony. Though an uncanny shiver gripped your spine regarding District 23’s ingredient sourcing, miraculous vitality flooded your muscles and bones.',
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

  // =========================================================================
  // ------------------------------------------------------------------ Workshop: Rich Craft Lore & Dilemmas
  // =========================================================================
  // WORKSHOP ARTISAN DIVERSITY: COMMISSIONS, ATELIER PATENTS & GUILD RIVALRIES
  // =========================================================================
];
