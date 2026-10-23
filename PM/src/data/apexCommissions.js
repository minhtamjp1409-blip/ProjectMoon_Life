// A Color or a Finger at its highest rank is offered one commission most years. A short hand-written
// list would repeat inside a single life, so each commission is built from three parts that are written
// separately: the scene (what has happened, where, against whom), a complication (what else is true
// that day) and the kind of work (a duel between equals, a hunt, a guard, a raid, a judgment, a public
// showing). A scene, a complication and a kind give a distinct entry, and freshness in the planner
// keeps one life from playing the same entry twice until the whole set is spent.

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const fill = (text, vars) => text
  .replace(/\{Foe\}/g, cap(vars.foe)).replace(/\{foe\}/g, vars.foe)
  .replace(/\{Place\}/g, cap(vars.place)).replace(/\{place\}/g, vars.place);

// Two or three phrasings per kind, picked by the complication, so the same kind does not read the same twice
const KINDS = {
  duel: {
    fight: true,
    steady: { vi: ['Đánh đúng luật và giữ nhịp đều', 'Trao đổi từng nhát, không dồn ép'], en: ['Fight by the rules at an even pace', 'Trade each stroke without forcing it'] },
    steadyOk: {
      vi: ['Hai bên kết thúc bằng một cái cúi đầu. Người chứng kiến ghi rằng không ai thắng rõ ràng, và tên bạn không bị kéo xuống.', 'Bạn giữ nhịp tới hồi cuối. {Foe} dừng trước khi bị thương nặng và hai bên cùng ký tờ ghi nhận.'],
      en: ['Both sides end with a bow. The witnesses record no clear winner, and your name is not pulled down.', 'You hold the pace to the last round. {Foe} stops before being badly hurt and both sides sign the record.']
    },
    bold: { vi: ['Dồn toàn lực để kết thúc trong vài nhịp', 'Nhận đòn đầu và đánh trả bằng cú quyết định'], en: ['Commit fully to end it in a few beats', 'Take the first blow and answer with the deciding cut'] },
    boldOk: {
      vi: ['{Foe} ngã ở nhịp thứ ba. {Place} im lặng một lúc, rồi mới có người đứng dậy, và tên bạn được đọc to hơn.', 'Bạn thắng bằng một nhát. {Foe} cúi đầu từ dưới sàn, và người xem nhắc lại nhát đó đến hết mùa.'],
      en: ['{Foe} goes down on the third beat. {Place} stays quiet a while before anyone rises, and your name is read louder.', 'You win with one stroke. {Foe} bows from the floor, and onlookers repeat that stroke until the season ends.']
    },
    boldFail: {
      vi: ['{Foe} chịu được nhát đầu và đáp lại. Bạn vẫn đứng, nhưng bản ghi mô tả đây là trận hòa sát nút.', '{Foe} nhanh hơn dự đoán. Bạn thắng, nhưng chỉ vừa đủ, và vết thương ở tay làm bạn mất ngủ.'],
      en: ['{Foe} takes the first stroke and answers. You stay on your feet, but the record calls it a narrow draw.', '{Foe} is quicker than expected. You win, but only just, and the wound in your arm costs you sleep.']
    }
  },
  hunt: {
    fight: true,
    steady: { vi: ['Dựng tuyến chặn rồi mới đánh', 'Dồn nó vào chỗ hẹp trước khi ra tay'], en: ['Set a line first, then strike', 'Drive it into a narrow place before you move'] },
    steadyOk: {
      vi: ['Bạn giữ {foe} trong một khoảng hẹp đủ lâu để người ngoài sơ tán. Báo cáo ghi tên bạn ở dòng đầu.', 'Đội phía sau không bị chạm tới. Bạn kết thúc việc muộn nhưng gọn, và Hana ghi lại tuyến chặn của bạn.'],
      en: ['You hold {foe} in a narrow space long enough for outsiders to leave. The report lists your name on its first line.', 'The team behind you is never touched. You finish late but clean, and Hana records your line.']
    },
    bold: { vi: ['Vào thẳng và hạ nó giữa chỗ trống', 'Đón nó ở chính giữa, không lùi bước nào'], en: ['Walk straight in and put it down in the open', 'Meet it at the center without giving a step'] },
    boldOk: {
      vi: ['Bạn hạ {foe} trước khi trời tối. Người dân đứng sau cửa nhìn bạn đi qua mà không ai dám lên tiếng.', 'Một nhát và hết. Người của {place} ngồi xuống bậc cửa như vừa thoát khỏi một cơn mê.'],
      en: ['You put {foe} down before dark. Residents behind their doors watch you pass and none dares to speak.', 'One stroke and it is over. The people of {place} sit down on their doorsteps as if waking from a fever.']
    },
    boldFail: {
      vi: ['{Foe} học nhịp của bạn nhanh hơn dự tính. Bạn rút ra được, nhưng việc bị ghi là chưa hoàn tất.', 'Nhát đầu lệch một chút và nó không bỏ lỡ cơ hội. Bạn kết thúc việc, nhưng không còn gọn.'],
      en: ['{Foe} learns your rhythm faster than planned. You withdraw, but the job is filed as unfinished.', 'The first stroke lands a little off and it does not waste the chance. You finish the job, but not cleanly.']
    }
  },
  guard: {
    fight: true,
    steady: { vi: ['Đi vòng theo đường chắc và giữ người ở giữa', 'Giữ khoảng cách và để người của bạn đi trước'], en: ['Take the safer route and keep them in the middle', 'Keep your distance and let your own people lead'] },
    steadyOk: {
      vi: ['Cả nhóm đi qua {place} mà không mất ai. Người bạn bảo vệ ghi tên bạn vào lời xác nhận.', 'Bạn đến nơi muộn nhưng đủ người. {Foe} không có cơ hội ra tay.'],
      en: ['The group crosses {place} without losing anyone. The one you protect enters your name into the statement.', 'You arrive late but with everyone. {Foe} gets no chance to move.']
    },
    bold: { vi: ['Đi thẳng qua chỗ có người chặn và phá nó', 'Chặn đường truy đuổi và giữ nó đứng yên'], en: ['Go straight through the blockers and break them', 'Block the pursuit and hold it still'] },
    boldOk: {
      vi: ['Bạn phá chốt trong vài phút. {Foe} lùi lại, và người bạn bảo vệ nhìn bạn lâu hơn lệ thường.', 'Bạn đứng ở cuối ngõ đến khi {foe} hiểu ra. Cả nhóm đi qua phía sau lưng bạn.'],
      en: ['You break the post in a few minutes. {Foe} falls back, and the one you protect looks at you longer than custom.', 'You stand at the end of the alley until {foe} understands. The whole group passes behind you.']
    },
    boldFail: {
      vi: ['Chốt có thêm người. Bạn đưa được nhóm ra nhưng phải bỏ lại một phần hàng và để lại máu.', '{Foe} đã đoán trước. Bạn bảo vệ được người nhưng không giữ được đường.'],
      en: ['The post has more people than reported. You get the group out but leave part of the cargo and some blood.', '{Foe} had guessed it. You protect the people but cannot keep the road.']
    }
  },
  raid: {
    fight: true,
    steady: { vi: ['Quan sát một đêm rồi mới vào theo đường phụ', 'Cắt nguồn cung trước, đợi họ yếu đi'], en: ['Watch for a night, then enter by a side route', 'Cut their supply first and wait for them to weaken'] },
    steadyOk: {
      vi: ['Bạn vào khi {foe} đã mỏi. Chỗ ấy đổi chủ mà không có tiếng súng thứ hai.', 'Việc kéo dài hơn dự kiến nhưng gọn. {Place} yên trở lại vào cuối tuần.'],
      en: ['You enter once {foe} is tired. The place changes hands without a second shot.', 'It takes longer than planned but stays clean. {Place} is quiet again by week’s end.']
    },
    bold: { vi: ['Phá cổng chính và đánh thẳng vào giữa', 'Một mình đi qua tuyến ngoài rồi đánh vào đầu não'], en: ['Break the main gate and strike the middle', 'Go alone through the outer line and hit the head'] },
    boldOk: {
      vi: ['Bạn đi qua tuyến ngoài như thể nó không tồn tại. {Foe} buông vũ khí trước khi nghe lệnh thứ hai.', 'Chỗ ấy sụp trong một đêm. Người của {place} gọi tên bạn như tên một cơn bão.'],
      en: ['You pass the outer line as if it did not exist. {Foe} drops their weapons before the second order.', 'The place falls in a single night. The people of {place} say your name like the name of a storm.']
    },
    boldFail: {
      vi: ['Bên trong có thêm người mà báo cáo không ghi. Bạn thoát được, nhưng chỗ ấy vẫn chưa đổi chủ.', 'Cái bẫy ở cửa sau đã được chuẩn bị. Bạn đi ra bằng mái nhà và mang vết thương đi cùng.'],
      en: ['There are more people inside than the report said. You get out, but the place has not changed hands.', 'The trap at the back door was prepared in advance. You leave over the roof and carry a wound with you.']
    }
  },
  judge: {
    fight: false,
    steady: { vi: ['Nghe từng bên và phán theo thông lệ', 'Ghi lại cả hai lời kể rồi mới quyết'], en: ['Hear each side and rule by custom', 'Write down both accounts before deciding'] },
    steadyOk: {
      vi: ['Hai bên cúi đầu trước phán quyết của bạn, người này nhanh hơn người kia. {Foe} ký trước.', 'Bạn nói ngắn và rõ. Phán quyết được ghi vào sổ, và không ai xin xem lại.'],
      en: ['Both sides bow to your ruling, one faster than the other. {Foe} signs first.', 'You speak briefly and clearly. The ruling is entered in the book and no one asks for a review.']
    },
    bold: { vi: ['Đặt vũ khí lên bàn và nêu rõ giá của việc từ chối', 'Đứng dậy nói thẳng trước cả phòng'], en: ['Lay your weapon on the table and name the price of refusal', 'Rise and speak plainly before the whole room'] },
    boldOk: {
      vi: ['Cả {place} im lặng. Rồi hai bên cùng đứng lên, và không ai dám nhìn vào vũ khí của bạn.', 'Bạn nói xong và {foe} là người đầu tiên đồng ý. Tiếng đồng ý lan sang phần còn lại của phòng.'],
      en: ['All of {place} falls silent. Then both sides rise, and no one dares to look at your weapon.', 'You finish speaking and {foe} is the first to agree. The agreement spreads through the rest of the room.']
    },
    boldFail: {
      vi: ['Một bên coi lời bạn là lời đe dọa. Bạn rời bàn trước khi có ai rút vũ khí, và danh tiếng của bạn mất một chút.', '{Foe} không chấp nhận phán quyết. Việc phải đưa lên cấp khác, và tên bạn không còn nằm ở dòng đầu.'],
      en: ['One side takes your words as a threat. You leave the table before anyone draws, and your name loses a little ground.', '{Foe} does not accept the ruling. The matter goes up a level, and your name no longer sits on the first line.']
    }
  },
  show: {
    fight: false,
    steady: { vi: ['Nhận lời mời và làm đúng phần được giao', 'Tới dự, đứng đúng chỗ và nói ít'], en: ['Accept the invitation and do what is asked', 'Attend, stand where placed and say little'] },
    steadyOk: {
      vi: ['{Place} ghi nhận sự có mặt của bạn. Nhiều người nhìn bạn lâu hơn nhìn những người đứng cạnh.', 'Bạn đứng suốt buổi mà không làm gì khác thường, và chính điều đó khiến người ta nhớ.'],
      en: ['{Place} records your presence. Many look at you longer than at those beside you.', 'You stand through the whole event without doing anything unusual, and that is what people remember.']
    },
    bold: { vi: ['Tự bước ra giữa và cho thấy một nhát chém đúng nghĩa', 'Nhận lấy phần khó nhất và làm trước đám đông'], en: ['Step to the center and show what a true cut looks like', 'Take the hardest part and do it before the crowd'] },
    boldOk: {
      vi: ['Người xem chỉ nhớ một đường kiếm cuối, và nhắc tới nó tới cuối năm. {Foe} đứng dậy trước tiên để vỗ tay.', 'Bạn làm việc đó trong im lặng. Tiếng vỗ tay đến muộn, nhưng không dứt.'],
      en: ['Onlookers remember only the last line of the blade and speak of it through the year. {Foe} is first to rise and applaud.', 'You do it in silence. The applause comes late, but it does not stop.']
    },
    boldFail: {
      vi: ['Một chi tiết nhỏ đi sai trước hàng trăm người. Bạn sửa kịp, nhưng cả {place} đã thấy.', '{Foe} làm hỏng một phần của buổi, và bạn phải gánh phần lỗi trước khán giả.'],
      en: ['A small detail goes wrong before a hundred people. You correct it in time, but all of {place} saw.', '{Foe} spoils part of the event and you have to carry the fault before the audience.']
    }
  }
};

// What else is true that day. `fx` is added to the safe outcome and the good bold outcome; `risk` to the bad one.
const COMPLICATIONS = [
  { key: 'press', vi: 'Một nhóm người chép sử đã đến trước bạn và ghi từng bước đi.', en: 'A group of chroniclers arrived before you and are noting every step.', fx: { rep: 2 }, risk: { rep: -1 } },
  { key: 'dusk', vi: 'Hạn chót là lúc chuông tối, và không ai còn nhớ ai đặt ra nó.', en: 'The deadline is the evening bell, and no one recalls who set it.', fx: { merit: 2 }, risk: { health: -3 } },
  { key: 'rain', vi: 'Mưa đã xuống từ sáng, và mặt đất ở đó trơn hơn bạn nhớ.', en: 'It has rained since morning, and the ground there is slicker than you remember.', fx: {}, risk: { health: -4 } },
  { key: 'rival', vi: 'Một người từng ngang tầm bạn đứng ở cuối hàng, chờ xem bạn còn giữ được tên hay không.', en: 'Someone who once matched your standing stands at the back of the line, waiting to see whether you still hold your name.', fx: { merit: 2, network: 1 }, risk: { rep: -2 } },
  { key: 'protege', vi: 'Một người trẻ bạn từng chỉ dạy đi cùng, và bắt chước cách bạn đứng.', en: 'A young person you once taught comes along, copying the way you stand.', fx: { network: 2, sanity: 1 }, risk: { sanity: -3 } },
  { key: 'fee', vi: 'Bên đặt việc trả gấp đôi và yêu cầu bạn không nhắc đến việc đó sau này.', en: 'The client pays double and asks that you never mention the matter afterward.', fx: { wealth: 7 }, risk: { wealth: -3 } },
  { key: 'tail', vi: 'Một người trong đội của bạn nói họ bị ai đó theo từ đêm qua, và không ai tìm ra người đó.', en: 'Someone in your crew says they were followed since last night, and no one can find who it was.', fx: { merit: 1, network: 1 }, risk: { heat: 3, sanity: -2 } },
  { key: 'old_wound', vi: 'Vết thương cũ ở vai lại nhức từ sáng, đúng vào ngày hẹn.', en: 'The old wound in your shoulder has ached since morning, on the very day appointed.', fx: { sanity: 1 }, risk: { health: -5 } },
  { key: 'junior', vi: 'Người đi cùng bạn là một người trẻ chưa từng thấy bạn ra tay, và đang cố giữ vẻ bình thản.', en: 'The one who goes with you is young, has never seen you act, and is trying to look calm.', fx: { rep: 1, network: 1 }, risk: { sanity: -2 } }
];

const PASS = {
  vi: ['Bạn để việc cho người khác. Chỗ của bạn trong danh sách vẫn còn, và không ai nhắc lại.', 'Một cái tên thấp hơn nhận việc. Năm đó hồ sơ của bạn có thêm một trang trắng.'],
  en: ['You leave the job to someone else. Your place on the list remains, and no one mentions it again.', 'A lower name takes the work. That year your file gains a blank page.']
};

const FX = {
  fight: { steady: { merit: 5, rep: 3, health: -5 }, ok: { merit: 11, rep: 6, health: -9 }, fail: { health: -16, sanity: -4, rep: -1 } },
  talk: { steady: { merit: 5, rep: 4, network: 3 }, ok: { merit: 10, rep: 7, network: 4 }, fail: { rep: -3, network: -3, sanity: -4 } }
};

const add = (a, b) => {
  const out = { ...a };
  for (const [k, v] of Object.entries(b || {})) out[k] = (out[k] || 0) + v;
  return out;
};

function build(branch, need, extra, hook, ci) {
  const [key, kindId, placeVi, placeEn, foeVi, foeEn, sceneVi, sceneEn] = hook;
  const kind = KINDS[kindId];
  const comp = COMPLICATIONS[ci];
  const pick = (list, i) => list[i % list.length];
  const sets = FX[kind.fight ? 'fight' : 'talk'];
  const vi = { place: placeVi, foe: foeVi };
  const en = { place: placeEn, foe: foeEn };
  const f = (strs, i, lang) => fill(pick(strs[lang], i), lang === 'vi' ? vi : en);
  const variant = ci + key.length;

  return {
    id: `m_apex_${branch}_${key}_${comp.key}`, age: [20, 140], need, ...extra,
    careerOpportunity: true,
    allowDistorted: Boolean(need.finger),
    tags: ['career', 'merit', 'apex'],
    vi: `${sceneVi} ${comp.vi}`,
    en: `${sceneEn} ${comp.en}`,
    choices: [
      {
        vi: pick(kind.steady.vi, variant), en: pick(kind.steady.en, variant),
        rvi: f(kind.steadyOk, variant, 'vi'), ren: f(kind.steadyOk, variant, 'en'),
        fx: add(sets.steady, comp.fx)
      },
      {
        vi: pick(kind.bold.vi, variant), en: pick(kind.bold.en, variant), rvi: '', ren: '', fx: {},
        out: [
          { w: kind.fight ? 58 : 60, rvi: f(kind.boldOk, variant, 'vi'), ren: f(kind.boldOk, variant, 'en'), fx: add(sets.ok, comp.fx) },
          { w: kind.fight ? 42 : 40, rvi: f(kind.boldFail, variant, 'vi'), ren: f(kind.boldFail, variant, 'en'), fx: add(sets.fail, comp.risk) }
        ]
      }
    ],
    ignore: { vi: 'Bỏ qua', en: 'Pass', rvi: pick(PASS.vi, variant), ren: pick(PASS.en, variant), fx: { rep: -1 } }
  };
}

// [key, kind, place vi, place en, foe vi, foe en, scene vi, scene en]
const COLOR_HOOKS = [
  ['tower', 'raid', 'tòa tháp cũ', 'the old tower', 'đội gác cũ của Syndicate', 'the old Syndicate garrison',
    '[Tòa tháp có cờ riêng] Một tòa tháp ở ngoại ô đã bị một nhóm treo cờ riêng từ đầu mùa. Hana không muốn gửi quân, và người ta nói nhóm đó chỉ mở cửa cho người có tên đủ nặng.',
    '[A tower with its own flag] A tower on the outskirts has flown a private flag since the season began. Hana does not want to send troops, and it is said the group will open only for someone whose name carries weight.'],
  ['rail', 'guard', 'tuyến đường ray cũ', 'the old rail line', 'băng chặn đường', 'the blockers',
    '[Người kiểm toán đi qua đường ray] Một người kiểm toán của Hana phải đi qua một đoạn đường ray bị một băng nhóm chiếm giữ. Họ chỉ chịu đi nếu có một Color đứng cạnh.',
    '[An auditor on the rail line] A Hana auditor must cross a stretch of rail held by a gang. They will go only with a Color at their side.'],
  ['lab_leak', 'hunt', 'dãy ngõ sau phòng thí nghiệm', 'the alley behind the lab', 'thứ thoát khỏi phòng thí nghiệm', 'the thing that left the lab',
    '[Thứ thoát ra từ một phòng thí nghiệm nhỏ] Một phòng thí nghiệm không giấy phép ở ngõ sau mất kiểm soát thứ nó nuôi. Đội Grade 2 đến trước đã không trở lại đủ người.',
    '[Something out of a small laboratory] An unlicensed laboratory in the back alleys has lost control of what it kept. The Grade 2 team that went first did not return at full strength.'],
  ['rank_bout', 'duel', 'sân Hana', 'the Hana yard', 'Fixer ở Section khác', 'the Fixer from the other Section',
    '[Trận tập giữa hai Section] Một Fixer Grade 1 ở Section khác xin một trận có người chứng kiến để hai nơi đo nhau. Họ nói họ không cần thắng, họ cần biết nhát chém của mình nằm ở đâu.',
    '[A bout between two Sections] A Grade 1 Fixer from another Section asks for a witnessed bout so the two houses can measure each other. They say they do not need to win, only to know where their cut stands.'],
  ['honors', 'show', 'hội trường Hana', 'the Hana hall', 'người dẫn chương trình', 'the presenter',
    '[Lễ ghi công cuối năm] Hana tổ chức lễ ghi công cuối năm và yêu cầu một Color bước dọc hàng người được trao thưởng. Người ta nói vị trí này chỉ để cho thấy ai vẫn là người đứng đầu.',
    '[The year-end honors] Hana holds its year-end honors and asks a Color to walk the line of those receiving awards. It is said the place exists to show who is still on top.'],
  ['two_offices', 'judge', 'văn phòng Hana', 'the Hana office', 'Office đến sau', 'the later Office',
    '[Hai Office một Request] Hai Office nhỏ cùng nhận là đã hoàn thành một Request cấp cao, và cả hai giữ bằng chứng tốt như nhau. Họ muốn một Color đọc cả hai hồ sơ và nói ai đúng.',
    '[Two Offices, one Request] Two small Offices both claim a high-grade Request as completed, and both hold equally good proof. They want a Color to read both files and say who is right.'],
  ['sewer_nest', 'raid', 'cống ngầm dưới Backstreets', 'the sewers under the Backstreets', 'đám tín đồ dưới cống', 'the cultists below',
    '[Tổ dưới cống] Một nhóm tín đồ của một thứ vô danh dựng tổ dưới cống ngầm và đã bắt đầu kéo người sống vào. Hana đã mất liên lạc với hai đội thăm dò.',
    '[A nest in the sewers] A group of worshippers of something nameless has built a nest in the sewers and has begun to draw living people into it. Hana has lost contact with two scouting teams.'],
  ['refuge', 'guard', 'nhà trú ẩn ở phố thợ', 'the refuge in the workers’ street', 'người đòi bảo kê', 'the protection collectors',
    '[Nhà trú ẩn bị đòi tiền] Một nhà trú ẩn cho người già và trẻ mồ côi bị một Syndicate đòi tiền bảo kê. Chủ nhà không xin giúp, chỉ treo một mảnh giấy ngoài cửa với tên bạn.',
    '[A refuge asked for money] A refuge for the old and for orphans is being pressed by a Syndicate for protection fees. The keeper does not ask for help, only pins a slip with your name outside the door.'],
  ['hall_lesson', 'show', 'phòng tập Hana', 'the Hana training hall', 'lớp Fixer trẻ', 'the young Fixers',
    '[Một buổi dạy ở phòng tập] Hana mời một Color dạy một buổi cho lớp Fixer sắp lên Grade 5. Không ai hứa họ sẽ nhớ bài học, nhưng ai cũng nhớ người đứng trước lớp.',
    '[A lesson in the hall] Hana invites a Color to teach one session to the class about to reach Grade 5. No one promises they will remember the lesson, but everyone remembers who stood before the class.'],
  ['disciple', 'duel', 'sân sau của một quán trọ', 'the back yard of an inn', 'đệ tử của người cũ', 'the old rival’s disciple',
    '[Đệ tử của một người đã mất] Học trò của một kiếm khách từng đấu với bạn nhiều năm trước tìm đến sân sau một quán trọ. Họ không mang thù, chỉ muốn thử xem thầy mình thua điều gì.',
    '[The disciple of one who died] The student of a swordsman who once fought you years ago finds you in the back yard of an inn. They carry no grudge, only a wish to test what their teacher lost to.']
];

const FINGER_HOOKS = {
  Thumb: [
    ['night_market', 'raid', 'chợ đêm', 'the night market', 'đám người của phe khác', 'the other house’s people',
      '[Chợ đêm bị chiếm] Một nhóm ngoài Thumb đã dựng quầy trong địa bàn của bạn và thu tiền từ người bán. Họ biết rõ đây là đất của ai, và vẫn làm.',
      '[The night market taken] A group outside the Thumb has set up stalls in your territory and taken fees from the sellers. They know whose ground this is and do it anyway.'],
    ['convoy', 'guard', 'đường chuyển hàng', 'the supply road', 'toán phục kích', 'the ambush team',
      '[Đoàn xe chuyển đạn] Một đoàn xe chuyển đạn của Thumb phải đi qua một đoạn đường đang có tin phục kích. Người cầm đầu đoàn nói họ chỉ đi nếu bạn đi cùng.',
      '[An ammunition convoy] A Thumb convoy carrying ammunition must pass a stretch where an ambush is rumoured. The convoy leader says they will go only if you ride with them.'],
    ['sottocapo_bout', 'duel', 'sân thượng', 'the rooftop', 'Underboss của phe lân cận', 'the neighbouring Underboss',
      '[Đấu danh dự trên sân thượng] Underboss của một District lân cận gửi lời mời đấu danh dự trên sân thượng, hai người, không vũ khí lạ. Ông muốn các Capo hai bên biết ai là người mạnh hơn.',
      '[A duel of honour on the roof] The Underboss of a neighbouring District sends an invitation to a duel of honour on a rooftop, two of you, no unusual weapons. They want the Capos of both houses to know who is stronger.'],
    ['oath_rite', 'show', 'sảnh tuyên thệ', 'the oath hall', 'các Soldato mới', 'the new Soldati',
      '[Lễ tuyên thệ của Soldato mới] Một nhóm Soldato mới sắp tuyên thệ, và họ muốn người đứng đầu đọc lời thề cùng họ. Đây là việc ít người làm, và những ai làm đều được nhớ.',
      '[The oath of the new Soldati] A group of new Soldati are about to swear, and they want the head of the Thumb to say the oath beside them. Few do this, and those who do are remembered.'],
    ['rival_ledger', 'judge', 'phòng sổ sách', 'the ledger room', 'hai Capo tranh sổ', 'the two Capos disputing the ledger',
      '[Hai Capo tranh một cuốn sổ] Hai Capo cùng giữ một cuốn sổ ghi nợ và mỗi người cho rằng nó thuộc về mình. Cả hai đều trung thành, và cả hai đều không chịu lùi.',
      '[Two Capos, one ledger] Two Capos both hold a debt ledger and each claims it is theirs. Both are loyal, and neither will give ground.'],
    ['armory', 'hunt', 'kho vũ khí cũ', 'the old armory', 'kẻ trộm đã lấy đạn', 'the thief who took the ammunition',
      '[Kẻ lấy đạn trong kho cũ] Một kẻ đã lấy đạn từ kho cũ của Thumb và để lại đúng một dấu: một mảnh giấy ghi tên bạn. Người đó muốn bạn tìm ra.',
      '[The one who took ammunition from the old armory] Someone has taken ammunition from the Thumb’s old armory and left exactly one mark: a slip with your name on it. They want you to find them.']
  ],
  Index: [
    ['courier_lost', 'guard', 'tuyến Prescript', 'the Prescript route', 'toán chặn Prescript', 'the interceptors',
      '[Người đưa tin bị chặn] Người đưa Prescript quan trọng nhất trong năm bị chặn trên đường. Cả tuyến đang chờ, và không ai muốn nói rằng việc này đã bị biết trước.',
      '[A courier stopped] The courier carrying the year’s most important Prescript has been stopped on the road. The whole route is waiting, and no one wants to say the matter was known in advance.'],
    ['proxy_dispute', 'judge', 'phòng đọc', 'the reading room', 'hai Proxy', 'the two Proxies',
      '[Hai Proxy, hai cách đọc] Hai Proxy đọc cùng một Prescript theo hai cách và mỗi bên đều có bằng chứng. Việc chọn cách đọc nào quyết định ai là người được nghe trong năm tới.',
      '[Two Proxies, two readings] Two Proxies read the same Prescript in two ways and each has proof. Choosing a reading decides who is heard in the coming year.'],
    ['weaver_test', 'duel', 'sảnh thử', 'the testing hall', 'người của một Weaver khác', 'the other Weaver’s person',
      '[Thử sức giữa hai dòng Weaver] Hai dòng Index muốn so tay trước khi quyết định bên nào đi đầu trong một Prescript lớn. Họ chọn bạn là người đại diện, và họ chọn người của họ đối diện.',
      '[A test between two Weaver lines] Two lines of the Index want to compare skill before deciding which leads a large Prescript. They choose you as their representative and place their own opposite.'],
    ['proselyte_rite', 'show', 'sảnh đọc lệnh', 'the hall of readings', 'các Proselyte mới', 'the new Proselytes',
      '[Buổi đọc lệnh đầu tiên] Một nhóm Proselyte mới nghe lần đầu cách một Prescript được đọc. Họ muốn người đứng đầu đọc, vì họ tin cách đọc quyết định cả đời họ.',
      '[A first reading] A group of new Proselytes hear for the first time how a Prescript is read. They want the head of the Index to read it, believing the manner of reading decides their whole lives.'],
    ['unmarked_door', 'raid', 'ngôi nhà không số', 'the house with no number', 'đám người giữ cửa', 'the door keepers',
      '[Ngôi nhà không số] Prescript chỉ ghi: đi vào căn nhà không có số ở cuối một con phố và lấy thứ nằm trên bàn. Những người giữ cửa không biết họ giữ gì.',
      '[The house with no number] The Prescript says only: go into the house with no number at the end of a street and take what lies on the table. The ones keeping the door do not know what they keep.'],
    ['stray_ink', 'hunt', 'dãy kho cũ', 'the old warehouses', 'bóng của một Prescript hỏng', 'the shadow of a spoiled Prescript',
      '[Prescript hỏng ở dãy kho cũ] Một Prescript bị đọc sai ba lần đã để lại thứ gì đó trong dãy kho cũ. Các Proxy trẻ không dám vào, và Weaver không gửi lời nào.',
      '[A spoiled Prescript in the old warehouses] A Prescript misread three times has left something in the old warehouses. The young Proxies will not enter, and the Weaver has sent no word.']
  ],
  Middle: [
    ['book_name', 'judge', 'phòng Book of Vengeance', 'the Book of Vengeance room', 'con của người bị ghi', 'the listed one’s child',
      '[Cái tên xin gạch] Một người xin gạch tên cha mẹ mình khỏi Book of Vengeance sau hai mươi năm. Gạch hay giữ là việc chỉ người đứng đầu mới được quyết.',
      '[A name asked to be struck] Someone asks that their parent’s name be struck from the Book of Vengeance after twenty years. Whether to strike or keep it is for the head of the Middle alone.'],
    ['gathering', 'show', 'buổi họp Great Sibling', 'the Great Siblings’ gathering', 'các Great Sibling của vùng khác', 'the Great Siblings of other regions',
      '[Buổi họp các Great Sibling] Great Sibling từ nhiều District tụ họp để thống nhất quy ước, và họ mời người đứng đầu nói mở đầu. Mọi người biết lời mở đầu sẽ chi phối cả buổi.',
      '[A gathering of the Great Siblings] Great Siblings from many Districts meet to settle their conventions, and they invite the head of the Middle to open. Everyone knows the opening will shape the whole day.'],
    ['debtor_house', 'raid', 'nhà của con nợ', 'the debtor’s house', 'người bảo vệ con nợ', 'the debtor’s protectors',
      '[Con nợ ẩn sau người bảo vệ] Một con nợ lớn của Middle đã thuê người bảo vệ và ở trong một căn nhà có nhiều cửa. Tên của họ đã nằm ở dòng đầu trang sổ suốt mười năm.',
      '[A debtor behind hired guards] A large debtor of the Middle has hired protectors and sits in a house with many doors. Their name has been on the first line of a page for ten years.'],
    ['sibling_bout', 'duel', 'sân nhà Middle', 'the Middle house yard', 'Great Elder trẻ', 'the young Great Elder',
      '[Một Great Elder trẻ muốn thử] Một Great Elder trẻ tuổi xin một trận đấu với người đứng đầu để cả gia đình thấy họ xứng với vị trí. Lời xin lịch sự, và nó có người nghe lén.',
      '[A young Great Elder wants a trial] A young Great Elder asks for a bout with the head of the Middle so the whole family sees they deserve the seat. The request is polite, and someone is listening in.'],
    ['rescued_sibling', 'guard', 'khu phố bị bao vây', 'the besieged street', 'những kẻ vây nhà', 'those surrounding the house',
      '[Người nhà bị bao vây] Một Big Sibling bị một Syndicate khác vây trong nhà cùng gia đình. Họ gọi cho cả nhà, và chỉ có bạn đủ gần để đến trước đêm.',
      '[A sibling surrounded] A Big Sibling is surrounded in their house with their family by another Syndicate. They call the whole family, and only you are near enough to arrive before night.'],
    ['old_grudge', 'hunt', 'quán ăn cũ', 'the old diner', 'kẻ trốn sổ', 'the one who escaped the book',
      '[Kẻ trốn khỏi sổ] Một người từng nằm trong Book of Vengeance đã biến mất mười lăm năm và vừa xuất hiện ở một quán ăn cũ. Chủ quán nhận ra người đó và gọi cho bạn.',
      '[One who escaped the book] Someone who once lay in the Book of Vengeance vanished fifteen years ago and has just appeared in an old diner. The owner recognized them and called you.']
  ],
  Ring: [
    ['last_piece', 'show', 'phòng trưng bày', 'the gallery', 'khách đến xem', 'the visitors',
      '[Tác phẩm cuối của một Maestro] Một Maestro vừa mất để lại một tác phẩm dang dở. Phòng trưng bày muốn Grand Curator hoàn thiện nó trước công chúng và nói vì sao.',
      '[A Maestro’s last piece] A Maestro who has just died leaves a work unfinished. The gallery wants the Grand Curator to complete it before the public and say why.'],
    ['forger', 'hunt', 'xưởng giả', 'the forger’s workshop', 'tay làm giả', 'the forger',
      '[Tay làm giả ngang tầm] Một bản sao tốt đến mức bạn mất một đêm mới phân biệt được đang được bán ở chợ ngầm. Người làm nó cùng tầm kỹ năng và đang chờ bạn tìm thấy.',
      '[A forger of equal skill] A copy so good it takes you a night to tell apart is being sold in the underground market. Whoever made it matches your skill and is waiting for you to find them.'],
    ['material_run', 'raid', 'bãi phế liệu cổ', 'the ancient scrapyard', 'toán giữ bãi', 'the yard guards',
      '[Bãi phế liệu của kiệt tác] Một bãi phế liệu chứa mảnh kim loại duy nhất cho một tác phẩm đã được chọn. Chủ bãi thuê người canh và không bán cho ai ngoài một người.',
      '[A scrapyard of masterpieces] A scrapyard holds the single metal fragment needed for a chosen work. The owner has hired guards and will sell to no one but one person.'],
    ['docent_bout', 'duel', 'phòng trưng bày phụ', 'the side gallery', 'Maestro của Ring khác', 'the other Ring’s Maestro',
      '[Thử tay nghề giữa hai Ring] Hai Maestro muốn thấy ai tạo ra nhát chém sạch hơn. Họ gọi đây là một buổi trình diễn, nhưng cả hai đều biết đó là một cuộc đấu.',
      '[A test of craft between two Rings] Two Maestros wish to see whose cut is cleaner. They call it a demonstration, but both know it is a duel.'],
    ['curatorial_dispute', 'judge', 'phòng hội đồng', 'the council room', 'hai Docent', 'the two Docents',
      '[Hai Docent, một tác phẩm] Hai Docent tranh nhau quyền ghi tên cạnh một tác phẩm nổi tiếng. Một người đã làm phần lớn, người kia làm phần quan trọng nhất.',
      '[Two Docents, one piece] Two Docents contest the right to be named beside a famous work. One did most of it, the other did the most important part.'],
    ['collection_guard', 'guard', 'tuyến vận chuyển tác phẩm', 'the transport route of the works', 'nhóm trộm tác phẩm', 'the thieves of the works',
      '[Bộ sưu tập đi qua phố] Một bộ sưu tập quý phải đi qua nửa The City để đến nơi trưng bày. Có tin một nhóm trộm đã biết lộ trình.',
      '[A collection crosses the streets] A valuable collection must cross half the City to reach its place of display. There is word that a group of thieves already knows the route.']
  ],
  Pinky: [
    ['broken_blade', 'duel', 'bãi đất ngoài thành', 'the field beyond the district', 'kiếm khách vô danh', 'the nameless swordsman',
      '[Thanh kiếm gãy làm lời thách] Một kiếm khách không thuộc Finger nào gửi một thanh kiếm gãy làm lời thách. Họ không đòi tiền thưởng, chỉ muốn một trận với người được gọi là Sovereign.',
      '[A broken blade as challenge] A swordsman belonging to no Finger sends a broken blade as challenge. They ask for no prize, only one bout with the one called Sovereign.'],
    ['oath_debt', 'judge', 'sảnh lời thề', 'the hall of oaths', 'người thừa kế lời thề', 'the heir of the oath',
      '[Lời thề không ai trả] Một Star of the Sky mất đi để lại một lời thề chưa trả cho một đứa trẻ. Hội đồng muốn Sovereign quyết ai trả thay, và trả bằng gì.',
      '[An unpaid oath] A Star of the Sky dies leaving an oath unpaid to a child. The council wants the Sovereign to decide who pays in their place, and with what.'],
    ['sword_show', 'show', 'sân kiếm', 'the sword yard', 'các Initiate', 'the Initiates',
      '[Lễ chọn kiếm cho Initiate] Các Initiate mới đến chọn kiếm đầu tiên, và họ muốn Sovereign đứng ở cuối hàng để thấy từng người cầm lên. Không ai hứa nói với họ điều gì.',
      '[The first sword of the Initiates] New Initiates come to choose their first blades, and they want the Sovereign at the end of the line to watch each take one up. No one promises to say anything to them.'],
    ['blade_hunt', 'hunt', 'rừng bia mộ', 'the forest of gravestones', 'thanh kiếm sống dậy', 'the blade that woke',
      '[Thanh kiếm sống dậy] Một thanh kiếm lâu đời của Pinky bắt đầu tự cử động trong phòng cất giữ. Nhiều Sworn Blade đã thử giữ nó và không giữ được.',
      '[A blade that woke] An old blade of the Pinky begins to move on its own in its storage room. Many Sworn Blades have tried to hold it and could not.'],
    ['rooftop_chase', 'raid', 'mái nhà liền kề', 'the adjoining rooftops', 'kẻ thất hứa và đồng bọn', 'the oathbreaker and followers',
      '[Kẻ thất hứa đã có đồng bọn] Một kẻ thất hứa đã bỏ trốn lâu năm và gom được một nhóm đi theo. Họ trú trên một dãy mái nhà liền nhau và không nghĩ ai dám đến.',
      '[An oathbreaker with followers] An oathbreaker who ran long ago has gathered a band to follow them. They shelter on a row of joined rooftops and think no one would dare come.'],
    ['sworn_guard', 'guard', 'đường qua nghĩa địa', 'the road through the cemetery', 'nhóm đòi lời thề', 'those demanding the oath',
      '[Đưa một Sworn Blade đi trả thề] Một Sworn Blade trẻ phải đi trả một lời thề ở nơi có người đang chờ để chặn. Họ không xin giúp, nhưng cả Pinky đều muốn bạn đi theo.',
      '[Seeing a Sworn Blade to the oath] A young Sworn Blade must go to pay an oath at a place where people wait to stop them. They do not ask for help, but the whole Pinky wishes you to go along.']
  ]
};

export const APEX_COLOR_GENERATED = COLOR_HOOKS.flatMap((hook) =>
  COMPLICATIONS.map((_, ci) => build('color', { jobs: ['Fixer'] }, { requires: ['ColorFixer'] }, hook, ci)));

export const APEX_FINGER_GENERATED = Object.entries(FINGER_HOOKS).flatMap(([name, hooks]) =>
  hooks.flatMap((hook) => COMPLICATIONS.map((_, ci) =>
    build(name.toLowerCase(), { jobs: ['Syndicate'], finger: name, fingerRankAtLeast: 3 }, {}, hook, ci))));
