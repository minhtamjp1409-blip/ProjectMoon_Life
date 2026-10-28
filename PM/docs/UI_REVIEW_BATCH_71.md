# Review code và UI — Batch 71, 27/10/2026

## Phạm vi và kết quả

Đối chiếu HEAD `021e883` (Batch 70) với những lỗi đã nêu ở lần review trước. Sau đó sửa hai yêu cầu UI: đồng nhất màu giữa màn mở đầu và màn chơi; làm popup tách rõ khỏi bối cảnh. Các lỗi giao diện chặn việc mở popup được sửa trong cùng đợt.

Đã đọc skill taste-skill đúng đường dẫn plugin người dùng chỉ định, các hướng dẫn antislop UI/mobile/accessibility trong project và `DESIGN.md`. Giữ hệ React/Vite/Zustand/Ant Design và bối cảnh The City hiện có.

## Các thay đổi đã thực hiện

| Vấn đề | Nguyên nhân | Xử lý |
| --- | --- | --- |
| Màn mở đầu đỏ, Fixer vàng, Wing xanh, Ring đỏ | `MainLayout` ghi đè `--accent`, `--accent-ink` và các biến liên quan từ route; Ant Design còn có bảng màu đỏ riêng | Điều khiển dùng vàng `#d8b265`, chữ trên nút `#1b1408`; đồng bộ Ant Design. Bối cảnh và phù hiệu route vẫn có màu nhận diện riêng |
| Màn mở đầu vẫn có sắc đỏ lớn | Bầu trời, quầng sáng và mặt trăng có màu đỏ ghi riêng trong CSS | Đổi các phần này sang vàng nâu để hòa với màu điều khiển và màn Fixer |
| Popup lẫn vào cảnh | Các card sự kiện dùng nền alpha 0.94, dungeon chỉ 0.74 trên desktop | Dùng nền đặc `#252127`, viền `#746348`, lớp phủ `rgba(3,3,5,.76)`; áp dụng chung cho sự kiện, kế hoạch năm, dungeon, Settings, NPC, hồ sơ mobile và modal Ant Design |
| CSS popup Ant Design không áp dụng | CSS chỉ nhắm `.ant-modal-content`, trong khi Ant Design 6 render `.ant-modal-container` | Hỗ trợ DOM hiện tại và selector cũ; chuẩn hóa nền, viền trên và đổ bóng của modal |
| Settings bị cắt phía trên desktop | Popup fixed nằm trong thanh header có `backdrop-filter`, tạo containing block riêng | Render bằng React portal vào `document.body`; vị trí đo ở 1440×900 đổi từ y=-352.5 thành y=70 |
| Bấm Workshop gây lỗi | Nút gọi `setShopOpen` nhưng thiếu state và không render modal | Nối state và `WorkshopDepotModal`; kiểm tra cả nút desktop lẫn mục Workshop trong menu mobile |
| Gắn lại Workshop gây vòng lặp React | Selector Zustand trả object mới mỗi lần đọc | Dùng `useShallow`; xác nhận màn chơi và cửa hàng render được trên production build |
| Mở hồ sơ NPC bị lỗi | Component lấy `t` và `lang` từ game store, nơi không cung cấp hàm dịch đó | Dùng `useT`; đưa popup NPC ra portal để tránh bị cắt bởi sidebar |
| Thanh điều hướng mobile đè đáy hồ sơ | Drawer nằm trong stacking context của `.main`, thấp hơn bottom navigation | Render drawer qua portal; test `elementFromPoint` xác nhận drawer phủ được vùng đáy màn hình. Khi popup NPC mở, focus trap của drawer nhường xử lý cho popup con |

Các token dialog nằm trong `src/styles/ui/tokens.css`. Không tăng độ sáng của toàn bộ bối cảnh để làm nổi popup. Màu HP/SP, cảnh Wing/Finger/dungeon và sắc danh Color vẫn giữ ý nghĩa của chúng.

## Kiểm thử đã chạy

- `npm run build`: đạt trên bản cuối.
- `npm test`: đạt; bao gồm 48 file test được gọi trực tiếp trong script, các bước lint/parity và audit 500 **khoảnh khắc**. Không ghi nhầm đây là 500 cuộc đời.
- `node tests/test_audit_feedback_resolution.mjs`: đạt riêng. File này hiện **chưa có trong script `npm test`**.
- `git diff --check`: đạt; Git có thông báo chuyển LF/CRLF theo cấu hình máy, không có lỗi whitespace.
- `node tools/qa/theme_overlay_browser.mjs http://127.0.0.1:5197`: đạt trên production preview, ở 1440×900, 768×900 và 390×900, bật reduced motion.
- 44 trạng thái được chụp và đo: home, glossary, codex, bloodline, weaver, Fixer/Wing/Ring, Settings, Workshop, NPC, sự kiện Color, kế hoạch năm, dungeon WARP và drawer mobile/tablet.
- Không có tràn ngang cấp trang trong 44 trạng thái; các popup được kiểm tra nằm trong viewport, có nền đặc; không có exception JavaScript trong lượt browser cuối.
- Đã bấm mở/đóng Settings, Workshop, hồ sơ nhân vật và NPC. Mobile mở Workshop qua menu ba chấm theo UI thực tế.
- Độ tương phản token nút vàng/chữ tối: **9.11:1**. Chữ chính/nền dialog: **13.58:1**. Hai cặp này vượt WCAG AA; đây không phải tuyên bố mọi thành phần đều đã đạt WCAG.
- Đã xem ảnh từng popup quan trọng và contact sheet đủ ba kích thước. Các fixture phục vụ chụp UI, không phải số liệu cân bằng hoặc dữ liệu một cuộc đời thật.

Ảnh và số đo browser nằm ở `%TEMP%/pm-theme-overlay-qa/`, báo cáo JSON là `report.json`. Ảnh không đưa vào repository theo `DESIGN.md`.

## Taste-skill: kết quả đo và giới hạn

Đã chạy `lint.mjs` trên phần UI và `inspect.mjs` trên production build. Lượt inspector cuối ở `%TEMP%/pm-review-71/final-taste/`; đã xem cả 6 ảnh fold/page mà công cụ xuất.

Inspector thô còn **6 nhóm FAIL** trên màn mở đầu: eyebrow, numbering, gradient, shadow, hairline và few-pictures. Không tuyên bố taste-skill đạt 0 FAIL. Các điểm này cần đọc theo ngữ cảnh:

- Gradient bầu trời, đường nét thành phố và glass là hướng mỹ thuật đã có trong `DESIGN.md`; ảnh SVG là bối cảnh game, không phải trang bán hàng cần ảnh sản phẩm/video.
- Một phần numbering là số District thật trong bản đồ, không phải số thứ tự trang trí của trang marketing.
- Shadow của birth panel, câu phụ trên tiêu đề và độ dày đặc của hệ chữ vẫn là các điểm có thể gọn thêm ở một đợt chỉnh composition riêng.
- Lượt inspector cuối không còn báo broken image hoặc font fallback; các lượt đầu từng ghi nhận hai mục này. Vì thế không kết luận logo/font bị hỏng thường trực chỉ từ lượt đầu.
- App dùng vùng cuộn `.main-scroll`; ảnh page của inspector không thay thế việc kiểm tra vùng cuộn nội bộ. Đợt này tập trung các màn đầu trang và lớp phủ, không khẳng định đã kiểm tra mọi dòng trong toàn bộ danh mục/sự kiện.

```text
ROUND 1 — final production screenshots
Seen in one second: Một hồ sơ đời người trước thành phố ban đêm; vàng dẫn mắt tới nút bắt đầu.
Idea (one sentence): The City giữ màu riêng của thế giới, còn điều khiển và lớp quyết định dùng một ngôn ngữ vàng thống nhất.
Live thing: Chọn nơi sinh, mở hồ sơ mới, lập kế hoạch năm và ra quyết định theo trạng thái nhân vật.
Layout words by section: home=split/dial/form / play=dossier/chronicle / decision=centered-card / phone=status-strip/sheet.
Scores: design 6.5 · usability 7 · creativity 7 · content 7 → overall 6.0
Caps applied: Inspector thô còn FAIL nên điểm theo rubric taste-skill bị chặn ở 6.0; đây không phải điểm cân bằng gameplay.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. event-390.jpg, dungeon-390.jpg: nút “Xem phía sau” nằm trên phần cuối nội dung cuộn. Nên dành vị trí riêng bên ngoài vùng đọc/nhấn lựa chọn.
2. shop-390.jpg: hàng tab kéo ngang làm các mục phía sau khó thấy. Nên đổi sang select/menu trên điện thoại hoặc có dấu chỉ rõ còn mục bên phải.
3. year-plan-390.jpg: mỗi hoạt động gói nhiều điều kiện vào chữ nhỏ, đẩy phần xác nhận xuống sâu. Nên tóm tắt kết quả của cấu hình hiện tại và giữ hành động xác nhận dễ tìm.
```

## Code Batch 70: phần đã sửa đúng

- Ngưỡng trong `getEgoReadiness` đã chuyển sang 74 hoặc 62 kèm điều kiện sẹo/SP; kiểm tra tuổi 18; trường hợp 70 Resonance/60 SP đã trả `stirring`.
- Grade 2–3 đủ chuẩn thần đồng đã hiện ưu tiên khảo thí Color.
- Các sẹo mới của vòng Color đã có ánh xạ profile.
- Kế hoạch năm đã tăng hình phạt khi dồn điểm; hiện có đánh đổi rõ hơn về số, nhưng chưa đủ bằng chứng chơi thật để kết luận cấu hình tối ưu đã hết lặp.
- Bài test mới đã có chuỗi ba hồi Distortion. Lưu ý test còn gọi trực tiếp `advanceActiveNarrativeArcs` sau `resolveEventChoice`; nên có thêm trường hợp chỉ dùng luồng thao tác thật để tránh test tự giúp engine tiến mạch.

## Lỗi còn tái hiện được, chưa sửa gameplay trong đợt UI

### 1. Người tham gia khảo thí và người chịu hậu quả chưa cùng định danh

`matchesNeed` coi bất kỳ NPC active nào là `companionActive`, kể cả parent. Callback lại chỉ nhìn `char.npcs.partner`. Tái hiện với một mentor còn sống, không có partner: lựa chọn cộng sự được bật, nhưng năm sau nhận `csq_color_sponsor_aftermath_fallen`. Parent còn sống cũng cho cùng kết quả.

Ngoài ra, kết quả đỡ đòn hiện chỉ thêm flag trên nhân vật; NPC vẫn có `status: 'alive'`, không ghi trạng thái wounded. Việc thay partner trước callback cũng có thể khiến hậu quả áp vào người mới. Cần lưu ID/role của đúng người tham gia trong dữ liệu hậu quả, không suy lại từ vị trí `partner` ở năm sau.

### 2. Callback tưởng niệm chưa đóng thread gốc

Planner đổi event từ `csq_color_sponsor_aftermath` sang `csq_color_sponsor_aftermath_fallen`, nhưng `runPlanItem` gọi `closeThreads` bằng ID event thay thế. Tái hiện sau khi đọc và chọn xong tưởng niệm: vẫn còn **1 thread gốc chưa fulfilled**. Nó có thể tiếp tục làm năm sau bị coi là còn hậu quả đến hạn. Nên đóng bằng `item.thread`/ID thread gốc và bảo lưu event thay thế riêng cho phần hiển thị.

### 3. Một phần UI E.G.O vẫn dùng quy tắc cũ

`CharacterDossierCard.jsx` vẫn gắn `READY` từ Resonance 50 và tooltip vẫn nói 50–60 mở giao lộ, dù card readiness đã dùng 74/62. Đây là thông tin mâu thuẫn ngay trong hồ sơ.

Ngoài ra, một nhân vật đã gặp `ego_carmen_crossroad`, chưa có E.G.O và có Resonance 80 vẫn nhận `getEgoReadiness().status === 'imminent'`, trong khi `rollEgoEncounter()` trả false vì event đã được xem. Cần phân biệt cửa sổ cơ hội, E.G.O chưa hoàn chỉnh và giao lộ đã khép lại.

### 4. Test mới chưa nằm trong lệnh test mặc định

`tests/test_audit_feedback_resolution.mjs` chạy riêng đạt, nhưng không được `package.json` gọi trong `npm test`. Vì vậy câu “54/54 suites trong npm test” ở nhật ký cũ chưa được script chứng minh. Đợt này ghi rõ những lệnh đã chạy và không dùng số suite suy đoán.

## Lưu ý khi phát triển tiếp

- Khi nâng Ant Design, kiểm tra DOM thật của modal thay vì chỉ đọc tên class cũ.
- Khi thêm popup dưới thanh có blur/transform, ưu tiên portal để không bị containing block của thanh đó cắt popup.
- Selector Zustand trả object phải giữ kết quả ổn định, ví dụ `useShallow`.
- Không đưa lại màu route vào `--accent` của toàn shell; dùng dữ liệu scene hoặc token riêng cho nhận diện route.
- Test browser nằm trong `tools/qa/theme_overlay_browser.mjs`, nhận base URL và thư mục ảnh qua tham số. Test chạy được với production preview; không cần cài thư viện browser mới.
- Chưa deploy trong đợt này. Các thay đổi UI được kiểm tra trên build local.
