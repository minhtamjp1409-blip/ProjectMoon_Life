// ============================================================================
// ASSOCIATIONS AND OFFICES A FIXER CAN BELONG TO
// Lore: Requests are sorted by type and sent to the Association that fits; the
// Association hands them to an Office or an associate Fixer, who accepts all of
// them for a stable wage. Every branch has six Sections, Section 1 the best.
// Not in the lore, and ours: standing, warnings, expulsion, being given a junior,
// going independent. Those are the game's own story around the canon scaffold.
// ============================================================================
import { ZWEI_CONTRACTS, SHI_CONTRACTS, CINQ_CONTRACTS } from './careerContractsAssocA.js';
import { LIU_CONTRACTS, SEVEN_CONTRACTS, TRES_CONTRACTS } from './careerContractsAssocB.js';
import { DEVYAT_CONTRACTS, DIECI_CONTRACTS, OUFI_CONTRACTS, OFFICE_CONTRACTS } from './careerContractsAssocC.js';

const tiers = (...rows) => rows.map(([nameVi, nameEn], level) => ({ level, nameVi, nameEn }));

const stat = (char, key) => char.stats?.[key] ?? 0;

export const ASSOCIATIONS = {
  zwei: {
    name: 'Zwei Association', short: 'Zwei',
    specVi: 'bảo vệ và giải cứu', specEn: 'protection and rescue',
    fit: (c) => stat(c, 'health') >= 50,
    promoIds: ['fixer_promo_g8_zwei'],
    inviteVi: 'Zwei Association cử một người đến tận phòng trọ. Họ không hỏi bạn đánh giỏi cỡ nào, chỉ hỏi bạn có đứng yên được khi người khác đang chạy ra khỏi tòa nhà hay không.',
    inviteEn: 'Zwei Association sends someone to your door. They do not ask how well you fight, only whether you can stand still while everyone else runs out of the building.',
    expelVi: 'Phòng điều phối của Zwei ngừng gọi tên bạn. Một người trong nhóm nói nhỏ rằng người cần được bảo vệ không thể dựa vào ai hay bỏ vị trí. Họ trả lại cây gậy sắt và không hỏi gì thêm.',
    expelEn: 'Zwei’s dispatch stops calling your name. Someone in the group says quietly that people who need protecting cannot rely on someone who leaves their post. They hand back your iron bar and ask nothing more.',
    cfg: {
      tagVi: 'Việc của Zwei', tagEn: 'Zwei Job',
      kickerVi: 'Phiếu giao việc của Zwei', kickerEn: 'A Zwei dispatch slip',
      careful: ['Dựng vòng canh, đi theo kế hoạch', 'Set a perimeter and follow the plan'],
      bold: ['Đứng chắn ở tuyến đầu (thêm 50% Ahn và Merit)', 'Stand at the front line (50% more Ahn and Merit)'],
      intel: ['Xin bản đồ tuyến đường từ phòng điều phối của Zwei (8 Ahn)', 'Ask Zwei’s dispatch for the route plan (8 Ahn)'],
      okFx: { rep: 1, network: 1 }, failFx: { rep: -2, sanity: -2 },
      declineVi: 'Phòng điều phối ghi rằng người cần bảo vệ phải tìm người khác, và họ sẽ biết điều đó.',
      declineEn: 'Dispatch notes the one who needed protecting must find someone else, and that they will know it.',
      tiers: tiers(['Hộ tống một đêm', 'A night escort'], ['Canh cửa một tiệm', 'Guarding a shop'], ['Che chở một gia đình', 'Shielding a family'],
        ['Giải cứu con tin', 'Hostage rescue'], ['Bảo vệ nhân vật quan trọng', 'Guarding a VIP'], ['Giữ một khu phố', 'Holding a district'])
    },
    requests: ZWEI_CONTRACTS
  },
  shi: {
    name: 'Shi Association', short: 'Shi',
    specVi: 'ám sát kín', specEn: 'covert killing',
    fit: (c) => stat(c, 'health') >= 45 && (stat(c, 'sanity') <= 70 || (c.heat || 0) >= 8),
    promoIds: ['fixer_promo_g7_shi'],
    inviteVi: 'Một phong bì không đề tên người gửi nằm dưới cửa phòng bạn. Bên trong là một cây kim khắc dấu của Shi Association và địa chỉ một nhà trọ. Không có lời nào khác.',
    inviteEn: 'An envelope with no sender lies under your door. Inside is a needle stamped with Shi Association’s mark and the address of a boarding house. No other words.',
    expelVi: 'Người điều phối của Shi không gọi bạn vào phòng. Một đồng nghiệp đưa bạn một tờ giấy ghi tên người cuối cùng mà bạn thất hứa. Dấu của Shi trên ngực bạn vẫn còn, và không ai nói nó còn nghĩa gì.',
    expelEn: 'Shi’s handler does not call you into the room. A colleague hands you a slip with the name of the last one you failed. The Shi mark on your chest remains, and no one says what it means now.',
    cfg: {
      tagVi: 'Hợp đồng của Shi', tagEn: 'Shi Contract',
      kickerVi: 'Hợp đồng kín của Shi', kickerEn: 'A sealed Shi contract',
      careful: ['Theo dõi nhiều đêm, ra tay khi chắc chắn', 'Follow for several nights, strike when certain'],
      bold: ['Vào ngay trong đêm (thêm 50% Ahn và Merit)', 'Go in tonight (50% more Ahn and Merit)'],
      intel: ['Mua lịch đi lại từ một mắt xích của Shi (8 Ahn)', 'Buy the target’s routine from a Shi contact (8 Ahn)'],
      okFx: { heat: 2, sanity: -2 }, failFx: { heat: 5, sanity: -3 },
      declineVi: 'Shi không hỏi lý do. Hồ sơ sẽ đến tay người khác, và người điều phối sẽ nhớ bạn đã từ chối.',
      declineEn: 'Shi does not ask why. The file goes to someone else, and the handler will remember you refused.',
      tiers: tiers(['Một kẻ phản bội vặt', 'A petty turncoat'], ['Người giữ sổ của một băng', 'A gang’s bookkeeper'], ['Fixer của một Office', 'An Office Fixer'],
        ['Mục tiêu có cận vệ', 'A guarded target'], ['Một người của Association khác', 'Someone from another Association'], ['Mục tiêu cấp Color', 'A Color-grade target'])
    },
    requests: SHI_CONTRACTS
  },
  cinq: {
    name: 'Cinq Association', short: 'Cinq',
    specVi: 'quyết đấu theo hợp đồng', specEn: 'contracted duels',
    fit: (c) => stat(c, 'rep') >= 38,
    promoIds: ['fixer_promo_g6_cinq'],
    inviteVi: 'Một trọng tài của Cinq Association xem bạn đánh ba trận ở quán rượu rồi để lại một tấm danh thiếp. Mặt sau ghi giờ và địa điểm của buổi kiểm tra.',
    inviteEn: 'A Cinq Association referee watches three of your bouts at a tavern and leaves a calling card. On the back, the time and place of an assessment.',
    expelVi: 'Cinq xóa tên bạn khỏi danh sách đấu thủ. Người trọng tài nói rằng họ không đuổi ai, họ chỉ thôi chọn người đã thua quá nhiều lần liên tiếp. Chiếc thẻ vào sàn đấu được thu lại.',
    expelEn: 'Cinq strikes your name from the list of fighters. The referee says they do not expel anyone, they merely stop choosing someone who has lost too many times in a row. Your pass to the floor is taken back.',
    cfg: {
      tagVi: 'Trận đấu của Cinq', tagEn: 'Cinq Bout',
      kickerVi: 'Hợp đồng đấu của Cinq', kickerEn: 'A Cinq bout contract',
      careful: ['Học thói quen đối thủ trước giờ đấu', 'Study the opponent’s habits before the bout'],
      bold: ['Chấp nhận luật khắc nghiệt hơn (thêm 50% Ahn và Merit)', 'Accept harsher rules (50% more Ahn and Merit)'],
      intel: ['Mua bản ghi các trận cũ của đối thủ (8 Ahn)', 'Buy records of the opponent’s old bouts (8 Ahn)'],
      okFx: { rep: 2 }, failFx: { rep: -3, sanity: -2 },
      declineVi: 'Cinq cử người khác lên sàn thay bạn. Tên bạn vẫn trong danh sách, ở dòng cuối.',
      declineEn: 'Cinq sends someone else onto the floor in your place. Your name stays on the list, on the last line.',
      tiers: tiers(['Thách đấu ở quán rượu', 'A tavern challenge'], ['Đấu thay một chủ tiệm', 'Fighting for a shopkeeper'], ['Đấu danh dự giữa hai Office', 'A bout between two Offices'],
        ['Đấu giữa hai Association', 'A bout between two Associations'], ['Đấu với Fixer Grade 1', 'A bout against Grade 1'], ['Đấu thay một Star', 'Standing in for a Star'])
    },
    requests: CINQ_CONTRACTS
  },
  liu: {
    name: 'Liu Association', short: 'Liu',
    specVi: 'giao chiến quy mô lớn, sống như một gia đình', specEn: 'large-scale open fighting, run like a family',
    fit: (c) => stat(c, 'network') >= 38,
    promoIds: [],
    inviteVi: 'Một người của Liu Association ngồi cạnh bạn ở quán mì và gắp thêm thịt vào bát bạn mà không hỏi. Họ nói nhà Liu còn chỗ ở bàn ăn, và việc ở đó không nhẹ.',
    inviteEn: 'A Liu Association member sits beside you at a noodle stall and drops extra meat into your bowl without asking. They say the house has room at its table, and the work there is not light.',
    expelVi: 'Người đứng đầu nhà Liu không quát mắng. Người ấy chỉ không gọi bạn vào bữa tối, ba ngày liền. Ngày thứ tư, người nhà gói đồ của bạn lại, cẩn thận hơn cần thiết.',
    expelEn: 'The head of the Liu house does not shout. They simply do not call you to dinner, three days running. On the fourth day the family packs your things, more carefully than needed.',
    cfg: {
      tagVi: 'Việc của nhà Liu', tagEn: 'Liu Job',
      kickerVi: 'Lệnh của nhà Liu', kickerEn: 'A Liu house order',
      careful: ['Giữ đội hình, rút theo hiệu lệnh', 'Hold formation, withdraw on signal'],
      bold: ['Dẫn đầu mũi xung phong (thêm 50% Ahn và Merit)', 'Lead the charge (50% more Ahn and Merit)'],
      intel: ['Nhờ một người anh trong nhà đi thăm dò trước (8 Ahn)', 'Ask an elder of the house to scout first (8 Ahn)'],
      okFx: { network: 2, rep: 1 }, failFx: { network: -1, sanity: -2 },
      declineVi: 'Không ai trách bạn. Họ chỉ để lại phần cơm của bạn trên bếp, và bạn biết điều đó nặng hơn lời trách.',
      declineEn: 'No one blames you. They only leave your portion on the stove, and you know that weighs more than blame.',
      tiers: tiers(['Dẹp một vụ ẩu đả', 'Breaking up a brawl'], ['Giữ một ngã tư', 'Holding a crossing'], ['Đánh vào một ổ', 'Storming a den'],
        ['Chiến dịch cấp khu', 'A district campaign'], ['Chiến tranh giữa các nhà', 'A war between houses'], ['Đứng trong bóng một Star', 'Standing in a Star’s shadow'])
    },
    requests: LIU_CONTRACTS
  },
  seven: {
    name: 'Seven Association', short: 'Seven',
    specVi: 'điều tra, thu thập tin tức, xử phạt sau hợp đồng', specEn: 'investigation, intelligence, post-contract punishment',
    fit: (c) => stat(c, 'network') >= 33 && stat(c, 'sanity') >= 40,
    promoIds: ['fixer_promo_g8_seven'],
    inviteVi: 'Seven Association gửi cho bạn một bộ câu hỏi, không phải lời mời. Ba mươi câu về những nơi bạn từng đến, những người bạn từng gặp, và những điều bạn đã không báo cáo.',
    inviteEn: 'Seven Association sends you a questionnaire, not an invitation. Thirty questions about places you have been, people you have met, and things you did not report.',
    expelVi: 'Seven gửi bạn một bản báo cáo về chính bạn: đúng ngày, đúng nơi, không bỏ sót. Cuối bản ghi một dòng cảm ơn vì đã cộng tác. Bạn hiểu ngay rằng việc đọc nó là buổi họp cuối cùng.',
    expelEn: 'Seven sends you a report about yourself: exact dates, exact places, nothing left out. At the bottom, a line thanking you for your cooperation. You understand at once that reading it is the final meeting.',
    cfg: {
      tagVi: 'Hồ sơ của Seven', tagEn: 'Seven File',
      kickerVi: 'Hồ sơ điều tra của Seven', kickerEn: 'A Seven case file',
      careful: ['Thu thập đủ bằng chứng trước khi báo cáo', 'Gather enough proof before reporting'],
      bold: ['Chặn đối tượng giữa chừng, lấy lời khai tại chỗ (thêm 50% Ahn và Merit)', 'Stop the subject mid-route and take the statement on the spot (50% more Ahn and Merit)'],
      intel: ['Xin quyền xem kho hồ sơ của Seven (8 Ahn)', 'Request access to Seven’s archive (8 Ahn)'],
      okFx: { network: 2 }, failFx: { network: -2, sanity: -2 },
      declineVi: 'Seven ghi lại rằng bạn đã đọc hồ sơ và đặt nó xuống. Không ai hỏi vì sao. Họ chỉ nhớ.',
      declineEn: 'Seven records that you read the file and set it down. No one asks why. They simply remember.',
      tiers: tiers(['Một món đồ mất', 'A missing item'], ['Tìm người mất tích', 'A missing person'], ['Điều tra một Office', 'Probing an Office'],
        ['Truy kẻ phá hợp đồng', 'Tracking a contract breaker'], ['Xử phạt sau hợp đồng', 'Post-contract punishment'], ['Hồ sơ liên quan đến Star', 'A file touching a Star'])
    },
    requests: SEVEN_CONTRACTS
  },
  tres: {
    name: 'Tres Association', short: 'Tres',
    specVi: 'kiểm định vũ khí Workshop và thu thuế', specEn: 'Workshop gear review and tax collection',
    fit: (c) => stat(c, 'wealth') >= 38 || Boolean(c.craftWeapon) || (c.inventory || []).some((i) => String(i.id || '').startsWith('wpn_')),
    promoIds: ['fixer_promo_g7_tres'],
    inviteVi: 'Tres Association đặt lên bàn bạn một cuốn sổ đăng ký, một cây thước đo và một bản hợp đồng dài ba trang. Người đưa nói công việc ở đây chủ yếu là đọc số hiệu.',
    inviteEn: 'Tres Association sets a register, a measuring rod and a three-page contract on your table. The one who brought them says the work here is mostly reading serial numbers.',
    expelVi: 'Tres thu hồi giấy phép kiểm định của bạn và gạch tên khỏi sổ đăng ký, từng dòng một. Một cán bộ nói rằng họ không cần người làm sai số hiệu nhiều lần. Họ nói thật nhẹ nhàng.',
    expelEn: 'Tres revokes your inspection license and strikes your name from the register, line by line. An officer says they do not need someone who gets serial numbers wrong repeatedly. They say it very gently.',
    cfg: {
      tagVi: 'Việc của Tres', tagEn: 'Tres Job',
      kickerVi: 'Phiếu kiểm định của Tres', kickerEn: 'A Tres inspection slip',
      careful: ['Kiểm từng món theo biên bản', 'Check every piece against the record'],
      bold: ['Niêm phong và tịch thu ngay tại chỗ (thêm 50% Ahn và Merit)', 'Seal and seize on the spot (50% more Ahn and Merit)'],
      intel: ['Xin sổ đăng ký của Tres để đối chiếu số hiệu (8 Ahn)', 'Request Tres’s register to cross-check serials (8 Ahn)'],
      okFx: { rep: 1, network: 1 }, failFx: { rep: -2 },
      declineVi: 'Tres ghi rằng đợt kiểm này được giao cho người khác. Số hiệu thì không đợi ai.',
      declineEn: 'Tres notes this inspection goes to someone else. Serial numbers wait for no one.',
      tiers: tiers(['Lô vũ khí nhỏ', 'A minor lot'], ['Thu hồi thiết bị chưa đăng ký', 'Recovering unregistered gear'], ['Thu thuế một Office', 'Taxing an Office'],
        ['Kiểm định Workshop lớn', 'Auditing a large Workshop'], ['Truy đường buôn lậu', 'Tracing an arms route'], ['Món cấp Star', 'A Star-grade piece'])
    },
    requests: TRES_CONTRACTS
  },
  devyat: {
    name: 'Devyat’ Association', short: 'Devyat’',
    specVi: 'giao những món hàng hiếm', specEn: 'delivery of rare goods',
    fit: (c) => stat(c, 'health') >= 42 && stat(c, 'network') >= 28,
    promoIds: ['fixer_promo_g4_devzat'],
    inviteVi: 'Devyat’ Association không gửi lời mời. Họ gửi một gói nhỏ bọc vải dầu đến phòng bạn, kèm địa chỉ phải đưa nó đến. Bạn giao đúng giờ, và sáng hôm sau có một giấy hẹn.',
    inviteEn: 'Devyat’ Association sends no invitation. They send a small parcel wrapped in oilcloth to your room, with the address it must reach. You deliver it on time, and the next morning there is an appointment slip.',
    expelVi: 'Devyat’ trả lại cho bạn gói vải dầu cuối cùng, trống rỗng. Không ai nói lý do. Trong sổ, tên bạn được chuyển sang cột những người từng mang hàng của Association.',
    expelEn: 'Devyat’ returns your last oilcloth parcel, empty. No one gives a reason. In the ledger your name moves to the column of those who once carried the Association’s goods.',
    cfg: {
      tagVi: 'Chuyến hàng của Devyat’', tagEn: 'Devyat’ Delivery',
      kickerVi: 'Phiếu giao hàng của Devyat’', kickerEn: 'A Devyat’ delivery slip',
      careful: ['Đi đường vòng, giữ hàng nguyên vẹn', 'Take the long way, keep the goods whole'],
      bold: ['Đi đường thẳng, giao sớm (thêm 50% Ahn và Merit)', 'Go direct and deliver early (50% more Ahn and Merit)'],
      intel: ['Mua tuyến đường sạch từ người dẫn đường của Devyat’ (8 Ahn)', 'Buy a clean route from a Devyat’ guide (8 Ahn)'],
      okFx: { network: 1, rep: 1 }, failFx: { rep: -2, wealth: -2 },
      declineVi: 'Devyat’ giữ hàng ở kho thêm một ngày và chuyển nó cho người khác. Không ai đòi bạn giải thích.',
      declineEn: 'Devyat’ holds the goods in the depot a day longer and hands them to someone else. No one asks you to explain.',
      tiers: tiers(['Gói nhỏ qua hai khu', 'A parcel across two Districts'], ['Hàng dễ vỡ', 'Fragile goods'], ['Hộp niêm phong', 'A sealed case'],
        ['Hàng đang bị săn', 'Goods being hunted'], ['Rương của Poludnitsa', 'A Poludnitsa trunk'], ['Món hàng không ai dám chạm', 'Goods nobody touches'])
    },
    requests: DEVYAT_CONTRACTS
  },
  dieci: {
    name: 'Dieci Association', short: 'Dieci',
    specVi: 'Relic, Ruins và nuôi trẻ mồ côi', specEn: 'Relics, Ruins, and raising orphans',
    fit: (c) => stat(c, 'sanity') >= 45,
    promoIds: ['fixer_promo_g5_dieci'],
    inviteVi: 'Một nhà nghiên cứu của Dieci Association đến hỏi bạn có nhìn thấy thứ gì khác thường ở những nơi bạn đi qua hay không, rồi mời bạn ăn tối với đám trẻ mà Association đang nuôi.',
    inviteEn: 'A Dieci Association researcher asks whether you have seen anything unusual in the places you have passed, then invites you to dinner with the orphans the Association raises.',
    expelVi: 'Dieci không đuổi bạn. Họ nhờ bạn ngừng nhận thêm việc về Ruins. Người nhà nghiên cứu nói bạn đã quá mệt để nhìn thấy cái cần nhìn. Đám trẻ ở bàn ăn vẫn vẫy tay chào bạn khi bạn ra về.',
    expelEn: 'Dieci does not throw you out. They ask you to stop taking Ruins work. The researcher says you are too tired to see what needs seeing. The children at the table still wave as you leave.',
    cfg: {
      tagVi: 'Việc của Dieci', tagEn: 'Dieci Job',
      kickerVi: 'Phiếu khảo sát của Dieci', kickerEn: 'A Dieci survey slip',
      careful: ['Khảo sát trước, chỉ lấy khi chắc chắn', 'Survey first, take only when sure'],
      bold: ['Lao thẳng vào lấy món chính (thêm 50% Ahn và Merit)', 'Rush in for the main piece (50% more Ahn and Merit)'],
      intel: ['Nhờ một nhà nghiên cứu của Dieci đọc bản đồ (8 Ahn)', 'Have a Dieci researcher read the map (8 Ahn)'],
      okFx: { network: 1, sanity: -1 }, failFx: { sanity: -4 },
      declineVi: 'Dieci cử người khác đi. Nhà nghiên cứu ghi rằng bạn đã nhìn thấy nơi ấy, và không chắc bạn có nhìn lại được.',
      declineEn: 'Dieci sends someone else. The researcher notes you have seen the place, and that you may not be able to look at it again.',
      tiers: tiers(['Một mảnh đồ cũ', 'A scrap of the old'], ['Hầm bỏ hoang', 'An abandoned cellar'], ['Ruin nhỏ ngoài khu', 'A minor Ruin'],
        ['Relic bị tranh giành', 'A contested Relic'], ['Ruins sâu ngoài tường', 'Deep Ruins beyond the wall'], ['Nơi một Star từng đứng', 'Where a Star once stood'])
    },
    requests: DIECI_CONTRACTS
  },
  oufi: {
    name: 'Öufi Association', short: 'Öufi',
    specVi: 'thi hành hợp đồng, kể cả bằng bạo lực', specEn: 'contract enforcement, violence included',
    fit: (c) => stat(c, 'rep') >= 35,
    promoIds: ['fixer_promo_g6_oufi'],
    inviteVi: 'Öufi Association gửi đến một bản hợp đồng, đã công chứng, đã đóng dấu, chỉ thiếu chữ ký của bạn. Điều khoản cuối ghi rõ: người ký chịu thi hành cả những điều không ghi trong hợp đồng.',
    inviteEn: 'Öufi Association delivers a contract, already notarized and stamped, missing only your signature. The last clause states plainly: the signatory carries out even what the contract does not say.',
    expelVi: 'Öufi gửi bạn một bản án với tên bạn trong đó, bản án đầu tiên bạn nhận mà không phải thi hành. Điều khoản chấm dứt được đọc to, từng chữ, và bạn ký vào ô cuối cùng bằng tay còn lại.',
    expelEn: 'Öufi sends you a verdict with your own name in it, the first you have received that you do not have to carry out. The termination clause is read aloud, word by word, and you sign the last box with your other hand.',
    cfg: {
      tagVi: 'Việc của Öufi', tagEn: 'Öufi Job',
      kickerVi: 'Bản thi hành của Öufi', kickerEn: 'An Öufi enforcement order',
      careful: ['Đọc điều khoản trước mặt người vi phạm, cho một cơ hội', 'Read the clause to the breacher and give one chance'],
      bold: ['Thi hành ngay, không chờ (thêm 50% Ahn và Merit)', 'Enforce at once, no waiting (50% more Ahn and Merit)'],
      intel: ['Xin bản gốc hợp đồng từ kho công chứng của Öufi (8 Ahn)', 'Pull the original from Öufi’s notary vault (8 Ahn)'],
      okFx: { rep: 1, wealth: 1 }, failFx: { rep: -2, network: -1 },
      declineVi: 'Öufi cử người khác thi hành. Hợp đồng vẫn có hiệu lực, và cái tên của bạn nằm trong biên bản từ chối.',
      declineEn: 'Öufi sends someone else to enforce. The contract still stands, and your name sits in the refusal record.',
      tiers: tiers(['Nhắc nợ cuối tháng', 'A month-end reminder'], ['Thu tài sản thế chấp', 'Seizing collateral'], ['Cưỡng chế một Office nợ', 'Enforcing on a debtor Office'],
        ['Truy kẻ phá hợp đồng', 'Hunting a contract breaker'], ['Bắt Fixer vi phạm điều khoản', 'Seizing a Fixer in breach'], ['Điều khoản với một Star', 'A clause with a Star'])
    },
    requests: OUFI_CONTRACTS
  }
};

/** Smaller crews: they name themselves, take plain work, and stand or fall on how their roster does. */
export const OFFICES = {
  hook: { name: 'Hook Office', short: 'Hook', specVi: 'săn tiền thưởng trong hẻm', specEn: 'bounty work in the alleys', promoIds: [] },
  yun: { name: 'Yun’s Office', short: 'Yun’s', specVi: 'việc vặt và đòi nợ cho khách quen', specEn: 'errands and collections for regulars', promoIds: [] },
  molar: { name: 'Molar Office', short: 'Molar', specVi: 'gác kho và bảo vệ bến', specEn: 'warehouse watch and dock security', promoIds: ['fixer_promo_g5_molar'] }
};

export const OFFICE_CFG = {
  tagVi: 'Việc của Office', tagEn: 'Office Job',
  kickerVi: 'Bảng việc của Office', kickerEn: 'The Office job board',
  careful: ['Làm chậm mà chắc, theo bảng việc', 'Slow and steady, by the job board'],
  bold: ['Nhận phần việc khó nhất (thêm 50% Ahn và Merit)', 'Take the hardest part of the job (50% more Ahn and Merit)'],
  intel: ['Hỏi người điều phối về khách và địa bàn (8 Ahn)', 'Ask the coordinator about the client and the ground (8 Ahn)'],
  okFx: { network: 1 }, failFx: { rep: -1, sanity: -1 },
  declineVi: 'Người điều phối đưa phần việc cho người khác và không nói gì. Bảng việc ghi một dấu bên tên bạn.',
  declineEn: 'The coordinator hands the job to someone else and says nothing. The board puts a mark beside your name.',
  tiers: tiers(['Việc vặt trong hẻm', 'An alley errand'], ['Tiền thưởng nhỏ', 'A small bounty'], ['Đòi nợ cho khách quen', 'A regular’s debt'],
    ['Dọn một ổ', 'Clearing a nest'], ['Tiền thưởng lớn', 'A large bounty'], ['Việc cả Office cùng gánh', 'A job the whole Office carries'])
};
export const OFFICE_REQUESTS = OFFICE_CONTRACTS;

/** What each Section pays and asks. Section 6 is where everyone starts; Section 1 is the top of a branch. */
export const SECTION_TABLE = {
  6: { salary: 1, maxGrade: 9 },
  5: { salary: 1, maxGrade: 7 },
  4: { salary: 2, maxGrade: 6 },
  3: { salary: 2, maxGrade: 5 },
  2: { salary: 3, maxGrade: 4 },
  1: { salary: 4, maxGrade: 3 }
};

export const STANDING_WORDS = [
  [75, 'Vững vàng', 'Secure'],
  [50, 'Ổn định', 'Steady'],
  [30, 'Lung lay', 'Shaky'],
  [0, 'Sắp bị cắt', 'About to be cut']
];
