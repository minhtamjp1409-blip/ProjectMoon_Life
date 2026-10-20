// ============================================================================
// BIRTH, the first lines of a life, assembled from several independent pieces
// (where, who raised you, what was happening that night, the omen, the first
// person you'll grow up with) so that no two starts read alike.
// ============================================================================

const pick = (arr, rng) => arr[Math.floor(rng() * arr.length) % arr.length];

const PLACE = {
  nest: [
    { vi: 'Bạn chào đời trong một bệnh viện của Nest {region}. Phòng sinh sạch đến mức không có mùi gì cả.', en: 'You were born in a hospital inside the Nest of {region}. The delivery room was so clean it smelled of nothing at all.' },
    { vi: 'Bạn sinh ra ở tầng 41 một tòa căn hộ trong Nest {region}. Qua lớp kính chống đạn, Backstreets chỉ là một vệt sáng mờ phía dưới.', en: 'You were born on the 41st floor of an apartment tower in the Nest of {region}. Through the bulletproof glass, the Backstreets were only a dim smear of light below.' },
    { vi: 'Ca sinh của bạn được Wing chi trả, có bác sĩ riêng và hai nhân viên an ninh đứng ngoài cửa. Nest {region} chăm lo cho tài sản của nó.', en: 'Your birth was paid for by the Wing, with a private doctor and two security staff at the door. The Nest of {region} takes care of its assets.' },
    { vi: 'Bạn khóc tiếng đầu tiên lúc giữa trưa, khi trần nhà của Nest {region} đang chiếu một bầu trời xanh nhân tạo.', en: 'You gave your first cry at noon, while the ceiling of the {region} Nest projected an artificial blue sky.' }
  ],
  back: [
    { vi: 'Bạn chào đời trong một căn phòng thuê ở Backstreets của {region}. Bà đỡ là hàng xóm, dụng cụ là một con dao bếp đã hơ lửa.', en: 'You were born in a rented room in the Backstreets of {region}. The midwife was a neighbor; her instrument, a kitchen knife held over a flame.' },
    { vi: 'Bạn sinh ra ở phòng sau một tiệm sửa chân tay giả trong Backstreets {region}, giữa mùi dầu máy và tiếng radio rè.', en: 'You were born in the back room of a prosthetics repair shop in the {region} Backstreets, amid the smell of machine oil and a crackling radio.' },
    { vi: 'Mẹ bạn chuyển dạ trên WARP platform của {region}. Bạn chào đời trên ghế chờ, có ba người lạ đứng che.', en: 'Your mother went into labor on a {region} WARP platform. You were born on a waiting bench, three strangers standing guard.' },
    { vi: 'Bạn chào đời trong một phòng khám không biển hiệu ở Backstreets {region}. Gia đình trả bằng một chiếc nhẫn cưới.', en: 'You were born in an unmarked clinic in the {region} Backstreets. Your family paid with a wedding ring.' },
    { vi: 'Bạn sinh ra trên tầng gác của một quán mì ở {region}. Tối đó quán vẫn mở, và khách dưới nhà vỗ tay khi nghe tiếng khóc.', en: 'You were born in the loft above a noodle shop in {region}. The shop stayed open that night, and the customers downstairs clapped at your first cry.' },
    { vi: 'Bạn chào đời trong một căn hộ ở Backstreets {region} mà cửa có đến năm lớp khóa. Cha bạn kiểm tra cả năm trước khi bế bạn.', en: 'You were born in a {region} Backstreets flat with five locks on the door. Your father checked all five before he held you.' }
  ],
  out: [
    { vi: 'Bạn chào đời trong một trại tạm ở The Outskirts, dưới tấm bạt vá. Ở phía xa, bức tường của The City sáng suốt đêm.', en: 'You were born in a makeshift camp in The Outskirts, under a patched tarp. Far off, the City’s wall glowed all night.' },
    { vi: 'Bạn sinh ra trong một chiếc xe tải cũ đang chạy trốn bão cát ngoài The Outskirts. Không ai dám dừng lại.', en: 'You were born in an old truck fleeing a sandstorm in The Outskirts. No one dared stop.' },
    { vi: 'Bạn chào đời trong một căn hầm dưới Ruins. Người lớn bảo bạn may mắn: con thú săn đêm ấy đã đi qua mà không ngửi thấy.', en: 'You were born in a cellar beneath the Ruins. The adults said you were lucky: the night hunter passed over without catching your scent.' }
  ]
};

const FAMILY = {
  orphan: [
    { vi: 'Bạn không biết mặt cha mẹ. Người ta tìm thấy bạn trong một thùng các-tông trước cửa nhà thờ bỏ hoang.', en: 'You never knew your parents. You were found in a cardboard box outside an abandoned church.' },
    { vi: 'Mẹ bạn mất khi sinh. Cha bạn biến mất một tuần sau đó. Một bà cụ bán thuốc lá nhận nuôi bạn vì "nhà vừa trống chỗ".', en: 'Your mother died giving birth. Your father vanished a week later. An old cigarette seller took you in because “a spot just opened up.”' },
    { vi: 'Bạn lớn lên ở cô nhi viện của Dieci Association. Họ dạy bạn đọc trước khi dạy bạn nói.', en: 'You grew up in a Dieci Association orphanage. They taught you to read before they taught you to speak.' }
  ],
  backstreet_worker: [
    { vi: 'Cha bạn làm ca đêm ở nhà máy, mẹ bạn khâu thuê. Họ mệt đến mức chỉ kịp hôn bạn lúc ngủ.', en: 'Your father worked night shifts at a factory; your mother took in sewing. They were so tired they only kissed you while you slept.' },
    { vi: 'Gia đình bạn mở một tiệm tạp hóa nhỏ. Tiền lời đủ để trả bảo kê và mua khóa mới mỗi năm.', en: 'Your family ran a small corner shop. The profit covered protection money and new locks each year.' },
    { vi: 'Mẹ bạn lái xe giao hàng qua những con phố mà Fixer cũng ngại đi. Bà về nhà với những câu chuyện mà bạn không được kể lại.', en: 'Your mother drove deliveries down streets even Fixers avoided. She came home with stories you weren’t allowed to repeat.' }
  ],
  fixer_lineage: [
    { vi: 'Cha bạn từng là Fixer Grade 6. Ông giải nghệ sau khi mất ba ngón tay, nhưng vẫn lau thanh kiếm cũ mỗi tối.', en: 'Your father was once a Grade 6 Fixer. He retired after losing three fingers, but still oiled his old sword every night.' },
    { vi: 'Mẹ bạn làm cho một Office nhỏ. Bà về nhà mỗi tuần một lần, với mùi máu khô mà xà phòng không gột hết.', en: 'Your mother worked for a small Office. She came home once a week, smelling of dried blood no soap could wash out.' },
    { vi: 'Cả cha lẫn mẹ đều là Fixer. Họ gặp nhau khi được thuê giết nhau, và quyết định không làm.', en: 'Both your parents were Fixers. They met when hired to kill each other, and decided not to.' }
  ],
  nest_feather: [
    { vi: 'Cha mẹ bạn là Feather: cư dân hợp pháp của Nest. Họ sống bằng sự cẩn thận và một nụ cười không bao giờ tắt.', en: 'Your parents were Feathers: legal residents of the Nest. They lived on caution and a smile that never dropped.' },
    { vi: 'Mẹ bạn là nhân viên văn phòng của Wing, cha bạn là kế toán. Cả nhà sợ nhất một thứ: bị điều chuyển ra ngoài.', en: 'Your mother was a Wing office worker, your father an accountant. The whole family feared one thing: being transferred out.' }
  ],
  wing_executive: [
    { vi: 'Bạn sinh ra trong một gia đình quản lý cấp cao của Wing. Từ ngày đầu, bạn đã có mã nhân viên dự phòng.', en: 'You were born into a family of senior Wing management. From day one, you had a reserved employee number.' },
    { vi: 'Ông bà bạn từng ngồi trong hội đồng của Wing. Cha bạn thì không, và cả nhà không bao giờ để ông quên điều đó.', en: 'Your grandparents once sat on the Wing’s board. Your father did not, and the family never let him forget it.' }
  ],
  outskirts_nomad: [
    { vi: 'Bộ lạc của bạn di chuyển theo mùa giữa Ruins và các bãi rác của The City. Không ai trong đó có giấy tờ.', en: 'Your tribe moved with the seasons between the Ruins and the City’s dumps. None of them had papers.' },
    { vi: 'Cha mẹ bạn bị trục xuất khỏi The City trước khi bạn sinh ra. Họ không bao giờ nói vì sao.', en: 'Your parents were expelled from the City before you were born. They never said why.' }
  ]
};

// What was happening in the City that night, one line, pure chance
const THAT_NIGHT = [
  { vi: 'Đêm ấy, radio báo một Distortion vừa bị Hana Association hạ ở District bên cạnh.', en: 'That night, the radio reported a Distortion put down by Hana Association in the next District.' },
  { vi: 'Đêm ấy trời mưa, và mưa ở The City luôn có vị kim loại.', en: 'It rained that night, and rain in the City always tastes of metal.' },
  { vi: 'Đêm ấy có pháo hoa: một Wing vừa công bố Singularity mới.', en: 'There were fireworks that night: a Wing had just announced a new Singularity.' },
  { vi: 'Đêm ấy yên tĩnh lạ thường. Người già trong khu bảo đó là điềm xấu.', en: 'That night was strangely quiet. The old people on the block called it a bad sign.' },
  { vi: 'Đêm ấy, ở đâu đó trong thành phố, một Thư viện mọc lên giữa khoảng đất trống.', en: 'That night, somewhere in the City, a Library rose out of an empty lot.' },
  { vi: 'Đêm ấy mất điện cả khu. Bạn chào đời dưới ánh nến.', en: 'The whole block lost power that night. You were born by candlelight.' },
  { vi: 'Đêm ấy, Thumb và Middle bắn nhau ở ba con phố về phía bắc. Không ai ngủ được, nên ai cũng nghe thấy tiếng bạn khóc.', en: 'That night the Thumb and the Middle traded fire three streets north. No one could sleep, so everyone heard you cry.' },
  { vi: 'Đêm ấy có tuyết, tuyết thật, lần đầu sau mười năm.', en: 'It snowed that night, real snow, the first in ten years.' },
  { vi: 'Đêm ấy, một Fixer vô danh trú mưa dưới mái hiên nhà bạn và để lại 5 Ahn "mừng đứa bé".', en: 'That night a nameless Fixer sheltered from the rain under your eaves and left 5 Ahn “for the baby.”' },
  { vi: 'Đêm ấy chẳng có gì đặc biệt. Ở The City, đó đã là một món quà.', en: 'Nothing special happened that night. In the City, that is already a gift.' }
];

const OMEN_LINE = {
  index_equilibrium: [
    { vi: 'Bà đỡ nhìn bạn rất lâu rồi nói: "Đứa bé này chẳng có gì đặc biệt." Ở The City, đó là lời chúc tốt nhất.', en: 'The midwife looked at you a long time and said, “Nothing special about this one.” In the City, that’s the best blessing there is.' }
  ],
  merciless_head: [
    { vi: 'Ba ngày sau, một người mặc đồng phục B Corp đến chụp ảnh bạn cho "hồ sơ dân cư". Hắn không giải thích vì sao chỉ chụp mỗi bạn.', en: 'Three days later, someone in a B Corp uniform came to photograph you “for the residents’ register.” They never explained why only you.' }
  ],
  carmen_whisper: [
    { vi: 'Bạn không khóc. Bạn nhìn lên trần nhà và mỉm cười, như đang nghe ai đó hát.', en: 'You didn’t cry. You looked up at the ceiling and smiled, as if listening to someone sing.' }
  ],
  crimson_sweeper_star: [
    { vi: 'Đồng hồ chỉ đúng 3 giờ 13 phút khi bạn chào đời. Ngoài cửa sổ, tiếng còi Night in the Backstreets vừa dứt.', en: 'The clock read exactly 3:13 when you were born. Outside, the Night in the Backstreets siren had just stopped.' }
  ],
  jcorp_rigged_dice: [
    { vi: 'Cha bạn thắng một ván bài lớn đúng đêm bạn chào đời, rồi thua sạch vào sáng hôm sau.', en: 'Your father won a big hand of cards the night you were born, and lost it all the next morning.' }
  ],
  bloodline_echo: [
    { vi: 'Có người để lại trước cửa một chiếc hộp gỗ không tên. Bên trong là một chiếc nhẫn cũ dính máu khô.', en: 'Someone left a nameless wooden box at the door. Inside was an old ring crusted with dried blood.' }
  ]
};

/* ---------- the childhood friend: the first named person in your life ---------- */

const NAMES = [
  'Mirae', 'Hyun', 'Oswald', 'Liesel', 'Kael', 'Jun', 'Sora', 'Tobias', 'Yeon', 'Marta', 'Ivo', 'Rin', 'Dae-ho', 'Nell',
  'Pavel', 'Ahri', 'Cas', 'Ilsa', 'Min', 'Teo', 'Bora', 'Viktor', 'Hana', 'Felix', 'Seo', 'Greta', 'Lio', 'Yuri', 'Odile',
  'Jae', 'Noor', 'Emil', 'Su-ah', 'Rook', 'Petra', 'Kang', 'Ezra', 'Wren', 'Doyun', 'Lark'
];

const TRAITS = [
  { vi: 'hay cười, cười cả khi sợ', en: 'laughs often, even when scared' },
  { vi: 'ít nói, luôn mang theo một con dao gấp', en: 'quiet, always carries a folding knife' },
  { vi: 'mơ ước được vào Nest', en: 'dreams of living in a Nest' },
  { vi: 'giỏi nói dối đến mức chính nó cũng tin', en: 'lies so well they believe it themselves' },
  { vi: 'nhặt mọi con vật bị bỏ rơi', en: 'takes in every stray animal' },
  { vi: 'thần tượng Color Fixer, thuộc lòng tên từng người', en: 'idolizes the Color Fixers, knows every name' },
  { vi: 'nóng tính, hay gây sự với đám lớn hơn', en: 'hot-headed, picks fights with bigger kids' },
  { vi: 'đọc sách nhiều hơn ăn', en: 'reads more than they eat' },
  { vi: 'trung thành đến mức ngu ngốc', en: 'loyal to the point of foolishness' },
  { vi: 'luôn có cách kiếm ra vài Ahn', en: 'always finds a way to make a few Ahn' }
];

export function makeNpc(role, rng, extra = {}) {
  const name = pick(NAMES, rng);
  const trait = pick(TRAITS, rng);
  return {
    role,
    nameVi: name,
    nameEn: name,
    traitVi: trait.vi,
    traitEn: trait.en,
    bond: 40 + Math.floor(rng() * 25),
    deceased: false,
    status: 'alive',
    metAge: 0,
    memories: [],
    ...extra
  };
}

const FRIEND_LINE = [
  { vi: 'Nhà bên có một đứa trẻ sinh cùng tháng tên {friend}, {trait}. Hai đứa lớn lên cạnh nhau.', en: 'Next door there was a child born the same month, {friend}, {trait}. You grew up side by side.' },
  { vi: 'Người đầu tiên bạn nhớ mặt, ngoài cha mẹ, là {friend}: một đứa trẻ {trait}.', en: 'The first face you remember, besides your parents, is {friend}: a kid who {trait}.' },
  { vi: '{friend}, đứa trẻ cùng dãy nhà, {trait}. Sau này bạn sẽ gọi nó là bạn thân nhất.', en: '{friend}, the kid from your row, {trait}. One day you would call them your best friend.' }
];

const fill = (s, map) => Object.entries(map).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, v), s);

/**
 * Returns the opening log lines and the childhood friend for a newborn.
 * `kind` is 'nest' | 'back' | 'out'.
 */
export function composeBirth({ kind, familyId, omenId, regionVi, regionEn, name, generation, rng }) {
  const place = pick(PLACE[kind] || PLACE.back, rng);
  const fam = pick(FAMILY[familyId] || FAMILY.backstreet_worker, rng);
  const night = pick(THAT_NIGHT, rng);
  const omen = pick(OMEN_LINE[omenId] || OMEN_LINE.index_equilibrium, rng);
  const friend = makeNpc('friend', rng);
  const fl = pick(FRIEND_LINE, rng);

  const head = generation > 1
    ? { vi: `Thế hệ #${generation}. Bạn được đặt tên là ${name}.`, en: `Generation #${generation}. You were named ${name}.` }
    : { vi: `Bạn được đặt tên là ${name}.`, en: `You were named ${name}.` };

  return {
    friend,
    lines: [
      {
        type: 'milestone',
        vi: `${fill(place.vi, { region: regionVi })} ${head.vi}`,
        en: `${fill(place.en, { region: regionEn })} ${head.en}`
      },
      { type: 'daily', vi: `${fam.vi} ${night.vi}`, en: `${fam.en} ${night.en}` },
      { type: omenId === 'index_equilibrium' ? 'daily' : 'causal', vi: omen.vi, en: omen.en, omen: true },
      { type: 'daily', vi: fill(fl.vi, { friend: friend.nameVi, trait: friend.traitVi }), en: fill(fl.en, { friend: friend.nameEn, trait: friend.traitEn }) }
    ]
  };
}
