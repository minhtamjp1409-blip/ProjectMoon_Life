// ============================================================================
// DISTRICTS 5, 15 AND 26, AND LIFE AFTER DISTORTION: daily lines and minor choices.
// E Corp and O Corp have no official lore yet, so their Singularities here are
// this game's adaptation (marked `adapted` in worldData). District 26 keeps to
// the one canon fact: it exists and is not on the map.
// Every entry opens with [Title] so splitTitle extracts a distinct tag for the UI card.
// ============================================================================

const D = (id, age, need, vi, en, fx = {}, extra = {}) => ({ id, age, need, vi, en, fx, ...extra });
const M = (id, age, need, vi, en, choices, ignore, extra = {}) => ({ id, age, need, vi, en, choices, ignore, ...extra });
const C = (vi, en, rvi, ren, fx = {}, extra = {}) => ({ vi, en, rvi, ren, fx, ...extra });
const O = (w, rvi, ren, fx = {}, extra = {}) => ({ w, rvi, ren, fx, ...extra });
const I = (rvi, ren, fx = {}, extra = {}) => ({ vi: 'Để nó trôi qua', en: 'Let it pass', rvi, ren, fx, ...extra });

const INF = [0, 3];
const CHILD = [7, 11];
const TEEN = [12, 17];
const GROWN = [18, 140];
const ANY = [4, 140];

const E = { regions: ['E'] };
const O15 = { regions: ['O'] };
const Z = { regions: ['Z'] };
const DIST = { flags: ['Distorted'] };

export const LIFE_DAILIES_3 = [
  // ----------------------------------------------- District 5, no night
  D(
    'r_e_cloth',
    INF,
    E,
    '[Dải bịt mắt District 5] Mẹ bạn tỉ mỉ khâu một dải vải nhung đen dày dặn để buộc chặt lên mắt bạn mỗi khi chuẩn bị đi ngủ. Ở District 5 nơi ánh sáng vĩnh cửu không bao giờ tắt, dải vải che mắt là món quà đầu đời thiêng liêng nhất của mọi đứa trẻ.',
    '[District 5 Blindfold] Mother carefully stitched a thick strip of black velvet to bind across your eyes whenever it was time for sleep. In District 5 where perpetual daylight never fades, an eye-cloth is the sacred first gift given to every newborn.',
    { sanity: 1 }
  ),
  D(
    'r_e_moon',
    CHILD,
    E,
    '[Bức vẽ mặt trăng chưa từng thấy] Trẻ con ở District 5 luôn học vẽ quả cầu mặt trời chói chang trước khi học cách vẽ mái nhà. Khi giáo viên yêu cầu cả lớp thử vẽ lại hình dáng mặt trăng, không một đứa trẻ nào biết phải đặt nét bút bắt đầu từ đâu.',
    '[The Unseen Moon Canvas] Children in District 5 learn to sketch the blazing sun long before drawing a simple house. When the teacher asked the class to paint the moon, not a single pupil had the faintest clue where to begin.',
    { sanity: -1 }
  ),
  D(
    'r_e_dark_room',
    GROWN,
    E,
    '[Bốn giờ phòng cách sáng] Bạn cắn răng chi trả 2 đồng Ahn quý giá để được nằm bốn giờ bên trong một phòng ngủ cách nhiệt tuyệt đối không có ánh sáng. Sau ba giờ ngủ say, bạn nằm mở trừng trừng mắt ngắm nhìn màn đêm nhân tạo, chỉ vì tiếc số tiền vừa bỏ ra.',
    '[Four Hours in a Dark Pod] You spent two precious Ahn for four hours inside a lightproof subterranean sleep cell. After three hours of deep slumber, you lay wide awake staring into absolute darkness, simply because you had paid for it.',
    { wealth: -2, health: 3 }
  ),
  D(
    'r_e_harvest',
    GROWN,
    E,
    '[Ruộng cao sản E Corp] Khu vực nông trường khép kín dưới ánh sáng nhân tạo của E Corp tấp nập thu hoạch vụ mùa thứ năm liên tiếp trong năm. Sản lượng tăng vọt nhưng giá rau xanh ngoài chợ không hề giảm một xu; chỉ có những người nông dân lao động là ngày càng gầy rộc đi.',
    '[E Corp Indoor Harvest] The artificial-light agrarian domes of E Corp brought in their fifth bumper harvest of the cycle. Vegetable prices never dropped an Ahn; only the laborers working the hydroponic trays grew increasingly emaciated.',
    { wealth: 1, health: -1 }
  ),
  D(
    'r_e_flicker',
    ANY,
    E,
    '[Bốn phút chớp tắt trên bầu trời] Nguồn năng lượng cực quang trên bầu trời District 5 bất ngờ chập chờn vụt tắt trong đúng bốn phút do sự cố kỹ thuật. Cả con phố đang ồn ào bỗng đứng sững lại trong bóng tối hoang mang; có người hoảng loạn khóc ròng, có kẻ chửi rủa, và một đứa bé vỗ tay cười thích thú.',
    '[Four Minutes of Dark Sky] The perpetual ceiling radiance over District 5 abruptly sputtered and died for four long minutes. The entire street froze in chaotic bewilderment; some wept in terror, thugs cursed the dark, and an innocent child clapped in awe.',
    { sanity: -1, resonance: 2 }
  ),

  // ----------------------------------------------- District 15, signatures with a pulse
  D(
    'r_o_record',
    INF,
    O15,
    '[Bản khai sinh bảy điều khoản] Giấy khai sinh công dân của bạn ở District 15 có tới bảy điều khoản pháp lý ràng buộc chặt chẽ. Điều khoản thứ năm quy định rõ cha mẹ có nghĩa vụ cấp dưỡng cho bạn đến tròn mười hai tuổi; sau dấu mốc đó, trang giấy hoàn toàn để trống.',
    '[Seven-Clause Birth Certificate] Your birth record in District 15 was codified with seven binding legal stipulations. The fifth clause decreed that your guardians were obligated to nurture you until age twelve; past that date, the ledger fell dead silent.',
    { sanity: -1 }
  ),
  D(
    'r_o_lawyer_kid',
    CHILD,
    O15,
    '[Con của luật sư hợp đồng] Đứa trẻ được cả lớp học nể sợ và kiêng dè nhất chính là con của một luật sư chuyên trách hợp đồng O Corp. Nó đã biết đọc vanh vách từng dòng chữ in siêu nhỏ từ năm lên sáu tuổi, và tuyệt đối không bao giờ cho bất cứ ai mượn bút mực của mình.',
    '[The Contract Lawyer’s Child] The most revered child in class was the offspring of an O Corp contract attorney. They could decipher microscopic legal fine print at six years old, and refused ever to lend their writing pen to anyone.',
    { network: 1 }
  ),
  D(
    'r_o_first_sign',
    TEEN,
    O15,
    '[Chữ ký đầu đời tuổi mười hai] Mười hai tuổi là thời điểm công dân District 15 chính thức được quyền đặt bút ký bản hợp đồng pháp lý đầu tiên. Cha mẹ bắt bạn phải đọc to dõng dạc từng câu từng chữ trong bản hợp đồng mẫu ba lần trước khi cho phép ngón tay bạn chạm vào cán bút.',
    '[First Contract Signature] Twelve is the legal milestone when District 15 youths are granted the right to ink their first pact. Your guardians forced you to recite every clause of a sample indenture aloud three times before touching the stylus.',
    { sanity: 1, network: 1 }
  ),
  D(
    'r_o_neighbor_voice',
    ANY,
    O15,
    '[Mất giọng theo điều khoản số 9] Ông lão hàng xóm neo đơn chậm nộp khoản tiền nợ quá hạn ba ngày theo giấy khế ước. Sáng nay giọng nói của ông hoàn toàn biến mất theo đúng chế tài của điều khoản số 9; ông chỉ có thể viết vội lên tấm bảng gỗ trước cửa dòng chữ: "Tôi vẫn ổn."',
    '[Default of Clause 9] The elderly neighbor defaulted on his loan repayment by three full days. This morning his vocal cords went dead silent, precisely as enforced by penalty clause 9; he hung a chalk placard outside his door: “I am fine.”',
    { sanity: -2 }
  ),
  D(
    'r_o_lease',
    GROWN,
    O15,
    '[Hợp đồng thuê nhà 41 trang] Bản hợp đồng thuê trọ của bạn ở District 15 dày tới 41 trang giấy với hàng ngàn điều mục rắc rối. Bạn kiên nhẫn đọc kỹ từng dòng; ở mảnh đất này, những kẻ lười đọc hợp đồng sớm muộn gì cũng sẽ bị tước đoạt sạch các ngón tay để lật giở trang giấy.',
    '[Forty-One Page Lease] Your residential rental contract spanned forty-one dense parchment folios of tortuous sub-clauses. You scrutinized every line; in District 15, careless tenants eventually lose the very fingers needed to turn the page.',
    { sanity: -1, network: 1 }
  ),

  // ----------------------------------------------- District 26, not on the map
  D(
    'r_z_quiet',
    INF,
    Z,
    '[Đêm tĩnh lặng nơi vô hình] Màn đêm ở vùng đất nơi bạn sinh ra tĩnh mịch đến lạ kỳ. Nơi đây không có tiếng còi báo động rít gào của Wing, cũng chẳng có tiếng tàu hỏa ầm ầm xé gió; người lớn khẽ bảo rằng đó là vì chẳng một ai trong The City biết đường tìm tới đây.',
    '[Silent Unmapped Night] Nights in the forgotten cradle of your birth were eerily peaceful. No howling corporate sirens, no rumbling locomotives; elders murmured that it remained tranquil solely because nobody in the City knew the road here.',
    { sanity: 2 }
  ),
  D(
    'r_z_map',
    CHILD,
    Z,
    '[Vùng đất không có trên bản đồ] Thầy giáo treo một tấm bản đồ The City khổ lớn lên bảng lớp học. Bạn căng mắt tìm kiếm mải miết nhưng tuyệt nhiên không thấy bóng dáng quê hương mình đâu; thầy giáo khẽ đặt tay lên vai bạn và thở dài: "Đừng tìm nữa em à."',
    '[The Ghost Map] The schoolmaster unfolded a massive cartographic atlas of the City across the classroom wall. You searched in vain for your neighborhood’s district letter; the teacher rested a solemn hand upon your shoulder and whispered: “Cease searching, child.”',
    { sanity: -1, resonance: 1 }
  ),
  D(
    'r_z_letter',
    GROWN,
    Z,
    '[Bức thư không nơi gửi đến] Bạn cẩn thận gửi một lá thư tay cho người bạn quen cũ đang sinh sống ở District 11. Ba tuần sau bức thư bị chuyển trả về nguyên vẹn chưa từng bóc mở, bên ngoài đóng một con dấu đỏ thẫm lạnh lùng: "Không thể xác định được địa chỉ của người gửi."',
    '[Undeliverable Return Letter] You dispatched a handwritten letter to a companion residing across in District 11. Three weeks later it was returned unopened to your doorstep, stamped in scarlet ink: “Sender’s address coordinates do not exist.”',
    { network: -1, sanity: -1 }
  ),
  D(
    'r_z_directions',
    ANY,
    Z,
    '[Lời chỉ đường tan biến] Một vị lữ khách lạ mặt dừng chân hỏi bạn phương hướng để tìm đường đi về phía District 26. Bạn nhiệt tình chỉ rõ từng khúc rẽ; nhưng ngay khi người đó vừa quay lưng cất bước, tâm trí bạn bỗng mờ mịt không sao nhớ nổi mình vừa chỉ về hướng nào.',
    '[The Forgotten Compass] A wandering stranger paused to ask you directions to reach District 26. You clearly guided them through every turn; yet the moment their silhouette faded, your own recollection blurred, unable to recall which way you pointed.',
    { resonance: 2 }
  ),

  // ----------------------------------------------- after Distortion
  D(
    'd_dist_mirror',
    ANY,
    DIST,
    '[Chiếc gương chậm nửa nhịp] Bạn không còn dám nhìn vào bất kỳ tấm gương soi nào nữa. Không phải vì bạn sợ hãi dung mạo quái dị của bản thân, mà bởi vì thực thể phản chiếu bên trong mặt kính cứ luôn chuyển động chậm hơn cơ thể bạn đúng nửa nhịp thở.',
    '[The Lagging Mirror] You stopped peering into reflective glass altogether. Not out of disgust for your warped visage, but because the presence staring back in the pane moved half a heartbeat behind your actual flesh.',
    { sanity: -1, resonance: 1 }
  ),
  D(
    'd_dist_hunger',
    ANY,
    DIST,
    '[Cơn đói khát dị dạng] Bạn vẫn nhai nuốt thức ăn hàng ngày, nhưng lồng ngực không bao giờ cảm thấy no nê. Cơn đói khát thực sự bên trong linh hồn chỉ tạm thời lắng dịu mỗi khi bạn bước lại gần những tà niệm và bi kịch đã biến bạn thành Distortion.',
    '[Abnormal Soul Hunger] You still consume mundane rations, yet satisfaction never settles in your gut. That hollow inner void only quiets when you walk near the psychic agony that triggered your Distortion.',
    { health: 2, sanity: -1 }
  ),
  D(
    'd_dist_rhyme',
    ANY,
    DIST,
    '[Bài đồng dao của lũ trẻ] Lũ trẻ con lang thang trong con ngõ đã sáng tác ra một bài vè kỳ quặc mang tên bạn. Chúng vừa nhảy dây vừa đồng thanh hát vang giai điệu quái dị ấy giữa trưa hè, mà không hề hay biết rằng bạn đang nấp trong bóng tối lắng nghe.',
    '[Children’s Skipping Rhyme] Alley urchins devised a sinister nursery rhyme centered upon your monstrous moniker. They chanted its grim verses while skipping rope in the noon heat, unaware that your grotesque form crouched in the dark listening.',
    { rep: 1, sanity: -1 }
  ),
  D(
    'd_dist_notice',
    ANY,
    DIST,
    '[Lệnh truy lùng của Hana] Hiệp hội Hana chính thức niêm phong một bản thông báo truy nã về cá thể của bạn lên bảng tin của Văn phòng Fixer gần nhất. Bức họa phác thảo hoàn toàn không giống dung nhan của bạn, và điều ấy lại càng khiến bạn cảm thấy kinh hoàng hơn.',
    '[Hana Suppression Notice] Hana Association tacked an urgent suppression advisory regarding your entity upon the nearest Office board. The composite sketch looked nothing like your face, and that grotesque discrepancy terrified you all the more.',
    { heat: 2 }
  ),
  D(
    'd_dist_hour',
    ANY,
    DIST,
    '[Khoảnh khắc trở lại hình người] Có những giờ khắc ngắn ngủi khi cơ thể bạn tạm thời lấy lại nhân hình nguyên vẹn, thường là vào lúc rạng sáng tĩnh mịch. Bạn vội vã dùng chút thời gian quý giá ấy nắn nót viết lại tên những người thân quen mà mình còn nhớ; nhưng bản danh sách ấy cứ ngắn dần sau mỗi tháng.',
    '[The Fleeting Human Dawn] There are rare, quiet hours near daybreak when your human silhouette briefly reasserts itself. You frantically spend them scribbling down the names of loved ones you still remember; yet the ledger dwindles with every cycle.',
    { sanity: 2, network: -1 }
  )
];

export const LIFE_MINORS_3 = [
  // ----------------------------------------------- District 5
  M(
    'm3_e_dark_inn',
    [16, 60],
    E,
    '[Nhà trọ cách sáng tuyển người] Một nhà trọ cách sáng đặc biệt ở District 5 đang cần tuyển nhân viên trực ca đêm. Mức thù lao khá thấp, nhưng bù lại sau mỗi ca làm bạn sẽ được cấp quyền ngủ miễn phí bên trong một buồng tối cách ly ánh sáng hoàn hảo.',
    '[Lightproof Inn Shift] A subterranean lightproof lodge in District 5 is recruiting night shift attendants. The monetary wages are modest, but each finished shift grants you free restorative sleep inside an absolute-dark capsule.',
    [
      C(
        'Nhận công việc trực ca',
        'Take the job',
        'Bạn có được những giấc ngủ sâu và trọn vẹn nhất cuộc đời trong suốt năm tháng làm việc tại đây. Bạn cũng nhanh chóng học được nguyên tắc vàng: tuyệt đối không tò mò hỏi xem khách thuê bóng tối để làm những chuyện gì.',
        'You experienced the deepest, most tranquil sleep of your life during that year. You also mastered the golden rule: never ask patrons what unspeakable deeds they rent darkness for.',
        { wealth: 3, health: 4 },
        {
          out: [
            O(65, 'Giấc ngủ ngon giúp tinh thần bạn hồi sinh mạnh mẽ, dù bóng tối nơi đây ẩn chứa nhiều bí mật.', 'Deep sleep restored your frayed nerves, even as unmentioned secrets filled the dark halls.', { sanity: 2 }),
            O(35, 'Một đêm nọ, vị khách phòng số 6 trả buồng muộn; bạn bước vào mở cửa và nhìn thấy cảnh tượng kinh hoàng. Bạn cắn răng giữ kín bí mật và vội vã xin nghỉ việc trước khi bị thủ tiêu.', 'One night, room 6 failed to checkout; you unlocked the latch and witnessed an unspeakable horror. You quit immediately before anyone realized what you had seen.', { sanity: -7, heat: 3 }, { mem: 'dark_inn' })
          ]
        }
      ),
      C(
        'Từ chối công việc này',
        'Turn it down',
        'Bạn quyết định từ chối lời mời và tiếp tục tự buộc dải vải đen quanh mắt mỗi khi đi ngủ trong căn phòng trọ sáng rực.',
        'You declined the offer, continuing to tie the rough black velvet blindfold over your eyes in your brightly lit room.',
        { health: -1 }
      )
    ],
    I('Bạn thờ ơ bước qua tấm biển tuyển dụng gắn trên tường.', 'You walked past the recruitment flyer posted on the wall.')
  ),

  M(
    'm3_e_blackout',
    [10, 80],
    E,
    '[Mười một phút bầu trời vụt tắt] Nguồn năng lượng cực quang trên bầu trời District 5 đột ngột sập hoàn toàn trong mười một phút. Lần đầu tiên trong đời bạn được nhìn thấy bóng tối bao trùm khắp phố xá ngoài trời; trong khoảnh khắc ấy, cả khu dân cư rơi vào trạng thái điên loạn.',
    '[Eleven Minutes of Total Blackout] The radiant sky grid of District 5 collapsed entirely for eleven chaotic minutes. For the first time in memory you beheld real darkness upon the open street; in those eleven minutes, the neighborhood went utterly mad.',
    [
      C(
        'Đứng sững lại và ngước nhìn lên',
        'Stand still and look up',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Bạn nhìn thấy những đốm sáng li ti huyền ảo trên nền trời đen thẳm mà chưa từng được thấy trong đời. Bạn đứng ngây người ngắm nhìn cho tới khi ánh sáng nhân tạo bật lại làm mắt bạn cay xè.', 'You beheld countless tiny glittering points of ancient starlight upon the velvet void. You stared transfixed until the blinding sky snapped back on, scorching your retinas.', { sanity: 4, resonance: 4 }),
            O(40, 'Ai đó đã lao tới giật phăng túi xách của bạn trong bóng tối rồi đạp bạn ngã dúi dụi. Khi ánh sáng rực rỡ trở lại, bạn chỉ thấy vết máu tươi loang lổ trên hai bàn tay mình.', 'A predator ripped your satchel away in the pitch dark and struck you down. When harsh neon flared back to life, all you saw was fresh blood coating your trembling hands.', { wealth: -4, health: -4 })
          ]
        }
      ),
      C(
        'Chạy thục mạng về nhà khóa cửa',
        'Run home and lock the door',
        'Bạn lao như bay về phòng trọ và kéo chặt then cài, ngồi co ro nghe tiếng kính vỡ và tiếng cướp phá ngoài ngõ. Mười một phút ấy dài đằng đẵng tựa như cả một kiếp người.',
        'You sprinted home and jammed the heavy iron bolts, listening to breaking glass and riots along the street. Those eleven minutes stretched longer than an eternity.',
        { sanity: -2 }
      ),
      C(
        'Hùa theo đám đông đập phá cửa hàng',
        'Join the crowd breaking into shops',
        'Bạn lao vào đám đông hôi của và mang về được một túi đồ hộp giá trị cùng một vết chém dài ở cổ tay. Đúng một tuần sau, các camera giám sát của E Corp bắt đầu gõ cửa từng nhà để truy thu.',
        'You joined the rampaging looters, securing a bag of rations and a nasty laceration on your forearm. A week later, E Corp facial-recognition enforcers began pounding doors.',
        { wealth: 6, health: -2, heat: 6, rep: -2 },
        { mem: 'blackout_loot', motif: { greed: 1 } }
      )
    ],
    I('Bạn sợ hãi nhắm nghiền hai mắt lại cho đến khi ánh đèn sáng rực trở lại.', 'You shut your eyes in terror until the blazing lights flared back on.'),
    { once: true, tags: ['danger'] }
  ),

  M(
    'm3_e_bottled_night',
    [14, 90],
    E,
    '[Chiếc lọ bóng tối đóng chai] Một gã bán rong bí ẩn mời chào bạn món hàng kỳ lạ: "đêm đen đóng chai" bên trong một lọ thủy tinh sơn đen, khi mở nắp sẽ tạo ra năm phút bóng tối tuyệt đối trong phòng. Giá bán là 3 Ahn một lọ.',
    '[Bottled Night Elixir] An eccentric merchant hawked a curious novelty: “bottled night” inside an obsidian glass phial that releases five minutes of pure darkness when unstoppered. Three Ahn per vial.',
    [
      C(
        'Bỏ tiền mua một lọ',
        'Buy a jar',
        null,
        null,
        { wealth: -3 },
        {
          out: [
            O(70, 'Món hàng phát huy tác dụng kỳ diệu. Năm phút chìm trong bóng tối ấy là khoảng thời gian bạn có được giấc ngủ sâu và bình yên nhất trong suốt cả năm.', 'It worked astonishingly well. Those five minutes of velvety void provided the deepest, most restorative rest you experienced all year.', { sanity: 4, health: 2 }),
            O(30, 'Trong năm phút bóng tối bao trùm, bạn kinh hoàng nghe thấy tiếng thở dốc của một thứ gì đó ngay sát vành tai mình. Khi ánh sáng quay trở lại, chiếc lọ đã rỗng không và tự đóng chặt nắp.', 'Amidst the ink-black silence, you heard cold, wet breathing brushing your ear. When daylight returned, the phial sat empty with its wax seal firmly intact.', { sanity: -5, resonance: 6 })
          ]
        }
      ),
      C(
        'Gặng hỏi nguồn gốc bóng tối',
        'Ask him where the dark comes from',
        'Gã bán rong chỉ nhếch mép cười đầy ngụ ý, nhanh chóng thu dọn quầy hàng rồi lủi nhanh vào hẻm Backstreets. Sang ngày hôm sau, người ta không còn thấy bóng dáng gã đâu nữa.',
        'The hawker merely offered a knowing smirk, swiftly packing his wares and vanishing into the alleys. By morning, not a trace of his cart remained.',
        { resonance: 2 }
      )
    ],
    I('Bạn lắc đầu bước đi tiếp, một tay che mắt khỏi ánh sáng chói chang.', 'You shook your head and kept walking, shielding your brow against the glare.')
  ),

  // ----------------------------------------------- District 15
  M(
    'm3_o_cosign',
    [18, 70],
    { ...O15, npc: 'friend' },
    '[Lời thỉnh cầu bảo lãnh của {friend}] {friend} khẩn khoản cầu xin bạn ký tên làm người bảo lãnh cho khoản vay nặng lãi của họ bằng mực sinh học của O Corp. Nếu {friend} không trả nợ đúng hạn, điều khoản xử phạt sẽ tự động thi hành lên thân thể của người bảo lãnh.',
    '[The Guarantor Plea of {friend}] {friend} desperately begged you to co-sign their loan bond inked with living O Corp fluid. If {friend} defaults, the punitive restitution clause executes upon the body of the co-signer.',
    [
      C(
        'Đặt bút ký bảo lãnh cho bạn mình',
        'Sign the bond',
        '{friend} xúc động ôm chặt lấy bạn rất lâu. Trên đường về, bạn run rẩy đọc lại điều khoản xử phạt ba lần: "tước đoạt một ngón tay bất kỳ do bên bảo lãnh tự chọn."',
        '{friend} embraced you in tears. Walking home, you nervously reread the penalty clause three times: “severance of one finger, chosen by the guarantor.”',
        { network: 2 },
        {
          bond: { friend: 10 },
          mem: 'cosigned',
          motif: { loyalty: 1 },
          later: [{ id: 'm3_o_cosign_due', years: 3, reasonVi: 'Bạn đã ký bảo lãnh cho {friend}', reasonEn: 'You guaranteed {friend}’s loan' }]
        }
      ),
      C(
        'Dứt khoát từ chối',
        'Refuse the request',
        '{friend} trầm mặc gật đầu rồi khẽ bảo: "Tao hiểu mà." Kể từ ngày hôm đó trở đi, người bạn ấy không bao giờ cậy nhờ bạn bất cứ điều gì nữa.',
        '{friend} nodded grimly and whispered, “I understand.” From that day forward, they never asked another favor of you.',
        {},
        { bond: { friend: -10 } }
      )
    ],
    I('Bạn ậm ừ bảo sẽ suy nghĩ thêm. {friend} lặng lẽ quay lưng đi tìm người khác.', 'You muttered that you needed time. {friend} quietly left to seek another.'),
    { tags: ['npc'] }
  ),

  M(
    'm3_o_cosign_due',
    [20, 80],
    { mem: 'cosigned', npc: 'friend' },
    '[Hạn trả nợ và vết mực O Corp] Đã đến hạn thanh toán nợ nhưng {friend} hoàn toàn mất khả năng chi trả. Tờ khế ước hợp đồng cất trong ngăn kéo bàn của bạn bắt đầu nóng ran lên và phát ra những xung động mạch đập dữ dội.',
    '[Foreclosure Pulse of O Corp Ink] The loan deadline arrived and {friend} defaulted completely. The contract sealed in your desk drawer began pulsing with feverish heat and living vascular rhythms.',
    [
      C(
        'Dùng toàn bộ tiền tiết kiệm trả nợ thay',
        'Pay it with everything you’ve saved',
        '{friend} quỳ sụp xuống nghẹn ngào không nói nên lời. Suốt một tháng sau đó, đêm nào người bạn ấy cũng sang căn hộ của bạn, chỉ để ngồi lặng lẽ bên cạnh bầu bạn.',
        '{friend} collapsed weeping without words. For an entire month afterward, they visited your flat every evening just to sit quietly beside you in gratitude.',
        { wealth: -15 },
        { bond: { friend: 12 } }
      ),
      C(
        'Chấp nhận để điều khoản xử phạt thi hành',
        'Let the clause execute',
        null,
        null,
        { health: -8, sanity: -4 },
        {
          scar: 'Mất ngón út tay trái',
          out: [
            O(55, 'Bạn nghiến răng chọn ngón út tay trái. Đến đúng nửa đêm, ngón tay tự động lìa khỏi bàn tay rơi xuống bàn mà không chảy ra một giọt máu nào. {friend} quỳ gục trước cửa nhà bạn tới sáng.', 'You surrendered your left little finger. At midnight, it severed cleanly without shedding a single drop of blood. {friend} knelt outside your door until dawn.', {}, { bond: { friend: 6 } }),
            O(45, 'Bạn chấp nhận hy sinh ngón út tay trái. Nhưng sáng hôm sau tỉnh dậy, bạn bàng hoàng hay tin {friend} đã thu dọn hành lý trốn khỏi District 15 mà không để lại một lời nhắn nào.', 'You sacrificed your left pinky. Yet come morning, you learned {friend} had packed their bags and fled District 15 without leaving a single message.', {}, { npcFate: { friend: 'estranged' } })
          ]
        }
      )
    ],
    I('Bạn không dám đưa ra lựa chọn. Bản hợp đồng tự động thi hành phán quyết: tước đoạt ngón trỏ tay phải của bạn.', 'You paralyzed in indecision. The pact chose for you: your right index finger dropped away.'),
    { health: -10, sanity: -6 },
    { scar: 'Mất ngón trỏ tay phải', bond: { friend: -6 }, once: true, tags: ['callback', 'npc'] }
  ),

  M(
    'm3_o_fine_print',
    [16, 70],
    O15,
    '[Dòng chữ nhỏ ở trang 30] Một tập đoàn Wing đăng tin tuyển dụng với mức lương gấp đôi thị trường, hợp đồng được ký kết bằng mực sinh học O Corp. Ở tận trang thứ 30 xuất hiện một dòng chữ in li ti đến mức mắt thường không thể đọc nổi.',
    '[Microscopic Clause on Page 30] A corporate firm offered double wages under an employment contract bound with O Corp fluid. Buried deep on page thirty lay a line of text so microscopic that bare eyes could not resolve it.',
    [
      C(
        'Nhắm mắt ký luôn',
        'Sign it blindly',
        null,
        null,
        { wealth: 6 },
        {
          out: [
            O(60, 'May mắn không có điều gì tồi tệ xảy ra. Bạn hoàn thành trọn vẹn một năm làm việc và nhận đủ tiền lương hậu hĩnh, dù vẫn không rõ dòng chữ ấy viết gì.', 'Fortune smiled upon you. You completed the contract year and received full compensation, forever ignorant of what that tiny line stipulated.', { wealth: 4 }),
            O(40, 'Dòng chữ ma quái ấy quy định: "bên lao động tự nguyện nhượng lại một năm ký ức". Hết năm bạn tỉnh dậy và bàng hoàng nhận ra toàn bộ ký ức một năm qua là một khoảng trắng.', 'The insidious clause read: “the laborer surrenders one continuous year of personal memory.” You awoke at year’s end with twelve months erased into a void.', { sanity: -8, resonance: 3 }, { mem: 'lost_year' })
          ]
        }
      ),
      C(
        'Chi 5 Ahn thuê luật sư thẩm định',
        'Pay a lawyer to read it (5 Ahn)',
        'Vị luật sư già dùng kính lúp soi xét hồi lâu rồi đặt gọng kính xuống bàn, nghiêm giọng bảo: "Đừng ký." Bà không tính thêm phí giải thích, và bạn quyết định hủy bỏ ý định.',
        'The veteran lawyer scrutinized it under a loupe, set down her spectacles, and warned: “Do not sign.” She charged nothing to explain, and you tore the application.',
        { wealth: -5, network: 2 }
      ),
      C(
        'Từ chối ký hợp đồng mập mờ',
        'Decline the contract',
        'Người đại diện tuyển dụng lạnh lùng gạch tên bạn khỏi danh sách ứng viên và lập tức gọi người kế tiếp vào phòng.',
        'The recruiter expressionlessly crossed your name off the roster and called the next desperate applicant inside.',
        {}
      )
    ],
    I('Bạn đặt tờ hợp đồng lại trên bàn rồi lẳng lặng rời đi.', 'You left the contract upon the desk and walked out.')
  ),

  // ----------------------------------------------- District 26
  M(
    'm3_z_registry',
    [18, 80],
    Z,
    '[Đăng ký cư trú District 26] Bạn đến văn phòng hành chính để làm thủ tục cấp giấy tờ cư trú hợp pháp. Viên nhân viên gõ tên bạn vào hệ thống, nhíu mày khó hiểu, gõ lại lần nữa rồi bất ngờ đứng dậy đi vào phòng trong gọi quản lý cấp cao.',
    '[Residency Registration at District 26] You visited the registry bureau to file paperwork for legal citizenship. The clerk entered your name, scowled in confusion, entered it again, then abruptly stood up to summon a senior director.',
    [
      C(
        'Kiên nhẫn ngồi chờ giải quyết',
        'Wait in the lobby',
        null,
        null,
        {},
        {
          out: [
            O(50, 'Họ cấp cho bạn một bộ hồ sơ cư dân mới, mục nơi sinh ghi rõ "không xác định". Kể từ nay bạn đã có thể đi làm việc hợp pháp như những công dân bình thường khác.', 'They issued you a fresh dossier with the origin field stamped “undetermined.” From that day forward, you could secure legitimate corporate employment.', { network: 3, rep: 1 }),
            O(50, 'Hai đặc vụ mặc quân phục không phù hiệu áp giải bạn vào phòng kín phía sau và tra khảo gắt gao về quê quán suốt ba ngày liền. Bạn chẳng thể trả lời được câu nào.', 'Two unidentified operatives escorted you to an interrogation chamber, grilling you about your birthplace for three relentless days. You could answer nothing.', { health: -3, sanity: -5, heat: 4 }, { mem: 'z_questioned' })
          ]
        }
      ),
      C(
        'Lẻn về, chấp nhận sống không giấy tờ',
        'Slip away and live undocumented',
        'Sống không giấy tờ đồng nghĩa với việc bạn không thể tìm kiếm các công việc chính thống. Nhưng bù lại, điều đó cũng có nghĩa là không một kẻ nào trong The City có thể truy vết được bạn.',
        'Living undocumented meant forfeit of legitimate contracts. Yet it also ensured that no investigative authority in the City could ever track your scent.',
        { wealth: -3, rep: -2, heat: -6 },
        { mem: 'no_papers' }
      )
    ],
    I('Bạn linh cảm có điều chẳng lành nên vội vã đứng dậy rời đi trước khi người quản lý tới.', 'Sensing impending danger, you slipped away before the overseer arrived.')
  ),

  M(
    'm3_z_go_back',
    [25, 90],
    Z,
    '[Chuyến tàu tìm về nguồn cội] Bạn quyết định bắt chuyến tàu quay trở về thăm lại mảnh đất nơi mình đã sinh ra. Bạn xuống đúng sân ga ghi trên vé, nhưng rồi đứng chôn chân ở cửa ga suốt nhiều giờ liền, vì hoàn toàn không biết phải bước tiếp về hướng nào.',
    '[Train Pilgrimage to the Origin] You resolved to board a train seeking the forgotten soil of your birth. You stepped onto the platform named on your ticket, yet stood paralyzed outside the turnstile, not knowing which road to take.',
    [
      C(
        'Hỏi thăm người dân qua đường',
        'Ask passersby for directions',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Không một ai biết đến địa danh đó. Một người còn ngơ ngác hỏi ngược lại bạn: "District nào cơ chứ?" Bạn đành lủi thủi bắt chuyến tàu cuối cùng quay về.', 'Nobody recognized the district name. One stranger even asked: “Which District could you possibly mean?” You took the last train back in despair.', { sanity: -4 }),
            O(40, 'Một bà cụ bí ẩn nắm chặt lấy tay bạn và dẫn bước đi trong sương mù. Bạn tỉnh dậy trên chuyến tàu chiều về, giày dính đầy bùn đất và trong túi có một bức ảnh chụp bạn thuở ấu thơ.', 'A frail elder grasped your wrist, leading you through mists. You awoke on the evening train with muddy boots and a vintage portrait of your infant self in your coat.', { sanity: 2, resonance: 7 }, { mem: 'z_photo' })
          ]
        }
      ),
      C(
        'Lên tàu quay trở về',
        'Board the return train',
        'Bạn ngồi trên chuyến tàu quay về thành phố, cố hết sức nhớ lại tên con đường trước cửa ngôi nhà thơ ấu của mình. Nhưng bạn chỉ nhớ nổi đúng chữ cái đầu tiên.',
        'Sitting on the return carriage, you racked your brain to remember the name of your childhood avenue. You could recall nothing beyond its first letter.',
        { sanity: -2 }
      )
    ],
    I('Bạn đổi ý và quyết định hủy bỏ chuyến đi tìm kiếm quá khứ.', 'You abandoned the search for your forgotten origins.'),
    { once: true }
  ),

  M(
    'm3_z_uniforms',
    [14, 80],
    Z,
    '[Đoàn thanh tra không phù hiệu] Hai người mặc quân phục đen không mang bất kỳ phù hiệu nào đi gõ cửa từng nhà để truy tìm "những kẻ không có tên trong sổ bộ". Gia đình hàng xóm sát vách nhà bạn vừa mới chuyển tới sinh sống hồi tháng trước.',
    '[Inquisitors without Insignia] Two armed inspectors wearing plain obsidian uniforms knocked door to door, hunting “unregistered persons absent from the registry.” The family next door just arrived last month.',
    [
      C(
        'Khai báo thật với họ',
        'Disclose the truth',
        null,
        null,
        { rep: 1 },
        {
          out: [
            O(50, 'Họ cẩn thận ghi chép lại lời khai rồi rời đi. Gia đình nhà bên vẫn tiếp tục sinh sống bình thường, không hề hay biết về những điều bạn đã khai báo.', 'They noted your testimony and departed. The family next door remained undisturbed, unaware of what you had stated.', { sanity: -1 }),
            O(50, 'Tối hôm đó căn hộ nhà bên tắt ngấm đèn từ sớm. Sáng hôm sau tỉnh dậy, bạn bàng hoàng thấy gian phòng trống trơn, toàn bộ đồ đạc và con người đều biến mất không vết tích.', 'That night the lights next door extinguished early. Come morning, the adjoining flat was utterly vacant, every scrap of furniture and living soul erased.', { sanity: -6 }, { motif: { violence: 1 } })
          ]
        }
      ),
      C(
        'Nói dối để che chở hàng xóm',
        'Lie to protect them',
        'Hai người lính nhìn bạn trừng trừng lâu hơn bình thường rồi ghi lại số nhà của bạn vào cuốn sổ đen. Tối hôm đó, gia đình nhà bên mang sang biếu bạn một nồi canh thơm phức.',
        'The inspectors eyed you with chilling scrutiny before logging your door number into their ledger. That evening, the neighbors brought over a steaming pot of stew.',
        { network: 3, heat: 4 },
        { motif: { mercy: 1 } }
      )
    ],
    I('Bạn kiên quyết không mở cửa. Họ lẳng lặng dùng phấn trắng vẽ một ký hiệu kỳ dị lên khung cửa nhà bạn.', 'You refused to open the latch. They silently chalked a bizarre rune upon your doorframe.'),
    { heat: 1 }
  ),

  // ----------------------------------------------- after Distortion
  M(
    'm3_dist_visit',
    ANY,
    { ...DIST, npc: 'friend' },
    '[Cuộc viếng thăm của {friend}] {friend} bằng cách nào đó đã lần theo dấu vết tìm ra nơi bạn đang ẩn trốn sau khi bị biến dạng thành Distortion. Người bạn ấy đứng chôn chân ở cửa, hai tay run rẩy cầm túi đồ ăn, cố gắng không nhìn vào những móng vuốt quái dị của bạn.',
    '[The Sanctuary Visit of {friend}] {friend} somehow traced your scent to the derelict sanctuary where you concealed your Distortion. They stood at the threshold clutching a bag of bread, desperately averting their gaze from your mutated talons.',
    [
      C(
        'Mở cửa cho người bạn vào trong',
        'Welcome them inside',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Hai người ngồi bệt trên sàn nhà trò chuyện về những kỷ niệm thời thơ ấu như thể chưa từng có biến cố gì xảy ra. Khi {friend} ra về, bạn vẫn giữ được phần người trong tâm trí.', 'You sat upon the floor recounting childhood mischief as though no nightmare had occurred. When {friend} departed, your human sanity remained unbroken.', { sanity: 6 }, { bond: { friend: 8 } }),
            O(40, 'Bạn bàng hoàng tỉnh lại trên sàn nhà đầy máu tanh tưởi. {friend} đã biến mất; bên cạnh bạn chỉ còn lại túi đồ ăn bị xé rách tả tơi và những mảnh vụn thịt rơi vãi.', 'You awoke in a daze upon blood-drenched boards. {friend} was gone; beside you lay torn bread wrappers and crimson gore.', { sanity: -15, heat: 8 }, { npcFate: { friend: 'dead' }, motif: { violence: 1 } })
          ]
        }
      ),
      C(
        'Gầm rú xua đuổi họ đi',
        'Drive them away with screams',
        'Bạn gào thét man rợ bằng thứ âm thanh ma quái rùng rợn không còn thuộc về con người. {friend} hoảng loạn lùi lại, đánh rơi túi đồ ăn rồi cắm đầu bỏ chạy thục mạng; đó là điều nhân từ cuối cùng bạn có thể làm cho họ.',
        'You shrieked in an otherworldly roar unbefitting any mortal throat. {friend} stumbled in terror, dropped the rations, and fled; it was the kindest mercy you could offer.',
        { sanity: -3 },
        { bond: { friend: -15 }, motif: { mercy: 1 } }
      )
    ],
    I('Bạn ngồi bất động trong góc tối dày đặc cho đến khi {friend} nản lòng cất bước ra về.', 'You held your breath in the black shadow until {friend} gave up and walked away.'),
    { sanity: -2, bond: { friend: -5 }, once: true, tags: ['npc', 'danger'] }
  ),

  M(
    'm3_dist_fixers',
    ANY,
    DIST,
    '[Hai Fixer Grade 4 săn tiền thưởng] Hai tay Fixer Grade 4 thiện chiến vừa tiếp nhận ủy thác thanh trừng Distortion về bạn. Nấp trong con hẻm tối, bạn nghe rõ mồn một từng câu họ bàn tính kế hoạch tác chiến, và nhận ra giọng của một người đang run lên vì sợ hãi.',
    '[Two Grade 4 Fixers on the Hunt] Two veteran Grade 4 Fixers accepted a suppression bounty placed upon your Distortion. From your dark alcove you overheard their tactical debate, noticing that one man’s voice trembled with fear.',
    [
      C(
        'Lặng lẽ dời chỗ ẩn nấp trước khi họ ập vào',
        'Relocate before they breach',
        'Bạn vội vã từ bỏ sào huyệt ẩn nấp thứ ba của mình trong năm nay. Cứ mỗi lần dời đi, bạn lại cay đắng bỏ lại phía sau thêm một món đồ thuộc về con người cũ của mình.',
        'You abandoned your third safehouse of the season. With every forced flight, you left behind another precious relic of your former human self.',
        { heat: -8, network: -3, sanity: -2 }
      ),
      C(
        'Phục kích nghênh chiến',
        'Ambush them in the dark',
        null,
        null,
        {},
        {
          out: [
            O(55, 'Chúng không trụ nổi trước sức mạnh dị thường của bạn. Một kẻ may mắn trốn thoát được, kẻ còn lại vĩnh viễn nằm xuống; tiền thưởng truy nã về bạn sau đó tăng lên gấp đôi.', 'They could not withstand your eldritch fury. One escaped into the rain; the other perished on the pavement. Your bounty doubled.', { heat: 12, rep: 3, sanity: -4 }, { motif: { violence: 1 } }),
            O(45, 'Đám thợ săn đã chuẩn bị vũ khí chuyên dụng kỹ càng hơn bạn tưởng. Bạn trầy trật phá vòng vây tẩu thoát với một nửa cơ thể bị thiêu cháy nham nhở bởi vũ khí nhiệt.', 'The hunters were far better prepared than you anticipated. You barely broke through their cordon with half your flesh scorched by thermal weapons.', { health: -25, heat: -6 })
          ]
        }
      ),
      C(
        'Chủ động bước ra đàm phán',
        'Step forward to parley',
        null,
        null,
        {},
        {
          out: [
            O(30, 'Người thợ săn có giọng run rẩy khẽ hạ vũ khí xuống. Anh ta chụp một bức ảnh hiện trường để báo cáo với Hana rằng bạn đã bị tiêu diệt, rồi vĩnh viễn không bao giờ quay lại.', 'The shaken Fixer lowered his weapon. He snapped an ambiguous photo to deceive Hana that you had perished, departing never to return.', { heat: -18, sanity: 5 }),
            O(70, 'Bạn cố mở miệng cất lời, nhưng thứ thanh âm phát ra lại là những tiếng gầm gừ dị dạng ghê rợn. Bọn họ kinh hãi đồng loạt nổ súng xối xả vào người bạn.', 'You parted your lips to plead, yet what spilled forth was an abhorrent beastly bellow. Terrified, both Fixers opened fire at point-blank range.', { health: -15, heat: 5 })
          ]
        }
      )
    ],
    I('Bạn cam chịu để mặc cho số phận định đoạt mọi chuyện sắp xảy đến.', 'You surrendered to whatever violent fate was destined to unfold.'),
    { health: -10, heat: 4, tags: ['danger'] }
  ),

  M(
    'm3_dist_old_home',
    ANY,
    DIST,
    '[Đèn bếp căn nhà cũ] Giữa đêm khuya thanh vắng, bạn lén lút đứng trước cửa căn nhà cũ nơi gia đình mình từng sinh sống. Ánh đèn phòng bếp vẫn sáng le lói hắt qua khe cửa sổ; người thân yêu dường như vẫn luôn chừa một ngọn đèn chờ bạn quay về.',
    '[The Kitchen Lamp of Home] At midnight, you crept outside the humble tenement your family once called home. The faint amber glow of the kitchen lantern shone through the window curtains; someone was still waiting for you.',
    [
      C(
        'Rón rén gõ cửa',
        'Knock upon the door',
        null,
        null,
        {},
        {
          out: [
            O(50, 'Một người thân ra mở cửa, lặng người nhìn vào hình dạng quái dị của bạn rất lâu, rồi lặng lẽ đặt một bát canh nóng hổi xuống bậc thềm và khép cửa lại. Bát canh vẫn còn ấm nồng tình thương.', 'An aged relative opened the latch, gazing at your abnormal form for an eternity before setting a steaming bowl of soup upon the step and gently closing the door.', { sanity: 6 }),
            O(50, 'Người ra mở cửa hoảng loạn thét lên kinh hãi khi nhìn thấy hình dạng của bạn. Ngay lập tức, đèn của cả dãy phố lần lượt bật sáng, báo động một cuộc vây bắt.', 'Whoever opened the door shrieked in mortal dread. In moments, lights flared along the entire avenue, sounding the alarm.', { sanity: -6, heat: 10 })
          ]
        }
      ),
      C(
        'Đứng ngắm nhìn từ xa rồi rời đi',
        'Watch in silence, then depart',
        'Bạn đứng chôn chân trong bóng tối cho tới khi ánh đèn bếp vụt tắt hẳn. Sau đó bạn lặng lẽ quay gót trở về con hẻm hoang tàn, lòng vừa nhẹ nhõm lại vừa trống rỗng khôn cùng.',
        'You lingered in the shadows until the kitchen lamp finally clicked off. You slunk back into the rain-slicked alleys, both relieved and hollowed beyond words.',
        { sanity: -2, resonance: 2 }
      )
    ],
    I('Bạn không dám tiến lại gần ngưỡng cửa thân quen ấy.', 'You lacked the courage to approach that sacred threshold.'),
    { once: true }
  ),

  M(
    'm3_dist_hunger',
    ANY,
    DIST,
    '[Tên cướp Rat bị thương] Một tên cướp đường Rat bị thương nặng đang nằm rên rỉ thoi thóp trong góc hẻm nơi bạn trú ngụ. Cơn đói khát dị dạng bên trong cơ thể bạn lúc này đang gầm gào át đi mọi suy nghĩ lý trí của con người.',
    '[The Wounded Alley Scavenger] A grievously wounded Rat scavenger lay groaning in the shadows of your cul-de-sac. The abnormal soul hunger raging inside you was roaring louder than any rational human thought.',
    [
      C(
        'Cắn nuốt con mồi để giải tỏa cơn đói',
        'Devour the prey',
        'Cơn đói quằn quại tạm thời lắng dịu được trong ba ngày. Bạn cố sức xua đuổi khỏi tâm trí những lời van xin trăn trối cuối cùng của hắn ta trước khi bị xé nát.',
        'The agonizing hunger was sated for three fleeting days. You tried desperately to banish his final weeping pleas from your haunted thoughts.',
        { health: 12, sanity: -8, heat: 4 },
        { motif: { violence: 1 } }
      ),
      C(
        'Kéo hắn ra đầu ngõ để người khác cứu giúp',
        'Drag him to the main street for aid',
        'Toàn thân bạn run rẩy bần bật suốt cả chặng đường kéo lê hắn ta. Sáng hôm sau tỉnh dậy, bạn nhìn thấy ai đó đã đặt một chiếc chăn ấm ở đầu hẻm, không rõ là dành cho ai.',
        'Your limbs trembled violently as you dragged his body to the avenue. By dawn, someone had left a warm wool blanket at the alley mouth, unsure of who the benefactor was.',
        { health: -4, sanity: 3 },
        { motif: { mercy: 1 } }
      )
    ],
    I('Bạn quay mặt vào góc tường cắn chặt răng cho đến khi trời sáng; hắn đã cố sức bò đi nơi khác.', 'You faced the brick wall until daybreak; the scavenger had crawled away into the mud.'),
    { sanity: -3 }
  ),

  M(
    'm3_dist_voice',
    ANY,
    { ...DIST, stat: { sanity: [0, 25] } },
    '[Giọng nói Carmen trong tâm trí] Giọng nói ngọt ngào quyến rũ ấy lại vang vọng bên trong tâm khảm bạn: "Ngươi đã làm rất tốt rồi. Giờ thì, hãy tiến xa hơn một bước nữa đi."',
    '[The Whispering Voice in the Mind] That intoxicating, gentle voice resonated within the depths of your psyche once more: “You have done wonderfully. Now, walk just a little further.”',
    [
      C(
        'Chấp nhận lời dẫn dụ và tiến xa hơn',
        'Embrace the voice and evolve',
        'Cơ thể bạn biến dị phình to đến mức không còn vừa vặn với căn phòng này nữa. Hiệp hội Hana chính thức nâng cấp hồ sơ theo dõi bạn từ "chưa xếp hạng" lên một cấp độ hiểm họa đặc biệt.',
        'Your monstrous anatomy expanded until the room could no longer contain your bulk. Hana Association upgraded your file from “unranked” to an official classified calamity.',
        { health: 15, sanity: -10, heat: 15, resonance: 10, rep: 4 }
      ),
      C(
        'Cất tiếng hỏi người đó là ai',
        'Demand who she is',
        'Giọng nói ấy chỉ khẽ bật cười êm đềm, rồi rơi vào tĩnh lặng suốt cả một năm trời. Đó là năm tháng yên bình nhất của bạn kể từ ngày bị biến dạng thành Distortion.',
        'The voice offered only a melodic chuckle, falling dead silent for an entire cycle. It was the most tranquil year you experienced since transforming.',
        { sanity: 4, resonance: 6 }
      )
    ],
    I('Bạn dùng hai bàn tay bịt chặt tai lại, dù thâm tâm thừa hiểu rằng giọng nói ấy không hề đến từ thế giới bên ngoài.', 'You clamped your ears shut, well aware that the voice emanated from within your soul.'),
    { sanity: -2, once: true, tags: ['callback'] }
  )
];

export default { LIFE_DAILIES_3, LIFE_MINORS_3 };
