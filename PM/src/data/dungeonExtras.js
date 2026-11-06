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
  fall: { vi: "Lúc 4 giờ 34, cánh cửa đầu tiên mở ra. Mặt đường đã sạch. Không ai tìm thấy bạn giữa những người trở về.", en: "At 4:34, the first door opens. The street has been cleared. You are not among those who return.", causeVi: "Biến mất trong đợt quét lúc 3 giờ 13", causeEn: "Vanished in the 3:13 sweep" },
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
          failVi: 'Lưỡi dao mắc vào lớp vải dày. Cái móc quét qua vai bạn trước khi bạn rút được nó ra.', failEn: 'Your blade catches in the heavy fabric. A hook cuts across your shoulder before you pull free.',
          fx: { health: -7, sanity: -3, rep: 5, merit: 8 }, lootAhn: 18, strainDelta: 6 },
        { labelVi: 'Chạy theo mái nhà về phía chợ, nơi có nhiều chỗ nấp', labelEn: 'Run the rooftops toward the market, where there are more places to hide', checkTrait: 'luck',
          resultVi: 'Ngói vỡ dưới chân, nhưng bạn không trượt. Trên đường chạy, bạn nhặt một túi Ahn mắc ở máng xối trước khi đợt quét đi qua.', resultEn: 'Tiles crack underfoot, but you keep your footing. Along the roofline, you pick up a pouch of Ahn caught in a gutter before the sweep passes.',
          failVi: 'Một viên ngói rơi xuống phố. Bạn nằm ép trên mái khi bộ vest bên dưới ngẩng lên tìm tiếng động.', failEn: 'A tile falls into the street. You flatten yourself against the roof as a suit below looks up.',
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
          failVi: 'Bạn lùi vào hẻm quá sâu. Hai bộ vest chặn cả lối ra lẫn cửa sau, buộc bạn phá cửa sổ để thoát.', failEn: 'You retreat too far into the alley. Two suits block both exits, forcing you through a window.',
          fx: { health: -10, sanity: -5, rep: 10, merit: 11 }, lootAhn: 22, strainDelta: 6 },
        { labelVi: 'Ném vật gì đó kêu to sang phố bên để kéo chúng đi', labelEn: 'Throw something loud into the next street to draw them off', checkTrait: 'luck',
          resultVi: 'Chiếc chảo sắt rơi xuống phố bên. Cả nhóm quay đầu; bạn kịp lấy vài đồng Ahn từ quầy hàng bỏ trống trên đường lách qua.', resultEn: 'The iron pan lands in the next street, drawing the group away. You take a few Ahn from an abandoned stall as you slip past.',
          failVi: 'Chảo va đất quá khẽ. Một Sweeper tách khỏi nhóm và lần theo tiếng chân bạn.', failEn: 'The pan lands too softly. One Sweeper breaks from the group and follows your footsteps.',
          fx: { sanity: -4, merit: 7 }, lootAhn: 6, strainDelta: -2 },
        { labelVi: 'Gõ cửa nhà dân và xin vào, chấp nhận bỏ dở đêm nay', labelEn: 'Knock on a home and ask to be let in, giving up on the night', isFlee: true,
          resultVi: 'Cánh cửa hé ra sau tiếng gõ thứ ba. Người trong nhà kéo bạn vào và khóa lại mà không nói một lời. Sweepers không vào nhà. Bạn ngồi dưới sàn đến khi trời sáng.', resultEn: 'The door cracks open after the third knock. Whoever lives there pulls you in and locks it without a word. Sweepers do not enter homes. You sit on the floor until morning.',
          fx: { sanity: 4 } }
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
          resultVi: 'Bạn xé rách bộ vest cao nhất. Những kẻ còn lại rút xuống cống; bên cạnh xe hàng bỏ lại, bạn nhặt được túi tiền của người chạy trước.', resultEn: 'You tear open the tallest suit. The others retreat into the drains; beside an abandoned cart, you find a pouch left by someone who fled.',
          failVi: 'Bạn chưa chạm được tới nó thì một cái móc kéo lệch vai kiếm. Bạn thoát vòng vây với vết rách ở cánh tay.', failEn: 'A hook pulls your sword arm aside before you reach it. You break from the circle with a cut along your arm.',
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
      descVi: 'Đồng hồ ở đầu hẻm sang 4 giờ 34. Các cánh cửa mở dần; mặt đường đã sạch, còn những người chạy qua đây lúc đầu đêm không thấy trở lại.',
      descEn: 'The clock at the alley mouth reaches 4:34. Doors open one by one; the street is clean, and the people who ran past earlier have not returned.',
      strainGain: 6,
      choices: [
        { labelVi: 'Trở về điểm hẹn, nộp báo cáo và nhận tiền', labelEn: 'Return to the meeting point, report in and collect payment',
          resultVi: 'Người trực ca ghi nhận bạn đã sống qua đêm và đặt tiền công lên bàn. Bạn vẫn nghe tiếng giày dưới cống.', resultEn: 'The clerk marks you down as having survived the night and sets your pay on the desk. You can still hear shoes beneath the drains.',
          fx: { wealth: 55, sanity: 10, rep: 10, merit: 12 }, recordAdd: 'night_backstreets_survivor' },
        { labelVi: 'Ngồi lại trên bậc thềm, nhìn mặt đường đến khi trời sáng', labelEn: 'Sit on a step and watch the road until it is light',
          resultVi: 'Bạn ngồi đến khi xe hàng đầu tiên đi qua. Người trực ca đặt phong bì tiền công bên cạnh; bạn nhận nó mà vẫn nhìn ra mặt đường.', resultEn: 'You sit until the first vendor cart passes. The clerk leaves your pay envelope beside you; you take it without looking away from the street.',
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
      descVi: 'Toa ăn vẫn bày tiệc, nhưng đĩa nào cũng trống. Hành khách quanh bàn ngẩng lên; dao nĩa vẫn nằm trong tay họ.',
      descEn: 'The dining car is still set for a feast, but every plate is empty. The passengers look up with cutlery still in their hands.',
      strainGain: 18,
      choices: [
        { labelVi: 'Ngồi vào bàn và giả vờ là một vị khách đến muộn', labelEn: 'Sit at the table and pretend to be a late guest', checkTrait: 'nerve',
          resultVi: 'Bạn nâng ly rỗng. Họ đáp lễ rồi cúi xuống đĩa; bạn lách qua toa, nhặt tiền đánh rơi dưới bàn.', resultEn: 'You raise an empty glass. They return the gesture and look back at their plates; you slip through the car and collect coins dropped beneath the table.',
          failVi: 'Một hành khách giữ tay bạn lại để rót vào chiếc ly rỗng. Bạn giằng ra, bỏ cả ly lẫn lối đi gần nhất.', failEn: 'A passenger grips your wrist to fill the empty glass. You wrench free, leaving the glass and the nearest exit behind.',
          fx: { sanity: -9, merit: 11, rep: 6 }, lootAhn: 20, strainDelta: 4 },
        { labelVi: 'Lật bàn chắn lối và chém qua', labelEn: 'Flip the table into a barricade and cut through', checkTrait: 'vigor',
          resultVi: 'Bàn đổ chắn lối. Bạn đẩy qua đám đông, nhặt túi tiền văng khỏi áo một hành khách và mở cửa toa sau.', resultEn: 'The table blocks the aisle. You push through the crowd, pick up a purse shaken loose from a passenger and open the next car door.',
          failVi: 'Bàn mắc vào chân ghế. Một hành khách chồm tới trước khi bạn kịp dựng vật chắn.', failEn: 'The table catches on a chair leg. A passenger lunges before you can raise the barricade.',
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
          resultVi: 'Nó nói một câu bạn không hiểu. Các nhân viên vỗ tay rồi gục xuống; cửa sau bật mở, cạnh đó còn một phong bì phụ cấp.', resultEn: 'It says something you cannot understand. The staff applaud and collapse; the rear door opens beside an unclaimed pay envelope.',
          failVi: 'Nó không hạ tay. Các nhân viên đồng loạt quay sang bạn, ghế cào dài trên sàn.', failEn: 'It keeps its hand raised. Every employee turns toward you as their chairs scrape across the floor.',
          fx: { sanity: -10, merit: 12, resonance: 10 }, lootAhn: 18, strainDelta: 4 },
        { labelVi: 'Lấy thẻ nhân viên của những người đã chết để mở cửa phụ', labelEn: 'Take the dead employees’ badges to open the side door', checkTrait: 'luck',
          resultVi: 'Chiếc thẻ thứ ba mở cửa. Trong ngăn kéo cạnh đó có tiền lương chưa lĩnh và một tập phiếu nghiên cứu còn đọc được.', resultEn: 'The third badge opens the door. A drawer beside it holds unclaimed wages and legible research slips.',
          failVi: 'Đèn báo thẻ chuyển đỏ. Tiếng ghế kéo trên sàn sau lưng buộc bạn rời khỏi đầu đọc.', failEn: 'The badge reader flashes red. Chairs scrape behind you, forcing you away from the door.',
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
          resultVi: 'Đến vòng thứ ba, tất cả cúi chào. Bạn đánh bật người điều khiển khỏi bục; nhạc tắt, để lộ túi tiền dưới ghế hắn.', resultEn: 'On the third turn they all bow. You knock the operator from the platform; the music stops, revealing a purse beneath the chair.',
          failVi: 'Bạn ra tay sai nhịp. Người điều khiển kéo cần, khiến cả vòng ngựa xoay nhanh hơn.', failEn: 'You strike off the beat. The operator pulls a lever and the carousel spins faster.',
          fx: { sanity: -8, health: -6, rep: 14, merit: 13 }, lootAhn: 26, strainDelta: 5 },
        { labelVi: 'Phá trục quay để cả vòng ngựa đổ xuống', labelEn: 'Break the axle so the whole carousel collapses', checkTrait: 'vigor',
          resultVi: 'Trục gãy, vòng ngựa nghiêng. Những vị khách dạ hội ngã khỏi yên; bạn lấy được tiền ở quầy trước khi họ đứng dậy.', resultEn: 'The axle breaks and the carousel tilts. The dressed guests fall from their mounts; you take money from the booth before they rise.',
          failVi: 'Trục chỉ cong. Một Bloodfiend nhảy khỏi yên và đáp ngay phía sau bạn.', failEn: 'The axle bends but holds. A Bloodfiend leaps from its mount and lands behind you.',
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
          failVi: 'Bạn nói tên mình, nhưng nó đọc sai thành tên một người đã chết. Những trang sách quanh bạn cùng lật.', failEn: 'You give your name, but it reads back the name of someone dead. Pages turn all around you.',
          fx: { sanity: -12, merit: 14, resonance: 14 }, strainDelta: 6 },
        { labelVi: 'Đốt một kệ sách để đánh lạc hướng và chạy qua', labelEn: 'Set a shelf alight as a distraction and run past', checkTrait: 'luck',
          resultVi: 'Lửa bắt vào kệ. Bóng người quay đi; bạn lách qua và lấy túi tiền cũ trên bàn trước khi ra cửa.', resultEn: 'The shelf catches fire. The figure turns away; you slip past and take an old purse from the desk before reaching the door.',
          failVi: 'Giấy ẩm chỉ bốc khói. Bóng người quay sang, miệng đọc tên bạn rõ hơn.', failEn: 'The damp paper only smokes. The figure turns and speaks your name more clearly.',
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
          resultVi: 'Dấu chéo giúp đoàn mình nhận ra nhau. Con tàu kia lùi vào sương; trên boong còn một thùng tiền dạt sang.', resultEn: 'The cross lets your crew recognize each other. The other ship recedes into the fog; a cash chest drifts across the deck.',
          failVi: 'Sương che cả dấu chéo. Hai nhóm giáp lá cà, bạn phải kéo người mình khỏi một mũi lao.', failEn: 'The fog hides the crosses. The crews meet, and you have to drag one of your own clear of a harpoon.',
          fx: { health: -14, sanity: -6, rep: 14, merit: 14 }, lootAhn: 28, strainDelta: 7 },
        { labelVi: 'Tắt hết đèn, im lặng, và để con tàu kia đi qua', labelEn: 'Douse every lamp, keep silent, and let the other ship pass', checkTrait: 'luck',
          resultVi: 'Con tàu kia trôi qua gần đến mức bạn nghe được tiếng thở của chính mình từ boong bên ấy. Rồi nó khuất vào sương.', resultEn: 'The other ship drifts by so close you can hear your own breathing from its deck. Then it vanishes into the fog.',
          failVi: 'Một ngọn đèn chưa tắt hắt sáng qua sương. Con tàu kia đổi hướng theo vệt sáng ấy.', failEn: 'One lamp is still lit. The other ship changes course toward its glow.',
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
          failVi: 'Bạn ngẩng lên quá sớm. Một bộ vest kéo xe dừng lại, tay đã chạm vào cái móc.', failEn: 'You look up too soon. A suit pulling the cart stops with its hand on the hook.',
          fx: { sanity: -10, merit: 15, resonance: 12 }, strainDelta: 3 },
        { labelVi: 'Nhắm vào bánh xe đẩy để cả đoàn tán loạn', labelEn: 'Go for the cart’s wheel to scatter the procession', checkTrait: 'vigor',
          resultVi: 'Bánh xe gãy. Cả đoàn quay lại giữ chiếc xe; bạn lách qua, nhặt túi Ahn văng khỏi thùng hàng gần đó.', resultEn: 'The wheel breaks. The procession turns to catch the cart; you slip past and pick up a pouch shaken loose from nearby cargo.',
          failVi: 'Bạn đánh trượt trục xe. Tiếng kim loại vang lên, và cả đoàn cùng quay mặt về phía bạn.', failEn: 'You miss the axle. Metal rings out, and the whole procession turns toward you.',
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
      failVi: 'Niêm phong mắc dưới mép cửa. Bạn phải giật mạnh; tiếng động kéo thứ bên trong lại gần.', failEn: 'The seal catches under the door. You wrench it free, drawing something inside toward the noise.',
      fx: { sanity: -2 }, strainDelta: 2 },
    room: { id: 'warp_luggage', nameVi: 'Toa Hành Lý', nameEn: 'The Luggage Car',
      descVi: 'Va li mở toang, quần áo phủ trần toa. Có tiếng gì đó cựa quậy dưới đống đồ, và một chiếc rương sắt khóa chặt nằm ngay chính giữa.', descEn: 'Suitcases split open, clothes draped across the ceiling. Something stirs beneath the pile, and an iron trunk sits locked in the very middle.',
      strainGain: 14,
      choices: [
        { labelVi: 'Cạy chiếc rương sắt', labelEn: 'Pry open the iron trunk', checkTrait: 'vigor',
          resultVi: 'Bên trong là đồ trang sức của một gia đình Nest, gói trong khăn lụa. Thứ dưới đống đồ không đuổi theo bạn.', resultEn: 'Inside is a Nest family’s jewelry, wrapped in silk. Whatever lies beneath the pile does not follow you.',
          failVi: 'Nắp rương chỉ hé một khe. Đống hành lý sau lưng bạn bắt đầu chuyển động.', failEn: 'The lid opens a crack. The pile of luggage behind you begins to move.',
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
      failVi: 'Bạn hụt chân trên bậc ngập nước. Đèn chạm nước, tối đi đúng lúc cánh tủ sắt mở ra.', failEn: 'You miss a submerged step. Your light touches the water and dims as a cabinet door opens.',
      fx: { sanity: -3 }, strainDelta: 3 },
    room: { id: 'lobotomy_records', nameVi: 'Phòng Lưu Trữ Ngập Nước', nameEn: 'The Flooded Records Room',
      descVi: 'Hàng trăm tập hồ sơ nhân viên trôi lềnh bềnh. Một tủ sắt vẫn khô, cửa có khóa số. Trên tường, ai đó đã viết bằng bút dạ: đừng đọc tập màu đỏ.', descEn: 'Hundreds of employee files float on the water. One steel cabinet is still dry, with a combination lock. On the wall someone has written in marker: do not read the red file.',
      strainGain: 15,
      choices: [
        { labelVi: 'Mở tủ sắt và đọc tập màu đỏ', labelEn: 'Open the steel cabinet and read the red file', checkTrait: 'nerve',
          resultVi: 'Tập đỏ ghi quy trình quản thúc một Abnormality cùng tên những người chết trong lúc thử nghiệm. Bạn lấy cả tiền ứng trong tủ và mang hồ sơ ra.', resultEn: 'The red file records an Abnormality containment procedure and the names of those who died testing it. You take the advance pay in the cabinet and carry the file out.',
          failVi: 'Trang đầu dính vào tay bạn. Một dòng chữ lặp lại tên bạn thay vì mã nhân viên.', failEn: 'The first page sticks to your hand. One line repeats your name where an employee number should be.',
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
      failVi: 'Tấm rèm mắc vào vai bạn. Người bán vé ngẩng lên khi bạn gỡ nó ra.', failEn: 'The curtain catches on your shoulder. The ticket seller looks up as you pull free.',
      fx: { sanity: -2 }, strainDelta: 2 },
    room: { id: 'carnival_backstage', nameVi: 'Hậu Trường Đoàn Xiếc', nameEn: 'The Troupe’s Backstage',
      descVi: 'Những bộ trang phục treo kín tường, cổ áo còn vết máu khô. Trong một chiếc lồng, một người còn sống ngồi ôm gối, nhìn bạn mà không dám hy vọng.', descEn: 'Costumes line the walls, collars stiff with old blood. In a cage, someone still alive sits hugging their knees, looking at you without daring to hope.',
      strainGain: 14,
      choices: [
        { labelVi: 'Phá khóa lồng và dẫn người ấy theo', labelEn: 'Break the cage lock and take them with you', checkTrait: 'vigor',
          resultVi: 'Ổ khóa gãy. Bạn dẫn người bị nhốt ra cửa sau; họ tự chạy về phía dãy nhà sáng đèn.', resultEn: 'The lock breaks. You lead the captive out the rear door; they run toward a row of lit homes.',
          failVi: 'Ổ khóa không nhúc nhích. Người trong lồng lùi lại khi tiếng bước chân tới gần.', failEn: 'The lock does not move. The captive backs away as footsteps approach.',
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
      failVi: 'Dấu chân chia làm hai lối. Bạn đi nhầm vào hành lang cụt, nghe tiếng chân thứ hai phía sau.', failEn: 'The tracks split. You take the dead end and hear a second set of steps behind you.',
      fx: { sanity: -3 }, strainDelta: 2 },
    room: { id: 'outskirts_camp', nameVi: 'Trại Bỏ Hoang Của Đoàn Trước', nameEn: 'The Abandoned Camp of the Last Expedition',
      descVi: 'Một khu trại cũ: túi ngủ, nồi nấu, sổ ghi chép. Không có ai, nhưng bếp vẫn còn ấm. Cuốn sổ mở ở trang cuối, chữ viết run rẩy.', descEn: 'An old camp: bedrolls, a cooking pot, a logbook. No one is here, but the stove is still warm. The logbook lies open at the last page, the writing shaky.',
      strainGain: 15,
      choices: [
        { labelVi: 'Đọc trang cuối cuốn sổ', labelEn: 'Read the last page of the logbook', checkTrait: 'nerve',
          resultVi: 'Trang cuối ghi: "Nó bắt chước tiếng người đã chết." Bạn gấp sổ lại khi có ai đó gọi tên từ hành lang.', resultEn: 'The last page reads: “It imitates the voices of the dead.” You close the book when someone calls your name from the corridor.',
          failVi: 'Giọng gọi từ hành lang giống hệt giọng bạn. Cuốn sổ tuột khỏi tay trước khi bạn đọc hết dòng.', failEn: 'The voice in the corridor sounds like your own. The logbook slips from your hand before you finish the line.',
          fx: { sanity: -7, merit: 9, resonance: 8 }, strainDelta: -6 },
        { labelVi: 'Gom đồ tiếp tế còn dùng được', labelEn: 'Gather the supplies that are still usable',
          resultVi: 'Bạn lấy nước, băng và vài đồng Ahn trong túi tiếp tế. Cuốn sổ vẫn mở ở trang cuối.', resultEn: 'You take water, bandages and a few Ahn from the supply bag. The logbook stays open at the last page.',
          fx: { health: 6, sanity: 2, merit: 2 }, lootAhn: 10, strainDelta: -4 }
      ] }
  },
  dungeon_great_lake: {
    fromStage: 0,
    door: { labelVi: 'Ghé vào xác một con tàu đắm trên bãi cạn', labelEn: 'Stop at a wreck on the shoal', checkTrait: 'luck',
      resultVi: 'Bạn chèo xuồng tới xác tàu. Thân tàu nghiêng, nước ngập nửa hầm.', resultEn: 'You row the skiff to the wreck. The hull lists, its hold half flooded.',
      failVi: 'Xuồng chạm đá ngầm. Bạn phải bám mạn tàu đắm để giữ nó khỏi lật.', failEn: 'The skiff strikes a shoal. You grab the wreck to keep the boat upright.',
      fx: { sanity: -2 }, strainDelta: 2 },
    room: { id: 'lake_wreck', nameVi: 'Hầm Con Tàu Đắm', nameEn: 'The Wreck’s Hold',
      descVi: 'Trong hầm tàu, những thùng mỡ cá voi còn niêm phong xếp chồng. Trên cột buồm gãy, có ai đó đã khắc tên của cả đoàn và một vạch ngang dưới mỗi tên.', descEn: 'In the hold, sealed casks of whale oil are stacked high. On the broken mast someone has carved the whole crew’s names, with a line beneath each one.',
      strainGain: 14,
      choices: [
        { labelVi: 'Lặn xuống hầm ngập để lấy những thùng sâu nhất', labelEn: 'Dive into the flooded hold for the deepest casks', checkTrait: 'vigor',
          resultVi: 'Nước lạnh như dao. Bạn lên với hai thùng còn nguyên và một vết cắt dài trên bắp tay.', resultEn: 'The water is cold as a knife. You surface with two intact casks and a long cut on your arm.',
          failVi: 'Dây buộc thùng đứt dưới nước. Bạn trở lên tay không, va vai vào mạn gỗ.', failEn: 'The cask rope snaps underwater. You surface empty handed, striking your shoulder on the hull.',
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
      failVi: 'Bản lề cửa kêu quá lớn. Bạn lách vào quán trước khi bộ vest ngoài phố quay đầu.', failEn: 'The hinge creaks too loudly. You slip inside before the suit in the street turns around.',
      fx: { sanity: -2 }, strainDelta: 2 },
    room: { id: 'night_tavern', nameVi: 'Quán Rượu Lúc 3 Giờ', nameEn: 'The Tavern at Three',
      descVi: 'Ghế lật trên bàn, sàn còn mùi rượu đổ. Sau quầy, chủ quán ngồi im với một túi tiền, không về kịp nhà trước giờ. Ngoài cửa sổ, những bộ vest đen bắt đầu đi qua.', descEn: 'Chairs upturned on tables, the floor reeking of spilt liquor. Behind the bar the owner sits frozen with a purse, unable to get home in time. Beyond the window, black suits begin to pass.',
      strainGain: 14,
      choices: [
        { labelVi: 'Đưa chủ quán về nhà qua lối mái', labelEn: 'Get the owner home across the rooftops', checkTrait: 'vigor',
          resultVi: 'Bạn kéo người ấy qua ba mái nhà. Đến cửa nhà, họ dúi túi tiền vào tay bạn rồi đóng cửa, run đến mức khóa ba lần mới được.', resultEn: 'You haul them across three roofs. At their door they push the purse into your hand and shut themselves in, shaking so much it takes three tries to lock.',
          failVi: 'Chủ quán trượt chân trên mái ướt. Bạn phải kéo họ lên trong khi tiếng móc cào phía dưới tiến gần.', failEn: 'The owner slips on the wet roof. You pull them up as hooks scrape closer below.',
          fx: { health: -6, sanity: 3, rep: 8, merit: 8 }, lootAhn: 22, strainDelta: 4 },
        { labelVi: 'Ngồi im sau quầy cùng chủ quán đến khi đợt đầu qua', labelEn: 'Sit silent behind the bar with the owner until the first wave passes', checkTrait: 'nerve',
          resultVi: 'Một bộ vest dừng trước cửa sổ rồi đi tiếp. Chủ quán thở ra và dúi ít tiền công cho bạn vì đã ở lại.', resultEn: 'A suit stops at the window, then moves on. The owner exhales and presses a little pay into your hand for staying.',
          failVi: 'Bạn làm đổ một chiếc cốc. Chủ quán bịt miệng bạn khi bóng vest ngoài cửa sổ dừng lại.', failEn: 'You knock over a glass. The owner covers your mouth as the suited shadow stops outside.',
          fx: { sanity: -5, merit: 6 }, lootAhn: 10, strainDelta: 0 }
      ] }
  }
};

/** A shortcut off stage 2 that skips straight to the last stage: harder check, more strain, more pay. */
export const SHORTCUTS = {
  dungeon_warp_train: { labelVi: 'Chạy dọc nóc tàu thẳng tới toa cuối, bỏ qua toa hạng nhất', labelEn: 'Run along the roof straight to the last car, skipping first class',
    resultVi: 'Gió quật dọc nóc tàu. Bạn chui vào toa cuối, nhặt chiếc ví mắc cạnh cửa thoát hiểm.', resultEn: 'Wind lashes the roof. You slip into the last car and pick up a wallet caught by the emergency hatch.',
    failVi: 'Tấm kim loại dưới chân bật lên. Bạn phải bám lại cho tới khi có thể vào toa.', failEn: 'A roof panel lifts beneath your feet. You cling on until you can get inside.' },
  dungeon_lobotomy_ruin: { labelVi: 'Nhảy vào trục thang máy và tuột thẳng xuống lõi', labelEn: 'Jump into the elevator shaft and slide straight to the core',
    resultVi: 'Dây cáp xé găng tay. Bạn chạm đáy cạnh cửa phòng lõi, nơi một túi tiền công còn treo trên móc.', resultEn: 'The cable tears your gloves. You land beside the core room door, where an old pay pouch hangs from a hook.',
    failVi: 'Cáp tuột khỏi tay. Bạn đáp xuống sàn tầng dưới trước khi tới lõi.', failEn: 'The cable slips from your hand. You hit the floor below before reaching the core.' },
  dungeon_bloodfiend_carnival: { labelVi: 'Trèo lên đu quay và nhảy qua mái bạt tới lối ra', labelEn: 'Climb the wheel and leap across the tent roof to the exit',
    resultVi: 'Bạn trượt dọc mái bạt, rơi cạnh nắp cống. Một túi tiền của quầy vé mắc ở dây neo bên cạnh.', resultEn: 'You slide down the canvas beside the manhole. A ticket booth purse hangs from the nearby guy rope.',
    failVi: 'Mái bạt rách dưới chân. Bạn rơi vào giữa khu trò chơi, sát lối ra.', failEn: 'The canvas tears beneath you. You fall into the midway, close to the exit.' },
  dungeon_outskirts_ruins: { labelVi: 'Đu dây xuống khe nứt thẳng tới điện thờ', labelEn: 'Rappel down the fissure straight to the shrine',
    resultVi: 'Khe nứt nóng dần. Bạn đáp sau bệ đá, cạnh túi tiền cũ của đoàn thám hiểm trước.', resultEn: 'The fissure grows hotter. You land behind the stone plinth beside an old expedition pay pouch.',
    failVi: 'Dây kẹt trong khe đá. Bạn phải buông đoạn cuối và rơi xuống cạnh bệ.', failEn: 'The rope jams in the rock. You drop the last stretch beside the plinth.' },
  dungeon_great_lake: { labelVi: 'Cắt neo và cho tàu lao thẳng qua vùng nước xoáy', labelEn: 'Cut anchor and drive the ship straight through the maelstrom',
    resultVi: 'Tàu vượt qua xoáy nước và dạt cạnh xác cá voi. Bạn nhặt túi Ahn mắc trong đống lưới trôi.', resultEn: 'The ship clears the maelstrom and drifts beside the whale. You find a pouch of Ahn tangled in floating netting.',
    failVi: 'Mũi tàu lệch hướng. Bạn phải thả buồm phụ để tránh vỡ mạn.', failEn: 'The bow veers off course. You release the spare sail to keep the hull intact.' },
  dungeon_backstreets_night: { labelVi: 'Chạy một mạch qua ba khu phố, tránh hết đợt hai và đợt ba', labelEn: 'Run flat out across three blocks, dodging both the second and third waves',
    resultVi: 'Bạn chạy qua ba khu phố. Một túi tiền bỏ rơi cạnh cửa chợ lọt vào tay; đồng hồ đầu hẻm gần 4 giờ 34.', resultEn: 'You cross three blocks. You take a purse abandoned by the market door as the alley clock nears 4:34.',
    failVi: 'Bạn rẽ nhầm vào phố cụt. Tiếng móc cào sau lưng buộc bạn trèo qua tường.', failEn: 'You turn into a dead end. Hooks scrape behind you, forcing you over a wall.' }
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
  dungeon_great_lake: 0
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

/**
 * Dungeon extraction unique relics & signature gear
 */
export const DUNGEON_EXTRACTION_REWARDS = {
  dungeon_lobotomy_ruin: 'rel_qlippoth_core',
  dungeon_warp_train: 'rel_warp_shard',
  dungeon_bloodfiend_carnival: 'wpn_carnival_rapier',
  dungeon_great_lake: 'rel_pallid_oil',
  dungeon_outskirts_ruins: 'rel_ruin_monolith',
  dungeon_backstreets_night: 'rel_sweeper_fluid'
};

/**
 * Contextual companion stage banter dialogues based on archetype
 */
export const COMPANION_STAGE_BANTER = {
  hothead: [
    { vi: '“Cứ xông thẳng vào! Lùi bước trước lũ quái thai này là sỉ nhục vũ khí của chúng ta.”', en: '“Charge straight through! Backing down from these freaks is an insult to our steel.”' },
    { vi: '“Máu dính đầy mặt rồi, nhưng đao của tôi vẫn còn bén lắm.”', en: '“Blood is all over my face, but my blade is still razor sharp.”' },
    { vi: '“Đừng nhìn tôi như thế, tôi chưa ngã xuống đâu!”', en: '“Don’t look at me like that, I haven’t fallen yet!”' }
  ],
  cautious: [
    { vi: '“Nhìn sàn nhà kìa... vết máu còn chưa khô. Giữ vững thế thủ, một sơ hở là hết đường về.”', en: '“Look at the floor... the blood hasn’t dried. Keep your guard up, one slip and there’s no way back.”' },
    { vi: '“Tiếng bước chân sau vách tường... Chúng ta đang bị bám đuôi đấy.”', en: '“Footsteps behind the wall... Something is stalking us.”' },
    { vi: '“Nếu thấy tình hình không ổn, hãy rút lui ngay lập tức.”', en: '“If things turn south, sound the retreat immediately.”' }
  ],
  veteran: [
    { vi: '“Điều chỉnh nhịp thở đi. Đừng để tiếng rít gào làm rối loạn bước chân. Sống sót ở The City là nhờ cái đầu lạnh.”', en: '“Steady your breathing. Don’t let the roaring disrupt your footwork. Survival in the City belongs to cold heads.”' },
    { vi: '“Căn phòng này có cấu trúc giống hệt bẫy phục kích thời Chiến Tranh Khói. Đi sát mép tường.”', en: '“This room is laid out just like an ambush from the Smoke War. Hug the wall.”' },
    { vi: '“Đòn kết liễu luôn đến lúc đối phương nghĩ mình đã an toàn.”', en: '“The killing stroke always lands when the foe thinks they are safe.”' }
  ],
  loyal: [
    { vi: '“Cứ tập trung phía trước. Lưng của bạn, tôi nhận trách nhiệm bảo vệ bằng cả tính mạng.”', en: '“Keep your eyes forward. I swear my life on watching your back.”' },
    { vi: '“Chỉ cần bạn chưa bỏ cuộc, tôi sẽ không lùi nửa bước.”', en: '“As long as you do not give up, I will not yield half a step.”' },
    { vi: '“Tôi sẽ mở đường máu, đi ngay sau tôi!”', en: '“I will cut a path through, stay right behind me!”' }
  ],
  gambler: [
    { vi: '“Một ăn cả, ngã về không! Tỷ lệ càng hiểm thì chiến lợi phẩm bên dưới càng đáng giá.”', en: '“Double or nothing! The deadlier the odds, the richer the spoils waiting below.”' },
    { vi: '“Con xúc xắc sinh tử đã tung ra rồi, giờ không có đường quay đầu đâu!”', en: '“The mortal die is cast, there is no turning back now!”' },
    { vi: '“Một ván cược tuyệt vời, đúng phong cách của The City!”', en: '“A magnificent wager, true City style!”' }
  ],
  idealist: [
    { vi: '“Bóng tối ở đây dù sâu đến đâu, ngọn lửa trong lòng chúng ta vẫn chưa thể bị dập tắt.”', en: '“No matter how deep this dark is, the spark in our hearts cannot be smothered.”' },
    { vi: '“Chúng ta sẽ đưa mọi người trở về bình an, tôi tin vào điều đó.”', en: '“We will bring everyone back safely, I believe in that.”' },
    { vi: '“Đừng để nỗi sợ nuốt chửng bản thân, hãy nhìn vào ánh sáng phía trước.”', en: '“Do not let fear swallow you whole, keep your gaze on the light ahead.”' }
  ],
  tinkerer: [
    { vi: '“Cấu trúc tàn tích này... nếu tháo được một cụm lõi mang về, Workshop sẽ trả cả gia tài.”', en: '“The machinery in this ruin... if we salvage even one core assembly, the Workshops will pay a fortune.”' },
    { vi: '“Cẩn thận van áp suất bên góc trái, nó sắp quá tải vì cộng hưởng rồi!”', en: '“Watch the pressure valve on the left, it’s about to overload from resonance!”' },
    { vi: '“Tôi vừa gắn thêm chốt gia cố vào giáp của bạn đấy, chịu đòn tốt hơn rồi.”', en: '“I just reinforced your armor latch, it should take a hit better now.”' }
  ],
  cynic: [
    { vi: '“Tất cả những bộ xương rải rác ở đây đều từng nghĩ mình là kẻ đặc biệt. Giữ đầu trên cổ đã.”', en: '“Every skeleton rotting here once thought they were special. Keep your head on your shoulders first.”' },
    { vi: '“The City không có chỗ cho anh hùng, chỉ có kẻ sống sót và thức ăn cho Sweeper.”', en: '“The City has no room for heroes, only survivors and Sweeper chow.”' },
    { vi: '“Lại thêm một căn phòng tanh mùi máu... Hy vọng số Ahn nhặt được bõ công.”', en: '“Another room reeking of iron... Let us hope the Ahn haul is worth the trouble.”' }
  ],
  proud: [
    { vi: '“Một nơi nhớp nhúa tồi tàn... Nhưng nếu đã bước vào, ta phải dọn sạch nó một cách hoàn hảo.”', en: '“A wretched, filthy pit... But since we entered, we shall purge it with absolute perfection.”' },
    { vi: '“Lũ quái vật hạ đẳng này không xứng đáng làm đối thủ của chúng ta.”', en: '“These low-life beasts are unworthy to cross blades with us.”' },
    { vi: '“Đi thẳng về phía trước, đừng để vấy bẩn danh tiếng của chúng ta.”', en: '“March straight ahead, do not tarnish our reputation.”' }
  ],
  silent: [
    { vi: '“... (gật đầu siết chặt chuôi kiếm, ánh mắt lạnh lùng quét qua bóng tối).”', en: '“... (nods firmly, gripping the hilt, scanning the darkness with cold eyes).”' },
    { vi: '“... (ra hiệu tay chỉ về phía góc khuất, vũ khí đã vào thế sẵn sàng).”', en: '“... (signals with a hand toward the blind corner, weapon primed).”' },
    { vi: '“... (bước lên nửa bước, che chắn hướng tấn công hiểm hóc nhất).”', en: '“... (steps half a pace forward, shielding the most dangerous angle).”' }
  ]
};

/**
 * Returns contextual banter for companion at current stage
 */
export function getCompanionStageBanter(companion, theme, stageIndex = 0) {
  if (!companion) return null;
  const arch = companion.archetype || (companion.tags && companion.tags[0]) || 'veteran';
  const pool = COMPANION_STAGE_BANTER[arch] || COMPANION_STAGE_BANTER.veteran;
  const idx = Math.abs((stageIndex || 0)) % pool.length;
  const item = pool[idx];
  return {
    nameVi: companion.nameVi || 'Đồng đội',
    nameEn: companion.nameEn || 'Companion',
    role: companion.role || 'partner',
    vi: item.vi,
    en: item.en
  };
}
