# TIẾN TRÌNH THIẾT KẾ VÀ NÂNG CẤP HỆ THỐNG: THE CITY CHRONICLES
*Cập nhật: 29/10/2026*

---

## 1. TÔN CHỈ THIẾT KẾ & ĐỊNH HƯỚNG CỐT LÕI (CORE DESIGN PHILOSOPHY)

### 1.1. Anti-Sandbox: Sinh Tồn Ngẫu Nhiên Hữu Cơ (Emergent Life-Sim Causality)
* **Không dọn sẵn mâm cỗ định mệnh:** Trong The City, không có cá nhân nào được ngồi trước menu chọn tương lai: *"Đến 40 tuổi, tôi muốn làm thợ xưởng / độ đồ cấm / lắng nghe Carmen"*. Tương lai của nhân vật là **kết quả tích lũy (emergent outcome)** từ hoàn cảnh sống, nợ nần, chấn thương thể xác và các biến cố ngẫu nhiên có tính nhân-quả.
* **Người chơi chọn phản ứng trước cơ hội/nghịch cảnh, không chọn sẵn kết quả:** Mỗi lựa chọn lớn (vào nghề, gia nhập phe phái, thăng tiến, vượt biên) đều phải có **thử thách, cái giá phải trả và xác suất thất bại**. Thất bại không phải là Game Over mà mở ra nhánh sinh tồn mới (trở thành Outcast, mang thương tật, vướng nợ ngầm).

### 1.2. Gameplay "Hard but Fair" — Cảm Hứng Từ Các Tác Phẩm Kinh Điển
Hệ thống gameplay được cân bằng tỉ mỉ dựa trên các nguyên lý sinh tồn nổi tiếng:
* **Darkest Dungeon:** Sự hao mòn thể lực và tinh thần qua thời gian (Attrition). Những vết sẹo và chấn thương chiến đấu không biến mất mà tích tụ thành gánh nặng. Áp lực tâm lý (Sanity breakdown) dẫn dắt nhân vật đến khoảnh khắc sụp đổ hoặc khai hoa E.G.O một cách tự nhiên.
* **Sunless Sea & Sunless Skies:** Nỗi kinh hoàng của sự vô danh (Terror & Dread), chi phí duy trì thể trạng giữa các vùng đất khắc nghiệt, và những cuộc chạm trán bí hiểm nơi ranh giới sống chết.
* **Disco Elysium:** Giọng nói nội tâm (Carmen/E.G.O) không xuất hiện như một lựa chọn menu mà trỗi dậy từ những vết nứt tâm hồn sâu kín nhất. Sự tàn tạ của tuổi trung niên là một phần của câu chuyện đời người.
* **Roadwarden & BitLife:** Nhịp sống theo năm tháng, thông số biến thiên tự nhiên theo ao trọng số động (Weighted Fate Pools), nơi các lựa chọn vi mô dẫn đến những bước ngoặt vĩ mô.

### 1.3. Cảm Hứng Văn Học Mở Rộng — Giữ Chặt Canon Project Moon
* **Franz Kafka:** Sự lạnh lẽo, vô cảm của bộ máy quan liêu khổng lồ từ Hana Association và các tập đoàn Wings. Quy định, hợp đồng và trát giáng cấp giáng xuống đầu nhân vật như một định mệnh không thể tranh cãi.
* **Raymond Chandler & Cyberpunk Noir:** Không khí ẩm mốc, cay đắng của những Fixer luống tuổi ở Backstreets: khớp cơ khí rỉ sét, khói thuốc rẻ tiền, nỗi lo tiền nhà và sự đe dọa từ thế hệ trẻ.
* **Fyodor Dostoevsky:** Chiều sâu tâm lý về tội lỗi, sự cùng cực và nỗi tuyệt vọng cùng cực — mảnh đất màu mỡ để tiếng thì thầm của Carmen cất lên trong ánh sáng chói lòa.

---

## 2. NHẬT KÝ THỰC THI (IMPLEMENTATION LOG)

### 2.1. Loại Bỏ Các "Lựa Chọn Mời Sẵn" (Eliminating Pre-baked Menus)

| Vị trí / File | Vấn đề cũ | Giải pháp tái cấu trúc |
| :--- | :--- | :--- |
| `ad_outskirts_crossroad_18` (`src/data/eventsChildhood.js`) | Điểm vượt biên từ Outskirts vào City có 3 lựa chọn nhận thẳng 100% nghề không rủi ro. | Chuyển thành các cuộc vượt biên/nộp đơn đầy rủi ro: có tỷ lệ bị lừa gạt, bị phục kích nổ súng hoặc hóa chất, dạt vào Backstreets làm Outcast mang sẹo. |
| `syn_choose_finger_allegiance` (`src/data/eventsFactions.js`) | Menu "buffet 5 Ngón Tay" trên một mâm bạc, tự do bấm nút chọn Ngón Tay gia nhập 100%. | Xóa bỏ bàn đàm phán chung. Chuyển thành cuộc thanh trừng/sát hạch khắc nghiệt: mỗi Ngón Tay đòi hỏi nghi thức tàn khốc riêng với nguy cơ thất bại; giữ vững con đường Syndicate Độc Lập tự do đối đầu hiểm nguy. |
| `eventsSupernatural.js` | Lựa chọn bộc phát mang nhãn meta lộ liễu: `(Distortion)`. | Xóa bỏ nhãn meta; diễn đạt thuần túy bằng ngôn ngữ tâm lý và sự đầu hàng trước nỗi đau: *"Nhắm mắt lại, buông xuôi ý chí và đắm chìm vào vầng thái dương ấm áp"*. |

### 2.2. Hệ Thống Ma Sát Sinh Học Trung Niên (Mid-Life Biological Friction & Maintenance System, Tuổi 36–49)
* **Vị trí:** `src/engine/economyModel.js` và `src/engine/yearPlanner.js`.
* **Cơ chế:**
  * Nhân vật từ 36 đến 49 tuổi có từ 2 vết sẹo trở lên hoặc mang chi giả sẽ phát sinh **Chi phí bảo trì thể trạng** (`midlifeMaintenanceLoss = 2 Ahn/năm`).
  * *Nếu có đủ Ahn:* Tự động chi trả để mua thuốc giảm đau, dầu bôi trơn khớp và hiệu chỉnh thần kinh, giữ vững phong độ chiến đấu.
  * *Nếu không đủ Ahn:* Vết thương cũ tái phát, cơ thể suy giảm (`-1 HP`, `-1 SP`), nhận cờ `PainSuppressantDeficit` làm giảm nhẹ chỉ số phản xạ trong khảo thí.

### 2.3. Ao Định Mệnh Biến Thiên (Dynamic Weighted Fate Pools)
* **Vị trí:** `src/engine/director.js`.
* **Cơ chế:**
  * **Carmen's Whispers:** Tự động nhân 3.5 lần trọng số xuất hiện khi `Sanity <= 25` và `scars >= 3`. Tiếng nói chỉ tìm đến kẻ đang vụn vỡ dưới sức nặng của ký ức đau thương.
  * **Ma sát trung niên (Veteran Attrition):** Tăng trọng số các sự kiện cọ xát tuổi tác, đào tạo đệ tử và áp lực từ thế hệ trẻ cho nhân vật tuổi 36–50.

### 2.4. Sóng Biến Động Vĩ Mô Toàn Thành Phố (City Macro-Shocks)
* **Vị trí:** `src/data/eventsRouteConsequences.js`.
* **4 Biến cố vĩ mô ngẫu nhiên giáng xuống:**
  1. `shock_tcorp_time_tax_levy` (District T): Thuế thời gian T Corp truy thu giờ chưa dùng. Trả Ahn hoặc mất sinh lực.
  2. `shock_kcorp_ampoule_recall` (District K): Thu hồi lô tinh chất trị liệu K Corp lỗi. Chi phí y tế tăng vọt.
  3. `shock_sweeper_extended_purge` (Backstreets): Báo động 3:13 bị trễ, Sweeper càn quét kéo dài quá bình minh.
  4. `shock_wing_subsidiary_purge` (Nest/Backstreets): Chi nhánh nghiên cứu của Wing bị thanh trừng, phế liệu và công nghệ cấm tràn ra ngoài.

### 2.5. Nâng Cấp Thiết Kế Giao Diện & Trải Nghiệm Người Dùng (UI/UX Craftsmanship & Mobile Ergonomics)
Áp dụng toàn diện tiêu chuẩn từ các bộ kỹ năng `/impeccable`, `/hallmark`, `/design-taste-frontend`:

1. **Loại bỏ triệt để Anti-patterns (`impeccable`):**
   - Rà soát toàn bộ dự án (`npx impeccable detect src/`), đưa số lỗi và khuyến cáo về **0 anti-patterns, 0 advisories**.
   - Chuẩn hóa gradient hai trục trên `.nameplate.route-wing::before` thành dải chuyển màu mui xe công ty đơn trục sang trọng.
   - Tuân thủ Hallmark Rule 2: Không sử dụng `transition: all`, luôn chỉ định rõ thuộc tính chuyển đổi (`border-color, background-color, transform, box-shadow`).
   - Bổ sung đầy đủ bảo vệ giảm chuyển động (`@media (prefers-reduced-motion: reduce)`).

2. **Phiếu Khế Ước Xúc Giác & Con Dấu Lựa Chọn (Tactile Contract Slips & Wax Seal Badges):**
   - **Vị trí:** `src/styles/ui/chronicle.css` (`.choice`, `.choice-badge`, `.choice-need`, `.contract-stakes-tag`).
   - Nút lựa chọn `.choice` phản hồi xúc giác tinh tế: nâng nhẹ khi hover trên desktop (`transform: translateY(-1px)`, viền ánh kim và đổ bóng sâu), lún nhẹ khi ấn (`transform: translateY(1px)`).
   - Thiết lập `@media (hover: hover)` để loại bỏ tình trạng "dính hover" trên màn hình cảm ứng điện thoại.
   - Thẻ con dấu số `.choice-badge` mang phong cách con dấu niêm phong mực/sáp với số bảng (`font-variant-numeric: tabular-nums`).
   - Huy hiệu điều kiện `.choice-need` và `.contract-stakes-tag` mang phong cách tem kiểm định của thanh tra City.

3. **In Khắc Cột Mốc Lịch Sử Lớn (Major Turning Points Drop Cap):**
   - **Vị trí:** `src/features/chronicle/components/LiveStageFeed.jsx` và `src/styles/ui/chronicle.css` (`.entry.is-major`).
   - Các biến cố bước ngoặt cuộc đời (nhận bằng Fixer, gia nhập Ngón Tay, đột phá E.G.O, thảm họa cánh) được đóng khung viền trang trọng với chữ cái đầu dòng cổ điển (Drop Cap `::first-letter`, font serif Literata, sắc vàng ấm áp `--accent`).

4. **Tối Ưu Công Thái Học Trên Điện Thoại (Mobile Navigation & Bottom Sheet Ergonomics):**
   - **Vị trí:** `src/styles/ui/shell.css` và `src/styles/ui/play.css`.
   - Nút điều hướng chân trang `.bottom-nav button` tích hợp `touch-action: manipulation; -webkit-tap-highlight-color: transparent;` triệt tiêu độ trễ nhấn 300ms.
   - Thêm chấm ngọc phát quang `--accent` (`::after`) báo hiệu tab đang kích hoạt tinh tế, không làm thô thanh điều hướng.
   - Thiết lập thanh kéo cảm ứng `.sheet-drag-handle` / `.sheet-grab-handle` cho bảng hồ sơ di động (`mobile-dossier-sheet`).

5. **Nhịp Xung Cảnh Báo Sinh Lực Nguy Kịch (Critical Vitals Segmented Pulse):**
   - **Vị trí:** `src/styles/ui/play.css` (`.stat.is-critical`, `.hud2-stat.is-critical`).
   - Khi HP hoặc Sanity giảm xuống dưới 25, thanh thông số phát nhịp thở cảnh báo tinh tế (`criticalPulse`, `criticalTextPulse`), đồng bộ với hiệu ứng thì thầm của Carmen.

---


### 2.6. Tinh Chỉnh Ma Sát Tuổi Trung Niên & Triệt Tiêu Cộng Dồn Ma Sát Kép (Anti-Double-Dipping Attrition Rebalance)
* **Vấn đề phát hiện:** Trước đó hệ thống `midlifeMaintenanceLoss` (kích hoạt ở tuổi 36, yêu cầu 2 Ahn/năm và trừ thẳng 1 HP khi thiếu tiền) gây hiện tượng "chảy máu tử nạn vô lý" cho các nhân vật tuổi 40, tạo ra cạm bẫy ma sát kép (double-dipping) bất công khi game vốn đã có sẵn 3 cơ chế lão hóa:
  1. `agingLoss`: Tự động trừ máu tăng tốc theo hàm mũ từ tuổi 50 trở đi.
  2. `jobWear`: Khấu trừ HP và SP hàng năm theo cường độ nghề nghiệp.
  3. `healAmount`: Khả năng hồi phục thể lực suy giảm tự nhiên khi về già.
* **Các thay đổi đã triển khai:**
  1. `src/engine/economyModel.js`:
     - Tăng ngưỡng tuổi kích hoạt từ 36 lên **38 tuổi**, yêu cầu phải mang **≥ 3 vết sẹo nặng** (hoặc cơ thể cơ khí hóa toàn phần).
     - Bổ sung miễn trừ tổ chức: `if (hasEstablishedStanding(char)) return 0;` (Fixer Hạng ≤ 5 có văn phòng riêng, Nhân viên chính thức các Cánh The Wings, Capo/Đại ca Syndicate được tổ chức đài thọ y tế, chi phí = 0 Ahn).
     - Giảm mức phí bảo dưỡng từ 2 Ahn xuống **1 Ahn/năm** cho Fixer tự do cấp thấp.
  2. `src/engine/yearPlanner.js`:
     - Loại bỏ hoàn toàn dòng lệnh trừ máu (`add('health', -1)`) khi thâm hụt Ahn. Nhân vật không bao giờ bị mất máu tử nạn vì thiếu tiền bảo dưỡng.
     - Chỉ gán cờ `PainSuppressantDeficit` (khớp kim loại rít, giảm 15% phản xạ) và gây 1 điểm áp lực tinh thần nhẹ (`-1 SP`) duy nhất vào năm đầu tiên phát sinh thiếu thuốc.
  3. `src/engine/director.js`:
     - Hạ hệ số khuếch đại biến cố hao mòn/thoái hóa tuổi trung niên từ **2.2× xuống 1.15×**, dành không gian cho các sự kiện phát triển sự nghiệp, rèn luyện đệ tử và chuẩn bị thi tuyển Hana.

### 2.7. Tỷ Lệ Đạt Color Fixer & E.G.O Qua 500 Lần Chơi Có Định Hướng (Focused Simulation Statistics)
Chạy kiểm định mô phỏng 500 vòng đời với chiến lược người chơi có định hướng (`policy=focused --fixers`):
* **Tỷ lệ đạt Color Fixer:** **7.2% trên toàn bộ 500 vòng đời (36 / 500 nhân vật)**.
* **Tỷ lệ trong nhóm theo nghiệp Fixer:** **8.0% (36 / 448 Fixers)**.
* **Phễu tiến trình Hana Color:**
  - 45 nhân vật đạt chuẩn năng lực (Fixer Hạng 1, đủ uy danh và chiến công).
  - 43 nhân vật được Hana Association gửi lời mời sát hạch thử thách Color (Tỷ lệ gửi đề nghị: **95.6%**).
  - 36 nhân vật vượt qua thử thách đẫm máu để chính thức nhận Danh Hiệu Màu Sắc (Tỷ lệ đỗ kỳ sát hạch: **83.7%**).
* **Độ tuổi đạt Color:** Trung bình **55.4 tuổi** (Trung vị: 55, Trẻ nhất: 41, p10: 48, p90: 62).
* **Thức tỉnh E.G.O:** **10.2% (51 / 500 nhân vật)** (Trung bình: 37.9 tuổi).
* **Đạt cả Color lẫn E.G.O trong cùng một đời:** **4.6% (23 / 500 nhân vật)**.
* **So sánh nền tảng tài chính xuất thân:**
  - Xuất thân Backstreets nghèo khó (`startingAhn < 10`): **5.2% đạt Color (9 / 174)**.
  - Xuất thân có tích lũy (`startingAhn >= 10`): **8.3% đạt Color (27 / 326)**.
  *(Phản ánh đúng tinh thần lore The City: Kẻ dưới đáy vẫn có cơ hội vươn lên đỉnh cao nếu kiên cường và biết tính toán, nhưng người có xuất phát điểm ổn định sẽ có lợi thế hơn).*

### 2.8. Khắc Phục Triệt Để Phông Chữ Diacritic & Ký Hiệu Toán Học Trong Tài Liệu Xuất Bản
* **Lỗi phông chữ (Diacritic Splitting):** Phông chữ serif `Georgia` trên Windows khi render sang PDF qua Chromium/Edge bị lỗi không có ký tự chữ hoa tiếng Việt dựng sẵn (`Ố, Ế, Ợ`), dẫn đến hiện tượng rơi rụng phông chữ và giãn cách vô lý (`HỆ THỐ NG`, `CỐ T`, `CƠ CHẾ `).
  -> **Khắc phục:** Chuyển toàn bộ tiêu đề và nội dung sang hệ phông hệ thống hiện đại: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` với `text-rendering: geometricPrecision` và chuẩn hóa mã hóa Unicode UTF-8 NFC.
* **Ký hiệu toán học (Unrendered LaTeX):** Toàn bộ các cú pháp LaTeX thô (`\le`, `\ge`, `\times`, `\sum`, `\prod`, `\in`, `\iff`, `\rightarrow`) đã được chuyển đổi thành ký tự Unicode chuẩn (`≤`, `≥`, `×`, `∑`, `∏`, `∈`, `⇔`, `➔`), hiển thị sắc nét trên cả Markdown, Web HTML, Microsoft Word (.doc) và PDF.

---
### 2.9. Nâng Cấp Hệ Thống Gắn Kết NPC & Khơi Thông Cơ Chế Cứu Mạng (NPC Bond Scaling & Death Save Activation)
* **Vấn đề phát hiện qua thực nghiệm:**
  1. Hàm `bondCapFor` trước đây khóa cứng trần gắn kết ở mức 40 điểm (55 điểm cho gia đình), và yêu cầu phải hoàn thành nhiệm vụ cá nhân (`questsDone`) mới nâng trần (+20/quest). Tuy nhiên, các sự kiện quest trong `eventsCompanionQuests.js` bị chặn cứng ở mức `max: 1`.
  2. Hệ quả toán học: Bạn đời tối đa chỉ đạt 55 + 20 = 75 điểm; cộng sự và bạn thân tối đa chỉ đạt 40 + 20 = 60 điểm. Trong khi đó, cơ chế Bạn đồng hành hi sinh cứu mạng (`Companion Sacrifice Death Save`) đòi hỏi Bond ≥ 90 (bạn đời/cộng sự) hoặc ≥ 95 (bạn thân/sư phụ), khiến cơ chế cứu mạng này trở thành "tính năng chết" không bao giờ kích hoạt được trong game.
  3. Hàm `resolveEventChoice` trước đó bỏ quên không phân tích trường `npcQuest`, khiến người chơi hoàn thành nhiệm vụ đồng đội nhưng `questsDone` không được ghi nhận.
  4. Thuật toán phai nhạt quan hệ (`driftBonds`) chạy từ tuổi sơ sinh khiến tình bạn thời thơ ấu tụt dốc từ 13 xuống 6 điểm trước năm 10 tuổi, vô hiệu hóa luôn tính năng giữ liên lạc (`keepInTouch`).

* **Giải pháp kiến trúc toàn diện đã triển khai:**
  1. `src/data/npcPersonality.js`:
     - Tái cấu trúc `bondCapFor(npc)`: Nâng trần khởi điểm theo bản chất quan hệ (Bạn đời: 75, Cộng sự chiến đấu: 65, Sư phụ: 60, Bạn thân: 50).
     - Cho phép thâm niên đồng hành (nhiều năm sát cánh sau trưởng thành) tự nhiên nới rộng trần gắn kết lên tới +20 điểm.
     - Cùng nhau sinh tử vượt Hầm ngục (`dungeonsCleared`) hoặc giải cứu trong cơn hoạn nạn (`crisesAided`) nới rộng thêm trần lên tới +20 điểm.
  2. `src/engine/gameEngine.js`:
     - Bổ sung bộ xử lý `npcQuest` và `promote` vào `resolveEventChoice`: Ghi nhận hoàn thành quest, tăng vọt 14 điểm gắn kết, cập nhật thời gian gặp gỡ và khắc ghi ký ức.
  3. `src/engine/director.js`:
     - Thiết lập bảo vệ tình bạn tuổi thơ trong `driftBonds`: Trẻ em dưới 16 tuổi không bị phai nhạt bạn bè theo luật im lặng người lớn.
     - Đồng bộ truyền dữ liệu thâm niên `yearsTogether` trong cả `applyBonds` và `keepInTouch`.
  4. `src/data/eventsCompanionQuests.js`:
     - Mở rộng giới hạn `max: 3` cho chuỗi biến cố đồng hành, cho phép bạn bè cùng trải qua nhiều thăng trầm trong đời.
  5. `src/engine/npcInteractions.js`:
     - Thay thế `JSON.parse(JSON.stringify)` bằng hàm `cloneChar` an toàn, triệt tiêu lỗi đệ quy tham chiếu tròn khi tương tác với NPC.

* **Kết quả kiểm định thực nghiệm qua 500 vòng đời mô phỏng đầy đủ:**
  - **Tỷ lệ vòng đời chạm mốc Bond ≥ 90:** **4.0% (20 / 500 sinh mệnh)**.
  - **Tỷ lệ đạt mốc ≥ 80 (Bậc Gắn Kết Sinh Tử - Sworn):** **9.8% (49 / 500 sinh mệnh)**.
  - **Tỷ lệ đạt mốc ≥ 70 (Bậc Tin Cậy - Trusted):** **25.8% (129 / 500 sinh mệnh)**.
  - **Điểm gắn kết đỉnh cao từng vai trò:**
    + Bạn đời (`spouse`): **100 / 100** (Chạm đỉnh tuyệt đối).
    + Cộng sự chiến đấu (`partner`): **100 / 100**.
    + Sư phụ (`mentor`): **94 / 100**.
    + Con cái (`child`): **90 / 100**.
    + Bạn thân (`friend`): **65 / 100** (Bậc Trusted).
  - **Kích hoạt thành công 19 lượt Bạn Đồng Hành Hi Sinh Cứu Mạng (Death Saves):** Người bạn đời/cộng sự đã lao mình chắn đòn chí mạng khi người chơi tụt máu về 0, minh chứng tính năng đã vận hành mượt mà và thực sự cứu sống người chơi.

---

### 2.10. Tinh Gọn Nhịp Chơi & Nâng Cấp Hệ Thống Đạo Diễn Cân Bằng Căng Thẳng (Director Pacing Governor)
* **Vấn đề phản hồi từ trải nghiệm thực tế:**
  1. Tính năng chọn 1 trong 3 manh mối đầu năm (`Three Leads Selection`) gây đứt gãy mạch tự sự, tạo cảm giác gò bó và mệt mỏi nhận thức khi người chơi bị ép buộc phải đọc và chọn thủ công 40–50 lần trong một đời nhân vật.
  2. Bày sẵn danh sách sự kiện kèm nhãn rủi ro làm triệt tiêu yếu tố bất ngờ, biến roguelike sinh tồn thành menu chọn nhiệm vụ có tính toan tính an toàn.
* **Giải pháp kiến trúc toàn diện đã triển khai:**
  1. `src/features/chronicle/components/YearPlanDock.jsx`:
     - Gỡ bỏ hoàn toàn khối danh sách bắt buộc chọn 3 manh mối (`YearLeadList`).
     - Tinh gọn giao diện với nút bấm đơn giản, dứt khoát: **"Bắt đầu năm mới" (Begin New Year)**. Người chơi chỉ cần phân bổ 3 ô hoặc giữ nguyên kế hoạch cũ rồi bấm bắt đầu ngay.
  2. `src/engine/yearPlanner.js`:
     - Xây dựng thuật toán **Director Pacing Governor (`chooseDirectorPacedLead`)**: Tự động bốc sự kiện khởi đầu năm với tính ngẫu nhiên tối đa (Organic RNG), đồng thời áp dụng đường cong đạo diễn nhịp điệu (Dramatic Tension-Release Wave):
       + **Bảo vệ sinh tồn khi kiệt quệ (Stress Protection):** Khi HP < 45, SP < 40, hoặc vừa trải qua nguy hiểm liên tiếp, tỷ lệ sự kiện nguy hiểm (`danger`) bị triệt tiêu về 0%, tăng mạnh tỷ lệ sự kiện hồi phục / an toàn (`steady`) lên 70%+ để mang lại khoảng thở (Breathing Room / Catharsis).
       + **Kích hoạt biến cố khi quá êm đềm (Complacency Prevention):** Khi nhân vật có chuỗi năm bình yên liên tiếp (steady streak), HP/SP cao và tension thấp, hệ thống nâng tỷ lệ `danger` lên 45-50%, đưa thử thách ập đến để ngăn ngừa cảm giác nhàm chán, phẳng lặng.
       + **Phân bổ xác suất cơ sở dạng chuông:** ~35% An toàn (`steady`), ~40% Thử thách vừa (`uncertain`), ~25% Nguy hiểm (`danger`).
  3. `src/store/gameStore.js`:
     - Đồng bộ hóa xử lý trong `chooseAnnualPlan` và vòng lặp `tick`: Nếu `pendingLead` xuất hiện, tự động kích hoạt `chooseDirectorPacedLead` để nạp sự kiện vào dòng thời gian mà không bao giờ chặn đứng mạch chơi.
  4. `tests/test_director_pacing.mjs`:
     - Xây dựng bộ kiểm thử chuyên biệt kiểm chứng 100% các kịch bản: ngắt hoàn toàn danger khi máu thấp, leo thang danger khi quá bình yên, và phân bổ hài hòa qua 35 năm đời người.
* **Kết quả kiểm thử:** Toàn bộ 58 test suites (bao gồm `test_director_pacing.mjs`), build Vite, voice lint 32,717 chuỗi và 500-khoảnh khắc audit đạt 100% thành công.

---
## 3. KIỂM ĐỊNH & BẢO ĐẢM TOÀN VẸN (VERIFICATION & INTEGRITY)
* Tất cả các bộ kiểm thử tự động (`npm test`) bao gồm lint văn phong (`voice_lint.mjs`), chuẩn canon Project Moon (`lint_story.mjs`), và mô phỏng 500 khoảnh khắc đời người (`run_million_audit.mjs`) phải vượt qua 100% với 0 lỗi, 0 cảnh báo.
