import { APEX_MINORS } from './apexPath.js';
import { APEX_COLOR_GENERATED, APEX_FINGER_GENERATED } from './apexCommissions.js';

// The general commissions are for careers still climbing. A Color or a top-rank Finger gets the apex set instead.
const climbing = (need) => ({
  ...need,
  ...(need.jobs?.includes('Fixer') ? { noFlags: ['ColorFixer'] } : {}),
  ...(need.jobs?.includes('Syndicate') ? { fingerRankAtMost: 2 } : {})
});

const task = (id, need, vi, en, steady, gamble, declined) => ({
  id, age: [15, 140], need: climbing(need), vi, en,
  careerOpportunity: true,
  allowDistorted: need.jobs?.includes('Distortion') || Boolean(need.finger),
  tags: ['career', 'merit'],
  choices: [
    { vi: steady[0], en: steady[1], rvi: steady[2], ren: steady[3], fx: steady[4] },
    {
      vi: gamble[0], en: gamble[1], rvi: '', ren: '', fx: {},
      out: [
        { w: 60, rvi: gamble[2], ren: gamble[3], fx: gamble[4] },
        { w: 40, rvi: gamble[5], ren: gamble[6], fx: gamble[7] }
      ]
    }
  ],
  ignore: { vi: 'Bỏ qua', en: 'Pass', rvi: declined[0], ren: declined[1], fx: {} }
});

const CLIMBING_MERIT_OPPORTUNITIES = [
  task('m_annual_fixer_shelter', { jobs: ['Fixer'] },
    '[Yêu cầu hộ tống] Một văn phòng nhỏ nhận đơn đưa ba cư dân qua hai con hẻm đang tranh chấp. Tiền ứng trước chỉ đủ trả một người.',
    '[Escort request] A small Office must move three residents through two disputed alleys. The advance pays for only one Fixer.',
    ['Đi cùng họ theo đường vòng', 'Take the longer route with them', 'Cả ba tới nơi. Bạn nộp biên bản hoàn thành, nhưng bàn chân đau nhức sau ca trực.', 'All three arrive. You file the completed request, with aching feet after the shift.', { merit: 4, health: -4, sanity: -2 }],
    ['Băng qua con hẻm để kịp giờ giới nghiêm', 'Cut through the alley before curfew', 'Bạn chặn được toán phục kích và giao đủ người. Khách hàng ký thêm lời xác nhận vào hồ sơ.', 'You stop the ambush and deliver everyone. The client adds a signed statement to your file.', { merit: 8, rep: 2, health: -7 }, 'Một phát súng làm cả nhóm quay đầu. Bạn đưa họ ra được nhưng hợp đồng bị ghi là dang dở.', 'A shot turns the group back. You get them out, but the request is filed as incomplete.', { health: -11, sanity: -5 }],
    ['Văn phòng giao đơn cho một Fixer khác.', 'The Office assigns another Fixer.']),
  task('m_annual_fixer_evidence', { jobs: ['Fixer'] },
    '[Dấu niêm phong Hana] Một khách hàng muốn lấy lại sổ nợ bị giữ trong kho của Syndicate. Hana chỉ ghi công nếu món đồ còn nguyên dấu niêm.',
    '[Hana seal] A client wants a debt ledger back from a Syndicate storehouse. Hana will credit the request only if its seal remains intact.',
    ['Theo dấu người giao hàng và lấy sổ lúc đổi ca', 'Follow the courier and retrieve it at shift change', 'Bạn giao lại cuốn sổ còn nguyên niêm. Một đêm theo dõi khiến bạn kiệt sức.', 'You return the sealed ledger. A night of surveillance leaves you spent.', { merit: 4, sanity: -5 }],
    ['Đột nhập trước khi xe chở sổ rời kho', 'Break in before the ledger leaves', 'Bạn kéo cuốn sổ khỏi xe ngay trước mũi súng. Hồ sơ yêu cầu được đóng dấu hoàn tất.', 'You pull the ledger from the cart under gunfire. The request is stamped complete.', { merit: 8, rep: 2, health: -8 }, 'Kho báo động. Bạn thoát qua mái nhà nhưng để lại cuốn sổ và một phần tiền trang bị.', 'The alarm sounds. You escape over the roof without the ledger, losing gear money.', { health: -9, wealth: -5, heat: 3 }],
    ['Khách hàng tìm một Office khác.', 'The client looks for another Office.']),
  task('m_annual_thumb_inspection', { jobs: ['Syndicate'], finger: 'Thumb' },
    '[Đạn dưới con dấu] Một hộp đạn mang dấu The Thumb bị tráo trước giờ giao. Người nhận chờ ở đầu phố.',
    '[Rounds beneath the seal] A crate marked by the Thumb has been switched before delivery. The recipient waits down the street.',
    ['Kiểm từng hộp rồi báo Capo', 'Inspect each box and report to the Capo', 'Bạn tìm ra lô giả. Capo ghi tên bạn vào sổ giao nhận; ca kiểm kéo dài tới sáng.', 'You find the false batch. The Capo records your name; the inspection lasts until dawn.', { merit: 4, sanity: -4 }],
    ['Bắt người tráo hàng trước mặt bên mua', 'Catch the switcher before the buyer', 'Bạn bắt đúng người và giữ nguyên giao dịch. Cấp trên công nhận việc bạn bảo toàn thể diện của The Thumb.', 'You catch the switcher and preserve the exchange. Your superior credits you with protecting the Thumb’s standing.', { merit: 8, rep: 2, health: -6 }, 'Người tráo hàng có đồng bọn. Bạn giữ được mạng nhưng lô hàng biến mất.', 'The switcher has accomplices. You survive, but the shipment vanishes.', { health: -10, heat: 5, rep: -2 }],
    ['Một tổ khác tiếp nhận việc giao hàng.', 'Another squad takes the delivery.']),
  task('m_annual_index_route', { jobs: ['Syndicate'], finger: 'Index' },
    '[Tờ Prescript đến muộn] Người đưa tin bị thương để lại một Prescript chưa giao. Dòng địa chỉ cuối bị máu che khuất.',
    '[A late Prescript] An injured courier leaves an undelivered Prescript. Blood obscures the last line of its address.',
    ['Tra lại tuyến phát rồi giao đúng cửa', 'Retrace the delivery route', 'Bạn tìm được đúng cửa. Messenger xác nhận đã giao đủ, dù bạn mất cả đêm đi bộ.', 'You find the right door. The Messenger confirms delivery, though it takes all night.', { merit: 4, sanity: -4 }],
    ['Theo dấu máu để đón người nhận trước khi họ rời đi', 'Follow the blood trail before the recipient leaves', 'Bạn đuổi kịp người nhận và trao Prescript còn niêm. Proxy ghi nhận tốc độ của bạn.', 'You catch the recipient and deliver the sealed Prescript. The Proxy notes your speed.', { merit: 8, health: -6 }, 'Dấu máu dẫn vào ngõ cụt. Bạn quay lại với Prescript chưa giao và một vết thương mới.', 'The trail ends in a blind alley. You return with the Prescript and a new wound.', { health: -9, sanity: -5 }],
    ['Một Messenger khác tiếp tục tuyến phát.', 'Another Messenger takes the route.']),
  task('m_annual_middle_witness', { jobs: ['Syndicate'], finger: 'Middle' },
    '[Người chứng kiến món nợ] Một người trong gia đình bị đánh trước quán ăn. Nhân chứng duy nhất sắp rời District.',
    '[Witness to a debt] A family member was beaten outside a diner. The only witness is about to leave the District.',
    ['Hộ tống nhân chứng về gặp Big Sibling', 'Escort the witness to a Big Sibling', 'Nhân chứng kể rõ mọi việc. Tên kẻ gây chuyện được ghi đúng vào Book of Vengeance.', 'The witness gives a full account. The offender’s name enters the Book of Vengeance correctly.', { merit: 4, health: -4 }],
    ['Chặn xe kẻ gây chuyện ngay trước nhân chứng', 'Stop the offender’s car in front of the witness', 'Bạn giữ được cả người lẫn lời khai. Gia đình ghi công bạn trong cuộc họp tối.', 'You secure both the offender and the testimony. The family credits you at the evening gathering.', { merit: 8, rep: 2, health: -7, heat: 3 }, 'Chiếc xe lao qua chốt. Nhân chứng hoảng sợ bỏ đi, còn bạn phải trở về tay không.', 'The car breaks the barricade. The witness flees, and you return empty-handed.', { health: -10, sanity: -4 }],
    ['Một người nhà khác đi tìm nhân chứng.', 'Another family member seeks the witness.']),
  task('m_annual_ring_provenance', { jobs: ['Syndicate'], finger: 'Ring' },
    '[Nhãn tác phẩm bị thay] Một tác phẩm trong gallery mang tên người không tạo ra nó. Docent muốn biết ai đã sửa hồ sơ trước giờ mở cửa.',
    '[A changed gallery label] A work in the gallery bears the wrong creator’s name. A Docent wants the record corrected before opening.',
    ['Đối chiếu sổ nhập kho và sửa lại nhãn', 'Check the intake ledger and restore the label', 'Bạn xác định được tác giả thật. Docent ký vào báo cáo của bạn; nhiều giờ dưới đèn làm mắt bạn đau nhức.', 'You identify the true creator. The Docent signs your report; hours under gallery lights leave your eyes aching.', { merit: 4, sanity: -4 }],
    ['Đưa cả người làm giả hồ sơ ra trước buổi duyệt', 'Expose the forged record at the review', 'Bạn trình đủ chứng cứ. Người duyệt trao cho bạn quyền sắp đặt một phòng nhỏ.', 'You present the evidence. The reviewer gives you charge of a small room.', { merit: 8, rep: 2, sanity: -6 }, 'Một trang sổ đã bị xé. Lời buộc tội quay lại phía bạn và buổi duyệt khép sớm.', 'A ledger page is missing. The accusation turns toward you, and the review closes early.', { sanity: -9, rep: -3 }],
    ['Docent nhờ người khác kiểm hồ sơ.', 'The Docent asks another member to check the file.']),
  task('m_annual_pinky_oath', { jobs: ['Syndicate'], finger: 'Pinky' },
    '[Lời hứa ở trạm đổi hàng] Một người của The Pinky hứa giao kiện hàng trước chuông tối nhưng bị chặn trên đường. Người nhận vẫn chờ.',
    '[Oath at the exchange post] A Pinky member promised delivery before the evening bell but was stopped en route. The recipient still waits.',
    ['Mang hàng theo lối phụ và báo người giao gặp nạn', 'Take the side route and report what happened', 'Bạn giao đúng hàng trước chuông. Người nhận xác nhận lời hứa của nhánh được giữ.', 'You deliver before the bell. The recipient confirms the branch kept its word.', { merit: 4, health: -4 }],
    ['Quay lại cứu người giao rồi cùng đưa hàng tới trạm', 'Recover the courier and finish the delivery together', 'Cả hai tới nơi, thở không ra hơi. Lời chứng của người giao giúp công của bạn được ghi rõ.', 'Both of you arrive breathless. The courier’s account ensures your work is recorded.', { merit: 8, rep: 2, health: -8 }, 'Những kẻ chặn đường vẫn ở đó. Bạn kéo được người giao đi, nhưng kiện hàng bị giữ.', 'The blockers are still there. You pull the courier clear, but they keep the parcel.', { health: -11, sanity: -3 }],
    ['Người nhận rời trạm khi chuông vang.', 'The recipient leaves when the bell rings.']),
  task('m_annual_syndicate_toll', { jobs: ['Syndicate'], notFinger: 'Thumb' },
    '[Đường hàng bị cắt] Một tuyến chuyển hàng ở Backstreets bị chặn. Người trong nhóm cần ai đó mở lại lối đi.',
    '[A cut supply route] A Backstreets delivery line has been blocked. Your crew needs someone to reopen it.',
    ['Tìm đường phụ và dẫn nhóm đi vòng', 'Find a side route and lead the crew around', 'Hàng tới nơi đủ số. Cả nhóm ghi nhận ca làm kéo dài của bạn.', 'The cargo arrives intact. The crew credits your long shift.', { merit: 4, health: -4 }],
    ['Đẩy thẳng qua chốt của nhóm đối địch', 'Force a passage through the rival checkpoint', 'Bạn chiếm lại lối đi trước khi hàng hỏng. Tên bạn được nhắc trong buổi chia phần.', 'You reclaim the route before the cargo spoils. Your name is called at the division of shares.', { merit: 8, rep: 2, health: -8, heat: 5 }, 'Chốt có thêm người. Bạn rút được nhóm nhưng mất hàng và để lại máu.', 'The checkpoint is reinforced. You pull the crew back, losing cargo and blood.', { health: -12, wealth: -4, heat: 5 }],
    ['Nhóm chờ tuyến hàng khác mở lại.', 'The crew waits for another route to open.']),
  task('m_annual_wing_containment', { jobs: ['Wing Employee'] },
    '[Niêm phong phòng máy] Một phòng máy bị khóa sai thứ tự. Ca sau sẽ vào nếu không ai ký biên bản kiểm tra.',
    '[Machine-room seal] A machine room was locked out of sequence. The next shift will enter unless someone signs an inspection report.',
    ['Kiểm từng chốt và nộp biên bản đúng số', 'Check every latch and file the exact readings', 'Ca sau nhận phòng an toàn. Bản đánh giá quý ghi tên bạn cùng giờ làm thêm.', 'The next shift enters safely. The quarterly review lists your name and overtime.', { merit: 4, sanity: -4 }],
    ['Vào phòng đang nóng để tìm chốt lỗi', 'Enter the hot room to find the failed latch', 'Bạn tìm ra chốt hỏng trước khi dây chuyền khởi động. Quản lý ghi công bạn vào hồ sơ kỹ thuật.', 'You find the failed latch before the line restarts. The manager records your work in the technical file.', { merit: 8, network: 2, health: -7 }, 'Khóa phụ sập lại. Bạn thoát ra nhưng ca sau phải dừng máy và chờ đội chuyên trách.', 'The secondary lock closes. You escape, but the next shift must shut down and wait for specialists.', { health: -10, sanity: -5, network: -2 }],
    ['Phòng máy được giao cho đội kiểm định khác.', 'Another inspection team takes the room.']),
  task('m_annual_workshop_calibration', { jobs: ['Workshop Craftsman'] },
    '[Sai số trong khớp máy] Một tay giả do Workshop của bạn sửa vẫn lệch khi khách nâng vật nặng. Khách quay lại trước giờ đóng cửa.',
    '[A prosthetic out of tolerance] An arm repaired at your Workshop still slips under a heavy load. The customer returns before closing.',
    ['Tháo khớp và cân lại từ đầu', 'Disassemble and recalibrate the joint', 'Khớp chịu được bài thử. Khách ký giấy nhận, còn bạn mất một đêm làm việc.', 'The joint passes the load test. The client signs off, after a night of work.', { merit: 4, sanity: -4, wealth: -2 }],
    ['Đổi bộ dẫn động rồi thử ngay trên tải thật', 'Replace the drive and test it at full load', 'Tay giả nâng được tải mà không giật. Hồ sơ sửa chữa được ghi là ca khó hoàn thành.', 'The arm lifts without a jolt. The repair file marks a difficult job completed.', { merit: 8, rep: 2, wealth: -5, health: -4 }, 'Bộ dẫn động mới nứt dưới tải. Bạn phải trả tiền linh kiện và hẹn khách ngày khác.', 'The new drive cracks under load. You pay for parts and ask the client to return.', { wealth: -9, sanity: -6 }],
    ['Khách mang tay giả sang Workshop khác.', 'The client takes the arm to another Workshop.']),
  task('m_annual_workshop_tres', { jobs: ['Workshop Craftsman'] },
    '[Lô thép chờ kiểm] Một lô lưỡi kiếm mang dấu Workshop lệch chuẩn độ cứng. Bên đặt hàng cần câu trả lời trước sáng mai.',
    '[Steel awaiting inspection] A batch of blades stamped by your Workshop falls outside hardness tolerance. The buyer needs an answer by morning.',
    ['Đo lại từng lưỡi và loại phần sai', 'Measure every blade and reject the bad ones', 'Bạn giao một lô nhỏ hơn nhưng đúng chuẩn. Biên bản kiểm định ghi rõ công của bạn.', 'You deliver a smaller batch that meets specification. The inspection record credits your work.', { merit: 4, sanity: -4, wealth: -2 }],
    ['Tôi lại cả lô trong một đêm rồi thử va đập', 'Reheat the whole batch and impact-test it overnight', 'Lô thép đạt phép thử. Bên mua chấp nhận giao đủ và yêu cầu lưu tên thợ phụ trách.', 'The batch passes. The buyer accepts full delivery and asks for the responsible smith’s name.', { merit: 8, rep: 2, health: -6, wealth: -4 }, 'Nhiệt không đều làm hai lưỡi gãy. Bạn chịu chi phí thay và mất hạn giao.', 'Uneven heat breaks two blades. You bear the replacement cost and miss the deadline.', { wealth: -10, health: -5, sanity: -4 }],
    ['Bên đặt hàng hủy lô chưa kiểm.', 'The buyer cancels the uninspected batch.']),
  task('m_annual_outcast_water', { jobs: ['Outcast'] },
    '[Bể nước dưới nền đất] Một nhóm sống ngoài tường tìm được nắp bể cũ. Không ai biết nước trong đó còn dùng được hay không.',
    '[Water beneath the ground] A group beyond the wall finds an old reservoir hatch. No one knows whether the water is safe.',
    ['Lấy mẫu, đun thử và chia phần dùng được', 'Sample, boil, and divide the usable water', 'Bạn giữ được một phần nước sạch cho cả nhóm. Họ nhớ ai đã chịu đứng canh bếp.', 'You keep clean water for the group. They remember who stayed at the fire.', { merit: 4, health: -4 }],
    ['Mở sâu xuống bể để tìm đường nước mới', 'Descend deeper to find the inlet', 'Bạn tìm được mạch nước còn chảy. Nhóm dựng nơi trữ nước và ghi công bạn.', 'You find a running inlet. The group builds storage and credits you.', { merit: 8, network: 2, health: -8 }, 'Bậc thang sập. Bạn trèo lên được nhưng mang theo nước bẩn và một vết rách dài.', 'The stairs collapse. You climb out with fouled water and a long cut.', { health: -12, sanity: -4 }],
    ['Nhóm lấp lại nắp bể và đi tiếp.', 'The group seals the hatch and moves on.']),
  task('m_annual_outcast_beacon', { jobs: ['Outcast'] },
    '[Đèn tín hiệu ngoài tường] Một đoàn người mất phương hướng để lại ba đốm lửa trên đường chân trời. Bão bụi sắp tới.',
    '[Signals beyond the wall] A lost group leaves three fires on the horizon. A dust storm is coming.',
    ['Dựng cọc chỉ đường tới nơi trú gần nhất', 'Mark a route to the nearest shelter', 'Đoàn người lần theo cọc và tới nơi trước bão. Bạn trở về mệt lả.', 'The group follows your markers to shelter before the storm. You return exhausted.', { merit: 4, health: -5 }],
    ['Đi vào bão để đưa họ ra tận nơi', 'Walk into the storm and bring them out', 'Bạn dẫn đủ người về. Những người sống sót kể tên bạn ở khu trại kế tiếp.', 'You bring everyone back. The survivors tell the next camp your name.', { merit: 8, rep: 2, health: -8, sanity: -3 }, 'Bạn tìm thấy dấu chân cũ nhưng không thấy người. Bão buộc bạn quay về trong bóng tối.', 'You find old tracks but no people. The storm drives you home in darkness.', { health: -10, sanity: -6 }],
    ['Những đốm lửa tắt khi trời tối.', 'The fires go out after dusk.']),
  task('m_annual_distortion_passage', { jobs: ['Distortion'] },
    '[Lối đi qua khu đổ nát] Một nhóm người bị kẹt giữa hai đội săn Distortion. Bạn biết đường qua những căn nhà bỏ trống.',
    '[Passage through the ruins] A group is trapped between two Distortion-hunting teams. You know a path through empty houses.',
    ['Dẫn họ đi vòng mà không lộ hình dạng', 'Guide them around without revealing yourself', 'Họ thoát được. Trong lời kể sau đó, một bóng hình vô danh đã chỉ đường.', 'They escape. Their later account remembers an unnamed figure that showed the way.', { merit: 4, sanity: -4 }],
    ['Lôi một đội săn khỏi lối đi', 'Draw one hunting team away from the passage', 'Nhóm người vượt qua an toàn. Đội săn mang về một bản báo cáo về kẻ đã cản họ.', 'The group crosses safely. The hunters file a report on what stopped them.', { merit: 8, health: -8, heat: 6 }, 'Đội săn gọi thêm viện binh. Bạn thoát nhưng nhóm người phải trốn lại trong khu đổ nát.', 'The hunters call reinforcements. You escape, but the group remains hidden in the ruins.', { health: -11, heat: 8, sanity: -4 }],
    ['Nhóm người phải tự tìm lối khác.', 'The group must find another way.']),
  task('m_annual_distortion_territory', { jobs: ['Distortion'] },
    '[Ranh giới bị xâm phạm] Một nhóm vũ trang dựng trạm gác ngay nơi bạn trú ẩn. Dấu chân của họ đã đi qua kho thức ăn.',
    '[An encroaching boundary] An armed group builds a post beside your shelter. Their tracks run through your food stores.',
    ['Dời kho và cắt dấu vết dẫn tới nơi trú', 'Move the stores and erase the trail', 'Nơi trú vẫn kín. Bạn học thêm một lối thoát qua mái nhà.', 'The shelter stays hidden. You learn another route over the roofs.', { merit: 4, health: -4, sanity: -3 }],
    ['Phá trạm gác trong đêm để giữ địa bàn', 'Break the post at night to keep the territory', 'Trạm gác bị bỏ. Kẻ còn sống kể lại cuộc chạm trán, và khu vực trống trở lại.', 'The post is abandoned. Survivors describe the encounter, and the area clears.', { merit: 8, heat: 8, health: -7 }, 'Bạn bị phát hiện dưới đèn pha. Nơi trú phải bỏ lại cùng nửa kho lương.', 'Floodlights catch you. You abandon the shelter and half the stores.', { health: -11, wealth: -5, heat: 10 }],
    ['Bạn rời nơi trú trước khi trạm gác hoàn thành.', 'You leave before the post is finished.'])
];

export const ANNUAL_MERIT_OPPORTUNITIES = [
  ...CLIMBING_MERIT_OPPORTUNITIES,
  ...APEX_MINORS,
  ...APEX_COLOR_GENERATED,
  ...APEX_FINGER_GENERATED
];
