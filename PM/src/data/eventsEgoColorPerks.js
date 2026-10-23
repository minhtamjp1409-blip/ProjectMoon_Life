// What an E.G.O or a Color name does to a Fixer's life after the moment itself. Both are loans: the
// city lets you carry the weapon or the title, then comes back to collect.

export const EGO_COLOR_EVENTS = [
  // ------------------------------------------------------------------ E.G.O
  {
    id: 'ego_registry_form', age: [20, 70], jobs: ['Fixer'], major: true, weight: 8,
    requires: ['EGOAwakened'], forbids: ['Distorted', 'ego_registry_done'],
    vi: '[Phiếu đăng ký E.G.O] Một nhân viên Hana đặt lên bàn bạn tờ phiếu đăng ký vũ khí E.G.O, kèm bảng phí bảo hiểm. Không ai ép bạn ký. Nhưng vũ khí chưa đăng ký mà hiện ra giữa chỗ đông người thì bị ghi là hành vi gây nguy hiểm, và người ghi sẽ không hỏi bạn lý do.',
    en: '[The E.G.O registry form] A Hana clerk sets an E.G.O registration form on your desk, with an insurance schedule clipped to it. Nobody forces you to sign. But an unregistered weapon that appears in a crowd is logged as endangerment, and whoever logs it will not ask why.',
    choices: [
      { labelVi: 'Ký đăng ký với Hana', labelEn: 'Register it with Hana',
        effects: { rep: 6, wealth: -4, sanity: 2 }, meritAdd: 12,
        flagsAdd: ['ego_registry_done', 'EGORegistered'],
        scheduleConsequences: [{ eventId: 'ego_registry_callup', delayYears: 3, reasonVi: 'Hana gọi người có E.G.O đã đăng ký', reasonEn: 'Hana calls up registered E.G.O holders' }],
        resultVi: 'Nhân viên đóng dấu rồi cho bạn một thẻ nhựa nhỏ. Từ nay mỗi lần vũ khí xuất hiện, có một dòng ghi sẵn để giải thích. Hana cũng biết chính xác bạn mạnh cỡ nào.',
        resultEn: 'The clerk stamps it and hands you a small plastic card. From now on every appearance of the weapon has a line already written to explain it. Hana also knows exactly how strong you are.' },
      { labelVi: 'Từ chối, giữ E.G.O kín', labelEn: 'Refuse and keep it quiet',
        effects: { heat: 8, network: 3 },
        flagsAdd: ['ego_registry_done', 'EGOUnregistered'],
        scheduleConsequences: [{ eventId: 'ego_unregistered_buyer', delayYears: 2, reasonVi: 'Có người biết bạn mang E.G.O chưa đăng ký', reasonEn: 'Someone knows you carry an unregistered E.G.O' }],
        resultVi: 'Bạn gấp tờ phiếu làm tư và bỏ vào túi áo. Nhân viên gật đầu như đã đoán trước, rồi viết gì đó lên cuốn sổ của mình.',
        resultEn: 'You fold the form in four and put it in your coat. The clerk nods as if expecting it, and writes something in their own notebook.' }
    ]
  },
  {
    id: 'ego_registry_callup', age: [22, 75], jobs: ['Fixer'], major: true, weight: 0, causalOnly: true,
    requires: ['EGORegistered'], forbids: ['Distorted', 'ego_callup_done'],
    vi: '[Lệnh gọi của Hana] Danh sách người mang E.G.O đã đăng ký được rút ra khỏi ngăn tủ. Một Abnormality thoát khỏi phong tỏa ở rìa District, và Hana cần ai đó mang đúng loại vũ khí. Phí thuê cao, giấy bảo hiểm dày, và chữ ký ở trang cuối là của bạn.',
    en: '[Hana’s call-up] The list of registered E.G.O holders comes out of the cabinet. An Abnormality has slipped containment at the edge of a District, and Hana needs someone carrying the right kind of weapon. The fee is high, the insurance papers thick, and the signature on the last page is yours.',
    choices: [
      { labelVi: 'Nhận lệnh, đứng ở tuyến đầu', labelEn: 'Take the call and hold the front line',
        need: { stat: { health: [40, 100], sanity: [30, 100] } },
        outcomes: [
          { w: 68, effects: { health: -18, sanity: -10, wealth: 18, rep: 14, resonance: 8 }, meritAdd: 55,
            resultVi: 'Thứ đó ngừng cựa quậy sau lần chém thứ ba. Hana ghi tên bạn vào dòng đầu của báo cáo, phía trên cả những người đến trước bạn hai chục năm.',
            resultEn: 'It stops moving after the third cut. Hana puts your name on the first line of the report, above people who arrived twenty years before you.' },
          { w: 32, effects: { health: -34, sanity: -20, wealth: 6, resonance: 14 }, meritAdd: 20, scarsAdd: ['Vết cắt của thứ thoát phong tỏa'],
            resultVi: 'Vũ khí hiện ra chậm một nhịp, và nhịp đó đủ để thứ kia kịp chạm vào bạn. Bạn vẫn kết thúc nó, nhưng phải ngồi cạnh bác sĩ của Hana tới sáng.',
            resultEn: 'The weapon answers a beat too late, and that beat is enough for the thing to touch you. You still end it, but you sit beside Hana’s doctor until morning.' }
        ] },
      { labelVi: 'Nói bạn chưa đủ sức, xin nhường', labelEn: 'Say you are not up to it and decline',
        effects: { rep: -4, sanity: 3 },
        resultVi: 'Người của Hana ghi bạn vào cột chưa sẵn sàng, mà không tỏ ra giận. Lần sau, danh sách sẽ ngắn hơn một cái tên.',
        resultEn: 'Hana’s clerk logs you as not ready and shows no anger. Next time the list will be one name shorter.' }
    ]
  },
  {
    id: 'ego_unregistered_buyer', age: [22, 75], jobs: ['Fixer'], major: true, weight: 0, causalOnly: true,
    requires: ['EGOUnregistered'], forbids: ['Distorted', 'ego_buyer_done'],
    vi: '[Người mua hàng hiếm] Một người đàn ông mặc áo mưa trong nhà đặt một cặp kẹp giấy lên bàn bạn: giá cho một lần quan sát vũ khí E.G.O của bạn, không đăng ký, không ghi chép. Ông nói ông không làm cho Hana. Ông cũng không nói ông làm cho ai.',
    en: '[A buyer of rare things] A man in a raincoat, indoors, sets a paper clip on your desk: the price for one look at your unregistered E.G.O, with no records. He says he does not work for Hana. He does not say who he does work for.',
    choices: [
      { labelVi: 'Cho ông ta xem', labelEn: 'Let him look',
        effects: { wealth: 24, sanity: -6, heat: 6, network: 4 }, flagsAdd: ['ego_buyer_done'],
        resultVi: 'Bạn hiện vũ khí ra trong căn phòng khóa trái. Ông ngồi nhìn suốt mười phút, không chạm vào, rồi để lại một phong bì dày hơn thỏa thuận. Lúc ra cửa, ông hỏi bạn có chắc nó chưa từng nói gì với bạn không.',
        resultEn: 'You summon the weapon in a locked room. He watches for ten minutes without touching it, then leaves an envelope thicker than agreed. At the door he asks whether you are sure it has never said anything to you.' },
      { labelVi: 'Đuổi ông ta ra khỏi cửa', labelEn: 'Send him out',
        effects: { rep: 3, heat: -3 }, flagsAdd: ['ego_buyer_done'],
        resultVi: 'Ông cầm lại cặp kẹp giấy và cúi đầu cảm ơn như vừa được mời trà. Bạn nghe tiếng giày ông xa dần, và không chắc mình vừa tránh được điều gì.',
        resultEn: 'He takes the paper clip back and thanks you as if he had been offered tea. You listen to his shoes go away, unsure what you just avoided.' }
    ]
  },
  {
    id: 'ego_elder_wielder', age: [26, 75], jobs: ['Fixer'], major: true, weight: 7,
    requires: ['EGOAwakened'], forbids: ['Distorted', 'ego_elder_done'],
    vi: '[Người cầm kiếm cũ] Một Fixer đã nghỉ, tay run bần bật, ngồi cạnh bạn ở quán nước cuối ngõ và nhìn vào chỗ vũ khí của bạn vẫn giấu. Ông kể về cái của mình: mỗi năm nó nói thêm một câu, và năm nay ông không nhớ tên đứa con trai nữa.',
    en: '[The old wielder] A retired Fixer, hands shaking, sits beside you in the tea stall at the end of the alley and looks at the place where you keep your weapon. He tells you about his own: every year it said one more sentence, and this year he cannot remember his son’s name.',
    choices: [
      { labelVi: 'Hỏi ông xem còn cách nào không', labelEn: 'Ask whether anything works',
        effects: { sanity: 5, resonance: -4 }, flagsAdd: ['ego_elder_done'],
        resultVi: 'Ông nói không có cách nào. Chỉ có hai việc: không cầm nó khi mệt, và nói tên những người bạn quý ra thành tiếng mỗi sáng. Ông thử làm theo hai việc đó từ mười năm trước, và vẫn mất hai cái tên.',
        resultEn: 'He says there is no cure. Only two habits: never hold it when tired, and say the names of the people you care about aloud each morning. He has done both for ten years and still lost two names.' },
      { labelVi: 'Nghe xong, trả tiền trà và đi', labelEn: 'Pay for the tea and leave',
        effects: { sanity: -4, wealth: -1 }, flagsAdd: ['ego_elder_done'],
        resultVi: 'Bạn để lại tiền trà cho cả hai. Cả quãng đường về nhà, bạn nhẩm tên mình, tên người thân, tên những con phố, và dừng lại ở một cái tên mà không thấy mặt nào đi cùng.',
        resultEn: 'You leave tea money for both. All the way home you recite your name, your family’s, the streets’, and stop at one name that has no face attached.' }
    ]
  },
  {
    id: 'ego_upkeep', age: [22, 75], jobs: ['Fixer'], major: true, weight: 7,
    requires: ['EGOAwakened'], forbids: ['Distorted'], need: { stat: { sanity: [0, 70] } },
    vi: '[Vũ khí lệch nhịp] Vũ khí E.G.O của bạn hiện ra chậm hơn trước, và nhỏ hơn một chút. Một thợ Workshop quen nói đó không phải hư hỏng: đó là phần vũ khí đang rút lại chỗ bạn không còn đủ chắc để giữ. Ông có thể hiệu chỉnh khung dẫn, nhưng cần vài ngày bạn không được mang nó theo.',
    en: '[The weapon drifts] Your E.G.O appears slower than it used to, and a little smaller. A Workshop smith you know says it is not damage: it is the weapon pulling back from where you are no longer steady enough to hold it. He can retune the frame, but you must go a few days without carrying it.',
    choices: [
      { labelVi: 'Gửi xưởng hiệu chỉnh, trả phí', labelEn: 'Leave it with the smith and pay',
        effects: { wealth: -9, sanity: 6, resonance: -8, health: 2 },
        resultVi: 'Bạn đi bốn ngày không mang theo gì ngoài con dao nhỏ. Ngày thứ ba bạn ngủ liền sáu tiếng, lần đầu từ hồi nào không nhớ. Khi lấy lại, vũ khí hiện ra nhanh như lúc mới có.',
        resultEn: 'You go four days carrying nothing but a small knife. On the third night you sleep six hours straight, the first time in longer than you recall. When you collect it, the weapon appears as quickly as on the first day.' },
      { labelVi: 'Bỏ qua, đợi qua mùa bận', labelEn: 'Skip it until the busy season is over',
        effects: { resonance: 6, sanity: -5 },
        resultVi: 'Bạn nói để sau và nhận thêm hai Request. Vũ khí vẫn hiện ra, chậm một nhịp, và bạn học cách chém sớm hơn một nhịp để bù lại.',
        resultEn: 'You say later and take two more Requests. The weapon still comes, a beat late, and you learn to swing a beat early to cover it.' }
    ]
  },

  // ------------------------------------------------------------------ Color
  {
    id: 'color_hana_seat', age: [30, 90], jobs: ['Fixer'], major: true, weight: 9,
    requires: ['ColorFixer'], forbids: ['color_seat_done'],
    vi: '[Chiếc ghế ở Hana] Hana mời bạn dự buổi họp của các Section. Không ai nói đây là chiếc ghế, nhưng chỗ ngồi có sẵn một tấm bảng tên, và người rót trà đã biết bạn uống gì. Ở phòng này, một câu của bạn bằng cả năm Request của người khác.',
    en: '[A chair at Hana] Hana invites you to a meeting of the Sections. Nobody calls it a seat, but there is a nameplate at your place, and the person pouring tea already knows what you drink. In this room one sentence from you weighs as much as another Fixer’s five Requests.',
    choices: [
      { labelVi: 'Ngồi xuống và nhận vai trò cố vấn', labelEn: 'Sit and take the advisory role',
        effects: { rep: 8, network: 14, wealth: 12, sanity: -6, heat: -6 }, flagsAdd: ['color_seat_done', 'ColorAdvisor'],
        scheduleConsequences: [{ eventId: 'color_old_rival_returns', delayYears: 4, reasonVi: 'Một đối thủ cũ phản đối vai trò cố vấn của bạn', reasonEn: 'An old rival objects to your advisory role' }],
        resultVi: 'Bạn nhận hai việc cố định mỗi tháng: đọc lại các ca khó nhất và nói đồng ý hay không. Lần đầu bạn chọn không đồng ý một ca, và nhìn thấy một người trẻ rời phòng với nét mặt nhẹ hẳn.',
        resultEn: 'You accept two standing duties each month: read the hardest cases and say yes or no. The first time you say no, you watch a young Fixer leave the room looking lighter.' },
      { labelVi: 'Từ chối ghế, chỉ đến khi được gọi', labelEn: 'Decline the chair and come only when called',
        effects: { rep: 3, sanity: 4, network: -2 }, flagsAdd: ['color_seat_done'],
        resultVi: 'Bạn giữ khoảng cách với phòng họp và vẫn là Color mà người ta nhắc tới. Một lúc sau, người rót trà bước ra cửa, hỏi nhỏ liệu bạn có muốn đổi sang loại trà khác lần tới không.',
        resultEn: 'You keep your distance from the meeting room and remain the Color people still mention. A moment later the tea server follows you to the door and asks quietly whether you would like another blend next time.' }
    ]
  },
  {
    id: 'color_sealed_request', age: [30, 90], jobs: ['Fixer'], major: true, weight: 8,
    requires: ['ColorFixer'], forbids: ['color_sealed_done'],
    vi: '[Request niêm phong] Một Claw của C Corp không đến bằng cửa chính. Hắn để lại một phong bì có dấu của The Head, bên trong là một Request chỉ dành cho người mang tên Color. Không có điều khoản về thương vong, và con số trên đầu thư là ba lần mức bạn từng nhận.',
    en: '[A sealed Request] A Claw of C Corp does not come by the front door. He leaves an envelope under The Head’s seal: a Request only a named Color may take. It has no casualty clause, and the figure at its head is three times anything you have been paid.',
    choices: [
      { labelVi: 'Nhận Request, vào thẳng cơ sở', labelEn: 'Accept and enter the facility',
        need: { stat: { health: [50, 100], sanity: [40, 100] } },
        outcomes: [
          { w: 60, effects: { health: -22, sanity: -14, wealth: 34, rep: 12, resonance: 10 }, meritAdd: 60, flagsAdd: ['color_sealed_done'],
            resultVi: 'Bạn mất ba ngày bên trong, và lúc bước ra không ai hỏi bạn đã thấy gì. Khoản tiền đến đúng giờ. Người của The Head không cảm ơn, chỉ gạch một dòng khỏi danh sách.',
            resultEn: 'You spend three days inside, and when you come out nobody asks what you saw. The payment arrives on time. The Head’s people do not thank you, they strike a line from a list.' },
          { w: 40, effects: { health: -38, sanity: -24, wealth: 20, resonance: 14 }, meritAdd: 30, flagsAdd: ['color_sealed_done'], scarsAdd: ['Vết cháy từ cơ sở không tên'],
            resultVi: 'Bạn hoàn thành Request nhưng không thoát nguyên vẹn. Thứ trong cơ sở còn nhớ tên bạn khi bạn đã đi khỏi đó cả tuần.',
            resultEn: 'You finish the Request but do not leave whole. Whatever was in that facility still has your name a week after you are gone.' }
        ] },
      { labelVi: 'Gửi trả phong bì chưa mở', labelEn: 'Send the envelope back unopened',
        effects: { sanity: 4, rep: -3, heat: 6 }, flagsAdd: ['color_sealed_done'],
        resultVi: 'Phong bì quay lại bàn của Claw bằng đường bưu điện thường. Không có hồi âm. Trong tuần đó, bạn thấy cùng một người ở ba quán khác nhau, mỗi lần đứng gần cửa sổ.',
        resultEn: 'The envelope returns to the Claw by ordinary post. No reply comes. That week you see the same person in three different cafes, each time standing near a window.' }
    ]
  },
  {
    id: 'color_apprentice_asks', age: [38, 95], jobs: ['Fixer'], major: true, weight: 7,
    requires: ['ColorFixer'], forbids: ['color_apprentice_done'],
    vi: '[Lời xin học] Một Fixer trẻ đứng chờ bạn ngoài cửa từ sáng, tay cầm một bản vẽ của chính mình. Người ấy không xin tiền hay Request. Chỉ xin bạn đọc nó, và nói cho biết đó có phải thứ một người xứng với cái tên Color sẽ làm không.',
    en: '[The request to learn] A young Fixer has waited outside your door since morning, holding a drawing of their own. They do not ask for money or Requests. Only that you read it, and say whether it is the sort of thing someone worthy of the Color name would do.',
    choices: [
      { labelVi: 'Nhận kèm cặp và đứng ra bảo lãnh', labelEn: 'Take them under your wing and vouch for them',
        effects: { rep: 6, network: 8, sanity: 4, wealth: -5 }, meritAdd: 10,
        flagsAdd: ['color_apprentice_done', 'ColorMentor'], npcAdd: { role: 'mentee', bond: 55 },
        resultVi: 'Bạn đọc hết bản vẽ và sửa ba chỗ bằng bút đỏ. Sáng hôm sau người ấy quay lại với bản đã sửa, và cả những chỗ bạn chưa kịp nói đã được làm đúng.',
        resultEn: 'You read the whole drawing and correct three places in red pen. The next morning they return with the corrected version, and the places you did not get to mention are fixed too.' },
      { labelVi: 'Đọc, nhận xét thẳng, không nhận học trò', labelEn: 'Read it, speak plainly, take no student',
        effects: { rep: 2, sanity: 1 }, flagsAdd: ['color_apprentice_done'],
        resultVi: 'Bạn chỉ ra hai điểm yếu và nói người ấy nên tự đi một năm rồi quay lại. Họ cúi đầu.',
        resultEn: 'You name two weaknesses and tell them to go alone for a year and come back. They bow.' }
    ]
  },
  {
    id: 'color_old_rival_returns', age: [32, 95], jobs: ['Fixer'], major: true, weight: 0, causalOnly: true,
    requires: ['ColorAdvisor'], forbids: ['color_rival_done'],
    vi: '[Người từng ngang bạn] Một Fixer từng ngang hạng với bạn nhiều năm trước đứng chờ cuối hành lang Hana. Người ấy không đi tiếp lên được, và không giấu rằng chiếc ghế của bạn là lý do. Không ai cầm vũ khí, nhưng cả hai tay đều nắm hơi chặt.',
    en: '[Someone who once matched you] A Fixer who ranked beside you years ago waits at the end of Hana’s corridor. They never climbed any higher, and do not hide that your chair is the reason. Neither carries a weapon, but both hands are clenched a little tight.',
    choices: [
      { labelVi: 'Mời người ấy ngồi xuống nói chuyện', labelEn: 'Invite them to sit and talk',
        effects: { sanity: 3, network: 6, rep: 4 }, flagsAdd: ['color_rival_done'],
        resultVi: 'Bạn rót trà cho cả hai. Người ấy nói thẳng một điều bạn đã không nghe từ lâu: bạn đã đổi cách nói chuyện từ khi có tên Color. Bạn không phản bác được.',
        resultEn: 'You pour tea for both. They say one thing you have not heard in a long time: you changed how you speak once you had the Color name. You have no answer to that.' },
      { labelVi: 'Nhắc họ về nội quy và mời ra khỏi hành lang', labelEn: 'Cite the rules and have them leave the corridor',
        effects: { rep: -3, sanity: -4, heat: 4 }, flagsAdd: ['color_rival_done'],
        resultVi: 'Hai người gác bước tới. Người ấy đi theo họ không nói thêm lời nào. Cánh cửa khép lại, và bạn nhận ra lần này mình đã dùng vị trí để thắng một cuộc nói chuyện.',
        resultEn: 'Two guards step up. They follow without another word. The door closes, and you realize that this time you used your position to win a conversation.' }
    ]
  }
];
