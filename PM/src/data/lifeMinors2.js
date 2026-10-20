// ============================================================================
// MINOR CHOICES, SECOND SET: districts, trades, and the people closest to you.
// Every entry opens with [Title] so splitTitle extracts a distinct tag for the UI card.
// Complete, evocative Project Moon scenes with sensory and emotional depth.
// ============================================================================

const M = (id, age, need, vi, en, choices, ignore, extra = {}) => ({ id, age, need, vi, en, choices, ignore, ...extra });
const C = (vi, en, rvi, ren, fx = {}, extra = {}) => ({ vi, en, rvi, ren, fx, ...extra });
const O = (w, rvi, ren, fx = {}, extra = {}) => ({ w, rvi, ren, fx, ...extra });
const I = (rvi, ren, fx = {}, extra = {}) => ({ vi: 'Để nó trôi qua', en: 'Let it pass', rvi, ren, fx, ...extra });

const YOUNG = [7, 17];
const GROWN = [18, 140];
const ADULT = [18, 50];

export const LIFE_MINORS_2 = [
  // ------------------------------------------------------------ districts
  M(
    'm2_t_sell_hours',
    [12, 80],
    { regions: ['T'] },
    '[Môi giới thời gian T Corp] Một tay môi giới khế ước của T Corp gõ cửa đề nghị mua đứt hai giờ đồng hồ mỗi ngày của bạn trong vòng một năm. Số tiền chi trả một lần đủ để bạn thanh toán tiền thuê trọ cho cả một năm ròng rã.',
    '[T Corp Time Broker] An official time-broker from T Corp knocked on your door offering to purchase two hours of your daily lifespan for a full year. The upfront lump sum would fully cover your lodging rent for an entire year.',
    [
      C(
        'Bán hai giờ mỗi ngày',
        'Sell the hours',
        'Một ngày của bạn bị co ngắn lại rõ rệt. Bạn buộc phải ngủ ít hơn, ăn uống vội vã hơn, và không còn một khoảng thời gian rảnh rỗi nào để thở phào nghỉ ngơi.',
        'Your daily hours compressed drastically. You slept less, swallowed meals in haste, and had not a single idle moment left to pause and breathe.',
        { wealth: 10, health: -4, sanity: -4 },
        { mem: 'sold_hours' }
      ),
      C(
        'Từ chối bán thời gian',
        'Refuse the transaction',
        'Gã môi giới chỉ nhún vai lạnh lùng: "Sớm muộn gì cũng phải bán thôi." Rồi hắn quay lưng bước sang gõ cửa căn hộ kế bên.',
        'The broker merely shrugged callously: “Everyone surrenders their hours eventually.” He turned and rapped on the neighboring door.',
        {}
      )
    ],
    I('Bạn lập tức đóng sầm cửa trước khi gã kịp đọc hết các điều khoản.', 'You slammed the door shut before he could finish his pitch.')
  ),

  M(
    'm2_t_time_ripper',
    [16, 80],
    { regions: ['T'], mem: 'sold_hours' },
    '[Bóng ma Time Ripper] Tin đồn kinh hoàng lan truyền về Time Ripper: kẻ chuyên mổ cắp những giờ sống chưa trôi qua của người khác. Nạn nhân tuần trước vừa bị hắn sát hại dã man ngay tại căn hộ tầng dưới nhà bạn.',
    '[The Time Ripper Rumor] Horrifying rumors spread regarding the Time Ripper: a phantom that violently severs the unlived future hours of victims. Last week’s prey was slaughtered in the apartment directly beneath yours.',
    [
      C(
        'Đến xem hiện trường án mạng',
        'Inspect the murder scene',
        'Nạn nhân xấu số vẫn ngồi bất động trên ghế gỗ với đôi mắt mở trừng trừng, tựa như một bức ảnh bị đông cứng giữa dòng thời gian. Kể từ ngày hôm đó, bạn luôn ám ảnh đếm từng tích tắc trôi qua.',
        'The victim sat petrified upon the wooden chair with eyes wide open, like a portrait frozen in time. From that day on, you nervously counted every ticking second.',
        { sanity: -6, resonance: 4 }
      ),
      C(
        'Ở trong nhà khóa chặt cửa',
        'Stay indoors and bolt the door',
        'Bạn thức trắng ba đêm liền với vũ khí lăm lăm trên tay. Không có bất kỳ sự cố nào xảy ra, và chính sự tĩnh lặng kỳ dị đó lại càng khiến bạn khiếp hãi hơn.',
        'You sat awake for three nights clutching your weapon in the dark. Absolutely nothing occurred, and that eerie stillness terrified you even more.',
        { sanity: -3, health: -2 }
      )
    ],
    I('Bạn tự trấn an bản thân rằng tất cả chỉ là những lời đồn thổi vô căn cứ.', 'You convinced yourself that it was nothing more than an urban legend.'),
    { once: true, tags: ['callback', 'danger'] }
  ),

  M(
    'm2_w_bistro_job',
    [16, 60],
    { regions: ['W'], notNest: true },
    '[Chiếc tủ lạnh thứ hai ở District 23] Một quán ăn nức tiếng ở phố ẩm thực District 23 cần tuyển người rửa bát với mức lương cao gấp ba lần chỗ khác. Ông chủ quán nghiêm nghị dặn: "Tuyệt đối không được mở chiếc tủ lạnh thứ hai."',
    '[The Second Fridge of District 23] A bustling eatery in District 23’s gourmet street offered dishwashing work at triple the standard wage. The head chef warned: “Never lay a finger upon the second refrigerator.”',
    [
      C(
        'Nhận công việc rửa bát',
        'Accept the position',
        null,
        null,
        { wealth: 6 },
        {
          out: [
            O(65, 'Bạn cắn răng tuân thủ tuyệt đối quy định và không bao giờ chạm vào chiếc tủ lạnh đó. Bạn làm việc chăm chỉ suốt cả năm và dành dụm được một khoản tiền khá lớn.', 'You strictly adhered to the command, never touching the forbidden unit. You washed plates for an entire year and banked a sizable nest egg.', { wealth: 4 }),
            O(35, 'Một đêm muộn vì tò mò, bạn đã lén mở cánh cửa tủ lạnh ấy ra. Bạn nôn thốc nôn tháo và xin nghỉ việc ngay sáng hôm sau, thậm chí không dám nhận số tiền lương tuần cuối.', 'Driven by morbid curiosity, you unlatched the door one midnight. Sickened by the grotesque sight within, you fled at dawn, forfeiting your wages.', { sanity: -8, wealth: -2 }, { mem: 'second_fridge' })
          ]
        }
      ),
      C(
        'Từ chối công việc đáng ngờ này',
        'Turn down the suspicious offer',
        'Lão chủ quán cười khẩy một tiếng đầy châm chọc: "Kẻ nào mới đến đây cũng nói cứng như thế, trước khi cái bụng bị cơn đói cào xé."',
        'The head chef chuckled contemptuously: “Every newcomer speaks with such high morals, until starvation hollows out their bellies.”',
        {}
      )
    ],
    I('Bạn lặng lẽ bước qua cửa quán ăn mà không dừng chân hỏi han.', 'You quietly walked past the eatery without inquiring.')
  ),

  M(
    'm2_u_lake_rule',
    [8, 80],
    { regions: ['U'] },
    '[Quy tắc số 12 của U Corp] Khi đang đi thuyền trên mặt biển hồ The Great Lake, bạn bỗng nghe thấy tiếng nước thì thầm gọi tên mình bằng chính giọng nói dịu dàng của mẹ. Luật hàng hải số 12 của U Corp: tuyệt đối không được đáp lại.',
    '[Rule 12 on the Great Lake] Drifting aboard a skiff upon the Great Lake, you heard the dark water softly whisper your name in your mother’s loving voice. Nautical Rule 12 of U Corp: under no circumstances respond.',
    [
      C(
        'Bịt chặt tai và đếm đến một trăm',
        'Cover ears and count to a hundred',
        'Đến khi bạn đếm tới con số 87 thì âm thanh ma quái kia biến mất. Người lái thuyền nhìn bạn rồi gật đầu tán thưởng như công nhận bạn là một người dạn dày sóng gió.',
        'At the count of eighty-seven, the ghastly murmurs subsided. The hardened ferryman nodded at you with genuine respect, treating you as a seasoned survivor.',
        { sanity: 2, rep: 1 }
      ),
      C(
        'Cất tiếng đáp lại tiếng gọi',
        'Call back to the voice',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Bạn vừa thốt lên một tiếng "Mẹ ơi?" thì người lái thuyền đã vung tay tát bạn ngã nhào xuống sàn thuyền. Mặt nước lập tức phẳng lặng; ông không nói thêm lời nào cho tới khi cập bến.', 'You barely whispered “Mother?” before the ferryman struck you across the jaw onto the boards. The water went dead calm; he uttered not another word.', { health: -2, sanity: -4, resonance: 5 }),
            O(40, 'Một xúc tu đen nhớt từ mặt hồ trườn lên mạn thuyền quấn chặt lấy cổ chân bạn lôi xuống. Người lái thuyền kịp vung rìu chém đứt nó; vết siết để lại một vết bầm tím đen vĩnh viễn không phai.', 'A slick, black appendage slithered over the gunwale, seizing your ankle to drag you under. The ferryman cleaved it with an axe, leaving a permanent abyssal bruise.', { health: -6, sanity: -6, resonance: 8 }, { scar: 'Vết bầm xanh ở cổ chân' })
          ]
        }
      )
    ],
    I('Bạn cắn chặt môi ngồi im thin thít. Tiếng gọi ma mị vang lên thêm ba lần nữa rồi chìm dần vào làn nước.', 'You bit your lip and held still. The phantom call echoed three more times before fading into the depths.'),
    { sanity: -1, theme: 'lake' }
  ),

  M(
    'm2_h_restructure',
    [8, 80],
    { regions: ['H'] },
    '[Tách trà gia tộc Hongyuan] Đợt tái cấu trúc Restructuring Day đêm qua đã dịch chuyển căn nhà trọ của bạn sang sát vách trang viên của một đại gia tộc Hongyuan quyền quý. Sáng sớm, một quản gia đến gõ cửa mời bạn sang dùng trà đàm đạo.',
    '[Hongyuan Family Tea Invitation] Last night’s Restructuring Day shifted your tenement directly adjacent to the manor of a prestigious Hongyuan clan. At dawn, a refined retainer knocked to invite you for morning tea.',
    [
      C(
        'Nhận lời sang dùng trà',
        'Accept the hospitality',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Họ ân cần hỏi han bạn những câu hỏi rất lịch thiệp về cuộc sống và các mối quan hệ xung quanh. Trên đường về, bạn mới giật mình nhận ra mình đã vô tình tiết lộ quá nhiều điều bí mật.', 'They cordially engaged you in gentle inquiries regarding your circle and routines. Walking back, you realized with a cold sweat that you had revealed far too much.', { network: 5, sanity: -2 }, { mem: 'hongyuan_tea' }),
            O(40, 'Chén trà thơm có một vị đắng chát kỳ lạ. Bạn rơi vào cơn mê man suốt ba ngày liền; khi tỉnh dậy, trên cẳng tay bạn xuất hiện một vết kim tiêm mà không ai chịu giải thích.', 'The aromatic tea carried an uncanny metallic bitterness. You slept in a stupor for three days; waking up, an unexplained needle puncture scarred your arm.', { health: -5, resonance: 6 })
          ]
        }
      ),
      C(
        'Khéo léo từ chối lời mời',
        'Politely decline the invite',
        'Người hầu khẽ cúi đầu mỉm cười nhã nhặn, rồi cẩn thận rút cây bút ghi chép một dòng ngắn vào cuốn sổ da mang theo bên mình.',
        'The retainer bowed with impeccable etiquette, calmly producing a leather-bound notebook to write an entry beside your name.',
        { rep: -1 }
      )
    ],
    I('Bạn giả vờ như không có ai ở nhà và nín thở đợi người hầu rời đi.', 'You pretended nobody was home, holding your breath until footsteps retreated.')
  ),

  M(
    'm2_l_fog_scavenge',
    [12, 70],
    { regions: ['L'] },
    '[Mót đồ phế tích Lobotomy] Có người sẵn sàng chi trả 15 đồng Ahn tiền mặt cho bất kỳ món đồ nào nhặt được từ bên trong tòa nhà Lobotomy Corporation chìm trong sương mù độc hại. Rất nhiều người đã bước vào, nhưng cực kỳ ít người có thể trở ra.',
    '[Lobotomy Ruin Scavenge] A broker offered fifteen Ahn for any salvaged artifact extracted from the fog-shrouded ruins of Lobotomy Corporation. Many entered; few ever walked out.',
    [
      C(
        'Liều mạng bước vào làn sương',
        'Venture into the mists',
        null,
        null,
        {},
        {
          out: [
            O(50, 'Bạn nhặt về được một tấm thẻ nhân viên cũ kỹ mang tên của một người tên là "Ayin". Người thu mua run rẩy hai tay và lập tức trả cho bạn số tiền gấp đôi.', 'You retrieved a battered security badge bearing the name “Ayin.” The buyer’s hands shook uncontrollably as he paid you double the promised sum.', { wealth: 10, resonance: 6 }),
            O(50, 'Bên trong màn sương mù có một thực thể quái dị lẳng lặng bám theo bạn suốt ba tầng lầu. Bạn trốn thoát được ra ngoài với hai bàn tay trắng, và hình bóng nó ám ảnh bạn trong từng giấc ngủ.', 'An incomprehensible anomaly stalked your steps down three ruined stairwells. You barely escaped empty-handed, and its shadow haunts your nightmares forever.', { sanity: -10, resonance: 8 })
          ]
        }
      ),
      C(
        'Từ chối mạo hiểm tính mạng',
        'Refuse to risk your life',
        'Đúng một tuần sau đó, ba người hàng xóm quen thuộc trong khu nhà rủ nhau đi vào tòa phế tích ấy và không bao giờ thấy trở về nữa.',
        'Exactly one week later, three familiar neighbors ventured into those cursed ruins and were never heard from again.',
        { sanity: -1 }
      )
    ],
    I('Bạn đứng nhìn làn sương độc cuồn cuộn ở rìa phế tích một hồi lâu rồi lẳng lặng quay về.', 'You stood watching the toxic fog roll over the perimeter for a while, then went home.'),
    { tags: ['danger'] }
  ),

  M(
    'm2_n_prosthetic',
    [18, 80],
    { regions: ['N'], stat: { health: [0, 55] } },
    '[Lưỡi búa của Nagel und Hammer] Bác sĩ chẩn đoán cánh tay trái của bạn đã bị hoại tử hoàn toàn và buộc phải thay thế bằng chi giả cơ khí. Nhưng ở District 14 của N Corp, đám cuồng tín Nagel und Hammer sẽ sớm phát hiện ra điều đó.',
    '[The Inquisitors of District 14] The physician stated your left arm was beyond salvage and must be replaced with mechanical cybernetics. Yet in District 14, the zealots of Nagel und Hammer hunt all prosthetics.',
    [
      C(
        'Thay chi giả và mặc áo dài tay che giấu',
        'Install prosthetic and conceal it',
        'Bạn buộc phải mặc áo khoác dài tay kín mít suốt cả mùa hè nóng nực. Mỗi khi nghe thấy tiếng thánh ca cuồng tín vang lên ngoài phố, bạn lại run rẩy đút chặt bàn tay sắt vào túi áo.',
        'You endured suffocating long-sleeved coats throughout the sweltering summer. Whenever inquisitorial hymns echoed along the street, you buried your iron hand deep in your pocket.',
        { health: 10, wealth: -6, sanity: -3 },
        { flags: ['Prosthetic'], mem: 'hidden_prosthetic' }
      ),
      C(
        'Bán hết đồ đạc chuyển sang District khác',
        'Relocate to another District for surgery',
        'Bạn cắn răng bán tống bán tháo gần như toàn bộ tài sản để chuyển hộ khẩu sang nơi khác phẫu thuật. Cánh tay cơ khí mới vận hành rất trơn tru, nhưng ở nơi đất khách bạn chẳng còn lấy một người quen.',
        'You liquidated nearly all possessions to migrate and undergo surgery elsewhere. The prosthetic arm operates flawlessly, yet you know not a single soul in your new district.',
        { health: 10, wealth: -10, network: -6 },
        { flags: ['Prosthetic'] }
      )
    ],
    I('Bạn cắn răng chịu đựng cơn đau nhức và sống chung với cánh tay tật nguyền thêm một năm.', 'You gritted your teeth, living with the crippled limb for another agonizing year.'),
    { health: -3 }
  ),

  M(
    'm2_j_casino',
    [18, 80],
    { regions: ['J'], stat: { wealth: [10, 100] } },
    '[Bàn cược vận may J Corp] Một bàn cược kỳ lạ tại sòng bạc ngầm của J Corp cho phép người chơi đặt cược bằng chính "vận may" vô hình của mình thay cho tiền Ahn. Những tay chia bài mỉm cười bảo rằng vận may rồi sẽ tự sinh sôi trở lại.',
    '[J Corp Luck Wagering Table] A clandestine table at the J Corp casino permitted patrons to gamble with intangible “luck” rather than hard Ahn coins. The croupier smiled, claiming luck naturally regenerates over time.',
    [
      C(
        'Liều mạng đặt cược vận may',
        'Wager your fortune',
        null,
        null,
        {},
        {
          out: [
            O(45, 'Bạn giành chiến thắng rực rỡ. Trên đường trở về nhà, bạn nhặt được một chiếc ví rơi, tình cờ thoát chết trong gang tấc khỏi một vụ nổ bom, và cảm thấy có ai đó đang âm thầm tính sổ cho mình.', 'You triumphed. On the walk home, you found a purse of coin, narrowly avoided a shrapnel explosion, and sensed unseen scales tipping in your favor.', { wealth: 14 }),
            O(55, 'Bạn thua sạch ván cược. Kể từ hôm đó, hàng loạt tai ương xui xẻo liên tục ập xuống: đứt dây giày, lỡ chuyến tàu, và một nhát dao lẽ ra đâm trượt thì lại cắm phập vào người bạn.', 'You lost. From that hour, petty misfortunes accumulated relentlessly: broken shoelaces, missed trains, and an errant blade that should have missed struck true.', { health: -6, sanity: -4 }, { mem: 'bet_luck' })
          ]
        }
      ),
      C(
        'Chỉ cược bằng tiền Ahn như thông thường',
        'Gamble with Ahn coins only',
        'Bạn thua sạch 6 đồng Ahn và lủi thủi đi bộ về nhà với cảm giác nhẹ nhõm như thể vừa may mắn thoát khỏi một bản án vô hình.',
        'You lost six Ahn coins and trudged home with the distinct, relieving feeling that you had narrowly escaped a far worse curse.',
        { wealth: -6 }
      )
    ],
    I('Bạn khoanh tay đứng xem đám con bạc cuồng loạn rồi lặng lẽ rời đi.', 'You folded your arms, watched the frenzied gamblers, and slipped away.')
  ),

  M(
    'm2_k_ampoule_line',
    [12, 80],
    { regions: ['K'] },
    '[Hàng người nhận ampoule K Corp] Tập đoàn K Corp tổ chức một đợt phát tặng ống huyết thanh hồi phục miễn phí cho dân nghèo trong đúng một ngày duy nhất. Hàng người chen lấn xô đẩy kéo dài qua mười con phố; phía trước bạn, một kẻ thô bạo vừa xô ngã một bà cụ già.',
    '[The K Corp Relief Breadline] K Corp held a single-day public charity drive distributing free restorative ampoules to the poor. The desperate queue stretched across ten city blocks; just ahead, a brute violently shoved an elderly woman to the cobblestones.',
    [
      C(
        'Rời hàng đỡ bà cụ dậy, chấp nhận mất lượt',
        'Help her up and forfeit your place',
        'Bà cụ rưng rưng nước mắt rút trong túi áo trao cho bạn chính ống huyết thanh của bà: "Lão già rồi chẳng sống được bao lâu nữa. Cậu còn trẻ, hãy giữ lấy mà dùng."',
        'The tearful elder pressed her own voucher into your hands: “I am ancient and weary. You have far more road ahead to walk.”',
        { health: 6, sanity: 3, rep: 2 },
        { motif: { mercy: 1 } }
      ),
      C(
        'Mặc kệ bà cụ, cố giữ chặt vị trí của mình',
        'Cling to your spot in line',
        'Bạn nhận được ống ampoule xanh biếc quý giá. Bà cụ già yếu ớt không thể tự gượng dậy được, và dòng người đông đúc cứ vô cảm bước giẫm vòng qua người bà.',
        'You secured your gleaming green vial. The frail woman could not rise, and the ruthless crowd simply trampled past her crumpled form.',
        { health: 6, sanity: -3 }
      )
    ],
    I('Nhìn cảnh tượng hỗn loạn và tàn nhẫn ấy, bạn chán nản bỏ về không xếp hàng nữa.', 'Disgusted by the callous frenzy, you turned around and abandoned the queue.')
  ),

  M(
    'm2_s_blade_teacher',
    [10, 30],
    { regions: ['S'] },
    '[Kiếm sĩ Blade Lineage dưới mái hiên] Một kiếm sĩ già phong trần của Blade Lineage ngồi thu mình dưới mái hiên nhà bạn để trú cơn mưa rào. Ông nheo mắt quan sát cách bạn cầm cán chổi quét sân rồi lạnh lùng thốt lên một từ: "Sai."',
    '[The Blade Lineage Elder] An aged swordsman from the Blade Lineage sheltered from a squall beneath your porch. Watching you grip your yard broom, he muttered a single sharp critique: “Wrong.”',
    [
      C(
        'Cung kính xin thọ giáo thế kiếm đúng',
        'Ask him to demonstrate the stance',
        'Vị kiếm sĩ truyền dạy cho bạn một thế đứng rút kiếm duy nhất, rồi lặng lẽ cất bước rời đi khi cơn mưa vừa tạnh. Bạn kiên trì khổ luyện thế kiếm ấy mỗi ngày suốt mười năm sau.',
        'The master demonstrated a single foundational draw-stance before vanishing as the rain cleared. You drilled that posture every sunrise for ten years.',
        { health: 3, rep: 2 },
        { flags: ['해결사동경'], mem: 'blade_stance' }
      ),
      C(
        'Mời ông vào nhà ăn bát cháo nóng',
        'Invite him inside for a meal',
        'Ông lão ăn cạn nồi cháo đạm bạc của nhà bạn, cảm ơn lòng hiếu khách rồi để lại một thanh kiếm gãy lưỡi: "Lão già này không còn dùng đến nó nữa."',
        'He finished your humble bowl of porridge, thanked your hospitality, and left behind a notched, broken katana: “My fighting days are done.”',
        { sanity: 2, wealth: -1 },
        { flags: ['유물'] }
      )
    ],
    I('Bạn làm ngơ lời nhận xét của ông và tiếp tục công việc quét dọn.', 'You ignored his remark and continued sweeping up wet leaves.')
  ),

  M(
    'm2_out_caravan',
    [8, 60],
    { out: true },
    '[Dẫn đường cho đoàn buôn qua tử địa] Một đoàn thương buôn cơ giới từ The City đi ngang qua khu trại Outskirts. Họ đang cần thuê gấp một người dẫn đường am hiểu địa hình để vượt qua vùng sa mạc có quái thú khổng lồ trú ngụ.',
    '[Guiding the Wastes Caravan] An armored trading caravan from the City passed through the Outskirts settlement. They urgently sought a local scout to guide their treads through beast-infested dunes.',
    [
      C(
        'Nhận lời làm người dẫn đường',
        'Take the scout contract',
        null,
        null,
        {},
        {
          out: [
            O(65, 'Bạn dẫn đường an toàn cho đoàn xe vượt qua các cồn cát tử thần. Họ hào phóng trả thù lao bằng đạn dược, thuốc men và một tấm bản đồ The City còn nguyên vẹn.', 'You navigated the convoy through the treacherous sands safely. They rewarded you handsomely with ammunition, antibiotics, and an intact City atlas.', { wealth: 6, health: 3, network: 3 }),
            O(35, 'Một con quái thú dị dạng bất ngờ phục kích đoàn xe vào đêm thứ hai. Bạn may mắn sống sót nhưng ba thương nhân đã thiệt mạng, và những kẻ còn lại đổ hết mọi tội lỗi lên đầu bạn.', 'An abomination ambushed the convoy on the second night. You survived, but three merchants perished, and the bitter survivors blamed your navigation.', { health: -8, rep: -4, sanity: -3 })
          ]
        }
      ),
      C(
        'Từ chối và ở lại khu trại',
        'Stay safely in camp',
        'Đoàn thương nhân thuê một người dẫn đường khác trong trại. Sau đó, không một chiếc xe nào trong số họ có thể quay trở về.',
        'The caravan hired another eager scout. Not a single vehicle or crew member ever returned from the wastes.',
        {}
      )
    ],
    I('Bạn sợ hãi nấp kín trong lều bạt khi họ cất tiếng hỏi thăm.', 'You hid deep within your canvas tent when they called out for scouts.')
  ),

  // ------------------------------------------------------------ trades
  M(
    'm2_fx_cheap_job',
    GROWN,
    { jobs: ['Fixer'], grade: [9, 6] },
    '[Bốn đồng Ahn cứu con] Một người mẹ nghèo ở Backstreets run rẩy đặt lên bàn làm việc của bạn 4 đồng Ahn mỏng manh. Con trai bà vừa bị một toán Rat bắt cóc vào đêm qua; mức phí tối thiểu theo bảng giá của Văn phòng là 20 Ahn.',
    '[Four Ahn to Save a Son] A destitute Backstreet mother laid four worn Ahn coins upon your desk with trembling hands. Her son was abducted by Rats last night; your Office’s standard minimum fee was twenty.',
    [
      C(
        'Nhận làm kín ngoài giờ không báo sổ',
        'Take the case off the books',
        null,
        null,
        { wealth: 1 },
        {
          out: [
            O(55, 'Bạn đột kích vào căn hầm phế liệu và giải cứu thành công cậu bé trước khi chúng kịp mổ lấy nội tạng. Người mẹ ôm con khóc nức nở và cố dúi thêm tiền; bạn kiên quyết từ chối.', 'You breached the cellar and secured the boy before they could harvest his organs. The weeping mother tried to offer her ring; you refused to take it.', { rep: 6, sanity: 5, merit: 3 }, { motif: { mercy: 1 } }),
            O(45, 'Bạn đến chậm mất một ngày định mệnh. Bạn nghẹn ngào hoàn trả lại 4 đồng Ahn cho người mẹ, và trong cơn đau đớn tột cùng, bà ném thẳng số tiền ấy vào mặt bạn.', 'You arrived one fateful day too late. You solemnly returned the four coins, and in raw despair, she hurled them straight into your face.', { sanity: -6 })
          ]
        }
      ),
      C(
        'Từ chối theo đúng quy định văn phòng',
        'Refuse according to company policy',
        'Người mẹ đau khổ không nói thêm một lời nào, lẳng lặng cầm lại 4 đồng Ahn rồi lê bước ra cửa. Bạn đứng lặng nhìn theo bóng lưng gầy guộc ấy khuất dần ở cuối con hẻm.',
        'The mother spoke not another word, gathering her four coins and walking away. You stood watching her stooped silhouette vanish down the bleak alley.',
        { sanity: -4, merit: 1 }
      )
    ],
    I('Bạn khuyên bà nên thử tìm kiếm sự giúp đỡ ở các văn phòng Fixer khác.', 'You coldly advised her to seek assistance from another Office.'),
    { sanity: -2 }
  ),

  M(
    'm2_fx_grade_exam',
    GROWN,
    { jobs: ['Fixer'] },
    '[Kỳ sát hạch thăng hạng Hana] Hiệp hội Hana chính thức mở kỳ thi đánh giá thăng cấp bậc Fixer. Một người quen trong văn phòng rỉ tai mời chào bạn mua "đề thi và đáp án nội bộ" với giá 10 đồng Ahn.',
    '[Hana Grade Advancement Exam] Hana Association announced the open assessment for Fixer promotion. A seasoned colleague quietly offered to sell you “insider test materials” for ten Ahn.',
    [
      C(
        'Bỏ 10 Ahn mua đề thi nội bộ',
        'Purchase the leaked materials',
        null,
        null,
        { wealth: -10 },
        {
          out: [
            O(60, 'Thông tin mua được hoàn toàn chính xác. Bạn vượt qua các bài thi thực chiến một cách vô cùng dễ dàng và thuận lợi.', 'The intel was flawless. You sailed through the grueling combat evaluations with effortless precision.', { merit: 10, rep: 2 }),
            O(40, 'Đó thực chất là một cái bẫy giăng sẵn của Hana để thanh lọc những kẻ gian lận. Bạn bị lập biên bản kỷ luật và ghi vết nhơ vào hồ sơ hành nghề.', 'It was an internal sting operation orchestrated by Hana inspectors. You were caught red-handed and blacklisted with a disciplinary citation.', { rep: -8, merit: -4 })
          ]
        }
      ),
      C(
        'Tự lực cánh sinh đi thi bằng thực lực',
        'Rely entirely upon your own steel',
        null,
        null,
        {},
        {
          out: [
            O(55, 'Bạn chiến đấu kiên cường và vượt qua kỳ thi sát nút với hai chiếc xương sườn bị rạn nứt sau trận đối đầu nảy lửa.', 'You fought valiantly and passed by the skin of your teeth, nursing two cracked ribs from the final duel.', { merit: 8, health: -5 }),
            O(45, 'Bạn thất bại trước những đối thủ quá mạnh mẽ. Bạn gạt mồ hôi và tự nhủ bản thân sẽ phục thù vào kỳ thi năm sau.', 'You were overwhelmed by superior combatants. Nursing your bruises, you resolved to try again next cycle.', { sanity: -2, merit: 2 })
          ]
        }
      )
    ],
    I('Bạn quyết định bỏ qua kỳ sát hạch thăng hạng trong năm nay.', 'You opted to skip the promotion assessment this year.')
  ),

  M(
    'm2_fx_partner_wound',
    ADULT,
    { jobs: ['Fixer'], npc: 'partner' },
    '[Viện phí của {partner}] {partner} bị thương tích vô cùng trầm trọng sau trận kịch chiến trong ủy thác đêm qua. Văn phòng Fixer lạnh lùng thông báo họ chỉ chi trả tiền thuốc men cho những nhân sự còn đủ khả năng lao động.',
    '[Medical Treatment for {partner}] {partner} sustained grievous lacerations during last night’s bloody commission. The Office heartlessly declared they only subsidize medical fees for agents still fit for active service.',
    [
      C(
        'Bỏ tiền túi chi trả toàn bộ viện phí',
        'Cover all clinic expenses yourself',
        '{partner} dần bình phục sau hai tháng nằm điều trị. Trong lần đầu tiên trở lại tiền tuyến cùng nhau, người ấy luôn chủ động đi trước bạn một bước, như muốn làm lá chắn che chở cho bạn.',
        '{partner} fully recovered after two months in the clinic. On your first joint request back, they deliberately walked a step ahead, shielding your flank.',
        { wealth: -10 },
        { bond: { partner: 18 }, motif: { loyalty: 1 } }
      ),
      C(
        'Để mặc cho Văn phòng tự xử lý',
        'Leave their fate to Office policy',
        '{partner} bị sa thải không thương tiếc vì mất sức lao động. Họ không hề buông lời oán trách bạn, nhưng kể từ đó cũng không bao giờ liên lạc lại nữa.',
        '{partner} was unceremoniously terminated. They never uttered a word of blame, but ceased contacting you forever.',
        {},
        { npcFate: { partner: 'estranged' } }
      )
    ],
    I('Bạn chỉ ghé qua thăm một lần rồi lại bị cuốn vào guồng quay công việc.', 'You paid a brief visit before disappearing into endless shifts.'),
    { bond: { partner: -10 }, tags: ['npc'] }
  ),

  M(
    'm2_syn_debtor_kid',
    GROWN,
    { jobs: ['Syndicate'] },
    '[Đứa trẻ trên bàn bếp] Kẻ nợ tiền bảo kê của băng đảng không có nhà khi bạn ập đến. Trong gian bếp lạnh ngắt chỉ có đứa con mười tuổi của ông ta đang cặm cụi nắn nót làm bài tập dưới ngọn đèn dầu.',
    '[The Child at the Kitchen Table] The delinquent debtor was nowhere to be found when you breached the apartment. Only his ten-year-old child sat alone at the kitchen table, quietly doing homework by an oil wick.',
    [
      C(
        'Ngồi đợi kẻ nợ tiền trở về',
        'Wait for the father to return',
        'Bạn kiên nhẫn ngồi đợi suốt ba tiếng đồng hồ. Đứa bé rụt rè rót mời bạn một cốc nước lọc; khi người cha trở về, bạn lẳng lặng lôi ông ta ra con hẻm phía sau để xử lý công việc.',
        'You waited three long hours. The child offered you a glass of water; when the father arrived, you dragged him to the back alley to settle the debt.',
        { wealth: 4, sanity: -3 }
      ),
      C(
        'Bắt cóc đứa bé làm con tin',
        'Abduct the child as collateral',
        'Người cha hoảng loạn gom góp trả sạch tiền nợ ngay trong đêm. Đứa trẻ không hề khóc lóc; nó trừng trừng nhìn bạn suốt cả chặng đường, như muốn khắc ghi từng nét mặt bạn vào xương tủy.',
        'The terrified father paid every Ahn before midnight. The child never shed a tear, staring at you to carve your face into its memory.',
        { wealth: 8, sanity: -8, heat: 4 },
        {
          mem: 'took_child',
          later: [{ id: 'm2_syn_child_returns', years: 12, reasonVi: 'Đứa bé đã học thuộc khuôn mặt bạn', reasonEn: 'The child memorized your face' }]
        }
      ),
      C(
        'Bỏ đi và báo cáo cấp trên là không gặp',
        'Walk away and report an empty house',
        'Gã đại ca trừ thẳng vào tiền lương của bạn vì không hoàn thành nhiệm vụ. Bạn cắn răng chịu phạt và không hé răng giải thích một lời.',
        'Your captain docked your pay for returning empty-handed. You accepted the penalty without offering a single word of excuse.',
        { wealth: -4, rep: -2 },
        { motif: { mercy: 1 } }
      )
    ],
    I('Bạn đứng chôn chân ở ngưỡng cửa một hồi lâu rồi lẳng lặng quay gót.', 'You lingered in the drafty doorway for a long while before walking away.'),
    { sanity: -2 }
  ),

  M(
    'm2_syn_child_returns',
    [28, 90],
    { mem: 'took_child' },
    '[Ánh mắt trả thù của The Middle] Một thành viên trẻ tuổi mang hình xăm của The Middle đứng chắn ngang đường bạn. Bạn mất một thoáng bàng hoàng mới nhận ra ánh mắt rực lửa hận thù ấy: chính là đứa bé trên bàn bếp năm nào.',
    '[The Middle’s Debt of Vengeance] A young enforcer bearing the ornate ink of the Middle blocked your path. It took you a chilling moment to recognize those smoldering eyes: the child at the kitchen table from years ago.',
    [
      C(
        'Đứng yên chờ đợi phán xét',
        'Stand still and face judgment',
        null,
        null,
        {},
        {
          out: [
            O(50, '"Còn nhớ tôi không?" Bạn khẽ gật đầu. Người ấy trừng trừng nhìn bạn hồi lâu rồi bước né sang một bên: "Tôi chỉ muốn bạn biết rằng tôi không bao giờ quên."', '“Do you remember me?” You gave a solemn nod. They stared into your eyes, then stepped aside: “I only wanted you to know that I never forgot.”', { sanity: -6 }),
            O(50, 'Người ấy đã ghi tên bạn vào Cuốn Sổ Báo Thù Book of Vengeance từ năm lên mười tuổi. Hôm nay, người đó xuất hiện là để gạch tên bạn bằng một nhát kiếm đẫm máu.', 'They inscribed your name into the Book of Vengeance at ten years old. Today they came to strike it out with a savage, cold blade.', { health: -22, sanity: -8 }, { scar: 'Tên trong Book of Vengeance' })
          ]
        }
      ),
      C(
        'Rút vũ khí ra tay trước',
        'Draw your weapon first',
        'Bạn ra tay nhanh hơn một nhịp. Kẻ đối địch ngã gục trong vũng máu, và bạn bàng hoàng nhận ra mình vừa tự tay tước đoạt sinh mạng của cả hai cha con họ.',
        'You were a fraction faster. The youth collapsed in blood, and a sickening horror gripped you: you had now ended both father and son.',
        { sanity: -14, heat: 8 },
        { motif: { violence: 2 } }
      )
    ],
    I('Bạn lẳng lặng quay lưng bước đi; lần này, người đó không đuổi theo bạn nữa.', 'You turned your back and walked away; for now, they chose not to pursue.'),
    { sanity: -3, once: true, tags: ['callback'] }
  ),

  M(
    'm2_wing_layoff',
    GROWN,
    { jobs: ['Wing Employee'] },
    '[Kế hoạch hãm hại trưởng nhóm] Tin đồn lan truyền rằng bộ phận của bạn sắp bị "tái cấu trúc nhân sự" để cắt giảm định biên. Một đồng nghiệp thân cận rủ rê bạn cùng ký đơn tố cáo những sai sót của trưởng nhóm để giữ chắc chiếc ghế của cả hai.',
    '[Purge of the Team Lead] Rumors spread that your corporate division was slated for severe personnel restructuring. A close colleague urged you to co-sign an internal grievance against the team lead to save your own seats.',
    [
      C(
        'Đồng ý cùng ký đơn tố cáo',
        'Co-sign the whistleblower report',
        'Vị trưởng nhóm bị lực lượng an ninh áp giải tống cổ khỏi Nest ngay trong tuần. Bạn giữ được chiếc ghế của mình, trong khi người đồng nghiệp kia được thăng chức lên làm trưởng nhóm mới.',
        'The team lead was escorted out of the Nest by security within days. You preserved your cubicle, while your conniving colleague ascended as the new lead.',
        { wealth: 4, network: 3, sanity: -4 }
      ),
      C(
        'Kiên quyết từ chối thủ đoạn hèn hạ',
        'Refuse the deceitful ploy',
        null,
        null,
        {},
        {
          out: [
            O(50, 'Đợt tái cấu trúc nhân sự đã không diễn ra như tin đồn. Đến năm sau, người đồng nghiệp mưu mô ấy bị điều chuyển công tác sang một chi nhánh xa xôi hẻo lánh.', 'The restructuring never materialized. The following year, that treacherous colleague was transferred to an undesirable branch.', { sanity: 2 }),
            O(50, 'Người đồng nghiệp kia tự mình nộp đơn tố cáo, và vu khống luôn cả bạn là đồng phạm. Bạn bị tập đoàn cắt toàn bộ tiền thưởng quý và nhận một án kỷ luật cảnh cáo.', 'The colleague submitted the grievance alone, framing you as an accomplice. You were stripped of quarterly bonuses with a formal disciplinary mark.', { wealth: -6, rep: -4 })
          ]
        }
      )
    ],
    I('Bạn ậm ừ bảo sẽ cân nhắc thêm rồi lảng tránh vấn đề.', 'You murmured that you would think about it, evading the plot.')
  ),

  M(
    'm2_ws_apprentice',
    GROWN,
    { jobs: ['Workshop Craftsman'] },
    '[Đứa trẻ xin học việc rèn] Một đứa trẻ gầy gò ở Backstreets ngày nào cũng đứng nép ngoài cửa xưởng chăm chú ngắm nhìn bạn rèn vũ khí. Hôm nay, nó lấy hết can đảm bước vào rụt rè hỏi xin được theo bạn học nghề.',
    '[The Backstreet Smith Apprentice] A scrawny alley youth stood outside the workshop every morning, transfixed by your forge hammer. Today, it gathered courage to step inside, asking to become your apprentice.',
    [
      C(
        'Nhận đứa trẻ vào làm thợ phụ',
        'Accept the eager apprentice',
        'Nó làm hỏng ba phôi kiếm trong tháng đầu tiên, nhưng đến tháng thứ tư đã tự tay rèn được một lưỡi dao găm bén ngót. Bạn tự hào treo thanh kiếm đầu tay của nó lên tường danh dự.',
        'It ruined three steel blanks in the first month, but forged a flawless dagger by the fourth. You proudly mounted its first creation upon the workshop wall.',
        { wealth: -3, sanity: 5, rep: 2 },
        { npc: { role: 'partner', bond: 60 } }
      ),
      C(
        'Quát mắng xua đuổi nó đi',
        'Drive the kid away',
        'Đứa trẻ sợ hãi không dám quay lại xưởng nữa. Vài tháng sau, bạn tình cờ nhìn thấy nó đang làm chân chạy việc vặt cho một băng đảng Syndicate khét tiếng.',
        'The terrified child ceased visiting. Months later, you spotted it running street errands for a ruthless syndicate gang.',
        { sanity: -2 }
      )
    ],
    I('Bạn không buồn đáp lời, tiếp tục quai búa nện thép trên đe.', 'You ignored the request, continuing to hammer glowing steel upon the anvil.')
  ),

  // ------------------------------------------------------------ the people closest to you
  M(
    'm2_child_first_word',
    [20, 70],
    { npc: 'child' },
    '[Tiếng gọi đầu đời của {child}] {child} bập bẹ thốt lên từ ngữ đầu tiên trong đời. Đó không phải là "bố", cũng chẳng phải là "mẹ", mà lại chính là tên con phố máu me mà bạn thường hay nhắc tới mỗi khi đi làm về.',
    '[First Words of {child}] {child} babbled their very first word. It was neither “mama” nor “papa,” but the violent name of the blood-slicked avenue you often muttered after work.',
    [
      C(
        'Bật cười và ôm chầm lấy con',
        'Laugh and embrace them',
        'Bạn bật cười hạnh phúc đến ứa nước mắt và bế bổng con lên cao. Suốt cả đêm hôm đó, bạn không còn bận tâm nghĩ đến những công việc đẫm máu ngoài kia nữa.',
        'You laughed until tears pricked your eyes, scooping your child into the air. That night, bloody work vanished completely from your thoughts.',
        { sanity: 7 },
        { bond: { child: 8 } }
      ),
      C(
        'Tự hứa không bao giờ nhắc tên con phố đó nữa',
        'Swear never to speak that name again',
        'Con phố ấy là nơi bạn từng phải làm những việc tàn nhẫn mà bạn không bao giờ muốn đứa con thơ ngây biết đến. Bạn giữ trọn lời thề thiêng liêng ấy.',
        'That street was where you committed sins you wished your innocent child never to know. You strictly kept that sacred vow.',
        { sanity: 3 },
        { bond: { child: 5 } }
      )
    ],
    I('Bạn quá kiệt sức sau ca làm, chỉ kịp xoa nhẹ đầu con rồi lăn ra ngủ.', 'Exhausted from your shift, you merely ruffled their hair before collapsing.'),
    { sanity: 1, once: true, tags: ['npc', 'relief'] }
  ),

  M(
    'm2_child_fixer_dream',
    [30, 90],
    { npc: 'child' },
    '[Ước mơ Fixer của {child}] {child} hào hứng thổ lộ với bạn ước mơ muốn trở thành một Fixer tài ba, "giống hệt như những người hùng oai phong xuất hiện trên màn hình tivi".',
    '[The Fixer Dream of {child}] {child} excitedly announced their dream of becoming a celebrated Fixer, “just like the gallant heroes broadcasted on the city screens.”',
    [
      C(
        'Kể cho con nghe toàn bộ sự thật tàn khốc',
        'Reveal the gruesome truth',
        'Bạn trầm giọng kể về vô số những người đồng đội đã bỏ mạng thảm khốc mà bạn từng chứng kiến. {child} lặng người suy nghĩ hồi lâu, rồi ngước lên hỏi: "Vậy sao bố/mẹ vẫn làm?"',
        'You solemnly recounted the countless comrades you had seen slaughtered. {child} fell silent for a long time before asking: “Then why do you still do it?”',
        { sanity: -2 },
        { bond: { child: 6 } }
      ),
      C(
        'Dạy con cách cầm vũ khí chuẩn xác',
        'Train them to wield steel properly',
        'Nếu như con đường số phận đằng nào cũng dẫn đứa con bạn bước vào chốn gió tanh mưa máu này, ít nhất bạn phải dạy nó cách sống sót lâu hơn chính bạn.',
        'If fate will drag your child down this bloodied path regardless, you must at least drill them to survive longer than you did.',
        { sanity: 1 },
        { bond: { child: 10 }, mem: 'trained_child' }
      ),
      C(
        'Nghiêm cấm tuyệt đối',
        'Forbid it with fury',
        '{child} giận dữ đóng sầm cửa phòng lại. Sau đó đứa trẻ không bao giờ nhắc lại chuyện đó với bạn nữa, nhưng bạn biết ngọn lửa ấy vẫn âm ỉ cháy.',
        '{child} slammed the bedroom door in fury. They never spoke of it again, though you knew the dangerous desire smoldered within.',
        {},
        { bond: { child: -8 } }
      )
    ],
    I('Bạn thở dài và khéo léo đánh trống lảng sang chủ đề khác.', 'You sighed and steered the conversation toward mundane chores.'),
    { once: true, tags: ['npc'] }
  ),

  M(
    'm2_spouse_secret',
    [22, 80],
    { npc: 'spouse' },
    '[Bức thư bị đốt cháy của {lover}] {lover} bất ngờ nhận được một lá thư bí ẩn và vội vã ném nó vào lò sưởi đốt cháy trước khi bạn kịp nhìn thấy. Người ấy chỉ khẽ bảo đó là "chuyện cũ xưa kia".',
    '[The Charred Letter of {lover}] {lover} received a mysterious missive, hastily casting it into the stove fire before you could catch a glimpse. They quietly muttered it was merely “an old affair.”',
    [
      C(
        'Tuyệt đối tin tưởng và không gặng hỏi',
        'Trust them unconditionally',
        'Một năm sau, người ấy tự nguyện trải lòng: đó là bức thư từ gia tộc thượng lưu trong Nest từng ruồng bỏ họ, nay muốn gọi họ về. Người ấy đã dứt khoát chọn ở lại bên bạn.',
        'A year later, they confessed: it was an olive branch from their former Nest dynasty, urging their return. They had resolutely chosen to stay beside you.',
        { sanity: 4 },
        { bond: { lover: 14 } }
      ),
      C(
        'Âm thầm điều tra sau lưng người ấy',
        'Investigate the matter in secret',
        'Bạn lén lút tìm ra toàn bộ chân tướng, nhưng người ấy cũng phát hiện bạn đã không tin tưởng họ: "Nếu muốn biết, tại sao bạn không trực tiếp hỏi tôi chứ?"',
        'You uncovered the truth, but they realized you had spied upon them: “If you doubted me, why could you not simply ask to my face?”',
        { network: 2 },
        { bond: { lover: -12 } }
      )
    ],
    I('Bạn nhìn đống tro tàn trong gạt tàn một lúc rồi lẳng lặng đi ngủ.', 'You stared at the charred ash in the tray before heading to bed.'),
    { once: true, tags: ['npc'] }
  ),

  M(
    'm2_spouse_threat',
    [22, 80],
    { npc: 'spouse', stat: { heat: [30, 100] } },
    '[Tấm ảnh chụp lén {lover}] Kẻ thù nhét một tấm ảnh chụp lén {lover} đang đi chợ qua khe cửa nhà bạn. Phía sau tấm ảnh có nắn nót dòng chữ đầy vẻ đe dọa: "Đẹp đấy."',
    '[The Shadowed Snapshot of {lover}] An unseen enemy slid a surveillance photo of {lover} at the market beneath your door. On the back, chilling words were inked: “Quite lovely.”',
    [
      C(
        'Gửi {lover} tạm lánh sang District khác',
        'Send {lover} into hiding elsewhere',
        'Người ấy bật khóc nức nở khi phải chia xa bạn. Suốt ba tháng cô độc sau đó, bạn lùng sục khắp các ngõ ngách và tóm gọn kẻ đứng sau bức ảnh.',
        'They wept bitterly at the forced parting. For three solitary months, you combed the alleys until you located and eliminated the stalker.',
        { sanity: -5, heat: -15 },
        { bond: { lover: -4 } }
      ),
      C(
        'Tự mình truy sát kẻ chụp ảnh',
        'Hunt down the photographer yourself',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Bạn lần ra hang ổ của hắn chỉ trong vòng hai ngày và xử lý gọn gàng. Kể từ đó, không còn bất kỳ kẻ nào dám đe dọa gia đình bạn nữa.', 'You unearthed his lair in two days and neutralized him. Never again did a threatening snapshot slip beneath your door.', { heat: -10, sanity: -4 }, { motif: { violence: 1 } }),
            O(40, 'Trong lúc bạn đang ra ngoài lùng sục, đồng bọn của chúng đã ập vào căn hộ. {lover} may mắn sống sót nhưng hoảng loạn đến mức không bao giờ dám bước chân ra chợ một mình nữa.', 'While you were scouring the alleys, their accomplices breached your flat. {lover} survived, yet terror crippled them from ever walking the market alone again.', { sanity: -12 }, { bond: { lover: -6 }, scar: 'Ngày bạn không ở nhà' })
          ]
        }
      )
    ],
    I('Bạn nghiến răng xé nát bức ảnh và quyết định không kể cho ai biết.', 'You tore the photo to shreds, keeping the grim threat to yourself.'),
    { sanity: -3, tags: ['npc', 'danger'] }
  ),

  M(
    'm2_friend_wedding',
    [20, 50],
    { npc: 'friend' },
    '[Hôn lễ của {friend}] {friend} chuẩn bị kết hôn và chân thành mời bạn làm phù rể/phù dâu đứng cạnh họ trong buổi lễ. Trớ trêu thay, vào đúng ngày hôm đó bạn lại có một ủy thác Fixer trả thù lao rất hậu hĩnh.',
    '[The Wedding of {friend}] {friend} was getting wed and warmly requested you to stand as their principal witness. Fatefully, that exact date offered a lucrative commission with massive pay.',
    [
      C(
        'Gác lại công việc đến dự lễ cưới',
        'Attend the wedding ceremony',
        'Bạn khoác lên mình bộ lễ phục duy nhất không dính vết máu. {friend} ôm chầm lấy bạn bật khóc vì xúc động; đó là một trong những ngày tươi đẹp và ấm áp nhất trong cuộc đời bạn.',
        'You donned your sole garment unmarred by bloodstains. {friend} embraced you in joyous tears; it remained one of the sweetest memories of your existence.',
        { sanity: 8, wealth: -3 },
        { bond: { friend: 15 } }
      ),
      C(
        'Ưu tiên đi làm ủy thác kiếm tiền',
        'Prioritize the lucrative commission',
        'Bạn gửi một món quà mừng đắt giá để tạ lỗi. Ít lâu sau, {friend} gửi tặng lại bạn một tấm ảnh cưới; ở vị trí bên cạnh họ chỉ còn là một khoảng trống vắng lạnh lùng.',
        'You dispatched an opulent gift in apology. Later, {friend} mailed you a wedding portrait; in the space where you were meant to stand lay only an empty void.',
        { wealth: 10 },
        { bond: { friend: -12 } }
      )
    ],
    I('Bạn bận rộn đến mức không kịp gửi lại một lời hồi đáp.', 'You were too consumed by survival to even reply to the invitation.'),
    { bond: { friend: -15 }, once: true, tags: ['npc', 'relief'] }
  ),

  M(
    'm2_mentor_old',
    [25, 80],
    { npc: 'mentor' },
    '[Tâm nguyện nhìn biển của {mentor}] {mentor} giờ đây đã quá già yếu và hai tay run rẩy không còn cầm nổi thanh kiếm nữa. Người thầy già tha thiết nhờ bạn đưa ông đi ngắm nhìn biển cả một lần cuối trước khi nhắm mắt.',
    '[The Sea Wish of {mentor}] {mentor} had grown too frail, hands trembling too violently to grip a sword. The old master softly asked if you would guide him to gaze upon the sea once before he passed.',
    [
      C(
        'Đưa thầy đi ngắm biển',
        'Guide him to the waters',
        'The City không có biển tự nhiên, nên bạn đưa ông đến bờ hồ The Great Lake. Ông cụ ngồi ngắm nhìn mặt nước bao la suốt cả buổi chiều và mãn nguyện bảo đó là biển; bạn lặng lẽ mỉm cười không cãi.',
        'The City has no ocean, so you escorted him to the shores of the Great Lake. He watched the vast waters all afternoon calling it the sea; you smiled and did not correct him.',
        { sanity: 6, wealth: -4 },
        { bond: { mentor: 15 } }
      ),
      C(
        'Hứa hẹn sẽ đưa đi sau',
        'Promise to fulfill it later',
        'Mùa đông buốt giá năm ấy ông đã trút hơi thở cuối cùng. Khi thu dọn di vật trong túi áo ông, bạn tìm thấy một tấm vé tàu đi District 21 vẫn còn nguyên vẹn chưa từng được sử dụng.',
        'He passed away that bitter winter. Sifting through his coats, you discovered an unused transit ticket to District 21 tucked inside his pocket.',
        { sanity: -8 },
        { npcFate: { mentor: 'dead' } }
      )
    ],
    I('Bạn quá bận rộn với các hợp đồng sinh tồn nên đành gác lại lời thỉnh cầu.', 'You were drowned in mercenary contracts, neglecting the old master’s plea.'),
    { sanity: -4, npcFate: { mentor: 'dead' }, once: true, tags: ['npc'] }
  ),

  M(
    'm2_lover_meet_adult',
    [18, 45],
    { noNpc: 'lover', noFlags: ['Married'] },
    '[Nửa chiếc ô trong mưa axit] Một người đồng nghiệp cùng ca làm việc tốt bụng chia cho bạn nửa chiếc ô để che chắn cơn mưa axit bất chợt. Hai người nép sát vai nhau đứng dưới mái hiên trò chuyện cho tới khi mưa tạnh.',
    '[Sharing an Acid Rain Umbrella] A kind co-worker on your shift shared half their sturdy umbrella with you during sudden acid drizzle. Both of you sheltered beneath an awning talking softly until the toxic skies cleared.',
    [
      C(
        'Mời người ấy cùng đi ăn tối',
        'Invite them to dinner',
        'Quán mì quen đông nghẹt khách. Hai người phải ngồi chen chúc chung bàn với một tay Fixer say xỉn, nhưng đó lại là bữa tối ấm cúng và vui vẻ nhất của bạn trong suốt cả năm.',
        'The noodle shack was packed to bursting. You squeezed into a corner table beside a drunken Fixer, sharing the warmest and most joyful meal of the year.',
        { sanity: 5, wealth: -1 },
        { npc: { role: 'lover', bond: 50 } }
      ),
      C(
        'Nói lời cảm ơn rồi ra về',
        'Offer thanks and part ways',
        'Sang tuần sau người ấy được điều chuyển sang ca làm khác. Thỉnh thoảng trong những ngày mưa, bạn vẫn bồi hồi nhớ về hình ảnh nửa chiếc ô năm nào.',
        'The following week they transferred to another shift. On rainy days, you occasionally recalled that shared umbrella.',
        {}
      )
    ],
    I('Bạn ngượng ngùng im lặng suốt cả buổi trú mưa.', 'You remained awkward and silent throughout the entire shower.')
  ),

  M(
    'm2_lover_leave_city',
    [20, 50],
    { npc: 'lover', noFlags: ['Married'] },
    '[Tấm vé thường trú duy nhất] {lover} có một người họ hàng quyền lực trong Nest có thể sắp xếp bảo lãnh cho một người vào sinh sống hợp pháp. Nhưng suất bảo lãnh ấy chỉ dành cho duy nhất một người mà thôi.',
    '[The Single Nest Permit] {lover} possessed a high-ranking relative within a Nest who could arrange residency papers for one individual. For just one single soul.',
    [
      C(
        'Khuyên {lover} hãy nắm lấy cơ hội vào Nest',
        'Urge {lover} to seize the chance',
        'Người ấy gạt nước mắt bước lên chuyến tàu vào Nest. Những cánh thư gửi về đều đặn trong năm đầu tiên rồi thưa dần; dẫu sao bạn cũng an lòng vì người mình yêu được an toàn.',
        'They departed in tears. Letters arrived regularly for a year, then slowly trickled away; at least you knew they were safe from alley carnage.',
        { sanity: -6, rep: 2 },
        { npcFate: { lover: 'estranged' }, motif: { mercy: 1 } }
      ),
      C(
        'Cầu xin {lover} hãy ở lại bên bạn',
        'Plead with {lover} to stay',
        'Người ấy quyết định ở lại cùng bạn. Hai người không bao giờ nhắc lại tờ giấy bảo lãnh ấy nữa, nhưng thỉnh thoảng bạn lại bắt gặp ánh mắt người ấy dõi về phía bức tường Nest xa xa.',
        'They chose to remain beside you. Neither ever spoke of the visa again, though you occasionally caught them gazing toward the shining spires of the Nest.',
        { sanity: 3 },
        { bond: { lover: 10 } }
      )
    ],
    I('Bạn để người ấy tự đưa ra quyết định sinh tử cho cuộc đời mình.', 'You left the momentous decision entirely in their own hands.', {}, {
      out: [
        O(50, 'Người ấy quyết định ở lại nơi hẻm tối, vì tình yêu dành cho bạn.', 'They chose to stay in the grim Backstreets, bound by love for you.', { sanity: 3 }, { bond: { lover: 8 } }),
        O(50, 'Người ấy bước lên tàu ra đi, để lại cho bạn một lá thư từ biệt dài đầy nước mắt.', 'They boarded the train, leaving behind a tear-stained farewell letter.', { sanity: -6 }, { npcFate: { lover: 'estranged' } })
      ]
    }),
    { once: true, tags: ['npc'] }
  ),

  M(
    'm2_rival_help',
    [18, 60],
    { npc: 'rival' },
    '[Cuộc gọi cầu cứu của {rival}] {rival} bất ngờ gọi điện cho bạn vào lúc nửa đêm trong cơn hoảng loạn. Người đối thủ ấy đang bị mắc kẹt bên trong một khu phố bị lực lượng vũ trang phong tỏa và không còn ai khác để cầu cứu.',
    '[The Midnight S.O.S of {rival}] {rival} unexpectedly called your terminal at midnight in sheer desperation. They were trapped inside a cordoned district under active sweep, with no one else to call.',
    [
      C(
        'Đến tiếp ứng giải cứu đối thủ',
        'Infiltrate and rescue them',
        null,
        null,
        {},
        {
          out: [
            O(60, 'Bạn xông vào đưa được họ thoát hiểm an toàn. Họ không nói lời cảm ơn; nhưng một tuần sau, ai đó đã lẳng lặng để trước cửa nhà bạn một chai rượu mạnh đắt tiền.', 'You broke through the cordon and dragged them out. They offered no thanks; but a week later, an expensive bottle of spirits sat unsigned upon your porch.', { health: -6, rep: 3 }, { bond: { rival: 25 } }),
            O(40, 'Cả hai đều bị thương tích đầy mình trong lúc mở đường máu. Nằm kề vai nhau trên giường bệnh phòng khám chui, lần đầu tiên hai người nói chuyện với nhau như những người bạn bình thường.', 'Both of you suffered heavy wounds breaking the perimeter. Laying side-by-side in a back-alley clinic, you spoke like ordinary comrades for the first time.', { health: -14 }, { bond: { rival: 30 } })
          ]
        }
      ),
      C(
        'Lạnh lùng dập máy',
        'Hang up the receiver',
        'Sáng hôm sau bản tin thông báo khu vực đó vừa bị các đội dọn dẹp quét sạch hoàn toàn. Bạn vĩnh viễn không bao giờ biết được {rival} có còn sống sót thoát ra ngoài hay không.',
        'Morning broadcasts announced the cordoned sector had been thoroughly sanitized. You never learned whether your rival survived the purge.',
        { sanity: -6 },
        { npcFate: { rival: 'missing' } }
      )
    ],
    I('Bạn để chuông điện thoại reo vang cho đến khi nó tự động ngắt kết nối.', 'You let the communicator chime in the dark until it fell silent.'),
    { sanity: -4, npcFate: { rival: 'missing' }, once: true, tags: ['npc'] }
  ),

  // ------------------------------------------------------------ anywhere
  M(
    'm2_any_found_gun',
    YOUNG,
    { notNest: true },
    '[Khẩu súng ngắn trong thùng rác] Bạn tình cờ nhặt được một khẩu súng lục kim loại bị vứt bỏ trong thùng rác sau một quán rượu Backstreets. Ổ đạn vẫn còn nguyên ba viên đạn chưa bắn.',
    '[The Discarded Pistol in the Bin] You stumbled upon a steel handgun abandoned inside a dumpster behind a backstreet tavern. Three live rounds remained seated in the cylinder.',
    [
      C(
        'Giữ lại khẩu súng phòng thân',
        'Keep the weapon',
        'Bạn cẩn thận giấu khẩu súng lục dưới đệm giường nằm. Mỗi đêm biết có khẩu súng ở ngay dưới đầu, bạn cảm thấy an tâm hơn nhưng trong lòng cũng nơm nớp lo sợ hơn.',
        'You hid the firearm beneath your straw mattress. Knowing it lay there each night brought a sliver of safety, yet deepened your dread of the City’s law.',
        { sanity: 1 },
        { flags: ['HasGun'], mem: 'kept_gun' }
      ),
      C(
        'Mang đi bán lấy tiền',
        'Sell it to a pawn broker',
        'Gã thu mua đồ cũ trả ngay cho bạn 8 đồng Ahn tiền mặt mà tuyệt nhiên không buồn hỏi han xem bạn lấy khẩu súng từ đâu.',
        'The junk dealer paid eight crisp Ahn on the spot without asking a single question regarding its origin.',
        { wealth: 4 }
      ),
      C(
        'Ném khẩu súng xuống cống ngầm',
        'Hurl it into the deep sewer',
        'Bạn ném khẩu súng qua song sắt cống rãnh. Tiếng kim loại rơi sâu hun hút một hồi lâu mới nghe thấy tiếng nước bì bõm.',
        'You dropped the gun through the storm grate. You listened for what felt like ages before a distant splash echoed.',
        { sanity: 2 }
      )
    ],
    I('Bạn sợ hãi bỏ khẩu súng lại vào trong thùng rác rồi vội vã rời đi.', 'Terrified of city taboos, you left the weapon in the refuse and hurried away.')
  ),

  M(
    'm2_any_gun_night',
    [10, 30],
    { mem: 'kept_gun' },
    '[Tiếng cạy cửa lúc 2 giờ sáng] Có kẻ lạ mặt đang lén lút cạy then khóa cửa nhà bạn vào lúc 2 giờ sáng giữa đêm khuya. Khẩu súng lục nhặt được năm nào vẫn đang nằm im dưới nệm giường của bạn.',
    '[The 2 AM Lockpick Attempt] An intruder was stealthily jimmying your front door locks at two in the morning. The pistol you kept was still tucked beneath your mattress.',
    [
      C(
        'Lăm lăm súng bước ra cửa nghênh địch',
        'Grip the gun and confront the intruder',
        null,
        null,
        {},
        {
          out: [
            O(55, 'Bạn bóp cò bắn xuyên qua khe cửa gỗ. Tiếng bước chân hoảng loạn tháo chạy vang lên; sáng hôm sau chỉ còn một vệt máu tươi trên bậc thềm và ánh mắt kiêng dè của những người hàng xóm.', 'You discharged a round straight through the wood. Footsteps fled; at dawn, a trail of blood stained the step, and neighbors eyed you with newfound wariness.', { sanity: -5, rep: 3, heat: 3 }),
            O(45, 'Khẩu súng cũ bị kẹt đạn. Kẻ đột nhập phá cửa xông vào nện bạn ngã gục bằng xà beng rồi cướp luôn khẩu súng tẩu thoát.', 'The rusted hammer jammed. The burglar forced the door, clubbed you with an iron crowbar, and stole the weapon.', { health: -10, wealth: -4 })
          ]
        }
      ),
      C(
        'Chui xuống gầm giường trốn',
        'Crawl beneath the bed',
        'Kẻ đột nhập lục lọi vơ vét vài món đồ giá trị trong phòng rồi tẩu thoát. Khẩu súng lục vẫn nằm nguyên dưới nệm, ngay sát phía trên đỉnh đầu bạn.',
        'The intruder ransacked your cupboards for valuables and fled. The pistol remained undisturbed beneath the mattress, mere inches above your head.',
        { wealth: -3, sanity: -3 }
      )
    ],
    I('Bạn nằm bất động trên giường, tim đập thình thịch trong lồng ngực.', 'You lay frozen beneath the covers, heart hammering against your ribs.'),
    { sanity: -3, wealth: -3, once: true, tags: ['callback', 'danger'] }
  ),

  M(
    'm2_any_carmen_song',
    [12, 90],
    { stat: { sanity: [0, 35] } },
    '[Tiếng đàn piano nơi hư không] Bạn bắt đầu nghe thấy một bản nhạc dương cầm du dương và ma mị vang lên ở những góc phố hoàn toàn không hề có chiếc đàn piano nào.',
    '[Piano Notes in the Void] You began hearing an enchanting, melancholic piano melody resonating in alleyways where no instrument existed.',
    [
      C(
        'Đến phòng khám kiểm tra thần kinh',
        'Visit a neural clinic',
        'Bác sĩ kê cho bạn một liều thuốc an thần cực mạnh và nhìn bạn với ánh mắt ái ngại đầy vẻ cảnh giác. Tiếng đàn nhỏ dần đi, nhưng tuyệt đối không bao giờ dứt hẳn.',
        'The doctor prescribed heavy sedatives and scrutinized you with clinical dread. The piano grew fainter, yet never truly ceased.',
        { sanity: 4, wealth: -3 }
      ),
      C(
        'Nhắm mắt chăm chú lắng nghe',
        'Close your eyes and listen',
        'Giai điệu ấy đẹp đẽ và quyến rũ đến kỳ lạ. Cứ mỗi lần lắng nghe xong, bạn lại cảm thấy tâm hồn mình nhẹ bẫng đi một chút, nhưng cũng dần xa cách thế gian con người hơn một chút.',
        'The melody was breathtakingly sublime. Each time you listened, your spirit felt lighter, yet slipped further away from mortal humanity.',
        { sanity: 2, resonance: 10 }
      )
    ],
    I('Bạn vội vã bật to đài phát thanh để át đi tiếng đàn bí ẩn.', 'You cranked the radio volume up to drown out the spectral cadence.'),
    { resonance: 3, theme: 'carmen' }
  ),

  M(
    'm2_any_old_age_letter',
    [60, 140],
    {},
    '[Lá thư để lại cho hậu thế] Bạn ngồi lặng lẽ bên bàn trà viết một lá thư di chúc gửi cho người sẽ đọc nó sau khi bạn nhắm mắt xuôi tay. Bạn cầm cây bút ngập ngừng hồi lâu, không biết nên bắt đầu từ đâu.',
    '[Final Testament to the Future] You sat alone by candlelight drafting a letter for whoever might uncover it after your demise. Your pen hovered, unsure where to commence.',
    [
      C(
        'Viết về những sai lầm và hối hận trong đời',
        'Write of your lifelong regrets',
        'Lá thư dài tới tám trang giấy kể về những dằn vặt khôn nguôi. Viết xong, bạn chìm vào một giấc ngủ sâu và bình yên nhất sau bao nhiêu năm tháng dằn vặt.',
        'The testament ran eight painful pages of unburdened guilt. Having finished, you enjoyed the longest, most peaceful slumber in decades.',
        { sanity: 6 }
      ),
      C(
        'Viết về những người bạn từng yêu thương',
        'Write of the souls you loved',
        'Bạn nắn nót viết lại tên của từng người thân yêu. Trong số đó có những cái tên tưởng chừng như đã bị dòng đời tàn khốc xóa nhòa khỏi tâm trí bạn.',
        'You inscribed every cherished name in careful script. Among them were souls you feared had long been erased by the callous City.',
        { sanity: 4, resonance: 2 }
      )
    ],
    I('Bạn thở dài và gấp lại tờ giấy trắng tinh.', 'You sighed and folded the blank parchment page away.'),
    { once: true, tags: ['relief'] }
  )
];

export default LIFE_MINORS_2;
