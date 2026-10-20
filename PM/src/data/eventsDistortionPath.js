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
        labelVi: 'Bùng nổ toàn bộ sức mạnh dị thể trong trận huyết chiến sinh tử',
        labelEn: 'Unleash your entire distorted essence in a cataclysmic last stand',
        resultVi: 'Trận chiến xé toạc bầu trời đêm The City. Bạn đánh gãy một phần vũ khí của Color Fixer trước khi trái tim dị thể của bạn ngừng đập. Tên tuổi của bạn sẽ mãi mãi được ghi vào hồ sơ tuyệt mật của Hana Association như một Ngôi sao Đen tối.',
        resultEn: 'The duel tore open the nocturnal firmament. You shattered part of the Color’s relic before your warped core finally shattered. Your name is etched into Hana’s classified archives as a Sovereign Dark Star.',
        flagsAdd: ['distort_color_clash_done'],
        effects: { health: -100 } // Heroic tragic climax death
      }
    ]
  }
];
