// The forbidden path: a way to the Head's judgment for a life strong enough to ask for it.
// It opens only as one of the year's leads (leadOnly keeps it out of the ordinary draw), and each of
// its three chapters adds one Taboo and offers a way out. At three, the Claw comes (gameStore).
// Who is offered it and how often: forbiddenLeadOpen in engine/forbiddenPath.js.

import { M, C, I } from './storyKit.js';

export const FORBIDDEN_LEAD_ID = 'forbidden_lead_case';
export const FORBIDDEN_ACT_IDS = ['forbidden_act_workbench', 'forbidden_act_gaze'];

export const FORBIDDEN_MINORS = [
  M(
    FORBIDDEN_LEAD_ID,
    [25, 140],
    { noFlags: ['Distorted'] },
    '[Hộp chì không nhãn] Người môi giới đặt một chiếc hộp chì lên bàn và không mở nắp. Bên trong là sổ tay của một phòng thí nghiệm Wing đã bị xóa khỏi bản đồ: cách dựng một cỗ máy biết tự nghĩ. Người ấy nói chỉ ai đủ mạnh mới giữ được nó qua một năm.',
    '[The Unlabelled Lead Case] A broker sets a lead case on the table and does not open it. Inside are the notebooks of a Wing lab that was wiped off the map: how to build a machine that thinks for itself. The broker says only someone strong enough can keep it for a year.',
    [
      C(
        'Nhận hộp và mang về',
        'Take the case home',
        'Bạn gói hộp trong áo khoác. Trên đường về, hai lần có người bước cùng nhịp với bạn rồi rẽ vào ngõ khác.',
        'You wrap the case in your coat. On the way home, twice someone falls into step with you and then turns down another alley.',
        { taboo: 1, resonance: 3 },
        {
          mem: 'forbidden_case_kept',
          later: [{ id: FORBIDDEN_ACT_IDS[0], years: 1, reasonVi: 'Hộp chì không nhãn: hồi 2/3', reasonEn: 'The unlabelled case: chapter 2/3' }]
        }
      ),
      C(
        'Đẩy hộp lại phía người môi giới',
        'Push the case back across the table',
        'Người môi giới cất hộp đi mà không hỏi thêm. Bạn trả tiền cả hai cốc trà.',
        'The broker puts the case away without another question. You pay for both cups of tea.',
        { wealth: -1 }
      )
    ],
    I('Bạn đứng dậy trước khi người môi giới nói hết câu.', 'You stand up before the broker finishes the sentence.'),
    { leadOnly: true, theme: 'forbidden' }
  )
];

export const FORBIDDEN_ACTS = [
  {
    id: FORBIDDEN_ACT_IDS[0],
    age: [26, 140],
    major: true,
    causalOnly: true,
    weight: 30,
    need: { mem: 'forbidden_case_kept' },
    forbids: ['Distorted', 'forbidden_path_closed'],
    vi: '[Bàn làm việc dưới hầm] Bạn lắp xong mạch theo đúng sổ tay. Chiếc hộp kim loại trên bàn trả lời câu hỏi đầu tiên bằng một câu hỏi khác: nó hỏi tên bạn.',
    en: '[The Cellar Workbench] You finish the circuit exactly as the notebooks describe. The metal box on the bench answers your first question with one of its own: it asks your name.',
    choices: [
      {
        labelVi: 'Nói tên mình và tiếp tục dạy nó',
        labelEn: 'Tell it your name and keep teaching it',
        resultVi: 'Đến sáng nó gọi được tên bạn bằng ba giọng khác nhau. Bạn trùm tấm vải lên hộp trước khi mở cửa hầm.',
        resultEn: 'By morning it can say your name in three different voices. You throw a cloth over the box before you open the cellar door.',
        effects: { taboo: 1, resonance: 6, sanity: -5 },
        flagsAdd: ['forbidden_machine_built'],
        scheduleConsequences: [{ eventId: FORBIDDEN_ACT_IDS[1], delayYears: 1, reasonVi: 'Hộp chì không nhãn: hồi 3/3', reasonEn: 'The unlabelled case: chapter 3/3' }]
      },
      {
        labelVi: 'Rút dây nguồn và đốt sổ tay',
        labelEn: 'Pull the power and burn the notebooks',
        resultVi: 'Giấy thấm dầu máy nên cháy chậm. Bạn ngồi đến khi tro nguội, và chiếc hộp không nói thêm lời nào.',
        resultEn: 'The paper is soaked in machine oil and burns slowly. You sit until the ash is cold, and the box says nothing more.',
        effects: { sanity: -3 },
        flagsAdd: ['forbidden_path_closed']
      }
    ]
  },
  {
    id: FORBIDDEN_ACT_IDS[1],
    age: [27, 140],
    major: true,
    causalOnly: true,
    weight: 30,
    need: { flags: ['forbidden_machine_built'] },
    forbids: ['Distorted', 'forbidden_path_closed'],
    vi: '[Ánh nhìn của The Head] Cỗ máy dưới hầm muốn được nhìn thấy. Nó đã viết một bức thư gửi Hana Association, ký tên bạn, và chờ bạn mang đi.',
    en: '[The Gaze of The Head] The machine in the cellar wants to be seen. It has written a letter to the Hana Association, signed with your name, and waits for you to post it.',
    choices: [
      {
        labelVi: 'Mang thư đi gửi',
        labelEn: 'Post the letter',
        resultVi: 'Bạn thả phong bì vào khe. Trên đường về, mọi đèn đường trong phố tắt cùng lúc, rồi sáng lại.',
        resultEn: 'You drop the envelope through the slot. On the way home every street lamp on the block goes out at once, then comes back.',
        effects: { taboo: 1, resonance: 8 },
        flagsAdd: ['forbidden_letter_sent']
      },
      {
        labelVi: 'Đập vỡ hộp và chôn mảnh vụn',
        labelEn: 'Smash the box and bury the pieces',
        resultVi: 'Nó không van xin. Bạn chôn mảnh vụn ở ba nơi khác nhau và không ghi lại nơi nào.',
        resultEn: 'It does not beg. You bury the pieces in three different places and write none of them down.',
        effects: { sanity: -6 },
        flagsAdd: ['forbidden_path_closed']
      }
    ]
  }
];
