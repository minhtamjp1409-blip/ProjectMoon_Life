// Scenes whose only job is to plant a consequence that already exists in the data. Each one is
// something a person actually did, so the scene that comes back years later has a past to point at.

import { M, C, I } from './storyKit.js';

export const LIFE_MINORS_SEEDS = [
  M(
    'm6_fx_unchecked_report',
    [22, 70],
    { jobs: ['Fixer'] },
    '[Biên bản chưa kiểm] Văn phòng đưa bạn xấp biên bản xác nhận một phân khu của District đã được dọn sạch, nhờ ký trước giờ Hana đóng sổ. Bạn mới đọc được nửa số trang, và người đưa giấy đã đứng ở cửa.',
    '[The Unchecked Report] Your Office hands you a stack of reports confirming that a ward of the District has been cleared, and asks you to countersign before Hana closes the book. You have read half the pages, and the person who brought them is already standing at the door.',
    [
      C(
        'Ký ngay để kịp giờ',
        'Sign now to make the deadline',
        'Bạn ký vào dòng cuối mà không đọc nốt nửa còn lại. Người đưa giấy gật đầu lần đầu tiên trong cả tuần, và phong bì ngoài hợp đồng dày hơn thường lệ.',
        'You sign the last line without reading the other half. The courier nods for the first time all week, and the envelope outside the contract is thicker than usual.',
        { wealth: 4, rep: 1 },
        {
          later: [{
            id: 'csq_hana_corruption_audit',
            years: 4,
            reasonVi: 'Bản báo cáo bạn ký mà không đọc hết',
            reasonEn: 'The report you signed without reading all of it'
          }]
        }
      ),
      C(
        'Đọc hết rồi mới ký',
        'Read it all before signing',
        'Bạn đọc tới trang cuối và tìm ra một dòng ghi sai tên khu. Người đưa giấy bực ra mặt, nhưng bạn trả xấp biên bản lại và chỉ vào dòng đó. Đêm ấy Hana không đóng sổ.',
        'You read to the last page and find one line naming the wrong ward. The courier is visibly irritated, but you hand the stack back and point to the line. Hana does not close the book that night.',
        { sanity: -1, rep: 3 }
      )
    ],
    I(
      'Bạn đặt xấp giấy xuống bàn và nói để sáng mai. Người đưa giấy thở dài rồi cầm chúng đi, và bạn không biết ai sẽ ký thay.',
      'You set the stack on the desk and say it can wait until morning. The courier sighs and takes it away, and you do not know who will sign instead.'
    ),
    { once: true, theme: 'causal' }
  )
];
