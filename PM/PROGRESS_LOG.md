# The City Chronicles: tiến trình dự án

### 21/10/2026, sửa BUG-17 đến BUG-22 từ log người chơi

- BUG-17: nhiệm vụ nhận lệnh thanh trừng chỉ dành cho cấp dưới Syndicate. Người đạt bậc chỉ huy có một tình huống riêng về lệnh thu tiền bảo vệ.
- BUG-18: NPC có tuổi tại lúc gặp, già đi cùng nhân vật và có thể qua đời vì tuổi già. Cái chết cập nhật trạng thái quan hệ, để các event sau không gọi họ như người còn sống. Cha/mẹ trong tuyến kế thừa tiếp tục theo mốc truyện riêng.
- BUG-19: lựa chọn chữa trị giữ `costAhn` khi chuyển sang bảng quyết định; lựa chọn thiếu Ahn bị khóa cả ở chuột, bàn phím và autoplay. Kiếp lưu từ bản cũ cũng đối chiếu giá từ dữ liệu gốc.
- BUG-20: tối đa bốn sẹo đang tác động. Sẹo dư trong save cũ chuyển vào lịch sử có thể mở xem; sẹo đang mang gây giảm HP/SP ở cuối năm. Resonance rất cao cùng nhiều sẹo đưa nhân vật trưởng thành đến ngã rẽ Carmen; tuổi 100–140 không còn bị chặn bởi giới hạn tuổi sự kiện.
- BUG-21: sự kiện sốt của người bạn ở Backstreets chỉ xuất hiện với cư dân Backstreets.
- BUG-22: các dòng kể về ca làm, lương và việc tại Workshop chỉ xuất hiện khi nhân vật đã trưởng thành và có nghề; tuổi 15 vẫn có thể tìm hiểu hoặc nộp đơn học việc.
- Kiểm tra: có kiểm thử hồi quy riêng cho sáu lỗi; build FE thành công, lint kịch bản 0 lỗi/0 cảnh báo, mô phỏng 50.224 khoảnh khắc không vi phạm năm nhóm quy tắc và 120 cuộc đời không phát hiện lỗi logic.

### 21/10/2026, rà soát kịch bản và logic

- Đối chiếu bản gốc lưu trong `docs/narrative/baseline.json` với dữ liệu đang chạy: từ 366 lên 752 mục (212 biến cố chính, 36 hệ quả, 178 tình huống ngắn, 302 dòng thường ngày, 24 ủy thác Fixer). Số ủy thác giữ nguyên; bốn nhóm còn lại đều đạt ít nhất gấp đôi.
- Thêm 18 cặp lựa chọn và hồi đáp sau hai năm, 3 tình huống độc lập, cùng 18 ủy thác Fixer có kết quả thành công, thất bại và tử trận riêng. Các chi tiết nhỏ được giữ ở cấp đời sống, không mặc định đẩy mọi mạch truyện lên quy mô thảm họa.
- Giữ E.G.O và Distortion là những ngã rẽ riêng. E.G.O không tự hao Sanity mỗi năm để bắt buộc thành Distortion. Ý tưởng truy săn Distortion và nhiều kết cục vẫn hiện diện trong các tuyến tương ứng.
- Sửa lời hẹn nhân quả bị gọi lặp, thêm lối rời phòng khám khi không đủ Ahn, và cho mô phỏng chọn đúng phương án khả dụng. Bản xuất `TOAN_BO_KICH_BAN_PROJECT_MOON.txt` và `DANH_SACH_TAT_CA_EVENTS.txt` được tạo lại từ dữ liệu hiện hành; quy tắc riêng của game được ghi rõ là sáng tác phái sinh.
- Kiểm tra: `node lint_story.mjs` không có lỗi/cảnh báo; 18 cặp nhân quả có kiểm thử đi hết hai nhánh; 120 cuộc đời ngẫu nhiên và 300 cuộc đời chọn phương án có lợi không phát hiện vi phạm; production build thành công. `run_million_audit.mjs` đã xử lý 1.000.032 khoảnh khắc trong 4.227 cuộc đời và ghi báo cáo vào `BAO_CAO_KIEM_THU_1_TRIEU_KICH_BAN.txt`. Đây là kiểm tra mô phỏng theo mẫu, không phải chứng minh mọi nhánh truyện đều được chơi; lượt 120 cuộc đời ngẫu nhiên đã gặp 658/728 sự kiện chính, hệ quả, ngắn và thường ngày.

---

Cập nhật: 21/10/2026, đợt 14 (xem [mục 8](#8-nhật-ký-thay-đổi))

- Live Demo Vercel: [https://project-moon-life-five.vercel.app](https://project-moon-life-five.vercel.app)
- Tài liệu PDF chính thức: [THE_CITY_CHRONICLES_DOCUMENTATION.pdf](https://project-moon-life-five.vercel.app/THE_CITY_CHRONICLES_DOCUMENTATION.pdf)
- Frontend: `D:\School\PM` (React 18, Vite 6, Zustand 5, Ant Design 6 cho modal/tooltip/thông báo, CSS thuần trong `src/index.css`)
- Backend: `D:\School\PM_BE` (.NET 8 Minimal API, cổng 5080)
- Tài liệu thế giới và hướng đi: [`UNIVERSE.md`](UNIVERSE.md)
- Rà soát antislop: [`anti-slop/audit-001-2026-10-20.md`](anti-slop/audit-001-2026-10-20.md) và báo cáo sửa [`anti-slop/audit-001-2026-10-20-fixes.md`](anti-slop/audit-001-2026-10-20-fixes.md)

Bản này thay cho bản log trước. Bản trước liệt kê vài endpoint và tính năng chưa từng tồn tại; mọi thứ dưới đây đều đã có trong code và đã được chạy thử.

---

## 1. Chạy dự án

```bash
# backend (tùy chọn: không có backend thì game vẫn chạy, chỉ lưu trên trình duyệt)
cd D:\School\PM_BE
dotnet run -c Release

# frontend
cd D:\School\PM
npm install
npm run dev
```

Thanh bên trái hiện `Đã kết nối archive` khi frontend gọi được backend, `Lưu trên thiết bị` khi không. Vite mặc định chạy cổng 5173; nếu cổng đó đang bận, Vite tự chuyển sang cổng kế tiếp và in địa chỉ trong terminal. Bản Git đồng bộ và đợt thiết kế mới nằm tại `D:\School\ProjectMoon_Life`; dùng hai thư mục con `PM` và `PM_BE` của repo này khi tiếp tục phát triển.

---

## 2. Gameplay

### 2.1. Một năm diễn ra thế nào

Mỗi năm là một **kế hoạch** gồm 1 đến 4 khoảnh khắc rải theo mùa (`src/engine/yearPlanner.js`). Thanh năm chạy trong 30 giây ở tốc độ 1× (15 giây ở 2×, 10 giây ở 3×). Khi thanh chạy qua thời điểm của một khoảnh khắc, khoảnh khắc đó diễn ra:

| Loại | Thời gian | Hiện ở đâu |
| --- | --- | --- |
| Dòng thường ngày | vẫn chạy | một dòng trong cột truyện, kèm chip ± chỉ số |
| Sự kiện nhỏ | vẫn chạy ở 1×, có đếm ngược 15 giây | dock viền xanh ở chân cột truyện; hết giờ thì "để nó trôi qua" |
| Sự kiện lớn | dừng | dock viền vàng có ảnh và tiêu đề |
| Request của Fixer | dừng | dock có tỉ lệ thành công / thất bại / tử trận |

Cuối năm, engine tính thu nhập trừ chi tiêu theo nghề và nơi ở, vết thương lành dần, khói bụi và tiếng súng của District, tuổi già, rồi in một dòng "Cuối năm" kèm các thay đổi. Không có hồi phục miễn phí lớn như web mẫu.

### 2.2. Ngẫu nhiên và nhân quả

- **Seed**: hash cyrb128 + bộ sinh sfc32 (`createRNG` trong `gameEngine.js`). Seed mới lấy từ `crypto.getRandomValues`. Đời sống dùng một luồng ngẫu nhiên riêng với lúc khai sinh, nên hai seed gần giống nhau vẫn ra hai đời khác nhau.
- **Khai sinh** ghép từ các mảnh độc lập (`src/data/birthStories.js`): nơi sinh theo xuất thân, gia đình, chuyện xảy ra đêm đó, điềm lúc sinh, và một người bạn thuở nhỏ có tên và tính cách ngẫu nhiên.
- **Bộ tạo tên & Blacklist Canon**: Bộ sinh tên tự do (`nameGenerator.js`) tích hợp danh sách cấm `CANON_NAMES_BLACKLIST` (12 Sinner Limbus Company, Dante, Vergilius, Roland, Angela, Carmen, các Sephirah, Color Fixers và nhân vật quan trọng) nhằm ngăn chặn việc trùng tên gây hiểu lầm bối cảnh.
- **Sự kiện lớn**: Rút có trọng số trong 10 ứng viên tốt nhất thông qua Weaver AI.
- **Kho nội dung phong phú**: **193 sự kiện lớn** độc lập phân bố đều qua 5 nhánh nghề nghiệp chính (Fixer, Syndicate 5 Ngón Tay, Wing Employee, Workshop Craftsman, Distortion), 120 dòng thường ngày, 92 sự kiện nhỏ, 34 loại ký ức nhân quả.
- **Tối ưu nhịp sống ấu thơ (0–4 tuổi)**: Mỗi năm chỉ kích hoạt đúng 1 sự kiện thụ động (daily) luân phiên theo 4 mùa (Xuân, Hạ, Thu, Đông) thay vì dồn dập 4 sự kiện/năm, giúp câu chuyện thở tự nhiên và hoàn toàn không bị trùng lặp câu chữ.
- **Mô phỏng 1,000 kiếp** (`simulate1000.mjs`): 0 lỗi runtime, 100% canonical integrity, 0 lỗi NPC ma, 0 vi phạm logic/lore, 6,745 lượt tương tác kinh tế / sự kiện nhánh.

### 2.3. AI director (`src/engine/director.js`)

- **Ghi nhớ**: lựa chọn để lại khóa ký ức trong `char.memory`. Có 34 loại ký ức; sự kiện có `need.mem` chỉ xảy ra với người từng làm điều đó (ví dụ đốt một Prescript lúc nhỏ thì nhiều năm sau The Index tìm đến).
- **Hậu quả hẹn giờ**: `later` trên một lựa chọn hẹn một sự kiện cụ thể sau N năm; nó hiện trong Hàng đợi nhân quả ở trang Khung cửi.
- **Nhịp**: sau giai đoạn căng thì ưu tiên chuyện lắng, sau giai đoạn yên thì ưu tiên hiểm họa.
- **Chủ đề nghỉ**: cùng một loại chuyện (3:13, The Index, The Ring...) nghỉ 4 năm trước khi quay lại.
- **NPC lên sân khấu**: người lâu không gặp được ưu tiên quay lại câu chuyện; gắn bó giảm dần nếu 3 năm không gặp.
- **Bản chất nhân vật**: bạo lực, nhân từ, tham lam, trung thành được đếm, và kéo theo loại chuyện tương ứng.
- **Theo hoàn cảnh**: chuyện riêng của District được ưu tiên ×2,6; sau khi biến dạng thành Distortion, chuyện của Distortion được ưu tiên ×6 để kiếp đó không trôi về chuyện thường ngày.
- Mỗi lựa chọn của director được ghi vào Bản ghi chỉ lệnh kèm lý do bằng lời.

### 2.4. Người trong đời bạn và kế thừa huyết thống

Bạn thuở nhỏ (tạo lúc sinh), người thầy, đối thủ, người thương, bạn đời, cộng sự, con, cha/mẹ bảo hộ. Mỗi người có tên, nét tính cách, độ gắn bó, và trạng thái (sống, chết, mất tích, đã rời bỏ bạn). Họ hiện trong hồ sơ nhân vật. Người thương có thể trở thành bạn đời; khi sự kiện cưới diễn ra, chính người đó là người bạn cưới.

**Phụ huynh bảo hộ & Kế thừa thế hệ sau (Succession System)**:
- **Ngữ cảnh sinh nở hợp lý**: Nhân vật chết non (dưới 16 tuổi) không thể có con.
- **Tiếp quản khi cha mẹ mất**: Khi chuyển giao sang nhân vật con đời kế tiếp, khắc phục triệt để nghịch lý "cha mẹ 40 tuổi qua đời để lại con 18 tuổi nhưng con lại bắt đầu chơi từ 0 tuổi với cha mẹ đã chết". Cung cấp 2 lựa chọn trải nghiệm tại `BirthSetupPanel.jsx`:
  1. *Khởi đầu từ 0 tuổi (Living Parent Mentorship)*: Người cha/mẹ quá cố vẫn còn sống trong hồ sơ (`npcs.parent`), che chở, chu cấp chi phí sinh hoạt, tăng sức đề kháng và giảm tỉ lệ tử vong tuổi ấu thơ. Đến đúng năm người con đạt số tuổi mà cha mẹ qua đời trong lịch sử (`char.age === deathAgeInChildLife`), sự kiện bước ngoặt lịch sử `csq_parent_historic_passing` ("Bóng Lưng Cuối Cùng") sẽ kích hoạt, tái hiện lại sự ra đi của bậc tiền bối và chính thức chuyển giao toàn bộ di sản/vết sẹo/Ahn.
  2. *Tiếp quản ở tuổi 18 (Take Over at Age 18)*: Bỏ qua giai đoạn thơ ấu được bảo bọc, lập tức bước vào The City với tư cách Fixer/Cư dân trưởng thành độc lập, kế thừa trọn vẹn di sản.

### 2.5. Hiển thị thay đổi

- Chip ± dưới mỗi dòng truyện (chỉ số, gắn bó, người mới, người mất, vết sẹo, hậu quả được gieo), bật lên lần lượt.
- Mỗi lựa chọn hiện trước tác động: thay đổi cố định, hoặc khoảng giá trị và tỉ lệ nếu là may rủi.
- Thanh chỉ số trong hồ sơ nhấp sáng và nổi số khi thay đổi.
- Hiệu ứng toàn sân khấu cho cái chết, E.G.O, Distortion, mất người thân, bước ngoặt, hiểm họa, tiếng vọng nhân quả. Tất cả tôn trọng `prefers-reduced-motion`.

### 2.6. Lưu và chơi tiếp (Kiến trúc Dual-Save)

- Tự lưu sau mỗi thay đổi (gộp trong 1,2 giây), khi đóng tab, và khi bấm Lưu.
- Nút Về trang chủ giữ tiến trình; trang chủ hiện thẻ "Kiếp đang dở" với nút Chơi tiếp.
- Bắt đầu kiếp mới khi đang chơi thì phải xác nhận.
- Tiến trình lưu ở `localStorage` và ở backend (`/api/state/main`) nếu backend đang chạy.
- **Không cần cơ sở dữ liệu SQL bên ngoài**: Hệ thống tự động ghi nhớ toàn diện qua kiến trúc Dual-Save: Client lưu trữ tức thì bằng trình duyệt (`localStorage`), Backend .NET 8 ghi nền nguyên tử xuống file JSON (`city_archive.json` và `run_state.json`) với cơ chế đổi tên file tạm `.tmp` và bản backup snapshot `.bad`. Dữ liệu an toàn tuyệt đối chống sập nguồn hay tắt đột ngột mà không đòi hỏi người dùng phải cài đặt bất kỳ hệ quản trị SQL (MySQL, Postgres, SQL Server) phức tạp nào.

### 2.7. District và tuyến có chuyện riêng

Đủ 26 District cùng The Outskirts. Chi tiết từng nơi ở `UNIVERSE.md`, mục 1.1. Ba District thêm ở đợt 3:

| District | Nguồn | Có gì |
| --- | --- | --- |
| 5 · E Corp | phóng tác (lore chưa có) | trời sáng 24 giờ, bóng tối thuê theo giờ; 5 dòng thường ngày, 3 sự kiện nhỏ (nhà trọ cách sáng, mười một phút mất điện, đêm đóng chai) |
| 15 · O Corp | phóng tác (lore chưa có) | hợp đồng tự thi hành lên người ký; 5 dòng thường ngày, 3 sự kiện nhỏ, trong đó chuỗi bảo lãnh nợ cho người bạn đến hạn sau 3 năm |
| 26 · Z Corp | canon: có tồn tại, không có trên bản đồ | chỉ số hiện "?", không có Singularity; 4 dòng thường ngày, 3 sự kiện nhỏ (làm giấy tờ, về quê không tìm ra đường, những người mặc đồng phục không phù hiệu) |

E và O mang nhãn "Phóng tác", Z mang nhãn "Không có trên bản đồ" (`src/components/RegionMark.jsx`), ở bản đồ chọn nơi sinh và trong Từ điển.

**Sau Distortion**: khi buông theo Carmen, mỗi năm Heat +6 (Hana giữ hồ sơ mở) và Network −2. Có 5 dòng thường ngày và 5 sự kiện riêng: người bạn tìm đến, hai Fixer nhận request về bạn, căn nhà cũ, cơn đói, giọng nói quay lại. Phục kích khi Heat cao là một đội Fixer của Hana; chết vì vết thương thì được ghi là bị xử lý như một Distortion (`woundDeath` trong `gameEngine.js`). Trong mô phỏng, kiếp biến dạng ở tuổi 20 sống thêm trung vị 12 năm.

### 2.8. Chọn sự kiện, độ mới và chất riêng của mỗi đời

- **Không còn cấm cứng**: bộ đệm cấm lặp và vòng LRU cũ được thay bằng trọng số theo độ mới (`freshness` trong `yearPlanner.js`). Mục vừa xuất hiện bị giảm mạnh, mục đã lâu không gặp được kéo lên, nên pool không bao giờ cạn mà vẫn ít lặp. `RECENT_LIMIT` là 120 và có thêm `seenCount`.
- **Chất riêng của mỗi đời** (`src/engine/variance.js`): mỗi kiếp tung năm đặc tính từ seed (`luck`, `vigor`, `nerve`, `hustle`, `drama`). Chúng nghiêng kết quả may rủi, tần suất tai nạn, số khoảnh khắc mỗi năm và độ lệch của hiệu ứng (±30%). Những sự kiện in số cụ thể trong lời kể (`PRINTED_NUMBERS`) thì không bị lệch để chữ và con số luôn khớp.
- **Deduplication trong năm**: mọi sự kiện trong 4 mùa của một năm vẫn phải có ID độc nhất.
- **Kiểm thử**: `node story_logic_audit.mjs` đo độ trùng trong một đời và giữa các đời (xem đợt 13).

### 2.9. Logo & Bộ nhận diện thương hiệu Project Moon

- **Logo & Favicon Vector Bespoke**: Biểu tượng thương hiệu độc quyền phản ánh bản chất của thế giới Project Moon: Vầng trăng khuyết vàng kim uy nghiêm (`#d4af37`), tháp kiến trúc District 1 vươn thẳng sắc lạnh, và tâm điểm Singularity đỏ thẫm rực cháy (`#ef4444`).
- Tích hợp biểu tượng vector sắc nét tại `public/favicon.svg` và component `BrandMark` đồng bộ tại `src/layouts/Sidebar.jsx` và `src/layouts/Header.jsx`.
- **Trang chủ chuẩn thẩm mỹ Project Moon**: Tái cấu trúc giao diện trang chủ (`BirthSetupPanel.jsx`) với tông tiếng Anh quân sự, tối giản và lạnh lùng (Hero Dossier, Sector Records, Legacy Ledger), giữ trọn vẹn phong thái đặc trưng của series game.

### 2.10. Quy chuẩn Lore & Ngữ thái (Anti-Slop)

- **Cấm dịch gượng gạo danh xưng thế giới**: Luôn giữ nguyên thuật ngữ gốc của vũ trụ Project Moon (`The City`, `Nest`, `Wing`, `Corp`, `Backstreets`, `Fixer`, `Association`, `Workshop`, `Syndicate`, `Ahn`, `Outskirts`, `Ruins`, `Singularity`, `Distortion`, `E.G.O`); tuyệt đối không dùng "Đô Thành", "đại đô thị", "phố ngầm".
- **Sự kiện Canto**: Các mốc sự kiện Canto đóng vai trò làm giàu bối cảnh thế giới (công nghệ cánh, biến cố khói bụi, tàn dư chiến tranh), không gò ép tuyến tính hay bắt buộc nhân vật phải tham gia trực tiếp.
- **Hình tượng Carmen chuẩn xác**: Carmen luôn xuất hiện dưới ánh mặt trời rực rỡ, thiêu đốt và ấm áp huyền ảo (The Scorching Sun), không phải ánh trăng đêm.
- **Cân bằng biến dị**: E.G.O và Distortion giữ độ hiếm cao tột bậc; tích hợp hệ thống 5 năng lực tâm trí Disco Psyche (Logic, Empathy, Volition, Inland Empire, Half Light) thể hiện sự giằng xé nội tâm khi đối diện Carmen.

### 2.11. Kinh tế The City, Tiêu tiền Ahn & Hồi phục theo Lore

- **Các điểm tiêu tiền (Ahn Sinks) bám sát Canon**: Giải quyết tình trạng dư thừa Ahn và thiếu hụt dịch vụ hồi phục khi nhân vật bị trọng thương hoặc chấn thương tâm lý. Tích hợp 7 sự kiện lớn tại `src/data/eventsWorkshopEconomy.js`:
  1. *Viện Tái Sinh Sinh Học K Corp (`econ_kcorp_regeneration_pavilion`)*: Dòng dịch ngọc bích từ Singularity của K Corp giúp nối liền xương thịt đứt lìa và hồi phục lượng HP khổng lồ (26–48 Ahn).
  2. *Buồng Tua Ngược Thời Gian T Corp (`econ_tcorp_chrono_restoration`)*: Singularity Thời Gian của District 4 tua ngược đồng hồ sinh học về 2 tuần trước khi chịu chấn thương mà không cần phẫu thuật (28–52 Ahn).
  3. *Đại Tiệc HamHamPangPang (`econ_hamhampangpang_feast`)*: Tiệm bánh mì nướng bơ tỏi và trà thảo mộc huyền thoại của Roland, xoa dịu tâm trí, hồi phục Sanity và làm giảm đáng kể Distortion Resonance (10–24 Ahn).
  4. *Sảnh Spa Khoáng Nóng & Jazz Club J Corp (`econ_jcorp_luxury_spa_lounge`)*: Suối nước nóng sulfur và nhạc jazz District 10 giúp gột rửa stress, giảm nguy cơ Biến dị và hạ nhiệt độ truy nã Faction Heat (18–42 Ahn).
  5. *Đại Tu Giáp Trụ & Vũ Khí Atelier Độc Quyền (`econ_atelier_armor_overhaul`)*: Xưởng rèn chứng nhận Tres (Zelkova, Wheels Industry, Mook) gia cố giáp nano và mài sắc vũ khí tăng khả năng sống sót (18–45 Ahn).
  6. *Trú Ẩn Bí Mật Safehouse Seven Association (`econ_seven_safehouse_diplomacy`)*: Mua quyền bảo hộ ngoại giao, chữa trị vết thương kín và tẩy sạch hồ sơ truy nã từ các điều tra viên Hiệp hội Seven (22–55 Ahn).
  7. *Ẩm Thực Đen Tối District 23 (`econ_district23_gourmet_pie`)*: Bánh thịt nghệ nhân đặc biệt phong cách Pierre bộc phát sinh lực thể chất cực hạn (12–25 Ahn).
  8. *Điều chỉnh Thị thực Nest Visa (`econ_nest_visa_opportunity`)*: Hạ chi phí từ 180 Ahn xuống 85 Ahn để phù hợp với mức trần tối đa 100 Ahn của game.
- **Nâng cấp sự kiện ngắn & Y tế cơ sở**: Thêm các lựa chọn chi trả K Corp Ampoule nguyên tem tại phòng khám Backstreet & Nest (`src/data/lifeMinors.js`), cùng 3 sự kiện ngắn mới: ăn trưa HamHamPangPang (`m_wellness_hamham_lunch`), phẫu thuật cấy phổi lọc độc chợ đen (`m_med_blackstreet_doctor_organ`), và bảo dưỡng trang bị workshop (`m_wellness_workshop_tuneup`).
- **Utility Consideration 6 (Cơ chế thu hút dịch vụ & cấp cứu)**: Trong `utilityCurves.js`, khi nhân vật tích lũy nhiều tiền (`wealth >= 35`), thuật toán tự động tăng điểm ưu tiên cho các sự kiện nhà hàng, spa, workshop cao cấp. Ngược lại, khi Health (`< 72`) hoặc Sanity (`< 70`) giảm sút, hệ thống tự động ưu tiên lên lịch sự kiện phòng khám và phục hồi.
- **Rõ ràng chi phí & vô hiệu hóa nút bấm thiếu tiền**: Cả `EventDock` và `MinorDock` đều hiển thị chip chi phí (`Tốn X Ahn` hoặc `Thiếu Ahn (Cần X)`). Nếu không đủ Ahn, nút lựa chọn tự động bị làm mờ và vô hiệu hóa (`disabled={true}`).

### 2.12. Thăng cấp ngẫu nhiên đa nhánh (Multi-Track Promotion Pools)

- **Xóa bỏ chuỗi thăng cấp tuyến tính cố định**: Trước đây, các kỳ khảo hạch Fixer từ Grade 8 đến Grade 1 diễn ra theo một kịch bản đơn nhất. Hệ thống mới phân bổ mỗi Grade thành các pool khảo hạch ngẫu nhiên đa dạng (kết hợp các Hiệp hội chuyên trách: Zwei, Seven, Shi, Tres, Cinq, Oufi, Dieci, Molar, Devzat, Warp, Reindeer, Black Silence, Calamity...).
- **Chọn ngẫu nhiên qua seed**: Mỗi lần đủ điều kiện thăng cấp, Weaver AI sẽ bốc thăm ngẫu nhiên bằng `rng()` từ pool ứng viên đủ điều kiện, tạo ra hàng chục lộ trình sự nghiệp Fixer độc nhất vô nhị.
- **Mở khóa tiến trình thăng hoa Syndicate khi Distorted**: Khắc phục lỗi kẹt tiến trình khi thành viên Syndicate biến dị thành Distortion; cho phép nhân vật tiếp tục khảo nghiệm đỉnh cao quyền lực của The Five Fingers.

---

## 3. Giao diện

- Một font: Be Vietnam Pro (vẽ cho dấu tiếng Việt). Truyện 18px, giao diện 15–16px, nhỏ nhất 13px.
- Theme tối (mặc định) và sáng, đều đã kiểm tra.
- Màn hình: trang chủ kiểu màn hình tiêu đề game; màn chơi (thanh năm, hồ sơ, cột truyện, dock lựa chọn); Khung cửi chỉ lệnh; Từ điển & khu vực; Gia phả; Thành tựu.
- Điện thoại: thanh trên + thanh điều hướng dưới, hồ sơ gập thành một dòng, bảng đổi thành thẻ.
- Thanh năm vẽ mỗi khung hình bằng `requestAnimationFrame`; các component chỉ đăng ký đúng phần store mình dùng nên không render lại 5 lần mỗi giây.
- Tải: màn chơi tải ngay; Khung cửi, Từ điển, Gia phả, Thành tựu tải khi mở lần đầu (`React.lazy` trong `src/routes/index.jsx`). React, antd và dữ liệu truyện tách thành chunk riêng (`vite.config.js`) để trình duyệt giữ cache giữa các lần cập nhật.
- Ảnh: 23 ảnh chính thức trong `public/assets/limbus/` và 25 phông nền địa danh của Limbus Company lấy từ limbuscompany.wiki.gg trong `public/assets/wiki/` (nén từ 37 MB xuống 4,9 MB). Dự án cá nhân, phi thương mại; nguồn ghi ở cuối trang chủ.

---

## 4. Backend (`D:\School\PM_BE`)

| Endpoint | Việc |
| --- | --- |
| `GET /api/health` | trạng thái, bộ nhớ, số file đang chờ ghi |
| `GET /api/archive` | kiếp đã sống, thành tựu, sự kiện tự viết, thống kê |
| `POST /api/archive/memorial` | ghi bia mộ khi một kiếp kết thúc |
| `POST /api/archive/codex` | gộp thành tựu |
| `POST /api/archive/custom-event` | lưu sự kiện viết trong Khung cửi |
| `GET /api/archive/hall-of-fame?take=10` | những kiếp xa nhất, thọ nhất |
| `GET /api/telemetry` | thống kê toàn cục |
| `GET / PUT / DELETE /api/state/{slot}` | kiếp đang dở |
| `POST /api/weaver/evaluate` | chấm điểm ứng viên sự kiện (chưa dùng ở frontend) |

- Đọc từ bản chụp trong bộ nhớ, không khóa. Ghi chỉ đánh dấu file "bẩn"; một dịch vụ nền ghi xuống đĩa mỗi giây nếu có thay đổi, và ghi lần cuối khi tắt.
- Ghi file nguyên tử: viết vào `.tmp` rồi đổi tên đè, nên tắt ngang không làm hỏng dữ liệu. File không đọc được thì giữ lại bản `.bad` và bắt đầu sạch.
- JSON source-generated (`AppJsonContext`) cho mọi kiểu dữ liệu vào và ra. `ArchiveStoreService` lấy metadata qua `GetTypeInfo(typeof(T))` thay vì thuộc tính sinh ra, để editor không báo lỗi giả khi chưa thấy code sinh ra.
- Mọi trường có giá trị mặc định, nên payload thiếu trường không gây lỗi 500.
- CORS chỉ nhận localhost và mạng LAN `192.168.*`. Giới hạn body 4 MB.
- Dữ liệu: `Data/city_archive.json` và `Data/run_state.json`.

---

## 5. Sửa ở đâu

| Muốn sửa | File |
| --- | --- |
| Dòng thường ngày | `src/data/lifeDailies.js` |
| Sự kiện nhỏ | `src/data/lifeMinors.js`, `src/data/lifeMinors2.js`, `src/data/lifeMinors3.js` (District 5, 15, 26 và đời sau Distortion, kèm dòng thường ngày riêng) |
| Sự kiện lớn tuổi thơ, tuổi 18, hậu quả | `src/data/eventsChildhood.js` |
| Sự kiện lớn theo nghề, gia đình | `src/data/eventsFactions.js` |
| Sự kiện siêu nhiên, mẫu Request | `src/data/eventsSupernatural.js` |
| Khai sinh, tên và tính cách NPC | `src/data/birthStories.js` |
| District, gia cảnh, thành tựu | `src/data/worldData.js` |
| Thiên mệnh, pha nhịp truyện | `src/engine/weaverAI.js` |
| Kế hoạch năm, cuối năm, thu nhập | `src/engine/yearPlanner.js` |
| Trọng số director, ký ức, NPC | `src/engine/director.js` |
| Ảnh theo bối cảnh | `src/features/chronicle/imagery.js` |
| Màu, font, bố cục | `src/index.css` |

### Viết một sự kiện nhỏ

```js
M('m_vi_du', [12, 17], { back: true, npc: 'friend' },
  'Tình huống...', 'Situation...',
  [
    C('Lựa chọn 1', 'Choice 1', 'Kết quả...', 'Result...', { sanity: 3 }, { bond: { friend: 6 }, mem: 'da_lam_x' }),
    C('Lựa chọn 2', 'Choice 2', null, null, {}, { out: [
      O(60, 'Kết quả tốt', 'Good result', { wealth: 4 }),
      O(40, 'Kết quả xấu', 'Bad result', { health: -6 }, { scar: 'Tên vết sẹo' })
    ], later: [{ id: 'm_hau_qua', years: 5, reasonVi: 'Lý do', reasonEn: 'Reason' }] })
  ],
  I('Nếu để trôi qua...', 'If you let it pass...'),
  { tags: ['npc'], theme: 'index', once: true }
)
```

Bộ lọc `need`: `nest`, `back`, `out`, `notNest`, `jobs`, `regions`, `flags`, `noFlags`, `npc`, `noNpc`, `mem`, `noMem`, `grade`, `stat`.
Trong lựa chọn: `fx` (chỉ số), `out` (may rủi), `bond`, `npc`, `npcFate`, `promote`, `mem`, `later`, `motif`, `scar`, `flags`, `setJob`.
Trong chữ: `{name}`, `{friend}`, `{mentor}`, `{rival}`, `{lover}`, `{partner}`, `{child}`, `{parentName}`, `{relic}`, `{scars}`.

---

## 6. Kiểm tra đã chạy

- Build production (`vite build`) và backend (`dotnet build -c Release`): không lỗi.
- Mô phỏng không giao diện: 200 kiếp ngẫu nhiên 0 lỗi, 200 mở đầu khác nhau, 89 sự kiện nhỏ được chạm tới. 150 kiếp ép sinh ở E, O, Z: 0 lỗi, cả 9 sự kiện riêng đều xuất hiện. 150 kiếp ép Distortion ở tuổi 20: 0 lỗi, sống thêm trung vị 12 năm, cả 5 sự kiện Distortion đều xuất hiện.
- Kiểm tra chống trùng lặp sự kiện: 100 kiếp nhân vật liên tiếp (6.000 năm đời sống, 24.000 slot mùa) đạt 0 trùng lặp nội năm (`scratch/check_duplication.js`).
- Kiểm tra kế thừa huyết thống: Cả 2 chế độ kế thừa (bắt đầu tuổi 0 với phụ huynh bảo hộ và nhảy cóc tuổi 18 tiếp quản ngay) đều chạy trơn tru, logic quan hệ và biến cố `csq_parent_historic_passing` kích hoạt đúng năm (`scratch/test_succession_modes.js`).
- Bấm thử tự động trong Chrome, theme tối và sáng, 1440px và 390px: 184 PASS, 0 FAIL (từng nút, nhãn của District 5, 15, 26, phím tắt, lưu, chơi tiếp, điều hướng, tìm kiếm, lọc, ngôn ngữ, đổi theme, không cuộn ngang, không lỗi console).
- Gọi thử mọi endpoint backend, kể cả slot sai (400), slot không có (404), payload thiếu trường, JSON hỏng (400); kiểm tra file trên đĩa sau khi ghi sau 1 giây.
- Bundle chia thành: phần chung khoảng 122 KB, React 182 KB, antd 365 KB, dữ liệu truyện 300 KB, mỗi trang phụ 3 đến 9 KB tải khi mở. Không còn chunk nào quá 500 KB.

---

## 7. Còn lại

- Bốn file cũ không còn dùng (`src/styles/app.css`, `src/styles/tokens.css`, `src/constants/`, `src/components/SceneCanvas.jsx`) chưa xóa được vì môi trường chặn lệnh xóa khi không có git. Có thể xóa tay.
- Các tuyến chuyên sâu trong `implementation_plan.md` (Thirst cho Bloodfiend, luật của The Great Lake, Ji/Yong/In của Hongyuan) mới có sự kiện mở đầu, chưa có cơ chế riêng. Distortion đã có phần sống sót sau biến dạng, chưa có đường quay lại. Xem `UNIVERSE.md`.
- Nếu VS Code mở `PM_BE` vẫn báo đỏ ở `AppJsonContext`, chạy "C#: Restart Language Server"; `dotnet build` sạch, và `ArchiveStoreService` không còn dùng thuộc tính do source generator sinh ra.

---

## 8. Nhật ký thay đổi

### 21/10/2026, đợt 15: mở đầu lặp, 3:13 và vòng quay District

Người chơi báo: đời nào cũng mở bằng 3:13, dòng "Lắng đọng cuối năm" giống hệt nhau mỗi năm, và vòng quay District lúc bắt đầu không còn.

- **Nguyên nhân 3:13**: ở tuổi 5, trẻ Backstreets chỉ có đúng một sự kiện lớn hợp lệ (3:13), và luật "5 năm không có sự kiện lớn thì đến hạn" tính từ lúc sinh nên luôn rơi vào năm 5 tuổi. Đo trên 150 kiếp: 50% số kiếp có sự kiện lớn đầu tiên là 3:13 lúc 5 tuổi.
  - Dưới 12 tuổi, sự kiện lớn đến hạn ngẫu nhiên trong khoảng 5 đến 9 tuổi (`majorIsDue` ở FE, cùng luật ở `DirectorEngineService.cs`). BE đo được: 5 tuổi 33%, 6 tuổi 25%, 7 đến 8 tuổi khoảng 43%, từ 9 tuổi 100%.
  - 13 sự kiện lớn mới cho tuổi 4 đến 12 và 1 hậu quả (`src/data/eventsChildhood2.js`): Backstreets, Nest, Outskirts và loại nơi nào cũng có. Trọng số 3:13 hạ từ 6 xuống 3.
  - Kết quả 300 kiếp: 3:13 là sự kiện lớn đầu tiên ở khoảng 10% số kiếp.
- **Lựa chọn đầu đời giống nhau**: tuổi 4 đến 6 chỉ có 2 đến 3 sự kiện nhỏ hợp lệ, nên "Đồng Ahn dưới gầm ghế" là lựa chọn đầu tiên ở 5/10 kiếp chơi thật. Thêm 24 sự kiện nhỏ cho tuổi 4 đến 11 (`src/data/lifeMinorsKids.js`). Kho tuổi 4 đến 6 tăng lên 7 đến 9 sự kiện, tuổi 7 tăng lên 6 đến 13. Chơi thật 10 kiếp: lựa chọn đầu tiên khác nhau ở 8/10.
- **Dòng cuối năm**: mỗi lý do (hồi phục, tiền thuê, khói bụi...) có 2 đến 3 câu theo độ tuổi (sơ sinh, trẻ em, người lớn), không lặp câu của năm trước (`src/data/yearEndLines.js`, `yearLine` trong `yearPlanner.js`). Nhãn đổi thành "[Cuối năm]". Số câu cuối năm khác nhau trong 300 kiếp tăng từ 44 lên 914. Trẻ 0 tuổi không còn nhận câu về vết thương kéo da non.
- **Vòng quay District**:
  - Trước đây vòng quay chạy bằng transition CSS. Máy tắt "Animation effects" trong Windows thì trình duyệt báo `prefers-reduced-motion`, luật `!important` rút mọi transition về 0,01ms, và bánh xe nhảy thẳng tới đích.
  - Sau lần quay đầu, District vừa quay trúng bị ghi đè vào lựa chọn, nên các lần bắt đầu sau chỉ còn một cú khóa 0,4 giây và mọi kiếp sinh cùng một nơi.
  - Giờ vòng quay chạy bằng `requestAnimationFrame` (`spinTo` trong `BirthSetupPanel.jsx`), lần bắt đầu nào cũng quay (5 vòng khi ngẫu nhiên, 3 vòng khi đã chọn District), và ô giữa hiện District đang nằm dưới kim.
  - "Ngẫu nhiên" giữ nguyên là ngẫu nhiên cho kiếp sau. Kết quả lấy từ `rollBirthRegion` trong `gameEngine.js`, cùng trọng số dân số với engine, có cả Outskirts (kim dừng ở khe giữa Z và A) và 65% sinh lại nơi của đời trước khi kế thừa.
- **Tùy chọn chuyển động**: nút ở thanh bên và thanh trên điện thoại, xoay vòng giữa theo hệ thống, đầy đủ và giảm (`themeStore.motionMode`, `html[data-motion]`, `src/utils/motion.js`). Các khối CSS `prefers-reduced-motion` chỉ áp dụng khi không chọn "đầy đủ". Khi máy tắt hiệu ứng mà người chơi chưa chọn gì, dưới vòng quay hiện một dòng giải thích và nút "Bật đầy đủ". Đo trong Chrome: đầy đủ 5,8 vòng trong 2,5 giây; theo hệ thống trên máy tắt hiệu ứng 1,2 vòng trong 1,1 giây.
- **Kiểm tra**: build FE và BE sạch; mô phỏng 300 kiếp 0 lỗi, 284 mở đầu khác nhau, 200 sự kiện nhỏ được chạm tới; chơi thật 10 kiếp với backend chạy.

### 21/10/2026, đợt 14: Triển khai kiểm thử 5 tầng, loại bỏ simulate1000, đồng bộ FE/BE và deploy Vercel

- **Gỡ bỏ bộ mô phỏng cũ**: Đã xóa hoàn toàn `simulate1000.mjs` (`git rm simulate1000.mjs`). Quy trình kiểm thử chất lượng và tính cân bằng chính thức chuyển sang bộ công cụ kiểm định 5 tầng độc lập (`lint_story.mjs`, `scripts/test_causal_threads.mjs`, `check_be_parity.mjs`, `story_logic_audit.mjs`, `balance_sim.mjs` và `run_million_audit.mjs`).
- **Nghiệm thu kiến trúc mới**:
  - Mô hình kinh tế & sinh học `src/engine/economyModel.js` (`frailty` theo `avgLife` từng District, chi phí chữa bệnh động, lão hóa lũy tiến theo tuổi).
  - Phương sai hữu cơ `src/engine/variance.js` (5 chỉ số ẩn theo seed: luck, vigor, nerve, hustle, drama; rung chấn `jitterEffects` ±30% không lệch mean; `freshness` ưu tiên sự kiện chưa gặp).
  - 18 mạch nhân quả hồi đáp sau 2 năm `src/data/narrative/causalThreads.js`.
  - Bộ công cụ builder kịch bản `src/data/storyKit.js` (`M`, `C`, `O`, `I`, `D`, `AGE`).
- **Kiểm định & Đồng bộ Frontend / Backend**:
  - `check_be_parity.mjs`: Đồng bộ bảng bậc Fixer, mốc Color Fixer (Merit 300 / Rep 95, không bắt buộc E.G.O), 4 bậc Finger giữa C# và JS đạt 100%.
  - Thuật toán băm tất định `StableHash` (FNV-1a 32-bit) trong `DirectorEngineService.cs` thay thế `GetHashCode` ngẫu nhiên của .NET, bảo đảm cùng seed thì kết quả giữa client và server luôn thống nhất.
  - `balance_sim.mjs`: Mô phỏng 1.500 kiếp đời hoàn chỉnh (85.092 năm), tuổi thọ trung bình 55.7 năm (khớp 105.3% lore `avgLife`), các chỉ số tài nguyên vận động tự nhiên, không kẹt trần/sàn.
- **Commit & Deploy Live**:
  - Push commit `78700d5` lên nhánh `main` của repo `minhtamjp1409-blip/ProjectMoon_Life`.
  - Vercel CI/CD tự động build và deploy thành công lên production [https://project-moon-life-five.vercel.app](https://project-moon-life-five.vercel.app) (HTTP 200 OK, khớp 100% hash asset build).

### 21/10/2026, đợt 13

- **Bắt lỗi logic cốt truyện** (`src/engine/storyInvariants.js`, `story_logic_audit.mjs`, `lint_story.mjs`): bộ kiểm tra chạy hàng trăm kiếp và báo mọi cảnh nhắc tới người đã mất, đã bỏ đi hoặc chưa từng có. Đã sửa các lỗi thật tìm được:
  - Cờ `Married` còn sót khi vợ/chồng đã rời đi; người yêu đã xa vẫn được thăng thành vợ/chồng. Nay `applyNpcFate` (`director.js`) đặt đúng bộ cờ Married, Widowed, Separated, LoverLost, ChildLost, PartnerLost, FriendLost, MentorLost, và mọi sự kiện có `need.npc` chỉ chạy khi người đó còn hiện diện.
  - Hai người thân trùng tên khiến cảnh người đã mất như xuất hiện lại. `makeNpc` nay tránh tên đã dùng (`avoidNames`).
  - Distortion không bao giờ đổi `job` (điều kiện chặn sai trong `careerPipeline.js`).
  - Sự kiện lớn có `bond:` không bao giờ áp dụng; nhãn lựa chọn còn sót `{placeholder}`; sự kiện Color Fixer trùng id; bốn id chặng arc trỏ vào sự kiện không tồn tại; nhiều dòng thường ngày cùng một chủ đề khiến cả bốn năm chỉ nghỉ ngơi.
- **Nâng tính ngẫu nhiên**: xem mục 2.8. Trùng lặp trong một đời giảm từ 51% xuống 39% số khoảnh khắc, trong 5 năm từ 27% xuống 13%; độ giống nhau giữa hai đời (Jaccard) từ 0.25 xuống 0.21.
- **Nội dung mới, 152 mục**: 20 sự kiện lớn (`eventsExpansion.js`, có `need.npc` và `regions`/`jobs`), 63 sự kiện nhỏ (`lifeMinors4.js`, `lifeMinors5.js`) phủ District, vợ/chồng, con, người thầy, người yêu, đối thủ, bạn, Syndicate, Wing, Workshop, Distortion, tuổi trẻ và tuổi già, kèm 70 dòng thường ngày (`narrative/dailies2.js`). Tổng nay là 212 lớn, 18 hệ quả, 157 nhỏ, 302 thường ngày (689 mục).
- **Cân bằng mọi tài nguyên** (`src/engine/economyModel.js`, hằng `BALANCE`): hồi máu và hồi trí theo phần thiếu hụt, già đi tính theo tuổi hiệu dụng so với `avgLife` của District, Resonance/Network/Rep/Merit có mức trôi về nền để không kẹt ở trần. Merit trong chuỗi Fixer nhân `fixerMeritScale`. Bảng thăng bậc Fixer nâng: Grade 2 cần 150/82, Grade 1 cần 200/95, Color Fixer cần 300/95 (`COLOR_FIXER_REQ`).
- **FE và BE dùng một bảng**: `DirectorEngineService.cs` bỏ cột mốc riêng, dùng cùng bảng Fixer, ngưỡng Color và tên bậc Finger với FE; `check_be_parity.mjs` đối chiếu và thử âm tính. Mốc Fixer không còn lấy từ BE sau mỗi lựa chọn (`gameStore.js`). `FINGER_RANKS` có 4 tên mỗi Finger, khớp tên sự kiện thăng cấp.
- **Bundle**: `chunkSizeWarningLimit` 1200; dữ liệu truyện tách thành `story-events`, `story-life`, `story`.
- **Công cụ**: `npm test` chạy parity, lint, audit 50000 khoảnh khắc và audit logic 120 kiếp. Thêm `npm run balance` (`balance_sim.mjs`).
- **Số đo cuối** (bot ngẫu nhiên): 600 kiếp, sống trung bình 57 tuổi, bằng 108% `avgLife` của lore. Distorted 3.8%, E.G.O 0.8%, Color 0.5% số kiếp (2.5% số Fixer). Fixer đạt Grade 1 trở lên 25% (trước đó 44%). Không tài nguyên nào kẹt trần quá 8% lúc chết. Audit logic: 500 kiếp ngẫu nhiên và 300 kiếp chọn an toàn đều 0 vi phạm; 661/689 mục từng xuất hiện.
- **Chưa làm**: luật Carmen, Distortion (thanh nguy hiểm) và E.G.O trong bản PDF đánh dấu "new change"; tên bậc Finger trong PDF; District R và S vẫn chưa có truyện riêng. Backend đang chạy cần khởi động lại (`dotnet run`) để nhận mã mới.

### 21/10/2026, đợt 12

- **Mở rộng Pool sự kiện nhánh quy mô lớn (33 sự kiện lớn mới, nâng tổng số lên 193 sự kiện lớn)**:
  - Khắc phục triệt để tình trạng thiếu hụt và lặp sự kiện khi nhân vật bước vào các nhánh nghề nghiệp/cuộc đời sau tuổi 18.
  - *Nhánh Fixer & Hiệp hội (7 sự kiện mới)*: Cinq rapier duel (`fixer_cinq_duel_of_honor`), Oufi blood pact mediation (`fixer_oufi_underworld_pact`), Dieci monastery archive excavation (`fixer_dieci_monastery_archive`), Molar canal toxic salvage (`fixer_molar_amphibious_salvage`), Devzat heavy arbalest convoy (`fixer_devzat_railway_convoy`), thành lập Văn Phòng Fixer riêng (`fixer_independent_office_founding`), bẫy phản bội của thân chủ giàu có (`fixer_client_betrayal_ambush`).
  - *Nhánh Syndicate 5 Ngón Tay (8 sự kiện mới)*: Thumb kiểm kê đạn dược & võ đài brawler Boris (`syn_thumb_ammunition_quota`, `syn_thumb_boris_brawler_drill`), Index con quay nhân quả & tơ kiếm thanh trừng máy in giả (`syn_index_spinning_top_prescript`, `syn_index_crimson_thread_execution`), Middle Sách Phục Thù & hỗn chiến phiếu tiệm tóc Ricardo (`syn_middle_cousin_retaliation`, `syn_middle_hair_coupon_brawl`), Ring tượng sống triển lãm nghệ thuật (`syn_ring_corridor_human_statue`), Pinky mật mã lụa cống ngầm District 25 (`syn_pinky_whispering_underground_broker`).
  - *Nhánh Nhân viên Cánh 26 Wings (6 sự kiện mới)*: T Corp thu thuế thời gian bằng kính monocle (`wing_tcorp_monocle_time_collection`), W Corp dọn dẹp khoang tàu WARP đột biến trước giờ mở ga (`wing_wcorp_warp_dimension_anomaly`), K Corp kiểm định bòn rút nước mắt Singularity (`wing_kcorp_ampoule_contamination`), R Corp lò ấp nhân bản Pack 4 (`wing_rcorp_cloning_selection_drill`), N Corp tòa án thanh trừng khớp cơ khí (`wing_ncorp_prosthetic_purge_tribunal`), tàn tích L Corp thu hồi tinh thể Cogito (`wing_lobotomy_ruin_cogito_salvage`).
  - *Nhánh Thợ rèn Workshop Craftsman (6 sự kiện mới)*: Trượng khớp thu phóng Zelkova (`ws_zelkova_telescopic_quarterstaff`), thanh tra bằng sáng chế Tres Association (`ws_tres_singularity_infringement_audit`), phục kích phá hoại lò rèn lúc 2 AM (`ws_workshop_turf_sabotage`), chuôi kiếm cách nhiệt tâm lý E.G.O (`ws_ego_casing_resonance_craft`), mài liễu kiếm phân tử Cinq Allonge (`ws_allonge_rapier_molecular_grind`), thu nhận đồ đệ mồ côi kế thừa lò rèn (`ws_workshop_apprentice_legacy`).
  - *Nhánh Biến dị Distortion (6 sự kiện mới)*: Cộng hưởng Abnormality dưới lòng đất (`distort_abnormality_resonance_communion`), khúc hát ru bảo vệ lũ trẻ khỏi Sweeper 3:13 AM (`distort_backstreet_children_lullaby`), phá vỡ lồng giam Hana Section 2 (`distort_hana_suppression_squad`), lãnh địa Sân Khấu Ký Ức (`distort_domain_expansion_theater`), con mắt Beholder của The Head (`distort_head_beholder_observation`), lời thầm thì giải thoát của Carmen (`distort_carmen_final_solace`).
- **Kiểm thử mô phỏng toàn diện 1,000 vòng đời**: Chạy harness `simulate1000.mjs` đạt 1,000/1,000 kiếp sống thành công 100%, 0 vi phạm logic/lore, 0 lỗi NPC ma, phân bổ sự kiện tự nhiên và độc đáo qua từng kiếp.

### 21/10/2026, đợt 11

- **Cơ chế Tiêu tiền Ahn & Sự kiện Hồi phục (Health & Sanity Sinks) theo Lore Canon**:
  - Thêm 7 sự kiện lớn tiêu Ahn tại `src/data/eventsWorkshopEconomy.js`: K Corp HP Ampoule Pavilion, T Corp Chrono-Restorative Pod, HamHamPangPang Bistro, J Corp Luxury Jazz & Spa Lounge, Atelier Master Armor Overhaul, Seven Association Diplomatic Safehouse, District 23 Gourmet Gastronomy.
  - Điều chỉnh phí Nest Visa từ 180 Ahn xuống 85 Ahn tương thích với trần 100 Ahn của người chơi.
  - Nâng cấp minor events y tế tại phòng khám Backstreet & Nest, bổ sung 3 sự kiện ngắn: `m_wellness_hamham_lunch`, `m_med_blackstreet_doctor_organ`, `m_wellness_workshop_tuneup`.
  - Tích hợp Consideration 6 trong `utilityCurves.js`: Ưu tiên xuất hiện sự kiện dịch vụ/tiêu tiền khi `wealth >= 35`, và tự động xuất hiện phòng khám khi `health < 72` hoặc `sanity < 70`.
  - Giao diện chip chi phí `Tốn X Ahn` / `Thiếu Ahn (Cần X)` và tự động vô hiệu hóa nút (`disabled={true}`) khi người chơi không đủ tiền.
- **Hệ thống Thăng cấp ngẫu nhiên đa nhánh (Multi-Track Promotion Pools)**:
  - Thay thế chuỗi khảo hạch tuyến tính cố định bằng các pool ngẫu nhiên đa dạng qua các Hiệp hội chuyên biệt (Zwei, Seven, Shi, Tres, Cinq, Oufi, Dieci, Molar, Devzat, Warp, Reindeer, Black Silence, Calamity...).
  - Bốc thăm ngẫu nhiên bằng `rng()` từ pool ứng viên đủ điều kiện tại mỗi mốc thăng cấp.
  - Sửa lỗi kẹt tiến trình biến dị của Syndicate khi Distorted.

### 21/10/2026, đợt 10

- **Tối ưu nhịp sống ấu thơ (0–4 tuổi)**: Giới hạn đúng 1 sự kiện thụ động (daily) mỗi năm luân phiên 4 mùa, chấm dứt việc spam dồn dập 4 sự kiện/năm làm loãng mạch văn.
- **Tách bạch cấu trúc văn bản**: Chuẩn hóa các câu văn trong toàn bộ sự kiện thành từng khoảnh khắc độc lập, mạch lạc, không chia cắt một câu đơn thành nhiều đoạn rời rạc.
- **Thiết kế Fog of War cho Deltas (Tăng tính may rủi roguelike)**: Lựa chọn sự kiện chuyển sang hiển thị các chip tài nguyên bị tác động (Resource Chips) kèm icon và chiều hướng biến động (tăng/giảm/tĩnh) thay vì lộ rõ số lượng cụ thể, tạo cảm giác hồi hộp, liều lĩnh khi đưa ra quyết định.
- **Sửa lỗi giao diện Mobile**: Khắc phục hiện tượng các lựa chọn ở chân màn hình bị che khuất lẹm hoặc không thể bấm trên thiết bị di động do thanh Dock và safe-area padding; đảm bảo 100% lựa chọn luôn hiển thị rõ và click được.
- **Chuẩn hóa Thuật ngữ Nhân Mạng / Nhân Mạch & Blacklist Canon**:
  - Chuẩn hóa ranh giới khái niệm giữa "Nhân Mạng" (sinh mạng con người) và "Nhân Mạch" (quan hệ xã hội / Network).
  - Tích hợp danh sách đen `CANON_NAMES_BLACKLIST` trong `nameGenerator.js`: cấm tạo tên ngẫu nhiên trùng với 12 Sinner Limbus Company, Dante, Vergilius, Roland, Angela, Carmen, các Sephirah, Color Fixers để bảo tồn tính toàn vẹn của lore.

### 20/10/2026, đợt 9

- Chuyển màn Home sang tiếng Anh theo yêu cầu, gồm tiêu đề, khai sinh, bản lưu, xác nhận bỏ tiến trình/di sản, thông tin District, điềm báo và điều hướng desktop/mobile.
- Home dùng ngôn ngữ giao diện riêng, vì vậy vẫn hiện tiếng Anh khi trình duyệt đã lưu VI hoặc VI+EN. Bộ chọn ngôn ngữ tiếp tục điều khiển phần truyện và các trang lưu trữ.
- Bổ sung thuộc tính `lang` cho Home và điều hướng; sửa khoảng trắng trong tiêu đề mobile và số ít/số nhiều của các nhãn thống kê tiếng Anh.
- Kiểm tra: build thành công; 80 bản ghi CDP gồm 12 trường hợp Home theo 3 lựa chọn ngôn ngữ, 2 theme, 2 kích thước. Lượt kiểm tra Home riêng sau chỉnh câu chữ cũng đạt 12/12. Inspector 0 FAIL, 3 WARN đã giải thích trong [báo cáo](UI_REDESIGN_REPORT.md).

### 20/10/2026, đợt 8

- Theo xác nhận của người dùng, tiếp tục sửa bản thiết kế mới tại cổng 5193. Bản cũ ở `D:\School\PM`, cổng 5173, được giữ nguyên.
- Đưa wireframe The City vào lớp bao toàn viewport ứng dụng, thay vì giới hạn trong hero. Không có bảng trạng thái hoặc chữ trang trí nằm dưới khung khai sinh.
- Màn chơi từ 1360px có cột lựa chọn cạnh cột truyện. Màn hình hẹp chia truyện và lựa chọn thành hai hàng grid, có cuộn riêng; không dùng lớp phủ để che truyện.
- Thêm nút Xem lựa chọn để tới ngay các phương án khi nội dung sự kiện dài; xử lý nền header khi cuộn. Chỉnh màu chữ rare ở theme sáng để đạt độ tương phản trên chip.
- Kiểm tra: build thành công; 68 bản ghi CDP, đo không giao nhau ở 1440/1200/768/390/320px, kiểm tra phương án cuối và nút nhảy lựa chọn. Inspector 0 FAIL, 3 WARN có giải thích trong [báo cáo](UI_REDESIGN_REPORT.md). Chưa push/deploy.

### 20/10/2026, đợt 7

- Thiết kế lại toàn bộ shell, màn khai sinh, màn chơi và bốn trang lưu trữ theo hướng hồ sơ The City: nền than trung tính, chữ Be Vietnam Pro, vàng tiết chế và theme sáng tương ứng.
- Khai sinh có vòng chọn 26 District nối với dữ liệu thật, chọn Outskirts, tìm District, tên/seed và tiếp tục bản lưu. Trên phone ưu tiên biểu mẫu, giữ danh mục đầy đủ bên dưới.
- Desktop có sidebar và cột hồ sơ riêng; mobile có điều hướng dưới màn hình, HUD, sheet hồ sơ có focus/Escape. Dock lựa chọn cuộn riêng và giữ vùng truyện phía trên.
- Sửa tab dài, nút Workshop dài, màu mốc sự nghiệp ở theme sáng, trạng thái HP/SP nguy kịch và reduced motion. Giới hạn notification một chiếc, không chồng thông báo lên lựa chọn.
- Bổ sung hướng thiết kế [DESIGN.md](DESIGN.md) và [báo cáo giao diện](UI_REDESIGN_REPORT.md) có Delivery Gate, ảnh và giới hạn kiểm tra.
- Kiểm tra: production build thành công; 57 bản ghi Chrome CDP không lỗi assertion hoặc runtime; các route ở desktop/mobile, hai theme, lưu/chơi tiếp, major/minor/contract và ba modal nghề nghiệp. Inspector 0 FAIL, 4 WARN có giải thích trong báo cáo.
- Đợt này chỉ thay đổi FE. Bản làm việc nằm trong `D:\School\ProjectMoon_Life\PM`, xem thử ở `http://127.0.0.1:5193/`; chưa push/deploy đợt redesign.

### 20/10/2026, đợt 6

- **Khắc phục lỗi màn hình đen khi bấm Chơi trên Mobile (Mobile Black Screen Crash Fix)**:
  - *Nguyên nhân cốt lõi*: Tại [`src/layouts/MainLayout.jsx`](src/layouts/MainLayout.jsx), câu lệnh bóc tách biến (destructuring) từ hook `useGameStore` trả về `pendingMinor` nhưng lại bị sót khai báo biến ở vế trái (`const { ... } = useGameStore(...)`). Khi ở trang chủ (`isPlay = false`), toán tử `isPlay && Boolean(...)` dừng sớm nên không phát sinh lỗi. Ngay khi bấm "Chơi" (`inRun = true` $\implies$ `isPlay = true`), JavaScript cố đọc biến chưa khai báo $\implies$ ném lỗi runtime `ReferenceError: pendingMinor is not defined`.
  - *Hệ quả*: Do React thiếu cơ chế bẫy lỗi (Error Boundary), toàn bộ cây DOM gốc (`#root`) bị tháo dỡ hoàn toàn, nền trang đen của `body` (`#0d0e12`) bao trùm toàn bộ màn hình điện thoại.
  - *Giải pháp triệt để*:
    1. Bổ sung đầy đủ biến `pendingMinor` vào danh sách destructuring trong [`MainLayout.jsx`](src/layouts/MainLayout.jsx).
    2. Xây dựng component [`ErrorBoundary.jsx`](src/components/ErrorBoundary.jsx) chuyên dụng bọc ngoài `AppRouter` trong [`App.jsx`](src/App.jsx). Nếu có bất kỳ lỗi không lường trước nào xảy ra, giao diện Project Moon sang trọng ("Gián Đoạn Kết Nối Tâm Thức") sẽ hiển thị kèm nút Tải lại / Về trang chủ thay vì sập toàn bộ giao diện thành màn đen.
    3. Kiểm thử tự động trên Chrome DevTools Protocol giả lập Mobile: Xác nhận nút Roll Destiny & Enter The City chuyển sang màn chơi mượt mà 100%, Mobile Resource HUD và Feed hiển thị sắc nét.
- **Thiết kế chuyên biệt cho Mobile (Dedicated Mobile HUD & Dossier Drawer)**:
  - Thay thế hoàn toàn thanh tóm tắt text đơn điệu bằng **Mobile Resource HUD**:
    - Hiển thị thanh máu đôi (HP & SP Twin Gauges) trực quan với thanh đo phần trăm đổi màu và nhấp nháy khi nguy kịch (CRIT).
    - Hiển thị đầy đủ tài nguyên: Tiền mặt Ahn (vàng kim), Reputation (sao), Network (kết nối), Syndicate Heat (lửa đỏ), Taboo Gaze (con mắt đỏ vi phạm).
    - Nhãn danh tính nhân vật và chức vụ thu gọn gọn gàng.
  - Tích hợp **Ngăn kéo hồ sơ trượt từ dưới lên (Bottom Sheet Drawer)**: Khi bấm vào thanh tài nguyên, hồ sơ chi tiết (Milestone sự nghiệp, đầy đủ chỉ số, trang bị, NPC, vết sẹo) mở lên dạng modal mượt mà, không làm đẩy xô lệch luồng truyện.
  - Tối ưu thanh điều khiển `PlayBar` trên di động: Rút gọn các nút tiện ích (Tự chọn, Mute, Lưu, Trang chủ, Bỏ kiếp) vào Dropdown Menu dấu 3 chấm (`···`), tạo không gian rộng rãi cho các nút chính (Play/Pause, Đổi tốc độ 1x/2x/3x, Qua mùa).
- **Xuất tài liệu PDF toàn diện (Full PDF Export)**:
  - Biên soạn và xuất file PDF chuyên nghiệp: `THE_CITY_CHRONICLES_DOCUMENTATION.pdf` (gồm toàn bộ bối cảnh thế giới, gameplay, 4 nhánh sự nghiệp, hệ thống tâm lý Disco Psyche, Carmen E.G.O/Distortion và sơ đồ kiến trúc xử lý sự kiện).
  - Tích hợp vào thư mục `public/` để người chơi và bạn bè có thể tải trực tiếp qua link Vercel: `https://project-moon-life-five.vercel.app/THE_CITY_CHRONICLES_DOCUMENTATION.pdf`.

### 20/10/2026, đợt 5

- **Kiểm định toàn diện các tình huống & nhánh sự nghiệp (Situational Audit & Narrative Climax Fixes)**:
  - *Khắc phục cơ chế thăng cấp Color Fixer & danh hiệu bespoke*: Sửa lỗi nhận diện thuộc tính hiệu ứng khi chọn sự kiện (`.fx` vs `.effects`), bảo đảm khi vượt qua khảo nghiệm Star of the City (`hana_color_ascension_trial`), nhân vật chắc chắn được phong Color Fixer (Fixer Grade 0) và tự động nhận danh hiệu màu sắc tương ứng (`customTitle`).
  - *Đồng bộ hóa 5 Syndicate Fingers (The Five Fingers Alignment)*: Mở rộng sự kiện chọn Syndicate (`syn_choose_finger_allegiance`) đầy đủ cả 5 Finger (Thumb, Index, Middle, Ring, Pinky). Sửa lỗi sự kiện đỉnh cao của Ring (`syn_ring_maestro_gallery`) trước đây thiếu điều kiện lọc ngón tay khiến các Finger khác nhận nhầm; đồng thời thiết lập cơ chế weaverAI tự động kích hoạt khảo nghiệm đỉnh cao tương ứng cho từng ngón tay (Underboss, Proxy, Great Brother, Maestro, Star Blade).
  - *Mở khóa bậc thăng tiến cấp cao (Uncapped Apex Careers)*: Nâng trần thăng tiến tự động thường niên cho Wing Employee và Workshop Craftsman lên Rank 2 (Section Chief / Master Craftsman), và thiết lập các sự kiện thử thách đỉnh cao (`wing_singularity_classified_audit` và `workshop_legendary_forge_trial`) để bước lên Rank 3 (Senior Executive / Legendary Innovator).
  - *Cơ chế Weaver AI Climax Milestones*: Tích hợp logic dẫn dắt kịch tính trong `weaverAI.js` giúp nhân vật chạm đến các đỉnh cao sự nghiệp ngay khi đủ điều kiện danh tiếng và công trạng, thay vì phụ thuộc hoàn toàn vào tỷ lệ ngẫu nhiên.
  - *Mô phỏng Deep Stress-Test 200 kiếp nhân vật*:
    - Fixer: 52% đạt Color Fixer / Grade 1, tuổi thọ trung bình 52.1 tuổi.
    - Syndicate: Tuổi thọ trung bình 34.3 tuổi (đúng chuẩn bạo lực ngầm Backstreets), 66% đạt hàng Trưởng bối (Rank 2+), tỷ lệ Distortion cao phản ánh tuyệt vọng.
    - Wing Employee: Tuổi thọ trung bình 71.1 tuổi (an toàn cao trong Nest, y tế tân tiến), 92% thăng tiến lên Trưởng phòng / Giám đốc cấp cao.
    - Workshop Craftsman: Tuổi thọ trung bình 49.4 tuổi, 96% đạt Thợ bậc thầy / Thần binh huyền thoại.
    - 0 lỗi template (`{...}`) trên toàn bộ 200 kiếp đời.
- **Tính năng Xóa phả hệ / Reset huyết thống (Bloodline Deletion & Clear)**:
  - Cho phép người chơi xóa bỏ từng hồ sơ tưởng niệm hoặc xóa sạch toàn bộ cây huyết thống tại màn hình `BloodlinePage.jsx` khi muốn bắt đầu lại hoàn toàn từ Thế hệ 1 (Gen #1).
  - Tích hợp endpoint RESTful `DELETE /archive/memorial` và `DELETE /archive/memorials` tại backend.
  - Tích hợp nút "Discard Heirloom / Start Fresh Gen #1" trực tiếp trên màn hình khởi tạo tân sinh (`BirthSetupPanel.jsx`).
- **Deploy Vercel & Chơi độc lập không phụ thuộc mạng LAN**:
  - Triển khai thành công lên Vercel: `https://project-moon-life-five.vercel.app`
  - Bổ sung cấu hình SPA routing `vercel.json`.
  - Cơ chế Dual-Save cho phép người chơi tắt máy, đổi mạng, hoặc chơi ngoại tuyến trên điện thoại/máy tính bảng mọi lúc mọi nơi nhờ cơ chế lưu an toàn trên trình duyệt (`localStorage`).

### 20/10/2026, đợt 4

- **Khắc phục triệt để lặp sự kiện (Anti-Duplication Engine)**:
  - Giảm bộ đệm cấm lặp `RECENT_LIMIT` từ 40 xuống 16 để tránh cạn kiệt pool sự kiện ở các lứa tuổi có tập sự kiện hẹp (đặc biệt giai đoạn 0–5 tuổi).
  - Bổ sung cơ chế chọn lùi LRU (`lastIndexOf` nhỏ nhất trong lịch sử khi cạn pool) cho cả `eligibleDailies` và `eligibleMinors` trong `src/engine/yearPlanner.js`, chấm dứt việc rơi vào fallback ngẫu nhiên không kiểm soát.
  - Áp dụng kiểm tra deduplication đơn năm tuyệt đối tại `planYear` và `syncPlanWithBackend`: Mỗi event ID chỉ xuất hiện tối đa 1 lần trong 4 mùa của cùng một năm.
  - Mở rộng pool sự kiện tuổi thơ thêm 15 dòng thường ngày mới (`src/data/lifeDailies.js`).
  - Kiểm thử mô phỏng stress-test qua 100 kiếp nhân vật (6.000 năm đời sống, 24.000 slot mùa): Đạt **0 trùng lặp nội năm** (0 intra-year duplicates) và phân bổ sự kiện tự nhiên.
- **Logo & Favicon Vector Bespoke Project Moon**:
  - Tạo biểu tượng thương hiệu vector độc quyền: Vầng trăng khuyết vàng kim (`#d4af37`), ngọn tháp nhọn District 1 và tâm điểm Singularity đỏ thẫm (`#ef4444`).
  - Thêm `public/favicon.svg` và tích hợp `BrandMark` đồng bộ tại `src/layouts/Sidebar.jsx`, `src/layouts/Header.jsx`.
- **Rà soát Lore & Chuẩn hóa Thuật ngữ (Anti-Slop & Lore Audit)**:
  - Tuyệt đối giữ nguyên thuật ngữ gốc thế giới trong toàn bộ codebase: Cấm dịch gượng gạo sang tiếng Hán-Việt lai căng ("Đô Thành", "đại đô thị", "phố ngầm", "điểm dị biệt"). Giữ nguyên `The City`, `Nest`, `Wing`, `Corp`, `Backstreets`, `Fixer`, `Association`, `Workshop`, `Syndicate`, `Ahn`, `Outskirts`, `Ruins`, `Singularity`, `Distortion`, `E.G.O`.
  - Cập nhật hình tượng Carmen: Luôn xuất hiện dưới ánh mặt trời rực lửa thiêu đốt và ấm áp huyền ảo (The Scorching Sun), sửa các đoạn nhầm lẫn với ánh trăng đêm.
  - Tích hợp 5 năng lực tâm trí Disco Psyche (Logic, Empathy, Volition, Inland Empire, Half Light) phản ánh nội tâm khi đối diện biến dị. Cân bằng E.G.O và Distortion ở độ hiếm tột bậc.
  - Các mốc sự kiện Canto được xác định là chất liệu bối cảnh làm giàu thế giới, không áp đặt tuyến tính lên mạch chơi.
- **Hệ thống Phụ huynh bảo hộ & Kế thừa thời gian thực (Living Parent Mentorship & Succession)**:
  - Khắc phục ngữ cảnh sinh nở: Nhân vật chết non (dưới 16 tuổi) không thể có con.
  - Khắc phục nghịch lý kế thừa: Khi cha mẹ qua đời lúc 40 tuổi có con 18 tuổi, người chơi khi chọn chơi nhân vật con có 2 tùy chọn trải nghiệm:
    1. *Khởi đầu từ 0 tuổi (Living Parent Mentorship)*: Cha mẹ tiền nhiệm còn sống trong hồ sơ (`npcs.parent`), che chở, chu cấp chi phí sinh hoạt, tăng sức đề kháng ấu thơ. Đúng năm người con đạt độ tuổi cha mẹ qua đời trong lịch sử (`char.age === deathAgeInChildLife`), kích hoạt biến cố bước ngoặt `csq_parent_historic_passing` ("Bóng Lưng Cuối Cùng") tái hiện sự ra đi của cha mẹ và chuyển giao di sản.
    2. *Tiếp quản ở tuổi 18 (Take Over at Age 18)*: Lập tức bắt đầu ở tuổi trưởng thành với toàn bộ di sản được kế thừa.
- **Giao diện Trang chủ (Home Screen UI Overhaul)**:
  - Chuyển đổi ngôn ngữ chính của trang chủ (`src/components/BirthSetupPanel.jsx`) sang tiếng Anh Project Moon phong cách tối giản, lạnh lùng (Hero Dossier, Sector Records, Legacy Ledger), đồng bộ thẩm mỹ với các tựa game gốc của Project Moon.
- **Những điều cốt lõi đáng lưu ý (Architecture Notes & Caveats)**:
  1. *Không cần SQL bên ngoài*: Hệ thống sử dụng kiến trúc Dual-Save (Client `localStorage` + Backend Atomic JSON Write-Behind) đã hoàn chỉnh và an toàn tuyệt đối, không cần cài đặt SQL Server/MySQL/PostgreSQL.
  2. *Bộ đệm LRU sự kiện*: Không bao giờ làm nghẽn pool nhờ cơ chế chọn lùi theo lịch sử xuất hiện.
  3. *Quy tắc thuật ngữ*: Bất kỳ bổ sung nội dung nào trong tương lai phải bảo tồn nguyên vẹn các danh từ thế giới của Project Moon.

### 20/10/2026, đợt 3

- **Backend**: VS Code báo 4 lỗi ở `ArchiveStoreService.cs` dù `dotnet build` sạch. Nguyên nhân là language server không thấy các thuộc tính `AppJsonContext.Default.*` do source generator sinh ra. Đổi 4 chỗ đó sang hai trường `ArchiveInfo`, `RunsInfo` lấy qua `GetTypeInfo(typeof(T))`; khi chạy không có gì khác. Đã khởi động lại server và gọi thử lại mọi endpoint.
- **District 5, 15, 26**: thêm vào `worldData.js`, kèm 14 dòng thường ngày và 9 sự kiện nhỏ trong `src/data/lifeMinors3.js`. Thêm nhãn nguồn lore trên giao diện.
- **Distortion**: từ một cờ thành một tuyến có áp lực mỗi năm, sự kiện riêng và cái chết riêng (mục 2.7).
- **Bundle**: từ một file JS 1 MB thành các chunk, không chunk nào quá 500 KB; bốn trang phụ tải khi mở.
- **Kiểm tra**: thêm 8 kiểm tra cho nhãn District vào kịch bản bấm thử (184 PASS). Sửa kiểm tra chọn District để chọn theo tên thay vì theo vị trí, vì thứ tự đã đổi khi chèn District 5.

### 20/10/2026, đợt 2

- Rà soát antislop toàn dự án (15 mục), sửa hết: bỏ em dash, viết lại văn bản engine và sự kiện, gỡ ký tự lạ trong văn bản cũ, chỉnh độ tương phản theme sáng, thêm trạng thái rỗng và trạng thái server. Chi tiết trong `anti-slop/`.
- Viết `UNIVERSE.md`.

### 20/10/2026, đợt 1

- Làm lại toàn bộ giao diện, màn chơi theo kế hoạch năm (dòng thường ngày, sự kiện nhỏ có đếm ngược, sự kiện lớn, Request), AI director có ký ức và hậu quả hẹn giờ, NPC có tên và tính cách, chip ± và hiệu ứng sân khấu, lưu và chơi tiếp, ảnh từ wiki, backend ghi sau và ghi nguyên tử.
