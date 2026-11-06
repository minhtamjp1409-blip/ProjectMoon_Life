// ============================================================================
// BACKGROUND OPENING EVENTS (Tuổi 0 - 7)
// Các sự kiện lớn đặc thù theo từng Xuất Thân & Gia Cảnh của nhân vật
// Phản ánh chân thực bối cảnh The City, tạo dấu ấn gameplay và định hình số phận
// ============================================================================

export const BACKGROUND_OPENING_EVENTS = [
  {
    id: 'ev_open_smoke_war_father',
    age: [3, 7],
    major: true,
    weight: 35,
    need: { flags: ['SmokeWarLineage'] },
    vi: "[Cơn ho của cựu binh] Giữa đêm, người cựu binh trong nhà bật dậy tìm chiếc mặt nạ cũ. Họ gọi tên đồng đội từ Smoke War, rồi ho đến mức không nói tiếp được.",
    en: "[The Veteran's Cough] In the night, the veteran in your household sits up searching for an old gas mask. They call out names from the Smoke War, then cough too hard to continue.",
    choices: [
      {
        labelVi: "Ngồi cạnh và giúp họ thở chậm lại",
        labelEn: "Sit beside them and help them slow their breathing",
        resultVi: "Bạn đếm từng nhịp thở cho đến khi cơn ho dịu. Người ấy nhận ra bạn, kéo chăn lên vai bạn rồi nằm xuống.",
        resultEn: "You count each breath until the coughing eases. They recognize you, pull a blanket over your shoulders, and lie back down.",
        effects: { health: +8, sanity: +6, network: +6 },
        flagsAdd: ['HơiThởKhóiBếp']
      },
      {
        labelVi: "Lấy mặt nạ cũ trong hộp kim loại đưa cho họ",
        labelEn: "Take the old mask from its metal box and hand it to them",
        resultVi: "Van thở rít lên. Khi cơn ho qua, người ấy đặt chiếc mặt nạ bên cạnh bạn và bảo giữ nó phòng khi cần.",
        resultEn: "The breathing valve hisses. Once the coughing passes, they set the mask beside you and tell you to keep it in case you need it.",
        effects: { health: +4, sanity: -4, rep: +6 },
        flagsAdd: ['KỷVậtKhói']
      },
      {
        labelVi: "Nghe họ kể về một kho quân nhu còn bỏ lại",
        labelEn: "Listen to them describe an abandoned supply depot",
        resultVi: "Bạn nhớ được dấu hiệu trên bản đồ cũ. Sáng ra, người ấy bán bản sao cho một Office và đưa bạn phần Ahn nhận được.",
        resultEn: "You remember the mark on the old map. In the morning, they sell a copy to an Office and give you a share of the Ahn.",
        effects: { sanity: -8, wealth: +8, resonance: +12 },
        flagsAdd: ['BíMậtChiếnTranhKhói']
      }
    ]
  },
  {
    id: 'ev_open_outskirts_beast_stalk',
    age: [4, 6],
    major: true,
    weight: 35,
    need: { flags: ['OutskirtsAdaptability'] },
    vi: "[Bóng ngoài cồn cát] Bão làm rách bạt trại. Qua khe hở, bạn thấy dấu chân một con thú lớn in xuống cát. Nó dừng ngay ngoài lều.",
    en: "[A Shape Beyond the Dunes] The storm tears the camp tarp. Through the gap you see a large animal's tracks press into the sand. It stops outside the tent.",
    choices: [
      {
        labelVi: "Vùi mình vào cát và nín thở",
        labelEn: "Bury yourself in the sand and hold your breath",
        resultVi: "Bạn vùi mình xuống cát. Con thú đánh hơi ở mép lều rồi đi tiếp. Khi bạn trồi lên, người gác đã thấy toàn bộ.",
        resultEn: "You bury yourself in the sand. The animal sniffs at the tent edge and moves on. When you emerge, the watch has seen everything.",
        effects: { health: +4, sanity: -4, rep: +4 },
        flagsAdd: ['SinhTồnHoangDã']
      },
      {
        labelVi: "Cầm xà beng đập vào cọc lều để đánh lạc hướng nó",
        labelEn: "Strike a tent peg with the iron bar to draw it away",
        resultVi: "Tiếng kim loại vang qua bão. Con thú lao về phía cọc; bạn tránh được nó nhưng bị ngã vào khung lều. Người gác kéo bạn dậy trước khi nó quay lại.",
        resultEn: "Metal rings through the storm. The animal charges the peg. You dodge it but fall against the tent frame; the watch pulls you up before it returns.",
        effects: { health: -6, rep: +10, resonance: +14 },
        flagsAdd: ['DãTínhOutskirts']
      },
      {
        labelVi: "Đợi nó đi rồi lần theo dấu, nhặt những mảnh vảy rơi",
        labelEn: "Wait for it to pass and follow the tracks to pick up fallen scales",
        resultVi: "Bạn nhặt vài mảnh vảy quanh dấu chân. Một thương nhân trong đoàn đổi chúng lấy lương khô và Ahn; bạn giữ lại mảnh nhỏ nhất.",
        resultEn: "You collect a few scales around the tracks. A trader in the caravan gives you rations and Ahn for them; you keep the smallest one.",
        effects: { wealth: +10, sanity: -4 },
        flagsAdd: ['MẩuVảyQuáiVật']
      }
    ]
  },
  {
    id: 'ev_open_nest_quota_exam',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['NestSilverSpoon'] },
    vi: "[Bài kiểm tra cư trú] Thanh tra Wing đến Nest kiểm tra trẻ trong khu. Kết quả sẽ ảnh hưởng hạn ngạch cư trú năm tới. Họ đặt máy quét trước mặt bạn và phiếu đồng ý lên bàn.",
    en: "[The Residency Audit] Wing inspectors come to test the children in your Nest block. The results will affect next year's residency quota. They place a scanner before you and a consent form on the table.",
    choices: [
      {
        labelVi: "Làm đúng mọi chỉ dẫn, ngồi thẳng như một công dân Nest",
        labelEn: "Follow every instruction and sit straight like a Nest citizen",
        resultVi: "Máy quét báo đạt. Nhân viên đóng dấu vào phiếu và chuyển sang đứa trẻ kế tiếp; tên bạn được giữ trong danh sách cư trú.",
        resultEn: "The scanner marks you as passing. The inspector stamps the form and moves to the next child; your name stays on the residency list.",
        effects: { sanity: +6, network: +8, rep: +6 },
        flagsAdd: ['CôngDânGươngMẫu']
      },
      {
        labelVi: "Giấu máy ghi âm nhỏ và thu cuộc nói chuyện riêng của thanh tra",
        labelEn: "Hide a small recorder and capture the inspectors’ private talk",
        resultVi: "Máy ghi âm thu được cảnh hai thanh tra bàn cách sửa hạn ngạch. Họ phát hiện bạn đã nghe thấy và đưa Ahn để lấy bản ghi; bạn vẫn giữ một bản sao.",
        resultEn: "The recorder catches two inspectors discussing how to alter the quota. They realize you heard and pay for the recording; you keep a copy.",
        effects: { sanity: -4, wealth: +12, network: +2 },
        flagsAdd: ['BíMậtGiámĐịnh']
      },
      {
        labelVi: "Làm bài logic Singularity thật tốt để lấy học bổng",
        labelEn: "Do the Singularity logic trial as well as you can and go for the stipend",
        resultVi: "Trưởng đoàn nhìn bài làm rồi ký tên. Khoản học bổng được chuyển vào tài khoản đứng tên bạn; phiếu cư trú có thêm dấu của chương trình đào tạo.",
        resultEn: "The lead inspector signs your paper. The stipend goes into an account in your name; your residency form gains the training program's stamp.",
        effects: { wealth: +20, merit: +5, sanity: +2 },
        flagsAdd: ['HọcBổngTàiTrợ']
      }
    ]
  },
  {
    id: 'ev_open_wing_elite_tutelage',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['WingElite'] },
    vi: "[Chữ ký đầu tiên] Một người phục vụ làm đổ rượu lên thảm. Người quản lý đưa bạn bút và tờ báo cáo sự cố. Người phục vụ đứng cạnh cửa, chờ xem bạn ký vào ô nào.",
    en: "[Your First Signature] A servant spills wine on the carpet. The household manager gives you a pen and an incident report. The servant waits by the door to see which box you sign.",
    choices: [
      {
        labelVi: "Ký ô sa thải theo quy định của gia đình",
        labelEn: "Sign the dismissal box under the household rules",
        resultVi: "An ninh thu thẻ làm việc của người phục vụ. Người quản lý chuyển khoản thưởng tuân thủ vào tài khoản bạn rồi cất tờ báo cáo đi.",
        resultEn: "Security takes the servant's work pass. The manager credits a compliance bonus to your account and files the report away.",
        effects: { sanity: -6, wealth: +22, rep: +10 },
        flagsAdd: ['MáuLạnhThượngLưu']
      },
      {
        labelVi: "Nhận lỗi và trả phí làm sạch tấm thảm",
        labelEn: "Take the blame and pay for the carpet cleaning",
        resultVi: "Người quản lý ghi khoản phí vào tài khoản bạn. Người phục vụ trở lại ca làm, gật đầu với bạn trước khi khép cửa.",
        resultEn: "The manager charges your account. The servant returns to work and nods to you before closing the door.",
        effects: { sanity: +6, network: +18, wealth: -6 },
        flagsAdd: ['MạngLướiÂnNghĩa']
      },
      {
        labelVi: "Ghi tên người phục vụ vào chương trình thử nghiệm của Wing",
        labelEn: "Enter the servant's name in the Wing trial program",
        resultVi: "Người quản lý nhìn chữ ký rồi chuyển tờ giấy sang bộ phận nghiên cứu. Tiền thưởng được ghi vào tài khoản bạn. Người phục vụ bị gọi đi trước khi hết ca.",
        resultEn: "The manager reads your signature and sends the form to research. A bonus enters your account. The servant is called away before the shift ends.",
        effects: { sanity: -12, resonance: +18, wealth: +26 },
        flagsAdd: ['ThíNghiệmBíMật']
      }
    ]
  },
  {
    id: 'ev_open_workshop_first_spark',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['WorkshopApprentice'] },
    vi: "[Tia lửa đầu tiên] Người thợ cả đặt búa nhỏ vào tay bạn và chỉ thanh phôi đỏ trên đe. “Đập một nhát. Sau đó nói tôi nghe vì sao chọn chỗ ấy.”",
    en: "[The First Spark] The master smith puts a small hammer in your hand and points to a red-hot billet. “One strike. Then tell me why you chose that spot.”",
    choices: [
      {
        labelVi: "Đập mạnh vào giữa phôi",
        labelEn: "Strike the middle of the billet hard",
        resultVi: "Búa trúng giữa phôi, tay bạn tê đến khuỷu. Thợ cả đặt vài đồng Ahn tiền công lên bàn rồi chỉ bạn cách đứng cho nhát sau.",
        resultEn: "The hammer lands in the middle; your arm goes numb to the elbow. The smith sets a few Ahn on the table and shows you how to stand for the next strike.",
        effects: { health: +8, rep: +8, wealth: +6 },
        flagsAdd: ['TayBúaVữngVàng']
      },
      {
        labelVi: "Chỉ vết rạn dưới lớp xỉ trước khi đập",
        labelEn: "Point out the crack beneath the slag before striking",
        resultVi: "Thợ cả dừng búa, kiểm tra vết rạn và đổi phôi. Ông trả bạn tiền công thẩm định rồi cho đứng cạnh bàn kiểm hàng chiều đó.",
        resultEn: "The smith stops, checks the crack, and swaps the billet. He pays you for catching it and lets you stand beside the inspection table that afternoon.",
        effects: { sanity: +8, wealth: +12, network: +6 },
        flagsAdd: ['MắtNhìnKimKhí']
      },
      {
        labelVi: "Dùng thép vụn thử rèn một lưỡi dao nhỏ",
        labelEn: "Use scrap steel to try forging a small blade",
        resultVi: "Lưỡi dao méo nhưng cắt được giấy. Thợ cả thu nó lại, trả bạn tiền công vì đã biết tận dụng thép vụn.",
        resultEn: "The blade is crooked but cuts paper. The smith takes it back and pays you for making use of scrap steel.",
        effects: { health: +4, wealth: +4, rep: +4 },
        flagsAdd: ['DaoGămTựChế']
      }
    ]
  },
  {
    id: 'ev_open_syndicate_tribute_knock',
    age: [3, 7],
    major: true,
    weight: 35,
    need: { flags: ['SyndicateBloodline'] },
    vi: "[Ba tiếng gõ cửa] Hai giờ sáng, người thu khoản đóng góp cho Syndicate đến cùng hai hộ vệ. Họ nhìn sổ nợ của gia đình rồi nhìn bạn.",
    en: "[Three Knocks] At two in the morning, a Syndicate collector arrives with two guards. They study your household's debt ledger, then look at you.",
    choices: [
      {
        labelVi: "Cúi đầu thật thấp, giữ đúng lễ cho tới khi được phép ngẩng",
        labelEn: "Bow low and keep proper form until allowed to rise",
        resultVi: "Người thu nợ gật đầu rồi gạch bớt một dòng trong sổ. Họ cho bạn một viên kẹo trước khi cả nhóm rời nhà.",
        resultEn: "The collector nods and crosses one line off the ledger. They give you a sweet before leaving with the guards.",
        effects: { sanity: +6, rep: +10, heat: -4 },
        flagsAdd: ['LễNghiSyndicate']
      },
      {
        labelVi: "Hỏi họ vì sao khoản đóng góp tăng",
        labelEn: "Ask why the levy went up",
        resultVi: "Người thu nợ bắt bạn đọc từng khoản trên sổ. Bạn đọc hết, dù tay run. Họ không giảm tiền, nhưng từ đó người trong băng nhớ mặt bạn.",
        resultEn: "The collector makes you read every line of the ledger. You finish despite shaking hands. The sum stays, but the Syndicate remembers your face.",
        effects: { health: +6, sanity: -4, rep: +14, heat: +8 },
        flagsAdd: ['DũngKhíHắcĐạo']
      },
      {
        labelVi: "Nhặt chiếc bật lửa người thu nợ để quên và trả lại",
        labelEn: "Return the lighter the collector left behind",
        resultVi: "Người thu nợ trả bạn vài đồng Ahn và đóng dấu của băng lên tờ biên nhận. Họ bảo bạn giữ tờ giấy ấy để lần sau khỏi bị hỏi tên.",
        resultEn: "The collector pays you a few Ahn and stamps the Syndicate mark on a receipt. They tell you to keep it so the next collector will know your name.",
        effects: { wealth: +10, heat: +6, rep: +6 },
        flagsAdd: ['KỷVậtSyndicate']
      }
    ]
  },
  {
    id: 'ev_open_dieci_torn_scripture',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['DieciScholastic'] },
    vi: "[Trang sách rời] Khi dọn kho sách của Dieci, bạn nhặt được trang giấy rơi từ một cuốn bị xích khóa. Các ký tự đổi chỗ mỗi lần bạn đọc lại. Cuốn sách vẫn ở trên giá, nhưng ổ khóa đã mở.",
    en: "[The loose page] While cleaning the Dieci archive you pick up a page that has fallen from a chained book. The characters change places each time you read it again. The book is still on the shelf, but its lock is open.",
    choices: [
      {
        labelVi: "Đọc ngấu nghiến và ghi nhớ từng công thức trước khi có người đến",
        labelEn: "Read it greedily and memorize every formula before anyone comes",
        resultVi: "Bạn nhớ được ba ký hiệu trước khi mực đổi chỗ. Đầu đau đến tối; người giữ kho cho bạn ngồi nghỉ rồi hỏi chính xác bạn đã đọc thấy gì.",
        resultEn: "You memorize three symbols before the ink shifts. Your head aches until evening. The archivist lets you rest, then asks exactly what you saw.",
        effects: { sanity: -6, resonance: +18, network: +4 },
        flagsAdd: ['TriThứcDịThường']
      },
      {
        labelVi: "Gói trang giấy lại và đem nộp cho Thầy Viện Trưởng",
        labelEn: "Wrap the page and hand it to the Dean of the monastery",
        resultVi: "Người phụ trách khóa cuốn sách lại, ghi tên bạn vào sổ người được phép dọn kho. Bữa tối hôm ấy có thêm một phần ăn.",
        resultEn: "The archivist locks the book, then adds your name to the list of people allowed to clean the archive. Your dinner tray gets an extra portion.",
        effects: { sanity: +14, network: +10, rep: +6 },
        flagsAdd: ['ĐạoĐứcKinhViện']
      },
      {
        labelVi: "Đem những phép tính trên trang giấy vào bài tập đấm bao cát",
        labelEn: "Apply the calculations on the page to your punching-bag drills",
        resultVi: "Bạn đổi góc đứng theo hình vẽ trên trang. Bao cát lệch khỏi dây treo; người hướng dẫn bắt bạn làm lại để xem đó có phải may mắn không.",
        resultEn: "You shift your stance to match the diagram. The punching bag swings off its line; the instructor asks you to do it again to see whether it was luck.",
        effects: { health: +10, sanity: +6, rep: +8 },
        flagsAdd: ['QuyềnThuậtLogic']
      }
    ]
  },
  {
    id: 'ev_open_lake_tide_whisper',
    age: [3, 7],
    major: true,
    weight: 35,
    need: { flags: ['GreatLakeHardened'] },
    vi: "[Tiếng dưới mặt hồ] Nước Great Lake tràn lên sàn nhà bè. Từ xa, tiếng Whale vọng tới làm cọc neo rung bần bật. Dưới lớp nước đen, một bóng lớn lướt qua chân bạn.",
    en: "[The sound under the lake] Water from the Great Lake spills over the floor of the houseboat. From far off, the call of a Whale shakes the mooring posts. Under the black water a huge shape passes your feet.",
    choices: [
      {
        labelVi: "Đứng vững trên mạn thuyền, hứng gió muối và tiếng rống từ ngoài khơi",
        labelEn: "Stand firm on the gunwale and take the salt wind and the roar from the deep",
        resultVi: "Bạn bám dây neo khi nhà bè nghiêng. Đợi mặt nước hạ, người trong nhà mới kéo bạn khỏi mép sàn và kiểm tra xem chân bạn còn đứng vững không.",
        resultEn: "You hold the mooring rope as the houseboat tilts. When the water drops, someone pulls you from the edge and checks that you can still stand.",
        effects: { health: +12, sanity: +8, rep: +6 },
        flagsAdd: ['ChinhPhụcSóngĐen']
      },
      {
        labelVi: "Lội xuống vùng nước nông vớt những con cá phát sáng dạt vào để bán",
        labelEn: "Wade into the shallows and haul out the glowing fish washed in, to sell",
        resultVi: "Nước lạnh cắt da. Bạn vớt được giỏ cá dạt vào mạn bè; người bán ở bến trả Ahn trước khi hỏi chúng trôi từ đâu tới.",
        resultEn: "The water stings your skin. You lift a basket of fish washed against the houseboat; a dock vendor pays Ahn before asking where they came from.",
        effects: { wealth: +14, health: -4 },
        flagsAdd: ['CáPhátQuang']
      },
      {
        labelVi: "Khắc hình âm thoa lên mảnh gỗ trôi dạt làm bùa chắn",
        labelEn: "Carve a tuning-fork sign into drift timber as a ward",
        resultVi: "Bạn khắc dấu âm thoa rồi buộc mảnh gỗ vào cọc neo. Nó rung khi mặt nước dâng. Người gác bảo bạn để nguyên cho đến sáng.",
        resultEn: "You carve the tuning-fork mark and tie the wood to a mooring post. It trembles as the water rises. The watch tells you to leave it there until morning.",
        effects: { sanity: +8, rep: +6, resonance: +6 },
        flagsAdd: ['BùaÂmThoa']
      }
    ]
  },
  {
    id: 'ev_open_warp_curtain_peek',
    age: [4, 7],
    major: true,
    weight: 35,
    need: { flags: ['WarpCleanupCrew'] },
    vi: "[Khe cửa toa WARP] Bạn theo người nhà đến trạm bảo dưỡng W Corp. Cửa một toa vừa về ga hé mở trước khi đội thu dọn tới. Qua khe cửa vọng ra tiếng rên và mùi máu.",
    en: "[A gap in the WARP car door] You follow a relative to a W Corp depot. A car door opens a crack before the cleanup crew arrives. A moan and the smell of blood come through it.",
    choices: [
      {
        labelVi: "Nhìn thẳng qua khe hở",
        labelEn: "Look straight through the gap",
        resultVi: "Trong toa, những cơ thể chưa được tách rời vẫn cử động. Bạn lùi lại, đầu óc trống rỗng. Hình ảnh ấy bám theo bạn cả khi cửa đã đóng.",
        resultEn: "Inside, bodies that have yet to be separated are still moving. You step back, stunned. The image stays with you after the door shuts.",
        effects: { sanity: -14, resonance: +22, taboo: +1 },
        flagsAdd: ['ThấuThịWARP']
      },
      {
        labelVi: "Quay đi và gọi người nhà",
        labelEn: "Turn away and call your relative",
        resultVi: "Người nhà kéo bạn khỏi cửa toa trước khi bạn nhìn thấy bên trong. Bạn vẫn nghe tiếng rên, nhưng bàn tay họ giữ bạn đứng vững.",
        resultEn: "Your relative pulls you from the door before you see inside. You still hear the moaning, but their hand keeps you steady.",
        effects: { sanity: +8, health: +4 },
        flagsAdd: ['BịtTaiLàmNgơ']
      },
      {
        labelVi: "Nhặt chiếc đồng hồ rơi cạnh cửa toa",
        labelEn: "Pick up the watch beside the car door",
        resultVi: "Bạn giấu chiếc đồng hồ trước khi đội thu dọn đến. Tiệm cầm đồ trả một khoản Ahn đáng kể; bạn không hỏi nó thuộc về ai.",
        resultEn: "You hide the watch before the cleanup crew arrives. A pawnshop pays well for it. You never ask who owned it.",
        effects: { wealth: +18 },
        flagsAdd: ['KỷVậtHànhKháchWARP']
      }
    ]
  },
  {
    id: 'ev_open_bistro_kitchen_fire',
    age: [6, 7],
    major: true,
    weight: 35,
    need: { flags: ['BistroHeir'] },
    vi: "[Cửa sau quán mì] Một người khách chảy máu ngã vào bếp, đánh rơi túi Ahn cạnh chảo dầu. Ngoài ngõ, toán đòi nợ đang lần theo vết máu.",
    en: "[The noodle shop's back door] A bleeding customer falls into the kitchen and drops a purse of Ahn beside the oil pan. Outside, debt collectors follow the blood trail.",
    choices: [
      {
        labelVi: "Giấu người khách, lau sạch vết máu ở cửa",
        labelEn: "Hide the customer and wipe the blood from the door",
        resultVi: "Toán đòi nợ chỉ thấy một căn bếp đang đóng cửa. Khi họ đi khỏi, người khách trả bạn một phần túi Ahn và để lại địa chỉ liên lạc.",
        resultEn: "The collectors find a kitchen closing for the night. Once they leave, the customer pays you part of the purse and leaves an address.",
        effects: { sanity: +6, network: +16, wealth: +10 },
        flagsAdd: ['KhéoLéoĐưaĐẩy']
      },
      {
        labelVi: "Hất chảo dầu vào tên vừa xông qua cửa",
        labelEn: "Throw the oil at the collector entering the kitchen",
        resultVi: "Dầu bắn cả lên tay bạn. Toán đòi nợ rút ra ngõ, nhưng đã thấy mặt bạn. Tin về vụ ẩu đả lan quanh khu, cùng với tên quán.",
        resultEn: "Oil splashes onto your hand as well. The collectors retreat, but they have seen your face. Word of the fight spreads through the block, along with the shop's name.",
        effects: { health: -4, rep: +12, heat: +8 },
        flagsAdd: ['HăngMáuBếpNóng']
      },
      {
        labelVi: "Giấu túi Ahn rồi chỉ toán đòi nợ sang ngõ khác",
        labelEn: "Hide the purse and send the collectors down another alley",
        resultVi: "Chúng đuổi theo hướng bạn chỉ. Bạn chia ít tiền cho người khách băng bó, giữ phần còn lại. Người ấy không hỏi về túi Ahn.",
        resultEn: "They follow your directions. You give the customer enough for bandages and keep the rest. They do not ask about the purse.",
        effects: { wealth: +18, sanity: -2 },
        flagsAdd: ['ThựcDụngĐườngPhố']
      }
    ]
  },
  {
    id: 'ev_open_prosthetic_spark_wire',
    age: [6, 7],
    major: true,
    weight: 35,
    need: { flags: ['ProstheticClinic'] },
    vi: "[Ca lắp tay giả] Máy phát điện của phòng khám chập mạch giữa ca phẫu thuật cho một Fixer. Thiết bị cầm máu tắt phụt; bác sĩ gọi bạn lấy bộ pin dự phòng.",
    en: "[A prosthetic fitting] The clinic's generator shorts out during a Fixer's surgery. The cauterizer dies, and the surgeon asks you to fetch the backup battery.",
    choices: [
      {
        labelVi: "Mang bộ pin đến và giữ dây nối theo lời bác sĩ",
        labelEn: "Bring the battery and hold the lead as the surgeon directs",
        resultVi: "Dây nóng làm bỏng ngón tay bạn, nhưng thiết bị chạy lại. Ca mổ tiếp tục. Sau đó bác sĩ ghi tên bạn vào báo cáo cứu chữa.",
        resultEn: "The hot lead burns your fingers, but the device starts again. Surgery resumes. The surgeon records your help in the treatment report.",
        effects: { health: -4, sanity: +8, rep: +10 },
        flagsAdd: ['BànTayCứuSinh']
      },
      {
        labelVi: "Giữ khay dụng cụ và làm đúng lời bác sĩ",
        labelEn: "Hold the instrument tray and follow the surgeon's instructions",
        resultVi: "Bạn không làm rơi dụng cụ nào. Khi ca mổ xong, phòng khám trả công và bác sĩ cho bạn xem cách nối các đầu dây.",
        resultEn: "You do not drop a single tool. After surgery, the clinic pays you, and the surgeon shows you how the leads fit together.",
        effects: { health: +6, wealth: +8, network: +6 },
        flagsAdd: ['BìnhTĩnhPhẫuThuật']
      },
      {
        labelVi: "Nhặt linh kiện rơi dưới bàn mổ đem bán",
        labelEn: "Take a loose part from beneath the table to sell",
        resultVi: "Bạn bán linh kiện ở tiệm đồ cũ. Sáng hôm sau, phòng khám phải đặt món thay thế; bạn tránh nhìn tờ hóa đơn.",
        resultEn: "You sell the part to a salvage shop. The clinic orders a replacement the next morning. You avoid looking at the invoice.",
        effects: { wealth: +14, sanity: -2 },
        flagsAdd: ['ChiTiếtMáyHiếm']
      }
    ]
  },
  {
    id: 'ev_open_orphan_garbage_pile',
    age: [4, 6],
    major: true,
    weight: 35,
    need: { flags: ['StreetRatInstinct'] },
    vi: "[Sau đêm quét dọn] Gần rạng sáng, bạn chờ tiếng chân Sweeper khuất hẳn rồi bò khỏi chỗ nấp. Bọn trẻ trong ngõ đã tới bãi rác trước xe dọn đường.",
    en: "[After the Sweepers] Near dawn, you wait for the Sweepers' footsteps to fade before leaving your hiding place. The alley children reach the dump before the refuse carts.",
    choices: [
      {
        labelVi: "Giành một mẩu bánh mì khô nguyên vẹn dưới gầm xe rác hỏng",
        labelEn: "Fight for a whole dry crust under a broken refuse cart",
        resultVi: "Bạn lôi được mẩu bánh khỏi gầm xe, chia một nửa cho đứa bé đứng cạnh. Cả hai có sức đi tiếp đến sáng.",
        resultEn: "You pull the crust from beneath the cart and share half with the child beside you. Both of you have enough strength to keep moving until morning.",
        effects: { health: +8, sanity: +4 },
        flagsAdd: ['MiếngĂnSinhTồn']
      },
      {
        labelVi: "Nhặt thanh sắt sắc cạnh để giữ chỗ bới rác",
        labelEn: "Take a sharp iron bar to hold your place at the dump",
        resultVi: "Cạnh sắt cứa vào tay khi bạn nhấc nó lên. Bọn trẻ khác nhường lối; bạn có thêm một lượt tìm đồ trước xe dọn đường.",
        resultEn: "The edge cuts your hand as you lift it. The other children give way, leaving you one more chance to search before the cart arrives.",
        effects: { health: -4, rep: +8 },
        flagsAdd: ['ThanhSắtBén']
      },
      {
        labelVi: "Mò trong bùn đen của cống thoát nước tìm vài đồng Ahn rơi",
        labelEn: "Grope through the black mud of the drain for dropped Ahn",
        resultVi: "Bạn tìm được vài đồng Ahn kẹt trong khe gạch và thêm một món đồ đem bán. Người thu mua đếm tiền trước mặt bạn.",
        resultEn: "You find a few Ahn caught between bricks and a scrap worth selling. The buyer counts out the money in front of you.",
        effects: { wealth: +8, sanity: +2 },
        flagsAdd: ['ĐồngAhnMayMắn']
      }
    ]
  }
];
