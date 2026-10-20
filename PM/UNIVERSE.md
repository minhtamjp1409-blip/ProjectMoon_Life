# The City Chronicles: vũ trụ và hướng đi

Tài liệu này mô tả thế giới mà game đang kể, cách nó được ghép từ dữ liệu, giọng văn dùng để viết, và những hướng có thể đi tiếp. Thế giới dựa trên The City của Project Moon (Lobotomy Corporation, Library of Ruina, Limbus Company). Đây là một tác phẩm phóng tác cá nhân, phi thương mại.

---

## 1. The City trong game này

The City là một siêu đô thị bị tường bao quanh, chia thành các District, mỗi District thuộc về một Wing (một tập đoàn nắm một Singularity, tức một công nghệ gần như phép màu). Trên tất cả là The Head, với B Corp nhìn (Beholders) và C Corp ra tay (Claws). Ai vi phạm một Taboo của The Head thì biến mất.

Mỗi District có ba lớp sống, và game theo dõi bạn ở lớp nào:

| Lớp | Cờ trong code | Cảm giác |
| --- | --- | --- |
| **Nest** | `Nest`, `Feather` | Được Wing bảo hộ. An toàn, sạch, theo dõi chặt, và có thể bị đuổi ra bất cứ lúc nào. |
| **Backstreets** | `Backstreets` | Phần còn lại của District. Syndicate, Office, Workshop, chợ đen, và Night in the Backstreets lúc 3 giờ 10. |
| **The Outskirts** | `Outskirts` | Bên ngoài bức tường. Không luật, có thú lớn, có Ruins. Ánh đèn của The City là "những ngôi sao của kẻ khác". |

### 1.1. Các District có trong dữ liệu (`src/data/worldData.js`)

Đủ 26 District cùng The Outskirts. Mỗi nơi có An ninh, Giàu có, Tuổi thọ trung bình, ô nhiễm, áp lực tổ chức, và mô tả. Những nơi có chuyện riêng trong game:

- **District 1–3 (A, B, C Corp)**: The Head, The Eye, The Claw. Chỉ sinh ra trong Nest.
- **District 8 (H Corp, Hongyuan)**: các đại gia tộc Jia, Xue, Wang, Shi; Restructuring Day dịch chuyển cả khu phố; Bolus và kỳ chọn Gia chủ.
- **District 10 (J Corp)**: sòng bạc, Wishpower, cược bằng "vận may".
- **District 11 (K Corp)**: HP Ampoule, và thứ biết khóc nằm sâu trong cơ sở.
- **District 12 (L Corp cũ)**: Nest vô chủ trong sương sau White Nights and Dark Days; Thumb và Index tranh địa bàn.
- **District 14 (N Corp)**: Nagel und Hammer săn người có chân tay giả.
- **District 16 (P Corp)**: những căn phòng to hơn bên ngoài, và các Bloodfiend.
- **District 19 (S Corp)**: quê của Blade Lineage.
- **District 20 (T Corp)**: thành phố màu sepia, thời gian bị vay, bán, đánh thuế; Time Ripper.
- **District 21 (U Corp)**: The Great Lake, những luật của mặt hồ, Cá Voi và người hóa trắng.
- **District 23 (W Corp)**: WARP Train mười giây, toa cuối dài hai nghìn năm, và phố ẩm thực.
- **District 5 (E Corp), phóng tác**: trời sáng hai mươi tư giờ; bóng tối là hàng hóa, thuê theo giờ hoặc mua theo lọ. Ruộng trong nhà thu hoạch quanh năm.
- **District 15 (O Corp), phóng tác**: hợp đồng ký bằng mực O Corp tự thi hành lên cơ thể người ký. Có chuỗi bảo lãnh nợ cho người bạn, ba năm sau đến hạn.
- **District 26 (Z Corp)**: canon chỉ nói District này có tồn tại nhưng không có trên bản đồ. Game giữ đúng điều đó: không có Singularity, chỉ số hiển thị "?", hồ sơ cư trú không khớp, thư gửi về bị trả lại, rời đi rồi khó nhớ đường về. Tỉ lệ sinh ra ở đây thấp.

E và O mang nhãn "Phóng tác", Z mang nhãn "Không có trên bản đồ", ở cả bản đồ chọn nơi sinh lẫn Từ điển. Wiki (limbuscompany.wiki.gg, trang The City) không có thông tin gì thêm về ba Wing này.

### 1.2. Các phe

- **Fixer**: làm thuê bằng Request. Office nhỏ (Hook, Yun's, Streetlight, Molar, Full-Stop...) và 11 Association (Hana, Zwei, Tres, Shi, Cinq, Liu, Seven, Eight, Devyat', Dieci, Öufi). Grade 9 lên Grade 1, rồi Color nếu Hana trao.
- **The Five Fingers**: Thumb (tôn ti, lễ nghi), Index (Prescript), Middle (anh em, Book of Vengeance), Ring (nghệ thuật trên thịt người), Pinky (lời thề).
- **Kurokumo Clan** và **Blade Lineage**: chiến tranh của những người dùng kiếm.
- **Wing**: làm Feather cho một Singularity. An toàn hơn cho đến khi công ty cần bạn biến mất.
- **Workshop**: rèn vũ khí, đăng ký với Tres Association; có mini-game rèn.
- **Các thế lực ngoài con người**: Sweeper lúc 3 giờ 10, Bloodfiend, Distortion, Abnormality, The Library.

---

## 2. Một đời người được ghép thế nào

### 2.1. Lúc sinh

Mỗi lần bấm chào đời, engine ghép các mảnh độc lập (`src/data/birthStories.js`):

1. Nơi sinh: District (ngẫu nhiên theo dân số, hoặc bạn chọn trên bản đồ) và lớp sống.
2. Gia cảnh: trẻ mồ côi, gia đình làm thuê, con của Fixer đã giải nghệ, Feather, gia đình quản lý Wing, đứa trẻ của The Outskirts. Mỗi gia cảnh có vài câu mở đầu khác nhau.
3. Đêm hôm đó: mười chuyện có thể đang xảy ra trong thành phố.
4. Một trong sáu thiên mệnh (bảng dưới).
5. Người bạn thuở nhỏ: một trong 40 cái tên, một trong 10 nét tính cách.

| Thiên mệnh | Tỉ lệ | Ý nghĩa trong game |
| --- | --- | --- |
| The Loom’s Equilibrium | 24% | không có gì đặc biệt |
| Gaze of The Head | 18% | bắt đầu với 1 Taboo Gaze; bị thanh trừng thường hơn |
| Bleeding Seed of Light | 18% | +22 Resonance; gần E.G.O và Distortion hơn |
| 3:13 AM Blood Star | 16% | −8 Sinh lực, +18 Heat, +30% Merit |
| J Corp’s Rigged Gamble | 12% | lên voi xuống chó |
| Ancestral Blood Debt | 12% | chuyện của đời trước tìm đến; dễ ra hơn nếu là người thừa kế |

### 2.2. Các giai đoạn

| Tuổi | Điều xảy ra |
| --- | --- |
| 0–3 | chỉ có dòng thường ngày theo lớp sống |
| 4–6 | sự kiện nhỏ đầu tiên; bài học khóa cửa, căn cứ bằng thùng giấy |
| 7–11 | chuyện của khu phố: chó hoang, ông chủ quán thịt nướng, Prescript đầu tiên |
| 12–17 | người bạn đi làm cho Office, đối thủ, người thương, đêm 3 giờ 13 |
| 18 | bắt buộc chọn đường: Fixer, Syndicate, Wing, Workshop |
| 18–59 | Request, Finger, Wing, gia đình, con cái, người thầy già đi |
| 60+ | tay run, danh sách người đã chết dài hơn người còn sống, lá thư để lại |

### 2.3. Cái chết và đời sau

Sinh lực về 0 thì chết, trừ khi một người gắn bó từ 65 trở lên đỡ thay (người đó chết). Bia mộ ghi tuổi, nguyên nhân, danh hiệu, cấp đe dọa, di vật. Đời con thừa kế một phần tài sản, danh vọng, mạng lưới, di vật, và có thể cả món nợ trong Book of Vengeance.

---

## 3. Nhân quả

Nguyên tắc: mọi lựa chọn đều có giá, và nhiều lựa chọn quay lại sau nhiều năm.

- **Ngay lập tức**: chỉ số, gắn bó, vết sẹo (mỗi vết sẹo +6 Resonance).
- **Ký ức** (`mem`): 27 loại. Ví dụ `burned_prescript` (đốt tờ Prescript lúc nhỏ), `reported_maid` (mách cha mẹ về người giúp việc), `took_child` (bắt đứa bé làm tin), `sheltered_stranger` (mở cửa lúc 3 giờ 12).
- **Hậu quả hẹn giờ** (`later` cho sự kiện nhỏ, `scheduleConsequences` cho sự kiện lớn): sau N năm, một sự kiện cụ thể xảy ra. Ví dụ: đốt Prescript lúc 8 tuổi, 6 năm sau một Proselyte chặn bạn trong hẻm.
- **Chuỗi**: nếu bạn không đi cùng khi người bạn thuở nhỏ xin việc ở một Office, hai năm sau người ấy bị khiêng về với một bên chân nát. Riêng một chuyện khác: khi người ấy nhắn xin tiền lúc 2 giờ 50 sáng, nếu bạn hỏi lý do thay vì gửi, ba năm sau tên người ấy hiện trong danh sách truy nã của Hana.
- **Đồng hồ áp lực**: Heat (Syndicate săn bạn, trên 65 thì có thể bị phục kích), Taboo Gaze (đủ 3 thì The Claw đến), Resonance (cao cùng Tâm trí thấp thì Carmen bắt đầu nói).

---

## 4. Giọng văn

Đây là quy ước cho mọi chữ viết thêm vào game.

1. **Ngôi thứ hai, thì hiện tại hoặc quá khứ đơn.** "Bạn mở cửa." Không "Bạn đã quyết định mở cửa."
2. **Một chi tiết cụ thể thay cho ba tính từ.** "Một vệt máu dài ra tới tận vỉa hè" tốt hơn "cảnh tượng đẫm máu kinh hoàng".
3. **Bạo lực nói một lần, đúng và gọn.** The City tàn nhẫn vì nó bình thường về chuyện đó. Câu cuối thường là một hậu quả nhỏ và lạnh: "Bạn mất cả đêm để lau sàn."
4. **Giữ thuật ngữ tiếng Anh của Project Moon**: Fixer, Office, Association, Request, Grade, Color, Nest, Backstreets, Wing, Feather, Singularity, Syndicate, The Five Fingers, Prescript, Proselyte, Book of Vengeance, Big Brother, Docent, Maestro, Sweeper, Distortion, E.G.O, Bloodfiend, Taboo, The Head. Không dịch Hán-Việt (không "Thiên Mệnh Ngẫu Nhiên", "Sát Tinh", "Ngũ Chỉ", "Huyết Quỷ", "Sổ Thù Hận"). Bản dịch Library of Ruina tiếng Việt chỉ nằm trong Từ điển, để tra cứu.
5. **Không dấu gạch dài.** Dùng dấu phẩy, dấu chấm, dấu hai chấm, ngoặc đơn.
6. **Không đoán giới tính người chơi.** NPC nói "bạn", không "ông", "anh", "chị".
7. **Không in số chỉ số trong câu văn.** Chip ± đã làm việc đó.
8. **Tiêu đề sự kiện lớn** đặt trong ngoặc vuông ở đầu đoạn: `[Bài kiểm tra cuối] ...`. Nó thành tiêu đề của dock.

---

## 5. Hướng đi tiếp

Xếp theo mức đáng làm, bám cấu trúc trong `implementation_plan.md`.

### 5.1. Nội dung (dễ, tác động lớn)

- Thêm sự kiện nhỏ cho các District chưa có chuyện riêng (D, F, I, M, Q, V, X, Y).
- Thêm chuỗi cho từng Association: Devyat' và chiếc rương Poludnitsa, Dieci đốt tri thức, Liu và lửa, Cinq và quyết đấu.
- Thêm chuỗi cho Middle (thăng Big Brother theo Book of Vengeance) và Index (Prescript định kỳ, Proxy).

### 5.2. Cơ chế theo tuyến (vừa)

- **Bloodfiend**: thêm chỉ số Thirst và Withering như kế hoạch; mỗi năm chọn uống Blood Bar hay cắn người.
- **The Great Lake**: luật của mặt hồ thành một danh sách mà người chơi học dần qua sự kiện; trả lời sai luật thì có hậu quả.
- **Hongyuan**: Ji, Yong, In rèn từ 5 đến 30 tuổi, dẫn đến kỳ chọn Gia chủ.
- **Workshop**: thông số xưởng (thiết bị, nguyên liệu, nhân công, cảnh cáo của Tres).
- **Distortion** (đã có phần đầu): sau khi buông theo Carmen, mỗi năm Heat tăng vì Hana giữ hồ sơ mở, Network mòn dần, và director ưu tiên năm sự kiện riêng (người bạn tìm đến, đội Fixer săn, căn nhà cũ, cơn đói, giọng nói quay lại). Phục kích do Heat cao và cái chết vì vết thương đều có lời riêng cho Distortion. Còn thiếu: đường tìm lại giọng người.

### 5.3. Director (khó hơn)

- Story arc nhiều chương có trạng thái riêng (`arcState`) thay cho chuỗi ghép từ ký ức.
- Cho NPC tự có biến cố khi bạn không có mặt (người bạn lấy vợ, người thầy ốm), báo qua một dòng thường ngày.
- Cho Carmen nhắc đúng tên những người và vết sẹo của chính bạn trong đối thoại ba bước.

### 5.4. Kỹ thuật

- Một màn hình xem toàn bộ cây gia phả qua nhiều thế hệ, dùng `GET /api/archive/hall-of-fame`.
- Xuất và nhập file save.
