export const CLAW_DUNGEON_ID = 'dungeon_claw_judgment';

export const CLAW_DUNGEON = {
  id: CLAW_DUNGEON_ID,
  theme: 'claw',
  titleVi: 'Án của The Head',
  titleEn: 'The Head’s Judgment',
  hazard: 'ALEPH',
  noRetreat: true,
  fatalOnBreak: true,
  fatalOnFinalFailure: true,
  noCompanion: true,
  noRewards: true,
  kickerVi: 'B Corp đã nhìn thấy · C Corp đến thi hành',
  kickerEn: 'B Corp has seen · C Corp has come to act',
  accentColor: '#d6d0ba',
  stages: [
    {
      stageIndex: 0,
      nameVi: 'Bản án không có người ký',
      nameEn: 'An unsigned sentence',
      descVi: 'Mọi tiếng động trong phòng ngừng lại. Một đường xanh mảnh chia đôi bức tường. Claw bước qua, ba ống huyết thanh trên tay còn nguyên. Hắn đọc tên bạn, rồi xóa nó khỏi màn hình.',
      descEn: 'Every sound in the room stops. A thin blue line divides the wall. A Claw steps through, all three serum vials intact. He reads your name, then erases it from the display.',
      strainGain: 12,
      choices: [
        {
          labelVi: 'Nằm xuống dưới đường cắt đầu tiên và ghi nhớ nhịp tay hắn',
          labelEn: 'Drop beneath the first cut and memorize his timing',
          checkTrait: 'nerve', checkPenalty: 0.06,
          resultVi: 'Đường cắt đi qua chỗ cổ bạn vừa ở. Bạn nghe tiếng bơm W rít lên trước khi tay hắn chuyển động.',
          resultEn: 'The cut passes through where your neck was. You hear the W pump hiss before his arm moves.',
          failVi: 'Bạn chậm nửa nhịp. Vết cắt lướt qua vai, nhưng tiếng bơm vẫn lọt vào tai.',
          failEn: 'You are half a beat late. The cut grazes your shoulder, but you still hear the pump.',
          fx: { health: -4, sanity: -2 }, strainDelta: 1
        },
        {
          labelVi: 'Ném vật kim loại vào tường, ép Claw lộ góc tấn công',
          labelEn: 'Throw metal at the wall to expose the Claw’s angle',
          checkTrait: 'luck', checkPenalty: 0.12,
          resultVi: 'Vật kim loại biến mất trong đường cắt. Bạn thấy lối hở sát chân tường.',
          resultEn: 'The metal vanishes in the cut. You spot an opening against the wall.',
          failVi: 'Claw không nhìn theo. Bạn lao qua một khe hẹp và để lại máu trên sàn.',
          failEn: 'The Claw does not look away. You squeeze through a narrow gap and leave blood on the floor.',
          fx: { health: -6, sanity: -2 }, strainDelta: 4
        }
      ]
    },
    {
      stageIndex: 1,
      nameVi: 'Ống W: khoảng cách bị xóa',
      nameEn: 'W serum: distance erased',
      descVi: 'Claw không đuổi theo. Hắn bơm ống W, và hành lang giữa hai người bị gấp lại như giấy. Lối thoát phía sau giờ nằm ngay cạnh bàn tay hắn.',
      descEn: 'The Claw does not pursue. He injects W serum, and the corridor between you folds like paper. The exit behind you now sits beside his hand.',
      strainGain: 17,
      choices: [
        {
          labelVi: 'Canh tiếng bơm, đổi hướng đúng lúc đường cắt khép lại',
          labelEn: 'Listen for the pump and change course as the cut closes',
          checkTrait: 'nerve', checkPenalty: 0.11,
          resultVi: 'Bạn đi qua một mép không gian còn ấm. Claw xoay người, chậm đúng một bước.',
          resultEn: 'You pass an edge of space still warm to the touch. The Claw turns one step too late.',
          failVi: 'Đường gấp kẹp cánh tay bạn. Bạn giật ra trước khi nó đóng hẳn.',
          failEn: 'The fold traps your arm. You tear free before it closes.',
          fx: { health: -5, sanity: -3 }, strainDelta: 3
        },
        {
          labelVi: 'Chịu một vết cắt nông để tiến sát bộ bơm W',
          labelEn: 'Accept a shallow cut to close in on the W pump',
          checkTrait: 'vigor', checkPenalty: 0.16,
          resultVi: 'Lưỡi cắt rạch qua sườn. Tay bạn chạm được vào đường dẫn của ống W.',
          resultEn: 'The cut opens your side. Your hand reaches the W vial feed.',
          failVi: 'Bạn chạm vào vỏ bơm rồi bật ngược ra. Sườn đau tới mức mỗi hơi thở đều ngắn lại.',
          failEn: 'You touch the pump housing and rebound. Each breath grows shorter from the wound in your side.',
          fx: { health: -7, sanity: -3 }, strainDelta: 5
        }
      ]
    },
    {
      stageIndex: 2,
      nameVi: 'Ống R: cái giá của một nhịp chậm',
      nameEn: 'R serum: the cost of one slow beat',
      descVi: 'Ống R vỡ niêm. Claw tăng tốc; ba dấu chân xuất hiện trước khi bạn nghe một bước. Bạn không thể thắng cuộc đua này. Bạn chỉ có thể buộc hắn dừng.',
      descEn: 'The R vial breaks its seal. The Claw accelerates; three footprints appear before you hear one step. You cannot win this race. You can only force him to stop.',
      strainGain: 19,
      choices: [
        {
          labelVi: 'Dùng quán tính của hắn đưa lưỡi tay vào khung cửa thép',
          labelEn: 'Turn his momentum into the steel door frame',
          checkTrait: 'vigor', checkPenalty: 0.18,
          resultVi: 'Khung cửa oằn xuống. Cánh tay Claw mắc lại một nhịp đủ dài để bạn rời khỏi tầm cắt.',
          resultEn: 'The frame buckles. The Claw’s arm catches for one beat, long enough for you to leave its cutting range.',
          failVi: 'Khung cửa bật tung. Bạn ngã xuống, rồi lăn qua dưới cánh tay vừa ghim vào sàn.',
          failEn: 'The frame gives way. You fall, then roll beneath the arm pinned into the floor.',
          fx: { health: -6, sanity: -4 }, strainDelta: 5
        },
        {
          labelVi: 'Giữ im lặng, đếm ba dấu chân và đánh vào vị trí thứ tư',
          labelEn: 'Stay still, count three steps, and strike at the fourth',
          checkTrait: 'nerve', checkPenalty: 0.2,
          resultVi: 'Đòn đánh trúng khớp dẫn ống R. Tốc độ của Claw khựng lại, rất ngắn.',
          resultEn: 'Your strike hits the R feed joint. The Claw’s speed falters, briefly.',
          failVi: 'Bạn đếm sai một bước. Bàn tay thép nghiền qua lớp áo và để lại một vệt máu dài.',
          failEn: 'You count one step wrong. The steel hand crushes through your coat and leaves a long line of blood.',
          fx: { health: -5, sanity: -5 }, strainDelta: 7
        }
      ]
    },
    {
      stageIndex: 3,
      nameVi: 'Ống K: vết thương khép lại',
      nameEn: 'K serum: the wound closes',
      descVi: 'Ống K sáng lên. Những chỗ bạn vừa làm hỏng trên cơ thể Claw liền lại. Dưới chân cả hai, nền nhà đã nứt tới sát tường ngoài. Một lần ra tay nữa; không còn chỗ để lui.',
      descEn: 'The K vial glows. The damage you dealt to the Claw closes. Beneath you both, the floor has split toward the outer wall. One more move; there is nowhere left to retreat.',
      strainGain: 18,
      choices: [
        {
          labelVi: 'Phá khớp bơm K đúng lúc hắn tự chữa, rồi lao qua vết nứt',
          labelEn: 'Break the K pump as he heals, then dive through the breach',
          checkTrait: 'nerve', checkPenalty: 0.23,
          resultVi: 'Ống K nứt. Claw đưa tay giữ bộ bơm trong một nhịp. Bạn rơi qua khe tường, ra ngoài bức tường của The City.',
          resultEn: 'The K vial cracks. The Claw reaches for the pump for one beat. You fall through the breach, beyond the City wall.',
          failVi: 'Bàn tay thép chặn trước ống K. Không còn lần ra tay thứ hai.',
          failEn: 'A steel hand closes over the K vial. There is no second strike.',
          fx: { health: -8, sanity: -4 }, strainDelta: 6
        },
        {
          labelVi: 'Để hắn đuổi sát, đánh sập sàn và bám vào mép tường ngoài',
          labelEn: 'Draw him close, collapse the floor, and catch the outer wall',
          checkTrait: 'vigor', checkPenalty: 0.25,
          resultVi: 'Sàn đổ xuống cùng Claw. Bạn bám vào mép ngoài bằng những ngón tay rướm máu. Phía dưới là Outskirts.',
          resultEn: 'The floor falls away with the Claw. You catch the outer ledge with bleeding fingers. The Outskirts lie below.',
          failVi: 'Mép tường trượt khỏi tay bạn. Claw chạm đất trước.',
          failEn: 'The ledge slips from your grip. The Claw lands first.',
          fx: { health: -10, sanity: -3 }, strainDelta: 8
        }
      ]
    }
  ]
};
