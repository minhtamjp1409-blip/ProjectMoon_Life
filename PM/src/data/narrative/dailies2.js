// More daily lines: work, Districts that had none, the old, the young, and the City's texture.
// A daily has no choice and no season, so nothing here names one. Original scenes only:
// they add no Singularity and no named canon character.

import { D, AGE } from '../storyKit.js';

const { GROWN, ANY, TEEN, OLD } = AGE;

const rows = (prefix, age, need, list) =>
  list.map(([id, vi, en, fx = {}]) => D(`d4_${prefix}_${id}`, age, need, vi, en, fx));

export const DAILIES_2 = [
  // ------------------------------------------------------------ Fixer
  ...rows('fixer', GROWN, { jobs: ['Fixer'] }, [
    ['card', 'Tấm thẻ Fixer trong túi áo đã mòn góc, và người soát cổng nhìn nó lâu hơn nhìn mặt bạn. Ông trả lại và chúc bạn một ngày ít việc.', 'The Fixer card in your pocket has worn corners, and the gate guard studies it longer than your face. He hands it back and wishes you a day with few jobs.', { rep: 1 }],
    ['ink', 'Bản Request hôm nay còn ướt mực. Bạn ký vào mà không đọc dòng cuối, rồi cả buổi chiều nghĩ về dòng ấy.', 'Today’s Request is still wet with ink. You sign without reading the last line, then spend the afternoon thinking about it.', { sanity: -1 }],
    ['lounge', 'Ở quán nghỉ sau Office, ai cũng ngồi quay lưng ra cửa, trừ người đến sớm nhất. Hôm nay bạn đến sớm nhất và ngồi hướng ra cửa.', 'In the lounge behind the Office everyone sits with their back to the door, except whoever arrives first. Today you arrive first and face the door.', { sanity: 1 }],
    ['stain', 'Tấm bản đồ khu vực trong Office có một vết nâu ở góc mà mọi Fixer đều biết nguồn gốc và không ai chịu lau.', 'The district map in the Office has a brown stain in one corner that every Fixer knows the origin of and no one will wipe.', { network: 1 }],
    ['wet_shoes', 'Bạn đi cả ngày với đôi giày ướt sau một Request ở cống thoát nước. Tối đó bạn lau chúng bằng chiếc khăn mà bạn vẫn nghĩ là khăn sạch.', 'You walk all day in wet shoes after a Request in the drains. That evening you wipe them with a cloth you have always assumed was clean.', { health: -1 }],
    ['late_pay', 'Thân chủ đến trả nốt tiền công sau ba tháng, không nói lý do và không xin lỗi. Bạn đếm tiền hai lần, rồi lần thứ ba chỉ để xem họ có đứng chờ không.', 'A client comes to pay the rest of the fee after three months, with no reason and no apology. You count the money twice, then a third time only to see if they will wait.', { wealth: 2 }]
  ]),

  // ------------------------------------------------------------ Syndicate
  ...rows('syn', GROWN, { jobs: ['Syndicate'] }, [
    ['standing', 'Buổi họp của nhóm diễn ra khi đứng, vì chiếc ghế cuối cùng đã bị bán từ tuần trước. Không ai nhắc đến chuyện ghế.', 'The group’s meeting is held standing, because the last chair was sold last week. No one mentions the chair.', { network: 1 }],
    ['greeting', 'Bạn chào một người cấp trên đúng quy cách và ông ta đáp lại bằng một cái gật bạn sẽ nhớ cả tuần. Có những ngày cái gật ấy là cả bữa ăn.', 'You greet a superior in the proper way and he answers with a nod you will remember all week. Some days that nod is a whole meal.', { rep: 1 }],
    ['small_notes', 'Tiền công tuần này đến bằng những tờ lẻ, lần nào cũng vậy, để không ai biết tổng số. Bạn xếp chúng theo kích cỡ trước khi đếm.', 'This week’s pay comes in small notes, every time, so no one knows the total. You sort them by size before counting.', { wealth: 1 }],
    ['stranger_chair', 'Một người lạ ngồi vào chiếc ghế bạn quen ngồi ở quán cà phê của nhóm. Bạn đứng nhìn ông ta một lúc rồi chọn ghế khác, và cả buổi sáng không quên chuyện đó.', 'A stranger sits in the chair you always take at the group’s café. You stand looking at him a while, then choose another, and all morning you cannot let it go.', { sanity: -1 }],
    ['tobacco', 'Mùi thuốc lá của cấp trên vương trong hành lang từ trước khi ông đến, như một bản thông báo. Mọi người đứng thẳng lên theo mùi ấy.', 'The superior’s tobacco hangs in the corridor before he arrives, like a notice. Everyone stands straighter in response to the smell.', { sanity: -1 }],
    ['no_orders', 'Hôm nay không có lệnh nào được truyền xuống. Cả nhóm ngồi im, và sự yên lặng khiến ai cũng bồn chồn hơn một ngày bận rộn.', 'No orders are passed down today. The whole group sits still, and the quiet unsettles everyone more than a busy day would.', { sanity: -1 }]
  ]),

  // ------------------------------------------------------------ Wing
  ...rows('wing', GROWN, { jobs: ['Wing Employee'] }, [
    ['coffee', 'Máy cà phê của Wing luôn pha đúng một mức đắng, bất kể bạn bấm nút nào. Bạn đã thôi bấm từ lâu và chỉ cầm cốc.', 'The Wing coffee machine brews exactly one level of bitter whichever button you press. You stopped pressing long ago and simply hold the cup.', { sanity: 1 }],
    ['new_badge', 'Thẻ ra vào được đổi sang mẫu mới và cổng soát nhận ra bạn chậm hơn nửa nhịp. Cả ngày bạn tự hỏi cổng nhận ra thẻ hay nhận ra bạn.', 'Access badges are swapped for a new model and the gate recognises you half a beat slower. All day you wonder whether it recognises the badge or you.', { sanity: -1 }],
    ['canteen', 'Ở căng tin, mỗi phòng ban ngồi một dãy riêng, và bạn là người duy nhất mang khay sang dãy khác. Có người nhìn, rồi cũng có người dịch ghế.', 'In the canteen each department sits in its own row, and you are the only one to carry your tray to another. Some stare, and then someone moves a chair over.', { network: 1 }],
    ['unread_report', 'Báo cáo bạn thức ba đêm để viết được trả lại với một dấu duyệt và không một lời nhận xét. Bạn không chắc có ai đã đọc nó.', 'The report you stayed up three nights to write comes back with an approval stamp and no comment. You are not sure anyone read it.', { sanity: -1, merit: 1 }],
    ['lights', 'Đèn tầng làm việc không bao giờ tắt hẳn, chỉ dịu đi vào ban đêm. Bạn dần quen ngủ mà lúc nào cũng thấy mờ mờ qua mí mắt.', 'The lights on the work floor never fully go off, only dim at night. You gradually get used to sleeping with a faint glow always behind your eyelids.', { health: -1 }],
    ['lift_names', 'Thang máy trong tòa nhà Wing không hiện số tầng mà hiện tên phòng ban. Hôm nay nó hiện một cái tên bạn chưa từng thấy, rồi hiện lại bình thường.', 'The lift in the Wing building shows department names instead of floor numbers. Today it shows a name you have never seen, then returns to normal.', { sanity: -1, resonance: 1 }]
  ]),

  // ------------------------------------------------------------ Workshop
  ...rows('ws', GROWN, { jobs: ['Workshop Craftsman'] }, [
    ['hammer', 'Tiếng búa đầu ngày ở xưởng nghe khác nhau tùy người cầm. Bạn nhận ra nhịp của thợ cả từ cuối phố, và biết hôm nay ông có tâm trạng thế nào.', 'The first hammer of the day sounds different depending on whose hand holds it. You recognise the master smith’s rhythm from the end of the street and know his mood.', { sanity: 1 }],
    ['crack', 'Khuôn đúc cũ có một đường nứt mảnh mà cả xưởng đều biết và không ai nhắc đến, vì nó đã làm ra những món đẹp nhất.', 'The old mould has a hairline crack that the whole workshop knows and no one mentions, because it has produced their finest pieces.', { merit: 1 }],
    ['warm_coal', 'Sáng nào bạn đến, than trong lò vẫn còn ấm dù đã tắt từ tối qua. Có ai trong xưởng ở lại qua đêm, và không ai nhận.', 'Every morning you arrive, the coal in the furnace is still warm though it was put out last night. Someone in the workshop stays after dark, and no one admits it.', { sanity: 1 }],
    ['sharpening', 'Một người hàng xóm mang dao bếp đến nhờ mài và để lại một túi quả khô thay tiền. Bạn mài rất kỹ, như thể con dao ấy thuộc về một Fixer.', 'A neighbour brings a kitchen knife to be sharpened and leaves a bag of dried fruit instead of coin. You sharpen it with great care, as if it belonged to a Fixer.', { network: 1 }],
    ['dust', 'Bụi kim loại bám vào cổ họng bạn cả buổi chiều. Tối đó bạn ho ra một chấm bạc nhỏ và đứng nhìn nó rất lâu.', 'Metal dust clings to your throat all afternoon. That evening you cough up a tiny silver fleck and stand looking at it a long time.', { health: -1 }],
    ['crooked_stamp', 'Dấu ấn của Tres trên món hàng bạn vừa hoàn thành bị đóng lệch một nét. Bạn nhìn nó một lúc, rồi quyết định coi đó là chữ ký của cả xưởng.', 'The Tres stamp on the piece you just finished has been struck one stroke off. You look at it a while, then decide to treat it as the signature of the whole workshop.', { rep: 1 }]
  ]),

  // ------------------------------------------------------------ Distortion
  ...rows('dist', GROWN, { jobs: ['Distortion'] }, [
    ['drain_voice', 'Có tiếng gọi từ dưới cống, đúng giọng một người bạn từng biết. Bạn đứng nghe đến cuối câu, và câu ấy chưa bao giờ có phần kết.', 'A voice calls from the drain, exactly the voice of someone you once knew. You stand listening to the end of the sentence, and it never has an ending.', { resonance: 2 }],
    ['sun_smell', 'Bạn ngửi thấy mùi ấm của ánh nắng trên một bức tường nơi chưa bao giờ có nắng. Mùi ấy đi theo bạn hết con hẻm.', 'You smell the warmth of sunlight on a wall where there has never been any. The smell follows you down the whole alley.', { resonance: 1, health: -1 }],
    ['shop_glass', 'Bạn đi ngang một cửa hàng và tấm kính phản chiếu bạn như chưa từng biến dạng. Bạn dừng lại rất lâu, rồi kính chớp một cái và phản chiếu đúng như hiện tại.', 'You pass a shop and its glass reflects you as if you had never changed. You stop a long while, then the glass flickers and shows you as you are.', { resonance: 1 }],
    ['cat', 'Một con mèo hoang ngồi giữa hẻm và không nhúc nhích khi bạn đi qua. Nó nhìn bạn như nhìn một con vật khác, không phải một con quái vật.', 'A stray cat sits in the middle of the alley and does not move as you pass. It looks at you the way it would look at another animal, not at a monster.', { network: 1 }],
    ['patrol', 'Bạn nghe tiếng giày đều ở đầu phố và rẽ vào ngõ trước khi kịp nghĩ. Phải một lúc bạn mới nhớ ra đó chỉ là một đội Fixer đang đi tuần.', 'You hear boots in step at the head of the street and turn into a side lane before you can think. It takes a while to remember it was only a Fixer team on patrol.', { heat: 1 }],
    ['old_coat', 'Bạn thấy một chiếc áo giống hệt chiếc bạn từng mặc, phơi trên dây ở một khu nhà lạ. Bạn đứng nhìn đến khi nó khô.', 'You see a coat identical to one you once wore, hanging on a line in a strange block of flats. You stand watching until it dries.', { resonance: 1 }]
  ]),

  // ------------------------------------------------------------ Districts with no daily of their own
  ...rows('region', ANY, { regions: ['A'] }, [
    ['own_echo', 'Hành lang ở tòa nhà của bạn không có tiếng chân ai khác, chỉ có tiếng của chính bạn dội lại muộn nửa nhịp. Bạn nhận ra mình đã bước chậm lại để nghe nó.', 'The corridor of your building has no one else’s footsteps, only your own, returning half a beat late. You realise you have slowed down to listen to it.', { sanity: -1 }]
  ]),
  ...rows('region', ANY, { regions: ['B'] }, [
    ['lift_bow', 'Một người lạ cúi chào bạn trong thang máy mà không nói lý do, rồi cúi chào lần nữa ở tầng dưới. Bạn không biết mình vừa được tôn trọng hay vừa được ghi nhận.', 'A stranger bows to you in the lift without a reason, then bows again on the floor below. You cannot tell whether you have been respected or merely recorded.', { sanity: -1 }]
  ]),
  ...rows('region', ANY, { regions: ['C'] }, [
    ['drill_rhythm', 'Tiếng bước chân đều của một đội tuần từ sân tập vọng vào căn hộ mỗi buổi trưa. Đến ngày thứ ba bạn nhận ra mình ăn theo nhịp ấy.', 'The measured tread of a patrol drifts in from the practice ground every noon. By the third day you realise you are eating to its rhythm.', { sanity: -1 }]
  ]),
  ...rows('region', ANY, { regions: ['G'] }, [
    ['dried_wings', 'Một người bán hàng rong ở phố chợ quận G bày những cánh côn trùng khô lên tấm khăn trải, giá theo cân. Không ai dám hỏi chúng từ đâu ra.', 'A peddler in the District 7 market lays dried insect wings on a cloth, priced by weight. No one dares ask where they came from.', {}]
  ]),
  ...rows('region', ANY, { regions: ['F'] }, [
    ['giant_key', 'Tiệm khóa đầu phố treo một chiếc chìa khổng lồ làm biển hiệu, và nó không bao giờ khớp với ổ khóa nào quanh đó. Trẻ con vẫn thử.', 'The locksmith at the head of the street hangs a giant key as a sign, and it never fits any lock nearby. Children try it anyway.', { sanity: 1 }]
  ]),
  ...rows('region', ANY, { regions: ['P'] }, [
    ['stairs', 'Cầu thang trong tòa nhà của bạn có mười hai bậc khi đi xuống và mười ba bậc khi đi lên. Chủ nhà bảo chuyện đó bình thường ở quận P.', 'The stairs in your building have twelve steps going down and thirteen going up. The landlord says that is normal in District 16.', { sanity: -1 }]
  ]),
  ...rows('region', ANY, { regions: ['Q'] }, [
    ['faded_talisman', 'Một lá bùa dán trên cột điện đã bạc màu dưới mưa, nhưng vết mực vẫn đọng thành chữ mỗi khi trời ẩm. Người qua đường đều đi vòng bên trái.', 'A talisman on a lamp post has faded in the rain, but the ink pools back into lettering whenever the air is damp. Passers-by all walk around it on the left.', { resonance: 1 }]
  ]),
  ...rows('region', ANY, { regions: ['V'] }, [
    ['rival_calls', 'Tiếng rao của hai Office đối diện nhau ở quận V chồng lên nhau mỗi sáng, và đến trưa thì giọng bên nào to hơn đã thắng cả ngày.', 'The calls of two rival Offices in District 22 overlap every morning, and by noon whichever voice is louder has won the day.', { network: 1 }]
  ]),
  ...rows('region', ANY, { regions: ['D'] }, [
    ['smell_of_home', 'Ở tầng hầm quận D, mùi gỗ ẩm và mùi dầu cũ pha vào nhau thành thứ mùi người ở đây gọi là mùi nhà. Bạn đã bắt đầu nhớ nó mỗi lần đi xa.', 'In the cellars of District 4, the smell of damp timber and old oil blends into what people there call the smell of home. You have begun to miss it whenever you travel.', { sanity: 1 }],
    ['retold_battle', 'Một cựu binh trong khu kể lại cùng một trận đánh lần thứ ba trong tuần, và lần nào số người sống sót cũng khác đi một ít.', 'A veteran in the block tells the same battle for the third time this week, and each time the number of survivors shifts slightly.', { sanity: -1 }]
  ]),
  ...rows('region', ANY, { regions: ['I'] }, [
    ['stringless', 'Các cửa hàng nhạc cụ trong khu phố nhạc treo những chiếc đàn đã tháo dây. Khách vẫn đến xem, và không ai hỏi vì sao.', 'The instrument shops in the music quarter hang guitars with their strings removed. Customers still come to look, and no one asks why.', { sanity: -1 }],
    ['blind_tapper', 'Một người mù ngồi trước quán trà ở phố nhạc, tay gõ nhẹ lên đầu gối một nhịp mà bạn nhận ra mình đã nghe ở đâu đó rất lâu về trước.', 'A blind man sits before a teahouse in the music quarter, tapping a rhythm on his knee that you realise you have heard somewhere very long ago.', { resonance: 1 }]
  ]),
  ...rows('region', ANY, { regions: ['M'] }, [
    ['stone_glow', 'Trong phòng khám khu M, ánh sáng từ khối đá trăng làm khuôn mặt mọi người trông bớt mệt. Bạn đứng cạnh nó thêm vài phút sau khi đã khám xong.', 'In a District 13 clinic, the glow of the moonstone makes everyone’s faces look less tired. You stand beside it a few minutes after your examination is done.', { sanity: 1 }],
    ['sleep_colours', 'Người bán thuốc ở khu M phân loại thuốc ngủ theo màu của đá trăng đã tạo ra chúng, và không ai giải thích vì sao màu lại quan trọng.', 'The medicine seller in District 13 sorts sleeping draughts by the colour of the moonstone that produced them, and no one explains why the colour matters.', { sanity: 1, wealth: -1 }]
  ]),
  ...rows('region', ANY, { regions: ['X'] }, [
    ['armour_market', 'Các kỹ sư mặc giáp bước qua chợ quận X và mọi người tự dạt ra hai bên, không vì sợ mà vì tiếng kim loại của họ nặng hơn mọi cuộc trò chuyện.', 'Armoured engineers walk through the District 24 market and people step aside, not out of fear but because the sound of their metal outweighs any conversation.', {}],
    ['ore_dust', 'Bụi quặng từ hầm sâu phủ lên cửa sổ nhà bạn mỗi sáng một lớp mỏng màu xám sẫm. Bạn lau nó hằng ngày, và hằng ngày nó quay lại đúng độ dày ấy.', 'Ore dust from the deep shafts coats your window each morning in a thin dark grey layer. You wipe it daily, and daily it returns to exactly the same thickness.', { health: -1 }]
  ]),
  ...rows('region', ANY, { regions: ['Y'] }, [
    ['breath_frost', 'Hơi thở của bạn kết thành sương ngay trong nhà. Bạn quen với việc ngủ trong áo khoác, và đồ vật trong phòng đều phủ một lớp băng mỏng mỗi sáng.', 'Your breath turns to mist even indoors. You are used to sleeping in your coat, and everything in the room wears a thin film of ice each morning.', { health: -1 }],
    ['shared_stove', 'Người ở khu Y chia nhau than theo giờ, và hôm nay đến lượt bạn giữ lò chung. Mọi người đến ngồi quanh nó, và không ai nói nhiều.', 'People in District 25 share coal by the hour, and today it is your turn to tend the common stove. Everyone comes to sit around it, and no one says much.', { sanity: 1, network: 1 }]
  ]),
  ...rows('region', ANY, { regions: ['OUTSKIRTS'] }, [
    ['sand_wind', 'Gió cát thổi qua đoàn người cả buổi chiều. Bạn quấn khăn che mặt, và ai cũng nói chuyện bằng tay.', 'Sand wind blows through the caravan all afternoon. You wrap a cloth over your face, and everyone talks with their hands.', { health: -1 }],
    ['dry_well', 'Đêm nay đoàn dựng trại cạnh một giếng khô. Ai đó thả một viên đá xuống, và cả đoàn đứng nghe đến khi tiếng rơi không còn nữa.', 'Tonight the caravan pitches camp beside a dry well. Someone drops a stone in, and the whole group stands listening until the sound of its fall is gone.', { sanity: -1 }]
  ]),

  // ------------------------------------------------------------ the old
  ...rows('old', OLD, {}, [
    ['knees', 'Đầu gối bạn biết trước cơn mưa nửa ngày. Hôm nay nó báo sai, và bạn thấy hụt hẫng như mất đi một người bạn đáng tin.', 'Your knees know rain half a day ahead. Today they are wrong, and you feel the letdown of losing a reliable friend.', { health: -1 }],
    ['signing', 'Bạn viết tên mình lên một mẫu đơn, và tay run ở chữ cái thứ ba. Người nhân viên chờ, không giục, và bạn biết ơn họ nhiều hơn mức cần thiết.', 'You write your name on a form, and your hand shakes at the third letter. The clerk waits and does not hurry you, and you are more grateful than you need to be.', { sanity: 1 }],
    ['window_seat', 'Một người trẻ nhường bạn chiếc ghế bên cửa sổ trên tàu mà không nói gì. Bạn ngồi xuống và nhìn The City trôi qua như xem lại một cuốn sổ cũ.', 'A young person gives up the window seat on the tram without a word. You sit and watch The City slide past like rereading an old ledger.', { sanity: 2 }],
    ['usual_chair', 'Chiếc ghế ở quán trà gần nhà luôn được để trống cho bạn. Hôm nay có người ngồi, và chủ quán đứng dậy mời họ nhường chỗ mà không nói lý do.', 'The chair at the teahouse near your home is always left empty for you. Today someone is sitting in it, and the owner goes over and asks them to move without explaining.', { rep: 1 }],
    ['short_sleep', 'Giấc ngủ của bạn ngắn lại, và trời sáng sớm hơn bạn nhớ. Bạn ngồi trước cửa sổ nhìn đèn đường tắt từng ngọn.', 'Your sleep is shorter now, and morning comes earlier than you remember. You sit at the window and watch the street lamps go out one by one.', { health: -1 }],
    ['counting_names', 'Bạn đếm trên đầu ngón tay những người còn gọi được tên bạn. Hôm nay bạn đếm hết trong một bàn tay, và không đếm lần nữa.', 'You count on your fingers the people who can still call you by name. Today you finish within one hand, and do not count again.', { sanity: -2 }],
    ['small_hand', 'Một đứa trẻ nắm tay bạn khi qua đường mà không hỏi, rồi buông ra ở bên kia. Cả ngày bàn tay ấy vẫn còn ấm.', 'A child takes your hand to cross the road without asking, then lets go on the far side. All day the hand stays warm.', { sanity: 2 }]
  ]),

  D(
    'd4_old_two_portions',
    OLD,
    { flags: ['Widowed'] },
    'Bạn nấu bữa tối cho hai người theo thói quen và ăn nửa phần. Phần còn lại bạn đậy kín và để đến sáng.',
    'You cook dinner for two out of habit and eat half. The rest you cover and leave until morning.',
    { sanity: -1 }
  ),

  // ------------------------------------------------------------ the City's texture
  ...rows('city', GROWN, {}, [
    ['streetlamp', 'Đèn đường ở góc phố nhấp nháy theo một nhịp bạn đã thuộc. Hôm nay nó bỏ một nhịp, và cả con phố dừng lại nửa giây.', 'The streetlamp at the corner flickers in a rhythm you have learned. Today it skips a beat, and the whole street pauses for half a second.', { sanity: -1 }],
    ['bread_cry', 'Tiếng rao bánh mì rẻ mỗi chiều vẫn y hệt hôm qua, kể cả chỗ người rao ho một cái giữa câu.', 'The cry of the cheap bread seller each evening is the same as yesterday’s, including the cough he gives in the middle of the line.', { sanity: 1 }],
    ['price_up', 'Giá mì ở quầy đầu hẻm tăng thêm một đồng Ahn, và chủ quầy xin lỗi từng khách như thể chính ông làm nó tăng.', 'The price of noodles at the stall at the head of the alley rises by one Ahn, and the owner apologises to each customer as if he caused it himself.', { wealth: -1 }],
    ['curfew_siren', 'Còi báo 3 giờ 10 vang lên, và cả dãy nhà tắt đèn trong một nhịp. Bạn đã thuộc thứ tự từng căn sẽ tắt.', 'The 3:10 siren sounds, and the whole row of buildings goes dark in a single beat. You know the order in which each window will go out.', { sanity: -1 }],
    ['broken_umbrella', 'Chiếc dù hỏng bạn mang che được nửa người. Bạn đi hết quãng đường với một bên vai ướt, và thấy buồn cười hơn là bực.', 'The broken umbrella you carry covers half of you. You walk the whole way with one shoulder soaked, and find it funnier than annoying.', { health: -1, sanity: 1 }],
    ['courier', 'Người đưa tin của khu phố đi qua mỗi sáng và gọi tên từng nhà. Hôm nay ông gọi tên bạn, và không ai trong hẻm quay lại nhìn.', 'The neighbourhood courier walks through each morning calling each household by name. Today he calls yours, and no one in the alley turns to look.', { network: 1 }]
  ]),

  // ------------------------------------------------------------ the young
  ...rows('teen', TEEN, {}, [
    ['borrowed_shoes', 'Đôi giày bạn mang đã qua chân một người lớn hơn nhiều năm. Bạn nhét giấy vào mũi cho vừa và thôi nhìn xuống chân.', 'The shoes you wear have been through an older person’s feet for years. You stuff paper into the toes to fit and stop looking down.', { sanity: -1 }],
    ['desk_letters', 'Trên mặt bàn học cũ có những chữ cái do nhiều thế hệ học trò khắc lên. Bạn tìm thấy một chữ khớp với tên mình, và không dám khắc thêm.', 'The old classroom desk is covered in letters carved by generations of pupils. You find one that matches your name, and do not dare add another.', { sanity: 1 }],
    ['cracked_voice', 'Giọng bạn vỡ vào lúc quan trọng nhất trong buổi học và cả lớp cười. Bạn cười theo, và tối đó tập nói một mình trước gương.', 'Your voice cracks at the most important moment of the lesson and the whole class laughs. You laugh along, and that evening practise speaking alone before a mirror.', { sanity: -1 }],
    ['long_way', 'Bạn chọn đường về dài hơn để khỏi đi ngang nhóm trẻ ở góc phố. Hôm nay con đường dài gặp đúng những người ấy.', 'You choose the longer way home to avoid the group of kids at the corner. Today the longer way meets exactly those people.', { sanity: -1 }],
    ['folded_note', 'Một tờ giấy gấp nhỏ được nhét vào ngăn bàn bạn, không ghi tên. Bạn đọc nó mười lần và vẫn không biết nó dành cho ai.', 'A small folded note is slipped into your desk with no name on it. You read it ten times and still do not know whom it is for.', { sanity: 1 }],
    ['first_coins', 'Lần đầu bạn có vài đồng Ahn là của riêng mình, và bạn mất cả buổi chiều đi quanh các quầy mà không mua gì. Mua xong rồi thì chẳng còn điều gì để mong.', 'For the first time you have a few Ahn that are your own, and you spend the whole afternoon walking past stalls buying nothing. Once bought, there would be nothing left to look forward to.', { wealth: -1, sanity: 1 }]
  ])
];
