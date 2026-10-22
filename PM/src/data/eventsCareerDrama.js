const later = (eventId, delayYears, reasonVi, reasonEn) => [{ eventId, delayYears, reasonVi, reasonEn }];

export const CAREER_DRAMA_EVENTS = [
  {
    id: 'drama_index_name_on_prescript', age: [20, 60], major: true, weight: 36,
    need: { jobs: ['Syndicate'], finger: 'Index', npc: 'friend', fingerRankAtLeast: 1 },
    vi: '[Tên trong Sắc lệnh] Messenger đưa bạn một Prescript niêm sáp. Trước lúc chuông khu phố điểm mười hai tiếng, bạn phải giết {friend}. Không có dòng giải thích.',
    en: '[A name on the Prescript] A Messenger hands you a sealed Prescript. Before the district bell strikes twelve, you must kill {friend}. No reason is given.',
    choices: [
      { labelVi: 'Thi hành đúng giờ', labelEn: 'Carry it out on time', resultVi: 'Bạn lau con dao ở bậc thềm nhà {friend}. Messenger chỉ kiểm tra giờ ghi trên đồng hồ rồi nhận tờ biên nhận.', resultEn: 'You wipe the knife on {friend}’s doorstep. The Messenger checks the time, then takes your receipt.', effects: { sanity: -22, rep: 5, heat: 4 }, meritAdd: 10, npcFate: { friend: 'dead' }, mem: 'index_obeyed_friend_prescript' },
      { labelVi: 'Đưa {friend} ra khỏi khu phố', labelEn: 'Get {friend} out of the district', resultVi: 'Chuyến xe rời bến trước tiếng chuông cuối. Prescript vẫn nằm trong tay bạn; tên người nhận tiếp theo đã được viết ở mặt sau.', resultEn: 'The coach leaves before the final bell. The Prescript remains in your hand; another recipient’s name is written on its back.', effects: { wealth: -12, sanity: -7, heat: 15, rep: -5 }, bond: { friend: 14 }, mem: 'index_defied_friend_prescript', scheduleConsequences: later('drama_index_unanswered_prescript', 2, 'Prescript chưa được hoàn thành', 'The Prescript remains unfulfilled') }
    ]
  },
  {
    id: 'drama_index_unanswered_prescript', age: [21, 70], major: true, causalOnly: true, isCausalCallback: true, weight: 100,
    need: { mem: 'index_defied_friend_prescript' },
    vi: '[Phong bì thứ hai] Một phong bì nằm dưới cửa xưởng. Bên trong là vé xe cũ của {friend} và một Prescript mới: giao lại tấm vé cho Messenger trước bình minh.',
    en: '[The second envelope] Beneath your door lies {friend}’s old ticket. A new Prescript orders you to return it to the Messenger before dawn.',
    remembers: ['friend'],
    choices: [
      { labelVi: 'Giao vé, giữ kín nơi ở của họ', labelEn: 'Return the ticket and conceal their whereabouts', resultVi: 'Messenger nhận vé, không hỏi ga đến. Bạn không biết đó là lòng khoan dung hay một phép thử khác.', resultEn: 'The Messenger takes the ticket without asking for the destination. You cannot tell whether this is mercy or another test.', effects: { sanity: -5, heat: -8 }, meritAdd: 4 },
      { labelVi: 'Đốt vé, cắt đứt dấu vết', labelEn: 'Burn the ticket and sever the trail', resultVi: 'Tro bám vào đầu ngón tay. Đến trưa, hai người gõ cửa hỏi vì sao bạn không giao món đồ được chỉ định.', resultEn: 'Ash clings to your fingers. By noon, two people knock and ask why the assigned delivery never arrived.', effects: { health: -12, heat: 17, rep: -8 }, mem: 'index_twice_defied' }
    ]
  },
  {
    id: 'drama_middle_book_entry', age: [20, 62], major: true, weight: 36,
    need: { jobs: ['Syndicate'], finger: 'Middle', npc: 'friend' },
    vi: '[Trang sổ thù] Trong Book of Vengeance của một Big Sibling, bạn thấy tên {friend}. Dòng bên cạnh ghi món nợ của một người khác; nét mực sửa tên còn chưa khô.',
    en: '[A page in the Book] A Big Sibling’s Book of Vengeance lists {friend}. The debt beside it belongs to someone else; the amended ink is still wet.',
    choices: [
      { labelVi: 'Báo cho {friend} rồi tìm người sửa sổ', labelEn: 'Warn {friend} and find who altered the entry', resultVi: '{friend} trốn ngay trong đêm. Người giữ sổ giao bạn hai ngày để đưa ra bằng chứng, không thêm một giờ.', resultEn: '{friend} flees that night. The keeper gives you two days to produce proof, not an hour more.', effects: { wealth: -7, heat: 10, network: -4 }, bond: { friend: 12 }, mem: 'middle_disputed_entry', scheduleConsequences: later('drama_middle_ink_witness', 1, 'The Middle đòi chứng cứ về dòng tên bị sửa', 'The Middle demands proof about the altered name') },
      { labelVi: 'Làm theo sổ', labelEn: 'Follow the Book', resultVi: 'Bạn tìm thấy {friend} trước đội thu nợ. Khi gạch tên xong, bạn nhận ra người sửa sổ đứng ngay trong hàng người chứng kiến.', resultEn: 'You reach {friend} before the collectors. Once the name is crossed out, you spot the one who changed it among the witnesses.', effects: { sanity: -19, rep: 5 }, npcFate: { friend: 'dead' }, meritAdd: 9, mem: 'middle_obeyed_false_entry' }
    ]
  },
  {
    id: 'drama_middle_ink_witness', age: [21, 68], major: true, causalOnly: true, isCausalCallback: true, weight: 100,
    need: { mem: 'middle_disputed_entry' },
    vi: '[Nét mực không khớp] Người giữ sổ đặt hai trang dưới đèn. Mực trên tên {friend} khác màu. Kẻ sửa sổ chỉ đứng cách bạn một cái bàn.',
    en: '[The mismatched ink] The keeper sets two pages under a lamp. The ink on {friend}’s name differs. The forger stands across the table.',
    remembers: ['friend'],
    choices: [
      { labelVi: 'Chỉ ra nét mực trước mặt Big Sibling', labelEn: 'Show the ink to the Big Sibling', resultVi: 'Trang giấy được sửa lại. Kẻ giả mạo phải trả món nợ của chính mình; bạn mất người từng che lưng cho mình trong tổ.', resultEn: 'The page is corrected. The forger must settle their own debt; you lose an ally who once watched your back.', effects: { network: -8, heat: 8, rep: 4 }, meritAdd: 7 },
      { labelVi: 'Nhận lỗi chép nhầm về mình', labelEn: 'Take the blame for the altered entry', resultVi: 'Tên {friend} được xóa. Tên bạn chuyển sang mục người phải bồi thường.', resultEn: '{friend}’s name is removed. Yours moves to the restitution column.', effects: { wealth: -18, health: -9, sanity: -5 }, bond: { friend: 8 } }
    ]
  },
  {
    id: 'drama_ring_ward', age: [20, 55], major: true, weight: 36,
    need: { jobs: ['Syndicate'], finger: 'Ring', noNpc: 'ward' },
    vi: '[Đứa trẻ ở cửa sau] Một đứa bé ngủ dưới mái che phòng tranh, ôm khung tranh rỗng. Docent bảo bạn có thể cho nó vào; danh sách học việc tháng tới vẫn còn chỗ.',
    en: '[A child at the back door] A child sleeps beneath the gallery awning, clutching an empty frame. A Docent says the next apprentice list has room.',
    choices: [
      { labelVi: 'Cho đứa trẻ ở cùng, không ghi tên vào danh sách', labelEn: 'Take the child in without enrolling them', resultVi: 'Bạn mua thêm một chiếc bát. Docent nhìn thấy nó trên bàn và không nói gì; vài tháng sau, ông ta hỏi tên đứa trẻ.', resultEn: 'You buy another bowl. The Docent notices it and says nothing. Months later, he asks the child’s name.', npcAdd: { role: 'ward', bond: 65, ageAtMeet: 10 }, effects: { wealth: -10, sanity: 4 }, mem: 'ring_hid_ward', scheduleConsequences: later('drama_ring_exhibition', 3, 'Docent vẫn nhớ tên đứa trẻ', 'The Docent remembers the child’s name') },
      { labelVi: 'Đưa nó đến khu cư trú khác', labelEn: 'Send the child to another district', resultVi: 'Bạn trả tiền chuyến xe. Khi quay lại, khung tranh rỗng vẫn tựa cạnh cửa phòng tranh.', resultEn: 'You pay for the coach. When you return, the empty frame still leans beside the gallery door.', effects: { wealth: -7, sanity: -3 } }
    ]
  },
  {
    id: 'drama_ring_exhibition', age: [23, 65], major: true, causalOnly: true, isCausalCallback: true, weight: 100,
    need: { mem: 'ring_hid_ward', npc: 'ward' },
    vi: '[Tác phẩm số mười bảy] Khách xem đứng kín hành lang. Sau tấm kính cuối phòng, {ward} còn cử động. Tấm nhãn ghi tên nghệ sĩ là Docent đã hỏi bạn ba năm trước.',
    en: '[Work Seventeen] Visitors crowd the corridor. Beyond the last pane, {ward} still moves. The label credits the Docent who asked their name three years ago.',
    choices: [
      { labelVi: 'Đập kính, đưa {ward} đi', labelEn: 'Break the glass and take {ward} away', resultVi: 'Kính vỡ, còi báo động nổi lên. {ward} bám chặt cổ tay bạn trên đường chạy; hai người không thể trở lại phòng tranh.', resultEn: 'Glass breaks and the alarm sounds. {ward} grips your wrist as you run; neither of you can return to the gallery.', effects: { health: -22, wealth: -12, heat: 28, rep: -10, sanity: 5 }, bond: { ward: 12 }, mem: 'ring_ward_escaped' },
      { labelVi: 'Đứng xem đến khi phòng đóng cửa', labelEn: 'Stay until the gallery closes', resultVi: 'Đèn tắt từng dãy. Bạn nhận tiền công bảo vệ, còn tấm nhãn dưới kính được phủ vải.', resultEn: 'The lights go out row by row. You collect the guard’s pay; a cloth covers the label beneath the glass.', effects: { wealth: 14, sanity: -24, rep: 4 }, npcFate: { ward: 'dead' }, meritAdd: 7, mem: 'ring_ward_exhibited' }
    ]
  },
  {
    id: 'drama_thumb_missing_seal', age: [21, 62], major: true, weight: 34,
    need: { jobs: ['Syndicate'], finger: 'Thumb', fingerRankAtLeast: 1 },
    vi: '[Con dấu thất lạc] Một phong bì mang dấu của Capo đến kho đạn, nhưng niêm phong đã bị bóc. Lính gác cúi đầu xin bạn xác nhận; cấp trên chưa đến.',
    en: '[The broken seal] An envelope bearing a Capo’s seal reaches the ammunition store already opened. The guard bows and asks for your confirmation; the superior has yet to arrive.',
    choices: [
      { labelVi: 'Đợi Capo xác nhận, để hàng giao chậm', labelEn: 'Wait for the Capo and delay the shipment', resultVi: 'Lô hàng đến muộn. Capo kiểm lại dấu, rồi bắt người đã mở phong bì trước khi nó vào kho.', resultEn: 'The shipment runs late. The Capo checks the seal and catches whoever opened the envelope before it reached the store.', effects: { wealth: -6, rep: 3 }, meritAdd: 5 },
      { labelVi: 'Ký nhận thay để giữ đúng giờ', labelEn: 'Sign for it to keep the schedule', resultVi: 'Xe rời kho đúng giờ. Khi Capo tới, chữ ký của bạn nằm cạnh con dấu đã rách.', resultEn: 'The truck leaves on time. When the Capo arrives, your signature sits beside the broken seal.', effects: { rep: -7, heat: 9, sanity: -4 }, meritAdd: 7 }
    ]
  },
  {
    id: 'drama_pinky_oath_witness', age: [21, 62], major: true, weight: 34,
    need: { jobs: ['Syndicate'], finger: 'Pinky', fingerRankAtLeast: 1 },
    vi: '[Người chứng lời thề] Một người cùng tổ phá lời hẹn giao hàng để cứu em mình. Chủ nợ muốn bạn làm chứng rằng giao kèo đã bị bẻ gãy.',
    en: '[Witness to an oath] A crewmate broke a delivery oath to save their sibling. The creditor asks you to attest that the contract was broken.',
    choices: [
      { labelVi: 'Làm chứng theo đúng giao kèo', labelEn: 'Testify to the breach', resultVi: 'Chủ nợ thu hồi hàng và ghi tên người ấy vào sổ. Đến lượt trực sau, chỗ của họ vẫn để trống.', resultEn: 'The creditor reclaims the goods and records the crewmate’s name. Their post stays empty on the next watch.', effects: { rep: 5, sanity: -8, network: -7 }, meritAdd: 7 },
      { labelVi: 'Nhận khoản thiếu về mình', labelEn: 'Assume the missing debt', resultVi: 'Bạn ký dưới số tiền còn thiếu. Người cùng tổ trở lại làm việc, còn chủ nợ biết phải tìm bạn ở đâu.', resultEn: 'You sign beneath the missing sum. Your crewmate returns to work, and the creditor now knows where to find you.', effects: { wealth: -17, network: 5, heat: 5 }, meritAdd: 3 }
    ]
  },
  {
    id: 'drama_fixer_unpaid_request', age: [19, 63], major: true, weight: 45,
    need: { jobs: ['Fixer'], grade: [2, 9], npc: 'partner' },
    vi: '[Ủy thác không người trả] Office nhận tiền đưa một người ra khỏi Backstreets. Đến điểm hẹn, khách hàng đã chết; {partner} hỏi bạn có tiếp tục hộ tống không.',
    en: '[The unpaid request] Your Office was paid to escort someone out of the Backstreets. At the rendezvous, the client is dead; {partner} asks whether the escort continues.',
    choices: [
      { labelVi: 'Đưa người đó đi, tự gánh phí', labelEn: 'Finish the escort and cover the cost', resultVi: 'Hai người đến cổng trước giờ khóa. Office trừ khoản đạn và thuốc khỏi phần công của bạn.', resultEn: 'You reach the gate before it closes. The Office deducts ammunition and medicine from your pay.', effects: { wealth: -12, health: -11, rep: 5 }, bond: { partner: 8 }, meritAdd: 9, mem: 'fixer_escorted_unpaid', scheduleConsequences: later('drama_fixer_receipt', 2, 'Người được hộ tống tìm lại Office', 'The escorted person returns to the Office') },
      { labelVi: 'Khép hồ sơ khi người thuê chết', labelEn: 'Close the file when the client dies', resultVi: 'Bạn ký dòng cuối báo cáo. {partner} cất chìa khóa xe; người cần hộ tống vẫn đứng ngoài cổng.', resultEn: 'You sign the final line of the report. {partner} pockets the van key; the person to be escorted remains outside the gate.', effects: { sanity: -7, wealth: 4, rep: -4 }, bond: { partner: -9 } }
    ]
  },
  {
    id: 'drama_fixer_receipt', age: [21, 68], major: true, causalOnly: true, isCausalCallback: true, weight: 100,
    need: { mem: 'fixer_escorted_unpaid' },
    vi: '[Biên nhận cũ] Người bạn từng hộ tống trở lại Office với biên nhận nhàu nát. Họ tìm được việc, muốn trả món nợ bằng tiền mặt hoặc một đầu mối ủy thác.',
    en: '[The old receipt] The person you escorted returns with a crumpled receipt. They found work and offer cash or a lead on a new request.',
    choices: [
      { labelVi: 'Nhận lại tiền', labelEn: 'Take the money', resultVi: 'Bạn gạch món nợ khỏi sổ Office. Khoản này đủ trả tiền thuốc còn treo.', resultEn: 'You strike the debt from the Office ledger. It covers the medicine bill still outstanding.', effects: { wealth: 12, sanity: 3 } },
      { labelVi: 'Nhận đầu mối ủy thác', labelEn: 'Take the lead', resultVi: 'Địa chỉ viết ở mặt sau biên nhận. Bạn phải bỏ một ca trực để kiểm tra nó, nhưng Office đã có khách mới.', resultEn: 'The address is on the back of the receipt. You miss a shift to verify it, but the Office has a new client.', effects: { health: -5, network: 5 }, meritAdd: 10 }
    ]
  },
  {
    id: 'drama_fixer_association_report', age: [23, 68], major: true, weight: 55,
    need: { jobs: ['Fixer'], grade: [1, 6] },
    vi: '[Bản báo cáo gửi Hana] Một Office khác nhận công cho vụ bạn đã giải quyết. Bản khai của họ chỉ sai một chi tiết: tên người sống sót bị thay bằng tên người đã chết.',
    en: '[The report to Hana] Another Office claims credit for your case. Their statement changes one detail: the survivor’s name has been replaced by the dead person’s.',
    choices: [
      { labelVi: 'Nộp chứng cứ sửa hồ sơ', labelEn: 'Submit evidence to correct the file', resultVi: 'Hana mở lại hồ sơ. Bạn mất ba ngày chờ đối chiếu, nhưng tên người sống sót được trả về đúng chỗ.', resultEn: 'Hana reopens the file. You lose three days to verification, but the survivor’s name returns to its proper place.', effects: { wealth: -7, rep: 5, network: -3 }, meritAdd: 11 },
      { labelVi: 'Bỏ qua, nhận việc mới', labelEn: 'Leave it and take another job', resultVi: 'Hồ sơ đóng dấu. Người sống sót hỏi vì sao giấy tờ của mình ghi đã chết; bạn không có câu trả lời.', resultEn: 'The file is stamped. The survivor asks why their papers say they died; you have no answer.', effects: { sanity: -6, wealth: 5 }, meritAdd: 3 }
    ]
  },
  {
    id: 'drama_fixer_office_payroll', age: [20, 62], major: true, weight: 42,
    need: { jobs: ['Fixer'], grade: [3, 9], npc: 'partner' },
    vi: '[Bảng lương của Office] Trong sổ lương, tên {partner} nằm ở cột nhân viên đã nghỉ. Họ vẫn đi cùng bạn mỗi ca; người quản lý nói đó là lỗi kế toán.',
    en: '[The Office payroll] The ledger lists {partner} among departed staff. They still work beside you every shift; the manager calls it an accounting error.',
    choices: [
      { labelVi: 'Đối chiếu hợp đồng trước mặt cả Office', labelEn: 'Compare the contract before the whole Office', resultVi: 'Người quản lý sửa sổ. Cuối tuần, phần chia của bạn giảm; {partner} lần đầu cầm đủ tiền công.', resultEn: 'The manager corrects the ledger. Your share shrinks that week; {partner} receives their full wage for the first time.', effects: { wealth: -9, network: -5, rep: 3 }, bond: { partner: 12 }, meritAdd: 5 },
      { labelVi: 'Nhận phần chênh lệch và im lặng', labelEn: 'Take the difference and stay quiet', resultVi: 'Tiền đến đều mỗi tuần. {partner} phải mượn Ahn mua băng thuốc sau ca trực.', resultEn: 'The money arrives each week. {partner} has to borrow Ahn for bandages after the next job.', effects: { wealth: 14, sanity: -8 }, bond: { partner: -16 } }
    ]
  },
  {
    id: 'drama_wing_quota_sheet', age: [19, 62], major: true, weight: 66,
    need: { jobs: ['Wing Employee'] },
    vi: '[Chỉ tiêu cuối quý] Bảng sản lượng của Wing đạt chỉ tiêu nhờ bỏ trống cột tai nạn. Người phụ trách nhờ bạn ký xác nhận trước khi đoàn kiểm tra đến.',
    en: '[Quarter-end quota] The Wing meets its target because the accident column is blank. Your supervisor asks for your signature before inspection.',
    choices: [
      { labelVi: 'Ký vào bảng đã sửa', labelEn: 'Sign the altered sheet', resultVi: 'Đoàn kiểm tra đi qua trong mười phút. Tiền thưởng được chuyển; tủ đồ của một nhân viên không còn ai mở.', resultEn: 'The inspectors pass through in ten minutes. Your bonus arrives; one employee’s locker remains unopened.', effects: { wealth: 12, sanity: -12, rep: 4 }, meritAdd: 7, mem: 'wing_signed_quota' },
      { labelVi: 'Điền số tai nạn còn thiếu', labelEn: 'Restore the missing accident count', resultVi: 'Chỉ tiêu không đạt. Bạn giữ bản sao trước khi phòng nhân sự thu lại hồ sơ gốc.', resultEn: 'The quota fails. You keep a copy before personnel retrieves the original.', effects: { wealth: -9, network: -8, heat: 7, sanity: 3 }, meritAdd: 5, mem: 'wing_kept_quota_copy', scheduleConsequences: later('drama_wing_copy_audit', 2, 'Bản sao bảng sản lượng bị phát hiện', 'The copied quota sheet is discovered') }
    ]
  },
  {
    id: 'drama_wing_copy_audit', age: [21, 68], major: true, causalOnly: true, isCausalCallback: true, weight: 100,
    need: { mem: 'wing_kept_quota_copy' },
    vi: '[Bản sao trong ngăn kéo] Bộ phận pháp chế biết bạn giữ bảng sản lượng gốc. Họ đề nghị mua lại bản sao, kèm một tờ cam kết không nhắc đến tai nạn.',
    en: '[The copy in your drawer] Legal knows you kept the original production sheet. They offer to buy it back with a promise never to mention the accidents.',
    choices: [
      { labelVi: 'Giao bản sao và ký cam kết', labelEn: 'Return the copy and sign', resultVi: 'Bạn nhận tiền trước khi đặt bút. Cuộc kiểm tra khép lại, còn những cái tên bị bỏ trống không trở vào sổ.', resultEn: 'You receive the money before signing. The inquiry closes; the missing names never return to the ledger.', effects: { wealth: 17, sanity: -11, heat: -5 }, meritAdd: 5 },
      { labelVi: 'Đưa bản sao cho người bị ảnh hưởng', labelEn: 'Give the copy to the affected families', resultVi: 'Họ có chứng cứ để đòi tiền bồi thường. Thẻ ra vào của bạn bị khóa ngay buổi chiều.', resultEn: 'They have proof for a claim. Your access card is disabled that afternoon.', effects: { wealth: -10, heat: 15, network: -12, rep: 7 }, setJob: 'Outcast', mem: 'wing_broke_silence' }
    ]
  },
  {
    id: 'drama_wing_sealed_room', age: [23, 62], major: true, weight: 70,
    need: { jobs: ['Wing Employee'], wingRank: 1 },
    vi: '[Phòng khóa niêm] Ca trực bàn giao thiếu một nhân viên. Cửa phòng thử nghiệm đã khóa từ bên trong; lệnh của quản lý là niêm kín đến sáng.',
    en: '[The sealed room] One employee is missing at shift change. The test room is locked from within; management orders it sealed until morning.',
    choices: [
      { labelVi: 'Mở cửa, gọi đội cứu hộ', labelEn: 'Open the door and call rescue', resultVi: 'Người bên trong còn thở. Báo cáo ghi bạn tự ý phá niêm; người ấy ký tên làm chứng.', resultEn: 'The person inside is breathing. The report says you broke the seal; they sign as witness.', effects: { health: -12, network: -7, rep: 5 }, meritAdd: 6 },
      { labelVi: 'Giữ niêm phong đến sáng', labelEn: 'Keep the seal until morning', resultVi: 'Bạn bàn giao chìa khóa đúng giờ. Khi cửa mở, đội y tế chỉ còn việc ghi thời điểm tử vong.', resultEn: 'You hand over the key on time. When the door opens, the medics only record the time of death.', effects: { sanity: -14, wealth: 5 }, meritAdd: 5 }
    ]
  }
];
