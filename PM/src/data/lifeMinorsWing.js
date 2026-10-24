// Small scenes from inside a Wing: a corridor, a cup of tea, a form that needs a second signature.
// They run on the same two gauges as the larger desk scenes (standing and leverage), but cost only a few seconds of attention.

import { M, C, I } from './storyKit.js';

const W = (id, lo, hi, vi, en, choices, ignore) =>
  M(id, [19, 70], { jobs: ['Wing Employee'], wingRankAtLeast: lo, wingRankAtMost: hi }, vi, en, choices, ignore, { forbids: ['Distorted'] });

export const LIFE_MINORS_WING = [
  // ------------------------------------------------------------------ Intern and Feather
  W('m_wing_tea_cart', 0, 1,
    '[Xe trà buổi sáng] Người đẩy xe trà biết tên của mọi người trên tầng, trừ bạn. Hôm nay họ nhìn bạn một lúc rồi hỏi bạn muốn đường hay không.',
    '[The Morning Tea Cart] The one who pushes the tea cart knows every name on the floor except yours. Today they look at you a moment and ask whether you take sugar.',
    [C('Nói tên của bạn và hỏi tên họ', 'Give your name and ask theirs', 'Họ nhắc lại tên bạn hai lần như để nhớ. Từ hôm ấy ly trà của bạn luôn còn nóng.', 'They repeat your name twice as if to keep it. From that day your cup is always still hot.', { network: 2, sanity: 2 }),
     C('Lấy trà và đi tiếp', 'Take the tea and move on', 'Bạn đến bàn đúng giờ. Ly trà nguội trước khi bạn kịp uống.', 'You reach your desk on time. The tea cools before you can drink it.', { standing: 1 })],
    I('Xe trà đi qua. Bạn nhìn nó khuất sau góc hành lang.', 'The cart rolls past. You watch it vanish around the corner.', {})),

  W('m_wing_second_signature', 0, 1,
    '[Chữ ký thứ hai] Một biểu mẫu cần chữ ký thứ hai trước năm giờ. Người ký đang nghỉ phép, nhưng bạn biết nét chữ của họ rất rõ, vì bạn đã sao chép nó cả năm nay.',
    '[The Second Signature] A form needs a second signature before five. The signer is on leave, but you know their handwriting very well, having copied it all year.',
    [C('Chờ họ về và nộp trễ', 'Wait for them to return and file late', 'Biểu mẫu trễ một ngày, và trưởng phòng ghi một dấu nhỏ ở lề. Dấu nhỏ ấy sẽ còn đó rất lâu.', 'The form is a day late, and the chief marks a small tick in the margin. That tick will stay for a long time.', { standing: 1, sanity: 1 }),
     C('Ký thay bằng nét chữ của họ', 'Sign in their hand', 'Chữ ký trông hoàn hảo. Bạn nộp đúng giờ và cảm thấy bàn tay mình nặng hơn lúc nào hết.', 'The signature looks perfect. You file on time and feel your hand heavier than ever.', { standing: 2, leverage: 3, sanity: -3 })],
    I('Năm giờ đến và đi. Biểu mẫu nằm đó, cho đến sáng.', 'Five o’clock comes and goes. The form lies there until morning.', { standing: -2 })),

  W('m_wing_corridor_overheard', 0, 2,
    '[Lời nói ở hành lang] Hai người trên tầng cao đứng ở góc hành lang và hạ giọng khi bạn đi tới. Bạn chỉ nghe được nửa câu: "... nếu nó biết thì sẽ đi trước tháng sau."',
    '[Overheard in the Corridor] Two people from an upper floor stand at the corridor corner and drop their voices as you approach. You catch only half a sentence: “... if it learns, it will go before next month.”',
    [C('Đi ngang qua như chưa nghe gì', 'Walk past as if you heard nothing', 'Họ gật đầu chào bạn rất lịch sự. Bạn nhận ra mình vừa được xếp vào loại người biết giữ lời mà chưa hứa điều gì.', 'They nod to you very politely. You realize you have been filed under those who keep their word without having promised anything.', { standing: 2, sanity: -1 }),
     C('Ghi lại nửa câu và ngày giờ', 'Note down the half-sentence and the time', 'Bạn ghi vào mép một tờ giấy khác và cất đi. Chưa biết có dùng được không, nhưng thói quen này đã bắt đầu.', 'You write it on the margin of another sheet and put it away. You do not yet know if it will be useful, but the habit has begun.', { leverage: 4, sanity: -2 })],
    I('Họ ngừng nói. Bạn đi qua và hành lang trở lại như cũ.', 'They fall silent. You pass and the corridor returns to normal.', {})),

  W('m_wing_borrowed_umbrella', 0, 1,
    '[Chiếc ô mượn] Trời mưa khi giờ tan ca đến, và một Feather lâu năm cho bạn mượn chiếc ô của họ mà không hỏi gì. Họ chỉ nói: "Mai trả cũng được."',
    '[The Borrowed Umbrella] It rains when the shift ends, and a veteran Feather lends you their umbrella without asking anything. They only say: “Return it tomorrow, if you like.”',
    [C('Trả ngay sáng hôm sau, kèm một ly trà', 'Return it first thing the next morning with a cup of tea', 'Họ cười, hơi bất ngờ. Sau đó họ chỉ cho bạn một lối tắt trong tòa nhà mà không ai khác biết.', 'They smile, a little surprised. Afterward they show you a shortcut in the building that no one else knows.', { network: 3, standing: 1 }),
     C('Giữ thêm một tuần vì chưa tìm được lúc phù hợp', 'Keep it another week for lack of a good moment', 'Chiếc ô nằm sau cửa bàn bạn một tuần. Khi bạn trả, họ không nói gì, và đó là cách họ nói điều họ muốn nói.', 'The umbrella stays behind your desk door a week. When you return it they say nothing, which is how they say what they mean.', { network: -1, sanity: -1 })],
    I('Cơn mưa qua đi. Chiếc ô vẫn ở bên bạn.', 'The rain passes. The umbrella remains with you.', {})),

  W('m_wing_lunch_table', 0, 1,
    '[Bàn ăn trưa] Phòng ăn có ba cái bàn dài. Bạn chưa biết mình thuộc bàn nào. Một bàn đầy người nói to, một bàn đầy người im, và một bàn gần cửa sổ chỉ có hai người.',
    '[The Lunch Table] The canteen has three long tables. You do not yet know which is yours. One is full of loud talk, one of silence, and one by the window holds only two people.',
    [C('Ngồi bàn ồn ào và học cách cười đúng chỗ', 'Sit at the loud table and learn to laugh at the right moments', 'Bạn học nhanh. Sau một tháng, bạn biết ai nợ ai và ai sắp rời đi.', 'You learn fast. After a month you know who owes whom and who is about to leave.', { network: 4, leverage: 2, sanity: -2 }),
     C('Ngồi bàn cạnh cửa sổ với hai người ít nói', 'Sit by the window with the two who say little', 'Hai người đó hóa ra là người duy nhất trong tòa nhà không nói xấu ai. Điều đó khiến bữa trưa yên tĩnh hơn và hơi cô đơn.', 'They turn out to be the only two in the building who speak ill of no one. It makes lunch quieter and a little lonelier.', { sanity: 3, standing: 1 })],
    I('Bạn ăn đứng ở quầy và quay lại bàn làm việc sớm.', 'You eat standing at the counter and return to your desk early.', { standing: 1, sanity: -1 })),

  W('m_wing_lost_badge', 0, 1,
    '[Thẻ ra vào bị thất lạc] Bạn đến cổng và nhận ra thẻ không còn trong túi. Người gác nhìn bạn, không nghiêm khắc, chỉ chờ. Phía sau bạn đã có một hàng người.',
    '[The Lost Badge] You reach the gate and find the badge is no longer in your pocket. The guard looks at you, not sternly, only waiting. Behind you a line has formed.',
    [C('Khai báo ngay và chịu ghi nhận lỗi', 'Report it at once and accept the mark on record', 'Người gác ghi lại, mỉm cười nhẹ như người đã thấy việc này cả trăm lần. Thẻ mới đến vào chiều hôm sau.', 'The guard notes it and smiles faintly, like someone who has seen this a hundred times. The new badge arrives the next afternoon.', { standing: -1, sanity: 1 }),
     C('Nhờ người quen trong hàng bảo lãnh cho vào', 'Ask an acquaintance in the line to vouch for you', 'Người ấy đồng ý ngay, và bạn nợ họ một việc nhỏ mà cả hai đều biết sẽ không nhỏ mãi.', 'They agree at once, and you owe them a small favor that both of you know will not stay small.', { network: 3, standing: 1, leverage: -2 })],
    I('Người gác bước sang bên một chút. Bạn đi qua, không ai nhìn bạn nữa.', 'The guard steps slightly aside. You pass, and no one looks at you again.', {})),

  W('m_wing_night_shift_lamp', 0, 2,
    '[Đèn ca đêm] Bạn ở lại làm đến khuya. Trên tầng chỉ còn một bóng đèn bàn sáng ở cuối hành lang, và ai đó cũng ở lại như bạn, không nói gì.',
    '[The Night-Shift Lamp] You stay late. On the floor only one desk lamp is lit at the end of the corridor, and someone else has stayed like you, saying nothing.',
    [C('Mang trà đến cho người kia', 'Bring tea to the other', 'Người đó không ngẩng đầu, chỉ đẩy một tập tài liệu sang. "Đọc cái này, nếu bạn muốn hiểu chỗ này hoạt động thế nào." Bạn đọc đến sáng.', 'They do not look up, only push a stack of papers over. “Read this, if you want to know how this place works.” You read until morning.', { network: 4, sanity: -2, leverage: 2 }),
     C('Làm xong phần mình và về', 'Finish your own part and go home', 'Bạn ngủ được bốn tiếng. Người kia vẫn còn ở đó khi bạn đi, và vẫn còn ở đó khi bạn trở lại.', 'You sleep four hours. The other is still there when you leave, and still there when you return.', { sanity: 2 })],
    I('Bạn tắt đèn bàn của mình. Ánh đèn xa vẫn sáng.', 'You turn off your own lamp. The distant light stays on.', { sanity: 1 })),

  W('m_wing_gift_basket', 0, 2,
    '[Giỏ quà cuối năm] Một giỏ quà đặt sẵn trên bàn bạn mà không có thiệp. Trong đó là rượu trà cao cấp, đúng loại bạn từng nói thích với một người, một lần, rất lâu rồi.',
    '[The Year-End Basket] A gift basket sits on your desk with no card. Inside are fine tea and spirits, exactly the kind you once said you liked, to one person, a long time ago.',
    [C('Gửi trả lại với một lời cảm ơn lịch sự', 'Send it back with a polite thank-you', 'Người gửi không bao giờ nhận. Giỏ quà biến mất khỏi sổ nhận hàng, và từ đó bạn nhận ít hơn nhưng thở dễ hơn.', 'The sender never claims it. The basket vanishes from the receiving log, and from then on you receive less but breathe easier.', { standing: 2, sanity: 2, network: -1 }),
     C('Nhận và đoán xem ai gửi', 'Accept it and try to guess the sender', 'Bạn nghĩ đến ba người rồi thôi. Nhưng có một điều bạn nhận ra: ai đó biết bạn đủ kỹ để chọn đúng loại trà.', 'You think of three people and stop. But one thing is clear: someone knows you well enough to choose the right tea.', { wealth: 6, leverage: -3, sanity: -2 })],
    I('Giỏ quà vẫn nằm đó. Đến cuối tuần nó biến mất, và bạn không biết ai đã lấy.', 'The basket lies there. By the weekend it is gone and you do not know who took it.', {})),

  W('m_wing_wrong_door', 0, 2,
    '[Cánh cửa nhầm] Bạn đi lạc vào một hành lang chưa từng thấy. Một cánh cửa hé mở, và bên trong là một căn phòng đầy người đang nhìn chằm chằm vào một bức tường trống.',
    '[The Wrong Door] You wander into a corridor you have never seen. A door stands ajar, and inside is a room full of people staring at an empty wall.',
    [C('Đóng cửa lại nhẹ nhàng và quay đi', 'Close the door gently and turn away', 'Không ai ngoảnh lại. Bạn tìm đường về và không bao giờ tìm lại được hành lang đó, dù đã thử.', 'No one turns. You find your way back and never find that corridor again, though you try.', { sanity: -3, standing: 1 }),
     C('Đứng nhìn thêm một lúc', 'Stand and watch a while longer', 'Bức tường không có gì cả. Nhưng bạn bắt đầu nghe thấy một tiếng rất nhỏ, như thể có điều gì đó đang được đếm.', 'The wall holds nothing. But you begin to hear a very small sound, as if something were being counted.', { sanity: -6, leverage: 4, rep: 1 })],
    I('Cánh cửa tự đóng lại. Bạn đứng trong hành lang trống và không chắc mình đã thấy gì.', 'The door closes by itself. You stand in the empty corridor, unsure of what you saw.', { sanity: -2 })),

  W('m_wing_coat_check', 1, 2,
    '[Áo khoác bỏ quên] Một chiếc áo khoác bị quên trên lưng ghế phòng họp có thẻ tên của một người trên tầng. Trong túi có một mảnh giấy gấp bốn.',
    '[The Forgotten Coat] A coat left on the back of a meeting-room chair carries the name tag of someone from the upper floor. In the pocket is a sheet folded in four.',
    [C('Mang trả lại nguyên vẹn, chưa mở túi', 'Return it intact, pocket unopened', 'Người đó cảm ơn bạn bằng một cái nhìn dài, như đang đo xem bạn có nói dối không. Rồi họ nói tên bạn lần đầu tiên.', 'They thank you with a long look, as if measuring whether you lie. Then they say your name for the first time.', { standing: 3, network: 3 }),
     C('Đọc mảnh giấy trước rồi mới trả', 'Read the sheet first and then return it', 'Đó là một danh sách ngắn gồm năm cái tên, một trong số đó đã bị gạch. Bạn đặt nó lại đúng nếp gấp, và hy vọng không ai đo độ sâu của nếp.', 'It is a short list of five names, one of them struck through. You put it back along the same fold and hope no one measures the crease.', { leverage: 6, standing: -1, sanity: -2 })],
    I('Chiếc áo vẫn ở đó vào hôm sau. Rồi nó biến mất cùng với người sở hữu nó.', 'The coat is still there the next day. Then it disappears along with its owner.', {})),

  W('m_wing_chip_checkup', 1, 2,
    '[Kiểm tra chip định danh] Phòng y tế mời bạn đến kiểm tra con chip sau gáy. Nó mất năm phút, và nhân viên y tế nói chuyện về thời tiết suốt năm phút đó, đúng kiểu người đang không muốn bạn nghe thấy tiếng máy.',
    '[The Chip Check] The infirmary invites you for a check of the chip behind your neck. It takes five minutes, and the technician talks about the weather for all five, in the way of someone who does not want you to hear the machine.',
    [C('Hỏi thẳng chip ghi lại những gì', 'Ask directly what the chip records', 'Nhân viên ngừng nói. "Vị trí. Giờ. Không phải những gì bạn nói." Sau một lúc, họ thêm: "Chưa."', 'The technician stops talking. “Location. Time. Not what you say.” After a moment they add: “Not yet.”', { sanity: -4, leverage: 2, standing: -1 }),
     C('Nói về thời tiết cùng họ', 'Talk about the weather with them', 'Bạn ra về nhẹ nhõm và hơi hối hận vì đã không hỏi. Ngày hôm sau trời mưa, đúng như họ nói.', 'You leave relieved and a little sorry for not asking. The next day it rains, exactly as they said.', { sanity: 2, standing: 1 })],
    I('Máy kêu một tiếng ngắn. Bạn không nghe thấy gì thêm.', 'The machine gives one short beep. You hear nothing more.', {})),

  W('m_wing_wrong_name', 1, 3,
    '[Gọi nhầm tên] Cuối cuộc họp, một người cấp cao gọi bạn bằng tên của người tiền nhiệm. Cả phòng nghe thấy, và không ai cười. Cũng không ai chỉnh lại.',
    '[Called by the Wrong Name] At the end of a meeting a senior calls you by your predecessor’s name. The whole room hears, and no one laughs. No one corrects it either.',
    [C('Chỉnh lại nhẹ nhàng và cười', 'Correct it gently and smile', 'Người đó xin lỗi quá nhanh, như một người đã luyện cách xin lỗi. Bạn nhận ra mình đã được cho thêm một chỗ ngồi trong ký ức của họ.', 'They apologize too quickly, like someone who has practiced apologizing. You realize you have been granted a place in their memory.', { standing: 2, network: 2 }),
     C('Không chỉnh và nhận lấy cái tên ấy trong buổi chiều đó', 'Do not correct it and take the name for that afternoon', 'Suốt buổi chiều bạn nhận về tay mình những tờ giấy vốn thuộc về người kia. Một số trong đó rất đáng đọc.', 'All afternoon you receive papers that belonged to the other. Some of them are well worth reading.', { leverage: 5, standing: -2, sanity: -2 })],
    I('Cuộc họp tan. Cái tên bị gọi nhầm ở lại với bạn thêm vài ngày.', 'The meeting breaks up. The mistaken name stays with you a few more days.', { sanity: -1 })),

  // ------------------------------------------------------------------ Feather and Section Chief
  W('m_wing_budget_pencil', 1, 2,
    '[Cây bút chì ngân sách] Trưởng phòng đưa bạn một cây bút chì, không phải bút mực. "Gạch những gì bạn nghĩ là thừa. Chì thì xóa được." Hai người đều biết chì xóa được là lý do ông ấy chọn bạn.',
    '[The Budget Pencil] The chief hands you a pencil, not a pen. “Strike what you think is excess. Pencil can be erased.” Both of you know that being erasable is why they chose you.',
    [C('Gạch mạnh và nói với ông đây là ý kiến của bạn', 'Strike hard and say it is your own opinion', 'Ông ấy nhìn bản vẽ, gật đầu, rồi xóa một nửa các nét gạch. Nửa còn lại vẫn đủ để người ta nhớ tên bạn.', 'The chief studies the page, nods, then erases half the strokes. The other half is enough for people to remember your name.', { standing: 2, rep: 1, network: -2 }),
     C('Chỉ gạch những chỗ ông đã gạch trong lòng', 'Strike only what the chief had already struck in mind', 'Ông ấy đọc, và nụ cười ông ấy nhẹ đến mức bạn không chắc có thật hay không. "Học nhanh đấy."', 'The chief reads it, and the smile is so light you are unsure it was real. “A quick learner.”', { standing: 3, leverage: -1, sanity: -2 })],
    I('Bạn đặt bút chì xuống mà không gạch gì. Ông ấy lặng lẽ nhận lại.', 'You put the pencil down without striking anything. The chief takes it back quietly.', { standing: -1 })),

  W('m_wing_exit_interview', 1, 2,
    '[Buổi phỏng vấn nghỉ việc] Bạn được giao ngồi nghe một Feather đang rời Nest nói lý do. Họ không giận và không buồn, chỉ mệt theo kiểu rất kỹ lưỡng. Biên bản chỉ cần một dòng.',
    '[The Exit Interview] You are assigned to sit and hear a departing Feather give their reasons. They are neither angry nor sad, only tired in a very thorough way. The record needs just one line.',
    [C('Ghi đúng điều họ nói, kể cả điều bất lợi cho Wing', 'Write what they say, including what hurts the Wing', 'Biên bản dài ba trang. Phòng nhân sự trả lại và bảo bạn viết lại ngắn hơn. Bạn viết lại, nhưng giữ một bản gốc.', 'The record runs three pages. Personnel returns it and tells you to shorten it. You rewrite it, but keep an original.', { leverage: 4, standing: -2, sanity: -2 }),
     C('Ghi một dòng "lý do cá nhân" và để họ đi', 'Write one line, “personal reasons,” and let them go', 'Họ cảm ơn bạn khi bước ra. Bạn không biết đó là biết ơn hay mỉa mai, và nhận ra có lẽ không quan trọng.', 'They thank you on the way out. You cannot tell if it is gratitude or irony, and realize it may not matter.', { standing: 1, sanity: -3, network: 2 })],
    I('Biên bản vẫn trống. Họ đã đi mà không ai ký nhận.', 'The record stays blank. They left without anyone signing for it.', { standing: -2 })),

  W('m_wing_vending_machine', 1, 3,
    '[Máy bán nước ở tầng bảy] Máy bán nước trên tầng bảy là chỗ duy nhất trong tòa nhà mà người thuộc các phòng khác nhau đứng gần nhau mà không ai ghi lại. Hôm nay có ba người ở đó, và họ ngừng nói khi bạn đến.',
    '[The Vending Machine on Seven] The vending machine on the seventh floor is the only spot in the building where people from different sections stand close without anyone recording it. Today three people are there and fall silent when you arrive.',
    [C('Mua nước và hỏi họ có cần gì không', 'Buy a drink and ask if they need anything', 'Một trong ba người bật cười, nhẹ nhõm. Họ kể cho bạn nghe một chuyện mà bạn không cần biết, và bạn nhớ nó rất kỹ.', 'One of the three laughs, relieved. They tell you something you did not need to know, and you remember it very well.', { network: 3, leverage: 3, sanity: -1 }),
     C('Đi xuống tầng dưới để mua ở máy khác', 'Go down a floor to buy from another machine', 'Máy tầng dưới hết hàng. Bạn quay lại tay không và thấy ba người đã đi từ lâu.', 'The machine downstairs is out of stock. You return empty-handed and find the three long gone.', { sanity: -1 })],
    I('Bạn mua nước và uống nhanh rồi đi. Không ai nhìn bạn.', 'You buy a drink, down it quickly, and leave. No one looks at you.', {})),

  W('m_wing_rooftop_smoker', 1, 3,
    '[Người hút thuốc trên mái] Trên mái tòa nhà có một người đang hút thuốc, mặc áo của tầng cao nhất. Họ không quay lại khi bạn đến, chỉ nói: "Ở đây không có camera. Đó là lý do tôi lên."',
    '[The Smoker on the Roof] On the roof a person stands smoking in the uniform of the highest floor. They do not turn as you arrive, only say: “There are no cameras here. That is why I come up.”',
    [C('Đứng cạnh họ và không hỏi gì', 'Stand beside them and ask nothing', 'Họ hút hết điếu thuốc, rồi đưa bạn cái bật lửa mà không nói. Khi bạn xuống, họ vẫn đứng đó, và cái bật lửa còn ở trong túi bạn.', 'They finish the cigarette and hand you the lighter without a word. When you go down, they are still standing there and the lighter is in your pocket.', { network: 4, sanity: 3, leverage: 2 }),
     C('Hỏi thẳng về điều họ đang lo', 'Ask directly what is troubling them', '"Có một người trên tầng này không đáng tin." Họ không nói là ai. Khi quay đi, họ thêm: "Có thể là bạn."', '“Someone on this floor cannot be trusted.” They do not say who. As they turn away they add: “Perhaps you.”', { sanity: -4, leverage: 5, standing: -1 })],
    I('Bạn đứng ở cửa lên mái rồi quay xuống. Một điếu thuốc tàn rơi từ trên cao.', 'You stand at the roof door, then go back down. A cigarette end falls from above.', {})),

  W('m_wing_promotion_list_rumor', 1, 2,
    '[Tin đồn về danh sách thăng chức] Trong hành lang có tin rằng danh sách thăng chức năm nay đã in xong, và tên bạn có hoặc không có trong đó. Ba người đưa ra ba câu trả lời khác nhau, mỗi người đều chắc chắn.',
    '[Rumor of the Promotion List] In the corridors it is said the promotion list is printed, and your name is either on it or not. Three people give three different answers, each certain.',
    [C('Hỏi người chắc chắn nhất và xin xem tận mắt', 'Ask the most certain and request to see it yourself', 'Họ thôi chắc chắn. Rồi họ đưa bạn nhìn lướt qua, và bạn thấy hai điều: tên bạn không có, và tên người kia cũng không.', 'They stop being certain. Then they let you glance, and you see two things: your name is not there, and theirs is not either.', { sanity: -3, leverage: 2, network: 2 }),
     C('Làm việc như thể không nghe gì', 'Work as if you heard nothing', 'Cuối tuần danh sách thật xuất hiện, khác cả ba lời đồn. Bạn không có tên, nhưng cũng không còn ai nhắc đến nó.', 'By the end of the week the real list appears, different from all three rumors. Your name is not on it, but no one mentions that either.', { sanity: 2, standing: 1 })],
    I('Bạn nghe cả ba lời đồn và không tin lời nào.', 'You hear all three rumors and believe none.', { sanity: -1 })),

  W('m_wing_stale_report', 1, 3,
    '[Báo cáo đã cũ] Người ở cấp trên yêu cầu bạn tổng hợp một báo cáo về số liệu đã lỗi thời hai năm. Họ không cần số mới, họ cần số cũ được ghi bằng giọng chắc chắn.',
    '[The Stale Report] A superior asks you to compile a report on figures two years out of date. They do not need new numbers, only the old ones written in a confident voice.',
    [C('Làm đúng yêu cầu và ghi chú rõ đây là số liệu cũ', 'Do as asked and note plainly the figures are old', 'Báo cáo được nhận. Dòng ghi chú bị cắt trước khi gửi lên, nhưng bạn đã chép nó vào cuối bản của chính mình.', 'The report is accepted. The note is trimmed before it goes up, but you have copied it to the end of your own version.', { standing: 2, leverage: 3, sanity: -2 }),
     C('Tìm số mới và thay vào mà không báo', 'Find the new figures and swap them in unannounced', 'Số mới đẹp hơn số cũ, và đó chính là rắc rối. Cấp trên đọc, nhíu mày, và hỏi làm sao bạn có số này.', 'The new figures are better than the old, and that is the trouble. The superior reads, frowns, and asks how you got them.', { standing: -3, rep: 2, sanity: -3 })],
    I('Báo cáo không được viết. Có người khác viết nó, tệ hơn bạn.', 'The report is not written by you. Someone else writes it, worse than you would have.', { standing: -1 })),

  W('m_wing_family_visit', 1, 3,
    '[Người nhà đến thăm] Phòng ăn của Wing có một tấm biển "Khách thăm": người nhà của một đồng nghiệp đến ăn trưa. Bạn thấy đồng nghiệp ấy cười theo một kiểu mà bạn chưa từng thấy trong phòng làm việc.',
    '[A Family Visit] The Wing canteen has a “Visitors” sign: a colleague’s family has come to lunch. You see that colleague smiling in a way you have never seen at their desk.',
    [C('Đến chào họ và nói vài lời tốt đẹp', 'Go greet them and say a few kind words', 'Người nhà của họ mời bạn ngồi. Bạn ở lại mười phút, và khi trở lại làm việc, đồng nghiệp ấy giao cho bạn một việc mà không cần giải thích.', 'The family invites you to sit. You stay ten minutes, and back at work the colleague hands you a task without needing to explain.', { network: 4, sanity: 3 }),
     C('Tránh bàn đó và ăn ở góc khác', 'Avoid that table and eat in another corner', 'Bạn ăn nhanh. Nhưng nhìn từ xa, bạn nhận ra mình chưa từng có ai để mời đến đây.', 'You eat quickly. But from afar you realize you have never had anyone to invite here.', { sanity: -3 })],
    I('Bạn đứng ở cửa phòng ăn một lúc, rồi đi.', 'You stand in the canteen doorway a while, then go.', {})),

  // ------------------------------------------------------------------ Section Chief and Senior Executive
  W('m_wing_master_key', 2, 3,
    '[Chìa khóa vạn năng] Một thư ký giao cho bạn chiếc chìa khóa mở được mọi tủ hồ sơ trên tầng. "Hội đồng yêu cầu, để bạn có thể kiểm tra khi cần." Nó nằm nặng hơn kim loại trong lòng bàn tay bạn.',
    '[The Master Key] A secretary hands you a key that opens every filing cabinet on the floor. “The Council requires it, so you can inspect when needed.” It weighs more than metal in your palm.',
    [C('Nhận và ghi vào sổ mọi lần bạn dùng nó', 'Accept it and log every time you use it', 'Sổ của bạn mỏng đến mức thư ký thắc mắc. Họ không bao giờ hỏi lý do, và đó là điều bạn trân trọng ở họ.', 'Your log is so thin the secretary wonders. They never ask the reason, which you value in them.', { standing: 3, sanity: 1 }),
     C('Nhận và dùng nó vào một đêm khuya', 'Accept it and use it on a late night', 'Có ba ngăn tủ bạn chưa từng được xem. Bạn ra khỏi phòng với hai thứ trong đầu và một thứ trong túi, và tự hỏi từ khi nào mình quen với cảm giác này.', 'There are three drawers you were never allowed to see. You leave the room with two things in your head and one in your pocket, and wonder since when you grew used to this feeling.', { leverage: 10, standing: -2, sanity: -4 })],
    I('Bạn trả lại chìa khóa. Thư ký nhận, và không nói gì.', 'You return the key. The secretary takes it and says nothing.', { standing: 1 })),

  W('m_wing_old_photo', 2, 3,
    '[Bức ảnh cũ] Trên tường hành lang tầng cao nhất có một bức ảnh chụp năm mươi người trong phòng này, ba mươi năm trước. Bạn đếm: mười hai người trong đó giờ đã không còn trong sổ nhân sự, và một người đang đứng đúng chỗ bạn đứng.',
    '[The Old Photograph] On the wall of the top floor’s corridor hangs a photograph of fifty people in this room, thirty years ago. You count: twelve of them are no longer in the personnel books, and one stands in exactly the spot you stand now.',
    [C('Hỏi thư ký về những người đã mất khỏi sổ', 'Ask the secretary about those missing from the books', 'Thư ký nhìn bức ảnh lâu hơn bạn. "Mười hai người. Chúng tôi vẫn gửi thư năm mới cho cả mười hai." Bạn không hỏi thêm.', 'The secretary studies the photo longer than you. “Twelve. We still send New Year letters to all twelve.” You ask nothing more.', { sanity: -4, leverage: 3, rep: 1 }),
     C('Đứng đúng chỗ người trong ảnh và nhìn ra cửa sổ', 'Stand where the one in the photo stood and look out the window', 'Bạn thấy cùng một cảnh, và nó chưa bao giờ thay đổi. Điều đó vừa làm bạn yên tâm vừa làm bạn lạnh sống lưng.', 'You see the same view, and it has never changed. This both reassures you and chills your spine.', { sanity: 2, standing: 1 })],
    I('Bạn đi ngang qua bức ảnh và không dừng lại.', 'You pass the photograph and do not stop.', {})),

  W('m_wing_young_one_asks', 2, 3,
    '[Câu hỏi của người trẻ] Một Feather trẻ chặn bạn ở cửa thang máy và hỏi: "Làm thế nào để được như chị hoặc anh?" Họ hỏi thật lòng, và đó là điều làm bạn khó trả lời.',
    '[The Young One Asks] A young Feather stops you at the lift and asks: “How do I get to be what you are?” They ask in earnest, which is what makes it hard to answer.',
    [C('Trả lời thật, kể cả những điều bạn không tự hào', 'Answer truthfully, including what you are not proud of', 'Họ nghe hết, im lặng một lúc, và nói: "Cảm ơn. Em sẽ không làm vậy." Không rõ họ nói thật hay chỉ lịch sự.', 'They hear it all, are silent a moment, and say: “Thank you. I will not do it that way.” It is unclear whether they mean it or are being polite.', { sanity: 3, standing: -1, network: 3, leverage: -3 }),
     C('Đưa ra một câu trả lời đẹp và ngắn', 'Give a pretty, short answer', 'Họ ghi lại, mắt sáng lên. Bạn nhìn họ bước đi và nhận ra mình vừa tạo ra một bản sao nhỏ của chính điều mình không nên là.', 'They note it down, eyes bright. You watch them go and realize you have just made a small copy of what you should not be.', { standing: 2, sanity: -3, network: 2 })],
    I('Cửa thang máy mở. Bạn bước vào, và câu hỏi ở lại ngoài hành lang.', 'The lift door opens. You step in and the question stays in the corridor.', { sanity: -1 })),

  W('m_wing_quiet_toast', 2, 3,
    '[Chén rượu im lặng] Bữa tiệc kỷ niệm của Wing có ba trăm khách và một chén chúc mừng chung. Một Senior Executive đứng cạnh bạn thì thầm: "Mười người trong phòng này không sống qua năm sau, và không ai trong số đó biết."',
    '[The Silent Toast] The Wing’s anniversary banquet has three hundred guests and one shared toast. A Senior Executive beside you whispers: “Ten people in this room will not live through next year, and none of them know.”',
    [C('Nâng chén và không hỏi tên', 'Raise the glass and do not ask for names', 'Rượu có vị rất đắt và rất sạch. Bạn uống hết, và đêm đó bạn nhìn mặt từng người một đến khi chén cạn.', 'The wine tastes very expensive and very clean. You drink it all, and that night you look at every face until the glass is empty.', { sanity: -4, standing: 2 }),
     C('Hỏi đó là họ hay là sự thật', 'Ask whether this is a threat or a fact', 'Người kia cười, rất nhẹ. "Với chúng ta, hai thứ này là một." Họ chạm chén vào chén bạn rồi quay đi.', 'The other smiles, very faintly. “For us, those two are one.” They touch their glass to yours and turn away.', { leverage: 4, sanity: -5, rep: 1 })],
    I('Bạn đứng ở rìa phòng và không nâng chén. Không ai để ý.', 'You stand at the room’s edge and do not raise the glass. No one notices.', {})),

  W('m_wing_retired_visitor', 2, 3,
    '[Người đã nghỉ trở lại] Một cựu Senior Executive già đến thăm tòa nhà với một cây gậy. Họ không còn thẻ, và người gác không biết xử lý thế nào. Họ nhìn bạn và nói: "Bạn có nhớ tôi không? Tôi nhớ bạn."',
    '[A Retiree Returns] An old former Senior Executive visits the building with a cane. They no longer have a badge, and the guard does not know what to do. They look at you and say: “Do you remember me? I remember you.”',
    [C('Đưa họ vào và dẫn đi một vòng tầng quen thuộc', 'Take them in and walk them round the familiar floors', 'Họ chạm tay vào từng cánh cửa như người chạm vào xương cũ. Ở cuối vòng, họ nói họ chỉ muốn nhìn lại. Khi đi, họ để lại cho bạn một lời khuyên và không nói đó là gì.', 'They touch each door as one touches old bone. At the end of the round they say they only wanted to see it again. When they go, they leave you a piece of advice and do not say what it is.', { network: 4, sanity: 3, standing: -1 }),
     C('Giải thích nhẹ nhàng rằng quy định không cho phép', 'Explain gently that the rules do not allow it', 'Họ gật đầu như người đã biết trước câu trả lời. "Tôi chỉ muốn xem mình còn bị từ chối bằng giọng nào." Họ rời đi, thẳng lưng.', 'They nod like someone who knew the answer. “I only wanted to hear how I am refused now.” They leave with a straight back.', { standing: 2, sanity: -3 })],
    I('Bạn nhìn họ qua cửa kính, không bước ra. Họ không quay lại.', 'You watch them through the glass without stepping out. They do not look back.', { sanity: -2 })),

  W('m_wing_coffee_with_rival', 2, 3,
    '[Cà phê với đối thủ] Người cạnh tranh với bạn lâu nhất ở tầng này mời bạn uống cà phê, ở một quán ngoài Nest, không có ai khác. "Một lần thôi. Không bàn việc."',
    '[Coffee With the Rival] The one who has competed with you longest on this floor invites you for coffee at a place outside the Nest, no one else. “Just once. No business.”',
    [C('Nhận lời và đến tay không', 'Accept and come empty-handed', 'Hai người nói về chuyện mưa, và về một con chó mà cả hai từng nuôi lúc nhỏ. Khi chia tay, bạn nhận ra mình không còn ghét họ, chỉ còn đối đầu.', 'You talk of rain, and of a dog both once kept as children. When you part you realize you no longer hate them, only oppose them.', { sanity: 4, network: 3, standing: -1 }),
     C('Nhận lời và mang theo một thứ bạn đã giữ', 'Accept and bring something you have kept', 'Bạn không dùng nó. Nhưng nó nằm trong túi suốt buổi, và cả hai người đều cảm thấy sức nặng của nó giữa hai chiếc cốc.', 'You do not use it. But it lies in your pocket all afternoon, and both of you feel its weight between the two cups.', { leverage: 3, sanity: -3 })],
    I('Bạn từ chối lịch sự. Họ không hỏi lần thứ hai.', 'You decline politely. They do not ask a second time.', {})),

  W('m_wing_closed_elevator', 3, 3,
    '[Thang máy không có nút xuống] Có một thang máy ở tầng của bạn chỉ có nút đi lên. Bạn đã đi qua nó hàng nghìn lần. Hôm nay cửa mở, và bên trong là một người mặc đồ bạn không nhận ra.',
    '[The Lift With No Down Button] There is a lift on your floor with only an up button. You have passed it thousands of times. Today its doors open, and inside is a person in clothes you do not recognize.',
    [C('Bước vào và nhấn nút đi lên', 'Step in and press up', 'Cửa đóng, và bạn đi lên mà không có cảm giác chuyển động. Khi cửa mở lại, bạn đang đứng ở chính tầng cũ, và người kia đã biến mất.', 'The door closes and you rise without any sense of motion. When it opens again you stand on the same floor, and the other has vanished.', { sanity: -5, leverage: 4, rep: 1 }),
     C('Đứng ngoài và đợi cửa đóng lại', 'Stay outside and wait for the door to close', 'Người kia nhìn bạn thêm một lúc, như người ghi chép. Rồi cửa đóng. Bạn không chắc mình vừa tránh được gì.', 'The other looks at you a while longer, like a recorder. Then the door closes. You are not sure what you have just avoided.', { sanity: 2 })],
    I('Bạn đi ngang qua nó. Cửa không mở lần nào nữa.', 'You walk past it. The door does not open again.', {})),

  W('m_wing_final_signature', 3, 3,
    '[Chữ ký cuối cùng trong ngày] Có một chồng giấy cao bằng bàn tay chờ bạn ký trước khi về. Bạn đã ký hàng nghìn trang như thế, và bạn nhận ra mình không còn đọc trang nào nữa.',
    '[The Last Signature of the Day] A stack of paper a hand high awaits your signature before you go home. You have signed thousands of pages like it, and realize you no longer read any of them.',
    [C('Đọc từng trang một dù mất cả đêm', 'Read every page even if it takes the night', 'Có một trang trong xấp ấy là một lời cầu xin. Bạn không biết nó đến từ ai và nó đã nằm đó bao lâu. Bạn ngồi với nó đến sáng.', 'One page in the stack is a plea. You do not know whom it comes from or how long it has lain there. You sit with it until morning.', { sanity: -5, standing: 3, rep: 3, leverage: 3 }),
     C('Ký tất cả và về nhà', 'Sign everything and go home', 'Bút của bạn chạy đều như đã quen. Bạn về nhà với bàn tay không mỏi và một khoảng trống mà trước đây bạn không có.', 'Your pen runs evenly, as if used to it. You go home with an untired hand and an emptiness you did not have before.', { standing: 1, sanity: -3 })],
    I('Bạn nhìn xấp giấy rồi tắt đèn. Sáng mai nó vẫn sẽ ở đó.', 'You look at the stack and turn off the lamp. Tomorrow it will still be there.', { standing: -2, sanity: 1 }))
];
