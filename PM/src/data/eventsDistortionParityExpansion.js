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
    { sanity: 1 })
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
  }
];
