# Kế hoạch Đợt 135–138: sửa logic theo bản rà soát ngày 06/11/2026

Bản rà soát ngoài đưa ra 6 nhóm phát hiện. File này ghi lại kết quả đối chiếu từng điểm với code ở commit `349d745`: điểm nào đúng, điểm nào đã cũ, điểm nào sai. Từ đó chia thành các đợt để làm.

Ký hiệu: **Đúng** là đã tái hiện trong code. **Đã xong** là đã sửa từ trước. **Sai** là không làm theo, kèm lý do. **Một phần** là đúng một nửa.

---

## Kết quả đối chiếu

| # | Phát hiện | Kết luận | Bằng chứng |
|---|---|---|---|
| 1.1 | Event bắt buộc không cập nhật `recentBeats` | **Sai** | `recordChoiceInGraph` (gồm `rememberDirectorEvent`) chạy ở mọi lần giải quyết major (`gameEngine.js:2838`, 2318, 2363, 2402). Các nhánh trả sớm chỉ là lúc *chọn* event; nhịp vẫn được ghi lúc *giải quyết*. Riêng việc minor và daily không đọc `recentBeats` là đúng, nhưng minor đã có `directorWeight` riêng, nên không ưu tiên. |
| 1.2 | `.find()` chặn hàng đợi thread | **Đúng** | `weaverAI.js:845`: chỉ lấy thread đầu tiên đến hạn. Nếu thread đó không đủ điều kiện, các thread major hợp lệ phía sau phải chờ. |
| 1.3 | `ring_patron_wants_a_face` cần điều kiện có bạn đời | **Đã xong, và hướng sửa sai** | Người đã khuất là của nhà bảo trợ, không phải của người chơi. Thêm điều kiện có bạn đời sẽ khóa nhầm mission. Đã đổi câu chữ ở `349d745`; lint còn 0 cảnh báo. |
| 2.1 | Ahn và Danh tiếng chạm trần, cuối đời không có chỗ tiêu | **Đúng** | `driftOf` không có nhánh cho `wealth`; phí giữ tài sản giới hạn ở `Math.min(4, …)` (`yearPlanner.js:1424`). Khớp với số đo Dungeon ở mục 2.36. |
| 2.2 | Điểm `scheme` luôn cộng Leverage | **Đúng** | `annualPlan.js:53` cộng `leverage` cho mọi nghề, nhưng chỉ Wing dùng chỉ số này. |
| 2.3 | Biến động thành phố dừng sau 40 tuổi | **Đúng** | `cityConditions.js:22`: `char.age < 25 \|\| char.age > 40`. |
| 3.1 | Phần lớn perk đồng đội không có tác dụng | **Đúng** | Engine không đọc 9 loại `loot`, `salvage`, `merit`, `clash`, `flee`, `trap_mitigation`, `sanity_shield`, `check_bonus`, `strain_reduction` (lưu ý: chữ `'clash'` trong `dungeonCombat.js` là tên hành động, không phải perk). `parry` và `calm` chỉ chạy ở chế độ chặng. |
| 3.2 | Thẻ `ego` thiếu né, Great Lake không có thẻ riêng | **Một phần** | `evadeChance` đã đọc `cardEffectOf(session).check`, nên thẻ `ego` có cộng né. Việc Great Lake chưa có bộ thẻ riêng thì cần xem tiếp trong `dungeonCards.js`. |
| 3.3 | Gauntlet bỏ qua chặng 0–2 và `STAGE_VARIANTS` | **Đúng** | `dungeonCombat.js:565` nhảy thẳng tới chặng cuối. Các lựa chọn dùng vật phẩm ở chặng đầu (như `con_kcorp_ampoule`) không bao giờ hiện. |
| 4.1 | Chỉ số do NPC tự sống không có chip delta | **Đúng** | `yearPlanner.js:1694` ghi log `npc_autonomy` mà không kèm `deltas`. |
| 4.2 | `child`/`ward` không có hành động lúc nhỏ, không đổi nghề lúc 18 | **Đúng** | `child_play` xét tuổi người chơi; đổi nghề lúc 18 chỉ áp dụng cho `friend`. |
| 5.1 | Ngưỡng Syndicate độc lập bậc 2 lệch nhau | **Đã xong** | `eventsFactions.js:3305` đã là `rep: [45, 100], heat: [30, 100]`, khớp `eventConditions.js:422`. |
| 5.1b | Lương và `hasEstablishedStanding` bỏ qua `syndicateRank` | **Đúng** | `economyModel.js:121` và `:160` chỉ đọc `fingerRank`. |
| 5.2 | Minor của Workshop Craftsman không bao giờ hiện | **Đúng** | Không còn event nào gán `setJob: 'Workshop Craftsman'`, nhưng `m_annual_workshop_calibration`, `m_annual_workshop_tres` và `m_wellness_workshop_tuneup` vẫn lọc theo nghề này. |
| 6.1 | Chặng 2 và 3 của `arc_middle_vengeance_saga` cùng là kỳ thi Rank 1 | **Đúng** | `careerPipeline.js:300` liệt kê cả hai trong `eventIds` của rank 1. Thắng ở chặng 2 thì chặng 3 khóa vĩnh viễn. |
| 6.1b | Thread chặng 3 hết hạn sau 8 năm, trước khi đủ tuổi hoặc bậc | **Đúng** | `yearPlanner.js:547–548`. |
| 6.2 | Kết thúc `ripe_age` không hiện đoạn kết | **Đúng** | `gameEngine.js:2975–2979` chỉ gán `poeticQuote`, không gán `char.lifeEnding`. `topOfCareer` không tính Wing rank 3 hay `syndicateRank` 3. |

---

## Đợt 135 — Mạch truyện bị kẹt (ưu tiên cao nhất)

Những lỗi này làm người chơi mất hẳn một nội dung, không chỉ lệch số.

1. **Chuỗi Middle (6.1).** Đổi chặng 2 của `arc_middle_vengeance_saga` sang một event không phải kỳ thi, ví dụ `syn_middle_book_of_vengeance` phần hai, hoặc bỏ `_rescue` khỏi `eventIds` rank 1. Chặng 3 giữ là kỳ thi rank 1.
2. **Hạn chờ của thread chặng 3 (6.1b).** Thread nào trỏ tới kỳ thi thăng cấp thì không hết hạn theo năm, chỉ hết khi nhân vật đổi nghề hoặc chết. Lưu thêm `waitsForGate: true` trên thread, và `yearPlanner.js:547` bỏ qua hạn 8 năm khi có cờ này.
3. **Hàng đợi thread (1.2).** Đổi `.find` ở `weaverAI.js:845` thành vòng lặp: chọn thread đầu tiên vừa đến hạn, vừa không phải `minor`, vừa có `isEventEligible(…, { scripted: true })`.
4. **Kết thúc `ripe_age` (6.2).** Gán `char.lifeEnding = 'ripe_age'` khi điều kiện đúng, để `closing` hiện ra. `topOfCareer` tính thêm Wing rank ≥ 3 và `syndicateRank` ≥ 3.
5. **Syndicate độc lập (5.1b).** `economyModel.js:121` và `:160` đọc `Math.max(fingerRank, syndicateRank)`. Thêm danh hiệu tổng kết đời cho `syndicateRank` 3.
6. **Workshop (5.2).** Ba minor kể trên lọc theo cờ `WorkshopTinkerer` hoặc vũ khí Workshop thay vì nghề `Workshop Craftsman`.

**Test:** chơi trọn chuỗi Middle tới chặng 3; thread chặng 3 vẫn còn sau 10 năm chờ; một thread minor không đủ điều kiện không chặn thread major phía sau; đời sống tới 100 tuổi ở đỉnh nghề có đoạn `closing`; ba minor Workshop xuất hiện với nhân vật có cờ.

---

## Đợt 136 — Perk đồng đội và Gauntlet

1. **Đọc perk ở một chỗ.** Viết `companionPerk(char, session)` trong `dungeonEngine.js`, trả về hệ số cho đồng đội đang đi cùng. Sau đó áp vào:
   - `loot`, `salvage`: nhân vào tiền dọn tầng (`dungeonCombat.js:~500`) và `stageRewards`.
   - `merit`: nhân vào Merit khi dọn tầng.
   - `clash`: cộng vào xúc xắc của người chơi (`playerDie`).
   - `flee`, `check_bonus`: cộng vào `evadeChance` và `checkChanceOf`.
   - `trap_mitigation`, `sanity_shield`: nhân vào `damageOf`.
   - `strain_reduction`: nhân vào phần tăng strain.
   - `parry`, `calm`: thêm vào `resolveGauntletChoice`.
2. **Hiện số.** Preview trên dock phải tính cả perk, để số trên màn hình không lệch số engine trừ. Mở rộng `test_dungeon_fail_preview.mjs` với một đồng đội có perk.
3. **Chặng đầu của Gauntlet (3.3).** Cho chặng 0 của mỗi hầm Gauntlet hiện trước tầng giao tranh đầu tiên, để lựa chọn dùng vật phẩm có chỗ xuất hiện. Không bật lại toàn bộ chặng 0–2, vì như vậy chuyến đi dài gấp đôi.
4. **Thẻ Great Lake (3.2).** Xem `dungeonCards.js`. Nếu Great Lake thật sự chưa có thẻ riêng, thêm 2 thẻ đi theo luật sổ luật của hầm này.

**Đo lại:** `node tools/sim/dungeon_sim.mjs 400 --stake=0,2 --policies=careful,informed`, có và không có đồng đội. Perk không được làm tỷ lệ chết của bot `informed` giảm xuống 0 ở mọi hầm.

---

## Đợt 137 — NPC

1. **Chip delta cho NPC tự sống (4.1).** `simulateNpcAutonomousLife` trả `deltas` trong từng log, rồi `yearPlanner.js:1694` truyền chúng vào `pushLog`.
2. **Con cái và người được bảo trợ (4.2).**
   - Với `child`/`ward`, `child_play` xét tuổi của NPC (≤ 15), không xét tuổi người chơi. Nhãn đổi thành "Dẫn đi dạo khu phố".
   - Khi `child`/`ward` đủ 18 tuổi, chọn nghề người lớn như đang làm cho `friend`.
3. **NPC phản ứng với bước ngoặt lớn.** Khi người chơi thành Distortion, vào Syndicate hoặc lấy Color, mỗi NPC thân thiết phản ứng theo tính cách: ở lại, rời đi hoặc giữ liên lạc bí mật. Việc này lớn nhất trong đợt, nên làm sau cùng.

---

## Đợt 138 — Kinh tế sau tuổi 40

1. **Biến động thành phố (2.3).** Đổi giới hạn tuổi ở `cityConditions.js:22` từ 25–40 thành 22–90.
2. **Điểm `scheme` theo nghề (2.2).** Wing: +2 Leverage. Fixer và Syndicate: −Heat và tiến độ hợp đồng. Distortion: +Resonance. Nghề khác: giữ −Heat.
3. **Chỗ tiêu Ahn cuối đời (2.1).** Gộp với đợt 134 đang chờ: chọn một cách dùng phần Ahn vượt trần, rồi thêm 1–2 khoản đầu tư cuối đời:
   - tài trợ Office;
   - trang bị cho đồng đội, tác dụng qua perk của đợt 136;
   - quỹ để lại cho đời sau.

   Cần chủ dự án chọn trước khi làm.

**Đo lại:** `balance_sim.mjs 500 focused`, theo dõi tỷ lệ chạm trần 100 Ahn và Rep sau tuổi 40 (hiện là 17,5% với Rep).

---

## Không làm

- **1.1, gọi `rememberDirectorEvent` cho mọi event bắt buộc.** Việc này đã diễn ra lúc giải quyết event.
- **1.3, thêm điều kiện có bạn đời cho mission Ring.** Mission sẽ khóa nhầm, và cảnh báo lint đã được xử lý bằng cách đổi câu chữ.
- **5.1, đồng bộ ngưỡng `syn_indie_promo_rank2`.** Đã khớp từ trước.

## Khi xong mỗi đợt

1. Thêm test vào `tests/` và đưa vào `npm test`.
2. Chạy `npm test` và `npm run build`.
3. Lời Việt mới theo `.agents/skills/vi-prose/SKILL.md`.
4. Ghi vào `PROGRESS_LOG.md`, rồi đánh dấu "đã xong" ở bảng trong file này và trong `KE_HOACH_TIEP_THEO.md`.
