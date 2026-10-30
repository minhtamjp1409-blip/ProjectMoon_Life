// What the years after a Color name look like, by how the name was reached. A Color who got it in their thirties
// lives among people who waited thirty more years for the same card; a Color whose name grew out of an E.G.O
// is asked, again and again, whose name it is. Each era has a shared strand and two private ones.
// Flags: ColorYoung (named before 45), ColorFromEGO (E.G.O already awakened at investiture), EGOAttuned.

export const COLOR_ERA_EVENTS = [
  // ------------------------------------------------------------------ E.G.O: the third state
  {
    id: 'ego_attunement_hour', age: [24, 80], jobs: ['Fixer', 'Color Fixer'], major: true, weight: 30,
    requires: ['EGOAwakened'], forbids: ['Distorted', 'EGOAttuned'],
    vi: '[Giờ thuần thục] Thanh E.G.O hiện ra theo ý bạn đã nhiều năm. Hôm nay nó hiện ra trước khi bạn kịp muốn, ở một hành lang trống, rồi biến mất khi bạn nín thở. Bác sĩ của Hana gọi đó là một dấu hiệu tốt. Bạn thì thấy mình vừa bị vũ khí nhìn lại.',
    en: 'The attunement hour. The E.G.O has come at your will for years. Today it appears before you want it, in an empty corridor, and leaves when you hold your breath. Hana’s doctor calls it a good sign. You feel you have just been looked at by your own weapon.',
    choices: [
      { labelVi: 'Ngồi xuống cạnh nó và học nhịp thở của nó', labelEn: 'Sit beside it and learn its breathing',
        need: { stat: { sanity: [35, 100] } },
        outcomes: [
          { w: 70, effects: { sanity: -6, resonance: 10, rep: 4 }, flagsAdd: ['EGOAttuned'], meritAdd: 18,
            resultVi: 'Ba đêm liền bạn ngồi trong căn phòng không bật đèn. Đêm thứ ba, thanh E.G.O hiện ra và tan đi đúng lúc bạn thở ra, như hai người cuối cùng đã chọn chung một nhịp.',
            resultEn: 'Three nights running you sit in the unlit room. On the third, the E.G.O appears and fades exactly as you exhale, like two people who have finally picked the same rhythm.' },
          { w: 30, effects: { sanity: -16, resonance: 6, health: -6 }, flagsAdd: ['EGOAttuned'], scarsAdd: ['Tiếng thở thứ hai'],
            resultVi: 'Nhịp chung đến, nhưng nó đến cùng một tiếng thở thứ hai mà bạn nghe cả khi không có ai trong phòng. Bạn học cách coi đó là tiếng của chính mình.',
            resultEn: 'The shared rhythm comes, and with it a second breath you hear even when nobody is in the room. You learn to take it as your own.' }
        ] },
      { labelVi: 'Từ chối nghe, đi ra khỏi hành lang', labelEn: 'Refuse to listen and walk out of the corridor',
        effects: { sanity: 3, resonance: -3 },
        resultVi: 'Bạn đóng cửa lại phía sau. Qua tấm kính mờ, một vệt sáng dài hơn nhịp thở của bạn nán lại thêm một lúc rồi tắt.',
        resultEn: 'You close the door behind you. Through the frosted glass, a streak of light that outlasts your breath lingers a while, then goes out.' }
    ]
  },

  // ------------------------------------------------------------------ Era 1: the first seasons
  {
    id: 'color_blank_card_kept', age: [26, 90], jobs: ['Color Fixer'], major: true, weight: 70,
    requires: ['ColorFixer'], forbids: ['Distorted', 'color_blank_card_done'],
    vi: '[Tấm thẻ trắng] Trong bài thử, các Director đặt một tấm thẻ chưa ghi tên lên bàn. Giờ nó đã có màu của bạn, nhưng mặt sau vẫn trống. Một nhân viên lưu trữ của Hana hỏi bạn có muốn ghi gì vào đó không. Ghi rồi thì nó ở lại trong hồ sơ, người sau đọc được.',
    en: 'In the trial the Directors set a blank card on the table. It carries your color now, but the back is still empty. A Hana archivist asks whether you want anything written there. Whatever goes on it stays in the file for the next reader.',
    choices: [
      { labelVi: 'Viết một câu về lý do bạn nhận danh xưng', labelEn: 'Write one line on why you took the name',
        effects: { sanity: 4, rep: 5 }, flagsAdd: ['color_blank_card_done', 'ColorCardWritten'],
        resultVi: 'Bạn viết bằng nét chữ của người quen ký giấy nợ. Người lưu trữ thổi cho mực khô, kẹp thẻ vào bìa hồ sơ và ghi số kệ lên đó.',
        resultEn: 'You write in the hand of someone used to signing debt slips. The archivist blows the ink dry, clips the card into the folder and writes a shelf number on it.' },
      { labelVi: 'Để trống, bảo họ giữ nguyên', labelEn: 'Leave it blank and tell them to keep it as is',
        effects: { sanity: 2, network: 3 }, flagsAdd: ['color_blank_card_done'],
        resultVi: 'Người lưu trữ ghi vào sổ: chủ thẻ từ chối ghi chú. Có vẻ họ gặp chuyện này đủ nhiều để có sẵn một mẫu câu cho nó.',
        resultEn: 'The archivist notes in the ledger that the holder declined an inscription. They seem to meet this often enough to have a stock phrase for it.' }
    ]
  },
  {
    id: 'color_new_name_etiquette', age: [26, 90], jobs: ['Color Fixer'], major: true, weight: 75,
    requires: ['ColorFixer'], forbids: ['Distorted', 'color_etiquette_done'],
    vi: '[Cách người ta gọi một Color] Người ở Văn phòng ngừng gọi bạn bằng tên và bắt đầu gọi bằng màu. Quầy tiếp tân đổi lời chào. Người môi giới ngồi thẳng lưng khi bạn bước vào. Một nhân viên trẻ hỏi thẳng bạn có thích thế không, vì anh ta chưa biết nên theo bên nào.',
    en: 'How people address a Color. Staff at the Office stop using your name and start using your color. The front desk changes its greeting. The broker sits upright when you enter. A young clerk asks outright whether you like it, since they have not decided which side to take.',
    choices: [
      { labelVi: 'Bảo mọi người cứ gọi tên như trước', labelEn: 'Tell everyone to keep using your name',
        effects: { sanity: 5, rep: -3, network: 4 }, flagsAdd: ['color_etiquette_done'],
        resultVi: 'Hai tuần sau, chỉ còn người ở quầy nước gọi bạn bằng tên. Những người còn lại tìm được cách nói câu nào cũng không cần gọi bạn là gì.',
        resultEn: 'Two weeks later only the staff at the water counter use your name. Everyone else finds ways to speak without calling you anything.' },
      { labelVi: 'Nhận cách gọi mới, dùng nó khi cần', labelEn: 'Accept the new address and use it when needed',
        effects: { rep: 6, sanity: -3 }, meritAdd: 10, flagsAdd: ['color_etiquette_done'],
        resultVi: 'Cái tên của màu mở cửa nhanh hơn cái tên của bạn. Bạn bắt đầu để dành tên thật cho những buổi tối không có ai cần gì.',
        resultEn: 'The name of the color opens doors faster than your own. You begin to save your real name for evenings when nobody wants anything.' }
    ]
  },

  // ------------------------------------------------------------------ Era 1, young strand
  {
    id: 'color_young_snub', age: [26, 50], jobs: ['Color Fixer'], major: true, weight: 90,
    requires: ['ColorFixer', 'ColorYoung'], forbids: ['Distorted', 'color_young_snub_done'],
    vi: '[Người trẻ nhất mang màu] Ở một buổi tiệc của Hana, hai Color lớn tuổi nói chuyện về bạn đủ to để bạn nghe. Một người bảo màu đến sớm thì phai sớm. Người kia bảo mình đã đợi bốn mươi năm cho tấm thẻ của chính mình, và vẫn chưa thôi ngạc nhiên khi nhìn thấy ai đó nhận nó lúc ngực còn chưa có sẹo.',
    en: 'The youngest to carry a color. At a Hana reception two older Colors discuss you loudly enough to be heard. One says a color that arrives early fades early. The other says they waited forty years for their own card and still cannot get used to seeing someone take it before their chest is scarred.',
    choices: [
      { labelVi: 'Đi tới, mời cả hai cùng nhận một việc khó', labelEn: 'Walk over and invite both to take a hard job with you',
        need: { stat: { health: [40, 100] } },
        outcomes: [
          { w: 62, effects: { health: -14, sanity: -4, rep: 12, network: 8 }, meritAdd: 30,
            resultVi: 'Họ nhận vì tò mò hơn vì thiện ý. Qua đêm thứ hai ở rìa District, người lớn tuổi hơn đã ngừng gọi bạn là cậu bé, và gọi bằng màu.',
            resultEn: 'They accept out of curiosity more than goodwill. By the second night on the edge of the District, the elder has stopped calling you kid and uses your color instead.' },
          { w: 38, effects: { health: -22, sanity: -8, rep: 4 }, meritAdd: 10, scarsAdd: ['Vết cắt của buổi chứng minh'],
            resultVi: 'Bạn cố làm quá phần của mình để họ thấy. Việc xong, nhưng bạn chịu một nhát đáng lẽ thuộc về người khác, và không ai trong hai người kia nhắc tới nó.',
            resultEn: 'You overdo your share so they can see. The job is done, but you take a blow meant for someone else, and neither of them mentions it.' }
        ] },
      { labelVi: 'Cười, uống hết ly và ra về sớm', labelEn: 'Smile, finish the drink and leave early',
        effects: { sanity: 2, rep: -2, network: -2 }, flagsAdd: ['color_young_snub_done'],
        resultVi: 'Ở cửa, người phục vụ đưa cho bạn chiếc áo khoác và hỏi liệu ông bà ở bàn trong có nói gì khó nghe không. Bạn bảo không, và anh ta có vẻ không tin.',
        resultEn: 'At the door the waiter hands you your coat and asks whether the elders at the inner table said anything unkind. You say no, and he does not look convinced.' }
    ]
  },
  {
    id: 'color_young_waiting_grade1', age: [27, 55], jobs: ['Color Fixer'], major: true, weight: 80,
    requires: ['ColorFixer', 'ColorYoung'], forbids: ['Distorted', 'color_waiting_done'],
    vi: '[Người còn đợi] Một Fixer Grade 1 hơn bạn hai mươi tuổi chặn bạn ở hành lang Hana. Ông đã đủ điểm từ lâu và vẫn chưa được mời vào bài thử. Ông không xin bạn điều gì. Ông chỉ hỏi bạn đã nói gì với Director để họ gọi tên bạn trước.',
    en: 'The one still waiting. A Grade 1 Fixer twenty years your senior stops you in the Hana corridor. They have had the points for years and have not been called to a trial. They ask nothing of you. They only ask what you said to the Directors to be named first.',
    choices: [
      { labelVi: 'Kể thật lần bạn suýt chết trong bài thử', labelEn: 'Tell them honestly how close you came to dying in the trial',
        effects: { sanity: -3, rep: 3, network: 5 }, flagsAdd: ['color_waiting_done', 'ColorWaitingKnows'],
        resultVi: 'Ông nghe hết, hỏi hai câu về lúc bạn đứng một mình trước thứ đó, rồi nói rằng sáng mai ông vẫn sẽ nộp đơn xin bài thử. Ông không nói thêm gì.',
        resultEn: 'They hear you out, ask two questions about standing alone before the thing, then say they will still file for the trial tomorrow morning. They add nothing else.' },
      { labelVi: 'Nói bạn không biết, rằng đó là chọn lựa của Director', labelEn: 'Say you do not know, it was the Directors’ choice',
        effects: { sanity: 2, rep: -2 }, flagsAdd: ['color_waiting_done'],
        resultVi: 'Ông chỉ cúi mặt một nhịp, chậm. Câu trả lời này ông đã nghe ở nhiều hành lang trước đó. Bước đi của ông khi rời đi vẫn đều, nhưng ngắn hơn.',
        resultEn: 'They nod once, slowly, like someone who has heard this answer in many corridors before. Their stride as they leave is as steady as ever, only shorter.' }
    ]
  },

  // ------------------------------------------------------------------ Era 1, E.G.O strand
  {
    id: 'color_ego_whose_name', age: [26, 90], jobs: ['Color Fixer'], major: true, weight: 90,
    requires: ['ColorFixer', 'ColorFromEGO'], forbids: ['Distorted', 'color_whose_name_done'],
    vi: '[Tên của ai] Một nhân viên lưu trữ của Hana đang điền hồ sơ thì dừng bút. Chị hỏi màu của bạn là của bạn, hay của thanh E.G.O. Với Hana đó là câu hỏi thủ tục: nếu màu thuộc về vũ khí, hồ sơ phải ghi khác, và khi bạn chết, vũ khí đi đâu cũng khác theo.',
    en: 'Whose name. A Hana archivist pauses mid-form. She asks whether your color is yours or the E.G.O’s. To Hana it is a procedural question: if the color belongs to the weapon, the file reads differently, and where the weapon goes when you die differs with it.',
    choices: [
      { labelVi: 'Nói màu là của bạn, thanh E.G.O chỉ là công cụ', labelEn: 'Say the color is yours and the E.G.O is a tool',
        effects: { sanity: -4, rep: 5 }, flagsAdd: ['color_whose_name_done', 'ColorOwnsEGO'],
        resultVi: 'Chị ghi vào mục chủ sở hữu. Đêm đó thanh E.G.O không hiện ra, kể cả khi bạn cần nó cho một việc nhỏ ở bếp. Sáng sau nó có mặt như chưa có chuyện gì.',
        resultEn: 'She writes it under owner. That night the E.G.O does not appear, even when you need it for a small thing in the kitchen. The next morning it is there as if nothing happened.' },
      { labelVi: 'Nói bạn không chắc, và xin họ để trống mục đó', labelEn: 'Say you are not sure and ask them to leave the line empty',
        effects: { sanity: 3, resonance: 6 }, flagsAdd: ['color_whose_name_done', 'ColorSharesEGO'],
        resultVi: 'Chị gạch một ô, viết bên cạnh chữ nhỏ: chờ xác định. Hồ sơ của bạn giờ có một chỗ trống mà Hana chấp nhận được, và có lẽ bạn cũng thế.',
        resultEn: 'She crosses out a box and writes beside it in small letters: pending. Your file now has a gap Hana can live with, and perhaps you can too.' }
    ]
  },
  {
    id: 'color_ego_street_fear', age: [26, 90], jobs: ['Color Fixer'], major: true, weight: 80,
    requires: ['ColorFixer', 'ColorFromEGO'], forbids: ['Distorted', 'color_street_fear_done'],
    vi: '[Con phố tránh bạn] Ở khu bạn ở, một người bán rau dọn quầy sang vỉa hè bên kia khi bạn đi qua. Nhà đối diện kéo rèm sớm hơn mọi tối. Chẳng ai ghét bạn. Họ đã nghe một thanh E.G.O đã từng xuất hiện trong một vụ ở cuối phố, và họ không muốn là người đứng gần khi nó xuất hiện lần nữa.',
    en: 'The street steps aside. In your neighborhood a vegetable seller moves the stall to the far pavement when you pass. The house opposite draws its curtains earlier than ever. Nobody hates you. They heard an E.G.O once appeared in a case at the end of the street, and nobody wants to be the one nearby when it appears again.',
    choices: [
      { labelVi: 'Đứng ở đầu phố và trả tiền mua hết rau của người bán', labelEn: 'Stand at the head of the street and buy out the seller’s vegetables',
        need: { stat: { wealth: [10, 100] } }, costAhn: 8,
        effects: { rep: 5, network: 6, sanity: 2 }, flagsAdd: ['color_street_fear_done'],
        resultVi: 'Bà ta nhận tiền bằng cả hai tay, kiểm tra từng tờ. Sau đó cứ sáng sớm, quầy của bà lại về chỗ cũ, cách cửa nhà bạn đúng mười bước chân.',
        resultEn: 'She takes the money with both hands and checks each note. After that, every morning her stall is back in its old place, exactly ten paces from your door.' },
      { labelVi: 'Chuyển đi chỗ khác, để họ yên', labelEn: 'Move away and let them be',
        effects: { wealth: -6, sanity: 3, network: -4 }, flagsAdd: ['color_street_fear_done'],
        resultVi: 'Chỗ mới là một căn gác trên đường ít người qua lại. Bạn trả hơn giá thị trường và chủ nhà không hỏi lý do, chỉ hỏi bạn có hút thuốc không.',
        resultEn: 'The new place is an attic on a quiet road. You pay above the going rate and the landlord does not ask why, only whether you smoke.' }
    ]
  },

  // ------------------------------------------------------------------ Era 2: holding the color
  {
    id: 'color_mandate_reading', age: [28, 90], jobs: ['Color Fixer'], major: true, weight: 85,
    requires: ['ColorFixer'], forbids: ['Distorted'], repeatable: true,
    vi: '[Chỉ thị niên độ] Hana gửi cho bạn một phong bì dày, không có tem. Bên trong là ba vụ mà không Fixer nào thấp hơn Color được phép nhận, kèm một dòng chữ: chọn một, hoặc nói lý do không chọn. Cả ba đều có chỗ cho một người chết, và chỗ đó chưa có tên.',
    en: 'The annual mandate. Hana sends a thick envelope with no stamp. Inside are three cases no Fixer below Color may take, with a single line: choose one, or give the reason you chose none. All three have room for one death, and the place has no name yet.',
    choices: [
      { labelVi: 'Chọn vụ gần rìa District, nơi dân cư còn đông', labelEn: 'Take the case at the edge of a District, where people still live',
        need: { stat: { health: [45, 100], sanity: [35, 100] } },
        outcomes: [
          { w: 66, effects: { health: -20, sanity: -10, rep: 14, wealth: 22 }, meritAdd: 40,
            resultVi: 'Thứ đó bị chặn lại cách một con hẻm so với cửa sổ đầu tiên có đèn. Khi bạn quay về, các bóng đèn trong hẻm được bật lên cùng lúc, như một tiếng vỗ tay không ai dám phát ra.',
            resultEn: 'It is stopped one alley short of the first lit window. When you walk back, the lamps in the alley come on together, like applause nobody dares make.' },
          { w: 34, effects: { health: -34, sanity: -16, rep: 6, wealth: 10 }, meritAdd: 15, scarsAdd: ['Vết thương của chỉ thị niên độ'],
            resultVi: 'Bạn giữ được con hẻm nhưng mất một nhịp ở lần đỡ cuối. Chỗ trống trong phong bì được điền bằng tên của một người mà bạn không kịp đến gần.',
            resultEn: 'You hold the alley but lose a beat on the final parry. The space in the envelope is filled by the name of someone you were too late to reach.' }
        ] },
      { labelVi: 'Nói lý do không chọn: các vụ đều có người khác làm tốt hơn', labelEn: 'Give a reason for choosing none: others are better suited to all three',
        effects: { rep: -5, sanity: 4, network: 3 },
        resultVi: 'Hana chấp nhận lý do và chuyển ba phong bì sang người thứ hai trong danh sách. Hai tuần sau, bạn đọc trên báo của khu rằng một trong ba vụ đã kết thúc theo hướng bạn đã đoán.',
        resultEn: 'Hana accepts the reason and passes the three envelopes to the second name on the list. Two weeks later you read in the district paper that one of the cases ended the way you predicted.' }
    ]
  },
  {
    id: 'color_conclave_seating', age: [28, 90], jobs: ['Color Fixer'], major: true, weight: 70,
    requires: ['ColorFixer'], forbids: ['Distorted', 'color_conclave_done'],
    vi: '[Chỗ ngồi trong phòng họp Color] Các Color của những District gặp nhau mỗi vài năm, trong một phòng họp có bàn dài hơn người ta cần. Ghế được xếp theo thâm niên chứ không theo sức mạnh. Chỗ trống bên cạnh bạn hôm nay thuộc về một người đã mất mà không ai nói tên.',
    en: 'A seat at the Colors’ table. The Colors of the Districts meet every few years in a room with a longer table than anyone needs. Seats go by seniority, not strength. The empty one beside you today belongs to someone who died, and nobody says their name.',
    choices: [
      { labelVi: 'Đứng lên, nói tên người đã mất trước cả phòng', labelEn: 'Stand and say the dead one’s name to the whole room',
        effects: { sanity: -4, rep: 8, network: 6 }, flagsAdd: ['color_conclave_done'],
        resultVi: 'Hai Color lớn tuổi nhìn xuống mặt bàn. Một người trẻ hơn bạn lấy bút ghi tên vào mép giấy họp, rồi gạch đi, rồi viết lại đúng chính tả.',
        resultEn: 'Two older Colors look at the table. One younger than you takes a pen, writes the name on the edge of the agenda, crosses it out, and writes it again with the right spelling.' },
      { labelVi: 'Ngồi yên, nghe họp, rót nước cho cả bàn', labelEn: 'Stay seated, follow the meeting and pour water for the table',
        effects: { sanity: 3, rep: 2, network: 4 }, flagsAdd: ['color_conclave_done'],
        resultVi: 'Cuộc họp kéo dài đến khi nước trong bình cạn. Có người cảm ơn bạn bằng cách đẩy chiếc ghế trống ra xa một chút, đủ để không ai phải nhìn vào nó.',
        resultEn: 'The meeting lasts until the pitcher is empty. Someone thanks you by sliding the empty chair a little further away, enough that nobody has to look at it.' }
    ]
  },
  {
    id: 'color_name_forged', age: [28, 90], jobs: ['Color Fixer'], major: true, weight: 70,
    requires: ['ColorFixer'], forbids: ['Distorted', 'color_forged_done'],
    vi: '[Màu bị mượn] Một chủ nợ ở Backstreets nhận được một lá thư xin gia hạn, ký bằng danh xưng của bạn. Bạn chưa từng viết nó. Chữ ký giống đến mức công chứng viên chịu xác nhận. Người cầm lá thư không tố cáo ai. Ông chỉ hỏi bạn có định trả khoản này không.',
    en: 'The borrowed color. A moneylender in the Backstreets receives an extension request signed with your title. You never wrote it. The signature is close enough for a notary to confirm. The man holding the letter accuses nobody. He only asks whether you plan to pay this.',
    choices: [
      { labelVi: 'Trả khoản nợ và bảo ông cho biết ai đã mang lá thư đến', labelEn: 'Pay the debt and ask him who brought the letter',
        need: { stat: { wealth: [15, 100] } }, costAhn: 15,
        effects: { rep: 4, network: 6, heat: 4 }, flagsAdd: ['color_forged_done'],
        resultVi: 'Ông kể lại: một người đàn ông đội mũ rộng vành, tay trái thiếu hai ngón. Bạn cảm ơn và giữ khoản thù đó cho một ngày không bận hơn.',
        resultEn: 'He describes a man in a wide hat with two fingers missing on his left hand. You thank him and keep that grudge for a day when you have less to do.' },
      { labelVi: 'Từ chối trả, báo Hana về kẻ mạo danh', labelEn: 'Refuse to pay and report the impostor to Hana',
        effects: { rep: 5, sanity: -2, heat: -3 }, flagsAdd: ['color_forged_done'],
        resultVi: 'Hana nhận báo cáo và thêm một dòng vào mục kẻ mạo danh Color. Dòng đó đã dài từ trước khi có tên bạn trên đó.',
        resultEn: 'Hana files the report and adds a line under impersonation of a Color. The list was long before your name appeared on it.' }
    ]
  },
  {
    id: 'color_syndicate_courtesy', age: [28, 90], jobs: ['Color Fixer'], major: true, weight: 70,
    requires: ['ColorFixer'], forbids: ['Distorted', 'color_courtesy_done'],
    vi: '[Chuyến thăm lễ phép] Một người của Syndicate, đi một mình và không mang vũ khí nhìn thấy được, gõ cửa Văn phòng của bạn. Ông mang theo một hộp trà đắt tiền và một lời chào từ người đứng sau ông. Không có yêu cầu nào. Chính điều đó khiến chuyến thăm khó nuốt hơn một lời đe dọa.',
    en: 'The courtesy call. A Syndicate envoy, alone and carrying no visible weapon, knocks at your Office. He brings a box of expensive tea and a greeting from the person behind him. There is no request. That makes the visit harder to swallow than a threat.',
    choices: [
      { labelVi: 'Nhận trà, mời ông ngồi và trò chuyện', labelEn: 'Accept the tea, offer him a seat and talk',
        effects: { network: 8, heat: 6, sanity: -2 }, flagsAdd: ['color_courtesy_done', 'ColorSyndicateCourtesy'],
        resultVi: 'Ông ở lại đúng một tuần trà. Khi đứng dậy, ông nói rằng người đứng sau ông luôn nhớ ai từng tiếp khách đàng hoàng, và rằng ký ức đó có giá trị theo cả hai chiều.',
        resultEn: 'He stays exactly one pot of tea. As he rises he says his principal always remembers who received guests properly, and that such a memory is worth something in both directions.' },
      { labelVi: 'Trả hộp trà, nói Hana không cho Color nhận quà', labelEn: 'Return the tea and say Hana forbids Colors from accepting gifts',
        effects: { rep: 6, heat: -4, network: -3 }, flagsAdd: ['color_courtesy_done'],
        resultVi: 'Ông cúi chào đúng góc và cầm hộp ra. Ngoài hành lang, bạn nghe ông nói gì đó với ai đứng chờ ông, không rõ lời.',
        resultEn: 'He bows at exactly the proper angle and takes the box out. In the corridor you hear him say something to whoever is waiting for him, indistinct.' }
    ]
  },

  // ------------------------------------------------------------------ Era 2, young strand
  {
    id: 'color_young_overreach', age: [27, 55], jobs: ['Color Fixer'], major: true, weight: 80,
    requires: ['ColorFixer', 'ColorYoung'], forbids: ['Distorted', 'color_overreach_done'],
    vi: '[Sức còn trẻ] Sáng nay bạn không đứng dậy nổi. Chẳng có vết thương nào, chỉ là cơ thể từ chối làm thêm một việc nữa. Bác sĩ của Hana đặt bốn tờ phiếu khám lên bàn, rồi nói rằng cơ thể bạn đã làm việc của người cao hơn ba Grade suốt ba năm, và nó cần có người trả nợ.',
    en: 'Young strength. This morning you cannot stand. There is no wound, only a body that refuses one more job. Hana’s doctor sets four exam slips on the desk, then says your body has done three Grades’ worth of work for three years, and someone has to pay that debt.',
    choices: [
      { labelVi: 'Xin nghỉ một mùa, để việc của bạn chuyển cho người khác', labelEn: 'Take a season off and let your work pass to others',
        effects: { health: 16, sanity: 6, rep: -4, wealth: -8 }, flagsAdd: ['color_overreach_done'],
        resultVi: 'Hana ghi bạn vào danh sách tạm nghỉ. Trong mùa đó bạn nghe tên mình trong ba lần trò chuyện ở quán, và cả ba lần đều bắt đầu bằng chữ nếu.',
        resultEn: 'Hana lists you as temporarily withdrawn. During that season you hear your name in three tavern conversations, and all three begin with the word if.' },
      { labelVi: 'Uống thuốc, tiếp tục nhận việc như cũ', labelEn: 'Take the medicine and keep working as before',
        outcomes: [
          { w: 55, effects: { health: -8, sanity: -4, wealth: 14, rep: 6 }, meritAdd: 25, flagsAdd: ['color_overreach_done'],
            resultVi: 'Thuốc giữ bạn đứng được thêm một năm. Bác sĩ không hỏi bạn có muốn nghe thêm không, và bạn cũng không hỏi.',
            resultEn: 'The medicine keeps you standing another year. The doctor does not ask whether you want to hear more, and you do not ask.' },
          { w: 45, effects: { health: -24, sanity: -8, rep: 2 }, meritAdd: 8, flagsAdd: ['color_overreach_done'], scarsAdd: ['Cơ thể nợ'],
            resultVi: 'Hai tháng sau, tay trái run khi bạn cầm bút. Run không nặng, chỉ đủ để chữ ký của bạn không bao giờ giống hẳn lần trước nữa.',
            resultEn: 'Two months later your left hand trembles when you hold a pen. Not badly, just enough that your signature never again matches the last one.' }
        ] }
    ]
  },

  // ------------------------------------------------------------------ Era 2, E.G.O strand
  {
    id: 'color_ego_resonance_audit', age: [28, 90], jobs: ['Color Fixer'], major: true, weight: 80,
    requires: ['ColorFixer', 'ColorFromEGO'], forbids: ['Distorted', 'color_resonance_audit_done'],
    vi: '[Kiểm tra cộng hưởng] Hana mời bạn vào một phòng không có cửa sổ, nơi một cái máy ghi lại nhịp của thanh E.G.O trên giấy dài. Người điều khiển máy không nói gì suốt hai giờ. Cuối buổi, anh ta đưa bạn hai tờ giấy: một là kết quả, một là chỗ dành cho bạn viết bình luận.',
    en: 'The resonance audit. Hana takes you to a room with no windows, where a machine records the E.G.O’s rhythm on a long strip of paper. The operator says nothing for two hours. At the end he hands you two sheets: one with the results, one with a space for your comments.',
    choices: [
      { labelVi: 'Viết bình luận chi tiết về cảm giác khi nó hiện ra', labelEn: 'Write a detailed comment about how it feels when it appears',
        effects: { sanity: -3, resonance: 8, rep: 3 }, flagsAdd: ['color_resonance_audit_done'],
        resultVi: 'Bạn viết hai mặt giấy bằng những từ mà bạn chưa từng nói thành tiếng. Người điều khiển máy đọc lướt, rồi cất nó vào ngăn kéo, khóa lại.',
        resultEn: 'You fill both sides of the sheet with words you have never said aloud. The operator skims it, then puts it in a drawer and locks it.' },
      { labelVi: 'Để trống, chỉ ký tên', labelEn: 'Leave it blank and just sign',
        effects: { sanity: 2, rep: -1 }, flagsAdd: ['color_resonance_audit_done'],
        resultVi: 'Anh ta ghi một chữ x vào góc tờ giấy trắng. Bạn thấy nó hơi giống dấu cần xem lại, hơi giống chữ ký của một người không biết đọc.',
        resultEn: 'He pencils an x in the corner of the blank sheet. It looks a little like a mark to revisit, a little like the signature of someone who cannot read.' }
    ]
  },
  {
    id: 'color_ego_other_wielder', age: [28, 90], jobs: ['Color Fixer'], major: true, weight: 70,
    requires: ['ColorFixer', 'ColorFromEGO'], forbids: ['Distorted', 'color_other_wielder_done'],
    vi: '[Người cầm cùng loại] Một người lạ tới Văn phòng, cầm một thanh E.G.O mà dáng giống hệt thanh của bạn, chỉ đảo ngược trái phải. Anh ta chưa nhận danh xưng nào và không biết điều đó nghĩa là gì với Hana. Anh ta hỏi một câu: nó có từng nói chuyện với bạn không.',
    en: 'A wielder of the same kind. A stranger comes to the Office carrying an E.G.O shaped like yours, mirrored left to right. He holds no title and does not know what that means to Hana. He asks one thing: has yours ever spoken to you.',
    choices: [
      { labelVi: 'Nói sự thật về những tiếng thở', labelEn: 'Tell him the truth about the breathing',
        effects: { sanity: -3, network: 5, resonance: 4 }, flagsAdd: ['color_other_wielder_done', 'ColorMetWielder'],
        resultVi: 'Anh ta ghi chép bằng bút chì, tay run đến mức nét chữ thành đường zigzag. Khi đi, anh ta để lại số liên lạc ở một quán trà và nhắc bạn đừng gọi vào buổi tối.',
        resultEn: 'He takes notes in pencil, his hand shaking so hard the lines turn to zigzags. On leaving he gives you a contact at a tea house and warns you not to call in the evenings.' },
      { labelVi: 'Bảo anh ta đi gặp bác sĩ của Hana, không hỏi thêm', labelEn: 'Send him to Hana’s doctor and ask nothing more',
        effects: { sanity: 2, rep: 3 }, flagsAdd: ['color_other_wielder_done'],
        resultVi: 'Anh ta nhìn bạn một lúc lâu để tìm một vết nứt. Không thấy, anh ta cám ơn bằng giọng của người vừa mất một thứ nhỏ.',
        resultEn: 'He looks at you for a while, as if searching for a crack. When he finds none he thanks you in the voice of someone who has just lost something small.' }
    ]
  },

  // ------------------------------------------------------------------ Era 3: what stays
  {
    id: 'color_peer_funeral_eulogy', age: [45, 95], jobs: ['Color Fixer'], major: true, weight: 75,
    requires: ['ColorFixer'], forbids: ['Distorted', 'color_funeral_done'],
    vi: '[Điếu văn cho người ngang hàng] Một Color cùng thời với bạn mất trong một chỉ thị mà ai cũng cho là không nguy hiểm. Hana nhờ bạn đọc điếu văn, vì bạn là người cuối cùng còn nhớ ông ấy khi còn chưa mang màu. Bạn có hai trang giấy và mười phút.',
    en: 'A eulogy for a peer. A Color from your era dies in a mandate everyone called safe. Hana asks you to give the eulogy, since you are the last one who remembers them before they carried a color. You have two sheets of paper and ten minutes.',
    choices: [
      { labelVi: 'Nói về người ấy khi chưa mang màu', labelEn: 'Speak of them before they carried a color',
        effects: { sanity: -4, rep: 6, network: 4 }, flagsAdd: ['color_funeral_done'],
        resultVi: 'Bạn kể về một người trẻ đã đội mũ ngược vì quên chỉnh lại. Trong hàng ghế đầu, hai người cười rồi vội che miệng. Bạn bảo họ cứ cười, ông ấy không phiền.',
        resultEn: 'You tell of a young person who wore their cap backwards because they forgot to turn it. In the first row two people laugh and cover their mouths. You tell them go ahead, the dead one would not mind.' },
      { labelVi: 'Đọc bản của Hana soạn sẵn', labelEn: 'Read the text Hana prepared',
        effects: { sanity: 2, rep: 3 }, flagsAdd: ['color_funeral_done'],
        resultVi: 'Bản điếu văn gọn, đúng, kết thúc ở chỗ đã định. Khi bạn đọc xong, không ai vỗ tay, và bạn nhớ ra rằng đây là nơi người ta chưa bao giờ vỗ tay.',
        resultEn: 'The eulogy is brief and correct and ends where it was meant to. When you finish nobody applauds, and you remember this is a place where nobody ever has.' }
    ]
  },
  {
    id: 'color_hana_hands_slowing', age: [55, 95], jobs: ['Color Fixer'], major: true, weight: 85,
    requires: ['ColorFixer'], forbids: ['Distorted', 'color_hands_slowing_done'],
    vi: '[Khi tay chậm lại] Một Director của Hana mời bạn uống cà phê, loại hẹn gặp mà người ta nhận ra ngay từ cái nhìn đầu tiên. Ông hỏi, bằng giọng không có ác ý, bạn định giữ danh xưng đến khi nào. Danh xưng của một Color có thể giữ đến chết, nhưng chỉ khi người mang nó còn có thể gánh việc của nó.',
    en: 'When the hands slow. A Hana Director invites you for coffee, the kind of appointment you recognize from the first glance. He asks, without malice, how long you plan to keep your title. A Color’s title can be held until death, but only while the holder can still carry its work.',
    choices: [
      { labelVi: 'Nói bạn sẽ giữ đến khi không còn cầm nổi vũ khí', labelEn: 'Say you will hold it until you can no longer lift a weapon',
        effects: { sanity: -2, rep: 6 }, flagsAdd: ['color_hands_slowing_done', 'ColorHoldsToTheEnd'],
        resultVi: 'Ông ghi lại, không bình luận, và gọi thêm một ly cho bạn. Phần cà phê còn lại hai người nói về một việc khác hẳn, và cả hai đều biết lý do.',
        resultEn: 'He writes it down without comment and orders you another cup. The rest of the coffee goes to a different subject entirely, and both of you know why.' },
      { labelVi: 'Nói bạn sẽ chọn người kế vị và rút dần', labelEn: 'Say you will choose a successor and step back by degrees',
        effects: { sanity: 5, network: 5, rep: -2 }, flagsAdd: ['color_hands_slowing_done', 'ColorPlansSuccession'],
        resultVi: 'Ông thở ra, không rõ nhẹ nhõm hay tiếc, rồi đưa bạn một danh sách bốn cái tên mà Hana đã để mắt từ trước. Hóa ra bạn không phải người đầu tiên được hỏi câu này.',
        resultEn: 'He exhales, whether in relief or regret is unclear, and hands you a list of four names Hana has been watching. It turns out you are not the first to be asked.' }
    ]
  },
  {
    id: 'color_young_now_old', age: [55, 95], jobs: ['Color Fixer'], major: true, weight: 85,
    requires: ['ColorFixer', 'ColorYoung'], forbids: ['Distorted', 'color_young_now_old_done'],
    vi: '[Người trẻ nhất, năm xưa] Một người vừa nhận màu bước vào buổi tiệc của Hana, trẻ hơn bạn lúc ấy chừng vài tuổi. Có hai Color lớn tuổi nói về cô ta đủ to để cô nghe. Một trong hai người kia là chính bạn ba mươi năm trước, và cô đang đứng đúng chỗ bạn đã đứng.',
    en: 'The youngest, once. Someone newly named walks into a Hana reception, a few years younger than you were. Two older Colors discuss her loudly enough for her to hear. One of those two is you, thirty years ago, and she is standing exactly where you stood.',
    choices: [
      { labelVi: 'Đi tới và mời cô ngồi cùng bàn bạn', labelEn: 'Walk over and invite her to sit at your table',
        effects: { sanity: 4, rep: 5, network: 6 }, flagsAdd: ['color_young_now_old_done', 'ColorMentoredYoung'],
        resultVi: 'Cô ngồi thẳng người và gọi bạn bằng màu chứ không bằng tên, đúng mẫu câu đã học. Bạn bảo cô không cần, và cô cười như người vừa được cho phép ngừng nín thở.',
        resultEn: 'She sits stiffly and addresses you by color, not name, like someone who learned the right phrase. You tell her she need not, and she laughs like someone allowed to stop holding their breath.' },
      { labelVi: 'Quan sát từ xa, để cô tự tìm đường', labelEn: 'Watch from a distance and let her find her own way',
        effects: { sanity: -2, rep: 1 }, flagsAdd: ['color_young_now_old_done'],
        resultVi: 'Cô rời buổi tiệc sớm, không ai giữ lại. Ở cửa, người phục vụ đưa cô áo khoác và hỏi có ai nói gì khó nghe không. Bạn chỉ nghe được nửa đầu câu trả lời.',
        resultEn: 'She leaves the reception early and nobody stops her. At the door the waiter hands her her coat and asks whether anyone said anything unkind. You catch only the first half of her answer.' }
    ]
  },
  {
    id: 'color_ego_after_you', age: [55, 95], jobs: ['Color Fixer'], major: true, weight: 85,
    requires: ['ColorFixer', 'ColorFromEGO'], forbids: ['Distorted', 'color_ego_after_done'],
    vi: '[Sau bạn] Người luật sư của Hana mang ra một mẫu di chúc cho người mang E.G.O. Nó chỉ có một điều khoản đặc biệt: vũ khí không phải tài sản và không thể để lại. Nó biến mất hoặc ở lại, tùy ý nó. Ông hỏi bạn muốn ghi gì vào phần dành cho người ở lại.',
    en: 'After you. A Hana lawyer brings out a will form for E.G.O wielders. It has one unusual clause: the weapon is not property and cannot be bequeathed. It vanishes or stays, at its own discretion. He asks what you want written in the section for those who remain.',
    choices: [
      { labelVi: 'Viết một lá thư để lại cho người sau', labelEn: 'Write a letter for whoever comes after',
        effects: { sanity: -2, rep: 4 }, flagsAdd: ['color_ego_after_done', 'ColorLeftLetter'],
        resultVi: 'Bạn viết ba đoạn, rồi gạch hai, rồi giữ lại đoạn thứ ba chỉ có một câu. Luật sư dán thư vào phong bì và ghi ngoài một dòng: chỉ mở khi cần.',
        resultEn: 'You write three paragraphs, strike two, and keep the third, which is a single sentence. The lawyer seals it and notes on the outside: open only when needed.' },
      { labelVi: 'Để trống, để vũ khí tự quyết', labelEn: 'Leave it empty and let the weapon decide',
        effects: { sanity: 3, resonance: 4 }, flagsAdd: ['color_ego_after_done'],
        resultVi: 'Luật sư ghi chữ không ở cuối phần trống rồi ký xác nhận. Đêm đó bạn nằm nghe nhịp thở thứ hai trong phòng lâu hơn bình thường.',
        resultEn: 'The lawyer writes none at the end of the empty section and countersigns. That night you lie listening to the second breath in the room longer than usual.' }
    ]
  }
];
