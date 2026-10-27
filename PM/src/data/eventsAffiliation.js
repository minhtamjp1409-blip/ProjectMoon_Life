// ============================================================================
// AFFILIATION EVENTS: the invitation, the day an Association asks for something you will not give,
// being made a Director, taking a junior under you, and what an Office of your own costs.
// Fields read by applyAffiliationChoice (engine/affiliation.js): affJoin, affDecline, affLeave,
// affStanding, affSection, affDirector, menteeStart, menteeBond, menteeProgress, menteeFate, officeStaff.
// ============================================================================
import { ASSOCIATIONS } from './associations.js';

/** What the first day is like, and what it costs the body or the nerves. */
const JOIN = {
  zwei: {
    vi: 'Bạn được phát một cây gậy sắt, một tấm bảng ghi giờ và một chỗ ngủ ở tầng trệt của trụ sở Zwei. Người điều phối chỉ dặn một câu: khi mọi người chạy ra, bạn là người ở lại.',
    en: 'You are issued an iron bar, a duty board, and a bed on the ground floor of Zwei’s office. The coordinator gives one instruction: when everyone runs out, you are the one who stays.',
    fx: { health: 4, rep: 6, network: 4 }
  },
  shi: {
    vi: 'Không ai chào bạn. Có một cái giường, một cây kim khắc dấu, và một danh sách tên mà bạn chưa được phép đọc. Shi dạy rằng bạn chỉ cần biết tên khi đến lúc cần.',
    en: 'No one greets you. There is a cot, a stamped needle, and a list of names you are not yet permitted to read. Shi teaches that you need only know a name when the time comes.',
    fx: { sanity: -4, rep: 6, wealth: 4, heat: 6 }
  },
  cinq: {
    vi: 'Bạn bước lên sàn đấu của Cinq lần đầu để người ta xem. Không có khán giả nào cổ vũ. Chỉ có tiếng bút của trọng tài ghi từng động tác của bạn vào sổ.',
    en: 'You step onto Cinq’s floor for the first time to be watched. No audience cheers. Only the referee’s pen records each movement of yours in the book.',
    fx: { rep: 8, sanity: -2, wealth: 2 }
  },
  liu: {
    vi: 'Có người gắp thức ăn vào bát bạn trước khi bạn kịp ngồi xuống. Nhà Liu không hỏi bạn từ đâu đến. Họ hỏi bạn thích ăn món nào, và ghi nhớ.',
    en: 'Someone puts food in your bowl before you finish sitting down. The Liu house does not ask where you come from. They ask which dishes you like, and remember.',
    fx: { network: 8, sanity: 4, rep: 3 }
  },
  seven: {
    vi: 'Bạn nhận một tấm thẻ, một bàn làm việc và một cuốn sổ trống. Người hướng dẫn nói Seven không xử phạt vì tin ai. Seven xử phạt vì đã biết trước.',
    en: 'You receive a badge, a desk, and a blank notebook. The instructor says Seven does not punish on belief. Seven punishes because it knew beforehand.',
    fx: { network: 8, sanity: -2, rep: 4 }
  },
  tres: {
    vi: 'Bạn ngồi cả ngày với cuốn sổ đăng ký và một chiếc kính lúp. Ngày đầu, bạn tìm ra ba số hiệu sai. Cán bộ nói sai thế là ít, và đừng tự hào về chuyện đó.',
    en: 'You sit all day with the register and a magnifier. On the first day you find three wrong serials. The officer says that is few, and that you should not be proud.',
    fx: { wealth: 6, rep: 4, network: 3 }
  },
  devyat: {
    vi: 'Bạn nhận chuyến hàng đầu tiên mà không biết bên trong có gì. Người phát hàng nói đó là cách duy nhất để bạn không phải nói dối khi có người hỏi.',
    en: 'You receive your first consignment without knowing what is inside. The dispatcher says that is the only way you will not have to lie when someone asks.',
    fx: { network: 6, wealth: 4, rep: 4 }
  },
  dieci: {
    vi: 'Một đứa trẻ trong nhà Dieci kéo tay áo bạn và hỏi bạn đã thấy gì ngoài Ruins. Bạn nói bạn chưa vào đó bao giờ. Nó gật đầu, như thể câu trả lời ấy cũng là một câu trả lời.',
    en: 'A child in Dieci’s house tugs your sleeve and asks what you saw out in the Ruins. You say you have never been in. They nod, as if that too were an answer.',
    fx: { sanity: 5, network: 4, rep: 3 }
  },
  oufi: {
    vi: 'Bạn ký tên, rồi được phát chiếc áo choàng nặng của Öufi và một cây kích chấp pháp. Điều khoản đầu tiên bạn thi hành thuộc về chính bạn: bạn không được nói rằng bạn không biết luật.',
    en: 'You sign, then are issued Öufi’s heavy coat and a halberd. The first clause you carry out belongs to you: you may not claim ignorance of the rule.',
    fx: { rep: 6, wealth: 4, sanity: -2 }
  }
};

const inviteEvents = Object.entries(ASSOCIATIONS).map(([id, def]) => ({
  id: `aff_invite_${id}`,
  age: [16, 99], major: true, weight: 1, jobs: ['Fixer'], forbids: ['HasAffiliation', 'Distorted'],
  vi: `[Lời mời của ${def.short}] ${def.inviteVi}`,
  en: `[An offer from ${def.short}] ${def.inviteEn}`,
  choices: [
    {
      labelVi: `Nhận lời: vào ${def.name}, chuyên ${def.specVi}`,
      labelEn: `Accept: join ${def.name}, which handles ${def.specEn}`,
      resultVi: JOIN[id].vi, resultEn: JOIN[id].en,
      affJoin: id, recordsAdd: ['assoc_joined'], effects: JOIN[id].fx, meritAdd: 6
    },
    {
      labelVi: 'Từ chối, giữ thân phận Fixer tự do',
      labelEn: 'Decline and keep working as a freelance Fixer',
      resultVi: 'Người của Association cúi chào, để lại cho bạn một tấm danh thiếp và không giục. Bạn vẫn nhận Request từ những ai tìm đến, và giữ nguyên thù lao cho mình, với cái giá là không ai đứng sau lưng.',
      resultEn: 'The Association’s messenger bows, leaves you a card, and does not press. You still take Requests from whoever comes, and keep the fees for yourself, at the price of no one standing behind you.',
      affDecline: id, effects: { sanity: 2 }
    }
  ]
}));

const officeInvite = {
  id: 'aff_invite_office',
  age: [16, 99], major: true, weight: 1, jobs: ['Fixer'], forbids: ['HasAffiliation', 'Distorted'],
  vi: '[Chỗ trống ở một Office] Ba Office nhỏ trong khu bạn ở cùng cần thêm một Fixer. Không phải Association: không có Section, không có lương cố định. Có một bảng việc, một bếp chung, và những người biết tên bạn.',
  en: '[A seat at an Office] Three small Offices near you each need another Fixer. Not an Association: no Sections, no fixed wage. A job board, a shared stove, and people who know your name.',
  choices: [
    {
      labelVi: 'Hook Office: săn tiền thưởng trong hẻm', labelEn: 'Hook Office: bounty work in the alleys',
      resultVi: 'Người điều phối của Hook Office đưa bạn một cái móc câu nhỏ làm thẻ. "Thù lao theo việc, không theo lời hứa", người ấy nói. Bạn có tên trên bảng từ chiều hôm đó.',
      resultEn: 'Hook Office’s coordinator hands you a small hook as a badge. “Pay by the job, not by promises,” they say. By evening your name is on the board.',
      affJoin: 'office:hook', recordsAdd: ['assoc_joined'], effects: { network: 6, rep: 4, heat: 3 }, meritAdd: 5
    },
    {
      labelVi: 'Yun’s Office: việc vặt và khách quen', labelEn: 'Yun’s Office: errands and regular clients',
      resultVi: 'Yun’s Office nhận bạn với một bữa tối. Phần lớn việc ở đây là đưa thư, đòi khoản nhỏ, ngồi với người lạ trong nhà để họ ngủ được. Không ai vội, và đó là điều bạn chưa quen.',
      resultEn: 'Yun’s Office takes you in with a dinner. Most of the work is carrying letters, collecting small sums, and sitting with strangers in their houses so they can sleep. No one is in a hurry, and you are not used to that.',
      affJoin: 'office:yun', recordsAdd: ['assoc_joined'], effects: { network: 8, sanity: 4, wealth: 2 }, meritAdd: 5
    },
    {
      labelVi: 'Molar Office: gác kho và bảo vệ bến', labelEn: 'Molar Office: warehouse watch and dock security',
      resultVi: 'Molar Office đưa bạn một chiếc áo khoác còn mùi dầu máy và một ca gác đêm đầu tiên. Người trực trước nói rằng đêm ở bến yên hơn đêm ở trong đầu, và đưa bạn ly trà.',
      resultEn: 'Molar Office gives you a coat that still smells of machine oil and a first night watch. The previous watchman says nights on the pier are quieter than nights in the head, and hands you tea.',
      affJoin: 'office:molar', recordsAdd: ['assoc_joined'], effects: { health: 3, network: 5, rep: 4 }, meritAdd: 5
    },
    {
      labelVi: 'Không nhận chỗ nào, tiếp tục tự do', labelEn: 'Take none of them and stay freelance',
      resultVi: 'Bạn trả lại cả ba tấm danh thiếp. Không ai tỏ ra buồn. Một người ở Hook Office nói rằng ghế vẫn ở đó nếu bạn đổi ý, và hơi ấm của bếp chung cũng vậy.',
      resultEn: 'You return all three cards. No one seems sorry. Someone at Hook Office says the seat will still be there if you change your mind, and so will the warmth of the shared stove.',
      affDecline: 'office', effects: { sanity: 2 }
    }
  ]
};

/**
 * One dilemma per branch: an order that is within the rules and not within what you will do.
 * Obeying keeps your standing and costs you something; refusing quietly costs standing;
 * leaving makes you a defector. These are the game's own story, not canon.
 */
const CONFLICTS = {
  zwei: {
    vi: '[Con phố phải giữ] Zwei ra lệnh bạn giữ một con phố để bảo vệ một nhân vật quan trọng. Khu nhà sau lưng còn hai mươi hộ chưa kịp sơ tán, và người trả phí không muốn ai biết có bao nhiêu hộ nằm sau chỗ bạn đứng.',
    en: '[The street to hold] Zwei orders you to hold a street to protect a VIP. Behind you are twenty households not yet evacuated, and the one paying the fee does not want anyone to learn how many stand behind your post.',
    obey: ['Giữ vị trí đúng lệnh', 'Hold position as ordered', 'Bạn đứng đến sáng. Nhân vật quan trọng bình an. Khu nhà sau lưng thì không, và bạn nghe được điều đó từ người đưa tin chứ không từ ai trong Zwei.', 'You hold until morning. The VIP is safe. The houses behind you are not, and you hear it from a messenger rather than anyone in Zwei.'],
    quiet: ['Báo cáo giữ vị trí, nhưng đưa dân đi qua lối sau', 'Report holding your post, while moving residents out the back way', 'Bạn dẫn từng hộ qua lối sau, từng nhóm nhỏ. Không ai trong Zwei hỏi vì sao con phố vắng hơn dự kiến, nhưng sổ của bạn ghi một lần trái lệnh.', 'You lead households out the back, a few at a time. No one in Zwei asks why the street is emptier than planned, but your record gains a note of disobedience.'],
    leave: ['Bỏ vị trí, đưa dân đi và rời Zwei', 'Leave the post, take the residents out, and leave Zwei', 'Bạn bỏ vòng canh trước mặt cả đội. Hai mươi hộ đi qua trước mắt người trả phí. Bạn để lại cây gậy sắt trên bậc thềm, và không ai đuổi theo.', 'You abandon the cordon in front of the whole team. Twenty households pass in front of the one who paid. You leave your iron bar on the step, and no one follows.']
  },
  shi: {
    vi: '[Một cái tên vô tội] Shi giao bạn một hợp đồng với đủ ngày giờ, chỉ thiếu lý do. Khi theo dõi, bạn thấy người ấy là một giáo viên dạy trẻ em ở khu nhà nghèo. Người điều phối nói lý do không phải việc của bạn.',
    en: '[An innocent name] Shi gives you a contract with date and time, missing only the reason. Watching, you find the target is a teacher of children in a poor tenement. The handler says the reason is not your business.',
    obey: ['Thi hành như được giao', 'Carry it out as assigned', 'Bạn làm xong trong một phút. Trên đường về, bạn nhớ ra mình chưa bao giờ ngừng nhìn vào cuốn vở của đứa trẻ đứng cạnh người ấy. Shi trả công đủ, và bạn không dùng nó trong nhiều ngày.', 'It takes a minute. On the way back you realize you never stopped looking at the notebook of the child standing beside them. Shi pays in full, and you do not spend it for days.'],
    quiet: ['Báo cáo rằng mục tiêu đã rời khu, và để người ấy đi', 'Report the target has left the district, and let them go', 'Người giáo viên chuyển sang một khu khác trong tuần. Shi nghi ngờ nhưng không có bằng chứng. Người điều phối nhìn bạn lâu hơn mức bình thường ở buổi họp sau.', 'The teacher moves to another district within the week. Shi suspects but has no proof. The handler looks at you longer than usual at the next meeting.'],
    leave: ['Cảnh báo người ấy và bỏ Shi', 'Warn them and quit Shi', 'Bạn gõ cửa người ấy lúc nửa đêm và nói đủ để họ hiểu. Sáng hôm sau, dấu của Shi trên ngực bạn vẫn còn, nhưng bạn không còn người điều phối.', 'You knock on their door at midnight and say just enough. By morning the Shi mark on your chest is still there, but you no longer have a handler.']
  },
  cinq: {
    vi: '[Trận đã định trước] Cinq xếp bạn vào một trận mà trọng tài thì thầm rằng kết quả đã được trả tiền. Bạn phải thua đúng hiệp ba. Đối thủ là một người trẻ chưa biết điều đó, và đang cần chiến thắng này hơn bạn.',
    en: '[A fixed bout] Cinq slots you into a bout where the referee whispers the result has been paid for. You must lose in the third round. Your opponent is young, unaware, and needs this win more than you do.',
    obey: ['Thua đúng hiệp ba', 'Lose in the third round', 'Bạn ngã xuống với cái nhìn ngạc nhiên mà bạn đã tập. Người trẻ giơ tay lên, tin vào chiến thắng. Cinq trả công và nhận xét bạn diễn đạt hơn mức cần.', 'You fall with the surprised look you rehearsed. The young one raises their hand, believing in the win. Cinq pays and remarks that you acted better than needed.'],
    quiet: ['Đấu thật, nhưng thua sát nút', 'Fight honestly, and lose by a hair', 'Bạn đánh đúng sức mình, và người trẻ thắng trong một thế khó tin. Cinq không trả đủ, nhưng cũng không biết bạn đã làm gì.', 'You fight at your true level, and the young one wins in a hard-to-believe exchange. Cinq does not pay in full, but does not know what you did.'],
    leave: ['Thắng thật và nói rõ trận đã bị mua', 'Win honestly and say aloud the bout was bought', 'Bạn thắng bằng hiệp hai và nói cho cả sàn đấu nghe. Cinq im lặng. Chiếc thẻ vào sàn được thu lại ngay trong chiều hôm đó.', 'You win in the second round and say it to the whole floor. Cinq stays silent. Your pass to the floor is collected that very afternoon.']
  },
  liu: {
    vi: '[Bữa tối của nhà Liu] Một người nhà bị đánh ở chợ. Người đứng đầu chỉ ra một căn nhà, nói chủ nhà đã bán lịch đi lại của người nhà ấy. Bạn đã ngồi ăn cơm với con của chủ nhà đó, và biết họ bị ép.',
    en: '[The Liu house dinner] A family member was beaten at the market. The head points to a house and says its owner sold the family member’s routine. You have eaten rice with that owner’s child, and know they were coerced.',
    obey: ['Đi cùng cả nhà và trả đòn', 'Go with the house and answer the blow', 'Bạn đứng ở hàng giữa và nhìn chủ căn nhà ấy quỳ xuống. Đứa con nhìn bạn từ cửa sổ tầng hai. Bữa tối hôm sau, bạn ăn hết bát cơm và không nhớ vị.', 'You stand in the middle line and watch the owner kneel. The child looks at you from the second-floor window. At dinner the next night you finish the bowl and do not taste it.'],
    quiet: ['Xin được đứng ngoài và đưa người ấy đến xin lỗi', 'Ask to stay out and bring the owner to apologize', 'Người đứng đầu cân nhắc rất lâu. Chủ căn nhà quỳ trước bàn ăn, trả một khoản lớn. Chuyện qua, nhưng không ai gắp thêm đồ ăn cho bạn trong vài ngày.', 'The head thinks it over a long time. The owner kneels before the table and pays a large sum. It passes, but no one serves you extra food for several days.'],
    leave: ['Dẫn gia đình ấy đi trước khi cả nhà đến', 'Take that family away before the house arrives', 'Bạn gõ cửa họ lúc rạng sáng và dẫn họ ra khỏi khu. Khi trở về, cái bàn ăn đã dọn xong, và không còn bát nào đặt cho bạn.', 'You knock on their door at dawn and lead them out of the district. When you return, the dining table is cleared, and no bowl is set for you.']
  },
  seven: {
    vi: '[Người cung cấp tin] Seven ra lệnh bạn giao nộp một người đã nhiều năm cung cấp tin cho bạn để bị xử phạt sau hợp đồng. Người ấy không biết. Họ vẫn mang đến cho bạn một túi bánh mỗi lần gặp.',
    en: '[The informant] Seven orders you to hand over someone who has fed you information for years, for post-contract punishment. They do not know. They still bring you a bag of pastries each time you meet.',
    obey: ['Giao nộp theo lệnh', 'Hand them over as ordered', 'Bạn báo địa điểm và giờ gặp. Họ đến với túi bánh như mọi lần. Seven ghi nhận bạn đã làm đúng, và bạn không còn nguồn tin nào trong khu ấy.', 'You file the place and time. They arrive with the pastries as always. Seven notes you did right, and you have no sources left in that district.'],
    quiet: ['Báo cáo thiếu chứng cứ, và giữ người ấy ngoài tầm mắt', 'Report insufficient evidence, and keep them out of sight', 'Seven chấp nhận, một lần. Người cung cấp tin vẫn đến, và bạn không dám nói họ nghe điều gì đã suýt xảy ra.', 'Seven accepts it, once. The informant keeps coming, and you do not dare tell them what almost happened.'],
    leave: ['Báo trước cho người ấy và rời Seven', 'Warn them and leave Seven', 'Bạn đặt thẻ Seven lên bàn và nói thật với họ. Họ nhìn bạn rất lâu rồi đưa túi bánh còn lại. Seven sẽ biết, nhưng không phải tối nay.', 'You set the Seven badge on the table and tell them honestly. They look at you a long while and hand over the remaining pastries. Seven will know, but not tonight.']
  },
  tres: {
    vi: '[Xưởng của người thợ già] Tres ra lệnh bạn niêm phong một xưởng một người vì không đăng ký công cụ. Cả khu phố mang đồ đến xưởng ấy để sửa, và người thợ già không tính tiền những ai không có.',
    en: '[The old craftsperson’s shop] Tres orders you to seal a one-person workshop for unregistered tools. The whole neighborhood brings its things to be mended there, and the old craftsperson charges nothing to those who have nothing.',
    obey: ['Niêm phong theo lệnh', 'Seal it as ordered', 'Bạn dán từng tờ niêm phong lên dụng cụ. Người thợ già nhìn, không nói. Hôm sau trước cửa xưởng có một hàng người đứng im, và bạn đi qua không nhìn họ.', 'You paste each seal onto the tools. The old craftsperson watches and says nothing. The next day a line of people stands silent outside the shop, and you walk past without looking.'],
    quiet: ['Đăng ký giúp những dụng cụ còn đăng ký được', 'Register what can still be registered', 'Bạn ngồi với người thợ cả đêm và điền từng dòng. Tres chấp nhận phần lớn, và gạch phần còn lại. Xưởng ở lại, thiếu vài thứ.', 'You sit with them through the night filling every line. Tres accepts most and strikes the rest. The shop stays, missing a few things.'],
    leave: ['Mang dụng cụ giấu đi và bỏ Tres', 'Hide the tools and quit Tres', 'Bạn khiêng từng chiếc hộp vào hầm nhà bạn trước bình minh. Khi Tres đến, xưởng chỉ còn bốn bức tường. Bạn trả thẻ kiểm định mà không phải cố hiểu họ nghĩ gì.', 'You carry each crate to your cellar before dawn. When Tres arrives the shop is four bare walls. You hand back your inspection badge without trying to read what they think.']
  },
  devyat: {
    vi: '[Rương đang thở] Devyat’ giao bạn một thùng hàng, quy tắc duy nhất là không mở. Giữa đường, bạn nghe thấy hơi thở bên trong. Người phát hàng nói đó là chuyện thường. Người nhận ở cuối chuyến cũng nói thế.',
    en: '[The breathing crate] Devyat’ hands you a crate, the only rule being not to open it. Midway, you hear breathing inside. The dispatcher says this is normal. The recipient at the end says the same.',
    obey: ['Giao đến nơi, không mở', 'Deliver it unopened', 'Bạn đặt thùng xuống bậc thềm. Người nhận mang nó vào, nhẹ nhàng như mang một đứa nhỏ. Devyat’ trả công, và bạn đi nhiều tháng mà không nhớ nổi âm thanh ấy hay quên được nó.', 'You set the crate on the step. The recipient carries it in as gently as one carries a small child. Devyat’ pays, and for months you can neither recall nor forget the sound.'],
    quiet: ['Hé nắp một khe, rồi giao đi', 'Crack the lid a sliver, then deliver', 'Bạn nhìn thấy một mảnh vải và một bàn tay nhỏ. Bạn đóng lại, giao đi, và Devyat’ không bao giờ biết. Bạn thì biết.', 'You glimpse a scrap of cloth and a small hand. You close it, deliver, and Devyat’ never knows. You do.'],
    leave: ['Mở thùng ngay giữa đường và bỏ Devyat’', 'Open it on the spot and quit Devyat’', 'Bạn mở nắp. Bên trong là điều bạn không muốn kể lại, và bạn làm điều đúng, theo cách mà Devyat’ sẽ không bao giờ tha thứ. Gói vải dầu cuối cùng bạn cầm là gói để đắp cho chính mình.', 'You open the lid. Inside is something you do not wish to recount, and you do the right thing, in a way Devyat’ will never forgive. The last oilcloth you hold is the one you wrap yourself in.']
  },
  dieci: {
    vi: '[Đứa trẻ nghe thấy tiếng] Một đứa trẻ trong nhà Dieci có thể nghe thấy tiếng gọi từ một Relic, điều mà thiết bị không phát hiện được. Dieci muốn dùng nó để dò. Đứa trẻ vui vì được giao việc.',
    en: '[The child who hears] A child in Dieci’s house can hear the call from a Relic, something instruments cannot detect. Dieci wants to use them as a detector. The child is glad to be given a job.',
    obey: ['Đưa đứa trẻ đi cùng đội dò', 'Take the child along with the survey team', 'Đứa trẻ chỉ đúng chỗ, ba lần liền. Đến lần thứ tư, nó không nói gì và nhìn bạn rất lâu. Dieci đặt cho nó một suất ăn lớn hơn.', 'The child points to the right spot, three times in a row. On the fourth, they say nothing and look at you for a long time. Dieci gives them a larger portion at dinner.'],
    quiet: ['Đưa đứa trẻ đi, nhưng chỉ đến cửa Ruin, không vào', 'Take the child, but only to the Ruin’s door, not in', 'Đứa trẻ chỉ hướng từ xa, và đội dò mất thêm ngày. Nhà nghiên cứu không vui, nhưng ghi nhận đứa trẻ vẫn còn nguyên vẹn.', 'The child points the direction from afar, and the survey team loses a day. The researcher is displeased, but notes the child is intact.'],
    leave: ['Dẫn đứa trẻ ra khỏi nhà Dieci và rời đi', 'Take the child out of Dieci’s house and leave', 'Bạn đưa đứa trẻ qua cổng lúc trời chưa sáng. Nó nắm tay bạn suốt đường. Nhà nghiên cứu đứng ở cửa và không gọi theo, vì đã hiểu.', 'You walk the child through the gate before dawn. They hold your hand the whole way. The researcher stands at the door and does not call after you, having understood.']
  },
  oufi: {
    vi: '[Điều khoản không có lòng trắc ẩn] Öufi giao bạn thi hành một bản án tịch thu nhà của một gia đình có đứa trẻ đang sốt. Điều khoản rõ ràng và hợp pháp. Không có dòng nào về đứa trẻ.',
    en: '[A clause with no mercy] Öufi assigns you a verdict to seize the home of a family with a feverish child. The clause is clear and lawful. There is no line about the child.',
    obey: ['Thi hành đúng điều khoản', 'Enforce the clause as written', 'Bạn đọc bản án to, từng chữ. Cả nhà ra đứng ở bậc thềm. Đứa trẻ được bế đi trong chăn. Öufi trả công, và đóng dấu rằng việc đã xong.', 'You read the verdict aloud, word by word. The family stands on the step. The child is carried out in a blanket. Öufi pays, and stamps the job complete.'],
    quiet: ['Xin hoãn một tuần theo điều khoản ngoại lệ', 'Request a week’s delay under the exceptions clause', 'Điều khoản ngoại lệ có thật, và bạn là người duy nhất đọc đến đó. Öufi chấp nhận, và ghi chú rằng bạn đọc kỹ hơn mức họ cần.', 'The exceptions clause is real, and you are the only one who read that far. Öufi accepts it, and notes you read more closely than they need.'],
    leave: ['Xé bản án và rời Öufi', 'Tear up the verdict and leave Öufi', 'Bạn xé bản án trước mặt cả nhà. Öufi không tha thứ cho điều đó, và cũng không cần đuổi theo ngay: họ biết bạn mang chiếc áo choàng của họ.', 'You tear up the verdict before the family. Öufi does not forgive that, and does not need to chase at once: they know you wear their coat.']
  },
  office: {
    vi: '[Khoản chia không đều] Office của bạn nhận một việc lớn và người điều phối quyết định chia phần theo thâm niên, không theo người nào chịu rủi ro. Bạn đã đứng cửa sau suốt đêm, và phần của bạn bằng phần của người ngủ.',
    en: '[An uneven split] Your Office takes a large job and the coordinator decides to split by seniority, not by who bore the risk. You held the back door all night, and your share equals that of someone who slept.',
    obey: ['Nhận phần được chia', 'Accept the share given', 'Bạn nhận phong bì và đi ra. Người điều phối gật đầu, hài lòng vì một sự im lặng đã mua được rẻ. Bếp chung tối đó có thêm thịt.', 'You take the envelope and leave. The coordinator nods, pleased that silence was bought cheaply. The shared stove has extra meat that night.'],
    quiet: ['Nói thẳng với người điều phối, ngay tại bàn', 'Speak plainly to the coordinator, at the table', 'Cả bàn im lặng. Người điều phối đếm lại, và chia lại. Sau đó có vài người nhìn bạn khác đi, ít nhất một nửa trong đó là biết ơn.', 'The table falls silent. The coordinator recounts and redivides. After that a few people look at you differently, at least half of them gratefully.'],
    leave: ['Lấy phần của mình và rời Office', 'Take your own share and leave the Office', 'Bạn đặt phù hiệu lên bàn. Người điều phối không giữ bạn, và cũng không nói lời tạm biệt. Bếp chung vẫn ấm, nhưng không còn chỗ ngồi cho bạn.', 'You set the badge on the table. The coordinator neither holds you back nor says goodbye. The shared stove stays warm, but there is no seat for you.']
  }
};

const conflictEvents = Object.entries(CONFLICTS).map(([id, c]) => ({
  id: `aff_conflict_${id}`,
  age: [20, 99], major: true, weight: 0, causalOnly: true, repeatable: true, jobs: ['Fixer'],
  need: { aff: id === 'office' ? 'office' : id, affYears: id === 'office' ? 2 : 3 },
  vi: c.vi, en: c.en,
  choices: [
    {
      labelVi: c.obey[0], labelEn: c.obey[1], resultVi: c.obey[2], resultEn: c.obey[3],
      affStanding: 10, effects: { sanity: -8, rep: 3 }, meritAdd: 6
    },
    {
      labelVi: c.quiet[0], labelEn: c.quiet[1], resultVi: c.quiet[2], resultEn: c.quiet[3],
      affStanding: -12, effects: { sanity: 3, network: 2 }, meritAdd: 2
    },
    {
      labelVi: c.leave[0], labelEn: c.leave[1], resultVi: c.leave[2], resultEn: c.leave[3],
      affLeave: 'defect', effects: { sanity: 4, rep: -5, network: -8, heat: 16 },
      scheduleConsequences: [{ eventId: 'csq_aff_defector_visit', delayYears: 3, reasonVi: 'Association cũ chưa quên người đã bỏ đi', reasonEn: 'The old Association has not forgotten who walked out' }]
    }
  ]
}));

const lifecycleEvents = [
  {
    id: 'csq_aff_defector_visit',
    age: [20, 99], major: true, weight: 0, causalOnly: true, jobs: ['Fixer'], requires: ['Defector'],
    vi: '[Người của chỗ cũ] Một người từng đứng cùng hàng với bạn ở Association cũ ngồi chờ trong quán bạn hay đến. Họ không mang vũ khí, không mang thẻ. Họ chỉ muốn nói về những gì bạn mang đi khi rời khỏi đó.',
    en: '[Someone from the old place] A person who once stood in your line at the old Association waits in the café you frequent. They carry no weapon, no badge. They only want to talk about what you took with you when you left.',
    choices: [
      {
        labelVi: 'Trả lại thứ bạn mang đi, nói rõ lý do bạn rời',
        labelEn: 'Return what you took and say plainly why you left',
        resultVi: 'Bạn đặt thứ ấy lên bàn. Người kia cầm lên, nhìn bạn rất lâu, rồi nói rằng họ sẽ báo cáo bạn đã nói gì. Họ không nói báo cho ai, và bạn không hỏi.',
        resultEn: 'You set it on the table. The other picks it up, looks at you a long while, then says they will report what you said. They do not say to whom, and you do not ask.',
        effects: { rep: 3, sanity: 3, heat: -10 }, flagsRemove: ['Defector'], meritAdd: 4
      },
      {
        labelVi: 'Từ chối nói, và rời quán ngay',
        labelEn: 'Refuse to talk and leave the café at once',
        resultVi: 'Bạn đứng dậy khi họ đang nói dở. Người kia không đuổi theo. Cả tháng sau, bạn đổi đường về nhà ba lần.',
        resultEn: 'You stand while they are mid-sentence. The other does not follow. For a month after, you change your way home three times.',
        effects: { sanity: -5, heat: 8 }
      }
    ]
  },
  {
    id: 'aff_director_offer',
    age: [36, 99], major: true, weight: 0, causalOnly: true, jobs: ['Fixer', 'Color Fixer'], forbids: ['AssocDirector'],
    need: { aff: 'assoc', affSection: [1, 1], grade: [0, 3] },
    vi: '[Chiếc ghế Director] Section 1 của Association không còn ai đủ tư cách ngồi cùng bạn. Director cũ muốn rời, và danh sách tên người thay thế chỉ có một dòng. Người điều phối đặt chìa khóa phòng họp lên bàn và không nói gì.',
    en: '[The Director’s chair] Your Association’s Section 1 has no one left worthy of sitting beside you. The old Director wants to step down, and the list of replacements has one line. The coordinator sets the meeting-room key on the table and says nothing.',
    choices: [
      {
        labelVi: 'Nhận chiếc ghế: dẫn dắt cả Section',
        labelEn: 'Take the chair and lead the Section',
        resultVi: 'Bạn mở phòng họp lần đầu và thấy những khuôn mặt trẻ hơn đang chờ. Không ai hỏi bạn có xứng không. Họ chỉ hỏi sáng mai nên đến lúc nào.',
        resultEn: 'You open the meeting room for the first time and find younger faces waiting. No one asks if you deserve it. They only ask what time to arrive tomorrow.',
        affDirector: true, effects: { rep: 8, network: 10, sanity: -4, wealth: 4 }, meritAdd: 20
      },
      {
        labelVi: 'Từ chối: muốn ở lại ngoài hiện trường',
        labelEn: 'Decline and stay in the field',
        resultVi: 'Người điều phối cất chìa khóa vào ngăn kéo, không có vẻ ngạc nhiên. "Cánh cửa ấy không khóa với bạn", họ nói. Đó có thể là lời khen, cũng có thể là một lời cảnh báo.',
        resultEn: 'The coordinator puts the key back in the drawer, unsurprised. “That door is not locked to you,” they say. It could be praise, or a warning.',
        affStanding: 5, effects: { rep: 3, sanity: 3 }
      }
    ]
  },
  {
    id: 'aff_mentee_assoc',
    age: [32, 99], major: true, weight: 0, causalOnly: true, jobs: ['Fixer', 'Color Fixer'], repeatable: true, forbids: ['Mentoring'],
    need: { aff: 'any', grade: [0, 5] },
    vi: '[Một người trẻ được giao cho bạn] Association của bạn có một Fixer trẻ vừa nhận giấy phép và chưa nhận nổi một Request cho tử tế. Người điều phối chỉ vào bạn: "Cho bạn tập một năm, hai năm cũng được." Người trẻ đứng cạnh, tay nắm chặt dây đeo.',
    en: '[A junior assigned to you] Your Association has a young Fixer who just got a license and cannot yet hold a Request properly. The coordinator points at you: “Let them train under you a year, two if needed.” The young one stands beside, gripping their strap.',
    choices: [
      {
        labelVi: 'Nhận dìu dắt, theo đúng bài bản', labelEn: 'Take them under you, by the book',
        resultVi: 'Bạn dạy họ cách nhìn một căn phòng trước khi bước vào, cách ngồi khi đợi, và cách nói "không" với một khách hàng giàu. Họ ghi chép mọi thứ, kể cả những điều bạn nói đùa.',
        resultEn: 'You teach them how to look at a room before entering, how to sit while waiting, and how to say “no” to a rich client. They write everything down, including what you said as a joke.',
        menteeStart: true, npcAdd: { role: 'mentee', bond: 50 }, flagsAdd: ['MentorStarted'], effects: { sanity: 2, wealth: -2, network: 3 }, meritAdd: 5
      },
      {
        labelVi: 'Từ chối: bạn chưa muốn có người đi theo', labelEn: 'Decline: you do not want someone following you',
        resultVi: 'Người điều phối ghi nhận, nhưng không hài lòng. Người trẻ được giao cho một Fixer khác, và nhìn bạn một lần trước khi rời phòng.',
        resultEn: 'The coordinator records it, displeased. The young one is handed to another Fixer, and looks at you once before leaving the room.',
        affStanding: -4, effects: { sanity: 1 }
      }
    ]
  },
  {
    id: 'aff_mentee_free',
    age: [32, 99], major: true, weight: 0, causalOnly: true, jobs: ['Fixer', 'Color Fixer'], repeatable: true, forbids: ['Mentoring'],
    need: { aff: 'free', grade: [0, 5] },
    vi: '[Một người trẻ tự tìm đến] Một Fixer trẻ không thuộc nơi nào đứng chờ bạn trước cửa với một bản danh sách các Request họ đã trượt. Họ không xin tiền. Họ xin bạn nói cho họ biết họ đã sai ở đâu.',
    en: '[A junior comes on their own] A young Fixer belonging nowhere waits at your door with a list of Requests they have failed. They do not ask for money. They ask you to tell them where they went wrong.',
    choices: [
      {
        labelVi: 'Nhận dạy họ', labelEn: 'Agree to teach them',
        resultVi: 'Bạn đọc danh sách và gạch ba dòng. Bạn nói rằng cả ba lần họ đều thất bại ở cùng một chỗ: họ ngại làm phiền người đang chờ. Họ im lặng rất lâu, rồi gật đầu.',
        resultEn: 'You read the list and strike three lines. You say they failed at the same spot all three times: they were afraid of troubling those who waited. They stay silent a long time, then nod.',
        menteeStart: true, npcAdd: { role: 'mentee', bond: 50 }, flagsAdd: ['MentorStarted'], effects: { sanity: 2, wealth: -2, network: 3 }, meritAdd: 5
      },
      {
        labelVi: 'Cho họ lời khuyên rồi đóng cửa', labelEn: 'Give advice and close the door',
        resultVi: 'Bạn nói vài câu, không dài hơn một hơi thở. Họ cảm ơn, rất nghiêm túc, và đi xuống cầu thang chậm hơn khi đến.',
        resultEn: 'You say a few words, no longer than a breath. They thank you with great seriousness, and go down the stairs more slowly than they came up.',
        effects: { sanity: 1 }
      }
    ]
  },
  {
    id: 'aff_mentee_wing',
    age: [28, 99], major: true, weight: 0, causalOnly: true, jobs: ['Wing Employee'], repeatable: true, forbids: ['Mentoring'],
    need: { wingRankAtLeast: 2 },
    vi: '[Nhân sự trẻ dưới quyền] Ban nhân sự của Wing điều một Feather trẻ vừa qua kỳ sát hạch về dưới phòng ban của bạn. Hồ sơ điểm số rất đẹp, nhưng tay họ vẫn run khi đóng dấu lệnh thu hồi đầu tiên. Họ đứng chờ bạn phân công.',
    en: '[A junior Feather assigned to your desk] Wing personnel assigns a newly cleared Feather to your department. Their test scores are spotless, yet their hand trembles when stamping a first reclamation order. They wait by your desk for instructions.',
    choices: [
      {
        labelVi: 'Nhận kèm cặp trực tiếp làm trợ lý thân tín', labelEn: 'Train them directly as your personal attaché',
        resultVi: 'Bạn chỉ cho họ dòng nào trong báo cáo của Wing cần đọc, và dòng nào viết ra chỉ để đổ lỗi khi sự cố nổ ra. Họ lắng nghe không sót chữ nào, rồi lặng lẽ pha lại ấm cà phê trên bàn bạn.',
        resultEn: 'You show them which lines in a Wing report matter, and which are written only to assign blame when an incident breaks. They listen to every word, then quietly brew a fresh pot of coffee for your desk.',
        menteeStart: true, npcAdd: { role: 'mentee', bond: 50 }, flagsAdd: ['MentorStarted'], effects: { sanity: 2, wealth: -2, network: 4, standing: 3 }, meritAdd: 5
      },
      {
        labelVi: 'Chuyển sang bộ phận hành chính chung', labelEn: 'Reassign them to the general clerical pool',
        resultVi: 'Bạn ký giấy chuyển họ sang bàn tổng hợp số liệu. Họ cúi chào đúng quy chuẩn tập đoàn, nhưng phòng ban của bạn vẫn thiếu một người đủ tin cậy để chia lửa.',
        resultEn: 'You sign the transfer to general data processing. They bow to corporate specification, though your department remains short of a trusted pair of hands.',
        effects: { sanity: 1, standing: -2 }
      }
    ]
  },
  {
    id: 'aff_mentee_syndicate',
    age: [28, 99], major: true, weight: 0, causalOnly: true, jobs: ['Syndicate'], repeatable: true, forbids: ['Mentoring'],
    need: { fingerRankAtLeast: 2 },
    vi: '[Đàn em xin theo hầu] Một kẻ trẻ tuổi vừa sống sót qua đợt thanh lọc ở ngõ sau tìm đến chỗ bạn ngồi. Áo khoác của họ còn vết rách chưa khâu, nhưng ánh mắt không hề tránh né. Họ muốn đứng dưới trướng bạn và học luật của Finger từ chính tay bạn.',
    en: '[An initiate asks to serve] A young survivor from a back-alley purge approaches your table. Their coat still bears an unmended tear, but their gaze does not flinch. They ask to stand under your banner and learn the Finger’s law from your hand.',
    choices: [
      {
        labelVi: 'Thu nạp làm đệ tử thân tín dưới trướng', labelEn: 'Take them in as your sworn protégé',
        resultVi: 'Bạn ném cho họ một con dao sạch và chỉ chỗ đứng sau lưng ghế mình. Ở thế giới ngầm của Finger, thêm một người dám chắn lưỡi đao phía sau còn quý hơn chục kẻ chỉ biết hô hào.',
        resultEn: 'You toss them a clean blade and point to the spot behind your chair. In the Finger’s underworld, one person willing to guard your back is worth ten who only shout.',
        menteeStart: true, npcAdd: { role: 'mentee', bond: 50 }, flagsAdd: ['MentorStarted'], effects: { sanity: 2, wealth: -2, network: 4, rep: 2 }, meritAdd: 5
      },
      {
        labelVi: 'Đuổi đi: bạn không giữ người chưa rõ gốc gác', labelEn: 'Send them away: you keep no untested strays',
        resultVi: 'Bạn phất tay bảo họ quay về đội tuần tra ngoài phố. Họ cúi đầu lùi ra cửa, không oán trách, nhưng bạn biết mình vừa khước từ một lưỡi dao sắc.',
        resultEn: 'You wave them back to the street patrols. They bow and step out without complaint, though you know you just turned away a sharp blade.',
        effects: { sanity: 1 }
      }
    ]
  },
  {
    id: 'aff_mentee_crisis',
    age: [29, 99], major: true, weight: 0, causalOnly: true, jobs: ['Fixer', 'Color Fixer', 'Wing Employee', 'Syndicate'], requires: ['Mentoring'], repeatable: true,
    need: { npc: 'mentee' },
    vi: '[Việc quá tầm] Người trẻ bạn đang dìu dắt nhận một Request vượt xa sức, vì khách trả giá cao và họ muốn chứng tỏ. Bạn biết khi nghe qua một người thứ ba. Còn một đêm trước hạn.',
    en: '[Beyond their reach] The junior you are training takes a Request far above their strength, because the client pays well and they want to prove something. You hear it from a third person. One night remains before the deadline.',
    choices: [
      {
        labelVi: 'Đi cùng, nhận phần nguy hiểm nhất', labelEn: 'Go along and take the most dangerous part',
        outcomes: [
          { w: 70, resultVi: 'Bạn đứng chắn khi mọi thứ vỡ ra. Họ hoàn thành Request nhờ bạn kéo kịp, và không nói gì về điều đó, nhưng chiều hôm sau họ mang đến một ấm trà.', resultEn: 'You stand in the way when everything breaks. They finish the Request because you pulled them clear in time, and say nothing of it, but the next afternoon bring a pot of tea.', menteeBond: 12, menteeProgress: 20, effects: { health: -14, sanity: 2 }, meritAdd: 4 },
          { w: 30, resultVi: 'Bạn bị thương nặng và họ nhìn thấy điều đó. Request thất bại, nhưng họ ở lại bên giường bạn cả ba ngày, và học ở đó nhiều hơn cả một năm đi theo.', resultEn: 'You are badly hurt and they see it. The Request fails, but they stay by your bedside three days, and learn there more than a year of following.', menteeBond: 15, menteeProgress: 25, effects: { health: -26, sanity: -4, wealth: -4 } }
        ]
      },
      {
        labelVi: 'Để họ tự đối mặt, chỉ canh từ xa', labelEn: 'Let them face it alone, watching from afar',
        outcomes: [
          { w: 55, resultVi: 'Họ hoàn thành, run rẩy, và nhìn lên vị trí bạn đứng trên mái như thể biết bạn ở đó. Bạn không nói gì khi gặp họ. Họ cũng không.', resultEn: 'They finish, shaking, and look up to the spot where you stand on the roof as though they knew you were there. You say nothing when you meet. Neither do they.', menteeBond: 6, menteeProgress: 30, effects: { sanity: 1, rep: 2 }, meritAdd: 3 },
          { w: 28, resultVi: 'Họ trượt, bị thương, nhưng sống sót. Họ không nhìn bạn một tuần, rồi đến xin bạn chỉ lại từ đầu.', resultEn: 'They fail, are wounded, but live. They do not look at you for a week, then come to ask you to show them again from the start.', menteeBond: -6, menteeProgress: 10, effects: { sanity: -3 } },
          { w: 17, resultVi: 'Bạn đến quá muộn. Họ nằm ở chỗ bạn chỉ định cho họ đứng, và bạn đứng đó nhìn một lúc lâu trước khi dám đến gần.', resultEn: 'You arrive too late. They lie where you told them to stand, and you stand there looking a long while before you dare approach.', menteeFate: 'dead', effects: { sanity: -16, health: -4, rep: -2 }, scarsAdd: ['Chỗ mà bạn bảo họ đứng'] }
        ]
      },
      {
        labelVi: 'Gọi họ về, cấm nhận Request ấy', labelEn: 'Call them back and forbid that Request',
        resultVi: 'Họ nhìn bạn như thể bị phản bội, rồi gật đầu từ từ. Request đi sang tay người khác. Từ hôm sau, họ ngồi cạnh bạn ít hơn và nhìn các tấm bảng việc lâu hơn.',
        resultEn: 'They look at you as if betrayed, then nod slowly. The Request goes to someone else. From the next day they sit beside you less and read the job boards longer.',
        menteeBond: -10, menteeProgress: 8, effects: { sanity: 2 }
      }
    ]
  },
  {
    id: 'aff_subordinate_reckoning',
    age: [28, 99], major: true, weight: 0, causalOnly: true, repeatable: true,
    jobs: ['Fixer', 'Color Fixer', 'Wing Employee', 'Syndicate'],
    need: { npc: 'mentee' },
    vi: '[Cái giá của lệnh ủy thác] Sau nhiệm vụ nguy hiểm bạn giao phó, {mentee} trở về phòng với băng gạc thấm máu trên vai và tập hồ sơ đã hoàn tất. Bên trên đang truy xét thiệt hại phát sinh từ vụ việc ấy. {mentee} đặt biên bản lên bàn bạn và im lặng chờ xem bạn sẽ ký tên mình hay đẩy họ ra chịu trách nhiệm.',
    en: '[The price of delegation] After the hazardous task you delegated, {mentee} returns with blood-soaked bandages on their shoulder and the completed file. Higher-ups are auditing the collateral fallout. {mentee} sets the report on your desk and waits in silence to see whether you sign your own name or push the blame onto them.',
    choices: [
      {
        labelVi: 'Đứng ra nhận hết trách nhiệm và chi 8 Ahn lo thuốc men cho {mentee}',
        labelEn: 'Take full responsibility and spend 8 Ahn on {mentee}’s medical care',
        resultVi: 'Bạn ký tên mình lên dòng chịu trách nhiệm chính và thanh toán toàn bộ phí tổn. {mentee} nhìn con dấu rất lâu, rồi cúi đầu sâu hơn mọi lần trước. Danh tiếng của bạn sứt mẻ đôi chút, nhưng bạn có một người sẵn sàng vào sinh ra tử vì mình.',
        resultEn: 'You sign your own name on the liability line and cover every cost. {mentee} stares at the seal for a long moment, then bows deeper than ever before. Your reputation takes a dent, yet you gain someone who would walk through fire for you.',
        costAhn: 8, clearNpcCrisis: 'mentee', menteeBond: 16, menteeProgress: 20, effects: { rep: -4, sanity: 3, standing: -4 }, meritAdd: 4
      },
      {
        labelVi: 'Giữ đúng kỷ luật tổ chức: thưởng công sòng phẳng nhưng ghi nhận lỗi sai',
        labelEn: 'Enforce strict organizational discipline: reward the result but log the fault',
        resultVi: 'Bạn phê duyệt khoản thưởng cho {mentee} nhưng vẫn giữ nguyên biên bản khiển trách theo quy định. Họ nhận phong bì, gật đầu đúng phép tắc và bước ra ngoài với ánh mắt lạnh hơn trước.',
        resultEn: 'You approve {mentee}’s bonus while leaving the formal reprimand on record. They take the envelope, nod by the rules, and walk out with colder eyes than before.',
        menteeBond: -8, menteeProgress: 15, effects: { rep: 4, sanity: -3, standing: 5 }, meritAdd: 8
      },
      {
        labelVi: 'Đẩy toàn bộ trách nhiệm cho {mentee} để giữ sạch hồ sơ của bạn',
        labelEn: 'Shift the entire blame onto {mentee} to keep your own record clean',
        resultVi: 'Bạn đẩy tờ biên bản về phía họ. {mentee} không nói một lời, ký tên rồi tháo phù hiệu đặt xuống góc bàn trước khi bước ra khỏi cửa. Hồ sơ của bạn hoàn toàn sạch sẽ, và căn phòng cũng trống hẳn đi.',
        resultEn: 'You push the report back across the desk. {mentee} says nothing, signs, and sets their badge on the corner of the table before walking out. Your record stays spotless, and the room feels much emptier.',
        menteeFate: 'estranged', effects: { heat: -14, wealth: 6, sanity: -8, standing: 6 }, meritAdd: 6
      }
    ]
  },
  {
    id: 'aff_partner_reckoning',
    age: [22, 99], major: true, weight: 0, causalOnly: true, repeatable: true,
    jobs: ['Fixer', 'Color Fixer', 'Wing Employee', 'Syndicate'],
    need: { npc: 'partner' },
    vi: '[Vết máu từ lệnh ủy thác] Sau phi vụ nguy hiểm bạn giao phó, {partner} trở về với vết thương sâu bên sườn và ánh mắt nặng trĩu. Bên trên đang truy xét thiệt hại từ nhiệm vụ ấy. {partner} đặt biên bản lên bàn bạn, chờ xem bạn sẽ đứng ra gánh cùng hay để họ tự chịu trận.',
    en: '[Blood from a delegated order] After the hazardous operation you delegated, {partner} returns with a deep wound in their side and a heavy gaze. Higher-ups are auditing the collateral fallout. {partner} sets the report on your desk, waiting to see whether you stand with them or leave them to take the fall.',
    choices: [
      {
        labelVi: 'Đứng ra nhận trách nhiệm và chi 8 Ahn chạy chữa cho {partner}',
        labelEn: 'Take full responsibility and spend 8 Ahn on {partner}’s treatment',
        resultVi: 'Bạn tự tay ký nhận trách nhiệm và chi trả tiền thuốc men cho {partner}. Họ khẽ thở phào, vỗ nhẹ lên vai bạn trước khi lui về nghỉ dưỡng. Danh tiếng của bạn hao hụt ít nhiều, nhưng tình nghĩa sống chết giữa hai người càng thêm bền chặt.',
        resultEn: 'You sign the liability line yourself and cover {partner}’s medical bill. They let out a quiet breath and clap your shoulder before retiring to recover. Your reputation takes a hit, yet the bond between you grows stronger.',
        costAhn: 8, clearNpcCrisis: 'partner', bonds: { partner: 15 }, effects: { rep: -4, sanity: 3, standing: -4 }, meritAdd: 4
      },
      {
        labelVi: 'Xử lý theo quy chế: chia phần thưởng nhưng giữ biên bản khiển trách',
        labelEn: 'Go by the book: split the bonus but keep the formal reprimand',
        resultVi: 'Bạn chia đủ phần thưởng cho {partner} nhưng vẫn nộp biên bản ghi nhận sai sót lên cấp trên. {partner} cất phong bì vào áo, không trách cứ câu nào, chỉ có khoảng cách giữa hai chiếc ghế là xa hơn trước.',
        resultEn: 'You hand {partner} their full share while filing the formal reprimand upstairs. {partner} pockets the envelope without a word of complaint, though the space between your chairs feels wider than before.',
        bonds: { partner: -10 }, effects: { rep: 4, sanity: -4, standing: 5 }, meritAdd: 8
      },
      {
        labelVi: 'Đổ toàn bộ trách nhiệm lên đầu {partner} để giữ sạch hồ sơ',
        labelEn: 'Pin the entire fallout on {partner} to keep your record clean',
        resultVi: 'Bạn để tên {partner} nằm một mình trên biên bản kỷ luật. Họ nhìn bạn một lần cuối, cười nhạt rồi quay lưng bước ra khỏi cửa. Bạn giữ trọn chiếc ghế và tiền thưởng, nhưng mất đi người từng chắn đao sau lưng mình.',
        resultEn: 'You leave {partner}’s name alone on the disciplinary report. They give you one last look and a thin smile before walking out the door. You keep your seat and the payout, at the cost of the one who guarded your back.',
        npcFate: { partner: 'estranged' }, effects: { heat: -14, wealth: 6, sanity: -10, standing: 6 }, meritAdd: 6
      }
    ]
  },
  {
    id: 'aff_office_hire',
    age: [28, 99], major: true, weight: 0, causalOnly: true, jobs: ['Fixer'], requires: ['OwnFixerOffice'], forbids: ['OfficeHired'],
    vi: '[Người đầu tiên trong danh sách] Văn phòng nhỏ của bạn có thêm việc hơn một người xoay xở được. Hai Fixer trẻ không có nơi nào để đi đứng trước cửa. Một người giỏi nhưng khó bảo, người kia vừa phải nhưng đáng tin.',
    en: '[The first name on the roster] Your small Office has more work than one person can juggle. Two young Fixers with nowhere to go stand at the door. One is gifted but hard to manage, the other average but reliable.',
    choices: [
      {
        labelVi: 'Nhận người giỏi nhưng khó bảo', labelEn: 'Take the gifted one who is hard to manage',
        resultVi: 'Họ nhận Request trong tuần đầu và hoàn thành trước hạn hai ngày. Tuần thứ hai, họ cãi lại bạn trước mặt khách. Văn phòng có tiếng hơn, và bếp chung ồn hơn.',
        resultEn: 'They take a Request in the first week and finish two days early. In the second week they argue with you in front of a client. The Office gains a name, and the shared stove gets louder.',
        officeStaff: 1, flagsAdd: ['OfficeHired'], effects: { rep: 5, network: 4, sanity: -3 }, meritAdd: 6
      },
      {
        labelVi: 'Nhận người đáng tin', labelEn: 'Take the reliable one',
        resultVi: 'Họ đến sớm, về muộn, và không bao giờ làm bạn ngạc nhiên. Văn phòng không nổi tiếng hơn, nhưng cũng chưa bao giờ nợ khách một lời hứa.',
        resultEn: 'They arrive early, leave late, and never surprise you. The Office does not become famous, but it also never owes a client a promise.',
        officeStaff: 1, flagsAdd: ['OfficeHired'], effects: { rep: 2, sanity: 3, wealth: 2 }, meritAdd: 4
      },
      {
        labelVi: 'Nhận cả hai', labelEn: 'Take both',
        resultVi: 'Bạn nhận cả hai và bắt đầu hiểu vì sao các Office lớn luôn có một người chỉ làm việc cân bằng giữa họ. Lần đầu tiên, bạn là người đó.',
        resultEn: 'You take both and begin to see why big Offices always have someone whose only job is balancing the others. For the first time, you are that person.',
        officeStaff: 2, flagsAdd: ['OfficeHired'], effects: { rep: 6, network: 6, sanity: -5, wealth: -4 }, meritAdd: 8
      }
    ]
  },
  {
    id: 'aff_office_pressure',
    age: [30, 99], major: true, weight: 0, causalOnly: true, jobs: ['Fixer'], requires: ['OwnFixerOffice'], forbids: ['HasAffiliation'],
    vi: '[Cái bóng của Association] Một Association gửi người đến Office của bạn, lịch sự và rất kiên nhẫn. Họ nói Office nhỏ cần bảo trợ, và rằng tiền bảo trợ sẽ rất hợp lý. Họ không đe dọa. Họ chỉ nhắc đến những Office đã đóng cửa.',
    en: '[An Association’s shadow] An Association sends someone to your Office, polite and very patient. They say a small Office needs a patron, and that the patronage fee will be quite reasonable. They do not threaten. They only mention the Offices that closed.',
    choices: [
      {
        labelVi: 'Trả phí bảo trợ để được yên', labelEn: 'Pay the patronage fee to be left alone',
        resultVi: 'Bạn trả. Họ cúi chào, rất đúng phép, và Office của bạn có thêm một dấu trên cửa. Tối đó bạn ngồi lâu hơn thường lệ ở bếp chung.',
        resultEn: 'You pay. They bow, very properly, and your Office gains a mark on its door. That evening you sit longer than usual at the shared stove.',
        effects: { wealth: -8, rep: -1, heat: -4 }
      },
      {
        labelVi: 'Từ chối, giữ Office của mình', labelEn: 'Refuse and keep the Office your own',
        outcomes: [
          { w: 55, resultVi: 'Họ không nói gì thêm, và không quay lại trong một năm. Có thể họ nhẩm lại quyết định. Có thể họ đang chờ.', resultEn: 'They say nothing more and do not return for a year. Perhaps they are reconsidering. Perhaps they are waiting.', effects: { rep: 4, sanity: 1, heat: 6 } },
          { w: 45, resultVi: 'Hai tuần sau, ba hợp đồng của Office bị hủy cùng lúc. Không ai giải thích. Người điều phối cũ của bạn gửi một tờ giấy ngắn: "Đã nói rồi."', resultEn: 'Two weeks later, three of the Office’s contracts are cancelled at once. No one explains. Your old coordinator sends a short note: “I told you.”', effects: { wealth: -10, rep: 1, heat: 10, sanity: -3 } }
        ]
      },
      {
        labelVi: 'Nhận bảo trợ và gia nhập làm Fixer của họ', labelEn: 'Accept patronage and join as their Fixer',
        resultVi: 'Bạn ký. Office giữ nguyên tên và bảng việc, nhưng giờ có thêm một dòng trong hợp đồng với Zwei Association. Người điều phối của Zwei nói bạn sẽ không cô đơn nữa, và không rõ đó là lời hứa hay một phép tính.',
        resultEn: 'You sign. The Office keeps its name and job board, but now carries an extra line in a contract with Zwei Association. Zwei’s coordinator says you will not be alone any more, and it is unclear whether that is a promise or a calculation.',
        affJoin: 'zwei', recordsAdd: ['assoc_joined'], effects: { network: 6, rep: 2, wealth: -3 }, meritAdd: 5
      }
    ]
  }
];

export const AFFILIATION_EVENTS = [...inviteEvents, officeInvite, ...conflictEvents, ...lifecycleEvents];
