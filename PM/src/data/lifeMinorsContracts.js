// Callbacks for career contracts (careerContracts*.js): a name, a witness or a debt from an earlier job
// comes back some years later. Each one is gated on the memory the contract planted, so it only
// reaches a character who actually did that job.
import { M, C, O, I } from './storyKit.js';

const ADULT = [20, 90];

export const LIFE_MINORS_CONTRACTS = [
  M('mx_thumb_tenant_returns', ADULT, { mem: 'thumb_pistol_tenant' },
    '[Người thuê nhà năm xưa] Có người đứng chờ ở cầu thang nhà bạn, tay cầm một cái gói giấy báo. Bạn nhận ra gương mặt: người thuê nhà đã cầm cố khẩu súng của Thumb, mà bạn chuộc lại.',
    '[The tenant from years ago] Someone is waiting on your stairs holding a parcel wrapped in newspaper. You know the face: the tenant who pawned the Thumb’s pistol, the one you redeemed.',
    [
      C('Mở gói ra', 'Open the parcel', null, null, {}, { out: [
        O(65, 'Trong gói là toàn bộ số tiền bạn đã bỏ ra chuộc súng, từng tờ được vuốt phẳng. Người thuê nhà không nói gì, chỉ gật đầu một lần. Bạn tiễn họ xuống cầu thang và nhìn họ đi.', 'Inside is every coin you paid to redeem the pistol, each note smoothed flat. The tenant says nothing, only nods once. You see them down the stairs and watch them go.', { wealth: +8, sanity: +3 }, { motif: { mercy: 1 } }),
        O(35, 'Trong gói là một khẩu súng khác, cũ hơn, và một mẩu giấy ghi tên một người. Người thuê nhà đã nghe được điều gì đó. Họ muốn bạn giữ nó, và không muốn hỏi ai.', 'Inside is another pistol, an older one, and a scrap of paper with a name on it. The tenant overheard something. They want you to keep it, and do not want to ask anyone else.', { sanity: -3, network: +3 }, { flags: ['TenantsWarning'] })
      ] }),
      C('Không nhận, bảo họ mang về', 'Refuse and tell them to take it home', 'Người thuê nhà đứng yên một lúc lâu trên cầu thang, rồi cúi đầu và đi xuống. Bạn không biết họ định nói gì.', 'The tenant stands motionless on the stairs for a long while, then bows and goes down. You never learn what they meant to say.', { sanity: -2 })
    ],
    I('Bạn không mở cửa. Gói giấy báo nằm trên bậc thang đến sáng, rồi biến mất.', 'You do not open the door. The newspaper parcel lies on the step until morning, then is gone.', { sanity: -1 })),

  M('mx_thumb_color_remembers', ADULT, { mem: 'thumb_color_debt' },
    '[Một Color nhớ tên bạn] Một phong thư không có dấu bưu điện nằm trên bàn bạn. Bên trong chỉ có một dòng chữ, nét viết đều đặn: "Tôi nhớ người đã đến đòi nợ. Hãy ghé qua khi tiện."',
    '[A Color remembers your name] A letter with no postmark lies on your desk. Inside is a single line in an even hand: “I remember the one who came to collect. Come by when convenient.”',
    [
      C('Đến gặp', 'Go to see them', null, null, {}, { out: [
        O(55, 'Họ mời bạn trà và hỏi bạn vài câu về Thumb, không câu nào nhạy cảm. Cuối buổi, họ nói bạn "có tính cách của một người sẽ sống lâu", rồi tiễn bạn ra tận cổng.', 'They offer you tea and ask a few questions about the Thumb, none of them sensitive. At the end they say you “have the temperament of someone who lives long,” and see you to the gate themselves.', { rep: +6, network: +4, sanity: +2 }),
        O(45, 'Họ không có ở nhà. Một người hầu đưa bạn một phong thư khác. Nó chỉ ghi ngày giờ của một buổi hẹn mà bạn chưa từng sắp xếp.', 'They are not home. A servant hands you another letter. It gives only the date and hour of an appointment you never arranged.', { sanity: -4 }, { flags: ['ColorAttention'] })
      ] }),
      C('Bỏ lá thư vào lò sưởi', 'Put the letter in the fireplace', 'Lá thư cháy gọn. Ba ngày sau, bạn nhận ra mình bị theo dõi bởi người không giấu bóng của mình.', 'The letter burns cleanly. Three days later you realize you are being followed by someone who makes no effort to hide their shadow.', { sanity: -3, heat: +4 })
    ],
    I('Bạn để lá thư trên bàn. Nó vẫn ở đó sau một tháng, nguyên vẹn, không bám bụi.', 'You leave the letter on the desk. A month on it is still there, untouched, with no dust on it.', { sanity: -2 })),

  M('mx_middle_book_kin', ADULT, { mem: 'book_grade9_fixer' },
    '[Người nhà của một cái tên] Một thanh niên đứng ở cửa nhà bạn trong mưa. Họ không mang vũ khí. Họ nói họ là em họ của người bạn từng đòi nợ thay Middle, và muốn biết cuốn sổ nói gì về người đó.',
    '[Kin of a name] A young person stands at your door in the rain. They carry no weapon. They say they are the cousin of the one you once collected from for the Middle, and want to know what the book says about them.',
    [
      C('Cho họ xem trang sổ', 'Show them the page', 'Họ đọc rất lâu, ngón tay lướt dọc theo từng dòng. Rồi họ trả cuốn sổ và hỏi: "Nếu tôi trả phần còn lại, có xóa được tên không?" Bạn nói được. Họ gật đầu và ra đi.', 'They read for a long time, a finger tracing each line. Then they hand the book back and ask, “If I pay the rest, does the name come off?” You say it does. They nod and go.', { sanity: +2, network: +2 }, { motif: { mercy: 1 } }),
      C('Đóng cửa lại', 'Shut the door', 'Họ đứng ngoài thêm một lúc. Rồi tiếng bước chân đi xa dần. Sáng hôm sau, ai đó đã vẽ một hình tròn bằng phấn lên cửa nhà bạn.', 'They stand outside a while longer. Then the footsteps recede. The next morning someone has drawn a chalk circle on your door.', { sanity: -3, heat: +3 }),
      C('Hỏi họ muốn gì thật sự', 'Ask what they actually want', null, null, {}, { out: [
        O(50, 'Họ muốn một lời xin lỗi, không phải của bạn, mà của cái tên trong sổ. Bạn hứa mang tới. Họ về trong yên lặng.', 'What they want is an apology, not from you but from the name in the book. You promise to carry it. They go home quietly.', { sanity: +3 }),
        O(50, 'Họ muốn cái chết của người trong sổ. Họ không nói to, nhưng ánh mắt đã đủ. Bạn mất hai giờ để họ bình tĩnh trở lại.', 'What they want is the death of the person in the book. They do not say it aloud, but their eyes do. It takes two hours to bring them back to calm.', { sanity: -4, health: -2 })
      ] })
    ],
    I('Bạn nhìn họ đứng đó cho đến khi mưa tạnh. Họ không gõ cửa, và bạn không mở.', 'You watch them stand there until the rain stops. They do not knock, and you do not open.', { sanity: -2 })),

  M('mx_index_prescript_echo', ADULT, { mem: 'index_proxy_target' },
    '[Tiếng vọng của một Prescript] Máy nhắn tin cũ của bạn, thứ bạn đã bỏ ngăn kéo nhiều năm, kêu lên một lần. Dòng chữ ngắn: "Bạn đã làm đúng. Giờ hãy làm đúng điều ngược lại."',
    '[An echo of a Prescript] Your old pager, left in a drawer for years, sounds once. The text is short: “You did it correctly. Now do the opposite, correctly.”',
    [
      C('Làm theo dòng chữ', 'Do as the text says', null, null, {}, { out: [
        O(50, 'Bạn không biết "ngược lại" nghĩa là gì, nên bạn làm điều duy nhất bạn nghĩ ra: đến thăm gia đình người trong tấm ảnh năm xưa. Họ mở cửa. Không ai nói gì, nhưng họ để bạn ở lại ăn tối.', 'You do not know what “the opposite” means, so you do the only thing you can think of: visit the family of the person in that photograph. They open the door. No one says anything, but they let you stay for dinner.', { sanity: +5, rep: -2 }, { motif: { mercy: 1 } }),
        O(50, 'Bạn đi tìm nhưng không thấy ai. Nhà đã bị phá. Một cụ già bên đường nói: "Họ đi lâu rồi." Máy nhắn tin không bao giờ kêu lại.', 'You go looking and find no one. The house has been demolished. An old person by the road says, “They left long ago.” The pager never sounds again.', { sanity: -3 })
      ] }),
      C('Tắt máy nhắn tin', 'Switch the pager off', 'Bạn tháo pin và bỏ máy xuống đáy ngăn kéo. Nhiều đêm sau, bạn vẫn nghe tiếng bíp ở nơi không có thiết bị nào.', 'You pull the battery and bury the pager at the bottom of the drawer. For many nights after you still hear the beep, where no device is.', { sanity: -4 })
    ],
    I('Bạn nhìn dòng chữ đến khi màn hình tắt. Rồi bạn không nhớ chính xác nó đã viết gì.', 'You watch the text until the screen goes dark. Then you cannot remember exactly what it said.', { sanity: -2 })),

  M('mx_wing_file_returns', ADULT, { mem: 'wing_sealed_file' },
    '[Hồ sơ quay lại] Một người lạ mặc đồng phục Wing đặt trước mặt bạn một tập hồ sơ niêm phong. Bạn nhận ra con dấu: chính con dấu bạn từng chuyển đi. "Người nhận trả lại," họ nói.',
    '[The file returns] A stranger in a Wing uniform sets a sealed file in front of you. You know the seal: the very one you once delivered. “The recipient returned it,” they say.',
    [
      C('Mở niêm phong', 'Break the seal', null, null, {}, { out: [
        O(40, 'Bên trong là bản sao hồ sơ nhân sự của chính bạn, với một dòng ghi chú bằng bút đỏ ở lề: "Đáng tin." Không ai giải thích vì sao nó được gửi đến. Chức vụ của bạn được xem xét lại vào tháng sau.', 'Inside is a copy of your own personnel file with a note in red pen in the margin: “Reliable.” No one explains why it was sent. Your position is reviewed the following month.', { rep: +5, network: +5 }),
        O(60, 'Bên trong là một lệnh điều chuyển đã được ký, chưa điền tên. Bạn nhìn nó rất lâu. Nó chỉ chờ một cái tên, và bạn không biết cái tên ấy là của ai.', 'Inside is a signed transfer order with the name left blank. You look at it for a very long time. It is only waiting for a name, and you do not know whose.', { sanity: -4, network: -2 })
      ] }),
      C('Trả lại không mở', 'Return it unopened', 'Người lạ nhận lại hồ sơ và gật đầu như thể đó là đáp án đúng. Họ để lại một tấm danh thiếp không có chữ.', 'The stranger takes the file back and nods as if that were the correct answer. They leave behind a blank business card.', { sanity: +2, network: +2 })
    ],
    I('Bạn để tập hồ sơ trên bàn. Sáng hôm sau, nó đã biến mất, nhưng bàn bạn đã được dọn gọn.', 'You leave the file on the desk. By morning it is gone, but your desk has been tidied.', { sanity: -2 })),

  M('mx_ws_color_returns', ADULT, { mem: 'ws_color_commission' },
    '[Color quay lại xưởng] Vào một buổi chiều, cánh cửa xưởng mở. Người bước vào là Color Fixer năm xưa, không mang vũ khí. Họ đặt một thanh kiếm cũ lên đe: chính thanh bạn đã rèn lại.',
    '[The Color returns to the forge] One afternoon the forge door opens. The one who steps in is the Color Fixer from years ago, carrying no weapon. They lay an old sword on your anvil: the one you reforged.',
    [
      C('Hỏi họ muốn gì', 'Ask what they want', 'Họ nói thanh kiếm vẫn tốt, nhưng người cầm nó thì không còn như xưa. Họ muốn ngồi bên lò một lúc. Cả chiều hôm đó, hai người nhìn lửa, và không ai nói thêm.', 'They say the sword is still good but the one who holds it is not what they were. They want to sit by the furnace a while. All that afternoon the two of you watch the fire, and neither says more.', { sanity: +4, rep: +3 }),
      C('Cầm thanh kiếm lên xem', 'Pick up the sword and inspect it', null, null, {}, { out: [
        O(60, 'Bạn thấy một vết mòn mà bạn không để lại. Họ đã dùng nó nhiều hơn bạn nghĩ. Họ cười và nói: "Rèn thêm một thanh như thế," rồi đặt trước một khoản lớn.', 'You see a wear mark you did not leave. They used it more than you thought. They smile and say, “Make one more like it,” and place a large deposit.', { wealth: +10, rep: +4, merit: +10 }),
        O(40, 'Bạn thấy một vết nứt nhỏ chạy dọc lưỡi. Họ biết, và đã biết từ lâu. Họ chỉ muốn nghe bạn nói ra điều đó.', 'You see a hairline crack running along the blade. They know, and have known for a long time. They only wanted to hear you say it.', { sanity: -2, rep: +2 })
      ] })
    ],
    I('Bạn đứng yên bên đe. Họ để lại thanh kiếm và đi. Bạn không dám động đến nó cả tuần.', 'You stand still by the anvil. They leave the sword and go. You do not dare touch it for a week.', { sanity: -2 })),

  M('mx_ring_ash_stirs', ADULT, { mem: 'ring_distortion_ash' },
    '[Tro cựa mình] Hộp chì đựng tro từ nơi Distortion gục xuống, vẫn đặt ở góc xưởng, bỗng ấm lên. Nắp hộp rung rất khẽ, như có ai đang gõ từ bên trong.',
    '[The ash stirs] The lead box of ash from where the Distortion fell, still sitting in a corner of the studio, has gone warm. The lid trembles faintly, as if someone were knocking from inside.',
    [
      C('Mở hộp', 'Open the box', null, null, {}, { out: [
        O(50, 'Trong hộp, lớp tro đã tụ lại thành một hình bàn tay nhỏ, rồi tan ra khi bạn nhìn. Bạn cảm thấy bình yên một cách lạ lùng, và không dám ở gần nó thêm.', 'In the box the ash has gathered into the shape of a small hand, then comes apart as you watch. You feel an odd peace, and do not dare stay near it longer.', { sanity: +4, resonance: +6 }),
        O(50, 'Tro bay ra khỏi hộp thành một làn khói và bám vào quần áo bạn. Nhiều tuần sau, mùi của nó vẫn không rửa sạch được.', 'The ash lifts out of the box as a thin smoke and clings to your clothes. For weeks after, its smell will not wash out.', { sanity: -5, resonance: +8 })
      ] }),
      C('Chôn hộp ở nghĩa địa phong tỏa', 'Bury the box in the sealed cemetery', 'Bạn mất hai đêm để chôn nó, một túi đồng xu đặt phía trên. Cái gõ cửa dừng lại, và trong xưởng chỉ còn mùi dầu thông.', 'It costs two nights to bury it, a sack of coins set on top. The knocking stops, and the studio smells only of turpentine.', { sanity: +3, wealth: -4 })
    ],
    I('Bạn lấy khăn phủ lên hộp và quay lưng đi. Tiếng gõ ngừng sau đó vài phút, nhưng không biết là vì ai.', 'You throw a cloth over the box and turn your back. The knocking stops a few minutes later, but you cannot say for whom.', { sanity: -2 })),

  M('mx_pinky_oath_kin', ADULT, { mem: 'pinky_capo_oath' },
    '[Con của một lời thề] Một người trẻ đến nơi bạn ở và quỳ xuống trước mặt bạn. Họ là con của Capo mà bạn từng đòi lời thề máu. Họ không nói gì về thù hận, chỉ xin được học kiếm.',
    '[The child of an oath] A young person comes to your place and kneels before you. They are the child of the Capo whose blood oath you once collected. They say nothing of hatred, only ask to learn the sword.',
    [
      C('Nhận làm học trò', 'Take them on as a student', null, null, {}, { out: [
        O(65, 'Họ học nhanh và chịu được những buổi tập khắc nghiệt nhất. Sau một năm, họ vẫn không nhắc đến cha mình, nhưng đêm nào cũng lau thanh kiếm tập hai lần.', 'They learn fast and endure the harshest sessions. After a year they still never mention their father, but each night they wipe the practice blade twice.', { sanity: +3, merit: +6 }, { motif: { loyalty: 1 } }),
        O(35, 'Họ học nhanh, và đến ngày thứ ba trăm, họ đứng đối diện bạn với thanh kiếm thật. "Con muốn biết cha con đã thấy gì," họ nói. Bạn buộc phải đáp.', 'They learn fast, and on the three hundredth day they stand across from you with a real blade. “I want to know what my father saw,” they say. You must answer.', { health: -6, sanity: -3, merit: +4 })
      ] }),
      C('Từ chối', 'Refuse', 'Họ cúi đầu và đứng dậy mà không nói gì. Bạn thấy họ ngoái lại một lần ở cuối phố, và ánh mắt không phải là thù hận.', 'They bow and rise without a word. You see them look back once at the end of the street, and the look is not hatred.', { sanity: -3 })
    ],
    I('Bạn để họ quỳ đó đến khi trời tối. Họ không động đậy, và bạn là người chớp mắt trước.', 'You let them kneel there until dark. They do not move, and you are the one who blinks first.', { sanity: -3 }))
];
