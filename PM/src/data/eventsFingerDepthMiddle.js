// The Middle, second set of missions. The Middle is a family: the Book of Vengeance, the table, the debts that
// pass from parent to child. Five of these are for a Little Sibling just taken in (rank 0 had the thinnest set).

import { fe, fc, fg } from './fingerKit.js';

const M = 'Middle';
const mission = (id, rank, vi, en, choices, weight = 9) => ({ ...fe(id, M, rank, vi, en, choices, { weight }), mission: true });

export const MIDDLE_DEPTH = [
  mission('middle_first_chain', [0, 0],
    '[Sợi xích đầu tiên] Big Sibling của bạn đặt lên bàn một sợi xích nhỏ bằng bạc và nói đó là thứ mọi Little Sibling phải giữ trong một năm trước khi được xăm. Chỉ có một quy tắc: không được tháo ra, kể cả khi ngủ.',
    '[The first chain] Your Big Sibling sets a small silver chain on the table and says every Little Sibling must wear it for a year before being tattooed. There is one rule: it may not come off, not even in sleep.',
    [
      fc('Đeo vào ngay trước mặt cả bàn', 'Put it on at once before the whole table',
        'Sợi xích lạnh trên cổ tay một lúc rồi ấm dần. Cả bàn gật đầu, và Big Sibling rót cho bạn bát canh đầu tiên không ai phải nhắc.', 'The chain is cold on your wrist a moment, then warms. The whole table nods, and your Big Sibling pours the first bowl of soup you did not have to ask for.', { rep: 3, network: 6, sanity: 3 }),
      fc('Hỏi vì sao một năm, rồi mới đeo', 'Ask why a year, then put it on',
        'Big Sibling im lặng, rồi kể một chuyện về người từng tháo xích đêm đầu tiên. Bạn nghe hết, đeo lên, và không tháo ra nữa.', 'Your Big Sibling is silent, then tells of one who took the chain off the first night. You hear it through, put it on, and never take it off.', { sanity: -3, network: 4, rep: 4 }, { meritAdd: 2 }),
      fc('Đeo vào, nhưng giấu dưới tay áo', 'Wear it, but hide it under your sleeve',
        'Một người ngồi cạnh nhìn thấy và không nói gì. Tối đó có người đặt thêm một cái bát trước mặt bạn, như một cách im lặng nhận bạn.', 'Someone beside you notices and says nothing. That evening a second bowl is set before you, a quiet way of accepting you.', { network: 5, rep: 1 })
    ], 8),

  mission('middle_kitchen_duty', [0, 1],
    '[Phiên bếp của gia đình] Đến lượt bạn nấu cho cả nhà, mười hai người, và mỗi người nhớ món ăn của một người đã mất. Nồi canh sôi quá lâu đã cháy đáy, và Big Sibling bước vào bếp.',
    '[The family’s kitchen shift] It is your turn to cook for the whole house, twelve people, each remembering the dish of someone gone. The soup has boiled too long and burned at the bottom, and your Big Sibling walks into the kitchen.',
    [
      fc('Nói thật là canh đã cháy và dọn đồ khác', 'Say plainly the soup burned and serve something else',
        'Big Sibling nếm một thìa và cười. "Món cháy là món của ông nội." Cả nhà ăn nồi canh cháy trong tiếng cười, và bạn không bị trách.', 'Your Big Sibling tastes a spoonful and laughs. “Burnt soup is grandfather’s dish.” The house eats the burned pot amid laughter and you are not blamed.', { sanity: 5, network: 6, rep: 2 }),
      fc('Cứu nồi canh bằng cách thêm gia vị', 'Rescue the pot with spices',
        'Nồi canh được cứu, nhưng có vị lạ. Một người già nói đó là vị của quê. Bạn không chắc quê của ai.', 'The pot is saved, but with a strange taste. An old person says it is the taste of home. You are not sure whose home.', { sanity: -2, network: 3, rep: 3 }),
      fg('Nấu lại từ đầu, khiến bữa muộn một giờ', 'Cook again from the start, making dinner an hour late', [
        [60, 'Cả nhà chờ, và bữa muộn ấy được nhớ như một bữa có người đứng bếp thật lòng. Bạn nhận lời khen đầu tiên.', 'The house waits, and that late dinner is remembered as one cooked sincerely. You receive your first praise.', { rep: 5, network: 8, sanity: 4 }],
        [40, 'Có người đói và nổi giận. Big Sibling gạt đi, nhưng bạn nghe được vài lời thì thầm sau bàn.', 'Someone hungry loses temper. Your Big Sibling waves it off, but you hear some whispers behind the table.', { rep: -3, network: -3, sanity: -3 }]
      ])
    ]),

  mission('middle_lost_button', [0, 1],
    '[Chiếc cúc áo] Một Great Elder đánh rơi chiếc cúc áo trong buổi lễ và không ai dám nhặt. Chiếc cúc nằm trên sàn giữa phòng, và cả phòng đang nhìn nó thay vì nhìn nhau.',
    '[The button] A Great Elder drops a button during the ceremony and no one dares pick it up. It lies on the floor in the middle of the room, and the whole room looks at it instead of at each other.',
    [
      fc('Cúi xuống nhặt và trao lại bằng cả hai tay', 'Bend down, pick it up and return it with both hands',
        'Great Elder nhận lại và gật đầu rất nhẹ. Cả phòng thở ra. Bạn không biết mình vừa làm đúng hay vừa phá lệ, nhưng không ai nói gì.', 'The Great Elder takes it back and nods very slightly. The whole room exhales. You do not know whether you did right or broke custom, but no one says anything.', { rep: 5, network: 5 }),
      fc('Chờ Great Elder tự nhặt', 'Wait for the Great Elder to pick it up themself',
        'Great Elder đứng nhìn chiếc cúc rất lâu rồi bước qua nó. Chiếc cúc ở đó đến cuối buổi lễ, và bạn là người nhìn nó nhiều nhất.', 'The Great Elder stands looking at the button a long while, then steps past it. It lies there till the end of the ceremony, and you are the one who looks at it most.', { sanity: -3, rep: 2 }),
      fc('Đá nhẹ chiếc cúc về phía người đứng cạnh', 'Nudge the button gently toward the person standing beside you',
        'Người ấy hoảng, nhặt lên, và trao cho Great Elder như chính mình đã đánh rơi. Họ nhìn bạn một cái rất ngắn. Bạn đã tạo một món nợ nhỏ.', 'That person panics, picks it up and hands it to the Great Elder as if they had dropped it. They give you one very brief look. You have created a small debt.', { network: -4, rep: 1, sanity: -2 })
    ], 7),

  mission('middle_first_name_in_the_book', [0, 1],
    '[Cái tên đầu tiên bạn ghi] Big Sibling đưa bạn cây bút và cuốn Book of Vengeance mở ở một trang trắng. "Tên đầu tiên bạn ghi sẽ ở đó mãi," người ấy nói. Có ba người đang chờ bạn quyết.',
    '[The first name you write] Your Big Sibling hands you the pen and the Book of Vengeance open at a blank page. “The first name you write will stay there forever,” they say. Three people are waiting for your decision.',
    [
      fc('Ghi tên người đã làm hại gia đình nặng nhất', 'Write the name of the one who harmed the family most',
        'Nét bút của bạn không run. Big Sibling nhìn tên ấy và gật đầu. Bạn nhận ra mình vừa trở thành người cầm cuốn sổ, chứ không còn là người đứng ngoài nó.', 'Your hand does not shake. Your Big Sibling looks at the name and nods. You realize you have become one who holds the book, not one who stands outside it.', { rep: 5, sanity: -6, network: 4 }, { meritAdd: 3 }),
      fc('Ghi tên người đã làm hại bạn, rồi gạch ngay', 'Write the name of the one who harmed you, then strike it at once',
        'Big Sibling không nói gì với nét gạch ấy. Cuốn sổ giữ cả cái tên lẫn nét gạch. Ở Middle, đôi khi tha thứ cũng cần được viết ra.', 'Your Big Sibling says nothing of the stroke. The book holds both the name and the line through it. In the Middle, sometimes forgiveness too must be written down.', { sanity: 6, rep: 3, network: 2 }),
      fc('Trả bút lại và nói bạn chưa sẵn sàng', 'Hand the pen back and say you are not ready',
        'Big Sibling gập sổ rất nhẹ. "Đó cũng là một câu trả lời." Hai người ngồi lại bên bếp lửa, và lần đầu họ nói chuyện như người cùng nhà.', 'Your Big Sibling closes the book very gently. “That is also an answer.” The two of you sit by the fire, and for the first time talk as people of one house.', { sanity: 5, network: 5, rep: -1 })
    ], 9),

  mission('middle_funeral_meal', [0, 1],
    '[Bữa cơm sau tang] Một người trong gia đình mất, và bạn được giao ngồi cạnh người con trai út của họ trong bữa cơm sau tang lễ. Cậu bé không ăn, không khóc, chỉ nhìn bạn từng cử động.',
    '[The meal after a funeral] Someone in the family has died, and you are assigned to sit beside their youngest son at the meal after the funeral. The boy does not eat or cry, only watches your every movement.',
    [
      fc('Ngồi yên và ăn cùng, không nói gì', 'Sit still and eat with him, saying nothing',
        'Sau mười phút cậu bé cầm đũa lên. Bạn không nhìn sang. Khi bữa ăn xong cậu bé để lại một viên kẹo trước chỗ bạn, và không nói vì sao.', 'After ten minutes the boy lifts his chopsticks. You do not look across. When the meal ends he leaves a sweet by your place and does not say why.', { sanity: 6, network: 6, rep: 2 }),
      fc('Kể cho cậu nghe về người đã mất', 'Tell him about the one who died',
        'Cậu bé nghe với mắt mở to, rồi hỏi một câu mà bạn không trả lời được. Bạn hứa sẽ hỏi lại các bậc lớn tuổi, và giữ lời.', 'The boy listens wide-eyed, then asks a question you cannot answer. You promise to ask the elders again, and keep your word.', { sanity: 3, rep: 4, network: 5 }),
      fc('Dắt cậu ra sân và chơi một ván cờ nhanh', 'Take him out to the yard for a quick game',
        'Cậu bé thua ba ván liền mà không nổi giận. Đến ván thứ tư cậu cười. Một Great Elder đứng nhìn từ cửa sổ và quay đi.', 'The boy loses three in a row and does not lose his temper. By the fourth game he is smiling. A Great Elder watches from the window and turns away.', { sanity: 7, rep: 3, health: 2 })
    ], 8),

  mission('middle_dispute_over_a_wall', [1, 2],
    '[Bức tường giữa hai nhà] Hai gia đình trong Middle tranh nhau một bức tường: tường ấy nằm đúng ranh, và mỗi bên cho rằng cái bóng của nó thuộc về mình. Bạn được gọi đến để nói điều công bằng.',
    '[The wall between two houses] Two families in the Middle quarrel over a wall that sits exactly on the boundary, each claiming its shadow as their own. You are called to say what is fair.',
    [
      fc('Chia bóng của bức tường theo giờ trong ngày', 'Divide the wall’s shadow by the hours of the day',
        'Hai nhà nhìn nhau rồi bật cười: buổi sáng bóng về bên này, buổi chiều về bên kia. Một cuộc tranh cãi mười năm kết thúc trong một buổi chiều.', 'The two houses look at each other and laugh: morning shadow to this side, afternoon to that. A ten-year quarrel ends in one afternoon.', { rep: 7, network: 8, sanity: 3 }, { meritAdd: 4 }),
      fc('Phá bỏ bức tường và để hai nhà tự chia đất', 'Tear down the wall and let the houses divide the land',
        'Tường đổ trong một giờ. Ba tuần sau hai nhà dựng một hàng rào thấp, và cả hai đều thấy nhẹ nhõm vì không còn gì để cãi.', 'The wall comes down in one hour. Three weeks later the houses build a low fence, and both are relieved to have nothing left to argue about.', { wealth: -8, network: 6, rep: 4 }),
      fg('Báo cả hai bên đến Big Sibling rồi để người ấy quyết', 'Take both parties to a Big Sibling and let them decide', [
        [55, 'Big Sibling quyết trong năm phút và không ai phản đối. Bạn học được điều gì đó từ cách người ấy im lặng trước khi nói.', 'The Big Sibling decides in five minutes and no one objects. You learn something from how they pause before speaking.', { rep: 5, network: 5 }],
        [45, 'Big Sibling nói bạn nên tự quyết và gửi cả hai nhà trở lại. Bạn mất cả tuần, và cả hai nhà không còn tin bạn lắm.', 'The Big Sibling says you should decide yourself and sends both houses back. You lose a whole week, and neither house trusts you much.', { rep: -4, network: -3, sanity: -3 }]
      ])
    ], 9),

  mission('middle_borrowed_name', [1, 2],
    '[Cái tên mượn] Một người lạ nhận mình là họ hàng xa của gia đình và xin ở nhờ ba đêm. Tên họ không có trong sổ. Big Sibling bảo bạn kiểm tra trước khi ai cho họ ngồi vào bàn ăn.',
    '[A borrowed name] A stranger claims to be a distant relative of the family and asks to stay three nights. Their name is not in the book. Your Big Sibling tells you to check before anyone lets them to the table.',
    [
      fc('Đối chiếu từng người họ hàng cho đến khi tìm ra kẽ hở', 'Cross-check every relative until you find the gap',
        'Bạn tìm ra: họ nói đúng một phần, và phần sai là một người đã mất. Bạn đến gặp người lạ và nói cho họ biết. Họ khóc, và không bỏ đi.', 'You find it: they are partly right, and the wrong part is someone dead. You go to the stranger and tell them. They weep and do not leave.', { rep: 6, network: 6, sanity: -4 }),
      fc('Cho họ ngồi vào bàn và quan sát cách họ ăn', 'Let them sit and watch how they eat',
        'Cách họ cầm đũa giống một người nhà ở Middle đã mất hai mươi năm. Bạn không nói với ai. Một Great Elder nhìn bạn, và biết bạn đã thấy.', 'The way they hold their chopsticks matches a Middle member dead twenty years. You tell no one. A Great Elder looks at you and knows you have seen.', { sanity: -3, rep: 5, network: 3 }),
      fc('Từ chối cho ở và đưa họ ra bến xe', 'Refuse them lodging and take them to the station',
        'Họ đi mà không phản đối. Một tuần sau có người nói họ chết trong một cuộc xô xát ở chợ. Bạn nghĩ về chiếc bàn trống bên cạnh mình.', 'They leave without protest. A week later someone says they died in a scuffle at the market. You think of the empty seat beside you.', { sanity: -8, rep: -2 })
    ]),

  mission('middle_vigil_for_a_name', [1, 2],
    '[Đêm thức cho một cái tên] Một cái tên sắp được gạch khỏi Book of Vengeance, và theo thông lệ, một người trong gia đình phải thức cùng họ cả đêm. Không ai tình nguyện. Big Sibling nhìn về phía bạn.',
    '[A vigil for a name] A name is about to be struck from the Book of Vengeance, and by custom a member of the family must keep vigil with them through the night. No one volunteers. Your Big Sibling looks toward you.',
    [
      fc('Nhận thức cùng và nói chuyện đến sáng', 'Accept the vigil and talk with them until morning',
        'Người ấy nói suốt đêm về một vụ việc mà bạn chưa nghe. Khi trời sáng, họ cảm ơn bạn và không nhắc lại. Cái tên được gạch mà không ai oán.', 'They talk all night of an affair you had not heard. At dawn they thank you and do not mention it again. The name is struck with no resentment.', { sanity: -4, rep: 6, network: 7 }, { meritAdd: 4 }),
      fc('Ngồi cùng nhưng không nói gì', 'Sit with them but say nothing',
        'Họ nhìn bạn một lúc rồi ngủ thiếp đi. Sáng ra, họ cám ơn vì không bị hỏi. Đó là lần đầu bạn hiểu im lặng cũng là một món quà.', 'They look at you a while then fall asleep. In the morning they thank you for not being questioned. It is the first time you understand silence can be a gift.', { sanity: 3, rep: 4, network: 4 }),
      fc('Từ chối và nói bạn chưa đủ tuổi gánh việc ấy', 'Decline, saying you are too young to carry it',
        'Big Sibling không giận. Người ấy tự thức cả đêm. Sáng hôm sau họ đưa bạn một tách trà và không nói gì thêm.', 'Your Big Sibling is not angry. They keep the vigil themself. The next morning they hand you a cup of tea and say no more.', { sanity: 2, rep: -2, network: -2 })
    ], 8),

  mission('middle_family_in_two', [2, 3],
    '[Gia đình chia đôi] Một Great Elder và một Great Sibling bất đồng nên cả gia đình đã chia làm hai bàn ăn. Đứa trẻ nào chạy qua bàn bên kia cũng bị trách. Cả hai bên đều nhìn bạn, và cả hai đều tin bạn đứng về phía mình.',
    '[A family in two] A Great Elder and a Great Sibling disagree, and the whole family has split into two tables. Any child who runs to the other table is scolded. Both sides look to you, and both believe you stand with them.',
    [
      fc('Ngồi vào bàn thứ ba, một mình', 'Sit at a third table, alone',
        'Trong một tuần không ai đến ngồi cạnh bạn. Rồi một đứa trẻ bưng bát đến, và sau nó là một người già. Ba tuần sau hai bàn kia ngồi lại cạnh nhau, ngượng ngùng.', 'For a week no one sits with you. Then a child brings a bowl, then an elder. Three weeks later the other two tables sit down side by side, awkwardly.', { rep: 9, network: 12, sanity: -4 }, { meritAdd: 5 }),
      fc('Đứng về phía Great Elder để giữ lễ nghi', 'Side with the Great Elder to keep custom',
        'Bàn của Great Elder đông thêm vài người. Bàn kia ít hơn, và có người rời gia đình. Bạn thắng trong một cuộc tranh luận mà không ai muốn thắng.', 'The Great Elder’s table gains a few. The other shrinks, and some leave the family. You win in an argument no one wished to win.', { rep: 6, network: -8, sanity: -6 }),
      fg('Đề nghị cả hai cùng nấu một bữa', 'Propose that both cook a meal together', [
        [50, 'Họ nấu, cãi nhau về muối, và cười lần đầu. Bữa cơm ấy ngon một cách khó tin. Họ nhớ ai đã đề nghị.', 'They cook, argue about salt, and laugh for the first time. The meal is unbelievably good. They remember who suggested it.', { rep: 10, network: 14, sanity: 6 }],
        [50, 'Họ nấu riêng ở hai bếp và mỗi bên đem món ra khoe. Bạn đứng giữa hai chiếc bàn đầy thức ăn, và không ai ăn.', 'They cook separately in two kitchens and each side brings out dishes to show. You stand between two tables full of food and no one eats.', { rep: -3, network: -4, sanity: -3 }]
      ])
    ], 10),

  mission('middle_debt_of_a_stranger', [2, 3],
    '[Món nợ của một người lạ] Một người lạ đến cửa nhà bạn và xin trả một món nợ mà họ nói họ nợ gia đình từ thời cha họ. Không có dòng nào trong sổ ghi chuyện này. Họ đặt xuống bàn một phong bì dày.',
    '[A stranger’s debt] A stranger comes to your door and asks to pay a debt they say they owe the family from their father’s time. No line in the book records it. They set a thick envelope on the table.',
    [
      fc('Nhận phong bì và ghi vào sổ', 'Take the envelope and write it in the book',
        'Họ nhìn bạn ghi từng chữ và cúi đầu rất sâu. Sau này bạn biết cha họ đã cứu một người trong gia đình, và người đó đã mất mà chưa kịp cảm ơn.', 'They watch you write each word and bow very deep. Later you learn their father once saved someone in the family who died before thanking him.', { wealth: 18, rep: 5, sanity: 4 }),
      fc('Từ chối, nói món nợ ấy không có trong sổ', 'Refuse, saying that debt is not in the book',
        'Họ không bỏ đi. Họ ngồi trước cửa suốt ba ngày, cho đến khi Big Sibling đích thân đến nhận. Người ấy nhìn bạn một thoáng.', 'They do not leave. They sit before your door three days, until a Big Sibling comes in person to accept. The Big Sibling gives you one brief look.', { rep: -2, network: -3, sanity: -3 }),
      fg('Hỏi họ tên cha và đi tìm trong sổ cũ', 'Ask for their father’s name and search the old books', [
        [60, 'Bạn tìm ra dòng đã bị gạch từ lâu, bằng nét bút của một Great Elder. Món nợ có thật. Bạn trả lại phong bì và ghi tên họ là bạn của gia đình.', 'You find a line struck out long ago, in a Great Elder’s hand. The debt is real. You return the envelope and write their name as a friend of the family.', { rep: 8, network: 10 }],
        [40, 'Cả đêm bạn lật những cuốn sổ cũ và không tìm ra gì. Họ nhìn bạn bằng đôi mắt đỏ ngầu. "Cảm ơn vì đã tìm," họ nói, và đi.', 'All night you turn through old books and find nothing. They look at you with reddened eyes. “Thank you for searching,” they say, and go.', { sanity: -6, rep: 2 }]
      ])
    ]),

  mission('middle_exiled_sibling', [2, 3],
    '[Người bị đuổi khỏi bàn] Một Great Sibling bị gia đình đuổi từ nhiều năm và nay gửi thư xin gặp bạn. Họ nói họ không xin quay lại. Họ chỉ muốn nói một điều mà họ nghĩ gia đình nên nghe.',
    '[One put out from the table] A Great Sibling banished from the family years ago now sends a letter asking to see you. They say they do not ask to return. They want only to say one thing they think the family should hear.',
    [
      fc('Gặp họ một mình, ở một nơi kín', 'Meet them alone in a private place',
        'Họ nói điều ấy trong năm phút và bạn nghĩ về nó cả đời. Bạn không kể với ai, cho đến khi bạn đủ lớn để mang nó đến bàn họp.', 'They say it in five minutes and you think on it all your life. You tell no one until you are old enough to carry it to the council.', { sanity: -5, rep: 4, network: 6 }),
      fc('Báo Great Elder và gặp có người làm chứng', 'Tell a Great Elder and meet with a witness present',
        'Great Elder ngồi nghe, mặt không đổi. Khi người bị đuổi nói xong, ông đứng dậy và rót cho họ một chén trà. Gia đình không nhắc chuyện ấy thêm.', 'The Great Elder listens, face unmoved. When the banished one finishes he rises and pours them a cup of tea. The family does not speak of it again.', { rep: 8, network: 8, sanity: 2 }, { meritAdd: 4 }),
      fc('Từ chối và đốt lá thư', 'Refuse and burn the letter',
        'Bạn đốt thư và không kể ai. Một tuần sau, người ấy được tìm thấy chết ở bến. Không ai nói bạn có lỗi, và bạn vẫn nghĩ đến điều đó.', 'You burn the letter and tell no one. A week later the banished one is found dead at the dock. No one says it is your fault, and you still think about it.', { sanity: -10, rep: -2 })
    ], 9),

  mission('middle_old_vendetta_ends', [3, 3],
    '[Mối thù kết thúc] Mối thù giữa gia đình và một băng khác đã kéo dài ba thế hệ. Người đứng đầu băng ấy gửi lời: họ sẵn sàng chấm dứt, nhưng chỉ khi bạn đích thân đến và nhận lỗi trước mặt cả hai bên.',
    '[The end of a vendetta] The vendetta between the family and another crew has lasted three generations. The head of that crew sends word: they are ready to end it, but only if you come in person and admit fault before both sides.',
    [
      fc('Đến một mình và nhận lỗi', 'Go alone and admit fault',
        'Bạn nói một câu và cả sảnh im lặng. Rồi một người lớn tuổi bên kia đứng dậy và cúi đầu trước bạn. Mối thù khép lại. Gia đình không nhắc chuyện bạn đã nhận lỗi, và bạn biết vì sao.', 'You say one sentence and the whole hall goes silent. Then an elder on the other side rises and bows to you. The feud closes. The family does not mention your admission, and you know why.', { rep: 12, network: 12, sanity: -6 }, { meritAdd: 6 }),
      fc('Đến cùng một Great Elder để chia lỗi', 'Go with a Great Elder to share the fault',
        'Hai người cùng đứng, và hai tiếng nhận lỗi vang lên không cùng nhịp. Bên kia nhận cả hai. Mối thù kết thúc, nhưng có người trong gia đình nói bạn không đủ gan.', 'The two of you stand and two admissions sound out of step. The other side accepts both. The feud ends, though someone in the family says you lacked nerve.', { rep: 7, network: 8, sanity: 2 }),
      fg('Từ chối và đề nghị một bữa cơm hòa giải thay vì lời nhận lỗi', 'Refuse and offer a reconciliation dinner instead of an admission', [
        [50, 'Họ cân nhắc rất lâu rồi đồng ý. Bữa cơm ấy ngắn, và không ai nhắc chuyện cũ. Nhưng ghế của bạn được kê gần ghế của họ nhất.', 'They weigh it a long time then agree. The dinner is short and no one raises old matters. But your chair is placed nearest theirs.', { rep: 10, network: 14, wealth: 10 }],
        [50, 'Họ nhìn lời đề nghị như một sự xúc phạm. Mối thù tiếp tục, và có hai người trong gia đình mất mạng trước mùa xuân.', 'They take the offer as an insult. The feud goes on, and two in the family lose their lives before spring.', { rep: -7, sanity: -12, network: -6 }]
      ])
    ], 11),

  mission('middle_the_book_runs_out', [3, 3],
    '[Cuốn sổ hết trang] Cuốn Book of Vengeance đã đầy trang cuối. Một cuốn mới sẽ được mở, và theo thông lệ người đứng đầu phải chọn những tên nào được sao chép sang. Hàng trăm tên đang chờ.',
    '[The book runs out of pages] The Book of Vengeance has filled its last page. A new volume will be opened, and by custom the head must choose which names are copied over. Hundreds wait.',
    [
      fc('Sao chép từng tên, không bỏ sót ai', 'Copy each name, omitting no one',
        'Bạn viết suốt một mùa, ngón tay đau và mắt mờ. Khi xong, bạn nhận ra có những cái tên bạn không nhớ vì sao còn ở đó, và quyết định không hỏi.', 'You write all one season, fingers aching and eyes blurred. When done you realize there are names you cannot recall why remain, and decide not to ask.', { sanity: -6, rep: 8, health: -6 }),
      fc('Bỏ những tên đã quá ba mươi năm', 'Drop the names older than thirty years',
        'Hơn một nửa cuốn sổ cũ không được sao chép. Một Great Elder ngồi nhìn cuốn sổ cũ như nhìn một người bạn đã chết. Cả gia đình thở nhẹ hơn, và bạn không biết có nên vui.', 'More than half the old book is not copied. A Great Elder sits looking at the old volume like at a dead friend. The whole family breathes easier, and you do not know whether to be glad.', { rep: 6, sanity: 6, network: 6 }),
      fg('Hỏi từng người trong gia đình họ muốn giữ tên nào', 'Ask each family member which names they want kept', [
        [55, 'Cả gia đình ngồi lại, từng người một, trong ba tuần. Cuốn sổ mới mỏng hơn và nặng hơn, và ai cũng biết vì sao mình có mặt ở đó.', 'The whole family sits one by one for three weeks. The new book is thinner and heavier, and everyone knows why they are in it.', { rep: 12, network: 14, sanity: 4 }],
        [45, 'Ba người cãi nhau vì một cái tên, và buổi họp kéo dài đến tận đêm. Cuốn sổ mới được mở trong một không khí không ai nhớ đẹp.', 'Three argue over a single name, and the meeting runs on into night. The new book is opened in an atmosphere no one remembers fondly.', { rep: -3, network: -5, sanity: -6 }]
      ])
    ], 10),

  mission('middle_empty_chair', [3, 3],
    '[Chiếc ghế trống] Trong bữa tiệc năm mới, một chiếc ghế cạnh bạn vẫn để trống như mọi năm. Hôm nay có người đến ngồi vào, một người bạn chưa từng thấy, và cả bàn ngừng ăn.',
    '[The empty chair] At the new year banquet a chair beside you is left empty as every year. Today someone comes and sits in it, a person you have never seen, and the whole table stops eating.',
    [
      fc('Rót trà cho người ấy và hỏi họ muốn ăn gì', 'Pour tea for them and ask what they would like to eat',
        'Người ấy nhìn bạn rất lâu rồi gọi một món mà không ai trong nhà từng nấu. Bạn học nấu nó vào năm sau, và chiếc ghế ấy có người ngồi mỗi năm.', 'They look at you a long while and ask for a dish no one in the house has ever cooked. You learn to cook it the next year, and that chair has an occupant every year.', { sanity: 8, network: 10, rep: 6 }),
      fc('Hỏi ai đã mời họ đến', 'Ask who invited them',
        'Không ai nhận. Người lạ mỉm cười và nói chiếc ghế được để lại cho họ từ lâu. Họ ngồi hết bữa, và đến lúc ra về, cả nhà không nhớ họ đã nói gì.', 'No one owns up. The stranger smiles and says the chair was left for them long ago. They sit through the meal, and by the time they go the whole house cannot recall what they said.', { sanity: -6, rep: 3 }),
      fc('Đứng dậy nhường chỗ của chính bạn', 'Rise and give up your own seat',
        'Cả bàn nhìn bạn đứng dậy. Người lạ lắc đầu, ra hiệu cho bạn ngồi xuống, và nói chiếc ghế ấy là của bạn từ trước đến nay.', 'The whole table watches you rise. The stranger shakes their head, signs for you to sit, and says that chair has been yours all along.', { sanity: 4, rep: 7, network: 5 })
    ], 8)
];
