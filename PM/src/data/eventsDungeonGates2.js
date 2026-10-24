// More ways into the dungeons. The Night in the Backstreets has one gate per Finger (each Finger
// has its own reason to be outside at 3:13), one for Fixers and Outcasts, and one for Öufi.
// Associations send their own people into the dungeon that fits their specialty; a run taken
// for the Association (`dungeonAff`) moves standing at the end, and turning it down costs a little.

const gate = ({ done, ...spec }) => ({ major: true, forbids: ['Distorted', done], ...spec });

const enter = (dungeon, done, labelVi, labelEn, resultVi, resultEn, extra = {}) => ({
  labelVi, labelEn, resultVi, resultEn, startDungeon: dungeon, flagsAdd: [done], ...extra
});

const prepare = (dungeon, done, labelVi, labelEn, resultVi, resultEn, extra = {}) => ({
  labelVi, labelEn, resultVi, resultEn, startDungeon: dungeon, dungeonPrep: 'supplies', costAhn: 12, flagsAdd: [done], ...extra
});

const decline = (done, labelVi, labelEn, resultVi, resultEn, effects, extra = {}) => ({
  labelVi, labelEn, resultVi, resultEn, effects, flagsAdd: [done], ...extra
});

const NIGHT = 'dungeon_backstreets_night';
const PREP_NIGHT = ['Chi 12 Ahn mua thuốc giữ tỉnh và một chiếc đèn bọc vải', 'Spend 12 Ahn on stay-awake tablets and a cloth-hooded lamp'];

export const DUNGEON_GATE_EVENTS_2 = [
  // ---- the last empty cells: the WARP train for a Finger or an Outcast, the Outskirts for a Wing ----
  gate({
    id: 'gate_syndicate_warp_chase', done: 'gate_syndicate_warp_chase_done', age: [20, 65], weight: 34,
    need: { jobs: ['Syndicate'] },
    vi: '[Kẻ chạy lên tàu WARP] Một người nợ máu với Finger của bạn đã mua vé tàu WARP, tin rằng mười giây là đủ để biến mất ở bờ bên kia của The City. Toa cuối còn một chỗ trống. Người giữ sổ đặt vé ấy lên bàn.',
    en: '[The one who ran for the WARP train] Someone who owes your Finger a blood debt has bought a WARP ticket, sure that ten seconds is enough to vanish on the far side of the City. The last car has one empty seat. The keeper of the ledger sets that ticket on the table.',
    choices: [
      enter('dungeon_warp_train', 'gate_syndicate_warp_chase_done', 'Cầm vé và lên toa cuối', 'Take the ticket and board the last car',
        'Cửa toa khép lại sau lưng bạn. Người kia ngồi ở đầu toa, chưa nhận ra bạn. Đồng hồ T Corp trên tường bắt đầu đếm, và bạn biết mười giây trong này không phải mười giây.', 'The car door closes behind you. Your quarry sits at the front, not yet aware of you. The T Corp clock on the wall begins to count, and you know ten seconds in here are not ten seconds.'),
      prepare('dungeon_warp_train', 'gate_syndicate_warp_chase_done', 'Chi 12 Ahn mua bình dưỡng khí và thuốc kích thích trước khi lên', 'Spend 12 Ahn on a rebreather and stimulants before boarding',
        'Người bán ở sạp cạnh ga nhìn vé của bạn rồi nhìn bạn, và bỏ thêm một ống thuốc vào túi mà không tính tiền.', 'The stall vendor by the station looks at your ticket, then at you, and drops an extra vial into the bag without charging for it.'),
      decline('gate_syndicate_warp_chase_done', 'Để người ấy đi, ghi tên lại cho lần sau', 'Let them go and note the name for next time',
        'Bạn trả vé lại cho người giữ sổ. Tên ấy vẫn nằm trong sổ, và lần sau người đi đòi sẽ không phải bạn.', 'You hand the ticket back to the keeper. The name stays in the ledger, and next time the one who collects will not be you.', { rep: -3, sanity: 2 })
    ]
  }),
  gate({
    id: 'gate_outcast_warp_cleanup', done: 'gate_outcast_warp_cleanup_done', age: [18, 65], weight: 36,
    need: { jobs: ['Outcast'] },
    vi: '[Ca dọn tàu trả công ngày] W Corp thiếu người cho đội dọn toa cuối và dán thông báo ở chợ việc làm: trả công theo ngày, không hỏi giấy tờ, phát mặt nạ khí tại ga. Hàng người xếp lại ngắn hơn bạn nghĩ.',
    en: '[A day-wage cleanup shift] W Corp is short of hands for the last-car cleanup crew and posts a notice at the labor market: paid by the day, no papers asked, rebreathers issued at the station. The line is shorter than you expected.',
    choices: [
      enter('dungeon_warp_train', 'gate_outcast_warp_cleanup_done', 'Xếp hàng nhận mặt nạ và ra ga', 'Join the line, take a mask and go to the platform',
        'Người phát mặt nạ không nhìn mặt bạn. Bạn đứng cạnh những người khác trên sân ga, không ai nói chuyện, cho tới khi cửa toa mở.', 'The one handing out masks never looks at your face. You stand on the platform with the others, no one speaking, until the car door opens.'),
      prepare('dungeon_warp_train', 'gate_outcast_warp_cleanup_done', 'Chi 12 Ahn mua thêm bình dưỡng khí từ một người vừa đi ca trước', 'Spend 12 Ahn on a spare rebreather from someone off the last shift',
        'Người bán đếm tiền rồi dặn bạn đừng nhìn vào mắt những khuôn mặt trên trần toa. Bạn hỏi vì sao. Người ấy không trả lời.', 'The seller counts the coins and tells you not to look into the eyes of the faces on the ceiling. You ask why. They do not answer.'),
      decline('gate_outcast_warp_cleanup_done', 'Bỏ hàng, tìm việc khác trong ngày', 'Leave the line and look for other work today',
        'Bạn tìm được một ca bốc vác trả nửa tiền. Tối đó bạn đọc thấy ca dọn tàu thiếu hai người lúc trở về.', 'You find a loading shift at half the pay. That evening you read that the cleanup shift came back two short.', { wealth: -2, sanity: 2 })
    ]
  }),
  gate({
    id: 'gate_wing_outskirts_survey', done: 'gate_wing_outskirts_survey_done', age: [20, 65], weight: 34,
    need: { jobs: ['Wing Employee'] },
    vi: '[Đoàn khảo sát ngoài tường] Phòng nghiên cứu của Wing gửi một đoàn ra Outskirts để lấy mẫu kim loại cổ và cần một nhân viên nội bộ đi cùng để ký biên bản. Tờ điều động ghi tên bạn bằng mực đỏ.',
    en: '[A survey beyond the wall] Your Wing’s research office is sending a team into the Outskirts to sample ancient metal and needs an in-house employee along to sign the records. The transfer slip lists your name in red ink.',
    choices: [
      enter('dungeon_outskirts_ruins', 'gate_wing_outskirts_survey_done', 'Ký nhận lệnh và lên xe đoàn khảo sát', 'Sign the order and board the survey truck',
        'Xe đoàn khảo sát chạy qua cổng tường lúc rạng sáng. Đây là lần đầu bạn thấy The City từ bên ngoài, và nó nhỏ hơn bạn nghĩ.', 'The survey truck passes the wall gate at dawn. It is the first time you have seen the City from outside, and it is smaller than you thought.'),
      prepare('dungeon_outskirts_ruins', 'gate_wing_outskirts_survey_done', 'Chi 12 Ahn mua thêm nước, dây và đèn', 'Spend 12 Ahn on extra water, rope and a lamp',
        'Thủ kho của phòng nghiên cứu bán cho bạn đồ dự phòng bằng giá nội bộ, rồi nói khẽ rằng lần trước đoàn không mang đủ nước.', 'The research storekeeper sells you spares at the staff price, then mentions quietly that the last team did not bring enough water.'),
      decline('gate_wing_outskirts_survey_done', 'Xin đổi người, chịu một vết trong hồ sơ đánh giá', 'Ask for a substitute and take a mark on your review',
        'Phòng nhân sự đổi tên bạn sang người khác. Hồ sơ đánh giá năm đó của bạn có thêm một dòng "không sẵn sàng điều động".', 'Personnel swaps your name for someone else’s. Your review that year gains a line: “unavailable for transfer.”', { rep: -2, sanity: 1 })
    ]
  }),
  gate({
    id: 'gate_wing_lcorp_research', done: 'gate_wing_lcorp_research_done', age: [20, 65], weight: 38,
    need: { jobs: ['Wing Employee'] },
    vi: '[Hồ sơ từ chi nhánh L Corp] Bộ phận nghiên cứu của Wing cần mẫu vật trong một chi nhánh L Corp bỏ hoang. Họ có bản đồ tầng trên, nhưng tầng chứa mẫu đã bị xóa khỏi hồ sơ.',
    en: '[A file from an L Corp branch] Your Wing research division needs a specimen from an abandoned L Corp branch. They have a map of the upper floor, but the specimen floor was erased from the file.',
    choices: [
      enter('dungeon_lobotomy_ruin', 'gate_wing_lcorp_research_done', 'Nhận hộp chứa mẫu và xuống chi nhánh', 'Take the specimen case and enter the branch',
        'Bạn kiểm tra khóa hộp chứa mẫu rồi bước qua cửa an ninh không còn điện.', 'You check the specimen case lock and pass through an unpowered security door.'),
      prepare('dungeon_lobotomy_ruin', 'gate_wing_lcorp_research_done', 'Chi 12 Ahn mua bộ lọc và dây dự phòng', 'Spend 12 Ahn on a filter and spare rope',
        'Kho chỉ cấp một đèn. Bạn tự mua bộ lọc và dây trước khi xuống.', 'The stores issue one lamp. You buy a filter and rope before going down.'),
      decline('gate_wing_lcorp_research_done', 'Yêu cầu đội khảo sát xác minh bản đồ trước', 'Ask the survey team to verify the map first',
        'Quản lý chuyển hồ sơ cho người khác. Bạn mất một ca phụ cấp.', 'Your manager passes the file to someone else. You lose a shift allowance.', { wealth: -4 })
    ]
  }),
  gate({
    id: 'gate_wing_lake_contract', done: 'gate_wing_lake_contract_done', age: [20, 65], weight: 36,
    need: { jobs: ['Wing Employee'] },
    vi: '[Hợp đồng kiểm định ở Great Lake] U Corp thuê Wing của bạn kiểm tra một thiết bị vừa trục vớt. Phòng pháp chế cử bạn đi cùng tàu để ký nhận tận nơi; thiết bị vẫn nằm giữa vùng sương.',
    en: '[Inspection contract on the Great Lake] U Corp hires your Wing to inspect a salvaged device. Legal sends you aboard to sign for it in person; the device is still out in the fog.',
    choices: [
      enter('dungeon_great_lake', 'gate_wing_lake_contract_done', 'Lên tàu và kiểm tra thiết bị', 'Board the ship and inspect the device',
        'Thuyền trưởng đặt trước mặt bạn sổ Luật Đại Hồ và chờ bạn đọc xong mới nhổ neo.', 'The captain puts the Lake Law book before you and waits until you finish reading to cast off.'),
      prepare('dungeon_great_lake', 'gate_wing_lake_contract_done', 'Chi 12 Ahn mua áo phao và thuốc chống lạnh', 'Spend 12 Ahn on a life vest and cold-water medicine',
        'Áo phao của tàu không vừa. Bạn mua một chiếc khác ngay tại bến.', 'The ship vest does not fit. You buy another at the dock.'),
      decline('gate_wing_lake_contract_done', 'Chỉ nhận kiểm định khi thiết bị được đưa lên bờ', 'Insist on inspecting the device ashore',
        'U Corp giao hợp đồng cho một nhân viên khác. Phòng pháp chế ghi lại lý do bạn từ chối.', 'U Corp gives the contract to another employee. Legal records why you declined.', { rep: -2 })
    ]
  }),
  gate({
    id: 'gate_wing_night_recovery', done: 'gate_wing_night_recovery_done', age: [18, 65], weight: 34,
    need: { jobs: ['Wing Employee'] },
    vi: '[Máy ghi dữ liệu mất liên lạc] Một thiết bị thử nghiệm của Wing nằm lại ngoài Backstreets khi chuông 3 giờ 13 vang lên. Bộ phận an ninh khóa cửa; phòng nghiên cứu vẫn cần dữ liệu trước sáng.',
    en: '[A recorder goes silent] A Wing test device is stranded in the Backstreets when the 3:13 bell sounds. Security locks the doors; research still needs the data by morning.',
    choices: [
      enter(NIGHT, 'gate_wing_night_recovery_done', 'Ra phố thu hồi máy ghi', 'Go out and recover the recorder',
        'Bạn đánh dấu đường về trên bản đồ rồi bước qua cửa an ninh.', 'You mark the way back on a map and step through the security door.'),
      prepare(NIGHT, 'gate_wing_night_recovery_done', ...PREP_NIGHT,
        'Bạn bọc đèn trong vải và kiểm tra pin của máy thu tín hiệu.', 'You hood the lamp and check the receiver battery.'),
      decline('gate_wing_night_recovery_done', 'Đợi đội an ninh ra phố lúc bình minh', 'Wait for security to go out at dawn',
        'Dữ liệu mất một đêm. Người quản lý trừ ca trực của bạn khỏi bảng thưởng.', 'The data loses a night. Your manager removes your shift from the bonus sheet.', { wealth: -3 })
    ]
  }),
  gate({
    id: 'gate_wing_carnival_sample', done: 'gate_wing_carnival_sample_done', age: [20, 65], weight: 32,
    need: { jobs: ['Wing Employee'] },
    vi: '[Mẫu máu dưới công viên] Phòng thí nghiệm của Wing truy tìm một mẫu máu bị chuyển vào công viên ngầm ở District 16. Người giao mẫu đã mất liên lạc; biên bản giao nhận vẫn mang chữ ký của bạn.',
    en: '[A sample beneath the park] Your Wing lab traces a blood sample to an underground park in District 16. The courier is missing; the receipt still bears your signature.',
    choices: [
      enter('dungeon_bloodfiend_carnival', 'gate_wing_carnival_sample_done', 'Theo dấu người giao mẫu xuống công viên', 'Follow the courier into the park',
        'Trên bậc thang có một hộp giữ lạnh rỗng và vệt bánh xe kéo đi vào trong.', 'An empty chilled case sits on the stairs; wheel marks lead farther in.'),
      prepare('dungeon_bloodfiend_carnival', 'gate_wing_carnival_sample_done', 'Chi 12 Ahn mua đèn và thuốc cầm máu', 'Spend 12 Ahn on a lamp and coagulant',
        'Bạn mua đồ ở quầy cuối cùng còn mở gần lối xuống.', 'You buy supplies at the last stall still open near the entrance.'),
      decline('gate_wing_carnival_sample_done', 'Báo mất mẫu và chịu điều tra nội bộ', 'Report the loss and face an internal inquiry',
        'Bạn ký biên bản mất mẫu. Phòng thí nghiệm giữ lại khoản phụ cấp tháng này.', 'You sign the loss report. The lab withholds this month’s allowance.', { wealth: -5 })
    ]
  }),
  gate({
    id: 'gate_syndicate_lake_passage', done: 'gate_syndicate_lake_passage_done', age: [20, 65], weight: 34,
    need: { jobs: ['Syndicate'] },
    vi: '[Món hàng vượt Great Lake] Người của bạn phải chuyển một kiện hàng qua District 21. Bến chính bị U Corp kiểm soát, còn người lái tàu thuê chỉ nhận đi qua vùng sương.',
    en: '[Cargo across the Great Lake] Your crew must move a consignment through District 21. U Corp controls the main docks; the hired captain will only sail through the fog.',
    choices: [
      enter('dungeon_great_lake', 'gate_syndicate_lake_passage_done', 'Lên tàu giữ kiện hàng', 'Board and guard the consignment',
        'Người lái tàu nhắc ba điều Luật Đại Hồ. Bạn buộc kiện hàng vào lan can.', 'The captain recites three Lake Laws. You lash the consignment to the rail.'),
      prepare('dungeon_great_lake', 'gate_syndicate_lake_passage_done', 'Chi 12 Ahn mua áo phao và thuốc', 'Spend 12 Ahn on a life vest and medicine',
        'Bạn tự trả tiền tiếp tế vì Capo chỉ thanh toán khi hàng cập bến.', 'You pay for supplies yourself; the Capo only settles accounts on delivery.'),
      decline('gate_syndicate_lake_passage_done', 'Giao kiện hàng lại cho Capo', 'Return the consignment to the Capo',
        'Capo nhận hàng, gọi người khác và gạch phần công của bạn.', 'The Capo takes the cargo, calls someone else, and strikes your share of the pay.', { rep: -3, wealth: -2 })
    ]
  }),
  gate({
    id: 'gate_outcast_lake_salvage', done: 'gate_outcast_lake_salvage_done', age: [18, 65], weight: 36,
    need: { jobs: ['Outcast'] },
    vi: '[Chỗ trên tàu vớt hàng] Một tàu vớt hàng ở District 21 thiếu người kéo lưới. Họ không hỏi giấy cư trú; tiền công chia theo những thùng mang về từ Great Lake.',
    en: '[A berth on the salvage boat] A District 21 salvage boat needs another pair of hands on the nets. They ask for no residence papers; pay is split by the crates brought back from the Great Lake.',
    choices: [
      enter('dungeon_great_lake', 'gate_outcast_lake_salvage_done', 'Nhận chỗ và lên tàu', 'Take the berth and board',
        'Bạn ký tên vào sổ thủy thủ, nơi nhiều cái tên cũ đã bị gạch ngang.', 'You sign the crew book beside names that have already been crossed out.'),
      prepare('dungeon_great_lake', 'gate_outcast_lake_salvage_done', 'Chi 12 Ahn mua áo phao và thuốc chống lạnh', 'Spend 12 Ahn on a vest and cold-water medicine',
        'Bạn dùng tiền dành dụm mua đồ trước khi tàu rời bến.', 'You spend your savings on supplies before the boat casts off.'),
      decline('gate_outcast_lake_salvage_done', 'Ở bến bốc hàng cho tàu khác', 'Load crates for another boat at the dock',
        'Bạn khiêng hàng đến tối, rồi nhìn con tàu rời bến qua màn sương.', 'You haul crates until dusk and watch the boat leave through the fog.', { wealth: 4, health: -2 })
    ]
  }),
  gate({
    id: 'gate_outcast_carnival_missing', done: 'gate_outcast_carnival_missing_done', age: [18, 65], weight: 34,
    need: { jobs: ['Outcast'] },
    vi: '[Người mất tích ở công viên] Người từng cho bạn trú nhờ biến mất gần công viên ngầm ở District 16. Hàng xóm chỉ tìm thấy chiếc áo của họ và một tấm vé rạp hát ướt.',
    en: '[Missing beneath the park] The person who once gave you shelter has vanished near an underground park in District 16. A neighbor found only their coat and a damp theater ticket.',
    choices: [
      enter('dungeon_bloodfiend_carnival', 'gate_outcast_carnival_missing_done', 'Mang tấm vé đi tìm họ', 'Take the ticket and search for them',
        'Bạn cất tấm vé trong túi áo rồi lần theo tiếng nhạc từ dưới cống.', 'You tuck the ticket into your coat and follow music rising from the drain.'),
      prepare('dungeon_bloodfiend_carnival', 'gate_outcast_carnival_missing_done', 'Chi 12 Ahn mua đèn và băng gạc', 'Spend 12 Ahn on a lamp and dressings',
        'Người bán thuốc nhìn tấm vé rồi đưa thêm một cuộn băng.', 'The medic sees the ticket and adds another roll of bandage.'),
      decline('gate_outcast_carnival_missing_done', 'Đưa tấm vé cho đội tìm người của Zwei', 'Give the ticket to a Zwei search team',
        'Zwei nhận tấm vé và ghi lời khai của bạn. Bạn đợi nhiều tuần mà không nghe tin.', 'Zwei takes the ticket and your statement. Weeks pass without news.', { sanity: -3 })
    ]
  }),
  // ---- Night in the Backstreets, one door per Finger ----
  gate({
    id: 'gate_night_thumb_debt', done: 'gate_night_thumb_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Thumb' },
    vi: '[Con nợ mở cửa lúc 3 giờ 13] Capo đặt sổ nợ trước mặt bạn. Một chủ tiệm chỉ mở cửa sau 3 giờ 13, vì biết không người đòi nợ nào dám ở ngoài phố lúc ấy. "The Thumb không có giờ giới nghiêm", Capo nói, rồi chờ bạn đứng dậy.',
    en: '[The debtor who opens at 3:13] The Capo sets the ledger before you. A shopkeeper only opens up after 3:13, knowing no collector would dare be in the street then. “The Thumb keeps no curfew,” the Capo says, and waits for you to stand.',
    choices: [
      enter(NIGHT, 'gate_night_thumb_done', 'Nhận sổ, ra phố trước giờ', 'Take the ledger and be in the street before the hour',
        'Bạn đứng ở đầu hẻm khi đồng hồ nhảy sang 3 giờ 13. Cánh cửa tiệm vẫn khóa. Phía sau lưng bạn, có tiếng chất lỏng bắt đầu chảy.', 'You stand at the head of the alley as the clock flips to 3:13. The shop door is still locked. Behind you, liquid begins to run.'),
      prepare(NIGHT, 'gate_night_thumb_done', ...PREP_NIGHT,
        'Thằng bé bán thuốc ở chợ đêm không hỏi bạn mua để làm gì. Nó chỉ nhìn đồng hồ rồi nhìn bạn, và bớt cho bạn một đồng.', 'The boy selling tablets at the night market does not ask what they are for. He just looks at the clock, then at you, and knocks off a coin.'),
      decline('gate_night_thumb_done', 'Xin đòi vào ban ngày, chịu mất mặt trước Capo', 'Ask to collect by day, losing face before the Capo',
        'Capo gạch tên bạn khỏi việc ấy bằng một nét chậm. Tháng sau, phần chia của bạn mỏng hơn.', 'The Capo strikes you off the job with a slow stroke. Next month your cut is thinner.', { rep: -3, wealth: -3 })
    ]
  }),
  gate({
    id: 'gate_night_index_prescript', done: 'gate_night_index_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Index' },
    vi: '[Prescript lúc nửa đêm] Một Messenger dúi vào tay bạn mảnh giấy gấp tư. Prescript chỉ có một dòng: "Đứng ở ngã tư phố Bảy từ 3 giờ 13 đến 4 giờ 34. Đếm số bộ vest đi qua. Không được chạy."',
    en: '[A midnight Prescript] A Messenger presses a folded slip into your hand. The Prescript has a single line: “Stand at the Seventh Street crossing from 3:13 to 4:34. Count the suits that pass. Do not run.”',
    choices: [
      enter(NIGHT, 'gate_night_index_done', 'Ra ngã tư và bắt đầu đếm', 'Go to the crossing and begin to count',
        'Bạn đứng đúng chỗ, chân không dịch một bước. Bộ vest đầu tiên đi qua lúc 3 giờ 14. Bạn đếm thầm: một.', 'You stand on the exact spot without shifting a foot. The first suit passes at 3:14. You count silently: one.'),
      prepare(NIGHT, 'gate_night_index_done', ...PREP_NIGHT,
        'Bạn mua đèn và thuốc, rồi đọc lại Prescript để chắc nó không cấm mang theo. Nó không cấm.', 'You buy the lamp and tablets, then reread the Prescript to be sure it does not forbid them. It does not.'),
      decline('gate_night_index_done', 'Đốt mảnh giấy và ở trong nhà', 'Burn the slip and stay indoors',
        'Mảnh giấy cháy gọn. Sáng hôm sau, một Proselyte lạ đứng đợi trước cửa nhà bạn, không nói gì, chỉ ghi chép.', 'The slip burns cleanly. The next morning an unfamiliar Proselyte waits at your door, saying nothing, only taking notes.', { sanity: -4, heat: 6 })
    ]
  }),
  gate({
    id: 'gate_night_middle_name', done: 'gate_night_middle_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Middle' },
    vi: '[Cái tên trốn trong đêm] Một cái tên trong Book of Vengeance đã sống ngoài phố suốt nhiều tháng, chỉ ló mặt lúc 3 giờ 13, vì tin rằng không người anh em nào theo nổi. Người giữ sổ gõ ngón tay lên dòng ấy và nhìn bạn.',
    en: '[The name hiding in the night] A name in the Book of Vengeance has lived in the street for months, showing their face only at 3:13, sure that no sibling would follow. The keeper of the book taps the line and looks at you.',
    choices: [
      enter(NIGHT, 'gate_night_middle_done', 'Theo cái tên ra phố lúc 3 giờ 13', 'Follow the name into the street at 3:13',
        'Bạn thấy bóng người ấy ở cuối dãy phố, quay đầu nhìn lại bạn với vẻ không tin. Rồi cả hai nghe thấy tiếng chất lỏng từ cống ngầm.', 'You see their figure at the end of the street, looking back at you in disbelief. Then you both hear the liquid in the drains.'),
      prepare(NIGHT, 'gate_night_middle_done', ...PREP_NIGHT,
        'Những người anh em góp tiền mua cho bạn đèn và thuốc. Một người buộc thêm sợi xích vàng nhỏ vào cổ tay bạn, như một lời chúc.', 'The siblings chip in for your lamp and tablets. One ties a thin gold chain to your wrist, like a blessing.'),
      decline('gate_night_middle_done', 'Đợi cái tên ấy ra ban ngày, dù mất thêm nhiều tháng', 'Wait for the name to show by day, however many months it takes',
        'Người giữ sổ không nói gì, nhưng dòng ấy được giao cho một người anh em khác. Họ trở về một mình vào sáng hôm sau.', 'The keeper says nothing, but the line goes to another sibling. They come back alone the next morning.', { sanity: -3, network: -3 })
    ]
  }),
  gate({
    id: 'gate_night_ring_material', done: 'gate_night_ring_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Ring' },
    vi: '[Âm thanh của bộ vest rách] Docent muốn một tác phẩm làm từ thứ không ai giữ được: âm thanh một bộ vest Sweeper rách ra giữa đêm. "Sweepers không để lại gì", Docent nói. "Vậy hãy mang về thứ duy nhất chúng để lại: kỷ niệm của người đã thấy."',
    en: '[The sound of a tearing suit] A Docent wants a piece made from something no one can keep: the sound of a Sweeper’s suit tearing in the night. “Sweepers leave nothing,” the Docent says. “So bring back the only thing they do leave: the memory of whoever saw.”',
    choices: [
      enter(NIGHT, 'gate_night_ring_done', 'Mang máy thu âm ra phố trước 3 giờ 13', 'Take a recorder into the street before 3:13',
        'Máy thu âm chạy rè rè trong túi áo. Bạn đứng giữa đường, như một nghệ sĩ chờ khán giả, và khán giả bắt đầu đến.', 'The recorder hisses in your coat pocket. You stand in the road like an artist awaiting an audience, and the audience begins to arrive.'),
      prepare(NIGHT, 'gate_night_ring_done', ...PREP_NIGHT,
        'Bạn mua đèn, thuốc, và một cuộn băng dự phòng. Docent nói cuộn dự phòng thường là cuộn hay nhất.', 'You buy the lamp, the tablets and a spare reel. The Docent says the spare reel is usually the best one.'),
      decline('gate_night_ring_done', 'Nói với Docent rằng tác phẩm này không đáng một mạng người', 'Tell the Docent this piece is not worth a life',
        'Docent mỉm cười như thể bạn vừa nói một điều ngây thơ đáng yêu. Tên bạn được ghi vào cột học trò chưa trưởng thành.', 'The Docent smiles as if you had said something charmingly naive. Your name is entered under the immature students.', { rep: -3, sanity: 2 })
    ]
  }),
  gate({
    id: 'gate_night_pinky_duel', done: 'gate_night_pinky_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Pinky' },
    vi: '[Lời thề lúc 3 giờ 13] Kẻ phá lời thề với bạn đã chọn giờ hẹn quyết đấu: 3 giờ 13, giữa phố, không người làm chứng. Một lời thề của Pinky không có điều khoản nào cho việc từ chối giờ hẹn.',
    en: '[An oath at 3:13] The one who broke their oath to you has named the hour of the duel: 3:13, in the street, with no witness. A Pinky oath has no clause for refusing the hour.',
    choices: [
      enter(NIGHT, 'gate_night_pinky_done', 'Ra phố đúng giờ, kiếm ở tay', 'Be in the street on the hour, sword in hand',
        'Đối thủ đã đứng chờ ở giữa phố. Hai người cúi chào. Lưỡi kiếm chưa kịp chạm nhau thì cả hai đều nghe thấy tiếng bước chân thứ ba, rồi thứ tư.', 'Your opponent is already waiting mid-street. You bow. Before the blades can meet, you both hear a third set of footsteps, then a fourth.'),
      prepare(NIGHT, 'gate_night_pinky_done', ...PREP_NIGHT,
        'Bạn mài kiếm, mua đèn, và nuốt viên thuốc đầu tiên lúc 3 giờ đúng. Đối thủ cũng sẽ làm như thế, bạn nghĩ.', 'You sharpen the blade, buy a lamp, and swallow the first tablet at exactly three. Your opponent will be doing the same, you think.'),
      decline('gate_night_pinky_done', 'Không ra phố, chấp nhận lời thề của mình bị coi là gãy', 'Stay in and accept that your own oath is counted broken',
        'Sáng hôm sau, trước cửa nhà bạn có một ngón út bằng gỗ, gãy làm đôi. Không ai trong Pinky nhắc lại chuyện này, và chính điều đó là hình phạt.', 'The next morning a wooden little finger lies broken in two at your door. No one in the Pinky mentions it again, and that is the punishment.', { rep: -5, sanity: -3 })
    ]
  }),
  gate({
    id: 'gate_night_body_retrieval', done: 'gate_night_body_done', age: [18, 70], weight: 30,
    need: { jobs: ['Fixer', 'Outcast'] },
    vi: '[Trước khi Sweepers dọn] Một người mẹ trả cho bạn mọi thứ bà có. Con bà nằm ở cuối hẻm Mười Hai từ chiều, và sau 3 giờ 13 sẽ không còn gì để chôn. Bà không khóc. Bà chỉ nhìn đồng hồ.',
    en: '[Before the Sweepers clean] A mother pays you everything she has. Her child has lain at the end of Alley Twelve since afternoon, and after 3:13 there will be nothing left to bury. She does not cry. She only watches the clock.',
    choices: [
      enter(NIGHT, 'gate_night_body_done', 'Nhận tiền và đi về phía hẻm Mười Hai', 'Take the money and head for Alley Twelve',
        'Bạn đến cuối hẻm lúc 3 giờ 11. Bạn còn hai phút, và đường về dài hơn hai phút rất nhiều.', 'You reach the end of the alley at 3:11. You have two minutes, and the way back is much longer than two minutes.'),
      prepare(NIGHT, 'gate_night_body_done', ...PREP_NIGHT,
        'Bạn tiêu một phần tiền của bà để mua đèn và thuốc. Bà gật đầu, như thể đã tính trước khoản ấy.', 'You spend part of her money on a lamp and tablets. She nods, as if she had already counted on it.'),
      decline('gate_night_body_done', 'Trả lại tiền và nói thật rằng bạn sẽ không về kịp', 'Return the money and tell her honestly you would not make it back',
        'Bà nhận lại tiền và cảm ơn bạn vì đã nói thật. Đêm ấy, bà tự đi. Bạn không biết bà có về không.', 'She takes the money back and thanks you for the truth. That night she goes herself. You never learn whether she came back.', { sanity: -6 })
    ]
  }),

  // ---- Association runs: the dungeon that fits the badge ----
  gate({
    id: 'gate_assoc_zwei_carnival', done: 'gate_assoc_zwei_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'zwei' },
    vi: '[Zwei: đội cứu hộ xuống La Manchaland] Một nhóm trẻ em mất tích được thấy lần cuối gần lối xuống công viên ngầm ở District 16. Zwei lập đội hộ tống cho người đi tìm. Phòng điều phối ghi tên bạn ở vị trí đi sau cùng.',
    en: '[Zwei: a rescue team into La Manchaland] A group of missing children was last seen near the way down to the underground park in District 16. Zwei forms an escort for the searchers. Dispatch writes your name in the rear guard.',
    choices: [
      enter('dungeon_bloodfiend_carnival', 'gate_assoc_zwei_done', 'Nhận vị trí và xuống cùng đội', 'Take the post and go down with the team',
        'Cây gậy sắt của Zwei nặng trong tay. Đội tìm kiếm đi trước, và bạn là người cuối cùng thấy cửa hầm đóng lại.', 'Zwei’s iron bar is heavy in your hand. The searchers go ahead, and you are the last to see the hatch close.', { dungeonAff: true }),
      prepare('dungeon_bloodfiend_carnival', 'gate_assoc_zwei_done', 'Chi 12 Ahn mua thêm băng gạc và đèn cho đội', 'Spend 12 Ahn on extra dressings and lamps for the team',
        'Bạn chia đèn cho từng người trong đội. Không ai cảm ơn, nhưng ai cũng cầm chặt.', 'You hand a lamp to everyone on the team. No one says thanks, but everyone grips theirs tight.', { dungeonAff: true }),
      decline('gate_assoc_zwei_done', 'Xin đổi sang ca gác trên mặt đất', 'Ask to be moved to the surface watch',
        'Phòng điều phối đổi tên bạn sang ca khác mà không hỏi. Người đi thay bạn là một Fixer trẻ hơn.', 'Dispatch moves you to another shift without asking. Whoever goes in your place is a younger Fixer.', { sanity: 1 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_dieci_ruins', done: 'gate_assoc_dieci_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'dieci' },
    vi: '[Dieci: khảo sát Ruins] Dieci xác nhận một lối xuống Ruins mới mở ngoài Outskirts. Nhà nghiên cứu cần một Fixer đi trước, ghi chép và không mang gì ra ngoài mà chưa được phép.',
    en: '[Dieci: a Ruins survey] Dieci has confirmed a newly opened way down into Ruins beyond the Outskirts. The researcher needs a Fixer to go first, take notes, and bring nothing out without permission.',
    choices: [
      enter('dungeon_outskirts_ruins', 'gate_assoc_dieci_done', 'Nhận sổ khảo sát và đi trước', 'Take the survey book and go first',
        'Nhà nghiên cứu đưa bạn cuốn sổ và một cây bút chì đã gọt sẵn. "Viết những gì bạn thấy, không phải những gì bạn nghĩ", họ dặn.', 'The researcher hands you the book and a sharpened pencil. “Write what you see, not what you think,” they say.', { dungeonAff: true }),
      prepare('dungeon_outskirts_ruins', 'gate_assoc_dieci_done', 'Chi 12 Ahn mua thêm nước và dây', 'Spend 12 Ahn on extra water and rope',
        'Đám trẻ trong nhà Dieci giúp bạn cuộn dây và nhét thêm một ổ bánh vào túi, dù không ai bảo.', 'The children in Dieci’s house help you coil the rope and tuck an extra loaf into your pack, though no one told them to.', { dungeonAff: true }),
      decline('gate_assoc_dieci_done', 'Từ chối: bạn chưa sẵn sàng cho Ruins', 'Decline: you are not ready for the Ruins',
        'Nhà nghiên cứu ghi lại, không trách. Họ nói Ruins vẫn sẽ ở đó, và bạn thì có thể không.', 'The researcher notes it without reproach. They say the Ruins will still be there, and you might not be.', { sanity: 2 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_seven_lobotomy', done: 'gate_assoc_seven_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'seven' },
    vi: '[Seven: hồ sơ trong chi nhánh sụp đổ] Một khách của Seven muốn biết chuyện gì thực sự xảy ra trong một chi nhánh L Corp đã sụp. Hồ sơ nằm ở tầng dưới, và không ai từng đi xuống mà quay lên với hồ sơ.',
    en: '[Seven: files in a collapsed branch] A Seven client wants to know what really happened inside a collapsed L Corp branch. The files are on the lower floors, and no one who went down has come back up with them.',
    choices: [
      enter('dungeon_lobotomy_ruin', 'gate_assoc_seven_done', 'Nhận hồ sơ nhiệm vụ và xuống trục thông gió', 'Take the case file and go down the ventilation shaft',
        'Bạn đọc hồ sơ nhiệm vụ một lần, rồi đốt nó như Seven dặn. Những gì cần nhớ, bạn đã nhớ.', 'You read the case file once, then burn it as Seven instructs. What needs remembering, you remember.', { dungeonAff: true }),
      prepare('dungeon_lobotomy_ruin', 'gate_assoc_seven_done', 'Chi 12 Ahn mua bộ lọc khí và đèn', 'Spend 12 Ahn on a filter mask and a lamp',
        'Người bán bộ lọc hỏi bạn xuống chi nhánh nào. Bạn không trả lời, và họ gật đầu như thể đó là câu trả lời đúng.', 'The mask seller asks which branch you are going into. You do not answer, and they nod as if that were the right answer.', { dungeonAff: true }),
      decline('gate_assoc_seven_done', 'Trả hồ sơ lại cho phòng lưu trữ', 'Return the file to the archive',
        'Seven nhận lại hồ sơ, đóng dấu "đã từ chối", và cất nó vào ngăn kéo. Bạn biết ngăn kéo ấy có tên mình.', 'Seven takes the file back, stamps it “declined” and puts it in a drawer. You know that drawer has your name on it.', { sanity: 1 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_devyat_warp', done: 'gate_assoc_devyat_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'devyat' },
    vi: '[Devyat’: một chuyến hàng đi bằng WARP] Một kiện hàng của Devyat’ phải sang được bờ kia của The City trong một ngày, và chỉ có tàu WARP đủ nhanh. Hàng phải đi ở toa cuối. Không ai trong phòng phát hàng nói vì sao.',
    en: '[Devyat’: a consignment by WARP] A Devyat’ consignment must cross the City within a day, and only the WARP train is fast enough. It has to ride in the last car. No one at dispatch says why.',
    choices: [
      enter('dungeon_warp_train', 'gate_assoc_devyat_done', 'Ôm kiện hàng vào toa cuối', 'Carry the consignment into the last car',
        'Kiện hàng nhẹ hơn bạn tưởng. Cửa toa khóa lại, và bạn nhận ra mình sẽ phải giữ nó suốt hai nghìn năm trong mười giây.', 'The consignment is lighter than you expected. The car door locks, and you realize you will have to hold it for two thousand years within ten seconds.', { dungeonAff: true }),
      prepare('dungeon_warp_train', 'gate_assoc_devyat_done', 'Chi 12 Ahn mua bình dưỡng khí và dây buộc hàng', 'Spend 12 Ahn on a rebreather and cargo straps',
        'Bạn buộc kiện hàng vào lưng bằng ba lớp dây. Người phát hàng gật đầu, lần đầu tiên tỏ ra hài lòng.', 'You strap the consignment to your back in three layers. The dispatcher nods, pleased for the first time.', { dungeonAff: true }),
      decline('gate_assoc_devyat_done', 'Đề nghị đi đường bộ, dù sẽ trễ', 'Offer to go by road, though it will be late',
        'Devyat’ từ chối đề nghị của bạn và giao kiện hàng cho người khác. Hàng đến đúng hạn. Người mang thì không.', 'Devyat’ turns down your offer and hands the consignment to someone else. It arrives on time. Its carrier does not.', { sanity: -3 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_liu_lake', done: 'gate_assoc_liu_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'liu' },
    vi: '[Liu: cả nhà ra Đại Hồ] U Corp thuê nhà Liu cho một chuyến săn cá voi, trả cho cả nhà chứ không cho từng người. Người đứng đầu đọc tên những ai sẽ lên tàu trong bữa tối. Tên bạn ở giữa danh sách.',
    en: '[Liu: the whole house to the Great Lake] U Corp hires the Liu house for a whaling run, paying the house rather than each person. The head reads out who will board at dinner. Your name is in the middle of the list.',
    choices: [
      enter('dungeon_great_lake', 'gate_assoc_liu_done', 'Lên tàu cùng cả nhà', 'Board with the house',
        'Cả nhà đứng chật boong tàu, áo phao buộc chéo. Ai đó bắt đầu hát, và tiếng hát át đi tiếng chuông Luật Đại Hồ trong một lúc.', 'The whole house crowds the deck, life vests strapped crosswise. Someone starts singing, and for a while the song drowns the Lake Law bells.', { dungeonAff: true }),
      prepare('dungeon_great_lake', 'gate_assoc_liu_done', 'Chi 12 Ahn mua thêm lao móc và thuốc', 'Spend 12 Ahn on extra harpoons and medicine',
        'Bạn chia lao móc cho những người trẻ nhất trong nhà. Họ cầm như cầm quà.', 'You share the harpoons among the youngest of the house. They hold them like presents.', { dungeonAff: true }),
      decline('gate_assoc_liu_done', 'Xin ở lại giữ nhà', 'Ask to stay and keep the house',
        'Người đứng đầu đồng ý, không hỏi lý do. Khi tàu về, cả nhà kể chuyện suốt ba bữa tối, và bạn chỉ có thể nghe.', 'The head agrees without asking why. When the ship returns, the house tells stories for three dinners, and you can only listen.', { sanity: 2 }, { affStanding: -5 })
    ]
  }),
  gate({
    id: 'gate_assoc_oufi_night', done: 'gate_assoc_oufi_done', age: [18, 75], weight: 44,
    need: { jobs: ['Fixer'], aff: 'oufi' },
    vi: '[Öufi: bản án chỉ thi hành được lúc 3 giờ 13] Một kẻ phá hợp đồng đã học được rằng người thi hành Öufi cũng phải ở trong nhà khi Night in the Backstreets đến. Kẻ ấy chỉ ra đường vào giờ đó. Bản án của bạn có hiệu lực mọi giờ.',
    en: '[Öufi: a verdict only enforceable at 3:13] A contract breaker has learned that Öufi’s enforcers must also be indoors when the Night in the Backstreets comes. They only go out at that hour. Your verdict is valid at every hour.',
    choices: [
      enter(NIGHT, 'gate_assoc_oufi_done', 'Mang bản án ra phố đúng giờ', 'Carry the verdict into the street on the hour',
        'Áo choàng Öufi nặng hơn trong đêm. Bạn đọc thầm điều khoản một lần, rồi bước ra khi đồng hồ nhảy sang 3 giờ 13.', 'Öufi’s coat is heavier at night. You read the clause silently once, then step out as the clock flips to 3:13.', { dungeonAff: true }),
      prepare(NIGHT, 'gate_assoc_oufi_done', ...PREP_NIGHT,
        'Thủ kho của Öufi cấp đèn và thuốc cho bạn, kèm một biên bản ghi rõ số lượng. Bạn ký nhận.', 'Öufi’s storekeeper issues you a lamp and tablets, with a receipt listing the quantities. You sign for them.', { dungeonAff: true }),
      decline('gate_assoc_oufi_done', 'Ghi vào biên bản rằng bản án không thể thi hành an toàn', 'Record that the verdict cannot be enforced safely',
        'Öufi chấp nhận biên bản của bạn, nhưng ghi thêm một dòng bên dưới: "Người thi hành đã chọn an toàn".', 'Öufi accepts your record, but adds a line beneath: “The enforcer chose safety.”', { sanity: 1 }, { affStanding: -5 })
    ]
  }),

  // ---- what you carried out comes back ----
  {
    id: 'csq_dungeon_trophy_kept', age: [18, 99], major: true, weight: 0, causalOnly: true, requires: ['KeptDungeonTrophy'],
    vi: '[Thứ mang lên từ bên dưới] Một người lạ chờ bạn ở quán quen. Họ biết bạn đã xuống đâu, và biết bạn đã mang thứ gì lên. Họ không đe dọa. Họ đặt lên bàn một phong bì dày, và một tấm ảnh chụp cửa nhà bạn.',
    en: '[What came up from below] A stranger waits for you at your usual bar. They know where you went down, and what you brought back up. They do not threaten. They set a thick envelope on the table, and a photograph of your front door.',
    choices: [
      { labelVi: 'Bán cho họ và nhận phong bì', labelEn: 'Sell it to them and take the envelope',
        resultVi: 'Bạn giao món đồ vào ngày hôm sau. Người lạ kiểm tra nó bằng găng tay, gật đầu, và biến mất vào đám đông. Tấm ảnh cửa nhà bạn ở lại trên bàn.', resultEn: 'You hand it over the next day. The stranger examines it in gloves, nods, and vanishes into the crowd. The photograph of your door stays on the table.',
        effects: { wealth: 18, sanity: -2 }, flagsRemove: ['KeptDungeonTrophy'] },
      { labelVi: 'Giữ lại, trả phong bì và tấm ảnh', labelEn: 'Keep it, and hand back the envelope and the photograph',
        outcomes: [
          { w: 60, resultVi: 'Người lạ cất phong bì, nói rằng họ hiểu, và rời đi. Cả tháng sau không có gì xảy ra. Thứ bạn giữ vẫn nằm trong ngăn kéo, đôi khi ấm lên.', resultEn: 'The stranger pockets the envelope, says they understand, and leaves. Nothing happens for a month. What you kept lies in the drawer, sometimes growing warm.',
            effects: { resonance: 8, sanity: -3 } },
          { w: 40, resultVi: 'Một tuần sau, cửa nhà bạn bị cạy. Kẻ đột nhập không tìm được thứ họ muốn, vì bạn đã mang nó theo người. Họ để lại tấm ảnh thứ hai.', resultEn: 'A week later your door is forced. The intruder does not find what they wanted, because you carry it on you. They leave a second photograph.',
            effects: { heat: 12, sanity: -6, resonance: 6 } }
        ] },
      { labelVi: 'Giao nó cho Hana hoặc Association của bạn', labelEn: 'Hand it over to Hana or your Association',
        resultVi: 'Bạn mang món đồ đến văn phòng và ký vào ba tờ giấy. Người lạ không bao giờ xuất hiện ở quán quen nữa. Ai đó trong văn phòng nhìn bạn với chút kính nể.', resultEn: 'You bring it to the office and sign three forms. The stranger never shows up at your bar again. Someone in the office looks at you with a little respect.',
        effects: { rep: 6, sanity: 3 }, affStanding: 6, flagsRemove: ['KeptDungeonTrophy'], meritAdd: 6 }
    ]
  },
  // ---- a second way in for the two Fingers that had one gate fewer than the rest
  gate({
    id: 'gate_lake_thumb_cargo', done: 'gate_lake_thumb_cargo_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Thumb' },
    vi: '[Lô đạn qua mặt hồ] Capo cần một lô đạn đi qua Great Lake mà không ghi vào sổ của Hana. Người lái đò quen đã ốm, và chiếc thuyền duy nhất còn nổi đang neo ở bến District 21. Capo không nói chiếc thuyền ấy có về một mình hay không.',
    en: '[A shipment across the lake] Your Capo needs a lot of ammunition taken over the Great Lake without entering Hana’s books. The regular ferryman is ill, and the only boat afloat is moored at the District 21 dock. The Capo does not say whether that boat comes back alone.',
    choices: [
      enter('dungeon_great_lake', 'gate_lake_thumb_cargo_done', 'Nhận lô hàng và tự chèo thuyền ra khơi', 'Take the cargo and row the boat out yourself',
        'Mặt nước đen đến mức bạn không thấy mái chèo. Từ xa, những cọc neo rung theo một nhịp không phải của sóng.', 'The water is so dark you cannot see the oars. From far off the mooring posts shake to a rhythm that is not the waves.'),
      prepare('dungeon_great_lake', 'gate_lake_thumb_cargo_done', 'Chi 12 Ahn mua dây neo và đèn chống sương', 'Spend 12 Ahn on mooring line and a fog lamp',
        'Người bán dây đưa bạn cuộn tốt nhất của mình mà không hỏi gì, rồi dặn đừng đáp lại bất kỳ tiếng gọi nào từ dưới nước.', 'The rope seller gives you his best coil without asking, then tells you not to answer any call from beneath the water.'),
      decline('gate_lake_thumb_cargo_done', 'Báo Capo rằng bạn không biết bơi', 'Tell the Capo you cannot swim',
        'Capo nhìn bạn một lúc rồi giao lô hàng cho người khác. Tên bạn không còn nằm ở dòng đầu trong sổ giao việc.', 'The Capo looks at you a moment, then gives the cargo to someone else. Your name is no longer on the first line of the assignment book.', { rep: -3, wealth: -2 })
    ]
  }),
  gate({
    id: 'gate_lobotomy_ring_relic', done: 'gate_lobotomy_ring_relic_done', age: [18, 70], weight: 40,
    need: { jobs: ['Syndicate'], finger: 'Ring' },
    vi: '[Mảnh còn lại của L Corp] Maestro nghe nói trong tàn tích L Corp còn một tấm kính chưa vỡ, trong đến mức như không có ở đó. Họ muốn nó cho tác phẩm kế tiếp, và không nói ai đã đi lấy nó trước bạn.',
    en: '[What is left of L Corp] The Maestro has heard that in the ruins of L Corp one pane of glass remains unbroken, so clear it seems not to be there. They want it for the next work, and do not say who went for it before you.',
    choices: [
      enter('dungeon_lobotomy_ruin', 'gate_lobotomy_ring_relic_done', 'Nhận bản đồ cũ và vào tàn tích', 'Take the old map and enter the ruins',
        'Bản đồ ghi các hành lang bằng nét chữ của một người đã chết. Có hành lang không còn ở đó nữa, và có hành lang khác chưa từng có.', 'The map marks the corridors in a dead person’s hand. Some corridors are no longer there, and some others never were.'),
      prepare('dungeon_lobotomy_ruin', 'gate_lobotomy_ring_relic_done', 'Chi 12 Ahn mua mặt nạ lọc và một cuộn băng đánh dấu đường', 'Spend 12 Ahn on a filter mask and a roll of marking tape',
        'Người bán băng dặn: dán mỗi ba bước, và nếu một dải biến mất thì quay lại ngay.', 'The tape seller tells you: stick a strip every three paces, and if one vanishes turn back at once.'),
      decline('gate_lobotomy_ring_relic_done', 'Nói với Maestro rằng tác phẩm không cần thứ trong suốt', 'Tell the Maestro the work needs nothing transparent',
        'Maestro im lặng một lúc lâu rồi ghi gì đó vào sổ phác thảo. Lần sau họ giao việc này cho một Student khác.', 'The Maestro is silent a long while, then writes something in a sketchbook. Next time they give the job to another Student.', { rep: -2, sanity: 1 })
    ]
  })
];
