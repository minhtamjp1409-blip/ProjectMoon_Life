// ============================================================================
// PARALLEL BILINGUAL HELPER & LIBRARY OF RUINA / PROJECT MOON GLOSSARY
// Keeps technical terms (Fixer, Color, Wing, Nest, Backstreets, Distortion, E.G.O...)
// untranslated in Vietnamese narrative while providing a full VI <-> EN <-> LoR-VN table.
// ============================================================================

export function tText(lang, vi, en) {
  if (lang === 'en') return en || vi;
  return vi || en;
}

export const GLOSSARY_CATEGORIES = [
  { id: 'all', vi: 'Tất cả thuật ngữ (42)', en: 'All Terms (42)' },
  { id: 'geography', vi: 'Địa lý & Quy luật The City', en: 'Geography & City Laws' },
  { id: 'fixer', vi: 'Fixer, Office & 12 Associations', en: 'Fixers, Offices & Associations' },
  { id: 'syndicate', vi: 'Syndicate & The Five Fingers', en: 'Syndicates & The Five Fingers' },
  { id: 'supernatural', vi: 'Singularity, Distortion & E.G.O', en: 'Singularities, Distortion & E.G.O' }
];

export const GLOSSARY_TERMS = [
  // --- GEOGRAPHY & CITY LAWS ---
  {
    id: 'the_city',
    category: 'geography',
    term: 'The City',
    kr: '도시 (Dosi)',
    lorVn: 'The City',
    vi: 'The City là đại đô thị khổng lồ nơi toàn bộ nền văn minh nhân loại sinh sống, được chia thành 26 District (Quận A đến Z) dưới sự cai trị tối cao của The Head.',
    en: 'The colossal megacity housing human civilization, divided into 26 Districts (A through Z) under the absolute rule of The Head.'
  },
  {
    id: 'wing',
    category: 'geography',
    term: 'Wing (A–Z Corp)',
    kr: '날개 (Nalgae)',
    lorVn: 'Wing (A–Z Corp)',
    vi: '26 Wing độc quyền nắm giữ các công nghệ siêu nhiên gọi là Singularity, mỗi Wing trực tiếp cai quản một District và bảo vệ vùng Nest của mình.',
    en: '26 mega-corporations monopolizing supernatural technologies called Singularities, each governing a District and protecting its Nest.'
  },
  {
    id: 'nest',
    category: 'geography',
    term: 'Nest & Feather',
    kr: '둥지 · 깃털 (Dungji · Gitteol)',
    lorVn: 'Nest & Feather',
    vi: 'Khu vực trung tâm an toàn, giàu có của mỗi District do Wing bảo hộ. Cư dân hợp pháp trong Nest được gọi là Feather (Lông Vũ) và là mục tiêu phấn đấu của cư dân Backstreets.',
    en: 'The safe, affluent core of each District protected by its Wing. Legal residents are called Feathers, a status coveted by everyone in the Backstreets.'
  },
  {
    id: 'backstreets',
    category: 'geography',
    term: 'Backstreets & Rats',
    kr: '뒷골목 · 뒷골목 쥐 (Dwitgolmok)',
    lorVn: 'Phố Ngầm / Khu Phố Sau & Chuột Phố Ngầm',
    vi: 'Vùng ngoại vi hỗn loạn bao quanh Nest, nơi các Wing bỏ mặc không bảo vệ. Tầng lớp đáy cùng chuyên mổ cướp nội tạng qua ngày bị gọi là Backstreet Rats.',
    en: 'The lawless outer slums surrounding each Nest, unprotected by the Wings. Bottom-feeders who harvest organs to survive are called Backstreet Rats.'
  },
  {
    id: 'night_backstreets',
    category: 'geography',
    term: 'Night in the Backstreets (3:13 – 4:34 AM)',
    kr: '뒷골목의 밤 (Dwitgolmog-ui Bam)',
    lorVn: 'Đêm Phố Ngầm (81 Phút Tử Thần)',
    vi: 'Khoảng thời gian 81 phút mỗi đêm khi các Sweepers tràn ngập đường phố xóa sổ mọi sinh vật ngoài trời. Mọi hành vi ghi âm/quay hình trong giờ này là Taboo cấp tử hình.',
    en: 'The 81-minute window every night when Sweepers flood the streets to liquefy anyone outside. Recording audio or video during this period is a capital Taboo.'
  },
  {
    id: 'outskirts_ruins',
    category: 'geography',
    term: 'Outskirts & Ruins',
    kr: '외곽 · 유적 (Oegwak · Yujeok)',
    lorVn: 'Ngoại Ô & Phế Tích',
    vi: 'Vùng đất hoang vu bên ngoài bức tường The City, đầy rẫy quái vật phi nhân tính, những kẻ bị trục xuất và các hầm ngầm Ruins chứa cổ vật ma thuật cổ xưa.',
    en: 'The desolate wasteland beyond the City walls, teeming with non-human monsters, exiles, and ancient subterranean Ruins holding primordial relics.'
  },
  {
    id: 'the_head',
    category: 'geography',
    term: 'The Head (A Corp · B Corp · C Corp)',
    kr: '머리 · 눈 · 발톱 (Meori · Nun · Baltop)',
    lorVn: 'The Head (Arbiters · Beholders · Claws)',
    vi: 'Thực thể tối cao cai trị The City, gồm A Corp (Arbiters / Điều Phối Viên), B Corp (Beholders / Quan Sát Viên giám sát toàn tri) và C Corp (Claws / Đao Phủ tiêm Serum).',
    en: 'The supreme ruling triad of the City: A Corp (Arbiters), B Corp (omniscient Beholders), and C Corp (Serum-wielding Executioner Claws).'
  },
  {
    id: 'taboo',
    category: 'geography',
    term: 'Taboo & Taboo Hunter',
    kr: '금기 · 금기 사냥꾼 (Geumgi)',
    lorVn: 'Điều Cấm Kỵ & Thợ Săn Cấm Kỵ',
    vi: 'Các luật lệ bất khả xâm phạm của The Head (cấm AI có cảm xúc, cấm nhân bản quá 7 ngày, cấm đạn xuyên tường nhà ở, cấm trốn thuế) và luật riêng của từng Wing.',
    en: 'Inviolable laws enforced by The Head (no sentient AI, no clones past 7 days, strict gun/tax laws) and local Wing regulations enforced by Taboo Hunters.'
  },
  {
    id: 'ahn',
    category: 'geography',
    term: 'Ahn',
    kr: '안 (Ahn)',
    lorVn: 'Đồng Ahn',
    vi: 'Đơn vị tiền tệ chính thức lưu hành trên toàn bộ 26 District của The City.',
    en: 'The official currency circulating across all 26 Districts of The City.'
  },

  // --- FIXERS, OFFICES & ASSOCIATIONS ---
  {
    id: 'fixer',
    category: 'fixer',
    term: 'Fixer (Grade 9 → Grade 1)',
    kr: '해결사 (Haegyeolsa)',
    lorVn: 'Fixer (Grade 9 → Grade 1)',
    vi: 'Những người hành nghề tự do hợp pháp giải quyết mọi ủy thác bằng vũ lực hoặc nghiệp vụ, được Hana Association phân hạng từ Grade 9 (thấp nhất) đến Grade 1 (cao nhất).',
    en: 'Licensed mercenaries and problem-solvers who handle contracts across the City, ranked by Hana Association from Grade 9 (lowest) to Grade 1 (highest).'
  },
  {
    id: 'color_fixer',
    category: 'fixer',
    term: 'Color Fixer',
    kr: '특색 해결사 (Teuksaek Haegyeolsa)',
    lorVn: 'Color Fixer (Sắc Hiệu)',
    vi: 'Đỉnh cao tuyệt đối của giới Fixer. Những Grade 1 sở hữu sức mạnh và triết lý độc nhất được Hana Association ban tặng một danh hiệu gắn với Màu Sắc (như Red Mist, Black Silence, Red Gaze).',
    en: 'The absolute pinnacle of Fixers. Grade 1s of unmatched power and identity granted a unique Color title by Hana Association (e.g., Red Mist, Black Silence, Red Gaze).'
  },
  {
    id: 'office',
    category: 'fixer',
    term: 'Office & Operator',
    kr: '사무소 · 대표 (Samuso)',
    lorVn: 'Văn Phòng & Điều Hành Viên',
    vi: 'Đơn vị hành nghề cơ bản của các Fixer do một Operator đứng đầu. Fixer bắt buộc phải thuộc về một Office hoặc một Association mới được nhận ủy thác hợp pháp.',
    en: 'The fundamental business unit of Fixers led by an Operator. Fixers must belong to an Office or an Association to legally accept contracts.'
  },
  {
    id: 'workshop',
    category: 'fixer',
    term: 'Workshop & Tres Association',
    kr: '공방 · 트레스 협회 (Gongbang)',
    lorVn: 'Công Xưởng & Hiệp Hội Tres',
    vi: 'Các xưởng chế tạo vũ khí, giáp trụ và cơ thể giả (Prosthetics). Mọi thiết kế vũ khí mới đều phải được Tres Association (Hiệp hội số 3) kiểm định và đánh thuế bằng sáng chế.',
    en: 'Craftsman studios forging weapons, armor, and prosthetics. Every new armament design must be certified and taxed by the Tres Association.'
  },
  {
    id: 'hana_assoc',
    category: 'fixer',
    term: 'Hana Association (1)',
    kr: '하나 협회 (Hana Hyeophoe)',
    lorVn: 'Hiệp Hội Hana (Tổng Quản)',
    vi: 'Hiệp hội số 1 đứng đầu toàn bộ 12 Associations. Cấp giấy phép Fixer, phân loại Cấp độ Đe dọa Urban Threat Levels, chỉ định Color Fixer và sử dụng võ thuật Bát Quái.',
    en: 'The 1st and supreme Association overseeing all Fixers, Office licenses, Urban Threat ratings, and Color designations.'
  },
  {
    id: 'zwei_assoc',
    category: 'fixer',
    term: 'Zwei Association (2)',
    kr: '츠바이 협회 (Cheubai Hyeophoe)',
    lorVn: 'Hiệp Hội Zwei (Khiên Chắn)',
    vi: 'Hiệp hội số 2 chuyên bảo vệ VIP, tuần tra trị an khu vực và phòng ngự bằng đại kiếm Zweihänder. Khẩu hiệu: "Your Shield".',
    en: 'The 2nd Association specializing in VIP protection, district security, and defensive combat with Zweihänder greatswords.'
  },
  {
    id: 'shi_assoc',
    category: 'fixer',
    term: 'Shi Association (4)',
    kr: '시 협회 (Si Hyeophoe)',
    lorVn: 'Hiệp Hội Shi (Ám Sát)',
    vi: 'Hiệp hội số 4 chuyên ám sát hợp đồng. Các Fixer của Shi luôn làm việc quá tải trong trạng thái thương tích đầy mình nhưng sở hữu nhát chém tất sát Boundary of Death.',
    en: 'The 4th Association specializing in covert assassination. Chronically overworked and wounded, their Fixers unleash lethal strikes at the brink of death.'
  },
  {
    id: 'cinq_liu_seven',
    category: 'fixer',
    term: 'Cinq (5) · Liu (6) · Seven (7)',
    kr: '섕크 · 리우 · 세븐 협회',
    lorVn: 'Hiệp Hội Cinq (Quyết Đấu) · Liu (Chiến Tranh) · Seven (Tình Báo)',
    vi: 'Cinq chuyên đấu tay đôi danh dự bằng kiếm Rapier; Liu chuyên chiến tranh tổng lực với võ thuật rực lửa; Seven chuyên điều tra thám tử và phân tích điểm yếu.',
    en: 'Cinq handles formal duels; Liu wages all-out warfare with fiery martial arts; Seven conducts intelligence gathering and structural weakness analysis.'
  },
  {
    id: 'eight_devyat_dieci_oufi',
    category: 'fixer',
    term: "Eight (8) · Devyat' (9) · Dieci (10) · Öufi (11)",
    kr: '에잇 · 데바찌 · 디에치 · 외우피 협회',
    lorVn: "Thám Hiểm (8) · Giao Hàng (9) · Tri Thức (10) · Hợp Đồng (11)",
    vi: "Eight thám hiểm Great Lake; Devyat' giao hàng sinh tử với rương Poludnitsa; Dieci đốt ký ức/tri thức thành sức mạnh vật lý; Öufi công chứng và hành quyết kẻ vi phạm hợp đồng.",
    en: "Eight explores the Great Lake; Devyat' couriers carry sentient Poludnitsa trunks; Dieci burns knowledge as physical power; Öufi enforces contracts by execution."
  },

  // --- SYNDICATES & THE FIVE FINGERS ---
  {
    id: 'syndicate',
    category: 'syndicate',
    term: 'Syndicate & The Five Fingers',
    kr: '조직 · 다섯 손가락',
    lorVn: 'Tổ Chức Tội Phạm & Ngũ Chỉ',
    vi: 'Các băng đảng thống trị Backstreets. Đứng đầu là 5 đại tổ chức cấp Star of the City gọi là The Five Fingers: The Thumb, The Index, The Middle, The Ring, The Pinky.',
    en: 'Criminal organizations ruling the Backstreets, topped by five Star of the City megasyndicates: The Thumb, The Index, The Middle, The Ring, and The Pinky.'
  },
  {
    id: 'the_thumb',
    category: 'syndicate',
    term: 'The Thumb (Soldato → Capo → Sottocapo → Underboss)',
    kr: '엄지 (Eomji)',
    lorVn: 'Ngón Cái (Tôn Ti & Đạn Dược)',
    vi: 'Vận hành theo tôn ti lễ nghi tuyệt đối. Kẻ dưới nói leo hoặc nhìn thẳng cấp trên sẽ bị đập nát hàm hoặc cắt lưỡi. Chiến đấu bằng súng trường lưỡi lê và đạn nguyên tố đắt đỏ.',
    en: 'Governed by absolute hierarchy and etiquette. Breaching protocol toward superiors costs a tongue or jaw. Armed with bayonet rifles and costly elemental ammo.'
  },
  {
    id: 'the_index',
    category: 'syndicate',
    term: 'The Index & Prescript (Proselyte → Proxy → Messenger)',
    kr: '검지 · 지령 (Geomji · Jiryeong)',
    lorVn: 'Ngón Trỏ & Chỉ Lệnh (Tu Hành Giả → Đại Hành Giả → Sứ Giả)',
    vi: 'Thực thi mù quáng mọi mảnh giấy Prescript (Chỉ Lệnh) được dệt từ tiếng vọng của The City. Thực hiện đúng Prescript giúp mở khóa sức mạnh lưỡi kiếm (Blade Unlock).',
    en: 'Blindly executes cryptic Prescripts woven from the vibrations of the City. Fulfilling Prescripts unlocks the sealed power of their blades.'
  },
  {
    id: 'the_middle',
    category: 'syndicate',
    term: 'The Middle & Book of Vengeance',
    kr: '중지 · 복수장부 (Jungji)',
    lorVn: 'Ngón Giữa & Sổ Thù Hận',
    vi: 'Coi tổ chức là một đại gia đình gắn kết bằng xích sắt và hình xăm cường hóa ánh tím. Mọi mối thù đều được ghi vào Book of Vengeance và truy sát đến tận đời con cháu.',
    en: 'Treats the Syndicate as family bound by chains and glowing purple enhancement tattoos. Every slight is recorded in the Book of Vengeance and avenged without mercy.'
  },
  {
    id: 'the_ring',
    category: 'syndicate',
    term: 'The Ring (Student → Docent → Maestro)',
    kr: '약지 (Yakji)',
    lorVn: 'Ngón Áp Út (Học Viện Máu)',
    vi: 'Học viện nghệ thuật điên loạn biến máu thịt con người thành tác phẩm (Pointillism, Fauvism, Cubism). Bị chấm điểm F trong kỳ thẩm định đồng nghĩa với cái chết.',
    en: 'A macabre art academy sculpting living flesh into masterpieces. Receiving an F grade during evaluation turns the artist into raw material.'
  },
  {
    id: 'the_pinky',
    category: 'syndicate',
    term: 'The Pinky (Star of the Sky)',
    kr: '소지 (Soji)',
    lorVn: 'Ngón Út (Thập Nhị Tinh Tú)',
    vi: 'Ngón tay bí ẩn và tàn bạo bậc nhất, nơi các cao thủ mang danh hiệu Tinh Tú (Stars) nắm giữ những thanh kiếm định mệnh và lời thề máu.',
    en: 'The most secretive and ruthless Finger, whose elite warriors bear Star titles and wield named blades bound by blood oaths.'
  },
  {
    id: 'kurokumo_blade',
    category: 'syndicate',
    term: 'Kurokumo Clan vs Blade Lineage',
    kr: '흑운회 · 검계 (Heugunhoe · Geomgye)',
    lorVn: 'Hắc Vân Hội vs Kiếm Hệ',
    vi: 'Hai tổ chức kiếm khách đối địch truyền kiếp: Kurokumo Clan (trực thuộc The Thumb, kiểm soát sổ sách bảo kê) và Blade Lineage (kiếm khách lưu vong từ District 19 S Corp).',
    en: 'Bitterly rival sword syndicates: the Kurokumo Clan (a Thumb subsidiary) and the Blade Lineage (wandering swordsmen exiled from District 19 S Corp).'
  },

  // --- SUPERNATURAL, SINGULARITIES & EXISTENTIAL ---
  {
    id: 'singularity',
    category: 'supernatural',
    term: 'Singularity',
    kr: '특이점 (Teugijeom)',
    lorVn: 'Điểm Dị Biệt',
    vi: 'Công nghệ siêu nhiên phá vỡ các định luật vật lý thông thường, là nền tảng quyền lực của 26 Wing (như HP Ampoule của K Corp, WARP Train của W Corp, TimeTrack của T Corp).',
    en: 'Supernatural technologies defying conventional physics, forming the core monopoly of each Wing (e.g., K Corp HP Ampoules, W Corp WARP Trains, T Corp TimeTrack).'
  },
  {
    id: 'wn_dd_carmen',
    category: 'supernatural',
    term: 'White Nights and Dark Days & The Voice',
    kr: '백야흑주 · 목소리 (Baekyaheukju)',
    lorVn: 'Bạch Dạ Hắc Trú & Giọng Nói Của Carmen',
    vi: 'Sự kiện 3 ngày ánh sáng và 4 ngày bóng tối từ Lobotomy Corp đã gieo Hạt Giống Ánh Sáng vào mọi cư dân. Khi tuyệt vọng tột cùng, họ sẽ nghe thấy giọng nói dịu dàng hỏi: "Bạn có nghe thấy giọng nói của tôi không?"',
    en: 'The 3 days of light and 4 days of darkness that planted the Seed of Light in all citizens. At the nadir of despair, a gentle voice asks: "Can you hear my voice?"'
  },
  {
    id: 'distortion',
    category: 'supernatural',
    term: 'Distortion',
    kr: '뒤틀림 (Dwiteullim)',
    lorVn: 'Biến Dị / Sự Vặn Xoắn',
    vi: 'Khi một người sụp đổ tâm lý và buông xuôi theo lời vỗ về của Carmen, khát vọng và nỗi đau của họ bóp méo cơ thể thành một thực thể quái dị mang sức mạnh siêu nhiên.',
    en: 'When a person surrenders to despair and accepts the Voice in the Light, their obsession warps their physical form into a monstrous supernatural phenomenon.'
  },
  {
    id: 'ego',
    category: 'supernatural',
    term: 'Effloresced E.G.O',
    kr: '개화 E.G.O (Gaehwa E.G.O)',
    lorVn: 'Khai Hoa E.G.O',
    vi: 'Khi một người từ chối giọng nói dẫn dụ của Distortion, dám đối diện với vết sẹo tâm thức và tự bước đi bằng ý chí kiên định, họ kết tinh tâm hồn thành vũ khí và giáp trụ E.G.O của riêng mình.',
    en: 'When a person rejects the Voice and confronts their trauma with unyielding resolve, their soul crystallizes into personal E.G.O armor and weaponry.'
  },
  {
    id: 'shin_mang',
    category: 'supernatural',
    term: 'Shin & Mang (Rings of Light)',
    kr: '신(心) · 망(望)',
    lorVn: 'Tâm (Shin) & Vọng (Mang)',
    vi: 'Kỹ thuật hội tụ ký ức đau thương vào tâm thức (Shin) để tạo lớp phòng ngự tâm linh và phóng chiếu thành các Vòng Tròn Ánh Sáng (Mang) xoay quanh vũ khí, nhân bội uy lực đòn đánh.',
    en: 'Focusing intense emotional memories inward (Shin) and projecting them outward as Rings of Light (Mang) around a weapon to exponentially amplify destructive power.'
  },
  {
    id: 'abnormality_peccatulum',
    category: 'supernatural',
    term: 'Abnormality & Peccatulum',
    kr: '환상체 · 죄종 (Hwansangche · Joejong)',
    lorVn: 'Dị Thể & Tội Chủng',
    vi: 'Abnormality là các thực thể bất tử sinh ra từ vô thức tập thể (phân cấp ZAYIN → TETH → HE → WAW → ALEPH). Peccatulum là những kẻ thất bại khi biến đổi vì cái tôi quá nông cạn.',
    en: 'Abnormalities are immortal archetypes drawn from the collective unconscious (ZAYIN to ALEPH). Peccatula are mindless sin-spawn formed when someone fails to Distort.'
  },
  {
    id: 'bloodfiend',
    category: 'supernatural',
    term: 'Bloodfiend, Kindred & Bloodbag',
    kr: '혈귀 · 권속 · 피주머니',
    lorVn: 'Huyết Quỷ, Quyến Thuộc & Túi Máu',
    vi: 'Chủng tộc bất tử mang cơn khát máu vĩnh cửu. Mỗi Bloodfiend chỉ có thể truyền máu tạo ra tối đa 2 Kindred (Quyến thuộc đời dưới); những nạn nhân bị hút máu còn lại biến thành Bloodbag vô tri.',
    en: 'Immortal beings cursed with eternal thirst. Each Bloodfiend can sire at most two Kindred of the next generation; other bitten victims become mindless Bloodbags.'
  },
  {
    id: 'threat_levels',
    category: 'supernatural',
    term: 'Threat Levels (Canard → Impuritas Civitatis)',
    kr: '뜬소문 → 도시의 별 → 불순물',
    lorVn: 'Thang Đe Dọa (Canard → Star of the City → Impuritas Civitatis)',
    vi: '7 bậc phân loại mối đe dọa của Hana Association: 1. Canard → 2. Urban Myth → 3. Urban Legend → 4. Urban Plague → 5. Urban Nightmare → 6. Star of the City → 7. Impuritas Civitatis.',
    en: 'The 7 threat tiers assigned by Hana Association: Canard → Urban Myth → Urban Legend → Urban Plague → Urban Nightmare → Star of the City → Impuritas Civitatis.'
  }
];
