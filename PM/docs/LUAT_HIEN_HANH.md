# Luật hiện hành

Trang này ghi những gì đang đúng ở code hôm nay, để người viết event không phải dựa vào thiết kế cũ. Lịch sử thay đổi nằm ở `PROGRESS_LOG.md`, lore và giọng văn ở `UNIVERSE.md`.

## Thế giới

- 26 District (A đến Z) cộng Outskirts. Ba xuất thân: Backstreets, Nest (cờ `Nest`, `NestResident`, `Feather`) và Outskirts.
- Bốn con đường chọn được ở tuổi làm việc (từ 15 đến 20, theo `careerAge.js`): Fixer, Syndicate (Five Fingers hoặc độc lập), Wing, và Outcast khi đơn bị từ chối. Workshop không còn là nghề chọn được.
- Hai trạng thái siêu nhiên: E.G.O (cờ `EGOAwakened`) và Distortion (nghề `Distortion`, cờ `Distorted`). Color là Fixer Grade 1 đã qua kỳ thi của Hana.
- Event vào nghề có ba bản theo xuất thân, chọn bằng `careerCrossroadIdFor`: `ad_career_crossroad_18` (Backstreets), `ad_nest_crossroad_18` (Nest), `ad_outskirts_crossroad_18` (Outskirts).

## Ngưỡng thăng cấp

Một nguồn duy nhất: `PM_BE/Config/career_gates.json` (Fixer Grade 8 đến 1, cổng Color, Finger rank 1 đến 3, tên bậc Finger, Wing rank 1 đến 3).

1. Sửa file nguồn ở `PM_BE/Config`.
2. Chạy `node tools/sync_career_gates.mjs` để chép sang `PM/src/data/careerGates.json` (Vercel chỉ build thư mục `PM`).
3. `npm test` chạy `tools/lint/check_be_parity.mjs`: báo lỗi nếu bản sao lệch, engine không theo file, csproj không nhúng file, file nguồn bị gitignore, hoặc BE ghi cứng lại con số.

Không đặt file nguồn trong `PM_BE/Data/`: thư mục đó bị `.gitignore` và không tới được bản build Docker.

Các cổng Color riêng (E.G.O, thần đồng, E.G.O road) nằm trong `careerPipeline.js` (`COLOR_FIXER_REQ_*`), chỉ phía FE dùng.

## Viết event

- Giọng văn: không dấu gạch dài, không dấu chấm than ngoài lời thoại, không con số chỉ số trong lời kể, giữ nguyên thuật ngữ Project Moon. `node tools/lint/voice_lint.mjs --fail` kiểm tra.
- Cấu trúc: `node tools/lint/lint_story.mjs`. Nhịp câu: `node tools/lint/rhythm_scan.mjs --fail`.
- Nội dung phóng tác (không phải lore gốc) phải được nói rõ là phóng tác.
- Hậu quả nhiều năm dùng `scheduleConsequences` với event `causalOnly: true, weight: 0`, mỗi event kế tiếp `requires` một cờ mà lựa chọn trước thật sự đặt. Xem `eventsWingThreads.js` làm mẫu và `tests/test_wing_threads.mjs` làm test mẫu.
- Điều kiện lựa chọn dùng `need`. `need.fingerInvited` khóa một lựa chọn Finger cho tới khi Finger đó "gửi thư" (`fingerPull.js`).

## Nhật ký và NPC

- Mỗi mục nhật ký có một tầng (`entryTier`): quiet, decision hoặc turn. Chế độ "Đọc gọn" trong Cài đặt gấp mục quiet về câu đầu, và gấp mục lựa chọn của các năm đã qua về dòng "Bạn chọn" cộng câu đầu của kết quả (tình huống và phần còn lại mở tại chỗ). Không bao giờ gấp thứ đang chờ chọn, năm đang sống, hậu quả, nguy hiểm hay bước ngoặt (`foldsInCompact`).
- Hành động với NPC (`npcInteractions.js`) có cooldown theo năm cho mỗi NPC và mỗi hành động. Số liệu của một hành động đi vào `deltas`, không viết trong câu.

## Kiểm tra

- `npm test`: toàn bộ lint, test hồi quy và mô phỏng 500 khoảnh khắc.
- `node tools/sim/event_reach.mjs [lives] [--routes] [--events=prefix]`: độ phủ event và tỷ lệ năm không đổi vị thế theo route. Đây là phép dò với người chơi ngẫu nhiên, không chứng minh cân bằng.
- `node tools/sim/balance_sim.mjs [lives] [random|greedy|focused] [--fixers]`: cân bằng chỉ số và đường lên Color.
