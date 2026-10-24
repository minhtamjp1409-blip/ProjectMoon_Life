// The Index, second set of missions: slips that reach the wrong hand, Prescripts that contradict each other,
// and what a Proxy or a Weaver owes the person a Prescript lands on.

import { fe, fc, fg } from './fingerKit.js';

const I = 'Index';
const mission = (id, rank, vi, en, choices, weight = 9) => ({ ...fe(id, I, rank, vi, en, choices, { weight }), mission: true });

export const INDEX_DEPTH = [
  mission('index_borrowed_umbrella', [0, 1],
    '[Chiếc ô mượn] Prescript viết: trả chiếc ô này cho người đã cho bạn mượn trong cơn mưa tuần trước. Bạn không nhớ đã mượn ô của ai. Chiếc ô trong tay bạn có cán gỗ mòn và một mảnh vải trắng buộc ở đuôi.',
    '[The borrowed umbrella] The Prescript says: return this umbrella to the one who lent it to you in last week’s rain. You do not remember borrowing one. The umbrella in your hand has a worn wooden handle and a strip of white cloth tied at the tail.',
    [
      fc('Đi từng nhà trong con phố hôm mưa, hỏi từng cánh cửa', 'Go house to house along the street of that rain and knock on each door',
        'Đến cánh cửa thứ mười một, một bà cụ nhận ô và nói bà chưa bao giờ cho ai mượn. Bà vẫn mời bạn trà. Prescript ghi hoàn thành, và bạn không biết vì sao.', 'At the eleventh door an old woman takes the umbrella and says she never lent one to anyone. She still offers you tea. The Prescript is marked complete, and you do not know why.', { sanity: 3, network: 4, rep: 2 }, { meritAdd: 3 }),
      fc('Để chiếc ô ở trạm xe điện nơi bạn nhớ đã đứng', 'Leave the umbrella at the tram stop where you recall standing',
        'Ô biến mất sau một đêm. Messenger đến nói Prescript đã hoàn thành. Không ai hỏi ai lấy nó.', 'The umbrella is gone after one night. A Messenger comes to say the Prescript is complete. No one asks who took it.', { sanity: -2, rep: 3 }),
      fg('Giữ chiếc ô và đợi chủ của nó tìm đến', 'Keep the umbrella and wait for its owner to find you', [
        [55, 'Ba ngày sau một người lạ gõ cửa và nói họ nghe nói bạn có ô của họ. Họ nhận ô, và trao bạn một phong thư mà bạn không mở.', 'Three days later a stranger knocks and says they heard you have their umbrella. They take it and hand you an envelope you do not open.', { network: 6, rep: 4, sanity: -3 }],
        [45, 'Không ai đến. Ngày thứ tư Messenger quay lại với vẻ mặt không đổi, và đánh dấu Prescript là chưa hoàn thành.', 'No one comes. On the fourth day the Messenger returns with an unchanged face and marks the Prescript incomplete.', { rep: -3, sanity: -4 }]
      ])
    ], 8),

  mission('index_two_clocks', [0, 1],
    '[Hai chiếc đồng hồ] Prescript viết: nhìn đồng hồ ở ga lúc sáu giờ và đồng hồ ở nhà thờ cũng lúc sáu giờ, rồi báo cho Messenger biết cái nào đúng. Hai chiếc đồng hồ chênh nhau bảy phút.',
    '[Two clocks] The Prescript says: look at the station clock at six and the old chapel clock at six, then tell the Messenger which is right. The two clocks differ by seven minutes.',
    [
      fc('Báo đồng hồ ga, vì đó là nơi nhiều người trông vào hơn', 'Report the station clock, since more people look at it',
        'Messenger gật đầu như đã biết trước. Tuần sau, đồng hồ nhà thờ được chỉnh lại cho khớp. Bạn không biết đó có phải là điều Prescript muốn.', 'The Messenger nods as if already knowing. The next week the chapel clock is adjusted to match. You do not know whether that is what the Prescript wanted.', { rep: 3, sanity: -2 }),
      fc('Báo đồng hồ nhà thờ, vì nó cũ hơn', 'Report the chapel clock, since it is older',
        'Messenger ghi lại và không nói gì. Hôm sau đồng hồ ga bị tháo ra để sửa. Hai người thợ nhìn bạn đi qua với vẻ biết ơn.', 'The Messenger writes it down and says nothing. The next day the station clock is taken out for repair. Two workmen look at you with gratitude as you pass.', { network: 5, rep: 2 }),
      fc('Báo rằng cả hai đều sai bảy phút theo hai hướng khác nhau', 'Report that both are wrong by seven minutes in opposite directions',
        'Messenger nhìn bạn rất lâu, rồi viết một dòng rất ngắn. Đó là câu trả lời duy nhất mà Prescript chưa từng được nghe.', 'The Messenger looks at you a long while, then writes one very short line. It is the one answer the Prescript has never heard.', { rep: 6, sanity: 3 }, { meritAdd: 4 })
    ]),

  mission('index_forgotten_name', [1, 2],
    '[Cái tên bị quên] Prescript yêu cầu bạn hỏi một người lạ tên họ, rồi nói to tên ấy ba lần ở quảng trường. Người lạ không nhớ tên mình. Họ đã mất trí nhớ sau một đợt sốt.',
    '[The forgotten name] The Prescript asks you to ask a stranger their name, then say it aloud three times in the square. The stranger does not remember theirs. They lost their memory after a fever.',
    [
      fc('Nói to một cái tên bạn nghĩ ra thay họ', 'Say aloud a name you invent for them',
        'Họ nghe cái tên bạn đặt và bật cười lần đầu trong nhiều tháng. Prescript ghi hoàn thành, và người lạ giữ cái tên ấy cho đến cuối đời.', 'They hear the name you gave and laugh for the first time in months. The Prescript is marked complete, and the stranger keeps that name to the end of their life.', { sanity: 5, network: 6, rep: 3 }),
      fc('Đưa họ đến văn phòng đăng ký để tìm tên thật', 'Take them to the registry office to find the real name',
        'Cuốn sổ có ba người cùng hình dáng. Người lạ chọn một cái tên và không nhìn hai cái còn lại. Bạn nói to tên ấy ba lần, và quảng trường im lặng.', 'The register holds three people of the same description. The stranger picks one name and does not look at the other two. You say it aloud three times, and the square falls silent.', { rep: 5, sanity: -3, network: 3 }),
      fc('Nói với Messenger rằng Prescript không thể hoàn thành', 'Tell the Messenger the Prescript cannot be completed',
        'Messenger đọc lại tờ giấy và cười một cách kỳ lạ. "Có thể đây là câu trả lời." Bạn không hiểu, và ông ta không giải thích.', 'The Messenger rereads the slip and smiles oddly. “Perhaps this is the answer.” You do not understand, and he does not explain.', { rep: 4, sanity: -4 })
    ]),

  mission('index_proxy_misread', [1, 2],
    '[Đọc nhầm một chữ] Một Proxy đọc nhầm một chữ trong Prescript và ba người đã làm theo cách đọc sai. Chưa ai bị thương. Proxy ấy nhìn bạn và hỏi liệu bạn có thể im lặng.',
    '[A misread word] A Proxy misread one word in a Prescript and three people followed the wrong reading. No one has been hurt yet. The Proxy looks at you and asks whether you could stay quiet.',
    [
      fc('Im lặng và để ba người ấy tự thoát ra', 'Stay quiet and let the three find their own way out',
        'Hai người nhận ra sai sót vào ngày thứ ba. Người còn lại thì không bao giờ nhận ra. Proxy ấy mang món nợ đó với bạn suốt vài năm.', 'Two realized the error by the third day. The remaining one never did. That Proxy carried the debt toward you for years.', { network: 8, sanity: -6, rep: 3 }),
      fc('Báo lên Weaver ngay trong ngày', 'Report to the Weaver that same day',
        'Weaver chỉnh lại Prescript trước tối. Proxy ấy bị cảnh cáo nhưng giữ được ghế. Từ đó người ấy chào bạn bằng cái gật đầu rất lạnh.', 'The Weaver corrected the Prescript before evening. The Proxy was warned but kept their seat. From then on they greeted you with a very cold nod.', { rep: 8, network: -6, sanity: 4 }, { meritAdd: 4 }),
      fg('Tự đi tìm ba người và nói thật với họ', 'Go find the three yourself and tell them the truth', [
        [55, 'Cả ba tin bạn, và sửa lại điều họ đã làm. Index ghi nhận rằng bạn lấy việc của mình làm việc của người khác.', 'All three believe you and undo what they did. The Index notes that you took your own work as another’s.', { rep: 9, network: 8, health: -4 }],
        [45, 'Một trong ba người không tin và nói bạn đang lừa họ. Prescript sai vẫn được làm tiếp, và chính bạn bị ghi tên vào đó.', 'One of the three does not believe you and says you are lying. The wrong Prescript is carried on, and your own name is written into it.', { rep: -5, sanity: -8 }]
      ])
    ], 10),

  mission('index_proselyte_lantern', [1, 2],
    '[Chiếc đèn của Proselyte] Một Proselyte trẻ thắp đèn trước nhà bạn mỗi tối trong một tuần và không nói gì. Hết tuần, họ mang đến một Prescript viết tên bạn, và hỏi bạn có đọc nó không.',
    '[The Proselyte’s lantern] A young Proselyte lights a lantern before your house each evening for a week and says nothing. At week’s end they bring a Prescript with your name on it and ask whether you will read it.',
    [
      fc('Đọc to ngay trước mặt họ', 'Read it aloud before them',
        'Prescript chỉ viết: "Hãy ngủ đủ giấc đêm nay." Proselyte trẻ nhìn bạn đọc và không nhịn được cười. Bạn ngủ rất ngon, và không biết ai đã viết nó.', 'The Prescript says only: “Sleep a full night tonight.” The young Proselyte watches you read and cannot help smiling. You sleep very well, and do not know who wrote it.', { sanity: 10, rep: 2 }),
      fc('Cất đi, đọc một mình', 'Put it away and read it alone',
        'Bạn đọc nó dưới đèn bàn. Nó nhắc đúng một việc bạn đã giấu mọi người. Tờ giấy tự nằm gọn trong lửa khi bạn đốt.', 'You read it under the desk lamp. It names exactly one thing you have hidden from everyone. The slip lies quietly in the fire as you burn it.', { sanity: -8, rep: 3, network: 3 }),
      fc('Trả lại, nói bạn không cần ai viết cho mình', 'Hand it back and say you need no one to write for you',
        'Proselyte trẻ nhận lại và cúi đầu. Tối hôm sau không có đèn nào trước cửa nhà bạn. Bạn bất ngờ nhận ra mình nhớ nó.', 'The young Proselyte takes it back and bows. The next evening there is no lantern before your house. To your surprise you find you miss it.', { rep: 3, sanity: -3 })
    ], 8),

  mission('index_two_prescripts_one_door', [2, 3],
    '[Hai Prescript, một cánh cửa] Hai Proxy giao cho bạn hai Prescript khác nhau cho cùng một cánh cửa. Một tờ yêu cầu mở nó. Tờ kia yêu cầu khóa nó bằng một sợi xích. Cả hai đều có dấu của Weaver.',
    '[Two Prescripts, one door] Two Proxies hand you two different Prescripts for the same door. One says open it. The other says chain it shut. Both bear the Weaver’s seal.',
    [
      fc('Mở cửa và để thứ gì ở phía sau tự bước ra', 'Open the door and let whatever is behind it step out',
        'Phía sau cửa là một căn phòng trống và một chiếc ghế quay mặt vào tường. Bạn đứng nhìn rất lâu, rồi đóng cửa lại và không khóa. Hai Proxy đều nói bạn đã làm đúng một nửa.', 'Behind the door is an empty room and a chair facing the wall. You stand and look a long time, then close the door and do not lock it. Both Proxies say you did half of it right.', { sanity: -6, rep: 5, network: 3 }),
      fc('Khóa cửa bằng sợi xích và canh nó suốt đêm', 'Chain the door shut and guard it through the night',
        'Đến gần sáng, ổ khóa phát ra một tiếng nhẹ như ai đó đang thử nó từ bên trong. Bạn không rời tay khỏi chuôi kiếm đến lúc trời sáng.', 'Near dawn the lock gives a soft sound as if someone tests it from within. You keep your hand on your hilt until daylight.', { sanity: -8, health: -4, rep: 6 }, { meritAdd: 5 }),
      fg('Mang cả hai tờ đến Weaver để hỏi', 'Carry both slips to the Weaver and ask', [
        [50, 'Weaver nhìn hai tờ giấy rất lâu và cười. "Ta chưa viết tờ nào trong hai tờ này." Ông ta thu cả hai về và tìm ra kẻ đã giả dấu.', 'The Weaver looks at the two slips a long time and smiles. “I wrote neither of these.” They take both away and find whoever forged the seal.', { rep: 10, network: 8 }],
        [50, 'Weaver nhìn bạn một cách không rõ nghĩa và nói rằng một Proxy chưa bao giờ phải hỏi. Bạn rời phòng với cảm giác vừa mất thứ gì đó.', 'The Weaver looks at you with an unreadable face and says a Proxy has never had to ask. You leave the room feeling you have lost something.', { rep: -4, sanity: -5 }]
      ])
    ], 10),

  mission('index_wrong_hands', [2, 3],
    '[Sai tay người nhận] Một Prescript quan trọng đến tay một người không thuộc Index, do lỗi của một Messenger đã chết. Người ấy đã mở nó, đã đọc nó, và đã bắt đầu làm theo từng chữ.',
    '[Into the wrong hands] An important Prescript reaches someone outside the Index through the mistake of a Messenger now dead. They have opened it, read it, and begun to follow it word for word.',
    [
      fc('Để người ấy làm xong, rồi mới đến gặp', 'Let them finish, then go to meet them',
        'Người ấy hoàn thành Prescript mà không biết nó là gì. Khi bạn đến, họ ngồi giữa phòng, bình thản đến lạ. "Tôi mong đến lúc này từ lâu," họ nói.', 'They complete the Prescript without knowing what it is. When you arrive they sit in the middle of the room, strangely calm. “I have waited for this a long time,” they say.', { sanity: -7, rep: 6 }),
      fc('Ngăn người ấy lại ngay giữa chừng', 'Stop them midway at once',
        'Người ấy dừng, run rẩy, và nói thứ họ làm theo mới là thứ duy nhất trong đời họ có ý nghĩa. Bạn nghĩ về điều đó suốt tuần.', 'They stop, trembling, and say what they followed is the only thing in their life that has meaning. You think about it all week.', { sanity: -5, rep: 3, network: 4 }),
      fg('Đề nghị người ấy gia nhập Index', 'Offer them a place in the Index', [
        [55, 'Người ấy đồng ý và đi theo bạn trong im lặng. Index nhận thêm một Proselyte biết đọc, và bạn nhận thêm một người biết cách phản đối.', 'They agree and follow you in silence. The Index gains a Proselyte who can read, and you gain someone who knows how to object.', { network: 10, rep: 6 }],
        [45, 'Người ấy từ chối, và Prescript không cho phép họ sống với điều đã biết. Bạn không muốn nghĩ về những gì xảy ra sau đó.', 'They refuse, and the Prescript does not allow them to live with what they know. You do not want to think about what happens next.', { sanity: -12, rep: -4 }]
      ])
    ]),

  mission('index_weaver_visitor', [2, 3],
    '[Khách của Weaver] Một người lạ ngồi chờ bạn trong phòng làm việc, mặc áo choàng dài và không nói tên. Họ nói họ đến từ Weaver. Bạn chưa bao giờ thấy người đưa lệnh đến tận nơi.',
    '[The Weaver’s visitor] A stranger sits waiting in your workroom in a long coat, giving no name. They say they come from the Weaver. You have never seen the one who gives orders come in person.',
    [
      fc('Mời trà và nghe hết', 'Offer tea and hear them out',
        'Họ nói chỉ một câu rồi uống hết tách trà. "Hãy nhớ người đầu tiên đã làm bạn cười." Rồi họ rời đi, và bạn không tìm ra được người ấy là ai.', 'They say one sentence and drink the whole cup. “Remember the first person who made you laugh.” Then they leave, and you cannot work out who that was.', { sanity: -5, rep: 4, network: 3 }),
      fc('Kiểm tra giấy tờ rồi mới nói chuyện', 'Check their papers before speaking',
        'Giấy tờ của họ đúng đến từng dấu chấm. Họ nhìn bạn kiểm tra với một vẻ gần như hài lòng. "Cuối cùng cũng có người làm điều đó."', 'Their papers are right down to the last stop. They watch you check with something close to satisfaction. “At last someone does this.”', { rep: 7, sanity: 2 }, { meritAdd: 4 }),
      fc('Gọi một Proxy khác vào làm chứng', 'Call another Proxy in as witness',
        'Khi Proxy bước vào, căn phòng trống. Chiếc ghế vẫn còn ấm. Bạn không bao giờ biết Proxy ấy có tin lời bạn không.', 'When the Proxy walks in the room is empty. The chair is still warm. You never learn whether that Proxy believed you.', { sanity: -6, network: -3 })
    ], 9),

  mission('index_last_slip_of_a_weaver', [3, 3],
    '[Tờ giấy cuối của một Weaver] Một Weaver tiền nhiệm để lại một Prescript chưa mở với dòng ghi ngoài bì: "Chỉ mở khi người kế vị nhận ra mình đã sai." Hôm nay bạn đứng nhìn phong bì ấy, không biết mình đã sai điều gì.',
    '[A Weaver’s last slip] A former Weaver left an unopened Prescript with a line on the cover: “Open only when the successor has realized they were wrong.” Today you stand looking at the envelope, not knowing what you were wrong about.',
    [
      fc('Mở ra ngay, xem điều ông ấy nghĩ bạn đã sai', 'Open it now to see what they thought you were wrong about',
        'Tờ giấy chỉ có hai chữ: "Hãy ngủ." Bạn ngồi cạnh nó rất lâu. Rồi bạn ngủ, lần đầu trong nhiều tháng, và sáng hôm sau bạn hiểu mình sai ở đâu.', 'The slip holds two words: “Go sleep.” You sit beside it a long time. Then you sleep, for the first time in months, and the next morning you understand where you were wrong.', { sanity: 12, rep: 6, health: 8 }),
      fc('Cất phong bì vào ngăn kéo và đợi', 'Put the envelope in a drawer and wait',
        'Bạn đợi ba năm. Mỗi lần mở ngăn kéo bạn lại ngừng một chút. Phong bì vẫn nguyên vẹn, và có lẽ đó là phần Prescript muốn bạn học.', 'You wait three years. Each time you open the drawer you pause a moment. The envelope stays intact, and perhaps that is the part the Prescript wanted you to learn.', { sanity: -4, rep: 8, wealth: 10 }),
      fc('Đốt nó mà không mở', 'Burn it unopened',
        'Ngọn lửa cháy rất nhanh. Khói bay lên có mùi giấy cũ và một thứ gì khác. Bạn nghĩ mình vừa sai, và hiểu rằng đó có lẽ cũng là câu trả lời.', 'The flame takes it fast. The smoke carries the smell of old paper and something else. You think you have just erred, and understand that this too may be the answer.', { sanity: -9, rep: 4, resonance: 6 })
    ], 11),

  mission('index_prescript_for_the_city', [3, 3],
    '[Prescript cho cả khu phố] Một Prescript lớn viết cho cả một khu: không ai được rời nhà từ chiều đến sáng. Lý do không được ghi. Là một Weaver, bạn có thể thay đổi nó. Nếu thay đổi, bạn phải gánh những gì xảy ra.',
    '[A Prescript for a whole district] A great Prescript is written for a whole ward: no one may leave their home from afternoon to dawn. The reason is not given. As a Weaver you may alter it. If you do, you must carry what follows.',
    [
      fc('Giữ nguyên và canh chừng suốt đêm', 'Leave it and watch through the night',
        'Đêm ấy yên đến lạ. Sáng ra, hàng trăm người bước ra cửa cùng một lúc và nhìn nhau như người vừa thoát khỏi một cơn mơ. Bạn không biết chuyện gì đã được tránh.', 'The night is strangely quiet. At dawn hundreds step out their doors at once and look at one another like people waking from a dream. You do not know what was avoided.', { rep: 10, sanity: -6, wealth: 15 }),
      fc('Rút ngắn thời gian còn nửa đêm', 'Shorten the hours to half the night',
        'Một đêm vẫn đủ để điều ấy xảy ra, nhưng lần này nó xảy ra với ít người hơn. Bạn đếm từng người, và con số ấy nằm trong đầu bạn đến cuối đời.', 'Half a night is still enough for it to happen, but this time it happens to fewer. You count each person, and the number stays in your head to the end.', { rep: 6, sanity: -14, network: 6 }),
      fg('Viết thêm một dòng cho phép người cần thiết ra ngoài', 'Add one line allowing those in need to go out', [
        [50, 'Chỉ có ba người ra ngoài, và cả ba đều sống. Khu phố ghi nhớ dòng ấy như một cánh cửa mở trong một tòa nhà đóng kín.', 'Only three go out, and all three live. The ward remembers that line as one open door in a sealed house.', { rep: 12, network: 10, sanity: 6 }],
        [50, 'Dòng thêm ấy bị hiểu theo nhiều cách. Mười hai người ra ngoài và không phải ai cũng cần. Prescript hỏng, và bạn gánh phần của nó.', 'The added line is read many ways. Twelve go out, and not all of them need to. The Prescript fails, and you carry its share.', { rep: -8, sanity: -10, wealth: -10 }]
      ])
    ], 11),

  mission('index_proxy_recital', [3, 3],
    '[Buổi đọc cho các Proxy trẻ] Một nhóm Proxy trẻ xin bạn đọc cho họ nghe một Prescript cũ nhất mà bạn còn giữ. Họ muốn biết Index ngày xưa nghe như thế nào. Trong số đó có một người đang giữ một Prescript riêng mà họ chưa nói với ai.',
    '[A recital for young Proxies] A group of young Proxies asks you to read them the oldest Prescript you still hold. They want to know how the Index sounded long ago. One of them carries a Prescript of their own that they have told no one about.',
    [
      fc('Đọc tờ cũ nhất bằng giọng đều, không giải thích', 'Read the oldest slip in an even voice, with no explanation',
        'Căn phòng im lặng đến khi chiếc đồng hồ ngoài hành lang điểm. Có người bật khóc, và không ai nói vì sao. Bạn không giải thích, và đó là điều họ nhớ.', 'The room stays silent until the corridor clock strikes. Someone weeps, and no one says why. You do not explain, and that is what they remember.', { rep: 8, sanity: -3, network: 8 }),
      fc('Hỏi người đang giữ Prescript riêng điều họ cần', 'Ask the one with the private Prescript what they need',
        'Người ấy ngồi lại sau khi mọi người ra về và đưa bạn tờ giấy của mình. Bạn đọc nó, gấp lại, và nói rằng nó đúng. Họ khóc, nhưng nhẹ nhõm.', 'That one stays after the others leave and hands you their slip. You read it, fold it, and say it is right. They weep, but lightly.', { sanity: 6, network: 10, rep: 5 }),
      fc('Từ chối, nói Prescript cũ không dành cho tai trẻ', 'Refuse, saying old Prescripts are not for young ears',
        'Một Proxy trẻ đứng dậy và rời đi trước. Những người còn lại nhìn bạn như nhìn một cánh cửa đóng. Bạn không biết đó là lời bảo vệ hay là nỗi sợ.', 'One young Proxy stands and leaves first. The rest look at you as at a shut door. You do not know whether it was protection or fear.', { rep: -3, sanity: -4, network: -4 })
    ], 9)
];
