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
