# The City Chronicles: Tài Liệu Tiến Trình & Kiến Trúc Kỹ Thuật Toàn Diện

> **Bản cập nhật chính thức: 21/10/2026 (Đợt 16)**
> **Trạng thái:** Hoàn thiện toàn diện · 0 Lỗi Kiểm định · Frontend & Backend Live 100%

---

## Mục lục

1. [Tổng quan dự án & Triển khai trực tuyến](#1-tổng-quan-dự-án--triển-khai-trực-tuyến)
2. [Bối cảnh vũ trụ & Các quy tắc cốt lõi (The City Lore & Rules)](#2-bối-cảnh-vũ-trụ--các-quy-tắc-cốt-lõi-the-city-lore--rules)
3. [Kiến trúc kỹ thuật hệ thống (System Architecture & Tech Stack)](#3-kiến-trúc-kỹ-thuật-hệ-thống-system-architecture--tech-stack)
4. [Web Logic & Vòng lặp vận hành (Core Web Logic & Game Loop)](#4-web-logic--vòng-lặp-vận-hành-core-web-logic--game-loop)
5. [Hệ thống chỉ số & Cơ chế sinh tồn (Survival Stats & Mechanics)](#5-hệ-thống-chỉ-số--cơ-chế-sinh-tồn-survival-stats--mechanics)
6. [Phân hệ nghề nghiệp & Cổng thăng tiến (Careers & Progression)](#6-phân-hệ-nghề-nghiệp--cổng-thăng-tiến-careers--progression)
7. [Kho dữ liệu tình huống & Cơ chế nhân quả (Story Pools & Causal Engine)](#7-kho-dữ-liệu-tình-huống--cơ-chế-nhân-quả-story-pools--causal-engine)
8. [Các tính năng & Trang phụ mở rộng (Sub-pages & Advanced Features)](#8-các-tính-năng--trang-phụ-mở-rộng-sub-pages--advanced-features)
9. [Bộ quy tắc kiểm định toàn vẹn & Kiểm thử (Integrity Audits & Quality)](#9-bộ-quy-tắc-kiểm-định-toàn-vẹn--kiểm-thử-integrity-audits--quality)
10. [Nhật ký phát triển chi tiết (Changelog từ Đợt 1 đến Đợt 16)](#10-nhật-ký-phát-triển-chi-tiết-changelog-từ-đợt-1-đến-đợt-16)

---

## 1. Tổng quan dự án & Triển khai trực tuyến

* **Tên dự án:** *The City Chronicles* (Biên Niên Sử The City)
* **Thể loại:** Roguelike Text Life Simulator, RPG Sinh tồn, Narrative Drama & Psychological Exploration.
* **Cảm hứng & Bối cảnh:** Thế giới *Project Moon* (*Lobotomy Corporation*, *Library of Ruina*, *Limbus Company*) kết hợp đào sâu tâm lý nội tâm và triết học nhân sinh phong cách *Disco Elysium*.
* **Live Frontend (Vercel Production):** [https://project-moon-life-five.vercel.app](https://project-moon-life-five.vercel.app)
* **Live Backend (Render Web Service):** [https://projectmoon-life.onrender.com/api](https://projectmoon-life.onrender.com/api)
* **Mã nguồn Git Repository:** [https://github.com/minhtamjp1409-blip/ProjectMoon_Life](https://github.com/minhtamjp1409-blip/ProjectMoon_Life)
* **Thư mục cục bộ:**
  * Frontend Workspace: `D:\School\PM` (local dev) và `D:\School\ProjectMoon_Life\PM` (git sync).
  * Backend Workspace: `D:\School\PM_BE` (local dev) và `D:\School\ProjectMoon_Life\PM_BE` (git sync).

---

## 2. Bối cảnh vũ trụ & Các quy tắc cốt lõi (The City Lore & Rules)

The City là một siêu đô thị khổng lồ, biệt lập với thế giới hoang tàn bên ngoài qua Bức Tường thành kiên cố. Tại đây, mọi sự sống đều bị chi phối bởi các tập đoàn độc quyền, bạo lực ngầm và luật lệ sắt đá của kẻ cầm quyền.

### 2.1. Phân tầng không gian đô thị
1. **The Nest (Tổ):** Khu vực trung tâm của từng Quận, đặt dưới quyền kiểm soát và bảo hộ của một **Wing (Cánh / Tập đoàn Corp)**. An ninh nghiêm ngặt, cơ sở hạ tầng hiện đại, dịch vụ y tế Singularity cao cấp. Tuy nhiên, cư dân (gọi là *Feather - Lông vũ*) phải tăng ca kiệt quệ, chịu sự bóc lột tinh vi và đối mặt nguy cơ bị tước quyền công dân nếu mất giá trị sử dụng.
2. **The Backstreets (Phố Ngầm):** Vùng đất bao quanh Nest. Nơi đây không có luật pháp của The Head bảo vệ cá nhân. Quyền lực nằm trong tay các **Syndicate (Băng đảng)** và các **Văn phòng Fixer**.
   * *Đêm Quét Dọn (Night in the Backstreets):* Diễn ra đúng từ **3:13 AM đến 4:34 AM** hàng ngày. Mọi cư dân phải đóng chặt cửa. Loài **Sweeper (Kẻ Quét Dọn)** mặc đồ bảo hộ sẽ tràn ra đường phố, thu gom mọi vật thể sống và xác chết để nghiền thành nhiên liệu sinh học.
3. **The Outskirts (Khu Rìa Ngoại Ô):** Vùng đất hoang tàn bên ngoài Bức Tường. Nơi đây cư ngụ các quái vật dị thường, kẻ lưu vong và các thực thể cổ đại. Ánh đèn từ The City nhìn từ đây được gọi là "những ngôi sao của kẻ khác".
4. **The Ruins (Tàn Tích Cổ Đại):** Những công trình bí ẩn bị chôn vùi dưới lòng đất sâu của The City hoặc ngoài Outskirts, chứa đựng công nghệ và di vật ngoài tầm hiểu biết nhân loại.

### 2.2. The Head và Tam Đại Trụ Cột (District 1 - 3)
* **A Corp (The Head - Lập Pháp & Thuế):** Cơ quan cai trị tối cao ban hành các **Điều Cấm Kỵ (Taboos)** của The City.
* **B Corp (The Eye - Giám Sát):** Sử dụng các **Beholder (Kẻ Quan Sát)** kết nối mạng lưới toàn giác để phát hiện mọi vi phạm điều cấm hoặc sự can thiệp của trí tuệ nhân tạo.
* **C Corp (The Claw - Thi Hành Sát Phạt):** Sở hữu các **Claw (Móng Vuốt)** và điều động các **Arbiter (Trọng Tài Giả)** sử dụng huyết thanh Singularity và sóng Shockwave để xóa sổ tận gốc những kẻ phạm luật.
* **Các Điều Cấm Kỵ Nổi Bật (Head Taboos):** Cấm chế tạo Trí tuệ Nhân tạo có cảm xúc con người; Cấm nhân bản sinh học tồn tại song song quá 7 ngày; Cấm sử dụng súng không giấy phép hoặc đạn có sức công phá xuyên phá công trình đô thị; Bắt buộc nộp thuế đúng hạn; Cấm can thiệp vào giờ hoạt động của Sweeper lúc 3:13 AM.

### 2.3. Singularity và 26 Wings (A Corp đến Z Corp)
Mỗi tập đoàn Wing nắm giữ một **Singularity (Kỳ Tích Công Nghệ)** riêng biệt:
* **District 4 (T Corp):** Singularity tích trữ, vay mượn, mua bán và đánh thuế **Thời Gian**. Thế giới mang tông màu Sepia hoài cổ do công nghệ thu hoạch sắc tố thời gian.
* **District 8 (H Corp - Hongyuan):** Singularity cơ cấu tái tổ chức mô bào và chuyển đổi khu phố (*Restructuring Day*), văn hóa thảo dược Bolus và tranh chấp tứ đại gia tộc (Jia, Xue, Wang, Shi).
* **District 10 (J Corp):** Singularity vận may, sòng bạc Wishpower, ổ khóa không thể phá vỡ.
* **District 11 (K Corp):** Singularity hạt dịch thể hồi phục vết thương (*HP Ampoules*), chiết xuất từ Sinh Thể Biết Khóc dưới tầng hầm bí mật.
* **District 12 (L Corp cũ):** Tập đoàn Năng Lượng Lobotomy Corp đã sụp đổ sau Biến Cố Khói Bụi và *White Nights and Dark Days*.
* **District 14 (N Corp):** Singularity đóng hộp trải nghiệm; giáo phái *Nagel und Hammer* cuồng tín bài trừ thân thể cơ khí giả.
* **District 16 (P Corp):** Singularity mở rộng không gian bên trong to hơn bên ngoài; sự hiện diện của loài Huyết Ma (Bloodfiend).
* **District 19 (S Corp):** Nền nông nghiệp công nghiệp hóa; cội nguồn của kiếm phái Blade Lineage.
* **District 20 (U Corp):** Đại Hồ (The Great Lake) bao la, luật sóng nước, thợ săn Whale và người biến thành Mermaid.
* **District 23 (W Corp):** Singularity phục hồi trạng thái nguyên tử, điều hành các chuyến tàu không gian WARP Train (10 giây bên ngoài, hàng ngàn năm tra tấn bên trong).
* **District 5 (E Corp - Phóng tác):** Bầu trời sáng 24/24 giờ; bóng tối là mặt hàng xa xỉ bán theo giờ đóng chai.
* **District 15 (O Corp - Phóng tác):** Hợp đồng khắc mực tự động kích hoạt hậu quả sinh học lên cơ thể người ký.
* **District 26 (Z Corp - Ẩn danh Canon):** Tồn tại trên văn bản nhưng không có trên bản đồ định vị; không có Singularity công khai; người rời đi sẽ quên đường về.

### 2.4. Hiệp Hội Fixer và Văn Phòng (Offices)
Hệ thống Fixer được chuẩn hóa và quản lý bởi 12 Hiệp Hội tối cao:
1. **Hana Association (Nhất Giới):** Đánh giá cấp bậc Grade, cấp chứng chỉ Văn phòng, xếp hạng thảm họa đô thị (*Star of the City*), phong tặng danh hiệu **Color Fixer**.
2. **Zwei Association:** Dịch vụ bảo an, hộ tống và bảo vệ mục tiêu.
3. **Tres Association:** Kiểm định, cấp bằng sáng chế và tiêu chuẩn kỹ thuật cho các Xưởng rèn Workshop.
4. **Shi Association:** Ám sát, thanh toán mục tiêu bí mật.
5. **Cinq Association:** Đấu kiếm tay đôi danh dự, bảo vệ thân chủ qua các giao kèo đấu tay đôi.
6. **Liu Association:** Tác chiến mặt trận toàn lực, hỏa thuật và chiến tranh quân sự quy mô lớn.
7. **Seven Association:** Điều tra, thu thập tình báo và thương thuyết ngoại giao.
8. **Eight Association:** Thám hiểm đại dương, cứu hộ tàu bè tại vùng biển U Corp.
9. **Devyat' Association:** Vận chuyển bưu kiện tốc hành xuyên biên giới bằng vali sống.
10. **Dieci Association:** Tu viện tri thức, bảo trợ trẻ mồ côi, chiến đấu bằng sức nặng của sự uyên bác.
11. **Öufi Association:** Giám sát thực thi công chứng và thanh toán hợp đồng dưới lòng đất.
12. **Twelve Association:** Hiệp hội bí ẩn phụ trách các vấn đề tối mật của The City.

### 2.5. The Five Fingers (Năm Ngón Tay Giang Hồ)
* **The Thumb (Ngón Cái):** Tôn ti trật tự tuyệt đối, nghi thức cấp bậc nghiêm khắc, sử dụng súng cận chiến bắn đạn đặc chế.
* **The Index (Ngón Trỏ):** Tín ngưỡng phục tùng **Chỉ Lệnh (Prescripts)** được dệt ra từ Khung Cửi Vận Mệnh. Lưỡi kiếm tơ thanh trừng của các Proxy.
* **The Middle (Ngón Giữa):** Tình nghĩa anh em máu thịt gia đình. Mọi ân oán đều được khắc vào **Sách Báo Thù (Book of Vengeance)** với xích sắt và hình xăm.
* **The Ring (Ngón Áp Út):** Giáo phái nghệ thuật cuồng loạn, coi cơ thể con người là chất liệu sáng tạo hội họa và điêu khắc.
* **The Pinky (Ngón Út):** Thế giới ngầm cống rãnh, lời thề ngón tay út và các khế ước bí mật.

### 2.6. Hiện tượng Siêu Nhiên: E.G.O vs Distortion
* **White Nights and Dark Days (Bạch Dạ Hắc Chu):** 7 ngày phát tán Hạt Giống Ánh Sáng từ L Corp đã thức tỉnh tiềm thức nhân loại.
* **Lời Thì Thầm của Carmen:** Khi con người chịu đựng nỗi đau hoặc tuyệt vọng cực hạn (Sanity chạm đáy), Carmen sẽ xuất hiện dưới ánh mặt trời rực rỡ thì thầm kêu gọi buông bỏ vỏ bọc xã hội để sống thật với bản ngã.
  * Nếu khuất phục $\implies$ Sa ngã thành **Distortion (Biến Dị)**, cơ thể hóa thành quái dị mang hình thù nỗi ám ảnh nội tâm.
  * Nếu giữ vững niềm tin và ý chí con người $\implies$ Thức tỉnh **Effloresced E.G.O (Vũ khí / Giáp linh hồn độc nhất)**.

---

## 3. Kiến trúc kỹ thuật hệ thống (System Architecture & Tech Stack)

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE CITY CHRONICLES ARCHITECTURE                     │
└────────────────────────────────────────────────────────────────────────┘

  [ Client Browser ]
         │
         ├──► React 18 SPA (Vite 6, Zustand 5, Ant Design 6)
         │       ├── Web Audio API (Synthesized SFX Engine)
         │       ├── HTML5 Canvas (Dossier Identity Card Export)
         │       └── LocalStorage (Instant Offline Cache)
         │
         ├──► Vercel Edge Network (Deploy Frontend: https://project-moon-life-five.vercel.app)
         │       └── vercel.json (Single-Page App Rewrite Rule)
         │
         └──► REST API Call (CORS Enabled: .AllowAnyOrigin())
                 │
                 ▼
  [ Backend Web Service ]
         │
         ├──► Render Cloud (.NET 8 Minimal API: https://projectmoon-life.onrender.com/api)
         │       ├── AppJsonContext (Zero-reflection Native AOT / Fast JSON)
         │       ├── FNV-1a StableHash (Deterministic Seed Matcher)
         │       └── ArchiveStoreService (Atomic File I/O: .tmp swap + .bad backup)
         │               ├── Data/city_archive.json (Global Codex, Past Lives)
         │               └── Data/run_state.json (Active Run Snapshot)
         │
         └──► Dual-Save Model: 100% Offline-Resilient (Zero external SQL DB required)
```

### 3.1. Frontend Stack
* **Framework & Core:** React 18, Vite 6 (build siêu tốc, chunk splitting tối ưu dưới 500 kB).
* **Quản lý State:** Zustand 5 (`src/store/gameStore.js`, `themeStore.js`) với cơ chế subscription chọn lọc từng trường, ngăn chặn việc re-render toàn cây DOM khi thanh năm chạy liên tục.
* **Giao diện & UI Components:** Ant Design 6 (Modal, Tooltip, Dropdown, Notification) kết hợp CSS thuần (`src/index.css`, `interface.css`) theo ngôn ngữ thiết kế **True-black flat** và typography **Be Vietnam Pro**.
* **Âm thanh:** Web Audio API thuần (`src/engine/audioEngine.js`) tổng hợp đa âm thanh (Click, Dice roll, Ambient drone, Warp gong, Clang forge), loại bỏ hoàn toàn gánh nặng tải các tệp audio lớn qua mạng.
* **Biểu tượng:** Thư viện `lucide-react` sắc nét, phong cách outline đồng bộ.

### 3.2. Backend Stack
* **Nền tảng:** .NET 8 (C#) Minimal API, kiến trúc bất đồng bộ không khóa đọc (`ConcurrentDictionary` + in-memory snapshot cache).
* **Cơ chế Ghi Nguyên Tử (Atomic File I/O):**
  * Không sử dụng các hệ quản trị SQL cồng kềnh (MySQL/PostgreSQL), giúp người chơi và dự án dễ dàng triển khai mà không tốn chi phí máy chủ dữ liệu.
  * Khi lưu, backend ghi nội dung ra file tạm `.tmp`, sau đó đổi tên ghi đè file chính thức (`city_archive.json` hoặc `run_state.json`). Nếu có sự cố ngắt nguồn, dữ liệu cũ vẫn nguyên vẹn; file hỏng được tự động cách ly thành `.bad`.
* **JSON Serialization:** Sử dụng `System.Text.Json` với source generation (`AppJsonContext`), tối ưu hóa tốc độ và giảm thiểu cấp phát bộ nhớ rác (GC spikes).
* **Thuật toán Băm Tất Định:** Triển khai hàm băm FNV-1a 32-bit (`StableHash`) bảo đảm cùng một chuỗi seed thì Frontend và Backend luôn cho ra kết quả bốc thăm ngẫu nhiên giống hệt nhau.
* **CORS:** Cấu hình mở rộng `.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()` bảo đảm frontend trên Vercel kết nối trơn tru với backend trên Render.

---

## 4. Web Logic & Vòng lặp vận hành (Core Web Logic & Game Loop)

### 4.1. Khởi tạo & Seed Tất Định (Deterministic Generation)
* Khi bấm bắt đầu cuộc đời, hàm `cyrb128` băm chuỗi ký tự seed thành 4 số nguyên 32-bit, sau đó nuôi thuật toán giả ngẫu nhiên `sfc32` (`src/engine/gameEngine.js`).
* **Tách biệt dòng ngẫu nhiên:** Hệ thống chia làm 2 luồng PRNG độc lập:
  * `birthRng`: Tạo xuất thân, gia cảnh, người bạn thuở nhỏ, thiên mệnh.
  * `lifeRng`: Dẫn dắt toàn bộ diễn biến các năm tiếp theo. Nhờ đó, hai nhân vật có seed tương tự nhau sẽ không bị lặp lại dòng đời một cách máy móc.
* **Danh sách Cấm Trùng Tên Canon (`CANON_NAMES_BLACKLIST`):** Bộ sinh tên `nameGenerator.js` ngăn chặn việc đặt trùng tên các nhân vật cốt cán trong lore (Roland, Angela, Carmen, Vergilius, 12 Sinner, các Sephirah, Color Fixers...).

### 4.2. Vòng lặp Thời Gian & Lập Kế Hoạch Năm (YearPlanner Engine)
* Một năm được chia làm **4 Mùa: Xuân - Hạ - Thu - Đông**.
* Mỗi mùa tương ứng với một khoảnh khắc trong kế hoạch năm (`src/engine/yearPlanner.js`):
  1. **Dòng thường ngày (Daily Life Friction):** Tự động trôi qua, khắc họa sinh động hơi thở đường phố (tiếng còi tàu, bát mì nguội, khói độc ngõ hẻm), dao động nhẹ chỉ số (±1–3 điểm).
  2. **Gặp gỡ bất chợt (Minor Encounter):** Xuất hiện dock viền xanh có đếm lùi 15 giây. Người chơi có thể can thiệp hoặc để nó tự trôi qua (`Let it pass`).
  3. **Biến cố lớn (Major Life Dilemma):** Tự động dừng thời gian. Đưa ra các ngã rẽ định đoạt số phận, biến động danh tiếng, tiền bạc và các vết sẹo.
  4. **Ủy thác Fixer (Tactical Request):** Các hợp đồng nhận việc với 3 hướng tiếp cận chiến thuật (trực diện, phục kích, mưu mẹo) kèm tỉ lệ thành công / thất bại / tử trận rõ ràng.
* **Tốc độ:** Chạy 30 giây ở 1x, 15 giây ở 2x, 10 giây ở 3x. Hỗ trợ Pause/Resume và AutoPlay.

### 4.3. Cơ chế Hiển Thị Kết Quả Mới (Đợt 16)
* **Loại bỏ popup modal `ResultDock`:** Trước đây, sau mỗi lựa chọn, một popup modal che khuất màn hình bắt người chơi bấm nút "Tiếp tục". Nay popup này đã bị loại bỏ hoàn toàn.
* **Hiển thị trực tiếp trên dòng thời gian ngoài (Chronicle Feed):**
  * Tên lựa chọn, diễn giải văn học cốt truyện, chip biến động chỉ số (HP, SP, Quan hệ, Ahn, Resonance, Sẹo mới) được ghi nhận và hiển thị ngay trên thẻ sự kiện ở feed chính.
* **Tự động dừng 3 giây để đọc (`postChoicePauseMs: 3000`):**
  * Sau khi bấm chọn, thanh tiến trình năm tạm dừng 3 giây và hiển thị dòng đếm lùi: `Kết quả vừa lưu · Tiếp tục sau 3s... 2s... 1s` để người chơi thong thả đọc kết quả.
  * Hết 3 giây, dòng thời gian tự động trôi tiếp theo tốc độ người chơi đang cài đặt.
* **Thao tác nhanh:** Người chơi có thể bấm **phím Space**, **Enter** hoặc nút **Play** trên thanh điều khiển bất kỳ lúc nào để tiếp tục ngay lập tức mà không cần chờ hết 3 giây.

### 4.4. Tổng Kết Cuối Năm (End of Year Settlement)
Khi kết thúc mùa Đông, engine tự động tính toán:
1. **Thu chi tài chính:** Thu nhập từ chức vụ nghề nghiệp trừ đi chi phí sinh hoạt đặc thù của từng District.
2. **Hồi phục & Hao mòn tự nhiên:** Tự nhiên hồi phục vết thương thể chất và tinh thần dựa theo chỉ số an ninh của nơi ở.
3. **Môi trường & Tuổi tác:** Khói bụi Backstreets, tiếng súng bạo lực và sự suy giảm thể lực do tuổi già (từ tuổi 40 trở đi bắt đầu mất HP hàng năm).
4. **Trôi chỉ số:** Danh tiếng, công huân, mạng lưới tự động trôi nhẹ về mức cân bằng nền nếu không có hoạt động củng cố.

---

## 5. Hệ thống chỉ số & Cơ chế sinh tồn (Survival Stats & Mechanics)

| Chỉ số | Tên Lore | Ý nghĩa gameplay |
|---|---|---|
| **Health (HP)** | Sinh lực | Máu và thể chất sống sót. Chạm 0 là tử vong (Death). |
| **Sanity (SP)** | Tinh thần | Sự tỉnh táo và ổn định tâm lý. Chạm 0 sẽ hoảng loạn và đối diện tiếng nói Carmen. |
| **Wealth (Ahn)** | Tiền mặt Ahn | Đơn vị tiền tệ chuẩn của The City. Chi trả sinh hoạt, mua trang bị, viện phí K Corp, hối lộ. |
| **Reputation (Rep)** | Danh tiếng | Uy danh xã hội và tiếng tăm giang hồ. Điều kiện tiên quyết để dự thi Fixer cấp cao và mở rộng văn phòng. |
| **Merit** | Chiến tích | Điểm cống hiến sự nghiệp tích lũy từ hợp đồng và nhiệm vụ. |
| **Network** | Mạng lưới | Quan hệ xã hội, tay trong, đồng minh và mối liên hệ ngầm. |
| **Heat** | Nhiệt độ truy nã | Mức độ chú ý thù địch từ cảnh sát Hana, các Finger hoặc kẻ thù. |
| **Taboo Gaze** | Con mắt cấm kỵ | Mức độ bị The Eye (B Corp) theo dõi khi chạm vào Điều Cấm Kỵ của The Head. |
| **Resonance** | Độ cộng hưởng | Độ nhạy cảm với Hạt Giống Ánh Sáng, mở đường cho E.G.O hoặc Distortion. |

### 5.1. Cơ chế Vết Sẹo (Scars)
* Nhân vật có thể nhận các vết sẹo vĩnh viễn sau biến cố tàn khốc (ví dụ: *Khớp cơ khí rỉ sét*, *Ám ảnh Sweeper 3:13*, *Vết chém tơ kiếm*, *Độc tố Molar*...).
* **Giới hạn 4 sẹo tác động đồng thời:** Mỗi vết sẹo đang mang sẽ gây trừ nhẹ HP hoặc SP vào mỗi dịp cuối năm. Các vết sẹo cũ vượt quá số lượng 4 sẽ được chuyển vào mục lưu trữ lịch sử để giải tỏa áp lực sinh tồn.
* Nhiều sẹo kết hợp với Resonance cao ở tuổi trưởng thành là điều kiện dẫn dắt nhân vật đến ngã rẽ Carmen.

### 5.2. Lão Hóa & Địa Vị Xã Hội (Aging Dynamics)
* **Suy giảm thể lực theo tuổi:** Bắt đầu từ tuổi 40, cơ thể dần hao mòn, mức trừ HP tăng dần theo từng năm; các phương pháp nghỉ ngơi thông thường hồi phục kém hiệu quả hơn, đòi hỏi phải dùng đến K Corp Ampoule hoặc phẫu thuật thay thế cơ thể.
* **Bảo lưu danh tiếng người có địa vị:** Trước đây danh tiếng tự giảm khi về già. Nay, các nhân vật đạt vị thế cao (Fixer Grade 3 trở lên, Color Fixer, Chỉ huy Syndicate, Quản lý Wing, Thợ cả Workshop) sẽ **không bị giảm danh tiếng thụ động cuối năm**, phản ánh uy danh vững bền trong xã hội The City.

### 5.3. Hệ thống NPC & Mối Quan Hệ (NPC Lifecycle)
* Nhân vật có các mối quan hệ đa tầng: Cha mẹ, Bạn thuở nhỏ, Đệ tử, Bạn đời, Đối thủ.
* **Vòng đời độc lập của NPC:** Mỗi NPC đều có tuổi tại thời điểm gặp gỡ và già đi cùng nhân vật qua từng năm. NPC có thể qua đời vì tuổi già hoặc biến cố bạo lực.
* **Tuyệt đối không có NPC Ma (Zero Ghost NPC):** Khi một NPC qua đời, trạng thái quan hệ được cập nhật (`Widowed`, `FriendLost`, `ChildLost`...). Toàn bộ các sự kiện đời sống, lựa chọn và lời thoại sau đó tuyệt đối không bao giờ gọi tên NPC đã khuất như người còn sống.

### 5.4. Các Điểm Chi Tiêu Tiền Tệ (Ahn Sinks) & Y Tế Cao Cấp
* **Viện Tái Sinh K Corp (`econ_kcorp_regeneration_pavilion`):** Tắm dịch ngọc bích Singularity K Corp nối liền xương thịt đứt lìa, hồi lượng HP khổng lồ (26–48 Ahn).
* **Buồng Tua Ngược T Corp (`econ_tcorp_chrono_restoration`):** Singularity Thời Gian tua ngược đồng hồ sinh học về 2 tuần trước khi chấn thương (28–52 Ahn).
* **Đại Tiệc HamHamPangPang (`econ_hamhampangpang_feast`):** Tiệm bánh mì nướng bơ tỏi và trà thảo mộc huyền thoại của Roland, xoa dịu tâm trí, hồi phục SP và làm dịu Distortion Resonance (10–24 Ahn).
* **Spa Suối Nước Nóng & Jazz Club J Corp (`econ_jcorp_luxury_spa_lounge`):** Giảm căng thẳng tâm lý, xoa dịu nguy cơ biến dị và hạ nhiệt độ truy nã Faction Heat (18–42 Ahn).
* **Đại Tu Giáp Trụ Workshop Độc Quyền (`econ_atelier_armor_overhaul`):** Xưởng rèn Tres (Zelkova, Wheels Industry, Mook) gia cố giáp nano tăng sinh tồn (18–45 Ahn).
* **Safehouse Ngoại Giao Seven Association (`econ_seven_safehouse_diplomacy`):** Mua quyền bảo hộ và xóa hồ sơ truy nã (22–55 Ahn).
* **Ẩm Thực District 23 (`econ_district23_gourmet_pie`):** Bánh thịt Pierre kích thích sinh lực cực hạn (12–25 Ahn).

---

## 6. Phân hệ nghề nghiệp & Cổng thăng tiến (Careers & Progression)

Sau mốc 18 tuổi, nhân vật rời khỏi thân phận Trẻ con (Child) để bước vào một trong 4 nhánh sự nghiệp lớn:

```
                      ┌──────────────────────────────────────┐
                      │          TUỔI 18: NGÃ RẼ NGHỀ        │
                      └──────────────────┬───────────────────┘
                                         │
         ┌──────────────────┬────────────┴───────┬──────────────────┐
         ▼                  ▼                    ▼                  ▼
   [ 1. FIXER ]      [ 2. SYNDICATE ]     [ 3. WING CORP ]   [ 4. WORKSHOP ]
   Grade 9           Soldato / Proselyte  Junior Specialist  Apprentice
      │                     │                    │                  │
   Grade 8..2        Capo / Proxy         Section Chief      Master Craftsman
      │                     │                    │                  │
   Grade 1           Sottocapo / Apex     Senior Executive   Legendary Innovator
      │                     │                    │                  │
   Color Fixer       Underboss/Great Bro  Classified Leader  Atelier Founder
```

### 6.1. Nhánh Fixer & Quy Tắc Sát Hạch Hana
* **Bắt đầu từ Grade 9:** Mọi Fixer khi vào nghề đều nhận thẻ Grade 9 và 0 Merit chuyên nghiệp.
* **Tiến trình tuần tự tuyệt đối (Zero Grade Skipping):** Fixer phải thi đậu từng bậc một qua kỳ sát hạch chính thức của Hana Association (Grade 9 $\to$ 8 $\to$ 7 $\to$ 6 $\to$ 5 $\to$ 4 $\to$ 3 $\to$ 2 $\to$ 1 $\to$ Color). Tuyệt đối không có cơ chế nhảy cóc cấp bậc.
* **Cơ chế triệu tập sát hạch:** Mỗi năm khi nhân vật đạt đủ ngưỡng danh tiếng và điểm công huân (`Merit >= ngưỡng`), Hana sẽ có tỉ lệ gửi thư triệu tập (từ 55% đến 90% tùy vào uy tín).
* **Tỉ lệ đỗ/trượt theo bối cảnh:** Kỳ thi sát hạch tính toán xác suất đỗ dựa trên cấp bậc Grade, lượng Merit dư thừa và chỉ số sức khỏe HP/SP hiện tại.
  * Nếu thi trượt: Nhân vật bị phạt mất HP, Ahn và SP (mức phạt tăng vọt ở Grade cao); giữ lại quyền thi lại vào các năm kế tiếp nếu duy trì đủ điều kiện.
  * Nếu thi đỗ: 25% số Merit dư thừa của cấp trước được bảo lưu sang hồ sơ cấp mới (có mức trần khống chế để không tự động đạt cấp kế tiếp).
* **Color Fixer (Grade 0 · Huyền thoại):** Đòi hỏi điều kiện tối cao (Merit $\ge$ 300, Rep $\ge$ 95) và phải vượt qua cuộc sát hạch định mệnh xếp hạng Thảm Họa Đô Thị (*Star of the City*). Khi thành công, nhân vật được tự đặt tên cho Danh Hiệu Màu Sắc độc quyền của mình (ví dụ: *The Crimson Gale*, *The Obsidian Shadow*...).

### 6.2. Nhánh The Five Fingers (Syndicate)
* Thứ bậc thăng tiến: Cấp dưới (Soldato / Proselyte / Little Brother) $\to$ Cán bộ (Capo / Proxy / Big Brother) $\to$ Lãnh đạo cấp cao (Sottocapo / Great Sister / Underboss).
* Các nhiệm vụ đặc thù: Thanh trừng nội bộ, cưỡng chế thu phí bảo vệ, giải mã Chỉ Lệnh tơ kiếm, khắc tên kẻ thù vào Sách Báo Thù, triển lãm tượng người nghệ thuật.

### 6.3. Nhánh Nhân Viên Tập Đoàn (Wing Employee)
* Thứ bậc thăng tiến: Chuyên viên sơ cấp (Junior Specialist) $\to$ Trưởng phòng dự án (Section Chief) $\to$ Giám đốc điều hành cấp cao (Senior Executive).
* Đặc thù: Sinh hoạt an toàn trong Nest, lương cao, tiếp cận y tế tân tiến nhưng thường xuyên đối mặt với sự thanh trừng chính trị, rò rỉ ô nhiễm Singularity và những bí mật đen tối của tập đoàn.

### 6.4. Nhánh Thợ Chế Tác (Workshop Craftsman)
* Thứ bậc thăng tiến: Học việc lò rèn (Apprentice) $\to$ Thợ bậc thầy được Tres công nhận (Master Craftsman) $\to$ Huyền thoại chế tác thần binh (Legendary Innovator).
* Đi kèm tính năng rèn đúc vũ khí Workshop qua mini-game canh nhịp con trỏ.

### 6.5. Con Đường Siêu Nhiên: E.G.O vs Distortion
* Khi Sanity chạm đáy và Resonance tăng cao:
  * Nếu nhân vật buông theo tiếng nói Carmen $\implies$ Trở thành **Distortion**: Nghề nghiệp chuyển thành thực thể biến dị, bị Hana truy nã (Heat tăng mạnh), tách biệt khỏi xã hội con người nhưng sở hữu sức mạnh dị thường.
  * Nếu nhân vật vượt qua thử thách nội tâm $\implies$ Thức tỉnh **Effloresced E.G.O**: Nhận vũ khí và áo giáp tâm thức huyền thoại, tăng vọt năng lực sinh tồn và danh tiếng.

---

## 7. Kho dữ liệu tình huống & Cơ chế nhân quả (Story Pools & Causal Engine)

### 7.1. Thống Kê Tổng Thể Kho Nội Dung (794 Khoảnh Khắc)
* **230 Sự Kiện Lớn (Major Narrative Dilemmas):** Bao gồm tuổi thơ, biến cố trưởng thành, sự kiện 4 nhánh nghề nghiệp, khủng hoảng 26 Quận, sự kiện tuổi già và ngã rẽ siêu nhiên.
* **36 Hệ Quả Nhân Quả (Causal Consequences):** Các sự kiện trừng phạt hoặc đền đáp quay trở lại sau các quyết định trong quá khứ.
* **202 Gặp Gỡ Bất Chợt (Minor Encounters):** Tình huống phản xạ 15 giây rải khắp các khu vực Backstreets, Nest, Outskirts và cuộc sống thường nhật.
* **302 Dòng Thường Nhật (Daily Life Moments):** Các lát cắt đời sống bình dị và chân thực, tạo nên nhịp điệu sinh hoạt đô thị.
* **24 Ủy Thác Tác Chiến Fixer (Tactical Requests):** Hợp đồng nhận việc có phân định rủi ro và xác suất chiến thuật.

### 7.2. Chuỗi Nhân Quả Hẹn Giờ 2 Năm (18 Causal Threads)
Hệ thống tích hợp 18 mạch truyện nhân quả độc lập (`src/data/narrative/causalThreads.js`). Khi người chơi đưa ra một quyết định gieo mầm:
* Engine lên lịch một sự kiện hồi đáp chính xác sau 2 năm (`scheduleYears: 2`).
* Nếu người chơi chọn chấp nhận hoặc thỏa hiệp, sự kiện quả báo / ân nghĩa sẽ ập đến sau 2 năm với nội dung nối tiếp logic.
* Nếu người chơi từ chối, mạch truyện đóng lại và không kích hoạt sự kiện hệ quả.

### 7.3. Thuật Toán Trọng Số Độ Mới (Freshness & Variance)
* **Chống lặp nội dung (`freshness`):** Không dùng danh sách cấm cứng làm nghèo nàn kho sự kiện; thay vào đó, hệ thống sử dụng thuật toán tính độ mới (`RECENT_LIMIT = 120`). Sự kiện vừa gặp sẽ bị giảm mạnh trọng số xuất hiện; sự kiện đã lâu chưa gặp sẽ được tăng mạnh xác suất.
* **Chất riêng từng kiếp sống (`variance.js`):** Mỗi kiếp sống sở hữu 5 tham số ẩn tạo từ seed: `luck` (may mắn), `vigor` (thể lực), `nerve` (bản lĩnh), `hustle` (tháo vát), `drama` (biến cố), làm rung sai số hiệu ứng tài nguyên (±30%) giúp mỗi cuộc đời đều có một cá tính riêng biệt.

---

## 8. Các tính năng & Trang phụ mở rộng (Sub-pages & Advanced Features)

### 8.1. Thư Viện Tra Cứu (Codex Page - `/codex`)
* Hệ thống lưu trữ các thành tựu và dấu ấn lịch sử người chơi đã mở khóa qua nhiều thế hệ (ví dụ: *Chào đời tại The City*, *Chứng kiến Sweeper 3:13*, *Vượt qua sát hạch Hana*, *Thức tỉnh E.G.O*, *Trở thành Color Fixer*...).
* Đồng bộ hai chiều giữa `localStorage` của trình duyệt và endpoint `/api/archive/codex` của backend.

### 8.2. Từ Điển Thế Giới (World Glossary Page - `/glossary`)
* Tra cứu chi tiết toàn diện về bối cảnh:
  * Hồ sơ đầy đủ của 26 Quận (A đến Z) và The Outskirts (chỉ số an ninh, giàu có, tuổi thọ trung bình, công nghệ Singularity).
  * Hồ sơ 12 Hiệp Hội Fixer, các tổ chức Ngón Tay, các Xưởng rèn Workshop và các sinh thể siêu nhiên.

### 8.3. Khung Cửi Vận Mệnh (Weaver AI Page - `/weaver`)
* Mô phỏng cơ chế Khung Cửi của Ngón Trỏ (The Index): Người chơi có thể tương tác hỏi đáp, xin chỉ lệnh giải mã vận mệnh cuộc đời với Weaver AI theo phong cách văn phong bí ẩn, trang trọng của các Prescript.

### 8.4. Kế Thừa Huyết Thống & Di Sản (Bloodline Page - `/bloodline`)
* **Lưu danh tiền nhân:** Khi một kiếp đời kết thúc (qua đời hoặc biến dị), toàn bộ chiến tích, tuổi thọ, nguyên nhân tử vong và di vật của họ được khắc bia tưởng niệm vào Gia phả.
* **Di sản truyền đời:** Thế hệ con cháu (Gen #2, Gen #3...) có thể tiếp nhận điểm thừa kế di sản (`Legacy Points`), vũ khí gia truyền từ kiếp trước, hoặc bắt đầu cuộc đời mới dưới sự bảo bọc của phụ huynh còn sống.
* Hỗ trợ chức năng xóa từng bia mộ hoặc reset toàn bộ cây gia phả để làm lại từ đầu.

### 8.5. Mini-game Chế Tác Workshop
* Khi nhân vật vào nghề thợ rèn hoặc thực hiện nhiệm vụ chế tạo trang bị, một mini-game rèn đúc xuất hiện: Con trỏ dao động qua lại trên thanh nhịp độ, người chơi phải căn thời điểm bấm chuột hoặc phím Space trúng vùng hoàn hảo (Perfect Zone) để tạo ra trang bị có phẩm chất tối thượng.

### 8.6. Xuất Hồ Sơ Thẻ Căn Cước (Dossier Identity Card Export)
* Tại màn hình kết thúc hoặc hồ sơ, hệ thống hỗ trợ kết xuất (render) toàn bộ thông tin nhân vật thành một tấm thẻ căn cước mang phong cách hồ sơ mật District 1 của The Head ra file ảnh PNG độ nét cao (`exportDossierCard.js`) để người chơi lưu lại hoặc chia sẻ cho cộng đồng.

---

## 9. Bộ quy tắc kiểm định toàn vẹn & Kiểm thử (Integrity Audits & Quality)

Dự án áp dụng hệ thống kiểm định tự động 5 tầng quy mô lớn nhằm bảo đảm tính toàn vẹn 100% của logic cốt truyện và độ ổn định của hệ thống:

```bash
# Lệnh chạy toàn bộ bộ kiểm tra chất lượng:
npm test
```

### 9.1. Năm Nhóm Quy Tắc Toàn Vẹn Cốt Lõi (5 Integrity Audit Checks)
Kiểm thử tự động trên **50.134 khoảnh khắc** và **243 vòng đời** liên tục đạt **0 LỖI**:
1. **[CHECK 1] Ghost NPC Event Violations (0 LỖI):** Tuyệt đối không có NPC đã khuất (vợ/chồng, bạn bè, đệ tử, cha mẹ đã mất) xuất hiện hay đối thoại như người đang sống.
2. **[CHECK 2] Distortion Doing Human Fixer Events (0 LỖI):** Nhân vật đã biến dị thành Distortion bị cô lập hoàn toàn khỏi các hợp đồng làm việc và hoạt động xã hội của loài người.
3. **[CHECK 3] Fixer Grade Skipping Violations (0 LỖI):** Mọi Fixer thăng tiến tuần tự từng bậc một qua kỳ sát hạch của Hana, không nhảy cóc cấp bậc.
4. **[CHECK 4] Biological Child without Offspring Violations (0 LỖI):** Phân biệt chính xác giữa con ruột hợp pháp, đệ tử truyền thừa và trẻ lang thang nhặt từ Backstreets.
5. **[CHECK 5] Career Checklist vs Exam Gate Mismatches (0 LỖI):** Danh sách điều kiện hiển thị trên giao diện người chơi khớp chính xác 100% với logic cổng mở kỳ thi của engine.

### 9.2. Kiểm Định Logic Cốt Truyện 120 Sinh Mệnh (`story_logic_audit.mjs`)
* Mô phỏng ngẫu nhiên 120 cuộc đời hoàn chỉnh (hơn 24.000 khoảnh khắc): **0 VI PHẠM LOGIC**.
* Độ che phủ sự kiện: 654 / 770 sự kiện từng xuất hiện trong các lượt chạy mẫu.
* Chỉ số chồng lấn Jaccard giữa hai cuộc đời ngẫu nhiên đạt 0.210 (chứng minh độ đa dạng và khác biệt rất cao giữa các ván chơi).

---

## 10. Nhật ký phát triển chi tiết (Changelog từ Đợt 1 đến Đợt 16)

### Đợt 16 (21/10/2026): Tinh gọn tài nguyên & Trải nghiệm đọc kết quả trực tiếp
* **Loại bỏ popup modal kết quả:** Xóa bỏ màn hình `ResultDock` ("KẾT QUẢ QUYẾT ĐỊNH" có nút "Tiếp tục hành trình ➔") che khuất giao diện sau mỗi lựa chọn sự kiện lớn, hợp đồng hay gặp gỡ bất chợt.
* **Hiển thị trực tiếp trên dòng thời gian ngoài (Chronicle Feed):** Toàn bộ kết quả lựa chọn, diễn biến cốt truyện, biến động chỉ số (HP, SP, Rep, Ahn, Sẹo...) hiển thị mượt mà trên thẻ sự kiện ở feed chính.
* **Thời gian dừng đọc 3 giây (`postChoicePauseMs: 3000`):** Thanh tiến trình dừng 3 giây sau khi chọn và hiển thị thông báo đếm lùi trực quan `Kết quả vừa lưu · Tiếp tục sau 3s... 2s... 1s` để người chơi thong thả đọc kết quả; hỗ trợ phím Space / Enter hoặc nút Play để bỏ qua ngay nếu muốn đọc nhanh.
* **Dọn dẹp triệt để tài nguyên rác:**
  * Xóa toàn bộ các file báo cáo text thừa (`BAO_CAO_GIA_LAP_VA_SO_SANH_PROJECT_MOON.txt`, `BAO_CAO_KIEM_THU_1_TRIEU_KICH_BAN.txt`, `DANH_SACH_TAT_CA_EVENTS.txt`, `THE_CITY_CHRONICLES_GAMEPLAY_DOC.txt`, `TOAN_BO_KICH_BAN_PROJECT_MOON.txt`).
  * Xóa các tệp sơ đồ hình ảnh và PDF dư thừa trong thư mục gốc và thư mục `public/` (`ARCHITECTURE_DIAGRAM.png`, `event_diagram.png`, `diagram_preview.png`, `EVENT_ARCHITECTURE_DIAGRAM.pdf`, `THE_CITY_CHRONICLES_DOCUMENTATION.pdf`), chỉ giữ lại biểu tượng `favicon.svg`.
  * Chuyển hướng link "Tài liệu gameplay" ở footer trang chủ sang liên kết nội bộ trực tiếp đến trang **Thuật ngữ thế giới (`/glossary`)**.
  * Hợp nhất toàn bộ tài liệu kỹ thuật, gameplay và tiến trình vào duy nhất tệp tài liệu tổng thể này (`PROGRESS_LOG.md`).

### Đợt 15 (21/10/2026): Khắc phục mở đầu lặp, điều chỉnh 3:13 AM và khôi phục vòng quay District
* Bổ sung 13 sự kiện lớn và 24 sự kiện nhỏ tuổi thơ (`eventsChildhood2.js`, `lifeMinorsKids.js`), khắc phục hiện tượng 50% kiếp sống bị trùng biến cố 3:13 AM lúc 5 tuổi; giảm tỉ lệ gặp 3:13 AM đầu đời xuống còn 10%.
* Viết lại 914 biến thể câu tổng kết cuối năm (`yearEndLines.js`) theo từng độ tuổi và bối cảnh sống, chấm dứt hiện tượng lặp lại cụm từ "[Lắng đọng cuối năm]" máy móc.
* Khôi phục cơ chế quay bánh xe 26 District bằng `requestAnimationFrame` (`spinTo`), tương thích hoàn hảo với các thiết bị bật chế độ giảm chuyển động (`prefers-reduced-motion`).

### Đợt 14 (21/10/2026): Đồng bộ hoàn hảo Frontend / Backend & Triển khai Vercel Live
* Xây dựng bộ kiểm định tính tương đồng giữa Frontend JS và Backend .NET (`check_be_parity.mjs`): đồng bộ 100% thang bậc Fixer, mốc Color Fixer (Merit 300 / Rep 95) và các thứ bậc Finger.
* Đồng bộ hàm băm tất định FNV-1a 32-bit (`StableHash`) trên Backend.
* Chạy mô phỏng kiểm định cân bằng 1.500 kiếp sống (`balance_sim.mjs`) đạt tuổi thọ trung bình 55.7 tuổi (khớp 105.3% lore `avgLife`).
* Triển khai CI/CD tự động lên Vercel Production và cấu hình kết nối API Render.

### Đợt 13 (21/10/2026): Rà soát logic cốt truyện & Mở rộng 152 sự kiện mới
* Xây dựng hệ thống phát hiện lỗi logic (`storyInvariants.js`, `story_logic_audit.mjs`), sửa triệt để lỗi cờ quan hệ người thân đã mất, lỗi trùng tên NPC và lỗi kẹt chuyển nghề của Distortion.
* Bổ sung 152 nội dung mới (20 sự kiện lớn, 63 sự kiện nhỏ, 70 dòng thường ngày), nâng tổng số kho sự kiện lên 689 mục.
* Triển khai thuật toán chống lặp dựa trên trọng số độ mới `freshness` và cá tính ngẫu nhiên `variance.js`.

### Đợt 12 (21/10/2026): Mở rộng 33 sự kiện lớn cho các nhánh sự nghiệp
* Bổ sung 33 sự kiện lớn phân bổ đều cho 4 nhánh nghề sau tuổi 18: Đấu kiếm Cinq, Khế ước Oufi, Tu viện Dieci, Đạn dược Thumb, Con quay Index, Sách phục thù Middle, Thuế thời gian T Corp, Tàu WARP W Corp, Lò nhân bản R Corp, Rèn vũ khí Zelkova, Lãnh địa biến dị Distortion.
* Mô phỏng sâu 1.000 vòng đời đạt 100% không phát sinh lỗi.

### Đợt 11 (21/10/2026): Kinh tế Ahn Sinks & Khảo hạch Fixer đa nhánh
* Tích hợp 7 sự kiện lớn chi tiêu tiền mặt Ahn cao cấp (Viện tái sinh K Corp, Buồng tua ngược T Corp, Tiệm bánh HamHamPangPang, Spa J Corp, Giáp Tres Atelier...).
* Thêm Consideration 6 trong thuật toán Utility AI: tự động ưu tiên xuất hiện dịch vụ y tế khi máu hoặc tinh thần nguy kịch.
* Thay thế chuỗi thăng cấp Fixer tuyến tính bằng các pool khảo hạch ngẫu nhiên đa dạng qua các Hiệp hội chuyên trách.

### Đợt 10 (21/10/2026): Tối ưu nhịp thơ ấu & Cơ chế Fog of War cho lựa chọn
* Giới hạn đúng 1 sự kiện thường ngày mỗi năm ở lứa tuổi 0–4, giữ nhịp văn lắng đọng.
* Lựa chọn sự kiện chuyển sang hiển thị các chip tài nguyên dạng chiều hướng (Fog of War) thay vì lộ rõ số lượng chính xác, tăng tính hồi hộp roguelike.
* Bổ sung danh sách cấm trùng tên Canon (`CANON_NAMES_BLACKLIST`).

### Đợt 9 (20/10/2026): Chuẩn hóa ngôn ngữ Home tiếng Anh
* Chuyển đổi toàn bộ giao diện trang chủ sang tiếng Anh quân sự chuẩn lore, tối ưu hiển thị số ít/số nhiều và thuộc tính accessibility.

### Đợt 8 (20/10/2026): Bố cục thích ứng hai cột & Wireframe nền
* Đưa đồ họa wireframe The City thành lớp bao phủ toàn màn hình tĩnh, không che khuất chữ.
* Thiết kế cột lựa chọn độc lập bên cạnh cột truyện từ độ phân giải 1360px trở lên.

### Đợt 7 (20/10/2026): Tái thiết kế giao diện True-Black Flat & Antislop Audit
* Áp dụng triệt để bộ quy chuẩn chống thiết kế AI sáo rỗng (*antislop*): màu than trung tính, chữ Be Vietnam Pro tối ưu dấu tiếng Việt, vàng lưu trữ tiết chế, tỉ lệ tương phản đạt chuẩn 4.5:1.
* Vòng chọn 26 District trực quan kết nối trực tiếp với dữ liệu bối cảnh thực.

### Đợt 6 (20/10/2026): Tối ưu Mobile HUD & Error Boundary chống sập trang
* Xây dựng giao diện riêng cho điện thoại: Thanh đo máu đôi (HP/SP Twin Gauges), thanh tài nguyên cô đọng, ngăn kéo hồ sơ Bottom Sheet Drawer.
* Tích hợp component `ErrorBoundary` ngăn chặn triệt để lỗi sập màn hình đen khi có ngoại lệ runtime.

### Đợt 5 (20/10/2026): Khảo nghiệm Color Fixer & Reset huyết thống
* Hoàn thiện cơ chế sát hạch Star of the City để phong tặng danh hiệu Color Fixer tùy biến.
* Đồng bộ đầy đủ 5 Ngón Tay Syndicate. Bổ sung tính năng xóa hồ sơ gia phả trên màn hình Bloodline.

### Đợt 1 – 4 (19/10 – 20/10/2026): Nền móng kiến trúc & Khởi tạo dự án
* Xây dựng bộ engine mô phỏng cốt lõi: Vòng lặp 4 mùa `yearPlanner.js`, hệ thống chỉ số tài nguyên, hạt giống PRNG `sfc32` và bộ dữ liệu bối cảnh 26 Quận.
* Xây dựng Backend .NET 8 Minimal API với cơ chế lưu file nguyên tử `.tmp`.
* Tích hợp Web Audio API và hệ thống thành tựu Codex.
