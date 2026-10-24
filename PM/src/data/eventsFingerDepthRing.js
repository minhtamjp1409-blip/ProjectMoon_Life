// The Ring, second set of missions: the gallery, the studio, the buyers and the critics. Five of these sit at
// rank 2 and above, where the Ring had the fewest (ten against fourteen to seventeen for the other Fingers).

import { fe, fc, fg } from './fingerKit.js';

const R = 'Ring';
const mission = (id, rank, vi, en, choices, weight = 9) => ({ ...fe(id, R, rank, vi, en, choices, { weight }), mission: true });

export const RING_DEPTH = [
  mission('ring_cleaning_the_studio', [0, 1],
    '[Dọn xưởng sau đêm triển lãm] Sáng sau đêm khai mạc, xưởng ngổn ngang ly rượu, vỏ hoa và những vệt sơn khô. Maestro đang ngủ ở một góc. Giữa đống bừa bộn, bạn nhặt được một bức phác thảo chưa ai thấy.',
    '[Cleaning the studio] The morning after the opening, the studio is strewn with glasses, petals and dried paint. The Maestro sleeps in a corner. In the mess you pick up a sketch no one has seen.',
    [
      fc('Đặt bức phác thảo lên bàn Maestro và im lặng', 'Lay the sketch on the Maestro’s desk and say nothing',
        'Maestro thức dậy, nhìn bức phác thảo rất lâu, rồi cất vào ngăn kéo. Tối đó bạn được mời ngồi cùng bàn lần đầu tiên.', 'The Maestro wakes, looks long at the sketch, then puts it in a drawer. That evening you are invited to the table for the first time.', { rep: 4, network: 6, sanity: 3 }),
      fc('Ghi nhớ bức phác thảo rồi đặt lại chỗ cũ', 'Memorize the sketch and put it back where it was',
        'Bạn vẽ lại nó từ trí nhớ vào ban đêm. Nét của bạn còn vụng, nhưng nó giống đến lạ. Maestro không bao giờ biết, và đó là điều bạn giữ.', 'You redraw it from memory by night. Your line is still clumsy, but it comes out strangely close. The Maestro never knows, and that is what you keep.', { sanity: 2, rep: 2, resonance: 4 }),
      fc('Hỏi Maestro bức phác thảo là của ai', 'Ask the Maestro whose sketch it is',
        'Maestro im lặng rồi nói đó là của người học trò đã mất. Bạn được giao cất nó vào hòm khóa, và hòm ấy từ đó thuộc trách nhiệm của bạn.', 'The Maestro is silent then says it belonged to a student now dead. You are told to put it in a locked chest, and that chest becomes your charge.', { sanity: -3, rep: 5, network: 4 }, { meritAdd: 3 })
    ], 8),

  mission('ring_first_critic', [0, 1],
    '[Nhà phê bình đầu tiên] Một nhà phê bình có tiếng đến xưởng và đứng rất lâu trước tác phẩm đầu tay của bạn. Họ không nói gì, và Docent bảo bạn chờ. Ngoài cửa, một người khác đang đợi để mua nó.',
    '[The first critic] A well-known critic visits the studio and stands a long while before your first work. They say nothing, and the Docent tells you to wait. Outside the door someone else is waiting to buy it.',
    [
      fc('Hỏi nhà phê bình họ thấy gì', 'Ask the critic what they see',
        'Nhà phê bình nói một câu duy nhất về góc nhìn của bạn, và nó đúng đến khó chịu. Bạn nghĩ về câu ấy suốt hai năm.', 'The critic says one sentence about your angle of view, and it is uncomfortably right. You think on it for two years.', { sanity: -3, rep: 5, network: 4 }, { meritAdd: 3 }),
      fc('Cho người mua vào trước', 'Let the buyer in first',
        'Người mua trả giá gấp ba rồi mang tác phẩm đi. Nhà phê bình nhìn khoảng trống trên tường và nói bạn đã học được một bài học khác.', 'The buyer pays triple and carries the work off. The critic looks at the empty wall space and says you have learned a different lesson.', { wealth: 18, rep: -2, sanity: -3 }),
      fc('Đứng yên và chờ họ nói', 'Stand still and wait for them to speak',
        'Cả hai giờ trôi qua. Rồi nhà phê bình quay sang bạn và nói: "Tôi muốn thấy lần sau." Đó là câu khen đầu tiên bạn nhận.', 'Two hours pass. Then the critic turns to you and says: “I want to see the next one.” It is the first praise you receive.', { rep: 6, sanity: 4 })
    ], 8),

  mission('ring_glass_cabinet', [1, 2],
    '[Tủ kính trong phòng triển lãm] Một tủ kính trong phòng triển lãm bị ai đó mở khóa lúc đêm, và một tác phẩm nhỏ bị đổi chỗ vài phân. Không có gì mất. Docent muốn biết ai và vì sao.',
    '[The glass cabinet] A glass cabinet in the gallery is unlocked at night, and one small work is moved a few centimeters. Nothing is missing. The Docent wants to know who and why.',
    [
      fc('Canh phòng triển lãm ba đêm liền', 'Watch the gallery three nights running',
        'Đêm thứ ba một người già bước vào, đặt tác phẩm về chỗ cũ, và nói đó là chỗ nó thuộc về từ nhiều năm trước. Ông là người chế tác nó.', 'On the third night an old person walks in, sets the work back, and says that is where it belonged years ago. They are the one who made it.', { sanity: -3, rep: 6, network: 6 }),
      fc('Đặt một sợi chỉ qua khe tủ và xem sáng mai', 'Lay a thread across the cabinet gap and look in the morning',
        'Sợi chỉ đứt, và một vết ngón tay nằm trên kính. Bạn khớp nó với một người trong phòng, và quyết định không nói.', 'The thread is cut, and a fingerprint sits on the glass. You match it to someone in the room, and decide not to say.', { sanity: -5, network: 4, rep: 3 }),
      fg('Hỏi thẳng Docent muốn tìm người ấy để làm gì', 'Ask the Docent straight why they want to find that person', [
        [55, 'Docent im lặng rồi thừa nhận chính mình đã đổi chỗ nó. Bà muốn xem ai nhận ra. Bạn nhận ra, và bà gật đầu rất chậm.', 'The Docent is silent then admits they moved it themself. They wanted to see who would notice. You noticed, and they nod very slowly.', { rep: 8, network: 5 }],
        [45, 'Docent nhìn bạn lạnh lẽo và nói bạn đang hỏi điều không đáng hỏi. Bạn không bị phạt, nhưng ghế của bạn ở bàn xa hơn một chút.', 'The Docent looks at you coldly and says you are asking what is not worth asking. You are not punished, but your seat at the table is a little farther away.', { rep: -4, network: -3 }]
      ])
    ]),

  mission('ring_student_wants_out', [1, 2],
    '[Học trò muốn rời] Một Student của bạn đến xưởng lúc rạng sáng với một bọc đồ nhỏ và nói họ không thể tiếp tục. Họ không giận. Họ chỉ nói mỗi lần nhìn một tác phẩm, họ nghe thấy nó thở.',
    '[A student who wants to leave] A student of yours comes to the studio at dawn with a small bundle and says they cannot go on. They are not angry. They say only that whenever they look at a work they hear it breathe.',
    [
      fc('Để họ đi và chúc họ may mắn', 'Let them go and wish them well',
        'Họ cúi đầu và đi trong im lặng. Bạn không biết họ đã nghe gì. Một năm sau bạn nhận một tấm thiệp từ một thị trấn xa, chỉ có một dòng chữ viết tay.', 'They bow and leave in silence. You never know what they heard. A year later a card arrives from a far town with one handwritten line.', { sanity: 3, rep: 3, network: 3 }),
      fc('Giữ họ lại một mùa và cho họ nghỉ vẽ', 'Keep them a season and let them rest from painting',
        'Họ ở lại, quét sàn, nấu ăn, không chạm đến bút. Cuối mùa họ cầm bút lên lại và vẽ một bức tranh về tiếng thở ấy.', 'They stay, sweep floors, cook, and do not touch a brush. At season’s end they pick it up again and paint a picture of that breathing.', { sanity: -2, rep: 7, network: 6 }, { meritAdd: 3 }),
      fc('Nói họ phải nghe thêm để học', 'Tell them to keep listening in order to learn',
        'Họ nhìn bạn rất lâu và ở lại. Sáng hôm sau họ không còn nói chuyện với ai. Bạn nhận ra mình vừa làm điều gì đó không thể lấy lại.', 'They look at you a long while and stay. The next morning they speak to no one. You realize you have done something that cannot be taken back.', { sanity: -9, rep: 2, resonance: 8 })
    ], 8),

  mission('ring_patron_wants_a_face', [2, 3],
    '[Người bảo trợ muốn một khuôn mặt] Một người bảo trợ giàu có đặt Ring làm một bức chân dung của người vợ đã mất. Họ chỉ có một bức ảnh nhòe và một lọn tóc. Họ muốn khuôn mặt giống đến mức họ không phân biệt được.',
    '[A patron wants a face] A wealthy patron commissions the Ring for a portrait of a dead spouse. They have only a blurred photograph and a lock of hair. They want a likeness so exact they cannot tell the difference.',
    [
      fc('Vẽ đúng như ảnh nhòe, để nó cũng nhòe', 'Paint exactly as the blurred photograph, so it is blurred too',
        'Người bảo trợ nhìn bức tranh rất lâu và bật khóc. "Đó là cách tôi nhớ bà ấy." Họ trả gấp đôi và không nói gì thêm.', 'The patron looks long at the painting and weeps. “That is how I remember her.” They pay double and say no more.', { wealth: 28, rep: 6, sanity: -2 }),
      fc('Vẽ một khuôn mặt rõ ràng, dựa trên suy đoán của bạn', 'Paint a clear face based on your own guess',
        'Bức tranh đẹp và xa lạ. Người bảo trợ treo nó trong phòng khách và không bao giờ nhìn vào mắt người trong tranh. Bạn nhận tiền và cảm thấy mình vừa lừa một người đang đau.', 'The painting is beautiful and strange. The patron hangs it in the parlor and never looks into the eyes of the figure. You take the money and feel you cheated someone in grief.', { wealth: 24, sanity: -8, rep: 2 }),
      fg('Dùng lọn tóc làm một phần của bức tranh', 'Use the lock of hair as part of the painting', [
        [55, 'Lọn tóc nằm trong khung như một nét bút thật. Người bảo trợ chạm vào kính và thì thầm một cái tên. Bức tranh được kể lại trong giới như một tác phẩm mà không ai dám bắt chước.', 'The hair lies in the frame like a real brushstroke. The patron touches the glass and whispers a name. The painting is spoken of in the circle as one no one dares imitate.', { rep: 12, wealth: 30, resonance: 6 }],
        [45, 'Người bảo trợ nhận ra lọn tóc và quay đi. "Đó là thứ duy nhất tôi còn." Bạn lấy lại nó, và bức tranh vẫn đẹp, nhưng người ấy không bao giờ nhìn vào nó nữa.', 'The patron recognizes the hair and turns away. “That is the only thing I have left.” You take it back, and the painting is still lovely, but they never look at it again.', { rep: -4, sanity: -6, wealth: 10 }]
      ])
    ], 10),

  mission('ring_forged_hand', [2, 3],
    '[Bàn tay giả] Một tác phẩm của bạn xuất hiện ở một cuộc đấu giá với chữ ký của bạn, nhưng bạn chưa bao giờ làm nó. Nét bút giống đến mức chính bạn do dự. Người đấu giá nói nó đến từ một người bảo trợ cũ của bạn.',
    '[A forged hand] A work bearing your signature appears at an auction, but you never made it. The stroke is so like yours that you hesitate yourself. The auctioneer says it came from one of your old patrons.',
    [
      fc('Tố cáo công khai ngay tại buổi đấu giá', 'Denounce it openly at the auction',
        'Cả phòng im bặt. Người đấu giá xin lỗi, và tác phẩm bị rút. Người bảo trợ cũ ngồi ở hàng cuối và không nhìn bạn. Bạn biết bạn vừa mất một người bạn.', 'The whole room goes silent. The auctioneer apologizes and the work is withdrawn. The old patron sits in the back row and does not look at you. You know you have just lost a friend.', { rep: 10, network: -6, sanity: -4 }),
      fc('Mua nó lại bằng tiền của mình và giữ nó', 'Buy it back with your own money and keep it',
        'Bạn trả gấp ba giá và giữ bức tranh trong phòng làm việc. Mỗi sáng nhìn nó, bạn thấy một người giống bạn mà không phải bạn.', 'You pay triple and keep the painting in your workroom. Each morning you look at it and see someone like you who is not you.', { wealth: -30, sanity: -4, rep: 3, resonance: 6 }),
      fg('Tìm đến người bảo trợ cũ và hỏi thẳng', 'Go to the old patron and ask directly', [
        [55, 'Họ thú nhận người làm giả là con của họ, đang cố trả nợ. Bạn không nói gì, và đưa cho đứa trẻ một cây bút thật của mình.', 'They confess the forger is their child, trying to pay a debt. You say nothing, and hand the child one of your own real brushes.', { rep: 8, network: 8, sanity: 4 }],
        [45, 'Người bảo trợ nói họ không biết gì và đóng cửa. Bạn đứng ngoài cửa rất lâu, và không biết họ nói thật hay không.', 'The patron says they know nothing and shuts the door. You stand outside a long time and do not know whether they told the truth.', { sanity: -5, network: -4 }]
      ])
    ]),

  mission('ring_the_unfinished_wing', [2, 3],
    '[Cánh phòng chưa xong] Gallery của Ring có một cánh phòng bị khóa đã mười năm, chưa ai hoàn thành nó. Maestro giao chìa khóa cho bạn và nói chỉ một điều: "Đừng mở khi một mình."',
    '[The unfinished wing] The Ring’s gallery has a wing locked for ten years that no one has finished. The Maestro hands you the key and says only one thing: “Do not open it alone.”',
    [
      fc('Mở cùng một Docent', 'Open it with a Docent',
        'Bên trong là một căn phòng đầy khung tranh trống, mỗi khung có một tấm thẻ ghi tên người bạn chưa gặp. Docent bên cạnh bạn thì thầm: "Họ chưa sinh."', 'Inside is a room full of empty frames, each with a card bearing the name of someone you have not met. The Docent beside you whispers: “They are not yet born.”', { sanity: -8, rep: 7, resonance: 8 }),
      fc('Mở một mình, đúng như được cấm', 'Open it alone, as forbidden',
        'Cửa mở và căn phòng trống không. Bạn đứng ở ngưỡng đến khi đèn vụt tắt. Khi bạn ra, Maestro đang chờ, nhìn bạn rất lâu và không nói gì.', 'The door opens on an empty room. You stand at the threshold until the lamps go out. When you come out the Maestro is waiting, looking at you long and saying nothing.', { sanity: -12, rep: 4, resonance: 12 }),
      fc('Trả chìa khóa lại và nói bạn chưa sẵn sàng', 'Return the key and say you are not ready',
        'Maestro nhận chìa khóa mà không giận. "Chưa ai sẵn sàng. Chỉ có người nhận ra điều đó." Họ cất chìa vào túi áo, và cánh phòng vẫn khóa.', 'The Maestro takes the key without anger. “No one is ready. Only some realize it.” They put the key in a pocket, and the wing stays locked.', { sanity: 5, rep: 3 })
    ], 9),

  mission('ring_a_commission_in_reverse', [2, 3],
    '[Đơn đặt hàng ngược] Một người đến xưởng đặt Ring làm một tác phẩm mà họ sẽ phá hủy ngay sau khi hoàn thành. Họ trả gấp mười giá thường, và nói nghệ thuật chỉ thật sự khi nó biến mất.',
    '[A commission in reverse] Someone comes to the studio and orders a work from the Ring that they will destroy as soon as it is finished. They pay ten times the usual price and say art is real only when it disappears.',
    [
      fc('Nhận đơn và làm hết sức mình', 'Take the commission and give it everything',
        'Bạn làm trong ba tuần mà không ngủ nhiều. Khi hoàn thành, người ấy đốt nó trước mặt bạn. Bạn nhìn lửa cháy và nghĩ đó là tác phẩm tốt nhất đời mình.', 'You work three weeks without much sleep. When it is finished the client burns it before you. You watch the flames and think it is the best work of your life.', { wealth: 40, sanity: -8, rep: 5, resonance: 6 }),
      fc('Nhận đơn nhưng làm một bản sao để giữ lại', 'Take the commission but make a copy to keep',
        'Bản sao nằm trong ngăn kéo của bạn và nặng nề như một lời thú tội. Người đặt hàng không bao giờ biết. Bạn không bao giờ cho ai xem.', 'The copy lies in your drawer and weighs on you like a confession. The client never knows. You never show it to anyone.', { wealth: 38, sanity: -6, rep: 2 }),
      fc('Từ chối, nói nghệ thuật phải còn lại', 'Refuse, saying art must remain',
        'Người ấy gật đầu và đặt một phong bì nhỏ lên bàn như một lời cảm ơn. Bạn không mở nó. Sau này bạn nghe nói họ tìm được một người khác nhận.', 'They nod and set a small envelope on the table as thanks. You do not open it. Later you hear they found someone else to accept.', { sanity: 4, rep: 4, wealth: -2 })
    ], 8),

  mission('ring_the_apprentice_at_the_door', [2, 3],
    '[Người học việc đứng ở cửa] Một đứa trẻ đứng ở cửa xưởng ba ngày liền, không xin gì, chỉ nhìn qua khe cửa. Bạn nhận ra cách nó cầm than vẽ: nó chưa bao giờ học, và vẫn cầm đúng.',
    '[The apprentice at the door] A child stands at the studio door three days running, asking nothing, only looking through the gap. You see how it holds the charcoal: it has never been taught, and holds it right.',
    [
      fc('Mời vào và đưa nó một tờ giấy', 'Invite it in and give it a sheet of paper',
        'Nó vẽ mà không ngẩng đầu suốt hai giờ. Bức vẽ không có gì khoa trương, nhưng chỗ trống trong đó khiến bạn lặng người. Bạn xin gia đình nó cho nó ở lại.', 'It draws for two hours without lifting its head. The drawing has nothing grand, but the blank space in it leaves you silent. You ask its family to let it stay.', { sanity: 6, rep: 8, network: 6 }, { meritAdd: 4 }),
      fc('Đưa nó đến một Maestro nổi tiếng hơn bạn', 'Take it to a Maestro better known than you',
        'Maestro nổi tiếng nhận nó và để lại cho bạn một phong bì nhỏ. Nó lớn thành một nghệ sĩ có tiếng, và mỗi năm gửi bạn một bức vẽ không có chữ.', 'The famed Maestro takes it and leaves you a small envelope. It grows into a known artist and sends you one drawing each year with no words.', { rep: 6, wealth: 10, sanity: 3 }),
      fc('Đóng cửa và nói xưởng không nhận trẻ con', 'Close the door and say the studio takes no children',
        'Đứa trẻ không khóc. Nó nhặt than vẽ đặt lên bậc cửa và đi. Bạn giữ mẩu than ấy trong ngăn kéo, và không bao giờ vẽ bằng nó.', 'The child does not cry. It sets the charcoal on the doorstep and goes. You keep that piece in a drawer, and never draw with it.', { sanity: -7, rep: -2 })
    ], 9),

  mission('ring_the_museum_of_one', [3, 3],
    '[Bảo tàng của một người] Một người sưu tầm tặng Ring cả bộ sưu tập của họ với một điều kiện: Grand Curator phải đích thân sống cạnh nó một năm. Căn nhà của họ nằm ở ngoại ô, và những người hàng xóm không nói chuyện với ai.',
    '[A museum of one] A collector bequeaths their entire collection to the Ring on one condition: the Grand Curator must live beside it for a year in person. The house is in the suburbs, and the neighbors speak to no one.',
    [
      fc('Chuyển đến sống một năm', 'Move in for a year',
        'Mỗi đêm bạn nghe tiếng ai đó đi qua các phòng. Đến tháng thứ chín bạn không còn sợ nữa, và nhận ra mình đang nói chuyện với bộ sưu tập. Khi bạn rời nhà, nó nhìn theo.', 'Every night you hear someone walk through the rooms. By the ninth month you are no longer afraid and realize you are talking to the collection. When you leave the house, it watches you go.', { rep: 12, sanity: -10, resonance: 12, wealth: 35 }, { meritAdd: 6 }),
      fc('Cử một Docent thay bạn sống', 'Send a Docent to live there in your place',
        'Người ấy chuyển đi, và ba tháng sau gửi thư nói họ không muốn rời đi. Bộ sưu tập tặng cho Ring như đã hứa, nhưng bạn không biết có ai đó chịu thiệt.', 'They move in, and three months later write that they do not wish to leave. The collection goes to the Ring as promised, but you do not know whether anyone lost for it.', { rep: 6, wealth: 28, network: 4, sanity: -3 }),
      fc('Từ chối và để bộ sưu tập về với người thừa kế', 'Refuse and let the collection go to the heir',
        'Người thừa kế bán nó trong ba tháng. Từng món một, bạn thấy những tác phẩm ấy xuất hiện ở những nơi chúng không thuộc về. Bạn không nói gì, và nhớ mãi.', 'The heir sells it within three months. Piece by piece you see those works appear where they do not belong. You say nothing, and remember it always.', { sanity: -6, rep: -3, wealth: -8 })
    ], 11),

  mission('ring_the_last_critic', [3, 3],
    '[Nhà phê bình cuối cùng] Một nhà phê bình già đến xưởng, đứng rất lâu trước tác phẩm mới nhất của bạn, rồi nói họ sắp chết và muốn nhìn một điều trước khi chết. Họ muốn bạn vẽ lại bức tranh đầu tay của họ.',
    '[The last critic] An old critic visits the studio, stands a long while before your latest work, then says they are dying and want to see one thing before they go. They want you to repaint their first painting.',
    [
      fc('Vẽ lại đúng như họ nhớ', 'Repaint it exactly as they remember',
        'Bạn vẽ trong năm ngày, theo lời kể từng nét một. Khi xong, họ nhìn bức tranh rất lâu và nói: "Không giống." Rồi mỉm cười: "Nhưng đó là điều tôi cần."', 'You paint for five days, following their account stroke by stroke. When it is done they look at it a long time and say: “It is not the same.” Then smile: “But it is what I needed.”', { sanity: 8, rep: 9, network: 8 }),
      fc('Vẽ lại theo cách bạn nghĩ nó nên là', 'Repaint it as you think it should be',
        'Họ nhìn nó, im lặng, rồi bật cười. "Ba mươi năm tôi đã nghĩ nó sai chỗ này." Họ mất trong tuần ấy, và bức tranh của bạn được chôn cùng.', 'They look, are silent, then laugh. “Thirty years I thought it wrong in that spot.” They die that week, and your painting is buried with them.', { rep: 12, sanity: 4, wealth: 15 }, { meritAdd: 6 }),
      fc('Nói bạn không vẽ lại tranh của người khác', 'Say you do not repaint another’s work',
        'Họ gật đầu như đã đoán trước và ngồi lại cạnh bạn đến chiều. Họ không xin lại, và bạn nghĩ về lời từ chối ấy suốt phần đời còn lại.', 'They nod as if expecting it and sit with you until evening. They do not ask again, and you think about that refusal the rest of your life.', { sanity: -5, rep: 3 })
    ], 9),

  mission('ring_the_open_studio', [3, 3],
    '[Xưởng mở cửa] Lần đầu tiên sau nhiều thập niên, Ring mở xưởng cho công chúng vào xem trong một ngày. Hàng nghìn người xếp hàng ngoài phố. Bạn phải chọn tác phẩm nào được đặt trước cửa.',
    '[The open studio] For the first time in decades the Ring opens its studio to the public for one day. Thousands queue in the street. You must choose which work stands before the door.',
    [
      fc('Đặt tác phẩm đẹp nhất', 'Place the most beautiful work',
        'Đám đông đứng im lặng và nhiều người khóc không biết vì sao. Tối đó bạn đếm quà họ để lại: hoa, thư, và một chiếc giày trẻ con.', 'The crowd stands silent and many weep without knowing why. That evening you count the gifts they left: flowers, letters, and a child’s shoe.', { rep: 14, network: 10, sanity: 4 }, { meritAdd: 6 }),
      fc('Đặt tác phẩm khó nhìn nhất', 'Place the hardest work to look at',
        'Một nửa đám đông bỏ đi trong im lặng. Nửa còn lại ở lại cả ngày. Họ là những người bạn muốn nói chuyện, và họ đến cả những năm sau.', 'Half the crowd leaves in silence. The other half stay all day. They are the ones you wanted to talk to, and they come in later years too.', { rep: 8, network: 14, sanity: -6, resonance: 6 }),
      fg('Để một đứa trẻ trong đám đông chọn', 'Let a child from the crowd choose', [
        [55, 'Đứa trẻ chọn một tác phẩm nhỏ ở góc phòng mà không ai để ý. Cả hàng người ngạc nhiên rồi dần dần nhìn nó khác đi. Tác phẩm ấy được hỏi mua nhiều nhất năm đó.', 'The child picks a small work in a corner no one had noticed. The whole line is surprised then slowly begins to see it differently. It is the most inquired-after work that year.', { rep: 12, network: 12, wealth: 20 }],
        [45, 'Đứa trẻ chọn tác phẩm mà bạn ít ưng nhất. Bạn đứng cạnh nó cả ngày và nghe những lời nhận xét. Không ai khen, và bạn học được điều gì đó.', 'The child picks the work you like least. You stand beside it all day and hear the remarks. No one praises it, and you learn something.', { rep: -3, sanity: -4, resonance: 4 }]
      ])
    ], 10),

  mission('ring_the_name_on_the_wall', [3, 3],
    '[Cái tên trên tường] Tên bạn được khắc lên tường phòng triển lãm chính của Ring, như thông lệ dành cho mọi Grand Curator. Thợ khắc hỏi bạn muốn nét chữ sâu bao nhiêu, vì tường sẽ còn lại lâu hơn người đọc nó.',
    '[The name on the wall] Your name is to be cut into the wall of the Ring’s main gallery, as is custom for every Grand Curator. The engraver asks how deep you want the letters, since the wall will outlast anyone who reads it.',
    [
      fc('Khắc sâu, để không ai xóa được', 'Cut it deep so no one can erase it',
        'Chữ nằm trên tường như một vết thương lành. Nhiều năm sau, một đứa trẻ đưa ngón tay lần theo nét khắc và hỏi bạn là ai. Bạn không còn ở đó để trả lời.', 'The letters lie on the wall like a healed wound. Years later a child traces the cut with a finger and asks who you were. You are no longer there to answer.', { rep: 10, sanity: -3, wealth: -8 }),
      fc('Khắc nông, để thời gian tự xóa', 'Cut it shallow and let time wear it away',
        'Thợ khắc nhìn bạn một lúc rồi gật đầu. Nét chữ mờ dần theo từng mùa, và một người học việc trong Ring mỗi năm đi qua nó một lần, chỉ để xem nó còn không.', 'The engraver looks at you a moment then nods. The letters fade season by season, and one apprentice of the Ring walks past it each year just to see whether it remains.', { sanity: 8, rep: 6, network: 6 }),
      fc('Xin để trống một khoảng cạnh tên cho người kế vị', 'Ask to leave a space beside the name for your successor',
        'Hội đồng im lặng, rồi đồng ý. Khoảng trống ấy nằm trên tường nhiều năm, và mọi người đi qua đều nhìn nó một lúc. Bạn không bao giờ biết ai sẽ lấp.', 'The council is silent, then agrees. That space lies on the wall for years, and everyone passing looks at it a moment. You never learn who will fill it.', { sanity: 6, rep: 8, network: 8 }, { meritAdd: 5 })
    ], 8)
];
