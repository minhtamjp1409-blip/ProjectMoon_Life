<!--
Sync Impact Report
- Version change: (template, chưa điền) → 1.0.0
- Modified principles: thay toàn bộ 5 chỗ trống mẫu bằng 6 nguyên tắc của dự án
  - I. Trung thành với canon Project Moon
  - II. Giọng văn được máy kiểm
  - III. Một nguồn sự thật cho luật chơi
  - IV. Kiểm chứng bằng chạy thật
  - V. Điện thoại và máy tính ngang nhau
  - VI. Giữ stack và giữ save
- Added sections: Ràng buộc kỹ thuật, Quy trình làm việc, Governance
- Removed sections: không có
- Follow-up TODOs: không có. Ngày phê chuẩn lấy ngày áp dụng Spec Kit (2026-11-04).
-->

# The City Chronicles Constitution

## Core Principles

### I. Trung thành với canon Project Moon

- Thế giới là The City của Project Moon (Lobotomy Corporation, Library of Ruina, Limbus Company).
  Mọi nội dung MUST khớp với `UNIVERSE.md` và `docs/LUAT_HIEN_HANH.md`.
- Thuật ngữ gốc MUST giữ nguyên tiếng Anh: Fixer, Office, Association, Grade, Color, Nest,
  Backstreets, Wing, Feather, Singularity, Syndicate, The Five Fingers, Distortion, E.G.O, Taboo,
  The Head. Không dịch Hán-Việt.
- Nội dung không có trong canon MUST mang nhãn "Phóng tác" ở nơi người chơi thấy nó.

Lý do: người chơi chính là fan Project Moon người Việt. Họ đến để sống trong thế giới họ đã biết,
nên một thuật ngữ sai hay một chi tiết bịa không gắn nhãn sẽ làm hỏng lòng tin.

### II. Giọng văn được máy kiểm

- Văn bản trong game MUST qua được `voice_lint.mjs --fail`, `lint_story.mjs`, `rhythm_scan.mjs --fail`
  và `check_sentence_length.mjs --fail`.
- Lời kể không có dấu gạch dài, không có dấu chấm than ngoài lời thoại, và không có con số chỉ số.
  Số liệu đi vào `deltas` và chip preview. Chỉ trường `lasting` được miễn quy tắc con số.
- Văn bản mô tả cơ chế (`lasting`, nhãn khóa, tiến độ thăng chức) MUST nói đúng điều engine thật sự
  làm. Nó cũng không được lộ trước số năm của hậu quả ẩn (`later`).
- Mọi chuỗi MUST có cả tiếng Việt và tiếng Anh. Tiếng Việt là ngôn ngữ chính.

Lý do: giọng văn tiếng Việt riêng là một phần bản sắc của sản phẩm. Lint giữ được giọng đó qua hàng
chục nghìn chuỗi, điều mà đọc tay không làm nổi.

### III. Một nguồn sự thật cho luật chơi

- Ngưỡng thăng cấp chỉ nằm ở `PM_BE/Config/career_gates.json` và được chép sang
  `PM/src/data/careerGates.json` bằng `tools/sync_career_gates.mjs`. `check_be_parity.mjs` MUST qua.
- UI MUST đọc ngưỡng và điều kiện từ đúng hàm engine dùng để quyết định, ví dụ
  `getPromotionProgress`, `getNextFixerPromotion`, `checkColorFixerReadiness`. UI không được ghi
  cứng lại con số.
- Hậu quả nhiều năm đi qua `scheduleConsequences` và cờ thật. Không có nhánh nào giả định một cờ
  mà lựa chọn trước không đặt.

Lý do: khi frontend, backend và UI giữ những bản ngưỡng riêng, chúng lệch nhau một cách lặng lẽ. Người
chơi khi đó thấy một điều kiện còn engine lại xét một điều kiện khác.

### IV. Kiểm chứng bằng chạy thật

- Mọi thay đổi MUST qua `npm test` (toàn bộ lint, test hồi quy và audit 500 khoảnh khắc) và
  `npm run build` trước khi commit.
- Thay đổi về nhịp, tần suất hay cân bằng MUST được đo bằng mô phỏng nhiều đời (`tools/sim/*`). Số
  liệu phải có trước và sau, kèm seed hoặc số đời đã chạy.
- Thay đổi giao diện MUST được nhìn trên trình duyệt thật ở 390×844 và ở màn hình máy tính.
- Mỗi tiêu chí "Xong khi" trong kế hoạch MUST có một test tự động. Test đó phải có khả năng thất bại
  thật: không dùng điều kiện mà một giới hạn khác đã luôn đảm bảo.
- Báo cáo MUST nói đúng kết quả. Bước nào chưa chạy (nghe thử âm thanh, NVDA thật) thì ghi là
  chưa chạy.

Lý do: nhiều lỗi của dự án chỉ lộ ra khi chạy, ví dụ mức Lướt tự tắt sau 0,38 năm hay cảnh nhắc lại
sai lựa chọn. Đọc code không bắt được những lỗi đó.

### V. Điện thoại và máy tính ngang nhau

- Mọi màn hình MUST dùng được đầy đủ trên điện thoại (390×844, chạm bằng ngón cái) lẫn máy tính
  (phiên dài, phím tắt). Không bản nào là bản phụ.
- Vùng chạm MUST từ 44×44px trở lên. Trên điện thoại, các nút lựa chọn của thẻ minor MUST nằm trong
  màn đầu tiên; chi tiết phụ đi vào phần mở bằng nút gập.
- Chuyển động chỉ dùng `transform` và `opacity`. Mỗi cutscene MUST có bản lite, bản still (giảm
  chuyển động) và bản caption (tắt cảnh), và cả ba đều đọc được.
- Thứ đang chờ chọn, năm đang sống, hậu quả và bước ngoặt không bao giờ bị gấp ở chế độ Đọc gọn.
- Màu và font đi qua token trong `src/styles/ui/tokens.css`, theo `DESIGN.md`.

Lý do: người chơi dùng hai loại thiết bị ngang nhau, và đọc là hoạt động chính của game.

### VI. Giữ stack và giữ save

- Frontend MUST giữ React, Vite, Zustand và Ant Design. Backend MUST giữ .NET 8 Minimal API.
  Không thêm package mới hay đổi framework nếu không có lý do được ghi trong kế hoạch.
- Save cũ MUST tải được sau mọi thay đổi. Trường mới cần giá trị mặc định hoặc migration trong
  `saveSchema.js`, kèm test.
- Hướng dẫn của skill là tham khảo, không phải yêu cầu đổi kiến trúc.

Lý do: đây là dự án cá nhân, phi thương mại, và người chơi có những đời đang lưu dở. Một lần đổi stack
hay hỏng save tốn nhiều hơn mọi tính năng nó mang lại.

## Ràng buộc kỹ thuật

- Vercel chỉ build thư mục `PM`. Mọi dữ liệu frontend cần lúc build MUST nằm trong `PM`.
- Backend chạy trên Render (`projectmoon-life.onrender.com`). File cấu hình MUST nằm ngoài
  `PM_BE/Data/`, vì thư mục đó bị `.gitignore` và không vào được bản build Docker.
- Số liệu chơi ẩn danh chỉ được gửi khi người chơi bật. Không gửi dữ liệu định danh người chơi tới
  dịch vụ ngoài.
- Đồng hồ minor luôn chạy theo thời gian thực, không bị nhân lên bởi tốc độ chơi.
- Mọi mục nhật ký MUST có `id`, `age`, `season`, `type`.

## Quy trình làm việc

1. Việc được chia thành từng Đợt trong `docs/KE_HOACH_TIEP_THEO.md`. Mỗi Đợt gồm phần Lý do, Cách làm
   và Xong khi.
2. Khi dùng Spec Kit, mỗi Đợt lớn đi qua `/speckit-specify`, `/speckit-plan` và `/speckit-tasks`. Spec
   MUST dẫn chiếu tới Đợt tương ứng.
3. Sau khi `npm test` và `npm run build` qua: cập nhật `PROGRESS_LOG.md`, commit, push lên `main`,
   rồi kiểm tra Vercel (`project-moon-life-five.vercel.app`) và Render (`/api/health`).
4. Review tìm lỗi bằng cách chạy test, build, đo mô phỏng và dò trên trình duyệt. Lỗi được xếp theo
   mức độ, kèm cách sửa.
5. Trình duyệt hay server preview đã mở để kiểm tra MUST được tắt sau khi dùng.

## Governance

- Constitution này đứng trên mọi thói quen làm việc khác của dự án. Khi có mâu thuẫn, tài liệu cụ thể
  hơn (`docs/LUAT_HIEN_HANH.md`, `UNIVERSE.md`, `DESIGN.md`) MUST được sửa cho khớp, hoặc
  constitution được sửa đổi.
- Sửa đổi được thực hiện bằng `/speckit-constitution`, ghi lý do vào `PROGRESS_LOG.md`, và commit
  riêng.
- Phiên bản theo semantic versioning:
  - MAJOR khi bỏ hoặc định nghĩa lại một nguyên tắc.
  - MINOR khi thêm nguyên tắc hoặc mở rộng đáng kể.
  - PATCH khi chỉ sửa câu chữ.
- Mỗi lần review và mỗi bước `/speckit-plan` (Constitution Check) MUST đối chiếu thay đổi với sáu
  nguyên tắc trên. Vi phạm nào được chấp nhận phải ghi lý do trong plan.
- Hướng dẫn chạy hằng ngày cho agent nằm ở `AGENTS.md`.

**Version**: 1.0.0 | **Ratified**: 2026-11-04 | **Last Amended**: 2026-11-04
