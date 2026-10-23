// ============================================================================
// NPC DYNAMICS & WORLD EXPANSION EVENTS (MAJOR, CONSEQUENCE, CONTRACTS)
// Strictly follows Project Moon universe lore, bilingual (vi/en), no em-dashes.
// ============================================================================

export const EXPANSION_STORY_EVENTS = [
  // --------------------------------------------------------------------------
  // 1. NPC DYNAMICS MAJORS (Friction, Betrayal, Camaraderie, Nemesis)
  // --------------------------------------------------------------------------
  {
    id: 'npc_partner_ambush_fallout',
    age: [20, 60],
    major: true,
    weight: 28,
    need: { npc: 'partner', bondAtMost: ['partner', 28] },
    tags: ['friction', 'combat', 'npc'],
    forbids: ['partner_ambush_fallout_done'],
    vi: '[Vết nứt giữa làn đạn] Trong một cuộc phục kích tại khu nhà kho bỏ hoang, {partner} không bọc sườn cho bạn như đã giao ước mà lùi lại giữ khoảng cách an toàn. Bạn phải tự chống đỡ ba tay súng trước khi đẩy lùi được chúng. Khi khói súng tan, {partner} tra vũ khí vào bao với vẻ mặt lạnh tanh.',
    en: '[Friction in the Crossfire] During an ambush at an abandoned warehouse, {partner} did not cover your flank as agreed, stepping back to hold a safe distance. You had to fend off three gunmen alone before driving them off. When the smoke cleared, {partner} sheathed their weapon with a cold, unreadable face.',
    choices: [
      {
        labelVi: 'Chĩa thẳng mũi vũ khí vào mặt {partner}, yêu cầu giải thích rõ ràng',
        labelEn: 'Level your weapon straight at {partner}, demanding a blunt explanation',
        resultVi: '{partner} nhếch mép gạt mũi vũ khí của bạn ra: "Ở The City, kẻ không tự lo được cho mình thì sớm muộn cũng thành xác chết. Đừng mong tôi chết thay bạn." Rạn nứt giữa hai người đã chạm đến đáy.',
        resultEn: '{partner} smirked and brushed your weapon aside: "In The City, whoever cannot save their own skin ends up a corpse. Do not expect me to die in your place." The rift between you reached bedrock.',
        effects: { sanity: -8, rep: +5 },
        bond: { partner: -15 },
        flagsAdd: ['partner_ambush_fallout_done', 'PartnerTensionHigh']
      },
      {
        labelVi: 'Nuốt giận, lặng lẽ băng bó vết thương và ghi nhớ mối nguy này',
        labelEn: 'Swallow your anger, bind your wounds in silence, and remember the threat',
        resultVi: 'Bạn không nói một lời, xé dải vải quấn chặt vết đạn ở bắp tay. Sự im lặng giữa hai người kéo dài suốt chặng đường về. Niềm tin đã chết, chỉ còn lại sự đề phòng cẩn mật.',
        resultEn: 'You uttered not a word, tearing a cloth strip to bind the bullet wound on your arm. The silence between you lingered the entire trek back. Trust died, replaced by vigilant wariness.',
        effects: { health: -10, sanity: -5 },
        bond: { partner: -8 },
        flagsAdd: ['partner_ambush_fallout_done']
      }
    ]
  },
  {
    id: 'npc_partner_contract_treachery',
    age: [22, 65],
    major: true,
    weight: 22,
    need: { npc: 'partner', bondAtMost: ['partner', 20] },
    requires: ['PartnerTensionHigh'],
    forbids: ['partner_treachery_resolved'],
    tags: ['betrayal', 'combat', 'npc'],
    vi: '[Nhát dao trong ngõ tối] Nhận tiền thù lao từ thân chủ xong, {partner} bất ngờ rút vũ khí tấn công bạn ngay trong hẻm tối nhằm chiếm trọn phần thưởng và bán thông tin lộ trình của bạn cho đối thủ.',
    en: '[Blade in the Alleyway] Right after collecting the contract payout, {partner} drew their weapon against you in a shadowed alley, aiming to pocket the entire sum and sell your patrol route to rivals.',
    choices: [
      {
        labelVi: 'Ra tay tàn nhẫn, đánh gục {partner} và tước vũ khí của họ',
        labelEn: 'Strike mercilessly, subduing {partner} and stripping their weapon',
        outcomes: [
          {
            w: 60,
            resultVi: 'Kinh nghiệm chiến đấu vượt trội giúp bạn áp đảo {partner}, găm lưỡi dao xuyên qua mu bàn tay họ xuống nền gạch. {partner} ôm vết thương tháo chạy, thề sẽ quay lại đoạt mạng bạn.',
            resultEn: 'Superior combat experience let you overpower {partner}, pinning their hand to the cobblestone with steel. {partner} fled clutching the wound, swearing bloody vengeance.',
            effects: { health: -12, sanity: -10, wealth: +25, rep: +12, heat: +10 },
            npcFate: { partner: 'betrayer' },
            flagsAdd: ['partner_treachery_resolved'],
            scheduleConsequences: [
              {
                eventId: 'csq_npc_betrayer_ambush',
                delayYears: 2,
                reasonVi: '{partner} đang tập hợp sát thủ để phục kích bạn',
                reasonEn: '{partner} is gathering cutthroats to ambush you'
              }
            ]
          },
          {
            w: 40,
            resultVi: 'Hai bên giằng co dữ dội; một vết chém sâu xé toạc mạn sườn bạn trước khi {partner} cướp lấy túi Ahn rồi biến mất vào mê cung Backstreets.',
            resultEn: 'A brutal grapple ensued; a deep slash tore across your ribs before {partner} snatched the Ahn pouch and vanished into the Backstreet labyrinth.',
            effects: { health: -28, sanity: -18, wealth: -20, rep: -5 },
            scarsAdd: ['Vết sẹo phản bội từ đồng đội'],
            npcFate: { partner: 'betrayer' },
            flagsAdd: ['partner_treachery_resolved'],
            scheduleConsequences: [
              {
                eventId: 'csq_npc_betrayer_ambush',
                delayYears: 1,
                reasonVi: '{partner} quyết tâm truy cùng diệt tận bạn',
                reasonEn: '{partner} intends to hunt you down for good'
              }
            ]
          }
        ]
      },
      {
        labelVi: 'Ném túi tiền công lại để thoát thân khỏi vòng vây',
        labelEn: 'Toss the coin purse back to break out of the encirclement',
        resultVi: 'Bạn quẳng túi Ahn xuống đất; {partner} khựng lại một nhịp để chụp lấy túi tiền, đủ cho bạn phóng mình qua tường rào trốn thoát. Người bạn từng tin tưởng nay đã chính thức trở thành kẻ thù truyền kiếp.',
        resultEn: 'You flung the Ahn purse to the cobbles; {partner} hesitated a beat to grab it, giving you time to vault the wall and escape. The comrade you once trusted is now a sworn nemesis.',
        effects: { wealth: -30, sanity: -12, rep: -8 },
        npcFate: { partner: 'betrayer' },
        flagsAdd: ['partner_treachery_resolved']
      }
    ]
  },
  {
    id: 'npc_sworn_brotherhood_pact',
    age: [21, 55],
    major: true,
    weight: 26,
    need: { npc: 'partner', bondAtLeast: ['partner', 75] },
    forbids: ['sworn_brotherhood_done'],
    tags: ['loyalty', 'camaraderie', 'npc'],
    vi: '[Chén rượu thề ngõ hẻm] Sau khi cùng nhau sống sót qua mười hai hợp đồng sinh tử, {partner} mang đến một bầu rượu mạnh nấu từ thảo dược Outskirts. "Ở nơi này người ta bán mạng rẻ như rác. Nhưng nếu hai ta cùng bước, ít nhất lưng của mỗi người sẽ có kẻ canh chừng."',
    en: '[Blood Oath in the Backstreet] After surviving twelve lethal contracts side by side, {partner} brought a flask of harsh spirit brewed from Outskirts herbs. "In this place, lives are bought cheap as dirt. But if we walk together, at least our backs are covered."',
    choices: [
      {
        labelVi: 'Cắt máu ăn thề, kết nghĩa huynh đệ vào sinh ra tử cùng {partner}',
        labelEn: 'Cut palms and swear a blood oath of brotherhood with {partner}',
        resultVi: 'Hai bàn tay nắm chặt rỉ máu; sự tin tưởng tuyệt đối giữa The City lạnh giá là thứ tài sản quý giá hơn vạn lượng Ahn. Từ nay, hiểm nguy nào cũng có hai người cùng gánh.',
        resultEn: 'Clasping bleeding palms, absolute trust in this frozen City proved more precious than ten thousand Ahn. From now on, every danger is met together.',
        effects: { sanity: +18, rep: +15 },
        bond: { partner: 25 },
        flagsAdd: ['sworn_brotherhood_done', 'SwornComradePact'],
        scarsAdd: ['Vết rạch thề sinh tử']
      },
      {
        labelVi: 'Nâng chén uống cạn nhưng giữ sự chừng mực chuyên nghiệp',
        labelEn: 'Drain the cup in respect while keeping professional distance',
        resultVi: 'Bạn cạn chén rượu cay nồng nhưng từ chối nghi thức cắt máu. {partner} hiểu sự cẩn trọng của bạn và gật đầu tôn trọng: một mối quan hệ đối tác vững chắc không cần lời thề hoa mỹ.',
        resultEn: 'You drank the searing liquor but politely declined the blood oath. {partner} understood your caution and nodded respectfully: a sturdy partnership needs no ornate vows.',
        effects: { sanity: +8, rep: +8 },
        bond: { partner: 10 },
        flagsAdd: ['sworn_brotherhood_done']
      }
    ]
  },
  {
    id: 'npc_childhood_friend_crossroads',
    age: [18, 30],
    major: true,
    weight: 24,
    need: { npc: 'friend' },
    forbids: ['friend_crossroads_done'],
    tags: ['npc', 'backstreets'],
    vi: '[Ngã rẽ thời niên thiếu] {friend} tìm đến bạn trong hơi men nồng nặc. Họ vừa nhận được lời mời gia nhập một Syndicate ngón tay khét tiếng, trong khi bạn đang theo đuổi con đường riêng. "Nếu tao bước chân vào đó, có thể ngày nào đó chúng ta sẽ phải rút dao chém nhau."',
    en: '[Crossroads of Youth] {friend} sought you out smelling heavily of spirits. They just received an offer to join a notorious Finger syndicate, while you walk your own path. "If I take this oath, one day we might have to draw blades against each other."',
    choices: [
      {
        labelVi: 'Khuyên {friend} từ bỏ con đường đẫm máu đó, đề nghị cùng làm việc',
        labelEn: 'Urge {friend} away from that bloody road, offering to work together',
        resultVi: '{friend} nhìn vào mắt bạn rất lâu rồi gật đầu, xé nát bức thư triệu tập. Hai người cùng chia nhau ổ bánh mì cũ, thề giữ lấy sự thanh thản giữa bùn lầy.',
        resultEn: '{friend} held your gaze for a long time, then nodded and tore the summons to shreds. You split an old loaf of bread, swearing to keep your peace amid the mire.',
        effects: { sanity: +12, wealth: -10 },
        bond: { friend: 18 },
        flagsAdd: ['friend_crossroads_done']
      },
      {
        labelVi: 'Cạn ly chúc {friend} may mắn, tôn trọng lựa chọn sinh tồn của họ',
        labelEn: 'Raise a glass to their luck, respecting their choice of survival',
        resultVi: '"Bảo trọng nhé, bạn hiền." Chiếc cốc va vào nhau leng keng. Từ ngày mai, hai người là hai bánh răng thuộc hai guồng máy khác nhau của The City.',
        resultEn: '"Stay breathing, old friend." Your mugs clinked together. From tomorrow, you are two cogs belonging to entirely different machinery in The City.',
        effects: { rep: +8, sanity: -4 },
        bond: { friend: 5 },
        flagsAdd: ['friend_crossroads_done', 'FriendInSyndicate']
      }
    ]
  },
  {
    id: 'npc_friend_desperate_extortion',
    age: [20, 50],
    major: true,
    weight: 22,
    need: { npc: 'friend', bondAtMost: ['friend', 22] },
    requires: ['FriendInSyndicate'],
    forbids: ['friend_extortion_done'],
    tags: ['friction', 'syndicate', 'npc'],
    vi: '[Món nợ bảo kê] {friend} dẫn một toán côn đồ Syndicate đến trước cửa nhà bạn. Trên mặt họ không còn chút nét thân quen thuở nhỏ, chỉ có sự lạnh lùng của một tay đòi nợ thuê: "Luật khu vực này vừa đổi. Nộp 30 Ahn tiền bảo kê tháng này, hoặc chúng tôi phải đập nát đồ đạc."',
    en: '[Protection Extortion] {friend} brought a squad of syndicate enforcers right to your door. No trace of childhood warmth remained on their face, only the callous chill of a collector: "District rules changed. Pay 30 Ahn in protection dues this month, or we tear this flat apart."',
    choices: [
      {
        labelVi: 'Đấm thẳng vào quai hàm {friend}, đuổi cả toán ra khỏi cửa',
        labelEn: 'Drive a punch straight into {friend}’s jaw and kick the gang out',
        outcomes: [
          {
            w: 55,
            resultVi: 'Cú đấm chuẩn xác khiến {friend} ngã nhào ra hành lang. Toán côn đồ e dè uy lực của bạn nên vội vã đỡ bạn mình dậy rồi rút lui trong tiếng chửi rủa.',
            resultEn: 'A precise blow sent {friend} sprawling into the hallway. Wary of your grit, the enforcers hauled their mate up and retreated with venomous curses.',
            effects: { health: -8, rep: +15, heat: +15 },
            bond: { friend: -20 },
            flagsAdd: ['friend_extortion_done']
          },
          {
            w: 45,
            resultVi: 'Toán côn đồ lao vào ẩu đả kịch liệt. Bạn đánh đuổi được chúng nhưng đồ đạc trong nhà vỡ vụn và bản thân dính vài vết bầm dập.',
            resultEn: 'A frantic scuffle broke out. You drove them off, but your room was trashed and your ribs bruised to purple.',
            effects: { health: -18, sanity: -12, wealth: -10, heat: +20 },
            bond: { friend: -25 },
            flagsAdd: ['friend_extortion_done']
          }
        ]
      },
      {
        labelVi: 'Ném tiền ra và tuyên bố tình bạn chấm dứt tại đây',
        labelEn: 'Throw down the coin and declare the friendship dead on the spot',
        resultVi: '{friend} cúi nhặt từng đồng tiền rơi trên sàn nhà mà không dám ngẩng lên nhìn bạn. Cánh cửa đóng sập lại, khép lại ký ức về thời thơ ấu bên nhau.',
        resultEn: '{friend} picked up the scattered coins without daring to meet your eyes. The door slammed shut, putting an end to childhood memories forever.',
        effects: { wealth: -30, sanity: -10 },
        bond: { friend: -30 },
        flagsAdd: ['friend_extortion_done']
      }
    ]
  },
  {
    id: 'npc_mentor_final_philosophy_duel',
    age: [28, 55],
    major: true,
    weight: 22,
    need: { npc: 'mentor', bondAtLeast: ['mentor', 70] },
    forbids: ['mentor_final_duel_done'],
    tags: ['combat', 'loyalty', 'npc'],
    vi: '[Bài học cuối cùng trên mái nhà] Dưới ánh trăng mờ đục của Backstreets, {mentor} rút vũ khí ra khỏi bao và chỉ thẳng vào ngực bạn: "Mọi kỹ thuật ta biết, con đều đã thuần thục. Nhưng kiếm thuật thực sự chỉ nở rộ khi con vượt qua cái bóng của người dạy dỗ mình. Đêm nay, đừng nương tay."',
    en: '[Final Lesson upon the Rooftop] Under the dull moonlight of the Backstreets, {mentor} drew their weapon and leveled it at your chest: "Every technique I possess, you have mastered. But true craft only blooms when you surpass the shadow of your teacher. Tonight, do not hold back."',
    choices: [
      {
        labelVi: 'Vung toàn lực quyết đấu, khắc ghi từng chiêu thức của {mentor}',
        labelEn: 'Engage with all your might, etching every clash with {mentor} into memory',
        outcomes: [
          {
            w: 55,
            resultVi: 'Hai lưỡi thép chạm nhau nảy lửa. Một đường phản đòn sắc bén của bạn hất văng vũ khí của {mentor}. Người thầy mỉm cười gật đầu, tự hào trao lại cho bạn tín vật truyền thừa.',
            resultEn: 'Steel clattered with sparks. A razor-sharp counter parried {mentor}’s weapon into the night air. The mentor smiled proudly, passing down their master seal.',
            effects: { health: -15, sanity: +25, rep: +30, resonance: +15 },
            meritAdd: 35,
            bond: { mentor: 20 },
            flagsAdd: ['mentor_final_duel_done', 'SurpassedMentor'],
            scarsAdd: ['Vết kiếm truyền thừa']
          },
          {
            w: 45,
            resultVi: '{mentor} vẫn nhỉnh hơn bạn nửa nhịp kiếm, để lại một vết rạch nông trên vai bạn. Dẫu thua, bạn đã cảm nhận được cảnh giới cao nhất của đường kiếm.',
            resultEn: '{mentor} still held a half-beat edge, leaving a shallow line across your shoulder. Though bested, you touched the highest horizon of the blade.',
            effects: { health: -22, sanity: +15, rep: +18, resonance: +12 },
            meritAdd: 20,
            bond: { mentor: 15 },
            flagsAdd: ['mentor_final_duel_done']
          }
        ]
      },
      {
        labelVi: 'Thu kiếm cúi đầu, bày tỏ lòng biết ơn thay vì giao đấu',
        labelEn: 'Sheathe your blade and bow low, expressing gratitude over bloodshed',
        resultVi: '{mentor} thở dài thu vũ khí, vỗ vai bạn với ánh mắt bao dung: "Giữ được lòng nhân từ trong thành phố tàn bạo này là một lựa chọn dũng cảm, dù nó sẽ khiến con phải trả giá đắt."',
        resultEn: '{mentor} sighed and sheathed their weapon, patting your shoulder with a gentle gaze: "Preserving mercy in this brutal City is a brave choice, though it will extract a heavy price."',
        effects: { sanity: +20, rep: +10 },
        bond: { mentor: 10 },
        flagsAdd: ['mentor_final_duel_done']
      }
    ]
  },
  {
    id: 'npc_mentor_ideological_rupture',
    age: [25, 60],
    major: true,
    weight: 20,
    need: { npc: 'mentor', bondAtMost: ['mentor', 25] },
    forbids: ['mentor_rupture_done'],
    tags: ['friction', 'npc'],
    vi: '[Sự đoạn tuyệt của Sư Phụ] {mentor} chứng kiến cách bạn hoàn thành hợp đồng gần đây: tàn nhẫn, không chừa đường sống cho cả những kẻ vô can. Trong căn phòng tập cũ, họ lạnh lùng ném danh thiếp của bạn xuống đất: "Ta dạy con cầm vũ khí để sống sót, không phải để làm một con thú khát máu."',
    en: '[The Mentor’s Severance] {mentor} witnessed how you concluded recent contracts: ruthless, leaving no quarter even for bystanders. In the old dojo, they hurled your card onto the floor: "I taught you steel to survive, not to turn into a bloodthirsty hound."',
    choices: [
      {
        labelVi: 'Lạnh lùng đáp trả rằng thời thế đã đổi và đạo lý của họ đã lỗi thời',
        labelEn: 'Coldly reply that times have changed and their ethics are obsolete',
        resultVi: '{mentor} nhìn bạn bằng ánh mắt cay đắng tột cùng rồi quay lưng bước đi: "Từ nay, đừng bao giờ nhận là đệ tử của ta." Mối quan hệ thầy trò chính thức tan vỡ.',
        resultEn: '{mentor} stared with bitter sorrow, then turned their back: "From this hour, never claim to be my student." The bond between master and disciple shattered.',
        effects: { sanity: -15, rep: +10 },
        bond: { mentor: -35 },
        npcFate: { mentor: 'estranged' },
        flagsAdd: ['mentor_rupture_done']
      },
      {
        labelVi: 'Quỳ xuống xin lỗi và chấp nhận chịu phạt theo môn quy',
        labelEn: 'Kneel and apologize, accepting disciplinary penance',
        resultVi: 'Bạn nhận mười roi sắt trên lưng mà không kêu một tiếng. {mentor} ném lại lọ thuốc bôi rồi bước ra ngoài. Vết thương ngoài da sẽ lành, nhưng vết nứt niềm tin thì chưa.',
        resultEn: 'You took ten iron lashes across the back without a cry. {mentor} tossed an ointment jar and walked out. The skin wounds will heal; the rift in trust will linger.',
        effects: { health: -20, sanity: +5 },
        bond: { mentor: -5 },
        flagsAdd: ['mentor_rupture_done']
      }
    ]
  },
  {
    id: 'npc_nemesis_midnight_vendetta',
    age: [22, 70],
    major: true,
    weight: 30,
    need: { npc: 'nemesis' },
    forbids: ['nemesis_midnight_resolved'],
    tags: ['combat', 'danger', 'nemesis'],
    vi: '[Ân oán lúc nửa đêm] Cửa sổ phòng bạn vỡ vụn; {nemesis} cùng hai sát thủ thuê xông vào giữa đêm giông bão. Ánh chớp xé rách bóng tối, rọi sáng ánh mắt điên cuồng muốn thanh toán mọi nợ nần của kẻ thù.',
    en: '[Midnight Reckoning] Your window shattered inward; {nemesis} broke through during a stormy midnight flanked by two hired cutthroats. Lightning lit the darkness, illuminating eyes frantic for a final settlement.',
    choices: [
      {
        labelVi: 'Dồn hết sát khí vào đòn sinh tử, quyết chấm dứt mối thù tại đây',
        labelEn: 'Pour all lethal intent into a decisive strike to end the feud',
        outcomes: [
          {
            w: 65,
            resultVi: 'Lưỡi kiếm của bạn nhanh hơn ánh chớp. {nemesis} gục ngã trên vũng máu trong khi hai tên sát thủ hoảng sợ nhảy qua cửa sổ tháo chạy. Mối hiểm họa đe dọa cuộc sống của bạn đã vĩnh viễn được gỡ bỏ.',
            resultEn: 'Your blade was swifter than lightning. {nemesis} crumpled into a pool of blood while the hired killers scrambled out the window in panic. The threat over your life is permanently severed.',
            effects: { health: -22, sanity: +15, rep: +25, heat: -10 },
            meritAdd: 25,
            npcFate: { nemesis: 'dead' },
            flagsAdd: ['nemesis_midnight_resolved'],
            scarsAdd: ['Kẻ kết liễu cựu thù']
          },
          {
            w: 35,
            resultVi: '{nemesis} điên cuồng chống trả, đâm trúng bụng bạn trước khi trúng đòn chí mạng. Cả hai cùng ngã xuống sàn; hàng xóm kịp tri hô cứu bạn qua cơn thập tử nhất sinh.',
            resultEn: '{nemesis} fought with frantic fury, piercing your gut before taking your mortal blow. Both crashed to the floor; neighbors intervened just in time to drag you back from the threshold of death.',
            effects: { health: -45, sanity: -15, rep: +15 },
            scarsAdd: ['Vết đâm xuyên bụng'],
            npcFate: { nemesis: 'dead' },
            flagsAdd: ['nemesis_midnight_resolved']
          }
        ]
      },
      {
        labelVi: 'Kích hoạt bẫy khói và tháo chạy sang nóc nhà đối diện',
        labelEn: 'Trigger a smoke decoy and scramble onto the opposite roof',
        resultVi: 'Khói mù mịt phủ kín căn phòng giúp bạn nhảy qua khoảng không sang mái nhà đối diện. Căn hộ của bạn bị phá nát nhưng bạn vẫn giữ được mạng sống để tính kế lâu dài.',
        resultEn: 'Choking smoke masked your escape across the rooftop gap. Your tenement room was ransacked, but you kept your breath to fight another day.',
        effects: { wealth: -25, sanity: -10, health: -8 },
        flagsAdd: ['nemesis_midnight_resolved']
      }
    ]
  },
  {
    id: 'npc_spouse_illness_crisis',
    age: [25, 75],
    major: true,
    weight: 22,
    need: { npc: 'spouse' },
    requires: ['Married'],
    forbids: ['spouse_illness_resolved'],
    tags: ['family', 'medical', 'npc'],
    vi: '[Cơn sốt Backstreets] {spouse} lên cơn sốt co giật do nhiễm độc từ nguồn nước ô nhiễm của quận. Bác sĩ phòng khám chui đòi 35 Ahn cho một mũi huyết thanh thanh lọc K Corp đã qua pha loãng.',
    en: '[Backstreet Ague] {spouse} suffered violent fever convulsions from contaminated district water. An unlicensed clinic doctor demanded 35 Ahn for a diluted dose of K Corp purifying serum.',
    choices: [
      {
        labelVi: 'Trả đủ 35 Ahn mua mũi huyết thanh tốt nhất để cứu {spouse}',
        labelEn: 'Pay the full 35 Ahn for the best serum to save {spouse}',
        resultVi: 'Mũi huyết thanh màu xanh phát huy tác dụng thần kỳ; cơn sốt của {spouse} hạ dần và hơi thở trở lại đều đặn. Ngồi bên giường bệnh suốt đêm, bạn thấy ánh mắt họ nhìn bạn tràn đầy tình cảm sâu đậm.',
        resultEn: 'The emerald serum worked wonders; the fever subsided and steady breathing returned. Sitting by the cot through the night, you found their gaze full of deep tenderness.',
        effects: { wealth: -35, sanity: +15 },
        bond: { spouse: 25 },
        flagsAdd: ['spouse_illness_resolved']
      },
      {
        labelVi: 'Mua thuốc an thần giá rẻ 10 Ahn và thức trắng đêm lau người hạ nhiệt',
        labelEn: 'Buy cheap 10 Ahn sedatives and spend the night cooling their brow',
        outcomes: [
          {
            w: 60,
            resultVi: 'Nhờ thể trạng kiên cường và sự chăm sóc không ngơi nghỉ của bạn, {spouse} đã vượt qua cơn nguy kịch sau ba ngày sốt mê man.',
            resultEn: 'Thanks to hardy constitution and your relentless care, {spouse} weathered the critical phase after three days of delirium.',
            effects: { wealth: -10, health: -10, sanity: +5 },
            bond: { spouse: 15 },
            flagsAdd: ['spouse_illness_resolved']
          },
          {
            w: 40,
            resultVi: 'Cơn sốt để lại di chứng khiến {spouse} suy yếu hẳn thể lực. Họ trách bạn vì đã quá tằn tiện mạng sống của người bạn đời.',
            resultEn: 'The fever left lasting infirmity. They harbored quiet bitterness that you pinched pennies over your partner’s life.',
            effects: { wealth: -10, sanity: -15 },
            bond: { spouse: -18 },
            flagsAdd: ['spouse_illness_resolved']
          }
        ]
      }
    ]
  },
  {
    id: 'npc_spouse_estrangement_confrontation',
    age: [28, 70],
    major: true,
    weight: 20,
    need: { npc: 'spouse', bondAtMost: ['spouse', 24] },
    requires: ['Married'],
    forbids: ['spouse_estrangement_resolved'],
    tags: ['family', 'friction', 'npc'],
    vi: '[Chiếc vali trước cửa] Trở về nhà sau nhiều ngày bôn ba, bạn thấy một chiếc vali đã đóng gói đặt ngay cửa. {spouse} ngồi bên bàn, đôi mắt mệt mỏi không còn giọt nước mắt: "Chúng ta không thể sống thế này mãi. Anh/Em chỉ coi căn nhà này như một trạm nghỉ chân."',
    en: '[The Packed Suitcase] Returning home after days in the field, you found a packed suitcase by the door. {spouse} sat at the table with exhausted, tearless eyes: "We cannot go on like this. You treat this room like a mere refueling post."',
    choices: [
      {
        labelVi: 'Bỏ vũ khí xuống, ôm chặt lấy {spouse} và hứa sẽ dành nhiều thời gian hơn',
        labelEn: 'Set weapons down, hold {spouse} close, and promise more presence',
        resultVi: 'Vòng tay ấm áp xoa dịu những tủi hờn chất chứa bấy lâu. {spouse} bật khóc trên vai bạn và dỡ lại đồ đạc vào tủ. Mái ấm mong manh tạm thời được cứu vãn.',
        resultEn: 'A warm embrace softened months of neglected sorrow. {spouse} wept against your shoulder and unpacked the luggage. The fragile hearth was saved for now.',
        effects: { sanity: +12, rep: -2 },
        bond: { spouse: 20 },
        flagsAdd: ['spouse_estrangement_resolved']
      },
      {
        labelVi: 'Lặng lẽ gật đầu đồng ý chia tay, chúc họ tìm được bình yên',
        labelEn: 'Quietly nod in agreement to part ways, wishing them peaceful days',
        resultVi: '{spouse} kéo vali bước ra khỏi ngõ, không một lần ngoái lại. Căn phòng trở nên rộng thênh thang và lạnh ngắt trong tiếng mưa rả rích.',
        resultEn: '{spouse} rolled the suitcase down the alley without looking back. The room turned cavernous and freezing beneath steady rain.',
        effects: { sanity: -20 },
        npcFate: { spouse: 'estranged' },
        flagsAdd: ['spouse_estrangement_resolved']
      }
    ]
  },
  {
    id: 'npc_child_first_weapon_choice',
    age: [32, 65],
    major: true,
    weight: 22,
    need: { npc: 'child' },
    requires: ['HasChild'],
    forbids: ['child_weapon_chosen'],
    tags: ['family', 'npc'],
    vi: '[Món quà tuổi lên mười] Đứa con của bạn tròn mười tuổi. Ở The City, đây là lúc một đứa trẻ phải học cách tự bảo vệ mình trước khi quá muộn. Bạn đặt lên bàn hai thứ: một con dao găm Workshop sắc bén và một tập sách kế toán Wing.',
    en: '[Gift of the Tenth Year] Your child reached ten years of age. In The City, this is when a child must learn defense before cruelty catches them. You set two items on the table: a sharp Workshop dagger and a Wing accounting ledger.',
    choices: [
      {
        labelVi: 'Dạy con cầm dao găm và thế thủ cận chiến cơ bản',
        labelEn: 'Teach the child to grip the dagger and hold basic stance',
        resultVi: 'Đứa trẻ nắm chặt chuôi dao, ánh mắt toát lên sự kiên nghị sớm hơn lứa tuổi. Bạn bắt đầu truyền dạy bản năng sinh tồn khắc nghiệt cho thế hệ tiếp theo.',
        resultEn: 'The child gripped the hilt, eyes showing early resolve beyond their years. You began instilling harsh survival instincts in the next generation.',
        effects: { sanity: -4, rep: +8 },
        bond: { child: 15 },
        flagsAdd: ['child_weapon_chosen', 'ChildTrainedCombat']
      },
      {
        labelVi: 'Mở tập sách và dạy con cách tính toán sổ sách văn phòng',
        labelEn: 'Open the ledger and instruct the child in bureaucratic figures',
        resultVi: 'Đứa trẻ hào hứng ghi chép các con số. Bạn nuôi hy vọng con mình sẽ bước chân vào một Nest yên bình thay vì đẫm máu ngoài ngõ hẻm.',
        resultEn: 'The child diligently copied figures. You harbored quiet hope they might secure entry into a peaceful Nest rather than bleed in alleys.',
        effects: { wealth: -8, sanity: +10 },
        bond: { child: 12 },
        flagsAdd: ['child_weapon_chosen', 'ChildTrainedScholar']
      }
    ]
  },
  {
    id: 'npc_child_kidnapping_ransom',
    age: [34, 70],
    major: true,
    weight: 20,
    need: { npc: 'child' },
    requires: ['HasChild'],
    forbids: ['child_ransom_resolved'],
    tags: ['danger', 'family', 'npc'],
    vi: '[Bức thư đẫm máu gửi phụ huynh] Trở về nhà, bạn nhận được một lọn tóc của đứa con kèm mảnh giấy đe dọa từ một băng đảng địa phương: "Mang 40 Ahn đến tầng hầm nhà máy xay xát trước nửa đêm, nếu muốn con mày còn nguyên vẹn."',
    en: '[A Blood-Stained Note to the Parent] Returning home, you found a lock of your child’s hair beside an extortion note from local toughs: "Bring 40 Ahn to the grain mill cellar before midnight, if you want your whelp in one piece."',
    choices: [
      {
        labelVi: 'Rút vũ khí xông thẳng vào sào huyệt tiêu diệt toàn bộ băng nhóm',
        labelEn: 'Storm the hideout blade drawn to purge the entire gang',
        outcomes: [
          {
            w: 65,
            resultVi: 'Cơn thịnh nộ biến bạn thành cỗ máy đồ tể. Không một tên bắt cóc nào sống sót qua mười phút; bạn bế đứa con còn nguyên vẹn bước ra trong ánh lửa bập bùng.',
            resultEn: 'Paternal fury forged you into an unyielding butcher. No kidnapper survived ten minutes; you carried your unharmed child out into firelight.',
            effects: { health: -18, sanity: -10, rep: +30, heat: +20 },
            meritAdd: 20,
            bond: { child: 30 },
            flagsAdd: ['child_ransom_resolved'],
            scarsAdd: ['Cuộc thanh trừng cứu con']
          },
          {
            w: 35,
            resultVi: 'Một trận hỗn chiến ác liệt nổ ra. Bạn cứu được con nhưng phải lãnh một nhát chém gãy xương bả vai.',
            resultEn: 'A brutal melee unfolded. You saved your child but took a fracture across the shoulder blade.',
            effects: { health: -38, sanity: -15, rep: +18 },
            scarsAdd: ['Vết sẹo vỡ vai cứu con'],
            bond: { child: 20 },
            flagsAdd: ['child_ransom_resolved']
          }
        ]
      },
      {
        labelVi: 'Vay mượn giao đủ 40 Ahn để đón con về trong an toàn',
        labelEn: 'Scrape together 40 Ahn to buy the child’s safe return',
        resultVi: 'Toán côn đồ đếm tiền rồi thả đứa trẻ ra. Hai cha con ôm chặt lấy nhau khóc nức nở giữa đêm sương lạnh.',
        resultEn: 'The toughs counted the coins and handed the child over. You embraced tightly on the cold misty pavement.',
        effects: { wealth: -40, sanity: +5 },
        bond: { child: 18 },
        flagsAdd: ['child_ransom_resolved']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. CHILDHOOD & ADOLESCENCE EXPANSIONS (8 Events)
  // --------------------------------------------------------------------------
  {
    id: 'ch_exp_scavenger_ruins_trinket',
    age: [8, 14],
    major: true,
    weight: 35,
    forbids: ['scavenger_trinket_found'],
    vi: '[Mảnh Kim Loại Kỳ Lạ Từ Đống Đổ Nát] Lục lọi trong đống xà bần gần bức tường giáp ranh Outskirts, bạn nhặt được một viên pha lê phát quang nhấp nháy theo nhịp tim. Một tay buôn lậu đồ cổ gạ đổi nó lấy túi bánh ngọt hoặc 15 Ahn.',
    en: '[Curious Crystal from the Rubble] Sifting scrap near the Outskirts boundary wall, your fingers dug out a luminescent crystal pulsing with your heartbeat. An antiquities smuggler offers to trade it for fresh pastries or 15 Ahn.',
    choices: [
      {
        labelVi: 'Giữ lại viên pha lê làm bùa hộ mệnh bên người',
        labelEn: 'Keep the pulsing crystal as a personal talisman',
        resultVi: 'Ánh sáng nhịp nhàng của viên đá mang lại cho bạn sự an tâm kỳ lạ mỗi khi đêm đen buông xuống trên khu ổ chuột.',
        resultEn: 'The rhythmic pulse offered strange solace whenever darkness fell across the tenement alleys.',
        effects: { sanity: +8, resonance: +10 },
        flagsAdd: ['scavenger_trinket_found', 'TalismanOfOutskirts']
      },
      {
        labelVi: 'Bán lấy 15 Ahn để mua lương thực dự trữ',
        labelEn: 'Sell it for 15 Ahn to stock up on winter supplies',
        resultVi: 'Tay buôn trả tiền rất sòng phẳng. Bạn mang về một bao bột mì và hộp thịt hộp, giúp cả nhà vượt qua tuần bão tuyết.',
        resultEn: 'The smuggler paid fair coin. You brought home flour and canned rations, carrying the household through the blizzard.',
        effects: { wealth: +15, sanity: +4 },
        flagsAdd: ['scavenger_trinket_found']
      }
    ]
  },
  {
    id: 'ch_exp_rooftop_runner_brawl',
    age: [10, 16],
    major: true,
    weight: 32,
    forbids: ['rooftop_brawl_done'],
    vi: '[Trận Chiến Mái Tôn] Bọn trẻ ngõ bên cạnh chặn đường bạn trên những mái nhà tôn rỉ sét, đòi nộp phí qua đường nếu muốn tiếp tục nhặt đồ phế liệu. Chúng cầm gậy gộc và gạch vỡ vây quanh bạn.',
    en: '[Rooftop Scrap] Children from the neighboring alley cornered you along rusted corrugated rooftops, demanding a toll if you want to keep scavenging scrap. They wielded lead pipes and broken masonry.',
    choices: [
      {
        labelVi: 'Lao vào đánh gục tên đầu sỏ để khẳng định lãnh địa',
        labelEn: 'Tackle the ringleader to assert your alley territory',
        resultVi: 'Bạn quật ngã tên cầm đầu xuống mái tôn rỉ, mặc cho hai bên sườn dính vài cú đập gậy. Đám nhóc hoảng sợ tháo lui; từ nay không đứa nào dám cản đường bạn.',
        resultEn: 'You slammed the ringleader hard against the iron sheets despite taking pipe bruises. The pack fled; none challenged your passage again.',
        effects: { health: -8, rep: +10, sanity: +5 },
        meritAdd: 5,
        flagsAdd: ['rooftop_brawl_done', 'RooftopProwess']
      },
      {
        labelVi: 'Khéo léo nhảy chuyền qua dây phơi sang nóc nhà đối diện để thoát',
        labelEn: 'Leap across the laundry lines to the opposite roof to slip away',
        resultVi: 'Cú nhảy liều lĩnh khiến bạn trầy trụa đầu gối nhưng bỏ rơi cả đám phía sau. Bạn phát hiện ra mình có năng khiếu di chuyển địa hình vượt trội.',
        resultEn: 'The daring jump scraped your knees raw but left the crowd stranded. You uncovered a natural knack for high-wire parkour.',
        effects: { health: -4, sanity: +6 },
        flagsAdd: ['rooftop_brawl_done']
      }
    ]
  },
  {
    id: 'ch_exp_fixer_recruiter_inspection',
    age: [14, 17],
    major: true,
    weight: 30,
    forbids: ['fixer_recruiter_seen'],
    vi: '[Mắt Nhìn Của Văn Phòng Fixer] Một Fixer Grade 6 của một văn phòng nhỏ ghé qua hẻm tuyển thiếu niên phụ việc khuân đồ và lau dọn vũ khí. Ông bảo bạn thử giơ nắm đấm và nhận xét thể lực của bạn.',
    en: '[A Fixer Office’s Eye] A Grade 6 Fixer from a minor office stopped by the alley recruiting adolescents for porter work and weapon scrubbing. He ordered you to hold up your fists and sized up your frame.',
    choices: [
      {
        labelVi: 'Thể hiện thế thủ vững chắc và tinh thần chịu đòn kiên cường',
        labelEn: 'Show an unyielding stance and stoic tolerance for blows',
        resultVi: 'Viên Fixer gật đầu khen ngợi bản lĩnh lì lợm của bạn, thưởng cho bạn 5 Ahn và hứa sẽ nhận bạn vào học việc khi đủ tuổi.',
        resultEn: 'The Fixer nodded approvingly at your grit, tossing you 5 Ahn and promising an apprenticeship slot when you come of age.',
        effects: { wealth: +5, rep: +8, sanity: +6 },
        meritAdd: 6,
        flagsAdd: ['fixer_recruiter_seen', 'FixerOfficeProspect']
      },
      {
        labelVi: 'Lịch sự từ chối và xin chân chuyển phát tài liệu nhẹ nhàng',
        labelEn: 'Politely decline, asking for a lighter document runner job',
        resultVi: 'Ông ta cho bạn vài tờ Ahn để chạy việc giao thư giữa các ngõ. Bạn tích lũy được nhiều thông tin về bản đồ các con hẻm.',
        resultEn: 'He handed you a few coins for courier runs across the block. You mapped the alley network down to every cul-de-sac.',
        effects: { wealth: +8, network: +6 },
        flagsAdd: ['fixer_recruiter_seen']
      }
    ]
  },
  {
    id: 'ch_exp_abandoned_workshop_manual',
    age: [12, 16],
    major: true,
    weight: 28,
    forbids: ['workshop_manual_read'],
    vi: '[Cuốn Sổ Tay Thợ Rèn Vô Danh] Trong ngăn kéo của một tiệm rèn Workshop bỏ hoang sau hỏa hoạn, bạn tìm thấy một tập ghi chép về công thức tôi luyện hợp kim chịu nhiệt và bản vẽ cơ cấu lò xo giảm chấn.',
    en: '[Nameless Smith’s Notebook] Inside a charred drawer of a fire-gutted Workshop forge, you unearthed a manual outlining heat-treated alloy tempering and dampening spring mechanics.',
    choices: [
      {
        labelVi: 'Dành từng đêm dưới ánh nến để nghiền ngẫm các sơ đồ cơ khí',
        labelEn: 'Spend every night by candlelight studying the schematics',
        resultVi: 'Những nguyên lý đúc thép và mài cạnh lưỡi dao ngấm sâu vào đầu bạn. Đôi mắt bạn bắt đầu nhìn vũ khí với sự thấu hiểu của một thợ thủ công.',
        resultEn: 'Principles of casting and edge-geometry settled into your mind. Your eyes began reading steel with a craftsman’s literacy.',
        effects: { sanity: +8, resonance: +6 },
        flagsAdd: ['workshop_manual_read', 'SelfTaughtCraftsman']
      },
      {
        labelVi: 'Bán bản thảo cho một thợ rèn đang hành nghề lấy 12 Ahn',
        labelEn: 'Sell the manuscript to an active alley smith for 12 Ahn',
        resultVi: 'Người thợ rèn trả tiền hậu hĩnh và còn cho phép bạn thỉnh thoảng ghé xưởng xem ông ta vận hành búa máy.',
        resultEn: 'The smith paid handsomely and permitted you to watch him operate the pneumatic hammer whenever chores were done.',
        effects: { wealth: +12, network: +4 },
        flagsAdd: ['workshop_manual_read']
      }
    ]
  },
  {
    id: 'ch_exp_nest_scholarship_exam',
    age: [13, 17],
    major: true,
    weight: 26,
    need: { isNest: true },
    forbids: ['nest_scholarship_done'],
    vi: '[Kỳ Thi Tuyển Học Bổng Cánh] Học viện trực thuộc Corp tổ chức kỳ khảo sát tư duy logic và khả năng chịu tải thông tin nhằm chọn ra học viên dự bị. Bầu không khí trong phòng thi ngột ngạt mùi dung dịch khử trùng.',
    en: '[Wing Scholarship Assessment] The Corp-affiliated academy held an examination testing logical cognition and neural bandwidth to screen apprentice candidates. Antiseptic vapor choked the testing hall.',
    choices: [
      {
        labelVi: 'Dồn toàn bộ trí lực hoàn thành các câu hỏi hóc búa nhất',
        labelEn: 'Expend full mental acuity solving the most arcane matrices',
        resultVi: 'Bạn lọt vào nhóm điểm cao, nhận được trợ cấp học tập danh giá cùng sự nể trọng từ các giảng viên của Wing.',
        resultEn: 'You placed in the upper percentile, securing an academic stipend and nods of approval from Wing proctors.',
        effects: { sanity: -6, rep: +15, wealth: +15 },
        meritAdd: 12,
        flagsAdd: ['nest_scholarship_done', 'WingAcademyAdept']
      },
      {
        labelVi: 'Làm bài ở mức an toàn để tránh bị chú ý quá mức',
        labelEn: 'Perform at a safe median to dodge predatory scrutiny',
        resultVi: 'Bạn giữ cho mình sự mờ nhạt vừa đủ để sống sót yên bình giữa cuộc đua khốc liệt của con em cư dân Nest.',
        resultEn: 'You kept just under the radar, dodging the cutthroat envy of Nest dynastic heirs.',
        effects: { sanity: +6 },
        flagsAdd: ['nest_scholarship_done']
      }
    ]
  },
  {
    id: 'ch_exp_sweeper_whisper_night',
    age: [11, 15],
    major: true,
    weight: 28,
    forbids: ['sweeper_whisper_heard'],
    vi: '[Âm Thanh Lúc Ba Giờ Sáng] Trong Đêm Backstreets, bạn nép sát tai vào khe cửa sổ có thanh sắt chắn. Dưới lòng đường, tiếng chân bì bõm của bầy Sweeper đi kèm những âm thanh lạo xạo như tiếng thì thầm qua màng lọc khí.',
    en: '[Three A.M. Cadence] During the Night in the Backstreets, you pressed your ear to the barred window crack. Below, the liquid sloshing of a Sweeper pack mingled with rasping clicks through respirators.',
    choices: [
      {
        labelVi: 'Nín thở quan sát cách thức di chuyển và dọn dẹp của chúng',
        labelEn: 'Hold breath and observe their scavenging patrol geometry',
        resultVi: 'Cảnh tượng rùng rợn in sâu vào tâm trí bạn: cách chúng phân tách vật chất hữu cơ với sự hiệu quả tuyệt đối. Nỗi sợ biến thành bài học sinh tồn vô giá.',
        resultEn: 'The chilling spectacle seared into your memory: how they processed organic waste with absolute economy. Fear turned to survival doctrine.',
        effects: { sanity: -10, resonance: +12 },
        flagsAdd: ['sweeper_whisper_heard', 'SweeperWatcher']
      },
      {
        labelVi: 'Bịt tai chui sâu vào trong chăn, niệm lời cầu an',
        labelEn: 'Bury your head under quilts and wait out the cleansing hour',
        resultVi: 'Bạn nhắm chặt mắt cho đến khi tiếng còi báo hiệu trời sáng vang lên. Thêm một đêm nữa bạn sống sót an toàn.',
        resultEn: 'You kept your eyes shut until the dawn siren blew across the district. Another night survived in peace.',
        effects: { sanity: +4 },
        flagsAdd: ['sweeper_whisper_heard']
      }
    ]
  },
  {
    id: 'ch_exp_meat_pie_vendor_apprentice',
    age: [9, 14],
    major: true,
    weight: 30,
    forbids: ['pie_vendor_worked'],
    vi: '[Quán Bánh Thịt Đầu Ngõ] Một bà lão bán bánh thịt chiên dầu ở District 23 cần một đứa trẻ nhanh nhẹn bưng bê đĩa và lau bàn. Mùi thịt nướng thơm nức mũi cả một góc phố, dù không ai hỏi thịt lấy từ lò mổ nào.',
    en: '[District 23 Pie Stall] An elderly vendor frying meat pasties in District 23 needed a nimble youth to bus tables and wash trays. The savory aroma filled the lane, though no one asked what abattoir the meat came from.',
    choices: [
      {
        labelVi: 'Nhận việc chăm chỉ, ăn bánh thừa lót dạ mỗi tối',
        labelEn: 'Work diligently, taking scrap pies as nightly wages',
        resultVi: 'Bụng bạn luôn no nê và bạn học được cách ứng xử khôn khéo với đủ hạng thực khách hung bạo của khu ẩm thực.',
        resultEn: 'Your stomach stayed full and you picked up shrewd banter dealing with rough patrons across the food ward.',
        effects: { health: +8, wealth: +6, sanity: -2 },
        flagsAdd: ['pie_vendor_worked']
      },
      {
        labelVi: 'Từ chối sau khi thoáng nhìn thấy vết xăm lạ trên thớt thịt',
        labelEn: 'Back away after glimpsing an odd tattoo upon the cutting board',
        resultVi: 'Linh tính mách bảo bạn tránh xa căn bếp đó. Bạn giữ được sự trong sạch cho tâm hồn dù phải chịu đói một buổi tối.',
        resultEn: 'Instinct urged you away from that counter. You preserved your peace of mind, even if supper was skipped.',
        effects: { sanity: +6 },
        flagsAdd: ['pie_vendor_worked']
      }
    ]
  },
  {
    id: 'ch_exp_outskirts_drifter_tale',
    age: [10, 16],
    major: true,
    weight: 25,
    forbids: ['drifter_tale_heard'],
    vi: '[Kẻ Lữ Hành Từ Phía Bên Kia Tường Thành] Một kẻ tha hương rách rưới mang theo chiếc ba lô phủ đầy cát xám ghé quán trọ rẻ tiền. Ông ta kể về những phế tích khổng lồ nằm sâu trong Outskirts, nơi công nghệ của các Wing tiền nhiệm đang bị chôn vùi.',
    en: '[Wanderer from Beyond the Great Wall] A ragged drifter with a rucksack coated in ash-gray sand stopped at a cheap boardinghouse. He spoke of colossal monoliths buried in the Outskirts where pre-Calamity Wing relics sleep.',
    choices: [
      {
        labelVi: 'Đem cho ông ta một bát cháo nóng để nghe kỹ về bản đồ phế tích',
        labelEn: 'Offer him hot porridge to hear details of the ruin maps',
        resultVi: 'Người lữ hành vẽ cho bạn vài ký hiệu nhận diện các vùng đất cấm ngoài tường thành. Trí tò mò và khao khát thám hiểm nhen nhóm trong bạn.',
        resultEn: 'The drifter sketched hazard markings used beyond the wall. Wonder and hunger for exploration stirred in your chest.',
        effects: { wealth: -3, sanity: +8, resonance: +10 },
        flagsAdd: ['drifter_tale_heard', 'OutskirtsLoreSeeker']
      },
      {
        labelVi: 'Báo cho bảo an khu vực để nhận tiền thưởng tố giác kẻ khả nghi',
        labelEn: 'Alert district security for a bounty on suspicious vagrants',
        resultVi: 'Đội tuần tra đến thẩm vấn và trục xuất gã lang thang, thưởng cho bạn vài đồng lẻ vì tinh thần cảnh giác.',
        resultEn: 'The patrol questioned and drove the drifter out, handing you loose coins for your civic vigilance.',
        effects: { wealth: +8, rep: +5 },
        flagsAdd: ['drifter_tale_heard']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. FIXER & ASSOCIATIONS EXPANSIONS (8 Events)
  // --------------------------------------------------------------------------
  {
    id: 'fx_exp_zwei_escort_standoff',
    age: [20, 50],
    major: true,
    weight: 25,
    need: { jobs: ['Fixer'] },
    forbids: ['zwei_standoff_done'],
    tags: ['combat', 'contract'],
    vi: '[Lời Thề Lá Chắn Zwei] Phối hợp tác chiến cùng Zwei Association Section 4, đội của bạn bị bao vây bởi một nhóm đánh thuê vũ trang hạng nặng. Viên Đội trưởng Zwei cắm đại khiên xuống đất, lệnh cho bạn cùng dựng chiến lũy giữ vững hành lang.',
    en: '[Zwei Shield Wall Protocol] Deployed alongside Zwei Association Section 4, your unit was pinned by heavy mercs. The Zwei captain rammed his tower shield into the cobbles, ordering you to form a bulwark to hold the evacuation corridor.',
    choices: [
      {
        labelVi: 'Kề vai áp lưng vào đại khiên, kiên cường chặn đứng mọi hỏa lực',
        labelEn: 'Lock shoulders against the shield, enduring the barrage',
        resultVi: 'Kim loại va đập gầm rú đinh tai. Nhờ phòng ngự sắt đá, thân chủ đã được sơ tán an toàn. Zwei Association đánh giá rất cao độ tin cậy của bạn.',
        resultEn: 'Metal rang deafeningly under impact. Thanks to iron discipline, the VIP cleared the zone. Zwei Association marked your reliability with gold ink.',
        effects: { health: -15, sanity: +10, rep: +20 },
        meritAdd: 22,
        flagsAdd: ['zwei_standoff_done', 'ZweiCommended']
      },
      {
        labelVi: 'Vòng ra sườn đối phương, tung đòn đột kích chớp nhoáng',
        labelEn: 'Flank wide through the side alley for a lightning ambush',
        resultVi: 'Bạn chém gục hai tay súng chỉ huy khiến đội hình địch rối loạn tháo lui. Trận chiến kết thúc nhanh chóng với chiến công rực rỡ.',
        resultEn: 'You cut down two enemy commanders, fracturing their vanguard into route. The clash concluded swiftly with bold merit.',
        effects: { health: -12, sanity: +5, rep: +22 },
        meritAdd: 25,
        flagsAdd: ['zwei_standoff_done']
      }
    ]
  },
  {
    id: 'fx_exp_shi_exhaustion_raid',
    age: [22, 55],
    major: true,
    weight: 24,
    need: { jobs: ['Fixer'] },
    forbids: ['shi_exhaustion_done'],
    tags: ['combat', 'contract'],
    vi: '[Mệnh Lệnh Tử Thủ Của Shi] Shi Association Section 2 cử bạn tham gia một chiến dịch ám sát liên tục suốt 48 giờ không nghỉ. Toàn thân bạn kiệt sức, cơ bắp rách rưới nhưng mục tiêu cuối cùng đang ở ngay trước mắt.',
    en: '[Shi’s Attrition Edict] Shi Association Section 2 assigned you to a relentless 48-hour assassination sweep. Muscles screamed with torn fibers, but the prime target was finally within reach.',
    choices: [
      {
        labelVi: 'Vắt kiệt giọt sinh lực cuối cùng, xuất chiêu Tất Sát đoạn mạng mục tiêu',
        labelEn: 'Burn your final ember of vitality to execute the fatal strike',
        outcomes: [
          {
            w: 60,
            resultVi: 'Đường kiếm trong cơn hấp hối đạt đến độ hoàn mỹ chết người. Mục tiêu bị hạ gục ngay tức khắc; bạn đổ gục xuống sàn nhưng nhiệm vụ bất khả thi đã hoàn thành.',
            resultEn: 'The desperate cut reached fatal perfection. The target fell in one breath; you collapsed onto the boards, impossible contract fulfilled.',
            effects: { health: -30, sanity: -10, rep: +35 },
            meritAdd: 35,
            flagsAdd: ['shi_exhaustion_done'],
            scarsAdd: ['Kiệt sức của Shi Fixer']
          },
          {
            w: 40,
            resultVi: 'Cơ thể quá mệt mỏi khiến đòn đánh chệch vài ly; bạn hạ được mục tiêu nhưng trúng đạn trả đũa vào đùi.',
            resultEn: 'Overwhelming fatigue drifted the slash by millimeters; you took down the target but caught return fire through the thigh.',
            effects: { health: -42, sanity: -18, rep: +20 },
            meritAdd: 20,
            scarsAdd: ['Vết đạn trả đũa khi kiệt sức'],
            flagsAdd: ['shi_exhaustion_done']
          }
        ]
      },
      {
        labelVi: 'Bỏ qua mục tiêu, bảo toàn mạng sống và hỗ trợ đồng đội rút lui',
        labelEn: 'Abort the kill to preserve breath and extract exhausted comrades',
        resultVi: 'Bạn cứu sống được hai Fixer đồng đội khỏi cái chết cầm chắc. Dù bị trừ thưởng hợp đồng, lương tâm của bạn được thanh thản.',
        resultEn: 'You hauled two comrades out of certain slaughter. Contract payout took a penalty, but conscience held steady.',
        effects: { rep: +8, sanity: +12, wealth: -10 },
        flagsAdd: ['shi_exhaustion_done']
      }
    ]
  },
  {
    id: 'fx_exp_liu_blazing_formation',
    age: [22, 55],
    major: true,
    weight: 25,
    need: { jobs: ['Fixer'] },
    forbids: ['liu_blazing_done'],
    tags: ['combat'],
    vi: '[Ngọn Lửa Chiến Tuyến Liu] Tác chiến cùng Liu Association Section 3 trong chiến dịch càn quét một ổ Syndicate buôn lậu vũ khí, bạn được giao vị trí tiên phong trong đội hình Thiết Chưởng rực lửa.',
    en: '[Liu Vanguard Blaze] Partnering with Liu Association Section 3 against an illicit arms syndicate, you were assigned point in their flaming palm strike formation.',
    choices: [
      {
        labelVi: 'Vận khí toàn thân, tung chưởng lửa đốt cháy hàng phòng ngự đối phương',
        labelEn: 'Channel inner breath, hurling blazing strikes through barricades',
        resultVi: 'Sức nóng bốc lên ngùn ngụt; hàng rào gỗ và khiên thép đối phương tan chảy dưới uy lực nắm đấm rực lửa của bạn. Các võ sư Liu đồng thanh reo hò thán phục.',
        resultEn: 'Scorching heat erupted; wooden ramparts and shields buckled beneath blazing fists. Liu martial masters roared in fierce acclaim.',
        effects: { health: -15, sanity: +10, rep: +25 },
        meritAdd: 28,
        flagsAdd: ['liu_blazing_done', 'LiuFlameInitiate']
      },
      {
        labelVi: 'Duy trì thế bộ vững chắc, bảo vệ đội hình tránh bị chia cắt',
        labelEn: 'Anchor a steady stance, sealing formation flanks against breach',
        resultVi: 'Sự kiên định của bạn giữ cho thế trận Liu không một kẽ hở. Trận càn quét thắng lợi mà không tổn thất một người nào.',
        resultEn: 'Your disciplined footing prevented any breach. The purge succeeded without a single casualty on your flank.',
        effects: { health: -8, sanity: +8, rep: +18 },
        meritAdd: 20,
        flagsAdd: ['liu_blazing_done']
      }
    ]
  },
  {
    id: 'fx_exp_seven_intelligence_auction',
    age: [21, 58],
    major: true,
    weight: 24,
    need: { jobs: ['Fixer'] },
    forbids: ['seven_auction_done'],
    tags: ['investigation'],
    vi: '[Mật Báo Của Seven Association] Một chuyên viên tình báo của Seven Association tiếp cận bạn tại quán cà phê kín, cung cấp hồ sơ tham nhũng của một quan chức Nest với giá hời nếu bạn chịu thâm nhập xác thực.',
    en: '[Seven Association Intelligence Ledger] A field analyst from Seven Association approached you in a secluded bistro, offering a high-grade corruption docket on a Nest executive if you verify the vault coordinates.',
    choices: [
      {
        labelVi: 'Đột nhập két sắt bí mật để chụp lại toàn bộ bằng chứng',
        labelEn: 'Infiltrate the executive vault to microfilm the paper trail',
        outcomes: [
          {
            w: 65,
            resultVi: 'Bạn vượt qua hệ thống camera nhiệt và thoát ra không để lại dấu vết. Bằng chứng đanh thép mang lại cho bạn khoản thù lao khổng lồ từ Seven.',
            resultEn: 'You bypassed thermal sweeps and extracted without tripping a single relay. The unassailable dossier earned massive Seven Association bounty.',
            effects: { wealth: +35, rep: +20, network: +15 },
            meritAdd: 25,
            flagsAdd: ['seven_auction_done']
          },
          {
            w: 35,
            resultVi: 'Còi báo động vang lên khi bạn vừa lấy xong tài liệu; bạn phải nổ súng mở đường máu thoát thân.',
            resultEn: 'Alarms blared as you tucked the papers away; you had to shoot your way down the fire escape.',
            effects: { health: -18, wealth: +20, heat: +25 },
            meritAdd: 15,
            flagsAdd: ['seven_auction_done']
          }
        ]
      },
      {
        labelVi: 'Bán lại tọa độ cho đối thủ của viên quan chức để kiếm tiền an toàn',
        labelEn: 'Fip coordinates to the official’s corporate rival for clean coin',
        resultVi: 'Bạn nhận 25 Ahn tiền môi giới mà không cần phải mạo hiểm mạng sống trong khu Nest được bảo vệ nghiêm ngặt.',
        resultEn: 'You pocketed 25 Ahn in broker fees without risking life in heavily patrolled Nest perimeters.',
        effects: { wealth: +25, network: +10 },
        flagsAdd: ['seven_auction_done']
      }
    ]
  },
  {
    id: 'fx_exp_cinq_duel_challenge',
    age: [20, 50],
    major: true,
    weight: 24,
    need: { jobs: ['Fixer'] },
    forbids: ['cinq_duel_done'],
    tags: ['combat'],
    vi: '[Lời Thách Đấu Của Kiếm Sĩ Cinq] Một kiếm sĩ tài hoa của Cinq Association Section 4 gửi thư thách đấu một mất một còn tại sàn đấu danh dự của quận nhằm phân định cao thấp giữa hai trường phái.',
    en: '[Cinq Association Duel Challenge] An agile duelist from Cinq Association Section 4 tendered an honorable challenge at the district pavilion to test finesse between opposing doctrines.',
    choices: [
      {
        labelVi: 'Bước lên sàn đấu, tiếp chiêu bằng kỹ thuật kiếm thuật chuẩn xác',
        labelEn: 'Step onto the sand, answering with surgical fencing poise',
        outcomes: [
          {
            w: 60,
            resultVi: 'Mũi kiếm của bạn dừng lại đúng yết hầu đối thủ trong sự ngỡ ngàng của khán giả. Kiếm sĩ Cinq cúi mình bái phục và trao tặng huy hiệu danh dự.',
            resultEn: 'Your rapier tip rested millimeter-true at their throat. The Cinq duelist bowed deeply in defeat, presenting a crest of honor.',
            effects: { sanity: +15, rep: +28 },
            meritAdd: 30,
            flagsAdd: ['cinq_duel_done', 'CinqDuelistMastery']
          },
          {
            w: 40,
            resultVi: 'Đường kiếm đối phương quá biến ảo; bạn bị đâm trúng bắp tay nhưng kịp đánh văng kiếm của họ, trận đấu kết thúc hòa trong danh dự.',
            resultEn: 'Their thrust was blindingly deceptive; your arm caught a puncture but disarmed them in response, drawing a duel of honor.',
            effects: { health: -14, sanity: +5, rep: +15 },
            meritAdd: 18,
            flagsAdd: ['cinq_duel_done']
          }
        ]
      },
      {
        labelVi: 'Lịch sự khước từ vì Fixer chỉ rút vũ khí khi có hợp đồng trả tiền',
        labelEn: 'Politely refuse, stating a Fixer draws steel only on the clock',
        resultVi: 'Người kiếm sĩ cười lớn tán thưởng tính thực tế của bạn, mời bạn một chầu rượu hảo hạng thay cho trận giao đấu.',
        resultEn: 'The duelist laughed admiringly at your pragmatism, buying a round of top-shelf spirit in lieu of the duel.',
        effects: { sanity: +8, network: +6 },
        flagsAdd: ['cinq_duel_done']
      }
    ]
  },
  {
    id: 'fx_exp_dieci_heavy_archive_retrieval',
    age: [24, 60],
    major: true,
    weight: 22,
    need: { jobs: ['Fixer'] },
    forbids: ['dieci_retrieval_done'],
    tags: ['investigation', 'combat'],
    vi: '[Cổ Thư Của Dieci Association] Dieci Association Section 4 thuê văn phòng bạn hỗ trợ thu hồi một cuốn đại thư bị đánh cắp bởi một tà giáo bí mật trong khu ổ chuột ngầm District 4.',
    en: '[Dieci Association Tome Recovery] Dieci Association Section 4 contracted your office to reclaim a heavy consecrated archive stolen by a secretive occult sect in District 4 catacombs.',
    choices: [
      {
        labelVi: 'Cùng các học giả Dieci vung đại bổng phá sập tế đàn giáo phái',
        labelEn: 'Swing heavy mauls alongside Dieci scholars to crush the altar',
        resultVi: 'Cuốn đại thư được thu hồi nguyên vẹn. Các tu sĩ Dieci ban phước tri thức cho bạn, giúp tinh thần bạn trở nên vững vàng kiên cố trước mọi nhiễu loạn.',
        resultEn: 'The heavy tome was restored intact. Dieci scholars imparted doctrinal mnemonics, fortifying your mind against cognitive fracture.',
        effects: { health: -14, sanity: +25, rep: +22 },
        meritAdd: 26,
        flagsAdd: ['dieci_retrieval_done', 'DieciFortitude']
      },
      {
        labelVi: 'Dùng mưu gài chất nổ phong tỏa lối thoát của giáo phái',
        labelEn: 'Rig charges across exits to trap the sect within the vaults',
        resultVi: 'Vụ nổ chôn vùi giáo phái; bạn thu lại cuốn sách từ đống đổ nát và nhận đủ tiền công thưởng nóng từ Dieci.',
        resultEn: 'The blast sealed the cult; you retrieved the text from the rubble and collected the full Dieci commission bonus.',
        effects: { wealth: +30, rep: +18 },
        meritAdd: 22,
        flagsAdd: ['dieci_retrieval_done']
      }
    ]
  },
  {
    id: 'fx_exp_devyat_express_delivery',
    age: [21, 52],
    major: true,
    weight: 23,
    need: { jobs: ['Fixer'] },
    forbids: ['devyat_express_done'],
    tags: ['contract'],
    vi: '[Chuyến Chuyển Phát Cấp Tốc Của Devyat\'] Devyat\' Association cần chuyển một kiện hàng niêm phong qua ba quận trong vòng sáu tiếng, vượt qua các trạm kiểm soát gắt gao và hỏa lực bắn phá của phiến quân.',
    en: '[Devyat’ Courier Gauntlet] Devyat’ Association urgently required transit of a sealed lockbox across three districts in six hours, running military checkpoints and sniper alleyways.',
    choices: [
      {
        labelVi: 'Đeo balô gia tốc, chạy hết tốc lực trên những tuyến đường nguy hiểm nhất',
        labelEn: 'Strap on the sprint pack, racing the high-risk straightaway',
        outcomes: [
          {
            w: 65,
            resultVi: 'Bạn lướt qua làn đạn như một bóng ma, giao kiện hàng trước giờ hẹn mười lăm phút. Devyat\' trao thưởng huy hiệu Người Giao Hàng Siêu Hạng.',
            resultEn: 'You threaded bullet streams like a ghost, delivering the lockbox fifteen minutes ahead of schedule. Devyat’ awarded high delivery honors.',
            effects: { health: -15, sanity: +10, wealth: +32, rep: +20 },
            meritAdd: 26,
            flagsAdd: ['devyat_express_done', 'CourierAcclaimed']
          },
          {
            w: 35,
            resultVi: 'Một mảnh đạn găm vào bắp chân nhưng bạn vẫn lê chân đến đích đúng phút chót.',
            resultEn: 'Shrapnel tore into your calf, but you dragged across the receiving bay at the stroke of the final minute.',
            effects: { health: -26, wealth: +25, rep: +14 },
            meritAdd: 18,
            flagsAdd: ['devyat_express_done']
          }
        ]
      },
      {
        labelVi: 'Đi vòng qua hệ thống cống ngầm để đảm bảo an toàn tuyệt đối',
        labelEn: 'Reroute through the deep maintenance sewers for safe transit',
        resultVi: 'Bạn đến muộn ba mươi phút và bị trừ một phần thù lao, nhưng kiện hàng và cơ thể bạn hoàn toàn lành lặn.',
        resultEn: 'You arrived thirty minutes late and took a docked fee, but the cargo and your flesh survived without a scratch.',
        effects: { wealth: +15, sanity: +4 },
        flagsAdd: ['devyat_express_done']
      }
    ]
  },
  {
    id: 'fx_exp_oufi_contract_execution',
    age: [25, 60],
    major: true,
    weight: 22,
    need: { jobs: ['Fixer'] },
    forbids: ['oufi_contract_done'],
    tags: ['combat', 'investigation'],
    vi: '[Phán Quyết Trừng Phạt Của Öufi] Öufi Association Section 3 triệu tập bạn làm người thực thi bản án thanh trừng một Văn phòng Fixer biến chất đã phá vỡ hợp đồng bảo mật với khách hàng Nest.',
    en: '[Öufi Judicature Sanction] Öufi Association Section 3 summoned you to enforce summary execution against a rogue Fixer Office that breached contractual confidentiality with a Nest patron.',
    choices: [
      {
        labelVi: 'Dựng kích hành quyết, thực thi bản án nghiêm minh theo điều khoản luật',
        labelEn: 'Plant the execution halberd, carrying out the exact letter of the bond',
        resultVi: 'Văn phòng phản bội bị xóa sổ hoàn toàn. Trưởng chi nhánh Öufi đóng dấu mộc vàng xác nhận tư cách hành đạo liêm chính của bạn.',
        resultEn: 'The rogue firm was excised root and branch. The Öufi adjudicator affixed a golden seal validating your legal execution credentials.',
        effects: { health: -16, sanity: -6, rep: +30, wealth: +35 },
        meritAdd: 32,
        flagsAdd: ['oufi_contract_done', 'CertifiedExecutioner']
      },
      {
        labelVi: 'Thu giữ sổ sách tài chính giao nộp, tha mạng cho các tập sự vô can',
        labelEn: 'Seize financial ledgers while sparing the innocent apprentice clerks',
        resultVi: 'Öufi chấp thuận hồ sơ nhưng ghi chú về sự khoan dung của bạn. Bạn giữ được sự thanh thản trong tâm trí.',
        resultEn: 'Öufi accepted the evidence while filing a note on your restraint. Your conscience remained clean.',
        effects: { wealth: +22, sanity: +12, rep: +15 },
        meritAdd: 20,
        flagsAdd: ['oufi_contract_done']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 4. FIVE FINGERS SYNDICATE EXPANSIONS (8 Events)
  // --------------------------------------------------------------------------
  {
    id: 'syn_exp_thumb_iron_discipline_trial',
    age: [22, 60],
    major: true,
    weight: 24,
    need: { jobs: ['Syndicate'], finger: 'Thumb' },
    forbids: ['thumb_discipline_done'],
    tags: ['syndicate'],
    vi: '[Kỷ Luật Thép Của The Thumb] Một Capo của Thumb gọi bạn lên thẩm vấn vì một thuộc hạ dưới quyền bạn đã có lời lẽ vô lễ với một Sotto-Capo. Theo quân luật, hoặc bạn tự chặt một ngón tay của kẻ đó, hoặc tự lãnh phạt.',
    en: '[The Thumb’s Iron Protocol] A Thumb Capo summoned you because a subordinate under your watch spoke out of line before a Sotto-Capo. Under code, either you sever the underling’s finger, or accept reprimand yourself.',
    choices: [
      {
        labelVi: 'Chặt ngón tay của thuộc hạ đúng theo nghi lễ quân pháp nghiêm khắc',
        labelEn: 'Sever the underling’s finger strictly observing protocol ritual',
        resultVi: 'Lưỡi dao hạ xuống dứt khoát không run rẩy. Vị Capo gật đầu hài lòng trước sự tuân phục tuyệt đối của bạn đối với thứ bậc Thumb.',
        resultEn: 'The blade fell cleanly without tremor. The Capo nodded in cold approval at your absolute fidelity to the Thumb’s chain of command.',
        effects: { sanity: -12, rep: +25 },
        meritAdd: 25,
        flagsAdd: ['thumb_discipline_done']
      },
      {
        labelVi: 'Đứng ra nhận trách nhiệm quản giáo kém, chịu ba phát đạn vào giáp ngực',
        labelEn: 'Take the blame for lax discipline, taking three rounds to the breastplate',
        resultVi: 'Ba phát đạn nổ chát chúa làm nứt giáp ngực và bầm dập lồng ngực bạn. Đám đàn em nhìn bạn bằng ánh mắt kính trọng tột cùng.',
        resultEn: 'Three heavy slugs fractured your cuirass and bruised your ribs to stone. Your underlings watched with fierce reverence.',
        effects: { health: -28, sanity: +10, rep: +30 },
        meritAdd: 28,
        flagsAdd: ['thumb_discipline_done', 'ThumbLoyalShield']
      }
    ]
  },
  {
    id: 'syn_exp_index_prescript_pilgrimage',
    age: [21, 60],
    major: true,
    weight: 24,
    need: { jobs: ['Syndicate'], finger: 'Index' },
    forbids: ['index_prescript_pilgrim_done'],
    tags: ['syndicate'],
    vi: '[Mệnh Lệnh Không Tưởng Của The Index] Tờ Prescript từ người đưa tin Proselyte ghi rõ: "Bước đi lùi ba trăm bước vào lúc nửa đêm, đặt một bông hoa hồng trắng vào hòm thư nhà số 42, rồi cắt đứt dây đàn của cây phong cầm."',
    en: '[The Index’s Impossible Prescript] The parchment from the Proselyte read: "Take three hundred paces backward at midnight, place one white rose inside mailbox 42, then sever the third string of the street accordion."',
    choices: [
      {
        labelVi: 'Tuân thủ tuyệt đối từng chữ trong chỉ dụ không thắc mắc',
        labelEn: 'Execute every syllable of the decree without question',
        resultVi: 'Sáng hôm sau bạn nghe tin vụ nổ khí ga ở nhà số 42 đã không xảy ra vì đường ống được sửa lúc người ta nhặt hoa. Ý chí của Thành Phố đã vận hành qua tay bạn.',
        resultEn: 'At dawn you learned a fatal gas leak at 42 was averted when someone checked the flower. The City’s will wove through your blind compliance.',
        effects: { sanity: +15, resonance: +18 },
        meritAdd: 28,
        flagsAdd: ['index_prescript_pilgrim_done']
      },
      {
        labelVi: 'Tìm hiểu ngọn nguồn logic ẩn giấu đằng sau chỉ dụ',
        labelEn: 'Investigate the hidden causal chain behind the decree',
        resultVi: 'Bạn nhận ra chuỗi nhân quả kinh hoàng được sắp đặt bởi The City. Sự thấu hiểu mang lại tri thức nhưng làm đầu óc bạn căng thẳng tột độ.',
        resultEn: 'You unraveled the terrifying chain of causes laid by The City. Understanding granted insight but pushed sanity to the brink.',
        effects: { sanity: -15, resonance: +25 },
        meritAdd: 20,
        flagsAdd: ['index_prescript_pilgrim_done']
      }
    ]
  },
  {
    id: 'syn_exp_middle_brotherhood_blood_debt',
    age: [20, 60],
    major: true,
    weight: 25,
    need: { jobs: ['Syndicate'], finger: 'Middle' },
    forbids: ['middle_blood_debt_done'],
    tags: ['combat', 'syndicate'],
    vi: '[Món Nợ Trong Cuốn Sổ Hận Thù] Cuốn Book of Vengeance gọi tên một nhóm cướp vừa làm trầy xước cánh tay của một em nhỏ trong khu phố của The Middle. Đại Ca ra lệnh cho bạn dẫn đầu đội trừng phạt.',
    en: '[The Ledger of Vengeance Call] The Book of Vengeance named a crew who bruised an orphan in the Middle’s residential ward. A Big Brother commanded you to lead the punitive march.',
    choices: [
      {
        labelVi: 'Dẫn đầu huynh đệ đập nát sào huyệt lũ cướp bằng xích sắt',
        labelEn: 'Lead brothers to pulverize the hideout with iron chains',
        resultVi: 'Xích sắt gầm vang trong ngõ hẹp; không một tên nào lành lặn thoát thân. Tên của bọn chúng bị gạch bỏ bằng mực đỏ rực rỡ trong sổ thù.',
        resultEn: 'Chains roared through the corridor; none escaped unblemished. Their entries were struck out with gleaming red ink in the ledger.',
        effects: { health: -14, sanity: +12, rep: +25 },
        meritAdd: 28,
        flagsAdd: ['middle_blood_debt_done', 'MiddleChainEnforcer']
      },
      {
        labelVi: 'Bắt lũ cướp quỳ gối xin lỗi và bồi thường gấp mười lần Ahn',
        labelEn: 'Force the raiders to kneel and pay tenfold restitution',
        resultVi: 'Món tiền bồi thường lớn xoa dịu cơn giận của khu phố. Đại ca vỗ vai khen ngợi cách giải quyết thực tế của bạn.',
        resultEn: 'The massive restitution pacified the ward’s wrath. The Big Brother praised your pragmatic restitution collection.',
        effects: { wealth: +30, rep: +18 },
        meritAdd: 22,
        flagsAdd: ['middle_blood_debt_done']
      }
    ]
  },
  {
    id: 'syn_exp_ring_macabre_gallery_critique',
    age: [22, 65],
    major: true,
    weight: 23,
    need: { jobs: ['Syndicate'], finger: 'Ring' },
    forbids: ['ring_gallery_critique_done'],
    tags: ['syndicate'],
    vi: '[Triển Lãm Nghệ Thuật Của The Ring] Một Maestro mời bạn đến thưởng lãm tác phẩm điêu khắc mới làm từ xương và nội tạng của các nạn nhân vi phạm bản quyền tranh. Ông yêu cầu bạn đưa ra lời bình phẩm chân thật.',
    en: '[The Ring’s Macabre Vernissage] A Maestro invited you to evaluate a new sculpture crafted from bone and viscera of copyright violators. He demanded your candid artistic critique.',
    choices: [
      {
        labelVi: 'Khen ngợi bố cục ánh sáng và sự hài hòa của những đường gân máu',
        labelEn: 'Praise the lighting geometry and visceral harmony of the sinews',
        resultVi: 'Vị Maestro mỉm cười tán thưởng gu thẩm mỹ lập dị của bạn, tặng bạn một cây cọ vẽ tẩm hóa chất bảo quản quý hiếm.',
        resultEn: 'The Maestro smiled in decadent delight at your eye, gifting a specialized brush cured with rare preservation solvents.',
        effects: { sanity: -10, resonance: +18, rep: +22 },
        meritAdd: 25,
        flagsAdd: ['ring_gallery_critique_done', 'RingArtConnoisseur']
      },
      {
        labelVi: 'Chỉ ra sự thiếu hụt trong nhịp điệu của các mảnh xương gãy',
        labelEn: 'Point out structural dissonance in the rhythm of shattered bones',
        resultVi: 'Lời nhận xét sắc sảo làm Maestro trầm ngâm hồi lâu trước khi gật đầu đồng ý. Danh tiếng của bạn vang dội khắp xưởng vẽ.',
        resultEn: 'The razor critique gave the Maestro pause before he nodded in sober accord. Your aesthetic stature rose across the atelier.',
        effects: { sanity: -8, rep: +26 },
        meritAdd: 28,
        flagsAdd: ['ring_gallery_critique_done']
      }
    ]
  },
  {
    id: 'syn_exp_pinky_clandestine_whisper_net',
    age: [21, 60],
    major: true,
    weight: 23,
    need: { jobs: ['Syndicate'], finger: 'Pinky' },
    forbids: ['pinky_whisper_done'],
    tags: ['syndicate'],
    vi: '[Mạng Lưới Dây Tơ Của The Pinky] Người đưa tin của Ngón Út giao cho bạn một phong thư niêm bằng sáp đen không chữ, bảo bạn chuyển đến tay một kẻ ăn mày ở ngã tư mà không được nhìn vào mặt người đó.',
    en: '[The Pinky’s Silk Filament Network] A Pinky courier handed you a blank black-wax sealed envelope, instructing you to deliver it to a beggar at the crossroads without looking at their face.',
    choices: [
      {
        labelVi: 'Lặng lẽ đặt phong thư vào nón người ăn mày rồi bước đi ngay',
        labelEn: 'Silently drop the letter into the beggar’s bowl and walk away',
        resultVi: 'Nhiệm vụ hoàn thành trơn tru. Sáng hôm sau, một khoản tiền lớn và mật khẩu mạng lưới thông tin xuất hiện trong hòm thư của bạn.',
        resultEn: 'Delivery proceeded seamlessly. The next dawn, a generous pouch and cipher keys appeared inside your postbox.',
        effects: { wealth: +30, network: +20, sanity: +5 },
        meritAdd: 25,
        flagsAdd: ['pinky_whisper_done']
      },
      {
        labelVi: 'Liếc nhìn vào đôi mắt người ăn mày trong khoảnh khắc giao thư',
        labelEn: 'Glance into the beggar’s eyes during the handoff moment',
        resultVi: 'Đằng sau lớp bùn đất là ánh mắt của một điệp viên Wing cấp cao. Sự tò mò suýt khiến bạn trả giá bằng mạng sống nhưng mang lại tin tức mật.',
        resultEn: 'Beneath the grime lay the cold eyes of a senior Wing operative. Curiosity nearly cost your life but earned priceless intel.',
        effects: { sanity: -14, resonance: +20, network: +15 },
        meritAdd: 22,
        flagsAdd: ['pinky_whisper_done']
      }
    ]
  },
  {
    id: 'syn_exp_backstreet_brawl_territory',
    age: [19, 50],
    major: true,
    weight: 26,
    need: { jobs: ['Syndicate'] },
    forbids: ['brawl_territory_done'],
    tags: ['combat', 'syndicate'],
    vi: '[Cuộc Chiến Ngõ Hẻm Tranh Giành Địa Bàn] Một băng nhóm đối thủ từ quận bên cạnh tràn sang cướp các sòng bạc và quán ăn dưới sự bảo kê của nhóm bạn. Đao kiếm và súng ngắn nổ ran khắp dãy phố.',
    en: '[Backstreet Turf War Eruption] A rival crew crossed the border to seize casinos and noodle shops under your outfit’s protection. Cleavers and sidearms echoed across the block.',
    choices: [
      {
        labelVi: 'Xung phong chém gục tên đầu lĩnh đối phương để bẻ gãy nhuệ khí',
        labelEn: 'Lead the charge to cut down the rival captain',
        outcomes: [
          {
            w: 65,
            resultVi: 'Nhát chém uy lực chém gãy vũ khí và hạ gục viên chỉ huy đối phương. Đám tay chân hoảng loạn tháo chạy, địa bàn của bạn được mở rộng.',
            resultEn: 'A savage blow snapped their captain’s steel and dropped him. The gang routed in panic; your syndicate’s border expanded.',
            effects: { health: -16, rep: +25, wealth: +25 },
            meritAdd: 30,
            flagsAdd: ['brawl_territory_done']
          },
          {
            w: 35,
            resultVi: 'Bạn hạ được mục tiêu nhưng trúng đạn vào bả vai; huynh đệ kịp lao vào yểm trợ đưa bạn về trạm xá.',
            resultEn: 'You felled the target but took a round to the shoulder; comrades swarmed in to drag you to the field medic.',
            effects: { health: -30, rep: +18, wealth: +15 },
            meritAdd: 18,
            scarsAdd: ['Vết đạn tranh giành địa bàn'],
            flagsAdd: ['brawl_territory_done']
          }
        ]
      },
      {
        labelVi: 'Dàn trận phòng thủ ngõ hẹp, dùng súng kẹp chặt lối vào',
        labelEn: 'Hold the chokepoint, pinning the entrance with steady gunfire',
        resultVi: 'Đội hình hỏa lực chặt chẽ đẩy lùi ba đợt tấn công của địch mà thương vong trong nhóm được giảm thiểu tối đa.',
        resultEn: 'Disciplined suppressive fire repelled three assaults with minimal syndicate casualties.',
        effects: { health: -8, rep: +15, wealth: +15 },
        meritAdd: 20,
        flagsAdd: ['brawl_territory_done']
      }
    ]
  },
  {
    id: 'syn_exp_black_market_contraband_heist',
    age: [21, 55],
    major: true,
    weight: 23,
    need: { jobs: ['Syndicate'] },
    forbids: ['contraband_heist_done'],
    tags: ['syndicate'],
    vi: '[Vụ Cướp Hàng Buôn Lậu Của Corp] Syndicate của bạn lên kế hoạch đánh cướp một đoàn xe vận chuyển linh kiện Singularity thử nghiệm của một Wing khi xe đi qua vùng tối Backstreets.',
    en: '[Wing Prototype Shipment Heist] Your syndicate drafted an ambush against an armored convoy hauling prototype Singularity components through Backstreet blind spots.',
    choices: [
      {
        labelVi: 'Kích nổ bẫy lật xe và cướp thùng hàng công nghệ cao',
        labelEn: 'Detonate charges to flip the carrier and seize the payload',
        outcomes: [
          {
            w: 60,
            resultVi: 'Vụ nổ hoàn hảo; bạn khống chế đội bảo vệ và mang về thùng hàng nguyên vẹn. Cấp trên thưởng nóng cho bạn một khoản tiền kếch xù.',
            resultEn: 'A textbook ambush; you subdued the guards and hauled the intact crate away. Superiors rewarded you with an immense cut.',
            effects: { wealth: +50, rep: +25, heat: +30 },
            meritAdd: 35,
            flagsAdd: ['contraband_heist_done']
          },
          {
            w: 40,
            resultVi: 'Hệ thống an ninh tự động của xe kích hoạt súng laser phản pháo, thiêu cháy một mảng da tay bạn trước khi rút lui.',
            resultEn: 'The carrier’s automated laser grid flared, searing your forearm before the unit could extract.',
            effects: { health: -28, wealth: +30, heat: +40 },
            meritAdd: 20,
            scarsAdd: ['Vết bỏng laser cướp xe Wing'],
            flagsAdd: ['contraband_heist_done']
          }
        ]
      },
      {
        labelVi: 'Làm tài xế mở đường máu tẩu thoát qua các ngõ hẹp',
        labelEn: 'Drive the getaway truck through narrow maintenance tunnels',
        resultVi: 'Tay lái điêu luyện của bạn bỏ rơi toàn bộ xe tuần tra của cảnh giới khu vực. Chiến lợi phẩm về kho an toàn.',
        resultEn: 'Expert wheelwork left district pursuit vehicles choked in dust. The loot reached syndicate lockups safely.',
        effects: { wealth: +35, rep: +18 },
        meritAdd: 25,
        flagsAdd: ['contraband_heist_done']
      }
    ]
  },
  {
    id: 'syn_exp_underground_gambling_den_raid',
    age: [22, 60],
    major: true,
    weight: 22,
    need: { jobs: ['Syndicate'] },
    forbids: ['gambling_raid_done'],
    tags: ['syndicate'],
    vi: '[Đột Kích Sòng Bạc Ngầm] Cảnh sát khu vực và Fixer hợp đồng bất ngờ bao vây sòng bạc lớn mà nhóm bạn đang quản lý. Bạn phải quyết định hủy tài liệu sổ sách hay bảo vệ két sắt chứa tiền.',
    en: '[Underground Casino Raid] District inspectors and contracted Fixers mounted a surprise surround on your syndicate’s prime casino. You must choose between burning ledgers or securing the cash vault.',
    choices: [
      {
        labelVi: 'Thiêu rụi toàn bộ sổ sách khách hàng để bảo vệ bí mật tổ chức',
        labelEn: 'Incinerate customer ledgers to shield syndicate secrets',
        resultVi: 'Ngọn lửa nuốt trọn mọi bằng chứng trước khi lực lượng cảnh sát ập vào. Cấp trên ghi nhận lòng trung thành tuyệt đối của bạn.',
        resultEn: 'Fire consumed all evidence seconds before inspectors breached. Superiors formally commended your unquestioning loyalty.',
        effects: { sanity: +5, rep: +25, heat: -15 },
        meritAdd: 25,
        flagsAdd: ['gambling_raid_done']
      },
      {
        labelVi: 'Dùng tiểu liên mở đường máu ôm két sắt tiền mặt tẩu thoát',
        labelEn: 'Unload an SMG to fight your way out with the cash vault',
        resultVi: 'Bạn xách két sắt lao qua cửa sau trong làn mưa đạn, mang về an toàn toàn bộ số tiền cược của đêm đó.',
        resultEn: 'Clutching the lockbox you blasted through the rear exit, preserving the entire night’s rake intact.',
        effects: { health: -18, wealth: +40, heat: +25 },
        meritAdd: 28,
        flagsAdd: ['gambling_raid_done']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 5. WING EMPLOYEE & DISTRICT FLAVOR EXPANSIONS (8 Events)
  // --------------------------------------------------------------------------
  {
    id: 'wing_exp_corp_singularity_leak_containment',
    age: [22, 60],
    major: true,
    weight: 25,
    need: { jobs: ['Wing Employee'] },
    forbids: ['singularity_leak_done'],
    tags: ['wing'],
    vi: '[Sự Cố Rò Rỉ Singularity] Buồng chứa phụ của Wing phát tín hiệu báo động cấp 3: Singularity độc quyền bắt đầu biến đổi cấu trúc không gian xung quanh. Quản đốc yêu cầu đội bạn mặc đồ bảo hộ vào đóng van khẩn cấp.',
    en: '[Singularity Chamber Rupture] Wing containment sub-bay three issued a critical alert: the proprietary Singularity began distorting local spatial geometry. The supervisor ordered your team into hazard suits to turn the manual valve.',
    choices: [
      {
        labelVi: 'Xông vào tâm vùng rò rỉ xoay van khóa bằng tay',
        labelEn: 'Sprint into the distortion core to torque the emergency seal',
        outcomes: [
          {
            w: 60,
            resultVi: 'Không gian méo mó như bóp nghẹt lồng ngực bạn, nhưng bạn đã vặn chặt van khóa. Thảm họa được ngăn chặn; Wing thăng chức đặc cách cho bạn.',
            resultEn: 'Warped space crushed your chest like a vice, but you seated the valve. Disaster was averted; the Wing granted an expedited promotion credit.',
            effects: { health: -18, sanity: -10, rep: +30 },
            meritAdd: 35,
            flagsAdd: ['singularity_leak_done', 'ContainmentHero']
          },
          {
            w: 40,
            resultVi: 'Một luồng năng lượng rò rỉ làm biến dạng bàn tay trái của bạn trước khi van đóng; bạn được đưa vào phòng hồi sức khẩn cấp.',
            resultEn: 'A stray energy pulse altered your left hand before the valve locked; you were rushed to emergency trauma stasis.',
            effects: { health: -35, sanity: -20, rep: +20 },
            meritAdd: 22,
            scarsAdd: ['Biến dạng không gian trên tay'],
            flagsAdd: ['singularity_leak_done']
          }
        ]
      },
      {
        labelVi: 'Kích hoạt tường chắn cách ly tầng, cô lập khu vực gặp sự cố',
        labelEn: 'Engage blast bulkhead seals, isolating the ruptured floor',
        resultVi: 'Khu vực bị phong tỏa; vài nhân viên bên trong bị mắc kẹt nhưng cơ sở nghiên cứu chính được bảo vệ trọn vẹn.',
        resultEn: 'The wing sealed shut; several workers remained trapped within, but the main research complex held completely intact.',
        effects: { sanity: -12, rep: +15 },
        meritAdd: 18,
        flagsAdd: ['singularity_leak_done']
      }
    ]
  },
  {
    id: 'wing_exp_internal_audit_espionage',
    age: [23, 62],
    major: true,
    weight: 24,
    need: { jobs: ['Wing Employee'] },
    forbids: ['internal_audit_done'],
    tags: ['wing'],
    vi: '[Cuộc Thanh Tra Của Ban Giám Sát] Bộ phận Giám sát Nội bộ triệu tập bạn thẩm vấn sau khi phát hiện một đồng nghiệp cùng phòng làm việc bí mật sao chép dữ liệu bằng sáng chế cho một Corp đối thủ.',
    en: '[Internal Affairs Inquest] Internal Security summoned you for interrogation after uncovering that your cubicle peer secretly copied patent schematics for a rival Wing.',
    choices: [
      {
        labelVi: 'Cung cấp toàn bộ nhật ký ra vào và bằng chứng vạch trần kẻ gián điệp',
        labelEn: 'Turn over badge logs and files unmasking the corporate spy',
        resultVi: 'Kẻ phản bội bị giải đi ngay lập tức. Ban điều hành đánh giá cao tính trung thực và ban thưởng cho bạn một khoản tiền lớn.',
        resultEn: 'The traitor was escorted off-site in zip-ties. Directorate lauded your integrity, depositing a substantial bonus into your account.',
        effects: { wealth: +35, rep: +22, sanity: -5 },
        meritAdd: 28,
        flagsAdd: ['internal_audit_done']
      },
      {
        labelVi: 'Khai báo mơ hồ để tránh làm hại đồng nghiệp nhưng không tự liên lụy',
        labelEn: 'Provide ambiguous testimony to shield the peer without liability',
        resultVi: 'Đồng nghiệp của bạn kịp thời biến mất trước khi bị bắt. Họ gửi lại một tin nhắn cảm ơn và một mật mã tài khoản ẩn danh.',
        resultEn: 'Your colleague slipped out the transit gates before apprehension, leaving behind an anonymous crypto-token of gratitude.',
        effects: { wealth: +25, network: +15, sanity: +5 },
        meritAdd: 15,
        flagsAdd: ['internal_audit_done']
      }
    ]
  },
  {
    id: 'wing_exp_executive_boardroom_presentation',
    age: [28, 65],
    major: true,
    weight: 23,
    need: { jobs: ['Wing Employee'] },
    forbids: ['boardroom_presentation_done'],
    tags: ['wing'],
    vi: '[Bản Báo Cáo Trước Hội Đồng Quản Trị] Dự án tối ưu hóa lợi nhuận quý do bạn chủ trì được chọn trình bày trước Hội đồng Giám đốc Điều hành của Wing. Mọi ánh mắt sắc lạnh đang nhìn chằm chằm vào biểu đồ của bạn.',
    en: '[Executive Boardroom Presentation] Your quarterly optimization proposal was selected for presentation before the Wing’s Executive Directorate. Cold, razor eyes fixed upon your balance sheets.',
    choices: [
      {
        labelVi: 'Tự tin thuyết trình giải pháp cắt giảm chi phí nhân sự triệt để',
        labelEn: 'Confidently pitch aggressive headcount restructuring',
        resultVi: 'Các Giám đốc gật đầu tán thưởng bản kế hoạch không chút do dự. Bạn được thăng chức lên vị trí quản lý cấp cao ngay trong tuần đó.',
        resultEn: 'Directors nodded in cold approval at your ruthlessness. You were advanced to senior oversight before the week closed.',
        effects: { sanity: -8, rep: +30, wealth: +30 },
        meritAdd: 35,
        flagsAdd: ['boardroom_presentation_done']
      },
      {
        labelVi: 'Đề xuất cải thiện điều kiện làm việc để nâng cao năng suất tự nhiên',
        labelEn: 'Advocate improving workstation ergonomics for organic output',
        resultVi: 'Hội đồng im lặng một thoáng; kế hoạch được duyệt một phần vì tính khả thi thực tế, nhân viên cấp dưới tôn sùng bạn như một vị cứu tinh.',
        resultEn: 'The board fell silent; the initiative passed in part for practical yield, winning you deep loyalty from frontline staff.',
        effects: { sanity: +15, rep: +18, network: +20 },
        meritAdd: 22,
        flagsAdd: ['boardroom_presentation_done']
      }
    ]
  },
  {
    id: 'reg_exp_district_20_glass_mirage',
    age: [18, 70],
    major: true,
    weight: 22,
    forbids: ['d20_mirage_seen'],
    vi: '[Ảo Ảnh Gương Kính District 20] Đi qua khu trung tâm T Corp ở District 20, các bề mặt kính của những tòa tháp khổng lồ phản chiếu các dòng thời gian khác nhau của cuộc đời bạn: những phiên bản giàu có hơn, tàn bạo hơn hoặc đã chết từ lâu.',
    en: '[District 20 Mirror Mirage] Crossing the center of District 20 under T Corp towers, massive window panes reflected alternate timelines of your life: richer variants, bloodier monsters, or versions long buried.',
    choices: [
      {
        labelVi: 'Dừng lại quan sát phiên bản tương lai thành đạt nhất của mình',
        labelEn: 'Gaze into the reflection of your most triumphant future self',
        resultVi: 'Hình ảnh quyền uy của bản thân tiếp thêm ngọn lửa tham vọng mãnh liệt trong lòng bạn; bạn bước đi với quyết tâm sắt đá.',
        resultEn: 'The regal posture of your alternate self fueled blazing ambition; you stepped forward with hardened purpose.',
        effects: { sanity: +12, rep: +10, resonance: +10 },
        flagsAdd: ['d20_mirage_seen']
      },
      {
        labelVi: 'Nhìn vào phiên bản đã chết để ghi nhớ bài học cảnh giác sinh tồn',
        labelEn: 'Examine the fallen reflection to study fatal blindspots',
        resultVi: 'Nhìn thấy vết thương chí mạng trên hình bóng phản chiếu giúp bạn nhận ra những sơ hở trong lối di chuyển hàng ngày của mình.',
        resultEn: 'Scrutinizing the mortal wound across the glass revealed critical oversights in your daily patrol habits.',
        effects: { health: +5, sanity: -4, resonance: +12 },
        flagsAdd: ['d20_mirage_seen']
      }
    ]
  },
  {
    id: 'reg_exp_district_23_gourmet_banquet_ticket',
    age: [20, 65],
    major: true,
    weight: 22,
    forbids: ['d23_banquet_attended'],
    vi: '[Tấm Vé Đại Tiệc District 23] Bạn nhận được một tấm thiệp mạ vàng mời tham dự bữa tiệc đêm của một câu lạc bộ ẩm thực ngầm tại District 23. Món khai vị được đồn là chế biến từ nội tạng của các võ sư danh tiếng.',
    en: '[District 23 Gastronomic Soiree Ticket] You received a gilt-edged invitation to an elite midnight dining salon in District 23. The opening course was rumored to be prepared from the liver of a renowned martial artist.',
    choices: [
      {
        labelVi: 'Dũng cảm tham dự và nếm thử món ăn kỳ dị để mở rộng quan hệ',
        labelEn: 'Attend and taste the arcane delicacy to expand connections',
        resultVi: 'Hương vị bùng nổ kỳ dị làm đảo lộn vị giác nhưng giúp bạn làm quen với các quý tộc quyền lực và những tay buôn sành sỏi.',
        resultEn: 'The bizarre burst of flavor warped your palate but ingratiated you with wealthy patrons and gourmet syndicates.',
        effects: { health: -10, sanity: -15, rep: +25, network: +20 },
        flagsAdd: ['d23_banquet_attended', 'GourmetInitiate']
      },
      {
        labelVi: 'Bán tấm vé cho một gã nhà giàu sành ăn ở Backstreets lấy 30 Ahn',
        labelEn: 'Sell the golden ticket to a wealthy Backstreet foodie for 30 Ahn',
        resultVi: 'Gã nhà giàu mừng rỡ trả đủ 30 Ahn tiền tươi. Bạn dùng số tiền đó mua một bữa ăn ấm cúng bình dị và an toàn.',
        resultEn: 'The buyer paid 30 Ahn in fresh banknotes. You spent the proceeds on a warm, safe, ordinary stew dinner.',
        effects: { wealth: +30, sanity: +5 },
        flagsAdd: ['d23_banquet_attended']
      }
    ]
  },
  {
    id: 'reg_exp_district_11_smoke_refinery_shift',
    age: [18, 55],
    major: true,
    weight: 23,
    forbids: ['d11_smoke_shift_done'],
    vi: '[Ca Làm Việc Trong Màn Khói District 11] Bạn nhận một ca phụ việc tại nhà máy lọc khói khổng lồ của District 11. Khói đen kịt phủ kín không gian, đòi hỏi công nhân phải thay màng lọc độc hại mỗi 30 phút.',
    en: '[District 11 Smoke Refinery Shift] You took a relief contract at District 11’s industrial refinery. Choking soot blanketed the bays, requiring workers to swap toxin filters every thirty minutes.',
    choices: [
      {
        labelVi: 'Làm việc liên tục ba ca để nhận mức tiền công phụ cấp gấp đôi',
        labelEn: 'Work three consecutive shifts for double hazard overtime',
        resultVi: 'Cổ họng bạn rát bỏng vì bụi than nhưng túi tiền căng phồng với 28 Ahn tiền công tăng ca xứng đáng.',
        resultEn: 'Soot rasped raw against your lungs, but your pouch bulged with 28 Ahn in well-earned overtime wages.',
        effects: { health: -15, wealth: +28, sanity: -6 },
        flagsAdd: ['d11_smoke_shift_done']
      },
      {
        labelVi: 'Hoàn thành đúng một ca tiêu chuẩn rồi rời đi ngay lập tức',
        labelEn: 'Complete one standard shift and clock out immediately',
        resultVi: 'Bạn bảo vệ được lá phổi của mình và nhận vừa đủ tiền sinh hoạt cho vài ngày tới.',
        resultEn: 'You guarded your lungs from soot build-up, collecting enough coin for a few quiet days.',
        effects: { wealth: +12, sanity: +2 },
        flagsAdd: ['d11_smoke_shift_done']
      }
    ]
  },
  {
    id: 'reg_exp_district_9_musical_frenzy',
    age: [19, 60],
    major: true,
    weight: 21,
    forbids: ['d9_frenzy_witnessed'],
    vi: '[Bản Giao Hưởng Điên Loạn District 9] Giữa quảng trường District 9, một nghệ sĩ vĩ cầm đường phố chơi một bản nhạc có tần số kỳ lạ khiến đám đông người nghe bắt đầu nhảy múa điên cuồng đến mức rách cả giày và chảy máu chân.',
    en: '[District 9 Harmonic Frenzy] In a District 9 square, an itinerant violinist played an eerie resonant cadenza, driving the listening crowd into manic waltzes until boots tore and soles bled.',
    choices: [
      {
        labelVi: 'Dùng vải nhét chặt tai, xông vào đập vỡ cây vĩ cầm để cứu đám đông',
        labelEn: 'Plug ears with cloth and rush forward to shatter the fiddle',
        resultVi: 'Cây đàn vỡ đôi, bản nhạc dứt bặt. Đám đông ngã quỵ thở dốc; nhiều người cảm kích trao tặng bạn đồ vật có giá trị.',
        resultEn: 'The instrument splintered and silence returned. The crowd collapsed gasping; several gifted you valuables in tearful relief.',
        effects: { health: -8, sanity: -4, rep: +20, wealth: +15 },
        flagsAdd: ['d9_frenzy_witnessed']
      },
      {
        labelVi: 'Đứng ngoài rìa lắng nghe để cảm nhận giai điệu của sự cộng hưởng',
        labelEn: 'Listen from the perimeter to absorb the resonant harmonic',
        resultVi: 'Giai điệu kỳ quái khắc sâu vào tâm trí bạn, đánh thức một tầng nhận thức mới về rung cảm cảm xúc của The City.',
        resultEn: 'The eerie timbre engraved into your mind, opening a new wavelength of emotional resonance across The City.',
        effects: { sanity: -12, resonance: +18 },
        flagsAdd: ['d9_frenzy_witnessed', 'HarmonicEar']
      }
    ]
  },
  {
    id: 'reg_exp_district_18_shipyard_drydock_collapse',
    age: [20, 60],
    major: true,
    weight: 22,
    forbids: ['d18_drydock_collapse_done'],
    vi: '[Tai Nạn Ụ Tàu District 18] Tại ụ đóng tàu giáp Đại Hồ ở District 18, một dàn giáo khổng lồ sập xuống đè lên chiếc thuyền đánh cá bọc thép. Tiếng la hét cầu cứu vang lên dưới những thanh dầm kim loại.',
    en: '[District 18 Drydock Collapse] At a Great Lake slipway in District 18, scaffolding buckled across an armored fishing trawler. Screams for rescue echoed beneath twisted structural girders.',
    choices: [
      {
        labelVi: 'Lao vào nâng xà thép giải cứu các thợ thuyền đang bị kẹt',
        labelEn: 'Heave structural beams aside to extract trapped dockers',
        outcomes: [
          {
            w: 65,
            resultVi: 'Sức mạnh cơ bắp của bạn cứu được bốn thợ đóng tàu trước khi dầm thứ hai sập xuống. Nghiệp đoàn thợ thuyền tôn vinh bạn như một người hùng.',
            resultEn: 'Raw muscle hauled four shipwrights clear before secondary girders crashed. The dockers’ union toasted you as their savior.',
            effects: { health: -14, sanity: +10, rep: +25 },
            flagsAdd: ['d18_drydock_collapse_done', 'DockersHero']
          },
          {
            w: 35,
            resultVi: 'Một thanh xà văng trúng đùi bạn trong khi kéo người bị nạn ra; bạn cứu được người nhưng phải chống gậy một tháng.',
            resultEn: 'A shifting girder struck your thigh while hauling a victim; you saved lives but leaned on a crutch for a month.',
            effects: { health: -28, rep: +18 },
            scarsAdd: ['Chấn thương ụ tàu'],
            flagsAdd: ['d18_drydock_collapse_done']
          }
        ]
      },
      {
        labelVi: 'Chỉ huy đám đông dựng kích thủy lực để nâng giàn giáo an toàn',
        labelEn: 'Direct the crowd with hydraulic jacks for a controlled lift',
        resultVi: 'Sự bình tĩnh của bạn giúp việc cứu hộ diễn ra trật tự, hạn chế tối đa nguy cơ sập thứ cấp.',
        resultEn: 'Your cool command kept rescue operations disciplined, averting any secondary collapse.',
        effects: { rep: +18, sanity: +8, network: +10 },
        flagsAdd: ['d18_drydock_collapse_done']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 6. WORKSHOP CRAFTSMAN & DISTORTION EXPANSIONS (4 Events)
  // --------------------------------------------------------------------------
  {
    id: 'ws_exp_masterpiece_alloy_refinement',
    age: [25, 65],
    major: true,
    weight: 24,
    need: { jobs: ['Workshop Craftsman'] },
    forbids: ['masterpiece_alloy_done'],
    tags: ['workshop'],
    vi: '[Mẻ Thép Tuyệt Tác Của Workshop] Sau ba năm nghiên cứu công thức thất truyền, bạn gom đủ nguyên liệu quý để nung một mẻ hợp kim siêu bền trong lò tôi nhiệt áp suất cao. Nhiệt độ lò đã chạm ngưỡng tới hạn.',
    en: '[The Masterpiece Alloy Crucible] After three years refining lost metallurgical formulas, you gathered rare ingots to fire an ultra-durable alloy in your high-pressure forge. Core heat reached redline threshold.',
    choices: [
      {
        labelVi: 'Duy trì nhiệt độ tối đa, tự tay rèn thanh phôi thép dưới búa máy',
        labelEn: 'Hold peak heat and hammer the billet personally at the anvil',
        outcomes: [
          {
            w: 65,
            resultVi: 'Lưỡi kiếm rèn ra mang ánh xanh biếc tuyệt mỹ, chém sắt như chém bùn. Tác phẩm kiệt tác được Hiệp hội Tres đóng dấu chứng nhận hạng A.',
            resultEn: 'The forged blade gleamed with azure brilliance, shearing iron like loam. The masterpiece received a coveted Grade-A Tres seal.',
            effects: { health: -15, sanity: +20, rep: +35, wealth: +45 },
            meritAdd: 40,
            flagsAdd: ['masterpiece_alloy_done', 'MasterpieceCreated']
          },
          {
            w: 35,
            resultVi: 'Nồi nấu kim loại bị nứt nhẹ; bạn cứu được phôi thép nhưng bị bỏng rộp hai cánh tay do hơi nóng phả vào.',
            resultEn: 'The crucible fractured slightly; you saved the billet but took severe heat blisters across both forearms.',
            effects: { health: -28, sanity: +5, wealth: +25 },
            meritAdd: 20,
            scarsAdd: ['Vết bỏng lò rèn tuyệt tác'],
            flagsAdd: ['masterpiece_alloy_done']
          }
        ]
      },
      {
        labelVi: 'Hạ nhiệt độ an toàn, tạo ra một lô vũ khí tiêu chuẩn chất lượng cao',
        labelEn: 'Lower temperature to safe bounds, casting high-grade standard arms',
        resultVi: 'Bạn xuất xưởng mười thanh đao Workshop chất lượng đồng đều, bán sạch trong một buổi sáng cho các văn phòng Fixer trong vùng.',
        resultEn: 'You turned out ten uniformly tempered sabres, selling out in one morning to neighborhood Fixer offices.',
        effects: { wealth: +35, rep: +18 },
        meritAdd: 25,
        flagsAdd: ['masterpiece_alloy_done']
      }
    ]
  },
  {
    id: 'ws_exp_stolen_patent_dilemma',
    age: [24, 60],
    major: true,
    weight: 22,
    need: { jobs: ['Workshop Craftsman'] },
    forbids: ['stolen_patent_done'],
    tags: ['workshop'],
    vi: '[Bản Vẽ Bằng Sáng Chế Đánh Cắp] Một tên trộm công nghệ mang đến xưởng bạn bản thiết kế cơ cấu súng nén khí độc quyền của xưởng Atelier danh tiếng, gạ bán với giá rẻ 20 Ahn.',
    en: '[Stolen Atelier Patent Dilemma] A tech thief brought the proprietary pneumatic rifle blueprints of a renowned Atelier workshop to your counter, offering them for a meager 20 Ahn.',
    choices: [
      {
        labelVi: 'Mua lại bản vẽ để sao chép công nghệ vào các sản phẩm của mình',
        labelEn: 'Buy the plans to reverse-engineer into your product lines',
        resultVi: 'Vũ khí xưởng bạn nâng cấp vượt bậc về hỏa lực; lợi nhuận tăng vọt dẫu bạn luôn phải lo sợ sự điều tra từ Tres Association.',
        resultEn: 'Your workshop armaments surged in firepower; revenues soared, though you cast wary glances for Tres inspectors.',
        effects: { wealth: +40, rep: +20, heat: +25 },
        meritAdd: 28,
        flagsAdd: ['stolen_patent_done']
      },
      {
        labelVi: 'Đuổi tên trộm đi và báo cho Tres Association để giữ uy tín nghề nghiệp',
        labelEn: 'Turn the thief away and alert Tres Association to keep your honor',
        resultVi: 'Tres Association gửi thư khen ngợi đạo đức hành nghề của xưởng và miễn giảm thuế môn bài một năm cho bạn.',
        resultEn: 'Tres Association sent commendations for vocational ethics, granting your forge a one-year trademark excise waiver.',
        effects: { rep: +22, sanity: +10, wealth: +10 },
        meritAdd: 20,
        flagsAdd: ['stolen_patent_done']
      }
    ]
  },
  {
    id: 'dist_exp_monologue_in_the_rain',
    age: [20, 70],
    major: true,
    weight: 24,
    need: { jobs: ['Distortion'] },
    forbids: ['dist_rain_monologue_done'],
    tags: ['distortion'],
    vi: '[Độc Thoại Dưới Cơn Mưa Máu] Đứng trên đỉnh tháp chuông đổ nát trong hình hài biến dạng, bạn nghe thấy hàng ngàn tiếng thì thầm của cư dân thành phố đang quằn quại trong nỗi đau và sự kìm nén.',
    en: '[Soliloquy in Blood-Rain] Perched upon a shattered bell tower in your distorted flesh, you caught ten thousand whispers of City dwellers writhing in repression and despair.',
    choices: [
      {
        labelVi: 'Hét lên một tiếng gầm vang dội, truyền bá nỗi ám ảnh của bạn ra khắp quận',
        labelEn: 'Unleash a resonant roar, projecting your obsession across the ward',
        resultVi: 'Sóng âm cảm xúc chấn động cả khu phố; đèn đường vỡ vụn và những kẻ yếu đuối run rẩy quỳ rạp trước sự hiện diện vĩ đại của bạn.',
        resultEn: 'Emotional shockwaves rattled the ward; streetlamps burst and frail souls knelt before your monstrous epiphany.',
        effects: { sanity: -20, resonance: +35, rep: +25, heat: +35 },
        meritAdd: 30,
        flagsAdd: ['dist_rain_monologue_done']
      },
      {
        labelVi: 'Thu mình lại trong bóng tối, ôm lấy nỗi cô độc tuyệt đối của riêng mình',
        labelEn: 'Curl back into shadows, embracing your absolute personal solitude',
        resultVi: 'Bạn nhận ra mình không thuộc về thế giới con người nữa. Sự bình yên ma quái tràn ngập tâm trí bạn giữa màn mưa đen.',
        resultEn: 'You recognized you no longer belong to mortal mankind. Eerie serenity washed over your mind amid black downpours.',
        effects: { sanity: +15, resonance: +15 },
        flagsAdd: ['dist_rain_monologue_done']
      }
    ]
  },
  {
    id: 'dist_exp_fixer_hunt_encirclement',
    age: [20, 70],
    major: true,
    weight: 25,
    need: { jobs: ['Distortion'] },
    forbids: ['dist_hunt_encirclement_done'],
    tags: ['combat', 'distortion'],
    vi: '[Vòng Vây Của Các Fixer Săn Lùng] Ba đội Fixer hạng cao bao vây con hẻm cụt nơi bạn đang ẩn náu. Những sợi xích phong tỏa và đạn chống méo mó không gian chĩa thẳng vào cơ thể bạn.',
    en: '[Hunters’ Cordone Encirclement] Three senior Fixer strike teams sealed the dead end where you nested. Suppression chains and anti-distortion munitions leveled at your flesh.',
    choices: [
      {
        labelVi: 'Bùng nổ toàn bộ sức mạnh quái dị, xé toạc vòng vây trong biển máu',
        labelEn: 'Unleash full monstrous fury, tearing through the cordon in gore',
        outcomes: [
          {
            w: 60,
            resultVi: 'Móng vuốt và gai xương của bạn biến những kẻ săn mồi thành con mồi. Đội Fixer tan vỡ hoàn toàn; bạn ngạo nghễ bước đi trên đống đổ nát.',
            resultEn: 'Claws and bone spikes turned predators into shredded quarry. The teams scattered; you strode aloft over the ruin.',
            effects: { health: -20, sanity: -15, resonance: +35, rep: +30, heat: +40 },
            meritAdd: 35,
            flagsAdd: ['dist_hunt_encirclement_done']
          },
          {
            w: 40,
            resultVi: 'Bạn phá được vòng vây nhưng bị bắn trúng nhiều phát đạn kim loại nặng; bạn phải lặn sâu xuống lòng đất để tự chữa lành.',
            resultEn: 'You breached the perimeter but took heavy ordnance slugs; you burrowed deep beneath bedrock to regenerate.',
            effects: { health: -40, sanity: -20, resonance: +20 },
            scarsAdd: ['Vết đạn săn đuổi Distortion'],
            flagsAdd: ['dist_hunt_encirclement_done']
          }
        ]
      },
      {
        labelVi: 'Biến đổi hình dạng lẩn vào bóng tối cống ngầm thoát thân êm thắm',
        labelEn: 'Liquefy form into sewer murk to dissolve away undetected',
        resultVi: 'Cơ thể bạn tan chảy thành chất lỏng đen trượt qua các khe nắp cống. Đội Fixer chỉ tìm thấy một lớp da lột trống rỗng.',
        resultEn: 'Your mass dissolved into black ichor, sliding through drain grates. The hunters uncovered only a hollow molted husk.',
        effects: { health: -10, sanity: +5, heat: -10 },
        flagsAdd: ['dist_hunt_encirclement_done']
      }
    ]
  }
];

// ----------------------------------------------------------------------------
// CAUSAL CONSEQUENCE EXPANSIONS (8 Events)
// ----------------------------------------------------------------------------
export const EXPANSION_CONSEQUENCE_EVENTS = [
  {
    id: 'csq_npc_betrayer_ambush',
    major: true,
    isCausalCallback: true,
    tags: ['combat', 'nemesis'],
    vi: '[Phục Kích Của Kẻ Phản Bội] Trong đêm tối, {nemesis} dẫn theo một toán sát thủ bịt mặt chặn đứng đường về của bạn. Ánh mắt kẻ từng kề vai tác chiến rực lên tia hận thù điên dại: "Hôm nay, một trong hai ta phải nằm lại ở con ngõ này."',
    en: '[The Betrayer’s Ambush] In pitch darkness, {nemesis} and masked cutthroats barred your way home. Eyes that once watched your flank flared with frantic hatred: "Tonight, only one of us leaves this alley breathing."',
    choices: [
      {
        labelVi: 'Vung vũ khí quyết chiến sinh tử, kết liễu kẻ phản bội một lần và mãi mãi',
        labelEn: 'Draw steel for decisive reckoning, putting down the traitor once and for all',
        outcomes: [
          {
            w: 65,
            resultVi: 'Chiêu thức của bạn áp đảo hoàn toàn toán sát thủ. Lưỡi kiếm đâm xuyên tim {nemesis}; mối thù phản bội đã chính thức được khép lại bằng máu.',
            resultEn: 'Your technique decisively outmatched the ambuscade. Steel ran through {nemesis}’s heart; the treason was settled in blood.',
            effects: { health: -20, sanity: +20, rep: +25 },
            meritAdd: 30,
            npcFate: { nemesis: 'dead' },
            scarsAdd: ['Kết liễu kẻ phản bội']
          },
          {
            w: 35,
            resultVi: '{nemesis} điên cuồng chống trả, để lại một vết chém sâu vào vai bạn trước khi bị bạn đánh ngã xuống cống ngầm.',
            resultEn: '{nemesis} flailed with frantic spite, carving a deep gash into your shoulder before tumbling into the drain.',
            effects: { health: -38, sanity: -10, rep: +15 },
            scarsAdd: ['Vết chém từ kẻ phản bội'],
            npcFate: { nemesis: 'dead' }
          }
        ]
      },
      {
        labelVi: 'Kích hoạt mìn khói lựu đạn, rút lui an toàn qua đường cống',
        labelEn: 'Deploy smoke charges and extract through sewer bypasses',
        resultVi: 'Màn khói mù mịt giúp bạn thoát khỏi vòng vây của bầy sát thủ. Bạn bảo toàn được mạng sống nhưng mối nguy hiểm vẫn còn lẩn khuất.',
        resultEn: 'Dense smoke broke the kill box. You preserved life and limb, though the shadow of treason still stalks the quarter.',
        effects: { health: -10, sanity: -8, wealth: -15 }
      }
    ]
  },
  {
    id: 'csq_npc_rival_reckoning',
    major: true,
    isCausalCallback: true,
    tags: ['combat'],
    vi: '[Cuộc Tái Ngộ Đẫm Máu] Đối thủ truyền kiếp năm xưa tìm đến bạn với vũ khí Workshop được tôi luyện sắc lẹm. "Món nợ năm đó, đã đến lúc chúng ta tính cả vốn lẫn lãi."',
    en: '[The Rival’s Reckoning] Your longtime rival found you with newly tempered Workshop steel. "That old debt. Time to collect with interest."',
    choices: [
      {
        labelVi: 'Nghênh chiến sòng phẳng, chứng minh sự trưởng thành của bạn',
        labelEn: 'Engage squarely, proving how far your craft has grown',
        resultVi: 'Sau mười hiệp giằng co, bạn đánh gãy vũ khí đối thủ. Họ cúi đầu thừa nhận thất bại và thề sẽ không bao giờ quấy rầy bạn nữa.',
        resultEn: 'After ten blistering exchanges, you snapped their blade. They bowed in concession, swearing never to cross your path again.',
        effects: { health: -16, sanity: +18, rep: +25 },
        meritAdd: 25
      },
      {
        labelVi: 'Dùng mưu bẫy đối thủ vào ngõ cụt rồi tước vũ khí',
        labelEn: 'Lure them into a cul-de-sac trap to disarm them cold',
        resultVi: 'Bẫy lưới thép giam chặt đối thủ. Bạn tước vũ khí của họ và lấy đi một khoản tiền chuộc danh dự.',
        resultEn: 'A wire snare pinioned your rival. You stripped their arms and claimed an honorable ransom pouch.',
        effects: { wealth: +25, rep: +15, sanity: +8 }
      }
    ]
  },
  {
    id: 'csq_npc_sworn_rescue',
    major: true,
    isCausalCallback: true,
    tags: ['loyalty', 'camaraderie'],
    vi: '[Sự Chi Viện Của Người Huynh Đệ] Khi bạn bị một toán cướp dồn vào chân tường, người huynh đệ kết nghĩa năm xưa bất ngờ xuất hiện với vũ khí rực lửa, kề vai tác chiến cùng bạn mở đường máu.',
    en: '[Sworn Comrade’s Relief] Cornered by a roving kill team, your sworn comrade broke through the cordon blade ablaze, locking shields to carve a path out.',
    choices: [
      {
        labelVi: 'Cùng người anh em quét sạch toán cướp trong ngõ hẹp',
        labelEn: 'Sweep the alley clear alongside your blood brother',
        resultVi: 'Hai lưỡi kiếm phối hợp nhịp nhàng như một cỗ máy hoàn hảo. Toán cướp tan tác; tình huynh đệ giữa The City càng thêm sâu sắc.',
        resultEn: 'Two blades moved like clockwork machinery. The raiders broke; brotherhood in this cruel City grew unshakeable.',
        effects: { health: -8, sanity: +20, rep: +22, wealth: +15 },
        meritAdd: 20
      }
    ]
  },
  {
    id: 'csq_npc_mentor_duel',
    major: true,
    isCausalCallback: true,
    need: { npc: 'mentor' },
    tags: ['combat'],
    vi: '[Lời Thách Đấu Cuối Cùng Của Sư Phụ] Người thầy năm xưa gửi thư hẹn bạn tại đỉnh tháp bỏ hoang: "Cây đại thụ muốn vươn cao phải đón gió lớn. Hãy cho ta thấy con đã đi xa đến đâu."',
    en: '[The Mentor’s Final Summons] Your old teacher summoned you to an abandoned spire: "A tall tree must weather gale winds. Show me how far your footing reaches."',
    choices: [
      {
        labelVi: 'Dốc hết sở học giao đấu một trận long trời lở đất',
        labelEn: 'Unleash every discipline in a duel that shakes the rafters',
        resultVi: 'Đường kiếm của bạn chạm vào cổ áo sư phụ. Ông mỉm cười mãn nguyện trao lại toàn bộ ấn tín môn phái cho bạn.',
        resultEn: 'Your edge rested against their collar. With a satisfied nod, they bequeathed their lineage seal to you.',
        effects: { health: -18, sanity: +25, rep: +30 },
        meritAdd: 35,
        scarsAdd: ['Người kế thừa chân truyền']
      }
    ]
  },
  {
    id: 'csq_fixer_false_bounty',
    major: true,
    isCausalCallback: true,
    tags: ['danger'],
    vi: '[Lệnh Truy Nã Giả Mạo] Một thân chủ độc ác năm xưa cài bẫy gán cho bạn tội danh phá vỡ hợp đồng của Hana Association, khiến hai thợ săn tiền thưởng tìm đến đòi đầu bạn.',
    en: '[Fabricated Hana Bounty] A vindictive former client framed you for a forged Hana contract breach, sending two bounty hunters after your head.',
    choices: [
      {
        labelVi: 'Hạ gục hai kẻ săn tiền thưởng và buộc chúng khai ra kẻ chủ mưu',
        labelEn: 'Subdue the hunters and compel them to name the employer',
        resultVi: 'Bạn vạch trần âm mưu của kẻ chủ mưu trước mặt hiệp hội, xóa sạch lệnh truy nã và tịch thu tiền bồi thường danh dự.',
        resultEn: 'You exposed the conspirator before the Association, expunging the bounty and collecting full restitution.',
        effects: { health: -15, rep: +25, wealth: +30 },
        meritAdd: 25
      }
    ]
  },
  {
    id: 'csq_syn_turf_audit',
    major: true,
    isCausalCallback: true,
    tags: ['syndicate'],
    vi: '[Cuộc Thanh Tra Của Ngón Tay] Lãnh đạo cấp cao của Syndicate bất ngờ đến kiểm tra sổ sách và địa bàn bạn cai quản sau những tranh chấp đẫm máu gần đây.',
    en: '[The Finger’s Audit Inspection] High syndicate brass arrived without notice to audit accounts and turf security after recent territorial skirmishes.',
    choices: [
      {
        labelVi: 'Trình bày sổ sách thu chi minh bạch và các chiến quả mở rộng lãnh địa',
        labelEn: 'Present clean accounts alongside expanded territorial borders',
        resultVi: 'Cấp trên hết lời khen ngợi năng lực quản trị xuất sắc của bạn, ban thưởng thêm đạn dược và tăng quyền kiểm soát địa bàn.',
        resultEn: 'High brass lauded your operational poise, granting munitions stipends and broader district oversight.',
        effects: { rep: +25, wealth: +35, sanity: +10 },
        meritAdd: 30
      }
    ]
  },
  {
    id: 'csq_wing_patent_inquisition',
    major: true,
    isCausalCallback: true,
    tags: ['wing'],
    vi: '[Thanh Tra Bằng Sáng Chế Của Wing] Các đặc vụ An Ninh của Wing thẩm vấn bạn về một công nghệ nhạy cảm mà nhóm bạn từng tiếp xúc trong sự cố năm trước.',
    en: '[Wing Patent Inquisition] Wing Security operatives cornered you regarding sensitive tech your team handled during last year’s incident.',
    choices: [
      {
        labelVi: 'Giao nộp báo cáo kỹ thuật hoàn chỉnh và chứng minh lòng trung thành',
        labelEn: 'Surrender thorough technical briefs proving unswerving loyalty',
        resultVi: 'Các đặc vụ đóng dấu tuyệt mật và khép lại cuộc điều tra, ghi nhận bạn vào danh sách nhân sự đáng tin cậy của tập đoàn.',
        resultEn: 'Agents stamped the folder top-secret and closed the inquest, logging your name as trusted corporate personnel.',
        effects: { sanity: +10, rep: +20, wealth: +20 },
        meritAdd: 25
      }
    ]
  },
  {
    id: 'csq_ws_forged_seal',
    major: true,
    isCausalCallback: true,
    tags: ['workshop'],
    vi: '[Dấu Ấn Tres Bị Làm Giả] Thanh tra Tres Association đến kiểm tra vũ khí của xưởng bạn sau khi phát hiện hàng giả mang dấu ấn của bạn trên thị trường đen.',
    en: '[Forged Workshop Trademark Inquest] Tres inspectors inspected your workshop racks after counterfeit weapons bearing your maker mark surfaced on black markets.',
    choices: [
      {
        labelVi: 'Dẫn thanh tra đến bắt quả tang cơ sở làm giả ở khu ổ chuột ngầm',
        labelEn: 'Lead inspectors straight to the counterfeit forge in the under-city',
        resultVi: 'Cơ sở làm giả bị triệt phá hoàn toàn; uy tín thương hiệu của xưởng bạn được nâng lên một tầm cao mới.',
        resultEn: 'The bootleg forge was dismantled root and branch; your workshop’s brand standing reached new heights.',
        effects: { health: -10, rep: +30, wealth: +25 },
        meritAdd: 28
      }
    ]
  }
];

// ----------------------------------------------------------------------------
// FIXER REQUESTS EXPANSIONS (12 Templates across Tiers 1-5)
// ----------------------------------------------------------------------------
export const EXPANSION_FIXER_REQUESTS = [
  {
    id: 'req_exp_canine_pack_cull',
    tier: 1,
    typeVi: 'Tiêu diệt bầy chó săn đột biến ở khu phế liệu District 12',
    typeEn: 'Cull mutant hound packs in District 12 scrap yards',
    vi: 'Bầy chó hoang ăn phải chất thải sinh học của Wing đã biến đổi hung dữ, cắn chết ba phu nhặt rác.',
    en: 'Feral hounds fed on Wing bio-slurry mutated into violent predators, killing three scavengers.',
    okVi: 'Bạn hạ gục con đầu đàn; bầy chó hoảng sợ chạy tán loạn vào đường cống.',
    okEn: 'You dropped the pack alpha; the remaining hounds scattered into the culverts.',
    failVi: 'Một con chó cắn rách bắp chân bạn trước khi bạn kịp dùng gậy sắt đánh lui nó.',
    failEn: 'A hound tore open your calf before you drove it back with an iron bar.',
    deathVi: 'Bầy chó kéo bạn ngã xuống đống sắt vụn.',
    deathEn: 'The pack dragged you down into rusted scrap.'
  },
  {
    id: 'req_exp_tenement_fire_extract',
    tier: 1,
    typeVi: 'Cứu hộ tài liệu trong khu nhà trọ cháy ở District 8',
    typeEn: 'Extract records from a blazing tenement in District 8',
    vi: 'Căn nhà trọ bốn tầng bốc cháy dữ dội do chập điện; một kế toán thuê bạn vào lấy chiếc hòm sắt.',
    en: 'A four-story tenement blazed from faulty wiring; an accountant hired you to retrieve an iron lockbox.',
    okVi: 'Bạn bịt khăn ướt xông vào biển lửa, mang chiếc hòm ra an toàn trước khi trần nhà sập.',
    okEn: 'With wet rags across your mouth you braved the flames, hauling the lockbox out before ceilings collapsed.',
    failVi: 'Khói độc làm bạn ngạt thở ngất xỉu; lính cứu hỏa phải lôi bạn ra ngoài.',
    failEn: 'Toxic smoke choked your lungs unconscious; firefighters dragged you out.',
    deathVi: 'Dầm nhà rực lửa sập xuống chặn lối thoát duy nhất.',
    deathEn: 'Flaming rafters collapsed across the sole fire escape.'
  },
  {
    id: 'req_exp_casino_debtor_escort',
    tier: 2,
    typeVi: 'Hộ tống con nợ rời khỏi sòng bạc J Corp trong đêm',
    typeEn: 'Escort a runaway debtor out of a J Corp casino ward',
    vi: 'Một tay chơi bạc nợ hàng chục ngàn Ahn cần được đưa ra khỏi cổng kiểm soát trước khi đòi nợ thuê tìm đến.',
    en: 'A gambler owing tens of thousands in Ahn needed safe escort past checkpoints before collectors circled.',
    okVi: 'Bạn luồn lách qua các ngõ tối, đưa thân chủ lên xe lửa an toàn và nhận đủ tiền công.',
    okEn: 'You slipped through dark alleys, seating the client aboard the outbound train and pocketing clean fees.',
    failVi: 'Toán đòi nợ chặn đầu xe; bạn phải bỏ rơi thân chủ để giữ lại mạng mình.',
    failEn: 'Enforcers blocked the alley; you had to abandon the client to preserve your own neck.',
    deathVi: 'Lưỡi dao của tay đòi nợ găm sâu vào ngực bạn từ phía sau.',
    deathEn: 'A collector’s stiletto caught your spine from behind.'
  },
  {
    id: 'req_exp_sewer_toxic_valve_shut',
    tier: 2,
    typeVi: 'Đóng van xả hóa chất ngầm District 19',
    typeEn: 'Shut the underground chemical sluice valve in District 19',
    vi: 'Chất thải hóa học rò rỉ đang đe dọa làm ngộ độc nguồn nước sinh hoạt của toàn bộ khu dân cư.',
    en: 'Toxic runoff threatened to poison residential water mains across the lower district.',
    okVi: 'Chống chọi với hơi độc nồng nặc, bạn xoay chặt van khóa bằng cờ lê nặng mười cân.',
    okEn: 'Braving searing fumes, you torqued the rusted valve shut with a ten-kilo iron wrench.',
    failVi: 'Hơi axit ăn mòn mặt nạ phòng độc; bạn phải bò lên mặt đất với hai lá phổi bỏng rát.',
    failEn: 'Acid fumes melted your respirator seal; you crawled to the surface coughing blood.',
    deathVi: 'Bạn ngã vào bể chứa chất thải không đáy.',
    deathEn: 'You slipped into the bottomless chemical vat.'
  },
  {
    id: 'req_exp_kurokumo_extortion_defend',
    tier: 3,
    typeVi: 'Bảo vệ cửa hàng đồ cổ trước sự tống tiền của Kurokumo Clan',
    typeEn: 'Defend an antiquities shop from Kurokumo extortion',
    vi: 'Kurokumo Clan yêu cầu nộp nửa doanh thu tháng; chủ tiệm thuê bạn rút vũ khí giữ cửa.',
    en: 'The Kurokumo Clan demanded half the month’s takings; the shopkeeper hired steel to hold the threshold.',
    okVi: 'Lưỡi kiếm của bạn chém gãy đoản đao của kẻ dẫn đầu; toán Kurokumo thu quân trong im lặng.',
    okEn: 'Your blade snapped the point-man’s wakizashi; the Kurokumo squad withdrew in silence.',
    failVi: 'Một đường chém hình chữ thập mở toạc ngực áo bạn; bạn gục xuống nhìn cửa tiệm bị cướp phá.',
    failEn: 'A cross-slash opened your coat and chest; you slumped watching the parlor ransacked.',
    deathVi: 'Mũi kiếm đen của Kurokumo đâm xuyên qua cuống họng.',
    deathEn: 'A black Kurokumo katana drove straight through your throat.'
  },
  {
    id: 'req_exp_syndicate_armory_demolition',
    tier: 3,
    typeVi: 'Phá hủy kho vũ khí lậu của một Syndicate ở District 17',
    typeEn: 'Demolish an illicit syndicate armory in District 17',
    vi: 'Một băng nhóm đang tích trữ súng cấm tự động để chuẩn bị cho một cuộc thanh trừng đẫm máu.',
    en: 'A rogue gang was stockpiling forbidden automatic rifles ahead of a bloody territorial purge.',
    okVi: 'Bạn gài mìn hẹn giờ nổ tung cả kho hàng, rút lui an toàn trong làn khói đen khổng lồ.',
    okEn: 'You set timed detonators and leveled the depot, extracting clean beneath billowing smoke.',
    failVi: 'Đạn nổ dây chuyền làm bạn bị bỏng nặng nửa người khi đang cố thoát ra ngoài.',
    failEn: 'Secondary ammunition cook-offs severely scorched half your torso during escape.',
    deathVi: 'Cửa sắt bị khóa chặt từ bên ngoài trước khi khối thuốc nổ phát hỏa.',
    deathEn: 'The blast doors locked from outside seconds before the stockpile ignited.'
  },
  {
    id: 'req_exp_urban_nightmare_abnormality_suppress',
    tier: 4,
    typeVi: 'Chế ngự Abnormality cấp He trốn thoát khỏi cơ sở nghiên cứu',
    typeEn: 'Suppress an escaped He-grade Abnormality in industrial ruins',
    vi: 'Một thực thể kỳ dị mang hình dạng chuông đồng khổng lồ đang phát ra sóng âm nghiền nát não người.',
    en: 'A bizarre entity resembling a colossal bronze bell radiated psychic waves that pulverized brain tissue.',
    okVi: 'Bạn dùng búa tạ Workshop đập nứt vành chuông, phong ấn thực thể vào buồng chứa di động.',
    okEn: 'You shattered the bell lip with a heavy Workshop maul, locking the entity into stasis.',
    failVi: 'Sóng âm làm vỡ màng nhĩ bạn; bạn ngã quỵ thổ huyết và được đồng đội kéo đi.',
    failEn: 'Resonant waves ruptured your eardrums; you collapsed vomiting blood as teammates pulled you out.',
    deathVi: 'Tiếng chuêng ngân vang biến tâm trí bạn thành đống bùn nhão.',
    deathEn: 'The bell’s tolling melted your thoughts into liquid gray matter.'
  },
  {
    id: 'req_exp_night_backstreets_tenement_hold',
    tier: 4,
    typeVi: 'Thủ hộ tòa chung cư qua Night in the Backstreets (Urban Nightmare)',
    typeEn: 'Defend a tenement through the Night in the Backstreets (Urban Nightmare)',
    vi: 'Cửa thép kiên cố của khu chung cư 500 hộ bị hỏng chốt khóa đúng vào lúc 3 giờ 13 sáng.',
    en: 'The reinforced blast gates of a 500-tenant block jammed open at exactly 3:13 A.M.',
    okVi: 'Tám mươi phút đẫm máu với bầy Sweeper; khi còi báo sáng vang lên, bạn vẫn đứng vững trên bậc thềm.',
    okEn: 'Eighty bloody minutes against Sweeper packs; when dawn sirens blew, you still held the steps.',
    failVi: 'Hàng rào sụp đổ ở phút 65; bạn phải rút lên tầng áp mái cùng vài người sống sót.',
    failEn: 'Barricades gave way at minute sixty-five; you fell back to attics with a handful of survivors.',
    deathVi: 'Dịch lỏng phân hủy của bầy Sweeper nuốt chửng bạn.',
    deathEn: 'Sweeper dissolved sludge consumed you entirely.'
  },
  {
    id: 'req_exp_star_city_distortion_exorcism',
    tier: 5,
    typeVi: 'Thanh trừng một Distortion cấp Star of the City tại rạp hát District 1',
    typeEn: 'Exorcise a Star of the City Distortion at the District 1 Opera House',
    vi: 'Một cựu ca sĩ opera đã biến dạng thành con quái vật âm thanh biến mọi khán giả thành tượng sáp đẫm máu.',
    en: 'A former opera diva distorted into a sonic monstrosity turning audiences into bleeding wax statues.',
    okVi: 'Bạn đâm lưỡi kiếm E.G.O xuyên qua thanh quản của nó, kết thúc khúc ca kinh hoàng của thành phố.',
    okEn: 'You drove an E.G.O blade through its larynx, ending the City’s ghastly aria forever.',
    failVi: 'Âm thanh xé toạc các mạch máu dưới da bạn; bạn sống sót nhưng mất vĩnh viễn giọng nói.',
    failEn: 'The aria ruptured blood vessels beneath your skin; you lived, but your voice was lost forever.',
    deathVi: 'Nó biến bạn thành bức tượng sáp thứ một trăm lẻ một.',
    deathEn: 'It molded your bones into its hundred-and-first wax statue.'
  },
  {
    id: 'req_exp_color_fixer_vanguard_support',
    tier: 5,
    typeVi: 'Yểm trợ Color Fixer đột kích sào huyệt Finger tối cao',
    typeEn: 'Vanguard support for a Color Fixer raiding a Finger stronghold',
    vi: 'Một Color Fixer cần đội tiên phong phá hủy các ụ pháo bảo vệ trước khi họ tung đòn quyết định.',
    en: 'A Color Fixer required vanguard operatives to silence defense batteries before the decisive duel.',
    okVi: 'Bạn phá tan ba khẩu pháo hạng nặng, mở toang lối vào cho Color Fixer kết liễu trận chiến.',
    okEn: 'You dismantled three fortress cannons, clearing the breach for the Color Fixer to end the battle.',
    failVi: 'Một luồng đạn pháo hất văng bạn vào tường đá; xương sườn gãy đâm thấu phổi.',
    failEn: 'Artillery back-blast slammed you into stone walls, broken ribs puncturing a lung.',
    deathVi: 'Bạn bốc hơi trong phát bắn trực diện của đại pháo.',
    deathEn: 'You vaporized under a direct fortress cannon blast.'
  },
  {
    id: 'req_exp_warp_cleanup_black_box_recovery',
    tier: 4,
    typeVi: 'Thu hồi hộp đen chuyến tàu WARP gặp sự cố thời gian',
    typeEn: 'Recover black box records from a stalled WARP train car',
    vi: 'Một toa tàu trượt khỏi quỹ đạo thời gian cần đội cảm tử vào thu hồi dữ liệu trước khi thanh tra đến.',
    en: 'A detached rail car displaced in dimensional space needed recovery divers before inspectors arrived.',
    okVi: 'Bạn giữ vững lý trí giữa hàng ngàn xác thịt biến dạng, mang chiếc hộp đen ra ngoài nguyên vẹn.',
    okEn: 'You held sanity intact amid a sea of writhing flesh, extracting the black box undamaged.',
    failVi: 'Cảnh tượng bên trong toa tàu làm vỡ vụn tâm trí bạn; bạn gào thét mất trí suốt ba ngày.',
    failEn: 'The sight within fractured your sanity; you screamed in delirium for three days straight.',
    deathVi: 'Khối thịt trên toa tàu vươn tay kéo bạn vào cơ thể vô tận của nó.',
    deathEn: 'The undulating mass within reached out and pulled you into its flesh.'
  },
  {
    id: 'req_exp_great_lake_leviathan_hunt',
    tier: 5,
    typeVi: 'Săn bắt Thủy Quái trên Đại Hồ District 21',
    typeEn: 'Subjugate a Great Lake Leviathan in District 21',
    vi: 'Một con quái vật biển sâu trồi lên nuốt chửng ba tàu buôn bọc thép; U Corp treo thưởng kỷ lục.',
    en: 'A deep-sea abomination surfaced, swallowing three ironclads; U Corp posted a historic bounty.',
    okVi: 'Bạn phóng lao xuyên qua mắt quái vật, cùng hạm đội kéo xác nó về cảng trong tiếng reo hò rền trời.',
    okEn: 'You drove a harpoon through its central eye, hauling the carcass port-side to roaring cheers.',
    failVi: 'Cơn sóng thần do quái vật quẫy đuôi nhấn chìm tàu bạn; bạn bám vào mảnh gỗ trôi dạt ba ngày.',
    failEn: 'A tail-whipped tsunami capsized your boat; you drifted three days clinging to timber.',
    deathVi: 'Hàm răng khổng lồ của nó nghiền nát bạn cùng chiếc thuyền.',
    deathEn: 'Colossal jaws crushed you and your vessel into kindling.'
  }
];
