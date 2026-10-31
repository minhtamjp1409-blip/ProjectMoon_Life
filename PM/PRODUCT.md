# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Người chơi chính là fan Project Moon người Việt: họ đã biết The City, Fixer, Wing, Syndicate, E.G.O và đến để sống một đời trong thế giới ấy, không cần game giảng lại lore. Tiếng Việt là ngôn ngữ chính; tiếng Anh và chế độ song ngữ là phụ.

Họ chơi trên điện thoại và máy tính ngang nhau. Trên điện thoại là những phiên ngắn, chạm bằng ngón cái; trên máy tính là những phiên dài, đọc nhiều và dùng phím tắt. Cả hai đều phải là trải nghiệm đầy đủ, không bản nào là bản phụ.

## Product Purpose

The City Chronicles là một tác phẩm phóng tác phi thương mại: một trò mô phỏng đời người kiểu roguelite đặt trong The City. Một năm trôi trong khoảng ba mươi giây; người chơi đi từ lúc sinh ra tới lúc chết, chọn ở những ngã rẽ, rồi để lại di sản cho đời sau.

Thành công là người chơi chơi lại nhiều đời và kể lại câu chuyện đời của chính họ: cái chết, cái nghề, cái sẹo, người bạn đã hy sinh. Không có mục tiêu doanh thu hay tăng trưởng người chơi.

## Positioning

Mỗi đời được ghép từ nhân quả chứ không từ menu: cơ hội, bi kịch, đường thăng tiến và sự biến dị đều mọc ra từ những gì nhân vật đã trải qua, vết sẹo đang mang và các mối quan hệ. Kết hợp với đó là sự trung thành với canon Project Moon (thuật ngữ gốc, các tuyến Fixer của Hana, Five Fingers, Syndicate, Wing, Distortion và E.G.O, Taboo và The Head) và một giọng văn tiếng Việt riêng.

## Operating Context

- Vòng chơi: kế hoạch năm, sự kiện và lựa chọn trong dock, sự kiện nhỏ có đồng hồ, hầm ngục nhiều chặng có đặt cược, kỳ sát hạch Grade, cái chết, trang di cảo, đời kế thừa.
- Đọc là hoạt động chính: nhật ký đời (Biên niên) dài dần theo tuổi, có chế độ Đọc gọn và Đọc đầy đủ.
- Các trang phụ: Khung cửi (mạch truyện), Từ điển thế giới, Huyết thống, Thành tựu.
- Lưu ván trên trình duyệt; backend lưu bia tưởng niệm, codex và số liệu chơi ẩn danh (chỉ khi người chơi bật).

## Capabilities and Constraints

- Song ngữ Việt và Anh, có chế độ hiển thị cả hai.
- Cài đặt hiện có: ngôn ngữ, cỡ chữ truyện, chế độ đọc nhật ký, chuyển động (Hệ thống, Đầy đủ, Giảm), cảnh chuyển (Đầy đủ, Rút gọn, Tắt), tiết kiệm pin, âm lượng, gửi số liệu ẩn danh.
- Luật chơi hiện hành nằm ở `docs/LUAT_HIEN_HANH.md`; thế giới và giọng văn ở `UNIVERSE.md`; hướng giao diện ở `DESIGN.md`.
- Cổng thăng tiến dùng chung giữa frontend và backend (`career_gates.json`) và phải khớp nhau.
- Thuật ngữ: giữ nguyên tiếng Anh của Project Moon (Fixer, Office, Association, Grade, Color, Nest, Backstreets, Wing, Feather, Singularity, Syndicate, The Five Fingers, Distortion, E.G.O, Taboo, The Head...). Không dịch Hán-Việt.
- Chưa quyết: có giảm hình phạt kỳ sát hạch Hana cho Grade 8 đến 6 hay không.

## Brand Commitments

- Tên: The City Chronicles.
- Phóng tác cá nhân, phi thương mại, dựa trên The City của Project Moon (Lobotomy Corporation, Library of Ruina, Limbus Company).
- Giọng văn (UNIVERSE.md mục 4): ngôi thứ hai; một chi tiết cụ thể thay cho ba tính từ; bạo lực nói một lần, gọn; không dấu gạch dài; không đoán giới tính người chơi; không in số chỉ số trong câu văn; không dấu chấm than trong lời kể.

## Evidence on Hand

- Nội dung thật: hàng trăm sự kiện lớn, nhỏ, đời thường và Request; hầm ngục; bản đồ District; dữ liệu nghề và cổng thăng tiến (xem `src/data/`).
- Số liệu mô phỏng nội bộ (balance sim, story audit) trong `PROGRESS_LOG.md`, là số đo bằng bot, không phải số liệu người chơi thật.
- Không có: số người chơi, đánh giá, lời chứng thực, báo chí, đối tác. Không được bịa những thứ này.

## Product Principles

1. Nhân quả trước menu: mọi ngã rẽ phải bắt nguồn từ đời đã sống, không từ một danh sách chọn sẵn.
2. Khó nhưng công bằng: cái chết đến từ lựa chọn và rủi ro người chơi nhìn thấy được, không từ ngẫu nhiên vô cớ.
3. The City tàn nhẫn một cách bình thường: kể gọn, lạnh, cụ thể; không phô trương.
4. Tôn trọng thời gian của người đọc: chữ dài phải đọc được, gấp được, bỏ qua được; cảnh chuyển luôn có đường bỏ qua.
5. Trung thành với canon: thuật ngữ, phe phái và luật của The City đúng như Project Moon.

## Accessibility & Inclusion

- Chế độ giảm chuyển động riêng trong game (ghi đè thiết lập hệ điều hành), và mọi cảnh có bản tĩnh.
- Không chớp sáng quá ba lần mỗi giây (WCAG 2.3.1); cảnh dùng chớp màu ngắn thay chớp trắng.
- Cỡ chữ truyện chọn được; vùng chạm tối thiểu 44px trên điện thoại.
- Không đoán giới tính người chơi trong lời văn.
