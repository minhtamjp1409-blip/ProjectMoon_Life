// What a Senior Executive does with a very long life. The Wing keeps its top floor alive past what the body allows,
// because a person who knows where everything is buried is cheaper to keep than to replace. Three roads close a life here
// and none of them is a bed: a seat on the Council that never empties, a line quietly struck from the roll, or a small box
// carried out of the gate. Four scenes in between keep the years from being empty.

const wing3 = { jobs: ['Wing Employee'], need: { wingRank: 3 } };
const endsLife = (lifeEnding, vi, en, fx = {}) => ({ endsLife: true, lifeEnding, effects: fx, resultVi: vi, resultEn: en });

export const WING_APEX_EVENTS = [
  {
    id: 'apex_longevity_wing', age: [42, 120], major: true, weight: 12, ...wing3,
    forbids: ['Distorted', 'apex_longevity_done'],
    vi: '[Tầng không có số] Một thư ký mời bạn xuống một tầng không có trong bảng chỉ dẫn. Ở đó là một phòng y tế trắng, sạch, và có tên bạn trên một chiếc giường đã được trải sẵn từ lâu. Họ nói Wing không có ý định để người biết nó nhiều đến thế phải già đi theo lịch của riêng cơ thể.',
    en: '[The Floor With No Number] A secretary invites you down to a floor missing from the directory. There is a white, clean infirmary, and your name on a bed that has been made up for a long time. They say the Wing has no intention of letting someone who knows it so well age on the body’s own schedule.',
    choices: [
      { labelVi: 'Chấp nhận phác đồ của Wing', labelEn: 'Accept the Wing’s regimen',
        effects: { health: 10, sanity: -6, standing: 3 }, flagsAdd: ['apex_longevity_done', 'ApexLongevity'],
        resultVi: 'Họ không hỏi bạn có muốn không. Bạn ký vào một tờ giấy không có điều khoản chấm dứt, và nhận ra mình vừa bước vào hợp đồng dài nhất của đời mình.',
        resultEn: 'They do not ask whether you want it. You sign a page with no termination clause, and realize you have just entered the longest contract of your life.' },
      { labelVi: 'Từ chối, để cơ thể đi theo lịch của nó', labelEn: 'Refuse and let the body keep its own schedule',
        effects: { sanity: 4, standing: -3, rep: 1 }, flagsAdd: ['apex_longevity_done'],
        resultVi: 'Thư ký ghi lại câu trả lời bằng bút chì. "Chúng tôi vẫn để giường ở đó." Bạn đi lên bằng cầu thang, từng bậc một.',
        resultEn: 'The secretary notes the answer in pencil. “We will leave the bed where it is.” You climb back by the stairs, one step at a time.' }
    ]
  },

  {
    id: 'wing_apex_district_decree', age: [44, 120], major: true, weight: 16, ...wing3,
    vi: '[Sắc lệnh cho District] Hội đồng cần một người ký lệnh đóng cửa ba khu chợ ở District mà Wing của bạn nắm giữ. Lý do là thuế, và cũng không phải. Hàng nghìn người sẽ đổi cách kiếm sống chỉ vì một nét bút, và nét bút đó là của bạn.',
    en: '[A Decree for the District] The Council needs someone to sign the closing of three markets in the District your Wing holds. The reason is tax, and also is not. Thousands will change how they earn a living on one stroke of the pen, and the pen is yours.',
    choices: [
      { labelVi: 'Ký nguyên văn', labelEn: 'Sign it as written',
        effects: { standing: 5, wealth: 36, sanity: -8, rep: -5 }, meritAdd: 20,
        resultVi: 'Ba khu chợ đóng vào cuối tháng. Bạn không đi qua chúng nữa, và đó là cách duy nhất bạn biết mình đã làm điều gì.',
        resultEn: 'The three markets close at month’s end. You do not walk past them again, and that is the only way you know what you did.' },
      { labelVi: 'Giữ lại một khu chợ và nhận hậu quả về hồ sơ', labelEn: 'Keep one market open and take the consequences on your record',
        effects: { standing: -6, rep: 8, sanity: 3, network: 6 }, meritAdd: 8,
        resultVi: 'Một khu chợ mở thêm một năm, và người bán hàng ở đó gọi bạn bằng một cái tên mà bạn chưa bao giờ đặt cho mình. Hội đồng ghi một dấu nhỏ vào tên bạn.',
        resultEn: 'One market stays open another year, and the sellers there call you by a name you never gave yourself. The Council enters a small mark against your own.' },
      { labelVi: 'Dùng bí mật bạn nắm để Hội đồng tự rút lệnh', labelEn: 'Use what you hold to make the Council withdraw the decree',
        need: { stat: { leverage: [40, 100] } },
        effects: { leverage: -22, standing: -2, rep: 10, sanity: -5 }, meritAdd: 12,
        resultVi: 'Lệnh được "hoãn xem xét lại" trong một cuộc họp ngắn đến mức không ai nhớ ai đã nói gì. Ba khu chợ vẫn mở, và nhiều thứ bạn từng giữ đã đi.',
        resultEn: 'The decree is “deferred for review” in a meeting so short no one recalls who said what. The three markets stay open, and much of what you held has gone.' }
    ]
  },

  {
    id: 'wing_apex_rival_returns', age: [46, 120], major: true, weight: 14, ...wing3,
    vi: '[Người bị bạn gạch tên quay lại] Một người bạn từng gạch khỏi danh sách nhiều năm trước xuất hiện ở hành lang tầng cao nhất, mặc đồ của Wing khác. Họ không nhìn bạn, chỉ nhìn bàn của bạn, và mỉm cười như nhìn một chiếc ghế mà họ biết mình sẽ ngồi.',
    en: '[The One You Struck Comes Back] Someone you once struck from a list many years ago appears in the top-floor corridor, wearing the uniform of another Wing. They do not look at you, only at your desk, and smile like someone looking at a chair they know they will sit in.',
    choices: [
      { labelVi: 'Mời họ vào và nói chuyện thẳng', labelEn: 'Invite them in and speak plainly',
        effects: { sanity: -5, standing: 2, network: 6 }, meritAdd: 10,
        resultVi: 'Họ không đòi gì, và đó là điều đáng sợ nhất. Họ chỉ kể lại những năm họ sống, và khi đi, họ để lại một chiếc bút trên bàn bạn.',
        resultEn: 'They demand nothing, which is what is most frightening. They only tell of the years they lived, and when they go they leave a pen on your desk.' },
      { labelVi: 'Cho người kiểm tra lại hồ sơ của họ', labelEn: 'Have their file checked again',
        effects: { leverage: 8, standing: -2, sanity: -3 },
        resultVi: 'Bạn tìm thấy một điểm yếu và không dùng nó. Bạn cất nó vào ngăn kéo thứ hai, nơi những thứ không dùng đến vẫn nằm đó và nặng hơn mỗi năm.',
        resultEn: 'You find a weakness and do not use it. You put it in the second drawer, where unused things stay and grow heavier each year.' }
    ]
  },

  {
    id: 'wing_apex_core_audit', age: [48, 120], major: true, weight: 14, ...wing3,
    vi: '[Lần đo lõi] Mỗi mười năm, Wing đo lại Singularity của mình bằng một người không ai muốn gọi tên. Lần này họ đo cả người đứng đầu phòng, và bạn nhận được thư mời không có ngày giờ.',
    en: '[The Core Reading] Every ten years the Wing measures its Singularity with a person no one will name. This time they measure the head of the section as well, and you receive an invitation with no date or time.',
    choices: [
      { labelVi: 'Đến và đứng trong vòng đo', labelEn: 'Go and stand within the measuring ring',
        effects: { sanity: -10, health: -5, standing: 4, rep: 4 }, meritAdd: 25,
        resultVi: 'Kết quả là một con số mà bạn không được xem. Người đo gật đầu rất lâu, và bạn không biết đó là tin tốt hay chỉ là một thói quen.',
        resultEn: 'The result is a figure you are not allowed to see. The measurer nods for a very long time, and you cannot tell whether it is good news or only a habit.' },
      { labelVi: 'Cử người kế nhiệm đi thay', labelEn: 'Send your successor in your place',
        effects: { standing: -3, sanity: 2, network: 4 },
        resultVi: 'Họ đi, và trở lại với một vẻ mặt mà bạn nhận ra, vì bạn đã từng mang nó. Hội đồng ghi nhận rằng bạn không đi, và không nói gì thêm.',
        resultEn: 'They go, and come back with an expression you recognize, having worn it yourself. The Council notes that you did not attend, and says nothing more.' }
    ]
  },

  {
    id: 'wing_apex_council_seat', age: [80, 125], major: true, weight: 8, ...wing3,
    requires: ['ApexLongevity'], forbids: ['Distorted'],
    vi: '[Chiếc ghế không có biển tên] Hội đồng mời bạn ngồi vào một chiếc ghế ở cuối bàn dài. Không có biển tên, không có hạn nhiệm kỳ, và tấm thảm dưới chân ghế đã lõm theo hình hai bàn chân từ rất lâu trước khi có bạn. Họ không hỏi bạn có muốn không.',
    en: '[The Chair With No Nameplate] The Council invites you to take a chair at the end of the long table. No nameplate, no term limit, and the carpet beneath it is worn in the shape of two feet from long before you. They do not ask if you want it.',
    choices: [
      { labelVi: 'Ngồi xuống chiếc ghế', labelEn: 'Take the chair',
        ...endsLife('sealed_seat', 'Bạn ngồi xuống, và ghế nhận bạn như một chỗ đã quen. Từ hôm nay, bạn ký những gì được đặt trước mặt, không đọc, và sống rất lâu trong một căn phòng không có cửa sổ.',
          'You sit, and the chair receives you like a place long accustomed. From today you sign what is placed before you, unread, and live a very long time in a windowless room.', { sanity: -10, standing: 5 }),
        deathCauseVi: 'Ngồi vào Hội đồng và không bao giờ rời ghế', deathCauseEn: 'Took a Council seat and never left the chair' },
      { labelVi: 'Từ chối và nói bạn vẫn thích bàn làm việc của mình', labelEn: 'Decline and say you prefer your own desk',
        effects: { standing: -4, sanity: 3, rep: 2 },
        resultVi: 'Phòng im lặng đủ lâu để bạn nghe thấy đồng hồ. Rồi người ngồi đầu bàn mỉm cười như một người vừa nghe một lời thú nhận. "Chiếc ghế vẫn sẽ ở đó."',
        resultEn: 'The room is silent long enough for you to hear the clock. Then the one at the head of the table smiles like someone who has just heard a confession. “The chair will still be there.”' }
    ]
  },

  {
    id: 'wing_apex_struck_roll', age: [78, 125], major: true, weight: 8, ...wing3,
    requires: ['ApexLongevity'], forbids: ['Distorted'], need: { wingRank: 3, stat: { standing: [0, 35] } },
    vi: '[Dòng bị bỏ khỏi trang] Một buổi sáng, thư ký của bạn không chào. Cánh cửa phòng bạn mở được, nhưng thẻ của bạn không còn có tên trên màn hình ở cổng. Không ai nhắc đến, và đó là cách Wing nói rằng nó đã quyết định.',
    en: '[The Line Left Off the Page] One morning your secretary does not greet you. Your office door still opens, but your badge no longer shows a name on the gate screen. No one mentions it, which is how the Wing says it has decided.',
    choices: [
      { labelVi: 'Ra về và không hỏi', labelEn: 'Go home and ask nothing',
        ...endsLife('struck_roll', 'Bạn thu dọn bàn, cất vào hộp những gì thuộc về mình, và đi qua cổng như mọi ngày. Hôm sau thẻ không mở được. Hồ sơ nói rằng bạn chưa bao giờ làm ở đây.',
          'You clear your desk, put what is yours into a box, and walk through the gate as on any day. The next day the badge will not open it. The record says you never worked here.', { sanity: -6, standing: -10 }),
        deathCauseVi: 'Bị gạch tên khỏi sổ nhân sự của Wing', deathCauseEn: 'Struck from the Wing’s personnel roll' },
      { labelVi: 'Đặt bí mật bạn giữ lên bàn người ký lệnh', labelEn: 'Lay the file you have kept on the signatory’s desk',
        need: { stat: { leverage: [45, 100] } },
        effects: { leverage: -30, standing: 18, sanity: -6, rep: -3 },
        resultVi: 'Người ký nhìn xấp giấy rất lâu rồi để dòng của bạn lại trên trang. "Bạn đã học đúng bài." Họ không cười. Bạn ở lại, và từ đó không còn ai trong tòa nhà dám gọi bạn là người của họ.',
        resultEn: 'The signatory studies the stack a long time and leaves your line on the page. “You learned the right lesson.” They do not smile. You stay, and from then on no one in the building dares call you theirs.' }
    ]
  },

  {
    id: 'wing_apex_walk_out', age: [76, 125], major: true, weight: 8, ...wing3,
    requires: ['ApexLongevity'], forbids: ['Distorted'],
    vi: '[Cổng phụ lúc hoàng hôn] Bạn đứng ở cổng phụ của Nest vào một buổi chiều đẹp, thứ ánh sáng mà những người làm việc trong tòa nhà thường không thấy. Trong túi áo có một chiếc hộp nhỏ, vừa đủ cho một người đi bộ. Người gác không nhìn bạn, và đó là lời mời.',
    en: '[The Side Gate at Dusk] You stand at the Nest’s side gate on a fine afternoon, the kind of light those who work inside seldom see. In your coat pocket is a small box, just enough for someone on foot. The guard does not look at you, and that is the invitation.',
    choices: [
      { labelVi: 'Bước qua cổng với chiếc hộp', labelEn: 'Step through the gate with the box',
        ...endsLife('walked_out', 'Cánh cổng đóng sau lưng bạn mà không có tiếng động. Bạn đi bộ qua ba khu phố, thuê một căn phòng ở Backstreets dưới tên mới, và nấu ăn cho chính mình lần đầu tiên sau nhiều thập kỷ.',
          'The gate closes behind you without a sound. You walk through three neighborhoods, rent a room in the Backstreets under a new name, and cook for yourself for the first time in decades.', { sanity: 8, standing: -12, wealth: -20 }),
        deathCauseVi: 'Rời Nest bằng cổng phụ và biến mất khỏi hồ sơ', deathCauseEn: 'Left the Nest by the side gate and vanished from the record' },
      { labelVi: 'Quay lại tòa nhà và để chiếc hộp trong túi', labelEn: 'Go back into the building and keep the box in your pocket',
        effects: { sanity: -4, standing: 2, leverage: 3 },
        resultVi: 'Bạn quay lại bàn làm việc và pha trà. Chiếc hộp nằm trong túi áo suốt phần đời còn lại, nhẹ như chưa từng có gì bên trong.',
        resultEn: 'You return to your desk and brew tea. The box stays in your coat pocket for the rest of your life, light as if there had never been anything in it.' }
    ]
  },

  {
    id: 'wing_apex_hand_over', age: [78, 125], major: true, weight: 8, ...wing3,
    requires: ['ApexLongevity'], forbids: ['Distorted'], need: { wingRank: 3, npc: 'mentee' },
    vi: '[Người nhận lại chiếc bút] Người từng là thực tập sinh của bạn ngồi đối diện, tay đặt trên một tập hồ sơ mà họ đã đọc nhiều lần hơn bạn nghĩ. Họ không đòi ghế. Họ chỉ hỏi bạn có muốn nghe họ nói điều họ sẽ làm khác không.',
    en: '[The One Who Takes the Pen] The one who was once your intern sits across from you, hands on a file they have read more times than you thought. They do not ask for the seat. They only ask whether you want to hear what they would do differently.',
    choices: [
      { labelVi: 'Nghe hết, rồi trao lại ghế và chiếc bút', labelEn: 'Hear them out, then hand over the chair and the pen',
        ...endsLife('retired', 'Bạn nghe, và có hai điều bạn muốn nói họ sai nhưng không nói. Bạn đặt chiếc bút lên bàn và bước ra khỏi phòng vào một buổi chiều không có gì đặc biệt.',
          'You listen, and there are two things you want to say they are wrong about but do not. You set the pen on the desk and walk out of the room on an afternoon like any other.', { sanity: 6, standing: -2, network: 4 }),
        deathCauseVi: 'Trao ghế Wing cho người từng kèm cặp và về sống ở phố cũ', deathCauseEn: 'Handed the Wing seat to the one once mentored and retired to an old street' },
      { labelVi: 'Giữ ghế và bảo họ chờ thêm một năm', labelEn: 'Keep the chair and tell them to wait one more year',
        effects: { standing: 2, sanity: -5, network: -3 },
        resultVi: 'Họ gật đầu quá nhanh. Bạn nhận ra mình từng gật như thế, với một người cũng ngồi đúng chiếc ghế này.',
        resultEn: 'They nod too quickly. You realize you once nodded exactly like that, to someone who sat in this very chair.' }
    ]
  }
];
