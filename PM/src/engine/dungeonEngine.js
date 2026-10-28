import { rememberResonance } from './awakeningProgress.js';
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
import { addScar, activeScarSynergies } from './scarModel.js';
import { dungeonWagerDamage, dungeonWagerLoot, dungeonWagerLevel } from './dungeonWager.js';
import { traitsOf } from './variance.js';
import { evaluateCompanionSupport, ensureNpcAgency, getNpcDungeonPerk } from '../data/npcPersonality.js';
import { FAIL_TEXT, GENERIC_FAIL, STRAIN_NOTES, BREAK_TEXT, SUPPLY_TEXT, ENDING_TEXT } from '../data/dungeonText.js';
import { NIGHT_DUNGEON, STAGE_VARIANTS, SIDE_ROOMS, SHORTCUTS, COMPANION_TEXT, COMPANION_LEAD, FINAL_KEEPS, REPORT_FIT, DUNGEON_EXTRACTION_REWARDS } from '../data/dungeonExtras.js';
import { ITEMS_CATALOG } from '../data/itemsData.js';
import { CLAW_DUNGEON, CLAW_DUNGEON_ID } from '../data/dungeonClaw.js';
import { ENSEMBLE_DUNGEON, ENSEMBLE_ROUTE_SCENES, ENSEMBLE_SCORE_ITEM } from '../data/dungeonEnsemble.js';
import { ENSEMBLE_DUNGEON_ID, ensembleRoute, ensembleWitness, recordEnsembleRetreat, finishEnsembleRun } from './ensemblePath.js';
import { triggerDistortionTransformation } from './careerPipeline.js';
import { npcIsActive } from './eventConditions.js';
import { ensureAffiliation, getAffiliation } from './affiliation.js';
import { applyNpcFate } from './director.js';
import { dealCards, cardEffectOf, nextHand, dungeonUsesCards } from './dungeonCards.js';
export { playDungeonCard, cardPlayable, cardBudgetLeft, DUNGEON_CARDS, CARD_BUDGET } from './dungeonCards.js';
import { initGauntlet, isGauntlet, gauntletStage, previewCombatAction, resolveGauntletChoice, canLeaveGauntlet } from './dungeonCombat.js';


export const DUNGEON_GIMMICKS = {
  warp: {
    id: 'warp_pressure',
    nameVi: 'Áp Suất Dị Chiều',
    nameEn: 'Dimensional Compression',
    descVi: 'Không gian bị nén ép: áp lực tâm thần tăng thêm khi trượt kiểm định, nhưng thế Thận trọng giảm 50% chấn động.',
    descEn: 'Warped spacetime: failure inflicts extra strain, but Guarded stance halves dimensional recoil.'
  },
  lobotomy: {
    id: 'qlippoth_meltdown',
    nameVi: 'Băng Hoại Qlippoth',
    nameEn: 'Qlippoth Meltdown',
    descVi: 'Mỗi chặng tăng 1 mức Meltdown (+2 áp lực). Dò đường (E) hoặc thẻ Dò xét giúp giải trừ cảnh báo.',
    descEn: 'Each stage elevates Meltdown (+2 strain). Reading stage (E) or Scout cards purges the alarm.'
  },
  greatlake: {
    id: 'lake_currents',
    nameVi: 'Hải Trình Đại Hồ',
    nameEn: 'Great Lake Current',
    descVi: 'Sương mù và sóng ngầm: kiểm định Thể lực tăng cơ hội thành công, nhưng kiểm định Thần kinh nhận thêm áp lực.',
    descEn: 'Fog and undercurrents: Vigor checks are empowered, but Nerve failures inflict extra strain.'
  },
  bloodfiend: {
    id: 'crimson_carnival',
    nameVi: 'Khát Vọng Huyết Hội',
    nameEn: 'Carnival Bloodthirst',
    descVi: 'Khát vọng máu thôi thúc: thành công kiểm định hồi +3 HP, thất bại mất thêm 3 HP.',
    descEn: 'Bloodlust surges: check successes restore +3 HP, while failures drain 3 extra HP.'
  },
  outskirts: {
    id: 'ancient_relic_decay',
    nameVi: 'Bụi Tàn Tích Cổ Đại',
    nameEn: 'Ancient Dust Decay',
    descVi: 'Bụi kim loại cổ đại bào mòn: nghỉ thở tốn thêm +2 Ahn, nhưng chiến lợi phẩm tăng thêm +20%.',
    descEn: 'Ancient dust wears down gear: breather costs +2 Ahn, but gathered haul is worth +20% more.'
  },
  night: {
    id: 'sweeper_hour',
    nameVi: 'Khung Giờ Quét Dọn',
    nameEn: 'The Sweeping Hour',
    descVi: '3:13 đến 4:34: Không gian Backstreets bị Sweeper phong tỏa; rút lui an toàn thưởng thêm danh tiếng.',
    descEn: '3:13 to 4:34: Streets locked by Sweepers; safe extraction earns bonus reputation.'
  }
};

export const DUNGEON_DEFINITIONS = {
  dungeon_warp_train: {
    id: 'dungeon_warp_train',
    fall: { vi: 'Đội dọn W Corp đến như mọi lần, với túi đựng và ống tiêm. Lần này họ không mở túi. Họ lau sàn toa, kiểm lại số ghế, và chuyến tàu đi tiếp mà không thiếu ai trong danh sách, vì tên bạn đã được gạch từ trước.', en: 'The W Corp cleaning crew arrives as always, with bags and syringes. This time they do not open the bags. They wipe the carriage floor, recount the seats, and the train goes on missing no one from the list, because your name was struck beforehand.', causeVi: 'Đội dọn W Corp không khôi phục được nữa', causeEn: 'Beyond what the W Corp cleaners could put back' },
    theme: 'warp',
    titleVi: 'Chuyến Tàu WARP: Toa Cuối Địa Ngục',
    titleEn: 'WARP Train: The Nether Carriages',
    hazard: 'WAW',
    // The doors lock once the train leaves, and W Corp's cleaners put back whoever does not survive, a limited number of times
    locked: true,
    recovery: 'w_corp',
    cards: true,
    kickerVi: 'Không Gian Dị Chiều W Corp · Cửa đã khóa',
    kickerEn: 'W Corp Dimensional Rift · Doors Locked',
    accentColor: '#38bdf8',
    stages: [
      {
        stageIndex: 0,
        nameVi: 'Khoang Niêm Phong Cửa',
        nameEn: 'Airlock Decontamination Car',
        descVi: "Khóa niêm phong rít lên khi áp suất tụt. Qua khe cửa rỉ ra mùi máu tanh và một tiếng gầm gừ không thành tiếng. Nhân viên W Corp đứng cạnh bạn kiểm tra bình dưỡng khí lần thứ ba, tay vẫn run. Cửa phía sau đóng lại và tự khóa. Chuyến tàu này không có ga nào để xuống, và ở cuối đoàn, đội dọn W Corp đã chờ sẵn với túi đựng và ống tiêm.",
        descEn: "The airtight lock shrieks as the pressure drops. Through the door gap seep the smell of blood and a growl that never becomes a sound. The W Corp cleaner beside you checks their rebreather for the third time, hands still shaking. The door behind you closes and locks itself. This train has no station to step off at, and at the rear of the consist the W Corp cleaning crew is already waiting with bags and syringes.",
        strainGain: 15,
        choices: [
          {
            labelVi: "Bơm khí khử trùng và hít thở đều trước khi vào",
            labelEn: "Flood the car with disinfectant and breathe evenly before going in",
            resultVi: "Làn khói khử khuẩn dìm bớt mùi tanh. Bạn bước qua ngưỡng cửa với cái đầu lạnh.",
            resultEn: "The antiseptic mist drowns part of the stench. You cross the threshold with a cold head.",
            fx: { sanity: 5, health: 0 },
            strainDelta: -5
          },
          {
            labelVi: "Dùng ống tiêm K Corp dự phòng để gia cố cơ bắp và thần kinh",
            labelEn: "Use a spare K Corp ampoule to reinforce muscle and nerves",
            reqItem: 'con_kcorp_ampoule',
            consumeItem: true,
            resultVi: "Dung dịch xanh ngọc chạy vào huyết quản, và mọi thứ trong tầm nhìn sắc hơn bình thường.",
            resultEn: "The emerald fluid runs into your veins, and everything in view sharpens past normal.",
            fx: { health: 25, sanity: 20 },
            strainDelta: -20
          },
          {
            labelVi: "Phá then cài và lao thẳng vào",
            labelEn: "Break the latch and charge straight in",
            resultVi: "Chênh áp quật vào ngực bạn, nhưng tốc độ cho bạn nhịp đầu tiên và một túi tiền ai đó đánh rơi.",
            resultEn: "The pressure difference slams your chest, but speed gives you the first beat and a purse someone dropped.",
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
        descVi: "Ghế ngồi trong toa đã bị những khối thịt người dính vào nhau nuốt mất. Hàng chục khuôn mặt vẫn còn tỉnh táo sau hai nghìn năm bị giam, đang khóc và đưa những cánh tay méo mó về phía bạn.",
        descEn: "The seats in the car have been swallowed by fused masses of human flesh. Dozens of faces, still conscious after two thousand years of confinement, weep and reach toward you with misshapen arms.",
        strainGain: 16,
        canFlee: true,
        choices: [
          {
            labelVi: "Dùng gậy khống chế của W Corp tách khối thịt ra và dồn từng khối vào ghế số",
            labelEn: "Use the W Corp suppression staves to peel the masses apart and herd each onto a numbered seat",
            checkTrait: 'nerve',
            resultVi: "Bạn làm việc đều tay giữa những lời van xin. Mỗi khối thịt được ghim vào đúng ghế trước khi cỗ máy thời gian khởi động.",
            resultEn: "You work steadily through the pleading. Each mass is pinned to its proper seat before the time machine starts.",
            fx: { health: -6, sanity: -4, merit: 8, rep: 4 },
            lootAhn: 22,
            strainDelta: +6
          },
          {
            labelVi: "Tìm chiếc cặp tài liệu của một nhà nghiên cứu Wing bị kẹt lại",
            labelEn: "Look for the briefcase of a stranded Wing researcher",
            checkTrait: 'luck',
            resultVi: "Bạn đào qua lớp thịt còn ấm và giật ra chiếc cặp đã niêm phong. Bên trong có chứng từ giá trị và một bộ ổn định xung nhịp.",
            resultEn: "You dig through warm flesh and tear out the sealed case. Inside are valuable bonds and a pulse stabilizer.",
            fx: { health: -9, sanity: -6, wealth: 35, merit: 6, resonance: 6 },
            lootAhn: 15,
            strainDelta: +10
          },
          {
            labelVi: "Lùi về khoang đệm và bấm chuông rút lui sớm",
            labelEn: "Fall back to the airlock and ring the early extraction alarm",
            isFlee: true,
            resultVi: "Bạn ra tới sân ga trước khi lũ thịt kịp tràn tới. W Corp trả nửa công vì bạn biết dừng.",
            resultEn: "You reach the platform before the flesh can surge after you. W Corp pays half for knowing when to stop.",
            fx: { wealth: 18, sanity: 6 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Toa Hạng Nhất: Quái Thai Hợp Thể',
        nameEn: 'First-Class Chamber: Apex Amalgam',
        descVi: "Toa hạng nhất đã thành một khối thịt dựng như pháo đài. Một tài phiệt Feather và đám vệ sĩ của ông ta dính vào nhau thành một sinh vật nhiều đầu, tay cầm vũ khí Workshop lởm chởm, mắt đỏ vì hàng nghìn năm giận dữ.",
        descEn: "The first-class car has become a fortress of flesh. A Feather magnate and his guards have fused into a many-headed creature holding jagged Workshop steel, eyes red from thousands of years of rage.",
        strainGain: 18,
        canFlee: true,
        choices: [
          {
            labelVi: "Dồn hết sức chém đứt khớp nối thần kinh ở giữa",
            labelEn: "Put everything into severing the nerve junction at its center",
            checkTrait: 'vigor',
            resultVi: "Lưỡi dao xé toạc lõi thần kinh. Sinh vật đổ xuống với một tiếng gầm làm rung cả toa, rơi ra mấy món trang sức vàng từ Nest.",
            resultEn: "The blade tears through the nerve core. The creature collapses with a roar that shakes the whole car, dropping a few gold pieces of Nest jewelry.",
            fx: { health: -11, sanity: -5, rep: 14, merit: 12, resonance: 10 },
            lootAhn: 34,
            strainDelta: +6
          },
          {
            labelVi: "Giữ khoảng cách và dùng vách chân không nghiền nát nó",
            labelEn: "Keep your distance and crush it with the decompression bulkheads",
            resultVi: "Các vách thép sập xuống và ép nó làm đôi. Bạn giữ nguyên mạng với tổn thất tối thiểu.",
            resultEn: "The steel bulkheads drop and shear it in two. You keep your skin whole with minimal loss.",
            fx: { health: -4, sanity: -6, merit: 9, rep: 6 },
            lootAhn: 20,
            strainDelta: +2
          },
          {
            labelVi: "Bỏ khoang hạng nhất và chạy về phía cửa thoát",
            labelEn: "Abandon the first-class car and run for the exit door",
            isFlee: true,
            resultVi: "Bạn đóng sầm cánh cửa sắt lại sau lưng, để khoang hạng nhất cho đội thanh trừng hạng nặng.",
            resultEn: "You slam the steel door behind you and leave first class to the heavy purge team.",
            fx: { rep: -2, sanity: 4 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Đếm Ngược 10 Giây Khôi Phục',
        nameEn: 'The Ten-Second Temporal Reset',
        descVi: "Chuông ga vang lên: hệ thống Singularity sắp khôi phục nguyên trạng. Đồng hồ T Corp chỉ đúng mười giây, và hàng nghìn năm điên loạn trong toa sắp bị xóa về không.",
        descEn: "The station chime rings: the Singularity restoration is about to fire. The T Corp clock reads exactly ten seconds, and thousands of years of madness in the car are about to be wiped to zero.",
        strainGain: 8,
        choices: [
          {
            labelVi: "Uống thuốc xóa nhớ của W Corp, nhận tiền công và bước ra ga",
            labelEn: "Take the W Corp amnestic, collect the pay and step onto the platform",
            resultVi: "Cơn ác mộng hai nghìn năm tan như bọt nước, và cơ thể bạn trở về đúng tuổi cũ. Bạn bước ra sân ga sáng rực với một túi tiền nặng.",
            resultEn: "The two-thousand-year nightmare dissolves like foam, and your body returns to its old age. You step onto the bright platform with a heavy purse.",
            fx: { wealth: 70, sanity: 20, health: 12, rep: 12, merit: 15 },
            recordAdd: 'warp_cleaner_survivor'
          },
          {
            labelVi: "Từ chối thuốc, giữ lại ký ức chiến đấu và giấu một mẫu mô Singularity",
            labelEn: "Refuse the amnestic, keep the memory of the fighting and smuggle out a tissue sample",
            resultVi: "Bạn giữ nguyên ký ức của cả thiên niên kỷ chiến đấu trong dị chiều, rồi bán mẫu mô cho Seven Association. Tâm trí bạn bước gần hơn tới ngưỡng E.G.O, và W Corp sẽ không quên chuyện này.",
            resultEn: "You keep the memory of millennia of fighting in the rift, then sell the tissue to Seven Association. Your mind edges closer to the E.G.O threshold, and W Corp will not forget this.",
            fx: { wealth: 95, sanity: -6, resonance: 24, rep: 18, heat: 18, taboo: 1, merit: 22 },
            scarAdd: 'Ký ức địa ngục tàu WARP',
            flagAdd: ['WCorpWhistleblower'],
            later: [{ id: 'csq_warp_survivor_debt', years: 3, reasonVi: 'Bạn đã mang một mẫu mô ra khỏi toa tàu WARP', reasonEn: 'You carried a tissue sample out of the WARP car' }],
            recordAdd: 'singularity_whistleblower'
          }
        ]
      }
    ]
  },

  dungeon_lobotomy_ruin: {
    id: 'dungeon_lobotomy_ruin',
    fall: { vi: "Còi Meltdown tắt khi bạn ngừng thở. Chi nhánh không còn nhân viên nào để ghi tên bạn vào danh sách thương vong, và thứ ở tầng dưới thêm bạn vào bộ sưu tập của nó, chậm rãi, đúng theo quy trình.", en: "The Meltdown siren falls silent when you stop breathing. The branch has no staff left to enter your name on a casualty list, and what lives on the lower floors adds you to its collection, slowly, by the book.", causeVi: "Mất tích trong chi nhánh L Corp đã sụp đổ", causeEn: "Lost in the collapsed L Corp branch" },
    cards: true,
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
        descVi: "Đoàn thám hiểm đu dây xuống một đường ống thông gió sâu hun hút. Ở đáy, đèn khẩn cấp chớp màu cam, và tiếng còi Meltdown vọng lên từ những tầng bên dưới.",
        descEn: "The expedition rappels down a deep ventilation shaft. At the bottom, emergency lamps pulse amber, and a Meltdown siren echoes up from the floors below.",
        strainGain: 15,
        choices: [
          {
            labelVi: "Giải mã sơ đồ chi nhánh từ một bảng điều khiển hỏng",
            labelEn: "Decode the branch floor plan from a broken terminal",
            resultVi: "Màn hình xanh hiện ra sơ đồ những phòng chứa Enkephalin an toàn nhất. Đoàn tránh được các hành lang khí độc.",
            resultEn: "The green screen shows the safest Enkephalin storage rooms. The team avoids the gas corridors.",
            fx: { sanity: 5, network: 3 },
            strainDelta: -5
          },
          {
            labelVi: "Dùng bộ lọc Workshop để hút sạch khói Enkephalin rò rỉ",
            labelEn: "Use a Workshop filter to scrub the leaking Enkephalin smoke",
            resultVi: "Bộ lọc rít lên và hút cạn màn sương thôi miên. Cả đội thở ra một hơi dài.",
            resultEn: "The filter whines and drains the hypnotic haze. The whole team lets out a long breath.",
            fx: { health: 5, sanity: 5, wealth: -4 },
            strainDelta: -10
          },
          {
            labelVi: "Bật đèn pha mạnh và dẫn đoàn đi thẳng hành lang chính",
            labelEn: "Switch on the high-beam torches and lead the team down the main corridor",
            resultVi: "Ánh đèn xua bóng tối, nhưng cũng đánh thức những thứ đang ngủ trong ống dẫn.",
            resultEn: "The beams drive back the dark, but they also wake what sleeps in the ducts.",
            fx: { health: -6, rep: 4 },
            strainDelta: +10
          }
        ]
      },
      {
        stageIndex: 1,
        nameVi: 'Bộ Phận Chiết Xuất Năng Lượng',
        nameEn: 'The Extraction & Refining Department',
        descVi: "Bể Enkephalin đã nứt toác, dịch xanh lục phát sáng tràn ngập sàn. Những chiếc kén Abnormality rỗng vỡ nằm lẫn giữa các xác nhân viên mặc áo blouse trắng.",
        descEn: "The Enkephalin tank has split open and glowing green fluid floods the floor. Empty, shattered Abnormality pods lie among the bodies of staff in white coats.",
        strainGain: 20,
        canFlee: true,
        choices: [
          {
            labelVi: "Thu những bình Enkephalin tinh chế còn nguyên trong đống đổ nát",
            labelEn: "Recover the intact refined Enkephalin canisters from the wreckage",
            resultVi: "Bạn tháo ba bình nhiên liệu cho vào thùng bảo quản. Chợ đen sẽ trả cao cho chúng.",
            resultEn: "You unscrew three fuel canisters and pack them in a storage case. The black market will pay well for them.",
            fx: { wealth: 35, merit: 6, health: -6 },
            lootAhn: 25,
            strainDelta: +5
          },
          {
            labelVi: "Lục xác các nhà nghiên cứu cấp cao để tìm thẻ khóa phòng trung tâm",
            labelEn: "Search the senior researchers’ bodies for a central-room keycard",
            resultVi: "Bạn tìm ra một thẻ từ mạ vàng và một cuộn băng ghi âm chứa dữ liệu nghiên cứu mật.",
            resultEn: "You find a gold-plated keycard and an audio tape of classified research logs.",
            fx: { network: 8, sanity: -8, rep: 6 },
            strainDelta: +10
          },
          {
            labelVi: "Mang số Enkephalin nhặt được rút lui qua đường thông gió",
            labelEn: "Take the salvaged Enkephalin and withdraw through the vent",
            isFlee: true,
            resultVi: "Bạn lên được mặt đất, giao nhiên liệu và nhận thù lao vừa đủ để thấy chuyến đi đáng giá.",
            resultEn: "You reach the surface, deliver the fuel and collect pay just large enough to make the trip feel worth it.",
            fx: { wealth: 25, sanity: 5 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Khu Giam Giữ Vỡ Kén: Dị Thường Thức Tỉnh',
        nameEn: 'Containment Sector: Awakening Abnormality',
        descVi: "Một cánh cửa thép cấp ALEPH bị xé ra từ bên trong. Giữa căn phòng đầy rễ kim loại và gai nhọn, một Abnormality đã thức dậy đang ngân khúc hát ru lệch tông, đủ làm tai bạn rỉ máu.",
        descEn: "An ALEPH-grade steel door has been torn open from the inside. In a room full of metal roots and thorns, an awakened Abnormality hums an off-key lullaby that makes your ears bleed.",
        strainGain: 25,
        canFlee: true,
        choices: [
          {
            labelVi: "Nâng vũ khí E.G.O và cùng cả đội đứng vững trước khúc hát",
            labelEn: "Raise your E.G.O weapon and hold your ground against the song with the team",
            checkTrait: 'nerve',
            resultVi: "Ý chí giữ bạn đứng yên đủ lâu để sóng âm vỡ tan. Sinh vật thu rễ lùi vào bóng tối, bỏ lại một mảnh giáp E.G.O còn nguyên.",
            resultEn: "Willpower holds you still long enough for the sound to break. The entity pulls its roots back into the dark, leaving an intact shard of E.G.O armor.",
            fx: { health: -12, sanity: -8, resonance: 15, rep: 10 },
            lootAhn: 30,
            strainDelta: +10
          },
          {
            labelVi: "Cắt nguồn điện dẫn vào các rễ kim loại để cô lập buồng giam",
            labelEn: "Cut the power feeding the metal roots to seal the chamber",
            resultVi: "Điện tắt, cánh cửa tự động sập xuống và nhốt dị thể lại. Cả đội thoát ra an toàn.",
            resultEn: "The power dies, the automatic doors slam down and lock the anomaly in again. The whole team gets out safe.",
            fx: { health: -8, sanity: -6, merit: 8 },
            strainDelta: +5
          },
          {
            labelVi: "Chạy ngược về thang máy phụ trước khi đầu óc bạn vỡ ra",
            labelEn: "Run back to the auxiliary lift before your mind comes apart",
            isFlee: true,
            resultVi: "Bạn đập nút thang máy khẩn cấp và vọt lên, bỏ lại căn phòng và tiếng hát sau lưng.",
            resultEn: "You slam the emergency lift button and shoot upward, leaving the room and the singing behind.",
            fx: { sanity: -4, rep: -2 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Lõi Trung Tâm: Tinh Thể Cogito',
        nameEn: 'Central Command: The Well of Cogito',
        descVi: "Tầng sâu nhất mở ra trước mắt bạn: một cái giếng sâu hun hút phát ánh sáng của Cogito nguyên chất. Từ đây sinh ra mọi phép màu lẫn mọi thảm họa của The City.",
        descEn: "The deepest floor opens before you: a bottomless well giving off the light of pure Cogito. Every miracle and every disaster of The City began here.",
        strainGain: 10,
        choices: [
          {
            labelVi: "Chiết một ống Cogito nguyên chất và niêm phong trong hộp chì",
            labelEn: "Draw a phial of raw Cogito and seal it in a lead case",
            resultVi: "Bạn mang mẫu vật lên mặt đất. Các Wing lớn sẵn sàng trả cả một gia tài để giữ bí mật này cho riêng họ.",
            resultEn: "You carry the sample to the surface. The big Wings are ready to pay a fortune to keep this secret to themselves.",
            fx: { wealth: 85, sanity: -12, rep: 18, resonance: 20 },
            recordAdd: 'cogito_ruin_salvager'
          },
          {
            labelVi: "Lắng nghe tiếng thì thầm của giếng và đón nhận Ánh Sáng",
            labelEn: "Listen to the whisper of the well and accept the Light",
            resultVi: "Một luồng sáng ấm chảy vào tâm trí bạn. Vết nứt trong đầu bạn liền lại, và bạn hiểu mình rõ hơn bất cứ lúc nào trước đó.",
            resultEn: "A warm light flows into your mind. The crack in your head closes, and you understand yourself better than you ever did.",
            fx: { sanity: 30, resonance: 25, health: 15, rep: 12 },
            recordAdd: 'light_seeker_initiate'
          }
        ]
      }
    ]
  },

  dungeon_bloodfiend_carnival: {
    id: 'dungeon_bloodfiend_carnival',
    fall: { vi: "Nhạc kèn không ngừng khi bạn ngã. Những con rối khâu bằng da người đến nhấc bạn lên, cẩn thận như đỡ một vị khách quá chén, và đưa bạn về nơi lễ hội giữ những người đến sau cùng.", en: "The brass does not stop when you fall. The puppets stitched from human skin come to lift you, careful as if helping a guest who has had too much, and carry you to where the carnival keeps those who arrive last.", causeVi: "Ở lại La Manchaland", causeEn: "Stayed behind in La Manchaland" },
    cards: true,
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
        descVi: "Dưới hầm ngầm District 16, một công viên giải trí hiện ra trong ánh neon đỏ như máu. Những con rối khâu bằng da người cúi chào, và một bản nhạc kèn méo tiếng vọng qua các gian hàng.",
        descEn: "Beneath District 16, an amusement park appears in blood-red neon. Marionettes stitched from human hide bow, and a warped organ tune drifts through the stalls.",
        strainGain: 15,
        choices: [
          {
            labelVi: "Mua một vé danh dự bằng vài đồng Ahn để qua cổng đúng phép",
            labelEn: "Buy an honorary ticket with a few Ahn and pass the gate properly",
            resultVi: "Con rối nhận tiền, đục vé và mở cổng. Bạn qua được mà không đổ giọt máu nào.",
            resultEn: "The puppet takes the coins, punches the ticket and opens the turnstile. You pass without spilling a drop.",
            fx: { wealth: -3, rep: 3 },
            strainDelta: -5
          },
          {
            labelVi: "Chém đứt dây điều khiển của lũ rối và đạp rào chắn qua",
            labelEn: "Cut the puppets’ strings and kick through the barricade",
            resultVi: "Lũ rối đổ xuống, mở ra một lối thẳng vào khu trung tâm, và một tiếng chuông báo động bắt đầu reo ở đâu đó.",
            resultEn: "The puppets slump, opening a straight path to the center, and an alarm bell begins to ring somewhere.",
            fx: { health: -4, rep: 6, heat: 5 },
            strainDelta: +10
          }
        ]
      },
      {
        stageIndex: 1,
        nameVi: 'Đu Quay Máu & Mê Cung Gương Nứt',
        nameEn: 'The Crimson Ferris Wheel & Shattered Mirrors',
        descVi: "Một chiếc đu quay khổng lồ quay trên hồ máu đặc. Trong mê cung gương nứt cạnh đó, những bóng phản chiếu nhe răng và gọi tên bạn bằng giọng của những người đã khuất.",
        descEn: "A huge wheel turns above a lake of thick blood. In the cracked-mirror maze beside it, your reflections bare their teeth and call your name in the voices of the dead.",
        strainGain: 17,
        canFlee: true,
        choices: [
          {
            labelVi: "Nhắm mắt và đi qua mê cung gương chỉ bằng tai và nhịp thở",
            labelEn: "Close your eyes and cross the mirror maze by ear and breath alone",
            checkTrait: 'nerve',
            resultVi: "Ảo ảnh không bám được vào bạn. Bạn bước ra khỏi mê cung với đầu óc còn nguyên.",
            resultEn: "The illusions find nothing to hold on to. You leave the maze with your head intact.",
            fx: { sanity: 8, merit: 6 },
            lootAhn: 20,
            strainDelta: -5
          },
          {
            labelVi: "Lục các quầy trò chơi bỏ hoang để tìm Huyết Tinh",
            labelEn: "Search the abandoned game booths for blood crystals",
            resultVi: "Bạn tìm được hai viên Huyết Tinh đỏ thẫm, còn ấm, và mảnh gương cứa một đường vào lòng bàn tay.",
            resultEn: "You find two dark-red blood crystals, still warm, and a shard of mirror opens a line across your palm.",
            fx: { health: -10, wealth: 30, merit: 4 },
            lootAhn: 20,
            strainDelta: +10
          },
          {
            labelVi: "Chui ra bằng cống nước thải trước khi bị bao vây",
            labelEn: "Crawl out through the runoff culvert before you are surrounded",
            isFlee: true,
            resultVi: "Bạn bò qua cống và trồi lên giữa cơn mưa trên phố, còn sống và còn đủ tay chân.",
            resultEn: "You crawl through the culvert and surface into the rain on the street, alive and in one piece.",
            fx: { sanity: 4, wealth: 10 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Vũ Đài Huyết Tộc: Trưởng Trại Đói Khát',
        nameEn: 'The Grand Tent: Starving Kindred Elder',
        descVi: "Dưới mái bạt rạp xiếc, một Bloodfiend cổ khoác áo nhung rách đang ngồi bên bàn tiệc rượu máu, chờ bạn. Đôi mắt đỏ của nó đói thứ hơi ấm mà chỉ người sống mới có.",
        descEn: "Under the circus canopy an ancient Bloodfiend in frayed velvet sits at a table of blood wine, waiting for you. Its red eyes hunger for the warmth only the living have.",
        strainGain: 21,
        canFlee: true,
        choices: [
          {
            labelVi: "Rút vũ khí đấu sinh tử và từ chối làm con mồi",
            labelEn: "Draw your weapon and fight to the death, refusing to be prey",
            checkTrait: 'vigor',
            resultVi: "Kiếm và răng nanh va vào nhau tóe lửa trong rạp. Bạn chém đứt một bên cánh của nó, và nó phải lùi vào bóng tối.",
            resultEn: "Steel and fangs strike sparks under the canopy. You sever one of its wings, and it has to fall back into the dark.",
            fx: { health: -16, sanity: -6, rep: 14, merit: 10 },
            lootAhn: 30,
            strainDelta: +10
          },
          {
            labelVi: "Rạch đầu ngón tay, dâng một chén máu để đổi lấy bí mật cổ",
            labelEn: "Cut a fingertip and offer a goblet of blood in exchange for an old secret",
            resultVi: "Nó uống từng giọt với vẻ hài lòng rồi trao bạn một chiếc nhẫn gia huy cổ của Huyết Tộc.",
            resultEn: "It drinks every drop with satisfaction, then hands you an antique Kindred signet ring.",
            fx: { health: -8, sanity: -12, network: 12, resonance: 15 },
            lootAhn: 25,
            strainDelta: +5
          },
          {
            labelVi: "Ném một quả lựu đạn chói rồi chạy về lối thoát",
            labelEn: "Throw a flash grenade and sprint for the exit",
            isFlee: true,
            resultVi: "Ánh sáng làm nó mù trong vài giây. Bạn kịp phóng qua cửa ngầm.",
            resultEn: "The light blinds it for a few seconds. You vault through the service door in time.",
            fx: { health: -4, sanity: 2 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Cửa Thoát Ra Phố Đêm',
        nameEn: 'Escape into the Rain-Swept Night',
        descVi: "Ánh đèn lạnh của The City phía trên lọt qua khe nắp cống. Tiếng nhạc xiếc kỳ quái chìm dần xuống lòng đất sau lưng bạn.",
        descEn: "Cold lamplight from the City above filters through the manhole grill. The strange circus music sinks into the ground behind you.",
        strainGain: 5,
        choices: [
          {
            labelVi: "Đẩy nắp cống lên phố và bán Huyết Tinh cho Workshop",
            labelEn: "Push the manhole open, climb to the street and sell the blood crystals to the Workshops",
            resultVi: "Bạn trở về mặt đất với một túi Huyết Tinh quý. Các xưởng rèn trả cao để chế vũ khí hút máu.",
            resultEn: "You return to the surface with a bag of rare blood crystals. The forges pay well to make blood-drinking arms.",
            fx: { wealth: 65, rep: 12, sanity: 10, merit: 12 },
            flagAdd: ['BloodfiendSlayer'],
            recordAdd: 'bloodfiend_carnival_survivor'
          },
          {
            labelVi: "Báo tọa độ công viên cho Zwei Association để nhận tiền truy quét",
            labelEn: "Report the park’s coordinates to Zwei Association for the sweep bounty",
            resultVi: "Zwei phong tỏa cả khu cống ngầm. Bạn nhận tiền thưởng, và tên bạn được ghi vào sổ của Hiệp hội.",
            resultEn: "Zwei seals off the whole sewer district. You collect the bounty, and your name is entered in the Association’s book.",
            fx: { rep: 25, wealth: 45, sanity: 15, merit: 16 },
            flagAdd: ['BloodfiendSlayer'],
            recordAdd: 'zwei_informant_hero'
          }
        ]
      }
    ]
  },

  dungeon_outskirts_ruins: {
    id: 'dungeon_outskirts_ruins',
    fall: { vi: "Bão cát phủ lại cổng vòm đá chỉ sau một đêm. Người đi qua đây năm sau sẽ chỉ thấy một mô cát hơi cao hơn bình thường, và không có ai ở Outskirts hỏi tên người nằm dưới.", en: "The sandstorm covers the stone archway again in a single night. Someone passing next year will see only a dune slightly higher than usual, and no one in the Outskirts asks the name of whoever lies beneath.", causeVi: "Chôn dưới Phế Tích Ngoại Ô", causeEn: "Buried beneath the Outskirts ruins" },
    cards: true,
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
        descVi: "Bão cát lật lớp đất mặt và để lộ một cổng vòm đá lớn chìm dưới Outskirts. Bên trong, một cầu thang xoắn dẫn xuống bóng tối.",
        descEn: "A sandstorm strips the topsoil and exposes a great stone archway sunk beneath the Outskirts. Inside, a spiral stair leads down into the dark.",
        strainGain: 15,
        choices: [
          {
            labelVi: "Đốt đuốc và đọc dấu vết của những đoàn đi trước",
            labelEn: "Light a torch and read the marks of the parties that came before",
            resultVi: "Bạn nhận ra những dấu cảnh báo bẫy mà các Fixer trước đó đã vạch bằng chính máu của họ.",
            resultEn: "You recognize the trap warnings that earlier Fixers scratched in their own blood.",
            fx: { sanity: 5, network: 3 },
            strainDelta: -5
          },
          {
            labelVi: "Buộc dây cứu sinh vào xe kéo của đoàn caravan rồi bước xuống",
            labelEn: "Tie a lifeline to the caravan’s tow cart and climb down",
            resultVi: "Sợi cáp giữ bạn đứng vững khi đất đá sụt dưới chân.",
            resultEn: "The cable keeps you steady as earth and stone slide away beneath your feet.",
            fx: { health: 4, rep: 3 },
            strainDelta: -5
          }
        ]
      },
      {
        stageIndex: 1,
        nameVi: 'Hầm Mộ Kim Loại & Máy Móc Cổ Đại',
        nameEn: 'Vault of Forgotten Singularities',
        descVi: "Tầng hầm mở thành một quảng trường kim loại. Những cỗ máy từ trước thời The City vẫn quay đều mà không cần điện, canh giữ những chiếc rương phủ bụi hàng nghìn năm.",
        descEn: "The cellar opens into a metal plaza. Machines from before The City still turn steadily without power, guarding chests that have gathered dust for thousands of years.",
        strainGain: 20,
        canFlee: true,
        choices: [
          {
            labelVi: "Vô hiệu bánh răng bảo vệ và cạy mở một chiếc rương",
            labelEn: "Disable the guard gears and pry open a chest",
            checkTrait: 'luck',
            resultVi: "Bạn gỡ ngòi nổ kịp lúc và lấy ra những thỏi kim loại cổ cứng đến khó tin.",
            resultEn: "You defuse the trigger in time and take out ancient ingots of unbelievable hardness.",
            fx: { wealth: 40, merit: 6, health: -6 },
            lootAhn: 30,
            strainDelta: +5
          },
          {
            labelVi: "Chép các ký tự Singularity cổ vào sổ tay",
            labelEn: "Copy the ancient Singularity characters into your notebook",
            resultVi: "Những đồ hình cổ làm bạn hiểu thêm một chút về cách The City vận hành.",
            resultEn: "The old diagrams teach you a little more about how The City runs.",
            fx: { resonance: 15, sanity: -6, rep: 8 },
            strainDelta: +10
          },
          {
            labelVi: "Leo ngược dây lên xe caravan cho chắc mạng",
            labelEn: "Climb the rope back to the caravan cart to be safe",
            isFlee: true,
            resultVi: "Bạn lên được mặt đất cùng vài món kim loại nhỏ nhặt được.",
            resultEn: "You reach the surface with a few small pieces of metal.",
            fx: { wealth: 20, sanity: 5 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Sinh Vật Dị Giới Canh Cổng',
        nameEn: 'Guardian Beast of the Beyond',
        descVi: "Trước cửa đền cổ, một sinh vật không mắt, phủ vảy sừng và gai, bước ra từ bóng tối. Thân nó tỏa nhiệt đủ làm chảy cả cát đá quanh nó.",
        descEn: "At the door of the old temple, an eyeless creature covered in horn scales and thorns steps out of the dark. Its body gives off enough heat to melt the sand and stone around it.",
        strainGain: 25,
        canFlee: true,
        choices: [
          {
            labelVi: "Dụ nó vào giữa các trụ đá cổ để bẫy và hạ nó",
            labelEn: "Lure it among the old stone pillars to trap and bring it down",
            checkTrait: 'vigor',
            resultVi: "Một khối cự thạch đổ xuống chôn nó. Bạn chặt lấy chiếc sừng còn phát sáng làm chiến lợi phẩm.",
            resultEn: "A great block of stone falls and buries it. You cut off its still-glowing horn as a trophy.",
            fx: { health: -15, rep: 16, merit: 12 },
            lootAhn: 35,
            strainDelta: +10
          },
          {
            labelVi: "Ném đá mồi lửa dụ nó đi xa rồi luồn qua cửa đền",
            labelEn: "Throw a flaming stone to draw it away, then slip through the temple door",
            resultVi: "Bạn trườn qua kẽ đá hẹp trong khi hàm răng của nó ngoạm hụt ngay sau lưng.",
            resultEn: "You wriggle through the narrow gap as its jaws snap shut just behind you.",
            fx: { health: -8, sanity: -6, merit: 6 },
            strainDelta: +5
          },
          {
            labelVi: "Rút khẩn lên mặt đất trước khi sức nóng thiêu bạn",
            labelEn: "Withdraw to the surface before the heat burns you",
            isFlee: true,
            resultVi: "Bạn lao ra miệng hầm đúng lúc ngọn lửa quét qua bậc thang.",
            resultEn: "You dive out of the shaft mouth just as a gust of fire sweeps the stairs.",
            fx: { health: -5, sanity: 2 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Điện Thờ Di Tích Cổ & Quặng Thần Thánh',
        nameEn: 'The Relic Sanctuary: Ancient Singularity Alloy',
        descVi: "Trong thánh đường cổ, một bệ đá lơ lửng giữ khối hợp kim phát ánh vàng, thứ kim loại truyền thuyết có thể rèn vũ khí cho một Color Fixer.",
        descEn: "In the old sanctum a floating stone altar holds a slab of alloy that glows gold, the legendary metal that could forge a Color Fixer’s weapon.",
        strainGain: 10,
        choices: [
          {
            labelVi: "Cẩn thận lấy khối quặng về cho một lò rèn xứng đáng",
            labelEn: "Carefully take the ore back for a forge worthy of it",
            resultVi: "Bạn mang khối kim loại lên mặt đất. Tên bạn đi vào những câu chuyện mà thợ rèn kể nhau trong The City.",
            resultEn: "You carry the metal to the surface. Your name enters the stories smiths tell each other across The City.",
            fx: { wealth: 100, rep: 25, resonance: 20, merit: 20 },
            recordAdd: 'outskirts_ruin_conqueror'
          },
          {
            labelVi: "Để khối quặng chạm vào mình và đánh thức thể chất",
            labelEn: "Let the ore touch you and awaken your body",
            resultVi: "Năng lượng cổ ngấm vào xương thịt, chữa lành những thương tật cũ và để lại một sức mạnh không còn hoàn toàn của con người.",
            resultEn: "The old energy sinks into flesh and bone, healing old injuries and leaving a strength that is no longer entirely human.",
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
    fall: { vi: "Sóng đen khép lại trên đầu bạn. Ở Đại Hồ không có nghĩa trang, chỉ có Luật, và bạn đã chạm vào điều đầu tiên: thứ gì xuống nước thì thuộc về nước.", en: "The black waves close over you. The Great Lake has no cemetery, only its Law, and you have met the first of it: what goes into the water belongs to the water.", causeVi: "Chìm ở Đại Hồ", causeEn: "Sank in the Great Lake" },
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
        descVi: "Con tàu bọc thép rẽ qua ranh giới hai vùng nước của Đại Hồ, District 21. Chuông Luật Đại Hồ rung dồn dập, sương trắng đục ập tới cùng tiếng hát lạc điệu của những thủy thủ đã hóa thành Người Cá.",
        descEn: "The armored ship crosses the boundary between two sectors of the Great Lake, District 21. The Lake Law bells ring wildly as chalk-white fog rolls in with the off-key chorus of sailors who have already turned into Mermaids.",
        strainGain: 14,
        choices: [
          {
            labelVi: "Gõ âm thoa của U Corp để tàu hòa vào tần số sóng và giữ mạn tàu",
            labelEn: "Strike the U Corp tuning forks to bring the hull into step with the waves",
            checkTrait: 'nerve',
            resultVi: "Âm thanh từ mũi tàu đẩy lùi màn sương trắng. Đội thủy thủ giữ đội hình qua đợt sóng đầu.",
            resultEn: "The sound from the bow pushes back the white fog. The crew holds formation through the first swell.",
            fx: { sanity: 8, health: 4, rep: 5, merit: 5 },
            lootAhn: 15,
            strainDelta: -6
          },
          {
            labelVi: "Tiêm ống K Corp để cơ thể chịu được cái lạnh trước khi ra boong",
            labelEn: "Inject a K Corp ampoule so the body can take the cold before stepping on deck",
            reqItem: 'con_kcorp_ampoule',
            consumeItem: true,
            resultVi: "Dịch xanh ngọc làm da bạn bớt buốt trước gió biển và đầu óc rõ ràng. Bạn ra boong sẵn sàng.",
            resultEn: "The emerald fluid dulls the sea wind on your skin and clears your head. You step on deck ready.",
            fx: { health: 25, sanity: 20, rep: 6 },
            lootAhn: 15,
            strainDelta: -18
          },
          {
            labelVi: "Ra lệnh tăng hết tốc lực và đâm xuyên vành đai sương",
            labelEn: "Order full ahead and ram through the fog belt",
            resultVi: "Mũi tàu bọc thép cày nát những tảng băng sáp, và hất lên một thùng hàng trôi dạt của một thương thuyền bị đắm.",
            resultEn: "The armored prow plows through the wax floes and flips up a drifting cargo pod from a sunken merchantman.",
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
        descVi: "Hàng chục Người Cá phủ màng sáp trắng vọt từ mặt nước đen lên boong. Chúng từng là Fixer và thủy thủ lành nghề. Giờ chúng cầm mái chèo gãy và móc sắt lao vào những người còn sống.",
        descEn: "Dozens of Mermaids coated in chalk-white membrane vault from the black water onto the deck. They were once skilled Fixers and sailors. Now they swing broken oars and iron hooks at the living.",
        strainGain: 16,
        canFlee: true,
        choices: [
          {
            labelVi: "Dùng lao móc nhiệt đập vỡ hàng đầu của chúng và đốt sạch dịch trắng trên sàn",
            labelEn: "Use the thermal harpoons to break their front rank and burn the white slime off the deck",
            checkTrait: 'vigor',
            resultVi: "Lửa cháy xém lớp dịch trước khi nó kịp bám vào da. Bạn nhặt được những mảnh tinh thể cộng hưởng từ xác bầy quái.",
            resultEn: "The fire sears the slime before it can take root. You gather resonant crystal fragments from the dead swarm.",
            fx: { health: -7, sanity: -3, rep: 10, merit: 9 },
            lootAhn: 26,
            strainDelta: +4
          },
          {
            labelVi: "Giăng lưới thép của U Corp rồi bắn tỉa từ đài chỉ huy",
            labelEn: "Rig U Corp steel netting and snipe from the bridge",
            resultVi: "Lưới thép giữ chân bầy Người Cá, nên bạn dọn boong chậm nhưng ít bị thương.",
            resultEn: "The netting holds the Mermaids, so you clear the deck slowly but with few wounds.",
            fx: { health: -3, sanity: -4, merit: 7, network: 5 },
            lootAhn: 18,
            strainDelta: +2
          },
          {
            labelVi: "Hạ xuồng cứu sinh bọc thép và quay về cảng U Corp ngay",
            labelEn: "Launch the armored lifeboat and return to U Corp’s port at once",
            isFlee: true,
            resultVi: "Bạn về tới bến an toàn cùng số mẫu vật nhặt được ở rìa hồ.",
            resultEn: "You reach port safely with the specimens gathered along the lake’s edge.",
            fx: { wealth: 20, sanity: 6 }
          }
        ]
      },
      {
        stageIndex: 2,
        nameVi: 'Họng Thẳm Cá Voi Trắng (The Pallid Maw)',
        nameEn: 'The Abyssal Maw of the Pallid Whale',
        descVi: "Mặt nước dựng lên như một bức tường. Con Pallid Whale to bằng cả một khu phố trồi lên, há họng thành một xoáy nước hút cả các con tàu vào miệng.",
        descEn: "The water rises like a wall. The Pallid Whale, as big as a city ward, breaches the surface and opens its maw into a whirlpool that pulls ships into its throat.",
        strainGain: 18,
        canFlee: true,
        choices: [
          {
            labelVi: "Buộc mình vào bệ phóng và bắn đại bác Lao Singularity vào mắt nó",
            labelEn: "Lash yourself to the harpoon cannon and fire a Singularity harpoon into its eye",
            checkTrait: 'vigor',
            resultVi: "Mũi lao mang lõi nổ xuyên con mắt trắng dã. Tiếng rống của nó xé tan mây bão trên Đại Hồ.",
            resultEn: "The explosive-cored harpoon pierces the pale eye. Its bellow tears the storm clouds above the Great Lake.",
            fx: { health: -10, sanity: -4, rep: 16, merit: 14, resonance: 12 },
            lootAhn: 36,
            strainDelta: +6
          },
          {
            labelVi: "Thả thủy lôi âm thanh vào họng nó rồi bẻ lái cắt ngang dòng xoáy",
            labelEn: "Drop acoustic depth charges into its throat and veer across the vortex",
            checkTrait: 'luck',
            resultVi: "Vụ nổ từ bên trong làm nó co giật và nhả dòng xoáy ra, kéo theo cả kho báu từ những con tàu cổ.",
            resultEn: "The blast from inside makes it convulse and spit out the whirlpool, along with treasure from old ships.",
            fx: { health: -5, sanity: -5, rep: 10, merit: 10 },
            lootAhn: 30,
            strainDelta: +3
          },
          {
            labelVi: "Chặt cáp neo và cưỡi sóng xung kích thoát khỏi xoáy",
            labelEn: "Cut the anchor cables and ride the shockwave out of the maelstrom",
            isFlee: true,
            resultVi: "Con tàu sượt qua rìa xoáy trong gang tấc và thoát về vùng nước yên.",
            resultEn: "The ship skims the edge of the whirlpool by a hand’s breadth and escapes to calm water.",
            fx: { sanity: 4, rep: 2 }
          }
        ]
      },
      {
        stageIndex: 3,
        nameVi: 'Trái Tim Hóa Thạch & Long Diên Hương Hoàng Kim',
        nameEn: 'The Calcified Heart & Golden Ambergris',
        descVi: "Pallid Whale chìm dần xuống vực. Mặt nước yên lại và để lộ một khối Long Diên Hương vàng cùng tinh chất cộng hưởng đầu tiên của Đại Hồ.",
        descEn: "The Pallid Whale sinks slowly into the trench. The water calms and reveals a mass of golden ambergris and the first resonant essence of the Great Lake.",
        strainGain: 6,
        choices: [
          {
            labelVi: "Gom Long Diên Hương và mỡ cá voi giao cho U Corp lấy một món tiền lớn",
            labelEn: "Harvest the ambergris and blubber and hand it to U Corp for a large payment",
            resultVi: "Cả bến cảng District 21 ra đón đoàn tàu về. U Corp trao bạn phần thưởng và gọi bạn là Thợ Săn Đại Hồ.",
            resultEn: "All the District 21 docks turn out for the ship’s return. U Corp gives you your reward and calls you a Great Lake Hunter.",
            fx: { wealth: 85, rep: 24, sanity: 18, health: 12, merit: 20 },
            recordAdd: 'lake_whale_slayer'
          },
          {
            labelVi: "Chạm vào lõi cộng hưởng của Đại Hồ và khắc ghi bản lĩnh đã đưa bạn qua Cơn Ác Mộng Trắng",
            labelEn: "Touch the resonant core of the Great Lake and carve in the strength that carried you through the White Nightmare",
            resultVi: "Sóng âm từ trái tim biển gột sạch nỗi sợ trong bạn. Tâm trí và thân thể bạn ngân lên cùng Ánh Sáng.",
            resultEn: "Sound from the heart of the sea washes the fear out of you. Your mind and body ring together with the Light.",
            fx: { wealth: 50, sanity: 30, health: 20, resonance: 28, rep: 18, merit: 18 },
            scarAdd: 'Vết trắng trên vai',
            recordAdd: 'lake_whale_slayer'
          }
        ]
      }
    ]
  }
};

DUNGEON_DEFINITIONS[NIGHT_DUNGEON.id] = NIGHT_DUNGEON;
DUNGEON_DEFINITIONS[CLAW_DUNGEON_ID] = CLAW_DUNGEON;
DUNGEON_DEFINITIONS[ENSEMBLE_DUNGEON_ID] = ENSEMBLE_DUNGEON;

const REPORT_CHOICE = {
  labelVi: 'Mang những gì thấy được về báo cho Association của bạn',
  labelEn: 'Carry what you saw back to your Association',
  resultVi: 'Bạn viết bản báo cáo ngay trong đêm, đủ chi tiết để người khác đi lại con đường ấy mà không phải trả giá như bạn. Association nhận nó mà không hỏi thêm, và ghi tên bạn ở dòng đầu.',
  resultEn: 'You write the report that same night, detailed enough for someone else to walk that route without paying what you paid. The Association takes it without further questions and puts your name on the first line.',
  fx: { wealth: 30, rep: 10, sanity: 8, merit: 12 },
  reportAff: true,
  needAff: true
};

// Every dungeon gets its seeded variant, side room, shortcut and report choice merged in once, at load
for (const def of Object.values(DUNGEON_DEFINITIONS)) {
  def.variants = STAGE_VARIANTS[def.id] || {};
  const insertBeforeFlee = (stage, choice) => {
    const fleeAt = stage.choices.findIndex((c) => c.isFlee);
    if (fleeAt < 0) stage.choices.push(choice);
    else stage.choices.splice(fleeAt, 0, choice);
  };
  const side = SIDE_ROOMS[def.id];
  if (side) {
    def.sideRoom = side.room;
    insertBeforeFlee(def.stages[side.fromStage], { ...side.door, side: side.room.id });
  }
  const shortcut = SHORTCUTS[def.id];
  if (shortcut) {
    insertBeforeFlee(def.stages[1], {
      ...shortcut, checkTrait: 'luck', goto: def.stages.length - 1,
      fx: { health: -9, sanity: -7, merit: 12, rep: 6 }, lootAhn: 18, strainDelta: 16
    });
  }
  const last = def.stages[def.stages.length - 1];
  const keepIdx = FINAL_KEEPS[def.id];
  if (keepIdx != null && last.choices[keepIdx]) {
    const keep = last.choices[keepIdx];
    keep.flagAdd = [...(keep.flagAdd || []), 'KeptDungeonTrophy'];
    keep.later = [...(keep.later || []), {
      id: 'csq_dungeon_trophy_kept', years: 3,
      reasonVi: `Thứ bạn mang ra khỏi ${def.titleVi} chưa ở yên`,
      reasonEn: `What you carried out of ${def.titleEn} has not stayed quiet`
    }];
  }
  if (!def.noRewards) last.choices.push({ ...REPORT_CHOICE });
}

const fnv = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

const COMPANION_ORDER = ['partner', 'mentee', 'friend', 'mentor'];

/** Who comes down with you: the closest working relationship that is still active and not cold. */
export function pickDungeonCompanion(char) {
  for (const role of COMPANION_ORDER) {
    const raw = char?.npcs?.[role];
    // An injured companion stays home to heal, and an advisor works from headquarters
    if (npcIsActive(raw) && !raw.injured && !raw.advisor && (raw.bond ?? 0) >= 15) {
      const npc = ensureNpcAgency(raw);
      if (char.npcs) char.npcs[role] = npc;
      return {
        role,
        nameVi: npc.nameVi,
        nameEn: npc.nameEn || npc.nameVi,
        perk: npc.dungeonPerk || getNpcDungeonPerk(npc),
        archetype: npc.archetype
      };
    }
  }
  return null;
}

const named = (text, companion, lang) => text.replace('{name}', lang === 'en' ? companion.nameEn : companion.nameVi);
const companionLine = (key, companion) => ({ vi: named(COMPANION_TEXT[key].vi, companion, 'vi'), en: named(COMPANION_TEXT[key].en, companion, 'en') });

function moveCompanionBond(char, companion, delta) {
  const npc = char.npcs?.[companion?.role];
  if (!npc || !npcIsActive(npc)) return;
  char.npcs = { ...char.npcs, [companion.role]: { ...npc, bond: clamp((npc.bond ?? 0) + delta, 0, 100), lastSeen: char.age } };
}

/** Standing in the Association the run was taken for (or reported to), when there is one. */
function moveStanding(char, delta) {
  const a = ensureAffiliation(char);
  // The session copies the character shallowly, so write a new object rather than edit the shared one
  if (a) char.affiliation = { ...a, standing: clamp(a.standing + delta, 0, 100) };
}

/** What a run did to the people and the badge around you, written once at its end. */
export function settleRun(char, session, outcome) {
  const notes = [];
  const c = session.companion;
  if (c && npcIsActive(char.npcs?.[c.role])) {
    const delta = outcome === 'conquered' ? 4 : outcome === 'fled' ? 1 : -2;
    moveCompanionBond(char, c, delta + (session.companionSaved ? 3 : 0));
    if (outcome === 'conquered') notes.push(companionLine('homeWin', c));
    else if (outcome === 'fled') notes.push(companionLine('homeFled', c));
    if (c.role === 'mentee' && char.mentee && outcome === 'conquered') char.mentee = { ...char.mentee, progress: Math.min(99, (char.mentee.progress || 0) + 10) };
  }
  if (session.aff && getAffiliation(char)?.id === session.aff) {
    moveStanding(char, outcome === 'conquered' ? 10 : outcome === 'fled' ? -3 : -5);
  }
  if (outcome === 'conquered') {
    if (session.id === 'dungeon_warp_train') {
      if (!(char.unlockedRecords || []).includes('warp_cleanup')) {
        char.unlockedRecords = [...(char.unlockedRecords || []), 'warp_cleanup'];
        notes.push({
          vi: '[Thành Tựu Mới] Mười giây, hai nghìn năm: Bạn đã sống sót và bước ra khỏi toa cuối của WARP Train.',
          en: '[New Record] Ten Seconds, Two Thousand Years: You survived and walked out of the last car of the WARP Train.'
        });
      }
    }
    const relicId = DUNGEON_EXTRACTION_REWARDS?.[session.id];
    if (relicId) {
      const hasItem = (char.inventory || []).some((it) => (it.id || it) === relicId);
      if (!hasItem) {
        const relic = ITEMS_CATALOG.find((i) => i.id === relicId);
        if (relic) {
          char.inventory = [...(char.inventory || []), { ...relic }];
          notes.push({
            vi: '[Trích xuất Cổ vật] Bạn thu hồi được kỳ tích độc bản: ' + relic.nameVi + '.',
            en: '[Relic Extracted] You salvaged a signature relic: ' + relic.nameEn + '.'
          });
        }
      }
    }
  }
  return notes;
}

/**
 * Evaluates character adaptation & mastery bonuses for a given dungeon
 */
export function getDungeonMastery(def, char) {
  if (!def || !char) return { hasMastery: false, dmgMult: 1.0, checkBonus: 0, labelVi: '', labelEn: '' };
  const flags = char.flags || [];
  const color = isColorRank(char);
  const hasGear = Boolean(char.craftWeapon || (char.inventory || []).some((item) => item?.type === 'weapon' || item?.type === 'armor') || flags.includes('EGOAwakened') || color);
  let dmgMult = hasGear ? 0.85 : 1.0;
  let checkBonus = hasGear ? 0.1 : 0;
  const reasonsVi = [];
  const reasonsEn = [];
  if (color) {
    checkBonus += DUNGEON_BALANCE.ego.color.checkBonus;
    reasonsVi.push('Danh Color');
    reasonsEn.push('Color name');
  }
  if (hasColorSignatureWeapon(char)) {
    dmgMult *= 0.9;
    checkBonus += 0.04;
    const engraved = flags.includes('ColorWeaponEngravedWithPartner');
    reasonsVi.push(engraved ? 'Vũ khí Color đặt riêng khắc tên cộng sự' : 'Vũ khí Color đặt riêng');
    reasonsEn.push(engraved ? 'Signature Color weapon engraved with fallen partner' : 'Signature Color weapon');
  }

  if (flags.includes('AbyssalDistortionApex')) {
    dmgMult *= 0.85;
    checkBonus += 0.14;
    reasonsVi.push('Hình thái Dị Thường Vực Thẳm (+14 Sức mạnh chiến đấu)');
    reasonsEn.push('Abyssal Apex Metamorphosis (+14 Combat Power)');
  }

  if (hasGear) {
    reasonsVi.push('Vũ khí/Trang bị');
    reasonsEn.push('Equipped Gear');
  }
  if (flags.includes('고급장비') && hasGear) {
    dmgMult *= 0.95;
    checkBonus += 0.05;
    reasonsVi.push('Trang bị đại tu Workshop (+5% kiểm định)');
    reasonsEn.push('Workshop Overhauled Gear (+5% checks)');
  }
  if (flags.includes('SingularityImbued') || (char.imbuedRelics || []).length > 0) {
    dmgMult *= 0.9;
    checkBonus += 0.06;
    reasonsVi.push('Khảm Singularity');
    reasonsEn.push('Singularity Imbued');
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
  } else if (def.theme === 'night' && (['Syndicate', 'Outcast'].includes(char.job) || flags.includes('Backstreets'))) {
    dmgMult *= 0.78;
    checkBonus += 0.14;
    reasonsVi.push('Quen đêm Backstreets');
    reasonsEn.push('Knows the Backstreets night');
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
 * Numbers the dungeon balance rests on. Rewards sit below the equivalent event rewards because a
 * dungeon is a chosen risk: it can end a life, and strain makes every later stage harder.
 */
export const DUNGEON_BALANCE = {
  reward: { wealth: 0.3, loot: 0.33, merit: 0.4, resonance: 0.4, rep: 0.5, network: 0.6 },
  healScale: 0.85,
  hazardDamage: { WAW: 1.25, ALEPH: 1.55 },
  successDamage: 0.40,
  failDamage: 1.35,
  failStrain: 8,
  failLootKept: 0.5,
  breakLootKept: 0.5,
  breakAt: 100,
  conquest: { ahn: 8, health: 5, sanity: 6, merit: 4 },
  breather: { health: 14, sanity: 10, strain: -18, cost: 6 },
  // E.G.O is a loan against the mind: one stage goes much easier, and the bill comes in strain and resonance.
  ego: {
    checkBonus: 0.3, ceiling: 0.97, damageMult: 0.6,
    awakened: { charges: 1, strain: 12, sanity: -4, resonance: 5 },
    color: { charges: 2, strain: 7, sanity: -2, resonance: 3, strainMult: 0.85, checkBonus: 0.05 }
  },
  baseCheck: 0.7,
  checkFloor: 0.3,
  checkCeiling: 0.95,
  strainTiers: [
    { id: 'breaking', min: 90, check: -0.18, sanityMult: 1.3 },
    { id: 'panic', min: 70, check: -0.12, sanityMult: 1.2 },
    { id: 'shaken', min: 45, check: -0.05, sanityMult: 1 },
    { id: 'calm', min: 0, check: 0, sanityMult: 1 }
  ]
};

const STANCE = {
  guarded: { damage: 0.75, strain: 0.7, loot: 0.85, check: 0.1 },
  balanced: { damage: 1, strain: 1, loot: 1, check: 0 },
  reckless: { damage: 1.25, strain: 1.15, loot: 1.3, check: 0 }
};

export function getStrainTier(strain) {
  return DUNGEON_BALANCE.strainTiers.find((tier) => strain >= tier.min) || DUNGEON_BALANCE.strainTiers.at(-1);
}

/** Traits sit near 1, except luck which sits near 0 and is mapped onto the same range. */
function traitFactor(char, trait) {
  const traits = traitsOf(char);
  if (trait === 'luck') return 1 + (traits.luck || 0) * 0.18;
  return traits[trait] ?? 1;
}

function checkChanceOf(choice, char, session, mastery) {
  const stance = session?.stance || 'balanced';
  const def = session ? DUNGEON_DEFINITIONS[session.id] : null;
  const tier = getStrainTier(session?.sanityStrain || 0);
  let chance = DUNGEON_BALANCE.baseCheck * traitFactor(char, choice.checkTrait) + mastery.checkBonus;
  chance += (evaluateCompanionSupport(char).dungeonOddsMod || 0) / 100;
  chance += STANCE[stance].check;
  if (def?.noRewards) chance += stance === 'guarded' ? -0.1 : stance === 'balanced' ? 0.04 : 0.12;
  if (stance === 'reckless' && choice.checkTrait === 'vigor') chance += 0.1;
  if (session?.stageScanned) chance += 0.18 + (activeScarSynergies(char).some((synergy) => synergy.id === 'haunted_witness') ? 0.07 : 0);
  if ((char.stats?.sanity ?? 50) >= 70) chance += 0.05;
  chance += tier.check;
  if (session?.egoActive) chance += DUNGEON_BALANCE.ego.checkBonus;
  chance -= choice.checkPenalty || 0;
  chance += cardEffectOf(session).check || 0;
  chance *= choice.checkScale ?? 1;
  return clamp(chance, choice.checkFloor ?? DUNGEON_BALANCE.checkFloor, session?.egoActive ? DUNGEON_BALANCE.ego.ceiling : DUNGEON_BALANCE.checkCeiling);
}

/** What multiplies a negative health or sanity effect in this stage, before the check result. */
function damageMultOf(def, char, session, mastery, kind) {
  const stance = session?.stance || 'balanced';
  const hazard = DUNGEON_BALANCE.hazardDamage[def?.hazard] || 1;
  const traits = traitsOf(char);
  const trait = kind === 'sanity' ? traits.nerve ?? 1 : traits.vigor ?? 1;
  const tier = getStrainTier(session?.sanityStrain || 0);
  let mult = hazard * mastery.dmgMult * STANCE[stance].damage * (2 - trait);
  if (session?.stageScanned) mult *= 0.65;
  if (session?.resolveAwakened) mult *= 0.75;
  if (session?.egoActive) mult *= DUNGEON_BALANCE.ego.damageMult;
  if (kind === 'sanity') mult *= tier.sanityMult;
  mult *= cardEffectOf(session).damage ?? 1;
  if (!session?.combat) mult *= dungeonWagerDamage(session?.delveStake);
  return mult;
}

const healOf = (value) => (value > 0 ? Math.max(1, Math.round(value * DUNGEON_BALANCE.healScale)) : value || 0);
const scaleGain = (value, mult) => (value > 0 ? Math.max(1, Math.round(value * mult)) : value);

function stageRewards(choice, session, success) {
  const fx = choice.fx || {};
  const stance = STANCE[session.stance || 'balanced'];
  const reckless = session.stance === 'reckless' && !choice.isFlee;
  const keep = success ? 1 : DUNGEON_BALANCE.failLootKept;
  const r = DUNGEON_BALANCE.reward;
  const card = cardEffectOf(session);
  const pay = (card.reward ?? 1) * dungeonWagerLoot(session?.delveStake);
  const loot = choice.lootAhn ? Math.round(choice.lootAhn * r.loot * stance.loot * keep * pay * (card.loot ?? 1)) : 0;
  const scanLoot = session.stageScanned && !choice.isFlee ? 10 : 0;
  return {
    wealth: Math.round(scaleGain(fx.wealth || 0, r.wealth) * (fx.wealth > 0 ? keep * pay : 1)),
    loot: loot + (loot > 0 ? scanLoot : 0),
    rep: Math.round(scaleGain(fx.rep || 0, r.rep) * (fx.rep > 0 ? keep : 1)),
    network: Math.round(scaleGain(fx.network || 0, r.network) * (fx.network > 0 ? keep : 1)),
    merit: fx.merit > 0 ? Math.round(fx.merit * r.merit * (reckless ? 1.3 : 1) * keep * pay) : 0,
    resonance: Math.round(scaleGain(fx.resonance || 0, r.resonance) * (fx.resonance > 0 ? keep : 1)) + (reckless && success ? 3 : 0)
  };
}

/**
 * Displayed odds and expected shifts for a dungeon choice. The numbers come from the same
 * helpers the resolver uses, so the screen cannot promise what the engine will not deliver.
 */
export function evaluateDungeonChoiceOdds(choice, char, session) {
  if (!choice || !char) return null;
  const def = session ? DUNGEON_DEFINITIONS[session.id] : null;
  const mastery = getDungeonMastery(def, char);
  if (choice.ensembleResist) return {
    hasCheck: true, trait: 'nerve', successPct: Math.round(checkChanceOf(choice, char, session, mastery) * 100),
    estHp: -8, estSp: Math.max(8, char.stats.sanity || 0) - (char.stats.sanity || 0),
    estWealth: 0, estLoot: 0, estRep: 0, estMerit: 0, estResonance: 0
  };
  if (choice.combatAction && session?.combat) return previewCombatAction(COMBAT_CTX, choice, char, session);
  if (choice.restAction) {
    const pct = choice.checkTrait ? Math.round(clamp(0.58 * traitFactor(char, 'luck') + mastery.checkBonus, 0.25, 0.9) * 100) : 100;
    const rest = choice.restAction === 'rest';
    const push = choice.restAction === 'push';
    return { hasCheck: Boolean(choice.checkTrait), trait: choice.checkTrait || null, successPct: pct, estHp: rest ? 12 : 0, estSp: rest ? 10 : 0, estWealth: 0, estLoot: push ? 8 : 0, estRep: 0, estMerit: push ? 2 : 0, estResonance: 0 };
  }
  if (choice.companionLead) {
    const r = stageRewards(choice, session || {}, true);
    return {
      hasCheck: true, trait: 'bond', successPct: Math.round(companionLeadChance(char, session) * 100),
      estHp: 0, estSp: choice.fx?.sanity || 0, estWealth: r.wealth, estLoot: r.loot, estRep: r.rep, estMerit: r.merit, estResonance: r.resonance
    };
  }
  const successPct = choice.checkTrait ? Math.round(checkChanceOf(choice, char, session, mastery) * 100) : 100;
  const fx = choice.fx || {};
  const hpMult = damageMultOf(def, char, session, mastery, 'health') * DUNGEON_BALANCE.successDamage;
  const spMult = damageMultOf(def, char, session, mastery, 'sanity') * DUNGEON_BALANCE.successDamage;
  const rewards = stageRewards(choice, session || {}, true);
  return {
    hasCheck: Boolean(choice.checkTrait),
    trait: choice.checkTrait || null,
    successPct,
    estHp: fx.health < 0 ? Math.min(-1, Math.ceil(fx.health * hpMult)) : healOf(fx.health),
    estSp: fx.sanity < 0 ? Math.min(-1, Math.ceil(fx.sanity * spMult)) : healOf(fx.sanity),
    estWealth: rewards.wealth,
    estLoot: rewards.loot,
    estRep: rewards.rep,
    estMerit: rewards.merit,
    estResonance: rewards.resonance
  };
}

/**
 * Creates a new active dungeon session
 */
/** Color Fixers carry two E.G.O surges into a dungeon, an awakened Fixer one, anyone else none. */
export function egoChargesOf(char) {
  const flags = char?.flags || [];
  // A Color name is skill, not an awakened E.G.O: without EGOAwakened there is nothing to surge
  if (!flags.includes('EGOAwakened')) return 0;
  return isColorRank(char) ? DUNGEON_BALANCE.ego.color.charges : DUNGEON_BALANCE.ego.awakened.charges;
}

/** Color rank, whether stored as the flag, the promoted job name or grade 0. */
export function isColorRank(char) {
  return Boolean(char && ((char.flags || []).includes('ColorFixer') || char.job === 'Color Fixer' || char.fixerGrade === 0));
}

const COLOR_WEAPON_FLAGS = ['CraftedColorWeapon'];
/** The signature weapon forged for a Color name, as a flag from the commission or as the item itself. */
export function hasColorSignatureWeapon(char) {
  const flags = char?.flags || [];
  return COLOR_WEAPON_FLAGS.some((f) => flags.includes(f)) || (char?.inventory || []).some((it) => (it?.id || it) === 'wpn_color_signature');
}

export function dungeonEgoState(char, session) {
  if (!session || egoChargesOf(char) === 0) return { ok: false, reason: 'none' };
  if (session.egoActive) return { ok: false, reason: 'active' };
  if ((session.egoCharges || 0) <= 0) return { ok: false, reason: 'empty' };
  return { ok: true };
}

/** Spends an E.G.O surge: the next stage is easier and hurts less, at a cost to strain, sanity and resonance. */
export function useDungeonEgo(charState) {
  if (!charState?.pendingDungeon || !dungeonEgoState(charState, charState.pendingDungeon).ok) return charState;
  const isColor = isColorRank(charState);
  const price = isColor ? DUNGEON_BALANCE.ego.color : DUNGEON_BALANCE.ego.awakened;
  const session = { ...charState.pendingDungeon };
  const char = { ...charState, stats: { ...charState.stats } };
  session.egoCharges -= 1;
  session.egoActive = true;
  session.sanityStrain = clamp((session.sanityStrain || 0) + price.strain, 0, 99);
  char.stats.sanity = clamp((char.stats.sanity || 0) + price.sanity, 1, 100);
  char.resonance = clamp((char.resonance || 0) + price.resonance, 0, 100);
  rememberResonance(char, price.resonance);
  const text = isColor ? SUPPLY_TEXT.egoColor : SUPPLY_TEXT.ego;
  session.lastStageResult = { type: 'ego', vi: text.vi, en: text.en };
  char.pendingDungeon = session;
  return char;
}

export function createDungeonSession(dungeonId, char) {
  const def = DUNGEON_DEFINITIONS[dungeonId];
  if (!def) return null;

  // Promotion to Color keeps the field Fixer's supply kit
  const bonusSupply = ['Fixer', 'Color Fixer', 'Wing Employee', 'Workshop Craftsman', 'Syndicate'].includes(char?.job) || isColorRank(char) ||
    (char?.flags || []).some((f) => ['OutskirtsAdaptability', 'GreatLakeHardened', 'GoreDesensitized', 'EGOAwakened'].includes(f));
  const synergySupply = activeScarSynergies(char).some((synergy) => synergy.id === 'field_repair') ? 1 : 0;
  const maxSupplies = (def.noRetreat ? (bonusSupply ? 2 : 1) : (bonusSupply ? 3 : 2)) + synergySupply;

  const session = {
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
    delveStake: 0,
    stance: 'balanced',
    supplyCharges: maxSupplies,
    maxSupplies,
    stageScanned: false,
    egoCharges: egoChargesOf(char),
    egoActive: false,
    resolveAwakened: false,
    lastStageResult: null,
    // The same door can open onto a different third stage: fixed by seed and age, so a reload does not reroll it
    gimmick: DUNGEON_GIMMICKS[def.theme] || null,
    meltdownLevel: 0,
    variant: def.variants?.[2] && fnv(`${char?.seed ?? ''}|${def.id}|${char?.age ?? 0}`) % 2 === 1 ? 2 : null,
    inSide: null,
    companion: def.noCompanion ? null : pickDungeonCompanion(char),
    companionSaved: false,
    companionBalked: false,
    aff: null,
    startSnapshot: {
      stats: { ...char.stats },
      merit: char.merit || 0,
      resonance: char.resonance || 0,
      heat: char.heat || 0,
      taboo: char.taboo || 0,
      scars: [...(char.scars || [])]
    },
    logs: []
  };
  if (def.id === ENSEMBLE_DUNGEON_ID) {
    session.ensembleHarmony = 0;
    session.ensembleRoute = ensembleRoute(char);
    session.ensembleWitness = ensembleWitness(char);
    session.ensembleForced = (char.ensemble?.declines || 0) >= 2;
    session.supplyCharges = Math.min(1, session.supplyCharges);
    session.maxSupplies = session.supplyCharges;
  }
  // Five of the dungeons are a chain of fights floor by floor; the rest keep their exploration stages
  const ready = isGauntlet(def.id) ? initGauntlet(session, char) : session;
  return dungeonUsesCards(def) ? dealCards(ready, char) : ready;
}

export function dungeonEntryForecast(dungeonId, char, stake = 0) {
  const def = DUNGEON_DEFINITIONS[dungeonId];
  if (!def || !char) return null;
  const level = def.noRetreat || def.noWager ? 0 : dungeonWagerLevel(stake);
  const session = createDungeonSession(dungeonId, char);
  session.delveStake = level;
  const stage = getDungeonCurrentStage(session);
  const losses = (stage?.choices || []).filter((choice) => !choice.isFlee).map((choice) => evaluateDungeonChoiceOdds(choice, char, session)).filter(Boolean);
  const hp = Math.max(1, char.stats?.health || 1);
  const sp = Math.max(1, char.stats?.sanity || 1);
  const lossRatio = Math.max(0, ...losses.map((loss) => Math.max(-(loss.estHp || 0) / hp, -(loss.estSp || 0) / sp)));
  const pressure = Math.max(lossRatio, (def.hazard === 'ALEPH' ? 0.27 : 0.16) * damageMultOf(def, char, session, getDungeonMastery(def, char), 'health'));
  const risk = def.noRetreat || pressure >= 0.48 ? 'critical' : pressure >= 0.27 ? 'high' : pressure >= 0.14 ? 'severe' : 'uncertain';
  return { level, risk, damagePercent: Math.round((dungeonWagerDamage(level) - 1) * 100), lootPercent: Math.round((dungeonWagerLoot(level) - 1) * 100), firstEncounter: losses.length ? { hp: Math.max(0, ...losses.map((loss) => -(loss.estHp || 0))), sp: Math.max(0, ...losses.map((loss) => -(loss.estSp || 0))) } : null };
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

/** Whether a supply can be used right now, and why not when it cannot. */
export function dungeonSupplyState(char, session, supplyType) {
  if (!session || (session.supplyCharges || 0) <= 0) return { ok: false, reason: 'empty' };
  if (supplyType === 'scan') return session.stageScanned ? { ok: false, reason: 'scanned' } : { ok: true };
  const wealth = char?.stats?.wealth ?? 0;
  return wealth < DUNGEON_BALANCE.breather.cost ? { ok: false, reason: 'broke' } : { ok: true };
}

/**
 * Spends one supply charge inside a dungeon. A scan reads the stage (better odds, less damage);
 * a breather heals but costs Ahn, so supplies are a decision and not free health.
 */
export function useDungeonSupply(charState, supplyType = 'breather') {
  if (!charState?.pendingDungeon) return charState;
  if (!dungeonSupplyState(charState, charState.pendingDungeon, supplyType).ok) return charState;
  const session = { ...charState.pendingDungeon, logs: [...(charState.pendingDungeon.logs || [])] };
  const char = { ...charState, stats: { ...charState.stats }, logs: [...(charState.logs || [])] };
  session.supplyCharges -= 1;

  if (supplyType === 'scan') {
    session.stageScanned = true;
    session.lastStageResult = { type: 'scan', vi: SUPPLY_TEXT.scan.vi, en: SUPPLY_TEXT.scan.en };
  } else {
    const b = DUNGEON_BALANCE.breather;
    const perk = session.companion?.perk;
    const cost = perk?.type === 'breather_discount' ? Math.round(b.cost * 0.7) : b.cost;
    const healBonus = perk?.type === 'breather_bonus' ? (perk.healBonus || 10) : 0;
    const sanityBonus = perk?.type === 'breather_bonus' ? (perk.sanityBonus || 6) : 0;
    char.stats.wealth = Math.max(0, (char.stats.wealth || 0) - cost);
    char.stats.health = clamp((char.stats.health || 0) + b.health + healBonus, 0, 100);
    char.stats.sanity = clamp((char.stats.sanity || 0) + b.sanity + sanityBonus, 0, 100);
    session.sanityStrain = clamp((session.sanityStrain || 0) + b.strain, 0, 100);
    session.lastStageResult = { type: 'breather', vi: SUPPLY_TEXT.breather.vi, en: SUPPLY_TEXT.breather.en };
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
  if (session.id === ENSEMBLE_DUNGEON_ID && session.ensembleCoda) {
    return {
      stageIndex: session.currentStageIndex,
      nameVi: 'Coda: tiếng nói sau sân khấu', nameEn: 'Coda: the voice behind the stage',
      descVi: 'Tiếng của Carmen chen vào khoảng lặng. Bạn có thể buông mình vào buổi diễn, hoặc giữ lấy điều cuối cùng còn thuộc về mình. Nếu chống lại rồi trượt, bạn sẽ chết.',
      descEn: 'Carmen speaks into the pause. You can surrender to the performance, or hold on to the last thing that is yours. If you resist and fail, you die.',
      choices: [
        { labelVi: 'Nghe theo tiếng nói và ở lại', labelEn: 'Follow the voice and remain', ensembleAccept: true },
        { labelVi: 'Từ chối, giành lại nhịp của mình', labelEn: 'Refuse and reclaim your own beat', ensembleResist: true, checkTrait: 'nerve', checkPenalty: 0.55, fx: { health: -8 } }
      ]
    };
  }
  if (session.mode === 'gauntlet' && session.combat && !session.combat.done) return gauntletStage(COMBAT_CTX, session);
  if (session.inSide && def.sideRoom?.id === session.inSide.id) {
    return { ...def.sideRoom, stageIndex: session.currentStageIndex, isSide: true, sceneLabelVi: 'Ngõ phụ', sceneLabelEn: 'Side room' };
  }
  const idx = session.currentStageIndex;
  const base = def.stages[idx];
  if (!base) return null;
  const stage = session.variant === idx && def.variants?.[idx]
    ? { ...base, ...def.variants[idx], stageIndex: idx, canFlee: base.canFlee, isVariant: true }
    : base;
  if (session.id === ENSEMBLE_DUNGEON_ID) {
    if (idx === 0 && session.ensembleForced) return { ...stage, canFlee: false, choices: stage.choices.filter((choice) => !choice.isFlee) };
    if (idx === 1) return { ...stage, ...(ENSEMBLE_ROUTE_SCENES[session.ensembleRoute] || {}) };
    if (idx === 2 && session.ensembleWitness?.role !== 'record') {
      const nameVi = session.ensembleWitness.nameVi;
      const nameEn = session.ensembleWitness.nameEn;
      return { ...stage, descVi: `${nameVi} đọc lại một quyết định cũ của bạn từ hàng ghế sau. Những bóng người khác ngồi xuống từng chiếc ghế. Không ai vỗ tay.`, descEn: `${nameEn} recites a decision you once made from the rear row. Other figures take their seats one by one. No one applauds.` };
    }
  }
  // A companion can be sent ahead on the two middle stages
  const c = session.companion;
  if (!def.noCompanion && c && idx > 0 && idx < def.stages.length - 1) {
    const lead = {
      labelVi: named(COMPANION_LEAD.labelVi, c, 'vi'), labelEn: named(COMPANION_LEAD.labelEn, c, 'en'),
      companionLead: true, resultVi: '', resultEn: '',
      fx: { sanity: -3, merit: 6 }, lootAhn: 14, strainDelta: 2
    };
    return { ...stage, choices: [...stage.choices, lead] };
  }
  return stage;
}

/** The chance a companion sent ahead comes through: bond, how steady they are, and how dangerous the place is. */
export function companionLeadChance(char, session) {
  const npc = char?.npcs?.[session?.companion?.role];
  if (!npc) return 0;
  const def = DUNGEON_DEFINITIONS[session.id];
  const hazard = def?.hazard === 'ALEPH' ? 0.08 : 0;
  return clamp(0.55 + ((npc.bond ?? 30) - 50) / 160 + (evaluateCompanionSupport(char).dungeonOddsMod || 0) / 100 - hazard, 0.3, 0.9);
}

/**
 * Checks if a specific choice is available based on character state and inventory
 */
export function isDungeonChoiceAvailable(choice, char) {
  if (!choice || !char) return false;
  if (choice.sealed) return false;
  if (choice.needAff && !getAffiliation(char)) return false;
  if (choice.companionLead && !npcIsActive(char.npcs?.[char.pendingDungeon?.companion?.role])) return false;
  if (choice.reqItem) {
    const hasItem = (char.inventory || []).some((it) => it.id === choice.reqItem || it === choice.reqItem);
    if (!hasItem) return false;
  }
  if (choice.costAhn) {
    const playerWealth = char.stats?.wealth ?? char.wealth ?? 0;
    if (playerWealth < choice.costAhn) return false;
  }
  return true;
}

const breakOutcome = (char, session, def, stage, kind) => {
  const haul = Math.round((session.accumulatedLootAhn || 0) * DUNGEON_BALANCE.breakLootKept);
  if (haul > 0) char.stats.wealth = clamp((char.stats.wealth || 0) + haul, 0, 100);
  char.stats.sanity = clamp(Math.max(char.stats.sanity || 0, 6) - 4, 1, 100);
  addScar(char, 'Di chứng sụp đổ tinh thần');
  char.pendingDungeon = null;
  const text = BREAK_TEXT[kind];
  return {
    outcome: 'broken',
    titleVi: text.title.vi,
    titleEn: text.title.en,
    resultVi: text.body.vi,
    resultEn: text.body.en,
    haul: { ahn: haul, merit: session.accumulatedMerit || 0 },
    isDead: false
  };
};

// W Corp does not leave a body on its train. The cleaners put it back, and the invoice grows each time
export const WARP_RESTORES = 2;

function recoveredByCleaners(char, session, def, stage) {
  const done = char.warpRestored || 0;
  if (def.recovery !== 'w_corp' || done >= WARP_RESTORES) return null;
  char.warpRestored = done + 1;
  const fee = Math.ceil((char.stats.wealth || 0) * (done === 0 ? 0.5 : 0.8));
  char.stats.wealth = Math.max(0, (char.stats.wealth || 0) - fee);
  char.stats.health = 22;
  char.stats.sanity = Math.min(char.stats.sanity > 0 ? char.stats.sanity : 12, 18);
  char.pendingDungeon = null;
  if (!(char.flags || []).includes('WarpRestored')) char.flags = [...(char.flags || []), 'WarpRestored'];
  settleRun(char, session, 'broken');
  const last = char.warpRestored >= WARP_RESTORES;
  const vi = `Tim bạn ngừng đập ở ${stage.nameVi}. Thứ cuối cùng bạn nghe là tiếng giày cao su của đội dọn W Corp trên sàn toa tàu. Họ không chạy và không nói. Họ gỡ từng giây ra khỏi người bạn rồi khâu lại theo đúng thứ tự, như dọn một toa tàu. Bạn tỉnh dậy ở sân ga, sạch sẽ, trong bộ đồ không phải của mình, với một hóa đơn trong túi áo. ${last ? 'Dòng cuối của hóa đơn ghi rằng một thân thể chỉ được đặt lại chỗ cũ chừng ấy lần.' : 'Lần sau, hóa đơn sẽ dày hơn.'}`;
  const en = `Your heart stops in ${stage.nameEn}. The last thing you hear is the rubber soles of the W Corp cleaning crew on the carriage floor. They neither run nor speak. They take the seconds out of you one by one and sew them back in the right order, the way one clears a carriage. You wake on the platform, clean, in clothes that are not yours, with an invoice in your pocket. ${last ? 'The last line of the invoice says a body may be put back in its place only this many times.' : 'Next time the invoice will be thicker.'}`;
  char.logs.push({ id: `warp_restored_${char.age}_${char.warpRestored}`, age: char.age, type: 'major', vi: `[W Corp khôi phục] ${vi}`, en: `[Restored by W Corp] ${en}` });
  return {
    char, session: null, isFinished: true,
    resolution: { outcome: 'restored', titleVi: 'Đội dọn W Corp đã đến', titleEn: 'The W Corp cleaners came', resultVi: vi, resultEn: en, haul: { ahn: 0, merit: 0 }, isDead: false }
  };
}

function finishClawJudgment(char, session, stage, escaped) {
  char.pendingDungeon = null;
  char.alive = false;
  if (escaped) {
    char.endingId = 'library_threshold';
    char.regionId = 'OUTSKIRTS';
    char.taboo = 0;
    char.flags = (char.flags || []).filter((flag) => flag !== 'Nest' && flag !== 'Feather');
    if (!char.flags.includes('Outskirts')) char.flags.push('Outskirts');
    if (!(char.unlockedRecords || []).includes('defied_the_claw')) char.unlockedRecords = [...(char.unlockedRecords || []), 'defied_the_claw'];
    if (!(char.unlockedRecords || []).includes('library_threshold')) char.unlockedRecords = [...char.unlockedRecords, 'library_threshold'];
    char.newRecordsThisLife = [...new Set([...(char.newRecordsThisLife || []), 'defied_the_claw', 'library_threshold'])];
    char.deathCauseVi = 'Mất dấu ở ngưỡng cửa The Library trong Outskirts';
    char.deathCauseEn = 'Last seen at the Library threshold in the Outskirts';
    const vi = 'Claw rơi xuống đống đổ nát. Bạn sống, nhưng phía bên kia bức tường không còn đường về. Qua nhiều ngày đi trong Outskirts, bạn thấy một tòa nhà đứng một mình giữa vùng đất trống. Trên cánh cửa có một tấm biển: The Library. Bên trong có tiếng lật trang. Bạn đặt tay lên tay nắm, rồi đẩy cửa bước vào.';
    const en = 'The Claw falls into the ruins. You live, but there is no road back through the wall. After days in the Outskirts, you find a building standing alone in the waste. A sign on its door reads: The Library. From within comes the turn of a page. You take the handle and push the door open.';
    char.logs.push({ id: `ending_library_${char.age}`, age: char.age, type: 'major', vi: `[Ngưỡng cửa The Library] ${vi}`, en: `[The Library Threshold] ${en}` });
    return { outcome: 'library', titleVi: 'Ngưỡng cửa The Library', titleEn: 'The Library Threshold', resultVi: vi, resultEn: en, haul: { ahn: 0, merit: 0 }, isDead: false, isEnding: true };
  }
  char.stats.health = 0;
  char.deathCauseVi = `Bị Claw của C Corp xử lý tại ${stage.nameVi}`;
  char.deathCauseEn = `Executed by a C Corp Claw at ${stage.nameEn}`;
  const vi = 'Claw hoàn thành bản án. Hồ sơ của bạn không còn được B Corp theo dõi.';
  const en = 'The Claw completes the sentence. B Corp no longer has a file to watch.';
  char.logs.push({ id: `death_claw_${char.age}`, age: char.age, type: 'death', vi: `[Án của The Head] ${vi}`, en: `[The Head’s Judgment] ${en}` });
  return { outcome: 'dead', titleVi: 'Án đã thi hành', titleEn: 'Sentence carried out', resultVi: vi, resultEn: en, haul: { ahn: 0, merit: 0 }, isDead: true };
}

/**
 * Resolves a choice taken in the active dungeon
 * Returns updated { char, session, isFinished, resolution }
 */
function ensembleResolution(char, session, outcome, stage) {
  char.pendingDungeon = null;
  if (outcome === 'fled') {
    recordEnsembleRetreat(char);
    const vi = 'Bạn khép cửa trước khi màn kéo lên. Tên mình vẫn còn trên chiếc ghế. Danh tiếng của bạn chịu một vết xước, và lời mời có thể trở lại.';
    const en = 'You close the door before the curtain rises. Your name remains on its seat. Your reputation takes a mark, and the invitation may return.';
    return { outcome, titleVi: 'Rời nhà hát', titleEn: 'Left the theatre', resultVi: vi, resultEn: en, haul: { ahn: 0, merit: 0 }, isDead: false };
  }
  finishEnsembleRun(char, outcome);
  if (outcome === 'dead') {
    char.alive = false;
    char.stats.health = 0;
    char.deathCauseVi = `Chết trong buổi diễn của Reverberation Ensemble (${stage.nameVi})`;
    char.deathCauseEn = `Died in the Reverberation Ensemble's performance (${stage.nameEn})`;
    const vi = 'Sợi dây cuối siết chặt. Argalia hạ tay, và chiếc ghế mang tên bạn đã có người ngồi.';
    const en = 'The final string draws tight. Argalia lowers his hand, and the seat bearing your name is occupied.';
    char.logs.push({ id: `death_ensemble_${char.age}`, age: char.age, type: 'death', vi: `[Buổi diễn không có khán giả] ${vi}`, en: `[The Performance Without an Audience] ${en}` });
    return { outcome, titleVi: 'Chiếc ghế có người ngồi', titleEn: 'The seat is occupied', resultVi: vi, resultEn: en, haul: { ahn: 0, merit: 0 }, isDead: true };
  }
  if (outcome === 'distorted') {
    char.flags = [...(char.flags || [])].filter((flag) => !['EGOAwakened', 'IncompleteEGO', 'ColorFixer'].includes(flag));
    char.isColorFixer = false;
    char.customTitle = null;
    char.colorData = null;
    char.egoName = null;
    char.org = null;
    char.pendingContract = null;
    char.pendingModal = null;
    char.logs.push(...triggerDistortionTransformation(char));
    const vi = 'Bạn giữ được mạng sống bằng cách buông nhịp của mình. Khi bước khỏi sân khấu, hình dáng cũ không còn theo bạn nữa.';
    const en = 'You live by surrendering your own beat. When you leave the stage, your old shape does not follow.';
    return { outcome, titleVi: 'Một giọng khác trong dàn diễn', titleEn: 'Another voice in the ensemble', resultVi: vi, resultEn: en, haul: { ahn: 0, merit: 0 }, isDead: false };
  }
  char.ensembleScore = true;
  if (session.ensembleScarred) {
    char.flags = [...new Set([...(char.flags || []).filter((flag) => flag !== 'EGOAwakened'), 'IncompleteEGO'])];
    char.egoName ||= 'Nhịp còn sót lại';
  }
  char.flags = [...new Set([...(char.flags || []), 'EnsembleSurvivor'])];
  char.unlockedRecords = [...new Set([...(char.unlockedRecords || []), 'ensemble_star_unextinguished'])];
  char.resonance = Math.min(100, (char.resonance || 0) + 6);
  char.stats.sanity = Math.max(8, char.stats.sanity || 0);
  char.inventory = [...(char.inventory || []).filter((item) => (item.id || item) !== ENSEMBLE_SCORE_ITEM.id), { ...ENSEMBLE_SCORE_ITEM }];
  rememberResonance(char, 6);
  const vi = 'Bạn cắt đứt sợi dây cuối. Argalia nhìn khoảng trống trên sân khấu rồi nhường lối ra. Nhà hát vẫn đứng đó; hôm nay nó không giữ được bạn. Bạn mang theo bản tổng phổ viết dở để truyền lại cho đời sau.' + (session.ensembleScarred ? ' Ba dấu Hòa âm đã để lại một E.G.O bất ổn (Volatile), thay cho E.G.O hoàn chỉnh.' : '');
  const en = 'You sever the last string. Argalia studies the gap onstage and steps aside. The theatre remains; today it could not keep you. You carry the Unfinished Score for your successor.' + (session.ensembleScarred ? ' Three Harmony marks have left a Volatile E.G.O in place of a settled one.' : '');
  char.logs.push({ id: `ensemble_survived_${char.age}`, age: char.age, type: 'major', vi: `[Ngôi sao không tắt] ${vi}`, en: `[The star that would not go out] ${en}` });
  return { outcome: 'conquered', titleVi: 'Ngôi sao không tắt', titleEn: 'The star that would not go out', resultVi: vi, resultEn: en, haul: { ahn: 0, merit: 0 }, isDead: false };
}

export function resolveDungeonChoice(charState, choiceIndex, rng = Math.random) {
  const char = { ...charState, stats: { ...charState.stats }, logs: [...(charState.logs || [])] };
  const session = char.pendingDungeon ? { ...char.pendingDungeon, logs: [...(char.pendingDungeon.logs || [])] } : null;
  if (!session) return { char, session: null, isFinished: true, resolution: null };
  if (session.mode === 'gauntlet' && session.combat && !session.combat.done) {
    session.combat = { ...session.combat, plan: session.combat.plan.map((f) => ({ ...f })) };
    const r = resolveGauntletChoice(char, session, choiceIndex, rng, COMBAT_CTX);
    if (!r.isFinished) r.char.pendingDungeon = r.session;
    return r;
  }

  const def = DUNGEON_DEFINITIONS[session.id];
  const stage = def ? getDungeonCurrentStage(session) : null;
  if (!stage) {
    char.pendingDungeon = null;
    return { char, session: null, isFinished: true, resolution: null };
  }

  const choice = stage.choices[choiceIndex];
  if (!choice || !isDungeonChoiceAvailable(choice, char)) return { char, session, isFinished: false, resolution: null };

  if (session.id === ENSEMBLE_DUNGEON_ID) {
    if (choice.isFlee && session.currentStageIndex === 0 && !session.ensembleForced) {
      return { char, session: null, isFinished: true, resolution: ensembleResolution(char, session, 'fled', stage) };
    }
    if (choice.ensembleAccept) {
      return { char, session: null, isFinished: true, resolution: ensembleResolution(char, session, 'distorted', stage) };
    }
    if (session.ensembleCoda) {
      const mastery = getDungeonMastery(def, char);
      const held = rng() < checkChanceOf(choice, char, session, mastery);
      if (!held) return { char, session: null, isFinished: true, resolution: ensembleResolution(char, session, 'dead', stage) };
      char.stats.health = Math.max(0, (char.stats.health || 0) - 8);
      if (char.stats.health <= 0) return { char, session: null, isFinished: true, resolution: ensembleResolution(char, session, 'dead', stage) };
      const spBefore = char.stats.sanity || 0;
      char.stats.sanity = Math.max(8, char.stats.sanity || 0);
      session.sanityStrain = Math.min(65, Math.max(25, (session.sanityStrain || 0) - 34));
      session.ensembleHarmony = 1;
      session.ensembleCoda = false;
      session.stageScanned = false;
      session.egoActive = false;
      session.lastStageResult = { type: 'check_ok', stageNum: session.currentStageIndex + 1, vi: 'Bạn giữ lại được một nhịp của mình. Tiếng nói lùi về phía sau sân khấu.', en: 'You keep one beat of your own. The voice withdraws behind the stage.', hpDelta: -8, spDelta: char.stats.sanity - spBefore };
      const codaLog = { id: `ensemble_coda_${char.age}_${session.currentStageIndex}`, age: char.age, season: char.season || 'Xuân', type: 'choice', choiceVi: choice.labelVi, choiceEn: choice.labelEn, vi: session.lastStageResult.vi, en: session.lastStageResult.en };
      char.logs.push(codaLog);
      session.logs.push(codaLog);
      if (session.ensembleCodaWin) return { char, session: null, isFinished: true, resolution: ensembleResolution(char, session, 'conquered', stage) };
      session.currentStageIndex += 1;
      char.pendingDungeon = session;
      return { char, session, isFinished: false, resolution: null };
    }
  }

  const mastery = getDungeonMastery(def, char);
  const startTier = getStrainTier(session.sanityStrain || 0).id;
  const wasSide = Boolean(session.inSide);
  const lead = Boolean(choice.companionLead);
  const companion = session.companion;
  const companionNpc = companion ? char.npcs?.[companion.role] : null;
  const companionNotes = [];
  let leadText = null;

  let success = true;
  if (lead) success = rng() < companionLeadChance(char, session);
  else if (choice.checkTrait) success = rng() < checkChanceOf(choice, char, session, mastery);

  if (choice.consumeItem && choice.reqItem) {
    char.inventory = (char.inventory || []).filter((it) => (it.id || it) !== choice.reqItem);
  }
  if (choice.costAhn) char.stats.wealth = Math.max(0, (char.stats.wealth || 0) - choice.costAhn);

  const fx = choice.fx || {};
  const resultMult = choice.checkTrait ? (success ? DUNGEON_BALANCE.successDamage : DUNGEON_BALANCE.failDamage) : 1;
  let hpDelta = fx.health < 0
    ? Math.min(-1, Math.ceil(fx.health * damageMultOf(def, char, session, mastery, 'health') * resultMult))
    : healOf(fx.health);
  let spDelta = fx.sanity < 0
    ? Math.min(-1, Math.ceil(fx.sanity * damageMultOf(def, char, session, mastery, 'sanity') * resultMult))
    : healOf(fx.sanity);
  const rewards = def.noRewards ? { wealth: 0, loot: 0, rep: 0, network: 0, merit: 0, resonance: 0 } : stageRewards(choice, session, success);
  let companionStrain = 0;

  if (lead && companion) {
    // The one sent ahead takes the danger: you lose no health, they may
    if (success) {
      moveCompanionBond(char, companion, 2);
      leadText = companionLine('leadOk', companion);
    } else {
      const lossChance = (def.hazard === 'ALEPH' ? 0.16 : 0.1) * ((companionNpc?.bond ?? 30) < 30 ? 1.6 : 1);
      if (rng() < lossChance && applyNpcFate(char, companion.role, 'dead')) {
        leadText = companionLine('leadLost', companion);
        char.stats.sanity = clamp((char.stats.sanity || 0) - 10, 0, 100);
        addScar(char, 'Người đi trước không trở lại');
        if (companion.role === 'mentee') { char.mentee = null; char.flags = (char.flags || []).filter((f) => f !== 'Mentoring'); }
        session.companion = null;
      } else {
        moveCompanionBond(char, companion, -3);
        leadText = companionLine('leadHurt', companion);
      }
    }
  } else if (companion && npcIsActive(companionNpc)) {
    const bond = companionNpc.bond ?? 30;
    const perk = companion.perk || companionNpc.dungeonPerk;

    // Perk: Combat Parry
    if (!success && perk?.type === 'parry' && !session.companionParried && hpDelta < 0) {
      session.companionParried = true;
      hpDelta = 0;
      companionNotes.push({
        vi: `[Gạt đòn thực chiến] ${companion.nameVi} vung đao gạt phăng mũi kích hiểm hóc trước khi nó kịp chạm vào bạn.`,
        en: `[Combat Parry] ${companion.nameEn} deflected the lethal strike just before it touched you.`
      });
    }

    // Perk: Moral Beacon (Calm)
    if (perk?.type === 'calm' && spDelta < 0) {
      spDelta = Math.min(0, spDelta + (perk.sanityRestore || 8));
      companionNotes.push({
        vi: `[Ngọn hải đăng] Ánh mắt kiên định của ${companion.nameVi} xua tan cơn hoảng loạn, neo giữ tâm trí bạn.`,
        en: `[Moral Beacon] ${companion.nameEn} anchored your mind against creeping madness.`
      });
    }

    if (!success && choice.checkTrait && bond >= 60 && !session.companionSaved && rng() < 0.5) {
      hpDelta = Math.min(-1, Math.ceil(hpDelta / 2));
      session.companionSaved = true;
      companionNotes.push(companionLine('saved', companion));
    } else if (!success && bond < 30 && !session.companionBalked && rng() < 0.5) {
      session.companionBalked = true;
      companionStrain = 8;
      companionNotes.push(companionLine('balked', companion));
    }
  }

  char.stats.health = clamp((char.stats.health || 0) + hpDelta, 0, 100);
  char.stats.sanity = clamp((char.stats.sanity || 0) + spDelta, 0, 100);

  // Companion Mortal Shield Intervention
  if (char.stats.health <= 0 && companion && npcIsActive(companionNpc) && !session.companionShieldUsed) {
    const perk = companion.perk || companionNpc.dungeonPerk;
    const canShield = (perk?.type === 'shield' || char.companionSynergy?.active);
    if (canShield) {
      session.companionShieldUsed = true;
      char.stats.health = 5;
      companionNpc.status = 'wounded';
      companionNpc.bond = Math.min(100, (companionNpc.bond || 50) + 15);
      const shieldMemVi = `Năm ${char.age || 0} tuổi: Đỡ đòn chí mạng thay bạn trong ${def.titleVi}.`;
      const shieldMemEn = `Age ${char.age || 0}: Absorbed a mortal strike for you in ${def.titleEn}.`;
      companionNpc.memories = [...(companionNpc.memories || []), { age: char.age || 0, vi: shieldMemVi, en: shieldMemEn }].slice(-6);
      char.npcs[companion.role] = companionNpc;
      companionNotes.push({
        vi: `[Tấm khiên sinh tử] ${companion.nameVi} lao mình chắn ngang nhát chém kết liễu, máu nhuộm đỏ giáp vai: "Rút đi... đừng để cả hai cùng bỏ mạng ở đây!"`,
        en: `[Mortal Shield] ${companion.nameEn} threw themselves in front of the killing stroke, armor drenched in crimson: "Retreat... do not let both of us die here!"`
      });
    }
  }
  if (rewards.wealth) char.stats.wealth = clamp((char.stats.wealth || 0) + rewards.wealth, 0, 100);
  if (rewards.rep) char.stats.rep = clamp((char.stats.rep || 0) + rewards.rep, 0, 100);
  if (rewards.network) char.stats.network = clamp((char.stats.network || 0) + rewards.network, 0, 100);
  if (rewards.resonance) char.resonance = clamp((char.resonance || 0) + rewards.resonance, 0, 100);
  rememberResonance(char, rewards.resonance || 0);
  if (rewards.merit) char.merit = Math.max(0, (char.merit || 0) + rewards.merit);
  if (fx.heat) char.heat = Math.max(0, (char.heat || 0) + fx.heat);
  if (fx.taboo) char.taboo = Math.max(0, (char.taboo || 0) + fx.taboo);

  session.accumulatedLootAhn = (session.accumulatedLootAhn || 0) + rewards.loot;
  session.accumulatedMerit = (session.accumulatedMerit || 0) + rewards.merit;

  const stance = STANCE[session.stance || 'balanced'];
  const colorCalm = isColorRank(char) ? DUNGEON_BALANCE.ego.color.strainMult : 1;
  const rawStrain = ((stage.strainGain || 15) + (choice.strainDelta || 0)) * stance.strain * (session.stageScanned ? 0.5 : 1) * colorCalm;
  session.sanityStrain = clamp((session.sanityStrain || 0) + Math.round(rawStrain) + (success ? 0 : DUNGEON_BALANCE.failStrain) + companionStrain, 0, 100);
  if (session.id === ENSEMBLE_DUNGEON_ID) session.ensembleHarmony = Math.min(3, (session.ensembleHarmony || 0) + (choice.ensembleHarmony || 0));

  const notes = [];
  if (leadText) {
    notes.push(leadText);
  } else if (!success) {
    const text = FAIL_TEXT[def.theme]?.[choice.checkTrait] || GENERIC_FAIL;
    notes.push({ vi: choice.failVi || text.vi, en: choice.failEn || text.en });
  }
  notes.push(...companionNotes);

  let broke = null;
  let resolveEvent = null;
  if (session.sanityStrain >= 80 && !session.resolveAwakened && char.stats.health > 0 && session.sanityStrain < DUNGEON_BALANCE.breakAt && !(session.id === ENSEMBLE_DUNGEON_ID && char.stats.sanity <= 0)) {
    const holds = char.stats.sanity >= 35 || (char.flags || []).includes('EGOAwakened') || rng() < 0.65;
    if (holds) {
      session.resolveAwakened = true;
      session.sanityStrain = Math.max(20, session.sanityStrain - 35);
      char.stats.sanity = clamp((char.stats.sanity || 0) + 12, 0, 100);
      char.resonance = clamp((char.resonance || 0) + 6, 0, 100);
      rememberResonance(char, 6);
      resolveEvent = 'won';
      notes.push({ vi: STRAIN_NOTES.resolveWon.vi, en: STRAIN_NOTES.resolveWon.en });
    } else {
      session.sanityStrain = Math.max(45, session.sanityStrain - 25);
      char.stats.sanity = clamp((char.stats.sanity || 0) - 6, 0, 100);
      resolveEvent = 'lost';
      notes.push({ vi: STRAIN_NOTES.resolveLost.vi, en: STRAIN_NOTES.resolveLost.en });
    }
  } else {
    const nowTier = getStrainTier(session.sanityStrain).id;
    if (nowTier !== startTier && STRAIN_NOTES[nowTier]) notes.push({ vi: STRAIN_NOTES[nowTier].vi, en: STRAIN_NOTES[nowTier].en });
  }

  if (!success && char.stats.health > 0 && char.stats.health <= 20) addScar(char, `Vết cào hằn từ ${def.titleVi}`);
  if (choice.scarAdd) addScar(char, choice.scarAdd);
  for (const flag of choice.flagAdd || []) if (!(char.flags || []).includes(flag)) char.flags = [...(char.flags || []), flag];
  if (choice.later?.length) {
    const threads = choice.later.map((l, i) => ({
      id: `thr_${char.age}_${l.id}_${i}`,
      kind: 'major',
      eventId: l.id,
      plantedAtAge: char.age,
      triggerAge: char.age + (l.years || 3),
      reasonVi: l.reasonVi,
      reasonEn: l.reasonEn,
      fulfilled: false
    }));
    char.weaver = { ...char.weaver, pendingThreads: [...(char.weaver?.pendingThreads || []), ...threads] };
  }
  if (choice.recordAdd && !(char.unlockedRecords || []).includes(choice.recordAdd)) {
    char.unlockedRecords = [...(char.unlockedRecords || []), choice.recordAdd];
  }

  // The first note replaces the result text when the stage did not go as written (a failed check, a companion's run)
  const headless = !success || lead;
  const resultVi = headless ? notes[0].vi : choice.resultVi;
  const resultEn = headless ? notes[0].en : choice.resultEn;
  const extraVi = notes.slice(headless ? 1 : 0).map((n) => n.vi).join(' ');
  const extraEn = notes.slice(headless ? 1 : 0).map((n) => n.en).join(' ');
  session.stageScanned = false;
  session.egoActive = false;
  if (dungeonUsesCards(def)) Object.assign(session, nextHand(session, char));
  const stageTagVi = wasSide ? `Ngõ phụ: ${stage.nameVi}` : `Chặng ${session.currentStageIndex + 1}: ${stage.nameVi}`;
  const stageTagEn = wasSide ? `Side room: ${stage.nameEn}` : `Stage ${session.currentStageIndex + 1}: ${stage.nameEn}`;
  session.lastStageResult = {
    type: choice.checkTrait || lead ? (success ? 'check_ok' : 'check_fail') : 'stage_clear',
    stageNum: session.currentStageIndex + 1,
    stageNameVi: stage.nameVi,
    stageNameEn: stage.nameEn,
    vi: `${resultVi}${extraVi ? ` ${extraVi}` : ''}`,
    en: `${resultEn}${extraEn ? ` ${extraEn}` : ''}`,
    hpDelta,
    spDelta,
    lootGain: rewards.loot + Math.max(0, rewards.wealth),
    resolve: resolveEvent
  };

  const stageLog = {
    id: `log_dungeon_${session.id}_${session.currentStageIndex}_${Date.now()}`,
    age: char.age,
    season: char.season || 'Xuân',
    type: 'story',
    vi: `[${def.titleVi} · ${stageTagVi}] ${session.lastStageResult.vi}`,
    en: `[${def.titleEn} · ${stageTagEn}] ${session.lastStageResult.en}`
  };
  char.logs.push(stageLog);
  session.logs.push(stageLog);

  if (session.id === ENSEMBLE_DUNGEON_ID) {
    const lastAct = session.currentStageIndex === def.stages.length - 1;
    if (char.stats.health <= 0 || (lastAct && !success)) {
      return { char, session: null, isFinished: true, resolution: ensembleResolution(char, session, 'dead', stage) };
    }
    if (char.stats.sanity <= 0 || session.sanityStrain >= DUNGEON_BALANCE.breakAt || session.ensembleHarmony >= 3) {
      if (session.ensembleHarmony >= 3) session.ensembleScarred = true;
      session.ensembleCoda = true;
      session.ensembleCodaWin = lastAct && success;
      char.pendingDungeon = session;
      return { char, session, isFinished: false, resolution: null };
    }
    if (lastAct) return { char, session: null, isFinished: true, resolution: ensembleResolution(char, session, 'conquered', stage) };
  }

  if (def.fatalOnBreak && (char.stats.health <= 0 || char.stats.sanity <= 0 || session.sanityStrain >= DUNGEON_BALANCE.breakAt)) {
    const resolution = finishClawJudgment(char, session, stage, false);
    return { char, session: null, isFinished: true, resolution };
  }

  if (char.stats.health <= 0) {
    const restored = recoveredByCleaners(char, session, def, stage);
    if (restored) return restored;
    char.alive = false;
    char.deathCauseVi = def.recovery === 'w_corp' ? `Đội dọn W Corp không khôi phục được nữa (${stage.nameVi})` : def.fall ? `${def.fall.causeVi} (${stage.nameVi})` : `Bỏ mạng trong ${def.titleVi} (${stage.nameVi})`;
    char.deathCauseEn = def.recovery === 'w_corp' ? `Beyond what the W Corp cleaners could put back (${stage.nameEn})` : def.fall ? `${def.fall.causeEn} (${stage.nameEn})` : `Perished in ${def.titleEn} (${stage.nameEn})`;
    char.pendingDungeon = null;
    const title = ENDING_TEXT.dead.title({ vi: def.titleVi, en: def.titleEn });
    const body = def.fall ? { vi: def.fall.vi, en: def.fall.en } : ENDING_TEXT.dead.body({ vi: stage.nameVi, en: stage.nameEn });
    return {
      char,
      session: null,
      isFinished: true,
      resolution: {
        outcome: 'dead',
        titleVi: title.vi,
        titleEn: title.en,
        resultVi: body.vi,
        resultEn: body.en,
        haul: { ahn: 0, merit: session.accumulatedMerit || 0 },
        isDead: true
      }
    };
  }

  if (char.stats.sanity <= 0 || session.sanityStrain >= DUNGEON_BALANCE.breakAt) {
    broke = breakOutcome(char, session, def, stage, char.stats.sanity <= 0 ? 'mind' : 'strain');
    settleRun(char, session, 'broken');
    return { char, session: null, isFinished: true, resolution: broke };
  }

  const isFlee = Boolean(choice.isFlee);
  const isLastStage = !wasSide && session.currentStageIndex >= def.stages.length - 1;

  if (def.fatalOnFinalFailure && isLastStage) {
    const resolution = finishClawJudgment(char, session, stage, success);
    return { char, session: null, isFinished: true, resolution };
  }

  if (isFlee || isLastStage) {
    const c = DUNGEON_BALANCE.conquest;
    const conquered = !isFlee && isLastStage;
    if (conquered && choice.reportAff) {
      const a = getAffiliation(char);
      if (a) moveStanding(char, 8 + ((REPORT_FIT[def.id] || []).includes(a.id) ? 6 : 0));
    }
    const runNotes = settleRun(char, session, conquered ? 'conquered' : 'fled');
    const tailVi = runNotes.map((n) => n.vi).join(' ');
    const tailEn = runNotes.map((n) => n.en).join(' ');
    if (tailVi) {
      session.lastStageResult = { ...session.lastStageResult, vi: `${session.lastStageResult.vi} ${tailVi}`, en: `${session.lastStageResult.en} ${tailEn}` };
    }
    const totalLoot = (session.accumulatedLootAhn || 0) + (conquered ? c.ahn : 0);
    if (totalLoot > 0) char.stats.wealth = clamp((char.stats.wealth || 0) + totalLoot, 0, 100);
    if (conquered) {
      char.stats.health = clamp((char.stats.health || 0) + c.health, 0, 100);
      char.stats.sanity = clamp((char.stats.sanity || 0) + c.sanity, 0, 100);
      char.merit = (char.merit || 0) + c.merit;
      session.accumulatedMerit = (session.accumulatedMerit || 0) + c.merit;
    }
    char.pendingDungeon = null;
    const name = { vi: def.titleVi, en: def.titleEn };
    const ending = conquered ? ENDING_TEXT.conquered : ENDING_TEXT.fled;
    const title = ending.title(name);
    return {
      char,
      session: null,
      isFinished: true,
      resolution: {
        outcome: conquered ? 'conquered' : 'fled',
        titleVi: title.vi,
        titleEn: title.en,
        resultVi: `${session.lastStageResult.vi}\n\n${ending.body.vi}`,
        resultEn: `${session.lastStageResult.en}\n\n${ending.body.en}`,
        haul: { ahn: totalLoot + Math.max(0, rewards.wealth), merit: session.accumulatedMerit || 0 },
        isDead: false
      }
    };
  }

  // Where the route goes next: back from a side room, into one, down a shortcut, or one stage on
  if (wasSide) {
    session.currentStageIndex = session.inSide.returnTo;
    session.inSide = null;
  } else if (success && choice.side && def.sideRoom?.id === choice.side) {
    session.inSide = { id: choice.side, returnTo: session.currentStageIndex + 1 };
  } else if (success && Number.isInteger(choice.goto) && choice.goto > session.currentStageIndex) {
    session.currentStageIndex = choice.goto;
  } else {
    session.currentStageIndex += 1;
  }
  char.pendingDungeon = session;

  return { char, session, isFinished: false, resolution: null };
}

/**
 * Direct retreat action from dungeon
 */
export function fleeDungeon(charState) {
  const char = { ...charState, stats: { ...charState.stats }, logs: [...(charState.logs || [])] };
  const session = char.pendingDungeon;
  if (!session) return { char, session: null, isFinished: true };

  const def = DUNGEON_DEFINITIONS[session.id];
  if (session.id === ENSEMBLE_DUNGEON_ID) {
    if (session.currentStageIndex > 0 || session.ensembleForced || session.ensembleCoda) return { char: charState, session, isFinished: false, resolution: null };
    const stage = getDungeonCurrentStage(session);
    return { char, session: null, isFinished: true, resolution: ensembleResolution(char, session, 'fled', stage) };
  }
  if (def?.noRetreat || def?.locked || (session.mode === 'gauntlet' && !canLeaveGauntlet(session))) return { char: charState, session, isFinished: false, resolution: null };
  const haul = session.accumulatedLootAhn || 0;
  if (haul > 0) char.stats.wealth = clamp((char.stats.wealth || 0) + haul, 0, 100);
  settleRun(char, session, 'fled');
  char.pendingDungeon = null;

  const title = ENDING_TEXT.fled.title({ vi: def?.titleVi || 'Hầm Ngục', en: def?.titleEn || 'Dungeon' });
  return {
    char,
    session: null,
    isFinished: true,
    resolution: {
      outcome: 'fled',
      titleVi: title.vi,
      titleEn: title.en,
      resultVi: ENDING_TEXT.fled.body.vi,
      resultEn: ENDING_TEXT.fled.body.en,
      haul: { ahn: haul, merit: session.accumulatedMerit || 0 },
      isDead: false
    }
  };
}

/** Everything the gauntlet module needs from here, so it never imports this file back. */
const COMBAT_CTX = {
  def: (session) => DUNGEON_DEFINITIONS[session.id],
  damageMult: (def, char, session, kind) => damageMultOf(def, char, session, getDungeonMastery(def, char), kind),
  hazardOf: (def) => DUNGEON_BALANCE.hazardDamage[def?.hazard] || 1,
  traitFactor,
  mastery: (char, session) => getDungeonMastery(DUNGEON_DEFINITIONS[session.id], char),
  strainCheck: (session) => getStrainTier(session.sanityStrain || 0).check,
  strainMult: (char, session) => STANCE[session.stance || 'balanced'].strain * (isColorRank(char) ? DUNGEON_BALANCE.ego.color.strainMult : 1),
  lootMult: (session) => STANCE[session.stance || 'balanced'].loot,
  companionLeadChance,
  companionActive: (session) => Boolean(session.companion),
  companionBond: (char, session) => char.npcs?.[session.companion?.role]?.bond ?? 30,
  moveCompanionBond,
  companionLine,
  lastCompanionLine: null,
  loseCompanion(char, session) {
    const c = session.companion;
    if (!c || !applyNpcFate(char, c.role, 'dead')) return false;
    COMBAT_CTX.lastCompanionLine = companionLine('leadLost', c);
    char.stats.sanity = clamp((char.stats.sanity || 0) - 10, 0, 100);
    addScar(char, 'Người đi trước không trở lại');
    if (c.role === 'mentee') {
      char.mentee = null;
      char.flags = (char.flags || []).filter((f) => f !== 'Mentoring');
    }
    session.companion = null;
    return true;
  },
  log(char, session, def, stage, result) {
    const entry = {
      id: `log_dungeon_${session.id}_f${session.combat?.floor ?? 0}_${session.fxNonce || 0}_${char.logs.length}`,
      age: char.age,
      season: char.season || 'Xuân',
      type: 'story',
      vi: `[${def.titleVi} · ${stage.sceneLabelVi || stage.nameVi}: ${stage.nameVi}] ${result.vi}`,
      en: `[${def.titleEn} · ${stage.sceneLabelEn || stage.nameEn}: ${stage.nameEn}] ${result.en}`
    };
    char.logs.push(entry);
    session.logs.push(entry);
  },
  breakAt: DUNGEON_BALANCE.breakAt,
  fatalBreak: (def) => Boolean(def.fatalOnBreak),
  finishJudgment: (char, session, stage, escaped) => ({ char, session: null, isFinished: true, resolution: finishClawJudgment(char, session, stage, escaped) }),
  finishDead(char, session, def, stage) {
    const restored = recoveredByCleaners(char, session, def, stage);
    if (restored) return restored;
    char.alive = false;
    char.deathCauseVi = def.recovery === 'w_corp' ? `Đội dọn W Corp không khôi phục được nữa (${stage.nameVi})` : def.fall ? `${def.fall.causeVi} (${stage.nameVi})` : `Bỏ mạng trong ${def.titleVi} (${stage.nameVi})`;
    char.deathCauseEn = def.recovery === 'w_corp' ? `Beyond what the W Corp cleaners could put back (${stage.nameEn})` : def.fall ? `${def.fall.causeEn} (${stage.nameEn})` : `Perished in ${def.titleEn} (${stage.nameEn})`;
    char.pendingDungeon = null;
    const title = ENDING_TEXT.dead.title({ vi: def.titleVi, en: def.titleEn });
    const body = def.fall ? { vi: def.fall.vi, en: def.fall.en } : ENDING_TEXT.dead.body({ vi: stage.nameVi, en: stage.nameEn });
    return {
      char, session: null, isFinished: true,
      resolution: { outcome: 'dead', titleVi: title.vi, titleEn: title.en, resultVi: body.vi, resultEn: body.en, haul: { ahn: 0, merit: session.accumulatedMerit || 0 }, isDead: true }
    };
  },
  finishBroken(char, session, def, stage) {
    const resolution = breakOutcome(char, session, def, stage, char.stats.sanity <= 0 ? 'mind' : 'strain');
    settleRun(char, session, 'broken');
    return { char, session: null, isFinished: true, resolution };
  },
  finishFled(char, session, text) {
    const def = DUNGEON_DEFINITIONS[session.id];
    const haul = session.accumulatedLootAhn || 0;
    if (haul > 0) char.stats.wealth = clamp((char.stats.wealth || 0) + haul, 0, 100);
    const notes = settleRun(char, session, 'fled');
    char.pendingDungeon = null;
    const title = ENDING_TEXT.fled.title({ vi: def.titleVi, en: def.titleEn });
    const tailVi = notes.map((n) => n.vi).join(' ');
    const tailEn = notes.map((n) => n.en).join(' ');
    return {
      char, session: null, isFinished: true,
      resolution: {
        outcome: 'fled', titleVi: title.vi, titleEn: title.en,
        resultVi: `${text.vi}${tailVi ? ` ${tailVi}` : ''}\n\n${ENDING_TEXT.fled.body.vi}`,
        resultEn: `${text.en}${tailEn ? ` ${tailEn}` : ''}\n\n${ENDING_TEXT.fled.body.en}`,
        haul: { ahn: haul, merit: session.accumulatedMerit || 0 },
        isDead: false
      }
    };
  }
};
