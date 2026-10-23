// Depth for the thinner branches: Wing careers (long lives, few scenes per decade) and the Distortion
// path, where UNIVERSE.md still lists "the road back to a human voice" as missing. A Distortion does
// not get cured here. It gets hours of clarity, and a few chances to decide how the story ends.

export const BRANCH_DEPTH_EVENTS = [
  // ------------------------------------------------------------------ Wing
  {
    id: 'wing_nest_lease_review', age: [22, 68], jobs: ['Wing Employee'], major: true, weight: 16,
    forbids: ['Distorted', 'wing_lease_done'],
    vi: '[Hợp đồng ở Nest] Phòng nhà ở của Wing gửi bảng đánh giá cư trú hằng năm. Căn hộ của bạn gắn với hiệu suất công việc, và căn bên cạnh sắp bị thu hồi vì chủ nhà tụt hai bậc. Họ nhờ bạn ký xác nhận rằng người đó đã vi phạm nội quy khu tập thể.',
    en: '[The Nest lease] The Wing housing office sends the annual residency review. Your flat is tied to work performance, and the one next door is about to be reclaimed because its tenant dropped two grades. They ask you to certify that the person broke dormitory rules.',
    choices: [
      { labelVi: 'Ký xác nhận như được nhờ', labelEn: 'Sign the certification as asked',
        effects: { wealth: 6, rep: 4, sanity: -8, network: -4 }, flagsAdd: ['wing_lease_done'],
        resultVi: 'Bạn ký vào dòng cuối. Hai tuần sau, một xe chở đồ đậu trước cửa nhà bên. Người ấy gõ cửa bạn để mượn băng dính, và bạn đưa băng dính mà không nhìn lên.',
        resultEn: 'You sign the last line. Two weeks later a removal cart stops outside the next flat. The tenant knocks to borrow tape, and you hand it over without looking up.' },
      { labelVi: 'Từ chối ký, nói bạn không chứng kiến', labelEn: 'Refuse and say you saw nothing',
        outcomes: [
          { w: 70, effects: { rep: -3, sanity: 5, network: 6 }, flagsAdd: ['wing_lease_done'],
            resultVi: 'Phòng nhà ở ghi chú bạn không hợp tác, rồi tìm người khác ký. Người hàng xóm ở lại thêm một năm. Họ không nói cảm ơn, chỉ để một túi trà trước cửa bạn vào sáng thứ Hai.',
            resultEn: 'Housing notes you as uncooperative and finds someone else to sign. The neighbor stays one more year. They do not say thank you, they leave a bag of tea at your door on Monday morning.' },
          { w: 30, effects: { rep: -8, wealth: -8, sanity: 2 }, flagsAdd: ['wing_lease_done'],
            resultVi: 'Phòng nhà ở không tìm được ai khác ký, nên chuyển luôn đơn thu hồi sang tên bạn vì thiếu hợp tác. Bạn giữ được căn hộ, nhưng mất khoản phụ cấp cư trú đến cuối năm.',
            resultEn: 'Housing cannot find anyone else to sign, so it moves the review onto your own file for non-cooperation. You keep the flat but lose the residency allowance until year end.' }
        ] }
    ]
  },
  {
    id: 'wing_site_transfer', age: [24, 62], jobs: ['Wing Employee'], major: true, weight: 14,
    forbids: ['Distorted', 'wing_transfer_done'],
    vi: '[Điều chuyển cơ sở] Wing cần một người có thâm niên đến chi nhánh ở District khác, nơi Singularity chạy theo luật riêng của nó. Phụ cấp gấp đôi, nhà ở có sẵn, nhưng bản hợp đồng không ghi ngày về, và người điều chuyển trước bạn không trả lời thư.',
    en: '[Site transfer] The Wing needs someone with seniority at a branch in another District, where the Singularity runs by its own rules. The allowance doubles, housing is provided, but the contract names no return date, and the person transferred before you does not answer letters.',
    choices: [
      { labelVi: 'Nhận điều chuyển', labelEn: 'Accept the transfer',
        outcomes: [
          { w: 60, effects: { wealth: 20, rep: 8, network: 8, sanity: -10 }, meritAdd: 20, flagsAdd: ['wing_transfer_done'],
            resultVi: 'Chi nhánh mới sạch hơn cái cũ và lạnh hơn. Ở đây không ai hỏi chuyện gia đình bạn. Đến tháng thứ ba bạn nhận ra mình đã ngừng nhắc đến nó trong thư.',
            resultEn: 'The new branch is cleaner than the old one and colder. Nobody asks about your family. By the third month you notice you have stopped mentioning it in letters.' },
          { w: 40, effects: { wealth: 12, health: -12, sanity: -18, resonance: 8 }, flagsAdd: ['wing_transfer_done'], scarsAdd: ['Tiếng của Singularity ở chi nhánh xa'],
            resultVi: 'Luật của Singularity ở đây không nằm trong sổ tay nào. Bạn học từng điều bằng cách làm sai nó một lần. Người điều chuyển trước bạn hóa ra vẫn ở đó, trên tầng ba, và không còn gọi được tên bạn.',
            resultEn: 'The Singularity’s rules here are in no handbook. You learn each by breaking it once. The person transferred before you is still there, on the third floor, and can no longer say your name.' }
        ] },
      { labelVi: 'Từ chối, giữ chỗ cũ', labelEn: 'Decline and keep your post',
        effects: { rep: -5, sanity: 4, wealth: -3 }, flagsAdd: ['wing_transfer_done'],
        resultVi: 'Nhân sự ghi bạn vào danh sách không sẵn sàng di chuyển. Bạn ở lại bàn cũ, trong căn phòng cũ, và nghe người ngồi cạnh thở ra rất khẽ khi biết chuyện.',
        resultEn: 'HR files you under unwilling to relocate. You stay at the old desk in the old room, and hear the person beside you let out a very quiet breath when they learn of it.' }
    ]
  },
  {
    id: 'wing_buyout_offer', age: [50, 78], jobs: ['Wing Employee'], major: true, weight: 16,
    forbids: ['Distorted', 'wing_buyout_done'],
    vi: '[Gói nghỉ hưu] Wing đưa bạn một gói nghỉ hưu lớn hơn mọi lần: tiền, căn hộ và một lễ tiễn. Trang cuối là cam kết bảo mật vĩnh viễn, kèm điều khoản cho phép Wing hỏi lại ký ức của bạn khi cần. Người ký trước bạn cũng được tiễn đúng như vậy, và không ai gặp lại họ ở quán nào.',
    en: '[The retirement package] The Wing offers you a package larger than any before: money, a flat, and a farewell ceremony. The last page is a lifelong confidentiality pledge with a clause letting the Wing ask about your memories when needed. The person who signed before you got the same farewell, and nobody has seen them in any tea house since.',
    choices: [
      { labelVi: 'Ký và nhận gói nghỉ hưu', labelEn: 'Sign and take the package',
        outcomes: [
          { w: 55, effects: { wealth: 28, sanity: 6, health: 4 }, flagsAdd: ['wing_buyout_done'],
            resultVi: 'Lễ tiễn ngắn và có hoa. Bạn về căn hộ mới và chờ một người đến hỏi gì đó, nhưng suốt cả mùa không ai đến. Ngày thứ chín mươi, bạn bắt đầu nhẹ người.',
            resultEn: 'The farewell is short and has flowers. You go to the new flat and wait for someone to come ask something, but nobody does all season. On the ninetieth day you begin to breathe easier.' },
          { w: 45, effects: { wealth: 20, sanity: -14, health: -6 }, flagsAdd: ['wing_buyout_done'], scarsAdd: ['Điều khoản hỏi lại ký ức'],
            resultVi: 'Một người đến vào mùa thu, lịch sự, mang theo ấm trà của chính mình. Họ hỏi ba câu về một năm bạn quên là đã từng làm ở tầng hầm. Bạn trả lời được cả ba, và không biết vì sao.',
            resultEn: 'Someone calls in autumn, polite, bringing their own teapot. They ask three questions about a year you had forgotten you worked in the basement. You answer all three and do not know why.' }
        ] },
      { labelVi: 'Từ chối, làm tiếp đến khi không làm được nữa', labelEn: 'Refuse and work until you cannot',
        effects: { rep: 6, wealth: -2, sanity: 3, heat: 3 }, flagsAdd: ['wing_buyout_done'],
        resultVi: 'Phòng nhân sự cho bạn ba ngày suy nghĩ lại, rồi thôi. Hôm sau, cái bàn bạn ngồi được đổi sang một chiếc ghế tốt hơn, như một cách im lặng để nhắc rằng họ có thể làm ngược lại.',
        resultEn: 'HR gives you three days to reconsider, then stops asking. The next day the chair at your desk is replaced with a better one, a quiet way of saying they could just as easily do the opposite.' }
    ]
  },
  {
    id: 'wing_junior_blames_you', age: [26, 66], jobs: ['Wing Employee'], major: true, weight: 14,
    forbids: ['Distorted', 'wing_junior_done'],
    vi: '[Người mới nộp nhầm] Một Feather mới nộp nhầm báo cáo lên Singularity, và con số sai đã lan qua ba phòng trước khi ai đó nhận ra. Cấp trên cần một cái tên để ghi vào biên bản. Người mới nhìn bạn, và bạn là người đã ký duyệt bản nháp đó.',
    en: '[The new hire’s wrong filing] A new Feather filed the wrong report against the Singularity, and the bad figure spread through three rooms before anyone caught it. Your superior needs a name for the record. The newcomer looks at you without speaking, and you were the one who approved that draft.',
    choices: [
      { labelVi: 'Nhận lỗi về mình', labelEn: 'Take the blame yourself',
        effects: { rep: -6, wealth: -6, sanity: 2, network: 8 }, meritAdd: 6, flagsAdd: ['wing_junior_done'], npcAdd: { role: 'junior', bond: 50 },
        resultVi: 'Biên bản ghi tên bạn, và khoản trừ thưởng đi kèm. Người mới đứng chờ bạn ở cửa thang máy, không nói được gì, rồi đưa bạn một cốc cà phê nóng, còn ấm tay.',
        resultEn: 'The record carries your name and a bonus deduction. The newcomer waits for you at the lift door, unable to speak, then hands you a coffee, still warm.' },
      { labelVi: 'Để người mới gánh', labelEn: 'Let the newcomer carry it',
        effects: { rep: 3, sanity: -6, network: -6 }, flagsAdd: ['wing_junior_done'],
        resultVi: 'Biên bản ghi tên người mới. Hôm sau chỗ ngồi của họ được dọn sạch. Bạn nhìn mặt bàn trống thật lâu, rồi tập trung vào báo cáo của mình.',
        resultEn: 'The record names the newcomer. By the next day their desk has been cleared. You look at the empty surface for a long time, then return to your own report.' }
    ]
  },

  // ------------------------------------------------------------------ Distortion
  {
    id: 'distort_lucid_hour', age: [20, 95], major: true, weight: 70, allowDistorted: true,
    need: { jobs: ['Distortion'] }, forbids: ['distort_lucid_done'],
    vi: '[Một giờ tỉnh táo] Một buổi sáng, tiếng Carmen im đi. Bạn nhìn tay mình và thấy năm ngón, bình thường, dính đầy bùn. Từ đâu đó dưới đường vọng lên một bài hát ru mà bạn nhớ từng nghe. Bạn biết giờ này sẽ không kéo dài.',
    en: '[An hour of clarity] One morning Carmen goes quiet. You look at your hands and see five ordinary fingers, caked with mud. From somewhere under the street comes a lullaby you remember hearing. You know the hour will not last.',
    choices: [
      { labelVi: 'Đi tới nơi tiếng hát vọng lên', labelEn: 'Walk toward the song',
        effects: { sanity: 18, resonance: -10, heat: 6 }, flagsAdd: ['distort_lucid_done'],
        resultVi: 'Bạn đi qua ba con hẻm và dừng trước một cửa sổ có đèn. Một người phụ nữ đang ru con, và không hề biết có ai nghe. Bạn nghe hết bài, rồi quay lại cái hang của mình khi giọng nói đã trở về.',
        resultEn: 'You walk through three alleys and stop at a lit window. A woman is singing to her child, unaware anyone is listening. You hear the whole song, then return to your den as the voice comes back.' },
      { labelVi: 'Viết lại những gì còn nhớ trước khi quên', labelEn: 'Write down what you still remember',
        effects: { sanity: 10, network: 4 }, flagsAdd: ['distort_lucid_done', 'DistortionLetter'],
        resultVi: 'Bạn viết tên, ngày sinh, những món ăn từng thích, tên những con phố. Khi dừng lại, tay bạn đã trở lại hình dạng cũ kỹ của nó, và trang giấy còn ướt bùn. Bạn gấp nó lại và giấu trong vách đá.',
        resultEn: 'You write your name, your birthday, the food you used to like, the names of streets. When you stop, your hand is back to what it has become, and the page is damp with mud. You fold it and hide it in the stone wall.' }
    ]
  },
  {
    id: 'distort_name_stone', age: [24, 95], major: true, weight: 60, allowDistorted: true,
    need: { jobs: ['Distortion'] }, forbids: ['distort_stone_done'],
    vi: '[Bia không có xác] Ở một góc nghĩa địa Backstreets, ai đó dựng một tấm bia nhỏ với tên cũ của bạn và hai năm khắc sai. Hoa tươi, mới đặt hôm qua. Người dựng bia chưa biết bạn còn sống, hoặc đã biết và chọn cách khác để nhớ bạn.',
    en: '[A stone with no body] In a corner of a Backstreets graveyard someone has raised a small stone with your old name and two wrong years. The flowers are fresh, placed yesterday. Whoever raised it does not know you are alive, or knows and chose a different way to remember you.',
    choices: [
      { labelVi: 'Ngồi xuống bên bia, chờ người đến', labelEn: 'Sit by the stone and wait',
        outcomes: [
          { w: 55, effects: { sanity: 14, heat: 10, resonance: -6 }, flagsAdd: ['distort_stone_done'],
            resultVi: 'Một người già đến lúc chiều, đặt thêm một nhành hoa, và nói khẽ vài câu với tấm bia. Bạn nấp sau cây bách, nghe được tên mình được gọi bằng một giọng không có chút sợ hãi. Khi ông đi, bạn ở lại thêm một lúc.',
            resultEn: 'An old man comes in the afternoon, adds a sprig of flowers, and says a few quiet words to the stone. You hide behind a cypress and hear your name spoken without a trace of fear. When he leaves, you stay a while longer.' },
          { w: 45, effects: { health: -20, heat: 22, sanity: -6 }, flagsAdd: ['distort_stone_done'],
            resultVi: 'Một Fixer của Hana đã canh sẵn bên cổng nghĩa địa từ sáng, vì tấm bia là mồi. Bạn thoát ra, nhưng không còn dám quay lại chỗ đó nữa.',
            resultEn: 'A Hana Fixer has been watching the cemetery gate since morning, because the stone was bait. You get out, but cannot go back there again.' }
        ] },
      { labelVi: 'Sửa lại hai năm khắc sai rồi rời đi', labelEn: 'Correct the wrong years and leave',
        effects: { sanity: 6, heat: 4 }, flagsAdd: ['distort_stone_done'],
        resultVi: 'Bạn dùng móng cào lại hai chữ số. Chữ khắc không đẹp, nhưng đúng. Người dựng bia sẽ thấy và nghĩ ra nhiều cách giải thích, và có thể không cách nào là đúng.',
        resultEn: 'You scratch the two figures over with a claw. The letters are not neat, but they are right. Whoever raised the stone will see it and come up with many explanations, none of them likely correct.' }
    ]
  },
  {
    id: 'distort_ask_to_be_ended', age: [26, 100], major: true, weight: 55, allowDistorted: true,
    need: { jobs: ['Distortion'] }, requires: ['distort_lucid_done'], forbids: ['distort_ended_done'],
    vi: '[Nhờ một người cuối cùng] Giọng nói trong đầu bạn nhỏ dần rồi mạnh lên theo từng đợt, và đợt tiếp theo có thể là đợt không còn gì của bạn ở lại. Bạn viết một dòng gửi cho người duy nhất bạn tin có thể làm việc đó gọn: nhờ họ đến đúng nơi, đúng giờ, và đừng ngập ngừng.',
    en: '[A last favor] The voice in your head fades and surges in waves, and the next wave may leave nothing of you behind. You write one line to the single person you trust to do it cleanly: come to the right place, at the right hour, and do not hesitate.',
    choices: [
      { labelVi: 'Gửi lá thư đi', labelEn: 'Send the letter',
        outcomes: [
          { w: 60, effects: { health: -100 }, meritAdd: 10,
            deathCauseVi: 'Được một người bạn cũ kết thúc đúng lúc, theo lời nhờ cuối cùng của chính mình',
            deathCauseEn: 'Ended cleanly by an old friend at the hour you had asked for',
            resultVi: 'Người ấy đến đúng giờ, không mang theo lời nào. Bạn nhìn thấy lưỡi kiếm lên chậm, như được mài lại suốt đêm. Lúc ngã xuống, giọng Carmen đã im, và bạn nghe được tiếng mưa trên mái nhà bên cạnh.',
            resultEn: 'They arrive on time and bring no words. You watch the blade rise slowly, as if it had been sharpened all night. By the time you fall, Carmen’s voice is silent and you hear rain on the neighboring roof.' },
          { w: 40, effects: { sanity: 10, heat: 12, resonance: -8 }, flagsAdd: ['distort_ended_done'],
            resultVi: 'Người ấy đến, nhưng đứng cách bạn ba bước và không rút vũ khí. Họ nói không làm được, và sẽ không làm được, và cứ thế đứng đó cho tới khi trời sáng. Khi bạn ngồi xuống cùng, họ không lùi.',
            resultEn: 'They come, but stand three steps away and do not draw. They say they cannot, and will not, and stay there until dawn. When you sit down with them they do not step back.' }
        ] },
      { labelVi: 'Xé lá thư, tiếp tục sống thế này', labelEn: 'Tear it up and go on like this',
        effects: { sanity: -6, resonance: 6 }, flagsAdd: ['distort_ended_done'],
        resultVi: 'Bạn xé lá thư thành những mảnh nhỏ đến mức không đọc được chữ nào, rồi nuốt chúng cùng ngụm nước từ rãnh. Giọng nói trở lại trước khi bạn đứng dậy.',
        resultEn: 'You tear the letter into pieces too small to read and swallow them with a mouthful of gutter water. The voice returns before you can stand.' }
    ]
  }
];
