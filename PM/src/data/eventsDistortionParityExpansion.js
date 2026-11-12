/**
 * Project Moon Universe - Distortion Route Expansion & Parity Suite
 * Deepens the psychological, visceral, and reality-warping experience of a Distorted entity.
 * Provides high-stakes gamified dilemmas, atmospheric sensory dailies, and apex calamity arcs.
 */

import { M, C, I, D } from './storyKit.js';
import { CLAW_DUNGEON_ID } from './dungeonClaw.js';

// ============================================================================
// 1. DISTORTION EXPANSION MINORS (15-second Rapid Dilemmas)
// ============================================================================

const DM = (id, vi, en, choices, ignore) =>
  M(id, [18, 140], { jobs: ['Distortion'] }, vi, en, choices, ignore, { requires: ['Distorted'] });

export const DISTORTION_PARITY_MINORS = [
  DM('m_distort_carmen_white_petal_wager',
    '[Cánh hoa trắng] Một cánh hoa rơi lên bàn tay đã đổi dạng của bạn. Carmen hỏi: “Bạn còn định giấu cơn giận ấy bao lâu?” Cánh hoa không tan khi bạn chạm vào.',
    '[A white petal] A petal lands on your altered hand. Carmen asks, “How much longer will you hide that anger?” The petal does not dissolve when you touch it.',
    [
      C('Giữ cánh hoa và nói ra cơn giận',
        'Keep the petal and say what angers you',
        'Bàn tay bạn nóng lên. Lớp vỏ quanh các khớp dày thêm; khi mở nắm tay, cánh hoa đã nát.',
        'Your hand warms. The shell around your joints thickens; when you open your fist, the petal is crushed.',
        { resonance: 8, health: 12, sanity: -6, rep: 4 }),
      C('Thổi cánh hoa đi và nhắc lại tên mình',
        'Blow the petal away and repeat your name',
        'Cánh hoa tan thành sương mù. Bạn lặp lại tên cũ ba lần; cơn đau đầu dịu đi đôi chút.',
        'The petal dissolves into mist. You repeat your old name three times; the migraine subsides slightly.',
        { sanity: 6, resonance: -2 })
    ],
    I('Cánh hoa tự úa tàn trên mặt đường lạnh.', 'The petal withers on the cold asphalt.', {})
  ),

  DM('m_distort_shi_assassin_ambush',
    '[Phục kích trên mái] Hai Fixer của Shi Association đợi trên mái tôn. Khi bạn đi qua, một người nhảy xuống chặn đầu hẻm, người kia rút đao phía sau.',
    '[Rooftop ambush] Two Shi Association Fixers wait on a tin roof. As you pass, one drops into the alley ahead while the other draws a blade behind you.',
    [
      C('Đánh vào lưỡi đao gần nhất để mở lối',
        'Strike the nearest blade to clear a path',
        'Lưỡi đao sứt một mảng. Bạn lách qua người chắn đầu hẻm trước khi đồng đội của họ kịp áp sát.',
        'A chip breaks from the blade. You slip past the Fixer ahead before their partner can close in.',
        { health: -4, rep: 6, resonance: 4 }),
      C('Dùng tiếng rít trong cổ họng làm họ khựng lại',
        'Use the noise in your throat to make them hesitate',
        'Cả hai bịt tai trong một nhịp. Bạn đi qua khoảng trống ấy; phía sau có tiếng họ báo vị trí của bạn qua máy liên lạc.',
        'Both cover their ears for a moment. You pass through the gap; behind you, one reports your position over the radio.',
        { sanity: -3, rep: 8, heat: 5 })
    ],
    I('Bạn lùi qua con hẻm bên cạnh.', 'You retreat through the next alley.', { sanity: 1 })
  ),

  DM('m_distort_fear_harvest_market',
    '[Chợ Backstreets] Bạn đi ngang khu chợ đang dọn hàng. Mấy người bán nhận ra bạn, kéo cửa sắt xuống và nấp sau quầy.',
    '[Backstreets market] You pass a market as stalls are closing. Several sellers recognize you, pull down their shutters and hide behind the counters.',
    [
      C('Đứng lại giữa chợ, mặc họ bỏ chạy',
        'Stay in the market and let them flee',
        'Cơn căng trong người bạn dịu xuống khi khu chợ trống hẳn. Một vết nứt trên lớp vỏ khép lại; người bán sẽ kể chuyện này cho Office.',
        'The tension in your body eases as the market empties. A crack in your shell closes; the sellers will tell an Office about this.',
        { health: 10, resonance: 6, sanity: -4, rep: 5 }),
      C('Đi qua mà không chạm vào quầy hàng',
        'Pass without touching a stall',
        'Bạn đi hết dãy quầy rồi nghe tiếng cửa sắt mở lại phía sau. Không ai đuổi theo.',
        'You reach the end of the stalls and hear the shutters opening behind you. No one follows.',
        { sanity: 5, resonance: -2, rep: -2 })
    ],
    I('Bạn biến mất vào khúc quanh của con hẻm.', 'You vanish around the alley turn.', {})
  ),

  DM('m_distort_mirror_fragment_reflection',
    '[Mặt nước trước cửa tiệm] Nước mưa đọng cạnh thềm. Khi cúi xuống, bạn thấy lớp vỏ mới che mất phần lớn khuôn mặt cũ.',
    '[Water by the shop] Rainwater gathers beside a doorstep. When you look down, the new shell hides most of the face you remember.',
    [
      C('Nhìn kỹ hình dạng mới',
        'Study your new shape',
        'Bạn nhận ra vết nứt trên má đang khép lại. Người bán hàng phía trong kéo rèm xuống khi thấy bạn cúi gần cửa.',
        'You notice a crack along your cheek closing. The shopkeeper inside draws the curtain when you lean near the door.',
        { sanity: -5, resonance: 8, rep: 4 }),
      C('Dẫm xuống vũng nước rồi bước tiếp',
        'Step into the puddle and keep walking',
        'Nước bắn lên ống quần. Bạn tránh nhìn cửa kính ở tiệm kế bên.',
        'Water splashes your trousers. You avoid the next shop window.',
        { sanity: 4, health: -2 })
    ],
    I('Gió đêm thổi làm gợn sóng mặt nước.', 'The night wind ripples the water surface.', {})
  ),

  DM('m_distort_street_child_encounter',
    '[Đứa trẻ bên thùng rác] Đứa trẻ nhặt ve chai đứng khựng lại khi thấy bạn. Nó chìa nửa mẩu bánh, vẫn giữ tay kia trên nắp thùng để có thể chạy.',
    '[The child by the bin] A child collecting scrap freezes when they see you. They offer half a loaf, one hand still on the bin lid in case they need to run.',
    [
      C('Nhận bánh và đặt lại một mảnh vỏ bóng',
        'Take the bread and leave a polished piece of shell',
        'Đứa trẻ đợi bạn đi xa mới nhặt mảnh vỏ lên. Khi bạn quay lại, nó vẫn còn đứng đó.',
        'The child waits until you have moved away before picking up the shell. When you look back, they are still there.',
        { sanity: 8, resonance: -3, network: 2 }),
      C('Ra hiệu cho đứa trẻ đi trước khi toán Fixer tới',
        'Signal the child to leave before the Fixers arrive',
        'Đứa trẻ ôm bánh chạy đi. Đèn pha của toán Fixer quét qua bức tường nơi nó vừa đứng.',
        'The child runs with the bread. A Fixer searchlight sweeps the wall where they had been standing.',
        { sanity: 2, rep: 4, heat: 4 })
    ],
    I('Bạn quay đi và để đứa trẻ ở lại với bãi rác.', 'You turn away, leaving the child to the refuse.', {})
  ),

  DM('m_distort_broken_workshop_weapon_feast',
    '[Máy hỏng của Workshop] Cỗ máy chiến đấu bị bỏ cạnh đống rác, lớp vỏ kim loại đã bung. Bạn thấy phần hợp kim bên trong có cùng màu với các khớp tay mình.',
    '[Discarded Workshop machine] A damaged combat machine lies beside the rubbish, its casing open. The alloy inside is the same color as the joints in your hand.',
    [
      C('Bẻ lấy hợp kim và ghép vào lớp vỏ bị nứt',
        'Take the alloy and fit it over a crack in your shell',
        'Miếng hợp kim bám vào khớp tay. Vết nứt bên dưới thôi đau; mỗi lần cử động, phần mới ghép kêu ken két.',
        'The alloy catches on your arm joint. The crack beneath stops hurting; the new piece creaks whenever you move.',
        { health: 12, resonance: 5, sanity: -3 }),
      C('Đập máy cho tới khi nó ngừng phát tiếng',
        'Break the machine until it stops making noise',
        'Tiếng lạch cạch cuối cùng tắt đi. Bạn bỏ đống linh kiện lại cho người thu mua phế liệu.',
        'The last rattle stops. You leave the parts for a scrap collector.',
        { sanity: 3, rep: 3 })
    ],
    I('Bạn bỏ qua xác máy gỉ sét.', 'You leave the rusted chassis behind.', {})
  ),

  DM('m_distort_spatial_corridor_fold',
    '[Hành lang tự uốn cong] Hai bức tường gạch nơi bạn đứng bỗng nghiêng vào nhau theo nhịp thở của bạn. Một người giao hàng đi lạc đang đứng ở đầu kia ngõ cụt.',
    '[The folding corridor] The two brick walls around you tilt inward with your breathing. A lost courier stands at the far end of the dead-end lane.',
    [
      C('Mở khe tường cho người giao hàng chạy thoát rồi thu phí qua đường',
        'Open a gap in the wall for the courier and take a toll',
        'Người giao hàng để lại túi tiền lẻ rồi lách qua khe gạch vừa hé. Hành lang khép lại ngay sau lưng anh ta.',
        'The courier drops a coin pouch and slips through the narrow gap. The corridor shuts right behind him.',
        { wealth: 8, sanity: 4, resonance: 3 }),
      C('Giữ nguyên bức tường khép kín để thử sức mạnh bóp méo không gian',
        'Keep the wall sealed to test your spatial warping',
        'Bức tường dịch thêm nửa thước dưới ý nghĩ của bạn. Người giao hàng phải trèo qua mái tôn bỏ chạy trong hoảng loạn.',
        'The wall shifts another half meter under your will. The courier scrambles over the tin roof in panic.',
        { resonance: 7, rep: 5, sanity: -4, heat: 4 })
    ],
    I('Bạn thả lỏng hơi thở để bức tường trở về chỗ cũ.', 'You steady your breath and let the wall return to place.', {})
  ),

  DM('m_distort_echo_of_human_name',
    '[Tờ danh sách cũ trên tường] Tờ giấy dán trên cột điện bị mưa làm rách một nửa. Giữa những dòng chữ nhòe mực vẫn còn nguyên họ tên thời con người của bạn.',
    '[The torn roster on the pole] Rain has stripped half the notice pasted to the utility pole. Among the smeared lines, your old human name remains legible.',
    [
      C('Bóc mảnh giấy có tên mình cất vào hốc ngực',
        'Peel off the scrap bearing your name and tuck it into your chest',
        'Mảnh giấy ướt nằm yên dưới lớp vỏ cứng. Đêm đó bạn nhớ lại chính xác giọng của người hay gọi tên ấy.',
        'The damp scrap rests beneath your hard shell. That night you recall the exact voice of the one who used to call it.',
        { sanity: 7, resonance: -3 }, { flagsAdd: ['HumanVoice'] }),
      C('Cào nát tờ giấy để xóa sạch dấu vết người cũ',
        'Claw the notice to shreds to erase the person you were',
        'Vụn giấy trôi xuống cống nước đen. Lồng ngực bạn nhẹ bẫng nhưng lạnh buốt như sắt nguội.',
        'Paper shreds wash down the dark drain. Your chest feels weightless yet cold as quenched iron.',
        { resonance: 6, sanity: -5, heat: -3 })
    ],
    I('Bạn bước qua cột điện mà không dừng lại.', 'You walk past the pole without stopping.', {})
  ),

  DM('m_distort_lcd_pipe_scent',
    '[Mùi khói tẩu đầu ngõ] Cuối con hẻm có mùi thuốc lào rất lạ. Làn khói xanh nhạt không tan trong gió mà quấn quanh cổ tay bạn như đang đo nhịp mạch.',
    '[Pipe smoke at the alley mouth] Strange pipe tobacco scents the far end of the lane. Pale blue smoke refuses to scatter in the wind, coiling around your wrist as if taking your pulse.',
    [
      C('Đứng yên để làn khói đọc hết vết nứt rồi tự tan',
        'Stand still and let the smoke read your cracks before fading',
        'Làn khói lùi lại phía bóng người mặc áo khoác dài. Không có tiếng súng nào vang lên; chỉ có tiếng gõ tẩu xuống bệ cửa.',
        'The smoke draws back toward a figure in a long coat. No shot rings out; only a pipe taps against the sill.',
        { sanity: 5, heat: -4, resonance: 2 }),
      C('Vung tay đánh tan đám khói và gầm cảnh cáo',
        'Swipe the smoke apart and roar a warning',
        'Luồng gió từ móng vuốt thổi bật làn khói xanh. Bóng người đầu ngõ ghi chép gì đó vào sổ rồi khuất sau góc tường.',
        'The gust from your claws scatters the blue smoke. The figure at the corner writes in a notebook and vanishes behind the wall.',
        { rep: 6, resonance: 5, heat: 5, sanity: -3 })
    ],
    I('Bạn lùi xuống nắp hầm trước khi khói chạm tới.', 'You drop down the cellar hatch before the smoke reaches you.', {})
  ),

  DM('m_distort_wing_extraction_drone',
    '[Lồng thu hồi tự hành] Một thiết bị bay của Wing hạ thấp xuống khu phế tích, mang theo ống tiêm thu thập mẫu mô biến dị.',
    '[Autonomous extraction drone] A Wing drone descends into the ruins, carrying a biopsy needle meant for anomalous tissue.',
    [
      C('Chộp lấy thiết bị và tháo pin năng lượng của nó',
        'Snatch the unit and strip its power cell',
        'Cánh quạt gãy vụn trong tay bạn. Viên pin năng lượng nóng ấm giúp vết thương cũ trên sườn khép miệng nhanh hơn.',
        'The rotors snap in your grip. Its warm power cell knits the old wound along your flank.',
        { health: 10, wealth: 8, heat: 4 }),
      C('Ném mảnh bê tông đánh lạc hướng cảm biến',
        'Hurl a concrete slab to decoy its sensor',
        'Thiết bị bay lao theo tiếng động bên kia tường đổ. Bạn rời khỏi khu vực mà không để lại mẫu mô nào.',
        'The drone darts after the crash beyond the fallen wall. You leave the area without giving up a tissue sample.',
        { heat: -4, sanity: 3 })
    ],
    I('Bạn ép sát vào vách sắt chờ thiết bị bay qua.', 'You press against the iron wall until the drone passes.', {})
  ),

  DM('m_distort_elder_shell_molting',
    '[Mảng vỏ bong lúc giao mùa] Không khí lạnh làm lớp sừng già bên vai phải nứt toác. Nếu không xử lý, nó sẽ kẹt cứng vào khớp xương.',
    '[Seasonal shell molt] Cold air splits the aged horn plate on your right shoulder. Left alone, it will jam the joint beneath.',
    [
      C('Tự tay bóc lớp sừng già để lớp vỏ mới mọc lên',
        'Peel away the old horn plate so fresh shell can grow',
        'Cơn đau buốt kéo dài nửa giờ nhưng cánh tay bạn cử động linh hoạt như hồi mới biến dạng.',
        'Sharp pain lasts half an hour, yet your arm moves as freely as when you first turned.',
        { health: 8, resonance: 5, sanity: -3 }),
      C('Quấn vải bạt và dây đồng giữ nguyên mảng vỏ cũ',
        'Bind the old plate in canvas and copper wire',
        'Khớp vai hơi cứng nhưng bạn không phải chịu cơn sốt lột xác trong đêm lạnh.',
        'Your shoulder stays stiff, though you spare yourself a molting fever in the cold night.',
        { sanity: 4, health: -2 })
    ],
    I('Mảng vỏ tự rụng xuống sau vài ngày.', 'The plate drops off on its own after a few days.', {})
  ),

  DM('m_distort_underground_tribute_box',
    '[Chiếc hộp gỗ trước cửa hầm] Đám cư dân sống quanh khu phế tích đặt một hộp gỗ đựng thịt khô và dầu máy trước lối xuống hầm của bạn.',
    '[The wooden box by the cellar] Residents living around the ruins set a wooden box of dried meat and machine oil before your cellar steps.',
    [
      C('Nhận hộp đồ và ném trả chiếc đầu của gã cướp vừa rình mò khu phố',
        'Take the box and toss back the head of a prowling raider',
        'Đám cư dân hiểu ý, từ đó không ai dám dẫn thợ săn tới gần tầng hầm của bạn.',
        'The residents understand the pact; from then on, no one leads hunters near your basement.',
        { health: 8, rep: 6, network: 4, heat: -3 }),
      C('Chỉ lấy phần dầu máy và để lại vài đồng tiền cũ',
        'Take only the machine oil and leave a few old coins',
        'Bạn giữ sòng phẳng như một người khách trọ kỳ dị. Cư dân quanh hẻm bớt sợ tiếng bước chân bạn mỗi tối.',
        'You keep fair accounts like a strange tenant. Neighbors along the lane fear your evening footsteps less.',
        { sanity: 6, wealth: -3, heat: -4 }, { flagsAdd: ['HumanVoice'] })
    ],
    I('Bạn không chạm vào chiếc hộp suốt cả tuần.', 'You leave the box untouched all week.', {})
  )
];

// ============================================================================
// 2. DISTORTION EXPANSION DAILIES (Haunting Atmospheric Lore Lines)
// ============================================================================

export const DISTORTION_PARITY_DAILIES = [
  D('d_distort_carmen_lullaby', [18, 140], { jobs: ['Distortion'] },
    'Giữa tiếng mưa District 23, bạn nghe Carmen gọi. Đến khi mưa ngớt, giọng ấy cũng im.',
    'You hear Carmen calling through the rain in District 23. When the rain eases, the voice stops.',
    { sanity: -1, resonance: 1 }),

  D('d_distort_crystal_sprouts', [18, 140], { jobs: ['Distortion'] },
    'Vết nứt trên cơ thể khép dần trong đêm. Sáng ra, áo bạn vẫn rách ở chỗ ấy.',
    'A crack in your body closes overnight. By morning, your coat is still torn where it had been.',
    { health: 1, resonance: 1 }),

  D('d_distort_sound_of_heartbeats', [18, 140], { jobs: ['Distortion'] },
    'Từ trong phòng trọ, bạn nghe tiếng người đi qua ngoài hẻm rõ hơn trước. Bạn đợi họ khuất rồi mới mở cửa.',
    'From your room, footsteps in the alley sound clearer than they used to. You wait for them to pass before opening the door.',
    { resonance: 1 }),

  D('d_distort_sweepers_part_ways', [18, 140], { jobs: ['Distortion'] },
    'Sau 3 giờ 10, Sweepers đi qua hẻm bên cạnh. Một chiếc dừng lại trước vệt cào trên tường nhà bạn rồi tiếp tục.',
    'After 3:10, Sweepers pass through the next alley. One stops at the marks on your wall, then moves on.',
    { rep: 1 }),

  D('d_distort_tears_turn_to_glass', [18, 140], { jobs: ['Distortion'] },
    'Bạn tìm thấy vệt nước trên tay áo sau khi nghe lại tên cũ. Đến lúc lau đi, nó đã khô.',
    'After hearing your old name, you find a damp mark on your sleeve. It has dried by the time you wipe it.',
    { sanity: 1 }),

  D('d_distort_hana_patrol_drones', [18, 140], { jobs: ['Distortion'] },
    'Thiết bị trinh sát lướt qua mái nhà, quét đèn lên chỗ bạn trú. Sáng sau, tờ thông báo của Hana xuất hiện ở đầu phố.',
    'A surveillance unit passes over the roof and lights your shelter. By morning, a Hana notice is posted at the street entrance.',
    { rep: 1, heat: 1 }),

  D('d_distort_scent_of_melting_steel', [18, 140], { jobs: ['Distortion'] },
    'Bạn vịn lan can khi lên cầu thang. Thanh sắt cong đi một chút; bạn đổi sang tay còn lại.',
    'You grip the stair railing. The metal bends slightly, so you switch to your other hand.',
    { health: 1 }),

  D('d_distort_old_song_echoes', [18, 140], { jobs: ['Distortion'] },
    'Có người hát ở phòng bên cạnh. Bạn không nhận ra bài hát, nhưng Carmen cũng im để nghe.',
    'Someone sings in the next room. You do not know the song, but Carmen falls silent to listen.',
    { sanity: 1 }),

  D('d_distort_bent_streetlamp', [18, 140], { jobs: ['Distortion'] },
    'Cây đèn đường trước chỗ bạn ngủ nghiêng dần về phía bóng tối. Sáng ra thợ điện chỉ nhìn rồi bỏ đi.',
    'The streetlamp outside your sleeping spot tilts toward the shadow. In the morning the lineman takes one look and walks away.',
    { resonance: 1 }),

  D('d_distort_rust_taste_rain', [18, 140], { jobs: ['Distortion'] },
    'Nước mưa chảy qua mái tôn rỉ xuống tay bạn có vị ấm như máu nóng.',
    'Rainwater running off the rusted tin onto your hand tastes warm as fresh blood.',
    { health: 1 }),

  D('d_distort_clockwork_pulse', [18, 140], { jobs: ['Distortion'] },
    'Mỗi khi tháp đồng hồ đằng xa điểm chuông, lõi năng lượng trong ngực bạn lại gõ đúng bằng số nhịp ấy.',
    'Whenever the distant clock tower strikes, the core in your chest beats the exact same count.',
    { sanity: 1 }),

  D('d_distort_alley_chalk_warning', [18, 140], { jobs: ['Distortion'] },
    'Trẻ con đầu ngõ vẽ hình cái bóng có sừng lên tường gạch để dặn nhau không đi qua lúc chập tối.',
    'Children at the lane mouth chalk a horned shadow on the brick wall to warn one another away at dusk.',
    { rep: 1 }),

  D('d_distort_cold_furnace_breath', [18, 140], { jobs: ['Distortion'] },
    'Hơi thở của bạn phủ một lớp sương trắng lên kính vỡ dù đêm nay trời không có tuyết.',
    'Your breath coats broken glass in white frost even on a snowless night.',
    { resonance: 1 }),

  D('d_distort_forgotten_coin_slot', [18, 140], { jobs: ['Distortion'] },
    'Bạn thử nhét đồng xu vào máy bán nước tự động nhưng ngón tay đã quá lớn để chạm tới nút bấm.',
    'You try slipping a coin into a vending machine, only to find your fingers too large for the button.',
    { sanity: -1, resonance: 1 })
];

// ============================================================================
// 3. DISTORTION EXPANSION MAJORS (Apex Calamity & Metamorphosis Arcs)
// ============================================================================

export const DISTORTION_PARITY_MAJORS = [
  {
    id: 'distort_arc_star_calamity_ascension',
    age: [28, 140],
    major: true,
    weight: 40,
    need: { jobs: ['Distortion'], stat: { rep: [60, 100], heat: [50, 100] } },
    requires: ['Distorted'],
    forbids: ['distort_star_calamity_done', 'distort_star_rampage_done', 'StarOfTheCityEntity'],
    vi: "[Lệnh trấn áp mới] Hana nâng hồ sơ của bạn lên Star of the City. Giám đốc Section 1 của Liu cùng hai Fixer Grade 1 đến chặn khu phố. Họ đánh dấu lối thoát trên bản đồ trước khi vào hẻm.",
    en: "[A new suppression order] Hana raises your file to Star of the City. A Liu Section 1 Director and two Grade 1 Fixers block the district. They mark the exits on a map before entering the alley.",
    choices: [
      {
        labelVi: "Đánh vào Giám đốc trước khi hai Fixer khép vòng",
        labelEn: "Strike the Director before the other Fixers close in",
        need: { stat: { health: [40, 100] } },
        outcomes: [
          {
            w: 60,
            resultVi: "Bạn xé rách giáp vai của Giám đốc. Hai Fixer còn lại kéo người ấy lùi khỏi hẻm; Hana ghi trận này vào hồ sơ mở của bạn.",
            resultEn: "You tear through the Director’s shoulder armor. The other Fixers pull them out of the alley; Hana records the clash in your open file.",
            effects: { health: -25, resonance: +35, rep: +50, sanity: -15 },
            flagsAdd: ['distort_star_calamity_done', 'LivingStarOfCity', 'BấtKhảKhuấtPhục'],
            meritAdd: 50
          },
          {
            w: 40,
            resultVi: "Thương của Giám đốc đốt cháy lớp vỏ bên sườn. Bạn phá được vòng vây và xuống đường hầm, nhưng vết bỏng tiếp tục rỉ dịch.",
            resultEn: "The Director’s polearm burns through the shell at your side. You break the cordon and reach the tunnel, but the burn keeps weeping.",
            effects: { health: -40, sanity: -25, heat: +35 },
            flagsAdd: ['distort_star_calamity_done'],
            scarsAdd: ['Sẹo hỏa kiếm Liu Section 1']
          }
        ]
      },
      {
        labelVi: "Làm lệch các lối hẻm để cắt đội hình của họ",
        labelEn: "Shift the alleys to split their formation",
        outcomes: [
          {
            w: 65,
            resultVi: "Hai lối hẻm nối nhầm vào nhau. Các Fixer mất thời gian tìm lại đội hình; bạn thoát qua mái nhà trước khi Liu phát hiện đường vòng.",
            resultEn: "Two alleys join in the wrong place. The Fixers lose time regrouping; you cross the rooftops before Liu finds another route.",
            effects: { resonance: +22, sanity: -14, rep: +28, heat: +16 },
            flagsAdd: ['distort_star_calamity_done', 'DistortionArchitect']
          },
          {
            w: 35,
            resultVi: "Liu đốt đường nối giữa hai hẻm. Bạn giữ được chỗ trú nhưng phải lùi vào trong, lớp vỏ trước ngực nóng rát suốt đêm.",
            resultEn: "Liu burns through the passage between the alleys. You keep your shelter but retreat inside; the shell over your chest aches with heat all night.",
            effects: { health: -32, sanity: -18, resonance: +10, heat: +20 },
            flagsAdd: ['distort_star_calamity_done']
          }
        ]
      }
    ]
  },

  {
    id: 'distort_arc_ego_clash_manifestation',
    age: [25, 140],
    major: true,
    weight: 35,
    requires: ['Distorted'],
    forbids: ['distort_ego_clash_done'],
    vi: "[Fixer mang E.G.O] Fixer chặn bạn ở đầu ngõ. Vũ khí E.G.O của người ấy hiện ra khi họ rút tay khỏi áo. “Tôi có lệnh đưa bạn về.”",
    en: "[A Fixer with E.G.O] A Fixer blocks the alley entrance. Their E.G.O weapon appears as they pull a hand from their coat. “I have orders to bring you in.”",
    choices: [
      {
        labelVi: "Đánh vào tay cầm vũ khí trước",
        labelEn: "Strike the weapon hand first",
        outcomes: [
          {
            w: 65,
            resultVi: "Bạn đánh nứt vũ khí trên tay Fixer. Ánh sáng E.G.O tắt đi khi người ấy ngã xuống; bạn bị rạch vai lúc lách qua.",
            resultEn: "You crack the weapon in the Fixer’s hand. Its E.G.O light goes out when they fall; your shoulder is cut as you slip past.",
            effects: { health: -20, resonance: +28, rep: +32, sanity: -12, heat: +14 },
            flagsAdd: ['distort_ego_clash_done', 'EGOBreaker']
          },
          {
            w: 35,
            resultVi: "Bạn đẩy được Fixer lùi lại. Lưỡi vũ khí rạch lớp vỏ trước ngực; ký ức cũ bất ngờ kéo tới, khiến bạn phải vịn tường mới đứng vững.",
            resultEn: "You force the Fixer back. Their blade cuts the shell over your chest; an old memory catches you off guard, and you brace yourself against the wall.",
            effects: { health: -30, sanity: -25, resonance: +15 },
            flagsAdd: ['distort_ego_clash_done']
          }
        ]
      },
      {
        labelVi: "Lặp lại lời Carmen vừa nói với bạn",
        labelEn: "Repeat what Carmen just said to you",
        outcomes: [
          {
            w: 65,
            resultVi: "Fixer khựng lại trước câu nói ấy. Vũ khí trong tay người ấy chập chờn đủ lâu để bạn thoát qua, còn cổ họng bạn rát đến mức không nói thêm được.",
            resultEn: "The Fixer hesitates at those words. Their weapon flickers long enough for you to pass; your throat hurts too much to say anything else.",
            effects: { health: -12, sanity: -8, resonance: +22, rep: +26, heat: +12 },
            flagsAdd: ['distort_ego_clash_done', 'CorrupterOfConviction']
          },
          {
            w: 35,
            resultVi: "Fixer nghe hết câu rồi vẫn tiến lên. Bạn né không kịp; lưỡi vũ khí rạch ngực trước khi người ấy lùi lại lấy đà.",
            resultEn: "The Fixer hears you out and keeps coming. You move too late; the blade cuts your chest before they step back to reset their stance.",
            effects: { health: -28, sanity: -20, resonance: +8 },
            flagsAdd: ['distort_ego_clash_done'],
            scarsAdd: ['Vết chém phản chấn E.G.O']
          }
        ]
      }
    ]
  },

  {
    id: 'distort_arc_century_calamity_climax',
    age: [100, 140],
    major: true,
    weight: 60,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_arc_century_calamity_done'],
    vi: "[Trăm năm] Bạn đã sống hơn một thế kỷ trong hình dạng này. Chỗ trú cũ bị xây đè lên hai lần; hồ sơ Hana vẫn được chuyển tiếp mỗi khi người phụ trách đổi ca. Hôm nay, có thêm dấu của The Head trên trang đầu.",
    en: "[A century] You have lived in this form for over a hundred years. Your old shelter has been built over twice; Hana passes your file from one clerk to the next. Today, the Head’s seal appears on its first page.",
    choices: [
      {
        labelVi: "Rút xuống tầng hầm cũ và ngừng đáp lại bên ngoài",
        labelEn: "Retreat to the old basement and stop answering the world outside",
        endsLife: true,
        lifeEnding: 'distort_monument',
        effects: { rep: +50, sanity: +30, resonance: -100 },
        resultVi: "Bạn nằm xuống dưới móng nhà cũ. Lớp vỏ cứng bít cửa tầng hầm; người đi ngang chỉ thấy mặt đường mới và vết nứt chưa ai trám.",
        resultEn: "You lie beneath the old foundations. Your shell seals the basement entrance; passersby see only the new paving and a crack nobody has repaired."
      },
      {
        labelVi: "Ở lại khi The Head cử Claw đến",
        labelEn: "Stay when the Head sends a Claw",
        startDungeon: CLAW_DUNGEON_ID,
        resultVi: "Claw bước qua cửa hầm đã bật khóa. Ba ống Serum trên tay nó sáng lên; bạn không còn lối lùi.",
        resultEn: "A Claw steps through the unlocked basement door. Three Serum injectors light up on its arm; there is nowhere left to retreat."
      },
      {
        labelVi: "Rời District trước khi lệnh mới đến",
        labelEn: "Leave the District before the new order arrives",
        effects: { rep: +25, sanity: -10, heat: +15 },
        flagsAdd: ['distort_arc_century_calamity_done'],
        resultVi: "Bạn qua trạm kiểm soát lúc đổi ca. Khi đội săn đến chỗ trú cũ, cửa đã mở và đồ đạc không còn; hồ sơ Hana lại phải sửa địa chỉ.",
        resultEn: "You pass the checkpoint during shift change. When hunters reach your old shelter, the door is open and your things are gone; Hana must update your address again."
      }
    ]
  },

  {
    id: 'distort_arc_archetype_divergence',
    age: [19, 130],
    major: true,
    weight: 48,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_archetype_chosen'],
    vi: "[Ba hình thái của vết nứt] Cơn sốt biến dạng đầu tiên đã lắng xuống đáy lồng ngực. Giọng Carmen hỏi bạn muốn dựng nên một lãnh địa riêng, giữ lại tiếng nói con người để bước đi giữa phố chợ, hay hóa thành cơn tai ương không ai dám gọi tên.",
    en: "[Three shapes of the fracture] The first fever of metamorphosis settles deep in your chest. Carmen asks whether you wish to build a domain of your own, keep a human voice to walk the market lanes, or become an unnamed calamity.",
    choices: [
      {
        labelVi: "Uốn cong những bức tường quanh mình thành Lãnh Chúa Mê Cung",
        labelEn: "Bend the surrounding walls into a Labyrinth Sovereign’s domain",
        effects: { resonance: 18, rep: 12, sanity: -6 },
        flagsAdd: ['distort_archetype_chosen', 'DistortionLabyrinthSovereign'],
        resultVi: "Không gian trong bán kính ba dãy nhà bắt đầu gấp nếp theo nhịp tim của bạn. Bất cứ kẻ nào bước qua bậc thềm đều phải đi theo quy luật do bạn đặt ra.",
        resultEn: "Space across three blocks folds to the rhythm of your pulse. Anyone crossing the threshold must walk by rules of your making."
      },
      {
        labelVi: "Nén lớp vỏ biến dị để giữ giọng người làm Dị Thể Tỉnh Thức",
        labelEn: "Compress your shell and keep the human voice of a Lucid Wanderer",
        effects: { sanity: 14, network: 8, heat: -8, resonance: 6 },
        flagsAdd: ['distort_archetype_chosen', 'DistortionLucidWanderer', 'HumanVoice'],
        resultVi: "Bạn kéo chiếc áo choàng rộng che kín những khớp xương đã đổi dạng. Khi bạn cất tiếng trả tiền ở quầy hàng đêm, người bán chỉ thấy giọng bạn hơi khàn.",
        resultEn: "You draw a wide cloak over your altered joints. When you speak to pay at the night stall, the vendor notices only a rasp in your voice."
      },
      {
        labelVi: "Bung toàn bộ gai xương và nhiệt lượng thành Tai Ương Nguyên Thủy",
        labelEn: "Unleash every bone spur and thermal surge as a Primordial Calamity",
        effects: { health: 20, resonance: 24, rep: 20, heat: 16, sanity: -12 },
        flagsAdd: ['distort_archetype_chosen', 'DistortionPrimordialCalamity'],
        resultVi: "Mặt đường nhựa dưới chân bạn nứt toác vì sức nóng. Tiếng gầm từ lồng ngực làm tắt toàn bộ đèn đường trong con phố.",
        resultEn: "Asphalt splits beneath your feet from the heat. The roar from your chest snuffs out every streetlamp along the block."
      }
    ]
  },

  {
    id: 'distort_arc_labyrinth_trap_feast',
    age: [21, 130],
    major: true,
    weight: 38,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_labyrinth_feast_done'],
    vi: "[Khách lạc trong sương mù] Một đội thu gom của Office hạng trung bước vào tầng trệt nơi không gian đã bị trường lực của bạn làm lệch hướng. Họ đi vòng qua cùng một cầu thang suốt ba giờ mà vẫn tưởng mình đang tiến sâu hơn.",
    en: "[Guests lost in the mist] A mid-tier Office salvage team steps into the ground floor where your field has skewed direction. They circle the same staircase for three hours, convinced they are pressing deeper.",
    choices: [
      {
        labelVi: "Tắt hết nguồn sáng và tước sạch trang bị của cả đội",
        labelEn: "Snuff the lights and strip the entire squad of their gear",
        outcomes: [
          {
            w: 65,
            effects: { wealth: 24, resonance: 16, rep: 18, sanity: -8, heat: 12 },
            flagsAdd: ['distort_labyrinth_feast_done', 'DistortionLabyrinthSovereign'],
            resultVi: "Không cần đến nhát chém thứ hai, cả đội đã quăng vũ khí chạy tán loạn ra cửa phụ. Bạn thu gom toàn bộ túi đồ nghề còn nguyên dấu niêm.",
            resultEn: "Before a second strike is needed, the squad drops their weapons and bolts out the side door. You gather every sealed gear pack."
          },
          {
            w: 35,
            effects: { health: -22, wealth: 10, resonance: 8, heat: 16 },
            flagsAdd: ['distort_labyrinth_feast_done'],
            resultVi: "Đội trưởng của họ kích nổ mìn phá tường để mở lối máu. Bạn giữ được kho chiến lợi phẩm nhưng một mảng tường lãnh địa bị sập.",
            resultEn: "Their captain detonates a breaching charge to blast an exit. You keep the spoils, though one wall of your domain collapses."
          }
        ]
      },
      {
        labelVi: "Mở lối cầu thang thật với điều kiện họ để lại tiền chuộc mạng",
        labelEn: "Reveal the true staircase on condition they leave ransom",
        effects: { wealth: 18, sanity: 8, rep: 10, heat: -4 },
        flagsAdd: ['distort_labyrinth_feast_done', 'HumanVoice'],
        resultVi: "Bạn viết con số lên bức tường đối diện bằng đầu móng sắc. Đội trưởng hiểu ý, đặt túi tiền xuống bậc tam cấp rồi dẫn thuộc hạ rút êm.",
        resultEn: "You scratch a number into the opposite wall with a claw tip. Taking the hint, the captain sets a coin pouch on the step and leads the squad out."
      }
    ]
  },

  {
    id: 'distort_arc_lucid_underground_broker',
    age: [21, 130],
    major: true,
    weight: 38,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_lucid_broker_done'],
    vi: "[Khế ước dưới ánh đèn dầu] Chủ chợ ngầm District mở cửa căn hầm riêng đón bạn. Ông ta không gọi đội săn mà rót một chén rượu mạnh, đề nghị bạn làm kẻ bảo hộ vô hình cho tuyến hàng đêm của chợ.",
    en: "[Pact beneath the oil lamp] The District underground market boss opens a private cellar for you. Instead of calling hunters, he pours strong liquor and asks you to serve as the unseen guardian of the night cargo line.",
    choices: [
      {
        labelVi: "Nhận lời bảo hộ tuyến chợ đêm để hưởng phần chia định kỳ",
        labelEn: "Accept the night-market guardianship for a regular share",
        effects: { wealth: 28, network: 10, sanity: 8, heat: -8 },
        flagsAdd: ['distort_lucid_broker_done', 'DistortionLucidWanderer', 'HumanVoice'],
        resultVi: "Mỗi tháng thùng tiếp tế đều đặt sẵn ngay ranh giới khu phế tích. Những băng cướp vặt biến mất sạch khỏi tuyến đường bạn đi tuần.",
        resultEn: "Each month a supply crate waits at the ruin boundary. Petty raiders vanish completely from the route you patrol."
      },
      {
        labelVi: "Bắt ông ta giao nộp danh sách những kẻ đã đặt tiền truy nã bạn",
        labelEn: "Force him to hand over the list of those who funded your bounty",
        effects: { rep: 20, resonance: 14, sanity: -4, heat: 8 },
        flagsAdd: ['distort_lucid_broker_done'],
        resultVi: "Tay ông ta run bần bật khi đẩy cuốn sổ bìa da qua mặt bàn. Ngay trong tuần đó, ba văn phòng môi giới phải đóng cửa vĩnh viễn.",
        resultEn: "His hand trembles as he slides the leather ledger across the table. Within the week, three brokerage offices shutter for good."
      }
    ]
  },

  {
    id: 'distort_arc_primordial_blood_tide',
    age: [21, 130],
    major: true,
    weight: 38,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_primordial_tide_done'],
    vi: "[Cơn khát của lõi nguyên thủy] Nhiệt lượng từ lồng ngực bạn làm chảy nhựa đường suốt cả con hẻm. Hai đội săn tiền thưởng trang bị giáo điện vừa dựng rào chắn ở ngã tư đã thấy mặt đất dưới chân rung lên theo từng nhịp thở của bạn.",
    en: "[Thirst of the primordial core] Heat from your chest melts the asphalt down the entire lane. Two bounty squads armed with shock-lances barely finish their barricade at the crossroads before the ground shudders with your breath.",
    choices: [
      {
        labelVi: "Phá tung rào chắn và nghiền nát đội hình giáo điện",
        labelEn: "Smash the barricade and crush the shock-lance formation",
        outcomes: [
          {
            w: 65,
            effects: { health: 14, resonance: 22, rep: 24, sanity: -8, heat: 14 },
            flagsAdd: ['distort_primordial_tide_done', 'DistortionPrimordialCalamity'],
            resultVi: "Những mũi giáo điện gãy vụn trước lớp sừng nóng đỏ của bạn. Đám thợ săn sống sót bỏ chạy khỏi khu phố trước khi bạn kịp truy kích.",
            resultEn: "Shock-lances snap against your glowing horn plates. Surviving hunters flee the quarter before you can give chase."
          },
          {
            w: 35,
            effects: { health: -20, resonance: 14, rep: 14, heat: 16 },
            flagsAdd: ['distort_primordial_tide_done'],
            resultVi: "Luồng điện cao thế làm nứt một mảng vỏ ngực nhưng bạn vẫn hất tung cả chốt chặn xuống mương thoát nước.",
            resultEn: "High-voltage current cracks a chest plate, yet you hurl the entire roadblock into the drainage ditch."
          }
        ]
      },
      {
        labelVi: "Hấp thụ dòng điện từ hàng rào để tôi luyện lại lớp giáp sừng",
        labelEn: "Draw the current from their barrier to temper your horn carapace",
        effects: { health: 18, resonance: 16, sanity: 4, heat: -4 },
        flagsAdd: ['distort_primordial_tide_done', 'DistortionPrimordialCalamity'],
        resultVi: "Bạn nắm thẳng vào lõi dây cáp, rút cạn bình ắc quy công nghiệp của họ trong sự kinh hãi của cả đội săn.",
        resultEn: "You grip the live cable core and drain their industrial battery bank before the horrified squad."
      }
    ]
  },

  {
    id: 'distort_arc_lcd_moses_inspection',
    age: [23, 130],
    major: true,
    weight: 40,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_lcd_inspection_done'],
    vi: "[Người đọc khói tẩu] Một điều tra viên tóc điểm bạc cầm chiếc tẩu chạm khắc bước vào nơi bạn trú cùng một trợ lý trẻ đeo găng chiến đấu. Làn khói từ tẩu thuốc phác họa lại chính xác vết thương tâm lý đã đẩy bạn qua bờ vực.",
    en: "[The reader of pipe smoke] A silver-streaked investigator holding a carved pipe steps into your shelter beside a young assistant in combat gloves. Smoke from the pipe sketches the exact psychological wound that pushed you over the edge.",
    choices: [
      {
        labelVi: "Ngồi xuống đối thoại và để họ ghi nhận cấu trúc tâm bệnh",
        labelEn: "Sit down to talk and let them record the structure of your distortion",
        effects: { sanity: 14, resonance: 8, heat: -12, network: 6 },
        flagsAdd: ['distort_lcd_inspection_done', 'HumanVoice'],
        resultVi: "Người điều tra viên gõ nhẹ tẩu thuốc rồi đóng tập hồ sơ. Bà ta hứa sẽ chuyển hướng đội thanh trừng của Hana sang khu khác nếu bạn giữ nguyên ranh giới hiện tại.",
        resultEn: "The investigator taps the pipe and closes the dossier. She promises to divert Hana’s suppression team elsewhere so long as you keep your current boundary."
      },
      {
        labelVi: "Đánh phủ đầu trước khi hơi khói khóa chặt cử động của bạn",
        labelEn: "Strike first before the pipe smoke locks your movements",
        outcomes: [
          {
            w: 60,
            effects: { health: -18, resonance: 24, rep: 26, sanity: -8, heat: 14 },
            flagsAdd: ['distort_lcd_inspection_done'],
            resultVi: "Bạn đập vỡ bức tường chắn để thoát khỏi vòng khói đỏ. Người trợ lý trẻ bị hất văng ra ngõ; hai người họ đành rút lui khi sương mù dày đặc kéo xuống.",
            resultEn: "You smash the partition wall to break free of the red smoke ring. The young assistant is hurled into the lane; the pair withdraws as thick fog rolls in."
          },
          {
            w: 40,
            effects: { health: -32, sanity: -14, resonance: 10 },
            flagsAdd: ['distort_lcd_inspection_done'],
            scarsAdd: ['Vết bỏng khói tẩu điều tra viên'],
            resultVi: "Một hơi thở khói xanh thắt chặt lồng ngực khiến bạn khuỵu gối. Khi bạn gượng dậy được, họ đã rời đi cùng bản ghi chép đầy đủ về điểm yếu trên vỏ của bạn.",
            resultEn: "A breath of blue smoke tightens around your chest and brings you to one knee. By the time you rise, they have left with a full record of the weak points in your shell."
          }
        ]
      }
    ]
  },

  {
    id: 'distort_arc_past_life_fixer_badge',
    age: [23, 130],
    major: true,
    weight: 36,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_past_life_badge_done'],
    vi: "[Di vật dưới gạch vụn] Trong lúc đào sâu xuống nền móng khu nhà cũ, móng vuốt của bạn chạm phải chiếc hộp sắt quen thuộc. Bên trong là tấm thẻ căn cước và cuốn sổ ghi chép công việc từ thời bạn còn mang hình hài con người.",
    en: "[Relic beneath the rubble] Digging beneath the foundations of an old block, your claws strike a familiar iron box. Inside lie the identity card and work notebook from the years you still wore a human shape.",
    choices: [
      {
        labelVi: "Đặt chiếc hộp lên bệ đá cao nhất trong ổ trú để nhớ mình là ai",
        labelEn: "Set the box on the highest stone ledge in your lair to remember who you were",
        effects: { sanity: 16, resonance: 6, heat: -6 },
        flagsAdd: ['distort_past_life_badge_done', 'HumanVoice'],
        resultVi: "Mỗi khi tiếng Carmen vang lên quá lớn, bạn lại nhìn chữ ký cũ trên tấm thẻ. Cơn cuồng loạn lùi lại trước cái tên bạn tự tay viết năm xưa.",
        resultEn: "Whenever Carmen’s voice swells too loud, you look at the old signature on the card. Frenzy recedes before the name you wrote with your own hand."
      },
      {
        labelVi: "Bóp nát chiếc hộp sắt và nuốt chửng mảnh kim loại vào lõi",
        labelEn: "Crush the iron box and swallow the metal shards into your core",
        effects: { health: 16, resonance: 22, rep: 14, sanity: -12 },
        flagsAdd: ['distort_past_life_badge_done', 'DistortionPrimordialCalamity'],
        resultVi: "Kim loại cũ tan chảy trong lồng ngực nóng rực. Bạn không còn nợ bất kỳ văn phòng hay hiệp hội nào của kiếp trước.",
        resultEn: "Old metal melts inside your blazing chest. You owe nothing to any Office or Association of your former life."
      }
    ]
  },

  {
    id: 'distort_arc_past_life_wing_containment',
    age: [24, 130],
    major: true,
    weight: 38,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_wing_containment_done'],
    vi: "[Lồng kính chiết xuất năng lượng] Một đoàn xe bọc thép không mang phù hiệu dừng trước khu phế tích. Đám nhân viên kỹ thuật dựng bốn cột phát sóng khóa không gian, định đóng hộp bạn sống để đem về buồng chiết xuất Enkephalin của Wing.",
    en: "[The extraction glass cage] An unmarked armored convoy halts before the ruins. Technicians erect four spatial-lock pylons, aiming to crate you alive for a Wing’s Enkephalin extraction chamber.",
    choices: [
      {
        labelVi: "Nhổ bật cột phát sóng chính và nghiền nát thùng xe giam giữ",
        labelEn: "Uproot the main pylon and crush the containment trailer",
        outcomes: [
          {
            w: 65,
            effects: { health: -16, wealth: 26, resonance: 20, rep: 24, heat: 14 },
            flagsAdd: ['distort_wing_containment_done'],
            resultVi: "Cột phát sóng gãy đôi phóng hồ quang điện xanh lè. Đoàn xe bỏ lại toàn bộ thiết bị đo đạc đắt tiền để tháo chạy ra đường trục chính.",
            resultEn: "The snapped pylon arcs vivid blue current. The convoy abandons its pricey metering gear and flees toward the main artery."
          },
          {
            w: 35,
            effects: { health: -34, sanity: -12, resonance: 12, heat: 18 },
            flagsAdd: ['distort_wing_containment_done'],
            scarsAdd: ['Vết còng khóa trường lực Wing'],
            resultVi: "Lưới điện từ đốt cháy một mảng vỏ lưng trước khi bạn giật đứt dây cáp. Bạn lẩn xuống cống sâu khi còi chi viện của Wing hú vang.",
            resultEn: "The electromagnetic net scorches a plate on your back before you snap the cables. You slip down the deep sewer as Wing reinforcement sirens wail."
          }
        ]
      },
      {
        labelVi: "Phóng ngược tần số cộng hưởng giả làm lõi quá tải sắp nổ",
        labelEn: "Pulse a false resonance spike to mimic an imminent core detonation",
        effects: { resonance: 16, sanity: 6, rep: 14, heat: -6 },
        flagsAdd: ['distort_wing_containment_done'],
        resultVi: "Kim đồng hồ đo của đội kỹ thuật vọt qua vạch đỏ. Chỉ huy hiện trường lập tức ra lệnh thu hồi lồng kính và hủy chiến dịch bắt sống.",
        resultEn: "The technicians’ gauges slam past the red line. The field commander immediately orders the cage retracted and aborts the live-capture operation."
      }
    ]
  },

  {
    id: 'distort_arc_elder_hibernation_monolith',
    age: [55, 140],
    major: true,
    weight: 42,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_elder_monolith_done'],
    vi: "[Cột trụ ngủ đông giữa phế tích] Hàng chục năm mang hình hài biến dị khiến lớp vỏ của bạn hòa làm một với dầm thép và tường gạch quanh ổ trú. Đám trẻ mới lớn trong vùng tưởng bạn là một pho tượng cổ có từ ngày xây District.",
    en: "[The hibernating monolith] Decades in distorted form have fused your outer shell with the steel beams and brickwork of your lair. Youngsters grown up in the quarter mistake you for an ancient statue standing since the District was built.",
    choices: [
      {
        labelVi: "Chìm vào giấc ngủ bán hóa thạch để thanh lọc tạp chất trong lõi",
        labelEn: "Sink into semi-petrified slumber to purge impurities from your core",
        effects: { health: 24, sanity: 14, heat: -18, resonance: 10 },
        flagsAdd: ['distort_elder_monolith_done'],
        resultVi: "Rêu xanh phủ kín hai bờ vai cứng như đá tảng. Khi bạn mở mắt lại sau một mùa mưa, mọi vết thương rỉ máu suốt mấy mươi năm đều đã liền sẹo.",
        resultEn: "Green moss blankets your stone-hard shoulders. When you open your eyes after a rainy season, every wound that wept for decades has healed."
      },
      {
        labelVi: "Cựa mình rung chuyển cả dãy phố để nhắc The City rằng bạn còn thức",
        labelEn: "Shift your frame and shake the block to remind the City you are awake",
        effects: { rep: 28, resonance: 20, wealth: 16, heat: 14, sanity: -6 },
        flagsAdd: ['distort_elder_monolith_done'],
        resultVi: "Mảng vữa cũ rơi ào ạt xuống mặt đường khi bạn vươn vai đứng dậy. Các băng nhóm quanh vùng vội vã mang lễ vật tới đặt dưới chân tường.",
        resultEn: "Old mortar rains onto the street as you stretch and rise. Surrounding crews hurry to lay tribute at the base of the wall."
      }
    ]
  },

  {
    id: 'distort_arc_elder_abnormality_chrysalis_ending',
    age: [75, 140],
    major: true,
    weight: 50,
    need: { jobs: ['Distortion'] },
    requires: ['Distorted'],
    forbids: ['distort_elder_chrysalis_done'],
    vi: "[Quả trứng ở cuối hành trình] Lõi biến dị trong ngực bạn đã cô đặc đến mức không còn cần thức ăn hay máu thịt bên ngoài. Một lớp tơ ánh sáng trắng bắt đầu đan quanh chân bạn, chuẩn bị khép lại thành hình thái bất tử vượt khỏi cái chết thông thường.",
    en: "[The egg at journey’s end] The anomalous core in your chest has condensed beyond any need for food or flesh. Strands of white light begin weaving around your feet, preparing to seal into an immortal form beyond ordinary death.",
    choices: [
      {
        labelVi: "Khép kín lớp kén ánh sáng và hóa thành Quả Trứng Dị Thể vĩnh hằng",
        labelEn: "Seal the cocoon of light and become an eternal Abnormality Egg",
        endsLife: true,
        lifeEnding: 'wander',
        effects: { sanity: 25, resonance: 40, rep: 35 },
        flagsAdd: ['distort_elder_chrysalis_done'],
        deathCauseVi: 'Kết kén thành Quả Trứng Dị Thể bất diệt giữa lòng phế tích',
        deathCauseEn: 'Spun a cocoon and became an undying Abnormality Egg within the ruins',
        resultVi: "Vỏ kén khép lại, chặn đứng mọi âm thanh của The City. Bạn không chết đi mà trở thành một quy luật bất biến nằm sâu dưới lòng đất.",
        resultEn: "The cocoon seals shut, cutting off every sound of the City. You do not die, becoming instead an immutable law deep beneath the earth."
      },
      {
        labelVi: "Đốt cháy toàn bộ lõi năng lượng mở trận càn quét cuối cùng",
        labelEn: "Burn your entire energy core in one final sweeping rampage",
        outcomes: [
          {
            w: 55,
            effects: { health: -20, rep: 40, resonance: 30, wealth: 25, heat: 20 },
            flagsAdd: ['distort_elder_chrysalis_done'],
            resultVi: "Luồng sáng từ lồng ngực bạn quét sạch ba chốt phong tỏa chỉ trong một đêm. Sau cơn bùng nổ, lõi của bạn tái sinh mới mẻ giữa đống tro tàn.",
            resultEn: "The light from your chest sweeps away three blockade posts in a single night. After the burst, your core regenerates anew amid the ash."
          },
          {
            w: 45,
            endsLife: true,
            lifeEnding: 'last_bout',
            effects: { health: -50, rep: 45 },
            flagsAdd: ['distort_elder_chrysalis_done'],
            deathCauseVi: 'Bùng nổ toàn bộ lõi biến dị trong trận chiến chấn động khu phố',
            deathCauseEn: 'Detonated their entire anomalous core in a battle that shook the district',
            resultVi: "Ánh sáng trắng từ cơ thể bạn rọi sáng cả bầu trời đêm trước khi tan thành hàng vạn mảnh tinh thể rơi xuống mái nhà.",
            resultEn: "White light from your frame illuminates the night sky before shattering into ten thousand crystal shards across the rooftops."
          }
        ]
      },
      {
        labelVi: "Xé rách lớp kén trắng, tiếp tục giữ hình hài hiện tại để bước tiếp",
        labelEn: "Tear open the white cocoon and keep walking in your present form",
        effects: { sanity: 12, health: 10, resonance: 8 },
        flagsAdd: ['distort_elder_chrysalis_done', 'HumanVoice'],
        resultVi: "Bạn dùng móng vuốt cắt đứt những sợi tơ ánh sáng. Bạn vẫn chưa muốn dừng bước khi ngoài kia còn những con phố chưa đi hết.",
        resultEn: "You sever the strands of light with your claws. You are not ready to stop while streets outside remain unwalked."
      }
    ]
  }
];
