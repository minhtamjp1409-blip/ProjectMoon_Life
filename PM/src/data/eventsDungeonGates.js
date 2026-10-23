// Ways into the five dungeons. A gate sets the scene and never pays by itself: whatever the
// player earns comes from the stages (see dungeonEngine.js). Each dungeon has one gate for a
// Fixer, one for the jobs or places that touch it, and a way to turn down the risk and get paid
// less. `dungeonPrep: 'supplies'` costs Ahn at the door and buys one extra supply charge.

const gate = ({ done, ...spec }) => ({ major: true, forbids: ['Distorted', done], ...spec });

const enter = (dungeon, done, labelVi, labelEn, resultVi, resultEn) => ({
  labelVi, labelEn, resultVi, resultEn,
  startDungeon: dungeon,
  flagsAdd: [done]
});

const prepare = (dungeon, done, labelVi, labelEn, resultVi, resultEn) => ({
  labelVi, labelEn, resultVi, resultEn,
  startDungeon: dungeon,
  dungeonPrep: 'supplies',
  costAhn: 12,
  flagsAdd: [done]
});

const decline = (done, labelVi, labelEn, resultVi, resultEn, effects) => ({
  labelVi, labelEn, resultVi, resultEn, effects, flagsAdd: [done]
});

export const DUNGEON_GATE_EVENTS = [
  // ---- WARP train ----
  gate({
    id: 'gate_warp_fixer_request',
    done: 'gate_warp_fixer_done',
    age: [24, 62],
    weight: 52,
    need: { jobs: ['Fixer'] },
    vi: '[Request mở của W Corp] Bảng Request ở Office của bạn có một dòng in đậm: W Corp cần một Fixer đứng cạnh đội dọn tàu WARP. Lần trước đội dọn mất hai người, và đồng nghiệp của họ không còn nhớ tên hai người ấy. Tiền công trả trước một nửa.',
    en: '[W Corp Open Request] The Request board at your Office carries one line in bold: W Corp wants a Fixer standing beside the WARP train cleanup crew. Last time the crew lost two people, and their coworkers no longer remember the names. Half the pay comes up front.',
    choices: [
      enter('dungeon_warp_train', 'gate_warp_fixer_done',
        'Nhận Request và theo đội dọn vào toa', 'Take the Request and follow the crew into the car',
        'Đội trưởng dọn tàu đưa bạn một mặt nạ khí và không nhìn vào mắt bạn. Cửa toa khép lại, và đồng hồ T Corp trên tường bắt đầu đếm.',
        'The crew lead hands you a rebreather and does not meet your eyes. The car door seals, and the T Corp clock on the wall begins to count.'),
      prepare('dungeon_warp_train', 'gate_warp_fixer_done',
        'Chi 12 Ahn mua thêm bình dưỡng khí và thuốc kích thích trước khi vào', 'Spend 12 Ahn on a spare rebreather and stimulants before going in',
        'Người bán ở sạp cạnh ga đếm tiền hai lần rồi nhét vào tay bạn một hộp thuốc còn ấm. Bạn bước vào toa với túi nặng hơn và ví nhẹ hơn.',
        'The stall vendor by the station counts the coins twice, then presses a still-warm tin of stimulants into your hand. You step into the car with a heavier pack and a lighter purse.'),
      decline('gate_warp_fixer_done',
        'Từ chối: những chuyến tàu đó không có hồ sơ lúc quay lại', 'Decline: nothing about those trains is on file when they come back',
        'Bạn gạch tên khỏi bảng. Hai tuần sau, bản tin khu có một dòng nhỏ về một đội dọn tàu thiếu người.',
        'You strike your name from the board. Two weeks later a small line in the district bulletin mentions a cleanup crew short of hands.',
        { sanity: +3 })
    ]
  }),
  gate({
    id: 'gate_warp_w_district_shift',
    done: 'gate_warp_shift_done',
    age: [20, 55],
    weight: 48,
    need: { regions: ['W'] },
    vi: '[Ca đêm ở ga W Corp] Còi ga District 23 hú ba hồi, và quản đốc đi dọc dãy nhà phát từng chiếc mặt nạ khí. Ai có tên trong sổ thì ra sân ga, ai vắng thì mất phiếu lương cả tuần. Tên bạn nằm ở dòng thứ tư.',
    en: '[Night Shift at the W Corp Platform] The District 23 station horn sounds three times, and the foreman walks the tenement row handing out rebreathers. Whoever is in the ledger reports to the platform, and whoever is absent loses the week’s ration slip. Your name is on the fourth line.',
    choices: [
      enter('dungeon_warp_train', 'gate_warp_shift_done',
        'Nhận mặt nạ và ra ga cùng những người còn lại', 'Take the mask and go to the platform with the others',
        'Mặt nạ của bạn còn dấu răng của người đeo trước. Bạn không hỏi người đó đâu rồi.',
        'Your mask still carries the teeth marks of the last wearer. You do not ask where they went.'),
      prepare('dungeon_warp_train', 'gate_warp_shift_done',
        'Chi 12 Ahn mua thêm bình dưỡng khí và thuốc kích thích từ sạp đầu ga', 'Spend 12 Ahn on a spare rebreather and stimulants from the stall at the station gate',
        'Bạn trả bằng tiền lẻ gom từ ba cái túi áo. Người bán không đếm lại, và điều đó làm bạn lo hơn là nếu ông ta đếm.',
        'You pay in small coins gathered from three pockets. The vendor does not recount them, and that worries you more than if he had.'),
      decline('gate_warp_shift_done',
        'Trả 10 Ahn cho một người hàng xóm đi thay bạn', 'Pay a neighbor 10 Ahn to go in your place',
        'Người hàng xóm đếm tiền, gật đầu và ra ga với đôi vai chùng xuống. Bạn ở nhà nghe còi hú đến sáng.',
        'The neighbor counts the coins, nods and walks to the platform with sagging shoulders. You stay home and listen to the horn until morning.',
        { sanity: -3, wealth: -10 })
    ]
  }),

  gate({
    id: 'gate_warp_wing_loan',
    done: 'gate_warp_wing_done',
    age: [22, 58],
    weight: 40,
    need: { jobs: ['Wing Employee'] },
    vi: '[Danh sách điều động] Phòng nhân sự dán một tờ giấy lên cửa kho: W Corp mượn nhân viên từ các Wing khác cho một đợt dọn tàu WARP, mỗi phòng cử một người. Tên bạn được viết tay vào ô trống, bằng bút khác màu với những tên còn lại.',
    en: '[Loan Roster] Personnel tapes a sheet to the storeroom door: W Corp is borrowing staff from other Wings for a WARP train cleanup, one person from each department. Your name is written by hand in the blank box, in a different pen from the rest.',
    choices: [
      enter('dungeon_warp_train', 'gate_warp_wing_done',
        'Nhận lệnh điều động và ra sân ga theo giờ ghi trên giấy', 'Accept the loan and report to the platform at the hour on the sheet',
        'Người của W Corp phát cho bạn một mặt nạ khí và một tờ giấy ghi giờ mà ca dọn kết thúc. Bạn thấy giờ ấy chỉ cách giờ bắt đầu mười giây.',
        'A W Corp attendant gives you a rebreather and a slip with the hour the cleanup ends. You notice that hour is only ten seconds after the start.'),
      prepare('dungeon_warp_train', 'gate_warp_wing_done',
        'Chi 12 Ahn mua thêm bình dưỡng khí và thuốc kích thích từ kho vật tư lậu', 'Spend 12 Ahn on a spare rebreather and stimulants from the unofficial supply room',
        'Thủ kho đưa hàng qua khe cửa và không hỏi tên. Bạn nghĩ đó là cách duy nhất ông ta còn giữ được giấc ngủ.',
        'The storekeeper passes the goods through the door gap and asks no name. You think it is the only way he still manages to sleep.'),
      decline('gate_warp_wing_done',
        'Xin đổi sang phiên trực kho và chịu mất một tháng phụ cấp', 'Ask for a storeroom shift instead and lose a month of allowance',
        'Quản lý gạch tên bạn bằng một nét mạnh tay và thêm tên người khác. Cả tuần sau bạn tránh nhìn vào ô trống cạnh bàn mình.',
        'The manager crosses you out with a hard stroke and writes in someone else. For a week you avoid looking at the empty desk beside yours.',
        { wealth: -4, sanity: -2 })
    ]
  }),
  gate({
    id: 'gate_outskirts_syndicate_cache',
    done: 'gate_outskirts_cache_done',
    age: [22, 60],
    weight: 32,
    need: { jobs: ['Syndicate'] },
    vi: '[Kho cất giấu cũ] Một Capo già gọi bạn lại lúc nửa đêm và đặt lên bàn một chiếc chìa khóa gỉ. Ông cất một kho vũ khí dưới Ruins ngoài Outskirts từ trước cả khi bạn sinh ra, và nhớ đường xuống rõ hơn nhớ tên con mình.',
    en: '[The Old Cache] An old Capo calls you in at midnight and sets a rusted key on the table. He hid an arms cache under the Ruins in the Outskirts before you were born, and he remembers the way down better than his own children’s names.',
    choices: [
      enter('dungeon_outskirts_ruins', 'gate_outskirts_cache_done',
        'Nhận chìa khóa và đi theo bản đồ ông vẽ lại bằng trí nhớ', 'Take the key and follow the map he redraws from memory',
        'Ông vẽ bản đồ lên mặt bàn bằng đầu ngón tay thấm rượu, rồi lau đi trước khi bạn kịp chép. Bạn nhớ đủ để xuống, và hy vọng nhớ đủ để lên.',
        'He draws the map on the tabletop with a fingertip dipped in liquor, then wipes it away before you can copy it. You remember enough to go down, and hope you remember enough to come back.'),
      prepare('dungeon_outskirts_ruins', 'gate_outskirts_cache_done',
        'Chi 12 Ahn mua thêm dây, đèn và nước', 'Spend 12 Ahn on extra rope, a lamp and water',
        'Người bán đồ ở chợ rìa nhìn chiếc chìa khóa trong tay bạn và tự giảm giá. Bạn không hỏi vì sao.',
        'The vendor at the edge market looks at the key in your hand and lowers the price on his own. You do not ask why.'),
      decline('gate_outskirts_cache_done',
        'Trả lại chìa và nói rằng đường xuống không đáng một người', 'Return the key and say the way down is not worth a person',
        'Ông cầm lại chiếc chìa, im lặng một lúc, rồi đặt nó vào ngăn kéo khóa kỹ. Hôm sau tất cả mọi người trong quán đều biết bạn đã từ chối.',
        'He takes the key back, says nothing for a while, then puts it in a drawer and locks it. By the next day everyone in the bar knows you refused.',
        { rep: -3, sanity: +2 })
    ]
  }),

  // ---- L Corp ruin ----
  gate({
    id: 'gate_lobotomy_fixer_survey',
    done: 'gate_lobotomy_fixer_done',
    age: [24, 65],
    weight: 38,
    need: { jobs: ['Fixer'] },
    vi: '[Khảo sát chi nhánh niêm phong] Một Wing thuê qua Office của bạn: khảo sát chi nhánh Lobotomy Corporation bị niêm phong dưới lòng đất, lấy hộp đen và đo mật độ Enkephalin. Bản đồ cũ chỉ còn một trục thông gió, và ở lề có ai đó viết: đừng nghe.',
    en: '[Sealed Branch Survey] A Wing hires through your Office: survey a sealed Lobotomy Corporation branch underground, recover the black box and measure the Enkephalin density. The old map shows only one ventilation shaft, and someone has written in the margin: do not listen.',
    choices: [
      enter('dungeon_lobotomy_ruin', 'gate_lobotomy_fixer_done',
        'Nhận khảo sát và đu dây xuống trục thông gió', 'Take the survey and rappel down the ventilation shaft',
        'Bạn buộc dây vào cột gần nhất và kéo thử ba lần. Gió từ bên dưới có mùi kim loại ẩm, và ở đâu đó rất sâu có tiếng còi nhỏ như tiếng muỗi.',
        'You tie the rope to the nearest pillar and test it three times. The wind from below smells of damp metal, and somewhere very deep a siren sounds as thin as a mosquito.'),
      prepare('dungeon_lobotomy_ruin', 'gate_lobotomy_fixer_done',
        'Chi 12 Ahn thuê thêm bộ lọc khí và dây dự phòng', 'Spend 12 Ahn renting a gas filter and a spare rope',
        'Người cho thuê dụng cụ bọc bộ lọc vào vải dầu và bảo bạn trả lại nếu còn sống. Ông ta nói như đùa, nhưng không cười.',
        'The tool renter wraps the filter in oilcloth and tells you to return it if you are alive. He says it like a joke and does not smile.'),
      decline('gate_lobotomy_fixer_done',
        'Bán bản đồ cho một người môi giới Wing rồi rút lui', 'Sell the map to a Wing broker and walk away',
        'Người môi giới đếm tiền, không hỏi tại sao bạn không xuống. Có lẽ ông ta đã biết câu trả lời.',
        'The broker counts out the coins and does not ask why you are not going down. Perhaps he already knows the answer.',
        { wealth: +10, network: +2 })
    ]
  }),
  gate({
    id: 'gate_lobotomy_workshop_casing',
    done: 'gate_lobotomy_workshop_done',
    age: [22, 62],
    weight: 34,
    need: { jobs: ['Fixer', 'Syndicate', 'Outcast'] },
    vi: '[Vỏ chứa Abnormality] Một người thu mua chặn bạn ở cửa xưởng quen lúc đóng cửa, vì người thợ rèn ở đó đã từ chối ông. Ông nói dưới chi nhánh L Corp sụp còn những vỏ chứa nguyên vẹn, thứ hợp kim mà xưởng nào ở The City cũng không đúc lại được. Ông không nói ai đã xuống đó trước.',
    en: '[Abnormality Casings] A buyer stops you at the door of your regular workshop at closing time, because the smith there turned him down. He says the collapsed L Corp branch still holds intact containment casings, an alloy no forge in The City can recast. He does not say who went down there first.',
    choices: [
      enter('dungeon_lobotomy_ruin', 'gate_lobotomy_workshop_done',
        'Gói đồ nghề và đi theo ông xuống trục thông gió', 'Pack your tools and follow him to the ventilation shaft',
        'Bạn gói kìm cắt, đèn và một cuộn dây vào bao tải rồi đi theo ông. Lối xuống là một trục thông gió đủ rộng cho một người, và ông không bước xuống cùng bạn.',
        'You pack cutters, a lamp and a coil of rope into a sack and follow him. The way down is a ventilation shaft just wide enough for one, and he does not climb down with you.'),
      prepare('dungeon_lobotomy_ruin', 'gate_lobotomy_workshop_done',
        'Chi 12 Ahn mua thêm đèn và bộ lọc khí trước khi xuống', 'Spend 12 Ahn on a lamp and a gas filter before going down',
        'Bạn mua loại đèn đắt nhất ở sạp, thứ có chụp thủy tinh dày. Người bán bảo thủy tinh ấy từng che một thứ khác nhưng không nói thêm.',
        'You buy the dearest lamp at the stall, the one with the thick glass shade. The seller says the glass once covered something else and does not say more.'),
      decline('gate_lobotomy_workshop_done',
        'Chỉ nhận tiền môi giới để chỉ đường cho ông', 'Take only a finder’s fee for pointing him to the shaft',
        'Ông trả bằng tiền lẻ và đi một mình. Ba tuần sau, bạn thấy một chiếc áo giống áo ông treo ở sạp đồ cũ.',
        'He pays in small coins and goes alone. Three weeks later you see a coat like his hanging at a secondhand stall.',
        { wealth: +10, sanity: -2 })
    ]
  }),

  // ---- La Manchaland ----
  gate({
    id: 'gate_bloodfiend_zwei_bounty',
    done: 'gate_bloodfiend_fixer_done',
    age: [22, 60],
    weight: 36,
    need: { jobs: ['Fixer'] },
    vi: '[Tiền thưởng của Zwei] Zwei Association treo giải cho bất kỳ Fixer nào mang được người mất tích ra khỏi một công viên ngầm ở District 16. Ba đội đã xuống và không đội nào gửi tin lên. Một người từng thoát ra nói rằng nhạc kèn chỉ ngừng khi bạn đã trả tiền vé.',
    en: '[Zwei Bounty] Zwei Association posts a bounty for any Fixer who brings a missing person out of an underground park in District 16. Three crews went down and none sent word back. One person who escaped says the organ music only stops once you have paid for your ticket.',
    choices: [
      enter('dungeon_bloodfiend_carnival', 'gate_bloodfiend_fixer_done',
        'Nhận tiền thưởng và tìm lối xuống công viên', 'Take the bounty and look for the way down to the park',
        'Bạn lần theo vết bánh xe trong bùn tới một nắp cống còn mới. Từ bên dưới vọng lên tiếng kèn hơi, lạc điệu đúng một nốt mỗi lần.',
        'You follow cart tracks in the mud to a manhole that is still new. From below comes the sound of an organ, off by exactly one note each time.'),
      prepare('dungeon_bloodfiend_carnival', 'gate_bloodfiend_fixer_done',
        'Chi 12 Ahn mua thêm băng gạc, thuốc cầm máu và đèn pin', 'Spend 12 Ahn on bandages, a coagulant and a hand lamp',
        'Người bán thuốc ở chợ đêm không hỏi bạn định đi đâu. Ông ta đưa thêm một cuộn băng và bảo bạn đừng để lộ cổ.',
        'The night-market medic does not ask where you are going. He adds a roll of bandage and tells you not to leave your neck bare.'),
      decline('gate_bloodfiend_fixer_done',
        'Chỉ báo vị trí công viên cho Zwei để lấy tiền công tin', 'Only report the park’s location to Zwei for the tip fee',
        'Zwei ghi tọa độ vào sổ rồi cử người khác đi. Bạn nhận tiền công và không hỏi đội nào được cử.',
        'Zwei writes the coordinates in a ledger and sends someone else. You take the fee and do not ask which crew.',
        { wealth: +8, rep: +2 })
    ]
  }),
  gate({
    id: 'gate_bloodfiend_syndicate_hostage',
    done: 'gate_bloodfiend_syndicate_done',
    age: [22, 60],
    weight: 32,
    need: { jobs: ['Syndicate'] },
    vi: '[Con tin dưới cống] Một Capo gọi bạn vào phòng sau quán rượu. Một người của The Five Fingers bị giữ trong công viên ngầm ở District 16 làm vật cược cho món nợ máu, và Capo muốn người của mình lên trước khi món nợ ấy bị đòi từ chính anh ta.',
    en: '[Hostage Below the Sewers] A Capo calls you into the back room of a bar. One of The Five Fingers is being held in an underground park in District 16 as collateral for a blood debt, and the Capo wants his man out before the debt is collected from him in person.',
    choices: [
      enter('dungeon_bloodfiend_carnival', 'gate_bloodfiend_syndicate_done',
        'Nhận việc và xuống công viên theo đường cống', 'Take the job and go down to the park through the sewers',
        'Capo đặt lên bàn một tấm vé giấy đã nhàu và bảo bạn giữ nó trong túi trong. Ông không nói tại sao, và bạn không hỏi.',
        'The Capo lays a crumpled paper ticket on the table and tells you to keep it in an inside pocket. He does not say why, and you do not ask.'),
      prepare('dungeon_bloodfiend_carnival', 'gate_bloodfiend_syndicate_done',
        'Chi 12 Ahn mua thêm băng gạc, thuốc cầm máu và đèn pin', 'Spend 12 Ahn on bandages, a coagulant and a hand lamp',
        'Bạn mua đồ ở quầy thuốc của một người quen cũ và nghe ông ta nhắc lại chuyện nhà người ấy đã đi xuống đó một lần.',
        'You buy at the stall of an old acquaintance and hear him mention again that his family once went down there.'),
      decline('gate_bloodfiend_syndicate_done',
        'Nói với Capo rằng người của ông phải tự trả nợ', 'Tell the Capo his man has to pay his own debt',
        'Capo nhìn bạn lâu hơn mức cần thiết, rồi gật đầu. Cuối tuần đó có người nhắc tên bạn trong một câu chuyện bạn không muốn nghe.',
        'The Capo looks at you a beat longer than necessary, then nods. By the end of the week someone mentions your name in a story you do not want to hear.',
        { rep: -4, network: -3 })
    ]
  }),

  // ---- Outskirts ruins ----
  gate({
    id: 'gate_outskirts_salvage_crew',
    done: 'gate_outskirts_crew_done',
    age: [20, 60],
    weight: 34,
    need: { jobs: ['Fixer', 'Syndicate', 'Outcast'] },
    vi: '[Đội nhặt phế tích] Một đội nhặt phế tích từ Outskirts ghé quán gần xưởng quen của bạn và trải một tấm bản đồ vẽ tay lên bàn. Đường hầm cát mới mở dẫn xuống Ruins, nơi chưa ai quay về với một khối kim loại còn nguyên. Họ cần thêm một người biết cách chọn kim loại.',
    en: '[Scavenger Crew] A scavenger crew from the Outskirts stops at the bar near your regular workshop and spreads a hand-drawn map on the table. A new sand tunnel leads down to the Ruins, where nobody has come back with an intact piece of metal. They need one more person who can judge metal.',
    choices: [
      enter('dungeon_outskirts_ruins', 'gate_outskirts_crew_done',
        'Nhận chỗ trong đội và theo họ xuống đường hầm cát', 'Take a place in the crew and follow them down the sand tunnel',
        'Người đi đầu buộc dây vào thắt lưng bạn và dặn đừng chạm vào tường. Cát chảy xuống cổ áo bạn suốt đoạn đường, ấm như thể có thứ gì đang thở ở bên dưới.',
        'The lead scavenger ties a rope to your belt and tells you not to touch the walls. Sand runs down your collar the whole way, warm as if something were breathing below.'),
      prepare('dungeon_outskirts_ruins', 'gate_outskirts_crew_done',
        'Chi 12 Ahn mua thêm dây, đèn và nước', 'Spend 12 Ahn on extra rope, a lamp and water',
        'Bạn mua ở một xe hàng của người du mục, loại nước đựng trong bầu da và đã nhạt vị. Người bán bảo dưới đó nước còn ít hơn tiền.',
        'You buy from a nomad’s cart, water in a skin flask gone flat with age. The seller says there is less water down there than money.'),
      decline('gate_outskirts_crew_done',
        'Chỉ cho họ chỗ mua dụng cụ rồi lấy tiền môi giới', 'Point them to where tools are sold and keep the finder’s fee',
        'Bạn dẫn họ ra hai dãy nhà, tới chỗ người bán dây và búa. Họ đi trước khi trời sáng, và bạn không đếm xem có mấy người trở về.',
        'You walk them two blocks to the man who sells rope and hammers. They leave before dawn, and you do not count how many return.',
        { wealth: +6, network: +2 })
    ]
  }),
  gate({
    id: 'gate_outskirts_home_shaft',
    done: 'gate_outskirts_home_done',
    age: [18, 60],
    weight: 28,
    requires: ['Outskirts'],
    vi: '[Tiếng gõ dưới nền đất] Ba đêm liền, chỗ trú của bạn ở Outskirts rung lên theo nhịp gõ từ phía dưới. Sáng thứ tư, cát ở góc nhà đã sụt thành một cái miệng đủ cho một người chui qua, và hơi bốc lên từ đó có mùi kim loại cũ.',
    en: '[Knocking Beneath the Floor] Three nights in a row your shelter in the Outskirts shakes to a knock from below. On the fourth morning the sand in the corner has slumped into a mouth wide enough for one person, and the breath rising from it smells of old metal.',
    choices: [
      enter('dungeon_outskirts_ruins', 'gate_outskirts_home_done',
        'Buộc dây vào cột nhà và chui xuống', 'Tie a rope to the house post and climb down',
        'Bạn kéo thử dây ba lần và nghe cột nhà kêu rồi mới bước qua mép. Tiếng gõ dừng đúng lúc chân bạn chạm đá.',
        'You test the rope three times and listen to the house post creak before stepping over the edge. The knocking stops the moment your foot touches stone.'),
      prepare('dungeon_outskirts_ruins', 'gate_outskirts_home_done',
        'Chi 12 Ahn mua thêm dây, đèn và nước trước khi xuống', 'Spend 12 Ahn on extra rope, a lamp and water before going down',
        'Bạn đổi đồ với một người láng giềng có thùng nước dự trữ. Ông ta nhìn cái hố sau lưng bạn và không đòi thêm đồng nào.',
        'You trade with a neighbor who keeps a store of water. He looks at the hole behind you and does not ask for another coin.'),
      decline('gate_outskirts_home_done',
        'Lấp miệng hố bằng đá và dời chỗ ngủ sang góc khác', 'Block the hole with stones and move your bed to another corner',
        'Bạn chất đá tới ngang eo rồi đẩy tủ chắn lên trên. Đêm đó không có tiếng gõ, và bạn nằm nghe sự yên tĩnh ấy tới sáng.',
        'You stack stones to your waist and push the cabinet over them. There is no knocking that night, and you lie listening to the quiet until dawn.',
        { sanity: +2 })
    ]
  }),

  // ---- Great Lake ----
  gate({
    id: 'gate_lake_open_hunt',
    done: 'gate_lake_fixer_done',
    age: [22, 62],
    weight: 36,
    need: { jobs: ['Fixer'] },
    vi: '[Request mở của U Corp] U Corp đăng Request cho mọi Fixer chịu ra Great Lake: chặn một con Whale dị thể đang lùa tàu hàng vào sương. Phí rời bến trả ngay tại cảng. Phần thưởng chỉ trả cho người còn đứng trên boong lúc tàu về.',
    en: '[U Corp Open Request] U Corp posts a Request for any Fixer willing to go out on the Great Lake: stop an aberrant Whale that is herding cargo ships into the fog. The departure fee is paid at the dock. The reward goes only to whoever is still standing on deck when the ship returns.',
    choices: [
      enter('dungeon_great_lake', 'gate_lake_fixer_done',
        'Nhận Request và lên tàu bọc thép ra Great Lake', 'Take the Request and board the armored ship for the Great Lake',
        'Thủy thủ không nói chuyện với người lạ trên boong. Một người đưa bạn áo phao và chỉ về phía mạn trái: đứng ở đó, và đừng nhìn xuống nước khi chuông kêu.',
        'The sailors do not talk to strangers on deck. One hands you a life vest and points to the port rail: stand there, and do not look at the water when the bell rings.'),
      prepare('dungeon_great_lake', 'gate_lake_fixer_done',
        'Chi 12 Ahn mua thêm thuốc chống lạnh và áo phao dày trước khi ra khơi', 'Spend 12 Ahn on a cold-water tonic and a thicker vest before sailing',
        'Người bán đặt vào tay bạn một chai thuốc đục và bảo uống khi môi bắt đầu tím. Ông không bảo uống bao nhiêu.',
        'The seller puts a cloudy bottle in your hand and says to drink when your lips begin to turn blue. He does not say how much.'),
      decline('gate_lake_fixer_done',
        'Chỉ nhận phí rời bến và để tàu đi mà không có bạn', 'Take only the departure fee and let the ship sail without you',
        'Bạn nhận phí ở bàn cảng và đứng nhìn con tàu tách bến. Một thủy thủ trên boong vẫy tay với bạn, và bạn không biết có nên vẫy lại không.',
        'You collect the fee at the dock desk and watch the ship pull away. A sailor on deck waves at you, and you do not know whether to wave back.',
        { wealth: +6, rep: -4 })
    ]
  }),
  gate({
    id: 'gate_lake_salvage_cargo',
    done: 'gate_lake_salvage_done',
    age: [20, 60],
    weight: 30,
    need: { regions: ['U'] },
    vi: '[Hàng trôi dạt] Một thương thuyền chìm ở rìa Great Lake, và các thùng hàng của nó trôi vào vùng sương. Ai ở bến District 21 cũng biết đường tới đó dài thế nào, và ai trong những người đã đi không còn về.',
    en: '[Drifting Cargo] A merchant ship sank at the edge of the Great Lake, and its crates are drifting into the fog. Everyone on the District 21 docks knows how long the road there is, and which of those who went did not come back.',
    choices: [
      enter('dungeon_great_lake', 'gate_lake_salvage_done',
        'Thuê chỗ trên một tàu vớt hàng và ra rìa hồ', 'Rent a place on a salvage boat and head for the lake edge',
        'Chủ tàu đếm tiền thuê chỗ rồi đếm lại số người trên boong. Số đó đúng với con số ông ta nhớ, và ông ta có vẻ nhẹ nhõm.',
        'The boat owner counts your fare and then recounts the people on deck. The number matches the one he remembers, and he seems relieved.'),
      prepare('dungeon_great_lake', 'gate_lake_salvage_done',
        'Chi 12 Ahn mua thêm thuốc chống lạnh và áo phao dày trước khi ra khơi', 'Spend 12 Ahn on a cold-water tonic and a thicker vest before sailing',
        'Bạn trả tiền cho một bà bán thuốc ở cầu tàu. Bà gói thuốc vào lá và dặn bạn đừng hát nếu nghe thấy ai hát.',
        'You pay an old woman who sells remedies at the pier. She wraps the tonic in a leaf and tells you not to sing if you hear someone singing.'),
      decline('gate_lake_salvage_done',
        'Ở lại bến, nhận khiêng hàng từ những tàu về an toàn', 'Stay on the dock and carry cargo from the ships that come back safe',
        'Bạn khiêng thùng cả ngày dưới mưa mịn và nghe người ta kể về những chuyến chưa về. Cuối ngày, tay bạn đau hơn đầu.',
        'You carry crates all day in fine rain and listen to people talk about the voyages that have not returned. By evening your arms hurt more than your head.',
        { wealth: +8, health: -2 })
    ]
  })
];
