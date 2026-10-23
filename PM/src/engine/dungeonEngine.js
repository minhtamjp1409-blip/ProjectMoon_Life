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
import { evaluateCompanionSupport } from '../data/npcPersonality.js';

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
            resultVi: 'Áp suất chênh lệch quật mạnh vào ngực bạn, nhưng tốc độ giúp bạn chiếm ưu thế chủ động và nhặt được túi tiền đánh rơi của hành khách.',
            resultEn: 'The pressure wave slammed your chest, but sheer speed seized immediate initiative and a dropped passenger pouch.',
            fx: { health: -4, rep: 5, merit: 4 },
            lootAhn: 12,
            strainDelta: +8
          }
        ]
      },
      {
        stageIndex: 1,
        nameVi: 'Khoang Hành Khách Biến Dị',
        nameEn: 'The Writhing Passenger Cabins',
        descVi: 'Bên trong toa xe, ghế ngồi đã bị nuốt chửng bởi những khối thịt người hòa lẫn. Hàng chục khuôn mặt còn nguyên nhận thức sau hai nghìn năm giam cầm đang khóc lóc và giơ những cánh tay biến dạng về phía bạn.',
        descEn: 'Inside, passenger seats are drowned beneath fused, writhing masses of human tissue. Dozens of faces, conscious through two millennia of dimensional exile, weep and reach out with warped limbs.',
        strainGain: 16,
        canFlee: true,
        choices: [
          {
            labelVi: 'Dùng gậy khống chế W Corp tách rời và dồn bầy thịt vào các ghế số',
            labelEn: 'Use W Corp suppression staves to peel and herd flesh amalgams onto seats',
            checkTrait: 'nerve',
            resultVi: 'Bạn làm việc kiên trì giữa những tiếng gào van xin. Bầy thịt được ghim chặt vào ghế trước khi cỗ máy thời gian khởi động.',
            resultEn: 'You worked methodically through agonizing pleas, pinning screaming amalgams to their assigned seats.',
            fx: { health: -6, sanity: -4, merit: 8, rep: 4 },
            lootAhn: 22,
            strainDelta: +6
          },
          {
            labelVi: 'Tìm chiếc vali chứa tài liệu mật của một nhà nghiên cứu Wing bị kẹt lại',
            labelEn: 'Search for a stranded Wing researcher’s encrypted briefcase',
            checkTrait: 'luck',
            resultVi: 'Bạn đào bới lớp thịt nhão và giật lấy chiếc cặp số nguyên tem. Bên trong là các chứng từ đắt giá cùng bộ ổn định xung nhịp.',
            resultEn: 'You dug through warm sinew and tore free the sealed case. Inside lay classified financial bonds and a pulse stabilizer.',
            fx: { health: -9, sanity: -6, wealth: 35, merit: 6, resonance: 6 },
            lootAhn: 15,
            strainDelta: +10
          },
          {
            labelVi: 'Lùi lại buồng đệm, kích hoạt báo động rút lui sớm',
            labelEn: 'Fall back into the airlock and sound an early extraction siren',
            isFlee: true,
            resultVi: 'Bạn thoát ra cửa ga an toàn trước khi lũ quái vật ùa tới. W Corp trả nửa tiền công cho sự cẩn trọng.',
            resultEn: 'You evacuated safely before the horrors swarmed. W Corp wired half-pay for your discretion.',
            fx: { wealth: 18, sanity: 6 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Toa Hạng Nhất: Quái Thai Hợp Thể',
        nameEn: 'First-Class Chamber: Apex Amalgam',
        descVi: 'Toa hạng nhất đã biến thành một pháo đài thịt khổng lồ. Vị tài phiệt Feather cùng đoàn vệ sĩ đã hợp thành một sinh vật nhiều đầu mang vũ khí Workshop sắc lẹm, đôi mắt đỏ rực cơn cuồng nộ vô tận sau hàng thiên niên kỷ.',
        descEn: 'The first-class car has coalesced into a colossal flesh bastion. A wealthy Feather and his retinue have fused into a multi-headed juggernaut brandishing jagged Workshop steel, eyes burning with millennia of endless fury.',
        strainGain: 18,
        canFlee: true,
        choices: [
          {
            labelVi: 'Vận toàn bộ nội lực chém đứt khớp nối trung tâm của quái thai',
            labelEn: 'Channel all combat prowess to sever the central nervous node',
            checkTrait: 'vigor',
            resultVi: 'Lưỡi đao của bạn xé toạc lõi thần kinh. Con quái vật đổ sụp trong tiếng gầm rú chấn động cả toa tàu, rơi ra những trang sức vàng từ vùng Nest.',
            resultEn: 'Your blade ripped through the nervous apex. The titan collapsed, its dying roar rattling the carriage frame and spilling Nest gold.',
            fx: { health: -11, sanity: -5, rep: 14, merit: 12, resonance: 10 },
            lootAhn: 34,
            strainDelta: +6
          },
          {
            labelVi: 'Giữ khoảng cách, dùng bẫy buồng chân không nghiền nát sinh vật',
            labelEn: 'Maintain distance and crush the abomination with decompression bulkheads',
            resultVi: 'Vách ngăn kim loại sập xuống nghiền nát con quái vật. Bạn giữ an toàn tính mạng với tổn thất tối thiểu.',
            resultEn: 'Hydraulic bulkheads sheared the monster in two. You kept your skin intact with minimal attrition.',
            fx: { health: -4, sanity: -6, merit: 9, rep: 6 },
            lootAhn: 20,
            strainDelta: +2
          },
          {
            labelVi: 'Bỏ lại khoang hạng nhất, chạy nhanh về phía cửa thoát hiểm',
            labelEn: 'Abandon the luxury cabin and dash toward the exit bulkhead',
            isFlee: true,
            resultVi: 'Bạn đóng sập cánh cửa sắt sau lưng, bỏ lại khoang hạng nhất cho đội thanh trừng hạng nặng.',
            resultEn: 'You slammed the steel door shut behind you, leaving first-class to the heavy purge units.',
            fx: { rep: -2, sanity: 4 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Đếm Ngược 10 Giây Khôi Phục',
        nameEn: 'The Ten-Second Temporal Reset',
        descVi: 'Tiếng chuông báo hiệu vang dội: hệ thống Singularity khôi phục nguyên trạng chuẩn bị kích hoạt! Đồng hồ T Corp điểm đúng 10 giây — hàng nghìn năm điên loạn trong toa tàu sắp bị xóa sạch về con số không.',
        descEn: 'The station chime rings deafeningly: the state-restoration Singularity is priming! The T Corp chronometer hits 10.0 seconds — millennia of madness are about to snap back to zero.',
        strainGain: 8,
        choices: [
          {
            labelVi: 'Uống viên thuốc xóa nhớ của W Corp, nhận 70 Ahn tiền công và bước ra ga',
            labelEn: 'Take W Corp amnestics, collect the 70 Ahn hazard bounty, and step onto the platform',
            resultVi: 'Cơn ác mộng 2.000 năm tan biến như bọt nước. Cơ thể bạn quay về đúng số tuổi ban đầu. Bạn bước ra sân ga rạng rỡ với túi tiền trĩu nặng.',
            resultEn: 'The 2,000-year nightmare dissolved like sea foam. Your body snapped back to your exact starting age. You stepped onto the sunlit platform with heavy pockets.',
            fx: { wealth: 70, sanity: 20, health: 12, rep: 12, merit: 15 },
            recordAdd: 'warp_cleaner_survivor'
          },
          {
            labelVi: 'Từ chối thuốc xóa nhớ, khắc ghi 2.000 năm kiếm thuật dị chiều và giấu mẫu mô Singularity',
            labelEn: 'Refuse amnestics, retain millennia of dimensional combat memory, and smuggle Singularity tissue',
            resultVi: 'Bạn giữ trọn ký ức hàng thiên niên kỷ chiến đấu trong dị chiều và bán mẫu mô cho Seven Association lấy khoản tiền khổng lồ. Tâm thức bạn bước gần hơn tới ngưỡng thức tỉnh E.G.O!',
            resultEn: 'You retained the muscle memory of millennia in the rift and sold the bio-sample to Seven Association for a king’s ransom, surging toward E.G.O!',
            fx: { wealth: 95, sanity: -6, resonance: 24, rep: 18, heat: 18, taboo: 1, merit: 22 },
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
  },

  dungeon_great_lake: {
    id: 'dungeon_great_lake',
    theme: 'greatlake',
    titleVi: 'Đại Hồ District 21: Hải Trình Săn Cá Voi Trắng',
    titleEn: 'The Great Lake: Pallid Whale Abyss',
    hazard: 'ALEPH',
    kickerVi: 'Vùng Biển Dị Thường U Corp · Sóng Đen & Ký Sinh Trắng',
    kickerEn: 'U Corp Calamity Waters · Black Waves & Pallid Membrane',
    accentColor: '#06b6d4',
    stages: [
      {
        stageIndex: 0,
        nameVi: 'Vùng Sương Mù & Luật Lệ Đại Hồ',
        nameEn: 'Fog-Choked Boundary & The Lake’s Laws',
        descVi: 'Con tàu bọc thép rẽ qua ranh giới hai vùng nước của Đại Hồ District 21. Chuông báo Luật Đại Hồ rung lên dồn dập: sương mù trắng đục đang ập tới cùng tiếng hát nghêu ngao của những kẻ đã hóa thành Người Cá (Mermaids).',
        descEn: 'The reinforced hull crosses the boundary between two Great Lake sectors in District 21. The Lake Law bells clamour: chalk-white fog rolls in alongside the dissonant chorus of sailors already turned into Mermaids.',
        strainGain: 14,
        choices: [
          {
            labelVi: 'Kích hoạt Thoa Âm (Tuning Fork) của U Corp để hòa nhập tần số sóng và giữ vững mạn tàu',
            labelEn: 'Strike U Corp Tuning Forks to harmonize hull resonance against the waves',
            checkTrait: 'nerve',
            resultVi: 'Âm thanh ngân vang từ mũi tàu đẩy lùi màn sương trắng. Thủy thủ đoàn giữ vững đội hình trước đợt sóng đầu tiên.',
            resultEn: 'Resonant vibrations from the bow repelled the pallid mist. The crew held formation against the opening swell.',
            fx: { sanity: 8, health: 4, rep: 5, merit: 5 },
            lootAhn: 15,
            strainDelta: -6
          },
          {
            labelVi: 'Dùng Ống Tiêm K Corp gia cố thể lực trước khi bước ra boong tàu nghênh chiến',
            labelEn: 'Inject a K Corp Ampoule before taking the deck in full storm gear',
            reqItem: 'con_kcorp_ampoule',
            consumeItem: true,
            resultVi: 'Huyết thanh lục bảo giúp cơ thể bạn miễn nhiễm với cái lạnh cắt da của biển sâu và sẵn sàng đón đầu thủy quái.',
            resultEn: 'Emerald serum fortified your body against the abyssal chill, priming you for the leviathan clash.',
            fx: { health: 25, sanity: 20, rep: 6 },
            lootAhn: 15,
            strainDelta: -18
          },
          {
            labelVi: 'Ra lệnh tăng hết tốc lực động cơ đâm xuyên qua vành đai sương mù',
            labelEn: 'Order full ahead, ramming straight through the fog barrier',
            resultVi: 'Mũi tàu bọc thép cày nát những tảng băng sáp trắng, thu hồi được một thùng hàng trôi dạt của thương thuyền bị đắm.',
            resultEn: 'The armored prow smashed through waxy floes, salvaging a floating cargo pod from a sunken merchantman.',
            fx: { health: -5, wealth: 20, rep: 6, merit: 6 },
            lootAhn: 20,
            strainDelta: +6
          }
        ]
      },
      {
        stageIndex: 1,
        nameVi: 'Boong Tàu Đẫm Sáp: Đàn Người Cá Pallid',
        nameEn: 'Wax-Slicked Deck: Swarm of Pallid Mermaids',
        descVi: 'Hàng chục Người Cá phủ màng sáp trắng toát phóng vọt từ dưới mặt nước đen lên boong tàu! Chúng từng là những Fixer và thủy thủ lành nghề, nay cầm mái chèo gãy và móc sắt lao vào cắn xé người sống.',
        descEn: 'Dozens of Mermaids encased in chalk-white membrane vault from the black water onto the deck! Once seasoned Fixers and sailors, they now wield broken oars and iron hooks to drag the living below.',
        strainGain: 16,
        canFlee: true,
        choices: [
          {
            labelVi: 'Dùng lao móc nhiệt lượng chém gãy đội hình Người Cá và đốt sạch dịch trắng trên sàn',
            labelEn: 'Wield thermal harpoons to shatter the Mermaid vanguard and cauterize the white slime',
            checkTrait: 'vigor',
            resultVi: 'Ngọn lửa nhiệt lượng ngăn không cho màng trắng kịp bám vào da thịt. Bạn thu được những mảnh tinh thể cộng hưởng từ xác lũ quái vật.',
            resultEn: 'Thermal fire seared the pallid slime before it could take root. You harvested resonant crystals from the fallen swarm.',
            fx: { health: -7, sanity: -3, rep: 10, merit: 9 },
            lootAhn: 26,
            strainDelta: +4
          },
          {
            labelVi: 'Lập rào chắn bằng lưới thép U Corp, bắn tỉa từ đài chỉ huy để bảo toàn sinh lực',
            labelEn: 'Erect U Corp steel netting and snipe from the bridge to conserve vitality',
            resultVi: 'Lưới thép giữ chân bầy Người Cá, giúp bạn tiêu diệt chúng an toàn dù tốn thêm thời gian.',
            resultEn: 'Reinforced netting held the Mermaids at bay, letting you clear the deck safely with minimal wounds.',
            fx: { health: -3, sanity: -4, merit: 7, network: 5 },
            lootAhn: 18,
            strainDelta: +2
          },
          {
            labelVi: 'Phóng xuồng cứu sinh bọc thép quay về cảng U Corp ngay lập tức',
            labelEn: 'Launch the armored lifeboat and return to U Corp port immediately',
            isFlee: true,
            resultVi: 'Bạn rút lui về bến cảng an toàn cùng số mẫu vật thu thập được ở vùng rìa Đại Hồ.',
            resultEn: 'You retreated safely to port with the specimens gathered along the Lake perimeter.',
            fx: { wealth: 20, sanity: 6 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Họng Thẳm Cá Voi Trắng (The Pallid Maw)',
        nameEn: 'The Abyssal Maw of the Pallid Whale',
        descVi: 'Mặt biển dựng đứng như bức tường thành! Con Cá Voi Trắng (Pallid Whale) khổng lồ bằng cả một khu phố trồi lên, há chiếc miệng sâu hun hút tạo thành xoáy nước tử thần hút toàn bộ tàu bè vào trong vòm họng.',
        descEn: 'The sea rises like a fortress wall! The colossal Pallid Whale, vast as a city ward, breaches the surface — its yawning maw spinning a maelstrom that drags ships into its gullet.',
        strainGain: 18,
        canFlee: true,
        choices: [
          {
            labelVi: 'Buộc chặt dây cáp vào người, nạp đại pháo Lao Móc Singularity bắn thẳng vào con ngươi Cá Voi',
            labelEn: 'Lash yourself to the Singularity Harpoon cannon and fire straight into the Whale’s eye',
            checkTrait: 'vigor',
            resultVi: 'Mũi lao khổng lồ mang lõi nổ xuyên thủng con ngươi trắng dã! Tiếng rống của Pallid Whale làm vỡ tan mây mù trên bầu trời Đại Hồ.',
            resultEn: 'The explosive Singularity harpoon pierced the colossal white eye! The Whale’s bellow shattered the storm clouds above the Great Lake.',
            fx: { health: -10, sanity: -4, rep: 16, merit: 14, resonance: 12 },
            lootAhn: 36,
            strainDelta: +6
          },
          {
            labelVi: 'Thả thủy lôi âm thanh vào vòm họng nó rồi bẻ lái cắt ngang dòng xoáy',
            labelEn: 'Drop acoustic depth charges into its gullet and veer hard across the vortex',
            checkTrait: 'luck',
            resultVi: 'Vụ nổ chấn động từ bên trong buộc con quái vật phải nhả luồng nước xoáy, phun ra hàng loạt kho báu từ những con tàu cổ.',
            resultEn: 'The internal detonation forced the leviathan to convulse, disgorging ancient shipwreck treasures across the waves.',
            fx: { health: -5, sanity: -5, rep: 10, merit: 10 },
            lootAhn: 30,
            strainDelta: +3
          },
          {
            labelVi: 'Chặt đứt cáp neo, lợi dụng sóng dội để thoát khỏi vùng xoáy',
            labelEn: 'Sever the anchor cables and ride the shockwave out of the maelstrom',
            isFlee: true,
            resultVi: 'Con tàu lướt qua rìa xoáy nước trong gang tấc và rút lui về vùng biển an toàn.',
            resultEn: 'The vessel skimmed the edge of the whirlpool by inches, escaping to calm waters.',
            fx: { sanity: 4, rep: 2 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Trái Tim Hóa Thạch & Long Diên Hương Hoàng Kim',
        nameEn: 'The Calcified Heart & Golden Ambergris',
        descVi: 'Con Cá Voi Trắng chìm dần xuống vực thẳm, để lại trên mặt biển lặng sóng khối Long Diên Hương Hoàng Kim (Golden Ambergris) và tinh chất cộng hưởng nguyên thủy của Đại Hồ.',
        descEn: 'As the Pallid Whale sinks into the trench, the calmed waters reveal a floating mass of Golden Ambergris and primordial tuning essence of the Great Lake.',
        strainGain: 6,
        choices: [
          {
            labelVi: 'Thu hoạch toàn bộ Long Diên Hương và mỡ cá voi giao cho U Corp đổi lấy đại gia tài',
            labelEn: 'Harvest the Golden Ambergris and blubber for U Corp’s supreme bounty',
            resultVi: 'Cả bến cảng District 21 đổ ra reoò đón đoàn tàu chiến thắng. U Corp trao cho bạn phần thưởng khổng lồ và danh hiệu Thợ Săn Đại Hồ huyền thoại!',
            resultEn: 'All of District 21’s docks cheered your triumphant return. U Corp awarded a massive fortune and hailed you as a legendary Great Lake Hunter!',
            fx: { wealth: 85, rep: 24, sanity: 18, health: 12, merit: 20 },
            recordAdd: 'lake_whale_slayer'
          },
          {
            labelVi: 'Chạm tay vào lõi cộng hưởng của Đại Hồ, khắc ghi bản lĩnh vượt qua Cơn Ác Mộng Trắng',
            labelEn: 'Commune with the abyssal resonance core, forging an unbreakable soul against the Pallid nightmare',
            resultVi: 'Sóng âm từ trái tim biển cả gột rửa mọi nỗi sợ hãi trong bạn. Tâm trí và cơ thể bạn cộng hưởng mạnh mẽ với Ánh Sáng!',
            resultEn: 'Harmonic waves from the ocean’s heart scoured away all terror. Your mind and body resonated fiercely with the Light!',
            fx: { wealth: 50, sanity: 30, health: 20, resonance: 28, rep: 18, merit: 18 },
            scarAdd: 'Vết trắng trên vai',
            recordAdd: 'lake_whale_slayer'
          }
        ]
      }
    ]
  }
};

/**
 * Evaluates character adaptation & mastery bonuses for a given dungeon
 */
export function getDungeonMastery(def, char) {
  if (!def || !char) return { hasMastery: false, dmgMult: 1.0, checkBonus: 0, labelVi: '', labelEn: '' };
  const flags = char.flags || [];
  const hasGear = Boolean(char.craftWeapon || (char.inventory && char.inventory.length > 0) || flags.includes('EGOAwakened') || flags.includes('ColorFixer'));
  let dmgMult = hasGear ? 0.85 : 1.0;
  let checkBonus = hasGear ? 0.1 : 0;
  const reasonsVi = [];
  const reasonsEn = [];

  if (hasGear) {
    reasonsVi.push('Vũ khí/Trang bị');
    reasonsEn.push('Equipped Gear');
  }

  if (def.theme === 'warp' && (flags.includes('GoreDesensitized') || flags.includes('WarpCleanupCrew') || char.regionId === 'W')) {
    dmgMult *= 0.75;
    checkBonus += 0.15;
    reasonsVi.push('Kinh nghiệm Tàu WARP');
    reasonsEn.push('WARP Veteran');
  } else if (def.theme === 'greatlake' && (flags.includes('GreatLakeHardened') || flags.includes('LakeMariner') || char.regionId === 'U')) {
    dmgMult *= 0.75;
    checkBonus += 0.15;
    reasonsVi.push('Ý chí Đại Hồ U Corp');
    reasonsEn.push('Great Lake Mariner');
  } else if (def.theme === 'lobotomy' && (flags.includes('DieciScholastic') || char.job === 'Wing Employee' || char.regionId === 'L')) {
    dmgMult *= 0.8;
    checkBonus += 0.14;
    reasonsVi.push('Am hiểu cơ sở Wing');
    reasonsEn.push('Facility Expertise');
  } else if (def.theme === 'bloodfiend' && (flags.includes('Bloodfiend') || flags.includes('BloodfiendSlayer') || flags.includes('SmokeWarInstinct'))) {
    dmgMult *= 0.78;
    checkBonus += 0.14;
    reasonsVi.push('Kháng Huyết Tộc');
    reasonsEn.push('Bloodfiend Resistance');
  } else if (def.theme === 'outskirts' && (flags.includes('OutskirtsAdaptability') || flags.includes('WorkshopTinkerer') || char.regionId === 'OUTSKIRTS')) {
    dmgMult *= 0.75;
    checkBonus += 0.15;
    reasonsVi.push('Thích nghi Outskirts');
    reasonsEn.push('Outskirts Adaptation');
  }

  return {
    hasMastery: reasonsVi.length > 0,
    dmgMult,
    checkBonus,
    labelVi: reasonsVi.join(' · '),
    labelEn: reasonsEn.join(' · ')
  };
}

/**
 * Evaluates displayed success odds & expected stat shifts for a dungeon choice
 */
export function evaluateDungeonChoiceOdds(choice, char, session) {
  if (!choice || !char) return null;
  const def = session ? DUNGEON_DEFINITIONS[session.id] : null;
  const mastery = getDungeonMastery(def, char);
  const stance = session?.stance || 'balanced';
  const scanned = Boolean(session?.stageScanned);

  let successPct = 100;
  if (choice.checkTrait) {
    const traits = traitsOf(char);
    const traitVal = traits[choice.checkTrait] ?? 1.0;
    const compSupport = evaluateCompanionSupport(char);
    let chance = 0.76 * traitVal + mastery.checkBonus + (compSupport.dungeonOddsMod || 0) / 100;
    if (stance === 'guarded') chance += 0.12;
    if (stance === 'reckless' && choice.checkTrait === 'vigor') chance += 0.10;
    if (scanned) chance += 0.25;
    if ((char.stats?.sanity ?? 50) >= 70) chance += 0.05;
    successPct = clamp(Math.round(chance * 100), 30, 98);
  }

  const stanceDmgMult = stance === 'guarded' ? 0.65 : stance === 'reckless' ? 1.2 : 1.0;
  const scanDmgMult = scanned ? 0.5 : 1.0;
  const resolveMult = session?.resolveAwakened ? 0.75 : 1.0;
  const totalDmgMult = mastery.dmgMult * stanceDmgMult * scanDmgMult * resolveMult;

  const stanceLootMult = stance === 'guarded' ? 0.85 : stance === 'reckless' ? 1.45 : 1.0;
  const fx = choice.fx || {};
  const estHp = fx.health < 0 ? Math.min(-1, Math.ceil(fx.health * totalDmgMult)) : (fx.health || 0);
  const estSp = fx.sanity < 0 ? Math.min(-1, Math.ceil(fx.sanity * totalDmgMult)) : (fx.sanity || 0);
  const estLoot = choice.lootAhn ? Math.round(choice.lootAhn * stanceLootMult) + (scanned ? 10 : 0) : 0;

  return {
    hasCheck: Boolean(choice.checkTrait),
    trait: choice.checkTrait || null,
    successPct,
    estHp,
    estSp,
    estWealth: fx.wealth || 0,
    estLoot,
    estRep: fx.rep || 0,
    estMerit: fx.merit ? (stance === 'reckless' ? Math.round(fx.merit * 1.3) : fx.merit) : 0,
    estResonance: (fx.resonance || 0) + (stance === 'reckless' && !choice.isFlee ? 4 : 0)
  };
}

/**
 * Creates a new active dungeon session
 */
export function createDungeonSession(dungeonId, char, rng = Math.random) {
  const def = DUNGEON_DEFINITIONS[dungeonId];
  if (!def) return null;

  const bonusSupply = ['Fixer', 'Wing Employee', 'Workshop Craftsman'].includes(char?.job) ||
    (char?.flags || []).some((f) => ['OutskirtsAdaptability', 'GreatLakeHardened', 'GoreDesensitized', 'EGOAwakened'].includes(f));
  const maxSupplies = bonusSupply ? 3 : 2;

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
    stance: 'balanced',
    supplyCharges: maxSupplies,
    maxSupplies,
    stageScanned: false,
    resolveAwakened: false,
    lastStageResult: null,
    logs: []
  };
}

/**
 * Switches tactical stance inside an active dungeon ('guarded' | 'balanced' | 'reckless')
 */
export function setDungeonStance(charState, stance) {
  if (!charState?.pendingDungeon) return charState;
  const valid = ['guarded', 'balanced', 'reckless'].includes(stance) ? stance : 'balanced';
  return {
    ...charState,
    pendingDungeon: {
      ...charState.pendingDungeon,
      stance: valid
    }
  };
}

/**
 * Expends 1 tactical supply charge inside a dungeon ('breather' | 'scan')
 */
export function useDungeonSupply(charState, supplyType = 'breather') {
  if (!charState?.pendingDungeon) return charState;
  const session = { ...charState.pendingDungeon, logs: [...(charState.pendingDungeon.logs || [])] };
  if ((session.supplyCharges || 0) <= 0) return charState;
  if (supplyType === 'scan' && session.stageScanned) return charState;

  const char = { ...charState, stats: { ...charState.stats }, logs: [...(charState.logs || [])] };
  session.supplyCharges -= 1;

  if (supplyType === 'scan') {
    session.stageScanned = true;
    session.lastStageResult = {
      type: 'scan',
      vi: '🔍 [Thẩm Định Dị Thể] Bạn phân tích quy luật vận hành của chặng này: +25% tỷ lệ kiểm định, giảm 50% sát thương nhận vào và phát hiện +10 Ahn chiến lợi phẩm ẩn!',
      en: '🔍 [Tactical Tuning] You analyzed this sector’s anomaly pattern: +25% check odds, -50% incoming damage, and +10 bonus Ahn uncovered!'
    };
  } else {
    char.stats.health = clamp((char.stats.health || 0) + 16, 0, 100);
    char.stats.sanity = clamp((char.stats.sanity || 0) + 14, 0, 100);
    session.sanityStrain = clamp((session.sanityStrain || 0) - 20, 0, 100);
    session.lastStageResult = {
      type: 'breather',
      vi: '💉 [Tiếp Tế Thực Địa] Bạn dùng thuốc kích thích sinh học và điều hòa nhịp thở: +16 HP, +14 SP, -20% Áp lực Tâm thần!',
      en: '💉 [Field Stims] You administered bio-stimulants and steadied your breathing: +16 HP, +14 SP, -20% Sanity Strain!'
    };
  }

  char.pendingDungeon = session;
  return char;
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

  // Calculate traits & tactical modifiers
  const traits = traitsOf(char);
  const mastery = getDungeonMastery(def, char);
  const stance = session.stance || 'balanced';
  const scanned = Boolean(session.stageScanned);

  // Check trait bonus if applicable
  let success = true;
  if (choice.checkTrait) {
    const traitVal = traits[choice.checkTrait] ?? 1.0;
    let chance = 0.76 * traitVal + mastery.checkBonus;
    if (stance === 'guarded') chance += 0.12;
    if (stance === 'reckless' && choice.checkTrait === 'vigor') chance += 0.10;
    if (scanned) chance += 0.25;
    const roll = rng();
    success = roll < clamp(chance, 0.35, 0.98);
  }

  // Consume item if needed
  if (choice.consumeItem && choice.reqItem) {
    char.inventory = (char.inventory || []).filter(it => (it.id || it) !== choice.reqItem);
  }

  // Cost Ahn
  if (choice.costAhn) {
    char.stats.wealth = Math.max(0, (char.stats.wealth || 0) - choice.costAhn);
  }

  // Apply FX with Stance, Mastery, Scan & Check scaling
  const fx = choice.fx || {};
  let hpDelta = fx.health || 0;
  let spDelta = fx.sanity || 0;

  // Preserve exact lethal damage when already at critical 1-3 HP without scan/guarded so fatal tests remain deterministic
  const isBareMortalTest = (char.stats.health || 0) <= 3 && stance === 'balanced' && !scanned && !mastery.hasMastery;
  if (!isBareMortalTest) {
    const stanceDmgMult = stance === 'guarded' ? 0.65 : stance === 'reckless' ? 1.2 : 1.0;
    const scanDmgMult = scanned ? 0.5 : 1.0;
    const resolveMult = session.resolveAwakened ? 0.75 : 1.0;
    const totalDmgMult = mastery.dmgMult * stanceDmgMult * scanDmgMult * resolveMult;

    if (hpDelta < 0) hpDelta = Math.min(-1, Math.ceil(hpDelta * totalDmgMult));
    if (spDelta < 0) spDelta = Math.min(-1, Math.ceil(spDelta * totalDmgMult));
  }

  // Scale down damage if trait check succeeded, or increase slightly if failed
  if (choice.checkTrait) {
    if (success) {
      if (hpDelta < 0) hpDelta = Math.ceil(hpDelta * 0.65);
      if (spDelta < 0) spDelta = Math.ceil(spDelta * 0.65);
    } else {
      if (hpDelta < 0) hpDelta = Math.floor(hpDelta * 1.2);
      if (spDelta < 0) spDelta = Math.floor(spDelta * 1.2);
    }
  }

  const stanceLootMult = stance === 'guarded' ? 0.85 : stance === 'reckless' ? 1.45 : 1.0;
  const meritGain = fx.merit ? (stance === 'reckless' ? Math.round(fx.merit * 1.3) : fx.merit) : 0;
  const resGain = (fx.resonance || 0) + (stance === 'reckless' && !choice.isFlee ? 4 : 0);

  char.stats.health = clamp((char.stats.health || 0) + hpDelta, 0, 100);
  char.stats.sanity = clamp((char.stats.sanity || 0) + spDelta, 0, 100);
  if (fx.wealth) char.stats.wealth = clamp((char.stats.wealth || 0) + fx.wealth, 0, 100);
  if (fx.rep) char.stats.rep = clamp((char.stats.rep || 0) + fx.rep, 0, 100);
  if (fx.network) char.stats.network = clamp((char.stats.network || 0) + fx.network, 0, 100);
  if (resGain) char.resonance = clamp((char.resonance || 0) + resGain, 0, 100);
  if (meritGain) char.merit = Math.max(0, (char.merit || 0) + meritGain);
  if (fx.heat) char.heat = Math.max(0, (char.heat || 0) + fx.heat);
  if (fx.taboo) char.taboo = Math.max(0, (char.taboo || 0) + fx.taboo);

  // Accumulate loot
  const stageLoot = (choice.lootAhn ? Math.round(choice.lootAhn * stanceLootMult) : 0) + (scanned && !choice.isFlee ? 10 : 0);
  if (stageLoot > 0) {
    session.accumulatedLootAhn = (session.accumulatedLootAhn || 0) + stageLoot;
  }
  if (meritGain > 0) {
    session.accumulatedMerit = (session.accumulatedMerit || 0) + meritGain;
  }

  // Update Sanity Strain & Resolve Check
  const baseStrain = stage.strainGain || 15;
  const deltaStrain = choice.strainDelta || 0;
  const rawStrainGain = Math.round((baseStrain + deltaStrain) * (stance === 'guarded' ? 0.65 : stance === 'reckless' ? 1.15 : 1.0) * (scanned ? 0.5 : 1.0));
  session.sanityStrain = clamp((session.sanityStrain || 0) + rawStrainGain, 0, 100);

  let resolveNoteVi = '';
  let resolveNoteEn = '';
  if (session.sanityStrain >= 80 && !session.resolveAwakened && char.stats.health > 0) {
    const resolveSuccess = char.stats.sanity >= 35 || (char.flags || []).includes('EGOAwakened') || rng() < 0.65;
    if (resolveSuccess) {
      session.resolveAwakened = true;
      session.sanityStrain = Math.max(20, session.sanityStrain - 35);
      char.stats.sanity = clamp((char.stats.sanity || 0) + 12, 0, 100);
      char.resonance = clamp((char.resonance || 0) + 10, 0, 100);
      resolveNoteVi = ' ⚡ [Ý Chí Bất Khuất] Giữa áp lực cùng cực, tâm thức bạn bừng tỉnh (+12 SP, +10% Resonance, -35% Strain, giảm 25% sát thương tiếp theo)!';
      resolveNoteEn = ' ⚡ [Heroic Resolve] Amidst crushing pressure, your resolve awakened (+12 SP, +10% Resonance, -35% Strain, -25% future damage)!';
    } else {
      session.sanityStrain = Math.max(45, session.sanityStrain - 25);
      char.stats.sanity = clamp((char.stats.sanity || 0) - 6, 0, 100);
      resolveNoteVi = ' ⚠️ [Chấn Động Tâm Thần] Áp lực dị giới làm tim bạn đập loạn nhịp (-6 SP, hạ Strain về mức kiểm soát).';
      resolveNoteEn = ' ⚠️ [Mental Tremor] Anomalous pressure shook your nerves (-6 SP, Strain vented to manageable levels).';
    }
  }

  session.stageScanned = false;
  session.lastStageResult = {
    type: choice.checkTrait ? (success ? 'check_ok' : 'check_fail') : 'stage_clear',
    stageNum: session.currentStageIndex + 1,
    stageNameVi: stage.nameVi,
    stageNameEn: stage.nameEn,
    vi: `${choice.resultVi}${resolveNoteVi}`,
    en: `${choice.resultEn}${resolveNoteEn}`,
    hpDelta,
    spDelta,
    lootGain: stageLoot + (fx.wealth > 0 ? fx.wealth : 0)
  };

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
    // Award accumulated loot + full conquest triumph bonus
    const conquestBonusAhn = !isFlee && isLastStage ? 15 : 0;
    const totalLoot = (session.accumulatedLootAhn || 0) + conquestBonusAhn;
    if (totalLoot > 0) {
      char.stats.wealth = clamp((char.stats.wealth || 0) + totalLoot, 0, 100);
    }
    if (!isFlee && isLastStage) {
      char.stats.health = clamp((char.stats.health || 0) + 10, 0, 100);
      char.stats.sanity = clamp((char.stats.sanity || 0) + 12, 0, 100);
      char.merit = (char.merit || 0) + 8;
      session.accumulatedMerit = (session.accumulatedMerit || 0) + 8;
    }
    const totalHaulDisplay = totalLoot + (fx.wealth > 0 ? fx.wealth : 0);
    char.pendingDungeon = null;

    const resolution = {
      titleVi: isFlee ? `Rút Lui Khỏi ${def.titleVi}` : `Chinh Phục Hoàn Hảo: ${def.titleVi}`,
      titleEn: isFlee ? `Retreated from ${def.titleEn}` : `Dungeon Conquered: ${def.titleEn}`,
      resultVi: isFlee
        ? `${choice.resultVi}\n\nBạn rút lui an toàn khỏi ${stage.nameVi}. Tổng thù lao thu hoạch: +${totalHaulDisplay} Ahn, +${session.accumulatedMerit} Merit.`
        : `${choice.resultVi}\n\n🏆 Bạn đã chinh phục trọn vẹn cả 4 chặng của ${def.titleVi}! Hào khí chiến thắng giúp hồi phục thể trạng (+10 HP, +12 SP). Tổng chiến lợi phẩm: +${totalHaulDisplay} Ahn, +${session.accumulatedMerit} Merit.`,
      resultEn: isFlee
        ? `${choice.resultEn}\n\nYou successfully retreated from ${stage.nameEn}. Total haul: +${totalHaulDisplay} Ahn, +${session.accumulatedMerit} Merit.`
        : `${choice.resultEn}\n\n🏆 You conquered all 4 stages of ${def.titleEn}! The rush of triumph restored your vigor (+10 HP, +12 SP). Total haul: +${totalHaulDisplay} Ahn, +${session.accumulatedMerit} Merit.`,
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
