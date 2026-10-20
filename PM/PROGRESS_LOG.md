# The City Chronicles: tiến trình dự án

Cập nhật: 20/10/2026, đợt 3 (xem [mục 8](#8-nhật-ký-thay-đổi))

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

Thanh bên trái hiện `Online` khi frontend gọi được backend, `Offline` khi không. Vite mặc định chạy cổng 5173; nếu cổng đó đang bận, Vite tự chuyển sang cổng kế tiếp và in địa chỉ trong terminal.

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
- **Sự kiện lớn** được rút có trọng số trong 10 ứng viên tốt nhất (trước đây là 3, nên các kiếp hay giống nhau).
- **Kho nội dung**: 120 dòng thường ngày, 89 sự kiện nhỏ, 34 loại ký ức mà lựa chọn có thể để lại.
- **Mô phỏng 200 kiếp** (không giao diện): 0 lỗi, 200/200 đoạn mở đầu khác nhau, cả 89 sự kiện nhỏ đều được chạm tới ít nhất một lần, khoảng 21 đến 27% số kiếp gặp chuyện 3:13 trước 11 tuổi.

### 2.3. AI director (`src/engine/director.js`)

- **Ghi nhớ**: lựa chọn để lại khóa ký ức trong `char.memory`. Có 34 loại ký ức; sự kiện có `need.mem` chỉ xảy ra với người từng làm điều đó (ví dụ đốt một Prescript lúc nhỏ thì nhiều năm sau The Index tìm đến).
- **Hậu quả hẹn giờ**: `later` trên một lựa chọn hẹn một sự kiện cụ thể sau N năm; nó hiện trong Hàng đợi nhân quả ở trang Khung cửi.
- **Nhịp**: sau giai đoạn căng thì ưu tiên chuyện lắng, sau giai đoạn yên thì ưu tiên hiểm họa.
- **Chủ đề nghỉ**: cùng một loại chuyện (3:13, The Index, The Ring...) nghỉ 4 năm trước khi quay lại.
- **NPC lên sân khấu**: người lâu không gặp được ưu tiên quay lại câu chuyện; gắn bó giảm dần nếu 3 năm không gặp.
- **Bản chất nhân vật**: bạo lực, nhân từ, tham lam, trung thành được đếm, và kéo theo loại chuyện tương ứng.
- **Theo hoàn cảnh**: chuyện riêng của District được ưu tiên ×2,6; sau khi biến dạng thành Distortion, chuyện của Distortion được ưu tiên ×6 để kiếp đó không trôi về chuyện thường ngày.
- Mỗi lựa chọn của director được ghi vào Bản ghi chỉ lệnh kèm lý do bằng lời.

### 2.4. Người trong đời bạn

Bạn thuở nhỏ (tạo lúc sinh), người thầy, đối thủ, người thương, bạn đời, cộng sự, con. Mỗi người có tên, nét tính cách, độ gắn bó, và trạng thái (sống, chết, mất tích, đã rời bỏ bạn). Họ hiện trong hồ sơ nhân vật. Người thương có thể trở thành bạn đời; khi sự kiện cưới diễn ra, chính người đó là người bạn cưới.

### 2.5. Hiển thị thay đổi

- Chip ± dưới mỗi dòng truyện (chỉ số, gắn bó, người mới, người mất, vết sẹo, hậu quả được gieo), bật lên lần lượt.
- Mỗi lựa chọn hiện trước tác động: thay đổi cố định, hoặc khoảng giá trị và tỉ lệ nếu là may rủi.
- Thanh chỉ số trong hồ sơ nhấp sáng và nổi số khi thay đổi.
- Hiệu ứng toàn sân khấu cho cái chết, E.G.O, Distortion, mất người thân, bước ngoặt, hiểm họa, tiếng vọng nhân quả. Tất cả tôn trọng `prefers-reduced-motion`.

### 2.6. Lưu và chơi tiếp

- Tự lưu sau mỗi thay đổi (gộp trong 1,2 giây), khi đóng tab, và khi bấm Lưu.
- Nút Về trang chủ giữ tiến trình; trang chủ hiện thẻ "Kiếp đang dở" với nút Chơi tiếp.
- Bắt đầu kiếp mới khi đang chơi thì phải xác nhận.
- Tiến trình lưu ở `localStorage` và ở backend (`/api/state/main`) nếu backend đang chạy.

### 2.7. District và tuyến có chuyện riêng

Đủ 26 District cùng The Outskirts. Chi tiết từng nơi ở `UNIVERSE.md`, mục 1.1. Ba District thêm ở đợt 3:

| District | Nguồn | Có gì |
| --- | --- | --- |
| 5 · E Corp | phóng tác (lore chưa có) | trời sáng 24 giờ, bóng tối thuê theo giờ; 5 dòng thường ngày, 3 sự kiện nhỏ (nhà trọ cách sáng, mười một phút mất điện, đêm đóng chai) |
| 15 · O Corp | phóng tác (lore chưa có) | hợp đồng tự thi hành lên người ký; 5 dòng thường ngày, 3 sự kiện nhỏ, trong đó chuỗi bảo lãnh nợ cho người bạn đến hạn sau 3 năm |
| 26 · Z Corp | canon: có tồn tại, không có trên bản đồ | chỉ số hiện "?", không có Singularity; 4 dòng thường ngày, 3 sự kiện nhỏ (làm giấy tờ, về quê không tìm ra đường, những người mặc đồng phục không phù hiệu) |

E và O mang nhãn "Phóng tác", Z mang nhãn "Không có trên bản đồ" (`src/components/RegionMark.jsx`), ở bản đồ chọn nơi sinh và trong Từ điển.

**Sau Distortion**: khi buông theo Carmen, mỗi năm Heat +6 (Hana giữ hồ sơ mở) và Network −2. Có 5 dòng thường ngày và 5 sự kiện riêng: người bạn tìm đến, hai Fixer nhận request về bạn, căn nhà cũ, cơn đói, giọng nói quay lại. Phục kích khi Heat cao là một đội Fixer của Hana; chết vì vết thương thì được ghi là bị xử lý như một Distortion (`woundDeath` trong `gameEngine.js`). Trong mô phỏng, kiếp biến dạng ở tuổi 20 sống thêm trung vị 12 năm.

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
