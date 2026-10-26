/**
 * Project Moon Universe - Color Fixer Expansion & Living Legend Suite
 * Adds dedicated daily atmosphere lines and rapid 15s dilemma moments for Color Fixers.
 * Reflects the immense solitary gravity, reputation, and burdens of a living City Legend.
 */

import { M, C, I, D } from './storyKit.js';

// ============================================================================
// 1. COLOR FIXER EXPANSION MINORS (15-second Quick Dilemmas & Rapid Stakes)
// ============================================================================

const CM = (id, vi, en, choices, ignore) =>
  M(id, [24, 99], { jobs: ['Color Fixer'] }, vi, en, choices, ignore, { requires: ['ColorFixer'] });

export const COLOR_EXPANSION_MINORS = [
  CM('m_color_rookie_tavern_challenge',
    '[Thách đấu tại quán rượu] Một Fixer Grade 1 trẻ tuổi, mắt rực lửa tham vọng, bước tới bàn bạn và rút thanh kiếm ra cắm ngập mặt bàn: “Người ta nói Color là bất khả chiến bại. Hãy nhận một kiếm của tôi để chứng minh điều đó!”',
    '[Tavern Rookie Challenge] An ambitious young Grade 1 Fixer plants his blade into your tavern table: “They claim Colors are untouchable. Take one stroke from me to prove it!”',
    [
      C('Dùng hai ngón tay bẻ gãy mũi kiếm của đối phương trong một nhịp thở',
        'Snap their blade with two fingers in a single breath',
        'Mảnh thép rơi leng keng xuống sàn. Người Fixer trẻ tái mặt lùi lại ba bước rồi cúi đầu tạ tội vì sự ngông cuồng.',
        'Steel fragments clatter to the floorboards. The rookie blanches, stumbling back three paces to bow in apology.',
        { rep: 4, merit: 6, sanity: 2 }),
      C('Nâng ly rượu mời người trẻ ngồi xuống và chỉ ra năm sơ hở trong thế đứng',
        'Raise your cup, inviting them to sit and pointing out five flaws in their stance',
        'Người Fixer lắng nghe từng lời như nuốt lấy từng giọt nước quý. Người ấy đặt lên bàn ba mươi Ahn tiền rượu rồi lui ra.',
        'The rookie hangs on every word like sacred scripture, leaving thirty Ahn for the tab before departing with deep reverence.',
        { sanity: 4, network: 3, rep: 3, wealth: 4 })
    ],
    I('Bạn không thèm ngẩng đầu. Khí thế của bạn khiến đối phương tự động tra kiếm vào vỏ rút lui.', 'You do not glance up. Your sheer aura compels them to sheath steel and withdraw.', { rep: 2 })
  ),

  CM('m_color_seven_emergency_courier',
    '[Công văn khẩn từ Seven Association] Một liên lạc viên của Seven Association thở không ra hơi đặt lên bàn bạn tập tài liệu niêm phong ba lớp: “Một tổ chức tà giáo chuẩn bị kích hoạt bẫy Singularity tại District 14. Chỉ cần chữ ký ủy thác của ngài, chúng tôi sẽ điều động mười văn phòng can thiệp.”',
    '[Seven Association Emergency Courier] A breathless Seven courier drops a triple-sealed folder: “A cult prepares to trip a Singularity trap in District 14. With your Color authorization, we deploy ten offices immediately.”',
    [
      C('Ký tên bảo chứng và nhận lãnh trách nhiệm tối cao của nhiệm vụ',
        'Sign the warrant, assuming supreme jurisdiction for the deployment',
        'Con dấu Color của bạn in đậm lên trang đầu. Mười văn phòng Fixer lập tức xuất quân dưới danh nghĩa được bạn bảo hộ.',
        'Your signature stamp imprints the header. Ten Fixer offices mobilize instantly under the shield of your Color aegis.',
        { rep: 5, merit: 10, standing: 3 }),
      C('Yêu cầu Seven Association trả trước 25 Ahn phí bảo chứng danh nghĩa',
        'Demand a 25 Ahn retainer fee from Seven Association for endorsement',
        'Người liên lạc viên chi trả không do dự. Danh tiếng của một Color luôn có cái giá tương xứng.',
        'The courier signs the draft without hesitation. A Color’s signature commands its rightful price.',
        { wealth: 25, rep: 2, merit: 4 })
    ],
    I('Bạn chuyển công văn sang cho Hana Association xử lý theo quy trình.', 'You forward the dossier to Hana Association for routine routing.', {})
  ),

  CM('m_color_nest_patron_plea',
    '[Lời van xin của nhà tài phiệt Nest] Một cựu Giám đốc Wing đang bị Beholder B Corp điều tra quỳ sụp dưới chân bạn, dâng lên chiếc rương chứa 50 Ahn: “Xin ngài cho tôi một chỗ trú ẩn trong văn phòng của ngài trong ba ngày!”',
    '[Nest Patron’s Plea] A deposed Wing director facing B Corp scrutiny kneels before you, offering a chest of 50 Ahn: “Grant me sanctuary within your office for three days!”',
    [
      C('Nhận 50 Ahn và cắm cờ Color trước cổng tuyên bố quyền bảo hộ',
        'Accept 50 Ahn and plant your Color standard, claiming sanctuary',
        'Chiếc rương tiền thuộc về bạn. Các thanh tra B Corp đứng ngoài cổng nhìn lá cờ của bạn rồi lặng lẽ rút lui.',
        'The coin is yours. B Corp auditors stare at your emblem at the threshold, then silently withdraw.',
        { wealth: 50, heat: 12, rep: 6, sanity: -3 }),
      C('Từ chối thẳng thừng, không can thiệp vào các bản án của The Head',
        'Refuse outright, declining interference with Head decrees',
        'Người tài phiệt tuyệt vọng bỏ chạy. Bạn giữ vững nguyên tắc không bao giờ đối đầu trực diện với The Head vì tiền bạc.',
        'The patron flees in despair. You uphold the principle of never courting the Head’s wrath for mere coin.',
        { sanity: 4, rep: 3 })
    ],
    I('Bạn đóng cửa văn phòng lại.', 'You close your office doors.', {})
  ),

  CM('m_color_counterfeit_workshop_raid',
    '[Lò rèn vũ khí giả danh] Bạn tình cờ phát hiện một Workshop ngầm đang rèn hàng trăm thanh kiếm khắc biểu tượng Color của bạn để bán cho các tân binh với giá cắt cổ.',
    '[Counterfeit Emblem Workshop] You uncover an underground forge stamping your Color emblem onto cheap blades, fleecing rookie Fixers at extortionate rates.',
    [
      C('Một mình bước vào đập nát toàn bộ lò rèn và thu hồi số tiền lừa đảo',
        'Stride in alone, shatter the furnaces, and seize the illicit coin',
        'Chỉ một đòn quét, toàn bộ búa máy và khuôn đúc vỡ tan tành. Đám thợ rèn quỳ lạy dâng trả 40 Ahn tiền thu lợi bất chính.',
        'A single sweep shatters machine presses and molds. The terrified smiths surrender 40 Ahn in counterfeit proceeds.',
        { wealth: 40, rep: 6, merit: 8 }),
      C('Ép người chủ lò rèn ký hợp đồng cung cấp vật tư chính hãng cho văn phòng bạn',
        'Compel the master smith to become your office’s bonded supplier',
        'Người thợ rèn mừng rỡ vì giữ được tính mạng, thề sẽ dùng thép tốt nhất để phục vụ văn phòng bạn trọn đời.',
        'Overjoyed to keep his life, the master vows his finest alloy to your armory for life.',
        { network: 5, leverage: 4, wealth: 15 })
    ],
    I('Bạn báo địa chỉ cho Zwei Association để họ tự xử lý.', 'You tip off Zwei Association to handle the illicit shop.', { rep: 2 })
  )
];

// ============================================================================
// 2. COLOR FIXER EXPANSION DAILIES (Solitary Legend Atmosphere Lines)
// ============================================================================

export const COLOR_EXPANSION_DAILIES = [
  D('d_color_whispers_in_alley', [24, 99], { jobs: ['Color Fixer'] },
    'Khi bạn bước qua một con hẻm Backstreets, tiếng ồn ào lập tức tắt lịm. Đám cướp đường cúi gằm mặt nép sát vào tường nhường đường.',
    'As you walk through a Backstreet alley, all clamor vanishes. Cutpurses press flat against brickwork, making way in silence.',
    { rep: 1 }),

  D('d_color_hamham_lunch_reverence', [24, 99], { jobs: ['Color Fixer'] },
    'Bạn ngồi ăn bánh mì kẹp tại HamHamPangPang. Người chủ quán run rẩy dâng thêm một phần thịt hun khói hảo hạng và nhất quyết không lấy tiền.',
    'You eat a sandwich at HamHamPangPang. The trembling owner serves extra smoked brisket and refuses payment.',
    { sanity: 1, health: 1 }),

  D('d_color_blade_maintenance_dawn', [24, 99], { jobs: ['Color Fixer'] },
    'Lúc 5:00 AM, bạn mài thanh vũ khí bản mệnh mang sắc Màu của mình. Ánh thép phản chiếu đôi mắt của một người đã chứng kiến quá nhiều sinh tử.',
    'At 5:00 AM, you hone your signature weapon. The steel reflects the eyes of one who has witnessed too many deaths.',
    { sanity: 1 }),

  D('d_color_hana_registry_scroll', [24, 99], { jobs: ['Color Fixer'] },
    'Bản tin danh vọng Hana sáng nay dành trọn trang nhất để nhắc về chiến tích gần nhất của bạn. Mọi văn phòng đều đem nó ra làm thước đo.',
    'Hana’s morning bulletin devotes its front page to your latest deed. Every office in the district measures itself against your shadow.',
    { rep: 1, merit: 1 }),

  D('d_color_anonymous_assassin_envelope', [24, 99], { jobs: ['Color Fixer'] },
    'Một phong bì không người gửi rơi trước cửa phòng bạn: bên trong là một bông hoa héo và lời nhắn cảnh báo từ một kẻ thù giấu mặt.',
    'An unmarked envelope slides under your door: inside lies a withered bloom and a cryptic warning from a veiled foe.',
    { sanity: -1, heat: 1 }),

  D('d_color_rooftop_gaze_dusk', [24, 99], { jobs: ['Color Fixer'] },
    'Đứng trên nóc cao ốc nhìn xuống biển đèn neon của The City, bạn tự hỏi có bao nhiêu người dưới kia đang thầm ao ước có được danh hiệu này.',
    'Standing atop a high-rise gazing across the City’s neon sea, you wonder how many below pray for the mantle you bear.',
    { sanity: 1 }),

  D('d_color_young_apprentice_stare', [24, 99], { jobs: ['Color Fixer'] },
    'Một thiếu niên mang kiếm gỗ đứng từ xa nhìn chằm chằm vào bóng lưng bạn với ánh mắt tôn sùng tuyệt đối.',
    'A youth carrying a wooden practice sword gazes at your back from afar with absolute veneration.',
    { rep: 1 }),

  D('d_color_sweeper_avoidance', [24, 99], { jobs: ['Color Fixer'] },
    'Lúc 3:13 AM, một toán Sweeper trườn qua ngã tư. Cảm nhận được sát khí từ áo choàng Color của bạn, chúng rít lên rồi lùi lại vào bóng tối.',
    'At 3:13 AM, Sweepers crawl across the intersection. Sensing the lethal aura of your Color mantle, they hiss and retreat.',
    { rep: 1 })
];
