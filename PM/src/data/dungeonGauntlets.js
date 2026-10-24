// ============================================================================
// DUNGEON GAUNTLETS: five of the dungeons are a chain of fights, floor after floor.
// Every turn the enemy shows what it is about to do (its intent). The player answers:
//   guard  : best against a heavy blow, poor against a grab
//   strike : best against a quick attack (a counter), costly against a heavy blow
//   evade  : best against a sweep or a grab, a luck roll; a miss hurts more
// A mind attack goes for Sanity; guarding holds the mind steadiest.
// Floors: fight, fight, rest, fight (an elite through the side door, or skip by shortcut),
// fight, rest, boss in two phases. The old last stage of each dungeon stays as the ending.
// The Outskirts Ruins keep their exploration stages and are not listed here.
// ============================================================================

const it = (nameVi, nameEn, tellVi, tellEn, kind, dmg, mind = 0, extra = {}) => ({ nameVi, nameEn, tellVi, tellEn, kind, dmg, mind, ...extra });
const foe = (nameVi, nameEn, introVi, introEn, guard, intents, extra = {}) => ({ nameVi, nameEn, introVi, introEn, guard, intents, ...extra });

export const INTENT_KINDS = {
  heavy: { vi: 'Đòn nặng', en: 'Heavy blow' },
  quick: { vi: 'Đòn nhanh', en: 'Quick attack' },
  sweep: { vi: 'Đòn quét', en: 'Sweep' },
  mind: { vi: 'Tấn công tâm trí', en: 'Mind attack' },
  grab: { vi: 'Túm giữ', en: 'Grab' }
};

export const REST_TEXT = {
  nameVi: 'Một khoảng lặng', nameEn: 'A lull',
  descVi: 'Không có gì lao tới trong một lúc. Đây là chỗ duy nhất bạn có thể dừng lại, băng vết thương, hoặc quay về với những gì đã gom được.',
  descEn: 'Nothing comes at you for a while. This is the only place you can stop, dress your wounds, or turn back with what you have gathered.',
  judgmentVi: 'Kẻ tiếp theo chưa bước vào. Không có lối ra, chỉ có một hơi thở.',
  judgmentEn: 'The next one has not stepped in yet. There is no way out, only one breath.'
};

export const GAUNTLETS = {
  dungeon_warp_train: {
    locked: {
      vi: 'Cửa toa trước đã khóa lại sau lưng bạn, và cửa toa sau chưa mở. Chuyến tàu không dừng ở ga nào cho đến khi nó muốn. Đây là khoảng lặng giữa hai toa: băng vết thương, hoặc đi tiếp.',
      en: 'The door of the car behind has locked, and the door of the next has not opened. The train stops at no station until it chooses to. This is the lull between two carriages: dress your wounds, or go on.'
    },
    intents: {
      lunge: it('Vồ tới', 'Lunge', 'Khối thịt co lại như lò xo, sắp bật thẳng vào bạn.', 'The flesh coils like a spring, about to snap straight at you.', 'quick', 9),
      crush: it('Đè nát', 'Crush', 'Hàng chục cánh tay nhập lại thành một, giơ cao chạm trần toa.', 'Dozens of arms merge into one and rise to the carriage ceiling.', 'heavy', 14),
      spread: it('Quét ngang toa', 'Carriage sweep', 'Những cánh tay dài dang ra, phủ kín bề ngang toa tàu.', 'Long arms spread out until they fill the width of the car.', 'sweep', 11),
      whisper: it('Hai nghìn năm', 'Two thousand years', 'Mọi khuôn mặt cùng mở miệng, chuẩn bị kể bạn nghe họ đã chờ bao lâu.', 'Every face opens its mouth at once, about to tell you how long they have waited.', 'mind', 3, 10),
      clutch: it('Níu lại', 'Hold on', 'Những ngón tay mọc dài về phía cổ chân bạn, chậm mà chắc.', 'Fingers grow long toward your ankles, slow and sure.', 'grab', 12)
    },
    floors: [
      { kind: 'fight', tier: 1, enemies: [
        foe('Khối thịt ở khoang đệm', 'The mass in the airlock', 'Cửa khoang đệm mở ra. Thứ đầu tiên chào bạn từng là ba hành khách ngồi cạnh nhau.', 'The airlock opens. The first thing to greet you was once three passengers sitting side by side.', 3, ['lunge', 'crush', 'lunge', 'spread']),
        foe('Người soát vé hai nghìn năm', 'The two-thousand-year conductor', 'Một người soát vé vẫn đứng ở cửa toa, chiếc kìm bấm vé đã mọc vào bàn tay.', 'A conductor still stands at the car door, the ticket punch grown into their hand.', 3, ['lunge', 'clutch', 'crush'])
      ] },
      { kind: 'fight', tier: 2, enemies: [
        foe('Dãy ghế biết thở', 'The breathing row of seats', 'Cả dãy ghế phập phồng. Những người ngồi trên đó đã thành một phần của chúng.', 'The whole row of seats rises and falls. Those sitting on them have become part of them.', 3, ['spread', 'whisper', 'lunge', 'crush'])
      ] },
      { kind: 'rest' },
      { kind: 'fight', tier: 3, enemies: [
        foe('Nhân viên dọn tàu đã hóa', 'The cleaner who turned', 'Một nhân viên dọn tàu W Corp quay lại nhìn bạn. Mặt nạ khí vẫn trên mặt, nhưng phía sau nó đã không còn khuôn mặt.', 'A W Corp cleaner turns to look at you. The rebreather is still on, but behind it there is no face left.', 4, ['lunge', 'crush', 'clutch', 'lunge'])
      ] },
      { kind: 'fight', tier: 3, enemies: [
        foe('Bức tường hành khách', 'The wall of passengers', 'Lối đi bị chặn bởi một bức tường người, tay đan vào tay. Họ không muốn bạn đi qua. Họ muốn bạn ở lại.', 'The aisle is blocked by a wall of people, hands woven into hands. They do not want you to pass. They want you to stay.', 4, ['spread', 'clutch', 'whisper', 'crush'])
      ] },
      { kind: 'rest' },
      { kind: 'boss', tier: 4, enemies: [
        foe('Quái Thai Hợp Thể toa hạng nhất', 'The First-Class Amalgam', 'Toa hạng nhất đã thành một pháo đài thịt. Một tài phiệt Feather và đám vệ sĩ dính vào nhau, cầm vũ khí Workshop lởm chởm.', 'The first-class car has become a fortress of flesh. A Feather magnate and his guards, fused, hold jagged Workshop steel.', 6, ['crush', 'lunge', 'spread', 'crush'],
          { phase2: ['whisper', 'clutch', 'crush', 'lunge'], phaseVi: 'Sinh vật gầm lên và xé toạc những vệ sĩ của chính nó, dồn cả trọng lượng vào một thân.', phaseEn: 'The creature roars and tears its own guards apart, pouring all its weight into one body.' })
      ] }
    ],
    elite: foe('Thứ dưới núi hành lý', 'What lies under the luggage', 'Đống va li rung lên. Thứ bên dưới đã ăn hết những gì hành khách mang theo, và vẫn còn đói.', 'The pile of suitcases trembles. What lies beneath has eaten everything the passengers carried, and is still hungry.', 4, ['clutch', 'crush', 'clutch', 'spread'])
  },

  dungeon_lobotomy_ruin: {
    intents: {
      claw: it('Cào', 'Rake', 'Nó hạ thấp người, những móng dài cọ vào sàn.', 'It drops low, long claws scraping the floor.', 'quick', 9),
      slam: it('Nện xuống', 'Slam', 'Một khối kim loại và thịt giơ lên cao, sẵn sàng đập xuống.', 'A mass of metal and flesh rises high, ready to come down.', 'heavy', 14),
      burst: it('Bùng Enkephalin', 'Enkephalin burst', 'Dịch xanh lục trong người nó sáng rực, sắp phun ra khắp phòng.', 'The green fluid inside it glows bright, about to spray the room.', 'sweep', 11),
      hymn: it('Khúc hát ru', 'The lullaby', 'Một giai điệu lệch tông bắt đầu, và bạn thấy mình muốn ngồi xuống.', 'An off-key melody begins, and you find yourself wanting to sit down.', 'mind', 2, 11),
      root: it('Rễ kim loại', 'Metal roots', 'Những sợi rễ thép bò dọc sàn về phía chân bạn.', 'Steel roots creep across the floor toward your feet.', 'grab', 12)
    },
    floors: [
      { kind: 'fight', tier: 1, enemies: [
        foe('Nhân viên mất trí', 'The panicked clerk', 'Một nhân viên trong áo blouse lao ra từ phòng nghỉ, cầm cây gậy khống chế, mắt nhìn qua bạn như không thấy.', 'A clerk in a lab coat bursts from the break room holding a suppression baton, eyes looking through you.', 3, ['claw', 'slam', 'claw']),
        foe('Dawn of Amber', 'Dawn of Amber', 'Những con giun màu hổ phách trồi lên từ khe sàn, đúng như bản ghi về một Ordeal buổi sáng.', 'Amber worms rise from cracks in the floor, exactly as the records describe a morning Ordeal.', 3, ['root', 'claw', 'burst'])
      ] },
      { kind: 'fight', tier: 2, enemies: [
        foe('Kén Abnormality cấp TETH', 'A TETH-class cocoon', 'Một chiếc kén nứt ra trong bể chứa. Thứ bên trong chưa thành hình, nhưng đã biết bạn ở đâu.', 'A cocoon splits in its tank. What is inside has not yet taken shape, but already knows where you are.', 3, ['burst', 'hymn', 'claw', 'slam'])
      ] },
      { kind: 'rest' },
      { kind: 'fight', tier: 3, enemies: [
        foe('Noon of Green', 'Noon of Green', 'Những cỗ máy xanh lục bước đều từ hành lang, như được lập trình để nghi ngờ mọi thứ còn sống.', 'Green machines march in step from the corridor, as if programmed to doubt everything alive.', 4, ['slam', 'claw', 'slam', 'burst'])
      ] },
      { kind: 'fight', tier: 3, enemies: [
        foe('Đội trưởng đội khống chế cũ', 'The old suppression captain', 'Người đội trưởng vẫn mặc bộ E.G.O mượn của một Abnormality. Thứ ấy giờ mặc ngược lại người.', 'The captain still wears E.G.O borrowed from an Abnormality. Now it wears the captain.', 4, ['claw', 'root', 'hymn', 'slam'])
      ] },
      { kind: 'rest' },
      { kind: 'boss', tier: 4, enemies: [
        foe('Abnormality ALEPH vừa thoát', 'The escaped ALEPH', 'Cánh cửa thép cấp ALEPH bị xé ra từ bên trong. Giữa căn phòng đầy rễ kim loại, một Abnormality đã thức dậy đang ngân khúc hát ru lệch tông.', 'The ALEPH-class steel door was torn open from within. In a room full of metal roots, an awakened Abnormality hums an off-key lullaby.', 6, ['hymn', 'root', 'slam', 'burst'],
          { phase2: ['hymn', 'slam', 'hymn', 'root'], phaseVi: 'Khúc hát đổi tông. Mọi đèn khẩn cấp trong chi nhánh cùng tắt.', phaseEn: 'The lullaby changes key. Every emergency lamp in the branch goes out at once.' })
      ] }
    ],
    elite: foe('Hồ sơ màu đỏ', 'The red file', 'Ai đó đã đọc tập hồ sơ màu đỏ. Thứ được ghi trong đó đang đứng trong phòng lưu trữ, ướt sũng.', 'Someone read the red file. What it describes is standing in the records room, dripping wet.', 4, ['hymn', 'root', 'claw', 'slam'])
  },

  dungeon_bloodfiend_carnival: {
    intents: {
      fang: it('Cắn', 'Bite', 'Nó nhe nanh và lao tới cổ bạn, nhanh hơn mắt kịp thấy.', 'It bares its fangs and darts at your throat, faster than the eye can follow.', 'quick', 10),
      maul: it('Vung búa', 'Maul', 'Chiếc búa đầu gai được nhấc lên quá đầu, cả người nó nghiêng ra sau.', 'The spiked maul is lifted overhead, its whole body leaning back.', 'heavy', 14),
      whip: it('Roi máu', 'Blood whip', 'Máu trên sàn cuộn lại thành một sợi roi dài, quất một vòng rộng.', 'The blood on the floor coils into a long whip and swings in a wide arc.', 'sweep', 11),
      waltz: it('Lời mời khiêu vũ', 'An invitation to dance', 'Nó cúi chào thật sâu, và bản nhạc trong đầu bạn bắt đầu to dần.', 'It bows deeply, and the music in your head begins to swell.', 'mind', 2, 10),
      embrace: it('Cái ôm', 'The embrace', 'Nó dang tay, chậm rãi, như đón một người quen lâu ngày.', 'It opens its arms, slowly, as if welcoming an old friend.', 'grab', 13)
    },
    floors: [
      { kind: 'fight', tier: 1, enemies: [
        foe('Búp bê khâu da', 'The stitched puppet', 'Một con rối khâu bằng da người cúi chào bạn ở cổng, rồi rút từ sau lưng ra một con dao cắt bánh.', 'A puppet stitched from human skin bows to you at the gate, then draws a cake knife from behind its back.', 3, ['fang', 'whip', 'fang']),
        foe('Người hầu Huyết Tộc', 'The Bloodfiend servant', 'Một người hầu mặc đồng phục đỏ đón bạn với khay rượu. Rượu không phải rượu.', 'A servant in red livery greets you with a tray of wine. The wine is not wine.', 3, ['fang', 'embrace', 'maul'])
      ] },
      { kind: 'fight', tier: 2, enemies: [
        foe('Bóng trong mê cung gương', 'The reflection in the mirror maze', 'Một trong những bóng phản chiếu bước ra khỏi gương. Nó có khuôn mặt của bạn, và nụ cười của người khác.', 'One of the reflections steps out of the mirror. It has your face, and someone else’s smile.', 3, ['waltz', 'fang', 'whip', 'fang'])
      ] },
      { kind: 'rest' },
      { kind: 'fight', tier: 3, enemies: [
        foe('Hiệp sĩ Huyết Tộc', 'The Bloodfiend knight', 'Một hiệp sĩ trong bộ giáp gỉ cưỡi một con ngựa gỗ của vòng quay, cây thương nhỏ máu.', 'A knight in rusted armor rides a carousel horse, lance dripping blood.', 4, ['maul', 'fang', 'maul', 'whip'])
      ] },
      { kind: 'fight', tier: 3, enemies: [
        foe('Đoàn diễn viên đói', 'The hungry troupe', 'Cả đoàn xiếc đứng thành hàng trên sân khấu, chờ khán giả duy nhất vào đúng chỗ.', 'The whole troupe stands in a line on the stage, waiting for its one audience member to take their place.', 4, ['whip', 'embrace', 'waltz', 'maul'])
      ] },
      { kind: 'rest' },
      { kind: 'boss', tier: 4, enemies: [
        foe('Trưởng trại Huyết Tộc cổ', 'The ancient Bloodfiend host', 'Dưới mái bạt rạp xiếc, một Bloodfiend cổ khoác áo nhung rách ngồi bên bàn tiệc, chờ bạn. Đôi mắt đỏ của nó đói thứ hơi ấm chỉ người sống mới có.', 'Under the big top an ancient Bloodfiend in tattered velvet sits at a banquet, waiting for you. Its red eyes hunger for a warmth only the living have.', 6, ['waltz', 'maul', 'fang', 'embrace'],
          { phase2: ['embrace', 'whip', 'maul', 'fang'], phaseVi: 'Nó đứng dậy khỏi bàn tiệc. Máu trong mọi chén rượu bay lên và chảy vào người nó.', phaseEn: 'It rises from the banquet. The blood in every goblet lifts and flows into its body.' })
      ] }
    ],
    elite: foe('Người quản trò', 'The ringmaster', 'Người quản trò chặn cửa hậu trường, cây roi trong tay. Hắn không thích khách đi vào chỗ không có vé.', 'The ringmaster blocks the backstage door, whip in hand. They dislike guests going where there are no tickets.', 4, ['whip', 'fang', 'whip', 'maul'])
  },

  dungeon_great_lake: {
    intents: {
      hook: it('Móc sắt', 'Iron hook', 'Nó vung chiếc móc gỉ trong một đường ngắn, sát boong tàu.', 'It swings the rusted hook in a short arc, low across the deck.', 'quick', 10),
      oar: it('Mái chèo gãy', 'Broken oar', 'Mái chèo gãy được giơ lên bằng cả hai tay, nặng đến mức nó lảo đảo.', 'The broken oar is raised in both hands, so heavy it staggers.', 'heavy', 13),
      wave: it('Sóng tràn boong', 'Wave over the deck', 'Mặt nước bên mạn tàu dựng lên, sắp tràn qua cả boong.', 'The water beside the hull rises, about to sweep across the whole deck.', 'sweep', 11),
      song: it('Bài hát trong sương', 'The song in the fog', 'Một giọng hát vang lên từ sương. Bạn nhận ra đó là giọng của người đã chết.', 'A voice sings from the fog. You recognize it as the voice of someone dead.', 'mind', 2, 11),
      drag: it('Kéo xuống nước', 'Drag under', 'Những bàn tay phủ sáp trắng bám lên mạn tàu, tìm cổ chân người đứng gần nhất.', 'Hands coated in white wax grip the rail, feeling for the nearest ankle.', 'grab', 12)
    },
    floors: [
      { kind: 'fight', tier: 1, enemies: [
        foe('Người Cá Pallid lạc đàn', 'A stray Pallid fishman', 'Một Người Cá phủ sáp trắng trèo lên mũi tàu, chiếc móc sắt vẫn còn mắc ở tay.', 'A wax-coated fishman climbs onto the bow, an iron hook still caught in its hand.', 3, ['hook', 'drag', 'hook']),
        foe('Thủy thủ chết đuối', 'The drowned sailor', 'Một thủy thủ cũ của U Corp đứng dậy từ dưới đáy xuồng cứu sinh, nước chảy ra từ miệng.', 'An old U Corp sailor rises from the bottom of a lifeboat, water pouring from their mouth.', 3, ['oar', 'hook', 'wave'])
      ] },
      { kind: 'fight', tier: 2, enemies: [
        foe('Đàn Người Cá trên boong', 'The fishmen on deck', 'Hàng chục Người Cá vọt lên boong cùng lúc. Chúng từng là Fixer và thủy thủ lành nghề.', 'Dozens of fishmen leap onto the deck at once. They were once skilled Fixers and sailors.', 3, ['wave', 'hook', 'drag', 'oar'])
      ] },
      { kind: 'rest' },
      { kind: 'fight', tier: 3, enemies: [
        foe('Kẻ hát trong sương', 'The singer in the fog', 'Giọng hát có hình người. Nó đứng trên mặt nước như đứng trên sàn nhà.', 'The singing voice has a human shape. It stands on the water as if on a floor.', 4, ['song', 'hook', 'song', 'wave'])
      ] },
      { kind: 'fight', tier: 3, enemies: [
        foe('Thuyền trưởng con tàu ma', 'The ghost ship captain', 'Thuyền trưởng con tàu kia bước sang boong bạn. Bộ đồng phục giống hệt của thuyền trưởng bạn.', 'The other ship’s captain steps onto your deck. The uniform is identical to your own captain’s.', 4, ['oar', 'drag', 'hook', 'oar'])
      ] },
      { kind: 'rest' },
      { kind: 'boss', tier: 4, enemies: [
        foe('Pallid Whale', 'The Pallid Whale', 'Mặt nước dựng lên như một bức tường. Con Pallid Whale to bằng cả một khu phố trồi lên, há họng thành một xoáy nước.', 'The water stands up like a wall. The Pallid Whale, as large as a city block, surfaces and opens its maw into a whirlpool.', 6, ['wave', 'oar', 'song', 'drag'],
          { phase2: ['wave', 'wave', 'drag', 'song'], phaseVi: 'Con cá voi lặn xuống rồi trồi lên ngay dưới thân tàu. Cả con tàu nghiêng hẳn sang một bên.', phaseEn: 'The whale dives, then surfaces right under the hull. The whole ship lists hard to one side.' })
      ] }
    ],
    elite: foe('Thứ trong hầm tàu đắm', 'What waits in the wreck', 'Trong hầm con tàu đắm, những thùng mỡ cá voi bắt đầu lăn về phía bạn. Có thứ gì đó đang đẩy chúng.', 'In the wreck’s hold, the casks of whale oil start rolling toward you. Something is pushing them.', 4, ['drag', 'oar', 'drag', 'wave'])
  },

  dungeon_backstreets_night: {
    intents: {
      hookjab: it('Móc nhanh', 'Quick hook', 'Cái móc rút về sau một nhịp ngắn, sắp đâm thẳng.', 'The hook draws back for a short beat, about to stab straight.', 'quick', 10),
      hookfall: it('Móc bổ xuống', 'Falling hook', 'Bộ vest giơ cái móc lên cao quá đầu, cả người đổ về phía trước.', 'The suit raises its hook high overhead, its whole body tipping forward.', 'heavy', 15),
      flood: it('Tràn ra', 'Spill out', 'Bộ vest mở cổ áo. Chất lỏng bên trong sắp tràn ra khắp mặt đường.', 'The suit opens its collar. The liquid inside is about to spill across the road.', 'sweep', 12),
      hum: it('Tiếng hát ru', 'The humming', 'Cả nhóm cùng hát nhỏ một giai điệu. Bạn chợt nhớ giờ này đáng lẽ bạn đang ngủ.', 'The whole group hums a tune together. You suddenly recall you should be asleep at this hour.', 'mind', 2, 11),
      reel: it('Kéo về', 'Reel in', 'Sợi dây sau cái móc căng ra. Nó không cần đâm trúng, chỉ cần móc được.', 'The line behind the hook pulls taut. It does not need to stab, only to catch.', 'grab', 14)
    },
    floors: [
      { kind: 'fight', tier: 1, enemies: [
        foe('Một bộ vest đen', 'A single black suit', 'Bộ vest đầu tiên đứng dậy từ mặt đường, vuốt lại nếp áo, rồi quay đầu về phía bạn.', 'The first suit rises from the road, smooths its lapels, then turns its head toward you.', 3, ['hookjab', 'reel', 'hookjab'])
      ] },
      { kind: 'fight', tier: 2, enemies: [
        foe('Nhóm Sweeper đi dạo', 'Sweepers out for a stroll', 'Ba bộ vest đi cạnh nhau như một gia đình đi dạo, và gọi nhau bằng những từ bạn không hiểu.', 'Three suits walk side by side like a family out for a stroll, calling to each other in words you do not understand.', 3, ['flood', 'hookjab', 'hum', 'reel']),
        foe('Sweeper hai móc', 'The two-hooked Sweeper', 'Một bộ vest cầm hai cái móc, mỗi tay một cái, dây quấn quanh cổ tay.', 'A suit holds two hooks, one in each hand, lines wound around its wrists.', 3, ['hookjab', 'hookjab', 'hookfall', 'reel'])
      ] },
      { kind: 'rest' },
      { kind: 'fight', tier: 3, enemies: [
        foe('Đợt quét thứ hai', 'The second sweep', 'Đợt thứ hai đông hơn. Chúng không vội. Chúng biết bạn chỉ còn hơn một tiếng để chạy.', 'The second wave is larger. They are in no hurry. They know you have only a little over an hour to run.', 4, ['flood', 'hookfall', 'reel', 'hum'])
      ] },
      { kind: 'fight', tier: 3, enemies: [
        foe('Gia đình Sweeper', 'A Sweeper family', 'Một gia đình Sweeper chặn đầu hẻm: những bộ vest lớn đứng sau, bộ nhỏ nhất đứng trước, cầm cái móc như cầm đồ chơi.', 'A Sweeper family blocks the alley: large suits behind, the smallest in front, holding its hook like a toy.', 4, ['hum', 'hookjab', 'hookfall', 'flood'])
      ] },
      { kind: 'rest' },
      { kind: 'boss', tier: 4, enemies: [
        foe('Kẻ cao nhất', 'The tallest one', 'Đợt cuối đi chậm. Ở giữa có một bộ vest cao hơn hẳn, và những kẻ còn lại nhường đường cho nó như con cháu nhường đường cho người lớn tuổi.', 'The last wave walks slowly. In its midst is a suit far taller than the rest, and the others make way for it as children do for an elder.', 6, ['hookfall', 'reel', 'hum', 'flood'],
          { phase2: ['hum', 'reel', 'hookfall', 'hum'], phaseVi: 'Kẻ cao nhất cởi bộ vest. Thứ chảy ra không rơi xuống đất mà đứng thẳng lên, cao hơn trước.', phaseEn: 'The tallest one opens its suit. What pours out does not fall but stands upright, taller than before.' }),
        foe('Chiếc xe đẩy của Mother', 'Mother’s pushcart', 'Đợt cuối đi chậm quanh một chiếc xe đẩy phủ khăn trắng. Cả đoàn hát nhỏ, như hát ru.', 'The last wave walks slowly around a pushcart under a white cloth. The procession hums softly, like a lullaby.', 6, ['hum', 'flood', 'reel', 'hookfall'],
          { phase2: ['hum', 'hum', 'reel', 'flood'], phaseVi: 'Tấm khăn trắng trên xe đẩy lay động. Cả đoàn ngừng hát cùng một lúc.', phaseEn: 'The white cloth on the cart stirs. The whole procession stops humming at once.' })
      ] }
    ],
    elite: foe('Kẻ đứng trong quán rượu', 'The one in the tavern', 'Một bộ vest đã vào quán rượu trước bạn. Quán không phải là nhà, và nó biết điều đó.', 'A suit entered the tavern before you did. A tavern is not a home, and it knows it.', 4, ['reel', 'hookjab', 'flood', 'reel'])
  }
};

// ---------------------------------------------------------------------------
// The Head's judgment, for a life that reached full Taboo Gaze. Lore: B Corp's Beholders of the
// Eye watch the City; C Corp's Executioners of the Claw act on it, with three serums (K heals,
// R hits blunt, W closes distance in a single cut, all three together a Tri-serum Cocktail);
// an Arbiter of the Head (Zena) fights with Line, Thick Line, Thin Line, Birdcage, which locks
// one of the target's moves, and Shockwave. No retreat, no reward; surviving it is the reward.
// ---------------------------------------------------------------------------
GAUNTLETS.dungeon_claw_judgment = {
  intents: {
    gaze: it('Ánh nhìn của Eye', 'The Eye’s gaze', 'Beholder không cử động. Bạn cảm thấy mình đang bị đọc, từng dòng một.', 'The Beholder does not move. You feel yourself being read, line by line.', 'mind', 3, 15),
    mark: it('Đánh dấu', 'Marked', 'Beholder giơ một ngón tay về phía chân bạn. Nơi nó chỉ sẽ là nơi bạn không bước tới được.', 'The Beholder raises a finger toward your feet. Where it points is where you will not be able to step.', 'grab', 14, 0, { seal: 'evade' }),
    report: it('Bản báo cáo', 'The report', 'Beholder mở lời. Những gì nó nói về bạn đúng đến mức khiến tay bạn run.', 'The Beholder speaks. What it says about you is so accurate your hands shake.', 'heavy', 15, 6),
    serumW: it('Serum W', 'Serum W', 'Bộ bơm W rít lên. Khoảng cách giữa hai người sắp không còn nữa.', 'The W pump hisses. The distance between you is about to stop existing.', 'quick', 17),
    serumR: it('Serum R', 'Serum R', 'Ống R vỡ niêm. Bàn tay thép của Claw giơ lên, nặng như cả một bức tường.', 'The R vial breaks its seal. The Claw’s steel hand rises, heavy as a whole wall.', 'heavy', 21),
    serumK: it('Serum K', 'Serum K', 'Ống K sáng lên. Nếu không ai ngăn, mọi vết thương bạn gây ra sẽ khép lại.', 'The K vial glows. If no one stops it, every wound you have dealt will close.', 'heal', 0, 0, { heal: 2 }),
    cocktail: it('Tri-serum Cocktail', 'Tri-serum Cocktail', 'Cả ba ống cùng bơm một lúc. Claw biến mất, và căn phòng bắt đầu bị cắt từ mọi phía.', 'All three vials pump at once. The Claw vanishes, and the room begins to be cut from every side.', 'sweep', 19),
    line: it('Line', 'Line', 'Arbiter vạch một đường thẳng trong không khí bằng đầu ngón tay. Nó sẽ đi xuyên qua bất cứ thứ gì nằm trên đó.', 'The Arbiter draws a straight line in the air with a fingertip. It will pass through whatever lies on it.', 'quick', 17),
    thickLine: it('Thick Line', 'Thick Line', 'Đường vạch lần này dày như một cột nhà, chĩa thẳng vào ngực bạn.', 'This line is as thick as a pillar, aimed straight at your chest.', 'heavy', 23),
    thinLine: it('Thin Line', 'Thin Line', 'Hàng chục đường mảnh như tơ giăng ngang căn phòng, chậm rãi khép lại.', 'Dozens of lines thin as silk stretch across the room, slowly closing.', 'sweep', 18),
    birdcage: it('Birdcage', 'Birdcage', 'Những đường mảnh uốn cong quanh bạn thành một chiếc lồng. Nó không cần giết bạn, chỉ cần giữ bạn lại.', 'Fine lines curve around you into a cage. It does not need to kill you, only to hold you.', 'grab', 17, 0, { seal: 'strike' }),
    shockwave: it('Shockwave', 'Shockwave', 'Arbiter mở bàn tay. Không khí trong phòng dồn lại về một điểm, sắp bung ra.', 'The Arbiter opens a hand. The air in the room gathers to a single point, about to burst.', 'sweep', 20, 9)
  },
  floors: [
    { kind: 'fight', tier: 4, enemies: [
      foe('Beholder of the Eye', 'Beholder of the Eye', 'Mọi tiếng động trong phòng ngừng lại. Một Beholder của B Corp đứng ở góc phòng, nơi bạn chắc chắn không có ai một giây trước. Nó chỉ nhìn.', 'Every sound in the room stops. A B Corp Beholder stands in the corner where you are sure no one stood a second ago. It only watches.', 4, ['gaze', 'mark', 'report', 'gaze'])
    ] },
    { kind: 'rest' },
    { kind: 'fight', tier: 5, enemies: [
      foe('Executioner of the Claw', 'Executioner of the Claw', 'Một đường xanh mảnh chia đôi bức tường. Claw bước qua, áo choàng đen, mũ sắt gỉ, ba ống huyết thanh trên găng tay còn nguyên. Hắn đọc tên bạn, rồi xóa nó khỏi màn hình.', 'A thin blue line divides the wall. A Claw steps through in a black coat and a rusted helmet, three serum vials intact on the gauntlet. He reads your name, then erases it from the display.', 5, ['serumW', 'serumR', 'serumK', 'cocktail', 'serumW'])
    ] },
    { kind: 'rest' },
    { kind: 'boss', tier: 5, enemies: [
      foe('Arbiter of the Head', 'Arbiter of the Head', 'Claw lùi sang một bên. Người bước vào sau hắn không mang vũ khí. Arbiter nói rất nhiều, như thể việc này đã xong và chỉ còn phần giải thích.', 'The Claw steps aside. Whoever enters after him carries no weapon. The Arbiter talks a great deal, as if this were already over and only the explanation remained.', 8, ['line', 'thinLine', 'birdcage', 'thickLine', 'line'],
        { phase2: ['shockwave', 'birdcage', 'thickLine', 'shockwave', 'line'], phaseVi: 'Arbiter thôi nói. Lần đầu tiên, người ấy nhìn bạn như nhìn một đối thủ.', phaseEn: 'The Arbiter stops talking. For the first time, they look at you as at an opponent.' })
    ] }
  ]
};
INTENT_KINDS.heal = { vi: 'Hồi phục', en: 'Recovery' };
