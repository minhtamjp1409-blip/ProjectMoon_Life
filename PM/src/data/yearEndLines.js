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
      ['Bạn qua mấy cơn sốt ngắn. Đến cuối năm, bạn ngủ yên hơn.', 'You got through several brief fevers. By year’s end you slept more soundly.']
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
  heal_distortion_tissue: {
    adult: [
      ['Mép vết thương kéo lại khi bạn ngủ. Sáng ra, trên da chỉ còn đường chỉ gồ ghề.', 'The wound edges draw together while you sleep. By morning, a raised seam remains.'],
      ['Phần cơ thể bị thương tự liền lại. Bạn vẫn nhớ rõ chỗ đã đau.', 'The injured part of your body knits itself back together. You still remember where it hurt.'],
      ['Bạn không đến phòng khám. Vết thương tự khép lại, chậm hơn lần trước.', 'You do not visit a clinic. The wound closes on its own, more slowly than last time.']
    ]
  },
  heal_nest: {
    baby: [
      ['Người của phòng khám Nest đến kiểm tra và để lại thuốc theo liều trẻ nhỏ.', 'A Nest clinic worker checks on you and leaves medicine measured for an infant.'],
      ['Bạn được đưa đi khám trước khi cơn sốt nặng thêm.', 'You are taken to the clinic before the fever worsens.']
    ],
    kid: [
      ['Phòng khám Nest xử lý vết thương và hẹn bạn đến kiểm tra lại.', 'The Nest clinic treats your injury and schedules a follow-up.'],
      ['Bác sĩ ghi triệu chứng vào hồ sơ rồi cho bạn về nghỉ.', 'The doctor records your symptoms and sends you home to rest.']
    ],
    adult: [
      ['Bạn tới phòng khám Nest, nhận thuốc và lịch tái khám.', 'You visit a Nest clinic and leave with medicine and a follow-up date.'],
      ['Bác sĩ xử lý vết thương, rồi ghi chi phí vào hồ sơ cư trú.', 'The doctor treats your wound and adds the cost to your residency record.'],
      ['Bạn được điều trị trước khi vết thương nhiễm trùng.', 'You receive treatment before the wound becomes infected.']
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
    baby: [
      ['Có người ở lại bên nôi khi bạn thức giấc. Bạn ngủ lại trước khi trời sáng.', 'Someone stays beside your cot when you wake. You fall asleep again before dawn.'],
      ['Một bàn tay quen vỗ nhẹ lưng bạn qua cơn khóc đêm.', 'A familiar hand pats your back until the night crying passes.']
    ],
    kid: [
      ['Có người ngồi nghe bạn kể chuyện mỗi tối. Ác mộng thưa dần.', 'Someone listened to your stories every evening. The nightmares thinned out.'],
      ['Bạn kể chuyện mình sợ cho người bạn tin. Đến cuối năm, bạn bớt giật mình hơn.', 'You told someone you trusted what frightened you. By year’s end, you startled less.']
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
    baby: [
      ['Bạn bớt thức giấc giữa đêm. Những lần người trông bạn phải bật đèn cũng thưa dần.', 'You wake less often at night. Your caretaker needs the light less often, too.'],
      ['Người trông bạn thôi phải ngồi bên nôi đến sáng.', 'Your caretaker no longer has to sit beside the cot until dawn.']
    ],
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
    baby: [
      ['Người từng ghé thăm sau ngày bạn sinh không còn đến đều. Tên họ vẫn nằm trong sổ liên lạc.', 'The visitors who came after your birth stop coming regularly. Their names remain in the contact book.'],
      ['Vài người quen của gia đình chuyển đi. Số lần có khách tới thưa dần.', 'A few family contacts move away. Visitors become less frequent.']
    ],
    kid: [
      ['Bạn ít gặp lại những người từng giúp mình. Có người đã chuyển sang khu khác.', 'You see the people who once helped you less often. Some have moved to another block.'],
      ['Một địa chỉ trong cuốn sổ liên lạc không còn ai ở.', 'One address in the contact book no longer has anyone living there.']
    ],
    adult: [
      ['Những người quen lâu không gặp bớt sẵn lòng giúp bạn.', 'Contacts you had not seen in a while were less willing to help.'],
      ['Vài người quen chuyển đi, vài người không còn nhớ tên bạn.', 'A few acquaintances moved away; a few no longer remembered your name.']
    ]
  },
  drift_network_established: {
    adult: [
      ['Người trung gian cũ rời vị trí; danh tiếng của bạn còn đó, nhưng vài đường liên lạc phải gây dựng lại.', 'Old intermediaries left their posts. Your standing held, but a few channels had to be rebuilt.'],
      ['Những người từng làm việc trực tiếp với bạn nay chuyển sang vai trò khác. Cấp dưới cần thời gian nối lại đầu mối.', 'People who dealt with you directly moved on. Your staff needed time to rebuild those contacts.']
    ]
  },
  drift_rep: {
    baby: [
      ['Những người từng hỏi thăm nhà bạn sau ngày sinh giờ không còn nhắc tới chuyện đó.', 'The people who asked after your family at your birth no longer mention it.'],
      ['Tin về đứa trẻ mới sinh nhường chỗ cho chuyện của tuần này.', 'News of a newborn gives way to this week’s other stories.']
    ],
    kid: [
      ['Chuyện bạn làm năm trước dần bị thay bằng chuyện của bọn trẻ khác.', 'What you did last year gives way to stories about other children.'],
      ['Người ở khu nhà ít nhắc tới tên bạn hơn.', 'People in the building mention your name less often.']
    ],
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
      ['Mất {n} Ahn trả phí bảo an cho số tiền bạn đang tích cóp.', '{n} Ahn went on protection for the savings you hold.'],
      ['Ngân hàng của Wing thu {n} Ahn phí giữ hộ, đều như thuế.', 'The Wing bank took {n} Ahn in custody fees, regular as tax.']
    ]
  },
  child_friction: {
    baby: [
      ['Tiền dành cho bạn được dùng mua thức ăn và chỗ ngủ qua mùa lạnh.', 'Money set aside for you went on food and a place to sleep through the cold season.'],
      ['Một khoản Ahn nhỏ đổi lấy sữa và nước sạch. Số còn lại được cất đi.', 'A small sum of Ahn bought milk and clean water. What remained was put away.']
    ],
    kid: [
      ['Bạn dùng tiền dành dụm để có thêm bữa ăn trong tuần.', 'You spent your savings on a few more meals that week.'],
      ['Tiền cất trong túi áo vơi đi sau một đợt rét và vài ngày thiếu thức ăn.', 'The money in your coat thinned during a cold spell and several hungry days.']
    ],
    adult: [
      ['Bạn bớt tiền dành dụm để trả chỗ ngủ và bữa ăn tháng này.', 'You took from your savings to cover this month’s bed and meals.'],
      ['Khoản Ahn bạn giữ lại được dùng mua than sưởi và đồ ăn.', 'The Ahn you had kept aside went on fuel and food.']
    ]
  },
  nest_tuition: {
    baby: [
      ['Phí giữ chỗ trong Nest được trừ khỏi khoản tiền dành cho bạn.', 'The Nest residency fee came out of the money set aside for you.'],
      ['Hóa đơn chăm sóc trẻ và phí cư trú đến cùng một ngày.', 'The childcare bill and residency fee arrived on the same day.']
    ],
    kid: [
      ['Học phí và phí giữ thẻ cư dân Nest lấy bớt tiền dành dụm.', 'School fees and the cost of keeping a Nest pass took from your savings.'],
      ['Một lớp học mới bắt đầu; số Ahn cất trong nhà vơi đi.', 'A new class began, and the Ahn kept at home dwindled.']
    ],
    adult: [
      ['Học phí và phí cư trú Nest đến hạn cùng tháng.', 'Tuition and Nest residency fees came due in the same month.'],
      ['Bạn trả tiền cho một khóa học nữa để giữ chỗ trong chương trình.', 'You paid for another course to keep your place in the program.']
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
    kid: [
      ['Khói từ xưởng gần nhà khiến bạn ho suốt đường về.', 'Smoke from a nearby workshop makes you cough on the way home.'],
      ['Bạn phải đứng chờ ngoài cửa cho bớt khói mới vào phòng.', 'You wait outside for the smoke to thin before going indoors.']
    ],
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
  aging_early: {
    adult: [
      ['Sau những ngày dài, cơ thể bạn cần thêm thời gian hồi sức. Tuổi tác lấy đi {n} HP.', 'Your body needed more time to recover after long days. Age cost you {n} HP.'],
      ['Vết đau cũ trở lại mỗi khi trời lạnh. Sức khỏe giảm {n} HP vì tuổi tác.', 'Old aches returned in the cold. Age reduced your health by {n} HP.']
    ]
  },
  aging_late: {
    adult: [
      ['Đi hết cầu thang giờ phải dừng giữa chừng. Thể lực giảm {n} HP trong năm này.', 'You had to pause halfway up the stairs. Your physical health fell by {n} HP this year.'],
      ['Một đợt mệt kéo dài hơn trước dù bạn đã nghỉ. Tuổi già lấy đi {n} HP.', 'A spell of fatigue lasted longer despite the rest you took. Old age cost you {n} HP.']
    ]
  },
  aging_prosthetic: {
    adult: [
      ['Các khớp máy phải cân chỉnh lâu hơn sau mỗi lần vận động. Sức khỏe giảm {n} HP.', 'The prosthetic joints needed longer recalibration after exertion. Your health fell by {n} HP.'],
      ['Bộ điều khiển vẫn hoạt động, nhưng các khớp cũ phản hồi chậm hơn. Hao mòn lấy đi {n} HP.', 'The control system still worked, but older joints responded more slowly. Wear cost you {n} HP.']
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
