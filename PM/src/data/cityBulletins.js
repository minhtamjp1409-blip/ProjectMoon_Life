// Concrete yearly bulletins for quiet years across The City and the Outskirts.
// Pure data module: no imports from src/engine/.
// Every entry is a single sentence (ends cleanly with '.'), concrete, and avoids "Một năm trôi qua".

export const CITY_BULLETINS = [
  // =========================================================================
  // BACKSTREETS (20 bulletins)
  // =========================================================================
  {
    id: 'bul_bs_01',
    scope: 'backstreets',
    age: [5, 99],
    spDelta: 0,
    vi: 'Quán cháo ở ngã tư Hẻm 7 tăng giá lên 14 Ahn mỗi bát từ đầu tháng Ba.',
    en: 'The porridge stall at Alley 7 crossroads raised its bowls to 14 Ahn starting in March.'
  },
  {
    id: 'bul_bs_02',
    scope: 'backstreets',
    age: [10, 99],
    spDelta: -1,
    vi: 'Đêm 19 tháng Chín, đoàn Sweepers gõ mạnh ba lượt vào cửa chớp sắt dãy trọ rồi mới rẽ sang hẻm sau.',
    en: 'On September 19, a Sweeper column pounded three times on your tenement shutters before turning into the rear alley.'
  },
  {
    id: 'bul_bs_03',
    scope: 'backstreets',
    age: [8, 99],
    spDelta: 0,
    vi: 'Đội thợ hàn khu dưới thay toàn bộ 120 mét ống hơi bị ăn mòn sau trận mưa axit hồi tháng Năm.',
    en: 'Lower-ward welders replaced 120 meters of corroded steam pipe after May’s acid rain.'
  },
  {
    id: 'bul_bs_04',
    scope: 'backstreets',
    age: [14, 99],
    spDelta: 1,
    vi: 'Bảng tin Fixer góc chợ Sắt dán thêm bốn tờ ủy thác hạng 9 trước khi gió mưa làm rách mất hai tờ.',
    en: 'Four Grade 9 Fixer requests went up on the Iron Market board before wind tore two of them down.'
  },
  {
    id: 'bul_bs_05',
    scope: 'backstreets',
    age: [8, 99],
    spDelta: 0,
    vi: 'Cả dãy nhà số 14 cắt điện luân phiên hai tiếng mỗi tối để nhường tải cho xưởng ép kim loại phía cuối hẻm.',
    en: 'Row 14 endured two-hour nightly blackouts so the metal press at the alley end kept power.'
  },
  {
    id: 'bul_bs_06',
    scope: 'backstreets',
    age: [10, 99],
    spDelta: 0,
    vi: 'Chiếc đồng hồ công cộng trên cột đèn ga chạy chậm bốn phút suốt hai mùa trước khi có người trèo lên chỉnh lại.',
    en: 'The public gas-lamp clock ran four minutes slow for two seasons until someone climbed up to reset it.'
  },
  {
    id: 'bul_bs_07',
    scope: 'backstreets',
    age: [14, 99],
    spDelta: 0,
    vi: 'Chủ tiệm cầm đồ đường Bốn thu mua vỏ đạn đồng với giá 2 Ahn mỗi lạng trong suốt mùa thu.',
    en: 'The Fourth Street pawnbroker bought spent brass casings at 2 Ahn per ounce all autumn.'
  },
  {
    id: 'bul_bs_08',
    scope: 'backstreets',
    age: [12, 99],
    spDelta: -1,
    vi: 'Tờ lệnh dán bích báo nhắc lại khung giờ giới nghiêm Night in the Backstreets từ 3:13 đến 4:34 sáng.',
    en: 'Stenciled notices reminded the block of the Night in the Backstreets curfew from 3:13 to 4:34 AM.'
  },
  {
    id: 'bul_bs_09',
    scope: 'backstreets',
    age: [5, 99],
    spDelta: 0,
    vi: 'Chuyến xe rác hơi nước tuyến Đông đổi giờ thu gom sang 6 giờ 15 sáng khiến con hẻm bớt mùi khét hơn trước.',
    en: 'East-line steam refuse carts shifted pickup to 6:15 AM, leaving the alley less choked with soot.'
  },
  {
    id: 'bul_bs_10',
    scope: 'backstreets',
    age: [14, 99],
    spDelta: 0,
    vi: 'Tiệm sửa bộ phận cơ khí góc phố treo biển nhận kiểm tra khớp tay giả miễn phí vào chiều thứ Sáu.',
    en: 'The corner prosthetic bench hung a sign offering free wrist-joint checks on Friday afternoons.'
  },
  {
    id: 'bul_bs_11',
    scope: 'backstreets',
    age: [12, 99],
    spDelta: 1,
    vi: 'Hội người thuê trọ góp chung 80 Ahn mua thêm ba thùng lọc nước uống đặt cạnh giếng bơm tập thể.',
    en: 'Tenants pooled 80 Ahn to place three fresh water-filter drums beside the shared pump.'
  },
  {
    id: 'bul_bs_12',
    scope: 'backstreets',
    age: [16, 99],
    spDelta: 0,
    vi: 'Hai Office quy mô nhỏ hợp nhất biển hiệu ở tầng trệt khu Cũ sau khi mất ba người trong mùa đông.',
    en: 'Two small Offices merged plaques on the Old Block ground floor after losing three hands over winter.'
  },
  {
    id: 'bul_bs_13',
    scope: 'backstreets',
    age: [5, 99],
    spDelta: 0,
    vi: 'Đợt rét tháng Giêng làm vỡ ống dẫn nước dãy B, buộc cả khu phải xếp hàng hứng nước bằng xô sắt hai tuần liền.',
    en: 'January frost split the Block B main pipe, lining the street up with tin buckets for two weeks.'
  },
  {
    id: 'bul_bs_14',
    scope: 'backstreets',
    age: [14, 99],
    spDelta: 0,
    vi: 'Người bán báo dạo khu Cảng cạn tăng thêm sáu sạp mới nhờ tin tức từ các ga WARP bán chạy hơn trước.',
    en: 'Drydock newsstands added six new stalls as word of WARP Station delays sold out morning editions.'
  },
  {
    id: 'bul_bs_15',
    scope: 'backstreets',
    age: [8, 99],
    spDelta: -1,
    vi: 'Mùa hè năm nay trời Backstreets đặc sương dầu đến mức đèn đường phải bật sớm từ 4 giờ chiều.',
    en: 'Summer oil-haze hung so thick over the Backstreets that streetlamps flickered on at 4 PM.'
  },
  {
    id: 'bul_bs_16',
    scope: 'backstreets',
    age: [16, 99],
    spDelta: 0,
    vi: 'Một xưởng chế tác tư nhân bị Zwei kiểm tra giấy phép lúc nửa đêm khiến cả con phố đóng kín cửa suốt hai ngày.',
    en: 'Zwei audited an unlicensed workshop at midnight, keeping every shutter on the street bolted for two days.'
  },
  {
    id: 'bul_bs_17',
    scope: 'backstreets',
    age: [5, 99],
    spDelta: 1,
    vi: 'Tiệm trà khô cuối ngõ chia miễn phí mỗi hộ hai gói thảo mộc chống ho sau trận bụi công nghiệp tháng Mười.',
    en: 'The tea shop at alley’s end handed each household two cough-herb packets after October’s ash fallout.'
  },
  {
    id: 'bul_bs_18',
    scope: 'backstreets',
    age: [18, 99],
    spDelta: 0,
    vi: 'Giá thuê kho lạnh khu Chợ Đêm tăng thêm 15% khi các băng Syndicate nhỏ tranh nhau gom thực phẩm đóng hộp.',
    en: 'Cold-storage rents by the Night Market climbed 15% as minor Syndicates hoarded canned rations.'
  },
  {
    id: 'bul_bs_19',
    scope: 'backstreets',
    age: [5, 99],
    spDelta: 0,
    vi: 'Tấm biển sắt chỉ hướng ga tàu điện ngầm ngã năm được sơn lại bằng chữ vàng phản quang sau nhiều năm rỉ sét.',
    en: 'Repainted yellow reflective lettering finally restored the rusted metro signpost at Five Corners.'
  },
  {
    id: 'bul_bs_20',
    scope: 'backstreets',
    age: [5, 99],
    spDelta: 0,
    vi: 'Hai con mèo hoang sống trên mái nhà kho đối diện sinh thêm một lứa bốn con qua mùa mưa bão.',
    en: 'Two strays nesting on the opposite warehouse roof raised a litter of four through the storm season.'
  },

  // =========================================================================
  // NEST (20 bulletins)
  // =========================================================================
  {
    id: 'bul_nest_01',
    scope: 'nest',
    age: [12, 99],
    spDelta: 0,
    vi: 'Ban quản lý khu dân cư Nest ban hành quy định mới về quét thẻ sinh trắc tại ba cổng tàu tuyến nội bộ.',
    en: 'Nest housing control mandated fresh biometric scans at all three inner-rail concourse gates.'
  },
  {
    id: 'bul_nest_02',
    scope: 'nest',
    age: [5, 99],
    spDelta: 1,
    vi: 'Hệ thống lọc khí tầng cao vừa thay mới 40 màng lọc gốm giúp bầu trời sáng nay nhìn rõ tới ba dãy tháp.',
    en: 'High-tier scrubbers replaced 40 ceramic filters, clearing visibility across three spire blocks this morning.'
  },
  {
    id: 'bul_nest_03',
    scope: 'nest',
    age: [14, 99],
    spDelta: 0,
    vi: 'Sở hành chính Wing công bố bảng đánh giá quý sớm hơn bốn ngày, không có hộ nào trong dãy nhà bị hạ bậc cư trú.',
    en: 'The Wing registry posted quarterly audits four days early with no residency downgrades on your block.'
  },
  {
    id: 'bul_nest_04',
    scope: 'nest',
    age: [5, 99],
    spDelta: 0,
    vi: 'Chuông đổi ca tại quảng trường Kính đổi sang âm trầm hơn từ tháng Tư để giảm tiếng vang giữa các tòa tháp.',
    en: 'Shift chimes in Glass Plaza dropped to a lower pitch in April to cut reverberation between towers.'
  },
  {
    id: 'bul_nest_05',
    scope: 'nest',
    age: [8, 99],
    spDelta: 0,
    vi: 'Nhà ăn khu A-12 bổ sung suất súp củ cải trắng mỗi thứ Tư với giá niêm yết 22 Ahn mỗi phần.',
    en: 'Cafeteria Block A-12 added Wednesday radish soup sets priced uniformly at 22 Ahn.'
  },
  {
    id: 'bul_nest_06',
    scope: 'nest',
    age: [16, 99],
    spDelta: -1,
    vi: 'Một nhân viên phòng dữ liệu cùng tầng biến mất sau buổi kiểm tra định kỳ mà tên trên bảng trực vẫn trống tới cuối năm.',
    en: 'A records clerk on your floor vanished after inspection, leaving their roster slot blank through year-end.'
  },
  {
    id: 'bul_nest_07',
    scope: 'nest',
    age: [8, 99],
    spDelta: 0,
    vi: 'Tuyến xe điện kính trên cao chạy đúng giờ tuyệt đối suốt 365 ngày với sai số chưa tới hai giây mỗi lượt.',
    en: 'The elevated glass tram maintained schedule all 365 days within a two-second margin.'
  },
  {
    id: 'bul_nest_08',
    scope: 'nest',
    age: [5, 99],
    spDelta: 1,
    vi: 'Vườn thủy canh nội khu thu hoạch hai vụ rau xanh liên tiếp, chia đều ba khay nhỏ cho mỗi căn hộ gia đình.',
    en: 'Hydroponic courts yielded two crisp harvests, issuing three produce trays per household.'
  },
  {
    id: 'bul_nest_09',
    scope: 'nest',
    age: [8, 99],
    spDelta: 0,
    vi: 'Phòng y tế khu 4 cập nhật hồ sơ tiêm phòng mùa đông trong 15 phút cho toàn bộ 180 cư dân trong khu.',
    en: 'Ward 4 clinic cleared winter immunization logs in 15 minutes for all 180 block residents.'
  },
  {
    id: 'bul_nest_10',
    scope: 'nest',
    age: [6, 99],
    spDelta: 0,
    vi: 'Đội vệ sinh tự hành lau sạch 14 tầng mặt kính phía Tây chỉ trong một đêm không một tiếng động lớn.',
    en: 'Autonomous cleaners washed 14 floors of west-facing glass overnight without raising a murmur.'
  },
  {
    id: 'bul_nest_11',
    scope: 'nest',
    age: [16, 99],
    spDelta: 0,
    vi: 'Bản tin nội bộ Wing công bố tỷ lệ thăng bậc Feather năm nay giảm nhẹ còn 6,4% trên toàn khu.',
    en: 'The Wing internal bulletin noted Feather promotion rates dipped slightly to 6.4% district-wide.'
  },
  {
    id: 'bul_nest_12',
    scope: 'nest',
    age: [12, 99],
    spDelta: 0,
    vi: 'Thư viện khu Đông kéo dài giờ mở cửa tới 22 giờ tối để học viên ôn thi chứng chỉ kỹ thuật Wing.',
    en: 'East Annex Library extended hours to 10 PM for Wing technical certification candidates.'
  },
  {
    id: 'bul_nest_13',
    scope: 'nest',
    age: [10, 99],
    spDelta: -1,
    vi: 'Bốn đêm liên tiếp hồi tháng Bảy, tiếng còi an ninh vang từ cổng ranh giới Nest trước khi tắt hẳn vào rạng sáng.',
    en: 'Four July nights running, perimeter alarms hummed from the Nest gate before cutting out at dawn.'
  },
  {
    id: 'bul_nest_14',
    scope: 'nest',
    age: [12, 99],
    spDelta: 0,
    vi: 'Giá nước sinh hoạt lọc kép giữ nguyên mức 8 Ahn mỗi mét khối theo biểu giá bốn năm liền.',
    en: 'Double-filtered tap water held steady at 8 Ahn per cubic meter for the fourth straight year.'
  },
  {
    id: 'bul_nest_15',
    scope: 'nest',
    age: [14, 99],
    spDelta: 0,
    vi: 'Các hộ dân dọc Đại lộ Bạch Kim đều nhận được thư gia hạn thẻ cư trú năm trang vào sáng 1 tháng Một.',
    en: 'Apartments along Platinum Avenue received five-page residency renewal packets on January 1 morning.'
  },
  {
    id: 'bul_nest_16',
    scope: 'nest',
    age: [5, 99],
    spDelta: 1,
    vi: 'Buổi hòa nhạc dây ngắn 20 phút ở công viên mái kết thúc đúng lúc chuông tắt đèn khu dân cư điểm 23 giờ.',
    en: 'A 20-minute string recital on the sky terrace ended right as 11 PM curfew bells rang.'
  },
  {
    id: 'bul_nest_17',
    scope: 'nest',
    age: [14, 99],
    spDelta: 0,
    vi: 'Hệ thống kiểm tra hành lý cổng Bắc nâng giới hạn trọng lượng cho Fixer mang theo vũ khí đăng ký hợp lệ.',
    en: 'North Gate scanners raised weight allowances for Fixers carrying registered Workshop weapons.'
  },
  {
    id: 'bul_nest_18',
    scope: 'nest',
    age: [8, 99],
    spDelta: 0,
    vi: 'Thợ điện Wing lắp thêm 24 bóng đèn ấm dọc hành lang dãy nhà cũ thay cho dãy đèn huỳnh quang nhấp nháy.',
    en: 'Wing technicians swapped flickering tubes for 24 warm fixtures down the older residential corridor.'
  },
  {
    id: 'bul_nest_19',
    scope: 'nest',
    age: [18, 99],
    spDelta: 0,
    vi: 'Chính sách thuế tài sản năm nay bổ sung phụ lục hai trang về kỷ vật mang từ Backstreets vào khu Nest.',
    en: 'Annual tax filings added a two-page rider covering Backstreets heirlooms kept inside the Nest.'
  },
  {
    id: 'bul_nest_20',
    scope: 'nest',
    age: [5, 99],
    spDelta: 0,
    vi: 'Hồ nước nhân tạo giữa quảng trường Trung tâm được rút cạn nạo vét sạch bùn trong đúng 36 giờ cuối thu.',
    en: 'Crews drained and dredged the central plaza basin in 36 hours flat late in autumn.'
  },

  // =========================================================================
  // OUTSKIRTS (20 bulletins)
  // =========================================================================
  {
    id: 'bul_out_01',
    scope: 'outskirts',
    age: [5, 99],
    spDelta: 0,
    vi: 'Trận bão tro từ phương Nam phủ dày ba tấc quanh cọc rào trại trước khi gió đổi hướng vào sáng mùng Bốn.',
    en: 'A southern ash storm drifted three inches against your perimeter stakes before winds shifted on the fourth.'
  },
  {
    id: 'bul_out_02',
    scope: 'outskirts',
    age: [5, 99],
    spDelta: 1,
    vi: 'Năm thùng nước mưa hứng từ mái bạt sắt đầy ắp sau ba ngày mưa lớn hồi đầu mùa hạ.',
    en: 'Three days of early-summer downpour filled all five iron-sheet rainwater barrels to the brim.'
  },
  {
    id: 'bul_out_03',
    scope: 'outskirts',
    age: [8, 99],
    spDelta: -1,
    vi: 'Ánh đèn pha trên đỉnh Bức Tường quét qua thung lũng lúc 2 giờ sáng rồi phụt tắt suốt nửa tháng.',
    en: 'Floodlights atop the City Wall swept the valley at 2 AM, then stayed dark for two weeks.'
  },
  {
    id: 'bul_out_04',
    scope: 'outskirts',
    age: [10, 99],
    spDelta: 0,
    vi: 'Đoàn lữ hành bảy xe kéo đi ngang khu tàn tích phía Đông để đổi 12 kg pin năng lượng lấy thịt muối.',
    en: 'A seven-cart caravan crossed the eastern ruins trading 12 kg of power cells for salted rations.'
  },
  {
    id: 'bul_out_05',
    scope: 'outskirts',
    age: [12, 99],
    spDelta: 0,
    vi: 'Bạn vá lại bốn mảnh bạt lều bằng gân thú săn và dây đồng nhặt từ xác máy cũ bên bờ suối cạn.',
    en: 'You patched four tent seams using dried sinew and copper wire salvaged from a dry-bed wreck.'
  },
  {
    id: 'bul_out_06',
    scope: 'outskirts',
    age: [8, 99],
    spDelta: -1,
    vi: 'Dấu chân sáu ngón dài gần hai gang tay hằn quanh vòng tro lửa trại suốt hai buổi sáng liền.',
    en: 'Six-toed tracks nearly two spans long circled your cold campfire ash two mornings in a row.'
  },
  {
    id: 'bul_out_07',
    scope: 'outskirts',
    age: [14, 99],
    spDelta: 0,
    vi: 'Cổng số 9 trên Bức Tường chỉ mở đúng 40 phút vào rạng sáng ngày Rằm cho dân buôn phế liệu giao hàng.',
    en: 'Wall Gate 9 stood open just 40 minutes on mid-month dawn for scrap runners to offload salvage.'
  },
  {
    id: 'bul_out_08',
    scope: 'outskirts',
    age: [5, 99],
    spDelta: 1,
    vi: 'Vườn củ rễ dại sau mô đá trổ 30 chồi xanh bất chấp lớp đất pha xỉ than xám xịt.',
    en: 'Wild tubers behind the basalt ridge sent up 30 green shoots despite grey slag soil.'
  },
  {
    id: 'bul_out_09',
    scope: 'outskirts',
    age: [10, 99],
    spDelta: 0,
    vi: 'Cây kim la bàn cơ học quay lệch 15 độ mỗi khi đi ngang dãy ăng-ten gãy gần khu phế tích cũ.',
    en: 'Mechanical compass needles swung 15 degrees off true near the snapped antenna array by the old ruins.'
  },
  {
    id: 'bul_out_10',
    scope: 'outskirts',
    age: [14, 99],
    spDelta: 0,
    vi: 'Một nhóm sáu kẻ sống sót dựng trạm đổi đồ cách Bức Tường hai cây số rồi rút đi trước mùa đông.',
    en: 'Six wanderers ran a barter post two kilometers from the Wall before packing out ahead of winter.'
  },
  {
    id: 'bul_out_11',
    scope: 'outskirts',
    age: [5, 99],
    spDelta: 0,
    vi: 'Tiếng rít của đường ống thông khí xuyên tường vang đều đặn mỗi 90 phút trong những đêm lặng gió.',
    en: 'Exhaust vents through the City Wall hissed every 90 minutes on windless nights.'
  },
  {
    id: 'bul_out_12',
    scope: 'outskirts',
    age: [12, 99],
    spDelta: 0,
    vi: 'Khoang tàu hàng trật bánh năm xưa bị gió bào lộ thêm hai toa sắt rỗng giữa cánh đồng cỏ cháy.',
    en: 'Gales stripped sand off two more hollow freight cars from the old derailment in the scorched grass.'
  },
  {
    id: 'bul_out_13',
    scope: 'outskirts',
    age: [5, 99],
    spDelta: 1,
    vi: 'Bếp đất nung giữ được than hồng suốt 11 tiếng qua đêm lạnh nhất tháng Mười Hai.',
    en: 'The clay hearth held live embers for 11 straight hours through December’s sharpest freeze.'
  },
  {
    id: 'bul_out_14',
    scope: 'outskirts',
    age: [14, 99],
    spDelta: -1,
    vi: 'Từ sâu trong màn sương trắng phương Bắc vọng ra ba hồi còi tàu gãy quãng không thấy bóng xe.',
    en: 'Three broken train whistles drifted out of the northern mist with no rails anywhere nearby.'
  },
  {
    id: 'bul_out_15',
    scope: 'outskirts',
    age: [10, 99],
    spDelta: 0,
    vi: 'Bạn dựng thêm bốn cọc chuông bằng lon thiếc quanh bìa đá để báo động nếu có thú hoang lại gần.',
    en: 'You strung four tin-can tripwires along the scree edge to warn if beasts crept close.'
  },
  {
    id: 'bul_out_16',
    scope: 'outskirts',
    age: [16, 99],
    spDelta: 0,
    vi: 'Cặp ống nhòm đồng nhặt từ hầm cũ vẫn soi rõ ánh đèn đỏ trên tháp canh Bức Tường cách bảy dặm.',
    en: 'Brass binoculars salvaged from an old bunker still pick out red beacon lamps on the Wall seven miles off.'
  },
  {
    id: 'bul_out_17',
    scope: 'outskirts',
    age: [5, 99],
    spDelta: 0,
    vi: 'Mùa di cư năm nay đàn chim sắt bay dọc chân tường ít hơn năm ngoái gần một nửa.',
    en: 'Nearly half as many iron-feathered birds migrated along the Wall foot compared to last season.'
  },
  {
    id: 'bul_out_18',
    scope: 'outskirts',
    age: [8, 99],
    spDelta: 0,
    vi: 'Suối nước lợ phía Tây cạn trơ đáy suốt 60 ngày rồi bất ngờ dâng nước đục sau trận lở tuyết xa.',
    en: 'The western brackish creek stayed bone-dry for 60 days before surging silty after distant snowmelt.'
  },
  {
    id: 'bul_out_19',
    scope: 'outskirts',
    age: [8, 99],
    spDelta: 0,
    vi: 'Lớp muối khô kết trắng dưới lòng chảo cạn đủ dùng ướp thịt dự trữ cho cả bốn mùa.',
    en: 'Salt crusts scraped from the dry basin supplied enough brine cure to last all four seasons.'
  },
  {
    id: 'bul_out_20',
    scope: 'outskirts',
    age: [12, 99],
    spDelta: 0,
    vi: 'Cánh cửa hầm bê tông đánh số V-17 ngoài đồng hoang vẫn đóng kín với ổ khóa còn nguyên lớp sáp chống gỉ.',
    en: 'Bunker hatch V-17 out on the scrubland remained sealed beneath intact anti-rust wax.'
  },

  // =========================================================================
  // WING / DISTRICT BULLETINS (All 26 Districts A..Z + key Wing extras)
  // =========================================================================
  {
    id: 'bul_wing_a_01',
    scope: 'wing',
    regionId: 'A',
    age: [14, 99],
    spDelta: 0,
    vi: 'Khu 1 ghi nhận 12 tháng liền không có tiếng còi báo động nào trên đại lộ dẫn về trụ sở A Corp.',
    en: 'District 1 logged 12 straight months without a single siren along the avenue toward A Corp.'
  },
  {
    id: 'bul_wing_b_01',
    scope: 'wing',
    regionId: 'B',
    age: [14, 99],
    spDelta: -1,
    vi: 'Mạng lưới thấu kính giám sát của B Corp ở District 2 được hiệu chuẩn đồng loạt vào 1 giờ sáng mỗi đầu quý.',
    en: 'B Corp optical arrays in District 2 recalibrated simultaneously at 1 AM on each quarter’s opening day.'
  },
  {
    id: 'bul_wing_c_01',
    scope: 'wing',
    regionId: 'C',
    age: [14, 99],
    spDelta: 0,
    vi: 'Đội tuần tra mặc giáp của C Corp diễu qua cổng số 3 đúng 6 giờ chiều mỗi thứ Hai không sai một phút.',
    en: 'Armored C Corp squads marched past District 3 Gate Three at 6 PM sharp every Monday.'
  },
  {
    id: 'bul_wing_d_01',
    scope: 'wing',
    regionId: 'D',
    age: [8, 99],
    spDelta: 0,
    vi: 'Các thang nâng gỗ từ rừng ngầm District 4 chở thêm 300 tấn nhựa cây lên bề mặt qua đường hầm D Corp.',
    en: 'District 4 shaft lifts hauled 300 tons of subterranean timber sap up through D Corp tunnels.'
  },
  {
    id: 'bul_wing_e_01',
    scope: 'wing',
    regionId: 'E',
    age: [12, 99],
    spDelta: 0,
    vi: 'Hành lang ga E Corp tại District 5 thay mới biển báo chịu nhiệt dọc dãy lò cao số 4.',
    en: 'E Corp concourses in District 5 fitted heat-shielded wayfinding along Blast Furnace Line 4.'
  },
  {
    id: 'bul_wing_f_01',
    scope: 'wing',
    regionId: 'F',
    age: [12, 99],
    spDelta: 0,
    vi: 'Xưởng cơ khí F Corp ở District 6 thử nghiệm cặp cửa sắt tự khóa mới tại bảy giao lộ chính.',
    en: 'F Corp workshops in District 6 tested new self-sealing iron gates across seven main intersections.'
  },
  {
    id: 'bul_wing_g_01',
    scope: 'wing',
    regionId: 'G',
    age: [10, 99],
    spDelta: 0,
    vi: 'Khu 7 sửa lại vòm cầu thép qua rãnh công nghiệp sau khi hai dầm đỡ cũ bị rung nứt hồi tháng Tư.',
    en: 'District 7 reinforced the steel bridge spanning the industrial trench after two girders cracked in April.'
  },
  {
    id: 'bul_wing_h_01',
    scope: 'wing',
    regionId: 'H',
    age: [8, 99],
    spDelta: 0,
    vi: 'Cảng kênh Hongyuan ở District 8 mở thêm hai bến sà lan chở thuốc bắc và hương liệu về phía Tây.',
    en: 'Hongyuan canal docks in District 8 opened two new barge berths carrying apothecary herbs west.'
  },
  {
    id: 'bul_wing_h_02',
    scope: 'wing',
    regionId: 'H',
    age: [12, 99],
    spDelta: 1,
    vi: 'Hội thương nhân phố Lồng Đèn District 8 phát 500 chiếc đèn giấy chống mưa gió nhân tiết Trung Thu.',
    en: 'District 8 Lantern Street guilds handed out 500 oiled paper lanterns for the autumn crossing.'
  },
  {
    id: 'bul_wing_i_01',
    scope: 'wing',
    regionId: 'I',
    age: [8, 99],
    spDelta: 0,
    vi: 'Quảng trường âm thanh District 9 hạ công suất loa công cộng xuống 60% sau 22 giờ tối.',
    en: 'District 9 acoustics plaza cut public chime volume to 60% after 10 PM.'
  },
  {
    id: 'bul_wing_j_01',
    scope: 'wing',
    regionId: 'J',
    age: [16, 99],
    spDelta: 0,
    vi: 'Sòng bài hạng sang dưới ánh đèn J Corp ở District 10 bổ sung quy tắc đổi phỉnh mới từ 500 Ahn trở lên.',
    en: 'District 10 high-roller halls under J Corp updated chip clearance rules starting at 500 Ahn.'
  },
  {
    id: 'bul_wing_k_01',
    scope: 'wing',
    regionId: 'K',
    age: [12, 99],
    spDelta: 1,
    vi: 'Trạm bay y tế K Corp ở District 11 giữ nguyên giá nạp ống tái tạo HP sơ cấp cho cư dân có thẻ phường.',
    en: 'K Corp drone bays in District 11 kept basic HP ampoule rates frozen for registered block holders.'
  },
  {
    id: 'bul_wing_k_02',
    scope: 'wing',
    regionId: 'K',
    age: [14, 99],
    spDelta: 0,
    vi: 'Các xe cứu thương xanh lá của District 11 hoàn tất 98% ca gọi khẩn dưới ngưỡng bốn phút.',
    en: 'Green K Corp ambulances in District 11 answered 98% of distress beacons within four minutes.'
  },
  {
    id: 'bul_wing_l_01',
    scope: 'wing',
    regionId: 'L',
    age: [12, 99],
    spDelta: -1,
    vi: 'Xung quanh vành đai sụp đổ của L Corp cũ tại District 12, bảng cảnh báo sương mù trắng vẫn dựng cách 50 mét mỗi cột.',
    en: 'Around the fallen L Corp perimeter in District 12, white-mist warning placards still stand every 50 meters.'
  },
  {
    id: 'bul_wing_l_02',
    scope: 'wing',
    regionId: 'L',
    age: [16, 99],
    spDelta: 0,
    vi: 'Các nhóm Fixer thăm dò District 12 lập thêm ba trạm nghỉ tạm dọc đường vành đai phía Đông.',
    en: 'Salvage Fixers skirting District 12 pitched three new rest huts along the eastern perimeter road.'
  },
  {
    id: 'bul_wing_m_01',
    scope: 'wing',
    regionId: 'M',
    age: [14, 99],
    spDelta: 0,
    vi: 'Đoàn thử nghiệm giáp chống rối loạn tâm trí của M Corp qua tuyến đường District 13 vào mỗi sáng thứ Năm.',
    en: 'M Corp moonstone armor trials crossed District 13 avenues every Thursday morning.'
  },
  {
    id: 'bul_wing_n_01',
    scope: 'wing',
    regionId: 'N',
    age: [14, 99],
    spDelta: 0,
    vi: 'Cơ quan kiểm định N Corp tại District 14 phát tờ rơi mới về danh sách bộ phận thay thế phải khai báo.',
    en: 'N Corp inspectors in District 14 distributed updated checklists of declarable prosthetic parts.'
  },
  {
    id: 'bul_wing_n_02',
    scope: 'wing',
    regionId: 'N',
    age: [12, 99],
    spDelta: -1,
    vi: 'Chuông tháp đồng Nagel und Hammer ở District 14 ngân 14 hồi đúng trưa ngày đầu năm.',
    en: 'Bronze bells at District 14’s Nagel und Hammer spire tolled 14 times at New Year noon.'
  },
  {
    id: 'bul_wing_o_01',
    scope: 'wing',
    regionId: 'O',
    age: [14, 99],
    spDelta: 0,
    vi: 'Hệ thống kiểm kê tự động của O Corp ở District 15 rút thời gian đóng dấu kho xuống còn 12 phút mỗi kiện.',
    en: 'O Corp ledger gantries in District 15 trimmed warehouse clearance stamps to 12 minutes per crate.'
  },
  {
    id: 'bul_wing_p_01',
    scope: 'wing',
    regionId: 'P',
    age: [14, 99],
    spDelta: 0,
    vi: 'Các tòa nhà District 16 đóng chặt hệ thống khóa không gian tầng hầm theo lịch bảo trì 6 tháng một lần.',
    en: 'District 16 towers sealed basement spatial locks for P Corp’s six-month inspection schedule.'
  },
  {
    id: 'bul_wing_q_01',
    scope: 'wing',
    regionId: 'Q',
    age: [12, 99],
    spDelta: 0,
    vi: 'Chợ cổ vật dọc hành lang District 17 đấu giá ba kiện bản đồ giấy vẽ tay từ thời kỳ trước.',
    en: 'Curio stalls along District 17 arcades auctioned three hand-inked maps from earlier decades.'
  },
  {
    id: 'bul_wing_r_01',
    scope: 'wing',
    regionId: 'R',
    age: [14, 99],
    spDelta: 0,
    vi: 'Đội huấn luyện R Corp tại District 18 đóng cổng thao trường số 2 suốt 10 ngày diễn tập bắn đạn thật.',
    en: 'R Corp training blocks in District 18 shut Range Two for 10 days of live-fire drills.'
  },
  {
    id: 'bul_wing_s_01',
    scope: 'wing',
    regionId: 'S',
    age: [10, 99],
    spDelta: 1,
    vi: 'Nhà kho nông sản S Corp ở District 19 phát 400 bao gạo mới đầu mùa cho khu công nhân nông trại.',
    en: 'S Corp granaries in District 19 issued 400 fresh rice sacks to agricultural terrace workers.'
  },
  {
    id: 'bul_wing_t_01',
    scope: 'wing',
    regionId: 'T',
    age: [12, 99],
    spDelta: 0,
    vi: 'Dưới bầu trời đơn sắc của District 20, bảng thuế thời gian T Corp niêm yết lại khung giờ nạp đồng hồ công.',
    en: 'Under District 20’s monochrome sky, T Corp time boards posted updated public winding hours.'
  },
  {
    id: 'bul_wing_t_02',
    scope: 'wing',
    regionId: 'T',
    age: [14, 99],
    spDelta: -1,
    vi: 'Các ga tàu hơi nước District 20 thu phụ phí hai tiếng đồng hồ bỏ túi cho những chuyến khởi hành quá nửa đêm.',
    en: 'District 20 steam depots charged two extra pocket-watch hours on departures past midnight.'
  },
  {
    id: 'bul_wing_u_01',
    scope: 'wing',
    regionId: 'U',
    age: [10, 99],
    spDelta: 0,
    vi: 'Hải đăng U Corp bên bờ Đại Hồ District 21 đổi tần số tín hiệu bảy giây mỗi nhịp trước mùa sóng lớn.',
    en: 'U Corp lighthouses along District 21’s Great Lake shifted beacons to seven-second intervals before storm season.'
  },
  {
    id: 'bul_wing_u_02',
    scope: 'wing',
    regionId: 'U',
    age: [14, 99],
    spDelta: 0,
    vi: 'Tàu đánh cá sắt trở về bến 14 District 21 với 18 tấn giáp cá voi vây xám.',
    en: 'Iron trawlers docked at District 21 Pier 14 carrying 18 tons of grey-finned whale plating.'
  },
  {
    id: 'bul_wing_v_01',
    scope: 'wing',
    regionId: 'V',
    age: [10, 99],
    spDelta: 0,
    vi: 'Tuyến hành lang kính khu 22 hoàn tất việc thay 90 tấm vách ngăn cách âm giáp đường tàu.',
    en: 'District 22’s glass concourse finished installing 90 acoustic baffles bordering the rail viaduct.'
  },
  {
    id: 'bul_wing_w_01',
    scope: 'wing',
    regionId: 'W',
    age: [12, 99],
    spDelta: 0,
    vi: 'Ga WARP tại District 23 giữ nguyên thời gian chuyển hành khách hạng phổ thông dưới mốc 10 giây hiển thị.',
    en: 'District 23 WARP platforms kept standard-class transit clocks displaying under 10 seconds.'
  },
  {
    id: 'bul_wing_x_01',
    scope: 'wing',
    regionId: 'X',
    age: [16, 99],
    spDelta: 0,
    vi: 'Hợp kim từ lò tinh luyện X Corp ở District 24 giảm 5% giá xuất xưởng cho các Workshop đã đăng ký với Tres.',
    en: 'Alloy stock from X Corp smelters in District 24 dropped 5% for Tres-registered Workshops.'
  },
  {
    id: 'bul_wing_y_01',
    scope: 'wing',
    regionId: 'Y',
    age: [8, 99],
    spDelta: 0,
    vi: 'Đội bảo trì khu 25 vá xong ba đoạn đường ống sưởi trung tâm trước đợt rét cuối năm.',
    en: 'District 25 crews sealed three sections of central heating pipe ahead of late-year frost.'
  },
  {
    id: 'bul_wing_z_01',
    scope: 'wing',
    regionId: 'Z',
    age: [16, 99],
    spDelta: 0,
    vi: 'Vùng rìa District 26 chỉ xuất hiện trên hai bản đồ nội bộ với ghi chú tuyến đường đang chờ đo đạc lại.',
    en: 'The edge of District 26 still carries a pending-survey note across two internal City atlases.'
  }
];

export default CITY_BULLETINS;
