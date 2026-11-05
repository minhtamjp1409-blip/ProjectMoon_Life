# Feature Specification: Gameplay chủ đạo (spec nền)

**Feature Branch**: `001-core-gameplay-baseline`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "Gameplay chủ đạo: chép lại vòng chơi hiện có của The City Chronicles thành spec nền (sinh ra, kế hoạch năm, major/minor/daily, nghề và thăng cấp, hầm ngục, cái chết, di sản đời sau). Không đổi code, dùng làm nền cho các spec sau."

Đây là spec mô tả trạng thái hiện có, không phải yêu cầu thay đổi. Mỗi yêu cầu dưới đây ghi lại điều
game đang làm vào ngày 2026-11-04. Các spec sau dẫn chiếu tới mã FR và SC ở đây khi muốn đổi một
hành vi.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sống trọn một đời từ lúc sinh tới lúc chết (Priority: P1)

Người chơi bấm chào đời. Game ghép cho họ một nơi sinh, một gia cảnh, một đêm sinh và một thiên mệnh,
rồi thời gian bắt đầu trôi. Mỗi năm đi qua theo bốn mùa. Nhật ký đời (Biên niên) ghi lại những gì xảy
ra, và người chơi chọn ở các ngã rẽ cho tới khi nhân vật chết.

**Why this priority**: Đây là vòng chơi lõi. Không có nó thì không có game.

**Independent Test**: Bắt đầu một đời mới, để tự chạy và chọn ngẫu nhiên tới khi nhân vật chết, rồi
xác nhận có màn khai sinh, nhật ký theo năm, ít nhất một lựa chọn và trang di cảo.

**Acceptance Scenarios**:

1. **Given** người chơi ở màn hình chính, **When** họ bấm chào đời, **Then** game hiện thông tin khai
   sinh gồm District, lớp sống (Nest, Backstreets hoặc The Outskirts), gia cảnh, đêm sinh, thiên mệnh
   và người bạn thuở nhỏ.
2. **Given** một đời đang chạy ở tốc độ 1×, **When** không có gì chờ chọn, **Then** một năm trôi qua
   trong khoảng 30 giây và nhật ký thêm các dòng của năm đó.
3. **Given** Sinh lực của nhân vật về 0, **When** không có người gắn bó nào đỡ thay, **Then** đời kết
   thúc bằng một cảnh chết và trang di cảo ghi tuổi, nguyên nhân, danh hiệu và di vật.

---

### User Story 2 - Chọn ở các ngã rẽ: major, minor và daily (Priority: P1)

Trong năm, người chơi gặp ba loại khoảnh khắc. Daily là dòng thường ngày, không cần chọn. Minor là
tình huống nhỏ có đồng hồ đếm ngược. Major là sự kiện lớn, dừng thời gian tới khi người chơi chọn.
Trước khi chọn, người chơi thấy chip cho biết chỉ số nào sẽ lên hay xuống. Một số lựa chọn còn có
dòng mô tả hậu quả kéo dài.

**Why this priority**: Lựa chọn là cách người chơi tác động lên đời mình. Nhân quả từ lựa chọn là điểm
khác biệt chính của sản phẩm.

**Independent Test**: Chạy một đời tới tuổi 12 và xác nhận đã gặp ít nhất một minor và một major.
Để một minor hết giờ và xác nhận game dùng kết quả "bỏ qua" của nó.

**Acceptance Scenarios**:

1. **Given** một minor hiện ra, **When** người chơi không chọn trong thời gian chờ, **Then** game dùng
   kết quả bỏ qua của minor đó và năm tiếp tục.
2. **Given** một minor đầu tiên trong đời, **When** nó hiện ra, **Then** thời gian chờ là 30 giây; các
   minor sau có thời gian chờ 15 giây.
3. **Given** một major hiện ra, **When** người chơi chưa chọn, **Then** thời gian trong năm dừng hẳn.
4. **Given** một lựa chọn có tác động kéo dài nhiều năm, **When** người chơi mở phần chi tiết, **Then**
   họ thấy một dòng mô tả hậu quả đó bằng lời, không lộ trước số năm.
5. **Given** một lựa chọn bị khóa vì thiếu điều kiện (ví dụ không đủ Ahn), **When** người chơi nhìn
   lựa chọn đó, **Then** họ thấy lý do bị khóa.

---

### User Story 3 - Vào nghề và thăng cấp (Priority: P1)

Ở tuổi làm việc (từ 15 tới 20, tùy seed và xuất thân), người chơi bắt buộc chọn một con đường: Fixer,
Syndicate (một trong The Five Fingers hoặc độc lập) hay Wing. Bị từ chối thì thành Outcast. Ba nghề
chính đều có thang bậc. Người chơi tích Merit, Rep và các chỉ số khác để đủ điều kiện cho bậc tiếp theo, rồi
qua một kỳ thi hoặc lời mời.

**Why this priority**: Nghề là xương sống của nửa sau một đời. Đường lên Color là mục tiêu dài hạn
người chơi hay theo đuổi nhất.

**Independent Test**: Ép một đời vào nghề Fixer ở tuổi làm việc. Xác nhận thanh tiến độ thăng chức
hiện ngưỡng của kỳ thi Grade tiếp theo, và ngưỡng đó khớp với điều kiện game dùng để mở kỳ thi.

**Acceptance Scenarios**:

1. **Given** nhân vật tới tuổi làm việc, **When** năm đó bắt đầu, **Then** game hiện sự kiện chọn nghề
   theo xuất thân (Backstreets, Nest hoặc Outskirts).
2. **Given** một Fixer Grade 9, **When** họ đủ Merit và Rep của Grade 8, **Then** game mở kỳ sát hạch
   Hana. Đậu thì lên đúng một bậc. Riêng người có E.G.O có một lần trong đời được nhảy hai bậc.
3. **Given** một Fixer Grade 1 đủ điều kiện, **When** Hana mở kỳ khảo thí, **Then** người chơi có thể
   được phong Color và tự đặt danh hiệu.
4. **Given** nhân vật chưa đủ điều kiện, **When** người chơi nhìn thanh tiến độ, **Then** thanh không
   đầy và ghi rõ điều còn thiếu (thêm Merit, thêm Rep, chờ tới một tuổi, hoặc thêm năm ở cấp hiện tại).

---

### User Story 4 - Vào hầm ngục nhiều chặng (Priority: P2)

Một số sự kiện mở ra hầm ngục, ví dụ Ruins, nơi của The Claw hay kỳ sát hạch Hana. Trước khi vào, người
chơi chọn mức đặt cược. Trong hầm, mỗi chặng có các lựa chọn với tỉ lệ thành công khác nhau. Người
chơi có thể ra về với chiến lợi phẩm, bị thương, hoặc chết.

**Why this priority**: Hầm ngục là phần căng thẳng và có rủi ro chết cao nhất. Nó làm nhịp đời thay đổi,
nhưng không phải đời nào cũng gặp.

**Independent Test**: Mở một hầm ngục qua sự kiện của nó, đi qua mọi chặng bằng lựa chọn ngẫu nhiên,
rồi xác nhận game hiện cảnh cổng hầm ngục, một kết quả cuối và một dòng nhật ký tổng kết.

**Acceptance Scenarios**:

1. **Given** một hầm ngục vừa mở, **When** người chơi vào, **Then** game hiện cảnh cổng và màn chọn mức
   đặt cược.
2. **Given** người chơi đang ở một chặng, **When** một lựa chọn không dùng được, **Then** lựa chọn đó bị
   khóa và ghi lý do.
3. **Given** người chơi đã đi hết các chặng, **When** hầm ngục kết thúc, **Then** nhật ký ghi kết quả như
   một bước ngoặt.

---

### User Story 5 - Để lại di sản cho đời sau (Priority: P2)

Khi một đời kết thúc, người chơi đọc trang di cảo, rồi có thể chơi đời kế thừa: một đứa con, đệ tử hay
người nhặt lại di vật. Đời sau nhận một phần tài sản, danh vọng, mạng lưới, di vật, và có thể cả món nợ
máu. Huyết thống ghi lại các đời đã qua.

**Why this priority**: Đây là thứ khiến người chơi chơi lại nhiều đời và kể lại câu chuyện của họ.

**Independent Test**: Kết thúc một đời có con, chọn chơi đời kế thừa, rồi xác nhận đời mới mang theo kỷ
vật và lời kể về đời trước, và Huyết thống có thêm một mục.

**Acceptance Scenarios**:

1. **Given** một đời vừa kết thúc, **When** người chơi chọn đời kế thừa, **Then** màn khai sinh của đời
   mới nhắc tới đời trước.
2. **Given** đời trước có E.G.O, **When** đời sau bắt đầu, **Then** đời sau chỉ nhận kỷ vật hoặc lời kể,
   không nhận E.G.O.
3. **Given** người chơi đang ở đời thứ hai trở đi, **When** họ mở các mức tốc độ, **Then** họ thấy thêm
   mức "Lướt" (8×), chỉ chạy trong các đoạn yên ả.

---

### User Story 6 - Người thân và NPC quay lại (Priority: P3)

Người chơi có người bạn thuở nhỏ, người thương, bạn đời, con, người thầy và đối thủ. Lần đầu một người
bạn, người thương hay bạn đời xuất hiện, người chơi được đặt tên cho họ. Vài năm sau, NPC có thể quay
lại bằng một cảnh ngắn nhắc đúng lựa chọn người chơi đã làm với họ.

**Why this priority**: NPC làm đời có chiều sâu cảm xúc, nhưng vòng chơi vẫn đứng được khi thiếu phần
này.

**Independent Test**: Chạy một đời có người bạn thân, đặt tên khi được hỏi, rồi xác nhận tên mới hiện
trong mọi dòng nhật ký từ tuổi gặp người đó. Kiểm tra số cảnh nhắc lại trong đời nằm trong giới hạn.

**Acceptance Scenarios**:

1. **Given** một người bạn mới xuất hiện, **When** game hỏi tên, **Then** thời gian dừng tới khi người
   chơi xác nhận hoặc để trống để giữ tên cũ.
2. **Given** người chơi đã chọn bỏ mặc một NPC, **When** NPC đó quay lại vài năm sau, **Then** cảnh nhắc
   lại mang giọng lạnh, khớp với lựa chọn bỏ mặc.

---

### Edge Cases

- Nhân vật chết giữa một minor hay giữa một hầm ngục: đời kết thúc ngay, không để lại lựa chọn treo.
- Có người gắn bó với Bond từ 65 trở lên khi Sinh lực về 0: người đó chết thay một lần trong đời và
  nhân vật sống tiếp.
- Taboo Gaze đủ 3: The Claw tìm tới.
- Heat trên 65: Syndicate có thể phục kích.
- Resonance cao trong khi Tâm trí thấp: Carmen lên tiếng. Đồng ý thì thành Distortion, từ chối thì có
  E.G.O.
- Nhân vật bị từ chối ở ngã rẽ nghề: thành Outcast.
- Người chơi bật tự chọn trong lúc game đang hỏi tên NPC: game giữ tên mặc định và chạy tiếp.
- Tải một bản lưu cũ thiếu các trường mới: game vẫn tải được và điền giá trị mặc định.
- Người chơi rời trang chơi giữa chừng: đời được lưu trên trình duyệt và tiếp tục được ở lần sau.

## Requirements *(mandatory)*

### Functional Requirements

**Khai sinh**

- **FR-001**: Game MUST ghép mỗi đời từ các mảnh độc lập: District (ngẫu nhiên theo dân số, hoặc người
  chơi chọn trên bản đồ), lớp sống, gia cảnh, đêm sinh, một trong sáu thiên mệnh, và người bạn thuở nhỏ.
- **FR-002**: Game MUST có đủ 26 District cùng The Outskirts. District không có trong canon MUST mang
  nhãn "Phóng tác" hoặc "Không có trên bản đồ".

**Thời gian và kế hoạch năm**

- **FR-003**: Mỗi năm MUST có bốn mùa và một kế hoạch gồm các khoảnh khắc đặt sẵn theo thời điểm trong
  năm.
- **FR-004**: Người chơi MUST chọn được tốc độ 1×, 2×, 3× (30, 15, 10 giây mỗi năm) và tạm dừng. Trên máy
  tính có phím tắt.
- **FR-005**: Mức "Lướt" (8×) MUST chỉ hiện từ đời thứ hai trở đi hoặc khi bật tự chọn. Nó chỉ chạy
  trong đoạn yên ả và tự trở lại 8× sau khi người chơi giải xong một khoảnh khắc.
- **FR-006**: Năm yên ả (chỉ có daily) MUST được gộp thành một dòng trong nhật ký.

**Major, minor, daily**

- **FR-007**: Daily MUST không cần chọn. Minor MUST có đồng hồ: 30 giây cho minor đầu tiên trong đời,
  15 giây cho các minor sau. Đồng hồ chạy theo thời gian thực, không bị nhân lên bởi tốc độ chơi.
- **FR-008**: Minor hết giờ MUST dùng kết quả bỏ qua của nó. Minor về Merit hằng năm MUST chờ người chơi
  chọn, trừ khi đang bật tự chọn.
- **FR-009**: Major, hợp đồng, hầm ngục và hộp thoại đặt tên MUST dừng thời gian tới khi người chơi xử lý.
- **FR-010**: Mỗi lựa chọn MUST cho xem trước các chỉ số sẽ đổi theo chiều lên hay xuống, kèm tỉ lệ khi
  có nhiều kết quả. Lời kể không chứa con số chỉ số.
- **FR-011**: Lựa chọn có hậu quả nhiều năm MUST có được một dòng mô tả hậu quả bằng lời. Dòng này đúng
  với cơ chế thật và không lộ số năm của hậu quả ẩn.
- **FR-012**: Lựa chọn bị khóa MUST ghi lý do, và lựa chọn có giá MUST hiện số Ahn phải trả.

**Nhân quả**

- **FR-013**: Lựa chọn MUST để lại được ký ức, vết sẹo, thay đổi gắn bó, và hậu quả hẹn giờ xảy ra sau
  một số năm.
- **FR-014**: Game MUST theo dõi các đồng hồ áp lực Heat, Taboo Gaze và Resonance, mỗi đồng hồ có hậu
  quả riêng (phục kích, The Claw, Carmen).

**Nghề và thăng cấp**

- **FR-015**: Ở tuổi làm việc, game MUST bắt người chơi chọn nghề qua một sự kiện theo xuất thân, với
  các đường Fixer, Syndicate (Finger hoặc độc lập), Wing, và Outcast khi bị từ chối.
- **FR-016**: Fixer MUST lên từ Grade 9 tới Grade 1 qua kỳ sát hạch Hana, mỗi lần một bậc. Riêng người
  có E.G.O có một lần trong đời được nhảy hai bậc. Grade 1 có thể thành Color.
- **FR-017**: Finger và Wing MUST có ba bậc, mỗi bậc có ngưỡng Merit cùng chỉ số khác, và điều kiện thời gian (tuổi tối thiểu
  với Finger, số năm ở cấp với cả hai).
- **FR-018**: Ngưỡng thăng cấp MUST lấy từ một nguồn duy nhất dùng chung cho cả game lẫn máy chủ, và
  UI MUST hiện đúng ngưỡng đó.
- **FR-019**: Hồ sơ nhân vật MUST có thanh tiến độ tới lần thăng chức hoặc kỳ thi kế tiếp, nằm ngoài mục
  gập. Khi chưa đủ điều kiện, thanh MUST ghi điều còn thiếu.

**Siêu nhiên**

- **FR-020**: Game MUST có hai trạng thái: E.G.O (từ chối Carmen) và Distortion (đồng ý với Carmen),
  mỗi trạng thái có sự kiện và hậu quả riêng. Thức tỉnh E.G.O có cảnh riêng và hộp thoại đặt tên E.G.O.

**Hầm ngục**

- **FR-021**: Hầm ngục MUST có nhiều chặng, màn đặt cược trước khi vào, cảnh cổng riêng, và lựa chọn
  khóa khi không đủ điều kiện. Kết quả cuối MUST được ghi như một bước ngoặt.

**NPC**

- **FR-022**: Lần đầu gặp người bạn, người thương hay bạn đời, game MUST hỏi tên một lần cho mỗi NPC.
  Tên mới MUST thay trong mọi dòng nhật ký từ tuổi gặp người đó.
- **FR-023**: Cảnh nhắc lại lựa chọn cũ MUST khớp với lựa chọn người chơi thật sự làm. Mỗi đời có tối đa
  6 cảnh, hai cảnh cách nhau ít nhất 2 năm, và không cảnh nào lặp.

**Cái chết và di sản**

- **FR-024**: Sinh lực về 0 MUST kết thúc đời, trừ một lần được người gắn bó với Bond từ 65 trở lên đỡ
  thay. Cái chết có cảnh riêng, sau đó là trang di cảo.
- **FR-025**: Đời kế thừa MUST nhận một phần tài sản, danh vọng, mạng lưới và di vật, có thể nhận món nợ
  máu, và không nhận E.G.O của đời trước. Huyết thống MUST ghi mọi đời đã qua.

**Đọc và hiển thị**

- **FR-026**: Nhật ký MUST có chế độ Đọc gọn và Đọc đầy đủ. Đọc gọn không bao giờ gấp thứ đang chờ chọn,
  năm đang sống, hậu quả, nguy hiểm hay bước ngoặt.
- **FR-027**: Mọi văn bản MUST có tiếng Việt và tiếng Anh, và có chế độ hiển thị cả hai.
- **FR-028**: Mọi cảnh chuyển MUST có bốn mức: đầy đủ, rút gọn, đứng yên (giảm chuyển động) và chỉ chữ
  (tắt cảnh).
- **FR-029**: Mọi màn hình MUST dùng được đầy đủ trên điện thoại và trên máy tính.

**Lưu ván**

- **FR-030**: Ván đang chơi MUST được lưu trên trình duyệt và tải lại được. Bản lưu cũ MUST tải được
  sau mọi thay đổi.
- **FR-031**: Số liệu chơi ẩn danh MUST chỉ được gửi khi người chơi bật trong Cài đặt.

### Key Entities *(include if feature involves data)*

- **Đời (Life)**: một nhân vật từ lúc sinh tới lúc chết. Có tuổi, mùa, chỉ số (Sinh lực, Tâm trí, Ahn,
  Rep, Network, Merit, Resonance, Heat, Taboo), cờ trạng thái, nghề và bậc, ký ức, vết sẹo và nhật ký.
- **Khoảnh khắc (Moment)**: một mục trong kế hoạch năm, thuộc loại daily, minor hoặc major. Có thời điểm
  trong năm, điều kiện xuất hiện, các lựa chọn và kết quả.
- **Lựa chọn (Choice)**: có tác động lên chỉ số, có thể có giá Ahn, điều kiện khóa, ký ức để lại, hậu quả
  hẹn giờ và dòng mô tả hậu quả kéo dài.
- **NPC**: người thân hoặc người quen. Có vai trò, tên, Bond, tuổi gặp, trạng thái sống chết.
- **Hầm ngục (Dungeon)**: chuỗi chặng có mức đặt cược, lựa chọn theo chặng và kết quả cuối.
- **Mục nhật ký (Log entry)**: có tuổi, mùa, loại và tầng (quiet, decision, turn), dùng cho Đọc gọn.
- **Huyết thống (Lineage)**: danh sách các đời đã qua cùng di sản truyền lại.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Trong một lần mô phỏng 500 đời với lựa chọn ngẫu nhiên, 100% số đời đi từ lúc sinh tới
  lúc chết mà không kẹt, và có 0 lỗi ở cả năm nhóm kiểm tra toàn vẹn: NPC đã chết xuất hiện như còn
  sống, Distortion làm việc của Fixer, nhảy bậc sai, con ruột khi không có con, và điều kiện hiển thị
  lệch với cổng thi.
- **SC-002**: Ở tốc độ 1× và khi không có gì chờ chọn, một năm trôi qua trong khoảng 30 giây, sai lệch
  không quá 5%.
- **SC-003**: 100% ngưỡng thăng cấp người chơi thấy khớp với điều kiện game dùng để mở kỳ thi, cho mọi
  nghề có thăng cấp.
- **SC-004**: Ở các đời có NPC thân, trung bình có ít nhất 3 cảnh nhắc lại mỗi đời. Không đời nào quá 6
  cảnh, và có 0 cảnh lặp.
- **SC-005**: Trên màn hình điện thoại 390×844, mọi nút lựa chọn của thẻ minor nằm trong màn đầu tiên,
  mỗi nút từ 44×44 điểm trở lên.
- **SC-006**: 100% chuỗi văn bản qua các quy tắc giọng văn: không dấu gạch dài, không dấu chấm than ngoài
  lời thoại, không con số chỉ số trong lời kể, và độ dài câu trong giới hạn.
- **SC-007**: Một bản lưu từ phiên bản trước tải được và chơi tiếp được, không mất đời đang chơi.
- **SC-008**: Người chơi có thể kể lại đời vừa chơi bằng những gì ghi trên trang di cảo: nguyên nhân
  chết, nghề cao nhất đạt được, và người thân quan trọng nhất.

## Assumptions

- Spec này mô tả game ở commit `83e4bba` (ngày 2026-11-04) và không yêu cầu đổi code. Hành vi nào khác
  với spec thì code là đúng, và spec cần được cập nhật.
- Chi tiết số liệu (ngưỡng từng bậc, tỉ lệ thiên mệnh, Bond cụ thể) nằm ở các tài liệu luật chơi và
  thế giới của dự án. Spec này chỉ nêu những điểm người chơi cảm nhận được.
- Người chơi chính là fan Project Moon người Việt, đã biết The City. Game không giảng lại lore.
- Thuật ngữ Project Moon giữ nguyên tiếng Anh, theo constitution của dự án.
- Máy chủ chỉ giữ bia tưởng niệm, codex và số liệu ẩn danh. Vòng chơi chạy được đầy đủ khi không có máy
  chủ.
- Các phần ngoài vòng chơi lõi (Khung cửi, Từ điển thế giới, Thành tựu, Workshop rèn vũ khí) để cho các
  spec riêng.
