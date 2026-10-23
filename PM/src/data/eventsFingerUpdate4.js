import { M, C, O, I, D, AGE } from './storyKit.js';
import { fneed } from './fingerKit.js';

const senior = (finger) => fneed(finger, 2);

export const FINGER_UPDATE4_MINORS = [
  M('m_thumb_senior_tribute', AGE.GROWN, senior('Thumb'),
    '[Sổ cống nạp cuối tháng] Hai Capo dưới quyền báo cùng một khoản thu. Nếu ký cả hai, đội của bạn có tiền; khi Sottocapo đối sổ, chính tên bạn ở cuối trang.',
    '[The month-end tribute ledger] Two Capos under you report the same payment. Signing both funds your crew; when the Sottocapo checks the books, your name is at the bottom.', [
      C('Đòi chứng từ và giữ sổ lại một ngày', 'Demand receipts and keep the ledger overnight', 'Bạn tìm thấy một khoản bị ghi trùng. Đội mất một ngày lương, còn báo cáo của bạn không có chỗ sai.', 'You find a duplicate entry. Your crew loses a day of pay, but your report has no false line.', { merit: 4, rep: 2, wealth: -3, sanity: -2 }),
      C('Ký ngay để giữ tiền cho đội', 'Sign now to keep the money in the crew', null, null, {}, { out: [
        O(55, 'Chứng từ bổ sung đến trước khi kiểm sổ. Bạn giữ được đội và lời của mình.', 'The missing receipt arrives before inspection. You keep both your crew and your word.', { merit: 5, wealth: 5, rep: 2 }),
        O(45, 'Khoản trùng bị phát hiện. Bạn nộp tiền bù và nhận trách nhiệm trước Sottocapo.', 'The duplicate is found. You repay it and answer to the Sottocapo.', { wealth: -10, rep: -5, sanity: -4 })
      ] })
    ], I('Bạn giao sổ cho người khác ký. Quyền quyết định đi cùng trách nhiệm.', 'You hand the book to someone else. The authority goes with the blame.'), { theme: 'work' }),
  M('m_index_senior_prescript', AGE.GROWN, senior('Index'),
    '[Một Prescript cho người dưới quyền] Mảnh giấy niêm phong gọi tên một Proselyte đang sốt. Bạn có quyền giao nó đúng chữ, hoặc giữ người ấy ở lại và tự báo việc chưa hoàn thành.',
    '[A Prescript for a subordinate] A sealed slip names a feverish Proselyte. You can deliver it as written, or keep them inside and report the order unfinished yourself.', [
      C('Giao đúng người, cử người đi cùng', 'Deliver it to its addressee with an escort', 'Proselyte hoàn thành việc rồi ngã gục ở cửa. Người đi cùng đưa họ về, và bạn trả tiền thuốc.', 'The Proselyte finishes the task and collapses at the door. The escort brings them home; you pay for medicine.', { merit: 4, wealth: -5, network: 3, sanity: -3 }),
      C('Giữ họ ở lại và nhận trách nhiệm', 'Keep them inside and take responsibility', null, null, {}, { out: [
        O(50, 'Người giao Prescript ghi nhận lời báo. Một bản mới đến sau hai ngày, khi Proselyte đã đứng dậy được.', 'The messenger records your report. A new slip arrives two days later, when the Proselyte can stand.', { sanity: 4, network: 4, rep: 2 }),
        O(50, 'Không có bản thay thế. Việc bỏ dở bị ghi dưới tên bạn; Proselyte vẫn sống.', 'There is no replacement. The unfinished order is recorded under your name; the Proselyte lives.', { rep: -6, merit: -4, sanity: -3 })
      ] })
    ], I('Bạn để người đưa thư tự quyết. Họ giao mảnh giấy như thường lệ.', 'You let the messenger decide. They deliver the slip as usual.'), { theme: 'work' }),
  M('m_middle_senior_book', AGE.GROWN, senior('Middle'),
    '[Một tên trong sổ, hai gia đình] Người gây thương tích cho một Sibling đã bồi thường, nhưng họ hàng của nạn nhân vẫn muốn giữ tên trong Book of Vengeance. Cả hai bên nhìn bạn chờ quyết định.',
    '[One name, two families] The person who hurt a Sibling has paid restitution, but the victim’s kin still want the name in the Book of Vengeance. Both sides wait for your decision.', [
      C('Gặp người bị thương trước khi chốt sổ', 'Speak to the injured Sibling before closing the book', 'Họ muốn khoản bồi thường đến thẳng nhà mình. Bạn làm việc đó và để tên trong sổ thêm một tháng.', 'They want the payment brought to their home. You arrange it and leave the name in the book one more month.', { merit: 4, network: 3, wealth: -3, sanity: 2 }),
      C('Giữ tên và đưa cả tổ đi đòi thêm', 'Keep the name and take the crew to collect more', null, null, {}, { out: [
        O(55, 'Bên kia trả thêm rồi rút lui. Gia đình bạn được tiếng cứng rắn, còn vụ việc chưa hẳn kết thúc.', 'The other side pays more and withdraws. Your family looks strong, though the quarrel may return.', { wealth: 6, rep: 4, heat: 4 }),
        O(45, 'Họ chống trả. Hai Sibling bị thương và tên bạn nằm trong biên bản của cả hai nhà.', 'They fight back. Two Siblings are hurt, and your name enters both families’ records.', { health: -9, network: -5, heat: 7 })
      ] })
    ], I('Người giữ sổ để dòng ấy mở sang tháng sau.', 'The bookkeeper leaves the line open until next month.'), { theme: 'work' }),
  M('m_ring_maestro_hanging', AGE.GROWN, senior('Ring'),
    '[Chỗ treo tác phẩm của bạn] Hai Docent xin cùng một gian phòng. Bạn là người chịu trách nhiệm cho buổi mở cửa; một tác phẩm cần ánh sáng, tác phẩm kia cần bóng tối.',
    '[Where your work will hang] Two Docents ask for the same room. You are responsible for the opening; one piece needs light, the other shadow.', [
      C('Đổi giờ trưng bày và trả thêm cho thợ dựng', 'Split the exhibition hours and pay the installers', 'Hai tác phẩm đều có thời gian riêng. Khán giả quay lại vào buổi tối để xem tác phẩm thứ hai.', 'Both works have their own hours. Visitors return in the evening for the second piece.', { merit: 4, rep: 3, wealth: -5, network: 2 }),
      C('Chọn một tác phẩm rồi chịu trách nhiệm', 'Choose one work and own the decision', null, null, {}, { out: [
        O(55, 'Gian phòng chật người. Docent còn lại ở lại giúp bạn thu dọn và xin một ngày khác.', 'The room fills. The other Docent stays to help close and asks for another day.', { merit: 5, rep: 4, sanity: -2 }),
        O(45, 'Ánh sáng làm hỏng chất liệu. Bạn trả tiền phục dựng và giải thích với cả hai Docent.', 'The light damages the material. You pay for restoration and explain it to both Docents.', { wealth: -9, rep: -5, sanity: -4 })
      ] })
    ], I('Bạn giao lịch treo cho một Docent khác. Tên họ nằm trên thông báo.', 'You hand the schedule to another Docent. Their name appears on the notice.'), { theme: 'work' }),
  M('m_pinky_senior_witness', AGE.GROWN, senior('Pinky'),
    '[Hai lời khai ở rìa khu] Một đồng đội và một người đưa hàng kể khác nhau về cuộc hẹn đêm qua. Bạn có thể kiểm tra nơi hẹn trước khi cả nhóm quyết định ai đã thất hứa.',
    '[Two accounts at the district edge] A companion and a courier give different accounts of last night’s meeting. You can inspect the meeting place before the crew decides who broke their word.', [
      C('Đến nơi hẹn và hỏi người gác cổng', 'Visit the site and question the gatekeeper', 'Người gác nhớ tiếng chuông lệch giờ. Hai người đã đến, nhưng không cùng lúc; bạn ghi lại đúng như thế.', 'The keeper remembers a bell running late. Both people came, but at different times; you write down exactly that.', { merit: 4, rep: 2, network: 2, sanity: -2 }),
      C('Tin đồng đội và kết luận ngay', 'Trust your companion and decide at once', null, null, {}, { out: [
        O(55, 'Người đưa hàng nhận lỗi. Bạn giữ được lời đồng đội và việc được giao.', 'The courier admits fault. You preserve your companion’s word and the assignment.', { merit: 5, rep: 3 }),
        O(45, 'Người gác đưa ra sổ giờ. Đồng đội bạn đã nhớ sai; cả nhóm phải xin lỗi và bồi thường.', 'The keeper produces the time ledger. Your companion misremembered; the crew apologizes and pays restitution.', { wealth: -8, rep: -5, network: -3 })
      ] })
    ], I('Bạn để cả hai tự nói chuyện. Cuộc hẹn sau bị hoãn.', 'You let them settle it themselves. The next meeting is postponed.'), { theme: 'work' })
];

export const FINGER_UPDATE4_DAILIES = [
  D('d_thumb_senior_receipts', AGE.GROWN, senior('Thumb'), 'Bạn kiểm hai chữ ký trên một khoản cống nạp trước khi trả sổ.', 'You check two signatures on a tribute entry before returning the ledger.', { sanity: -1 }),
  D('d_thumb_soldato_rations', AGE.GROWN, fneed('Thumb'), 'Một Soldato chia khẩu phần đạn đúng số ghi trên sổ. Không ai xin thêm.', 'A Soldato issues the ammunition exactly as entered in the ledger. No one asks for more.', {}),
  D('d_thumb_quiet_salute', AGE.GROWN, fneed('Thumb'), 'Bạn chào người cấp trên trước khi mở miệng. Họ đáp lại bằng một cái gật đầu.', 'You salute your superior before speaking. They answer with a nod.', {}),
  D('d_index_sealed_route', AGE.GROWN, senior('Index'), 'Bạn vẽ lại đường giao Prescript cho người mới, tránh con hẻm bị chặn.', 'You redraw a Prescript delivery route for a newcomer, avoiding a blocked alley.', { network: 1 }),
  D('d_index_unbroken_seal', AGE.GROWN, fneed('Index'), 'Người đưa thư đặt một phong bì còn nguyên dấu niêm trên bàn.', 'A messenger sets an envelope with its seal intact on the table.', {}),
  D('d_index_clock_check', AGE.GROWN, fneed('Index'), 'Bạn đối giờ trên đồng hồ tường với giờ ghi trong Prescript.', 'You compare the wall clock with the time written on the Prescript.', {}),
  D('d_middle_book_margin', AGE.GROWN, senior('Middle'), 'Bạn viết khoản bồi thường vào lề sổ để người nhà sau còn đọc được.', 'You note the restitution in the book margin so the family can read it later.', { network: 1 }),
  D('d_middle_shared_table', AGE.GROWN, fneed('Middle'), 'Một Sibling để phần ăn nóng cho người đi ca muộn.', 'A Sibling leaves a hot meal for the one on late watch.', { sanity: 1 }),
  D('d_middle_old_name', AGE.GROWN, fneed('Middle'), 'Bạn thấy một cái tên cũ trong Book of Vengeance, bên cạnh dòng đã giải quyết.', 'You see an old name in the Book of Vengeance beside the settled mark.', {}),
  D('d_ring_maestro_inventory', AGE.GROWN, senior('Ring'), 'Bạn kiểm kho vật liệu của hai Docent trước buổi dựng tác phẩm.', 'You check the materials allocated to two Docents before installation.', { sanity: -1 }),
  D('d_ring_student_label', AGE.GROWN, fneed('Ring'), 'Một Student viết lại nhãn tác phẩm sau khi Docent sửa đúng một chữ.', 'A Student rewrites a work label after a Docent corrects one word.', {}),
  D('d_ring_closing_lights', AGE.GROWN, fneed('Ring'), 'Đèn phòng tranh tắt từng dãy. Bạn đợi người xem cuối cùng ra cửa.', 'The gallery lights go out row by row. You wait for the last visitor to leave.', {}),
  D('d_pinky_senior_account', AGE.GROWN, senior('Pinky'), 'Bạn ghi lại lời khai của hai người trước khi chọn bên nào để tin.', 'You record both accounts before deciding whom to believe.', { sanity: -1 }),
  D('d_pinky_meeting_place', AGE.GROWN, fneed('Pinky'), 'Bạn đến chỗ hẹn sớm và thử chốt cửa một lần.', 'You arrive early at the meeting place and test the latch.', {}),
  D('d_pinky_returned_parcel', AGE.GROWN, fneed('Pinky'), 'Một kiện hàng được trả về nguyên niêm, kèm giờ giao viết bằng bút chì.', 'A parcel returns with its seal intact and the delivery time penciled beside it.', {})
];
