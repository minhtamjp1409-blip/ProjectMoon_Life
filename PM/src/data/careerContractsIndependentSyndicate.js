// Independent Syndicate contracts: contracts and rackets for crews operating in the Backstreets
// without swearing fealty to any of the Five Fingers.
import { rq } from './careerContracts.js';

export const INDEPENDENT_SYNDICATE_CONTRACTS = [
  // ------------------------------------------------------------ tier 0: Small shop protection & street debt
  rq(
    'indie_syn_stall_protection', 0, 'Bảo kê dãy sạp Backstreets', 'Alley stall protection',
    'Chủ dãy sạp thực phẩm ở ngã tư Backstreets bị côn đồ vãng lai quấy phá mỗi chiều. Họ gom góp vài đồng Ahn nhờ băng nhóm của bạn dẹp loạn và giữ yên khu buôn bán.',
    'Food stall vendors at a Backstreets crossroads are harassed by roaming ruffians every dusk. They pool scrap Ahn to hire your crew to restore quiet to their row.',
    'Bạn dẫn đàn em đứng gác trước sạp. Lũ quấy rối nhìn thấy vũ khí liền lủi mất. Người bán hàng đưa đủ tiền công cùng hai ổ bánh mì nóng.',
    'You stand guard with your crew before the stalls. The troublemakers spot your steel and scatter into the dark. The vendors hand over full pay and two hot loaves.',
    'Toán du đãng đông hơn dự tính. Bạn phải rút lui qua ngách sau, vừa mất mặt vừa không nhận được thù lao.',
    'The ruffians outnumbered you. You had to slip away through the rear alley, losing standing and walking away unpaid.',
    'Một tên vãng lai giấu súng rỉ sét trong bao tải hàng. Hắn bóp cò ngay khi bạn bước tới.',
    'A wanderer concealed a rusted gun in a burlap sack. He pulled the trigger the moment you stepped close.'
  ),

  rq(
    'indie_syn_debt_collection', 0, 'Đòi nợ mướn cho lò mổ ngầm', 'Collect debt for an underground slaughterhouse',
    'Một gã đồ tể ở xưởng mổ thịt Backstreets bị con nợ quỵt 6 Ahn tiền sỉ. Gã hứa chia cho băng bạn một phần nếu thu hồi được trước giờ Sweeper đi tuần.',
    'A butcher in a Backstreets abattoir was stiffed 6 Ahn on wholesale meat. He promises your crew a cut if you bring it in before Sweeper patrol hours.',
    'Bạn gõ cửa đúng lúc con nợ chuẩn bị trốn. Sau vài câu đe dọa gãy gọn, gã run rẩy móc bọc tiền giấu trong ống khói ra trả.',
    'You knock just as the debtor packs his bags. After a few clipped threats, he trembles and digs out the pouch hidden up the chimney.',
    'Con nợ đã trốn khỏi khu từ nửa đêm. Bạn chỉ thấy căn phòng trống hoác và vài mảnh chén vỡ.',
    'The debtor fled the district at midnight. You find only an empty room and broken ceramic shards.',
    'Con nợ thuê hai tay đao giấu mặt đón lõng bạn ngay ngưỡng cửa.',
    'The debtor hired two hooded bladesmen who waited for you just inside the doorway.'
  ),

  // ------------------------------------------------------------ tier 1: Alley brawl & workshop cargo
  rq(
    'indie_syn_alley_brawl', 1, 'Tranh chấp bến xe thô sơ', 'Cart terminal turf clash',
    'Băng Chuột Cống ở khu bên cạnh tràn sang lấn chiếm bến xe kéo tay Backstreets. Đàn em giục bạn dẫn đầu đợt phản kích giành lại địa bàn kiếm cơm.',
    'The Sewer Rats from the adjacent block crossed the canal to claim the handcart terminal. Your crew urges you to lead a counter-strike for your livelihood.',
    'Gậy sắt và ống tuýp chạm nhau chát chúa giữa mưa bão. Bạn đánh gục đầu lĩnh đối phương, buộc cả toán phải cuốn gói rút về bên kia kênh.',
    'Iron pipes and lead clubs clash under the downpour. You drop their frontline leader, forcing the whole pack to scramble back across the canal.',
    'Đàn em hoảng loạn vỡ trận khi đối phương ném lựu đạn khói tự chế. Bạn bị thương và phải nhượng lại hai bến đỗ.',
    'Your crew panics when the enemy tosses homemade smoke pots. You retreat injured, ceding two prime docking bays.',
    'Một lưỡi lê tự chế đâm xuyên qua áo khoác khi bạn đang ghì đối thủ xuống nền đá.',
    'A makeshift bayonet drove clean through your coat while you pinned a rival to the cobblestones.'
  ),

  rq(
    'indie_syn_workshop_cargo', 1, 'Áp tải kiện hàng xưởng lậu', 'Escort illicit workshop crates',
    'Một thợ rèn Workshop chui cần vận chuyển ba hòm hợp kim chưa qua kiểm định của Tres qua bốn ngõ hẻm ngầm để tránh tuần tra của Zwei.',
    'An unlicensed Workshop smith needs three crates of unproofed alloys moved across four back alleys, avoiding Zwei patrols.',
    'Đoàn hàng luồn qua các đường cống ngầm an toàn. Tay thợ rèn thở phào thanh toán tiền công kèm một cuộn dây thép chất lượng cao.',
    'The crates move unseen through the drainage tunnels. The smith exhales in relief, paying in full with a spool of high-grade steel wire.',
    'Toán tuần tra Zwei bất ngờ rọi đèn pha vào hẻm. Bạn phải vứt lại một kiện hàng để cứu người thoát thân.',
    'A Zwei patrol sweeps their spotlight into the alley. You abandon one crate to pull your runners out safely.',
    'Toán cướp mai phục từ mái nhà sụp đổ, ném chất cháy thiêu rụi cả kiện hàng lẫn người dẫn đầu.',
    'Ambushers drop from a collapsed roof, pitching incendiaries that consume the cargo and the point man.'
  ),

  // ------------------------------------------------------------ tier 2: Black market guard & Fixer negotiation
  rq(
    'indie_syn_black_market_guard', 2, 'Bảo vệ sòng bạc ngầm đêm Sweeper', 'Guard underground gambling den on Sweeper night',
    'Chủ sòng bài hầm ngầm tổ chức canh bạc lớn ngay trong đêm Sweeper càn quét. Họ trả hậu hĩnh để băng bạn lập phòng tuyến giữ vững cửa hầm thép.',
    'A basement gambling boss hosts high-stakes tables during a Sweeper sweep. He pays handsomely for your crew to barricade and hold the steel bulkhead door.',
    'Âm thanh cào xé rợn người của Sweeper vang dội ngoài cửa sắt nhưng rào chắn vẫn đứng vững. Sòng bài an toàn, chủ sòng hào phóng chi thêm tiền thưởng.',
    'Chilling scraping from Sweepers echoes outside the iron door, but your barricade holds firm. The tables finish in peace, and the house tips heavily.',
    'Khách chơi bài hoảng loạn đập phá cửa thoát hiểm, gây hỗn loạn làm sập một góc hầm. Bạn bị trầy xước và mất một phần thù lao.',
    'Panicked patrons batter the emergency hatch, triggering a localized cave-in. You take bruises and forfeit part of the bounty.',
    'Lớp cửa thép bị axit ăn mòn từ bên ngoài. Một bầy Sweeper tràn vào bóng tối trước khi còi báo động kịp dứt.',
    'The steel door dissolved under exterior acid. A pack of Sweepers flooded the dark before the siren could fade.'
  ),

  rq(
    'indie_syn_fixer_negotiation', 2, 'Dàn xếp ranh giới với Office Fixer', 'Settle boundaries with a Fixer Office',
    'Một Office Grade 7 vừa mở văn phòng ở đầu phố và bắt đầu nhận ủy thác dọn dẹp các ổ cờ bạc ngầm. Bạn phải dẫn đầu phái đoàn sang đàm phán phân định ranh giới.',
    'A Grade 7 Fixer Office recently set up at the street corner, taking bounties to clean up gambling dens. You must lead a delegation to negotiate turf boundaries.',
    'Bằng thái độ rắn rỏi nhưng biết điều, bạn đạt được thỏa thuận ngầm: Office bỏ qua các sòng bạc thuộc bảo kê của băng, đổi lại bạn cung cấp tin tình báo đường phố.',
    'With firm composure and street sense, you secure an unspoken pact: the Office overlooks your protected dens in exchange for street intel.',
    'Cuộc nói chuyện biến thành màn đọ nắm đấm. Fixer đuổi bạn ra khỏi văn phòng với một vết bầm tím trên mặt.',
    'Talks deteriorate into flying fists. The Fixers throw you out onto the street with fresh bruises across your jaw.',
    'Văn phòng Fixer kia chỉ là vỏ bọc của một toán sát thủ săn tiền thưởng. Họ rút kiếm ngay khi bạn vừa bước qua cửa.',
    'The Office was a front for contract assassins. They drew steel the instant you stepped past the threshold.'
  ),

  // ------------------------------------------------------------ tier 3: Smuggling convoy & rival warehouse raid
  rq(
    'indie_syn_smuggling_convoy', 3, 'Hộ tống đoàn xe buôn lậu qua chốt ngầm', 'Escort smuggling convoy past checkpoints',
    'Chuyến xe tải bọc thép chở thiết bị cấy ghép y tế chui cần đi xuyên qua ba khu phố Backstreets đang tranh chấp gắt gao giữa các thế lực.',
    'An armored truck hauling unlicensed medical cybernetics must cut through three contested Backstreets blocks.',
    'Băng của bạn dẹp yên các trạm thu phí lậu trên lộ trình. Chuyến hàng cập bến an toàn, uy danh băng độc lập tăng vọt khắp khu vực.',
    'Your crew neutralizes rogue toll checkpoints along the route. The convoy arrives intact, boosting your independent crew’s street renown.',
    'Một chốt chặn đối địch dùng súng phóng lựu chặn đường. Bạn phải cho xe rẽ vào ngõ cụt và bỏ lại phân nửa hàng hóa.',
    'A rival roadblock fires grenade launchers. You divert into a dead end, leaving half the cargo behind to escape.',
    'Một cỗ máy chiến đấu vô chủ bất ngờ kích hoạt bên vệ đường và nghiền nát chiếc xe dẫn đoàn.',
    'A rogue combat automaton activates beside the pavement and crushes the lead transport to scrap.'
  ),

  rq(
    'indie_syn_rival_warehouse_raid', 3, 'Đột kích kho dự trữ của nhánh Finger', 'Raid a Finger subsidiary warehouse',
    'Một phân nhánh bán chính thức của Finger tích trữ lương thực và vũ khí để chuẩn bị thôn tính địa bàn của bạn. Băng quyết định tấn công trước để tự vệ.',
    'A Finger subsidiary syndicate is stockpiling food and armaments to annex your turf. Your crew opts for a preemptive strike.',
    'Đòn tập kích chớp nhoáng lúc nửa đêm phá hủy toàn bộ kho tiếp tế đối phương. Băng bạn thu về nhiều của cải và củng cố vững chắc địa bàn tự chủ.',
    'A lightning midnight raid razes their supply cache to ash. Your crew hauls away ample contraband, cementing autonomous control over your turf.',
    'Lính canh của đối phương phản ứng quá nhanh. Băng bạn phải rút chạy dưới làn đạn dày đặc, tổn thất nhiều thành viên kỳ cựu.',
    'Enemy sentries react with brutal precision. Your fighters retreat under heavy fire, losing several seasoned veterans.',
    'Kho hàng đã được gài mìn tự hủy từ trước. Ngọn lửa bao trùm toàn bộ toán đột kích.',
    'The warehouse was rigged with demolition charges. Fire engulfs the entire breaching squad.'
  ),

  // ------------------------------------------------------------ tier 4: Finger tax resistance & underground summit
  rq(
    'indie_syn_finger_tax_resistance', 4, 'Đánh bật toán thu thuế Finger', 'Repel a Finger tax collection cadre',
    'Sứ giả của một Finger dẫn theo toán tay sai có vũ trang đến tận sào huyệt đòi thu 40% lợi tức Backstreets. Lùi một bước là mất sạch tự do.',
    'A Finger envoy leads an armed cadre to your headquarters demanding forty percent of all Backstreets proceeds. Yielding means total subjugation.',
    'Bạn bày binh bố trận mai phục ngay các khúc cua hẹp, đánh tan tác toán thu thuế và đuổi sứ giả về với lời cảnh cáo đanh thép.',
    'You stage tight alley ambushes, shattering the collection squad and sending the envoy back with an unyielding warning.',
    'Áp lực hỏa lực của đối phương quá mạnh. Băng bạn phải cắn răng giao nộp một phần ngân quỹ để tránh bị san phẳng.',
    'Their overwhelming firepower breaks your lines. Your crew is forced to surrender emergency funds to stave off annihilation.',
    'Sứ giả mang theo vũ khí của Workshop cao cấp, cắt đứt phòng tuyến của bạn trong nháy mắt.',
    'The envoy wields high-grade Workshop ordnance, cutting through your vanguard in seconds.'
  ),

  rq(
    'indie_syn_underground_summit', 4, 'Chủ trì liên minh các băng tự do', 'Host an independent syndicate summit',
    'Năm băng đảng độc lập nhỏ trong quận đứng trước nguy cơ bị các thế lực lớn nuốt chửng. Bạn đứng ra tổ chức hội nghị kín để thống nhất mặt trận.',
    'Five small independent crews in the district face imminent absorption by major powers. You host a clandestine summit to forge a common front.',
    'Bằng uy tín và bản lĩnh thép, bạn dàn xếp ổn thỏa các mối tị hiềm cũ, lập nên liên minh phòng thủ chung vững như bàn thạch.',
    'Through steel will and earned authority, you mend old grudges and establish a rock-solid mutual defense pact.',
    'Một thủ lĩnh phản bội đưa tin cho phe đối lập. Hội nghị biến thành bãi chiến trường hỗn loạn, lòng tin tan vỡ.',
    'A traitorous leader leaks the venue to rivals. The summit collapses into chaos and shattered trust.',
    'Một sát thủ ẩn danh trà trộn vào phòng họp và ám sát các đại biểu bằng độc chất vô hình.',
    'An unseen assassin infiltrates the hall, eliminating delegates with invisible neurotoxin.'
  ),

  // ------------------------------------------------------------ tier 5: District hegemony & apex defiance
  rq(
    'indie_syn_district_hegemony', 5, 'Huyết chiến giành quyền kiểm soát toàn khu', 'Decisive battle for district underworld hegemony',
    'Toàn bộ các thế lực thù địch tập hợp lực lượng mở cuộc tổng tấn công nhằm quét sạch băng độc lập của bạn khỏi bản đồ thế giới ngầm.',
    'All rival syndicates assemble their full force for a total assault to erase your independent crew from the underworld map.',
    'Trận chiến kéo dài thâu đêm suốt sáng. Khi bình minh lên trên bầu trời Backstreets xám xịt, bạn đứng trên nóc pháo đài ngầm, chính thức trở thành bá chủ tuyệt đối của toàn khu.',
    'The battle rages through the long night. When grey dawn breaks over the Backstreets, you stand atop the fortress rubble as undisputed kingpin of the district.',
    'Băng bạn giữ được mạng sống nhưng căn cứ chính bị thiêu rụi hoàn toàn. Bạn phải lui về hoạt động bí mật trong các đường cống ngầm.',
    'Your crew survives, but your primary stronghold burns to ash. You are forced into underground guerilla operations.',
    'Một vũ khí cấm của The City được đối phương kích hoạt giữa trận địa, chôn vùi toàn bộ sinh mệnh trong bán kính hai dãy phố.',
    'A forbidden City weapon is detonated mid-battle, entombing all life within two city blocks.'
  ),

  rq(
    'indie_syn_apex_defiance', 5, 'Đối đầu toán thanh trừng cấp cao', 'Defy an apex underworld purge',
    'Các đại tổ chức ngầm phái một đội sát thủ tinh nhuệ nhất tới thanh trừng kẻ dám xưng hùng xưng bá mà không chịu cúi đầu phục vụ.',
    'The apex underworld syndicates deploy an elite execution cell to purge the independent kingpin who refused to kneel.',
    'Bằng bản lĩnh tôi luyện qua hàng chục năm sinh tử ở Backstreets, bạn đơn thương độc mã bẻ gãy từng mũi tiến công, buộc các thế lực phải thừa nhận chủ quyền của bạn.',
    'Forged through decades of Backstreets survival, you break every assault wave, forcing the City’s great powers to recognize your sovereign domain.',
    'Bạn sống sót nhưng chịu thương tật vĩnh viễn, buộc phải trao lại quyền chỉ huy thực tế cho cấp phó.',
    'You survive with permanent scars, forced to delegate direct field commands to your lieutenants.',
    'Đội thanh trừng kích hoạt công nghệ bẻ cong không gian, kết liễu huyền thoại của một bá chủ ngõ tối.',
    'The execution cell deploys spatial distortion tech, ending the legend of the alley kingpin.'
  )
];
