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
    need: { npcTag: ['friend', 'gambler'], noQuest: { role: 'friend', max: 3 } },
    forbids: ['Distorted'],
    vi: "[Nợ sòng bạc] Bảo kê ép {friend} vào thùng rác sau sòng bạc. Tên cầm đầu giơ sổ nợ: \"Tiền cược đã mất. Trả trước nửa đêm, hoặc bọn tao lấy hai bàn tay.\" {friend} không dám nhìn bạn.",
    en: '[Casino debt] The protection crew pins {friend} against a dumpster behind the casino. Their leader raises a ledger: “The wager is gone. Pay by midnight, or we take both hands.” {friend} cannot meet your eyes.',
    choices: [
      {
        labelVi: 'Đặt tiền lên mặt thùng phi, chuộc người bạn ra',
        labelEn: 'Slap fifteen Ahn onto the drum to settle the debt',
        resultVi: "Bạn trả tiền. Bọn bảo kê gạch nợ rồi đẩy {friend} về phía bạn. Hai bàn tay người ấy vẫn còn nguyên. {friend} nói sẽ không quay lại sòng bạc.",
        resultEn: 'You pay. The enforcers cross out the debt and push {friend} toward you. Both hands remain intact. {friend} says they will not return to the casino.',
        costAhn: 15,
        effects: { rep: +8, sanity: +6 },
        npcQuest: ['friend'],
        meritAdd: 8
      },
      {
        labelVi: 'Rút vũ khí uy hiếp đám chủ nợ lùi lại',
        labelEn: 'Draw steel and break their perimeter through lethal intent',
        resultVi: "Bạn chém gãy xà beng của tên cầm đầu. Đám bảo kê lùi khỏi {friend}, nhưng cuốn sổ nợ vẫn nằm trong tay chúng. {friend} theo bạn ra khỏi ngõ, im lặng suốt đường về.",
        resultEn: 'You break the leader’s crowbar with your blade. The enforcers back away from {friend}, but keep the ledger. {friend} follows you out of the alley without a word.',
        effects: { health: -8, rep: +12, heat: +10 },
        npcQuest: ['friend'],
        meritAdd: 10
      },
      {
        labelVi: 'Khoanh tay đứng nhìn, để bạn mình tự trả giá cho sự ngu muội',
        labelEn: 'Fold your arms and let them face the consequences of folly',
        resultVi: 'Tiếng ngón tay gãy vang lên trong ngõ. Đám bảo kê bỏ đi; {friend} ôm bàn tay bị thương và bước qua bạn, không ngẩng đầu.',
        resultEn: 'Fingers snap in the alley. The enforcers leave; {friend} cradles their injured hand and walks past you without looking up.',
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
    need: { back: true, npcTag: ['friend', 'sickly'], noQuest: { role: 'friend', max: 3 } },
    forbids: ['Distorted'],
    vi: "[Thuốc giữa mùa đông] {friend} ho ra máu trong căn gác lạnh. Một phòng khám chui có ống huyết thanh K Corp đủ giữ người ấy qua đêm, nhưng đòi trả tiền trước. Bạn nghe tiếng ho phía sau cánh cửa.",
    en: '[Medicine in winter] {friend} coughs blood in the cold attic. An unlicensed clinic has a K Corp serum that could keep them alive tonight, but demands payment first. You hear another cough behind the door.',
    choices: [
      {
        labelVi: 'Mua lọ huyết thanh K Corp cứu {friend}',
        labelEn: 'Spend twelve Ahn on the regenerative serum vial',
        resultVi: 'Cơn co giật của {friend} dịu xuống sau khi tiêm thuốc. Người ấy mở mắt, nắm lấy tay bạn rồi ngủ tiếp. Y tá bảo đêm nay đã qua cơn nguy.',
        resultEn: 'The spasms ease after the injection. {friend} opens their eyes, grips your hand, and falls asleep again. The nurse says they will make it through tonight.',
        costAhn: 12,
        effects: { sanity: +12, rep: +6 },
        npcQuest: ['friend'],
        meritAdd: 10
      },
      {
        labelVi: 'Thức bốn đêm chườm nước ấm và chăm sóc tại nhà',
        labelEn: 'Vigil through four sleepless nights with herbal compresses',
        resultVi: 'Bạn thay khăn và đun nước suốt bốn đêm. Đến rạng sáng ngày thứ năm, cơn sốt hạ. {friend} xin nước uống rồi hỏi bạn đã ngủ lúc nào.',
        resultEn: 'You change cloths and boil water through four nights. At dawn on the fifth day, the fever breaks. {friend} asks for a drink, then asks when you last slept.',
        effects: { health: -6, sanity: +8, rep: +8 },
        npcQuest: ['friend'],
        meritAdd: 8
      },
      {
        labelVi: 'Quay đi, để {friend} tự chống chọi qua đêm',
        labelEn: 'Leave their survival to the City’s merciless natural order',
        resultVi: '{friend} qua khỏi sau mấy ngày sốt nặng nhưng từ đó tránh mặt bạn mỗi khi gặp ngoài ngõ.',
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
    need: { npcTag: ['friend', 'proud'], noQuest: { role: 'friend', max: 3 } },
    forbids: ['Distorted'],
    vi: "[Lời thách ở chợ] Một tay Syndicate hất canh lên áo {friend}, rồi tát người ấy trước đám đông. {friend} rút dao gấp; đối thủ mặc giáp và đã gọi đàn em lại. Bạn đứng đủ gần để ngăn trận đấu.",
    en: '[A challenge at the market] A Syndicate man spills soup on {friend}’s coat, then slaps them in front of the crowd. {friend} draws a folding knife; the man wears armor and has called his crew. You are close enough to stop the fight.',
    choices: [
      {
        labelVi: 'Bước lên đứng kề vai, cùng bạn mình tuốt kiếm đối đầu',
        labelEn: 'Step shoulder-to-shoulder, drawing your blade in unison',
        resultVi: 'Bạn đứng cạnh {friend}, cùng rút dao. Gã kia đếm lại số người trong đám đông rồi ra hiệu cho đàn em lùi. {friend} gấp dao, nhìn bạn: "Lần sau để tao trả phần này."',
        resultEn: 'You stand beside {friend} and draw your blade. The man counts the people watching, then signals his crew to back off. {friend} folds their knife. “Next time, let me repay this.”',
        effects: { health: -6, rep: +14, resonance: +10 },
        npcQuest: ['friend'],
        meritAdd: 12
      },
      {
        labelVi: 'Bước vào giữa nói đỡ và mời gã vò rượu mạnh',
        labelEn: 'Tactfully intercede, offering the bouncer a jug of high-proof liquor',
        resultVi: 'Bạn mua vò rượu ở quầy bên cạnh đưa cho tên côn đồ. Gã cầm vò rượu rồi dẫn đàn em đi tiếp; {friend} lau vết canh trên áo.',
        resultEn: 'Expending eight Ahn on the market’s strongest spirit, you stepped between them with easy charm, defusing the brawl. The brute walked away satisfied. Bloodshed was averted without trampling your companion’s pride.',
        costAhn: 8,
        effects: { rep: +8, network: +10 },
        npcQuest: ['friend'],
        meritAdd: 8
      },
      {
        labelVi: 'Đứng ngoài nhìn {friend} chịu đòn',
        labelEn: 'Stand aside as they take a brutal beating in the dirt',
        resultVi: '{friend} bị đánh ngã xuống đất giữa chợ. Khi đám côn đồ đi khỏi, họ tự đứng dậy và không nhìn về phía bạn.',
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
    need: { npcTag: ['friend', 'secretive'], noQuest: { role: 'friend', max: 3 } },
    forbids: ['Distorted'],
    vi: "[Hồ sơ cũ] Thám tử Seven giơ chân dung {friend} cùng hồ sơ của Wing đã sụp đổ. {friend} lùi sau lưng bạn, tay đặt lên dao găm. \"Nếu họ dẫn tao đi, đội thanh trừng sẽ tới trước khi trời sáng.\"",
    en: '[Shadow of Yesterday] Cold drizzle coats the alleyway. A trench-coated investigator from Seven Association Section 4 lingers under a flickering streetlamp, holding a charcoal sketch of {friend} and a sealed docket from a fallen Wing. {friend} turns porcelain-white, retreating behind the door with white-knuckled grip on a dagger: “They traced my scent... The Wing’s purge cells won’t leave me breathing if dragged back.”',
    choices: [
      {
        labelVi: 'Đánh lạc hướng thám tử, lấy trộm hồ sơ rồi đốt đi',
        labelEn: 'Mislead the investigator, pickpocket the file and burn it to ash',
        resultVi: 'Bạn chỉ hướng giả cho thám tử, rút tập tài liệu khỏi túi áo hắn rồi ném vào lò than. Khi con hẻm vắng lại, {friend} kể tên thật và lý do rời Wing năm xưa.',
        resultEn: 'You fed the detective an airtight false trail, expertly lifted the dossier, and hurled it into glowing furnace coals. The threat dissolved in smoke. For the first time, {friend} wept softly, whispering their true name and the nightmare they fled.',
        effects: { network: +10, heat: +8, sanity: +8 },
        npcQuest: ['friend'],
        meritAdd: 12
      },
      {
        labelVi: 'Đút lót để thám tử Seven khép lại hồ sơ',
        labelEn: 'Bribe the Seven investigator with eighteen Ahn to close the inquiry',
        resultVi: 'Viên thám tử nhận bọc tiền, đóng dấu "Mục tiêu đã chết trong tai nạn Singularity" vào hồ sơ rồi rời đi.',
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
    need: { npcTag: ['friend', 'ambitious'], noQuest: { role: 'friend', max: 3 } },
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
        labelVi: 'Đóng khoản tiền ký quỹ giúp {friend}',
        labelEn: 'Provide the sixteen Ahn bond from your own purse',
        resultVi: 'Khoản tiền ký quỹ giúp {friend} được nhận vào Office. Chiều hôm đó họ mang hợp đồng về khoe với bạn.',
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
    need: { npc: 'partner', noQuest: { role: 'partner', max: 3 } },
    forbids: ['Distorted'],
    vi: "[Lưng kề lưng] Syndicate vây bạn và {partner} trong xưởng bỏ hoang. {partner} bị thương ở đùi nhưng vẫn chặn lối sau. Đạn đã lên nòng; hai người chỉ còn một đường phá vây.",
    en: '[Back to back] A Syndicate crew corners you and {partner} in an abandoned factory. {partner} has a cut on the thigh but holds the rear exit. The crew has loaded its guns; you have one route through them.',
    choices: [
      {
        labelVi: 'Lao vào đứng tựa lưng cùng {partner}, chém tan vòng vây',
        labelEn: 'Fight back-to-back, carving through the murderous ring',
        resultVi: 'Bạn gạt lưỡi dao nhắm vào {partner}; người ấy đẩy kẻ phía sau khỏi lối ra. Hai người chạy được qua cửa xưởng. Đến lúc dừng lại, {partner} mới chịu cho bạn băng vết thương.',
        resultEn: 'You parry a blade aimed at {partner}; they push the attacker behind you away from the exit. You both get through the factory door. Only when you stop does {partner} let you bandage the wound.',
        effects: { health: -10, rep: +18, resonance: +12 },
        npcQuest: ['partner'],
        meritAdd: 16
      },
      {
        labelVi: 'Ném bom khói và lựu đạn chớp để cùng {partner} rút qua cống',
        labelEn: 'Deploy smoke canisters and flash charges to extract through culverts',
        resultVi: 'Khói mù che khuất tầm nhìn của toán sát thủ, đủ cho bạn kéo {partner} xuống đường cống ngầm thoát ra ngoài.',
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
    need: { npc: 'spouse', noQuest: { role: 'spouse', max: 3 } },
    forbids: ['Distorted'],
    vi: "[Mái nhà thủng] Bão tro giật bật mái tôn phòng trọ. Mưa đen rơi xuống chỗ ngủ, còn {spouse} đang cố nhóm bếp bằng than vụn. Bạn phải tìm nơi trú trước khi căn phòng ngập nước.",
    en: "[A Roof in the Ash Storm] A gale of ash tears the tin roof off your rented room. Black rain falls on the bed, and {spouse} is trying to light the stove with coal dust. You have to find shelter before the room floods.",
    choices: [
      {
        labelVi: "Mua tôn cách nhiệt và bếp lò than để sửa lại phòng",
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
    need: { npcTag: ['friend', 'cynical'], noQuest: { role: 'friend', max: 3 } },
    forbids: ['Distorted'],
    vi: "[Ổ cứng của {friend}] {friend} ôm ổ cứng ghi các giao dịch đen của Syndicate, mắc kẹt trong bốt điện thoại vỡ kính. Tay súng của Middle đã chặn hai đầu ngõ. Lần này, người bán tin phải nhờ bạn.",
    en: '[{friend}’s drive] {friend} is trapped in a broken phone booth with a drive of Syndicate transactions. Middle gunmen block both ends of the alley. The information broker has to ask you for help.',
    choices: [
      {
        labelVi: 'Đột phá vòng vây của đám sát thủ, giải cứu kẻ buôn tin',
        labelEn: 'Breach the kill-box to extract the cornered broker',
        resultVi: 'Bạn đánh bật hai tay súng rồi kéo {friend} qua đường thông gió. Trong chỗ trú, người ấy ôm ổ cứng nhìn bạn: "Mày biết nó chứa gì mà vẫn quay lại?" Lần đầu, {friend} kể bạn nghe một phần.',
        resultEn: 'You drive back the two gunmen and pull {friend} through a service duct. In the safe room, they clutch the drive. “You knew what was on it and came back?” For once, {friend} tells you part of the answer.',
        effects: { health: -10, rep: +14, network: +15 },
        npcQuest: ['friend'],
        meritAdd: 14
      },
      {
        labelVi: 'Đút lót tên đội trưởng Middle để mua lại mạng người',
        labelEn: 'Bribe the Middle commander with twenty Ahn to clear the bounty',
        resultVi: 'Gã chỉ huy nhận bọc tiền và gạch tên {friend} khỏi sổ thù hận. {friend} bước ra khỏi bốt điện thoại, gật đầu cảm ơn bạn.',
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
    need: { npcTag: ['friend', 'loyal'], noQuest: { role: 'friend', max: 3 } },
    forbids: ['Distorted'],
    vi: "[Người chắn lựu đạn] {friend} đỡ quả lựu đạn thay bạn. Mảnh thép găm ở vai; người ấy chỉ quấn vội mảnh vải rồi bảo mình ổn. Máu đã thấm qua lớp băng.",
    en: '[The Living Shield’s Wound] During an ambush by alley Scavengers, {friend} hurled their body forward to smother a shrapnel grenade meant for you. Jagged steel embedded deep into their shoulder and ribs. {friend} bites through the agony, trying to bind it secretly with rags so as not to burden your purse.',
    choices: [
      {
        labelVi: 'Đưa {friend} đến phòng khám mổ gắp mảnh đạn',
        labelEn: 'Spend fourteen Ahn at a certified clinic, overseeing shrapnel extraction',
        resultVi: 'Bác sĩ gắp ra sáu mảnh sắt gỉ khỏi vai {friend}. Bạn ngồi cạnh giường bệnh đến khi người ấy tỉnh thuốc mê.',
        resultEn: 'The surgeon extracted six rusted shards from their torso. Throughout the operation, you held their hand tight. Awakening to see you still at their bedside, {friend}’s loyalty hardened into diamond.',
        costAhn: 14,
        effects: { rep: +12, sanity: +10 },
        npcQuest: ['friend'],
        meritAdd: 12
      },
      {
        labelVi: 'Tự dùng kìm Workshop và cồn sát trùng gắp mảnh đạn',
        labelEn: 'Personally extract the shrapnel with Workshop forceps and alcohol',
        resultVi: 'Dưới ánh đèn dầu, bạn dùng kìm gắp từng mảnh đạn khỏi bả vai {friend} rồi khâu lại. Người ấy cắn răng chịu đau không kêu nửa lời.',
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
    need: { npcTag: ['friend', 'mentor'], noQuest: { role: 'friend', max: 3 } },
    forbids: ['Distorted'],
    vi: "[Bài học cuối của người thầy] Người thầy Fixer ngồi trong xưởng, các khớp tay giả kêu rít. Ông mở rương, lấy ra thanh đao Workshop đã mòn: \"Ta sắp không cầm nổi nó. Nếu muốn nhận, hãy cho ta thấy bạn dùng nó thế nào.\"",
    en: '[The mentor’s last lesson] The veteran Fixer sits in the workshop, prosthetic joints creaking. He opens a case and lifts out a worn Workshop blade. “Soon I won’t be able to hold it. If you want it, show me how you would use it.”',
    choices: [
      {
        labelVi: 'Nhận thanh đao cũ và hứa giữ nghề của người thầy',
        labelEn: 'Kneel and receive the heirloom blade, swearing to uphold their path',
        resultVi: 'Thanh đao đặt vào tay bạn nặng và lạnh. Người thầy nhìn bạn tra đao vào vỏ rồi vỗ vai: "Đi đi, giữ cho lưỡi đao đừng gỉ."',
        resultEn: 'The blade in your hands felt heavy and cold, bearing the weight of a lifetime of scars and triumphs. The old master smiled in deep fulfillment, clapping your shoulder: “Now go. And never let this steel feel shame.”',
        effects: { rep: +20, resonance: +16, sanity: +12 },
        flagsAdd: ['MentorLegacyHeir'],
        recordsAdd: ['master_blade_heir'],
        npcQuest: ['friend'],
        meritAdd: 18
      },
      {
        labelVi: 'Mua dầu thủy lực và linh kiện mới đại tu tay giả cho ông',
        labelEn: 'Spend eighteen Ahn on high-grade fluid and parts to overhaul their limbs',
        resultVi: 'Bạn dành cả đêm thay van và bơm dầu máy mới cho các khớp cơ khí của người thầy. Tay kim loại cử động trơn tru trở lại; ông rót hai chén rượu mời bạn.',
        resultEn: 'You spent the night flushing valves and lubricating the old mentor’s prosthetics. His pneumatic joints moved smooth as silk once more. Laughing heartily, he poured two cups of liquor: “You stubborn pup... still finding ways to surprise me.”',
        costAhn: 18,
        effects: { rep: +14, network: +15, sanity: +14 },
        npcQuest: ['friend'],
        meritAdd: 14
      }
    ]
  }
];
