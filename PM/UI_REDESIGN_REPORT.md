# Thiết kế lại giao diện, 20/10/2026

## Kết quả và phạm vi

Giao diện được làm lại tại `D:\School\ProjectMoon_Life\PM`. Xem thử tại `http://127.0.0.1:5193/` khi Vite đang chạy. Báo cáo này xác nhận kiểm tra bản local; trạng thái phát hành cần đối chiếu riêng với GitHub và Vercel.

Áp dụng antislop `during` theo lựa chọn trong phiên; các skill UI, mobile, accessibility, copywriting, design-taste-frontend, game-ui-ux, ui-ux-pro-max và design-system. Các skill game engine, âm thanh, physics, ảnh và pet không được kích hoạt cho công việc ngoài phạm vi của chúng.

Hướng thiết kế: **True-black flat**, seed **375464302**, không rút lại style. Điều chỉnh về màu và chữ theo thương hiệu Project Moon đang có: than ấm, chữ sáng, vàng lưu trữ tiết chế; theme sáng dùng nền giấy trung tính. Font **Be Vietnam Pro** giữ khả năng đọc dấu tiếng Việt. Chi tiết trong [DESIGN.md](DESIGN.md).

Điểm riêng là vòng chọn 26 District nối trực tiếp với cấu hình nơi sinh. Đây là chỉ mục, không phải bản đồ địa lý. Logo SVG cũ, tài liệu PDF và dữ liệu game thật được giữ làm nguồn. Không tạo ảnh, nhân vật quảng cáo, lời chứng thực hay số liệu người dùng.

Home dùng tiếng Anh theo yêu cầu bổ sung của người dùng, gồm điều hướng, form, thông tin nơi sinh, điềm báo và hộp xác nhận. Trường hợp đã lưu VI hoặc VI+EN vẫn mở Home bằng tiếng Anh. Ngôn ngữ truyện do người chơi chọn được giữ riêng.

| Màn hình | Câu hỏi chính | Cách thể hiện |
| --- | --- | --- |
| Khai sinh | Bắt đầu hoặc tiếp tục cuộc đời nào? | Tên, nơi sinh, seed và hành động chính trong hồ sơ; tiếp tục bản lưu khi có |
| Biên niên | Chuyện gì đang xảy ra và tôi phải chọn gì? | Cột truyện rộng, hồ sơ nhân vật và vùng lựa chọn riêng |
| Khung cửi | Cơ chế và sự kiện nào đang dẫn dắt câu chuyện? | Tiêu đề rõ, tab và công cụ biên tập hiện có |
| Từ điển | Thuật ngữ hoặc District này có nghĩa gì? | Tab, bảng và hàng mở rộng bằng chuột hoặc bàn phím |
| Huyết thống | Những cuộc đời trước để lại gì? | Hồ sơ tưởng niệm; khi chưa có thì chỉ rõ cách bắt đầu |
| Thành tựu | Đã mở những cột mốc nào? | Tiến độ thật, nhóm và bộ lọc; không tăng số cho đẹp |

## Desktop và mobile

- Desktop: sidebar 216px, tự thu gọn khi chơi; hồ sơ nhân vật 290px, truyện giới hạn chiều rộng đọc. Từ 1360px, các lựa chọn nằm ở cột bên cạnh truyện, không phủ lên truyện.
- Tablet: bố cục khai sinh hai cột riêng; sidebar nhỏ ở kích thước trung gian.
- Phone: biểu mẫu khai sinh đứng trước phần đọc thêm, bỏ vòng District để dành chỗ; vẫn chọn được toàn bộ District qua select và danh sách.
- Khi chơi trên phone: HUD ngắn, hồ sơ dạng sheet; truyện và dock chiếm hai hàng grid riêng, mỗi vùng cuộn độc lập. Nút Xem lựa chọn đưa ngay tới các phương án khi mô tả dài.
- Nền wireframe phủ toàn viewport ứng dụng theo yêu cầu bổ sung của người dùng. Nền không nhận thao tác, không có bảng trạng thái trang trí hoặc chữ bị khung khai sinh che khuất.
- Điều hướng dưới màn hình chiếm một hàng layout riêng, có safe area. Không phủ lên vùng chơi.
- Focus bàn phím, Enter/Space, Escape, chuyển tab bằng phím mũi tên và phục hồi focus khi đóng hồ sơ.
- Khi giảm chuyển động, bỏ hiệu ứng sân khấu và chuyển động nền. Thông báo chỉ hiện một chiếc tại một thời điểm.

## Kiểm tra đã chạy

- `npm run build`: thành công, 3507 module; mọi JS chunk dưới 500 kB trước gzip.
- Chrome headless qua CDP: **80 bản ghi kiểm tra, 0 lỗi assertion, 0 ngoại lệ JavaScript ngoài dự kiến**. Chi tiết: [kết quả kiểm tra](anti-slop/ui-redesign-checks-2026-10-20.json).
- 12 trường hợp Home tiếng Anh: lựa chọn ngôn ngữ truyện VI/VI+EN/EN, hai theme và hai chiều rộng desktop/phone. Kiểm tra tiêu đề, form, điều hướng, nội dung tiếng Anh và không tràn ngang. Chạy lại riêng 12 trường hợp này sau chỉnh số ít/số nhiều và khoảng trắng.
- Kiểm tra trang chủ ở 1440, 768, 390, 320, 844 ngang và 1024px; các trang phụ ở desktop/phone và hai theme. Không có cuộn ngang toàn trang trong các tình huống đã chạy.
- Chọn 26 sector District, chọn Outskirts, tìm District, tạo seed, mở điềm báo, bắt đầu chơi, lưu, về trang chủ và tiếp tục cùng seed.
- Điều hướng cả năm route qua nút thật, đổi English, lọc thành tựu, mở chi tiết District bằng Enter, mở/đóng trình biên tập.
- Hồ sơ mobile mở được, Escape đóng và trả focus về nút mở.
- Sinh major event, minor event và Fixer contract qua game engine thật. Kiểm tra ở 1440, 1200, 768, 390 và 320px: hình chữ nhật vùng truyện không giao với dock; có thể cuộn đến lựa chọn cuối và giải quyết lựa chọn. Bấm Xem lựa chọn ở bốn chiều rộng hẹp, xác nhận phương án đầu nằm dưới header và trong vùng nhìn thấy.
- Hộp đặt tên E.G.O, Color và Workshop mở, hiển thị và xác nhận được trên mobile. Nút Workshop dài đã được sửa để xuống dòng.
- Đã sửa nền và màu chữ của mốc sự nghiệp ở theme sáng, chỉ báo nguy kịch chỉ áp dụng cho HP/SP thấp.
- Đo 36 cặp màu chữ semantic trên ba nền của hai theme: đạt 4.5:1. Viền control đo được 3.42:1 đến 3.92:1. Quét thêm màu chữ DOM trên các trang sáng và trang chủ tối: không thấy cặp dưới ngưỡng trong nội dung đã render. Kết quả: [kiểm tra màu chữ DOM](anti-slop/ui-redesign-contrast-2026-10-20.json).
- Trạng thái rỗng được xem trong trình duyệt; trạng thái loading và ErrorBoundary được kiểm tra trong source. Không cố gây crash ứng dụng sản xuất.
- `git diff --check`: sạch. Các cảnh báo LF/CRLF là quy tắc checkout của Git trên Windows.

Kiểm tra dùng profile Chrome riêng, chặn kết nối backend cho lượt mô phỏng. Không ghi hồ sơ thử vào archive của người dùng. Không chạy lại stress test toàn bộ vòng đời hay kiểm thử tích hợp BE vì không đổi engine hoặc API.

## Nhận xét sau khi xem ảnh

1. Khối lớn nhất trả lời đúng việc chính: biểu mẫu bắt đầu trên home, truyện và lựa chọn trên màn chơi, dữ liệu lưu trữ trên các trang phụ.
2. Mép nội dung và khoảng cách được dùng lại; phone xếp lại thành một cột. Trang huyết thống mới giữ khoảng trống thật thay vì bịa hồ sơ.
3. Màu nhấn dành cho District được chọn, mốc truyện và trạng thái. Nút chính dùng độ tương phản sáng/tối. Font và dấu trăng xuất hiện ngay ở màn đầu.
4. Số đời lấy từ `pastLives.length`, thế hệ lấy từ hồ sơ, thành tựu từ `globalCodex` và `CODEX_RECORDS`. Các số trong HUD và dossier lấy cùng `char`.
5. Không biến 0 kiếp trước thành dữ liệu mẫu. Hồ sơ rỗng có lời giải thích và hành động đi tiếp.
6. Vòng District ghi thẳng A đến Z, không cần chú giải rời; màu và nhãn của tài nguyên cùng thể hiện ý nghĩa. Đã sửa nhóm tab dài thành vùng cuộn ngang riêng.
7. Phone có điều hướng gọn, form trước nội dung bổ sung, sheet hồ sơ và dock lựa chọn độc lập. Đã xem ảnh ở cả hai theme.

Các vấn đề được sửa qua vòng xem ảnh: lựa chọn chiếm hết vùng truyện trên phone, tab thành tựu xuống quá nhiều hàng, nút Workshop dài tràn modal, màu mốc sự nghiệp theme sáng và hiệu ứng đứng yên khi bật reduced motion.

Inspector cuối: **0 FAIL, 3 WARN**. Từng cảnh báo có lý do:

- `palette-cream`: inspector đọc chữ ivory trong token AntD, nền thực tế là `#101110`; chữ ấm được giữ theo hướng lưu trữ của game.
- `below-fold`: toàn bộ 27 nơi sinh là một danh mục cuộn có tìm kiếm; form bắt đầu và hành động chính đã hiện ở màn đầu. Không ép danh mục này vào một viewport.
- `app-title-size`: home là màn tiêu đề của game, không phải dashboard thao tác. Trang lưu trữ dùng tiêu đề nhỏ hơn.

Lint các file liên quan sửa lớp nền/dock: **0 FAIL, 32 WARN**. 30 kết quả `shadow` chủ yếu là khai báo `box-shadow: none` để gỡ bóng cũ; bóng thật dành cho overlay. `backdrop-filter: none` gỡ blur cũ. `eyebrow` là nhãn Request chứa cấp độ hợp đồng thật, giúp hiểu loại nhiệm vụ trước tiêu đề. Lượt lint trước có cảnh báo `padStart` cho số District thật, không phải đánh số khối trang để trang trí.

Không áp dụng trần số ảnh hoặc chuyển động của landing page: đây là app game, theo nhánh `app-screens.md`. Ảnh kiểm tra nằm tại thư mục local `.taste-skill/review`, không được đưa lên Git.

## Antislop Delivery Gate

Phạm vi gate là giao diện và nội dung sửa trong đợt này. PASS dưới đây dựa trên kiểm tra source, ảnh và lượt tương tác đã ghi; không phải chứng nhận mọi trình duyệt hoặc mọi nhánh gameplay.

### Hard Gate

- R-02 PASS: rà source giao diện được viết lại, không thêm ký tự em dash vào copy.
- R-03 PASS: các viewport trong ma trận không cuộn ngang toàn trang; đo hình học xác nhận log/dock không giao nhau ở năm chiều rộng, lựa chọn cuối vẫn tới được.
- R-17 PASS: số đời, thế hệ và thành tựu lấy trực tiếp từ store và dữ liệu game.
- R-18 PASS: không có testimonial hoặc avatar quảng cáo.
- R-23 PASS: yêu cầu thiết kế lại dùng cấu trúc route, favicon và nội dung game hiện có; chỉ mục District là điều khiển dữ liệu thật.
- R-24 PASS: cả năm mục điều hướng đã được bấm và mở route tương ứng.
- R-25 PASS: các cặp semantic đạt AA; quét màu DOM không ghi nhận lỗi trong các màn được đo; đã sửa khung sự nghiệp sáng.
- R-26 PASS: điều khiển mới nối với store, route, scroll, focus hoặc disclosure; không có nút mẫu vô tác dụng.
- R-27 PASS: có empty archive, thông báo không tìm thấy District, loading có role status và ErrorBoundary có hành động phục hồi.
- R-28 PASS: không thêm FAQ.
- R-32 PASS: focus-visible trong CSS; District dùng Enter/Space, sheet bắt Escape và phục hồi focus, tab dossier có phím mũi tên.
- R-33 PASS: thay đổi nằm trong React/CSS source; script CDP chỉ phục vụ kiểm tra.
- R-34 PASS: ảnh và kiểm tra route trên hai theme; token của modal, tooltip và notification cùng hệ màu.
- R-35 PASS: đã build và ghi lại click-through các nhóm tương tác được sửa, 80 bản ghi kiểm tra; không bàn giao chỉ từ source tĩnh.
- R-36 PASS: không viết tuyên bố mới về bảo mật, khách hàng hay hiệu năng sản phẩm.
- R-37 PASS: hướng thiết kế và ENERGY 2 / RHYTHM 2 / MOTION 1 được khai báo trong DESIGN.md.
- R-38 PASS: không thêm dữ liệu thương mại giả; dữ liệu mô phỏng QA chỉ nằm trong profile thử.

### Purpose Gate

- R-01 PASS: nền UI phẳng; hiệu ứng cũ chỉ xuất hiện khi game có hậu quả, bị tắt khi reduced motion.
- R-04 PASS: bộ icon hiện có dùng cho điều hướng, tài nguyên và thao tác thật, không dùng emoji để trang trí tiêu đề.
- R-06 PASS: Be Vietnam Pro phục vụ tiếng Việt và đọc truyện; số dùng tabular figures ở vị trí cần so sánh.
- R-07 PASS: nền wireframe tĩnh ở lớp bao ngoài theo yêu cầu bổ sung của người dùng, phục vụ nhận diện The City. Không chèn chữ hoặc trạng thái giả; vùng đọc và form có nền đặc.
- R-08 PASS: mũi tên biểu thị mở trang hoặc di chuyển đến phần nội dung; không gắn lên mọi nút.
- R-09 PASS: nhãn trạng thái biểu thị trạng thái hoặc độ hiếm thật, không thêm badge quảng cáo.
- R-10 PASS: bề mặt đặc, tắt blur của sheet.
- R-12 PASS: các khối tĩnh dùng chênh độ sáng; bóng chỉ cho lớp nổi.
- R-13 PASS: không thêm glow vào nút, card, badge hoặc nền nghỉ.
- R-14 PASS: form, dial, danh mục District, truyện và hồ sơ có cấu trúc theo loại nội dung; không tạo dãy feature card giống nhau.
- R-19 PASS: không có hiệu ứng vào trang đồng loạt; chuyển động phục vụ phản hồi và sheet, có reduced-motion override.
- R-22 PASS: không dùng hình minh họa stock hoặc blob.

### Liveliness

- Dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 1 được ghi rõ và thể hiện bằng bố cục điềm tĩnh, mật độ đọc vừa và phản hồi ngắn.
- Focal point PASS: home là hồ sơ khai sinh; play là câu chuyện hoặc quyết định; trang phụ là nội dung hồ sơ.
- Whitespace PASS: khoảng cách tách việc bắt đầu, nghề nghiệp, nơi sinh và điềm báo; trong màn chơi ưu tiên chiều cao đọc.
- Accent PASS: vàng lưu trữ dành cho lựa chọn và mốc; màu cảnh báo có ý nghĩa và nhãn.
- Identity PASS: hồ sơ cuộc đời, vòng A-Z, tên District và thuật ngữ Project Moon xuyên suốt các trang.
- Design Read PASS: DESIGN.md ghi hướng, vai trò từng màn và dials trước khi bàn giao.

### Craftsmanship và Quality Locks

- C-1 PASS: màu, chữ, cấu trúc, icon và hiệu ứng đều có mục đích ghi trong DESIGN.md và báo cáo này.
- C-2 PASS: điều khiển thiết kế lại có handler thật; các luồng chính được bấm trong browser.
- C-3 PASS: mọi phần home lấy từ việc khai sinh, nghề nghiệp, District, điềm báo hoặc hồ sơ đã chơi.
- C-4 PASS: ma trận viewport/theme và keyboard nêu trên không ghi nhận lỗi; loading/error có cấu trúc phục hồi.
- C-5 PASS: số liệu hiển thị lấy từ game, không bịa lời nhận xét hay thành tích người dùng.
- R-05 PASS: bố cục là hồ sơ game với dữ liệu và điều khiển thật, không có pricing/logo bar/how-it-works mẫu.
- R-11 PASS: button/input radius nhỏ; vòng District chỉ dùng vì chọn sector; badge có góc riêng.
- R-15 PASS: CTA nêu việc cụ thể, như Enter The City, Continue this life và Discard heirloom.
- R-16 PASS: không thêm quảng cáo AI hoặc buzzword vào copy.
- R-20 PASS: District A-Z, dấu trăng, hồ sơ một đời và lựa chọn hậu quả tạo đặc điểm gắn với game.
- R-21 PASS: giữ lựa chọn theme của sản phẩm; cả sáng và tối đều hoàn thiện.
- R-29 PASS: bảng màu trung tính và một accent; màu trạng thái HP/SP/nguy hiểm theo semantic token.
- R-30 PASS: không dựng bản sao dashboard của sản phẩm khác; hướng archive áp dụng vào việc chơi game hiện có.
- R-31 PASS: lý do cho mỗi quyết định lớn nằm trong DESIGN.md và các mục đầu báo cáo.

## Giới hạn còn lại

Đã kiểm tra bằng Chrome. Chưa xác nhận trên thiết bị iOS/Safari thật hoặc qua trình đọc màn hình. Các thành phần gameplay cũ vẫn dùng lớp CSS nền để tránh thay đổi cơ chế trong một đợt làm giao diện. Báo cáo không xác nhận trạng thái triển khai trên Vercel.
