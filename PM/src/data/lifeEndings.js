// How a life can close at the top of a career. `endsLife` events set char.lifeEnding to one of these keys;
// the epitaph reads the quote and the closing paragraph from here. None of them blocks inheritance:
// someone still takes up what was left behind, which is why they are not special endings like the Library.

export const LIFE_ENDINGS = {
  wander: {
    titleVi: 'Chu du', titleEn: 'The Long Road',
    quoteVi: '“Không ai ghi lại nơi họ dừng chân. Người ta chỉ kể rằng ở một thị trấn ngoài tường, có một người già mang vũ khí cũ trả tiền trà bằng đồng Ahn đã hết thời.”',
    quoteEn: '“No one recorded where they stopped. People only say that in a town beyond the wall there was an old traveler with an old weapon who paid for tea in out-of-date Ahn.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, bạn rời The City bằng một cổng phụ và không ghi tên vào sổ nào. Hồ sơ của bạn dừng ở đó, không phải vì bạn chết, mà vì không ai còn biết chỗ nào để viết tiếp. Bạn để lại 「${c.relic}」 cho người nhận, và để lại cả một cái tên mà những quán ăn sẽ còn nhắc thêm vài năm.`,
      en: `At age ${c.age}, you leave the City by a side gate and sign no ledger. Your record stops there, not because you died, but because no one knows where to write the next line. You leave "${c.relic}" for whoever claims it, and a name the diners will go on mentioning for some years.`
    })
  },
  retired: {
    titleVi: 'Nhường chỗ ngồi', titleEn: 'The Seat Handed Over',
    quoteVi: '“Ghế đã có người ngồi. Người từng ngồi ở đó học lại cách pha trà cho một mình.”',
    quoteEn: '“The chair has a new occupant. The one who sat there before is learning again how to brew tea for one.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, bạn trao lại chỗ ngồi và bước ra khỏi phòng họp trong một buổi chiều không có gì đặc biệt. Bạn sống thêm những năm cuối trong một căn nhà nhỏ ở phố cũ, nơi người ta quen gọi bạn bằng tên thật. Khi hồ sơ khép lại, bạn để 「${c.relic}」 cho người kế nhiệm giữ.`,
      en: `At age ${c.age}, you hand over the seat and walk out of the meeting room on an afternoon like any other. You spend your last years in a small house on an old street, where people call you by your given name. When the file closes, you leave "${c.relic}" for your successor to keep.`
    })
  },
  usurped: {
    titleVi: 'Bị soán ngôi', titleEn: 'The Knife from Behind',
    quoteVi: '“Họ giữ ghế quá lâu, đến mức những người đứng sau ghế đã học thuộc nhịp thở của họ.”',
    quoteEn: '“They held the seat so long that the ones standing behind it learned the rhythm of their breathing.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, người bạn tin nhất đứng sau lưng bạn trong một căn phòng bạn đã đi qua hàng nghìn lần. Bạn không nghe thấy tiếng bước chân. Khi hồ sơ khép lại, tên bạn vẫn được đọc trong các buổi họp, nhưng bởi người đang ngồi vào chỗ của bạn. 「${c.relic}」 rơi vào tay người khác.`,
      en: `At age ${c.age}, the one you trusted most stands behind you in a room you have crossed a thousand times. You do not hear the footsteps. When the file closes, your name is still read at meetings, but by the one now sitting in your place. "${c.relic}" passes into other hands.`
    })
  },
  last_bout: {
    titleVi: 'Trận đấu cuối', titleEn: 'The Last Bout',
    quoteVi: '“Người trẻ cúi đầu rất lâu. Người già nằm trên sàn nhìn lên trần nhà, và mỉm cười như vừa nghe một điều đúng.”',
    quoteEn: '“The young one bowed for a long time. The old one lay on the floor looking at the ceiling, smiling as if hearing something right.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, bạn bước vào một sân tập vắng với một người có thể thắng bạn. Khi nhát chém cuối cùng chạm tới, bạn nhận ra mình không muốn tránh. 「${c.relic}」 được trao cho người đã đứng đối diện, và cả khu phố biết đó là cách đúng.`,
      en: `At age ${c.age}, you step into an empty yard with someone who can beat you. When the last stroke arrives, you realize you do not want to avoid it. "${c.relic}" is passed to the one who stood opposite, and the whole street knows it was the right way.`
    })
  },
  purged: {
    titleVi: 'Bị Section gạch tên', titleEn: 'Struck by the Sections',
    quoteVi: '“Hana không giết người nó cần. Nó chỉ ngừng cần họ, và để một lá thư tới đúng giờ.”',
    quoteEn: '“Hana does not kill what it needs. It only stops needing, and lets a letter arrive on time.”',
    closing: (c) => ({
      vi: `Ở tuổi ${c.age}, một Request niêm phong đến tay bạn với con dấu của Section mà bạn từng ngồi cạnh. Không có thù lao và không có điều khoản thương vong, vì không ai trong phòng đó định để bạn quay lại. Hồ sơ của bạn được đóng bằng một dòng ngắn. 「${c.relic}」 được cất vào kho.`,
      en: `At age ${c.age}, a sealed Request reaches you under the stamp of a Section you once sat beside. It has no fee and no casualty clause, because no one in that room meant you to return. Your file is closed with one short line. "${c.relic}" goes into storage.`
    })
  },
  ripe_age: {
    titleVi: 'Sống qua nhiều thế hệ', titleEn: 'Outliving Generations',
    quoteVi: '“Họ tiễn những người trẻ ra tay trước họ, và không còn ai nhớ cái tên nào cũ hơn tên họ.”',
    quoteEn: '“They saw off the young ones who struck before them, and no one remembered a name older than theirs.”',
    closing: null
  }
};

export const lifeEndingOf = (char) => (char?.lifeEnding ? LIFE_ENDINGS[char.lifeEnding] || null : null);
