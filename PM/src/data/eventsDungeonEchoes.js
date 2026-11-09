// What a dungeon run leaves behind. settleRun in dungeonEngine.js plants one of these as a thread
// when a run had a choice worth remembering; none of them can be drawn at random.

const echo = (id, tags, vi, en, choices) => ({ id, major: true, isCausalCallback: true, causalOnly: true, tags, vi, en, choices });

export const DUNGEON_ECHO_EVENTS = [
  echo('echo_dungeon_warp_witness', ['dungeon', 'npc'],
    '[Người trên chuyến WARP] Có người chặn bạn ngoài ga. Họ đi cùng chuyến tàu năm ngoái và nhớ bạn đã dẫn nhóm hành khách ra cửa. Giờ họ muốn trả lại món nợ ấy.',
    '[The WARP passenger] Someone stops you outside the station. They were on last year’s train and remember you leading passengers to the exit. Now they want to return the favor.',
    [
      { labelVi: 'Nhận lời giới thiệu tới chỗ họ làm', labelEn: 'Take an introduction to where they work',
        resultVi: 'Họ dẫn bạn tới văn phòng của mình và kể chuyện con tàu cho cả phòng nghe. Mấy người ở đó xin số liên lạc của bạn.',
        resultEn: 'They take you to their office and tell the whole floor about the train. A few people there ask how to reach you.',
        effects: { network: 8, rep: 4 } },
      { labelVi: 'Bảo họ quên chuyện đó đi', labelEn: 'Tell them to forget it',
        resultVi: 'Họ gật đầu rồi đặt phong bì lên ghế cạnh bạn. Đến khi bạn mở ra, người ấy đã đi khỏi sân ga.',
        resultEn: 'They nod and leave an envelope on the seat beside you. By the time you open it, they have left the platform.',
        effects: { wealth: 12, sanity: 4 } }
    ]),

  echo('echo_dungeon_warp_left_behind', ['dungeon', 'grief'],
    '[Tờ giấy dán ở ga] Ở ga WARP có tờ giấy tìm người, kèm ảnh một hành khách bạn từng dẫn đi nửa đường rồi phải bỏ lại. Người đứng dán giấy là em của họ.',
    '[The notice at the station] At the WARP station hangs a missing-person notice, with a photo of a passenger you led halfway and then had to leave. The one putting it up is their sibling.',
    [
      { labelVi: 'Kể cho người em nghe chuyện trên tàu', labelEn: 'Tell the sibling what happened on the train',
        resultVi: 'Người em nghe hết mà không khóc. Họ gỡ tờ giấy xuống, cảm ơn bạn, rồi đi về phía cửa ra.',
        resultEn: 'The sibling listens to the end without crying. They take the notice down, thank you, and walk to the exit.',
        effects: { sanity: -6, rep: 3 } },
      { labelVi: 'Đi qua mà không dừng lại', labelEn: 'Walk past without stopping',
        resultVi: 'Bạn bước lên tàu. Suốt chuyến đi, tấm ảnh trên tờ giấy cứ hiện lại trong đầu.',
        resultEn: 'You board the train. The whole ride, the photo on the notice keeps coming back to you.',
        effects: { sanity: -10 } }
    ]),

  echo('echo_dungeon_shield_debt', ['dungeon', 'npc', 'loyalty'],
    '[Vết sẹo trên vai] Người đồng đội từng lao ra đỡ nhát chém thay bạn đã lành vết thương. Họ còn một vết sẹo dài trên vai, và họ hỏi bạn lần sau có cần họ đi cùng nữa không.',
    '[The scar on the shoulder] The companion who once threw themselves in front of a blow for you has healed. A long scar runs down their shoulder, and they ask whether you want them along next time.',
    [
      { labelVi: 'Nói rằng lần sau bạn sẽ là người đứng trước', labelEn: 'Say that next time you will stand in front',
        resultVi: 'Họ cười, bảo bạn nói phét. Tối đó hai người ngồi uống tới khuya.',
        resultEn: 'They laugh and call it a boast. The two of you drink late that night.',
        effects: { sanity: 8, health: 2 } },
      { labelVi: 'Bảo họ ở nhà, đừng đi nữa', labelEn: 'Tell them to stay home from now on',
        resultVi: 'Họ im lặng một lúc rồi gật đầu. Bạn biết mình vừa giữ cho họ an toàn, và cũng vừa mất một người bọc lưng.',
        resultEn: 'They are quiet for a while, then nod. You know you have kept them safe, and lost someone to watch your back.',
        effects: { sanity: -3, rep: 2 } }
    ]),

  echo('echo_dungeon_staked_companion', ['dungeon', 'npc'],
    '[Lần bị đem ra cược] Người đồng đội nhắc lại cái lần bạn đặt họ vào ván Clash dưới hầm. Họ không giận, nhưng họ muốn biết lúc đó bạn có nghĩ tới họ không.',
    '[The time they were the stake] Your companion brings up the time you put them on the line in a Clash below. They are not angry, but they want to know if you thought of them then.',
    [
      { labelVi: 'Nói thật là lúc đó bạn chỉ nghĩ tới việc thắng', labelEn: 'Admit you only thought about winning',
        resultVi: 'Họ gật đầu như đã đoán trước. "Ít ra bạn không nói dối." Từ đó họ đi cùng bạn ít hơn, nhưng vẫn đi.',
        resultEn: 'They nod as if they expected it. "At least you did not lie." They come along less after that, but they still come.',
        effects: { sanity: -4, rep: 3 } },
      { labelVi: 'Nói rằng bạn cược vì tin họ không thua', labelEn: 'Say you staked them because you trusted them not to lose',
        resultVi: 'Họ nhìn bạn lâu rồi bật cười. Câu đó họ đem kể cho người khác nghe mấy lần.',
        resultEn: 'They look at you for a long time, then laugh. They repeat the line to others more than once.',
        effects: { sanity: 6, network: 3 } }
    ]),

  echo('echo_dungeon_route_notes', ['dungeon', 'work'],
    '[Người hỏi đường] Một Office nghe tin bạn đã đi hết một hầm và trở ra. Họ gửi người tới hỏi mua bản ghi lối đi bạn còn nhớ.',
    '[Someone asking the way] An Office hears that you went all the way through a dungeon and came back. They send someone to buy whatever notes on the route you still remember.',
    [
      { labelVi: 'Bán bản ghi với giá tốt', labelEn: 'Sell the notes for a good price',
        resultVi: 'Họ trả tiền rồi mang bản ghi đi. Vài tháng sau, Office gửi lại trang đầu với nét bút đỏ đánh dấu một lối rẽ bạn đã bỏ sót.',
        resultEn: 'They pay and take the notes. Months later the Office returns the first page, with a red mark beside a turn you missed.',
        effects: { wealth: 14, rep: 3 } },
      { labelVi: 'Giữ lại, lối đó chỉ mình bạn biết', labelEn: 'Keep them, that route is yours alone',
        resultVi: 'Người của Office ra về tay không. Ở quầy Hana bắt đầu có lời đồn về một lối đi mà chỉ bạn biết.',
        resultEn: 'The Office runner leaves empty-handed. At the Hana counter, talk starts about a route only you know.',
        effects: { rep: 6, network: -2 } }
    ])
];
