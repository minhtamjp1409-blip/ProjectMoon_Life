# Kế hoạch: chuyển cảnh và cutscene cho The City Chronicles

Tài liệu này gộp hai bản đánh giá sau khi chơi thử một run trên game tham chiếu (fan game không chính thức "Born as an Individual in the City" của @_ryo_man):

- **[R1]** bản đánh giá của chủ dự án (các ảnh chụp "6 bí quyết" và "lộ trình 3 bước").
- **[R2]** bản của Claude: bốn đời chơi thử, bộ filmstrip dựng lại cảnh Claw và Arbiter bằng CSS gốc của họ, và một filmstrip cảnh Claw của chính mình trên bản deploy.

Mọi nhận định về code của mình đã được đối chiếu với repo ở commit 260d603 (mục 2). Tài liệu chưa sửa dòng code nào.

Giấy phép: game tham chiếu là tác phẩm của người khác. Mình học nguyên tắc dàn dựng (nhịp, thứ tự, cách dùng khoảng lặng), không chép mã, CSS, SVG, câu chữ hay tên cảnh của họ. Toàn bộ lời thoại, hình và thông số thời gian trong kế hoạch này là của mình.

---

## 1. Kết luận ngắn

1. Khoảng cách không nằm ở số lượng hiệu ứng (mình có 81 keyframe, họ 121). Nó nằm ở **dàn dựng**: họ cho một khoảnh khắc lớn một nhịp riêng, không chữ, không nút, rồi mới đưa giao diện ra. Mình mở thẻ quyết định dày đặc ngay trong chưa tới một giây.
2. Mình đã có nền tốt: `WorldBackdrop` (bầu trời, thời tiết, đường chân trời theo "thế giới"), `DungeonBackdrop` (cảnh hầm ngục), `StageFx` (nháy màu), pha mở đầu `isPrologueActive`, `postChoicePauseMs`, nút "Xem phía sau". Thiếu là **một đạo diễn** quyết định khi nào khoảnh khắc nào được giữ lại, kéo dài bao lâu, và khi nào giao diện được xuất hiện.
3. Kế hoạch gồm ba tầng, làm theo thứ tự, mỗi tầng đều ship và deploy được riêng:
   - **Tầng A, Cutscene Director:** cổng chờ và các cảnh có timeline (Claw, cái chết, Carmen, Color, cổng hầm ngục).
   - **Tầng B, không khí tại chỗ:** nền thế giới lộ ra qua cột nhật ký, thẻ chương chèn vào dòng nhật ký, giao diện mờ đi khi biến cố lớn.
   - **Tầng C, hoàn thiện thẻ quyết định:** nhãn thời gian dừng, mờ giao diện khi xem phía sau, cuối đời hai bước.
4. Giữ nguyên các thế mạnh mà game tham chiếu không có: gia phả và di vật, NPC chủ động, weaver, tâm lý kiểu Disco Elysium, nhật ký phân tầng, hồ sơ nhân vật chi tiết.

---

## 2. Hiện trạng đã kiểm chứng và đối chiếu với hai bản đánh giá

| # | Nhận định | Nguồn | Kết quả kiểm chứng trong repo |
|---|---|---|---|
| 1 | Lớp `.stage-fx` chỉ là một lớp nháy màu cộng một chữ, chạy cùng lúc với bảng sự kiện kế tiếp | R1 | **Đúng.** `StageFx` (`LiveStageFeed.jsx:180`) hiện `<div class="stage-fx fx-{kind}">` kèm một từ; `world-scenes.css:55` đặt `animation: fx-fade 2.2s`. Kiểu hiệu ứng chọn ở `gameStore.js:149` (`stageFxFor`: gold, death, ego, distort, loss, blood, echo). Không có gì giữ dock lại chờ hiệu ứng xong |
| 2 | Khi Taboo chạm 3 thẻ hầm ngục mở ngay | R2 | **Đúng.** `enforceTabooJudgment` (`gameStore.js:162`) tạo thẳng `pendingDungeon`. Filmstrip cho thấy thẻ "Án của The Head" đầy đủ sau dưới 1 giây, nền cũ vẫn hiện |
| 3 | Mình có sẵn đồ họa SVG/CSS cho hầm ngục | R1 | **Đúng.** `DungeonBackdrop.jsx` (374 dòng), `dungeon-scenes.css`, `dungeon-fx.css`. Cảnh `dgs-claw` là vòng lặp nền (`clawCut` 9 giây `infinite`), không phải một cú cắt có đầu có cuối |
| 4 | Cột `.log-col` che mất hậu cảnh 85% thời gian | R1 | **Đúng một phần.** `.log-col` có nền đặc `var(--page)`, rộng tối đa 740px, căn giữa (`chronicle.css:14`); hậu cảnh chỉ thấy ở hai bên. Nhưng `WorldBackdrop` thay đổi theo nghề (khoảng 20 khóa `world`, không phải 26), chưa theo nơi chốn. Đây chính là mục B còn dở |
| 5 | Thiếu nút "Ẩn tạm hộp thoại" (Peek) | R1 | **Sai, đã có.** `event-peek-toggle`, nhãn "Xem phía sau" (`LiveStageFeed.jsx:1470`), phím Esc thoát chế độ xem. Còn thiếu: lúc xem phía sau dock chỉ ẩn, chưa mờ giao diện để nhường chỗ cho nền |
| 6 | Thiếu nhãn "Thời gian dừng" | R1 | **Đúng một phần.** Dock đã có `dock-kicker` (biểu tượng Hourglass). Thiếu nhãn nói rõ thời gian đang dừng và phân biệt sự kiện lớn với nhỏ |
| 7 | Phím số 1 đến 9, 0 cho "để nó trôi qua" | R2 | **Đã có** (`LiveStageFeed.jsx:1186` đến `1249`) |
| 8 | Thiếu thẻ chương chèn vào dòng nhật ký | R1, R2 | **Đúng.** Có khung `is-major` cho `promo/miracle/turn`, nhưng không có thẻ chuyển chương ở mốc đổi đời. Cờ `turning: true` (mình thêm ở 7f83cd9 và 5084b62) là điểm móc sẵn |
| 9 | Cần phân tích thang nhịp: minor không chặn, major dừng hẳn | R1 | **Đúng và mình đã có nửa đầu.** Minor có cửa sổ đếm ngược (`MINOR_WINDOW_MS`); major chưa có tín hiệu "thời gian dừng" riêng |
| 10 | Có pha mở đầu (birth) | mới phát hiện | Mình đã có `CityLoadingOverlay` và `isPrologueActive` với `revealNextBirthLog`. Đây là chỗ sẵn để gắn cảnh mở đầu có timeline |
| 11 | Thẻ cuối đời: họ dùng hai bước (thẻ ngắn, rồi "Look back") | R2 | Mình chỉ có một trang di cảo dày, dài và dễ ngợp. Tách hai bước là cải thiện thật |

Hai nhận định mình điều chỉnh: bỏ mục Peek khỏi danh sách việc mới (chỉ nâng cấp), và không dùng con số "26 thế giới" khi lập kế hoạch.

---

## 3. Ràng buộc thiết kế (rút từ các skill dự án: design-taste-frontend, impeccable, hallmark, antislop)

Áp cho mọi cảnh mới:

**Chuyển động**
- Chỉ animate `transform` và `opacity`. Không `transition: all`. Không animate `width/height/top/left`. Bộ lọc `blur` và `grayscale` không animate liên tục; đổi giá trị theo bậc, chuyển bằng `opacity` của một lớp phủ.
- Mỗi cảnh có `prefers-reduced-motion` và một bản "Rút gọn" trong Cài đặt. Nội dung (chữ) luôn đọc được khi tắt script.
- Không nháy quá 3 lần mỗi giây, cường độ chớp tối đa 0,6 độ mờ, tránh chớp trắng toàn màn hình (WCAG 2.3.1). Khác với tham chiếu, mình dùng chớp màu ngắn (khoảng 120 ms) thay cho chớp trắng.
- Giữ ngân sách: tối đa 40 phần tử động đồng thời trên điện thoại, `will-change` chỉ bật trong lúc chạy.

**Giao diện**
- Màu và chữ qua token ở `:root`. Không màu cứng rải rác.
- Vùng bấm tối thiểu 44px trên màn cảm ứng; nút "Bỏ qua" luôn thấy, có `:focus-visible`.
- Nhãn nhỏ viết thường, không giãn chữ, không in hoa. Tên cảnh và tên địa danh lớn trên thẻ chương là chữ trình bày (display), không phải nhãn, nhưng vẫn giữ hoa thường tự nhiên và giãn chữ vừa phải.
- Không thẻ lồng thẻ. Thẻ chương trong nhật ký là chữ và đường kẻ, không hộp.
- Mỗi màn hình tối đa khoảng 80 từ. Mỗi cảnh một ý tưởng hình ảnh.

**Lời thoại** (chạy `voice_lint` và `lint_story` như event thường)
- Không dấu gạch dài, không dấu chấm than ngoài lời thoại trực tiếp, không con số chỉ số trong lời kể.
- Giữ nguyên thuật ngữ Project Moon: Claw, Arbiter, Taboo Gaze, E.G.O, Color, Hana, Fixer.
- Câu cụ thể, nhìn thấy được, không sáo ngữ ("định mệnh", "bóng tối bao trùm"...).

**Chế độ thiết kế:** cảnh là chế độ trải nghiệm (artifact dẫn dắt); giao diện quanh nó là chế độ vận hành (rõ, quen thuộc). Cảnh không bao giờ che một quyết định đang chờ.

---

## 4. Kiến trúc đề xuất: Cutscene Director

### 4.1 Nguyên tắc
- **Engine chỉ yêu cầu, giao diện quyết định.** Hàm thuần `cutsceneFor(prev, next)` (trong `src/engine/cutsceneTriggers.js`, kiểm thử bằng Node) trả về mã cảnh hoặc `null`, giống `stageFxFor`. Engine không biết gì về thời lượng hay hình.
- **Timeline nằm trong CSS, không trong `setTimeout`.** Mỗi cảnh là một cây DOM nhỏ có biến `--T` (tổng thời lượng) và `animation-delay` theo pha. JS chỉ làm ba việc: gắn cảnh, giữ cổng, gỡ cảnh khi hết giờ hoặc bị bỏ qua.
- **Cổng chờ (gate):** khi có cảnh đang chạy, `hasDock` bị giữ lại, đồng hồ năm tạm dừng, auto-choose chờ. Hết cảnh, dock xuất hiện trong khoảng 300 ms.
- **Một nguồn sự thật duy nhất:** "đang chiếu" nghĩa là `cutscene != null`. Không thêm cờ `isPaused` riêng, vì hai cờ cùng nói một chuyện sẽ có lúc lệch nhau. Mọi chỗ cần dừng đều đọc `cutscene` (chi tiết ở 4.6).

### 4.2 Trạng thái trong store
```
cutscene: null | { id, key, startedAt, durationMs, mode: 'full' | 'lite', skippable: true }
playCutscene(id, payload)   // đặt cutscene, tạm dừng thời gian
endCutscene(reason)         // 'done' | 'skip' | 'reduced'
```
- Không lưu `cutscene` vào save. Nạp save đang ở giữa hầm ngục thì không phát lại.
- `commit()` gọi `cutsceneFor(prev, next)` sau `stageFxFor`; nếu có cảnh thì `stageFx` bị bỏ qua cho cùng sự kiện (tránh hai lớp chồng nhau).

### 4.3 Hai chế độ để không làm phiền người chơi lặp lại
- **Lần đầu mỗi cảnh trong trình duyệt này:** `full`. Ghi `pm-cutscene-seen:{id}` vào `localStorage` (bọc try/catch).
- **Các lần sau:** `lite` (tối đa khoảng 900 ms, giữ nhịp thay vì cắt hẳn), trừ khi người chơi chọn "Đầy đủ" trong Cài đặt.
- **Tốc độ x3 hoặc auto-choose bật:** luôn `lite`.
- **Cài đặt mới `pm-cutscene`:** Đầy đủ / Rút gọn (mặc định) / Tắt. "Tắt" vẫn hiện một dòng chú thích 1,2 giây để người đọc không mất thông tin.
- **Bỏ qua:** chạm vào cảnh, Space, Enter, Esc; nút "Bỏ qua" 44px ở góc.

### 4.4 Cấu trúc file
```
src/engine/cutsceneTriggers.js         hàm thuần cutsceneFor(prev, next), có test
src/features/cutscene/registry.js      bảng: id, thời lượng, mốc, dòng chữ, bản lite
src/features/cutscene/CutsceneLayer.jsx  lazy chunk; gắn trong MainLayout
src/features/cutscene/scenes/*.jsx     mỗi cảnh một file SVG/CSS thuần
src/styles/ui/cutscene.css             keyframes tiền tố cs-, token màu
tests/test_cutscene_triggers.mjs
tools/lint/check_cutscenes.mjs         mỗi cảnh có: thời lượng, bản lite, bản giảm chuyển động, dòng chữ qua voice_lint
tools/film/film_cutscene.mjs           quay filmstrip qua CDP (dùng tay, ngoài npm test)
```
`CutsceneLayer` nạp bằng `import()` động: 0 byte hình ảnh, không tăng bundle tải đầu.

### 4.5 Âm thanh
Thêm các cue vào `audioEngine` (đã có `playDanger`, `playEgo`...): `cueClawCut`, `cueHeartbeat`, `cueColor`. Không tự phát khi đang tắt tiếng. Đã chốt: làm sau tầng A, không chặn đợt 1 đến 3.

### 4.6 Góc khuất kỹ thuật (bổ sung sau bản rà soát ngày 31/10/2026, đã đối chiếu code)

Bản rà soát nêu ba góc khuất, cả ba đều đúng hướng. Khi đối chiếu code, có ba chỗ phải sửa lại:
- Hàm `tickYearStep` không tồn tại.
- `runDueItems` nằm trong `yearPlanner.js`, không nằm trong store.
- Nếu gọi `stopPropagation()` bên trong một listener gắn ở pha bubble trên `window`, nó không chặn được listener khác cũng gắn trên `window`.

Phần dưới ghi lại điểm móc thật và cách làm đã chỉnh. Mình cũng thêm hai góc bản rà soát chưa nhắc tới (E4, E5).

#### E1. Đóng băng đồng hồ năm khi cảnh đang chiếu

Thời gian trôi tiếp qua bốn đường, cả bốn đều phải chặn:

| Đường | Vị trí | Hiện chặn bằng |
|---|---|---|
| Đồng hồ năm `setInterval` gọi `tick(dt)` | `MainLayout.jsx` dòng 44 đến 74 | `!inRun \|\| !alive \|\| speed === 0 \|\| pendingModal` |
| Auto-choose: `setTimeout` gọi `selectEventChoice(0)` sau 4000/6000/9000 ms (x3/x2/x1), tự đóng kết quả sau 3000/4500/7000 ms | cùng effect, dòng 47 đến 64 | như trên |
| `tick(dtMs)` gọi `runDueItems` | `gameStore.js` dòng 736 (guard dòng 753), 786 | các `pending*` |
| `stepYear` (nút bước) và `skipQuietTime` (vòng 5 bước) | `gameStore.js` dòng 812 đến 815 và 856 đến 860 | các `pending*`, `activeResolution` |

Cách làm:
1. Trong `MainLayout`, thêm `cutscene` vào điều kiện return sớm **và** vào mảng phụ thuộc của effect. Đây là chỗ quan trọng nhất. Bộ đếm auto-choose bắt đầu chạy ngay khi `pendingEvent` xuất hiện. Nếu chỉ ẩn dock mà không dừng effect, ở tốc độ x3 thì 4000 ms trừ đi 3600 ms của cảnh Claw chỉ còn 400 ms, nên auto-choose sẽ chọn phương án 1 gần như ngay khi dock vừa trượt lên. Khi `cutscene` có trong mảng phụ thuộc, effect dọn bộ đếm cũ lúc cảnh bắt đầu và đặt lại bộ đếm đủ thời gian khi cảnh kết thúc.
2. Thêm `if (s.cutscene) return;` ở đầu `tick`, `stepYear`, và điều kiện `break` trong `skipQuietTime`. Lớp này để phòng hờ, chặn được cả khi người chơi bấm nút bước hoặc gọi từ công cụ thử.
3. `setSpeed` và nút tạm dừng vẫn hoạt động trong lúc cảnh chạy (chỉ đổi giá trị lưu), không tự kết thúc cảnh.

#### E2. Cách ly phím bỏ qua

Hiện trạng: `LiveStageFeed.jsx` dòng 1187 đến 1297 gắn một listener `keydown` trên `window` ở pha bubble. Space và Enter đang dùng để bỏ qua khoảng nghỉ đọc (`postChoicePauseMs`) và đóng kết quả; phím 1 đến 9 chọn phương án; Esc thoát "Xem phía sau".

Cách làm:
1. `CutsceneLayer` gắn listener với `window.addEventListener('keydown', onSkip, { capture: true })`. Với các phím Space, Enter, Esc, listener gọi `e.preventDefault()` rồi `e.stopPropagation()`. Ở pha capture trên `window`, `stopPropagation()` chặn được sự kiện đi tới mọi listener ở pha bubble, kể cả listener của `LiveStageFeed`. Gỡ listener khi cảnh kết thúc.
2. Lớp chặn thứ hai: thêm `if (useGameStore.getState().cutscene) return;` vào đầu `onKeyDown` của `LiveStageFeed`, ngay cạnh dòng `if (char.pendingModal) return;`. Như vậy dù thứ tự gắn listener có đổi sau này, phím vẫn không lọt qua.
3. Bỏ qua phím giữ (`e.repeat`). Nếu không, người chơi giữ Space quá đà sẽ vừa bỏ qua cảnh vừa bỏ qua khoảng nghỉ đọc sau đó.
4. **Khoảng chặn nhập 250 ms sau khi dock hiện:** trong khoảng này dock bỏ qua phím 1 đến 9 và Enter, và có `pointer-events: none`. Lý do: sau cảnh, tiêu điểm được trả về dock; nếu tiêu điểm rơi vào một nút phương án, một cú Enter nhấn vội sẽ kích hoạt nút đó theo cách trình duyệt xử lý sẵn.
5. Chạm để bỏ qua dùng sự kiện `click`, không dùng `pointerdown`. Dùng `pointerdown` thì lớp cảnh biến mất giữa chừng, và phần `click` còn lại của cùng cú chạm sẽ rơi xuống nút phương án nằm bên dưới.

#### E3. Cái chết hai bước (C2) và chuỗi thế hệ

Đối chiếu code: dữ liệu kế thừa **không** phụ thuộc màn hình chết. Trong `gameStore.js` dòng 610 đến 624, ngay lúc `commit` thấy nhân vật chết, store đã:
- gọi `buildLifeSummaryAndLegacy`,
- ghi `pastLives` và `pendingLegacy`,
- gửi `saveMemorial` lên backend,
- gọi `clearSavedRun()`.

`legacyKeepsake.js` chỉ chạy trong engine (`keepsakeForLife` trong `gameEngine.js`, `normalizeLegacyCharacter` trong `saveSchema.js`). `BloodlinePage.jsx` là trang `/bloodline` riêng, đọc `pastLives`. Vì vậy tách giao diện làm hai bước không làm đứt chuỗi thế hệ, miễn là giữ nguyên ba điều dưới đây.

Quy tắc khi làm:
1. Không chuyển đoạn ghi di sản trong `commit` sang giao diện. Bước 1 và bước 2 chỉ là cách trình bày.
2. Bốn hành động hiện có của `Epitaph` (`LiveStageFeed.jsx` dòng 638) đều có ở bước 2:
   - `onInherit`, tức `startLife(true)`, cho người thừa kế sống tiếp;
   - `onRestart`, tức `abandonRun`;
   - `onViewRecord`;
   - `onGoHome`.

   Bước 1 có nút chính "Nhìn lại cuộc đời này" và một nút phụ "Kế thừa ngay" (cũng gọi `onInherit`), để người chơi nhiều lượt không phải bấm thêm một lần.
3. Đặt `key={summary.seed + '-' + summary.age}` cho `Epitaph`, để mỗi cái chết mới đều mở lại từ bước 1.
4. Khi sang bước 2, chuyển tiêu điểm tới tiêu đề trang di cảo. Phím Enter ở bước 1 tương đương "Nhìn lại".
5. Cảnh C2 phải chạy xong (hoặc bị bỏ qua) rồi bước 1 mới hiện. Giữ nguyên cách xử lý cho các kết thúc đặc biệt (`summary.endingId`, khi `pendingLegacy = null`).
6. Có thể thêm liên kết "Xem gia phả" (`navigate('/bloodline')`) ở bước 2. Đây là phần cộng thêm, vì trang này đã vào được từ thanh bên và `PlayBar`.

#### E4. Cảnh không được phép khóa trò chơi (bổ sung)

Nếu chunk `CutsceneLayer` tải lỗi (mất mạng giữa phiên, deploy mới làm đổi tên chunk), hoặc sự kiện kết thúc animation không bắn, thì `cutscene` sẽ kẹt khác `null` mãi và đồng hồ đứng im. Cách chặn:
- `playCutscene` tự hẹn một mốc an toàn `durationMs + 1500` ms để gọi `endCutscene('watchdog')`. Mốc này bị hủy khi cảnh kết thúc bình thường.
- `import()` của `CutsceneLayer` có `.catch(() => endCutscene('error'))`.
- Kết thúc cảnh dựa vào thời gian trong store, không dựa vào `animationend`.
- Khi tab bị ẩn (`visibilitychange`), kết thúc cảnh ngay, để người chơi quay lại thì thấy dock chứ không thấy cảnh đã đứng hình.

#### E5. Cảnh chồng cảnh (bổ sung)

Có trường hợp một lần `commit` sinh hai tín hiệu, ví dụ chết ngay trong hầm ngục do Claw mở ra. Quy tắc:
- Mỗi lần `commit` chỉ phát một cảnh, theo thứ tự ưu tiên: chết, Color, Claw, Carmen, hầm ngục.
- Không xếp hàng cảnh thứ hai. Nếu đang có cảnh chạy mà tín hiệu mới có ưu tiên cao hơn (thường là cái chết), cảnh mới thay cảnh cũ; ngược lại thì bỏ tín hiệu mới.

---

## 5. Danh mục cảnh

Thời lượng là mục tiêu thiết kế của mình. Dòng chữ là bản nháp để thảo luận, sẽ qua lint trước khi vào repo.

### C1. Án của The Head (Claw), khoảng 3,6 giây
- **Kích hoạt:** `enforceTabooJudgment` (Taboo chạm 3). Thay cho việc mở thẳng thẻ hầm ngục.
- **Hình:** toàn màn tối dần; một đường cắt xanh ngang kéo dài từ trái sang phải; vòng lục giác mờ xoay chậm; đường cắt tách màn thành hai nửa; chớp xanh ngắn; trả lại thẻ.
- **Nhịp (ms):** 0 đến 400 tối dần và tắt âm nền; 400 đến 1500 đường cắt dài ra; 900 đến 2400 vòng lục giác hiện và xoay; 2200 đến 3000 hai nửa màn tách ra; 3000 đến 3300 chớp màu 120 ms; 3300 đến 3600 hiện dock.
- **Chữ:** "Căn phòng đột ngột im lặng." rồi "Một đường cắt xanh mở ra trước mặt bạn." rồi "Claw đã đến."
- **Bản lite:** đường cắt và chớp 900 ms, giữ một dòng chữ.
- **Dùng lại:** vòng và đường quét từ `dgs-claw`, đổi từ vòng lặp thành cảnh một lần.

### C2. Cái chết, khoảng 3 đến 4 giây rồi hai bước
- **Kích hoạt:** `!next.alive && prev.alive`. Hiện `fx-death` (lớp tối 0,85) nhưng thiếu hình.
- **Hình:** màn tối dần theo hướng từ rìa vào giữa; ngọn đèn nhỏ của dòng nhật ký tắt; chỉ còn tuổi và nguyên nhân.
- **Bước 1, thẻ ngắn:** tuổi, nguyên nhân chết, một câu. Một nút "Nhìn lại cuộc đời này".
- **Bước 2:** trang di cảo hiện tại, nhưng mở đầu bằng đoạn tiểu sử tự viết ngắn (3 đến 5 câu) và Records có độ hiếm, phần còn lại gấp lại (cùng triết lý với sidebar vừa làm).
- **Lưu ý:** không bỏ chức năng cũ, chỉ đổi thứ tự trình bày.

### C3. Tiếng gọi của Carmen, khoảng 5 đến 7 giây
- **Kích hoạt:** event `ego_carmen_crossroad` (E.G.O Resonance cao). Cảnh phát trước khi dock lựa chọn (Giữ vững hoặc Buông xuôi) xuất hiện.
- **Hình:** tối dần; nhịp tim đập chậm (vòng sáng đồng tâm co giãn); các mảnh thì thầm trôi ra từ mép màn, tăng dần mật độ; một câu duy nhất ở tâm.
- **Giới hạn hiệu năng:** tối đa 24 mảnh chữ (bản tham chiếu dùng hàng trăm); mỗi mảnh chỉ `transform` và `opacity`; lite chỉ còn 6 mảnh.
- **Chữ:** một câu chính ("Có ai đang gọi tên bạn bằng chính giọng của bạn.") và một kho 12 mảnh thì thầm ngắn xoay vòng, ví dụ "đừng quay đầu", "ở đây sáng hơn".
- **Nút lựa chọn** chỉ hiện ở cuối cảnh.

### C4. Phong Color, khoảng 4 giây
- **Kích hoạt:** thêm cờ `ColorFixer`; mình đã có `char.colorData` với màu riêng cho từng Color.
- **Hình:** thẻ tiêu đề toàn màn mang màu của chính Color đó (`colorData.color`, `glow`); một vệt chém hoặc dải màu chạy ngang; tên Color hiện bằng chữ trình bày.
- **Chữ:** "Hana đã đọc tên bạn." rồi tên Color và danh hiệu. Không dùng tên Color của cảnh tham chiếu.
- **Sau cảnh:** mở Sắc chỉ Hana như hiện nay.

### C5. Cổng hầm ngục, khoảng 2,4 giây
- **Kích hoạt:** `createDungeonSession` (mọi hầm ngục, kể cả Claw dùng C1 thay thế).
- **Hình:** nền `DungeonBackdrop` của chính hầm ngục đó lộ ra trọn vẹn trong lúc UI mờ đi; tên hầm ngục hiện giữa màn như thẻ tiêu đề; một dòng phụ.
- **Mục đích:** biến mỗi lần xuống hầm thành một sự kiện nhớ được, dùng lại đồ họa đã có (WARP, hồ, Lobotomy, Bloodfiend, Outskirts, đêm Backstreets).

### C6. Ngón Tay lên bậc đỉnh, 4 đến 5,6 giây (đợt sau)
- **Kích hoạt:** `turning` kèm `fingerRank` lên bậc cao nhất; mỗi Ngón có motif riêng (mình đã có `finger-*` trong `FAMILY` của `WorldBackdrop`).
- **Làm sau cùng:** nhiều hình riêng, ít giá trị so với chi phí ở giai đoạn đầu.

### C7. Đồng đội hy sinh cứu bạn, khoảng 3,5 giây (đợt sau)
- **Kích hoạt:** mạng NPC cứu người chơi (cơ chế Death Save đã có). Tên NPC trên nền tối, một ngọn nến tắt, một lời cuối của NPC.

### C8. Chương mới trong nhật ký (không phải toàn màn, khoảng 1,8 giây)
- **Kích hoạt:** mục nhật ký có `turning: true`, tuổi vào nghề, đổi nghề, thăng bậc.
- Mô tả chi tiết ở tầng B (mục 6.2).

---

## 6. Ba tầng việc

### Tầng A: Cutscene Director (đợt 1 đến 3)

**Đợt 1, hạ tầng và Claw** (đã xong ngày 31/10/2026, xem `PROGRESS_LOG.md` Đợt 100)

Hai chỗ khác với kế hoạch:
- Cảnh kết thúc trên lớp nền mờ của dock (`--dialog-scrim`, blur 3px), không mờ về trong suốt rồi dock mới mờ vào lại. Nhờ vậy không có khoảng sáng chen giữa cảnh và dock.
- Ngưỡng máy yếu hạ từ 4 lõi xuống 2 lõi.
1. `cutsceneTriggers.js` + test cho Claw và cái chết.
2. `registry.js`, `CutsceneLayer.jsx`, `cutscene.css`, `pm-cutscene` trong `themeStore` và `SettingsModal`.
3. Store: `cutscene`, `playCutscene`, `endCutscene`; cổng giữ `hasDock` và tạm dừng đồng hồ.
4. Chặn thời gian theo E1: `MainLayout` (điều kiện và mảng phụ thuộc), `tick`, `stepYear`, `skipQuietTime`.
5. Cách ly phím theo E2: listener pha capture, guard trong `LiveStageFeed`, bỏ `e.repeat`, khoảng chặn nhập 250 ms, chạm bằng `click`.
6. Chống kẹt theo E4 (mốc an toàn, `.catch`, `visibilitychange`) và ưu tiên cảnh theo E5.
7. Cảnh C1 (Claw) hoàn chỉnh, bản full, lite, giảm chuyển động.
8. `tools/lint/check_cutscenes.mjs` nối vào `npm test`.
9. Kiểm tra bằng filmstrip ở 320x568, 390x844, 412x915, 800x1280, 1440x900.
- **Nghiệm thu:**
  - dock không hiện trong lúc cảnh chạy, và hiện trong 300 ms sau cảnh;
  - bỏ qua được bằng chạm, Space, Enter, Esc;
  - 0 lỗi console, không tràn ngang, nút "Bỏ qua" 44px;
  - ở x3 với auto-choose bật, phương án đầu tiên không bị chọn sớm hơn 4000 ms sau khi dock hiện;
  - nhấn Space hoặc Enter để bỏ qua cảnh không chọn phương án nào và không bỏ qua khoảng nghỉ đọc;
  - tải chunk lỗi thì trò chơi tự chạy tiếp trong vòng `durationMs + 1500` ms.

**Đợt 2, cái chết và Color** (đã xong ngày 31/10/2026, xem `PROGRESS_LOG.md` Đợt 102)
1. C2 hai bước, chuyển trang di cảo hiện tại thành bước 2 (tiểu sử tự viết và Records ở đầu, phần còn lại gấp). Làm theo E3.
2. C4 phong Color dùng `colorData`.
- **Nghiệm thu:**
  - mọi cái chết đều hiện thẻ ngắn trước;
  - nút "Nhìn lại" mở trang cũ, không mất nội dung;
  - bước 2 có đủ bốn hành động của `Epitaph`;
  - "Kế thừa ngay" ở bước 1 mở đời người thừa kế, mang theo di vật;
  - đời chết tiếp theo lại mở từ bước 1;
  - `pastLives` và trang `/bloodline` có đời vừa chết ngay cả khi người chơi chưa bấm gì.

**Đợt 3, Carmen và cổng hầm ngục**
1. C3 Carmen với kho thì thầm.
2. C5 cổng hầm ngục cho cả sáu hầm.
- **Nghiệm thu:** mật độ phần tử đo được dưới 40 trên điện thoại; không long task quá 50 ms trong lúc cảnh chạy (đo bằng `PerformanceObserver`).

### Tầng B: không khí tại chỗ (đợt 4 đến 5)

**6.2 Thẻ chương trong nhật ký (đợt 4)**
- Loại log mới `chapter`, xếp tầng `turn` trong `entryTiers.js`, không bao giờ bị gấp ở chế độ Đọc gọn.
- Hiển thị: một khối chữ trình bày cỡ lớn, hai đường kẻ mảnh đối xứng, một dòng phụ nghiêng; không hộp, không bóng.
- Móc: mục có `turning: true` (nghề, Grade, Finger rank, Wing rank, Syndicate rank, E.G.O, Distortion, Color) và tuổi vào nghề.
- Thêm test: mỗi thăng cấp Syndicate độc lập (rank 1 đến 3) và ngã rẽ nghề sinh đúng một thẻ chương.

**6.3 Hậu cảnh lộ ra (đợt 5, nối mục B "cảm giác nơi chốn")**
- `.log-col` đổi nền đặc thành biến `--page-alpha` theo cảnh (0,86 đến 0,94 tùy `scene.world`); không giảm tương phản chữ dưới 4,5:1.
- `sceneContextOf` (`sceneContext.js`) trả thêm `place` (nơi chốn theo District/vùng) và `mood` (bình thường, hush, warp, lake, kx), để `WorldBackdrop` chọn biến thể theo nơi chứ không chỉ theo nghề. Bản đồ District sang họ cảnh dùng các thẻ `tags` đã có của `REGIONS`.
- Lớp `mood-*` trên gốc màn chơi làm mờ cột bên (`.side`, thanh trên) bằng `opacity` và một lớp phủ xám, tối đa 0,3 giây vào và 1,2 giây ra; không animate `filter`.
- **Nghiệm thu:** đổi `mood` không gây reflow (CLS 0); chữ nhật ký vẫn đạt tương phản; điện thoại 320 đến 412px không tràn.

### Tầng C: hoàn thiện thẻ quyết định (đợt 6)
1. Sự kiện lớn (major) hiện nhãn "Thời gian dừng" trong `dock-kicker`; sự kiện nhỏ giữ đồng hồ đếm ngược như hiện nay. Nhãn viết thường, không giãn chữ.
2. Khi bật "Xem phía sau": giao diện còn lại sáng lên, nền hiện rõ; thoát bằng Esc hoặc chạm lại.
3. Thanh tỉ lệ thành bại cho Request: kiểm tra `ChoicePreview`/`Deltas.jsx` có đủ ba mức (thành công, thất bại, tử vong) trước khi thêm; chỉ làm nếu thiếu.
4. Cảnh mở đầu (birth): gắn timeline nhẹ vào `CityLoadingOverlay` và `revealNextBirthLog` bằng cùng registry, bản `lite` mặc định.

---

## 7. Hiệu năng, trợ năng, kiểm thử

**Hiệu năng**
- `CutsceneLayer` và từng cảnh là chunk lazy; không hình ảnh ngoài; SVG viết tay.
- Giữ trong ngân sách: dưới 40 phần tử động trên điện thoại, dưới 24 trên máy yếu (chế độ tiết kiệm pin, `navigator.hardwareConcurrency <= 2` hoặc `deviceMemory <= 2` thì dùng `lite`).
- Đo: số long task trong lúc cảnh chạy, thời gian từ lúc kích hoạt tới lúc dock hiện.

**Trợ năng**
- Cây trang trí gắn `aria-hidden`; chữ cảnh nằm trong vùng `role="status"` `aria-live="polite"` để trình đọc màn hình vẫn nhận được.
- Chữ trên nền tối đạt tương phản 4,5:1; chữ chính giữ trên màn tối thiểu 3 giây (bản full).
- "Bỏ qua" bằng phím và chạm; không bẫy tiêu điểm; trả tiêu điểm về dock khi hết cảnh.

**Kiểm thử tự động (vào `npm test`)**
- `test_cutscene_triggers.mjs`: mỗi tín hiệu engine sinh đúng mã cảnh; cảnh không trùng lặp (không bắn hai lần cho một sự kiện); không có cảnh khi nạp save.
- `check_cutscenes.mjs`: mỗi cảnh trong registry có thời lượng, bản lite, bản giảm chuyển động; mọi dòng chữ qua `voice_lint`.
- Test cổng: khi `cutscene != null` thì `hasDock` giả; sau khi gỡ thì thật; auto-choose không bắn trong lúc cảnh chạy.
- `test_cutscene_gate.mjs` (store chạy trong Node):
  - đặt `cutscene` xong gọi `tick(400)` nhiều lần, `stepYear()` và `skipQuietTime()`: `yearProgress`, `planCursor` và `age` không đổi;
  - gọi `endCutscene` rồi `tick`: thời gian chạy lại;
  - mốc an toàn tự gọi `endCutscene('watchdog')`;
  - hai tín hiệu trong một lần `commit` chỉ phát cảnh có ưu tiên cao hơn.
- Kiểm tra mã nguồn (giống test modal NPC đã có):
  - effect đồng hồ trong `MainLayout` có `cutscene` cả trong điều kiện lẫn trong mảng phụ thuộc;
  - `onKeyDown` của `LiveStageFeed` có guard `cutscene`;
  - `CutsceneLayer` gắn listener với `capture: true`;
  - `Epitaph` bước 2 vẫn gọi `onInherit`, `onRestart` và `onGoHome`;
  - `buildLifeSummaryAndLegacy` vẫn được gọi trong `commit` của store.

**Kiểm thử trực quan (chạy tay mỗi đợt, bằng CDP)**
- `tools/film/film_cutscene.mjs` quay chuỗi ảnh mỗi 250 ms cho từng cảnh ở năm kích thước màn hình (320x568, 390x844, 412x915, 800x1280, 1440x900).
- Kiểm tra: không tràn ngang; không ký tự bị cắt; dock hiện đúng giờ; bản giảm chuyển động chỉ còn thẻ tĩnh.

---

## 8. Lộ trình và điểm cắt giao hàng

Mỗi đợt kết thúc bằng: `npm test`, `vite build`, commit, push, kiểm tra deploy (bundle Vercel, `/api/health`), và ghi `PROGRESS_LOG.md`.

| Đợt | Nội dung | Giá trị | Rủi ro |
|---|---|---|---|
| 1 | Hạ tầng Director, Claw, Cài đặt cutscene | Cao nhất, chứng minh cả mô hình | Trung bình (đụng store và dock) |
| 2 | Cái chết hai bước, phong Color | Cao | Thấp |
| 3 | Carmen, cổng hầm ngục | Cao | Trung bình (hiệu năng) |
| 4 | Thẻ chương trong nhật ký | Trung bình | Thấp |
| 5 | Hậu cảnh lộ ra, `place` và `mood` | Cao (đóng mục B) | Trung bình (tương phản chữ) |
| 6 | Hoàn thiện dock: Thời gian dừng, xem phía sau, mở đầu | Trung bình | Thấp |
| Sau | C6 Ngón Tay đỉnh, C7 đồng đội hy sinh | Thấp đến trung bình | Chi phí hình riêng |

Mình đề nghị làm đợt 1 trước và dừng để chủ dự án xem filmstrip Claw trước khi nhân ra các cảnh khác. Đây là cách rẻ nhất để chỉnh gu về nhịp và độ dài trước khi viết thêm 6 cảnh.

---

## 9. Các quyết định (đã chốt ngày 31/10/2026)

| # | Câu hỏi | Chốt |
|---|---|---|
| 1 | Độ dài mặc định | Lần đầu mỗi cảnh phát `Đầy đủ`, các lần sau `Rút gọn`. Tốc độ x3 hoặc auto-choose luôn `Rút gọn`. |
| 2 | Cho tắt hẳn cutscene | Có. Khi tắt vẫn hiện một dòng chú thích 1,2 giây. |
| 3 | Âm thanh | Làm sau tầng A. |
| 4 | Chớp màu thay chớp trắng | Dùng chớp màu 120 ms: xanh cho Claw, đỏ cho máu, vàng cho E.G.O; một lần mỗi cảnh, dưới ngưỡng ba lần chớp mỗi giây (WCAG 2.3.1). |
| 5 | Cái chết hai bước | Đồng ý: thẻ ngắn rồi trang di cảo, theo quy tắc E3. |
| 6 | Thứ tự ưu tiên | Tầng A trước. |

Chưa chốt, không chặn tầng A: có giảm phạt kỳ thi Hana cho Grade 8 đến 6 không (đã đo ở đợt trước: random chết 6 đến 8,5%).

---

## 10. Điều không làm

- Không dùng video hay ảnh nặng; không thêm thư viện animation.
- Không chép cảnh, tên, câu chữ, CSS hay SVG của game tham chiếu.
- Không bỏ chiều sâu hiện có (gia phả, di vật, NPC chủ động, weaver, tâm lý, nhật ký phân tầng, sidebar thu gọn).
- Không để cutscene che một quyết định đang chờ, và không bao giờ bắt người chơi xem lại cảnh đã xem mà không có đường bỏ qua.
- Không đổi luật chơi hay cân bằng trong đợt này; đây là dàn dựng, không phải thiết kế hệ thống.

---

## Phụ lục A: nhịp quan sát được ở game tham chiếu (để định thang, không để chép)

- Một năm bằng một phút ở x1, đổi tốc độ x1 đến x32; sự kiện lớn dừng thời gian, sự kiện nhỏ không chờ.
- Năm không có sự kiện hiện thành một dòng mờ.
- Nền màn chơi đổi không khí bằng các lớp mờ dần 1,2 đến 6 giây; khi có biến cố, giao diện chuyển xám và mờ trong khoảng 6 giây.
- Cảnh nhắc tới: Claw khoảng 3,4 giây; Arbiter khoảng 22 giây (bốn dòng chữ hiện ở khoảng 4,0 / 9,9 / 15,5 / 20,3 giây, phần ra dài theo độ dài chữ, 55 ms mỗi ký tự, giới hạn 4 đến 15 giây); phong Color khoảng 1,4 giây cho hiệu ứng ngắn, dài hơn cho cảnh ba ống tiêm.
- Thẻ quyết định giữa màn, nền mờ, phím 1 đến 4 và 0, nút "Hide for a moment"; thẻ Request hiện thanh Success, Fail, Death.
- Cuối đời hai bước: thẻ ngắn rồi trang nhìn lại có đoạn tiểu sử và danh sách Records có độ hiếm.
- Điện thoại: thanh trên dính một dòng (tuổi, tiến độ, tốc độ thu gọn), năm chỉ số trên một hàng, đặc điểm gấp lại.

Giới hạn của quan sát: trong bốn đời chơi thử, Claw, Arbiter và Color không tự xuất hiện. Mình dựng lại Claw và Arbiter bằng markup và CSS của họ nên nhịp đáng tin; điều kiện kích hoạt của họ chưa kiểm chứng, và mình chưa xem cảnh Color của họ.

## Phụ lục B: các điểm móc trong code của mình

| Việc | Điểm móc |
|---|---|
| Kích hoạt cảnh | `gameStore.js`: cạnh `stageFxFor` (dòng 149), `enforceTabooJudgment` (dòng 162), `commit` |
| Giữ dock | `LiveStageFeed.jsx`: `hasDock` (dòng 1361), `postChoicePauseMs`, `peekBehind` |
| Đồng hồ năm, auto-choose | `MainLayout.jsx` dòng 44 đến 74 |
| Bước thời gian trong store | `gameStore.js`: `tick` (dòng 736, guard dòng 753), `stepYear` (812), `skipQuietTime` (856) |
| Phím tắt | `LiveStageFeed.jsx` dòng 1187 đến 1297 (`onKeyDown` gắn trên `window`, pha bubble) |
| Ghi di sản khi chết | `gameStore.js` dòng 610 đến 624 (`buildLifeSummaryAndLegacy`, `pastLives`, `saveMemorial`) |
| Màn hình chết | `LiveStageFeed.jsx`: `Epitaph` (dòng 638), gắn ở dòng 1434 |
| Lớp cảnh toàn màn | `MainLayout.jsx` gần `<WorldBackdrop>` (dòng 100) |
| Nền theo nơi | `sceneContext.js`: `sceneContextOf`; `WorldBackdrop.jsx`: `FAMILY` |
| Cảnh hầm ngục tái dùng | `DungeonBackdrop.jsx`, `dungeon-scenes.css` (`dgs-*`) |
| Cột nhật ký | `chronicle.css`: `.log-col` (dòng 14) |
| Thẻ chương | `entryTiers.js` (`turn`), cờ `turning` ở `gameEngine.js` (`resolveEventChoice`) |
| Cài đặt | `themeStore.js` (mẫu `readMode`), `SettingsModal.jsx` |
| Huyết thống, di vật | `BloodlinePage.jsx` (route `/bloodline`, đọc `pastLives`); `legacyKeepsake.js` chỉ chạy trong engine và `saveSchema.js` |
