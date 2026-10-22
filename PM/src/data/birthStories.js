// ============================================================================
// BIRTH, the first lines of a life, assembled from several independent pieces
// (where, who raised you, what was happening that night, the omen, the first
// person you'll grow up with) so that no two starts read alike.
// ============================================================================
import { generatePersonName } from './nameGenerator.js';
import { rollArchetype } from './npcPersonality.js';

const pick = (arr, rng) => arr[Math.floor(rng() * arr.length) % arr.length];

const PLACE = {
  nest: [
    { vi: 'Bạn chào đời trong viện sinh sản trung tâm của Nest {region}. Khử khuẩn tuyệt đối, không khí tinh lọc ba lớp, sạch sẽ đến mức không còn một chút mùi vị của sự sống tự nhiên.', en: 'You were born in the central maternity institute of Nest {region}. Perfectly sterilized, triple-filtered air, so immaculate it lacked any trace of natural life.' },
    { vi: 'Bạn sinh ra ở tầng thứ 48 của một tòa tháp hợp kim kính trong Nest {region}. Qua ô cửa chống đạn, những con hẻm Backstreets bên dưới chỉ là những vệt sáng leo lét như than tàn.', en: 'You were born on the 48th floor of an alloy-glass spire in Nest {region}. Through bulletproof panes, the Backstreets below were only faint embers of distant grime.' },
    { vi: 'Ca sinh nở của bạn được Wing bảo trợ hoàn toàn theo hạn ngạch phúc lợi nhân viên. Hai vệ sĩ an ninh cầm khiên đứng canh ngoài cửa; Nest {region} bảo vệ tài sản của nó rất chu đáo.', en: 'Your birth was fully underwritten by the Wing under employee quota benefits. Two shield-bearers stood guard outside; Nest {region} guards its assets well.' },
    { vi: 'Bạn khóc tiếng đầu tiên đúng lúc trần vòm của Nest {region} bật chế độ mô phỏng bầu trời xanh nhân tạo và tiếng chim hót ghi âm sẵn.', en: 'You gave your first cry just as the ceiling dome of Nest {region} simulated an artificial blue sky and prerecorded birdsong.' },
    { vi: 'Bạn chào đời trong một dưỡng đường tư nhân dành cho chuyên viên cấp cao của Wing tại Nest {region}. Mọi chỉ số sinh trắc học của bạn được đồng bộ ngay lập tức vào cơ sở dữ liệu.', en: 'You were born in a private clinic for senior Wing specialists in Nest {region}. Every biometric marker was instantly synced into corporate archives.' },
    { vi: 'Bạn sinh ra trong khu dinh thự biệt lập giữa công viên sinh thái nhân tạo của Nest {region}. Nơi đây không có khói bụi, chỉ có mùi dung môi bảo quản và tiếng quạt thông gió êm ru.', en: 'You were born in a secluded estate within Nest {region}’s synthetic park. No smog here—only the hum of scrubbers and the faint tang of preservation solvents.' },
    { vi: 'Bạn cất tiếng khóc đầu tiên dưới ánh đèn quang học không bóng của phòng giải phẫu Nest {region}, nơi bác sĩ đeo kính thực tế tăng cường kiểm tra từng chỉ số tế bào.', en: 'You cried out beneath shadowless surgical lamps in Nest {region}, where surgeons wearing augmented visors audited every cellular metric.' },
    { vi: 'Bạn sinh ra trong căn hộ kính nhìn thẳng ra đài tưởng niệm Singularity của Wing tại Nest {region}. Tiếng còi tan ca của khối văn phòng vang lên như một bản hòa ca máy móc.', en: 'You were born in a glass flat overlooking the Wing’s Singularity monument in Nest {region}. Office dismissal sirens sounded like a disciplined mechanical hymn.' }
  ],
  back: [
    { vi: 'Bạn chào đời trong một căn phòng thuê ở Backstreets của {region}. Bà đỡ là một Fixer Grade 9 thất nghiệp, nhận đỡ đẻ để trừ bớt tiền nợ thuê nhà.', en: 'You were born in a rented room in the Backstreets of {region}. The midwife was an out-of-work Grade 9 Fixer working off her back rent.' },
    { vi: 'Bạn sinh ra ở phòng sau một tiệm sửa chân tay giả trong Backstreets {region}, giữa mùi dầu máy nồng nặc và tiếng radio rè rè phát bản tin thị trường Ahn.', en: 'You were born in the back room of a prosthetics shop in the {region} Backstreets, amid pungent machine grease and crackling Ahn market broadcasts.' },
    { vi: 'Mẹ bạn chuyển dạ trên WARP platform của {region}. Bạn chào đời trên băng ghế chờ lạnh buốt, giữa ba người lạ khoác áo mưa đứng che chắn.', en: 'Your mother went into labor on a {region} WARP platform. You were born on a freezing metal bench, three strangers in heavy raincoats standing guard.' },
    { vi: 'Bạn chào đời trong một phòng khám chui không biển hiệu dưới tầng hầm Backstreets {region}. Tiền viện phí được gia đình trả bằng một chiếc nhẫn cưới đã cạo sạch số seri.', en: 'You were born in an unmarked basement clinic in the {region} Backstreets. The fee was settled with an old wedding band its serial number scrubbed off.' },
    { vi: 'Bạn sinh ra trên căn gác xép của một quán mì đêm ở {region}. Tối hôm đó quán vẫn đông nghịt khách, và tiếng cụng ly reo hò vang lên cùng tiếng khóc đầu đời của bạn.', en: 'You were born in the loft above a midnight noodle shop in {region}. The diner was packed, and the clinking of glasses answered your first cry.' },
    { vi: 'Bạn chào đời trong một căn hộ ở Backstreets {region} có đến năm lớp khóa cơ học. Cha bạn cẩn thận vặn từng chốt khóa trước khi cúi xuống bế bạn.', en: 'You were born in a {region} Backstreets flat with five heavy deadbolts. Your father checked every tumbler before he dared hold you.' },
    { vi: 'Bạn sinh ra trong một nhà kho vật liệu cũ ở {region}. Ánh trăng luồn qua những tấm tôn rách, rọi lên chiếc nôi làm từ thùng đạn rỗng của Atelier Logic.', en: 'You were born in a scrap warehouse in {region}. Moonlight filtered through rusted iron sheets onto a cradle fashioned from an Atelier Logic ammo crate.' },
    { vi: 'Tiếng khóc đầu tiên của bạn hòa vào tiếng còi tầm đổi ca của khu chế xuất Backstreets {region}. Một người công nhân đi ngang qua đã ném vào nôi một đồng xu may mắn.', en: 'Your first cry joined the factory shift horn in {region} Backstreets. A passing laborer tossed a battered lucky coin into your swaddle.' },
    { vi: 'Bạn cất tiếng khóc trong buồng lái một chiếc xe tải giao hàng của Devyat\' Association tại {region}, khi cỗ xe đang phóng bạt mạng qua làn đạn của hai băng đảng.', en: 'You gave your first cry in the cab of a Devyat\' courier truck in {region}, speeding headlong through crossfire between two warring clans.' },
    { vi: 'Bạn sinh ra bên hành lang một chung cư tổ ong ở {region}. Cả dãy hành lang nín thở cầu nguyện bạn đừng khóc quá to khi toán tuần tra đêm vừa lướt qua.', en: 'You were born in the corridor of a tenement in {region}. Neighbors held their breath, praying you wouldn’t scream as the night patrol marched by.' },
    { vi: 'Bạn chào đời trong gian phòng kín của một xưởng rèn thủ công ở {region}. Tiếng búa đập kim loại nhịp nhàng là âm thanh đầu tiên bạn nghe thấy trên đời.', en: 'You were born in the back room of a forge in {region}. The steady ring of a smith’s hammer was the first music your ears ever caught.' },
    { vi: 'Bạn sinh ra bên dưới mái hiên của một hiệu cầm đồ cũ ở {region}. Chủ tiệm nhìn qua khe cửa sắt rồi ném ra một tấm chăn bông cũ phủi bụi.', en: 'You were born beneath the awning of an old pawnshop in {region}. The owner peered through the iron slit and tossed out a dust-beaten quilt.' },
    { vi: 'Mẹ bạn sinh bạn ngay trên boong một sà lan chở hàng cập bến Backstreets {region}, giữa mùi bùn đen nồng nặc và tiếng xích neo rít lên chói tai.', en: 'Your mother gave birth aboard a cargo barge docking in {region} Backstreets, amid the reek of oily black sludge and grinding mooring chains.' },
    { vi: 'Bạn cất tiếng khóc đầu tiên trong căn phòng áp mái của một tiệm thuốc thảo mộc Backstreets {region}, nơi mùi rễ cây khô át đi mùi khói kim loại bên ngoài.', en: 'You were born in the attic of a Backstreets apothecary in {region}, where the sharp scent of dried roots fought off the metallic stench of the alleys.' },
    { vi: 'Bạn sinh ra trong một toa tàu điện ngầm bỏ hoang dưới lòng đất {region}, nơi những người không tên tụ tập nhóm lửa sưởi ấm qua đêm đông.', en: 'You were born in a decommissioned subway car beneath {region}, where nameless drifters huddled around a rusted barrel fire in the winter chill.' },
    { vi: 'Bạn chào đời trong góc khuất của một khu chợ đêm Backstreets {region}, khi những người bán hàng rong vội vã hạ bạt trốn đợt thu phí bảo kê bất thường.', en: 'You were born in the shadow of a {region} night market stall, as hawkers dropped canvas tarps in panic at a surprise shakedown.' }
  ],
  out: [
    { vi: 'Bạn chào đời trong một trại tạm che bạt rách ngoài The Outskirts. Ở phía xa chân trời, bức tường khổng lồ của The City sáng rực suốt đêm như một ngọn đèn lồng sắt.', en: 'You were born in a makeshift camp in The Outskirts. Far off, the colossal wall of The City blazed throughout the night like an iron lantern.' },
    { vi: 'Bạn sinh ra trên sàn một chiếc xe bọc thép rỉ sét đang rồ ga chạy trốn bão cát ngoài The Outskirts. Không ai dám giảm tốc độ, vì bóng quái vật vẫn lượn lờ phía sau.', en: 'You were born on the deck of a rusted rig outracing an Outskirts sandstorm. No one eased off the gas, for shapes still slithered behind.' },
    { vi: 'Bạn chào đời trong một căn hầm đổ nát dưới Ruins cổ đại. Người lớn bảo bạn may mắn: đàn thú săn mồi đêm ấy đã đi ngang qua nắp hầm mà không ngửi thấy mùi máu.', en: 'You were born in a cellar beneath ancient Ruins. The elders called you blessed: the pack of horrors passed straight overhead without catching scent.' },
    { vi: 'Bạn cất tiếng khóc đầu tiên giữa sa mạc phế liệu ngoài rìa The City, dưới bầu trời đêm đầy sao thật — thứ mà những người sống trong Nest không bao giờ nhìn thấy.', en: 'You gave your first cry amid scrap dunes outside the City, beneath real stars that residents inside the Nest would never once behold.' },
    { vi: 'Bạn sinh ra bên một hố sâu chứa tàn tích kim loại không rõ nguồn gốc ở The Outskirts. Cha bạn dùng mảnh áo tơi cắt rốn cho bạn giữa cơn gió lạnh thấu xương.', en: 'You were born beside an abyss of forgotten Ruin relics in The Outskirts. Your father cut the cord with a sharpened tarp ring in biting gale.' },
    { vi: 'Bạn chào đời trong đoàn xe du mục lang bạt ngoài The Outskirts. Chiếc còi báo động quái thú hú vang ba lần đúng khoảnh khắc bạn cất tiếng khóc chào đời.', en: 'You were born into an Outskirts nomad caravan. The beast horn wailed three warning blasts the exact second you drew your first breath.' }
  ]
};

const FAMILY = {
  orphan: [
    { vi: 'Bạn không biết mặt cha mẹ. Người ta tìm thấy bạn quấn trong bao tải đựng bột mì trước cửa một nhà nguyện hoang tàn.', en: 'You never knew your parents. Found wrapped in a flour sack upon the steps of a gutted chapel.' },
    { vi: 'Mẹ bạn mất ngay lúc sinh, cha bạn biến mất vào hẻm tối một tuần sau. Một bà lão bán thuốc lá nhận nuôi bạn vì chiếc giường cũ trong góc vừa có người dọn đi.', en: 'Your mother passed in childbirth; your father vanished into the dark alleys a week later. An old cigarette vendor took you in because a corner cot was vacant.' },
    { vi: 'Bạn lớn lên ở góc phố Backstreets, nơi những đứa trẻ không tên tự học cách chia nhau mẩu bánh mì khô và truyền tai nhau tiếng còi Sweeper lúc nửa đêm.', en: 'You grew up on Backstreets curbs, where nameless kids shared dry crusts and whispered alerts of the midnight Sweeper sirens.' }
  ],
  backstreet_worker: [
    { vi: 'Cha bạn làm ca đêm ở xưởng đúc, mẹ bạn khâu da thuê. Họ kiệt sức đến mức chỉ có thể hôn lên trán bạn khi bạn đã ngủ say.', en: 'Your father worked night foundry shifts, your mother stitched leather for wages. They were so worn they could only kiss your forehead while you slept.' },
    { vi: 'Gia đình bạn mở một tiệm tạp hóa nhỏ trong hẻm. Tiền lời cả tháng vừa đủ để nộp phí bảo vệ cho băng đảng và thay mới hai ổ khóa cửa.', en: 'Your family ran a tight corner grocery. Monthly margins barely covered syndicate protection tariffs and two replacement deadbolts.' },
    { vi: 'Cha mẹ bạn dạy bạn bài học đầu tiên của người thường ở The City: cúi đầu khi đi qua người mặc áo khoác dài, và đừng bao giờ tò mò chuyện nhà bên.', en: 'Your parents gave you the commoner’s first lesson in The City: keep your chin down before long coats, and never wonder what screams next door.' }
  ],
  smoke_war_veteran: [
    { vi: 'Cha bạn trở về từ Smoke War với lá phổi nám đen và chiếc mặt nạ phòng độc cũ. Ông ho khan từng cơn mỗi đêm, nhưng nắm tay bạn chặt như kìm sắt.', en: 'Your father returned from the Smoke War with charred lungs and a dented respirator. He coughed up soot nightly, but held your hand like a vise.' },
    { vi: 'Mẹ bạn là cựu lính công binh sống sót sau thảm kịch L Corp cũ. Dưới gầm giường nhà bạn luôn giấu một khẩu súng trường báng gỗ và chiếc la bàn vỡ mặt kính.', en: 'Your mother was an engineer who survived the old L Corp ashes. Beneath the floorboards lay a scarred rifle and a compass with cracked glass.' },
    { vi: 'Trong nhà bạn, bữa cơm tối luôn diễn ra trong yên lặng. Cha bạn vẫn giật mình mỗi khi nghe tiếng còi hú, và kể cho bạn nghe về thứ khói ăn mòn da thịt năm xưa.', en: 'Dinner in your home was eaten in heavy silence. Your father flinched at distant sirens, whispering grim tales of the smoke that drank human marrow.' }
  ],
  fixer_lineage: [
    { vi: 'Cha bạn từng là Fixer Grade 6. Sau một phi vụ mất ba ngón tay, ông lui về ở ẩn nhưng đêm nào cũng lau chùi thanh đoản kiếm bằng dầu chống gỉ.', en: 'Your father was once a Grade 6 Fixer. Retiring after losing three fingers on a botched contract, he oiled his short blade every single night.' },
    { vi: 'Mẹ bạn là Fixer của một Office nhỏ. Cứ cuối tuần bà lại về nhà với mùi máu khô và thuốc sát trùng, đặt lên bàn những đồng tiền Ahn nhuốm bụi đường.', en: 'Your mother worked contracts for a small Office. Every weekend she came home smelling of iodine and dried gore, dropping soot-stained Ahn on the table.' },
    { vi: 'Cha mẹ bạn gặp nhau khi được hai văn phòng đối địch thuê trừ khử nhau. Họ nhìn thấy vết thương trên người đối phương, buông vũ khí và cùng nhau trốn vào hẻm sâu.', en: 'Your parents met when rival offices hired them to slit each other’s throats. Seeing each other’s scars, they threw down their steel and fled together.' }
  ],
  workshop_apprentice: [
    { vi: 'Gia đình bạn sở hữu một xưởng chế tác vũ khí thủ công. Âm thanh búa đập đe và mùi dung dịch tôi thép nồng nặc là ký ức ấu thơ sâu sắc nhất của bạn.', en: 'Your family ran a small workshop forge. The ring of steel on anvil and the bite of quenching acid were the deepest memories of your infancy.' },
    { vi: 'Cha bạn là thợ cơ khí được Tres Association cấp chứng chỉ. Ngay từ năm lên ba, món đồ chơi đầu tiên của bạn là một chiếc cờ-lê bằng hợp kim nhẹ.', en: 'Your father was a craftsman certified by Tres Association. At age three, your favorite rattle was a lightweight alloy wrench.' },
    { vi: 'Mẹ bạn rèn vũ khí cho các Fixer văn phòng. Bà dạy bạn cách phân biệt thép thường với hợp kim chịu lực, và cảnh báo đừng bao giờ chạm vào lò nung lúc nửa đêm.', en: 'Your mother forged blades for local Fixers. She taught you how to read stress lines in tempered steel and warned you never to touch the forge after midnight.' }
  ],
  syndicate_soldato: [
    { vi: 'Gia đình bạn thuộc một nhánh của Năm Ngón Tay. Trong nhà, tôn ti trật tự và quy tắc ứng xử được thực thi nghiêm ngặt hơn cả pháp luật của The Head.', en: 'Your family served a branch of the Five Fingers. In your house, etiquette and syndicate hierarchy were enforced far harsher than City Taboos.' },
    { vi: 'Cha bạn là một Soldato mang đầy hình xăm kỷ luật. Mỗi khi có lệnh triệu tập của Capo, ông chỉnh lại cổ áo, hôn tạm biệt bạn rồi bước ra bóng đêm.', en: 'Your father was a tattooed Soldato bound by blood oaths. Whenever the Capo summoned, he straightened his lapels, kissed your cheek, and stepped into the dark.' },
    { vi: 'Bạn lớn lên với những vị khách ghé thăm vào lúc 2 giờ sáng: những gã đàn ông mặc complet sẫm màu, nói năng nhỏ nhẹ nhưng mang theo vali nặng trĩu tiền và súng đạn.', en: 'You grew up around 2 AM visitors: men in tailored dark suits who spoke in quiet whispers and carried locked briefcases of steel and cash.' }
  ],
  nest_feather: [
    { vi: 'Cha mẹ bạn là Feather: cư dân hợp pháp của Nest. Họ sống bằng sự thận trọng tuyệt đối, tuân thủ từng hạn ngạch và không bao giờ dám chỉ trích Wing.', en: 'Your parents were Feathers: legal Nest residents. They survived on immaculate compliance, meeting quotas and never uttering a word against the Wing.' },
    { vi: 'Mẹ bạn là chuyên viên hành chính của tập đoàn, cha bạn là kỹ sư vận hành. Cả nhà sợ nhất một điều: một ngày nào đó bị tước thẻ cư dân và đuổi ra Backstreets.', en: 'Your mother was a corporate clerk, your father a systems engineer. Their single terror was having their citizen pass revoked and cast into the Backstreets.' },
    { vi: 'Bạn lớn lên trong căn hộ tiện nghi của Nest, nơi nước nóng chảy ra từ vòi và có điều hòa nhiệt độ. Bạn chỉ biết về Backstreets qua những bản tin cảnh báo trên màn hình.', en: 'You grew up in a clean Nest flat with piped hot water and climate control, knowing the Backstreets only from curfew warnings on holo-screens.' }
  ],
  wing_executive: [
    { vi: 'Bạn sinh ra trong một gia đình thuộc tầng lớp quản lý cấp cao của Wing. Ngay từ ngày chào đời, hồ sơ của bạn đã có một mã nhân viên kế vị dự phòng.', en: 'You were born into senior Wing management royalty. From day one, your dossier held a reserved succession employee ID.' },
    { vi: 'Dòng họ bạn nắm giữ ghế trong hội đồng điều hành chi nhánh. Xung quanh bạn từ nhỏ là những gia sư dạy chính trị, luật cấm kỵ của The Head và những âm mưu gia tộc.', en: 'Your bloodline held seats on the executive council. You were surrounded from infancy by private tutors in City Taboos, power etiquette, and dynastic intrigue.' },
    { vi: 'Cha bạn quản lý một phòng thí nghiệm Singularity bí mật. Ông về nhà trên chiếc xe bọc thép riêng, và luôn dặn bạn không bao giờ được tin bất kỳ ai, kể cả người thân.', en: 'Your father oversaw a classified Singularity wing. Arriving in an armored limousine, he drilled one absolute rule into you: trust no one, not even kin.' }
  ],
  dieci_orphan: [
    { vi: 'Bạn được tìm thấy trước cửa tu viện Dieci Association. Những học giả mặc áo choàng xám đã dạy bạn đọc sách cổ và triết học trước khi bạn biết nói rành rẽ.', en: 'Found on the threshold of a Dieci Association monastery, grey-robed scholars taught you to read ancient philosophy before you could speak fluently.' },
    { vi: 'Tu viện Dieci nuôi nấng bạn giữa những giá sách cao ngút ngàn và mùi giấy da cũ. Ở đây, một cú đấm chuẩn xác và một luận điểm logic được coi trọng như nhau.', en: 'The Dieci sanctuary raised you among towering bookshelves and the scent of aged parchment. Here, an iron fist and a sound syllogism were revered alike.' },
    { vi: 'Các huynh trưởng Dieci rèn luyện cho bạn một tâm trí khắc kỷ. Họ bảo vệ bạn khỏi sự hỗn loạn của Backstreets bằng những bức tường đá dày và kỷ luật thép.', en: 'Dieci seniors hammered stoic resolve into your young mind, sheltering you from street chaos behind thick masonry and unbending routine.' }
  ],
  great_lake_mariner: [
    { vi: 'Cha mẹ bạn là thủy thủ lái tàu đánh cá trên Great Lake của U Corp. Da họ sạm đi vì muối biển, và họ dạy bạn cách lắng nghe tiếng thì thầm của sóng đen từ trong nôi.', en: 'Your parents were sailors on the Great Lake of U Corp. Brine-weathered skin and sea-calloused hands, they taught you the song of the black tides from your cot.' },
    { vi: 'Bạn sinh ra giữa tiếng còi tàu âm thoa điều sóng của District 21. Chiếc bùa đeo cổ đầu tiên của bạn là một mẩu xương Whale đã được đánh bóng.', en: 'Born to the wail of tuning-fork sirens across District 21, your first pendant was a polished fragment of Whale ivory.' },
    { vi: 'Gia đình bạn sống trên một nhà bè nổi ở bến cảng U Corp. Cha bạn luôn nhìn ra mặt nước không đáy và nhắc nhở bạn: biển không tha thứ cho bất kỳ kẻ yếu đuối nào.', en: 'Your family lived on a mooring barge in U Corp docks. Your father stared into the fathomless brine, warning you that the deep pardons no weakness.' }
  ],
  warp_cleaner_offspring: [
    { vi: 'Cha mẹ bạn làm công việc dọn dẹp nội thất tàu WARP của W Corp. Họ nhận mức lương hậu hĩnh, nhưng mỗi tối về nhà mắt họ vô hồn như người chết.', en: 'Your parents were cleanup crew aboard W Corp WARP trains. They drew lavish compensation, but returned each evening with hollow, dead eyes.' },
    { vi: 'Trong nhà bạn có một căn phòng luôn khóa trái cửa, nồng nặc mùi thuốc tẩy công nghiệp cực mạnh. Cha bạn bảo đó là nơi cất giữ những thứ không bao giờ được kể lại.', en: 'A locked closet in your home reeked of industrial caustic bleach. Your father whispered that it held uniforms stained with things that must never be named.' },
    { vi: 'Bạn lớn lên dưới sự giám sát bí mật của nhân viên an ninh W Corp. Cha mẹ bạn đã ký vào bản cam kết máu: một lời hé lộ ra ngoài đồng nghĩa với án tử.', en: 'You grew up under the discreet gaze of W Corp security agents. Your parents signed in blood: one whisper of truth was a swift death sentence.' }
  ],
  backstreet_bistro: [
    { vi: 'Bạn lớn lên sau quầy bếp một quán ăn đêm Backstreets. Tiếng dầu sôi xèo xèo và mùi súp cay nồng là bức tường bảo vệ bạn trước sự lạnh lẽo của The City.', en: 'You grew up behind the counter of a Backstreets diner. Sizzling grease and pepper broth were your ramparts against the cold City outside.' },
    { vi: 'Cha mẹ bạn mở tiệm mì gia truyền. Nơi này là điểm hẹn trung lập của Fixer, giang hồ và phu khuân vác, vì không ai muốn làm đổ một bát mì nóng.', en: 'Your parents ran a legacy noodle counter. It was neutral ground for Fixers and syndicate muscle alike, for no one ruined a hot bowl of soup.' },
    { vi: 'Từ nhỏ, bạn đã học cách lắng nghe: những câu chuyện thì thầm bên bàn ăn của khách là tấm bản đồ chân thực nhất về những biến động trong khu phố.', en: 'From childhood you learned to listen: hushed booth confessions gave you the truest map of power shifts across the entire district.' }
  ],
  prosthetic_tinkerer: [
    { vi: 'Cha mẹ bạn mở một xưởng gắn và sửa chữa chân tay giả không phép. Bạn tập đếm bằng những ngón tay kim loại và van áp suất cũ rơi vãi trên sàn.', en: 'Your parents ran an unlicensed prosthetics shop. You learned counting on discarded alloy fingers and hydraulic valves scattered on the floor.' },
    { vi: 'Gia đình bạn sống giữa tiếng rên rỉ của những kẻ đến thay chi giả sau các trận thanh trừng. Mẹ bạn có đôi bàn tay khâu vết thương nhanh như một chiếc máy may.', en: 'Your family lived amid groans of patients getting crude cybernetic replacements after turf wars. Your mother stitched flesh as swiftly as a loom.' },
    { vi: 'Món quà sinh nhật đầu tiên của bạn là một cánh tay máy phế liệu có thể tự gắp hạt đậu. Cha bạn bảo: ở The City, cơ thể bằng sắt bền hơn cơ thể bằng thịt.', en: 'Your first birthday gift was a scrap prosthetic claw that could pinch peas. Your father told you: in the City, steel endures where flesh rots.' }
  ],
  outskirts_nomad: [
    { vi: 'Bộ lạc của bạn di chuyển theo mùa giữa Ruins cổ đại và bãi phế liệu ngoài rìa The City. Không ai trong số họ có tên trong bất kỳ hộ tịch nào của The Head.', en: 'Your clan drifted with the seasons between ancient Ruins and City scrap perimeter. None of them existed in any ledger kept by The Head.' },
    { vi: 'Cha mẹ bạn từng là cư dân The City bị trục xuất qua cổng thành trước khi bạn ra đời. Họ không bao giờ nhắc về bức tường, nhưng ánh mắt luôn hướng về phía ánh đèn xa xăm.', en: 'Your parents were exiles cast beyond the iron gates before your birth. They never spoke of the wall, yet their eyes never strayed from its distant glow.' },
    { vi: 'Bạn lớn lên học cách đọc dấu chân quái vật trên cát độc và nhận biết tiếng gió báo bão. Đối với bạn, sự sống sót mỗi sớm mai thức dậy đã là một chiến thắng.', en: 'You grew up reading monstrosity tracks in venomous dunes and scenting gale storms. To wake alive each dawn was your only victory.' }
  ]
};

// What was happening in the City that night, pure chance
const THAT_NIGHT = [
  { vi: 'Đêm ấy, đài phát thanh rè rè đưa tin một thực thể Distortion vừa bị Hana Association tiêu diệt ở District bên cạnh.', en: 'That night, the crackling radio reported a Distortion put down by Hana Association in the adjacent District.' },
  { vi: 'Đêm ấy trời đổ mưa đen, và hạt mưa ở The City luôn mang theo vị đắng ngắt của rỉ sét kim loại.', en: 'Black rain fell that night, and raindrops in The City always carried the bitter tang of rusted iron.' },
  { vi: 'Đêm ấy có pháo hoa rực rỡ trên bầu trời Nest: một Wing vừa công bố Singularity mới trước toàn thành phố.', en: 'Fireworks lit the Nest skyline that night: a Wing had just unveiled a new Singularity to the City.' },
  { vi: 'Đêm ấy khu phố yên tĩnh lạ thường. Những người già trong xóm đều đóng chặt cửa, thì thầm rằng đó là điềm gở.', en: 'The streets were eerily quiet that night. The block’s elders bolted their doors, murmuring it was an ill omen.' },
  { vi: 'Đêm ấy, ở một khoảng đất trống cách đó không xa, một Thư Viện khổng lồ bất chợt mọc lên trong làn ánh sáng kỳ dị.', en: 'That night, in an empty lot not far away, a colossal Library rose within a pillar of uncanny light.' },
  { vi: 'Đêm ấy cả khu vực mất điện hoàn toàn do sự cố biến áp. Bạn chào đời dưới ánh sáng leo lét của ba ngọn nến mỡ.', en: 'The district lost all power that night to a grid failure. You were born under the flickering yellow of three tallow candles.' },
  { vi: 'Đêm ấy, Thumb và Middle xả súng thanh trừng nhau ở ba con phố về phía bắc. Tiếng súng át cả tiếng sấm.', en: 'That night the Thumb and the Middle exchanged heavy fire three streets north, gunfire drowning out the thunder.' },
  { vi: 'Đêm ấy có tuyết rơi thật — những bông tuyết trắng muốt hiếm hoi sau mười năm khói bụi đặc quánh bao phủ.', en: 'Real snow fell that night—rare, pristine flakes drifting down after a decade of impenetrable industrial smog.' },
  { vi: 'Đêm ấy, một Fixer vô danh dừng chân trú mưa dưới mái hiên nhà bạn, lặng lẽ để lại 5 Ahn mừng đứa bé rồi biến mất.', en: 'That night a nameless Fixer sheltered under your eaves, left 5 Ahn for the newborn, and melted into the rain.' },
  { vi: 'Đêm ấy không có biến cố nào xảy ra. Giữa lòng The City khắc nghiệt này, một đêm bình yên đã là ân huệ lớn nhất.', en: 'Nothing happened that night. In the cold heart of The City, an uneventful night is already the rarest mercy.' },
  { vi: 'Đêm ấy, tiếng chuông báo động của một văn phòng Fixer gần đó vang lên suốt ba tiếng rồi tắt ngấm trong im lặng.', en: 'That night an Office alarm bell rang for three solid hours down the lane before choking out into silence.' },
  { vi: 'Đêm ấy, một đoàn tàu WARP vừa cập ga ngầm, mang theo luồng gió lạnh buốt từ chiều không gian không xác định.', en: 'That night a WARP train pulled into the subterranean dock, trailing a chill gale from unmapped dimensions.' },
  { vi: 'Đêm ấy, một Beholder của The Head xuất hiện trên nóc tòa nhà đối diện trong mười giây, rồi biến mất không dấu vết.', en: 'That night an Arbiter or Beholder stood ten seconds atop the opposite roof before vanishing into thin air.' },
  { vi: 'Đêm ấy, còi Night in the Backstreets vừa dứt thì tiếng khóc của bạn vang lên. Những kẻ quét dọn Sweeper vừa rút vào bóng tối.', en: 'The Night in the Backstreets siren had just fallen silent when you cried out. The Sweepers had just slipped back to the dark.' },
  { vi: 'Đêm ấy, một tiệm cầm đồ lớn ở đầu hẻm bị nổ tung, hàng trăm món đồ cơ khí văng tung tóe khắp mặt đường ướt.', en: 'A pawnshop at the corner detonated that night, scattering hundreds of gearwheels and springs across slick asphalt.' },
  { vi: 'Đêm ấy, một nhóm người theo tà giáo mang mặt nạ kim loại đi diễu hành qua phố, miệng lẩm nhẩm những điều cấm kỵ.', en: 'Masked cultists marched through the alley that night, chanting forbidden words under the unblinking neon signs.' }
];

const OMEN_LINE = {
  index_equilibrium: [
    { vi: 'Bà đỡ nhìn bạn rất lâu rồi thở phào: "Đứa bé này bình thường, chẳng có gì đặc biệt cả." Ở The City, một cuộc đời bình thường đã là lời chúc phúc xa xỉ nhất.', en: 'The midwife looked at you and exhaled: “Nothing special about this child.” In The City, an ordinary life is the rarest blessing.' },
    { vi: 'Không có tiếng gầm rú, không có ánh sáng lạ. Bạn chào đời như bao đứa trẻ khác, lặng lẽ chuẩn bị bước vào guồng quay tàn bạo của thành phố.', en: 'No roars, no unnatural lights. You entered the world like any other, quietly stepping into the City’s merciless grinder.' },
    { vi: 'Vị bác sĩ già ghi một nét gạch đơn giản vào mục ghi chú: "Thể trạng cân bằng, không dấu hiệu dị thường." Một khởi đầu không bị The Head để mắt tới.', en: 'The old medic jotted a single stroke: “Balanced vitals, no anomalous signs.” A start beneath the notice of The Head.' },
    { vi: 'Đêm ấy trăng mờ. Chiếc đồng hồ quả lắc trong phòng tích tắc đều đặn từng giây, báo hiệu một kiếp sống diễn ra theo trật tự tự nhiên.', en: 'The moon was dim. The wall clock ticked with rhythmic precision, promising a life governed by natural order.' }
  ],
  merciless_head: [
    { vi: 'Ba ngày sau khi bạn sinh ra, một nhân viên mặc đồng phục màu than của B Corp đến chụp ảnh đồng tử của bạn cho "hồ sơ đặc biệt". Hắn không giải thích lý do.', en: 'Three days after birth, an agent in B Corp charcoal uniforms photographed your pupils for a “special register.” They gave no reason.' },
    { vi: 'Một con quạ kim loại của The Eye đậu trên gờ cửa sổ phòng sinh đúng lúc bạn cất tiếng khóc. Nó nhìn chằm chằm vào mắt bạn trong ba mươi giây trước khi bay đi.', en: 'A metallic crow of The Eye perched on the windowsill the moment you cried. It locked onto your gaze for thirty seconds before taking flight.' },
    { vi: 'Mã số công dân của bạn có thêm một ký tự đỏ ở đuôi. Người phát thẻ thì thầm với mẹ bạn rằng đứa trẻ này đã lọt vào danh sách giám sát của The Head.', en: 'Your citizen token bore a crimson suffix. The clerk whispered that this newborn had already caught the cold eye of The Head.' },
    { vi: 'Đúng đêm bạn sinh ra, một Claw xuất hiện cách nhà bạn hai con phố để thi hành án tử một kẻ vi phạm Taboo. Mùi máu và huyết thanh nồng nặc lọt qua khe cửa.', en: 'The night of your birth, a Claw purged a Taboo violator two streets away. The stench of serum and execution drifted through your window.' }
  ],
  carmen_whisper: [
    { vi: 'Bạn không hề khóc khi chào đời. Bạn mở to mắt nhìn lên trần nhà và mỉm cười, như thể đang lắng nghe một người phụ nữ dịu dàng cất giọng hát ru trong tâm trí.', en: 'You never cried at birth. Eyes wide, you smiled at the ceiling as if listening to a gentle woman singing lullabies in your mind.' },
    { vi: 'Mỗi đêm, trong giấc ngủ chập chờn, bạn luôn mơ thấy những cánh hoa đỏ rơi rụng bên một giàn piano cũ, và một giọng nói thì thầm khuyên bạn hãy sống thật với dục vọng.', en: 'Nightly you dreamt of crimson petals drifting over an old upright piano, a voice urging you to give in to your rawest desire.' },
    { vi: 'Bà đỡ hoảng sợ lùi lại khi thấy ánh mắt bạn: một tia sáng vàng nhạt lóe lên rồi tắt lịm trong con ngươi. Tiếng thì thầm của Hạt Giống Ánh Sáng đã bén rễ trong linh hồn bạn.', en: 'The midwife recoiled: a pale gold flare sparked and died in your pupils. The whisper of the Light Seed had taken root in your marrow.' },
    { vi: 'Đúng đêm bạn chào đời, một người họa sĩ ở tầng dưới đột ngột biến thành một khối thủy tinh hát ca. Bạn ngủ say sưa suốt đêm trong tiếng đàn vô hình.', en: 'The night you were born, an artist downstairs distorted into singing glass. You slept deeply through the uncanny, unseen melody.' }
  ],
  crimson_sweeper_star: [
    { vi: 'Đồng hồ chỉ đúng 3 giờ 13 phút sáng khi bạn cất tiếng khóc đầu tiên. Ngoài cửa sổ, tiếng cào xé kim loại của toán Sweeper đầu tiên vang lên rợn người.', en: 'The clock struck exactly 3:13 AM as your first cry split the room. Outside, the scraping claws of the first Sweeper pack chilled the glass.' },
    { vi: 'Bạn sinh ra giữa lúc còi báo động Night in the Backstreets rú lên liên hồi. Đèn đường vụt tắt, và mẹ bạn phải dùng tay bịt miệng bạn để tránh thu hút những chiếc thùng rác sống.', en: 'Born under the howling siren of Night in the Backstreets, streetlights died and hands clamped over your lips lest the liquid sweepers hear.' },
    { vi: 'Bầu trời đêm đỏ rực một màu máu kỳ lạ đúng lúc bạn chào đời. Người dân Backstreets gọi đó là "Ngôi sao Sweeper", điềm báo của một kẻ sống giữa lằn ranh chém giết.', en: 'The midnight sky blazed an unnatural gore red as you entered the world. Backstreet rats called it the Sweeper Star—a mark of blood-soaked survival.' },
    { vi: 'Ngay khi bạn vừa lọt lòng, một giọt chất lỏng màu đỏ sẫm từ kẽ nứt trên trần nhà rơi đúng vào mu bàn tay bạn. Dấu vết ấy không bao giờ phai mờ.', en: 'As you drew breath, a thick crimson droplet dripped from the ceiling seam onto your tiny hand. The rust-red stain never truly washed away.' }
  ],
  jcorp_rigged_dice: [
    { vi: 'Cha bạn thắng một ván bài lớn ở sòng bạc J Corp đúng đêm bạn chào đời, rồi bị lột sạch đến manh áo cuối cùng vào sáng hôm sau.', en: 'Your father won a fortune at a J Corp casino the night you were born, only to lose his boots and coat by sunrise.' },
    { vi: 'Người ta tìm thấy một đồng xu hai mặt sấp của sòng bạc J Corp kẹp trong tã lót của bạn. Đời bạn sẽ là những cú lật ngược dòng ngoạn mục giữa giàu sang và vực thẳm.', en: 'A double-tailed J Corp gambling chip was found tucked in your swaddle. Your life would swing wildly between feast and ruined gutter.' },
    { vi: 'Bác sĩ đỡ đẻ cho bạn vừa tung một con xúc xắc trước khi cắt rốn: "Số sáu! Đứa trẻ này sẽ hoặc là trở thành triệu phú, hoặc chết đói dưới chân cầu."', en: 'The medic tossed bone dice before cutting the cord: “Six! This one will either die a millionaire or starve beneath the piers.”' },
    { vi: 'Đúng đêm bạn sinh ra, giá cổ phiếu của một Wing sụp đổ hoàn toàn trong 15 phút, khiến hàng vạn kẻ nhảy lầu và vài kẻ vô danh trở thành tỷ phú chỉ sau một cái chớp mắt.', en: 'A Wing stock collapsed in fifteen minutes that night, plunging thousands into ruin while turning lucky scoundrels into instant lords.' }
  ],
  bloodline_echo: [
    { vi: 'Sáng hôm sau ngày bạn chào đời, có ai đó đã để lại trước cửa một chiếc hộp sắt không tên. Bên trong là một tấm thẻ bài đã mẻ cạnh dính máu khô của đời trước.', en: 'The morning after your birth, a rusted lockbox sat on the doorstep. Inside lay a chipped identification plate crusted with ancestral blood.' },
    { vi: 'Bà của bạn nhìn vào bàn tay bạn rồi thở dài: "Nét chỉ tay này giống hệt người ấy... Mối thù ghi trong Book of Vengeance lại có kẻ phải gánh tiếp rồi."', en: 'Your elder stared at your palm and sighed: “Identical lines... The vendetta inscribed in the Book of Vengeance has found its next debtor.”' },
    { vi: 'Kỷ vật của một người đã khuất trong gia tộc bỗng nhiên phát ra tiếng ngân rung nhẹ khi bạn vừa cất tiếng khóc, như thể linh hồn cũ vừa tìm thấy người thừa kế.', en: 'An old heirloom of a fallen ancestor hummed with faint resonance as you cried, as if the old ghost recognized its true heir.' },
    { vi: 'Một lá thư niêm phong bằng sáp đỏ đề tên cha/mẹ bạn được gửi tới đúng ngày sinh nhật đầu tiên, nhắc nhở về một món nợ máu chưa bao giờ được xóa bỏ ở The City.', en: 'A wax-sealed crimson letter addressed to your bloodline arrived on your first birthday, reminding that no City blood debt is ever wiped clean.' }
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
  return {
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
    ageAtMeet: role === 'mentor' ? (rest.metAge || 0) + 20 : role === 'child' ? 0 : (rest.metAge || 0),
    memories: [],
    ...rest
  };
}

const FRIEND_LINE = [
  { vi: 'Nhà bên có một đứa trẻ sinh cùng tháng tên {friend}, {trait}. Hai đứa lớn lên cạnh nhau.', en: 'Next door there was a child born the same month, {friend}, {trait}. You grew up side by side.' },
  { vi: 'Người đầu tiên bạn nhớ mặt, ngoài cha mẹ, là {friend}: một đứa trẻ {trait}.', en: 'The first face you remember, besides your parents, is {friend}: a kid who {trait}.' },
  { vi: '{friend}, đứa trẻ cùng dãy nhà, {trait}. Sau này bạn sẽ gọi nó là bạn thân nhất.', en: '{friend}, the kid from your row, {trait}. One day you would call them your best friend.' }
];

const OUTSKIRTS_NIGHT = [
  { vi: 'Đêm ấy, người gác trại đếm đủ từng chiếc xe trước khi dập lửa. Ngoài tường thành, không có ai đến khi nghe tiếng trẻ khóc.', en: 'That night the camp watch counted every cart before putting out the fire. Beyond the wall, no one came at the sound of a newborn crying.' },
  { vi: 'Đêm ấy gió lùa qua tấm bạt che. Mẹ bạn lấy hai chiếc áo cũ chèn vào khe hở, rồi thức đến sáng để giữ chúng khỏi bay.', en: 'Wind pulled at the camp tarp that night. Your mother stuffed two old coats into the gap and stayed awake to keep them there.' },
  { vi: 'Đêm ấy, ánh đèn The City hiện trên đường chân trời. Đoàn xe không đi về phía ấy; người dẫn đường bảo phải chờ đủ hàng mới đến được chân tường.', en: 'The City lights showed on the horizon that night. The caravan did not head toward them; the guide said they needed a full load before approaching the wall.' }
];

const OUTSKIRTS_OMEN = {
  index_equilibrium: { vi: 'Người đỡ đẻ nghe nhịp thở đều của bạn rồi gật đầu. Bà ghi một dấu than nhỏ lên thành xe, cạnh tên những đứa trẻ đã qua được đêm đầu.', en: 'The midwife listened to your steady breathing and nodded. She marked the cart beside the names of children who survived their first night.' },
  merciless_head: { vi: 'Sáng hôm sau, một người từ đoàn xe qua cổng mang về mảnh giấy ghi tên bạn. Không ai trong trại biết ai đã hỏi đến một đứa trẻ sinh ngoài tường.', en: 'The next morning someone returning from the gate brought a slip bearing your name. No one in camp knew who had asked about a child born beyond the wall.' },
  carmen_whisper: { vi: 'Bạn ngừng khóc khi cả trại đã ngủ. Người ôm bạn nghe bạn khe khẽ đáp lại một giọng nói mà họ không nghe thấy.', en: 'You stopped crying after the camp fell asleep. The person holding you heard you answer a voice they could not hear.' },
  crimson_sweeper_star: { vi: 'Người gác trại nhìn về phía tường khi bạn ra đời. Còi từ bên trong vọng ra rất xa; ông ta chờ nó tắt rồi mới nhóm lại lửa.', en: 'The camp watch looked toward the wall as you were born. A siren carried from inside the City; he waited for it to stop before relighting the fire.' },
  jcorp_rigged_dice: { vi: 'Một người trong đoàn tung đồng xu để đoán sáng mai có đi tiếp được không. Đồng xu rơi xuống cạnh nôi bạn, đứng nghiêng giữa hai viên đá.', en: 'Someone in the caravan flipped a coin to decide whether they could travel at dawn. It landed beside your cot, balanced between two stones.' },
  bloodline_echo: { vi: 'Người thân đặt một chiếc thẻ cũ cạnh chăn bạn. Số trên thẻ đã bị cạo đi trước khi cả nhà rời The City.', en: 'A relative set an old identity plate beside your blanket. Its number had been scraped off before the family left the City.' }
};

const OUTSKIRTS_FRIEND = [
  { vi: '{friend} sinh cùng mùa trong đoàn xe, {trait}. Hai đứa học cách nhận ra tiếng chân nhau giữa những buổi chuyển trại.', en: '{friend} was born in the caravan that season, {trait}. You learned to recognize each other’s footsteps whenever camp moved.' },
  { vi: 'Người bạn đầu tiên của bạn là {friend}, {trait}. Hai đứa chia nhau chỗ ngồi sau xe chở hàng.', en: 'Your first friend was {friend}, {trait}. You shared a place at the back of the freight cart.' }
];

const fill = (s, map) => Object.entries(map).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, v), s);

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
          ? '[Tuổi thơ đơn độc] Đoàn xe có nhiều người, nhưng không có đứa trẻ nào bằng tuổi bạn. Mỗi lần chuyển trại, bạn tự buộc hành lý của mình lên xe.'
          : `[Tuổi thơ đơn độc] Bạn lớn lên giữa những bức tường xám của ${regionVi} mà không có lấy một người bạn cùng trang lứa. Bạn sớm học cách tự sinh tồn và cảnh giác với tất cả những ai tiến lại gần.`,
        en: kind === 'out'
          ? '[Solitary Childhood] The caravan held many people, but no child your age. Each time camp moved, you tied your own bundle to the cart.'
          : `[Solitary Childhood] You grew up amid the grey walls of ${regionEn} without a companion your age. You early learned to survive on your own and stay wary of anyone approaching.`
      }
    ]
  };
}
