/**
 * Project Moon Universe - Distortion Route Expansion & Parity Suite
 * Deepens the psychological, visceral, and reality-warping experience of a Distorted entity.
 * Provides high-stakes gamified dilemmas, atmospheric sensory dailies, and apex calamity arcs.
 */

import { M, C, I, D } from './storyKit.js';

// ============================================================================
// 1. DISTORTION EXPANSION MINORS (15-second Rapid Dilemmas)
// ============================================================================

const DM = (id, vi, en, choices, ignore) =>
  M(id, [18, 99], { jobs: ['Distortion'] }, vi, en, choices, ignore, { requires: ['Distorted'] });

export const DISTORTION_PARITY_MINORS = [
  DM('m_distort_carmen_white_petal_wager',
    '[Cánh hoa trắng của Carmen] Một cánh hoa trắng muốt lơ lửng rơi xuống móng vuốt biến dị của bạn. Carmen khẽ cười khúc khích trong màng nhĩ: “Dâng hiến thêm một chút nhân tính, ta sẽ cho ngươi sức mạnh xé nát bức tường thép.”',
    '[Carmen’s White Petal Wager] A pure white petal drifts onto your warped claw. Carmen chuckles softly in your ear: “Yield a little more humanity, and I shall grant you strength to rend steel ramparts.”',
    [
      C('Nuốt lấy cánh hoa và hòa tan thêm một phần lý trí',
        'Swallow the petal and dissolve another shard of sanity',
        'Một luồng nhiệt đỏ thẫm bùng nổ trong lồng ngực. Xương khớp bạn dày thêm gấp đôi, da thịt hóa thành hợp kim cứng như giáp Wing.',
        'Crimson heat erupts within your chest. Your bones double in density; flesh hardens into alloy as tough as Wing armor.',
        { resonance: 8, health: 12, sanity: -6, rep: 4 }),
      C('Thổi bay cánh hoa và bám lấy ký ức về tên của chính mình',
        'Blow the petal away and cling to the memory of your own name',
        'Cánh hoa tan thành sương mù. Bạn lặp lại tên cũ ba lần; cơn đau đầu dịu đi đôi chút.',
        'The petal dissolves into mist. You repeat your old name three times; the migraine subsides slightly.',
        { sanity: 6, resonance: -2 })
    ],
    I('Cánh hoa tự úa tàn trên mặt đường lạnh.', 'The petal withers on the cold asphalt.', {})
  ),

  DM('m_distort_shi_assassin_ambush',
    '[Lưỡi đao phục kích của Shi Association] Hai sát thủ Shi Association rách rưới xuất hiện từ bóng tối của ống khói, rút hai thanh trường đao đâm thẳng vào mắt kép của bạn.',
    '[Shi Association Ambush] Two ragged Shi assassins drop from chimney shadows, thrusting twin Odachis toward your compound eyes.',
    [
      C('Vung cánh tay biến dị đập nát vũ khí của chúng',
        'Swing your mutated appendage to crush their blades',
        'Thép gãy vụn dưới móng vuốt của bạn. Cú đập hất tung hai sát thủ qua mái ngói, để lại vệt máu đen.',
        'Steel shatters beneath your talons. The blow hurls both assassins across roof tiles, leaving dark smears.',
        { health: -4, rep: 6, resonance: 4 }),
      C('Hét lên một sóng âm cộng hưởng làm vỡ tung màng nhĩ đối phương',
        'Unleash a resonant acoustic scream to burst their eardrums',
        'Hai sát thủ ôm đầu ngã gục, máu ứa ra từ khóe mắt và tai. Bạn bước qua họ trong cơn hưng phấn cuồng loạn.',
        'Both assassins collapse clutching their heads, bleeding from ears and eyes. You stalk past in euphoric frenzy.',
        { sanity: -3, rep: 8, heat: 5 })
    ],
    I('Bạn lùi vào màn đêm để bóng tối nuốt chửng.', 'You slip into shadows, letting the night swallow you.', { sanity: 1 })
  ),

  DM('m_distort_fear_harvest_market',
    '[Vụ thu hoạch nỗi sợ ở khu chợ Backstreets] Bạn đi ngang qua một khu chợ ngầm Backstreets. Hàng chục cư dân bần hàn quỳ sụp xuống van xin, nỗi kinh hoàng bốc lên như hơi nước nóng.',
    '[Fear Harvest in the Market] You stalk past a Backstreet market. Dozens of impoverished souls collapse pleading, terror rising like warm vapor.',
    [
      C('Hít sâu làn sóng kinh hãi để nuôi dưỡng lớp giáp dị thể',
        'Inhale the waves of terror to nourish your carapace',
        'Nỗi sợ hãi của con người là mật ngọt cho cơ thể mới. Lớp vỏ pha lê của bạn sáng rực rỡ và hồi phục vết nứt.',
        'Human terror is nectar to your new form. Your crystalline shell glows vibrantly, mending fractures.',
        { health: 10, resonance: 6, sanity: -4, rep: 5 }),
      C('Bước nhanh qua mà không làm hại bất kỳ ai',
        'Stride past swiftly without harming anyone',
        'Đám đông kinh ngạc khi thấy quái vật không tàn sát. Một tia lý trí le lói sưởi ấm tâm hồn bạn.',
        'The crowd stares in awe as the monstrosity leaves them intact. A faint glimmer of humanity warms your soul.',
        { sanity: 5, resonance: -2, rep: -2 })
    ],
    I('Bạn biến mất vào khúc quanh của con hẻm.', 'You vanish around the alley turn.', {})
  ),

  DM('m_distort_mirror_fragment_reflection',
    '[Mảnh gương vỡ dưới vũng nước] Dưới vũng nước mưa lấp lánh dầu mỡ, bạn nhìn thấy hình ảnh phản chiếu của mình: không còn khuôn mặt con người, chỉ còn một khối tinh thể đỏ rực với sừng kim loại.',
    '[Mirror Shard in the Puddle] In an oily puddle, you catch your reflection: no human features remain, only a pulsing crimson crystal mass crowned with metal horns.',
    [
      C('Chiêm ngưỡng và gầm lên kiêu hãnh vì vẻ đẹp hoàn mỹ',
        'Admire and roar with pride at your perfected form',
        'Bạn không còn là một con bọ nhỏ bị các Wing nghiền nát. Bạn là một kỳ quan mới của The City.',
        'You are no longer a vermin to be crushed by Wings. You are a new wonder of The City.',
        { sanity: -5, resonance: 8, rep: 4 }),
      C('Dẫm nát vũng nước để xóa đi hình bóng quái vật',
        'Stomp the puddle to shatter the monstrous visage',
        'Nước bẩn bắn tung tóe. Trái tim bạn thắt lại trước sự thật rằng bạn không bao giờ có thể quay trở lại.',
        'Muddy water splashes. Your heart wrenches at the undeniable truth that you can never return.',
        { sanity: 4, health: -2 })
    ],
    I('Gió đêm thổi làm gợn sóng mặt nước.', 'The night wind ripples the water surface.', {})
  ),

  DM('m_distort_street_child_encounter',
    '[Đứa trẻ không biết sợ hãi] Một đứa bé mồ côi gầy gò bới rác không hề bỏ chạy khi thấy bạn. Nó chìa ra nửa mẩu bánh mì mốc: "Ngươi đói không, sinh vật to lớn?"',
    '[The Fearless Child] A scrawny orphan digging in garbage does not flee. He extends half a moldy loaf: “Are you hungry, giant creature?”',
    [
      C('Dùng móng vuốt nhẹ nhàng nhận mẩu bánh và để lại một mảnh pha lê quý',
        'Gently accept the bread with claws and leave a gem crystal',
        'Đứa trẻ reo lên vui sướng khi nhặt viên ngọc rực sáng. Lần đầu tiên từ khi biến dị, tiếng gầm của bạn chuyển thành tiếng rừ rừ ấm áp.',
        'The boy gasps in delight as he lifts the glowing gem. For the first time since mutating, your roar softens to a warm purr.',
        { sanity: 8, resonance: -3, network: 2 }),
      C('Gầm lên dọa đứa trẻ chạy đi trước khi các Fixer săn dị thể ập đến',
        'Roar fiercely to scare the child away before Fixers arrive',
        'Đứa bé hoảng sợ bỏ chạy thục mạng vào hẻm sâu. Bạn quay lưng lại đối diện với ánh đèn pha của đội săn đuổi.',
        'The boy scrambles away into the deep alley. You turn to face the approaching searchlights.',
        { sanity: 2, rep: 4, heat: 4 })
    ],
    I('Bạn quay đi và để đứa trẻ ở lại với bãi rác.', 'You turn away, leaving the child to the refuse.', {})
  ),

  DM('m_distort_broken_workshop_weapon_feast',
    '[Thịt vụn kim loại Workshop] Xác một cỗ máy chiến đấu của Workshop bị bỏ lại sau đợt giao tranh. Cơ thể bạn bỗng thèm khát nuốt chửng các vi mạch và hợp kim sắc bén của nó.',
    '[Feast on Workshop Shrapnel] The carcass of a Workshop war machine lies abandoned. Your warped physiology craves devouring its sharp microchips and alloy.',
    [
      C('Nghiền nát và nuốt trọn khối kim loại vào dạ dày',
        'Crush and swallow the alloy mass into your gullet',
        'Tiếng kim loại ma sát ken két trong thực quản. Vỏ ngoài của bạn mọc thêm hàng chục lưỡi dao sắc như dao mổ.',
        'Metal grinds inside your esophagus. Your carapace sprouts dozens of scalpel-sharp blades.',
        { health: 12, resonance: 5, sanity: -3 }),
      C('Dùng móng vuốt đập nát cỗ máy thành bình địa',
        'Shatter the machine into flat scrap with heavy blows',
        'Tiếng đập phá vang dội xua tan cơn bực bội trong huyết quản.',
        'The shattering crash dispels the agitation simmering in your veins.',
        { sanity: 3, rep: 3 })
    ],
    I('Bạn bỏ qua xác máy gỉ sét.', 'You leave the rusted chassis behind.', {})
  )
];

// ============================================================================
// 2. DISTORTION EXPANSION DAILIES (Haunting Atmospheric Lore Lines)
// ============================================================================

export const DISTORTION_PARITY_DAILIES = [
  D('d_distort_carmen_lullaby', [18, 99], { jobs: ['Distortion'] },
    'Tiếng hát của Carmen vang vọng trong tủy sống như một khúc hát ru ngọt ngào giữa cơn mưa a-xít của District 23.',
    'Carmen’s melody echoes in your bone marrow like a sweet lullaby amidst District 23’s acid rain.',
    { sanity: -1, resonance: 1 }),

  D('d_distort_crystal_sprouts', [18, 99], { jobs: ['Distortion'] },
    'Những cánh hoa pha lê đỏ thẫm mọc xuyên qua lớp da tay bạn rồi nở rộ trong đêm tối, phát ra ánh sáng lung linh.',
    'Crimson crystal petals pierce your forearm, blooming in the dark with a hypnotic iridescence.',
    { health: 1, resonance: 1 }),

  D('d_distort_sound_of_heartbeats', [18, 99], { jobs: ['Distortion'] },
    'Bạn nghe thấy nhịp tim của mọi người trong bán kính ba dãy nhà. Từng tiếng đập đập đều vang lên như tiếng trống trận.',
    'You hear every heartbeat within three city blocks. Each pulse throbs like a distant war drum.',
    { resonance: 1 }),

  D('d_distort_sweepers_part_ways', [18, 99], { jobs: ['Distortion'] },
    'Đúng 3:13 AM, đàn Sweeper tràn ra hẻm. Khi thấy cái bóng biến dị khổng lồ của bạn, chúng lặng lẽ đổi hướng dạt sang hai bên.',
    'At exactly 3:13 AM, Sweepers swarm the alley. Sensing your towering silhouette, they silently divert around you.',
    { rep: 1 }),

  D('d_distort_tears_turn_to_glass', [18, 99], { jobs: ['Distortion'] },
    'Một giọt nước mắt trào ra từ con mắt thứ ba, đông cứng thành hạt thủy tinh đỏ thẫm kêu lách cách trên nền gạch.',
    'A tear spills from your tertiary eye, crystallizing into a scarlet glass bead that clatters across the cobbles.',
    { sanity: 1 }),

  D('d_distort_hana_patrol_drones', [18, 99], { jobs: ['Distortion'] },
    'Drone trinh sát của Hana quét tia laser xanh qua mái nhà bạn ẩn nấp rồi bay đi, phát ra cảnh báo: “Mối nguy cấp Urban Nightmare.”',
    'A Hana recon drone sweeps green lasers across your roost, buzzing away with an alert: “Urban Nightmare entity confirmed.”',
    { rep: 1, heat: 1 }),

  D('d_distort_scent_of_melting_steel', [18, 99], { jobs: ['Distortion'] },
    'Hơi thở của bạn phả ra làm chảy lỏng thanh lan can thép bên cạnh. The City dường như quá mỏng manh trước thể xác này.',
    'Your exhalation softens a steel railing nearby. The City feels impossibly brittle before this body.',
    { health: 1 }),

  D('d_distort_old_song_echoes', [18, 99], { jobs: ['Distortion'] },
    'Một điệu hát cổ bạn từng nghe mẹ hát thời thơ ấu chợt vọng lại trong đầu, xen lẫn tiếng cười trong trẻo của Carmen.',
    'An old nursery tune once sung in childhood drifts through memory, interlaced with Carmen’s clear laughter.',
    { sanity: 1 })
];

// ============================================================================
// 3. DISTORTION EXPANSION MAJORS (Apex Calamity & Metamorphosis Arcs)
// ============================================================================

export const DISTORTION_PARITY_MAJORS = [
  {
    id: 'distort_arc_star_calamity_ascension',
    age: [28, 99],
    major: true,
    weight: 40,
    need: { jobs: ['Distortion'], meritAtLeast: 100, stat: { rep: [65, 100], heat: [60, 100] } },
    requires: ['Distorted'],
    forbids: ['distort_star_calamity_done', 'distort_star_rampage_done', 'StarOfTheCityEntity'],
    vi: "[Khảo Thí Diệt Họa: Star of the City] Hana Association chính thức nâng cấp định danh của bạn lên hàng 'Star of the City', một Thảm Họa Cấp Tinh Tú. Một Giám đốc Section 1 của Liu Association cùng hai Fixer Grade 1 mang vũ khí rực lửa tiến vào phong tỏa toàn bộ khu phố nơi bạn cư ngụ.",
    en: "[Calamity Ordination: Star of the City] Hana Association officially designates you a 'Star of the City'. A Liu Association Section 1 Director flanked by two Grade 1 Fixers bearing blazing polearms seals the district around your lair.",
    choices: [
      {
        labelVi: "Dốc toàn bộ sức mạnh biến dị quyết chiến với Giám đốc Section 1",
        labelEn: "Unleash your full mutated might to battle the Section 1 Director",
        need: { stat: { health: [40, 100] } },
        outcomes: [
          {
            w: 60,
            resultVi: "Giao tranh rung chuyển cả khu phố. Lớp giáp lửa của viên Giám đốc bị móng vuốt bạn xé toạc; cả ba Fixer đỉnh cao phải rút lui trong máu và đổ nát. Hana ghi nhận một thảm họa không thể khuất phục.",
            resultEn: "The clash shatters the neighborhood. You tear open the Director’s flame armor; all three apex Fixers retreat through blood and rubble. Hana logs an unsubduable calamity.",
            effects: { health: -25, resonance: +35, rep: +50, sanity: -15 },
            flagsAdd: ['distort_star_calamity_done', 'LivingStarOfCity', 'BấtKhảKhuấtPhục'],
            meritAdd: 50
          },
          {
            w: 40,
            resultVi: "Hỏa diệm từ thương của Liu thiêu cháy một nửa lớp vỏ ngoài của bạn. Bạn phá được vòng vây để trốn xuống hầm mộ sâu nhưng mang theo những vết sẹo bỏng rát linh hồn.",
            resultEn: "Liu’s polearm flames scorch half your carapace. You breach the cordon and retreat into deep catacombs, bearing scars that burn into your soul.",
            effects: { health: -40, sanity: -25, heat: +35 },
            flagsAdd: ['distort_star_calamity_done'],
            scarsAdd: ['Sẹo hỏa kiếm Liu Section 1']
          }
        ]
      },
      {
        labelVi: "Hòa tan thân xác vào màn sương đỏ thẫm, làm biến dạng cả ba dãy nhà",
        labelEn: "Dissolve into crimson mist, warping the surrounding three blocks",
        outcomes: [
          {
            w: 65,
            resultVi: "Bạn biến môi trường xung quanh thành một mê cung dị thể sống. Các Fixer lạc hướng giữa những bức tường biết thở; bạn bình thản ngắm nhìn họ từ trên đỉnh tháp chuông đổ nát, dù tâm thức bạn ngày càng rời xa hình hài con người.",
            resultEn: "You transform the terrain into a living distortion labyrinth. Fixers stumble through breathing masonry; you watch calmly from a ruined bell tower as your mind drifts further from humanity.",
            effects: { resonance: +22, sanity: -14, rep: +28, heat: +16 },
            flagsAdd: ['distort_star_calamity_done', 'DistortionArchitect']
          },
          {
            w: 35,
            resultVi: "Trận địa hỏa công của Liu Section 1 đốt bốc hơi gần một nửa màn sương máu của bạn. Bạn giữ được lãnh địa nhưng bản thể suy kiệt nặng nề sau đòn thiêu đốt diện rộng.",
            resultEn: "Liu Section 1’s wide-area fire formation vaporizes nearly half your crimson mist. You hold your domain, yet your core essence suffers severe thermal depletion.",
            effects: { health: -32, sanity: -18, resonance: +10, heat: +20 },
            flagsAdd: ['distort_star_calamity_done']
          }
        ]
      }
    ]
  },

  {
    id: 'distort_arc_ego_clash_manifestation',
    age: [25, 99],
    major: true,
    weight: 35,
    requires: ['Distorted'],
    forbids: ['distort_ego_clash_done'],
    vi: "[Va Chạm Bản Ngã: Ánh Sáng Đối Đầu Dị Dạng] Một Fixer mang E.G.O thức tỉnh rực rỡ xuất hiện trước mặt bạn. Ánh sáng từ vũ khí của người ấy đâm buốt vào da thịt bạn; người ấy hét lên: “Ngươi đã đầu hàng sự yếu đuối của mình! Hãy tỉnh lại hoặc tan biến!”",
    en: "[Clash of Manifestation: Light vs Warped Desire] An Awakened E.G.O wielder Fixer steps before you. The light of their weapon sears your flesh; they cry out: “You surrendered to your weakness! Awaken or be erased!”",
    choices: [
      {
        labelVi: "Gầm lên đáp trả: “Đầu hàng? Đây là sự tự do tuyệt đối!” và tung đòn kết liễu",
        labelEn: "Roar back: \"Surrender? This is absolute liberation!\" and deliver a mortal strike",
        outcomes: [
          {
            w: 65,
            resultVi: "Hai ý chí va chạm tạo nên làn sóng chấn động thổi bay kính của toàn khu vực. Móng vuốt của bạn đánh gãy vũ khí E.G.O đối phương; người ấy ngã xuống với ánh mắt kinh hoàng trước vẻ đẹp bạo liệt của bạn.",
            resultEn: "Two wills collide, generating shockwaves that shatter windows for miles. Your talons shatter their E.G.O weapon; they fall in terror before your violent majesty.",
            effects: { health: -20, resonance: +28, rep: +32, sanity: -12, heat: +14 },
            flagsAdd: ['distort_ego_clash_done', 'EGOBreaker']
          },
          {
            w: 35,
            resultVi: "Ánh sáng E.G.O làm thanh tẩy một phần lớp vỏ ngoài của bạn, đánh thức ký ức đau đớn về kiếp người. Bạn đẩy lùi đối phương nhưng gục ngã vì cú sốc tâm lý.",
            resultEn: "The E.G.O light purges part of your carapace, awakening agonizing human memories. You repel the wielder but collapse from psychic trauma.",
            effects: { health: -30, sanity: -25, resonance: +15 },
            flagsAdd: ['distort_ego_clash_done']
          }
        ]
      },
      {
        labelVi: "Dùng tiếng thì thầm của Carmen lung lạc tâm trí của người mang E.G.O",
        labelEn: "Channel Carmen’s whisper to unravel the E.G.O wielder’s convictions",
        outcomes: [
          {
            w: 65,
            resultVi: "Giọng nói của bạn hòa cùng Carmen rót thẳng vào tai người Fixer. Ánh sáng vũ khí của người ấy lịm dần; người ấy ôm đầu gào thét khi nhận ra sự giả dối của lòng kiên định The City, dù cổ họng tâm linh của bạn rướm máu.",
            resultEn: "Your voice, laced with Carmen’s song, pours into the Fixer’s mind. Their light dims; they scream clutching their head as conviction crumbles, though your psychic vessel bleeds from the strain.",
            effects: { health: -12, sanity: -8, resonance: +22, rep: +26, heat: +12 },
            flagsAdd: ['distort_ego_clash_done', 'CorrupterOfConviction']
          },
          {
            w: 35,
            resultVi: "Ý chí sắt đá của người mang E.G.O phản dội ngược âm thanh của bạn, đâm xuyên qua lớp màng bảo vệ tâm thức và chém một đường sâu lên ngực bạn trước khi rút lui.",
            resultEn: "The E.G.O wielder’s iron conviction reflects your psychic chorus back at you, piercing your mental veil and carving a deep gash across your chest before withdrawing.",
            effects: { health: -28, sanity: -20, resonance: +8 },
            flagsAdd: ['distort_ego_clash_done'],
            scarsAdd: ['Vết chém phản chấn E.G.O']
          }
        ]
      }
    ]
  }
];
