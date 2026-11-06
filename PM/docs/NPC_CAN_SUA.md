# Cơ chế NPC: việc cần sửa

Tổng hợp ngày 06/11/2026. Mọi dòng code dưới đây đã được đối chiếu với commit `f8258c4`. Mỗi mục gồm vấn đề, cách tái hiện, hướng sửa và test cần có. Làm theo thứ tự ưu tiên; mục 1 chỉ là sửa vài dòng nhưng ảnh hưởng nhiều nhất.

> **Trạng thái (06/11/2026):** Đã hoàn thành toàn bộ **11/11 mục** (kiểm thử tự động tại `tests/test_npc_mechanics_fixes.mjs`, đã tích hợp vào `npm test`).

Các file chính:
- `src/engine/npcInteractions.js`: hành động trực tiếp với NPC.
- `src/engine/narrativeArcEngine.js`: đời sống tự chủ của NPC (`simulateNpcAutonomousLife`).
- `src/engine/dungeonEngine.js`, `src/engine/dungeonCombat.js`: tác dụng của NPC trong Dungeon.

---

## Ưu tiên rất cao

### 1. [x] Chỉ số bằng 0 bị đọc thành 50 (Đã xong)
- **Ở đâu:** `narrativeArcEngine.js`, các dòng 297, 361, 383 (`char.stats.sanity || 50`) và 346 (`char.stats.health || 50`).
- **Lỗi:** `0 || 50` cho ra 50. Một nhân vật đang ở 0 Sanity gặp tin xấu bị trừ 4 thì Sanity lại lên 46.
- **Sửa:** đổi `||` thành `??` ở mọi chỗ đọc chỉ số trong file này. Nên tìm thêm `|| 50` trong `npcInteractions.js` (dòng 182, 201) và sửa luôn.
- **Test:** tạo nhân vật có `sanity: 0` và bạn đời Bond dưới 25, ép `rng` vào nhánh "Căn hộ lạnh lẽo", rồi kiểm tra Sanity vẫn là 0.

### 2. [x] Hiệp lực đối luyện không bao giờ hết hạn (Đã xong)
- **Ở đâu:** `npcInteractions.js:203` bật `char.companionSynergy`. `dungeonEngine.js:1772` và `dungeonCombat.js:524` chỉ kiểm tra `companionSynergy?.active`.
- **Lỗi:** sau một lần đối luyện, bất kỳ đồng đội nào cũng đỡ được đòn chí mạng, kể cả nhiều năm sau và kể cả người không cùng luyện tập. Không có chỗ nào xóa cờ này.
- **Sửa:**
  - Khi kiểm tra, yêu cầu `companionSynergy.role === role của đồng đội đang đi cùng`, và `char.age - companionSynergy.year <= 1` hoặc chỉ cho dùng trong lần vào Dungeon kế tiếp.
  - Xóa `companionSynergy` sau khi đã dùng để đỡ đòn, sau khi rời Dungeon, hoặc khi hết năm.
  - Gộp điều kiện vào một hàm chung, ví dụ `hasSynergyWith(char, npcRole)`, để hai luồng Dungeon và giao tranh không lệch nhau.
- **Test:** đối luyện với `friend` rồi vào Dungeon cùng `partner`, kiểm tra không được đỡ đòn. Đối luyện xong qua 2 năm mới vào Dungeon, kiểm tra cũng không được đỡ đòn.

---

## Ưu tiên cao

### 3. [x] Hành động với NPC không có điều kiện tuổi (Đã xong)
- **Ở đâu:** `canInteractWithNpc` (`npcInteractions.js:81`). Tin về bạn thân ở `narrativeArcEngine.js:287` lấy `friendAge = char.age`, tức tuổi người chơi.
- **Lỗi:** nhân vật 0 tuổi vẫn "uống rượu giãi bày" và "luyện kiếm" với bạn cùng tuổi.
- **Sửa:**
  - Thêm `minAge` cho từng hành động: `drink_confide` 18, `spar_coordinate` 14, `call_favor` 16, `emergency_aid` 16, `delegate_command` theo cấp chỉ huy.
  - Kiểm tra tuổi của cả người chơi lẫn NPC. NPC cần có `age` hoặc `birthYearOffset` riêng.
  - Trẻ nhỏ có hành động riêng, ví dụ "chơi cùng" hay "chia đồ ăn": tăng ít Bond, không tốn Ahn.
  - Lý do bị khóa phải hiện trong UI, như các khóa khác (`reasonVi`/`reasonEn`).
- **Test:** nhân vật 5 tuổi gọi `drink_confide` thì nhận `ok: false` với lý do về tuổi.

### 4. [x] Tin tức NPC không theo nghề hiện tại (Đã xong)
- **Ở đâu:** `narrativeArcEngine.js:310`.
- **Lỗi:** NPC đang làm Wing vẫn có tin "ký hợp đồng với Office Fixer", và tin này lặp lại nhiều năm liền mà nghề không đổi.
- **Sửa:**
  - Chọn tin theo `npc.job`: Fixer, Wing, Syndicate, Workshop, Outcast và trẻ em mỗi loại có danh sách riêng.
  - Tin đổi nghề phải cập nhật `npc.job`, `npc.rankLabelVi/En` và ghi một ký ức.
  - Mỗi loại tin có cooldown, ví dụ ghi `npc.lastNewsId` và `npc.lastNewsAge`, không lặp trong 3 năm.
- **Test:** NPC `job: 'Wing Employee'`, chạy 20 năm, kiểm tra không có tin Office Fixer và không có tin nào lặp trong 3 năm.

---

## Ưu tiên vừa

### 5. [x] Nhãn thăng chức Wing suy tên Corp từ câu hiển thị (Đã xong)
- **Ở đâu:** `narrativeArcEngine.js:427`, `(npc.rankLabelVi || 'Wing').split(' ')[0]`.
- **Lỗi:** "K Corp Thử việc" thành "K Chính thức" ở lần thăng đầu, rồi thành "K Trưởng phòng" ở lần sau. Phần "Corp" bị mất.
- **Sửa:** lưu `npc.corpId`, ví dụ `'K'`, khi tạo NPC Wing (gồm cả bước bổ sung hồ sơ cho save cũ). Nhãn được dựng lại từ `corpId` và bậc, không đọc ngược từ nhãn cũ.
- **Test:** thăng một NPC Wing 3 lần, kiểm tra nhãn vẫn bắt đầu bằng "K Corp".

### 6. [x] Khủng hoảng NPC chỉ tăng, không có kết cục (Đã xong)
- **Ở đâu:** `narrativeArcEngine.js:441–464`.
- **Lỗi:**
  - Mức độ tăng 6–15 mỗi năm. Khi chạm 100, cảnh báo lặp mãi nếu người chơi không cứu.
  - Loại `prosthetic` không có cảnh báo nào, nên người chơi không biết NPC đang gặp nạn.
- **Sửa:**
  - Khi mức độ đạt 100, rút một kết cục theo tính cách và Bond: tự xoay xở (khủng hoảng hết, mất ít Bond), mất tích (`status: 'missing'`), rạn nứt quan hệ, chết, hoặc mở một event mới qua `pendingThreads`.
  - Thêm cảnh báo cho `prosthetic`.
  - Thêm kiểu khủng hoảng cho các tính cách chưa có, vì hiện chỉ có gambler/greedy, tinkerer/sickly và idealist/proud.
- **Test:** đặt `severity: 95`, chạy 2 năm, kiểm tra khủng hoảng đã kết thúc bằng một trong các kết cục và cảnh báo không còn lặp.

### 7. [x] Quan hệ xấu kẹt mãi (Đã xong)
- **Ở đâu:** `narrativeArcEngine.js:356` (sư phụ Bond dưới 24) và 395 (nemesis).
- **Lỗi:** sư phụ Bond thấp trừ Sanity mỗi năm nhưng không có cách làm lành hay chia tay. Nemesis quấy rối 14% mỗi năm cho tới hết đời.
- **Sửa:**
  - Sau 3 lần trách mà Bond không lên, sư phụ cắt đứt quan hệ (`status: 'estranged'`) và để lại một ký ức.
  - Nemesis: sau một số lần quấy rối thì gieo `csq_npc_rival_reckoning` để có trận giải quyết, thay vì chỉ trông vào xác suất 8%.

### 8. [x] Chỉ Fixer và Wing được thăng tiến (Đã xong)
- **Ở đâu:** `narrativeArcEngine.js:411–438`.
- **Lỗi:** NPC Syndicate, Workshop và Outcast đứng yên cả đời. Fixer dừng ở Grade 4 vì điều kiện `rank > 4`.
- **Sửa:** thêm nhánh thăng tiến cho mọi nghề, kèm giới hạn. Cho Fixer lên Grade 3–2 với xác suất thấp hơn và yêu cầu tuổi.

---

## Hoàn thiện thêm

### 9. [x] Bạn thuở nhỏ có nghề người lớn từ lúc sinh (Đã xong)
- **Lỗi:** bạn thuở nhỏ được gán nghề người lớn và một District ngẫu nhiên ngay khi sinh ra.
- **Sửa:** để `job: 'Child'` tới năm 18 tuổi rồi mới chọn nghề. Nơi ở lấy theo District xuất thân của người chơi.

### 10. [x] Hàm bổ sung hồ sơ NPC sửa trực tiếp đối tượng (Đã xong)
- **Ở đâu:**
  - `ensureNpcAgency` trong `src/data/npcPersonality.js` (dòng 484) sửa trực tiếp NPC được truyền vào.
  - `NpcDossierModal.jsx:59` gọi hàm này khi render.
  - `simulateNpcAutonomousLife` cũng sửa thẳng `char.npcs[role]` và `char.stats`.
- **Lỗi:** render UI làm thay đổi state, nên dễ sinh lỗi khó tái hiện với Zustand.
- **Sửa:** `ensureNpcAgency` trả về bản sao. Modal chỉ đọc, không ghi. Engine ghi kết quả vào `char` mới qua luồng cập nhật state bình thường.

### 11. [x] Ký ức NPC bị cắt còn 6 (Đã xong)
- **Ở đâu:** mọi chỗ `npc.memories = [...].slice(-6)`.
- **Lỗi:** các ký ức gốc như lần gặp đầu hay ân nghĩa lớn bị đẩy ra sau vài lần uống rượu.
- **Sửa:** thêm `pinned: true` cho ký ức quan trọng. Khi cắt, giữ mọi ký ức được ghim, phần còn lại giữ 6 cái mới nhất.

---

## Ý tưởng nâng cấp (không phải lỗi)

- **Mục tiêu dài hạn của NPC:** trả hết nợ, lên Grade 3, mở Workshop. Mỗi năm tiến một bước; thành công để lại di sản, thất bại sinh event cho người chơi.
- **Phản ứng với lựa chọn lớn của người chơi:** khi người chơi thành Distortion, vào Syndicate hay lấy Color, mỗi NPC phản ứng theo tính cách: rời đi, đi theo, tố giác, hoặc giữ liên lạc bí mật.
- **NPC trong Dungeon có kết cục:** bị thương, chết hoặc bỏ đi tùy kết quả trận. Ghi lại ai đã đỡ đòn cho ai để các event sau gọi lại.

---

## Khi xong mỗi mục

1. Thêm test vào `tests/` và đưa vào chuỗi `npm test` trong `package.json`.
2. Chạy `npm test` và `npm run build`.
3. Văn bản tiếng Việt mới theo `.agents/skills/vi-prose/SKILL.md`; chạy `node tools/lint/vi_prose_scan.mjs`.
4. Ghi vào `PROGRESS_LOG.md`, đánh dấu mục đã xong trong file này.
