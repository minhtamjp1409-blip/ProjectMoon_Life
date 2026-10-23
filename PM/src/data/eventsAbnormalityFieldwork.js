const follow = eventId => [{ eventId, delayYears: 1,
  reasonVi: 'Đội khảo sát mở lại hồ sơ dị thể', reasonEn: 'The survey team reopens the Abnormality file' }];
const withdraw = { labelVi: 'Bàn giao vị trí, không tiếp xúc', labelEn: 'Report the location and withdraw',
  effects: { wealth: 2 }, resultVi: 'Bạn nhận phí khảo sát ngoài cửa. Phần việc bên trong được trả về cho bên thuê.',
  resultEn: 'You receive the exterior survey fee. The client must arrange the work inside.' };

export const ABNORMALITY_FIELDWORK_EVENTS = [
  {
    id: 'abno_bird_field_notes', age: [25, 60], jobs: ['Fixer'], need: { notOut: true }, major: true, weight: 5,
    vi: '[Hồ sơ O-02-56] Trong chi nhánh L Corp bỏ hoang, một con chim trắng mổ vào tay người dẫn đường. Anh giữ chặt bao kiếm. Sổ trực ghi: Punishing Bird : không được đánh trả. Bên thuê muốn bạn xác minh lối vào kho hồ sơ.',
    en: '[File O-02-56] In an abandoned L Corp branch, a white bird pecks your guide’s hand. He grips his sword sheath. The duty log reads: Punishing Bird : do not retaliate. Your client wants the archive entrance surveyed.',
    choices: [
      { labelVi: 'Giữ vũ khí trong bao, quan sát từ cửa', labelEn: 'Keep weapons sheathed and watch from the doorway',
        effects: { sanity: -5 }, flagsAdd: ['BirdHandlingNotes'], scheduleConsequences: follow('abno_bird_return'),
        resultVi: 'Không ai vung tay. Bạn đánh dấu chỗ cửa chắn còn hoạt động và chép lời cảnh báo lên bản đồ đội thu hồi.',
        resultEn: 'No one strikes. You mark the working barrier and copy the warning onto the recovery map.' },
      { labelVi: 'Nhờ bạn tìm người đối chiếu hồ sơ (15 gắn bó)', labelEn: 'Ask your friend to find a reader for the file (15 bond)',
        favorCost: { role: 'friend', amount: 15 }, effects: { sanity: -2 }, flagsAdd: ['BirdHandlingNotes'], scheduleConsequences: follow('abno_bird_return'),
        resultVi: 'Bạn nhờ người quen tìm người đọc được sổ trực. Họ xác nhận lời cảnh báo, rồi yêu cầu đừng kéo họ vào chuyến thu hồi.',
        resultEn: 'Your friend finds someone who can read the duty log. They confirm the warning and ask to stay out of the recovery job.' }, withdraw
    ]
  },
  {
    id: 'abno_bird_return', age: [26, 65], jobs: ['Fixer'], need: { notOut: true }, requires: ['BirdHandlingNotes'], major: true, causalOnly: true, weight: 0,
    vi: '[Không được đánh trả] Đội thu hồi tìm thấy hộp hồ sơ. Punishing Bird đậu xuống cánh tay bạn rồi mổ. Người phía sau đã rút dao; cửa chắn ở ngay bên cạnh.',
    en: '[Do not retaliate] The team finds the archive box. Punishing Bird lands on your arm and pecks. Someone behind you draws a knife; the barrier is beside you.',
    choices: [
      { labelVi: 'Nhắc lại cảnh báo, chịu mổ rồi rút đội qua cửa', labelEn: 'Repeat the warning and lead the team back through the door',
        effects: { health: -7, sanity: -5, wealth: 12 }, meritAdd: 12,
        resultVi: 'Bạn giữ tay thấp cho đến khi con chim rời đi. Cả đội mang hồ sơ ra ngoài; vết mổ phải băng lại trước khi nhận tiền.',
        resultEn: 'You keep your arm low until the bird leaves. The team gets the files outside; your hand needs dressing before payment.' },
      { labelVi: 'Dùng áo đệm che tay, yêu cầu hạ dao', labelEn: 'Cover your arm with padded fabric and order the knife lowered', need: { item: 'arm_trenchcoat_padded' },
        effects: { health: -3, sanity: -5, wealth: 12 }, meritAdd: 12,
        resultVi: 'Lớp đệm chịu vài nhát mổ. Bạn không quật con chim ra; khi nó bay đi, cả đội lùi về cửa với hộp hồ sơ.',
        resultEn: 'The padding takes several pecks. You do not strike the bird; when it flies off, the team retreats with the box.' },
      { labelVi: 'Bỏ hộp hồ sơ, cho đội rút ngay', labelEn: 'Leave the box and withdraw immediately', effects: { health: -3, rep: -2 },
        resultVi: 'Bạn gạt mũi dao xuống trước khi nó chạm con chim. Hợp đồng không hoàn thành, nhưng đội thu hồi còn đủ người.',
        resultEn: 'You lower the knife before it touches the bird. The contract remains unfinished, but everyone returns.' }
    ]
  },
  {
    id: 'abno_one_sin_record', age: [25, 60], jobs: ['Fixer'], need: { notOut: true }, major: true, weight: 5,
    vi: '[Hồ sơ O-03-03] Một hộp ghi âm từ L Corp chứa các buổi làm việc với One Sin and Hundreds of Good Deeds. Bên thuê muốn phục hồi quy trình trước khi đưa người xuống phòng giam còn điện. Những bản ghi kết thúc tốt có một điểm chung: nhân viên tỉnh táo hơn khi rời phòng.',
    en: '[File O-03-03] Recovered L Corp recordings document work with One Sin and Hundreds of Good Deeds. The client wants the procedure restored before sending staff into powered containment. Successful sessions end with employees leaving more composed.',
    choices: [
      { labelVi: 'Nghe hết hồ sơ, ghi riêng những đoạn bị mất', labelEn: 'Review the recordings and mark missing passages', effects: { sanity: -6 },
        flagsAdd: ['OneSinWorkNotes'], scheduleConsequences: follow('abno_one_sin_session'),
        resultVi: 'Bạn tách lời nhân viên khỏi tiếng nhiễu. Hồ sơ đủ để chuẩn bị một buổi làm việc, chưa đủ để hứa rằng ai vào cũng được chữa lành.',
        resultEn: 'You separate the voices from the static. The file supports preparation, not a promise of recovery for everyone.' },
      { labelVi: 'Dùng ống Enkephalin để hoàn tất việc nghe', labelEn: 'Use an Enkephalin inhaler to finish reviewing', useItem: 'con_enkephalin_inhaler', effects: { sanity: -2 },
        flagsAdd: ['OneSinWorkNotes'], scheduleConsequences: follow('abno_one_sin_session'),
        resultVi: 'Thuốc giúp bạn ngồi hết ca. Bạn ghi rõ những chỗ chưa xác minh, thay vì điền bằng phỏng đoán.',
        resultEn: 'The inhaler helps you finish the shift. You mark the gaps instead of filling them with guesses.' }, withdraw
    ]
  },
  {
    id: 'abno_one_sin_session', age: [26, 65], jobs: ['Fixer'], need: { notOut: true }, requires: ['OneSinWorkNotes'], major: true, causalOnly: true, weight: 0,
    vi: '[Buổi làm việc còn thiếu] Bên thuê mở đường tới phòng One Sin. Bạn đã đọc hồ sơ, nhưng vẫn phải tự bước vào. Người giám sát cho phép dừng giữa chừng; tiền công chỉ tính khi hoàn tất.',
    en: '[The remaining session] The client opens access to One Sin’s room. You have read the file, but entering is still your decision. The supervisor allows withdrawal; payment requires completion.',
    choices: [
      { labelVi: 'Làm theo hồ sơ, dừng nếu tín hiệu bất thường', labelEn: 'Follow the file and stop at an irregular signal', outcomes: [
        { w: 70, effects: { sanity: 12, wealth: 8, resonance: 4 }, meritAdd: 8,
          resultVi: 'Buổi làm việc kết thúc tốt. Khi cửa mở, tiếng ù trong đầu đã dịu. Bạn ký nhận ca rồi ngồi lại ngoài hành lang một lúc.',
          resultEn: 'The session goes well. When the door opens, the noise in your head has eased. You sign out and sit in the corridor.' },
        { w: 30, effects: { sanity: -5 }, resultVi: 'Đèn báo đổi màu ngoài dự kiến. Bạn xin kết thúc và đi ra, không nhận tiền ca.', resultEn: 'The indicator changes unexpectedly. You end the session and leave without the session fee.' }
      ] }, withdraw
    ]
  }
];
