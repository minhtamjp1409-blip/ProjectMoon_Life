// The Thumb: rank, etiquette, bullets and tribute. A Soldato is judged by what comes back to the
// ledger, a Capo by what stays quiet, an Underboss by what no one dares ask. The missions below are
// the work of that hierarchy; every one of them can be done correctly and still cost something.

import { fe, fc, fg, later, fneed, M, C, I, D, AGE } from './fingerKit.js';

const T = 'Thumb';

export const THUMB_EVENTS = [
  // ------------------------------------------------------------------ missions
  fe('thumb_market_tribute', T, [0, 3],
    '[Cống nạp ở chợ cá] Capo giao bạn đi thu khoản cống nạp tháng ở chợ cá District 12. Mười hai sạp, mười một phong bì đã nằm sẵn. Sạp thứ mười hai thuộc về một góa phụ có hai đứa cháu, và bà đặt lên bàn một nắm tiền lẻ, kèm mảnh giấy ghi những khoản bà đã trả cho Wing.',
    '[Tribute at the fish market] Your Capo sends you to collect the monthly tribute at the District 12 fish market. Twelve stalls, eleven envelopes already waiting. The twelfth belongs to a widow with two grandchildren, and she sets a handful of small change on the counter with a slip listing what she has already paid the Wing.',
    [
      fc('Thu đủ, không bớt một xu', 'Take the full amount, not a coin short',
        'Bạn đếm đủ từng đồng lẻ rồi ghi vào sổ. Bà không nói một lời, nhưng hai đứa cháu đứng sau quầy nhìn bạn cho tới khi bạn đi khuất. Capo gật đầu khi nhận phong bì cuối cùng.',
        'You count every small coin and enter it in the ledger. She says nothing, but the two grandchildren behind the counter watch you until you are out of sight. Your Capo nods as he takes the last envelope.',
        { wealth: 8, rep: 5, sanity: -6, network: -3 }, { meritAdd: 3 }),
      fc('Báo thiếu, tự bù phần còn lại', 'Report a shortfall and cover the rest yourself',
        'Bạn nói với Capo rằng sạp này chưa kịp bán. Số tiền còn thiếu bạn bù từ túi mình, và không ai nhắc lại chuyện đó. Lần sau bà góa để lại cho bạn một con cá khô gói giấy báo.',
        'You tell your Capo that stall had not sold yet. You make up the missing amount from your own pocket, and nobody mentions it again. Next time the widow leaves you a dried fish wrapped in newspaper.',
        { wealth: -9, network: 5, sanity: 3 }),
      fg('Cho bà nợ đến tháng sau, ghi tên bạn bảo đảm', 'Let her owe until next month, putting your name as guarantee', [
        [60, 'Tháng sau bà đưa đủ, còn thêm một phong bì nhỏ cho riêng bạn. Capo ghi nhận bạn biết giữ chân người nộp.', 'Next month she pays in full and adds a small envelope for you alone. Your Capo notes that you know how to keep payers.', { rep: 6, wealth: 5, network: 4 }],
        [40, 'Bà không có tiền vào tháng sau. Capo trừ khoản thiếu vào phần của bạn, và sạp cá đổi chủ trước cuối quý.', 'She has no money the next month. Your Capo deducts the shortfall from your share, and the fish stall changes hands before the quarter ends.', { wealth: -14, rep: -4, sanity: -5 }]
      ])
    ], { weight: 10 }),

  fe('thumb_ammo_count', T, [0, 3],
    '[Ba hộp đạn thiếu] Kho đạn của The Thumb báo thiếu ba hộp sau kỳ kiểm sổ. Sổ ghi tên ba Soldato đã ký nhận, và Capo muốn một cái tên trước khi Sottocapo đến. Một trong ba người là người đã chia thuốc lá với bạn từ lúc mới nhập hội.',
    '[Three missing crates] The Thumb’s ammunition store reports three crates missing after the ledger check. The book carries three Soldato names who signed for them, and your Capo wants one name before the Sottocapo arrives. One of the three is the person who shared cigarettes with you from your first week in.',
    [
      fc('Điều tra tới cùng, bất kể là ai', 'Investigate to the end, whoever it is',
        'Bạn lần theo số lô và tìm ra hộp đạn thứ nhất ở một lò rèn, hộp thứ hai trong tay một người mua, hộp thứ ba vẫn nằm trong kho, bị ghi sai kệ. Hóa ra một nửa vụ này chỉ là lỗi của người ghi sổ. Nửa kia thì không.',
        'You trace the lot numbers and find the first crate at a smithy, the second with a buyer, the third still in the store, shelved wrong. Half of this turns out to be a clerk’s mistake. The other half is not.',
        { rep: 8, sanity: -4, network: -2 }, { meritAdd: 4 }),
      fg('Chỉ vào một kẻ mới nhập hội để chắn tiếng', 'Name a recent recruit to take the blame', [
        [65, 'Capo hài lòng với cái tên và không hỏi thêm. Người mới biến mất khỏi danh sách sau ba ngày. Bạn tránh đi ngang chỗ hắn từng đứng.', 'Your Capo is satisfied with the name and asks nothing more. The recruit vanishes from the roll within three days. You avoid walking past where they used to stand.', { rep: 3, sanity: -10, network: -4 }, { flagsAdd: ['thumb_framed_recruit'] }],
        [35, 'Người mới có chứng cứ vắng mặt, và Sottocapo thì rất ghét bị đánh lừa. Bạn bị gọi lên giải thích suốt một buổi tối.', 'The recruit has an alibi, and the Sottocapo hates being misled. You are called up to explain yourself for a whole evening.', { rep: -8, sanity: -7, heat: 4 }]
      ]),
      fc('Tự nhận mình ký nhầm', 'Claim you signed wrongly yourself',
        'Bạn nói chữ ký ở dòng thứ ba là của bạn và bạn không nhớ đã nhận gì. Capo nhìn bạn, rồi ghi một khoản phạt nhỏ và gạch tên ba người kia khỏi danh sách nghi vấn.',
        'You say the third signature is yours and you do not remember receiving anything. Your Capo looks at you for a long time, then writes a small fine and strikes the other three names from the suspect list.',
        { wealth: -10, rep: 2, network: 6, sanity: 2 })
    ]),

  fe('thumb_wedding_guard', T, [0, 3],
    '[Tiệc cưới của Capo] Con gái của Capo xuất giá ở một nhà hàng mướn cả tầng. Nghi thức của The Thumb quy định tiệc cưới không được có tiếng súng, và mọi Soldato phải gửi vũ khí ở cửa. Bạn được giao một việc ngược lại: đứng ở hành lang với khẩu súng giấu dưới áo, vì có tin một nhà khách đến mang theo thứ gì đó khác ngoài quà.',
    '[The Capo’s daughter’s wedding] The Capo’s daughter marries in a restaurant that has rented a whole floor. Thumb etiquette says no gunfire at a wedding, and every Soldato must leave weapons at the door. You are given the opposite task: stand in the corridor with a pistol under your coat, because word has it one guest is bringing something other than a gift.',
    [
      fg('Chặn người khách ở thang máy', 'Stop the guest at the lift', [
        [60, 'Bạn mời người ấy ra một bên và thấy khẩu súng nhỏ trong túi quà. Không ai trong sảnh nghe thấy gì. Capo biết tối đó nhưng chỉ nâng ly với bạn từ xa.', 'You invite the guest aside and find a small pistol in the gift bag. Nobody in the hall hears a thing. The Capo learns of it that night but only raises a glass to you from across the room.', { rep: 10, network: 5, health: -2 }],
        [40, 'Người khách rút súng trước khi bạn kịp lên tiếng. Tiếng nổ làm cả sảnh im bặt, và nghi thức của The Thumb bị phá ngay giữa bài chúc rượu.', 'The guest draws before you can speak. The shot silences the whole hall, and Thumb etiquette is broken in the middle of a toast.', { health: -16, rep: -3, heat: 8 }]
      ]),
      fc('Báo Capo để ông tự xử trí', 'Tell the Capo and let him handle it',
        'Capo nghe xong, vẫn cười, rồi mời người khách đến bàn chính. Cả buổi tiệc bạn đứng cạnh cửa sổ và không rời mắt khỏi hai bàn tay của người ấy.',
        'The Capo listens, keeps smiling, and invites the guest to the head table. All through the feast you stand by the window and never take your eyes off the person’s hands.',
        { sanity: -4, rep: 4, network: 3 }),
      fc('Nhường việc này cho Soldato khác', 'Hand the task to another Soldato',
        'Bạn đưa tin cho một người đồng cấp và quay về bàn tiệc. Cả hai đều không nhắc lại, nhưng sáng hôm sau cái tên của người ấy được nêu trong buổi họp ở một vị trí tốt hơn bạn.',
        'You pass the word to a peer and return to the feast. Neither of you mentions it again, but the next morning their name is raised in the meeting in a better place than yours.',
        { sanity: 2, rep: -4 })
    ]),

  fe('thumb_funeral_salute', T, [0, 3],
    '[Loạt súng tiễn đưa] Một Sottocapo ngã xuống trong cuộc đấu súng với băng Backstreets. Nghi thức của The Thumb đòi mười hai viên đạn lên trời ở lễ an táng, bắn đúng một nhịp. Bạn được chọn đứng cuối hàng, nơi nhịp bị hụt thường lộ ra.',
    '[The salute] A Sottocapo has fallen in a gunfight with a Backstreets crew. Thumb etiquette demands twelve rounds skyward at the burial, fired on a single beat. You are picked to stand at the end of the line, where a missed beat shows most.',
    [
      fc('Bắn đúng nhịp, giữ mắt nhìn thẳng', 'Fire on the beat and keep your eyes straight',
        'Mười hai tiếng nổ chỉ nghe như một. Khi khói tan, ba Capo lần lượt nhìn bạn và không ai nhìn lâu. Lễ an táng kết thúc đúng giờ.',
        'Twelve shots sound as one. When the smoke clears, three Capo glance at you in turn and none look long. The burial ends on time.',
        { rep: 7, sanity: -3, network: 3 }),
      fg('Chĩa họng súng xuống để hỏi người đứng gần hàng', 'Lower your barrel to question the man at the rail', [
        [50, 'Người ấy là kẻ đã bán vị trí của vị Sottocapo. Hắn không ngờ có người nhìn ra, và bạn thấy hắn trắng bệch trước khi viên đạn thứ mười hai nổ.', 'He is the one who sold the Sottocapo’s position. He never expected anyone to notice, and you watch him go pale before the twelfth round goes off.', { rep: 6, sanity: -5, heat: 6 }, { flagsAdd: ['thumb_funeral_informer'] }],
        [50, 'Bạn đã nhầm người. Buổi lễ gián đoạn một nhịp, và Capo yêu cầu bạn xin lỗi trước toàn thể hàng ngũ.', 'You have the wrong man. The ceremony stalls for a beat, and the Capo demands an apology before the whole line.', { rep: -9, sanity: -6 }]
      ]),
      fc('Nhờ đổi chỗ với người đứng giữa', 'Ask to swap places with the man in the middle',
        'Người ở giữa nhận lời mà không nói. Bạn đứng vào chỗ trống và bắn rất tốt, nhưng cả buổi bạn biết mình vừa làm lộ ra một thứ bạn không muốn lộ.',
        'The man in the middle accepts without a word. You stand in his place and shoot well, but all through the ceremony you know you have just shown something you did not want shown.',
        { sanity: -2, rep: -2 })
    ]),

  fe('thumb_bridge_swap', T, [1, 3],
    '[Đổi con tin trên cầu] Một Soldato của The Thumb bị Middle giữ, và một người của Middle bị Thumb giữ. Hai bên đồng ý đổi trên một cây cầu ở rìa District 12 lúc bình minh, mỗi bên đưa ba người không mang vũ khí. Bạn là một trong ba, và bạn biết Underboss chỉ muốn lấy lại một người trong đó.',
    '[Hostage swap on the bridge] A Thumb Soldato is held by the Middle, and a Middle member by the Thumb. Both sides agree to exchange on a bridge at the edge of District 12 at dawn, each bringing three unarmed people. You are one of the three, and you know the Underboss only wants one of them back.',
    [
      fc('Làm đúng thỏa thuận, đưa cả hai bên về', 'Honor the deal and bring everyone back',
        'Hai hàng người đi qua nhau không ngoái đầu. Cầu chỉ rộng vừa hai vai, và bạn nghe được tiếng thở của người đối diện suốt mười bước. Underboss không vui, nhưng cũng không có gì để trách.',
        'The two lines pass each other without looking back. The bridge is barely two shoulders wide, and you hear the breathing of the person opposite for ten steps. The Underboss is not pleased, but has nothing to blame you for.',
        { rep: 6, network: 6, sanity: -3 }),
      fg('Lén đổi chỗ để người Underboss cần được thoát trước', 'Quietly reorder the line so the one the Underboss wants goes first', [
        [55, 'Người cần thoát qua cầu trước khi Middle nhận ra. Underboss nhớ bạn là người biết đọc ý ông, và Middle ghi tên bạn vào một chỗ khác.', 'The one who matters crosses before the Middle notices. The Underboss remembers you as someone who reads his mind, and the Middle write your name somewhere else.', { rep: 9, network: 3, heat: 6 }, { flagsAdd: ['thumb_middle_grudge'] }],
        [45, 'Middle nhận ra ngay và đóng cầu. Hai đầu cầu chĩa súng vào nhau trong mười phút, và bạn là người đứng giữa.', 'The Middle notice at once and close the bridge. Both ends point guns at each other for ten minutes, and you are standing in the middle.', { health: -10, sanity: -8, rep: -4 }]
      ]),
      fc('Từ chối đi, nói bạn không đủ cấp để làm đại diện', 'Refuse to go, saying you do not rank enough to represent them',
        'Underboss tìm người khác không chút ngập ngừng. Bạn đứng nhìn từ xa và thấy cả cầu diễn ra yên ổn, khiến lời từ chối của mình nghe như một nỗi sợ.',
        'The Underboss finds someone else without a pause. You watch from a distance as the whole bridge goes smoothly, making your refusal sound like fear.',
        { rep: -6, sanity: 2 })
    ], { age: [24, 90] }),

  fe('thumb_bar_protection', T, [0, 2],
    '[Quán bar không chịu nộp] Chủ một quán bar ở District 8 từ chối khoản bảo kê, vì đã nộp cho một băng khác. Cô gái hát ở đó là con gái ông, và cô đã nhìn bạn từ sau quầy cả buổi tối. Capo cần một lời trả lời trước thứ Sáu.',
    '[The bar that will not pay] The owner of a District 8 bar refuses protection money, having already paid another crew. The girl who sings there is his daughter, and she has watched you from behind the bar all evening. Your Capo needs an answer by Friday.',
    [
      fg('Đập vỡ vài chai và nói rõ luật', 'Smash a few bottles and spell out the rule', [
        [60, 'Chủ quán trả đủ tháng đầu tiên trong lúc tay còn run. Lần sau bạn bước vào, không ai ở quầy nhìn thẳng vào bạn.', 'The owner pays the first month in full with his hands still shaking. The next time you walk in, nobody at the bar looks straight at you.', { wealth: 10, rep: 5, sanity: -6, heat: 5 }],
        [40, 'Băng kia nghe tin và đến trước Capo hai ngày. Bạn bị thương ở hẻm sau quán, và chủ quán vẫn không trả.', 'The other crew hears and arrives two days before the Capo’s men. You are hurt in the alley behind the bar, and the owner still does not pay.', { health: -16, rep: -5, heat: 8 }]
      ]),
      fc('Thương lượng, đề nghị chia đôi với băng kia', 'Negotiate and offer a split with the other crew',
        'Bạn dành cả đêm nói chuyện với ba người đàn ông trong một căn phòng không có cửa sổ. Sáng sau, bạn ra về với một văn bản chia phần và một cái tên mới để ghi vào sổ.',
        'You spend the night talking to three men in a windowless room. In the morning you leave with a split agreement and a new name to enter in the ledger.',
        { wealth: 5, network: 8, rep: 4, sanity: -3 }, { meritAdd: 3 }),
      fc('Báo Capo rằng quán đã có người bảo kê', 'Tell the Capo the bar is already covered',
        'Capo ghi chú, không nhận xét. Hai tuần sau, một nhóm người khác của The Thumb nhận việc này và không hỏi lại bạn gì.',
        'The Capo writes it down without comment. Two weeks later another team from the Thumb takes the job and asks you nothing.',
        { sanity: 3, rep: -3 })
    ]),

  fe('thumb_rat_recruit', T, [1, 3],
    '[Tuyển người từ đám Rat] The Thumb cần thêm Soldato, và Capo giao bạn chọn từ nhóm Rat vừa bị bắt trong một vụ cướp kho. Ba người, một khẩu súng, một khoảng sân. Nghi thức cũ: người nào đứng vững sau khi nhận khẩu súng thì được vào hội. Một trong ba người chưa đủ tuổi.',
    '[Recruiting from the Rats] The Thumb needs more Soldato, and your Capo has you choose from a group of Rats caught in a warehouse raid. Three people, one gun, one courtyard. The old rite: whoever stays steady on receiving the gun may join. One of the three is not yet of age.',
    [
      fc('Làm đúng nghi thức, không ngoại lệ', 'Follow the rite exactly, no exceptions',
        'Hai người đứng vững. Người trẻ nhất vứt súng và khóc, và Capo nói rằng chuyện đó có thể chờ thêm hai năm. Bạn thấy trong mắt đứa trẻ một thứ không muốn gọi tên là nhẹ nhõm.',
        'Two stay steady. The youngest drops the gun and weeps, and the Capo says that can wait two more years. You see something in the child’s eyes that you do not want to call relief.',
        { rep: 6, sanity: -5, network: 4 }),
      fg('Đứng ra bảo lãnh đứa nhỏ, xin cho học việc', 'Vouch for the youngster and ask that they train first', [
        [60, 'Capo cho phép với điều kiện bạn chịu trách nhiệm. Đứa trẻ theo bạn đi học tính sổ và cách đứng ở cửa, và bạn nhận ra mình bắt đầu nói ít đi mỗi khi nó có mặt.', 'The Capo allows it on condition you answer for them. The child follows you to learn bookkeeping and how to stand at a door, and you notice you talk less whenever they are there.', { network: 6, sanity: 4, wealth: -4 }, { flagsAdd: ['thumb_took_ward'] }],
        [40, 'Capo bác đề nghị và ghi vào sổ rằng bạn mềm yếu. Đứa trẻ bị đưa đi nơi khác, và bạn không biết chỗ nào.', 'The Capo rejects the request and writes in the ledger that you are soft. The child is sent somewhere else, and you do not know where.', { rep: -7, sanity: -6 }]
      ]),
      fc('Chọn người đứng vững nhất, bỏ qua hai người kia', 'Choose the steadiest and ignore the other two',
        'Người được chọn nhận khẩu súng như nhận lại một thứ vốn của mình. Hai người kia bị đưa về trại giam, và bạn không hỏi họ đi đâu tiếp.',
        'The chosen one takes the gun as if taking back something that was theirs. The other two are returned to holding, and you do not ask where they go next.',
        { rep: 4, sanity: -6 })
    ], { age: [24, 90] }),

  fe('thumb_nest_debt', T, [0, 3],
    '[Món nợ ở Nest] Một người ở Nest, làm việc cho Wing, nợ The Thumb từ một ván bài hai năm trước. Hắn đã cầm cố cả hợp đồng làm việc để trả. Nếu Thumb đòi, Wing sẽ biết nhân viên của họ chơi bài với băng nhóm, và hắn có thể mất cả chỗ ở. Capo bảo bạn xử.',
    '[Debt in the Nest] A Nest resident who works for a Wing owes the Thumb from a card game two years ago. He has pledged his work contract to pay. If the Thumb collects, the Wing will learn its employee gambles with gangs, and he may lose his housing. Your Capo tells you to deal with it.',
    [
      fc('Đòi nợ đúng hạn, báo luôn với Wing', 'Collect on time and tell the Wing as well',
        'Wing cắt hợp đồng của hắn trong một tuần, và Thumb nhận khoản nợ từ tiền thanh lý. Capo ghi nhận bạn làm việc sạch. Bạn nghe đồn hắn dọn khỏi Nest vào một buổi sáng mưa.',
        'The Wing cuts his contract within a week, and the Thumb receives the debt from the liquidation. Your Capo notes you work cleanly. You hear he moved out of the Nest on a rainy morning.',
        { wealth: 12, rep: 5, sanity: -7, heat: 3 }),
      fg('Đề nghị hắn làm tai mắt cho Thumb trong Wing để trừ nợ', 'Offer to cancel the debt if he becomes the Thumb’s eyes in the Wing', [
        [60, 'Hắn nhận. Tháng sau bạn có một bản chép lịch vận chuyển hàng của Wing, và Capo bắt đầu gọi bạn bằng tên thay vì cấp bậc.', 'He accepts. The next month you hold a copy of the Wing’s shipping schedule, and your Capo starts calling you by name instead of rank.', { network: 9, rep: 6, wealth: 4, heat: 4 }, { flagsAdd: ['thumb_wing_informant'] }],
        [40, 'Hắn báo lại với Wing ngay đêm đó. Một Feather đến tìm bạn vào sáng hôm sau, với hai Fixer đứng ngoài cửa.', 'He reports back to the Wing that same night. A Feather comes to find you the next morning, with two Fixers standing outside the door.', { rep: -6, heat: 12, health: -8 }]
      ]),
      fc('Xóa nợ trong sổ, tự gánh lên mình', 'Wipe the debt in the ledger and shoulder it yourself',
        'Bạn ghi một dòng sai ngày vào sổ và trả khoản đó dần mỗi tháng từ phần của mình. Người ở Nest không bao giờ biết, nhưng thỉnh thoảng bạn thấy hắn ngoài chợ và hắn cúi đầu chào, không rõ vì sao.',
        'You enter a line with a wrong date and pay it off monthly from your own share. The Nest resident never learns, but sometimes you see him at the market and he bows to you, unsure why.',
        { wealth: -12, sanity: 4, network: 3 })
    ]),

  fe('thumb_shooting_range', T, [1, 3],
    '[Trường bắn lúc nửa đêm] Hai Capo cãi nhau về một địa bàn, và Sottocapo cho phép họ giải quyết theo lối cũ: mỗi người chọn một đại diện, đấu ở trường bắn hầm của The Thumb. Capo của bạn chọn bạn, và nói đó là vinh dự. Đối thủ là một Soldato nổi tiếng không bao giờ trượt.',
    '[Range at midnight] Two Capo quarrel over a turf, and the Sottocapo permits them to settle it the old way: each picks a representative, to shoot it out at the Thumb’s cellar range. Your Capo picks you and calls it an honor. The opponent is a Soldato famed for never missing.',
    [
      fg('Nhận lời và bắn thật', 'Accept and shoot for real', [
        [45, 'Bạn thắng sát nút, một viên cách vòng giữa chưa đầy đầu ngón tay. Địa bàn về tay Capo của bạn và tiếng tăm bạn lan xa hơn một mùa.', 'You win by a hair, one round less than a fingertip from the center ring. The turf goes to your Capo, and your name travels farther than a season.', { rep: 12, wealth: 8, network: 4 }],
        [55, 'Đối thủ bắn nhanh hơn bạn một nhịp và chuẩn hơn nửa vòng. Capo của bạn mất địa bàn, và ông nhìn bạn hồi lâu mà không nói gì.', 'The opponent shoots one beat faster and half a ring cleaner. Your Capo loses the turf and looks at you for a long time without saying a word.', { rep: -8, sanity: -5 }]
      ]),
      fc('Đề nghị chia địa bàn thay vì đấu', 'Propose dividing the turf instead of shooting',
        'Hai Capo ngạc nhiên đến mức không phản đối ngay. Sottocapo nhấp một ngụm trà rồi nói đó là cách của người nghĩ xa. Địa bàn chia thành hai phần không đều, nhưng không ai nằm xuống.',
        'Both Capo are so surprised that they do not object at once. The Sottocapo takes a sip of tea and says that is how someone thinking ahead behaves. The turf splits unevenly, but nobody lies down.',
        { rep: 5, network: 7, sanity: 2 }, { meritAdd: 2 }),
      fc('Nhờ Sottocapo cho đổi người đại diện', 'Ask the Sottocapo to let you swap representatives',
        'Sottocapo không đồng ý và không giận. Bạn ra khỏi phòng với cảm giác người ta vừa ghi chép lại cách mình từ chối.',
        'The Sottocapo does not agree and is not angry. You leave the room with the feeling that someone has just recorded how you decline.',
        { rep: -5, sanity: -2 })
    ], { age: [24, 90] }),

  fe('thumb_envelope_bullet', T, [0, 3],
    '[Phong bì có một viên đạn] Capo đưa bạn một phong bì dày, bên trong có đúng một viên đạn và một mảnh giấy ghi tên. Theo lệ của The Thumb, đây là lời báo trước cuối cùng, và người đưa phải tận tay đặt vào tay người nhận. Cái tên ấy bạn đã ngồi chung bàn ăn với họ ba lần.',
    '[An envelope with a bullet] Your Capo hands you a thick envelope holding exactly one bullet and a slip with a name. By Thumb custom this is the final warning, and the carrier must place it in the recipient’s own hand. You have sat at the same table with that name three times.',
    [
      fc('Giao tận tay như đúng lệ', 'Deliver it by hand as custom demands',
        'Người nhận mở phong bì ngay trước mặt bạn, nhìn viên đạn một lúc, rồi cất vào túi áo như một cái khuy. Họ cám ơn bạn đã đến tận nơi. Bạn không đáp lại lời đó.',
        'The recipient opens the envelope right in front of you, looks at the bullet a moment, then tucks it into a coat pocket like a button. They thank you for coming in person.',
        { rep: 5, sanity: -9, network: -3 }),
      fg('Báo trước vài ngày để họ kịp đi', 'Give them a few days’ warning to get away', [
        [55, 'Người nhận biến mất đêm đó. Capo chỉ ghi rằng phong bì đến muộn, và bạn không bị hỏi thêm. Một tháng sau bạn nhận được một mảnh giấy không đề tên chỉ có hai chữ cảm ơn.', 'The recipient disappears that night. The Capo notes only that the envelope arrived late, and you are not questioned further. A month later you receive an unsigned slip of paper with two words of thanks.', { sanity: 5, rep: -3, network: 5 }, { flagsAdd: ['thumb_warned_target'] }],
        [45, 'Capo đã cho người canh sẵn. Người nhận bị bắt ngoài cửa nhà ga, và bạn bị gọi lên giải thích vì sao có người biết trước.', 'The Capo already has a man posted. The recipient is caught outside the station, and you are called up to explain why anyone knew in advance.', { rep: -10, sanity: -8, heat: 8 }]
      ]),
      fc('Đưa phong bì cho người khác chuyển giúp', 'Pass the envelope to someone else to carry',
        'Soldato khác nhận việc mà không hỏi lý do. Hôm sau ông ta nhìn bạn khác đi một chút, như thể vừa biết bạn đã không làm nổi một việc đơn giản.',
        'Another Soldato takes the task without asking why. The next day he looks at you a little differently, as though he has just learned you could not manage a simple job.',
        { sanity: -3, rep: -4 })
    ]),

  fe('thumb_turf_redraw', T, [1, 3],
    '[Vẽ lại ranh giới] Sottocapo mở một tấm bản đồ khu phố lên bàn và vẽ lại ranh giới địa bàn bằng bút đỏ. Hai dãy nhà, một trường học và một nhà thờ nhỏ bị khoanh vào phạm vi thu cống nạp mới. Bạn là người phải đến báo cho họ, và mỗi nhà đều có người đã quen mặt bạn.',
    '[Redrawing the lines] The Sottocapo spreads a district map on the table and redraws the turf with a red pencil. Two blocks, a school and a small church are circled into the new tribute zone. You are the one who must tell them, and every household has someone who knows your face.',
    [
      fc('Đến từng nhà báo luật mới, không giấu', 'Go door to door with the new rule, hiding nothing',
        'Bạn đứng trước cánh cửa của thầy giáo, của vị linh mục, của một chủ tiệm bánh, và nói đúng những gì được giao. Không ai cãi. Khi bạn bước ra khỏi nhà cuối, trời đã tối và tay bạn lạnh một cách lạ.',
        'You stand at the teacher’s door, the priest’s, a baker’s, and say exactly what you were given. Nobody argues. When you step out of the last house it is dark and your hands are strangely cold.',
        { rep: 5, wealth: 7, sanity: -8, network: -3 }),
      fg('Xin Sottocapo miễn trường học và nhà thờ', 'Ask the Sottocapo to exempt the school and the church', [
        [50, 'Sottocapo nhìn bạn rất lâu rồi gạch hai chỗ khỏi bản đồ. Ông nói đây là món nợ bạn phải trả bằng một việc khác, và bạn biết việc ấy sẽ không dễ.', 'The Sottocapo looks at you for a long time then crosses two places off the map. He says this is a debt you will repay with another task, and you know that task will not be easy.', { rep: 3, sanity: 6, network: 5 }, { scheduleConsequences: [later('thumb_sottocapo_favor', 2, 'Món nợ đã xin từ Sottocapo', 'The favor owed to the Sottocapo')] }],
        [50, 'Sottocapo cho rằng bạn đang thương hại, và ghi một điểm xấu cạnh tên bạn. Hai chỗ vẫn nằm trong vòng đỏ.', 'The Sottocapo takes it as pity and marks a black point beside your name. Both places stay inside the red circle.', { rep: -8, sanity: -4 }]
      ]),
      fc('Cử người khác đến báo thay mình', 'Send someone else to deliver the news',
        'Bạn nhờ một Soldato mới đi thay. Anh ta nói được hết mọi thứ, vì anh ta không quen ai trong số họ. Bạn ngồi trong quán nghe tiếng chuông nhà thờ vang lên.',
        'You ask a new Soldato to go in your place. He says everything, because he knows none of them. You sit in a bar and listen to the church bell ring.',
        { sanity: 3, rep: -2, network: -4 })
    ], { age: [26, 90] }),

  fe('thumb_mole_hunt', T, [1, 3],
    '[Con chuột trong hội] Ba lần liên tiếp, đường vận chuyển của The Thumb bị chặn đúng lúc. Underboss kết luận có kẻ trong hội bán lịch cho bên ngoài, và nếu không tìm ra, hình phạt sẽ rơi cả lên những người vô can, và giao bạn một danh sách bảy người để theo dõi. Tên thứ năm là người từng cứu mạng bạn.',
    '[The mole] Three times in a row, the Thumb’s shipments have been intercepted at precisely the right moment. The Underboss concludes someone inside is selling the schedule, and that if no one is found the punishment will fall on the blameless too, and gives you a list of seven names to watch. The fifth is the person who once saved your life.',
    [
      fg('Theo dõi cả bảy người đúng quy trình', 'Watch all seven by the book', [
        [55, 'Bạn tìm ra kẻ bán lịch là người thứ bảy, một kế toán nhút nhát luôn đến sớm. Người thứ năm không có gì để giấu, và bạn xin lỗi họ mà không nói vì sao.', 'You find the seller is the seventh, a timid accountant who always arrives early. The fifth has nothing to hide, and you apologize without saying why.', { rep: 9, sanity: -4, network: -2 }, { meritAdd: 4 }],
        [45, 'Bạn theo dõi sai người suốt hai tuần. Một chuyến hàng nữa bị chặn, và Underboss ghi tên bạn vào danh sách thứ hai.', 'You tail the wrong person for two weeks. Another shipment is intercepted, and the Underboss puts your name on the second list.', { rep: -9, sanity: -6, heat: 4 }]
      ]),
      fc('Nói với người thứ năm, nhờ họ tự chứng minh', 'Tell the fifth name and ask them to clear themselves',
        'Người ấy mỉm cười chua chát và đưa bạn toàn bộ sổ chi tiêu của mình. Họ không trách. Một tuần sau họ chỉ ra kẻ đang nói dối trong số sáu người còn lại, trước cả khi bạn tự tìm ra.',
        'The person smiles wryly and hands you their entire household ledger. They do not blame you. A week later they point out who among the other six is lying, before you could find out yourself.',
        { rep: 6, network: 6, sanity: -2 }),
      fc('Trả danh sách, nói bạn không làm việc này', 'Return the list and say you will not do this',
        'Underboss nhận lại danh sách và không hỏi lý do. Ông giao việc cho người khác và từ đó tránh gọi tên bạn khi có việc nhạy cảm.',
        'The Underboss takes the list back and asks no reason. He gives the job to someone else and from then on avoids calling your name for anything sensitive.',
        { sanity: 4, rep: -8, network: -3 })
    ], { age: [26, 90] }),

  fe('thumb_commissary_winter', T, [0, 3],
    '[Mùa đông thiếu than] Mùa đông kéo dài, kho than của The Thumb gần cạn, và Capo ra lệnh chỉ cấp cho thành viên đã đóng đủ cống nạp. Các gia đình trong khu đã đến gõ cửa ba đêm liền. Một cậu bé ôm bó củi ướt, đứng trước bạn và không hỏi gì.',
    '[A winter short of coal] The winter drags on, the Thumb’s coal store is nearly empty, and the Capo orders it issued only to members current on tribute. The families in the district have come knocking three nights running. A boy clutching wet kindling stands in front of you and asks nothing.',
    [
      fc('Làm đúng lệnh, chỉ phát cho người đóng đủ', 'Obey and issue only to those who paid',
        'Bạn lật sổ, tìm từng tên, ghi từng bao. Phần lớn gia đình nhận được phần của mình. Nhà nào không có tên trong sổ thì được dặn đợi tháng sau, và bạn nghe cậu bé đếm bước chân khi quay về.',
        'You turn the pages, find each name, mark each sack. Most families receive their share. Households not in the book are told to wait until next month, and you hear the boy counting his footsteps as he goes home.',
        { rep: 3, sanity: -7, network: -3 }),
      fg('Phát một nửa số than còn lại cho cả khu, ghi vào sổ là hao hụt', 'Hand out half the remaining coal to the whole district, logging it as shrinkage', [
        [60, 'Cả khu nhận được ít nhiều. Capo ghi nhận hao hụt mà không hỏi, và trong thẻ nhớ của khu phố bạn bắt đầu có một tên khác với tên trong sổ The Thumb.', 'The whole district receives something. The Capo notes the shrinkage without asking, and in the district’s memory you begin to carry a different name than the one in the Thumb’s ledger.', { network: 8, sanity: 5, wealth: -6, rep: 3 }],
        [40, 'Có người đếm lại số bao và báo lên Sottocapo. Bạn bị gọi lên giải trình, và khoản hao hụt bị trừ vào lương ba tháng.', 'Someone recounts the sacks and reports upward to the Sottocapo. You are called up to explain, and the shrinkage is deducted from three months’ pay.', { wealth: -14, rep: -6, sanity: -4 }]
      ]),
      fc('Bán số than dư cho một thương nhân Nest', 'Sell the surplus coal to a Nest merchant',
        'Bạn bán số còn lại với giá cao nhất trong cả mùa. Quỹ của Capo dày thêm, và bạn nhận một phần cho mình. Chiều hôm sau cậu bé không ở trước cửa nữa.',
        'You sell what is left at the highest price of the season. The Capo’s fund grows thicker, and you take a cut for yourself. The next afternoon the boy is no longer outside the door.',
        { wealth: 16, rep: 2, sanity: -9, network: -4 })
    ]),

  fe('thumb_rival_dinner', T, [2, 3],
    '[Bữa tối với đối thủ] Một Capo của băng Thumb khác ở District khác mời Underboss của bạn dùng bữa, và ông cử bạn thay mặt. Trên bàn có sáu món, ba loại rượu, và một cái ghế để trống dành cho ai không rõ. Người chủ nhà luôn rót rượu cho cả hai trước khi uống của mình.',
    '[Dinner with a rival] A Capo of another Thumb crew in another District invites your Underboss to dine, and he sends you in his place. The table holds six dishes, three wines, and an empty chair for someone unnamed. The host always pours for both before drinking his own.',
    [
      fg('Uống rượu họ rót, ăn mọi món', 'Drink what is poured and eat every dish', [
        [65, 'Bữa tối kết thúc không một điều bất ngờ. Chủ nhà đưa bạn ra cửa, nói rằng Underboss có người đại diện rất đáng tin, và thả vào túi bạn một phong bì dày.', 'Dinner ends without surprises. The host sees you to the door, says the Underboss has a most dependable representative, and slips a thick envelope into your pocket.', { network: 8, rep: 5, wealth: 8, sanity: -2 }],
        [35, 'Ly rượu thứ hai có vị khác. Bạn tỉnh lại ở nhà khách của Thumb, hai ngày sau, và người ta nói bạn đã ngã xuống từ ghế.', 'The second glass tastes different. You wake in a Thumb guesthouse two days later, and they tell you that you fell out of your chair.', { health: -18, rep: -5, sanity: -6 }]
      ]),
      fc('Từ chối rượu, chỉ uống nước', 'Decline the wine and drink only water',
        'Chủ nhà mỉm cười, đặt ly rượu của mình xuống và uống nước cùng bạn. Cả bữa tối chỉ nói chuyện thời tiết và chợ đen. Khi ra về, bạn không rõ ai vừa thắng.',
        'The host smiles, sets his wine aside, and drinks water with you. All dinner is weather and the black market. When you leave you are not sure who won.',
        { rep: 2, sanity: 2, network: 3 }),
      fg('Hỏi thẳng ai ngồi ghế trống', 'Ask outright who sits in the empty chair', [
        [50, 'Chủ nhà đặt dao xuống. Ông nói đó là chỗ của người đã ngã xuống trong một cuộc xung đột giữa hai băng, và ông chưa quên. Bạn cúi đầu chậm. Từ đó hai băng nhắc tên nhau với một sự trọng thị lạ.', 'The host sets down his knife. He says that is the seat of someone who fell in a clash between the two crews, and he has not forgotten. You nod slowly. From then on the two crews speak each other’s names with an odd respect.', { rep: 8, network: 5, sanity: -3 }],
        [50, 'Câu hỏi bị coi là bất kính. Bữa tối kết thúc ngay sau đó, và Underboss nghe được toàn bộ câu chuyện trước khi bạn về đến nhà.', 'The question is taken as disrespect. Dinner ends right after, and the Underboss hears the whole tale before you reach home.', { rep: -8, network: -4, sanity: -3 }]
      ])
    ], { age: [28, 90] }),

  fe('thumb_sottocapo_favor', T, [1, 3],
    '[Món nợ với Sottocapo] Sottocapo gọi bạn vào phòng làm việc, nơi chỉ có một chiếc đèn và một cái ghế. Ông nhắc lại việc bạn đã xin ông ngày trước, và nói đã đến lúc trả. Việc ông cần không nằm trong sổ của The Thumb: một người ông muốn tìm mà không ai được biết ông đang tìm.',
    '[The favor owed] The Sottocapo calls you into an office with one lamp and one chair. He reminds you of what you asked of him once, and says it is time to repay. What he needs is in no Thumb ledger: a person he wants found without anyone knowing he is looking.',
    [
      fg('Nhận việc, đi tìm một mình', 'Take the task and search alone', [
        [60, 'Bạn mất ba tuần, hai đôi giày, và một người quen cũ. Người cần tìm là con của Sottocapo, bỏ nhà đi từ nhiều năm. Ông nhìn ảnh cậu rất lâu rồi cất vào ngăn kéo.', 'It takes three weeks, two pairs of shoes, and one old acquaintance. The person you find is the Sottocapo’s own child, who left home years ago. He looks at the photograph for a long time, then puts it in a drawer.', { rep: 8, network: 6, sanity: -3, wealth: 6 }],
        [40, 'Người cần tìm đã chết hai năm trước, ở một nhà tế bần mà không ai ghi tên. Bạn phải tự quyết định nói sự thật hay một nửa sự thật.', 'The person you seek died two years ago at an almshouse nobody wrote down. You must decide whether to tell the truth or half of it.', { sanity: -9, rep: 4 }, { flagsAdd: ['thumb_knew_the_dead'] }]
      ]),
      fc('Nhờ người khác trong hội giúp tìm', 'Ask others in the crew to help look',
        'Tin lan nhanh hơn bạn nghĩ. Hai ngày sau Sottocapo biết toàn hội đã nghe, và ông ghi một dấu nhỏ cạnh tên bạn. Việc vẫn xong, nhưng không còn là bí mật.',
        'The word spreads faster than you expect. Two days later the Sottocapo knows the whole crew has heard, and he makes a small mark beside your name. The task still gets done, but it is no longer a secret.',
        { rep: -3, network: 4, sanity: -2 }),
      fc('Từ chối, nói món nợ ấy đã được trả bằng một việc khác', 'Refuse, saying the debt was repaid with something else',
        'Sottocapo im lặng, rồi nói bạn có thể ra. Từ hôm ấy ông gọi bạn bằng họ thay vì tên.',
        'The Sottocapo is silent, then says you may go. From that day he calls you by surname instead of first name.',
        { rep: -10, sanity: 4, network: -5 })
    ], { causal: true, age: [22, 90], requires: [] }),

  // ------------------------------------------------------------------ stories
  fe('thumb_soldato_mentor', T, [0, 2],
    '[Người dạy nghi thức] Một Soldato già nhất hội được giao dạy bạn cách đứng, cách rót rượu, cách chào Capo, và cách không nhìn thẳng vào Underboss. Ông nói mỗi quy tắc đều có một người chết đứng sau. Ông không bao giờ kể người đó là ai.',
    '[The etiquette teacher] The oldest Soldato in the crew is assigned to teach you how to stand, how to pour wine, how to greet a Capo, and how not to look straight at the Underboss. He says each rule has a dead person behind it. He never says who.',
    [
      fc('Học thật kỹ, hỏi ông về những người đã chết', 'Study hard and ask about the dead behind each rule',
        'Mỗi buổi chiều bạn hỏi thêm một câu, và ông trả lời một nửa. Sau một năm bạn có một cuốn sổ ghi các quy tắc cùng những tên người ông chịu nhắc. Cuốn sổ ấy dày hơn bạn nghĩ.',
        'Each afternoon you ask one more question and he answers half. After a year you have a notebook of rules with the names he agreed to mention. It is thicker than you expected.',
        { rep: 4, sanity: -2, network: 5 }, { flagsAdd: ['thumb_has_mentor'] }),
      fc('Học đúng những gì cần thiết, không hơn', 'Learn only what is needed and no more',
        'Bạn thuộc nghi thức đủ để không bị phạt trong buổi họp. Ông già gật đầu, nhưng không dạy thêm gì ngoài buổi cuối.',
        'You learn the etiquette well enough not to be fined at meetings. The old man nods, but teaches nothing beyond that last session.',
        { rep: 2, sanity: 2 }),
      fc('Cãi lại một quy tắc, hỏi tại sao phải tuân theo', 'Argue with a rule and ask why it must be obeyed',
        'Ông nhìn bạn và kể một chuyện duy nhất: về một Soldato từng cãi đúng quy tắc ấy. Ông không kể kết thúc, và bạn không dám hỏi.',
        'He looks at you and tells exactly one story: about a Soldato who once argued with that very rule. He does not tell the ending, and you do not dare ask.',
        { sanity: -4, rep: 1, network: 2 })
    ], { age: [18, 60], weight: 11 }),

  fe('thumb_capo_retirement', T, [1, 3],
    '[Capo về hưu] Capo của bạn sắp về hưu sau ba mươi năm, và ông mời cả hội ăn một bữa tối cuối. Theo lệ, người sắp về hưu được chọn một người kế nhiệm, nhưng quyết định cuối cùng vẫn thuộc về Sottocapo. Ông đưa mắt nhìn bạn đúng một lần, rất nhanh.',
    '[The Capo retires] Your Capo is retiring after thirty years, and invites the whole crew to a last dinner. By custom the retiree names a successor, though the Sottocapo has the final say. He lets his eyes rest on you exactly once, very briefly.',
    [
      fg('Đề nghị phụ giúp ông trong thời gian chuyển giao', 'Offer to assist him through the handover', [
        [60, 'Ông nhận lời, và suốt mùa ấy bạn học cách đọc sổ của cả khu. Khi ông ra đi, Sottocapo ghi tên bạn vào danh sách đề cử.', 'He accepts, and all season you learn to read the ledger of the whole district. When he leaves, the Sottocapo puts your name on the nomination list.', { rep: 8, network: 8, sanity: -3 }, { meritAdd: 5 }],
        [40, 'Một Soldato khác nghe lời ấy và cũng đề nghị. Hai người phải đua nhau trong ba tháng, và người thua rút lui trong im lặng nặng nề.', 'Another Soldato hears and makes the same offer. The two of you race for three months, and the loser withdraws in a heavy silence.', { rep: 2, sanity: -6, network: -3 }]
      ]),
      fc('Chúc ông an hưởng tuổi già và không xin gì', 'Wish him a peaceful retirement and ask for nothing',
        'Capo ngạc nhiên rồi mỉm cười, và đặt tay lên vai bạn. Người kế nhiệm là ai thì bạn biết khi mọi người khác đã biết, nhưng ông gửi cho bạn một cây bút máy cũ vào mùa đông.',
        'The Capo is surprised, then smiles, and rests a hand on your shoulder. You learn the successor’s name when everyone else does, but he sends you an old fountain pen in winter.',
        { sanity: 4, network: 4, rep: 1 }),
      fc('Tố cáo một sai sót trong sổ của ông trước bữa tiệc', 'Report an error in his ledger before the dinner',
        'Sottocapo cảm ơn bạn đã báo và ghi lại. Capo biết ngay là ai. Bữa tiệc vẫn diễn ra, nhưng ông không còn đưa mắt nhìn bạn lần nào.',
        'The Sottocapo thanks you for reporting and writes it down. The Capo knows at once who. The dinner goes on, but he never glances your way again.',
        { rep: 4, network: -7, sanity: -6 })
    ], { age: [26, 90] }),

  fe('thumb_widow_of_fallen', T, [0, 3],
    '[Góa phụ của người ngã xuống] Một Soldato chết trong cuộc đấu súng tuần trước, và theo lệ, người thân của ông nhận một khoản tiền tuất từ quỹ The Thumb. Quỹ chưa nhận đủ tháng này. Bạn được giao mang số tiền cuối cùng đến nhà bà, và bà đã nấu cho bạn một bữa ăn trước khi bạn kịp nói.',
    '[The widow of the fallen] A Soldato died in last week’s gunfight, and by custom his wife receives a pension from the Thumb’s fund. The fund has not collected enough this month. You are sent with the last envelope to her door, and she has already cooked a meal for you before you can speak.',
    [
      fc('Đưa đủ số tiền, tự bù chỗ thiếu', 'Give the full sum, covering the shortfall yourself',
        'Bạn đưa phong bì mà không nói gì về số thiếu. Bà đặt bát cơm trước mặt bạn và ngồi nhìn bạn ăn. Khi bạn ra về, bà cúi chào, rất thấp, như chào một người trong gia đình.',
        'You hand over the envelope and say nothing about the shortfall. She sets a bowl of rice before you and watches you eat. As you leave, she bows very low, as she would to family.',
        { wealth: -11, sanity: 6, network: 5, rep: 2 }, { flagsAdd: ['thumb_widow_kin'] }),
      fc('Đưa phần có, nói thật là quỹ còn thiếu', 'Give what you have and say plainly the fund is short',
        'Bà gật đầu, như đã đoán. Bữa cơm vẫn được dọn, nhưng không có tiếng nói chuyện. Về đến nhà bạn nhận ra mình đã không tìm được câu nào đáng nói.',
        'She nods as if she had guessed. The meal is still served, but without conversation. By the time you reach home you realize you could not find a single sentence worth saying.',
        { sanity: -6, rep: 1 }),
      fg('Xin Sottocapo bổ sung quỹ ngay trong tuần', 'Press the Sottocapo to top up the fund this week', [
        [55, 'Sottocapo bực nhưng ký, và khoản bổ sung đến vào thứ Năm. Quỹ giữ danh tiếng, và bạn nghe bà góa được người trong hội kính trọng nhiều hơn mọi lần.', 'The Sottocapo is irritated but signs, and the top-up arrives on Thursday. The fund keeps its name, and you hear the widow is respected by the crew more than ever.', { rep: 7, network: 5, sanity: 3 }],
        [45, 'Sottocapo trả lời rằng quỹ không phải việc của Soldato, và ghi cho bạn một dòng cảnh cáo.', 'The Sottocapo answers that the fund is no concern of a Soldato, and writes you a line of warning.', { rep: -7, sanity: -5 }]
      ])
    ]),

  fe('thumb_daughter_match', T, [2, 3],
    '[Hôn sự cho con gái] Underboss muốn gả con gái cho con trai một Capo ở District khác để củng cố liên minh. Cô gái đã đến tìm bạn, không nói gì về hôn sự, chỉ hỏi bạn từng thấy ai thoát khỏi The Thumb mà không chết chưa. Bạn biết nghe câu ấy là đã vượt quá lệ.',
    '[A daughter’s match] The Underboss wants to marry his daughter to a Capo’s son in another District to cement an alliance. The girl has come to you, saying nothing about the match, only asking whether you have ever seen anyone leave the Thumb without dying. You know that hearing the question already oversteps custom.',
    [
      fc('Nói thật, rằng có và không nhiều', 'Answer truthfully: yes, and not many',
        'Bạn kể về một người đã ra đi và được tiễn bằng một lễ chào. Cô cúi đầu, cảm ơn, và không nói gì thêm. Một tháng sau cô gửi cho bạn một con dao nhỏ có khắc tên mình, không kèm lời nhắn.',
        'You tell of one who left and was sent off with a salute. She nods, thanks you, and says nothing more. A month later she sends you a small knife with her name engraved, no note attached.',
        { sanity: -3, network: 6, rep: 1 }, { flagsAdd: ['thumb_daughter_confidant'] }),
      fg('Báo cho Underboss về câu hỏi của cô', 'Tell the Underboss about her question', [
        [50, 'Underboss cảm ơn bạn đã trung thành và thưởng một khoản. Cô gái không bao giờ nhìn bạn nữa, và hôn sự vẫn được tổ chức đúng ngày.', 'The Underboss thanks you for loyalty and rewards you. The girl never looks at you again, and the wedding takes place on schedule.', { wealth: 10, rep: 7, sanity: -9 }],
        [50, 'Underboss lặng đi một lúc, rồi nói ông đã biết. Ông không nói biết từ khi nào. Bạn ra khỏi phòng với cảm giác vừa bị thử.', 'The Underboss is silent for a long time, then says he already knew. He does not say since when. You leave the room feeling you have just been tested.', { rep: 3, sanity: -6, network: -3 }]
      ]),
      fc('Nói rằng việc này không phải việc của bạn', 'Say this is not your business',
        'Cô gật đầu một cách bình thản. Hôn sự diễn ra, và cô đứng giữa hai gia đình mà không nhìn đâu cả. Bạn đứng ở hàng sau và không tìm được lý do để rời mắt khỏi sàn.',
        'She nods calmly. The wedding takes place, and she stands between two families looking nowhere. You stand in the back row and cannot find a reason to lift your eyes from the floor.',
        { sanity: -5, rep: 1 })
    ], { age: [28, 90] }),

  fe('thumb_old_blood', T, [2, 3],
    '[Máu cũ trên sổ nợ] Khi dọn kho hồ sơ của một Capo đã khuất, bạn tìm thấy một cuốn sổ kẹp giữa hai tấm ván. Bên trong là danh sách những khoản tiền mà The Thumb nhận từ một Wing suốt mười lăm năm qua, và một cột bên cạnh ghi tên những người đã chết để giữ cho khoản ấy tiếp tục.',
    '[Old blood in the ledger] While clearing a dead Capo’s archive, you find a notebook wedged between two boards. It lists sums the Thumb has taken from a Wing for fifteen years, and a column beside it names the dead who kept the payments flowing.',
    [
      fg('Đưa cuốn sổ lên Underboss', 'Bring the ledger to the Underboss', [
        [50, 'Underboss đọc rất lâu, cất vào két, rồi nói bạn đã làm đúng. Ba tuần sau, hai Capo biến khỏi danh sách và bạn được tặng một chiếc đồng hồ vàng.', 'The Underboss reads for a long time, locks it in a safe, and says you did right. Three weeks later two Capo vanish from the roster and you are given a gold watch.', { rep: 10, wealth: 8, sanity: -6, network: -3 }],
        [50, 'Underboss đã biết nội dung cuốn sổ từ lâu. Ông không giận, nhưng từ đó bạn là người biết quá nhiều, và những cánh cửa quanh bạn bắt đầu đóng chậm hơn bình thường.', 'The Underboss has known its contents for years. He is not angry, but from then on you are someone who knows too much, and doors around you begin closing a little slower than usual.', { rep: 3, sanity: -9, heat: 8 }]
      ]),
      fc('Đốt cuốn sổ và quên nó', 'Burn the ledger and forget it',
        'Bạn đốt cuốn sổ trong lò sưởi của kho, trang này sang trang khác. Tro rơi vào tấm ván và biến đi trong gió lạnh. Nhiều tuần sau, bạn vẫn nhớ từng cái tên.',
        'You burn the notebook in the archive’s fireplace, page by page. Ash falls onto the boards and disappears in the cold air. Weeks later you still remember every name.',
        { sanity: -7, heat: -3 }),
      fg('Dùng cuốn sổ để tống tiền Wing', 'Use the ledger to squeeze the Wing', [
        [50, 'Wing trả một khoản đủ để bạn sống thoải mái nhiều năm. Một tuần sau, bạn thấy hai Fixer đứng cuối con hẻm ngoài nhà, không làm gì cả.', 'The Wing pays enough to keep you comfortable for years. A week later you see two Fixers at the end of the alley outside your home, doing nothing.', { wealth: 28, heat: 14, sanity: -8, rep: -4 }, { flagsAdd: ['thumb_blackmailed_wing'] }],
        [50, 'Wing gọi bạn đến một cuộc họp ở tầng thượng. Bạn không ra khỏi đó trong bộ dạng như lúc vào.', 'The Wing summons you to a meeting on a roof.', { health: -24, wealth: -10, rep: -8, heat: 10 }]
      ])
    ], { age: [30, 90] })
];

export const THUMB_MINORS = [
  M('m_thumb_cigarette_count', AGE.GROWN, fneed(T, 0),
    '[Điếu thuốc cuối hàng] Một Soldato cùng ca đưa bạn nửa bao thuốc và nói đây là phần thưởng của lần đứng gác tuần trước. Ông không hút nữa vì bác sĩ cấm. Ông hỏi bạn có nhớ lần cuối ông cười không.',
    '[The last cigarette] A Soldato on your shift hands you half a pack and says it is a reward for last week’s watch. He no longer smokes, doctor’s orders. He asks if you remember the last time he laughed.',
    [C('Nói thật là không nhớ', 'Say honestly that you cannot recall', 'Ông gật đầu và rít một hơi thuốc không có đầu lọc. Hai người ngồi nghe tiếng máy phát điện cho đến sáng.', 'He nods and takes a drag on an unfiltered cigarette. The two of you sit listening to the generator until morning.', { sanity: 2, network: 2 }), C('Kể một chuyện cũ để ông cười', 'Tell an old story to make him laugh', 'Ông cười rất khẽ và rất ngắn.', 'He laughs, very quietly and briefly.', { sanity: 4, network: 3 })],
    I('Bạn nhận nửa bao thuốc và cúi đầu.', 'You take the half pack and nod.'), { theme: 'work' }),
  M('m_thumb_boot_polish', AGE.GROWN, fneed(T, 0),
    '[Giày bóng cho buổi họp] Capo nhắc rằng buổi họp tuần sau có Sottocapo, và giày bạn phải sáng hơn mọi lần. Một Soldato đồng cấp chỉ cho bạn cách đánh giày bằng một thìa nước bọt và vải nỉ cũ.',
    '[Shoes for the meeting] The Capo reminds you the Sottocapo attends next week’s meeting, and your shoes must shine more than ever. A peer shows you how to buff them with a spoon of spit and old felt.',
    [C('Học theo, đánh cả đôi giày của người ngồi cạnh', 'Learn it and polish the neighbor’s pair too', 'Người ngồi cạnh nhìn đôi giày sáng của mình. Hôm sau anh ta đưa bạn một điếu xì gà lẻ.', 'The neighbor stares at his gleaming shoes for a long while. The next day he hands you a single cigar.', { network: 3, rep: 1 }), C('Tự lo phần mình, giữ bí quyết', 'Mind your own pair and keep the trick', 'Đôi giày bạn sáng đến mức Sottocapo nhìn xuống lần thứ hai. Không ai biết chuyện nhỏ này đã làm hài lòng ai.', 'Your shoes shine so much that the Sottocapo looks down a second time. Nobody knows whom this small matter pleased.', { rep: 2 })],
    I('Bạn chỉnh lại giày và quên đi.', 'You straighten your shoes and forget it.'), { theme: 'work' }),
  M('m_thumb_ledger_typo', AGE.GROWN, fneed(T, 0),
    '[Con số lệch một chữ số] Bạn nhận ra sổ cống nạp tháng này có một con số bị ghi lệch một chữ số, và chữ số ấy có lợi cho một Capo cụ thể. Có thể chỉ là lỗi tay. Cũng có thể không.',
    '[One digit off] You notice this month’s tribute ledger has a figure written one digit off, and the digit favors a specific Capo. It could be a slip of the pen. It could also not be.',
    [C('Sửa lại im lặng, không báo ai', 'Fix it quietly and tell no one', 'Con số được sửa và sổ cân lại. Không ai hỏi, và bạn tự hỏi mình có vừa tha một tội hay chỉ gạt đi một lời nhắc.', 'The figure is corrected and the ledger balances. Nobody asks, and you wonder if you just spared an offense or only brushed away a warning.', { sanity: -1, network: 2 }), C('Báo lên Sottocapo kèm bằng chứng', 'Report it to the Sottocapo with evidence', 'Sottocapo ghi nhận và nhờ bạn không nói với ai. Một tháng sau, người Capo ấy được chuyển sang khu khác.', 'The Sottocapo acknowledges it and asks you to tell no one. A month later that Capo is moved to another district.', { rep: 4, network: -3 })],
    I('Bạn đóng sổ và không nghĩ thêm.', 'You close the book and think no more.'), { theme: 'work' }),
  M('m_thumb_stray_dog', AGE.GROWN, fneed(T, 0),
    '[Con chó ở kho đạn] Một con chó hoang bắt đầu ngủ trước cửa kho đạn, và Capo nói nếu nó còn ở đó sau thứ Sáu thì bạn phải xử lý. Con chó nhận ra bạn sau hai ngày và không bao giờ sủa khi bạn đến.',
    '[The dog at the armory] A stray starts sleeping outside the armory door, and the Capo says if it is still there after Friday you must deal with it. The dog knows you by the second day and never barks when you come.',
    [C('Mang nó về nhà', 'Take it home', 'Con chó đi cạnh bạn qua hai con phố mà không cần dây. Nó ngủ dưới giường và thức mỗi khi có ai bước qua cửa.', 'The dog walks beside you through two streets with no leash. It sleeps under your bed and wakes whenever anyone passes the door.', { sanity: 4, wealth: -2 }), C('Cho nó ăn, để nó ở lại', 'Feed it and let it stay', 'Capo không nhắc lại chuyện đó. Con chó ở lại, và cả hội dần quen đến mức ghi tên nó vào bảng trực.', 'The Capo never mentions it again. The dog stays, and the crew grows so used to it that they pencil its name on the duty board.', { sanity: 2, network: 3 })],
    I('Bạn đi qua con chó và không nhìn.', 'You pass the dog without looking.'), { theme: 'work' }),
  M('m_thumb_pistol_clean', AGE.GROWN, fneed(T, 0),
    '[Lau súng đêm khuya] Bạn lau súng lúc hai giờ sáng như mọi lần, và nhận ra đã gần một năm bạn chưa bắn ai. Cũng không rõ đó là điều tốt hay xấu cho một người ở vị trí này.',
    '[Cleaning the pistol at night] You clean your pistol at two in the morning as always, and realize it has been nearly a year since you shot anyone. It is not clear whether that is good or bad for someone in your position.',
    [C('Tập bắn thêm một buổi cho khỏi rỉ', 'Do another practice session to keep sharp', 'Bạn bắn mười hai viên vào bia ở trường bắn. Tay bạn không run, và đó là điều làm bạn ngồi nhìn bàn tay hồi lâu.', 'You fire twelve rounds at the range target. Your hand does not shake, and that is what makes you sit looking at your hand for a long while.', { sanity: -3, rep: 1 }), C('Cất súng vào ngăn kéo, ngủ sớm', 'Put the pistol in the drawer and sleep early', 'Giấc ngủ đến nhanh hơn thường lệ. Sáng hôm sau trời nắng, và bạn thấy lạ vì mình nhớ đã nhìn thấy nắng.', 'Sleep comes faster than usual. The morning is sunny, and you find it strange that you noticed the sun at all.', { sanity: 4 })],
    I('Bạn lau súng xong và đi ngủ.', 'You finish cleaning and go to bed.'), { theme: 'work' }),
  M('m_thumb_soldato_birthday', AGE.GROWN, fneed(T, 0),
    '[Sinh nhật một Soldato] Một Soldato trong tổ bạn tròn bốn mươi, ngày mà người ta nói ai sống qua cũng đáng ăn mừng. Capo cho phép một bữa nhỏ trong kho đạn. Ông ta chỉ nhờ bạn một việc: đừng gọi ông bằng cấp bậc trong bữa ấy.',
    '[A Soldato’s birthday] A Soldato in your team turns forty, the age people say anyone who survives to deserves a toast. The Capo allows a small meal in the armory. He asks you one favor: do not call him by rank during it.',
    [C('Gọi ông bằng tên thật suốt buổi', 'Use his real name all evening', 'Ông ngạc nhiên rồi cười, và nói đã mười năm rồi không ai gọi tên mình. Bạn nhớ cái tên ấy đến tận ngày ông ngã xuống.', 'He is startled, then laughs, and says no one has used his name in ten years. You remember that name until the day he falls.', { sanity: 4, network: 6 }), C('Giữ cấp bậc, nâng ly theo nghi thức', 'Keep to rank and toast by the book', 'Bữa tiệc diễn ra gọn gàng và khô khan. Ông ta nâng ly cám ơn, nhưng không ăn thêm gì sau đó.', 'The party goes by neat and dry. He raises a glass in thanks, but eats nothing more after that.', { rep: 1, sanity: -2 })],
    I('Bạn gửi một lời chúc và quay lại ca trực.', 'You send a greeting and return to your shift.'), { theme: 'work' }),
  M('m_thumb_rain_collection', AGE.GROWN, fneed(T, 0),
    '[Đi thu dưới mưa] Cơn mưa kéo dài ba ngày và không có chủ sạp nào ra ngoài. Capo bảo bạn vẫn đi thu, vì cống nạp không ngừng vì thời tiết. Mỗi cửa bạn gõ đều mở sau một nhịp lâu hơn thường lệ.',
    '[Collecting in the rain] Rain lasts three days and no stall owner goes out. The Capo tells you to collect anyway, because tribute does not pause for weather. Each door you knock on opens a beat slower than usual.',
    [C('Thu vào ngày mưa như lệnh', 'Collect as ordered', 'Bạn ướt từ đầu đến chân và có đủ cả mười một phong bì. Capo đưa bạn một chiếc khăn khô mà không nói gì.', 'You are soaked to the bone and carry all eleven envelopes. The Capo hands you a dry towel without a word.', { rep: 2, health: -3 }), C('Hoãn đến khi tạnh, tự nhận trách nhiệm', 'Delay until it clears and take the blame', 'Hai ngày sau bạn thu đủ, và Capo chỉ ghi một dòng chậm trễ. Chủ sạp để lại cho bạn một cốc trà nóng ở nơi bạn không thể không thấy.', 'Two days later you collect in full, and the Capo writes only a line about the delay. The stall owners leave a hot cup of tea where you cannot miss it.', { wealth: -2, network: 3, sanity: 2 })],
    I('Bạn đứng trú ở hiên một quán và đếm giọt nước.', 'You shelter under a tavern awning and count raindrops.'), { theme: 'work' }),
  M('m_thumb_gun_oil', AGE.GROWN, fneed(T, 0),
    '[Dầu súng hết] Kho hết dầu bảo quản súng, và Capo nhờ bạn kiếm thêm từ chợ đen mà không để lộ. Người bán ở chợ nhìn bạn rất lâu rồi nói giá gấp ba, vì ông đã biết bạn đến từ đâu.',
    '[Out of gun oil] The armory is out of oil for the guns, and the Capo asks you to fetch more from the black market without being traced. The seller looks at you for a long time and names triple the price, because he already knows where you are from.',
    [C('Trả giá gấp ba', 'Pay triple', 'Bạn trả đủ và mang về mười lọ dầu. Capo ghi hóa đơn và nói bạn nên học cách trả giá. Bạn chỉ gật đầu.', 'You pay and bring back ten jars. The Capo files the receipt and says you should learn to bargain. You only nod.', { wealth: -8, rep: 1 }), C('Mặc cả, nhắc ông rằng Thumb mua mỗi tháng', 'Bargain and remind him the Thumb buys every month', 'Ông nhượng bộ đúng một nửa. Cả hai đều biết ông còn lời, nhưng không ai chịu nhắc.', 'He concedes exactly half. Both know he still profits, but neither mentions it.', { wealth: -4, network: 3 })],
    I('Bạn ghi vào sổ rằng dầu hết và để Capo lo.', 'You note that the oil is gone and leave it for the Capo.'), { theme: 'work' }),
  M('m_thumb_tongue_slip', AGE.GROWN, fneed(T, 0),
    '[Lỡ miệng trong buổi họp] Bạn lỡ gọi một Capo bằng tên riêng trong một buổi họp có Sottocapo. Không ai cười, không ai nói gì, nhưng bạn nhận ra mười người đều đã ghi nhớ khoảnh khắc ấy.',
    '[A slip of the tongue] In a meeting with the Sottocapo present, you call a Capo by his first name. Nobody laughs, nobody speaks, but you realize ten people have just committed the moment to memory.',
    [C('Xin lỗi trước toàn thể, đúng nghi thức', 'Apologize before everyone, by the book', 'Capo gật đầu, buổi họp tiếp tục, và một trong số họ để lại cho bạn một mẩu giấy ghi một câu tục ngữ cũ. Bạn hiểu mình vừa được tha.', 'The Capo nods, the meeting goes on, and one of them leaves you a slip of paper with an old proverb. You understand you have just been forgiven.', { rep: -1, sanity: 2 }), C('Giữ im lặng, không xin lỗi', 'Stay silent and do not apologize', 'Không ai nhắc. Nhưng ba tuần liền bạn không được mời vào các buổi họp nhỏ, và bạn đoán đó là cái giá.', 'Nobody mentions it. But for three weeks you are not invited to small meetings, and you guess that is the price.', { rep: -4, sanity: -2 })],
    I('Bạn cúi đầu và tránh nhìn ai.', 'You bow your head and avoid every eye.'), { theme: 'work' }),
  M('m_thumb_letter_home', AGE.GROWN, fneed(T, 0),
    '[Thư gửi về nhà] Bạn viết một lá thư cho người thân đã lâu không gặp, và nhận ra mình không có chuyện gì nói được thật. Mỗi câu bạn viết đều bị gạch, vì nó nghe như điều bạn không được phép nói.',
    '[A letter home] You write a letter to a relative you have not seen in ages, and realize you have nothing true to say. Each sentence you write is crossed out because it sounds like something you are not permitted to say.',
    [C('Gửi lá thư ngắn nhất có thể', 'Send the shortest letter possible', 'Bạn gửi ba dòng và một chút tiền. Một tháng sau nhận được hồi âm cũng ba dòng. Hai bên giữ nhau như hai sợi dây buộc lỏng.', 'You send three lines and some money. A month later you receive an answer, also three lines. The two of you hold on like loosely tied cords.', { wealth: -3, sanity: 2 }), C('Xé lá thư và không viết nữa', 'Tear it up and write no more', 'Bạn ngồi nhìn những mảnh giấy trong thùng rác. Có một câu chưa bị gạch, và bạn không nhặt nó lên.', 'You sit looking at the scraps in the bin. One sentence was never crossed out, and you do not pick it up.', { sanity: -4 })],
    I('Bạn đặt bút xuống và nhìn ra cửa sổ.', 'You set the pen down and look out the window.'), { theme: 'work' }),
  M('m_thumb_new_vest', AGE.GROWN, fneed(T, 1),
    '[Chiếc áo vest mới] Sottocapo tặng mỗi Capo một chiếc áo vest may đo vào dịp cuối năm. Bạn mặc thử và thấy nó vừa một cách đáng ngờ, như thể có ai đã đo bạn từ lâu mà bạn không biết.',
    '[A new vest] The Sottocapo gives each Capo a tailored vest at year end. You try it on and find it fits suspiciously well, as if someone measured you long ago without your knowing.',
    [C('Hỏi thợ may ai đã đo', 'Ask the tailor who took your measurements', 'Thợ may cười và nói ông chỉ làm theo bản số liệu của hội.', 'The tailor laughs and says he only follows the crew’s measurement sheet.', { sanity: -3, network: 2 }), C('Mặc nó đi họp, không nói gì', 'Wear it to the meeting and say nothing', 'Mọi người đều nhìn chiếc áo trước khi nhìn bạn. Bạn bắt đầu hiểu một chiếc áo vest có thể là một lời nhắc rất lịch sự.', 'Everyone looks at the vest before they look at you. You begin to understand that a vest can be a very polite reminder.', { rep: 3, sanity: -1 })],
    I('Bạn treo chiếc áo vào tủ và để đó.', 'You hang the vest in the closet and leave it there.'), { theme: 'work' }),
  M('m_thumb_alley_cat', AGE.GROWN, fneed(T, 0),
    '[Con mèo đường hẻm] Một đứa trẻ bán diêm cứ đứng ở cuối hẻm khi bạn đi thu cống nạp. Nó không xin gì, chỉ đếm bước chân. Hôm nay nó hỏi bạn có phải người làm cho The Thumb không, và liệu mẹ nó có phải đóng tiền hay không.',
    '[The child at the alley end] A matchbox seller keeps standing at the end of the alley when you collect tribute. It asks nothing, only counts your steps. Today it asks whether you work for the Thumb, and whether its mother must pay.',
    [C('Nói thật, mẹ nó có phải đóng', 'Answer truthfully: its mother must pay', 'Đứa trẻ cúi đầu rất chậm, rồi chạy mất. Hôm sau mẹ nó đứng đợi bạn với phong bì đã sẵn, và tay bà không run.', 'The child nods slowly, then runs. The next day its mother waits with the envelope ready, and her hand does not shake.', { sanity: -3, rep: 1 }), C('Nói bạn sẽ hỏi lại Capo', 'Say you will ask the Capo again', 'Đứa trẻ nhìn bạn rồi cười, như đã nghe câu này nhiều lần. Bạn hỏi Capo, và câu trả lời vẫn như cũ.', 'The child looks at you then smiles, as if it has heard this answer many times. You ask the Capo, and the answer stays the same.', { sanity: -2, network: 2 })],
    I('Bạn mỉm cười mệt mỏi và bước tiếp.', 'You smile wearily and walk on.'), { theme: 'work' }),
  M('m_thumb_new_recruit_nerves', AGE.GROWN, fneed(T, 0),
    '[Người mới run tay] Một tân binh được xếp vào tổ bạn run đến mức đánh rơi băng đạn hai lần trong một ngày. Capo bảo bạn làm gì tùy ý, miễn trong tuần sau cậu ta không làm hỏng việc.',
    '[The recruit’s shaking hands] A new recruit assigned to your team shakes so badly he drops his magazine twice in one day. The Capo tells you do whatever you like so long as he does not ruin anything next week.',
    [C('Ngồi cùng cậu ấy một buổi tối, kể cách bạn từng run', 'Sit with him one evening and tell how you once shook', 'Cậu ta nghe xong lặng đi một lúc. Ngày hôm sau bàn tay vẫn run, nhưng ít hơn một chút, và cậu ta cảm ơn bạn bằng một chai nước.', 'He listens in silence for a long time. The next day his hands still shake, but a little less, and he thanks you with a bottle of water.', { sanity: 2, network: 4 }), C('Cho cậu ấy ca đêm đứng một mình', 'Give him a night shift standing alone', 'Cậu ta đứng suốt đêm và đến sáng vẫn nguyên vẹn. Có lẽ đây là bài học, có lẽ không.', 'He stands all night and is still in one piece at dawn. Maybe it was a lesson, maybe not.', { rep: 2, network: -2 })],
    I('Bạn bảo cậu ta tự lo và quay đi.', 'You tell him to sort himself out and turn away.'), { theme: 'work' }),
  M('m_thumb_coin_flip', AGE.GROWN, fneed(T, 1),
    '[Đồng xu quyết định] Hai Soldato trong tổ cãi nhau về ai được ca đêm, và không ai chịu nhường. Cả hai đề nghị tung đồng xu, và đưa đồng xu cho bạn, vì chỉ bạn là người họ không nghi ngờ.',
    '[The coin that decides] Two Soldato on your team argue about who gets the night shift, and neither will yield. Both offer a coin flip, and hand the coin to you, since you are the only one neither suspects.',
    [C('Tung đồng xu, chấp nhận kết quả', 'Flip the coin and accept the result', 'Đồng xu rơi xuống bàn, nảy hai lần, và nằm yên. Người thua nhún vai. Người thắng gật đầu, và cả hai đều không nhìn bạn trong ba ngày.', 'The coin hits the table, bounces twice, and lies still. The loser shrugs. The winner nods, and neither looks at you for three days.', { rep: 2, sanity: -1 }), C('Chia ca đêm cho cả hai, mỗi người nửa tuần', 'Split the night shift, half a week each', 'Cả hai đều bất mãn một chút, và vì thế không ai thấy mình bị lừa. Bạn bắt đầu hiểu cách hòa giải thực sự vận hành.', 'Both are a little unhappy, and so neither feels cheated. You start to understand how mediation really works.', { network: 5, rep: 3 })],
    I('Bạn trả lại đồng xu và bước đi.', 'You give back the coin and walk away.'), { theme: 'work' }),
  M('m_thumb_tobacco_tax', AGE.GROWN, fneed(T, 0),
    '[Thuế thuốc lá] Một chủ sạp thuốc lá hỏi vì sao The Thumb tính thuế thuốc cao hơn thuế rượu, vì thuốc không làm ai nổi điên. Ông hỏi một cách rất nghiêm túc, và bạn không có câu trả lời nào ngoài việc đó là lệ.',
    '[The tobacco tax] A tobacco stall owner asks why the Thumb taxes cigarettes higher than liquor, since cigarettes make no one go mad. He asks very seriously, and you have no answer except that it is custom.',
    [C('Nói thật rằng bạn không biết', 'Say honestly that you do not know', 'Ông gật đầu và trả đủ. Hai người đứng im một lát, rồi ông đưa bạn một gói thuốc mà không tính tiền.', 'He nods and pays in full. The two of you stand silent a moment, then he hands you a pack, free of charge.', { network: 4, sanity: 1 }), C('Hứa hỏi Capo và trả lời lại', 'Promise to ask the Capo and answer later', 'Capo cười lớn rồi bảo bạn đừng bận tâm.', 'The Capo laughs aloud and tells you not to bother.', { sanity: -2, rep: -1 })],
    I('Bạn lấy phong bì và đi.', 'You take the envelope and leave.'), { theme: 'work' }),
  M('m_thumb_stolen_gun', AGE.GROWN, fneed(T, 0),
    '[Khẩu súng bị mất] Súng của một Soldato đồng cấp biến mất khỏi tủ khóa, và hắn nài bạn đừng báo Capo. Hắn nói mình sẽ tự tìm lại trong ba ngày, và đã bắt đầu đổ mồ hôi lạnh từ lúc nào không rõ.',
    '[The missing gun] A peer’s pistol vanishes from the locked cabinet, and he begs you not to tell the Capo. He says he will find it himself in three days, and has already begun to sweat cold without knowing when it started.',
    [C('Giữ kín và giúp hắn tìm', 'Keep quiet and help him look', 'Hai ngày sau bạn tìm thấy khẩu súng trong ngăn tủ của người dọn dẹp. Hắn không biết nói gì và chỉ nắm tay bạn một lúc lâu.', 'Two days later you find the gun in the cleaner’s locker. He does not know what to say and only holds your hand a long while.', { network: 6, sanity: 2 }), C('Báo Capo ngay, đúng quy định', 'Report to the Capo at once, by the book', 'Capo mừng vì bạn báo, và hắn bị phạt nặng. Hắn không nói gì với bạn trong cả năm sau đó.', 'The Capo is pleased you reported, and he is fined heavily. He says nothing to you for the following year.', { rep: 4, network: -6, sanity: -3 })],
    I('Bạn lắc đầu và nói bạn không biết gì.', 'You shake your head and say you know nothing.'), { theme: 'work' }),
  M('m_thumb_night_watch_radio', AGE.GROWN, fneed(T, 0),
    '[Máy thu thanh ca đêm] Trong ca đêm ở kho, bạn bắt được một bài hát cũ từ một đài xa. Người trong bài hát hát về một nơi có mặt trời lặn ở hướng khác. Bạn tắt đi trước khi người đứng gác tiếp theo đến.',
    '[Radio on the night watch] On the night shift at the store, you catch an old song from a distant station. The singer sings of a place where the sun sets in another direction. You switch it off before the next guard arrives.',
    [C('Ghi lại tên bài hát trên mu bàn tay', 'Write the song’s name on the back of your hand', 'Bạn không bao giờ tìm lại được bài hát ấy, nhưng dấu mực vẫn ở đó cho đến khi tay bạn bị bẩn đi.', 'You never find the song again, but the ink stays until your hand gets dirty.', { sanity: 3 }), C('Quên bài hát', 'Forget the song', 'Bạn tập trung vào cửa kho. Khi sáng đến, bạn thấy thật khó chịu vì còn nhớ giai điệu.', 'You focus on the store door. By morning it irritates you how much of the tune you still remember.', { sanity: -1 })],
    I('Bạn tắt đài và ngồi lặng.', 'You switch off the radio and sit still.'), { theme: 'work' }),
  M('m_thumb_ammo_inspection', AGE.GROWN, fneed(T, 1),
    '[Kiểm kê đạn cuối năm] Cuối năm là lúc Sottocapo kiểm kê từng viên đạn. Bạn nhận thấy tổ mình dư mười hai viên so với sổ, và biết rằng dư cũng đáng bị phạt như thiếu.',
    '[Year-end ammunition count] Year end is when the Sottocapo counts every round. You notice your team holds twelve more than the ledger shows, and know that surplus is as punishable as shortage.',
    [C('Báo dư và nộp lại', 'Report the surplus and hand it in', 'Sottocapo ghi nhận và không phạt, nhưng lần sau ông cho người đến đếm bất ngờ ở tổ bạn nhiều hơn các tổ khác.', 'The Sottocapo notes it and does not fine you, but next time he sends surprise counters to your team more often than to others.', { rep: 3, sanity: 1 }), C('Giấu mười hai viên vào một chỗ khác', 'Hide the twelve rounds somewhere else', 'Số đạn khớp, kiểm kê đạt. Mười hai viên nằm ở một nơi chỉ bạn biết, và bạn bắt đầu sống với cảm giác có một thứ không có trong sổ.', 'The count matches, the audit passes. The twelve rounds lie where only you know, and you begin living with something that is not in the ledger.', { sanity: -3, heat: 2 })],
    I('Bạn ký xác nhận và để cho Sottocapo đếm.', 'You sign and let the Sottocapo count.'), { theme: 'work' }),
  M('m_thumb_apology_gift', AGE.GROWN, fneed(T, 1),
    '[Quà xin lỗi] Một Capo trẻ gửi bạn một chai rượu và một lời xin lỗi vì đã nói xấu bạn sau lưng. Người truyền tin nói thêm rằng anh ta rất tha thiết, và chai rượu đó đắt hơn một tháng lương anh.',
    '[An apology gift] A young Capo sends you a bottle of liquor and an apology for speaking ill of you behind your back. The messenger adds that he is very sincere, and the bottle costs more than a month of his pay.',
    [C('Nhận và mời anh ta uống chung', 'Accept and invite him to share it', 'Hai người uống hết chai trong một buổi chiều, và anh ta kể về lý do thật.', 'The two of you finish the bottle in one afternoon, and he tells the real reason.', { network: 7, sanity: 2, rep: 2 }), C('Gửi trả, nói lời xin lỗi là đủ', 'Send it back, saying the apology is enough', 'Anh ta nhận lại với vẻ nhẹ nhõm kỳ lạ. Từ đó anh ta luôn chào bạn trước, và không bao giờ nhìn thẳng.', 'He takes it back with a strange relief. From then on he always greets you first, and never looks you in the eye.', { rep: 3, sanity: 1 })],
    I('Bạn đặt chai rượu lên kệ và để đó.', 'You set the bottle on a shelf and leave it.'), { theme: 'work' }),
  M('m_thumb_underboss_gaze', AGE.GROWN, fneed(T, 2),
    '[Ánh mắt của Underboss] Trong buổi họp, Underboss nhìn bạn một lần, rất ngắn, và rồi quay đi. Không ai khác thấy, nhưng bạn biết trong cái nhìn ấy có một câu hỏi, và bạn chưa biết nó là gì.',
    '[The Underboss’s glance] In the meeting, the Underboss looks at you once, very briefly, then turns away. No one else sees, but you know there was a question in it, and you do not yet know what.',
    [C('Tìm cơ hội hỏi trực tiếp sau buổi họp', 'Seek a chance to ask him directly afterward', 'Ông trả lời rằng câu hỏi chỉ đáng hỏi khi bạn chưa biết đáp án. Bạn đứng nhìn cánh cửa khép lại và không nhận ra mình đang giữ hơi thở.', 'He replies that a question is only worth asking when you do not yet know the answer. You watch the door close and do not notice you are holding your breath.', { sanity: -3, rep: 3 }), C('Đợi, xem ông có hỏi lần nữa không', 'Wait to see if he asks again', 'Ông không hỏi lại. Suốt một năm sau đó bạn nhìn lại cái liếc ấy hàng trăm lần mà không tìm ra đáp án nào.', 'He does not ask again. For a year afterward you replay that glance hundreds of times without finding any answer.', { sanity: -4 })],
    I('Bạn giả vờ không nhận ra.', 'You pretend not to notice.'), { theme: 'work' }),
  M('m_thumb_charity_envelope', AGE.GROWN, fneed(T, 2),
    '[Phong bì từ thiện] Underboss yêu cầu mỗi Capo đóng một phong bì cho quỹ nuôi trẻ mồ côi của The Thumb mỗi quý. Lần này, bạn nhận được danh sách những đứa trẻ cụ thể, và có một đứa mang tên một người bạn từng cùng ngồi một bàn.',
    '[Charity envelope] The Underboss requires each Capo to give an envelope to the Thumb’s orphan fund each quarter. This time you receive a list of specific children, and one carries the name of someone you once knew.',
    [C('Đến thăm đứa trẻ, đưa phong bì tận tay', 'Visit the child and hand over the envelope yourself', 'Đứa trẻ có đôi mắt giống hệt người ấy. Nó đón phong bì mà không biết bạn là ai. Bạn không nói cho nó biết.', 'The child has exactly the same eyes as your old friend. It takes the envelope without knowing who you are.', { wealth: -6, sanity: 5, network: 3 }), C('Gửi qua quỹ như thường lệ', 'Send it through the fund as usual', 'Số tiền đến đúng nơi. Không ai cảm ơn bạn, và bạn không mong ai làm vậy.', 'The money reaches its destination. Nobody thanks you, and you do not expect anyone to.', { wealth: -4, sanity: 1 })],
    I('Bạn đặt phong bì lên bàn và quay đi.', 'You set the envelope on the desk and turn away.'), { theme: 'work' }),
  M('m_thumb_corner_table', AGE.GROWN, fneed(T, 1),
    '[Chiếc bàn ở góc quán] Quán cà phê quen của hội luôn giữ một chiếc bàn ở góc, nơi chỉ Capo trở lên mới ngồi. Hôm nay có một người lạ ngồi đó, uống cà phê chậm như thể không biết gì. Chủ quán nhìn bạn với ánh mắt cầu cứu.',
    '[The corner table] The crew’s usual cafe always keeps a corner table for Capo and above. Today a stranger sits there sipping coffee slowly as if knowing nothing. The owner glances at you pleadingly.',
    [C('Mời người ấy sang bàn khác, lịch sự', 'Politely invite them to another table', 'Người ấy nhún vai và đổi chỗ. Chủ quán đặt thêm một đĩa bánh cho bạn mà không tính tiền.', 'They shrug and move. The owner sets down an extra plate of pastry for you at no charge.', { rep: 2, network: 2 }), C('Ngồi xuống cùng người ấy, nói chuyện', 'Sit down with them and talk', 'Hóa ra họ là một người mới đến thành phố và chưa nghe nói về The Thumb. Cuộc nói chuyện kéo dài hai giờ, và bạn thấy mình quên bẵng vai trò của mình.', 'It turns out they are new to the City and have never heard of the Thumb. The talk runs two hours, and you find you have forgotten your role entirely.', { sanity: 4, network: 3 })],
    I('Bạn chọn một bàn khác và uống cà phê một mình.', 'You pick another table and drink your coffee alone.'), { theme: 'work' }),
  M('m_thumb_inheritance_dispute', AGE.GROWN, fneed(T, 1),
    '[Tranh chấp thừa kế] Hai con trai của một Soldato đã khuất cãi nhau về khoản tiền tuất và căn nhà ông để lại. Theo lệ của The Thumb, tranh chấp trong gia đình hội viên do Capo phân xử, và hôm nay Capo bận nên giao cho bạn.',
    '[A dispute over inheritance] Two sons of a late Soldato quarrel over his pension and the house he left. By Thumb custom, disputes within a member’s family are judged by the Capo, and today the Capo is busy, so the task falls to you.',
    [C('Chia đôi, bất kể lý lẽ', 'Split in half regardless of argument', 'Cả hai đều bất mãn một chút.', 'Both are slightly dissatisfied.', { rep: 3, network: 4 }), C('Hỏi từng người về ông già lúc còn sống rồi mới quyết', 'Ask each about the old man’s life before deciding', 'Cả hai khóc trước khi nói hết. Cuối buổi họ tự đề nghị chia đều, và bạn chỉ cần cúi đầu để đóng sổ.', 'Both cry before finishing. By the end they propose an even split themselves, and you need only nod to close the book.', { sanity: 3, rep: 4, network: 5 })],
    I('Bạn đưa vụ việc về Capo xử lý.', 'You pass the matter back to the Capo.'), { theme: 'work' }),
  M('m_thumb_cold_message', AGE.GROWN, fneed(T, 2),
    '[Lời nhắn lạnh] Người truyền tin của Underboss đặt một mảnh giấy lên bàn bạn: một địa chỉ, một giờ, không chữ ký. Theo quy định The Thumb, bạn phải đến, và quy định cũng nói rằng bạn không bao giờ được hỏi vì sao.',
    '[A cold message] The Underboss’s courier sets a slip on your desk: an address, an hour, no signature. By Thumb rule you must go, and the rule also says you may never ask why.',
    [C('Đến đúng giờ, không hỏi', 'Go at the hour and ask nothing', 'Căn phòng chỉ có một chiếc ghế và một ly nước. Bạn ngồi chờ hai giờ, không ai đến, rồi người truyền tin ghi nhận rằng bạn đã đến. Đó chính là mục đích.', 'The room holds only a chair and a glass of water. You wait two hours, no one comes, then the courier records that you arrived. That was the whole point.', { rep: 4, sanity: -3 }), C('Đến sớm một giờ, quan sát nơi hẹn', 'Arrive an hour early and survey the place', 'Bạn thấy hai người khác lặp lại đúng việc đó từ ngã tư đối diện. Cả ba nhìn nhau trong im lặng, và bạn hiểu cuộc hẹn này là một bài kiểm tra cho cả ba.', 'You see two others doing exactly the same from the opposite corner. The three of you regard each other in silence, and you understand this meeting is a test for all of you.', { rep: 2, sanity: -2, network: 2 })],
    I('Bạn cất mảnh giấy vào túi và quên đi.', 'You pocket the slip and forget it.'), { theme: 'work' }),
  M('m_thumb_silent_toast', AGE.GROWN, fneed(T, 0),
    '[Chén rượu lặng] Cuối bữa tối của hội, mọi người nâng ly không nói một lời cho một người đã khuất, theo lệ cũ.',
    '[The silent toast] At the end of the crew’s dinner, everyone raises a glass without a word for someone dead, by old custom.',
    [C('Nâng ly cùng mọi người, giữ im', 'Raise your glass with the rest and keep still', 'Cả phòng uống cạn cùng một nhịp.', 'The whole room drains together on one beat.', { sanity: 2, network: 2 }), C('Hỏi nhỏ người ngồi cạnh về người đã khuất', 'Whisper to your neighbor to ask about the dead', 'Họ cho bạn một cái tên, và bạn nhớ nó trong nhiều tháng sau.', 'They give you a name, and you remember it for months.', { sanity: -1, network: 3 })],
    I('Bạn uống cạn và ngồi lặng.', 'You drain your glass and sit still.'), { theme: 'work' })
];

export const THUMB_DAILIES = [
  D('d_thumb_ledger_ink', AGE.GROWN, fneed(T, 0), 'Mực trong sổ cống nạp chưa khô khi Capo gấp nó lại. Một vệt đen in sang trang bên, đúng vào dòng ghi tên bạn.', 'The ink in the tribute ledger is not yet dry when the Capo folds it shut. A black smear prints onto the facing page, right over the line bearing your name.', {}),
  D('d_thumb_coat_check', AGE.GROWN, fneed(T, 0), 'Ở cửa quán, người giữ áo nhận áo khoác của bạn và nhìn xuống một chỗ trên vạt áo trong khoảng một giây lâu hơn cần thiết. Rồi cười, và đưa bạn tấm thẻ.', 'At the tavern door, the coat check takes your coat and glances at one place on the lining a second longer than necessary. Then smiles, and hands you the ticket.', {}),
  D('d_thumb_bullet_count', AGE.GROWN, fneed(T, 0), 'Bạn đếm số đạn trong băng ba lần trước khi ngủ, và lần nào cũng ra cùng một con số. Thói quen ấy bắt đầu từ lúc nào không còn nhớ nữa.', 'You count the rounds in the magazine three times before sleeping, and each time reach the same number. You no longer recall when that habit began.', {}),
  D('d_thumb_cigar_smoke', AGE.GROWN, fneed(T, 1), 'Khói xì gà trong phòng họp bám vào áo bạn đến tận ngày hôm sau. Trên tàu điện, người ngồi cạnh dịch ra nửa người mà không ai nói gì.', 'Cigar smoke from the meeting room clings to your coat until the next day. On the tram the person beside you shifts half a seat away and neither speaks.', {}),
  D('d_thumb_shoeshine_boy', AGE.GROWN, fneed(T, 0), 'Cậu bé đánh giày đầu phố không bao giờ hỏi giá. Nó chỉ nhìn đôi giày bạn và đoán xem bạn thuộc cấp nào, rồi đánh đúng như cấp ấy.', 'The shoeshine boy at the head of the street never asks a price. He just looks at your shoes and guesses what rank you hold, then polishes accordingly.', {}),
  D('d_thumb_tram_seat', AGE.GROWN, fneed(T, 0), 'Trên tàu điện, một chỗ ngồi gần cửa luôn trống khi bạn lên. Không ai hỏi vì sao, và bạn đã thôi tự hỏi từ lâu.', 'On the tram, a seat near the door is always empty when you board. Nobody asks why, and you stopped asking yourself long ago.', {}),
  D('d_thumb_funeral_flower', AGE.GROWN, fneed(T, 0), 'Một bó hoa trắng nằm trước cửa nhà hội viên đã khuất, hôm nay đã khô. Bạn đi ngang và đặt một đồng xu lên bậc thềm, như lệ đã dạy.', 'A bunch of white flowers lies outside a dead member’s door, dry today. You pass and set a coin on the step, as custom taught.', {}),
  D('d_thumb_rain_stripe', AGE.GROWN, fneed(T, 0), 'Mưa ngoài kho đạn rơi thành một vệt thẳng trên kính. Bạn nhìn nó chạy xuống và nhận ra mình đã không nhớ nổi lần cuối nhìn mưa mà không đếm gì cả.', 'Rain outside the armory runs in a straight line down the glass. You watch it fall and realize you cannot remember the last time you watched rain without counting something.', {}),
  D('d_thumb_bar_stool', AGE.GROWN, fneed(T, 1), 'Chiếc ghế quầy bar quen thuộc của bạn bị người lạ chiếm. Chủ quán đang nhìn bạn, và bạn thấy ông bắt đầu lau cốc rất kỹ, chậm.', 'Your usual bar stool is taken by a stranger. The owner watches you, and you see him begin wiping a glass very carefully, very slowly.', {}),
  D('d_thumb_midnight_call', AGE.GROWN, fneed(T, 1), 'Điện thoại ở kho đạn reo lúc nửa đêm đúng ba hồi rồi tắt. Đó là tín hiệu có người đang đến, hoặc có người đã đi, và bạn chưa bao giờ hỏi.', 'The armory phone rings exactly three times at midnight and stops. It is a signal someone is arriving, or has already left, and you have never asked.', {}),
  D('d_thumb_cuff_links', AGE.GROWN, fneed(T, 1), 'Chiếc khuy măng sét bạc của bạn bị trầy vì một cú va vào lan can. Bạn đánh bóng lại, nhưng vết xước vẫn nằm đó như một dấu mốc nhỏ.', 'Your silver cufflink is scratched from a knock against a railing. You polish it, but the scratch remains like a small landmark.', {}),
  D('d_thumb_tea_server', AGE.GROWN, fneed(T, 0), 'Người rót trà ở phòng họp luôn rót cho bạn cuối cùng và rót đầy nhất.', 'The tea server in the meeting room always pours for you last and fills yours fullest.', {}),
  D('d_thumb_phone_booth', AGE.GROWN, fneed(T, 0), 'Bạn gọi một số không có người nhận từ buồng điện thoại ở góc phố. Ba hồi chuông, rồi một giọng quen thuộc nói đúng một chữ: được. Bạn cúp máy.', 'You dial a number with no listener from the phone booth at the corner. Three rings, then a familiar voice says exactly one word: understood. You hang up.', {}),
  D('d_thumb_bakery_loaf', AGE.GROWN, fneed(T, 0), 'Tiệm bánh đầu phố để dành cho bạn ổ bánh mì nguội mỗi sáng thứ Hai, vì bạn từng giúp họ một lần mà bạn không nhớ nổi. Bạn không từ chối.', 'The bakery at the head of the street saves you a cold loaf each Monday morning, for a favor you once did them that you can no longer recall.', {}),
  D('d_thumb_street_lamp', AGE.GROWN, fneed(T, 0), 'Đèn đường ở ngõ sau kho đạn nhấp nháy theo một nhịp quen thuộc mà bạn đã học thuộc. Khi nó ngừng, bạn biết ca trực sắp đổi.', 'The streetlamp in the alley behind the armory flickers in a familiar rhythm you have learned by heart. When it stops, you know the shift is about to change.', {}),
  D('d_thumb_mirror_tie', AGE.GROWN, fneed(T, 1), 'Bạn thắt cà vạt trước gương và không nhận ra lần cuối mình làm thế mà không nghĩ đến cuộc họp. Hôm nay vẫn có một cuộc họp, và vẫn như mọi lần.', 'You knot your tie in the mirror and cannot recall the last time you did it without thinking of a meeting. Today there is a meeting too, and it is the same as ever.', {}),
  D('d_thumb_old_photo', AGE.GROWN, fneed(T, 0), 'Một tấm ảnh cũ của cả tổ rơi ra khỏi cuốn sổ. Trong ảnh có bốn người, nhưng bạn chỉ còn nhớ tên hai.', 'An old group photo slides out of a ledger. There are four people in it, but you can only recall the names of two.', {}),
  D('d_thumb_sausage_stand', AGE.GROWN, fneed(T, 0), 'Người bán xúc xích ở góc phố gọi bạn bằng một biệt danh mà bạn chưa nghe ai gọi. Bạn gật đầu và mua một xiên.', 'The sausage vendor at the corner calls you by a nickname you have never heard anyone use. You nod and buy a skewer.', {}),
  D('d_thumb_cold_hand', AGE.GROWN, fneed(T, 1), 'Bàn tay của Sottocapo lạnh khi ông bắt tay bạn, như thể máu của ông chưa bao giờ đủ ấm. Bạn rút tay lại và giấu nó vào túi áo.', 'The Sottocapo’s hand is cold when he shakes yours, as if his blood has never been warm enough. You withdraw your hand and tuck it into your coat pocket.', {}),
  D('d_thumb_hat_tip', AGE.GROWN, fneed(T, 0), 'Một Soldato lạ nghiêng nón chào bạn bên kia đường, và bạn đáp lại theo phản xạ. Mãi tối bạn mới nhớ ra đó là người từng bắn bạn trượt ba năm trước.', 'A Soldato you do not know tips his hat at you across the street, and you answer by reflex. Only that evening do you remember he was the one who missed you three years ago.', {}),
  D('d_thumb_pay_envelope', AGE.GROWN, fneed(T, 0), 'Phong bì lương tháng này nhẹ hơn tháng trước một chút, không ai giải thích. Bạn đếm hai lần rồi ký nhận như thường lệ.', 'This month’s pay envelope is a little lighter than last month’s, and no one explains. You count twice and sign as usual.', {}),
  D('d_thumb_elevator_music', AGE.GROWN, fneed(T, 2), 'Thang máy lên văn phòng của Underboss có nhạc nhẹ, rất nhẹ.', 'The lift to the Underboss’s office plays soft music, very soft. You recognize the tune because it resembles one your mother used to hum, and you do not dare ask why.', {}),
  D('d_thumb_ash_tray', AGE.GROWN, fneed(T, 1), 'Cái gạt tàn trên bàn họp luôn đầy trước khi buổi họp bắt đầu, như thể có ai đó chuẩn bị để cho mọi người có chỗ giấu tay.', 'The ashtray on the meeting table is always full before the meeting starts, as if someone prepared it to give everyone somewhere to hide their hands.', {}),
  D('d_thumb_nest_gate', AGE.GROWN, fneed(T, 0), 'Lính gác ở cổng Nest nhìn thẻ của bạn quá lâu rồi trả lại mà không nói. Bạn nghe tiếng họ thì thầm khi bạn quay đi, và không quay lại.', 'The guard at the Nest gate studies your pass too long and returns it without a word. You hear them whisper as you turn away, and do not turn back.', {}),
  D('d_thumb_birthday_card', AGE.GROWN, fneed(T, 0), 'Trong ngăn kéo của bạn có một tấm thiệp sinh nhật không rõ ai gửi, chỉ ghi một dòng. Nét chữ ấy bạn đã thấy ở đâu đó trong sổ.', 'In your drawer lies a birthday card from an unknown sender with a single line. You have seen that handwriting somewhere in the ledger.', {}),
  D('d_thumb_dark_window', AGE.GROWN, fneed(T, 1), 'Cửa sổ tầng ba của một nhà trọ trong khu bạn thu cống nạp tối đen mỗi tháng đúng ngày bạn đến, rồi sáng lên khi bạn rời. Bạn chưa bao giờ biết ai ở trong đó.', 'The third-floor window of a boarding house in the district where you collect goes dark each month the day you come and lights up when you leave. You have never known who lives inside.', {}),
  D('d_thumb_knot_tie', AGE.GROWN, fneed(T, 0), 'Dây giày bạn buộc theo kiểu nút cũ mà ông già dạy nghi thức chỉ. Một người lạ nhìn thấy và gật đầu thật khẽ, như đã nhận ra điều gì.', 'You tie your shoelaces in the old knot the etiquette teacher showed you. A stranger notices and nods very slightly, as if recognizing something.', {}),
  D('d_thumb_dock_foghorn', AGE.GROWN, fneed(T, 0), 'Còi sương mù ngoài bến vang lên ba lần, dài, ngắn, dài. Đó là tín hiệu của một băng khác, và bạn thấy các Soldato quanh bạn cùng lúc dừng nói chuyện.', 'The fog horn at the pier sounds three times, long, short, long. It is another crew’s signal, and you see the Soldato around you stop talking at once.', {}),
  D('d_thumb_ink_blot', AGE.GROWN, fneed(T, 1), 'Bạn làm đổ một giọt mực lên biên bản họp. Không ai nhận ra, nhưng bạn biết giọt mực nằm đúng trên tên một người sẽ không còn ở đây tuần sau.', 'You spill a drop of ink on the meeting minutes. No one notices, but you know the drop lies right on the name of someone who will not be here next week.', {}),
  D('d_thumb_quiet_corridor', AGE.GROWN, fneed(T, 2), 'Hành lang dẫn đến phòng Underboss im đến mức bạn nghe được tiếng giày của chính mình. Bạn đếm đúng mười bảy bước và dừng ở cửa.', 'The corridor leading to the Underboss’s room is so quiet you hear your own shoes. You count exactly seventeen steps and stop at the door.', {}),
  D('d_thumb_wire_service', AGE.GROWN, fneed(T, 0), 'Một bức điện đến văn phòng chỉ có ba chữ và một số. Cả tổ nhìn nhau rất nhanh, rồi mỗi người quay về việc của mình như chưa thấy gì.', 'A wire arrives at the office carrying three words and a number. The whole team glances at one another very quickly, then each returns to their work as if nothing had been seen.', {})
];
