// A third trial for every Finger rung that had only two, so a member who has to sit the same promotion twice
// (a failed attempt, a retry after an E.G.O leap) is not handed the same scene again. Every Finger now has
// three trials a rung, as a Fixer has three for each Grade. Flags, ranks and reward bands follow the older trials.

const win = ([labelVi, labelEn, resultVi, resultEn, effects, meritAdd], rank, done) => ({
  labelVi, labelEn, resultVi, resultEn, setFingerRank: rank, flagsAdd: [done], meritAdd, effects
});
const defer = ([labelVi, labelEn, resultVi, resultEn, effects]) => ({ labelVi, labelEn, resultVi, resultEn, effects });

const promo = (id, finger, from, done, age, weight, vi, en, a, b, d) => ({
  id, age, major: true, weight, allowDistorted: true,
  need: { finger, fingerRank: from },
  forbids: [done],
  vi, en,
  choices: [win(a, from + 1, done), win(b, from + 1, done), defer(d)]
});

const REST1 = { health: 16, sanity: 12, wealth: 8, rep: 5 };
const REST2 = { health: 16, sanity: 14, wealth: 10 };
const REST3 = { health: 18, sanity: 14, wealth: 10 };

export const FINGER_PROMO_EXTRA = [
  // ------------------------------------------------------------------ The Thumb
  promo('syn_thumb_promo_capo_ledger', 'Thumb', 0, 'promo_thumb_capo_done', [19, 58], 95,
    '[Bài thử Capo: sổ cái] Sottocapo đặt trước bạn sổ cái của cả khu, con dao chặn giấy nằm trên trang cuối. "Ba tháng nay thiếu sáu mươi hộp đạn và không ai nhận." Đội Soldato đứng sau lưng, nhìn tay bạn.',
    '[Capo trial: the ledger] The Sottocapo sets the district’s ledger before you, a knife lying on the last page as a paperweight. “Sixty boxes of ammunition have been short for three months and no one owns it.” The Soldati stand behind you, watching your hands.',
    ['Lần theo từng chữ ký và chỉ ra người giữ kho', 'Trace every signature and name the storekeeper',
      'Bạn tìm ra người giữ kho sau một đêm đối chiếu. Hắn thú nhận trước khi bạn nói hết câu. Sottocapo trao phù hiệu Capo và để bạn quyết số phận của hắn.',
      'You find the storekeeper after one night of cross-checking. He confesses before you finish the sentence. The Sottocapo pins on the Capo insignia and leaves his fate to you.', { rep: 20, wealth: 18, sanity: -4 }, 20],
    ['Nhận phần thiếu về mình và bắt cả đội cùng bù', 'Take the shortfall on yourself and make the whole squad cover it',
      'Cả đội nộp bù trong ba ngày, không ai phàn nàn. Họ hiểu một Capo gánh trước thì được phép đòi sau. Sottocapo gật đầu: "Chịu trách nhiệm là phần đầu tiên."',
      'The whole squad paid it back in three days, no one complaining. They understood that a Capo who carries first may collect after. The Sottocapo nodded: “Responsibility is the first part.”', { rep: 22, network: 12, wealth: -6 }, 22],
    ['Xin thêm một tuần để đối chiếu kho', 'Ask one more week to cross-check the store',
      'Sottocapo cho thêm bảy ngày và ghi nhận rằng bạn không đoán bừa.', 'The Sottocapo grants seven more days and notes that you do not guess.', REST1]),

  promo('syn_thumb_promo_sottocapo_envoy', 'Thumb', 1, 'promo_thumb_sottocapo_done', [21, 65], 95,
    '[Khảo thí Sottocapo: sứ giả] Một Thumb ở District lân cận cử người đến xin gặp. Bạn phải thay mặt Sottocapo tiếp, và mỗi câu bạn nói sẽ được đem về cân từng chữ. Họ mang theo một hộp bánh và một câu hỏi.',
    '[Sottocapo trial: the envoy] A Thumb from a neighboring District sends someone to ask for a meeting. You must receive them for the Sottocapo, and every sentence you say will be carried home and weighed word by word. They bring a box of cakes and one question.',
    ['Tiếp đủ lễ nghi, đáp câu hỏi bằng một câu hỏi khác', 'Receive them with full form and answer the question with a question',
      'Sứ giả ra về với hộp bánh còn nguyên và không có câu trả lời nào. Sottocapo nghe kể lại, im lặng một lúc, rồi đẩy tấm phù hiệu về phía bạn.',
      'The envoy left with the cakes untouched and no answer. The Sottocapo heard the report, was silent a while, then pushed the insignia toward you.', { rep: 40, wealth: 55, network: 30, sanity: 8 }, 34],
    ['Dẫn họ đi xem kho đạn đã khóa, để họ tự hiểu', 'Walk them past the locked armory and let them work it out',
      'Họ nhìn ổ khóa rất lâu và không hỏi gì nữa. Tối đó hai bên ký một lời hứa không đi qua ranh giới của nhau. Sottocapo ghi tên bạn bên dưới.',
      'They looked at the lock a long time and asked nothing more. That evening the two sides signed a promise not to cross each other’s line. The Sottocapo wrote your name beneath it.', { rep: 44, wealth: 60, health: -4 }, 36],
    ['Xin hoãn một tuần để học thuộc lễ nghi tiếp khách', 'Ask a week’s delay to learn the etiquette of receiving guests',
      'Sottocapo đồng ý. Bạn dành tuần đó đứng trước gương và nói câu chào cho đến khi hết run.', 'The Sottocapo agrees. You spend the week before a mirror saying the greeting until it stops shaking.', REST2]),

  promo('syn_thumb_underboss_succession', 'Thumb', 2, 'promo_thumb_underboss_done', [24, 70], 920,
    '[Lễ nối ngôi Underboss] Underboss cũ ngồi trong phòng họp với hai chiếc ghế, một cho ông và một cho người sẽ thay. Ba Sottocapo khác cũng đến. Không ai nhắc đến phiếu bầu, vì phiếu đã được bỏ bằng đạn từ mùa trước.',
    '[Succession of the Underboss] The old Underboss sits in the meeting room with two chairs, one for him and one for his successor. Three other Sottocapi have come too. No one mentions votes, because the votes were cast in bullets last season.',
    ['Ngồi xuống chiếc ghế thứ hai trước khi được mời', 'Sit in the second chair before you are invited',
      'Không ai nói gì trong một phút dài. Rồi Underboss cũ đặt khẩu súng của mình lên tay vịn ghế bạn. Ba Sottocapo đứng dậy, và ghế còn lại trở thành của bạn.',
      'No one spoke for one long minute. Then the old Underboss laid his own pistol on the arm of your chair. The three Sottocapi rose, and the seat became yours.', { rep: 50, wealth: 85, sanity: 10, health: -10 }, 52],
    ['Chờ được mời, rồi nhường người lớn tuổi nhất nói trước', 'Wait to be invited, then let the eldest speak first',
      'Bạn chờ, và chờ lâu hơn mọi người đoán. Khi lời mời đến, nó đến từ cả ba Sottocapo cùng lúc. Underboss cũ mỉm cười như người vừa thắng một ván cờ.',
      'You waited, longer than anyone guessed. When the invitation came, it came from all three Sottocapi at once. The old Underboss smiled like one who has just won a game.', { rep: 48, network: 45, wealth: 80, sanity: 14 }, 50],
    ['Hoãn lễ nối ngôi để củng cố hậu phương', 'Postpone the succession to shore up your rear',
      'Bạn dùng thời gian thêm để dưỡng thương và kiểm lại từng người đứng sau lưng. Có ba người bạn không còn tin.', 'You use the time to heal and check each person standing behind you. There are three you no longer trust.', REST3]),

  // ------------------------------------------------------------------ The Index
  promo('syn_index_promo_messenger_night', 'Index', 0, 'promo_index_messenger_done', [19, 58], 95,
    '[Thử thách Messenger: đêm không đèn] Một Proxy đưa bạn mười tờ giấy gấp và một chiếc đèn đã cạn dầu. Mười địa chỉ, một đêm, và không được thắp thêm ánh sáng nào. "Messenger đọc đường bằng chân," người ấy nói.',
    '[Messenger trial: the unlit night] A Proxy hands you ten folded slips and a lamp already out of oil. Ten addresses, one night, and no further light may be lit. “A Messenger reads the road with their feet,” they say.',
    ['Đi theo trí nhớ từng bước chân, giao đúng cả mười', 'Walk by the memory of each step and deliver all ten',
      'Bạn giao đủ mười tờ, và người cuối cùng mở cửa trước khi bạn kịp gõ. Proxy đứng chờ ở đầu phố. "Khoảng cách giữa tờ giấy và người nhận," họ nói, "là thứ ngươi vừa học."',
      'You delivered all ten, and the last person opened the door before you could knock. The Proxy waited at the head of the street. “The distance between the slip and the recipient,” they said, “is what you have just learned.”', { rep: 20, network: 14, sanity: -6 }, 20],
    ['Nhờ một người mù trong khu dẫn bạn qua những ngõ khó', 'Ask a blind neighbor to guide you through the hard alleys',
      'Người mù đi trước, bạn bước theo, và cả mười địa chỉ xong trước chuông sáng. Proxy ghi nhận rằng bạn biết nhờ ai, và người ấy được nhận một khoản nhỏ từ Index.',
      'The blind neighbor walked ahead and you followed, and all ten addresses were done before the morning bell. The Proxy noted that you knew whom to ask, and the neighbor received a small sum from the Index.', { rep: 18, network: 22, wealth: -4 }, 21],
    ['Xin hoãn một đêm để học thuộc các ngõ', 'Ask a night’s delay to learn the alleys by heart',
      'Proxy đồng ý và không giải thích gì thêm. Bạn dành đêm đó đi bộ trong ánh sáng ban ngày.', 'The Proxy agrees and explains nothing more. You spend the night walking the streets in daylight.', REST1]),

  promo('syn_index_promo_proxy_silence', 'Index', 1, 'promo_index_proxy_done', [21, 65], 95,
    '[Khảo thí Proxy: ba ngày im lặng] Index yêu cầu bạn không nói với ai trong ba ngày, kể cả khi bị hỏi thẳng. Trong ngày thứ hai, một người quen cũ đến hỏi bạn một câu duy nhất, và câu hỏi ấy có thể cứu mạng họ.',
    '[Proxy trial: three days of silence] The Index orders you to speak to no one for three days, even if asked directly. On the second day an old acquaintance comes and asks you one single question, and the answer could save their life.',
    ['Giữ im lặng đến hết ba ngày', 'Keep silent to the end of the third day',
      'Người quen đứng chờ rất lâu rồi bỏ đi. Hết ngày thứ ba, Index nhận bạn làm Proxy. Bạn không bao giờ biết người ấy có sống không.',
      'The acquaintance waited a long time and left. At the end of the third day the Index took you as a Proxy. You never learned whether they lived.', { rep: 42, sanity: -18, wealth: 55 }, 36],
    ['Trả lời bằng một cái gật đầu rồi tự nhận lỗi', 'Answer with a nod and confess your breach',
      'Người quen sống. Index ghi một vết vào hồ sơ của bạn, rồi chọn bạn: "Một Proxy phải biết lúc nào tờ giấy đáng bị bỏ."',
      'The acquaintance lived. The Index entered a mark in your file, then chose you anyway: “A Proxy must know when a slip is worth setting aside.”', { rep: 38, network: 25, wealth: 45, sanity: 10 }, 34],
    ['Xin hoãn khảo thí, nói rằng bạn chưa sẵn sàng với sự im lặng', 'Ask to postpone, saying you are not ready for the silence',
      'Index ghi nhận lời xin hoãn như một lời thú nhận. Bạn dành mùa này nói chuyện với những người bạn còn có.', 'The Index records the request as an admission. You spend the season talking with the friends you still have.', REST2]),

  promo('syn_index_weaver_blank', 'Index', 2, 'promo_index_weaver_done', [22, 70], 920,
    '[Trang giấy trắng của Weaver] Weaver đưa bạn một tờ Prescript không có chữ nào. "Viết điều cần xảy ra, và ký tên. Người đọc sẽ làm theo từng chữ." Bên ngoài cửa sổ có một con phố mà bạn có thể viết bất kỳ điều gì lên.',
    '[The Weaver’s blank page] The Weaver gives you a Prescript with no words on it. “Write what must happen, and sign it. Whoever reads it will do exactly as written.” Outside the window lies a street onto which you may write anything.',
    ['Viết một dòng rất ngắn, rồi gấp tờ giấy lại', 'Write a single very short line and fold the page',
      'Dòng chữ ấy chỉ có sáu từ. Weaver đọc, im lặng, rồi cất tờ giấy vào ngực. "Lệnh ngắn nhất là lệnh của người hiểu sức nặng của nó." Bạn trở thành Weaver.',
      'The line held six words. The Weaver read it, said nothing and put the page inside their coat. “The shortest order is the order of one who understands its weight.” You became a Weaver.', { rep: 50, wealth: 80, sanity: -8, resonance: 8 }, 52],
    ['Để trống và trả lại, ký tên ở góc', 'Leave it blank and hand it back, signed in the corner',
      'Weaver nhìn trang trắng rất lâu. Rồi họ cười lần đầu trong nhiều năm: "Đã có người nhìn ra chỗ này." Index ghi tên bạn bên cạnh tên họ.',
      'The Weaver looked at the blank page for a long time. Then they laughed for the first time in many years: “Someone has seen through this place.” The Index wrote your name beside theirs.', { rep: 55, network: 45, wealth: 70, sanity: 10 }, 54],
    ['Hoãn, xin thêm một mùa để nghĩ điều đáng viết', 'Postpone and ask another season to think what is worth writing',
      'Weaver đồng ý. Bạn dành cả mùa với một tờ giấy trắng trên bàn, và đến cuối mùa vẫn chưa viết gì.', 'The Weaver agrees. You spend the season with a blank sheet on your desk and, at the end, still have written nothing.', REST3]),

  // ------------------------------------------------------------------ The Middle
  promo('syn_middle_promo_big_sibling_dinner', 'Middle', 0, 'promo_middle_big_sibling_done', [19, 58], 95,
    '[Thử thách Big Sibling: bữa cơm hai nhà] Hai nhà của The Middle sắp tuyệt giao vì một con dê. Bạn được cử ngồi giữa bữa cơm giảng hòa, và mỗi bên đã mang theo ghế của người nói thay.',
    '[Big Sibling trial: a dinner of two houses] Two houses of the Middle are about to break over a goat. You are sent to sit between them at a reconciliation dinner, and each side has brought a seat for its spokesperson.',
    ['Chia con dê làm đôi và để mỗi bên tự chọn nửa', 'Divide the goat in two and let each side choose its half',
      'Họ nhìn hai nửa con dê và không bên nào dám chọn trước. Rồi một ông già bật cười, và bữa cơm bắt đầu. Cả hai nhà nhớ tên bạn như người đã làm họ cười.',
      'They looked at the two halves of the goat and neither side dared choose first. Then an old man laughed, and the dinner began. Both houses remembered your name as the one who made them laugh.', { rep: 20, network: 20, wealth: 6, sanity: 4 }, 20],
    ['Đứng dậy nhận lỗi thay cả hai bên, rồi trả tiền con dê', 'Stand and take the blame for both sides, then pay for the goat',
      'Cả phòng im bặt. Hai nhà không còn gì để cãi vì người đứng giữa đã tự chịu hết. Bạn mất khoản tiền nhưng giữ được hai chiếc ghế trong Book of Vengeance.',
      'The whole room fell silent. The two houses had nothing left to argue because the one between them had taken it all. You lost the money but kept two seats in the Book of Vengeance.', { rep: 24, network: 26, wealth: -16 }, 22],
    ['Xin hoãn bữa cơm để hỏi người lớn tuổi nhất về chuyện con dê', 'Ask to delay the dinner to ask the eldest about the goat',
      'Người lớn tuổi nhất kể cho bạn nghe cả buổi chiều. Hóa ra con dê chưa bao giờ là chuyện chính.', 'The eldest told you the whole afternoon through. It turned out the goat was never the real matter.', REST1]),

  promo('syn_middle_promo_great_elder_ledger', 'Middle', 1, 'promo_middle_great_elder_done', [21, 65], 95,
    '[Khảo thí Great Elder: trang cuối của sổ] Một Great Elder đã mất để lại một trang sổ chưa gạch. Tên trong đó là của một người mà cả hai nhà đều yêu quý. Bạn là người phải quyết, và quyết xong thì không ai được hỏi lại.',
    '[Great Elder trial: the last page] A dead Great Elder left a page of the book unstruck. The name on it belongs to someone both houses loved. You must decide, and once decided no one may ask again.',
    ['Gạch tên đi, theo đúng thông lệ của sổ', 'Strike the name, as the book’s custom demands',
      'Bút của bạn không run. Hai nhà nhìn tên ấy biến mất khỏi trang giấy và không ai nói gì suốt bữa tối. Sau đó họ gọi bạn là Great Elder, và không ai gọi bạn là người dễ gần nữa.',
      'Your pen did not shake. The two houses watched the name vanish from the page and no one spoke through dinner. Afterward they called you Great Elder, and no one called you easy to approach.', { rep: 42, wealth: 55, sanity: -12 }, 35],
    ['Giữ trang giấy lại và đưa nó cho chính người trong tên', 'Keep the page and hand it to the named person themself',
      'Người ấy đọc trang giấy rất chậm. Rồi họ tự trả món nợ bằng một cách mà sổ không ghi. Cả hai nhà đứng dậy khi họ rời phòng.',
      'The named person read the page very slowly. Then they paid the debt in a way the book does not record. Both houses stood as they left the room.', { rep: 40, network: 38, wealth: 45, sanity: 6 }, 36],
    ['Xin hoãn để hỏi những người từng quen biết Great Elder đã mất', 'Ask to postpone to question those who knew the dead Great Elder',
      'Ba người nói ba điều khác nhau. Bạn nghe cả ba, và nghĩ rằng đây có lẽ là điều Great Elder muốn bạn làm.', 'Three people told you three different things. You heard all three and thought this was perhaps what the Great Elder wanted you to do.', REST2]),

  promo('syn_middle_great_sibling_forgiveness', 'Middle', 2, 'promo_middle_apex_done', [24, 70], 920,
    '[Lễ Great Sibling: món nợ không ai nhớ] Một món nợ nằm trong Book of Vengeance từ trước khi ai trong phòng sinh ra. Người nợ đã mất, người đòi cũng vậy. Hai hậu duệ đứng hai bên bàn, và nghi lễ muốn bạn quyết có đòi tiếp hay không.',
    '[Great Sibling rite: the debt no one remembers] One debt has sat in the Book of Vengeance since before anyone in the room was born. The debtor is dead and so is the claimant. Two descendants stand on either side of the table, and the rite wants you to decide whether it is collected on.',
    ['Tuyên bố món nợ kết thúc cùng người lập ra nó', 'Declare the debt ended with the one who made it',
      'Hai hậu duệ nhìn nhau lần đầu. Cuốn sổ được khép ở trang ấy. Từ đó người ta nhắc bạn là Great Sibling đã dám đóng một trang mà tổ tiên không dám đóng.',
      'The two descendants looked at each other for the first time. The book was closed on that page. From then on people spoke of you as the Great Sibling who dared to close a page the ancestors would not.', { rep: 52, network: 40, wealth: 70, sanity: 14 }, 52],
    ['Đòi tiếp, nhưng chia đều khoản nợ ra cả gia đình', 'Collect on, but spread the debt evenly across the whole family',
      'Mỗi người trong phòng nhận một phần rất nhỏ và không ai thấy mình bị thiệt. Cuốn sổ ghi lại cách bạn làm: một món nợ lớn thành nhiều món nhỏ nằm ở nhiều bàn tay.',
      'Each person in the room took a very small share and none felt wronged. The book recorded how you did it: one large debt made into many small ones held in many hands.', { rep: 48, wealth: 85, network: 35, sanity: 8 }, 50],
    ['Xin hoãn để đọc lại những trang quanh món nợ ấy', 'Ask to postpone and reread the pages around that debt',
      'Bạn đọc suốt một mùa và tìm thấy một dòng bị bỏ sót. Dòng ấy thay đổi cách bạn nghĩ về cả cuốn sổ.', 'You read a whole season and found an overlooked line. That line changed how you think about the entire book.', REST3]),

  // ------------------------------------------------------------------ The Ring
  promo('syn_ring_promo_docent_restoration', 'Ring', 0, 'promo_ring_docent_done', [19, 58], 95,
    '[Khảo thí Docent: phục chế] Maestro đặt trước bạn một bức tranh bị rách giữa vết xé và một cái hộp màu mà họ đã không dùng nhiều năm. "Làm nó lại như chưa từng bị hư. Nhưng đừng giấu vết xé."',
    '[Docent trial: restoration] The Maestro sets before you a painting torn across the middle and a box of pigments they have not used in years. “Make it whole as if never harmed. But do not hide the tear.”',
    ['Khâu lại bằng chỉ cùng màu và để thấy đường khâu', 'Stitch it with matching thread and leave the seam visible',
      'Vết khâu nằm trên bức tranh như một đường chỉ tay. Maestro nhìn, rồi nói: "Ngươi nhìn ra nó muốn gì." Bạn nhận phù hiệu Docent.',
      'The seam lay across the painting like a line on a palm. The Maestro looked and said: “You saw what it wanted.” You received the Docent’s badge.', { rep: 20, wealth: 18, sanity: 8 }, 20],
    ['Vẽ thêm một nhân vật mới ngay trên vết xé', 'Paint a new figure directly over the tear',
      'Vết xé biến thành đường chân trời, và một dáng người mới đứng ở đó. Maestro im lặng rất lâu, rồi nói bức tranh giờ có hai tác giả, và một trong hai là bạn.',
      'The tear became a horizon, and a new figure stood upon it. The Maestro was silent a long while, then said the painting now had two authors, and one of them was you.', { rep: 22, network: 14, wealth: 14, sanity: -4 }, 22],
    ['Xin hoãn một tuần để học hộp màu cũ', 'Ask a week to learn the old pigment box',
      'Maestro cho phép và để lại hộp màu trên bàn bạn. Bạn dành tuần ấy pha từng sắc cho đến khi đúng.', 'The Maestro allows it and leaves the pigment box on your desk. You spend the week mixing each shade until it is right.', REST1]),

  promo('syn_ring_curator_unsigned', 'Ring', 2, 'promo_ring_curator_done', [25, 75], 920,
    '[Đại lễ Grand Curator: tác phẩm không tên] Cả phòng trưng bày được dọn trống, chỉ còn một tác phẩm chưa ký tên. Hội đồng yêu cầu bạn nói tác giả là ai, và chỉ cần nói sai một lần là mất chiếc ghế.',
    '[Grand Curator rite: the unsigned work] The whole gallery is cleared, leaving a single unsigned work. The council asks you to name its author, and one wrong answer costs you the seat.',
    ['Nhận ra bàn tay qua nét cọ cuối cùng', 'Recognize the hand through the final brushstroke',
      'Bạn nói một cái tên, và cả phòng nín thở. Rồi người ấy bước ra từ hàng ghế sau, già hơn bạn tưởng. "Ba mươi năm," họ nói, "không ai nhận ra tôi." Bạn trở thành Grand Curator.',
      'You said a name, and the whole room held its breath. Then that person stepped out from the back rows, older than you expected. “Thirty years,” they said, “no one recognized me.” You became Grand Curator.', { rep: 52, network: 40, wealth: 80, sanity: 10 }, 52],
    ['Từ chối đoán tác giả, mà nói tác phẩm này muốn được nhìn thế nào', 'Refuse to guess the author and say instead how the work wants to be seen',
      'Hội đồng nghe bạn nói suốt mười phút. Không ai ngắt lời. Khi bạn dừng, người chủ trì đặt phù hiệu lên bàn mà không giải thích gì thêm.',
      'The council listened to you for ten minutes. No one interrupted. When you stopped, the chair set the badge on the table with no further explanation.', { rep: 50, wealth: 90, resonance: 12, sanity: 8 }, 50],
    ['Hoãn đại lễ, xin một mùa nhìn tác phẩm mỗi ngày', 'Postpone the rite and ask a season to look at the work each day',
      'Hội đồng đồng ý lần đầu tiên trong lịch sử. Bạn dành mỗi sáng đứng trước tác phẩm và mỗi tối ghi một dòng.', 'The council agrees for the first time in its history. You spend each morning before the work and each evening writing one line.', REST3]),

  // ------------------------------------------------------------------ The Pinky
  promo('syn_pinky_promo_blade_ferry', 'Pinky', 0, 'promo_pinky_blade_done', [19, 58], 95,
    '[Thử thách Sworn Blade: chuyến đò cuối] Một Sworn Blade già đưa bạn đến bến đò và nói rằng người ngồi trên chuyến đò cuối đêm nay mang theo một lời thề chưa trả. Người ấy sẽ lên bờ trong một giờ.',
    '[Sworn Blade trial: the last ferry] An aged Sworn Blade leads you to the ferry landing and says the one on tonight’s last ferry carries an unpaid oath. They will come ashore within the hour.',
    ['Chờ ở bậc đầu tiên và nói lời thề trước khi người ấy bước lên', 'Wait on the first step and speak the oath before they step ashore',
      'Người ấy dừng một chân trên bậc, nghe hết lời thề, rồi bước xuống trả nó bằng một nhát. Sworn Blade già đứng ở cuối bến và không nói gì. Bạn nhận thanh kiếm đầu tiên của mình.',
      'They stopped with one foot on the step, heard the oath out, then came down and paid it with a single stroke. The old Sworn Blade stood at the end of the landing and said nothing. You received your first sword.', { rep: 20, wealth: 14, sanity: -6, health: -4 }, 20],
    ['Lên đò và nói lời thề giữa dòng sông', 'Board the ferry and speak the oath mid-river',
      'Giữa sông không có ai chứng kiến, và lời thề được trả trong im lặng. Khi đò cập bến, chỉ có bạn xuống. Sworn Blade già nhìn bạn và cúi đầu một lần rất ngắn.',
      'Mid-river there was no witness, and the oath was paid in silence. When the ferry reached the shore only you stepped off. The old Sworn Blade looked at you and bowed once, very briefly.', { rep: 22, sanity: -10, wealth: 12 }, 22],
    ['Xin hoãn để học cách giữ thăng bằng trên đò', 'Ask to postpone and learn to keep your balance on a ferry',
      'Sworn Blade già gật đầu và đưa bạn đi chơi chèo suốt tuần. Bạn không biết đó có phải là một bài học.', 'The old Sworn Blade nodded and took you rowing all week. You did not know whether it was a lesson.', REST1]),

  promo('syn_pinky_sovereign_empty_yard', 'Pinky', 2, 'promo_pinky_sovereign_done', [25, 75], 920,
    '[Lễ Sovereign: sân không người] Sovereign cũ đứng ở giữa một sân kiếm trống, không có người xem, không có người chứng. "Pinky chỉ thật sự thề khi không ai nghe," họ nói. Họ đặt thanh kiếm của mình xuống đất giữa hai người.',
    '[Sovereign rite: the empty yard] The old Sovereign stands in the middle of an empty sword yard, no watchers and no witnesses. “The Pinky truly swears only when no one is listening,” they say. They lay their own sword on the ground between you.',
    ['Nhặt thanh kiếm của họ lên và đưa trả bằng cả hai tay', 'Take up their sword and return it with both hands',
      'Sovereign cũ nhìn thanh kiếm trong tay mình lâu hơn bạn đoán. Rồi họ lui một bước và để bạn đứng giữa sân. "Ở đây, một lời thề không cần ai nghe." Bạn trở thành Sovereign.',
      'The old Sovereign looked at the sword in their hands longer than you expected. Then they stepped back and left you in the middle of the yard. “Here, an oath needs no one to hear it.” You became Sovereign.', { rep: 52, wealth: 80, sanity: 6, health: -8 }, 52],
    ['Đặt thanh kiếm của bạn xuống cạnh nó và đứng yên', 'Lay your own sword beside theirs and stand still',
      'Hai thanh kiếm nằm cạnh nhau trên đất. Họ đứng đó suốt một giờ. Khi mặt trời xuống, Sovereign cũ nhặt thanh kiếm của bạn lên và trao lại. Đó là toàn bộ nghi lễ.',
      'The two swords lay side by side on the ground. They stood there a whole hour. When the sun went down the old Sovereign picked up your sword and handed it back. That was the whole rite.', { rep: 50, network: 30, wealth: 85, sanity: 14 }, 50],
    ['Hoãn lễ, xin một mùa luyện nhát chém cuối cùng', 'Postpone the rite and ask a season to practice a final stroke',
      'Sovereign cũ đồng ý và quay lưng đi. Bạn không biết đó là lời tán thành hay từ chối.', 'The old Sovereign agrees and turns away. You do not know whether it is approval or refusal.', REST3])
];
