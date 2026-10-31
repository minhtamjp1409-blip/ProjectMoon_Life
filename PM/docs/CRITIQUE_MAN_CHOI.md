# Critique: màn chơi (31/10/2026)

Đối tượng là màn chơi: Biên niên, các dock quyết định và màn hình chết. Mã chính là `src/features/chronicle/components/LiveStageFeed.jsx`, cùng `PlayBar`, hồ sơ nhân vật, các dock hầm ngục, kế hoạch năm và kết quả.

**Cách chấm:** hai đánh giá độc lập chạy trên bản build production ở 1440x900 và 390x844.
- **A:** review thiết kế bằng mắt, dựa trên ảnh chụp.
- **B:** bộ phát hiện tự động, kèm đo trên trình duyệt.

**Trạng thái:**
- Chủ dự án chọn chưa sửa code.
- Đề xuất "gộp mỗi năm yên ả thành một đoạn" cũng chưa làm.
- Ảnh chụp lưu ngoài repo (scratchpad của phiên).
- Bản lưu máy đọc nằm ở `.impeccable/critique/`.

## Điểm sức khỏe thiết kế: 26/40 (chấp nhận được)

| # | Heuristic | Điểm | Vấn đề chính |
|---|---|---|---|
| 1 | Hiển thị trạng thái | 3 | Cùng một hầm ngục mà PlayBar ghi "chặng 1/4" (`totalStages \|\| 4`, `PlayBar.jsx:108`), còn thẻ ghi "Tầng 1/7". Trên điện thoại, dòng trạng thái bị cắt thành "Đang chờ b…". |
| 2 | Khớp với thế giới thật | 2 | Bản tiếng Việt vẫn hiện nhãn tiếng Anh: "Life Friction", "Causal Echo", "Year-End Reckoning" (`ENTRY_KIND` có giá trị `vi` bằng tiếng Anh), "Rising Tension", "Gen #1". Ngược lại, vài thuật ngữ bị dịch Hán-Việt, trái UNIVERSE §4: "Đô Thị", "Bức Tường", "Thần binh". |
| 3 | Quyền kiểm soát | 3 | Có "Xem phía sau", Esc, tạm dừng, bỏ qua. Nhưng trên điện thoại, nút "Xem phía sau" đè lên nút chính của dock. |
| 4 | Nhất quán | 2 | Một lựa chọn hiện hai cách ghi tỉ lệ ("TỶ LỆ NHÁNH ĐẦU: 75%" và "May rủi 75 / 25%"). Tiêu đề viết hoa mọi chữ đầu từ. Có ký tự trang trí "➔ ⚠ ✦". ContractDock dùng màu viết cứng, trái quy tắc chỉ dùng token của DESIGN.md. |
| 5 | Phòng lỗi | 3 | Nhãn "Chưa đủ điều kiện" không nói thiếu gì. |
| 6 | Nhận ra thay vì nhớ | 3 | Chip của lựa chọn sự kiện chỉ ghi "● HP ● SP", không cho biết tăng hay giảm; chip hầm ngục thì làm đúng ("HP · nặng"). |
| 7 | Linh hoạt, hiệu quả | 3 | Dock kế hoạch năm chặn mọi phím; không có phím cho tốc độ hay "Xem phía sau". |
| 8 | Thẩm mỹ, tối giản | 2 | Mốc nghề hiện 3 lần, tuổi hiện 2–3 lần, điện thoại có hai nút "tiếp". |
| 9 | Phục hồi sau lỗi | 2 | Dock chết không nêu nguyên nhân, trái nguyên tắc "khó nhưng công bằng". |
| 10 | Trợ giúp | 3 | Tên giai đoạn chỉ giải thích qua tooltip khi rê chuột, nên điện thoại không xem được. |

## Độ "riêng" của thiết kế

**Phần lõi được làm riêng cho game này, khoảng 7/10.** Các chỗ không thể đem sang game khác:
- cảnh nền thế giới;
- câu lý do của Causal Echo;
- thanh thành công, thất bại, tử vong của hợp đồng;
- thẻ ý đồ của đối thủ trong hầm ngục;
- thẻ "Dấu ấn đời này";
- nhật ký phân tầng.

**Phần rìa thì chung chung:** thẻ lựa chọn đánh số trong modal, thanh chỉ số, và màn hình chết là một lưới thẻ dữ kiện kèm 6 nút xếp chồng.

**Quét tự động:**
- Quét mã nguồn: 0 kết quả trên 214 file. Đây là con số thiếu chứ không phải "sạch": quét mã nguồn chỉ so regex, các luật cần trang đã render không chạy được.
- Quét trang đang chạy: mỗi khung nhìn ra 4–8 kết quả.

| Kết quả | Vị trí | Nhận định |
|---|---|---|
| Thứ bậc tiêu đề nhảy từ h1 "Biên niên" xuống h3 | dock sự kiện | Lỗi thật |
| Tương phản 4,47:1 trên gợi ý phím tắt | `chronicle.css:327` (`.dock-hotkey-hint`) | Lỗi thật, sát ngưỡng 4,5:1 |
| Thẻ lồng thẻ | `.chronicle-horizon-card` (`chronicle.css:65`) | Lỗi thật |
| Phát sáng trên thanh HP/SP và mắt Taboo | `play.css:360`, `play.css:163` | Báo trạng thái, nhưng lặp như đồ trang trí |
| Vầng sáng nền | `.world-glow` | Báo nhầm: chủ đích theo DESIGN.md |
| Một từ rơi xuống dòng cuối | thay đổi theo câu văn | Mức thấp |

Đo thêm trên trang:
- Trên desktop, nhãn chỉ số dùng làm vùng mở tooltip chỉ rộng 19×21 px, dưới mức tối thiểu 24 px của WCAG 2.5.8.
- Có một chữ 10,8 px trong dock.
- Không có tràn ngang và không có lỗi console.

## Ấn tượng chung

Nhật ký đọc rất tốt và dock quyết định viết đúng giọng The City. Hai điểm yếu:
- Khoảnh khắc quan trọng nhất của đời (cái chết và trang di cảo) đang nhớ sai cuộc đời.
- Trên điện thoại, các lớp nổi che đúng vùng ngón cái.

Cơ hội lớn nhất là làm cho trang di cảo xứng với mục tiêu "người chơi kể lại đời mình".

## Điểm đang làm tốt

1. **Bề mặt đọc:** Literata 17 px, cột rộng khoảng 610 px, dòng tuổi màu vàng, dải chia mùa in nghiêng, mục quiet lùi về sau, chip đặt sau đoạn văn, Đọc gọn gấp ngay tại chỗ.
2. **Dock viết đúng thế giới:** dòng kicker, lý do nhân quả, thanh thành bại và tử vong của hợp đồng, cửa hầm ngục hiện rủi ro và tiền cược.
3. **Bàn phím và an toàn:** vòng focus vàng rõ, Continue tự nhận focus, khoảng chặn 250 ms sau cutscene, xác nhận trước khi bỏ ván, lỗi lưu báo qua `role=status`.

## Vấn đề ưu tiên

### [P1] Trang di cảo nhớ sai cuộc đời
- Tình trạng:
  - Trong `.tp-content` (`LiveStageFeed.jsx:794-797`), tiêu đề và tóm tắt dính liền: "Tuổi 5Lửa bắt đầu…", "lao vàoHắn nhanh hơn".
  - Tiêu đề lặp lại tuổi đã ghi ở cột bên.
  - Danh sách bước ngoặt toàn minor thời thơ ấu, trong khi hầm ngục WARP năm 18 tuổi bị bỏ sót.
  - Đoạn tiểu sử in số ("22 Ahn… 35 điểm uy danh", "lên tới 54%") và dấu gạch dài, trái UNIVERSE §4 quy tắc 5 và 7.
- Vì sao quan trọng: PRODUCT.md định nghĩa thành công là người chơi kể lại đời mình.
- Cách sửa:
  - Tách tiêu đề và tóm tắt thành hai khối, bỏ tiêu đề dạng "Tuổi N".
  - Chọn bước ngoặt bằng bộ phân tầng của nhật ký (`entryTier` và `framesAsMajor`).
  - Lọc số và dấu gạch dài khỏi bộ sinh tiểu sử và khỏi tiêu đề bản sao chép.
  - Nên làm cùng đợt 2 của kế hoạch cutscene (cái chết hai bước).
- Lệnh gợi ý: `/impeccable clarify`

### [P1] Auto-choose có thể kẹt mãi ở một sự kiện
- Tình trạng: autoplay trong `MainLayout.jsx` luôn gọi `selectEventChoice(0)`. Nếu phương án 1 không khả dụng, `resolveEventChoice` trả lại nhân vật y nguyên (`gameEngine.js:2205`), sự kiện vẫn chờ, và auto-choose cứ thử lại vô ích.
- Cách sửa: chọn phương án khả dụng đầu tiên và bỏ qua lựa chọn làm tăng Taboo, giống cách minor đang làm (`gameStore.js:828`).
- Lệnh gợi ý: `/impeccable harden`

### [P1] Trên điện thoại, lớp nổi che hành động chính
- Tình trạng: viên "Xem phía sau" (`.event-peek-toggle`, cố định ở giữa đáy màn hình) nằm đè lên nút "Tiếp tục hành trình" và lên phương án 3. Thông báo thành tựu che PlayBar và đầu dock.
- Cách sửa:
  - Đưa "Xem phía sau" thành nút biểu tượng trên hàng kicker của dock.
  - Giữ thông báo thành tựu lại khi đang có dock, hiện sau khi người chơi đóng kết quả.
- Lệnh gợi ý: `/impeccable adapt`

### [P1] Cài đặt cỡ chữ không có tác dụng trên điện thoại
- Tình trạng: ở màn ≤480px, `chronicle.css` viết cứng `.entry p {15px}`, `.dock-text {14.5px}`, `.choice-label {14px}`, đè lên `--story-size`. Chọn cỡ "Rất lớn" thì chữ vẫn 15 px.
- Cách sửa: đổi sang `calc(var(--story-size) - 2px)`, hoặc đặt riêng `--story-size` cho điện thoại theo `data-text`.
- Lệnh gợi ý: `/impeccable typeset`

### [P2] Ngôn ngữ lẫn lộn và tỉ lệ hiện hai lần
- Cách sửa:
  - Việt hóa `ENTRY_KIND` và tên giai đoạn, đổi "Đô Thị" thành "The City".
  - Gộp tỉ lệ thành một dòng có nhãn, ví dụ "Trót lọt 75%".
  - Chip ghi kèm chiều thay đổi.
- Lệnh gợi ý: `/impeccable clarify`

## Persona

- **Alex (người chơi nhanh, dùng bàn phím):**
  - Dock kế hoạch năm chặn mọi phím, phải bấm Tab hơn 10 lần.
  - Không có phím cho tốc độ, "Xem phía sau" hay dùng lại kế hoạch năm trước.
- **Sam (trình đọc màn hình, bàn phím, thị lực kém):**
  - Dock là `role=dialog` với nhãn chung "Sự kiện & Kết quả" thay vì trỏ tới tiêu đề h3 của sự kiện.
  - Thứ bậc tiêu đề nhảy từ h1 xuống h3.
  - Mục nhật ký mới không bao giờ được đọc lên.
  - Đồng hồ minor gắn `aria-hidden` mà vẫn tự bỏ qua lựa chọn khi hết giờ (WCAG 2.2.1).
  - Nhãn chỉ số 19×21 px; gợi ý phím tắt tương phản 4,47:1.
  - Cỡ chữ không đổi được trên điện thoại.
- **Casey (một tay, điện thoại):**
  - Tạm dừng, tốc độ, bỏ qua và cửa hàng nằm ở đỉnh màn hình.
  - Viên "Xem phía sau" đè nút chính.
  - Thẻ hầm ngục cao 1366 px trong khung nhìn 688 px, nên thế đánh, vật phẩm và bài nằm dưới các lựa chọn.
- **Linh (fan Project Moon người Việt, đời thứ 8):**
  - Đọc gọn vẫn hiện nhãn, chip và "Xem lại sự kiện" trên mọi mục.
  - Không có dấu báo sự kiện chưa từng gặp.
  - Nhãn tiếng Anh và thuật ngữ Hán-Việt phá nhập vai.
  - Trang di cảo không nhớ những đỉnh thật của đời cô.

## Quan sát nhỏ

- **Mật độ quyết định:** một chặng hầm ngục có 11 nút, kế hoạch năm 10 nút +/−, màn hình chết 6 nút, menu "Thêm" trên điện thoại 13 mục. Nên đưa thế đánh và vật phẩm lên một hàng phía trên các lựa chọn, và gấp bộ bài thành "Bài (n)" (`/impeccable distill`).
- **Thông báo thành tựu:** đè đúng lên các đỉnh cảm xúc.
- **Sau khi chết:** PlayBar vẫn hiện các nút play, tốc độ, bỏ qua ở trạng thái vô hiệu.
- **Hiển thị tiếng Việt:** "Bắt nhịp" hiện thành "Bă´t nhịp" bằng Literata 600 (cần kiểm tra trên máy thật).
- **Trang di cảo:** nhãn chỉ số dạng "Sinh lực (Health)" vẫn hiện cả tiếng Anh ở chế độ chỉ tiếng Việt.
- **Giọng văn:** câu của thẻ horizon và cụm "giữa The City lạnh lùng" chồng tính từ, trái quy tắc 2.
- **Chọn hoài bão:** vòng focus nằm ở lựa chọn 1 trong khi lựa chọn 3 đang được chọn.
- **Dock kết quả:** gợi ý phím tắt hiện hai lần.

## Câu hỏi để cân nhắc

1. Có nên gộp mỗi năm yên ả thành một đoạn, để các dock tạo nhịp cho đời? (Chủ dự án: chưa sửa.)
2. Trang di cảo có nên nhớ đúng những gì nhật ký đã đóng khung là bước ngoặt?
3. Nếu mọi lựa chọn đều chờ người chơi, game mất gì?

## Thứ tự đề xuất khi bắt tay sửa

1. `/impeccable harden`: auto-choose kẹt.
2. `/impeccable typeset`: cỡ chữ trên điện thoại.
3. `/impeccable adapt`: lớp nổi trên điện thoại.
4. `/impeccable clarify`: trang di cảo (cùng đợt 2 cutscene), nhãn và tỉ lệ.
5. `/impeccable distill`: mật độ nút ở hầm ngục và kế hoạch năm.
6. `/impeccable polish`.
