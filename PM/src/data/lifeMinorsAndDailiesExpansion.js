// ============================================================================
// EXPANSION LIFE MINORS AND DAILIES
// Using the concise storyKit format (M, C, O, I, D, AGE).
// Strictly follows Project Moon universe lore, bilingual (vi/en), no em-dashes.
// ============================================================================

import { M, C, O, I, D, AGE } from './storyKit.js';

const { GROWN, ANY, TEEN, ADULT, MID, OLD, KID } = AGE;

export const EXPANSION_LIFE_MINORS = [
  // --------------------------------------------------------------------------
  // NPC FRICTION & DYNAMICS MINORS (Low-bond & High-bond nuances)
  // --------------------------------------------------------------------------
  M(
    'm_exp_partner_ammo_rationing',
    GROWN,
    { npc: 'partner' },
    '[Chia đạn trước ca trực] {partner} kiểm tra hộp đạn dự phòng của đội và giữ lại hai băng đạn tốt nhất cho mình, chỉ để lại những viên đạn cũ nạp lại cho bạn.',
    '[Ammo Caching Before Shift] {partner} sorted through the reserve magazine crate, pocketing the two factory-sealed clips for themselves and sliding the hand-reloaded surplus to you.',
    [
      C(
        'Đòi chia đều đạn tiêu chuẩn theo quy định tác chiến',
        'Demand equal division of standard issue ammunition',
        '{partner} nhìn chằm chằm vào mắt bạn một lúc rồi trả lại một băng đạn tốt. Căng thẳng lắng xuống nhưng vẻ mặt họ lạnh ngắt.',
        '{partner} held your stare a long beat before sliding one good clip across. Tension deflated, leaving cold eyes.',
        { rep: 1 },
        { bond: { partner: -4 } }
      ),
      C(
        'Nhận số đạn cũ mà không phàn nàn một lời',
        'Take the reloaded rounds without a word of complaint',
        'Bạn ngồi lau từng viên đạn cũ cho sáng bóng. {partner} liếc nhìn bạn một lát rồi quay đi châm thuốc.',
        'You sat polishing each oxidized casing till it caught light. {partner} glanced your way once, then turned away to strike a match.',
        { sanity: -1 },
        { bond: { partner: 2 } }
      )
    ],
    I('Bạn không bận tâm đến đạn dược và nhét vội vào túi.', 'You paid no heed to the ammunition and shoved it into your webbing.', { sanity: -1 })
  ),

  M(
    'm_exp_partner_bounty_split_argument',
    GROWN,
    { npc: 'partner' },
    '[Mâu thuẫn chia tiền thưởng] Thân chủ vừa trả thêm một khoản Ahn ngoài hợp đồng. {partner} khăng khăng cho rằng họ xứng đáng nhận 70% vì đã nhận phát đạn nguy hiểm nhất.',
    '[Bounty Cut Dispute] The client wired an unexpected performance gratuity. {partner} insisted on taking 70% because they drew the heaviest sniper volley.',
    [
      C(
        'Đồng ý nhượng bộ 70% để duy trì hòa khí đồng đội',
        'Concede the 70% split to preserve unit cohesion',
        '{partner} cất túi tiền vào áo, thái độ hòa hoãn hơn hẳn: "Lần sau tôi sẽ nhường bạn phần lớn hơn."',
        '{partner} tucked the pouch inside their duster, tone softening: "Next run, you take the lion’s share."',
        { wealth: 2, sanity: 1 },
        { bond: { partner: 8 } }
      ),
      C(
        'Kiên quyết chia 50-50, không khoan nhượng',
        'Hold firm on an uncompromising 50-50 split',
        '{partner} đập mạnh túi tiền xuống bàn, nhận đúng một nửa rồi bỏ đi mà không thèm chào một câu.',
        '{partner} slammed the purse against the counter, snatched exact half, and walked out without goodbye.',
        { wealth: 5, sanity: -2 },
        { bond: { partner: -8 } }
      )
    ],
    I('Hai người im lặng cất phần của mình rồi rời quán.', 'Both pocketed their respective cuts in cold silence and departed.', { sanity: -1 })
  ),

  M(
    'm_exp_partner_late_relief_guard',
    GROWN,
    { npc: 'partner' },
    '[Đổi ca muộn] {partner} đến trễ gần một tiếng trong ca gác đêm giữa trời mưa tuyết Backstreets, miệng còn nồng nặc mùi rượu.',
    '[Tardy Guard Relief] {partner} arrived nearly an hour late for midnight watch amid freezing Backstreet sleet, breath smelling of tavern gin.',
    [
      C(
        'Trách mắng gay gắt về sự vô trách nhiệm chết người',
        'Harshly reprimand them for lethal negligence',
        '{partner} gắt gỏng chửi thề rồi quay lưng tựa vào tường gác. Sự bất mãn giữa hai người ngày một dày thêm.',
        '{partner} spat a coarse curse and leaned against the watchtower railing. Grudges thickened between you.',
        { sanity: -2 },
        { bond: { partner: -6 } }
      ),
      C(
        'Đưa cho họ một ngụm trà nóng rồi lẳng lặng về phòng',
        'Hand them a sip of hot tea and head down without comment',
        '{partner} ngượng ngùng nhận lấy cốc trà nóng, khẽ lẩm bẩm lời xin lỗi trong cổ họng.',
        '{partner} took the steaming mug with sheepish gaze, muttering a raspy apology into their collar.',
        { health: -1, sanity: 1 },
        { bond: { partner: 6 } }
      )
    ],
    I('Bạn buông vũ khí xuống rồi bước thẳng về giường ngủ.', 'You racked your firearm and walked straight to your cot.', {})
  ),

  M(
    'm_exp_friend_syndicate_warning',
    GROWN,
    { npc: 'friend' },
    '[Lời cảnh báo lúc nửa đêm] {friend} bí mật gõ cửa phòng bạn lúc rạng sáng, cảnh báo rằng băng nhóm của họ sắp mở chiến dịch thanh trừng ngõ này vào ngày mai.',
    '[Midnight Warning at the Sill] {friend} knocked softly at your sill before dawn, whispering that their syndicate squad is scheduled to sweep this lane tomorrow.',
    [
      C(
        'Cảm ơn {friend} và lập tức đóng gói đồ đạc tạm lánh nạn',
        'Thank {friend} and pack essentials to lie low elsewhere',
        '{friend} thở phào nhẹ nhõm vỗ vai bạn rồi biến mất vào bóng tối. Nhờ đó bạn tránh được một trận thảm sát.',
        '{friend} breathed a relieved sigh, squeezed your arm, and melted into darkness. You skirted a massacre.',
        { sanity: 2, wealth: -2 },
        { bond: { friend: 8 } }
      ),
      C(
        'Khuyên {friend} nhân cơ hội này rời bỏ tổ chức cùng bạn',
        'Urge {friend} to break ranks and slip away with you tonight',
        '{friend} lắc đầu cay đắng chỉ vào hình xăm trên cổ: "Đã vào đây thì chỉ có chết mới ra được." Họ vội vã bỏ đi.',
        '{friend} shook their head bitterly, tapping the collar tattoo: "Only a coffin exits this firm." They vanished.',
        { sanity: -2 },
        { bond: { friend: 4 } }
      )
    ],
    I('Bạn nghe xong rồi khóa chặt cửa, nằm thao thức suốt đêm.', 'You absorbed the warning, locked the bolts, and lay awake till dawn.', { sanity: -2 })
  ),

  M(
    'm_exp_friend_drunken_bar_quarrel',
    GROWN,
    { npc: 'friend' },
    '[Va chạm men say] Gặp nhau ở quán rượu rẻ tiền, {friend} say khướt và lớn tiếng trách móc rằng từ khi bạn có chút danh tiếng, bạn không còn xem họ ra gì nữa.',
    '[Drunken Tavern Grievance] Crossing paths at a dive bar, a drunken {friend} slurred accusations that ever since you made a name, you look down on old peers.',
    [
      C(
        'Kéo {friend} ra ngoài hẻm, tạt nước lạnh cho tỉnh táo',
        'Haul {friend} out back and splash cold water over their face',
        '{friend} rùng mình tỉnh rượu, ngồi bệt xuống vỉa hè cúi mặt xin lỗi vì những lời ghen tị nông nổi.',
        '{friend} shuddered awake, slumped against the damp curb, and apologized for ugly, envious slips.',
        { sanity: 1 },
        { bond: { friend: 6 } }
      ),
      C(
        'Để lại tiền thanh toán bàn rượu rồi quay lưng bỏ đi',
        'Drop coins for the tab and walk out without another word',
        '{friend} gào thét tên bạn sau lưng trong sự cười cợt của thực khách xung quanh. Khoảng cách giữa hai người thêm xa.',
        '{friend} shouted your name at your back amid the patrons’ snickers. The distance widened.',
        { wealth: -2, sanity: -3 },
        { bond: { friend: -8 } }
      )
    ],
    I('Bạn giả vờ không nghe thấy và rời khỏi quán.', 'You feigned deaf ears and slipped out the side exit.', { sanity: -1 })
  ),

  M(
    'm_exp_mentor_worn_scabbard_gift',
    GROWN,
    { npc: 'mentor' },
    '[Món quà từ Sư Phụ] {mentor} gọi bạn vào xưởng riêng, trao cho bạn một chiếc bao kiếm bọc da thuộc cổ xưa có khắc hoa văn phòng hộ của xưởng cũ.',
    '[Gift from the Master] {mentor} called you into their private smithy, presenting an antique leather scabbard inscribed with protective ward-craft.',
    [
      C(
        'Hai tay đón nhận với sự cung kính tuyệt đối',
        'Receive the heirloom with both hands in deep reverie',
        '{mentor} gật đầu mỉm cười; ngọn lửa truyền thừa giữa hai thế hệ Fixer bừng sáng trong căn phòng nhỏ.',
        '{mentor} nodded warmly; the lineage flame between two Fixer generations burned bright in the alcove.',
        { sanity: 4, rep: 2 },
        { bond: { mentor: 10 } }
      ),
      C(
        'Xin phép gửi lại một khoản Ahn biếu sư phụ dưỡng già',
        'Offer a respectful purse of Ahn for the master’s retirement',
        '{mentor} xua tay từ chối nhưng ánh mắt ánh lên vẻ ấm lòng trước lòng hiếu nghĩa của đứa đệ tử.',
        '{mentor} brushed the purse aside with a hand-wave, eyes softening at their pupil’s filial devotion.',
        { wealth: -3, sanity: 2 },
        { bond: { mentor: 8 } }
      )
    ],
    I('Bạn cất chiếc bao kiếm vào túi rồi cúi chào ra về.', 'You stowed the scabbard in your rucksack and bowed out.', { sanity: 1 })
  ),

  M(
    'm_exp_mentor_cold_reproof',
    GROWN,
    { npc: 'mentor' },
    '[Lời trách cứ nghiêm khắc] Nhìn thấy vết xước cẩu thả trên lưỡi kiếm của bạn, {mentor} gõ mạnh tẩu thuốc lên bàn: "Vũ khí là mạng sống. Lơ là chăm sóc nó là tự ký án tử cho chính mình."',
    '[Severe Chastisement] Spotting sloppy nicks along your edge, {mentor} rapped their pipe against the table: "Steel is breath. Neglecting your weapon is drafting your own death warrant."',
    [
      C(
        'Ngồi xuống lập tức mài lại lưỡi dao dưới sự chỉ dẫn của thầy',
        'Sit immediately to re-hone the blade under their critical eye',
        'Từng nhịp đá mài đều đặn vang lên; {mentor} thỉnh thoảng chỉnh lại góc cầm tay cho bạn. Tay nghề bạn thêm vững.',
        'Steady strokes whispered across the whetstone; {mentor} nudged your wrist angle periodically. Your hand steadied.',
        { sanity: 2, rep: 1 },
        { bond: { mentor: 6 } }
      ),
      C(
        'Biện bạch rằng hợp đồng quá bận rộn không có thời gian',
        'Excuse yourself that contract tempos left no margin for polish',
        '{mentor} lắc đầu thất vọng, đứng dậy quay lưng không nói thêm lời nào suốt buổi chiều.',
        '{mentor} shook their head in disappointment, turning away in silence for the rest of the dusk.',
        { sanity: -3 },
        { bond: { mentor: -8 } }
      )
    ],
    I('Bạn cất vũ khí vào bao rồi lảng tránh ánh mắt của thầy.', 'You slid the blade into leather and avoided your master’s eyes.', { sanity: -1 })
  ),

  M(
    'm_exp_spouse_burned_stew_laugh',
    GROWN,
    { npc: 'spouse' },
    '[Nồi canh cháy khét] Trở về nhà sau một ngày mưa dầm, bạn thấy {spouse} đang lúng túng mở tung cửa sổ vì nồi canh hầm bị cháy đen ở đáy.',
    '[Scorched Pot of Stew] Returning through relentless sleet, you caught {spouse} flinging the sash open, coughing amid the smoke of a blackened stew pot.',
    [
      C(
        'Bật cười, cùng {spouse} cạo phần cháy rồi ăn phần còn lại',
        'Laugh openly, scraping the crust clean to share what remains',
        'Mùi khét hòa cùng tiếng cười đùa ấm áp xua tan cái lạnh cắt da ngoài ô cửa sổ. Mái ấm bình dị giữa lòng The City.',
        'The burnt scent dissolved into shared laughter, keeping the biting freeze beyond the pane. A humble hearth in The City.',
        { sanity: 5, health: 1 },
        { bond: { spouse: 8 } }
      ),
      C(
        'Cau mày càu nhàu vì vừa mệt vừa đói mà cơm không ngon',
        'Frown and complain of exhaustion after a long grueling shift',
        '{spouse} im lặng đổ nồi canh vào xô rác rồi ngồi bó gối bên góc giường. Căn phòng chìm vào sự nặng nề.',
        '{spouse} dumped the pot into the bin without a word and pulled knees to chest by the cot. Silence turned leaden.',
        { sanity: -4 },
        { bond: { spouse: -8 } }
      )
    ],
    I('Bạn ăn vội mẩu bánh mì khô rồi đi ngủ.', 'You chewed stale crusts and turned in.', {})
  ),

  M(
    'm_exp_spouse_rainy_day_umbrella',
    GROWN,
    { npc: 'spouse' },
    '[Chiếc ô dưới cơn mưa axit] Vừa bước ra khỏi cổng trạm xe điện, bạn thấy {spouse} đang đứng nép dưới mái hiên, tay cầm sẵn một chiếc ô bọc nhựa chống ăn mòn chờ đón bạn.',
    '[Umbrella Against Acid Rain] Stepping past the rail gate, you found {spouse} waiting beneath a rusted awning, holding an anti-corrosive vinyl umbrella for you.',
    [
      C(
        'Nắm chặt tay {spouse}, cùng che chung chiếc ô về nhà',
        'Clasp {spouse}’s hand, walking home beneath the single canopy',
        'Những hạt mưa axit rào rào gõ trên mặt ô nhưng trong lòng bạn ấm áp lạ thường. Hai người kề sát bên nhau qua từng vũng nước.',
        'Acid pellets clattered upon the canopy, but an uncommon warmth filled your chest as you dodged puddles shoulder to shoulder.',
        { sanity: 6, health: 2 },
        { bond: { spouse: 10 } }
      ),
      C(
        'Trách {spouse} không nên mạo hiểm ra đường khi trời mưa độc',
        'Scold {spouse} for braving caustic weather just to wait',
        '{spouse} mỉm cười nhẹ: "Ở nhà một mình lo cho anh/em còn khó chịu hơn." Hai người rảo bước nhanh về nhà.',
        '{spouse} smiled faintly: "Pacing the floor alone was far worse." You hurried home together.',
        { sanity: 3 },
        { bond: { spouse: 6 } }
      )
    ],
    I('Bạn nhận lấy chiếc ô rồi che về nhà trong im lặng.', 'You took the handle and walked home in quiet rhythm.', { sanity: 1 })
  ),

  M(
    'm_exp_child_school_notebook_drawings',
    GROWN,
    { npc: 'child' },
    '[Những bức vẽ trong vở] Lật tập vở của con, bạn thấy ngoài các phép tính số học, con đã vẽ hình bạn đang cầm vũ khí đứng trước cửa nhà bảo vệ gia đình.',
    '[Sketches in the Ledger] Flipping through your child’s slate, beneath arithmetic columns, you found crayon drawings of you holding steel to guard the door.',
    [
      C(
        'Xoa đầu khen ngợi và treo bức vẽ lên bức tường phòng khách',
        'Ruffle their hair proudly and tack the drawing to the wall',
        'Đứa trẻ cười tít mắt đầy tự hào. Bạn cảm nhận được ý nghĩa thực sự của việc vung vũ khí sinh tồn mỗi ngày.',
        'The child beamed from ear to ear. The daily grind of brandishing steel felt rooted in clear purpose.',
        { sanity: 6 },
        { bond: { child: 10 } }
      ),
      C(
        'Dặn con không được vẽ vũ khí khi ở trường để tránh rắc rối',
        'Caution the child against sketching weapons at the academy',
        'Đứa trẻ ngoan ngoãn gật đầu lấy tẩy xóa bớt. Bạn bảo vệ con khỏi sự soi mói của các giám thị khu vực.',
        'The child nodded soberly and rubbed the crayon lines down. You spared them the scrutiny of neighborhood proctors.',
        { sanity: 2, rep: 1 },
        { bond: { child: 4 } }
      )
    ],
    I('Bạn gấp vở lại và để về bàn học của con.', 'You closed the slate and laid it on the study desk.', {})
  ),

  M(
    'm_exp_nemesis_graffiti_taunt',
    GROWN,
    { npc: 'nemesis' },
    '[Dấu sơn đe dọa trên cửa] Sáng thức dậy, bạn thấy biểu tượng đầu lâu bằng sơn đỏ của {nemesis} được vẽ ngay giữa cánh cửa căn hộ của mình.',
    '[Red Paint Taunt upon the Door] Waking early, you found {nemesis}’s crimson skull tag splashed across the dead center of your apartment door.',
    [
      C(
        'Cầm dao cạo sạch vết sơn và tăng cường bẫy ngầm trước cửa',
        'Scrape the paint clear with a chisel and rig doorway snares',
        'Bạn giữ sự bình tĩnh lạnh lùng của một tay thợ săn. Kẻ thù muốn khủng bố tinh thần bạn, nhưng chúng đã chọn nhầm đối tượng.',
        'You held the icy composure of a trapper. The enemy sought psychological rot, but knocked on the wrong iron.',
        { sanity: 2, rep: 2 },
        {}
      ),
      C(
        'Cầm vũ khí lùng sục khắp các ngõ xung quanh để tìm dấu vết',
        'Sweep neighboring alleys blade drawn hunting fresh tracks',
        'Bạn khiến lũ trinh sát của chúng phải lẩn trốn, nhưng việc thức trắng lùng sục làm cơ thể bạn thấm mệt.',
        'You sent their spotters scattering into gutters, though sweeping shadows until daybreak wore on your sinews.',
        { health: -2, sanity: -2, rep: 3 },
        {}
      )
    ],
    I('Bạn tạt xô nước rửa trôi lớp sơn rồi đi làm việc.', 'You sloshed a bucket of wash water across the wood and set off.', { sanity: -1 })
  ),

  // --------------------------------------------------------------------------
  // CAREER & VOCATIONAL MINORS (Fixer, Syndicate, Wing, Workshop)
  // --------------------------------------------------------------------------
  M(
    'm_exp_fixer_wet_coat_drying',
    GROWN,
    { jobs: ['Fixer'] },
    '[Chiếc áo khoác ướt sũng] Sau ca tuần tra dưới mưa cống ngầm, chiếc áo khoác đồng phục nặng trĩu nước bẩn. Bạn có thể đốt thêm củi hong khô hoặc mặc nguyên đi làm ca sau.',
    '[Sodden Trench Coat] After patrol in gutter downpours, your uniform duster hung heavy with brackish runoff. You can burn extra wood to dry it or wear it damp.',
    [
      C(
        'Chi thêm 2 Ahn mua than sưởi hong khô áo khoác',
        'Spend 2 Ahn on hearth charcoal to dry the wool',
        'Sáng hôm sau chiếc áo khô ráo thơm mùi khói than; bạn bước ra đường với sự thoải mái và ấm áp.',
        'By dawn the duster was crisp with charcoal fragrance; you stepped out into the frost with dry shoulders.',
        { wealth: -2, health: 1, sanity: 2 },
        {}
      ),
      C(
        'Chịu lạnh mặc áo ẩm để tiết kiệm tiền',
        'Endure damp cloth to save hard-earned coin',
        'Cơn lạnh ngấm vào vai làm các khớp xương của bạn đau nhức suốt cả ngày.',
        'The chilled fabric clung to your ribs, leaving shoulder joints aching through the shift.',
        { health: -2, sanity: -1 },
        {}
      )
    ],
    I('Bạn treo áo lên mắc và để nó khô tự nhiên.', 'You hung the coat by the peg and let drafts do what they will.', {})
  ),

  M(
    'm_exp_fixer_broken_buckle_repair',
    GROWN,
    { jobs: ['Fixer'] },
    '[Khóa giáp bị nứt] Móc khóa bằng đồng giữ bao dao bên hông bị nứt sau một cú va đập mạnh hôm qua. Tiệm thợ khóa báo giá 3 Ahn để hàn lại.',
    '[Cracked Holster Buckle] The brass latch securing your sidearm sheath hairline-fractured after yesterday’s hard parry. The locksmith wants 3 Ahn to braze it.',
    [
      C(
        'Trả 3 Ahn hàn lại mối khóa chắc chắn',
        'Pay 3 Ahn for a clean brazing repair',
        'Người thợ khóa gia cố thêm một lớp thép non; bao dao của bạn nay gắn chặt vào thắt lưng không chút xộc xệch.',
        'The smith welded a reinforcement collar; your holster anchored snug against your hip without wobble.',
        { wealth: -3, rep: 1 },
        {}
      ),
      C(
        'Dùng dây kẽm tự buộc tạm để đỡ tốn tiền',
        'Lash it tight with steel wire to bypass costs',
        'Dây kẽm cọ xát vào da hông làm bạn xước xát mỗi khi di chuyển nhanh.',
        'Twisted wire chafed against your hipbone, biting flesh whenever you broke into a sprint.',
        { health: -1, wealth: 1 },
        {}
      )
    ],
    I('Bạn nhét bao dao vào túi áo khoác cho đỡ rơi.', 'You stowed the sheath inside your coat pocket.', {})
  ),

  M(
    'm_exp_syn_whiskey_flask_toast',
    GROWN,
    { jobs: ['Syndicate'] },
    '[Ngụm rượu chia lửa] Đêm gác địa bàn lạnh cắt da, người anh em cùng tổ móc ra một bình rượu whisky lậu nồng độ cao đưa cho bạn.',
    '[Contraband Flask at the Barricade] On a freezing perimeter shift, a syndicate mate unhitched an illicit high-proof flask and passed it across.',
    [
      C(
        'Nâng bình hớp một ngụm lớn xua tan giá lạnh',
        'Take a deep swig to burn away the chill',
        'Rượu cay xé cổ họng làm bừng sáng lồng ngực; hai người đứng cạnh nhau canh gác trong sự ấm cúng.',
        'Searing spirits scorched your throat, igniting your chest; two sentries held watch in steady warmth.',
        { health: 1, sanity: 2 },
        {}
      ),
      C(
        'Lắc đầu từ chối để giữ sự tỉnh táo tuyệt đối cho mắt nhìn',
        'Decline with a nod to keep sharp night-vision eyes',
        'Người đồng đội cười khẩy nhún vai cất bình rượu. Đôi mắt bạn soi rõ từng cử động khả nghi trong ngõ tối.',
        'The comrade smirked, shrugged, and capped the flask. Your pupils caught every twitch in the shadows.',
        { rep: 1, sanity: 1 },
        {}
      )
    ],
    I('Bạn nhìn bình rượu rồi hướng mắt ra đầu phố.', 'You eyed the bottle and turned gaze back to the street mouth.', {})
  ),

  M(
    'm_exp_wing_vending_machine_malfunction',
    GROWN,
    { jobs: ['Wing Employee'] },
    '[Máy bán hàng tự động bị kẹt] Chiếc máy phân phối nước uống tăng lực của Wing nuốt mất đồng 1 Ahn của bạn mà không nhả lon nước dinh dưỡng ra.',
    '[Vending Slot Jam] The nutrient tonic dispenser on floor seven ate your 1 Ahn coin without releasing the can.',
    [
      C(
        'Tung cú đá chuẩn xác vào cạnh máy để lon nước rơi xuống',
        'Deliver a calculated boot to the chassis to dislodge the can',
        'Lon nước rơi xuống kèm theo hai gói bánh quy thừa. Bạn no nê bước vào ca làm việc chiều.',
        'The can thudded into the tray flanked by two bonus biscuits. You stepped into your shift well-fed.',
        { sanity: 2, wealth: 1 },
        {}
      ),
      C(
        'Lịch sự điền phiếu báo hỏng gửi ban hậu cần',
        'File an orderly maintenance ticket with logistics',
        'Bạn nhận được email phản hồi tự động hứa sẽ hoàn tiền sau ba tuần làm việc. Một ngày đúng chuẩn nhân viên gương mẫu.',
        'An auto-responder promised reimbursement review within three fiscal weeks. A true corporate paragon.',
        { rep: 1 },
        {}
      )
    ],
    I('Bạn thở dài bỏ đi về bàn làm việc với cơn khát.', 'You sighed and walked back to your terminal parched.', { sanity: -1 })
  ),

  M(
    'm_exp_ws_scrap_metal_bargain',
    GROWN,
    { jobs: ['Workshop Craftsman'] },
    '[Mớ sắt phế liệu từ Nest] Một phu xe đẩy qua cửa xưởng bạn một xe cút kít chứa đầy các mảnh vụn titan vứt đi từ công trường xây dựng của Corp lân cận.',
    '[Scrap Titanium Pushcart] A scavenger wheeled past your forge with a cart packed with discarded titanium trimmings from the neighboring Wing works.',
    [
      C(
        'Mặc cả mua đứt toàn bộ xe phế liệu với giá 8 Ahn',
        'Haggle the whole cartload down to a brisk 8 Ahn',
        'Lô phế liệu mang lại cho bạn nguồn hợp kim cao cấp để rèn dao găm bán kiếm lời gấp ba lần.',
        'The scrap yielded premium alloy bars to forge high-margin daggers, tripling your coin.',
        { wealth: 14, sanity: 2 },
        {}
      ),
      C(
        'Lắc đầu từ chối vì nghi ngờ nguồn gốc hàng trộm cắp',
        'Pass on the lot, wary of stolen corporate serial numbers',
        'Nửa giờ sau, đội tuần tra của Wing ập đến bắt giữ tên phu xe. Bạn thở phào vì đã tránh được một rắc rối lớn.',
        'Thirty minutes later, Wing security tackled the scavenger. You breathed easy having sidestepped a raid.',
        { rep: 2, sanity: 1 },
        {}
      )
    ],
    I('Bạn tiếp tục quai búa vào đe mà không ngẩng lên.', 'You kept your hammer ringing upon the anvil without looking up.', {})
  ),

  M(
    'm_exp_partner_field_dress_wound',
    GROWN,
    { npc: 'partner' },
    '[Băng bó dã chiến] Vừa rút lui khỏi hỏa tuyến, {partner} quỳ xuống bên cạnh, lấy cuộn gạc tiệt trùng duy nhất trong túi dã chiến để băng vết chém trên cẳng tay bạn.',
    '[Field Dressing in the Nook] Having extracted from the kill zone, {partner} knelt down, unsealing their sole sterile dressing roll to bind the shrapnel laceration on your forearm.',
    [
      C(
        'Gật đầu cảm ơn và chia cho họ điếu thuốc cuối cùng',
        'Nod in thanks, splitting your last cigarette with them',
        'Khói thuốc cuộn bay trong góc tối ẩm thấp; vết băng được quấn rất chặt và khéo léo. Tình đồng chí gắn kết.',
        'Smoke curled in the damp recess; the gauze was tied tight and expert. Camaraderie forged in lead.',
        { health: 2, sanity: 3 },
        { bond: { partner: 8 } }
      ),
      C(
        'Bảo họ giữ lấy gạc phòng khi bản thân bị thương nặng hơn',
        'Tell them to hold the dressing in case they catch worse',
        '{partner} cau mày gạt tay bạn ra: "Đừng nói nhảm. Người đứng vững mới gánh được người kia." Họ băng tiếp.',
        '{partner} brushed your palm aside with a scowl: "Shut it. The one standing carries the unit." They finished the knot.',
        { health: 2, sanity: 1 },
        { bond: { partner: 6 } }
      )
    ],
    I('Bạn để họ băng bó mà không nói gì.', 'You let them bind the wound in silence.', { health: 1 })
  ),

  M(
    'm_exp_partner_whispered_plan',
    GROWN,
    { npc: 'partner' },
    '[Mật đàm trước giờ đột kích] Trước cửa sào huyệt đối phương, {partner} kéo bạn vào góc khuất, thì thầm phương án tác chiến rẽ nhánh để bọc lót cho nhau.',
    '[Breach Whispers in the Blind Spot] Outside the hostile compound, {partner} pulled you into a shadow alcove, outlining an alternate entry vector to cover each other.',
    [
      C(
        'Đồng ý với kế hoạch tác chiến nhịp nhàng của họ',
        'Agree with their coordinated breach protocol',
        'Cả hai phối hợp ăn ý như hai bánh răng khớp nối; mục tiêu bị khống chế nhanh gọn.',
        'Both moved in tandem like interlocked cogs; the breach succeeded without a wasted step.',
        { rep: 2, sanity: 2 },
        { bond: { partner: 6 } }
      ),
      C(
        'Đề xuất tự mình làm mồi nhử để họ đột nhập từ phía sau',
        'Volunteer as point decoy while they flank from the rear',
        '{partner} nhìn bạn với ánh mắt kính nể; nhiệm vụ hoàn thành xuất sắc.',
        '{partner} caught your gaze with quiet respect; the operation resolved cleanly.',
        { rep: 3, health: -2 },
        { bond: { partner: 8 } }
      )
    ],
    I('Hai người giữ nguyên phương án cũ.', 'Both stuck to the original breach line.', {})
  ),

  M(
    'm_exp_friend_alley_tea_warmth',
    GROWN,
    { npc: 'friend' },
    '[Bát nước trà ấm trước hiên] Đi ngang qua khu trọ cũ, bạn thấy {friend} đang ngồi đun một ấm trà thảo mộc trên bếp than vụn. Họ vẫy tay gọi bạn vào ngồi cùng.',
    '[Warm Herb Infusion on the Stoop] Passing the old tenement, you spotted {friend} brewing wild herbs over a cinder brazier. They gestured you over to sit.',
    [
      C(
        'Ngồi xuống uống cạn bát nước ấm, ôn lại chuyện xưa',
        'Sit and drain the warm bowl, trading old alley memories',
        'Vị chát ngọt đọng lại nơi đầu lưỡi; những nhọc nhằn của cuộc sống mưu sinh dường như tan biến trong chốc lát.',
        'Sweet bitterness lingered on your tongue; the grinding exhaustion of survival lifted for an hour.',
        { sanity: 5, health: 1 },
        { bond: { friend: 8 } }
      ),
      C(
        'Gửi tặng họ một hộp trà ngon mua từ Nest',
        'Gift them a tin of fine tea leaves brought from the Nest',
        '{friend} ngỡ ngàng mừng rỡ, ôm chặt lấy hộp trà như một báu vật hiếm hoi.',
        '{friend} gasped in delight, clutching the tin like an uncommon relic.',
        { wealth: -2, sanity: 4 },
        { bond: { friend: 10 } }
      )
    ],
    I('Bạn vẫy tay chào rồi rảo bước qua.', 'You waved in greeting and walked on.', { sanity: 1 })
  ),

  M(
    'm_exp_friend_debt_repayment',
    GROWN,
    { npc: 'friend' },
    '[Món tiền trả nợ bất ngờ] {friend} tìm đến bạn, chìa ra một túi nhỏ chứa đúng 10 Ahn mà họ đã vay bạn từ ba năm trước khi người thân họ ốm nặng.',
    '[Surprise Repayment of Old Arrears] {friend} tracked you down, handing over a small pouch with exact 10 Ahn borrowed three winters ago when family fell ill.',
    [
      C(
        'Nhận lại tiền và khen ngợi chữ tín đáng quý của họ',
        'Accept the repayment, praising their sterling honor',
        '{friend} ngẩng cao đầu tự hào; sự tôn trọng giữa hai người bạn cũ càng thêm bền chặt.',
        '{friend} lifted their chin with proud eyes; mutual respect solidified between lifelong comrades.',
        { wealth: 10, sanity: 3 },
        { bond: { friend: 8 } }
      ),
      C(
        'Chỉ lấy một nửa, bảo họ giữ phần còn lại làm vốn mưu sinh',
        'Take only half, insisting they keep the rest as seed capital',
        '{friend} rưng rưng xúc động, cúi đầu cảm tạ tấm lòng trượng nghĩa của bạn.',
        '{friend} blinked back tears, bowing low in gratitude for your steadfast benevolence.',
        { wealth: 5, sanity: 5 },
        { bond: { friend: 12 } }
      )
    ],
    I('Bạn cất túi tiền vào túi áo.', 'You pocketed the purse without fanfare.', { wealth: 10 })
  ),

  M(
    'm_exp_mentor_sparring_breath',
    GROWN,
    { npc: 'mentor' },
    '[Nhịp thở trên sàn tập] Trong buổi luyện võ sớm, {mentor} đặt tay lên cơ hoành của bạn, chỉnh lại nhịp thở giúp bạn giải tỏa áp lực cơ bắp khi vung đòn nặng.',
    '[Diaphragm Cadence on the Sand] During morning drills, {mentor} pressed a callused palm to your diaphragm, adjusting your breath cadence to unlock fluid kinetic release.',
    [
      C(
        'Tập trung điều hòa hơi thở theo chỉ dẫn của thầy',
        'Harmonize your lung rhythm to the master’s cadence',
        'Một luồng kình lực mới mẻ chạy dọc sống lưng; đường kiếm của bạn trở nên thanh thoát và uy lực hơn.',
        'Fresh kinetic torque coursed along your spine; your strikes gained effortless poise and lethal bite.',
        { sanity: 3, rep: 2 },
        { bond: { mentor: 8 } }
      ),
      C(
        'Thử vận kình xuất hết toàn lực vào cột gỗ tập luyện',
        'Channel full kinetic torque into the ironwood training post',
        'Cột gỗ nứt toác; {mentor} khẽ mỉm cười hài lòng trước tiến bộ vượt bậc của học trò.',
        'The timber cracked clean through; {mentor} smiled faintly at their pupil’s explosive stride.',
        { sanity: 2, rep: 3 },
        { bond: { mentor: 6 } }
      )
    ],
    I('Bạn tiếp tục tập các bài quyền cơ bản.', 'You finished routine forms in quiet rhythm.', { health: 1 })
  ),

  M(
    'm_exp_mentor_old_cigar',
    GROWN,
    { npc: 'mentor' },
    '[Khói thuốc hoàng hôn] Sau buổi tập, {mentor} châm một điếu xì gà lá thô, đưa mắt nhìn về phía những tòa tháp chọc trời xa xăm của Nest.',
    '[Twilight Cigar upon the Catwalk] After drills, {mentor} lit a coarse hand-rolled cigar, resting forearms upon the rail, looking out at the distant spires of the Nest.',
    [
      C(
        'Đứng bên cạnh lặng lẽ ngắm nhìn thành phố cùng thầy',
        'Stand quietly alongside them, watching the cityscape fade',
        'Sự tĩnh lặng giữa hai thầy trò tạo nên sự thấu hiểu sâu sắc không cần đến lời nói.',
        'Silence between teacher and pupil forged quiet understanding beyond words.',
        { sanity: 4 },
        { bond: { mentor: 6 } }
      ),
      C(
        'Hỏi thầy về những trận chiến lớn nhất trong quá khứ',
        'Ask about the greatest battles fought in their prime',
        '{mentor} kể về một chiến dịch bình định Syndicate đẫm máu; kinh nghiệm chiến trường vô giá ngấm sâu vào bạn.',
        '{mentor} recounted a brutal containment campaign; invaluable field doctrine settled in your mind.',
        { sanity: 2, rep: 2 },
        { bond: { mentor: 8 } }
      )
    ],
    I('Bạn cúi chào rồi xuống cầu thang.', 'You bowed and stepped down the iron stairs.', {})
  ),

  M(
    'm_exp_spouse_rain_laundry',
    GROWN,
    { npc: 'spouse' },
    '[Thu quần áo dưới cơn mưa bất chợt] Mưa axít bất ngờ đổ xuống; bạn cùng {spouse} cuống cuồng chạy ra dây phơi thu gom những chiếc áo vừa giặt vào nhà.',
    '[Acid Sleet Laundry Scramble] A flash acid squall hit; you and {spouse} scrambled to the rooftop lines to haul wet linen inside before drops scorched.',
    [
      C(
        'Ôm trọn đống quần áo ướt che cho {spouse} chạy vào trước',
        'Shield the bundle and push {spouse} through the door first',
        'Cả hai thở hổn hển cười vang trong căn phòng nhỏ ấm cúng; quần áo thơm mùi xà phòng giặt.',
        'Both collapsed panting with breathless laughter in the dry room; fresh soap aroma filled the air.',
        { sanity: 5, health: 1 },
        { bond: { spouse: 8 } }
      ),
      C(
        'Cùng kéo tấm bạt nhựa che chắn toàn bộ dây phơi',
        'Stretch a heavy tarp across the line to save the batch',
        'Mẻ giặt được bảo vệ an toàn; hai người lau khô mặt cho nhau bên bếp lửa nhỏ.',
        'The wash hung protected beneath plastic; you wiped each other’s brow by the kettle.',
        { sanity: 4 },
        { bond: { spouse: 6 } }
      )
    ],
    I('Hai người vội vã đóng cửa sổ.', 'Both slammed the window latches.', {})
  ),

  M(
    'm_exp_spouse_shared_apple',
    GROWN,
    { npc: 'spouse' },
    '[Quả táo tươi duy nhất] Bạn mang về một quả táo tươi hiếm hoi mua từ khu chợ Nest. {spouse} cầm dao cẩn thận gọt vỏ rồi chia đôi quả táo.',
    '[The Sole Fresh Apple] You brought home a rare orchard apple purchased from the Nest border gate. {spouse} carefully peeled the skin and sliced it in two.',
    [
      C(
        'Nhường phần nửa lớn hơn cho {spouse}',
        'Nudge the larger half across the plate to {spouse}',
        '{spouse} mỉm cười gắp lại cho bạn một miếng: "Cùng ăn mới ngọt." Vị ngọt thanh khiết xoa dịu mọi cay đắng.',
        '{spouse} smiled, passing a slice back: "Sweetest shared." Pure orchard crispness softened all bitterness.',
        { sanity: 6, health: 1 },
        { bond: { spouse: 10 } }
      ),
      C(
        'Cùng ăn và chia sẻ cảm giác về hương vị của sự bình yên',
        'Eat together, savoring the taste of ordinary tranquility',
        'Một khoảnh khắc bình dị hiếm có giữa lòng The City khốc liệt.',
        'A rare sanctuary of ordinary sweetness in the heart of a cruel City.',
        { sanity: 5 },
        { bond: { spouse: 8 } }
      )
    ],
    I('Hai người ăn hết quả táo.', 'Both finished the fruit.', { sanity: 2 })
  ),

  M(
    'm_exp_child_first_wooden_knife',
    GROWN,
    { npc: 'child' },
    '[Con dao gỗ đầu đời] Ngồi bên bậc cửa, bạn dùng dao gọt một thanh gỗ sồi thành con dao găm tập luyện để tặng cho đứa con.',
    '[Whittling the Practice Dagger] Sitting on the threshold, you carved a strip of seasoned oak into a balanced practice dagger for your child.',
    [
      C(
        'Trao con dao gỗ cho con và dạy tư thế cầm chuôi chuẩn',
        'Hand the wooden blade over, drilling proper palm grip',
        'Đứa trẻ hào hứng vung dao theo từng thế thủ bạn chỉ; ánh mắt ngời sáng lòng tự tin.',
        'The child mirrored your stance with gleaming eyes; confidence took root in young bones.',
        { sanity: 5 },
        { bond: { child: 10 } }
      ),
      C(
        'Khắc tên của con lên thân dao làm kỷ niệm',
        'Carve the child’s initials along the flat of the hilt',
        'Đứa trẻ ôm con dao gỗ đi ngủ như một món bảo bối quý giá nhất trần đời.',
        'The child tucked the wooden dagger under their pillow like the world’s dearest treasure.',
        { sanity: 6 },
        { bond: { child: 12 } }
      )
    ],
    I('Bạn đặt con dao lên bàn.', 'You set the wooden knife upon the table.', { sanity: 1 })
  ),

  M(
    'm_exp_child_bedtime_city_tale',
    GROWN,
    { npc: 'child' },
    '[Chuyện kể đêm khuya] Trước khi ngủ, đứa con nắm lấy tay áo bạn, xin bạn kể một câu chuyện về những người tốt ngoài kia.',
    '[Bedtime Legend of the Alleys] Tucking in, your child tugged your sleeve, asking for a bedtime fable of heroes walking the City.',
    [
      C(
        'Kể về những hiệp sĩ Zwei Association luôn bảo vệ kẻ yếu',
        'Recount the legend of Zwei wardens shielding the weak',
        'Đứa trẻ mỉm cười chìm vào giấc ngủ với niềm tin vào ánh sáng công lý.',
        'The child drifted to sleep with a faint smile, believing in courage and justice.',
        { sanity: 5 },
        { bond: { child: 8 } }
      ),
      C(
        'Thành thật kể về những bài học sinh tồn cảnh giác',
        'Offer honest parables of vigilance and survival grit',
        'Đứa trẻ lắng nghe chăm chú, ghi nhớ những quy tắc để tự bảo vệ mình.',
        'The child listened wide-eyed, filing away rules to stay breathing.',
        { sanity: 2, rep: 1 },
        { bond: { child: 6 } }
      )
    ],
    I('Bạn hôn lên trán con rồi tắt đèn.', 'You kissed their brow and extinguished the lamp.', { sanity: 2 })
  ),

  M(
    'm_exp_nemesis_shadow_crossroads',
    GROWN,
    { npc: 'nemesis' },
    '[Bóng hình thoáng qua nơi góc chợ] Giữa đám đông chen chúc ở ngã tư, bạn thoáng thấy bóng lưng áo choàng đen quen thuộc của {nemesis} lướt qua một quầy bán dao.',
    '[Fleeting Shadow at the Crossroads] Amid jostling crowds at the intersection, you caught the familiar dark silhouette of {nemesis} gliding past a blade stall.',
    [
      C(
        'Lặng lẽ rút vũ khí luồn qua đám đông bám theo',
        'Slip steel loose and tail them through the market press',
        'Kẻ thù biến mất vào mạng lưới cống ngầm; bạn thu thập được vài vết chân định vị hướng di chuyển của chúng.',
        'The quarry dissolved into culvert gates; you mapped their patrol vectors across the ward.',
        { sanity: 1, rep: 2 },
        {}
      ),
      C(
        'Giữ nguyên vị trí quan sát, cẩn trọng kiểm tra các lối thoát',
        'Hold position, coolly verifying surrounding ambush points',
        'Bản năng cảnh giác giúp bạn nhận diện được hai tay súng yểm trợ của chúng trên gác lửng.',
        'Disciplined wariness revealed two rooftop spotters covering their retreat.',
        { sanity: 2, rep: 1 },
        {}
      )
    ],
    I('Bạn tiếp tục bước đi như không có chuyện gì.', 'You walked on as though blind to the shadow.', {})
  ),

  M(
    'm_exp_fixer_broken_strap_stitch',
    GROWN,
    { jobs: ['Fixer'] },
    '[Mũi kim dưới ánh đèn đường] Đai giữ bao súng bị rách chỉ sau cú giật mạnh; bạn ngồi dưới cột đèn đường Backstreets lấy kim chỉ thô khâu lại.',
    '[Awl and Thread Under the Streetlamp] A holster strap tore loose after a heavy grapple; you sat beneath a gas lantern stitching thick leather.',
    [
      C(
        'Dùng chỉ sáp gai khâu kép thật chắc chắn',
        'Double-stitch with waxed hemp twine for rugged bond',
        'Mối khâu đều tăm tắp và chắc như đinh đóng cột; vũ khí của bạn cố định hoàn hảo bên sườn.',
        'The stitches laid flat and hard as rivets; your sidearm anchored true against your ribs.',
        { sanity: 2, rep: 1 },
        {}
      ),
      C(
        'Khâu nhanh vài mũi tạm rồi tiếp tục ca tuần tra',
        'Tack three quick loops and resume your sweep',
        'Bạn tiết kiệm thời gian nhưng chiếc đai vẫn hơi cấn vào hông khi chạy.',
        'You saved minutes, though the leather pulled unevenly when sprinting.',
        { sanity: 1 },
        {}
      )
    ],
    I('Bạn nhét tạm vào thắt lưng.', 'You tucked the holster into your belt.', {})
  ),

  M(
    'm_exp_syn_dice_game_corner',
    GROWN,
    { jobs: ['Syndicate'] },
    '[Ván súc sắc trên thùng phuy] Các huynh đệ trong tổ Syndicate đang lắc súc sắc xương cá cược trên nắp thùng phuy dầu cũ, rủ bạn nhập cuộc.',
    '[Bone Dice on the Oil Drum] Syndicate comrades were tossing bone dice over a rusted drum head, shouting for you to buy in.',
    [
      C(
        'Đặt 2 Ahn thử vận may cùng anh em',
        'Toss 2 Ahn into the pot to test your dice luck',
        'Vận đỏ mỉm cười; bạn thắng được một mớ tiền lẻ và nhận những tiếng huýt sáo tán thưởng rôm rả.',
        'Fortune favored your throw; you swept the pot to cheerful jeers and back-slaps.',
        { wealth: 6, sanity: 2 },
        {}
      ),
      C(
        'Đứng ngoài quan sát, nhắc nhở anh em không lơ là cảnh giới',
        'Lean against the wall, reminding sentries to watch the alley',
        'Mọi người cười xòa nhưng chú ý nhìn ngó xung quanh hơn; bạn giữ kỷ luật nghiêm túc cho toán lính.',
        'They laughed it off but checked the perimeter; you maintained firm sentry discipline.',
        { rep: 2, sanity: 1 },
        {}
      )
    ],
    I('Bạn đi ngang qua thùng phuy.', 'You strolled past the drum.', {})
  ),

  M(
    'm_exp_wing_cubicle_plant',
    GROWN,
    { jobs: ['Wing Employee'] },
    '[Chậu cây nhựa trên bàn làm việc] Bạn mua một chậu cây xương rồng nhựa nhỏ 1 Ahn đặt cạnh màn hình terminal để giảm bớt sự lạnh lẽo của văn phòng Corp.',
    '[Plastic Succulent on the Terminal] You bought a 1 Ahn faux succulent for your terminal desk to break the monochrome clinical sterility.',
    [
      C(
        'Lau bụi cho chậu cây mỗi sáng đầu ca',
        'Dust the plastic leaves each morning at clock-in',
        'Màu xanh nhân tạo mang lại sự thư thái nhỏ nhoi giữa hàng ngàn dòng code và báo cáo khô khan.',
        'The artificial green offered a speck of quiet sanity amid endless data sheets.',
        { sanity: 3 },
        {}
      ),
      C(
        'Dùng chậu cây làm chỗ giấu chiếc USB dữ liệu mật',
        'Hollow the pot base to conceal a backup memory drive',
        'Một nơi giấu an toàn và kín đáo ngay trước mắt mọi người mà không ai ngờ tới.',
        'A covert dead-drop sitting in plain daylight where no inspector looks twice.',
        { network: 2, sanity: 1 },
        {}
      )
    ],
    I('Bạn để chậu cây ở góc bàn.', 'You left the pot in the corner.', {})
  ),

  M(
    'm_exp_ws_tempering_oil_change',
    GROWN,
    { jobs: ['Workshop Craftsman'] },
    '[Thay dầu tôi kim loại] Bể dầu tôi luyện trong xưởng đã đóng cặn đen kịt sau một tháng rèn đúc liên tục; bạn dành buổi chiều lọc cặn và châm dầu mới.',
    '[Skimming the Quench Tank] The oil tank was thick with carbon sludge after a month of forging; you spent dusk filtering grime and pouring fresh mineral lube.',
    [
      C(
        'Tỉ mỉ lọc sạch cặn và châm dầu khoáng chất lượng cao',
        'Filter the sludge clean and blend high-viscosity mineral lube',
        'Các mẻ thép tiếp theo được tôi luyện với độ cứng tuyệt đối và bề mặt sáng bóng không chút xỉn màu.',
        'Subsequent blades quenched with flawless tensile hardness and mirror luster.',
        { wealth: -2, merit: 2, sanity: 2 },
        {}
      ),
      C(
        'Tận dụng cặn dầu cũ để thắp sáng đèn xưởng',
        'Refine the discarded sludge to fuel workshop lanterns',
        'Xưởng rèn sáng rực suốt đêm mà không tốn thêm một xu tiền dầu thắp.',
        'The forge blazed bright all night without costing a penny in lamp oil.',
        { wealth: 2, sanity: 1 },
        {}
      )
    ],
    I('Bạn đậy nắp bể dầu lại.', 'You closed the tank lid.', {})
  ),

  M(
    'm_exp_dist_broken_mirror_stare',
    GROWN,
    { jobs: ['Distortion'] },
    '[Mảnh gương vỡ trong nhà hoang] Nhìn vào mảnh gương vỡ găm trên tường, bạn thấy con ngươi của mình phân tách thành nhiều đồng tử kỳ dị đang chuyển động độc lập.',
    '[Shattered Mirror in the Squat] Gazing into broken mirror shards upon the wall, you watched your pupils fracture into multiple facets moving independently.',
    [
      C(
        'Chấp nhận sự biến đổi, cảm nhận góc nhìn toàn cảnh của quái vật',
        'Embrace the anomaly, absorbing the monster’s panoramic sight',
        'Thị giác của bạn mở rộng ra mọi góc chết xung quanh; bóng tối không còn là rào cản.',
        'Your vision unlocked 360-degree blindspots; darkness ceased to be a barrier.',
        { sanity: -3, resonance: 4 },
        {}
      ),
      C(
        'Đấm vỡ nát mảnh gương để xua tan hình bóng méo mó',
        'Shatter the mirror shard to scatter the grotesque reflection',
        'Máu rỉ trên nắm tay nhưng lý trí con người trong bạn tạm thời được giữ vững.',
        'Blood trickled from knuckles, but mortal resolve held its ground for another dawn.',
        { health: -1, sanity: 2 },
        {}
      )
    ],
    I('Bạn quay mặt bước đi.', 'You turned away.', {})
  )
];

// ----------------------------------------------------------------------------
// EXPANSION LIFE DAILIES (Atmospheric Daily Lines across Ages & Factions)
// ----------------------------------------------------------------------------
const rowList = (prefix, age, need, list) =>
  list.map(([id, vi, en, fx = {}]) => D(`d_exp_${prefix}_${id}`, age, need, vi, en, fx));

export const EXPANSION_LIFE_DAILIES = [
  // Childhood & Youth
  ...rowList('kid', KID, {}, [
    ['puddle_reflection', 'Bạn nhảy qua một vũng nước đục ngầu ven đường, nhìn thấy khuôn mặt gầy guộc của mình tan biến trong những gợn sóng dầu loang.', 'You hopped across a murky gutter puddle, watching your hollow-cheeked reflection splinter among rainbow oil slicks.', { sanity: 1 }],
    ['stray_steam_pipe', 'Hơi nước nóng phì ra từ đường ống rỉ bên tường sưởi ấm đôi bàn tay cóng buốt của bạn trong mười giây quý giá.', 'Warm steam hissing from a corroded conduit warmed your numbed fingers for ten precious seconds.', { health: 1 }],
    ['discarded_bolt', 'Bạn nhặt được một chiếc ốc vít bằng đồng sáng bóng dưới chân cột đèn, cất vào túi như một báu vật nhỏ.', 'You found a polished brass bolt beside the lamp standard, slipping it into your hem like small treasure.', { sanity: 1 }],
    ['tin_rattle', 'Một chiếc hộp thiếc rỗng nhét đầy sỏi nhỏ trở thành món đồ chơi lắc vui tai của bạn suốt buổi chiều.', 'An empty tin stuffed with pea-gravel served as your noisy rattle all afternoon.', { sanity: 1 }],
    ['mother_shawl', 'Mùi len ẩm thoang thoảng mùi xà phòng trên khăn choàng của mẹ mang lại cảm giác an tâm tuyệt đối.', 'The scent of damp wool and lye soap upon mother’s shawl offered absolute sanctuary.', { sanity: 2 }]
  ]),

  // Teenagers in Backstreets
  ...rowList('teen', TEEN, {}, [
    ['siren_drill', 'Tiếng còi báo giờ giới nghiêm rú lên từ loa phường; bạn rảo bước thật nhanh để không bị kẹt ngoài cổng hẻm sau mười giờ.', 'The curfew horn wailed from street speakers; you picked up your pace to clear the lane before ten o’clock.', { sanity: -1 }],
    ['graffiti_layers', 'Bức tường đầu ngõ có thêm lớp sơn xịt mới đè lên tên của một nhóm côn đồ đã bị quét sạch tuần trước.', 'The corner wall gained fresh stencil paint, blotting out the tag of a gang wiped clean last Tuesday.', { network: 1 }],
    ['sharpening_stone_sound', 'Tiếng mài dao rèn rẹt từ cửa sổ tầng hai của người hàng xóm ru bạn vào giấc ngủ chập chờn.', 'The raspy hiss of whetstones from a second-story sill lulled you into fitful sleep.', { sanity: 1 }],
    ['drain_steam', 'Làn sương mù trắng xóa bốc lên từ nắp cống thoát nước sưởi ấm vạt áo khoác mỏng của bạn.', 'White vapor billowing from storm grates offered brief warmth to your thin coat.', { health: 1 }],
    ['bread_crust_toast', 'Mẩu bánh mì khô nướng sơ trên bếp dầu trở nên giòn tan trong bữa ăn tối đạm bạc.', 'A dry heel of bread toasted over a kerosene stove crunched pleasantly in your frugal supper.', { sanity: 1 }]
  ]),

  // Fixers Daily Atmosphere
  ...rowList('fixer', GROWN, { jobs: ['Fixer'] }, [
    ['scabbard_wax', 'Sáp ong bôi vào miệng bao kiếm giúp việc rút lưỡi vũ khí trở nên êm ru không một tiếng động.', 'Beeswax rubbed along the scabbard throat made your draw whisper-smooth in the cold.', { rep: 1 }],
    ['bullet_weight', 'Bạn cân từng viên đạn trên chiếc cân tiểu ly của văn phòng để loại bỏ những viên nạp thiếu thuốc súng.', 'You weighed each brass casing on the office balance to weed out undercharged powder loads.', { sanity: 1 }],
    ['stale_biscuit_canteen', 'Chiếc bánh quy cứu sinh cứng như đá ngâm trong cốc trà nguội trở thành bữa trưa duy nhất của ngày.', 'A hardtack ration soaked in cold tea served as your sole midday sustenance.', { health: 1 }],
    ['office_noticeboard', 'Bảng thông báo của văn phòng ghim đầy những tờ cáo phó của các đồng nghiệp tuần tra không quay về.', 'The office corkboard was thick with memorial notices for patrols that never checked back in.', { sanity: -1 }],
    ['blood_stain_scrub', 'Bạn mất một tiếng dùng giấm chua để tẩy sạch vết máu khô trên gấu quần sau ca trực đêm qua.', 'You spent an hour scrubbing dried arterial spray from your cuffs with sour vinegar.', { health: -1, rep: 1 }],
    ['fixer_oath_scroll', 'Tấm biểu ngữ khắc mười điều răn của Hana Association treo trên tường phòng nghỉ đã mờ nhạt theo năm tháng.', 'The framed Hana Association ten-creed banner hanging in the mess had faded with decades of soot.', { sanity: 1 }],
    ['boot_heel_iron', 'Miếng đệm sắt dưới gót ủng nện xuống nền đá hoa cương phát ra âm thanh dứt khoát của một người hành nghề.', 'The iron tap nailed beneath your boot heel struck granite with the crisp click of a working operative.', { rep: 1 }]
  ]),

  // Syndicate Daily Atmosphere
  ...rowList('syn', GROWN, { jobs: ['Syndicate'] }, [
    ['brass_knuckle_sheen', 'Bạn dùng mỡ bò đánh bóng chiếc tay gấu bằng đồng thau trước khi bước ra phố thu tiền bảo kê.', 'You rubbed tallow across brass knuckles until they caught lamplight before heading out on collection.', { rep: 1 }],
    ['tattoo_itch', 'Mực xăm biểu tượng băng nhóm trên bả vai lên da non ngứa ran trong tiết trời ẩm ướt.', 'The gang crest inked across your shoulder blade itched fiercely in the humid smog.', { health: -1, sanity: 1 }],
    ['whiskey_dregs', 'Cặn rượu rẻ tiền đọng dưới đáy ly thủy tinh sứt mẻ mang lại vị chát đắng quen thuộc của những đêm gác.', 'Cheap whiskey dregs at the bottom of a chipped tumbler left the familiar bitter tang of night watch.', { sanity: 1 }],
    ['alley_whisper_code', 'Một tiếng huýt sáo ba nhịp ở đầu ngõ báo hiệu có đội tuần tra vũ trang đang tiến vào khu vực.', 'A three-beat whistle down the lane alerted all sentries that an armored sweep was entering the block.', { network: 1 }],
    ['iron_chain_rattle', 'Tiếng xích sắt quấn quanh cổ tay va vào nút áo khoác lách cách theo từng bước chân bạn đi.', 'The iron chain coiled around your wrist clinked rhythmically against your buttons as you walked.', { rep: 1 }],
    ['syndicate_chalk_mark', 'Một vòng tròn phấn trắng vẽ cạnh nắp cống báo hiệu đây là tuyến đường an toàn cho người của nhóm.', 'A white chalk glyph marked beside the culvert signalled safe passage for outfit couriers.', { network: 1 }]
  ]),

  // Wing Employee Daily Atmosphere
  ...rowList('wing', GROWN, { jobs: ['Wing Employee'] }, [
    ['retina_scanner_flash', 'Ánh đèn đỏ của máy quét võng mạc nhấp nháy ba lần trước khi cánh cổng thủy tinh dày trượt mở.', 'The red retina laser pulsed three rapid cycles before the heavy safety glass slid apart.', { sanity: -1 }],
    ['fluorescent_hum', 'Tiếng vo ve đơn điệu của bóng đèn huỳnh quang tầng hầm làm hai bên thái dương bạn hơi căng nhức.', 'The monotonous hum of sub-floor fluorescents pressed a faint ache behind your temples.', { sanity: -1 }],
    ['synthetic_apple', 'Quả táo nhân tạo trong suất ăn trưa của căng tin có mùi vị ngọt lịm hoàn hảo nhưng không hề có hạt.', 'The synthetic apple from the corporate mess tasted impeccably sweet, devoid of a single seed.', { health: 1 }],
    ['badge_lanyard_fray', 'Dây đeo thẻ nhân viên đã sờn chỉ ở mép; bạn lấy bật lửa hơ lại để tránh bị quản đốc phạt tác phong.', 'The lanyard of your access pass had frayed; you melted the edges with a lighter to dodge demerits.', { rep: 1 }],
    ['air_filtration_odor', 'Mùi ozone nhân tạo nồng nặc từ máy lọc không khí trung tâm nhắc bạn rằng đây là một Nest tách biệt.', 'A sharp tang of ozone from the central scrubber reminded you this Nest was sealed from the mud.', { sanity: 1 }],
    ['wing_badge_chime', 'Âm thanh bíp thanh tao khi thẻ từ quét qua cửa xoay làm bạn thở phào vì đã không đi làm muộn.', 'A melodic chime as your card touched the turnstile brought relief that you beat the morning tardy bell.', { sanity: 1 }]
  ]),

  // Workshop Craftsman Daily Atmosphere
  ...rowList('ws', GROWN, { jobs: ['Workshop Craftsman'] }, [
    ['anvil_rebound', 'Độ nảy của chiếc búa tạ trên đe thép phát ra âm vang giòn giã làm rung rinh ngọn nến trên bàn rèn.', 'The crisp bounce of your sledge against anvil horn rang out, making the forge candle dance.', { merit: 1 }],
    ['quenching_steam', 'Khói hơi nước bốc lên mù mịt khi nhúng thanh đao đỏ lửa vào bể dầu cọ, mùi khen khét đặc trưng tỏa ra.', 'Acrid steam billowed as glowing steel plunged into the quench tank, smelling of scorched oil.', { sanity: 1 }],
    ['callus_trim', 'Bạn dùng lưỡi dao cạo bớt lớp chai sạn dày cộp trên lòng bàn tay để giữ cảm giác chuẩn xác khi cầm búa.', 'You shaved thickened calluses off your palm with a razor to preserve tactile grip on the hammer.', { health: -1, rep: 1 }],
    ['oil_soaked_rag', 'Chiếc giẻ lau dính đầy mỡ máy đen sì dùng để bọc bảo quản những thanh kiếm vừa mài xong.', 'A blackened, grease-stiff rag wrapped each polished edge before packing them into wooden crates.', { wealth: 1 }],
    ['tempering_glow', 'Màu rơm cháy trên mép phôi thép báo hiệu nhiệt độ tôi kim loại đã đạt đến độ dẻo dai hoàn hảo.', 'A faint straw-yellow hue across the bevel signalled the temper had reached ideal toughness.', { sanity: 1 }],
    ['workshop_bellows', 'Tiếng thở phì phò đều đặn của bễ lò rèn bằng da bò thổi bùng những đốm than đỏ rực trong đêm.', 'The rhythmic sigh of ox-hide bellows stoked glowing charcoal embers against the night chill.', { sanity: 1 }]
  ]),

  // Districts Specific Atmosphere
  ...rowList('d_flv', ANY, {}, [
    ['district_10_clock', 'Đồng hồ khổng lồ trên quảng trường District 10 điểm chuông; người qua đường đồng loạt chỉnh lại kim đồng hồ tay.', 'The central tower clock of District 10 struck; pedestrians in the square paused in unison to wind watches.', { sanity: 1 }],
    ['district_15_neon', 'Ánh đèn neon xanh đỏ của các quán bar District 15 nhấp nháy phản chiếu trên mặt đường ướt sũng.', 'Blue and amber neon signs of District 15 bars flickered across slick, rain-washed cobblestones.', { sanity: 1 }],
    ['district_4_bell', 'Tiếng chuông cổ kính từ tu viện Dieci vọng qua các ngõ hẹp, đem lại khoảnh khắc thanh tịnh hiếm có.', 'Ancient chimes from the Dieci cloister drifted down the lanes, offering an uncharacteristic moment of calm.', { sanity: 2 }],
    ['district_2_cobblestone', 'Những viên đá lát đường mòn vẹt ở District 2 đã chứng kiến hàng trăm thế hệ Fixer qua lại rồi ngã xuống.', 'The worn granite cobbles of District 2 had borne the boots of a hundred Fixer generations.', { resonance: 1 }],
    ['district_6_fog', 'Màn sương mù vàng đục đặc trưng của District 6 phủ kín các ngã tư, khiến người đi đường phải đeo kính lọc.', 'Thick sulfur fog peculiar to District 6 smothered avenues, forcing walkers behind tinted goggles.', { health: -1, sanity: 1 }],
    ['district_13_gambling_chip', 'Bạn nhặt được một đồng phỉnh cờ bạc bằng xương bị rơi cạnh nắp cống ở District 13.', 'You pocketed an ornate bone gaming token dropped beside a sewer grating in District 13.', { wealth: 1 }]
  ]),

  // Elders Daily Lines
  ...rowList('elder', OLD, {}, [
    ['morning_knee_creak', 'Khớp gối đau nhức mỗi sáng thức dậy nhắc bạn rằng cơ thể đã chịu đựng đủ phong ba của thành phố này.', 'A creaking knee at sunrise reminded you of every wet trench and gutter brawl survived in this City.', { health: -1, sanity: 1 }],
    ['warm_window_sill', 'Ngồi bên bậu cửa sổ sưởi chút nắng hiếm hoi lúc mười giờ trưa, bạn ngắm nhìn dòng người trẻ vội vã qua lại.', 'Basking in rare mid-morning sun by the sill, you watched younger folk hurry past toward danger.', { sanity: 2 }],
    ['old_scar_memory', 'Ngón tay lướt qua vết sẹo dài trên cẳng tay; bạn đã quên mất tên của kẻ chém mình năm hai mươi tuổi.', 'Fingers traced an old scar along your forearm; you could no longer recall the face that swung the steel.', { sanity: 1, resonance: 1 }],
    ['elder_sun_bench', 'Bạn ngồi trên chiếc ghế gỗ cũ đầu ngõ, cảm nhận hơi ấm yếu ớt của ánh mặt trời xuyên qua lớp khói công nghiệp.', 'Resting on a weathered wooden bench, you absorbed the faint warmth of sunlight piercing industrial smog.', { sanity: 2 }]
  ])
];
