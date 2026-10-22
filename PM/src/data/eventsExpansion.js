// Major events for the places, people and stages of life that had none: nine Districts,
// the Distortion, four relationships, old age and two careers. Time stops for each of them.
// Anything about a person requires that person to be alive (need.npc); an outcome that ends
// a relationship goes through npcFate so the flags follow.

export const EXPANSION_EVENTS = [
  // ------------------------------------------------------------ District 4
  {
    id: 'ev4_d_ninth_floor',
    age: [22, 70],
    major: true,
    weight: 9,
    regions: ['D'],
    vi: '[Tầng hầm thứ chín] Đội trưởng khu quận D triệu tập những người đủ sức khỏe xuống tầng hầm thứ chín của chi nhánh L Corp cũ. Dây leo phát sáng ở đó đã mọc xuyên qua cả những cánh cửa hàn kín, và cần người cắt chúng trước khi chúng chạm đến móng nhà.',
    en: '[The Ninth Cellar] The captain of District 4 summons everyone fit enough to go down to the ninth cellar of the old L Corp branch. The glowing vines there have grown through doors that were welded shut, and someone must cut them back before they reach the foundations.',
    choices: [
      {
        labelVi: 'Xuống cùng đội cắt dây leo',
        labelEn: 'Go down with the cutting crew',
        outcomes: [
          {
            w: 60,
            effects: { health: -8, wealth: 8, rep: 4, network: 4 },
            resultVi: 'Bạn cắt suốt cả ca, nhựa xanh chảy lên găng tay rồi thấm qua lớp vải. Cuối ca, người đội trưởng đếm đầu người hai lần, và con số lần nào cũng đúng.',
            resultEn: 'You cut for the whole shift, green sap running over your gloves and soaking through the cloth. At the end the captain counts heads twice, and the figure is right both times.'
          },
          {
            w: 40,
            effects: { health: -20, sanity: -8, resonance: 6, wealth: 5 },
            scarsAdd: ['Dấu rễ quanh cổ chân'],
            resultVi: 'Một sợi dây leo quấn lấy cổ chân bạn và kéo xuống rất chậm, như đang lịch sự. Hai người cắt đứt nó trước khi nó kéo đến đầu gối, và để lại một vòng dấu xanh không phai.',
            resultEn: 'A vine wraps your ankle and pulls downward very slowly, as if politely. Two others cut it before it reaches your knee, leaving a green ring that does not fade.'
          }
        ]
      },
      {
        labelVi: 'Nhận tiền công nhưng chỉ đứng canh trên mặt đất',
        labelEn: 'Take the pay but only keep watch above ground',
        effects: { wealth: 4, rep: -2, sanity: -2 },
        resultVi: 'Bạn đứng ở miệng giếng cả ca và đếm những người đi xuống, rồi đếm những người đi lên. Hai con số khớp nhau, và bạn vẫn không dám rời mắt khỏi cầu thang.',
        resultEn: 'You stand at the head of the shaft all shift counting those who go down, then those who come up. The two numbers match, and still you cannot look away from the stairs.'
      },
      {
        labelVi: 'Từ chối và khuyên niêm phong hẳn tầng đó',
        labelEn: 'Refuse and urge them to seal the floor for good',
        effects: { rep: 2, network: -2, sanity: 1 },
        resultVi: 'Đội trưởng nghe bạn đến hết câu, rồi bảo ông đã niêm phong ba lần và lần nào cũng có người mở lại. Ông không hỏi người đó là ai.',
        resultEn: 'The captain hears you out, then says he has sealed it three times and each time someone has opened it again. He does not ask who.'
      }
    ]
  },

  // ------------------------------------------------------------ District 6
  {
    id: 'ev4_f_vault_commission',
    age: [22, 70],
    major: true,
    weight: 9,
    regions: ['F'],
    vi: '[Chiếc két của người đã chết] Một chủ tiệm cầm đồ ở quận F thuê bạn mở một chiếc két mà chủ của nó đã chết ba năm trước, không để lại chìa lẫn người thừa kế. Ông hứa chia cho bạn một phần, nếu bên trong có gì đáng chia.',
    en: '[The Dead Man’s Safe] A pawnbroker in District 6 hires you to open a safe whose owner died three years ago, leaving neither key nor heir. He promises you a share, if there is anything inside worth sharing.',
    choices: [
      {
        labelVi: 'Mở két cho ông ta',
        labelEn: 'Open it for him',
        outcomes: [
          {
            w: 55,
            effects: { wealth: 14, heat: 4, rep: 1 },
            resultVi: 'Bên trong là một xấp giấy nợ cũ và một cuộn tiền nhỏ. Ông chủ tiệm đếm phần của bạn rất chậm, như để bạn thấy ông không gian lận, và bạn thấy chính vì thế mà ông đã gian lận.',
            resultEn: 'Inside are a stack of old IOUs and a small roll of cash. The pawnbroker counts out your share very slowly, so you can see he is not cheating, and you realise that is exactly how you know he is.'
          },
          {
            w: 45,
            effects: { sanity: -6, resonance: 5, wealth: 3 },
            mem: 'f_empty_safe',
            resultVi: 'Chiếc két trống, nhưng thành trong được khắc đầy tên người, mỗi tên bị gạch một nét. Dòng cuối cùng chưa bị gạch, và nó viết tên bạn.',
            resultEn: 'The safe is empty, but its walls are carved with names, each struck through. The last line is not struck out, and it spells your name.'
          }
        ]
      },
      {
        labelVi: 'Đòi tìm người thừa kế trước khi mở',
        labelEn: 'Insist on finding an heir before opening it',
        effects: { rep: 3, wealth: -2, network: 2 },
        resultVi: 'Ông chủ tiệm gắt lên rồi nguôi dần. Ba tuần sau, một người thừa kế thật sự xuất hiện, và nhận chiếc két mà không cảm ơn ai.',
        resultEn: 'The pawnbroker snaps, then calms. Three weeks later a real heir turns up and takes the safe without thanking anyone.'
      },
      {
        labelVi: 'Từ chối và bảo ông ta để két yên',
        labelEn: 'Refuse and tell him to leave the safe alone',
        effects: { sanity: 1, network: -1 },
        resultVi: 'Ông ta tìm người khác, và bạn nghe tin người đó mở xong một tuần sau. Không ai nói trong két có gì, và người thợ không còn làm nghề này nữa.',
        resultEn: 'He finds someone else, and a week later you hear it was opened. No one says what was inside, and the locksmith no longer works the trade.'
      }
    ]
  },

  // ------------------------------------------------------------ District 9
  {
    id: 'ev4_i_silent_concert',
    age: [20, 70],
    major: true,
    weight: 8,
    regions: ['I'],
    vi: '[Buổi hòa nhạc không nhạc cụ] Hội đồng khu phố nhạc tổ chức một buổi hòa nhạc không nhạc cụ nhân ngày giỗ của bản nhạc kia. Mỗi người đến ngồi im và đếm nhịp bằng hơi thở, và người ta bảo bạn nên có mặt.',
    en: '[The Concert Without Instruments] The District 9 council holds a concert without instruments on the anniversary of that song. Everyone attending sits still and counts the beat with their breath, and you are told you should be there.',
    choices: [
      {
        labelVi: 'Ngồi vào hàng và đếm nhịp cùng mọi người',
        labelEn: 'Take a seat and count the beat with everyone',
        outcomes: [
          {
            w: 75,
            effects: { sanity: 4, rep: 2, resonance: -3, network: 2 },
            resultVi: 'Ba trăm người thở cùng một nhịp suốt một giờ. Khi nhịp cuối cùng tắt, không ai vỗ tay, và bạn thấy người bên cạnh lau mắt bằng mu bàn tay.',
            resultEn: 'Three hundred people breathe to the same beat for an hour. When the last beat fades no one applauds, and you see the person beside you wipe their eyes with the back of a hand.'
          },
          {
            w: 25,
            effects: { sanity: -8, resonance: 9 },
            resultVi: 'Ở nhịp thứ bốn trăm bạn nghe thấy một nốt thừa, rất nhỏ, không phải do hơi thở của ai. Bạn là người duy nhất quay đầu lại, và nốt ấy dừng ngay khi bạn làm vậy.',
            resultEn: 'At the four hundredth beat you hear an extra note, very small, made by no one’s breath. You are the only one to turn your head, and the note stops the moment you do.'
          }
        ]
      },
      {
        labelVi: 'Ngân nốt cuối của bản nhạc cho đến hết',
        labelEn: 'Hum the final note of the song through to its end',
        outcomes: [
          {
            w: 30,
            effects: { resonance: 12, sanity: -10, health: -10 },
            scarsAdd: ['Nốt nhạc không có điểm dừng'],
            resultVi: 'Cả khán phòng quay đầu, rồi cả khán phòng cùng đứng dậy, rất chậm. Người ta kéo bạn ra khỏi chỗ ngồi trước khi âm thanh kịp lan sang người khác.',
            resultEn: 'The whole hall turns its head, then the whole hall rises together, very slowly. You are pulled from your seat before the sound can spread to anyone else.'
          },
          {
            w: 70,
            effects: { sanity: -4, resonance: 5, rep: -3, network: -3 },
            resultVi: 'Bạn chỉ ngân được ba nhịp trước khi một bàn tay đặt lên vai bạn. Người ấy không giận, chỉ nói rất khẽ rằng đừng làm lại điều đó ở bất cứ đâu trong khu này.',
            resultEn: 'You manage only three beats before a hand rests on your shoulder. The owner is not angry, only says very quietly not to do that again anywhere in this District.'
          }
        ]
      },
      {
        labelVi: 'Đứng ở cửa nhìn vào và không bước qua',
        labelEn: 'Stand in the doorway and do not cross it',
        effects: { sanity: -1, rep: -1 },
        resultVi: 'Bạn nhìn họ thở cùng nhau từ ngoài ngưỡng cửa. Khi buổi hòa nhạc kết thúc, một cụ già đi ngang bạn và nói rằng thế cũng là một cách tham dự.',
        resultEn: 'You watch them breathe together from beyond the threshold. When the concert ends, an old woman walks past and tells you that, too, is a way of attending.'
      }
    ]
  },

  // ------------------------------------------------------------ District 17
  {
    id: 'ev4_q_curse_witness',
    age: [22, 70],
    major: true,
    weight: 8,
    regions: ['Q'],
    vi: '[Lá bùa trên cánh tay người chết] Người ta tìm thấy một lá bùa nguyền dán trên cánh tay một người hàng xóm đã mất. Người của Q Corp mời bạn đứng làm chứng rằng lá bùa không phải do bạn dán, và họ hỏi rất nhẹ nhàng.',
    en: '[A Talisman on a Dead Arm] A curse talisman is found stuck to the arm of a dead neighbour. Q Corp’s people invite you to testify that you did not place it, and they ask very gently.',
    choices: [
      {
        labelVi: 'Làm chứng đúng sự thật',
        labelEn: 'Testify truthfully',
        outcomes: [
          {
            w: 70,
            effects: { rep: 3, sanity: -1, network: 1 },
            resultVi: 'Họ ghi lời khai và đặt một lá bùa nhỏ vào lòng bàn tay bạn "để chứng minh". Lá bùa nóng lên một lúc rồi nguội, và họ cảm ơn bạn bằng giọng người vừa kiểm tra xong một cỗ máy.',
            resultEn: 'They record your statement and place a small talisman in your palm "as proof". It warms for a moment then cools, and they thank you in the voice of someone who has finished testing a machine.'
          },
          {
            w: 30,
            effects: { sanity: -5, resonance: 4, heat: 4 },
            resultVi: 'Lá bùa trong tay bạn không nguội. Họ nhìn nó, rồi nhìn nhau, và bảo bạn có thể về nhà, nhưng đừng đi xa hơn con phố đầu tiên trong một tuần.',
            resultEn: 'The talisman in your hand does not cool. They look at it, then at each other, and say you may go home, but not farther than the first street for a week.'
          }
        ]
      },
      {
        labelVi: 'Từ chối làm chứng vì không biết gì',
        labelEn: 'Refuse to testify since you know nothing',
        effects: { sanity: -2, rep: -2, heat: 2 },
        resultVi: 'Họ đóng sổ rất nhẹ. Hai ngày sau, một lá bùa dán lên cánh cửa nhà bạn, mực còn chưa khô, và không ai ở phố nhớ đã thấy ai dán.',
        resultEn: 'They close the ledger very softly. Two days later a talisman is stuck on your door, the ink still wet, and no one on the street remembers seeing who put it there.'
      },
      {
        labelVi: 'Nói rằng bạn thấy một người lạ ở gần đó đêm trước',
        labelEn: 'Say you saw a stranger nearby the night before',
        effects: { network: -3, rep: 1, sanity: -2 },
        resultVi: 'Bạn mô tả một người chưa từng tồn tại, và họ ghi lại từng chi tiết. Từ đó bạn thấy mình vô thức nhìn mặt những người lạ trên phố, tự hỏi ai là người bạn vừa bịa ra.',
        resultEn: 'You describe someone who never existed, and they note every detail. From then on you catch yourself studying strangers’ faces on the street, wondering which one you just invented.'
      }
    ]
  },

  // ------------------------------------------------------------ District 22
  {
    id: 'ev4_v_office_merger',
    age: [22, 65],
    major: true,
    weight: 9,
    regions: ['V'],
    jobs: ['Fixer'],
    vi: '[Hai Office một bức tường] Hai Office đối diện nhau ở quận V sắp sáp nhập, và tên bạn nằm trong danh sách những người được giữ lại. Người của bên này gửi bạn một lời mời, người của bên kia gửi một lời nhắc rằng bạn từng nợ họ một việc.',
    en: '[Two Offices, One Wall] Two rival Offices in District 22 are about to merge, and your name is on the list of those they will keep. One side sends you an invitation, the other a reminder that you once owed them a favour.',
    choices: [
      {
        labelVi: 'Nhận lời mời và vào Office mới',
        labelEn: 'Accept the invitation and join the new Office',
        effects: { wealth: 6, rep: 2, network: 3, sanity: -2 },
        meritAdd: 6,
        resultVi: 'Biển hiệu mới được treo cao hơn cả hai biển cũ, và người đầu tiên bạn gặp ở cửa là một người bạn không muốn gặp. Ông ta cười như đã chờ bạn từ lâu.',
        resultEn: 'The new sign is hung higher than both old ones, and the first person you meet at the door is someone you did not want to meet. He smiles as if he has been waiting for you a long time.'
      },
      {
        labelVi: 'Trả món nợ cũ và ở lại Office kia',
        labelEn: 'Settle the old favour and stay with the other Office',
        effects: { rep: 4, network: -2, wealth: -3 },
        meritAdd: 3,
        resultVi: 'Bạn làm việc bên đó cả mùa, và họ nói với bạn thẳng rằng bạn trả nợ ít hơn họ cần nhưng nhiều hơn họ mong. Bạn nhận ra đó là lời khen.',
        resultEn: 'You work for them a whole season, and they tell you plainly that you paid back less than they needed but more than they expected. You realise this is praise.'
      },
      {
        labelVi: 'Rời cả hai và tự lập Office nhỏ',
        labelEn: 'Leave both and start a small Office of your own',
        outcomes: [
          {
            w: 45,
            effects: { wealth: 5, rep: 4, network: 3, health: -3 },
            resultVi: 'Biển hiệu nhỏ của bạn treo giữa hai biển lớn. Tháng đầu chỉ có một người khách, nhưng người đó kể cho ba người nữa.',
            resultEn: 'Your small sign hangs between the two big ones. The first month brings a single client, but that client tells three others.'
          },
          {
            w: 55,
            effects: { wealth: -8, rep: -2, sanity: -3 },
            resultVi: 'Biển của bạn bị che từ tuần thứ hai, và không ai nhận là người đã che. Bạn ngồi trong Office trống và đếm xem còn bao lâu nữa thì tiền thuê hết.',
            resultEn: 'Your sign is covered from the second week, and no one admits to covering it. You sit in an empty Office counting how long the rent will last.'
          }
        ]
      }
    ]
  },

  // ------------------------------------------------------------ District 24
  {
    id: 'ev4_x_deep_shaft',
    age: [22, 60],
    major: true,
    weight: 8,
    regions: ['X'],
    vi: '[Hầm sâu số năm] Hầm sâu số năm mở thêm một tầng, và đội khai thác cần thêm người xuống kiểm tra cột chống. Công cao gấp ba ca thường, và không ai trong đội nói tầng mới sâu bao nhiêu.',
    en: '[Deep Shaft Five] Deep shaft five opens another level, and the mining crew needs more people to go down and inspect the supports. The pay is three times a normal shift, and no one in the crew says how deep the new level is.',
    choices: [
      {
        labelVi: 'Xuống kiểm tra cột chống',
        labelEn: 'Go down and inspect the supports',
        outcomes: [
          {
            w: 70,
            effects: { wealth: 12, health: -6, sanity: -4, network: 2 },
            resultVi: 'Bạn đi bằng đèn của người khác và dựa vào tiếng gõ để biết phía trước. Khi lên mặt đất, không ai hỏi bạn thấy gì, và bạn nhận ra họ đã không muốn nghe.',
            resultEn: 'You walk by someone else’s lamp and rely on tapping to know what lies ahead. At the surface no one asks what you saw, and you realise they did not want to hear.'
          },
          {
            w: 22,
            effects: { health: -22, sanity: -8, resonance: 6, wealth: 8 },
            scarsAdd: ['Tiếng gõ từ phía bên kia vách'],
            resultVi: 'Ở tầng cuối, một vách đá gõ đáp lại tiếng gõ của bạn, đều và đúng nhịp, như một người đứng ngay phía sau. Bạn bò lên với tay trầy xước, và nghe nó gõ theo từng bậc thang.',
            resultEn: 'On the last level a rock wall taps back in answer to yours, steady and in time, like someone standing right behind it. You crawl up with raw hands and hear it tap along each rung.'
          },
          {
            w: 8,
            deathCauseVi: 'Bị chôn trong một vụ sập hầm sâu ở quận X',
            deathCauseEn: 'Buried in a deep shaft collapse in District 24',
            effects: { health: -100 },
            resultVi: 'Cột chống thứ bảy kêu một tiếng ngắn, và hầm tắt đèn. Còi hầm thứ ba kéo một hồi dài, nhưng lần này không ai bước ra.',
            resultEn: 'The seventh support cracks once, short, and the shaft goes dark. The third shaft’s whistle sounds one long note, but this time no one walks out.'
          }
        ]
      },
      {
        labelVi: 'Nhận việc chuẩn bị đèn và dây ở trên mặt đất',
        labelEn: 'Take the job preparing lamps and rope above ground',
        effects: { wealth: 3, rep: 1, sanity: -1 },
        resultVi: 'Bạn buộc từng nút dây và kiểm tra từng đèn, như thể đó là việc cuối cùng bạn có thể làm cho họ. Khi họ lên, bạn đếm đủ số người, và không nói ra mình đã nhẹ nhõm thế nào.',
        resultEn: 'You tie each knot and test each lamp as if it were the last thing you could do for them. When they come up you count the full number, and do not say how relieved you are.'
      },
      {
        labelVi: 'Từ chối vì thấy tầng mới không nên mở',
        labelEn: 'Refuse, believing the new level should not be opened',
        effects: { rep: -2, sanity: 2, network: -2 },
        resultVi: 'Đội trưởng nhìn bạn rất lâu rồi gật. "Có người sẽ đi thay anh," ông nói, và bạn nghe ra ông không nói bằng giọng trách.',
        resultEn: 'The crew chief looks at you a long time and nods. "Someone will go in your place," he says, and you hear that he does not say it in blame.'
      }
    ]
  },

  // ------------------------------------------------------------ District 25
  {
    id: 'ev4_y_coal_march',
    age: [18, 60],
    major: true,
    weight: 9,
    regions: ['Y'],
    vi: '[Cuộc đi bộ đến kho than] Những người tự gọi mình là Yurodiviye kêu gọi một cuộc đi bộ đến cổng kho than của Wing để đòi chia lại than theo số người trong nhà. Hàng xóm gõ cửa từng nhà, và họ hỏi bạn có đi không.',
    en: '[The March to the Coal Depot] People calling themselves Yurodiviye call a march to the gate of the Wing coal depot to demand coal be shared by household size. Neighbours knock on each door, and they ask whether you are coming.',
    choices: [
      {
        labelVi: 'Đi cùng đoàn đến tận cổng',
        labelEn: 'March with them all the way to the gate',
        outcomes: [
          {
            w: 55,
            effects: { rep: 4, network: 4, heat: 6, health: -3 },
            resultVi: 'Đoàn đứng trước cổng ba giờ trong tuyết. Cuối cùng người gác mở cửa kho nhỏ nhất và chia than theo đầu người, rồi ghi tên từng người đứng trong hàng.',
            resultEn: 'The group stands before the gate three hours in the snow. At last the guard opens the smallest store and rations coal by head, writing down the name of each person in the line.'
          },
          {
            w: 45,
            effects: { health: -14, heat: 10, rep: 2, sanity: -4 },
            resultVi: 'Cổng không mở. Người gác thả chó, và đoàn tản ra trong hỗn loạn. Bạn ngã xuống tuyết, và một người lạ kéo bạn dậy mà không nói tên.',
            resultEn: 'The gate does not open. The guards loose dogs, and the group scatters in chaos. You fall in the snow, and a stranger pulls you up without giving a name.'
          }
        ]
      },
      {
        labelVi: 'Mang trà nóng và chăn đến cho đoàn',
        labelEn: 'Bring hot tea and blankets to the marchers',
        effects: { wealth: -3, network: 4, rep: 2, sanity: 1 },
        resultVi: 'Bạn đứng ở cuối đoàn rót trà vào từng chiếc ca đưa ra. Một người già cầm ca nước và cầm cả tay bạn một giây, rồi buông.',
        resultEn: 'You stand at the back of the group pouring tea into each cup held out. An old man takes the cup and your hand together for a second, then lets go.'
      },
      {
        labelVi: 'Ở nhà và giữ lò cho cả dãy',
        labelEn: 'Stay home and tend the stove for the whole row',
        effects: { sanity: 1, network: 1, rep: -1 },
        resultVi: 'Cả buổi bạn thêm than vào lò chung cho những người không đi. Khi đoàn về, không ai nói gì với bạn, nhưng lò vẫn ấm đúng lúc họ cần.',
        resultEn: 'All day you feed the common stove for those who stayed behind. When the marchers return no one says anything to you, but the stove is warm exactly when they need it.'
      }
    ]
  },

  // ------------------------------------------------------------ District 16
  {
    id: 'ev4_p_extra_floor',
    age: [22, 70],
    major: true,
    weight: 8,
    regions: ['P'],
    vi: '[Tầng không ai nhớ đã xây] Tòa nhà bạn ở quận P có thêm một tầng, và không ai nhớ đã xây nó. Nút bấm thang máy của tầng ấy vẫn sáng, và có tiếng bước chân đi lại ở trên đầu bạn mỗi tối.',
    en: '[A Floor No One Remembers Building] The building you live in, in District 16, has gained a floor, and no one remembers building it. Its button in the lift lights up, and footsteps pace overhead each evening.',
    choices: [
      {
        labelVi: 'Bấm nút và lên xem',
        labelEn: 'Press the button and go up to see',
        outcomes: [
          {
            w: 55,
            effects: { sanity: -5, resonance: 5, rep: 1 },
            resultVi: 'Hành lang tầng thêm giống hệt hành lang của bạn, đến cả vết nứt trên tường. Cửa căn hộ cuối hành lang mang số nhà của bạn, và bên dưới có một dải ánh đèn ấm.',
            resultEn: 'The extra floor’s corridor is identical to yours, down to the crack in the wall. The last door bears your own flat number, and beneath it is a strip of warm light.'
          },
          {
            w: 45,
            effects: { sanity: -2, health: -3 },
            resultVi: 'Thang máy dừng giữa hai tầng và đứng im một lúc lâu. Khi cửa mở, bạn đã ở tầng của mình, và nút tầng thêm không còn sáng nữa.',
            resultEn: 'The lift halts between two floors and stands still for a long while. When the door opens you are on your own floor, and the extra button no longer glows.'
          }
        ]
      },
      {
        labelVi: 'Hỏi chủ nhà về tầng thêm',
        labelEn: 'Ask the landlord about the extra floor',
        effects: { sanity: -2, network: 1 },
        resultVi: 'Chủ nhà đáp rằng tầng ấy luôn ở đó và bạn chỉ vừa nhận ra. Ông đưa bạn một tờ hợp đồng mới có thêm một dòng về tiền thuê, và bạn thấy chữ ký của chính mình ở cuối.',
        resultEn: 'The landlord says the floor has always been there and you have only just noticed. He hands you a new lease with an extra rent line, and at the bottom you see your own signature.'
      },
      {
        labelVi: 'Bịt tai và ngủ qua những tiếng bước chân',
        labelEn: 'Plug your ears and sleep through the footsteps',
        effects: { sanity: 1, health: -2 },
        resultVi: 'Bạn ngủ được, và sáng ra cảm thấy được nghỉ ngơi hơn bình thường. Điều đó khiến bạn lo hơn mọi tiếng chân.',
        resultEn: 'You manage to sleep, and wake feeling more rested than usual. That worries you more than any footstep.'
      }
    ]
  },

  // ------------------------------------------------------------ The Outskirts
  {
    id: 'ev4_o_caravan_split',
    age: [18, 60],
    major: true,
    weight: 9,
    regions: ['OUTSKIRTS'],
    vi: '[Đoàn chia làm hai] Sau một cuộc tranh cãi về nước, đoàn người của bạn chia làm hai hướng. Một nhóm đi về phía bức tường, nơi có chợ và có Backstreets. Nhóm kia đi sâu vào Outskirts, nơi có giếng và có những thứ không ai gọi tên.',
    en: '[The Caravan Splits] After an argument over water, your caravan divides in two. One group goes toward the wall, where there are markets and Backstreets. The other goes deeper into the Outskirts, where there are wells and things no one names.',
    choices: [
      {
        labelVi: 'Đi về phía bức tường',
        labelEn: 'Head toward the wall',
        outcomes: [
          {
            w: 60,
            effects: { wealth: 5, rep: 1, health: -4, network: 2 },
            resultVi: 'Ở chợ ven tường, bạn bán số phế liệu đủ để trả chỗ trên một xe hàng. Người đánh xe khai thêm tên bạn vào sổ phụ rồi đưa cả xe qua cổng kiểm. Bạn xuống xe ở Backstreets của District T; đêm ấy, bức tường đã ở sau lưng.',
            resultEn: 'At the wall market you sell enough scrap to pay for a place on a freight cart. The driver adds your name to his manifest and takes the cart through inspection. You climb down in District T’s Backstreets. That night, the wall is behind you.',
            setRegion: 'T',
            flagsAdd: ['EnteredCity']
          },
          {
            w: 40,
            effects: { health: -14, wealth: -4, sanity: -3 },
            resultVi: 'Một toán người lạ chặn đường ở cổng chợ và hỏi giấy phép bạn không có. Bạn mất nửa số đồ mang theo, nhưng giữ được chân.',
            resultEn: 'A group of strangers blocks the road at the market gate and asks for papers you do not have. You lose half of what you carried, but keep your legs.'
          }
        ]
      },
      {
        labelVi: 'Đi sâu vào Outskirts theo nhóm kia',
        labelEn: 'Go deeper into the Outskirts with the other group',
        outcomes: [
          {
            w: 50,
            effects: { sanity: -3, resonance: 4, network: 3, rep: 2 },
            resultVi: 'Giếng ở sâu bên trong có nước, và một dấu chân rất lớn bên cạnh nó. Nhóm uống nước và đi tiếp mà không ai nhắc đến dấu chân ấy.',
            resultEn: 'The well deep inside has water, and a very large footprint beside it. The group drinks and moves on without anyone mentioning the print.'
          },
          {
            w: 38,
            effects: { health: -16, sanity: -6, resonance: 5 },
            scarsAdd: ['Đêm ở giếng không đáy'],
            resultVi: 'Đêm ở giếng, ai đó gọi tên từng người trong nhóm, theo thứ tự họ nằm. Đến sáng, hai chiếc võng trống, và không ai nhắc đến người đã nằm trong đó.',
            resultEn: 'At night by the well someone calls each person’s name, in the order they lie. By morning two hammocks are empty, and no one mentions who lay in them.'
          },
          {
            w: 12,
            deathCauseVi: 'Mất tích sâu trong Outskirts sau một đêm bên giếng',
            deathCauseEn: 'Lost deep in the Outskirts after a night at a well',
            effects: { health: -100 },
            resultVi: 'Bạn là người đi tìm nước cho cả nhóm khi trời còn tối. Họ chờ đến gần trưa, rồi nhổ trại đi tiếp mà không ai nói ra lý do.',
            resultEn: 'You are the one sent to find water for the group while it is still dark. They wait until almost noon, then strike camp and move on without anyone saying why.'
          }
        ]
      },
      {
        labelVi: 'Ở lại một mình bên đống lửa tàn',
        labelEn: 'Stay alone by the dying fire',
        effects: { health: -6, sanity: -3, rep: -1 },
        resultVi: 'Hai nhóm đi khuất vào hai hướng. Bạn nhìn khói từ đống lửa tản dần, rồi tự hỏi vì sao mình lại là người ở lại.',
        resultEn: 'Both groups disappear in opposite directions. You watch the smoke from the fire thin out, then wonder why you are the one who stayed.'
      }
    ]
  },

  // ------------------------------------------------------------ Distortion
  {
    id: 'ev4_dist_hunter_letter',
    age: [20, 80],
    major: true,
    weight: 14,
    jobs: ['Distortion'],
    vi: '[Lá thư không đề tên] Một lá thư không đề tên được luồn qua khe cửa nơi bạn trú. Một Fixer của Hana mời bạn đến gặp, chỉ một mình và ở nơi bạn chọn, và viết rằng họ sẽ không mang vũ khí. Bạn không biết lời ấy đáng tin đến đâu.',
    en: '[The Unsigned Letter] An unsigned letter is slipped under the door of your hiding place. A Hana Fixer invites you to meet alone, at a place of your choosing, and writes that they will not carry a weapon. You do not know how far to trust that.',
    choices: [
      {
        labelVi: 'Hẹn gặp ở một nơi bạn quen thuộc',
        labelEn: 'Agree to meet at a place you know well',
        outcomes: [
          {
            w: 45,
            effects: { heat: -10, network: 3 },
            resultVi: 'Người ấy đến một mình, đúng như viết, và đặt chiếc túi xuống cách bạn mười bước. Họ nói rất ít, chỉ cho bạn biết đội săn bạn sẽ bị rút khỏi khu này trong ba tháng, rồi đi.',
            resultEn: 'The Fixer arrives alone, as written, and sets a bag down ten steps away. They say very little, only that the team hunting you will be withdrawn from this district for three months, and leave.'
          },
          {
            w: 55,
            effects: { health: -20, heat: 8, network: -3 },
            resultVi: 'Người ấy đến một mình, nhưng không phải người duy nhất đến. Bạn thoát ra bằng đường mái nhà, và để lại một mảnh cơ thể của mình trên mái ngói.',
            resultEn: 'The Fixer arrives alone, but is not the only one who arrives. You escape across the rooftops, leaving a piece of yourself on the tiles.'
          }
        ]
      },
      {
        labelVi: 'Bỏ nơi trú và chuyển sang khu khác',
        labelEn: 'Abandon the hideout and move to another district',
        effects: { heat: -4, network: -3, health: -3 },
        resultVi: 'Bạn đi ngay trong đêm, mang theo ít đến mức đáng thương. Sáng ra bạn nghe tiếng giày đều dừng trước cánh cửa bạn vừa rời, rất nhẹ, như tiếng gõ của người lịch sự.',
        resultEn: 'You leave that same night, carrying pitifully little. By morning you hear boots in step stop before the door you just left, very lightly, like the knock of someone polite.'
      },
      {
        labelVi: 'Đốt lá thư và đợi họ tìm đến',
        labelEn: 'Burn the letter and wait for them to find you',
        effects: { heat: 8, resonance: 4, rep: 2, health: -5 },
        resultVi: 'Họ đến vào ngày thứ ba. Bạn nghe tiếng giày từ xa và để họ đứng trước cửa rất lâu, đến khi người dẫn đầu lên tiếng gọi tên cũ của bạn.',
        resultEn: 'They arrive on the third day. You hear boots from afar and let them stand at the door a long while, until their leader calls your old name.'
      }
    ]
  },

  {
    id: 'ev4_dist_old_street',
    age: [20, 80],
    major: true,
    weight: 12,
    jobs: ['Distortion'],
    vi: '[Con phố cũ] Bạn đi trở lại con phố bạn từng sống. Người ta nhận ra bạn, và không ai chạy. Một người bán rau đặt mớ rau xuống và chờ, như thể đang đợi bạn nói trước.',
    en: '[The Old Street] You walk back to the street where you once lived. People recognise you, and no one runs. A vegetable seller sets down a bunch of greens and waits, as if for you to speak first.',
    choices: [
      {
        labelVi: 'Cất tiếng chào',
        labelEn: 'Speak and greet them',
        effects: { network: 4, heat: 3, resonance: -3 },
        resultVi: 'Giọng bạn khản và lạ, nhưng người bán rau gật và nói tên bạn đúng như hồi xưa. Bà lấy từ giỏ một củ cải nhỏ, đặt vào tay bạn mà không nhìn vào mắt.',
        resultEn: 'Your voice is hoarse and strange, but the seller nods and says your name exactly as she used to. She takes a small radish from her basket and puts it into your hand without meeting your eyes.'
      },
      {
        labelVi: 'Đi ngang qua mà không nói gì',
        labelEn: 'Walk past without speaking',
        effects: { heat: 2, network: -1 },
        resultVi: 'Bạn bước qua hết con phố. Phía sau, người ta không thì thầm, và bạn thấy sự im lặng ấy nặng hơn tiếng la hét.',
        resultEn: 'You walk the whole length of the street. Behind you no one whispers, and you find that silence heavier than screaming.'
      },
      {
        labelVi: 'Đứng nhìn căn nhà cũ của bạn từ xa',
        labelEn: 'Stand and look at your old house from a distance',
        outcomes: [
          {
            w: 60,
            effects: { resonance: 2, network: 2 },
            resultVi: 'Cửa sổ nhà bạn có đèn, và một đứa trẻ nhìn ra. Nó vẫy tay, rất nhỏ, rồi bị ai đó kéo vào trong.',
            resultEn: 'There is a light in your old window, and a child looks out. It waves, very slightly, then is pulled inside by someone.'
          },
          {
            w: 40,
            effects: { heat: 10, health: -8 },
            resultVi: 'Một ai đó trong nhà gọi người đến, và tiếng giày xuất hiện ở cuối phố trước khi bạn kịp quay đi. Bạn chạy, và con phố tách ra nhường lối, im lặng.',
            resultEn: 'Someone in the house calls for help, and boots appear at the end of the street before you can turn away. You run, and the street parts to let you pass, in silence.'
          }
        ]
      }
    ]
  },

  {
    id: 'ev4_dist_fading_voice',
    age: [24, 80],
    major: true,
    weight: 10,
    jobs: ['Distortion'],
    vi: '[Giọng nói nhỏ dần] Giọng nói trong đầu bạn đã nhỏ đi qua nhiều tháng, và hôm nay bạn nhận ra mình đang nói thay nó, to tiếng, giữa một con hẻm vắng. Bạn không chắc đó là tự do hay là bị bỏ rơi.',
    en: '[The Fading Voice] The voice in your head has been growing quieter for months, and today you realise you are speaking in its place, aloud, in an empty alley. You cannot tell whether this is freedom or abandonment.',
    choices: [
      {
        labelVi: 'Gọi nó và đợi nó trả lời',
        labelEn: 'Call to it and wait for an answer',
        outcomes: [
          {
            w: 50,
            effects: { resonance: 6, heat: 2 },
            resultVi: 'Nó trả lời, rất nhỏ, bằng đúng giọng của bạn. Nó chỉ nói một câu, và câu ấy không có từ nào về sự cứu rỗi.',
            resultEn: 'It answers, very faintly, in your own voice. It says only one sentence, and that sentence contains no word about salvation.'
          },
          {
            w: 50,
            effects: { resonance: -5, health: -4 },
            resultVi: 'Không có tiếng đáp. Bạn đứng yên một lúc lâu, và nhận ra sự im lặng ấy là thứ bạn đã chờ nhiều năm, và không biết dùng vào việc gì.',
            resultEn: 'There is no reply. You stand still a long while, and realise this silence is something you waited years for, and you do not know what to do with it.'
          }
        ]
      },
      {
        labelVi: 'Nói to một điều bạn chưa bao giờ dám nói',
        labelEn: 'Say aloud something you never dared say',
        effects: { resonance: -3, network: 1, health: -2 },
        resultVi: 'Con hẻm không đáp lại, nhưng một con chim đậu trên mái nhà lệch đầu nhìn bạn. Khi bạn dứt lời, nó bay đi, và bạn thấy nhẹ hơn một chút.',
        resultEn: 'The alley does not answer, but a bird on the roof tilts its head at you. When you finish it flies off, and you feel a little lighter.'
      },
      {
        labelVi: 'Bịt miệng lại và đi tiếp',
        labelEn: 'Cover your mouth and walk on',
        effects: { heat: -1, resonance: 2 },
        resultVi: 'Bạn đi hết hẻm trong im lặng. Ra khỏi hẻm, bạn thấy miệng mình vẫn khẽ động, như đang đọc thuộc một điều gì đó.',
        resultEn: 'You walk out of the alley in silence. Beyond it you notice your mouth is still moving faintly, as if reciting something by heart.'
      }
    ]
  },

  // ------------------------------------------------------------ people
  {
    id: 'ev4_spouse_long_fever',
    age: [25, 70],
    major: true,
    weight: 9,
    need: { npc: 'spouse' },
    vi: '[Cơn sốt tuần thứ ba] Cơn sốt của {spouse} kéo sang tuần thứ ba. Thuốc ở phòng khám đầu phố không còn tác dụng, và bác sĩ nói chỉ còn một cách, đắt hơn mọi thứ bạn đang có.',
    en: '[The Third Week of Fever] {spouse}’s fever runs into its third week. The medicine from the clinic at the head of the street no longer works, and the doctor says only one option remains, dearer than anything you have.',
    choices: [
      {
        labelVi: 'Bán những gì có để trả cho phương pháp đó',
        labelEn: 'Sell what you have to pay for the treatment',
        costAhn: 15,
        outcomes: [
          {
            w: 75,
            effects: { wealth: -15, sanity: 4 },
            bond: { spouse: 8 },
            resultVi: 'Cơn sốt hạ vào đêm thứ ba. {spouse} tỉnh dậy, nhìn quanh căn phòng đã vơi đi vài món đồ, và không hỏi chúng đã đi đâu.',
            resultEn: 'The fever breaks on the third night. {spouse} wakes, looks around the room now missing a few things, and does not ask where they went.'
          },
          {
            w: 25,
            effects: { wealth: -15, sanity: -10 },
            npcFate: { spouse: 'dead' },
            resultVi: 'Cơn sốt hạ vào đêm thứ ba, như đã hứa, nhưng {spouse} không tỉnh lại. Bác sĩ gấp tờ biên lai rất cẩn thận và không nhìn bạn.',
            resultEn: 'The fever breaks on the third night, as promised, but {spouse} does not wake. The doctor folds the receipt very carefully and does not look at you.'
          }
        ]
      },
      {
        labelVi: 'Ngồi bên giường, thay khăn ướt đến khi nó qua đi',
        labelEn: 'Sit by the bed, changing the wet cloth until it passes',
        outcomes: [
          {
            w: 55,
            effects: { health: -6, sanity: 2 },
            bond: { spouse: 10 },
            resultVi: 'Bạn thức mười một đêm, và đêm thứ mười hai {spouse} mở mắt, hỏi bạn có ăn chưa. Bạn bật cười lần đầu tiên sau nhiều ngày.',
            resultEn: 'You stay awake eleven nights, and on the twelfth {spouse} opens their eyes and asks if you have eaten. You laugh for the first time in days.'
          },
          {
            w: 45,
            effects: { health: -8, sanity: -9 },
            npcFate: { spouse: 'dead' },
            resultVi: '{spouse} mất vào buổi sáng ngày thứ mười lăm, trong lúc bạn thay khăn. Khăn còn ướt, và bạn không biết nên vắt nó đi hay giữ nó nguyên như vậy.',
            resultEn: '{spouse} dies on the morning of the fifteenth day, while you are changing the cloth. The cloth is still wet, and you do not know whether to wring it out or keep it as it is.'
          }
        ]
      },
      {
        labelVi: 'Vay tiền Syndicate địa phương để trả',
        labelEn: 'Borrow from the local Syndicate to pay',
        effects: { wealth: 2, heat: 8, sanity: -3 },
        bond: { spouse: 5 },
        resultVi: '{spouse} khỏe lại, và họ hỏi bạn lấy đâu ra tiền. Bạn nói dối, và nhận ra đây là lần đầu bạn nói dối họ.',
        resultEn: '{spouse} recovers, and asks where you found the money. You lie, and realise this is the first time you have lied to them.'
      }
    ]
  },

  {
    id: 'ev4_child_wants_to_leave',
    age: [30, 75],
    major: true,
    weight: 8,
    need: { npc: 'child' },
    vi: '[{child} muốn đi xa] {child} nói với bạn rằng một Wing ở khu xa nhận họ vào làm. Chỗ làm tốt hơn bất cứ thứ gì bạn có thể cho họ ở đây, và họ nói điều đó rất nhỏ, như đang xin lỗi.',
    en: '[{child} Wants to Go Far] {child} tells you that a Wing in a distant District has accepted them for work. The post is better than anything you could give them here, and they say it very quietly, like an apology.',
    choices: [
      {
        labelVi: 'Để {child} đi và giúp chuẩn bị hành lý',
        labelEn: 'Let {child} go and help pack',
        effects: { wealth: -4, sanity: -2, network: 2 },
        bond: { child: 6 },
        resultVi: 'Bạn xếp quần áo vào túi, từng món một, và đặt cuối cùng một chiếc khăn mà {child} không nhớ là của ai. Họ đi vào buổi sáng, và quay lại nhìn một lần ở đầu phố.',
        resultEn: 'You fold clothes into the bag one by one and lay last a scarf that {child} does not remember belonging to anyone. They leave in the morning, and look back once at the head of the street.'
      },
      {
        labelVi: 'Bảo {child} ở lại vì nhà cần họ',
        labelEn: 'Tell {child} to stay because the household needs them',
        outcomes: [
          {
            w: 50,
            effects: { sanity: -2, wealth: 2 },
            bond: { child: -6 },
            resultVi: '{child} ở lại và làm đúng phần việc của mình, mỗi ngày, đúng giờ. Họ thôi nhắc đến Wing ấy, và bạn thôi nghe tiếng cười của họ trong nhà.',
            resultEn: '{child} stays and does their share, every day, on time. They stop mentioning that Wing, and you stop hearing their laughter in the house.'
          },
          {
            w: 50,
            effects: { sanity: -6, rep: -2 },
            npcFate: { child: 'estranged' },
            resultVi: '{child} im lặng một đêm, và sáng ra chiếc giường đã được dọn gọn gàng, không còn gì trong túi vải cũ. Họ để lại một mảnh giấy, và bạn không dám đọc nó.',
            resultEn: '{child} is silent for one night, and in the morning the bed is neatly made, the old cloth bag gone. They leave a note, and you do not dare read it.'
          }
        ]
      },
      {
        labelVi: 'Đi cùng {child} đến nơi làm việc mới',
        labelEn: 'Go with {child} to the new workplace',
        effects: { wealth: -3, health: -2, network: 3, sanity: 2 },
        bond: { child: 9 },
        resultVi: 'Chuyến đi mất ba ngày. Ở cổng Wing, người gác nhìn bạn rồi nhìn {child}, và để cả hai đi qua mà không hỏi thêm. Bạn ngồi một buổi chiều trong phòng chờ rồi về một mình.',
        resultEn: 'The trip takes three days. At the Wing gate the guard looks at you, then at {child}, and lets you both through without asking. You sit an afternoon in the waiting room, then go home alone.'
      }
    ]
  },

  {
    id: 'ev4_mentor_closes_shop',
    age: [28, 80],
    major: true,
    weight: 8,
    need: { npc: 'mentor' },
    vi: '[{mentor} đóng cửa] {mentor} thông báo sẽ đóng cửa nơi ông đã làm việc ba mươi năm. Ông giao lại cho bạn một chiếc chìa khóa, một cuốn sổ ghi tay, và một câu hỏi mà ông không bao giờ dám hỏi người khác.',
    en: '[{mentor} Closes Up] {mentor} announces they will close the place they have worked thirty years. They hand you a key, a handwritten ledger, and a question they never dared ask anyone else.',
    choices: [
      {
        labelVi: 'Nhận cả chìa khóa và cuốn sổ',
        labelEn: 'Accept both the key and the ledger',
        effects: { wealth: -4, network: 4, rep: 2, sanity: -1 },
        bond: { mentor: 8 },
        meritAdd: 4,
        resultVi: 'Chiếc chìa mở một ngăn tủ chưa ai biết, và cuốn sổ ghi tên những người ông đã dạy, theo thứ tự. Tên bạn ở trang cuối, được viết bằng nét chữ tròn hơn mọi tên khác.',
        resultEn: 'The key opens a cabinet no one knew of, and the ledger lists the names of everyone they have taught, in order. Your name is on the last page, written in a rounder hand than any other.'
      },
      {
        labelVi: 'Nhận cuốn sổ, trả lại chìa khóa',
        labelEn: 'Take the ledger and give back the key',
        effects: { network: 2, rep: 1 },
        bond: { mentor: 3 },
        resultVi: '{mentor} nhìn chiếc chìa trong tay bạn, rồi cất lại vào túi, rất chậm. "Một ngày nào đó cậu sẽ cần nó," ông nói, và không nói gì thêm.',
        resultEn: '{mentor} looks at the key in your hand, then slips it back into a pocket, very slowly. "One day you will need it," they say, and add nothing.'
      },
      {
        labelVi: 'Hỏi câu hỏi ông muốn hỏi',
        labelEn: 'Ask the question they wanted to ask',
        outcomes: [
          {
            w: 55,
            effects: { sanity: 3, resonance: -3 },
            bond: { mentor: 10 },
            resultVi: 'Câu hỏi chỉ có một dòng: ông đã dạy đúng chưa. Bạn trả lời lâu hơn mức cần, và ông nghe đến hết, đôi mắt không rời khỏi tay mình.',
            resultEn: 'The question is only one line: did they teach it right. You answer longer than needed, and they listen to the end, eyes never leaving their own hands.'
          },
          {
            w: 45,
            effects: { sanity: -4, resonance: 3 },
            bond: { mentor: 4 },
            resultVi: 'Bạn trả lời thành thật, và ông gật nhiều lần, quá nhiều lần. "Cậu nói đúng," ông bảo, giọng không có một tí nhẹ nhõm nào.',
            resultEn: 'You answer honestly, and they nod many times, too many times. "You are right," they say, in a voice without a trace of relief.'
          }
        ]
      }
    ]
  },

  {
    id: 'ev4_friend_wants_to_leave',
    age: [20, 60],
    major: true,
    weight: 8,
    need: { npc: 'friend' },
    vi: '[{friend} muốn rời khu] {friend} nói với bạn rằng họ muốn rời khu này và không quay lại. Họ đã tiết kiệm được gần đủ tiền, và chỉ còn thiếu một thứ: một người để nói với rằng họ không điên.',
    en: '[{friend} Wants Out] {friend} tells you they want to leave this district and never return. They have nearly saved enough, and need only one more thing: someone to say they are not mad.',
    choices: [
      {
        labelVi: 'Cho {friend} mượn phần tiền còn thiếu',
        labelEn: 'Lend {friend} the money they lack',
        costAhn: 10,
        effects: { wealth: -10, sanity: 2 },
        bond: { friend: 8 },
        resultVi: '{friend} nhận tiền bằng cả hai tay, và nhìn nó thật lâu trước khi cất. Họ không hứa trả, và bạn không hỏi.',
        resultEn: '{friend} takes the money with both hands, and looks at it a long time before putting it away. They do not promise to repay, and you do not ask.'
      },
      {
        labelVi: 'Đi cùng {friend}',
        labelEn: 'Go with {friend}',
        outcomes: [
          {
            w: 55,
            effects: { wealth: -5, sanity: 3, network: -3 },
            bond: { friend: 10 },
            resultVi: 'Hai người đi trên chuyến tàu đầu tiên ra khỏi khu. Ở ga cuối, một người lạ chờ sẵn với tấm biển ghi tên bạn, và bạn không biết ai đã gửi.',
            resultEn: 'You both take the first tram out of the district. At the terminus a stranger is waiting with a sign bearing your name, and you do not know who sent them.'
          },
          {
            w: 45,
            effects: { wealth: -8, health: -5, sanity: -3 },
            bond: { friend: -5 },
            resultVi: 'Chuyến đi mất nhiều hơn dự tính, và hai người cãi nhau về điều gì đó nhỏ. Bạn quay lại sau ba tuần, một mình, và nhìn con phố cũ như nhìn một thứ vừa trả lại.',
            resultEn: 'The trip costs more than planned, and the two of you quarrel over something small. You return after three weeks, alone, and look at the old street as at something just handed back.'
          }
        ]
      },
      {
        labelVi: 'Bảo {friend} ở lại vì bên ngoài không tốt hơn',
        labelEn: 'Tell {friend} to stay because outside is no better',
        effects: { sanity: -2 },
        bond: { friend: -7 },
        resultVi: '{friend} nghe bạn nói hết, gật, và hôm sau không đến chỗ hẹn. Họ vẫn ở đó, bạn nghe nói, nhưng không bao giờ đi cùng đường với bạn nữa.',
        resultEn: '{friend} hears you out, nods, and does not show up at the next meeting. They are still there, you hear, but never again take your road.'
      }
    ]
  },

  // ------------------------------------------------------------ old age
  {
    id: 'ev4_elder_unsent_letters',
    age: [62, 95],
    major: true,
    weight: 9,
    vi: '[Bó thư chưa gửi] Khi dọn một ngăn tủ cũ, bạn tìm thấy một bó thư viết cho nhiều người và chưa bao giờ gửi. Giấy đã ngả vàng, và nét chữ trên đó là nét chữ của một người trẻ hơn bạn nhiều.',
    en: '[The Bundle of Unsent Letters] Clearing out an old cabinet, you find a bundle of letters written to many people and never sent. The paper has yellowed, and the handwriting belongs to someone much younger than you.',
    choices: [
      {
        labelVi: 'Đọc hết từng lá thư',
        labelEn: 'Read every letter in turn',
        effects: { sanity: -3, resonance: -4, health: -1 },
        resultVi: 'Bạn đọc đến chiều tối. Hầu hết người nhận đã mất, và bạn thấy mình nhớ ra những điều họ từng làm, bao gồm cả vài điều không đẹp. Cả đêm bạn không ngủ, và sáng ra thấy nhẹ.',
        resultEn: 'You read until evening. Most of the recipients have died, and you find yourself remembering what they did, including a few unkind things. You do not sleep all night, and in the morning feel lighter.'
      },
      {
        labelVi: 'Đem những lá thư đến địa chỉ cũ',
        labelEn: 'Carry the letters to the old addresses',
        outcomes: [
          {
            w: 55,
            effects: { network: 4, sanity: 3, health: -3, rep: 2 },
            resultVi: 'Một vài địa chỉ không còn tồn tại, nhưng ở hai nơi có người nhận thư thay cho người đã mất. Họ đọc ngay trước mặt bạn, và một người nói, rất khẽ, rằng họ đã đợi.',
            resultEn: 'Several of the addresses no longer exist, but at two there are people to receive the letter in place of the dead. They read it right before you, and one says, very softly, that they had been waiting.'
          },
          {
            w: 45,
            effects: { health: -5, sanity: -2 },
            resultVi: 'Bạn đi cả ngày và không tìm thấy ai. Ở địa chỉ cuối cùng, một người lạ cầm lá thư lên, nhìn tên, và trả lại bạn: "Người này đã mất lâu rồi."',
            resultEn: 'You walk all day and find no one. At the last address a stranger takes the letter, glances at the name, and hands it back: "This person died long ago."'
          }
        ]
      },
      {
        labelVi: 'Đốt cả bó thư',
        labelEn: 'Burn the whole bundle',
        effects: { sanity: 1, resonance: -3 },
        resultVi: 'Giấy cháy nhanh hơn bạn nghĩ. Tro bay lên theo luồng khói, và bạn đứng xem cho đến khi nó rơi xuống, đủ xa để không còn là của ai.',
        resultEn: 'The paper burns faster than you thought. The ash rises with the smoke, and you watch until it falls, far enough to belong to no one.'
      }
    ]
  },

  {
    id: 'ev4_elder_last_request',
    age: [62, 90],
    major: true,
    weight: 9,
    jobs: ['Fixer'],
    need: { grade: [9, 4] },
    vi: '[Request cuối cùng] Office cũ của bạn gửi đến một Request đơn giản: dẫn một người mới đi qua ba con phố và giới thiệu họ với chủ quán ở góc ngoài. Công thấp, và ai cũng biết nó có nghĩa gì.',
    en: '[The Last Request] Your old Office sends a simple Request: walk a newcomer through three streets and introduce them to the owner of the corner stall. The pay is low, and everyone knows what it means.',
    choices: [
      {
        labelVi: 'Nhận và dẫn họ đi chậm, kể từng chuyện cũ',
        labelEn: 'Accept and walk them slowly, telling the old stories',
        effects: { network: 4, rep: 4, sanity: 3, health: -2, wealth: 2 },
        resultVi: 'Người mới nghe hết, đôi khi hỏi một câu rất đúng chỗ. Ở góc phố cuối, họ gọi bạn là tiền bối lần đầu, và bạn không sửa.',
        resultEn: 'The newcomer listens to everything, sometimes asking a question that lands exactly right. At the last corner they call you senior for the first time, and you do not correct them.'
      },
      {
        labelVi: 'Nhận và dẫn nhanh cho xong việc',
        labelEn: 'Accept and walk quickly to be done with it',
        effects: { wealth: 2, sanity: -1 },
        resultVi: 'Ba con phố mất hai mươi phút, và người mới cảm ơn bạn bằng giọng lịch sự. Bạn nhận ra mình vừa bỏ lỡ một điều gì đó và không nói được là gì.',
        resultEn: 'The three streets take twenty minutes, and the newcomer thanks you politely. You realise you have just missed something and cannot say what.'
      },
      {
        labelVi: 'Từ chối và bảo Office tìm người khác',
        labelEn: 'Refuse and tell the Office to find someone else',
        effects: { sanity: -2, network: -2 },
        resultVi: 'Văn phòng ghi nhận mà không phản đối. Tuần sau không có Request nào gửi đến nữa, và bạn nhận ra mình vừa nghe tiếng một cánh cửa khép lại.',
        resultEn: 'The Office notes it without objection. The following week no Request arrives, and you realise you have just heard a door close.'
      }
    ]
  },

  {
    id: 'ev4_elder_fixer_successor',
    age: [62, 140],
    major: true,
    weight: 12,
    jobs: ['Fixer'],
    need: { grade: [3, 1] },
    vi: '[Người ký Request thay bạn] Một Office trẻ xin bạn bảo chứng cho người sẽ phụ trách tuyến đường mà bạn từng giữ. Hana Association không xét tuổi của bạn; họ cần biết ai sẽ chịu trách nhiệm khi một Request hỏng. Tên bạn vẫn trên hồ sơ, còn quyết định giao việc là của bạn.',
    en: '[The Name on the Request] A young Office asks you to endorse the person taking over a route you once held. Hana Association is not questioning your age; it needs someone accountable when a Request fails. Your name remains on the record, and the handover is yours to decide.',
    choices: [
      {
        labelVi: 'Huấn luyện người kế nhiệm và ký bảo chứng',
        labelEn: 'Train the successor and endorse them',
        effects: { wealth: -4, health: -2, network: 4, merit: 3 },
        resultVi: 'Bạn dành nhiều tuần đối chiếu từng tuyến thoát và từng thân chủ. Người mới ký Request đầu tiên dưới tên mình; bạn trả phí huấn luyện, nhưng từ nay có người đủ sức nhận cuộc gọi lúc đêm.',
        resultEn: 'You spent weeks checking escape routes and clients. The newcomer signed their first Request under their own name. Training cost you, but someone else can now answer the midnight calls.'
      },
      {
        labelVi: 'Giữ quyền ký, giao việc hiện trường cho Office',
        labelEn: 'Keep the signature and delegate fieldwork',
        effects: { wealth: 2, network: -3, sanity: -2 },
        resultVi: 'Bạn vẫn duyệt từng hồ sơ. Công việc chạy đúng hạn, nhưng vài người liên lạc trực tiếp với Office trẻ thay vì gọi cho bạn. Quyền ký còn nguyên; mạng lưới riêng mỏng đi.',
        resultEn: 'You still approved every file. Work arrived on time, but a few contacts began calling the younger Office directly. Your authority remained; your personal network thinned.'
      },
      {
        labelVi: 'Tự nhận Request khó nhất để kiểm tra tuyến',
        labelEn: 'Take the hardest Request to test the route',
        effects: { health: -8, sanity: -3, merit: 5 },
        resultVi: 'Bạn hoàn tất Request và ghi lại chỗ phục kích mới trên bản đồ Hana. Cái giá nằm ở khớp gối và những đêm mất ngủ, không phải ở danh tiếng.',
        resultEn: 'You completed the Request and marked a new ambush point on Hana’s map. The cost settled in your knee and sleepless nights, not in your reputation.'
      }
    ]
  },

  {
    id: 'ev4_elder_syndicate_succession',
    age: [62, 140],
    major: true,
    weight: 12,
    jobs: ['Syndicate'],
    need: { fingerRankAtLeast: 3 },
    vi: '[Sổ thu của đời sau] Hai đội dưới quyền mang đến hai bản sổ thu khác nhau cho cùng một dãy phố. Họ chờ bạn xác nhận bản nào có hiệu lực trước khi người thu tiền đi. Chức vị của bạn không bị chất vấn; nếu bỏ qua, tranh chấp sẽ rơi xuống dân khu phố.',
    en: '[The Next Crew’s Ledger] Two crews under your command bring different collection ledgers for the same block. They wait for you to decide which one stands before anyone is sent to collect. Your position is not in question; if you leave it unresolved, the dispute falls on the residents.',
    choices: [
      {
        labelVi: 'Đối chiếu biên lai, hoàn tiền thu trùng',
        labelEn: 'Check receipts and refund double payments',
        effects: { wealth: -5, network: 4, sanity: 2 },
        resultVi: 'Bạn trả lại tiền cho các hộ bị thu hai lần và buộc hai đội dùng chung một sổ. Ngân quỹ hụt đi, nhưng không còn ai phải đóng tiền cho cùng một đêm hai lần.',
        resultEn: 'You refunded the households charged twice and put both crews on one ledger. The treasury shrank, but no one had to pay twice for the same night.'
      },
      {
        labelVi: 'Giao một đội trưởng xử lý và chỉ nhận báo cáo',
        labelEn: 'Delegate the dispute and read the report',
        effects: { network: -3, sanity: 2 },
        resultVi: 'Đội trưởng giải quyết xong trước tối. Dãy phố yên, nhưng từ nay mọi lời cầu cứu đi qua bàn của anh ta trước khi tới bạn.',
        resultEn: 'The captain settled it before dusk. The block stayed quiet, though every appeal now passes through his desk before reaching yours.'
      },
      {
        labelVi: 'Cho hai đội tự chia địa bàn',
        labelEn: 'Let the crews divide the block',
        effects: { wealth: 3, heat: 5, sanity: -4 },
        resultVi: 'Tiền về đủ, nhưng một cuộc đụng độ nổ ra ở ranh giới mới. Người tuần tra bắt đầu ghi lại tên các đội của bạn.',
        resultEn: 'The money came in, but a fight broke out at the new boundary. Patrols began recording the names of your crews.'
      }
    ]
  },

  {
    id: 'ev4_elder_wing_handover',
    age: [62, 140],
    major: true,
    weight: 12,
    jobs: ['Wing Employee'],
    need: { stat: { wingRank: [2, 9] } },
    vi: '[Quyền duyệt ca đêm] Wing gửi lên hai lịch trực cho cùng một dây chuyền. Cả hai đều có chữ ký của bạn; một bản thiếu kỹ thuật viên an toàn. Nhân viên chờ quyết định trước khi máy khởi động, chứ không phải chờ bạn chứng minh mình còn giữ chức.',
    en: '[Night Shift Approval] The Wing sends up two rosters for the same production line. Both bear your signature; one omits the safety technician. Staff wait for your decision before starting the machines, not for proof that you still hold office.',
    choices: [
      {
        labelVi: 'Dừng dây chuyền để đối chiếu bản gốc',
        labelEn: 'Stop the line and check the original',
        effects: { wealth: -4, network: 3, sanity: -2 },
        resultVi: 'Ca đêm chậm một giờ và phòng tài chính gửi giấy hỏi. Kỹ thuật viên được gọi đến; bản lịch thiếu tên bị thu hồi trước khi ai bước vào vùng máy.',
        resultEn: 'The night shift started an hour late, and finance sent a query. The technician arrived; the incomplete roster was withdrawn before anyone entered the machine zone.'
      },
      {
        labelVi: 'Giao trưởng ca xác minh rồi ký lại',
        labelEn: 'Have the shift lead verify and countersign',
        effects: { network: -2, sanity: 2 },
        resultVi: 'Trưởng ca tìm ra lỗi nhập liệu và sửa ngay. Anh ta được mọi người tìm đến trước bạn trong các ca sau; quyền duyệt của bạn vẫn nguyên.',
        resultEn: 'The shift lead found and corrected the entry error. Workers went to him first on later shifts; your approval authority stayed intact.'
      },
      {
        labelVi: 'Cho máy chạy theo bản đã ký',
        labelEn: 'Run the line under the signed roster',
        effects: { wealth: 3, health: -5, sanity: -4, heat: 3 },
        resultVi: 'Chỉ tiêu được giao đúng giờ. Đến sáng bạn xuống xưởng tự kéo chốt dừng máy khi một trục lệch nhịp, bị thương ở vai và phải ký báo cáo sự cố.',
        resultEn: 'The quota was met on time. By morning you had to pull the emergency stop when a shaft slipped out of time, injuring your shoulder and leaving you to sign the incident report.'
      }
    ]
  },

  {
    id: 'ev4_elder_workshop_mark',
    age: [62, 140],
    major: true,
    weight: 12,
    jobs: ['Workshop Craftsman'],
    need: { stat: { merit: [45, 9999] } },
    vi: '[Dấu xưởng trên lưỡi mới] Một thợ trẻ mang đến thanh kiếm vừa xuất lò để xin đóng dấu xưởng của bạn. Lưỡi kiếm đẹp, nhưng mối hàn bên trong chưa được thử tải. Khách đang chờ, còn tên xưởng sẽ nằm trên món hàng lâu hơn cả ca làm hôm nay.',
    en: '[The Workshop Mark] A young craftsperson brings a fresh blade for your Workshop seal. It looks fine, but the inner weld has not been stress-tested. The client is waiting, and the Workshop name will outlast today’s shift.',
    choices: [
      {
        labelVi: 'Thử tải và rèn lại mối hàn',
        labelEn: 'Stress-test and reforge the weld',
        effects: { wealth: -4, health: -3, merit: 4 },
        resultVi: 'Mối hàn nứt đúng lần thử thứ ba. Bạn cùng thợ trẻ làm lại tới khuya; đơn hàng trễ, nhưng thanh kiếm mới chịu được tải ghi trên hợp đồng.',
        resultEn: 'The weld cracked on the third test. You and the young smith worked until late. Delivery slipped, but the new blade met the load written in the contract.'
      },
      {
        labelVi: 'Giao thợ cả kiểm tra và chịu trách nhiệm',
        labelEn: 'Put the master smith in charge of inspection',
        effects: { network: -2, sanity: 2 },
        resultVi: 'Thợ cả giữ món hàng lại để kiểm tra. Từ nay khách hỏi ý ông ấy trước khi tìm bạn; dấu xưởng vẫn do bạn quyết.',
        resultEn: 'The master smith held the order for inspection. Clients began asking for his opinion before yours; the Workshop seal remained your call.'
      },
      {
        labelVi: 'Đóng dấu và giao đúng hạn',
        labelEn: 'Seal it and deliver on schedule',
        effects: { wealth: 3, sanity: -4, heat: 3 },
        resultVi: 'Khách trả đủ tiền, nhưng thanh tra Tres ghi nhận rằng lưỡi kiếm chưa qua thử tải. Bạn giữ lại bản vẽ mối hàn và dặn xưởng không nhận thêm đơn cùng kiểu.',
        resultEn: 'The client paid in full, but a Tres inspector recorded that the blade had not been load-tested. You kept the weld drawing and barred another order of this pattern.'
      }
    ]
  },

  // ------------------------------------------------------------ careers
  {
    id: 'ev4_syn_loyalty_errand',
    age: [22, 60],
    major: true,
    weight: 10,
    jobs: ['Syndicate'],
    vi: '[Việc nhỏ và bẩn] Cấp trên giao cho bạn một việc nhỏ để chứng tỏ lòng trung thành: đến một căn hộ cuối phố và lấy đi một chiếc hộp mà không để lại dấu vết. Ông không nói trong hộp có gì, và không nói chủ căn hộ là ai.',
    en: '[A Small, Dirty Job] Your superior assigns you a small task to prove loyalty: go to a flat at the end of the street and take a box away without leaving a trace. He does not say what is in the box, nor who owns the flat.',
    choices: [
      {
        labelVi: 'Lấy hộp và giao đúng như được dặn',
        labelEn: 'Take the box and deliver it as instructed',
        outcomes: [
          {
            w: 65,
            effects: { rep: 3, heat: 3, sanity: -3 },
            meritAdd: 6,
            resultVi: 'Căn hộ trống, và hộp nằm giữa bàn như được đặt sẵn. Khi bạn giao nó, cấp trên mở ra liếc một lần rồi đóng lại, và bạn nhận ra ông đã biết trong hộp có gì từ đầu.',
            resultEn: 'The flat is empty, and the box sits in the middle of the table as if placed for you. When you deliver it, your superior opens it, glances once, and closes it, and you realise he knew what was inside from the start.'
          },
          {
            w: 35,
            effects: { sanity: -6, heat: 6, health: -8 },
            meritAdd: 6,
            resultVi: 'Chủ căn hộ về đúng lúc bạn cầm hộp trên tay. Bạn không nhớ rõ chuyện xảy ra sau đó, chỉ nhớ ánh mắt của họ, và tay bạn có vết xước mà bạn không nhớ đã bị.',
            resultEn: 'The flat’s owner comes home just as you hold the box. You do not recall clearly what followed, only their eyes, and a scratch on your hand you cannot remember receiving.'
          }
        ],
        later: [{ id: 'm5_syn_fruit_basket', years: 2, reasonVi: 'Có người biết bạn đã vào căn hộ đó', reasonEn: 'Someone knows you entered that flat' }]
      },
      {
        labelVi: 'Báo cho chủ căn hộ trước khi lấy',
        labelEn: 'Warn the flat’s owner before taking it',
        effects: { rep: -3, network: 3, sanity: 2, heat: 4 },
        resultVi: 'Chủ căn hộ nghe bạn nói mà không đáp, rồi mở cửa tủ và lấy chiếc hộp ra đưa bạn. "Hãy bảo ông ta rằng tôi biết," họ nói, và đó là tất cả.',
        resultEn: 'The owner hears you out without replying, then opens a cupboard and hands you the box. "Tell him I know," they say, and that is all.'
      },
      {
        labelVi: 'Từ chối nhận việc và chịu hậu quả',
        labelEn: 'Refuse the job and accept the consequences',
        effects: { rep: -4, heat: 6, health: -6, sanity: 3 },
        resultVi: 'Cấp trên không giận, chỉ ghi gì đó vào sổ và đưa việc cho một người khác. Hôm sau bạn thấy hai người lạ đứng đợi ngay ở đầu phố nhà bạn.',
        resultEn: 'Your superior is not angry, only writes something in a ledger and passes the job to someone else. The next day you see two strangers waiting at the head of your street.'
      }
    ]
  },

  {
    id: 'ev4_wing_audit_file',
    age: [24, 60],
    major: true,
    weight: 10,
    jobs: ['Wing Employee'],
    vi: '[Tệp kiểm toán không dành cho bạn] Bạn vô tình mở một tệp kiểm toán không dành cho mình trên máy chung. Trong đó, tên một người cùng bộ phận được ghi cạnh một con số mà không ai nên biết, và ngày cập nhật cuối cùng là hôm qua.',
    en: '[An Audit File Not Meant for You] You accidentally open an audit file not meant for you on a shared terminal. In it a colleague’s name is written beside a figure no one should know, and the last update is yesterday.',
    choices: [
      {
        labelVi: 'Đóng tệp và coi như chưa thấy',
        labelEn: 'Close the file and pretend you never saw it',
        effects: { sanity: -3, heat: 2 },
        meritAdd: 2,
        resultVi: 'Bạn đóng tệp và xóa lịch sử, rồi nhận ra máy ghi lại thời điểm bạn xóa. Cả ngày bạn tự hỏi ai sẽ đọc dòng ghi ấy.',
        resultEn: 'You close the file and clear the history, then notice the terminal logs the moment you cleared it. All day you wonder who will read that line.'
      },
      {
        labelVi: 'Báo cho người trong tệp',
        labelEn: 'Warn the person named in the file',
        outcomes: [
          {
            w: 50,
            effects: { network: 5, rep: 1, sanity: -2, heat: 3 },
            resultVi: 'Họ nghe bạn nói mà không đổi sắc mặt, rồi gật. Ba ngày sau họ xin chuyển bộ phận, và để lại cho bạn một chiếc bút rất tốt trên bàn.',
            resultEn: 'They hear you out without changing expression, then nod. Three days later they request a transfer and leave a very fine pen on your desk.'
          },
          {
            w: 50,
            effects: { network: -3, heat: 7, sanity: -5, rep: -2 },
            resultVi: 'Họ gọi bạn vào phòng nhỏ và hỏi bạn đã mở tệp bằng cách nào. Cuộc nói chuyện kéo dài hai giờ, và không ai nhắc đến người trong tệp thêm lần nào.',
            resultEn: 'They call you into a small room and ask how you opened the file. The conversation lasts two hours, and no one mentions the person in the file again.'
          }
        ]
      },
      {
        labelVi: 'Sao chép con số và cất đi',
        labelEn: 'Copy the figure and keep it',
        effects: { heat: 6, resonance: 2, sanity: -3, wealth: 3 },
        meritAdd: 3,
        resultVi: 'Con số được chép vào mép một tờ báo cáo rồi xé ra. Bạn giấu mảnh giấy trong đế giày, và đi lại chậm hơn suốt cả tuần.',
        resultEn: 'You copy the figure onto the edge of a report and tear it off. You hide the scrap in your shoe sole and walk more slowly all week.',
        later: [{ id: 'm5_wing_added_quota', years: 2, reasonVi: 'Bảng chỉ tiêu có thêm một dòng sau tệp bạn đã đọc', reasonEn: 'A line is added to the quota board after the file you read' }]
      }
    ]
  }
];
