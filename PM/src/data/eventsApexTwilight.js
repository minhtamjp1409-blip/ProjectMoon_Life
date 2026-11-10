// The last third of a life at the top. A Color or a head of a Finger is kept alive past what the body
// would allow, because the City has a use for them, and that is the reason people at this height live
// to a hundred and twenty. What comes after is not a bed: the road, the seat handed on, a bout with a
// successor, a knife from behind. Each event that ends a life names the ending it takes from lifeEndings.js.

const FINGERS = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
const fingerOnly = (name) => ({ jobs: ['Syndicate'], finger: name, need: { fingerRankAtLeast: 3 } });

export const apexLongevityEventId = (char) => {
  if (!char || !char.alive || char.flags?.includes('Distorted')) return null;
  if (char.job === 'Fixer' && char.flags?.includes('ColorFixer')) return 'apex_longevity_color';
  if (char.job === 'Syndicate' && char.finger && (char.fingerRank || 0) >= 3) return `apex_longevity_${char.finger.toLowerCase()}`;
  if (char.job === 'Wing Employee' && (char.wingRank || 0) >= 3) return 'apex_longevity_wing';
  return null;
};

const longevity = (id, scope, vi, en, takeVi, takeEn, takeFx, refuseVi, refuseEn) => ({
  id, age: [38, 120], major: true, weight: 12, ...scope,
  forbids: ['Distorted', 'apex_longevity_done'],
  vi, en,
  choices: [
    { labelVi: takeVi[0], labelEn: takeEn[0], effects: takeFx, flagsAdd: ['apex_longevity_done', 'ApexLongevity'],
      resultVi: takeVi[1], resultEn: takeEn[1] },
    { labelVi: 'Từ chối, để cơ thể đi theo lịch của nó', labelEn: 'Refuse and let the body keep its own schedule',
      effects: { sanity: 4, rep: 1 }, flagsAdd: ['apex_longevity_done'], resultVi: refuseVi, resultEn: refuseEn }
  ]
});

const LONGEVITY = [
  longevity('apex_longevity_color', { jobs: ['Fixer'], requires: ['ColorFixer'] },
    '[Phòng khám không bảng hiệu] Một bác sĩ của Hana đưa bạn tới phòng khám dưới trụ sở. Trên khay có ampoule K Corp và bảng giá chăm sóc dài hạn dành cho Color.',
    '[The unmarked clinic] A Hana physician takes you to a clinic beneath headquarters. K Corp ampoules and a price sheet for long-term Color care wait on a tray.',
    ['Nhận chương trình chăm sóc của Hana', 'Bạn ký hợp đồng và nhận mũi đầu tiên. Bác sĩ ghi giờ tái khám; vết đau cũ dịu đi khi thuốc vào mạch.'],
    ['Accept Hana’s program of care', 'You sign the contract and receive the first injection. The doctor records your next appointment as an old ache eases.'],
    { wealth: -14, sanity: -4, health: 8, resonance: 4 },
    'Bạn đẩy bảng giá lại. Bác sĩ cất khay thuốc và đóng hồ sơ; ca khám kết thúc ở đó.',
    'You slide back the price sheet. The doctor puts away the tray and closes the file; the consultation ends there.'),
  longevity('apex_longevity_thumb', fingerOnly('Thumb'),
    '[Bác sĩ của gia đình] Bác sĩ của The Thumb mang tới bảng giá thay khớp và điều trị vết đạn cũ. Một Soldato đứng ngoài cửa chờ câu trả lời của bạn.',
    '[The family surgeon] A Thumb physician brings a price sheet for joint replacements and treatment of old bullet wounds. A Soldato waits outside for your answer.',
    ['Nhận ca điều trị của gia đình', 'Bạn ký giấy và vào phòng mổ. Khi đứng dậy, bên sườn còn đau nhưng bước chân vững hơn trước.'],
    ['Accept the family treatment', 'You sign the form and enter surgery. Your side still aches when you stand, but your step is steadier.'],
    { wealth: -12, sanity: -3, health: 8 },
    'Bạn trả bảng giá. Bác sĩ đóng hộp dụng cụ, còn Soldato ngoài cửa ghi rằng bạn không nhận ca mổ.',
    'You return the price sheet. The doctor closes the case; the Soldato outside records that you declined surgery.'),
  longevity('apex_longevity_index', fingerOnly('Index'),
    '[Lịch thuốc bên cạnh Prescript] Một Proxy đặt hộp thuốc và lịch điều trị cạnh những Prescript chưa phát. Đây là đề nghị của họ, không phải mệnh lệnh trên giấy.',
    '[Medicine beside the Prescripts] A Proxy sets down medicine and a treatment schedule beside the undelivered Prescripts. It is their offer, not an order on the page.',
    ['Nhận lịch điều trị của Proxy', 'Bạn uống liều đầu dưới mắt người ghi chép. Nhịp tim đều hơn; mỗi sáng từ nay có thêm một giờ phải nhớ.'],
    ['Accept the Proxy treatment schedule', 'You take the first dose under the clerk’s eye. Your pulse steadies; there is now another hour to remember each morning.'],
    { sanity: -5, health: 8, resonance: 3 },
    'Bạn trả hộp thuốc. Proxy cất lịch điều trị; những Prescript trên bàn vẫn chờ người nhận.',
    'You return the medicine. The Proxy files away the treatment schedule; the Prescripts on the desk still await delivery.'),
  longevity('apex_longevity_middle', fingerOnly('Middle'),
    '[Cuốn sổ cần người giữ] Người giữ Book of Vengeance thấy tay bạn run khi lật trang. Gia đình đề nghị gọi một bác sĩ đến khám.',
    '[A keeper for the Book] The keeper of the Book of Vengeance sees your hand shake as you turn a page. The family offers to call a doctor.',
    ['Nhận chăm sóc từ gia đình', 'Bạn trả 10 Ahn cho bác sĩ đến khám và để lại thuốc. Người giữ sổ chuyển chiếc bàn đọc đến chỗ đủ sáng.'],
    ['Accept care from the family', 'You pay the visiting doctor 10 Ahn for an examination and medicine. The keeper moves the reading desk into better light.'],
    { wealth: -10, sanity: -2, health: 8, network: 3 },
    'Bạn từ chối bác sĩ. Người giữ sổ không tranh cãi; họ đặt một tấm chặn giấy lên trang đang đọc.',
    'You decline the doctor. The keeper does not argue and puts a paperweight on the open page.'),
  longevity('apex_longevity_ring', fingerOnly('Ring'),
    '[Bàn của Maestro] Một Maestro đặt trước bạn bản vẽ thay khớp đã mòn. Họ gọi đó là phần việc còn thiếu của tác phẩm; trên giấy vẫn có mục giá.',
    '[The Maestro’s table] A Maestro lays out plans to replace your worn joints. They call it unfinished work on the piece; the sheet still has a price column.',
    ['Để Maestro thay khớp đã mòn', 'Bạn ngồi dưới đèn khi họ làm việc. Khớp mới chuyển động trơn hơn; Maestro ghi chi phí vào mép bản vẽ.'],
    ['Let the Maestro replace the worn joints', 'You sit beneath the lamp while they work. The new joints move more smoothly; the Maestro writes the cost along the drawing’s edge.'],
    { wealth: -10, sanity: -2, health: 8, resonance: 3 },
    'Bạn không ký vào bản vẽ. Maestro cuộn nó lại và cất vào ngăn bàn.',
    'You do not sign the drawing. The Maestro rolls it up and puts it in a drawer.'),
  longevity('apex_longevity_pinky', fingerOnly('Pinky'),
    '[Hộp thuốc của Star of the Sky] Một Star of the Sky gửi hộp thuốc không nhãn và mảnh giấy ghi liều dùng. Họ viết rằng đã dùng cùng loại thuốc này sau một vết thương cũ.',
    '[Medicine from a Star of the Sky] A Star of the Sky sends unlabeled medicine and a note with the dosage. They write that they took the same pills after an old injury.',
    ['Uống thuốc theo thư', 'Bạn thử liều đầu và đợi đến khi tay hết run mới cầm kiếm. Người ở sân tập thấy bạn trở lại đúng giờ.'],
    ['Take the medicine as directed', 'You try the first dose and wait until your hand steadies before taking up the sword. Others in the yard see you return on time.'],
    { sanity: -2, health: 8, rep: 2 },
    'Bạn gửi trả hộp thuốc cùng lời cảm ơn. Người đưa thư mang nó đi trước khi buổi tập bắt đầu.',
    'You return the medicine with a word of thanks. The courier takes it away before training starts.')
];

const endsLife = (lifeEnding, vi, en, fx = {}) => ({ endsLife: true, lifeEnding, effects: fx, resultVi: vi, resultEn: en });

const COLOR_ENDINGS = [
  {
    id: 'color_long_road', age: [84, 125], jobs: ['Fixer'], major: true, weight: 8,
    requires: ['ColorFixer', 'ApexLongevity'], forbids: ['Distorted'],
    vi: '[Cánh cổng phụ] Sáng nọ bạn nhận ra mình đã đứng trước cổng phụ khu Hana lâu hơn cần thiết. Người gác không hỏi. Bên ngoài là con đường bạn chưa đi hết, và bạn nhớ hồi trẻ từng định sẽ đi.',
    en: '[A side gate] One morning you find you have stood at the side gate of the Hana grounds longer than needed. The guard does not ask. Beyond lies a road you never walked to its end, and you remember once planning to take it when young.',
    choices: [
      { labelVi: 'Bước qua cổng và không quay đầu', labelEn: 'Step through the gate and do not look back',
        ...endsLife('wander', 'Bạn gửi lại huy hiệu Color ở quầy gác. Người gác ghi giờ bạn đi, rồi khép sổ trước khi hỏi điểm đến.', 'You leave the Color badge at the guard post. The guard records your departure, then closes the ledger before asking your destination.'),
        deathCauseVi: 'Rời The City bằng đôi chân và không bao giờ quay lại', deathCauseEn: 'Left the City on foot and never came back' },
      { labelVi: 'Quay lại, còn nhiều việc chưa xong', labelEn: 'Turn back, there is work unfinished',
        effects: { sanity: -2, rep: 1 },
        resultVi: 'Bạn quay lại phòng làm việc và pha trà. Người gác nhìn theo bạn rất lâu, như đã đoán trước.', resultEn: 'You return to your office and brew tea. The guard watches you go for a long while, as if it had been foreseen.' }
    ]
  },
  {
    id: 'color_quiet_chair', age: [86, 125], jobs: ['Fixer'], major: true, weight: 7,
    requires: ['ColorFixer', 'ApexLongevity'], forbids: ['Distorted'],
    vi: '[Chiếc ghế đã mỏi] Hana mời bạn ghé qua một buổi họp mà không có chủ đề. Người kế nhiệm được chọn đã ngồi bên cạnh, tay đặt trên bàn như thể sợ làm đổ cái gì. Cả phòng chờ xem bạn có tự nói ra điều ai cũng nghĩ hay không.',
    en: '[The tired chair] Hana asks you to a meeting with no subject. The chosen successor already sits beside you, hands on the table as if afraid to knock something over. The whole room waits to see whether you will say aloud what everyone is thinking.',
    choices: [
      { labelVi: 'Nhường ghế và trao huy hiệu', labelEn: 'Yield the chair and hand over the badge',
        ...endsLife('retired', 'Bạn đặt huy hiệu lên bàn và xác nhận người kế nhiệm trước mặt Hana. Buổi tối, bạn ăn ở một quán nhỏ mà không phải trả lời một Request nào.', 'You set the badge on the table and confirm your successor before Hana. That evening, you eat at a small restaurant without answering a single Request.', { sanity: 6, rep: 4 }),
        deathCauseVi: 'Nhường chỗ ngồi tại Hana và về sống ở phố cũ', deathCauseEn: 'Handed the Hana seat to a successor and retired to an old street' },
      { labelVi: 'Ngồi lại và nói rằng chưa phải lúc', labelEn: 'Stay seated and say it is not yet time',
        effects: { rep: 2, sanity: -3, network: 2 },
        resultVi: 'Phòng im lặng. Người kế nhiệm gật đầu quá nhanh. Bạn nhớ mình cũng từng làm y như vậy trước khi ngồi vào chiếc ghế này.', resultEn: 'The room is silent. The successor nods too quickly. You recall doing exactly this before you took the chair.' }
    ]
  },
  {
    id: 'color_last_bout', age: [90, 125], jobs: ['Fixer'], major: true, weight: 8,
    requires: ['ColorFixer', 'ApexLongevity'], forbids: ['Distorted'], need: { npc: 'mentee' },
    vi: '[Nhát chém cuối] Người bạn từng kèm cặp đứng chờ ngoài sân tập vắng, không mang vũ khí giả. Người ấy nói rằng họ đã học mọi thứ có thể học từ bạn, trừ một thứ: nhát chém của bạn khi bạn không còn nghĩ đến thắng.',
    en: '[The last stroke] The one you once mentored waits outside an empty training yard, carrying no practice weapon. They say they have learned everything they could from you but one thing: your stroke when you no longer think of winning.',
    choices: [
      { labelVi: 'Bước vào sân và đánh thật', labelEn: 'Step into the yard and fight in earnest',
        outcomes: [
          { w: 45, effects: { health: -14, rep: 6, sanity: 4 }, meritAdd: 20,
            resultVi: 'Hai người đánh từ chiều tới lúc đèn đường bật. Bạn thắng bằng một nhát mà bạn không chắc mình nghĩ tới. Người ấy cúi đầu thật sâu, nói họ biết điều mình cần biết.', resultEn: 'You fight from afternoon until the streetlights come on. You win with one stroke you are not sure you meant. They bow deeply and say they know what they needed to know.' },
          { w: 55, ...endsLife('last_bout', 'Nhát chém của họ đến vào lúc bạn không còn muốn tránh. Bạn nằm xuống sàn gỗ, nhìn lên trần và nghĩ rằng đây là cách mình muốn kết thúc từ lâu. Người ấy ngồi bên cạnh cho đến sáng.', 'Their stroke arrives when you no longer want to avoid it. You lie on the wooden floor, look at the ceiling and think this is how you wanted to end for a long time. They sit beside you until morning.', { health: -30 }),
            deathCauseVi: 'Ngã trong trận đấu cuối với người mình từng kèm cặp', deathCauseEn: 'Fell in a last bout with the one they once mentored' }
        ] },
      { labelVi: 'Từ chối và chỉ cho họ một nhát khác', labelEn: 'Decline and show them a different stroke instead',
        effects: { rep: 3, sanity: 3, network: 2 },
        resultVi: 'Bạn cầm thanh kiếm gỗ và làm chậm từng bước để họ nhìn thấy. Họ không nói gì cả buổi, rồi đến cuối họ nói: lần sau.', resultEn: 'You take the wooden sword and slow each step so they can see. They say nothing all afternoon, and at the end they say: next time.' }
    ]
  },
  {
    id: 'color_section_purge', age: [88, 125], jobs: ['Fixer'], major: true, weight: 6,
    requires: ['ColorFixer', 'ApexLongevity'], forbids: ['Distorted', 'color_purge_done'],
    vi: '[Request không có thù lao] Một phong bì có con dấu của Section mà bạn từng ngồi cạnh được đưa tới bạn bằng người đưa thư thường. Bên trong là một địa chỉ và một giờ. Không có điều khoản thương vong, vì không ai trong phòng định để bạn trở lại. Bạn đã sống đủ lâu để biết khi nào một lá thư là lời mời.',
    en: '[A Request with no fee] An envelope bearing the stamp of a Section you once sat beside arrives by ordinary post. Inside are an address and an hour. No casualty clause, because no one in the room meant you to return. You have lived long enough to know when a letter is an invitation.',
    choices: [
      { labelVi: 'Đến địa chỉ ấy với thanh kiếm của mình', labelEn: 'Go to the address with your own blade',
        need: { stat: { health: [45, 100] } },
        outcomes: [
          { w: 58, effects: { health: -26, sanity: -8, rep: 10, network: -6 }, meritAdd: 30, flagsAdd: ['color_purge_done'],
            resultVi: 'Ba người đứng trong căn phòng chờ bạn. Họ không ngờ bạn còn có thể đánh như vậy. Bạn bước ra khi trời sáng, và Hana không bao giờ gửi bạn một lá thư nào nữa.', resultEn: 'Three people wait in the room. They did not expect you could still fight like that. You walk out at dawn, and Hana never sends you another letter.' },
          { w: 42, ...endsLife('purged', 'Phòng đó có nhiều cửa hơn bạn nhớ. Bạn ngã ở cánh cuối cùng, và gương mặt cuối cùng bạn thấy là người từng ngồi uống trà cùng bạn.', 'The room has more doors than you remember. You fall at the last one, and the last face you see belongs to someone you once drank tea with.', { health: -40 }),
            deathCauseVi: 'Bị Section của Hana xử lý bằng một Request niêm phong', deathCauseEn: 'Dealt with by a Hana Section through a sealed Request' }
        ] },
      { labelVi: 'Viết thư xin từ bỏ tên Color, rút lui', labelEn: 'Write to resign the Color name and withdraw',
        ...endsLife('retired', 'Hana nhận thư và đóng dấu vào bản sao của bạn. Bạn rời trụ sở với tờ giấy ấy; phong bì niêm trước đó vẫn nằm trên bàn.', 'Hana receives the letter and stamps your copy. You leave headquarters with the paper; the earlier sealed envelope remains on the table.', { sanity: 4, rep: -4 }),
        deathCauseVi: 'Từ bỏ danh hiệu Color để tránh án của Section', deathCauseEn: 'Surrendered the Color title to avoid a Section’s sentence', flagsAdd: ['color_purge_done'] },
      { labelVi: 'Đốt phong bì, không đến', labelEn: 'Burn the envelope and do not go',
        effects: { heat: 6, sanity: -5, network: -5 }, flagsAdd: ['color_purge_done'],
        resultVi: 'Bạn nhìn nó cháy hết và không thấy tay mình run. Hôm sau, không có ai ở cửa. Hôm sau nữa, cũng không. Bạn biết im lặng của Hana là một câu trả lời.', resultEn: 'You watch it burn and your hand does not tremble. The next day, no one is at the door. Nor the day after. You know Hana’s silence is an answer.' }
    ]
  }
];

const usurp = (name, rolesVi, rolesEn, sceneVi, sceneEn, tailVi, tailEn) => ({
  id: `finger_usurped_${name.toLowerCase()}`, age: [80, 125], major: true, weight: 8, ...fingerOnly(name),
  requires: ['ApexLongevity'], forbids: ['Distorted', 'usurp_resolved'],
  vi: `[${rolesVi}] ${sceneVi}`, en: `[${rolesEn}] ${sceneEn}`,
  choices: [
    { labelVi: 'Chuẩn bị trước khi họ ra tay', labelEn: 'Prepare before they strike',
      need: { stat: { health: [40, 100] } },
      outcomes: [
        { w: 55, effects: { health: -18, rep: 8, sanity: -8, network: -4 }, meritAdd: 24, flagsAdd: ['usurp_resolved'],
          resultVi: `Bạn đứng dậy trước khi người ấy rút vũ khí. ${tailVi[0]}`, resultEn: `You rise before they draw a weapon. ${tailEn[0]}` },
        { w: 45, effects: { health: -34, rep: -6, sanity: -10 }, flagsAdd: ['usurp_resolved'], scarsAdd: ['Nhát dao từ người đứng sau'],
          resultVi: `Bạn thoát ra bằng cửa phụ với một vết thương phải băng ngay. ${tailVi[1]}`, resultEn: `You escape by a side door with a wound that needs dressing at once. ${tailEn[1]}` }
      ] },
    { labelVi: 'Tin họ, không chuẩn bị gì', labelEn: 'Trust them and prepare nothing',
      ...endsLife('usurped', `Bạn để người ấy lại gần mà không đề phòng. ${tailVi[2]}`, `You let them approach without taking precautions. ${tailEn[2]}`, { health: -60 }),
      deathCauseVi: 'Bị người kế vị sát hại để chiếm quyền', deathCauseEn: 'Killed by a successor seeking their rank', flagsAdd: ['usurp_resolved'] },
    { labelVi: 'Trao lại chức vị trước khi họ ra tay', labelEn: 'Hand over the rank before they strike',
      ...endsLife('retired', 'Bạn nói rõ quyết định trước mặt người chứng kiến. Người kế vị hạ vũ khí. Thư ký ghi ngày bàn giao, rồi bạn rời phòng bằng cửa chính.', 'You state your decision before the witnesses. The successor lowers their weapon. A clerk records the handover date, and you leave by the front door.', { sanity: 5, rep: -3 }),
      deathCauseVi: 'Trao lại chức vị trước khi bị soán', deathCauseEn: 'Handed over the rank before it was seized', flagsAdd: ['usurp_resolved'] }
  ]
});

const FINGER_ENDINGS = [
  usurp('Thumb', 'Underboss quá lâu', 'An Underboss too long in the seat',
    'Một Sottocapo đưa ra lệnh có dấu của Capo, yêu cầu bạn rời ghế Underboss ngay trong bữa tối. Tay người ấy đặt cạnh bao súng; các Soldato chờ xem bạn trả lời ra sao.',
    'A Sottocapo presents an order stamped by a Capo, demanding your Underboss seat at dinner. Their hand rests beside a holster; the Soldato wait for your reply.',
    ['Bạn buộc họ đặt súng xuống và đọc lệnh trước mặt cả bàn. Cuộc bỏ phiếu được hoãn.', 'Bạn giữ được ghế, nhưng phải băng vết thương trước khi dự cuộc họp tiếp theo.', 'Người ấy cất súng sau khi bạn ngã. Thư ký ghi tên Underboss mới.'],
    ['You make them put down the gun and read the order before everyone. The vote is delayed.', 'You keep the seat, but need a bandage before the next meeting.', 'They holster the gun after you fall. The clerk records the new Underboss.']),
  usurp('Index', 'Hai tờ Prescript', 'Two Prescripts',
    'Một Proxy bạn đào tạo đem tới Prescript ghi tên bạn và một tờ khác ghi tên họ vào chỗ của bạn. Họ nói tờ đầu phải được thi hành trước khi trời sáng, rồi đặt tay lên vũ khí.',
    'A Proxy you trained brings a Prescript bearing your name and another assigning them your place. They say the first must be carried out before dawn and reach for a weapon.',
    ['Bạn đoạt vũ khí trước mặt những người chứng kiến. Proxy không thể thi hành lệnh ở đây, nhưng vẫn giữ hai tờ Prescript.', 'Bạn thoát khỏi phòng đọc. Proxy vẫn giữ hai tờ Prescript và đứng lại trước cửa.', 'Proxy đọc lệnh xử tử khi bạn ngã. Những người còn lại ghi nhận thời điểm thi hành.'],
    ['You disarm the Proxy before the witnesses. They cannot carry out the order here, but keep both Prescripts.', 'You escape the reading room. The Proxy still holds both Prescripts and remains by the door.', 'The Proxy reads the execution order as you fall. The others record the time of its fulfillment.']),
  usurp('Middle', 'Great Sibling đợi quá lâu', 'A Great Sibling who waited too long',
    'Một Great Sibling từng được bạn nâng đỡ mở Book of Vengeance trước gia đình. Tên bạn nằm trên trang mới, bên cạnh một lời buộc tội họ không cho bạn đọc. Hai người của họ chặn cửa.',
    'A Great Sibling you once supported opens the Book of Vengeance before the family. Your name is on a new page beside an accusation they will not let you read. Two of their people block the door.',
    ['Bạn đọc được lời buộc tội trước các Great Elder. Người chứng kiến đòi mở cuộc xét lại, và họ nhường lối.', 'Bạn thoát qua cửa sau. Lời buộc tội vẫn ở trong sổ; gia đình chưa chấp nhận lời giải thích của bạn.', 'Họ khép sổ khi bạn ngã. Tên bạn vẫn nằm trên trang ấy.'],
    ['You read the accusation before the Great Elders. The witnesses demand a review, and the guards make way.', 'You escape through the back door. The accusation remains in the Book; the family has not accepted your account.', 'They close the Book when you fall. Your name remains on the page.']),
  usurp('Ring', 'Maestro muốn bức tranh của chính họ', 'A Maestro who wants their own piece',
    'Một Maestro bạn từng bảo trợ chuẩn bị buổi triển lãm công bố người giữ ghế Grand Curator tiếp theo. Bạn thấy tên mình ở mục vật liệu của tác phẩm chính. Người gác khóa cửa phòng sau lưng bạn.',
    'A Maestro you once sponsored prepares an exhibition naming the next Grand Curator. Your name appears under materials for the centerpiece. The guard locks the gallery door behind you.',
    ['Bạn mở khóa cửa trước khi buổi triển lãm bắt đầu. Maestro phải giải thích danh mục vật liệu với các Docent.', 'Bạn thoát ra hành lang với một vết thương. Danh mục triển lãm vẫn giữ tên bạn ở mục vật liệu.', 'Buổi triển lãm mở cửa đúng giờ. Ghế Grand Curator có người mới.'],
    ['You unlock the door before the exhibition begins. The Maestro must explain the materials list to the Docents.', 'You reach the corridor wounded. The exhibition list still names you under materials.', 'The exhibition opens on time. A new Grand Curator takes the seat.']),
  usurp('Pinky', 'Sworn Blade chờ nhát cuối', 'A Sworn Blade awaiting the last stroke',
    'Một Sworn Blade bạn từng nhận làm học trò hạ giọng trước mặt cả Pinky: thanh kiếm đứng đầu không nên già. Họ chờ bạn trả lời bằng nhát chém, và không ai trong phòng định ngăn họ.',
    'A Sworn Blade you took as a student lowers their voice before the whole Pinky: the foremost blade should not grow old. They wait for you to answer with a stroke, and no one in the room means to stop them.',
    ['Bạn đỡ nhát đầu và làm rơi kiếm của họ. Cuộc thử thách dừng tại đó.', 'Bạn giữ được mạng và rời sảnh để băng bó. Người thách đấu vẫn đợi bạn trả lời.', 'Họ cắm thanh kiếm xuống đất và Pinky đọc tên người giữ chức mới.']
    , ['You turn aside the first stroke and knock their blade down. The challenge stops there.', 'You survive and leave the hall for bandages. Your challenger still awaits an answer.', 'They plant the blade in the ground, and the Pinky names the new holder of the rank.']),
  {
    id: 'finger_long_road', age: [86, 125], major: true, weight: 7, jobs: ['Syndicate'], need: { fingerRankAtLeast: 3 },
    requires: ['ApexLongevity'], forbids: ['Distorted'],
    vi: '[Con đường ngoài địa bàn] Bạn đã ngồi ở ghế này qua nhiều thế hệ những người trẻ hơn mình. Một sáng nọ, bạn nhận ra mình không còn nghe thấy tên các con phố trong mơ nữa. Một người đi đường dừng xe cạnh cổng và hỏi bạn có cần đi nhờ không.',
    en: '[A road beyond the territory] You have sat in this seat through generations younger than yourself. One morning you notice you no longer hear the names of the streets in your dreams. A traveler stops a cart by the gate and asks whether you need a ride.',
    choices: [
      { labelVi: 'Lên xe, rời địa bàn', labelEn: 'Climb aboard and leave the territory',
        ...endsLife('wander', 'Bạn để giấy thông hành trên bàn họp rồi lên xe. Ở trạm kiểm soát, người đi đường hỏi tên để ghi vào sổ. Bạn trả lời bằng tên của mình.', 'You leave your pass on the meeting table and climb aboard. At the checkpoint, the traveler asks your name for the ledger. You give your own.'),
        deathCauseVi: 'Rời địa bàn của Finger và chu du, không ai biết tung tích', deathCauseEn: 'Left the Finger’s territory and wandered, whereabouts unknown' },
      { labelVi: 'Từ chối, còn việc chưa xong', labelEn: 'Decline, there is unfinished business',
        effects: { sanity: -2, rep: 1 },
        resultVi: 'Người đi đường gật đầu và đánh xe đi mà không hỏi lại. Bạn đứng thêm lúc nữa ngoài cổng rồi mới vào.', resultEn: 'The traveler nods and drives away without asking again. You stand a while longer at the gate, then go inside.' }
    ]
  },
  {
    id: 'finger_seat_handed_on', age: [84, 125], major: true, weight: 7, jobs: ['Syndicate'], need: { fingerRankAtLeast: 3 },
    requires: ['ApexLongevity'], forbids: ['Distorted'],
    vi: '[Người chờ chiếc ghế] Người bạn chọn làm người kế vị đã chờ nhiều năm mà không một lần nhắc đến chiếc ghế. Hôm nay họ mang đến một bình trà và ngồi xuống phía đối diện. Họ không nói gì cả buổi sáng, và bạn hiểu đó là cách họ hỏi.',
    en: '[The one waiting for the seat] The one you chose as heir has waited years without once mentioning the seat. Today they bring a pot of tea and sit opposite. They say nothing all morning, and you understand it is their way of asking.',
    choices: [
      { labelVi: 'Trao lại ghế cho đàng hoàng', labelEn: 'Hand over the seat with proper ceremony',
        ...endsLife('retired', 'Buổi lễ nhỏ và diễn ra trong phòng không có khách. Bạn đặt tay người ấy lên tay vịn của chiếc ghế rồi bước ra ngoài. Cả khu phố biết trước khi tin được đọc.', 'The ceremony is small and held in a room without guests. You place their hand on the arm of the chair and step outside. The whole street knows before the news is read.', { sanity: 5, rep: 4 }),
        deathCauseVi: 'Trao lại ghế cho người kế vị và về sống lặng lẽ', deathCauseEn: 'Passed the seat to the heir and retired quietly' },
      { labelVi: 'Giữ ghế thêm vài năm, nói rằng người ấy chưa sẵn sàng', labelEn: 'Keep the seat a few more years, saying they are not ready',
        effects: { rep: 1, sanity: -3 },
        resultVi: 'Họ rót trà cho bạn lần nữa và không nói gì. Bạn thấy tay họ siết lại một chút quanh tách, rồi buông ra.', resultEn: 'They pour you tea again and say nothing. You see their hand tighten a little around the cup, then loosen.' }
    ]
  }
];

const NON_APEX_ENDINGS = [
  {
    id: 'elder_fixer_last_ledger', age: [90, 125], jobs: ['Fixer'], major: true, weight: 8,
    forbids: ['Distorted', 'ColorFixer', 'elder_fixer_ending_done'],
    vi: '[Cuốn sổ Request cuối cùng] Thư ký mới của Office đặt trước mặt bạn cuốn sổ ghi những việc bạn nhận suốt mấy mươi năm. Anh ta chưa sinh ra lúc bạn ký trang đầu, chỉ rụt rè hỏi hôm nay bạn muốn khóa sổ hay nhận thêm một việc.',
    en: '[The last Request ledger] The new Office clerk sets down the ledger of jobs you took across the decades. He was not yet born when you signed the first page, and asks quietly whether you want to close the book today or take one more job.',
    choices: [
      { labelVi: 'Nộp lại thẻ Fixer và khóa sổ', labelEn: 'Turn in your Fixer license and close the ledger',
        ...endsLife('retired', 'Bạn đặt tấm thẻ kim loại đã mòn góc lên trang cuối. Thư ký đóng dấu kết thúc hồ sơ rồi tiễn bạn ra tận cửa.', 'You set your worn metal license on the last page. The clerk stamps the file closed and sees you to the door.', { sanity: 6, rep: 3 }),
        deathCauseVi: 'Khóa sổ Request sau nhiều thập kỷ và về nghỉ ở phố cũ', deathCauseEn: 'Closed the Request ledger after decades and retired to an old street', flagsAdd: ['elder_fixer_ending_done'] },
      { labelVi: 'Nhận tờ Request niêm phong cuối bảng', labelEn: 'Take the sealed Request at the bottom of the board',
        outcomes: [
          { w: 50, effects: { health: -16, wealth: 18, rep: 6, sanity: 2 }, meritAdd: 16, flagsAdd: ['elder_fixer_ending_done'],
            resultVi: 'Đầu gối đã chậm nhưng tay bạn vẫn nhớ chỗ cần chém. Bạn mang biên bản về lúc rạng sáng trước con mắt sững sờ của đám Fixer trẻ.',
            resultEn: 'Your knees are slow, yet your hand remembers where to cut. You bring the signed slip back at dawn before the stunned eyes of the young Fixers.' },
          { w: 50, ...endsLife('last_bout', 'Kẻ bên kia con hẻm nhanh hơn bạn nửa nhịp. Bạn tựa lưng vào tường gạch quen thuộc, nghe tiếng mưa rơi trên mái tôn và biết chuyến đi đã trọn.',
            'The opponent across the alley is half a beat faster. You lean against the familiar brick wall, listening to rain on the tin roof, knowing the run is complete.', { health: -35 }),
            deathCauseVi: 'Ngã xuống trong Request cuối cùng ở tuổi già', deathCauseEn: 'Fell on one last Request in old age', flagsAdd: ['elder_fixer_ending_done'] }
        ] },
      { labelVi: 'Giữ thẻ lại, chỉ ngồi uống trà và chỉ đường cho lớp trẻ', labelEn: 'Keep the license, drink tea and advise the young ones',
        effects: { sanity: 3, network: 3 }, flagsAdd: ['elder_fixer_ending_done'],
        resultVi: 'Bạn gấp sổ lại nhưng không trả thẻ. Mỗi chiều bạn vẫn ghé bàn góc quán nhìn đám trẻ chia việc.',
        resultEn: 'You close the book without surrendering the badge. Each afternoon you still sit at the corner table watching the young ones divide the work.' }
    ]
  },
  {
    id: 'elder_workshop_last_forge', age: [90, 125], major: true, weight: 8,
    need: { workshopAccess: true }, forbids: ['Distorted', 'elder_workshop_ending_done'],
    vi: '[Lò rèn cuối ngày] Lửa trong lò của xưởng đã cháy qua hai đời thợ. Tay bạn không còn giữ nổi búa nặng cả buổi, còn người học việc thì đứng cạnh bàn nguội chờ xem bạn định xử lý phôi thép cuối cùng ra sao.',
    en: '[The forge at day’s end] The furnace in the workshop has burned through two generations of smiths. Your hand can no longer hold the heavy hammer all afternoon, and the apprentice waits by the cooling bench to see what you will do with the last steel billet.',
    choices: [
      { labelVi: 'Trao chìa khóa xưởng và dập lò', labelEn: 'Hand over the workshop keys and bank the furnace',
        ...endsLife('retired', 'Bạn treo chiếc tạp dề da lên móc tường rồi đặt chùm chìa khóa vào tay người học việc. Lần đầu tiên sau hàng chục năm, bạn ngủ mà không nghe tiếng búa.',
          'You hang the leather apron on its hook and set the keys in the apprentice’s palm. For the first time in decades, you sleep without the sound of hammers.', { sanity: 6, rep: 4 }),
        deathCauseVi: 'Giao lại xưởng rèn cho học trò và nghỉ ngơi', deathCauseEn: 'Handed the workshop to an apprentice and rested', flagsAdd: ['elder_workshop_ending_done'] },
      { labelVi: 'Đổ hết nhiệt lượng rèn mẻ vũ khí cuối cùng', labelEn: 'Pour full heat into forging one final weapon',
        outcomes: [
          { w: 55, effects: { health: -14, wealth: 20, rep: 8 }, meritAdd: 15, flagsAdd: ['elder_workshop_ending_done'],
            resultVi: 'Bạn gõ nhát búa cuối lúc bình minh. Lưỡi thép nguội đi trong máng dầu với đường vân sáng mà cả khu xưởng chưa từng thấy.',
            resultEn: 'You strike the final blow at dawn. The blade cools in the oil trough with a bright grain the workshop has never seen.' },
          { w: 45, ...endsLife('ripe_age', 'Nhát búa cuối vừa dứt thì hơi nóng làm tim bạn khựng lại. Người học việc đỡ lấy bạn bên cạnh lưỡi thép vừa thành hình.',
            'As the final hammer blow lands, the furnace heat stops your heart. Your apprentice catches you beside the newly finished blade.', { health: -35 }),
            deathCauseVi: 'Trút hơi thở cuối bên lò rèn khi hoàn tất tuyệt tác', deathCauseEn: 'Breathed their last beside the forge upon completing a masterwork', flagsAdd: ['elder_workshop_ending_done'] }
        ] },
      { labelVi: 'Giữ lại bàn khắc nhỏ ở góc xưởng, tiếp tục sống', labelEn: 'Keep a small engraving bench in the corner and live on',
        effects: { sanity: 4, wealth: 4 }, flagsAdd: ['elder_workshop_ending_done'],
        resultVi: 'Bạn nhường lò lớn cho người trẻ, chỉ giữ lại bộ dũa nhỏ để chỉnh từng khớp khóa mỗi sáng.',
        resultEn: 'You leave the main furnace to the young smiths, keeping only a set of fine files to tune lock joints each morning.' }
    ]
  },
  {
    id: 'elder_outcast_last_alley', age: [90, 125], jobs: ['Outcast'], major: true, weight: 8,
    forbids: ['Distorted', 'elder_outcast_ending_done'],
    vi: '[Góc phố đã đổi tên ba lần] Con hẻm nơi bạn sống đã thay bảng tên ba lần và chẳng còn ai nhớ tên đầu tiên của nó ngoài bạn. Sáng nay có đoàn xe chở hàng ra rìa District dừng ngay đầu ngõ.',
    en: '[The street renamed three times] The alley where you live has changed its sign three times, and no one remembers its first name but you. This morning a supply wagon bound for the District edge stops at the corner.',
    choices: [
      { labelVi: 'Leo lên thùng xe, rời khỏi con hẻm mãi mãi', labelEn: 'Climb onto the wagon and leave the alley for good',
        ...endsLife('wander', 'Người đánh xe dịch thùng gỗ nhường chỗ cho bạn mà không hỏi tiền. Bạn ngoái nhìn mái hiên cũ một lần rồi để chiếc xe đưa đi.',
          'The driver shifts a crate to make room for you without asking for coin. You look back once at the old eaves and let the wagon carry you off.', { sanity: 5 }),
        deathCauseVi: 'Lên xe rời khỏi khu phố cũ ở tuổi cửu tuần', deathCauseEn: 'Rode away from the old street in their nineties', flagsAdd: ['elder_outcast_ending_done'] },
      { labelVi: 'Đòi lại món nợ cũ từ tay chủ sạp đầu phố', labelEn: 'Collect an old debt from the corner stall boss',
        outcomes: [
          { w: 50, effects: { health: -12, wealth: 14, rep: 5 }, flagsAdd: ['elder_outcast_ending_done'],
            resultVi: 'Gã chủ sạp nhìn vết sẹo trên tay bạn rồi lẳng lặng đếm đủ tiền đặt lên bàn.',
            resultEn: 'The stall boss looks at the scars on your hand and quietly counts the full sum onto the table.' },
          { w: 50, ...endsLife('last_bout', 'Đám bảo vệ của sạp ùa ra trước khi bạn kịp lùi lại. Bạn ngã xuống trên nền đá lát mà mình đã đi qua suốt cả đời.',
            'The stall guards rush out before you can step back. You fall upon the paving stones you walked your whole life.', { health: -35 }),
            deathCauseVi: 'Ngã xuống trên con hẻm cũ trong lần đòi nợ cuối', deathCauseEn: 'Fell on the old alley stones collecting one last debt', flagsAdd: ['elder_outcast_ending_done'] }
        ] },
      { labelVi: 'Ở lại căn gác nhỏ và nghe tiếng phố thêm vài năm', labelEn: 'Stay in the small room and listen to the street a few more years',
        effects: { sanity: 4, health: 2 }, flagsAdd: ['elder_outcast_ending_done'],
        resultVi: 'Đoàn xe lăn bánh đi xa. Bạn pha ấm nước nóng và ngồi nhìn nắng chiều chiếu qua khe cửa.',
        resultEn: 'The wagon rolls away. You boil a pot of water and watch the afternoon light slant through the window gap.' }
    ]
  }
];

const ELDER_CHAPTER_EVENTS = [
  {
    id: 'elder_chapter_chronicle_offer', age: [68, 125], major: true, weight: 9,
    forbids: ['Distorted', 'elder_chronicle_done'],
    vi: '[Người chép sử tìm đến] Một biên tập viên mang cặp tài liệu của Dieci đến gõ cửa nhà bạn. Anh ta nói những người còn nhớ chuyện bốn mươi năm trước ở khu này chỉ đếm trên đầu ngón tay, muốn ghi lại lời kể của bạn.',
    en: '[A chronicler at the door] A compiler carrying a Dieci briefcase knocks at your door. He says those who still remember this district forty years ago can be counted on one hand, and asks to record your account.',
    choices: [
      { labelVi: 'Kể lại đúng những gì đã xảy ra, không thêm bớt', labelEn: 'Tell exactly what happened, adding and hiding nothing',
        effects: { sanity: 4, rep: 5, heat: 3 }, flagsAdd: ['elder_chronicle_done'],
        resultVi: 'Anh ta viết kín hai cuốn sổ tay rồi cúi đầu cảm ơn trước khi cất vào cặp khóa số.',
        resultEn: 'He fills two notebooks, bows in thanks, and locks them inside his case.' },
      { labelVi: 'Lược bỏ những cái tên nhạy cảm để giữ yên thân', labelEn: 'Leave out sensitive names to keep the peace',
        effects: { sanity: 2, wealth: 8, network: 3 }, flagsAdd: ['elder_chronicle_done'],
        resultVi: 'Anh ta nhận ra những khoảng trống trong câu chuyện nhưng vẫn trả đủ nhuận bút như đã hẹn.',
        resultEn: 'He notices the gaps in your account but pays the agreed fee in full.' },
      { labelVi: 'Đuổi khéo, chuyện cũ không phải thứ để đóng quyển', labelEn: 'Send him away; old matters are not meant to be bound in books',
        effects: { sanity: 3, heat: -3 }, flagsAdd: ['elder_chronicle_done'],
        resultVi: 'Người biên tập viên khép sổ lại, để danh thiếp trên bàn rồi lặng lẽ cáo từ.',
        resultEn: 'The compiler closes his notebook, leaves a card on the table, and quietly takes his leave.' }
    ]
  },
  {
    id: 'elder_chapter_longevity_price', age: [72, 125], major: true, weight: 9,
    requires: ['ApexLongevity'], forbids: ['Distorted', 'elder_longevity_price_done'],
    vi: '[Cái giá của năm tháng mượn thêm] Bác sĩ phụ trách hồ sơ tuổi thọ của bạn đặt bảng kết quả xét nghiệm lên bàn. Thuốc vẫn giữ tim đập đều, nhưng liều năm nay phải tăng gấp rưỡi nếu không muốn các khớp cứng lại vào mùa lạnh.',
    en: '[The cost of borrowed decades] The physician managing your longevity file sets the test sheet on the desk. The regimen still keeps your pulse steady, yet this year’s dose must increase by half to keep your joints from stiffening in the cold.',
    choices: [
      { labelVi: 'Trả thêm phí và nhận liều thuốc đậm đặc', labelEn: 'Pay the surcharge and take the concentrated dose',
        costAhn: 14, effects: { health: 8, sanity: -4 }, flagsAdd: ['elder_longevity_price_done'],
        resultVi: 'Thuốc chạy qua tĩnh mạch lạnh buốt như nước đá, đổi lại sáng hôm sau bạn bước xuống cầu thang không cần vịn.',
        resultEn: 'The medicine runs ice-cold through your veins, but the next morning you walk down the stairs without holding the rail.' },
      { labelVi: 'Giữ nguyên liều cũ, chấp nhận cơ thể chậm đi', labelEn: 'Keep the old dose and accept a slower body',
        effects: { health: -4, sanity: 4 }, flagsAdd: ['elder_longevity_price_done'],
        resultVi: 'Bác sĩ ghi chú vào bìa hồ sơ. Cổ tay bạn hơi nhức lúc trời trở gió nhưng đầu óc nhẹ nhõm hơn.',
        resultEn: 'The doctor makes a note on the folder cover. Your wrist aches when the wind turns, yet your mind feels lighter.' }
    ]
  },
  {
    id: 'elder_chapter_third_generation', age: [74, 125], major: true, weight: 9,
    forbids: ['Distorted', 'elder_third_gen_done'],
    vi: '[Hậu duệ của người quen cũ] Một người trẻ tuổi mang theo kỷ vật quen mắt tìm tới gõ cửa. Đó là cháu của người từng đi cùng bạn thời mới vào nghề, nay muốn xin bạn một lời chỉ dẫn trước kỳ sát hạch.',
    en: '[Grandchild of an old acquaintance] A young person carrying a familiar keepsake knocks at your door. They are the grandchild of someone who walked beside you in your early years, asking for guidance before their exam.',
    choices: [
      { labelVi: 'Dành một tuần chỉ lại những thế phòng thân căn bản', labelEn: 'Spend a week teaching fundamental defensive stances',
        effects: { sanity: 5, rep: 4, health: -3, network: 4 }, flagsAdd: ['elder_third_gen_done'],
        resultVi: 'Đứa nhỏ tiếp thu nhanh hệt như người xưa. Ngày cuối tuần nó để lại giỏ quà trước hiên rồi lên đường đi thi.',
        resultEn: 'The youth learns quickly, just like their grandparent. At week’s end they leave a gift basket on the porch and set off for the exam.' },
      { labelVi: 'Tặng một khoản lộ phí và khuyên nó chọn nghề khác an toàn hơn', labelEn: 'Give travel money and advise choosing a safer trade',
        costAhn: 8, effects: { sanity: 4, network: 2 }, flagsAdd: ['elder_third_gen_done'],
        resultVi: 'Đứa nhỏ cầm túi tiền cúi đầu thật sâu. Bạn không biết nó có nghe lời khuyên ấy hay không.',
        resultEn: 'The youth takes the pouch with a deep bow. You cannot tell whether they will heed the warning.' }
    ]
  },
  {
    id: 'elder_invest_office_patron', age: [40, 120], major: true, weight: 9,
    need: { stat: { wealth: [45, 100] } }, forbids: ['Distorted', 'EndgameOfficePatron'],
    vi: '[Mua cổ phần địa bàn] Chưởng quỹ quản lý khu phố mang tới hợp đồng chuyển nhượng ba dãy kho vận cùng phòng trực điều phối. Ông ta nói chỉ người có sẵn tiền mặt mới gánh nổi khoản đặt cọc ngay tuần này.',
    en: '[Acquiring district shares] The quarter steward brings a deed for three depot rows and a dispatch room. He says only someone with liquid Ahn can cover the deposit this week.',
    choices: [
      { labelVi: 'Chi tiền thâu tóm kho vận, thu cổ tức dài hạn', labelEn: 'Buy the depot shares for long-term dividends',
        costAhn: 35, effects: { rep: 6, network: 5, sanity: 2 }, meritAdd: 12, flagsAdd: ['EndgameOfficePatron'],
        resultVi: 'Bạn ký tên và đóng con dấu cá nhân lên văn tự. Từ năm sau, tiền thuê kho cùng mạng lưới thông tin khu vực đều chảy qua sổ của bạn.',
        resultEn: 'You sign and stamp the deed with your personal seal. Starting next year, depot rents and local dispatch intel flow through your ledger.' },
      { labelVi: 'Chỉ góp vốn nhỏ để giữ chỗ gửi hàng', labelEn: 'Contribute a small stake just to keep storage access',
        costAhn: 12, effects: { rep: 2, network: 2 }, flagsAdd: ['EndgameOfficePatron_minor'],
        resultVi: 'Bạn đặt cọc gian kho nhỏ ở cuối dãy để tiện cất đồ nghề khi cần.',
        resultEn: 'You lease a small bay at the end of the row to store gear when needed.' },
      { labelVi: 'Khước từ hợp đồng, giữ tiền mặt cho việc khẩn cấp', labelEn: 'Decline the deed and keep liquid cash for emergencies',
        effects: { sanity: 1 }, flagsAdd: ['EndgameOfficePatron_skipped'],
        resultVi: 'Chưởng quỹ thu lại bản thảo hợp đồng, hẹn sẽ hỏi lại nếu sang năm dãy kho còn trống.',
        resultEn: 'The steward gathers the draft contract, promising to ask again next year if the bays remain open.' }
    ]
  },
  {
    id: 'elder_invest_companion_gear', age: [40, 120], major: true, weight: 9,
    need: { companionActive: true, stat: { wealth: [40, 100] } }, forbids: ['Distorted', 'CompanionMasterworkGear'],
    vi: '[Đặt giáp riêng cho người đi cùng] Thợ cả của xưởng quen trải bản vẽ bộ giáp lót sợi giảm chấn lên bàn. Ông ta bảo nếu đo vừa khít cho người vẫn sát cánh cạnh bạn thì phải trả trước tiền phôi hiếm.',
    en: '[Custom armor for your companion] The master smith spreads blueprints for shock-weaving liner armor on the bench. Fitting it to the one who walks beside you requires paying upfront for rare alloy stock.',
    choices: [
      { labelVi: 'Đặt làm nguyên bộ giáp và vũ khí đồng bộ', labelEn: 'Commission the full matched armor and weapon set',
        costAhn: 30, effects: { sanity: 4, rep: 3 }, flagsAdd: ['CompanionMasterworkGear'],
        resultVi: 'Khi mặc thử bộ giáp mới, bước chân người đồng hành nhẹ hẳn đi mà các khớp che chắn vẫn kín kẽ.',
        resultEn: 'Trying on the new rig, your companion moves with lighter steps while every joint stays guarded.' },
      { labelVi: 'Chỉ gia cố lại tấm hộ tâm và bao vũ khí đang dùng', labelEn: 'Only reinforce the current chestplate and scabbard',
        costAhn: 10, effects: { sanity: 2, rep: 1 }, flagsAdd: ['CompanionGearTuned'],
        resultVi: 'Thợ rèn thay lại các đinh tán đã mòn và mài sắc lại mép thép trước khi trời tối.',
        resultEn: 'The smith replaces worn rivets and sharpens the steel edge before nightfall.' },
      { labelVi: 'Tự tay bảo dưỡng bộ đồ cũ tại bàn nguội', labelEn: 'Maintain the existing kit yourself at the workbench',
        effects: { sanity: 1 }, flagsAdd: ['CompanionGearTuned'],
        resultVi: 'Bạn mượn đá mài và dầu máy của xưởng để lau lại từng khớp giáp cho người đồng hành.',
        resultEn: 'You borrow the workshop whetstone and oil to service each armor joint for your companion.' }
    ]
  },
  {
    id: 'elder_invest_lineage_fund', age: [42, 125], major: true, weight: 9,
    need: { stat: { wealth: [50, 100] } }, forbids: ['Distorted', 'LineageEndowmentFund'],
    vi: '[Lập két sắt di sản] Luật sư lưu trữ của Hiệp hội đề nghị lập một quỹ tín thác niêm phong bằng mã huyết thống. Số tiền gửi vào đây sẽ không bị tịch thu khi bạn ngã xuống mà chuyển thẳng cho người nối bước.',
    en: '[Establishing a lineage vault] An Association archive notary proposes a sealed bloodline trust. Funds placed inside cannot be seized when you fall and pass directly to your successor.',
    choices: [
      { labelVi: 'Niêm phong khoản tiền lớn vào Quỹ Di Sản Huyết Thống', labelEn: 'Seal a major sum into the Lineage Endowment Fund',
        costAhn: 40, reserveAdd: 40, effects: { sanity: 5, rep: 4 }, flagsAdd: ['LineageEndowmentFund'],
        resultVi: 'Hộp khóa đồng đóng sập lại dưới lớp sáp đỏ. Dù ngày mai có ra sao, người đi sau bạn cũng không phải bắt đầu với hai bàn tay trắng.',
        resultEn: 'The brass lock snaps shut beneath red wax. Whatever happens tomorrow, the one who follows will not start empty-handed.' },
      { labelVi: 'Giữ tiền mặt bên người để xoay xở lúc cần', labelEn: 'Keep cash on hand for immediate contingencies',
        effects: { sanity: 1 }, flagsAdd: ['LineageEndowment_skipped'],
        resultVi: 'Bạn cảm ơn vị luật sư rồi cất lại túi tiền vào áo trong.',
        resultEn: 'You thank the notary and tuck the pouch back inside your coat.' }
    ]
  },
  {
    id: 'bereavement_elder_old_friend_passing', age: [45, 125], major: true, weight: 12,
    requires: ['RecentElderBereavement'], forbids: ['Distorted', 'elder_bereavement_mourned'],
    vi: '[Buổi tiễn đưa chiều muộn] Người quen cũ đã đi hết tuổi trời mà không phải ngã xuống vì đao kiếm. Trước căn phòng nhỏ, vài người hàng xóm đứng đợi bạn tới đặt kỷ vật cuối cùng lên bàn gỗ.',
    en: '[Late afternoon farewell] An old companion has reached the end of their natural years without falling to a blade. Before the small room, a few neighbors wait for you to set a final keepsake on the wooden table.',
    choices: [
      { labelVi: 'Đứng lại tới lúc đèn đường bật sáng và nhận giữ hộp kỷ vật', labelEn: 'Stay until the streetlamps light up and keep the keepsake box',
        effects: { sanity: 6, resonance: 4, rep: 2 }, flagsAdd: ['elder_bereavement_mourned'],
        resultVi: 'Trong hộp gỗ nhỏ là tấm ảnh chụp chung đã phai màu và chiếc huy hiệu cũ được lau sáng bóng.',
        resultEn: 'Inside the small wooden box lies a faded photograph of you both and an old badge polished bright.' },
      { labelVi: 'Gửi tiền lo hậu sự chu đáo rồi lặng lẽ quay về trước khi mưa', labelEn: 'Cover the funeral expenses in full and leave quietly before the rain',
        costAhn: 8, effects: { sanity: 4, network: 3 }, flagsAdd: ['elder_bereavement_mourned'],
        resultVi: 'Gia quyến cúi đầu cảm tạ. Bạn mở ô bước đi trên con phố ướt mà lòng nhẹ đi một nửa.',
        resultEn: 'The family bows in gratitude. You open your umbrella and walk down the wet street with a lighter heart.' }
    ]
  },
  {
    id: 'elder_callback_echo_of_youth', age: [55, 125], major: true, weight: 9,
    forbids: ['Distorted', 'elder_echo_of_youth_done'],
    vi: '[Vết khắc từ thời trẻ] Khi dọn lại ngăn kéo dưới đáy tủ, bạn chạm phải mảnh biên nhận có đóng dấu từ hơn ba mươi năm trước. Cái tên ghi ở mặt sau từng là ngã rẽ đầu tiên định hình cả cuộc đời bạn.',
    en: '[An etching from youth] Clearing the bottom drawer, your fingers brush a stamped receipt from over thirty years ago. The name written on the back was the first crossroad that shaped your life.',
    choices: [
      { labelVi: 'Ghi chú lại câu chuyện phía sau tờ biên nhận cho người đời sau đọc', labelEn: 'Write down the story behind the receipt for your successor to read',
        effects: { sanity: 5, resonance: 3, rep: 3 }, flagsAdd: ['elder_echo_of_youth_done'],
        resultVi: 'Nét mực mới nằm cạnh con dấu cũ đã ngả màu vàng, nối liền hai đầu một đời người.',
        resultEn: 'Fresh ink rests beside the yellowed stamp, joining both ends of a single life.' },
      { labelVi: 'Đốt tờ giấy trên ngọn nến để khép lại chuyện xưa', labelEn: 'Burn the slip over a candle to close the old chapter',
        effects: { sanity: 4, heat: -4 }, flagsAdd: ['elder_echo_of_youth_done'],
        resultVi: 'Tàn tro rơi xuống đĩa sứ. Bạn thổi tắt nến và thấy đêm nay dễ ngủ hơn mọi ngày.',
        resultEn: 'Ash settles on the porcelain saucer. You blow out the candle and find sleep comes easier tonight.' }
    ]
  }
];

export const ELDER_TWILIGHT_EVENTS = [...NON_APEX_ENDINGS, ...ELDER_CHAPTER_EVENTS];
export const APEX_TWILIGHT_EVENTS = [...LONGEVITY, ...COLOR_ENDINGS, ...FINGER_ENDINGS];
