// ============================================================================
// YEAR-END LINES. One reason (healing, rent, smog...) used to print the same
// sentence every year, and a newborn got the adult text about wounds closing.
// Each reason now has a few plain variants per life stage; yearLine() in
// yearPlanner.js never repeats last year's pick for the same reason.
// Stages: baby (0-3), kid (4-12), adult (13+). A missing stage falls back to adult.
// `n` is filled in where a number belongs.
// ============================================================================

export const YEAR_END_LINES = {
  heal_natural: {
    baby: [
      ['Cả năm bạn ốm vặt mấy lần, lần nào cũng tự khỏi.', 'You fell ill a few times this year and got over it each time.'],
      ['Bạn ăn được nhiều hơn và ngủ say hơn. Người lớn bảo bạn đã cứng cáp.', 'You ate more and slept deeper. The adults said you were getting sturdy.'],
      ['Mẹ bạn thức nhiều đêm bên bạn. Đến cuối năm, bạn không còn hay khóc giữa đêm nữa.', 'Your mother sat up with you many nights. By year’s end you no longer woke crying.']
    ],
    kid: [
      ['Những vết trầy ở đầu gối lành dần, chỉ còn vệt sẹo nhạt.', 'The scrapes on your knees healed, leaving only faint marks.'],
      ['Không có thuốc, bạn khỏi bệnh nhờ ngủ nhiều và ăn cháo loãng.', 'With no medicine, you got better on sleep and thin porridge.'],
      ['Cơ thể bạn tự lành theo cách của trẻ con: chậm, nhưng chắc.', 'Your body healed the way children’s do: slowly, but surely.']
    ],
    adult: [
      ['Không có tiền đi khám, bạn để vết thương tự khép miệng.', 'With no money for a doctor, you let the wounds close on their own.'],
      ['Bạn nghỉ được vài tuần. Vết thương lành, để lại da non căng cứng.', 'You managed a few weeks’ rest. The wounds healed into tight new skin.'],
      ['Vết thương cũ lành dần, dù trời trở lạnh là lại nhức.', 'Old wounds healed, though they still ache when the weather turns.']
    ]
  },
  heal_nest: {
    adult: [
      ['Bác sĩ của Nest khám định kỳ và kê đủ thuốc.', 'The Nest doctor came for check-ups and prescribed what you needed.'],
      ['Bảo hiểm của Nest trả tiền chữa trị. Không ai phải hỏi giá.', 'Nest insurance paid for the treatment. No one had to ask the price.'],
      ['Phòng khám trong Nest sạch đến mức có mùi kim loại. Bạn lành bệnh nhanh.', 'The Nest clinic was so clean it smelled of metal. You recovered quickly.']
    ]
  },
  heal_clinic: {
    adult: [
      ['Bạn trả 2 Ahn cho phòng khám chui trong hẻm để khâu lại vết thương.', 'You paid 2 Ahn at a back-alley clinic to get stitched up.'],
      ['Một bác sĩ không giấy phép khâu cho bạn với giá 2 Ahn và không hỏi gì.', 'An unlicensed doctor stitched you up for 2 Ahn and asked no questions.'],
      ['2 Ahn tiền thuốc sát trùng và chỉ khâu. Rẻ hơn để nó nhiễm trùng.', '2 Ahn for antiseptic and thread. Cheaper than letting it fester.']
    ]
  },
  heal_ampoule: {
    adult: [
      ['Ampoule của K Corp làm vết thương khép lại chỉ sau một đêm.', 'The K Corp ampoule closed your wounds overnight.'],
      ['Bạn tiêm thêm một ống ampoule. Da thịt liền lại nhanh đến mức thấy rợn.', 'Another ampoule. The flesh knit back so fast it was unsettling.']
    ]
  },
  calm_bond: {
    kid: [
      ['Có người ngồi nghe bạn kể chuyện mỗi tối. Ác mộng thưa dần.', 'Someone listened to your stories every evening. The nightmares thinned out.'],
      ['Bạn ngủ cạnh người thân mỗi khi sợ. Đến cuối năm bạn bớt giật mình hơn.', 'You slept beside family whenever you were scared. By year’s end you startled less.']
    ],
    adult: [
      ['Có người ở bên giúp bạn trụ vững.', 'Someone at your side kept you steady.'],
      ['Những bữa tối với người thân kéo bạn về lại với đời thường.', 'Dinners with someone close pulled you back to ordinary life.'],
      ['Bạn kể ra một phần chuyện đã thấy. Người nghe không bỏ đi.', 'You told part of what you had seen. The one listening didn’t leave.']
    ]
  },
  calm_tavern: {
    adult: [
      ['Bạn bỏ 1 Ahn ở quán rượu cuối phố để ngủ được một đêm.', 'You spent 1 Ahn at the bar down the street to get one night’s sleep.'],
      ['Một Ahn cho vài ly rượu rẻ. Đầu đỡ đau, sáng ra lại đau.', 'One Ahn for a few cheap drinks. The headache eased, then came back in the morning.'],
      ['Bạn ngồi quán đến khuya, nghe người lạ kể chuyện của họ thay vì nghĩ về chuyện của mình.', 'You sat in the bar late, listening to strangers’ troubles instead of your own.']
    ]
  },
  calm_natural: {
    baby: [
      ['Bạn học được cách tự dỗ mình ngủ.', 'You learned to soothe yourself to sleep.'],
      ['Tiếng ồn ngoài phố không còn làm bạn thức giấc nữa.', 'The noise outside stopped waking you.']
    ],
    kid: [
      ['Bạn tìm được một góc yên trên mái nhà để ngồi một mình.', 'You found a quiet corner on the roof to sit alone.'],
      ['Trò chơi với lũ trẻ trong khu làm bạn quên đi vài chuyện.', 'Games with the kids on the block made you forget a few things.'],
      ['Có những đêm yên ắng hiếm hoi, và bạn ngủ được trọn giấc.', 'There were rare quiet nights, and you slept through.']
    ],
    adult: [
      ['Có vài đêm yên hiếm hoi, đủ để đầu óc bạn lắng lại.', 'A few rare quiet nights were enough to settle your mind.'],
      ['Bạn đi bộ một mình mỗi tối cho đến khi suy nghĩ chậm lại.', 'You walked alone every evening until your thoughts slowed down.'],
      ['Bạn tập không nghĩ về những gì đã qua. Có hôm làm được.', 'You practiced not thinking about what had happened. Some days it worked.']
    ]
  },
  drift_resonance: {
    kid: [
      ['Những giấc mơ lạ thưa dần.', 'The strange dreams came less often.'],
      ['Bạn không còn hay giật mình nhìn vào góc phòng tối nữa.', 'You stopped startling at the dark corner of the room.'],
      ['Thứ bạn từng sợ dưới gầm giường giờ chỉ còn là bóng tối.', 'What you used to fear under the bed was only dark again.']
    ],
    adult: [
      ['Cơn xao động trong đầu lắng bớt khi ngày thường trở lại.', 'The unrest in your head eased as ordinary days returned.'],
      ['Những điều kỳ lạ năm ngoái giờ chỉ còn như một giấc mơ khó nhớ.', 'Last year’s strange things now felt like a dream you couldn’t quite recall.'],
      ['Bạn bắt đầu tự hỏi chuyện đó có thật sự xảy ra không.', 'You started to wonder whether it had really happened.']
    ]
  },
  drift_network: {
    adult: [
      ['Những người quen lâu không gặp bớt sẵn lòng giúp bạn.', 'Contacts you had not seen in a while were less willing to help.'],
      ['Vài người quen chuyển đi, vài người không còn nhớ tên bạn.', 'A few acquaintances moved away; a few no longer remembered your name.']
    ]
  },
  drift_rep: {
    adult: [
      ['Thành tích cũ dần chìm dưới những cái tên mới.', 'New names pushed your old accomplishments out of notice.'],
      ['Người ta nhắc đến bạn ít hơn năm ngoái.', 'People mentioned you less than last year.']
    ]
  },
  income_up: {
    adult: [
      ['Thu nhập vượt chi tiêu, bạn để dành được một ít.', 'You earned more than you spent and put a little aside.'],
      ['Năm nay dư ra vài Ahn. Bạn giấu chúng ở chỗ chỉ mình bạn biết.', 'A few Ahn left over this year. You hid them where only you would find them.'],
      ['Làm nhiều hơn tiêu. Lần đầu sau lâu lắm bạn không phải đếm từng đồng.', 'More in than out. For the first time in a long while, you didn’t count every coin.']
    ]
  },
  income_down: {
    adult: [
      ['Tiền thuê, tiền ăn và những khoản phải trả để giữ việc làm khiến túi bạn vơi đi.', 'Rent, food and the costs of keeping your job thinned your pocket.'],
      ['Cuối năm bạn đếm tiền hai lần, và cả hai lần đều ít hơn bạn nghĩ.', 'At year’s end you counted your money twice, and both times it was less than you thought.'],
      ['Giá thuê nhà lại tăng. Bạn cắt bớt một bữa mỗi ngày.', 'Rent went up again. You cut one meal a day.']
    ]
  },
  asset_cost: {
    adult: [
      ['Giữ tiền cũng tốn tiền: {n} Ahn phí cất giữ, giấy phép và người canh.', 'Keeping money costs money: {n} Ahn for storage, permits and guards.'],
      ['{n} Ahn đi vào phí bảo kê cho số tiền bạn đang có.', '{n} Ahn went on protection for the savings you hold.'],
      ['Ngân hàng của Wing thu {n} Ahn phí giữ hộ, đều như thuế.', 'The Wing bank took {n} Ahn in custody fees, regular as tax.']
    ]
  },
  child_friction: {
    adult: [
      ['Cả nhà chắt bóp từng Ahn cho bữa ăn và tiền bảo kê của băng đầu ngõ.', 'The family pinched every Ahn for food and the protection money for the gang at the corner.'],
      ['Số tiền bạn để dành được lấy ra để mua than cho mùa đông.', 'The money you had saved went on coal for the winter.'],
      ['Cha mẹ mượn tiền tiết kiệm của bạn và hứa sẽ trả. Bạn biết là không.', 'Your parents borrowed your savings and promised to pay it back. You knew they wouldn’t.']
    ]
  },
  nest_tuition: {
    adult: [
      ['Học phí trường tư và phí giữ hạn ngạch cư dân Nest ngốn một phần tiền nhà.', 'Private tutoring and the Nest residency quota fee ate into the household money.'],
      ['Gia đình đóng thêm một khóa học nữa để bạn không tụt lại sau lũ con nhà bên.', 'The family paid for one more course so you wouldn’t fall behind the neighbors’ children.']
    ]
  },
  job_wear: {
    adult: [
      ['Ca làm dài rút bớt sức lực và sự tỉnh táo.', 'Long shifts cost strength and composure.'],
      ['Công việc lấy đi của bạn nhiều hơn số Ahn nó trả.', 'The work took more out of you than the Ahn it paid.'],
      ['Nghỉ ngắn không xóa hết phần hao mòn của một năm làm việc.', 'Short breaks didn’t erase a year of wear.']
    ]
  },
  smog: {
    adult: [
      ['Khói bụi của khu này ngấm vào phổi, để lại những cơn ho khan.', 'The district’s smog settled in your lungs, leaving a dry cough.'],
      ['Mùa này khói nhà máy dày đến mức ban trưa cũng phải bật đèn.', 'Factory smoke was so thick this season the lights stayed on at noon.']
    ]
  },
  gunfire: {
    kid: [
      ['Nhiều đêm bạn bị đánh thức vì tiếng súng và bò xuống gầm giường theo thói quen.', 'Many nights gunfire woke you and you crawled under the bed out of habit.'],
      ['Người lớn dạy bạn phân biệt tiếng súng xa và gần. Bạn học rất nhanh.', 'The adults taught you to tell near gunfire from far. You learned fast.']
    ],
    adult: [
      ['Những đêm mất ngủ vì còi báo động và tiếng súng của các băng nhóm.', 'Nights lost to sirens and gang gunfire.'],
      ['Tiếng súng ngoài phố gần hơn năm ngoái. Bạn ngủ với đôi giày bên cạnh gối.', 'The gunfire outside was closer than last year. You slept with your shoes beside the pillow.']
    ]
  },
  aging: {
    adult: [
      ['Cơ thể bạn bắt đầu chậm lại. Cầu thang dài hơn trước.', 'Your body began to slow down. The stairs grew longer.'],
      ['Tay bạn run khi trời lạnh, và vết thương lâu lành hơn.', 'Your hands shook in the cold, and wounds took longer to heal.'],
      ['Mỗi sáng bạn cần thêm một chút thời gian mới đứng dậy được.', 'Each morning it took you a little longer to get up.']
    ]
  },
  firearms_tax: {
    adult: [
      ['Thuế đạn và phí đăng ký súng của The Head lấy đi 3 Ahn.', 'The Head’s ammunition tax and firearm registration took 3 Ahn.'],
      ['3 Ahn cho giấy phép mang súng. Thiếu nó, khẩu súng là một bản án.', '3 Ahn for the firearm permit. Without it, the gun is a sentence.']
    ]
  },
  gear_upkeep: {
    adult: [
      ['Mài lưỡi và thay dầu ở Workshop tốn 2 Ahn.', 'Sharpening and oiling at the Workshop cost 2 Ahn.'],
      ['Thợ ở Workshop thay một con ốc nứt trên vũ khí của bạn và lấy 2 Ahn.', 'The Workshop replaced a cracked rivet on your weapon and charged 2 Ahn.']
    ]
  },
  prosthetic_upkeep: {
    adult: [
      ['Dầu làm mát và linh kiện thay thế cho cơ thể máy tốn 3 Ahn.', 'Coolant and spare parts for your prosthetic body cost 3 Ahn.'],
      ['Một khớp gối máy bắt đầu kêu. Thay nó hết 3 Ahn.', 'A mechanical knee started grinding. Replacing it cost 3 Ahn.'],
      ['Kỹ thuật viên cân chỉnh lại cảm biến của bạn với giá 3 Ahn và một lời khuyên không ai hỏi.', 'A technician recalibrated your sensors for 3 Ahn and advice nobody asked for.']
    ]
  }
};
