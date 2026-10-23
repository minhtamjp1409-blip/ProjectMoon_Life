export const FIXER_BREAKTHROUGH_EVENTS = [
  {
    id: 'fixer_seven_unclaimed_dossier', age: [28, 38], jobs: ['Fixer'],
    major: true, weight: 0, need: { grade: [2, 6] },
    forbids: ['Distorted', 'ColorFixer'],
    vi: '[Hồ sơ không người nhận] Văn phòng phụ trách một vụ mất tích vừa giải thể. Seven cần người mang chứng cứ ra khỏi khu phong tỏa trước khi bên mua thủ tiêu nhân chứng. Một đồng nghiệp đề cử bạn; tên người đề cử cũng nằm trên giấy nhận trách nhiệm.',
    en: '[An unclaimed dossier] The Office handling a disappearance has dissolved. Seven needs evidence carried out of a sealed block before the buyer silences the witnesses. A colleague recommends you, putting their own name on the liability form.',
    choices: [
      { labelVi: 'Nhận hồ sơ, tìm đường đưa nhân chứng ra', labelEn: 'Take the dossier and extract the witness',
        outcomes: [
          { w: 65, effects: { health: -18, sanity: -12, rep: 18, wealth: 12, resonance: 8 }, meritAdd: 150,
            flagsAdd: ['SevenWitnessExtracted'],
            scheduleConsequences: [{ eventId: 'fixer_seven_sealed_deposition', delayYears: 1, reasonVi: 'Seven cần bạn xác nhận lời khai', reasonEn: 'Seven needs you to verify the testimony' }],
            resultVi: 'Bạn đổi đường ba lần và đưa được nhân chứng tới cửa Seven. Người ấy nhận ra một cái tên trong hồ sơ. Seven giữ lại chứng cứ, hẹn bạn quay lại khi cuộc điều tra kết thúc.',
            resultEn: 'You change routes three times and reach Seven with the witness. They recognize a name in the dossier. Seven keeps the evidence and asks you to return when the investigation closes.' },
          { w: 35, effects: { health: -30, sanity: -18, wealth: -10 },
            resultVi: 'Điểm hẹn đã bị lộ. Bạn thoát qua cửa hậu, bỏ lại hồ sơ trong căn phòng cháy. Văn phòng phải trả tiền chữa thương và bồi thường cho người dẫn đường.',
            resultEn: 'The meeting point is compromised. You escape through the back, leaving the dossier in a burning room. Your Office pays for treatment and compensates the guide.' }
        ] },
      { labelVi: 'Trả lại hồ sơ trước khi ký', labelEn: 'Return the dossier unsigned', effects: { sanity: 2 },
        resultVi: 'Seven tìm một văn phòng khác. Bạn không nhận tiền, cũng không mang tên mình vào bản cam kết.',
        resultEn: 'Seven approaches another Office. You receive no payment and leave your name off the undertaking.' }
    ]
  },
  {
    id: 'fixer_seven_sealed_deposition', age: [29, 50], jobs: ['Fixer'], major: true,
    weight: 0, causalOnly: true, requires: ['SevenWitnessExtracted'], forbids: ['Distorted', 'ColorFixer'],
    vi: '[Lời khai niêm phong] Chứng cứ của bạn đã nối được các vụ mất tích. Seven đề nghị bạn dẫn tổ thu hồi vào cơ sở cuối cùng. Nếu hoàn thành, toàn bộ hồ sơ chiến công sẽ được chuyển tới Hana; nếu sai, văn phòng của bạn chịu phần trách nhiệm đầu tiên.',
    en: '[Sealed testimony] Your evidence connects the disappearances. Seven asks you to lead a recovery team into the last facility. Completion puts the full case before Hana; failure leaves your Office first in line for liability.',
    choices: [
      { labelVi: 'Dẫn tổ thu hồi vào cơ sở', labelEn: 'Lead the recovery team inside', need: { stat: { health: [45, 100], sanity: [30, 100] } },
        outcomes: [
          { w: 65, effects: { health: -26, sanity: -18, rep: 30, wealth: 22, resonance: 12 }, meritAdd: 400,
            flagsAdd: ['SevenExceptionalRecord'],
            resultVi: 'Bạn đưa tổ thu hồi và kho chứng cứ ra ngoài trước khi cơ sở sụp. Seven ký xác nhận để Hana giữ phần lớn công trạng dư qua các lần xét hạng. Từng bài sát hạch vẫn phải tự vượt qua.',
            resultEn: 'You get the team and evidence out before the facility collapses. Seven certifies the record so Hana carries most surplus merit across grade reviews. You must still pass every examination.' },
          { w: 35, effects: { health: -36, sanity: -22, wealth: -18, rep: -8 },
            resultVi: 'Lối rút bị chặn. Bạn cứu được tổ thu hồi nhưng phải bỏ kho chứng cứ. Seven khép hồ sơ; khoản bồi thường nằm lại trên bàn văn phòng.',
            resultEn: 'The exit is blocked. You save the team but abandon the evidence. Seven closes the case; the compensation bill lands on your Office’s desk.' }
        ] },
      { labelVi: 'Giao sơ đồ, xin rút khỏi tổ', labelEn: 'Hand over the map and withdraw', effects: { wealth: 4 },
        resultVi: 'Bạn nhận tiền công khảo sát. Seven giao phần còn lại cho người khác; hồ sơ của bạn dừng ở nhiệm vụ đưa nhân chứng ra ngoài.',
        resultEn: 'You receive the survey fee. Seven assigns the rest to someone else; your record ends with the witness extraction.' }
    ]
  }
];
