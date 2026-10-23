// The Ring: art made on and of living people, shown in rooms that smell of varnish. A Docent
// guides, a Maestro composes, a Curator decides what the world is allowed to see. The question this
// Finger keeps asking is not whether the work is cruel but whether it is true. Chase perfection or
// keep a conscience: the gallery remembers both.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

const R = 'Ring';

export const RING_EVENTS = [
  // ------------------------------------------------------------------ missions
  fe('ring_atelier_critique', R, [0, 1],
    '[Buổi phê bình ở Atelier] Maestro đặt bốn ghế quanh một tác phẩm bạn mới hoàn thành, và mời bốn người đến xem: hai Docent, một thợ dựng khung, một người lạ mặc áo choàng xám. Không ai nói gì trong mười phút. Rồi người lạ hỏi bạn một câu duy nhất: Bạn muốn người xem cảm thấy gì khi nhìn nó?',
    '[Critique at the Atelier] The Maestro sets four chairs around a piece you have just finished, and invites four to view it: two Docents, a frame builder, and a stranger in a gray cloak. No one speaks for ten minutes. Then the stranger asks you one question: What do you want a viewer to feel on seeing this?',
    [
      fc('Nói thẳng: nỗi sợ, và sau nỗi sợ là một thứ gì đó giống tình yêu', 'Answer plainly: fear, and after fear something like love',
        'Người lạ gật đầu chậm, rồi đi một vòng quanh tác phẩm và dừng ở góc bạn ít ngờ nhất. Họ không nói gì, nhưng Maestro mỉm cười lần đầu tiên trong mấy tuần.',
        'The stranger nods slowly, then circles the piece and stops at the angle you least expected. They say nothing, but the Maestro smiles for the first time in weeks.',
        { rep: 7, sanity: -3, network: 4 }, { flagsAdd: ['ring_chased_perfection'] }),
      fg('Nói rằng bạn không muốn họ cảm thấy gì, chỉ muốn họ nhìn', 'Say you want them to feel nothing, only to look', [
        [55, 'Cả bốn người im lặng, rồi một Docent cười khẽ. Đó là câu trả lời mà Ring ít khi nghe, và người lạ ghi nó lại bằng một nét bút. Bạn biết mình đã nói điều gì đó đúng nhưng chưa biết đúng với ai.', 'All four are silent, then one Docent laughs softly. It is an answer the Ring seldom hears, and the stranger notes it with one stroke of the pen. You know you said something true but not yet true for whom.', { rep: 6, sanity: 3, network: 4 }, { flagsAdd: ['ring_kept_conscience'] }],
        [45, 'Người lạ nhíu mày và nói đó là cách của người sợ. Maestro không nói gì, nhưng suốt cả tuần sau ông không đưa việc mới cho bạn.', 'The stranger frowns and says that is the way of someone afraid. The Maestro says nothing, but for the whole week afterward gives you no new work.', { rep: -5, sanity: -4 }, { flagsAdd: ['ring_kept_conscience'] }]
      ]),
      fc('Đáp rằng bạn chưa biết, và bạn muốn nghe họ nói', 'Reply that you do not know and want to hear them',
        'Người lạ nhìn Maestro, và Maestro nhìn bạn. Rồi họ lần lượt nói bốn điều khác nhau về tác phẩm, và không điều nào bạn nghĩ tới. Đêm đó bạn ngồi nhìn nó đến sáng.',
        'The stranger looks at the Maestro, and the Maestro at you for a long time. Then they each say four different things about the piece, none of which you thought of. That night you sit looking at it until dawn.',
        { sanity: 2, rep: 4, network: 6 })
    ], { weight: 11 }),

  fe('ring_patron_portrait', R, [0, 1],
    '[Chân dung cho người ở Nest] Một khách hàng ở Nest ngồi đối diện bạn trong phòng tiếp khách mạ vàng, và đặt trước một bức chân dung của chính họ, không phải bằng sơn. Họ muốn nó giữ lại một thứ mà họ nói họ đang mất. Họ không nói thứ ấy là gì, và đặt một túi Ahn lên bàn để bạn không hỏi.',
    '[A portrait for a Nest patron] A Nest patron sits across from you in a gilded reception room and orders a portrait of themselves, not in paint. They want it to keep something they say they are losing. They do not say what, and set a purse of Ahn on the table so you will not ask.',
    [
      fc('Nhận, và hỏi về thứ họ đang mất trước khi bắt đầu', 'Accept, but ask what they are losing before beginning',
        'Vị khách lặng đi hồi lâu, rồi kể về một đứa con gái họ không còn nhìn mặt. Bạn dành ba tuần nghe họ kể, và khi tác phẩm hoàn thành, họ nhìn nó một lúc và nói đó đúng là thứ họ cần, dù không phải thứ họ yêu cầu.',
        'The patron is silent a long while then speaks of a daughter they no longer see. You spend three weeks listening, and when the piece is finished they look at it long and say it is exactly what they needed, though not what they asked for.',
        { wealth: 14, rep: 7, sanity: -2, network: 5 }, { flagsAdd: ['ring_kept_conscience'] }),
      fg('Nhận ngay, làm đúng như đặt hàng, không hỏi', 'Accept at once and execute exactly as ordered, no questions', [
        [60, 'Tác phẩm hoàn hảo đến mức đáng ngại. Vị khách trả gấp đôi và treo nó trong một căn phòng không có cửa sổ. Bạn nghe nói họ ngồi đó hằng đêm, và không thấy ai nói rằng họ có vẻ hạnh phúc hơn.', 'The piece is perfect to the point of unease. The patron pays double and hangs it in a room with no windows. You hear they sit there every night, and no one says they look happier.', { wealth: 20, rep: 8, sanity: -6, network: 3 }, { flagsAdd: ['ring_chased_perfection'] }],
        [40, 'Vị khách nhìn tác phẩm và nói nó thiếu một thứ, nhưng không nói thiếu gì. Họ từ chối trả phần còn lại, và Maestro nhìn bạn với vẻ thất vọng đã quen.', 'The patron looks at the piece and says something is missing, but not what. They refuse to pay the balance, and the Maestro regards you with accustomed disappointment.', { wealth: 4, rep: -3, sanity: -5 }, { flagsAdd: ['ring_chased_perfection'] }]
      ]),
      fc('Từ chối, nói bạn không làm chân dung cho người chưa biết mình muốn gì', 'Decline, saying you do not portray someone who does not know what they want',
        'Vị khách đứng dậy rất bình tĩnh, lấy lại túi Ahn, và nói họ sẽ tìm người khác. Hai tháng sau, một Docent khác nhận việc ấy, và bạn nghe nói tác phẩm đó bị trả lại.',
        'The patron rises very calmly, takes back the purse, and says they will find someone else. Two months later another Docent takes the job, and you hear the piece was returned.',
        { sanity: 3, rep: 1, wealth: -2 })
    ]),

  fe('ring_opening_night', R, [0, 1],
    '[Đêm khai mạc] Phòng trưng bày mở cửa lần đầu sau ba tháng chuẩn bị. Hai trăm khách mời, ba mươi tác phẩm, và một dãy hành lang tối chỉ dành cho người có thiệp đen. Bạn được giao đứng ở cửa phòng cuối, nơi trưng bày một tác phẩm chưa ai được nhìn trước. Có người đang cố qua mặt bạn.',
    '[Opening night] The gallery opens for the first time after three months’ preparation. Two hundred guests, thirty works, and a dark corridor for holders of black invitations only. You are posted at the last room’s door, where an unseen work is displayed. Someone is trying to get past you.',
    [
      fc('Kiểm tra từng tấm thiệp, không nhường ai', 'Check every invitation and yield to no one',
        'Người cố qua mặt bạn là một nhà phê bình có tiếng, thiệp giả. Bạn mời họ ra ngoài rất lịch sự, và họ cúi đầu thật thấp. Sáng hôm sau, một bài báo ngắn viết rằng cửa phòng cuối được canh bởi người biết nhìn.',
        'The one trying to slip past is a noted critic with a forged card. You ask them out very politely, and they bow low. The next morning a short article says the last room is guarded by someone who knows how to look.',
        { rep: 8, network: 5, sanity: -2 }),
      fg('Cho vị khách vào, đổi lấy một lời hứa', 'Let the guest in in exchange for a promise', [
        [50, 'Nhà phê bình xem tác phẩm một mình trong năm phút, ra ngoài và nói khẽ rằng đó là điều đẹp nhất ông từng thấy. Ông hứa sẽ viết một bài, và giữ lời. Bài viết đưa phòng trưng bày lên một tầm khác.', 'The critic views the piece alone for five minutes, comes out and says softly it is the most beautiful thing they have seen. They promise an article, and keep their word. It lifts the gallery to a different level.', { rep: 10, network: 7, sanity: -3 }],
        [50, 'Nhà phê bình bước ra và không nói gì cả. Hôm sau, một bài viết chê tác phẩm là sự lặp lại của một trường phái cũ, và Maestro gọi bạn lên giải thích vì sao bạn mở cửa.', 'The critic walks out and says nothing at all. The next day an article dismisses the piece as a repeat of an old school, and the Maestro summons you to explain why you opened the door.', { rep: -8, network: -3, sanity: -4 }]
      ]),
      fc('Mời vị khách ngồi xuống trò chuyện, để quên chuyện cửa phòng', 'Invite the guest to sit and talk, letting the door be forgotten',
        'Hai người nói chuyện về hội họa cổ suốt cả buổi tối. Người ấy đi mà không cố qua cửa, và trước khi rời họ để lại một tấm danh thiếp ghi một số điện thoại riêng. Bạn thấy mình ấm lên một cách kỳ lạ.',
        'The two of you talk of old painting all evening. The person leaves without attempting the door, and before going leaves a card with a private number. You feel oddly warm.',
        { sanity: 4, network: 7, rep: 3 })
    ]),

  fe('ring_stolen_masterpiece', R, [1, 3],
    '[Tác phẩm biến mất] Sáng nay, một tác phẩm treo ở sảnh chính của The Ring không còn ở đó. Không có dấu hiệu đột nhập, không vết kính vỡ. Chỉ còn một sợi dây thép treo lủng lẳng, và dưới sàn, một vệt sơn đỏ dài như một bước chân. Curator giao bạn tìm ra trước tối nay.',
    '[The masterpiece vanishes] This morning a piece hung in the Ring’s main hall is gone. No sign of break-in, no glass shattered. Only a steel wire dangling, and on the floor a red paint streak long as a footstep. The Curator tells you to find it by tonight.',
    [
      fg('Lần theo vệt sơn, kiểm tra từng cửa', 'Follow the paint streak and check every door', [
        [55, 'Vệt sơn dẫn đến phòng của một Docent trẻ. Cậu ta đang ngồi bên tác phẩm, khóc không thành tiếng, và nói chỉ muốn nhìn nó thêm một đêm nữa. Bạn không nỡ báo cáo ngay.', 'The paint streak leads to a young Docent’s room. They sit beside the piece weeping without sound, saying only that they wanted one more night with it.', { rep: 4, sanity: -4, network: 5 }, { flagsAdd: ['ring_kept_conscience'] }],
        [45, 'Vệt sơn dẫn ra một lối thoát ngầm, và bạn mất cả ngày tìm kiếm. Đến tối, tác phẩm vẫn chưa được tìm thấy, và Curator ghi lại sự thất vọng của mình bằng một nét viết rất nhỏ.', 'The paint trail runs to an underground exit, and you lose the whole day searching. By night the piece is still unfound, and the Curator notes their disappointment in a very small hand.', { rep: -5, sanity: -5 }]
      ]),
      fc('Báo ngay Curator rằng bạn biết kẻ nào làm', 'Tell the Curator at once you know who did it',
        'Curator nghe xong, và mời Docent trẻ lên gặp ngay trong buổi chiều. Cuộc nói chuyện kéo dài ba giờ. Khi cậu bước ra, cậu không còn mang tên Docent nữa, và bạn không biết nên cảm thấy thế nào.',
        'The Curator hears you out and summons the young Docent that afternoon. The conversation runs three hours. When they emerge, they no longer bear the title of Docent, and you do not know how to feel.',
        { rep: 6, sanity: -7, network: -4 }, { flagsAdd: ['ring_chased_perfection'] }),
      fc('Tự mang một bản sao đến treo thay để che việc đó', 'Hang a copy yourself to cover the absence',
        'Không ai nhận ra bản sao trong ba tuần. Đến tuần thứ tư, một Maestro đi qua, dừng lại, và chỉ vào góc dưới bên phải. Ông không nói gì thêm, nhưng nhìn bạn đúng một cái.',
        'No one notices the copy for three weeks. In the fourth, a Maestro passes, stops, and points to the lower right corner. They say nothing more, but give you exactly one look.',
        { rep: -6, sanity: -6, heat: 3 })
    ], { age: [26, 90] }),

  fe('ring_rival_sabotage', R, [1, 3],
    '[Phá hoại từ phòng tranh bên cạnh] Một phòng trưng bày đối thủ ở cùng khu của The Ring vừa bị hư hỏng: ba tác phẩm bị đổ axit vào đêm trước ngày mở cửa. Họ đổ lỗi cho Ring. Curator cười nhạt, nói không phải bên ta, nhưng ai đó sẽ phải chứng minh điều đó.',
    '[Sabotage from the neighboring gallery] A rival gallery in the Ring’s district has just been damaged: three works doused with acid the night before opening. They blame the Ring. The Curator smiles thinly, says it was not us, but someone must prove it.',
    [
      fc('Điều tra, mời cả hai bên cùng xem bằng chứng', 'Investigate and invite both sides to view the evidence',
        'Bạn tìm thấy dấu chân của một thợ dựng khung bị đối thủ mua chuộc. Khi trình bằng chứng, cả hai bên im lặng. Đối thủ xin lỗi bằng một chiếc phong bì và một tác phẩm tặng, và Curator treo nó ở góc sảnh.',
        'You find the footprints of a frame builder bribed by the rival. When the evidence is shown both sides fall silent. The rival apologizes with an envelope and a gifted piece, and the Curator hangs it in a corner of the hall.',
        { rep: 7, network: 6, wealth: 6, sanity: -2 }),
      fg('Dùng cuộc điều tra để làm khó đối thủ thêm một chút', 'Use the investigation to press the rival a little further', [
        [55, 'Phòng đối thủ phải đóng cửa hai tháng vì kiểm tra giấy phép. Ring hưởng lợi, và bạn nhận một phần thưởng. Nhưng một Docent già nhìn bạn rất lâu khi bạn đi qua hành lang.', 'The rival gallery must close two months for licence checks. The Ring profits, and you receive a bonus. But an old Docent watches you a long while as you pass in the corridor.', { wealth: 10, rep: 4, sanity: -6, heat: 4 }, { flagsAdd: ['ring_chased_perfection'] }],
        [45, 'Cuộc điều tra bị lộ là động cơ cá nhân. Curator buộc bạn công khai xin lỗi trước đối thủ, và bạn cảm thấy mặt mình nóng đến tận gáy.', 'The investigation is exposed as personally motivated. The Curator makes you publicly apologize to the rival, and you feel your face burn to the nape.', { rep: -9, sanity: -5 }, { flagsAdd: ['ring_chased_perfection'] }]
      ]),
      fc('Báo là bạn chưa tìm được gì và để Curator xử lý', 'Report you found nothing and leave it to the Curator',
        'Curator thở dài và tự mình đến phòng đối thủ, mang theo một chai rượu cũ. Hai người ngồi nói chuyện với nhau đến đêm, và sáng hôm sau mọi lời buộc tội biến mất như chưa từng có.',
        'The Curator sighs and goes in person to the rival gallery, carrying an old bottle. The two sit talking until night, and by morning every accusation has vanished as if never made.',
        { sanity: 1, rep: -2 })
    ], { age: [26, 90] }),

  fe('ring_model_wants_out', R, [0, 1],
    '[Người mẫu muốn rời đi] Một người từng ký hợp đồng làm mẫu cho Ring ba năm trước đến gặp bạn vào đêm muộn. Họ đã thay đổi, nói họ muốn rời đi, và đưa bạn một lá thư viết tay. Hợp đồng không có điều khoản nào cho phép điều đó, và họ biết rõ bạn biết.',
    '[A model who wants to leave] A person who signed a contract as model for the Ring three years ago visits you late at night. They have changed, say they want to leave, and hand you a handwritten letter. The contract has no clause allowing it, and they know you know.',
    [
      fg('Đưa lá thư lên Maestro và xin phép thả người', 'Bring the letter to the Maestro and ask for release', [
        [55, 'Maestro đọc, rồi gấp lá thư lại và nói hợp đồng này đã hết hiệu lực từ lâu, chỉ chưa ai báo. Người mẫu rời đi vào sáng hôm sau với một chiếc va-li nhỏ, và quay lại một lần chỉ để cúi chào bạn.', 'The Maestro reads a long time, then folds the letter and says the contract lapsed long ago, only no one reported it. The model leaves the next morning with a small suitcase, and returns once only to bow to you.', { rep: 5, sanity: 5, network: 5 }, { flagsAdd: ['ring_kept_conscience'] }],
        [45, 'Maestro nghe và lạnh lùng nói hợp đồng là hợp đồng. Người mẫu không bao giờ quay lại. Bạn nghe tin họ được thấy lần cuối ở một cầu bên sông, và không ai hỏi thêm.', 'The Maestro listens and says coldly that a contract is a contract. The model never returns. You hear they were last seen at a bridge by the river, and no one asks more.', { rep: -3, sanity: -10 }, { flagsAdd: ['ring_kept_conscience'] }]
      ]),
      fc('Âm thầm giúp họ trốn khỏi khu vực', 'Quietly help them slip out of the district',
        'Bạn đưa họ ra khỏi một cổng phụ lúc ba giờ sáng, với một ít tiền và một cái tên mới. Người ấy không nói gì cả quãng đường, chỉ khi chia tay nắm tay bạn một lúc hồi lâu. Maestro biết, và không nói.',
        'You take them out through a side gate at three in the morning with some money and a new name. They say nothing the whole way, only at parting hold your hand a long time. The Maestro knows,.',
        { sanity: 4, network: 5, rep: -3, wealth: -5, heat: 4 }, { flagsAdd: ['ring_kept_conscience'] }),
      fc('Từ chối, nói bạn không thể làm gì', 'Refuse, saying there is nothing you can do',
        'Người ấy cúi đầu, như đã đoán trước, và đi về phía bóng tối của hành lang. Từ hôm ấy, mỗi khi bạn đứng trước một tác phẩm, bạn nhớ đến cái dáng lưng cúi ấy.',
        'The person nods as if expecting it and walks into the dark of the corridor. From that day each time you stand before a work, you remember that bowed back.',
        { sanity: -8, rep: 1 }, { flagsAdd: ['ring_chased_perfection'] })
    ]),

  fe('ring_harsh_critic', R, [1, 1],
    '[Nhà phê bình khắc nghiệt] Một nhà phê bình nổi tiếng vì chưa bao giờ khen đến thăm Ring và ngồi cả buổi chiều trước một tác phẩm của bạn mà không nói. Khi đứng dậy, ông ta lấy ra một cuốn sổ nhỏ và viết hai chữ. Ông ta không cho ai xem, và để lại cuốn sổ trên ghế như một lời thách thức.',
    '[The harsh critic] A critic famous for never praising visits the Ring and sits a whole afternoon before one of your works without a word. When rising, he draws out a small notebook and writes two words. He shows no one, and leaves the notebook on the chair like a challenge.',
    [
      fc('Mở cuốn sổ và đọc hai chữ', 'Open the notebook and read the two words',
        'Hai chữ ấy là: Chưa đủ. Bạn đứng nhìn chúng một lúc, rồi cất sổ vào ngăn kéo. Cả năm sau bạn không tặng một tác phẩm nào cho ai, vì bạn chưa muốn nó đủ.',
        'The two words are: Not enough. You stare at them a long time, then put the notebook in a drawer. For the whole next year you give no piece to anyone, because you do not want it to be enough yet.',
        { sanity: -5, rep: 3, network: 2 }, { flagsAdd: ['ring_chased_perfection'] }),
      fg('Chạy theo trả lại cuốn sổ, chưa mở', 'Run after him to return the notebook unopened', [
        [55, 'Nhà phê bình dừng lại ở cửa, nhìn cuốn sổ trong tay bạn, và mỉm cười lần đầu tiên bạn từng thấy. Ông nhận lại, và nói hai chữ ấy không dành cho tác phẩm, mà dành cho bất kỳ ai không dám mở nó.', 'The critic stops at the door, looks at the notebook in your hand, and smiles for the first time you have seen. He takes it back and says the two words were not about the work but for anyone who does not dare open it.', { rep: 8, sanity: 3, network: 6 }, { flagsAdd: ['ring_kept_conscience'] }],
        [45, 'Nhà phê bình đã đi xa, và bạn mất cả buổi chiều lần theo ông qua ba phố. Khi bạn tìm thấy, ông đã quên mất cuốn sổ nào.', 'The critic is long gone, and you lose the whole afternoon trailing him through three streets. When you find him, he has forgotten which notebook.', { rep: -3, sanity: -3 }]
      ]),
      fc('Đốt cuốn sổ, không đọc', 'Burn the notebook unread',
        'Bạn đốt nó trong lò sưởi của Atelier. Hai chữ ấy không bao giờ được đọc, và cả đời sau bạn thấy mình tự bịa ra những lời phê bình tệ hơn bất kỳ lời nào ông ta có thể viết.',
        'You burn it in the Atelier’s fireplace. The two words are never read, and for the rest of your life you invent critiques worse than any he could have written.',
        { sanity: -6, rep: 2 }, { flagsAdd: ['ring_chased_perfection'] })
    ], { age: [28, 90] }),

  fe('ring_apprentice_audition', R, [1, 3],
    '[Thử việc cho ba người xin học] Ba người xin vào làm học việc ở Atelier của bạn, và Maestro bảo bạn chọn một. Một người có tay nghề điêu luyện nhưng nhìn tác phẩm như nhìn hàng hóa. Một người vụng về nhưng khóc khi thấy một bức tượng. Một người không nói gì, chỉ ngồi nhìn bạn làm việc suốt ba tiếng.',
    '[Auditioning three applicants] Three people apply to apprentice at your Atelier, and the Maestro tells you to choose one. One has masterful hands but looks at works as goods. One is clumsy but weeps on seeing a statue. One says nothing and simply sits watching you work three hours.',
    [
      fc('Chọn người có tay nghề điêu luyện', 'Choose the one with masterful hands',
        'Học việc ấy học nhanh hơn bất kỳ ai bạn từng dạy. Một năm sau, họ làm ra một tác phẩm đẹp đến mức bạn không dám nhìn lâu, vì nó không có gì của một con người trong đó.',
        'The apprentice learns faster than anyone you have taught. A year later they make a piece so beautiful you dare not look long, because there is nothing human in it.',
        { rep: 6, sanity: -4, network: 3 }, { flagsAdd: ['ring_chased_perfection'] }),
      fc('Chọn người vụng về mà khóc', 'Choose the clumsy one who weeps',
        'Học việc phải mất hai năm để dựng được một tác phẩm đứng vững. Nhưng khi nó xong, một người lạ đứng trước nó và khóc cùng một kiểu, rất khẽ. Bạn biết mình đã chọn đúng, dù không ai trong Ring nói thế.',
        'The apprentice takes two years to assemble a work that stands. But when it is done, a stranger stands before it and weeps in the same quiet way. You know you chose right, though no one in the Ring says so.',
        { sanity: 4, rep: 3, network: 5, wealth: -4 }, { flagsAdd: ['ring_kept_conscience'] }),
      fg('Chọn người ngồi nhìn không nói', 'Choose the silent one who only watched', [
        [55, 'Học việc im lặng ấy hóa ra có một khả năng bạn không ngờ: nhìn một tác phẩm và thấy ngay chỗ nào nó đang nói dối. Cả Atelier học dần cách đặt câu hỏi từ người ấy.', 'The silent apprentice turns out to have an ability you did not expect: to see at a glance where a work is lying. The whole Atelier slowly learns to ask questions from them.', { rep: 8, sanity: 2, network: 6 }],
        [45, 'Học việc ấy ở lại ba tháng, rồi biến mất một buổi sáng, để lại một mảnh giấy chỉ có bảy chữ: Tôi đã nhìn đủ. Cảm ơn vì đã cho tôi nhìn.', 'The apprentice stays three months, then vanishes one morning, leaving a slip with just a few words: I have seen enough. Thank you for letting me look.', { sanity: -4, rep: 1 }]
      ])
    ], { age: [28, 90] }),

  fe('ring_restoring_the_damaged', R, [0, 1],
    '[Phục dựng một tác phẩm hư hại] Một tác phẩm cũ của The Ring, nặng hơn hai mươi năm tuổi, bị nứt sau một đợt rét. Curator giao bạn phục dựng nó. Công việc cần ba tháng, với tay nghề mà bạn chưa chắc có. Mỗi nét của tác phẩm là của một người đã mất, và bạn đang chạm vào từng người một.',
    '[Restoring a damaged work] An old work of the Ring, over twenty years old, has cracked after a cold snap. The Curator tasks you with restoring it. The work needs three months, with a craft you are not sure you possess. Each stroke belongs to someone dead, and you are touching them one by one.',
    [
      fc('Làm chậm, từng ngày một, không sợ lâu', 'Work slowly, a day at a time, unafraid of how long',
        'Đến tháng thứ ba bạn nhận ra mình đã bắt đầu hiểu nét viết của từng người đi trước. Khi hoàn thành, một Docent già đứng trước tác phẩm và nói bà không thể tìm ra chỗ nào được sửa. Đó là lời khen cao nhất trong nghề.',
        'By the third month you realize you have begun to understand each earlier hand. When finished, an old Docent stands before the work and says she cannot find any place that was mended. It is the highest praise in the craft.',
        { rep: 9, sanity: 3, network: 4, wealth: 4 }, { meritAdd: 4 }),
      fg('Đẩy nhanh để kịp hạn, chấp nhận một vài vết lộ ra', 'Rush to meet the deadline, accepting a few visible seams', [
        [55, 'Tác phẩm được bàn giao đúng hạn, và Curator không nói gì. Nhưng trong một buổi chiều sau đó, bạn thấy một Maestro đứng thật lâu ở chỗ bạn đã vội, và không nhìn bạn.', 'The piece is delivered on time, and the Curator says nothing. But one afternoon afterward you see a Maestro standing long at the place you rushed, not looking at you.', { rep: 2, sanity: -5, wealth: 3 }, { flagsAdd: ['ring_chased_perfection'] }],
        [45, 'Vết nứt mới xuất hiện đúng một tuần sau khi tác phẩm được treo lại, và Curator yêu cầu bạn làm lại từ đầu, không công.', 'A new crack appears exactly one week after the work is rehung, and the Curator orders you to redo it from the start, unpaid.', { rep: -7, sanity: -6, wealth: -6 }, { flagsAdd: ['ring_chased_perfection'] }]
      ]),
      fc('Nhờ Maestro cho một người hỗ trợ', 'Ask the Maestro to assign you a helper',
        'Maestro cho bạn một học việc, và hai người làm việc thay phiên nhau đến khuya. Cả hai học được rất nhiều từ lỗi của nhau, và tác phẩm trở lại hành lang theo cách không ai nhận ra một người nào đã chạm vào nó.',
        'The Maestro grants you an apprentice, and the two of you work in shifts into the night. Both learn a great deal from each other’s errors, and the work returns to the corridor in a way no one can tell a single hand touched it.',
        { rep: 6, sanity: 2, network: 7 })
    ]),

  fe('ring_auction_shipping', R, [1, 3],
    '[Chuyển một tác phẩm qua cửa kiểm soát] Một tác phẩm đã được bán trong buổi đấu giá riêng, và người mua ở bên kia ranh giới Nest. Bạn phải mang nó qua ba cửa kiểm soát mà không được mở bọc vải. Mỗi cửa có một lính gác khác nhau, và mỗi người sẽ hỏi bạn cùng một câu theo cách khác nhau.',
    '[Moving a piece through checkpoints] A work has been sold at a private auction, and the buyer lives beyond the Nest boundary. You must carry it through three checkpoints without opening the cloth. Each has a different guard, and each will ask you the same question in a different way.',
    [
      fc('Trả lời thật, nhưng bỏ bớt chi tiết', 'Answer truthfully but leave out details',
        'Cửa đầu tiên cho qua dễ dàng. Cửa thứ hai bị giữ nửa giờ vì giấy tờ. Cửa thứ ba, lính gác nhìn chiếc hộp rất lâu, rồi hỏi đây có phải là nghệ thuật không. Bạn nói phải, và anh ta gật đầu như đã nghe đủ.',
        'The first lets you through easily. The second holds you half an hour over papers. At the third, the guard stares at the crate a long time then asks whether this is art. You say yes, and he nods as if he has heard enough.',
        { rep: 5, wealth: 8, sanity: -3, network: 3 }),
      fg('Đưa một khoản nhỏ cho mỗi lính gác', 'Slip each guard a small sum', [
        [60, 'Cả ba cửa mở ra gần như ngay lập tức. Tác phẩm đến nơi đúng hạn, và người mua trả thưởng thêm. Nhưng suốt đường về bạn nghĩ về việc mọi cửa đều có một giá.', 'All three open almost at once. The work arrives on time, and the buyer adds a bonus. But all the way home you think about how every door has a price.', { wealth: 14, rep: 4, sanity: -4, heat: 3 }, { flagsAdd: ['ring_chased_perfection'] }],
        [40, 'Một lính gác từ chối tiền và gọi cấp trên. Tác phẩm bị giữ lại ba ngày, và Curator phải đích thân đến giải thích.', 'One guard refuses the money and calls a superior. The work is held three days, and the Curator must come in person to explain.', { rep: -7, wealth: -5, sanity: -4, heat: 6 }, { flagsAdd: ['ring_chased_perfection'] }]
      ]),
      fc('Từ chối đi, nhờ người khác có giấy phép tốt hơn', 'Decline and ask someone with better papers',
        'Người khác nhận việc, và tác phẩm được chuyển trong một buổi chiều. Bạn không nghe ai nói thêm, nhưng Curator ghi rằng lần sau bạn nên tự đảm nhận.',
        'Someone else takes the task, and the work is moved in one afternoon. You hear no more, but the Curator notes that next time you should handle it yourself.',
        { sanity: 2, rep: -3 })
    ], { age: [26, 90] }),

  fe('ring_pigment_from_outskirts', R, [0, 1],
    '[Sắc tố từ Outskirts] Maestro cần một thứ sắc tố chỉ tìm được ở Outskirts, một màu đỏ nâu mà ông nói là màu của đất sau cơn mưa đầu tiên. Bạn phải đi cùng một đoàn buôn, và người dẫn đường nói thứ này không nằm trong sổ của ai. Không ai biết nó thật sự là gì.',
    '[Pigment from the Outskirts] The Maestro needs a pigment found only in the Outskirts, a red-brown he calls the color of earth after the first rain. You must go with a trade caravan, and the guide says this thing is in no one’s ledger. No one knows what it truly is.',
    [
      fg('Đi cùng đoàn buôn, lấy mẫu từ nơi họ chỉ', 'Go with the caravan and collect from where they point', [
        [55, 'Bạn mang về một ống nhỏ mà đất trong đó vẫn còn ẩm. Maestro nhìn nó và nói đó chính là màu ông cần, chưa từng thấy chính xác như thế. Ông dùng nó cho một tác phẩm, và không cho ai biết nguồn gốc.', 'You bring back a small tube whose earth is still damp. The Maestro looks at it a long while and says that is exactly the color he needs, never seen so precisely. He uses it in a work and tells no one the source.', { rep: 8, sanity: -2, health: -4, network: 4 }],
        [45, 'Chuyến đi gặp bão cát, và bạn mất hai ngày trong một hầm trú ẩn. Khi về, mẫu bạn mang không đúng màu, và Maestro nhìn nó mà không giận, chỉ lặng lẽ cất đi.', 'The trip meets a sandstorm, and you lose two days in a shelter cellar. When you return, the sample is not the right color, and the Maestro looks at it without anger, only silently putting it away.', { rep: -2, health: -8, sanity: -4 }]
      ]),
      fc('Từ chối đi, nói rằng màu không đáng cái giá của chuyến đi', 'Refuse, saying no color is worth the trip',
        'Maestro nhìn bạn với vẻ khó đoán, rồi cử một Docent khác. Người ấy trở về sau hai tháng, gầy rộc, mang theo thứ sắc tố và một vết sẹo mới. Bạn thấy hơi hổ thẹn.',
        'The Maestro regards you inscrutably, then sends another Docent. They return after two months, gaunt, carrying the pigment and a new scar. You feel mildly ashamed.',
        { sanity: -1, rep: -4 }),
      fc('Đề nghị tìm một sắc tố thay thế trong thành phố', 'Propose finding a substitute in the City',
        'Bạn thử bốn mươi mẫu trong ba tuần và tìm ra một hỗn hợp gần giống. Maestro nhìn bức tranh và nói nó không phải màu ông muốn, nhưng ông chưa từng thấy ai pha màu như thế. Ông dùng nó trong một tác phẩm khác.',
        'You try forty samples over three weeks and find a mix that comes close. The Maestro looks at the work and says it is not the color he wanted, but he has never seen anyone mix like that. He uses it in another piece.',
        { rep: 6, sanity: 2, network: 4, wealth: -4 })
    ]),

  fe('ring_unveiling_at_dawn', R, [1, 3],
    '[Lễ lộ diện lúc bình minh] Tác phẩm lớn nhất của Atelier phải được kéo màn lúc sáu giờ sáng, trước mặt Curator và hai mươi khách mời. Đêm trước, bạn thấy một chi tiết ở góc dưới bên trái mà bạn không nhớ đã làm. Nó nhìn như một tên người, nhưng bạn không đọc được.',
    '[Unveiling at dawn] The Atelier’s largest work must be unveiled at six in the morning before the Curator and twenty guests. The night before, you notice a detail at the lower left you do not remember making. It looks like a name, but you cannot read it.',
    [
      fc('Kéo màn đúng giờ, để chi tiết ấy nằm đó', 'Unveil on time and let the detail remain',
        'Khi tấm màn rơi xuống, một người trong số khách mời nấc lên khe khẽ và đưa tay che miệng. Bà ta không giải thích. Curator nhìn bạn với một vẻ rất bình thản, và bạn biết đã có ai đó đọc được cái tên ấy.',
        'As the cloth falls, one of the guests gasps softly and covers her mouth. She offers no explanation. The Curator looks at you with a very calm expression, and you know someone has read that name.',
        { rep: 8, sanity: -6, network: 4 }),
      fg('Xóa chi tiết ấy trước giờ lộ diện', 'Erase the detail before the unveiling', [
        [50, 'Chi tiết biến mất dưới ngón tay bạn, nhưng lúc kéo màn, một người khách cau mày nhìn chỗ đã xóa, như thấy một khoảng trống nơi lẽ ra phải có điều gì. Ông ta không hỏi, chỉ ghi chú một chữ.', 'The detail vanishes under your finger, but at the unveiling one guest frowns at the erased place, as though seeing a void where something should be. He asks nothing, only notes a word.', { rep: 3, sanity: -4 }],
        [50, 'Khi bạn xóa, một vết nứt nhỏ mở ra ở đúng chỗ đó. Cả tác phẩm không thể kéo màn được nữa, và Curator hoãn buổi lễ sang tuần sau.', 'As you erase, a small crack opens at that very spot. The whole work cannot be unveiled now, and the Curator postpones the ceremony to next week.', { rep: -8, sanity: -7, wealth: -4 }]
      ]),
      fc('Báo Curator ngay trước giờ lộ diện', 'Tell the Curator just before the unveiling',
        'Curator nhìn chi tiết hồi lâu, rồi nói ông đã biết nó ở đó từ lúc bạn bắt đầu. Ông bảo bạn không được xóa. Ring không có quyền cải chính điều tác phẩm tự nói.',
        'The Curator studies the detail a long while, then says he has known it was there since you began. He tells you not to erase it. The Ring has no right to correct what a work says by itself.',
        { rep: 6, sanity: -3, network: 5 })
    ], { age: [28, 90] }),

  fe('ring_maestro_breakdown', R, [1, 3],
    '[Maestro kiệt sức] Maestro của bạn bắt đầu quên tên những tác phẩm mình làm ra và gọi bạn bằng tên của một Docent đã mất. Cả Atelier biết, và không ai nói. Một buổi chiều ông đứng im trước một tấm bố trắng, tay cầm cây cọ, và hỏi bạn thì thầm: Tôi đang vẽ ai?',
    '[The Maestro falters] Your Maestro begins forgetting the names of their own works and calls you by the name of a dead Docent. The whole Atelier knows and no one speaks. One afternoon they stand motionless before a blank canvas, brush in hand, and whisper to you: Whom am I painting?',
    [
      fc('Nói tên của một người và đưa tay đỡ ông', 'Say a name and steady their arm',
        'Bạn nói tên Docent đã mất. Maestro gật đầu rất chậm, và nét đầu tiên trên tấm bố trắng hiện ra như một lời chào cũ. Ông vẽ đến tối, và đó là tác phẩm cuối cùng ông từng hoàn thành.',
        'You say the dead Docent’s name. The Maestro nods very slowly, and the first stroke appears on the blank canvas like an old greeting. They paint until dark, and it is the last work they ever finish.',
        { sanity: -5, rep: 6, network: 5 }, { flagsAdd: ['ring_kept_conscience'] }),
      fg('Báo Curator để chuyển Maestro sang nghỉ', 'Tell the Curator to have the Maestro rest', [
        [55, 'Curator đồng ý một cách nhẹ nhàng, và Maestro được đưa về căn phòng nhỏ có cửa sổ nhìn ra vườn. Ông không phản đối, và mỗi chiều bạn đến ngồi cạnh ông, nghe ông kể về những tác phẩm ông tin là mình chưa từng làm.', 'The Curator agrees gently, and the Maestro is moved to a small room with a window to the garden. They do not object, and each afternoon you sit beside them hearing about works they believe they never made.', { rep: 5, sanity: -4, network: 6 }],
        [45, 'Maestro nghe tin và nổi giận một cách đột ngột, ném cây cọ vào tường. Rồi ông khóc. Bạn không bao giờ quên cảnh hai bàn tay ấy run trên nền sàn sơn loang.', 'The Maestro hears and flares up suddenly, flinging the brush at the wall. Then they weep. You never forget the sight of those two hands shaking on the paint-smeared floor.', { rep: -2, sanity: -8 }]
      ]),
      fc('Giả vờ không thấy, tiếp tục làm việc của mình', 'Pretend not to notice and continue your own work',
        'Bạn ghi lại từng điều Maestro quên, bí mật, trong một cuốn sổ riêng. Một năm sau, khi ông không còn nhận ra ai, cuốn sổ ấy là thứ duy nhất giữ lại những gì ông từng biết.',
        'You secretly note everything the Maestro forgets in a private notebook. A year later, when they no longer recognize anyone, that notebook is the only thing keeping what they once knew.',
        { sanity: -4, rep: 3, network: 3 })
    ], { age: [30, 90] }),

  fe('ring_viewer_who_weeps', R, [0, 3],
    '[Người xem khóc] Một vị khách già đứng trước tác phẩm của bạn suốt ba tiếng, và không rời mắt. Khi gần đóng cửa, ông ta tìm bạn, và nói tác phẩm ấy giống con gái đã mất của ông. Ông muốn mua nó, dù chỉ có thể trả một phần mười giá. Bạn biết nó đáng giá hơn thế rất nhiều.',
    '[The viewer who weeps] An elderly guest stands before your work for three hours without taking his eyes off it. Near closing he seeks you out and says it resembles his daughter who died. He wants to buy it, though he can pay only a tenth of the price. You know it is worth far more.',
    [
      fc('Bán cho ông với giá ông có thể trả', 'Sell it to him at what he can pay',
        'Ông ấy trả bằng tiền lẻ, đếm từng đồng, tay run. Bạn mang tác phẩm đến nhà ông bằng xe kéo, và ông đặt nó trước cửa sổ nhìn ra vườn. Curator nghe tin và chỉ nhướn mày.',
        'He pays in small coins, counting each, hands trembling. You carry the work to his home by cart, and he sets it before a window overlooking the garden. The Curator hears of it and only raises an eyebrow.',
        { wealth: -6, sanity: 6, rep: 4, network: 5 }, { flagsAdd: ['ring_kept_conscience'] }),
      fg('Giữ giá, giải thích cho ông hiểu', 'Hold the price and explain it to him', [
        [55, 'Ông cúi đầu, mỉm cười buồn, và cảm ơn bạn vì đã nói thật. Ông không mua, nhưng ba ngày liền ông quay lại đứng trước tác phẩm một lúc ngắn. Đến ngày thứ tư ông không đến, và bạn thấy hụt hẫng.', 'He nods, smiles sadly, and thanks you for being honest. He does not buy, but for three days running returns to stand before the work a short while. On the fourth day he does not come, and you feel a hollow.', { sanity: -3, rep: 3 }, { flagsAdd: ['ring_chased_perfection'] }],
        [45, 'Ông đưa cho bạn một phong bì dày hơn số ông nói, và biến mất vào đám đông. Bạn đếm tiền và nhận ra ông đã bán thứ gì đó rất quý để có số này.', 'He hands you an envelope thicker than he said and vanishes into the crowd. You count the money and realize he sold something precious to afford it.', { wealth: 14, sanity: -7, rep: 2 }, { flagsAdd: ['ring_chased_perfection'] }]
      ]),
      fc('Tặng ông tác phẩm, nói đó là quà', 'Give him the work as a gift',
        'Ông không biết nói gì, chỉ nắm tay bạn một lúc. Curator nghe tin và khóa phòng bạn lại ba ngày. Khi mở ra, bạn thấy trên bàn một mảnh giấy: Đừng lặp lại. Nhưng nét chữ ấy có vẻ rất mệt, chứ không giận.',
        'He does not know what to say, only holds your hand a long time. The Curator hears and locks your studio three days. When it opens you find a slip on the desk: Do not repeat. But the hand looks tired rather than angry.',
        { wealth: -10, sanity: 7, rep: -3, network: 6 }, { flagsAdd: ['ring_kept_conscience'] })
    ]),

  fe('ring_docent_dispute', R, [1, 3],
    '[Hai Docent tranh một ghế] Hai Docent giỏi nhất của Atelier cùng muốn trở thành Maestro, và Curator bảo mỗi người phải dựng một tác phẩm trước hội đồng. Không ai ngạc nhiên khi cả hai cùng đến tìm bạn để nhờ giúp. Một người từng giúp bạn lúc đầu, người kia chưa bao giờ.',
    '[Two Docents, one chair] The Atelier’s two best Docents both want to become Maestro, and the Curator says each must construct a work before the council. No one is surprised when both come to you for help. One helped you when you began, the other never did.',
    [
      fc('Giúp người từng giúp bạn', 'Help the one who helped you',
        'Người ấy làm một tác phẩm đẹp, nhưng hội đồng chọn người kia. Cả hai nhìn bạn khác nhau sau đó: một người với sự biết ơn lặng lẽ, người kia với một sự nghi ngờ.',
        'They produce a lovely work, but the council chooses the other. Both look at you differently afterward: one with quiet gratitude, the other with suspicion.',
        { rep: 3, network: 4, sanity: -3 }),
      fg('Giúp người chưa bao giờ giúp bạn', 'Help the one who never did', [
        [55, 'Người ấy thắng, và nhìn bạn với vẻ bối rối kỳ lạ, như thể không hiểu vì sao bạn giúp. Người kia không nói gì với bạn trong một năm, rồi gửi một mảnh giấy cảm ơn vì đã không giúp mình thắng bằng cách bất công.', 'They win, and look at you with strange bewilderment, as if unable to see why you helped. The other says nothing to you for a year, then sends a slip thanking you for not helping win unfairly.', { rep: 6, sanity: 2, network: 5 }, { flagsAdd: ['ring_kept_conscience'] }],
        [45, 'Người ấy thua, và người kia lên ghế. Cả hai coi bạn là kẻ đứng giữa không chọn phe, và đối xử với bạn như thế suốt vài năm.', 'They lose, and the other takes the chair. Both regard you as someone standing between with no side, and treat you that way for years.', { rep: -4, network: -5, sanity: -4 }]
      ]),
      fc('Từ chối cả hai, nói bạn không nên can dự', 'Refuse both, saying you should not interfere',
        'Cả hai nhìn bạn rất lâu, rồi cùng đi. Hội đồng chọn một người, và người còn lại rời Atelier. Bạn không bao giờ biết mình đúng hay sai, nhưng cả hai đều tránh bạn.',
        'Both look at you a long while and leave together. The council picks one, and the other leaves the Atelier. You never know if you were right or wrong, but both avoid you.',
        { sanity: -4, rep: -2, network: -4 })
    ], { age: [28, 90] }),

  fe('ring_signature_stamp', R, [2, 3],
    '[Con dấu của bạn] Curator thông báo mỗi Maestro phải thiết kế một con dấu để khắc vào tác phẩm của mình. Một dấu duy nhất, nhỏ như đầu ngón tay, dùng đến hết đời. Bạn ngồi trước tờ giấy trắng ba đêm, vẽ rồi xóa, vẽ rồi xóa, và chưa biết mình muốn người ta nhớ mình thế nào.',
    '[Your seal] The Curator announces that every Maestro must design a seal to stamp their works. A single mark, small as a fingertip, for life. You sit before a blank sheet three nights, drawing and erasing, drawing and erasing, unsure how you wish to be remembered.',
    [
      fc('Vẽ một hình rất đơn giản: một đường cong khuyết', 'Draw something very simple: a curve with a gap',
        'Curator xem và gật đầu mà không nói. Con dấu đó xuất hiện trên mọi tác phẩm bạn làm, và dần dần người ta nhận ra nó từ xa. Một nhà sưu tập nói hình ấy gợi ông nhớ đến một vòng tay chưa khép.',
        'The Curator inspects and nods without a word. That seal appears on every work you make, and gradually people recognize it from afar. A collector says the shape reminds him of an embrace not yet closed.',
        { rep: 7, sanity: 3, network: 4 }, { flagsAdd: ['ring_kept_conscience'] }),
      fc('Vẽ một hình rất phức tạp để người ta phải nhìn kỹ', 'Draw something intricate so people must look closely',
        'Con dấu tốn bảy ngày để khắc, và mỗi lần đóng lên tác phẩm mất cả giờ. Người ta nể bạn vì sự kỳ công, nhưng đến năm thứ năm bạn nhận ra mình ghét nó.',
        'The seal takes seven days to carve, and each stamping takes an hour. People respect you for the craft, but by the fifth year you realize you hate it.',
        { rep: 5, sanity: -4, network: 2 }, { flagsAdd: ['ring_chased_perfection'] }),
      fc('Dùng tên của một người đã mất làm con dấu', 'Use a dead person’s name as the seal',
        'Bạn khắc tên người ấy bằng nét chữ thật nhỏ. Curator nhìn, rồi chỉ nói: Người ấy sẽ không bằng lòng.',
        'You carve the person’s name in very small script. The Curator looks a long while, then only says: They would not approve.',
        { sanity: -6, rep: 4, network: 3 })
    ], { age: [30, 90] }),

  // ------------------------------------------------------------------ consequences
  fe('ring_perfection_cost', R, [1, 3],
    '[Cái giá của sự hoàn hảo] Tác phẩm hoàn hảo nhất bạn từng làm được mua bởi một người sưu tập ở Nest, và ông ta mời bạn đến xem nó treo. Phòng treo không có cửa sổ, và tác phẩm nằm giữa hai bức tường trống. Ông chủ nói ông ngồi ở đây mỗi đêm, và không thấy gì thay đổi nữa.',
    '[The cost of perfection] The most perfect work you ever made was bought by a Nest collector, and he invites you to see it hung. The room has no windows, and the work stands between two bare walls. The owner says he sits here every night, and sees nothing change anymore.',
    [
      fc('Nói thật rằng bạn thấy nó đã chết', 'Say honestly that you see it as dead',
        'Ông chủ nhìn bạn hồi lâu, rồi nói ông cũng nghĩ thế, và cảm ơn vì không ai khác dám. Ông gọi người đến dỡ tác phẩm xuống, và lần đầu tiên sau nhiều năm, mở cửa sổ phòng.',
        'The owner looks at you a long time then says he thinks so too, and thanks you since no one else dares. He calls for the work to be taken down, and for the first time in years opens the room’s window.',
        { sanity: 3, rep: 5, network: 5 }, { flagsAdd: ['ring_kept_conscience'] }),
      fc('Khen tác phẩm và nói ông là người xứng đáng', 'Praise the work and say he is worthy of it',
        'Ông cười rất nhẹ, và nói ông ước gì mình tin được điều đó. Bạn ra về, và suốt chặng đường nghe tiếng bước chân mình dội lại trong hành lang rất vắng.',
        'He smiles faintly and says he wishes he could believe that. You leave, and the whole way hear your own footsteps echo in a very empty corridor.',
        { sanity: -6, rep: 2 }, { flagsAdd: ['ring_chased_perfection'] }),
      fc('Đề nghị mua lại để đổi lấy một tác phẩm mới', 'Offer to buy it back in exchange for a new work',
        'Ông đồng ý ngay, vì ông chờ câu ấy từ lâu. Bạn mang tác phẩm về, và nhìn nó thật lâu ở xưởng. Khi cuối cùng bạn phá nó đi, cả Atelier lặng đi, và bạn cảm thấy nhẹ hơn.',
        'He agrees at once, having waited long for those words. You carry the work back and look at it a long while in the studio. When you finally break it up, the whole Atelier is silent, and you feel lighter.',
        { wealth: -14, sanity: 6, rep: 4 }, { flagsAdd: ['ring_kept_conscience'] })
    ], { requires: ['ring_chased_perfection'], age: [28, 95], weight: 9 }),

  fe('ring_conscience_gallery', R, [1, 3],
    '[Phòng tranh của lương tâm] Một buổi sáng, bạn nhận được thư mời tham dự một cuộc triển lãm nhỏ ở một góc hẻo lánh của Backstreets. Ở đó, tất cả các tác phẩm đều do những người từng rời khỏi Ring. Mỗi tác phẩm có một mảnh giấy ghi: Tặng người đã cho tôi đi.',
    '[The gallery of conscience] One morning you receive an invitation to a small exhibition in a remote corner of the Backstreets. There every work is by people who once left the Ring. Each carries a slip: For the one who let me go.',
    [
      fc('Đến xem, ở lại đến khi đóng cửa', 'Go and stay until closing',
        'Có mười hai tác phẩm. Bạn nhận ra ba trong số đó là của những người bạn từng giúp rời Atelier. Một người đứng cạnh, gật đầu với bạn mà không nói. Bạn đi qua từng bức, và nghĩ rằng đây là một Ring khác, thật hơn.',
        'There are twelve works. You recognize three as by people you once helped leave the Atelier. One stands beside you and nods without a word. You walk past each, thinking this is a different Ring, truer.',
        { sanity: 7, rep: 4, network: 7 }),
      fc('Gửi một bó hoa nhưng không đến', 'Send flowers but do not attend',
        'Bó hoa của bạn được đặt ở cửa vào, không tên. Có người ghi lại ngày gửi, và vài tháng sau bạn nhận được một tác phẩm nhỏ gói giấy báo, không lời nhắn.',
        'Your flowers are placed at the entrance, unnamed. Someone notes the date, and months later you receive a small work wrapped in newspaper, with no message.',
        { sanity: 3, network: 4 }),
      fc('Báo Curator về buổi triển lãm', 'Report the exhibition to the Curator',
        'Curator nghe xong, chỉ cúi đầu. Hai tuần sau phòng triển lãm đóng cửa vì một lý do hành chính.',
        'The Curator listens and only nods. Two weeks later the exhibition closes over an administrative matter.',
        { rep: 3, sanity: -9, network: -6 })
    ], { requires: ['ring_kept_conscience'], age: [28, 95], weight: 9 })
];

export const RING_MINORS = [
  M('m_ring_varnish_smell', AGE.GROWN, fneed(R, 0),
    '[Mùi vecni] Mùi vecni trong Atelier bám lên tóc bạn đến mức khi về nhà, người hàng xóm bảo bạn ngửi như một phòng triển lãm.',
    '[The smell of varnish] The varnish in the Atelier clings to your hair so thoroughly that your neighbor says you smell like a gallery.',
    [C('Mở cửa sổ và để gió vào', 'Open the window and let air in', 'Mùi gió lạnh làm bạn ho. Nhưng sáng hôm sau bạn thấy màu sắc rõ hơn, như thể đôi mắt cũng vừa được rửa sạch.', 'The cold air makes you cough. But the next morning colors look clearer, as if your eyes too were rinsed.', { health: 2, sanity: 3 }), C('Giữ nguyên, bạn đã quen', 'Leave it, you are used to it', 'Bạn đi làm với mùi ấy, và không ai nhận xét. Đến lúc ngủ, bạn mơ thấy một tác phẩm chưa ai làm ra.', 'You go to work with the smell, and no one remarks. By sleep you dream of a work no one has made.', { sanity: -2, rep: 1 })],
    I('Bạn gật đầu và đi tiếp.', 'You nod and walk on.'), { theme: 'work' }),
  M('m_ring_cracked_frame', AGE.GROWN, fneed(R, 0),
    '[Khung bị nứt] Một khung tranh cổ trong phòng trưng bày bị nứt một đường mảnh. Không ai thấy, trừ bạn. Curator đang đứng ở đầu kia sảnh, và nếu bạn báo ngay, buổi triển lãm tối nay sẽ bị hoãn.',
    '[A cracked frame] An ancient frame in the gallery has a thin crack. No one sees it but you. The Curator stands at the other end of the hall, and if you report it now, tonight’s exhibition will be postponed.',
    [C('Báo ngay, chấp nhận hoãn', 'Report it now and accept the delay', 'Curator nhìn vết nứt và gật đầu chậm. Buổi triển lãm hoãn một ngày, nhưng khung được sửa kịp thời. Ông không khen, nhưng lần sau đưa cho bạn một việc quan trọng hơn.', 'The Curator looks at the crack and nods slowly. The exhibition is postponed a day, but the frame is mended in time. He does not praise, but next time gives you something more important.', { rep: 4, sanity: 2 }), C('Che vết nứt bằng một mảnh vải', 'Cover the crack with a piece of cloth', 'Triển lãm diễn ra đúng giờ. Vết nứt lan thêm trong đêm, và sáng hôm sau cả khung vỡ ra. Curator nhìn mảnh vải trong tay bạn.', 'The exhibition runs on time. The crack spreads in the night, and by morning the whole frame has split. The Curator looks at the cloth in your hand and says nothing.', { rep: -5, sanity: -3 })],
    I('Bạn nhìn vết nứt rồi quay đi.', 'You look at the crack then turn away.'), { theme: 'work' }),
  M('m_ring_paint_on_cuffs', AGE.GROWN, fneed(R, 0),
    '[Sơn dính áo] Một vệt sơn xanh dính trên cổ tay áo bạn đã ba ngày không giặt đi được. Một Docent đi ngang, nhìn vệt ấy và nói đó là xanh của buổi sáng đầu tiên bà làm việc ở đây. Bà để lại bạn với một sự im lặng ấm.',
    '[Paint on the cuffs] A blue smear on your sleeve cuff has not washed out in three days. A passing Docent glances at it and says it is the blue from her very first morning working here. She leaves you with a warm silence.',
    [C('Hỏi bà về buổi sáng đầu tiên', 'Ask her about that first morning', 'Bà kể rất ngắn: một người đi trước đã mất đưa bà cây cọ đầu tiên, và nói đừng sợ làm bẩn áo. Bà nói đó là lời dạy hay nhất bà nhận được.', 'She tells it very briefly: someone who came before gave her her first brush and told her not to fear soiling her clothes. She says it was the best teaching she ever received.', { sanity: 3, network: 4 }), C('Giữ vệt sơn như một dấu hiệu', 'Keep the stain as a mark', 'Bạn không giặt chiếc áo ấy nữa. Nó trở thành cái bạn mặc mỗi lần bắt đầu một tác phẩm mới, và dần dần mang một ý nghĩa mà bạn không nói ra.', 'You stop washing that shirt. It becomes what you wear each time you begin a new work, and gradually carries a meaning you do not voice.', { sanity: 2, rep: 1 })],
    I('Bạn cuộn tay áo lại và quay về việc.', 'You roll up the sleeve and return to work.'), { theme: 'work' }),
  M('m_ring_visitor_asks_price', AGE.GROWN, fneed(R, 0),
    '[Vị khách hỏi giá] Một vị khách không quen hỏi giá một tác phẩm treo trong sảnh, và khi bạn nói số, họ cười. Họ nói họ không mua nghệ thuật, chỉ hỏi để biết người ta đánh giá nỗi đau của người khác bao nhiêu.',
    '[A visitor asks the price] An unfamiliar visitor asks the price of a work hanging in the hall, and when you name the number, they laugh. They say they do not buy art, they only ask to learn how much people value another’s pain.',
    [C('Hỏi họ giá nào là công bằng', 'Ask what price they would call fair', 'Họ im lặng một lúc, rồi nói đó là một câu hỏi mà họ đã hỏi cả đời. Bạn thấy trong mắt họ một thứ không phải sự mỉa mai.', 'They are silent a long while then say that is a question they have asked all their life. You see in their eyes something that is not mockery.', { sanity: 2, network: 3 }), C('Nói đây không phải chỗ để đùa', 'Say this is no place for jesting', 'Họ nhún vai, và để lại một đồng xu trên bậc thềm trước khi đi. Bạn nhìn đồng xu ấy mãi, không biết nên nhặt hay để đó.', 'They shrug and leave a coin on the step before going. You look at it long, unsure whether to pick it up or leave it.', { sanity: -1, rep: 1 })],
    I('Bạn đáp lại giá một cách lịch sự và kết thúc cuộc nói chuyện.', 'You answer the price politely and end the exchange.'), { theme: 'work' }),
  M('m_ring_night_cleaner', AGE.GROWN, fneed(R, 0),
    '[Người lau dọn ban đêm] Một người lau dọn già lau sàn Atelier lúc nửa đêm, luôn dừng lại trước một tác phẩm cũ rồi đứng im vài giây. Hôm nay bạn ở lại muộn, và ông hỏi bạn có biết tác phẩm ấy là ai không. Ông nói ông từng quen người ấy.',
    '[The night cleaner] An old cleaner mops the Atelier floor at midnight, always pausing before one old work and standing still a few seconds. Today you stay late, and he asks whether you know who that work depicts. He says he once knew them.',
    [C('Ngồi xuống nghe ông kể', 'Sit down and hear him out', 'Ông kể về một người trẻ có nụ cười hơi lệch và một giọng hát rất cao. Bạn không biết bao nhiêu trong câu chuyện ấy là thật. Nhưng lần sau nhìn tác phẩm, bạn thấy nó khác.', 'He tells of a young person with a slightly crooked smile and a very high voice. You do not know how much is true. But the next time you look at the work, you see it differently.', { sanity: 3, network: 4 }), C('Nói bạn không biết và để ông tiếp tục lau', 'Say you do not know and let him mop on', 'Ông cúi đầu, và tiếp tục chậm rãi. Mỗi lần đi ngang đó, bạn thấy mình nhìn xuống sàn, và nhận ra mình không muốn thấy gương mặt trên tường.', 'He nods and resumes slowly. Each time you pass that place you find yourself looking at the floor, realizing you do not want to see the face on the wall.', { sanity: -2 })],
    I('Bạn gật đầu chào và đi về.', 'You nod in greeting and head home.'), { theme: 'work' }),
  M('m_ring_unexpected_praise', AGE.GROWN, fneed(R, 0),
    '[Lời khen bất ngờ] Một người lạ đi ngang xưởng, nhìn tác phẩm bạn đang làm qua cửa sổ, và nói một câu: Đẹp lắm. Rồi đi. Bạn đứng đó vài phút, tay vẫn cầm cây cọ, nhận ra mình không nhớ lần cuối ai khen mình mà không có mục đích.',
    '[Unexpected praise] A stranger walking past the studio glances through the window at your work and says a single thing: Beautiful. Then goes. You stand there several minutes, brush still in hand, realizing you cannot recall the last time anyone praised you without purpose.',
    [C('Chạy ra tìm người ấy', 'Run out to find them', 'Người ấy đã khuất sau một góc phố, và bạn không biết tên. Cả ngày hôm đó bạn thấy mình làm việc nhẹ nhàng hơn, và tác phẩm có một vẻ ấm hơn thường lệ.', 'They are already behind a street corner, and you do not know their name. All day you work more lightly, and the piece has a warmer look than usual.', { sanity: 4, rep: 2 }), C('Ghi lại lời khen vào một cuốn sổ', 'Write the praise in a notebook', 'Cuốn sổ ấy chỉ có vài lời, nhưng bạn đọc lại chúng mỗi khi thấy mình muốn bỏ nghề. Dần dần chúng dày lên.', 'That notebook holds only a few lines, but you reread them each time you feel like quitting. Gradually they thicken.', { sanity: 3, rep: 1 })],
    I('Bạn gật đầu và quay lại làm việc.', 'You nod and return to work.'), { theme: 'work' }),
  M('m_ring_rejected_proposal', AGE.GROWN, fneed(R, 1),
    '[Đề nghị bị từ chối] Hội đồng từ chối đề xuất tác phẩm bạn đã ấp ủ ba năm. Lý do ghi ngắn gọn: Chưa phù hợp thời điểm. Bạn đọc dòng ấy năm lần, rồi nhận ra nó không giải thích gì cả, và nghĩ có lẽ đó là mục đích.',
    '[A rejected proposal] The council rejects the proposal you have nursed for three years. The reason is written briefly: Not suited to the moment. You read the line five times, then realize it explains nothing, and think perhaps that is the purpose.',
    [C('Giữ ý tưởng và chờ', 'Keep the idea and wait', 'Ba năm sau, một Curator mới đến, và ý tưởng của bạn được chấp nhận ngay mà không ai nhắc đến lần từ chối.', 'Three years later a new Curator arrives, and your idea is accepted at once with no one mentioning the earlier rejection.', { sanity: 2, rep: 3 }), C('Làm nó một mình, không cần hội đồng', 'Make it alone, without the council', 'Bạn làm tác phẩm ấy trong căn phòng nhỏ cuối hành lang, và không cho ai xem. Khi hoàn thành, bạn đứng nhìn nó rất lâu, rồi phủ vải lên và khóa cửa.', 'You make the piece in the small room at the corridor’s end and show no one. When finished you stand looking at it for a long while, then drape cloth over it and lock the door.', { sanity: 3, rep: -1 })],
    I('Bạn gấp tờ thông báo lại và cất đi.', 'You fold the notice and put it away.'), { theme: 'work' }),
  M('m_ring_dust_cloth', AGE.GROWN, fneed(R, 0),
    '[Tấm vải phủ bụi] Trong một góc kho có một tác phẩm bị phủ vải từ nhiều năm. Không ai dám giở lên, và bạn không biết vì sao. Hôm nay bạn đi ngang, và thấy một góc vải đã bị kéo lệch một chút, như thể ai đó vừa nhìn.',
    '[The cloth under dust] In a corner of the storeroom a work has stood covered for many years. No one dares lift the cloth, and you do not know why. Today you pass and see one corner of the cloth tugged slightly, as if someone just looked.',
    [C('Kéo tấm vải ra xem', 'Pull the cloth aside to look', 'Bên dưới là một bức tượng rất nhỏ, của một đứa trẻ đang ngủ. Bạn đứng nhìn, rồi đắp lại tấm vải cẩn thận. Bạn không nói với ai bạn thấy gì.', 'Beneath is a very small statue of a sleeping child. You stand looking long, then drape the cloth back carefully. You tell no one what you saw.', { sanity: -3, rep: 1 }), C('Chỉnh lại góc vải và đi', 'Straighten the cloth corner and go', 'Cả ngày bạn thấy mình nghĩ về góc vải ấy, và đêm đó mơ thấy ai đó đang kéo nó ra từ bên trong.', 'All day you find yourself thinking of that corner, and that night dream of someone pulling it from the inside.', { sanity: -4 })],
    I('Bạn đi ngang mà không nhìn.', 'You pass without looking.'), { theme: 'work' }),
  M('m_ring_unfamiliar_brush', AGE.GROWN, fneed(R, 0),
    '[Cây cọ lạ] Trên bàn xưởng bạn có một cây cọ không phải của bạn. Cán gỗ sẫm, lông mềm và cũ, đầu hơi ướt. Không ai nhận, và khi bạn thử dùng, nét vẽ ra tự nhiên hơn bất cứ cây nào bạn từng cầm.',
    '[The strange brush] On your studio table lies a brush that is not yours. Dark wooden handle, soft old bristles, tip slightly damp. No one claims it, and when you try it the stroke flows more naturally than any you have held.',
    [C('Dùng nó cho một tác phẩm', 'Use it for a work', 'Tác phẩm ấy được khen ngợi hơn mọi thứ bạn từng làm. Nhưng cây cọ biến mất ngay hôm trao tác phẩm, và bạn không bao giờ tìm lại được.', 'That work is praised above anything you ever made. But the brush vanishes the day you hand over the piece, and you never find it again.', { rep: 5, sanity: -3 }), C('Cất nó và không dùng', 'Put it away unused', 'Bạn khóa cây cọ trong ngăn kéo, và hằng đêm nghe thấy một tiếng sột soạt rất khẽ từ trong đó. Đến sáng thứ ba, cây cọ không còn nữa.', 'You lock the brush in a drawer, and each night hear a very faint rustle from within. By the third morning the brush is gone.', { sanity: -4 })],
    I('Bạn cầm cây cọ lên một lúc rồi đặt xuống.', 'You hold the brush a moment then set it down.'), { theme: 'work' }),
  M('m_ring_blue_hour', AGE.GROWN, fneed(R, 0),
    '[Giờ xanh] Lúc xế chiều, ánh sáng trong Atelier chuyển sang một sắc xanh rất ngắn, vài phút thôi, và cả phòng ngừng tay. Mỗi người nhìn tác phẩm của mình trong ánh sáng ấy, và không ai nói. Hôm nay, tác phẩm của bạn trông khác.',
    '[The blue hour] In late afternoon the light in the Atelier shifts to a brief blue, a few minutes only, and the whole room stops. Each person looks at their work in that light, and no one speaks. Today, your piece looks different.',
    [C('Đứng nhìn đến khi ánh sáng tắt', 'Stand watching until the light fades', 'Khi ánh xanh biến mất, bạn thấy một đường nét bạn chưa từng thấy. Bạn đứng yên hồi lâu, rồi cầm cọ lên, chỉnh đúng một nét, và để mặc nó.', 'When the blue fades you see a line you never noticed. You stand still a long while, then lift your brush, correct exactly one stroke, and leave it.', { sanity: 3, rep: 3 }), C('Ghi lại những gì thấy vào sổ', 'Note what you saw in the ledger', 'Bạn viết ba dòng về ánh sáng và vị trí các đường nét. Hôm sau bạn đọc lại và không hiểu mình viết gì, nhưng bạn giữ nó.', 'You write three lines on the light and positions of the lines. The next day you reread and cannot understand what you wrote, but keep it.', { sanity: 1, rep: 1 })],
    I('Bạn nhìn một lúc rồi quay đi.', 'You look a moment then turn away.'), { theme: 'work' }),
  M('m_ring_whispered_name', AGE.GROWN, fneed(R, 1),
    '[Cái tên thì thầm] Khi bạn đứng trước một tác phẩm của một Maestro đã mất, một Docent trẻ đi qua và thì thầm một cái tên. Không phải tên Maestro. Bạn hỏi lại, và Docent ấy giật mình, nói rằng chỉ là thói quen nói với tác phẩm.',
    '[The whispered name] While you stand before a late Maestro’s work, a young Docent passes and whispers a name. Not the Maestro’s. You ask again, and the Docent startles and says it is only a habit of speaking to works.',
    [C('Hỏi Docent về cái tên đó', 'Ask the Docent about that name', 'Cậu ta kể rằng mỗi tác phẩm của Ring đều có một người mà nó muốn gọi tên, và ai làm việc ở đây lâu đều biết. Cậu bảo bạn sẽ biết khi đến lượt bạn.', 'They say each work in the Ring has someone it wants to name, and anyone working here long enough knows. They tell you that you will know when your turn comes.', { sanity: -3, network: 3 }), C('Giả vờ không nghe thấy', 'Pretend not to have heard', 'Cả buổi chiều bạn ngồi nhìn tác phẩm ấy, và đến lúc ra về, bạn thì thầm cái tên ấy một lần, rất nhỏ, và thấy cả sảnh im lặng một nhịp.', 'All afternoon you sit looking at that work, and when leaving whisper the name once, very softly, and feel the whole hall go quiet a beat.', { sanity: -4 })],
    I('Bạn cúi đầu và đi tiếp.', 'You nod and move on.'), { theme: 'work' }),
  M('m_ring_second_signature', AGE.GROWN, fneed(R, 1),
    '[Chữ ký thứ hai] Một tác phẩm bạn làm cách đây nhiều năm được trả về để sửa chữa. Bạn thấy ở góc dưới một chữ ký thứ hai, bằng một nét chữ bạn không nhớ. Nó nằm đúng bên dưới chữ ký của bạn, nhỏ hơn, như một lời xin phép.',
    '[A second signature] A work you made years ago returns for repair. At the lower corner you see a second signature, in handwriting you do not recall. It sits right beneath yours, smaller, like a request for permission.',
    [C('Giữ nguyên chữ ký ấy, không sửa', 'Leave the signature, unaltered', 'Bạn sửa phần hư hại nhưng không chạm vào chữ ký. Khi trả tác phẩm lại, bạn thấy một học việc cũ nhìn nó rồi nhìn bạn, và nhẹ nhàng cúi đầu.', 'You repair the damage but do not touch the signature. When you return the work you see a former apprentice look at it then at you, and bow gently.', { sanity: 3, rep: 3, network: 4 }), C('Xóa chữ ký thứ hai, dù không đành', 'Erase the second signature, reluctantly', 'Nét chữ biến mất rất dễ, như chưa bao giờ có. Nhưng đêm đó bạn mơ thấy một bàn tay đang ký lại, chậm chạp, từng nét một.', 'The writing vanishes very easily, as if never there. But that night you dream of a hand signing again, slowly, stroke by stroke.', { sanity: -5, rep: 1 })],
    I('Bạn sửa và trả lại mà không nói gì.', 'You repair and return it without a word.'), { theme: 'work' }),
  M('m_ring_children_visit', AGE.GROWN, fneed(R, 0),
    '[Đám trẻ ghé thăm] Một nhóm trẻ từ trường gần đó được dẫn qua Atelier trong một buổi học ngoại khóa. Chúng đứng quanh một tác phẩm của bạn và không ai nói. Rồi một đứa nhỏ nhất kéo tay áo giáo viên và hỏi nó có đau không.',
    '[Children visit] A group of children from a nearby school is led through the Atelier on an outing. They stand around one of your works and none speaks. Then the smallest tugs the teacher’s sleeve and asks whether it hurts.',
    [C('Ngồi xuống ngang tầm trẻ và trả lời thật', 'Crouch to the child’s level and answer truly', 'Bạn nói đôi khi có, đôi khi không, và điều đó tùy ai đang nhìn. Đứa trẻ gật đầu rất nghiêm túc, và đi tiếp. Một tuần sau, bạn nhận được một bức vẽ bằng sáp màu từ lớp đó.', 'You say sometimes yes, sometimes no, and it depends on who is looking. The child nods very seriously and moves on. A week later you receive a crayon drawing from that class.', { sanity: 4, network: 5, rep: 2 }), C('Nói nghệ thuật không đau, rồi chuyển chủ đề', 'Say art does not hurt and change the subject', 'Đứa trẻ nhìn bạn một lúc, rồi nhìn tác phẩm, và bạn biết nó không tin. Giáo viên dẫn cả nhóm đi, nhanh hơn dự kiến.', 'The child looks at you long, then at the work, and you know it does not believe. The teacher leads the group out, faster than planned.', { sanity: -3, rep: 1 })],
    I('Bạn mỉm cười và để giáo viên xử lý.', 'You smile and let the teacher handle it.'), { theme: 'work' }),
  M('m_ring_gallery_cat', AGE.GROWN, fneed(R, 0),
    '[Con mèo của phòng tranh] Một con mèo ngủ trong phòng trưng bày và luôn chọn nằm dưới đúng tác phẩm bạn thích nhất. Không ai đuổi nó vì khách đến xem rất thích cảnh đó. Hôm nay nó nằm dưới tác phẩm của bạn, lần đầu tiên.',
    '[The gallery cat] A cat sleeps in the gallery and always picks the spot beneath exactly the work you like best. No one drives it out because visitors adore the sight. Today it lies beneath your work, the first time ever.',
    [C('Ngồi xuống cạnh nó một lúc', 'Sit beside it a while', 'Con mèo mở một mắt rồi nhắm lại. Bạn ngồi đó nửa giờ, và cảm thấy tác phẩm của mình được chấp nhận theo một cách mà lời khen nào cũng không bằng.', 'The cat opens one eye and closes it again. You sit half an hour, feeling your work accepted in a way no praise could match.', { sanity: 4, rep: 1 }), C('Chụp lại cảnh đó trong trí nhớ', 'Commit the sight to memory', 'Bạn đứng thật lâu, rồi quay đi, và không kể với ai. Cảnh ấy trở thành thứ bạn nhớ mỗi lần nghi ngờ mình.', 'You stand long, then turn away and tell no one. That sight becomes what you recall each time you doubt yourself.', { sanity: 3 })],
    I('Bạn đi ngang mà không làm ồn.', 'You walk past without making noise.'), { theme: 'work' }),
  M('m_ring_old_apprentice_returns', AGE.GROWN, fneed(R, 1),
    '[Học việc cũ quay lại] Một học việc bạn từng dạy nhiều năm trước, giờ là một nghệ sĩ có tiếng ở nơi khác, quay lại Atelier chỉ để nhìn. Người ấy đứng trong cửa một lúc lâu, rồi nói họ không nhớ tên bạn, nhưng nhớ chính xác cách bạn cầm cây cọ.',
    '[A former apprentice returns] An apprentice you taught years ago, now a noted artist elsewhere, returns to the Atelier only to look. They stand in the doorway a long while, then say they cannot recall your name but remember exactly how you held the brush.',
    [C('Mời họ vào xem bạn làm việc', 'Invite them in to watch you work', 'Hai người ngồi cạnh nhau suốt buổi chiều. Người ấy chỉ nhìn, và bạn nhận ra mình đang làm việc khác đi, chậm hơn, như khi dạy một người khác.', 'The two of you sit side by side all afternoon. They only watch, and you realize you are working differently, more slowly, as when teaching.', { sanity: 4, network: 5, rep: 2 }), C('Nhắc họ tên bạn', 'Remind them of your name', 'Họ cười, và nói không cần. Họ tự biết, chỉ là quên không nhớ ra mà thôi. Bạn gật đầu, và biết chuyện nhỏ này sẽ ở lại lâu.', 'They laugh and say there is no need. They know it, simply failing to recall. You nod, knowing this small matter will linger.', { sanity: -1, network: 3 })],
    I('Bạn cúi đầu chào và quay lại làm việc.', 'You nod in greeting and return to work.'), { theme: 'work' }),
  M('m_ring_dream_of_color', AGE.GROWN, fneed(R, 0),
    '[Giấc mơ về một màu] Đêm qua bạn mơ thấy một màu bạn chưa từng thấy ngoài đời. Bạn thức dậy với cảm giác đó vẫn còn trong mắt, và cố gắng pha nó ra bằng mọi chất liệu có trong xưởng. Mười hai lần thử, không lần nào đúng.',
    '[A dream of a color] Last night you dreamed of a color you have never seen in waking life. You wake with the sense of it still in your eyes and try to mix it from everything in the studio. Twelve attempts, none right.',
    [C('Thử tiếp cho đến khi tìm ra', 'Keep trying until you find it', 'Sau ba ngày, bạn tìm thấy một hỗn hợp gần giống, và nó đủ để làm nên một tác phẩm mới. Nhưng bạn biết rằng màu thật vẫn nằm ở nơi khác, và chỉ trong giấc mơ.', 'After three days you find a mix that comes close, enough for a new work. But you know the real color remains elsewhere, only in dreams.', { rep: 5, sanity: -2, wealth: -3 }), C('Chấp nhận để màu ấy ở lại trong mơ', 'Let the color remain in the dream', 'Bạn không thử thêm. Nhưng suốt cả năm sau, mỗi khi nhìn một bức tranh nào đó, bạn tự hỏi có phải đó chính là màu của giấc mơ không.', 'You try no more. But all the next year, whenever you look at some painting, you wonder if that is the dream’s color.', { sanity: 3 })],
    I('Bạn rửa cọ và quên giấc mơ.', 'You rinse your brushes and forget the dream.'), { theme: 'work' }),
  M('m_ring_staff_dinner', AGE.GROWN, fneed(R, 0),
    '[Bữa tối của Atelier] Cả Atelier ăn tối chung một lần mỗi năm. Không ai nói về công việc, chỉ nói về món ăn.',
    '[The Atelier dinner] The whole Atelier dines together once a year. No one speaks of work, only of food.',
    [C('Hỏi người ngồi cạnh về món họ thích nhất', 'Ask your neighbor their favorite dish', 'Họ kể về một món ăn của quê họ, và hai mắt sáng lên như một đứa trẻ.', 'They tell of a dish from their hometown and their eyes brighten like a child’s.', { sanity: 4, network: 6 }), C('Ngồi yên ăn, nghe người khác nói', 'Sit quietly eating and listen to others', 'Bữa ăn êm ả. Cuối buổi, một người ở đầu bàn nâng ly và nói một câu ngắn về những người đã không có mặt, và cả bàn nâng ly cùng.', 'The meal is calm. At the end, someone at the table’s head raises a glass and says a short line about those not present, and the whole table raises theirs.', { sanity: 2, network: 3 })],
    I('Bạn ăn xong sớm và về.', 'You finish early and leave.'), { theme: 'work' }),
  M('m_ring_art_dealer_visit', AGE.GROWN, fneed(R, 1),
    '[Thương nhân nghệ thuật] Một thương nhân nghệ thuật ghé Atelier, muốn mua cả một loạt tác phẩm để bán sang Wing xa. Ông ta ăn mặc đắt tiền, nói nhẹ nhàng, và có một cách nhìn các tác phẩm như nhìn hàng tồn kho. Giá đưa ra cao đến khó tin.',
    '[The art dealer] An art dealer visits the Atelier, wanting to buy a whole series for resale to a distant Wing. He dresses expensively, speaks softly, and regards the works as stock. The price offered is hard to believe.',
    [C('Từ chối, nói tác phẩm không bán thành loạt', 'Decline, saying the works are not sold as a set', 'Thương nhân mỉm cười lịch sự và để lại danh thiếp. Bạn đặt nó vào ngăn kéo, và ba tháng sau, một người khác mang một lời đề nghị tương tự. Bạn bắt đầu thấy một quy luật.', 'The dealer smiles politely and leaves his card. You file it in a drawer, and three months later another brings a similar offer. You begin to see a pattern.', { sanity: 3, rep: 3 }), C('Nhận, và hỏi giá thật sự', 'Accept and ask the real price', 'Hai tuần thương lượng, và một khoản tiền lớn. Nhưng khi các tác phẩm được chở đi, bạn đứng ở cửa và nhận ra mình không nhớ thứ tự chúng được làm ra.', 'Two weeks of negotiation, and a large sum. But as the works are carried off, you stand at the door and realize you do not remember the order in which they were made.', { wealth: 18, sanity: -5, rep: 2 }, { flagsAdd: ['ring_chased_perfection'] })],
    I('Bạn tiễn ông ra cửa và nói sẽ xem xét.', 'You see him to the door and say you will consider.'), { theme: 'work' }),
  M('m_ring_afternoon_nap', AGE.GROWN, fneed(R, 0),
    '[Giấc ngủ chiều ở Atelier] Bạn ngủ gục trên ghế trong xưởng lúc chiều, và tỉnh dậy với một tấm chăn mỏng đắp trên người. Không ai nhận. Trên bàn, một cốc trà đã nguội, và một mảnh giấy ghi: Hôm nay bạn không cần làm gì.',
    '[Afternoon nap at the Atelier] You doze on a chair in the studio one afternoon and wake with a thin blanket over you. No one claims it. On the desk, a cooled cup of tea and a slip: Today you need not do anything.',
    [C('Uống trà nguội và nghỉ nốt buổi chiều', 'Drink the cold tea and rest the afternoon', 'Bạn ngồi nhìn ra cửa sổ cho đến khi mặt trời xuống. Lần đầu tiên sau nhiều tháng, bạn không nghĩ về một tác phẩm nào, và cảm thấy trống rỗng một cách dễ chịu.', 'You sit looking out the window until the sun lowers. For the first time in months you think of no work, and feel pleasantly empty.', { sanity: 5, health: 2 }), C('Cố gắng tìm xem ai đã đắp chăn', 'Try to find who covered you', 'Bạn hỏi cả Atelier, và không ai nhận. Nhưng một Docent già nhìn bạn một cái rất ngắn, và nhìn đi nơi khác. Bạn mỉm cười mà không hỏi thêm.', 'You ask the whole Atelier and none claims it. But an old Docent gives you a very brief look and looks away. You smile and ask no more.', { sanity: 3, network: 3 })],
    I('Bạn gấp chăn lại và quay lại làm việc.', 'You fold the blanket and return to work.'), { theme: 'work' }),
  M('m_ring_long_corridor', AGE.GROWN, fneed(R, 2),
    '[Hành lang dài của Ring] Curator mời bạn đi dọc hành lang chính của Ring lúc nửa đêm, một mình, và dặn đừng mang đèn. Bạn đi qua mấy trăm tác phẩm trong bóng tối, và mỗi tác phẩm hình như thở nhẹ khi bạn bước qua.',
    '[The long corridor of the Ring] The Curator invites you to walk the Ring’s main corridor at midnight, alone, and asks you to bring no lamp. You pass several hundred works in the dark, and each seems to breathe softly as you pass.',
    [C('Đi hết hành lang, không dừng', 'Walk the full corridor without stopping', 'Đến cuối hành lang, bạn thấy Curator đứng đợi, và ông chỉ hỏi bạn cảm thấy gì. Bạn nói thành thật rằng bạn thấy mình nhỏ bé. Ông gật đầu như đó là điều ông mong.', 'At the corridor’s end you find the Curator waiting, and he only asks what you felt. You say honestly that you felt small. He nods as if that were what he hoped.', { sanity: -2, rep: 5, network: 4 }), C('Dừng lại trước một tác phẩm và đứng đến sáng', 'Stop before one work and stand until dawn', 'Bạn đứng trước một bức tượng nhỏ suốt đêm. Khi trời sáng, Curator đến và nói tác phẩm ấy chọn người nhìn nó, và hôm nay nó đã chọn bạn.', 'You stand before a small statue all night. When dawn comes, the Curator arrives and says that work chooses who looks at it, and today it chose you.', { sanity: 2, rep: 4, network: 5 })],
    I('Bạn lịch sự từ chối và nói bạn mệt.', 'You politely decline and say you are tired.'), { theme: 'work' }),
  M('m_ring_framed_letter', AGE.GROWN, fneed(R, 1),
    '[Lá thư đóng khung] Trong văn phòng của Curator treo một lá thư đóng khung của một người ngoài Ring, viết bằng nét chữ rất non nớt. Khi bạn hỏi, ông chỉ nói đó là lời phê bình đầu tiên và quan trọng nhất ông từng nhận. Nó chỉ có một câu: Tôi sợ nó.',
    '[The framed letter] In the Curator’s office hangs a framed letter from someone outside the Ring, in very youthful handwriting. When you ask, he says only that it is the first and most important critique he ever received. It holds a single sentence: I am afraid of it.',
    [C('Hỏi ai viết lá thư đó', 'Ask who wrote the letter', 'Curator nói đó là một đứa trẻ, nhiều năm trước, đã đứng trước tác phẩm đầu tiên của ông. Ông chưa bao giờ gặp lại đứa trẻ ấy. Nhưng ông tin rằng mọi người xem đều viết cùng một lá thư.', 'The Curator says it was a child, many years ago, who stood before his first work. He never met that child again. But he believes every viewer writes the same letter.', { sanity: 2, rep: 3 }), C('Đứng nhìn nó yên lặng một lúc', 'Stand silently regarding it a while', 'Bạn không hỏi gì. Curator cũng không nói gì. Hai người đứng đó một lúc, và bạn nhận ra mình hiểu nhiều hơn những gì được nói.', 'You ask nothing. The Curator says nothing either. The two of you stand there a while, and you realize you understand more than was spoken.', { sanity: 3, rep: 2 })],
    I('Bạn gật đầu và chuyển sang việc khác.', 'You nod and turn to other matters.'), { theme: 'work' }),
  M('m_ring_new_commission', AGE.GROWN, fneed(R, 0),
    '[Đơn đặt hàng mới] Một người đặt hàng đến, kể một câu chuyện rất dài về điều họ muốn, và khi bạn hỏi cụ thể, họ không trả lời được. Họ nói họ chỉ muốn tác phẩm cho họ cảm giác được hiểu. Bạn nhìn họ rất lâu và không biết nên bắt đầu từ đâu.',
    '[A new commission] A client arrives, tells a very long story of what they want, and when you ask for specifics they cannot answer. They say they only want a work that makes them feel understood. You look at them a long while and do not know where to begin.',
    [C('Nhận việc và dành vài tuần chỉ nghe họ', 'Accept and spend weeks only listening', 'Đến cuối, bạn không hỏi thêm câu nào, và tác phẩm tự hiện ra như một thứ có sẵn từ đầu. Người ấy khóc khi thấy nó, và không bao giờ nói đó là vì sao.', 'By the end you ask nothing further, and the work appears as something already there from the start. The client weeps at the sight and never says why.', { rep: 5, sanity: -1, wealth: 8 }), C('Từ chối nhận việc, nói họ cần một người khác', 'Decline, saying they need someone else', 'Họ cúi đầu và đi.', 'They nod and go.', { sanity: 1, rep: -2 })],
    I('Bạn nói sẽ suy nghĩ rồi tiễn họ ra cửa.', 'You say you will think it over and see them out.'), { theme: 'work' }),
  M('m_ring_a_good_cough', AGE.GROWN, fneed(R, 0),
    '[Cơn ho vì bụi] Bụi từ sơn và đá làm bạn ho cả tuần. Một Docent đưa cho bạn một lọ thuốc ho tự pha, mùi gừng và mật ong. Bà nói bà đã ho như vậy suốt ba mươi năm, và đây là thứ duy nhất có ích.',
    '[A cough from the dust] Dust from paint and stone has you coughing all week. A Docent hands you a self-made cough remedy smelling of ginger and honey. She says she has coughed like this thirty years, and this is the only thing that helps.',
    [C('Uống thuốc và nghỉ vài ngày', 'Take the remedy and rest a few days', 'Cơn ho giảm sau hai ngày. Bạn ngồi trong căn phòng nhỏ nhìn ra mưa, và nhận ra đã lâu rồi mình không để mình ốm một cách đàng hoàng.', 'The cough eases after two days. You sit in your small room watching the rain, realizing it has been long since you let yourself be ill properly.', { health: 4, sanity: 3 }), C('Tiếp tục làm việc, mặc kệ', 'Keep working regardless', 'Cơn ho kéo dài thêm hai tuần, và một lần bạn ho ra một chút bụi màu xanh. Bạn nhìn nó, và không nói với ai.', 'The cough lasts two more weeks, and once you cough up a little blue dust. You look at it a long while and tell no one.', { health: -5, sanity: -2 })],
    I('Bạn cảm ơn và cất lọ thuốc vào túi.', 'You thank her and pocket the bottle.'), { theme: 'work' })
];

export const RING_DAILIES = [
  D('d_ring_canvas_tension', AGE.GROWN, fneed(R, 0), 'Tấm bố căng trên khung kêu một tiếng khẽ khi bạn gõ vào.', 'The canvas stretched on its frame gives a soft sound when you tap it.', {}),
  D('d_ring_wet_clay', AGE.GROWN, fneed(R, 0), 'Đất sét ướt lạnh trên tay bạn, và bạn nhìn nó mà không nghĩ đến thứ nó sẽ trở thành. Hôm nay nó chỉ là đất.', 'Wet clay is cold on your hands, and you look at it without thinking of what it will become. Today it is only clay.', {}),
  D('d_ring_sketch_wall', AGE.GROWN, fneed(R, 0), 'Tường Atelier phủ đầy những bản phác thảo bị bỏ dở. Có một nét chì bạn nhận ra là của một người đã rời đi, và bạn không xóa nó.', 'The Atelier wall is covered with abandoned sketches. One pencil line you recognize as belonging to someone who left, and you do not erase it.', {}),
  D('d_ring_curtain_draft', AGE.GROWN, fneed(R, 0), 'Luồng gió từ cửa sổ thổi tấm màn phủ một tác phẩm lên một chút, để lộ một góc. Bạn kéo nó xuống rất nhẹ, như đắp chăn cho người ngủ.', 'A draft from the window lifts the cloth over a work a little, exposing a corner. You pull it down gently, as if covering a sleeper.', {}),
  D('d_ring_empty_pedestal', AGE.GROWN, fneed(R, 0), 'Một bệ đá trống đứng giữa sảnh, được lau sạch mỗi ngày, dù không có gì trên đó. Không ai biết nó chờ tác phẩm nào, và không ai dám hỏi.', 'An empty stone pedestal stands in the hall, wiped clean each day though bearing nothing. No one knows which work it awaits, and no one dares ask.', {}),
  D('d_ring_light_through_glass', AGE.GROWN, fneed(R, 0), 'Ánh sáng qua tấm kính màu in một vệt đỏ lên sàn xưởng. Bạn đứng vào đó một lúc, và thấy bàn tay mình biến thành một sắc khác.', 'Light through a colored pane casts a red patch on the studio floor. You step into it a moment and see your hands change color.', {}),
  D('d_ring_scrap_bin', AGE.GROWN, fneed(R, 0), 'Trong thùng phế liệu của Atelier có một mảnh vỡ của một tác phẩm chưa hoàn thành. Bạn nhặt nó lên, xoay trong tay, và nhận ra nó đẹp hơn tác phẩm sau cùng.', 'In the Atelier’s scrap bin lies a fragment of an unfinished work. You pick it up, turn it in your hand, and realize it is lovelier than the final piece.', {}),
  D('d_ring_brush_wash', AGE.GROWN, fneed(R, 0), 'Nước rửa cọ trong chậu đổi thành màu của tác phẩm bạn vừa làm xong. Bạn nhìn nó lâu hơn cần thiết, và thấy nó đẹp theo cách nó không nên đẹp.', 'The wash water in the basin turns the color of the work you just finished. You look at it longer than necessary, finding it lovely in a way it should not be.', {}),
  D('d_ring_footsteps_hall', AGE.GROWN, fneed(R, 0), 'Tiếng bước chân của khách ở sảnh dội vào những bức tường đá, và bạn đoán được ai đang đứng trước tác phẩm nào chỉ qua nhịp chân.', 'Visitors’ footsteps echo off the stone walls of the hall, and you can guess who stands before which work by the rhythm alone.', {}),
  D('d_ring_charcoal_fingers', AGE.GROWN, fneed(R, 0), 'Bàn tay bạn đen sì vì than chì, và khi chạm vào mặt, bạn để lại một dấu trên má mà không biết. Người đối diện không nói, chỉ mỉm cười.', 'Your hands are black with charcoal, and touching your face you leave a mark on your cheek without knowing. The person facing you says nothing, only smiles.', {}),
  D('d_ring_cold_marble', AGE.GROWN, fneed(R, 1), 'Đá cẩm thạch trong xưởng của Maestro lạnh đến mức bạn đặt tay lên và không thể nhấc ra trong vài giây. Bạn thấy nó như một con vật đang ngủ.', 'The marble in the Maestro’s studio is so cold that you place a hand on it and cannot lift it for a few seconds. You see it as a sleeping animal.', {}),
  D('d_ring_spotlight_dust', AGE.GROWN, fneed(R, 0), 'Dưới ánh đèn chiếu vào tác phẩm, bụi bay lơ lửng chậm chạp như những mảnh vỡ của một bài hát. Bạn đứng nhìn, và nhận ra mình đang nín thở.', 'Under the spotlight on a work, dust drifts slowly like fragments of a song. You stand watching and realize you are holding your breath.', {}),
  D('d_ring_apprentice_error', AGE.GROWN, fneed(R, 1), 'Một học việc làm đổ một chậu thuốc màu xuống sàn và đứng chết lặng. Bạn không nói gì, chỉ ngồi xuống lau cùng, và cả hai không nhìn nhau.', 'An apprentice spills a basin of pigment onto the floor and stands frozen. You say nothing, only kneel to wipe it up together, and neither looks at the other.', {}),
  D('d_ring_stained_apron', AGE.GROWN, fneed(R, 0), 'Chiếc tạp dề của bạn có thêm một vệt màu mới mỗi ngày, và dần dần nó thành một tác phẩm riêng mà không ai định làm ra.', 'Your apron gains a new streak each day, and gradually becomes a work in itself that no one intended.', {}),
  D('d_ring_clock_in_studio', AGE.GROWN, fneed(R, 0), 'Chiếc đồng hồ trong xưởng chạy chậm mười phút từ lâu, và không ai chỉnh vì nó trở thành giờ riêng của Atelier. Hôm nay bạn đến đúng giờ của nó.', 'The studio clock has run ten minutes slow for ages, and no one adjusts it because it has become the Atelier’s own time. Today you arrive exactly on its hour.', {}),
  D('d_ring_whispered_critique', AGE.GROWN, fneed(R, 0), 'Hai Docent thì thầm phê bình một tác phẩm ở góc sảnh, và khi bạn đi ngang, họ ngừng và cười ngượng ngùng.', 'Two Docents whisper a critique of a work in a hall corner, and when you pass they stop and smile sheepishly.', {}),
  D('d_ring_water_stain', AGE.GROWN, fneed(R, 0), 'Trên trần xưởng có một vệt nước loang hình dáng giống một khuôn mặt. Bạn nhìn nó mỗi sáng khi vào, và nhận ra nó thay đổi khi mưa.', 'On the studio ceiling a water stain spreads in the shape of a face. You look at it each morning on entering and realize it changes when it rains.', {}),
  D('d_ring_late_candle', AGE.GROWN, fneed(R, 0), 'Một ngọn nến còn cháy trong xưởng khi bạn đến vào buổi sáng. Không ai nhận đã thắp, và sáp chảy xuống thành một hình trông như một bàn tay.', 'A candle still burns in the studio when you arrive in the morning. No one claims to have lit it, and the wax has run into a shape like a hand.', {}),
  D('d_ring_gloves_off', AGE.GROWN, fneed(R, 0), 'Bạn tháo găng tay làm việc sau một ngày dài, và nhìn bàn tay mình trong ánh đèn. Nó trông không giống của bạn, mà giống của ai đó bạn quen từ lâu.', 'You remove your work gloves after a long day and look at your hands in the lamplight. They do not look like yours but like someone you have long known.', {}),
  D('d_ring_poster_peeling', AGE.GROWN, fneed(R, 0), 'Áp phích triển lãm cũ dán ở ngoài phố bị bong một góc, lộ ra áp phích cũ hơn bên dưới. Bạn đứng nhìn các lớp chồng chất lên nhau, và nhớ ra mình đã đứng đây nhiều lần.', 'An old exhibition poster outside on the street peels at a corner, revealing an older poster beneath. You stand watching the layers stack up and recall standing here many times.', {}),
  D('d_ring_late_visitor', AGE.GROWN, fneed(R, 0), 'Một khách đến muộn vài phút trước giờ đóng cửa và đứng trước một tác phẩm đến khi đèn tắt. Bạn không đuổi họ, và để lại một ngọn đèn nhỏ ở góc sảnh.', 'A visitor arrives minutes before closing and stands before one work until the lights go out.', {}),
  D('d_ring_cloth_ripple', AGE.GROWN, fneed(R, 0), 'Tấm vải phủ một tác phẩm gợn lên rồi xẹp xuống, nhẹ như hơi thở của ai đó đang ngủ. Bạn đứng yên đến khi nó dừng lại, rồi đi ra mà không thở mạnh.', 'The cloth over a work ripples up then settles, light as the breath of someone sleeping. You stand still until it stops, then leave without breathing hard.', {}),
  D('d_ring_new_chisel', AGE.GROWN, fneed(R, 0), 'Bạn mua một chiếc đục mới và để nó nằm trên bàn mà không đụng đến cả tuần. Cuối cùng bạn cầm nó lên và nhận ra tay mình run nhẹ.', 'You buy a new chisel and leave it on the table untouched for a week. At last you pick it up and realize your hand trembles slightly.', {}),
  D('d_ring_wire_hung', AGE.GROWN, fneed(R, 0), 'Một sợi dây thép treo lủng lẳng giữa hai bức tường đá, không rõ để làm gì. Bạn đi qua nhiều lần, và mỗi lần cảm thấy nó đang chờ điều gì đó.', 'A steel wire hangs between two stone walls, purpose unknown. You pass it many times and each time feel it is waiting for something.', {}),
  D('d_ring_overheard_song', AGE.GROWN, fneed(R, 0), 'Ai đó hát khẽ trong xưởng bên cạnh, một giai điệu mà bạn biết nhưng không nhớ tên. Bạn đứng ngoài cửa nghe đến hết bài, rồi quay đi.', 'Someone hums softly in the studio next door, a tune you know but cannot name. You stand outside the door and listen to the end, then turn away.', {}),
  D('d_ring_leftover_tea', AGE.GROWN, fneed(R, 0), 'Bạn tìm thấy một ly trà bỏ quên trên bệ cửa sổ, đã đóng một lớp váng mỏng. Bạn nhìn nó hồi lâu, rồi đặt nó vào chiếc khay như một tác phẩm nhỏ.', 'You find a forgotten cup of tea on the windowsill, a thin skin formed. You look at it a long while, then place it on the tray as a small work.', {}),
  D('d_ring_study_of_hands', AGE.GROWN, fneed(R, 1), 'Bạn vẽ bàn tay của một người ngồi cạnh, và nhận ra mỗi bàn tay đều có một câu chuyện không thể nói ra bằng lời. Bạn đưa cho họ bản vẽ, và họ giữ nó rất cẩn thận.', 'You draw the hands of someone sitting beside you and realize each pair of hands holds a story that cannot be spoken. You give them the drawing, and they keep it very carefully.', {}),
  D('d_ring_marble_dust_hair', AGE.GROWN, fneed(R, 0), 'Bụi đá phủ trắng tóc bạn khi về nhà. Trong gương, bạn thấy mình già đi hai mươi tuổi, và không thấy sợ. Chỉ thấy một sự nhẹ nhàng kỳ lạ.', 'Stone dust coats your hair white when you reach home. In the mirror you see yourself aged twenty years, and feel no fear. Only a strange lightness.', {}),
  D('d_ring_frame_measuring', AGE.GROWN, fneed(R, 0), 'Thợ dựng khung đo bạn bằng mắt khi bạn bước vào, như đo một tác phẩm. Ông ta gật đầu và quay đi, và bạn không biết mình vừa được chấp nhận hay đánh giá.', 'The frame builder sizes you up with his eyes as you enter, as he would a work. He nods and turns away, and you do not know whether you were just accepted or appraised.', {}),
  D('d_ring_rain_on_skylight', AGE.GROWN, fneed(R, 0), 'Mưa rơi lên cửa sổ trần của xưởng thành một tiếng đều như trống nhỏ. Bạn ngừng việc và để mình nghe, và trong chốc lát không có gì cần hoàn thành.', 'Rain falls on the studio skylight in a steady beat like a small drum. You stop work and let yourself listen, and for a moment there is nothing to complete.', {}),
  D('d_ring_unsigned_work', AGE.GROWN, fneed(R, 1), 'Bạn đứng trước một tác phẩm không có chữ ký, và nhận ra bạn không cần biết ai làm ra nó. Nó đủ tự nói, và bạn rời đi với cảm giác vừa được dạy một điều.', 'You stand before an unsigned work and realize you need not know who made it. It speaks for itself enough, and you leave with the feeling of having just been taught something.', {})
];
