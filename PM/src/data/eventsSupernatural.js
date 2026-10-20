// ============================================================================
// MAJOR EVENTS: WORKSHOPS, BLOODFIENDS, THE GREAT LAKE, HONGYUAN, THE PINKY,
// AND CARMEN'S VOICE. Plus the Fixer request templates.
// The "[Title]" opening each text heads the decision panel.
// ============================================================================

export const SUPERNATURAL_EVENTS = [
  // ------------------------------------------------------------------ the Workshop
  {
    id: 'ws_forge_masterpiece_event',
    age: [20, 65],
    major: true,
    weight: 7,
    jobs: ['Workshop Craftsman'],
    vi: '[Khối kim loại còn chảy máu] Một Fixer Grade 1 đặt lên đe của bạn một khối hợp kim lấy ra từ lõi một Abnormality. Nó vẫn rỉ ra thứ gì đó màu đen. "Làm cho tôi một thanh kiếm từ cái này." Nước tôi thép bình thường sẽ làm nó nứt. Những người thợ già nói chỉ có máu mới giữ được nó.',
    en: '[The metal that still bleeds] A Grade 1 Fixer set a lump of alloy on your anvil, cut from the core of an Abnormality. It was still seeping something black. “Make me a sword from this.” Ordinary quenching water would crack it. The old smiths say only blood will hold it.',
    choices: [
      {
        labelVi: 'Tôi thép bằng máu của chính bạn',
        labelEn: 'Quench it in your own blood',
        resultVi: 'Khi lưỡi thép chạm vào máu bạn, hơi nước bốc lên màu đỏ và có mùi sắt. Thanh kiếm không nứt. Lúc bạn cầm nó lên, nó ấm, như thể có mạch đập.',
        resultEn: 'When the blade met your blood the steam rose red and smelled of iron. It did not crack. When you lifted it, it was warm, as if it had a pulse.',
        openCraftModal: true,
        effects: { health: -15, wealth: +18, rep: +16, network: +12, resonance: +14 },
        flagsAdd: ['유물'],
        recordsAdd: ['workshop_masterpiece'],
        scarsAdd: ['Thanh kiếm tôi bằng máu mình'],
        meritAdd: 28
      },
      {
        labelVi: 'Làm thêm một khẩu súng bắn xuyên tường cho người trả giá cao hơn (vi phạm Taboo)',
        labelEn: 'Also build a wall-piercing gun for a higher bidder (a Taboo violation)',
        resultVi: 'Viên đạn thử xuyên qua bốn bức tường bê tông. Người mua trả gấp đôi, không hỏi gì. Ba ngày sau, có người mặc đồng phục B Corp đứng đối diện xưởng của bạn, không làm gì cả, chỉ nhìn.',
        resultEn: 'The test round went through four concrete walls. The buyer paid double and asked nothing. Three days later someone in a B Corp uniform stood across from your workshop, doing nothing, only watching.',
        effects: { wealth: +28, rep: +14, taboo: +1, sanity: -10, resonance: +14 },
        flagsAdd: ['유물'],
        recordsAdd: ['workshop_masterpiece'],
        scarsAdd: ['Khẩu súng phạm Taboo'],
        meritAdd: 22,
        scheduleConsequences: [
          {
            eventId: 'csq_taboo_workshop_raid',
            delayYears: 4,
            reasonVi: 'Khẩu súng phạm Taboo bị Tres và B Corp phát hiện',
            reasonEn: 'The Taboo firearm was traced by Tres and B Corp'
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ Bloodfiends
  {
    id: 'bf_crimson_awakening',
    age: [19, 48],
    major: true,
    weight: 7,
    forbids: ['Bloodfiend'],
    vi: '[Lời đề nghị của Bloodfiend] Cả đội của bạn đã chết trong căn biệt thự dưới lòng đất. Một Elder Bloodfiend giữ cổ bạn bằng một tay, không cần dùng sức.\n"Ngươi có thể làm Bloodbag, ta sẽ uống ngươi từ từ. Hoặc ngươi uống máu ta, và sống mãi với cơn khát."',
    en: '[A Bloodfiend’s offer] Your whole squad died in the underground manor. An Elder Bloodfiend held you by the throat with one hand, without effort.\n“You can be a Bloodbag, and I will drink you slowly. Or you can drink from me, and live forever with the thirst.”',
    choices: [
      {
        labelVi: 'Uống máu từ cổ tay bà ta',
        labelEn: 'Drink from her wrist',
        resultVi: 'Máu của bà ta nóng như kim loại chảy. Răng của bạn dài ra, xương của bạn gãy rồi tự liền lại theo một hình dạng khác. Bạn sẽ sống rất lâu. Và đêm nào bạn cũng khát.',
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
        resultVi: 'Lửa bắt vào lưng bạn và vào tay bà ta cùng lúc. Bà ta buông ra. Đúng lúc đó, người của Fanghunt Office phá cửa với những cây cọc gỗ. Họ chia cho bạn tiền thưởng.',
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
    weight: 8.5,
    vi: '[Cá Voi trên The Great Lake] Giữa cơn bão, một con Cá Voi trồi lên và nuốt nửa đoàn tàu. Những thủy thủ dính phải thứ dịch trắng của nó bắt đầu cứng lại như sáp, chân dính vào nhau thành đuôi cá. Rồi họ quay lại cắn những người còn sống.\nNgười đứng cạnh bạn đã trắng lên đến tận cổ.',
    en: '[The Whale on the Great Lake] In the middle of the storm a Whale surfaced and swallowed half the fleet. Sailors splashed with its white fluid began to harden like wax, their legs fusing into tails. Then they turned and bit the living.\nThe person beside you had turned white up to the neck.',
    choices: [
      {
        labelVi: 'Cắt cánh tay đang hóa trắng của người ấy, rồi buộc mình vào dây lao và phóng thẳng vào mắt con Cá Voi',
        labelEn: 'Cut off their whitening arm, then tie yourself to the harpoon line and drive it into the Whale’s eye',
        outcomes: [
          {
            w: 56,
            resultVi: 'Mũi lao đi vào mắt nó. Con Cá Voi chìm xuống, kéo theo một dòng xoáy trắng. Ở District 21, người ta kể chuyện này trong các quán rượu, và mỗi lần kể con Cá Voi lại to thêm một chút.',
            resultEn: 'The harpoon went into its eye. The Whale sank, dragging a white whirlpool down with it. In District 21 they tell this story in the bars, and every time the Whale gets a little bigger.',
            effects: { health: -22, sanity: -12, wealth: +24, rep: +24, resonance: +18 },
            recordsAdd: ['lake_whale_slayer'],
            scarsAdd: ['Vết trắng trên vai'],
            meritAdd: 30
          },
          {
            w: 44,
            resultVi: 'Đuôi nó đập vỡ thân tàu. Một mảng trắng bám lên vai bạn và bắt đầu lan. Bạn nung dao trên đèn dầu và tự cắt bỏ mảng thịt đó trước khi nó lan xuống tim.',
            resultEn: 'Its tail broke the hull apart. A white patch landed on your shoulder and began to spread. You heated a knife over the oil lamp and cut that flesh out yourself before it reached your heart.',
            effects: { health: -34, sanity: -20, resonance: +22 },
            scarsAdd: ['Mảng thịt tự cắt bỏ']
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ Hongyuan
  {
    id: 'hy_hierarch_evaluation',
    age: [20, 50],
    major: true,
    weight: 8,
    vi: '[Kỳ chọn Gia chủ ở Hongyuan] Ở District 8, những người thừa kế của các đại gia tộc ngồi uống trà và mỉm cười trong khi người hầu của họ giết nhau dưới sân.\nĐể trở thành Gia chủ, bạn phải nuốt một viên Bolus luyện từ máu của những người đã thua. Nếu cơ thể bạn không chịu được, nó sẽ ăn bạn từ bên trong.',
    en: '[Choosing a Hierarch in Hongyuan] In District 8 the heirs of the great families sit drinking tea and smiling while their servants kill each other in the courtyard below.\nTo become Hierarch you must swallow a Bolus refined from the blood of those who lost. If your body cannot bear it, it will eat you from the inside.',
    choices: [
      {
        labelVi: 'Nuốt viên Bolus',
        labelEn: 'Swallow the Bolus',
        outcomes: [
          {
            w: 58,
            resultVi: 'Máu đen chảy ra từ mắt và mũi bạn suốt một đêm. Đến sáng, bạn đứng dậy và cơ thể bạn không còn như trước. Ba người anh em họ chưa kịp đặt chén trà xuống.',
            resultEn: 'Black blood ran from your eyes and nose all night. By morning you stood, and your body was not what it had been. Three cousins had not yet set down their teacups.',
            flagsAdd: ['HongyuanHierarch'],
            recordsAdd: ['hongyuan_lord'],
            effects: { health: +20, wealth: +45, rep: +36, network: +30, sanity: -24, resonance: +26 },
            scarsAdd: ['Viên Bolus của Hongyuan'],
            meritAdd: 38
          },
          {
            w: 42,
            resultVi: 'Viên Bolus làm vỡ các mạch máu của bạn từ bên trong. Bạn phải tự rạch để máu độc chảy ra, rồi bò khỏi sân trong khi những người thừa kế khác tiếp tục uống trà.',
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
    age: [22, 55],
    major: true,
    weight: 7.5,
    jobs: ['Syndicate', 'Fixer'],
    vi: '[Lời thề của The Pinky] Trên đỉnh một tháp chuông dưới mưa, một người của The Pinky rút thanh kiếm khỏi ngực kẻ phản bội và đặt nó xuống chân bạn.\n"Ở The Pinky không có cấp bậc, chỉ có lời thề. Hãy lấy một mảnh xương sườn của ngươi gắn vào chuôi kiếm này."',
    en: '[The Pinky’s oath] On top of a bell tower in the rain, someone of the Pinky drew a sword from a traitor’s chest and laid it at your feet.\n“In the Pinky there are no ranks, only oaths. Take a piece of your own rib and set it into this hilt.”',
    choices: [
      {
        labelVi: 'Làm theo',
        labelEn: 'Do it',
        resultVi: 'Bạn tự làm, bằng một con dao nhỏ, trong lúc người kia đứng nhìn không nói gì. Mảnh xương vừa khít với chuôi kiếm, như thể nó đã chờ ở đó. Từ đêm nay, bạn là một Star của The Pinky.',
        resultEn: 'You did it yourself, with a small knife, while the other watched in silence. The piece of bone fit the hilt exactly, as if it had been waiting there. From tonight you are a Star of the Pinky.',
        setFinger: 'Pinky',
        setFingerRank: 2,
        recordsAdd: ['pinky_star'],
        effects: { health: -28, sanity: -15, rep: +36, wealth: +28, resonance: +28 },
        scarsAdd: ['Mảnh xương sườn trong chuôi kiếm'],
        meritAdd: 36
      }
    ]
  },

  // ------------------------------------------------------------------ Carmen / E.G.O & Distortion
  {
    id: 'ego_carmen_crossroad',
    age: [18, 99],
    major: true,
    weight: 999,
    forbids: ['EGOAwakened', 'Distorted'],
    vi: '[Can you hear my voice? · Vầng Thái Dương Của Ánh Sáng] Mọi thứ bạn từng mất quay về cùng một lúc ({scars}). Không gian xung quanh tan biến thành một vầng thái dương chói lòa — một biển ánh sáng ấm áp, rực rỡ đến mức thiêu đốt. Từ tâm điểm vầng dương, một người phụ nữ với đôi mắt thấu suốt và nụ cười dịu dàng nghiêng đầu nhìn bạn:\n"Đau lắm, phải không? Ở The City này, cố giữ hình người chỉ khiến bạn bị xé ra từng mảnh. Hãy yêu lấy chính mình. Bạn có thể buông tay, và trở thành điều bạn thật sự khao khát."',
    en: '[Can you hear my voice? · The Scorching Sun of The Light] Everything you ever lost returned at once ({scars}). The surrounding room dissolved into a blinding white sun — an ocean of radiant, scorching light. From the center of the brilliant sun, a woman with piercing eyes and a gentle smile tilted her head:\n“It hurts so much, doesn’t it? In this City, clinging to a human shape only gets you torn apart. Love yourself. You can let go, and become what you truly desire.”',
    choices: [
      {
        labelVi: '"Nỗi đau này là của tôi. Tôi sẽ không khuất phục trước vầng thái dương của người."',
        labelEn: '“This pain is mine. I will not yield before your sun.”',
        outcomes: [
          {
            w: 48,
            openEgoModal: true,
            flagsAdd: ['EGOAwakened', 'ShinAwakened'],
            recordsAdd: ['ego_effloresced'],
            effects: { health: +35, sanity: +50, rep: +38, resonance: +25 },
            scarsAdd: ['Người không cúi đầu trước Carmen'],
            meritAdd: 45,
            resultVi: 'Bạn giữ chặt từng ký ức và vết sẹo, không lùi bước trước vầng thái dương ấm áp của Carmen. Biển ánh sáng chói lòa nứt toác trước ý chí bất khuất của bạn. Từ sâu thẳm tâm thức, một bộ giáp và vũ khí kết tinh từ chính nỗi đau của bạn hiện hình. Đó là E.G.O của riêng bạn.',
            resultEn: 'You held firm to every memory and scar, refusing to yield before Carmen’s radiant sun. The blinding light fractured against your unbending resolve. From the depths of your psyche, armor and a weapon forged from your agony manifested. It is your E.G.O.'
          },
          {
            w: 37,
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
            resultVi: 'Bạn gầm lên kháng cự, nhưng triết lý trong lòng chưa đủ tôi luyện để gánh vác trọn vẹn ánh sáng. E.G.O chỉ hiện hình một nửa rồi nứt toác, ngọn lửa cảm xúc đốt cháy da thịt bạn. Bạn chưa gục ngã, nhưng tâm thức mang một vết rạn lớn: E.G.O Chưa Hoàn Chỉnh.',
            resultEn: 'You roared in resistance, but your inner philosophy was not yet forged enough to bear the full weight of the light. The E.G.O half-manifested then cracked, emotion scorch marks searing your flesh. You did not break, but your soul bears a fissure: an Incomplete E.G.O.'
          },
          {
            w: 15,
            flagsAdd: ['Distorted'],
            recordsAdd: ['distortion_awaken'],
            effects: { health: +40, sanity: -60, rep: +30, heat: +45, resonance: +55 },
            scarsAdd: ['Ý chí gãy đổ'],
            meritAdd: 20,
            resultVi: 'Lời thì thầm từ vầng thái dương của Carmen quá ngọt ngào. Trong khoảnh khắc ngập ngừng cuối cùng, ý chí của bạn nứt toác. Cơ thể bạn biến dạng thành hình thù của nỗi đau u uất. Hana Association cập nhật hồ sơ: Bạn đã Biến dạng (Distorted).',
            resultEn: 'Carmen’s murmur from the radiant sun was too sweet. In that final hesitation, your resolve shattered. Your flesh morphed into the shape of your sorrow. Hana Association updated its file: Distorted.'
          }
        ]
      },
      {
        labelVi: 'Đốt cháy những vết sẹo quá khứ làm mồi lửa bộc phát',
        labelEn: 'Burn every past scar as living fuel for breakthrough',
        outcomes: [
          {
            w: 45,
            openEgoModal: true,
            flagsAdd: ['EGOAwakened', 'ShinAwakened'],
            recordsAdd: ['ego_effloresced'],
            effects: { health: -28, sanity: +45, rep: +42, resonance: +35 },
            scarsAdd: ['Tro Tàn Tự Ngã'],
            meritAdd: 50,
            resultVi: 'Bạn biến chính những vết sẹo rỉ máu thành mồi lửa, thiêu rụi sự cám dỗ dịu dàng của Carmen. Cơ thể bạn chằng chịt vết rách, nhưng từ trong biển lửa tro tàn, E.G.O hoàn chỉnh xuất hiện với uy lực chấn áp tất cả.',
            resultEn: 'Turning your bleeding scars into kindling, you incinerated Carmen’s gentle whispers. Your body tore with wounds, but from the ashes, complete E.G.O emerged with overwhelming might.'
          },
          {
            w: 35,
            flagsAdd: ['Distorted'],
            recordsAdd: ['distortion_awaken'],
            effects: { health: +50, sanity: -65, rep: +35, heat: +50, resonance: +60 },
            scarsAdd: ['Ngọn Lửa Cuồng Loạn'],
            meritAdd: 30,
            resultVi: 'Ngọn lửa cảm xúc bốc cháy vượt quá tầm kiểm soát của cơ thể bạn. Sức nóng thiêu rụi lý trí; thay vì E.G.O, bạn sụp đổ hoàn toàn vào nỗi ám ảnh tột cùng. Một con quái vật Distortion sinh ra từ tro tàn.',
            resultEn: 'The emotional blaze flared beyond mortal endurance. The heat consumed your sanity; instead of E.G.O, you collapsed entirely into obsession. A ravenous Distortion arose from the ashes.'
          },
          {
            w: 20,
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
        labelVi: 'Nhắm mắt lại, đắm chìm vào vầng thái dương ấm áp (Distortion)',
        labelEn: 'Close your eyes, immerse into the warm sun (Distort)',
        flagsAdd: ['Distorted'],
        recordsAdd: ['distortion_awaken'],
        effects: { health: +55, sanity: -65, rep: +35, heat: +55, resonance: +60 },
        scarsAdd: ['Distortion'],
        meritAdd: 35,
        resultVi: 'Không còn đau nữa. Đó là điều đầu tiên bạn nhận ra. Vầng thái dương của Carmen bao trùm lấy bạn, cảm giác ấm áp lan tỏa khi cơ thể bạn biến đổi thành hình dạng của nỗi ám ảnh sâu kín nhất. Sáng hôm sau, Hana Association phát lệnh phong tỏa khu vực: Một Distortion cấp độ cao đã xuất hiện.',
        resultEn: 'It no longer hurt. That was the first thing you noticed. Carmen’s blazing sun enveloped you; a soothing warmth spread as your flesh morphed into the shape of your deepest obsession. The next morning Hana Association opened a new file: Distortion, unrated.'
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
        labelVi: 'Hàn gắn vết rạn tâm thức: Khai hoa E.G.O hoàn chỉnh',
        labelEn: 'Mend the soul fissure: Effloresce True E.G.O',
        openEgoModal: true,
        flagsAdd: ['EGOAwakened', 'ShinAwakened'],
        recordsAdd: ['ego_effloresced'],
        effects: { health: +40, sanity: +50, rep: +35, resonance: +25 },
        scarsAdd: ['Bản Ngã Tái Sinh'],
        meritAdd: 50,
        resultVi: 'Vết nứt trên linh hồn liền lại thành một lớp giáp hoàng kim. E.G.O hoàn chỉnh bao bọc lấy bạn, tĩnh lặng và uy nghiêm. Cả khu phố nín thở trước luồng ánh sáng thuần khiết.',
        resultEn: 'The fracture in your soul welded into golden armor. Complete E.G.O enveloped you, serene and sovereign. The entire street held its breath before the pure light.'
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
    age: [20, 95],
    major: true,
    weight: 980,
    jobs: ['Fixer'],
    forbids: ['ColorFixer'],
    vi: '[Star of the City · Hana Color Investiture] Hana Association Section 1 triệu tập bạn đến đài vinh danh tối cao. Một mối họa cấp độ Star of the City (Ngôi Sao Đô Thị) vừa bùng phát tại khu vực biên giới. Các Director của Hana nhìn thẳng vào mắt bạn:\n"Cả The City chỉ có chưa đầy mười Color. Chúng tôi không ban phát danh hiệu này cho kẻ chỉ biết làm hợp đồng thông thường. Hãy dập tắt mối họa này, hoặc chết trong đống đổ nát. Khi bạn trở về, chiếc thẻ Color sẽ mang tên bạn."',
    en: '[Star of the City · Hana Color Investiture] Hana Association Section 1 summoned you to the supreme dais. A Star of the City calamity has erupted on the border. The Hana Directors stare straight into your eyes:\n“The entire City holds fewer than ten Colors. We do not bestow this title upon those who merely file routine contracts. Extinguish this calamity, or perish in its wake. When you return, the Color license shall bear your name.”',
    choices: [
      {
        labelVi: 'Tiên phong độc hành: Trực diện đồ sát Calamity',
        labelEn: 'Solo vanguard: Confront and annihilate the Calamity directly',
        outcomes: [
          {
            w: 60,
            need: { stat: { health: [35, 100] } },
            openColorModal: true,
            flagsAdd: ['ColorFixer'],
            recordsAdd: ['color_fixer'],
            effects: { health: -30, sanity: -15, rep: +45, wealth: +60 },
            scarsAdd: ['Vết sẹo của Star of the City'],
            meritAdd: 60,
            resultVi: 'Trận chiến kéo dài mười sáu giờ không ngừng nghỉ. Vũ khí của bạn chém đứt lõi của mối họa Star of the City trước sự bàng hoàng của các chấp hành viên Hana. Máu và tro tàn nhuộm kín chiến trường. Hội đồng Hana đồng loạt đứng dậy cúi đầu: "The City cúi đầu trước Color mới." Họ mời bạn bước lên đài để khắc danh hiệu.',
            resultEn: 'The battle raged sixteen unceasing hours. Your weapon severed the core of the Star of the City before stunned Hana enforcers. Blood and ash coated the battlefield. The Hana Council stood and bowed in unison: “The City honors its new Color.” They invited you to the dais to engrave your title.'
          },
          {
            w: 40,
            effects: { health: -45, sanity: -35, rep: +25, heat: +20 },
            scarsAdd: ['Thương tật từ Star of the City'],
            meritAdd: 30,
            resultVi: 'Sức mạnh của mối họa vượt xa dự tính. Bạn chém đứt được một chi của nó nhưng bị đánh văng qua ba dãy tường bê tông, nát vụn xương sườn. Bạn sống sót nhưng bất tỉnh ba tuần. Hana Association ghi nhận chiến công nhưng hoãn kỳ phong Color cho đến khi bạn bình phục.',
            resultEn: 'The calamity’s might exceeded all projections. You severed one of its limbs but were hurled through three concrete walls, ribs splintered. You survived but lay comatose three weeks. Hana credited your valor but postponed the Color ceremony until your recovery.'
          }
        ]
      },
      {
        labelVi: 'Bày trận khắc chế cùng Seven Association (Chiến thuật & Tình báo)',
        labelEn: 'Coordinate tactical dissection with Seven Association',
        need: { stat: { wealth: [15, 100], sanity: [30, 100] } },
        openColorModal: true,
        flagsAdd: ['ColorFixer'],
        recordsAdd: ['color_fixer'],
        effects: { health: -18, sanity: -15, wealth: -15, rep: +40 },
        scarsAdd: ['Bản đồ giải phẫu Star of the City'],
        meritAdd: 45,
        resultVi: 'Chi trả ngân sách lớn cho Seven Association để phân tích cấu trúc Singularity và sơ hở của mối họa. Bạn đánh trúng tim của nó bằng một nhát duy nhất. Nest được bảo toàn. Hana Association đóng dấu phê chuẩn tuyệt đối: Một Color mới ra đời bằng trí tuệ và sự chuẩn xác.',
        resultEn: 'Expending a substantial purse for Seven Association intel on the singularity weakness, you struck its core in a single fatal blow. The Nest was saved. Hana Association stamped absolute approval: A new Color born of intellect and lethal precision.'
      },
      {
        labelVi: 'Từ chối chiếc vòng kim cô: Tiếp tục là Fixer Grade 1 tự do',
        labelEn: 'Refuse the Color crown: Remain a free Grade 1 Senior Fixer',
        flagsAdd: ['ColorRefused'],
        effects: { sanity: +20, rep: +22, wealth: +25 },
        scarsAdd: ['Người từ chối làm Color'],
        meritAdd: 20,
        resultVi: 'Bạn đặt bản ủy thác xuống bàn và mỉm cười quay lưng: "Làm Color chỉ biến tôi thành công cụ để The Head và các Wing dòm ngó. Tôi thích tự do ở Grade 1 hơn." Cả hội trường chết lặng. Danh tiếng về người Fixer từ chối Color lan truyền khắp Backstreets.',
        resultEn: 'Setting the contract down, you smiled and turned away: “Becoming a Color only makes me a target for The Head and a puppet for the Wings. I prefer my freedom at Grade 1.” The hall fell dead silent. Whispers of the Fixer who refused a Color swept the Backstreets.'
      }
    ]
  },

  // ------------------------------------------------------------------ Canto VI: Wuthering Heights & Wild Hunt
  {
    id: 'canto_wuthering_wild_hunt',
    age: [21, 65],
    major: true,
    weight: 8,
    vi: '[Canto VI · Cuộc Săn Hoang Dã của Erlking] Tại vùng đồi sương mù của District 20 · T Corp, một cơn bão thời gian nứt toác. Một kỵ sĩ trên lưng con ngựa xương trắng dẫn đầu đoàn quân bóng ma The Wild Hunt tràn qua các hẻm vắng. Kỵ sĩ gầm lên qua chiếc quan tài xích sắt: "Mọi bản thể trong vô số Thế Giới Gương (Mirror Worlds) đều phải chịu chung nỗi thống khổ này!"',
    en: '[Canto VI · The Wild Hunt of Erlking] On the foggy moors of District 20 · T Corp, a temporal storm ruptured. A knight astride a skeletal steed led the phantoms of The Wild Hunt through the alleys. From atop a chained coffin, the knight roared: “Every counterpart across the Mirror Worlds must suffer this exact despair!”',
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
            resultVi: 'Bạn lao thẳng vào lưỡi kiếm khổng lồ của Erlking. Một nhát chém rực sáng xé toạc ảo ảnh của chiếc quan tài thời gian. Đàn ngựa ma tan biến vào màn sương. T Corp ghi nhận chiến công và miễn trừ thuế thời gian cho bạn suốt ba năm.',
            resultEn: 'Charging directly into Erlking’s titanic greatsword, your radiant strike shattered the temporal coffin’s phantoms. The ghost steeds dissolved into mist. T Corp logged your valor and waived your Time Tax for three years.'
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

  // ------------------------------------------------------------------ Canto VII: La Mancha Land & Don Quixote's Dream
  {
    id: 'canto_lamancha_carnival',
    age: [20, 60],
    major: true,
    weight: 8,
    vi: '[Canto VII · Lễ Hội La Mancha Land] Trong lòng District 16 · P Corp, một công viên giải trí rực rỡ nhưng ma quái mở cửa giữa đêm khuya. Tiếng nhạc đu quay vang vọng cùng mùi bánh churros làm từ máu. Một hiệp sĩ với áo giáp rỉ sét và ngọn giáo dài đứng trước vòng quay ngựa gỗ, đôi mắt sáng rực niềm tin ngây thơ:\n"Hỡi lữ khách! Bạn có muốn cùng chúng ta cưỡi ngựa gỗ, hướng đến một thế giới nơi Bloodfiend và loài người cùng chung một nụ cười?"',
    en: '[Canto VII · The Carnival of La Mancha Land] In District 16 · P Corp, a brilliant yet eerie amusement park awakened in the dead of night. Carousel organ tunes mingled with the scent of blood churros. A knight in rusted plate with a gleaming lance stood before the carousel, eyes blazing with naive conviction:\n“Hail, traveler! Wilt thou mount a steed beside us, riding toward a world where Bloodfiend and mankind share a single smile?”',
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
            resultVi: 'Bạn rút vũ khí, giơ cao cùng ngọn giáo của hiệp sĩ. Tiếng cười của trẻ thơ và những Bloodfiend thiện lương vang vọng khắp vòng quay. Cơn khát máu dịu lại trong giây lát trước ánh sáng của một lý tưởng bất diệt.',
            resultEn: 'Drawing your weapon in salute with the lance, joyous laughter of children and kindred echoed across the carousel. The bloodthirst subsided for a precious moment before the brilliance of an undying dream.'
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

  // ------------------------------------------------------------------ Canto VIII: The Ring's Gallery of Carnage (Ryoshu)
  {
    id: 'canto_ring_carnage_gallery',
    age: [22, 65],
    major: true,
    weight: 7.5,
    jobs: ['Syndicate', 'Fixer', 'Workshop Craftsman'],
    vi: '[Canto VIII · Triển Lãm Tuyệt Tác The Ring] Tại một phòng trưng bày ngầm ở District 8, một Docent của The Ring đón bạn với một bức tượng điêu khắc từ cơ thể sống của 12 kẻ phản bội. Một nữ kiếm sĩ với điếu thuốc đỏ trên môi và bao kiếm quấn vải liệm bước ra:\n"N.T.T.M — Nghệ thuật thật sự đòi hỏi sự hủy diệt tuyệt đối. Ngươi muốn trở thành một nét cọ trong bức tranh này, hay một kẻ thưởng lãm có mắt nhìn?"',
    en: '[Canto VIII · The Ring’s Masterpiece Gallery] In a subterranean gallery of District 8, a Docent of The Ring greeted you before a sculpture twisted from the living flesh of 12 traitors. A swordswoman with a burning cigarette and a cloth-wrapped sheath stepped forward:\n“A.R.T. — Absolute Ruin Transcends. Dost thou wish to be a brushstroke in this canvas, or a connoisseur with discerning eyes?”',
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
            resultVi: 'Đường kiếm của bạn chém đứt bức tượng thịt nhưng lại xếp các mảnh vụn thành một bông hoa mẫu đơn hoàn hảo. Nữ kiếm sĩ bật cười sảng khoái và gật đầu: "K.K.T.H — Khá khen cho kẻ có tài." The Ring trao cho bạn huy hiệu Thẩm Định Viên Danh Dự.',
            resultEn: 'Your slash cleaved the flesh sculpture, arranging the falling pieces into a perfect crimson peony. The swordswoman laughed aloud and nodded: “N.B.T. — Not bad at all.” The Ring bestowed upon you the rank of Honorary Curator.'
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

  // ------------------------------------------------------------------ Canto IX: N Corp Inquisition (Meursault & Nagel und Hammer)
  {
    id: 'canto_ncorp_grip_inquisition',
    age: [20, 60],
    major: true,
    weight: 7.5,
    vi: '[Canto IX · Đại Thanh Trừng Nagel und Hammer] Đội quân Cuồng Tín của N Corp (The One Who Grips) phong tỏa toàn bộ con phố. Những chiếc búa tạ và đinh sắt rực lửa đập nát bất kỳ ai gắn tay chân máy hoặc thiết bị cơ khí:\n"Thịt và máu là món quà duy nhất của đấng tạo hóa! Mọi linh kiện kim loại cắm vào da thịt đều là ô uế! Ngươi đứng về phía thân xác thuần khiết, hay lũ máy móc tà giáo?"',
    en: '[Canto IX · The Nagel und Hammer Inquisition] The Zealots of N Corp (The One Who Grips) cordoned off the entire avenue. Sledgehammers and scorched nails hammered into anyone bearing mechanical prosthetics or augments:\n“Flesh and bone are the creator’s sole blessings! All machinery pierced into human skin is an abomination! Dost thou stand with Pure Flesh, or the mechanical heretics?”',
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

  // ------------------------------------------------------------------ Canto X: The Gesellschaft & The Stars (Faust)
  {
    id: 'canto_gesellschaft_star_convergence',
    age: [25, 75],
    major: true,
    weight: 8,
    vi: '[Canto X · Hội Đồng Đa Vũ Trụ Gesellschaft] Một kết cấu hình học lơ lửng bằng thủy tinh khúc xạ mở ra trên đỉnh bầu trời. Vô số phiên bản của Faust từ các Thế Giới Gương đồng loạt cất tiếng nói bằng âm điệu thuần khiết:\n"Faust biết tất cả. Điểm hội tụ của The City và những Ngôi Sao ngoài The Outskirts đã đến. Bạn có muốn nhìn thấy bức màn đằng sau bản hợp đồng của The Head và nguồn cội của Singularity?"',
    en: '[Canto X · The Multiverse Gesellschaft] A geometric refraction of floating glass uncoiled across the sky. Countless incarnations of Faust from across the Mirror Worlds spoke in harmonious unison:\n“Faust knows all. The convergence of The City and The Stars beyond the Outskirts has arrived. Dost thou wish to witness the veil behind The Head’s covenants and the origin of Singularities?”',
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
            resultVi: 'Hàng triệu luồng ký ức từ vô số thế giới tràn ngập não bộ bạn. Bạn nhìn thấy bản thiết kế tối mật của 26 Wings, công thức điều chế Singularity và ánh sáng của những Ngôi Sao xa xôi. Bạn không còn nhìn The City như một người bình thường nữa.',
            resultEn: 'Millions of memory streams from infinite branches inundated your mind. You perceived the blueprinted secrets of all 26 Wings, Singularity synthesis, and the distant light of The Stars. You will never view The City through mortal eyes again.'
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
  }
];


