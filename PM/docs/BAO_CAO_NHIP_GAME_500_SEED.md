# Nhịp đời chơi và phễu Color / E.G.O — 500 seed

Cập nhật 29/10/2026. Các số dưới đây đo bot, không phải xác suất thắng của người chơi. Seed cố định (`branch_0…499`, `bal_fixed_0…499`) để so sánh sau khi sửa code. Không chỉnh route hoặc ngưỡng cân bằng trong đợt này.

## 1. Đời chơi theo route

Lệnh: `node tools/sim/branch_experience.mjs 500 --json=<đường dẫn file>`.

Route được ghi theo nghề ở **đầu mỗi năm**. Một đời có thể góp số liệu cho nhiều route. “Năm không tiến triển” nghĩa là nghề, bậc, trạng thái Color/E.G.O/Distortion và mức gắn bó NPC (theo nấc 20 điểm) không đổi; năm đó vẫn có thể có sự kiện và thay đổi tài nguyên. “Năm yên ắng” không có major, minor, hợp đồng hoặc dungeon.

| Route | Đời có đi qua | Năm đo | Major/10 năm | Minor/10 năm | Major/đời p10–trung vị–p90 | Major lặp | Năm yên ắng | Năm không tiến triển |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Fixer | 138 | 1290 | 8,2 | 17,1 | 0–5–19 | 217/1060 | 0,1% | 70,8% |
| Wing Employee | 141 | 1703 | 5,4 | 15,6 | 1–4–17 | 47/920 | 0% | 84,3% |
| Syndicate | 159 | 1260 | 8,3 | 16,3 | 1–5–14 | 22/1041 | 0,1% | 72,5% |
| Distortion | 22 | 501 | 6,3 | 17,3 | 4–7–41 | 53/315 | 0% | 93,8% |
| Outcast | 4 | 54 | 3,7 | 22,8 | 2–7–7 | 0/20 | 0% | 85,2% |

209 đời có ít nhất một năm đã 18 tuổi mà `job` vẫn là `Child` (375 năm). Đây là một tín hiệu cần kiểm tra cùng điểm rẽ nghề nghiệp khi mở lại việc route. Không suy ra độ mỏng của Outcast từ 4 đời.

Theo tuổi, Wing có 1053 năm ở 18–29, 437 năm ở 30–44, 158 năm ở 45–59 và 55 năm từ 60 trở lên. Fixer tương ứng 832/360/90/8; Syndicate 1060/195/5/0. Mẫu già của Wing nhiều hơn, nên so sánh số sự kiện *mỗi năm* cùng tuổi ở lần cân route kế tiếp; không chỉ nhìn số sự kiện mỗi đời.

**Đánh giá:** Nhịp hiện không thiếu moment theo nghĩa kỹ thuật: năm không có major/minor/contract/dungeon gần như bằng không. Điểm yếu đo được nằm ở **tiến triển có hậu quả**, đặc biệt Wing. Cần đọc thủ công các run Wing 30–44 và 45–59 trước khi điều chỉnh trọng số, rồi ưu tiên callback/hậu quả và tiến trình nghề. Không tăng tần suất sự kiện hiếm chỉ để hạ tỷ lệ năm “không tiến triển”. Thước đo quan hệ đang dùng nấc 20 điểm nên chưa bắt được thay đổi nhỏ; cần giữ giới hạn này khi đọc số.

## 2. Phễu Color / E.G.O

Lệnh: `node tools/sim/balance_sim.mjs 500 random --funnel-json=<đường dẫn file>` và tương tự với `focused`. Cùng 500 seed gốc, khác chính sách bot. `random` chọn ngẫu nhiên trong các lựa chọn hợp lệ; `focused` ưu tiên Fixer, khảo thí Color và E.G.O, rồi chọn theo hiệu ứng nhìn thấy. Bot focused không đại diện cho người chơi tối ưu.

“Sẵn sàng Color” là `checkColorFixerReadiness(char).ready`; “sẵn sàng E.G.O” là cửa sổ `hasEgoOpportunity(char)` trước khi thức tỉnh/Distortion. “Được mời” là thấy event thật trong `pendingEvent`, không phải chỉ đủ điều kiện ở code. “Đạt mốc sau khi được mời” có thể xảy ra ở lần thử tiếp theo, nên không gọi đó là tỷ lệ đỗ một bài thi. Người còn sống lúc chặn mô phỏng ở tuổi 120 là dữ liệu kiểm duyệt, không tính là chết.

| Chính sách | Mốc | Sẵn sàng | Thấy event | Đạt mốc | Chết trước sẵn sàng | Chết sau sẵn sàng nhưng chưa đạt | Tuổi đạt p10 / trung vị / p90 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| Random | Color | 1 | 1 | 1 | 499 | 0 | 65 / 65 / 65 |
| Random | E.G.O | 92 | 53 | 15 | 405 | 80 | 21 / 25 / 40 |
| Focused | Color | 42 | 36 | 33 | 458 | 9 | 42 / 53 / 57 |
| Focused | E.G.O | 157 | 89 | 66 | 343 | 90 | 22 / 34 / 47 |

Ở bot focused, 17/500 đời đạt cả Color và E.G.O, 0/500 đạt hai mốc trong cùng một năm và 0/500 trong cùng một hành động. Có Color sớm nhất ở tuổi 34; 4/33 Color xuất hiện trước tuổi 45. Color vẫn hiếm và vẫn có run sớm. Kết quả random chỉ có **một** Color, nên không dùng 100% “đạt sau khi thấy trial” của nhóm này để suy luận tỷ lệ đỗ thực.

Nhóm xuất thân chỉ chia theo Ahn khởi đầu: `<10` có 174 đời, `≥10` có 326 đời. Với bot focused, nhóm `<10` có 13 sẵn sàng/11 Color và 53 sẵn sàng/22 E.G.O; nhóm `≥10` có 29/22 Color và 104/44 E.G.O. Ahn ban đầu là chỉ báo thô, không đại diện đầy đủ cho Nest, Backstreets hay Outskirts; không diễn giải khác biệt này là tác động nhân quả của tiền.

**Nút thắt trước mắt:** tỷ lệ sống tới điều kiện mới là rào cản lớn nhất với Color; với E.G.O, 157 đời mở cửa sổ nhưng chỉ 89 đời thấy event, sau đó 66 đời đạt mốc. Trước khi tăng cộng hưởng hay giảm yêu cầu, cần đọc những seed đã sẵn sàng nhưng chết hoặc hết cửa sổ chưa thấy event. Giữ E.G.O tự nguyện, không ép thành Distortion. Chưa đổi balance vì một thay đổi ngưỡng sẽ làm lệch so sánh route và độ khó.

## 3. Kiểm thử UI và kế hoạch năm

`node tools/qa/remaining_tasks_browser.mjs` chạy Chromium thật tại 390px và 1440px. Đã kiểm tra VI/EN, 2/3/5/15 Ahn, trả hết 10 Ahn và trả một phần 3 Ahn: trạng thái khóa/nhãn đúng, không tràn ngang, Tab đến lựa chọn kế tiếp có focus ring. Ảnh và `report.json` nằm trong thư mục tạm `pm-remaining-tasks-qa`. Bộ kiểm thử logic `tests/test_choice_cost_parity.mjs` xác nhận preview/điều kiện/số tiền engine trừ khớp cả ở các số dư nợ khác. Ở nút dùng lại kế hoạch, bản nháp đổi từ 1–1–0–1–0 sang 0–0–0–3–0, preview hiện `SP +9`, `pendingYearPlan` vẫn còn cho đến khi xác nhận; năm đầu không có nút dùng lại.

`npm test` (gồm audit 500 khoảnh khắc) và `npm run build` đạt. Bộ kiểm thử UI dùng trạng thái nhân vật được đưa thẳng vào store, không mô phỏng toàn bộ hành trình nhập nghề qua giao diện. Cần một lượt chơi thủ công để kiểm tra nhịp đọc, nhất là năm Wing kéo dài và đoạn cuộn kế hoạch năm trên điện thoại.

## 4. Việc hoãn cùng route

- Điểm rẽ nghề nghiệp tuổi 18 và `job=Child` sau tuổi 18.
- Callback Wing theo mốc tuổi và cấp bậc; kiểm tra vì sao năm có sự kiện nhưng 84,3% năm không đổi nghề/quan hệ theo thước đo này.
- Cân lại sự khác biệt tuổi sống giữa route trước khi đụng trọng số event hoặc E.G.O/Color.
- Khi sửa, chạy lại đúng các lệnh 500 seed trên và so phân vị/tuổi/mức chết; đọc run cụ thể để xác minh cảm giác chơi.
