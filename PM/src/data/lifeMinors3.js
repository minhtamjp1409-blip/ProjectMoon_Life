// ============================================================================
// DISTRICTS 5, 15 AND 26, AND LIFE AFTER DISTORTION: daily lines and minor choices.
// E Corp and O Corp have no official lore yet, so their Singularities here are
// this game's adaptation (marked `adapted` in worldData). District 26 keeps to
// the one canon fact: it exists and is not on the map.
// Same shapes as lifeDailies.js and lifeMinors.js.
// ============================================================================

const D = (id, age, need, vi, en, fx = {}, extra = {}) => ({ id, age, need, vi, en, fx, ...extra });
const M = (id, age, need, vi, en, choices, ignore, extra = {}) => ({ id, age, need, vi, en, choices, ignore, ...extra });
const C = (vi, en, rvi, ren, fx = {}, extra = {}) => ({ vi, en, rvi, ren, fx, ...extra });
const O = (w, rvi, ren, fx = {}, extra = {}) => ({ w, rvi, ren, fx, ...extra });
const I = (rvi, ren, fx = {}, extra = {}) => ({ vi: 'Để nó trôi qua', en: 'Let it pass', rvi, ren, fx, ...extra });

const INF = [0, 3];
const CHILD = [7, 11];
const TEEN = [12, 17];
const GROWN = [18, 140];
const ANY = [4, 140];

const E = { regions: ['E'] };
const O15 = { regions: ['O'] };
const Z = { regions: ['Z'] };
const DIST = { flags: ['Distorted'] };

export const LIFE_DAILIES_3 = [
  // ----------------------------------------------- District 5, no night
  D('r_e_cloth', INF, E, 'Mẹ bạn khâu một dải vải đen để buộc lên mắt bạn mỗi khi ngủ. Ở District 5, đó là món quà đầu đời của mọi đứa trẻ.', 'Your mother sewed a strip of black cloth to tie over your eyes when you slept. In District 5 it is every child’s first gift.', { sanity: 1 }),
  D('r_e_moon', CHILD, E, 'Trẻ con ở District 5 học vẽ mặt trời trước khi học vẽ nhà. Cô giáo bảo cả lớp vẽ mặt trăng, và không đứa nào biết bắt đầu từ đâu.', 'Children in District 5 learn to draw the sun before they learn to draw a house. The teacher asked the class to draw the moon, and no one knew where to start.', { sanity: -1 }),
  D('r_e_dark_room', GROWN, E, 'Bạn trả 2 Ahn cho bốn giờ trong một phòng ngủ cách sáng. Bạn ngủ được ba giờ. Giờ còn lại bạn nằm mở mắt trong bóng tối, vì đã trả tiền rồi.', 'You paid 2 Ahn for four hours in a lightproof sleeping room. You slept three. The last hour you lay awake in the dark, because you had paid for it.', { wealth: -2, health: 3 }),
  D('r_e_harvest', GROWN, E, 'Ruộng trong nhà của E Corp thu hoạch lần thứ năm trong năm. Giá rau không giảm. Chỉ có những người làm ruộng là gầy đi.', 'E Corp’s indoor fields brought in their fifth harvest of the year. The price of greens didn’t drop. Only the people working the fields got thinner.', { wealth: 1, health: -1 }),
  D('r_e_flicker', ANY, E, 'Ánh sáng trên trời chập chờn bốn phút vì một sự cố. Cả phố đứng im. Có người khóc, có người chửi, có một đứa bé vỗ tay.', 'The light in the sky flickered for four minutes after a fault. The whole street stood still. Someone cried, someone swore, a small child clapped.', { sanity: -1, resonance: 2 }),

  // ----------------------------------------------- District 15, signatures with a pulse
  D('r_o_record', INF, O15, 'Giấy khai sinh của bạn có bảy điều khoản. Điều thứ năm ghi rằng cha mẹ bạn có nghĩa vụ nuôi bạn đến mười hai tuổi. Sau đó thì không ghi gì.', 'Your birth record has seven clauses. The fifth says your parents are bound to raise you until twelve. After that it says nothing.', { sanity: -1 }),
  D('r_o_lawyer_kid', CHILD, O15, 'Đứa được cả lớp nể nhất là con của một luật sư hợp đồng. Nó đọc được chữ in nhỏ từ năm sáu tuổi và không bao giờ cho ai mượn bút.', 'The most admired kid in class is a contract lawyer’s child. They could read fine print at six and never lend anyone a pen.', { network: 1 }),
  D('r_o_first_sign', TEEN, O15, 'Mười hai tuổi là tuổi được ký hợp đồng đầu tiên. Cha mẹ bắt bạn đọc to từng điều khoản của một tờ giấy mẫu trước khi cho cầm bút.', 'Twelve is the age of your first contract. Your parents made you read every clause of a sample sheet aloud before you were allowed to hold the pen.', { sanity: 1, network: 1 }),
  D('r_o_neighbor_voice', ANY, O15, 'Ông hàng xóm trễ hạn trả nợ ba ngày. Sáng nay ông mất giọng, đúng như điều khoản số 9. Ông viết lên tấm bảng treo trước cửa: "Tôi vẫn ổn."', 'The old man next door was three days late on a debt. This morning he lost his voice, exactly as clause 9 said. He wrote on a board by his door: “I’m fine.”', { sanity: -2 }),
  D('r_o_lease', GROWN, O15, 'Hợp đồng thuê nhà của bạn dài 41 trang. Bạn đọc hết. Ở District 15, người không đọc hết sớm muộn cũng không còn đủ ngón tay để lật trang.', 'Your lease runs 41 pages. You read all of it. In District 15, people who don’t eventually run out of fingers to turn the pages.', { sanity: -1, network: 1 }),

  // ----------------------------------------------- District 26, not on the map
  D('r_z_quiet', INF, Z, 'Đêm ở nơi bạn sinh ra rất yên. Không có còi của Wing, không có tiếng tàu. Người lớn bảo vì không ai biết đường đến đây.', 'Nights where you were born were very quiet. No Wing sirens, no trains. The adults said it was because no one knew the way here.', { sanity: 2 }),
  D('r_z_map', CHILD, Z, 'Thầy giáo treo bản đồ The City lên bảng. Bạn tìm mãi không thấy nhà mình. Thầy nói khẽ: "Đừng tìm nữa."', 'The teacher hung a map of the City on the board. You searched and searched for home. The teacher said quietly: “Stop looking.”', { sanity: -1, resonance: 1 }),
  D('r_z_letter', GROWN, Z, 'Bạn gửi thư cho một người quen ở District 11. Ba tuần sau thư quay về, phong bì còn nguyên, đóng dấu: "Không xác định được địa chỉ người gửi."', 'You sent a letter to someone in District 11. Three weeks later it came back unopened, stamped: “Sender’s address could not be determined.”', { network: -1, sanity: -1 }),
  D('r_z_directions', ANY, Z, 'Một người lạ hỏi bạn đường về District 26. Bạn chỉ cho họ. Khi họ quay lưng đi, bạn không nhớ nổi mình vừa chỉ hướng nào.', 'A stranger asked you the way to District 26. You told them. As they turned away, you couldn’t remember which way you had pointed.', { resonance: 2 }),

  // ----------------------------------------------- after Distortion
  D('d_dist_mirror', ANY, DIST, 'Bạn không còn soi gương. Không phải vì sợ, mà vì thứ trong gương cứ chậm hơn bạn nửa nhịp.', 'You don’t look in mirrors anymore. Not out of fear, but because the thing in the glass moves half a beat behind you.', { sanity: -1, resonance: 1 }),
  D('d_dist_hunger', ANY, DIST, 'Bạn vẫn ăn, nhưng không thấy no. Cơn đói thật chỉ dịu xuống khi bạn ở gần thứ đã làm bạn biến dạng.', 'You still eat, but you are never full. The real hunger only eases when you are near the thing that distorted you.', { health: 2, sanity: -1 }),
  D('d_dist_rhyme', ANY, DIST, 'Trẻ con trong khu đặt cho bạn một cái tên. Chúng hát nó khi nhảy dây, và không biết bạn đang nghe.', 'The kids on the block have given you a name. They sing it skipping rope, not knowing you can hear.', { rep: 1, sanity: -1 }),
  D('d_dist_notice', ANY, DIST, 'Hana dán thông báo về bạn lên bảng tin của Office gần nhất. Bức vẽ không giống bạn chút nào, và điều đó còn đáng sợ hơn.', 'Hana posted a notice about you on the nearest Office’s board. The drawing looks nothing like you, which is worse.', { heat: 2 }),
  D('d_dist_hour', ANY, DIST, 'Có những giờ bạn trở lại hình người, thường là lúc gần sáng. Bạn dùng chúng để viết ra tên những người bạn còn nhớ. Danh sách mỗi tháng một ngắn hơn.', 'There are hours when your human shape comes back, usually near dawn. You spend them writing down the names you still remember. The list gets shorter every month.', { sanity: 2, network: -1 })
];

export const LIFE_MINORS_3 = [
  // ----------------------------------------------- District 5
  M('m3_e_dark_inn', [16, 60], E, 'Một nhà trọ cách sáng cần người trực ca. Lương thấp, nhưng hết ca được ngủ miễn phí trong một phòng tối.', 'A lightproof inn needs someone on shift. The pay is poor, but after each shift you sleep free in a dark room.', [
    C('Nhận việc', 'Take the job', null, null, { wealth: 3, health: 4 }, { out: [
      O(65, 'Bạn ngủ ngon nhất đời trong năm đó. Bạn cũng học được cách không hỏi khách thuê bóng tối để làm gì.', 'You slept better that year than ever in your life. You also learned not to ask guests what they rent darkness for.', { sanity: 2 }),
      O(35, 'Một đêm, phòng 6 trả muộn. Bạn mở cửa. Bạn không kể cho ai, và bạn nghỉ việc trước khi họ phát hiện ra bạn đã thấy.', 'One night room 6 checked out late. You opened the door. You told no one, and you quit before they found out you had seen.', { sanity: -7, heat: 3 }, { mem: 'dark_inn' })
    ] }),
    C('Không nhận', 'Turn it down', 'Bạn tiếp tục ngủ với dải vải đen trên mắt.', 'You kept sleeping with the black cloth over your eyes.', { health: -1 })
  ], I('Bạn đi ngang qua tấm biển tuyển người.', 'You walked past the sign.')),

  M('m3_e_blackout', [10, 80], E, 'Ánh sáng trên trời tắt hẳn mười một phút. Lần đầu tiên trong đời bạn thấy bóng tối ngoài đường. Trong mười một phút đó, cả khu phố như phát điên.', 'The light in the sky went out for eleven minutes. For the first time in your life you saw darkness outdoors. For those eleven minutes the whole neighborhood went mad.', [
    C('Đứng yên và nhìn lên', 'Stand still and look up', null, null, {}, { out: [
      O(60, 'Có những đốm sáng nhỏ trên cao mà bạn chưa từng thấy. Bạn đứng nhìn đến khi đèn trời bật lại và mắt bạn rát.', 'There were small points of light high up that you had never seen. You stared until the sky came back on and your eyes burned.', { sanity: 4, resonance: 4 }),
      O(40, 'Có người giật túi bạn trong bóng tối và đạp bạn ngã. Khi đèn bật lại, bạn chỉ thấy máu trên tay mình.', 'Someone tore your bag away in the dark and kicked you down. When the light came back, all you saw was blood on your hands.', { wealth: -4, health: -4 })
    ] }),
    C('Chạy về nhà, khóa cửa', 'Run home and lock the door', 'Bạn ngồi sau cánh cửa, nghe tiếng kính vỡ ngoài phố. Mười một phút dài hơn cả một ngày.', 'You sat behind the door listening to glass break in the street. Eleven minutes lasted longer than a day.', { sanity: -2 }),
    C('Theo đám đông đập cửa hàng', 'Join the crowd breaking into shops', 'Bạn mang về một túi đồ hộp và một vết cắt ở cổ tay. Tuần sau, camera của E Corp bắt đầu gõ cửa từng nhà.', 'You came home with a bag of tins and a cut on your wrist. The next week, E Corp started knocking door to door with camera footage.', { wealth: 6, health: -2, heat: 6, rep: -2 }, { mem: 'blackout_loot', motif: { greed: 1 } })
  ], I('Bạn nhắm mắt lại cho đến khi trời sáng trở lại.', 'You kept your eyes shut until the light returned.'), { once: true, tags: ['danger'] }),

  M('m3_e_bottled_night', [14, 90], E, 'Một người bán rong rao "đêm đóng chai": một lọ thủy tinh sơn đen, mở nắp ra thì tối được năm phút. Ba Ahn một lọ.', 'A street seller is hawking “bottled night”: a jar painted black that gives five minutes of dark when opened. Three Ahn a jar.', [
    C('Mua một lọ', 'Buy a jar', null, null, { wealth: -3 }, { out: [
      O(70, 'Nó có tác dụng thật. Năm phút đó là năm phút ngủ sâu nhất của bạn trong năm.', 'It really worked. Those five minutes were the deepest sleep you had all year.', { sanity: 4, health: 2 }),
      O(30, 'Trong năm phút tối đó, bạn nghe thấy có thứ gì thở ngay cạnh tai. Khi ánh sáng trở lại, lọ đã trống và nắp đã đóng.', 'In those five dark minutes you heard something breathing right by your ear. When the light returned the jar was empty and the lid was shut.', { sanity: -5, resonance: 6 })
    ] }),
    C('Hỏi ông ta lấy bóng tối ở đâu', 'Ask him where the dark comes from', 'Ông ta cười, cất hàng, và đi về phía Backstreets. Ngày hôm sau ông không còn ở góc phố đó nữa.', 'He laughed, packed up, and walked off toward the Backstreets. The next day he wasn’t on that corner anymore.', { resonance: 2 })
  ], I('Bạn đi tiếp, tay che mắt.', 'You walked on, hand over your eyes.')),

  // ----------------------------------------------- District 15
  M('m3_o_cosign', [18, 70], { ...O15, npc: 'friend' }, '{friend} nhờ bạn ký bảo lãnh khoản vay của họ bằng mực O Corp. Nếu {friend} không trả được, điều khoản phạt sẽ thi hành lên người bảo lãnh.', '{friend} asked you to guarantee their loan in O Corp ink. If {friend} can’t pay, the penalty clause executes on the guarantor.', [
    C('Ký', 'Sign', '{friend} ôm bạn rất lâu. Bạn đọc lại điều khoản phạt ba lần trên đường về: "mất một ngón tay, do bên bảo lãnh chọn".', '{friend} hugged you for a long time. You reread the penalty clause three times on the way home: “loss of one finger, guarantor’s choice.”', { network: 2 }, { bond: { friend: 10 }, mem: 'cosigned', motif: { loyalty: 1 }, later: [{ id: 'm3_o_cosign_due', years: 3, reasonVi: 'Bạn đã ký bảo lãnh cho {friend}', reasonEn: 'You guaranteed {friend}’s loan' }] }),
    C('Từ chối', 'Refuse', '{friend} gật đầu, nói "Tao hiểu." Từ đó họ không nhờ bạn việc gì nữa.', '{friend} nodded and said, “I get it.” They never asked you for anything again.', {}, { bond: { friend: -10 } })
  ], I('Bạn nói sẽ suy nghĩ. {friend} tìm người khác.', 'You said you’d think about it. {friend} found someone else.', {}, { bond: { friend: -4 } }), { tags: ['npc'] }),

  M('m3_o_cosign_due', [20, 80], { mem: 'cosigned', npc: 'friend' }, 'Đến hạn. {friend} không trả được. Tờ hợp đồng trong ngăn kéo của bạn bắt đầu ấm lên.', 'The loan is due. {friend} can’t pay. The contract in your drawer has started to feel warm.', [
    C('Trả thay bằng toàn bộ tiền dành dụm', 'Pay it with everything you’ve saved', '{friend} không nói được gì. Họ đến nhà bạn mỗi tối suốt một tháng, chỉ để ngồi đó.', '{friend} couldn’t say a word. They came over every evening for a month, just to sit there.', { wealth: -15 }, { bond: { friend: 12 } }),
    C('Để điều khoản thi hành', 'Let the clause execute', null, null, { health: -8, sanity: -4 }, { scar: 'Mất ngón út tay trái', out: [
      O(55, 'Bạn chọn ngón út tay trái. Nó rơi xuống bàn lúc nửa đêm, không chảy giọt máu nào. {friend} quỳ trước cửa nhà bạn đến sáng.', 'You chose the left little finger. It fell onto the table at midnight without a drop of blood. {friend} knelt outside your door until morning.', {}, { bond: { friend: 6 } }),
      O(45, 'Bạn chọn ngón út tay trái. Sáng hôm sau {friend} đã rời District 15, không để lại lời nào.', 'You chose the left little finger. The next morning {friend} had left District 15 without a word.', {}, { npcFate: { friend: 'estranged' } })
    ] })
  ], I('Bạn không chọn. Hợp đồng chọn giúp bạn: ngón trỏ tay phải.', 'You didn’t choose. The contract chose for you: the right index finger.', { health: -10, sanity: -6 }, { scar: 'Mất ngón trỏ tay phải', bond: { friend: -6 } }), { once: true, tags: ['callback', 'npc'] }),

  M('m3_o_fine_print', [16, 70], O15, 'Một công ty tuyển người trả lương gấp đôi, hợp đồng ký bằng mực O Corp. Ở trang 30 có một dòng chữ nhỏ đến mức bạn đọc không ra.', 'A company is hiring at double pay, contract in O Corp ink. On page 30 there is a line so small you can’t read it.', [
    C('Ký luôn', 'Sign it', null, null, { wealth: 6 }, { out: [
      O(60, 'Không có gì xảy ra. Bạn làm hết năm và nhận đủ lương. Bạn vẫn không biết dòng chữ đó viết gì.', 'Nothing happened. You worked the year and were paid in full. You still don’t know what that line said.', { wealth: 4 }),
      O(40, 'Dòng chữ đó là "bên lao động nhượng lại một năm ký ức". Cuối năm bạn tỉnh dậy, và cả năm vừa qua là một khoảng trắng.', 'The line read “the worker cedes one year of memory.” At year’s end you woke up, and the whole year was blank.', { sanity: -8, resonance: 3 }, { mem: 'lost_year' })
    ] }),
    C('Thuê luật sư đọc giúp (5 Ahn)', 'Pay a lawyer to read it (5 Ahn)', 'Luật sư đọc xong, đặt kính xuống: "Đừng ký." Bà không lấy thêm tiền giải thích, và bạn không ký.', 'The lawyer finished reading and put down her glasses: “Don’t sign.” She charged nothing to explain, and you didn’t sign.', { wealth: -5, network: 2 }),
    C('Không ký', 'Don’t sign', 'Người tuyển dụng gạch tên bạn khỏi danh sách và gọi người kế tiếp.', 'The recruiter crossed your name off and called the next person.', {})
  ], I('Bạn để tờ hợp đồng lại trên bàn.', 'You left the contract on the table.')),

  // ----------------------------------------------- District 26
  M('m3_z_registry', [18, 80], Z, 'Bạn đi làm giấy tờ cư trú. Người nhân viên gõ tên bạn, nhíu mày, gõ lại, rồi đứng dậy đi gọi quản lý.', 'You went to register your residency. The clerk typed your name, frowned, typed it again, then got up to fetch a manager.', [
    C('Ngồi chờ', 'Wait', null, null, {}, { out: [
      O(50, 'Họ cấp cho bạn một hồ sơ mới. Ô nơi sinh ghi "không xác định". Từ nay bạn có thể đi làm như người khác.', 'They issued you a new record. The birthplace box says “undetermined.” From now on you can work like anyone else.', { network: 3, rep: 1 }),
      O(50, 'Hai người không đeo phù hiệu đưa bạn vào một căn phòng phía sau và hỏi về nơi bạn sinh ra suốt ba ngày. Bạn không trả lời được câu nào.', 'Two people without insignia took you to a back room and asked about your birthplace for three days. You couldn’t answer a single question.', { health: -3, sanity: -5, heat: 4 }, { mem: 'z_questioned' })
    ] }),
    C('Bỏ về, sống không giấy tờ', 'Leave and live without papers', 'Không có giấy tờ nghĩa là không ai thuê bạn đàng hoàng. Nó cũng có nghĩa là không ai tìm được bạn.', 'No papers means no one hires you properly. It also means no one can find you.', { wealth: -3, rep: -2, heat: -6 }, { mem: 'no_papers' })
  ], I('Bạn đứng dậy trước khi người quản lý tới.', 'You got up before the manager arrived.')),

  M('m3_z_go_back', [25, 90], Z, 'Bạn quyết định về thăm nơi mình sinh ra. Bạn lên tàu, xuống đúng ga, và đứng ở cửa ga rất lâu, vì không biết phải đi hướng nào.', 'You decided to visit where you were born. You took the train, got off at the right station, and stood at the exit a long time, not knowing which way to go.', [
    C('Hỏi người qua đường', 'Ask a passerby', null, null, {}, { out: [
      O(60, 'Không ai biết. Một người còn hỏi lại bạn: "District nào cơ?" Bạn đi chuyến tàu cuối về.', 'No one knew. One person asked you back, “Which District?” You took the last train home.', { sanity: -4 }),
      O(40, 'Một bà cụ nắm tay bạn và dẫn đi. Bạn tỉnh dậy trên tàu về, giày dính bùn, trong túi có một tấm ảnh bạn lúc còn nhỏ mà bạn chưa thấy bao giờ.', 'An old woman took your hand and led you. You woke on the train back with mud on your shoes and a photo of yourself as a child in your pocket that you had never seen.', { sanity: 2, resonance: 7 }, { mem: 'z_photo' })
    ] }),
    C('Quay về', 'Go home', 'Bạn ngồi trên tàu về, cố nhớ tên con phố nhà mình. Bạn nhớ ra được chữ cái đầu.', 'On the train back you tried to remember the name of your street. You got as far as the first letter.', { sanity: -2 })
  ], I('Bạn không đi nữa.', 'You didn’t go after all.'), { once: true }),

  M('m3_z_uniforms', [14, 80], Z, 'Hai người mặc đồng phục không phù hiệu đi gõ cửa từng nhà, hỏi về "những người không có trong sổ". Nhà bên có một gia đình mới đến tháng trước.', 'Two people in uniforms without insignia went door to door asking about “people not in the ledger.” A family moved in next door last month.', [
    C('Nói thật', 'Tell the truth', null, null, { rep: 1 }, { out: [
      O(50, 'Họ ghi chép rồi đi. Gia đình nhà bên vẫn ở đó, và không biết bạn đã nói gì.', 'They took notes and left. The family next door is still there and doesn’t know what you said.', { sanity: -1 }),
      O(50, 'Tối hôm đó nhà bên tắt đèn sớm. Sáng ra căn hộ trống trơn, cả đồ đạc cũng không còn.', 'That evening the lights next door went out early. In the morning the flat was empty, furniture and all.', { sanity: -6 }, { motif: { violence: 1 } })
    ] }),
    C('Nói dối giúp hàng xóm', 'Lie for the neighbors', 'Họ nhìn bạn lâu hơn cần thiết, rồi ghi số cửa nhà bạn vào sổ. Tối đó nhà bên mang sang một nồi canh.', 'They looked at you longer than they needed to, then wrote your door number down. That evening the neighbors brought over a pot of soup.', { network: 3, heat: 4 }, { motif: { mercy: 1 } })
  ], I('Bạn không mở cửa. Họ ghi gì đó lên khung cửa bằng phấn.', 'You didn’t open the door. They chalked something on the frame.', { heat: 1 })),

  // ----------------------------------------------- after Distortion
  M('m3_dist_visit', ANY, { ...DIST, npc: 'friend' }, '{friend} tìm ra chỗ bạn trốn. Họ đứng ở cửa, tay cầm một túi đồ ăn, và cố không nhìn vào tay bạn.', '{friend} found where you were hiding. They stood in the doorway holding a bag of food, trying not to look at your hands.', [
    C('Cho họ vào', 'Let them in', null, null, {}, { out: [
      O(60, 'Hai người ngồi trên sàn, nói về những chuyện hồi nhỏ như chưa có gì xảy ra. Lúc {friend} về, bạn vẫn còn là bạn.', 'You sat on the floor and talked about when you were kids as if nothing had happened. When {friend} left, you were still yourself.', { sanity: 6 }, { bond: { friend: 8 } }),
      O(40, 'Bạn tỉnh lại trên sàn. {friend} không còn ở đó. Chỉ còn túi đồ ăn, và máu.', 'You came to on the floor. {friend} was gone. There was only the bag of food, and blood.', { sanity: -15, heat: 8 }, { npcFate: { friend: 'dead' }, motif: { violence: 1 } })
    ] }),
    C('Đuổi họ đi', 'Drive them away', 'Bạn gào lên bằng một giọng không còn là của bạn. {friend} lùi lại, đánh rơi túi đồ ăn, và chạy. Đó là điều tử tế nhất bạn làm được.', 'You screamed in a voice that wasn’t yours anymore. {friend} stumbled back, dropped the bag, and ran. It was the kindest thing you could do.', { sanity: -3 }, { bond: { friend: -15 }, motif: { mercy: 1 } })
  ], I('Bạn ngồi im trong bóng tối cho đến khi {friend} bỏ đi.', 'You sat still in the dark until {friend} gave up and left.', { sanity: -2 }, { bond: { friend: -5 } }), { once: true, tags: ['npc', 'danger'] }),

  M('m3_dist_fixers', ANY, DIST, 'Hai Fixer Grade 4 nhận request về bạn. Bạn nghe họ bàn kế hoạch ở đầu hẻm, và giọng một người đang run.', 'Two Grade 4 Fixers took a request on you. You can hear them planning at the mouth of the alley, and one of their voices is shaking.', [
    C('Đi trước khi họ vào', 'Leave before they come in', 'Bạn bỏ lại chỗ trốn thứ ba trong năm nay. Mỗi lần dời đi, bạn để lại thêm một thứ của con người cũ.', 'You abandoned your third hiding place this year. Each time you move, you leave behind one more thing from the person you were.', { heat: -8, network: -3, sanity: -2 }),
    C('Đợi họ', 'Wait for them', null, null, {}, { out: [
      O(55, 'Họ không trụ được lâu. Một người chạy thoát, người kia thì không. Request về bạn tăng giá gấp đôi.', 'They didn’t last long. One got away; the other didn’t. The price on the request doubled.', { heat: 12, rep: 3, sanity: -4 }, { motif: { violence: 1 } }),
      O(45, 'Họ đã chuẩn bị kỹ hơn bạn nghĩ. Bạn trốn thoát với một bên người cháy đen.', 'They came better prepared than you thought. You escaped with half your body burned.', { health: -25, heat: -6 })
    ] }),
    C('Bước ra và nói chuyện', 'Step out and talk', null, null, {}, { out: [
      O(30, 'Người có giọng run hạ vũ khí. Anh ta chụp một tấm ảnh làm bằng chứng, nói với Hana rằng bạn đã chết, và không bao giờ quay lại.', 'The one with the shaking voice lowered his weapon. He took a photo as proof, told Hana you were dead, and never came back.', { heat: -18, sanity: 5 }),
      O(70, 'Bạn mở miệng, nhưng thứ phát ra không phải tiếng người. Họ nổ súng.', 'You opened your mouth, but what came out was not a human sound. They opened fire.', { health: -15, heat: 5 })
    ] })
  ], I('Bạn để mọi chuyện đến đâu thì đến.', 'You let it come however it would.', { health: -10, heat: 4 }), { tags: ['danger'] }),

  M('m3_dist_old_home', ANY, DIST, 'Nửa đêm, bạn đứng trước căn nhà cũ. Đèn bếp vẫn sáng. Vẫn có người để đèn chờ bạn.', 'At midnight you stood outside your old home. The kitchen light was still on. Someone still leaves it on for you.', [
    C('Gõ cửa', 'Knock', null, null, {}, { out: [
      O(50, 'Một người già ra mở cửa, nhìn bạn rất lâu, rồi đặt một bát canh xuống bậc thềm và khép cửa lại. Bát canh vẫn còn ấm.', 'An old person opened the door, looked at you a long time, then set a bowl of soup on the step and closed the door. The soup was still warm.', { sanity: 6 }),
      O(50, 'Người mở cửa hét lên. Đèn cả dãy phố bật sáng, từng nhà một.', 'Whoever opened the door screamed. Lights came on down the whole street, one house at a time.', { sanity: -6, heat: 10 })
    ] }),
    C('Đứng nhìn một lúc rồi đi', 'Watch a while, then go', 'Bạn đứng đến khi đèn bếp tắt. Rồi bạn quay về hẻm, nhẹ nhõm và trống rỗng như nhau.', 'You stayed until the kitchen light went off. Then you went back to the alley, relieved and hollow in equal measure.', { sanity: -2, resonance: 2 })
  ], I('Bạn không đến gần.', 'You didn’t go near.'), { once: true }),

  M('m3_dist_hunger', ANY, DIST, 'Một tên Rat bị thương nằm trong con hẻm của bạn. Cơn đói đang nói to hơn mọi ý nghĩ.', 'A wounded Rat is lying in your alley. The hunger is louder than any thought.', [
    C('Ăn', 'Eat', 'Cơn đói im đi được ba ngày. Bạn cố không nhớ hắn đã nói gì lúc cuối.', 'The hunger went quiet for three days. You try not to remember what he said at the end.', { health: 12, sanity: -8, heat: 4 }, { motif: { violence: 1 } }),
    C('Kéo hắn ra đầu hẻm cho người khác tìm thấy', 'Drag him to the street where someone will find him', 'Bạn run suốt quãng đường. Sáng hôm sau, có người để một cái chăn ở đầu hẻm, không biết là cho ai.', 'You shook the whole way. The next morning someone left a blanket at the mouth of the alley, not knowing for whom.', { health: -4, sanity: 3 }, { motif: { mercy: 1 } })
  ], I('Bạn quay mặt vào tường đến khi trời sáng. Hắn đã bò đi.', 'You faced the wall until dawn. He had crawled away.', { sanity: -3 })),

  M('m3_dist_voice', ANY, { ...DIST, stat: { sanity: [0, 25] } }, 'Giọng nói ấy quay lại: "Em làm tốt lắm. Giờ thì đi xa hơn một chút nữa."', 'The voice came back: “You did so well. Now go a little further.”', [
    C('Đi xa hơn', 'Go further', 'Bạn không còn vừa căn phòng này nữa. Hana đổi hồ sơ của bạn từ "chưa xếp hạng" thành một con số.', 'You no longer fit in this room. Hana changed your file from “unrated” to a number.', { health: 15, sanity: -10, heat: 15, resonance: 10, rep: 4 }),
    C('Hỏi bà là ai', 'Ask who she is', 'Giọng nói cười, rồi im lặng suốt một năm. Đó là năm yên nhất của bạn kể từ khi biến dạng.', 'The voice laughed, then went silent for a year. It was your quietest year since the change.', { sanity: 4, resonance: 6 })
  ], I('Bạn bịt tai lại, dù biết nó không đến từ bên ngoài.', 'You covered your ears, knowing it wasn’t coming from outside.', { sanity: -2 }), { once: true, tags: ['callback'] })
];
