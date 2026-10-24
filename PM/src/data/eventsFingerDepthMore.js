// A margin on top of the second set: three more missions each for the Index, the Middle and the Pinky, whose
// totals sat only just at four fifths of what a Fixer has.

import { fe, fc, fg } from './fingerKit.js';

const mission = (id, finger, rank, vi, en, choices, weight = 9) => ({ ...fe(id, finger, rank, vi, en, choices, { weight }), mission: true });

export const FINGER_DEPTH_MARGIN = [
  // ------------------------------------------------------------------ Index
  mission('index_the_reader_at_the_gate', 'Index', [1, 2],
    '[Người đọc ở cổng] Một người lạ đứng ở cổng khu nhà bạn và đọc to, từng chữ, một Prescript mà bạn chưa nhận. Họ không nhìn ai. Họ đọc đến dòng cuối rồi im, và chờ xem bạn có đến.',
    '[The reader at the gate] A stranger stands at the gate of your block and reads aloud, word by word, a Prescript you have not received. They look at no one. They read to the last line and fall silent, waiting to see whether you come.',
    [
      fc('Ra cổng và nghe nốt dòng cuối', 'Go to the gate and hear the last line',
        'Dòng cuối chỉ có tên một con phố. Người lạ gật đầu, quay đi, và bạn đến con phố ấy vào sáng sau mà không biết vì sao.', 'The last line is only the name of a street. The stranger nods, turns away, and the next morning you go to that street without knowing why.', { sanity: -4, rep: 5, network: 4 }),
      fc('Đóng cửa sổ và không nghe', 'Close the window and do not listen',
        'Giọng đọc vẫn lọt qua kính. Đến sáng bạn thuộc cả bài và không muốn thuộc. Messenger đến hỏi bạn có nghe không, và bạn nói không.', 'The voice still comes through the glass. By morning you know the whole text and do not want to. A Messenger asks whether you heard, and you say no.', { sanity: -6, rep: 2 }),
      fc('Gọi một Proxy đến đứng cạnh bạn', 'Call a Proxy to stand beside you',
        'Proxy nghe, nhìn bạn rất lâu, và nói tờ ấy không phải của Index. Người lạ biến mất trước khi họ kịp hỏi.', 'The Proxy listens, looks at you a long while and says the slip is not the Index’s. The stranger vanishes before anyone can ask.', { rep: 6, network: 5, sanity: -3 }, { meritAdd: 3 })
    ], 8),

  mission('index_sealed_tea_house', 'Index', [2, 3],
    '[Quán trà niêm phong] Một quán trà bị niêm phong bằng sáp trắng của Index trong ba mươi năm, và hôm nay Prescript cho phép mở. Không ai nhớ quán đóng vì chuyện gì. Bên trong, bàn ghế vẫn được kê như có khách.',
    '[The sealed tea house] A tea house sealed with the Index’s white wax for thirty years is allowed by Prescript to open today. No one remembers why it was closed. Inside, the tables and chairs are still set as for guests.',
    [
      fc('Bóc sáp một mình và bước vào', 'Break the wax alone and step in',
        'Trà trên bàn vẫn còn ấm. Bạn ngồi xuống chiếc ghế gần cửa sổ nhất và đợi. Không ai đến, nhưng chiếc tách đối diện bạn được rót đầy trong lúc bạn không nhìn.', 'The tea on the tables is still warm. You sit in the chair nearest the window and wait. No one comes, but the cup opposite you is filled while you are not looking.', { sanity: -8, rep: 7, resonance: 6 }),
      fc('Cử một Proselyte vào trước và chờ ngoài cửa', 'Send a Proselyte in first and wait outside',
        'Proselyte ra sau mười phút, mặt tái, và nói bên trong chỉ có hơi ấm. Hôm sau họ xin chuyển khỏi Index. Bạn ghi nhận, và không ngăn.', 'The Proselyte comes out after ten minutes, pale, saying there is only warmth inside. The next day they ask to leave the Index. You record it and do not stop them.', { sanity: -4, rep: 3, network: -4 }),
      fg('Đọc Prescript to lên trước cửa rồi mới mở', 'Read the Prescript aloud at the door before opening', [
        [55, 'Cánh cửa mở ra mà không cần chạm. Bên trong căn phòng sáng và sạch, và một tờ giấy nhỏ nằm trên bàn với tên bạn.', 'The door swings open untouched. Inside the room is bright and clean, and a small slip lies on a table bearing your name.', { rep: 9, sanity: 3, network: 5 }],
        [45, 'Giọng bạn vang lại từ bên trong, chậm hơn một nhịp. Bạn đóng cửa lại và niêm lên bằng sáp mới. Index không hỏi vì sao.', 'Your voice echoes back from inside, a beat slower. You close the door and seal it with fresh wax. The Index does not ask why.', { sanity: -9, rep: 2 }]
      ])
    ], 9),

  mission('index_the_empty_prescript_book', 'Index', [3, 3],
    '[Cuốn sổ Prescript trống] Cuốn sổ ghi các Prescript của cả năm sắp hết trang, và tháng này chưa có Prescript nào đến. Các Proxy trẻ hoảng. Không có gì để đọc, không có gì để làm theo, và họ nhìn bạn như nhìn một người biết lý do.',
    '[The empty Prescript book] The book of the year’s Prescripts is nearly full, and this month none has come. The young Proxies panic. There is nothing to read and nothing to follow, and they look at you as at someone who knows why.',
    [
      fc('Nói với họ rằng im lặng cũng là một Prescript', 'Tell them silence is also a Prescript',
        'Cả phòng im bặt. Rồi một Proxy già bật cười khẽ, và những người còn lại làm theo. Bạn không chắc mình nói thật, nhưng tuần ấy yên.', 'The whole room goes quiet. Then an old Proxy chuckles softly and the rest follow. You are not sure you spoke truly, but that week is calm.', { sanity: 4, rep: 8, network: 8 }),
      fc('Tự viết một Prescript nhỏ để họ có việc làm', 'Write a small Prescript yourself so they have something to do',
        'Bạn viết: "Mỗi người ăn một bữa cùng người ngồi bên cạnh." Họ làm theo, và có người khóc. Bạn cất bút và không biết ai trong số họ đoán ra người viết.', 'You write: “Each person eats one meal with the one seated beside them.” They do it, and some weep. You put away the pen and do not know which of them guesses the writer.', { sanity: -5, rep: 7, network: 10 }, { meritAdd: 5 }),
      fc('Báo Weaver rằng sổ đã trống', 'Report to the Weaver that the book is empty',
        'Weaver nhìn bạn rất lâu. "Ngươi là người đầu tiên báo." Hai tuần sau, một Prescript đến cho cả nhóm, và đó là lần đầu bạn nghe giọng Weaver trong nhiều năm.', 'The Weaver looks at you a long while. “You are the first to report.” Two weeks later a Prescript arrives for the whole group, and it is the first time in years you hear the Weaver’s voice.', { rep: 6, sanity: 2, network: 4 })
    ], 10),

  // ------------------------------------------------------------------ Middle
  mission('middle_the_cousin_who_married_out', 'Middle', [1, 2],
    '[Người em họ lấy chồng ngoài] Một người em họ của bạn kết hôn với người của một băng đối địch và xin gia đình đến dự đám cưới. Không ai muốn đi. Không ai muốn nói rằng mình không muốn đi.',
    '[The cousin who married out] A cousin of yours marries into a rival crew and asks the family to attend the wedding. No one wants to go. No one wants to say they do not want to.',
    [
      fc('Đi một mình và mang quà của cả gia đình', 'Go alone and carry the whole family’s gift',
        'Bạn ngồi giữa những người xa lạ và nâng chén ba lần. Người em họ nhìn bạn với đôi mắt ướt. Khi bạn về, cả gia đình nghe bạn kể mà không ai hỏi gì.', 'You sit among strangers and raise your cup three times. Your cousin looks at you with wet eyes. When you return the whole family listens without asking anything.', { rep: 6, network: 10, sanity: 3 }),
      fc('Thuyết phục một Great Elder đi cùng bạn', 'Persuade a Great Elder to come with you',
        'Great Elder đến với một chiếc áo cũ nhất ông có. Bên kia hiểu đó là sự nhún nhường, và hai nhà ngồi ăn cùng nhau lần đầu từ ba thế hệ.', 'The Great Elder comes in the oldest coat they own. The other side understands it as humility, and the two houses eat together for the first time in three generations.', { rep: 9, network: 12, sanity: 2 }, { meritAdd: 4 }),
      fc('Gửi quà và lời xin lỗi vắng mặt', 'Send a gift and an apology for your absence',
        'Người em họ nhận quà và không trả lời. Hai năm sau bạn nghe nói họ sinh con, và bạn chưa bao giờ được mời đến đầy tháng.', 'The cousin accepts the gift and does not reply. Two years later you hear they had a child, and you were never invited to the first-month feast.', { sanity: -4, network: -6, rep: -2 })
    ], 8),

  mission('middle_the_collector_who_cried', 'Middle', [2, 3],
    '[Người đòi nợ khóc] Một người thu nợ của gia đình, người đã làm việc này hai mươi năm, đến nhà bạn lúc nửa đêm và khóc. Họ nói họ không thể gạch thêm một cái tên nào nữa. Họ không xin nghỉ. Họ chỉ không biết phải làm gì.',
    '[The collector who cried] A family collector who has done this work twenty years comes to your house at midnight and weeps. They say they cannot strike another name. They do not ask to stop. They simply do not know what to do.',
    [
      fc('Ngồi cùng họ cả đêm, không nói gì', 'Sit with them all night, saying nothing',
        'Họ khóc cho đến sáng và ngủ gục trên ghế. Bạn đắp cho họ một tấm chăn. Tuần sau họ trở lại làm việc, chậm hơn, và nhìn bạn khác đi.', 'They weep until morning and fall asleep in the chair. You lay a blanket over them. The next week they return to work, slower, and look at you differently.', { sanity: 3, network: 10, rep: 5 }),
      fc('Giao họ một việc nhẹ hơn trong vài tháng', 'Give them lighter work for a few months',
        'Họ dạy các Little Sibling cách đọc sổ. Có đứa trẻ hỏi vì sao người ấy buồn, và họ trả lời bằng một câu chuyện không có kết thúc.', 'They teach the Little Siblings how to read the book. A child asks why they are sad, and they answer with a story that has no ending.', { rep: 6, network: 8, sanity: 4 }, { meritAdd: 4 }),
      fc('Nói rằng nghề này không dành cho người khóc', 'Say this work is not for those who weep',
        'Họ gật đầu, cúi chào, và không bao giờ quay lại. Một tháng sau bạn nghe họ mở một tiệm vá giày nhỏ ở phố kia, và bạn không bao giờ ghé qua.', 'They nod, bow and never return. A month later you hear they have opened a small shoe-mending shop across town, and you never stop by.', { rep: -3, sanity: -6, network: -4 })
    ], 9),

  mission('middle_the_toast_that_failed', 'Middle', [3, 3],
    '[Lời chúc không thành] Bạn được giao nâng ly chúc mừng trong tiệc kỷ niệm của gia đình, nhưng khi đứng lên, bạn nhận ra mình không còn nhớ gia đình đang kỷ niệm điều gì. Cả sảnh chờ bạn nói.',
    '[The toast that failed] You are asked to raise a toast at the family’s anniversary feast, but standing, you realize you no longer remember what the family is commemorating. The whole hall waits for you to speak.',
    [
      fc('Nói thật là bạn không nhớ', 'Say honestly that you do not remember',
        'Một khoảng im lặng dài, rồi một người già bật cười và gọi to ngày ấy. Cả sảnh cùng nhắc, và bạn hiểu đó là điều gia đình đang chờ: một người dám nói bạn không nhớ.', 'A long silence, then an old person laughs and calls out the date. The whole hall joins in recalling, and you understand that is what the family was waiting for: someone who dared say they did not remember.', { rep: 7, sanity: 6, network: 10 }),
      fc('Chúc rằng gia đình còn nhớ mãi những gì nó quên', 'Toast that the family keep remembering what it has forgotten',
        'Câu ấy làm cả sảnh lặng đi, rồi vang tiếng ly chạm nhau. Có người hỏi bạn lấy đâu ra câu ấy, và bạn không biết.', 'The line leaves the hall silent, then glasses clink everywhere. Someone asks where you got that sentence, and you do not know.', { rep: 9, network: 8, sanity: 2 }, { meritAdd: 5 }),
      fc('Nhờ người lớn tuổi nhất nói thay', 'Ask the eldest to speak for you',
        'Người lớn tuổi nhất đứng dậy với vẻ nhẹ nhõm kỳ lạ và nói mười phút không nghỉ. Khi ngồi xuống, họ nắm tay bạn dưới bàn và không nói gì.', 'The eldest rises with a strange relief and speaks ten minutes without pause. When seated they clasp your hand under the table and say nothing.', { sanity: 4, network: 6, rep: 2 })
    ], 8),

  // ------------------------------------------------------------------ Pinky
  mission('pinky_the_blind_swordsman', 'Pinky', [1, 2],
    '[Kiếm khách mù] Một kiếm khách mù từ phương xa đến xin một trận với một Sworn Blade bất kỳ. Họ mang theo một dải vải che mắt và bảo người đối diện cũng phải bịt mắt. "Kiếm không cần mắt," họ nói.',
    '[The blind swordsman] A blind swordsman from far off asks for a bout with any Sworn Blade. They bring a cloth for the eyes and say the opponent must be blindfolded too. “A sword needs no eyes,” they say.',
    [
      fc('Bịt mắt và nhận trận', 'Bind your eyes and take the bout',
        'Bạn nghe hơi thở và bước chân, và lần đầu hiểu vì sao người ta nói kiếm khách mù là bậc thầy. Bạn thua, nhưng thua theo cách bạn muốn nhớ.', 'You hear breath and footsteps, and for the first time understand why they call the blind swordsman a master. You lose, but in a way you want to remember.', { health: -6, rep: 6, sanity: 5, resonance: 4 }),
      fc('Từ chối bịt mắt nhưng mời họ ngồi cùng bạn', 'Refuse the blindfold but invite them to sit with you',
        'Họ nghe bạn nói suốt buổi tối về những trận bạn đã đấu. Cuối cùng họ nói: "Bạn chưa từng nghe kiếm của chính mình." Bạn không hiểu, nhưng nhớ.', 'They hear you talk all evening about the bouts you have fought. At last they say: “You have never heard your own sword.” You do not understand, but you remember.', { sanity: 4, rep: 4, network: 5 }),
      fc('Cử một đệ tử của bạn đấu thay', 'Send a student of yours to fight in your place',
        'Đệ tử thua trong ba nhịp và bật khóc. Kiếm khách mù tháo dải vải và hỏi tên người dạy cậu. Bạn đứng ở cửa, và họ quay mặt đúng về phía bạn.', 'The student loses in three beats and weeps. The blind swordsman removes the cloth and asks the name of the teacher. You stand at the door, and they turn their face exactly toward you.', { rep: 2, sanity: -3, network: -2 })
    ], 8),

  mission('pinky_the_bell_that_rang_once', 'Pinky', [2, 3],
    '[Chuông vang một lần] Chuông của sân kiếm vang lên một lần giữa đêm, không có ai chạm vào. Theo truyền thống, tiếng chuông ấy nghĩa là một lời thề đã được trả ở đâu đó, và Pinky phải tìm ra lời thề nào. Chưa có Sworn Blade nào báo.',
    '[The bell that rang once] The yard’s bell rings once in the dead of night with no one touching it. By tradition that sound means an oath has been paid somewhere, and the Pinky must learn which. No Sworn Blade has reported.',
    [
      fc('Hỏi từng Sworn Blade trong đêm', 'Ask each Sworn Blade through the night',
        'Đến sáng bạn tìm ra: một lời thề đã được trả bởi một người không còn là Pinky, ở một nơi cách đây ba ngày đường. Bạn không biết người ấy còn sống không.', 'By morning you find out: an oath has been paid by someone no longer of the Pinky, at a place three days’ road away. You do not know whether that person lives.', { sanity: -5, rep: 7, network: 5 }, { meritAdd: 4 }),
      fc('Đứng ở dưới chuông đến khi trời sáng', 'Stand under the bell until dawn',
        'Không có tiếng nào nữa. Bạn nhìn chuông, và thấy trên mặt đồng một dấu ngón tay mà không ai nhớ có từ khi nào.', 'No further sound. You look at the bell and see on its bronze a fingerprint no one remembers from when.', { sanity: -3, rep: 4, resonance: 6 }),
      fg('Bảo mọi người rằng đó chỉ là gió và đi ngủ', 'Tell everyone it was only wind and go to sleep', [
        [50, 'Sáng hôm sau không có gì xảy ra, và Pinky ghi đó là một đêm bình thường. Bạn nằm thức đến sáng và vẫn không hiểu.', 'Nothing happens the next morning and the Pinky records it as an ordinary night. You lie awake until dawn and still do not understand.', { sanity: 2, rep: 1 }],
        [50, 'Một lời thề thật sự đã được trả, và người trả đã chết một mình. Khi sự thật lộ ra, người ta nhớ bạn là người bảo đó chỉ là gió.', 'A real oath was paid, and the one who paid it died alone. When the truth emerges, people remember you as the one who said it was only wind.', { rep: -7, sanity: -8, network: -4 }]
      ])
    ], 9),

  mission('pinky_the_sword_without_a_name', 'Pinky', [3, 3],
    '[Thanh kiếm không tên] Một thanh kiếm không có tên được trao cho bạn trong buổi lễ, và theo thông lệ chủ nhân mới phải đặt tên cho nó. Cả sân chờ. Tên bạn chọn sẽ được khắc vào vỏ và mang theo qua các đời Sovereign.',
    '[The sword without a name] A nameless sword is handed to you at a rite, and by custom the new owner must name it. The whole yard waits. The name you choose will be cut on the scabbard and carried through the Sovereigns.',
    [
      fc('Đặt tên theo người đã dạy bạn cầm kiếm', 'Name it for the one who taught you to hold a sword',
        'Cả sân im lặng khi bạn nói tên ấy. Một bà lão trong hàng ghế sau cúi đầu rất sâu. Thanh kiếm được khắc, và mỗi đời Sovereign sau bạn đều nói tên ấy khi rút nó.', 'The whole yard goes quiet when you say that name. An old woman in the back rows bows very low. The sword is engraved, and each Sovereign after you says that name when drawing it.', { rep: 12, sanity: 8, network: 8 }, { meritAdd: 6 }),
      fc('Đặt cho nó một tên vô nghĩa để không ai phải mang gánh nặng', 'Give it a meaningless name so no one carries its weight',
        'Tên ấy chỉ có hai âm tiết và chẳng gợi gì. Sau này người ta kể nó là thanh kiếm nhẹ nhất Pinky từng có, dù cân nặng không đổi.', 'The name is only two syllables and suggests nothing. Later people say it is the lightest sword the Pinky ever owned, though its weight does not change.', { sanity: 5, rep: 6 }),
      fc('Để vỏ trống và không đặt tên', 'Leave the scabbard blank and give no name',
        'Hội đồng nhìn nhau, rồi không ai phản đối. Thanh kiếm không tên hóa ra nặng hơn mọi thanh kiếm có tên, và bạn không rút nó nhiều lần.', 'The council looks among themselves and no one objects. The nameless sword turns out heavier than any named one, and you rarely draw it.', { sanity: -5, rep: 4, resonance: 6 })
    ], 10)
];
