# Rà soát lời kể sự kiện — 05/11/2026

## Phạm vi và cách đọc kết quả

Rà soát bằng cách nạp toàn bộ pool sự kiện đang được engine sử dụng: 797 sự kiện lớn, 44 hệ quả, 866 sự kiện nhỏ, 643 dòng thường ngày và 36 hợp đồng Fixer. Đây là kiểm tra cấu trúc trên toàn kho, kết hợp đọc và sửa thủ công những điểm sai ngữ cảnh được phát hiện. Con số 500 ở cuối `npm test` là 500 khoảnh khắc mô phỏng, **không** có nghĩa mọi câu chữ đã được một người đọc lại bằng mắt trong 500 lượt chơi.

Tham chiếu phong cách: lời kể đặt hành động và hậu quả cụ thể trước câu bình luận, theo hướng dẫn giọng văn trong `UNIVERSE.md`. Cách tách lựa chọn thành hệ quả thực được tham khảo ở ghi chép thiết kế của tác giả *Roadwarden*; không chép câu văn từ game khác. Ưu tiên tên riêng và quan hệ trong lore Project Moon, nhưng không gán thuật ngữ của một Finger cho Syndicate độc lập.

Nguồn đối chiếu: [ghi chép thiết kế của tác giả Roadwarden](https://store.steampowered.com/news/posts/?appgroupname=Roadwarden&appids=1155970&enddate=1677589757&feed=steam_community_announcements) về lựa chọn, quan hệ và những đường truyện bị đóng/mở; [trang chính thức Library of Ruina](https://store.steampowered.com/app/1256670/Library_Of_Ruina/) để đối chiếu bối cảnh và cách giới thiệu trò chơi.

## Đã kiểm định và sửa

| Vấn đề | Kết quả |
| --- | --- |
| Thiếu lời kể cho nhánh thành công/thất bại | 2 nhánh nghề nghiệp ở `ad_career_crossroad_18` dùng câu ở lựa chọn làm lời kể dự phòng. Đã viết kết quả riêng cho Syndicate và Wing; nhánh trượt vẫn có hậu quả riêng. |
| Lựa chọn “bỏ qua” thiếu đoạn kết | 7 callback sẹo có `ignore.vi/en` nhưng thiếu `ignore.rvi/ren` mà engine đọc. Đã tách nhãn và lời kết đúng cấu trúc. |
| Gọi người tuyển dụng Syndicate là “Capo” | Đã thay bằng người giữ sổ của băng địa phương. Capo là chức danh của Thumb; lựa chọn này không gia nhập Thumb. |
| Nest mặc định có gia đình | `ad_nest_crossroad_18` giờ nói về người bảo lãnh, người tuyển dụng, nơi ở và thẻ qua cổng; dùng được cả với xuất thân mồ côi trong Nest. Cả kết quả đỗ/trượt được rút gọn. |
| Tuổi nhỏ mặc định còn cha mẹ | Sự kiện ống nước, nhặt Ahn, tờ Prescript và ôn thi đã bỏ giả định cha/mẹ luôn có mặt. |
| Giá hiển thị khác tiền bị trừ | Bộ đề Wing nay ghi 4 Ahn và có `costAhn: 4`; cứu chó ở phòng khám có `costAhn: 2`. Engine, khóa lựa chọn và preview cùng dùng số này. |
| Kết quả hứa quá khả năng hệ thống | Cứu chó không còn hứa nó theo nhân vật mãi mãi khi dữ liệu chỉ lưu ký ức. Lời kể con chó, bài thi Wing và tuyển dụng Hook/Shi đã giảm cường điệu và đồng bộ Việt/Anh. |

`lint_story.mjs` giờ kiểm tra kết quả Việt/Anh cho từng lựa chọn, từng nhánh ngẫu nhiên và từng lựa chọn bỏ qua; nhiều nhánh phải có lời kết riêng và không được trùng nguyên văn. Hiện có **0 lỗi, 0 cảnh báo**. 2.069 lựa chọn ở pool lớn, 77 lựa chọn hệ quả và 1.810 lựa chọn nhỏ đều có lời kết sau khi tính nhánh; 301 + 4 + 481 lựa chọn có nhiều kết quả ngẫu nhiên không dùng chung nguyên văn.

`voice_lint.mjs` kiểm tra 33.719 chuỗi: 0 vi phạm các quy tắc hiện có. Kiểm tra độ dài trên 100 mục xuất hiện nhiều nhất trong mô phỏng 150 đời: 0 mục vượt chuẩn 1–2 câu của bộ kiểm thử. `npm test`, gồm mô phỏng 500 khoảnh khắc, và `npm run build` đều qua.

## Phần còn cần biên tập bằng tay

Các ngưỡng dưới đây là **cờ biên tập**, không phải lỗi engine. Đếm theo từ tiếng Việt, bỏ tiêu đề trong ngoặc vuông; không nên tự động cắt vì sẽ làm mất điều kiện hoặc quan hệ nhân quả.

| Nhóm | Số mục vượt ngưỡng | Ưu tiên xử lý |
| --- | ---: | --- |
| Tình huống lớn >80 từ | 0/797 sau lượt biên tập thứ hai | Hai lời mời Ensemble đã được rút mà vẫn giữ các điều kiện sống/chết và quyền từ chối. |
| Kết quả lớn >55 từ | 0 đoạn sau lượt biên tập thứ hai | Đã rút lời thăng tiến Finger, Prescript, quest NPC, Color/E.G.O và một số biến thể lore. Ngưỡng chỉ đo độ dài, không chứng minh câu nào cũng hay. |
| Tình huống nhỏ >60 từ | 0/866 | Ngưỡng 45 từ trước đó gắn cờ nhiều đoạn 46–58 từ vốn vẫn vừa một thẻ; giữ cảnh có hành động và hậu quả rõ. |
| Dòng thường ngày >60 từ | 0/643 | Rút các dòng dài và bỏ giả định nhân vật nào cũng có cha, thủ lĩnh Syndicate hay đã phạm tội. |

Ngoài các giới hạn văn bản, cần tiếp tục kiểm bằng tay các câu nhắc quan hệ gia đình trong các pool khác: lint hiện hiểu vai NPC được gắn cờ, chưa suy ra mọi tình trạng cha mẹ của từng xuất thân. Các event được sửa ở lượt này là những trường hợp đã xác nhận, không phải bằng chứng mọi giả định thân nhân trong hơn 2.000 mục đều đúng. Thử bằng seed mồ côi/Nest, không Ahn và nhiều năm liên tiếp vẫn là bước QA cần làm khi chỉnh thêm nội dung.

## Lượt biên tập thứ hai

`node tools/lint/audit_event_prose.mjs` xuất bảng từng ID qua `--json`, đếm tình huống, lựa chọn, nhánh kết quả và gắn cờ đoạn quá dài hoặc bản Anh dài hơn bản Việt bất thường. Kết quả hiện tại: 797 sự kiện lớn (2.070 lựa chọn, 618 nhánh ngẫu nhiên), 44 hệ quả (77 lựa chọn), 866 sự kiện nhỏ (1.810 lựa chọn, 962 nhánh ngẫu nhiên), 643 dòng thường ngày; **0 cờ biên tập theo các ngưỡng hiện tại**. Đây là sàng lọc toàn kho, không thay thế việc đọc thủ công từng nhánh.

Những đoạn đã đọc và sửa thêm bằng tay: lời thăng Capo/Messenger/Proxy; Prescript đòi 20 Ahn và kết quả khớp phí; cảnh bí mật Wing và dọn khoang W Corp; Ring, La Mancha, Blade Lineage, Sweeper, Distortion Detective; các quest bạn bè, nợ bạc, ốm đau, bắt cóc; hai lời mời Ensemble; một số tình huống Finger, Workshop và đời thường. Những bản Anh được rút để giữ cùng hành động, người liên quan và hậu quả với bản Việt. Ở Prescript của Index, phương án thứ hai giờ vẫn thi hành mệnh lệnh, không còn kết quả vô cớ thoát hình phạt đã nêu. Ba kết quả của quest nợ bạc đã bỏ những hình ảnh và lời hứa không có trong bản Việt.

Kiểm tra giá ghi trong lời chọn so với `costAhn` đã phát hiện và sửa các khoản 2, 3, 5, 10, 15, 20, 35, 40 và 42 Ahn. Trường hợp vợ/chồng ốm có thêm đường hỏi điều dưỡng miễn phí khi người chơi không đủ tiền. `lint_story.mjs` bắt lỗi giá ghi rõ nhưng phí cơ chế không khớp. Kiểm tra tự động chỉ bắt được giá theo mẫu câu phổ biến; những cách diễn đạt gián tiếp vẫn cần đọc bằng tay.

**Phạm vi chưa thể tuyên bố hoàn tất:** toàn kho có hơn 2.300 mục và hàng nghìn nhánh, khoảng 287 nghìn từ Việt cùng 247 nghìn từ Anh. Lượt này kiểm tra cấu trúc, độ dài và các trường hợp lệch rõ rệt trên toàn kho, rồi biên tập thủ công các mục được nêu ở trên. Chưa có bằng chứng mỗi câu của mọi nhánh đã được người đọc duyệt riêng, hoặc mọi chi tiết lore đều được xác nhận từ nguồn gốc. Các lần biên tập sau nên chia theo pool và ghi ID đã đọc, đặc biệt kiểm tra lời kể có giả định về gia đình, giới tính, nghề, District và trạng thái NPC.

Sau các sửa: `npm test` qua, gồm 500 khoảnh khắc mô phỏng và 0 lỗi trong năm nhóm toàn vẹn; `npm run build` qua. Sau khi chỉnh thêm quest nợ bạc, chạy lại `lint_story.mjs`, `voice_lint.mjs --fail` và công cụ audit prose: đều qua, 0 cờ biên tập.

## Quy tắc viết tiếp

1. Tình huống: một chi tiết ở địa điểm, một sức ép hoặc câu hỏi. Không nhắc lại toàn bộ tiền sử nhân vật trong mỗi event.
2. Lựa chọn: nói rõ hành động và giá nếu có. Nếu không đủ Ahn, giao diện phải khóa đúng với engine.
3. Kết quả: mỗi nhánh thành công, thất bại hoặc bỏ qua có một việc đã xảy ra và hậu quả nhìn thấy được. Không hứa NPC, đồ vật hay cờ vĩnh viễn nếu hệ thống không lưu chúng.
4. Dùng đúng chức danh theo tổ chức. Không biến Syndicate địa phương thành Thumb/Index/Wing chỉ bằng một từ trong lời kể.
5. Kiểm bản tiếng Anh cùng lúc với bản Việt: hành động, người liên quan và hệ quả phải khớp, không chỉ cùng sắc thái.

## Lượt biên tập thứ ba — 06/11/2026

Lượt này bắt đầu đọc thủ công theo cụm, không xem các lượt lint trước là bằng chứng đã duyệt toàn kho. Đã sửa 10 event ở 4 nhóm nguồn; ID và hiệu ứng giữ nguyên, ngoại trừ việc bổ sung một lựa chọn rút lui để tránh khóa lựa chọn trong event Wing.

| Pool / file | ID đã đọc và chỉnh | Trọng tâm |
| --- | --- | --- |
| Major / `src/data/eventsFactions.js` | `syn_choose_finger_allegiance` | Bỏ vật phẩm không được cấp; sửa thất bại thành hệ quả của nghi thức tuyển mộ; giảm lời thoại kịch hóa và làm rõ cái giá của độc lập. |
| Wing / `src/data/eventsWingParityExpansion.js` | `wing_arc_corporate_patent_warfare` | Rút phần mở, làm kết quả khớp hành động, bỏ lời khẳng định thị phần/vi phạm Taboo không được hệ thống biểu diễn; thêm lựa chọn dừng đàm phán với mất Standing/Leverage và cờ kết thúc event. |
| Minor / `src/data/lifeMinors3.js` | `m3_e_blackout`, `m3_o_fine_print`, `m3_dist_fixers`, `m3_dist_old_home` | Sửa câu quá cường điệu; bỏ giả định mọi Distortion đều mất khả năng nói, giả định gia đình còn sống/chờ sẵn, và hậu quả kéo dài không có cờ lưu; giữ lời kể bám hiệu ứng và khả năng engine. |
| Daily / `src/data/lifeDailies.js` | `c_out_stories`, `t_nest_party`, `a_any_warp`, `r_u_lake` | Thay lời khái quát bằng chi tiết tại chỗ; làm cảnh Nest và Great Lake cụ thể hơn; sửa chuyến WARP để đồng hồ chỉ mười giây thay vì mô tả đó là thời gian cảm nhận. |

### Quy trình biên tập áp dụng

1. Giữ nguyên ID, điều kiện, trọng số, hiệu ứng và cờ; chỉ đổi chúng khi câu chuyện không thể hợp lý với logic hiện có.
2. Với mỗi lựa chọn, so hành động trong nhãn với kết quả, nhánh xác suất, Ahn bị trừ, và trạng thái NPC/vật phẩm được lưu. Bỏ lời hứa về đồ vật, quan hệ vĩnh viễn hoặc hành vi NPC nếu engine không ghi nhận.
3. Viết kết quả theo điều người chơi vừa làm. Nhánh trượt vẫn có diễn biến riêng, không chỉ lặp lại câu “thất bại”; nhánh bỏ qua cũng không phán xét thay nhân vật.
4. Dùng một chi tiết có thể nhìn hoặc nghe được thay cho các cụm như “điên loạn”, “định mệnh”, “tột cùng” và lời bình luận giải thích cảm xúc.
5. Bản Anh giữ nguyên người thực hiện, hành động và hậu quả của bản Việt; không thêm vũ khí, chức danh hay lời hứa riêng chỉ có ở một ngôn ngữ.

### Các lô còn lại

Phạm vi cũ của `audit_event_prose.mjs` vẫn chỉ là bốn pool major/consequence/minor/daily. Nó chưa bao gồm đầy đủ Request, các hợp đồng nghề, mở đầu xuất thân, lời kết đời, biến thể NPC và dungeon. Vì vậy phần dưới đây là kế hoạch đọc, không phải danh sách lỗi đã xác nhận:

| Lô | Nguồn cần đọc | Câu hỏi cần giải quyết |
| --- | --- | --- |
| A — Vòng đời nhân vật | `birthStories.js`, `eventsBackgroundOpening.js`, `lifeEndings.js`, `yearEndLines.js` | Xuất thân có khớp nơi sinh/tuổi/gia đình không; lời kết có dựa trên nghề, NPC, E.G.O hoặc Color thực sự đã đạt không; hình phạt tuổi cao có đúng số liệu engine không. |
| B — Dungeon | `dungeonText.js`, `dungeonSignatureText.js`, `dungeonExtras.js`, `dungeonGauntlets.js`, `dungeonEnsemble.js`, `dungeonClaw.js`, `eventsAbnormalityFieldwork.js` | Mỗi lựa chọn có kết quả rõ; thất bại không hứa thắng; kẻ địch và phần thưởng có đúng loại; sự kiện nối tiếp có thể xảy ra theo đúng tiến độ tầng. |
| C — Nghề và hợp đồng | `careerContracts*.js`, `careerContractTemplates.js`, `annualMeritOpportunities.js`, `eventsFixer*.js`, `eventsWing*.js` | Cấp bậc, tên chức vụ, chi phí, yêu cầu và phần thưởng có khớp; event không đưa sự nghiệp vượt cấp hoặc lặp vô hạn; nhân viên Wing có lựa chọn nội bộ phù hợp. |
| D — Five Fingers và Syndicate | `eventsFinger*.js`, `eventsFactions.js`, `fingerKit.js` | Dùng đúng chức danh từng Finger; Prescript và quy tắc không bị gán nhầm; tuyển mộ, thăng cấp và rời băng có diễn biến tương xứng. |
| E — Distortion / E.G.O / Color | `eventsDistortion*.js`, `eventsEgo*.js`, `eventsColor*.js`, `eventsApexTwilight.js` | E.G.O không tự động hóa Distortion; phân biệt thử thức tỉnh, kết quả dở dang và lựa chọn từ chối; Colour/Star không được phong chỉ bằng một câu thoại nếu điều kiện game chưa đạt. |
| F — NPC và ký ức | `eventsCompanionQuests.js`, `lifeNpcCallbacks.js`, `lifeScarCallbacks.js`, `eventsBereavementMemories.js`, `eventsNpcAndWorldExpansion.js` | NPC còn sống/còn quan hệ khi được gọi; callback chỉ nhắc ký ức đã ghi; thoại không giả định người thân, tên, giới tính hoặc lời hứa ngoài dữ liệu. |
| G — Workshop, vật phẩm, đời thường | `eventsWorkshop*.js`, `itemsData.js`, `lifeMinors*.js`, `lifeDailies.js` | Giá và vật phẩm khớp; lựa chọn có tác dụng nhìn thấy; tránh lặp mô-típ/câu văn, nhưng giữ riêng bối cảnh District và Wing. |
| H — Hệ quả và ngôn ngữ kép | `eventsRouteConsequences.js`, `eventsChildhood*.js`, `eventsLineageLegacy.js`, các pool chưa kiểm ở A–G | Điều kiện event theo sau đúng sự kiện gốc; bản Anh và Việt không lệch diễn biến; mỗi nhánh thành công/thất bại/bỏ qua được đọc riêng. |

Tham khảo cách tổ chức nhánh và phản ứng của thế giới ở [Roadwarden — ghi chép của nhà phát triển](https://store.steampowered.com/news/posts/?appgroupname=Roadwarden&appids=1155970&enddate=1677589757&feed=steam_community_announcements), [Disco Elysium — Choose Your Own Misadventure](https://store.steampowered.com/news/posts/?appids=632470&enddate=1568813427), và [GDC — Player Agency, Politics, and Narrative Design](https://gdconf.com/article/player-agency-politics-and-narrative-design-in-disco-elysium/). Áp dụng ở mức nguyên tắc: hậu quả trượt vẫn là diễn biến chơi được, người chơi hiểu giới hạn lựa chọn, và sự kiện sau phản ứng với việc đã xảy ra; không mượn câu chữ hoặc giọng riêng của các game đó.

**Trạng thái:** đang thực hiện theo lô. Mười ID phía trên đã được biên tập thủ công; các lô A–H chưa được đọc đầy đủ trong lượt này. Chưa chạy test hay build ở lượt này. Không tuyên bố đã rà soát xong toàn bộ kịch bản.

## Lượt biên tập thứ tư — vòng đời và mở đầu xuất thân

Đã đọc cách `composeBirth` ghép ngẫu nhiên nơi sinh, gia đình, đêm chào đời, điềm báo và bạn cùng tuổi; đối chiếu `yearLine` với các giai đoạn tuổi và `closeLifeByChoice` với trạng thái engine. Vì các mảnh sinh ra ghép độc lập, một câu đúng khi đứng riêng vẫn có thể sai trong tổ hợp khác.

| Nguồn | Phần đã sửa | Lý do cụ thể |
| --- | --- | --- |
| `src/data/birthStories.js` | Toàn bộ `PLACE.nest`, `PLACE.back`, `PLACE.out`; cả 16 biến thể `THAT_NIGHT`; 24 dòng thuộc 6 nhóm `OMEN_LINE`; `FRIEND_LINE`, `OUTSKIRTS_FRIEND`, 4 dòng `OUTSKIRTS_OMEN`; các nhóm `FAMILY.smoke_war_veteran`, `.fixer_lineage`, `.syndicate_soldato`, `.wing_executive`, `.warp_cleaner_offspring` và một số dòng lẻ | Bỏ lời tiên tri chắc chắn về tương lai, cha/mẹ mặc định, lời khẳng định mọi Feather là quản lý Wing, mọi nhà thuộc Five Fingers đều dùng cấp Thumb, và đồ vật được hứa ở tuổi trưởng thành khi engine không lưu. Sửa đoạn không có bạn thành chưa có bạn ở thời điểm sinh. |
| `src/data/yearEndLines.js` | `child_friction`, `nest_tuition`, `heal_natural`, `heal_nest`, `calm_bond`, `heal_distortion_tissue`, `smog` | Thêm lời riêng cho em bé/trẻ em ở những lý do trước đó rơi về bản người lớn; bỏ giả định mọi nhân vật có cha mẹ, mọi quan hệ là gia đình hoặc mọi cư dân Nest có bảo hiểm y tế; tránh giải thích chữa lành Distortion bằng một quy luật Carmen không được lore xác nhận. |
| `src/data/lifeEndings.js` | `wander`, `retired`, `last_bout`, `sealed_seat`, `struck_roll`, `walked_out` | Engine chốt đời ngay khi chọn, nên kết lời không được kể chắc chắn nhiều năm sau hoặc hứa thay đổi thế giới mà run không mô phỏng. |
| `src/data/eventsBackgroundOpening.js` | Cả 12 ID `ev_open_*` | Sửa hành động quá sức trẻ 2–3 tuổi, giả định cha/mẹ còn sống, phần thưởng Ahn không có nguồn, vật phẩm về sau không lưu trong state, nghi thức riêng Thumb gán cho mọi Five Fingers, và Taboo được cộng dù không mô tả vi phạm lệnh cấm của The Head. |

### Các thay đổi điều kiện và hiệu ứng cần nhớ

- `ev_open_outskirts_beast_stalk`: tuổi 2–6 thành 4–6. `ev_open_bistro_kitchen_fire` và `ev_open_prosthetic_spark_wire`: tuổi 3–7 thành 6–7. `ev_open_orphan_garbage_pile`: tuổi 2–6 thành 4–6. Các nhánh trẻ tự dùng chảo dầu, thao tác trong ca phẫu thuật hoặc kiếm đồ sau giờ Sweeper không còn xuất hiện ở tuổi không đủ khả năng làm việc đó.
- `ev_open_nest_quota_exam`: lựa chọn ghi âm gian lận đổi `taboo:+1` thành `network:+2`; hành động đó không phải một vi phạm Taboo của The Head. `ev_open_wing_elite_tutelage`: bỏ `taboo:+1` ở lựa chọn vào chương trình nghiên cứu vì cảnh không nêu Taboo nào bị phạm. `ev_open_warp_curtain_peek`: bỏ `taboo:+1` ở lựa chọn nhặt đồng hồ; hành vi trộm vẫn được kể, nhưng không bị gán nhầm thành Head Taboo.
- `ev_open_syndicate_tribute_knock`: cờ `KỷVậtCapo` đổi thành `KỷVậtSyndicate` để khớp xuất thân Five Fingers chung. Tại thời điểm sửa, tìm kiếm trong `src`, `tools` và `package.json` không thấy nơi tiêu thụ cờ cũ; nếu save cũ cần đọc lại cờ này về sau, phải tính migration trước khi thêm consumer.
- Các thay đổi khác trong lô này giữ ID event, cờ và hiệu ứng. Kết quả mới giải thích nguồn Ahn hoặc lý do nhận Rep/Network thay vì chỉ công bố con số trong HUD.

### Đã kiểm và còn thiếu

`lint_story.mjs`: 797 major, 44 consequence, 866 minor, 643 daily, 36 contract, 0 lỗi và 0 cảnh báo. `voice_lint.mjs --fail`: 33.768 chuỗi, không có cờ vi phạm. `test_first_life_birth.mjs` và `test_early_years_reading.mjs` qua; `node --check` đối với `eventsBackgroundOpening.js` qua; `git diff --check` không có lỗi khoảng trắng. Đây là kiểm tra cấu trúc/giọng và hai phép đo về năm đầu, không phải kiểm chứng thủ công mọi tổ hợp kịch bản.

**Tiếp tục lô A:** còn các đoạn `FAMILY`, `OUTSKIRTS_NIGHT`, hai dòng `OUTSKIRTS_OMEN`, các nhóm `yearEndLines` khác và ba lời kết chết chưa duyệt hết. Sau đó mới đến lô B–H theo bảng trên. Chưa tuyên bố toàn bộ event đã được biên tập.

## Lượt biên tập thứ năm — hoàn tất lượt đọc nguồn vòng đời, bắt đầu đoạn cuối sự nghiệp

Đã đọc tiếp toàn bộ mảng `FAMILY` trong `birthStories.js`, ba dòng `OUTSKIRTS_NIGHT`, sáu điềm Outskirts, toàn bộ khóa trong `yearEndLines.js` và chín dạng `LIFE_ENDINGS`. Đây là lượt đọc mã nguồn theo từng biến thể; **chưa phải phép kiểm thủ công mọi tổ hợp ngẫu nhiên** giữa các mảng, vùng sinh, đời kế và năm sống.

| Nguồn | Sửa đổi | Điều kiện hoặc diễn biến đã đối chiếu |
| --- | --- | --- |
| `src/data/birthStories.js` | Viết lại các nhóm gia cảnh còn lại: mồ côi, nhà làm công, Workshop, Feather, Dieci, Great Lake, quán mì, phòng khám chân tay giả, Outskirts | Mảnh gia cảnh xuất hiện ngay lúc sinh, nên bỏ đoạn kể chắc chắn chuyện học, nghề hay vật phẩm của nhiều năm sau. Không gán mọi gia đình Great Lake cho District 21 vì trọng số thấp vẫn cho phép sinh ở District khác. Bản Anh và Việt nói cùng một cảnh. |
| `src/engine/gameEngine.js` | Khi đời kế là con ruột và người đi trước còn sống ở lúc sinh, bộ chọn gia cảnh loại `orphan` và `dieci_orphan`, kể cả khi chọn trực tiếp hoặc sinh ở vùng Fallen Wing | Trước đó log đời kế khẳng định cha/mẹ còn sống nhưng đoạn gia cảnh cùng log có thể viết “không biết cha mẹ”. Giữ các trường hợp người kế thừa không phải con ruột như cũ. |
| `src/data/yearEndLines.js` | Thêm lời cho em bé/trẻ em ở `drift_resonance`, `drift_network`, `drift_rep`; thêm lời khám Nest theo tuổi ở lượt trước | `driftOf` vẫn có thể trừ Network/Rep ngay ở tuổi 0–3; bản cũ rơi về lời người lớn về bạn bè nghề nghiệp, thành tích cũ. Các dòng mới mô tả cách người quanh đứa trẻ thưa dần, không giả vờ trẻ sơ sinh có nghiệp vụ. |
| `src/data/lifeEndings.js` | Sửa `wander`, `retired`, `usurped`, `purged`, `ripe_age` | `wander` dùng cả Color và Finger nên không mặc định vượt tường The City; `retired` không mặc định có người kế nhiệm đã ghi sổ; `purged` không kể lại nguyên tình huống và ngầm kéo dài run; `usurped` không mặc định người chơi tin đối thủ từ trước. |
| `src/data/eventsApexTwilight.js` | Sửa sáu lời mời kéo dài tuổi thọ, năm event soán quyền của Finger, hai event ra đi, và các kết quả Color về hưu | Lời nhận điều trị chỉ kể thủ thuật đầu và tác dụng tức thời; lời từ chối không hứa mời lại vì `apex_longevity_done` khóa event. Lời Index chuyển thành đề nghị thuốc riêng của Proxy, để từ chối không đồng nghĩa chống Prescript. Các nhánh thoát trong sự kiện Finger không tuyên bố đã rời tổ chức khi nghề/cấp vẫn giữ nguyên. Hành động tranh quyền phân biệt Thumb, Index, Middle, Ring và Pinky. |
| `src/data/lifeDailies.js` | Rút `a_any_warp` còn hai câu mỗi ngôn ngữ; ghi giá 2 Ahn và bỏ “chuyến đầu tiên” | Event có thể lặp; hiệu ứng thực là trừ 2 Ahn. Đồng hồ mười giây không được mô tả như thời gian cảm nhận của hành khách. |

### Kiểm tra lượt này

- `tests/test_lineage_legacy.mjs`: thêm trường hợp con ruột ở District thường và Fallen Wing, chọn ngẫu nhiên hoặc cố chọn hai nền mồ côi; mọi trường hợp đều không nhận gia cảnh mồ côi. Qua.
- `tests/test_apex_path.mjs`: qua sau khi đổi phép kiểm câu “side gate” cũ thành nội dung trạm kiểm soát/điểm đến mới. Bài này cũng đi qua năm dạng kết đời và pool Color/Finger.
- `tools/lint/lint_story.mjs`: 0 lỗi, 0 cảnh báo; `tools/lint/voice_lint.mjs --fail`: 0 cờ trên 33.768 chuỗi.
- `tools/lint/check_sentence_length.mjs --fail`: 0/100 event thường gặp vượt ngưỡng hai câu sau khi sửa `a_any_warp`.
- `git diff --check`: không lỗi khoảng trắng; cảnh báo chuyển CRLF sang LF chỉ liên quan chuẩn xuống dòng trong worktree.

**Phần còn lại của mục tiêu:** các lô B–H trong bảng trên vẫn cần đọc thủ công theo ID, kể cả tất cả lựa chọn và nhánh kết quả. Riêng `eventsApexTwilight.js`, sáu lời mời và các nhánh soán quyền đã sửa nhưng các tình huống còn lại chưa thể coi là duyệt hết về chất văn/lore. Không dùng số 0 của lint để suy ra toàn bộ 2.300+ mục đã được biên tập riêng.

## Lượt biên tập thứ sáu — dungeon, 06/11/2026

Đã đọc thủ công `dungeonText.js`, `dungeonSignatureText.js`, toàn bộ `NIGHT_DUNGEON`, `STAGE_VARIANTS`, `SIDE_ROOMS`, `SHORTCUTS` trong `dungeonExtras.js`, và đường xử lý tương ứng ở `dungeonEngine.js`, `dungeonCombat.js`, `dungeonSignature.js`.

| Nguồn | Đã sửa | Lý do |
| --- | --- | --- |
| `src/data/dungeonText.js` | Lời thất bại Bloodfiend, vỡ tâm trí/thể lực, tiếp tế, dùng E.G.O, rút lui và tử vong | Bỏ giả định mọi người chơi có bạn đồng hành, từng chôn người thân, cầm E.G.O hữu hình hoặc luôn có cầu thang lên mặt đất. Lời tiếp tế phản ánh chức năng thực của engine. |
| `src/data/dungeonSignatureText.js` | Luật vòng cá chết, người đi cùng trên WARP, thương tích người hỗ trợ Head, đồng hồ đêm Backstreets | Đường đi trên hồ khớp lời luật; không biến mọi hành khách thành cùng một người; thương tích có hồi phục sau hai năm. Mốc 4:34 nay là lúc Sweepers rút, không phải lúc mới ra đường. |
| `src/data/dungeonExtras.js` | `NIGHT_DUNGEON`, sáu biến thể chặng ba, sáu phòng phụ và sáu đường tắt | Mỗi lựa chọn có kiểm định trong phạm vi này đã có lời trượt VI/EN riêng. Ghi rõ nguồn Ahn ở các cảnh có chiến lợi phẩm, bỏ đồ vật/nguồn tiền không được engine trao và lời hứa NPC sẽ đi theo về sau. Lời kết đêm không mặc định mọi lối vào là một hợp đồng. Bỏ cờ `KeptDungeonTrophy` khỏi lựa chọn ngồi lại ở Backstreets vì người chơi không nhặt vật gì; cờ vẫn có ở bốn dungeon có vật mang ra. |
| `src/engine/dungeonSignature.js` | Áp lực đồng hồ bắt đầu từ 4:13 và kết thúc tại 4:34 | Trước đây sát thương tăng *sau* khi Sweepers đã rút. Bây giờ sát thương và strain tăng trong khoảng đợt cuối; thông báo và HUD đổi cùng quy tắc. |
| `src/engine/dungeonEngine.js` | Kết quả lựa chọn nộp báo cáo Association | Không mặc định chuyến đi Great Lake, WARP hay Outskirts đều kết thúc “ngay trong đêm”. |

Kiểm tra: `tests/test_dungeon_signatures.mjs`, `tests/test_dungeon_variety.mjs`, `tests/test_dungeon_gauntlet.mjs`, `tests/test_dungeon_mechanics.mjs` đều qua. `test_dungeon_variety.mjs` nay kiểm mọi lựa chọn có kiểm định trong `NIGHT_DUNGEON`, biến thể, phòng phụ và đường tắt có lời trượt riêng ở cả hai ngôn ngữ. `lint_story.mjs` 0 lỗi/0 cảnh báo; `voice_lint.mjs --fail` 0 cờ trên 33.839 chuỗi; `check_sentence_length.mjs --fail` 0/100 mục thường gặp vượt ngưỡng.

### Hai chỗ logic còn phải giải quyết ở dungeon

1. Khi trận đánh Backstreets kéo *qua* 4:34, `dungeonCombat.js` vẫn để người chơi đánh tiếp một Sweeper đang đứng trước mặt. Bộ sửa lần này bỏ tăng sát thương sau 4:34 và đổi lời thông báo sang rút xuống cống, nhưng trận hiện tại chưa tự kết thúc. Cần quyết định quy tắc rõ: khi đồng hồ hết, cho địch rút và kết thúc nhiệm vụ với chiến lợi phẩm đang giữ, hoặc cho một cá thể còn giao chiến rút ở cuối lượt, rồi viết test cho cả lúc chiến đấu lẫn lúc nghỉ. Tránh phát thưởng đánh bại boss nếu chỉ sống chờ hết giờ.
2. Các cổng vào `dungeon_backstreets_night` có mục tiêu khác nhau: máy ghi Wing, danh sách Thumb, Prescript Index, người thân Middle, máy thu Ring, giao ước Pinky, thi thể trong hẻm, bản án Öufi. Chặng cuối hiện chỉ nộp báo cáo/nhận tiền chung. Cần lưu `gateId` vào phiên dungeon và viết kết quả riêng cho việc lấy được/không lấy được mục tiêu, kể cả trường hợp quay ra. Đừng kể đã cứu được thi thể hay hoàn thành Prescript chỉ từ việc sống tới 4:34.

**Chưa duyệt hết lô B:** `dungeonGauntlets.js`, `dungeonEnsemble.js`, `dungeonClaw.js`, `eventsAbnormalityFieldwork.js`; các lô C–H trong bảng phía trên cũng còn cần đọc từng event. Các bài lint chỉ bắt định dạng và độ phủ nhánh, không thay việc đối chiếu từng cảnh với điều kiện engine.
