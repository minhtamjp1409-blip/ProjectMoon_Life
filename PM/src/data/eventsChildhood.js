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
    vi: '[Chiếc hộp dưới sàn nhà] Dưới một tấm ván lỏng, bạn tìm thấy chiếc hộp sắt của {parentName}. Bên trong là 「{relic}」, gói trong một tấm áo cũ. Vết máu trên lưỡi đã khô thành màu nâu, và không ai lau nó đi.',
    en: '[The box under the floor] Beneath a loose board you found {parentName}’s iron box. Inside was 「{relic}」, wrapped in an old shirt. The blood on the edge had dried brown, and no one had wiped it off.',
    choices: [
      {
        labelVi: 'Cứa tay, để máu mình chảy lên lưỡi, và thề sẽ tìm ra kẻ đã giết người ấy',
        labelEn: 'Cut your palm, let your blood run on the edge, and swear to find whoever killed them',
        resultVi: 'Máu của bạn chảy vào rãnh trên thân 「{relic}」, lẫn vào vết máu cũ. Bạn mười tuổi, và từ hôm đó bạn thôi chơi với những đứa trẻ khác.',
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
        resultVi: 'Gã thu mua lật món đồ, nhìn vết máu, rồi nhìn bạn. "Của cha mẹ mày à?" Gã trả 12 Ahn và không hỏi thêm. Tối đó bạn ăn no, và không ngủ được.',
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
    vi: '[Món nợ của {parentName}] Hai người của The Middle đứng trong phòng bạn khi bạn đi học về. Một người cầm cuốn Book of Vengeance, mở sẵn đến trang có tên {parentName}.\n"Người này còn nợ chúng tao. Người chết thì con trả. Hôm nay mày trả bằng gì?"',
    en: '[{parentName}’s debt] Two members of the Middle were standing in your room when you came home from school. One held the Book of Vengeance, open to the page with {parentName}’s name.\n“They still owe us. When the debtor dies, the child pays. What are you paying with today?”',
    choices: [
      {
        labelVi: 'Đưa hết số Ahn bạn có, và để chúng lấy phần còn lại bằng dao',
        labelEn: 'Hand over every Ahn you have, and let them take the rest with a knife',
        resultVi: 'Tên lớn tuổi hơn đâm một nhát qua đùi bạn, gọn và không vội, như đóng dấu. Hắn lấy máu của bạn gạch dòng tên {parentName} rồi gập sổ lại. "Xong."',
        resultEn: 'The older one put a knife through your thigh, neat and unhurried, like stamping a form. He used your blood to strike out {parentName}’s line and closed the book. “Settled.”',
        effects: { health: -20, wealth: -12, sanity: -10, heat: -20, resonance: +12 },
        scarsAdd: ['Vết dao trả nợ']
      },
      {
        labelVi: 'Hất nồi nước sôi trên bếp vào mặt chúng rồi nhảy qua cửa sổ',
        labelEn: 'Throw the boiling pot from the stove in their faces and jump out the window',
        resultVi: 'Bạn nghe tiếng hét sau lưng khi rơi xuống mái tôn tầng dưới, gãy một xương sườn. Đến tối, tên bạn đã được viết vào Book of Vengeance bằng mực đỏ, ngay dưới tên {parentName}.',
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
    vi: '[Kỳ kiểm tra của Wing] Năm năm tuổi, mọi đứa trẻ Feather trong Nest đều được đưa vào một căn phòng trắng để đo "độ tương thích với Singularity".\nBác sĩ cho cha mẹ bạn hai lựa chọn: một mũi tiêm vào cột sống để điểm số đẹp hơn, hoặc để bạn làm bài như bình thường và chấp nhận kết quả.',
    en: '[The Wing’s screening] At five, every Feather child in the Nest was taken into a white room to measure their “Singularity compatibility.”\nThe doctor gave your parents two options: an injection into the spine for a better score, or let you sit the test as you are and accept the result.',
    choices: [
      {
        labelVi: 'Nhận mũi tiêm',
        labelEn: 'Take the injection',
        resultVi: 'Bạn không nhớ cơn đau, chỉ nhớ mình run suốt ba ngày sau đó. Kết quả xếp loại "Xuất sắc". Cha bạn đóng khung tờ giấy treo ở phòng khách.',
        resultEn: 'You don’t remember the pain, only that you shook for three days afterward. The result read “Excellent.” Your father framed it in the living room.',
        effects: { health: -10, sanity: -8, rep: +10, network: +12, resonance: +8 },
        flagsAdd: ['ThượngLưu'],
        scarsAdd: ['Vết kim trên cột sống']
      },
      {
        labelVi: 'Làm bài như bình thường',
        labelEn: 'Sit the test as you are',
        resultVi: 'Bạn đạt mức "Đạt yêu cầu". Bà nội không nói gì cả bữa tối, và không ai dám hỏi vì sao.',
        resultEn: 'You scored “Satisfactory.” Your grandmother said nothing all through dinner, and no one dared ask why.',
        effects: { sanity: +6, health: +4, rep: -3 }
      }
    ]
  },
  {
    id: 'ch_sweeper_night_313',
    age: [5, 10],
    major: true,
    weight: 6,
    requires: ['Backstreets'],
    forbids: ['Nest', 'Outskirts'],
    vi: '[3 giờ 13 phút] Còi đã tắt. Ngoài đường, Sweeper đang làm việc của chúng, và có những âm thanh bạn sẽ không quên được.\nRồi có tiếng đập cửa. Giọng ông Kang hàng xóm, khàn và gấp: "Mở cửa! Làm ơn, tay tao..."',
    en: '[3:13] The siren had stopped. Out in the street the Sweepers were doing their work, and there were sounds you would never forget.\nThen someone pounded on the door. Old Kang from next door, hoarse and desperate: “Open up! Please, my arm...”',
    choices: [
      {
        labelVi: 'Rút chốt, kéo ông ấy vào',
        labelEn: 'Pull the bolt and drag him in',
        outcomes: [
          {
            w: 65,
            resultVi: 'Bạn kéo được ông Kang vào trong. Một cái móc sắt lướt qua khe cửa trước khi bạn kịp đóng lại, và để lại một đường rách sâu trên vai bạn. Ông Kang mất một cánh tay. Bạn giữ lại được phần còn lại của ông.',
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
            resultVi: 'Khi cánh cửa vừa hé, một vòi phun thò vào. Thứ chất lỏng đó làm da cánh tay bạn bong ra như giấy ướt. Bạn vẫn kéo được ông Kang vào, rồi cả hai nằm trên sàn đến sáng.',
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
        resultVi: 'Tiếng đập cửa ngừng lại sau một phút. Có thứ gì đó ấm chảy qua khe cửa, chạm vào đầu ngón chân bạn. Đến 4 giờ sáng, bậc thềm sạch bong, như chưa từng có ai đứng đó.',
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
    vi: '[Cái bàn trong hẻm cụt] Đi nhặt phế liệu, bạn rẽ nhầm vào một hẻm cụt. Hai Rat đang giữ một đứa trẻ trên mặt bàn sắt, một tên cầm dao, tên kia cầm thùng đá. Đứa trẻ trạc tuổi bạn, và nó đã thôi la.\nTên cầm dao quay lại nhìn bạn.',
    en: '[The table in the dead end] Scavenging for scrap, you turned into the wrong alley. Two Rats held a child down on a metal table, one with a knife, the other with a cooler. The child was about your age, and had stopped screaming.\nThe one with the knife turned to look at you.',
    choices: [
      {
        labelVi: 'Nhặt thanh sắt dưới chân và lao vào',
        labelEn: 'Grab the iron bar at your feet and charge',
        outcomes: [
          {
            w: 55,
            resultVi: 'Bạn đâm trúng cổ hắn trước khi hắn kịp giơ dao. Tên còn lại ôm thùng đá bỏ chạy. Đứa trẻ trên bàn đã chết. Bạn lấy túi tiền của tên Rat, và con dao của hắn, và về nhà mà không kể với ai.',
            resultEn: 'You caught him in the throat before he could raise the knife. The other one ran off with the cooler. The child on the table was already dead. You took the Rat’s purse, and his knife, and went home and told no one.',
            effects: { health: -10, sanity: -10, wealth: +8, rep: +6, resonance: +10 },
            flagsAdd: ['해결사동경'],
            scarsAdd: ['Lần đầu giết người']
          },
          {
            w: 45,
            resultVi: 'Hắn nhanh hơn. Lưỡi dao rạch một đường từ vai xuống ngực bạn. Bạn bò vào thùng rác và nằm im giữa đống rác thối suốt bốn tiếng, cho đến khi chúng bỏ đi.',
            resultEn: 'He was faster. The blade opened a line from your shoulder to your chest. You crawled into a dumpster and lay still in the rot for four hours, until they left.',
            effects: { health: -20, sanity: -14, resonance: +14 },
            scarsAdd: ['Vết dao dọc ngực']
          }
        ]
      },
      {
        labelVi: '"Tôi biết chỗ lũ trẻ khác hay ngủ." Đổi mạng mình lấy chỗ trốn của chúng',
        labelEn: '“I know where the other kids sleep.” Trade their hiding place for your life',
        resultVi: 'Chúng cho bạn 8 Ahn và để bạn đi. Đêm đó có tiếng la từ đường cống nơi lũ trẻ mồ côi trú. Một trong số chúng từng chia cho bạn nửa ổ bánh mì.',
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
    vi: '[Người đứng cuối lớp] Tháng này, bạn đứng cuối bảng xếp hạng bị mất quyền cư trú ngay giữa giờ học. Bảo vệ Wing đưa cả nhà bạn ấy ra cổng Nest trước bữa tối.\nHôm sau, giáo viên đặt lên bàn bạn một ống thuốc không nhãn. "Uống trước kỳ thi. Hơi chảy máu cam một chút thôi."',
    en: '[The bottom of the class] This month, the student ranked last lost their residency in the middle of a lesson. Wing security walked the whole family to the Nest gate before dinner.\nThe next day the teacher set an unlabeled vial on your desk. “Take it before the exam. A little nosebleed, that’s all.”',
    choices: [
      {
        labelVi: 'Uống thuốc',
        labelEn: 'Take the vial',
        resultVi: 'Máu mũi nhỏ xuống tờ bài thi, nhưng tay bạn không dừng lại. Bạn đứng nhất. Người ngồi cạnh bạn đứng cuối, và tháng sau chỗ ngồi đó trống.',
        resultEn: 'Blood dripped from your nose onto the exam paper, but your hand didn’t stop. You came first. The student beside you came last, and next month their seat was empty.',
        effects: { health: -18, sanity: -16, wealth: +15, network: +16, rep: +10, resonance: +12 },
        flagsAdd: ['ThượngLưu'],
        scarsAdd: ['Máu mũi trên bài thi']
      },
      {
        labelVi: 'Đổ ống thuốc vào cốc nước của bạn đứng đầu lớp',
        labelEn: 'Pour the vial into the top student’s water',
        resultVi: 'Bạn ấy ngất ngay giữa phòng thi. Người ta khiêng bạn ấy ra, và bạn bước qua chỗ bạn ấy vừa nằm để lên nhận học bổng của Wing.',
        resultEn: 'They collapsed in the middle of the exam. They were carried out, and you stepped over the spot where they’d lain to accept the Wing’s scholarship.',
        effects: { sanity: -22, wealth: +20, network: +14, heat: +15, resonance: +18 },
        scarsAdd: ['Cốc nước trong phòng thi']
      }
    ]
  },
  {
    id: 'ch_outskirts_ruins_expedition',
    age: [6, 15],
    major: true,
    weight: 9.5,
    requires: ['Outskirts'],
    vi: '[Đường hầm dưới Ruins] Đi tìm nước, bạn thấy một lối xuống Ruins vừa lộ ra sau trận sạt lở. Dưới đó có xác một Fixer của Eight Association, tay vẫn ôm một chiếc hộp kim loại. Có thứ gì đó đang ăn phần dưới của xác.',
    en: '[The shaft under the Ruins] Looking for water, you found a way down into the Ruins, opened up by a landslide. Down there lay a dead Eight Association Fixer, still clutching a metal case. Something was eating the lower half of the body.',
    choices: [
      {
        labelVi: 'Trát bùn lên người cho mất mùi, bò vào lấy chiếc hộp',
        labelEn: 'Smear yourself with mud to hide your scent and crawl in for the case',
        outcomes: [
          {
            w: 60,
            resultVi: 'Con thú không ngẩng lên. Bạn lấy được chiếc hộp và cả thanh đoản kiếm của người chết. Thứ trong hộp đổi được với đoàn thương nhân một bộ đồ nghề mà cả trại chưa ai có.',
            resultEn: 'The beast never looked up. You took the case and the dead man’s short sword. What was inside traded with a caravan for gear no one in the camp had ever owned.',
            effects: { wealth: +24, rep: +12, network: +10, resonance: +12 },
            flagsAdd: ['유물', '고급장비', '해결사동경']
          },
          {
            w: 40,
            resultVi: 'Nó ngửi thấy bạn ở mét cuối cùng. Móng của nó cào ba đường dọc lưng bạn khi bạn ôm hộp lăn xuống khe đá.',
            resultEn: 'It caught your scent in the last meter. Its claws raked three lines down your back as you rolled into a crevice with the case.',
            effects: { health: -28, sanity: -12, wealth: +16, resonance: +16 },
            flagsAdd: ['유물'],
            scarsAdd: ['Ba vết cào trên lưng']
          }
        ]
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
    vi: '[Suất đề cử của gia đình] Gia đình chỉ có một suất đề cử thực tập sinh Wing năm nay. Anh họ bạn tố cáo bạn làm lộ tài liệu của phòng thí nghiệm, và người lớn tin anh ta.\nNhưng bạn có một đoạn ghi âm: chính anh ta thuê người của Shi Association để dọa một giám khảo.',
    en: '[The family’s one nomination] The family has only one Wing internship nomination this year. Your cousin accused you of leaking lab documents, and the adults believed him.\nBut you have a recording: he hired someone from Shi Association to threaten an examiner.',
    choices: [
      {
        labelVi: 'Gửi đoạn ghi âm cho ban thanh tra nội bộ của Wing',
        labelEn: 'Send the recording to the Wing’s internal inspectors',
        resultVi: 'Họ đến bắt anh ta ngay trong đêm, rồi đến lượt cha mẹ anh ta. Bạn nhận suất đề cử. Ở bàn ăn gia đình từ đó, không ai ngồi cạnh bạn.',
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
    vi: '[Prescript] Một Messenger của The Index, mắt bịt băng trắng, đặt vào tay bạn một mảnh giấy:\n「Trước nửa đêm, cắt ngón áp út tay trái của người đầu tiên mỉm cười với ngươi hôm nay. Ngâm nó trong rượu ấm. Đặt lên bậu cửa sổ tầng ba.」\nNgười đầu tiên mỉm cười với bạn sáng nay là bà Hwa, người từng băng vết thương cho bạn mà không lấy tiền.',
    en: '[Prescript] An Index Messenger, eyes bound in white, pressed a slip of paper into your hand:\n「Before midnight, cut off the left ring finger of the first person who smiled at you today. Steep it in warm liquor. Leave it on a third-floor windowsill.」\nThe first person who smiled at you this morning was Mrs. Hwa, who once bandaged your wounds and took no money for it.',
    choices: [
      {
        labelVi: 'Làm theo Prescript',
        labelEn: 'Follow the Prescript',
        resultVi: 'Bà Hwa không la, bà chỉ nhìn bạn. Lúc bạn đặt cái cốc lên bậu cửa sổ, có ai đó trong bóng tối dưới đường cúi đầu chào bạn.',
        resultEn: 'Mrs. Hwa didn’t scream, she only looked at you. When you set the glass on the windowsill, someone in the dark below bowed to you.',
        effects: { sanity: -24, rep: +12, resonance: +20 },
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
        effects: { health: -35, sanity: -15, resonance: +18 },
        scarsAdd: ['Bàn tay thiếu một ngón']
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
    vi: '[Bài kiểm tra cuối] Salvador, một Fixer Grade 4 đã giải nghệ với nửa khuôn mặt bị axit làm biến dạng, nhận dạy bạn. Bài kiểm tra cuối của ông là một cái lồng sắt, một con chó săn bị bỏ đói năm ngày, và một đoạn ống thép.\n"Ra được thì tao dạy tiếp."',
    en: '[The last test] Salvador, a retired Grade 4 Fixer with half his face ruined by acid, agreed to train you. His final test was an iron cage, a hound starved for five days, and a length of steel pipe.\n“Get out, and I keep teaching you.”',
    choices: [
      {
        labelVi: 'Đưa tay trái cho nó cắn, dùng tay phải đâm',
        labelEn: 'Give it your left arm to bite, and strike with your right',
        resultVi: 'Răng nó ngập đến xương. Đoạn ống thép của bạn tìm thấy mắt nó. Salvador mở lồng, ném cho bạn cuộn băng, và lần đầu tiên gọi bạn bằng tên.',
        resultEn: 'Its teeth went to the bone. Your pipe found its eye. Salvador opened the cage, tossed you a roll of bandage, and for the first time called you by name.',
        effects: { health: -24, sanity: -10, rep: +14, network: +12, resonance: +14 },
        flagsAdd: ['해결사동경', '고급장비'],
        npcAdd: { role: 'mentor', nameVi: 'Salvador', nameEn: 'Salvador', bond: 75, traitVi: 'Fixer Grade 4 đã giải nghệ, nửa mặt bị axit, ít khen nhưng không bao giờ bỏ rơi học trò', traitEn: 'retired Grade 4 Fixer, half his face burned by acid, stingy with praise, never abandons a student' },
        scarsAdd: ['Vết răng trên cánh tay trái'],
        meritAdd: 12
      },
      {
        labelVi: 'Bám vào song sắt, xin ông mở cửa',
        labelEn: 'Grab the bars and beg him to open the door',
        resultVi: 'Ông bắn con chó qua song sắt. Rồi ông đá gãy mũi bạn và đuổi bạn ra đường. "Ở ngoài kia không ai mở cửa cho mày đâu."',
        resultEn: 'He shot the dog through the bars. Then he broke your nose with his boot and threw you out. “Out there, no one opens the door for you.”',
        effects: { health: -20, sanity: -20, rep: -12 },
        scarsAdd: ['Cái mũi gãy của Salvador']
      }
    ]
  },

  // --- eighteen ---
  {
    id: 'ad_career_crossroad_18',
    age: [18, 99],
    major: true,
    weight: 999,
    vi: '[Mười tám tuổi] Mười tám tuổi, bạn bắt đầu phải tự trả tiền cho mọi thứ ở The City, kể cả hơi thở. Không ai nuôi bạn nữa. Bạn sẽ kiếm sống bằng cách nào?',
    en: '[Eighteen] At eighteen you start paying for everything in the City yourself, breathing included. No one feeds you anymore. How will you make a living?',
    choices: [
      {
        labelVi: 'Đăng ký làm Fixer Grade 9 với Hana Association',
        labelEn: 'Register with Hana Association as a Grade 9 Fixer',
        resultVi: 'Tấm thẻ Grade 9 nhẹ hơn bạn tưởng. Người phát thẻ nói, giọng đều đều: phần lớn những người nhận thẻ cùng ngày với bạn sẽ không sống đến năm sau.',
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
        resultVi: 'Người ta đưa bạn một khẩu súng và một danh sách những nhà chưa đóng tiền. Không ai hỏi bạn có muốn không.',
        resultEn: 'They handed you a gun and a list of households behind on their payments. No one asked if you wanted to.',
        setJob: 'Syndicate',
        effects: { wealth: +14, rep: +8, heat: +18, sanity: -12 },
        recordsAdd: ['finger_initiate'],
        meritAdd: 6
      },
      {
        labelVi: 'Nộp đơn vào làm cho một Wing',
        labelEn: 'Apply to work for a Wing',
        resultVi: 'Bạn nhận bộ đồng phục Feather và một mã nhân viên. Bản hợp đồng dài 40 trang, và trang 31 nói rằng Wing có quyền với cơ thể bạn "trong trường hợp cần thiết".',
        resultEn: 'You received a Feather uniform and an employee number. The contract ran 40 pages, and page 31 said the company has rights to your body “where necessary.”',
        setJob: 'Wing Employee',
        setWingRank: 1,
        effects: { wealth: +18, network: +12, sanity: -8 },
        flagsAdd: ['Feather', 'Nest'],
        recordsAdd: ['nest_migration']
      },
      {
        labelVi: 'Học nghề ở một Workshop',
        labelEn: 'Apprentice at a Workshop',
        resultVi: 'Ông chủ xưởng đưa bạn một cái búa và chỉ vào lò. "Rèn hỏng một trăm cái thì mới rèn được cái đầu tiên." Ông nói thật.',
        resultEn: 'The workshop owner handed you a hammer and pointed at the forge. “Ruin a hundred and you’ll make your first.” He meant it.',
        setJob: 'Workshop Craftsman',
        effects: { wealth: +12, network: +10, sanity: -4 }
      }
    ]
  }
];

// ============================================================================
// WHAT COMES BACK, consequences planted by earlier choices, run by the Loom
// ============================================================================

export const CONSEQUENCE_EVENTS = [
  {
    id: 'csq_saved_neighbor_gift',
    major: true,
    isCausalCallback: true,
    vi: '[Ông Kang trở lại] Ông Kang, người hàng xóm cụt tay bạn kéo vào nhà đêm 3 giờ 13 năm ấy, gõ cửa nhà bạn. Ông ho ra máu và biết mình không qua được mùa đông. Ông mang theo thanh đao răng cưa của mình, và một cuốn sổ ghi tên những người ông từng làm việc cùng.',
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
    vi: '[Đứa trẻ sống sót] Một sợi dây thép siết lấy cổ bạn từ phía sau. Người bước ra trước mặt bạn có một hốc mắt trống và một vết sẹo dài bên hông. Bạn nhận ra họ: đứa trẻ duy nhất sống sót đêm ở đường cống.\n"Mày còn nhớ tao không? Tao thì nhớ mày."',
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
            effects: { health: -20, sanity: -10, rep: +12, resonance: +14 },
            scarsAdd: ['Vết dây thép quanh cổ'],
            meritAdd: 14
          },
          {
            w: 45,
            resultVi: 'Họ đè bạn xuống. Họ lấy đi một con mắt của bạn, chậm rãi, rồi lấy hết tiền của bạn, rồi bỏ đi. "Giờ thì mình giống nhau."',
            resultEn: 'They held you down. They took one of your eyes, slowly, then all your money, then left. “Now we match.”',
            effects: { health: -32, wealth: -18, sanity: -20, resonance: +20 },
            scarsAdd: ['Con mắt trả cho đêm ấy']
          }
        ]
      },
      {
        labelVi: 'Đưa họ 18 Ahn và một ngón tay của bạn',
        labelEn: 'Give them 18 Ahn and one of your fingers',
        resultVi: 'Họ nhận cả hai. Trước khi đi, họ nói: "Thế này chưa đủ. Nhưng tao mệt rồi."',
        resultEn: 'They took both. Before leaving they said: “It isn’t enough. But I’m tired.”',
        effects: { health: -16, wealth: -18, sanity: -10, heat: -10 },
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
        effects: { health: -38, sanity: -16, rep: +15, heat: +35, resonance: +15 },
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
    id: 'csq_claw_taboo_visitation',
    major: true,
    isCausalCallback: true,
    vi: '[The Claw] Không khí quanh bạn đông cứng lại. Một vết rách màu xanh mở ra giữa căn phòng, và một Claw của C Corp bước ra. Trên cánh tay máy của hắn là ba ống huyết thanh đang sáng: W, R, K.\n"Vi phạm Taboo lần thứ ba. Bắt đầu xử lý."',
    en: '[The Claw] The air around you froze. A blue tear opened in the middle of the room, and a C Corp Claw stepped through. On his mechanical arm three serum vials glowed: W, R, K.\n“Third Taboo violation. Commencing disposal.”',
    choices: [
      {
        labelVi: 'Dồn hết những gì bạn có vào một đòn',
        labelEn: 'Put everything you have into one strike',
        outcomes: [
          {
            w: 32,
            resultVi: 'Một nửa mạn sườn của bạn biến mất trong vết cắt màu xanh. Nhưng đòn của bạn làm vỡ ống huyết thanh K trên tay hắn, và vụ nổ hất bạn xuống một khe sâu dưới Ruins, nơi hắn không theo xuống.',
            resultEn: 'Half your side vanished into the blue cut. But your strike shattered the K vial on his arm, and the blast threw you down a crevice into the Ruins, where he did not follow.',
            effects: { health: -38, sanity: -20, rep: +30, taboo: -3, resonance: +25 },
            recordsAdd: ['defied_the_claw'],
            scarsAdd: ['Nửa mạn sườn mất trong vết cắt xanh'],
            meritAdd: 45
          },
          {
            w: 68,
            resultVi: 'Bạn chỉ kịp thấy một vệt sáng vàng. Rồi không còn gì nữa.',
            resultEn: 'You saw a streak of gold light. Then nothing.',
            deathCauseVi: 'Bị một Claw của C Corp xử lý vì vi phạm Taboo',
            deathCauseEn: 'Disposed of by a C Corp Claw for violating a Taboo'
          }
        ]
      },
      {
        labelVi: 'Nộp mọi thứ vi phạm Taboo, và chấp nhận bị trục xuất',
        labelEn: 'Surrender everything that breaks the Taboo, and accept exile',
        resultVi: 'Hắn lấy đi tất cả những gì bạn sở hữu. Rồi hắn đặt bạn xuống một bãi rác ngoài bức tường, trong The Outskirts, và biến mất mà không nói thêm một lời.',
        resultEn: 'He took everything you owned. Then he set you down on a garbage heap beyond the wall, in The Outskirts, and vanished without another word.',
        setRegion: 'OUTSKIRTS',
        effects: { health: -26, sanity: -16, wealth: -30, rep: -20, taboo: -3, resonance: +18 },
        scarsAdd: ['Bị trục xuất ra The Outskirts']
      }
    ]
  },
  {
    id: 'csq_warp_survivor_debt',
    major: true,
    isCausalCallback: true,
    vi: '[Bí mật từ toa cuối] Một thanh tra cấp cao của W Corp và điều tra viên T Corp phong tỏa chỗ ở của bạn. Trên bàn là chiếc lọ thủy tinh bạn từng giấu mẩu thịt của toa cuối năm ấy.\n"Tàu WARP không làm mất hành khách. Mẩu thịt này đã vi phạm hợp đồng độc quyền của W Corp. Trả 42 Ahn tiền phạt bí mật, hoặc làm người dọn dẹp không công cho chuyến tàu tiếp theo."',
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
    vi: '[Đứa trẻ mang mắt nhân tạo trở lại] Ba Inquisitor của N Corp dồn bạn vào hẻm cụt, búa và đinh sáng loáng trong đêm. Khi mũi đinh đầu tiên sắp đóng vào vai bạn, một bóng người từ mái nhà lao xuống cùng thanh cưa xích Workshop khổng lồ—đó là đứa trẻ mồ côi bạn từng cắt dây cứu năm nào, nay đã là Fixer Grade 3 với đôi mắt và cánh tay mạ crôm sáng rực!\n"Lần này, đến lượt tôi nhổ đinh cho anh/chị!"',
    en: '[The child with the prosthetic eye returns] Three N Corp Inquisitors backed you into a dead end, hammers and nails gleaming in the dark. As the first nail neared your shoulder, a figure dropped from the rooftops with a massive Workshop chainsaw blade—the orphan you cut loose years ago, now a Grade 3 Fixer with gleaming chrome eyes and arms!\n“This time, it’s my turn to pull the nails for you!”',
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
    vi: '[Bữa tiệc của Bloodfiend] Một phong thư sáp đỏ đặt trên gối bạn lúc nửa đêm. Elder Bloodfiend từng cho bạn uống máu năm ấy triệu tập bạn đến một hầm rượu cổ dưới District 23.\n"Cơn khát của ngươi đã chín muồi. Đêm nay, ngươi phải dâng lên bàn tiệc một người sống, hoặc chính máu của ngươi sẽ lấp đầy chiếc ly này."',
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
    vi: '[To Claim Their Bones: Trả lại thanh kiếm] Trên cây cầu gỗ ngập nước mưa, Kim—Sasu của Blade Lineage với chiếc nón lá và áo tơi rách—đứng chắn đường bạn. Thanh katana của ông hạ xuống ngang ngực.\n"Ngươi là người đã nhận thịt và bẻ xương đệ tử ta năm ấy. Rút kiếm ra. Hãy cho ta thấy xương của ngươi có xứng đáng đứng trong mưa."',
    en: '[To Claim Their Bones: Returning the Blade] On a rain-soaked bridge, Kim—the Sasu of the Blade Lineage with his straw hat and tattered bamboo coat—stood across your path. His katana leveled at your chest.\n“You are the one who yielded flesh and claimed my disciple’s bones that year. Draw your sword. Show me if your bones are worthy of standing in this rain.”',
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
    vi: '[Tres và Thợ săn Taboo] Ba Workshop Sweeper của Tres Association phong tỏa xưởng của bạn cùng một Beholder của B Corp. Khẩu súng bắn xuyên tường bạn lén chế tạo năm ấy vừa được dùng để ám sát một Giám đốc Wing.\n"Giao nộp toàn bộ bản vẽ và chịu 40 Ahn tiền phạt, hoặc xưởng này sẽ thành đống tro cùng với ngươi."',
    en: '[Tres and the Taboo Hunters] Three Tres Association Workshop Sweepers sealed off your workshop alongside a B Corp Beholder. The wall-piercing firearm you secretly crafted years ago was just used to assassinate a Wing Director.\n“Surrender all schematics and pay a 40 Ahn penalty, or this workshop burns to ash with you inside.”',
    choices: [
      {
        labelVi: 'Nộp 40 Ahn và đốt toàn bộ bản thiết kế trước mặt họ',
        labelEn: 'Pay 40 Ahn and burn all blueprints in front of them',
        resultVi: 'Ngọn lửa lò rèn nuốt trọn tác phẩm tâm huyết của bạn. Tres đóng dấu "Đã giải quyết" và rời đi. Bạn mất hết tiền, nhưng giữ lại được mạng sống và giấy phép mở xưởng.',
        resultEn: 'The forge flames consumed your life’s masterpiece. Tres stamped “Resolved” and departed. You lost all your wealth, but kept your life and forge license.',
        effects: { wealth: -40, sanity: -15, taboo: -2 }
      },
      {
        labelVi: 'Kích nổ lò rèn, dùng bom khói Workshop phá đường chạy',
        labelEn: 'Overload the forge, deploy smoke bombs, and break out',
        resultVi: 'Vụ nổ thổi bay cả góc phố. Bạn thoát được vào cống ngầm với vài vết bỏng sâu. Từ nay xưởng của bạn là tàn tích, và bạn trở thành một Thợ rèn giang hồ bị truy nã.',
        resultEn: 'The blast blew apart half the block. You escaped through the drains with severe burns. From now on your shop is rubble, and you are a rogue wandering craftsman with a bounty.',
        effects: { health: -32, wealth: -20, rep: +24, heat: +35, resonance: +22 },
        scarsAdd: ['Thợ rèn phạm Taboo'],
        meritAdd: 25
      }
    ]
  },
  {
    id: 'csq_thumb_capo_trial',
    major: true,
    isCausalCallback: true,
    vi: '[Lệnh của Sottocapo] Hai Unterkapo của The Thumb đứng trước cửa phòng bạn, tay cầm tráp gấm chứa một khẩu súng ngắn mạ vàng và một danh sách mục tiêu.\n"Sottocapo nhớ lòng trung thành của ngươi năm xưa. Hôm nay, hãy đích thân trừ khử một băng nhóm Syndicate dám vi phạm lễ nghi ở District 8. Không được để sót một kẻ nào."',
    en: '[The Sottocapo’s Mandate] Two Thumb Unterkapos stood at your door, bearing a brocade case with a gilded firearm and a target list.\n“The Sottocapo remembers your loyalty that year. Today, you personally purge a syndicate crew that dared violate etiquette in District 8. Leave none breathing.”',
    choices: [
      {
        labelVi: 'Chấp hành mệnh lệnh với kỷ luật sắt thép của The Thumb',
        labelEn: 'Execute the order with iron Thumb discipline',
        resultVi: 'Tiếng đạn nổ đều đặn như nhịp đồng hồ. Cả băng nhóm bị thanh trừng gọn gàng. Sottocapo ban tặng bạn huy hiệu Capo danh dự cùng một túi tiền thưởng lớn.',
        resultEn: 'Gunfire rang out methodical as a clock. The entire crew was cleanly purged. The Sottocapo bestowed upon you an honorary Capo insignia and a heavy purse.',
        setFingerRank: 3,
        effects: { wealth: +38, rep: +28, sanity: -18, resonance: +18 },
        scarsAdd: ['Kẻ thi hành lễ nghi của The Thumb'],
        meritAdd: 30
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
  }
];
