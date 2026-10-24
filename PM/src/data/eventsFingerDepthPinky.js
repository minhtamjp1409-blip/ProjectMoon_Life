// The Pinky, second set of missions: oaths made and unmade, the sword yards, and what a Star of the Sky or a
// Sovereign owes the ones who swore to them.

import { fe, fc, fg } from './fingerKit.js';

const P = 'Pinky';
const mission = (id, rank, vi, en, choices, weight = 9) => ({ ...fe(id, P, rank, vi, en, choices, { weight }), mission: true });

export const PINKY_DEPTH = [
  mission('pinky_wooden_sword_morning', [0, 1],
    '[Buổi sáng với kiếm gỗ] Một Sworn Blade đưa bạn một thanh kiếm gỗ và bảo bạn đứng vào sân lúc mặt trời chưa mọc. Họ không dạy gì. Họ chỉ đứng đối diện, và mỗi lần bạn cử động, họ lùi lại một bước.',
    '[A morning with a wooden sword] A Sworn Blade hands you a wooden sword and tells you to stand in the yard before sunrise. They teach nothing. They only stand opposite, and each time you move they step back once.',
    [
      fc('Đứng yên cho đến khi mặt trời mọc', 'Stand still until the sun rises',
        'Khi ánh sáng đầu tiên chạm sân, Sworn Blade gật đầu và quay đi. Bạn không biết đã học gì, nhưng chân bạn không còn run.', 'When first light touches the yard the Sworn Blade nods and turns away. You do not know what you learned, but your legs no longer shake.', { sanity: 4, rep: 3, health: 2 }),
      fc('Tiến lên một bước và xem họ phản ứng', 'Step forward once and see how they react',
        'Sworn Blade không lùi. Họ nhìn xuống chân bạn rồi nhìn lên mặt bạn, và chạm đầu kiếm gỗ vào vai bạn nhẹ như một cánh hoa. "Thế là đủ cho hôm nay."', 'The Sworn Blade does not step back. They look at your feet, then your face, and touch the tip of their wooden sword to your shoulder light as a petal. “That is enough for today.”', { rep: 5, sanity: 2 }, { meritAdd: 3 }),
      fc('Đặt kiếm xuống và hỏi họ muốn gì', 'Lay the sword down and ask what they want',
        'Sworn Blade im lặng một lúc lâu. "Không ai hỏi trước đây." Họ ngồi xuống cạnh bạn và kể cho bạn nghe vì sao họ cầm thanh kiếm đầu tiên.', 'The Sworn Blade is silent a long time. “No one has asked before.” They sit down beside you and tell you why they took up their first sword.', { sanity: 6, network: 6, rep: 2 })
    ], 8),

  mission('pinky_the_mended_sword', [0, 1],
    '[Thanh kiếm đã được nối] Một thợ rèn nhờ bạn mang một thanh kiếm đã gãy được hàn lại đến chủ của nó. Thanh kiếm sáng hơn trước, nhưng chủ của nó đã thề không bao giờ cầm một lưỡi hàn.',
    '[The mended sword] A smith asks you to carry a broken sword, now welded, back to its owner. The blade is brighter than before, but its owner swore never to hold a welded edge.',
    [
      fc('Đưa thanh kiếm và nói đúng sự thật', 'Hand it over and say plainly what happened',
        'Người chủ nhìn mối hàn rất lâu rồi cất thanh kiếm vào vỏ mà không rút ra. "Một lời thề cũng có thể được hàn." Họ không nói thêm, và bạn không hỏi.', 'The owner looks at the weld a long while then sheathes the sword without drawing it. “An oath too can be mended.” They say nothing more, and you do not ask.', { rep: 5, sanity: 3, network: 3 }),
      fc('Nói thanh kiếm được thợ rèn làm lại hoàn toàn', 'Say the smith remade the sword entirely',
        'Người chủ nhận nó với vẻ nhẹ nhõm đáng ngờ. Hai tháng sau bạn nghe họ gọi nó bằng một cái tên mới, và không ai ở Pinky nhắc chuyện ấy.', 'The owner accepts it with a suspicious relief. Two months later you hear them calling it by a new name, and no one at the Pinky speaks of it.', { sanity: -4, rep: 2, network: 2 }),
      fc('Trả lại cho thợ rèn và nói lời thề không thể hàn', 'Return it to the smith and say an oath cannot be welded',
        'Thợ rèn nhìn bạn và cười khô. "Cậu đúng." Ông nấu lại cả thanh kiếm. Người chủ nhận một thanh kiếm hoàn toàn mới và không bao giờ biết bạn đã làm gì.', 'The smith looks at you and gives a dry laugh. “You are right.” He melts the whole blade. The owner receives a wholly new sword and never knows what you did.', { rep: 4, wealth: -6, sanity: 4 }, { meritAdd: 3 })
    ], 8),

  mission('pinky_the_oath_in_the_rain', [1, 2],
    '[Lời thề dưới mưa] Một Sworn Blade phải trả một lời thề dưới trời mưa như trút, ở một nơi không có chỗ nấp. Người nhận lời thề là một đứa trẻ, và nó sẽ không hiểu vì sao người lớn lại đứng ngoài mưa.',
    '[An oath in the rain] A Sworn Blade must pay an oath in pouring rain at a place with no shelter. The one receiving the oath is a child, who will not understand why adults stand in the rain.',
    [
      fc('Che ô cho đứa trẻ và đọc lời thề thật nhỏ', 'Hold an umbrella over the child and read the oath softly',
        'Đứa trẻ ngước nhìn bạn rồi nhìn cây ô. Khi lời thề được đọc xong, nó chạm vào tay kiếm của Sworn Blade và hỏi: "Có đau không?" Không ai trả lời.', 'The child looks up at you then at the umbrella. When the oath is read it touches the Sworn Blade’s sword hand and asks: “Does it hurt?” No one answers.', { sanity: 5, rep: 5, network: 4 }),
      fc('Đứng ngoài mưa cùng Sworn Blade, ướt đến xương', 'Stand in the rain beside the Sworn Blade, soaked through',
        'Đứa trẻ nhìn hai người đứng ướt sũng và bật cười. Lời thề được trả trong tiếng cười, và Sworn Blade không nói gì vì sợ phá điều ấy.', 'The child watches the two soaked adults and bursts into laughter. The oath is paid amid the laughing, and the Sworn Blade says nothing for fear of breaking it.', { health: -4, sanity: 6, rep: 5 }, { meritAdd: 4 }),
      fg('Dời lễ đến khi tạnh', 'Postpone the rite until it clears', [
        [50, 'Mưa tạnh sau một giờ, và lễ diễn ra dưới trời xanh. Sworn Blade cảm ơn bạn, nhưng bạn thấy họ nhìn bầu trời như nhìn một nơi họ đã mất.', 'The rain clears after an hour and the rite is held under blue sky. The Sworn Blade thanks you, but you see them looking at the sky like a place they have lost.', { rep: 4, sanity: 3 }],
        [50, 'Mưa không tạnh, và đứa trẻ bị gọi về. Lời thề không được trả, và Pinky ghi một món nợ nữa vào sổ.', 'The rain does not stop, and the child is called home. The oath is not paid, and the Pinky enters another debt in the book.', { rep: -4, sanity: -4 }]
      ])
    ]),

  mission('pinky_the_wrong_scabbard', [1, 2],
    '[Vỏ kiếm sai] Bạn phát hiện thanh kiếm của một Sworn Blade đã mất nằm trong vỏ của người khác. Một trong hai là kẻ cắp, và cả hai đều thề họ không biết gì. Pinky không có luật xử việc này.',
    '[The wrong scabbard] You find a dead Sworn Blade’s sword resting in another’s scabbard. One of the two is a thief, and both swear they know nothing. The Pinky has no law for this.',
    [
      fc('Để hai người rút kiếm và xem thanh nào vừa vỏ', 'Have both draw and see which fits the scabbard',
        'Chỉ một thanh vừa. Người cầm thanh kia đỏ mặt và thừa nhận đã đổi vì tưởng chẳng ai nhận ra. Bạn không phạt họ, nhưng nhớ cái nhìn ấy.', 'Only one fits. The one holding the other flushes and admits to swapping, thinking no one would notice. You do not punish them, but remember that look.', { rep: 6, network: 4, sanity: -2 }),
      fc('Báo một Star of the Sky để họ quyết', 'Report to a Star of the Sky and let them decide',
        'Star of the Sky nghe hai bên rồi bảo cả hai cùng giữ thanh kiếm một năm, mỗi người sáu tháng. Cả hai đều ghét quyết định ấy, và cả hai đều tuân theo.', 'The Star of the Sky hears both and tells them to keep the sword a year, six months each. Both hate the decision, and both obey.', { rep: 5, network: 6 }),
      fc('Mang thanh kiếm đến mộ của chủ cũ và hỏi', 'Carry the sword to the dead owner’s grave and ask',
        'Bạn đứng trước mộ rất lâu và không có tiếng trả lời nào. Nhưng khi bạn quay lại, một trong hai người đã nhận hết lỗi mà không ai ép.', 'You stand before the grave a long time and no answer comes. But when you return one of the two has taken all the blame, with no one forcing it.', { sanity: -3, rep: 7, network: 3 }, { meritAdd: 4 })
    ], 9),

  mission('pinky_a_gift_of_a_sword', [1, 2],
    '[Món quà là một thanh kiếm] Một Star of the Sky tặng bạn thanh kiếm của chính họ trước mặt cả sân, và không giải thích. Có ít nhất bốn người ở đó nghĩ họ xứng đáng nhận hơn bạn, và ánh mắt họ nặng.',
    '[A gift of a sword] A Star of the Sky gives you their own sword before the whole yard and explains nothing. At least four people present believe they deserve it more than you, and their looks are heavy.',
    [
      fc('Nhận bằng cả hai tay và cúi đầu thật sâu', 'Accept with both hands and bow deep',
        'Cả sân im lặng. Thanh kiếm nặng hơn bạn nghĩ. Bốn người kia nhìn bạn, và rồi một người trong họ cúi đầu, rất nhẹ, như một lời chào.', 'The whole yard goes silent. The sword is heavier than you thought. The four look at you, and then one of them bows, very slightly, as a greeting.', { rep: 8, network: 6, sanity: -3 }),
      fc('Từ chối và nói người khác xứng hơn', 'Decline and say another deserves it more',
        'Star of the Sky mỉm cười buồn. "Ngươi là người thứ tư từ chối." Họ cất thanh kiếm và không hỏi nữa. Bốn người kia nhìn bạn mà không hiểu.', 'The Star of the Sky smiles sadly. “You are the fourth to refuse.” They put the sword away and ask no more. The four look at you without understanding.', { rep: 3, sanity: 4, network: -3 }),
      fg('Nhận và đề nghị một trận để chứng minh bạn xứng', 'Accept and offer a bout to prove you are worthy', [
        [55, 'Bốn người lần lượt đứng ra và lần lượt thua trong năm phút. Họ không giận. Họ cúi đầu, và một người trong họ nói: "Bây giờ thì tôi hiểu."', 'The four step forward in turn and lose within five minutes each. They are not angry. They bow, and one says: “Now I understand.”', { rep: 12, network: 8, health: -6 }],
        [45, 'Người thứ hai đánh bạn ngã. Star of the Sky đứng dậy và nhận lại thanh kiếm mà không nói gì. Cả sân hiểu đó là một lời phán quyết.', 'The second knocks you down. The Star of the Sky rises and takes the sword back without a word. The whole yard understands that is a judgment.', { rep: -8, health: -10, sanity: -5 }]
      ])
    ], 10),

  mission('pinky_the_ghost_duelist', [2, 3],
    '[Kiếm khách ma] Một kiếm khách đã chết mười năm được nhiều người thấy xuất hiện ở sân đấu cũ, đứng một mình, tay đặt trên chuôi kiếm. Họ không tấn công. Họ chỉ chờ một người đứng đối diện.',
    '[The ghost duelist] A duelist dead ten years is seen by many at the old yard, standing alone, hand on the hilt. They do not attack. They only wait for someone to stand opposite.',
    [
      fc('Đứng đối diện và cúi đầu', 'Stand opposite and bow',
        'Bóng người cúi đầu lại. Hai người đứng như thế đến khi mặt trời lên, và khi ánh sáng chạm sân, bóng người không còn ở đó. Chuôi kiếm đặt lại chỗ cũ.', 'The figure bows in return. The two stand thus until sunrise, and when light touches the yard the figure is gone. The sword rests again in its place.', { sanity: -6, rep: 7, resonance: 8 }, { meritAdd: 5 }),
      fc('Rút kiếm và đấu', 'Draw and duel',
        'Cuộc đấu kéo dài đến lúc kiệt sức. Bóng người không tấn công nhưng mỗi nhát của bạn đều bị chặn bằng đúng cách bạn sắp dùng. Bạn thua và vẫn sống.', 'The duel lasts until exhaustion. The figure does not attack but each stroke of yours is blocked in exactly the way you were about to use. You lose and live.', { health: -12, sanity: -8, rep: 4, resonance: 6 }),
      fc('Hỏi một người già trong Pinky về kiếm khách ấy', 'Ask an old Pinky member about the duelist',
        'Người già ngồi lặng, rồi kể: kiếm khách ấy thua một trận trước mặt cả sân và chưa bao giờ được tha thứ. Bạn mang lời ấy ra sân, và nói to.', 'The old member sits silent, then tells: that duelist lost one bout before the whole yard and was never forgiven. You carry those words to the yard and say them aloud.', { sanity: 5, rep: 8, network: 5 })
    ], 9),

  mission('pinky_the_ledger_of_oaths', [2, 3],
    '[Sổ các lời thề] Pinky giữ một cuốn sổ ghi tất cả những lời thề chưa trả. Có hai trăm lời, và một nửa nằm đó từ trước khi bạn sinh ra. Bạn được giao chọn mười lời để trả trong năm nay.',
    '[The ledger of oaths] The Pinky keeps a book of every unpaid oath. There are two hundred, and half have lain there since before you were born. You are told to choose ten to pay this year.',
    [
      fc('Chọn mười lời cũ nhất', 'Choose the ten oldest',
        'Mười lời ấy dẫn bạn đến những nơi không còn tồn tại và những người đã chết. Bạn trả chúng với một thanh kiếm không có đối thủ, và vẫn thấy mỗi lời có sức nặng.', 'Those ten lead you to places that no longer exist and people long dead. You pay them with a sword and no opponent, and still feel each has weight.', { sanity: -6, rep: 8, network: 3 }),
      fc('Chọn mười lời dễ trả nhất', 'Choose the ten easiest',
        'Bạn trả cả mười trong ba tháng. Pinky ghi nhận bạn nhanh và gọn. Có người hỏi vì sao không chọn những lời khó, và bạn không có câu trả lời tốt.', 'You pay all ten in three months. The Pinky records you as quick and tidy. Someone asks why you did not choose the hard ones, and you have no good answer.', { rep: 5, wealth: 12, sanity: 3 }),
      fg('Để một đứa trẻ bốc thăm mười lời', 'Let a child draw ten oaths at random', [
        [55, 'Mười lời bốc được rất khác nhau, và trả xong cả mười, bạn nhận ra cuốn sổ không phải sổ nợ mà là sổ những người từng tin vào điều gì đó.', 'The ten drawn are very different, and when you pay all ten you realize the book is not a ledger of debts but of those who once believed in something.', { rep: 10, sanity: 8, network: 6 }],
        [45, 'Một trong mười lời là của một người bạn quen. Bạn trả nó với một thanh kiếm run, và Pinky không chấp nhận cách bạn trả.', 'One of the ten belongs to someone you knew. You pay it with a shaking sword, and the Pinky does not accept how you paid.', { rep: -5, sanity: -8 }]
      ])
    ], 10),

  mission('pinky_the_student_who_won', [2, 3],
    '[Học trò thắng] Một học trò bạn từng dạy thắng bạn trong một trận tập, trước cả sân, bằng một thế kiếm bạn không dạy. Họ đứng thở dốc và nhìn bạn, không biết nên vui hay sợ.',
    '[The student who won] A student you once taught beats you in a practice bout, before the whole yard, with a form you did not teach. They stand panting and look at you, not knowing whether to be glad or afraid.',
    [
      fc('Cúi đầu trước họ', 'Bow to them',
        'Cả sân im lặng. Người học trò bật khóc, và Star of the Sky mỉm cười từ xa. Bạn bước ra khỏi sân với một vết bầm và một cảm giác nhẹ lạ lùng.', 'The whole yard falls silent. The student breaks into tears, and a Star of the Sky smiles from afar. You walk out of the yard with a bruise and an odd lightness.', { rep: 8, sanity: 6, network: 8 }),
      fc('Đòi một trận nữa ngay lập tức', 'Demand another bout at once',
        'Trận thứ hai kéo dài lâu hơn, và bạn thắng sát nút. Không ai vỗ tay. Người học trò cúi đầu, và bạn hiểu họ nhường một nhịp cuối.', 'The second bout lasts longer, and you win by a hair. No one applauds. The student bows, and you understand they yielded a last beat.', { rep: 3, sanity: -5, health: -5 }),
      fc('Hỏi thế kiếm ấy do ai dạy', 'Ask who taught that form',
        'Họ nói tự nghĩ ra, trong những đêm không ngủ được. Bạn nhìn thế kiếm ấy lần nữa, và nhận ra nó có một lỗi đẹp mà không ai dạy được.', 'They say they devised it themselves in sleepless nights. You look at the form again and realize it has a beautiful flaw that no one could teach.', { sanity: 3, rep: 6, network: 6 }, { meritAdd: 4 })
    ], 8),

  mission('pinky_a_star_goes_dark', [3, 3],
    '[Một Star tắt] Một Star of the Sky mà bạn kính trọng mất khả năng cầm kiếm sau một vết thương cũ. Họ không nói gì, nhưng mỗi sáng họ vẫn ra sân, đặt tay lên chuôi kiếm không rút, và đứng đó đến khi nắng lên.',
    '[A Star goes dark] A Star of the Sky you respect loses the ability to hold a sword after an old wound. They say nothing, but each morning they still come to the yard, lay a hand on an undrawn hilt, and stand until the sun is up.',
    [
      fc('Ra sân mỗi sáng và đứng cạnh họ', 'Come to the yard each morning and stand beside them',
        'Không ai nói gì suốt nhiều tháng. Rồi một sáng họ nói: "Cảm ơn." Và hôm sau họ không ra nữa. Bạn vẫn ra, và đứng thêm một mình.', 'No one speaks for months. Then one morning they say: “Thank you.” And the next day they do not come. You still come and stand a while alone.', { sanity: -4, rep: 8, network: 8 }),
      fc('Mời họ nhận học trò mới', 'Invite them to take new students',
        'Họ từ chối ba lần, rồi nhận một đứa trẻ. Đứa trẻ ấy học cách cầm kiếm từ một người không còn cầm được. Bạn không biết đó là sự cứu rỗi hay là một vết thương mới.', 'They refuse three times, then accept a child. That child learns how to hold a sword from one who can no longer hold one. You do not know whether it is rescue or a new wound.', { rep: 6, sanity: 4, network: 6 }, { meritAdd: 4 }),
      fc('Để họ yên và giữ chỗ họ đứng trống', 'Leave them be and keep their spot empty',
        'Bạn bảo mọi người tránh chỗ ấy. Họ đứng suốt hai năm ở đó, đến khi họ mất. Sau này người ta gọi chỗ ấy bằng tên họ, và bạn là người đặt ra.', 'You tell everyone to avoid that place. They stand there two years until they die. Later people call the spot by their name, and you are the one who named it.', { sanity: 3, rep: 9 })
    ], 10),

  mission('pinky_the_last_oath_of_a_sovereign', [3, 3],
    '[Lời thề cuối của một Sovereign] Sovereign tiền nhiệm để lại một lời thề chưa được trả, và nó chỉ có thể được trả bởi người đang ngồi ở ghế Sovereign. Bạn đứng trước một bia mộ trống và một lời hứa không có tên người nhận.',
    '[A Sovereign’s last oath] The former Sovereign left an oath unpaid, and only the one seated as Sovereign can pay it. You stand before an empty grave and a promise with no name of the recipient.',
    [
      fc('Trả lời thề trước bia mộ trống', 'Pay the oath before the empty grave',
        'Bạn đọc lời thề và rút kiếm một nhát vào không khí. Không có tiếng đáp. Nhưng sáng hôm sau trên bia mộ có một bông hoa trắng mà không ai đặt.', 'You read the oath and draw one stroke through the air. No sound answers. But the next morning a white flower lies on the grave that no one placed.', { sanity: -4, rep: 12, resonance: 8 }, { meritAdd: 6 }),
      fc('Tìm người nhận lời thề trước khi trả', 'Find the recipient of the oath before paying',
        'Bạn tìm suốt một mùa. Cuối cùng bạn tìm thấy: một bà lão ở thị trấn nhỏ, người chưa từng biết tên Sovereign. Bạn trả lời thề bằng cách ngồi uống trà với bà ấy.', 'You search a whole season. At last you find: an old woman in a small town who never knew the Sovereign’s name. You pay the oath by sitting with her over tea.', { sanity: 8, rep: 10, network: 8 }),
      fg('Đọc lời thề công khai và để Pinky tự hiểu', 'Read the oath publicly and let the Pinky understand', [
        [55, 'Cả sân đứng nghe, và không ai dám thở. Khi lời thề kết thúc, một người đứng dậy và nói đó là mẹ của họ. Bạn chưa bao giờ biết bà từng thề với ai.', 'The whole yard stands to hear and no one dares breathe. When the oath ends someone rises and says that was their mother. You never knew she had sworn to anyone.', { rep: 14, network: 10, sanity: 4 }],
        [45, 'Lời thề bị hiểu theo ba cách. Cả sân tranh luận đến khuya, và bạn nhận ra mình đã mở một cánh cửa không đóng lại được.', 'The oath is understood three ways. The whole yard argues into the night, and you realize you have opened a door that will not close.', { rep: -4, network: -4, sanity: -6 }]
      ])
    ], 11),

  mission('pinky_the_rival_house', [3, 3],
    '[Nhà đối thủ] Một dòng kiếm khác, đối địch với Pinky nhiều thế hệ, gửi bạn một lá thư mời đến sân của họ. Họ không đòi đấu. Họ muốn một Sovereign ngồi xem họ luyện kiếm một ngày và nói điều họ thấy.',
    '[The rival house] Another sword lineage, rivals of the Pinky for generations, sends you an invitation to their yard. They ask for no bout. They want a Sovereign to sit and watch them train for a day and say what they see.',
    [
      fc('Đến một mình và ngồi xem cả ngày', 'Go alone and watch all day',
        'Họ luyện kiếm như thể bạn không có mặt. Cuối ngày, bạn nói một điều duy nhất họ cần nghe. Họ cúi đầu rất sâu, và hai dòng kiếm giữ im lặng suốt mùa ấy.', 'They train as though you were not there. At day’s end you say the one thing they needed to hear. They bow very deep, and the two lineages keep a truce all that season.', { rep: 12, network: 10, sanity: -3 }, { meritAdd: 6 }),
      fc('Đến cùng một Star of the Sky để làm chứng', 'Go with a Star of the Sky as witness',
        'Hai người cùng nhìn và nói hai điều khác nhau. Dòng kiếm kia nhận cả hai và xin thêm một ngày. Pinky ghi lại đó là lần đầu hai nhà ngồi cùng sân.', 'The two watch and say two different things. The other lineage takes both and asks for another day. The Pinky records it as the first time the two houses shared a yard.', { rep: 9, network: 12 }),
      fc('Từ chối, nói Sovereign không xem ai luyện', 'Decline, saying a Sovereign watches no one train',
        'Lá thư được gửi trả với một lời nhắn lịch sự. Một năm sau dòng kiếm ấy đánh bại ba Sworn Blade của Pinky trong cùng một ngày, và bạn nghĩ về lá thư ấy.', 'The letter is returned with a polite note. A year later that lineage beats three Pinky Sworn Blades in a single day, and you think of that letter.', { rep: -4, sanity: -5, network: -4 })
    ], 9)
];
