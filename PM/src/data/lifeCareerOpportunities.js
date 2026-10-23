const M = (id, need, vi, en, choices, ignore, extra = {}) => ({
  id, age: [18, 140], need, vi, en, choices, ignore, careerOpportunity: true,
  allowDistorted: Boolean(need.finger), tags: ['career', 'work'], ...extra
});
const C = (vi, en, rvi, ren, fx = {}, extra = {}) => ({ vi, en, rvi, ren, fx, ...extra });
const O = (w, rvi, ren, fx = {}) => ({ w, rvi, ren, fx });
const I = (vi, en, fx = {}) => ({ vi: 'Bỏ qua', en: 'Pass', rvi: vi, ren: en, fx });

export const LIFE_CAREER_OPPORTUNITIES = [
  M('m_career_thumb_ledger', { jobs: ['Syndicate'], finger: 'Thumb' },
    '[Sổ đạn của The Thumb] Kho đạn thiếu ba hộp. Capo bảo bạn kiểm lại sổ trước khi Sottocapo đến.',
    '[The Thumb ammunition ledger] Three boxes are missing. The Capo asks you to check the ledger before the Sottocapo arrives.', [
      C('Đối chiếu từng chữ ký', 'Check every signature', 'Bạn tìm ra người nhận nhầm. Capo giữ lại bản kiểm kê có tên bạn.', 'You found the mistaken recipient. The Capo kept the inventory under your name.', { merit: 4, rep: 2, sanity: -2 }),
      C('Nhận lỗi thay người giữ kho', 'Take the blame for the quartermaster', null, null, {}, { out: [
        O(60, 'Người giữ kho trả đạn trước hạn. Capo ghi nhận rằng bạn biết giữ kỷ luật trong đội.', 'The quartermaster returned the boxes in time. The Capo noted that you kept order in the unit.', { merit: 6, rep: 3, health: -3 }),
        O(40, 'Đạn không trở lại. Bạn chịu phạt thay người giữ kho.', 'The boxes never came back. You took the punishment meant for the quartermaster.', { health: -8, rep: -3, merit: -2 })
      ] })
    ], I('Bạn để Capo tự kiểm sổ. Tên bạn không có trong báo cáo.', 'The Capo checked the ledger himself. Your name did not appear in the report.'), { tags: ['career', 'thumb', 'syndicate'] }),

  M('m_career_index_prescript', { jobs: ['Syndicate'], finger: 'Index' },
    '[Phong thư chưa mở] Một Prescript cần được giao trước khi chuông nhà máy điểm ca mới. Tên người nhận bị nước làm nhòe.',
    '[The sealed envelope] A Prescript must arrive before the factory bell marks the next shift. Water has blurred the recipient’s name.', [
      C('Lần theo địa chỉ, không mở thư', 'Follow the address without opening it', 'Bạn giao nguyên dấu niêm. Người nhận xác nhận địa chỉ bằng một cái gật đầu.', 'You delivered the seal intact. The recipient confirmed the address with a nod.', { merit: 4, rep: 2, health: -2 }),
      C('Nhờ Proselyte khác xác nhận', 'Ask another Proselyte to confirm', null, null, {}, { out: [
        O(55, 'Hai người tìm đúng cửa trước hồi chuông. Người kia làm chứng cho bạn.', 'Together you found the right door before the bell. The other Proselyte vouched for you.', { merit: 5, network: 2, rep: 2 }),
        O(45, 'Bạn đến muộn một nhịp chuông. Người giao việc ghi lại giờ đến, không nói thêm.', 'You arrived one bell late. The courier recorded the time without another word.', { merit: -3, sanity: -5 })
      ] })
    ], I('Bạn trả lại phong thư. Nó được trao cho người khác.', 'You returned the envelope. Someone else carried it.'), { tags: ['career', 'index', 'syndicate'] }),

  M('m_career_middle_vengeance', { jobs: ['Syndicate'], finger: 'Middle' },
    '[Một dòng trong Book of Vengeance] Tên kẻ đánh người nhà của bạn vừa được ghi vào sổ. Hắn đang nấp trong một Office bỏ trống.',
    '[A line in the Book of Vengeance] The one who hurt your family has been entered in the book. He is hiding in an abandoned Office.', [
      C('Dẫn cả nhóm đi lấy người', 'Bring the family to retrieve him', 'Bạn giữ cửa sau. Không ai trong nhóm bị bỏ lại.', 'You held the back door. No one in your group was left behind.', { merit: 5, rep: 2, health: -4, heat: 4 }),
      C('Vào trước để tránh phục kích', 'Enter first to catch the ambush', null, null, {}, { out: [
        O(55, 'Bạn phát hiện dây bẫy và gọi người nhà lùi lại. Tên bạn được ghi bên cạnh món nợ đã trả.', 'You spotted the tripwire and called the family back. Your name went beside the settled debt.', { merit: 7, rep: 3, heat: 6 }),
        O(45, 'Dây bẫy quật bạn xuống sàn. Người nhà kéo bạn ra, còn món nợ vẫn mở.', 'The wire threw you to the floor. Your family pulled you out; the debt remained open.', { health: -12, sanity: -4, heat: 3 })
      ] })
    ], I('Người khác nhận món nợ trong sổ.', 'Someone else took the debt recorded in the book.'), { tags: ['career', 'middle', 'syndicate', 'danger'] }),

  M('m_career_ring_commission', { jobs: ['Syndicate'], finger: 'Ring', fingerRankAtMost: 1 },
    '[Khung tranh còn trống] Docent đưa bạn một phòng triển lãm bỏ không và một buổi chiều để sắp đặt tác phẩm.',
    '[The empty frame] A Docent gives you an unused gallery room and one afternoon to arrange a work.', [
      C('Dùng những vật bỏ lại trong phòng', 'Use what was left in the room', 'Docent dừng trước khung tranh lâu hơn những phòng khác. Ông ghi tên bạn vào danh sách phụ tá.', 'The Docent lingered at your frame. He wrote your name on the assistants’ list.', { merit: 4, rep: 2, sanity: -2 }),
      C('Đòi một phần ngân sách của buổi trưng bày', 'Ask for part of the exhibition budget', null, null, {}, { out: [
        O(55, 'Bạn dựng xong trước khi cửa mở. Khách trả tiền để được xem thêm một lượt.', 'You finished before the doors opened. Visitors paid for another viewing.', { merit: 5, rep: 3, wealth: 3 }),
        O(45, 'Docent xem hóa đơn rồi đóng cửa phòng bạn trước giờ khai mạc.', 'The Docent read the invoice and closed your room before the opening.', { wealth: -5, rep: -3, sanity: -4 })
      ] })
    ], I('Căn phòng được giao cho người khác.', 'The room went to another artist.'), { tags: ['career', 'ring', 'syndicate'] }),

  M('m_career_pinky_oath', { jobs: ['Syndicate'], finger: 'Pinky' },
    '[Người giữ lời] Một người cùng The Pinky đã hứa đưa hàng qua biên giới District. Đến giờ hẹn, anh ta vẫn chưa đến.',
    '[The one who gave his word] A Pinky member promised to carry a parcel across the District line. He has not arrived.', [
      C('Giữ điểm hẹn và báo đúng sự thật', 'Hold the meeting point and report the truth', 'Bạn đứng đó đến hết ca. Cấp trên ghi nhận bạn không rời vị trí.', 'You stayed until your shift ended. Your superior recorded that you had not left your post.', { merit: 4, rep: 2, sanity: -2 }),
      C('Mang hàng đi thay anh ta', 'Carry the parcel in his place', null, null, {}, { out: [
        O(55, 'Bạn giao hàng đúng hạn. Người kia trở về và xác nhận bạn đã giữ lời thay mình.', 'You delivered on time. He returned and confirmed that you kept his word for him.', { merit: 6, rep: 3, health: -4 }),
        O(45, 'Bạn bị chặn ở trạm kiểm soát. Hàng bị giữ, tên bạn bị ghi vào sổ.', 'The checkpoint stopped you. They kept the parcel and wrote down your name.', { health: -6, heat: 8, rep: -3 })
      ] })
    ], I('Bạn rời điểm hẹn. Hàng được chuyển vào ngày khác.', 'You left the meeting point. The parcel moved another day.'), { tags: ['career', 'pinky', 'syndicate'] }),

  M('m_career_wing_review', { jobs: ['Wing Employee'] },
    '[Bản đánh giá quý] Trưởng bộ phận để lại hai tập hồ sơ trên bàn: chỉ tiêu đã hoàn thành và yêu cầu bổ sung từ cấp trên.',
    '[Quarterly review] Your section head leaves two files on the desk: completed quotas and a new request from above.', [
      C('Gửi bản kết quả đúng số liệu', 'Submit the figures as recorded', 'Bản đánh giá được ký. Một đồng nghiệp chuyển bạn bản sao trước khi phòng nhân sự cất hồ sơ.', 'The review was signed. A colleague passed you a copy before personnel filed it.', { merit: 4, network: 3, sanity: -2 }),
      C('Nhận thêm ca để được người quản lý bảo trợ', 'Take another shift to earn a manager’s backing', null, null, {}, { out: [
        O(60, 'Bạn đạt chỉ tiêu và được đưa vào danh sách thưởng. Tên người quản lý nằm bên cạnh tên bạn.', 'You met the quota and made the bonus list. Your manager’s name appeared beside yours.', { merit: 6, wealth: 5, network: 3, health: -4 }),
        O(40, 'Ca thêm bị hủy vào phút cuối. Phòng nhân sự vẫn ghi bạn đã nhận trách nhiệm.', 'The extra shift was cancelled at the last minute. Personnel still marked you responsible for it.', { network: -4, sanity: -6, wealth: -2 })
      ] })
    ], I('Bạn để hồ sơ trên bàn đến hết ngày. Kỳ đánh giá khép lại.', 'You left the files untouched. The review closed without you.'), { tags: ['career', 'wing', 'quota'] }),

  M('m_career_wing_quota', { jobs: ['Wing Employee'] },
    '[Ca kiểm định cuối quý] Dây chuyền thiếu một người ký nghiệm thu. Nếu bạn ở lại, chỉ tiêu sẽ được ghi vào hồ sơ của bạn; máy vẫn đang chạy quá tải.',
    '[Quarter-end inspection] The line needs one more signature. Stay and the quota enters your record; the machinery is still running above its limit.', [
      C('Ở lại kiểm tra từng lô', 'Stay and inspect each batch', null, null, {}, { out: [
        O(65, 'Bạn phát hiện một lô lỗi trước khi niêm phong. Quản lý ký xác nhận phần việc của bạn; ca đêm lấy đi sức lực còn lại.', 'You caught a defective batch before sealing. The manager signed your record. The night shift took the rest of your strength.', { merit: 7, network: 2, health: -5, sanity: -3 }),
        O(35, 'Máy dừng giữa ca. Hồ sơ ghi bạn đã ở lại xử lý, nhưng chỉ tiêu quý vẫn hụt.', 'The line stopped mid-shift. The file records your work, but the quarter still misses its quota.', { merit: 2, wealth: -3, sanity: -5 })
      ] }),
      C('Bàn giao ca đúng giờ', 'Hand over at the end of your shift', 'Bạn ghi lại thông số cuối cùng và giao chìa khóa cho ca sau. Không ai cộng thêm chỉ tiêu vào tên bạn.', 'You recorded the final readings and handed over the key. No extra quota went under your name.', { sanity: 3 })
    ], I('Đèn kiểm định tắt khi bạn rời xưởng.', 'The inspection lamps went dark as you left.'), { tags: ['career', 'wing', 'quota'] }),

  M('m_career_wing_incident', { jobs: ['Wing Employee'] },
    '[Biên bản sự cố] Một thùng linh kiện bị niêm phong sai. Trưởng bộ phận đưa bạn bản biên bản trắng; ca trực của bạn sẽ phải giải trình nếu không tìm ra lô hàng.',
    '[Incident report] A crate of components bears the wrong seal. Your section head hands you a blank report. Your shift will answer for it unless the batch is found.', [
      C('Lần theo sổ giao nhận và báo đúng sự việc', 'Trace the transfer ledger and report the facts', null, null, {}, { out: [
        O(60, 'Bạn tìm thấy lô hàng trong kho phụ. Biên bản được đóng dấu, còn tên bạn được ghi vào kỳ đánh giá.', 'You found the batch in an auxiliary store. The report was stamped, and your name entered the review.', { merit: 6, network: 3, sanity: -3 }),
        O(40, 'Sổ giao nhận thiếu một trang. Bạn nộp phần còn lại, nhận trách nhiệm về ca trực và giữ lại bản sao.', 'A page was missing from the ledger. You filed what remained, took responsibility for your shift, and kept a copy.', { merit: 2, network: -3, sanity: -4 })
      ] }),
      C('Ký theo bản tường trình của cấp trên', 'Sign the account prepared by your superior', 'Hồ sơ khép lại trước giờ tan ca. Bạn nhận phụ cấp, nhưng biên bản không ghi ai đã đổi dấu niêm phong.', 'The file closed before the shift ended. You received an allowance. It says nothing about who changed the seal.', { wealth: 4, network: 1, sanity: -4 })
    ], I('Ca sau nhận thùng hàng và bản biên bản còn trống.', 'The next shift inherited the crate and the blank report.'), { tags: ['career', 'wing', 'report'] }),

  M('m_career_thumb_apex_tribute', { jobs: ['Syndicate'], finger: 'Thumb', fingerRankAtLeast: 3 },
    '[Cống nạp định kỳ cho Underboss] Các Capo dưới quyền mang sổ thu phế từ các chợ súng và sòng bạc trong quận lên trình diện bạn.',
    '[Periodic Tribute to the Underboss] Your Capos present the protection ledgers from the District’s gun markets and casinos.', [
      C('Thu tiền cống nạp vào két sắt Underboss', 'Collect the tribute into the Underboss vault', 'Các rương tiền mặt được kiểm đếm đủ không thiếu một đồng. Uy quyền của bạn giữ cho cả khu phố răm rắp nghe lệnh.', 'Every chest of Ahn was counted in full. Your authority kept the entire District in line.', { wealth: 16, rep: 5, merit: 6 }),
      C('Chi 12 Ahn thưởng đạn đặc chế và mở tiệc khao quân đoàn Capo', 'Spend 12 Ahn on custom rounds and a feast for your Capo regiment', 'Cả quân đoàn reo hò vang dậy. Mọi mệt mỏi và sức ép truy nã đều giảm hẳn.', 'The regiment roared in salute. Fatigue and bounty pressure melted away.', { health: 10, sanity: 10, rep: 8, network: 6, heat: -12 }, { costAhn: 12 })
    ], I('Bạn giao cho Sottocapo thân tín xử lý sổ sách kỳ này.', 'You delegated the ledgers to a trusted Sottocapo.', { wealth: 6, rep: 2 }), { tags: ['career', 'thumb', 'syndicate'] }),

  M('m_career_index_apex_tribute', { jobs: ['Syndicate'], finger: 'Index', fingerRankAtLeast: 3 },
    '[Hiến lễ tại Thánh Điện Khung Cửi] Các thương hội được The Index bảo hộ mang lễ vật và vàng bạc đến đặt trước thềm đá của Weaver.',
    '[Offerings at the Loom Sanctum] Merchant guilds under Index protection lay gold and offerings before the Weaver’s stone dais.', [
      C('Tiếp nhận hiến lễ và ban phát Prescript mới', 'Accept the offerings and issue new Prescripts', 'Kho quỹ của Thánh Điện đầy ắp Ahn, còn tiếng tăm của Weaver ngày càng vang xa.', 'The Sanctum treasury filled with Ahn as the Weaver’s renown spread.', { wealth: 16, rep: 5, resonance: 4, merit: 6 }),
      C('Chi 12 Ahn bảo dưỡng con lắc cộng hưởng và ban thưởng cho các Proxy', 'Spend 12 Ahn to tune the resonance pendulums and reward your Proxies', 'Âm thanh Khung Cửi ngân vang êm dịu giúp tâm trí bạn thanh thản và gắn kết toàn nhánh.', 'The soothing hum of the Loom calmed your mind and unified the branch.', { sanity: 12, health: 8, rep: 7, resonance: 6, heat: -10 }, { costAhn: 12 })
    ], I('Bạn để các Proxy tự phân bổ lễ vật vào kho chung.', 'You let the Proxies allocate the offerings to the common vault.', { wealth: 6, sanity: 2 }), { tags: ['career', 'index', 'syndicate'] }),

  M('m_career_middle_apex_tribute', { jobs: ['Syndicate'], finger: 'Middle', fingerRankAtLeast: 3 },
    '[Tiền chuộc tội trước Book of Vengeance] Một thương đoàn từng lỡ lời với người nhà của The Middle mang rương tiền mặt đến cầu xin Great Sibling tha thứ.',
    '[Atonement Before the Book of Vengeance] A merchant consortium that slighted a Middle member brings a chest of Ahn begging the Great Sibling’s pardon.', [
      C('Nhận tiền bồi thường danh dự gia tộc', 'Accept the family honor indemnity', 'Bạn đóng dấu xóa nợ. Số tiền lớn chảy vào quỹ riêng của Great Sibling.', 'You stamped the debt settled. A handsome sum flowed into the Great Sibling’s coffers.', { wealth: 16, rep: 6, merit: 6 }),
      C('Chi 12 Ahn mở đại tiệc toàn gia đình và tặng trang sức vàng cho đàn em', 'Spend 12 Ahn on a grand family banquet and gold chains for the crew', 'Tình huynh đệ nồng ấm giúp bạn hồi phục cả thể lực lẫn tinh thần.', 'Warm family camaraderie restored both your vigor and spirits.', { health: 12, sanity: 12, rep: 7, network: 6 }, { costAhn: 12 })
    ], I('Bạn giao cho một Big Sibling thu nhận và xử lý theo lệ thường.', 'You let a Big Sibling handle the settlement as customary.', { wealth: 6, rep: 2 }), { tags: ['career', 'middle', 'syndicate'] }),

  M('m_career_ring_apex_tribute', { jobs: ['Syndicate'], finger: 'Ring', fingerRankAtLeast: 3 },
    '[Tiền bản quyền và đấu giá của Grand Curator] Các phòng tranh khắp vùng Nest và Backstreets gửi tiền hoa hồng định kỳ lên ngai vàng của bạn.',
    '[Royalties and Auction Dividends of the Grand Curator] Galleries across the Nest and Backstreets remit periodic royalties to your throne.', [
      C('Thu toàn bộ tiền bản quyền và phí thẩm định', 'Collect all royalties and appraisal fees', 'Những tấm ngân phiếu vàng từ giới thượng lưu chảy thẳng vào két sắt của Grand Curator.', 'Golden bank drafts from the elite flowed straight into the Grand Curator’s safe.', { wealth: 18, rep: 5, merit: 6 }),
      C('Chi 12 Ahn mở đêm nhạc giao hưởng riêng và sưu tầm rượu quý', 'Spend 12 Ahn on a private chamber symphony and rare vintage collection', 'Đêm nhạc tuyệt mỹ rửa sạch mọi căng thẳng và mang lại nguồn cảm hứng lớn.', 'The exquisite performance washed away all tension and sparked deep inspiration.', { sanity: 14, health: 8, resonance: 6, rep: 6, heat: -10 }, { costAhn: 12 })
    ], I('Bạn chuyển khoản hoa hồng vào quỹ học bổng cho các Docent trẻ.', 'You channeled the royalties into a fellowship fund for young Docents.', { wealth: 6, rep: 4 }), { tags: ['career', 'ring', 'syndicate'] }),

  M('m_career_pinky_apex_tribute', { jobs: ['Syndicate'], finger: 'Pinky', fingerRankAtLeast: 3 },
    '[Cổ tức mật ước trình lên Sovereign] Các trạm giao dịch ngầm trên khắp 26 District gửi báo cáo lợi nhuận và phong bì mật lên tháp chuông của bạn.',
    '[Shadow Pact Dividends for the Sovereign] Covert trading posts across all 26 Districts remit profit ledgers and sealed envelopes to your bell tower.', [
      C('Thu cổ tức chợ đen và phí bảo mật', 'Collect the black-market dividends and secrecy fees', 'Tài khoản mật của Sovereign tăng vọt mà không để lại bất kỳ dấu vết nào.', 'The Sovereign’s secret accounts swelled without leaving a trace.', { wealth: 17, network: 6, rep: 4, merit: 6 }),
      C('Chi 12 Ahn củng cố mạng lưới ẩn danh và chăm sóc y tế cao cấp', 'Spend 12 Ahn to reinforce covert safehouses and private medical care', 'Bạn nghỉ ngơi an toàn tuyệt đối giữa vòng bảo vệ của Thập Đao.', 'You rested in absolute security encircled by the Ten Blades.', { health: 10, sanity: 10, network: 8, heat: -16 }, { costAhn: 12 })
    ], I('Bạn để quỹ mật tự xoay vòng cho các phi vụ tháng sau.', 'You let the covert fund roll over into next month’s operations.', { wealth: 6, network: 3 }), { tags: ['career', 'pinky', 'syndicate'] })
];
