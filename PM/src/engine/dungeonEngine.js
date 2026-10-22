/**
 * Project Moon - Deep Anomalous Micro-Dungeon Engine
 * Provides multi-stage narrative dungeon crawls with:
 * - 4-stage sequential delves (Nodes/Carriages/Sectors)
 * - Sanity Strain & Panic Pressure gauge
 * - Inventory item & trait utility checks
 * - Safe retreat / evacuation choices
 * - Iconic Project Moon atmospheres: WARP Train, L Corp Ruins, La Manchaland, Outskirts Ruins
 */

import { clamp, interpolateText } from './gameEngine.js';
import { addScar } from './scarModel.js';
import { traitsOf } from './variance.js';

export const DUNGEON_DEFINITIONS = {
  dungeon_warp_train: {
    id: 'dungeon_warp_train',
    theme: 'warp',
    titleVi: 'Chuyến Tàu WARP: Toa Cuối Địa Ngục',
    titleEn: 'WARP Train: The Nether Carriages',
    hazard: 'WAW',
    kickerVi: 'Không Gian Dị Chiều W Corp · Thời Gian Đóng Băng',
    kickerEn: 'W Corp Dimensional Rift · Frozen Time',
    accentColor: '#38bdf8',
    stages: [
      {
        stageIndex: 0,
        nameVi: 'Khoang Niêm Phong Cửa',
        nameEn: 'Airlock Decontamination Car',
        descVi: 'Khóa cửa niêm phong rít lên chói tai khi áp suất tụt dốc. Mùi máu tanh nồng và tiếng gầm gừ vô thanh rỉ qua khe cửa. Nhân viên W Corp đứng cạnh bạn đang run rẩy kiểm tra bình dưỡng khí.',
        descEn: 'The airtight bulkheads screech as pressure drops. A visceral stench of warm iron and silent screams leaks through the seal. The W Corp cleaners beside you tremble as they check their rebreathers.',
        strainGain: 15,
        choices: [
          {
            labelVi: 'Bơm khí khử trùng công nghiệp, ổn định nhịp thở trước khi xông vào',
            labelEn: 'Flood industrial disinfectant, steadying breath before breaching',
            resultVi: 'Màn khói khử khuẩn làm dịu bớt mùi tanh tưởi. Bạn bước qua ngưỡng cửa với cái đầu lạnh.',
            resultEn: 'The antiseptic mist dulled the nauseating stench. You crossed the threshold with cold composure.',
            fx: { sanity: 5, health: 0 },
            strainDelta: -5
          },
          {
            labelVi: 'Dùng ống tiêm K Corp dự phòng gia cố cơ bắp và thần kinh',
            labelEn: 'Expend a K Corp Ampoule to reinforce muscle and nerve fibers',
            reqItem: 'con_kcorp_ampoule',
            consumeItem: true,
            resultVi: 'Dung dịch huyết thanh xanh ngọc bích tràn vào huyết quản, mang lại sinh lực dồi dào và sự tập trung tuyệt đối.',
            resultEn: 'Emerald singularity tears flooded your veins, granting surging vigor and supreme clarity.',
            fx: { health: 25, sanity: 20 },
            strainDelta: -20
          },
          {
            labelVi: 'Phá then cài lao thẳng vào không chần chừ',
            labelEn: 'Shatter the latch and charge inside without hesitation',
            resultVi: 'Áp suất chênh lệch quật mạnh vào ngực bạn, nhưng tốc độ giúp bạn chiếm ưu thế chủ động.',
            resultEn: 'The pressure wave slammed your chest, but sheer speed seized immediate initiative.',
            fx: { health: -5, rep: 4 },
            strainDelta: +10
          }
        ]
      },
      {
        stageIndex: 1,
        nameVi: 'Khoang Hành Khách Biến Dị',
        nameEn: 'The Writhing Passenger Cabins',
        descVi: 'Bên trong toa xe, ghế ngồi đã bị nuốt chửng bởi những khối thịt người hòa lẫn. Hàng chục khuôn mặt còn nguyên nhận thức sau hai nghìn năm giam cầm đang khóc lóc và giơ những cánh tay biến dạng về phía bạn.',
        descEn: 'Inside, passenger seats are drowned beneath fused, writhing masses of human tissue. Dozens of faces, conscious through two millennia of dimensional exile, weep and reach out with warped limbs.',
        strainGain: 20,
        canFlee: true,
        choices: [
          {
            labelVi: 'Dùng gậy khống chế W Corp tách rời và dồn bầy thịt vào các ghế số',
            labelEn: 'Use W Corp suppression staves to peel and herd flesh amalgams onto seats',
            resultVi: 'Bạn làm việc kiên trì giữa những tiếng gào van xin. Bầy thịt được ghim chặt vào ghế trước khi cỗ máy thời gian khởi động.',
            resultEn: 'You worked methodically through agonizing pleas, pinning screaming amalgams to their assigned seats.',
            fx: { health: -8, sanity: -6, merit: 6 },
            lootAhn: 20,
            strainDelta: +10
          },
          {
            labelVi: 'Tìm chiếc vali chứa tài liệu mật của một nhà nghiên cứu Wing bị kẹt lại',
            labelEn: 'Search for a stranded Wing researcher’s encrypted briefcase',
            resultVi: 'Bạn đào bới lớp thịt nhão và giật lấy chiếc cặp số nguyên tem. Bên trong là các chứng từ đắt giá.',
            resultEn: 'You dug through warm sinew and tore free the sealed case. Inside lay classified financial bonds.',
            fx: { health: -14, sanity: -10, wealth: 35, merit: 4 },
            strainDelta: +15
          },
          {
            labelVi: 'Lùi lại buồng đệm, kích hoạt báo động rút lui sớm',
            labelEn: 'Fall back into the airlock and sound an early extraction siren',
            isFlee: true,
            resultVi: 'Bạn thoát ra cửa ga an toàn trước khi lũ quái vật ùa tới. W Corp trả nửa tiền công cho sự cẩn trọng.',
            resultEn: 'You evacuated safely before the horrors swarmed. W Corp wired half-pay for your discretion.',
            fx: { wealth: 15, sanity: 5 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Toa Hạng Nhất: Quái Thai Hợp Thể',
        nameEn: 'First-Class Chamber: Apex Amalgam',
        descVi: 'Toa hạng nhất đã biến thành một pháo đài thịt khổng lồ. Vị tài phiệt Feather cùng đoàn vệ sĩ đã hợp thành một sinh vật nhiều đầu mang vũ khí Workshop sắc lẹm, đôi mắt đỏ rực cơn cuồng nộ vô tận.',
        descEn: 'The first-class car has coalesced into a colossal flesh bastion. A wealthy Feather and his retinue have fused into a multi-headed juggernaut brandishing jagged Workshop steel, eyes burning with endless fury.',
        strainGain: 25,
        canFlee: true,
        choices: [
          {
            labelVi: 'Vận toàn bộ nội lực chém đứt khớp nối trung tâm của quái thai',
            labelEn: 'Channel all combat prowess to sever the central nervous node',
            checkTrait: 'vigor',
            resultVi: 'Lưỡi đao của bạn xé toạc lõi thần kinh. Con quái vật đổ sụp trong tiếng gầm rú chấn động cả toa tàu.',
            resultEn: 'Your blade ripped through the nervous apex. The titan collapsed, its dying roar rattling the carriage frame.',
            fx: { health: -15, sanity: -8, rep: 12, merit: 10 },
            lootAhn: 30,
            strainDelta: +10
          },
          {
            labelVi: 'Giữ khoảng cách, dùng bẫy buồng chân không nghiền nát sinh vật',
            labelEn: 'Maintain distance and crush the abomination with decompression bulkheads',
            resultVi: 'Vách ngăn kim loại sập xuống nghiền nát con quái vật. Bạn giữ an toàn tính mạng nhưng làm hỏng một phần chiến lợi phẩm.',
            resultEn: 'Hydraulic bulkheads sheared the monster in two. You kept your skin intact at the cost of ruined scrap.',
            fx: { health: -6, sanity: -12, merit: 8 },
            lootAhn: 15,
            strainDelta: +5
          },
          {
            labelVi: 'Bỏ lại khoang hạng nhất, chạy nhanh về phía cửa thoát hiểm',
            labelEn: 'Abandon the luxury cabin and dash toward the exit bulkhead',
            isFlee: true,
            resultVi: 'Bạn đóng sập cánh cửa sắt sau lưng, bỏ lại khoang hạng nhất cho đội thanh trừng hạng nặng.',
            resultEn: 'You slammed the steel door shut behind you, leaving first-class to the heavy purge units.',
            fx: { rep: -2, sanity: 2 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Đếm Ngược 10 Giây Khôi Phục',
        nameEn: 'The Ten-Second Temporal Reset',
        descVi: 'Tiếng chuông báo hiệu vang dội: hệ thống Singularity khôi phục nguyên trạng chuẩn bị kích hoạt! Cánh cửa mở ra sân ga The City chỉ còn cách bạn vài bước chân.',
        descEn: 'The station chime chimes deafeningly: the state-restoration Singularity is priming! The doors opening onto the City platform are just steps ahead.',
        strainGain: 10,
        choices: [
          {
            labelVi: 'Uống viên thuốc xóa nhớ của W Corp, nhận 70 Ahn tiền công và bước ra ga',
            labelEn: 'Take W Corp amnestics, collect the 70 Ahn hazard bounty, and step onto the platform',
            resultVi: 'Cơn ác mộng 2.000 năm tan biến như bọt nước. Bạn bước ra sân ga rạng rỡ với túi tiền trĩu nặng, hoàn toàn không nhớ điều gì đã xảy ra.',
            resultEn: 'The 2,000-year nightmare dissolved like sea foam. You stepped onto the sunlit platform with heavy pockets, remembering nothing.',
            fx: { wealth: 70, sanity: 15, rep: 10, merit: 12 },
            recordAdd: 'warp_cleaner_survivor'
          },
          {
            labelVi: 'Từ chối thuốc xóa nhớ, giấu mẫu mô Singularity vào người rồi đào tẩu',
            labelEn: 'Refuse amnestics, smuggle the living Singularity tissue, and slip away',
            resultVi: 'Bạn ôm chặt chiếc lọ chứa tế bào không gian còn ngọ nguậy, hòa vào đám đông biến mất. Seven Association trả một khoản tiền khổng lồ, nhưng W Corp đã đưa tên bạn vào danh sách đen.',
            resultEn: 'Clutching the jar of writhing dimensional tissue, you vanished into the throng. Seven Association paid a fortune, but W Corp placed a red mark beside your name.',
            fx: { wealth: 110, sanity: -15, heat: 25, taboo: 1, merit: 18 },
            scarAdd: 'Ký ức địa ngục tàu WARP',
            recordAdd: 'singularity_whistleblower'
          }
        ]
      }
    ]
  },

  dungeon_lobotomy_ruin: {
    id: 'dungeon_lobotomy_ruin',
    theme: 'lobotomy',
    titleVi: 'Tàn Tích L Corp: Chi Nhánh Sụp Đổ',
    titleEn: 'Collapsed L Corp Sub-Branch Ruins',
    hazard: 'WAW',
    kickerVi: 'Hầm Ngục Dị Thường Bị Niêm Phong · Khai Quật Cogito',
    kickerEn: 'Sealed Abnormality Depths · Cogito Excavation',
    accentColor: '#f59e0b',
    stages: [
      {
        stageIndex: 0,
        nameVi: 'Trục Thông Gió Khẩn Cấp',
        nameEn: 'The Emergency Ventilation Shaft',
        descVi: 'Đoàn thám hiểm đu dây xuống đường ống thông gió sâu hun hút. Dưới đáy hầm, đèn khẩn cấp chớp nháy màu cam ảm đạm; tiếng còi báo động Meltdown rú rít vọng lại từ các tầng sâu.',
        descEn: 'The expedition rappels into the yawning ventilation shaft. At the bottom, amber emergency lamps pulse; the shrill wail of a containment Meltdown siren echoes from the lower decks.',
        strainGain: 15,
        choices: [
          {
            labelVi: 'Giải mã bản đồ kiến trúc của chi nhánh từ bảng điều khiển hỏng',
            labelEn: 'Decode the branch floor plan from a damaged terminal',
            resultVi: 'Màn hình xanh hiện lên sơ đồ các phòng chứa Enkephalin an toàn nhất. Đoàn đi tránh được các cạm bẫy khí độc.',
            resultEn: 'The CRT screen flickered green, showing safe transit routes. The team bypassed toxic gas corridors.',
            fx: { sanity: 5, network: 3 },
            strainDelta: -5
          },
          {
            labelVi: 'Dùng thiết bị lọc Workshop dọn sạch khói Enkephalin rò rỉ',
            labelEn: 'Deploy a Workshop filtration rig to scrub leaking Enkephalin smog',
            resultVi: 'Bộ lọc rít lên và hút cạn làn sương thôi miên. Cả đội thở phào nhẹ nhõm.',
            resultEn: 'The filters hummed, scouring the hypnotic mist. The team breathed a collective sigh of relief.',
            fx: { health: 5, sanity: 5, wealth: -4 },
            strainDelta: -10
          },
          {
            labelVi: 'Bật đèn pin công suất lớn, dẫn đầu đội tiến thẳng vào hành lang chính',
            labelEn: 'Switch on high-beam torches and lead the squad down the main concourse',
            resultVi: 'Ánh đèn xua tan bóng tối nhưng đánh động những sinh vật đang ngủ sâu bên trong.',
            resultEn: 'The halogen beams tore through darkness but disturbed dormant things nesting in the ducts.',
            fx: { health: -6, rep: 4 },
            strainDelta: +10
          }
        ]
      },
      {
        stageIndex: 1,
        nameVi: 'Bộ Phận Chiết Xuất Năng Lượng',
        nameEn: 'The Extraction & Refining Department',
        descVi: 'Bể chứa Enkephalin khổng lồ đã bị nứt toác, dung dịch phát quang xanh lục tràn ngập sàn nhà. Những chiếc kén Abnormality rỗng không vỡ nát ngổn ngang giữa các xác nhân viên mặc áo blouse trắng.',
        descEn: 'A colossal Enkephalin tank has fractured, spilling luminescent green fluid across the floor. Shattered, empty Abnormality containment pods litter the corridor amongst white-coated corpses.',
        strainGain: 20,
        canFlee: true,
        choices: [
          {
            labelVi: 'Thu hồi các bình tinh thể Enkephalin nguyên vẹn chưa bị vỡ',
            labelEn: 'Extract intact refined Enkephalin fuel canisters from the wreckage',
            resultVi: 'Bạn cẩn thận tháo 3 bình nhiên liệu quý giá cho vào thùng bảo quản. Giá trị của chúng ở chợ đen là cực lớn.',
            resultEn: 'You delicately secured three pristine fuel cylinders. Their black-market bounty is immense.',
            fx: { wealth: 35, merit: 6, health: -6 },
            lootAhn: 25,
            strainDelta: +5
          },
          {
            labelVi: 'Khám xét thi thể các Quản Lý cấp cao để tìm thẻ khóa phòng trung tâm',
            labelEn: 'Search senior researcher corpses for Central Command access keys',
            resultVi: 'Bạn tìm thấy một chiếc thẻ từ phủ vàng và chiếc máy ghi âm chứa những dữ liệu nghiên cứu mật.',
            resultEn: 'You recovered a gold-plated keycard and an audio cassette containing classified trial logs.',
            fx: { network: 8, sanity: -8, rep: 6 },
            strainDelta: +10
          },
          {
            labelVi: 'Mang số Enkephalin nhặt được rút lui theo lối thông gió',
            labelEn: 'Take the salvaged Enkephalin and evacuate through the vent',
            isFlee: true,
            resultVi: 'Bạn rút lui an toàn lên mặt đất, bàn giao số nhiên liệu và nhận tiền thù lao thỏa đáng.',
            resultEn: 'You withdrew safely to the surface, delivering the fuel for an honorable bounty.',
            fx: { wealth: 25, sanity: 5 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Khu Giam Giữ Vỡ Kén: Dị Thường Thức Tỉnh',
        nameEn: 'Containment Sector: Awakening Abnormality',
        descVi: 'Một cánh cửa thép cấp ALEPH bị xé toạc từ bên trong. Giữa căn phòng ngập tràn rễ cây kim loại và gai nhọn, một thực thể Abnormality đang cất tiếng hát ru kỳ dị khiến tai bạn rỉ máu.',
        descEn: 'An ALEPH-grade blast door has been torn outward. Amidst a chamber choked with metallic roots and barbed thorns, an awakened Abnormality hums a dissonant lullaby that makes your ears bleed.',
        strainGain: 25,
        canFlee: true,
        choices: [
          {
            labelVi: 'Vận dụng vũ khí E.G.O, đồng thanh phản kháng lại tiếng hát thôi miên',
            labelEn: 'Raise your weapon and resist the psychic hum with steadfast volition',
            checkTrait: 'nerve',
            resultVi: 'Ý chí kiên định giúp bạn đập tan sóng âm dị thường. Sinh vật thu rễ rút sâu vào bóng tối, để lại một mảnh giáp E.G.O quý hiếm.',
            resultEn: 'Iron willpower shattered the psychic hum. The entity recoiled into shadows, leaving a pristine E.G.O armor shard.',
            fx: { health: -12, sanity: -8, resonance: 15, rep: 10 },
            lootAhn: 30,
            strainDelta: +10
          },
          {
            labelVi: 'Cắt đứt nguồn điện dẫn đến rễ kim loại, cô lập buồng giam giữ',
            labelEn: 'Sever the power conduits feeding the metallic roots, sealing the chamber',
            resultVi: 'Dòng điện tắt ngấm, cánh cửa tự động sập xuống nhốt chặt dị thể. Cả đội an toàn thoát nạn.',
            resultEn: 'Power died; hydraulic blast doors slammed shut, entombing the anomaly once more.',
            fx: { health: -8, sanity: -6, merit: 8 },
            strainDelta: +5
          },
          {
            labelVi: 'Bỏ chạy ngược về phía thang máy phụ trước khi tinh thần tan vỡ',
            labelEn: 'Flee toward the auxiliary lift before your sanity unravels',
            isFlee: true,
            resultVi: 'Bạn bấm nút thang máy khẩn cấp phóng lên trên, bỏ lại căn phòng sau lưng trong tiếng thở phào.',
            resultEn: 'You hit the emergency ascent winch, escaping the chamber with rattling nerves.',
            fx: { sanity: -4, rep: -2 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Lõi Trung Tâm: Tinh Thể Cogito',
        nameEn: 'Central Command: The Well of Cogito',
        descVi: 'Tầng sâu nhất của chi nhánh mở ra trước mắt: một giếng sâu hun hút phát ra ánh sáng lung linh của Cogito nguyên chất. Nơi đây là khởi nguồn của mọi phép màu và thảm họa trong The City.',
        descEn: 'The deepest floor opens before you: an abyssal well shimmering with pure, primordial Cogito. The fountainhead of both miracles and nightmares in the City.',
        strainGain: 10,
        choices: [
          {
            labelVi: 'Chiết xuất một ống Cogito nguyên chất niêm phong trong hộp chì',
            labelEn: 'Extract a phial of raw Cogito sealed inside a lead casing',
            resultVi: 'Bạn mang mẫu vật vô giá lên mặt đất. Các Cánh lớn sẵn sàng chi trả cả một gia tài để sở hữu bí mật này.',
            resultEn: 'You brought the priceless specimen to the surface. Wings would wage silent wars for this secret.',
            fx: { wealth: 85, sanity: -12, rep: 18, resonance: 20 },
            recordAdd: 'cogito_ruin_salvager'
          },
          {
            labelVi: 'Lắng nghe tiếng thì thầm của giếng sâu, đón nhận sự khai mở của Ánh Sáng',
            labelEn: 'Listen to the deep well’s cadence, embracing the efflorescence of Light',
            resultVi: 'Một luồng sáng ấm áp rực rỡ truyền vào tâm khảm. Vết nứt trong tâm trí bạn liền lại; bạn thấu hiểu sâu sắc hơn về bản ngã con người.',
            resultEn: 'Warm, blinding luminescence flooded your psyche. The fissures in your soul healed; your comprehension of the self deepened forever.',
            fx: { sanity: 30, resonance: 25, health: 15, rep: 12 },
            recordAdd: 'light_seeker_initiate'
          }
        ]
      }
    ]
  },

  dungeon_bloodfiend_carnival: {
    id: 'dungeon_bloodfiend_carnival',
    theme: 'bloodfiend',
    titleVi: 'La Manchaland: Lễ Hội Khát Máu',
    titleEn: 'La Manchaland: The Crimson Carnival',
    hazard: 'WAW',
    kickerVi: 'Công Viên Ngầm Huyết Tộc · Mê Cung Khát Máu',
    kickerEn: 'Subterranean Bloodfiend Domain · Thirst Maze',
    accentColor: '#f43f5e',
    stages: [
      {
        stageIndex: 0,
        nameVi: 'Cổng Đón Khách: Búp Bê Khâu Da',
        nameEn: 'The Welcome Gate: Stitched Marionettes',
        descVi: 'Dưới hầm ngầm District 16, một công viên giải trí rực rỡ ánh đèn neon đỏ máu hiện ra. Những con rối khâu bằng da người dang tay cúi chào, trong khi bản nhạc kèn hơi méo mó vang vọng khắp các gian hàng.',
        descEn: 'Beneath District 16’s drainage vaults, a subterranean amusement park glows with crimson neon. Marionettes stitched from human hide bow in mock welcome as warped organ music drifts through the stalls.',
        strainGain: 15,
        choices: [
          {
            labelVi: 'Mua một chiếc vé danh dự bằng vài đồng Ahn để qua cổng đúng phép',
            labelEn: 'Buy an honorary carnival ticket with small Ahn to pass with courtesy',
            resultVi: 'Con rối nhận tiền, xé vé và mở cổng cho bạn. Sự tôn trọng hình thức giúp bạn tránh đụng độ sớm.',
            resultEn: 'The puppet took the coins, punched your ticket, and unlocked the turnstile without bloodshed.',
            fx: { wealth: -3, rep: 3 },
            strainDelta: -5
          },
          {
            labelVi: 'Chém đứt dây điều khiển của các con rối và đạp tung rào chắn',
            labelEn: 'Sever the marionette strings and kick through the barricade',
            resultVi: 'Lũ búp bê đổ sụp, để lộ lối đi thẳng vào khu trung tâm nhưng phát ra tiếng chuông báo động.',
            resultEn: 'The puppets slumped lifeless, clearing the corridor but ringing hidden alarm chimes.',
            fx: { health: -4, rep: 6, heat: 5 },
            strainDelta: +10
          }
        ]
      },
      {
        stageIndex: 1,
        nameVi: 'Đu Quay Máu & Mê Cung Gương Nứt',
        nameEn: 'The Crimson Ferris Wheel & Shattered Mirrors',
        descVi: 'Một chiếc đu quay khổng lồ đang quay tít trên một hồ máu quánh đặc. Trong mê cung gương nứt bên cạnh, những cái bóng phản chiếu nhe răng nanh và cất tiếng gọi tên bạn bằng giọng nói của những người thân đã khuất.',
        descEn: 'A colossal wheel churns atop an oily lake of coagulated blood. Inside the hall of mirrors, your reflections bare fangs and whisper your name in the voices of departed kin.',
        strainGain: 20,
        canFlee: true,
        choices: [
          {
            labelVi: 'Nhắm chặt mắt, dùng thính giác và nhịp thở để xuyên qua mê cung gương',
            labelEn: 'Close your eyes and navigate the mirror maze by breath and sound alone',
            checkTrait: 'nerve',
            resultVi: 'Bạn không bị ảo ảnh đánh lừa và bước ra khỏi mê cung với tinh thần vững vàng.',
            resultEn: 'Refusing the illusions, you strode past the mirrors with unshaken composure.',
            fx: { sanity: 8, merit: 6 },
            lootAhn: 20,
            strainDelta: -5
          },
          {
            labelVi: 'Lục soát các quầy trò chơi bị bỏ hoang để tìm Huyết Tinh quý hiếm',
            labelEn: 'Scavenge abandoned prize booths for crystallized Bloodfiend shards',
            resultVi: 'Bạn tìm thấy hai viên Huyết Tinh đỏ thẫm tỏa hơi ấm kỳ lạ, nhưng bị mảnh gương cứa vào tay.',
            resultEn: 'You pocketed two warm crimson blood gems, though broken glass slashed your palms.',
            fx: { health: -10, wealth: 30, merit: 4 },
            lootAhn: 20,
            strainDelta: +10
          },
          {
            labelVi: 'Rút lui theo đường cống dẫn nước thải trước khi bị bao vây',
            labelEn: 'Retreat through the runoff culvert before the Kindred close in',
            isFlee: true,
            resultVi: 'Bạn trườn qua đường cống ngầm thoát ra ngoài phố, bảo toàn an toàn tính mạng.',
            resultEn: 'You crawled through the culvert and emerged into the rain, alive and whole.',
            fx: { sanity: 4, wealth: 10 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Vũ Đài Huyết Tộc: Trưởng Trại Đói Khát',
        nameEn: 'The Grand Tent: Starving Kindred Elder',
        descVi: 'Dưới mái bạt rạp xiếc khổng lồ, một Huyết Tộc cổ đại (Bloodfiend) khoác áo dạ hội rách rưới đang chờ bạn bên bàn tiệc rượu máu. Đôi mắt đỏ rực như than hồng thèm khát sinh lực ấm áp của con người.',
        descEn: 'Beneath the circus canopy, an ancient Bloodfiend in frayed evening velvet awaits beside a feast of blood wine. Crimson eyes burn with ravenous hunger for living human warmth.',
        strainGain: 25,
        canFlee: true,
        choices: [
          {
            labelVi: 'Rút vũ khí giao đấu sinh tử, từ chối làm con mồi của Huyết Tộc',
            labelEn: 'Draw your weapon and duel the vampire, refusing to become prey',
            checkTrait: 'vigor',
            resultVi: 'Trận kiếm kích tóe lửa trong rạp xiếc. Bạn chém đứt một bên cánh dơi của nó, buộc thực thể phải lùi sâu vào bóng tối.',
            resultEn: 'Steel clashed with fangs in a shower of sparks. You severed a leathery wing, driving the monster back into the vaults.',
            fx: { health: -16, sanity: -6, rep: 14, merit: 10 },
            lootAhn: 30,
            strainDelta: +10
          },
          {
            labelVi: 'Rạch đầu ngón tay dâng một chén máu nhỏ để đổi lấy bí mật cổ xưa',
            labelEn: 'Slice a fingertip to offer a goblet of blood in exchange for ancient secrets',
            resultVi: 'Sinh vật uống từng giọt với vẻ mãn nguyện rồi trao cho bạn một chiếc gia huy Huyết Tộc cổ.',
            resultEn: 'The creature savored every drop and presented you with an antique Kindred signet ring.',
            fx: { health: -8, sanity: -12, network: 12, resonance: 15 },
            lootAhn: 25,
            strainDelta: +5
          },
          {
            labelVi: 'Ném lựu đạn chói mắt rồi tháo chạy về phía lối thoát',
            labelEn: 'Throw a flash flare and sprint for the exit chute',
            isFlee: true,
            resultVi: 'Ánh sáng gay gắt làm mù mắt sinh vật trong vài giây. Bạn kịp phóng qua cửa ngầm thoát nạn.',
            resultEn: 'The blinding flash stunned the beast. You vaulted through the service chute to safety.',
            fx: { health: -4, sanity: 2 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Cửa Thoát Ra Phố Đêm',
        nameEn: 'Escape into the Rain-Swept Night',
        descVi: 'Ánh trăng lạnh lẽo của The City chiếu qua khe nắp cống. Tiếng nhạc xiếc quái đản dần chìm sâu dưới lòng đất sau lưng bạn.',
        descEn: 'Cold moonlight from the City above filters through the manhole grill. The dissonant carnival waltz fades into the subterranean depths behind you.',
        strainGain: 5,
        choices: [
          {
            labelVi: 'Đẩy nắp cống trèo lên phố, bán chiến lợi phẩm Huyết Tinh cho Workshop',
            labelEn: 'Push the iron grate open and broker the Bloodfiend relics to Workshops',
            resultVi: 'Bạn trở về mặt đất với một túi Huyết Tinh quý hiếm. Các xưởng rèn trả giá rất cao để chế tác vũ khí hút máu.',
            resultEn: 'You returned to the surface with rare blood crystals. Workshops paid handsomely for crafting hematic arms.',
            fx: { wealth: 65, rep: 12, sanity: 10, merit: 12 },
            recordAdd: 'bloodfiend_carnival_survivor'
          },
          {
            labelVi: 'Báo cáo tọa độ công viên cho Zwei Association và nhận tiền thưởng truy quét',
            labelEn: 'Report the carnival coordinates to Zwei Association for a bounty',
            resultVi: 'Zwei phong tỏa toàn bộ khu cống ngầm. Bạn được trao thưởng danh dự và ghi nhận công trạng với Hiệp hội.',
            resultEn: 'Zwei cordoned off the sewers. You received an honorary bounty and lasting acclaim from the Association.',
            fx: { rep: 25, wealth: 45, sanity: 15, merit: 16 },
            recordAdd: 'zwei_informant_hero'
          }
        ]
      }
    ]
  },

  dungeon_outskirts_ruins: {
    id: 'dungeon_outskirts_ruins',
    theme: 'outskirts',
    titleVi: 'Phế Tích Ngoại Ô: Cung Điện Cổ Tích',
    titleEn: 'Ancient Ruins of the Outskirts',
    hazard: 'ALEPH',
    kickerVi: 'Ngoài Biên Giới The City · Di Tích Cổ Đại Thất Truyền',
    kickerEn: 'Beyond the City Walls · Forgotten Pre-City Depths',
    accentColor: '#eab308',
    stages: [
      {
        stageIndex: 0,
        nameVi: 'Vết Sạt Cát & Cổng Vòm Cổ',
        nameEn: 'The Collapsed Sand Archway',
        descVi: 'Bão cát hoang mạc thổi bay lớp đất bề mặt, làm lộ ra một cổng vòm cự thạch khổng lồ chìm sâu dưới lòng đất Outskirts. Bên trong là một cầu thang xoắn ốc dẫn xuống bóng tối vô tận.',
        descEn: 'A desert squall peels back centuries of sand, exposing a cyclopean megalith archway buried deep in the Outskirts. A spiral staircase descends into fathomless obsidian gloom.',
        strainGain: 15,
        choices: [
          {
            labelVi: 'Đốt đuốc và kiểm tra vết tích của những đoàn thám hiểm trước',
            labelEn: 'Light torches and survey tracks left by previous expeditions',
            resultVi: 'Bạn nhận diện được các dấu hiệu cạm bẫy cổ xưa mà các Fixer đi trước đã đánh dấu bằng máu.',
            resultEn: 'You deciphered ancient hazard glyphs marked in dried blood by fallen predecessors.',
            fx: { sanity: 5, network: 3 },
            strainDelta: -5
          },
          {
            labelVi: 'Buộc dây cứu sinh vào xe kéo của đoàn caravan và bước xuống',
            labelEn: 'Anchor a lifeline to the caravan wagon and descend carefully',
            resultVi: 'Sợi dây cáp chắc chắn giúp bạn giữ vững thăng bằng khi đất đá lở sụt dưới chân.',
            resultEn: 'The reinforced cable caught your weight when loose masonry gave way beneath your boots.',
            fx: { health: 4, rep: 3 },
            strainDelta: -5
          }
        ]
      },
      {
        stageIndex: 1,
        nameVi: 'Hầm Mộ Kim Loại & Máy Móc Cổ Đại',
        nameEn: 'Vault of Forgotten Singularities',
        descVi: 'Tầng hầm mở rộng ra một quảng trường kim loại kỳ dị. Những cỗ máy khổng lồ từ nền văn minh trước The City vẫn đang quay nhịp nhàng mà không cần nguồn điện, canh giữ những chiếc rương phủ bụi ngàn năm.',
        descEn: 'The chamber opens into an alien subterranean plaza. Titan automata from civilizations predating the City churn in silent rhythms without cables, guarding chests layered in millennia of dust.',
        strainGain: 20,
        canFlee: true,
        choices: [
          {
            labelVi: 'Vô hiệu hóa bánh răng bảo vệ, cạy mở rương kim loại cổ',
            labelEn: 'Dismantle the clockwork wards and pry open an ancient chest',
            checkTrait: 'luck',
            resultVi: 'Bạn gỡ thành công ngòi nổ và lấy được những thỏi kim loại cổ đại có độ cứng phi thường.',
            resultEn: 'You disarmed the primer and extracted ingots of primordial metal with supernatural density.',
            fx: { wealth: 40, merit: 6, health: -6 },
            lootAhn: 30,
            strainDelta: +5
          },
          {
            labelVi: 'Sao chép các ký tự Singularity cổ đại vào sổ tay',
            labelEn: 'Transcribe the ancient Singularity glyphs into your field journal',
            resultVi: 'Những đồ hình toán học cổ xưa mở rộng hiểu biết của bạn về quy luật vận hành của The City.',
            resultEn: 'The arcane schematics expanded your understanding of the City’s deepest physical laws.',
            fx: { resonance: 15, sanity: -6, rep: 8 },
            strainDelta: +10
          },
          {
            labelVi: 'Thu dây leo ngược lên xe kéo caravan để bảo toàn an toàn',
            labelEn: 'Ascend the lifeline back to the caravan wagon safely',
            isFlee: true,
            resultVi: 'Bạn leo lên mặt đất an toàn cùng vài món kim loại nhỏ nhặt được.',
            resultEn: 'You hauled yourself up to the sunlight with a modest handful of salvaged alloy.',
            fx: { wealth: 20, sanity: 5 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Sinh Vật Dị Giới Canh Cổng',
        nameEn: 'Guardian Beast of the Beyond',
        descVi: 'Trước cánh cửa đền cổ, một sinh vật khổng lồ không có mắt, phủ kín vảy sừng và gai nhọn bước ra từ bóng tối. Cơ thể nó phát ra luồng nhiệt dữ dội làm tan chảy cả cát đá xung quanh.',
        descEn: 'Before the inner sanctum, an eyeless colossus armored in chitin plates and radiating blinding thermal heat emerges from the shadows, melting stone wherever its claws tread.',
        strainGain: 25,
        canFlee: true,
        choices: [
          {
            labelVi: 'Lợi dụng các trụ đá cổ để bẫy và hạ gục sinh vật',
            labelEn: 'Lure the beast beneath crumbling stone pillars and collapse them',
            checkTrait: 'vigor',
            resultVi: 'Khối cự thạch đổ sập chôn vùi con quái vật. Bạn chặt lấy chiếc sừng phát quang làm chiến lợi phẩm vô giá.',
            resultEn: 'Megaliths crashed down, crushing the titan. You severed its radiant horn as an invaluable trophy.',
            fx: { health: -15, rep: 16, merit: 12 },
            lootAhn: 35,
            strainDelta: +10
          },
          {
            labelVi: 'Ném đá mồi lửa dụ quái vật ra xa rồi luồn qua cửa đền',
            labelEn: 'Distract the beast with incendiary flares and slip past the threshold',
            resultVi: 'Bạn trườn qua kẽ đá hẹp trong gang tấc khi hàm răng sắc nhọn ngoạm hụt phía sau lưng.',
            resultEn: 'You slipped through the fissure a fraction of a second before snapping jaws closed on empty air.',
            fx: { health: -8, sanity: -6, merit: 6 },
            strainDelta: +5
          },
          {
            labelVi: 'Rút lui khẩn cấp lên mặt đất trước khi nhiệt lượng thiêu cháy bạn',
            labelEn: 'Emergency retreat to the surface before thermal heat immolates you',
            isFlee: true,
            resultVi: 'Bạn phóng ra ngoài cửa hầm ngay khi luồng lửa quét qua bậc thang.',
            resultEn: 'You scrambled through the archway just as a furnace blast swept the stairs.',
            fx: { health: -5, sanity: 2 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Điện Thờ Di Tích Cổ & Quặng Thần Thánh',
        nameEn: 'The Relic Sanctuary: Ancient Singularity Alloy',
        descVi: 'Bên trong thánh đường cổ là một bệ đá lơ lửng giữa không trung, giữ một khối hợp kim cổ đại phát ra hào quang màu hoàng kim rực rỡ — thứ kim loại huyền thoại có thể rèn nên vũ khí Color Fixer.',
        descEn: 'Inside the sanctum floats a stone altar holding a slab of primordial alloy humming with blinding golden light — the legendary ore capable of forging Color Fixer masterworks.',
        strainGain: 10,
        choices: [
          {
            labelVi: 'Cung kính thu hồi khối quặng cổ đại mang về cho xưởng rèn đỉnh cao',
            labelEn: 'Reverently extract the primordial alloy for masterwork forging',
            resultVi: 'Bạn mang khối kim loại thần thánh lên mặt đất. Tên tuổi bạn được ghi vào biên niên sử của các thợ rèn vĩ đại nhất The City.',
            resultEn: 'You carried the divine metal to the sun. Your name was etched into the annals of the City’s greatest smiths.',
            fx: { wealth: 100, rep: 25, resonance: 20, merit: 20 },
            recordAdd: 'outskirts_ruin_conqueror'
          },
          {
            labelVi: 'Hấp thụ tinh hoa của khối quặng để thức tỉnh thể chất siêu phàm',
            labelEn: 'Commune with the ancient alloy, awakening superhuman fortitude',
            resultVi: 'Năng lượng cổ xưa ngấm vào từng tế bào xương thịt, chữa lành mọi thương tật và ban cho bạn sức mạnh phi thường.',
            resultEn: 'Ancient energy fused into bone and marrow, curing all frailties and bestowing transcendent endurance.',
            fx: { health: 40, sanity: 25, resonance: 30, rep: 15 },
            scarAdd: 'Dấu ấn di tích cổ Outskirts',
            recordAdd: 'outskirts_ascendant'
          }
        ]
      }
    ]
  }
};

/**
 * Creates a new active dungeon session
 */
export function createDungeonSession(dungeonId, char, rng = Math.random) {
  const def = DUNGEON_DEFINITIONS[dungeonId];
  if (!def) return null;

  return {
    id: def.id,
    theme: def.theme,
    titleVi: def.titleVi,
    titleEn: def.titleEn,
    hazard: def.hazard,
    kickerVi: def.kickerVi,
    kickerEn: def.kickerEn,
    accentColor: def.accentColor,
    currentStageIndex: 0,
    totalStages: def.stages.length,
    sanityStrain: 0,
    accumulatedLootAhn: 0,
    accumulatedMerit: 0,
    logs: []
  };
}

/**
 * Gets current stage definition from an active dungeon session
 */
export function getDungeonCurrentStage(session) {
  if (!session) return null;
  const def = DUNGEON_DEFINITIONS[session.id];
  if (!def) return null;
  return def.stages[session.currentStageIndex] || null;
}

/**
 * Checks if a specific choice is available based on character state and inventory
 */
export function isDungeonChoiceAvailable(choice, char, session) {
  if (!choice || !char) return false;
  if (choice.reqItem) {
    const hasItem = (char.inventory || []).some(it => it.id === choice.reqItem || it === choice.reqItem);
    if (!hasItem) return false;
  }
  if (choice.costAhn) {
    const playerWealth = char.stats?.wealth ?? char.wealth ?? 0;
    if (playerWealth < choice.costAhn) return false;
  }
  return true;
}

/**
 * Resolves a choice taken in the active dungeon
 * Returns updated { char, session, isFinished, resolution }
 */
export function resolveDungeonChoice(charState, choiceIndex, rng = Math.random) {
  let char = { ...charState, stats: { ...charState.stats }, logs: [...(charState.logs || [])] };
  let session = char.pendingDungeon ? { ...char.pendingDungeon } : null;
  if (!session) return { char, session: null, isFinished: true, resolution: null };

  const def = DUNGEON_DEFINITIONS[session.id];
  const stage = def?.stages[session.currentStageIndex];
  if (!stage) {
    char.pendingDungeon = null;
    return { char, session: null, isFinished: true, resolution: null };
  }

  const choice = stage.choices[choiceIndex];
  if (!choice) return { char, session, isFinished: false, resolution: null };

  // Calculate traits
  const traits = traitsOf(char);

  // Check trait bonus if applicable
  let success = true;
  if (choice.checkTrait) {
    const traitVal = traits[choice.checkTrait] ?? 1.0;
    const roll = rng();
    success = roll < (0.75 * traitVal);
  }

  // Consume item if needed
  if (choice.consumeItem && choice.reqItem) {
    char.inventory = (char.inventory || []).filter(it => (it.id || it) !== choice.reqItem);
  }

  // Cost Ahn
  if (choice.costAhn) {
    char.stats.wealth = Math.max(0, (char.stats.wealth || 0) - choice.costAhn);
  }

  // Apply FX
  const fx = choice.fx || {};
  let hpDelta = fx.health || 0;
  let spDelta = fx.sanity || 0;

  // Scale down damage if trait check succeeded, or increase if failed
  if (choice.checkTrait) {
    if (success) {
      if (hpDelta < 0) hpDelta = Math.ceil(hpDelta * 0.7);
      if (spDelta < 0) spDelta = Math.ceil(spDelta * 0.7);
    } else {
      if (hpDelta < 0) hpDelta = Math.floor(hpDelta * 1.3);
      if (spDelta < 0) spDelta = Math.floor(spDelta * 1.3);
    }
  }

  char.stats.health = clamp((char.stats.health || 0) + hpDelta, 0, 100);
  char.stats.sanity = clamp((char.stats.sanity || 0) + spDelta, 0, 100);
  if (fx.wealth) char.stats.wealth = clamp((char.stats.wealth || 0) + fx.wealth, 0, 100);
  if (fx.rep) char.stats.rep = clamp((char.stats.rep || 0) + fx.rep, 0, 100);
  if (fx.network) char.stats.network = clamp((char.stats.network || 0) + fx.network, 0, 100);
  if (fx.resonance) char.resonance = clamp((char.resonance || 0) + fx.resonance, 0, 100);
  if (fx.merit) char.merit = Math.max(0, (char.merit || 0) + fx.merit);
  if (fx.heat) char.heat = Math.max(0, (char.heat || 0) + fx.heat);
  if (fx.taboo) char.taboo = Math.max(0, (char.taboo || 0) + fx.taboo);

  // Accumulate loot
  if (choice.lootAhn) {
    session.accumulatedLootAhn = (session.accumulatedLootAhn || 0) + choice.lootAhn;
  }
  if (fx.merit) {
    session.accumulatedMerit = (session.accumulatedMerit || 0) + fx.merit;
  }

  // Update Sanity Strain
  const baseStrain = stage.strainGain || 15;
  const deltaStrain = choice.strainDelta || 0;
  session.sanityStrain = clamp((session.sanityStrain || 0) + baseStrain + deltaStrain, 0, 100);

  // Scars & Records
  if (choice.scarAdd) {
    addScar(char, choice.scarAdd);
  }
  if (choice.recordAdd && !(char.unlockedRecords || []).includes(choice.recordAdd)) {
    char.unlockedRecords = [...(char.unlockedRecords || []), choice.recordAdd];
  }

  // Build log
  const stageLog = {
    id: `log_dungeon_${session.id}_${session.currentStageIndex}_${Date.now()}`,
    age: char.age,
    season: char.season || 'Xuân',
    type: 'story',
    vi: `[${def.titleVi} · Chặng ${session.currentStageIndex + 1}: ${stage.nameVi}] ${choice.resultVi}`,
    en: `[${def.titleEn} · Stage ${session.currentStageIndex + 1}: ${stage.nameEn}] ${choice.resultEn}`
  };
  char.logs.push(stageLog);
  session.logs.push(stageLog);

  // Check death or sanity breakdown
  if (char.stats.health <= 0) {
    char.alive = false;
    char.deathCauseVi = `Bỏ mạng trong ${def.titleVi} (${stage.nameVi})`;
    char.deathCauseEn = `Perished in ${def.titleEn} (${stage.nameEn})`;
    char.pendingDungeon = null;
    return {
      char,
      session: null,
      isFinished: true,
      resolution: {
        titleVi: `Tử Trận Trong ${def.titleVi}`,
        titleEn: `Fell in ${def.titleEn}`,
        resultVi: `Vết thương chí tử tại ${stage.nameVi} đã cướp đi sinh mệnh của bạn. Thân xác bạn hòa lẫn vào lòng hầm ngục.`,
        resultEn: `Fatal wounds sustained in ${stage.nameEn} claimed your life. Your body remains in the deep vaults.`,
        isDead: true
      }
    };
  }

  // Check if player chose to flee or reached end
  const isFlee = Boolean(choice.isFlee);
  const isLastStage = session.currentStageIndex >= def.stages.length - 1;

  if (isFlee || isLastStage) {
    // Award accumulated loot
    if (session.accumulatedLootAhn > 0) {
      char.stats.wealth = clamp((char.stats.wealth || 0) + session.accumulatedLootAhn, 0, 100);
    }
    char.pendingDungeon = null;

    const resolution = {
      titleVi: isFlee ? `Rút Lui Khỏi ${def.titleVi}` : `Chinh Phục ${def.titleVi}`,
      titleEn: isFlee ? `Retreated from ${def.titleEn}` : `Conquered ${def.titleEn}`,
      resultVi: isFlee
        ? `Bạn rút lui an toàn khỏi ${stage.nameVi}. Tổng thù lao thu hoạch: +${session.accumulatedLootAhn} Ahn, +${session.accumulatedMerit} Merit.`
        : `Bạn đã vượt qua toàn bộ 4 chặng của ${def.titleVi}! Tổng chiến lợi phẩm: +${session.accumulatedLootAhn} Ahn, +${session.accumulatedMerit} Merit.`,
      resultEn: isFlee
        ? `You successfully retreated from ${stage.nameEn}. Total haul: +${session.accumulatedLootAhn} Ahn, +${session.accumulatedMerit} Merit.`
        : `You conquered all 4 stages of ${def.titleEn}! Total haul: +${session.accumulatedLootAhn} Ahn, +${session.accumulatedMerit} Merit.`,
      isDead: false
    };

    return { char, session: null, isFinished: true, resolution };
  }

  // Advance stage
  session.currentStageIndex += 1;
  char.pendingDungeon = session;

  return { char, session, isFinished: false, resolution: null };
}

/**
 * Direct retreat action from dungeon
 */
export function fleeDungeon(charState) {
  let char = { ...charState, stats: { ...charState.stats }, logs: [...(charState.logs || [])] };
  let session = char.pendingDungeon;
  if (!session) return { char, session: null, isFinished: true };

  const def = DUNGEON_DEFINITIONS[session.id];
  const stage = def?.stages[session.currentStageIndex];

  if (session.accumulatedLootAhn > 0) {
    char.stats.wealth = clamp((char.stats.wealth || 0) + session.accumulatedLootAhn, 0, 100);
  }
  char.pendingDungeon = null;

  const resolution = {
    titleVi: `Rút Lui Khỏi ${def?.titleVi || 'Hầm Ngục'}`,
    titleEn: `Retreated from ${def?.titleEn || 'Dungeon'}`,
    resultVi: `Bạn quyết định rút lui khẩn cấp từ ${stage?.nameVi || 'giữa đường'} để bảo toàn tính mạng. Mang về +${session.accumulatedLootAhn || 0} Ahn.`,
    resultEn: `You initiated an emergency evacuation from ${stage?.nameEn || 'midway'} to preserve your life. Returning with +${session.accumulatedLootAhn || 0} Ahn.`,
    isDead: false
  };

  return { char, session: null, isFinished: true, resolution };
}
