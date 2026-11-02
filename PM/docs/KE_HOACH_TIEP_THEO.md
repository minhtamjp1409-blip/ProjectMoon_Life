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
| 117 | Đo và gọn dock hầm ngục trên điện thoại | vừa | đo trước, làm sau |
| 118 | Gọn thẻ minor, thẻ chương khi trượt kỳ thi, thử trình đọc màn hình | vừa | chưa làm |
| (chủ dự án) | Nghe thử âm thanh trên điện thoại và tai nghe | nhỏ | chờ chủ dự án |

Đợt 114b có thêm dải bản đồ thu nhỏ trên điện thoại, theo bản góp ý thứ ba (ngày 02/11/2026). Đợt 118 và buổi nghe thử âm thanh cũng đến từ bản góp ý đó.

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
- **Viết thêm chuỗi hậu quả sau biến cố lớn.** Đã có các chuỗi `csq_` trong `narrativeArcEngine.js`. Nếu sau này muốn viết thêm, trước hết đo xem một đời thật gặp bao nhiêu chuỗi.

## Việc còn treo từ các đợt trước

- Âm thanh của 7 cảnh: xem mục nghe thử phía trên.
- Bốn lời cuối của C7 là chữ mình tự viết. Chủ dự án nên đọc lại.
- `tools/build_gameplay_bible.mjs` và `build_gameplay_deep_dive_v2.mjs` vẫn ghi ra `docs/THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.md` mỗi lần chạy. File đã bị xóa vì nội dung cũ; chạy lại công cụ sẽ sinh lại bản theo code hiện tại.
