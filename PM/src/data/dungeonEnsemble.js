import { ENSEMBLE_DUNGEON_ID, ENSEMBLE_INVITE_ID, ENSEMBLE_LAST_CALL_ID } from '../engine/ensemblePath.js';

export const ENSEMBLE_SCORE_ITEM = {
  id: 'spc_unfinished_score', type: 'special', nameVi: 'Bản tổng phổ viết dở', nameEn: 'The Unfinished Score',
  descVi: 'Một trang nhạc không có nốt. Mép giấy ghi tên người đã rời sân khấu.',
  descEn: 'A page of music without notes. The name of the one who left the stage is written along its edge.'
};

export const ENSEMBLE_EVENTS = [
  {
    id: ENSEMBLE_INVITE_ID, age: [30, 140], major: true, weight: 0, repeatable: true,
    vi: '[Một ghế mang tên bạn] Trước cửa có một tấm vé không ghi nơi gửi. Mặt sau là sơ đồ nhà hát đã đóng cửa. Một chiếc ghế trong đó mang tên bạn. Dưới sơ đồ, nét mực xanh viết: Argalia sẽ chờ đến khi bạn quyết định.\n\nBốn hồi, đi một mình, chỉ một lượt tiếp tế. HP cạn hoặc trượt kiểm định cuối sẽ chết; SP cạn mở lựa chọn trở thành Distortion hoặc chống lại Carmen. Có thể rời ở hồi đầu với giá 8 Danh tiếng. Được từ chối hai lần; sau lần thứ hai có một năm chuẩn bị trước khi buổi diễn bắt buộc bắt đầu.',
    en: '[A seat with your name] An unsigned ticket waits at your door. On the back is a plan of a shuttered theatre. One seat bears your name. Beneath it, blue ink reads: Argalia will wait for your answer.\n\nFour acts, alone, with one supply use. Zero HP or a failed final check means death; zero SP opens a choice to become a Distortion or resist Carmen. You may leave during the opening act for 8 Reputation. Two refusals are allowed; after the second, you have one year to prepare before the performance begins by force.',
    choices: [
      { labelVi: 'Đến nhà hát', labelEn: 'Go to the theatre', startDungeon: ENSEMBLE_DUNGEON_ID,
        resultVi: 'Bạn đẩy cửa. Trên sân khấu, Argalia hạ tay xuống. Không ai chơi nhạc, nhưng những sợi dây đã rung.',
        resultEn: 'You open the door. Onstage, Argalia lowers his hand. Nobody plays a note, yet the strings have begun to move.' },
      { labelVi: 'Trả tấm vé về địa chỉ cũ', labelEn: 'Return the ticket to its old address', ensembleDecline: true,
        resultVi: 'Tấm vé trở lại trước cửa nhà bạn vào sáng hôm sau. Lần này ghế của bạn đã được khoanh tròn.',
        resultEn: 'The ticket is back at your door by morning. This time, your seat has been circled.' }
    ]
  },
  {
    id: ENSEMBLE_LAST_CALL_ID, age: [30, 140], major: true, weight: 0, repeatable: true,
    vi: '[Buổi diễn đã bắt đầu] Hai lần bạn gửi trả vé. Một năm trước, những người quen bắt đầu nghe thấy tiếng ghế kéo trên sàn khi phòng họ trống. Giờ cửa nhà hát mở ra ngay cuối hành lang của bạn. Argalia đã dành đủ thời gian cho lời từ chối.\n\nLần này không có đường rút: bốn hồi, đi một mình, một lượt tiếp tế. HP cạn hoặc trượt kiểm định cuối sẽ chết. SP cạn: theo Carmen để thành Distortion, hoặc chống lại bằng một kiểm định có thể chết.',
    en: '[The performance has begun] You returned the ticket twice. For a year, people close to you heard chairs scraping across empty rooms. Now the theatre door opens at the end of your hall. Argalia has given your refusals enough time.\n\nNo retreat this time: four acts, alone, with one supply use. Zero HP or a failed final check means death. At zero SP, follow Carmen into Distortion or resist in a check that can kill you.',
    choices: [
      { labelVi: 'Bước vào dưới ánh đèn trống', labelEn: 'Enter beneath the empty lights', startDungeon: ENSEMBLE_DUNGEON_ID,
        resultVi: 'Cánh cửa đóng lại sau lưng. Tấm vé cháy thành tro trong tay bạn. Không còn lối rời trước khi buổi diễn kết thúc.',
        resultEn: 'The door shuts behind you. The ticket burns to ash in your hand. There will be no exit before the performance ends.' }
    ]
  }
];

const beat = (labelVi, labelEn, resultVi, resultEn, failVi, failEn, checkTrait, checkPenalty, fx, strainDelta, harmony = 0) => ({
  labelVi, labelEn, resultVi, resultEn, failVi, failEn, checkTrait, checkPenalty, fx, strainDelta, ensembleHarmony: harmony
});

export const ENSEMBLE_DUNGEON = {
  id: ENSEMBLE_DUNGEON_ID,
  theme: 'ensemble',
  titleVi: 'Buổi diễn không có khán giả',
  titleEn: 'The Performance Without an Audience',
  hazard: 'ALEPH',
  noCompanion: true,
  noRewards: true,
  noWager: true,
  kickerVi: 'Reverberation Ensemble · Argalia',
  kickerEn: 'Reverberation Ensemble · Argalia',
  accentColor: '#b8a1df',
  stages: [
    {
      stageIndex: 0, canFlee: true,
      nameVi: 'Overture: chiếc ghế trống', nameEn: 'Overture: the empty seat',
      descVi: 'Khán phòng không có ai. Tên bạn được khắc lên một chiếc ghế ở hàng đầu. Argalia đưa tay lên. Những sợi dây trên trần kéo căng, đủ để bạn thấy nhịp trước khi chúng quất xuống.',
      descEn: 'The auditorium is empty. Your name is cut into a seat in the front row. Argalia raises a hand. The strings above draw taut, showing you the beat before they fall.',
      strainGain: 9,
      choices: [
        beat('Bước theo nhịp Argalia để tránh dây', 'Follow Argalia’s beat beneath the strings', 'Bạn qua được hàng dây đầu tiên. Một âm thanh vừa vặn với hơi thở của bạn còn mắc lại trong cổ.', 'You pass the first row of strings. A sound that fits your breath remains in your throat.', 'Nhịp đổi khi bạn bước xuống. Sợi dây rạch qua cánh tay.', 'The beat changes as you step down. A string opens your arm.', 'nerve', -0.12, { health: -5, sanity: 6 }, -5, 1),
        beat('Đếm nhịp riêng và cắt sợi dây chính', 'Count your own beat and cut the lead string', 'Sợi dây bật đứt. Tiếng căng trong căn phòng giảm đi một bậc.', 'The lead string snaps. The pressure in the room loosens by one measure.', 'Bạn cắt trượt. Dây quấn quanh cổ tay, kéo bạn về phía ghế mang tên mình.', 'Your cut misses. A string closes on your wrist and draws you toward your named seat.', 'vigor', 0.04, { health: -7, sanity: -4 }, 1),
      ]
    },
    {
      stageIndex: 1,
      nameVi: 'Một ghế đã có người', nameEn: 'One seat is occupied',
      descVi: 'Một người trong Ensemble đã ngồi lên chiếc ghế đối diện. Họ không hỏi bạn là ai. Hồ sơ con đường bạn đi đã nằm mở trên đầu gối họ.',
      descEn: 'A member of the Ensemble occupies the opposite seat. They do not ask who you are. A record of your path lies open across their knees.',
      strainGain: 14,
      choices: [
        beat('Nhận lời đề nghị và đi qua lối họ chỉ', 'Take the offered passage', 'Bạn đi qua sân khấu mà không phải giao chiến. Từ phía sau, ai đó bắt đầu hát đúng nhịp chân bạn.', 'You cross the stage without a clash. Behind you, someone begins to sing to the pace of your steps.', 'Lối đi gập lại. Một vết cắt nằm ở nơi bạn vừa đứng.', 'The passage folds shut. A cut lands where you stood.', 'luck', -0.1, { health: -8, sanity: 8 }, -7, 1),
        beat('Từ chối và giữ chỗ đứng của mình', 'Refuse and hold your ground', 'Họ khép hồ sơ. Ghế đối diện trống đi, còn đường của bạn vẫn là của bạn.', 'They close the record. The opposite seat empties; your path remains yours.', 'Bìa hồ sơ bật mở giữa đòn đánh. Bạn mất một nhịp để nhớ tại sao mình có mặt ở đây.', 'The record opens mid-strike. You lose a beat remembering why you came.', 'vigor', 0.1, { health: -10, sanity: -6 }, 2)
      ]
    },
    {
      stageIndex: 2,
      nameVi: 'Những hàng ghế dần đầy', nameEn: 'The seats begin to fill',
      descVi: 'Từ hàng ghế sau, một giọng quen đọc lại một quyết định cũ của bạn. Những bóng người ngồi xuống từng chiếc ghế. Không ai vỗ tay. Họ chỉ đợi bạn phủ nhận hoặc nhận lấy việc mình đã làm.',
      descEn: 'From the rear rows, a familiar voice recites a decision you once made. Figures take their seats one by one. No one applauds. They wait for you to deny it or own it.',
      strainGain: 18,
      choices: [
        beat('Nói điều họ muốn nghe để tiếng nói dừng lại', 'Say what they want to hear and silence the voices', 'Các hàng ghế im lặng. Tiếng nói ấy vẫn tiếp tục ở phía sau mắt bạn.', 'The rows fall silent. The voice continues behind your eyes.', 'Lời nói mắc lại trong cổ. Những chiếc ghế cùng xoay về phía bạn.', 'The words catch in your throat. Every chair turns toward you.', 'nerve', -0.08, { health: -4, sanity: 10 }, -9, 1),
        beat('Gọi đúng tên người ấy và nhận lấy ký ức', 'Name the person and own the memory', 'Bóng người không biến mất. Họ ngồi yên, và bạn bước tiếp dù vẫn bị nhìn theo.', 'The figure does not vanish. They sit still, and you walk on beneath their gaze.', 'Bạn nhớ được tên, rồi nhớ thêm những điều mình đã cố quên.', 'You remember the name, then all the details you tried to leave behind.', 'nerve', 0.13, { health: -5, sanity: -11 }, 2)
      ]
    },
    {
      stageIndex: 3,
      nameVi: 'Finale: bàn tay người chỉ huy', nameEn: 'Finale: the conductor’s hand',
      descVi: 'Argalia đứng dưới sân khấu. Ông không rút kiếm. Một cử động của bàn tay ấy đủ khiến mọi sợi dây trong phòng tìm đến bạn. Phía sau ông là cửa ra. Bạn chỉ cần giữ được một nhịp thuộc về mình.',
      descEn: 'Argalia stands below the stage. He does not draw his blade. One movement of his hand sends every string in the room toward you. The exit stands behind him. You need to keep one beat of your own.',
      strainGain: 19,
      choices: [
        beat('Hòa vào nhịp diễn và chạm tới cửa', 'Join the measure and reach the door', 'Bạn chạm vào tay nắm. Khúc nhạc đi theo tới tận cửa. Ba nhịp cuối trùng với nhịp thở của bạn, và tiếng Carmen cất lên.', 'Your hand finds the door. The final three beats match your breathing, and Carmen speaks.', 'Bạn chỉ còn nghe thấy nhịp của Argalia. Cửa ra biến mất sau lưng ông.', 'Only Argalia’s measure remains audible. The door vanishes behind him.', 'luck', 0.25, { health: -11, sanity: -10 }, 9, 3),
        { ...beat('Phá dây cuối cùng bằng nhịp của chính mình', 'Break the last string on your own beat', 'Sợi dây cuối đứt. Argalia hạ tay. Ông nhường đường, vẫn giữ nguyên nụ cười.', 'The final string parts. Argalia lowers his hand and steps aside, still smiling.', 'Bạn đánh trước khi dây căng. Argalia đổi nhịp và lưỡi dây đi qua ngực bạn.', 'You strike before the string is taut. Argalia changes the beat and it crosses your chest.', 'nerve', 0, { health: -14, sanity: -12 }, 4), checkScale: 0.36, checkFloor: 0.05 },
        { labelVi: 'Buông nhịp của mình và ở lại sân khấu', labelEn: 'Give up your beat and remain onstage', ensembleAccept: true, fx: {} }
      ]
    }
  ]
};

export const ENSEMBLE_ROUTE_SCENES = {
  color: { nameVi: 'Tanya: lối đi không còn an toàn', nameEn: 'Tanya: nowhere left to retreat', descVi: 'Tanya bước ra khỏi bóng cánh gà. Cô đã nghe đủ lời hứa chiến thắng từ các Fixer. Cô muốn biết khi không còn ai đứng xem, bạn vẫn sẽ đứng thẳng chứ.', descEn: 'Tanya emerges from the wings. She has heard enough promises of victory from Fixers. She wants to know whether you still stand when nobody watches.' },
  finger: { nameVi: 'Pluto: bản hợp đồng không chữ ký', nameEn: 'Pluto: a contract without a signature', descVi: 'Pluto đặt một bản hợp đồng lên ghế. Chỗ ký tên để trống. Ông đọc chính xác những món nợ con đường Finger đã để lại cho bạn.', descEn: 'Pluto lays a contract on the seat. The signature line is blank. He recites the debts your Finger path has left behind.' },
  wing: { nameVi: 'Jae-heon: bản ghi bị cắt bỏ', nameEn: 'Jae-heon: the deleted record', descVi: 'Jae-heon kéo một con rối qua lối giữa. Trên áo nó là số hồ sơ Wing từng xóa. Các sợi dây của nó chuyển động theo nhịp thở của bạn.', descEn: 'Jae-heon draws a puppet down the aisle. Its coat bears the number of a file your Wing erased. Its strings move with your breathing.' },
  workshop: { nameVi: 'Eileen: cỗ máy giữ nhịp', nameEn: 'Eileen: the machine that keeps time', descVi: 'Eileen mở một hộp bánh răng trước mặt bạn. Mỗi răng được mài đúng cỡ của một bộ phận bạn từng chế tạo. Bà mời bạn để cỗ máy chạy thay mình.', descEn: 'Eileen opens a box of gears. Each tooth matches a part you once built. She invites you to let the machine move in your place.' }
};
