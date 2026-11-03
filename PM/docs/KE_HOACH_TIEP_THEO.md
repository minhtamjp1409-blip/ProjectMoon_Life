# Kế hoạch tiếp theo

Kế hoạch cutscene đã xong (C1 đến C8, Đợt 101 đến 111 trong `PROGRESS_LOG.md`). File này thay cho các kế hoạch và báo cáo cũ. Nó gom những việc còn lại từ hai bản góp ý gần nhất, sau khi đã đối chiếu với code ở commit `6c8b2f7`.

Luật chơi đang chạy nằm ở `docs/LUAT_HIEN_HANH.md`, lore và giọng văn ở `UNIVERSE.md`, lịch sử thay đổi ở `PROGRESS_LOG.md`.

Mỗi đợt dưới đây được commit riêng, ghi vào `PROGRESS_LOG.md`, push lên `main`, rồi kiểm tra bundle Vercel và Render health.

## Tóm tắt

| Đợt | Việc | Cỡ | Trạng thái |
|---|---|---|---|
| 113 | Sửa di cảo mất mốc cuối đời | nhỏ | đã xong |
| 113 | Sửa lý do khóa báo sai Bond | nhỏ | đã xong |
| 114 | Bỏ chi phí hiện hai lần trên lựa chọn | nhỏ | đã xong |
| 114 | Nói rõ luật thời gian ở màn khai sinh | nhỏ | đã xong |
| 115 | Gộp daily của năm yên ả | lớn | đã xong |
| 115 | Tự lướt năm yên ả | vừa | đã xong |
| 116 | Thẻ chương khi mất một NPC thân thiết | vừa | đã xong |
| 117 | Đo và gọn dock hầm ngục trên điện thoại | vừa | đã xong |
| 118 | Gọn thẻ minor, thẻ chương khi trượt kỳ thi, thử trình đọc màn hình | vừa | đã xong |
| 119 | Sửa hai lỗi mở đầu và thông báo trên điện thoại, thêm thông tin ở màn khai sinh | nhỏ | đã xong |
| 120 | Năm yên ả một dòng, chuẩn độ dài câu chữ, gọn phần khai sinh | vừa | đã xong |
| 121 | Đặt tên người thân, NPC quay lại nhắc lựa chọn cũ | lớn | đã xong |
| 122 | Hậu quả kéo dài nói bằng lời, tiến độ thăng chức | vừa | đã xong |
| 123 | Lướt nhanh đời thường khi chơi lại | vừa | đã xong |
| (chủ dự án) | Nghe thử âm thanh trên điện thoại và tai nghe | nhỏ | chờ chủ dự án |

Đợt 114b có thêm dải bản đồ thu nhỏ trên điện thoại, theo bản góp ý thứ ba (ngày 02/11/2026). Đợt 118 và buổi nghe thử âm thanh cũng đến từ bản góp ý đó.

Đợt 119 đến 123 đến từ lần so sánh với web mẫu "Born as an Individual in the City" (ngày 03/11/2026), gộp với một bản góp ý ngoài. Kết luận của lần so sánh: web mẫu thắng ở chỗ người chơi bắt đầu nhanh và muốn chơi tiếp; game mình thắng ở địa điểm, hệ thống và cao trào. Các đợt này học nhịp chơi và cách gắn người chơi với nhân vật, không đụng tới chiều sâu đã có.

---

## Đợt 113: hai lỗi làm sai ký ức của đời

### 113a. Di cảo mất các mốc cuối đời

**Lỗi.** `buildLifeSummary` gom mốc vào `chosenLandmarks` và xếp theo thứ tự thời gian (`src/engine/gameEngine.js:3075`). Sau đó dòng 3446 lấy `turningPoints.slice(0, 8)`. Một đời có hơn 8 mốc vì thế giữ phần tuổi thơ và đánh rơi phần cuối: lên Color, vào Finger, cái chết. Đây là phần người chơi muốn thấy nhất.

**Cách sửa.**
1. Cho mỗi mốc một điểm quan trọng, theo thứ tự: mốc cuối đời, Color và E.G.O, lên Grade hoặc bậc Finger, vào nghề, NPC thân thiết mất, `danger` sống sót, còn lại.
2. Chọn 8 mốc có điểm cao nhất. Mốc cuối cùng luôn được giữ. Nếu hòa điểm thì lấy mốc muộn hơn.
3. Xếp 8 mốc đó lại theo thời gian rồi mới trả về.
4. Giữ nguyên luật "tối đa 2 mốc mỗi tuổi" đang có.

**File.** `src/engine/gameEngine.js` (chỉ phần chọn mốc, không đổi `formatLandmark`).

**Test.** `tests/test_life_summary_landmarks.mjs`:
- Dựng một đời 60 tuổi có 14 mốc, trong đó Color ở tuổi 52. Color phải nằm trong 8 mốc.
- Mốc cuối cùng của đời luôn có mặt.
- 8 mốc trả về vẫn theo thứ tự tuổi tăng dần.
- Đời ngắn (ít hơn 8 mốc) giữ đúng danh sách cũ.

**Xong khi.** Test qua, `npm test` qua, và audit 500 đời không có di cảo nào thiếu mốc cuối.

### 113b. Lý do khóa báo thiếu Bond khi Bond đã đủ

**Lỗi.** Trong hàm trả lý do khóa (`src/engine/eventConditions.js:301`), nhánh `need.bondAtLeast` trả câu "Cần gắn kết … ≥ …" ngay khi lựa chọn *có* điều kiện Bond. Hàm không kiểm tra Bond thực tế có thấp hơn mức cần hay không. Hàm kiểm tra điều kiện (dòng 126) thì đúng. Vì vậy một lựa chọn bị khóa vì thiếu Reputation (kiểm tra ở sau) vẫn hiện lý do thiếu Bond.

**Cách sửa.** Ở dòng 301, chỉ trả lý do Bond khi NPC không hoạt động hoặc `bond < min`. Làm tương tự cho `bondAtMost` nếu nhánh đó có lý do riêng. Rà cả hàm để tìm nhánh nào khác cũng báo mà không so giá trị thật.

**Test.** `tests/test_lock_reasons.mjs`:
- Bond đủ, Reputation thiếu: lý do phải nói về Reputation.
- Bond thiếu: lý do nói về Bond.
- Với mọi lựa chọn trong data: nếu hàm kiểm tra cho qua thì hàm lý do trả `null`. Đây là test bảo vệ lâu dài, bắt được cả những nhánh lệch khác.

**Xong khi.** Ba test trên qua.

---

## Đợt 114: hai chỗ chữ thừa và thiếu

### 114a. Chi phí hiện hai lần

**Lỗi.** Nhiều nhãn lựa chọn đã viết giá trong ngoặc, ví dụ "Nhờ người mua thuốc và băng sạch (-1 Ahn)" (`src/data/lifeMinors.js:1569`) hay "(Tốn 40 Ahn)" ở `eventsWorkshopVisits.js` và `eventsWorkshopEconomy.js`. Khi lựa chọn có `costAhn`, `LiveStageFeed.jsx:340` gắn thêm thẻ "Tốn N Ahn". Người chơi đọc cùng một giá hai lần.

**Cách sửa.** Thẻ là nơi duy nhất báo giá.
1. Viết một hàm nhỏ `stripCostSuffix(label)` bỏ phần ngoặc cuối nhãn khi nó chỉ chứa giá Ahn: `(-1 Ahn)`, `(Tốn 40 Ahn)`, `(cost 40 Ahn)`.
2. Chỉ gọi hàm khi lựa chọn có `costAhn`. Nhãn không có giá máy đọc được thì giữ nguyên chữ.
3. Dùng hàm ở mọi chỗ vẽ nhãn lựa chọn: minor, event, hợp đồng.

Không sửa từng file data. Cách này gọn hơn và không đụng tới voice lint.

**Test.** Thêm vào `tests/`: các mẫu ngoặc trên đều bị bỏ; nhãn có ngoặc không phải giá (ví dụ "(nếu còn sức)") giữ nguyên; nhãn có giá nhưng không có `costAhn` giữ nguyên. Thêm một lượt quét data: mọi lựa chọn có `costAhn` sau khi bỏ ngoặc không còn chữ "Ahn".

**Xong khi.** Test qua và ảnh chụp minor tiệm thuốc chỉ còn một chỗ báo giá.

### 114b. Luật thời gian ở màn khai sinh

**Hiện tại.** Dòng chú thích dưới nút bắt đầu ghi "Một năm trong 30 giây · Tự lưu sau mỗi lựa chọn." (`BirthSetupPanel.jsx:553`). Người mới không biết rằng lựa chọn lớn dừng đồng hồ, còn lựa chọn nhỏ có hạn giờ và hết giờ thì bị bỏ qua (`gameStore.js:885`, `chooseMinor(-1)`).

**Cách sửa.** Thay bằng hai câu ngắn, đúng với code:
- "Một năm trôi trong 30 giây. Lựa chọn lớn dừng đồng hồ chờ bạn; lựa chọn nhỏ có hạn giờ, hết giờ thì đời đi tiếp."
- "Tự lưu sau mỗi lựa chọn."

Có bản tiếng Anh tương ứng.

**Dải bản đồ trên điện thoại.** Ở màn hẹp, bản đồ District (`CityBirthAtlas.jsx`) nằm dưới form khai sinh, nên ấn tượng đầu tiên chỉ là một cái form. Cách sửa:
1. Dưới 720px, đặt lên đầu màn một dải ngang thấp (khoảng 120px) cắt từ chính bản đồ đó. Dải có District đang chọn được tô sáng và tên nơi xuất thân. Nếu đang chọn ngẫu nhiên thì ghi "Ngẫu nhiên".
2. Chạm vào dải thì cuộn xuống bản đồ đầy đủ và đưa focus vào đó. Dải là một nút thật, có nhãn cho trình đọc màn hình.
3. Dùng lại SVG của bản đồ, không vẽ hình mới. Desktop giữ nguyên.

**Kiểm tra.** Quay ảnh ở 1440x900 và 390x844:
- Trên điện thoại, dải bản đồ, nút bắt đầu và hai câu luật vẫn nằm trong màn đầu.
- Không tràn ngang; desktop không đổi.
- Chạy voice lint.

---

## Đợt 115: năm yên ả đọc ít, đi nhanh

Đây là việc lớn nhất. Hai phần đi chung vì cùng dựa trên một định nghĩa "năm yên ả".

**Định nghĩa.** Một năm là yên ả khi kế hoạch năm (`yearPlanner.js`) chỉ có slot `daily`: không có minor, mishap, event, hợp đồng, hầm ngục, cutscene hay thẻ chương, và không NPC nào đổi trạng thái. Hàm `isQuietYear(plan, char)` đặt trong `yearPlanner.js` và được test riêng.

### 115a. Gộp daily của năm yên ả

**Hiện tại.** Từ tuổi 5, `yearPlanner.js:733` lấp mọi slot trống bằng daily, nên một năm bình thường có tới bốn dòng daily (thêm dòng phụ khi `drama` cao). Đọc qua nhiều năm như vậy rất mỏi.

**Cách làm.**
1. Daily vẫn được chọn như cũ. Không đổi seed và không đổi tác động lên chỉ số, nên save cũ và audit không lệch.
2. Khi ghi log, các daily thuần trong một năm được gom vào một mục `year_digest`: một câu mở đầu, rồi các daily là các câu ngắn nối nhau, cộng tổng thay đổi chỉ số của cả năm.
3. Mục có lựa chọn, NPC, hậu quả, `danger` hay mishap không bao giờ bị gộp, và vẫn giữ đúng vị trí mùa của nó.
4. Mục gộp có nút "Xem từng mùa" để mở lại các dòng gốc. Dữ liệu gốc vẫn nằm trong log, chỉ phần vẽ là gộp.
5. Tuổi 0 đến 4 giữ nguyên, vì đã chỉ có một daily mỗi năm.
6. Di cảo và `buildLifeSummary` vẫn đọc dòng gốc, không đọc mục gộp.

**File.** `src/engine/yearPlanner.js` (định nghĩa yên ả), store `commit` (ghi mục gộp), `LiveStageFeed.jsx` và `entryTiers.js` (cách vẽ), `chronicle.css`.

**Test.**
- Năm chỉ có daily: một mục gộp, đủ id các dòng gốc.
- Năm có minor: minor đứng riêng, các daily còn lại vẫn gộp.
- Tổng chỉ số của mục gộp bằng tổng các dòng gốc.
- Save cũ (không có mục gộp) mở ra vẫn đọc được.
- Audit 500 đời: số mục có lựa chọn và hậu quả không đổi so với trước khi gộp.

### 115b. Tự lướt năm yên ả

**Hiện tại.** Đã có tốc độ 1x/2x/3x (`PlayBar.jsx:406`) và nút "Qua thời gian yên ắng" (`skipQuietTime`, `gameStore.js:967`), nhưng nút phải bấm tay từng lần.

**Cách làm.**
1. Thêm tùy chọn "Tự lướt năm yên ả" trong cài đặt, mặc định tắt.
2. Khi bật, năm thỏa `isQuietYear` chạy ở 4x. Gặp bất cứ thứ gì khác thì về tốc độ người chơi đã chọn.
3. Không thêm nấc x4 hay x8 chung, vì minor có hạn giờ và người chơi cần đọc kịp.
4. Từ 3x, cutscene đã tự chạy bản ngắn, nên không cần sửa gì thêm cho cutscene.

**Test.** Năm yên ả chạy nhanh. Năm có minor về tốc độ thường trước khi minor mở. Tắt tùy chọn thì hành vi y như hiện nay.

**Xong khi.** Quay một đời 40 năm: người chơi vẫn đọc được mọi lựa chọn, và tổng thời gian chơi giảm. Ghi con số đo được vào log.

---

## Đợt 116: thẻ chương khi mất một NPC thân thiết

**Hiện tại.** `chapterFor` (`src/engine/chapters.js`) ghi thẻ khi vào hoặc rời nghề, lên bậc, có E.G.O, Distortion hay Color. Cái chết của một người thân không có thẻ. Cảnh C7 chỉ lo trường hợp NPC chết thay bạn.

**Cách làm.**
1. Thêm một nhánh: một NPC thuộc các vai `partner`, `spouse`, `mentor` hoặc `friend`, có Bond từ 50 trở lên, chuyển sang `deceased` trong lần commit này.
2. Nếu cùng commit đó đã phát cảnh savior thì không ghi thẻ. Cảnh đã nói thay.
3. Thẻ ghi tên người mất và một câu theo vai, giống cách lời cuối của C7 chia theo vai. Câu mới phải qua voice lint.
4. Thẻ chỉ là một mục trong log, không có nút "Tiếp tục" và không dừng nhịp chơi. Đề xuất ban đầu muốn thêm nút dừng; mình không làm theo, vì mốc nhỏ mà chặn nhịp thì phá luật xếp hạng cảnh.
5. Một commit vẫn chỉ ghi tối đa một thẻ, thẻ lớn nhất thắng. Lên Color trong cùng năm thì Color thắng.

**Test.** Thêm vào `tests/test_chapters.mjs`: mentor Bond 70 mất thì có thẻ; Bond 30 thì không; savior cùng commit thì không; NPC đã mất từ trước thì không ghi lại.

---

## Đợt 117: dock hầm ngục trên điện thoại

**Giả thuyết cần đo.** Ở 390x844, dock hầm ngục xếp chồng thẻ đánh, bài, vật phẩm và lựa chọn, nên người chơi phải cuộn mới tới lựa chọn.

**Bước 1, đo.** Dùng công cụ quay ở 390x844 cho ba hầm ngục (`dungeon_warp_train`, `dungeon_great_lake` và Claw). Ghi vị trí đáy của lựa chọn đầu tiên so với chiều cao màn hình.

**Bước 2, chỉ làm nếu lựa chọn đầu tiên nằm ngoài màn đầu.** Gom thẻ đánh và vật phẩm vào một hàng ngang trên cùng, vùng chạm tối thiểu 44px. Lựa chọn lên ngay dưới. Không đổi gì ở desktop.

**Xong khi.** Lựa chọn đầu tiên nằm trong màn đầu ở 390x844, không tràn ngang, độ tương phản vẫn đạt mức của Đợt 107.

---

## Đợt 118: thẻ minor gọn hơn, thất bại có tên, đọc được bằng tai

### 118a. Thẻ minor gọn hơn

**Giả thuyết cần đo.** Trên điện thoại, thẻ minor (`MinorDock` trong `LiveStageFeed.jsx`) có nhiều nhãn, chip và nút: số thứ tự, nhãn, chip giá, phần xem trước tác động (`ChoicePreview`), đồng hồ đếm ngược, nút tạm dừng, nút "Xem phía sau". Đợt 114a mới bỏ được chỗ giá hiện hai lần.

**Bước 1, đo.** Quay ba minor ở 390x844: một minor có giá, một minor có NPC, một minor có điều kiện khóa. Với mỗi minor ghi lại:
- số chip và nhãn trên mỗi lựa chọn;
- chiều cao của thẻ;
- lựa chọn cuối có nằm trong màn đầu không.

**Bước 2, gọn lại.** Mỗi lựa chọn giữ tối đa ba thứ: nhãn, giá (nếu có) và một dòng tác động chính. Phần xem trước chi tiết (thay đổi Bond, rủi ro) gấp lại sau một chạm. Lý do khóa vẫn luôn hiện, vì người chơi cần biết vì sao không chọn được.

**Xong khi.** Cả ba minor để lựa chọn cuối nằm trong màn đầu ở 390x844; lựa chọn bị khóa vẫn đọc được lý do; desktop không đổi bố cục.

### 118b. Thẻ chương khi trượt kỳ thi Fixer

**Hiện tại.** Mỗi lần trượt, game tăng `char.fixerExamFailures` (`gameEngine.js:2369`), nhưng `chapterFor` cố ý không ghi thẻ cho những lần đi xuống. Một lần trượt vì vậy chỉ là một dòng log thường, dễ trôi qua.

**Cách làm.** Thêm một nhánh vào `chapterFor`: khi tổng `fixerExamFailures` tăng trong lần commit đó, ghi một thẻ chương nhỏ, chữ ít hơn thẻ thăng hạng. Câu thẻ nói rõ Grade vừa trượt, và nếu là lần trượt thứ hai cùng một Grade thì câu khác đi. Không làm cảnh riêng: thi trượt hay gặp, dựng cảnh sẽ làm cảnh mất giá. Luật "mỗi commit một thẻ, thẻ lớn nhất thắng" vẫn giữ nguyên.

**Test.** Thêm vào `tests/test_chapters.mjs`:
- trượt lần đầu có thẻ;
- trượt lần hai cùng Grade có câu khác;
- thi đỗ không có thẻ trượt;
- trượt trong cùng commit với cái chết thì không có thẻ, vì cái chết thắng.

### 118c. Thử bằng trình đọc màn hình

**Rủi ro.** Vùng thông báo ẩn (`LiveStageFeed.jsx:1565`) để trống khi có dock hoặc đang có cảnh. Khi cảnh kết thúc, người dùng trình đọc có thể không được nghe chuyện gì vừa xảy ra. Thứ tự đọc của thẻ chương và di cảo cũng chưa được kiểm.

**Cách làm.**
1. Chạy một đời ngắn bằng NVDA trên Chrome, đi qua một minor, một cảnh (Claw hoặc dungeon gate), một thẻ chương và cái chết. Ghi lại những gì được đọc và theo thứ tự nào.
2. Khi cảnh kết thúc, đọc câu chính của cảnh một lần qua vùng thông báo. Bản `caption` cũng đọc câu đó.
3. Sửa thứ tự DOM ở những chỗ trình đọc đọc sai thứ tự so với mắt nhìn.

**Xong khi.** Bản ghi NVDA được đưa vào `PROGRESS_LOG.md` và mỗi biến cố trên được đọc đúng một lần, đúng thứ tự.

---

## Đợt 119: lỗi mở đầu trên điện thoại, thông tin ở màn khai sinh (ĐÃ HOÀN THÀNH)

### 119a. Vùng nội dung trống lúc mới vào (ĐÃ XONG)

**Hiện tại.** Đã sửa: `startLife` trong `src/store/gameStore.js` lập tức bóc tách dòng log đầu tiên vào `logs = [firstLog]` ngay tại frame 0 (0ms), phần còn lại đưa vào `pendingBirthLogs`. Khắc phục hoàn toàn độ trễ render feed trống. Đo đạc CDP thực tế trên 390x844: `firstLogTime = 0ms` (<500ms).

### 119b. Thông báo thành tựu đè tên nhân vật và HUD (ĐÃ XONG)

**Hiện tại.** Đã sửa: `flushAchievementToasts` chuyển `placement` thành `top` trên mobile (≤ 820px), bổ sung CSS định vị `top: calc(185px + env(safe-area-inset-top, 0px)) !important; bottom: auto !important;` để toast nổi ngay dưới HUD chỉ số (~140-160px), giải phóng 100% các nút hành động ở đáy màn hình; thêm `role="status"` và `aria-live="polite"`.

### 119c. Thêm thông tin ở màn khai sinh (ĐÃ XONG)

**Hiện tại.** Đã sửa: Thêm 2 dòng chú thích trong `BirthSetupPanel.jsx`: (1) Cảnh báo cốt truyện Project Moon 15+, (2) Phím tắt máy tính với CSS `@media (hover: hover) and (pointer: fine)` tự ẩn trên thiết bị cảm ứng di động. Rút ngắn hoạt cảnh quay nơi sinh `spinTo` còn 750ms và hỗ trợ chạm để bỏ qua ngay. Test `test_choice_cost_label.mjs` kiểm tra đầy đủ cả 2 dòng song ngữ.

---

## Đợt 120: đọc ít chữ hơn (ĐÃ HOÀN THÀNH)

### 120a. Năm yên ả chỉ một dòng (ĐÃ XONG)

**Hiện tại.** Đã sửa: `createYearDigest` trong `src/engine/yearPlanner.js` rút gọn mục gộp về đúng 1 câu duy nhất. Chọn daily có delta lớn nhất hoặc có NPC (hòa phá bằng RNG tất định qua `createRNG`), không có biến động thì chọn từ bộ 30 câu văn cảnh canon (`AMBIENT_YEAR_LINES`) cho Backstreets, Nest, Outskirts (dò đúng qua `isNest` / `isOutskirts`). Nếu năm có daily thật (`dailyEntries.length > 0`) thì ưu tiên daily thật bằng seed, không thay bằng câu ambient chung chung. Tổng deltas và nút "Xem từng mùa" giữ nguyên 100%.

### 120b. Chuẩn độ dài câu chữ (ĐÃ XONG)

**Hiện tại.** Đã sửa: Xây dựng công cụ kiểm tra `tools/lint/check_sentence_length.mjs` chạy mô phỏng 150 đời để xếp hạng tần suất xuất hiện và kiểm soát độ dài câu lẫn số từ (tình huống minor tối đa 45 từ tiếng Việt, kết quả lựa chọn tối đa 45 từ tiếng Việt; quét sâu nhánh `out` và `ignore`; daily 1-2 câu; year-end max 2 câu). Tinh gọn tự nhiên không dùng ", và" trong `lifeMinorsKids.js`, `lifeMinors.js`, `lifeDailies.js`, tích hợp `--fail` vào `npm test`.

### 120c. Gọn phần khai sinh hiện mặc định (ĐÃ XONG)

**Hiện tại.** Đã sửa: Trong `src/features/chronicle/components/LiveStageFeed.jsx` và `src/data/birthStories.js`, các dòng Nơi sinh (`log_birth_0`), Điềm định mệnh (`log_birth_2`), Bạn thời thơ ấu (`log_birth_3` - cần cho Đợt 121) và Di sản thế hệ (`log_legacy_0`) hiển thị trực tiếp trong chronicle. Chỉ gập phần mô tả dài đêm sinh & gia cảnh (`log_birth_1`) vào fold với tiêu đề song ngữ "Gia cảnh & đêm sinh" / "Family & birth night". Trong `startLife`, nạp ngay các dòng gập vào `logs` ở frame 0 để triệt tiêu hoàn toàn khoảng chờ rỗng 1.3s. Loading overlay đặt `z-index: 1100` và nền đục 98% chống lộ form bên dưới mà không che modal báo lỗi. Test `tests/test_birth_extra_fold.mjs` kiểm tra độ bao phủ 100%.

---

## Đợt 121: người chơi gắn với người thân (ĐÃ HOÀN THÀNH)

### 121a. Đặt tên người thân (ĐÃ XONG)

**Lý do.** Web mẫu hỏi tên bạn thuở nhỏ và thú nuôi ("để trống để ngẫu nhiên"). Tên do chính người chơi đặt làm thẻ chương mất người thân (Đợt 116) nặng hơn nhiều.

**Cách làm.**
1. Ở lần đầu một NPC `friend`, `lover` hoặc `spouse` xuất hiện, dừng thời gian như một major và hỏi một câu theo vai, ví dụ với bạn thuở nhỏ: "Đứa trẻ đó tên gì? (để trống để ngẫu nhiên)".
2. Ô nhập giới hạn 24 ký tự và cắt khoảng trắng. Để trống thì giữ tên ngẫu nhiên như hiện nay.
3. Tên lưu vào `nameVi` và `nameEn` của NPC. Save cũ không có cờ hỏi tên thì không hỏi lại.
4. Khi bật tự chọn, bỏ qua câu hỏi và giữ tên ngẫu nhiên.

**Test.**
- Có tên thì log và thẻ chương dùng tên đó.
- Để trống thì giữ tên ngẫu nhiên.
- Mỗi NPC chỉ hỏi một lần.
- Load save cũ không lỗi.

### 121b. NPC quay lại bằng cảnh ngắn nhắc lựa chọn cũ (ĐÃ HOÀN THÀNH — Tách riêng khóa mem theo hướng đầy đủ, 71 cảnh nhắc lại, max 6 cảnh/đời, 0 trùng lặp, test qua 100%)

**Lý do.** Một nhân vật xuất hiện nhiều lần đáng giá hơn nhiều nhân vật chỉ xuất hiện một lần.

**Cách làm.**
1. Đây là tinh chỉnh tần suất và điều kiện của hệ NPC đang có, không dựng hệ mới.
2. Ghi lại một số lựa chọn có NPC tham gia, kèm id lựa chọn và tuổi.
3. Thêm các cảnh ngắn nhắc lại lựa chọn cũ (tổng cộng 71 cảnh nhắc lại trong `src/data/lifeNpcCallbacks.js`), mỗi cảnh 1–2 câu, nhắc lại đúng lựa chọn đó vài năm sau. Tách khóa `mem` riêng cho các lựa chọn ngược chiều Bond hoặc khác hành động; lựa chọn xấu có câu nhắc riêng với giọng lạnh và khoảng cách. Đặt khoảng cách tối thiểu 2 năm giữa hai cảnh nhắc lại (`char.lastCallbackAge`) và giới hạn tối đa 6 cảnh nhắc lại mỗi đời (`char.npcCallbackCount < 6`).
4. Trước khi viết, đo bằng audit 500 đời: một đời trung bình gặp lại cùng một NPC bao nhiêu lần (baseline trước khi viết: `4,43` lần gặp/đời, `0,00` cảnh nhắc lại/đời; sau khi hoàn thiện và tinh chỉnh cân bằng: tỉ lệ minor có NPC đạt **`16,9%`**, trung bình **`3,18` cảnh nhắc lại/đời có NPC thân**, `0` đời vượt quá 6 cảnh, `0` trùng lặp).

**Xong khi.** Trong audit, một đời có NPC thân trung bình gặp ít nhất 3 cảnh nhắc lại (`3,18 >= 3,0`), không đời nào vượt quá 6 cảnh (`max <= 6`), và không cảnh nào lặp trong cùng một đời (`0`). Test `tests/test_npc_naming_and_callbacks.mjs` đạt 100%.

---

## Đợt 122: hậu quả và đích đến (ĐÃ HOÀN THÀNH)

### 122a. Hậu quả kéo dài nói bằng lời (ĐÃ XONG)

**Hiện tại.** `ChoicePreview` (`Deltas.jsx:229`) chỉ hiện chip +/−, nên người chơi không biết tác động kéo dài bao lâu.

**Cách làm.** Với lựa chọn có tác động nhiều năm (Bond, nợ, hợp đồng, NPC đi theo), cho phép data khai một trường `lasting: { vi, en }`. Trường này hiện thành một dòng ngắn dưới nhãn lựa chọn (`.choice-lasting`), ví dụ "Mỗi năm SP +2, kéo dài tới khi chia tay". Lựa chọn không có trường này thì không đổi gì.

**Xong khi.** Đã bổ sung `lasting: { vi, en }` cho 20 lựa chọn dài hạn (vượt mốc 15 lựa chọn). Thẻ minor ở 390x844 đạt chuẩn của Đợt 118a: dòng `lasting` nằm trong phần mở bằng nút gập (`+` / `.preview-secondary`).

### 122b. Tiến độ thăng chức (ĐÃ XONG)

**Hiện tại.** Merit chỉ là một con số nằm trong mục gập của hồ sơ (`CharacterDossierCard.jsx:650`). Người chơi không biết còn bao xa mới tới lần thăng chức hoặc kỳ thi Grade tiếp theo.

**Cách làm.**
1. Hiện ở cột trái, ngoài mục gập, một thanh "Tới thăng chức: 6/8", hoặc "Tới kỳ thi Grade 6" cho Fixer (`PromotionProgressBar`).
2. Lấy ngưỡng từ đúng hàm mà engine dùng để thăng chức (`getPromotionProgress` đọc trực tiếp từ `getNextFixerPromotion`, `checkColorFixerReadiness`, `getOtherCareerPromotion`, `getNextIndependentSyndicatePromotion`), không viết lại ngưỡng ở UI.

**Test.** `tests/test_batches_122_123.mjs` kiểm tra ngưỡng UI khớp 100% với ngưỡng engine cho mọi nghề có thăng chức (Fixer Grade 9->1, Color, Finger Syndicate, Wing Employee, Independent Syndicate).

---

## Đợt 123: lướt nhanh khi chơi lại (ĐÃ HOÀN THÀNH)

**Lý do.** Web mẫu có x1 đến x32, nhưng chép nguyên x32 sẽ nuốt mất chi tiết của game mình. Hướng học là tăng tốc rõ rệt cho phần đời thường khi chơi lại.

**Cách làm.**
1. Thêm một mức "Lướt" (khoảng 8x). Mức này chỉ hiện từ đời thứ hai trở đi (`pastLives.length >= 1` hoặc `char.generation > 1`), đọc từ lịch sử đời của Huyết thống, hoặc khi đã bật tự chọn (`autoPlay`).
2. Mức "Lướt" chỉ chạy trong `quietStretch` (`gameStore.js:906`). Gặp major, minor, mốc NPC hoặc thẻ chương thì tự về tốc độ người chơi đã chọn trước đó (`preSkimSpeed`).
3. Minor không bị rút ngắn thời gian chờ (`minorRemainingMs` trừ đúng `dtMs` thực tế, không nhân tốc độ lướt). Luật hẹn giờ giữ nguyên.

**Test.** `tests/test_batches_122_123.mjs`:
- Đời đầu khi chưa bật autoPlay không thấy nút "Lướt", đời thứ hai hoặc khi bật autoPlay thì thấy.
- Đang lướt mà gặp minor, major, mốc NPC hoặc thẻ chương thì tốc độ tự về lại mức cũ.
- Đồng hồ minor trừ đúng thời gian thực, không chạy nhanh hơn bình thường.

---

## Việc của chủ dự án: nghe thử âm thanh

Âm thanh của 7 cảnh (Đợt 110) chỉ mới được kiểm bằng test và Chrome, chưa ai nghe bằng tai. Nên nghe một lượt trên điện thoại có tai nghe, rồi trên loa máy tính. Danh sách cần nghe:
- Âm chọn lựa chọn bấm liên tiếp mười lần có gây mệt không.
- Âm nền có lấn chữ hoặc lấn khoảnh khắc quan trọng không, nhất là Great Lake và distortion.
- Lúc vào cảnh và lúc bỏ qua cảnh, âm có bị hụt hoặc to vọt không.
- Mỗi cảnh trong 7 cảnh có nhận ra được mà không cần nhìn không.

Công cụ quay đã có lệnh mở từng cảnh: `node tools/film/film_cutscene.mjs --scene=<tên>`. Ghi lại cảnh nào quá to, quá nhỏ hay khó chịu; mình sẽ chỉnh theo danh sách đó.

## Để sau buổi nghe thử

- **Âm báo ngắn khi đổi nơi.** Nền âm theo nơi đã có (`ambienceScapes.js:193`, riêng cho Nest, Backstreets, Wing và từng Finger), nhưng nền đổi dần nên người chơi khó nhận ra mình vừa đổi chỗ. Thêm một âm khoảng một giây lúc đổi nơi, dùng `cueTone` và `cueNoise` của Đợt 110. Chỉ làm khi buổi nghe thử cho thấy mức âm hiện tại đã ổn.
- **Cảnh thức tỉnh E.G.O.** E.G.O hiếm và lớn, nhưng hiện mới có thẻ chương. Nếu thêm một cảnh nữa thì đây là ứng viên đúng nhất, xếp hạng ngang Claw. Trước khi làm, đo xem bao nhiêu đời trong audit 500 đời có E.G.O.

---

## Những việc không làm, và lý do

- **Lớp canvas hạt chạy liên tục (mưa, tàn tro, bụi).** Tốn pin trên điện thoại và đi ngược luật "không lặp vô hạn" mà các cảnh đang giữ. Mood và skyline theo nơi chốn (Đợt 106) đã cho chiều sâu. Nếu sau này muốn thêm, chỉ làm một lớp tĩnh vẽ một lần cho Great Lake hoặc Backstreets.
- **Nấc tốc độ x4/x8 chung.** Thay bằng tự lướt năm yên ả (115b).
- **Nút "Tiếp tục" trên thẻ chương.** Xem 116, mục 4.
- **Làm mới cache PWA.** Không phải việc code. Người chơi kéo làm mới hoặc xóa dữ liệu trang để nhận bản mới.
- **Gộp hai nút tạm dừng.** Nút tạm dừng ở thẻ minor và nút Pause ở thanh trên cùng điều khiển một trạng thái (`speed === 0`; vòng `tick` ở `gameStore.js` dừng cả đồng hồ minor khi tốc độ bằng 0). Chúng không mâu thuẫn nhau. Nút trong thẻ nằm gần ngón cái và có phím Space, nên giữ cả hai.
- **Cảnh riêng cho thi trượt.** Thay bằng thẻ chương (118b).
- **Ba ngôn ngữ như web mẫu (Hàn, Anh, Nhật).** Đó là lựa chọn theo cộng đồng người chơi của họ. Giữ Việt và Anh.
- **Tốc độ x32 cho mọi người.** Thay bằng mức "Lướt" chỉ khi chơi lại (Đợt 123).
- **Gói toàn bộ JS vào một file như web mẫu (8,4 MB).** Bản mình chia chunk, tải đầu nhẹ hơn.
- **Viết thêm chuỗi hậu quả sau biến cố lớn.** Đã có các chuỗi `csq_` trong `narrativeArcEngine.js`. Nếu sau này muốn viết thêm, trước hết đo xem một đời thật gặp bao nhiêu chuỗi.

## Việc còn treo từ các đợt trước

- Âm thanh của 7 cảnh: xem mục nghe thử phía trên.
- Bốn lời cuối của C7 là chữ mình tự viết. Chủ dự án nên đọc lại.
- `tools/build_gameplay_bible.mjs` và `build_gameplay_deep_dive_v2.mjs` vẫn ghi ra `docs/THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.md` mỗi lần chạy. File đã bị xóa vì nội dung cũ; chạy lại công cụ sẽ sinh lại bản theo code hiện tại.
