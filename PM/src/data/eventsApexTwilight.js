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
    '[Phòng khám không có bảng hiệu] Một bác sĩ của Hana mời bạn ghé một phòng khám ở tầng sâu của trụ sở, nơi những ống tiêm xanh của K Corp được xếp theo từng tên. Họ nói Hana không có ý định mất một Color vì tuổi già, và đã tính xem bạn còn dùng được bao lâu nếu được chăm đúng cách.',
    '[The unmarked clinic] A Hana physician invites you to a clinic deep in the headquarters, where green K Corp ampoules are shelved by name. They say Hana has no intention of losing a Color to age, and has worked out how long you remain useful if properly kept.',
    ['Nhận chương trình chăm sóc của Hana', 'Bạn nằm xuống chiếc giường trắng và không hỏi giá. Mỗi mùa có một thứ trong cơ thể được thay hoặc được tiêm, và người thay không bao giờ nhìn vào mặt bạn. Bác sĩ nói bạn sẽ thấy ngày thứ một trăm hai mươi, nếu bạn còn muốn thấy.'],
    ['Accept Hana’s program of care', 'You lie down on the white bed and do not ask the price. Each season something in your body is replaced or injected, and the one who does it never looks at your face. The physician says you will see your hundred-and-twentieth year, if you still want to.'],
    { wealth: -14, sanity: -4, health: 8, resonance: 4 },
    'Bác sĩ cất chiếc khay và không có vẻ ngạc nhiên. Ông ghi vào sổ rằng lời mời vẫn còn mở, và bạn nghe ông nói điều đó như một điều ông đã nói cho nhiều người trước bạn.',
    'The physician puts the tray away and does not seem surprised. He notes that the offer stays open, and you hear him say it as he has said it to many before you.'),
  longevity('apex_longevity_thumb', fingerOnly('Thumb'),
    '[Bác sĩ của gia đình] Một bác sĩ chuyên mổ các vết thương đạn của The Thumb ghé thăm với một hộp dụng cụ mới. Ông nói Underboss không được chết khi vừa quen với ghế, và ông có một danh sách các bộ phận có thể thay trong suốt hai mươi năm tới.',
    '[The family surgeon] A physician who has patched the Thumb’s gunshot wounds visits with a new case of instruments. He says an Underboss must not die just as the seat starts to fit, and that he has a list of parts that can be replaced over the next twenty years.',
    ['Giao cơ thể cho bác sĩ của gia đình', 'Bạn ký vào một tờ giấy không có tên bệnh viện. Từ đó mỗi năm bạn bước vào phòng mổ hai lần, và ra khỏi phòng mổ với cùng khuôn mặt, nhưng bước chân chắc hơn.'],
    ['Entrust your body to the family surgeon', 'You sign a paper with no hospital named. From then on you enter the operating room twice a year, and leave it with the same face but a steadier step.'],
    { wealth: -12, sanity: -3, health: 8 },
    'Ông cất dụng cụ và nói rằng vết đạn ở sườn sẽ tự lành đủ lâu để bạn quên nó. Bạn biết ông cũng nói câu đó với mọi người, và không biết lúc nào nó thôi đúng.',
    'He puts away the instruments and says the bullet scar in your side will heal long enough for you to forget it. You know he says this to everyone, and cannot tell when it stops being true.'),
  longevity('apex_longevity_index', fingerOnly('Index'),
    '[Prescript giữ nhịp tim] Một Prescript đến tay bạn không ghi nhiệm vụ nào. Nó ghi: ở lại đủ lâu để đọc hết những tờ chưa đến. Một Proxy lặng lẽ để bên cạnh nó một danh sách giờ uống thuốc.',
    '[A Prescript to keep the heart going] A Prescript reaches your hands with no mission written on it. It says: remain long enough to read the sheets that have not yet arrived. A Proxy quietly leaves a schedule of medicines beside it.',
    ['Làm đúng như Prescript', 'Bạn uống thuốc theo giờ như thể đó là bất kỳ lệnh nào khác. Sau nhiều năm, bạn nhận ra mình không còn biết thứ nào trong cơ thể là của bạn, và không có Prescript nào bảo bạn phải biết.'],
    ['Follow the Prescript exactly', 'You take the medicine on time as you would any other order. After many years you realize you no longer know which parts of the body are yours, and no Prescript tells you that you must.'],
    { sanity: -5, health: 8, resonance: 3 },
    'Bạn gấp tờ Prescript lại và không nghe thấy ai phản đối. Index ghi nhận rằng bạn đã đọc nó, và để nó nằm ở đó, không giục.',
    'You fold the Prescript away and hear no objection. The Index records that you read it, and leaves it lying there, unhurried.'),
  longevity('apex_longevity_middle', fingerOnly('Middle'),
    '[Cuốn sổ cần người đọc] Người giữ Book of Vengeance nói rằng có những tên trong sổ cần hai mươi năm nữa mới đến hạn. Ông không thể giao chúng cho người chưa đủ trọng lượng, và cũng không muốn bạn không còn ở đó khi chúng được gạch.',
    '[A book that needs its reader] The keeper of the Book of Vengeance says some names in it will not come due for another twenty years. He cannot hand them to anyone without enough weight, and does not want you gone when they are struck.',
    ['Nhận chăm sóc từ gia đình', 'Gia đình thuê một bác sĩ riêng cho bạn và không ai nhắc đến giá. Bạn thấy lần đầu trong đời mình cần được chăm sóc, và nó khó chịu hơn bạn nghĩ.'],
    ['Accept care from the family', 'The family hires a private physician for you and no one mentions the cost. You feel for the first time in your life that you need looking after, and it is more uncomfortable than you thought.'],
    { wealth: -10, sanity: -2, health: 8, network: 3 },
    'Người giữ sổ gật đầu và nói rằng ông sẽ ghi các tên cũ nhất ở trang riêng, để người đến sau bạn đọc được chúng. Bạn hiểu ông nói vậy là có lý do.',
    'The keeper nods and says he will enter the oldest names on a separate page, so whoever comes after you can read them. You understand he says this for a reason.'),
  longevity('apex_longevity_ring', fingerOnly('Ring'),
    '[Cơ thể như một tác phẩm] Một Maestro già cầm tay bạn lên dưới ánh đèn và nói rằng đây là tác phẩm quan trọng nhất bạn chưa hoàn thiện. Ông có một phương pháp thay từng phần bằng tay nghề của Ring, và không phần nào sẽ lộ ra ngoài.',
    '[A body as a piece of work] An aged Maestro lifts your hand under the lamp and says this is the most important work you have not finished. He has a method of replacing parts by the Ring’s craft, and no part will show.',
    ['Để Maestro hoàn thiện cơ thể bạn', 'Bạn ngồi yên hàng giờ trong khi ông làm việc, và nhìn ông làm như thể đang xem người khác. Khi xong, ông nói không phải ông đã sửa bạn, mà bạn đã được nhìn kỹ lần đầu.'],
    ['Let the Maestro complete your body', 'You sit still for hours while he works and watch him as if watching someone else. When it is done he says he did not mend you, only that you were looked at carefully for the first time.'],
    { wealth: -10, sanity: -2, health: 8, resonance: 3 },
    'Maestro gật đầu và đặt bàn tay bạn xuống như đặt một món đồ mong manh. Ông nói tác phẩm nào cũng có lúc cần thời gian, và không có lý do để vội.',
    'The Maestro nods and sets your hand down as one sets down a fragile piece. He says every work needs its time and there is no reason to hurry.'),
  longevity('apex_longevity_pinky', fingerOnly('Pinky'),
    '[Thuốc của Star of the Sky] Một Star of the Sky già gửi cho bạn một hộp thuốc không nhãn cùng một bức thư ngắn. Thư nói rằng một thanh kiếm không nên gãy chỉ vì người cầm nó mỏi, và rằng họ đã uống chúng suốt bốn mươi năm.',
    '[The medicine of a Star of the Sky] An aged Star of the Sky sends you an unlabeled box of medicine and a short letter. The letter says a blade should not break merely because the one holding it grows tired, and that they have taken these for forty years.',
    ['Uống thuốc theo thư', 'Bạn uống từng viên mỗi sáng, cùng lúc với lúc bạn mài kiếm. Một năm sau, tay bạn vẫn vững hơn tay những Sworn Blade đứng cạnh.'],
    ['Take the medicine as the letter says', 'You take one each morning at the same hour you hone your blade. A year later your hand is still steadier than the Sworn Blades beside you.'],
    { sanity: -2, health: 8, rep: 2 },
    'Bạn gửi hộp thuốc trả lại với một dòng cảm ơn. Bức thư trả lời chỉ có bốn chữ: Kiếm tự biết lúc.',
    'You return the box with a line of thanks. The reply carries only four words: The blade knows when.')
];

const endsLife = (lifeEnding, vi, en, fx = {}) => ({ endsLife: true, lifeEnding, effects: fx, resultVi: vi, resultEn: en });

const COLOR_ENDINGS = [
  {
    id: 'color_long_road', age: [84, 125], jobs: ['Fixer'], major: true, weight: 8,
    requires: ['ColorFixer', 'ApexLongevity'], forbids: ['Distorted'],
    vi: '[Cánh cổng phụ] Một buổi sáng bạn thấy mình đã đứng trước cánh cổng phụ của khu Hana lâu hơn cần thiết. Người gác không hỏi. Bên ngoài có một con đường bạn chưa đi hết, và bạn nhớ rằng đã từng nghĩ sẽ đi nó khi còn trẻ.',
    en: '[A side gate] One morning you find you have stood at the side gate of the Hana grounds longer than needed. The guard does not ask. Beyond lies a road you never walked to its end, and you remember once planning to take it when young.',
    choices: [
      { labelVi: 'Bước qua cổng và không quay đầu', labelEn: 'Step through the gate and do not look back',
        ...endsLife('wander', 'Bạn gửi lại huy hiệu Color ở quầy gác và đi. Hết mùa, người ta kể rằng một người già mang thanh kiếm cũ đã qua một trạm kiểm soát ngoài tường mà không ai dám hỏi giấy.', 'You leave the Color badge at the guard post and go. By season’s end people say an old traveler with a worn blade passed a checkpoint beyond the wall and no one dared ask for papers.'),
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
        ...endsLife('retired', 'Bạn đứng dậy, đặt huy hiệu lên bàn và nói bốn chữ. Người kế nhiệm không biết nên đứng hay ngồi. Sau đó, bạn ăn tối ở một quán nhỏ, và không ai trong quán biết bạn từng là ai.', 'You rise, set the badge on the table and say four words. The successor does not know whether to stand or sit. Afterward you dine in a small restaurant where no one knows who you were.', { sanity: 6, rep: 4 }),
        deathCauseVi: 'Nhường chỗ ngồi tại Hana và về sống ở phố cũ', deathCauseEn: 'Handed the Hana seat to a successor and retired to an old street' },
      { labelVi: 'Ngồi lại và nói rằng chưa phải lúc', labelEn: 'Stay seated and say it is not yet time',
        effects: { rep: 2, sanity: -3, network: 2 },
        resultVi: 'Phòng im lặng. Người kế nhiệm gật đầu quá nhanh. Bạn nhớ rằng đã từng làm đúng điều đó trước khi nhận chiếc ghế này.', resultEn: 'The room is silent. The successor nods too quickly. You recall doing exactly this before you took the chair.' }
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
          { w: 42, ...endsLife('purged', 'Phòng đó có nhiều cửa hơn bạn nhớ. Bạn ngã ở cánh cuối cùng, và người cuối cùng bạn nhìn thấy là một người bạn đã từng uống trà cùng.', 'The room has more doors than you remember. You fall at the last one, and the last face you see belongs to someone you once drank tea with.', { health: -40 }),
            deathCauseVi: 'Bị Section của Hana xử lý bằng một Request niêm phong', deathCauseEn: 'Dealt with by a Hana Section through a sealed Request' }
        ] },
      { labelVi: 'Viết thư xin từ bỏ tên Color, rút lui', labelEn: 'Write to resign the Color name and withdraw',
        ...endsLife('retired', 'Hana nhận thư và không hồi âm. Một tuần sau, người đưa thư thường không còn tới. Bạn sống thêm những năm cuối trong một căn nhà không có bảng tên, và uống trà mỗi chiều trước cửa sổ.', 'Hana receives the letter and does not reply. A week later the ordinary mail stops coming. You live your last years in a house with no nameplate and drink tea each afternoon at the window.', { sanity: 4, rep: -4 }),
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
    { labelVi: 'Đã biết trước và chuẩn bị', labelEn: 'Foreseen, and prepared for',
      need: { stat: { health: [40, 100] } },
      outcomes: [
        { w: 55, effects: { health: -18, rep: 8, sanity: -8, network: -4 }, meritAdd: 24, flagsAdd: ['usurp_resolved'],
          resultVi: `Bạn đứng dậy trước khi tay người ấy chạm tới thanh kiếm. ${tailVi[0]}`, resultEn: `You rise before their hand reaches the blade. ${tailEn[0]}` },
        { w: 45, effects: { health: -34, rep: -6, sanity: -10 }, flagsAdd: ['usurp_resolved'], scarsAdd: ['Nhát dao từ người đứng sau'],
          resultVi: `Bạn thoát ra bằng cửa phụ, mang theo một vết thương không thể che. ${tailVi[1]}`, resultEn: `You escape by a side door carrying a wound that cannot be hidden. ${tailEn[1]}` }
      ] },
    { labelVi: 'Tin họ, không chuẩn bị gì', labelEn: 'Trust them and prepare nothing',
      ...endsLife('usurped', `Nhát dao đến từ phía sau, ở chỗ bạn đã quen quay lưng. ${tailVi[2]}`, `The knife comes from behind, where you had grown used to turning your back. ${tailEn[2]}`, { health: -60 }),
      deathCauseVi: 'Bị người kế vị đâm sau lưng để soán ngôi', deathCauseEn: 'Stabbed in the back by a successor to take the seat', flagsAdd: ['usurp_resolved'] },
    { labelVi: 'Tự trao lại ghế trước khi họ phải ra tay', labelEn: 'Hand over the seat yourself before they must act',
      ...endsLife('retired', 'Người ấy sững lại, rồi cúi đầu rất thấp. Bạn đặt thanh kiếm lên bàn và rời phòng bằng cửa chính, lần đầu sau nhiều năm không có ai đi trước mở cửa.', 'They freeze, then bow very low. You set the blade on the table and leave by the front door, for the first time in many years with no one walking ahead to open it.', { sanity: 5, rep: -3 }),
      deathCauseVi: 'Trao lại quyền cai trị trước khi bị soán', deathCauseEn: 'Handed over the rule before it was seized', flagsAdd: ['usurp_resolved'] }
  ]
});

const FINGER_ENDINGS = [
  usurp('Thumb', 'Underboss quá lâu', 'An Underboss too long in the seat',
    'Sottocapo tin cậy nhất đã phục vụ bạn ba mươi năm và vừa nhận một phong bì từ một Capo bạn không nhớ tên. Mọi người ở bàn ăn tối nay đều chú ý đến thanh dao cắt bánh.',
    'The most trusted Sottocapo has served you thirty years and has just received an envelope from a Capo whose name you do not remember. Everyone at tonight’s dinner is watching the cake knife.',
    ['Capo ngã xuống trước, và The Thumb học cách gọi tên bạn như một điều chắc chắn.', 'Họ đuổi theo, nhưng không ai dám kết thúc người đã dạy họ cầm súng.', 'Người ấy lau dao, đặt xuống, rồi ngồi vào chỗ của bạn.'],
    ['The Capo falls first, and the Thumb learns to say your name as a certainty.', 'They chase, but no one dares finish the one who taught them to hold a gun.', 'They wipe the blade, set it down, then sit in your place.']),
  usurp('Index', 'Proxy đọc sai Prescript', 'A Proxy who reads the Prescript differently',
    'Một Proxy bạn đào tạo đã đọc một Prescript theo cách khiến bạn là người cuối cùng trong dòng. Họ không cần giết bạn, chỉ cần ngồi đúng chỗ khi bạn không còn nhận ra mình đang đứng sai.',
    'A Proxy you trained has read a Prescript in a way that makes you the last in its line. They do not need to kill you, only to sit in the right place when you no longer notice you stand in the wrong one.',
    ['Prescript được đọc lại trước cả phòng, và Proxy ấy đỏ mặt rồi im lặng suốt buổi.', 'Bạn rời Index mang theo một tờ Prescript mà không ai khác còn nhớ.', 'Họ đọc tên bạn lần cuối, bằng một giọng đều, và Index chép lại.'],
    ['The Prescript is read again before the whole room, and the Proxy flushes and stays silent for the session.', 'You leave the Index carrying a Prescript no one else still remembers.', 'They read your name one last time in an even voice, and the Index copies it down.']),
  usurp('Middle', 'Great Sibling đợi quá lâu', 'A Great Sibling who waited too long',
    'Một Great Sibling bạn từng nâng đỡ ghi tên bạn vào cuốn sổ mà không ai ngoài gia đình được thấy. Họ không giận bạn. Họ chỉ tin rằng gia đình cần một người trẻ hơn, và đã cân nhắc rất kỹ.',
    'A Great Sibling you once raised writes your name in the book no one outside the family may see. They are not angry at you. They only believe the family needs someone younger, and have weighed it very carefully.',
    ['Cuốn sổ được mở trước các Great Elder, và họ phải giải thích từng dòng đã viết.', 'Gia đình chia làm hai, và bạn rời đi khi cả hai bên đều tránh nhìn bạn.', 'Cái tên của bạn được gạch bằng bút đỏ, một nét thẳng.'],
    ['The book is opened before the Great Elders, and they must explain each line written.', 'The family splits in two, and you leave while both sides avoid your eyes.', 'Your name is struck through in red ink, one straight line.']),
  usurp('Ring', 'Maestro muốn bức tranh của chính họ', 'A Maestro who wants their own piece',
    'Một Maestro bạn từng bảo trợ đã đặt bạn vào một tác phẩm không có tên trên bản vẽ: chiếc ghế của Grand Curator sẽ chỉ còn một chỗ, và họ đã chọn ngày treo bức tranh.',
    'A Maestro you once sponsored has placed you in a work whose drawing carries no name: the Grand Curator’s chair will hold only one, and they have chosen the day for hanging the painting.',
    ['Bạn bước vào phòng trưng bày trước khi họ treo xong, và bức tranh bị hạ xuống trong im lặng.', 'Bạn rời nơi trưng bày mang theo một bức vẽ chưa hoàn thành mà không ai nhận làm tác giả.', 'Bức tranh được treo vào buổi sáng, và đứng đó rất đẹp.'],
    ['You enter the gallery before they finish hanging, and the painting is lowered in silence.', 'You leave the gallery carrying an unfinished drawing no one will claim as author.', 'The painting is hung in the morning and stands there, very beautiful.']),
  usurp('Pinky', 'Sworn Blade chờ nhát cuối', 'A Sworn Blade awaiting the last stroke',
    'Một Sworn Blade bạn từng nhận làm học trò hạ giọng trước mặt cả Pinky: thanh kiếm đứng đầu không nên già. Họ chờ bạn trả lời bằng nhát chém, và không ai trong phòng định ngăn họ.',
    'A Sworn Blade you took as a student lowers their voice before the whole Pinky: the foremost blade should not grow old. They wait for you to answer with a stroke, and no one in the room means to stop them.',
    ['Bạn đỡ nhát đầu và thanh kiếm của họ rơi xuống sàn. Họ cúi đầu mà không nói gì thêm.', 'Bạn thoát ra bằng một lối không ai canh và chưa bao giờ quay lại Pinky.', 'Họ cắm thanh kiếm vào đất, và Pinky đọc tên họ làm Sovereign.']
    , ['You catch the first stroke and their blade drops to the floor. They bow and say nothing more.', 'You slip away by a path no one guards and never return to the Pinky.', 'They plant the blade in the ground, and the Pinky reads their name as Sovereign.']),
  {
    id: 'finger_long_road', age: [86, 125], major: true, weight: 7, jobs: ['Syndicate'], need: { fingerRankAtLeast: 3 },
    requires: ['ApexLongevity'], forbids: ['Distorted'],
    vi: '[Con đường ngoài địa bàn] Bạn đã ngồi ở ghế này qua nhiều thế hệ những người trẻ hơn mình. Một sáng nọ, bạn nhận ra mình không còn nghe thấy tên các con phố trong mơ nữa. Một người đi đường dừng xe cạnh cổng và hỏi bạn có cần đi nhờ không.',
    en: '[A road beyond the territory] You have sat in this seat through generations younger than yourself. One morning you notice you no longer hear the names of the streets in your dreams. A traveler stops a cart by the gate and asks whether you need a ride.',
    choices: [
      { labelVi: 'Lên xe, rời địa bàn', labelEn: 'Climb aboard and leave the territory',
        ...endsLife('wander', 'Bạn để lại thanh kiếm trên bàn họp và không nói với ai. Người đi đường đưa bạn qua một trạm kiểm soát và hỏi tên. Bạn nói một tên bạn đã quên từ rất lâu, và nó vẫn đúng.', 'You leave your blade on the council table and tell no one. The traveler takes you through a checkpoint and asks your name. You say a name you forgot long ago, and it is still right.'),
        deathCauseVi: 'Rời địa bàn của Finger và chu du, không ai biết tung tích', deathCauseEn: 'Left the Finger’s territory and wandered, whereabouts unknown' },
      { labelVi: 'Từ chối, còn việc chưa xong', labelEn: 'Decline, there is unfinished business',
        effects: { sanity: -2, rep: 1 },
        resultVi: 'Người đi đường gật đầu và đánh xe đi mà không hỏi lại. Bạn đứng thêm một lúc ở cổng, rồi vào trong.', resultEn: 'The traveler nods and drives away without asking again. You stand a while longer at the gate, then go inside.' }
    ]
  },
  {
    id: 'finger_seat_handed_on', age: [84, 125], major: true, weight: 7, jobs: ['Syndicate'], need: { fingerRankAtLeast: 3 },
    requires: ['ApexLongevity'], forbids: ['Distorted'],
    vi: '[Người chờ chiếc ghế] Người bạn chọn làm người kế vị đã chờ nhiều năm mà không một lần nhắc đến chiếc ghế. Hôm nay họ mang đến một bình trà và ngồi xuống phía đối diện. Họ không nói gì cả buổi sáng, và bạn hiểu đó là cách họ hỏi.',
    en: '[The one waiting for the seat] The one you chose as heir has waited years without once mentioning the seat. Today they bring a pot of tea and sit opposite. They say nothing all morning, and you understand it is their way of asking.',
    choices: [
      { labelVi: 'Trao lại ghế một cách đàng hoàng', labelEn: 'Hand over the seat with proper ceremony',
        ...endsLife('retired', 'Buổi lễ nhỏ và diễn ra trong phòng không có khách. Bạn đặt tay người ấy lên tay vịn của chiếc ghế rồi bước ra ngoài. Cả khu phố biết trước khi tin được đọc.', 'The ceremony is small and held in a room without guests. You place their hand on the arm of the chair and step outside. The whole street knows before the news is read.', { sanity: 5, rep: 4 }),
        deathCauseVi: 'Trao lại ghế cho người kế vị và về sống lặng lẽ', deathCauseEn: 'Passed the seat to the heir and retired quietly' },
      { labelVi: 'Giữ ghế thêm vài năm, nói rằng người ấy chưa sẵn sàng', labelEn: 'Keep the seat a few more years, saying they are not ready',
        effects: { rep: 1, sanity: -3 },
        resultVi: 'Họ rót trà cho bạn lần nữa và không nói gì. Bạn thấy tay họ siết lại một chút quanh tách, rồi buông ra.', resultEn: 'They pour you tea again and say nothing. You see their hand tighten a little around the cup, then loosen.' }
    ]
  }
];

export const APEX_TWILIGHT_EVENTS = [...LONGEVITY, ...COLOR_ENDINGS, ...FINGER_ENDINGS];
