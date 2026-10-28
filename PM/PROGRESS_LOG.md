# The City Chronicles: Tài Liệu Tiến Trình & Kiến Trúc Kỹ Thuật Toàn Diện

> **Cập nhật ghi chép: 28/10/2026 (Đợt 77: Tái thiết kế khung BirthSetupPanel chuẩn Hana Terminal Docket, xử lý triệt để lỗi lẹm chữ tab và tràn khung nhìn di sản; đã kiểm thử 100%)**
> **Phân biệt rõ số liệu kiểm thử tự động & số liệu mô phỏng 500 đời hiện hành (Đợt 69):**
> - **Đã xác minh tự động bằng bộ test (`npm test`):** Toàn bộ **53/53 test suites** đạt 100%, parity cổng thăng tiến FE/BE khớp tuyệt đối, `lint_story.mjs` (745 major, 43 consequence, 866 minor, 572 daily, 36 contract) & `voice_lint.mjs --fail` (**32.337 chuỗi**) đạt 0 lỗi / 0 cảnh báo, `run_million_audit.mjs 500` (500 khoảnh khắc) đạt 5/5 nhóm quy tắc toàn vẹn, `npm run build` hoàn tất sạch bóng.
> - **Đã đo mới trên codebase hiện tại qua mô phỏng 500 cuộc đời đầy đủ (Đợt 69):** `story_logic_audit.mjs 500 random` (**80.338 khoảnh khắc**, 500 đời, **0 vi phạm logic**, entropy `83.1%`), `balance_sim.mjs 500 random` (13.208 năm sống, phân bổ nghề: Fixer `31.0%`, Wing `29.9%`, Syndicate `31.9%`, Distortion `5.4%`), `balance_sim.mjs 500 focused` (21.749 năm sống, tuổi thọ TB `42.6`, đạt Color Fixer `9.6%` ở tuổi TB `55.4`, thức tỉnh E.G.O `12.6%` ở tuổi TB `45.5`), và `branch_experience.mjs 500` (tuổi thọ Distortion tăng vọt từ `3.8` lên **`11.3` năm/đời**, đại sự kiện trải nghiệm từ `16` lên **`40`**).
> - **Cách đọc số liệu lịch sử:** Các kết quả mô phỏng ở Đợt 1–23 là ảnh chụp lịch sử tại thời điểm ghi nhận của từng đợt trước; xem mục **Đợt 69** ở cuối tài liệu để đọc bảng số liệu 500 cuộc đời hiện hành.

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
10. [Nhật ký phát triển chi tiết (Changelog từ Đợt 1 đến Đợt 68)](#10-nhật-ký-phát-triển-chi-tiết-changelog-từ-đợt-1-đến-đợt-23)

---

## 1. Tổng quan dự án & Triển khai trực tuyến

* **Tên dự án:** *The City Chronicles* (Biên Niên Sử The City)
* **Thể loại:** Roguelike Text Life Simulator, RPG Sinh tồn, Narrative Drama & Psychological Exploration.
* **Cảm hứng & Bối cảnh:** Thế giới *Project Moon* (*Lobotomy Corporation*, *Library of Ruina*, *Limbus Company*) kết hợp đào sâu tâm lý nội tâm và triết học nhân sinh phong cách *Disco Elysium*.
* **Live Frontend (Vercel Production):** [https://project-moon-life-five.vercel.app](https://project-moon-life-five.vercel.app)
* **Live Backend (Render Web Service):** [https://projectmoon-life.onrender.com/api](https://projectmoon-life.onrender.com/api)
* **Mã nguồn Git Repository:** [https://github.com/minhtamjp1409-blip/ProjectMoon_Life](https://github.com/minhtamjp1409-blip/ProjectMoon_Life)
* **Thư mục cục bộ hiện hành (kiểm tra 24/10/2026):**
  * Frontend: `D:\School\PM`.
  * Backend: `D:\School\PM_BE`.
  * Các đường dẫn `C:\Users\nguyenhuynhminhtam\Downloads\TestPM\...` trong ghi chép trước là vị trí cũ. `D:\School\ProjectMoon_Life` là checkout Git riêng, không phải hai thư mục chạy cục bộ ở trên.

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
* Thứ bậc thăng tiến: Cấp dưới (Rank 0: Soldato / Proselyte / Little Sibling / Novice) $\to$ Cán bộ (Rank 1: Capo / Messenger / Big Sibling / Docent / Sworn Blade) $\to$ Lãnh đạo cấp cao (Rank 2: Sottocapo / Proxy / Great Elder / Maestro / Star of the Sky) $\to$ Đỉnh cao tối thượng (Rank 3 Apex: Underboss / Weaver / Great Sibling / Grand Curator / Sovereign).
* **Cơ chế thăng tiến cân bằng (Đợt 20):**
  * Rank 1: Merit 28, Rep 18, tuổi $\ge 22$.
  * Rank 2: Merit 68, Rep 46, tuổi $\ge 28$, thâm niên $\ge 4$ năm.
  * Rank 3 (Apex): Merit 155, Rep 84, tuổi $\ge 35$, thâm niên $\ge 5$ năm. Tỉ lệ đạt Rank 3 Apex kiểm định qua 1.000 cuộc đời thực tế đạt **9.1%** (khống chế độ hiếm chuẩn roguelike, không bị lạm phát danh hiệu).
  * Bảo lưu Merit: Khi thăng bậc, tối đa 30% Merit thặng dư được mang sang cấp tiếp theo và bị chặn thấp hơn mốc kế tiếp 15 điểm để ngăn chặn việc đỗ một kỳ thi rồi thăng liền hai bậc.
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

### 7.1. Thống Kê Tổng Thể Kho Nội Dung (1.002 mục, xuất ngày 23/10/2026)
* **319 Sự Kiện Lớn (Major Narrative Dilemmas):** Bao gồm tuổi thơ, biến cố trưởng thành, các nhánh nghề nghiệp, khủng hoảng 26 Quận, sự kiện tuổi già, ngã rẽ siêu nhiên, xung đột và liên minh huynh đệ NPC.
* **44 Hệ Quả Nhân Quả (Causal Consequences):** Các sự kiện trừng phạt hoặc đền đáp quay trở lại sau các quyết định trong quá khứ, bao gồm các vụ phục kích trả thù của cựu đồng đội phản bội.
* **256 Gặp Gỡ Bất Chợt (Minor Encounters):** Tình huống phản xạ 15 giây rải khắp các khu vực Backstreets, Nest, Outskirts, đời sống tình cảm và xích mích đồng hành.
* **347 Dòng Thường Nhật (Daily Life Moments):** Các lát cắt đời sống bình dị và chân thực, tạo nên nhịp điệu sinh hoạt đô thị từ thuở lọt lòng đến tuổi xế chiều.
* **36 Ủy Thác Tác Chiến Fixer (Tactical Requests):** Hợp đồng nhận việc có phân định rủi ro và xác suất chiến thuật, từ Tier 1 (khu phế liệu) đến Tier 5 (Thảm Họa Đô Thị, Thủy Quái Đại Hồ).
* Toàn bộ danh mục được lưu trữ đồng bộ trong `docs/events/DANH_SACH_TAT_CA_EVENTS.txt` và `docs/events/DANH_SACH_TAT_CA_EVENTS.json`.

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

Dự án áp dụng hệ thống kiểm định tự động cho 5 nhóm bất biến logic. Kết quả đạt trong một mẫu chạy chỉ xác nhận những trường hợp mẫu đó đã đi qua, không phải bảo đảm toàn bộ nhánh truyện:

```bash
# Lệnh chạy toàn bộ bộ kiểm tra chất lượng:
npm test
```

### 9.1. Năm Nhóm Quy Tắc Toàn Vẹn Cốt Lõi (5 Integrity Audit Checks)
Kết quả lịch sử từng ghi trên **50.134 khoảnh khắc** và **243 vòng đời** là **0 lỗi trong 5 nhóm được đo**. Đây không phải cấu hình mặc định của `npm test` hiện nay:
1. **[CHECK 1] Ghost NPC Event Violations (0 LỖI):** Tuyệt đối không có NPC đã khuất (vợ/chồng, bạn bè, đệ tử, cha mẹ đã mất) xuất hiện hay đối thoại như người đang sống.
2. **[CHECK 2] Distortion Doing Human Fixer Events (0 LỖI):** Nhân vật đã biến dị thành Distortion bị cô lập hoàn toàn khỏi các hợp đồng làm việc và hoạt động xã hội của loài người.
3. **[CHECK 3] Fixer Grade Skipping Violations (0 LỖI):** Mọi Fixer thăng tiến tuần tự từng bậc một qua kỳ sát hạch của Hana, không nhảy cóc cấp bậc.
4. **[CHECK 4] Biological Child without Offspring Violations (0 LỖI):** Phân biệt chính xác giữa con ruột hợp pháp, đệ tử truyền thừa và trẻ lang thang nhặt từ Backstreets.
5. **[CHECK 5] Career Checklist vs Exam Gate Mismatches (0 LỖI):** Danh sách điều kiện hiển thị trên giao diện người chơi khớp chính xác 100% với logic cổng mở kỳ thi của engine.

### 9.2. Kết quả lịch sử của kiểm định 120 sinh mệnh (`tools/sim/story_logic_audit.mjs`)
* Mô phỏng ngẫu nhiên 120 cuộc đời hoàn chỉnh (hơn 24.000 khoảnh khắc): **0 VI PHẠM LOGIC**.
* Độ che phủ sự kiện: 654 / 770 sự kiện từng xuất hiện trong các lượt chạy mẫu.
* Chỉ số chồng lấn Jaccard giữa hai cuộc đời ngẫu nhiên đạt 0.210 (chứng minh độ đa dạng và khác biệt rất cao giữa các ván chơi).

### 9.3. Cấu hình và kết quả kiểm thử hiện hành (23/10/2026)
* `npm test` chạy kiểm tra tương hợp FE/BE (`tools/lint/check_be_parity.mjs`), lint nội dung (`tools/lint/lint_story.mjs`), các bộ regression kịch bản, kiểm thử cơ chế dungeon (`tests/test_dungeon_mechanics.mjs`) và `run_million_audit.mjs 500`. Kết quả đạt 100% (0 errors, 0 warnings).
* `npm run build` hoàn tất sạch sẽ với Vite 6.4.4 trong 8.10s. `dotnet build ../PM_BE` đạt 0 warning, 0 error.
* `node tools/export_all_events.mjs` ghi lại `docs/events/DANH_SACH_TAT_CA_EVENTS.txt` và `.json` với đúng **1.002 mục**.

### 9.4. Báo cáo thực nghiệm mô phỏng 1.000 cuộc đời trọn vẹn (1,000-Life Benchmark Audit)
Mô phỏng 1.000 sinh mệnh độc lập (tuổi thọ trung bình 52.0 tuổi) chạy qua toàn bộ engine sinh tồn và hệ thống Weaver AI:
* **Tỉ lệ trùng lặp nội dung trong cùng một cuộc đời (Within-Life Duplication Rate):**
  * **Major Story Events:** **5.40%** (18.292 lượt kích hoạt, chỉ 988 lần gặp lại sự kiện cũ). Đây là mức phân bổ cực kỳ đa dạng, bảo đảm người chơi gần như không gặp lại sự kiện lớn trong cùng một kiếp sống.
  * **Minor Choice Events:** **35.78%** (trên 60.161 khoảnh khắc lựa chọn vi mô, phân bổ đều qua 52 năm tuổi).
  * **Daily Life Lines:** **39.40%** (trên 127.597 dòng thường nhật, duy trì bầu không khí sống động).
* **Phân phối thăng tiến đỉnh cao sự nghiệp (Career Apex Distribution):**
  * **Syndicate Rank 3 (Underboss / Apex Sovereign):** **9.1%** (21 / 231 cuộc đời theo Syndicate). Khắc phục triệt để lỗi mất cân bằng cũ (~63%), đưa chức vị thủ lĩnh ngón tay về chuẩn roguelike hiếm có.
  * **Wing Rank 3 (Senior Executive):** **19.3%** (37 / 192 cuộc đời theo Wing).
  * **Fixer Grade 1 & Color Fixer Huyền thoại:** **2.3%** (23 / 1.000 cuộc đời: 17 Grade 1 và 6 Color Fixer).
  * **Thức tỉnh E.G.O hoàn chỉnh:** **7.5%** (75 / 1.000 cuộc đời).
  * **Sa ngã biến dị (Distortion):** **6.3%** (63 / 1.000 cuộc đời).
  * **Đồng đội phản bội / Chuyển thành Nemesis:** **5.6%** (56 / 1.000 cuộc đời, kích hoạt khi bỏ bê đồng đội dẫn đến rạn nứt sâu sắc).

---

## 10. Nhật ký phát triển chi tiết (Changelog từ Đợt 1 đến Đợt 23)

### Đợt 38 (24/10/2026): Năm nhánh Finger ngang Fixer về nội dung
* **Đo trước:** so từng loại nội dung mà mỗi nhánh có thể gặp trong cả đời với Fixer (dùng chính cổng điều kiện của game, bỏ phần ai cũng gặp). Event lớn chỉ đạt 67 đến 73%, hợp đồng mỗi chặng 45 đến 56% (mỗi bậc chỉ 3 hợp đồng, dải chọn rộng 3 bậc nên chỉ 9, trừ 6 cái vừa chơi còn 3), cảnh thăng cấp 2 mỗi bậc so với 3 của Fixer, cửa dungeon Thumb và Ring thiếu 1. Event nhỏ (89 đến 94%) và cảnh thường ngày (hơn 130%) đã đủ.
* **Hợp đồng** (`src/data/careerContractsMore.js`): thêm 18 mỗi Finger, mỗi bậc 6. Mỗi hợp đồng có cảnh viết riêng; lời kết cục theo giọng từng Finger dùng chung và điền địa điểm, đối tượng của từng cảnh. Dải chọn giờ có 18 hợp đồng ở mọi rank, ngang Fixer (16 đến 20).
* **Cảnh thăng cấp** (`src/data/eventsFingerDepth.js`): thêm 13 cảnh để mỗi bậc của mỗi Finger có 3 cảnh như Fixer; đã nối vào `FINGER_LADDERS`.
* **Nhiệm vụ** (`eventsFingerDepth{Thumb,Index,Middle,Ring,Pinky,More}.js`): thêm 66 nhiệm vụ viết tay, đặt vào các rank đang mỏng (Middle rank 0 từ 6 lên 11, Ring rank 2 đến 3 từ 10 lên 17 đến 19). Event lớn mỗi nhánh nay 82% của Fixer.
* **Cửa dungeon:** `gate_lake_thumb_cargo` và `gate_lobotomy_ring_relic`, nên cả năm Finger đều có đủ cửa.
* Test: `tests/test_finger_parity.mjs` (mới) giữ các ngưỡng này: 6 hợp đồng mỗi bậc, 3 cảnh mỗi bậc, 9 nhiệm vụ mỗi rank, event lớn, nhỏ và cửa dungeon từ 80% của Fixer.

### Đợt 37 (24/10/2026): Viết lại giọng văn các event mở đầu
* Rà văn bản toàn bộ pool (hơn 1400 event). Thân event trung vị 48 từ, chỉ 14 event dài quá 70 từ; mật độ cụm văn mẫu trung bình 1,27 trên 1000 từ, cao nhất ở `eventsBackgroundOpening.js` (2,63), `eventsFactions.js` (1,97), `eventsDistortionPath.js`, `eventsNpcAndWorldExpansion.js`, `eventsFixerPath.js`. Hai file tuổi thơ đã thấp sau đợt này.
* Viết lại VI và EN cùng nhịp (cơ chế, chỉ số, cờ giữ nguyên): 26 event trong `eventsChildhood.js` (hai event đã gọn được giữ), cả 12 event của `eventsBackgroundOpening.js`, 11 trên 14 event của `eventsDistortionPath.js` (sửa luôn chỗ bản EN ghi Claw và Beholder thuộc A Corp, nay là C Corp và B Corp như bản VI), và 7 bài khảo thí Grade 8 đến Grade 2 trong `eventsFixerPath.js`. Bỏ cụm vá tính từ, sửa chỗ VI và EN kể khác nhau, mỗi kết quả khép bằng một hậu quả nhỏ.
* Còn lại: phần còn lại của `eventsFixerPath.js`, `eventsFactions.js`, `eventsNpcAndWorldExpansion.js`, các file Finger, dungeon, đỉnh bậc. Các event ch2 trong `eventsChildhood2.js` đã gọn nên chưa sửa.

### Đợt 36 (24/10/2026): Đỉnh Color và đỉnh Finger, tuổi thọ dài, kết thúc theo tình huống
* **Chỗ trống:** sau khi lên Color hoặc rank cao nhất của một Finger, người chơi chỉ còn vài quest chung của người đang leo. Đợt này thêm một bộ việc riêng cho đỉnh bậc: mỗi năm một việc tăng danh vọng hoặc một trận ngang tầm (đấu giữa hai cái tên, săn Urban Nightmare, dẹp tổ dưới cống, hộ tống, phán xử, biểu diễn trước lớp trẻ). Các việc dành cho người đang leo không còn xuất hiện với Color và với Finger rank cao.
* **Chống lặp** (`src/data/apexCommissions.js`, `src/data/eventsApexPath.js`): mỗi việc ghép từ ba phần viết riêng là cảnh mở đầu, loại việc (đấu, săn, hộ tống, đột kích, phán xử, biểu diễn) và tình tiết phụ trong ngày. Màu Color có hơn chín mươi việc khác nhau, mỗi Finger có năm mươi sáu. Mô phỏng 55 năm ở đỉnh: không việc nào lặp. Tổng pool event lên hơn một nghìn bốn trăm (khoảng tám trăm hai mươi minor và năm trăm tám mươi major).
* **Bốn event dài cho Color** (`color_challenger_duel`, `color_nightmare_hunt`, `color_section_ruling`, `color_long_shadow`).
* **Sống tới khoảng một trăm hai mươi tuổi, có lý do trong truyện** (`src/data/eventsApexTwilight.js`): Color được Hana mời vào chương trình chăm sóc dùng ống tiêm K Corp, còn người đứng đầu mỗi Finger nhận một lời đề nghị theo cách của Finger đó (bác sĩ gia đình của Thumb, Prescript giữ nhịp tim của Index, cuốn Book of Vengeance còn người đọc của Middle, Maestro của Ring, thuốc của Star of the Sky). Nhận thì được cờ `ApexLongevity`: cơ thể bắt đầu già muộn hơn (`apexLongevityShift` trong `economyModel.js`). Từ chối thì sống theo lịch thường. Mô phỏng: khu có tuổi thọ trung bình khoảng năm mươi lăm cho tuổi chết khoảng một trăm mười bốn, còn người không nhận chăm sóc khoảng bảy mươi sáu. Lời đề nghị được xếp vào năm sau khi lên đỉnh.
* **Kết thúc không nhất thiết là chết giường** (`src/data/lifeEndings.js`, trường `lifeEnding` và `endsLife` trong event): chu du ngoài tường, nhường ghế, bị người kế vị đâm sau lưng để soán ngôi, trận đấu cuối với người từng kèm cặp, bị Section của Hana gạch tên bằng một Request niêm phong. Mỗi cái có câu bia mộ và đoạn kết riêng; chết già sau một trăm tuổi ở đỉnh cũng có câu riêng. Các kết thúc này không khóa nút kế thừa (khác kết thúc The Library). Mỗi tình huống đều có lối thoát hoặc lối từ chối, nên người chơi chọn được cách kết thúc.
* **Lore:** ống tiêm K Corp là vật phẩm có sẵn trong game và là công nghệ thật của K Corp; các phương pháp kéo dài tuổi của Finger là phóng tác, không có trong nguyên tác.
* Test: `tests/test_apex_path.mjs` (mới): pool, chống lặp, tuổi thọ, từng kết thúc và bia mộ.

### Đợt 36 (24/10/2026): Quyết định trước khi xúc xắc rơi
* **Ba manh mối mỗi năm từ tuổi 15:** game rút ba sự kiện nhỏ phù hợp với nhân vật, không trùng nhau hoặc trùng lịch năm đó; mỗi manh mối báo mức rủi ro dự kiến. Chỉ manh mối được chọn mới xuất hiện vào đầu mùa hạ. Bản tự chơi chọn một manh mối; lựa chọn và lịch sự kiện được lưu cùng run. Cơ hội công trạng hằng năm và các sự kiện nhân quả vẫn giữ lịch riêng.
* **Cược sâu trong dungeon giao tranh:** tại điểm nghỉ, đi tiếp không hồi phục sẽ tăng một nấc cược (tối đa hai). Mỗi nấc tăng 35% hàng từ các trận sau và 15% sát thương nhận. Có thể rút ở điểm nghỉ với hàng đã gom; phán quyết của The Head vẫn không có đường rút hoặc phần thưởng.
* **Ba tổ hợp sẹo:** sống sót + vũ khí giúp né lúc HP thấp nhưng tăng Heat; thương tật + tay nghề cho thêm một lần tiếp tế nhưng tốn Ahn hằng năm; ám ảnh + chứng kiến giúp dò đường nhưng hao SP. Hồ sơ hiển thị cả lợi và giá; các tổ hợp chỉ hoạt động khi hai dấu tương ứng đang nằm trong ba sẹo hiện hành.
* **Xác minh:** `npm test`, `npm run build` đạt; test mới quét 30 seed qua Fixer, Syndicate, Wing, Outcast và Distortion, kiểm tra lưu/lựa chọn manh mối, cặp sẹo và cược dungeon. Chưa kiểm tra trực quan trong trình duyệt ở đợt này vì bề mặt trình duyệt cục bộ không khả dụng. Trong lúc kiểm thử, commit `2b7ffaa` chứa phần lớn cơ chế trên đã xuất hiện trên GitHub từ một thao tác ngoài phiên này; tôi không commit/push. Các tinh chỉnh điều kiện sự kiện, tự chơi, test và ghi chép cuối vẫn ở máy.

### Đợt 35 (24/10/2026): Dungeon thành chuỗi giao tranh, phán quyết của The Head
* **Rải đều:** luồng làm việc song song đã thêm cửa cầu nối và ưu tiên dungeon chưa gặp; đợt này thêm 3 cửa cuối (Syndicate và Outcast đi tàu WARP, Wing đi Outskirts). Đo 150 đời mỗi nhánh: mỗi dungeon được gặp ở 20 đến 44% số đời của mọi nhánh, không còn ô gần 0.
* **Chuỗi giao tranh** (`src/engine/dungeonCombat.js`, dữ liệu `src/data/dungeonGauntlets.js`) cho tàu WARP, tàn tích L Corp, La Manchaland, Great Lake và Đêm ở Backstreets. Phế Tích Outskirts giữ lối khám phá theo chặng. Bảy tầng: hai trận, điểm nghỉ, hai trận, điểm nghỉ, trùm hai pha. Mỗi lượt kẻ thù báo trước đòn (nặng, nhanh, quét, tấn công tâm trí, túm giữ); người chơi chọn Thủ, Phản công, Né, hoặc để người đi cùng đỡ (tối đa 2 lần). Đáp đúng thì kẻ thù mất một nấc thế thủ (phản công đúng lúc mất hai), đáp sai thì đau hơn. Chỉ rút được ở điểm nghỉ. Điểm nghỉ đầu có cửa phụ (thêm một trận tinh nhuệ, thưởng lớn) và lối tắt (bỏ qua một tầng nếu may). Tiếp tế, dò đường (thấy trước đòn kế tiếp), E.G.O và thế đứng vẫn dùng được. Hạ trùm thì vào chặng kết cũ (mang về, báo về Association).
* **Độ khó** (mô phỏng 300 lượt mỗi dungeon): người đọc đòn tốt thắng 81 đến 93%, chết 0 đến 11%; người chơi thực tế (đúng 80%) thắng 51 đến 67%, rút ở điểm nghỉ 23 đến 37%, chết 7 đến 14%; chọn bừa thì chết 70 đến 85%.
* **Phán quyết của The Head** khi Taboo Gaze đầy: ba tầng không lối rút, không phần thưởng: Beholder of the Eye (B Corp, đọc và đánh dấu: trúng thì lượt sau không né được), Executioner of the Claw (C Corp: Serum W, Serum R, Serum K hồi lại thế thủ nếu không bị phản công cắt ngang, Tri-serum Cocktail), Arbiter of the Head (Line, Thick Line, Thin Line, Birdcage khóa phản công một lượt, Shockwave). Giữ phần kết do luồng song song viết: thoát được thì đến ngưỡng cửa The Library ở Outskirts, chết thì án đã thi hành. Mô phỏng: người đọc đòn tốt thoát 54%, người chơi thực tế 33%, chọn bừa 0%. Lore: trang The Head, Baral và Zena trên wiki Library of Ruina; khả năng riêng của Beholder (Luda) wiki không ghi, nên đòn của Eye là phóng tác.
* **Hiệu ứng và nền** (`src/styles/dungeonFx.css`): mỗi lượt có hiệu ứng ngắn theo kết quả (trúng đòn, đòn nặng, đỡ, phản công, né, tấn công tâm trí, hạ tầng, đổi pha, hạ trùm) và theo từng nơi (WARP nhiễu sọc, L Corp vạch còi báo, Carnival vệt chém đỏ, Great Lake sóng tràn, Night mực đen, Claw đường cắt xanh). Bảng kẻ thù rung khi bị phản công, cảnh rung khi trúng đòn nặng. Nền sau sân khấu tối dần theo tầng, trùm và pha hai đổi màu; Night có nền riêng (đèn đường chập chờn, đồng hồ 3:13, mực rỉ từ cống, bóng vest đi qua). Âm thanh theo từng loại kết quả.
* **Sidebar theo dungeon:** khi đang trong dungeon, menu trái, hồ sơ nhân vật, thanh đầu trang và thanh dưới đổi sang màu và họa tiết của nơi đó, và viền màn hình chớp nhẹ khi trúng đòn. Có tôn trọng chế độ giảm chuyển động (giữ màu, bỏ chuyển động).
* Test: `tests/test_dungeon_gauntlet.mjs` (mới); `test_dungeon_mechanics`, `test_dungeon_balance`, `test_dungeon_variety` chuyển phần cơ chế khám phá sang Outskirts; `test_claw_judgment` viết lại phần sau cho ba tầng. Voice lint giờ kiểm cả lời báo đòn, lời mở đầu và câu đổi pha.

### Đợt 35 (24/10/2026): Cô lập hồ sơ người chơi, độ tin cậy của lưu trữ và rà soát giao diện
* **Dữ liệu backend theo người chơi:** API hồ sơ, trạng thái và telemetry yêu cầu `X-Player-Token` hợp lệ; server băm token để chọn thư mục riêng. Các thao tác đọc, ghi và xóa của một trình duyệt không còn đụng vào hồ sơ của trình duyệt khác. Dữ liệu server dùng chung từ phiên bản cũ không được tự gán cho người chơi mới.
* **Độ bền lưu trữ:** ghi bản sao `.bak` và phục hồi khi tệp chính hỏng; hỗ trợ `CITY_DATA_DIR` tuyệt đối cho ổ dữ liệu bền vững. Nếu host dùng ổ tạm thì dữ liệu backend vẫn có thể mất khi khởi động lại; cần cấu hình ổ bền vững khi triển khai.
* **Frontend:** token ngẫu nhiên được lưu trên thiết bị và gửi cùng yêu cầu API. Trạng thái lưu chỉ báo thành công khi ít nhất một nơi lưu thành công, có báo lỗi và nút thử lại. Khi bỏ cuộc chơi, đợi yêu cầu ghi cũ hoàn tất để không hồi sinh lượt chơi đã xóa.
* **Giao diện:** Home và điều hướng Home dùng tiếng Anh theo thiết kế; ngôn ngữ trong lượt chơi theo lựa chọn hiện có. Thanh điều khiển và menu trên màn hình rộng 320 px không còn tràn ngang.
* **Xác minh tại máy:** `npm test`, `npm run build`, `npm run test:backend-isolation` đạt; thử thực tế Home, lượt chơi và menu trên điện thoại 320/390 px và desktop 1366 px. Mô phỏng nhánh và Finger đã được rà soát; chưa thay đổi cân bằng khi mẫu đo chưa đủ để kết luận. Không commit, push hoặc deploy trong đợt này.

### Đợt 34 (23/10/2026): Dungeon có rẽ nhánh, người đi cùng, và nhiều hơn cho Finger
* **Dungeon thứ sáu: Đêm ở Backstreets** (`src/data/dungeonExtras.js`). Lore (wiki Library of Ruina, trang Sweepers): Night in the Backstreets kéo dài từ 3 giờ 13 đến 4 giờ 34; Sweepers ra thành ba đợt, ai qua đủ ba đợt thì an toàn; Sweepers không vào nhà dân; thân thể là chất lỏng giữ trong bộ vest đen, nạp lại qua cái móc cắm vào người; chúng không để lại gì. Bốn chặng: ba đợt quét và 4 giờ 34. Lối thoát giữa chừng là gõ cửa một nhà dân. Syndicate, Outcast và người có cờ Backstreets có thông thạo cho dungeon này.
* **Ngõ phụ:** mỗi dungeon có một cánh cửa phụ ở chặng 1 hoặc 2 dẫn vào một phòng riêng (toa hành lý, phòng lưu trữ ngập nước, hậu trường đoàn xiếc, trại bỏ hoang, xác tàu đắm, quán rượu lúc 3 giờ). Thêm một chặng căng thẳng, trả thêm; xong thì quay về đúng chặng kế tiếp. Vẫn đúng 4 chặng chính.
* **Lối tắt:** chặng 2 của mỗi dungeon có một lựa chọn may rủi nhảy thẳng tới chặng cuối, đổi lại căng thẳng và vết thương lớn hơn. Trượt thì chỉ đi tiếp một chặng như thường.
* **Biến thể theo hạt giống:** chặng 3 của mỗi dungeon có một phiên bản khác (toa ăn, phòng họp, vòng ngựa gỗ, thư viện chìm, con tàu ma, chiếc xe đẩy của Mother); cửa nào mở ra phiên bản nào do hạt giống và tuổi quyết định, nạp lại không đổi được.
* **Người đi cùng:** partner, rồi người đang được dìu dắt, rồi friend, rồi mentor (bond từ 15) đi cùng xuống. Ở hai chặng giữa có thể "để người ấy đi trước": bạn không mất máu, tỉ lệ theo bond; trượt thì họ bị thương (bond giảm), xui thì không trở lại (khoảng 1 đến 4% số lượt có người đi cùng). Bond từ 60 thì một lần đỡ nửa đòn cho bạn khi bạn trượt; bond dưới 30 thì có thể cãi lệnh khi bạn trượt. Kết thúc thắng thì bond tăng, người được dìu dắt tiến bộ thêm.
* **Mang về và báo về:** chặng cuối có thêm lựa chọn báo về Association (chỉ khi có huy hiệu; tín nhiệm tăng, nhiều hơn nếu dungeon hợp chuyên môn, ví dụ Dieci với Ruins). Mang vật ra khỏi dungeon (ống Cogito, Huyết Tinh, khối quặng, Long Diên Hương, chuyến Night) gieo sự kiện `csq_dungeon_trophy_kept` 3 năm sau: có người đến hỏi mua.
* **Dungeon theo Association:** 6 cửa mới (Zwei vào La Manchaland cứu trẻ em, Dieci khảo sát Ruins, Seven lấy hồ sơ ở chi nhánh L Corp, Devyat' mang hàng qua WARP, Liu cả nhà ra Đại Hồ, Öufi thi hành bản án lúc 3 giờ 13). Đi vì Association thì thắng cộng tín nhiệm, bỏ chạy hoặc vỡ thì trừ; từ chối cũng trừ một ít.
* **Theo nhánh** (`dungeonPacing.js`): mỗi Finger có một cửa Night riêng (Thumb đòi nợ, Index đứng đếm theo Prescript, Middle đuổi một cái tên, Ring thu âm cho Docent, Pinky quyết đấu theo lời thề), Fixer và Outcast có một cửa Night chung. Số cửa đảm bảo mỗi đời: Syndicate 3 (cách nhau 5 đến 8 năm, chờ tối thiểu 3 năm), Wing và Outcast 2, Fixer 1 (chờ 5 năm). Cửa dungeon tự xuất hiện trong lần rút cũng nặng hơn với Syndicate (×1,8), Wing và Outcast (×1,3). Syndicate giờ có 3 lượt tiếp tế như Fixer.
* **Đo** (100 đời mỗi nhánh từ 18 tuổi): số cửa trung bình mỗi đời Fixer 1,0; Syndicate 2,4; Wing 1,2; Outcast 1,8. Khoảng 85 đến 90% đời có ít nhất một cửa (còn lại chết trước tuổi hẹn). Mô phỏng 300 lượt mỗi dungeon với lựa chọn ngẫu nhiên: chết 0 đến 1%, vỡ tinh thần 0 đến 3%.
* Test: `tests/test_dungeon_variety.mjs`.

### Đợt 33 (23/10/2026): Mỗi đời ít nhất một cửa dungeon
* **Đo trước khi sửa** (150 đời Fixer từ 18 tuổi): chỉ 15% đời được mời vào dungeon, trung bình 0,19 lần mỗi đời, lần đầu thường ở tuổi 48. Các cửa dungeon (`eventsDungeonGates.js`) phải cạnh tranh với khoảng 70 event major đủ điều kiện mỗi năm nên hiếm khi được rút.
* **Cửa đầu tiên có hẹn** (`src/engine/dungeonPacing.js`): mỗi đời có một tuổi hẹn theo hạt giống, từ 2 đến 7 năm sau tuổi đi làm. Đến tuổi ấy mà chưa gặp cửa nào thì cuối năm chọn một cửa hợp với nghề, District và cờ của nhân vật (theo trọng số của cửa) và gieo thành sợi nhân quả cho năm sau. Nếu cửa đã gieo không còn hợp (đổi nghề, chuyển District) thì sau 3 năm đổi cửa khác. Distortion không nhận.
* **Chống dồn dập:** trả lời một cửa (vào hay từ chối) bắt đầu 5 năm chờ trước khi cửa khác được mời. Mỗi cửa vẫn chỉ gặp một lần như cũ.
* **Kết quả** (100 đời mỗi nghề): Fixer 89%, Syndicate 90% đời có ít nhất một cửa; mọi đời sống tới 33 tuổi đều đã gặp. Số còn lại là những đời chết trước tuổi hẹn. Lần đầu trung bình ở tuổi 22, khoảng một cửa mỗi đời. Test: `tests/test_dungeon_pacing.mjs`.

### Đợt 32 (23/10/2026): Bond với người thân không còn tụt âm thầm
* **Đo trước khi sửa** (mô phỏng 120 Fixer, một friend bond 60 và một partner bond 55 từ lúc 22 tuổi): bond trung bình 47 ở tuổi 30, 36 ở tuổi 40, 30 ở tuổi 50; chỉ 8% còn từ 50 trở lên ở tuổi 50. Nguyên nhân: `driftBonds` trừ 2 mỗi năm từ năm thứ 2 không gặp (4 từ năm thứ 5), mà mốc "gặp" chỉ được cập nhật khi một event chọn đúng người đó; Fixer ngập hợp đồng và thi Hana nên mốc ấy đứng yên.
* **Trừ chậm lại** (`director.js`): chỉ bắt đầu sau 4 năm không gặp, trừ 1 mỗi năm (2 nếu từ 7 năm và bond dưới 60), bond từ 60 trở lên chỉ trừ 1; sàn vẫn là 6.
* **Gặp lại không cần event** (`keepInTouch`, gọi mỗi cuối năm): mỗi năm spouse 60%, partner và lover 40%, friend 35%, mentee 30%, mentor 25% có một buổi gặp nhỏ, bond tăng 1 (không vượt trần hiện tại của quan hệ) và mốc "gặp" được đặt lại; thỉnh thoảng có một dòng nhật ký. Bond dưới 12 không được cứu miễn phí. Các cảnh nền tốt của friend, partner, mentor (`narrativeArcEngine.js`) cũng đặt lại mốc.
* **12 minor "giữ liên lạc"** (`lifeMinorsBonds.js`, id `mk_*`): friend 5, partner 3, spouse 2, mentor 1, mentee 1. Là minor nên không giành suất major với event Fixer; để trôi qua không trừ bond. Người nào lâu chưa gặp thì minor của họ nặng hơn tới 4 lần trong lần rút. Test: `tests/test_bonds.mjs`.
* **Kết quả** (cùng mô phỏng): bond trung bình 57 / 55 / 52 ở tuổi 30 / 40 / 50; 68% còn từ 50 trở lên ở tuổi 50. Mỗi đời có khoảng 5 minor loại này tới tuổi 50. Merit và cân bằng thăng cấp không đổi.

### Đợt 31 (23/10/2026): Association và Office không còn là cái tên
* **Ba lối đi cho Fixer** (`src/engine/affiliation.js`, dữ liệu ở `src/data/associations.js`): tự do, Office (Hook, Yun's, Molar), hoặc associate Fixer của một trong chín Association (Zwei, Shi, Cinq, Liu, Seven, Tres, Devyat', Dieci, Öufi). Mặc định là tự do từ Grade 9; từ Grade 8 trở đi, mỗi năm có xác suất được mời, nơi nào mời do hạt giống và tuổi quyết định (nơi nào hợp chỉ số thì mới mời). Hồ sơ cũ có `org` Hook, Shi hoặc Öufi được tự nhận làm thành viên.
* **Mỗi nơi có kho Request riêng:** 7 đến 8 mẫu mỗi Association (`careerContractsAssocA/B/C.js`), 6 mẫu cho Office, gọi tên bậc đe dọa theo chuyên môn của nơi ấy, nhãn ba cách tiếp cận riêng. Fixer tự do dùng kho chung cũ. Lore: yêu cầu được xếp loại rồi gửi cho Association hợp, Association giao lại cho Office hoặc associate Fixer; associate nhận lương ổn định và phải nhận việc được giao.
* **Cân bằng giữa các lối:** Association cộng khoảng 10 điểm phần trăm xác suất có việc mỗi năm, cộng 2 điểm thành công và thêm 3 phần trăm tiền công cho mỗi Section lên cao; Office cộng 5 điểm phần trăm xác suất có việc; Fixer tự do được tiền công ×1,3 nhưng thành công −4, bậc việc tối đa thấp hơn một bậc từ Grade 7 trở lên (trừ khi Network từ 60), và ít việc hơn 12% từ Grade 8. Chủ Office riêng: tiền công ×1,2, thành công −2.
* **Tín nhiệm (standing, 0 đến 100):** xong việc cộng, trượt trừ 7, từ chối trừ 9 (Association) hoặc 5 (Office), cả năm không nhận việc thì trừ; ở một nơi 6 năm mà vẫn Grade 8 trở xuống thì trừ dần. Hiển thị bằng chữ (Vững vàng, Ổn định, Lung lay, Sắp bị cắt) ở hồ sơ nhân vật, không in số. Dưới ngưỡng thì có cảnh cáo, vẫn thấp sau cảnh cáo thì bị cắt hợp đồng: Merit và giấy phép Hana giữ nguyên, Rep và Network giảm, nơi đã đuổi sẽ không mời lại trong 12 năm.
* **Section 6 đến 1 (chỉ Association):** lương năm theo Section, thăng khi tín nhiệm đủ cao và bậc Fixer đủ (Section 2 cần Grade 4 trở lên, Section 1 cần Grade 3 trở lên). Section 1 mở đường tới ghế Director (có sự kiện riêng).
* **Mỗi nơi một thử thách lòng trung thành** (`aff_conflict_*`, 10 sự kiện, gieo thành sợi nhân quả 4 đến 6 năm sau khi vào): tuân lệnh, kín đáo không làm theo, hoặc bỏ đi. Bỏ đi biến bạn thành Defector, mất Rep và Network, và nơi cũ gửi người tìm đến sau 3 năm. Từ Office bỏ đi cũng vậy.
* **Dìu dắt lứa trẻ:** từ Grade 5 trở lên, 32 tuổi trở lên, mỗi nơi (hoặc tự do) có thể giao hoặc nhận một Fixer trẻ (`aff_mentee_assoc`, `aff_mentee_free`). Người trẻ có tiến độ theo năm, một lần gặp việc quá tầm (`aff_mentee_crisis`), rồi hoặc tốt nghiệp (cộng Rep, Network, tín nhiệm), hoặc bỏ đi, hoặc chết nếu bạn để họ tự đối mặt. Tối đa hai người mỗi đời.
* **Tự lập Office:** `aff_office_hire` (nhận thêm người, Office có thu nhập nhỏ), `aff_office_pressure` (một Association đòi phí bảo trợ: trả, từ chối, hoặc gia nhập Zwei mà vẫn giữ Office). Rời Association thì quay lại làm chủ Office nếu có.
* **Bài thi Hana theo huy hiệu:** nơi bạn thuộc về có biến thể bài thi riêng (Seven, Zwei, Shi, Tres, Cinq, Öufi, Dieci, Devyat', Molar), và nó được chọn với xác suất 70% khi tới kỳ thi cùng bậc.
* **Ghi rõ phần phóng tác:** wiki không nói về tín nhiệm, cảnh cáo, bị đuổi, dìu dắt hay Office của Fixer; các nội dung đó (kể cả mức lương và tên Office Yun's, Molar) là cách game dựng quanh khung canon. Khung canon dùng: Hana chấm bậc và cấp phép; Request xếp loại theo Association; associate không tiếp khách trực tiếp, phải nhận mọi việc được giao; mỗi Association có Section 1 đến 6 do Director đứng đầu.
* **Test và lint:** `tests/test_affiliation.mjs` (mời, vào, ba lối, tín nhiệm, cảnh cáo và bị cắt, Section, Defector, Director, dìu dắt, Office), lint story/voice kiểm cả kho Request của Association. Mô phỏng 200 đời: khoảng 55% Fixer vào một Association hoặc Office; tiến độ tới Grade 5 trước 40 tuổi không đổi (khoảng 40%).

### Đợt 30 (23/10/2026): Trượt bài thăng cấp không còn kéo cả đời đi xuống

* **Vấn đề do người chơi báo:** Fixer Grade 2 trượt bài lên Grade 1 thì các lần sau càng khó, Grade 1 và Color gần như xa vời. Mô phỏng 150 Fixer Grade 2 (36 tuổi, Merit 170, Rep 86, bot ngẫu nhiên) cho thấy xác suất mỗi lần chỉ giảm nhẹ (0,42 xuống 0,36). Cái kéo người ta xuống là phí thất bại cộng dồn: mỗi lần trượt tốn 19 HP và 33 Ahn ở bậc cao, nên ở lần thử thứ 4 trung bình còn 32 HP và 13 Ahn. Ngoài ra Merit sau khi lên Grade 1 chỉ còn khoảng 217 trong khi Color cần 300, và ở bậc đó Merit chỉ tăng khoảng 5 mỗi năm.
* **Phí thất bại có trần:** HP mất 3 cộng 1,5 mỗi bậc khó (Grade 1: 15), Ahn mất 2 cộng 1,5 mỗi bậc khó (Grade 1: 14, trước là 33). Sanity giữ nguyên.
* **Lần trượt được ghi vào hồ sơ:** mỗi lần trượt cộng một ít Merit (ít nhất 2, bằng số bậc khó) và cộng 4 điểm phần trăm cho lần sau ở cùng bậc, tối đa 12. Hana nâng bậc theo các Request ghi trong báo cáo, nên một lần thử dang dở vẫn là một dòng trong báo cáo. Bộ đếm lưu ở `fixerExamFailures`, theo từng bậc đích.
* **Phần Merit sống sót sau khi lên hạng** tăng từ 25% lên 45% cho Grade 2 và Grade 1. Phần Merit của Fixer Grade 2 trở lên ở mỗi hợp đồng tăng 25%, vì ở bậc đó ít Request đủ tầm.
* **Đo lại cùng cấu hình:** lần thử thứ 4 còn 40 HP và 40 Ahn (trước 32 và 13), xác suất mỗi lần tăng dần từ 0,43 lên 0,51 thay vì giảm; số Fixer lên Grade 1 gần như giữ nguyên (109/150, trước 111); số Fixer đạt Color tăng từ 28 lên 43 trên 150, trung vị 5 năm từ Grade 1 lên Color. Đây là cấu hình khởi đầu mạnh, không phải tỉ lệ toàn bộ người chơi.
* Cập nhật `test_fixer_promotion_retry.mjs` theo phí mới và thêm kiểm tra: bộ đếm trượt, trần của phần thưởng thử lại, trần của phí.

### Đợt 29 (23/10/2026): Thức tỉnh E.G.O khó hơn, và E.G.O đem lại lợi ích thật

* **Nguồn lore đã tra trước khi viết.** [Limbus Company wiki, trang E.G.O](https://limbuscompany.wiki.gg/wiki/E.G.O): E.G.O chia hai loại, Abnormality E.G.O (vỏ mượn, trả giá bằng Corrosion) và Effloresced E.G.O (nở ra từ ý chí của chính người cầm, Kali là ca đầu tiên); bản thành hình dở là Volatile E.G.O, không ổn định và không chống được Distortion; E.G.O hoàn chỉnh đến từ việc từ chối Carmen, còn Distortion đến từ việc đồng ý. [Library of Ruina wiki, trang Fixer](https://libraryofruina.wiki.gg/wiki/Fixer): Hana chấm Grade 9 đến 1 theo các Request ghi trong báo cáo, Grade 1 là nơi Color được chọn. [Limbus Company wiki, trang Association](https://limbuscompany.wiki.gg/wiki/Association): chuyên môn của Zwei, Öufi, Liu, Cinq, Seven, Dieci mà các bài test dùng làm người chấm. [Library of Ruina wiki, trang Distortion](https://libraryofruina.wiki.gg/wiki/Distortion). Wiki không có hạng bậc của năm Finger nên các bài của Finger và Wing là phóng tác, ghi rõ ở đây.
* **Khó hơn.** Cửa sổ gặp Carmen mở ở Resonance 74 (trước 70), hoặc 62 kèm sẹo và Sanity thấp (trước 58). Xác suất được mời mỗi năm 16%, 28%, 40% (trước 25%, 40%, 55%). Cơ hội thức tỉnh phụ thuộc nhiều hơn vào điều giữ người ta đứng vững: Sanity (từ 0,7 khi dưới 25 đến 1,3 khi từ 55), Resonance (đến 1,5), số sẹo, và một người thân gắn bó từ 60 trở lên còn sống (neo, 1,15). Sanity dưới 30 làm tăng nguy cơ rơi vào Distortion. Trọng số gốc của hai lựa chọn và bài thử thứ hai giảm (lựa chọn đầu 40 thức tỉnh, 38 Volatile, 22 Distortion). Phần hồi máu và Sanity khi thức tỉnh thành công giảm gần một nửa.
* **Kết quả đo** (`balance_sim.mjs 300 focused`, người chơi nhắm thẳng tới E.G.O): trước 34,7% số đời có E.G.O (39,0% trong số Fixer), tuổi thức tỉnh trung bình 41,7, Distortion 3,3%. Sau khi chỉnh: 27,0% (30,3% trong số Fixer), tuổi thức tỉnh trung bình 44,7, Distortion 4,7%; tỉ lệ Color không đổi (22,0%, tuổi trung bình 60,7). Với một nhân vật điển hình (Resonance 72, Sanity 45, một sẹo, không người thân) cơ hội thức tỉnh ở lần đầu khoảng một nửa, người chuẩn bị tốt khoảng 60 đến 63%, người Sanity 20 khoảng 29% kèm 30% rơi vào Distortion. Không ai chắc chắn, và không ai mất hẳn đường.
* **Lợi ích của E.G.O.** Người có E.G.O hoàn chỉnh được cộng 5 điểm phần trăm thành công cho bài thăng cấp của Hana, bài thăng bậc của Finger và Wing, và các hợp đồng; người có Volatile E.G.O được 1,5. Các kết quả có Merit, không dẫn tới chết hay Distortion, có trọng số cao hơn khoảng 7,5%. Hệ số cũ 1,35 cho mọi kết quả không chết của người thức tỉnh hạ xuống 1,12 để lợi ích này nhỏ.
* **Fixer Grade 1 có E.G.O.** Hana xét Color sớm hơn: Merit 240 (thay 300), Rep 88 (thay 95), tuổi 28 (thay 30). Cùng một bài khảo thí, vẫn có thể trượt. Hằng số chung (300 và 95) giữ nguyên để khớp backend.
* **Bài tái định hạng đặc biệt (`eventsEgoLeap.js`, 19 sự kiện).** Người có E.G.O, đã đủ điều kiện cho bậc kế tiếp, được mời một bài nhảy hai bậc, một lần trong đời. Fixer đang ở Grade 3 đến Grade 9 (Grade 3 lên 1, Grade 9 lên 7); từ Grade 2 bài thường đã dẫn thẳng lên Grade 1. Mỗi bài do một Association chấm theo chuyên môn của họ: Zwei (9 lên 7), Öufi (8 lên 6), Liu (7 lên 5), Cinq (6 lên 4), Seven (5 lên 3), Dieci (4 lên 2), Hana với một Request cấp Star of the City (3 lên 1). Năm Finger và Wing có bài riêng cho bậc 0 lên 2 và 1 lên 3. Xác suất thành công tính theo bậc đích nên thấp hơn bài thường mà nó bỏ qua; hai cách làm (hiện vũ khí ngay, hay giữ kín) đổi xác suất và phần thưởng; thất bại tốn máu, tiền và khóa ba năm. Nhảy xong, Merit được nâng lên đúng ngưỡng của bậc mới, như mọi lần thăng cấp. Weaver mời bài này trước bài thường với xác suất 40% mỗi năm.
* Sửa kiểm tra tổng thể: audit "nhảy Grade" cho phép đúng một lần nhảy hai bậc có cờ `ego_leap_done`. Các bài hồi quy dùng Resonance 60 đến 70 được dời lên ngưỡng mới. Thêm `tests/test_ego_leap.mjs` vào `npm test`.
* Mô phỏng 60 đến 80 cuộc đời mỗi tuyến, ép có E.G.O từ năm 20 tuổi, bot ngẫu nhiên: bài tái định hạng được chấp nhận 68% (Fixer), 56% (Thumb), 41% (Pinky), 80% (Wing), phần còn lại trượt hoặc hoãn; 0 lỗi.

### Đợt 28 (23/10/2026): Tuổi bước vào nghề dao động từ 15 đến 20

* `careerAge` được tung lúc sinh theo seed (`src/engine/careerAge.js`): 15 (14%), 16 (18%), 17 (20%), 18 (22%), 19 (14%), 20 (12%). Con của Nest và Feather có xu hướng đi làm muộn hơn, trẻ Outskirts và mồ côi sớm hơn. Save cũ không có trường này nên giữ 18.
* Ngã rẽ nghề (`ad_career_crossroad_18`, `ad_outskirts_crossroad_18`) xuất hiện đúng tuổi của nhân vật. Giữ nguyên id để không vỡ save, chỉ đổi khoảng tuổi sang 15 đến 99 và bỏ chữ "mười tám" trong văn bản.
* Mọi sự kiện, sự kiện nhỏ và dòng thường ngày viết cho người trưởng thành (tuổi tối thiểu từ 18 trở lên) dịch xuống theo số năm đi làm sớm, để người vào nghề lúc 15 tuổi không phải chờ ba năm với một kho nội dung trống. Người đi làm muộn không bị lùi thêm. Chi phí sống, hao mòn nghề, tiền chữa trị và Merit cuối năm tính từ tuổi đi làm.
* Hợp đồng đầu tiên đến sau tuổi đi làm một năm (trước đây cố định 19).
* Khi đồng bộ với BE, kế hoạch của server vẫn ép ngã rẽ lúc 18, nên FE giữ lại ngã rẽ đã xếp cho những ai đến tuổi sớm hơn. BE không cần sửa.
* Mô phỏng 150 cuộc đời: 0 lỗi, 132/134 người nhận nghề đúng tuổi của mình, 127 năm đi làm dưới 18 tuổi mà chỉ 3 năm không có việc gì xảy ra. Kiểm tra qua BE trên Render: 30/30 ngã rẽ còn nguyên sau đồng bộ.

### Đợt 27 (23/10/2026): Hợp đồng cho mọi nghề, không chỉ Fixer

* Hệ Request của Fixer (bậc đe dọa, tỉ lệ thành công, chết) được tổng quát hóa. `contractRouteOf` trả về tuyến của nhân vật: fixer, thumb, index, middle, ring, pinky, wing. `generateFixerContract` và `resolveFixerContract` chạy chung một công thức sức mạnh, quy đổi hạng của nghề sang Grade tương đương (rank 0 ≈ Grade 7, rank 3 ≈ Grade 1). Tên hàm giữ nguyên để không phải sửa chỗ gọi.
* 108 template mới, mỗi nghề 18 cái, 3 cái mỗi bậc trong 6 bậc, nằm ở `careerContracts*.js`. Bậc gọi theo từ vựng của nghề: Middle đòi nợ theo sức mạnh của người trong Book of Vengeance (con nợ thường, Fixer Grade 9, Grade 6 đến 7, Grade 4 đến 5, Grade 2 đến 3, Grade 1 hoặc Color); Thumb thu tô từ khoản vặt đến Color; Index nhận Prescript từ mảnh giấy đến chỉ thị của Weaver; Ring đi tìm nguyên liệu từ chợ đến tác phẩm của một Star; Pinky giải quyết lời thề từ kẻ thất hứa đến Star của thanh kiếm; Wing nhận chỉ thị nội bộ;.
* Ba cách tiếp cận (cẩn thận, liều, mua tin) có nhãn riêng theo nghề. Mỗi nghề có hệ quả phụ: Thumb và Pinky tăng Heat, Index tổn Sanity, Middle đổi Network, Ring đổi Sanity, Wing đổi Network. Template tránh lặp lại sáu hợp đồng gần nhất.
* 7 sự kiện nhỏ gọi lại ở `lifeMinorsContracts.js`: hợp đồng xong có thể gieo ký ức và một sợi chỉ hẹn giờ (người thuê nhà bạn chuộc súng, Color nhớ tên, người nhà của tên trong sổ, Prescript quay lại, hồ sơ niêm phong trả về, tro của Distortion, con của Capo).
* Sửa lỗi Merit của Finger quá thấp: toàn bộ sự kiện Finger chỉ có 14 chỗ cộng Merit (trung bình khoảng 4), Fixer có 71 chỗ (trung bình khoảng 32). Sự kiện mission không tự ghi Merit nay cộng mặc định 4 cộng 3 mỗi rank.
* Mô phỏng 60 cuộc đời mỗi nghề, chọn ngẫu nhiên: số hợp đồng mỗi năm là 0,36 đến 0,53 (Fixer 0,52). Lint kiểm tra thêm id trùng, bậc và đủ chữ của template mới.

### Đợt 26 (23/10/2026): Lựa chọn có chuẩn bị, biến cố giữa đời và cơ hội gặp Carmen

* Carmen không còn được chọn chắc chắn chỉ vì đủ ngưỡng. `rollEgoEncounter` rút một lần mỗi năm với xác suất 25%, 40%, 55% qua ba năm của cửa sổ. Kết quả lưu bằng `egoEncounterRollAge` và `egoEncounterOffered` trên nhân vật, dùng chung giữa kế hoạch năm và Weaver. Gọi bộ chọn nhiều lần trong năm không rút lại. Cửa sổ đang mở không bị gia hạn liên tục khiến xác suất kẹt ở năm đầu; sau khi hết hạn, nhân vật còn đủ ngưỡng có thể mở cửa sổ mới. Nhánh SP ≤12 có cơ hội cơ sở 25%; không tự nhận E.G.O. Lựa chọn từ chối, E.G.O chưa hoàn chỉnh và Distortion tiếp tục tồn tại. Mẫu 500 cửa sổ ba năm với điều kiện cố định có 376 lần gặp; đây không phải tỷ lệ thức tỉnh trên toàn bộ cuộc đời.
* Thêm `need.item`, `useItem`, `favorCost` vào điều kiện lựa chọn. Trang bị mở nhánh nhưng không bị tiêu hao; vật phẩm dùng một lần bị xóa đúng một bản sao khi xác nhận. Ân huệ yêu cầu NPC còn hoạt động, đủ bond và trừ bond khi chọn; nhân vật chết, mất tích hoặc đoạn tuyệt không được giúp. Resolver kiểm tra lại điều kiện, giữ nguyên state nguồn. Nút lựa chọn dùng cùng hàm điều kiện, có nhãn vật phẩm/cái giá và khóa khi thiếu; phím số đi qua cùng chốt kiểm tra.
* `eventsPreparedChoices.js` bổ sung 12 sự kiện: hộ tống qua phong tỏa và đòi khoản tiền giữ lại (Fixer); thu hồi hàng và đối chiếu kiểm toán sau hai năm (Wing); chuyến đạn và sổ niêm (Thumb); Chỉ Lệnh vượt rào (Index); bữa ăn và thông tin ghi vào sổ (Middle); kiện triển lãm (Ring); giữ lời hẹn ở đường rút (Pinky); quan sát và thu hồi hồ sơ tại chi nhánh L Corp bỏ hoang. Các mở đầu nghề nghiệp giới hạn tuổi 25–40, có khóa nghề/Finger; hậu quả đến sau 1–2 năm và kiểm tra lại ngữ cảnh. Những sự kiện này vào pool có trọng số, không bắt buộc mọi cuộc đời phải trải qua. Đây là biến cố cục bộ được phóng tác, không thay đổi lịch sử canon toàn The City.
* Chuỗi dị thể dùng sinh vật chưa định danh, lấy thông tin quan sát làm chìa khóa (`AbnoCycleNotes`), có rút lui và nhánh đánh cược. Không gán quy tắc tự sáng tác cho một Abnormality canon có tên. Hai lựa chọn dùng áo giáp/katana và một lựa chọn dùng Enkephalin cho thấy chuẩn bị tác động trực tiếp tới tình huống; phương án an toàn vẫn có chi phí hoặc hậu quả.
* Âm thanh: hệ ambient và SFX đã có nên không tạo thêm vòng âm trùng. Sửa callback hồi âm lượng sau ducking để đọc trạng thái mute/volume hiện tại, tránh âm nền bật lại sau khi người chơi vừa tắt. Có kiểm thử dùng bộ gain giả; chưa thực hiện nghe thử trên điện thoại trong đợt này.
* Nguồn tham khảo: [Failbetter — Choice, Complicity and Consequence](https://www.failbettergames.com/news/choice-complicity-and-consequence) cho lựa chọn dùng ân huệ và hậu quả đến sau; [giới thiệu Lobotomy Corporation của Project Moon](https://store.steampowered.com/app/568220/Lobotomy_Corporation__Monster_Management_Simulation/) cho vai trò quan sát, thông tin và kiểm soát nguy hiểm. Chỉ áp dụng nguyên tắc thiết kế; câu chữ và chuỗi nhiệm vụ được viết mới. Skill áp dụng: dialogue-systems, audio-design, game-ui-ux, antislop core/copywriting/human.
* Kiểm thử: bổ sung `tests/test_prepared_choices.mjs` vào `npm test`. Kiểm tra rút một lần/năm trên 500 seed, thiếu thuốc không giải quyết event, tiêu hao đúng, không sửa state nguồn, NPC chết không giúp, trừ bond, callback tới đúng năm, khóa từng Finger và mute trong lúc ducking. Hai bài hồi quy cũ được đổi sang RNG thắng cố định vì trước đây giả định Carmen luôn xuất hiện khi đủ điều kiện. `npm test` và build production đạt; audit vẫn giới hạn 500 khoảnh khắc. Chưa đo lại tỷ lệ Color/E.G.O của 500 cuộc đời sau đợt này.

### Đợt 25 (23/10/2026): Dungeon có rủi ro thật, giao diện sáng/tối và mobile, đánh bóng chữ, nối nốt nhánh Color sớm

* **Dungeon (`dungeonEngine.js`, `dungeonText.js`, `eventsDungeonGates.js`)**: sửa lỗi lối vào dungeon vừa trả thưởng vừa kể kết quả (thưởng hai lần); lối vào nay chỉ dựng cảnh, lint chặn tái phạm. Kiểm tra thất bại có lời kể riêng, sát thương cao hơn và mất nửa chiến lợi phẩm; Strain có bậc (Vững, Run tay, Hoảng loạn, Sắp gãy), chạm trần thì gục nhưng không chết; Nghỉ thở tốn Ahn. Thưởng giảm theo hệ số `DUNGEON_BALANCE`. Thêm 12 sự kiện cổng (mỗi dungeon ít nhất 2 lối vào, có lựa chọn mua thêm tiếp tế). Khoảng 20% số đời gặp một dungeon. Đo bằng `node dungeon_sim.mjs`: đi cẩn thận gần 0% chết, lao vào khoảng 13 đến 22%.
* **Giao diện**: DungeonDock viết lại (thanh chiến thuật dính đáy, đồng hồ giả bỏ vòng lặp 65ms), thẻ kết quả hiện thay đổi cả chuyến đi; sửa chế độ sáng (dock, HUD, chip chỉ số đọc được), toast thành tựu không che lựa chọn trên mobile, tiêu đề trang lưu trữ trên mobile, cỡ chữ 3 mức, rung nhẹ trên cảm ứng, hiệu ứng rung màn hình chỉ chạy khi có va chạm và tôn trọng chế độ giảm chuyển động.
* **Chữ (`tools/lint/voice_lint.mjs`, `tools/lint/slop_scan.mjs`)**: 0 vi phạm giọng văn (gạch dài, chấm than ngoài thoại, số chỉ số trong câu, thuật ngữ dịch); viết lại khoảng 40 sự kiện và toàn bộ chữ dungeon; sửa `{age}` không được thay thế; nối 11 sự kiện hệ quả mồ côi và 2 sự kiện thơ ấu nằm nhầm mảng.
* **Nhánh Color sớm**: bản trước có sự kiện Seven nhưng không gì mời nó. Nay Weaver mời Fixer 28 đến 38 tuổi Grade 2 đến 6 với xác suất 22% mỗi lần chọn sự kiện lớn. Đo (800 đời ép Fixer, bot ngẫu nhiên): 13% được mời, 1% đạt hồ sơ xuất sắc; chưa có ca Color trước 45 vì bot ngẫu nhiên không biết thi thăng hạng. Cần đo lại bằng người chơi thật.

### Đợt 24 (23/10/2026): Giữ tiến trình Resonance, cơ hội Color sớm và tái xét khảo thí

* `economyModel.js`: hao hụt Resonance giảm từ 8% phần dư (tối đa 3/năm, tối thiểu 1) xuống 2% phần dư, tối đa 1/năm và có thể bằng 0. Năm có hiệu ứng tăng Resonance được miễn hao hụt nền. Mốc Resonance cao nhất từng đạt bổ sung sàn tự nhiên: mỗi 20 điểm đỉnh giữ thêm 5 điểm sàn, kết hợp với sàn từ sẹo bằng giá trị cao hơn. Sàn chỉ hạn chế hao hụt nền, không ngăn lựa chọn hoặc hậu quả chủ động trừ Resonance.
* `awakeningProgress.js`: lưu `resonancePeak`, `lastResonanceGainAge`, `egoOpportunityUntil` bằng trường số trên nhân vật. Khi đạt ngưỡng ổn định của Carmen (70 Resonance, hoặc 58 kèm điều kiện sẹo/SP), giữ cơ hội tới hết tuổi hiện tại +2. Mỗi lần tiếp tục đủ ngưỡng sẽ gia hạn. E.G.O/Distortion và sự kiện đã trải qua vẫn chặn việc gọi lại. Đây là cửa sổ xuất hiện, không phải phần thưởng thức tỉnh chắc chắn. Các nguồn tăng điểm ở major, daily/minor, dungeon và biến cố đặc biệt đều ghi nhận tiến trình.
* Chuỗi Seven gồm `fixer_seven_unclaimed_dossier` và `fixer_seven_sealed_deposition`: cơ hội mở đầu 1,8% mỗi kế hoạch năm hợp lệ, tuổi 28–38, Fixer Grade 2–6, chưa nhận hồ sơ và chưa Distort. Sự kiện mở đầu chỉ vào từ kế hoạch năm, không lọt vào pool ngẫu nhiên thường. Hai nhiệm vụ có xác suất thành công cơ sở 65%, lựa chọn rút lui, tổn thất sức khỏe/tinh thần và hậu quả tài chính. Nhiệm vụ sau được hẹn sau một năm, cần HP ≥45 và SP ≥30 để nhận rủi ro. Công trạng thực nhận khi thành công lần lượt 60 và 160 sau hệ số nghề 0,4.
* Hoàn tất chuỗi nhận `SevenExceptionalRecord`: khi đỗ kỳ thăng Grade, giữ 85% công trạng dư thay cho 25% và bỏ chặn phần dư dưới ngưỡng cấp tiếp theo. Vẫn phải dự thi từng Grade, vẫn có thể trượt và tử vong. Điều kiện Color giữ nguyên Grade 1, tuổi ≥30, Merit ≥300, Rep ≥95. Chuỗi hiếm tạo cơ hội tăng tốc, không bảo đảm Color trước 45 tuổi.
* Bài thử Color: nhánh Seven tiêu 15 Ahn ở cả hai kết quả; xác suất cơ sở 75% nhận Color, 25% rút lui với thương tích. Không còn nhánh bảo đảm nhận danh hiệu. `lastColorTrialAge` khóa tái xét ba năm, sau đó phải đủ điều kiện hiện tại. Từ chối danh hiệu (`ColorRefused`) ngừng lời mời. Hồ sơ cũ từng trượt mà chưa có trường tuổi khảo thí được phép xét lại; lần thi mới bắt đầu áp dụng thời gian chờ.
* Kế hoạch do server trả về được ghép lại với chuỗi Seven và major cục bộ cần cho cơ hội E.G.O/Color, để không mất các cơ hội chỉ engine client biết. Không đổi các ngưỡng nghề chung ở backend. Các trường tiến trình mới có mặc định an toàn khi thiếu; chúng đi cùng đối tượng nhân vật khi lưu/clone.
* Kiểm thử: `npm test` đạt (gồm audit 500 khoảnh khắc và hồi quy mới), `npm run build` đạt. `scripts/test_awakening_progress.mjs` kiểm tra miễn hao hụt, hết hạn lời gọi, kết quả thắng/trượt Color, phí chính xác, cooldown, từ chối, hồ sơ cũ, khóa route, chuỗi hậu quả và giữ công trạng mà không nhảy Grade. Có thể chạy riêng bằng `npm run test:awakening`.

### Đợt 23 (23/10/2026): Đo tỷ lệ Color Fixer và thức tỉnh E.G.O theo cuộc đời

* Mở rộng `tools/sim/balance_sim.mjs` để ghi tuổi **lần đầu** đạt Color và E.G.O, tỷ lệ có cả hai trong một cuộc đời, cùng năm tuổi, cùng lần giải quyết sự kiện; thêm chính sách `focused` chủ động chọn tuyến Fixer, thử Color và kháng lại lời mời của Carmen. Đây là mô phỏng engine FE theo seed cố định, không phải đo hành vi người chơi thật. Mỗi chính sách chạy 500 cuộc đời hoàn chỉnh; `node --check balance_sim.mjs` và cả ba lần chạy đều thành công. Mẫu số chính là 500 cuộc đời/chính sách, không phải 500 sự kiện hay 500 năm.
* **Chọn ngẫu nhiên** (`node tools/sim/balance_sim.mjs 500 random`): 90/500 từng làm Fixer; 3/90 từng lên Grade 1; 1/500 gặp bài thử Color và 0/500 đạt Color. E.G.O: 42/500 (8,4%), tuổi thức tỉnh trung bình 40,2. Cả hai trong một cuộc đời: 0/500; cùng năm: 0/500. Một lần gặp bài thử không đủ để suy ra tỷ lệ đỗ Color; kết quả 0/500 chỉ cho thấy mốc này rất hiếm với cách chọn ngẫu nhiên.
* **Chủ đích theo đuổi hai mốc** (`node tools/sim/balance_sim.mjs 500 focused`): 444/500 từng làm Fixer; 121/444 từng lên Grade 1; 92/500 gặp bài thử Color và cả 92 đều đạt Color (18,4% cuộc đời; tuổi đạt trung bình 66,1). E.G.O: 46/500 (9,2%; tuổi trung bình 44,8). Cả Color lẫn E.G.O trong cùng cuộc đời: 17/500 (3,4%); lần đầu đạt hai mốc trong cùng năm tuổi: 0/500; cùng một lần giải quyết sự kiện: 0/500. Nhánh phối hợp Seven Association của bài thử Color hiện cho Color chắc chắn khi đủ điều kiện Wealth/Sanity, nên 92/92 là hệ quả của cách chọn, không phải xác suất ngẫu nhiên nội tại của thử thách.
* **Chẩn đoán chính sách chọn lợi ích trước mắt** (`node tools/sim/balance_sim.mjs 500 greedy --fixers`): ép nhân vật chuyển sang Fixer ở tuổi trưởng thành để soi tuyến nghề; 103/500 gặp bài thử nhưng 0 nhận Color, 0 thức tỉnh E.G.O. Bộ chọn tự động ưu tiên lợi ích chỉ số trước mắt, có thể chọn từ chối Color hoặc Carmen. Đây không phải tỷ lệ người chơi thật và chế độ `--fixers` không mô phỏng lựa chọn nghề tự nhiên.
* **Giới hạn và lưu ý logic:** 0/500 cùng năm không chứng minh xác suất bằng 0; cận trên xấp xỉ 0,6% với độ tin cậy 95% cho từng mẫu 500. Color và E.G.O nằm ở hai sự kiện khác nhau, không có outcome gộp cả hai trong một lần giải quyết. Color cần Fixer Grade 1, từ 30 tuổi, Merit ≥300, Rep ≥95; E.G.O không phải điều kiện bắt buộc. Sau khi `hana_color_ascension_trial` được ghi vào `seenEvents`, bộ chọn không gọi lại sự kiện này, dù nhánh trượt có lời kể hoãn phong Color đến khi hồi phục; cần sửa riêng nếu muốn có cơ hội thi lại đúng như lời kể.

### Đợt 22 (23/10/2026): Rà soát BUG-34–40, sửa xác suất hiển thị và phần thưởng lựa chọn

* **BUG-34, pause rồi “Qua mùa” bị khóa:** Code hiện tại đã tách `postChoicePauseMs` khỏi điều kiện khóa nút. `stepYear()` chỉ dừng ở quyết định thực sự đang chờ, rồi xóa thời gian đọc khi bước tiếp. Bổ sung hồi quy hành vi bằng Zustand: đặt nhân vật ở tiến độ 25%, `speed = 0` và còn 3 giây đọc, gọi `stepYear()` đưa đến 50% và đưa `postChoicePauseMs` về 0. Không cần chỉnh lại luồng game.
* **BUG-35, người đứng đầu Finger thiếu việc và cách dùng tiền:** Cây mã hiện tại đã có cơ hội riêng cho Apex ở cả Thumb, Index, Middle, Ring, Pinky; mỗi nhánh có hai major event riêng, lựa chọn thu tiền và chi tiền, cùng cổng `fingerRank = 3`. Bài hồi quy xác nhận 10 event tồn tại, người rank 3 đủ điều kiện và rank 2 không thể nhận. Đây là hệ thống đã có trước Đợt 22; không thêm event trùng lặp.
* **BUG-36, E.G.O Resonance khó chạm cổng:** Cơ chế hiện tại đã giới hạn mức hao mòn hằng năm còn tối đa 3 điểm và mở ngã rẽ Carmen từ khoảng 58–70% tùy sẹo, SP; không buộc E.G.O biến thành Distortion. Bài hồi quy tạo nhân vật trưởng thành có 60% Resonance, SP 36 và sẹo phù hợp, xác nhận sự kiện `ego_carmen_crossroad` được chọn và có lịch trong năm. Không nới ngưỡng thêm trong đợt này.
* **BUG-37, dòng “Khu vực” và “Xuất thân” tràn viền:** Giao diện hiện tại đã chuyển hai mục sang `kv-stack` với tên vùng, gia cảnh, chỉ số khởi đầu và đặc quyền ở các dòng riêng. Bài hồi quy xác nhận cấu trúc đó còn hiện diện. Việc hiển thị đầy đủ đặc quyền đã có từ trước Đợt 22, không thay các bonus gốc.
* **BUG-38, vào nghề Fixer hiện “Đỗ 0%”:** `ChoicePreview` trước đây coi mọi lựa chọn có `setFixerGrade` là bài thi thăng hạng. Nay chỉ hiện tỷ lệ đỗ khi nhân vật đang là Fixer và Grade mục tiêu cao hơn bậc hiện tại theo thứ tự Hana. Lựa chọn đăng ký Grade 9 ở tuổi 18 là bước vào nghề chắc chắn, nên không hiện “Đỗ 0% · Trượt 100%”; các kỳ thi từ Grade 9 lên 8 vẫn giữ tỷ lệ. Predicate dùng chung `isFixerPromotionChoice` có kiểm thử riêng.
* **BUG-39, “Bốn đồng Ahn cứu con” trả sai:** Lựa chọn nhận việc không cộng sẵn 1 Ahn. Nhánh cứu được cậu bé nhận đúng 4 Ahn tiền công; nhánh đến muộn hoàn tiền, số dư cuối không đổi. `resolveMinor` hỗ trợ `exactFx` cho hiệu ứng cần giữ số tuyệt đối khi các chỉ số khác vẫn được phép biến thiên theo RNG. Đã thử cả hai nhánh với số dư khởi đầu 20 Ahn: kết quả lần lượt 24 và 20.
* **BUG-40, đại tu Workshop giá 22 Ahn nhưng lợi ích nhỏ:** Gói đại tu nay cho SP khoảng 8 và Quan hệ khoảng 12, bên cạnh Danh tiếng khoảng 6; RNG vẫn có thể làm các mức trên dao động và Danh tiếng vẫn giảm dần khi đã cao. Câu kết quả chỉ nói về thiết bị được sửa và chủ xưởng giới thiệu khách, không biến bảo dưỡng giáp thành chữa lành HP. Chi phí vẫn trừ đúng 22 Ahn, giữ vị trí của gói cao cấp so với gói tra dầu 6 Ahn. Hồi quy xác nhận ở nhân vật Rep 80 vẫn nhận SP và Quan hệ đáng kể mà HP không đổi.
* **Kiểm định và phạm vi:** `npm test` đạt sau thay đổi, gồm lint truyện 0 lỗi/0 cảnh báo, các suite về nghề nghiệp, kinh tế, dungeon và audit 500 khoảnh khắc; `npm run build` đạt. `run_million_audit.mjs 500` kiểm tra engine chứ không phải 500 cuộc đời hoặc chụp ảnh UI. Workspace đã có nhiều thay đổi chưa commit từ các đợt trước; đợt này không hoàn nguyên hay đẩy chúng lên remote.


### Đợt 21 (23/10/2026): Làm rõ luồng khai sinh, biên niên, chỉ số và đồng hồ sự kiện nhanh

* **Vòng quay trước popup khi mở kiếp mới trên điện thoại:** `BirthSetupPanel.jsx` đã có logic quay đến District được chọn trước khi bật `CityLoadingOverlay`, nhưng `.opening-atlas` bị ẩn ở viewport dưới 820 px. Khi nhấn “Bước vào The City”, giao diện nay đưa chính vòng quay đó lên lớp toàn màn hình, cho nó hoàn tất rồi mới mở thẻ tải hồ sơ. Trạng thái `spinning` khóa nhấn khởi đầu lặp trong lúc chuyển cảnh và được giải phóng khi tải xong. Trên desktop, vòng quay vẫn nằm trong bố cục trang chủ.
* **Xem lại sự kiện không kể lại cùng một đoạn:** `LiveStageFeed.jsx` nhận biết log sự kiện nhanh đã lưu nguyên đề bài ở đầu `vi/en`. Thẻ biên niên tách phần tình huống và phần kết quả; mục “Xem lại sự kiện và lựa chọn” chỉ liệt kê các phương án khi đề bài đã hiện ngay trên thẻ. Với sự kiện lớn, nếu thẻ chỉ hiện kết quả, phần xem lại vẫn giữ đề bài. Log và save cũ không bị viết lại. Chế độ song ngữ tiếp tục hiện nội dung tiếng Anh đầy đủ.
* **Màu kết quả sau lựa chọn:** Phần hậu quả trên thẻ biên niên có màu xanh lục lam và vạch trái, tách khỏi phần tình huống. Màu chữ được đặt riêng cho nền sáng (`#176a68` trên trắng, 6.37:1) và nền tối (`#9fd2cf` trên `#14171d`, 10.76:1); cả hai vượt ngưỡng tương phản 4.5:1 cho chữ thường. Quy tắc áp dụng ở web và mobile.
* **HUD điện thoại không cần mở hồ sơ để đọc chỉ số chính:** Hàng đầu giữ HP, SP, Ahn. Một hàng gọn ngay dưới hiện Quan hệ, Rep, Heat, cộng hưởng E.G.O và Taboo, kể cả khi áp lực bằng 0. Chỉ số nguy hiểm có màu cảnh báo khi Heat từ 65 hoặc Taboo từ 2. Hồ sơ trượt vẫn giữ bảng chi tiết, sự nghiệp và quan hệ. Đã kiểm tra ở 390 px và 320 px: HUD không gây tràn ngang; nhãn Rep được rút ngắn để đọc được trên máy hẹp.
* **Thanh 15 giây theo đúng đồng hồ game:** Thanh và số giây hiện lấy `minorRemainingMs` từ Zustand, cùng nguồn mà `tick()` dùng để hết hạn sự kiện. Bỏ animation CSS chạy độc lập vốn có thể bị tắt bởi thiết lập giảm chuyển động hoặc lệch khi game tạm dừng. Khi pause, cả thời gian game lẫn thanh cùng đứng; khi tiếp tục, thanh giảm từ thời gian còn lại. Đây là thay đổi hiển thị, không đổi luật chọn lựa hoặc thời hạn 15 giây.
* **Kiểm định Đợt 21:** `npm test` đạt, bao gồm lint nội dung, hồi quy sự kiện/cân bằng và audit 500 khoảnh khắc; `npm run build` đạt. Kiểm tra trình duyệt thật ở 390 px xác nhận trước khi bấm khởi đầu atlas bị ẩn, sau khi bấm vòng quay nằm ở `position: fixed` và màn tải chưa xuất hiện. Kiểm tra 320 px xác nhận `document.scrollWidth` và HUD đều bằng 320 px. Đợt này chưa có kiểm thử tự động chụp ảnh cho toàn bộ biến thể ngôn ngữ và cỡ chữ.


### Đợt 20 (23/10/2026): Mở rộng kho sự kiện đạt 1.002 mục, chiều sâu tương tác NPC (Phản bội, Trợ lực, Phân tầng Bond) & Cân bằng thăng tiến Syndicate Apex

* **Mở rộng kho sự kiện vượt mốc 1.000 sự kiện (Tổng: 1.002 mục):**
  * Bổ sung `src/data/eventsNpcAndWorldExpansion.js` và `src/data/lifeMinorsAndDailiesExpansion.js`, chia đều cho các nhóm nội dung:
    * **Major Story Events:** Tăng lên **319 sự kiện** (+48 sự kiện lớn mới về xung đột NPC, liên minh huynh đệ, rạn nứt sư đồ, thiếu niên các quận, 12 Hiệp hội Fixer, 5 Ngón Tay Syndicate, sự cố rò rỉ Singularity của Wing, lò rèn Workshop và Distortion).
    * **Causal Consequence Events:** Tăng lên **44 sự kiện** (+8 sự kiện quả báo / ân nghĩa: cựu đồng đội phục kích trả thù, quyết đấu ân sư, thanh tra bằng sáng chế Wing, lệnh truy nã giả mạo, con dấu xưởng rèn giả...).
    * **Minor Choice Events:** Tăng lên **256 sự kiện** (+52 sự kiện vi mô 15s về chia sẻ đạn dược, phân chia thù lao, mài giáp, chăm sóc con cái, chia sẻ quả táo hiếm hoi, ván súc sắc thùng phuy...).
    * **Daily Seasonal Lines:** Tăng lên **347 dòng thường nhật** (+52 câu thoại về không khí các quận, tiếng mài dao Backstreets, còi giới nghiêm, sáp ong bao kiếm, khói sương lưu huỳnh...).
    * **Fixer Contract Templates:** Tăng lên **36 mẫu hợp đồng** (+12 hợp đồng Tier 1 đến Tier 5: đàn áp Abnormality, Night in the Backstreets, dọn dẹp tàu WARP, săn Thủy Quái Đại Hồ...).
  * Đồng bộ hóa danh mục qua `node tools/export_all_events.mjs` đạt đúng 1.002 mục.

* **Cơ chế Chiều sâu NPC, Hệ thống Phân tầng Quan hệ & Phản bội / Trợ lực (Deep Emergent NPC Mechanics):**
  * Phân tầng quan hệ dựa trên chỉ số gắn kết `bond`:
    * `Sworn` ($\ge 80$): Tương trợ tuyệt đối, tăng +8 đến +15 Contract Power và +5% đến +9% tỉ lệ sống sót trong Dungeon.
    * `Trusted` ($52 - 79$): Hợp tác ăn ý, tăng +3 đến +7 Contract Power.
    * `Steady` ($30 - 51$): Quan hệ đối tác chuyên nghiệp bình thường.
    * `Strained` ($18 - 29$): Bất đồng nội bộ, giảm -3 đến -7 Contract Power, giảm nhẹ tỉ lệ Dungeon.
    * `Hostile` ($< 18$): Bất hòa gay gắt, trừ -8 đến -15 Contract Power, giảm -5% đến -9% Dungeon, phát sinh nguy cơ phản bội hoặc xô xát khi làm nhiệm vụ nguy hiểm.
    * `Betrayer` (Kẻ phản bội): Khi đồng đội có `bond` quá thấp mà phải gánh vác hợp đồng khắc nghiệt, họ có tỉ lệ phản bội giữa chừng, cướp thù lao hoặc bán đứng người chơi, chuyển thành `nemesis` (cựu thù) và lên lịch phục kích trả thù `csq_npc_betrayer_ambush`.
  * Cơ chế Micro-Drama tự chủ hàng năm (`simulateNpcAutonomousLife` trong `narrativeArcEngine.js`):
    * Bạn thuở nhỏ: Khi `bond` thấp có thể xảy ra ẩu đả ngõ hẻm hoặc tung tin đồn xấu làm giảm Rep; khi `bond` cao gửi quà chúc mừng hoặc cần trợ giúp y tế.
    * Đối tác chiến đấu (Partner): Rạn nứt giấu đạn dược hoặc gắn kết mài giáp chuẩn bị mùa hợp đồng.
    * Sư phụ (Mentor): Khiển trách vì sự tàn nhẫn hoặc truyền thụ bí quyết đối phó sát thủ.
    * Bạn đời (Spouse): Căn hộ lạnh lẽo khóa cửa khi xa cách hoặc bữa tối ấm cúng nến thơm hồi phục Sanity.
    * Cựu thù (Nemesis): Khắc vết dao đe dọa trước cửa, rình rập báo thù.
  * Tích hợp UI trực quan:
    * Thẻ hồ sơ `CharacterDossierCard.jsx`: Hiển thị thanh tiến trình `bond` có màu phân tầng, huy hiệu quan hệ và trạng thái `Phản bội` (Betrayer).
    * Giao diện nhận hợp đồng `LiveStageFeed.jsx`: Hiển thị cảnh báo trực quan `Companion Friction` hoặc `Companion Synergy` kèm hiệu ứng cộng/trừ Power cụ thể.

* **Cân bằng Chuẩn Xác Chức vị Đỉnh cao Syndicate (Rank 3 Apex):**
  * Sửa triệt để 2 sự kiện cũ nhảy cóc rank trực tiếp (`syn_ring_maestro_gallery` và `pinky_star_blade_oath`), đưa về quản lý qua `FINGER_LADDERS`.
  * Nâng ngưỡng sát hạch Rank 3 (Apex): `Merit 155, Rep 84, Age >= 35, Tenure >= 5` năm đồng bộ trên cả Frontend và Backend .NET (`DirectorEngineService.cs`).
  * Khống chế thặng dư Merit khi thăng bậc Syndicate (Merit dư chỉ bảo lưu tối đa 30% và bị chặn thấp hơn mốc rank kế tiếp 15 điểm).
  * Kết quả mô phỏng 1.000 cuộc đời thực tế đạt tỉ lệ thăng chức Underboss / Apex là **9.1%**, cân đối hoàn hảo với các nhánh Color Fixer và Wing Senior Executive.

* **Kiểm định toàn vẹn & Triển khai:**
  * `npm test` và `dotnet build ../PM_BE` đạt 100% không cảnh báo, không lỗi.
  * Đã commit và push toàn bộ lên remote GitHub `origin/main` (commit `5581fc8`).

### Đợt 19 (22/10/2026): Sửa BUG-30–33, mở đường kiếm Merit cho Wing và lưu nội dung sự kiện để xem lại

* **BUG-30, thẻ “sự kiện” không xem lại được đề bài và các phương án:** `resolveEventChoice` và `resolveMinor` nay lưu `review` trong log của lựa chọn: văn bản Việt/Anh lúc sự kiện xảy ra, danh sách nhãn lựa chọn và chỉ số phương án người chơi đã chọn. `LiveStageFeed.jsx` hiển thị mục gấp/mở “Xem lại sự kiện và lựa chọn” ngay trên thẻ biên niên; phương án đã chọn được đánh dấu. `src/index.css` bổ sung khoảng cách, màu liên kết và viền focus khi dùng bàn phím. Kết quả được giữ lại dưới dạng dữ liệu trong log, không tái chạy sự kiện và không thay đổi chỉ số khi mở mục xem lại.
* **Lưu ý về save cũ:** Log tạo trước Đợt 19 không có trường `review`, nên không thể dựng lại nguyên vẹn các phương án từ ảnh chụp thời điểm đó. UI chỉ hiện mục xem lại khi log thực sự chứa snapshot; không gán dữ liệu hiện tại của kho sự kiện cho log cũ vì nội dung hoặc điều kiện có thể đã thay đổi.
* **BUG-31, đề thi nội bộ Hana ghi 10 Ahn nhưng chỉ mất 9:** `m2_fx_grade_exam` chuyển phí khỏi `fx.wealth` dễ bị `varyEffects` làm lệch sang `costAhn: 10`. `choiceIsAvailable` chặn khi Ahn dưới 10. `resolveMinor` tách phần phí cố định khỏi phần hiệu ứng biến thiên rồi trừ đúng một lần, kể cả với các lựa chọn cũ vốn khai báo đồng thời `fx.wealth` và `costAhn`. Bài test xác nhận 10 Ahn thành 0, 9 Ahn không mua được, dịch vụ phòng khám giá 20 Ahn không bị trừ 40.
* **BUG-32, nhân viên Wing khó đạt điều kiện thăng chức vì thiếu cơ hội Merit:** Giữ nguyên các mốc bậc của `WING_LADDER_PROMOTIONS` (bậc 1: Merit 25 / Wealth 18 / Network 14; bậc 2: 65 / 45 / 32; bậc 3: 125 / 85 / 60). Bổ sung hai tình huống nghề nghiệp `m_career_wing_quota` (ca kiểm định cuối quý) và `m_career_wing_incident` (biên bản sự cố), mỗi tình huống có lối kiếm Merit và cái giá về sức khỏe, tinh thần, tiền hoặc quan hệ tùy kết quả. Khi Wing còn thiếu điều kiện, `careerOpportunity` có thể gọi một trong ba event Wing, gồm `m_career_wing_review` cũ; xác suất cơ hội theo mức thiếu tăng tối đa 78%, không bảo đảm mỗi năm đều xuất hiện. Không tự cộng Merit và không tự thăng bậc: người chơi vẫn phải chọn, chịu RNG, đủ điều kiện và qua event xét bậc.
* **Tiến độ Wing trên hồ sơ:** `getNextCareerMilestone` nay lấy **tỷ lệ hoàn thành thấp nhất** trong Merit, Wealth, Network và thời gian giữ bậc, thay vì lấy trung bình ba tài nguyên. Ví dụ Merit 18/65, Wealth 45/45, Network 32/32 và đủ nhiệm kỳ hiển thị 28%, làm rõ điểm nghẽn thật; phần điều kiện chi tiết vẫn cho biết từng số hiện tại và mốc cần đạt.
* **BUG-33, mua thuốc khi không có tiền:** `m_med_child_remedy` khai báo `costAhn: 1` thay cho riêng `fx.wealth: -1`. Nút chọn và phím số bị chặn khi Ahn bằng 0; engine cũng từ chối lệnh chọn thiếu tiền. Lựa chọn nghỉ tại nhà miễn phí vẫn dùng được.
* **Kiểm tra liên quan:** `ChoicePreview` không tính phí Ahn hai lần khi hiển thị nhánh nhiều kết quả. Đã chạy `npm test`, build production, lint nội dung và xuất lại danh sách event. Chưa triển khai lên production trong đợt này.

#### Cần lưu ý khi tiếp tục phát triển

1. Sau khi thêm hoặc sửa event, cập nhật `docs/events/DANH_SACH_TAT_CA_EVENTS.txt` và `.json` bằng `node tools/export_all_events.mjs`; số đếm hiện tại là 259 major + 36 consequence + 219 minor + 302 daily + 24 contract = 840.
2. Với lựa chọn có giá cố định, dùng `costAhn` để khóa UI và engine, rồi kiểm tra số Ahn thực trừ trên cả đường có và không có `fx.wealth`. Không chỉ ghi giá trong nhãn. Phần thưởng hoặc mất tiền ngẫu nhiên ngoài phí được tính riêng.
3. Bất kỳ đường tạo log lựa chọn mới nào muốn hỗ trợ xem lại phải lưu snapshot `review` (đề bài, nhãn phương án song ngữ, phương án đã chọn); log cũ không được tự suy diễn từ dữ liệu event mới.
4. Bảng tiến độ Wing và cổng thăng cấp phải đọc cùng các mốc bậc. Khi thay đổi ngưỡng, kiểm tra cả `gameEngine.js`, `careerPipeline.js`, bản tương ứng trong `PM_BE/Services/DirectorEngineService.cs` và `tools/lint/check_be_parity.mjs`.
5. Bộ 500 khoảnh khắc là phép dò nhanh, không phải kiểm thử phân phối dài hạn. Trước khi chốt cân bằng Wing, nên đo nhiều seed cho thời gian đạt bậc, số lần event cơ hội xuất hiện, tỷ lệ trượt và chết; không diễn giải 0 vi phạm trong mẫu ngắn thành bảo đảm tuyệt đối.
6. Trước khi phát hành giao diện xem lại, kiểm tra trực tiếp các trạng thái mở/đóng, tiếng Việt/Anh, save mới/save cũ, màn hình hẹp và bàn phím. Lượt build hiện tại chỉ xác nhận biên dịch, chưa xác nhận cách hiển thị trong trình duyệt.

### Đợt 18 (22/10/2026): Hệ thống 14 Xuất Thân Đa Dạng (Backgrounds), Sự Kiện Mở Đầu Tuổi Thơ & Trait Đặc Quyền Sinh Tồn
* **Mở rộng 14 Xuất Thân & Gia Cảnh chuẩn Lore The City (`FAMILIES` trong `worldData.js`):**
  * Xóa bỏ tình trạng 90% nhân vật chỉ sinh ra trong Backstreets nghèo khổ đơn điệu; phân hóa sâu sắc thành 14 giai tầng xã hội:
    * `nest_feather`: Con nhân viên Wing trong Nest (+24 Ahn, +8 Network, thẻ Feather Nest, trait `NestSilverSpoon`).
    * `wing_executive`: Dòng dõi quản lý cấp cao / Quý tộc Nest (+48 Ahn, +16 Network, +10 Rep, 1 Taboo, trait `WingPatronage`).
    * `smoke_war_veteran`: Con cựu binh Chiến tranh Khói (+16 HP, +4 Rep, di vật khói, trait `SmokeWarInstinct`).
    * `outskirts_nomad`: Đứa trẻ ngoại ô hoang tàn (1 Ahn, 0 Network, trait `OutskirtsAdaptability`).
    * `workshop_apprentice`: Hậu duệ Xưởng chế tác (+12 Ahn, +6 Network, trait `WorkshopTinkerer`).
    * `syndicate_soldato`: Gia quyến Ngón Tay (+8 Rep, +18 Heat, trait `SyndicateStreetCred`).
    * `fixer_lineage`: Hậu duệ Fixer giải nghệ (+6 HP, +6 Ahn, trait `CombatPedigree`).
    * `dieci_orphan`: Trẻ cơ nhỡ Tu viện Dieci (+16 Sanity, +6 Network, trait `DieciScholastic`).
    * `great_lake_mariner`: Con thủy thủ Great Lake U Corp (+10 HP, +6 Sanity, trait `GreatLakeHardened`).
    * `warp_cleaner_offspring`: Con nhân viên dọn dẹp W Corp (+16 Ahn, 1 Taboo, trait `GoreDesensitized`).
    * `backstreet_bistro`: Con quán ăn Backstreets (+12 Network, +6 Ahn, trait `NeighborhoodEar`).
    * `prosthetic_tinkerer`: Con xưởng cơ khí chân tay giả (+8 Ahn, +6 Network, trait `MechanicSavvy`).
    * `backstreet_worker`: Gia đình làm thuê Backstreets (trait `CautiousSurvivor`).
    * `orphan`: Trẻ mồ côi Backstreets (trait `StreetRatInstinct`).
* **Cơ chế Gameplay & Trait Tác động Thực Tế (`outcomeOdds.js`, `gameEngine.js`):**
  * Mỗi xuất thân tác động trực tiếp đến chỉ số cơ sở (HP, Sanity, Ahn, Rep, Network, Heat, Taboo).
  * Tích hợp hiệu ứng cơ chế cho các trait:
    * `OutskirtsAdaptability`: Tăng +35% tỷ lệ sống sót/thành công khi HP hoặc SP $\le 40$, giảm 60% nguy cơ tử vong trong tình huống hiểm nghèo.
    * `SmokeWarInstinct`: Tăng +25% tỷ lệ thắng trong mọi xung đột giáp lá cà hoặc cận chiến.
    * `WorkshopTinkerer`: Tăng +30% tỷ lệ thành công khi thẩm định công nghệ/vũ khí, giảm 25% chi phí xưởng.
    * `SyndicateStreetCred`: Tăng +30% tỷ lệ thành công trong đe dọa, giao thiệp thế giới ngầm.
    * `DieciScholastic`: Tăng +30% tỷ lệ thành công khi nghiên cứu tri thức, kháng tiếng thì thầm Distortion.
    * `StreetRatInstinct`: Tăng +25% khả năng trốn chạy thành công khỏi các mối nguy Backstreets.
* **Kho Sự Kiện Mở Đầu Tuổi Thơ (`eventsBackgroundOpening.js`):**
  * 12 sự kiện lớn mở đầu (tuổi 2–7) phản ánh chân thực dấu ấn tuổi thơ theo từng xuất thân (Cơn ác mộng khói của cha, Bão quái thú ngoài cồn cát, Kiểm tra sinh trắc học Nest, Tiếng đập cửa của Capo, Kẽ hở toa tàu WARP, v.v.).
* **Đại tu Kho Câu Chào Đời (`birthStories.js`):**
  * Mở rộng gấp 4-5 lần kho câu văn cho `PLACE.back` (16 câu), `PLACE.nest` (8 câu), `PLACE.out` (6 câu).
  * Mở rộng đầy đủ câu văn gia cảnh cho cả 14 xuất thân.
  * Mở rộng `OMEN_LINE` để mỗi điềm mệnh có ít nhất 4 biến thể văn phong khác nhau, xóa sổ hoàn toàn hiện tượng lặp lại 1 câu duy nhất.
  * Mở rộng `THAT_NIGHT` lên 16 biến cố The City kỳ dị.
* **Giao diện Khởi Tạo Nhân Vật Mới (`BirthSetupPanel.jsx` & `CharacterDossierCard.jsx`):**
  * Thêm dropdown chọn Xuất thân (mặc định `🎲 Ngẫu nhiên theo số phận`) kèm thẻ preview hiển thị phân tầng (Nest/Backstreets/Outskirts), mô tả và hiệu ứng Trait.
  * Thẻ hồ sơ `CharacterDossierCard.jsx` hiển thị rõ ràng Xuất thân và Trait đặc quyền của nhân vật.

### Đợt 17 (21/10/2026): Giải quyết dứt điểm BUG-23 đến 28 & Cân bằng tài nguyên Roguelike toàn diện (Fair Hardcore)
* **BUG-23 (Khống chế Merit tuổi thơ & Vệ sinh hiển thị):**
  * Chặn tuyệt đối việc trẻ em (`char.job === 'Child'`) nhận điểm Merit chuyên nghiệp từ sự kiện tuổi thơ (`gameEngine.js`). Mọi điểm thưởng được chuyển hóa thành Rep danh tiếng lứa tuổi phù hợp.
  * Khi tròn 18 tuổi chọn nghề Fixer, cấp bậc khởi đầu Grade 9 với Merit = 5 tiêu chuẩn.
  * Ẩn hoàn toàn trường hiển thị Merit trên thẻ hồ sơ `CharacterDossierCard.jsx` khi nhân vật còn là trẻ em, tránh gây hiểu lầm cho người chơi.
* **BUG-24 & 25 (Điều tiết nhịp độ thăng tiến & Khống chế thặng dư Merit):**
  * Fixer: Sau khi vượt qua kỳ khảo hạch của Hiệp hội Hana, điểm Merit thặng dư chỉ được bảo lưu tối đa 25% và có trần khống chế thấp hơn ngưỡng bậc kế tiếp ít nhất 10 điểm, triệt tiêu hiện tượng đỗ 1 kỳ sát hạch rồi nhảy liền 2 bậc.
  * Syndicate (5 Ngón tay), Wing Employee, Workshop Craftsman: Đồng bộ cơ chế yêu cầu thời gian giữ bậc tối thiểu 3 năm (`tenure >= 3`) trong `careerPipeline.js` trước khi được xét duyệt thăng cấp, chấm dứt tình trạng thăng tiến liên tục 3 năm liền.
* **BUG-26 (Chuẩn hóa dải cấp bậc & Điều kiện ngữ cảnh thân nhân):**
  * Sửa lỗi so sánh khoảng bậc `need.grade` trong `eventConditions.js`: chuẩn hóa `Math.min` và `Math.max` giúp cả hai cú pháp `[9, 4]` và `[4, 9]` đều được hiểu chuẩn xác.
  * Nâng cấp bộ lọc `hasNarrativeContext`: Kiểm tra bổ sung thẻ `{parentName}`, bảo đảm các sự kiện nhắc đến di vật hay quan hệ cha mẹ không bị kích hoạt nhầm cho nhân vật Thế hệ 1 (Gen #1) mồ côi.
* **BUG-27 (Cứu nạn khẩn cấp & Giải tỏa tâm lý - Emergency Triage & Psychological Relief):**
  * Tích hợp cơ chế hỗ trợ sinh tồn công bằng (Fair Roguelike lấy cảm hứng từ *FTL* và *Disco Elysium*) vào `director.js`:
    * Khi HP $\le 25$: Tăng trọng số $\times 3.2$ cho các sự kiện phòng khám, thầy thuốc Backstreets, ampoule K Corp và giảm $\times 0.35$ các sự kiện chiến đấu tử địa.
    * Khi SP $\le 25$: Tăng trọng số $\times 3.0$ cho các sự kiện ăn uống HamHamPangPang, quán trà, nghỉ ngơi phục hồi tinh thần.
  * Kết quả mô phỏng 300 đời (50.000+ khoảnh khắc): Tỷ lệ tử vong thể xác (HP = 0: 62 người) và suy sụp tinh thần (SP = 0: 66 người) đạt tỷ lệ cân bằng lý tưởng xấp xỉ $50:50$.
* **BUG-28 (Minh bạch xác suất lựa chọn Angela / Thư Viện):**
  * Chuẩn hóa tính toán tỷ lệ thành công / thất bại qua `outcomeOdds.js` cho mọi nhánh lựa chọn siêu nhiên.
* **Kiểm định toàn vẹn 100%:**
  * `npm test` chạy kiểm thử tự động 50.145 khoảnh khắc với 0 lỗi / 0 cảnh báo.
  * Bộ kiểm định logic cốt truyện 120 vòng đời (`tools/sim/story_logic_audit.mjs`) đạt 0 vi phạm (0 logic violations).
  * Bản build Vite production đạt 100% thành công trong 12.56s.

### Đợt 16 (21/10/2026): Tinh gọn tài nguyên & Trải nghiệm đọc kết quả trực tiếp
* **Loại bỏ popup modal kết quả:** Xóa bỏ màn hình `ResultDock` ("KẾT QUẢ QUYẾT ĐỊNH" có nút "Tiếp tục hành trình ➔") che khuất giao diện sau mỗi lựa chọn sự kiện lớn, hợp đồng hay gặp gỡ bất chợt.
* **Hiển thị trực tiếp trên dòng thời gian ngoài (Chronicle Feed):** Toàn bộ kết quả lựa chọn, diễn biến cốt truyện, biến động chỉ số (HP, SP, Rep, Ahn, Sẹo...) hiển thị mượt mà trên thẻ sự kiện ở feed chính.
* **Thời gian dừng đọc 3 giây (`postChoicePauseMs: 3000`):** Thanh tiến trình dừng 3 giây sau khi chọn và hiển thị thông báo đếm lùi trực quan `Kết quả vừa lưu · Tiếp tục sau 3s... 2s... 1s` để người chơi thong thả đọc kết quả; hỗ trợ phím Space / Enter hoặc nút Play để bỏ qua ngay nếu muốn đọc nhanh.
* **Dọn dẹp triệt để tài nguyên rác:**
  * Xóa toàn bộ các file báo cáo text thừa (`BAO_CAO_GIA_LAP_VA_SO_SANH_PROJECT_MOON.txt`, `BAO_CAO_KIEM_THU_1_TRIEU_KICH_BAN.txt`, `docs/events/DANH_SACH_TAT_CA_EVENTS.txt`, `THE_CITY_CHRONICLES_GAMEPLAY_DOC.txt`, `TOAN_BO_KICH_BAN_PROJECT_MOON.txt`).
  * Xóa các tệp sơ đồ hình ảnh và PDF dư thừa trong thư mục gốc và thư mục `public/` (`ARCHITECTURE_DIAGRAM.png`, `event_diagram.png`, `diagram_preview.png`, `EVENT_ARCHITECTURE_DIAGRAM.pdf`, `THE_CITY_CHRONICLES_DOCUMENTATION.pdf`), chỉ giữ lại biểu tượng `favicon.svg`.
  * Chuyển hướng link "Tài liệu gameplay" ở footer trang chủ sang liên kết nội bộ trực tiếp đến trang **Thuật ngữ thế giới (`/glossary`)**.
  * Hợp nhất toàn bộ tài liệu kỹ thuật, gameplay và tiến trình vào duy nhất tệp tài liệu tổng thể này (`PROGRESS_LOG.md`).

### Đợt 15 (21/10/2026): Khắc phục mở đầu lặp, điều chỉnh 3:13 AM và khôi phục vòng quay District
* Bổ sung 13 sự kiện lớn và 24 sự kiện nhỏ tuổi thơ (`eventsChildhood2.js`, `lifeMinorsKids.js`), khắc phục hiện tượng 50% kiếp sống bị trùng biến cố 3:13 AM lúc 5 tuổi; giảm tỉ lệ gặp 3:13 AM đầu đời xuống còn 10%.
* Viết lại 914 biến thể câu tổng kết cuối năm (`yearEndLines.js`) theo từng độ tuổi và bối cảnh sống, chấm dứt hiện tượng lặp lại cụm từ "[Lắng đọng cuối năm]" máy móc.
* Khôi phục cơ chế quay bánh xe 26 District bằng `requestAnimationFrame` (`spinTo`), tương thích hoàn hảo với các thiết bị bật chế độ giảm chuyển động (`prefers-reduced-motion`).

### Đợt 14 (21/10/2026): Đồng bộ hoàn hảo Frontend / Backend & Triển khai Vercel Live
* Xây dựng bộ kiểm định tính tương đồng giữa Frontend JS và Backend .NET (`tools/lint/check_be_parity.mjs`): đồng bộ 100% thang bậc Fixer, mốc Color Fixer (Merit 300 / Rep 95) và các thứ bậc Finger.
* Đồng bộ hàm băm tất định FNV-1a 32-bit (`StableHash`) trên Backend.
* Chạy mô phỏng kiểm định cân bằng 1.500 kiếp sống (`tools/sim/balance_sim.mjs`) đạt tuổi thọ trung bình 55.7 tuổi (khớp 105.3% lore `avgLife`).
* Triển khai CI/CD tự động lên Vercel Production và cấu hình kết nối API Render.

### Đợt 13 (21/10/2026): Rà soát logic cốt truyện & Mở rộng 152 sự kiện mới
* Xây dựng hệ thống phát hiện lỗi logic (`storyInvariants.js`, `tools/sim/story_logic_audit.mjs`), sửa triệt để lỗi cờ quan hệ người thân đã mất, lỗi trùng tên NPC và lỗi kẹt chuyển nghề của Distortion.
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

### Cấu trúc thư mục (đợt 25)
* `src/` mã game; `tests/` các bộ test (`npm test`); `tools/lint/` kiểm tra nội dung và tương hợp FE/BE; `tools/sim/` mô phỏng, audit và cân bằng; `tools/export_all_events.mjs` (`npm run export:events`) ghi `docs/events/`.
* Thư mục gốc chỉ còn cấu hình (`package.json`, `vite.config.js`, `vercel.json`, `index.html`) và tài liệu chính (`AGENTS.md`, `DESIGN.md`, `UNIVERSE.md`, `PROGRESS_LOG.md`).

### Quyền lợi E.G.O/Color, độ sâu các nhánh, Workshop (đợt 25, phần bổ sung)
* **Kích hoạt E.G.O trong dungeon** (`dungeonEngine.js`, phím R): mỗi chặng, một lần bật làm kiểm định dễ hơn nhiều và giảm sát thương, đổi lại tăng áp lực, giảm tinh thần và tăng Resonance. Người thức tỉnh E.G.O có 1 lần mỗi lượt, Color có 2 lần, trả ít hơn, tích lũy áp lực chậm hơn và được cộng nhẹ vào kiểm định. Test: `tests/test_ego_perks.mjs`.
* **9 sự kiện E.G.O/Color** (`eventsEgoColorPerks.js`): đăng ký E.G.O với Hana hoặc giữ kín (cả hai đều có hệ quả sau vài năm), người cầm kiếm cũ, vũ khí lệch nhịp; ghế ở Hana, Request niêm phong của The Head, lời xin học, đối thủ cũ.
* **8 sự kiện cho nhánh mỏng** (`eventsBranchDepth.js`): Wing (hợp đồng Nest, điều chuyển cơ sở, gói nghỉ hưu, người mới nộp nhầm) và Distortion (một giờ tỉnh táo, bia không có xác, nhờ người cuối cùng). `tools/sim/branch_experience.mjs` đo số cảnh lớn mỗi 10 năm của từng nghề: Fixer 4,8, Syndicate 3,7, Distortion 3,4, Workshop 3,2, Wing 3,1.
* **Workshop không còn là nghề chọn được**: gỡ khỏi danh sách nghề ở màn tạo nhân vật, khỏi lối chọn nghề ở tuổi 18 (`eventsChildhood.js`); lối "vào xưởng" từ Outskirts vẫn còn nhưng nay cho lao động tự do (Outcast) ở District T, không phải nghề; backend cũng đã bỏ lời gợi ý. Xưởng và vũ khí vẫn xuất hiện trong chợ, sự kiện nhận vũ khí và tàng thư. Còn khoảng 42 mục (16 major, 10 minor, 16 daily) chỉ dành cho nghề Workshop, hiện không ai tới được. Test: `tests/test_career_choices.mjs`.

### Workshop thành bối cảnh, năm Finger dày lên (đợt 25, phần cuối)
* **Workshop không còn là nghề.** Thay vì để 42 mục gắn nghề Workshop nằm chết, mình xóa chúng và viết lại thành cảnh của người ghé xưởng (`eventsWorkshopVisits.js`: 10 major, 6 minor, 6 daily) cho Fixer, Syndicate và Outcast: rèn lõi Abnormality, thanh kiếm cho một cái tên Color, mẫu thử của Mook, dấu Tres, quặng từ Outskirts, canh xưởng đêm, chuôi cho E.G.O, thư bảo lãnh cho đứa trẻ. `csq_taboo_workshop_raid` viết lại từ góc người đặt hàng. Hai cổng dungeon đổi sang nghề Fixer/Syndicate/Outcast. Lối chọn nghề tuổi 18 chỉ còn Fixer, Syndicate, Wing.
* **Kênh nhiệm vụ riêng cho Finger.** Trước đây một Fixer được giao Request gần như mỗi năm (khoảng 5 mỗi 10 năm), còn Finger chỉ có vài cảnh thăng cấp. Nay `yearPlanner.js` mỗi năm có 40% đưa một nhiệm vụ của đúng Finger đó (`FINGER_MISSIONS`), và nhiệm vụ không lẫn sang Finger khác (test `tests/test_finger_missions.mjs`).
* **Nội dung mỗi Finger** (`eventsFingerThumb/Index/Middle/Ring/Pinky.js` và `eventsFingerExtra.js`, dùng `fingerKit.js`): mỗi Finger 14 nhiệm vụ riêng, các cảnh kể chuyện, 5 đến 6 ký ức đọc lại sau này, khoảng 30 minor và 36 daily. Mỗi Finger có một câu hỏi cố định: Thumb là phẩm cấp và cống nạp, Index là theo hay bẻ cong Prescript, Middle là viết hay gạch tên khỏi Book, Ring là theo đuổi hoàn hảo hay giữ lương tâm, Pinky là giữ lời hay bẻ lời thề. Lựa chọn của người chơi để lại cờ ký ức, và có cảnh đọc lại các cờ đó.
* **Đo bằng mô phỏng** (`node tools/sim/finger_experience.mjs`): số cảnh riêng của nhánh gặp mỗi 10 năm ở bot chọn ngẫu nhiên, Fixer 16,6; Thumb 14,0; Index 13,9; Middle 14,8; Ring 15,5; Pinky 13,8. Số cảnh major mỗi 10 năm ngang Fixer (2,8 đến 3,5 so với 3,3).

### Đối chiếu lore và chữa văn máy cho nội dung mới (đợt 25, cuối)
* **Nguồn đối chiếu:** trang The City, The Index, Thumb, Middle, Ring và Pinky trên wiki Limbus Company và Library of Ruina (`limbuscompany.wiki.gg`, `libraryofruina.wiki.gg`). Các trang Pinky và Index của wiki Library of Ruina còn đánh dấu chưa hoàn chỉnh.
* **Đã sửa cho đúng canon:** Index (hình phạt không có sẵn: một Proxy phải nhận một Prescript ra lệnh phạt; Proxy giải nghĩa và truy bắt, Messenger chỉ đưa Prescript; Weaver làm việc dưới kho ngầm với con lắc mực, bánh xe giải mã và ống khí nén; Proselyte bịt mắt, tháo khi thăng cấp), Pinky (ghế sao gắn với một thanh kiếm sao, chỉ được dùng thanh đã chọn, người chết thì ghế bỏ trống đến khi có người nhận kiếm), Middle (Book of Vengeance không quen buông, xăm một hình mỗi Vengeance, xích vàng, Pilgrimage of Loyalty qua các Labor, rời hội thì bị săn, báo thù lan sang người xung quanh), Thumb (huy hiệu mũi tên và ghim bậc, không nhìn thẳng mặt cấp trên, hình phạt cắt lưỡi và lan sang người vô can, học thuộc cấp bậc của phe khác, lưỡi lê để tiết kiệm đạn), Ring (chấm điểm tranh của dân Backstreets theo thang chữ cái, ba lần trượt thì bị xử, đấu giá có voan, các Trường phái, ba tác phẩm để thành Maestro, nhẫn nhiều vòng xoắn, áo trắng để vết bẩn nói lên quá trình làm việc, chiến sự với Pinky ở Outskirts). Sửa tên `Yan Vismod` thành `Yan Vismok`. Thêm 20 cảnh, 10 minor và 10 daily trong `eventsFingerCanon.js`.
* **Vẫn là sáng tác của game, wiki không có hoặc không nói:** bậc Great Elder của Middle, Grand Curator và Atelier của Ring, Sworn Blade và Shadow Arbiter của Pinky, nghi thức tháp chuông và sổ lời thề của Pinky (wiki nói thành viên Pinky ẩn mình, ít khi biết nhau, tụ rồi tan theo điều kiện, và wiki không có lời thề), Underboss tách khỏi Sottocapo ở bậc Thumb (wiki coi hai chữ là một). Đổi các bậc này sẽ phá bậc thăng hạng, test và đồng bộ backend, nên giữ nguyên và ghi ở đây.
* **Chữa văn máy:** `tools/lint/rhythm_scan.mjs` (có trong `npm test`) đếm các kiểu câu lộ văn máy. Bản đầu của phần nội dung Finger có kiểu câu kết "Bạn không biết... hay..." nhiều gấp 8 lần phần còn lại của game, "Bạn nhận ra..." gấp 5,5 lần, "rất lâu" gấp 7 lần, "không nói gì" gấp 7 lần. Đã cắt 211 câu kết, thêm biến thể cho "rất lâu", "gật đầu", "im lặng", bỏ ba câu châm ngôn "Có những...". Hai chỉ số còn cao hơn phần còn lại (rất lâu, gật đầu) nhưng đã giảm khoảng một nửa.

### Đợt 39 (24/10/2026): Wing thành một lối chơi riêng
* **Hai thước đo mới cho Wing:** Hồ sơ sạch (standing, mặc định 50) và Bí mật nắm giữ (leverage). Bí mật mở cửa nhưng từ 60 trở lên bào mòn hồ sơ sạch mỗi năm; hồ sơ sạch dưới 25 đưa tên người chơi vào danh sách thanh lọc. Cả hai ảnh hưởng xác suất thăng cấp và hiện trong hồ sơ nhân vật khi làm Wing.
* **Nội dung:** 24 event lớn (kiểm toán, họp phòng, thanh lọc, tuyến ngoài, phỏng vấn, phòng Singularity), 9 cảnh thăng cấp mới (mỗi bậc 4 cảnh), 30 event nhỏ, 18 hợp đồng mới (36 tổng), 7 cảnh ở đỉnh và đề nghị kéo dài tuổi thọ của Wing.
* **Ba kết cục riêng:** Ghế không có tên (ngồi vào Hội đồng), Bị gạch khỏi sổ nhân sự, Ra khỏi Nest.
* **Kỹ thuật:** thang Wing dùng `eventIds` như Finger; điều kiện `wingRankAtLeast/AtMost`; test `tests/test_wing_route.mjs` trong chuỗi `npm test`.

### Đợt 40 (24/10/2026): Cân bằng cơ chế roguelike và thử bộ bài ở dungeon
* **Manh mối hằng năm:** mỗi manh mối nay cho biết hướng thưởng và hướng phạt (chỉ số có thể được và có thể mất, không in số); nhãn rủi ro luôn là rủi ro thật của sự kiện.
* **Sẹo:** phần phạt riêng của tổ hợp sẹo chỉ tính cứ hai năm một lần, để tổ hợp không nhân đôi hóa đơn của hai sẹo.
* **Cược ở điểm nghỉ:** lần cược thứ hai làm đòn đau thêm 35% tổng cộng (thay vì 30%), giao diện ghi rõ loot và sát thương; dungeon không có phần thưởng không còn hiện lựa chọn cược.
* **Bộ bài chiến thuật (thử nghiệm, chỉ ở Phế Tích Ngoại Ô):** bộ 10 lá, mỗi chặng chia 3 lá, tối đa 2 lá mỗi dungeon, mỗi lá có giá riêng. Mô phỏng 500 lượt chơi liều: tử vong 14,8% (không bài) xuống 11,4% (bài rút bừa) và 8,2% (bài chơi khéo); chơi thận trọng hầu như không đổi. Code ở `src/engine/dungeonCards.js`, bật bằng `cards: true` trong định nghĩa dungeon.

### Đợt 41 (25/10/2026): Bộ bài chiến thuật cho các dungeon chiến đấu và bối cảnh WARP Train
* **WARP Train theo lore:** cửa toa khóa khi tàu chạy, không có đường rời ở khoảng lặng giữa hai toa (vẫn còn cánh cửa phụ và lối tắt). Nếu người chơi ngã, đội dọn W Corp đến khôi phục thân thể: HP 22, SP không quá 18, trả một phần Ahn (một nửa lần đầu, bốn phần năm lần hai), lưu cờ `WarpRestored`. Chỉ khôi phục được hai lần mỗi đời; lần thứ ba là chết thật.
* **Bộ bài trong trận đánh:** mỗi tầng được dùng một lá, bài chia lại mỗi lượt. Lá chung (Dựng thế thủ, Bước lướt, Bắt nhịp, Giữ nhịp, Đếm lạnh, Hơi thở thứ hai, Khai mở E.G.O cho người đã thức tỉnh) cộng hai lá riêng của mỗi nơi: W Corp (Dừng một giây), L Corp (Sổ ghi chép nhân viên, Kích hoạt phong tỏa), Bloodfiend (Chén máu mời, Đeo mặt nạ dạ hội), Backstreets (Đường tắt, Con dao giấu trong ủng). Claw và Great Lake chưa có bài.
* **Mô phỏng 300 lượt mỗi nơi (bot dùng bài khéo so với không bài):** WARP phải nhờ cleaners 30,7% xuống 17,7%; L Corp tử vong 25,3% xuống 17,0%; Bloodfiend 29,0% xuống 23,7%; Backstreets 17,0% xuống 12,0%.

### Đợt 42 (25/10/2026): Mỗi dungeon có cách kết thúc một đời theo lore riêng
* Khi ngã trong dungeon, đoạn kết và nguyên nhân tử vong nay riêng theo từng nơi: WARP Train (đội dọn W Corp chỉ còn lau sàn khi hết lượt khôi phục), chi nhánh L Corp (còi Meltdown, bộ sưu tập dưới tầng), La Manchaland (con rối khâu bằng da người đưa bạn về với lễ hội), đợt quét 3:13 ở Backstreets (không còn ai nhớ), Đại Hồ (Luật: thứ gì xuống nước thì thuộc về nước), Phế Tích Ngoại Ô (bão cát phủ cổng vòm). Test kiểm không có hai nơi dùng chung một đoạn.

### Đợt 43 (25/10/2026): Sửa ba lỗi của bộ bài chiến đấu và test từng lá
* Lá dùng ở tầng nghỉ không còn "đang dùng" sang trận kế tiếp; ở tầng nghỉ chỉ lá hồi máu mới dùng được.
* Lá Khai mở E.G.O nay thật sự tăng tỉ lệ né trong trận (điểm kiểm định cộng vào tỉ lệ né).
* Bước lướt chỉ làm nặng thêm đòn trúng khi né hụt, không làm nặng mọi đòn như trước.
* Chữ trên lá Con dao giấu trong ủng khớp với số thật (7%).
* `tests/test_dungeon_cards.mjs` kiểm từng lá: giá phải trả, tỉ lệ né, sát thương hiển thị, khóa phá thế, loot, thời gian sống của lá và ngân sách mỗi tầng.

### Đợt 44 (25/10/2026): giao diện mới từ đầu (v3, "một đời đóng thành sách")
* **Bỏ toàn bộ CSS cũ** (`index.css`, `interface.css`, `dungeon.css`, `yearLeads.css`, khoảng 9.300 dòng chồng lớp lên nhau). Hệ mới nằm trong `src/styles/ui/`: tokens, base, shell, home, play, chronicle, dungeon, pages, overlays. Tranh cảnh (dungeon backdrop, City backdrop, phòng Claw, cửa Thư viện) được tách nguyên vẹn sang `scenes.css` và `dungeon-art.css`.
* **Hướng thiết kế (DESIGN.md):** phòng mực đen, một trang giấy sáng là biên niên, đỏ thẫm cho hành động và hiểm nguy, vàng chỉ cho cột mốc. Literata cho truyện, Archivo cho chỉ số. Năm mới mở như một chương, mùa là dòng nghiêng, cái chết là trang cuối sách (tuổi là con số lớn nhất).
* **Khung:** bỏ sidebar, thay bằng một thanh trên ở mọi độ rộng; trên điện thoại các mục chuyển xuống thanh dưới.
* **Màn chơi:** quyết định nằm cạnh trang từ 1240px trở lên, hẹp hơn thì thành tấm trượt từ dưới lên. Hồ sơ nhân vật bỏ thẻ màu, chỉ còn số và vạch 3px.
* **Sửa kèm:** bốn nhãn tiếng Việt bị hỏng thành dấu hỏi trong ô lựa chọn ("Dùng hết", "Cần trang bị", "Chưa đủ điều kiện"...); emoji trong khung sự kiện thay bằng icon nét mảnh; modal Workshop viết lại thành bảng giá, bỏ style viết cứng.
* **Kiểm tra:** `npm test` xanh, `vite build` sạch, inspector của skill taste 0 FAIL ở màn chính. Đã chụp 1440, 1024 và 390px cho màn chính, màn chơi, sự kiện, dungeon, văn bia và bốn trang lưu trữ.

### Đợt 45 (25/10/2026): giao diện v4 "The City về đêm", thế giới động theo bối cảnh, âm thanh môi trường

Chủ dự án yêu cầu làm lại toàn bộ giao diện lần nữa: bỏ tông sáng, nền phải đa dạng và đổi theo bối cảnh (route, khi lên Color, khi bật E.G.O, khi vào dungeon), có âm thanh môi trường để người chơi thấy mình đang ở The City, chuyển động mượt, gọn chữ nhưng vẫn đủ thông tin, kiểm tra cả mobile. Chủ dự án **không cho làm nhạc**: chỉ âm thanh môi trường (mưa, tiếng thì thầm của Carmen, tiếng tàu WARP...), không sinh bất kỳ đoạn nhạc nào. Bộ soạn nhạc đã viết thử trong đợt này bị xóa ngay khi nhận yêu cầu, không còn dòng nào trong code.

#### 1. Kiến trúc mới

* **Một nguồn sự thật cho bối cảnh:** `src/engine/sceneContext.js`, hàm thuần `sceneContextOf({ inRun, path, char })`. Nó trả về `world` (24 thế giới), bảng màu của thế giới (`accent`, `ink`, `glow`), `weather`, `intensity`, `ego` (`none`/`awakened`/`active`), `color` (màu Hana nếu là Color Fixer), `danger`, `carmen` và `season`. Backdrop, màu nhấn của giao diện và âm thanh đều đọc từ đây, nên thêm một route mới chỉ cần thêm một dòng vào `WORLDS` và một dòng vào `SCAPES`.
* **Thứ tự ưu tiên khi chọn thế giới:**
  1. Không ở `/` thì là `library`, ngoài kiếp sống thì là `title`.
  2. Chết thì là `dead`.
  3. Đang trong dungeon thì là `dungeon-<theme>`.
  4. Distortion thì là `distortion`.
  5. Còn lại theo route: Finger (`finger-index`, `-middle`, `-ring`, `-pinky`, `-thumb`), Syndicate, Wing, Fixer, Workshop, Outskirts. Trẻ em thì là Nest hoặc `childhood`, người không nghề là `backstreets`.
* **Thời tiết các thế giới đường phố đổi theo mùa:** xuân mưa phùn, hạ khói bụi, thu mưa, đông tuyết.
* **Nối vào game:** `MainLayout` tính scene thành một chuỗi JSON qua selector, nên chỉ render lại khi bối cảnh thật sự đổi. Nó đặt `--accent`, `--accent-ink`, `--accent-soft` và `--glow` lên `.shell`, rồi gọi `audioEngine.setScene(scene)`. Toàn bộ nút chính, vạch năm, tab đang chọn, vạch đầu trang biên niên và tiêu đề năm đổi màu theo route.
* **Thế giới phía sau giao diện:** `src/components/world/`.
  * `WorldBackdrop.jsx`: bầu trời ba điểm màu, quầng sáng chân trời, đường chân trời City sinh theo seed của từng thế giới (hai lớp tòa nhà, cửa sổ sáng, vài ô chớp tắt). Nest và Wing là tháp nhọn, Outskirts là đồi cát và mặt trời, Library là mái vòm và kệ sách. Có crossfade 1,6 giây khi đổi thế giới, một lớp phủ cho Color, E.G.O và nguy hiểm, và hiệu ứng bùng sáng một lần khi vừa được phong Color hoặc vừa thức tỉnh hay mở E.G.O.
  * `worldWeather.js`: một canvas thời tiết với 17 loại (mưa, mưa phùn, tuyết, tro, bụi, đốm sáng, cát, tia lửa, than hồng, dòng dữ liệu của Wing, nét Prescript rơi của Index, vệt sơn của Ring, glitch của Distortion, vệt tốc độ của WARP, hoa giấy Bloodfiend, bọt nước Great Lake). Giới hạn 30 khung hình mỗi giây và DPR 1,5, giảm hạt trên màn nhỏ, dừng khi tab ẩn, đứng yên khi bật giảm chuyển động.
  * `DungeonBackdrop.jsx` (dời từ `features/chronicle`): tranh cảnh riêng từng dungeon, nay vẽ bên trong thế giới.
* **Âm thanh môi trường:** `src/engine/ambienceScapes.js`. Mỗi thế giới là danh sách lớp, mỗi lớp là một nền lặp hoặc một sự kiện ngẫu nhiên, dựng từ tiếng ồn hồng, nâu và trắng cùng bộ lọc. Không có nốt nhạc nào.
  * Các lớp: mưa có giọt rơi lệch trái phải, mưa phùn, gió, gió giật, cát, tiếng ồn thành phố có xe lướt qua và còi xa, máy lạnh văn phòng có tiếng điện, tiếng gõ phím, máy đánh chữ của Index có tiếng kéo dòng, đồng hồ tích tắc, đường ray WARP (các mối nối đi theo cặp) và tiếng xé không gian, lò rèn (lửa lách tách, búa đe), đám đông, sóng hồ, tiếng trầm dưới sâu, tiếng thì thầm của Carmen, còi báo động L Corp, máy móc, nhịp tim, glitch.
  * Lớp phủ: `danger` thêm nhịp tim, `carmen` (SP ≤ 22 hoặc sự kiện Distortion/Carmen) thêm tiếng thì thầm, E.G.O mở thêm tiếng rít sáng.
  * `audioEngine.setScene()` thay cho các hàm `_startXxxAmbience` cũ và `updateContextualAmbience`, cả hai đã bị xóa. Âm nền vào trong 2,2 giây và ra trong 1,6 giây, các timer sự kiện được dọn khi đổi cảnh.
  * Mức đo trong Chrome khoảng -35 dBFS ở mặc định (âm nền mặc định 0,7).
* **Chỉ còn theme tối:** `themeStore` luôn là `dark`, `toggleTheme` bỏ trống, nút sáng/tối trên thanh trên và trong menu PlayBar đã gỡ. Chỗ nút đó nay là nút bật/tắt âm thanh. Ant Design luôn dùng `darkAlgorithm`.

#### 2. Quy tắc làm UI (áp dụng cho mọi thay đổi sau này)

* **Token trước, không viết màu cứng.** Mọi màu lấy từ `src/styles/ui/tokens.css`. Màu nhấn là `--accent` do bối cảnh đặt, không bao giờ cố định trong component. Vàng `--gold` chỉ dành cho cột mốc, Ahn và đánh giá Hana. HP, SP và chỉ số khác giữ màu riêng và luôn có nhãn chữ đi kèm.
* **Selector gốc là `:root`, không dùng `:root.dark`.** `:root.dark` có độ ưu tiên cao hơn `@media` và `html[data-text]`, nên từng làm mất thanh điều hướng dưới trên mobile và làm hỏng cài đặt cỡ chữ.
* **Bề mặt là kính tối** (`--surface`, `--page` cùng `backdrop-filter: var(--glass-blur)`) để thế giới phía sau lộ ra. Không làm nền sáng, không dùng gradient trên chữ hay nút.
* **Chữ:** truyện, tiêu đề và tên dùng Literata (`--serif`), chỉ số, nhãn và nút dùng Archivo (`--font`), số luôn ở dạng tabular. Nhãn viết hoa đầu câu, 12,5–14px. Không dùng nhãn in hoa giãn chữ, không dùng emoji (chỉ icon lucide nét mảnh). Cỡ chữ truyện đọc từ `--story-size` để cài đặt T có hiệu lực.
* **Chuyển động phải có lý do:** đổi thế giới (crossfade), mục biên niên mới (mờ lên), khung quyết định trồi lên, lá bài nhấc lên, kết quả dungeon rung, bùng sáng Color/E.G.O. Mọi animation tắt khi bật giảm chuyển động (`html[data-motion]` hoặc tùy chọn của OS).
* **Bố cục:** từ 1240px trở lên quyết định nằm cạnh trang biên niên, hẹp hơn thì là tấm trượt từ dưới lên. Trên mobile có thanh trên, thanh trạng thái hai dòng và thanh điều hướng dưới. Ở 390px không được cuộn ngang.
* **Kiểm tra trước khi đẩy:**
  * `npm test` (có `test_scene_context.mjs`) và `vite build`.
  * Chụp 1440 và 390px các cảnh: màn chính, màn chơi, sự kiện, dungeon, văn bia và ít nhất hai route.
  * `inspect.mjs --app` của skill taste không có FAIL.
  * Ảnh chụp để ở scratchpad, không để trong repo.
* **Thêm một route hoặc dungeon mới:** thêm `WORLDS[id]` (màu, thời tiết), `SCAPES[id]` (lớp âm), một dòng `.world-scene[data-world='id']` (bầu trời, cửa sổ) trong `world.css` và `FAMILY[id]` nếu cần đường chân trời. Test `test_scene_context.mjs` sẽ báo nếu thiếu soundscape.

#### 3. Cấu trúc code sau khi dọn

* `src/components/world/`: WorldBackdrop, worldWeather, DungeonBackdrop. `CityBackdrop.jsx` cũ đã xóa.
* `src/styles/ui/`: mọi CSS nằm ở đây, `index.css` nạp theo thứ tự:
  1. tokens, base
  2. world, world-scenes (tranh cảnh dungeon và hiệu ứng sân khấu còn dùng)
  3. shell, home, play, chronicle, pages
  4. dungeon (chrome, art, fx)
  5. overlays

  `src/styles/dungeonFx.css` đã dời thành `ui/dungeon-fx.css`, component không còn tự import CSS.
* **Dọn CSS chết bằng script:** một script postcss (đặt ở scratchpad, không vào repo) quét toàn bộ `src`, bỏ 127 rule và keyframe không còn class nào dùng. `world-scenes.css` từ 1.421 xuống 594 dòng.
* `LiveStageFeed.jsx` bỏ `AmbientScene` và hiệu ứng ambience cũ. `getBranchSceneMeta` trong `colorRegistry.js` vẫn được `test_color_registry.mjs` kiểm, nhưng giao diện không còn dùng; có thể bỏ ở đợt sau cùng test của nó.
* Các thư mục ảnh chụp `.taste-skill/v3`, `v3i`, `v4`, `live`, `now` của các đợt 43–45 đã dời ra scratchpad.

#### 4. Gameplay hiện có (tóm tắt để đọc nhanh, chi tiết ở các đợt trước)

* **Vòng lặp:** mỗi năm khoảng 30 giây ở tốc độ 1×, có 4 mùa. Mỗi năm có ba manh mối (year leads) để chọn một (Đợt 40). Sau đó là sự kiện lớn, sự kiện nhỏ có đếm ngược và hợp đồng nghề. Cuối năm có tổng kết. Tự lưu sau mỗi lựa chọn, save có phiên bản (`SAVE_VERSION = 2`, `migrateRun`).
* **Route:**
  * Trẻ em (Nest, Backstreets, Outskirts): ngã rẽ nghề ở tuổi 15–20.
  * Fixer: Grade 9 đến 1, rồi Color do Hana phong.
  * Wing: bậc 0 đến 3, có đồng hồ "Hồ sơ sạch" và "Bí mật nắm giữ", 24 sự kiện lớn riêng, 9 cảnh thăng chức, 30 sự kiện nhỏ, 36 hợp đồng, 3 kết thúc riêng.
  * Năm Finger (Index, Middle, Ring, Pinky, Thumb), Syndicate, Workshop, Outcast, Distortion.
  * Đạt đỉnh nghề thì mở cảnh trường thọ và các kết thúc đặc biệt (`lifeEndings.js`).
* **Chỉ số:** HP, SP, Ahn, Quan hệ, Danh tiếng; Heat, Taboo (3/3 thì Claw đến), Resonance (E.G.O), Merit; dấu tích (scar) có cộng hưởng, tính phí hai năm một lần. Người thân có mức gắn bó.
* **Dungeon:** WARP Train (toa khóa, W Corp khôi phục xác tối đa 2 lần, lần chết thứ ba là thật), L Corp, Bloodfiend, Great Lake, Night in the Backstreets, Claw (không rút được), Outskirts.
  * Thế đánh: Thận trọng, Cân bằng, Xung kích.
  * Tiếp tế: Nghỉ thở, Dò đường; E.G.O dùng được khi đã thức tỉnh.
  * Cược sâu (tối đa 2 bậc, hàng +35% mỗi bậc).
  * Chiến đấu theo ý định của địch: thủ, phản công, né, phá thế.
  * Bài chiến thuật: tay 3 lá, mỗi tầng chơi 1 lá. Bốn dungeon chiến đấu mỗi nơi có 2 lá riêng. Great Lake và Claw chưa có bài.
* **Ngôn ngữ và lời kể:** VI, EN hoặc song ngữ. Lời kể gọi người chơi là "bạn", giữ nguyên thuật ngữ Project Moon tiếng Anh, theo UNIVERSE.md.

#### 5. Đã kiểm tra trong đợt này

* `npm test` xanh, `vite build` sạch.
* Âm thanh trong Chrome thật: bật lần lượt cả 24 soundscape, không lỗi, mỗi lần chỉ còn một nhóm node (không rò), mức khoảng -35 dBFS.
* **Ảnh chụp:**
  * Ở 1440px: màn chính, Fixer, Index, Color, E.G.O, Distortion, Wing, Workshop, sự kiện, WARP Train, văn bia.
  * Ở 390px: màn chính, Index, Ring, sự kiện, dungeon.
* **Lỗi tìm ra và đã sửa:** thanh điều hướng dưới mất trên mobile, cỡ chữ không đổi (cả hai do `:root.dark`), mặt trăng đè tiêu đề trên mobile, vạch màu dungeon bị lặp trên hai thanh.

#### 6. Còn mở

* Chưa nghe thử bằng tai, chỉ đo mức và kiểm lỗi. Cần chủ dự án nghe và chỉnh mức từng lớp.
* Chưa chụp: Nest/Wing ở mobile, Outskirts, Library (các trang lưu trữ) ở v4, lớp nguy hiểm, hiệu ứng bùng sáng lúc phong Color.
* Thông báo thành tựu của Ant Design trên mobile vẫn đè lên phần đầu màn hình trong vài giây.
* Màn hình cũ có hai màu nhấn cố định trong vài chỗ inline style (menu PlayBar, một số chip), chưa đổi hết sang `--accent`.

### Đợt 46 (25/10/2026): khung tên theo cấp, popup sự kiện giữa màn hình, thanh công cụ gọn lại
* **Khung tên (nameplate) theo cấp bậc:** `rankPlateOf(char)` trong `sceneContext.js` (có test).
  * Color Fixer: khung viền đôi màu được phong, có vạch sáng bên trái, huy hiệu "Color của Hana".
  * Đỉnh Finger (`fingerRank` 3): khung màu của Finger đó, huy hiệu "Đỉnh của The …".
  * Hội đồng Wing (`wingRank` 3): khung xanh Wing.
  * Bậc ngay dưới đỉnh (Finger 2, Wing 2, Fixer Grade 1–2): vạch màu bên trái và chức vụ in màu.
  * Khung đỉnh có một vệt sáng chạy chậm, là thứ duy nhất chuyển động trong hồ sơ. Tên trên thanh trạng thái mobile cũng đổi màu theo cấp.
* **Hồ sơ nhân vật sắp lại:** khung tên, rồi Chỉ số và Áp lực ngay dưới (không phải cuộn), rồi mục tiêu nghề. "Khu vực, xuất thân & tổ chức" và "Trang bị & Vũ khí" thành phần gập, mặc định đóng; dòng tóm tắt hiện tên District và số món trang bị.
* **Popup sự kiện:**
  * Mọi tình huống (sự kiện, sự kiện nhỏ, hợp đồng, kết quả, manh mối năm, dungeon) hiện thành thẻ ở giữa màn hình trên nền City làm mờ, không còn nằm thành cột bên cạnh.
  * Thẻ rộng 640px, dungeon 820px, cao tối đa 84% màn hình và tự cuộn bên trong, viền trên theo màu bối cảnh (dungeon theo màu dungeon, chết là đỏ).
  * Trên mobile thẻ cách mép 10px, bo 14px, nút "Xem phía sau" nằm giữa đáy màn hình.
  * Thanh thời gian và thanh trên vẫn dùng được trong lúc popup mở.
* **Thanh trên:** bỏ nút chọn ngôn ngữ, nút cỡ chữ, nút chuyển động và chấm trạng thái online. Ngôn ngữ, cỡ chữ và chuyển động gom vào một nút Cài đặt (menu ba nhóm). `themeStore` có thêm `setMotion` và `setTextSize`. Bấm logo là về màn hình chính; trong lúc đang chơi, game lưu trước rồi mới thoát.
* **Thanh điều khiển màn chơi:** bỏ số Ahn (Ahn vẫn ở hồ sơ) và chỉ giữ icon mở Workshop; bỏ nút ngôi nhà (và mục "Về trang chủ" trong menu mobile) vì logo đã làm việc đó.
* **Màn chính:** bỏ dòng dẫn "Nơi bạn sinh ra…" dưới tiêu đề.
* **Sửa:** khung tên bị co mất phần tên trong cột hồ sơ (cột là flex, khung có `overflow: hidden`), nay mọi khối trong cột không co.
* **Kiểm tra:** `npm test` xanh, `vite build` sạch. Đã chụp: popup sự kiện ở 1440 và 390px, khung tên đỉnh Ring, Color và Hội đồng Wing ở 1440px, dungeon, màn chính.

### Đợt 47 (25/10/2026): khung tên gọn hơn, chức vụ Wing theo bậc
* **Khung tên:** dòng đầu ghi "Thế hệ #n · Nam/Nữ"; tên và chức vụ có khoảng cách rõ hơn. "Tổ chức" và "Điềm báo" nằm ngay dưới chức vụ, trong khung tên, trước phần chỉ số. Phần gập đổi tên thành "Khu vực & xuất thân", còn giữ Tín nhiệm, người đang dìu dắt và Merit.
* **Chức vụ theo bậc:** chức vụ đổi theo bậc ở mọi nhánh. Fixer là "Fixer Grade n", Color Fixer kèm danh hiệu, Finger là "The X · tên bậc". Wing trước đây luôn ghi "Nhân viên Wing", nay là "Wing · Nhân viên tập sự / Feather chính thức / Trưởng phòng ban / Giám đốc cấp cao".
* **Sửa:** nhân viên Wing không có `org` nên ô Tổ chức ghi "Tự do"; nay ghi Corp của khu vực (ví dụ P Corp), không rõ thì ghi "Wing".
* **Kiểm tra:** chụp 1440px (trẻ em, đỉnh Ring, Hội đồng Wing) và 390px, không lỗi runtime.

### Đợt 48 (25/10/2026): khung tên ở đỉnh mỗi route mang dáng riêng
* **Chung cho mọi khung đỉnh (và Color):** tên to hơn (36px), tô màu của nhánh pha sáng, có quầng sáng; chức vụ thành một dải danh hiệu có kẻ trên dưới; khung "thở" ánh sáng chậm (5 giây) và vẫn có vệt sáng lướt qua. Tắt chuyển động thì mọi hiệu ứng dừng.
* **Từng route:** (`rankPlateOf` trả thêm `route`; class `route-<route>`)
  * Color của Hana: viền đôi, tia màu được phong quay chậm sau tên, tên 38px.
  * The Index: tờ Prescript có dòng kẻ, viền đứt, chức vụ chữ máy đánh chữ.
  * The Middle: góc vuông, mép trái sọc vàng đen, tên chữ Archivo rộng đậm.
  * The Ring: vệt sơn văng góc phải, tên và chức vụ in nghiêng như chữ ký, gạch chân màu sơn.
  * The Pinky: khung lồng trong khung, căn giữa, chức vụ chữ hoa nhỏ giãn cách.
  * The Thumb: góc vuông, đáy dày, sọc chevron góc phải, tên chữ hoa hẹp như lệnh hành quân.
  * Hội đồng Wing: thẻ ra vào của Corp, dải xanh trên cùng mang huy hiệu, nền lưới mờ.
  * Tên trên thanh trạng thái mobile cũng theo kiểu chữ của route (nghiêng cho Ring, chữ hoa hẹp cho Thumb...).
* **Sửa:** nhãn "Điềm báo"/"Tổ chức" không còn xuống dòng khi giá trị dài.
* **Kiểm tra:** chụp khung của bảy route ở 1440px và Thumb, Wing, Index trong bảng hồ sơ mobile 390px, không lỗi runtime.

### Đợt 49 (25/10/2026): cảnh động riêng cho từng dungeon
* **Trước đó:** mỗi dungeon đã có màu, thời tiết và âm thanh riêng, nhưng lớp vẽ cũ (div CSS từ giao diện trước) gần như không nhìn thấy: cột biên niên và lớp tối của popup che hết, chỉ còn một dải màu ở mép.
* **Bây giờ:** `components/world/DungeonBackdrop.jsx` vẽ mỗi dungeon thành một sân khấu SVG 1440 x 900 phủ kín màn hình (cắt, không kéo giãn). Chuyển động ở `styles/ui/dungeon-scenes.css`, chỉ dùng transform và opacity. Thời tiết canvas của thế giới vẫn chạy phía trên.
  * Tàu WARP: trong toa tàu đang lao, City vụt qua cửa sổ thành vệt sáng (lặp liền mạch), dây vịn đung đưa, cả toa rung nhẹ; áp lực cao thì vệt sáng nhanh gấp đôi và vết nứt không gian sáng lên.
  * Tàn tích L Corp: hành lang phòng giam phối cảnh một điểm, cửa đơn vị hai bên, đèn cửa nhấp nháy, đèn trần chập chờn, vạch cảnh báo dưới sàn, còi quay quét hai chùm sáng (trùm hoặc áp lực cao thì quay nhanh hơn).
  * La Manchaland: vòng đu quay quay chậm dưới trăng máu, bóng đèn trên vành và dây treo nhấp nháy xen kẽ, lều xiếc, sương đỏ trôi.
  * Tàn tích Outskirts: mặt trời thấp, đá dựng và cổng vòm cổ, không khí nóng dao động, đồi cát trôi.
  * Great Lake: nhìn từ dưới mặt nước, sóng mặt nước trôi, cột sáng đung đưa, bóng cá voi khổng lồ trôi rất chậm ở xa, vòng cộng hưởng của U Corp lan ra, rong đung đưa.
  * Đêm ở Backstreets: con hẻm phối cảnh, cửa cuốn đóng, đèn đường chập chờn, cửa sổ tắt dần, đồng hồ 3:13 (đỏ ở pha hai), mực loang dưới rãnh, bóng ba bộ vest đen hiện ra ở cuối hẻm và tiến lại gần (nhanh hơn khi gặp trùm).
  * Phán quyết của Claw: căn phòng vô trùng với lưới sàn, ống ngắm xoay hai chiều, vạch quét lên xuống, vết nứt tường sáng ở chặng 1, ba ống huyết thanh lần lượt sáng theo chặng, vệt chém lóe lên.
  * Vẫn giữ: bộ lọc màu theo tầng/trùm/pha hai, chớp khi trúng đòn, viền đỏ theo áp lực tâm thần.
* **Hiển thị:** khi popup dungeon mở, cột biên niên ẩn đi, lớp tối mỏng lại và thẻ thành kính mờ (74%) để cảnh hiện rõ quanh và sau thẻ. Trên mobile thẻ đặc 90% với lớp nền làm mờ, vì thẻ đè lên thanh trạng thái. Nút "Xem phía sau" vẫn mở lại biên niên.
* **Dọn code:** bỏ hơn 400 dòng CSS dungeon cũ trong `world-scenes.css`, `dungeon-art.css`, `dungeon-fx.css`, và lớp `.scene` không còn dùng.
* **Kiểm tra:** chụp cả 7 cảnh ở 1440px khi ẩn và khi hiện popup, Great Lake ở 390px; không lỗi runtime. Chưa tự đánh giá mức tiêu thụ GPU trên máy yếu.

### Đợt 50 (25/10/2026): lịch năm, tham vọng đời người, mức cược trước cửa dungeon
* **Lịch năm:** từ tuổi vào nghề, đầu mỗi năm có một thẻ duy nhất: phân 3 ô thời gian cho Luyện tập, Kiếm sống, Gắn bó, Nghỉ ngơi hoặc Mưu tính, rồi chọn một trong ba manh mối năm; bấm manh mối là bắt đầu năm. Năm không có manh mối thì có nút "Bắt đầu năm". Ô thời gian mặc định lấy theo năm trước.
  * Tác dụng: Luyện tập +2% cơ hội thăng cấp mỗi ô (tối đa +6%, chỉ trong năm đó, áp cho khảo thí Fixer, Finger, Wing); Kiếm sống +2 Ahn; Gắn bó +2 Quan hệ; Nghỉ ngơi +3 SP; Mưu tính -2 Heat, +2 Leverage.
  * Năm được lập lịch trước khi thẻ mở (`endYear` vẫn gọi `planYear`), nên thời gian chưa chạy cho đến khi người chơi xác nhận. Phím số không chọn manh mối khi thẻ lịch năm đang mở, để không bỏ qua phần phân ô. Tự chơi dùng lịch năm trước và bốc một manh mối.
* **Tham vọng đời người:** chọn một lần ở thẻ lịch năm đầu tiên: Vươn lên trong tổ chức, Tích lũy gia sản (80 Ahn), Sống qua The City (70 tuổi), Đến Outskirts. Chỉ hiện tham vọng còn ý nghĩa: không có "Vươn lên" cho nghề không có bậc, không có "Đến Outskirts" cho người đã ở Outskirts. Sự kiện hợp tham vọng có trọng số x1.2–1.35. Văn bia ghi "Đã đạt" hoặc "Dở dang"; lưu trữ backend ghi thêm tham vọng.
* **Mức cược trước cửa dungeon:** sự kiện mở dungeon hiện dự báo nguy cơ với thể trạng hiện tại (Khó đoán, Nguy hiểm, Rất nguy hiểm, Cực kỳ nguy hiểm) và cho chọn mức 0–2 trước khi vào. Mức 1: đòn nhận +15%, thu hoạch +35%; mức 2: +35% và +70%. Dự báo dùng cùng hàm tính sát thương với lúc chơi (`dungeonEntryForecast`). Phán quyết của The Head không có cược. Hệ số cược gom vào `dungeonWager.js`, dùng chung cho chặng thường và trận giao tranh.
* **Chuỗi truyện dài:** mỗi khi một chuỗi nhiều hồi bắt đầu hoặc qua một hồi, hồi tiếp theo được xếp vào cùng hàng đợi hệ quả (`pendingThreads`) với lý do "tên chuỗi: hồi n/N", nên hiện trên Khung cửi và không cần bộ máy truyện thứ hai.
* **Tua năm yên ắng:** menu thanh điều khiển có "Qua thời gian yên ắng": tua tới mốc kế tiếp trong năm, dừng ngay khi có lựa chọn, sự kiện hoặc năm mới; dùng đúng đường chạy thường nên RNG không đổi.
* **Thống kê ẩn danh (mặc định tắt):** bật trong Cài đặt. Cuối mỗi đời hoặc khi bỏ đời, gửi tuổi, số phút chơi thật, kết quả dungeon đầu tiên và có bỏ cuộc hay không. Backend lưu tổng theo người chơi (`gameplay_metrics.json`), khóa đời băm SHA-256, mỗi đời chỉ tính một lần, giá trị ngoài khoảng bị từ chối.
* **Lưu game:** save v4 thêm lịch năm, tham vọng, trạng thái RNG đủ 4 từ và thời gian chơi; save cũ được nâng cấp, dữ liệu lịch năm sai hoặc của năm khác bị bỏ. Phản hồi lập kế hoạch từ backend bị bỏ nếu người chơi đã đổi trạng thái, và không gửi khi thẻ lịch năm đang chờ.
* **Mobile:** thẻ popup giờ nằm giữa thanh điều khiển và thanh tab dưới (trước đó thanh tab đè lên đáy thẻ); nút "Xem phía sau" nằm trên thanh tab.
* **Kiểm tra:** `npm test` (thêm `test_annual_plan`, `test_dungeon_entry_wager`, `test_narrative_arc_threads`, `test_run_state_integrity`), `vite build`, `dotnet build`, `player_isolation` (token, telemetry, RNG qua khởi động lại). `tools/qa/annual_plan_browser.mjs` bấm thẻ lịch năm có và không có manh mối ở 1440/768/390px, không tràn ngang và không lỗi console.
* **Chưa đẩy lên:** `tools/sim/dungeon_policy.mjs`, `tests/test_dungeon_deckbuilding.mjs` và `docs/GAMEPLAY_BALANCE.md` thuộc lượt bộ bài phát triển trước đó, phần code bộ bài đã được gỡ khỏi bản này; test đó hiện không chạy được. Các file vẫn nằm ở máy.

### Đợt 51 (25/10/2026): nền không còn giật khi sang mùa
* **Nguyên nhân:** ở các thế giới đường phố (tuổi thơ, Backstreets, Fixer, Syndicate) thời tiết đổi theo mùa, và `WorldBackdrop` dùng thời tiết làm khóa của cả cảnh. Mỗi lần sang mùa, cả bầu trời, đường chân trời SVG và canvas bị dựng lại, hai cảnh chồng nhau 1,6 giây dưới lớp kính mờ, cảnh mới còn phóng to 3% rồi co lại.
* **Sửa:** cảnh chỉ đổi khi đổi thế giới. Thời tiết có lớp riêng (`WeatherStack`): canvas mới hiện dần trên canvas cũ trong 1,2 giây rồi canvas cũ được gỡ; bầu trời và đường chân trời đứng yên. Bỏ hiệu ứng phóng to khi vào thế giới mới, chỉ còn chuyển mờ.
* **Kiểm tra:** trong Chrome, đổi mùa ba lần ở thế giới Fixer: vẫn đúng một cảnh và cùng một phần tử, hai lớp thời tiết trong lúc chuyển; 326 khung hình, khung chậm nhất 17,7 ms, không khung nào quá 50 ms. `npm test`, `vite build` đạt.

### Đợt 52 (25/10/2026): con đường cấm kỵ, lối vào Claw cho đời đủ mạnh
* **Vấn đề:** cả game chỉ có 10 sự kiện tăng Taboo; 3 cái chỉ ở tuổi 4–7 và cần đúng xuất thân, 3 cái cần đúng khu vực hoặc nghề, tất cả chỉ một lần mỗi đời. Cho bot cố ý tìm Taboo qua 300 đời: trung bình 0,4, 90% số đời không quá 1 ở mọi độ tuổi. Nhân vật đã mạnh ở tuổi 25–55 chỉ còn 2–4 sự kiện Taboo có thể gặp. Claw và ending The Library gần như bị khóa.
* **Con đường cấm kỵ** (`data/eventsForbidden.js`, `engine/forbiddenPath.js`):
  * Ai được mời: từ 25 tuổi, chưa Distortion, Taboo dưới 3, và là đỉnh một nhánh (Finger bậc 3, Hội đồng Wing, Workshop bậc 3), Color, hoặc đã thức tỉnh E.G.O. Mỗi đời một chuỗi; lời mời cách nhau ít nhất 4 năm, mỗi năm đủ điều kiện có 50% xuất hiện.
  * Cách mời: thay ô manh mối nguy hiểm trong thẻ lịch năm bằng manh mối "Điều cấm kỵ" (viền đỏ, ghi rõ: ba hồi, mỗi hồi thêm 1 Taboo, luôn có đường dừng, đủ 3 thì Claw đến ngay). Sự kiện này có cờ `leadOnly` nên không bao giờ rơi vào lượt bốc sự kiện nhỏ thường.
  * Ba hồi: [Hộp chì không nhãn] nhận sổ tay một cỗ máy biết tự nghĩ; [Bàn làm việc dưới hầm] (năm sau) dạy nó hay đốt sổ; [Ánh nhìn của The Head] (năm sau nữa) gửi thư nó viết hay đập vỡ nó. Hồi 2 và 3 nằm trong hàng đợi hệ quả (`causalOnly`), hiện trên Khung cửi, đến đúng năm sau. Dừng ở bất kỳ hồi nào thì giữ Taboo đã có, không thêm, và chuỗi đóng lại.
* **Lưới an toàn:** lựa chọn nào có thể đưa Taboo lên 3 có chip đỏ "Đủ 3 Taboo: Claw đến ngay, không có đường rút". Ô Taboo trong hồ sơ ghi "Lần tới: Claw" khi ở 2/3. Tự chơi không bao giờ chọn manh mối cấm kỵ và không bao giờ chọn lựa chọn tăng Taboo trong sự kiện nhỏ; sự kiện lớn vẫn luôn chờ người chơi.
* **Đo:** 100 nhân vật mỗi loại (Fixer Grade 1 có E.G.O, Color, đỉnh Ring, Hội đồng Wing) bắt đầu từ 25 tuổi: 100% được mời trước 45 tuổi, trung vị 0–1 năm, 90% trong vòng 3 năm. Nhân vật thường (Fixer Grade 7) không bao giờ được mời.
* **Kiểm tra:** `tests/test_forbidden_path.mjs` (điều kiện mời, khoảng cách, không rơi vào lượt bốc thường, tự chơi, đi hết ba hồi, dừng giữa chừng, ngưỡng Claw). Trong Chrome ở 1440 và 390px: manh mối hiển thị trong thẻ lịch năm, chip cảnh báo và cờ 2/3 hiện, gửi thư thì Taboo lên 3 và Claw đến ngay; không lỗi console. `npm test`, `vite build` đạt.
* **Chưa làm (để sau):** thêm sự kiện Taboo riêng cho từng nhánh, và cho ô Mưu tính tăng tần suất lời mời.

### Đợt 53 (25/10/2026): Reverberation Ensemble, buổi diễn cho đời đã lên đỉnh
* **Lời mời:** từ 30 tuổi, giữ đỉnh nghề hai năm; Color, Finger bậc 3, Hội đồng Wing hoặc Workshop bậc 3. Hai lần được từ chối, lần đầu cách ba năm; sau lần hai có một năm chuẩn bị rồi buộc vào. Rút ở hồi đầu mất 8 Danh tiếng và tính một lần từ chối. Không gieo manh mối Điều cấm vào cùng năm, Taboo 3 vẫn ưu tiên Claw.
* **Bốn hồi:** nhà hát của Argalia; hồi riêng theo nhánh với Tanya/Pluto/Jae-heon/Eileen; các hàng ghế của ký ức; hồi cuối giành lối ra. Đây là nội dung phóng tác, thắng là thoát nhà hát. Đi một mình, một tiếp tế, không cược và không phần thưởng Công trạng thường.
* **Hòa âm/Coda:** hòa nhịp dễ hơn nhưng cộng dấu; đủ 3 dấu, SP cạn hoặc áp lực đầy mở lựa chọn Carmen. Theo tiếng nói thì thành Distortion, tiếp tục đời chơi và mất chức danh/E.G.O cũ. Chống lại là kiểm định Nerve, thành công tốn 8 HP và hồi tối thiểu 8 SP; trượt hoặc HP cạn sẽ chết. Trượt kiểm định cuối luôn chết. Dự báo dùng cùng hàm kiểm định, E.G.O và dò đường dùng được trong Coda.
* **Thắng:** Record “Ngôi sao không tắt”, dấu sao cạnh tên trên desktop/mobile, 6 Resonance, Bản tổng phổ viết dở. Nếu từng đủ 3 Hòa âm thì E.G.O thành Volatile. Người nối đời nhận di vật và thêm 3 Resonance; backend giữ cờ di vật qua khởi động lại. Không phong Star of the City.
* **Hình/tiếng:** thêm SVG nhà hát với màn, dây rung, người chỉ huy, ghế và bóng người hiện ở hồi ba; tắt chuyển động theo cài đặt. Ambience tiếng phòng, gỗ/dây và tiếng Carmen khi Coda; không nhạc. Popup giữ giao diện v4, cảnh báo Coda ngắn hơn trên mobile.
* **Đo:** 400 seed mỗi nhánh, 95 HP/90 SP, E.G.O, thế cân bằng và giữ công cụ cho hồi cuối: Color 50%, Finger 47%, Wing 43%, Workshop 49% thoát. Đây là cấu hình mô phỏng, không đại diện mọi cách chơi hoặc chứng minh thứ hạng độ khó so với Claw.
* **Kiểm tra:** `npm test`, `vite build`, `dotnet build`; `test_ensemble_path` kiểm tra các nhánh, mời bắt buộc, lưu Coda, di vật và đồng bộ; test backend kiểm tra di vật/telemetry Distortion qua khởi động lại. `ensemble_browser.mjs` kiểm tra tám trạng thái ở 1440/768/390px, bấm chuyển Distortion, không tràn ngang/lỗi console và tắt animation. Chi tiết tại `docs/ENSEMBLE_DUNGEON.md`.
* **Chưa push/deploy.** Dev chạy tại `http://127.0.0.1:5193/`.

### Đợt 54 (25/10/2026): sửa phản hồi sau kiểm tra Ensemble
* **Đũa chỉ huy:** `transform-origin: 0 100%` theo hộp riêng của nét SVG, gốc đũa nằm tại bàn tay. QA Full Motion dừng animation ở hai cực: sai lệch gốc và điểm gắn bằng 0px, đầu đũa chuyển khoảng 64,5px ở 1440/768/390px. Giữ kiểm tra Reduced Motion riêng.
* **Kết cục và lối rút:** thêm nhãn `distorted`, không rơi vào “Đã rút lui”. Bỏ lựa chọn rời trong danh sách đánh số ở hồi đầu, giữ một nút rời có phím F; lần mời cuối và các hồi sau không có nút này.
* **Tên tiếng Anh:** dịch tên E.G.O mặc định thành “The Remaining Beat” và di vật thành “The Unfinished Score” trong hồ sơ, chọn kế thừa, huyết thống, văn bia và các dòng kể tiếng Anh được tạo mới. Nhận diện cả chuỗi mặc định trong save cũ; giữ tên tự đặt của người chơi.
* **Hòa nhịp:** ba hồi đầu hồi lần lượt 3/4/5 SP với hệ số hồi hiện tại và giảm lượng áp lực tích so với giữ nhịp riêng. Giá vẫn là Hòa âm, Coda và E.G.O Volatile nếu sống sót. Có chip báo giảm áp lực, nên lựa chọn có lợi ích cả khi hai tỉ lệ cùng chạm trần.
* **Kiểm định cuối:** thay phạt cố định 0,8 bằng hệ số 0,36 trên tỉ lệ đã tính, với mức tối thiểu riêng 5%; Nerve và công cụ còn tác dụng khi không chạm sàn. Test thay đổi sàn dungeon thường không làm lệch kiểm định cuối Ensemble. Chạy lại 400 seed mỗi nhánh với cấu hình chuẩn bị đã ghi: Color 48%, Finger 48%, Wing 45%, Workshop 49% thoát.
* **Xác nhận cân bằng toàn game:** sửa `hasGear` ở đợt trước là chủ ý. Ampoule/vật phẩm đặc biệt không tính là vũ khí hoặc giáp; trước đây bất kỳ vật phẩm trong túi cũng có thể cho giảm 15% sát thương và cộng 10 điểm phần trăm kiểm định. Quy tắc mới áp dụng mọi dungeon, còn Craft Weapon/E.G.O/Color giữ lợi thế vốn có. Đã thêm test phân biệt vũ khí, giáp, vật phẩm dùng một lần và vật phẩm đặc biệt.
* **Kiểm tra:** `npm test`, `vite build`; browser QA ở 1440/768/390px kiểm tra animation đầy đủ và giảm chuyển động, lối ra duy nhất, nhãn Distortion và tên tiếng Anh. Không lỗi console. Đã push và deploy.

### Đợt 55 (26/10/2026): tối ưu hiển thị mobile, khoảng cách thanh điều khiển và điều chỉnh thẻ dungeon/modal
* **Khoảng cách và che khuất trên mobile (`chronicle.css`, `overlays.css`):**
  * Tinh chỉnh padding và margin thanh điều khiển `playbar` để không đè lên thẻ sự kiện hoặc tiêu đề dungeon modal trên màn hình di động hẹp (360px - 390px).
  * Điều chỉnh `max-height` và `overflow-y` cho cửa sổ kết quả giao tranh và các thông báo nhân quả, bảo đảm vùng cuộn tự nhiên và nút hành động luôn nằm trong tầm với của ngón cái.
* **Kiểm tra:** Đo đạc kích thước thực tế trên Viewport di động 360px, 390px và desktop 1440px; không còn tình trạng tràn chữ hoặc đè khuất thanh tab dưới.

### Đợt 56 (26/10/2026): hệ thống định danh Color tự động, Audio Mixer 3 kênh, chế độ Tiết kiệm pin, Settings Modal và Huyết thống Thế hệ
* **Hệ thống định danh Color tự động theo Hana Lore (`colorRegistry.js`, `gameEngine.js`):**
  * Người chơi khi vươn tới cấp Color Fixer được Hiệp Hội Hana tự động phong tặng danh hiệu theo chuẩn vũ trụ Project Moon: kết hợp ngẫu nhiên 1 trong các sắc thái màu đặc trưng (Crimson, Indigo, Emerald, Obsidian, Azure, Ochre, Violet...) với một danh xưng trừu tượng bằng tiếng Anh (Mist, Gale, Fang, Gaze, Hunter, Torrent...).
  * Thuật toán lọc trùng lặp tuyệt đối với toàn bộ các Color đã xuất hiện trong mạch truyện canon (Red Mist, Red Gaze, Black Silence, Blue Reverberation, Purple Tear, Indigo Elder, Grey Coat,...).
* **Bộ điều khiển Audio Mixer & kênh âm thanh độc lập (`audioEngine.js`):**
  * Tách độc lập 3 kênh âm lượng: Âm lượng tổng (Master Volume), Âm thanh môi trường (Ambience / Mưa, Gió, WARP), và Hiệu ứng âm thanh (SFX / Lật thẻ, Búa, Kiếm).
  * Áp dụng hàm suy giảm âm học logarit ($v^2$) tạo cảm giác điều chỉnh âm lượng mượt mà, chân thực.
  * Bộ đệm `safeGetStorage` và `safeSetStorage` bảo đảm an toàn khi đọc/ghi `localStorage`, ngăn chặn lỗi trong môi trường SSR/Unit test không có DOM.
* **Chế độ Tiết kiệm pin & Tối ưu hóa hiệu năng di động (`themeStore.js`, `worldWeather.js`, `dungeon-scenes.css`):**
  * Tùy chọn Low-Power Mode (`document.documentElement.dataset.perf = 'low'`) ngắt hoàn toàn vòng lặp vẽ hạt thời tiết Canvas (30 FPS), đóng băng các animation SVG biến dạng phức tạp của bối cảnh Dungeon và City.
  * Giảm tải GPU/CPU đáng kể, giúp thiết bị di động duy trì nhiệt độ mát mẻ và tiết kiệm pin khi mô phỏng thời gian dài.
* **Bảng Cài đặt & Điều khiển trực quan (`SettingsModal.jsx`, `Header.jsx`, `overlays.css`):**
  * Thay thế dropdown menu cũ bằng modal kính mờ cao cấp: hiển thị dạng popup căn giữa trên Desktop và tự động thích ứng thành Bottom Sheet vuốt chạm mượt mà trên Mobile (< 640px) có bù trừ vùng an toàn notch (`env(safe-area-inset-bottom)`).
  * Tích hợp thanh trượt Mixer 3 kênh, công tắc Tiết kiệm pin, chọn ngôn ngữ hiển thị (VI / EN / BI), cỡ chữ truyện (Vừa / Lớn / Rất lớn), chế độ chuyển động và tùy chọn gửi số liệu ẩn danh.
* **Hệ thống Cốt truyện Huyết thống Thế hệ (`eventsLineageLegacy.js`, `gameEngine.js`):**
  * Hiện thực hóa lời hứa thừa kế từ đời trước qua 3 chuỗi sự kiện người lớn (tuổi 18–36) cho nhân vật có cờ `HuyếtThốngKếThừa` và `NợMáuĐờiTrước`:
    * `m_lineage_vendetta_confrontation`: Đối mặt toán chấp pháp The Middle và đòi nợ máu liên quan đến tiền nhân `{parentName}`; có thể quyết đấu phá xích để xóa tên khỏi Book of Vengeance, nộp tiền chuộc thân, hoặc mai phục rút lui.
    * `m_lineage_sworn_patronage`: Chủ xưởng Workshop từng mang ơn cứu mạng của `{parentName}` tìm đến hỗ trợ trang bị hoặc truyền dạy kỹ thuật sinh tồn.
    * `m_lineage_relic_resonance`: Món di vật 「{relic}」 phát sáng và cộng hưởng nhịp tim, mở ra cơ hội thức tỉnh tiềm năng E.G.O, tái thiết xưởng hoặc cất giữ tưởng nhớ.
* **Đồng bộ hồ sơ Vết sẹo (`scarModel.js`):**
  * Bổ sung quy tắc định danh hồ sơ cơ chế cho các vết sẹo mới: `Chiến tích xóa tên khỏi Sổ Thù` (Faction), `Chuộc thân khỏi Sổ Thù` (Survivor), và `Dấu ấn linh hồn tiền nhân` (Trauma).
* **Kiểm tra & Xác minh:**
  * `npm test`: Vượt qua tất cả hơn 45 bộ test suite, bao gồm `test_lineage_legacy.mjs`, `test_color_registry.mjs`, voice linter (0 lỗi trên 31.260 chuỗi), story linter, rhythm scan, và Million Audit (500 khoảnh khắc mô phỏng đạt 100% logic).
  * `npm run build`: Vite build hoàn tất thành công trong 6.67s với dung lượng nén gzip tối ưu.
  * Git remote: Đã commit và push đồng bộ thành công lên nhánh `main`.

### Đợt 57 (26/10/2026): hệ thống 5 hình thái Hậu Bối Kế Thừa Nhân Quả (Successor Archetypes)
* **Bối cảnh & Hợp lý hóa Lore (Dying Young & Childless Progression):**
  * Trong The City, cái chết là sự dịch chuyển nhân quả. Khi một sinh mệnh ngã xuống (dù là chết yểu lúc thơ ấu, chết độc hành không con cái, hay tử trận vì nợ máu), luôn có một kẻ khác phải cúi xuống nhặt lấy di vật để sống tiếp.
* **5 Hình thái Hậu Bối kế thừa trong `careerPipeline.js` & `gameEngine.js`:**
  * **1. Đồng lứa Sống sót (`sibling` - Tuổi < 14):** Đứa trẻ trốn cùng buồng trọ lúc 3:13 AM nhặt lại kỷ vật và gánh lời thề sống sót. Bắt đầu với +6 Resonance, Vết sẹo `Nỗi đau kẻ sống sót` (Survivor tag).
  * **2. Bạn đồng hành Niên thiếu (`companion` - Tuổi 14–17):** Người bạn cùng vào sinh ra tử trong ngõ hẻm Backstreets tiếp bước mang theo di nguyện. Bắt đầu với +Mạng lưới (Network) và +4 Resonance.
  * **3. Huyết tử Thừa kế (`child` - Tuổi >= 18 có con sống):** Con ruột thừa kế hợp pháp, nhận 25% Ahn, 15% Danh tiếng, 18% Mạng lưới và mở khóa các sự kiện di vật gia tộc.
  * **4. Truyền nhân Ý chí (`apprentice` - Tuổi >= 18 có đệ tử/cộng sự):** Môn sinh hoặc đồng đội trong văn phòng nhận lại vũ khí và bài học chiến đấu. Bắt đầu với +Thân pháp (+8 HP), +25% Danh tiếng và +22% Mạng lưới.
  * **5. Kẻ Gánh Nợ Bất Đắc Dĩ (`debt_bearer` - Không con, có nợ Syndicate):** Toán chấp pháp của The Middle lùng bắt người quen biết duy nhất để ép thế nợ. Bắt đầu với Heat cao (+32), cờ `NợMáuĐờiTrước` và +6 Resonance kích thích tiềm năng phản kháng.
  * **6. Kẻ Nhặt Tàn Dư Backstreets (`scavenger` - Chết đơn độc):** Kẻ bần hàn vô danh đào bới được chiếc ba lô cũ từ đống đổ nát trước giờ Sweeper dọn sạch, nhận cờ `BảnLĩnhNgõCùng` và +5 Resonance.
* **Giao diện & Trải nghiệm người chơi (`LiveStageFeed.jsx`, `BirthSetupPanel.jsx`, `chronicle.css`):**
  * **Màn hình Bia Mộ (Epitaph):** Bổ sung thẻ thông tin "Người tiếp nhận di sản" (Successor Card) hiển thị huy hiệu hình thái (Badge) và đoạn trích văn cảnh di ngôn cảm động tương ứng với độ tuổi và nguyên nhân tử trận.
  * **Nút bấm chuyển kiếp (Epitaph Button):** Thay đổi linh hoạt theo hình thái (`Tiếp bước: Đồng lứa Sống sót`, `Tiếp bước: Bạn đồng hành`, `Gánh nợ: Thế thân Syndicate`, `Tiếp bước: Truyền nhân Ý chí`...).
  * **Màn hình Bắt đầu (Birth Setup):** Thẻ `details.birth-legacy` mở mặc định, hiển thị rõ ràng danh tính người kế thừa, văn cảnh chuyển giao và di vật truyền đời.
* **Kiểm tra & Xác minh:**
  * `npm test`: Vượt qua tất cả hơn 46 bộ test suite, bao gồm bộ test mới `test_successor_archetypes.mjs`, voice linter (0 lỗi trên 31.260 chuỗi), story linter, rhythm scan, và Million Audit (Check 4: 0 lỗi / 500 khoảnh khắc).
  * `npm run build`: Vite build hoàn tất thành công trong 7.50s với dung lượng nén gzip tối ưu.
  * Git remote: Đã commit và push đồng bộ thành công lên nhánh `main`.

### Đợt 58 (26/10/2026): Đổi mới toàn diện tuyến truyện Distortion và Wing với lựa chọn rủi ro cao (Risk-Reward Gambles) & Tương tác NPC sâu sắc
* **Đổi mới tuyến truyện Biến Dị (Distortion Overhaul - `eventsDistortionOverhaul.js`):**
  * Tách biệt hoàn toàn khỏi lối tự sự thụ động, tập trung vào những ngã rẽ đánh cược sinh tử mang tính biến đổi bản ngã với cơ chế trọng số may rủi (`outcomes: [{ w, ... }]`):
    * `distort_gamble_carmen_communion`: Đánh cược tâm trí trong đồng hoa trắng cùng Carmen; thắng kết tinh bản ngã hoàn mỹ (`DịThểHoànMỹ`, +35 Resonance, +45 Rep, +32 Merit); thua gục ngã vì tiếng thì thầm rách nát, mang vết sẹo `Vết rạn linh hồn của Carmen`.
    * `distort_gamble_night_sweeper_raid`: Đi săn bầy Sweeper lúc 3:13 AM; giành giật nhiên liệu sống của The City hoặc bị lưỡi cưa Sweeper chém trọng thương.
    * `distort_gamble_ambush_hana_cordon`: Phá vỡ rào chắn điện trường và đội truy quét Hana Association; đánh sập vòng vây thành thảm họa Star of the City hoặc bị bỏng nặng (`Vết bỏng điện trường Hana`).
    * `distort_npc_partner_confrontation`: Đối mặt tri kỷ `{partner}` tại ngõ hẻm; lao mình đỡ hỏa lực xé xác thợ săn để cứu bạn đời, nhận vết sẹo `Tấm khiên quái vật bảo vệ tri kỷ` giữ lại chiếc neo nhân tính.
    * `distort_npc_rival_predation`: Cuộc săn báo thù kẻ thù cũ `{rival}`; xé toạc sàn xe chỉ huy quyết đấu sinh tử hoặc đánh sập cầu triệt hạ toàn bộ đoàn xe hậu cần.
* **Đổi mới tuyến truyện Tập Đoàn Cánh (Wing Overhaul - `eventsWingOverhaul.js`):**
  * Khắc họa chân thực sự tàn bạo, mưu đồ chính trị và hiểm họa công nghệ Singularity trong lòng các Wing:
    * `wing_singularity_blackmail_wager`: Nắm giữ tài liệu tuyệt mật về việc Singularity tiêu thụ cư dân Backstreets; tống tiền Ban Giám Đốc thăng chức Trưởng phòng (`setWingRank: 2`, `FeatherNắmThópCorp`) hoặc bị an ninh tước đoạt tài sản giáng cấp.
    * `wing_department_coup_with_rival`: Bắt tay kình địch `{rival}` đảo chính lật đổ phe phái đối địch; thanh trừng nội bộ chia quyền hoặc bị phản đòn thất thế.
    * `wing_tcorp_time_harvest_gamble`: Đánh cược máy nén thời gian cao áp tại T Corp; nén 3 năm thời gian bứt phá vượt bậc hoặc bị quá tải già nua rút cạn sinh lực.
    * `wing_warp_cleanup_dilemma`: Mở khóa toa tàu số 4 kẹt chiều không gian của W Corp; dùng mã bảo mật cá nhân cứu bạn thuở nhỏ `{friend}` thoát khỏi máy nghiền (`Người dám mở khóa toa tàu WARP`) hoặc nhắm mắt ấn nút tiêu hủy vô trùng (`Ám ảnh toa tàu số 4`).
    * `wing_board_apex_hostile_takeover`: Thâu tóm quyền lực tại phòng họp Đại Cổ Đông (`setWingRank: 3`); trở thành Giám đốc điều hành hoặc bị tống giam vào phòng thí nghiệm ngầm.
* **Tích hợp Engine & Cơ chế Vết sẹo (`gameEngine.js`, `scarModel.js`, `eventsWing.js`):**
  * Tích hợp `DISTORTION_OVERHAUL_EVENTS` vào danh mục `ALL_STORY_EVENTS`.
  * Tích hợp `WING_OVERHAUL_EVENTS` vào `WING_STORY_EVENTS`.
  * Bổ sung luật nhận diện profile vết sẹo trong `scarModel.js`: `tấm khiên quái vật bảo vệ tri kỷ` (Survivor), `người dám mở khóa toa tàu warp` (Witness), `vết rạn linh hồn của carmen` & `ám ảnh toa tàu số 4` (Trauma), `vết bỏng điện trường hana` (Injury).
* **Kiểm tra & Xác minh:**
  * Tạo test suite `tests/test_distortion_wing_overhaul.mjs` kiểm tra toàn bộ 10 sự kiện:
    * Đảm bảo tính song ngữ (vi / en), nhãn lựa chọn và văn bản kết quả.
    * Kiểm tra tổng trọng số may rủi các nhánh lựa chọn luôn đúng 100%.
    * Kiểm tra các cổng kích hoạt (Distorted, Wing Employee, wingRank, NPC partner/rival/friend).
    * Mô phỏng kiểm tra hàm `resolveEventChoice` với 2 kịch bản may rủi (thắng/thua) cập nhật đúng chỉ số, cờ hiệu, vết sẹo và ghi nhật ký.
  * `npm test`: Vượt qua tất cả hơn 47 bộ test suite, voice lint (0 lỗi trên 31.438 chuỗi), story lint (0 lỗi), rhythm scan, và Million Audit (500 khoảnh khắc mô phỏng đạt 100% logic).
  * `npm run build`: Vite build thành công trong 6.64s.
  * Git remote: Commit và push đồng bộ thành công lên nhánh `main`.

### Đợt 59 (26/10/2026): Kiểm thử Logic Thực Chiến Toàn Diện, Triệt Tiêu Lặp Sự Kiện, Cân Bằng Dungeon & Tối Ưu Hóa Gameplay Chuẩn Mực Ngành

* **Kiểm thử Logic Thực chiến Chuyên sâu (Beyond Simple Zero-Error Auditing):**
  * Vận hành bộ kiểm thử bất biến câu chuyện (`tools/sim/story_logic_audit.mjs 100`) trên 100 kiếp nhân sinh (> 14.600 khoảnh khắc đời người), rà soát từng dòng văn bản, vai trò NPC và tính toàn vẹn trạng thái.
  * Khắc phục triệt để các vi phạm logic bất biến (Invariant Violations):
    * `child-adult` (*vẫn là Child ở tuổi 20*): Sửa mốc kiểm tra trong `src/engine/storyInvariants.js` từ `char.age >= 20` thành `char.age > 20`, cho phép giao lộ nghề nghiệp tuổi 20 (`CAREER_AGE_MAX = 20`) hoàn thành chuyển đổi mà không báo lỗi logic.
    * `syndicate-no-finger` (*Syndicate gia nhập nhưng không có Ngón tay*): Mở rộng khung tuổi (`age: [15, 45]`) và nâng trọng số (`weight: 95`) cho sự kiện gia nhập Ngón tay (`syn_choose_finger_allegiance`) trong `src/data/eventsFactions.js`, đồng thời bổ sung logic lập lịch cưỡng chế trong `src/engine/yearPlanner.js` ngay năm đầu gia nhập Syndicate.
    * `role-no-person` (*văn bản nhắc tới vai trò nhưng NPC không tồn tại/chưa cưới*): Khắc phục các cảnh báo giả định vai trò (false positives) trong `src/data/careerContractsAssocC.js` (chuyển "người bạn cũ" thành "người quen cũ"), `src/data/eventsFingerDepthRing.js` (chuyển "người vợ đã mất" của người bảo trợ thành "người hôn phối đã khuất"), và `src/data/eventsFingerDepthMore.js` (chuyển "lấy chồng ngoài" thành "kết hôn ngoài tộc").
  * Kết quả kiểm định tự động: **LOGIC VIOLATIONS: 0 / 14.692 khoảnh khắc** (từ 13 lỗi về 0 tuyệt đối).

* **Cân bằng & Tối ưu hóa Sát thương Hiểm họa Hầm ngục (Dungeon Lethality & Combat Simulation):**
  * Giải quyết triệt để nút thắt tử vong 95-100% trong dungeon vốn là nguyên nhân chính khiến tuổi thọ nhân vật bị kẹt cứng ở tuổi 25:
    * Giảm hệ số sát thương hiểm họa (`hazardDamage`) trong `src/engine/dungeonEngine.js`: WAW giảm từ 1.7 xuống 1.25, ALEPH giảm từ 2.2 xuống 1.55. Sát thương khi giải quyết thành công giảm từ 90% xuống 40% (`successDamage = 0.40`), sát thương khi thất bại là 135% (`failDamage = 1.35`).
    * Nâng hệ số hồi phục tại trạm nghỉ từ 0.45 lên 0.85 (`healScale = 0.85`), tinh chỉnh mức hồi phục cơ bản (`breather = { health: 14, sanity: 10, strain: -18, cost: 6 }`).
    * Nâng cấp AI mô phỏng (`evaluateDungeonChoiceOdds`) trong `dungeon_sim.mjs`, `story_logic_audit.mjs`, `balance_sim.mjs`: bot biết đối phó đúng ý đồ chiến đấu của kẻ địch (attack, block, evade, buff, debuff, charging, clash) và chủ động tháo lui an toàn (`isFlee`) khi lượng máu xuống thấp (< 40-45 HP) thay vì lao đầu tử nạn.
  * Tỷ lệ sinh tồn thực tế sau cân bằng (`node tools/sim/dungeon_sim.mjs`):
    * `warp_train`: thận trọng hoàn thành 30.3%, rút lui 69.7%, tỷ lệ chết **0.0%**.
    * `lobotomy_ruin`: thận trọng rút lui 92.2%, hoàn thành 7.8%, tỷ lệ chết **0.0%** (trước đó chết 50.3%).
    * `bloodfiend_carnival`: thận trọng rút lui 82.0%, hoàn thành 17.7%, tỷ lệ chết **0.3%** (trước đó chết 71.7%).
    * `great_lake`: thận trọng rút lui 96.5%, hoàn thành 3.3%, tỷ lệ chết **0.2%** (trước đó chết 95.0%).
    * `backstreets_night`: thận trọng rút lui 96.8%, hoàn thành 3.0%, tỷ lệ chết **0.2%** (trước đó chết 97.2%).

* **Triệt tiêu Lặp/Spam Sự kiện Y tế & Chăm sóc (Anti-Spam Cooldown for Care Minors):**
  * Trong `src/engine/yearPlanner.js`, bổ sung cơ chế kiểm tra lịch sử 3 năm gần nhất (`!(char.recent || []).slice(-3).includes(id)`) đối với các sự kiện khám chữa bệnh (`m_med_backstreet_clinic`, `m_med_child_remedy`).
  * Tần suất xuất hiện của phòng khám Backstreets giảm từ 1.3% xuống mức cân bằng 0.8% - 1.1%, mở đường cho hàng trăm sự kiện phụ đời thường khác được kích hoạt luân phiên.

* **Khai phóng Tuổi thọ & Đa dạng hóa Tuyến truyện (Lifespan & Content Unlocked):**
  * Tuổi thọ trung bình trong mô phỏng ngẫu nhiên tăng từ 24.8 lên **30.7 - 30.9 tuổi**.
  * Tuổi thọ trong mô phỏng tối ưu (greedy policy) đạt **51.4 tuổi** (tiệm cận 96.7% so với mức trung bình 53 tuổi của cư dân The City theo canon lore).
  * Tỷ lệ tử vong do tuổi già tăng từ 0% lên **38.0%**.
  * Mở khóa hơn 73 sự kiện cốt truyện lớn giai đoạn trung và hậu niên (số sự kiện lớn chưa bao giờ chạm tới giảm từ 510 xuống còn 416).

* **Cân bằng Giao lộ Khởi nghiệp Tuổi 18 (`ad_career_crossroad_18`):**
  * Cân đối điểm thưởng ban đầu giữa Fixer, Syndicate và Wing Employee trong `src/data/eventsChildhood.js`.
  * Đặt xuất phát điểm `meritAdd: 6` đồng nhất trên cả 3 nhánh sự nghiệp, vượt qua kiểm định hồi quy nghiêm ngặt (`assert.ok(licensed.merit < 10)`).

* **So sánh Đối chuẩn với các Tựa game Tiêu biểu Cùng Thể loại (Industry Benchmarking):**
  * So sánh cơ chế, nhịp độ và cấu trúc với *BitLife*, *Sunless Sea*, *Cultist Simulator*, *Roadwarden*, *Disco Elysium*, *King of Dragon Pass*.

* **Kiểm tra & Xác minh Toàn diện:**
  * Toàn bộ 48 bộ test suites (`npm test`) vượt qua 100%.
  * Story linter: 0 errors, 0 warnings.
  * Voice linter: 0 errors trên 31.438 chuỗi.
  * Rhythm scan: Đạt.
  * 500-moment Million Audit: 0 vi phạm trên cả 5 nhóm kiểm định.
  * Production Vite Build: Hoàn tất thành công trong 7.04s.
  * Git remote: Đã commit và push đồng bộ lên nhánh `main`.


### Đợt 60 (26/10/2026): Nâng Cấp Toàn Diện Hệ Thống NPC - Dynamic Agency, Nghề Nghiệp Song Hành, Tương Tác Trực Tiếp, Kỹ Năng Hiệp Đồng Hầm Ngục & Kế Thừa Huyết Thống (The Living City Overhaul)

* **Tư duy & Động lực Thiết kế (Design Philosophy & Canon Lore Integration):**
  * Chuyển hóa toàn diện NPC từ các thực thể cộng chỉ số thụ động (passive stat-sticks) thành những sinh mệnh sống động có cuộc đời, tham vọng, công việc và áp lực sinh tồn riêng tại The City.
  * Tích hợp sâu rộng các quy chuẩn canon của Project Moon: Fixer có văn phòng và cấp bậc sát hạch Hana (Grade 9 đến Grade 4), nhân viên Wing có Nest sở tại và nấc thang chức vụ (Probationary đến Team Lead), thành viên Syndicate có Ngón tay bảo hộ; kèm theo các áp lực đô thị khắc nghiệt (nợ nần lãi cắt cổ Backstreets, đào thải phế thể máy móc prosthetic, và tiếng thì thầm mời gọi của Carmen).

* **Nền tảng Dynamic Agency & Nghề nghiệp Độc lập (`src/data/npcPersonality.js`, `src/data/birthStories.js`):**
  * Tự động khởi tạo và chuẩn hóa hồ sơ cá nhân qua `ensureNpcAgency`: nghề nghiệp (`Fixer`, `Wing Employee`, `Syndicate`, `Workshop Artisan`, `Backstreets Stray`), cấp bậc (`rank`, `rankLabelVi`, `rankLabelEn`), địa bàn cư trú tại các Quận đặc thù (`NPC_DISTRICTS`), và kỹ năng hiệp đồng (`ARCHETYPE_DUNGEON_PERKS`).
  * Cơ chế theo dõi vi biến cố & khủng hoảng tâm lý (`crisis`): Nợ phi pháp (`debt`), Đào thải phế thể máy móc (`prosthetic`), Nguy cơ biến dị sa ngã (`distortion_risk`).
  * Sổ ân oán và ký ức tương tác (`debts`, `memories`): theo dõi món nợ ân tình (`favorCount`), nợ qua lại và lịch sử sát cánh qua từng biến cố cuộc đời.

* **Bảng Hành Động Tương Tác Đồng Hành Trực Tiếp (`src/engine/npcInteractions.js`, `src/store/gameStore.js`):**
  * Bổ sung cơ chế tương tác trực tiếp với bạn đồng hành / người thân trong kế hoạch năm hoặc từ hồ sơ:
    * `drink_confide` (Uống rượu giãi bày): Tiêu tốn 4 Ahn, hồi phục +10 Sanity, +6 Bond, giải tỏa 25 điểm khủng hoảng của NPC, khắc ghi ký ức tâm tình.
    * `spar_coordinate` (Luyện kiếm / Thao dượt hiệp lực): Tiêu hao 2 HP thể lực, +4 Bond, kích hoạt trạng thái phối hợp tác chiến `char.companionSynergy`.
    * `emergency_aid` (Cứu viện hoạn nạn): Khi NPC rơi vào khủng hoảng nghiêm trọng, tiêu tốn 15 Ahn hoặc 8 Rep để cứu viện dập tắt khủng hoảng, nhận lại +1 món nợ ân tình (`favorCount + 1`) và +20 Bond sâu sắc.
    * `call_favor` (Đòi nợ ân tình / Nhờ vả đặc quyền nghề nghiệp): Sử dụng 1 món nợ ân tình (hoặc 6 điểm Bond gắn kết) để nhận trợ giúp đặc quyền tùy theo công việc của NPC:
      * Wing: Tiếp nhận ống tiêm K Corp phục hồi 35 HP.
      * Syndicate: Xóa bớt 25 điểm Heat truy nã ngầm.
      * Fixer: Mở rộng mạng lưới (+14 Network, +10 Rep, +4 Merit).
      * Khác: Chăm sóc tinh thần (+15 Sanity, +8 HP).

* **Tiến trình Cuộc sống Tự trị & Kịch bản Vi mô (`src/engine/narrativeArcEngine.js`):**
  * Trong `simulateNpcAutonomousLife`, NPC tự phát triển sự nghiệp theo năm tháng (Fixer thăng cấp từ Grade 9 lên Grade 4, nhân viên Wing từ tập sự lên trưởng nhóm).
  * Tự tích tụ căng thẳng và phát tác khủng hoảng, phát tín hiệu cảnh báo trực tiếp đến người chơi khi cận kề biến dị hoặc phá sản.

* **Tác chiến Hiệp đồng & Khiên Sinh mệnh trong Dungeon (`src/engine/dungeonEngine.js`, `src/engine/dungeonCombat.js`):**
  * Khai mở 18 Archetype Dungeon Perks: `parry` (gạt đòn hiểm hóc), `calm` (ngọn hải đăng trấn an tâm trí), `first_aid` (cứu thương trạm nghỉ), `ration` (tiết kiệm chi phí nghỉ), `vanguard`, `tactician`, `clash`, v.v.
  * Khiên Sinh Mệnh (Mortal Aegis / Interception): Khi người chơi chịu đòn chí mạng trong hầm ngục hoặc gauntlet tử chiến, đồng đội mang perk bảo hộ (`shield`) hoặc khi đã kích hoạt `companionSynergy` sẽ lao vào đỡ đòn, giữ người chơi sống sót ở 5 HP, NPC chịu thương tật (`status: 'wounded'`) hoặc hy sinh anh dũng.

* **Kế thừa Huyết thống & Mối Thâm thù Xuyên Thế hệ (`src/engine/gameEngine.js`):**
  * Bảo lưu toàn vẹn mạng lưới NPC trong `buildLifeSummaryAndLegacy`.
  * Thế hệ sau (đặc biệt là hướng đệ tử `apprentice`) kế thừa đồng đội cũ của tiền nhân làm sư phụ định hướng (`mentor`), và kẻ thù chưa dứt điểm (`nemesis`) trở thành mối đe dọa truyền đời.

* **Giao diện Dossier Hồ sơ Noir & Mobile Bottom-Sheet (`NpcDossierModal.jsx`, `CharacterDossierCard.jsx`, `play.css`, `overlays.css`):**
  * Thiết kế giao diện thẻ hồ sơ Project Moon bí mật, hiển thị chi tiết thân thế, địa bàn, cấp bậc, kỹ năng hiệp đồng, thanh đo khủng hoảng và lịch sử ký ức.
  * 4 nút bấm tương tác trực quan với điều kiện, chi phí và phản hồi thời gian thực.
  * Tương thích 100% desktop modal và mobile bottom-sheet với thanh kéo trượt, hỗ trợ safe-area insets trên thiết bị di động.

* **Kiểm thử & Khắc phục Lỗi Logic Toàn diện:**
  * Tạo bộ kiểm thử chuyên dụng `tests/test_npc_dynamic_agency.mjs` tích hợp vào luồng `npm test`.
  * Sửa lỗi gán hằng số `let spDelta` trong `src/engine/dungeonEngine.js`.
  * Sửa từ ngữ gây cảnh báo giả định vai trò `em vợ` thành `người em họ` trong `src/data/careerContractsMiddle.js`.
  * Đạt 100% qua toàn bộ 49 suites (`npm test`), story linter, voice linter (0 errors trên 31.438 chuỗi), rhythm scan, 500-moment Million Audit.
  * Story logic audit 100 kiếp nhân sinh (`tools/sim/story_logic_audit.mjs 100`): 0 logic violations trên 15.112 khoảnh khắc đời người.
  * Production Vite Build thành công 100% trong 7.05s.
  * Git remote: Đã commit và push đồng bộ lên nhánh `main`.


### Đợt 61 (26/10/2026): Tối Ưu Hóa Toàn Diện Hệ Thống Hầm Ngục - Gimmick Dị Thể & Môi Trường, Trích Xuất Cổ Vật Kỳ Tích, Hội Thoại Đồng Hành Tại Chặng & Game Feel Nhịp Tim Hoảng Loạn

* **Gimmick Dị thể & Khắc chế Môi trường (`DUNGEON_GIMMICKS` trong `src/engine/dungeonEngine.js`):**
  * Tích hợp cơ chế môi trường và quy tắc dị thể đặc thù cho toàn bộ các địa danh thám hiểm:
    * *WARP Train (`warp_pressure`):* Áp suất dị chiều gây nhiễu loạn không gian; khi áp lực tâm thần cao, sát thương trượt kiểm định tăng nhưng thế Thận trọng (`guarded`) giảm 50% chấn động.
    * *L Corp Ruins (`qlippoth_meltdown`):* Băng hoại Qlippoth tăng dần theo từng chặng; thao tác Dò đường (`E`) hoặc thẻ Dò xét giúp giải trừ mức báo động.
    * *Great Lake (`lake_currents`):* Sóng ngầm Đại Hồ U Corp gia tăng cơ hội kiểm định Thể lực nhưng tăng áp lực tinh thần cho Thần kinh.
    * *Bloodfiend Carnival (`crimson_carnival`):* Khát vọng huyết hội La Manchaland: kiểm định thành công hồi phục sinh lực, thất bại rút thêm máu.
    * *Outskirts Ruins (`ancient_relic_decay`):* Bụi kim loại cổ đại bào mòn trang bị; tăng chi phí nghỉ thở nhưng nhặt thêm 20% giá trị cổ vật.
    * *Backstreets Night (`sweeper_hour`):* Khung giờ Sweeper phong tỏa 3:13 đến 4:34; rút lui an toàn nhận thêm danh tiếng.
  * Hiển thị huy hiệu Gimmick trực quan (`.dg-gimmick-badge`) tại góc tiêu đề của `DungeonDock.jsx`.

* **Trích xuất Cổ vật Kỳ tích & Trang bị Đặc chế (`DUNGEON_EXTRACTION_REWARDS` & `src/data/itemsData.js`):**
  * Chinh phục hoàn tất hầm ngục (Conquest) mở khóa cơ hội thu hồi cổ vật độc bản vào kho đồ nhân vật (`char.inventory`):
    * L Corp Ruin: `rel_qlippoth_core` (Lõi Qlippoth L Corp - giảm 15% áp lực tâm thần trong mọi hầm ngục).
    * WARP Train: `rel_warp_shard` (Mảnh Dị Chiều W Corp - né tránh các vết nứt không gian).
    * Bloodfiend Carnival: `wpn_carnival_rapier` (Liễu Kiếm Huyết Hội - vũ khí hút sinh lực).
    * Great Lake: `rel_pallid_oil` (Dầu Tinh Chất Cá Voi Trắng - neo giữ lý trí).
    * Outskirts Ruins: `rel_ruin_monolith` (Phiến Đá Khắc Outskirts - vĩnh viễn +16 Resonance).
    * Backstreets Night: `rel_sweeper_fluid` (Huyết Thanh Sweeper 3:13).
  * Cổ vật lưu trữ vĩnh viễn và có thể truyền lại cho đời sau qua hệ thống kế thừa huyết thống.

* **Hội thoại Đồng hành Sống động tại Chặng (`COMPANION_STAGE_BANTER` & `src/data/dungeonExtras.js`):**
  * Tích hợp phát ngôn đồng hành theo sát 10 tính cách (Archetype: `hothead`, `cautious`, `veteran`, `loyal`, `gambler`, `idealist`, `tinkerer`, `cynic`, `proud`, `silent`).
  * Trích dẫn thoại được bố trí trang nhã (`.dg-companion-banter`) ngay dưới tiêu đề từng chặng thám hiểm, mang lại không khí đồng đội vào sinh ra tử.

* **Game Feel: Nhịp tim Hoảng loạn & Rung chấn Thị giác (`src/engine/audioEngine.js` & `dungeon-fx.css`):**
  * Kỹ thuật âm thanh Web Audio API: phương thức `playHeartbeat(rate)` tạo tiếng đập hai pha (lub-dub) dồn dập khi áp lực tâm thần vượt ngưỡng nguy cấp (`strain >= 70`).
  * Thêm `playClashSpark()` tái hiện tiếng kim khí ma sát và tia lửa chém đỡ.
  * Hiệu ứng `.dock.is-dungeon.is-panic-high`: viền đỏ mờ (cardiac vignette) nhấp nháy chậm theo nhịp tim, tạo cảm giác ngột ngạt chân thực.

* **Kiểm thử & Khắc phục Toàn vẹn:**
  * Tạo bộ kiểm thử chuyên dụng `tests/test_dungeon_enhancements.mjs` tích hợp vào luồng `npm test` (vượt qua toàn bộ 50/50 suites).
  * Voice linter & Story linter 31.438 chuỗi: 0 lỗi.
  * Production Vite Build: hoàn tất 100% trong 7.14s.
  * Git remote: Đồng bộ thành công lên nhánh `main`.

### Đợt 62 (26/10/2026): Đặc Cách Thần Đồng Color (Hana Directive Zero - Tuổi 26–34), Nhánh Sự Nghiệp Chuyên Biệt `job === 'Color Fixer'` & Tuyến Truyện Đỉnh Cao 9 Sự Kiện Kỳ Quan Project Moon

* **Cơ chế Thần đồng Đặc cách Thăng phong Color (Hana Directive Zero - Nghị định số 0 của Hiệp hội Hana):**
  * Giải quyết vấn đề nhịp game trước đây (Color thường chỉ đạt được ở tuổi 40–50 hoặc cuối đời) bằng việc cho phép các cá nhân kiệt xuất được Hana triệu tập đại khảo thí Star of the City (`hana_color_ascension_trial`) ngay từ độ tuổi trẻ **26 đến 34 tuổi**.
  * Cho phép đặc cách nhảy cóc trực tiếp từ **Fixer Grade 2 hoặc Grade 3** lên thẳng Color Fixer mà không bắt buộc phải leo qua từng cấp bậc truyền thống nếu thỏa mãn một trong các lộ trình thần đồng:
    * *Track A - Thức tỉnh E.G.O Sớm (Kali / Gebura path):* Mang trạng thái `EGOAwakened`, đạt Merit $\ge 120$ và Rep $\ge 72$.
    * *Track B - Thần đồng Chiến tích & Di vật Bất khả thi (Roland / Argalia path):* Thu thập di vật/vũ khí kỳ tích (`rel_*`, `wpn_*`) hoặc lập chiến công diệt họa cấp Star of the City (`ProdigyFixer`, `KeptDungeonTrophy`, `StarConqueror`, `SoloStarConqueror`, `TabooHunter`), đạt Merit $\ge 130$ và Rep $\ge 75$.
    * *Track C - Đột phá Cộng hưởng Dị thường (Anomaly Resonance):* Chỉ số Resonance $\ge 50$ kết hợp Merit $\ge 130$ và Rep $\ge 75$.
  * Bổ sung hằng số quy chuẩn `COLOR_FIXER_REQ_PRODIGY = { merit: 140, rep: 78, age: 26 }` trong `src/engine/careerPipeline.js` và tích hợp đồng bộ vào bộ máy xét duyệt `checkColorFixerReadiness(char)`.

* **Xây dựng Nhánh Nghề nghiệp Độc lập Chuyên biệt `Color Fixer` (`job === 'Color Fixer'`):**
  * Khi chính thức vượt qua khảo thí và nhận sắc danh Màu, nhân vật được chuyển giao toàn diện sang chức nghiệp `char.job = 'Color Fixer'`, đẳng cấp danh nghĩa `char.fixerGrade = 0`, gắn cờ vĩnh viễn `char.flags.push('ColorFixer')` và ghi nhận danh hiệu Color độc bản qua giao diện phong hiệu Hana.
  * **Thu nhập Đỉnh cao:** Nâng mức phụ cấp `JOB_INCOME` của Color Fixer lên mức tối thượng **12 Ahn/năm** (vượt trội so với Fixer Grade 1 là 8 Ahn và Wing Executive là 7 Ahn).
  * **Tiếp tục Hợp đồng Đỉnh cao:** Hàm `contractRouteOf` trong `careerContracts.js` công nhận `Color Fixer` duy trì tuyến hợp đồng Fixer với cấp lực chiến `equivalentGrade = 0` (tiếp cận trọn vẹn Requests Tier 5 Star of the City).
  * **Hài hòa Bất biến Engine & Kiểm định Triệu khoảnh khắc:**
    * `src/engine/storyInvariants.js`: Cho phép `char.job === 'Color Fixer'` đồng hành cùng `fixerGrade === 0` và cờ `ColorFixer`, ngăn ngừa báo động sai lệch trạng thái.
    * `tools/sim/run_million_audit.mjs`: Miễn trừ quy tắc kiểm tra nhảy bậc (`STATS.fixerGradeSkipViolations`) và đa bậc trong năm đối với trường hợp thăng phong Color Fixer hợp lệ.
    * `src/engine/yearPlanner.js`: Điều chỉnh hao mòn thể lực (`job_wear`) và điểm Merit hàng năm cho `Color Fixer`.
    * `src/engine/gameEngine.js`: Đồng bộ hóa hiển thị mục tiêu cột mốc sự nghiệp `getNextCareerMilestone` sang huy hiệu `COLOR FIXER ASCENSION: Sovereign Legend of The City`.

* **Tuyến Truyện & Nhiệm vụ Đỉnh cao Dành Riêng Cho Color (`src/data/eventsColorCareerArc.js`):**
  * Sáng tác trọn vẹn **9 sự kiện cốt truyện lớn** mang đậm triết lý và không khí tàn khốc, bi tráng của vũ trụ Project Moon, song ngữ Việt - Anh chuẩn chỉnh, vượt qua 100% Voice Linter và Story Linter:
    1. `color_arc_found_office`: Khai trương Văn phòng Color Bản mệnh (dựng cờ tại Backstreets D23 đón kẻ bần cùng hoặc thuê penthouse Nest ký kết đồng minh cùng Wing).
    2. `color_arc_star_aberration`: Trấn áp Dị thể Cấp Star of the City (đối đầu quái vật cấu trúc dị hình vượt qua giới hạn phong tỏa).
    3. `color_arc_wing_proxy_war`: Can thiệp Chiến tranh Ủy nhiệm Singularity (đứng giữa hai tập đoàn Corp chuẩn bị kích hoạt vũ khí hủy diệt).
    4. `color_arc_beholder_scrutiny`: Ánh Nhìn của Mắt Thần Beholder B Corp (cuộc đối mặt với thanh tra toàn giác và ranh giới Điều Cấm Kỵ The Head).
    5. `color_arc_disciple_recruitment`: Thu nhận Đệ tử Thần đồng Kế tục (truyền thụ đao kiếm cho thiếu niên mồ côi mang mầm mống thiên bẩm).
    6. `color_arc_rival_color_duel`: Tỉ thí Đỉnh cao giữa Hai Color Huyền thoại (đọ kiếm thâu đêm tại tàn tích cổ đại, thử thách sinh tử và sự tôn trọng của bậc tôn sư).
    7. `color_arc_taboo_workshop_commission`: Đúc Vũ khí Bản mệnh tại Workshop Cổ xưa (rèn đúc kiệt tác vũ khí phát sáng sắc màu linh hồn).
    8. `color_arc_backstreets_aegis`: Tấm Khiên Phố Ngầm (đứng ra bảo vệ khu chợ nghèo Backstreets trước liên minh cướp bóc nội tạng).
    9. `color_arc_legacy_transmission`: Trao Lại Áo Choàng Color Khi Về Già (di chúc truyền thừa sắc danh cho thế hệ sau khi sức tàn lực kiệt).

* **Kiểm định Toàn vẹn & Triển khai:**
  * Bổ sung test suite `tests/test_color_career_arc.mjs` và tích hợp vào quy trình `package.json` (`npm test`).
  * Toàn bộ 51 test suites đạt kết quả 100% OK.
  * Voice linter 31.571 chuỗi và Story linter: 0 lỗi, 0 cảnh báo.
  * Story logic audit 100 cuộc đời (15.570 khoảnh khắc): 0 vi phạm logic.
  * Vite production build: hoàn thành thành công trong 6.80s.

### Đợt 63 (26/10/2026): Tinh Chỉnh & Cân Bằng Toàn Diện Mọi Tuyến Truyện (Wing, Distortion, Color Fixer, 5 Ngón Tay Syndicate) Lấy Nhánh Fixer Làm Chuẩn Mực Parity

* **Nâng Cấp Tuyến Nhân Viên Tập Đoàn Wing Employee (`src/data/eventsWingParityExpansion.js`):**
  * Đưa quy mô nội dung của Wing lên ngang tầm tương tác phong phú của Fixer:
    * **Major Events (+2 sự kiện lớn):** `wing_arc_singularity_meltdown_containment` (khủng hoảng rò rỉ lò phản ứng Singularity, lựa chọn xông vào cứu viện hay phong tỏa cô lập) và `wing_arc_corporate_patent_warfare` (chiến tranh bằng sáng chế khốc liệt giữa 2 tập đoàn Wing, đấu trí ngoại giao hoặc bán tài liệu mật).
    * **Minor Rapid Dilemmas (+8 sự kiện vi mô 15s):** Xoay quanh các Singularity nổi tiếng (thẻ thuế thời gian T Corp, ống huyết thanh xanh K Corp, dọn dẹp khoang hạng nhất W Corp, buồng nhân bản R Corp, tố giác xả thải, chạm trán thang máy Giám đốc).
    * **Daily Lines (+10 dòng thường nhật):** Tái hiện không khí Nest vô cảm, đèn huỳnh quang 6:00 AM, ống gel dinh dưỡng, tiếng máy rung ngầm, trạm kiểm soát di dân.

* **Nâng Cấp Tuyến Thực Thể Biến Dị Distortion (`src/data/eventsDistortionParityExpansion.js`):**
  * Khắc phục triệt để tình trạng thiếu hụt sự kiện vi mô và đơn điệu khi biến dị:
    * **Major Events (+2 sự kiện đại họa):** `distort_arc_star_calamity_ascension` (Hana nâng cấp định danh lên Star of the City, đụng độ Giám đốc Section 1 của Liu Association) và `distort_arc_ego_clash_manifestation` (va chạm kịch liệt giữa ánh sáng E.G.O thức tỉnh và khát vọng bạo liệt của Distortion).
    * **Minor Rapid Dilemmas (+6 sự kiện 15s):** Lời mời gọi cánh hoa trắng của Carmen, đao phủ Shi Association phục kích, thu hoạch làn sóng sợ hãi tại chợ Backstreets, soi bóng gương vũng nước, đứa trẻ mồ côi không biết sợ, nuốt vụn thép cỗ máy Workshop.
    * **Daily Lines (+8 dòng thường nhật):** Khúc hát ru trong tủy sống của Carmen, cánh hoa pha lê mọc xuyên da thịt, thính giác nghe rõ nhịp tim 3 dãy nhà, bầy Sweeper dạt sang hai bên lúc 3:13 AM.

* **Nâng Cấp Tuyến Huyền Thoại Color Fixer (`src/data/eventsColorExpansionSuite.js`):**
  * Làm giàu nhịp sống và thế đứng của một Color Fixer đương thời:
    * **Minor Rapid Dilemmas (+4 sự kiện 15s):** Tân binh Grade 1 thách đấu ngông cuồng tại quán rượu, công văn khẩn của Seven Association xin chữ ký tối thượng, tài phiệt Nest quỳ xin tị nạn trước Beholder B Corp, triệt phá lò rèn dập nổi con dấu Color giả mạo.
    * **Daily Lines (+8 dòng thường nhật):** Đám cướp nép sát tường khi bạn đi qua, chủ quán HamHamPangPang cung kính tiếp đãi miễn phí, mài vũ khí bản mệnh lúc rạng sáng 5:00 AM, phong bì hoa héo từ kẻ thù giấu mặt.

* **Bổ Sung Canh Bạc May Rủi & Tương Tác Sống Động Cho 5 Ngón Tay Syndicate (`src/data/eventsFingersGambleSuite.js`):**
  * Bổ sung 5 sự kiện đại canh bạc mang tính thử thách và rủi ro cực cao, tối ưu hóa yếu tố gameplay máy rủi và liên kết chặt chẽ với NPC đồng đội:
    * **Thumb (`syn_thumb_gamble_etiquette_duel`):** Canh bạc Đấu trường Nghi thức, dùng súng lục nạp một viên quyết đấu vì danh dự đồng đội bị vu cáo chào sai góc độ.
    * **Index (`syn_index_gamble_blank_prescript`):** Canh bạc Chỉ lệnh Trống, thấu thị dòng chảy của Thần Dệt qua hành động táo bạo hay quy phục tuyệt đối.
    * **Middle (`syn_middle_gamble_great_vendetta`):** Đại huyết thù Sổ Huyết Hận, đột kích sòng bạc kiên cố đòi nợ máu cùng huynh đệ kết nghĩa.
    * **Ring (`syn_ring_gamble_flesh_gallery`):** Đại triển lãm giải phẫu kỳ dị của Maestro, đánh cược chính cơ thể sống để rèn đúc kiệt tác.
    * **Pinky (`syn_pinky_gamble_unbroken_oath`):** Quyết đấu lập thệ trên bến phà sương mù District 21, cược cả bàn tay kiếm pháp vào một nhát chém duy nhất.

* **Kiểm Thử Toàn Diện & Đảm Bảo Parity Tuyệt Đối:**
  * Bổ sung bộ kiểm thử chuyên dụng `tests/test_all_routes_parity_expansion.mjs` xác nhận 100% các sự kiện mới đăng ký trọn vẹn vào `ALL_STORY_EVENTS`, `LIFE_MINORS`, và `LIFE_DAILIES`.
  * Toàn bộ **52/52 test suites** của dự án vượt qua thành công trong `npm test`.
  * Voice linter 32.122 chuỗi đạt **0 lỗi**; Story linter đạt **0 lỗi, 0 cảnh báo** (Tổng kho tăng lên: 737 Majors, 866 Minors, 572 Dailies).
  * Story logic audit 100 cuộc đời (16.388 khoảnh khắc): **0 vi phạm logic**.
  * Production Vite build biên dịch thành công 100% trong 6.97s.

### Đợt 64 (27/10/2026): Nâng Cấp Hệ Thống Toàn Diện 5 Trụ Cột — Di Sản Sống Liên Thế Hệ, Du Hành Liên Quận & Đặc Tính Singularity, Chỉ Thị Thủ Lĩnh Đỉnh Cao, Lò Khảm Cổ Vật & Tối Ưu Hóa Code-Splitting

* **1. Hệ Thống "Di Sản Sống" Liên Thế Hệ & Đài Tưởng Niệm Dòng Tộc (`src/engine/cityUpgrades.js`, `src/engine/gameEngine.js`, `src/data/eventsLineageLegacy.js`, `src/features/bloodline/BloodlinePage.jsx`):**
  * **Lưu vết Đỉnh cao Tiền nhân (`extractAncestorEchoProfile`, `applyAncestorEchoInheritance`):** Khi một kiếp sống kết thúc ở vị thế đỉnh cao (**Color Fixer**, **Distortion**, **Finger Underboss/Maestro/Proxy**, **Wing Executive**, hoặc **Workshop Meister**), thế hệ kế thừa tiếp nhận trực tiếp cờ di sản (`AncestorWasColor`, `AncestorWasDistortion`, `AncestorWasFingerBoss`, `AncestorWasWingExec`, `AncestorWasMeister`), chỉ số khởi đầu cộng thêm và sự kiện nhân quả riêng biệt:
    * `m_lineage_color_shadow_trial`: Khảo sát thực chiến tại sân tập Hana Association trước thanh tra lão niên từng biết danh hiệu Color của đời trước, mở khóa cơ hội nhận cờ thần đồng `ProdigyFixer`.
    * `m_lineage_distortion_labyrinth_echo`: Bước vào vùng sương mù phong tỏa nơi dư chấn Distortion của tiền nhân vẫn lặp lại nỗi ám ảnh cuối đời, giải thoát ý thức người cũ (+28 Resonance, +30 Merit) hoặc thu hoạch tinh thể Enkephalin.
    * `m_lineage_finger_turf_remnant`: Tiếp quản kho quỹ ngầm và toán cựu binh Syndicate trung thành còn giữ tín vật của đời trước.
    * `m_lineage_wing_trust_vault`: Mở két sắt sinh trắc học tại trung tâm Nest để thanh khoản cổ phiếu ưu đãi hoặc nắm hồ sơ đen làm đòn bẩy chính trị.
  * **Đài Tưởng Niệm Dòng Tộc (`summarizeDynastyHallOfLegends` trong `BloodlinePage.jsx`):** Hiển thị bảng tổng kết thành tựu xuyên thế hệ (số lượng Color, E.G.O, Distortion, Thủ lĩnh đỉnh cao, Tổng di sản Ahn) và huy hiệu các bậc tiền nhân huyền thoại ngay đầu trang Gia Phả.

* **2. Du Hành Liên Quận Chủ Động & Đặc Tính Singularity Từng District (`TRANSIT_HUBS`, `relocateCharacterDistrict`, `applyRegionalSingularityPassive`):**
  * Mở tab **Vé Tàu & Chuyển Quận (District Transit)** trong `WorkshopDepotModal.jsx` cho phép người chơi chủ động mua vé Tàu WARP hoặc Đoàn xe Devyat' (giảm 50% chi phí cho cư dân Nest, Color Fixer và Quản lý Wing) để di chuyển sang 6 trung tâm Singularity lớn:
    * **District 11 (K Corp):** Bụi nanobot hồi phục +12 HP ngay khi đến và +3 HP mỗi cuối năm nếu bị thương.
    * **District 10 (J Corp):** Bùa vận mệnh Wishpower cộng +8 Leverage, +4 Rep khi đến và sinh lời +2 Ahn, +2 Leverage mỗi cuối năm.
    * **District 12 (L Corp Cũ):** Sương mù Enkephalin kích thích +8 Resonance, +6 Merit khi đến và +2 Resonance, +2 Merit mỗi cuối năm.
    * **District 20 (T Corp):** Vay thời gian công nghiệp (`TCorpTimeBorrowed`) nhận +6 Merit, +4 Ahn khi đến và +2 Merit mỗi cuối năm.
    * **District 16 (P Corp):** Vòm bảo tồn không gian hồi +10 SP, +6 HP, -6 Heat khi đến và +3 SP mỗi cuối năm.
    * **District 19 (U Corp):** Cảng Đại Hồ cộng +8 Network, +4 Rep, gắn cờ `GreatLakeHardened` kháng hiểm họa Đại Hồ và +2 Network mỗi cuối năm.

* **3. Bảng Chỉ Huy Thủ Lĩnh Đỉnh Cao (`APEX_DIRECTIVES`, `isApexCommander` trong `annualPlan.js` & `YearPlanDock.jsx`):**
  * Khi nhân vật đạt cấp lãnh đạo (`Color Fixer`, `Fixer Grade 1–2`, `Chủ Office`, `Section Director`, `Finger Rank 2+`, `Wing Rank 2+`, hoặc `Thợ Rèn Meister`), màn hình Kế Hoạch Năm (`YearPlanDock.jsx`) mở khóa thêm **Chỉ Thị Thủ Lĩnh (Apex Command Directive)** song hành cùng 3 ô thời gian cá nhân:
    * `dispatch_squad` (*Phái Đội Thực Chiến*): Cử thuộc hạ giải quyết ủy thác phụ (+5 Ahn, +6 Merit, +3 Danh tiếng).
    * `fortify_turf` (*Củng Cố Lãnh Địa & Hậu Cần*): Siết chặt an ninh địa bàn và trạm y tế (-8 Heat, +5 HP, +5 SP, +4 Leverage).
    * `mentor_network` (*Bồi Dưỡng Đệ Tử & Thế Lực*): Truyền dạy kỹ năng và mở rộng thế lực (+6 Network, +5 Resonance, +4 Merit, và +5 Bond cho toàn bộ đồng hành/người thân đang sống).

* **4. Lò Khảm Cổ Vật Singularity (`IMBUEMENT_RECIPES`, `imbueCharacterEquipment` trong `WorkshopDepotModal.jsx`, `gameEngine.js`, `dungeonEngine.js`):**
  * Mở tab **Khảm Singularity (Imbuement)** trong `WorkshopDepotModal.jsx`, cho phép dung hợp 5 Cổ vật Hầm ngục (`rel_qlippoth_core`, `rel_warp_shard`, `rel_pallid_oil`, `rel_ruin_monolith`, `rel_sweeper_fluid`) vào Vũ khí/Giáp Workshop hoặc tuyệt tác `craftWeapon`.
  * Gia tăng trực tiếp Sức chiến đấu hợp đồng (`getImbuedCombatBonus`), tăng khả năng kháng sát thương & tỉ lệ kiểm định trong Hầm ngục (`getDungeonMastery` với nhãn `Khảm Singularity / Singularity Imbued`), và đổi tên vũ khí theo tiền tố Singularity.
  * Đặc quyền riêng cho nhánh **Workshop Craftsman** (hoặc hậu duệ Meister `AncestorWasMeister`): miễn phí 100% chi phí dung hợp lò rèn, cộng thêm +6 Sức chiến đấu và +10 Merit mỗi lần khảm.

* **5. Tối Ưu Hóa Kỹ Thuật & Phân Mảnh Gói Dữ Liệu (`vite.config.js`):**
  * Tách gói `story-events` (trước đây nặng > 1.23 MB) thành 3 phân mảnh độc lập được bộ nhớ đệm trình duyệt lưu trữ riêng (`story-career`: 286 kB, `story-events`: 429 kB, `story-factions`: 493 kB), vượt qua kiểm định chống vòng lặp import `noChunkCycles`.
  * Bộ kiểm thử mới `tests/test_batch64_system_upgrades.mjs` tích hợp vào `npm test`, nâng tổng số lên **53/53 bộ test suites** đạt 100%.


### Đợt 65 (27/10/2026): Tinh Chỉnh Cân Bằng "Hard But Fair" & Logic Ngữ Cảnh Nghiêm Ngặt Toàn Hệ Thống

* **Triết Lý Thiết Kế "Hard But Fair" (Tham chiếu *Darkest Dungeon*, *Sunless Sea*, *Cultist Simulator*, *Frostpunk*, *Library of Ruina*):**
  * Loại bỏ hoàn toàn cơ chế "buff miễn phí" (free lunch) và các lựa chọn thắng tuyệt đối 100% không rủi ro; mọi nguồn sức mạnh, đặc quyền dòng tộc, công nghệ Singularity hay quyết định lãnh đạo đều đi kèm cái giá đánh đổi tương xứng và logic ngữ cảnh chặt chẽ.

* **1. Cái Giá Của Di Sản Tiền Nhân (`applyAncestorEchoInheritance` trong `src/engine/cityUpgrades.js`, `src/engine/gameEngine.js`, `src/data/eventsLineageLegacy.js`):**
  * Kế thừa danh tiếng đỉnh cao luôn đi kèm sự dòm ngó của kẻ thù cũ và di chứng tâm lý:
    * `AncestorWasColor`: `+8 Rep`, nhưng gánh `+8 Heat` từ những kẻ muốn săn lùng hậu nhân của một Color.
    * `AncestorWasDistortion`: `+8 Resonance`, nhưng chịu `-4 SP` do tiếng vọng ám ảnh từ tiền kiếp.
    * `AncestorWasFingerBoss`: `+7 Network`, nhưng cộng `+10 Heat` từ các băng đảng đối địch.
    * `AncestorWasWingExec`: `+10 Ahn`, nhưng cộng `+6 Heat` từ bộ phận kiểm toán nội bộ Nest.
  * Bổ sung khóa ngữ cảnh `forbids: ['Distorted']` cho các sự kiện sân tập Hana (`m_lineage_color_shadow_trial`), tiếp quản kho ngầm Syndicate (`m_lineage_finger_turf_remnant`), và két sắt sinh trắc học Nest (`m_lineage_wing_trust_vault`).
  * Chuyển các lựa chọn đối kháng/mạo hiểm trong 4 sự kiện di sản sang hệ thống nhánh xác suất `outcomes` (60–65% thành công / 35–40% trả giá đắt bằng HP, SP, Scars hoặc bị phản đòn), đồng thời thêm lựa chọn thứ 3 an toàn nhưng đánh đổi lợi ích thực dụng.

* **2. Tác Dụng Phụ Singularity & Dư Chấn Tàu WARP Phổ Thông (`TRANSIT_HUBS`, `relocateCharacterDistrict`, `applyRegionalSingularityPassive`):**
  * Hành khách đi **Tàu WARP Khoang Phổ Thông** (không có thẻ VIP/Nest/Color) phải chịu dư chấn không gian `-3 SP, +3 Resonance` đúng chuẩn lore W Corp.
  * Mỗi trung tâm Singularity đều có mặt trái khi đặt chân đến và chi phí duy trì hàng năm:
    * **K Corp (District 11):** Hồi `+12 HP` khi đến nhưng cảm giác mô thịt tự mọc lại gây rùng mình (`-3 SP`); cuối năm hồi `+3 HP` nhưng trừ `-2 Ahn` phí bảo trì y tế (miễn trừ cho Quản lý Wing cấp cao).
    * **J Corp (District 10):** Bùa Wishpower cộng `+6 Leverage, +4 Rep` nhưng kéo theo đám đòi nợ sòng bạc (`+4 Heat`); cuối năm kiểm định bản lĩnh tâm lý: nếu `SP >= 55` thì thắng cược (`+3 Ahn, +2 Leverage`), nếu tâm loạn (`SP < 55`) thì cháy túi (`-3 Ahn, -2 SP`).
    * **L Corp Cũ (District 12):** Cộng `+8 Resonance, +6 Merit` nhưng sương mù Enkephalin bào mòn `-5 SP` khi đến và `-2 SP` mỗi cuối năm.
    * **T Corp (District 20):** Vay thời gian nhận `+6 Merit, +4 Ahn` nhưng đồng hồ 28 giờ vắt kiệt `-5 HP` khi đến và `-2 HP` mỗi cuối năm.
    * **P Corp (District 16):** Vòm bảo tồn hồi `+8 SP, +5 HP, -6 Heat` nhưng sống khép kín làm đứt gãy `-3 Network` khi đến và `-1 Network` mỗi cuối năm.
    * **U Corp (District 19):** Mở rộng giao thương `+8 Network, +4 Rep` nhưng sương muối Đại Hồ bào mòn `-4 HP` khi đến và `-1 SP` mỗi cuối năm.

* **3. Trách Nhiệm & Chi Phí Của Chỉ Thị Thủ Lĩnh (`APEX_DIRECTIVES`, `applyApexDirective`):**
  * `dispatch_squad` (*Phái Đội Thực Chiến*): Thu về `+5 Ahn, +6 Merit, +3 Rep`, nhưng việc mở rộng hoạt động khiến kẻ thù chú ý (`+5 Heat`) và gây áp lực chỉ huy (`-3 SP`).
  * `fortify_turf` (*Củng Cố Lãnh Địa*): Giảm `-8 Heat`, hồi `+5 HP, +5 SP, +4 Leverage`, nhưng bắt buộc tiêu tốn `-5 Ahn` quỹ bảo vệ (hoặc mất `-3 Rep` nếu kiệt quệ tài chính).
  * `mentor_network` (*Bồi Dưỡng Đệ Tử*): Tăng `+6 Network, +5 Resonance, +4 Merit` và `+5 Bond` đồng đội, đổi lại tốn `-4 Ahn` chi phí huấn luyện và `-3 HP` hao tổn sức lực thị phạm.

* **4. Phản Chấn Ăn Mòn Khi Khảm Cổ Vật Singularity (`IMBUEMENT_RECIPES`, `imbueCharacterEquipment`):**
  * Khảm cổ vật hầm ngục vào vũ khí mang lại sức mạnh vượt trội nhưng luôn đi kèm **Phản chấn Singularity (Singularity Corrosion)**:
    * `rel_qlippoth_core`: Phản chấn sinh học `-6 HP`.
    * `rel_warp_shard`: Rung chấn lệch chiều `-8 SP, +6 Heat`.
    * `rel_pallid_oil`: Ám ảnh sương trắng `-5 Network, +6 Resonance`.
    * `rel_ruin_monolith`: Tiếng vọng cổ ngữ `-10 SP, +6 Heat`.
    * `rel_sweeper_fluid`: Mùi máu đêm 3:13 AM `-6 SP, +8 Heat`.
  * Ngay cả **Workshop Craftsman** được miễn phí tiền công khảm cũng phải chịu `-3 HP` bỏng nhiệt lò rèn cùng toàn bộ phản chấn cổ vật.

* **5. Chuẩn Hóa Nhánh Rủi Ro & Chống Lạm Phát Kinh Tế Ở Sự Kiện Đỉnh Cao (`eventsColorCareerArc.js`, `eventsWingParityExpansion.js`, `eventsDistortionParityExpansion.js`):**
  * Khắc phục các lựa chọn đại sự kiện trước đây chỉ có 1 nhánh `outcomes` đơn lẻ (`wing_arc_corporate_patent_warfare`, `distort_arc_star_calamity_ascension`, `distort_arc_ego_clash_manifestation`), bổ sung nhánh thất bại 35% với hậu quả thực tế để tổng trọng số luôn đạt chuẩn `100%`.
  * Điều chỉnh mức thưởng tiền mặt quá đà trong `color_arc_wing_proxy_war` (từ `+120 Ahn` xuống `+48 Ahn` kèm 30% rủi ro trúng vũ khí Singularity tự hủy của đối phương) và `wing_arc_singularity_meltdown` (từ `+80 Ahn` xuống `+42 Ahn` kèm `+8 Taboo`), giữ vững nhịp cân bằng kinh tế toàn game.


### Đợt 66 (27/10/2026): Chuẩn Hóa UI/UX Toàn Diện 5 Trụ Cột — TasteSkill v2, AntiSlop, Tương Phản WCAG AA, Thao Tác Bàn Phím/Mobile & Game Feel

* **1. Thanh Lọc Chi Tiết UI Theo `tasteskill v2` & `antislop-ui` + `design-system` (`src/features/chronicle/components/Deltas.jsx`, `src/features/chronicle/components/NpcDossierModal.jsx`, `src/features/bloodline/BloodlinePage.jsx`, `src/styles/ui/overlays.css`, `src/styles/ui/pages.css`):**
  * Thay thế toàn bộ 11 ký tự dingbat/emoji trong `Deltas.jsx` (`STAT_ICONS`) bằng hệ thống chấm màu token ngữ nghĩa (`.delta-stat-dot` dùng `--s-health`, `--s-sanity`, `--s-wealth`, v.v.); thay thế các ký tự `⚠️`, `✕`, `◆` trong `NpcDossierModal.jsx` bằng icon nét mảnh `AlertTriangle`, `X` từ `lucide-react` và `.memory-bullet` CSS.
  * Loại bỏ toàn bộ 6 quy tắc `transition: all`, 2 nền gradient thừa trên thẻ tĩnh, phông `'Cinzel'` không nạp, và các mã màu hex Tailwind viết cứng (`#ef4444`, `#94a3b8`, `#4ade80`, `#f87171`, `#0d1117`, `#cbd5e1`) trong `overlays.css`, quy chuẩn 100% về hệ token trong `tokens.css`.
  * Chuyển toàn bộ inline style của Đài Tưởng Niệm Dòng Tộc và thanh công cụ trong `BloodlinePage.jsx` sang hệ class ngữ nghĩa trong `pages.css` (`.hall-panel`, `.hall-head`, `.hall-metrics`, `.hall-badges`, `.bloodline-toolbar`, `.bloodline-actions`).

* **2. Khôi Phục Tương Tác Hồ Sơ NPC, Điều Hướng Bàn Phím & Chuẩn Tương Phản WCAG AA (`src/features/chronicle/components/CharacterDossierCard.jsx`, `src/features/chronicle/components/NpcDossierModal.jsx`, `src/styles/ui/tokens.css`):**
  * Kết nối sự kiện click chuột và bàn phím (`Enter`/`Space`, `role="button"`, `tabIndex={0}`, `.npc.is-interactive`, nhãn gợi ý `Hồ sơ / Dossier`) cho từng thẻ NPC trong danh sách *Những người trong đời bạn* (`CharacterDossierCard.jsx`), giúp người chơi mở trực tiếp `NpcDossierModal.jsx` trên cả Desktop và Mobile.
  * Bổ sung xử lý phím `Escape`, tự động đặt focus vào nút đóng khi mở modal và trả lại focus khi đóng cho `NpcDossierModal.jsx`, kèm `:focus-visible` rõ nét cho thanh trượt âm thanh `.settings-slider`.
  * Tinh chỉnh `--accent` (`#c43232`) và `--accent-ink` (`#fff6f2`) trong `tokens.css`, nâng độ tương phản chữ trên nút chính lên **5.18:1** (vượt chuẩn WCAG 2.x AA `>= 4.5:1`).

* **3. Chuẩn Hóa Vùng Chạm Cảm Ứng Mobile & Safe-Area (`antislop-layoutmobile` — `src/styles/ui/overlays.css`, `src/styles/ui/pages.css`):**
  * Nâng kích thước vùng chạm của `.settings-close-btn`, `.npc-close-btn`, `.bloodline-clear-btn`, `.bloodline-play-btn` và các nút hành động trong bảng Gia Phả từ `32px` lên `40px–44px`, đảm bảo thao tác ngón tay chính xác trên màn hình hẹp `390px`.
  * Bổ sung `padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px))` cho `.settings-body` khi hiển thị dạng bottom-sheet trên thiết bị di động.

* **4. Hiển Thị Trực Quan Hóa Đánh Đổi Định Lượng "Hard But Fair" (`tasteskill v2` App-Screens — `src/features/chronicle/components/WorkshopDepotModal.jsx`, `src/features/chronicle/components/YearPlanDock.jsx`):**
  * Tích hợp dải chip chỉ số định lượng `tabular-nums` (`.depot-deltas` và `.directive-deltas` với màu phân cực `.delta.is-up` / `.delta.is-down` / `.delta.is-rare`) ngay dưới mỗi công thức **Khảm Cổ Vật Singularity**, mỗi tuyến **Vé Tàu & Chuyển Quận**, và mỗi **Chỉ Thị Thủ Lĩnh (Apex Command Directive)** để người chơi đọc nhanh cả lợi ích lẫn phản chấn/chi phí mà không phải dò từng chữ trong đoạn mô tả.

* **5. Phản Hồi Xúc Giác & Âm Thanh Đa Tầng (`game-feel` & `audio-design` — `src/features/chronicle/components/WorkshopDepotModal.jsx`):**
  * Phân tầng hiệu ứng khi thực hiện hành động trọng đại trong Workshop: **Khảm Cổ Vật Singularity** kích hoạt `audioEngine.playBuff()` + rung chấn màn hình `gameFeel.addTrauma(0.24)` kèm băng rôn trạng thái `.depot-feedback.is-imbue`; **Khởi Hành Liên Quận** kích hoạt `audioEngine.playCoinChime()` + `gameFeel.addTrauma(0.14)` kèm băng rôn xác nhận `.depot-feedback.is-transit`.
  * Bổ sung kiểm thử tự động Pillar 5 trong `tests/test_batch64_system_upgrades.mjs` và cố định seed kiểm thử trong `tests/test_dungeon_enhancements.mjs`; toàn bộ **53/53 bộ test suites** và bản build production đều đạt chuẩn 100%.


### Đợt 67 (27/10/2026): Tối Ưu Quản Lý Cấp Dưới & Ủy Thác Quyền Lực Đa Tuyến (Không Ôm Đồm UI, Bảo Toàn Tuyệt Đối Các Bài Test Lặp)

* **1. Mở Rộng Cơ Chế Thu Nạp & Đào Tạo Cấp Dưới (`mentee`) Sang Wing, Syndicate/Fingers & Color Fixer (`src/engine/affiliation.js`, `src/data/npcPersonality.js`, `src/engine/eventConditions.js`):**
  * Mở rộng `affiliationYearTick`, `plantStoryBeats` và `menteeYear` trong `src/engine/affiliation.js` để không chỉ Fixer mà cả **Color Fixer**, **Trưởng phòng / Giám đốc Wing (`wingRank >= 2`)** và **Chỉ huy / Thủ lĩnh Ngón Tay (`fingerRank >= 2`)** đều có thể thu nạp, kèm cặp và chứng kiến cấp dưới thân tín (`mentee`) trưởng thành qua từng năm.
  * Khi `mentee` được thu nạp hoặc xuất sư (`graduated: true`), chức danh nghề nghiệp trong hồ sơ NPC (`rankLabelVi` / `rankLabelEn`) và thông điệp biên niên sử tự động thích ứng với nhánh của người chơi: *Trợ lý Feather (Đệ tử)* → *Trưởng tổ Feather (Đã xuất sư)* ở Wing; *Đàn em kế cận The Finger* → *Chỉ huy nhánh phố (Đã xuất sư)* ở Syndicate; *Fixer trẻ (Đệ tử Grade 8)* → *Fixer độc lập (Đã xuất sư)* ở Hiệp hội/Fixer.

* **2. Hành Động Tương Tác Chỉ Huy "Ủy Thác Việc Tổ Chức" (`delegate_command`) Theo Triết Lý Hard-But-Fair (`src/engine/npcInteractions.js`, `src/features/chronicle/components/NpcDossierModal.jsx`):**
  * Bổ sung hành động thứ 5 **`delegate_command` (*Ủy thác việc tổ chức / Delegate Faction Task*)** trực tiếp vào bảng tương tác trong `NpcDossierModal.jsx` khi người chơi đạt cấp độ chỉ huy (`isFactionLeader`: Fixer Grade 2+, Chủ Office, Section Director, Color Fixer, Wing Rank 2+, hoặc Finger Rank 2+) và mở hồ sơ của `mentee` hoặc `partner` (yêu cầu `bond >= 35`, không bị thương/khủng hoảng, giới hạn 1 lần/năm).
  * **Đánh đổi Hard-But-Fair:** Cấp dưới thay mặt bạn giải quyết phần việc nhạy cảm của tổ chức, mang về **`+6 Merit`, `+6 Ahn`, `-10 Heat`** (cùng `+5 Standing` cho Wing hoặc `+4 Standing` cho Association và `+12` tiến độ đào tạo đệ tử), nhưng tiêu hao **`-6 Gắn kết`** do áp lực mệnh lệnh và có **35% rủi ro** cấp dưới rơi vào phục kích/thanh tra (`crisis.severity = 45`), đồng thời tự động gieo nhân quả sự kiện `aff_subordinate_reckoning` vào năm kế tiếp.

* **3. Chuỗi Sự Kiện Nhân Sự Ngữ Cảnh (`causalOnly: true`, Không Gây Loãng Pool Hay Lặp Bài Test — `src/data/eventsAffiliation.js`, `src/engine/gameEngine.js`, `tools/lint/voice_lint.mjs`):**
  * Bổ sung 3 sự kiện lớn gắn cờ `weight: 0, causalOnly: true` (kích hoạt qua hàng đợi `pendingThreads` khi đủ điều kiện nhân quả, đảm bảo không làm thay đổi tỷ lệ rơi sự kiện ngẫu nhiên hay phá vỡ các bài kiểm thử chống lặp `test_apex_path.mjs`, `test_finger_parity.mjs`, `test_wing_route.mjs`):
    * `aff_mentee_wing`: Ban nhân sự Wing phân công một Feather trẻ về dưới quyền Trưởng phòng/Giám đốc (`wingRank >= 2`).
    * `aff_mentee_syndicate`: Một đàn em sống sót qua đợt thanh trừng xin đứng dưới trướng chỉ huy Finger (`fingerRank >= 2`).
    * `aff_subordinate_reckoning`: Sự kiện đối chất nhân quả sau khi cấp dưới bị thương vì lệnh ủy thác của bạn — buộc người đứng đầu chọn giữa: **(a)** Đứng ra nhận trách nhiệm và tự bỏ tiền lo thuốc men (`-8 Ahn, -4 Rep, +16 Gắn kết, +20 Tiến độ`), **(b)** Giữ kỷ luật sắt của tổ chức (`+8 Merit, +4 Rep, -8 Gắn kết, -3 SP`), hoặc **(c)** Đẩy hết tội lỗi cho cấp dưới để giữ sạch hồ sơ (`-14 Heat, +6 Ahn, +6 Merit`, cấp dưới cắt đứt quan hệ `estranged`).
  * Bổ sung nội suy biến `{mentee}` trong `interpolateText` (`src/engine/gameEngine.js`) và `tools/lint/voice_lint.mjs`, đồng thời mở rộng kiểm thử tự động trong `tests/test_npc_dynamic_agency.mjs`.


### Đợt 68 (27/10/2026): Khắc Phục 5 Điểm Rà Soát Kỹ Thuật — Cô Lập Trạng Thái Khảm Trang Bị, Đồng Bộ Cổng Chuyển Quận Outskirts, Ràng Buộc Phí Ủy Thác, Chọn Nơi Sinh Mobile 390px, Bẫy Focus/Tablist & Kiểm Định Cân Bằng 500 Cuộc Đời

* **1. Cô Lập Tham Chiếu `equipped` & Đồng Bộ Túi Đồ Khi Khảm Cổ Vật Singularity (`src/engine/gameEngine.js`, `src/engine/cityUpgrades.js`, `src/store/gameStore.js`):**
  * **Nguyên nhân gốc:** `cloneChar` trong `src/engine/gameEngine.js` trước đây nhân bản sâu `inventory` bằng `structuredClone` nhưng giữ nguyên tham chiếu nông của `equipped` (`...char`). Khi khảm cổ vật vào vũ khí đang trang bị (`char.equipped.weapon`), đối tượng trên state cũ bị đột biến tại chỗ, trong khi bản sao vũ khí tương ứng nằm trong `nextChar.inventory` lại không được cập nhật.
  * **Khắc phục:**
    * Trong `cloneChar` (`src/engine/gameEngine.js`): nhân bản sâu cả `equipped` lẫn `craftWeapon`, sau đó liên kết lại `eqClone[slot]` trỏ đúng vào phần tử tương ứng trong `invClone` theo `id`.
    * Trong `imbueCharacterEquipment` (`src/engine/cityUpgrades.js`): tạo bản sao đối tượng trang bị mới đã khảm và cập nhật đồng thời cả `char.equipped[slot]` lẫn phần tử khớp `id` trong `char.inventory` mà không chạm vào state trước đó.
    * Trong `buyItem` (`src/store/gameStore.js`): nhân bản `{ ...item }` trước khi đưa vào `nextChar.inventory` và `nextChar.equipped`, ngăn việc sửa đổi ngược vào danh mục tĩnh `ITEMS_CATALOG`.
    * Đồng thời sửa lỗi tham chiếu biến `notes` trước dòng khởi tạo trong nhánh khiên chắn đồng đội ở `src/engine/dungeonEngine.js` (chuyển sang `companionNotes.push`).

* **2. Khóa Điều Kiện Vượt Biên Outskirts & Đồng Bộ Cờ `Outskirts` / `EnteredCity` Khi Chuyển Quận (`src/engine/cityUpgrades.js`, `src/engine/gameEngine.js`, `src/data/itemsData.js`, `src/data/eventsWorkshopEconomy.js`):**
  * **Nguyên nhân gốc:** Nhân vật đang ở `OUTSKIRTS` trước đây có thể mua vé chuyển thẳng tới District K trong `WorkshopDepotModal` trong khi vẫn giữ nguyên cờ `'Outskirts'`, khiến UI hiển thị ở District 11 nhưng `isOutsideCity(char)` vẫn coi nhân vật đang ở ngoài The City. Ngoài ra, hàm `canBorderCrossFromOutskirts` đối chiếu các ID giấy tờ cũ (`nest_permit`, `devyat_pass`, `k_ampoule`) thay vì ID danh mục thực tế (`spc_nest_migration_permit`, `con_kcorp_ampoule`), trong khi `spc_nest_migration_permit` trong danh mục có giá `180 Ahn` vượt quá trần tài sản `100 Ahn` của nhân vật nên không thể mua hợp lệ qua Workshop.
  * **Khắc phục:**
    * Bổ sung hàm `canBorderCrossFromOutskirts(char)` và kiểm tra trong `canRelocateDistrict`: nếu nhân vật đang ở ngoài The City (`isOutsideCity(char)`), bắt buộc phải từ 18 tuổi trở lên, đã có nghề nghiệp và đáp ứng điều kiện thông hành biên giới: mang cờ `EnteredCity`/`NestResident`/`ColorFixer`/`DevyatPass`, sở hữu giấy thông hành hợp lệ (`spc_nest_migration_permit`, `spc_devyat_courier_pass`, `con_kcorp_ampoule`, cùng các alias tương thích ngược `nest_permit`, `devyat_pass`, `k_ampoule`), hoặc đạt `network >= 25` / `rep >= 25` (mối buôn lậu hoặc uy danh chiến đấu).
    * Điều chỉnh giá của **`spc_nest_migration_permit`** trong `ITEMS_CATALOG` (`src/data/itemsData.js`) từ `180 Ahn` xuống **`85 Ahn`** (chuẩn Star of the City, vừa vặn trần tài sản 100 Ahn và đồng nhất với sự kiện mua thị thực Backstreets `econ_nest_visa_opportunity`).
    * Bổ sung vật phẩm **`spc_devyat_courier_pass`** (*Thẻ thông hành Devyat Association*, giá **`45 Ahn`**, bậc Urban Plague) vào `ITEMS_CATALOG`, cấp cờ `DevyatPass` cho phép qua lại trạm kiểm soát Bức Tường. Đồng thời bổ sung `itemsAdd: ['spc_nest_migration_permit']` vào sự kiện `econ_nest_visa_opportunity` (`src/data/eventsWorkshopEconomy.js`) để người chơi nhận trực tiếp vật phẩm vào hành trang khi mua qua sự kiện cốt truyện.
    * Khi chuyển từ `OUTSKIRTS` vào bất kỳ Quận nội đô nào qua `relocateCharacterDistrict` hoặc qua hiệu ứng sự kiện `setRegion` (`resolveEventChoice`), hệ thống tự động gỡ cờ `'Outskirts'` và cấp cờ `'EnteredCity'`, đảm bảo `regionId` và `isOutsideCity(char)` đồng bộ 100%.

* **3. Ràng Buộc `costAhn: 8` Thực Thi & Bổ Sung Sự Kiện Hậu Quả Ủy Thác Cho Cộng Sự `partner` (`src/data/eventsAffiliation.js`, `src/engine/affiliation.js`, `src/engine/npcInteractions.js`):**
  * Chuyển chi phí thuốc men ở lựa chọn 0 của `aff_subordinate_reckoning` từ `effects: { wealth: -8 }` sang cổng kiểm tra cứng `costAhn: 8` kèm `clearNpcCrisis: 'mentee'` (xử lý trong `applyAffiliationChoice`), chặn việc chọn phương án chi trả 8 Ahn khi nhân vật đang có `< 8 Ahn`.
  * Bổ sung sự kiện nhân quả `aff_partner_reckoning` (`need: { npc: 'partner' }`, `causalOnly: true`, lựa chọn 0 có `costAhn: 8` và `clearNpcCrisis: 'partner'`) và cập nhật `executeNpcInteraction` (`src/engine/npcInteractions.js`) để khi ủy thác nhiệm vụ (`delegate_command`) cho `partner` gặp sự cố (35%), hệ thống gieo đúng `aff_partner_reckoning` vào năm kế tiếp.

* **4. Đưa Bộ Chọn Nơi Sinh Lên Trước Nút Khởi Đầu Trên Màn Hình Mobile 390px (`src/features/chronicle/components/BirthSetupPanel.jsx`, `src/styles/ui/home.css`):**
  * Trên màn hình hẹp `< 920px` (Mobile `390px`), khối `.birth-panel` (`order: 4`) nằm phía trên bản đồ `.opening-atlas` (`order: 5`). Bổ sung trường chọn nhanh `#birth-region` (*Nơi sinh / Birthplace*: Ngẫu nhiên + 25 Quận nội đô + Outskirts) kèm nút `Tra cứu bản đồ / Explore map` ngay trong `.birth-fields` phía trước nút `Bước vào The City`, giúp người chơi trên điện thoại chọn Quận xuất phát trước khi bắt đầu mà không phải cuộn qua nút chính.

* **5. Hoàn Thiện Bẫy Focus Bàn Phím (`Tab` Focus Trap) & Điều Hướng WAI-ARIA Tablist (`src/features/chronicle/components/NpcDossierModal.jsx`, `src/features/chronicle/components/WorkshopDepotModal.jsx`):**
  * Bổ sung bẫy focus tuần hoàn `Tab` / `Shift+Tab` trong phạm vi `.npc-dossier-sheet` của `NpcDossierModal.jsx`, giữ điểm nhấn bàn phím không thoát ra các phần tử nền phía sau hộp thoại.
  * Chuẩn hóa mẫu WAI-ARIA Tabs cho `.depot-tabs` trong `WorkshopDepotModal.jsx`: bổ sung `aria-controls="depot-tabpanel"`, `tabIndex={activeTab === tab ? 0 : -1}`, điều hướng phím mũi tên `ArrowRight` / `ArrowLeft` / `Home` / `End` tự động chuyển tab và focus, cùng vùng nội dung `id="depot-tabpanel" role="tabpanel" aria-labelledby={...}`.

* **6. Kết Quả Mô Phỏng Cân Bằng 500 Cuộc Đời Trên Codebase Hiện Hành (Đợt 68):**
  * **A. Kiểm định Logic & Tiến trình Nhánh Nghề (`node tools/sim/story_logic_audit.mjs 500 random` — 500 đời, 76.992 khoảnh khắc):**
    * **Vi phạm logic (`LOGIC VIOLATIONS`):** **`0`** trên toàn bộ 76.992 khoảnh khắc; tuổi thọ trung bình `32.0`; trung bình `141.1` khoảnh khắc phân biệt/đời; độ trùng lặp Jaccard giữa 2 đời chỉ `0.138` (entropy đạt `82.6%` mức tối đa).
    * **Phân bổ thăng tiến các nhánh Wing & 5 Ngón Tay Syndicate (500 đời ngẫu nhiên):**

| Tuyến nghề nghiệp | Số đời tham gia | Tổng năm nghề | Năm đủ chuẩn thi | Số lượt khảo thí | Đạt bậc cao nhất (Rank 0 / 1 / 2 / 3) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Wing Employee** | 140 | 2.673 | 831 | 326 | `36 / 35 / 44 / 25` |
| **The Index** | 38 | 415 | 132 | 74 | `11 / 12 / 12 / 3` |
| **The Pinky** | 33 | 316 | 101 | 59 | `11 / 14 / 6 / 2` |
| **The Ring** | 30 | 433 | 140 | 87 | `5 / 9 / 10 / 6` |
| **The Thumb** | 29 | 339 | 116 | 67 | `9 / 10 / 8 / 2` |
| **The Middle** | 24 | 351 | 125 | 76 | `4 / 7 / 10 / 3` |

  * **B. Đối chiếu Mô phỏng Cân bằng 500 Đời Giữa Chiến thuật Ngẫu nhiên (`random`) và Tập trung (`focused`) (`node tools/sim/balance_sim.mjs 500`):**

| Chỉ số đo lường (500 cuộc đời / chế độ) | Chế độ `random` (13.003 năm sống) | Chế độ `focused` (20.964 năm sống) |
| :--- | :---: | :---: |
| **Tuổi thọ trung bình (p10 / med / p90)** | `25.1` (`17 / 24 / 39`) | `41.0` (`17 / 40 / 69`) |
| **Phân bổ nghề trưởng thành** | Fixer `31.0%` · Wing `29.9%` · Syndicate `31.9%` · Distortion `5.4%` · Outcast `1.4%` | Fixer `80.2%` · Color Fixer `10.2%` · Distortion `6.0%` · Syndicate `3.3%` |
| **Thang bậc Fixer (trên tổng số Fixer)** | Grade $\le 5$: `29.7%` (tuổi TV 33) · Grade $\le 3$: `8.1%` (tuổi TV 47) | Grade $\le 5$: `70.8%` (tuổi TV 30) · Grade $\le 3$: `44.2%` (40) · Grade $\le 1$: `13.0%` (51) |
| **Tỷ lệ đạt Color Fixer & Độ tuổi** | `0/500` (`0.0%`) | **`48/500` (`9.6%`)**, tuổi TB **`55.4`** (trung vị `56`, nhỏ nhất `41`, đạt `48/50 = 96.0%` số người vào đại khảo thí) |
| **Tỷ lệ thức tỉnh E.G.O & Độ tuổi** | `9/500` (`1.8%`), tuổi TB `23.6` (nhỏ nhất `20`) | **`61/500` (`12.2%`)**, tuổi TB **`45.9`** (nhỏ nhất `19`, trong nhóm Fixer đạt `59/439 = 13.4%`) |
| **Đạt cả Color & E.G.O / Cùng năm** | `0/500` (`0.0%`) / Cùng năm: `0%` | **`27/500` (`5.4%`)** / Cùng năm: **`0/500` (`0.0%`)** / Cùng hành động: **`0%`** |
| **Tỷ lệ biến dị Distortion / Gặp Carmen** | Distortion `4.8%` · Carmen `9.8%` | Distortion `5.4%` · Carmen `18.2%` |

  * **C. Mật độ Trải nghiệm Sự kiện Theo Nhánh Nghề (`node tools/sim/branch_experience.mjs 500`):**
    * **Fixer (136 đời):** `11.8` năm/đời, `6.0` major/10 năm, `11.3` minor/10 năm, bắt gặp `108` đại sự kiện khác nhau.
    * **Wing Employee (143 đời):** `9.8` năm/đời, `5.1` major/10 năm, `10.9` minor/10 năm, bắt gặp `83` đại sự kiện khác nhau.
    * **Syndicate (159 đời):** `8.2` năm/đời, `9.2` major/10 năm, `12.7` minor/10 năm, bắt gặp `237` đại sự kiện khác nhau (trải đều trên 5 Ngón Tay).
    * **Distortion (23 đời):** `3.8` năm/đời, `4.6` major/10 năm, `16.3` minor/10 năm, bắt gặp `16` đại sự kiện khác nhau.

* **Đợt 69: Nâng Cấp Thiết Kế Theo Triết Lý Failbetter Games & Darkest Dungeon (Con Đường Mốc Lớn, Khảo Thí Color Có Sức Nặng, Tái Tạo Sinh Học Distortion & Đánh Đổi Kế Hoạch Năm; đã kiểm định 500 đời):**
  * **1. Khóa Điều Kiện Vượt Biên Trẻ Em & Chuẩn Hóa Danh Mục Giấy Phép (`src/engine/cityUpgrades.js`, `src/data/itemsData.js`):**
    * Thêm chặn tuổi `(char.age || 0) < 18 || char.job === 'Child'` ngay đầu hàm `canBorderCrossFromOutskirts`, ngăn trẻ em mang cờ `NestResident` hoặc giấy phép vượt Bức Tường vào The City khi chưa trưởng thành.
    * Hạ giá `spc_nest_migration_permit` từ 180 Ahn xuống 85 Ahn (vừa vặn trần tài sản 100 Ahn), bổ sung `spc_devyat_courier_pass` (45 Ahn, cờ `DevyatPass`), đồng bộ toàn bộ mã giấy phép trong kho đồ.
  * **2. Làm Rõ Con Đường Đến Mốc Lớn & Cột Mốc Riêng Biệt Cho Distortion (`src/engine/gameEngine.js`, `src/features/chronicle/components/CharacterDossierCard.jsx`, `src/styles/ui/play.css`):**
    * Trong `getNextCareerMilestone(char)`: bổ sung mảng `sources` chi tiết nguồn thu thập (Hợp đồng thường niên, Ủy thác Association, Apex Directives, Dungeon) cho từng điều kiện chưa hoàn thành (`unmet`).
    * Bổ sung cột mốc riêng biệt `category: 'DISTORTION METAMORPHOSIS'` cho nhân vật sa ngã thành Distortion với mục tiêu Cộng hưởng $\ge 100$ và Thể xác Dị thường $\ge 80$ HP, thay thế hoàn toàn tình trạng rơi vào mục `SURVIVAL` chung chung.
    * Bổ sung hàm xuất khẩu `getEgoReadiness(char)` phân loại 5 trạng thái tâm thức: `dormant` ($<40$), `stirring` ($40-69$), `imminent` ($\ge 70$, hoặc $\ge 58$ khi SP $\le 38$), `awakened` (đã có E.G.O), và `distorted`.
    * Trên giao diện Dossier (`CharacterDossierCard.jsx`): hiển thị số điểm còn thiếu `(Thiếu X)`, danh sách tag nguồn kiếm `Sources: ...`, và thẻ giao diện khí quyển `ego-horizon-card` hiển thị thanh tiến trình thức tỉnh E.G.O và giao lộ tâm thức Carmen/Ayin.
  * **3. Tăng Sức Nặng & Chuỗi Hệ Quả Của Đại Khảo Thí Color (`src/data/eventsSupernatural.js`, `src/data/eventsChildhood.js`):**
    * Lựa chọn 0 (Đi một mình): Chịu tổn thất nặng nề `-35 HP, -20 SP, +18 Heat`, nhận sẹo `Vết sẹo của Star of the City`, và kích hoạt chuỗi nhân quả `later: [{ id: 'csq_color_first_mandate', years: 1 }]` (Hana điều động thực thi nhiệm vụ tối mật).
    * Lựa chọn 1 (Nhờ Seven Association & thế chấp): Tốn 15 Ahn, nhận cờ `AssociationDebtObligation`, nhận sẹo `Bản đồ giải phẫu Star of the City`, và gieo sự kiện `csq_seven_debt_reckoning` vào 2 năm sau.
    * Lựa chọn 2 (MỚI: Kề vai sát cánh cùng cộng sự): Cần cộng sự (`partner`/`mentor`), tỷ lệ thành công cao nhất (85%), nhận sẹo `Ký ức đẫm máu cùng cộng sự`, và cộng sự bị thương nặng kích hoạt chuỗi hậu quả `csq_color_sponsor_aftermath` vào năm sau (cần chữa trị bằng ampoule K Corp hoặc bổ nhiệm làm cố vấn).
    * Đăng ký cả 3 sự kiện hệ quả lớn (`csq_color_first_mandate`, `csq_seven_debt_reckoning`, `csq_color_sponsor_aftermath`) vào `CONSEQUENCE_EVENTS`.
  * **4. Kéo Dài Tuổi Thọ Tuyến Distortion & Bảo Đảm Mạch Truyện 3 Hồi (`src/engine/yearPlanner.js`, `src/data/yearEndLines.js`, `src/engine/careerPipeline.js`):**
    * Thêm cơ chế tái tạo tế bào mô thịt dị thường `heal_distortion_tissue`: nhân vật Distortion có HP $< 45$ tự động hồi phục `Math.max(8, Math.round(resonance * 0.16))` HP mỗi cuối năm, kèm dòng diễn họa không khí trong `YEAR_END_LINES`.
    * Giảm sát thương đột kích Sweeper trong đêm hẻm tối đối với Distortion từ -24 HP xuống -14 HP.
    * Trong `triggerDistortionTransformation`: tự động kích hoạt hồi 1 của đại mạch truyện 3 hồi `arc_carmen_distortion_abyss` (`distort_carmen_communion_1`) vào `char.weaver.pendingThreads` ngay năm đầu tiên sau khi biến dị.
    * Kết quả thực nghiệm (`branch_experience.mjs 500`): Tuổi thọ trung bình của Distortion tăng từ **3.8 năm** lên **11.3 năm/đời**, số đại sự kiện trải nghiệm tăng từ **16** lên **40**, bảo đảm tuyến biến dị sống đủ lâu để trải nghiệm toàn bộ bi kịch và sức mạnh bản ngã.
  * **5. Đánh Đổi Vi Mô Trong Kế Hoạch Năm (`src/engine/annualPlan.js`):**
    * Dồn $\ge 2$ điểm vào `train` (luyện tập cường độ cao): tiêu hao -1 HP thể lực.
    * Dồn $\ge 2$ điểm vào `work` (làm việc kiệt sức): tiêu hao -1 SP tinh thần.
    * Dồn $\ge 2$ điểm vào `scheme` (mưu tính hắc ám): làm rạn nứt -1 Bond của cộng sự tích cực.
    * Cập nhật mô tả hoạt động trong `YEAR_ACTIVITIES` để người chơi thấy rõ đánh đổi trước khi phân bổ.
  * **6. Đo Kiểm Toàn Diện (Đợt 69):**
    * Toàn bộ **53/53 test suites** đạt 100% (`npm test`).
    * Linters (`lint_story.mjs` & `voice_lint.mjs --fail`) kiểm tra **32.337 chuỗi** đạt **0 lỗi, 0 cảnh báo**.
    * `npm run build` hoàn thành trong 7.2 giây, sạch bóng lỗi cảnh báo.
    * `balance_sim.mjs 500 random` (13.208 năm sống, tuổi thọ TB `25.5`) & `balance_sim.mjs 500 focused` (21.749 năm sống, tuổi thọ TB `42.6`, đạt Color Fixer `9.6%` ở tuổi TB `55.4`, E.G.O `12.6%` ở tuổi TB `45.5`).
    * `story_logic_audit.mjs 500 random` (80.338 khoảnh khắc, **0 vi phạm logic**, entropy `83.1%`).
    * `branch_experience.mjs 500`: Distortion đạt **11.3 năm/đời** (tăng 297% so với Đợt 68), Fixer `11.8` năm/đời, Wing Employee `9.8` năm/đời, Syndicate `8.2` năm/đời.

* **Đợt 70: Hoàn Thiện Cơ Chế Theo Phản Hồi QA & Kiểm Định Chuyên Sâu (Ngưỡng E.G.O Cơ Học Thật, Ánh Xạ Sẹo Color, Khảo Thí Nhân Quả Toàn Vẹn, Thông Suốt 3 Hồi Distortion & Đánh Đổi Kế Hoạch Năm Thực Chất; đã kiểm định 100%):**
  * **1. Chuẩn Hóa Ngưỡng Thức Tỉnh E.G.O Khớp 100% Cơ Chế Cốt Lõi (`src/engine/gameEngine.js`):**
    * Đồng bộ ngưỡng `getEgoReadiness(char)` theo đúng điều kiện thực tại [`awakeningProgress.js`](file:///c:/Users/nguyenhuynhminhtam/Downloads/TestPM/TestPM/PM/src/engine/awakeningProgress.js#L7):
      * Thêm kiểm tra nghiêm ngặt `char.age >= 18`: Người dưới 18 tuổi hiển thị trạng thái `dormant` ("Tâm Trí Trẻ Thơ: Chưa Đủ 18 Tuổi Để Thức Tỉnh E.G.O").
      * Trạng thái `imminent` kích hoạt khi: đã mở cơ hội E.G.O (`hasEgoOpportunity`), hoặc Cộng hưởng cực đỉnh $\ge 74$, hoặc Khủng hoảng tâm trí ($\text{Resonance} \ge 62$ đi kèm $\ge 1$ sẹo và $\text{Sanity} \le 38$, hoặc $\ge 2$ sẹo và $\text{Sanity} \le 45$).
      * Khắc phục trường hợp Resonance 70 và SP 60 hiển thị sai `imminent`: nay hiển thị chính xác là `stirring` (dao động), thanh tiến trình tính trên mốc chuẩn 74.
    * Trong `getNextCareerMilestone`: Khắc phục lỗi Fixer Grade 2-3 đạt chuẩn Thần Đồng Đặc Cách (`isColorProdigyEligible`) bị ép hiển thị thăng hạng bậc tiếp theo. Nay hiển thị ưu tiên cột mốc: `Đại Khảo Thí Phong Color (Hana Đặc Cách Thần Đồng)`.
  * **2. Ánh Xạ Đầy Đủ 100% Sẹo Color Vào Danh Mục Hiệu Ứng Hoạt Động (`src/engine/scarModel.js`):**
    * Bổ sung luật nhận diện cho các vết sẹo từ vòng khảo thí Color:
      * `Vết sẹo của Star of the City` $\to$ Hồ sơ `injury` (Thương tật: -1 HP/năm, -4 Fixer contract power, mở nhánh y tế).
      * `Ký ức đẫm máu cùng cộng sự`, `Cơn hoảng loạn tại vòng khảo thí`, `Ký ức người cộng sự đã ngã xuống` $\to$ Hồ sơ `trauma` (Ám ảnh: -2 SP/năm, tăng floor resonance).
      * `Người từ chối làm Color` $\to$ Hồ sơ `witness` (Nhân chứng: -1 SP/năm, mở bí mật Wing).
    * Loại bỏ hoàn toàn tình trạng sẹo bị đánh dấu `UNMAPPED` và đẩy vào lịch sử vô dụng.
  * **3. Khép Kín Chuỗi Nhân Quả Khảo Thí Color & Bảo Đảm Logic Sinh Tử Của Cộng Sự (`src/data/eventsSupernatural.js`, `src/data/eventsChildhood.js`, `src/engine/yearPlanner.js`, `src/engine/eventConditions.js`):**
    * Lựa chọn 2 tại đại khảo thí Color gắn cờ định danh `PartnerShieldedYouInColorTrial`, yêu cầu có cộng sự còn sống (`need: { companionActive: true }`), hỗ trợ chính thức cờ `companionActive` trong `matchesNeed`.
    * Sự kiện hậu quả năm sau chia làm 2 nhánh rẽ mạch lạc:
      * Nếu cộng sự còn sống: Kích hoạt `csq_color_sponsor_aftermath`, hiển thị tên cụ thể của cộng sự `{partner}` tại phòng hồi sức Văn phòng, cho phép chọn tiêm phục hồi K Corp (15 Ahn) hoặc bổ nhiệm làm Cố Vấn Tối Cao.
      * Nếu cộng sự đã hy sinh hoặc qua đời trong năm: `yearPlanner.js` tự động chuyển tiếp sang sự kiện tưởng niệm `csq_color_sponsor_aftermath_fallen` ("Tưởng Niệm Người Đã Đỡ Đòn"), cho phép khắc tên họ lên vũ khí Color hoặc lập quỹ bảo trợ hậu bối.
  * **4. Khơi Thông Hoàn Toàn 3 Hồi Đại Mạch Carmen Distortion (`src/data/eventsDistortionPath.js`):**
    * Gỡ bỏ rào cản gắt gao `need: { npc: 'friend' }` tại Hồi 2 (`distort_former_companion_encounter`), mở rộng biên độ tuổi sang `[18, 99]` và tinh chỉnh văn phong để chấp nhận bất kỳ người quen/cố nhân cũ nào từ tiền kiếp, tránh bị kẹt luồng narrative arc khi không có NPC bạn bè thuở nhỏ.
    * Hồi 3 (`distort_star_of_city_rampage`) mở rộng biên độ tuổi sang `[18, 99]`, bảo đảm chuỗi tiến trình 3 hồi liên tục qua từng năm sau khi biến dị.
    * Kiểm định bằng test chuyên sâu `test_audit_feedback_resolution.mjs`: xác nhận thực thể Distortion trải nghiệm và hoàn thành trọn vẹn cả 3 hồi đến kỷ lục `arc_completed_arc_carmen_distortion_abyss`.
  * **5. Nâng Tầm Đánh Đổi Kế Hoạch Năm Thành Thách Thức Thực Sự (`src/engine/annualPlan.js`):**
    * Thay thế các mức phạt nhẹ -1 bằng cái giá thể xác và tinh thần thực chất theo phong cách Darkest Dungeon / Failbetter:
      * `train` (Luyện tập): Dồn 2 điểm mất **-2 HP**; dồn 3 điểm mất **-4 HP** (tổn thương cơ bắp và xương khớp).
      * `work` (Kiếm sống): Dồn 2 điểm mất **-3 SP**; dồn 3 điểm mất **-6 SP** (nguy cơ kiệt quệ tâm lý/burnout).
      * `scheme` (Mưu tính): Dồn 2 điểm làm sụt giảm **-2 Bond** với mọi cộng sự; dồn 3 điểm làm sụt giảm **-4 Bond** và gây **+2 Heat** do tai mắt thành phố đánh hơi.
    * Cập nhật mô tả hoạt động trong `YEAR_ACTIVITIES` để người chơi cân nhắc kỹ lưỡng trước mỗi năm hành động.
  * **6. Đo Kiểm & Triển Khai Hoàn Hảo (Đợt 70):**
    * Thêm bộ kiểm thử toàn diện `tests/test_audit_feedback_resolution.mjs` bao phủ toàn bộ 6 khía cạnh trên: đạt 100% Pass.
    * Toàn bộ test suite `npm test` đạt **54/54 test suites passed** (100%).
    * Linter `lint_story.mjs` đạt **0 lỗi, 0 cảnh báo** (32.351 chuỗi kiểm tra).
    * `npm run build` hoàn thành trong 7.22 giây, bundle tĩnh sạch bóng.






### Đợt 71 (27/10/2026): Đồng nhất màu UI, tách popup khỏi bối cảnh và kiểm tra production bằng taste-skill

* **Yêu cầu:** Sửa BUG-47 (home tông đỏ trong khi màn chơi tông vàng), BUG-48 (popup bị lẫn vào background); tiếp tục review code Batch 70 và kiểm tra UI desktop/mobile theo taste-skill. Chi tiết đầy đủ: `docs/UI_REVIEW_BATCH_71.md`.
* **Màu điều khiển:** Cố định `--accent: #d8b265`, hover `#ebc77f`, chữ nút `#1b1408`. Gỡ ghi đè accent theo route khỏi `MainLayout`; đồng bộ theme Ant Design. Đổi bầu trời/quầng sáng/mặt trăng màn mở đầu sang vàng nâu. Cảnh Wing/Finger/dungeon và phù hiệu Color vẫn dùng màu nhận diện riêng, không dùng chúng để đổi màu toàn bộ điều khiển.
* **Popup:** Thêm token nền đặc `--dialog-surface: #252127`, viền `#746348`, lớp phủ `rgba(3,3,5,.76)`. Dùng chung cho sự kiện, kế hoạch năm, dungeon, Settings, hồ sơ NPC, drawer mobile và modal Ant Design. Gỡ nền trong suốt của card dungeon. Bổ sung selector `.ant-modal-container` cho DOM Ant Design 6, giữ tương thích `.ant-modal-content` cũ.
* **Lỗi chức năng phát hiện khi bấm UI:** Nối state/modal Workshop còn thiếu; dùng `useShallow` cho selector object của Workshop để tránh vòng lặp React. Sửa hồ sơ NPC lấy hàm dịch sai store bằng `useT`. Đưa Settings, NPC và drawer nhân vật ra portal vào body để không bị thanh có `backdrop-filter` cắt mất hoặc bị bottom navigation đè lên. Focus trap của drawer nhường popup NPC khi có lớp con.
* **Đo kiểm:** `npm run build`, `npm test`, `node tests/test_audit_feedback_resolution.mjs` và `git diff --check` đạt. Lệnh `npm test` hiện gọi trực tiếp 48 file test, kèm lint/parity và audit 500 khoảnh khắc; file audit-feedback mới chạy riêng và chưa được đưa vào script mặc định. Không chạy lại 500 cuộc đời cân bằng vì đợt này sửa UI.
* **Browser QA production:** Thêm `tools/qa/theme_overlay_browser.mjs`, chạy với preview `http://127.0.0.1:5197`. 44 trạng thái tại 1440×900, 768×900, 390×900: home và bốn trang hồ sơ, ba route Fixer/Wing/Ring, Settings, Workshop, NPC, sự kiện Color, kế hoạch năm, dungeon WARP, drawer mobile/tablet. Tất cả đạt kiểm tra accent thống nhất, popup có nền đặc và nằm trong viewport, không tràn ngang cấp trang, không exception JS. Có bấm mở/đóng popup và mở Workshop từ menu mobile. Drawer phủ được bottom navigation qua kiểm tra hit-test.
* **Tương phản:** Sửa test cũ chỉ so chuỗi mã đỏ thành tính tương phản WCAG thật: nút vàng/chữ tối 9.11:1; chữ chính/nền dialog 13.58:1. Không suy rộng thành chứng nhận accessibility toàn game.
* **Taste-skill:** Đã chạy lint/inspector production, xem ảnh fold/page đủ ba kích thước và contact sheet các màn game. Inspector thô còn 6 nhóm FAIL về house style (eyebrow, numbering, gradient, shadow, hairline, few-pictures); không ghi nhận là 0 FAIL. Hướng City-at-night đã có trong `DESIGN.md` dùng SVG, glass và bối cảnh chuyển màu; báo cáo tách các cờ mỹ thuật này khỏi lỗi tương tác. Ảnh nằm ở `%TEMP%/pm-theme-overlay-qa` và `%TEMP%/pm-review-71/final-taste`, không commit ảnh vào repo.
* **Các điểm cần lưu ý còn mở:** Nút “Xem phía sau” còn nằm trên vùng nội dung popup mobile; tab Workshop kéo ngang khó thấy mục cuối; kế hoạch năm còn nhiều chữ nhỏ. `READY`/tooltip Resonance trong phần chỉ số vẫn dùng ngưỡng 50–60 cũ. Logic callback Color còn nhận bất kỳ NPC active làm companion nhưng tra cố định partner, không ghi wounded/định danh người đỡ đòn; mentor/parent còn sống có thể bị kể là đã mất. Callback fallen chưa đóng thread gốc. Readiness vẫn có thể báo imminent sau khi giao lộ đã xem. Đã tái hiện và ghi hướng xử lý trong báo cáo, không sửa gameplay các mục này trong đợt UI.
* **Tài liệu:** Cập nhật `DESIGN.md` về màu gold cố định và popup nền đặc. Chưa deploy; kết quả kiểm tra áp dụng cho production build local.

### Bảng công việc sau feedback người chơi (27/10/2026, chỉ lập kế hoạch)

* Gộp feedback người chơi về Color ít dungeon/ít đối đầu Dị thể, đường Taboo khó tiếp cận và cảm giác vẫn như người thường với các lỗi còn mở ở review Batch 71. Bảng tổng hợp 32 mục từng nằm ở `docs/BANG_TONG_HOP_VIEC_CAN_SUA.md`; file này đã được gỡ theo yêu cầu vì không còn phản ánh trạng thái sau Đợt 72. Phần kiểm tra BUG-36–50 hiện nằm ở `docs/KIEM_TRA_BUG_36_50.md`.
* Tái hiện mới trên nhân vật đối chứng 40 tuổi: Fixer Grade 1 có 7 cửa `gate_*` phù hợp; đổi sang `Color Fixer`/Grade 0/cờ Color còn 0 cửa trong hai catalog gate. Một số event trực tiếp vẫn có lối vào dungeon, nên không kết luận toàn bộ dungeon engine bị khóa. `ensembleRoute` trả null cho nghề Color mới; WARP giảm tiếp tế 3→2 khi chưa có E.G.O; `egoChargesOf` lại trả 2 cho Color chưa thức tỉnh.
* `forbiddenLeadOpen` trả true cho mẫu Color. Do đó feedback Taboo được phân loại cần đo số năm đủ điều kiện/lần offer/lần nhận, không ghi thành lỗi khóa hoàn toàn. Đề xuất tăng khả năng tiếp cận quyết định vi phạm có chủ đích, không tự cộng Taboo khi được phong Color.
* Bảng ưu tiên sửa nhận dạng route, gate và trạng thái trước khi tăng tỷ lệ hoặc viết thêm event. Không sửa code gameplay trong lượt lập bảng này; các thay đổi UI Batch 71 đang có được giữ nguyên.

### Đợt 72 (27/10/2026): Khắc Phục Toàn Diện 7 Điểm Nghẽn Sau Audit Feedback & Hài Hòa Hóa Cơ Chế Gameplay (Đã kiểm thử 100%)

* **T01–T03 (Hạn mức & Cổng Dungeon dành riêng cho Color Fixer):**
  * Trong `src/engine/dungeonPacing.js`, nâng quota `GATE_PROFILES['Color Fixer']` lên `guaranteed: 2`, khoảng cách `spacing: [5, 8]`, `cooldown: 4`.
  * Trong `nextGateDueAge(char)`, bổ sung cơ chế bảo đảm: nếu nhân vật đã phong Color (`isColor` và có `lastColorTrialAge`), kiểm tra xem đã gặp cổng hầm ngục nào sau khi lên Color chưa (`char.lastGateAge >= char.lastColorTrialAge`). Nếu chưa, luôn lên lịch hẹn trong 1–3 năm tiếp theo, triệt tiêu hoàn toàn lỗi Fixer đã gặp 1 gate thời trẻ bị khóa vĩnh viễn không nhận được 7 gate cấp cao khi đã thành Color.
* **T06–T08 (Cơ chế đồng hành che chắn trong kỳ khảo thí Color):**
  * Snapshot đầy đủ nhân vật đồng hành qua `recordColorTrialCompanion` hỗ trợ cả `partner`, `mentor`, `friend`.
  * Đồng hành che chắn bị thương nặng (`injured: true`), sang năm sau kích hoạt `csq_color_sponsor_aftermath`. Lựa chọn cứu chữa (ống tiêm K Corp) hồi phục thương tật và tăng mạnh gắn kết; lựa chọn bổ nhiệm làm Cố Vấn Tối Cao kích hoạt vai trò cố vấn trọn đời.
  * Trong trường hợp người đồng hành hy sinh hoặc bị thay thế (`colorTrialCompanionAlive` trả về `false`), tự động chuyển nhánh sang sự kiện tưởng niệm `csq_color_sponsor_aftermath_fallen`.
* **T11 (Tách bạch Vũ khí Color Đặt Riêng vs Cờ Tưởng Niệm):**
  * Gỡ bỏ `ColorWeaponEngravedWithPartner` khỏi `COLOR_WEAPON_FLAGS` trong `src/engine/dungeonEngine.js`.
  * Cờ khắc tên người đã khuất là di vật tưởng niệm mang giá trị tinh thần (+15 SP, +20 Rep), không còn vô tình cấp miễn phí +16 sức mạnh chiến đấu hợp đồng hay giảm 15% sát thương hầm ngục nếu người chơi chưa trả 80 Ahn rèn vũ khí đặc trưng tại Workshop (`CraftedColorWeapon` / `wpn_color_signature`).
  * Khi người chơi sở hữu vũ khí thật và có thêm cờ khắc tên, nhãn hiển thị trong hầm ngục tôn vinh: *Vũ khí Color đặt riêng khắc tên cộng sự*.
* **T19 (Đặc tính hóa Chiêu Lệnh Thủ Lĩnh theo từng Phân Nhánh Route):**
  * Xây dựng hàm `getApexDirectiveEffects(char, directiveId)` trong `src/engine/cityUpgrades.js`.
  * Từng chiêu lệnh (`dispatch_squad`, `fortify_turf`, `mentor_network`) phân nhánh hiệu ứng riêng biệt:
    * *Color Fixer:* Tăng mạnh Danh tiếng, gắn kết đệ tử/cộng sự và thanh lọc biến dị/tâm thần.
    * *Ngón Tay Thumb:* Kỷ luật sắt, tăng thu phí bảo hộ (Ahn), củng cố đòn bẩy uy quyền (Leverage).
    * *Ngón Tay Index:* Hành quyết theo Chỉ thị (Prescript), gia tăng Cộng hưởng (Resonance), giảm Heat đô thị.
    * *Ngón Tay Middle:* Nghĩa khí gia đình, tăng gắn kết toàn bộ mạng lưới anh em, tăng sinh lực giáp trụ (HP).
    * *Ngón Tay Ring:* Xưởng sáng tạo nghệ thuật cấm kỵ, thu lợi Ahn và khai mở Cộng hưởng dị thường.
    * *Ngón Tay Pinky:* Mạng lưới bóng tối, tích lũy Leverage và luồn lách thanh tra.
    * *Wing Executive:* Thiết quân luật giữ vững Vị thế tập đoàn (Standing), điều động Feather và bảo hộ tài sản.
    * *Workshop Meister:* Khảo nghiệm vũ khí, khảm Singularity và đào tạo thợ rèn tập sự (Merit + Ahn).
* **T22 (Đồng bộ Phần Thưởng Cột Mốc Biến Dị Tối Thượng Distortion Apex):**
  * Đồng nhất nội dung giữa Tooltip và Nhật ký sự kiện: ghi nhận chính xác `+14 Sức mạnh chiến đấu` thay vì lệch số `+8`.
  * Vì Distortion không nhận hợp đồng Fixer thông thường (`contractRouteOf` trả `null`), tích hợp uy lực +14 này trực tiếp vào `getDungeonMastery` trong `src/engine/dungeonEngine.js`: cấp `+0.14 checkBonus` (tương đương +14 điểm kiểm tra) và giảm 15% sát thương nhận vào với nhãn hiệu ứng *Hình thái Dị Thường Vực Thẳm*.
* **T25, T27–T28 (Chuẩn hóa Dự Báo Kế Hoạch Năm Theo Chỉ Số Thực Tế):**
  * Viết lại `previewAnnualPlanDeltas` trong `src/engine/annualPlan.js`: mô phỏng chính xác dựa trên chỉ số hiện tại của nhân vật (`wealth`, `heat`, `rep`, `health`, v.v.) kết hợp hàm `clamp`.
  * Khi nhân vật có 0 Ahn chọn `fortify_turf`, dự báo không còn báo sai `-5 Ahn` mà báo chính xác `0 Ahn, -3 Danh tiếng` do kích hoạt điều khoản trừ Rep khi cạn quỹ.
  * Chỉ số Heat khi ở mức 0 không còn bị báo âm ảo (`-12 Heat`), mà được chặn đáy chính xác tại 0.
  * Bổ sung hiển thị chip `Danh tiếng` (`netDeltas.rep`) trên giao diện `YearPlanDock.jsx` khi phát sinh thay đổi.
* **Đo kiểm toàn diện:**
  * Toàn bộ 11 test cases trong `tests/test_audit_feedback_resolution.mjs` đạt 100%.
  * `npm test` bao gồm 53 test suites, lint story, voice lint, parity FE/BE và mô phỏng 500 khoảnh khắc đạt 100% không lỗi.
  * `npm run build` hoàn tất thành công trong 8.52 giây không phát sinh lỗi cảnh báo.

### Kiểm tra lại BUG-36–44 (27/10/2026, chỉ audit)

* Báo cáo tiếp tục được mở rộng trong `docs/KIEM_TRA_BUG_36_50.md`. BUG-38/39 đạt theo mã và test hiện có; BUG-42/43 được tái hiện bằng engine và còn lỗi. BUG-36/37/41/44 cần thêm phép đo hoặc QA trình duyệt trước khi kết luận dứt điểm. BUG-40 đã tăng chỉ số nhận được nhưng lời kể bảo trì chưa gắn với cơ chế trang bị.
* Chạy `node tests/test_reported_balance_bugs.mjs` đạt. Probe riêng trả `91.66666666666666` cho Great Sibling và cho phép trả 35 Ahn với số dư 19 Ahn; báo cáo ghi trạng thái, nguyên nhân, hướng sửa và tiêu chí hồi quy cho từng mục.
* Đã gỡ `docs/BANG_TONG_HOP_VIEC_CAN_SUA.md` theo yêu cầu. Lượt này không thay mã gameplay/UI, không chạy browser QA hoặc audit tần suất 500 run.

### Bổ sung BUG-45–50 vào cùng báo cáo (27/10/2026, chỉ audit)

* Dùng một file `docs/KIEM_TRA_BUG_36_50.md` để theo dõi BUG-36–50, gồm trạng thái, chứng cứ, mức ưu tiên, cách tái hiện, hướng sửa và tiêu chí hồi quy. Ảnh BUG-44 mới là log net cuối năm; chưa có seed/ảnh lựa chọn +3 để kết luận phần thưởng bị đảo dấu.
* BUG-49 tái hiện giá kiếm ghi 65 Ahn nhưng mất tới 84 Ahn khi RNG bất lợi; BUG-46 thiếu cấp record khi chinh phục WARP, dù catalog có record `warp_cleanup`. BUG-45 và 50 là các khoảng thiếu về phần thưởng/hậu quả contract và điểm nhấn thành tựu; BUG-47/48 đã được xử lý theo mã và QA Batch 71, cần so cùng build nếu người chơi còn gặp.
* Probe engine riêng cho BUG-45/46/49 đã chạy; không chỉnh mã game, không chạy lại browser hoặc audit 500 run trong lượt cập nhật tài liệu này.

### Đợt 73 (28/10/2026): Khắc phục dứt điểm 3 lỗi cân bằng cuối & Lỗ hổng kiểm thử hợp đồng hiểm nguy (Đã kiểm thử 100%)

* **Điểm 1 (Bảng tổng kết cuối năm & Đối chiếu deltas tuyệt đối):**
  * Trong `src/engine/yearPlanner.js`, ghi nhận đầy đủ biến động thị trường ngẫu nhiên `marketJitter = Math.round(rng() * 2 - 1)` vào `breakdown`.
  * Bổ sung dòng giải thích chi tiết trong `breakdown` cho cơ chế hạ nhiệt Heat (`heat: -1`), tài liệu mật lỗi thời (`leverage: -1`), nghi ngờ nội bộ vì nắm quá nhiều bí mật (`standing: -1`), tiếng gọi Carmen từ cộng hưởng cực hạn (`sanity: -2`), cùng giám sát truy vết Distortion của Hana Association (`heat: +6`, `network: -2`).
  * Xây dựng cơ chế tự động đối chiếu và điều chỉnh giới hạn (`cat: 'limit'`) giữa tổng các khoản trong `breakdown` và mảng `deltas` thực tế sau khi chạy qua hàm `clamp` trần/sàn chỉ số. Đảm bảo tổng giá trị từng chỉ số trong `breakdown` luôn bằng chính xác giá trị ghi nhận trong `deltas`.
* **Điểm 2 (Ngăn rò rỉ gắn kết Chỉ thị Apex sang NPC đã khuất / không hoạt động):**
  * Trong `src/engine/cityUpgrades.js`, nhập và áp dụng hàm kiểm tra chuẩn `npcIsActive(npc)`.
  * Kiểm tra đúng kiểu `typeof npc.bond === 'number' ? npc.bond : 40` để không biến giá trị `0` của người đã mất thành `40` do điều kiện falsy `npc.bond || 40`.
  * Đảm bảo NPC tử trận có `alive: false, bond: 0` tuyệt đối không bị cộng điểm gắn kết lên 47.
* **Điểm 3 (Đồng bộ trừ gắn kết Kế hoạch năm "Mưu tính" & Chuẩn hóa dự báo Bond):**
  * Trong `src/engine/annualPlan.js`, sử dụng đồng nhất `npcIsActive(npc)` cho cả hàm xem trước `previewAnnualPlanDeltas` lẫn hàm áp dụng `applyAnnualPlan`.
  * Khắc phục tình trạng các NPC đồng hành hoạt động bình thường nhưng không có thuộc tính `status: 'alive'` bị bỏ sót, đảm bảo người chơi phân bổ 3 điểm Scheme thì gắn kết đồng hành giảm chính xác 4 điểm đúng như dự kiến hiển thị.
  * Chuẩn hóa tính toán dự báo Bond trong `previewAnnualPlanDeltas`: tính toán dựa trên danh sách NPC còn hoạt động thực tế và giới hạn `0`–`100` của từng người. Triệt tiêu hoàn toàn lỗi dự báo ảo `+7 Bond` khi nhân vật không có NPC nào, và dự báo chính xác `-1 Bond` (thay vì `-4`) khi NPC chỉ còn `1 Bond` trước khi chạm sàn 0.
  * Cung cấp mảng chi tiết `companionDetails` kèm nhãn tên và mức biến động từng người trên chip dự báo `YearPlanDock.jsx` (tooltip hiển thị rõ mức gắn kết trước → sau của từng đồng hành).
* **Điểm 4 (Vá lỗ hổng kiểm thử BUG-45 cho hợp đồng nguy cơ cao):**
  * Trong `src/engine/gameEngine.js`, mở rộng hàm `generateFixerContract(char, rng, overrideTemplate = null)` cho phép truyền template kiểm thử.
  * Trong `tests/test_reported_balance_bugs.mjs`, truyền trực tiếp template `dangerReq` thực tế và xác nhận `stakesTag`, kiểm tra tiếp cận thưởng tối thiểu +25% Ahn và bonus Merit, đồng thời kích hoạt thất bại ủy thác để kiểm chứng sát thương phạt nặng tăng thêm (+4 HP, +3 SP) chính xác 100%.
* **Kiểm định toàn vẹn:**
  * Toàn bộ các ca kiểm thử trong `tests/test_reported_balance_bugs.mjs` vượt qua 100%.
  * `npm test` (53 test suites, story lint, voice lint, scan rhythm, parity FE/BE, 500 moments audit) đạt 100% xanh.
  * `npm run build` hoàn tất xuất sắc trong 8.33 giây, không phát sinh bất kỳ lỗi cảnh báo nào.

### Đợt 74 (28/10/2026): Atlas nơi sinh trên trang chủ

* Thay vòng quay chọn District ở màn khởi đầu bằng bản đồ SVG tự vẽ của The City. Bố cục 26 District giữ tương quan A–Z của bản đồ Project Moon; Outskirts nằm ngoài tường thành. Ranh giới District được chia thành vùng tương tác, có nhãn cho bàn phím và trình đọc màn hình. Bản đồ là bản diễn giải cho giao diện, không phải bản đồ địa lý chính thức hay ảnh gốc của game.
* Thêm kính lúp nhỏ trên bản đồ khi xem toàn cảnh. Nút chọn ngẫu nhiên và nút bắt đầu dùng cùng hàm chọn nơi sinh hiện có; nhấn bắt đầu sẽ lia và phóng tới District hoặc Outskirts đã được chọn, sau đó mở lớp ghi nhận hồ sơ và tạo nhân vật. Lựa chọn cố định đi thẳng vào đúng District; lựa chọn ngẫu nhiên được quyết định cho lượt chơi đó, không khóa cấu hình cho đời sau.
* Trên điện thoại, nút bắt đầu nằm ngay dưới bản đồ để không phải cuộn qua toàn bộ biểu mẫu. Giữ các mục tên, giới tính, gia cảnh và hạt giống ở phần thiết lập bên dưới. Nút “Toàn bản đồ” đưa góc nhìn về toàn cảnh; chọn lại “Ngẫu nhiên” cũng đưa góc nhìn về toàn cảnh.
* Giao diện giữ nền đen, vàng và ngôn ngữ hồ sơ của trò chơi. Chỉ lấy ý tưởng tương tác bản đồ và kính lúp từ Furrow của Hallmark, không sao chép giao diện nông trại. Khu vực mới được tách thành `CityBirthAtlas.jsx` và `city-atlas.css`.
* Kiểm tra Chrome ở 1440, 768 và 390 px: có 26 District tương tác, không tràn ngang; thử chọn K, ngẫu nhiên và Outskirts cho kết quả sinh đúng nơi đã hiển thị. `npm test`, `npm run build` và `tests/test_outskirts_journey.mjs` đều đạt trước chỉnh sửa cuối cùng về nút đặt lại ngẫu nhiên. Hallmark lint trên các file mới: 0 lỗi/cảnh báo. Taste inspector còn cảnh báo từ font tải ngoài và một lần ghi nhận favicon tải chậm trong Chrome headless; tải lại favicon thành công, chưa thấy lỗi ổn định để sửa asset.

### Bổ sung giao diện atlas (28/10/2026)

* Chuyển bản đồ từ mảng đỏ phẳng sang nền than mực với mạng phố, ô công trình và hai vòng kiểm soát quanh lõi The City. Màu đỏ giới hạn ở ranh giới District và tường thành; vàng vẫn đánh dấu lựa chọn và hành động chính. Kính lúp mặc định soi một phần mạng phố thay vì phóng đại chữ A khi người chơi chưa chọn nơi sinh.
* Nền trang chủ dùng trăng đỏ bị che khuất và sắc trời tối hơn. Ở điện thoại, trăng được đẩy về góc phải để không đè lên tiêu đề. Các thay đổi chỉ là SVG/CSS; luật gieo nơi sinh, nơi sinh cố định và luồng bắt đầu vẫn giữ nguyên.
* Đã xem ảnh desktop 1440 px và điện thoại 390 px sau chỉnh sửa; bản đồ không tràn ngang. `npm run build` đạt. Hallmark sloplint trên component/CSS: 0 FAIL, 0 REFLEX, 0 WARN. Taste lint: 0 FAIL, 2 WARN cho `box-shadow` dùng để vẽ phần trăng bị che, không phải bóng của thẻ UI. Taste inspector trên bản build còn 1 FAIL do favicon SVG tải không ổn định trong phiên Chrome headless đầu tiên; các lần mở sau tải được. Các cảnh báo về font Google và mật độ nội dung trang là phần tồn tại trước đợt đổi atlas, chưa được xử lý trong đợt này.

### Bản đồ đỏ theo ảnh tham chiếu Project Moon (28/10/2026)

* Đưa atlas về sắc đen và đỏ thẫm của bản đồ tham chiếu: bổ sung lớp phố nhỏ, ô công trình, tuyến đường lớn và vạch quét đỏ. Ranh giới District, đường bao City và vòng tường ngoài có độ sáng phân cấp; tường ngoài dùng nhịp vạch ngang gần với ảnh gốc. Từng District có chữ cái và số District trên desktop; trên điện thoại ẩn số nhỏ để chữ cái còn đọc được.
* Giữ bản đồ SVG tự vẽ và 26 vùng bấm được, kể cả Outskirts; không thay hàm chọn nơi sinh hoặc dữ liệu game. Trên mobile, nhãn trạng thái nằm dưới hình để không che District ở mép nam; ẩn khối ghi chú trùng thông tin để tiêu đề của form không nằm dưới thanh điều hướng cố định. Vàng vẫn chỉ xuất hiện ở kính lúp, nơi chọn và nút chơi theo hệ màu `DESIGN.md`.
* Đã xem render 1440 và 390 px, kiểm tra không tràn ngang. Chọn District K bằng bản đồ cập nhật trạng thái thành District 11. `npm run build` và `tests/test_outskirts_journey.mjs` đạt. Hallmark lint trên hai file atlas: 0 FAIL/REFLEX/WARN. Taste lint còn hai cảnh báo cũ về `box-shadow` dùng để tạo hình trăng bị che. Taste inspector trên bản build hết lỗi chữ bị thanh mobile che nhưng còn 1 FAIL không ổn định: favicon SVG đôi lúc chưa giải mã ở lần mở đầu Chrome headless; đây là asset/logo chung, chưa thay trong lượt chỉnh atlas.

### Kính lúp khi phóng bản đồ (28/10/2026)

* Kính lúp không còn biến mất khi `viewBox` thu nhỏ hoặc camera đang lia. Bán kính và độ dày viền thay đổi theo `viewport.width` để đường kính hiển thị gần như cố định trên desktop/mobile; trong lúc lia kính nằm ở tâm camera, sau khi dừng nằm ở nơi sinh được chọn hoặc theo chuột.
* Khi đã phóng sâu, kính tập trung vào chi tiết phố thay vì phóng đại thêm chữ District. Vùng District được chọn có lớp tô bán trong suốt để mạng phố bên dưới còn thấy được. Logic chọn vùng và nơi sinh của nhân vật không thay đổi.
* Sửa tiếp lỗi nhãn District bị lớp kính che khi zoom: kính vẫn phóng đại phố, sau đó vẽ lại chữ cái/số District tại đúng tọa độ và kích thước bản đồ bên trong vùng kính. Đã tái hiện bằng District R (18) trên mobile: chữ R còn thấy rõ trong kính khi camera phóng tới vùng này.
* Theo phản hồi mới, bỏ lớp nhãn vẽ lại: chữ District và OUT trong kính nay phóng đại cùng phố. Thêm nền kín cho kính trước lớp bản đồ phóng đại để chữ nền không lộ xuyên qua; Outskirts không còn hai chữ OUT chồng nhau. Đã xem trực tiếp trường hợp zoom R và Outskirts trên mobile.

### Đợt 75 (28/10/2026): Tái thiết kế trải nghiệm gameplay (Chronicle & Stage Feed) theo chuẩn design-taste-frontend & hallmark

* **Khung trung tâm (Chronicle Stage Feed):**
  * Khắc phục triệt để khoảng trống vô tận khi nhật ký còn ngắn (đầu đời hoặc năm ít biến cố) bằng thẻ **Horizon & Inner Drive Card** dạng tài liệu niêm phong viền nét đứt. Thẻ hiển thị trực quan tiến độ mục tiêu sự nghiệp hiện tại (vd: Sát hạch Fixer / Khởi nghiệp Wing) hoặc châm ngôn sống của một đứa trẻ Backstreets khi còn nhỏ.
  * Bổ sung **Hana District Docket Header** trên đầu trang biên niên với chấm tín hiệu định vị phát sáng và mã định danh hồ sơ (`HANA-REC // TÊN · GEN #1 · 0y`), hiển thị trực tiếp Quận/Khu vực nhân vật đang sinh sống.
* **Cột nhân vật (Dossier):**
  * Nâng cấp thanh HP và SP từ thanh phẳng 3px thành **Segmented Tactical Pulse Gauge** (thanh vạch chia 10 khúc cơ học kiểu máy đo điện áp).
  * Thêm trạng thái tâm trí **Carmen Calls**: Khi SP tụt thấp ($\le 22$), toàn bộ thẻ chỉ số SP sẽ kích hoạt hiệu ứng phát sáng thì thầm của Ánh Sáng tím (`carmenWhisper`) cùng tag cảnh báo `Carmen Calls`.
  * Thay thế 3 vạch ngang vô hồn của Taboo Gaze bằng **3 Con Mắt Cơ Học Giám Sát Của The Head**. Khi có vi phạm, mắt mở sáng vàng cảnh cáo; khi chạm mốc 2/3, hai con mắt rực đỏ nhấp nháy (`eyeAlert`) cùng cờ báo động khẩn cấp `Lần tới: Claw`.
* **Tối ưu hóa di động (Thumb-First Zone):**
  * Bổ sung thanh điều khiển nhanh nổi **Mobile Thumb Action Bar** cố định ở mép dưới màn hình di động, đưa nút "Sự kiện tiếp" vào đúng tầm với ngón tay cái mà không cần phải với tay lên đầu màn hình.
  * Chuyển modal quyết định và sự kiện (`.event-modal-backdrop`) sang dạng Bottom-Sheet trượt từ đáy lên, giúp thao tác chọn phương án bằng một tay tự nhiên và thuận tiện.
* **Kiểm định toàn vẹn:**
  * `npm run build` hoàn tất xuất sắc (7.38s), không phát sinh lỗi cảnh báo nào.
  * `npm test` vượt qua 100% toàn bộ 53 bộ kiểm thử hồi quy (Story Lint, Voice Lint, Causal Arcs, Career Paths, 500 Moments Million Audit).

### Đợt 76 (28/10/2026): Tái thiết kế khung Mở hồ sơ mới (BirthSetupPanel) theo chuẩn Hana Bureaucracy Docket

* **Phân luồng mục đích (Dual-Mode Tab Architecture):**
  * Triệt tiêu hoàn toàn xung đột hiển thị giữa "Kiếp đang dở" và "Khai sinh kiếp mới". Khi có tiến trình lưu trữ (`savedRun`), khung trang bị thanh chuyển tab rõ ràng: `[Kiếp đang dở: {Tên}]` và `[Khai sinh kiếp mới]`.
  * Tab "Kiếp đang dở" hiển thị dạng **Active Dossier Card** gọn gàng với mã số hồ sơ Hana (`REC // AGE · GEN`), cấp bậc nghề nghiệp, thanh sinh tồn tóm tắt (HP, SP, Ahn) và nút lớn `[Viết tiếp câu chuyện]`, vào game ngay lập tức mà không phải nhìn qua biểu mẫu dài.
* **Chuẩn hóa chất liệu Project Moon (Hana Bureaucracy Aesthetic):**
  * Tiêu đề nâng cấp với biểu tượng con dấu niêm phong `Stamp`, mã quản lý hồ sơ `HANA REGISTRY // FORM 0-A`, phông chữ và viền kính hun khói đen sâu (`#0a090d`) với ánh viền đồng thau cổ (`#d8b265`).
  * Nút giới tính được dập nổi với ký hiệu sinh học (`♂ Nam`, `♀ Nữ`), có viền phát sáng khi chọn.
  * Nút liên kết bản đồ nơi sinh được tinh chỉnh trực quan với icon `MapPin` đồng bộ với City Atlas.
  * Nút hành động chính (CTA) mang chất niêm phong giao kèo số phận: `[Đóng dấu & Bước vào The City]`.
* **Kiểm định toàn vẹn:**
  * `npm run build` hoàn tất xuất sắc (7.08s), 0 lỗi đóng gói.
  * `npm test` vượt qua 100% toàn bộ 53 bộ kiểm thử hồi quy, tuân thủ nghiêm ngặt vị trí `#birth-region` trước nút `hero-start-btn`.

### Đợt 77 (28/10/2026): Tái thiết kế khung BirthSetupPanel chuẩn Hana Terminal Docket, xử lý dứt điểm lỗi lẹm chữ và tràn khung nhìn

* **Khắc phục triệt để lỗi lẹm chữ trên thanh Tab (Tab Bar Overflow & Squish Fix):**
  * Đưa tên nhân vật ra khỏi tiêu đề nút tab; chuyển thanh tab sang hệ lưới 2 cột cố định (`grid-template-columns: 1fr 1fr; white-space: nowrap;`).
  * Tab 1: `[ ⏵ TIẾP TỤC HỒ SƠ ]` (hoặc `[ ❖ KẾ THỪA GEN #X ]` khi có di sản huyết thống).
  * Tab 2: `[ ✦ KHAI SINH MỚI ]` (hoặc `[ ✦ KHAI SINH ĐỘC LẬP ]`).
  * Tên nhân vật, tuổi thọ, thế hệ, nghề nghiệp và chỉ số sinh tồn (HP, SP, Ahn) được gom gọn trang trọng bên trong thẻ hồ sơ mật `resume-dossier-card` bên dưới, triệt tiêu 100% hiện tượng xuống hàng gãy từ và ba chấm cụt ngủn (`Santiago Mend...`).
* **Giải quyết dứt điểm lỗi tràn màn hình khi có di sản huyết thống (Legacy Succession Viewport Discipline):**
  * Tách biệt chế độ kế thừa di sản (`legacy`) thành một luồng hiển thị ưu tiên độc lập thay vì nhồi nhét toàn bộ form tạo nhân vật mới kèm khối accordion dài ngoằng ở đáy làm trôi nút bấm xuống dưới thanh taskbar Windows.
  * Khi có `pendingLegacy`, giao diện mở thẳng thẻ **Legacy Succession Docket** với huy hiệu quan hệ (`Người kế thừa` / `Môn đệ` / `Con cháu`), thông điệp tiếp nhận ý chí tiền nhân, kỷ vật gia truyền (`relic`) và nút bấm dập dấu tiếp quản từ tuổi 0 / tuổi trưởng thành hiển thị ngay trung tâm, hoàn toàn nằm gọn trong khung nhìn chuẩn laptop/mobile (~380px) mà không cần cuộn trang.
  * Cho phép chuyển đổi linh hoạt sang tạo nhân vật độc lập bất cứ lúc nào qua tab hoặc nút liên kết kín đáo ở chân form.
* **Nâng cấp độ độc đáo và tinh tế cơ học chuẩn Project Moon (Hallmark & design-taste-frontend):**
  * Thêm 4 góc gá đồng thau cơ học (`.birth-panel::before`, `.birth-panel::after`) tạo cảm giác một thiết bị terminal lưu trữ hồ sơ bằng kim loại viền vàng thau cổ (`#d8b265`) của Hiệp hội Hana.
  * Bổ sung thanh trạng thái kết nối terminal thời gian thực (`● CONNECTED`) đi kèm mã kiểm định hồ sơ `HANA ARCHIVE // LINEAGE TRANSFER` hoặc `HANA ARCHIVE // ACTIVE DOSSIER`.
  * Nút niêm phong giao kèo (`hero-start-btn` & `legacy-start-btn`) được hoàn thiện bằng chất liệu dập nổi ánh kim vàng sa cơ học, đổ bóng xúc giác (`inset 0 1px 0 rgba(255, 255, 255, 0.35)`), phản hồi vật lý khi bấm (`active: translateY(1px)`).
  * Tinh chỉnh khoảng cách trường nhập (`gap: 12px`), thu gọn độ cao các thành phần để tổng thể khung form thanh thoát, sắc nét và đạt chuẩn thẩm mỹ cao.
* **Kiểm định toàn vẹn:**
  * `npm run build` hoàn tất xuất sắc (7.38s), 0 lỗi đóng gói.
  * `npm test` vượt qua 100% toàn bộ 53 bộ kiểm thử hồi quy (Story Lint, Voice Lint, Causal Arcs, Career Paths, 500 Moments Million Audit), bảo toàn điều kiện kiểm thử mobile `#birth-region` trước `hero-start-btn`.


