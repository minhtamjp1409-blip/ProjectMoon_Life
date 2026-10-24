// ============================================================================
// DUNGEON EXTRAS: a sixth dungeon for the Backstreets, and the things that make a second run
// differ from the first: a seeded variant of the third stage, a side room off the main route,
// a shortcut that skips a stage at a price, a report to your Association at the end, and the
// lines a companion speaks. The engine merges these into DUNGEON_DEFINITIONS at load.
// Lore for the Night: Sweepers come out from 3:13 to 4:34 in the morning, in three waves; whoever
// lives through all three is safe; they do not enter homes. Their bodies are liquid held in a
// black suit, refilled through a hook sunk into a person. They leave nothing behind.
// ============================================================================

export const NIGHT_DUNGEON = {
  id: 'dungeon_backstreets_night',
  cards: true,
  theme: 'night',
  titleVi: 'Đêm ở Backstreets: Ba Đợt Quét',
  titleEn: 'Night in the Backstreets: Three Sweeps',
  hazard: 'WAW',
  kickerVi: 'Backstreets · từ 3 giờ 13 đến 4 giờ 34',
  kickerEn: 'The Backstreets · from 3:13 to 4:34',
  accentColor: '#a78bfa',
  stages: [
    {
      stageIndex: 0,
      nameVi: 'Đợt quét thứ nhất',
      nameEn: 'The first sweep',
      descVi: 'Đồng hồ ở đầu hẻm nhảy sang 3 giờ 13. Mọi cánh cửa trong dãy nhà đóng lại cùng lúc, và từ cống ngầm vang lên tiếng chất lỏng chảy ngược. Những bộ vest đen đứng dậy từ mặt đường.',
      descEn: 'The clock at the head of the alley flips to 3:13. Every door on the row shuts at once, and from the drains comes the sound of liquid running uphill. Black suits rise from the road.',
      strainGain: 15,
      choices: [
        { labelVi: 'Nép vào hốc tường và nín thở đến khi đợt đầu đi qua', labelEn: 'Press into a wall niche and hold your breath until the first wave passes', checkTrait: 'nerve',
          resultVi: 'Một Sweeper dừng ngay trước hốc tường, nghiêng đầu như đang nghe. Rồi nó đi tiếp. Bạn thở ra khi tiếng giày cuối cùng đã xa.', resultEn: 'A Sweeper stops right in front of the niche and tilts its head as if listening. Then it moves on. You breathe out when the last footsteps are far.',
          failVi: 'Bạn thở hắt ra đúng lúc. Một cái móc lướt qua vai và kéo theo một mảng áo cùng da.', failEn: 'You let out a breath at the wrong moment. A hook grazes your shoulder and takes cloth and skin with it.',
          fx: { sanity: -5, health: -3, merit: 5 }, strainDelta: 2 },
        { labelVi: 'Đứng giữa đường và chém vào bộ vest trước khi móc chạm tới', labelEn: 'Stand in the road and cut into the suit before the hook reaches you', checkTrait: 'vigor',
          resultVi: 'Bộ vest rách và thứ chất lỏng bên trong tràn ra mặt đường như mực đổ. Nó không còn là gì cả. Trong túi một người chạy không kịp, bạn nhặt được một chiếc ví còn nguyên.', resultEn: 'The suit tears and the liquid inside spills across the road like ink. It is nothing any more. In the pocket of someone who did not run in time, you find an untouched wallet.',
          fx: { health: -7, sanity: -3, rep: 5, merit: 8 }, lootAhn: 18, strainDelta: 6 },
        { labelVi: 'Chạy theo mái nhà về phía chợ, nơi có nhiều chỗ nấp', labelEn: 'Run the rooftops toward the market, where there are more places to hide', checkTrait: 'luck',
          resultVi: 'Ngói vỡ dưới chân nhưng bạn không trượt. Từ trên mái, bạn thấy đợt quét đi qua bên dưới như một dòng nước đen chảy giữa các bức tường.', resultEn: 'Tiles crack underfoot but you do not slip. From the roof you watch the sweep pass below like black water running between the walls.',
          fx: { health: -4, sanity: -2, merit: 6 }, lootAhn: 8, strainDelta: 0 }
      ]
    },
    {
      stageIndex: 1,
      nameVi: 'Đợt quét thứ hai',
      nameEn: 'The second sweep',
      descVi: 'Đợt thứ hai đông hơn. Chúng đi thành nhóm, như một gia đình đi dạo, và gọi nhau bằng những từ bạn không hiểu. Phía sau một khung cửa sổ, có người đang nhìn bạn và không mở cửa.',
      descEn: 'The second wave is larger. They walk in groups, like a family out for a stroll, and call to each other in words you do not understand. Behind a window someone is watching you and does not open the door.',
      strainGain: 17,
      canFlee: true,
      choices: [
        { labelVi: 'Dụ cả nhóm vào con hẻm cụt rồi đánh từng kẻ một', labelEn: 'Lure the group into a dead-end alley and take them one at a time', checkTrait: 'vigor',
          resultVi: 'Hẻm hẹp đến mức chúng chỉ vào được từng kẻ. Bạn giữ miệng hẻm đến khi mặt đường ướt đẫm và không còn bộ vest nào đứng.', resultEn: 'The alley is so narrow they can only come one at a time. You hold its mouth until the road is soaked and no suit is left standing.',
          fx: { health: -10, sanity: -5, rep: 10, merit: 11 }, lootAhn: 22, strainDelta: 6 },
        { labelVi: 'Ném vật gì đó kêu to sang phố bên để kéo chúng đi', labelEn: 'Throw something loud into the next street to draw them off', checkTrait: 'luck',
          resultVi: 'Chiếc chảo sắt rơi xuống phố bên kêu vang. Cả nhóm quay đầu cùng một lúc, như thể chỉ có một cái đầu. Bạn có vài chục nhịp thở.', resultEn: 'The iron pan clangs into the next street. The whole group turns at once, as if they had a single head. You have a few dozen breaths.',
          fx: { sanity: -4, merit: 7 }, lootAhn: 6, strainDelta: -2 },
        { labelVi: 'Gõ cửa nhà dân và xin vào, chấp nhận bỏ dở đêm nay', labelEn: 'Knock on a home and ask to be let in, giving up on the night', isFlee: true,
          resultVi: 'Cánh cửa hé ra sau tiếng gõ thứ ba. Người trong nhà kéo bạn vào và khóa lại mà không nói một lời. Sweepers không vào nhà. Bạn ngồi dưới sàn đến khi trời sáng.', resultEn: 'The door cracks open after the third knock. Whoever lives there pulls you in and locks it without a word. Sweepers do not enter homes. You sit on the floor until morning.',
          fx: { sanity: 4, wealth: 6 } }
      ]
    },
    {
      stageIndex: 2,
      nameVi: 'Đợt quét thứ ba',
      nameEn: 'The third sweep',
      descVi: 'Đợt cuối cùng đi chậm. Ở giữa có một bộ vest cao hơn hẳn những bộ khác, và những Sweeper còn lại nhường đường cho nó như con cháu nhường đường cho người lớn tuổi. Nó dừng lại khi thấy bạn.',
      descEn: 'The last wave walks slowly. In its midst is a suit far taller than the others, and the rest make way for it as children make way for an elder. It stops when it sees you.',
      strainGain: 19,
      canFlee: true,
      choices: [
        { labelVi: 'Đứng yên, nhìn thẳng vào nó, không chạy', labelEn: 'Stand still, look straight at it, do not run', checkTrait: 'nerve',
          resultVi: 'Nó cúi xuống thật gần. Từ bên trong bộ vest có tiếng chất lỏng lay động, như ai đó đang cân nhắc. Rồi nó đứng thẳng và đi tiếp, kéo cả đoàn theo sau.', resultEn: 'It bends down very close. From inside the suit comes the sound of liquid shifting, like someone weighing a choice. Then it straightens and walks on, the whole procession behind it.',
          failVi: 'Tay bạn run. Nó thấy điều đó, và cái móc của nó tìm đến bạn trước khi bạn kịp lùi.', failEn: 'Your hand trembles. It sees, and its hook finds you before you can step back.',
          fx: { sanity: -9, health: -6, merit: 14, resonance: 10 }, strainDelta: 4 },
        { labelVi: 'Tấn công kẻ cao nhất trước khi đoàn kịp vây', labelEn: 'Strike the tallest before the procession can surround you', checkTrait: 'vigor',
          resultVi: 'Lưỡi của bạn mở bộ vest từ cổ xuống ngực. Thứ chảy ra đặc hơn, tối hơn. Những kẻ còn lại đứng nhìn nó tan trên mặt đường, rồi lặng lẽ rút xuống cống.', resultEn: 'Your blade opens the suit from collar to chest. What runs out is thicker, darker. The others stand watching it dissolve on the road, then silently withdraw into the drains.',
          fx: { health: -13, sanity: -6, rep: 15, merit: 15, resonance: 8 }, lootAhn: 28, strainDelta: 8 },
        { labelVi: 'Lao vào ống cống cạn và bò về phía nhà trọ', labelEn: 'Dive into a dry drain and crawl toward the boarding house', isFlee: true,
          resultVi: 'Ống cống hẹp và tối, nhưng trống. Bạn trèo lên ở sân sau nhà trọ khi đợt cuối vẫn còn đang đi qua phía trên.', resultEn: 'The drain is narrow and dark, but empty. You climb out in the boarding house yard while the last wave is still passing overhead.',
          fx: { sanity: 2, rep: -2 } }
      ]
    },
    {
      stageIndex: 3,
      nameVi: '4 giờ 34',
      nameEn: '4:34',
      descVi: 'Đồng hồ ở đầu hẻm nhảy sang 4 giờ 34. Các cánh cửa mở ra từng cái một. Mặt đường sạch như vừa được lau. Không còn ai, không còn gì, kể cả những người bạn đã thấy chạy lúc đầu đêm.',
      descEn: 'The clock at the head of the alley flips to 4:34. Doors open one by one. The road is clean as if just mopped. No one is left, nothing is left, not even those you saw running at the start of the night.',
      strainGain: 6,
      choices: [
        { labelVi: 'Về báo với người đã thuê bạn và nhận tiền', labelEn: 'Go back to whoever hired you and collect the pay',
          resultVi: 'Người thuê bạn đếm tiền mà tay không run, như thể đêm nay chỉ là một đêm bình thường. Với họ thì đúng là vậy.', resultEn: 'Your employer counts out the money without a tremor, as though tonight were an ordinary night. For them, it was.',
          fx: { wealth: 55, sanity: 10, rep: 10, merit: 12 }, recordAdd: 'night_backstreets_survivor' },
        { labelVi: 'Ngồi lại trên bậc thềm, nhìn mặt đường đến khi trời sáng', labelEn: 'Sit on a step and watch the road until it is light',
          resultVi: 'Bạn ngồi đến khi những người bán hàng sớm nhất kéo xe ra. Không ai hỏi bạn ở ngoài đêm qua làm gì. Bạn nhớ đêm nay rõ hơn bạn muốn.', resultEn: 'You sit until the earliest vendors wheel their carts out. No one asks what you were doing outside last night. You remember the night more clearly than you would like.',
          fx: { wealth: 35, sanity: -4, resonance: 16, merit: 16 }, scarAdd: 'Một đêm ngoài phố lúc 3 giờ 13', recordAdd: 'night_backstreets_survivor' }
      ]
    }
  ]
};

/**
 * A second version of the third stage per dungeon, picked from the seed and age at the door,
 * so that the stage a player remembers is not always the one they get.
 */
export const STAGE_VARIANTS = {
  dungeon_warp_train: {
    2: {
      nameVi: 'Toa Ăn: Bữa Tiệc Không Kết Thúc',
      nameEn: 'The Dining Car: A Meal Without End',
      descVi: 'Toa ăn vẫn còn bày tiệc. Hành khách ngồi quanh bàn đã ăn suốt hai nghìn năm, và họ đã ăn hết thức ăn từ rất lâu. Giờ họ nhìn về phía bạn, dao nĩa vẫn cầm trên tay.',
      descEn: 'The dining car is still laid for a feast. The passengers at the table have been eating for two thousand years, and ran out of food long ago. Now they look your way, cutlery still in hand.',
      strainGain: 18,
      choices: [
        { labelVi: 'Ngồi vào bàn và giả vờ là một vị khách đến muộn', labelEn: 'Sit at the table and pretend to be a late guest', checkTrait: 'nerve',
          resultVi: 'Bạn nâng ly rỗng và gật đầu với từng người. Họ gật đầu lại, rồi quay về với những chiếc đĩa trống. Bạn đi qua toa như một người phục vụ.', resultEn: 'You raise an empty glass and nod to each of them. They nod back, then return to their empty plates. You cross the car like a waiter.',
          fx: { sanity: -9, merit: 11, rep: 6 }, lootAhn: 20, strainDelta: 4 },
        { labelVi: 'Lật bàn chắn lối và chém qua', labelEn: 'Flip the table into a barricade and cut through', checkTrait: 'vigor',
          resultVi: 'Bàn đổ, và những vị khách lao tới như thể bạn là món cuối cùng. Bạn giữ được lối đi đến khi cửa toa kế tiếp mở ra.', resultEn: 'The table goes over, and the guests lunge as though you were the last course. You hold the aisle until the next car’s door opens.',
          fx: { health: -12, sanity: -4, merit: 12, rep: 12 }, lootAhn: 30, strainDelta: 8 },
        { labelVi: 'Lùi về toa trước và kéo phanh khẩn', labelEn: 'Back into the previous car and pull the emergency brake', isFlee: true,
          resultVi: 'Phanh rít lên. W Corp sẽ không vui, nhưng bạn vẫn có hai chân để nghe họ không vui.', resultEn: 'The brake screams. W Corp will not be pleased, but you still have two legs to stand on while they are displeased.',
          fx: { rep: -2, sanity: 3 } }
      ]
    }
  },
  dungeon_lobotomy_ruin: {
    2: {
      nameVi: 'Phòng Họp Đội Ngũ: Cuộc Họp Không Ai Rời Đi',
      nameEn: 'The Team Briefing Room: A Meeting No One Left',
      descVi: 'Một phòng họp còn nguyên bàn ghế. Mười mấy nhân viên trong áo blouse vẫn ngồi đúng chỗ, mắt nhìn màn hình đã tắt. Một Abnormality nhỏ ngồi ở đầu bàn, giơ tay như đang chờ được gọi phát biểu.',
      descEn: 'A meeting room with its furniture intact. A dozen employees in lab coats still sit in their places, eyes on a dead screen. A small Abnormality sits at the head of the table, hand raised as if waiting to be called on.',
      strainGain: 18,
      choices: [
        { labelVi: 'Gọi tên nó, như một người chủ trì cuộc họp', labelEn: 'Call on it, as whoever chairs the meeting would', checkTrait: 'nerve',
          resultVi: 'Nó hạ tay xuống và nói một câu bạn không hiểu. Các nhân viên vỗ tay, rồi đổ gục xuống bàn. Cuộc họp kết thúc. Cửa phía sau mở ra.', resultEn: 'It lowers its hand and says something you do not understand. The employees applaud, then slump onto the table. The meeting is over. The far door opens.',
          fx: { sanity: -10, merit: 12, resonance: 10 }, lootAhn: 18, strainDelta: 4 },
        { labelVi: 'Lấy thẻ nhân viên của những người đã chết để mở cửa phụ', labelEn: 'Take the dead employees’ badges to open the side door', checkTrait: 'luck',
          resultVi: 'Chiếc thẻ thứ ba mở được cửa. Trong ngăn kéo cạnh đó có một ống Enkephalin còn niêm phong mà ai đó định mang về nhà.', resultEn: 'The third badge opens the door. In the drawer beside it is a sealed Enkephalin vial that someone meant to take home.',
          fx: { sanity: -5, health: -4, merit: 9, wealth: 20 }, lootAhn: 24, strainDelta: 6 },
        { labelVi: 'Đóng cửa lại và quay về thang máy', labelEn: 'Close the door and head back to the elevator', isFlee: true,
          resultVi: 'Bạn khép cửa nhẹ nhàng, như sợ làm phiền một cuộc họp. Thang máy vẫn còn chạy.', resultEn: 'You close the door gently, as if afraid to interrupt a meeting. The elevator still runs.',
          fx: { sanity: 3 } }
      ]
    }
  },
  dungeon_bloodfiend_carnival: {
    2: {
      nameVi: 'Vòng Ngựa Gỗ: Điệu Valse Cuối',
      nameEn: 'The Carousel: The Last Waltz',
      descVi: 'Vòng ngựa gỗ quay chậm theo một điệu valse. Trên mỗi lưng ngựa là một Bloodfiend trong trang phục dạ hội, và chiếc ngựa cuối cùng còn trống. Người điều khiển giơ tay mời bạn lên.',
      descEn: 'The carousel turns slowly to a waltz. On every horse sits a Bloodfiend in evening dress, and the last horse is empty. The operator gestures for you to climb on.',
      strainGain: 19,
      choices: [
        { labelVi: 'Lên ngựa và nhảy theo nhịp, chờ khoảnh khắc để ra tay', labelEn: 'Mount up and ride the rhythm, waiting for the moment to strike', checkTrait: 'nerve',
          resultVi: 'Bạn giữ nhịp đến vòng thứ ba, khi tất cả cúi chào cùng lúc. Lưỡi của bạn vào đúng lúc ấy. Nhạc tắt.', resultEn: 'You keep the beat until the third turn, when they all bow at once. Your blade goes in at that moment. The music stops.',
          fx: { sanity: -8, health: -6, rep: 14, merit: 13 }, lootAhn: 26, strainDelta: 5 },
        { labelVi: 'Phá trục quay để cả vòng ngựa đổ xuống', labelEn: 'Break the axle so the whole carousel collapses', checkTrait: 'vigor',
          resultVi: 'Trục kim loại gãy với tiếng rên dài. Vòng ngựa nghiêng, và những vị khách dạ hội rơi khỏi lưng ngựa như những chiếc lá.', resultEn: 'The metal axle snaps with a long groan. The carousel tilts, and the guests in evening dress fall from their mounts like leaves.',
          fx: { health: -12, sanity: -4, rep: 12, merit: 12 }, lootAhn: 30, strainDelta: 8 },
        { labelVi: 'Từ chối lời mời và lùi khỏi vòng sáng', labelEn: 'Decline the invitation and step out of the light', isFlee: true,
          resultVi: 'Người điều khiển cúi đầu tiếc nuối. Bạn lùi ra cho đến khi điệu valse không còn nghe thấy.', resultEn: 'The operator bows in regret. You back away until the waltz can no longer be heard.',
          fx: { sanity: 2, rep: -2 } }
      ]
    }
  },
  dungeon_outskirts_ruins: {
    2: {
      nameVi: 'Thư Viện Chìm: Những Trang Biết Đọc',
      nameEn: 'The Sunken Library: Pages That Read Back',
      descVi: 'Một thư viện cổ chìm dưới cát, kệ sách cao đến tận vòm. Những cuốn sách tự lật trang khi bạn đi qua. Ở cuối gian, một bóng người làm từ chữ viết đứng chắn lối và hỏi bạn tên.',
      descEn: 'An ancient library sunk beneath the sand, its shelves rising to the vault. The books turn their own pages as you pass. At the end of the hall, a figure made of writing blocks the way and asks your name.',
      strainGain: 20,
      choices: [
        { labelVi: 'Nói tên thật của mình', labelEn: 'Give your real name', checkTrait: 'nerve',
          resultVi: 'Bóng người lật một trang trong lồng ngực nó và đọc to đời bạn đến tận hôm nay. Rồi nó bước sang bên. Bạn không muốn nghe đoạn sau.', resultEn: 'The figure turns a page in its chest and reads your life aloud up to today. Then it steps aside. You do not want to hear what comes next.',
          fx: { sanity: -12, merit: 14, resonance: 14 }, strainDelta: 6 },
        { labelVi: 'Đốt một kệ sách để đánh lạc hướng và chạy qua', labelEn: 'Set a shelf alight as a distraction and run past', checkTrait: 'luck',
          resultVi: 'Lửa bắt vào giấy nhanh hơn bạn nghĩ. Bóng người quay về phía kệ sách đang cháy, và bạn nhặt được một bản đồ cổ khi chạy ngang qua bàn.', resultEn: 'The fire catches the paper faster than you expected. The figure turns to the burning shelf, and you snatch an old map from a desk as you run.',
          fx: { health: -8, sanity: -4, merit: 10, wealth: 15 }, lootAhn: 26, strainDelta: 8 },
        { labelVi: 'Lùi ra và leo dây lên mặt đất', labelEn: 'Back out and climb the rope to the surface', isFlee: true,
          resultVi: 'Những trang sách lật nhanh hơn sau lưng bạn, rồi dừng lại khi bạn ra khỏi cửa.', resultEn: 'The pages riffle faster behind you, then stop as you leave the doorway.',
          fx: { sanity: 3 } }
      ]
    }
  },
  dungeon_great_lake: {
    2: {
      nameVi: 'Con Tàu Ma Trong Sương',
      nameEn: 'The Ghost Ship in the Fog',
      descVi: 'Một con tàu săn cá voi khác hiện ra trong sương, mang tên chính con tàu của bạn trên mũi. Thủy thủ đoàn trên đó mặc đồng phục giống hệt đoàn của bạn, và họ đang giương lao về phía bạn.',
      descEn: 'Another whaling ship emerges from the fog, bearing your own ship’s name on its bow. Its crew wears uniforms identical to yours, and they are raising harpoons your way.',
      strainGain: 20,
      choices: [
        { labelVi: 'Đánh dấu chéo lên áo đoàn mình rồi giáp lá cà', labelEn: 'Mark your own crew with a cross and board for close combat', checkTrait: 'vigor',
          resultVi: 'Dấu chéo cứu đoàn bạn khỏi đâm nhầm nhau. Khi người cuối cùng của con tàu kia rơi xuống nước, con tàu tan vào sương như chưa từng có.', resultEn: 'The cross keeps your crew from stabbing each other. When the last of the other crew falls into the water, the ship dissolves into the fog as if it never was.',
          fx: { health: -14, sanity: -6, rep: 14, merit: 14 }, lootAhn: 28, strainDelta: 7 },
        { labelVi: 'Tắt hết đèn, im lặng, và để con tàu kia đi qua', labelEn: 'Douse every lamp, keep silent, and let the other ship pass', checkTrait: 'luck',
          resultVi: 'Con tàu kia trôi qua gần đến mức bạn nghe được tiếng thở của chính mình từ boong bên ấy. Rồi nó khuất vào sương.', resultEn: 'The other ship drifts by so close you can hear your own breathing from its deck. Then it vanishes into the fog.',
          fx: { sanity: -9, merit: 10, resonance: 10 }, strainDelta: 3 },
        { labelVi: 'Quay mũi tàu về bến trước khi hai con tàu chạm nhau', labelEn: 'Turn the bow for port before the two ships meet', isFlee: true,
          resultVi: 'Hai con tàu lướt qua nhau trong một khoảnh khắc. Khi sương tan, chỉ còn mỗi con tàu của bạn.', resultEn: 'The two ships slide past each other for a moment. When the fog thins, only yours remains.',
          fx: { sanity: 2, rep: -2 } }
      ]
    }
  },
  dungeon_backstreets_night: {
    2: {
      nameVi: 'Đợt quét thứ ba: Người mẹ',
      nameEn: 'The third sweep: The Mother',
      descVi: 'Đợt cuối không có kẻ nào cao hơn những kẻ khác. Thay vào đó, chúng đi chậm quanh một chiếc xe đẩy, nơi có thứ gì đó được phủ bằng một tấm khăn trắng. Cả đoàn hát nhỏ, như hát ru.',
      descEn: 'The last wave has no one taller than the rest. Instead, they walk slowly around a pushcart that carries something under a white cloth. The whole procession hums softly, like a lullaby.',
      strainGain: 19,
      choices: [
        { labelVi: 'Cúi đầu trước chiếc xe đẩy và đứng nép vào tường', labelEn: 'Bow your head to the cart and stand flat against the wall', checkTrait: 'nerve',
          resultVi: 'Chiếc xe đi qua sát đến mức tấm khăn chạm vào tay bạn. Nó ấm. Cả đoàn đi tiếp, và tiếng hát nhỏ dần về phía cống ngầm.', resultEn: 'The cart passes so close the cloth brushes your hand. It is warm. The procession walks on, and the humming fades toward the drains.',
          fx: { sanity: -10, merit: 15, resonance: 12 }, strainDelta: 3 },
        { labelVi: 'Nhắm vào bánh xe đẩy để cả đoàn tán loạn', labelEn: 'Go for the cart’s wheel to scatter the procession', checkTrait: 'vigor',
          resultVi: 'Bánh xe gãy và chiếc xe nghiêng. Cả đoàn ngừng hát cùng một lúc, quay lại đỡ chiếc xe, và quên mất bạn đang ở đó.', resultEn: 'The wheel breaks and the cart tilts. The whole procession stops humming at once, turns to steady the cart, and forgets you are there.',
          fx: { health: -12, sanity: -7, rep: 14, merit: 14 }, lootAhn: 24, strainDelta: 7 },
        { labelVi: 'Trèo qua tường vào sân một nhà dân', labelEn: 'Climb a wall into someone’s yard', isFlee: true,
          resultVi: 'Sân nhà là đất của người ở. Bạn nằm giữa những chậu cây đến khi tiếng hát qua hẳn.', resultEn: 'The yard belongs to someone’s home. You lie among the flowerpots until the humming has passed.',
          fx: { sanity: 2, rep: -2 } }
      ]
    }
  }
};

/**
 * A side room off the main route: one door choice on a given stage, a short room behind it,
 * and the route resumes at the next main stage. Better pay, one more stage of strain.
 */
export const SIDE_ROOMS = {
  dungeon_warp_train: {
    fromStage: 0,
    door: { labelVi: 'Mở cánh cửa phòng hành lý bị niêm phong', labelEn: 'Open the sealed luggage room door', checkTrait: 'luck',
      resultVi: 'Niêm phong bung ra. Phía sau là toa hành lý, nơi đồ đạc của hai trăm hành khách đã chất thành núi.', resultEn: 'The seal pops. Beyond is the luggage car, where two hundred passengers’ belongings have piled into a mountain.',
      fx: { sanity: -2 }, strainDelta: 2 },
    room: { id: 'warp_luggage', nameVi: 'Toa Hành Lý', nameEn: 'The Luggage Car',
      descVi: 'Va li mở toang, quần áo phủ trần toa. Có tiếng gì đó cựa quậy dưới đống đồ, và một chiếc rương sắt khóa chặt nằm ngay chính giữa.', descEn: 'Suitcases split open, clothes draped across the ceiling. Something stirs beneath the pile, and an iron trunk sits locked in the very middle.',
      strainGain: 14,
      choices: [
        { labelVi: 'Cạy chiếc rương sắt', labelEn: 'Pry open the iron trunk', checkTrait: 'vigor',
          resultVi: 'Bên trong là đồ trang sức của một gia đình Nest, gói trong khăn lụa. Thứ dưới đống đồ không đuổi theo bạn.', resultEn: 'Inside is a Nest family’s jewelry, wrapped in silk. Whatever lies beneath the pile does not follow you.',
          fx: { health: -6, sanity: -3, wealth: 30, merit: 6 }, lootAhn: 30, strainDelta: 4 },
        { labelVi: 'Chỉ lấy những gì nằm sẵn trên mặt, rồi đi', labelEn: 'Take only what lies on top, then go',
          resultVi: 'Bạn nhặt vài chiếc ví và một chiếc đồng hồ còn chạy. Đủ rồi.', resultEn: 'You collect a few wallets and a watch that still ticks. That is enough.',
          fx: { sanity: -2, merit: 3 }, lootAhn: 12, strainDelta: 0 }
      ] }
  },
  dungeon_lobotomy_ruin: {
    fromStage: 1,
    door: { labelVi: 'Đi xuống phòng lưu trữ hồ sơ của chi nhánh', labelEn: 'Go down to the branch records room', checkTrait: 'nerve',
      resultVi: 'Cầu thang xuống phòng lưu trữ ngập nước tới gối. Bạn lội qua, đèn pin chiếu lên những tủ hồ sơ đã rỉ sét.', resultEn: 'The stairs to the records room are knee-deep in water. You wade through, torchlight on rusted filing cabinets.',
      fx: { sanity: -3 }, strainDelta: 3 },
    room: { id: 'lobotomy_records', nameVi: 'Phòng Lưu Trữ Ngập Nước', nameEn: 'The Flooded Records Room',
      descVi: 'Hàng trăm tập hồ sơ nhân viên trôi lềnh bềnh. Một tủ sắt vẫn khô, cửa có khóa số. Trên tường, ai đó đã viết bằng bút dạ: đừng đọc tập màu đỏ.', descEn: 'Hundreds of employee files float on the water. One steel cabinet is still dry, with a combination lock. On the wall someone has written in marker: do not read the red file.',
      strainGain: 15,
      choices: [
        { labelVi: 'Mở tủ sắt và đọc tập màu đỏ', labelEn: 'Open the steel cabinet and read the red file', checkTrait: 'nerve',
          resultVi: 'Tập hồ sơ ghi lại cách một Abnormality được thuần hóa, kèm tên những người đã chết để viết ra trang ấy. Seven Association sẽ trả giá cao cho nó.', resultEn: 'The file records how an Abnormality was contained, with the names of those who died to write that page. Seven Association would pay well for it.',
          fx: { sanity: -10, wealth: 25, merit: 10, resonance: 8 }, lootAhn: 22, strainDelta: 6 },
        { labelVi: 'Lấy những tập hồ sơ nhân viên còn đọc được, để lại tập đỏ', labelEn: 'Take the staff files that are still legible and leave the red one',
          resultVi: 'Bạn nhét vài tập vào túi chống nước. Ở đâu đó trên tầng trên, có những gia đình chưa từng được báo tên người thân mình.', resultEn: 'You stuff a few files into a waterproof bag. Somewhere above there are families who were never told their kin’s names.',
          fx: { sanity: 2, rep: 6, merit: 4 }, lootAhn: 8, strainDelta: 0 }
      ] }
  },
  dungeon_bloodfiend_carnival: {
    fromStage: 0,
    door: { labelVi: 'Lẻn vào phía sau quầy bán vé', labelEn: 'Slip behind the ticket booth', checkTrait: 'luck',
      resultVi: 'Phía sau quầy vé là một hành lang hẹp dẫn xuống phòng chứa đồ của đoàn xiếc.', resultEn: 'Behind the ticket booth a narrow hallway leads down to the troupe’s storeroom.',
      fx: { sanity: -2 }, strainDelta: 2 },
    room: { id: 'carnival_backstage', nameVi: 'Hậu Trường Đoàn Xiếc', nameEn: 'The Troupe’s Backstage',
      descVi: 'Những bộ trang phục treo kín tường, cổ áo còn vết máu khô. Trong một chiếc lồng, một người còn sống ngồi ôm gối, nhìn bạn mà không dám hy vọng.', descEn: 'Costumes line the walls, collars stiff with old blood. In a cage, someone still alive sits hugging their knees, looking at you without daring to hope.',
      strainGain: 14,
      choices: [
        { labelVi: 'Phá khóa lồng và dẫn người ấy theo', labelEn: 'Break the cage lock and take them with you', checkTrait: 'vigor',
          resultVi: 'Ổ khóa gãy. Người ấy đi sau bạn, run rẩy nhưng không chậm. Họ nói tên mình nhiều lần, như sợ bạn quên.', resultEn: 'The lock breaks. They follow you, trembling but not slow. They say their name over and over, as if afraid you will forget.',
          fx: { health: -5, sanity: 4, rep: 10, merit: 8 }, strainDelta: 4 },
        { labelVi: 'Lục túi các bộ trang phục rồi rời đi', labelEn: 'Search the costume pockets, then leave',
          resultVi: 'Bạn tìm được một nắm Ahn và một chiếc vé danh dự. Người trong lồng nhìn theo bạn đến khi cửa khép lại.', resultEn: 'You find a handful of Ahn and an honor ticket. The one in the cage watches you until the door closes.',
          fx: { sanity: -6, merit: 3 }, lootAhn: 20, strainDelta: 2 }
      ] }
  },
  dungeon_outskirts_ruins: {
    fromStage: 1,
    door: { labelVi: 'Theo dấu chân lạ vào một hành lang bên', labelEn: 'Follow strange footprints into a side corridor', checkTrait: 'nerve',
      resultVi: 'Dấu chân nhỏ, như của trẻ con, nhưng sâu như của người mang nặng. Chúng dẫn bạn vào một gian phòng tròn.', resultEn: 'The footprints are small, like a child’s, but deep as if carrying something heavy. They lead you into a round chamber.',
      fx: { sanity: -3 }, strainDelta: 2 },
    room: { id: 'outskirts_camp', nameVi: 'Trại Bỏ Hoang Của Đoàn Trước', nameEn: 'The Abandoned Camp of the Last Expedition',
      descVi: 'Một khu trại cũ: túi ngủ, nồi nấu, sổ ghi chép. Không có ai, nhưng bếp vẫn còn ấm. Cuốn sổ mở ở trang cuối, chữ viết run rẩy.', descEn: 'An old camp: bedrolls, a cooking pot, a logbook. No one is here, but the stove is still warm. The logbook lies open at the last page, the writing shaky.',
      strainGain: 15,
      choices: [
        { labelVi: 'Đọc trang cuối cuốn sổ', labelEn: 'Read the last page of the logbook', checkTrait: 'nerve',
          resultVi: 'Trang cuối chỉ có một câu: "Nó bắt chước tiếng người đã chết." Bạn nhớ câu ấy suốt quãng đường còn lại, và nhờ thế không quay đầu khi nghe gọi tên.', resultEn: 'The last page holds one sentence: “It imitates the voices of the dead.” You remember it for the rest of the way, and so do not turn when you hear your name.',
          fx: { sanity: -7, merit: 9, resonance: 8 }, strainDelta: -6 },
        { labelVi: 'Gom đồ tiếp tế còn dùng được', labelEn: 'Gather the supplies that are still usable',
          resultVi: 'Bạn có thêm nước, dây và một chiếc đèn còn dầu. Bạn để lại cuốn sổ ở đúng chỗ.', resultEn: 'You gain water, rope, and a lamp with oil left. You leave the logbook where it lay.',
          fx: { health: 6, sanity: 2, merit: 2 }, lootAhn: 10, strainDelta: -4 }
      ] }
  },
  dungeon_great_lake: {
    fromStage: 0,
    door: { labelVi: 'Ghé vào xác một con tàu đắm trên bãi cạn', labelEn: 'Stop at a wreck on the shoal', checkTrait: 'luck',
      resultVi: 'Bạn chèo xuồng tới xác tàu. Thân tàu nghiêng, nước ngập nửa hầm.', resultEn: 'You row the skiff to the wreck. The hull lists, its hold half flooded.',
      fx: { sanity: -2 }, strainDelta: 2 },
    room: { id: 'lake_wreck', nameVi: 'Hầm Con Tàu Đắm', nameEn: 'The Wreck’s Hold',
      descVi: 'Trong hầm tàu, những thùng mỡ cá voi còn niêm phong xếp chồng. Trên cột buồm gãy, có ai đó đã khắc tên của cả đoàn và một vạch ngang dưới mỗi tên.', descEn: 'In the hold, sealed casks of whale oil are stacked high. On the broken mast someone has carved the whole crew’s names, with a line beneath each one.',
      strainGain: 14,
      choices: [
        { labelVi: 'Lặn xuống hầm ngập để lấy những thùng sâu nhất', labelEn: 'Dive into the flooded hold for the deepest casks', checkTrait: 'vigor',
          resultVi: 'Nước lạnh như dao. Bạn lên với hai thùng còn nguyên và một vết cắt dài trên bắp tay.', resultEn: 'The water is cold as a knife. You surface with two intact casks and a long cut on your arm.',
          fx: { health: -9, sanity: -3, wealth: 25, merit: 7 }, lootAhn: 32, strainDelta: 4 },
        { labelVi: 'Khắc thêm tên đoàn mình lên cột buồm rồi đi', labelEn: 'Carve your crew’s names on the mast as well, then go',
          resultVi: 'Đoàn của bạn đứng nhìn bạn khắc từng tên, không ai nói gì. Khi trở lại tàu, mọi người làm việc nhanh hơn.', resultEn: 'Your crew watches you carve each name, saying nothing. Back aboard, everyone works faster.',
          fx: { sanity: 4, rep: 5, merit: 3 }, strainDelta: -5 }
      ] }
  },
  dungeon_backstreets_night: {
    fromStage: 0,
    door: { labelVi: 'Chui qua cửa sau của một quán rượu đã đóng', labelEn: 'Squeeze through the back door of a closed tavern', checkTrait: 'luck',
      resultVi: 'Quán đã đóng, nhưng không phải là nhà ở. Luật của Sweepers không che chở nơi này, và bạn biết điều đó khi bước vào.', resultEn: 'The tavern is closed, but it is not a home. The Sweepers’ rule does not shelter it, and you know it as you step inside.',
      fx: { sanity: -2 }, strainDelta: 2 },
    room: { id: 'night_tavern', nameVi: 'Quán Rượu Lúc 3 Giờ', nameEn: 'The Tavern at Three',
      descVi: 'Ghế lật trên bàn, sàn còn mùi rượu đổ. Sau quầy, chủ quán ngồi im với một túi tiền, không về kịp nhà trước giờ. Ngoài cửa sổ, những bộ vest đen bắt đầu đi qua.', descEn: 'Chairs upturned on tables, the floor reeking of spilt liquor. Behind the bar the owner sits frozen with a purse, unable to get home in time. Beyond the window, black suits begin to pass.',
      strainGain: 14,
      choices: [
        { labelVi: 'Đưa chủ quán về nhà qua lối mái', labelEn: 'Get the owner home across the rooftops', checkTrait: 'vigor',
          resultVi: 'Bạn kéo người ấy qua ba mái nhà. Đến cửa nhà, họ dúi túi tiền vào tay bạn rồi đóng cửa, run đến mức khóa ba lần mới được.', resultEn: 'You haul them across three roofs. At their door they push the purse into your hand and shut themselves in, shaking so much it takes three tries to lock.',
          fx: { health: -6, sanity: 3, rep: 8, merit: 8 }, lootAhn: 22, strainDelta: 4 },
        { labelVi: 'Ngồi im sau quầy cùng chủ quán đến khi đợt đầu qua', labelEn: 'Sit silent behind the bar with the owner until the first wave passes', checkTrait: 'nerve',
          resultVi: 'Một bóng vest dừng lại trước cửa sổ, rồi đi tiếp. Chủ quán thở ra, rót cho bạn một ly mà không lấy tiền.', resultEn: 'A suited shadow stops at the window, then moves on. The owner breathes out and pours you a drink on the house.',
          fx: { sanity: -5, merit: 6 }, lootAhn: 10, strainDelta: 0 }
      ] }
  }
};

/** A shortcut off stage 2 that skips straight to the last stage: harder check, more strain, more pay. */
export const SHORTCUTS = {
  dungeon_warp_train: { labelVi: 'Chạy dọc nóc tàu thẳng tới toa cuối, bỏ qua toa hạng nhất', labelEn: 'Run along the roof straight to the last car, skipping first class',
    resultVi: 'Gió dị chiều quật vào mặt, nhưng bạn đến được đầu toa cuối trong khi đồng hồ vẫn chưa nhích.', resultEn: 'The rift wind lashes your face, but you reach the last car while the clock has not moved.' },
  dungeon_lobotomy_ruin: { labelVi: 'Nhảy vào trục thang máy và tuột thẳng xuống lõi', labelEn: 'Jump into the elevator shaft and slide straight to the core',
    resultVi: 'Dây cáp xé găng tay bạn, nhưng bạn chạm đáy trước cả đội, cạnh cửa phòng lõi.', resultEn: 'The cable shreds your gloves, but you hit bottom before the team, next to the core room door.' },
  dungeon_bloodfiend_carnival: { labelVi: 'Trèo lên đu quay và nhảy qua mái bạt tới lối ra', labelEn: 'Climb the wheel and leap across the tent roof to the exit',
    resultVi: 'Bạn đáp xuống mái bạt, trượt dài, và rơi đúng vào khoảng trống trước nắp cống dẫn lên phố.', resultEn: 'You land on the canvas, slide a long way, and drop right into the clearing before the manhole to the street.' },
  dungeon_outskirts_ruins: { labelVi: 'Đu dây xuống khe nứt thẳng tới điện thờ', labelEn: 'Rappel down the fissure straight to the shrine',
    resultVi: 'Khe nứt sâu hơn bạn tưởng và nóng dần khi xuống. Bạn chạm đất ngay sau lưng bệ đá.', resultEn: 'The fissure is deeper than you thought and grows hotter as you descend. You touch down right behind the pedestal.' },
  dungeon_great_lake: { labelVi: 'Cắt neo và cho tàu lao thẳng qua vùng nước xoáy', labelEn: 'Cut anchor and drive the ship straight through the maelstrom',
    resultVi: 'Con tàu rên rỉ nhưng không vỡ. Khi xoáy nước nhả ra, bạn đã ở ngay trên chỗ con cá voi chìm.', resultEn: 'The ship groans but holds. When the maelstrom lets go, you are right above where the whale sank.' },
  dungeon_backstreets_night: { labelVi: 'Chạy một mạch qua ba khu phố, tránh hết đợt hai và đợt ba', labelEn: 'Run flat out across three blocks, dodging both the second and third waves',
    resultVi: 'Bạn không dừng lại lần nào. Khi tim gần như bật khỏi lồng ngực, đồng hồ ở đầu hẻm đã gần 4 giờ 34.', resultEn: 'You do not stop once. When your heart is nearly out of your chest, the clock at the head of the alley is close to 4:34.' }
};

/** The line a companion says, by what happened. `{name}` is filled with the companion's name. */
export const COMPANION_TEXT = {
  joins: { vi: '{name} đi cùng bạn xuống.', en: '{name} comes down with you.' },
  saved: { vi: '{name} kéo bạn ra đúng lúc, và lãnh phần đòn lẽ ra là của bạn.', en: '{name} pulls you clear just in time and takes the blow meant for you.' },
  balked: { vi: '{name} cãi lại lệnh của bạn giữa chặng, và cả hai mất nhịp.', en: '{name} argues with your call mid-stage, and you both lose the rhythm.' },
  leadOk: { vi: '{name} đi trước, làm gọn phần nguy hiểm, rồi ra hiệu cho bạn theo sau.', en: '{name} goes first, handles the dangerous part cleanly, then signals you to follow.' },
  leadHurt: { vi: '{name} đi trước và bị thương. Họ vẫn đứng được, nhưng không nói gì suốt chặng sau.', en: '{name} goes first and is hurt. They can still stand, but say nothing for the next stage.' },
  leadLost: { vi: '{name} đi trước và không quay lại. Bạn tìm thấy họ ở cuối hành lang, đã quá muộn.', en: '{name} goes first and does not come back. You find them at the end of the corridor, too late.' },
  homeWin: { vi: 'Trên đường về, {name} đi sát cạnh bạn hơn lúc đi.', en: 'On the way back, {name} walks closer to you than on the way in.' },
  homeFled: { vi: '{name} không trách bạn vì đã quay về. Có lẽ họ cũng muốn thế.', en: '{name} does not blame you for turning back. Perhaps they wanted to as well.' }
};

export const COMPANION_LEAD = {
  labelVi: 'Để {name} đi trước, bạn yểm trợ phía sau',
  labelEn: 'Let {name} go first while you cover from behind'
};

/** Final-stage choices that carry something out, and the thread that brings it back later. */
export const FINAL_KEEPS = {
  dungeon_lobotomy_ruin: 0,
  dungeon_bloodfiend_carnival: 0,
  dungeon_outskirts_ruins: 0,
  dungeon_great_lake: 0,
  dungeon_backstreets_night: 1
};

/** What each dungeon is worth to the Association you belong to, if you report it. */
export const REPORT_FIT = {
  dungeon_warp_train: ['seven', 'devyat'],
  dungeon_lobotomy_ruin: ['seven', 'dieci'],
  dungeon_bloodfiend_carnival: ['zwei', 'liu', 'shi'],
  dungeon_outskirts_ruins: ['dieci', 'devyat'],
  dungeon_great_lake: ['liu', 'tres'],
  dungeon_backstreets_night: ['zwei', 'seven', 'cinq', 'oufi']
};

// Flags the dungeon engine grants from the tables above, declared where the story lint can see them
export const DUNGEON_FLAGS = [{ flagGranted: 'KeptDungeonTrophy' }];
