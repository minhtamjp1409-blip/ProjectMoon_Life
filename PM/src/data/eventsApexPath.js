// What the top of a career holds once the ladder runs out. A Color or a Finger at its highest rank is no
// longer chased by small Requests: the work that finds them is the work that matches their standing, a
// fight against someone of the same weight, or a matter where their name alone changes the outcome.
// One of these comes up most years, as the annual merit commission, so the record keeps growing.

const apex = (id, need, extra, vi, en, steady, gamble, declined) => ({
  id, age: [20, 140], need, vi, en, ...extra,
  careerOpportunity: true,
  allowDistorted: Boolean(need.finger),
  tags: ['career', 'merit', 'apex'],
  choices: [
    { vi: steady[0], en: steady[1], rvi: steady[2], ren: steady[3], fx: steady[4] },
    {
      vi: gamble[0], en: gamble[1], rvi: '', ren: '', fx: {},
      out: [
        { w: gamble[8] ?? 58, rvi: gamble[2], ren: gamble[3], fx: gamble[4] },
        { w: 100 - (gamble[8] ?? 58), rvi: gamble[5], ren: gamble[6], fx: gamble[7] }
      ]
    }
  ],
  ignore: { vi: 'Bỏ qua', en: 'Pass', rvi: declined[0], ren: declined[1], fx: declined[2] || {} }
});

const color = (id, ...rest) => apex(id, { jobs: ['Fixer'] }, { requires: ['ColorFixer'] }, ...rest);
const finger = (id, name, ...rest) => apex(id, { jobs: ['Syndicate'], finger: name, fingerRankAtLeast: 3 }, {}, ...rest);

export const APEX_COLOR_MINORS = [
  color('m_apex_color_urban_nightmare',
    '[Một Urban Nightmare ở rìa District] Một thứ vừa vượt qua phong tỏa ở khu cảng. Ba đội Grade 2 đã quay về, và Hana không gọi đội thứ tư. Họ gọi tên bạn, kèm một chiếc xe đã chờ sẵn dưới cửa.',
    '[An Urban Nightmare at the edge of a District] Something has crossed the cordon at the harbor ward. Three Grade 2 teams have come back, and Hana does not send a fourth. They call your name instead, with a car already waiting at the door.',
    ['Dựng tuyến chặn trước, đánh khi nó vào tầm', 'Set the line first and strike when it enters range',
      'Bạn giữ nó trong một con phố hẹp đủ lâu để các đội còn lại sơ tán xong. Hana ghi tên bạn ở dòng đầu của báo cáo.', 'You hold it in a narrow street long enough for the remaining teams to evacuate. Hana puts your name on the first line of the report.', { merit: 7, rep: 3, health: -8, sanity: -3 }],
    ['Vào thẳng và đánh gục nó ngay giữa phố', 'Walk in and put it down in the open street',
      'Bạn hạ nó trước khi trời tối. Người dân đứng sau cửa kính nhìn bạn đi qua mà không ai dám vỗ tay.', 'You put it down before dark. The residents behind their windows watch you pass, and none of them dares to clap.', { merit: 13, rep: 6, health: -14, sanity: -5 },
      'Nó học nhịp của bạn nhanh hơn dự đoán. Bạn rút ra được, nhưng khu cảng phải đóng thêm một tuần và Hana ghi sự việc vào mục chưa hoàn tất.', 'It learns your rhythm faster than expected. You withdraw, but the harbor ward stays closed another week and Hana files the matter as unfinished.', { health: -22, sanity: -8, rep: -2 }, 56],
    ['Hana chuyển hồ sơ cho một Color khác ở Section lân cận.', 'Hana passes the file to another Color in a neighbouring Section.', { rep: -2 }]),

  color('m_apex_color_peer_bout',
    '[Trận đấu giữa hai cái tên] Một Fixer Grade 1 từ phía bên kia The City đề nghị một trận đấu có người chứng kiến, luật rõ, không giết người. Người ấy không muốn thắng bạn. Người ấy muốn đứng cạnh tên bạn trong một trang sử Hana.',
    '[A bout between two names] A Grade 1 Fixer from the far side of the City proposes a sanctioned bout with witnesses, clear rules and no killing. They do not want to beat you. They want to stand beside your name on a page of Hana’s record.',
    ['Nhận trận, đánh theo luật và giữ nhịp đều', 'Take the bout and fight by the rules at an even pace',
      'Cả hai kết thúc bằng một cái cúi đầu. Người chứng kiến ghi lại rằng không ai thắng rõ ràng, và thứ hạng của bạn không thay đổi.', 'Both of you finish with a bow. The witnesses record that neither won clearly, and your standing does not move.', { merit: 6, rep: 4, health: -6 }],
    ['Dồn toàn lực để kết thúc trận trong ba nhịp', 'Commit everything to end the bout in three beats',
      'Người ấy ngã xuống ở nhịp thứ ba. Khán đài im lặng một lúc rồi mới có tiếng đứng dậy, và tên bạn được đọc to hơn tên đối thủ.', 'They go down on the third beat. The stands stay silent a while before anyone rises, and your name is read louder than theirs.', { merit: 12, rep: 7, health: -10 },
      'Người ấy chịu được nhát đầu và trả lại nhát thứ hai. Bạn đứng được, nhưng bản ghi chép mô tả trận đấu là hòa ngặt.', 'They take your first blow and return a second. You stay standing, but the record calls it a narrow draw.', { health: -17, rep: 1, sanity: -3 }, 55],
    ['Bạn từ chối khéo. Người ấy tìm một Color khác để đứng cạnh.', 'You decline politely. They look for another Color to stand beside.']),

  color('m_apex_color_fallen_fixer',
    '[Một người đồng hạng đã thành Distortion] Một Fixer từng ngang tầm với bạn biến dạng trong một căn hộ ở tầng cao. Hana đã niêm phong tòa nhà. Họ muốn người kết thúc nó là người từng biết mặt nó, vì không ai khác ở cùng đẳng cấp.',
    '[Someone of your rank, now a Distortion] A Fixer who once matched you has warped inside a high apartment. Hana has sealed the building. They want the one who ends it to be someone who knew the face, because no one else in the city stands at that level.',
    ['Vào một mình, nói chuyện trước khi ra tay', 'Go in alone and speak before you strike',
      'Nó nghe giọng bạn đủ lâu để ngừng cựa quậy. Kết thúc diễn ra ngắn và không có tiếng hét. Hana tặng bạn một lời cảm ơn viết tay.', 'It listens to your voice long enough to stop moving. The end is short and without a cry. Hana sends a handwritten thanks.', { merit: 7, rep: 3, sanity: -9 }],
    ['Phá cửa sổ tầng cao và kết thúc nó trong một lần', 'Break through the upper window and end it in one pass',
      'Bạn kết thúc nó trước khi nó kịp nhận ra bạn. Khi bạn bước ra, Hana không hỏi gì cả, chỉ gật đầu.', 'You end it before it knows who you are. When you step out Hana asks nothing, and only nods.', { merit: 12, rep: 5, health: -9, sanity: -12 },
      'Nó nhận ra bạn đúng lúc bạn ra tay. Bạn thoát được, nhưng cú đánh cuối cùng chậm một nhịp và bạn mang cái nhìn đó về nhà.', 'It recognizes you just as you strike. You escape, but the final blow lands a beat late, and you carry that look home.', { health: -16, sanity: -18, rep: -1 }, 55],
    ['Hana giao việc cho một đội Grade 1 và ghi bạn vắng mặt.', 'Hana gives the job to a Grade 1 team and records you as absent.', { sanity: -2, rep: -2 }]),

  color('m_apex_color_truce',
    '[Bàn ngồi của hai Finger] Hai Finger sắp đánh nhau vì một con phố, và cả hai chỉ chịu ngồi xuống nếu người ngồi giữa là một Color. Không bên nào hứa nghe bạn. Họ chỉ hứa sẽ không rút súng trước khi bạn nói xong.',
    '[A table between two Fingers] Two Fingers are about to fight over a street, and both will sit only if the one between them is a Color. Neither promises to listen. They only promise not to draw before you finish speaking.',
    ['Ngồi giữa và chia con phố thành hai phần rõ ràng', 'Sit between them and split the street into two clear shares',
      'Cả hai ký vào một tờ giấy mà không đọc kỹ. Con phố được chia, và tên bạn được đặt làm người bảo lãnh.', 'Both sign a sheet without reading it closely. The street is split and your name is placed as guarantor.', { merit: 6, rep: 4, network: 3, sanity: -3 }],
    ['Đặt thanh kiếm lên bàn và nói giá của việc phá hòa ước', 'Lay your blade on the table and name the price of breaking the truce',
      'Căn phòng im lặng một lúc lâu. Rồi cả hai bên cùng đứng lên, bắt tay nhau, và không ai dám quay sang nhìn thanh kiếm.', 'The room stays silent a long time. Then both sides rise, shake hands, and neither dares look at the blade.', { merit: 11, rep: 7, network: 4, heat: 3 },
      'Một bên coi đó là lời đe dọa. Bạn rời bàn trước khi có người rút súng, và đêm đó ba cửa hàng cháy.', 'One side takes it as a threat. You leave the table before anyone draws, and that night three shops burn.', { rep: -4, heat: 6, sanity: -5 }, 58],
    ['Hai bên tìm một người trung gian kém tên tuổi hơn.', 'The two sides look for a mediator of lesser name.']),

  color('m_apex_color_demonstration',
    '[Buổi biểu diễn cho lớp Fixer trẻ] Hana tổ chức buổi kiểm tra cho những người sắp lên Grade 5. Họ mời một Color đứng vào sân để cho thấy một nhát chém đúng nghĩa là gì. Ai cũng biết lời mời này là một phần thưởng, và cũng là một phép thử.',
    '[A demonstration for the young Fixers] Hana holds a review for those about to reach Grade 5. They invite a Color to step into the yard and show what a proper cut looks like. Everyone knows the invitation is both a reward and a test.',
    ['Chia sẻ từng bước, cho người trẻ tự thử', 'Walk through each step and let the young ones try',
      'Hai người trẻ chạm được vào ống tay áo bạn. Khi tan buổi, họ hỏi bạn có muốn xem tiếp lần sau không.', 'Two of the young ones touch your sleeve. When it ends they ask whether you would come again.', { merit: 5, rep: 4, network: 3 }],
    ['Đấu thật với ba người giỏi nhất trong lớp cùng lúc', 'Face the three best of the class at once, for real',
      'Bạn dừng cả ba trong chưa đầy một phút. Người xem chỉ nhớ một nhát chém cuối, và nhắc nó cho tới cuối năm.', 'You stop all three in under a minute. Observers remember only the last cut, and speak of it until the year is out.', { merit: 11, rep: 7, health: -7 },
      'Một người trong số họ thông minh hơn cả buổi tập. Bạn thắng nhưng bị cắt vào cánh tay trước hàng trăm khán giả.', 'One of them is sharper than the whole rehearsal. You win, but take a cut on the arm in front of a hundred spectators.', { health: -12, rep: 2, sanity: -3 }, 62],
    ['Hana mời một Grade 1 thay bạn. Buổi tập diễn ra nhạt hơn.', 'Hana invites a Grade 1 in your place. The session is flatter.', { rep: -1 }]),

  color('m_apex_color_singularity',
    '[Một Singularity bên trong Wing] Một phòng nghiên cứu của Wing mất kiểm soát thứ họ đang giữ. Wing không muốn tiếng ồn, nên họ trả gấp ba để một Color vào mà không có chứng nhân. Bản hợp đồng có một dòng ở trang cuối, bằng mực nhạt, nói rằng không ai được nhắc tên bạn.',
    '[A Singularity inside the Wing] A Wing research room has lost control of what it holds. The Wing wants no noise, so it pays triple for a Color to enter with no witnesses. The contract has one line on the last page, in pale ink, saying no one may mention your name.',
    ['Nhận hợp đồng và vào theo từng khu vực', 'Accept the contract and enter section by section',
      'Bạn thu hồi thứ đó trong ba lần vào. Tiền đến đúng hạn, và không ai nhắc tên bạn như đã hứa.', 'You recover it over three entries. The payment arrives on time and no one mentions your name, as promised.', { merit: 6, rep: 1, wealth: 10, sanity: -6 }],
    ['Vào thẳng phòng giữ, kết thúc trong một lần', 'Walk straight into the holding room and finish in one pass',
      'Bạn đóng nó lại trước khi chuông báo vang thêm lần thứ hai. Người quản lý Wing cúi đầu rất thấp khi đưa phong bì.', 'You shut it down before the alarm sounds a second time. The Wing manager bows very low as he hands over the envelope.', { merit: 11, rep: 3, wealth: 16, sanity: -10 },
      'Thứ đó phản ứng với tiếng bước chân. Bạn thoát ra, nhưng Wing giữ lại nửa tiền công vì phòng bị hư hại.', 'The thing reacts to your footsteps. You get out, but the Wing withholds half the fee for damage to the room.', { health: -14, sanity: -12, wealth: 4 }, 54],
    ['Wing thuê một nhóm Grade 3 rẻ hơn và chấp nhận rủi ro.', 'The Wing hires a cheaper Grade 3 team and accepts the risk.']),

  color('m_apex_color_challenger',
    '[Người trẻ muốn lấy tên bạn] Một Fixer Grade 3 có tiếng đang nói ở khắp các quán ăn rằng nhát chém của bạn đã cũ. Người ấy không gây chuyện. Chỉ kiên nhẫn đứng đợi trước cửa bạn mỗi tối thứ sáu, cho tới khi bạn ra.',
    '[A younger name that wants yours] A Grade 3 Fixer with some reputation is telling every diner that your cut has grown old. They make no trouble. They simply wait outside your door each Friday evening until you come out.',
    ['Mời họ vào nói chuyện, chỉ ra điểm yếu thật', 'Invite them in and point out their real weakness',
      'Họ nghe hết một giờ mà không cãi. Lần sau họ quay lại, nhát chém của họ gọn hơn hẳn.', 'They listen for an hour without arguing. When they return, their cut is far cleaner.', { merit: 5, rep: 4, network: 2 }],
    ['Nhận lời thách đấu, đánh trong sân sau', 'Accept the challenge and fight in the back yard',
      'Bạn đánh trúng nhát đầu và để họ đứng dậy. Trận kết thúc khi họ tự cúi đầu, và cả quán ăn phố đó nói về nó tới tận mùa sau.', 'You land the first strike and let them stand. It ends when they bow on their own, and the whole diner street talks of it into next season.', { merit: 10, rep: 6, health: -6 },
      'Họ nhanh hơn bạn tưởng. Bạn thắng nhưng cái chân đau suốt đêm, và tin đồn mới kể rằng bạn chỉ thắng sát nút.', 'They are faster than you thought. You win, but the leg aches all night, and the new rumour says you won by a hair.', { health: -12, rep: 1, sanity: -3 }, 63],
    ['Bạn đóng cửa sớm vào các tối thứ sáu. Người ấy đứng thêm vài tuần rồi thôi.', 'You close early on Fridays. They stand there a few more weeks, then stop.', { rep: -2 }]),

  color('m_apex_color_hunt_party',
    '[Đội săn của một Association] Một Association lớn tập hợp ba Grade 1 và một Grade 2 để săn một thứ ở ngoài tường. Họ cần người dẫn đầu mà cả bốn cùng chịu nghe. Chỉ có một cái tên trong The City đáp ứng điều đó.',
    '[An Association’s hunting party] A large Association gathers three Grade 1s and a Grade 2 to hunt something beyond the wall. They need a leader all four will listen to. Only one name in the City meets that need.',
    ['Dẫn đội, nhận phần thù lao nhỏ hơn để giữ hòa khí', 'Lead the party and accept a smaller share to keep the peace',
      'Cả đội quay về đủ người. Họ chia chiến lợi phẩm và kể cho nhau nghe bạn đã chọn đúng điểm đánh ở đâu.', 'The whole party returns. They split the spoils and tell each other where you chose the strike point.', { merit: 6, rep: 4, network: 3, health: -5 }],
    ['Dẫn đội và tự mình nhận đòn đầu', 'Lead the party and take the first blow yourself',
      'Bạn mở đường bằng thân mình. Thứ đó ngã trước khi ai kịp chạm vào hàng sau, và cả bốn Fixer cúi đầu với bạn trên đường về.', 'You open the way with your own body. The thing falls before anyone reaches the rear line, and all four bow to you on the road home.', { merit: 12, rep: 7, health: -13 },
      'Đòn đầu mạnh hơn dự tính. Đội vẫn hạ được nó, nhưng bạn bị thương nặng và cả bốn người phải khiêng bạn về.', 'The first blow is heavier than planned. The party still fells it, but you are badly hurt and all four have to carry you back.', { health: -24, sanity: -5, rep: 2 }, 55],
    ['Họ chọn một Grade 1 làm trưởng đoàn, và ba người kia không vui.', 'They pick a Grade 1 as leader, and the other three are not pleased.', { rep: -1 }]),

  color('m_apex_color_old_debt',
    '[Món nợ từ thời chưa có tên] Một người từng cứu bạn khi bạn còn là Grade 8 gửi đến một mảnh giấy trắng, chỉ ghi một địa chỉ. Họ không xin tiền. Họ chỉ nói rằng nếu bạn nhớ thì tới, còn nếu không thì họ hiểu.',
    '[A debt from before the name] Someone who once saved you when you were a Grade 8 sends a blank slip with only an address on it. They ask for no money. They say that if you remember, come, and if you do not, they understand.',
    ['Đến địa chỉ ấy và nghe họ nói', 'Go to the address and hear them out',
      'Họ cần bạn đứng cạnh một người con trong buổi thử việc đầu tiên. Bạn đứng đó cả buổi, và người con nhìn bạn nhiều hơn nhìn người chấm.', 'They need you beside their child at a first trial. You stand there all session, and the child looks at you more than at the examiner.', { rep: 5, network: 3, sanity: 4, merit: 4 }],
    ['Mang cả đội của bạn tới và dẹp mối đe dọa đang đè lên họ', 'Bring your own crew and remove the threat bearing on them',
      'Bạn đứng ở cuối ngõ cho tới khi những kẻ đòi nợ hiểu ra. Người cũ không nói gì, chỉ đặt tay lên cánh tay bạn một lúc.', 'You stand at the end of the alley until the debt collectors understand. The old friend says nothing, and rests a hand on your arm for a moment.', { merit: 9, rep: 6, heat: 3, sanity: 3 },
      'Những kẻ đòi nợ là người của một Syndicate lớn. Bạn dẹp được họ, nhưng phải trả giá bằng mối quan hệ ở một Finger.', 'The collectors belong to a large Syndicate. You clear them, but pay with a relationship at one Finger.', { rep: 1, heat: 7, network: -4 }, 62],
    ['Bạn để tờ giấy trắng trong ngăn kéo. Nó vẫn nằm đó vào cuối năm.', 'You leave the blank slip in a drawer. It is still there at year’s end.', { sanity: -4 }])
];

const FINGER_APEX = {
  Thumb: [
    ['m_apex_thumb_turf_war', 'Thumb', '[Địa bàn đang rạn] Hai Capo dưới quyền bạn tranh nhau một chợ đêm. Cả hai đều trung thành, cả hai đều có người của mình trong chợ. Bạn là người duy nhất họ cùng chịu nghe.', '[A cracking territory] Two Capos under you contend for a night market. Both are loyal, and both have their own people in the stalls. You are the only voice they both accept.',
      ['Chia chợ theo giờ và ghi vào sổ', 'Split the market by hours and enter it in the ledger', 'Hai Capo ký tên. Chợ chạy trơn tru qua mùa, và cả hai đều nhớ rằng bạn không chọn phe.', 'Both Capos sign. The market runs smoothly through the season, and both remember that you chose no side.', { merit: 6, rep: 4, network: 2 }],
      ['Xuống chợ, tự mình dẹp những kẻ gây chuyện', 'Go down to the market and clear the troublemakers yourself', 'Bạn đi qua giữa hai hàng quầy và những kẻ gây chuyện tự rút lui. Cả chợ biết ai là người đứng đầu.', 'You walk between two rows of stalls and the troublemakers withdraw on their own. The whole market knows who stands above.', { merit: 11, rep: 6, heat: 4 }, 'Một Capo coi việc bạn xuống tận chợ là mất lòng tin. Chợ yên, nhưng một người tốt rời đi.', 'One Capo takes your presence at the market as a loss of trust. The market stays quiet, but a good man leaves.', { rep: 1, network: -4, heat: 4 }, 60],
      ['Bạn để hai Capo tự giải quyết. Cuộc tranh cãi kéo dài đến mùa đông.', 'You leave the two Capos to settle it. The quarrel drags into winter.']],
    ['m_apex_thumb_rival_boss', 'Thumb', '[Underboss của một phe khác] Underboss của một Thumb ở District lân cận ghé thăm với ba vệ sĩ và một lời đề nghị: một cuộc đấu danh dự trên sân thượng, hai người, không vũ khí lạ. Ông ta muốn biết ai là người mạnh hơn.', '[Underboss of another house] The Underboss of a neighbouring District’s Thumb visits with three bodyguards and an offer: a duel of honour on a rooftop, two of you, no unusual weapons. He wants to know who is stronger.',
      ['Nhận, nhưng đặt luật rõ trên giấy', 'Accept, but put the rules clearly on paper', 'Cả hai đánh theo luật đến khi trời tối. Ông ta cúi đầu trước khi bị thương nặng, và hai Thumb ngừng căng thẳng với nhau.', 'You fight by the rules until dusk. He bows before being badly hurt, and the two Thumbs stop straining against each other.', { merit: 6, rep: 4, health: -6 }],
      ['Nhận mà không đặt luật nào cả', 'Accept with no rules at all', 'Bạn thắng trong ba hiệp. Ông ta rời sân thượng mà không nói thêm gì, và tên bạn được nhắc ở bàn tiệc của cả hai phe.', 'You win in three rounds. He leaves the roof with nothing more to say, and your name is spoken at the banquets of both houses.', { merit: 12, rep: 7, health: -12 }, 'Ông ta chơi bẩn đúng lúc bạn mất cảnh giác. Bạn thắng, nhưng ở lại với vết thương và một mối thù.', 'He fights dirty the moment you lose focus. You win, but are left with a wound and a feud.', { health: -18, rep: 1, heat: 6 }, 56],
      ['Bạn từ chối khéo. Ông ta bảo sẽ quay lại vào mùa sau.', 'You decline politely. He says he will return next season.']]
  ],
  Index: [
    ['m_apex_index_unreadable_prescript', 'Index', '[Prescript không ai đọc được] Một tờ Prescript mới đến tay bạn nhưng các Proxy dưới quyền không ai giải được. Chữ không sai, chỉ là ý nghĩa như đã bị cắt khỏi nguồn. Weaver chưa bình luận gì.', '[A Prescript no one can read] A new Prescript reaches your hands, but none of the Proxies under you can decipher it. The writing is not wrong, only its meaning seems cut from its source. The Weaver has said nothing.',
      ['Ngồi đọc từng dòng và hỏi các Proxy ý kiến', 'Read it line by line and ask the Proxies for their views', 'Sau nhiều đêm, các Proxy đồng thuận một cách hiểu. Bạn viết lại dưới tên mình và được chấp nhận.', 'After several nights the Proxies agree on one reading. You write it down under your name and it is accepted.', { merit: 5, rep: 3, sanity: -5 }],
      ['Làm theo cách hiểu của riêng bạn, không hỏi ai', 'Act on your own reading and ask no one', 'Kết quả khớp với ý định thật của Prescript. Index ghi nhận rằng bạn đọc được thứ người khác không đọc được.', 'The outcome matches the Prescript’s real aim. The Index records that you read what others could not.', { merit: 11, rep: 6, sanity: -8 }, 'Cách hiểu của bạn sai một chữ nhỏ. Hậu quả không lớn, nhưng một Proxy bị thương vì sự nhầm lẫn đó.', 'Your reading is off by one small word. The consequence is minor, but a Proxy is hurt by the mistake.', { sanity: -11, rep: -3, health: -6 }, 56],
      ['Bạn trả tờ Prescript lên cấp trên mà không bình luận.', 'You return the Prescript upward with no comment.']],
    ['m_apex_index_proxy_dispute', 'Index', '[Hai Proxy cùng cầm một Prescript] Hai Proxy đều tin Prescript của mình áp dụng cho cùng một người, và hai kết cục đó loại trừ nhau. Cả hai đều giữ vũ khí và không ai chịu lùi trước tin chắc của người kia.', '[Two Proxies, one Prescript] Two Proxies each believe their Prescript applies to the same person, and the two outcomes exclude one another. Both keep their weapons, and neither will back down before the other’s certainty.',
      ['Đọc cả hai Prescript và phán xử theo thứ tự', 'Read both Prescripts and rule by order of issue', 'Hai Proxy cúi đầu trước phán quyết của bạn. Một người đặt vũ khí xuống ngay, người kia chậm hơn.', 'Both Proxies bow before your ruling. One sets down their weapon at once, the other more slowly.', { merit: 6, rep: 4, sanity: -3 }],
      ['Đứng giữa hai người và chặn cả hai bằng thân mình', 'Stand between them and block both with your own body', 'Cả hai đều dừng lại khi thấy bạn không nhúc nhích. Prescript được đối chiếu lại, và hóa ra cả hai đều đúng, ở hai thời điểm khác nhau.', 'Both stop when they see you will not move. The Prescripts are cross-checked, and it turns out both were right, at different moments.', { merit: 11, rep: 7, health: -7 }, 'Một Proxy không dừng kịp. Bạn đỡ được nhát chém nhưng vết thương sâu hơn bạn nghĩ.', 'One Proxy cannot stop in time. You catch the blow but the wound is deeper than you thought.', { health: -16, rep: 2, sanity: -3 }, 58],
      ['Bạn để họ tự báo lên Weaver. Phán quyết đến sau ba tuần.', 'You let them report to the Weaver. The ruling arrives three weeks later.']]
  ],
  Middle: [
    ['m_apex_middle_book_of_names', 'Middle', '[Cái tên đứng đầu trang] Một cái tên đã nằm đầu Book of Vengeance suốt hai thập niên bỗng được người trong gia đình xin gạch. Người xin là con của chính kẻ bị ghi. Gạch hay không là quyết định của bạn.', '[The name at the head of the page] A name that has stood atop the Book of Vengeance for two decades is suddenly asked to be struck by someone in the family. The petitioner is the child of the very one listed. Whether to strike it is your decision.',
      ['Nghe đứa con kể và gạch theo thông lệ', 'Hear the child out and strike by custom', 'Cái tên bị gạch. Nhiều người đến chúc mừng, và vài người nhìn bạn lâu hơn bình thường.', 'The name is struck. Many come to congratulate, and a few look at you longer than usual.', { merit: 5, rep: 4, network: 3, sanity: -3 }],
      ['Đòi kẻ bị ghi tự đến nói chuyện trước khi quyết', 'Demand the listed one come speak before you decide', 'Ông ta đến, già hơn bạn nghĩ, và nói gần hết đêm. Sáng hôm sau, bạn gạch tên, và cả gia đình hiểu vì sao.', 'He comes, older than you expected, and talks nearly all night. By morning you strike the name, and the whole family understands why.', { merit: 11, rep: 7, sanity: -5 }, 'Ông ta không đến. Bạn phải gạch tên bằng thủ tục, và những người đã chờ lâu không thích vậy.', 'He does not come. You strike the name by procedure, and the ones who waited long do not like it.', { rep: -2, network: -3, sanity: -4 }, 58],
      ['Bạn để cuốn sổ lại nguyên. Lời xin được nộp lại vào năm sau.', 'You leave the book as it is. The petition is refiled next year.']],
    ['m_apex_middle_great_gathering', 'Middle', '[Buổi họp của các Great Sibling] Các Great Sibling của nhiều District họp để thống nhất quy ước. Có một đề xuất đã chia hội đồng làm hai, và phiếu cuối cùng thuộc về người có tên nặng nhất trong phòng: bạn.', '[A gathering of the Great Siblings] The Great Siblings of several Districts meet to settle their conventions. One proposal has split the council in two, and the final vote belongs to the one whose name weighs most in the room: yours.',
      ['Bỏ phiếu theo thông lệ và ghi lý do vào biên bản', 'Vote by custom and enter your reason into the minutes', 'Phiếu của bạn thắng bằng một lá. Hai bên đều ghi rằng bạn nói rõ ràng, dù ít người hài lòng.', 'Your vote wins by one ballot. Both sides note that you spoke clearly, though few are pleased.', { merit: 5, rep: 4, network: 3 }],
      ['Đứng dậy, nói trước toàn bộ phòng, và thuyết phục hai bên', 'Rise, speak to the whole room, and win both sides over', 'Phòng im lặng khi bạn nói. Phiếu cuối cùng thống nhất, và hội đồng viết riêng một dòng ghi nhận bạn.', 'The room stays quiet as you speak. The final vote is unanimous, and the council writes a line singling you out.', { merit: 11, rep: 7, network: 5 }, 'Bài nói của bạn làm một người nổi giận. Phiếu vẫn qua, nhưng người ấy ra khỏi phòng và đóng cửa mạnh.', 'Your speech angers one man. The vote still passes, but he leaves the room and slams the door.', { rep: 1, network: -4, sanity: -3 }, 60],
      ['Bạn vắng mặt. Hội đồng bỏ phiếu thay và ghi tên bạn trong cột vắng.', 'You are absent. The council votes without you and logs your name in the absent column.', { rep: -2 }]]
  ],
  Ring: [
    ['m_apex_ring_masterpiece', 'Ring', '[Kiệt tác cuối của một Maestro] Một Maestro già qua đời để lại tác phẩm dang dở. Phòng trưng bày muốn một Grand Curator hoàn thành nó, vì ai cũng biết chỉ một người đủ hiểu ông ấy. Cả bản phác họa lẫn bản nháp đều đang đặt trên bàn của bạn.', '[A Maestro’s last piece] An aged Maestro dies leaving a work unfinished. The gallery wants a Grand Curator to complete it, because everyone knows only one person understood him well enough. The sketch and the drafts lie together on your desk.',
      ['Hoàn thiện theo đúng phác họa gốc', 'Complete it exactly as the original sketch', 'Tác phẩm được trưng bày dưới tên cả hai người. Phòng trưng bày ghi rằng không ai thấy chỗ nối.', 'The work is displayed under both names. The gallery notes that no one can see the join.', { merit: 5, rep: 4, sanity: -4 }],
      ['Thay đổi một chi tiết lớn theo ý bạn', 'Change one major detail by your own judgment', 'Khán giả đứng rất lâu trước tác phẩm. Một nhà phê bình viết rằng đây là lần đầu họ thấy bạn khác thầy mình, và họ thích điều đó.', 'The viewers stand a long while before the piece. A critic writes it is the first time you differ from your teacher, and they like it.', { merit: 11, rep: 7, sanity: -7 }, 'Thay đổi đó khiến vài người gọi tác phẩm là sự phản bội. Bạn bảo vệ nó, nhưng buổi triển lãm lạnh hơn dự kiến.', 'The change leads a few to call the work a betrayal. You defend it, but the exhibition is colder than planned.', { rep: -2, sanity: -8 }, 58],
      ['Bạn từ chối. Phòng trưng bày để dở dang tác phẩm trong kho.', 'You decline. The gallery leaves the work unfinished in storage.', { sanity: -2 }]],
    ['m_apex_ring_forgery_ring', 'Ring', '[Tay làm giả ngang tầm] Một bản sao của một tác phẩm nổi tiếng được bán ở chợ ngầm. Bản sao tốt đến mức bạn mất một đêm mới phân biệt được. Người làm ra nó cùng tầm kỹ năng với bạn, và đang đợi bạn tìm thấy.', '[A forger of equal skill] A copy of a famous work is sold at an underground market. It is so good that it takes you a night to tell them apart. Whoever made it matches your skill, and is waiting for you to find them.',
      ['Lần theo nguồn vật liệu và báo cho phòng trưng bày', 'Trace the materials to their source and report to the gallery', 'Bạn xác định được xưởng. Phòng trưng bày xử lý phần còn lại, và ghi nhận mắt nhìn của bạn.', 'You identify the workshop. The gallery handles the rest, and records your eye.', { merit: 5, rep: 3, sanity: -4 }],
      ['Đến xưởng và gặp người đó mặt đối mặt', 'Go to the workshop and meet the forger face to face', 'Người đó mời bạn ngồi, và hai người nói về ánh sáng suốt đêm. Sáng ra họ đồng ý ngừng bán các bản sao.', 'The forger invites you to sit, and you speak of light until dawn. By morning they agree to stop selling copies.', { merit: 10, rep: 6, network: 3, sanity: -3 }, 'Người đó từ chối nói gì. Xưởng bị đốt trước khi bạn kịp đưa người bảo vệ tới, và bằng chứng mất hết.', 'The forger refuses to speak. The workshop is burned before you can bring guards, and the evidence is lost.', { rep: -2, sanity: -8, heat: 3 }, 56],
      ['Bạn để việc cho phòng điều tra. Bản sao vẫn được bán thêm hai tháng.', 'You leave it to the investigators. The copies keep selling for two more months.']]
  ],
  Pinky: [
    ['m_apex_pinky_sovereign_duel', 'Pinky', '[Lời thách đấu từ ngoài tường] Một kiếm khách không thuộc Finger nào, nổi tiếng ngoài Outskirts, gửi tới một thanh kiếm gãy làm lời thách. Ông ta chỉ muốn đánh một trận với người được gọi là Sovereign. Không có tiền thưởng, chỉ có một thanh kiếm gãy.', '[A challenge from beyond the wall] A swordsman belonging to no Finger, known in the Outskirts, sends a broken blade as challenge. He wants only one bout with the one called Sovereign. There is no prize, only the broken blade.',
      ['Nhận trận đấu và đánh theo nghi lễ thanh kiếm', 'Accept the bout and fight by the sword’s ritual', 'Hai người đứng đối diện lâu hơn thời gian đánh. Cuối cùng ông ta cúi đầu, cầm lại thanh kiếm gãy và rời đi.', 'You face each other longer than you fight. In the end he bows, takes back the broken blade and leaves.', { merit: 6, rep: 4, health: -6 }],
      ['Đánh để kết thúc, không để ông ta bước chân thứ ba', 'Fight to end it before he takes a third step', 'Bạn thắng bằng một nhát. Ông ta mỉm cười khi ngã, nói đó là điều ông tìm. Pinky ghi tên bạn vào sổ.', 'You win with one stroke. He smiles as he falls and says it is what he sought. The Pinky enters your name in the book.', { merit: 12, rep: 7, health: -9 }, 'Ông ta mạnh hơn lời đồn. Bạn thắng sát nút, và Pinky ghi rằng Sovereign suýt thua một kiếm khách vô danh.', 'He is stronger than the rumour. You win by a hair, and the Pinky records that the Sovereign nearly lost to a nameless swordsman.', { health: -18, rep: 0, sanity: -3 }, 55],
      ['Bạn gửi trả thanh kiếm gãy. Ông ta không nhắn lại.', 'You send back the broken blade. He does not reply.', { rep: -2 }]],
    ['m_apex_pinky_oath_inheritance', 'Pinky', '[Lời thề của người đã mất] Một Star of the Sky để lại một lời thề chưa trả khi qua đời. Người thừa kế là một đứa trẻ, và lời thề chỉ có thể trả bởi một thanh kiếm tương xứng. Pinky muốn Sovereign đứng ra thay.', '[A dead man’s oath] A Star of the Sky leaves an unpaid oath when they die. The heir is a child, and the oath can only be paid by a blade of equal weight. The Pinky wants the Sovereign to stand in.',
      ['Thay mặt trả lời thề theo đúng nghi thức', 'Pay the oath on their behalf, by the proper rite', 'Lời thề được trả trước hội đồng. Đứa trẻ đứng cạnh bạn suốt buổi mà không nói gì.', 'The oath is paid before the council. The child stands beside you the whole time and says nothing.', { merit: 5, rep: 4, sanity: -3 }],
      ['Đối mặt với kẻ mà lời thề nhắm tới và kết thúc việc ấy', 'Face the one the oath was aimed at and end it', 'Kẻ ấy ngã trước khi nói xong lời cuối. Pinky đọc tên bạn cùng tên người đã mất khi ghi sổ.', 'They fall before finishing their last words. The Pinky reads your name beside the dead one’s as it enters the book.', { merit: 11, rep: 7, health: -9 }, 'Kẻ ấy có đồng minh mà lời thề không tính tới. Bạn thoát được, nhưng lời thề còn dở dang.', 'The target has allies the oath did not count. You escape, but the oath is left half-paid.', { health: -16, sanity: -6, rep: 0 }, 56],
      ['Bạn chuyển lời thề cho một Sworn Blade trẻ. Pinky ghi bạn không đứng ra.', 'You pass the oath to a young Sworn Blade. The Pinky notes you did not stand in.', { rep: -2 }]]
  ]
};

export const APEX_FINGER_MINORS = Object.values(FINGER_APEX).flatMap((rows) =>
  rows.map(([id, name, vi, en, steady, gamble, declined]) => finger(id, name, vi, en, steady, gamble, declined)));

export const APEX_MINORS = [...APEX_COLOR_MINORS, ...APEX_FINGER_MINORS];

// Longer arcs for a Color, one at a time, each closing on a flag so the story does not repeat.
export const APEX_COLOR_EVENTS = [
  {
    id: 'color_challenger_duel', age: [32, 95], jobs: ['Fixer'], major: true, weight: 8,
    requires: ['ColorFixer'], forbids: ['color_challenger_done'],
    vi: '[Người đòi tên bạn] Một Fixer trẻ vừa lên Grade 1 gửi đến một lá thư viết tay, ngắn, từng chữ đều đặn. Họ không xin gì ngoài một cuộc đấu có người chứng kiến, và họ nói họ sẽ chờ bao lâu cũng được. Hana đã đọc thư trước bạn.',
    en: '[One who asks for your name] A young Fixer who has just reached Grade 1 sends a short handwritten letter, every character even. They ask for nothing beyond a bout with witnesses, and say they will wait as long as it takes. Hana has read the letter before you.',
    choices: [
      { labelVi: 'Nhận trận, trước công chúng', labelEn: 'Accept the bout, in public',
        need: { stat: { health: [45, 100] } },
        outcomes: [
          { w: 64, effects: { rep: 9, network: 4, health: -8 }, meritAdd: 24, flagsAdd: ['color_challenger_done'],
            resultVi: 'Bạn thắng, nhưng bạn thấy tay mình run nhẹ ở nhịp cuối. Người trẻ đứng dậy, cúi đầu và nói đây là điều họ cần biết. Khán đài ghi nhận bạn vẫn còn đứng đầu.',
            resultEn: 'You win, but you notice a slight tremor in your hand at the final beat. The young one rises, bows, and says this was what they needed to know. The stands note that you are still on top.' },
          { w: 36, effects: { rep: -3, health: -22, sanity: -6 }, meritAdd: 10, flagsAdd: ['color_challenger_done'], scarsAdd: ['Nhát chém của người kế vị'],
            resultVi: 'Họ chạm được bạn một lần, đủ sâu để mọi người trên khán đài thấy. Bạn thắng sau đó, nhưng không ai cổ vũ lâu như trước.',
            resultEn: 'They land one touch on you, deep enough for everyone in the stands to see. You win afterward, but nobody cheers as long as they used to.' }
        ] },
      { labelVi: 'Nhận trận, nhưng ở một nơi kín', labelEn: 'Accept the bout, in a private place',
        effects: { rep: 3, sanity: 2 }, meritAdd: 10, flagsAdd: ['color_challenger_done'],
        resultVi: 'Bạn chọn một sân trống ở cuối khu Hana. Hai người đánh trong im lặng, và không ai chép lại kết quả. Khi ra khỏi sân, người trẻ nói họ sẽ giữ bí mật.',
        resultEn: 'You choose an empty yard at the far end of Hana’s grounds. The two of you fight in silence and nobody records the result. As you leave, the young one says they will keep the secret.' },
      { labelVi: 'Từ chối, giới thiệu họ cho một Color khác', labelEn: 'Decline and refer them to another Color',
        effects: { rep: -4, sanity: 3 }, flagsAdd: ['color_challenger_done'],
        resultVi: 'Bạn viết một lá thư lịch sự gửi lại. Người trẻ không nói gì, nhưng một tuần sau, tên họ xuất hiện cạnh tên một Color khác trên bảng thông báo của Hana.',
        resultEn: 'You write a polite letter back. The young one says nothing, but a week later their name appears beside another Color’s on Hana’s notice board.' }
    ]
  },
  {
    id: 'color_nightmare_hunt', age: [34, 95], jobs: ['Fixer'], major: true, weight: 8,
    requires: ['ColorFixer'], forbids: ['color_hunt_done', 'color_nightmare_hunt_done'],
    vi: '[Cuộc săn của các Color] Một Urban Star đang thành hình ở phía bắc, chưa tên, chưa được ghi vào sổ. Hana tập hợp mọi Color còn đủ sức. Các Section nói rõ rằng nếu thứ đó chạm tới khu dân cư, họ sẽ không có thời gian chọn người khác.',
    en: '[The Colors’ hunt] An Urban Star is forming in the north, unnamed and unregistered. Hana gathers every Color still fit to fight. The Sections state plainly that if the thing reaches a residential ward, there will be no time to choose anyone else.',
    choices: [
      { labelVi: 'Đứng ở tuyến đầu cùng các Color khác', labelEn: 'Stand at the front line with the other Colors',
        need: { stat: { health: [55, 100], sanity: [45, 100] } },
        outcomes: [
          { w: 62, effects: { health: -22, sanity: -12, wealth: 30, rep: 14, resonance: 8 }, meritAdd: 70, flagsAdd: ['color_hunt_done', 'color_nightmare_hunt_done'],
            resultVi: 'Bốn Color cùng đứng trên một con đường hẹp, và nhịp của cả bốn trùng nhau lần đầu trong nhiều năm. Thứ đó ngã khi mặt trời lên. Hana ghi cả bốn tên vào một dòng duy nhất.',
            resultEn: 'Four Colors stand on one narrow street, and their rhythms match for the first time in years. The thing falls as the sun rises. Hana enters all four names on a single line.' },
          { w: 38, effects: { health: -38, sanity: -22, wealth: 16, rep: 6, resonance: 12 }, meritAdd: 30, flagsAdd: ['color_hunt_done', 'color_nightmare_hunt_done'], scarsAdd: ['Vết cắt của một ngôi sao chưa tên'],
            resultVi: 'Thứ đó ngã cuối cùng, nhưng một Color trong nhóm không đứng lại được. Bạn mang cái tên đó về Hana, và cái cúi đầu bạn dành cho nó kéo dài hơn lệ thường.',
            resultEn: 'The thing falls at last, but one Color in the group does not get up. You carry that name back to Hana, and the bow you give it lasts longer than custom.' }
        ] },
      { labelVi: 'Giữ tuyến sau, bảo vệ khu dân cư', labelEn: 'Hold the rear line and protect the residential ward',
        effects: { health: -8, sanity: -4, rep: 6, network: 4 }, meritAdd: 22, flagsAdd: ['color_hunt_done', 'color_nightmare_hunt_done'],
        resultVi: 'Bạn đứng suốt đêm ở đầu phố và không thấy trận chiến nào. Sáng ra, những người dân bước ra cửa và thấy bạn vẫn đứng đó. Một đứa trẻ đưa cho bạn một ly nước.',
        resultEn: 'You stand at the head of the street all night and see none of the fight. At dawn the residents step out and find you still there. A child hands you a cup of water.' },
      { labelVi: 'Từ chối, nói rằng bạn đã hết vai trò đứng ở tuyến đầu', labelEn: 'Decline, saying your days on the front line are over',
        effects: { rep: -5, sanity: 2 }, flagsAdd: ['color_hunt_done', 'color_nightmare_hunt_done'],
        resultVi: 'Hana ghi bạn vào mục dự bị và không có ai tỏ ra thất vọng. Đêm đó bạn nghe tiếng pháo từ phía bắc, và ngồi nghe tới khi nó dừng.',
        resultEn: 'Hana notes you as reserve, and no one appears disappointed. That night you hear artillery from the north and sit listening until it stops.' }
    ]
  },
  {
    id: 'color_section_ruling', age: [36, 95], jobs: ['Fixer'], major: true, weight: 7,
    requires: ['ColorFixer'], forbids: ['color_ruling_done'],
    vi: '[Phiếu của một Color] Các Section của Hana bất đồng về việc nới quyền cho Office nhỏ nhận Request cấp cao. Mỗi bên nghĩ phiếu của một Color sẽ khép tranh luận. Không bên nào hỏi bạn nghĩ gì, chỉ hỏi bạn sẽ bỏ phiếu thế nào.',
    en: '[A Color’s vote] Hana’s Sections disagree on loosening the rule that lets small Offices take high-grade Requests. Each side thinks a Color’s vote will close the debate. Neither asks what you think, only how you will vote.',
    choices: [
      { labelVi: 'Bỏ phiếu mở rộng cho Office nhỏ', labelEn: 'Vote to open it to the small Offices',
        effects: { rep: 5, network: 8, wealth: -4 }, meritAdd: 14, flagsAdd: ['color_ruling_done', 'ColorSmallOfficeAlly'],
        resultVi: 'Quy tắc được nới. Nhiều Office nhỏ treo tên bạn trên cửa như một lời cảm ơn. Vài Association lớn bắt đầu gọi bạn là người của phía dưới.',
        resultEn: 'The rule is loosened. Several small Offices hang your name by their door as thanks. A few large Associations start calling you one of the lower people.' },
      { labelVi: 'Bỏ phiếu giữ nguyên quy tắc', labelEn: 'Vote to keep the rule as it stands',
        effects: { rep: 3, network: 4, wealth: 10, sanity: -3 }, meritAdd: 10, flagsAdd: ['color_ruling_done', 'ColorAssociationAlly'],
        resultVi: 'Quy tắc được giữ. Các Association lớn gửi đến hộp trà và một lời mời ăn tối. Bạn nhận ra mình không còn nhớ lần cuối ăn ở một Office nhỏ.',
        resultEn: 'The rule is kept. The large Associations send boxes of tea and a dinner invitation. You realize you cannot recall the last time you ate at a small Office.' },
      { labelVi: 'Bỏ phiếu trắng và ghi rõ lý do', labelEn: 'Abstain and state your reason',
        effects: { rep: -2, sanity: 4, network: -2 }, flagsAdd: ['color_ruling_done'],
        resultVi: 'Phiếu trắng của bạn được đọc to. Cả phòng im một lúc, rồi các Section quay sang nhau và quyết định theo cách của họ.',
        resultEn: 'Your blank ballot is read aloud. The room goes quiet a moment, then the Sections turn to one another and decide in their own way.' }
    ]
  },
  {
    id: 'color_long_shadow', age: [55, 110], jobs: ['Fixer'], major: true, weight: 7,
    requires: ['ColorFixer'], forbids: ['color_shadow_done'],
    vi: '[Cái bóng dài của một cái tên] Tên bạn đã được nhắc ở các quán ăn lâu hơn nhiều thế hệ Fixer. Hana gửi một người đến hỏi bạn muốn tên mình được ghi vào lịch sử như thế nào, và nói rằng việc đó vẫn còn quyết định được trong vài năm nữa.',
    en: '[The long shadow of a name] Your name has been spoken in diners longer than several generations of Fixers have worked. Hana sends someone to ask how you want it recorded in history, and says that you still have a few years to decide.',
    choices: [
      { labelVi: 'Cho phép viết tiểu sử và tuyển dụng người kế nhiệm', labelEn: 'Allow a biography and name your successors',
        effects: { rep: 8, network: 8, wealth: 8, sanity: 3 }, meritAdd: 20, flagsAdd: ['color_shadow_done', 'ColorLegacy'],
        resultVi: 'Bạn dành nhiều buổi chiều kể chuyện cho một người viết sử trẻ. Người ấy hỏi nhiều điều bạn đã quên, và bạn nhận ra mình nhớ những khoảnh khắc nhỏ hơn bạn nghĩ.',
        resultEn: 'You spend many afternoons telling stories to a young chronicler. They ask about many things you had forgotten, and you realize you remember the small moments more than you thought.' },
      { labelVi: 'Từ chối, để người ta tự đoán', labelEn: 'Refuse and let others guess',
        effects: { rep: 4, sanity: 5, network: -2 }, flagsAdd: ['color_shadow_done'],
        resultVi: 'Người của Hana gật đầu như đã đoán trước, rồi viết gì đó vào sổ. Bạn tự hỏi liệu lần sau người ta sẽ hỏi bạn hay hỏi người khác về bạn.',
        resultEn: 'Hana’s messenger nods as though expecting it and writes something in a notebook. You wonder whether next time they will ask you, or ask someone else about you.' }
    ]
  }
];
