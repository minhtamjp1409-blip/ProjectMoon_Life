// ============================================================================
// MAJOR EVENTS: OFFICES AND ASSOCIATIONS, THE FINGERS, THE WINGS, AND HOME
// The "[Title]" opening each text heads the decision panel. People added here
// without a name get one at random, so no two lives marry the same person.
// ============================================================================

export const FACTION_EVENTS = [
  // ------------------------------------------------------------------ Fixers
  {
    id: 'fx_office_recruitment',
    age: [18, 35],
    major: true,
    weight: 9,
    jobs: ['Fixer'],
    forbids: ['HasAffiliation'],
    vi: '[Ba lời mời] Một Fixer không có Office hay Association đứng sau thì ai cũng có thể giết mà không phải trả giá. Tuần này có ba nơi muốn nhận bạn.',
    en: '[Three offers] A Fixer with no Office or Association behind them can be killed by anyone at no cost. This week, three places want you.',
    choices: [
      {
        labelVi: 'Hook Office: nhận việc săn tiền thưởng ở Backstreets',
        labelEn: 'Hook Office: bounty work in the Backstreets',
        resultVi: 'Người điều phối ném cho bạn một cái móc sắt còn dính thứ gì đó đã khô. "Trả theo đầu. Đừng chết trước khi trả hết tiền đồ nghề." Người được xếp làm cộng sự với bạn chìa tay ra bắt.',
        resultEn: 'The operator tossed you an iron hook with something dried on it. “Paid by the head. Don’t die before your gear is paid off.” The Fixer assigned as your partner held out a hand.',
        setOrg: { type: 'office', name: 'Hook Office' },
        flagsAdd: ['HasAffiliation'],
        npcAdd: { role: 'partner', bond: 60 },
        effects: { network: +10, rep: +8, sanity: -6 },
        meritAdd: 8
      },
      {
        labelVi: 'Shi Association: làm sát thủ theo hợp đồng',
        labelEn: 'Shi Association: contract killing',
        resultVi: 'Shi dạy rằng người ta chém đẹp nhất khi sắp chết. Họ cho bạn làm việc 96 tiếng không ngủ với vết thương chưa khâu, để bạn hiểu điều đó bằng cơ thể mình.',
        resultEn: 'Shi teaches that you cut cleanest when you are about to die. They worked you 96 hours without sleep on unstitched wounds, so you would learn it in your body.',
        setOrg: { type: 'assoc', name: 'Shi Association' },
        flagsAdd: ['HasAffiliation', 'ShiOverdrive'],
        recordsAdd: ['assoc_joined'],
        effects: { health: -18, sanity: -10, rep: +18, wealth: +16 },
        scarsAdd: ['Dấu của Shi Association'],
        meritAdd: 18
      },
      {
        labelVi: 'Öufi Association: thi hành điều khoản hợp đồng',
        labelEn: 'Öufi Association: enforcing contracts',
        resultVi: 'Khi có người vi phạm một hợp đồng mà Öufi chứng nhận, bạn là người đến nhà họ cùng cây kích. Gia đình họ thường có mặt. Điều khoản không có mục nào về chuyện đó.',
        resultEn: 'When someone breaks a contract Öufi has notarized, you are the one who comes to their home with the halberd. Their family is usually there. The clauses say nothing about that.',
        setOrg: { type: 'assoc', name: 'Öufi Association' },
        flagsAdd: ['HasAffiliation'],
        recordsAdd: ['assoc_joined'],
        effects: { wealth: +16, network: +16, sanity: -8 },
        meritAdd: 14
      }
    ]
  },
  {
    id: 'fx_shi_boundary_of_death',
    age: [20, 48],
    major: true,
    weight: 8,
    jobs: ['Fixer'],
    requires: ['ShiOverdrive'],
    vi: '[Boundary of Death] Mười một đêm liền làm việc cho Shi. Phổi bạn có tiếng lạo xạo mỗi lần thở. Mục tiêu đêm nay mạnh hơn mọi thông tin bạn được biết, và lưỡi dao của hắn đã chạm vào cổ bạn.',
    en: '[Boundary of Death] Eleven nights straight working for Shi. Your lungs crackle with each breath. Tonight’s target is stronger than anything in your briefing, and his blade is already at your throat.',
    choices: [
      {
        labelVi: 'Bỏ phòng thủ, dồn tất cả vào một nhát',
        labelEn: 'Drop your guard and put everything into one cut',
        outcomes: [
          {
            w: 50,
            resultVi: 'Bạn không nhớ mình đã rút kiếm. Bạn chỉ nhớ rằng sau đó hắn nằm thành hai phần, và cả căn phòng im lặng đến mức nghe được tiếng máu nhỏ xuống sàn.',
            resultEn: 'You don’t remember drawing. You only remember that afterward he lay in two pieces, and the room was so quiet you could hear the blood dripping on the floor.',
            effects: { health: -28, rep: +32, wealth: +28, resonance: +22 },
            scarsAdd: ['Nhát chém ở ranh giới'],
            meritAdd: 35
          },
          {
            w: 50,
            resultVi: 'Gân vai bạn đứt ngay giữa nhát chém. Hắn ghim bạn vào tường bằng chính lưỡi dao của hắn. Người của Shi đến kịp, nhưng chỉ vừa kịp.',
            resultEn: 'The tendon in your shoulder tore mid-swing. He pinned you to the wall with his own blade. Shi’s people arrived in time, but only just.',
            effects: { health: -48, sanity: -22, resonance: +25 },
            scarsAdd: ['Gân vai đứt']
          }
        ]
      },
      {
        labelVi: 'Tiêm thuốc cầm máu và rút lui',
        labelEn: 'Inject a coagulant and pull back',
        resultVi: 'Bạn còn sống. Hợp đồng thất bại, và Shi trừ toàn bộ tiền thưởng của bạn như thể đó là cái giá rẻ nhất có thể.',
        resultEn: 'You lived. The contract failed, and Shi docked your entire fee as if it were the cheapest price possible.',
        effects: { health: -12, wealth: -15, rep: -10 }
      }
    ]
  },

  // ------------------------------------------------------------------ the Fingers
  {
    id: 'syn_choose_finger_allegiance',
    age: [18, 38],
    major: true,
    weight: 10,
    jobs: ['Syndicate'],
    forbids: ['SwornFinger'],
    vi: '[Chọn một Finger] Trong một tầng hầm dưới Backstreets, người của ba Finger đang tuyển. Ai đã vào thì không ra được nữa, và mỗi nơi có luật riêng của nó.',
    en: '[Choosing a Finger] In a basement under the Backstreets, three of the Fingers are recruiting. Once you are in, you do not get out, and each has its own rules.',
    choices: [
      {
        labelVi: 'The Thumb: kỷ luật và tôn ti',
        labelEn: 'The Thumb: discipline and rank',
        resultVi: 'Trong buổi nhập môn, một tân binh lỡ nhìn thẳng vào mắt một Capo. Không ai bảo, cậu ta tự rút dao và cắt lưỡi mình. Người ta trao cho bạn khẩu súng của một Soldato.',
        resultEn: 'During initiation, a recruit looked a Capo in the eye by mistake. Unbidden, he drew a knife and cut out his own tongue. They handed you a Soldato’s rifle.',
        setFinger: 'Thumb',
        setFingerRank: 0,
        flagsAdd: ['SwornFinger'],
        recordsAdd: ['finger_initiate'],
        effects: { wealth: +18, rep: +12, sanity: -14 },
        meritAdd: 12
      },
      {
        labelVi: 'The Middle: anh em và báo thù',
        labelEn: 'The Middle: family and revenge',
        resultVi: 'Họ xăm lên tay bạn bằng kim nung. Từ nay, ai động đến một người anh em của bạn sẽ có tên trong Book of Vengeance, và bạn sẽ là người đi đòi.',
        resultEn: 'They tattooed your arm with a heated needle. From now on, anyone who touches one of your brothers goes into the Book of Vengeance, and you will be the one who collects.',
        setFinger: 'Middle',
        setFingerRank: 0,
        flagsAdd: ['SwornFinger'],
        recordsAdd: ['finger_initiate'],
        effects: { health: +10, rep: +14, heat: +20, sanity: -10 },
        meritAdd: 12
      },
      {
        labelVi: 'The Ring: nghệ thuật',
        labelEn: 'The Ring: art',
        resultVi: 'Họ đưa bạn một chiếc tạp dề và cho xem tác phẩm của các Student năm nay. Bạn nôn ở góc phòng. Một Docent gật đầu: "Ai cũng thế lúc đầu. Rồi sẽ đẹp."',
        resultEn: 'They gave you an apron and showed you this year’s Student works. You threw up in the corner. A Docent nodded: “Everyone does at first. Then it becomes beautiful.”',
        setFinger: 'Ring',
        setFingerRank: 0,
        flagsAdd: ['SwornFinger'],
        recordsAdd: ['finger_initiate'],
        effects: { sanity: -22, rep: +14, wealth: +16, resonance: +20 },
        scarsAdd: ['Con mắt của The Ring'],
        meritAdd: 14
      }
    ]
  },
  {
    id: 'syn_thumb_tongue_etiquette',
    age: [20, 50],
    major: true,
    weight: 8.5,
    jobs: ['Syndicate'],
    vi: '[Lễ nghi của The Thumb] Trong buổi họp chia địa bàn, một Sottocapo ra lệnh đốt cả một dãy nhà, trong đó có nhà của người anh em thân nhất của bạn. Bạn vừa mở miệng thì một Capo đặt con dao mạ vàng lên bàn.\n"Mày định hỏi lại lệnh của Sottocapo à? Tự làm đi, hoặc tao bắn cả đội của mày."',
    en: '[The Thumb’s etiquette] At the turf meeting, a Sottocapo ordered a whole row of houses burned, your closest brother’s among them. You had barely opened your mouth when a Capo set a gilded knife on the table.\n“Were you about to question a Sottocapo? Do it yourself, or I shoot your whole crew.”',
    choices: [
      {
        labelVi: 'Cầm dao, tự rạch má mình, và cúi đầu đúng phép',
        labelEn: 'Take the knife, cut your own cheek, and bow exactly as required',
        resultVi: 'Máu nhỏ xuống sàn gỗ trong khi bạn cúi đầu. Sottocapo vỗ tay. "Lễ nghi hoàn hảo." Ông ta thăng bạn lên Capo ngay tại chỗ. Dãy nhà vẫn bị đốt đêm đó.',
        resultEn: 'Blood dripped on the floorboards while you bowed. The Sottocapo applauded. “Perfect manners.” He made you a Capo on the spot. The houses still burned that night.',
        setFinger: 'Thumb',
        setFingerRank: 2,
        recordsAdd: ['thumb_underboss'],
        effects: { health: -34, sanity: -18, rep: +28, wealth: +26, resonance: +18 },
        scarsAdd: ['Vết rạch trên má'],
        meritAdd: 28
      },
      {
        labelVi: 'Chộp con dao trước Capo',
        labelEn: 'Grab the knife before the Capo does',
        resultVi: 'Bạn giết Capo và hai người gác cửa, rồi nhảy qua cửa sổ giữa tiếng súng. Dãy nhà được cứu. Từ đêm đó, The Thumb treo thưởng cho cái đầu của bạn.',
        resultEn: 'You killed the Capo and the two at the door, then went out the window under fire. The houses were saved. From that night, the Thumb put a price on your head.',
        effects: { health: -42, sanity: -10, rep: +20, heat: +45, resonance: +22 },
        scarsAdd: ['Kẻ phản bội của The Thumb'],
        meritAdd: 18
      }
    ]
  },
  {
    id: 'syn_ring_maestro_gallery',
    age: [21, 52],
    major: true,
    weight: 8.5,
    jobs: ['Syndicate'],
    vi: '[Buổi chấm điểm của The Ring] Kỳ xét lên Maestro đã đến. Chất liệu của bạn là một Fixer còn sống, bị đóng vào khung. Các Docent cầm bảng điểm chờ.\nTác phẩm dưới điểm B thì chính tác giả sẽ trở thành chất liệu cho buổi hòa nhạc tối nay.',
    en: '[The Ring’s grading] The Maestro examination has come. Your material is a living Fixer, fixed to a frame. The Docents wait with their scorecards.\nA work below a B and its artist becomes the material for tonight’s concert.',
    choices: [
      {
        labelVi: 'Làm tác phẩm mà họ muốn thấy',
        labelEn: 'Make the work they want to see',
        resultVi: 'Bạn làm việc suốt bốn tiếng. Bạn cố không nghe những âm thanh từ khung tranh. Khi xong, các Docent đứng dậy vỗ tay. "A cộng." Bạn là Maestro. Bạn không ngủ được một tuần.',
        resultEn: 'You worked for four hours. You tried not to hear the sounds from the frame. When you were done, the Docents stood and applauded. “A plus.” You are a Maestro. You did not sleep for a week.',
        setFinger: 'Ring',
        setFingerRank: 2,
        recordsAdd: ['ring_maestro'],
        effects: { sanity: -32, rep: +34, wealth: +32, resonance: +30 },
        scarsAdd: ['Tác phẩm được điểm A cộng'],
        meritAdd: 34
      },
      {
        labelVi: 'Dùng da thịt của chính mình thay cho chất liệu',
        labelEn: 'Use your own flesh in place of the material',
        resultVi: 'Các Docent im lặng một lúc lâu. Rồi họ cho bạn qua, và cởi trói người Fixer trên khung, vì "tác phẩm đã đủ". Bạn mất phần da trên cả cánh tay trái.',
        resultEn: 'The Docents were silent a long while. Then they passed you, and untied the Fixer on the frame, because “the work is complete.” You lost the skin of your whole left forearm.',
        setFinger: 'Ring',
        setFingerRank: 1,
        effects: { health: -30, sanity: -24, rep: +22, wealth: +20, resonance: +24 },
        scarsAdd: ['Cánh tay không còn da'],
        meritAdd: 22
      }
    ]
  },
  {
    id: 'syn_kurokumo_blade_lineage_showdown',
    age: [20, 48],
    major: true,
    weight: 8.5,
    jobs: ['Fixer', 'Syndicate'],
    vi: '[To Claim Their Bones] Cuộc chiến giữa Kurokumo Clan và Blade Lineage đã lan đến con phố của bạn. Mưa rửa máu chảy xuống cống. Một kiếm sĩ của Blade Lineage chĩa thanh katana về phía bạn.\n"Cho ta thịt của ngươi. Ta lấy xương."',
    en: '[To Claim Their Bones] The war between the Kurokumo Clan and the Blade Lineage has reached your street. Rain washes the blood into the drains. A Blade Lineage swordsman points his katana at you.\n“Yield me your flesh. I will claim your bones.”',
    choices: [
      {
        labelVi: 'Để lưỡi kiếm của hắn cắm vào vai bạn, giữ chặt nó lại, rồi chém',
        labelEn: 'Let his blade bite into your shoulder, trap it there, and cut',
        outcomes: [
          {
            w: 62,
            resultVi: 'Lưỡi kiếm của hắn làm gãy xương đòn của bạn. Lưỡi của bạn đi hết đường của nó. Hắn ngã xuống vũng nước, và bạn đứng đó, thở, cho đến khi mưa tạnh.',
            resultEn: 'His blade broke your collarbone. Yours went all the way. He fell into the puddle, and you stood there breathing until the rain stopped.',
            effects: { health: -34, sanity: -10, rep: +30, wealth: +24, resonance: +24 },
            recordsAdd: ['claim_their_bones'],
            scarsAdd: ['Xương đòn đổi lấy xương hắn'],
            meritAdd: 32
          },
          {
            w: 38,
            resultVi: 'Hắn rút kiếm nhanh hơn bạn giữ. Nhát thứ hai mở ngực bạn ra. Bạn giữ chặt vết thương bằng một tay và lăn xuống cống.',
            resultEn: 'He pulled free faster than you could hold. The second cut opened your chest. You held the wound shut with one hand and rolled into the drain.',
            effects: { health: -56, sanity: -26, resonance: +30 },
            scarsAdd: ['Vết chém mở ngực']
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------ the Wings
  {
    id: 'wing_warp_train_cleanup',
    age: [19, 50],
    major: true,
    weight: 9,
    vi: '[Toa cuối của WARP Train] Chuyến tàu mất mười giây. Với những người ở toa cuối, nó dài hai nghìn năm. Khi cửa mở, không còn ai đứng như người nữa. Hai trăm hành khách đã khâu mình vào nhau thành một khối trên trần toa, và họ vẫn đang nói:\n"Đừng đi. Ở lại với chúng tôi."',
    en: '[The last car of the WARP Train] The trip took ten seconds. For those in the last car it took two thousand years. When the doors opened, no one stood like a person anymore. Two hundred passengers had sewn themselves together into one mass on the ceiling, and they were still talking:\n“Don’t go. Stay with us.”',
    choices: [
      {
        labelVi: 'Làm việc của một Cleanup Agent: cắt họ ra, đặt lại vào ghế',
        labelEn: 'Do a Cleanup Agent’s job: cut them apart, put them back in their seats',
        resultVi: 'Mất bốn tiếng. Khi W Corp bật công tắc phục hồi, từng hành khách đứng dậy, chỉnh lại áo, và bước xuống sân ga như chưa có gì. Chỉ bạn là nhớ.',
        resultEn: 'It took four hours. When W Corp flipped the restoration switch, each passenger stood, straightened their coat, and stepped onto the platform as if nothing had happened. Only you remember.',
        effects: { sanity: -34, wealth: +30, rep: +18, resonance: +32 },
        recordsAdd: ['warp_cleanup'],
        scarsAdd: ['Hai nghìn năm trong toa cuối'],
        meritAdd: 24
      },
      {
        labelVi: 'Giữ lại một mẩu thịt còn sống để bán ra chợ đen',
        labelEn: 'Keep a piece that is still alive to sell on the black market',
        resultVi: 'Mẩu thịt trong lọ thủy tinh vẫn cử động, và người mua trả cho nó một gia tài. Nhưng đây là Taboo, và giờ thì có những con mắt đang tìm bạn.',
        resultEn: 'The piece in the glass jar still moved, and the buyer paid a fortune for it. But this is a Taboo, and now there are eyes looking for you.',
        effects: { wealth: +48, sanity: -26, taboo: +2, heat: +25, resonance: +24 },
        recordsAdd: ['warp_cleanup'],
        scarsAdd: ['Cái lọ thủy tinh']
      }
    ]
  },
  {
    id: 'wing_rcorp_hatchery_royale',
    age: [20, 46],
    major: true,
    weight: 8.5,
    vi: '[The Hatchery] Để được vào Fourth Pack của R Corp, bạn bị nhốt trong Hatchery cùng 3.999 bản sao của chính bạn: cùng khuôn mặt, cùng giọng nói, cùng ký ức. Bảy ngày, không có thức ăn. Chỉ một người được ra.',
    en: '[The Hatchery] To join R Corp’s Fourth Pack, you were locked in the Hatchery with 3,999 copies of yourself: the same face, the same voice, the same memories. Seven days, no food. Only one walks out.',
    choices: [
      {
        labelVi: 'Sống sót, bằng mọi cách',
        labelEn: 'Survive, whatever it takes',
        outcomes: [
          {
            w: 58,
            resultVi: 'Đến ngày thứ bảy, bạn bước ra trên những khuôn mặt của chính mình. R Corp trao cho bạn bộ giáp của Fourth Pack. Từ đó, mỗi lần soi gương, bạn đều tự hỏi mình là bản sao thứ mấy.',
            resultEn: 'On the seventh day you walked out over your own faces. R Corp gave you Fourth Pack armor. Since then, every time you look in a mirror you wonder which copy you are.',
            effects: { health: +15, sanity: -38, rep: +32, wealth: +28, resonance: +35 },
            recordsAdd: ['rcorp_hatchery'],
            scarsAdd: ['3.999 khuôn mặt của bạn'],
            meritAdd: 36
          },
          {
            w: 42,
            resultVi: 'Bản sao cuối cùng đánh như bạn, nghĩ như bạn, và gần như thắng. Nó lấy đi một bên tai và đâm thủng phổi bạn. Bạn bò ra ngoài, không chắc người bò ra có phải là bạn không.',
            resultEn: 'The last copy fought like you, thought like you, and nearly won. It took one of your ears and punctured your lung. You crawled out, not sure the one crawling was you.',
            effects: { health: -48, sanity: -42, rep: +20, resonance: +38 },
            recordsAdd: ['rcorp_hatchery'],
            scarsAdd: ['Bản sao cuối cùng'],
            meritAdd: 24
          }
        ]
      }
    ]
  },
  {
    id: 'wing_kcorp_tearful_thing',
    age: [20, 52],
    major: true,
    weight: 8,
    vi: '[Thứ biết khóc của K Corp] Sâu trong cơ sở của K Corp, bạn thấy HP Ampoule được làm từ đâu: một con mắt khổng lồ bị xích, bị buộc phải xem cảnh người ta đau đớn trên màn hình để nó khóc. Nước mắt của nó chữa lành mọi thứ.\nĐồng nghiệp đi cùng bạn giơ máy ghi hình lên. Lính gác bắn anh ta bằng một viên Decay Ampoule.',
    en: '[K Corp’s weeping thing] Deep inside a K Corp facility, you saw what HP Ampoules are made from: a giant chained eye, made to watch people suffer on screens so it will cry. Its tears heal anything.\nThe colleague with you raised a recorder. A guard shot him with a Decay Ampoule.',
    choices: [
      {
        labelVi: 'Đứng yên, im lặng, và nhận phần thưởng giữ bí mật',
        labelEn: 'Stand still, stay silent, and accept the reward for keeping quiet',
        resultVi: 'Ba giây sau, đồng nghiệp của bạn chỉ còn là một vũng xanh trên sàn. Bạn bước qua vũng đó để nhận chức trưởng ca an ninh, kèm một hộp HP Ampoule loại thật.',
        resultEn: 'Three seconds later your colleague was a green puddle on the floor. You stepped over it to accept a post as security shift lead, with a box of the real HP Ampoules.',
        flagsAdd: ['KCorpAmpoule'],
        recordsAdd: ['kcorp_tearful'],
        effects: { health: +25, wealth: +28, sanity: -26, resonance: +22 },
        scarsAdd: ['Vũng xanh trên sàn'],
        meritAdd: 22
      },
      {
        labelVi: 'Tiêm năm ống ampoule một lúc và phá đường thoát ra',
        labelEn: 'Inject five ampoules at once and break your way out',
        resultVi: 'Cơ thể bạn lành lại nhanh hơn đạn bắn vào nó, và tiếp tục mọc thêm sau khi không còn vết thương nào để lành. Bạn thoát ra. Những khối u trên lưng bạn thì ở lại mãi.',
        resultEn: 'Your body healed faster than bullets could hit it, and kept growing after there was nothing left to heal. You got out. The growths on your back stayed.',
        flagsAdd: ['KCorpAmpoule'],
        recordsAdd: ['kcorp_tearful'],
        effects: { health: -20, sanity: -30, rep: +24, heat: +30, resonance: +28 },
        scarsAdd: ['Những khối u của K Corp'],
        meritAdd: 25
      }
    ]
  },
  {
    id: 'wing_ncorp_inquisition',
    age: [20, 50],
    major: true,
    weight: 8,
    vi: '[Nagel und Hammer] Đoàn Inquisitor của N Corp đi qua khu phố của bạn, hát thánh ca. Họ trói những người có chân tay giả vào cọc, kể cả một đứa trẻ mồ côi mang mắt nhân tạo, và đóng đinh vào họ để "trả lại sự thuần khiết cho thịt người".',
    en: '[Nagel und Hammer] N Corp’s Inquisitors marched through your neighborhood singing hymns. They bound anyone with prosthetics to stakes, an orphan with an artificial eye among them, and drove nails into them to “return purity to human flesh.”',
    choices: [
      {
        labelVi: 'Lao vào, nhắm vào Großhammer dẫn đầu',
        labelEn: 'Charge in and go for the Großhammer leading them',
        resultVi: 'Chiếc búa của hắn sượt qua sườn bạn và bạn ho ra máu. Nhưng lưỡi của bạn tìm được khe hở trên mũ giáp. Khi hắn ngã, những Inquisitor còn lại rút lui, và bạn cắt dây cho đứa trẻ.',
        resultEn: 'His hammer grazed your ribs and you coughed blood. But your blade found the gap in his helm. When he fell the rest of the Inquisitors withdrew, and you cut the child loose.',
        effects: { health: -32, sanity: +8, rep: +26, network: +18, resonance: +18 },
        scarsAdd: ['Vết búa của Nagel und Hammer'],
        meritAdd: 26
      },
      {
        labelVi: 'Mặc giáp trắng, cầm búa, và nhận tiền thưởng của N Corp',
        labelEn: 'Put on the white armor, take a hammer, and collect N Corp’s bounty',
        resultVi: 'N Corp trả theo đầu người. Đến cuối ngày, bộ giáp trắng của bạn không còn trắng nữa, và túi bạn nặng hơn bao giờ hết.',
        resultEn: 'N Corp pays by the head. By the end of the day your white armor was no longer white, and your purse was heavier than ever.',
        effects: { wealth: +34, sanity: -30, rep: +14, heat: +20, resonance: +26 },
        scarsAdd: ['Bộ giáp không còn trắng'],
        meritAdd: 20
      }
    ]
  },

  // ------------------------------------------------------------------ home
  {
    id: 'life_marriage_bond',
    age: [21, 42],
    major: true,
    weight: 8,
    forbids: ['Married'],
    vi: '[Một mái nhà cho hai người] Có một người khiến bàn tay bạn thôi run sau mỗi đêm làm việc. Hai người tính chuyện ở chung, dù cả hai đều biết ở The City, người mình thương là thứ đầu tiên kẻ thù sẽ nhắm tới.',
    en: '[A roof for two] There is someone who makes your hands stop shaking after a night’s work. The two of you talk of living together, though you both know that in the City, the one you love is the first thing your enemies will aim for.',
    choices: [
      {
        labelVi: 'Cưới',
        labelEn: 'Marry',
        resultVi: 'Không có tiệc. Chỉ có hai chiếc nhẫn rẻ tiền và một bữa tối ở quán mì quen. Đêm đó còi báo động vang ở xa, và lần đầu tiên bạn không để ý đến nó.',
        resultEn: 'No party. Just two cheap rings and dinner at the usual noodle shop. Sirens sounded far off that night, and for the first time you didn’t notice.',
        flagsAdd: ['Married'],
        recordsAdd: ['family_built'],
        npcAdd: { role: 'spouse', bond: 90 },
        effects: { sanity: +20, wealth: -10, network: +10 }
      },
      {
        labelVi: 'Rời đi trước khi quá muộn',
        labelEn: 'Leave before it is too late',
        resultVi: 'Bạn nói những lời tàn nhẫn nhất có thể, để người ấy không tìm bạn nữa. Có hiệu quả. Không ai có thể dùng người thân để uy hiếp bạn, vì bạn không còn ai.',
        resultEn: 'You said the cruelest things you could, so they would stop looking for you. It worked. No one can threaten you through someone you love, because there is no one.',
        effects: { sanity: -12, rep: +8, resonance: +12 },
        scarsAdd: ['Người bạn đã bỏ lại']
      }
    ]
  },
  {
    id: 'life_childbirth_heir',
    age: [23, 48],
    major: true,
    weight: 10,
    requires: ['Married'],
    forbids: ['HasChild'],
    vi: '[Đêm đứa trẻ chào đời] Đêm {spouse} sinh con, trời mưa to. Đứa bé vừa cất tiếng khóc thì cửa dưới nhà bị phá. Những kẻ bạn từng đắc tội đã chờ đúng đêm bạn yếu nhất.',
    en: '[The night of the birth] The night {spouse} gave birth, it rained hard. The baby had just cried for the first time when the door downstairs was broken in. The people you had wronged had waited for the night you were weakest.',
    choices: [
      {
        labelVi: 'Đứng chặn ở cửa phòng',
        labelEn: 'Stand in the doorway',
        resultVi: 'Không ai bước qua được cánh cửa. Khi xong, bạn bế con bằng đôi tay còn chưa kịp rửa. Đứa bé ngừng khóc khi nghe tiếng tim bạn.',
        resultEn: 'No one got past the door. When it was over you held your child in hands you hadn’t had time to wash. The baby stopped crying at the sound of your heartbeat.',
        flagsAdd: ['HasChild'],
        npcAdd: { role: 'child', bond: 95 },
        effects: { health: -34, sanity: +14, wealth: -12, resonance: +20 },
        scarsAdd: ['Đêm đứng chặn ở cửa'],
        meritAdd: 20
      }
    ]
  },
  {
    id: 'life_black_silence_tragedy',
    age: [25, 55],
    major: true,
    weight: 7.5,
    requires: ['Married'],
    forbids: ['WidowedRampage'],
    vi: '[Ngôi nhà im lặng] Bạn về nhà sau một chuyến đi dài. Cửa mở. Bên trong, mọi thứ bị lật tung, và {spouse} nằm trên sàn bếp, mắt vẫn mở, nhìn về phía cửa, như đang chờ bạn về.',
    en: '[The silent house] You came home from a long job. The door was open. Inside, everything had been torn apart, and {spouse} lay on the kitchen floor, eyes still open, facing the door, as if waiting for you.',
    choices: [
      {
        labelVi: 'Tìm ra từng kẻ có liên quan',
        labelEn: 'Find every one of them',
        resultVi: 'Ba tháng. Bạn không nói với ai một lời. Mười bốn tổ chức, từ Backstreets đến cổng Nest, biến mất. Người ta bắt đầu gọi bạn bằng một cái tên khác, và ở đâu đó rất gần, bạn nghe thấy tiếng piano.',
        resultEn: 'Three months. You did not say a word to anyone. Fourteen organizations, from the Backstreets to the Nest gates, ceased to exist. People started calling you by another name, and somewhere very close, you heard a piano.',
        flagsAdd: ['WidowedRampage'],
        npcFate: { spouse: 'dead' },
        effects: { health: -35, sanity: -48, rep: +38, heat: +45, resonance: +45 },
        scarsAdd: ['Sàn bếp đêm ấy'],
        meritAdd: 42
      }
    ]
  },
  {
    id: 'life_prosthetic_replacement',
    age: [22, 60],
    major: true,
    weight: 7,
    forbids: ['FullBodyProsthetic'],
    vi: '[Một cơ thể mới] Sau từng ấy năm, cơ thể bạn không còn chịu nổi nữa. Bác sĩ ở phòng khám chợ đen nói thẳng: muốn sống tiếp, phải thay gần như toàn bộ. Bộ não của bạn sẽ được đặt vào một khung Full-Body Prosthetic.',
    en: '[A new body] After all these years your body cannot take any more. The back-alley doctor is blunt: to keep living, almost all of it must be replaced. Your brain would go into a Full-Body Prosthetic frame.',
    choices: [
      {
        labelVi: 'Nằm lên bàn mổ',
        labelEn: 'Lie down on the table',
        resultVi: 'Ca mổ kéo dài sáu tiếng. Khi tỉnh dậy, bạn mạnh hơn bao giờ hết, và không còn cảm nhận được hơi ấm của bàn tay mình hay vị của thức ăn.',
        resultEn: 'The operation took six hours. When you woke you were stronger than ever, and could no longer feel the warmth of your own hands or taste food.',
        flagsAdd: ['FullBodyProsthetic', '고급장비'],
        effects: { health: +35, sanity: -26, wealth: -25, rep: +14, resonance: +22 },
        scarsAdd: ['Cơ thể không còn là của mình'],
        meritAdd: 18
      },
      {
        labelVi: 'Giữ lại cơ thể này, dù phải sống bằng thuốc giảm đau',
        labelEn: 'Keep this body, even if you live on painkillers',
        resultVi: 'Mỗi hơi thở đều đau. Nhưng khi bạn cắt vào tay mình, máu chảy ra vẫn đỏ, vẫn ấm.',
        resultEn: 'Every breath hurts. But when you cut your hand, the blood that comes out is still red, still warm.',
        effects: { health: -12, sanity: +6, wealth: -12 }
      }
    ]
  }
];
