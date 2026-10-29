# Việc còn lại sau khi sửa preview chi phí nợ

> Cập nhật kiểm định 29/10/2026: Mục 1 (thay đổi cách vào route) được **để sau theo yêu cầu**. Mục 2 và 4 đã có bộ đo và kết quả 500 seed; xem [báo cáo nhịp game và phễu Color/E.G.O](./BAO_CAO_NHIP_GAME_500_SEED.md). Mục 3 đã có nút dùng lại kế hoạch bằng thao tác rõ ràng, preview trước khi xác nhận. Mục 5 đã kiểm thử trên trình duyệt thật ở 390px/1440px, VI/EN, các mức Ahn 2/3/5/15. Các đoạn “Hiện trạng” bên dưới được giữ như hồ sơ vấn đề ban đầu, không phải trạng thái hiện tại.

| Mục | Trạng thái 29/10 | Bằng chứng / việc tiếp theo |
| --- | --- | --- |
| 1. Điểm rẽ nghề nghiệp | Để sau | Không chỉnh điều kiện hay nội dung route trong đợt này. |
| 2. Mật độ nội dung | Đã đo | `tools/sim/branch_experience.mjs 500 --json=<đường dẫn>`; 500 seed ngẫu nhiên, nhóm theo route và dải tuổi. Wing có 84,3% năm không đổi bậc nghề/quan hệ theo thước đo hiện tại; việc viết thêm chuỗi hậu quả thuộc đợt route sau. |
| 3. Kế hoạch năm | Đã sửa và kiểm thử | `previousYearPoints`, `YearPlanDock`, `tests/test_annual_plan.mjs`, `tools/qa/remaining_tasks_browser.mjs`. Chỉ chế độ tự chơi đang bật mới tự chọn kế hoạch qua logic tự chơi cũ. |
| 4. Color/E.G.O | Đã đo | `tools/sim/balance_sim.mjs 500 random` và `500 focused`; báo cáo tách sẵn sàng, được mời, đạt mốc, chết trước/sau sẵn sàng, tuổi và Ahn khởi đầu. Chưa đổi ngưỡng cân bằng. |
| 5. Giao diện nợ Fixer | Đã kiểm thử | `tools/qa/remaining_tasks_browser.mjs`: 390px/1440px, VI/EN, thiếu/vừa đủ/dư Ahn, trạng thái khóa, focus bàn phím, tràn ngang, số phí trên nhãn. Test engine `tests/test_choice_cost_parity.mjs` đối chiếu tiền thực trừ. |

Cập nhật: 28/10/2026. Đây là danh sách để quyết định và sửa dần, không phải các lỗi đã được xác nhận bằng một lượt chơi thủ công.

## Đã xử lý trong đợt này

- `getChoiceAhnCost(choice, char)` tính phí từ số dư nợ đang hoạt động; trả hết dùng toàn bộ số dư, trả một phần dùng tối đa 3 Ahn. Lựa chọn có `costAhn` cố định vẫn giữ cách tính cũ.
- `choiceIsAvailable`, `resolveEventChoice`, preview tài nguyên và `EventDock` cùng dùng hàm đó. Khi thiếu tiền, nút báo đúng mức cần có; khi đủ tiền, nút hiện đúng số Ahn sẽ tốn.
- `tests/test_choice_cost_parity.mjs` đối chiếu preview, trạng thái khóa và số tiền bị trừ ở các mức nợ 10, 5, 2 Ahn; có trường hợp thiếu tiền, vừa đủ tiền và phí cố định. Test được nối vào `npm test`.

## 1. Điểm rẽ nghề nghiệp còn trao nghề ngay

**Hiện trạng:** `src/data/eventsChildhood.js`, sự kiện `ad_career_crossroad_18`, đặt `setJob` trực tiếp cho Fixer, Syndicate hoặc Wing Employee. Nhánh Fixer thiếu lệ phí vẫn luôn được cấp thẻ nhờ khoản vay; hai nhánh còn lại cũng nhận việc ngay. Cách này làm chọn nghề giống chọn tuyến truyện hơn một cơ hội trong life sim.

**Hướng sửa:** Giữ quyền chọn nơi nộp đơn hoặc tìm việc, nhưng cho kết quả phụ thuộc bối cảnh: nơi ở, tiền, quan hệ, hồ sơ, tuổi và rủi ro. Trượt tuyển dụng phải có kết quả chơi tiếp được như làm thuê thời vụ, gánh nợ hoặc một lời mời khác. Không biến thất bại thành nút chết hoặc buộc người chơi chờ nhiều năm mà không có việc.

**Kiểm tra cần thêm:** Nhiều seed cho mỗi xuất thân; có cả thành công và thất bại có thể tiếp tục; sự kiện về sau chỉ coi nhân vật là nhân viên Wing/Fixer/Syndicate khi đã thực sự được nhận. Kiểm tra đường Outskirts vào City riêng.

## 2. Mật độ nội dung trong một đời chơi

**Hiện trạng cần kiểm chứng bằng lượt chơi:** Kho sự kiện đã lớn, nhưng số sự kiện có ý nghĩa mà một nhân vật gặp phụ thuộc bộ chọn, điều kiện route và nhịp năm. Số lượng file hoặc sự kiện không đo được mức lặp mà người chơi cảm thấy.

**Hướng sửa:** Ghi telemetry cục bộ theo seed: số major/minor, số lần cùng một sự kiện, số năm không có biến chuyển quan hệ/nghề, số mạch truyện bỏ dở. Phân nhóm theo tuổi và route, rồi chỉnh trọng số hoặc điều kiện ở `src/engine/yearPlanner.js` và `src/engine/weaverAI.js` dựa trên khoảng trống thực tế. Ưu tiên sự kiện nối tiếp có hậu quả trước khi thêm nhiều sự kiện rời.

**Kiểm tra cần thêm:** Audit 500 seed theo từng route cùng vài lượt đọc thủ công; báo cáo phân vị thay vì chỉ trung bình. Không tăng tần suất sự kiện hiếm chỉ để làm đẹp số liệu.

## 3. Kế hoạch năm có thể thành thao tác lặp

**Hiện trạng:** `src/engine/annualPlan.js` lưu phân bổ điểm theo tuổi; `src/features/chronicle/components/YearPlanDock.jsx` cho người chơi quyết định. Chưa có tùy chọn dùng lại kế hoạch năm trước một cách rõ ràng.

**Hướng sửa:** Thêm nút "Dùng lại kế hoạch trước" bên cạnh chỉnh tay, hiện mọi chi phí và tác dụng trước khi xác nhận. Chỉ gợi ý, không tự áp dụng: năm có khủng hoảng hoặc thay đổi nghề vẫn cần người chơi cân nhắc.

**Kiểm tra cần thêm:** Năm đầu không có nút dùng lại; save cũ và năm mới không nhận nhầm `annualPlan.age`; bàn phím và điện thoại thao tác được.

## 4. Nút thắt Color Fixer và E.G.O cần đo cùng khả năng sống sót

**Hiện trạng:** Logic điều kiện nằm ở `src/engine/careerPipeline.js`, `src/engine/awakeningProgress.js`, `src/engine/weaverAI.js` và `src/engine/yearPlanner.js`. Mô phỏng trước đây cho thấy kết quả khác xa giữa bot chọn ngẫu nhiên và bot tập trung; con số đó không đại diện xác suất của người chơi thật.

**Hướng sửa:** Tách báo cáo thành tỷ lệ đạt điều kiện, tỷ lệ nhìn thấy cơ hội, tỷ lệ vượt thử thách, tuổi đạt mốc và tỷ lệ chết trước mốc. Đo riêng nhân vật có xuất thân thuận lợi và bất lợi. Chỉ thay ngưỡng hoặc trọng số sau khi thấy nút thắt nằm ở đâu; giữ Color hiếm, E.G.O không bắt buộc và vẫn có run may mắn đạt Color sớm.

**Kiểm tra cần thêm:** Cố định seed và chiến lược bot cho so sánh trước/sau; kiểm tra cùng một turn có thể đạt hai mốc mà không làm sai thứ tự sự kiện.

## 5. Kiểm tra giao diện bằng lượt chơi thật

**Hiện trạng:** Bản sửa chi phí nợ có test logic và build, nhưng chưa có kiểm tra bằng mắt trên trình duyệt thật ở trạng thái đủ/thiếu tiền, song ngữ và màn hình hẹp.

**Hướng sửa:** Chạy một save nợ Fixer trong `EventDock` ở 390px và desktop. Xác nhận nhãn trả đủ, trả một phần, thông báo thiếu Ahn và trạng thái disabled hiện rõ; kiểm tra focus bàn phím, tương phản và không tràn dòng. Có thể dùng bộ ảnh before/after trong taste-skill nếu sau này sửa cả bố cục.

**Tiêu chí hoàn thành:** Số trên nhãn, preview, thông báo khóa và số bị trừ sau chọn khớp ở cả tiếng Việt và tiếng Anh. Không hiện hai dòng phí trùng nhau.
