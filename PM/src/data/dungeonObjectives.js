// What a Request sends you into a dungeon to do. One is set when the run starts (dungeonObjectiveFor) and shown
// on the dungeon card; reaching the last stage opens its event, a choice between the Request and something else
// you want. Each side leaves a trace that outlasts the year: a person met, a scar, an item, Heat or Merit.
// The Claw and the Ensemble have no objective: they are judgments, not jobs.

export const DUNGEON_OBJECTIVES = [
  {
    id: 'rescue',
    nameVi: 'Đưa người bị thương ra ngoài',
    nameEn: 'Bring the wounded out',
    briefVi: 'Người xuống trước bạn không lên được. Request trả tiền cho việc đưa họ về.',
    briefEn: 'Someone went down before you and did not come back up. The Request pays for bringing them home.',
    eventId: 'dg_obj_rescue'
  },
  {
    id: 'evidence',
    nameVi: 'Lấy bằng chứng',
    nameEn: 'Bring back proof',
    briefVi: 'Request cần bằng chứng về kẻ đã thuê người dọn chỗ này.',
    briefEn: 'The Request wants proof of who paid to have this place cleared.',
    eventId: 'dg_obj_evidence'
  },
  {
    id: 'retrieve',
    nameVi: 'Thu hồi món hàng',
    nameEn: 'Recover the cargo',
    briefVi: 'Request cần chiếc hộp niêm phong nằm ở chặng cuối, còn nguyên dấu.',
    briefEn: 'The Request wants the sealed case at the last stage, seal unbroken.',
    eventId: 'dg_obj_retrieve'
  },
  {
    id: 'rearguard',
    nameVi: 'Giữ đường rút',
    nameEn: 'Hold the way out',
    briefVi: 'Request trả thêm nếu cả đoàn ra được. Đường rút cần người đứng lại giữ.',
    briefEn: 'The Request pays extra if the whole party gets out. The way out needs someone to stay and hold it.',
    eventId: 'dg_obj_rearguard'
  }
];

export const DUNGEON_OBJECTIVE_EVENTS = [
  {
    id: 'dg_obj_rescue',
    age: [14, 120],
    major: true,
    weight: 0,
    causalOnly: true,
    vi: '[Người còn thở] Ở chặng cuối, người bạn được thuê đưa ra đang ngồi tựa tường, chân gãy, mắt còn mở. Túi đồ bạn nhặt dọc đường nặng gần bằng họ. Lối lên hẹp, bạn chỉ mang theo được người hoặc túi.',
    en: '[Still Breathing] At the last stage, the person you were hired to bring out sits against the wall, leg broken, eyes open. The bag you filled on the way down weighs nearly as much as they do. The way up is narrow; you can carry them or the bag.',
    choices: [
      {
        labelVi: 'Bỏ túi đồ, cõng họ lên',
        labelEn: 'Drop the bag and carry them up',
        effects: { wealth: -8, rep: 6 },
        meritAdd: 6,
        npc: { role: 'friend', bond: 40 },
        resultVi: 'Bạn để túi đồ lại dưới chân tường. Lên tới miệng hầm, người ấy nắm cổ tay bạn rất lâu rồi mới buông. Vài ngày sau, họ tìm tới tận nhà để hỏi tên bạn.',
        resultEn: 'You leave the bag at the foot of the wall. At the mouth of the tunnel they hold your wrist a long time before letting go. A few days later they come to your door to ask your name.'
      },
      {
        labelVi: 'Giữ túi đồ, đánh dấu chỗ họ ngồi cho đội sau',
        labelEn: 'Keep the bag and mark where they sit for the next team',
        effects: { wealth: 6, sanity: -6 },
        scarsAdd: ['Người bạn đã bỏ lại dưới hầm'],
        resultVi: 'Bạn vạch dấu phấn lên tường cạnh họ rồi đi. Đội sau xuống muộn hai ngày. Tấm thẻ Fixer của người ấy về tới Office trong túi người khác.',
        resultEn: 'You chalk a mark on the wall beside them and go. The next team goes down two days late. Their Fixer license reaches the Office in someone else’s pocket.'
      }
    ]
  },
  {
    id: 'dg_obj_evidence',
    age: [14, 120],
    major: true,
    weight: 0,
    causalOnly: true,
    vi: '[Cuốn sổ dưới hầm] Bạn tìm thấy cuốn sổ ghi tên những kẻ đã trả tiền dọn chỗ này, viết bằng mực đỏ. Trong đó có cả tên Office đã giao Request cho bạn.',
    en: '[The Ledger Below] You find the ledger of everyone who paid to have this place cleared, written in red ink. The Office that hired you is in it too.',
    choices: [
      {
        labelVi: 'Nộp nguyên cuốn sổ như Request yêu cầu',
        labelEn: 'Hand in the whole ledger as the Request asks',
        effects: { rep: 5, heat: 6 },
        meritAdd: 10,
        resultVi: 'Office nhận sổ, trả đủ tiền, ghi tên bạn vào hồ sơ Request. Tuần sau, có người lạ đứng đợi ở đầu ngõ nhà bạn suốt hai buổi tối.',
        resultEn: 'The Office takes the ledger, pays in full and puts your name on the Request file. The next week a stranger waits at the end of your street two evenings running.'
      },
      {
        labelVi: 'Xé trang có tên Office, nộp phần còn lại',
        labelEn: 'Tear out the page with the Office’s name and hand in the rest',
        effects: { wealth: -4 },
        meritAdd: 3,
        scarsAdd: ['Tên viết bằng mực đỏ trong sổ dưới hầm'],
        resultVi: 'Bạn gấp trang giấy làm tư, cất vào lót giày. Office trả nửa tiền vì sổ thiếu trang. Bạn vẫn nhớ từng cái tên trên trang ấy.',
        resultEn: 'You fold the page in four and tuck it into your shoe. The Office pays half because a page is missing. You still remember every name on it.'
      }
    ]
  },
  {
    id: 'dg_obj_retrieve',
    age: [14, 120],
    major: true,
    weight: 0,
    causalOnly: true,
    vi: '[Chiếc hộp niêm phong] Món hàng cần thu hồi là chiếc hộp kim loại còn nguyên niêm phong. Nắp hộp đã nứt sẵn. Qua khe nứt, bạn thấy ánh xanh của ống thuốc K Corp.',
    en: '[The Sealed Case] What you came to recover is a metal case, seal intact. The lid is already cracked. Through the crack you see the green light of a K Corp ampoule.',
    choices: [
      {
        labelVi: 'Giao hộp đúng như lúc nhận',
        labelEn: 'Deliver the case as you found it',
        effects: { wealth: 8, rep: 4 },
        meritAdd: 6,
        resultVi: 'Người nhận kiểm niêm phong, gật đầu, trả thêm tiền vì hộp không mất gì. Tên bạn được ghi vào danh sách người giao hàng đáng tin.',
        resultEn: 'The receiver checks the seal, nods and pays extra because nothing is missing. Your name goes on the list of couriers who can be trusted.'
      },
      {
        labelVi: 'Lấy ống K Corp, giao hộp rỗng',
        labelEn: 'Take the ampoule and deliver the empty case',
        effects: { rep: -6, heat: 4 },
        itemAdd: 'con_kcorp_ampoule',
        resultVi: 'Ống thuốc nằm gọn trong túi áo bạn. Người nhận lắc chiếc hộp, không nghe tiếng gì, nhìn bạn rất lâu rồi bỏ đi không trả tiền.',
        resultEn: 'The ampoule sits snug in your coat pocket. The receiver shakes the case, hears nothing, looks at you a long time and leaves without paying.'
      }
    ]
  },
  {
    id: 'dg_obj_rearguard',
    age: [14, 120],
    major: true,
    weight: 0,
    causalOnly: true,
    vi: '[Đường rút] Hầm bắt đầu sập từ phía sau. Lối ra chỉ giữ được nếu có người đứng lại chống khúc quanh cuối. Người khuân vác bạn thuê theo cùng đang nhìn bạn chờ lệnh.',
    en: '[The Way Out] The tunnel starts to fall in behind you. The exit holds only if someone stays to brace the last bend. The porter you hired is looking at you, waiting for the word.',
    choices: [
      {
        labelVi: 'Tự đứng lại chống khúc quanh',
        labelEn: 'Stay back and brace the bend yourself',
        effects: { health: -10, rep: 6 },
        meritAdd: 6,
        resultVi: 'Bạn tì vai vào xà gỗ tới khi người khuân vác ra khỏi miệng hầm. Đá rơi trúng lưng bạn hai lần. Ở Office, người ta kể lại chuyện này nhiều hơn bạn muốn.',
        resultEn: 'You put your shoulder to the beam until the porter is out of the tunnel. Stone hits your back twice. At the Office they tell the story more often than you would like.'
      },
      {
        labelVi: 'Trả thêm tiền, để người khuân vác giữ hậu tuyến',
        labelEn: 'Pay the porter extra to hold the rear',
        effects: { wealth: -6, sanity: -8 },
        scarsAdd: ['Bàn tay vấy máu người khuân vác'],
        resultVi: 'Người khuân vác nhận tiền rồi quay lại khúc quanh. Bạn ra tới miệng hầm thì nghe tiếng đá đổ phía sau. Người ấy không lên.',
        resultEn: 'The porter takes the money and turns back to the bend. You reach the mouth of the tunnel and hear the stone come down behind you. The porter does not come up.'
      }
    ]
  }
];

const hash = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619) >>> 0;
  return h;
};

/** The objective this run carries: fixed by the life, the age and the dungeon, so a reload never changes it. */
export function dungeonObjectiveFor(dungeonId, char) {
  return DUNGEON_OBJECTIVES[hash(`${char?.seed || ''}|${char?.age || 0}|${dungeonId}`) % DUNGEON_OBJECTIVES.length];
}

/** The pending event an objective opens at the last stage, in the shape the event dock reads. */
export function objectiveEventFor(objectiveId) {
  const objective = DUNGEON_OBJECTIVES.find((o) => o.id === objectiveId);
  const event = objective && DUNGEON_OBJECTIVE_EVENTS.find((e) => e.id === objective.eventId);
  if (!event) return null;
  const split = (text) => {
    const m = /^\[([^\]]+)\]\s*/.exec(text);
    return m ? { title: m[1], body: text.slice(m[0].length) } : { title: '', body: text };
  };
  const vi = split(event.vi);
  const en = split(event.en);
  return { ...event, titleVi: vi.title, titleEn: en.title, displayVi: vi.body, displayEn: en.body, isDungeonObjective: true };
}
