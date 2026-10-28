# Theo dõi BUG-36–50

Ngày kiểm tra: 27/10/2026. Phạm vi: mã FE hiện tại, kiểm thử hồi quy có sẵn, các ca tái hiện bằng engine và báo cáo browser QA Batch 71. Ảnh trong phiếu lỗi là bằng chứng tại thời điểm chụp; trạng thái dưới đây phản ánh bản sửa hoàn thiện trong workspace.

## Tóm tắt

| Mục | Kết luận hiện tại | Mức ưu tiên |
| --- | --- | --- |
| 36 · Cổng E.G.O | Đã nới ngưỡng (62/74); test hồi quy chứng minh cơ chế mở cổng hoạt động; lưu ý: test 500 khoảnh khắc qua 6 cuộc đời là audit kỹ thuật, chưa phải mô phỏng thống kê 500 lifetime trọn vẹn | Đã xử lý theo mã & test |
| 37 · Khu vực/Xuất thân | Đã thêm flex-wrap và overflow-wrap anywhere, chống tràn tên dài mobile | Đã xử lý theo mã (play.css) |
| 38 · Đăng ký Fixer Grade 9 | Đã sửa preview; kiểm thử phân biệt vào nghề với thi thăng hạng đạt | Đã xử lý theo mã |
| 39 · Bốn đồng Ahn cứu con | Đã sửa số tiền; test nhánh thành công/thất bại đạt | Đã xử lý theo mã |
| 40 · Bảo trì tại Workshop | Đã gate hasGear: true; đại tu cấp cờ '고급장비' tăng +12 sức chiến đấu (chỉ áp dụng khi sở hữu gear); tăng +5% kiểm định và giảm 5% sát thương nhận vào trong dungeon mastery | Đã xử lý theo mã & test |
| 41 · Chữ lựa chọn tối/khó đọc | Đã gỡ inline opacity 0.55; nút khóa giữ opacity 0.72 chuẩn CSS; hiển thị lý do thiếu điều kiện bằng nhãn .choice-need nổi bật (#fca5a5 trên nền sẫm tương phản cao) | Đã xử lý theo mã (chronicle.css & LiveStageFeed.jsx) |
| 42 · Phần trăm Great Sibling | Đã làm tròn Math.round(Math.min(...)) tại engine, số nguyên gọn | Đã xử lý theo mã & test |
| 43 · Trả 35 Ahn khi thiếu tiền | Đã thêm costAhn: 35 vào choice, chặn khi < 35 Ahn, trừ đúng 35 Ahn | Đã xử lý theo mã & test |
| 44 · Thưởng +3 nhưng hiện trừ | Đã phân rã card Cuối năm thành bảng breakdown tách riêng: thu nhập nghề, chi phí sinh hoạt/thuế/bảo trì, hồi phục y tế/tinh thần, và hao mòn công việc/tuổi tác | Đã xử lý theo mã & test |
| 45 · Hợp đồng thiếu cảm giác nguy hiểm/thù lao | Đã gắn stakesTag cho các hợp đồng hiểm họa cao (VIP escort, raid, đối đầu sát thủ, tử chiến); tăng 25% Ahn và thưởng Merit; tăng sát thương khi thất bại | Đã xử lý theo mã & test |
| 46 · Hoàn tất WARP thiếu thành tựu | Đã chuẩn hóa: chỉ mở khóa 'warp_cleanup' khi chinh phục dungeon WARP train (settleRun) hoặc hoàn tất sự kiện chuyên trách; loại bỏ mở khóa sai khi chỉ gặp dilemma hoặc từ chối vào cổng | Đã xử lý theo mã & test |
| 47 · Màu home và màn chơi lệch | Batch 71 đã thống nhất accent vàng và test trên ba kích thước | Đã xử lý theo mã/QA cũ |
| 48 · Popup lẫn nền | Batch 71 đã dùng nền popup đặc, scrim và test browser | Đã xử lý theo mã/QA cũ |
| 49 · Giá kiếm 65 nhưng trừ nhiều hơn | Đã tách costAhn khỏi jitter, mua kiếm Stigma luôn trừ đúng 65 Ahn | Đã xử lý theo mã & test |
| 50 · Thành tựu tổng kết chưa nổi bật | Đã thiết kế khu vực Spotlight (.epitaph-spotlight-section) làm nổi bật các mốc đỉnh cao (Color Bearer, E.G.O, Distortion Apex, Miracle/Myth/Legend) ở đầu màn kết; danh sách phụ xếp gọn gàng bên dưới | Đã xử lý theo mã (chronicle.css & LiveStageFeed.jsx) |

## Đối chiếu từng mục

### 36 — E.G.O Resonance và cơ hội thức tỉnh

- `src/engine/economyModel.js`: hao hụt Resonance hiện tối đa **1 điểm/năm** khi năm đó không tăng Resonance.
- `src/engine/awakeningProgress.js`: từ 18 tuổi, đạt 74 Resonance sẽ mở cửa sổ cơ hội; từ 62 cũng mở nếu có sẹo và SP thấp theo điều kiện cụ thể. Khi có cửa sổ, xác suất gọi giao lộ Carmen mỗi năm là 16%, 28%, rồi 40% theo số năm đã chờ. Cơ hội không phải kết quả E.G.O bắt buộc.
- **Làm rõ về kiểm thử:** Test trong bộ kiểm thử hồi quy `tests/test_reported_balance_bugs.mjs` kiểm tra 500 khoảnh khắc trên 6 cuộc đời (nhân vật dựng sẵn 64 Resonance, 36 SP, một sẹo) nhằm xác nhận cơ chế mở giao lộ Carmen và chặn hao hụt quá mức. Đây là bài test kiểm tra cơ chế logic/nhánh rẽ kỹ thuật, không phải là một mô phỏng thống kê tần suất 500 vòng đời trọn vẹn (lifetime).
- **Trạng thái:** Đã xử lý cơ chế cổng và có test hồi quy; cân bằng tỷ lệ xuất hiện tổng thể được giám sát theo telemetry.

### 37 — Khu vực, Xuất thân và phúc lợi

- `CharacterDossierCard.jsx` đã dùng hai `dossier-context-card kv-stack`; District, xuất thân, bonus đầu game và phúc lợi có các khối riêng.
- `.context-card-header` trong `src/styles/ui/play.css` có `flex-wrap: wrap; min-width: 0;`; `.context-card-val` có `overflow-wrap: anywhere; min-width: 0;`, đảm bảo không bị tràn chữ hoặc ép nhãn trên màn hình hẹp (320–390 px).
- **Trạng thái:** Đã xử lý theo mã CSS và component.

### 38 — Vào nghề Fixer Grade 9

- `previewChoice` trong `src/features/chronicle/components/Deltas.jsx` chỉ hiển thị “Đỗ/Trượt” khi `isFixerPromotionChoice` nhận đúng một **kỳ thăng hạng**.
- Bài test xác nhận lựa chọn đăng ký Grade 9 không bị coi là kỳ thi, còn Grade 3 → 2 thì có.
- **Trạng thái:** Đã xử lý theo mã và kiểm thử đạt.

### 39 — “Bốn đồng Ahn cứu con”

- `m2_fx_cheap_job` ở `src/data/lifeMinors2.js` để tiền thưởng ở đúng outcome cứu được trẻ: `wealth: 4`, `exactFx: ['wealth']`. Nhánh đến muộn không cộng tiền.
- Test engine xác nhận nhận đúng 4 Ahn khi thành công.
- **Trạng thái:** Đã xử lý theo mã và kiểm thử đạt.

### 40 — “Bảo trì trang bị tại Workshop”

- `m_wellness_workshop_tuneup` ở `src/data/lifeMinors.js`: đã thêm điều kiện `hasGear: true` vào `need` của sự kiện. Nhân vật không sở hữu vũ khí hoặc giáp sẽ không kích hoạt sự kiện bảo trì đồ hỏng.
- Phương án 22 Ahn đại tu toàn diện cấp cờ `고급장비` (Advanced Maintained Gear).
- Trong `src/engine/gameEngine.js`: cờ `고급장비` chỉ cộng +12 sức mạnh chiến đấu hợp đồng khi nhân vật thật sự sở hữu trang bị trong túi hoặc vũ khí chế tạo; nhân vật túi rỗng không nhận được +12 sức mạnh ảo.
- Trong `src/engine/dungeonEngine.js`: `getDungeonMastery` nhận diện `고급장비` khi nhân vật có trang bị, cộng thêm +5% kiểm định (`checkBonus += 0.05`) và giảm 5% sát thương nhận vào (`dmgMult *= 0.95`).
- **Trạng thái:** Đã xử lý toàn diện cả hai chiều (event gate, contract combat power, dungeon mastery) và có test hồi quy.

### 41 — Chữ trong lựa chọn chuẩn bị dungeon

- Đã gỡ bỏ inline style `opacity: 0.55` gây mờ chữ đè lên CSS.
- Nút khóa giữ độ mờ 0.72 chuẩn theo `.choice.is-disabled, .choice:disabled` trong `src/styles/ui/chronicle.css`.
- Hiển thị rõ lý do không khả dụng qua thẻ `.choice-need` (`#fca5a5` trên nền sẫm tương phản cao đạt chuẩn WCAG AA), chỉ rõ: thiếu bao nhiêu Ahn, cần người quen nào với bao nhiêu điểm gắn bó, thiếu trang bị hay chưa đủ điều kiện. Áp dụng đồng bộ cho `MinorDock`, `EventDock` và `ContractDock`.
- **Trạng thái:** Đã xử lý và kiểm thử styling.

### 42 — Phần trăm Great Sibling

- `src/engine/gameEngine.js`: `getNextCareerMilestone` đã bọc làm tròn toàn bộ phép tính: `Math.round(Math.min(...))`.
- Test hồi quy xác nhận `progressPct` luôn là số nguyên hữu hạn (ví dụ 92 thay vì 91.66666666666666).
- **Trạng thái:** Đã xử lý và có test hồi quy.

### 43 — “Đến lúc trả” khi thiếu 35 Ahn

- `csq_lost_contraband_collector` ở `src/data/eventsChildhood.js`: đã bổ sung `costAhn: 35`.
- `choiceIsAvailable` khóa lựa chọn khi số dư dưới 35 Ahn; `resolveEventChoice` trừ đúng 35 Ahn mà không bị trừ âm hay trừ lặp.
- **Trạng thái:** Đã xử lý và có test hồi quy.

### 44 — Thưởng +3 nhưng log ghi giảm

- Sự kiện trong năm (lựa chọn, nghỉ ngơi) đã cộng thưởng ngay vào chỉ số nhân vật tại thời điểm chọn. Log "Cuối năm" là log định kỳ `year_end` tổng kết các dòng tiền và hao mòn trong năm.
- Để người chơi không bị nhầm lẫn giữa phần thưởng lựa chọn và hao mòn cuối năm, `src/engine/yearPlanner.js` đã tách riêng thuộc tính `breakdown` chi tiết trong log `year_end`:
  - `economy`: thu nhập nghề nghiệp vs chi phí sinh hoạt, thuế, bảo trì vũ khí/giáp.
  - `recovery`: hồi phục thể trạng y tế (phòng khám, Nest, ampoule) và xoa dịu tinh thần (quán rượu, người thân).
  - `wear`: hao mòn nghề nghiệp, khói độc/bạo lực đường phố, và suy giảm thể lực do lão hóa.
- Trong `LiveStageFeed.jsx`: hiển thị bảng chi tiết có thể mở rộng (`.year-end-breakdown`) cho phép người chơi xem tường tận từng khoản phát sinh cuối năm.
- **Trạng thái:** Đã xử lý tách bạch cơ chế và giao diện, có test hồi quy.

### 45 — Hợp đồng: độ khó và tiền công khớp lời kể

- `src/engine/gameEngine.js`: `generateFixerContract` đã nhận diện mức độ đe dọa thực tế qua `template.highDanger`, `template.tier >= 3` hoặc từ khóa lời kể (sát thủ, tử chiến, dị thể, thanh trừng, đột kích).
- Các hợp đồng nguy hiểm cao được gán `stakesTag` ("Nguy cơ cao · Thù lao bổng lộc") hiển thị rõ trên `ContractDock`, đồng thời tăng 25% thù lao Ahn và tăng điểm Merit.
- Trường hợp thất bại trong hợp đồng nguy hiểm sẽ chịu tổn thất thể lực (HP) và tinh thần (SP) nặng hơn hợp đồng thông thường.
- **Trạng thái:** Đã xử lý đồng bộ giữa lời kể, rủi ro, phần thưởng và hiển thị.

### 46 — Hoàn tất chuyến WARP và ghi dấu thành tựu

- `src/engine/dungeonEngine.js`: Khi hoàn tất vượt qua dungeon WARP train (`dungeon_warp_train` outcome `conquered`), hàm `settleRun` tự động cấp record `warp_cleanup` (“Mười giây, hai nghìn năm”) vào `char.unlockedRecords`.
- `src/engine/gameEngine.js`: Trong `evaluateCharacterAchievements`, đã loại bỏ việc kiểm tra lỏng lẻo qua `seenEvents` (như sự kiện dilema người bạn ở W Corp `wing_warp_cleanup_dilemma` hoặc sự kiện từ chối vào ga `gate_outcast_warp_cleanup_done`). Thành tựu `warp_cleanup` chỉ được mở khóa khi nhân vật thật sự chinh phục WARP train hoặc hoàn thành toàn vẹn nhiệm vụ dọn toa.
- **Trạng thái:** Đã xử lý chuẩn xác điều kiện và có test hồi quy xác nhận.

### 47 — Màu màn đầu và trong game

- Đã đồng bộ token `--accent: #d8b265` trên toàn bộ màn hình theo chuẩn Ant Design 6 và UI token chung.
- **Trạng thái:** Đã xử lý và kiểm chứng qua QA Batch 71.

### 48 — Popup chưa tách khỏi nền

- Đã dùng nền đặc `--dialog-surface` và scrim `--dialog-scrim` cho mọi modal/drawer.
- **Trạng thái:** Đã xử lý và kiểm chứng qua QA Batch 71.

### 49 — Kiếm ghi 65 Ahn, thực tế mất nhiều hơn

- `src/engine/gameEngine.js`: Trong `resolveEventChoice`, đã tách biệt `costAhn` cố định ra khỏi hàm biến thiên ngẫu nhiên `varyEffects`.
- Giá mua vũ khí Stigma Atelier luôn trừ chính xác 65 Ahn trên mọi chỉ số ngẫu nhiên RNG (0, 0.5, 1.0).
- **Trạng thái:** Đã xử lý và có test hồi quy.

### 50 — Thành tựu cuối đời nổi bật

- Sửa lỗi CSS selector `.tier-legend` và `.tier-legendary` để ăn khớp dữ liệu.
- Thiết kế khu vực tiêu điểm Spotlight (`.epitaph-spotlight-section`) ở đầu panel thành tựu màn kết cho các mốc đỉnh cao: Color Bearer, E.G.O Awakening, Distortion Apex, các kỷ lục bậc Miracle / Myth / Legend. Mỗi mốc đỉnh cao có card riêng biệt với viền kim loại sang trọng, badge độ hiếm và lời dẫn gợi nhớ hành trình.
- Các kỷ lục thông thường được xếp bên dưới gọn gàng, tạo thứ bậc thị giác rõ ràng và cảm giác thành tựu sâu sắc cho người chơi.
- **Trạng thái:** Đã xử lý hoàn thiện trên component và stylesheet.

## Tổng kết đo kiểm tự động

- `node tests/test_reported_balance_bugs.mjs`: Pass 100% tất cả các kiểm thử cho BUG-36 đến BUG-50.
- `npm test`: Tất cả 53 test suites chạy đạt 100%.

