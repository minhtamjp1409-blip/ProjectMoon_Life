// How a life can close at the top of a career. `endsLife` events set char.lifeEnding to one of these keys;
// the epitaph reads the quote and the closing paragraph from here. None of them blocks inheritance:
// someone still takes up what was left behind, which is why they are not special endings like the Library.

export const LIFE_ENDINGS = {
  wander: {
    titleVi: 'Chu du', titleEn: 'The Long Road',
    quoteVi: '“Họ để lại một cái tên trong sổ trực. Từ trạm kiểm soát kế tiếp, không còn ai ghi tên ấy nữa.”',
    quoteEn: '“They left one name in the duty ledger. At the next checkpoint, no one wrote it down.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, bạn rời nơi từng giữ chức và qua một trạm kiểm soát. Người trực ghi lại giờ đi, không ghi điểm đến. Hồ sơ cũ chỉ còn nhắc tới 「${c.relic}」.`,
      en: `At age ${c.age}, you leave the place where you held rank and pass a checkpoint. The guard records your departure, not your destination. Your old file still mentions "${c.relic}".`
    })
  },
  retired: {
    titleVi: 'Nhường chỗ ngồi', titleEn: 'The Seat Handed Over',
    quoteVi: '“Hồ sơ của họ được đóng trước khi chiếc ghế kịp nguội.”',
    quoteEn: '“Their file closed before the seat had time to cool.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, bạn ký giấy rời chức. Tên bạn được gạch khỏi lịch trực; hồ sơ khép lại bên cạnh mục 「${c.relic}」.`,
      en: `At age ${c.age}, you sign the papers to leave your position. Your name comes off the duty roster; your file closes beside its entry for "${c.relic}".`
    })
  },
  usurped: {
    titleVi: 'Bị soán ngôi', titleEn: 'The Knife from Behind',
    quoteVi: '“Đến buổi họp sau, người kế vị ngồi đúng chỗ ấy. Không ai nhắc chuyện đã xảy ra.”',
    quoteEn: '“At the next meeting, the successor took that place. No one mentioned what had happened.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, người kế vị ra tay khi bạn quay lưng. Buổi họp kế tiếp diễn ra đúng giờ. Trong hồ sơ bàn giao, 「${c.relic}」 được ghi ở mục tài sản để lại.`,
      en: `At age ${c.age}, the successor strikes when your back is turned. The next meeting starts on time. The handover record lists "${c.relic}" among what you left behind.`
    })
  },
  last_bout: {
    titleVi: 'Trận đấu cuối', titleEn: 'The Last Bout',
    quoteVi: '“Người trẻ cúi đầu rất lâu. Người già nằm trên sàn nhìn lên trần nhà, và mỉm cười như vừa nghe một điều đúng.”',
    quoteEn: '“The young one bowed for a long time. The old one lay on the floor looking at the ceiling, smiling as if hearing something right.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, bạn bước vào sân tập vắng cùng người từng được mình kèm cặp. Nhát chém cuối tới khi bạn đã hạ tay. Người ấy nhận 「${c.relic}」 sau trận đấu và ở lại sân cho đến khi đèn tắt.`,
      en: `At age ${c.age}, you enter an empty training yard with the person you once mentored. The last stroke lands after you lower your guard. They take "${c.relic}" afterward and remain until the lights go out.`
    })
  },
  purged: {
    titleVi: 'Bị Section gạch tên', titleEn: 'Struck by the Sections',
    quoteVi: '“Phong bì không ghi tiền công. Người nhận vẫn đến đúng giờ.”',
    quoteEn: '“The envelope named no fee. Its recipient still arrived on time.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, bạn đến địa chỉ ghi trong Request niêm phong. Section đã bố trí người chờ sẵn. Sau đó, Hana gạch tên bạn khỏi danh sách Color và niêm mục 「${c.relic}」 trong hồ sơ.`,
      en: `At age ${c.age}, you reach the address on the sealed Request. A Section team is waiting. Hana then removes your name from the Color roll and seals the entry for "${c.relic}" in your file.`
    })
  },
  sealed_seat: {
    titleVi: 'Ghế không có tên', titleEn: 'The Seat With No Name',
    quoteVi: '“Họ ngồi ở đó lâu đến mức bàn thôi ghi tên người ngồi. Chiếc ghế đã học cách giữ họ.”',
    quoteEn: '“They sat there so long that the desk stopped recording who sat. The chair had learned how to keep them.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, bạn nhận ghế Hội đồng không có biển tên. Ngày đầu, thư ký đặt trước mặt bạn một tập hồ sơ đã đánh dấu chỗ ký. Từ đó, biên bản chỉ ghi chức vụ; tên bạn không còn xuất hiện.`,
      en: `At age ${c.age}, you take the Council seat without a nameplate. On the first day, the secretary places a file before you with the signature boxes marked. From then on, the minutes record only the position; your name no longer appears.`
    })
  },
  struck_roll: {
    titleVi: 'Bị gạch khỏi sổ nhân sự', titleEn: 'Struck From the Roll',
    quoteVi: '“Wing không đuổi bạn. Nó chỉ để tên bạn rơi ra khỏi trang, rất nhẹ, như một cánh lông.”',
    quoteEn: '“The Wing does not drive you out. It only lets your name drift off the page, very lightly, like a feather.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, thẻ của bạn không còn mở được cổng Wing. Người gác tra hồ sơ rồi trả thẻ lại, không gọi tên bạn. Bạn đứng ngoài cho hết ca sáng; không ai đến nhận chiếc hộp đồ trên tay.`,
      en: `At age ${c.age}, your badge no longer opens the Wing gate. The guard checks the file and returns it without saying your name. You wait through the morning shift; no one comes for the box in your hands.`
    })
  },
  walked_out: {
    titleVi: 'Ra khỏi Nest', titleEn: 'Out of the Nest',
    quoteVi: '“Người ta nói họ mang theo một chiếc hộp nhỏ. Không ai biết bên trong có gì, ngoài việc nó đủ nhẹ để đi bộ.”',
    quoteEn: '“It is said they carried one small box. No one knows what was inside, except that it was light enough to walk with.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, bạn rời Nest qua cổng phụ với chiếc hộp nhỏ. Bạn thuê một phòng ở Backstreets dưới tên mới; tiền đặt cọc lấy từ số Ahn mang theo. 「${c.relic}」 được cất trong tủ, còn thẻ Wing nằm úp trên bàn.`,
      en: `At age ${c.age}, you leave the Nest by the side gate with a small box. You rent a Backstreets room under a new name, paying the deposit with the Ahn you carried. "${c.relic}" goes into the cupboard; the Wing badge lies face down on the table.`
    })
  },
  ripe_age: {
    titleVi: 'Sống qua nhiều thế hệ', titleEn: 'Outliving Generations',
    quoteVi: '“Người trực mới phải hỏi lại cách đánh vần tên họ. Cuốn sổ cũ hơn anh ta.”',
    quoteEn: '“The new clerk had to ask how to spell their name. The ledger was older than he was.”',
    closing: null
  }
};

export const lifeEndingOf = (char) => (char?.lifeEnding ? LIFE_ENDINGS[char.lifeEnding] || null : null);
