# Kế hoạch tiếp theo

Kế hoạch cutscene đã xong (C1 đến C8, Đợt 101 đến 111 trong `PROGRESS_LOG.md`). File này thay cho các kế hoạch và báo cáo cũ. Nó gom những việc còn lại từ hai bản góp ý gần nhất, sau khi đã đối chiếu với code ở commit `6c8b2f7`.

Luật chơi đang chạy nằm ở `docs/LUAT_HIEN_HANH.md`, lore và giọng văn ở `UNIVERSE.md`, lịch sử thay đổi ở `PROGRESS_LOG.md`.

Mỗi đợt dưới đây được commit riêng, ghi vào `PROGRESS_LOG.md`, push lên `main`, rồi kiểm tra bundle Vercel và Render health.

## Tóm tắt

| Đợt | Việc | Cỡ | Trạng thái |
|---|---|---|---|
| 113 | Sửa di cảo mất mốc cuối đời | nhỏ | chưa làm |
| 113 | Sửa lý do khóa báo sai Bond | nhỏ | chưa làm |
| 114 | Bỏ chi phí hiện hai lần trên lựa chọn | nhỏ | chưa làm |
| 114 | Nói rõ luật thời gian ở màn khai sinh | nhỏ | chưa làm |
| 115 | Gộp daily của năm yên ả | lớn | chưa làm |
| 115 | Tự lướt năm yên ả | vừa | chưa làm |
| 116 | Thẻ chương khi mất một NPC thân thiết | vừa | chưa làm |
| 117 | Đo và gọn dock hầm ngục trên điện thoại | vừa | đo trước, làm sau |

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

Có bản tiếng Anh tương ứng. Trên điện thoại, bản đồ District nằm dưới phần khai sinh. Thêm một dòng nối tới bản đồ ("Chọn District trên bản đồ bên dưới"), chỉ hiện ở màn hẹp.

**Kiểm tra.** Quay ảnh ở 1440x900 và 390x844: nút bắt đầu và hai câu vẫn nằm trong màn đầu, không tràn ngang. Chạy voice lint.

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

## Những việc không làm, và lý do

- **Lớp canvas hạt chạy liên tục (mưa, tàn tro, bụi).** Tốn pin trên điện thoại và đi ngược luật "không lặp vô hạn" mà các cảnh đang giữ. Mood và skyline theo nơi chốn (Đợt 106) đã cho chiều sâu. Nếu sau này muốn thêm, chỉ làm một lớp tĩnh vẽ một lần cho Great Lake hoặc Backstreets.
- **Nấc tốc độ x4/x8 chung.** Thay bằng tự lướt năm yên ả (115b).
- **Nút "Tiếp tục" trên thẻ chương.** Xem 116, mục 4.
- **Làm mới cache PWA.** Không phải việc code. Người chơi kéo làm mới hoặc xóa dữ liệu trang để nhận bản mới.

## Việc còn treo từ các đợt trước

- Âm thanh của 7 cảnh (Đợt 110) chưa ai nghe bằng tai. Cần chủ dự án nghe một lượt để chỉnh âm lượng và chất âm.
- Bốn lời cuối của C7 là chữ mình tự viết. Chủ dự án nên đọc lại.
- `tools/build_gameplay_bible.mjs` và `build_gameplay_deep_dive_v2.mjs` vẫn ghi ra `docs/THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.md` mỗi lần chạy. File đã bị xóa vì nội dung cũ; chạy lại công cụ sẽ sinh lại bản theo code hiện tại.
