/**
 * Project Moon - Dynamic NPC Companion Quests
 * Deepens relationships beyond flat cardboard stats.
 * Trust and Bond are capped until the companion's personal crisis/quest is resolved.
 * Written with authentic Project Moon dystopian obsidian prose.
 */

export const COMPANION_QUEST_EVENTS = [
  // =========================================================================
  // 1. GAMBLER: THE BROKEN LEDGER DEBT
  // =========================================================================
  {
    id: 'quest_gambler_debt_call',
    age: [16, 75],
    major: true,
    weight: 25,
    need: { npcTag: ['friend', 'gambler'], noQuest: { role: 'friend', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Nợ sòng bạc] Bảo kê ép {friend} vào thùng rác sau sòng bạc. Tên cầm đầu giơ sổ nợ: \"Tiền cược đã mất. Trả trước nửa đêm, hoặc bọn tao lấy hai bàn tay.\" {friend} không dám nhìn bạn.",
    en: '[The Gambler’s Reckoning] Down a slime-slick alley behind District 9’s subterranean dice den, flickering neon fractures across oily puddles. Three greasy syndicate enforcers have {friend} pinned against a rusted dumpster, blood dripping from split lips. The boss brandishes a rodent-chewed ledger:\n“Your pal staked next month’s tenement rations and lost clean to the house. Fifteen Ahn before midnight, or we take it in severed hands.”',
    choices: [
      {
        labelVi: 'Đặt 15 Ahn lên mặt thùng phi, chuộc người bạn ra',
        labelEn: 'Slap fifteen Ahn onto the drum to settle the debt',
        resultVi: "Bạn trả tiền. Bọn bảo kê gạch nợ rồi đẩy {friend} về phía bạn. Hai bàn tay người ấy vẫn còn nguyên. {friend} nói sẽ không quay lại sòng bạc.",
        resultEn: 'You slapped fifteen Ahn with a sharp metallic clatter onto the drum lid. The enforcers bared yellowed teeth, scooped the coin, and shoved {friend} into the mud at your feet. {friend} knelt shivering, bloody fingers clutching your hem: “I swear... I’ll never touch the dice or cards again...”',
        costAhn: 15,
        effects: { rep: +8, sanity: +6 },
        npcQuest: ['friend'],
        meritAdd: 8
      },
      {
        labelVi: 'Tuốt vũ khí rạch gió, dùng sát khí đè bẹp đám chủ nợ',
        labelEn: 'Draw steel and break their perimeter through lethal intent',
        resultVi: "Bạn chém gãy xà beng của tên cầm đầu. Đám bảo kê lùi khỏi {friend}, nhưng cuốn sổ nợ vẫn nằm trong tay chúng. {friend} theo bạn ra khỏi ngõ, im lặng suốt đường về.",
        resultEn: 'Your blade parted the rain, shearing clean through the leader’s prybar with a bone-chilling shriek, the razor tip halting a millimeter from his jugular. Overwhelmed by the icy aura of a killer who had breathed too much slaughter, the thugs cursed and melted into shadows. {friend} stared up at you with awe and reverence.',
        effects: { health: -8, rep: +12, heat: +10 },
        npcQuest: ['friend'],
        meritAdd: 10
      },
      {
        labelVi: 'Khoanh tay đứng nhìn, để bạn mình tự trả giá cho sự ngu muội',
        labelEn: 'Fold your arms and let them face the consequences of folly',
        resultVi: 'Tiếng xương ngón tay gãy giòn vang lên chát chúa trong con ngõ cụt. Đám bảo kê bỏ đi sau khi trút cơn thịnh nộ. {friend} ôm bàn tay nát vụn lê bước trong bóng tối, cúi gằm mặt không dám nhìn bạn. Mối liên kết ngầm giữa hai người vĩnh viễn đứt đoạn.',
        resultEn: 'A sharp, sickening snap of shattered knuckles echoed off the brick cul-de-sac. The enforcers dispersed. {friend} dragged their ruined hand through the muck, head bowed, refusing to meet your eyes. The unspoken bond between you withered into ash.',
        effects: { sanity: -8, rep: -4 },
        bond: { friend: -20 }
      }
    ]
  },

  // =========================================================================
  // 2. SICKLY: THE LAST PHIAL OF ANTIBIOTICS
  // =========================================================================
  {
    id: 'quest_sickly_medicine_hunt',
    age: [14, 80],
    major: true,
    weight: 25,
    need: { back: true, npcTag: ['friend', 'sickly'], noQuest: { role: 'friend', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Thuốc giữa mùa đông] {friend} ho ra máu trong căn gác lạnh. Một phòng khám chui có ống huyết thanh K Corp đủ giữ người ấy qua đêm, nhưng đòi trả tiền trước. Bạn nghe tiếng ho phía sau cánh cửa.",
    en: '[The Backstreet Winter Fever] The drafty attic shivers under howling winter gales reeking of coal smoke. {friend}’s dry hacking now coughs dark clotted blood onto floorboards. They lie curled beneath three damp, moldy blankets, chest rattling with shallow breaths. An underground apothecary offers a filtered sediment vial extracted from K Corp regenerative culture for twelve Ahn.',
    choices: [
      {
        labelVi: 'Chi 12 Ahn mua lọ huyết thanh cứu mạng bạn mình',
        labelEn: 'Spend twelve Ahn on the regenerative serum vial',
        resultVi: 'Dung dịch màu lục nhạt thấm vào tĩnh mạch cổ tay {friend}. Cơn co giật dịu dần sau hai canh giờ; sắc mặt tái mét dần ấm trở lại. Khi đôi mắt mệt mỏi mở ra, {friend} nắm chặt lấy bàn tay bạn, giọng thều thào nhưng ánh mắt rực sáng sự sống: "Mày đã kéo tao từ miệng cống trở về..."',
        resultEn: 'Pale green fluid seeped into {friend}’s wrist veins. Within two hours the violent spasms subsided, warmth returning to sunken cheeks. When tired eyes opened, fingers gripped your hand with fierce resolve: “You dragged me back from the grave...”',
        costAhn: 12,
        effects: { sanity: +12, rep: +6 },
        npcQuest: ['friend'],
        meritAdd: 10
      },
      {
        labelVi: 'Thức trắng bốn đêm chườm nước ấm và tận tụy chăm sóc',
        labelEn: 'Vigil through four sleepless nights with herbal compresses',
        resultVi: 'Không có tiền mua thuốc đắt đỏ, bạn dùng cả sức lực và sự kiên nhẫn để thay khăn, đun từng thìa nước rễ cây hạ sốt. Đến rạng sáng ngày thứ năm, cơn sốt cắt hẳn. {friend} rơi nước mắt trong ánh ban mai xám xịt, khắc sâu ân tình này vào tim.',
        resultEn: 'Lacking coin for expensive serum, you guarded with iron will, boiling bitter root broths through four sleepless nights. On the fifth dawn, the fever broke. {friend} wept softly in the gray light, your devotion etched forever in memory.',
        effects: { health: -6, sanity: +8, rep: +8 },
        npcQuest: ['friend'],
        meritAdd: 8
      },
      {
        labelVi: 'Để số phận của người bạn tự định đoạt theo lẽ sinh tồn',
        labelEn: 'Leave their survival to the City’s merciless natural order',
        resultVi: '{friend} vượt qua cơn bạo bệnh nhờ may mắn và sức sống dai dẳng như cỏ dại, nhưng ánh mắt nhìn bạn đã trở nên lạnh lẽo. Người đó hiểu rằng trong phép tính của bạn, mạng sống của họ không đáng giá mười mấy đồng Ahn.',
        resultEn: '{friend} survived by pure bitter grit, yet the warmth in their eyes died. They understood that in your ledgers, their breath was not worth twelve Ahn.',
        effects: { sanity: -4 },
        bond: { friend: -18 }
      }
    ]
  },

  // =========================================================================
  // 3. PROUD: THE DEFENSE OF DIGNITY
  // =========================================================================
  {
    id: 'quest_proud_honor_duel',
    age: [17, 70],
    major: true,
    weight: 22,
    need: { npcTag: ['friend', 'proud'], noQuest: { role: 'friend', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Lời thách ở chợ] Một tay Syndicate hất canh lên áo {friend}, rồi tát người ấy trước đám đông. {friend} rút dao gấp; đối thủ mặc giáp và đã gọi đàn em lại. Bạn đứng đủ gần để ngăn trận đấu.",
    en: '[The Duel for Pride] In the crowded morning market smelling of frying grease and sewage, a towering syndicate bouncer purposely hurls hot grease across {friend}’s ragged coat, then backhands them into the muck to entertain his cronies. Humiliated before the jeering crowd, {friend} spits blood and snaps open a rusted folding knife, eyes ablaze with suicidal defiance against an armored brute twice their size.',
    choices: [
      {
        labelVi: 'Bước lên đứng kề vai, cùng bạn mình tuốt kiếm đối đầu',
        labelEn: 'Step shoulder-to-shoulder, drawing your blade in unison',
        resultVi: 'Hai lưỡi đao cùng rút ra trong một nhịp thở lạnh ngắt. Sát khí của hai kẻ liều mạng sẵn sàng cùng chết khiến nụ cười trên môi tên đao phủ vụt tắt. Gã chột dạ, lùi lại nửa bước rồi hậm hực dẫn đàn em lẩn vào đám đông. {friend} lau vệt máu trên cằm, khẽ gật đầu: "Tao nợ mày một mạng và một danh dự."',
        resultEn: 'Two blades drew breath with bone-cold synchronized clicks. The quiet madness of two wolves ready to die together froze the laughter in the bully’s throat. Intimidated, he spat and melted into the bazaar. {friend} wiped crimson from their jaw, nodding firmly: “I owe you my life and my name.”',
        effects: { health: -6, rep: +14, resonance: +10 },
        npcQuest: ['friend'],
        meritAdd: 12
      },
      {
        labelVi: 'Nhanh trí bước vào giữa nói đỡ và tặng gã vò rượu mạnh',
        labelEn: 'Tactfully intercede, offering the bouncer a jug of high-proof liquor',
        resultVi: 'Bạn trích 8 Ahn mua vò rượu ngon nhất khu chợ, bước tới cười đùa vỗ vai tên côn đồ để hóa giải xung đột. Gã hài lòng ôm vò rượu bỏ đi. Danh dự của {friend} được bảo toàn mà không cần đổ máu vô ích.',
        resultEn: 'Expending eight Ahn on the market’s strongest spirit, you stepped between them with easy charm, defusing the brawl. The brute walked away satisfied. Bloodshed was averted without trampling your companion’s pride.',
        costAhn: 8,
        effects: { rep: +8, network: +10 },
        npcQuest: ['friend'],
        meritAdd: 8
      },
      {
        labelVi: 'Khoanh tay đứng nhìn bạn mình bị đánh bầm dập',
        labelEn: 'Stand aside as they take a brutal beating in the dirt',
        resultVi: '{friend} gục ngã trên vũng bùn dưới những cú đá tàn bạo. Nỗi nhục nhã thiêu đốt tâm can họ hơn cả những chiếc xương sườn gãy, và tình bạn giữa hai người vỡ vụn thành trăm mảnh.',
        resultEn: '{friend} collapsed in the dirt beneath steel-toed boots. The bitter humiliation burned deeper than broken ribs, shattering the trust between you forever.',
        effects: { sanity: -6, rep: -8 },
        bond: { friend: -25 }
      }
    ]
  },

  // =========================================================================
  // 4. SECRETIVE: THE SHADOW OF THE PAST
  // =========================================================================
  {
    id: 'quest_secretive_past_caught',
    age: [18, 70],
    major: true,
    weight: 22,
    need: { npcTag: ['friend', 'secretive'], noQuest: { role: 'friend', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Hồ sơ cũ] Thám tử Seven giơ chân dung {friend} cùng hồ sơ của một Wing đã sụp đổ. {friend} lùi sau lưng bạn, tay đặt lên dao găm. \"Nếu họ dẫn tao đi, đội thanh trừng sẽ tới trước khi trời sáng.\"",
    en: '[Shadow of Yesterday] Cold drizzle coats the alleyway. A trench-coated investigator from Seven Association Section 4 lingers under a flickering streetlamp, holding a charcoal sketch of {friend} and a sealed docket from a fallen Wing. {friend} turns porcelain-white, retreating behind the door with white-knuckled grip on a dagger: “They traced my scent... The Wing’s purge cells won’t leave me breathing if dragged back.”',
    choices: [
      {
        labelVi: 'Đánh lạc hướng thám tử, trộm hồ sơ và thiêu rụi thành tro',
        labelEn: 'Mislead the investigator, pickpocket the file and burn it to ash',
        resultVi: 'Bạn cung cấp chứng cứ ngoại phạm giả, khéo léo móc túi tập tài liệu rồi ném thẳng vào lò than đang đỏ rực. Mối đe dọa biến mất theo làn khói. Lần đầu tiên, {friend} rơi nước mắt và thì thầm kể cho bạn nghe tên thật cùng thảm kịch năm xưa.',
        resultEn: 'You fed the detective an airtight false trail, expertly lifted the dossier, and hurled it into glowing furnace coals. The threat dissolved in smoke. For the first time, {friend} wept softly, whispering their true name and the nightmare they fled.',
        effects: { network: +10, heat: +8, sanity: +8 },
        npcQuest: ['friend'],
        meritAdd: 12
      },
      {
        labelVi: 'Chi 18 Ahn đút lót để thám tử Seven khép lại hồ sơ',
        labelEn: 'Bribe the Seven investigator with eighteen Ahn to close the inquiry',
        resultVi: 'Viên thám tử nhận bọc Ahn, gật đầu đóng con dấu đỏ "Mục tiêu đã tử vong trong tai nạn Singularity" vào hồ sơ rồi rời đi. {friend} thở phào như vừa trút được ngàn cân đá tảng trên ngực.',
        resultEn: 'The detective accepted the heavy pouch, stamping “Subject deceased in Singularity incident” before pocketing the ledger. {friend} exhaled as though unburdened of a mountain.',
        costAhn: 18,
        effects: { rep: +10, network: +12 },
        npcQuest: ['friend'],
        meritAdd: 10
      },
      {
        labelVi: 'Từ chối dính líu đến rắc rối chết người của các Wing',
        labelEn: 'Refuse to meddle in deadly corporate extraditions',
        resultVi: '{friend} im lặng thu dọn chiếc ba lô rách và biến mất vào màn sương đêm The City. Bạn không bao giờ gặp lại người bạn ấy nữa.',
        resultEn: '{friend} packed their threadbare satchel in silence and dissolved into the fog. You never crossed paths again.',
        npcFate: { friend: 'estranged' }
      }
    ]
  },

  // =========================================================================
  // 5. AMBITIOUS: THE COMMISSION BREAKTHROUGH
  // =========================================================================
  {
    id: 'quest_ambitious_recommendation',
    age: [18, 65],
    major: true,
    weight: 22,
    need: { npcTag: ['friend', 'ambitious'], noQuest: { role: 'friend', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Thư bảo lãnh] {friend} được mời phỏng vấn vào một Office gần Nest. Hội đồng đòi thư bảo lãnh từ Fixer có tên tuổi, hoặc tiền ký quỹ. {friend} mang mẫu đơn đến, nhờ bạn giúp một trong hai.",
    en: '[The Career Milestone] {friend} secured an interview seat at a prestigious Fixer Office on the Nest perimeter, but the board demands a signed sponsorship from a reputable operative or a sixteen-Ahn indemnity deposit. They seek you out beneath the dim oil lamp, eyes burning with relentless ambition.',
    choices: [
      {
        labelVi: 'Dùng danh tiếng và mạng lưới của bạn viết thư bảo lãnh tiến cử',
        labelEn: 'Pledge your reputation and network to sponsor their induction',
        resultVi: 'Lá thư tiến cử mang dấu ấn của bạn mở toang cánh cổng lớn. {friend} được tuyển dụng chính thức với đãi ngộ cao. Trong bộ đồng phục phẳng phiu mới toanh, người bạn nâng ly rượu chúc mừng: "Có tao ở đây, mày sẽ không bao giờ phải độc hành ở The City."',
        resultEn: 'Your sealed affidavit swung the iron gates wide open. {friend} was inducted with high honors. In their crisp, tailored uniform, they raised a glass: “As long as I draw breath, you will never walk alone in this City.”',
        effects: { network: +16, rep: +12 },
        npcQuest: ['friend'],
        meritAdd: 14
      },
      {
        labelVi: 'Trích 16 Ahn tiền túi giúp bạn mình đóng khoản tiền ký quỹ',
        labelEn: 'Provide the sixteen Ahn bond from your own purse',
        resultVi: 'Khoản tiền giúp {friend} có được vị trí đáng mơ ước. Từ một đứa trẻ nghèo hèn ở Backstreets, bạn mình đã có chỗ đứng vững vàng và luôn tìm cách đền đáp sự hỗ trợ của bạn.',
        resultEn: 'The sum secured their coveted operative badge. From a ragged street youth, your companion became an established contractor, forever looking to return the favor.',
        costAhn: 16,
        effects: { rep: +10, network: +12 },
        npcQuest: ['friend'],
        meritAdd: 12
      },
      {
        labelVi: 'Từ chối, khuyên bạn mình nên an phận ở dưới đáy xã hội',
        labelEn: 'Refuse and urge them to accept their low station',
        resultVi: '{friend} cắn chặt môi quay đi trong cay đắng. Khát vọng bị dập tắt để lại một vết nứt sâu hoắm không thể hàn gắn giữa hai người.',
        resultEn: '{friend} bit their lip in bitter silence. The crushed ambition left a permanent fissure across your bond.',
        effects: { sanity: -4 },
        bond: { friend: -18 }
      }
    ]
  },

  // =========================================================================
  // 6. PARTNER: THE BACK-TO-BACK CLASH
  // =========================================================================
  {
    id: 'quest_partner_combat_synergy',
    age: [18, 75],
    major: true,
    weight: 30,
    need: { npc: 'partner', noQuest: { role: 'partner', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Lưng kề lưng] Syndicate vây bạn và {partner} trong xưởng bỏ hoang. {partner} bị thương ở đùi nhưng vẫn chặn lối sau. Đạn đã lên nòng; hai người chỉ còn một đường phá vây.",
    en: '[Back-to-Back in the Rain] Inside an abandoned factory floor amidst a thundering storm, you and {partner} are cornered by a syndicate kill-squad armed with automatic subguns and machetes. Sparks shower from derelict conduits; {partner} bleeds from the thigh yet locks their back firmly against yours, breaths ragged beneath the thunder.',
    choices: [
      {
        labelVi: 'Lao vào đứng tựa lưng cùng {partner}, chém tan vòng vây',
        labelEn: 'Fight back-to-back, carving through the murderous ring',
        resultVi: 'Máu tanh hòa lẫn nước mưa buốt giá. Nhát chém của bạn gạt phăng đường đao chí mạng nhắm vào cổ {partner}, trong khi lưỡi kiếm của {partner} đâm xuyên tim kẻ mai phục sau lưng bạn. Cả hai đứng vững giữa đống xác kẻ thù, trở thành tri kỷ sinh tử không thể tách rời.',
        resultEn: 'Blood mingled with biting rain. Your parry deflected a lethal machete stroke aimed at {partner}’s jugular, while their blade impaled the flanker behind your shoulder. Standing battered amidst fallen foes, you forged a bond sealed in blood and steel.',
        effects: { health: -10, rep: +18, resonance: +12 },
        npcQuest: ['partner'],
        meritAdd: 16
      },
      {
        labelVi: 'Ném bom khói và lựu đạn chớp để cùng {partner} tẩu thoát qua cống',
        labelEn: 'Deploy smoke canisters and flash charges to extract through culverts',
        resultVi: 'Làn khói mù mịt che mắt toán sát thủ. Bạn ôm lấy eo {partner}, cùng nhau nhảy xuống nắp cống ngầm thoát hiểm. Giữa bóng tối dưới lòng đất, hai bàn tay đan chặt vào nhau, nhịp tim hòa cùng một nhịp đập kiên định.',
        resultEn: 'Blinding smoke engulfed the kill squad. Wrapping an arm around {partner}’s waist, you plunged together into the drainage conduits. In the subterranean gloom, your fingers intertwined, pulses beating in unbreakable rhythm.',
        effects: { sanity: +10, rep: +10 },
        npcQuest: ['partner'],
        meritAdd: 10
      }
    ]
  },

  // =========================================================================
  // 7. SPOUSE: THE WINTER SHELTER REPAIR
  // =========================================================================
  {
    id: 'quest_spouse_family_shelter',
    age: [18, 85],
    major: true,
    weight: 30,
    need: { npc: 'spouse', noQuest: { role: 'spouse', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Mái nhà thủng] Bão tro giật bật mái tôn phòng trọ. Mưa đen rơi xuống chỗ ngủ, còn {spouse} đang cố nhóm bếp bằng than vụn. Bạn phải tìm nơi trú trước khi căn phòng ngập nước.",
    en: "[A Roof in the Ash Storm] A gale of ash tears the tin roof off your rented room. Black rain falls on the bed, and {spouse} is trying to light the stove with coal dust. You have to find shelter before the room floods.",
    choices: [
      {
        labelVi: "Chi 15 Ahn mua tôn cách nhiệt và một bếp lò than để gia cố căn phòng",
        labelEn: "Spend 15 Ahn on insulated sheets and a coal stove to repair the room",
        resultVi: "Than đỏ lên và cái lạnh lùi ra khỏi góc phòng. Mái nhà được lợp lại chắc tay. {spouse} tựa đầu vào vai bạn và nghe gió rít ngoài khung cửa, lần đầu trong tuần không phải đếm giờ.",
        resultEn: "The coals glow red and the cold backs out of the corner. The roof is patched firmly. {spouse} rests their head on your shoulder and listens to the wind outside the frame, for the first time this week not counting the hours.",
        costAhn: 15,
        effects: { sanity: +18, rep: +6 },
        npcQuest: ['spouse'],
        meritAdd: 12
      },
      {
        labelVi: "Thức cả đêm ôm {spouse} và che gió bằng thân mình",
        labelEn: "Stay awake all night holding {spouse}, shielding them from the wind with your body",
        resultVi: "Gió tro rít từng cơn qua khe tôn, nhưng hơi ấm của hai người kề nhau đủ cho tới sáng. Sau đêm đó, hai người ít khi nhắc lại chuyện ấy, và cũng không quên.",
        resultEn: "The ash wind screams through the gaps in the tin, but the warmth of two people side by side lasts until morning. Afterwards neither of you talks about it much, and neither forgets.",
        effects: { health: -4, sanity: +12 },
        npcQuest: ['spouse'],
        meritAdd: 10
      }
    ]
  },

  // =========================================================================
  // 8. CYNICAL: THE COMPROMISED INFORMANT
  // =========================================================================
  {
    id: 'quest_cynical_informant_crisis',
    age: [18, 70],
    major: true,
    weight: 22,
    need: { npcTag: ['friend', 'cynical'], noQuest: { role: 'friend', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Ổ cứng của {friend}] {friend} ôm ổ cứng ghi các giao dịch đen của Syndicate, mắc kẹt trong bốt điện thoại vỡ kính. Tay súng của Middle đã chặn hai đầu ngõ. Lần này, người bán tin phải nhờ bạn.",
    en: '[The Informant’s Trap] {friend}, the cynical rumor-broker who never trusted a living soul in the City, is trapped inside a shattered phone booth. Their nimble fingers now tremble violently around a hard drive listing illicit syndicate transactions. Both ends of the alley are sealed by Middle enforcers.',
    choices: [
      {
        labelVi: 'Đột phá vòng vây của đám sát thủ, giải cứu kẻ buôn tin',
        labelEn: 'Breach the kill-box to extract the cornered broker',
        resultVi: 'Bạn chém gục hai tên đao phủ giữ cửa ngõ, kéo {friend} chạy thục mạng qua mạng lưới ống thông gió. An toàn trong căn cứ ngầm, {friend} nhìn bạn sững sờ: "Mày bị điên à? Tao chỉ là kẻ bán tin... Sao lại liều mạng vì tao?" Từ đêm đó, chiếc mặt nạ hoài nghi của người bạn rụng xuống.',
        resultEn: 'Cleaving two sentries at the mouth of the alley, you dragged {friend} through grease vents to safety. Panting in the basement hideout, they stared in disbelief: “Are you mad? I’m just a snitch... Why bleed for me?” From that night on, their cynical mask crumbled.',
        effects: { health: -10, rep: +14, network: +15 },
        npcQuest: ['friend'],
        meritAdd: 14
      },
      {
        labelVi: 'Dùng 20 Ahn đút lót cho tên đội trưởng Middle để mua lại mạng người',
        labelEn: 'Bribe the Middle commander with twenty Ahn to clear the bounty',
        resultVi: 'Gã chỉ huy nhận bọc tiền và gạch tên {friend} khỏi cuốn sổ thù hận tạm thời. {friend} thoát chết trong gang tấc, gật đầu thừa nhận: "Tao đã nghĩ trên đời này chỉ có tiền mới cứu được mạng người... Cảm ơn mày."',
        resultEn: 'The commander pocketed the purse, striking {friend}’s name from the ledger for now. Breathing free, they conceded softly: “I always thought coin was the only thing that bought life... Thank you.”',
        costAhn: 20,
        effects: { network: +12, rep: +8 },
        npcQuest: ['friend'],
        meritAdd: 10
      },
      {
        labelVi: 'Đứng ngoài cuộc, không can thiệp vào chuyện sống chết của kẻ bán tin',
        labelEn: 'Stay clear, refusing to bleed for a treacherous snitch',
        resultVi: 'Tiếng súng nổ giòn trong bốt điện thoại. Chiếc ổ cứng bị thu hồi, và {friend} vĩnh viễn không còn xuất hiện ở khu chợ tin tức nữa.',
        resultEn: 'Gunfire rattled inside the booth. The drive was retrieved, and {friend} never walked the information stalls again.',
        effects: { sanity: -6 },
        bond: { friend: -30 }
      }
    ]
  },

  // =========================================================================
  // 9. LOYAL: THE SHIELD's SACRIFICE
  // =========================================================================
  {
    id: 'quest_loyal_guardian_stand',
    age: [18, 75],
    major: true,
    weight: 22,
    need: { npcTag: ['friend', 'loyal'], noQuest: { role: 'friend', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Người chắn lựu đạn] {friend} đỡ quả lựu đạn thay bạn. Mảnh thép găm ở vai; người ấy chỉ quấn vội mảnh vải rồi bảo mình ổn. Máu đã thấm qua lớp băng.",
    en: '[The Living Shield’s Wound] During an ambush by alley Scavengers, {friend} hurled their body forward to smother a shrapnel grenade meant for you. Jagged steel embedded deep into their shoulder and ribs. {friend} bites through the agony, trying to bind it secretly with rags so as not to burden your purse.',
    choices: [
      {
        labelVi: 'Chi 14 Ahn đưa bạn đến phòng khám uy tín và túc trực phẫu thuật gắp mảnh đạn',
        labelEn: 'Spend fourteen Ahn at a certified clinic, overseeing shrapnel extraction',
        resultVi: 'Bác sĩ phẫu thuật gắp ra sáu mảnh sắt gỉ khỏi lồng ngực {friend}. Suốt ca mổ, bạn nắm chặt tay người bạn trung thành. Khi tỉnh dậy, {friend} nhìn thấy bạn vẫn ngồi đó, ánh mắt ngập tràn lòng trung trinh bất diệt.',
        resultEn: 'The surgeon extracted six rusted shards from their torso. Throughout the operation, you held their hand tight. Awakening to see you still at their bedside, {friend}’s loyalty hardened into diamond.',
        costAhn: 14,
        effects: { rep: +12, sanity: +10 },
        npcQuest: ['friend'],
        meritAdd: 12
      },
      {
        labelVi: 'Tự tay dùng kìm Workshop và cồn sát trùng gắp mảnh đạn cho bạn mình',
        labelEn: 'Personally extract the shrapnel with Workshop forceps and alcohol',
        resultVi: 'Giữa ánh đèn dầu bập bùng, bạn dùng bàn tay vững vàng gắp từng mảnh đạn ra khỏi thớ thịt của {friend}. Cơn đau xé ruột nhưng người bạn không kêu một tiếng. Tình nghĩa huynh đệ được tôi luyện qua máu và lửa.',
        resultEn: 'Beneath the lantern light, your steady hands extracted every splinter from torn muscle. The searing agony was met with silent endurance. Brotherhood was forged anew through blood and fire.',
        effects: { health: -4, rep: +10, sanity: +8 },
        npcQuest: ['friend'],
        meritAdd: 10
      }
    ]
  },

  // =========================================================================
  // 10. MENTOR: THE RETIRED BLADE's LEGACY
  // =========================================================================
  {
    id: 'quest_mentor_last_lesson',
    age: [20, 85],
    major: true,
    weight: 22,
    need: { npcTag: ['friend', 'mentor'], noQuest: { role: 'friend', max: 1 } },
    forbids: ['Distorted'],
    vi: "[Bài học cuối của người thầy] Người thầy Fixer ngồi trong xưởng, các khớp tay giả kêu rít. Ông mở rương, lấy ra thanh đao Workshop đã mòn: \"Ta sắp không cầm nổi nó. Nếu muốn nhận, hãy cho ta thấy bạn dùng nó thế nào.\"",
    en: '[The Old Master’s Final Lesson] The veteran Fixer who guided your rookie steps sits alone on a wooden crate in his dim forge. His prosthetic valves hiss with rusted friction; his rasping cough reeks of Smoke War fallout. Unlocking a brass coffer, he reveals a weathered yet razor-sharp Workshop blade:\n“My grip is failing me, kid. In this City, the truest legacy isn’t Ahn, it’s passing your steel to hands that won’t waver.”',
    choices: [
      {
        labelVi: 'Quỳ xuống hai tay đón nhận thanh đao, thề kế tục ý chí của người thầy',
        labelEn: 'Kneel and receive the heirloom blade, swearing to uphold their path',
        resultVi: 'Thanh đao đặt vào tay bạn nặng trịch và lạnh buốt, mang theo toàn bộ kinh nghiệm và vết sẹo của một đời chinh chiến. Vị tiền bối già mỉm cười mãn nguyện, vỗ mạnh vào vai bạn: "Đi đi, và đừng để con đao này phải hổ thẹn."',
        resultEn: 'The blade in your hands felt heavy and cold, bearing the weight of a lifetime of scars and triumphs. The old master smiled in deep fulfillment, clapping your shoulder: “Now go. And never let this steel feel shame.”',
        effects: { rep: +20, resonance: +16, sanity: +12 },
        flagsAdd: ['MentorLegacyHeir'],
        recordsAdd: ['master_blade_heir'],
        npcQuest: ['friend'],
        meritAdd: 18
      },
      {
        labelVi: 'Chi 18 Ahn mua dầu thủy lực cao cấp và linh kiện mới đại tu tay giả cho ông',
        labelEn: 'Spend eighteen Ahn on high-grade fluid and parts to overhaul their limbs',
        resultVi: 'Bạn dành cả đêm thay van và bơm dầu máy mới cho các khớp cơ khí của người thầy. Đôi tay kim loại của ông cử động trơn tru trở lại. Ông cười lớn, rót hai chén rượu mừng: "Thằng nhóc này... vẫn luôn biết cách làm ta bất ngờ."',
        resultEn: 'You spent the night flushing valves and lubricating the old mentor’s prosthetics. His pneumatic joints moved smooth as silk once more. Laughing heartily, he poured two cups of liquor: “You stubborn pup... still finding ways to surprise me.”',
        costAhn: 18,
        effects: { rep: +14, network: +15, sanity: +14 },
        npcQuest: ['friend'],
        meritAdd: 14
      }
    ]
  }
];
