// The way back to a human voice (adaptation: canon shows no Distortion being cured, so this thread does not cure one).
// A Distortion who still answers to their old name can learn to speak like a person again. The body stays
// Distorted and Hana keeps the file open; what comes back is the voice, and with it the people who recognize it.
// Flags: DistortVoiceThread (opened), DistortVoiceAnswered / DistortVoiceFled (the first choice),
// DistortVoicePracticed or DistortVoiceLost (the second), HumanVoice (the end; endYear softens the yearly cost).

const later = (eventId, delayYears, reasonVi, reasonEn) => [{ eventId, delayYears, reasonVi, reasonEn }];

export const DISTORTION_VOICE_EVENTS = [
  {
    id: 'distort_voice_old_name', age: [16, 99], jobs: ['Distortion'], major: true, weight: 55,
    requires: ['Distorted'], forbids: ['DistortVoiceThread', 'HumanVoice'],
    vi: '[Tên cũ] Ở đầu hẻm, có người gọi tên bạn. Giọng họ run nhưng không bỏ chạy. Lần đầu sau nhiều ngày, bạn nghe rõ tiếng bước chân hơn tiếng Carmen.',
    en: '[The old name] Someone calls your name from the alley mouth. Their voice shakes, but they do not run. For the first time in days, their footsteps sound clearer than Carmen’s voice.',
    choices: [
      {
        labelVi: 'Dừng lại và cố trả lời bằng tiếng người',
        labelEn: 'Stop and try to answer in a human voice',
        resultVi: 'Âm thanh bật ra méo mó, nửa giống tiếng gầm. Người kia vẫn nghe ra một chữ trong đó. Họ gật đầu, rồi lùi vào bóng tối mà không quay lưng lại.',
        resultEn: 'The sound comes out warped, half a growl. The other person still hears one word in it. They nod, then step back into the dark without turning away.',
        effects: { sanity: 4, resonance: -5, heat: 2 },
        flagsAdd: ['DistortVoiceThread', 'DistortVoiceAnswered'],
        scheduleConsequences: later('distort_voice_letters', 2, 'Người ấy chưa quên chữ bạn đã nói', 'They have not forgotten the word you said')
      },
      {
        labelVi: 'Lẩn đi trước khi người đó nhìn rõ mặt bạn',
        labelEn: 'Slip away before they see your face',
        resultVi: 'Bạn leo lên mái tôn, nằm im tới khi bước chân xa dần. Tên cũ vẫn quanh quẩn trong đầu; bạn không đáp lại.',
        resultEn: 'You climb onto the tin roof and lie still until the footsteps fade. Your old name stays with you; you do not answer.',
        effects: { resonance: 6, sanity: -2 },
        flagsAdd: ['DistortVoiceThread', 'DistortVoiceFled']
      }
    ]
  },
  {
    id: 'distort_voice_letters', age: [17, 99], jobs: ['Distortion'], major: true, weight: 0, causalOnly: true,
    requires: ['DistortVoiceAnswered'], forbids: ['DistortVoicePracticed', 'DistortVoiceLost', 'HumanVoice'],
    vi: '[Những mẩu giấy] Dưới chân cầu thang nơi bạn trú có những mẩu giấy gấp tư. Mỗi mẩu viết một câu ngắn và chừa một dòng trống bên dưới. Muốn đáp lại, bạn phải nhớ cách người ta nói thành câu.',
    en: '[The notes] At the foot of the stairs where you shelter lie notes folded in four. Each holds one short sentence and leaves a blank line below. To answer, you have to remember how people speak in sentences.',
    choices: [
      {
        labelVi: 'Đêm nào cũng tập nói lại từng chữ',
        labelEn: 'Practice the words aloud every night',
        outcomes: [
          {
            w: 65, effects: { sanity: -4, resonance: -8 }, flagsAdd: ['DistortVoicePracticed'],
            scheduleConsequences: later('distort_voice_reclaimed', 2, 'Giọng nói của bạn đã gần thành tiếng người', 'Your voice is close to a human one'),
            resultVi: 'Cổ họng rát sau vài chữ. Bạn tập lại mỗi đêm; cuối mùa, bạn đọc trọn một câu mà không gầm lên.',
            resultEn: 'Your throat hurts after a few words. You try again each night; by season’s end, you read a full sentence without growling.'
          },
          {
            w: 35, effects: { sanity: -6, resonance: 8 }, flagsAdd: ['DistortVoiceLost'],
            resultVi: 'Một đêm giọng bạn vỡ hẳn thành tiếng rít. Bạn xé mẩu giấy đang cầm. Sáng hôm sau không còn mẩu giấy nào dưới chân cầu thang.',
            resultEn: 'One night your voice breaks into a shriek. You tear the note in your hand. The next morning there are no more notes at the foot of the stairs.'
          }
        ]
      },
      {
        labelVi: 'Đốt những mẩu giấy để khỏi phải trả lời',
        labelEn: 'Burn the notes so you need not answer',
        resultVi: 'Giấy cháy hết trước khi bạn đổi ý. Sáng hôm sau, bạn không nhớ câu cuối cùng đã đọc.',
        resultEn: 'The paper burns before you can change your mind. By morning, you cannot recall the last sentence you read.',
        effects: { resonance: 10, sanity: -3 },
        flagsAdd: ['DistortVoiceLost']
      }
    ]
  },
  {
    id: 'distort_voice_reclaimed', age: [18, 99], jobs: ['Distortion'], major: true, weight: 0, causalOnly: true,
    requires: ['DistortVoicePracticed'], forbids: ['HumanVoice', 'DistortVoiceLost'],
    vi: '[Giọng người] Một tổ Fixer của Hana dồn bạn vào cuối hẻm, đèn chiếu thẳng vào mặt. Người cầm đầu đã đặt tay lên chuôi kiếm. Bạn có một hơi thở để quyết định ai sẽ nói.',
    en: '[A human voice] A Hana Fixer squad corners you at the end of the alley, lights straight in your face. Their leader has a hand on the sword hilt. You have one breath to decide who will speak.',
    choices: [
      {
        labelVi: 'Nói tên mình bằng giọng người',
        labelEn: 'Say your name in a human voice',
        resultVi: 'Giọng bạn khàn nhưng rõ từng chữ. Người cầm đầu hạ đèn xuống một chút, ghi gì đó vào sổ, rồi ra hiệu cho cả tổ lùi lại. Hồ sơ vẫn mở, nhưng lần đầu tiên họ viết tên bạn chứ không viết một con số.',
        resultEn: 'Your voice is hoarse but every word is clear. The leader lowers the light a little, writes something down, then signals the squad to fall back. The file stays open, but for the first time they write your name instead of a number.',
        effects: { sanity: 10, heat: -10, network: 3, resonance: -6 },
        flagsAdd: ['HumanVoice']
      },
      {
        labelVi: 'Không nói tên mình; để tiếng nói kia lấn át',
        labelEn: 'Keep your name to yourself and let the other voice take over',
        resultVi: 'Bạn mở miệng nhưng chỉ có tiếng rít bật ra. Đèn vỡ, tổ Fixer tản khỏi đầu hẻm. Bạn không thử nói lần nữa.',
        resultEn: 'You open your mouth, but only a hiss comes out. The lights break and the Fixers scatter from the alley. You do not try speaking again.',
        effects: { resonance: 12, heat: 6, sanity: -5 },
        flagsAdd: ['DistortVoiceLost']
      }
    ]
  }
];
