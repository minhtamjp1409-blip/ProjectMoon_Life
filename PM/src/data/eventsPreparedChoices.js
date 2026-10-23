const later = (eventId, delayYears = 1) => [{ eventId, delayYears,
  reasonVi: 'Hồ sơ từ đợt phong tỏa được mở lại', reasonEn: 'The cordon case is reopened' }];
const leave = {
  labelVi: 'Rút về trước khi lối ra đóng lại', labelEn: 'Withdraw before the exit closes',
  effects: { sanity: -2 }, resultVi: 'Bạn đánh dấu lối vào rồi quay về. Chuyến này không có tiền công.',
  resultEn: 'You mark the entrance and head back. There is no payment this time.'
};

export const PREPARED_CHOICE_EVENTS = [
  {
    id: 'mid_index_detour', age: [25, 40], jobs: ['Syndicate'], need: { finger: 'Index' }, major: true, weight: 10,
    vi: '[Chỉ Lệnh sau hàng rào] Chỉ Lệnh yêu cầu bạn đặt một chiếc thìa lên bàn trong căn nhà đang bị phong tỏa trước bình minh. Cửa chính có lính gác; một người bạn biết đường qua kho bên cạnh.',
    en: '[A Prescript beyond the fence] Your Prescript requires a spoon on a table inside the sealed block before dawn. Guards watch the front door; a friend knows a warehouse passage.',
    choices: [
      { labelVi: 'Nhờ bạn dẫn tới kho (mất 20 gắn bó)', labelEn: 'Ask your friend for the passage (20 bond)', favorCost: { role: 'friend', amount: 20 }, meritAdd: 12, effects: { sanity: -4 },
        resultVi: 'Bạn đặt thìa xuống bàn rồi quay lại. Người dẫn đường hỏi tại sao phải liều mạng vì việc ấy. Bạn không có câu trả lời.', resultEn: 'You place the spoon and return. Your guide asks why this required risking a life. You have no answer.' },
      { labelVi: 'Tự trèo qua hàng rào', labelEn: 'Climb the fence alone', effects: { health: -15, sanity: -6 }, meritAdd: 10,
        resultVi: 'Dây thép móc vào vai. Bạn tới căn nhà trước bình minh, mang theo chiếc thìa còn nguyên.', resultEn: 'Wire catches your shoulder. You reach the house before dawn with the spoon intact.' }
    ]
  },
  {
    id: 'mid_middle_bread', age: [25, 40], jobs: ['Syndicate'], need: { finger: 'Middle' }, major: true, weight: 10,
    vi: '[Bữa ăn thiếu người] Bếp chung thiếu hàng sau đợt phong tỏa. Một người em bị đuổi khỏi quầy bánh khi nhắc tên The Middle. Người anh mở sổ, hỏi bạn có nhìn rõ người bán hay không.',
    en: '[A meal short of supplies] The communal kitchen is short after the cordon. A younger member was turned away from a bakery after naming the Middle. An elder opens the book and asks whether you saw the seller clearly.',
    choices: [
      { labelVi: 'Trả 8 Ahn mua phần ăn, xin đi xác minh', labelEn: 'Buy food for 8 Ahn and ask to verify the account', costAhn: 8, effects: { network: 6 }, meritAdd: 8,
        resultVi: 'Bữa ăn được dọn lên. Người anh cho bạn thêm thời gian, nhưng giữ trang sổ mở tới lúc bạn trở lại.', resultEn: 'Food reaches the table. The elder grants you time but keeps the book open until your return.' },
      { labelVi: 'Nhận việc truy người bán theo lời kể', labelEn: 'Take the hunt on the strength of the account', effects: { heat: 10, sanity: -8 }, meritAdd: 12,
        resultVi: 'Bạn chép mô tả vào sổ. Ngoài phố có ba người mặc đúng chiếc áo ấy; tên nào ghi xuống cũng sẽ có người phải trả giá.', resultEn: 'You copy the description. Three people outside wear that coat; every name you write will carry a cost.' }
    ]
  },
  {
    id: 'mid_ring_crate', age: [25, 40], jobs: ['Syndicate'], need: { finger: 'Ring' }, major: true, weight: 10,
    vi: '[Kiện hàng chưa khô] Một tác phẩm của The Ring mắc ở trạm kiểm hàng. Bên trong kiện có tiếng gõ; người phụ trách triển lãm yêu cầu bạn mang về nguyên trạng, không để nhân viên mở nắp.',
    en: '[A crate not yet dry] A Ring exhibit is held at inspection. Something knocks inside. The curator wants it returned intact, without the staff opening the lid.',
    choices: [
      { labelVi: 'Dùng măng-tô che nhãn, đưa kiện qua cửa kho', labelEn: 'Cover the label with your coat and use the warehouse exit', need: { item: 'arm_trenchcoat_padded' }, effects: { sanity: -8, heat: 4 }, meritAdd: 12,
        resultVi: 'Bạn giao kiện đúng giờ. Khi lấy lại áo, lớp lót đã dính màu; tiếng gõ vẫn đều sau nắp gỗ.', resultEn: 'You deliver on time. Paint stains the lining when you recover your coat; the knocking continues beneath the wood.' },
      { labelVi: 'Xin chuyển lịch trưng bày', labelEn: 'Request a later exhibition date', effects: { rep: -8, sanity: -3 },
        resultVi: 'Người phụ trách gạch tên bạn khỏi buổi khai mạc. Kiện hàng nằm lại; đến tối, tiếng gõ dừng.', resultEn: 'The curator strikes you from the opening list. The crate stays behind; by evening the knocking stops.' }
    ]
  },
  {
    id: 'mid_pinky_witness', age: [25, 40], jobs: ['Syndicate'], need: { finger: 'Pinky' }, major: true, weight: 10,
    vi: '[Người giữ lời hẹn] Một người trong nhóm chưa trở lại từ khu phong tỏa. Bạn đã hứa đón họ ở cửa kho. Những người còn lại muốn đóng đường rút để tránh bị lần theo.',
    en: '[Keeping the appointment] A member has not returned from the sealed block. You promised to meet them at the warehouse. The others want the retreat closed before anyone can follow.',
    choices: [
      { labelVi: 'Giữ cửa, tự chịu phần nguy hiểm', labelEn: 'Hold the door and take the risk yourself', effects: { health: -12, network: 6 }, meritAdd: 10,
        resultVi: 'Người ấy tới với một chân kéo lê. Bạn kéo họ qua cửa rồi mới đẩy chốt; cánh tay bị kẹp để lại vết bầm tới tận vai.', resultEn: 'They arrive dragging one leg. You pull them through before dropping the bolt; your trapped arm bruises up to the shoulder.' },
      { labelVi: 'Đóng đường rút theo quyết định của nhóm', labelEn: 'Close the retreat with the others', effects: { sanity: -10, network: -4 },
        resultVi: 'Bạn đẩy chốt. Sáng hôm sau, không ai hỏi lại lời hẹn bên cửa kho.', resultEn: 'You slide the bolt. The next morning no one mentions the warehouse appointment.' }
    ]
  },
  {
    id: 'mid_fixer_cordon', age: [25, 40], jobs: ['Fixer'], major: true, weight: 12,
    need: { notOut: true },
    vi: '[Hợp đồng qua chốt] Một dãy phố bị phong tỏa sau vụ phá kho vật tư. Văn phòng nhận việc đưa thợ sửa điện vào trạm bơm. Chủ hợp đồng chỉ trả khi trạm chạy lại; đội gác đang đòi kiểm tra từng kiện hàng.',
    en: '[Through the cordon] A supply depot attack has sealed off a block. Your Office must escort repair workers to a pumping station. Payment depends on restoring power; guards are searching every crate.',
    choices: [
      { labelVi: 'Dùng măng-tô gia cố che chắn khi vượt đoạn trống', labelEn: 'Use your reinforced coat to cover the crossing',
        need: { item: 'arm_trenchcoat_padded' }, effects: { health: -4, wealth: 10 }, meritAdd: 16,
        scheduleConsequences: later('mid_fixer_claim'),
        resultVi: 'Mảnh vỡ mắc vào lớp lót. Nhóm thợ tới trạm bơm, nhưng phía thuê giữ lại một phần tiền để kiểm tra thiệt hại.',
        resultEn: 'Shrapnel catches in the lining. The workers reach the pump, but the client withholds part of the fee for a damage review.' },
      { labelVi: 'Dùng katana Workshop cắt dây chắn ở hẻm sau', labelEn: 'Use your Workshop katana to cut the rear alley wire',
        need: { item: 'wpn_workshop_katana' }, effects: { wealth: 10, heat: 6, sanity: -3 }, meritAdd: 14,
        scheduleConsequences: later('mid_fixer_claim'),
        resultVi: 'Dây chắn đứt, cả nhóm luồn qua hẻm. Đội gác tìm thấy dấu cắt vào sáng hôm sau; văn phòng của bạn nằm trong danh sách bị hỏi.',
        resultEn: 'The wire gives way and the team slips through. Guards find the cuts next morning; your Office is listed for questioning.' },
      { labelVi: 'Nhờ bạn thân dẫn đường vòng (mất 15 gắn bó)', labelEn: 'Ask your friend for a detour (15 bond)',
        favorCost: { role: 'friend', amount: 15 }, effects: { wealth: 8, sanity: -3 }, meritAdd: 12,
        scheduleConsequences: later('mid_fixer_claim'),
        resultVi: 'Bạn của bạn bỏ ca làm để dẫn cả nhóm qua đường kho. Chuyến hộ tống hoàn tất; người ấy nhắc bạn đừng coi sự giúp đỡ này là việc đương nhiên.',
        resultEn: 'Your friend misses a shift to guide the group through a warehouse. The escort succeeds; they ask you not to take their help for granted.' },
      { labelVi: 'Chạy qua khi đội gác đổi vị trí', labelEn: 'Cross while the guards change positions', outcomes: [
        { w: 55, effects: { health: -10, wealth: 12 }, meritAdd: 20, scheduleConsequences: later('mid_fixer_claim'),
          resultVi: 'Cả nhóm qua được. Viên đạn cuối cùng cắt rách tay áo bạn.', resultEn: 'The group gets through. The last bullet tears your sleeve.' },
        { w: 45, effects: { health: -20, sanity: -8, rep: -3 },
          resultVi: 'Đèn pha quét tới giữa đường. Bạn kéo nhóm thợ trở lại; văn phòng mất hợp đồng.', resultEn: 'A searchlight catches you halfway across. You pull the workers back; the Office loses the contract.' }
      ] }, leave
    ]
  },
  {
    id: 'mid_fixer_claim', age: [26, 45], jobs: ['Fixer'], major: true, causalOnly: true, weight: 0,
    vi: '[Khoản tiền giữ lại] Trạm bơm đã hoạt động. Chủ hợp đồng vẫn tính tiền cửa kho bị hỏng vào phí hộ tống. Bạn có thể theo đuổi hồ sơ hoặc chấp nhận khoản trả thấp hơn.',
    en: '[The withheld fee] The pump works again. The client still charges a broken warehouse door against the escort fee. You can pursue the claim or accept a smaller payment.',
    choices: [
      { labelVi: 'Nộp hồ sơ, chịu phí đối chiếu 4 Ahn', labelEn: 'File the claim, pay 4 Ahn for review', costAhn: 4,
        effects: { wealth: 12, sanity: -3 }, meritAdd: 10,
        resultVi: 'Ngày trên biên bản không khớp. Văn phòng nhận phần tiền còn thiếu sau nhiều lần đi lại.', resultEn: 'The dates on the damage report do not match. After repeated visits, the Office receives the missing payment.' },
      { labelVi: 'Nhận 5 Ahn và kết thúc tranh chấp', labelEn: 'Take 5 Ahn and close the dispute', effects: { wealth: 5 },
        resultVi: 'Bạn ký nhận. Lần sau, văn phòng sẽ đòi tiền đặt trước.', resultEn: 'You sign the receipt. Next time, the Office will ask for a deposit.' }
    ]
  },
  {
    id: 'mid_wing_recall', age: [25, 40], jobs: ['Wing Employee'], major: true, weight: 12,
    vi: '[Lô hàng thu hồi] Một lô linh kiện bị giữ ngoài Nest khiến bộ phận của bạn trễ chỉ tiêu. Trưởng nhóm yêu cầu ký xác nhận đã nhận đủ. Kho kiểm tra vẫn còn lưu bản gốc.',
    en: '[A recalled shipment] Parts held outside the Nest have put your department behind quota. Your supervisor asks you to sign for a complete delivery. Inspection still holds the original record.',
    choices: [
      { labelVi: 'Giữ bản sao và khai thiếu vật tư', labelEn: 'Keep a copy and report the shortage', effects: { rep: -4, sanity: -4 },
        flagsAdd: ['SupplyRecordCopy'], scheduleConsequences: later('mid_wing_review', 2),
        resultVi: 'Chỉ tiêu tháng bị trừ. Bạn giữ bản sao trong tủ riêng, kèm ngày và chữ ký của người kiểm hàng.', resultEn: 'The department loses quota credit. You keep a dated copy signed by the inspector.' },
      { labelVi: 'Ký đủ hàng để giữ chỉ tiêu', labelEn: 'Sign for the full shipment to preserve quota', effects: { wealth: 8, sanity: -8 }, meritAdd: 12,
        scheduleConsequences: later('mid_wing_review', 2),
        resultVi: 'Bảng đánh giá chuyển sang màu xanh. Tên bạn nằm dưới số linh kiện chưa từng tới kho.', resultEn: 'The performance sheet turns green. Your name sits beneath a count of parts that never arrived.' }
    ]
  },
  {
    id: 'mid_wing_review', age: [27, 45], jobs: ['Wing Employee'], major: true, weight: 0, causalOnly: true,
    vi: '[Đối chiếu chữ ký] Phòng kiểm toán mở lại lô hàng năm trước. Họ đặt hai tờ phiếu lên bàn và hỏi bạn nhận hàng vào ngày nào.',
    en: '[Signature review] Audit reopens the old shipment. Two forms lie on the desk. They ask when you received the parts.',
    choices: [
      { labelVi: 'Nộp bản sao đã giữ', labelEn: 'Submit the copy you kept', need: { flags: ['SupplyRecordCopy'] }, effects: { rep: 6, sanity: 4 }, meritAdd: 16,
        resultVi: 'Số kiện và thời điểm nhập kho khớp nhau. Bạn được gạch tên khỏi danh sách phải bồi hoàn.', resultEn: 'The crate count matches the intake time. Your name is removed from the reimbursement list.' },
      { labelVi: 'Nhận trách nhiệm, trả 10 Ahn', labelEn: 'Accept liability and pay 10 Ahn', costAhn: 10, effects: { sanity: -5 },
        resultVi: 'Biên bản được đóng lại. Khoản tiền ấy không xuất hiện trong bảng thưởng cuối năm.', resultEn: 'The case is closed. That payment will not appear in your year-end bonus.' },
      { labelVi: 'Yêu cầu điều tra tiếp', labelEn: 'Request further investigation', effects: { rep: -8, sanity: -8 },
        resultVi: 'Bạn giữ được tiền, nhưng bị chuyển sang việc kiểm đếm cho đến khi hồ sơ kết thúc.', resultEn: 'You keep your money but are reassigned to counting stock until the case closes.' }
    ]
  },
  {
    id: 'mid_finger_supply', age: [25, 40], jobs: ['Syndicate'], major: true, weight: 10,
    need: { finger: 'Thumb' },
    vi: '[Đạn qua khu phong tỏa] Chuyến đạn của The Thumb đến muộn. Cấp trên yêu cầu xác nhận số hộp còn nguyên niêm. Một người ngang hàng đề nghị chia nhau phần thiếu rồi báo đủ.',
    en: '[Ammunition under cordon] The Thumb’s shipment is late. Your superior demands a sealed-crate count. A peer suggests splitting the missing share and reporting a full delivery.',
    choices: [
      { labelVi: 'Báo đúng cấp trên, giữ lại số niêm', labelEn: 'Report through your superior and keep the seal numbers', effects: { network: -5 },
        flagsAdd: ['ThumbSealLedger'], scheduleConsequences: later('mid_thumb_reckoning'),
        resultVi: 'Người ngang hàng quay mặt đi. Cấp trên nhận báo cáo mà không cho phép bạn nói thêm.', resultEn: 'Your peer turns away. Your superior accepts the report and dismisses you before you can add anything.' },
      { labelVi: 'Nhận phần chia và ký đủ', labelEn: 'Take your share and sign', effects: { wealth: 12, heat: 10 },
        scheduleConsequences: later('mid_thumb_reckoning'),
        resultVi: 'Bạn cất tiền vào túi. Người giao hàng xé bản nháp; chữ ký trên bản chính vẫn còn.', resultEn: 'You pocket the money. The courier tears up the draft; your signature remains on the original.' }
    ]
  },
  {
    id: 'mid_thumb_reckoning', age: [26, 45], jobs: ['Syndicate'], need: { finger: 'Thumb' }, major: true, causalOnly: true, weight: 0,
    vi: '[Những số niêm] Cấp trên cho gọi từng người nhận chuyến đạn cũ. Không ai được nói khi chưa được hỏi. Đến lượt bạn, một số niêm được đọc lên.',
    en: '[Seal numbers] Your superior summons everyone who received the old shipment. No one speaks without permission. When your turn comes, a seal number is read aloud.',
    choices: [
      { labelVi: 'Được hỏi mới nộp sổ đối chiếu', labelEn: 'Wait for permission, then present your ledger', need: { flags: ['ThumbSealLedger'] }, meritAdd: 16, effects: { rep: 5 },
        resultVi: 'Sổ của bạn trùng với bản báo cáo. Bạn được cho lui; người kế tiếp vẫn quỳ ngoài cửa.', resultEn: 'Your ledger matches the report. You are dismissed; the next person is still kneeling outside.' },
      { labelVi: 'Cúi đầu nhận hình phạt', labelEn: 'Bow and accept punishment', effects: { health: -16, rep: -6, sanity: -6 },
        resultVi: 'Hình phạt được thi hành ngay tại bàn. Bạn rời phòng với bàn tay quấn vải.', resultEn: 'The punishment is carried out at the table. You leave with a cloth wrapped around your hand.' }
    ]
  },
  {
    id: 'abno_observation_archive', age: [25, 55], jobs: ['Fixer'], major: true, weight: 5, need: { notOut: true },
    vi: '[Phòng quan sát còn điện] Một hợp đồng thu hồi đưa bạn tới chi nhánh L Corp bỏ hoang. Sau lớp kính là một dị thể đang lặp lại cùng một cử động. Sổ trực ghi thời điểm đèn báo đổi màu; trang hướng dẫn tiếp xúc đã bị xé.',
    en: '[An observation room with power] A recovery job brings you to an abandoned L Corp branch. Behind glass, an Abnormality repeats the same movement. The duty log records changes in the warning light; the handling page is torn out.',
    choices: [
      { labelVi: 'Ở ngoài kính, ghi lại một chu kỳ', labelEn: 'Stay behind glass and record a cycle', effects: { sanity: -6, wealth: -3 },
        flagsAdd: ['AbnoCycleNotes'], scheduleConsequences: later('abno_archive_recovery'),
        resultVi: 'Mỗi lần chuông ngắt, dị thể quay về phía cửa phục vụ. Bạn vẽ lại sơ đồ và đưa bản ghi về cho đội thu hồi.', resultEn: 'Whenever the bell stops, the creature turns toward the service door. You map the room and bring the notes to the recovery team.' },
      { labelVi: 'Dùng ống Enkephalin để chịu hết ca quan sát', labelEn: 'Use an Enkephalin inhaler to finish observing', useItem: 'con_enkephalin_inhaler',
        effects: { sanity: -2 }, flagsAdd: ['AbnoCycleNotes'], scheduleConsequences: later('abno_archive_recovery'),
        resultVi: 'Bạn dùng hết ống thuốc và ghi được khoảng nghỉ giữa các lượt chuông. Thuốc không giúp bạn biết thứ bên trong muốn gì.', resultEn: 'You empty the inhaler and record the pause between bells. The drug does not tell you what the creature wants.' }, leave
    ]
  },
  {
    id: 'abno_archive_recovery', age: [26, 60], jobs: ['Fixer'], major: true, causalOnly: true, weight: 0,
    requires: ['AbnoCycleNotes'],
    vi: '[Lượt chuông kế tiếp] Đội thu hồi trở lại để lấy ổ lưu trữ ngoài phòng giam. Dị thể vẫn quay về cửa phục vụ khi chuông dứt. Một dây nguồn nằm chắn lối rút; cắt nó có thể làm cửa tự khóa.',
    en: '[The next bell] The team returns for a drive outside containment. The creature still turns toward the service door when the bell stops. A power cable blocks your retreat; cutting it could lock the doors.',
    choices: [
      { labelVi: 'Theo bản ghi, vòng dây và chờ hết chu kỳ', labelEn: 'Follow the notes, step around the cable and wait', need: { flags: ['AbnoCycleNotes'] },
        effects: { sanity: -8, wealth: 14, resonance: 6 }, meritAdd: 20,
        resultVi: 'Bạn lấy được ổ lưu trữ trước lượt chuông tiếp theo. Đội thu hồi niêm phong lối vào; không ai nhận hợp đồng mở phòng giam.', resultEn: 'You retrieve the drive before the next bell. The team seals the entrance; no one accepts a job to open containment.' },
      { labelVi: 'Cắt dây, đánh cược cửa còn mở', labelEn: 'Cut the cable and gamble on the door staying open', outcomes: [
        { w: 40, effects: { wealth: 18, resonance: 8 }, meritAdd: 22, resultVi: 'Cửa đứng yên. Bạn giật ổ lưu trữ rồi chạy trước khi chuông trở lại.', resultEn: 'The door holds. You snatch the drive and run before the bell resumes.' },
        { w: 60, effects: { health: -22, sanity: -16 }, resultVi: 'Khóa sập xuống. Bạn phải lách qua cửa bảo trì, bỏ lại thiết bị cùng phần tiền công.', resultEn: 'The lock drops. You squeeze through a maintenance hatch, leaving the equipment and your fee behind.' }
      ] }, leave
    ]
  }
];
