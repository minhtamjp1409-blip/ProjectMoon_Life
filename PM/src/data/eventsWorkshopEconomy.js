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
  }
];
