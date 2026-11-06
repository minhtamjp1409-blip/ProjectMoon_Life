// The words for the dungeon signatures (engine/dungeonSignature.js).
// Adaptations, labelled where the player meets them: the six Lake Laws (U Corp's Great Lake has laws in canon;
// these particular ones are written for this game), the blood market stalls, and which kind of work each
// Abnormality answers to. The four work types themselves (Instinct, Insight, Attachment, Repression) are L Corp's own.

// Each law: an omen whose tell carries a hint a careful reader can follow, and the one answer it asks for
export const DUNGEON_LAWS = [
  {
    id: 'violet_fog', answer: 'guard', nameVi: 'Luật 3', nameEn: 'Law 3',
    ruleVi: 'khi sương tím nổi lên, không quay đầu nhìn đuôi thuyền.', ruleEn: 'when violet fog rises, do not turn to look at the stern.',
    omenNameVi: 'Sương tím', omenNameEn: 'Violet fog',
    tellVi: 'Sương tím trườn lên boong. Ngay sau lưng bạn có tiếng ai đó gọi bạn quay lại nhìn, bằng đúng giọng của người bạn tin.',
    tellEn: 'Violet fog crawls over the deck. Right behind you someone asks you to turn and look, in the voice of a person you trust.',
    rightVi: 'Bạn đứng yên, mắt nhìn thẳng về mũi thuyền. Giọng nói nhỏ dần rồi tắt hẳn cùng với sương.', rightEn: 'You stand still, eyes on the bow. The voice fades and dies with the fog.',
    wrongVi: 'Bạn vừa nhúc nhích thì sương ập vào mặt, lạnh như nước đá, và có thứ gì đó cào dọc lưng bạn.', wrongEn: 'The moment you move, the fog slams into your face, cold as ice water, and something rakes down your back.'
  },
  {
    id: 'drowned_bell', answer: 'guard', nameVi: 'Luật 7', nameEn: 'Law 7',
    ruleVi: 'khi chuông nhà thờ vang dưới đáy nước, không ai được ra tay trước.', ruleEn: 'when a church bell rings beneath the water, no one strikes first.',
    omenNameVi: 'Chuông dưới đáy', omenNameEn: 'The drowned bell',
    tellVi: 'Một hồi chuông vọng lên từ dưới đáy hồ. Thủy thủ già bên cạnh bạn từ từ hạ tay khỏi chuôi lao và nhìn bạn, chờ.',
    tellEn: 'A bell tolls from the bottom of the lake. The old sailor beside you slowly takes his hand off his harpoon and looks at you, waiting.',
    rightVi: 'Bạn giữ tay yên trên lan can. Chuông ngừng, và mặt nước phẳng lại như chưa có gì.', rightEn: 'You keep your hands still on the rail. The bell stops, and the water flattens as if nothing happened.',
    wrongVi: 'Bạn vừa giơ vũ khí thì cả mặt hồ dựng lên đáp lời, đập thẳng vào mạn thuyền.', wrongEn: 'You raise your weapon, and the whole lake rises to answer, slamming into the hull.'
  },
  {
    id: 'tallow_water', answer: 'evade', nameVi: 'Luật 12', nameEn: 'Law 12',
    ruleVi: 'khi nước đổi màu sáp trắng, rời khỏi lan can.', ruleEn: 'when the water turns the white of tallow, leave the rail.',
    omenNameVi: 'Nước màu sáp', omenNameEn: 'Tallow water',
    tellVi: 'Nước quanh thuyền đục dần thành màu sáp trắng. Lan can dưới tay bạn bắt đầu dính, như thể muốn giữ bạn lại.',
    tellEn: 'The water around the boat clouds into the white of tallow. The rail under your hands turns sticky, as if it wants to hold you.',
    rightVi: 'Bạn giật tay khỏi lan can và lùi vào giữa boong. Chỗ bạn vừa đứng phủ đầy sáp.', rightEn: 'You tear your hands off the rail and back into the middle of the deck. Where you stood is coated in wax.',
    wrongVi: 'Lan can giữ chặt tay bạn. Sáp leo lên tới khuỷu trước khi bạn giằng ra được.', wrongEn: 'The rail holds your hands fast. The wax climbs to your elbows before you wrench free.'
  },
  {
    id: 'name_below', answer: 'strike', nameVi: 'Luật 19', nameEn: 'Law 19',
    ruleVi: 'khi có tiếng gọi tên bạn từ dưới nước, cắt ngay sợi dây đang buộc bạn vào thuyền.', ruleEn: 'when your name is called from under the water, cut the rope that ties you to the boat at once.',
    omenNameVi: 'Tiếng gọi tên', omenNameEn: 'Your name from below',
    tellVi: 'Từ dưới nước có tiếng gọi đúng tên bạn. Sợi dây an toàn buộc ở thắt lưng bạn bỗng căng ra, kéo về phía mạn thuyền.',
    tellEn: 'From under the water a voice calls your name. The safety line at your waist suddenly goes taut, pulling toward the side.',
    rightVi: 'Bạn chém đứt sợi dây. Đầu dây bên kia trượt xuống nước, và tiếng gọi im bặt.', rightEn: 'You cut the line. Its far end slides into the water, and the voice goes silent.',
    wrongVi: 'Sợi dây giật bạn ngã sấp xuống boong và lôi bạn trượt dài về phía mạn.', wrongEn: 'The line yanks you flat on the deck and drags you a long way toward the side.'
  },
  {
    id: 'ring_of_fish', answer: 'evade', nameVi: 'Luật 26', nameEn: 'Law 26',
    ruleVi: 'khi cá chết nổi lên thành vòng, đưa thuyền ra trước khi vòng khép.', ruleEn: 'when dead fish surface in a ring, move the boat out before it closes.',
    omenNameVi: 'Vòng cá chết', omenNameEn: 'The ring of dead fish',
    tellVi: 'Cá chết nổi lên thành một vòng tròn hoàn hảo, và thuyền của bạn trôi đúng vào giữa. Vòng tròn đang khép lại.',
    tellEn: 'Dead fish surface in a perfect ring, and your boat drifts into its middle. The ring is closing.',
    rightVi: 'Bạn kéo bánh lái, cho thuyền lách qua khe hở cuối cùng. Vòng cá khép lại sau đuôi tàu.', rightEn: 'You turn the rudder and slip through the last gap. The ring closes behind the stern.',
    wrongVi: 'Vòng tròn khép lại quanh bạn. Nước bên trong sôi lên và bỏng rát như axit.', wrongEn: 'The ring closes around you. The water inside boils and burns like acid.'
  },
  {
    id: 'stray_shadow', answer: 'strike', nameVi: 'Luật 41', nameEn: 'Law 41',
    ruleVi: 'khi bóng của bạn không đi theo bạn, chém vào cái bóng.', ruleEn: 'when your shadow does not follow you, cut the shadow.',
    omenNameVi: 'Cái bóng lạc', omenNameEn: 'The stray shadow',
    tellVi: 'Bạn bước một bước, nhưng cái bóng dưới chân vẫn đứng nguyên chỗ cũ, và nó đang quay mặt về phía bạn.',
    tellEn: 'You take a step, but the shadow under you stays where it was, and it is turning to face you.',
    rightVi: 'Lưỡi của bạn cắt ngang cái bóng. Nó dính trở lại gót chân bạn như chưa từng rời đi.', rightEn: 'Your blade cuts across the shadow. It sticks back to your heels as if it had never left.',
    wrongVi: 'Cái bóng đứng dậy trước khi bạn kịp làm gì, và nó đánh trước.', wrongEn: 'The shadow stands up before you can do anything, and it strikes first.'
  }
];

// L Corp's four work types; which one an Abnormality answers to is set per Abnormality in the engine
export const WORK_TYPES = [
  { id: 'instinct', labelVi: 'Instinct: cho ăn, dọn chỗ ở', labelEn: 'Instinct: feed it, clean its cell', rightVi: 'Nó ăn xong và nằm im.', rightEn: 'It eats and lies still.', wrongVi: 'Nó hất đổ khay thức ăn vào mặt bạn.', wrongEn: 'It throws the tray into your face.' },
  { id: 'insight', labelVi: 'Insight: dọn dẹp, sắp xếp lại phòng', labelEn: 'Insight: tidy and rearrange the room', rightVi: 'Nó quan sát bạn làm việc rồi thôi chú ý tới bạn.', rightEn: 'It watches you work, then loses interest in you.', wrongVi: 'Nó đập vỡ mọi thứ bạn vừa xếp.', wrongEn: 'It smashes everything you just put in order.' },
  { id: 'attachment', labelVi: 'Attachment: nói chuyện, ở cạnh nó', labelEn: 'Attachment: talk to it, stay near it', rightVi: 'Nó nghiêng đầu nghe bạn nói, và lùi về góc phòng.', rightEn: 'It tilts its head to listen, and backs into the corner.', wrongVi: 'Giọng của bạn làm nó nổi giận.', wrongEn: 'Your voice enrages it.' },
  { id: 'repression', labelVi: 'Repression: đàn áp, ép nó vào khuôn phép', labelEn: 'Repression: suppress it, force it into line', rightVi: 'Nó chịu thua và co lại.', rightEn: 'It gives in and shrinks back.', wrongVi: 'Nó vùng lên mạnh hơn bạn tưởng.', wrongEn: 'It fights back harder than you thought.' }
];

export const SIGNATURE_TEXT = {
  meter: {
    oil: { labelVi: 'Dầu đèn', labelEn: 'Lamp oil', noteVi: 'Mỗi chặng đốt 1 dầu, chặng có kiểm định đốt 2. Làm một việc khi dầu không đủ thì kiểm định khó hơn; hết dầu thì đường ra phải trả bằng máu.', noteEn: 'Every stage burns 1 oil, a checked one 2. Doing it with too little oil makes the check harder; with none left, the way out costs blood.', darkVi: 'Đèn đã tắt. Kiểm định khó hơn, và quay ra lúc này sẽ mất máu.', darkEn: 'The lamp is out. Checks are harder, and turning back now costs blood.' },
    clock: { labelVi: 'Đồng hồ', labelEn: 'The clock', noteVi: 'Mỗi lượt đánh tốn 4 phút, nghỉ băng bó tốn 14. Từ 4:13 đến trước 4:34, đợt quét cuối đánh gấp hơn; sau đó Sweepers rút xuống cống.', noteEn: 'Each fight turn costs 4 minutes, binding wounds costs 14. From 4:13 until 4:34, the last sweep hits harder; then the Sweepers withdraw.', dangerVi: 'Đợt quét cuối đang gấp rút. Đòn đau hơn và áp lực tăng mỗi lượt.', dangerEn: 'The last sweep is pressing hard. Blows hurt more and strain rises each turn.', sweptVi: 'Đã qua 4:34. Sweepers rút xuống cống.', sweptEn: 'Past 4:34. The Sweepers have withdrawn into the drains.' },
    law: { labelVi: 'Sổ Luật Đại Hồ (phóng tác)', labelEn: 'Lake Law book (adaptation)', noteVi: 'Mỗi trận trên Hồ có một điềm báo. Đọc kỹ lời kể; đáp sai thì luật được ghi vào sổ, giữ qua các đời. Sai cùng một luật hai lần thì thứ dưới đáy thức dậy.', noteEn: 'Every fight on the Lake brings one omen. Read the telling closely; a wrong answer writes the law in the book, kept across lives. The same law broken twice wakes what is below.' },
    market: { labelVi: 'Chủ hội chợ để ý (phóng tác)', labelEn: 'The ringmaster’s notice (adaptation)', noteVi: 'Quầy máu ở các khoảng lặng bán lợi thế đổi lấy HP. Mua hai lần, người quản trò sẽ tự tìm tới bạn.', noteEn: 'The blood stalls at the lulls sell an edge for HP. Buy twice and the ringmaster comes looking for you.' },
    passenger: { labelVi: 'Hành khách đi cùng', labelEn: 'Passengers with you', noteVi: 'Mỗi người dẫn theo làm đòn đánh vào bạn đau hơn 10%. Ra được tới cuối, mỗi người là thêm Network và Danh tiếng; bỏ dở thì họ ở lại, và bạn mang theo nỗi đó.', noteEn: 'Each one you lead makes the blows on you land 10% harder. Out at the end, each is more Network and Reputation; give up, and they stay behind, and you carry that.' },
    work: { labelVi: 'Sổ trực Abnormality (phóng tác)', labelEn: 'Abnormality duty log (adaptation)', noteVi: 'Mỗi Abnormality chỉ chịu một loại công việc. Làm đúng thì nó mất thế; làm sai thì tâm trí bạn trả giá. Sổ trực giữ qua các đời.', noteEn: 'Each Abnormality answers to one kind of work. The right one costs it its footing; the wrong one costs your mind. The duty log is kept across lives.' },
    head: { labelVi: 'Người đứng cùng bạn', labelEn: 'Those who stand with you', noneVi: 'Chưa có ai đủ thân', noneEn: 'No one close enough', noteVi: 'The Head không cho thở giữa Claw và Arbiter. Người gắn bó từ 70 có thể đứng cùng bạn một lần; họ có thể không trở về.', noteEn: 'The Head gives no breath between the Claw and the Arbiter. Anyone bonded 70 or more may stand with you once; they may not come back.' }
  },
  oil: {
    low: { vi: 'Ngọn đèn chập chờn. Dầu chỉ còn đủ cho vài chặng nữa.', en: 'The lamp flickers. There is oil for a few more stages.' },
    out: { vi: 'Ngọn đèn tắt. Bóng tối của Outskirts dày tới mức bạn nghe được nó.', en: 'The lamp goes out. The dark of the Outskirts is thick enough to hear.' },
    darkWayOut: { vi: 'Bạn dò đường ra trong bóng tối bằng hai tay, và để lại máu trên những bậc đá.', en: 'You feel your way out in the dark with both hands, and leave blood on the stone steps.' }
  },
  clock: { pressure: { vi: 'Đã 4:13. Đợt quét cuối thúc nhanh qua hẻm.', en: 'It is 4:13. The last sweep hurries through the alley.' }, swept: { vi: 'Đồng hồ điểm 4:34. Những bộ vest còn lại rút xuống cống.', en: 'The clock strikes 4:34. The remaining suits retreat into the drains.' } },
  law: { woken: { vi: 'Bạn phạm cùng một luật lần thứ hai. Mặt hồ phồng lên, và thứ nằm dưới đáy mở mắt.', en: 'You break the same law a second time. The lake swells, and what lies at the bottom opens its eyes.' } },
  market: {
    wineVi: 'Quầy máu: đổi 10 HP lấy một chén rượu máu (trận tới kẻ thù mất 1 nấc thế thủ)', wineEn: 'Blood stall: trade 10 HP for a cup of blood wine (next fight, the enemy starts a notch of guard down)',
    wineResultVi: 'Người bán rút máu ở cổ tay bạn vào một chiếc chén bạc rồi đưa lại cho bạn một chén khác, đặc và ấm. Tay bạn thôi run.', wineResultEn: 'The vendor draws blood from your wrist into a silver cup and hands you another, thick and warm. Your hands stop shaking.',
    goldVi: 'Quầy máu: đổi 8 HP lấy một túi đồ của quầy (+15 Ahn chiến lợi phẩm)', goldEn: 'Blood stall: trade 8 HP for a pouch from the stall (+15 Ahn of loot)',
    goldResultVi: 'Bạn nhận một túi vải nặng trĩu. Người bán liếm môi khi bạn quay đi.', goldResultEn: 'You take a heavy cloth pouch. The vendor licks their lips as you turn away.',
    noticed: { vi: 'Ở cuối dãy quầy, người quản trò gập sổ lại và nhìn thẳng vào bạn. Ông ta sẽ tự đến tìm bạn.', en: 'At the end of the stalls, the ringmaster closes their ledger and looks straight at you. They will come looking for you.' }
  },
  passenger: {
    takeVi: 'Nghỉ một lúc và dẫn theo một hành khách còn sống (đòn đau hơn 10%)', takeEn: 'Rest a while and lead a surviving passenger along (blows 10% harder)',
    takeResultVi: 'Một hành khách ôm hành lý bước theo dấu chân bạn. Họ không hỏi toa kế tiếp còn xa không.', takeResultEn: 'A passenger carrying their luggage follows your steps. They do not ask how far the next car is.',
    outVi: (n) => `Bạn dẫn ${n} hành khách ra khỏi toa cuối. Họ sẽ kể lại chuyện này, và tên bạn đi theo câu chuyện.`, outEn: (n) => `You lead ${n} passenger${n > 1 ? 's' : ''} out of the last car. They will tell this story, and your name goes with it.`,
    lostVi: (n) => `${n} hành khách bạn dẫn theo không ra được tới cuối. Tiếng bước chân sau lưng bạn dừng lại ở toa trước.`, lostEn: (n) => `The ${n} passenger${n > 1 ? 's' : ''} you led did not make it to the end. The footsteps behind you stopped in an earlier car.`
  },
  work: {
    openVi: 'Làm việc với nó theo quy trình L Corp', openEn: 'Work with it by L Corp procedure',
    backVi: 'Thôi, đáp đòn theo cách thường', backEn: 'Never mind, answer the blow the usual way'
  },
  head: {
    allyHurtVi: (name) => `${name} bước ra trước bạn và đỡ trọn nhát đó. Họ còn sống, nhưng phải được kéo khỏi trận đấu.`,
    allyHurtEn: (name) => `${name} steps in front of you and takes the whole blow. They survive, but must be pulled out of the fight.`,
    allyDiesVi: (name) => `${name} bước ra trước bạn. The Head không phân biệt hai người. Bạn đứng dậy một mình.`,
    allyDiesEn: (name) => `${name} steps in front of you. The Head does not tell the two of you apart. You get up alone.`
  }
};
