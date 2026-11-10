# Kế hoạch nâng cấp toàn diện Đợt 142–147

File này thay cho các bản rà soát đã hoàn thành (`KE_HOACH_DOT_135.md`, `EVENT_NARRATIVE_AUDIT_2026_11_05.md`, `NPC_CAN_SUA.md`). Toàn bộ Đợt 113–141 đã hoàn tất và ghi trong `PROGRESS_LOG.md`.

Luật chơi đang chạy nằm ở `docs/LUAT_HIEN_HANH.md`, lore và giọng văn ở `UNIVERSE.md`, lịch sử thay đổi ở `PROGRESS_LOG.md`.

## Tóm tắt các đợt thực hiện (Đợt 142–147)

| Đợt | Hạng mục | Phạm vi | Trạng thái |
|---|---|---|---|
| **142** | **Kinh tế cuối đời & Quỹ Bảo Tồn vượt trần 100 Ahn** (`reserveAhn`, 3 khoản đầu tư lớn tuổi 40+: tài trợ Office/địa bàn, trang bị đồng đội, quỹ di sản đời sau) | `dungeonEngine.js`, `gameEngine.js`, `yearPlanner.js`, `eventsApexTwilight.js` | đã xong |
| **143** | **Tăng độ phủ kho sự kiện lớn (814 major)** (ưu tiên sự kiện chưa từng gặp qua các đời `bloodlineSeenEvents`) | `weaverAI.js`, `gameEngine.js`, `gameStore.js` | đã xong |
| **144** | **Hồi ức nhân quả 25–40 năm & Cảnh tiễn biệt người thân qua đời vì tuổi già** (`elder_callback_echo_of_youth`, `bereavement_elder_old_friend_passing`) | `director.js`, `eventsApexTwilight.js` | đã xong |
| **145** | **Thẻ Di cảo chia sẻ cuối đời (Shareable Epitaph Card & Copy Summary)** (nút sao chép bản tóm tắt Di cảo định dạng đầy đủ kèm Seed, danh vị, di vật, cột mốc và Quỹ Bảo Tồn) | `LiveStageFeed.jsx` | đã xong |
| **146** | **Gọt câu chữ tiếng Việt đợt 2 (`vaClause`)** (xóa sạch toàn bộ 80 lỗi `, và ` trong `eventsExpansion.js` về `0`, hạ trần kiểm định trong `package.json` từ `2135` xuống `2055`) | `src/data/eventsExpansion.js`, `package.json` | đã xong |
| **147** | **Tối ưu phân tách chunk bundle (`vite.config.js`)** (tách `story-fingers-a`, `story-fingers-b`, `story-contracts` để hạ kích thước chunk lớn nhất và không tạo vòng lặp import) | `vite.config.js` | đã xong |

---

## Chi tiết từng đợt

### Đợt 142 — Kinh tế cuối đời & Quỹ Bảo Tồn vượt trần 100 Ahn
1. **Không mất trắng Ahn vượt trần 100 (`char.reserveAhn`):**
   - Trong `dungeonEngine.js` (`settleRun`) và `gameEngine.js` (khi giải quyết hợp đồng và sự kiện), mỗi khi `wealth` cộng thêm vượt quá trần `100`, phần vượt trần (`overflow`) được chuyển vào `char.reserveAhn` (Quỹ Bảo Tồn / Tích lũy ngoài sổ).
   - Trong `legacyKeepsake.js` và `createNewCharacter`, `reserveAhn` (cùng cờ đầu tư di sản) cộng thêm Ahn khởi đầu và điểm di sản cho thế hệ kế tiếp.
2. **Ba khoản đầu tư lớn sau tuổi 40 (`elder_investment_*` / lựa chọn đầu tư):**
   - **Tài trợ Office / Mở rộng Địa bàn (`35 Ahn`):** Gắn cờ `EndgameOfficePatron`, cộng lương thụ động hằng năm (`+4 Ahn/năm`), `+6 Rep`, `+5 Network` và `+6` sức mạnh hợp đồng.
   - **Trang bị Workshop cho Đồng đội (`30 Ahn`):** Gắn cờ `CompanionMasterworkGear`, cường hóa đồng đội đang đi cùng (`+15 Bond`, tăng `checkBonus` thêm `+0.05`, giảm thêm `10%` sát thương trong Dungeon và tăng tỉ lệ `companionLeadChance`).
   - **Quỹ Di Sản Huyết Thống (`40 Ahn`):** Gắn cờ `LineageEndowmentFund`, chuyển vào `reserveAhn` để đời con cháu tiếp theo khởi đầu với `+18 Ahn`, `+6 Rep` và giữ nguyên độ bền kỷ vật.

### Đợt 143 — Tăng độ phủ kho sự kiện lớn (809 major)
1. **Theo dõi sự kiện đã gặp qua nhiều thế hệ (`bloodlineSeenEvents`):**
   - Trong `weaverAI.js` (`scoreEventUtility`), những sự kiện chưa từng xuất hiện trong `char.bloodlineSeenEvents` (tổng hợp từ `pastLives` hoặc truyền vào `char`) được nhân hệ số khám phá `x1.35`, giúp người chơi chơi nhiều đời liên tục bắt gặp các sự kiện mới trong kho 809 major.
2. **Cân bằng trọng số nhóm sự kiện hiếm:**
   - Tăng nhẹ trọng số cơ sở cho các sự kiện nhánh Finger/Syndicate, Wing và Workshop đang có `weight` quá thấp hoặc dải tuổi quá hẹp để tăng tỉ lệ xuất hiện tự nhiên trong một đời.

### Đợt 144 — Hồi ức nhân quả 25–40 năm & Tiễn biệt người thân tuổi già
1. **Sự kiện gọi lại nhân quả xa (`elder_callback_echo_of_youth`):**
   - Đọc `char.weaver.nodes` từ `20+` năm trước (hoặc các lựa chọn lớn thời trẻ ở tuổi `18–35`) để mở một sự kiện hồi tưởng / gặp lại hệ quả cũ ở tuổi `55–120`.
2. **Sự kiện tiễn biệt người thân qua đời vì tuổi già (`bereavement_elder_old_friend_passing`):**
   - Khi một NPC thân thiết (`mentor`, `friend`, `partner`, `spouse`) qua đời vì tuổi già (`director.js:436`) và có `bond >= 50`, mở khóa sự kiện tiễn biệt cho phép người chơi đến viếng, nhận lại vật kỷ niệm hoặc hoàn thành lời hẹn cũ.

### Đợt 145 — Thẻ Di cảo chia sẻ cuối đời (Shareable Epitaph Summary)
- Trên màn hình kết thúc cuộc đời trong `LiveStageFeed.jsx`, thêm nút **"Sao chép Di cảo" / "Copy Epitaph"** (cạnh nút chia sẻ Seed) tạo ra một bản tóm tắt văn bản trình bày đẹp mắt gồm: Tên, Tuổi thọ, Nghề/Danh hiệu đỉnh cao, Kết cục (`lifeEnding`), Di vật để lại, Tối đa 5 cột mốc tiêu biểu và Mã Seed, kèm phản hồi `"Đã chép Di cảo"` tức thì.

### Đợt 146 — Gọt câu chữ tiếng Việt đợt 2 (`vaClause`)
- Quét các file còn nhiều `, và ` nhất và viết lại tự nhiên theo chuẩn `.agents/skills/vi-prose/SKILL.md` (giữ nguyên toàn bộ 7 chỉ số lỗi dịch máy ở mức `0`), sau đó hạ ngưỡng `vaClause` trong `package.json`.

### Đợt 147 — Tối ưu phân tách chunk bundle (`vite.config.js`)
- Chia nhỏ các chunk dữ liệu truyện lớn trong `vite.config.js` để không còn chunk dữ liệu đơn lẻ nào phình quá lớn, giúp trình duyệt tải song song nhanh hơn và gỡ cảnh báo chunk size khi build.
