// Small scenes about the people in a life, the work done in it, and the very young and the old.
// Every scene that names a person requires that person to be alive (need.npc), so nobody
// appears after they are gone.

import { M, C, O, I, AGE } from './storyKit.js';

const { GROWN, CHILD, KID, OLD } = AGE;

export const LIFE_MINORS_5 = [
  // ------------------------------------------------------------ spouse
  M(
    'm5_spouse_cold_dinner',
    [21, 80],
    { npc: 'spouse' },
    '[Bữa tối đã nguội] {spouse} về muộn, và bữa tối đã nguội từ lâu. Hai người ngồi đối diện nhau, và không ai nhắc đến giờ giấc.',
    '[Dinner Gone Cold] {spouse} comes home late, and dinner went cold long ago. You sit across from each other, and neither of you mentions the hour.',
    [
      C(
        'Hâm lại thức ăn và ngồi ăn cùng',
        'Reheat the food and eat together',
        'Nồi canh hâm hai lần có vị cháy ở đáy, và {spouse} ăn hết mà không phàn nàn. Khi rửa bát, hai người đứng sát nhau hơn mức cần.',
        'The twice-reheated soup tastes scorched at the bottom, and {spouse} finishes it without complaint. Washing up, you stand closer than you need to.',
        { sanity: 3, wealth: -1 },
        { bond: { spouse: 6 } }
      ),
      C(
        'Hỏi thẳng {spouse} đã ở đâu',
        'Ask {spouse} plainly where they have been',
        null,
        null,
        {},
        {
          out: [
            O(55, '{spouse} kể hết, chậm, kèm cả phần khó nghe. Bạn không thích câu trả lời, nhưng bạn biết nó là thật.', '{spouse} tells all of it, slowly, including the hard part. You do not like the answer, but you know it is true.', { sanity: -1 }, { bond: { spouse: 5 } }),
            O(45, '{spouse} đặt đũa xuống và bảo bạn đừng hỏi bằng giọng ấy. Cả hai đều không ăn nốt bữa tối.', '{spouse} sets down the chopsticks and tells you not to ask in that tone. Neither of you finishes dinner.', { sanity: -3 }, { bond: { spouse: -6 } })
          ]
        }
      ),
      C(
        'Đi ngủ và để bữa tối ở đó',
        'Go to bed and leave dinner there',
        'Sáng ra bát đĩa đã được rửa, xếp rất ngay ngắn. Không ai trong hai người nói gì về chuyện đó.',
        'In the morning the dishes are washed and stacked very neatly. Neither of you says anything about it.',
        { sanity: -1 },
        { bond: { spouse: -3 } }
      )
    ],
    I('Bạn nhìn bữa tối một lúc rồi đẩy nó sang một bên. {spouse} làm điều tương tự, cùng lúc.', 'You look at dinner a while and push it aside. {spouse} does the same, at the same moment.'),
    { tags: ['npc'], once: true }
  ),

  M(
    'm5_spouse_unopened_letter',
    [21, 80],
    { npc: 'spouse' },
    '[Lá thư chưa mở] {spouse} để một lá thư từ một Office chưa mở trên bàn đã ba ngày. Bạn nhận ra nét chữ trên phong bì: đó là nét chữ của người bạn chưa bao giờ nghe {spouse} nhắc đến.',
    '[The Unopened Letter] {spouse} has left a letter from an Office unopened on the table for three days. You recognise the handwriting on the envelope as belonging to someone {spouse} has never mentioned.',
    [
      C(
        'Hỏi {spouse} về lá thư',
        'Ask {spouse} about the letter',
        '{spouse} nhìn phong bì một lúc lâu. "Của người tôi từng làm cùng," họ nói, và đó là tất cả. Nhưng tối đó họ mở thư ngay trước mặt bạn.',
        '{spouse} looks at the envelope a long while. "Someone I used to work with," they say, and that is all. But that evening they open it right in front of you.',
        { sanity: 1 },
        { bond: { spouse: 4 } }
      ),
      C(
        'Đưa lá thư cho {spouse} và đi ra ngoài',
        'Hand the letter to {spouse} and step outside',
        'Bạn đứng ngoài hành lang gần mười phút. Khi vào lại, lá thư đã mở, và {spouse} đang nhìn ra cửa sổ.',
        'You stand in the corridor nearly ten minutes. When you go back in the letter is open, and {spouse} is looking out of the window.',
        { sanity: -1 },
        { bond: { spouse: 2 } }
      ),
      C(
        'Tự mở thư khi {spouse} đi vắng',
        'Open it yourself while {spouse} is out',
        'Bên trong chỉ có một dòng chữ và một con số. Bạn đặt lại phong bì đúng chỗ cũ, nhưng cả ngày hôm đó bạn không nhìn thẳng vào mắt {spouse} được.',
        'Inside is one line of writing and a number. You put the envelope back exactly where it was, but all day you cannot look {spouse} straight in the eye.',
        { sanity: -3, resonance: 2 },
        { bond: { spouse: -4 } }
      )
    ],
    I('Bạn để nguyên lá thư. Hôm sau nó vẫn ở đó, và hôm sau nữa, như một người khách chưa được mời ngồi.', 'You leave the letter alone. The next day it is still there, and the day after, like a guest who has not been invited to sit.'),
    { tags: ['npc'], once: true }
  ),

  M(
    'm5_spouse_old_scar',
    [24, 80],
    { npc: 'spouse' },
    '[Vết sẹo nào cũng có chủ] {spouse} đặt tay lên một vết sẹo cũ trên vai bạn và hỏi, lần đầu tiên, nó từ đâu mà có.',
    '[Every Scar Has an Owner] {spouse} lays a hand on an old scar on your shoulder and asks, for the first time, where it came from.',
    [
      C(
        'Kể thật, từ đầu đến cuối',
        'Tell the truth, start to finish',
        'Bạn kể mất gần cả đêm, và {spouse} không ngắt lời một lần nào. Sáng ra bạn thấy nhẹ, như vừa đặt xuống một thứ đã mang quá lâu.',
        'It takes most of the night, and {spouse} does not interrupt once. By morning you feel lighter, as if you have set down something carried too long.',
        { sanity: 4, resonance: -3 },
        { bond: { spouse: 7 } }
      ),
      C(
        'Kể một nửa, bỏ đoạn khó nhất',
        'Tell half of it and skip the worst part',
        '{spouse} gật, và bạn biết họ nhận ra chỗ bị bỏ. Họ không hỏi tiếp, và sự im lặng đó nặng hơn mọi câu hỏi.',
        '{spouse} nods, and you know they have noticed the gap. They do not ask further, and that silence weighs more than any question.',
        { sanity: -1 },
        { bond: { spouse: 1 } }
      ),
      C(
        'Nói đó là chuyện cũ, không đáng kể',
        'Say it is old business, not worth telling',
        '{spouse} rút tay về chậm rãi. Vết sẹo vẫn ở đó, và bạn thấy nó rõ hơn trước.',
        '{spouse} withdraws their hand slowly. The scar is still there, and you see it more clearly than before.',
        { sanity: -2 },
        { bond: { spouse: -3 } }
      )
    ],
    I('Bạn cười cho qua. {spouse} cười lại, nhưng ngón tay họ vẫn chạm vào vết sẹo thêm một lúc.', 'You laugh it off. {spouse} laughs back, but their fingers stay on the scar a little longer.'),
    { tags: ['npc'], once: true }
  ),

  // ------------------------------------------------------------ child
  M(
    'm5_child_first_lie',
    [22, 70],
    { npc: 'child' },
    '[Lời nói dối đầu tiên của {child}] {child} nói dối bạn lần đầu, một lời nhỏ về chiếc cốc bị vỡ. Cả hai đều biết đó là lời nói dối, và {child} biết bạn biết.',
    '[{child}’s First Lie] {child} lies to you for the first time, a small one about a broken cup. Both of you know it is a lie, and {child} knows you know.',
    [
      C(
        'Giả vờ tin',
        'Pretend to believe it',
        '{child} thở ra rất khẽ. Từ đó, mỗi khi nói dối {child} lại nhìn bạn một nhịp, để xem bạn có giả vờ nữa không.',
        '{child} lets out a very small breath. From then on, whenever {child} lies, they glance at you for a beat to see whether you are pretending again.',
        { sanity: 1 },
        { bond: { child: 3 } }
      ),
      C(
        'Hỏi nhẹ nhàng chuyện thật đã xảy ra thế nào',
        'Gently ask what really happened',
        'Câu chuyện thật hóa ra dài hơn cái cốc nhiều. {child} khóc, và bạn ngồi cạnh cho đến khi nó thôi.',
        'The real story turns out to be much longer than the cup. {child} cries, and you sit beside them until it stops.',
        { sanity: -1 },
        { bond: { child: 7 } }
      ),
      C(
        'Phạt {child} vì nói dối',
        'Punish {child} for lying',
        '{child} nhận hình phạt mà không kêu. Sau này đứa trẻ nói dối khéo hơn, và bạn là người dạy điều đó.',
        '{child} takes the punishment without crying out. Afterward the child lies more skilfully, and you are the one who taught them.',
        { sanity: -2 },
        { bond: { child: -6 } }
      )
    ],
    I('Bạn gật và dọn mảnh cốc vỡ. {child} đứng nhìn bạn dọn, rất lâu, như đang học cách làm việc đó.', 'You nod and sweep up the broken cup. {child} stands and watches you sweep, for a long time, as if learning how it is done.'),
    { tags: ['npc'], once: true }
  ),

  M(
    'm5_child_asks_work',
    [24, 70],
    { npc: 'child' },
    '[{child} hỏi về công việc của bạn] {child} hỏi bạn làm gì mỗi ngày mà về nhà với mùi ấy. Câu hỏi rất đơn giản, và bạn có ba mươi giây để quyết định trả lời thế nào.',
    '[{child} Asks About Your Work] {child} asks what you do all day that you come home smelling like that. It is a simple question, and you have thirty seconds to decide how to answer.',
    [
      C(
        'Nói thật, bỏ bớt chi tiết đẫm máu',
        'Tell the truth, leaving out the bloody details',
        '{child} lắng nghe với đôi mắt mở to, rồi hỏi một câu bạn không ngờ: người ta có đau không. Bạn không biết trả lời.',
        '{child} listens with wide eyes, then asks something you did not expect: does it hurt them. You do not know how to answer.',
        { sanity: -1 },
        { bond: { child: 5 } }
      ),
      C(
        'Nói bạn làm những việc nhàm chán',
        'Say you do boring jobs',
        '{child} gật, hơi thất vọng. Hôm sau họ kể cho bạn một câu chuyện dài về một công việc nhàm chán mà họ tự nghĩ ra.',
        '{child} nods, a little disappointed. The next day they tell you a long story about a boring job they have invented.',
        { sanity: 1 },
        { bond: { child: 1 } }
      ),
      C(
        'Nói rằng chuyện đó không phải chuyện trẻ con',
        'Say that is not a matter for children',
        '{child} im lặng rồi đi ra chỗ khác. Bạn nhận ra mình vừa nói đúng câu mà cha mẹ bạn từng nói với bạn.',
        '{child} falls silent and goes elsewhere. You realise you have just said exactly what your own parents once said to you.',
        { sanity: -2 },
        { bond: { child: -4 } }
      )
    ],
    I('Bạn nói bạn mệt và để câu hỏi lơ lửng. {child} không hỏi lại, nhưng bạn thấy nó nhìn đôi giày của bạn rất lâu.', 'You say you are tired and let the question hang. {child} does not ask again, but you see them study your shoes for a long time.'),
    { tags: ['npc'], once: true }
  ),

  M(
    'm5_child_missing_shoe',
    [22, 70],
    { npc: 'child' },
    '[Một chiếc giày] {child} về nhà chỉ còn một chiếc giày và không nói đã để chiếc kia ở đâu. Đứa trẻ cứ nhìn xuống chân mình như thể nó cũng ngạc nhiên.',
    '[One Shoe] {child} comes home with only one shoe and does not say where the other went. The child keeps looking down at their own feet as if equally surprised.',
    [
      C(
        'Mua đôi giày mới mà không hỏi',
        'Buy new shoes without asking',
        'Đôi giày mới được đặt cạnh cửa mà không ai nhắc đến. {child} đi nó ba ngày liền, và không bao giờ nói chiếc cũ ở đâu.',
        'The new pair is set by the door and no one mentions it. {child} wears them three days running, and never says where the old one went.',
        { wealth: -3, sanity: 1 },
        { bond: { child: 3 }, costAhn: 3 }
      ),
      C(
        'Hỏi chiếc giày ở đâu, nhẹ nhàng',
        'Ask where the shoe is, gently',
        '{child} bảo nó cho ai đó mượn, rồi không nói thêm. Bạn nhận ra người đó là một người mà đứa trẻ không muốn bạn biết.',
        '{child} says they lent it to someone, then nothing more. You realise it was someone the child does not want you to know about.',
        { sanity: -1 },
        { bond: { child: 2 } }
      ),
      C(
        'Lần theo dấu chân đến tìm chiếc giày',
        'Follow the footprints to find the shoe',
        'Dấu chân dẫn đến một hẻm cụt, nơi chiếc giày đặt ngay ngắn bên một chiếc chăn cũ. Có ai đang ngủ ở đó, và bạn lùi ra không đánh thức họ.',
        'The prints lead to a dead-end alley where the shoe sits neatly beside an old blanket. Someone is sleeping there, and you back away without waking them.',
        { sanity: -2, network: 1 },
        { bond: { child: 1 }, motif: { mercy: 1 } }
      )
    ],
    I('Bạn nhìn đôi chân {child} rồi chuyển sang chuyện khác. Chiếc giày còn lại bị cất vào ngăn tủ và không ai đụng đến nữa.', 'You look at {child}’s feet and change the subject. The remaining shoe is put away in a cupboard and no one touches it again.'),
    { tags: ['npc'], once: true }
  ),

  // ------------------------------------------------------------ mentor
  M(
    'm5_mentor_three_locks',
    [20, 80],
    { npc: 'mentor' },
    '[Ba lần kiểm tra khóa] {mentor} vẫn kiểm tra khóa cửa ba lần trước khi ngủ, và tối nay hỏi bạn có ai đang theo dõi bạn không.',
    '[Three Checks of the Lock] {mentor} still checks the door lock three times before sleeping, and tonight asks whether anyone has been following you.',
    [
      C(
        'Nói thật về người bạn nghi ngờ',
        'Tell the truth about who you suspect',
        '{mentor} nghe xong, đứng dậy và kiểm tra khóa lần thứ tư. Rồi ông chỉ cho bạn hai lối thoát mà bạn chưa từng để ý trong chính nhà mình.',
        '{mentor} hears you out, stands, and checks the lock a fourth time. Then they show you two ways out you had never noticed in their own house.',
        { sanity: 1, network: 1 },
        { bond: { mentor: 6 } }
      ),
      C(
        'Nói không có ai',
        'Say there is no one',
        '{mentor} nhìn bạn rất lâu. "Vậy thì tốt," ông nói, bằng giọng của người biết bạn đang nói dối nhưng quyết định để bạn giữ lời nói ấy.',
        '{mentor} looks at you a long time. "Good, then," they say, in the voice of someone who knows you are lying and decides to let you keep it.',
        { sanity: -1 },
        { bond: { mentor: -2 } }
      ),
      C(
        'Hỏi ngược lại vì sao ông phải kiểm tra ba lần',
        'Ask in return why they check three times',
        'Ông trả lời bằng một câu chuyện về một đêm ông chỉ kiểm tra một lần. Ông không kể đoạn kết, và bạn không hỏi.',
        'They answer with a story about a night they checked only once. They do not tell the ending, and you do not ask.',
        { sanity: -2, resonance: 2 },
        { bond: { mentor: 5 } }
      )
    ],
    I('Bạn ngồi nghe tiếng chốt khóa lần thứ ba. Ông nói chúc ngủ ngon, và cả hai đều thức khuya hơn dự định.', 'You sit listening to the third turn of the lock. They wish you good night, and both of you stay up later than planned.'),
    { tags: ['npc'], once: true }
  ),

  M(
    'm5_mentor_small_debt',
    [20, 80],
    { npc: 'mentor' },
    '[Món nợ nhỏ của {mentor}] {mentor} nhờ bạn trả giúp một món nợ nhỏ cho người bán tạp hóa đầu hẻm, rồi dặn đừng nói là của ai.',
    '[{mentor}’s Small Debt] {mentor} asks you to pay a small debt on their behalf to the grocer at the end of the alley, and tells you not to say whose it is.',
    [
      C(
        'Trả giúp và giữ kín',
        'Pay it and keep quiet',
        'Người bán tạp hóa đếm tiền và chỉ nói rằng nợ này đã hai mươi năm rồi. Bạn không hỏi thêm, và hôm sau {mentor} đưa bạn một thứ gì đó nhỏ, gói trong khăn.',
        'The grocer counts the coins and says only that the debt is twenty years old. You do not ask more, and the next day {mentor} hands you something small wrapped in cloth.',
        { wealth: -3, network: 2 },
        { bond: { mentor: 6 }, costAhn: 3 }
      ),
      C(
        'Hỏi {mentor} vì sao không tự trả',
        'Ask {mentor} why they cannot pay it themselves',
        'Ông nhìn xuống tay mình. "Người ấy chỉ nhận tiền từ người lạ," ông nói. Bạn không biết đó là lòng tự trọng hay một lời nguyền.',
        'They look down at their hands. "He only takes money from strangers," they say. You cannot tell whether it is pride or a curse.',
        { sanity: -1 },
        { bond: { mentor: 3 } }
      ),
      C(
        'Từ chối vì không muốn dính vào',
        'Refuse, not wanting to get involved',
        '{mentor} gật, không giận. Nhưng hôm sau ông tự đi, chân đau hơn mọi ngày, và bạn nhìn ông qua cửa sổ cho đến khi khuất.',
        '{mentor} nods, not angry. But the next day they go themselves, leg hurting more than usual, and you watch from the window until they are out of sight.',
        { sanity: -2 },
        { bond: { mentor: -4 } }
      )
    ],
    I('Bạn nói sẽ lo, rồi quên mất. Ba ngày sau người bán tạp hóa nhìn bạn khi bạn đi ngang, không nói gì.', 'You say you will see to it, then forget. Three days later the grocer looks at you as you walk past, and says nothing.', { sanity: -1 }),
    { tags: ['npc'], once: true }
  ),

  // ------------------------------------------------------------ lover
  M(
    'm5_lover_under_awning',
    [16, 60],
    { npc: 'lover' },
    '[Dưới mái hiên đầu hẻm] {lover} hẹn bạn dưới mái hiên đầu hẻm và đã đứng đó từ rất lâu trước giờ hẹn. Mưa vừa tạnh, và vai áo họ vẫn còn ướt.',
    '[Under the Awning] {lover} asks to meet you under the awning at the end of the alley and has been standing there since long before the hour. The rain has just stopped, and their shoulders are still wet.',
    [
      C(
        'Khoác áo của bạn lên vai {lover}',
        'Put your coat over {lover}’s shoulders',
        'Họ để yên cho bạn khoác, và áo bạn có mùi họ suốt một tuần. Hai người đi bộ về mà không cần nói gì.',
        'They let you, and your coat smells of them for a week. You walk back together without needing to say anything.',
        { sanity: 3 },
        { bond: { lover: 7 } }
      ),
      C(
        'Trêu {lover} vì đến sớm quá',
        'Tease {lover} for arriving so early',
        'Họ cười, nhưng nụ cười đến muộn nửa nhịp. Bạn nhận ra họ đã đợi vì sợ bạn không đến, và câu đùa của mình rơi xuống chỗ ấy.',
        'They laugh, but the laugh comes half a beat late. You realise they waited out of fear you would not come, and your joke has landed on that.',
        { sanity: 1 },
        { bond: { lover: -2 } }
      ),
      C(
        'Nói thẳng rằng bạn gần như không đến',
        'Admit you almost did not come',
        '{lover} im lặng, rồi bảo cảm ơn vì đã nói thật. Họ nắm tay bạn chặt hơn, như sợ bạn thật sự đã không đến.',
        '{lover} is silent, then says thank you for telling the truth. They hold your hand tighter, as if afraid you really might not have come.',
        { sanity: -1 },
        { bond: { lover: 5 } }
      )
    ],
    I('Bạn đứng cạnh họ dưới mái hiên. Giọt nước cuối cùng từ mái rơi xuống đúng giữa hai người.', 'You stand beside them under the awning. The last drop from the edge falls exactly between the two of you.'),
    { tags: ['npc'], once: true }
  ),

  // ------------------------------------------------------------ rival
  M(
    'm5_rival_same_stall',
    [14, 70],
    { npc: 'rival' },
    '[Cùng một quầy mì] {rival} ngồi xuống chiếc ghế cạnh bạn ở quầy mì và gọi đúng món bạn vẫn gọi. Cả quầy bỗng im, như thể ai cũng biết chuyện giữa hai người.',
    '[The Same Noodle Stall] {rival} sits on the stool beside you at the noodle stall and orders exactly what you always order. The whole stall goes quiet, as if everyone knows what lies between you.',
    [
      C(
        'Ăn tiếp như không có ai',
        'Keep eating as if no one is there',
        'Bạn ăn hết tô mà không ngẩng đầu. Khi đứng dậy, {rival} nói rất khẽ: "Ngon nhỉ." Bạn không biết đó là lời khiêu khích hay một lời thật.',
        'You finish the bowl without looking up. As you stand, {rival} says very quietly, "Good, isn’t it." You cannot tell whether it is a taunt or the truth.',
        { sanity: -1 },
        { bond: { rival: 2 } }
      ),
      C(
        'Trả tiền tô của {rival}',
        'Pay for {rival}’s bowl',
        'Chủ quầy nhìn bạn như vừa thấy ai đặt một ngọn nến lên giữa chiến trường. {rival} không cảm ơn, nhưng cả hai nhớ chuyện này rất lâu.',
        'The stall owner looks at you as if someone has set a candle in the middle of a battlefield. {rival} does not thank you, but both of you remember it for a long time.',
        { wealth: -2, rep: 1, network: 1 },
        { bond: { rival: 5 }, costAhn: 2 }
      ),
      C(
        'Đứng dậy bỏ đi ngay',
        'Stand and leave at once',
        'Bạn bỏ lại nửa tô mì. Phía sau, {rival} kéo tô của bạn về phía mình và ăn nốt, chậm rãi, nhìn theo lưng bạn.',
        'You leave half a bowl behind. Behind you {rival} pulls your bowl toward themselves and finishes it, slowly, watching your back.',
        { rep: -1, sanity: 1 },
        { bond: { rival: -3 } }
      )
    ],
    I('Hai người ngồi cạnh nhau suốt buổi mà không nói một lời. Cả quầy thở ra khi bạn là người rời đi trước.', 'You sit side by side the whole meal without a word. The whole stall exhales when you are the one to leave first.'),
    { tags: ['npc'], once: true }
  ),

  M(
    'm5_rival_dropped_note',
    [16, 70],
    { npc: 'rival' },
    '[Mảnh giấy rơi khỏi túi] Một mảnh giấy gấp tư rơi khỏi túi {rival} khi họ đi ngang qua bạn trên phố. Họ không nhận ra, và bạn là người duy nhất nhìn thấy.',
    '[A Note from a Pocket] A scrap of paper folded in four falls from {rival}’s pocket as they walk past you in the street. They do not notice, and you are the only one who sees.',
    [
      C(
        'Gọi {rival} lại và trả mảnh giấy',
        'Call {rival} back and return it',
        '{rival} cầm lấy mảnh giấy, nhìn bạn một nhịp, rồi nói: "Anh không đọc chứ?" Bạn nói không, và họ gật chậm, như đang đo xem đó có phải sự thật.',
        '{rival} takes the note, looks at you for a beat, then asks, "You did not read it?" You say no, and they nod slowly, as if measuring whether that is true.',
        { rep: 2, sanity: 1 },
        { bond: { rival: 4 } }
      ),
      C(
        'Giữ lại và đọc',
        'Keep it and read it',
        'Trên giấy là một danh sách ngắn các địa chỉ, và một trong số đó là nhà bạn. Bạn gấp lại và không còn thấy đói.',
        'On the paper is a short list of addresses, and one of them is your own. You fold it up and no longer feel hungry.',
        { sanity: -3, heat: 3 },
        { bond: { rival: -3 }, mem: 'read_rival_list' }
      ),
      C(
        'Đạp lên mảnh giấy và bước tiếp',
        'Step on the note and walk on',
        'Bạn nghe tiếng ai đó quay lại tìm, rất nhanh, rồi tiếng thở nhẹ khi họ tìm thấy. Không ai trong hai người nhìn nhau lần nữa hôm đó.',
        'You hear someone double back, fast, then a small exhale as they find it. Neither of you looks at the other again that day.',
        { sanity: 1 },
        { bond: { rival: -1 } }
      )
    ],
    I('Bạn đứng nhìn mảnh giấy. Một cơn gió thổi nó vào một rãnh nước, và nó mất tăm trước khi bạn kịp quyết định.', 'You stand looking at the scrap. A gust blows it into a gutter, and it is gone before you can decide.'),
    { tags: ['npc'], once: true }
  ),

  // ------------------------------------------------------------ friend
  M(
    'm5_friend_old_nickname',
    [16, 70],
    { npc: 'friend' },
    '[Biệt danh cũ] {friend} gọi bạn bằng biệt danh hồi nhỏ ngay trước mặt những người lạ. Cả nhóm quay lại nhìn, và bạn đã nghĩ mình quên cái tên ấy từ lâu.',
    '[The Old Nickname] {friend} calls you by your childhood nickname in front of strangers. The whole group turns to look, and you had thought you had long forgotten that name.',
    [
      C(
        'Cười và đáp lại bằng biệt danh của {friend}',
        'Laugh and answer with {friend}’s nickname',
        'Cả hai cười đến chảy nước mắt, và nhóm người lạ nhìn như xem một trò lạ. Đêm đó bạn ngủ ngon hơn cả tháng nay.',
        'You both laugh until you cry, and the strangers watch as if at an odd show. That night you sleep better than you have in a month.',
        { sanity: 4 },
        { bond: { friend: 6 } }
      ),
      C(
        'Bảo {friend} đừng dùng cái tên đó ở đây',
        'Tell {friend} not to use that name here',
        '{friend} im một lúc, rồi xin lỗi bằng giọng đã quen với việc xin lỗi. Biệt danh không bao giờ được dùng lại, và hai người cũng ít gặp nhau hơn.',
        '{friend} is quiet a moment, then apologises in the voice of someone used to apologising. The nickname is never used again, and the two of you meet less often.',
        { rep: 1, sanity: -2 },
        { bond: { friend: -5 } }
      ),
      C(
        'Giả vờ không nghe thấy',
        'Pretend not to hear',
        '{friend} gọi lại lần nữa, to hơn, và lần này bạn nghe thấy. Cả nhóm đã nghe, và không ai nói gì.',
        '{friend} calls again, louder, and this time you hear it. The whole group has heard, and no one says anything.',
        { sanity: -2 },
        { bond: { friend: -2 } }
      )
    ],
    I('Bạn quay lại nhìn {friend} một lúc. Cái tên ấy treo trong không khí, nhẹ, như một chiếc lá chưa chạm đất.', 'You turn and look at {friend} a while. The name hangs in the air, light, like a leaf that has not yet reached the ground.'),
    { tags: ['npc'], once: true }
  ),

  // ------------------------------------------------------------ Syndicate
  M(
    'm5_syn_late_recruit',
    [18, 70],
    { jobs: ['Syndicate'] },
    '[Tân binh đến muộn] Một tân binh của Syndicate đến muộn ba mươi phút và đứng ở cửa với đôi giày chưa buộc dây. Người phụ trách nhìn bạn, chờ xem bạn xử lý chuyện này thế nào.',
    '[The Late Recruit] A Syndicate recruit arrives thirty minutes late and stands at the door with unlaced shoes. The man in charge looks at you, waiting to see how you handle it.',
    [
      C(
        'Nhận phần lỗi về mình',
        'Take the blame yourself',
        'Người phụ trách ghi tên bạn thay vì tên tân binh. Cậu ta nhìn bạn suốt buổi, và từ hôm đó đứng gần bạn hơn mọi người.',
        'The man in charge writes your name instead of the recruit’s. The recruit watches you the whole session and from that day stands closer to you than to anyone.',
        { rep: -1, network: 3, merit: 1 }
      ),
      C(
        'Báo cáo việc đến muộn đúng như thực tế',
        'Report the lateness as it happened',
        'Người phụ trách gật và ghi lại. Tân binh bị phạt, và nhìn bạn một lần rồi không bao giờ nhìn thẳng bạn nữa.',
        'The man in charge nods and records it. The recruit is penalised, looks at you once, and never looks at you directly again.',
        { merit: 3, rep: 1, network: -2 }
      ),
      C(
        'Dạy cậu ta buộc dây giày cho chặt',
        'Show them how to tie shoes tightly',
        'Cả phòng im lặng nhìn bạn quỳ xuống trước một tân binh. Người phụ trách bật cười trước, và không khí trong phòng nhẹ đi.',
        'The whole room watches in silence as you kneel before a recruit. The man in charge laughs first, and the air in the room lightens.',
        { network: 2, sanity: 1, merit: 1 }
      )
    ],
    I('Bạn nhún vai. Người phụ trách ghi gì đó vào sổ, và bạn không biết dòng ấy nói về ai.', 'You shrug. The man in charge writes something in his book, and you cannot tell whom the line is about.'),
    { once: true }
  ),

  M(
    'm5_syn_short_envelope',
    [18, 70],
    { jobs: ['Syndicate'] },
    '[Phong bì thiếu một ít] Bạn được giao đi thu khoản đóng góp tháng này ở dãy nhà cũ. Bà chủ quán đưa phong bì thiếu một ít, rồi nhìn bạn như người biết mình đang làm gì.',
    '[The Short Envelope] You are sent to collect this month’s contribution from the old row of buildings. The stall owner hands over an envelope a little short, and watches you like someone who knows exactly what she is doing.',
    [
      C(
        'Nhận phong bì và coi như đủ',
        'Take the envelope and count it as enough',
        'Bà gật mà không cảm ơn. Khi báo cáo, con số của bạn thiếu đúng bằng chừng ấy, và người phụ trách chỉ nhìn bạn lâu hơn bình thường.',
        'She nods without thanks. When you report, your figure is short by exactly that amount, and the man in charge only looks at you longer than usual.',
        { network: 2, merit: -1, heat: 2 }
      ),
      C(
        'Đòi đủ số còn thiếu',
        'Demand the missing amount',
        'Bà đưa thêm, tay run, và cả dãy nhà nhìn bạn đi ra như nhìn một con vật đã được thả vào chuồng. Merit của bạn tăng, mà bạn thấy bụng nôn nao.',
        'She hands over the rest, hand shaking, and the whole row watches you leave as if watching an animal released into a pen. Your standing rises, and your stomach turns.',
        { merit: 3, rep: 1, sanity: -2, network: -2 }
      ),
      C(
        'Bù phần thiếu từ túi mình',
        'Cover the shortfall from your own pocket',
        'Bà nhìn đồng tiền thêm vào, rồi nhìn bạn, và không nói gì. Lần sau bạn ghé qua, một bát canh nóng đã đợi sẵn ở cửa.',
        'She looks at the added coin, then at you, and says nothing. The next time you stop by, a bowl of hot soup is waiting at the door.',
        { wealth: -2, network: 3, sanity: 1 },
        { costAhn: 2 }
      )
    ],
    I('Bạn đứng đó một lúc lâu, và bà chủ quán cũng vậy. Cuối cùng cả hai cùng quay đi, như hai người vừa thỏa thuận một điều không nói ra.', 'You stand there a long while, and so does the stall owner. At last you both turn away, like two people who have agreed on something unspoken.'),
    { once: true }
  ),

  M(
    'm5_syn_fruit_basket',
    [18, 70],
    { jobs: ['Syndicate'] },
    '[Giỏ trái cây thối] Có người để một giỏ trái cây thối trước cửa bạn, buộc bằng một dải ruy băng có màu của một Finger đối địch. Không có lời nhắn nào đi kèm.',
    '[The Rotten Fruit Basket] Someone leaves a basket of rotten fruit at your door, tied with a ribbon in the colour of a rival Finger. There is no note.',
    [
      C(
        'Mang giỏ lên báo cho cấp trên',
        'Carry the basket up to your superior',
        'Cấp trên nhìn giỏ trái cây bằng đôi mắt không hề ngạc nhiên. Ông cảm ơn bạn, rồi bảo bạn đừng đi một mình trong ba tuần tới.',
        'Your superior looks at the basket with eyes that show no surprise at all. He thanks you, then tells you not to walk alone for the next three weeks.',
        { merit: 3, rep: 1, sanity: -2 }
      ),
      C(
        'Gửi trả giỏ cho đúng địa chỉ của Finger kia',
        'Send the basket back to the rival Finger’s address',
        'Bạn không đính kèm lời nào. Hai ngày sau một chiếc giỏ khác đến, lần này đầy trái chín, và dải ruy băng đã bị cắt làm đôi.',
        'You attach no note. Two days later another basket arrives, this time full of ripe fruit, the ribbon cut in half.',
        { heat: 5, rep: 2, sanity: -1 },
        { motif: { violence: 1 } }
      ),
      C(
        'Ném cả giỏ xuống cống và quên chuyện này',
        'Throw the whole basket down the drain and forget it',
        'Sáng hôm sau cống nước nổi mùi trái cây thối khắp hẻm, và hàng xóm bắt đầu hỏi chuyện gì đã xảy ra.',
        'The next morning the drain sends the smell of rotten fruit through the whole alley, and the neighbours start asking what happened.',
        { network: -2, sanity: -1 }
      )
    ],
    I('Bạn bước qua giỏ trái cây. Khi quay về chiều tối, giỏ đã biến mất, và dải ruy băng được buộc vào tay nắm cửa nhà bạn.', 'You step over the basket. When you come back that evening it is gone, and the ribbon is tied around your door handle.', { sanity: -2, heat: 2 }),
    { once: true }
  ),

  // ------------------------------------------------------------ Wing
  M(
    'm5_wing_added_quota',
    [18, 70],
    { jobs: ['Wing Employee'] },
    '[Chỉ tiêu thêm một dòng] Bảng chỉ tiêu tuần này được dán thêm một dòng sau khi bạn rời ca. Không ai nhận là người đã thêm, và con số cuối dòng cao hơn mọi con số khác.',
    '[A Line Added to the Quota] This week’s quota board has an extra line pasted on after you left your shift. No one admits to adding it, and the figure at the end is higher than any other.',
    [
      C(
        'Làm thêm giờ để đạt chỉ tiêu mới',
        'Work overtime to meet the new target',
        'Bạn đạt chỉ tiêu vào đêm thứ năm, mắt đỏ và tay run. Sáng thứ sáu bảng chỉ tiêu đã được dán lại, và dòng thêm biến mất như chưa từng có.',
        'You meet the target on Thursday night, eyes red and hands shaking. On Friday morning the board has been repasted, and the added line is gone as if it never existed.',
        { health: -3, sanity: -2, merit: 4, wealth: 2 }
      ),
      C(
        'Hỏi trưởng bộ phận ai đã thêm dòng đó',
        'Ask the section head who added the line',
        'Ông trả lời trơn tru rằng bảng chỉ tiêu do hệ thống cập nhật. Khi bạn hỏi hệ thống do ai điều khiển, ông ghi tên bạn vào một cuốn sổ nhỏ.',
        'He answers smoothly that the board is updated by the system. When you ask who controls the system, he writes your name in a small notebook.',
        { network: 1, sanity: -1, merit: -1 }
      ),
      C(
        'Bỏ qua dòng thêm và làm như cũ',
        'Ignore the added line and work as usual',
        'Cuối tuần, tên bạn đứng cuối bảng với một dấu chấm nhỏ bên cạnh. Không ai giải thích dấu chấm ấy, nhưng đồng nghiệp bắt đầu ngồi xa bạn hơn ở căng tin.',
        'At the end of the week your name sits at the bottom of the board with a small dot beside it. No one explains the dot, but colleagues begin sitting farther from you in the canteen.',
        { network: -3, sanity: 1 }
      )
    ],
    I('Bạn đọc dòng thêm hai lần và quay về chỗ ngồi. Con số cuối dòng vẫn nằm đó, như một cái bóng không có chủ.', 'You read the added line twice and go back to your desk. The figure at its end stays where it is, like a shadow with no owner.'),
    { once: true }
  ),

  M(
    'm5_wing_lift_silence',
    [18, 70],
    { jobs: ['Wing Employee'] },
    '[Thang máy im lặng] Ba đồng nghiệp trong thang máy ngừng nói khi bạn bước vào, rồi nói lại ngay khi bạn bước ra. Bạn không nghe được câu nào, chỉ nghe tiếng của chúng thay đổi.',
    '[The Silent Lift] Three colleagues in the lift stop talking when you step in, then start again the moment you step out. You catch no sentence, only the change in their voices.',
    [
      C(
        'Hỏi thẳng họ đã nói chuyện gì',
        'Ask them directly what they were discussing',
        'Họ nhìn nhau, rồi một người nói đó là chuyện thăng chức, và tên bạn có trong danh sách. Người ấy không nói là danh sách nào.',
        'They look at each other, then one says it was about promotions, and that your name is on the list. They do not say which list.',
        { network: 2, sanity: -1 }
      ),
      C(
        'Đứng ngoài cửa thang máy nghe thêm',
        'Linger outside the lift door and listen',
        'Bạn chỉ nghe được tên một người khác và một con số, rồi cánh cửa đóng. Cả buổi chiều bạn tự hỏi con số ấy là tiền hay là tuổi.',
        'You catch only another person’s name and a figure before the door closes. All afternoon you wonder whether the figure was money or an age.',
        { sanity: -2, resonance: 1 }
      ),
      C(
        'Đi tiếp như không có gì',
        'Walk on as if nothing happened',
        'Bạn đi thẳng về bàn, và không ai nhìn bạn quá lâu. Điều đó khiến bạn nghi ngờ hơn bất cứ cái nhìn nào.',
        'You walk straight to your desk, and no one looks at you for too long. That makes you more suspicious than any stare could.',
        { sanity: -1 }
      )
    ],
    I('Cánh cửa thang máy đóng lại sau lưng bạn. Tiếng nói bên trong bắt đầu lại, nhỏ hơn, như đang cố không để ai nghe.', 'The lift door closes behind you. The voices inside start up again, lower, as if trying to avoid being heard.'),
    { once: true }
  ),

  M(
    'm5_wing_wrong_badge',
    [18, 70],
    { jobs: ['Wing Employee'] },
    '[Hộp quà ghi tên người khác] Phòng nhân sự gửi nhầm hộp quà ghi tên một đồng nghiệp cùng bộ phận. Bên trong là một chiếc huy hiệu Feather bóng hơn của bạn một chút, và nặng hơn.',
    '[A Gift Box with Another Name] Human resources deliver a gift box addressed to a colleague in your section by mistake. Inside is a Feather badge a shade shinier than yours, and heavier.',
    [
      C(
        'Mang trả cho đồng nghiệp đúng người',
        'Carry it to the colleague it belongs to',
        'Họ nhận mà không nói gì, rồi đưa bạn một món nhỏ để đáp lại. Bạn không biết đó là lòng biết ơn hay một cái giá.',
        'They take it without a word, then hand you something small in return. You cannot tell whether it is gratitude or a price.',
        { rep: 1, network: 2, sanity: 1 }
      ),
      C(
        'Giữ lại một ngày rồi mới trả',
        'Keep it a day before returning it',
        'Cả ngày hôm đó huy hiệu nằm trong ngăn kéo và lạnh hơn chiếc của bạn. Khi trả, bạn thấy một vết xước nhỏ mới trên mặt nó, và không nhớ mình đã làm.',
        'All day the badge lies in your drawer, colder than your own. When you return it you notice a new small scratch on its face and cannot recall making it.',
        { sanity: -2, resonance: 2 }
      ),
      C(
        'Tráo huy hiệu của hai người rồi báo là đã trả',
        'Swap the two badges and say it was returned',
        'Một tuần sau, một nhân viên an ninh hỏi bạn về số hiệu trên chiếc huy hiệu bạn đang đeo. Bạn trả lời được, nhưng tay bạn đổ mồ hôi lạnh.',
        'A week later a security officer asks about the serial number on the badge you are wearing. You manage an answer, but your hands run cold with sweat.',
        { rep: 2, heat: 4, taboo: 1, sanity: -3 },
        { motif: { greed: 1 } }
      )
    ],
    I('Bạn đặt hộp quà lên bàn và quên nó đến cuối ngày. Sáng hôm sau nó vẫn ở đó, nguyên vẹn, như đang chờ ai đó quyết định thay bạn.', 'You set the box on your desk and forget it till the end of the day. The next morning it is still there, intact, as if waiting for someone to decide on your behalf.'),
    { once: true }
  ),

  // ------------------------------------------------------------ Workshop
  // ------------------------------------------------------------ Distortion
  M(
    'm5_dist_puddle',
    GROWN,
    { jobs: ['Distortion'] },
    '[Vũng nước sau mưa] Bạn đi qua một vũng nước sau cơn mưa và không nhận ra hình dạng phản chiếu trong đó, dù nó di chuyển cùng bạn. Nó dừng khi bạn dừng, và không chớp mắt khi bạn chớp.',
    '[A Puddle After Rain] You walk past a puddle after the rain and do not recognise the shape reflected in it, though it moves as you do. It stops when you stop, and does not blink when you blink.',
    [
      C(
        'Cúi xuống nhìn thật lâu',
        'Crouch and look for a long time',
        'Hình dạng trong nước dần quen thuộc hơn, và bạn nhận ra mình đã thôi sợ nó. Đó là điều làm bạn sợ nhất.',
        'The shape in the water slowly grows familiar, and you realise you have stopped being afraid of it. That is what frightens you most.',
        { resonance: 4, health: -1 }
      ),
      C(
        'Giẫm lên vũng nước cho tan hình',
        'Stamp through the puddle to break the image',
        'Nước bắn lên và hình dạng vỡ ra thành những mảnh nhỏ, mỗi mảnh nhìn về một hướng khác nhau. Khi nước lặng lại, nó đã biến mất.',
        'The water splashes and the shape breaks into small pieces, each looking a different way. When the water settles it is gone.',
        { health: -1, heat: 1 }
      ),
      C(
        'Đi vòng qua, không nhìn nữa',
        'Walk around it and do not look again',
        'Bạn đi vòng hết con hẻm. Suốt đoạn đường còn lại bạn nghe tiếng nước nhỏ giọt phía sau, đều đặn, như ai đó đang theo.',
        'You go the long way around the alley. For the rest of the walk you hear water dripping behind you, regular, as though someone is following.',
        { network: -1 }
      )
    ],
    I('Bạn nhìn một giây rồi bước tiếp. Hình trong nước nhìn theo, và khi bạn ngoảnh lại, nó đã quay mặt đi.', 'You look for a second and walk on. The figure in the water watches you go, and when you turn back it has looked away.'),
    { once: true }
  ),

  M(
    'm5_dist_child_bread',
    GROWN,
    { jobs: ['Distortion'] },
    '[Đứa trẻ không bỏ chạy] Một đứa trẻ ở cuối hẻm nhìn bạn rất lâu mà không bỏ chạy, rồi đưa ra một mẩu bánh. Tay nó run, nhưng chìa ra thẳng.',
    '[The Child Who Does Not Run] A child at the end of the alley looks at you for a long time without running, then holds out a piece of bread. Its hand shakes but stays straight.',
    [
      C(
        'Nhận mẩu bánh',
        'Take the bread',
        'Mẩu bánh nhỏ và đã cứng. Bạn ăn nó chậm, và đứa trẻ ngồi xuống cạnh bạn, không nói gì, cho đến khi trời tối.',
        'The bread is small and stale. You eat it slowly, and the child sits down beside you, saying nothing, until dark.',
        { network: 2, health: 1, heat: -1 },
        { motif: { mercy: 1 } }
      ),
      C(
        'Lắc đầu và bảo nó cất đi',
        'Shake your head and tell it to put it away',
        'Đứa trẻ rụt tay lại và gật, như đã hiểu điều gì đó. Nó đi không ngoảnh lại, và mẩu bánh vẫn nằm trong lòng bàn tay nó.',
        'The child draws its hand back and nods, as if understanding something. It leaves without looking back, the bread still in its palm.',
        { sanity: 0, network: -1 }
      ),
      C(
        'Gầm lên để dọa nó chạy',
        'Roar to scare it into running',
        'Đứa trẻ chạy, nhưng nó chạy chậm, và vừa chạy vừa ngoảnh lại như thể muốn chắc rằng bạn vẫn ở đó. Ngày hôm sau có người đến hỏi về bạn.',
        'The child runs, but slowly, glancing back as if to be sure you are still there. The next day someone comes asking about you.',
        { heat: 5, resonance: 3, network: -2 },
        { motif: { violence: 1 } }
      )
    ],
    I('Bạn đứng yên. Đứa trẻ đặt mẩu bánh xuống đất giữa hai người rồi lùi ra, mắt vẫn nhìn bạn.', 'You stand still. The child sets the bread on the ground between you and backs away, eyes still on you.'),
    { once: true }
  ),

  M(
    'm5_dist_old_name',
    GROWN,
    { jobs: ['Distortion'] },
    '[Tên cũ trên hộp thư] Bạn đi ngang căn nhà cũ. Tên bạn vẫn còn trên hộp thư, nét chữ đã phai, và có ai đó đã đặt một chậu cây nhỏ bên cạnh.',
    '[The Old Name on the Letterbox] You walk past your old house. Your name is still on the letterbox, the lettering faded, and someone has placed a small potted plant beside it.',
    [
      C(
        'Cạo tên khỏi hộp thư',
        'Scrape the name off the letterbox',
        'Lớp sơn bong ra dễ hơn bạn nghĩ. Bạn đứng nhìn hộp thư trống một lúc, rồi nhận ra bạn đang tìm một thứ để cảm thấy, và không tìm ra.',
        'The paint flakes off more easily than you expected. You stand looking at the blank letterbox a while, then realise you are searching for something to feel and cannot find it.',
        { resonance: -2, sanity: 0 }
      ),
      C(
        'Đưa tay chạm vào chậu cây',
        'Reach out and touch the plant pot',
        'Đất trong chậu ẩm, vừa được tưới. Ai đó vẫn ở đây mỗi ngày, và bạn rút tay lại trước khi nghe tiếng bước chân.',
        'The soil in the pot is damp, freshly watered. Someone still comes here every day, and you pull your hand back before you hear footsteps.',
        { network: 1, resonance: 2 }
      ),
      C(
        'Đi tiếp mà không nhìn lại',
        'Walk on without looking back',
        'Bạn đi hết con phố mà không ngoảnh lại. Ở cuối phố, một cánh cửa sổ tầng hai hé mở, và có tiếng ai đó gọi một cái tên.',
        'You walk the whole street without looking back. At its end a second-floor window opens a crack, and someone calls out a name.',
        { heat: 1 }
      )
    ],
    I('Bạn nhìn tên mình một lúc. Gió thổi qua và chiếc lá trong chậu cây rung nhẹ, như đang vẫy chào.', 'You look at your name a while. Wind passes and a leaf in the pot trembles, as if waving.'),
    { once: true }
  ),

  // ------------------------------------------------------------ the very young
  M(
    'm5_k_counting_steps',
    KID,
    {},
    '[Đếm bậc thang] Bạn đếm bậc thang lên căn hộ và mỗi lần đếm ra một số khác nhau. Hôm nay là mười bốn, hôm qua là mười ba, và bạn chắc chắn không ai thêm bậc nào.',
    '[Counting Stairs] You count the stairs up to the flat and each time arrive at a different number. Today it is fourteen, yesterday it was thirteen, and you are certain no one added a step.',
    [
      C(
        'Đếm lại từ đầu thật chậm',
        'Count again from the start, very slowly',
        'Lần này bạn đếm ra mười bốn, và thấy bậc thứ mười bốn dài hơn những bậc khác. Bạn quyết định không đếm nữa.',
        'This time you reach fourteen, and notice the fourteenth step is longer than the rest. You decide not to count any more.',
        { sanity: -1, resonance: 1 }
      ),
      C(
        'Kể cho người lớn nghe',
        'Tell an adult',
        'Người lớn bảo đó là do bạn đếm sai, rồi kiểm tra bậc thang một lần cho chắc. Bạn thấy họ đếm bằng môi.',
        'The adult says you must be miscounting, then checks the stairs once to be sure. You see them counting with their lips.',
        { sanity: 1 }
      ),
      C(
        'Nhảy lên hai bậc một lần cho đến hết',
        'Jump two steps at a time all the way up',
        'Bạn lên nhanh đến mức chẳng kịp đếm. Ở đỉnh cầu thang, bạn ngoảnh lại và thấy bậc cuối cùng như vừa dịch một chút.',
        'You climb so fast there is no time to count. At the top you glance back and the last step seems to have shifted slightly.',
        { health: 1, sanity: 1 }
      )
    ],
    I('Bạn bỏ qua việc đếm. Nhưng đêm đó, trong giấc ngủ, bạn vẫn đếm đến mười bốn.', 'You give up counting. But that night in your sleep you still count to fourteen.', { sanity: -1 }),
    { once: true }
  ),

  M(
    'm5_c_found_coin',
    CHILD,
    {},
    '[Đồng Ahn giữa chợ] Bạn nhặt được một đồng Ahn rơi giữa chợ. Không ai quanh đó nhìn xuống, nhưng một người bán hàng đang nhìn bạn.',
    '[A Coin in the Market] You find an Ahn coin dropped in the middle of the market. No one around looks down, but a vendor is looking at you.',
    [
      C(
        'Bỏ vào túi và bước đi',
        'Pocket it and walk on',
        'Đồng tiền nặng trong túi bạn suốt buổi chiều. Mua được một cái bánh, và bạn ăn nó một mình sau lưng nhà, không thấy ngon như đã nghĩ.',
        'The coin weighs in your pocket all afternoon. It buys one bun, and you eat it alone behind the house, not tasting as good as you had expected.',
        { wealth: 1, sanity: -1 }
      ),
      C(
        'Hỏi người bán hàng đó có phải của họ không',
        'Ask the vendor whether it is theirs',
        'Người bán hàng lắc đầu, rồi cười. "Giữ đi, nhóc," ông nói, và đưa thêm một miếng kẹo mà bạn không dám nhận.',
        'The vendor shakes his head, then smiles. "Keep it, kid," he says, and offers a sweet you are too shy to take.',
        { rep: 1, sanity: 1 }
      ),
      C(
        'Đặt đồng xu vào bát của một người ăn xin',
        'Drop the coin in a beggar’s bowl',
        'Người ăn xin nhìn đồng tiền rồi nhìn bạn, thật lâu. Ông không cảm ơn, chỉ nhớ mặt bạn, và nhiều năm sau bạn vẫn gặp ông ở chợ.',
        'The beggar looks at the coin, then at you, for a long time. He does not thank you, only remembers your face, and years later you still meet him in the market.',
        { sanity: 2, network: 1 },
        { motif: { mercy: 1 } }
      )
    ],
    I('Bạn để đồng xu nằm đó. Một đứa lớn hơn nhặt nó lên trước mặt bạn, và nhìn bạn như đã thắng một ván cờ.', 'You leave the coin where it lies. A bigger kid picks it up in front of you and looks at you as if having won a game.', { sanity: -1 }),
    { once: true }
  ),

  M(
    'm5_c_drain_den',
    CHILD,
    { back: true },
    '[Ổ bí mật trong ống thoát nước] Bạn tìm thấy một đoạn ống thoát nước khô đủ rộng cho một đứa trẻ chui vào. Bên trong có mùi rỉ sét, và có một cái hộp thiếc nhỏ ai đó cất ở góc.',
    '[The Den in the Drain Pipe] You find a dry stretch of drain pipe wide enough for a child to crawl into. Inside smells of rust, and someone has stored a small tin box in the corner.',
    [
      C(
        'Mở hộp thiếc',
        'Open the tin box',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Trong hộp là ba chiếc cúc áo, một tấm hình rách và một mẩu kẹo đã chảy. Bạn cất mọi thứ lại đúng chỗ, và quyết định coi chỗ này là của bạn.', 'In the box are three buttons, a torn photo and a melted sweet. You put everything back exactly, and decide to treat this place as yours.', { sanity: 2 }),
            O(40, 'Trong hộp là một con dao nhỏ và một tờ giấy có địa chỉ. Tối đó bạn không ngủ được, và ngày hôm sau ống thoát nước đã bị bít bằng tấm ván.', 'In the box are a small knife and a slip of paper with an address. You cannot sleep that night, and the next day the drain pipe has been boarded shut.', { sanity: -3, heat: 2 })
          ]
        }
      ),
      C(
        'Chui vào và ngồi đó một lúc',
        'Crawl in and sit there a while',
        'Tiếng thành phố nghe mơ hồ như từ rất xa. Bạn ngồi đến khi tối, và lần đầu tiên thấy mình không thuộc về ai.',
        'The sounds of the City come through muffled, as from very far away. You sit until dark and for the first time feel you belong to no one.',
        { sanity: 3 }
      ),
      C(
        'Về kể với một người lớn',
        'Go and tell a grown-up',
        'Người lớn bảo bạn không được chui vào đó, rồi tự mình ra xem. Khi trở về, họ không nhìn bạn, và hôm sau miệng ống bị bịt kín.',
        'The grown-up says you must not go in there, then goes to look. They come back not looking at you, and the next day the pipe mouth is sealed.',
        { sanity: -1 }
      )
    ],
    I('Bạn đứng ở miệng ống một lúc. Từ bên trong có tiếng gì đó như tiếng thở, rồi chỉ còn gió.', 'You stand at the mouth of the pipe a while. From inside comes something like breathing, then only wind.'),
    { once: true }
  ),

  // ------------------------------------------------------------ the old
  M(
    'm5_old_too_many_keys',
    OLD,
    {},
    '[Chùm chìa khóa quá nhiều] Bạn cầm chùm chìa khóa của những căn nhà không còn ai ở: nhà của một người bạn thời trẻ, của người từng dạy bạn nghề, của chính bạn thuở trước. Chùm nặng đến mức tay bạn phải đổi bên.',
    '[Too Many Keys] You hold a ring of keys to houses no one lives in any more: an old friend’s, a teacher’s, your own from long ago. The ring is so heavy your hand has to change sides.',
    [
      C(
        'Ném cả chùm xuống kênh',
        'Throw the whole ring into the canal',
        'Chùm chìa chìm nhanh hơn bạn nghĩ. Bàn tay bạn nhẹ đến mức run, và cả tuần bạn cứ đưa tay xuống túi tìm một thứ không còn ở đó.',
        'The ring sinks faster than you expected. Your hand is so light it trembles, and all week you keep reaching into your pocket for something that is no longer there.',
        { sanity: 2, resonance: -3 }
      ),
      C(
        'Tách từng chìa ra và tặng người trẻ',
        'Separate them and give them to younger people',
        'Có người hỏi vì sao bạn cho họ chìa khóa của nhà mà họ không biết. Bạn nói đó là nhà của những người rất tốt, và là sự thật.',
        'Someone asks why you give them keys to houses they do not know. You say they belonged to very good people, which is true.',
        { network: 2, rep: 1, sanity: 1 }
      ),
      C(
        'Giữ nguyên chùm chìa và treo lên tường',
        'Keep the ring and hang it on the wall',
        'Mỗi sáng bạn nhìn chùm chìa treo trên đinh và gọi nhẩm từng cái tên. Khi dừng lại ở một cái chìa bạn không nhớ chủ, bạn mất cả buổi sáng để cố nhớ.',
        'Each morning you look at the ring on its nail and murmur each name. When you stop at a key whose owner you cannot recall, you lose the whole morning trying.',
        { sanity: -1, resonance: 2 }
      )
    ],
    I('Bạn đặt chùm chìa lên bàn. Ánh chiều chiếu qua nó, và bóng của chúng trên tường đông hơn số chìa thật.', 'You lay the ring on the table. The afternoon light passes through it, and its shadow on the wall holds more keys than there are.'),
    { once: true }
  ),

  M(
    'm5_old_stranger_directions',
    OLD,
    {},
    '[Người trẻ hỏi đường] Một người trẻ hỏi bạn đường đến một khu phố đã bị phá từ hai mươi năm trước. Họ cầm một tấm bản đồ cũ, và tin vào nó hơn tin vào bạn.',
    '[A Young Person Asks the Way] A young stranger asks you the way to a neighbourhood torn down twenty years ago. They hold an old map, and trust it more than they trust you.',
    [
      C(
        'Nói thật rằng khu phố ấy không còn',
        'Tell them the neighbourhood no longer exists',
        'Họ nhìn bản đồ, rồi nhìn bạn, và có vẻ nhẹ nhõm và thất vọng cùng một lúc. Họ cảm ơn bạn rất lâu, như vì một điều lớn hơn lời chỉ đường.',
        'They look at the map, then at you, and seem relieved and disappointed at once. They thank you for a very long time, as for something larger than directions.',
        { sanity: 1, network: 1 }
      ),
      C(
        'Dẫn họ đến chỗ đã từng là khu phố ấy',
        'Walk them to where the neighbourhood used to stand',
        'Đó chỉ còn là một bãi đất trống với vài tấm sắt. Bạn kể từng ngôi nhà đã ở đâu, và họ chép lại vào mép bản đồ bằng nét chữ nắn nót.',
        'It is only a stretch of empty ground with a few iron sheets. You tell where each house stood, and they copy it onto the map’s margin in careful handwriting.',
        { health: -1, sanity: 2, rep: 1, network: 2 }
      ),
      C(
        'Chỉ đại một hướng cho xong chuyện',
        'Point in some direction to be rid of it',
        'Họ cảm ơn và đi theo hướng bạn chỉ. Bạn nhìn theo, và nhận ra hướng bạn chỉ dẫn đến đúng con kênh.',
        'They thank you and set off the way you pointed. You watch them go, and realise the way you pointed leads straight to the canal.',
        { sanity: -2, rep: -1 }
      )
    ],
    I('Bạn lắc đầu. Họ gấp bản đồ lại, cẩn thận, và đi tiếp. Bạn đứng nhìn theo đến khi họ khuất sau góc đường đã không còn tên.', 'You shake your head. They fold the map carefully and walk on. You watch until they vanish around a corner that no longer has a name.'),
    { once: true }
  )
];
