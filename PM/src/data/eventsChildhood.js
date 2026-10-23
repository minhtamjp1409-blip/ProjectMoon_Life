// ============================================================================
// MAJOR EVENTS: CHILDHOOD, ADOLESCENCE, THE BLOODLINE, AND WHAT COMES BACK
// These stop time. The "[Title]" at the start of each text becomes the heading of
// the decision panel. Violence is written once and exactly; the City is cruel
// because it is ordinary about it.
// ============================================================================

export const CHILDHOOD_EVENTS = [
  // --- the bloodline ---
  {
    id: 'leg_inherited_relic',
    age: [7, 11],
    major: true,
    weight: 12,
    requires: ['HuyếtThốngKếThừa'],
    vi: "[Di vật của {parentName}] Chủ trọ đã lấy sạch đồ để trừ nợ. Dưới tấm ván sàn còn một hộp thiếc của {parentName}. Bên trong, 「{relic}」 nằm dưới chiếc áo cũ; máu trên mép đã khô. Không có thư để lại.",
    en: '[The box under the floor] Beneath a loose board you found {parentName}’s iron box. Inside was 「{relic}」, wrapped in an old shirt. The blood on the edge had dried brown, and no one had wiped it off.',
    choices: [
      {
        labelVi: 'Cứa tay, để máu mình chảy lên lưỡi, và thề sẽ tìm ra kẻ đã giết người ấy',
        labelEn: 'Cut your palm, let your blood run on the edge, and swear to find whoever killed them',
        resultVi: 'Vệt máu ấm trượt dọc theo rãnh kim loại của 「{relic}」, hòa quyện vào lớp máu khô năm xưa. Cơn đau buốt đánh thức một sự lạnh lùng xa lạ trong lồng ngực đứa trẻ mười tuổi. Từ ngày hôm đó, bạn thôi ngước nhìn bầu trời The City và bắt đầu học cách nhìn vào các khớp xương của những kẻ đi ngang qua.',
        resultEn: 'Your blood ran into the groove of 「{relic}」 and mixed with the old stain. You were ten, and from that day you stopped playing with the other children.',
        effects: { health: -6, sanity: -8, rep: +10, resonance: +14 },
        flagsAdd: ['유물', '해결사동경'],
        scarsAdd: ['Lời thề trên di vật'],
        scheduleConsequences: [
          {
            eventId: 'csq_parent_old_comrade',
            delayYears: 6,
            reasonVi: 'Một người từng sống sót cùng {parentName} sẽ nhận ra món di vật',
            reasonEn: 'Someone who survived alongside {parentName} will recognize the relic'
          }
        ]
      },
      {
        labelVi: 'Mang ra chợ đen bán lấy tiền ăn',
        labelEn: 'Sell it at the black market for food money',
        resultVi: "Gã thợ cầm đồ thấy máu trên 「{relic}」, rồi đặt một xấp Ahn xuống quầy. \"Cầm lấy mà sống. Đừng quay lại tìm nó.\" Tối ấy bạn có bánh mì nóng, nhưng chiếc hộp thiếc ở nhà đã trống.",
        resultEn: 'The buyer turned it over, looked at the blood, then at you. “Your parent’s?” He paid 12 Ahn and asked nothing more. You ate well that night, and couldn’t sleep.',
        effects: { wealth: +12, sanity: -8, rep: -4 },
        scarsAdd: ['Món di vật đã bán']
      }
    ]
  },
  {
    id: 'leg_inherited_vendetta',
    age: [14, 17],
    major: true,
    weight: 16,
    requires: ['NợMáuĐờiTrước'],
    vi: "[Món nợ của {parentName}] Hai người của The Middle ngồi đợi trong phòng bạn. Một kẻ mở Book of Vengeance đến trang tên {parentName}: một mạng người và sáu ngón tay còn nợ. \"Người chết rồi, dòng này vẫn còn. Bạn trả thế nào?\"",
    en: '[{parentName}’s debt] Two members of the Middle were standing in your room when you came home from school. One held the Book of Vengeance, open to the page with {parentName}’s name.\n“They still owe us. When the debtor dies, the child pays. What are you paying with today?”',
    choices: [
      {
        labelVi: 'Đưa hết số Ahn bạn có, và để chúng lấy phần còn lại bằng dao',
        labelEn: 'Hand over every Ahn you have, and let them take the rest with a knife',
        resultVi: 'Tên gã Middle rút lưỡi găm bạc, đâm ngọt qua bắp đùi bạn với độ chuẩn xác lạnh lùng của một tay đồ tể lành nghề. Hắn nhúng đầu ngón tay vào vũng máu đang tuôn ra, quẹt một đường ngang xóa tên {parentName} trong cuốn sổ rồi khép lại: "Khoản nợ đã tất toán. Chúc mừng mày đã giữ lại được cái đầu."',
        resultEn: 'The older one put a knife through your thigh, neat and unhurried, like stamping a form. He used your blood to strike out {parentName}’s line and closed the book. “Settled.”',
        effects: { health: -20, wealth: -12, sanity: -10, heat: -20, resonance: +12 },
        scarsAdd: ['Vết dao trả nợ']
      },
      {
        labelVi: 'Hất nồi nước sôi trên bếp vào mặt chúng rồi nhảy qua cửa sổ',
        labelEn: 'Throw the boiling pot from the stove in their faces and jump out the window',
        resultVi: "Bạn hất dầu sôi vào tên gác cửa rồi lao qua mái tôn xuống cống. Đến sáng, The Middle đã ghi tên bạn bằng mực đỏ vào Book of Vengeance. Món nợ cũ chưa trả; một món mới vừa được thêm vào.",
        resultEn: 'You heard screaming behind you as you dropped onto the tin roof below and cracked a rib. By nightfall your name was written in the Book of Vengeance in red ink, right under {parentName}’s.',
        effects: { health: -18, sanity: -10, rep: +10, heat: +25, resonance: +14 },
        flagsAdd: ['MiddleVendetta'],
        scarsAdd: ['Tên viết bằng mực đỏ'],
        scheduleConsequences: [
          {
            eventId: 'csq_middle_ambush_adult',
            delayYears: 4,
            reasonVi: 'The Middle không quên kẻ đã làm bỏng mặt người của chúng',
            reasonEn: 'The Middle does not forget who scalded one of their own'
          }
        ]
      }
    ]
  },

  // --- childhood, by where you grew up ---
  {
    id: 'ch_nest_early_screening',
    age: [4, 7],
    major: true,
    weight: 9,
    requires: ['Nest'],
    vi: "[Buổi kiểm tra của Wing] Trong phòng khám Nest, bác sĩ đặt trước mặt bạn một ống thuốc sáng màu. Nó có thể đẩy điểm tương thích Singularity vào nhóm đầu, nhưng cũng có nguy cơ làm hỏng khả năng vận động. Nếu điểm thấp, gia đình bạn có thể mất suất ở Nest. Cha mẹ chờ bạn trả lời.",
    en: '[The Wing’s screening] At five, every Feather child in the Nest was taken into a white room to measure their “Singularity compatibility.”\nThe doctor gave your parents two options: an injection into the spine for a better score, or let you sit the test as you are and accept the result.',
    choices: [
      {
        labelVi: 'Nhận mũi tiêm',
        labelEn: 'Take the injection',
        resultVi: "Mũi kim chạm đốt sống. Bạn sốt ba ngày, rồi tên mình xuất hiện trong nhóm điểm cao nhất. Cha đóng khung chứng chỉ; bạn giấu bàn tay đang co giật dưới bàn.",
        resultEn: 'You don’t remember the pain, only that you shook for three days afterward. The result read “Excellent.” Your father framed it in the living room.',
        effects: { health: -10, sanity: -8, rep: +10, network: +12, resonance: +8 },
        flagsAdd: ['ThượngLưu'],
        scarsAdd: ['Vết kim trên cột sống']
      },
      {
        labelVi: 'Làm bài như bình thường',
        labelEn: 'Sit the test as you are',
        resultVi: 'Bạn hoàn thành bài kiểm tra với số điểm "Đạt Yêu Cầu". Trong bữa tối hôm đó, không một ai trong gia đình nói một câu nào. Tiếng dao nĩa va vào đĩa sứ vang lên khô khốc, và ánh mắt cha mẹ nhìn bạn đã mang theo nỗi hoang mang lạnh lẽo của những kẻ sắp bị bánh xe Nest đào thải.',
        resultEn: 'You scored “Satisfactory.” Your grandmother said nothing all through dinner, and no one dared ask why.',
        effects: { sanity: +6, health: +4, rep: -3 }
      }
    ]
  },
  {
    id: 'ch_sweeper_night_313',
    age: [5, 10],
    major: true,
    weight: 3, // was 6; with the larger childhood pool it no longer needs to carry the Backstreets alone
    requires: ['Backstreets'],
    forbids: ['Nest', 'Outskirts'],
    vi: "[Đêm 3:13] Đèn Backstreets tắt sau hồi còi. Từ dưới gầm giường, bạn nghe móc sắt của Sweeper cào trên mặt đường. Ông Kang đập cửa phòng trọ, giọng đứt quãng: \"Mở cửa. Tay chú mắc vào cửa rồi. Chúng đang tới.\"",
    en: '[3:13] The siren had stopped. Out in the street the Sweepers were doing their work, and there were sounds you would never forget.\nThen someone pounded on the door. Old Kang from next door, hoarse and desperate: “Open up! Please, my arm...”',
    choices: [
      {
        labelVi: 'Rút chốt, kéo ông ấy vào',
        labelEn: 'Pull the bolt and drag him in',
        outcomes: [
          {
            w: 65,
            resultVi: "Bạn kéo ông Kang qua ngưỡng cửa đúng lúc móc sắt quét tới. Vai bạn bị rạch; cánh tay trái của ông đã mất ngoài bậc thềm. Ông còn sống. Hai người giữ chặt then cửa đến sáng.",
            resultEn: 'You got Kang inside. A metal hook slid through the gap before you could shut it, and left a deep tear across your shoulder. Kang lost an arm. You kept the rest of him.',
            effects: { health: -14, sanity: -6, rep: +6, resonance: +10 },
            recordsAdd: ['survive_night'],
            scarsAdd: ['Vết móc đêm 3:13'],
            scheduleConsequences: [
              {
                eventId: 'csq_saved_neighbor_gift',
                delayYears: 7,
                reasonVi: 'Ông Kang nợ bạn một mạng',
                reasonEn: 'Old Kang owes you a life'
              }
            ]
          },
          {
            w: 35,
            resultVi: "Một vòi của Sweeper luồn qua khe cửa, phun axit lên tay bạn. Bạn vẫn kéo được ông Kang vào rồi cài then. Hai người nằm trên sàn đến khi trời sáng, không ai dám nhìn vết thương của người kia.",
            resultEn: 'The moment the door opened a nozzle pushed through. Whatever it sprayed peeled the skin off your forearm like wet paper. You still dragged Kang in, and the two of you lay on the floor until morning.',
            effects: { health: -22, sanity: -14, resonance: +15 },
            recordsAdd: ['survive_night'],
            scarsAdd: ['Cánh tay bỏng đêm 3:13'],
            scheduleConsequences: [
              {
                eventId: 'csq_saved_neighbor_gift',
                delayYears: 7,
                reasonVi: 'Ông Kang sống sót, và cả hai mang chung một vết thương',
                reasonEn: 'Kang survived, and the two of you share a wound'
              }
            ]
          }
        ]
      },
      {
        labelVi: 'Giữ chặt chốt cửa, bịt tai lại',
        labelEn: 'Hold the bolt shut and cover your ears',
        resultVi: "Tiếng đập cửa yếu dần rồi tắt. Chất lỏng rỉ qua khe gỗ, chạm chân bạn. Khi còi báo hết Night in the Backstreets vang lên, bậc thềm đã được quét sạch.",
        resultEn: 'The pounding stopped after a minute. Something warm ran under the door and touched your toes. By 4 AM the step was spotless, as if no one had ever stood there.',
        effects: { sanity: -15, resonance: +14 },
        recordsAdd: ['survive_night'],
        scarsAdd: ['Thứ chảy qua khe cửa']
      }
    ]
  },
  {
    id: 'ch_organ_harvester_alley',
    age: [7, 12],
    major: true,
    weight: 8.5,
    requires: ['Backstreets'],
    forbids: ['Nest', 'Outskirts'],
    vi: "[Ngõ cụt của lũ Rat] Bạn đi nhặt linh kiện và bắt gặp hai Rat đè một đứa trẻ lên bàn sắt. Một tên cầm dao mổ, tên kia giữ thùng đá. Đứa trẻ không còn sức kêu. Mảnh kính dưới chân bạn vỡ; cả hai quay lại.",
    en: '[The table in the dead end] Scavenging for scrap, you turned into the wrong alley. Two Rats held a child down on a metal table, one with a knife, the other with a cooler. The child was about your age, and had stopped screaming.\nThe one with the knife turned to look at you.',
    choices: [
      {
        labelVi: 'Nhặt thanh sắt dưới chân và lao vào',
        labelEn: 'Grab the iron bar at your feet and charge',
        outcomes: [
          {
            w: 55,
            resultVi: "Bạn đâm xà beng vào cổ tên cầm dao. Tên kia ôm thùng đá bỏ chạy. Đứa trẻ trên bàn đã chết từ trước. Bạn lấy số Ahn và con dao của Rat, rồi bước ra khỏi ngõ.",
            resultEn: 'You caught him in the throat before he could raise the knife. The other one ran off with the cooler. The child on the table was already dead. You took the Rat’s purse, and his knife, and went home and told no one.',
            effects: { health: -10, sanity: -10, wealth: +8, rep: +6, resonance: +10 },
            flagsAdd: ['해결사동경'],
            scarsAdd: ['Lần đầu giết người']
          },
          {
            w: 45,
            resultVi: 'Hắn nhanh hơn. Lưỡi dao rách toạc qua lớp áo bông, rạch một đường dài từ bả vai xuống ngực bạn. Bạn quằn quại lăn vào gầm thùng rác hôi thối, nín thở nằm im giữa bùn lầy suốt bốn tiếng đồng hồ cho đến khi tiếng bước chân của chúng khuất hẳn.',
            resultEn: 'He was faster. The blade opened a line from your shoulder to your chest. You crawled into a dumpster and lay still in the rot for four hours, until they left.',
            effects: { health: -20, sanity: -14, resonance: +14 },
            scarsAdd: ['Vết dao dọc ngực']
          }
        ]
      },
      {
        labelVi: '"Tôi biết chỗ lũ trẻ khác hay ngủ." Đổi mạng mình lấy chỗ trốn của chúng',
        labelEn: '“I know where the other kids sleep.” Trade their hiding place for your life',
        resultVi: 'Hai tên Rat nhìn nhau cười khằng khặc, ném vào ngực bạn 8 đồng Ahn rồi quay lưng rảo bước về phía khu đường cống ngầm. Đêm hôm đó, những tiếng gào khóc xé lòng vọng lên từ nắp cống đầu ngõ. Trong số những đứa trẻ bị lôi đi mổ tạng, có đứa từng bẻ đôi mẩu bánh mì khô chia cho bạn vào ngày mưa bão.',
        resultEn: 'They gave you 8 Ahn and let you go. That night there was screaming from the drain where the orphans slept. One of them had once shared half a loaf with you.',
        effects: { wealth: +8, sanity: -18, heat: +10, resonance: +18 },
        scarsAdd: ['Chỗ trốn đã bán'],
        scheduleConsequences: [
          {
            eventId: 'csq_bread_victim_revenge',
            delayYears: 6,
            reasonVi: 'Có một đứa trẻ sống sót đêm ấy, và nó biết ai đã nói',
            reasonEn: 'One child survived that night, and knows who told'
          }
        ]
      }
    ]
  },
  {
    id: 'ch_nest_elite_tutoring',
    age: [8, 12],
    major: true,
    weight: 9,
    requires: ['Nest'],
    vi: "[Cuối bảng điểm] Học sinh xếp chót bị bảo an Wing đưa khỏi lớp. Gia đình họ mất quyền ở Nest. Trước kỳ thi ngày mai, giáo viên đặt một lọ thuốc không nhãn lên bàn bạn: điểm sẽ tăng, nhưng cơ thể phải trả giá. Tên bạn đang ở gần cuối danh sách.",
    en: '[The bottom of the class] This month, the student ranked last lost their residency in the middle of a lesson. Wing security walked the whole family to the Nest gate before dinner.\nThe next day the teacher set an unlabeled vial on your desk. “Take it before the exam. A little nosebleed, that’s all.”',
    choices: [
      {
        labelVi: 'Uống thuốc',
        labelEn: 'Take the vial',
        resultVi: 'Máu mũi nhỏ từng giọt đặc quánh xuống tờ giấy thi, nhưng ngòi bút của bạn không hề dừng lại dù chỉ một giây. Bạn giành vị trí thủ khoa. Người bạn cùng bàn xếp cuối bảng; sang tháng sau, chiếc bàn bên cạnh bạn đã được thay bằng một hồ sơ trống trơn.',
        resultEn: 'Blood dripped from your nose onto the exam paper, but your hand didn’t stop. You came first. The student beside you came last, and next month their seat was empty.',
        effects: { health: -18, sanity: -16, wealth: +15, network: +16, rep: +10, resonance: +12 },
        flagsAdd: ['ThượngLưu'],
        scarsAdd: ['Máu mũi trên bài thi']
      },
      {
        labelVi: 'Đổ ống thuốc vào cốc nước của bạn đứng đầu lớp',
        labelEn: 'Pour the vial into the top student’s water',
        resultVi: 'Thủ khoa lớp gục ngã co giật sùi bọt mép ngay giữa giờ thi. Các nhân viên y tế khiêng cáng chạy vào, và bạn lạnh lùng bước qua vũng nước đổ để tiến lên bục nhận suất học bổng danh giá của Wing.',
        resultEn: 'They collapsed in the middle of the exam. They were carried out, and you stepped over the spot where they’d lain to accept the Wing’s scholarship.',
        effects: { sanity: -22, wealth: +20, network: +14, heat: +15, resonance: +18 },
        scarsAdd: ['Cốc nước trong phòng thi']
      }
    ]
  },
  {
    id: 'ch_outskirts_ruins_expedition',
    age: [12, 17],
    major: true,
    weight: 9.5,
    requires: ['Outskirts'],
    vi: "[Lối xuống Ruins] Một trận sạt cát mở ra đường hầm dưới Outskirts. Ở đáy hầm, một Fixer của Eight Association nằm chết, tay vẫn giữ hộp hợp kim khóa kín. Có thứ đang ăn xác họ trong bóng tối. Bạn cần quyết định trước khi nó ngẩng đầu.",
    en: '[The shaft under the Ruins] Looking for water, you found a way down into the Ruins, opened up by a landslide. Down there lay a dead Eight Association Fixer, still clutching a metal case. Something was eating the lower half of the body.',
    choices: [
      {
        labelVi: 'Trát bùn lên người cho mất mùi, bò vào lấy chiếc hộp',
        labelEn: 'Smear yourself with mud to hide your scent and crawl in for the case',
        startDungeon: 'dungeon_outskirts_ruins',
        resultVi: 'Bạn trét bùn tanh khắp người, nín thở và bò sát mặt đá. Đường hầm hẹp dần, và mùi của thứ đang ăn xác chuyển từ tanh sang ngọt.',
        resultEn: 'You smear stinking mud over yourself and crawl along the stone, holding your breath. The tunnel narrows, and the smell of whatever feeds on the body turns from rank to sweet.'
      },
      {
        labelVi: 'Bán vị trí cái hầm cho một nhóm săn tiền thưởng',
        labelEn: 'Sell the location to a bounty crew',
        resultVi: 'Họ trả 14 Ahn và cho bạn đi theo. Bạn học được cách đặt bẫy, cách nghe tiếng đất rung, và cách không bao giờ quay lưng về phía bóng tối.',
        resultEn: 'They paid 14 Ahn and let you tag along. You learned to set traps, to listen to the ground shake, and never to turn your back on the dark.',
        effects: { wealth: +14, network: +12, health: +4 }
      }
    ]
  },

  // --- adolescence ---
  {
    id: 'ad_nest_succession_sabotage',
    age: [13, 17],
    major: true,
    weight: 9.5,
    requires: ['Nest'],
    vi: "[Suất thực tập duy nhất] Gia tộc chỉ được đề cử một người vào Wing. Anh họ vu bạn bán bí mật phòng thí nghiệm; trưởng bối đã tin. Bạn lại có băng ghi âm anh ta thuê sát thủ Shi giết giám khảo tuần trước. Cả nhà đang chờ lời giải thích.",
    en: '[The family’s one nomination] The family has only one Wing internship nomination this year. Your cousin accused you of leaking lab documents, and the adults believed him.\nBut you have a recording: he hired someone from Shi Association to threaten an examiner.',
    choices: [
      {
        labelVi: 'Gửi đoạn ghi âm cho ban thanh tra nội bộ của Wing',
        labelEn: 'Send the recording to the Wing’s internal inspectors',
        resultVi: 'Thanh tra nội bộ của Wing ập vào bắt giữ anh ta ngay trong đêm mưa bão, rồi đến lượt cha mẹ anh ta bị triệu tập cách ly. Bạn đường hoàng tiếp nhận suất đề cử Feather danh giá. Kể từ đêm đó, trong mọi bữa tiệc gia tộc, chiếc ghế hai bên cạnh bạn luôn luôn trống không.',
        resultEn: 'They took him that night, and his parents after him. You got the nomination. At family dinners after that, no one sat next to you.',
        effects: { wealth: +22, network: +18, rep: +14, sanity: -12, resonance: +12 },
        flagsAdd: ['ThượngLưu'],
        scarsAdd: ['Cả một nhánh họ bị đưa đi']
      },
      {
        labelVi: 'Giữ đoạn ghi âm, và bắt anh ta làm việc cho bạn',
        labelEn: 'Keep the recording, and make him work for you',
        resultVi: 'Anh ta rút đơn, đưa bạn quỹ riêng của mình, và từ đó gọi bạn bằng giọng lễ phép đến lạ.',
        resultEn: 'He withdrew, handed you his private savings, and from then on spoke to you with a strange politeness.',
        effects: { wealth: +28, network: +15, sanity: -6 }
      }
    ]
  },
  {
    id: 'ad_index_paper_slip',
    age: [13, 16],
    major: true,
    weight: 8,
    requires: ['Backstreets'],
    forbids: ['Nest', 'Outskirts'],
    vi: "[Prescript của The Index] Messenger đặt một cuộn giấy vào tay bạn. Prescript yêu cầu trước nửa đêm cắt ngón áp út tay trái của người đầu tiên mỉm cười với bạn sáng nay, ngâm trong cồn ấm rồi đặt ở cửa sổ tầng ba khu nhà đổ nát. Người ấy là bà Hwa, người vừa băng vết thương cho bạn mà không lấy tiền.",
    en: '[Prescript] An Index Messenger, eyes bound in white, pressed a slip of paper into your hand:\n「Before midnight, cut off the left ring finger of the first person who smiled at you today. Steep it in warm liquor. Leave it on a third-floor windowsill.」\nThe first person who smiled at you this morning was Mrs. Hwa, who once bandaged your wounds and took no money for it.',
    choices: [
      {
        labelVi: 'Làm theo Prescript',
        labelEn: 'Follow the Prescript',
        resultVi: 'Bà Hwa không la, bà chỉ nhìn bạn. Lúc bạn đặt cái cốc lên bậu cửa sổ, có ai đó trong bóng tối dưới đường cúi đầu chào bạn.',
        resultEn: 'Mrs. Hwa didn’t scream, she only looked at you. When you set the glass on the windowsill, someone in the dark below bowed to you.',
        effects: { sanity: -14, rep: +10, resonance: +12 },
        flagsAdd: ['IndexAttention'],
        scarsAdd: ['Ngón tay của bà Hwa'],
        scheduleConsequences: [
          {
            eventId: 'csq_index_recruitment_call',
            delayYears: 4,
            reasonVi: 'The Index nhớ người đã làm theo không chút do dự',
            reasonEn: 'The Index remembers the one who obeyed without hesitating'
          }
        ]
      },
      {
        labelVi: 'Cắt ngón út của chính mình thay vào, hy vọng chúng không nhận ra',
        labelEn: 'Cut off your own little finger instead, and hope they can’t tell',
        resultVi: 'Chúng nhận ra. Ba Proselyte đến vào lúc gần sáng, đánh gãy ba xương sườn của bạn, rồi để bạn sống. "Ngươi đã hiến máu. Lần sau, hãy làm đúng."',
        resultEn: 'They could tell. Three Proselytes came just before dawn, broke three of your ribs, and let you live. “You gave blood. Next time, do it right.”',
        effects: { health: -14, sanity: -8, resonance: +12 },
        scarsAdd: ['Bàn tay thiếu một ngón']
      },
      {
        labelVi: 'Đốt tờ Prescript và lẩn vào đám đông Backstreets',
        labelEn: 'Burn the Prescript and slip into the Backstreet crowd',
        resultVi: 'Tờ giấy hóa thành tro tàn trong ngọn lửa đèn dầu. Mấy ngày liền bạn không dám đi qua con phố cũ, tim đập thình thịch mỗi khi thấy người quấn dải băng trắng.',
        resultEn: 'The paper turned to ash over an oil flame. For days you avoided the old street, heart pounding whenever you caught sight of white cloth bindings.',
        effects: { sanity: -8, heat: +8 },
        flagsAdd: ['PrescriptDefied']
      }
    ]
  },
  {
    id: 'ad_retired_fixer_mentor',
    age: [14, 17],
    major: true,
    weight: 9,
    requires: ['Backstreets'],
    forbids: ['Nest'],
    vi: "[Bài thử của Salvador] Salvador, cựu Fixer Grade 4, dẫn bạn xuống hầm Office cũ. Trong lồng là một con chó săn chiến đấu bị bỏ đói. Ông ném cho bạn ống thép gỉ: \"Bước vào. Ra được thì ta dạy tiếp.\"",
    en: '[The last test] Salvador, a retired Grade 4 Fixer with half his face ruined by acid, agreed to train you. His final test was an iron cage, a hound starved for five days, and a length of steel pipe.\n“Get out, and I keep teaching you.”',
    choices: [
      {
        labelVi: 'Đưa tay trái cho nó cắn, dùng tay phải đâm',
        labelEn: 'Give it your left arm to bite, and strike with your right',
        resultVi: 'Răng nó ngập đến xương. Đoạn ống thép của bạn tìm thấy mắt nó. Salvador mở lồng, ném cho bạn cuộn băng, và lần đầu tiên gọi bạn bằng tên.',
        resultEn: 'Its teeth went to the bone. Your pipe found its eye. Salvador opened the cage, tossed you a roll of bandage, and for the first time called you by name.',
        effects: { health: -14, sanity: -6, rep: +14, network: +12, resonance: +12 },
        flagsAdd: ['FixerTrained'],
        npcAdd: { role: 'mentor', nameVi: 'Salvador', nameEn: 'Salvador', bond: 70, traitVi: 'Fixer Grade 4 đã giải nghệ, nửa mặt bị axit, ít khen nhưng không bao giờ bỏ rơi học trò', traitEn: 'retired Grade 4 Fixer, half his face burned by acid, stingy with praise, never abandons a student' },
        scarsAdd: ['Vết răng trên cánh tay trái'],
        meritAdd: 12
      },
      {
        labelVi: 'Dùng ống thép giữ khoảng cách, ghìm mõm nó xuống sàn',
        labelEn: 'Keep your distance with the steel pipe, pinning its jaws to the floor',
        resultVi: 'Bạn né được cú chồm đầu tiên, dùng cả trọng lượng cơ thể chèn ống thép ngang họng con thú. Salvador mở lồng, gật đầu: "Biết dùng đầu hơn là chỉ đưa mạng ra chịu đòn."',
        resultEn: 'You dodged the first lunge, using all your body weight to jam the pipe across its throat. Salvador cracked the cage open, nodding: "At least you know how to use your head instead of throwing your life away."',
        effects: { health: -8, sanity: -4, rep: +10, network: +10, resonance: +8 },
        flagsAdd: ['FixerTrained'],
        npcAdd: { role: 'mentor', nameVi: 'Salvador', nameEn: 'Salvador', bond: 65, traitVi: 'Fixer Grade 4 đã giải nghệ, nửa mặt bị axit, ít khen nhưng không bao giờ bỏ rơi học trò', traitEn: 'retired Grade 4 Fixer, half his face burned by acid, stingy with praise, never abandons a student' },
        scarsAdd: ['Vết cào ở bắp đùi'],
        meritAdd: 10
      },
      {
        labelVi: 'Bám vào song sắt, xin ông mở cửa',
        labelEn: 'Grab the bars and beg him to open the door',
        resultVi: 'Ông bắn con chó qua song sắt. Rồi ông đá gãy mũi bạn và đuổi bạn ra đường. "Ở ngoài kia không ai mở cửa cho mày đâu."',
        resultEn: 'He shot the dog through the bars. Then he broke your nose with his boot and threw you out. “Out there, no one opens the door for you.”',
        effects: { health: -6, sanity: -10, rep: -8 },
        scarsAdd: ['Cái mũi gãy của Salvador']
      }
    ]
  },

  // --- eighteen ---
  {
    id: 'ad_outskirts_crossroad_18',
    age: [15, 99],
    jobs: ['Child'],
    regions: ['OUTSKIRTS'],
    major: true,
    weight: 999,
    vi: "[Bên kia bức tường] Đến tuổi phải tự lo thân, bạn theo đoàn phế liệu tới cổng kiểm hàng. Ánh đèn The City đã ở rất gần, nhưng bạn vẫn đứng ngoài tường. Người dẫn đường chỉ ba người đang cần thêm tay chân. Mỗi người có một đường đưa bạn vào Backstreets.",
    en: '[Across the wall] Old enough to carry your own weight, you leave camp with a scrap caravan. From the Outskirts you could see the City lights; reaching the wall is not the same as entering. The caravan stops at a cargo checkpoint. Your guide points out three people who need workers. Each has a way through the gate. None promises a way back.',
    choices: [
      {
        labelVi: 'Theo người chở hàng vào xưởng',
        labelEn: 'Follow the freight crew to a workshop',
        resultVi: 'Bạn phụ đẩy xe phế liệu qua cổng. Bên trong, người thợ ở District T giữ lại đôi tay còn nguyên của bạn và trả công theo ngày, không ghi tên vào sổ nào. Đêm đầu tiên trong Backstreets, bạn ngủ cạnh lò rèn đã tắt.',
        resultEn: 'You push the scrap cart through the gate. Inside, a District T smith sees your uninjured hands and pays you by the day, entering your name in no ledger. Your first night in the Backstreets is spent beside a cold forge.',
        setRegion: 'T',
        setJob: 'Outcast',
        effects: { health: -5, wealth: 5, network: 4 },
        flagsAdd: ['EnteredCity']
      },
      {
        labelVi: 'Nhận lời người tuyển việc cho một Office',
        labelEn: 'Take an offer from an Office recruiter',
        resultVi: 'Người tuyển việc ghi bạn vào danh sách khuân vác có người bảo lãnh. Qua cổng District J, hắn đưa bạn đến quầy đăng ký Fixer. Lệ phí lấy gần hết tiền công ứng trước; tấm thẻ Grade 9 có tên bạn, nhưng không ghi bạn sinh ở đâu.',
        resultEn: 'The recruiter puts you on a sponsored labor list. Beyond the District J gate, he takes you to a Fixer registration desk. The fee consumes most of your advance pay. Your Grade 9 card bears your name, but says nothing about your birthplace.',
        setRegion: 'J',
        setJob: 'Fixer',
        setFixerGrade: 9,
        effects: { wealth: -5, network: 5, rep: 3 },
        flagsAdd: ['EnteredCity'],
        recordsAdd: ['fixer_license']
      },
      {
        labelVi: 'Đi theo kẻ buôn lậu qua lối khuất',
        labelEn: 'Follow a smuggler through a hidden route',
        resultVi: 'Bạn bỏ lại xe hàng và đi theo hắn qua một lối dịch vụ dưới chân tường. Khi lên đến Backstreets của District K, hắn đưa bạn một con dao và bảo khoản tiền dẫn đường sẽ được trừ vào việc đầu tiên. Bạn chưa hỏi việc ấy là gì.',
        resultEn: 'You leave the caravan and follow him through a service passage beneath the wall. In District K’s Backstreets he hands you a knife and says the passage fee will come out of your first job. You have not asked what the job is.',
        setRegion: 'K',
        setJob: 'Syndicate',
        effects: { wealth: 6, heat: 10, sanity: -6 },
        flagsAdd: ['EnteredCity']
      }
    ]
  },
  {
    id: 'ad_career_crossroad_18',
    age: [15, 99],
    major: true,
    weight: 999,
    vi: "[Đến tuổi phải tự lo] Tiền ăn, tiền ở và những khoản nợ giờ đến tên bạn. Dưới mái hiên Backstreets, bạn nhìn ba nơi còn nhận người: quầy cấp thẻ Fixer, một Syndicate và cổng tuyển dụng Wing. Bạn chỉ đủ thời gian nộp một đơn.",
    en: '[Working age] You are old enough now, and you start paying for everything in the City yourself, breathing included. No one feeds you anymore. How will you make a living?',
    choices: [
      {
        labelVi: 'Đăng ký làm Fixer Grade 9 với Hana Association',
        labelEn: 'Register with Hana Association as a Grade 9 Fixer',
        resultVi: "Bạn nộp lệ phí ở quầy Hana và nhận thẻ Fixer Grade 9. Người thư ký không ngẩng đầu: \"Giữ thẻ cho khô. Nếu còn sống qua năm đầu, bạn sẽ cần nó.\"",
        resultEn: 'The Grade 9 license was lighter than you expected. The clerk said, in a flat voice, that most people licensed the same day as you won’t see next year.',
        setJob: 'Fixer',
        setFixerGrade: 9,
        effects: { rep: +8, network: +8, sanity: -5 },
        recordsAdd: ['fixer_license'],
        meritAdd: 5
      },
      {
        labelVi: 'Theo một Syndicate trong khu',
        labelEn: 'Join a local Syndicate',
        resultVi: "Capo đưa bạn một con dao và danh sách các hộ nợ tiền bảo kê. \"Thu đủ trước bình minh.\" Không ai hỏi bạn từng cầm dao chưa.",
        resultEn: 'They handed you a gun and a list of households behind on their payments. No one asked if you wanted to.',
        setJob: 'Syndicate',
        effects: { wealth: +14, rep: +8, heat: +18, sanity: -12 },
        recordsAdd: ['finger_initiate'],
        meritAdd: 6
      },
      {
        labelVi: 'Nộp đơn vào làm cho một Wing',
        labelEn: 'Apply to work for a Wing',
        resultVi: "Bạn qua vòng tuyển dụng, nhận thẻ thử việc và đồng phục Feather. Hợp đồng cho phép Wing điều động cơ thể nhân viên khi Singularity gặp sự cố. Chữ ký của bạn nằm ngay dưới điều khoản đó.",
        resultEn: 'You received a probationary badge and a Feather uniform. Page 31 of the contract gave the Wing rights to your body “where necessary.”',
        setJob: 'Wing Employee',
        setWingRank: 0,
        effects: { wealth: +18, network: +12, sanity: -8 },
        flagsAdd: ['Feather', 'Nest'],
        recordsAdd: ['nest_migration']
      }
    ]
  },
  // --- found in childhood, not scheduled by any earlier choice ---
  {
    id: 'child_rusty_workshop_blade',
    age: [7, 13],
    major: true,
    weight: 60,
    forbids: ['child_blade_found'],
    vi: '[Thanh Đao Rỉ Sét Dưới Bãi Rác] Bới tìm linh kiện trong bãi phế thải Backstreets, tay bạn chạm phải một chuôi kiếm bọc da sờn rách. Đó là một thanh đao Workshop cũ bị bỏ lại sau một vụ thanh trừng đêm qua. Lưỡi đao mẻ vài chỗ nhưng thép vẫn sáng loáng dưới ánh đèn đường.',
    en: '[Rusted Workshop Blade in the Scraps] Foraging through Backstreet refuse, your fingers strike worn leather. A discarded Workshop sabre from last night’s purge. The edge is nicked, but the alloy gleams under lamplight.',
    choices: [
      {
        labelVi: 'Giấu thanh đao dưới gầm giường, ngày ngày lén tập vung kiếm',
        labelEn: 'Hide the sabre under your cot, practicing forms in secret',
        resultVi: 'Những vết chai đầu tiên hình thành trên lòng bàn tay non nớt của bạn. Cảm giác cầm vũ khí mang lại cho bạn sự tự tin hiếm hoi giữa khu ổ chuột đầy hiểm nguy.',
        resultEn: 'The first calluses hardened across your young palms. Holding steel gave you rare courage in a predatory neighborhood.',
        effects: { health: +5, sanity: +5, rep: +4 },
        meritAdd: 6,
        flagsAdd: ['child_blade_found', 'EarlySwordAptitude']
      },
      {
        labelVi: 'Đem bán cho một lò rèn Workshop ở đầu hẻm lấy 10 Ahn',
        labelEn: 'Sell it to a local alley forge master for 10 Ahn',
        resultVi: 'Người thợ rèn gật gù khen mắt nhìn của bạn, trả đủ 10 Ahn và cho bạn một đĩa bánh bao nóng hổi. Bạn giúp gia đình no bụng suốt cả tuần.',
        resultEn: 'The smith nodded at your keen eye, handing over 10 Ahn and hot dumplings. You kept the household fed for a week.',
        effects: { wealth: +10, sanity: +6 },
        meritAdd: 5,
        flagsAdd: ['child_blade_found']
      }
    ]
  },
  {
    id: 'child_middle_brother_protection',
    age: [10, 16],
    major: true,
    weight: 55,
    forbids: ['child_middle_favor_done'],
    vi: "[Người của Middle] Đám cướp giật giày bạn. Một người áo tím thêu xích bước tới, đánh ngã tên cầm đầu. \"Đứng dậy, nhóc. Ở đây phải biết đấm trả.\" Ông nhìn bạn chờ phản ứng.",
    en: '[Shadow of a Middle Big Brother] When muggers corner you for your shoes, a man in a purple chained coat strolls up. With a single backhand, he sends the ringleader flying into the bin. He glares at you: "Stand up, kid. In this alley, if you don’t hit back, you get eaten."',
    choices: [
      {
        labelVi: 'Lau máu trên mũi, xin ông ta chỉ dạy cách đấm bốc',
        labelEn: 'Wipe blood from your nose, asking him to teach you to box',
        resultVi: 'Người đại ca cười lớn vỗ vai bạn đau điếng. Ông ta chỉ cho bạn thế thủ cơ bản của Middle và cho phép bạn nhắc tên ông ta khi gặp rắc rối ở khu phố này.',
        resultEn: 'The Big Brother laughed, clapping your shoulder hard. He demonstrated the Middle’s defensive guard and gave you leave to speak his name in these alleys.',
        effects: { health: +8, sanity: +8, rep: +10 },
        meritAdd: 8,
        flagsAdd: ['child_middle_favor_done', 'MiddleSympathy']
      },
      {
        labelVi: 'Cúi đầu cảm ơn lễ phép rồi chạy thật nhanh về nhà',
        labelEn: 'Bow respectfully in thanks and sprint straight home',
        resultVi: 'Bạn giữ an toàn cho bản thân và tránh bị cuốn vào các ân oán giang hồ của các Syndicate ngón tay.',
        resultEn: 'You stayed safe and avoided entangling yourself early in syndicate turf wars.',
        effects: { sanity: +4 },
        flagsAdd: ['child_middle_favor_done']
      }
    ]
  }
];

// ============================================================================
// WHAT COMES BACK, consequences planted by earlier choices, run by the Loom
// ============================================================================

import { THREAD_CONSEQUENCES } from './narrative/causalThreads.js';
import { EXPANSION_CONSEQUENCE_EVENTS } from './eventsNpcAndWorldExpansion.js';

export const CONSEQUENCE_EVENTS = [
  {
    id: 'csq_saved_neighbor_gift',
    major: true,
    isCausalCallback: true,
    vi: "[Ông Kang trở lại] Bảy năm sau đêm 3:13, ông Kang gõ cửa nhà bạn. Cánh tay đã mất; cơn ho cũng nặng hơn trước. Ông đặt xuống bàn lưỡi đao răng cưa và cuốn sổ liên lạc Fixer. \"Năm ấy cháu cho chú thêm thời gian. Giờ chú đưa lại thứ còn dùng được.\"",
    en: '[Old Kang returns] Old Kang, the one-armed neighbor you dragged inside that 3:13 night, knocked on your door. He was coughing blood and knew he wouldn’t see the winter out. He brought his serrated blade, and a notebook of names he used to work with.',
    choices: [
      {
        labelVi: 'Nhận lấy, và ở lại với ông đến cuối',
        labelEn: 'Take them, and stay with him to the end',
        resultVi: '"Ít ra tao chết trên giường," ông nói. Ông mất trước khi trời sáng. Cuốn sổ có những cái tên mà sau này mở ra cho bạn nhiều cánh cửa.',
        resultEn: '“At least I die in a bed,” he said. He was gone before dawn. The notebook held names that would open a lot of doors for you.',
        effects: { health: +6, sanity: -4, wealth: +12, network: +12, rep: +10, resonance: +8 },
        flagsAdd: ['고급장비'],
        meritAdd: 16
      }
    ]
  },
  {
    id: 'csq_bread_victim_revenge',
    major: true,
    isCausalCallback: true,
    vi: "[Đứa trẻ ở cống] Một sợi dây thép siết cổ bạn trong kho hàng tối. Kẻ cầm dây chỉ còn một mắt; vết sẹo mổ chạy dọc sườn. Bạn nhận ra đứa trẻ sống sót ở đường cống năm ấy. \"Tám Ahn từ lũ Rat có đáng không?\"",
    en: '[The one who survived] A steel wire tightened around your throat from behind. The person who stepped in front of you had one empty eye socket and a long scar along their side. You knew them: the only child who survived that night in the drain.\n“Remember me? I remember you.”',
    choices: [
      {
        labelVi: 'Chống trả',
        labelEn: 'Fight back',
        outcomes: [
          {
            w: 55,
            resultVi: 'Sợi dây cắt sâu vào cổ bạn, nhưng bạn vẫn với tới được. Khi mọi chuyện xong, bạn ngồi bên cạnh cái xác rất lâu. Hai người từng ngủ chung một đường cống.',
            resultEn: 'The wire cut deep into your neck, but you still reached them. When it was over you sat beside the body a long time. The two of you had once slept in the same drain.',
            effects: { health: -12, sanity: -6, rep: +12, resonance: +10 },
            scarsAdd: ['Vết dây thép quanh cổ'],
            meritAdd: 14
          },
          {
            w: 45,
            resultVi: 'Họ đè bạn xuống. Họ lấy đi một con mắt của bạn, chậm rãi, rồi lấy hết tiền của bạn, rồi bỏ đi. "Giờ thì mình giống nhau."',
            resultEn: 'They held you down. They took one of your eyes, slowly, then all your money, then left. “Now we match.”',
            effects: { health: -14, wealth: -10, sanity: -10, resonance: +14 },
            scarsAdd: ['Con mắt trả cho đêm ấy']
          }
        ]
      },
      {
        labelVi: 'Đưa họ 18 Ahn và một ngón tay của bạn',
        labelEn: 'Give them 18 Ahn and one of your fingers',
        resultVi: 'Họ nhận cả hai. Trước khi đi, họ nói: "Thế này chưa đủ. Nhưng tao mệt rồi."',
        resultEn: 'They took both. Before leaving they said: “It isn’t enough. But I’m tired.”',
        effects: { health: -8, wealth: -10, sanity: -6, heat: -8 },
        scarsAdd: ['Ngón tay trả nợ']
      }
    ]
  },
  {
    id: 'csq_parent_historic_passing',
    age: [1, 99],
    major: true,
    isCausalCallback: true,
    vi: '[Ngày {parentName} ngã xuống] Năm bạn {age} tuổi, người bảo hộ lớn nhất đời bạn đã không trở về. {parentName} qua đời vì {parentDeath}. Trước khi trút hơi thở cuối, người ấy gửi lại cho bạn 「{relic}」.\nBạn đứng trong căn phòng vắng lặng, nhận ra từ nay bạn phải tự mình bước đi giữa The City.',
    en: '[The Fall of {parentName}] When you reached age {age}, your greatest protector never returned. {parentName} fell due to {parentDeath}. With their last breath, they entrusted you with 「{relic}」.\nYou stand in the empty room, realizing from this day forward, you walk The City alone.',
    choices: [
      {
        labelVi: 'Nắm chặt di vật, thề tiếp nối con đường của {parentName}',
        labelEn: 'Grip the relic, swearing to carry on {parentName}’s path',
        resultVi: 'Bạn lau khô nước mắt, quấn chặt di vật vào người. Danh tiếng và sự kiên cường của {parentName} hòa vào dòng máu bạn.',
        resultEn: 'You wiped away your tears and bound the relic close. {parentName}’s name and resolve became one with your blood.',
        effects: { sanity: +15, rep: +15, network: +10 },
        scarsAdd: ['Người tiếp bước {parentName}'],
        meritAdd: 15
      },
      {
        labelVi: 'Khắc cốt ghi tâm mối thù, thề bắt kẻ thủ ác phải trả giá',
        labelEn: 'Inscribe the vengeance in your marrow, swearing retribution',
        resultVi: 'Đôi mắt bạn ánh lên ngọn lửa căm hờn. Ký ức về {parentName} hóa thành động lực sinh tồn tàn nhẫn nhất.',
        resultEn: 'A bitter fire ignited behind your eyes. Memories of {parentName} became your most ruthless weapon for survival.',
        effects: { sanity: -10, heat: +20, resonance: +18 },
        scarsAdd: ['Mối Thù Của {parentName}'],
        meritAdd: 15
      }
    ]
  },
  {
    id: 'csq_parent_old_comrade',
    major: true,
    isCausalCallback: true,
    vi: '[Người từng đi cùng {parentName}] Trong một quán rượu dưới hầm, một Fixer cụt chân ngồi xe lăn túm lấy cổ tay bạn khi thấy 「{relic}」.\n"Cái này... mày mang kỷ vật của {parentName}." Ông ta kể: năm đó, {parentName} đã đứng chắn trước một băng đạn của Thumb để ông ta bò ra được.',
    en: '[Someone who rode with {parentName}] In a basement bar, a legless Fixer in a wheelchair grabbed your wrist when he saw 「{relic}」.\n“This... you carry {parentName}’s keepsake.” He told you: that night, {parentName} stood in front of a Thumb magazine so he could crawl out.',
    choices: [
      {
        labelVi: 'Nhờ ông dạy bạn những gì {parentName} từng biết',
        labelEn: 'Ask him to teach you what {parentName} knew',
        resultVi: 'Ông dạy bạn mười bốn ngày, không nương tay. Đến ngày cuối, bạn cảm thấy một thứ gì đó cháy lên quanh lưỡi vũ khí khi bạn giận. Ông gọi nó là Shin.',
        resultEn: 'He taught you for fourteen days without mercy. By the last day you felt something burn around the blade when you were angry. He called it Shin.',
        effects: { health: -10, sanity: +10, network: +22, rep: +18, resonance: +16 },
        flagsAdd: ['ShinAwakened'],
        meritAdd: 20
      }
    ]
  },
  {
    id: 'csq_index_recruitment_call',
    major: true,
    isCausalCallback: true,
    vi: '[Lời triệu tập] Bạn tỉnh dậy lúc nửa đêm. Trên gối có một dải băng trắng, gấp gọn. Bên dưới là một Prescript:\n「Người đã đặt chiếc cốc lên bậu cửa sổ năm ấy: hãy khâu mắt ngươi lại trong ba ngày và đến với chúng ta. Nếu không, con phố này sẽ không còn ai.」',
    en: '[The summons] You woke at midnight. On your pillow was a strip of white cloth, folded neatly. Underneath, a Prescript:\n「You who set the glass on the windowsill that year: sew your eyes shut within three days and come to us. If not, this street will have no one left in it.」',
    choices: [
      {
        labelVi: 'Khâu mắt lại, và đi',
        labelEn: 'Sew your eyes shut, and go',
        resultVi: 'Bạn khâu từng mũi bằng tay. Trong bóng tối, bạn bắt đầu nghe được những thứ trước đây không nghe thấy: bước chân ba tầng dưới, tiếng ai đó nói dối. Một Proselyte nắm tay bạn dẫn đi.',
        resultEn: 'You made each stitch by hand. In the dark you began to hear things you never heard before: footsteps three floors down, someone telling a lie. A Proselyte took your hand and led you away.',
        setJob: 'Syndicate',
        setFinger: 'Index',
        setFingerRank: 1,
        effects: { health: -15, sanity: -12, rep: +18, network: +16, resonance: +20 },
        recordsAdd: ['finger_initiate'],
        scarsAdd: ['Đôi mắt đã khâu'],
        meritAdd: 18
      },
      {
        labelVi: 'Gài bẫy chờ chúng đến',
        labelEn: 'Set a trap and wait for them',
        resultVi: 'Ba ngày sau, hai Proselyte bước qua cửa phòng bạn và không bước ra nữa. Mảnh kim loại găm đầy lưng bạn. Bạn rời khỏi khu phố qua đường cống, và từ đó The Index tìm bạn.',
        resultEn: 'Three days later, two Proselytes walked through your door and never walked out. Shrapnel filled your back. You left the neighborhood through the sewers, and the Index has been looking for you since.',
        effects: { health: -14, sanity: -8, rep: +15, heat: +20, resonance: +12 },
        scarsAdd: ['Mảnh kim loại trong lưng']
      }
    ]
  },
  {
    id: 'csq_lost_contraband_collector',
    major: true,
    isCausalCallback: true,
    vi: '[Đến lúc trả] Ba người của Syndicate năm xưa tìm ra chỗ bạn ở. Một người đặt lên bàn chiếc kìm cắt xương. "Kiện hàng của J Corp mày làm mất. Tính cả lãi là 35 Ahn. Hoặc bốn ngón tay phải."',
    en: '[Time to pay] Three Syndicate men from years ago found where you live. One set a pair of bone cutters on the table. “The J Corp package you lost. With interest, 35 Ahn. Or four fingers off your right hand.”',
    choices: [
      {
        labelVi: 'Trả 35 Ahn',
        labelEn: 'Pay the 35 Ahn',
        resultVi: 'Tiền dành dụm của bạn biến mất trong một buổi chiều. Bàn tay cầm vũ khí của bạn vẫn còn đủ ngón.',
        resultEn: 'Your savings were gone in an afternoon. Your weapon hand still has all its fingers.',
        effects: { wealth: -35, heat: -20, sanity: -5 }
      },
      {
        labelVi: 'Chộp lấy chiếc kìm trước',
        labelEn: 'Grab the cutters first',
        resultVi: 'Căn phòng quá chật cho bốn người đánh nhau. Khi xong, chỉ còn bạn đứng được. Bạn mất cả đêm để lau sàn.',
        resultEn: 'The room was too small for four people to fight in. When it was over, only you were standing. It took you all night to clean the floor.',
        effects: { health: -28, sanity: -12, rep: +16, heat: +22, resonance: +14 },
        meritAdd: 14
      }
    ]
  },
  {
    id: 'csq_middle_ambush_adult',
    major: true,
    isCausalCallback: true,
    vi: '[Book of Vengeance] Cả con phố bỗng im lặng. Tiếng xích kéo trên mặt đường. Một Big Brother của The Middle bước ra, hình xăm tím trên tay sáng lên trong bóng tối, sau lưng là mười Little Brother.\n"Chương bảy, điều bốn mươi hai. Người làm nhục The Middle sẽ bị bẻ gãy tay chân trước, cột sống sau."',
    en: '[Book of Vengeance] The whole street went quiet. Chains dragged on the asphalt. A Big Brother of the Middle stepped forward, the purple tattoos on his arms glowing in the dark, ten Little Brothers behind him.\n“Chapter seven, clause forty-two. Whoever shames the Middle has their limbs broken first, the spine after.”',
    choices: [
      {
        labelVi: 'Đánh đến cùng',
        labelEn: 'Fight to the end',
        outcomes: [
          {
            w: 50,
            resultVi: 'Hắn đánh gãy ba xương sườn của bạn ngay cú đầu tiên. Bạn vẫn đứng. Khi sợi xích của hắn đứt, những Little Brother lùi lại. Từ hôm đó, cả khu biết tên bạn.',
            resultEn: 'He broke three of your ribs with the first blow. You stayed up. When his chain snapped, the Little Brothers stepped back. From that day, the whole district knew your name.',
            effects: { health: -24, sanity: -10, rep: +22, heat: -20, resonance: +18 },
            scarsAdd: ['Người làm đứt xích của The Middle'],
            meritAdd: 30
          },
          {
            w: 50,
            resultVi: 'Cú đấm thứ hai làm vỡ xương vai bạn. Chúng bẻ chân bạn, lấy hết những gì bạn có, và bỏ đi khi nghĩ bạn đã chết. Chúng nghĩ sai, nhưng chỉ suýt soát.',
            resultEn: 'The second blow shattered your shoulder. They broke your leg, took everything you had, and left when they thought you were dead. They were wrong, but only just.',
            effects: { health: -38, sanity: -20, wealth: -18, resonance: +24 },
            scarsAdd: ['Bả vai vỡ dưới nắm đấm']
          }
        ]
      }
    ]
  },
  {
    id: 'csq_hana_corruption_audit',
    major: true,
    isCausalCallback: true,
    vi: '[Thanh tra của Öufi] Người của Öufi Association và Seven Association phong tỏa văn phòng bạn. Bản báo cáo giả năm ấy đã để một Abnormality ăn mất cả một dãy nhà. Theo hợp đồng, hình phạt là cái chết, thi hành tại chỗ.',
    en: '[Öufi’s auditors] Öufi and Seven Association people sealed off your office. The false report you filed years ago let an Abnormality devour an entire block. Under the contract, the penalty is death, carried out on the spot.',
    choices: [
      {
        labelVi: 'Đổ tội cho người cấp dưới tin bạn nhất',
        labelEn: 'Pin it on the subordinate who trusts you most',
        resultVi: 'Người đó nhìn bạn, không hiểu chuyện gì đang xảy ra, cho đến khi Öufi đọc tên họ. Thanh tra đóng dấu "Đã giải quyết" và rời đi. Bạn giữ được chức. Bạn không còn nhìn vào gương lâu được nữa.',
        resultEn: 'They looked at you, not understanding, until Öufi read their name. The auditor stamped “Resolved” and left. You kept your post. You can no longer look in a mirror for long.',
        effects: { wealth: -18, sanity: -22, rep: +5, resonance: +22 },
        scarsAdd: ['Người cấp dưới đã chết thay']
      },
      {
        labelVi: 'Phá cửa sổ mà chạy',
        labelEn: 'Break the window and run',
        resultVi: 'Lưỡi kích của Öufi rạch ngang lưng bạn khi bạn nhảy xuống nóc một đoàn tàu đang chạy qua. Bạn sống. Từ giờ bạn là kẻ bị truy nã.',
        resultEn: 'An Öufi halberd opened your back as you jumped onto the roof of a passing train. You lived. From now on you are wanted.',
        effects: { health: -28, wealth: -18, rep: -18, heat: +25, resonance: +16 },
        scarsAdd: ['Vết kích của Öufi'],
        meritAdd: -25
      }
    ]
  },
  {
    id: 'csq_warp_survivor_debt',
    major: true,
    isCausalCallback: true,
    vi: "[Mẩu thịt toa cuối] Thanh tra W Corp tìm thấy thứ bạn mang khỏi tàu WARP. Họ đặt chiếc lọ lên bàn: \"Trả phí vi phạm, hoặc đi dọn chuyến tàu sau.\" Cửa đã có người canh.",
    en: '[Secret of the last car] A high-ranking W Corp inspector and a T Corp auditor cordoned off your quarters. On the table was the glass jar you once held from the last car.\n“WARP trains do not lose passengers. This tissue violates W Corp’s exclusive patent. Pay 42 Ahn in confidential fines, or serve as an uncompensated cleaner on the next departure.”',
    choices: [
      {
        labelVi: 'Nộp 42 Ahn để khép lại vụ việc',
        labelEn: 'Pay 42 Ahn to close the case',
        resultVi: 'Viên thanh tra đóng dấu đỏ lên hồ sơ rồi tiêu hủy cái lọ. Bạn mất sạch tiền dành dụm, nhưng không phải bước lên toa tàu đó lần thứ hai.',
        resultEn: 'The inspector stamped the file in red and incinerated the jar. Your savings were cleared out, but you won’t have to step onto that car a second time.',
        effects: { wealth: -42, sanity: +5, taboo: -2 }
      },
      {
        labelVi: 'Rút vũ khí, phá vòng vây tẩu thoát vào đường ngầm',
        labelEn: 'Draw your weapon, breach the perimeter, and flee into the underground',
        resultVi: 'Lưỡi cưa của W Corp Cleaner xé toạc bả vai bạn trước khi bạn lao xuống nắp cống. Bạn sống sót giữa bóng tối Backstreets, với một vết thương không bao giờ ngừng đau khi trời lạnh.',
        resultEn: 'A W Corp Cleaner’s rip-saw tore your shoulder before you dropped through the sewer grate. You survived in the dark Backstreets, carrying a wound that aches whenever the cold sets in.',
        effects: { health: -38, rep: +20, heat: +35, resonance: +20 },
        scarsAdd: ['Vết cưa của W Corp Cleaner'],
        meritAdd: 18
      }
    ]
  },
  {
    id: 'csq_ncorp_heretic_hunt',
    major: true,
    isCausalCallback: true,
    vi: "[Đứa trẻ trở lại] Inquisitor N Corp dồn bạn vào hẻm. Đứa trẻ bạn từng cứu nhảy xuống giữa hai bên, giờ là Fixer mang mắt và tay máy. Người ấy nâng cưa xích: \"Lần này để tôi nhổ đinh cho bạn.\"",
    en: '[The child with the prosthetic eye returns] Three N Corp Inquisitors backed you into a dead end, hammers and nails gleaming in the dark. As the first nail neared your shoulder, a figure dropped from the rooftops with a massive Workshop chainsaw blade, the orphan you cut loose years ago, now a Grade 3 Fixer with gleaming chrome eyes and arms.\n“This time, it’s my turn to pull the nails for you!”',
    choices: [
      {
        labelVi: 'Kề vai chiến đấu, cùng nhau đập tan toán Inquisitor',
        labelEn: 'Fight shoulder to shoulder and shatter the Inquisitor squad',
        resultVi: 'Hai lưỡi vũ khí phối hợp hoàn hảo. Ba Inquisitor ngã gục. Người ấy lau máu trên lưỡi cưa, cười lớn và đưa cho bạn một khẩu súng ngắn Workshop đặc chế. "Chúng ta là gia đình."',
        resultEn: 'Your weapons moved in perfect rhythm. The three Inquisitors fell. They wiped the blood from the saw, laughed aloud, and handed you a custom Workshop sidearm. “We are family now.”',
        effects: { health: -14, sanity: +18, rep: +28, network: +24, resonance: +15 },
        flagsAdd: ['고급장비'],
        npcAdd: { role: 'partner', bond: 85, traitVi: 'Đứa trẻ mang mắt nhân tạo bạn từng cứu, nay là Fixer thiện chiến' },
        meritAdd: 28
      }
    ]
  },
  {
    id: 'csq_bloodfiend_banquet_call',
    major: true,
    isCausalCallback: true,
    vi: "[Lời mời Bloodfiend] Lá thư sáp đỏ của Elder Bloodfiend nằm trên gối bạn. Đêm nay, hắn đòi bạn mang một người sống đến hầm rượu District 23. Nếu không, chiếc ly trên bàn tiệc sẽ nhận máu bạn.",
    en: '[The Bloodfiend’s Banquet] A red wax envelope lay on your pillow at midnight. The Elder Bloodfiend who fed you her blood summoned you to an ancient cellar in District 23.\n“Your thirst has ripened. Tonight, you must present a living soul to the table, or your own blood will fill this chalice.”',
    choices: [
      {
        labelVi: 'Mang một kẻ săn tiền thưởng bất lương đến thế chỗ',
        labelEn: 'Deliver a corrupt bounty hunter in your place',
        resultVi: 'Các Bloodfiend vỗ tay khen ngợi sự tàn nhẫn của bạn. Bạn được ban thêm huyết thanh cổ xưa, làm cơ thể bạn bền bỉ như đá, nhưng đêm nào bạn cũng nghe tiếng gào của nạn nhân.',
        resultEn: 'The Bloodfiends applauded your ruthlessness. You were granted ancient blood serum, hardening your flesh like stone, but every night you hear the victim’s screams.',
        effects: { health: +20, sanity: -25, rep: +22, resonance: +25 },
        scarsAdd: ['Kẻ dự tiệc của Bloodfiend'],
        meritAdd: 22
      },
      {
        labelVi: 'Tẩm dầu cháy lên lưỡi kiếm và chém nát bàn tiệc',
        labelEn: 'Coat your blade in oil, set it ablaze, and shatter the banquet table',
        resultVi: 'Lửa bùng lên thiêu rụi hầm rượu. Elder thét lên khi ngọn lửa liếm vào váy bà ta. Bạn thoát ra với cơ thể đầy vết cắn và bỏng nặng, nhưng linh hồn bạn đã tự do khỏi sự kìm kẹp của dòng máu quỷ.',
        resultEn: 'Fire engulfed the cellar. The Elder shrieked as flames consumed her gown. You tore away with severe bites and burns, but your soul broke free from the demon blood’s grip.',
        effects: { health: -38, sanity: +22, rep: +32, resonance: +18 },
        scarsAdd: ['Lửa thiêu đêm tiệc máu'],
        meritAdd: 34
      }
    ]
  },
  {
    id: 'csq_blade_lineage_duel',
    major: true,
    isCausalCallback: true,
    vi: "[Kiếm dưới mưa] Bamboo-hatted Kim chặn bạn trên cầu. Ông nhớ lần bạn đánh bại đệ tử mình. \"Rút kiếm. Ta muốn xem ngươi đã học được gì từ trận ấy.\" Nước mưa chảy dọc sống đao.",
    en: '[To Claim Their Bones: Returning the Blade] On a rain-soaked bridge, Kim, the Sasu of the Blade Lineage with his straw hat and tattered bamboo coat, stood across your path. His katana leveled at your chest.\n“You are the one who yielded flesh and claimed my disciple’s bones that year. Draw your sword. Show me if your bones are worthy of standing in this rain.”',
    choices: [
      {
        labelVi: 'Dồn hết ý chí vào thế thủ To Claim Their Bones',
        labelEn: 'Channel all your will into the stance To Claim Their Bones',
        outcomes: [
          {
            w: 55,
            resultVi: 'Nhát chém của Kim cắt toạc ngực bạn, nhưng bạn không lùi nửa bước; mũi kiếm của bạn dừng lại ngay yết hầu ông. Kim mỉm cười, tra kiếm vào vỏ: "Xương rất tốt." Ông truyền lại cho bạn bí kíp thất truyền của Blade Lineage.',
            resultEn: 'Kim’s slash opened your chest, but you did not give half a step; your blade halted right at his throat. Kim smiled, sheathing his sword: “Good bones.” He bestowed upon you the lost lineage manuscript.',
            effects: { health: -28, sanity: +12, rep: +38, resonance: +26 },
            flagsAdd: ['BladeLineageMastery'],
            scarsAdd: ['Vết kiếm của Kim'],
            meritAdd: 40
          },
          {
            w: 45,
            resultVi: 'Kiếm khí hất văng vũ khí của bạn xuống sông. Kim nhìn bạn nằm trong bùn, thở dài: "Chưa đủ." Ông tha mạng cho bạn, nhưng lấy đi một ngón tay cầm kiếm.',
            resultEn: 'His sword wind knocked your blade into the river. Kim looked down at you in the mud and sighed: “Not enough.” He spared your life, but took one sword finger.',
            effects: { health: -45, sanity: -20, rep: -10, resonance: +20 },
            scarsAdd: ['Ngón tay rơi trên cầu gỗ']
          }
        ]
      }
    ]
  },
  {
    id: 'csq_taboo_workshop_raid',
    major: true,
    isCausalCallback: true,
    vi: '[Tres siết lại] Một người của Tres đến cùng một Beholder của B Corp. Khẩu súng xuyên tường bạn từng nhờ người thợ rèn quen chế tạo vừa xuất hiện trong một vụ ám sát một Giám đốc Wing. Họ không hỏi ai đã làm ra nó. Họ hỏi ai đã đặt nó.',
    en: '[Tres closes in] A Tres Association inspector arrives with a B Corp Beholder. The wall-piercing gun you once had your regular smith build has just surfaced in the assassination of a Wing Director. They do not ask who made it. They ask who ordered it.',
    choices: [
      {
        labelVi: 'Nộp 40 Ahn và khai bạn chỉ là người trung gian',
        labelEn: 'Pay 40 Ahn and say you were only the go-between',
        resultVi: 'Người của Tres ghi tên bạn vào dòng "bên trung gian" và đóng dấu "Đã giải quyết". Bạn mất hết tiền, giữ lại được mạng, và người thợ rèn quen từ nay không nhận đơn của bạn nữa.',
        resultEn: 'Tres writes your name on the "intermediary" line and stamps it Resolved. You lose your money, keep your life, and your regular smith stops taking your orders.',
        costAhn: 40,
        effects: { wealth: -40, sanity: -12, taboo: -2, network: -6 }
      },
      {
        labelVi: 'Bỏ chạy qua cống ngầm, để người thợ rèn lại',
        labelEn: 'Run through the drains and leave the smith behind',
        resultVi: 'Bạn thoát qua cống với vài vết bỏng nhẹ. Hôm sau nghe tin xưởng bị niêm phong, và người thợ rèn quen không có mặt khi họ vào. Hana ghi tên bạn vào danh sách theo dõi.',
        resultEn: 'You escape through the drains with minor burns. The next day you hear the shop has been sealed, and the smith was not there when they entered. Hana adds your name to a watch list.',
        effects: { health: -18, heat: 32, rep: -10, resonance: 12 },
        scarsAdd: ['Kẻ đặt khẩu súng phạm Taboo']
      }
    ]
  },
  {
    id: 'csq_thumb_capo_trial',
    major: true,
    isCausalCallback: true,
    vi: "[Lệnh của Sottocapo] The Thumb đưa bạn khẩu súng mạ vàng và danh sách một băng Syndicate phạm lễ nghi. \"Xử lý toàn bộ. Sottocapo sẽ biết ngươi có làm đúng không.\" Hai Unterkapo đứng đợi bên ngoài.",
    en: '[The Sottocapo’s Mandate] Two Thumb Unterkapos stood at your door, bearing a brocade case with a gilded firearm and a target list.\n“The Sottocapo remembers your loyalty that year. Today, you personally purge a syndicate crew that dared violate etiquette in District 8. Leave none breathing.”',
    choices: [
      {
        labelVi: 'Chấp hành mệnh lệnh với kỷ luật sắt thép của The Thumb',
        labelEn: 'Execute the order with iron Thumb discipline',
        resultVi: 'Bạn nộp báo cáo cùng số vỏ đạn khớp sổ cấp phát. Sottocapo trả tiền công và giữ bản ghi về cách bạn chấp hành. Chuyện thăng cấp vẫn phải qua khảo hạch riêng.',
        resultEn: 'You filed your report with the spent casings accounted for. The Sottocapo paid you and kept the record of your discipline. Promotion still required its own trial.',
        effects: { wealth: +12, rep: +8, sanity: -5 },
        meritAdd: 6
      }
    ]
  },
  {
    id: 'csq_kcorp_ampule_blackmail',
    major: true,
    isCausalCallback: true,
    vi: '[Bí mật thứ biết khóc] Một kẻ môi giới chợ đen ném lên bàn bạn bức ảnh chụp vũng dịch xanh của người đồng nghiệp năm ấy.\n"Chúng tao biết những ống HP Ampoule thật của mày từ đâu ra. Cung cấp 35 Ahn hoặc mỗi tháng giao 2 ống thuốc, nếu không ngày mai Wing sẽ nhận được cuộn phim này."',
    en: '[Secret of the Weeping Eye] A black-market broker slammed a photo on your table showing the green puddle of your colleague years ago.\n“We know where your genuine HP Ampoules came from. Hand over 35 Ahn or deliver 2 ampoules every month, or tomorrow the Wing gets this film.”',
    choices: [
      {
        labelVi: 'Trả 35 Ahn để mua lại cuộn phim và sự im lặng',
        labelEn: 'Pay 35 Ahn to buy the film and their silence',
        resultVi: 'Bạn châm lửa đốt tấm ảnh ngay trước mặt hắn. Hắn cười khẩy nhận tiền rồi biến mất. Bạn tạm thời an toàn, dù biết bí mật ở The City không bao giờ chôn sâu mãi.',
        resultEn: 'You burned the photo right before his eyes. He smirked, took the Ahn, and vanished. You are safe for now, though secrets in the City never stay buried forever.',
        effects: { wealth: -35, sanity: -8 }
      },
      {
        labelVi: 'Giết kẻ tống tiền ngay trong đêm và phi tang xác',
        labelEn: 'Kill the blackmailer that night and dispose of the body',
        resultVi: 'Lưỡi dao của bạn không để lại dấu vết. Bạn mất nửa đêm để lau dọn căn phòng. Không ai tìm thấy cuộn phim nữa, nhưng ánh mắt của hắn lúc hấp hối sẽ theo bạn suốt đời.',
        resultEn: 'Your blade left no trace. You spent half the night scrubbing the room. No one will ever find the film, but his dying gaze will follow you for life.',
        effects: { health: -12, sanity: -22, rep: +18, heat: +20, resonance: +20 },
        scarsAdd: ['Xác kẻ tống tiền trong đêm'],
        meritAdd: 20
      }
    ]
  },

      ...THREAD_CONSEQUENCES,
  ...EXPANSION_CONSEQUENCE_EVENTS
];
