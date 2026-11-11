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

function splitFlags(raw = {}) {
  const { flagsAdd, ...fx } = raw;
  return { fx, ...(flagsAdd ? { flagsAdd } : {}) };
}

const distortionTask = (id, vi, en, steady, gamble, declined) => {
  const s = splitFlags(steady[4]);
  const gWin = splitFlags(gamble[4]);
  const gLoss = splitFlags(gamble[7]);
  return {
    id, age: [15, 140], need: { jobs: ['Distortion'] }, vi, en,
    careerOpportunity: true,
    allowDistorted: true,
    tags: ['distortion', 'annual'],
    choices: [
      { vi: steady[0], en: steady[1], rvi: steady[2], ren: steady[3], fx: s.fx, ...(s.flagsAdd ? { flagsAdd: s.flagsAdd } : {}) },
      {
        vi: gamble[0], en: gamble[1], rvi: '', ren: '', fx: {},
        out: [
          { w: 60, rvi: gamble[2], ren: gamble[3], fx: gWin.fx, ...(gWin.flagsAdd ? { flagsAdd: gWin.flagsAdd } : {}) },
          { w: 40, rvi: gamble[5], ren: gamble[6], fx: gLoss.fx, ...(gLoss.flagsAdd ? { flagsAdd: gLoss.flagsAdd } : {}) }
        ]
      }
    ],
    ignore: { vi: 'Bỏ qua', en: 'Pass', rvi: declined[0], ren: declined[1], fx: {} }
  };
};

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
    '[Đường hàng bị cắt] Tuyến chuyển hàng qua Backstreets bị chặn. Người trong nhóm cần ai đó mở lại lối đi.',
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
  task('m_annual_workshop_calibration', { workshopAccess: true },
    '[Sai số trong khớp máy] Một tay giả do Workshop của bạn sửa vẫn lệch khi khách nâng vật nặng. Khách quay lại trước giờ đóng cửa.',
    '[A prosthetic out of tolerance] An arm repaired at your Workshop still slips under a heavy load. The customer returns before closing.',
    ['Tháo khớp và cân lại từ đầu', 'Disassemble and recalibrate the joint', 'Khớp chịu được bài thử. Khách ký giấy nhận, còn bạn mất một đêm làm việc.', 'The joint passes the load test. The client signs off, after a night of work.', { merit: 4, sanity: -4, wealth: -2 }],
    ['Đổi bộ dẫn động rồi thử ngay trên tải thật', 'Replace the drive and test it at full load', 'Tay giả nâng được tải mà không giật. Hồ sơ sửa chữa được ghi là ca khó hoàn thành.', 'The arm lifts without a jolt. The repair file marks a difficult job completed.', { merit: 8, rep: 2, wealth: -5, health: -4 }, 'Bộ dẫn động mới nứt dưới tải. Bạn phải trả tiền linh kiện và hẹn khách ngày khác.', 'The new drive cracks under load. You pay for parts and ask the client to return.', { wealth: -9, sanity: -6 }],
    ['Khách mang tay giả sang Workshop khác.', 'The client takes the arm to another Workshop.']),
  task('m_annual_workshop_tres', { workshopAccess: true },
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
  distortionTask('m_annual_distort_carmen_call',
    '[Tiếng thì thầm nơi khe nứt ánh sáng] Vệt sáng từ khe nứt tàn tích rọi qua lớp vỏ dị thường. Tiếng người phụ nữ tóc nâu ngân nga trong đầu bạn, thúc giục giải phóng khát vọng thuần khiết nhất.',
    '[Whisper at the fissure of light] A streak of light through ruined masonry touches your carapace. The brown-haired woman\'s voice hums in your skull, urging you to unleash purest desire.',
    ['Thả trôi bản ngã theo tiếng thì thầm của Carmen', 'Yield to Carmen\'s whisper and unleash your desire', 'Nhiệt độ cơ thể tăng vọt. Móng vuốt dài thêm, tiếng thì thầm xoa dịu cơn cào xé trong lồng ngực.', 'Body heat surges. Claws lengthen; the whisper soothes the ache tearing inside your chest.', { resonance: 6, sanity: -4, heat: 4 }],
    ['Cắn chặt răng bám lấy ký ức và tên gọi kiếp người', 'Grit your teeth and cling to human memories and your name', 'Bạn nhắc lại tên cũ từng chữ một. Cơn đau thắt qua đi; tàn tích ý thức con người vẫn còn nguyên vẹn.', 'You repeat your old name letter by letter. The seizing ache passes; your vestige of human mind stays intact.', { sanity: 8, resonance: -3, flagsAdd: ['HumanVoice'] }, 'Tiếng gọi gầm lên dữ dội trong hộp sọ. Cơn co giật khiến bạn quằn quại giữa phế tích đến rạng sáng.', 'The call roars through your skull. Convulsions leave you writhing among the ruins until dawn.', { health: -8, sanity: -6, resonance: 4 }],
    ['Bạn lùi vào góc tối, bịt tai cho đến khi tiếng ngân tắt dần.', 'You pull into the darkness, covering your ears until the humming fades.']),
  distortionTask('m_annual_distort_hunter_dossier',
    '[Hơi thở thợ săn trong hẻm tối] Hai Fixer săn tiền thưởng lần theo vết cộng hưởng đến gần nơi bạn ẩn thân. Trên tay họ là hồ sơ nhận diện có vẽ hình dạng của bạn.',
    '[A hunter\'s breath in the alley] Two bounty Fixers trace your resonance near your sanctuary, clutching an identification dossier with a sketch of your form.',
    ['Phát sóng âm cộng hưởng làm nhiễu giác quan rồi rút êm', 'Emit a resonant frequency to scramble their senses and slip away', 'Sóng âm khiến hai Fixer choáng váng đánh rơi đèn pin. Bạn biến mất vào mạng lưới cống ngầm trước khi chúng kịp định thần.', 'The acoustic pulse staggers both Fixers, dropping their torches. You vanish down the culverts before they recover.', { heat: -5, sanity: -3, health: -2 }],
    ['Bày trận phục kích xé nát hồ sơ truy nã', 'Spring an ambush to shred their bounty dossier', 'Đòn đánh bất ngờ đập gãy vũ khí đối phương. Bạn xé tan xấp giấy truy nã; hai kẻ đi săn hoảng loạn tháo chạy.', 'A sudden strike snaps their weapons. You shred the bounty file; both hunters flee in terror.', { rep: 6, heat: 5, health: -4, sanity: 2 }, 'Vũ khí bọc điện kích nổ trúng vai bạn. Bạn đẩy lùi được đối thủ nhưng nơi ẩn náu đã bị lộ.', 'An electrified blade strikes your shoulder. You drive them back, but your lair is compromised.', { health: -10, heat: 8, sanity: -4 }],
    ['Bạn nín thở nép mình dưới sàn gạch mục, chờ bước chân họ xa dần.', 'You hold your breath under rotten floorboards until their steps recede.']),
  distortionTask('m_annual_distort_sweeper_hour',
    '[Đêm ba giờ mười ba] Còi giới nghiêm vừa dứt, đàn Sweeper mang bình nhiên liệu tràn qua ngõ hẹp. Lộ trình của chúng cắt ngang nguồn trữ vật chất của bạn.',
    '[Night of 3:13] As the curfew siren dies, a pack of Sweepers carrying fuel canisters floods the lane, cutting across your cache.',
    ['Lừa đàn Sweeper chuyển hướng sang trạm gác Syndicate gần đó', 'Mislead the Sweepers toward a nearby Syndicate outpost', 'Tiếng gõ kim loại kéo đàn Sweeper lao về phía trạm gác. Kho lương của bạn an toàn trong lúc góc phố náo loạn.', 'Metallic tapping draws the pack to the post. Your stores remain untouched while the corner erupts in chaos.', { rep: 4, sanity: -3, heat: 2 }],
    ['Lao ra đánh cướp bình nhiên liệu lỏng từ tay Sweeper', 'Charge out to seize a liquid fuel tank from a Sweeper', 'Móng vuốt bạn hất văng một Sweeper, đoạt lấy bình nhiên liệu chiết từ xác người. Thứ dịch đặc sệt ấy lại bồi bổ thể xác dị thường của bạn.', 'Your claws bowl over a Sweeper, seizing a canister of fuel rendered from corpses. The thick fluid mends your mutated frame.', { health: 12, wealth: 15, heat: 4 }, 'Móc sắt cào rách lớp vỏ ngoài. Bạn giật được nửa bình nhiên liệu nhưng phải trả giá bằng vết thương sâu rỉ máu.', 'Iron hooks tear your outer shell. You wrench half a canister away, nursing deep, oozing gouges.', { health: -12, sanity: -4, wealth: 6 }],
    ['Bạn nhường lối cho đàn Sweeper đi qua trong im lặng.', 'You yield the passage, letting the Sweepers shuffle past in silence.']),
  distortionTask('m_annual_distort_fledgling_shelter',
    '[Đứa trẻ dưới cửa hầm] Đứa trẻ lấm lem trốn dưới nắp hầm phế tích. Khi thấy bóng hình to lớn của bạn, nó run rẩy nhưng không gào khóc, chỉ lặng lẽ giơ nắm cỏ dại khô.',
    '[The child beneath the hatch] A soot-stained child cowers under a cellar hatch. Seeing your giant silhouette, it trembles without screaming, holding up a clump of dried weeds.',
    ['Đặt mẩu lương khô xuống rồi nhẹ nhàng đóng nắp hầm che chở', 'Place a dry ration down and pull the hatch shut to shelter them', 'Đứa trẻ ôm lấy phần ăn. Cử chỉ nhỏ nhoi làm ấm lại phần nhân tính tưởng chừng đã đóng băng trong lồng ngực bạn.', 'The child clutches the ration. The small gesture thaws a spark of humanity once thought frozen within you.', { sanity: 8, heat: -4, flagsAdd: ['HumanVoice'] }],
    ['Dẫn đứa trẻ vượt qua hẻm nguy hiểm đến khu dân cư an toàn', 'Guide the child through dangerous alleys to safer quarters', 'Bóng lưng bạn chắn đạn cho đứa trẻ suốt chặng đường. Nó vào được nơi an toàn; lời đồn về thực thể dị dạng biết cứu người lan truyền.', 'Your broad back shields the child from stray fire. They reach shelter; whispers of a guardian monstrosity spread through alleys.', { sanity: 10, rep: 6, health: -4, heat: -4, flagsAdd: ['HumanVoice'] }, 'Đội tuần tra nổ súng. Bạn che được cho đứa trẻ chạy thoát nhưng trúng nhiều phát đạn sượt, buộc phải rút lui vội vã.', 'A patrol opens fire. You cover the child\'s flight but catch grazing bullets, forced into hasty retreat.', { health: -10, sanity: -4, heat: 5 }],
    ['Bạn quay lưng rời đi, để đứa trẻ lại với bóng tối của nắp hầm.', 'You turn away, leaving the child to the dark beneath the hatch.']),
  distortionTask('m_annual_distort_monolith_hunger',
    '[Cơn đói của lõi biến dị] Lõi năng lượng trong lồng ngực rung lên từng cơn thèm khát. Cơ thể đòi hỏi kim loại hiếm từ xưởng Workshop hoặc tinh chất Singularity để không tự ăn mòn.',
    '[Hunger of the anomalous core] The energy core in your chest throbs with raw craving. Your frame demands Workshop alloys or Singularity essence to halt self-cannibalization.',
    ['Thu mình vào kén kết tinh để ngủ đông vượt qua cơn đói', 'Curl into a crystalline chrysalis to hibernate through the craving', 'Lớp vỏ tự khóa chặt. Bạn chìm vào giấc ngủ lạnh giá; cơn đói dịu đi dù tâm trí mệt mỏi vì giấc mơ kỳ quái.', 'Your shell locks tight. You sink into cold slumber; the craving subsides though fevered dreams leave you spent.', { health: 8, sanity: -5, heat: -3 }],
    ['Đột kích kho phế liệu Wing trong đêm tuyết', 'Raid a Wing scrap depository through the snow', 'Móng vuốt xé toạc thùng chứa hợp kim Singularity. Bạn ngấu nghiến phế liệu quý, lớp vỏ ngoài mọc thêm gai thép cứng cáp.', 'Your claws tear open a Singularity alloy bin. You devour the precious scrap; your carapace bristles with hardened steel thorns.', { health: 14, wealth: 20, resonance: 4, heat: 6 }, 'Bẫy điện cao thế phát nổ. Bạn ngã bật ra ngoài tường rào, mang theo thương tích cháy xém và tiếng còi báo động rền vang.', 'High-voltage defenses detonate. You are hurled from the fence, carrying scorched wounds as alarms wail.', { health: -14, sanity: -6, heat: 8 }],
    ['Bạn cố chịu đựng cơn cào xé trong ngực cho đến khi trời rạng.', 'You endure the gnawing in your chest until the sky pales.']),
  distortionTask('m_annual_distort_past_monument',
    '[Tấm biển tên của đời cũ] Bạn đi qua con hẻm quen thuộc và nhìn thấy tấm biển tên cũ kỹ của văn phòng hoặc cơ sở làm việc nơi bạn từng gắn bó thời còn là con người.',
    '[Signboard from a former life] Passing a familiar lane, you see the weathered signboard of the Office or workshop where you once belonged as a human.',
    ['Dùng móng vuốt khắc một vết cào bí mật lên chân cột rồi rời đi', 'Carve a secret mark into the pillar base and move on', 'Vết khắc để lại dấu ấn bí mật của riêng bạn. Kỷ niệm cũ lắng xuống như lớp tro nguội; bạn ngẩng cao đầu bước tiếp.', 'The gouge leaves your solitary seal. Old memories settle like cool ash; you hold your head high and stride on.', { rep: 6, sanity: 4, resonance: 2 }],
    ['Để lại món quà vật chất trước cửa cũ để giúp người ở lại', 'Leave a valuable token at the doorstep to aid those who remain', 'Người bên trong mở cửa và nhặt món đồ quý với ánh mắt biết ơn. Bạn đứng nhìn thêm một lúc rồi lùi vào bóng tối.', 'The person inside opens the door and lifts the treasure in gratitude. You watch a moment longer, then step back into the dark.', { sanity: 10, wealth: -10, rep: 8, flagsAdd: ['HumanVoice'] }, 'Người quen cũ nhìn thấy bạn và thét lên kinh hoàng, vội vã đóng sập cửa. Nỗi đau chối bỏ xé toạc trái tim bạn.', 'An old acquaintance spots you and shrieks in horror, slamming the door. The sting of rejection tears your spirit.', { sanity: -10, resonance: 6, heat: 4 }],
    ['Bạn quay lưng rảo bước, không để mắt nhìn lại quá khứ.', 'You turn on your heel, refusing to cast another glance backward.']),
  distortionTask('m_annual_distort_labyrinth_lure',
    '[Lối rẽ giả trong lãnh địa] Một toán thu gom phế liệu đi lạc vào hành lang đã bị trường lực của bạn bẻ cong. Tiếng bước chân của họ dội qua ba bức tường gạch.',
    '[False turn in the domain] A salvage crew wanders into a corridor bent by your field. Their footsteps echo across three brick walls.',
    ['Bẻ hướng hành lang đẩy họ ra ngoài sau khi thu lại túi đồ nghề', 'Bend the passage to push them out after taking their tool packs', 'Toán người bỏ lại ba túi linh kiện rồi chạy tháo thân ra ngõ lớn. Bạn gom số thép vụn về gia cố ổ trú.', 'The crew drops three tool bags and bolts toward the main lane. You gather the scrap steel to reinforce your lair.', { wealth: 12, sanity: 3, resonance: 3 }],
    ['Khép kín lối ra để hút trọn nỗi sợ của cả nhóm', 'Seal the exit to feed on the terror of the whole group', 'Cơn hoảng loạn trong hành lang kín làm lõi năng lượng của bạn căng tràn. Sáng hôm sau văn phòng khu vực dán thêm cáo thị cảnh báo.', 'Panic inside the sealed hall swells your energy core. Next morning the local Office posts a fresh hazard notice.', { health: 14, resonance: 8, rep: 6, sanity: -5, heat: 6 }, 'Một kẻ trong nhóm mang lựu đạn chấn âm tự chế. Vụ nổ làm sập vách ngăn và khiến tai bạn ù đặc suốt đêm.', 'One salvager carries a homemade concussion grenade. The blast collapses a partition and leaves your ears ringing all night.', { health: -10, sanity: -5, heat: 5 }],
    ['Bạn mở khe tường cho họ tự tìm đường thoát.', 'You part the wall seam and let them find their own way out.']),
  distortionTask('m_annual_distort_lucid_blackmarket',
    '[Tay buôn tin ở chợ ngầm] Một kẻ môi giới đeo mặt nạ phòng độc đặt hộp sắt xuống ranh giới vùng tối. Hắn cần bản vẽ đường ngầm nơi bạn trú để đổi lấy thuốc giảm đau và tiền mặt.',
    '[The masked broker] A broker in a gas mask sets an iron box at the edge of the dark zone. He wants a map of the tunnels around your lair in exchange for painkillers and cash.',
    ['Vạch sơ đồ đường ống phụ lên tấm tôn rỉ rồi nhận hộp sắt', 'Scratch a map of secondary pipes onto rusted tin and take the box', 'Hắn kiểm tra nét khắc rồi lùi đi đúng hẹn. Khoản tiền và thuốc trong hộp giúp bạn yên ổn qua mùa mưa.', 'He checks the scratched lines and backs away as agreed. The cash and medicine inside keep you steady through the rains.', { wealth: 14, health: 6, sanity: 4, network: 3 }],
    ['Đòi gấp đôi giá tiền bằng giọng nói còn sót lại của con người', 'Demand double the price in your remaining human voice', 'Nghe bạn phát âm rõ từng con số, gã môi giới toát mồ hôi mở thêm túi tiền dự phòng.', 'Hearing you pronounce each number clearly, the sweating broker opens his reserve pouch.', { wealth: 24, rep: 5, sanity: 5, flagsAdd: ['HumanVoice'] }, 'Giọng bạn biến dạng thành tiếng rít kim loại giữa chừng. Gã môi giới hoảng hốt ôm hộp sắt chạy biến vào hẻm sáng đèn.', 'Your voice warps into a metallic shriek halfway through. The terrified broker grabs the box and bolts into a lit alley.', { sanity: -6, resonance: 4, heat: 4 }],
    ['Bạn đứng yên trong bóng tối cho đến khi hắn tự cầm hộp rút lui.', 'You stand motionless in the dark until he takes his box and retreats.']),
  distortionTask('m_annual_distort_lcd_recon_smoke',
    '[Đầu dò khói của đội điều tra] Một quả cầu cảm biến lăn vào chân cầu thang, tỏa ra làn khói mỏng có mùi thuốc lào dùng để đo mật độ biến dạng tâm lý.',
    '[The investigator smoke probe] A sensor sphere rolls to the stair foot, venting thin pipe-scented smoke designed to measure psychological distortion density.',
    ['Bóp nát quả cầu trước khi nó kịp truyền tín hiệu về trạm', 'Crush the sphere before it transmits readings to the station', 'Vỏ kim loại vỡ vụn dưới bàn tay bạn. Đội trinh sát ngoài đầu phố mất dấu và phải rút về trước giờ giới nghiêm.', 'The metal casing shatters beneath your palm. The recon team down the street loses the signal and withdraws before curfew.', { heat: -6, sanity: 2, rep: 3 }],
    ['Thổi ngược luồng cộng hưởng vào quả cầu để làm cháy máy thu', 'Exhale a counter-resonance pulse into the sphere to overload the receiver', 'Tia lửa bật ngược dọc theo dây dẫn làm hỏng thiết bị của đội trinh sát. Bạn thu được linh kiện tinh vi bên trong.', 'Sparks surge back along the lead and fry the recon unit. You salvage the precision components inside.', { resonance: 6, wealth: 12, rep: 6, heat: 3 }, 'Luồng khói đổi sang màu đỏ rực và phóng điện vào lồng ngực bạn. Tọa độ ổ trú bị đánh dấu lên bản đồ của họ.', 'The smoke flashes crimson and arcs current into your chest. Your lair coordinates register on their map.', { health: -11, sanity: -4, heat: 8 }],
    ['Bạn chuyển sang tầng hầm khác trước khi khói lan tới.', 'You shift to another basement before the smoke reaches you.']),
  distortionTask('m_annual_distort_elder_calcification',
    '[Lớp vỏ hóa đá theo năm tháng] Qua nhiều năm biến dạng, lớp vỏ ngoài vai và lưng bạn bắt đầu cứng lại như đá vôi, làm chậm từng cú vung tay.',
    '[Calcifying carapace] Across years of distortion, the shell along your shoulders and back stiffens like limestone, slowing every swing of your arm.',
    ['Dùng thanh dầm thép cạy bỏ những mảng vỏ đã hóa thạch', 'Pry away the petrified plates with a steel girder', 'Máu đen rỉ ra dưới lớp vỏ mới mềm hơn. Đôi vai bạn nhẹ hẳn đi khi bước qua khung cửa hẹp.', 'Dark blood weeps beneath the softer new shell. Your shoulders feel lighter as you pass through the narrow doorframe.', { health: 6, sanity: 4, resonance: -2 }],
    ['Nung chảy phế liệu hợp kim đổ thẳng lên các rãnh nứt trên lưng', 'Melt scrap alloy and pour it straight into the dorsal fissures', 'Kim loại nóng chảy lấp đầy các khe đá vôi, kết thành lớp giáp dày chịu được đạn cỡ lớn.', 'Molten metal fills the limestone seams, hardening into thick plating that shrugs off heavy rounds.', { health: 14, resonance: 7, rep: 5, sanity: -4 }, 'Nhiệt độ quá cao làm nứt sâu vào mô thịt bên dưới. Bạn phải ngâm mình dưới cống nước lạnh suốt hai ngày.', 'Excess heat cracks deep into the tissue beneath. You submerge yourself in a cold culvert for two days.', { health: -12, sanity: -6 }],
    ['Bạn mặc kệ lớp vỏ dày thêm và di chuyển chậm lại.', 'You let the shell thicken and move more slowly.'])
];

export const ANNUAL_MERIT_OPPORTUNITIES = [
  ...CLIMBING_MERIT_OPPORTUNITIES,
  ...APEX_MINORS,
  ...APEX_COLOR_GENERATED,
  ...APEX_FINGER_GENERATED
];
