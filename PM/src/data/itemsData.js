/**
 * Project Moon Universe - Items, Equipment, Augments & Consumables Catalog
 * Authentic to Project Moon canon: Workshops (Atelier Logic, Stigma, Zelkova, Crystal),
 * Wings (K Corp Ampoules, P Corp Preservation, Old G Corp bio-grafts), and Nest Permits.
 */

export const ITEM_TYPES = {
  WEAPON: 'weapon',
  ARMOR: 'armor',
  CONSUMABLE: 'consumable',
  SPECIAL: 'special'
};

export const ITEMS_CATALOG = [
  // ==========================================
  // WEAPONS (Vũ khí Workshop)
  // ==========================================
  {
    id: 'wpn_workshop_katana',
    type: ITEM_TYPES.WEAPON,
    tier: 'Canard',
    costAhn: 25,
    nameVi: 'Katana Workshop tiêu chuẩn',
    nameEn: 'Standard Workshop Katana',
    descVi: 'Lưỡi kiếm tôi bằng thép carbon cao cấp từ một xưởng vô danh ở Backstreets. Đủ sắc để chém đứt áo giáp của chuột cống.',
    descEn: 'High-carbon steel forged in an unnamed Backstreet forge. Sharp enough to pierce scavenging rat armor.',
    stats: { rep: +4 },
    combatPower: 8,
    skillBonus: { combat: 10 }
  },
  {
    id: 'wpn_stigma_blade',
    type: ITEM_TYPES.WEAPON,
    tier: 'Urban Legend',
    costAhn: 65,
    nameVi: 'Lưỡi hỏa kiếm Stigma Atelier',
    nameEn: 'Stigma Atelier Heat Blade',
    descVi: 'Vũ khí đặc trưng của Stigma Atelier với rãnh nhiệt sinh nhiệt ma sát cực lớn. Mỗi nhát chém để lại vết cháy xém rực đỏ.',
    descEn: 'Signature Stigma Atelier weapon with thermal induction channels. Every slash leaves a smoldering incandescent brand.',
    stats: { rep: +10, heat: +5 },
    combatPower: 18,
    skillBonus: { combat: 22 }
  },
  {
    id: 'wpn_atelier_logic_revolver',
    type: ITEM_TYPES.WEAPON,
    tier: 'Urban Plague',
    costAhn: 110,
    nameVi: 'Súng ổ quay Atelier Logic',
    nameEn: 'Atelier Logic Custom Revolver',
    descVi: 'Khẩu súng chính xác do Atelier Logic chế tác, tuân thủ nghiêm ngặt quy định vũ khí của The Head. Đạn nặng có thể xé toạc tấm chắn kinetic.',
    descEn: 'Precision handgun by Atelier Logic, strictly adhering to The Head’s firearms tax code. Heavy rounds breach kinetic shields.',
    stats: { rep: +16, network: +6 },
    combatPower: 30,
    skillBonus: { combat: 35 }
  },
  {
    id: 'wpn_zelkova_hammer',
    type: ITEM_TYPES.WEAPON,
    tier: 'Urban Nightmare',
    costAhn: 160,
    nameVi: 'Đại chùy Zelkova Workshop',
    nameEn: 'Zelkova Heavy War Hammer',
    descVi: 'Khối hợp kim siêu nặng từ xưởng Zelkova huyền thoại. Một đòn giáng xuống có thể nghiền nát cả cơ thể sinh học lẫn khung xương máy.',
    descEn: 'Massive alloy weapon from the legendary Zelkova Workshop. One crushing blow pulps both flesh and cybernetic frames.',
    stats: { rep: +24 },
    combatPower: 45,
    skillBonus: { combat: 48 }
  },

  // ==========================================
  // ARMOR & AUGMENTS (Áo giáp & Cấy ghép cơ thể)
  // ==========================================
  {
    id: 'arm_trenchcoat_padded',
    type: ITEM_TYPES.ARMOR,
    tier: 'Canard',
    costAhn: 20,
    nameVi: 'Măng-tô gia cố Backstreets',
    nameEn: 'Reinforced Backstreets Trenchcoat',
    descVi: 'Áo khoác dài may lót sợi kevlar chống đâm chém và che giấu vũ khí nhỏ. Đồng phục bất thành văn của Fixer tập sự.',
    descEn: 'Heavy trenchcoat lined with slash-resistant weave. The unwritten uniform of rookie Backstreet Fixers.',
    stats: { health: +10 },
    defense: 6
  },
  {
    id: 'arm_old_gcorp_graft',
    type: ITEM_TYPES.ARMOR,
    tier: 'Urban Legend',
    costAhn: 70,
    nameVi: 'Cấy ghép sinh học Old G Corp',
    nameEn: 'Old G Corp Biomimetic Graft',
    descVi: 'Cánh tay sinh học biến đổi gen từ tàn dư Smoke War của Old G Corp. Tăng sức bền và chịu đòn phi thường nhưng làm giảm nhẹ độ tỉnh táo.',
    descEn: 'Genetic graft salvaged from Old G Corp’s Smoke War stockpiles. Grants monstrous durability at a slight cost to sanity.',
    stats: { health: +25, sanity: -6, rep: +8 },
    defense: 16
  },
  {
    id: 'arm_pcorp_forcefield',
    type: ITEM_TYPES.ARMOR,
    tier: 'Urban Plague',
    costAhn: 125,
    nameVi: 'Trường bảo tồn P Corp cá nhân',
    nameEn: 'P Corp Portable Preservation Field',
    descVi: 'Thiết bị đeo thắt lưng khai thác Singularities của P Corp, tạo màng chắn bảo tồn không gian chặn đứng sát thương chí mạng.',
    descEn: 'Belt-mounted emitter harnessing P Corp’s Preservation Singularity to project a kinetic deflection membrane.',
    stats: { health: +35, rep: +15 },
    defense: 28
  },

  // ==========================================
  // CONSUMABLES & MEDICAL TECH (Vật phẩm y tế & Thuốc phục hồi)
  // ==========================================
  {
    id: 'con_kcorp_ampoule',
    type: ITEM_TYPES.CONSUMABLE,
    tier: 'Urban Legend',
    costAhn: 45,
    nameVi: 'Ống tiêm phục hồi HP K Corp',
    nameEn: 'K Corp HP Ampoule',
    descVi: 'Chất lỏng màu lục bảo kỳ diệu từ Singularity của K Corp. Tự động kích hoạt khi nhận đòn chí tử, chữa lành tế bào và cứu bạn khỏi cái chết.',
    descEn: 'Emerald elixir distilled from K Corp’s Tearful Singularity. Auto-shatters upon fatal trauma, restoring 50 HP and defying death.',
    autoReviveHp: 50
  },
  {
    id: 'con_enkephalin_inhaler',
    type: ITEM_TYPES.CONSUMABLE,
    tier: 'Urban Myth',
    costAhn: 25,
    nameVi: 'Bình hít Enkephalin tinh khiết',
    nameEn: 'Refined Enkephalin Inhaler',
    descVi: 'Dẫn xuất Enkephalin cô đặc giúp ổn định tinh thần tức thì, xua tan ảo giác và tiếng thì thầm của Carmen khi Sanity xuống quá thấp.',
    descEn: 'Concentrated Enkephalin mist that stabilizes fragile minds, quieting hallucinations and Carmen’s siren call.',
    sanityRestore: 35
  },
  {
    id: 'con_smoke_inhaler',
    type: ITEM_TYPES.CONSUMABLE,
    tier: 'Urban Myth',
    costAhn: 18,
    nameVi: 'Khói thuốc kích thích Backstreets',
    nameEn: 'Backstreet Smoke Catalyst',
    descVi: 'Khói mù đặc quánh giúp tăng phản xạ né tránh và hưng phấn trong các cuộc chạm trán nguy hiểm.',
    descEn: 'Dense vapor cocktail boosting evasion reflexes during lethal Backstreet skirmishes.',
    statBonus: { health: 10, rep: 4 }
  },

  // ==========================================
  // SPECIAL & LUXURY (Thị thực Nest & Giấy tờ đặc quyền)
  // ==========================================
  {
    id: 'spc_nest_migration_permit',
    type: ITEM_TYPES.SPECIAL,
    tier: 'Star of the City',
    costAhn: 85,
    nameVi: 'Thị thực định cư Nest (Nest Visa)',
    nameEn: 'Nest Migration Permit',
    descVi: 'Giấy phép cư trú chính thức đóng dấu vàng của Hội đồng Wing. Cho phép rời bỏ Backstreets đầy rẫy Sweeper hoặc vượt Bức Tường từ Outskirts để trở thành Feather chính thức.',
    descEn: 'Official golden-stamped resident visa. Grants passage out of the Sweeper-infested Backstreets or across the Wall from the Outskirts into a fortified Nest.',
    flagGranted: 'NestResident'
  },
  {
    id: 'spc_devyat_courier_pass',
    type: ITEM_TYPES.SPECIAL,
    tier: 'Urban Plague',
    costAhn: 45,
    nameVi: 'Thẻ thông hành Devyat Association',
    nameEn: 'Devyat Courier Border Pass',
    descVi: 'Thẻ bài đồng nghiệp hoặc lệnh ủy thác thông quan của Hiệp hội Devyat. Cho phép di chuyển qua các trạm kiểm soát Bức Tường giữa Outskirts và các Quận nội đô.',
    descEn: 'Official courier badge recognized by Wall checkpoint guards. Authorizes safe passage between the Outskirts and City Districts.',
    flagGranted: 'DevyatPass'
  },
  {
    id: 'spc_hana_audit_waiver',
    type: ITEM_TYPES.SPECIAL,
    tier: 'Urban Nightmare',
    costAhn: 85,
    nameVi: 'Giấy miễn thanh tra Hana Association',
    nameEn: 'Hana Association Audit Exemption',
    descVi: 'Tài liệu mật mua từ môi giới ngầm, xóa sạch dấu vết Taboo và hạ nhiệt truy nã từ Syndicates.',
    descEn: 'Underground diplomatic waiver wiping active Taboo points and cooling Syndicate heat.',
    tabooClear: 2,
    heatClear: 25
  },
  // ==========================================
  // DUNGEON RELICS & SINGULARITIES (Chiến lợi phẩm Hầm ngục)
  // ==========================================
  {
    id: 'rel_qlippoth_core',
    type: ITEM_TYPES.SPECIAL,
    tier: 'Star of the City',
    costAhn: 120,
    nameVi: 'Lõi Qlippoth L Corp',
    nameEn: 'L Corp Qlippoth Core',
    descVi: 'Lõi phát quang kỳ tích L Corp thu hồi từ lòng tàn tích. Hào quang này xoa dịu thần kinh và giảm 15% áp lực tâm thần trong mọi chuyến thám hiểm.',
    descEn: 'A luminescent L Corp relic salvaged from the deep ruins. Its glow soothes the nerves and eases mental strain by 15% on delves.',
    statBonus: { sanity: 12, resonance: 6 }
  },
  {
    id: 'rel_warp_shard',
    type: ITEM_TYPES.SPECIAL,
    tier: 'Star of the City',
    costAhn: 140,
    nameVi: 'Mảnh Dị Chiều W Corp',
    nameEn: 'W Corp Dimensional Shard',
    descVi: 'Mảnh tinh thể kết tinh từ không gian dị chiều của chuyến tàu WARP. Giúp người mang né tránh các vết nứt không gian hiểm hóc.',
    descEn: 'A crystal shard coalesced from dimensional folds of the WARP Train. Helps the bearer slip past perilous rift anomalies.',
    statBonus: { rep: 8, network: 10 }
  },
  {
    id: 'wpn_carnival_rapier',
    type: ITEM_TYPES.WEAPON,
    tier: 'Urban Nightmare',
    costAhn: 95,
    nameVi: 'Liễu Kiếm Huyết Hội',
    nameEn: 'Carnival Blood Rapier',
    descVi: 'Thanh liễu kiếm mảnh mai nhuộm đẫm huyết dịch từ lễ hội La Manchaland. Mỗi đường đâm chuẩn xác đều hút lấy sinh lực đối phương.',
    descEn: 'A slender rapier bathed in carnival blood from La Manchaland. Precise thrusts leach the enemy vitality.',
    stats: { rep: 12 },
    combatPower: 26,
    skillBonus: { combat: 28 }
  },
  {
    id: 'rel_pallid_oil',
    type: ITEM_TYPES.SPECIAL,
    tier: 'Urban Nightmare',
    costAhn: 80,
    nameVi: 'Dầu Tinh Chất Cá Voi Trắng',
    nameEn: 'Pallid Whale Essence Oil',
    descVi: 'Chất dầu sáp chiết xuất từ làn nước trắng xóa của Đại Hồ U Corp. Hương thơm lạnh buốt giúp neo giữ lý trí trước cơn hoảng loạn.',
    descEn: 'Waxy oil distilled from the pallid waves of U Corp Great Lake. Its freezing scent anchors reason against encroaching panic.',
    statBonus: { sanity: 14 }
  },
  {
    id: 'rel_ruin_monolith',
    type: ITEM_TYPES.SPECIAL,
    tier: 'Star of the City',
    costAhn: 130,
    nameVi: 'Phiến Đá Khắc Outskirts',
    nameEn: 'Ancient Outskirts Monolith',
    descVi: 'Mảnh phiến đá cổ chạm khắc ký tự vượt ngoài tầm hiểu biết của The City. Phát ra dao động cộng hưởng siêu nhiên vĩnh cửu.',
    descEn: 'An ancient tablet fragment engraved with glyphs pre-dating the City. Emits a continuous supernatural resonance.',
    statBonus: { resonance: 16 }
  },
  {
    id: 'rel_sweeper_fluid',
    type: ITEM_TYPES.SPECIAL,
    tier: 'Urban Plague',
    costAhn: 60,
    nameVi: 'Huyết Thanh Sweeper 3:13',
    nameEn: '3:13 Sweeper Catalyst Fluid',
    descVi: 'Dung dịch sinh học thu được sau khi một bộ vest Sweeper tan rã lúc rạng sáng. Đựng trong bình chịu áp lực cao của Workshop.',
    descEn: 'Bio-fluid collected when a Sweeper suit dissolved at dawn. Kept in a reinforced Workshop pressure flask.',
    statBonus: { health: 10, rep: 6 }
  },
];

export function getItemById(id) {
  return ITEMS_CATALOG.find((item) => item.id === id) || null;
}
