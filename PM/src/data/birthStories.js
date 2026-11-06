// ============================================================================
// BIRTH, the first lines of a life, assembled from several independent pieces
// (where, who raised you, what was happening that night, the omen, the first
// person you'll grow up with) so that no two starts read alike.
// ============================================================================
import { generatePersonName } from './nameGenerator.js';
import { rollArchetype, ensureNpcAgency } from './npcPersonality.js';

const pick = (arr, rng) => arr[Math.floor(rng() * arr.length) % arr.length];

const PLACE = {
  nest: [
    { vi: 'Bạn chào đời trong phòng hộ sinh Nest {region}. Trên cửa dán mã phòng, trong tay người phụ trách là tờ khai cư trú còn bỏ trống tên.', en: 'You are born in a maternity ward in Nest {region}. A room code hangs on the door; a blank residency form rests in the clerk’s hands.' },
    { vi: 'Bạn chào đời sau những lớp cửa kính dày của Nest {region}. Ai muốn vào thăm cũng phải quét thẻ ngoài hành lang.', en: 'You are born in a building with thick glass doors in Nest {region}. Visitors in the corridor must scan a pass before entering.' },
    { vi: 'Ca sinh vừa xong, nhân viên Nest {region} đã quét thẻ cư trú của bạn hai lượt. Đèn chuyển xanh, họ mới chịu trả thẻ.', en: 'After your birth in Nest {region}, a clerk checks your residency pass twice. The scanner turns green before they hand it back.' },
    { vi: 'Tiếng khóc đầu đời của bạn vang lên đúng lúc đèn Nest {region} chuyển sang ban ngày. Căn phòng sáng bừng theo lịch của Wing.', en: 'Your first cry comes as the lights in Nest {region} switch to daytime mode. The room brightens on the Wing’s schedule.' },
    { vi: 'Bạn chào đời trong phòng khám Nest {region}. Bác sĩ ghi nhịp tim lẫn mã cư trú của bạn lên chung một tờ giấy.', en: 'You are born at a clinic in Nest {region}. The doctor records your heartbeat and residency number on the same form.' },
    { vi: 'Bạn sinh ra trong dãy nhà sát công viên nhân tạo Nest {region}. Sau cánh cửa kín, máy lọc khí chạy đều hơn cả tiếng người ngoài hành lang.', en: 'You are born in housing beside an artificial park in Nest {region}. Behind the sealed door, the air filter is steadier than the voices in the hall.' },
    { vi: 'Bạn cất tiếng khóc dưới đèn phòng sinh Nest {region}. Bác sĩ kiểm tra hai lần rồi đặt bút ký vào ô “đủ điều kiện xuất viện”.', en: 'You cry beneath the lights of a Nest {region} delivery room. The doctor checks you twice, then signs the discharge box.' },
    { vi: 'Bạn sinh ra trong căn hộ ngăn nắp ở Nest {region}. Ngoài cửa sổ, còi tan ca của Wing réo lên; trong nhà, người ta vặn nhỏ radio để nghe tiếng bạn thở.', en: 'You are born in a Nest {region} flat. The Wing’s shift siren sounds outside; inside, someone turns it down to hear you breathe.' }
  ],
  back: [
    { vi: 'Bạn chào đời trong căn phòng thuê xập xệ ở Backstreets {region}. Người đỡ đẻ giấu tấm thẻ Fixer Grade 9 dưới vạt áo, lau tay vào chiếc khăn cũ.', en: 'You are born in a rented room in the {region} Backstreets. The midwife hides a Grade 9 Fixer card beneath her coat and wipes her hands on an old towel.' },
    { vi: 'Bạn sinh ra trong buồng sau tiệm sửa chân tay giả ở Backstreets {region}, giữa mùi dầu máy nồng nặc và chiếc radio rè rè đọc giá Ahn.', en: 'You were born in the back room of a prosthetics shop in the {region} Backstreets, amid pungent machine grease and crackling Ahn market broadcasts.' },
    { vi: 'Mẹ bạn trở dạ ngay trên WARP platform {region}. Bạn chào đời trên băng ghế chờ lạnh buốt, ba người lạ khoác áo mưa đứng quây quanh che chắn.', en: 'Your mother went into labor on a {region} WARP platform. You were born on a freezing metal bench, three strangers in heavy raincoats standing guard.' },
    { vi: 'Bạn chào đời trong phòng khám chui không biển hiệu dưới tầng hầm Backstreets {region}. Gia đình trả viện phí bằng chiếc nhẫn cưới đã cạo sạch số seri.', en: 'You were born in an unmarked basement clinic in the {region} Backstreets. The fee was settled with an old wedding band its serial number scrubbed off.' },
    { vi: 'Bạn sinh ra trên gác xép quán mì đêm ở {region}. Tối ấy quán vẫn đông nghịt, tiếng cụng ly reo hò dưới nhà hòa cùng tiếng khóc đầu đời của bạn.', en: 'You were born in the loft above a midnight noodle shop in {region}. The diner was packed, and the clinking of glasses answered your first cry.' },
    { vi: 'Bạn chào đời trong căn hộ cũ kỹ năm ổ khóa ở Backstreets {region}. Người lớn soát lại từng chốt cửa rồi mới quay về bên nôi.', en: 'You are born in a {region} Backstreets flat with five locks. Someone checks each bolt before returning to the cot.' },
    { vi: 'Bạn sinh ra giữa nhà kho phế liệu ở {region}. Ánh đèn đường lọt qua những tấm tôn rách, rọi xuống chiếc nôi đóng từ thùng đạn rỗng của Atelier Logic.', en: 'You were born in a scrap warehouse in {region}. Moonlight filtered through rusted iron sheets onto a cradle fashioned from an Atelier Logic ammo crate.' },
    { vi: 'Tiếng khóc đầu tiên của bạn lẫn vào tiếng còi đổi ca khu chế xuất Backstreets {region}. Người công nhân đi ngang thả vào nôi đồng xu may mắn.', en: 'Your first cry joined the factory shift horn in {region} Backstreets. A passing laborer tossed a battered lucky coin into your swaddle.' },
    { vi: 'Bạn cất tiếng khóc trong buồng lái xe giao hàng Devyat\' Association ở {region}. Tài xế đỗ dưới gầm cầu vượt, chờ tiếng súng phía trước ngớt dần.', en: 'You cry for the first time in a Devyat\' Association delivery truck in {region}. The driver stops beneath an overpass and waits for the gunfire ahead to ease.' },
    { vi: 'Bạn sinh ra ngay hành lang chung cư tổ ong ở {region}. Toán tuần tra đêm vừa đi ngang, cả dãy nhà nín thở mong bạn đừng khóc to.', en: 'You were born in the corridor of a tenement in {region}. Neighbors held their breath, praying you wouldn’t scream as the night patrol marched by.' },
    { vi: 'Bạn chào đời trong gian buồng kín sau lò rèn ở {region}. Tiếng búa nện sắt đều đặn là âm thanh đầu tiên bạn nghe được trên đời.', en: 'You were born in the back room of a forge in {region}. The steady ring of a smith’s hammer was the first music your ears ever caught.' },
    { vi: 'Bạn cất tiếng khóc chào đời ngay dưới mái hiên hiệu cầm đồ cũ ở {region}. Chủ tiệm hé cửa sắt, đặt xuống tấm chăn rồi kéo cửa lại.', en: 'You are born beneath a pawnshop awning in {region}. The owner opens the iron door a crack, sets down a blanket, and closes it again.' },
    { vi: 'Mẹ bạn sinh bạn ngay trên boong sà lan chở hàng đang cập bến Backstreets {region}, giữa mùi bùn đen nồng nặc và tiếng xích neo rít chói tai.', en: 'Your mother gave birth aboard a cargo barge docking in {region} Backstreets, amid the reek of oily black sludge and grinding mooring chains.' },
    { vi: 'Bạn cất tiếng khóc đầu tiên trên gác áp mái tiệm thuốc thảo mộc Backstreets {region}, nơi mùi rễ cây phơi khô át cả mùi khói kim loại ngoài hẻm.', en: 'You were born in the attic of a Backstreets apothecary in {region}, where the sharp scent of dried roots fought off the metallic stench of the alleys.' },
    { vi: 'Bạn sinh ra trong toa tàu điện ngầm bỏ hoang dưới lòng đất {region}, nơi những kẻ không tên nhóm lửa sưởi qua đêm đông.', en: 'You were born in a decommissioned subway car beneath {region}, where nameless drifters huddled around a rusted barrel fire in the winter chill.' },
    { vi: 'Bạn chào đời trong góc khuất chợ đêm Backstreets {region}, giữa lúc đám bán hàng rong cuống cuồng hạ bạt trốn đợt thu tiền bảo kê bất chợt.', en: 'You were born in the shadow of a {region} night market stall, as hawkers dropped canvas tarps in panic at a surprise shakedown.' }
  ],
  out: [
    { vi: 'Bạn chào đời trong trại bạt ở The Outskirts. Từ đây trông thấy đèn trên tường The City, nhưng chẳng ai nói bao giờ đoàn mới tới gần hơn.', en: 'You are born in a tarp camp in the Outskirts. Lights on the City wall are visible from there. No one says when the caravan might move closer.' },
    { vi: 'Bạn sinh ra trên sàn xe bọc thép đang nấp bão bụi giữa The Outskirts. Người lái để máy nổ suốt đêm cho trong xe còn hơi ấm.', en: 'You are born on the floor of an armored truck sheltering from an Outskirts dust storm. The driver keeps the engine running all night for warmth.' },
    { vi: 'Bạn chào đời dưới căn hầm giữa Ruins. Dấu chân thú dừng ngay trên nắp hầm rồi bỏ đi; người gác đợi sáng hẳn mới mở cửa.', en: 'You are born in a cellar in the Ruins. Animal tracks stop above the hatch, then lead away; the watch waits until morning to open it.' },
    { vi: 'Bạn cất tiếng khóc giữa bãi phế liệu ngoài tường The City. Người lớn che đèn lại để không ai nhìn thấy đoàn từ xa.', en: 'You cry for the first time in a scrap field beyond the City wall. The adults cover their lamps so the caravan cannot be seen from a distance.' },
    { vi: 'Bạn sinh ra bên miệng hố tàn tích ở The Outskirts. Người đỡ đẻ quấn bạn trong mảnh vải sạch cuối cùng trước khi gió cuốn bụi vào lều.', en: 'You are born beside a pit of ruins in the Outskirts. The midwife wraps you in the last clean cloth before dust blows into the tent.' },
    { vi: 'Bạn chào đời giữa đoàn xe lang bạt ở The Outskirts. Còi báo động hú ba hồi; người gác ngó ra ngoài rồi ra hiệu cho mọi người ngủ tiếp.', en: 'You are born with an Outskirts caravan. The alarm sounds three times; the watch looks outside before telling the others to sleep again.' }
  ]
};

const FAMILY = {
  orphan: [
    { vi: 'Người ta nhặt được bạn trong chiếc bao vải trước cửa trạm cứu trợ. Ô tên cha mẹ trong sổ tiếp nhận bỏ trống.', en: 'You are found in a cloth sack outside the shelter. The space for your parents in the intake ledger stays empty.' },
    { vi: 'Bà bán thuốc lá đầu hẻm bế bạn tới trạm cứu trợ. Bà không biết cha mẹ bạn là ai; người trực nhận bạn ngay trước giờ đóng cửa.', en: 'A cigarette vendor brings you to the shelter. She does not know your parents; the night attendant takes you in before locking up.' },
    { vi: 'Chẳng ai đến nhận bạn ở trạm cứu trợ Backstreets. Người trực đêm ghi tên bạn vào sổ rồi kê thêm chiếc giường xếp.', en: 'No one claims you at the Backstreets shelter. The night clerk writes your name in a ledger and unfolds another cot.' }
  ],
  backstreet_worker: [
    { vi: 'Nhà bạn sống nhờ tiền công theo ca. Tờ lịch làm việc dán trên cửa, ngay cạnh hóa đơn tiền phòng.', en: 'Your household lives on shift wages. A work rota hangs on the door beside the rent bill.' },
    { vi: 'Túi đồ đi làm luôn đặt sẵn cạnh cửa. Trước khi đi, người nhà sờ lại thẻ ra vào và tiền xe.', en: 'A work bag sits beside the door. A relative checks their access card and fare before leaving.' },
    { vi: 'Tiền công tuần này được chia vào ba phong bì: tiền ăn, tiền phòng và phần để dành cho bạn.', en: 'The wages go into three envelopes this week: food, rent, and money set aside for you.' }
  ],
  smoke_war_veteran: [
    { vi: 'Người cựu binh trong nhà giữ chiếc mặt nạ phòng độc cũ trên giá áo. Mỗi khi nghe còi báo động, họ kiểm tra nó trước cả khóa cửa.', en: 'The veteran in your household keeps an old respirator on the coat rack. Whenever a siren sounds, they check it before the door lock.' },
    { vi: 'Trong hộc bàn có tấm bản đồ chiến trường gấp mòn cả mép. Người nhà dặn chưa đọc được ký hiệu thì đừng mở ra.', en: 'A battle map with worn folds sits in a drawer. Your relative tells you not to open it until you can read its markings.' },
    { vi: 'Bữa tối thường im lặng khi bản tin nhắc Smoke War. Người cựu binh tắt radio rồi tiếp tục ăn.', en: 'Dinner often falls silent when the news mentions the Smoke War. The veteran switches off the radio and goes on eating.' }
  ],
  fixer_lineage: [
    { vi: 'Ngăn kéo nhà bạn cất tấm thẻ Fixer cũ. Người lớn giữ chìa riêng, chỉ mở khi cần tra số đăng ký.', en: 'An old Fixer license sits in a drawer at home. An adult keeps the key and opens it only to check the registration number.' },
    { vi: 'Người nhà từng nhận việc qua Office nhỏ đầu phố. Trên bàn còn cuốn sổ hợp đồng chi chít những dòng phí bị gạch.', en: 'Someone in your family once took work through a small Office. A contract ledger on the table has several fees crossed out.' },
    { vi: 'Thanh kiếm ngắn treo cao quá tầm tay trẻ nhỏ. Mỗi lần báo đưa tin có người mất tích, người nhà lại lấy xuống lau dầu.', en: 'A short blade hangs out of reach of children. Your relative oils it whenever the news reports another disappearance.' }
  ],
  workshop_apprentice: [
    { vi: 'Nhà bạn mở Workshop nhỏ. Từ phòng bên vọng sang tiếng búa và tiếng thợ đọc số đo trên bản vẽ.', en: 'Your family runs a small Workshop. From the next room come hammer blows and a worker calling out measurements from a drawing.' },
    { vi: 'Trên tường xưởng treo tờ kiểm định của Tres Association. Người lớn cất chìa khóa tủ dụng cụ thật xa nôi bạn.', en: 'A Tres Association inspection sheet hangs on the Workshop wall. The adults keep the tool cabinet key away from your cot.' },
    { vi: 'Khách gửi vũ khí sửa thì nhận mảnh giấy hẹn. Người nhà cất giấy hẹn với Ahn vào hai ngăn riêng.', en: 'Customers leave weapons for repair and take a numbered receipt. Your relatives keep the receipts and Ahn in separate drawers.' }
  ],
  syndicate_soldato: [
    { vi: 'Nhà bạn làm cho một nhánh Five Fingers. Có những cuộc gọi đến giữa bữa cơm khiến cả bàn im bặt.', en: 'Your household works for a branch of the Five Fingers. Some calls arrive during dinner and silence everyone at the table.' },
    { vi: 'Trước khi ra ngoài, người lớn trong nhà kiểm tra dấu hiệu nhận biết của tổ chức trên áo. Bạn được dặn không hỏi họ đi đâu.', en: 'Before leaving, the adults check their organization mark. You are told not to ask where they are going.' },
    { vi: 'Khách của tổ chức thỉnh thoảng ghé lúc nửa đêm. Họ bàn chuyện ở phòng bên; sáng ra, trên bàn chỉ còn tờ hóa đơn và tách trà nguội.', en: 'Visitors from the organization sometimes arrive late at night. They talk in the next room; by morning, only an invoice and a cold cup of tea remain.' }
  ],
  nest_feather: [
    { vi: 'Gia đình bạn có thẻ cư trú Nest. Mỗi kỳ kiểm tra, người nhà bỏ thẻ với hóa đơn phí chung một phong bì.', en: 'Your family holds Nest residency passes. At every inspection, someone puts the passes and fee receipts in one envelope.' },
    { vi: 'Thông báo của Wing ghim trên cửa căn hộ. Người nhà đọc hết từng khoản phí rồi mới gỡ xuống.', en: 'A Wing notice is pinned to the apartment door. Your relatives read every fee before taking it down.' },
    { vi: 'Căn hộ có nước nóng, cửa sổ nhìn về phía Backstreets. Còi đêm vọng lại từ xa là người lớn kéo rèm.', en: 'The apartment has hot water and a window facing the Backstreets. An adult closes the curtain whenever the night siren sounds in the distance.' }
  ],
  wing_executive: [
    { vi: 'Gia đình bạn có người ngồi ban quản lý Wing. Trên tủ hồ sơ ở nhà là tờ lịch họp chỉ ghi giờ, không ghi nội dung.', en: 'Someone in your family works in Wing management. A meeting schedule on the home filing cabinet lists times but no topics.' },
    { vi: 'Người nhà giữ thẻ ra vào khu điều hành trong ví riêng. Đến bàn ăn, họ vẫn phải trả lời cuộc gọi từ công ty.', en: 'Your relative keeps an executive access pass in a separate wallet. They still answer company calls at dinner.' },
    { vi: 'Ngay ngày bạn sinh, phòng nhân sự Wing gửi quà chúc mừng kèm một mẫu cam kết bảo mật. Người nhà ký trước khi mở hộp.', en: 'On the day you are born, Wing personnel sends a gift with a confidentiality form. Your family signs before opening the box.' }
  ],
  dieci_orphan: [
    { vi: 'Trại trẻ của Dieci Association nhận nuôi bạn. Người giữ sổ ghi ngày đến, chừa trống ô người giám hộ.', en: 'A Dieci Association orphanage takes you in. The clerk records your arrival and leaves the guardian field blank.' },
    { vi: 'Nôi bạn kê sát giá sách có khóa. Tối nào người trực cũng đếm lại từng tập tài liệu rồi mới tắt đèn.', en: 'Your cot stands beside a locked bookshelf. Each night, the attendant counts the volumes before turning out the lights.' },
    { vi: 'Người của Dieci mang tới chăn sạch và mảnh giấy ghi tên bạn. Mảnh giấy được kẹp vào sổ tiếp nhận.', en: 'A Dieci worker brings a clean blanket and a slip bearing your name. The slip goes into the intake ledger.' }
  ],
  great_lake_mariner: [
    { vi: 'Người nhà từng làm việc trên Great Lake. Áo đi biển phơi ở góc phòng vẫn còn mùi muối và dầu máy.', en: 'Someone in your family has worked on the Great Lake. A coat drying in the corner still smells of salt and engine oil.' },
    { vi: 'Trong nhà có cuốn sổ ghi giờ xuất bến và những ngày phải tránh mặt hồ. Người lớn gấp sổ lại khi đặt bạn vào nôi.', en: 'A ledger at home lists departure times and days when the lake must be avoided. An adult closes it as you are laid in your cot.' },
    { vi: 'Chiếc còi tàu cũ nằm trong hộp đồ nghề nhà bạn. Người nhà thổi thử một lần rồi dặn đừng thổi gần tai trẻ nhỏ.', en: 'An old ship whistle lies in the family tool box. A relative tests it once and warns the others not to sound it near an infant.' }
  ],
  warp_cleaner_offspring: [
    { vi: 'Người nhà làm trong đội thu dọn của W Corp. Đồng phục đi làm được để riêng trong túi niêm phong; về nhà, họ đi thẳng vào phòng tắm.', en: 'A relative works on the W Corp cleanup crew. Their uniform stays in a sealed bag; when they get home, they go straight to the shower.' },
    { vi: 'Trong nhà có cái tủ lúc nào cũng khóa. Hỏi về mùi thuốc tẩy, người lớn chỉ bảo đó là đồ của ca đêm.', en: 'A cabinet at home stays locked. When you ask about the bleach smell, the adults say it belongs to the night shift.' },
    { vi: 'Trong ngăn hồ sơ gia đình có bản cam kết bảo mật của W Corp. Chữ ký của người nhà nằm ở cuối mỗi trang.', en: 'A W Corp confidentiality agreement sits in the family records. A family member signed the bottom of every page.' }
  ],
  backstreet_bistro: [
    { vi: 'Nhà bạn có quán mì mở sau giờ tan ca. Người lớn đếm tiền trên quầy khi bạn ngủ ở phòng bếp.', en: 'Your family runs a noodle shop after the late shift. An adult counts the takings at the counter while you sleep in the kitchen.' },
    { vi: 'Tay Fixer với hai phu khuân vác ngồi hai đầu quầy. Người nhà ghi tiền từng bàn, còn chuyện họ bàn thì không ghi.', en: 'A Fixer and two porters eat at opposite ends of the counter. Your relative records each bill, not what they discuss.' },
    { vi: 'Bếp quán có lối thông ra ngõ sau. Tối nào người nhà cũng cài lại then cửa ấy rồi mới bắc nồi.', en: 'The kitchen has a door to the back alley. Each night, your family checks its bolt before putting the pot on the stove.' }
  ],
  prosthetic_tinkerer: [
    { vi: 'Gia đình bạn mở phòng khám chân tay giả không giấy phép. Những ngón tay kim loại hỏng cất trong hộp, đặt cao quá tầm với trẻ con.', en: 'Your family runs an unlicensed prosthetics clinic. Broken metal fingers are boxed and kept beyond the reach of children.' },
    { vi: 'Có người tới phòng khám, cánh tay quấn vải. Người nhà kéo rèm ngăn bàn mổ với chỗ bạn nằm.', en: 'A patient arrives with one arm wrapped in cloth. Your family draws a curtain between the operating table and your cot.' },
    { vi: 'Trên bàn là hóa đơn linh kiện với khớp tay giả tháo dở. Người lớn dọn cả hai đi rồi mới đặt bạn nằm ngủ.', en: 'A parts invoice and a half-disassembled prosthetic hand lie on the table. An adult clears both before settling you there for the night.' }
  ],
  outskirts_nomad: [
    { vi: 'Đoàn xe của bạn đóng trại ngoài bức tường The City. Trước khi ngủ, người gác buộc thêm dây vào những tấm bạt.', en: 'Your caravan camps beyond the City wall. Before sleeping, the watch ties down the tarps with extra rope.' },
    { vi: 'Trên xe có tấm bản đồ đường xuyên Ruins. Người dẫn đường lấy mẩu than khoanh lại những chỗ có nước.', en: 'A route map through the Ruins lies in one of the carts. The guide marks a water stop with charcoal.' },
    { vi: 'Trước bình minh, cả đoàn chia nước. Phần của bạn đựng trong chiếc bình nhỏ để cạnh chăn.', en: 'The caravan divides its water before dawn. Your share sits in a small flask beside your blanket.' }
  ]
};

// What was happening in the City that night, pure chance
const THAT_NIGHT = [
  { vi: 'Đêm ấy, bản tin đọc tên con Distortion vừa bị đội Fixer hạ ở District bên. Người lớn vặn nhỏ radio cho bạn ngủ.', en: 'That night, the news names a Distortion a Fixer team handled in the next District. Someone turns down the radio so you can sleep.' },
  { vi: 'Đêm xuống, trời đổ mưa đen, để lại vệt đen trên bậu cửa. Sáng ra, người ta lấy khăn lau đi.', en: 'Rain marks the roof and leaves a dark streak on the sill. In the morning, someone wipes it away.' },
  { vi: 'Đêm ấy, biển quảng cáo của Wing sáng thêm một giờ để mừng hợp đồng mới. Cả khu phố thức theo thứ ánh sáng ấy.', en: 'That night, a Wing’s advertisement stays lit an hour longer to announce a new contract. The whole block stays awake beneath it.' },
  { vi: 'Đêm ấy khu nhà lặng sớm. Người gác soát từng chốt cửa rồi mới giao ca.', en: 'That night, the building grows quiet early. The guard checks each door latch before the next shift.' },
  { vi: 'Đêm ấy, căn hộ bên kia hành lang sáng đèn trở lại sau nhiều tuần bỏ trống. Người gác ghi tên khách mới vào sổ.', en: 'That night, the unit across the hall lights up after weeks of vacancy. The guard records the new tenant in the ledger.' },
  { vi: 'Đêm ấy, điện khu nhà chập chờn. Người đỡ đẻ đặt sẵn đèn pin bên cạnh giường.', en: 'That night, the lights in the building flicker. The birth attendant sets a torch beside the bed.' },
  { vi: 'Đêm ấy, vài tiếng súng vọng lại từ xa. Người trong phòng khép cửa sổ rồi quay về nồi nước nóng.', en: 'That night, a few distant shots carry through the air. Someone closes the window and goes back to heating water.' },
  { vi: 'Đêm ấy trời trở lạnh. Người trông bạn lục thêm tấm chăn rồi mới ra khỏi phòng.', en: 'That night, the air turns cold. Your caretaker finds another blanket before leaving the room.' },
  { vi: 'Đêm ấy, có tay Fixer trú mưa dưới mái hiên sát vách. Nghe tiếng trẻ khóc, người ấy kéo cổ áo lên rồi bước tiếp.', en: 'That night, a Fixer shelters from the rain near where you are born. They hear a child cry, pull up their collar, and move on.' },
  { vi: 'Đêm ấy không có tiếng còi báo động nào. Người trực chỉ ghi giờ sinh rồi thay tấm khăn ướt dưới đầu bạn.', en: 'No alarm sounds that night. The attendant records your birth time and changes the damp cloth beneath your head.' },
  { vi: 'Đêm ấy, chuông báo động của Office gần đó reo vài hồi rồi tắt. Trong phòng chẳng ai biết chuyện gì vừa xảy ra.', en: 'That night, an alarm at a nearby Office rings several times and stops. No one in the room knows what happened.' },
  { vi: 'Đêm ấy, ga WARP gần nhất đón một chuyến tàu trễ lịch. Bảng điện tử sửa giờ đến hai lần trước khi hành khách xuống sân ga.', en: 'That night, the nearest WARP station receives a delayed train. The board changes its arrival time twice before passengers step onto the platform.' },
  { vi: 'Đêm ấy, đèn trạm giám sát trên mái nhà đối diện bật sáng rồi tắt. Đám gác dưới phố im bặt cho đến khi nó tối hẳn.', en: 'That night, a surveillance post across the street lights up, then goes dark. The street guards stop talking until it is fully dark.' },
  { vi: 'Còi Night in the Backstreets vừa dứt thì tiếng khóc của bạn vang lên. Bầy Sweeper cũng vừa lui vào bóng tối.', en: 'The Night in the Backstreets siren had just fallen silent when you cried out. The Sweepers had just slipped back to the dark.' },
  { vi: 'Đêm ấy, tiếng nổ nhỏ làm vỡ cửa kính tiệm cầm đồ cuối phố. Sáng ra, chủ tiệm căng tấm bạt che tạm.', en: 'That night, a small blast shatters the pawnshop window down the street. By morning, the owner has hung a tarp over it.' },
  { vi: 'Đêm ấy, đoàn người đeo mặt nạ lặng lẽ đi ngang ngoài đường. Họ không dừng lại; người trực đợi tiếng bước chân xa hẳn rồi mới mở cửa.', en: 'That night, a masked group passes outside. They do not stop. The attendant waits for their footsteps to fade before opening the door.' }
];

const OMEN_LINE = {
  index_equilibrium: [
    { vi: 'Bà đỡ nghe nhịp thở của bạn rồi ghi đúng một dòng: “Ổn định.” Bà gấp sổ, gọi người kế tiếp.', en: 'The midwife listens to your breathing and writes one line: “Stable.” She closes the ledger and calls for the next patient.' },
    { vi: 'Phòng sinh chẳng có ánh sáng lạ nào. Bạn khóc, có người đưa khăn tới, rồi ca trực cứ thế trôi tiếp.', en: 'No strange light appears in the delivery room. You cry, someone brings a towel, and the shift goes on.' },
    { vi: 'Bác sĩ ghi “thể trạng cân bằng” vào ô theo dõi. Những ô còn lại để trống đến lần khám sau.', en: 'The doctor writes “balanced vitals” in the observation box. The others stay blank until your next examination.' },
    { vi: 'Đồng hồ trong phòng chạy đều suốt đêm bạn sinh. Người canh giờ nhớ điều đó vì đã chờ kim phút chuyển sang ca mới.', en: 'The clock in the room runs steadily through the night of your birth. The timekeeper remembers because they waited for the hand to reach the next shift.' }
  ],
  merciless_head: [
    { vi: 'Ba ngày sau ca sinh, nhân viên B Corp tìm đến đòi chụp mắt bạn. Bản sao để lại phòng khám không ghi lý do.', en: 'Three days after your birth, a B Corp employee asks to photograph your eyes. They give no reason on the copy left at the clinic.' },
    { vi: 'Bạn vừa khóc, thiết bị quan sát đã đậu ngoài cửa sổ phòng sinh. Người trực kéo rèm; nó vẫn lơ lửng đó tới hết ca.', en: 'An observation device settles outside the delivery-room window as you cry. The attendant draws the curtain; it remains until the shift ends.' },
    { vi: 'Góc tờ khai sinh của bạn có ký tự màu đỏ. Người phát thẻ gấp góc ấy vào trong rồi mới giao hồ sơ.', en: 'Your birth form bears a red mark in one corner. The clerk folds that corner inward before handing over the file.' },
    { vi: 'Đêm bạn sinh, còi báo động vang lên hai con phố xa. Sáng hôm sau, bản tin nói một Claw đã xử lý người vi phạm Taboo ở khu ấy.', en: 'An alarm sounds two streets away the night you are born. The next morning, the news reports that a Claw dealt with a Taboo violator there.' }
  ],
  carmen_whisper: [
    { vi: 'Giọng phụ nữ cất lên giữa phòng, bạn liền nín khóc. Người bế bạn hỏi ai vừa nói; chẳng ai nhận.', en: 'You stop crying when a woman’s voice sounds in the room. The person holding you asks who spoke; no one answers.' },
    { vi: 'Người trông bạn kể rằng nhiều đêm bạn thức giấc đúng lúc chiếc radio tắt tiếng. Mở máy lên, họ chỉ nghe rè.', en: 'Your caretaker says you often wake just as the radio cuts out. When they turn it back on, they hear only static.' },
    { vi: 'Bà đỡ thoáng thấy vệt sáng nhạt trong mắt bạn rồi nó tắt ngấm. Bà ngước nhìn đèn trần rồi mới ghi tiếp vào sổ.', en: 'The midwife sees a pale glint in your eyes, then it vanishes. She checks the ceiling light before returning to her notes.' },
    { vi: 'Đêm bạn sinh, người tầng dưới cất giọng hát một giai điệu lạ hoắc. Trước bình minh họ ngừng hát, về sau không nhắc lại lần nào.', en: 'The night you are born, someone downstairs starts singing a tune no one recognizes. They stop before dawn and never mention it again.' }
  ],
  crimson_sweeper_star: [
    { vi: 'Đồng hồ chỉ 3:13 khi bạn khóc tiếng đầu tiên. Từ phía Backstreets, còi báo giờ Sweeper vọng tới rồi im.', en: 'The clock reads 3:13 when you first cry. From the Backstreets, the Sweeper warning siren carries over and falls silent.' },
    { vi: 'Bạn sinh đúng lúc còi Night in the Backstreets vang lên. Người trực đóng cửa sổ trước khi bế bạn đi sâu vào phòng.', en: 'You are born as the Night in the Backstreets siren sounds. The attendant closes the window before carrying you farther into the room.' },
    { vi: 'Đèn cảnh báo hắt vệt đỏ lên trần phòng sinh. Người bên cạnh gọi đùa là “sao Sweeper”, rồi quay ra soát chốt cửa.', en: 'A warning light casts a red streak across the delivery-room ceiling. Someone calls it a “Sweeper star,” then checks the door lock.' },
    { vi: 'Giọt nước đỏ sẫm nhỏ từ kẽ trần xuống chăn bạn. Người trông bạn lau sạch rồi kéo nôi ra xa chỗ dột.', en: 'A dark red drop falls from a ceiling seam onto your blanket. Your caretaker wipes it away and moves the cot from the leak.' }
  ],
  jcorp_rigged_dice: [
    { vi: 'Đêm bạn sinh, hai người ngoài cửa tung đồng xu xem ai đi mua thuốc. Đồng xu lăn tọt xuống gầm ghế; rốt cuộc cả hai cùng đi.', en: 'The night you are born, two people outside flip a coin to decide who will buy medicine. It rolls under a chair; both of them go.' },
    { vi: 'Dưới chân nôi có đồng xu J Corp hai mặt sấp. Chẳng ai nhận mình đã để nó ở đó.', en: 'A double-tailed J Corp coin lies beneath the cot. No one admits to leaving it there.' },
    { vi: 'Người đỡ đẻ lắc viên xúc xắc mòn vẹt trong túi áo rồi ghi giờ sinh của bạn. Chưa ai kịp hỏi, viên xúc xắc đã được cất đi.', en: 'The midwife shakes a worn die in their coat pocket, then writes down your birth time. They put it away before anyone asks.' },
    { vi: 'Bản tin đêm báo cổ phiếu Wing rớt giá thê thảm. Người trực phòng sinh tắt radio; sáng ra mới bật lại xem còn rớt nữa không.', en: 'The night bulletin reports a steep fall in one Wing’s shares. The ward attendant switches off the radio and checks again in the morning.' }
  ],
  bloodline_echo: [
    { vi: 'Sáng hôm sau, trước cửa có chiếc hộp sắt không đề tên. Bên trong là tấm thẻ mẻ cạnh, dãy số trên mặt đã bị cạo mất.', en: 'The morning after your birth, an unmarked iron box lies outside the door. Inside is a chipped identity plate with its number scraped away.' },
    { vi: 'Người khách lạ nhìn bàn tay bạn rồi hỏi họ nhà bạn. Nghe xong, họ buột miệng nhắc tới Book of Vengeance rồi bỏ đi ngay.', en: 'A visitor studies your hand and asks for your family name. On hearing it, they mention the Book of Vengeance and leave.' },
    { vi: 'Bạn đang khóc thì có người đặt cuốn sổ tay cũ lên bàn rồi khóa lại. Chìa khóa cất ở chỗ khác.', en: 'As you cry, someone sets an old notebook on the table and locks it. They put the key somewhere else.' },
    { vi: 'Lá thư niêm sáp đỏ được gửi tới nhà bạn. Người nhận không bóc trước mặt bạn; ngón tay họ đè lên tên người gửi.', en: 'A red-sealed letter arrives where you live. The recipient does not open it in front of you; their finger covers the sender’s name.' }
  ]
};

/* ---------- the childhood friend: the first named person in your life ---------- */

export function makeNpc(role, rng, extra = {}) {
  const { regionId = null, nest = false, avoidNames = [], ...rest } = extra;
  const taken = new Set();
  for (const n of avoidNames.filter(Boolean)) {
    const lower = String(n).toLowerCase();
    taken.add(lower);
    taken.add(lower.split(' ')[0]);
  }
  const clashes = (nm) => taken.has(nm.toLowerCase()) || taken.has(nm.toLowerCase().split(' ')[0]);
  let id = generatePersonName(rng, { regionId, nest });
  for (let tries = 0; tries < 16 && clashes(id.name); tries++) {
    id = generatePersonName(rng, { regionId, nest });
  }
  const arch = rollArchetype(rng);
  const shouldPromptName = ['friend', 'lover', 'spouse'].includes(role) && !rest.nameVi && !rest.namedPrompted;
  return ensureNpcAgency({
    role,
    nameVi: id.name,
    nameEn: id.name,
    fullName: id.full,
    alias: id.alias,
    archetype: arch.id,
    tags: [...arch.tags],
    traitVi: arch.vi,
    traitEn: arch.en,
    wantVi: arch.wantVi,
    wantEn: arch.wantEn,
    fearVi: arch.fearVi,
    fearEn: arch.fearEn,
    bond: 12 + Math.floor(rng() * 13),
    questsDone: 0,
    deceased: false,
    status: 'alive',
    metAge: 0,
    lastSeen: rest.lastSeen ?? (rest.metAge || 0),
    ageAtMeet: role === 'mentor' ? (rest.metAge || 0) + 20 : role === 'child' ? 0 : (rest.metAge || 0),
    memories: [],
    needsNaming: shouldPromptName,
    namedPrompted: Boolean(rest.namedPrompted),
    ...rest
  }, rng);
}

const FRIEND_LINE = [
  { vi: 'Nhà bên có một đứa trẻ sinh cùng tháng tên {friend}. Hai chiếc nôi thường được đặt gần nhau khi người lớn thay ca.', en: 'A child named {friend} is born next door that month. The adults often set your two cots together when shifts change.' },
  { vi: '{friend} sống cùng dãy nhà. Lúc này, hai đứa chỉ biết tên nhau qua lời người lớn gọi.', en: '{friend} lives on your block. For now, you know each other’s names only from the adults calling them.' },
  { vi: 'Một gia đình ở cuối dãy nhà có đứa trẻ tên {friend}. Hai đứa được đưa ra hành lang cùng một buổi sáng.', en: 'A family at the end of the block has a child named {friend}. You are both carried into the corridor one morning.' }
];

const OUTSKIRTS_NIGHT = [
  { vi: 'Đêm ấy, người gác trại đếm đủ từng chiếc xe trước khi dập lửa. Ngoài tường thành, không có ai đến khi nghe tiếng trẻ khóc.', en: 'That night the camp watch counted every cart before putting out the fire. Beyond the wall, no one came at the sound of a newborn crying.' },
  { vi: 'Đêm ấy gió lùa qua tấm bạt. Người trông bạn lấy hai chiếc áo cũ chèn vào khe hở rồi thức đến sáng giữ chúng khỏi bay.', en: 'Wind pulled at the camp tarp that night. The person looking after you stuffed two coats into the gap and stayed awake to keep them there.' },
  { vi: 'Đêm ấy, ánh đèn The City hiện trên đường chân trời. Đoàn xe không đi về phía ấy; người dẫn đường bảo phải chờ đủ hàng mới đến được chân tường.', en: 'The City lights showed on the horizon that night. The caravan did not head toward them; the guide said they needed a full load before approaching the wall.' }
];

const OUTSKIRTS_OMEN = {
  index_equilibrium: { vi: 'Người đỡ đẻ nghe nhịp thở đều của bạn rồi gật đầu. Bà ghi ngày sinh bằng than lên thành xe để sáng mai còn nhớ.', en: 'The midwife listens to your steady breathing and nods. She writes your birth date in charcoal on the truck so she will remember it in the morning.' },
  merciless_head: { vi: 'Sáng hôm sau, một mảnh giấy ghi đúng tên bạn được tìm thấy dưới bánh xe. Không ai trong trại nhận là đã viết.', en: 'The next morning, a slip bearing your name is found beneath a wheel. No one in camp admits to writing it.' },
  carmen_whisper: { vi: 'Bạn ngừng khóc giữa lúc trại im tiếng. Người ôm bạn nhìn quanh, rồi kéo tấm bạt che kín hơn.', en: 'You stop crying as the camp falls quiet. The person holding you looks around and draws the tarp tighter.' },
  crimson_sweeper_star: { vi: 'Người gác trại nhìn về phía tường khi bạn ra đời. Còi từ bên trong vọng ra rất xa; ông ta chờ nó tắt rồi mới nhóm lại lửa.', en: 'The camp watch looked toward the wall as you were born. A siren carried from inside the City; he waited for it to stop before relighting the fire.' },
  jcorp_rigged_dice: { vi: 'Một người trong đoàn tung đồng xu để đoán sáng mai có đi tiếp được không. Đồng xu rơi xuống cạnh nôi bạn, đứng nghiêng giữa hai viên đá.', en: 'Someone in the caravan flipped a coin to decide whether they could travel at dawn. It landed beside your cot, balanced between two stones.' },
  bloodline_echo: { vi: 'Có người đặt chiếc thẻ cũ cạnh chăn bạn. Số trên thẻ đã bị cạo sạch; không ai trong đoàn hỏi nó từ đâu đến.', en: 'Someone sets an old identity plate beside your blanket. Its number has been scraped away; no one in the caravan asks where it came from.' }
};

const OUTSKIRTS_FRIEND = [
  { vi: '{friend} sinh cùng mùa trong đoàn xe. Người lớn đặt hai chiếc chăn cạnh nhau khi trại dừng lại.', en: '{friend} is born in the caravan that season. The adults lay your blankets side by side when camp stops.' },
  { vi: 'Một đứa trẻ tên {friend} đi cùng đoàn xe. Hai đứa được chở trên cùng một thùng hàng đã lót vải.', en: 'A child named {friend} travels with the caravan. You ride in the same cloth-lined freight crate.' }
];

const fill = (s, map) => Object.entries(map).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, v), s);

export function isExtraBirthEntry(entry) {
  if (!entry || entry.age !== 0) return false;
  // Đợt 120/121: log_birth_3 (Bạn thời thơ ấu) và log_legacy_0 (Di sản thế hệ) không bị gập
  if (entry.id === 'log_birth_3' || entry.id === 'log_legacy_0' || entry.id === 'log_parent_living') return false;
  // Gập phần mô tả dài đêm sinh & gia cảnh (log_birth_1)
  if (entry.id === 'log_birth_1') return true;
  return false;
}

/**
 * Returns the opening log lines and the childhood friend for a newborn.
 * `kind` is 'nest' | 'back' | 'out'.
 */
export function composeBirth({ kind, familyId, omenId, regionVi, regionEn, regionId = null, name, generation, rng }) {
  const place = pick(PLACE[kind] || PLACE.back, rng);
  const fam = pick(FAMILY[familyId] || FAMILY.backstreet_worker, rng);
  const night = pick(kind === 'out' ? OUTSKIRTS_NIGHT : THAT_NIGHT, rng);
  const omen = kind === 'out'
    ? OUTSKIRTS_OMEN[omenId] || OUTSKIRTS_OMEN.index_equilibrium
    : pick(OMEN_LINE[omenId] || OMEN_LINE.index_equilibrium, rng);
  const hasFriend = rng ? rng() < 0.50 : Math.random() < 0.50;
  const friend = hasFriend ? makeNpc('friend', rng, { regionId, nest: kind === 'nest', avoidNames: [name] }) : null;
  const fl = hasFriend ? pick(kind === 'out' ? OUTSKIRTS_FRIEND : FRIEND_LINE, rng) : null;

  const head = generation > 1
    ? { vi: `Thế hệ #${generation}. Bạn được đặt tên là ${name}.`, en: `Generation #${generation}. You were named ${name}.` }
    : { vi: `Bạn được đặt tên là ${name}.`, en: `You were named ${name}.` };

  return {
    friend,
    lines: [
      {
        type: 'milestone',
        vi: `[Khu vực sinh ra] ${fill(place.vi, { region: regionVi })} ${head.vi}`,
        en: `[Birthplace] ${fill(place.en, { region: regionEn })} ${head.en}`
      },
      {
        type: 'daily',
        vi: `[Gia cảnh & Đêm sinh] ${fam.vi} ${night.vi}`,
        en: `[Family & Birth Night] ${fam.en} ${night.en}`
      },
      {
        type: 'daily',
        vi: omen.vi.startsWith('[') ? omen.vi : `[Điềm định mệnh] ${omen.vi}`,
        en: omen.en.startsWith('[') ? omen.en : `[Fate Omen] ${omen.en}`,
        omen: true
      },
      hasFriend ? {
        type: 'daily',
        vi: `[Bạn thời thơ ấu] ${fill(fl.vi, { friend: friend.nameVi, trait: friend.traitVi })}`,
        en: `[Childhood Companion] ${fill(fl.en, { friend: friend.nameEn, trait: friend.traitEn })}`
      } : {
        type: 'daily',
        vi: kind === 'out'
          ? '[Chưa có bạn cùng tuổi] Đoàn xe có nhiều người, nhưng lúc này không có đứa trẻ nào sinh gần ngày với bạn.'
          : `[Chưa có bạn cùng tuổi] Trong khu nhà ở ${regionVi}, chưa ai giới thiệu một đứa trẻ cùng tuổi với bạn.`,
        en: kind === 'out'
          ? '[No Child Your Age Yet] The caravan holds many people, but for now none were born close to your date.'
          : `[No Child Your Age Yet] No one in your ${regionEn} building has introduced another child your age.`,
      }
    ]
  };
}
