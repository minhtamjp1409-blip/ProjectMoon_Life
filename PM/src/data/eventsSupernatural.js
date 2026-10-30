import { PREPARED_CHOICE_EVENTS } from './eventsPreparedChoices.js';
import { ABNORMALITY_FIELDWORK_EVENTS } from './eventsAbnormalityFieldwork.js';
import { FIXER_BREAKTHROUGH_EVENTS } from './eventsFixerBreakthrough.js';
// ============================================================================
// MAJOR EVENTS: WORKSHOPS, BLOODFIENDS, THE GREAT LAKE, HONGYUAN, THE PINKY,
// AND CARMEN'S VOICE. Plus the Fixer request templates.
// The "[Title]" opening each text heads the decision panel.
// ============================================================================

export const SUPERNATURAL_EVENTS = [
  ...PREPARED_CHOICE_EVENTS,
  ...ABNORMALITY_FIELDWORK_EVENTS,
  ...FIXER_BREAKTHROUGH_EVENTS,
  // ------------------------------------------------------------------ the Workshop
  // ------------------------------------------------------------------ Bloodfiends
  {
    id: 'bf_crimson_awakening',
    age: [19, 48],
    major: true,
    weight: 7,
    forbids: ['Bloodfiend'],
    vi: "[Lời mời dưới hầm] Đồng đội của bạn nằm bất động trong tầng hầm District 16. Một Trưởng Lão Bloodfiend nhấc bạn khỏi sàn. Bà ta cho bạn chọn: sống làm Bloodbag trong hầm, hoặc nhận máu của bà và mang theo cơn khát ấy.",
    en: '[A Bloodfiend’s offer] Your whole squad died in the underground manor. An Elder Bloodfiend held you by the throat with one hand, without effort.\n“You can be a Bloodbag, and I will drink you slowly. Or you can drink from me, and live forever with the thirst.”',
    choices: [
      {
        labelVi: 'Uống máu từ cổ tay bà ta',
        labelEn: 'Drink from her wrist',
        resultVi: "Bạn uống máu từ cổ tay bà ta. Cơn đau chạy qua xương rồi lắng xuống; răng nanh cạ vào môi dưới. Bạn sống sót và trở thành Bloodfiend. Khi đêm xuống, cơn khát bắt đầu trở lại.",
        resultEn: 'Her blood burned like molten metal. Your teeth lengthened; your bones broke and set themselves into a different shape. You will live a very long time. And every night you will thirst.',
        flagsAdd: ['Bloodfiend'],
        effects: { health: +22, sanity: -20, rep: +14, resonance: +22 },
        scarsAdd: ['Cơn khát không bao giờ hết'],
        meritAdd: 24,
        scheduleConsequences: [
          {
            eventId: 'csq_bloodfiend_banquet_call',
            delayYears: 5,
            reasonVi: 'Elder triệu tập bạn dự đêm tiệc máu',
            reasonEn: 'The Elder summons you to the blood banquet'
          }
        ]
      },
      {
        labelVi: 'Đập vỡ chai dầu cháy trên người mình',
        labelEn: 'Smash the incendiary flask on yourself',
        resultVi: "Bạn đập bình dầu và châm lửa giữa hai người. Bà ta buông tay; lửa bén vào lưng bạn. Fanghunt Office phá cửa xông vào, khống chế Trưởng Lão và đưa bạn ra ngoài. Họ chia cho bạn một phần tiền thưởng.",
        resultEn: 'The fire caught your back and her arm at the same moment. She let go. Right then, Fanghunt Office broke down the door with their stakes. They split the bounty with you.',
        effects: { health: -22, sanity: +6, wealth: +18, rep: +18, network: +12 },
        scarsAdd: ['Lưng bỏng đêm ấy'],
        meritAdd: 26
      }
    ]
  },

  // ------------------------------------------------------------------ the Great Lake
  {
    id: 'lake_calamity_whale_hunt',
    age: [19, 55],
    major: true,
    regions: ['U', '21'],
    weight: 6.5,
    vi: "[Pallid Whale] Bão quật con tàu bọc thép của U Corp trên Great Lake. Pallid Whale trồi lên, nuốt mất nửa đoàn. Dịch trắng bắn lên boong, làm thủy thủ hóa cứng. Người vừa chia thuốc lá với bạn đã trắng tới cằm và đang quay sang cắn bạn.",
    en: "[The Whale on the Great Lake] A storm throws a U Corp armored ship around on the Great Lake. The Pallid Whale surfaces and swallows half the fleet. White fluid splashes across the deck and sailors harden like wax, their legs fusing into tails. The person who shared a cigarette with you has gone white up to the chin and is turning to bite you.",
    choices: [
      {
        labelVi: 'Cắt cánh tay đang hóa trắng của người ấy, rồi nhận bệ phóng lao',
        labelEn: 'Cut off their whitening arm, then take the harpoon cannon',
        startDungeon: 'dungeon_great_lake',
        resultVi: 'Bạn cắt phần tay đã hóa trắng trước khi nó lan lên vai người ấy, rồi đẩy họ vào xuồng. Con tàu quay mũi vào sương, và chuông Luật Đại Hồ rung dồn dập quanh bạn.',
        resultEn: 'You cut off the whitened arm before it spreads to their shoulder, then push them into the lifeboat. The ship turns its bow into the fog, and the Lake Law bells ring wildly around you.'
      },
      {
        labelVi: 'Chặt đứt dây neo boong phụ và hạ xuồng cứu sinh bọc âm thoa U Corp',
        labelEn: 'Cut the aft deck anchor lines and launch the U Corp tuning-fork lifeboat',
        resultVi: 'Bạn kéo những thủy thủ chưa nhiễm dịch nhảy xuống xuồng ngay trước khi hàm răng khổng lồ khép lại. Tiếng sóng Đại Hồ gầm rú sau lưng.',
        resultEn: 'You haul the uninfected sailors into the boat just before the colossal jaws close. The Great Lake roars behind you.',
        effects: { health: -8, sanity: -6, rep: +6, network: +8 },
        meritAdd: 8
      }
    ]
  },

  // ------------------------------------------------------------------ Hongyuan
  {
    id: 'hy_hierarch_evaluation',
    age: [20, 50],
    major: true,
    weight: 8,
    vi: "[Kỳ sát hạch Hongyuan] Trưởng lão ngồi uống trà trên lầu; dưới sân, người của các nhánh gia tộc chém giết để chọn kẻ thắng. Trước bài vị tổ tiên là viên Huyết Đan luyện từ máu người bại trận. Muốn giành ghế Gia chủ, bạn phải nuốt nó và sống qua đêm.",
    en: '[Choosing a Hierarch in Hongyuan] In District 8 the heirs of the great families sit drinking tea and smiling while their servants kill each other in the courtyard below.\nTo become Hierarch you must swallow a Bolus refined from the blood of those who lost. If your body cannot bear it, it will eat you from the inside.',
    choices: [
      {
        labelVi: 'Nuốt viên Bolus',
        labelEn: 'Swallow the Bolus',
        outcomes: [
          {
            w: 58,
            resultVi: "Viên Huyết Đan đốt nóng cổ họng. Bạn ở trong mật thất suốt đêm, máu đen thấm qua tay áo. Sáng ra, bạn bước tới trước các trưởng lão. Không ai ngăn bạn ngồi vào ghế Gia chủ.",
            resultEn: 'Black blood ran from your eyes and nose all night. By morning you stood, and your body was not what it had been. Three cousins had not yet set down their teacups.',
            flagsAdd: ['HongyuanHierarch'],
            recordsAdd: ['hongyuan_lord'],
            effects: { health: +20, wealth: +45, rep: +36, network: +30, sanity: -24, resonance: +26 },
            scarsAdd: ['Viên Bolus của Hongyuan'],
            meritAdd: 38
          },
          {
            w: 42,
            resultVi: "Huyết Đan làm máu độc trào lên dưới da. Bạn rạch tay để thoát bớt độc rồi rời sân viện. Những người thừa kế khác vẫn uống trà; ghế Gia chủ không dành cho bạn hôm nay.",
            resultEn: 'The Bolus burst your blood vessels from within. You had to cut yourself open to let the poison out, then crawl from the courtyard while the other heirs went on drinking their tea.',
            effects: { health: -46, sanity: -28, resonance: +28 },
            scarsAdd: ['Viên Bolus không chịu nổi']
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ the Pinky
  {
    id: 'pinky_star_blade_oath',
    age: [28, 62],
    major: true,
    weight: 7.5,
    jobs: ['Syndicate'],
    need: { finger: 'Pinky', fingerRank: 1 },
    forbids: ['promo_pinky_star_done'],
    vi: "[Lời thề The Pinky] Trên tháp chuông, một đao thủ đặt thanh kiếm của kẻ phản bội dưới chân bạn. \"Muốn dẫn đường cho chúng ta, hãy khảm một mẩu xương của chính mình vào đốc kiếm.\" Con dao nhỏ nằm cạnh đó, còn người của The Pinky đang chờ.",
    en: '[The Pinky’s oath] On top of a bell tower in the rain, someone of the Pinky drew a sword from a traitor’s chest and laid it at your feet.\n“In the Pinky there are no ranks, only oaths. Take a piece of your own rib and set it into this hilt.”',
    choices: [
      {
        labelVi: 'Làm theo',
        labelEn: 'Do it',
        resultVi: "Bạn dùng con dao lấy một mẩu xương sườn, đặt vào hốc trên đốc kiếm. Người đao thủ khóa nó lại, trao kiếm cho bạn. The Pinky ghi nhận lời thề; vết thương sẽ nhắc bạn về nó.",
        resultEn: 'You did it yourself, with a small knife, while the other watched in silence. The piece of bone fit the hilt exactly, as if it had been waiting there. From tonight you are a Star of the Pinky.',
        setFinger: 'Pinky',
        setFingerRank: 2,
        flagsAdd: ['promo_pinky_star_done'],
        recordsAdd: ['pinky_star'],
        effects: { health: -28, sanity: -15, rep: +28, wealth: +24, resonance: +24 },
        scarsAdd: ['Mảnh xương sườn trong chuôi kiếm'],
        meritAdd: 24
      }
    ]
  },

  // ------------------------------------------------------------------ Carmen / E.G.O & Distortion
  {
    id: 'ego_carmen_crossroad',
    age: [18, 140],
    major: true,
    weight: 999,
    forbids: ['EGOAwakened', 'Distorted'],
    vi: "[Giọng nói trong ánh sáng] Những vết sẹo cũ ({scars}) đau trở lại. The City mờ đi; một giọng phụ nữ cất lên trong ánh sáng: \"Bạn đã chịu đủ rồi. Đừng ép mình mang hình dạng người khác mong muốn.\" Bàn tay bạn run. Bạn có thể nghe theo, hoặc tự chọn mình sẽ là ai.",
    en: '[Can you hear my voice? · The Scorching Sun of The Light] Everything you ever lost returned at once ({scars}). The surrounding room dissolved into a blinding white sun, an ocean of radiant, scorching light. From the center of the brilliant sun, a woman with piercing eyes and a gentle smile tilted her head:\n“It hurts so much, doesn’t it? In this City, clinging to a human shape only gets you torn apart. Love yourself. You can let go, and become what you truly desire.”',
    choices: [
      {
        labelVi: '"Nỗi đau này là của tôi. Những vết sẹo này thuộc về tôi. Tôi sẽ không khuất phục trước sự an ủi dối trá của người!"',
        labelEn: '“This pain is mine. I will not yield before your sun.”',
        outcomes: [
          {
            w: 40,
            openEgoModal: true,
            flagsAdd: ['EGOAwakened', 'ShinAwakened'],
            recordsAdd: ['ego_effloresced'],
            effects: { health: +18, sanity: +32, rep: +38, resonance: +25 },
            scarsAdd: ['Người không cúi đầu trước Carmen'],
            meritAdd: 45,
            resultVi: "Bạn giữ lấy ký ức của mình, cả phần đau đớn. Ánh sáng lùi lại; E.G.O thành hình quanh cơ thể bạn như giáp và vũ khí. Nó mang hình dạng do chính bạn chọn.",
            resultEn: 'You held firm to every memory and scar, refusing to yield before Carmen’s radiant sun. The blinding light fractured against your unbending resolve. From the depths of your psyche, armor and a weapon forged from your agony manifested. It is your E.G.O.'
          },
          {
            w: 38,
            flagsAdd: ['IncompleteEGO'],
            effects: { health: -18, sanity: -12, rep: +20, resonance: +18 },
            scarsAdd: ['Vết rạn khung cửi tự ngã'],
            meritAdd: 25,
            scheduleConsequences: [
              {
                eventId: 'ego_second_efflorescence_trial',
                delayYears: 2,
                reasonVi: 'E.G.O chưa hoàn chỉnh đang tìm kiếm khoảnh khắc bộc phát trọn vẹn',
                reasonEn: 'Your incomplete E.G.O seeks its true efflorescence'
              }
            ],
            resultVi: "E.G.O vừa hiện ra đã nứt. Mảnh giáp rơi xuống, để lại vết bỏng trên tay bạn. Bạn vẫn tỉnh táo, nhưng sức mạnh ấy chưa ổn định; một ngày khác bạn sẽ phải đối diện nó lần nữa.",
            resultEn: 'You roared in resistance, but your inner philosophy was not yet forged enough to bear the full weight of the light. The E.G.O half-manifested then cracked, emotion scorch marks searing your flesh. You did not break, but your soul bears a fissure: an Incomplete E.G.O.'
          },
          {
            w: 22,
            flagsAdd: ['Distorted'],
            recordsAdd: ['distortion_awaken'],
            effects: { health: +40, sanity: -60, rep: +30, heat: +45, resonance: +55 },
            scarsAdd: ['Ý chí gãy đổ'],
            meritAdd: 20,
            resultVi: "Bạn nghe theo giọng nói và buông ý chí đang giữ mình lại. Cơ thể biến đổi theo nỗi đau bạn không còn kìm được. Khi Hana cập nhật hồ sơ, họ ghi một Distortion mới xuất hiện.",
            resultEn: 'Carmen’s murmur from the radiant sun was too sweet. In that final hesitation, your resolve shattered. Your flesh morphed into the shape of your sorrow. Hana Association updated its file: Distorted.'
          }
        ]
      },
      {
        labelVi: 'Đốt cháy những vết sẹo quá khứ làm mồi lửa bộc phát',
        labelEn: 'Burn every past scar as living fuel for breakthrough',
        outcomes: [
          {
            w: 36,
            openEgoModal: true,
            flagsAdd: ['EGOAwakened', 'ShinAwakened'],
            recordsAdd: ['ego_effloresced'],
            effects: { health: -32, sanity: +30, rep: +42, resonance: +35 },
            scarsAdd: ['Tro Tàn Tự Ngã'],
            meritAdd: 50,
            resultVi: 'Bạn biến chính những vết sẹo rỉ máu thành mồi lửa, thiêu rụi sự cám dỗ dịu dàng của Carmen. Cơ thể bạn chằng chịt vết rách, nhưng từ trong biển lửa tro tàn, E.G.O hoàn chỉnh xuất hiện với uy lực chấn áp tất cả.',
            resultEn: 'Turning your bleeding scars into kindling, you incinerated Carmen’s gentle whispers. Your body tore with wounds, but from the ashes, complete E.G.O emerged with overwhelming might.'
          },
          {
            w: 28,
            flagsAdd: ['Distorted'],
            recordsAdd: ['distortion_awaken'],
            effects: { health: +50, sanity: -65, rep: +35, heat: +50, resonance: +60 },
            scarsAdd: ['Ngọn Lửa Cuồng Loạn'],
            meritAdd: 30,
            resultVi: 'Ngọn lửa cảm xúc bốc cháy vượt quá tầm kiểm soát của cơ thể bạn. Sức nóng thiêu rụi lý trí; thay vì E.G.O, bạn sụp đổ hoàn toàn vào nỗi ám ảnh tột cùng. Một con quái vật Distortion sinh ra từ tro tàn.',
            resultEn: 'The emotional blaze flared beyond mortal endurance. The heat consumed your sanity; instead of E.G.O, you collapsed entirely into obsession. A ravenous Distortion arose from the ashes.'
          },
          {
            w: 36,
            flagsAdd: ['IncompleteEGO'],
            effects: { health: -35, sanity: -20, rep: +22, resonance: +25 },
            scarsAdd: ['Vết Bỏng Linh Hồn'],
            meritAdd: 25,
            scheduleConsequences: [
              {
                eventId: 'ego_second_efflorescence_trial',
                delayYears: 2,
                reasonVi: 'E.G.O tàn lửa đang chờ tôi luyện lại',
                reasonEn: 'Smoldering incomplete E.G.O awaiting rekindling'
              }
            ],
            resultVi: 'Ngọn lửa đốt cháy da thịt bạn nhưng lụi tàn giữa chừng. Bạn ngã quỵ trên vũng máu, một mảnh giáp E.G.O vỡ vụn dính chặt vào xương ngực: E.G.O Chưa Hoàn Chỉnh.',
            resultEn: 'The inferno scorched your flesh but petered out midway. You collapsed bleeding, a shattered shard of E.G.O armor fused to your breastbone: Incomplete E.G.O.'
          }
        ]
      },
      {
        labelVi: 'Nhắm mắt lại, buông xuôi ý chí và đắm chìm vào vầng thái dương ấm áp',
        labelEn: 'Close your eyes, surrender your will and sink into the warm radiant sun',
        flagsAdd: ['Distorted'],
        recordsAdd: ['distortion_awaken'],
        effects: { health: -15, sanity: -70, rep: -25, heat: +60, resonance: +50 },
        scarsAdd: ['Distortion'],
        meritAdd: 25,
        resultVi: 'Không còn đau nữa. Đó là điều đầu tiên bạn nhận ra. Vầng thái dương của Carmen bao trùm lấy bạn, cảm giác ấm áp lan tỏa khi cơ thể bạn biến đổi thành hình dạng của nỗi ám ảnh sâu kín nhất. Sáng hôm sau, Hana Association phát lệnh phong tỏa khu vực: Một Distortion cấp độ cao đã xuất hiện.',
        resultEn: 'It no longer hurt. That was the first thing you noticed. Carmen’s blazing sun enveloped you; a soothing warmth spread as your flesh morphed into the shape of your deepest obsession. The next morning Hana Association opened a new file: Distortion, unrated.'
      },
      {
        labelVi: 'Cắn chặt răng quay lưng, dùng ý chí sắt đá và lời thề níu lấy sự tỉnh táo phàm trần',
        labelEn: 'Grit your teeth and turn away, clinging to iron will, creed and mortal sanity',
        effects: { sanity: +45, health: +10, rep: +25, resonance: -25 },
        scarsAdd: ['Kẻ từ chối tiếng gọi thái dương'],
        meritAdd: 25,
        resultVi: 'Bạn nhắm mắt, bịt tai, dùng lời thề với các huynh đệ và tổ chức khước từ mọi cám dỗ từ vầng thái dương của Carmen. Biển ánh sáng tan biến; bạn trở về thực tại: một con người trần thế kiên cường tiếp tục bước đi trên mặt đất The City.',
        resultEn: 'You shut your eyes and closed your ears, clinging to oaths and brotherhood to refuse every whisper from Carmen. The blinding sun dissolved; you remained yourself: an ordinary human walking the ground of The City.'
      }
    ]
  },

  // ------------------------------------------------------------------ Second Efflorescence Trial
  {
    id: 'ego_second_efflorescence_trial',
    age: [19, 99],
    major: true,
    weight: 950,
    isCausalCallback: true,
    causalReasonVi: 'Vết rạn E.G.O năm xưa đang tìm kiếm sự hoàn thiện',
    causalReasonEn: 'The fissure in your past E.G.O seeks complete efflorescence',
    vi: '[True Efflorescence · Khai Hoa Trọn Vẹn] Ngọn lửa E.G.O chưa hoàn chỉnh trong lồng ngực bạn lại cháy bùng khi một cơn nguy biến Backstreets ập đến. Lần này, bạn không còn bỡ ngỡ. Trước mắt bạn là con đường bạn đã đi qua và cái giá bạn đã trả.',
    en: '[True Efflorescence · Complete Blooming] The incomplete E.G.O flame in your chest flared again as a Backstreets crisis struck. This time, you did not waver. Before your eyes lay every path you had walked and every price you had paid.',
    choices: [
      {
        labelVi: 'Hàn gắn vết rạn tâm thức: Đánh cược tôi luyện để Khai hoa E.G.O',
        labelEn: 'Mend the soul fissure: Forge through trial to Effloresce True E.G.O',
        outcomes: [
          {
            w: 52,
            openEgoModal: true,
            flagsAdd: ['EGOAwakened', 'ShinAwakened'],
            flagsRemove: ['IncompleteEGO'],
            recordsAdd: ['ego_effloresced'],
            effects: { health: +22, sanity: +30, rep: +35, resonance: +25 },
            scarsAdd: ['Bản Ngã Tái Sinh'],
            meritAdd: 50,
            resultVi: 'Vết nứt trên linh hồn liền lại thành một lớp giáp hoàng kim. E.G.O hoàn chỉnh bao bọc lấy bạn, tĩnh lặng và uy nghiêm. Cả khu phố nín thở trước luồng ánh sáng thuần khiết.',
            resultEn: 'The fracture in your soul welded into golden armor. Complete E.G.O enveloped you, serene and sovereign. The entire street held its breath before the pure light.'
          },
          {
            w: 20,
            flagsAdd: ['Distorted'],
            flagsRemove: ['IncompleteEGO'],
            recordsAdd: ['distortion_awaken'],
            effects: { health: +35, sanity: -60, rep: +20, resonance: +40 },
            scarsAdd: ['Lửa Tràn Phá Vỡ'],
            meritAdd: 30,
            resultVi: 'Sức ép từ mảnh E.G.O dang dở quá lớn so với giới hạn chịu đựng. Thay vì khai hoa, vết nứt vỡ toác thành một vụ nổ biến dạng tâm thần. Bạn sụp đổ thành một Distortion tàn bạo.',
            resultEn: 'The strain of the incomplete E.G.O exceeded mortal limits. Instead of blooming, the fissure ruptured into a violent psychic collapse. You distorted into a monstrous entity.'
          },
          {
            w: 28,
            effects: { health: -20, sanity: -15, rep: +10 },
            scarsAdd: ['Vết Nứt Chưa Liền'],
            meritAdd: 15,
            resultVi: 'Mảnh E.G.O rung chuyển dữ dội nhưng vẫn chưa thể nở rộ. Vết rạn vẫn ở đó, nhức nhối nhưng vẫn giữ bạn đứng vững ở lằn ranh phàm nhân.',
            resultEn: 'The E.G.O shard trembled violently but refused to bloom. The fissure remained, aching yet keeping you anchored on the mortal shore.'
          }
        ]
      },
      {
        labelVi: 'Kìm nén ngọn lửa: Bảo toàn sức lực cho ngày sau',
        labelEn: 'Contain the flame: Conserve strength for another day',
        effects: { sanity: +15, health: +10, rep: +10 },
        resultVi: 'Bạn hít sâu và nén ngọn lửa vào tận đáy tim. E.G.O lắng xuống, chờ đợi một ngày khác xứng đáng hơn.',
        resultEn: 'Drawing a deep breath, you compressed the flame to the depths of your heart. The E.G.O subsided, awaiting a more fitting crucible.'
      }
    ]
  },

  // ------------------------------------------------------------------ Hana Color Fixer Supreme Trial
  {
    id: 'hana_color_ascension_trial',
    repeatable: true,
    age: [20, 95],
    major: true,
    weight: 980,
    jobs: ['Fixer'],
    forbids: ['ColorFixer', 'Distorted'],
    vi: "[Bài thử Color] Hana giao bạn xử lý một mối họa cấp Star of the City. Các Director đặt tấm thẻ chưa ghi tên lên bàn: \"Trở về sau nhiệm vụ, chúng tôi sẽ khắc Color của bạn lên đây.\"",
    en: "[Color Trial] Hana gives you a Star of the City threat to handle. The Directors set a blank card on the table: “When you come back from the mission, we will engrave your Color here.”",
    choices: [
      {
        labelVi: "Đi một mình, đối đầu trực diện với mối họa",
        labelEn: "Go alone and face the threat head on",
        outcomes: [
          {
            w: 65,
            need: { stat: { health: [35, 100] } },
            openColorModal: true,
            flagsAdd: ['ColorFixer'],
            recordsAdd: ['color_fixer'],
            effects: { health: -35, sanity: -20, rep: +45, wealth: +40, heat: +18 },
            scarsAdd: ['Vết sẹo của Star of the City'],
            later: [{ id: 'csq_color_first_mandate', years: 1, reasonVi: 'Chỉ thị tối mật đầu tiên của Hana dành cho tân Color Fixer', reasonEn: 'First high-stakes Hana mandate for the newly designated Color Fixer' }],
            meritAdd: 60,
            resultVi: "Bạn phá lõi của mối họa sau một trận chiến dài và tàn khốc. Khi trở về với thương tích đầy mình, hội đồng Hana đứng dậy nghênh đón. Tên Color mới được khắc ngay tại chỗ. Nhưng gánh nặng của The City lập tức giáng xuống vai: một ủy thác tối mật của Hana sẽ tìm đến vào năm sau.",
            resultEn: "You break the threat's core after a long, agonizing fight. When you return covered in blood, the Hana council stands in silent respect. Your new Color is engraved right there. But the City's burdens fall upon your shoulders: a high-stakes mandate awaits you next year."
          },
          {
            w: 35,
            effects: { health: -45, sanity: -35, rep: +25, heat: +20 },
            scarsAdd: ['Thương tật từ Star of the City'],
            meritAdd: 30,
            resultVi: 'Sức mạnh của mối họa vượt xa dự tính. Bạn chém đứt được một chi của nó nhưng bị đánh văng qua ba dãy tường bê tông, nát vụn xương sườn. Bạn sống sót nhưng bất tỉnh ba tuần. Hana Association ghi nhận chiến công nhưng hoãn kỳ phong Color cho đến khi bạn bình phục.',
            resultEn: "The threat is far stronger than anyone estimated. You cut off one of its limbs but are thrown through three concrete walls, ribs shattered. You survive but lie unconscious for three weeks. Hana records the deed and postpones the Color ceremony until you recover."
          }
        ]
      },
      {
        labelVi: "Phối hợp với Seven Association và thế chấp tài chính để lập thế trận",
        labelEn: "Work with Seven Association to find its weak point, then strike",
        need: { stat: { wealth: [15, 100], sanity: [30, 100] } },
        costAhn: 15,
        outcomes: [{
          w: 75,
          openColorModal: true,
          flagsAdd: ['ColorFixer', 'AssociationDebtObligation'],
          recordsAdd: ['color_fixer'],
          effects: { health: -16, sanity: -12, rep: +40 },
          scarsAdd: ['Bản đồ giải phẫu Star of the City'],
          later: [{ id: 'csq_seven_debt_reckoning', years: 2, reasonVi: 'Khoản nợ ân nghĩa và ràng buộc của Seven Association', reasonEn: 'Seven Association promissory obligation and intelligence debt' }],
          meritAdd: 45,
          resultVi: "Bạn trả 15 Ahn cho Seven Association để nhận bản đồ giải phẫu Singularity và sơ hở chí mạng. Một nhát đâm xuyên thẳng vào tâm hạch. Nest được giữ nguyên. Hana đóng dấu: một Color mới đạt được bằng sự chuẩn xác, nhưng Seven Association nay nắm giữ cam kết của bạn.",
          resultEn: "You pay 15 Ahn to Seven Association for the Singularity anatomy map and openings. One thrust to the heart. The Nest is spared. Hana stamps the card: a new Color, earned by precision, but Seven now holds a binding agreement."
        }, {
          w: 25,
          effects: { health: -24, sanity: -18, rep: -5 },
          resultVi: 'Bản đồ của Seven bỏ sót một lõi phụ. Bạn ra hiệu rút lui trước khi vòng vây khép lại. Tiền điều tra đã mất; Hana yêu cầu ba năm hồi phục và bổ sung hồ sơ trước khi xét lại.',
          resultEn: 'Seven’s map missed a secondary core. You signal a retreat before the ring closes. The investigation fee is spent; Hana requires three years of recovery and further field work before reconsidering.'
        }]
      },
      {
        labelVi: "Kề vai sát cánh cùng cộng sự: Dốc toàn lực nghênh chiến",
        labelEn: "Fight alongside your companion: Put everything on the line",
        need: { companionActive: true },
        outcomes: [
          {
            w: 85,
            openColorModal: true,
            flagsAdd: ['ColorFixer', 'CompanionShieldedYou', 'PartnerShieldedYouInColorTrial'],
            recordsAdd: ['color_fixer'],
            effects: { health: -18, sanity: -10, rep: +50, wealth: +45 },
            scarsAdd: ['Ký ức đẫm máu cùng cộng sự'],
            later: [{ id: 'csq_color_sponsor_aftermath', years: 1, reasonVi: 'Cộng sự trọng thương sau kỳ khảo thí Color cần được chữa trị', reasonEn: 'Companion critically injured during the Color trial requires care' }],
            meritAdd: 65,
            resultVi: "Cộng sự của bạn xông lên đỡ đòn cào xé từ thực thể Star of the City, che chắn góc chết trong tích tắc. Bạn chớp thời cơ vung vũ khí chém vỡ lõi năng lượng. Bạn cõng người đồng đội đẫm máu về trạm cứu trợ Hana. Tên Color được trao cho bạn, nhưng cái giá được tính bằng máu của người thân cận.",
            resultEn: "Your companion leaps forward to shield your blind spot from the Star of the City monstrosity. You seize the split-second window to shatter its energy core. You carry your bleeding partner back to Hana's medics. The Color is granted, but its price was paid in your closest ally's blood."
          },
          {
            w: 15,
            effects: { health: -30, sanity: -25, rep: +10 },
            scarsAdd: ['Cơn hoảng loạn tại vòng khảo thí'],
            resultVi: "Phối hợp bị chệch nhịp trước đòn quét diện rộng của thực thể. Cả hai buộc phải rút lui trong biển khói. Kỳ phong Color tạm hoãn cho đến khi cả hai bình phục hoàn toàn.",
            resultEn: "Coordination falters under the entity's sweeping strike. You both retreat through smoke. The Color investiture is postponed until both of you fully recover."
          }
        ]
      },
      {
        labelVi: "Để E.G.O đi trước, theo nhịp thở đã học",
        labelEn: "Let the E.G.O go first, on the breathing you learned",
        need: { flags: ['EGOAttuned'], stat: { sanity: [30, 100] } },
        outcomes: [
          {
            w: 82,
            openColorModal: true,
            flagsAdd: ['ColorFixer'],
            recordsAdd: ['color_fixer'],
            effects: { health: -20, sanity: -14, rep: +46, wealth: +38, resonance: +8 },
            scarsAdd: ['Nhịp thở của Star of the City'],
            later: [{ id: 'csq_color_first_mandate', years: 1, reasonVi: 'Chỉ thị tối mật đầu tiên của Hana dành cho tân Color Fixer', reasonEn: 'First high-stakes Hana mandate for the new Color Fixer' }],
            meritAdd: 60,
            resultVi: 'Thanh E.G.O hiện ra trước khi bạn rút tay khỏi túi. Hai nhịp thở trùng nhau, và mối họa chậm lại đúng một nhịp, đủ để lưỡi kiếm đi qua. Khi bạn trở về, hội đồng không đứng dậy. Họ chỉ xoay ghế để nhìn bạn đi qua.',
            resultEn: 'The E.G.O appears before your hand leaves your pocket. The two breaths coincide, and the threat slows by exactly one beat, enough for the blade to pass. When you return the council does not rise. They only turn their chairs to watch you walk past.'
          },
          {
            w: 18,
            effects: { health: -34, sanity: -26, rep: +12, resonance: +4 },
            scarsAdd: ['Tiếng thở thứ hai trong bài thử'],
            meritAdd: 25,
            resultVi: 'Nhịp chung đến quá sớm. Thanh E.G.O lao đi trước khi bạn kịp quyết định mục tiêu, và thứ bạn đánh trúng là bức tường. Bạn rút lui khi tiếng thở thứ hai vẫn còn trong tai.',
            resultEn: 'The shared rhythm arrives too early. The E.G.O lunges before you can pick a target, and what you strike is the wall. You retreat with the second breath still in your ears.'
          }
        ]
      },
      {
        labelVi: "Từ chối vòng Color và ở lại làm Fixer Grade 1 tự do",
        labelEn: "Refuse the Color and stay a free Fixer Grade 1",
        flagsAdd: ['ColorRefused'],
        effects: { sanity: +20, rep: +22, wealth: +25 },
        scarsAdd: ['Người từ chối làm Color'],
        meritAdd: 20,
        resultVi: "Bạn đặt bản ủy thác xuống bàn và nói: “Làm Color chỉ biến tôi thành mục tiêu cho The Head và con rối của các Wing. Tôi thích tự do ở Grade 1.” Cả phòng im lặng. Trước sáng, tin về Fixer từ chối Color đã lan khắp Backstreets.",
        resultEn: "You set the contract on the table and say: “Being a Color would only make me a target for The Head and a puppet for the Wings. I prefer to be free at Grade 1.” The room goes silent. By morning the story of the Fixer who refused a Color is all over the Backstreets."
      }
    ]
  },

  // ------------------------------------------------------------------ Wuthering Heights & Wild Hunt (T Corp)
  {
    id: 'canto_wuthering_wild_hunt',
    age: [21, 65],
    major: true,
    regions: ['20'],
    weight: 5.5,
    vi: "[Cuộc Săn Hoang Dã] Sương phủ District 20 khi một kỵ sĩ cưỡi ngựa xương dẫn đoàn The Wild Hunt qua hẻm. Quan tài xích sau lưng hắn kéo lê trên đá. Đường rút của bạn đã bị đội hình bóng ma chặn.",
    en: '[Temporal Tempest · Echoes of the Wild Hunt] On the foggy moors of District 20 · T Corp, a temporal storm ruptured. A knight astride a skeletal steed led the phantoms of The Wild Hunt through the alleys. From atop a chained coffin, the knight roared: “Every counterpart across the Mirror Worlds must suffer this exact despair!”',
    choices: [
      {
        labelVi: 'Chém đứt xiềng xích của chiếc quan tài: Khẳng định bản ngã độc nhất',
        labelEn: 'Sever the coffin chains: Affirm your singular unyielding self',
        outcomes: [
          {
            w: 55,
            effects: { health: -25, sanity: +35, rep: +30, resonance: +25 },
            scarsAdd: ['Kẻ chém đứt xiềng xích Erlking'],
            recordsAdd: ['wild_hunt_vanquisher'],
            meritAdd: 35,
            resultVi: "Bạn để lưỡi kiếm Erlking sượt vai, đổi lấy nhát chém vào khớp cổ ngựa. Quan tài nứt, đoàn săn tan trong sương. Nhân viên T Corp đến ghi nhận hiện trường; bạn vẫn còn phải băng vai.",
            resultEn: 'Throwing yourself past Erlking’s blade, you took a gash across your shoulder to sever the spectral steed’s neck joint. The chained coffin cracked open. T Corp’s temporal fog cleared amidst dying groans of shattered counterparts. A T Corp clerk arrived only to stamp the log: “Temporal hazard resolved.”'
          },
          {
            w: 45,
            effects: { health: -40, sanity: -25, resonance: +30 },
            scarsAdd: ['Tiếng hú của Cuộc Săn Hoang Dã'],
            resultVi: 'Sức nặng của ngàn linh hồn từ các Thế Giới Gương đè bẹp vũ khí của bạn. Bạn bị đánh văng xuống sườn đồi đầy đá nhọn. Đêm nào trong giấc ngủ bạn cũng nghe thấy tiếng vó ngựa của Erlking rầm rập qua đầu.',
            resultEn: 'The weight of a thousand mirror souls crushed your weapon. Hurled down the rocky crags, you survived, yet every night in sleep you hear Erlking’s ghostly hooves thundering above.'
          }
        ]
      },
      {
        labelVi: 'Giao ước với The Wild Hunt: Nhận lấy cỗ xe linh hồn',
        labelEn: 'Pact with The Wild Hunt: Claim the spectral chariot',
        effects: { sanity: -30, rep: +40, heat: +35, resonance: +40 },
        flagsAdd: ['WildHuntRider'],
        scarsAdd: ['Kỵ sĩ của The Wild Hunt'],
        meritAdd: 40,
        resultVi: 'Bạn nhận lấy thanh đại đao và tấm áo choàng rách rưới. Erlking trao cho bạn dây cương của một con ngựa tử linh. Khi bạn giẫm chân, mặt đất T Corp rung chuyển theo tiếng gọi của cõi chết.',
        resultEn: 'Accepting the jagged blade and tattered mantle, Erlking handed you the reins of a spectral steed. With every step you take, T Corp’s stone quakes to the call of the fallen.'
      }
    ]
  },

  // ------------------------------------------------------------------ La Mancha Land (P Corp)
  {
    id: 'canto_lamancha_carnival',
    age: [20, 60],
    major: true,
    regions: ['16'],
    weight: 5.0,
    vi: "[Vòng quay La Mancha] Công viên dưới District 16 mở cửa lúc đêm muộn. Máu dính trên quầy bánh; nhạc đu quay vẫn phát. Một hiệp sĩ áo giáp gỉ hỏi bạn có muốn giúp ông giữ nơi này cho cả người và Bloodfiend.",
    en: '[Beneath P Corp · The Rusted Carousel of La Mancha] In District 16 · P Corp, a brilliant yet eerie amusement park awakened in the dead of night. Carousel organ tunes mingled with the scent of blood churros. A knight in rusted plate with a gleaming lance stood before the carousel, eyes blazing with naive conviction:\n“Hail, traveler! Wilt thou mount a steed beside us, riding toward a world where Bloodfiend and mankind share a single smile?”',
    choices: [
      {
        labelVi: 'Đồng hành cùng lý tưởng hiệp sĩ: "Công lý và giấc mơ thuần khiết"',
        labelEn: 'Champion the knight’s chivalric dream: “Justice and pure idealism”',
        outcomes: [
          {
            w: 60,
            effects: { health: +15, sanity: +45, rep: +25, resonance: +20 },
            scarsAdd: ['Hiệp sĩ của Giấc Mơ Hoang'],
            recordsAdd: ['lamancha_dreamer'],
            meritAdd: 30,
            resultVi: "Bạn đứng cùng hiệp sĩ trên bục gỗ. Bloodfiend phía dưới nhìn lên, chưa ai hạ vũ khí. Buổi tối trôi qua mà không có tiếng kêu từ khu đu quay.",
            resultEn: 'You stood beside the rusted knight upon the creaking dais. His lance trembled in the wind; the reek of blood from the churros rose thick and heavy. The kindred below looked up, crimson eyes blinking beneath stuttering neon. No one smiled. Yet for this single night, no flesh was torn in the dark.'
          },
          {
            w: 40,
            effects: { health: -30, sanity: -20, resonance: +25 },
            scarsAdd: ['Chiếc mặt nạ đẫm máu của La Mancha'],
            resultVi: 'Ảo mộng sụp đổ quá nhanh. Vòng quay ngựa gỗ biến thành máy nghiền thịt khi cơn khát của những Bloodfiend cấp dưới bùng phát. Bạn và hiệp sĩ phải chém gục hàng chục người trong nước mắt.',
            resultEn: 'The reverie collapsed all too soon. The carousel twisted into a slaughter wheel as starved lesser kindred lost control. You and the knight had to cut down dozens amidst tears.'
          }
        ]
      },
      {
        labelVi: 'Vạch trần trò lừa dối: Giẫm nát bánh churros và thanh tẩy khu vui chơi',
        labelEn: 'Expose the delusion: Crush the blood churros and purge the park',
        effects: { health: -20, sanity: -15, wealth: +35, rep: +30 },
        recordsAdd: ['fanghunt_honorary'],
        scarsAdd: ['Kẻ phá hủy công viên La Mancha'],
        meritAdd: 35,
        resultVi: 'Bạn phóng hỏa thiêu rụi vòng đu quay và đập nát nguồn cung cấp máu của P Corp. Fanghunt Office gửi thư khen ngợi kèm theo số tiền thưởng kếch xù. Hiệp sĩ nhìn bạn bằng đôi mắt vụn vỡ.',
        resultEn: 'Setting the carousel ablaze and severing the blood supply lines, Fanghunt Office wired an immense bounty with commendations. The rusted knight stared at you with shattered eyes.'
      }
    ]
  },

  // ------------------------------------------------------------------ The Ring's Gallery (District 8)
  {
    id: 'canto_ring_carnage_gallery',
    age: [22, 65],
    major: true,
    regions: ['8'],
    weight: 4.5,
    jobs: ['Syndicate', 'Fixer', 'Workshop Craftsman'],
    vi: "[Phòng tranh của The Ring] Docent chỉ bức tượng ghép từ mười hai kẻ phản bội. Một kiếm sĩ ngậm điếu thuốc đỏ hỏi bạn muốn đứng trong khung tranh hay nhìn từ ngoài. Cửa phòng sau lưng vừa khép.",
    en: '[The Ring’s Gallery · Brushstroke of Carnage] In a subterranean gallery of District 8, a Docent of The Ring greeted you before a sculpture twisted from the living flesh of 12 traitors. A swordswoman with a burning cigarette and a cloth-wrapped sheath stepped forward:\n“A.R.T., Absolute Ruin Transcends. Dost thou wish to be a brushstroke in this canvas, or a connoisseur with discerning eyes?”',
    choices: [
      {
        labelVi: 'Rút kiếm phác họa một tuyệt tác kiếm thuật đối lập (I.M.P.A.C.T)',
        labelEn: 'Draw your blade and slash an opposing masterpiece (I.M.P.A.C.T)',
        outcomes: [
          {
            w: 55,
            effects: { health: -20, sanity: +20, rep: +40, resonance: +30 },
            scarsAdd: ['Nét kiếm của Tuyệt Tác'],
            recordsAdd: ['ring_master_curator'],
            meritAdd: 40,
            resultVi: 'Bạn vung kiếm. Ba nhát gọn gàng chém đứt các thớ gân đang co giật, để máu phun thành một vệt đối xứng trên bức tường trắng. Người phụ nữ đứng cạnh nhả một làn khói xám, ngón tay gõ nhẹ lên chuôi kiếm: "K.K.T.H, Khá khen cho kẻ biết vung dao." The Ring đóng dấu thông hành cho bạn qua khu trưng bày.',
            resultEn: 'You swung your steel. Three surgical strokes severed the twitching tendons, letting the crimson spray form an immaculate bilateral arc against the plaster. The woman beside you exhaled a thread of gray smoke and tapped her sheath: “N.B.T., Not bad at all.” The Ring stamped your safe-conduct pass.'
          },
          {
            w: 45,
            effects: { health: -35, sanity: -25, resonance: +25 },
            scarsAdd: ['Vết rạch từ nét cọ của The Ring'],
            resultVi: 'Ý đồ kiếm thuật của bạn bị Docent bắt bài. Một vết rạch ngọt xớt cắt đứt gân tay phải của bạn. Bạn phải rút lui trong khi tiếng cười chế giễu vang vọng khắp khán phòng.',
            resultEn: 'Your sword intent was read and countered by the Docent. A clean cut severed the tendon of your right wrist. You withdrew as mocking applause echoed through the hall.'
          }
        ]
      },
      {
        labelVi: 'Chê bai thứ nghệ thuật bệnh hoạn và đập phá phòng triển lãm',
        labelEn: 'Denounce the sick display and trash the exhibition hall',
        effects: { health: -30, rep: +25, heat: +45, sanity: +15 },
        scarsAdd: ['Kẻ thù của The Ring'],
        meritAdd: 30,
        resultVi: 'Bạn ném lựu đạn khói, đạp đổ các giá trưng bày và giải thoát những nạn nhân còn thở. The Ring phát lệnh truy nã bạn trên toàn bộ mạng lưới ngầm của năm ngón tay.',
        resultEn: 'Tossing smoke canisters, you toppled the pedestals and freed surviving captives. The Ring issued an all-District bounty on your head across the Five Fingers.'
      }
    ]
  },

  // ------------------------------------------------------------------ Nagel und Hammer Inquisition (N Corp)
  {
    id: 'canto_ncorp_grip_inquisition',
    age: [20, 60],
    major: true,
    regions: ['14'],
    weight: 5.0,
    vi: "[Búa và đinh] Đội N Corp phong tỏa đường ở District 14, lùng người mang bộ phận giả. Họ chặn một người trước mặt bạn, rồi quay sang hỏi bạn đứng về phía nào. Chiếc búa vẫn ở trong tay lính gác.",
    en: '[Nagel und Hammer · Purge of the Pure Flesh] Across the avenues of District 14, the Zealots of N Corp (The One Who Grips) cordoned off the entire sector. Sledgehammers and scorched nails hammered into anyone bearing mechanical prosthetics or augments:\n“Flesh and bone are the creator’s sole blessings! All machinery pierced into human skin is an abomination! Dost thou stand with Pure Flesh, or the mechanical heretics?”',
    choices: [
      {
        labelVi: 'Đứng lên bảo vệ những người mang bộ phận máy móc (Chống lại N Corp)',
        labelEn: 'Shield the augmented citizens (Stand against N Corp)',
        outcomes: [
          {
            w: 55,
            effects: { health: -30, sanity: +30, network: +35, rep: +35 },
            scarsAdd: ['Tấm khiên của kẻ bị săn đuổi'],
            recordsAdd: ['prosthetic_liberator'],
            meritAdd: 40,
            resultVi: 'Bạn dựng rào chắn, dùng vũ khí đánh gãy hàng chục cây búa của N Corp và đưa những người mang chi máy chạy thoát qua đường cống ngầm. Nghiệp đoàn cơ khí Backstreets vinh danh bạn như một vị cứu tinh.',
            resultEn: 'Forming a barricade, your strikes shattered dozens of N Corp hammers, funneling augmented refugees into the drainage tunnels. The Backstreets machinist guild honored you as a savior.'
          },
          {
            w: 45,
            effects: { health: -45, sanity: -30, resonance: +25 },
            scarsAdd: ['Cây đinh nung đỏ của N Corp'],
            resultVi: 'Một cây đinh sắt nung đỏ bị đóng xuyên qua đùi bạn trước khi bạn kịp rút lui. N Corp để lại vết sẹo nung lửa như một lời cảnh cáo dành cho kẻ dám thách thức giáo điều.',
            resultEn: 'A red-hot nail drove through your thigh before you managed to escape. N Corp left a scorched brand as a grim warning to any who challenge their dogma.'
          }
        ]
      },
      {
        labelVi: 'Tuyên thệ phụng sự Giáo phái Búa và Đinh: Thanh trừng ô uế',
        labelEn: 'Swear allegiance to Nagel und Hammer: Purge the heretical metal',
        forbids: ['FullBodyProsthetic'],
        effects: { health: +20, sanity: -35, rep: +30, heat: +30 },
        flagsAdd: ['InquisitorOfFlesh'],
        scarsAdd: ['Chiếc Búa của N Corp'],
        meritAdd: 35,
        resultVi: 'Bạn nhận lấy chiếc búa tạ đóng dấu N Corp. Tiếng gào thét của những kẻ bị đập nát chân tay cơ khí vang vọng dưới mưa. Bạn trở thành một Inquisitor gieo rắc nỗi khiếp sợ.',
        resultEn: 'Taking up the heavy hammer bearing N Corp’s seal, the screams of crushed machinists echoed under the rain. You became an Inquisitor feared throughout the sector.'
      }
    ]
  },

  // ------------------------------------------------------------------ The Gesellschaft & The Stars (Cosmic Mirror Lore)
  {
    id: 'canto_gesellschaft_star_convergence',
    age: [25, 75],
    major: true,
    weight: 3.5,
    vi: "[Tiếng vọng Gesellschaft] Trên cao, kết cấu thủy tinh hiện ra cùng nhiều giọng Faust từ Mirror Worlds. Họ mời bạn nhìn vào những tính toán phía sau Singularity và hợp đồng của The Head. Các đường nối đang hạ xuống trước mặt bạn.",
    en: '[Refraction of Mirrors · Voices of the Gesellschaft] A geometric refraction of floating glass uncoiled across the sky. Countless incarnations of Faust from across the Mirror Worlds spoke in harmonious unison:\n“Faust knows all. The convergence of The City and The Stars beyond the Outskirts has arrived. Dost thou wish to witness the veil behind The Head’s covenants and the origin of Singularities?”',
    choices: [
      {
        labelVi: 'Kết nối tâm trí vào mạng lưới Gesellschaft: Tiếp nhận toàn tri',
        labelEn: 'Interface your mind with the Gesellschaft network: Attain Omniscience',
        outcomes: [
          {
            w: 52,
            effects: { sanity: -35, resonance: +50, rep: +45, network: +40 },
            flagsAdd: ['GesellschaftObserver'],
            recordsAdd: ['gesellschaft_illumination'],
            scarsAdd: ['Con mắt nhìn thấu Đa Vũ Trụ'],
            meritAdd: 50,
            resultVi: "Các đường nối chạm vào trán. Bạn thấy những bảng tính chi phí và số người phải trả giá để Singularity vận hành. Khi rút ra, mắt bạn chảy máu; những con số vẫn ở lại trong đầu.",
            resultEn: 'Tens of thousands of icy data feeds pierced your frontal lobe. You saw no miracles; you perceived cold casualty ledgers, the exact liters of blood demanded by each Singularity, and the colossal glass cage erected by The Head around The City. When you tore the cables free, blood seeped from your eyelids, and the world lost all naive warmth forever.'
          },
          {
            w: 48,
            effects: { health: -20, sanity: -50, resonance: +40 },
            scarsAdd: ['Tâm trí quá tải trước Đa Vũ Trụ'],
            resultVi: 'Lượng dữ liệu vô tận thiêu rụi các rãnh não của bạn. Bạn ngã quỵ, máu mũi chảy ròng ròng. Bạn chỉ kịp nhớ được một điều duy nhất: The City là một cái lồng được bảo vệ nghiêm ngặt.',
            resultEn: 'The sheer magnitude of infinite data scorched your neural synapses. Collapsing with bleeding nostrils, a single conviction burned into memory: The City is a strictly guarded cage.'
          }
        ]
      },
      {
        labelVi: 'Cắt đứt kết nối gương: Giữ vững hiện thực duy nhất của bản thân',
        labelEn: 'Sever the mirror connection: Anchor to your singular reality',
        effects: { sanity: +35, health: +20, rep: +25 },
        scarsAdd: ['Kẻ từ chối chiếc gương toàn tri'],
        meritAdd: 30,
        resultVi: 'Bạn vung vũ khí đập vỡ tấm gương khúc xạ. Hội đồng Faust gật đầu mỉm cười tán thưởng trước ý chí độc lập của bạn: "Lựa chọn đáng chú ý." Bầu trời The City trở lại bình yên.',
        resultEn: 'Swinging your weapon to shatter the refractive glass, the Faust assembly smiled in subtle praise of your independence: “A noteworthy decision.” The City sky returned to silent peace.'
      }
    ]
  }
];

// ============================================================================
// FIXER REQUEST TEMPLATES, by threat tier (Canard → Star of the City)
// ============================================================================

import { EXPANDED_FIXER_REQUESTS } from './narrative/fixerRequests.js';
import { EXPANSION_FIXER_REQUESTS } from './eventsNpcAndWorldExpansion.js';

export const FIXER_REQUESTS = [
  {
    id: 'req_rats_organ',
    tier: 0,
    typeVi: 'Dẹp một ổ Rat buôn nội tạng',
    typeEn: 'Clear out an organ-trading Rat den',
    vi: 'Một nhóm Rat đang bắt công nhân ca đêm vào tầng hầm để lấy giác mạc và gan. Khu phố góp tiền thuê bạn.',
    en: 'A group of Rats is taking night-shift workers into a cellar for their corneas and livers. The neighborhood pooled money to hire you.',
    okVi: 'Bạn đạp cửa hầm. Bốn tên Rat, một cái bàn, một người còn sống trên bàn. Khi bạn ra, chỉ còn người trên bàn là còn sống.',
    okEn: 'You kicked in the cellar door. Four Rats, one table, one living person on it. When you came out, only the person on the table was still alive.',
    failVi: 'Chúng ném một lọ axit vào mặt bạn rồi chạy xuống cống. Bạn mất một bên lông mày và cả số tiền công.',
    failEn: 'They threw a jar of acid in your face and fled into the sewer. You lost an eyebrow and the whole fee.',
    deathVi: 'Bạn vướng vào dây thép giăng trong bóng tối của tầng hầm, và chúng có thêm một người trên bàn.',
    deathEn: 'You tangled in wire strung across the dark cellar, and they had one more person for the table.'
  },
  {
    id: 'req_zwei_vip_escort',
    tier: 1,
    typeVi: 'Hộ tống một nhân chứng',
    typeEn: 'Escort a witness',
    vi: 'Một người nắm giữ sổ sách của một Syndicate cần đến được cổng Nest. Ba nhóm sát thủ đang tìm họ.',
    en: 'Someone holding a Syndicate’s ledgers needs to reach the Nest gate. Three teams of killers are looking for them.',
    okVi: 'Người cuối cùng chặn đường bạn ở cây cầu. Bạn đẩy thân chủ qua cổng đúng lúc cổng đóng lại.',
    okEn: 'The last of them stopped you at the bridge. You pushed the client through the gate just as it closed.',
    failVi: 'Viên đạn bắn tỉa đi xuyên qua vai bạn trước, rồi mới đến thân chủ.',
    failEn: 'The sniper’s round went through your shoulder first, and then through the client.',
    deathVi: 'Trong con hẻm hẹp, bạn và thân chủ nằm xuống cạnh nhau.',
    deathEn: 'In the narrow alley, you and the client went down side by side.'
  },
  {
    id: 'req_pierre_bistro_rescue',
    tier: 2,
    typeVi: 'Bếp sau của một Bistro ở District 23',
    typeEn: 'The back kitchen of a District 23 bistro',
    vi: 'Con gái một thương nhân bị bắt vào bếp sau của một quán ăn ở District 23. Thời gian còn lại tính bằng giờ, trước khi thực đơn tối nay được in.',
    en: 'A merchant’s daughter was taken into the back kitchen of a District 23 restaurant. There are hours left, before tonight’s menu is printed.',
    okVi: 'Bạn chặt cánh tay cầm dao của bếp trưởng, đá đổ lò, và gỡ cô gái khỏi móc. Cô ấy còn sống. Cô ấy không nói gì suốt đường về.',
    okEn: 'You took off the head chef’s knife arm, kicked over the oven, and lifted the girl off the hook. She was alive. She said nothing the whole way back.',
    failVi: 'Khói trong bếp dày đến mức bạn không thấy đường. Khi bạn tìm được phòng lạnh thì đã muộn.',
    failEn: 'The smoke in the kitchen was so thick you could not see. By the time you found the cold room, it was too late.',
    deathVi: 'Bếp trưởng ra tay từ phía sau. Thực đơn tối nay có một món mới.',
    deathEn: 'The head chef came from behind. Tonight’s menu had a new dish.'
  },
  {
    id: 'req_syndicate_turf_suppression',
    tier: 3,
    typeVi: 'Chặn cuộc chiến giữa Kurokumo và Blade Lineage (Urban Plague)',
    typeEn: 'Stop the Kurokumo and Blade Lineage war (Urban Plague)',
    vi: 'Cuộc chiến giữa Kurokumo Clan và Blade Lineage đã lan đến khu chợ. Người chết nằm trên đường mà không ai dám đến dọn.',
    en: 'The war between the Kurokumo Clan and the Blade Lineage has reached the market. The dead lie in the street and no one dares collect them.',
    okVi: 'Bạn hạ được người dẫn đầu của cả hai bên. Không có ai đứng ra thay họ, nên cả hai bên rút đi.',
    okEn: 'You brought down the leaders of both sides. No one stepped up to replace them, so both sides withdrew.',
    failVi: 'Một nhát kiếm từ khoảng cách không thể với tới mở ngực bạn. Bạn bò đi dưới những cái xác.',
    failEn: 'A cut from a distance no blade should reach opened your chest. You crawled away under the bodies.',
    deathVi: 'Bạn không kịp nhìn thấy người đã chém mình.',
    deathEn: 'You never saw the one who cut you down.'
  },
  {
    id: 'req_sweeper_night_defense',
    tier: 4,
    typeVi: 'Giữ một khu dân cư qua Night in the Backstreets (Urban Nightmare)',
    typeEn: 'Hold a residential block through the Night in the Backstreets (Urban Nightmare)',
    vi: 'Hệ thống bảo vệ của một khu nhà hỏng đúng 3 giờ 10. Nếu không ai giữ cửa, cả khu sẽ không còn ai vào sáng mai.',
    en: 'A block’s protection system failed at exactly 3:10. If no one holds the door, there will be no one left in the block by morning.',
    okVi: 'Tám mươi mốt phút. Khi trời sáng, bạn vẫn đứng ở cửa, và sau lưng bạn vẫn còn tiếng trẻ con khóc.',
    okEn: 'Eighty-one minutes. When dawn came you were still standing in the doorway, and behind you children were still crying.',
    failVi: 'Hàng rào vỡ ở phút thứ bảy mươi. Bạn rút vào trong cùng những người còn lại và mất một mảng thịt đùi.',
    failEn: 'The barricade broke at minute seventy. You fell back inside with whoever was left and lost a piece of your thigh.',
    deathVi: 'Sáng hôm sau, bậc cửa khu nhà sạch bong.',
    deathEn: 'The next morning, the block’s doorstep was spotless.'
  },
  {
    id: 'req_star_of_the_city_raid',
    tier: 5,
    typeVi: 'Chế áp một Distortion cấp Star of the City',
    typeEn: 'Subjugate a Star of the City Distortion',
    vi: 'Một Distortion đã biến cả một khu thành nơi không ai đi qua mà còn tỉnh táo. Ba đội của Association đã không quay về.',
    en: 'A Distortion has turned a whole sector into a place no one crosses and stays sane. Three Association teams did not come back.',
    okVi: 'Bạn tìm thấy phần còn là người bên trong nó, và kết thúc nó ở đó.',
    okEn: 'You found the part of it that was still a person, and ended it there.',
    failVi: 'Nó chỉ nhìn bạn một lần. Các mạch máu dưới da bạn vỡ ra. Bạn về được, không ai hiểu bằng cách nào.',
    failEn: 'It looked at you once. The blood vessels under your skin burst. You made it back, and no one understands how.',
    deathVi: 'Nó thêm bạn vào bài hát của nó.',
    deathEn: 'It added you to its song.'
  },
  ...EXPANDED_FIXER_REQUESTS,
  ...EXPANSION_FIXER_REQUESTS
];


