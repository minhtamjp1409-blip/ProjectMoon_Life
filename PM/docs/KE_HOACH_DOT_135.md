# Kế hoạch Đợt 135–140: sửa logic, nâng cấp đạo diễn, event cuối đời

File này gom hai nguồn:

- **Bản rà soát logic ngày 06/11/2026**, gồm 6 nhóm phát hiện. Từng điểm đã được đối chiếu với code ở commit `349d745`.
- **Lời khuyên nâng cấp đạo diễn (AI Director)**, cùng ngày, kèm phần đo nhịp Dungeon theo tuổi.

Đợt 135–138 sửa lỗi. Đợt 139 nâng cấp đạo diễn, và chỉ bật sau khi đã chạy thử ở chế độ shadow.

Ký hiệu: **Đúng** là đã tái hiện trong code. **Đã xong** là đã sửa từ trước. **Sai** là không làm theo, kèm lý do. **Một phần** là đúng một nửa.

---

## Kết quả đối chiếu

| # | Phát hiện | Kết luận | Bằng chứng |
|---|---|---|---|
| 1.1 | Event bắt buộc không cập nhật `recentBeats` | **Sai** | `recordChoiceInGraph` (gồm `rememberDirectorEvent`) chạy ở mọi lần giải quyết major (`gameEngine.js:2838`, 2318, 2363, 2402). Các nhánh trả sớm chỉ là lúc *chọn* event; nhịp vẫn được ghi lúc *giải quyết*. Riêng việc minor và daily không đọc `recentBeats` là đúng, nhưng minor đã có `directorWeight` riêng, nên không ưu tiên. |
| 1.2 | `.find()` chặn hàng đợi thread | **Đã xong (Đợt 135)** | `weaverAI.js:847`: lọc qua `t.kind !== 'minor'` và `isEventEligible(…, { scripted: true })` ngay trong `.find(...)`. |
| 1.3 | `ring_patron_wants_a_face` cần điều kiện có bạn đời | **Đã xong, và hướng sửa sai** | Người đã khuất là của nhà bảo trợ, không phải của người chơi. Thêm điều kiện có bạn đời sẽ khóa nhầm mission. Đã đổi câu chữ ở `349d745`; lint còn 0 cảnh báo. |
| 2.1 | Ahn và Danh tiếng chạm trần, cuối đời không có chỗ tiêu | **Chờ chủ dự án (Đợt 138 mục 3)** | `driftOf` không có nhánh cho `wealth`; phí giữ tài sản giới hạn ở `Math.min(4, …)` (`yearPlanner.js:1424`). Khớp với số đo Dungeon ở mục 2.36. |
| 2.2 | Điểm `scheme` luôn cộng Leverage | **Đã xong (Đợt 138)** | `annualPlan.js`: Wing nhận `+2 Leverage`, Fixer/Syndicate giảm Heat và tiến độ hợp đồng, Distortion tăng Resonance. |
| 2.3 | Biến động thành phố dừng sau 40 tuổi | **Đã xong (Đợt 138)** | `cityConditions.js:22`: mở rộng lên `22–90` tuổi. |
| 3.1 | Phần lớn perk đồng đội không có tác dụng | **Đã xong (Đợt 136)** | `companionPerk(char, session)` trong `dungeonEngine.js` đọc đủ 14 loại perk cho cả chế độ chặng, Gauntlet, Clash và preview trên dock. |
| 3.2 | Thẻ `ego` thiếu né, Great Lake không có thẻ riêng | **Đã xong (Đợt 136)** | Thẻ `ego` đã có cộng né; `dungeon_great_lake` đã bật `cards: true` kèm 2 thẻ riêng `lake_harpoon` và `lake_chart`. |
| 3.3 | Gauntlet bỏ qua chặng 0–2 và `STAGE_VARIANTS` | **Đã xong (Đợt 136)** | Tầng 0 lượt 0 của `gauntletStage` gộp các lựa chọn vật phẩm mở màn (`reqItem`, như `con_kcorp_ampoule`) mà không tốn lượt đánh. |
| 4.1 | Chỉ số do NPC tự sống không có chip delta | **Đã xong (Đợt 137)** | `simulateNpcAutonomousLife` trả kèm `deltas` và `yearPlanner.js` truyền vào `pushLog`. |
| 4.2 | `child`/`ward` không có hành động lúc nhỏ, không đổi nghề lúc 18 | **Đã xong (Đợt 137)** | `child_play` xét tuổi của `child`/`ward` (`<= 15`, nhãn `"Dẫn đi dạo khu phố"`); đủ 18 tuổi chuyển sang nghề người lớn, kèm phản ứng bước ngoặt `reactNpcsToMajorTurn`. |
| 5.1 | Ngưỡng Syndicate độc lập bậc 2 lệch nhau | **Đã xong** | `eventsFactions.js:3305` đã là `rep: [45, 100], heat: [30, 100]`, khớp `eventConditions.js:422`. |
| 5.1b | Lương và `hasEstablishedStanding` bỏ qua `syndicateRank` | **Đã xong (Đợt 135)** | `economyModel.js`, `yearPlanner.js` và `gameEngine.js` đọc `Math.max(fingerRank, syndicateRank)` và gán `Star of the City` ở rank 3. |
| 5.2 | Minor của Workshop Craftsman không bao giờ hiện | **Đã xong (Đợt 135)** | `charHasWorkshopAccess` (`workshopAccess` / `workshopOrCombatGear`) mở các minor/cơ hội Workshop cho nhân vật theo nhánh Workshop. |
| 6.1 | Chặng 2 và 3 của `arc_middle_vengeance_saga` cùng là kỳ thi Rank 1 | **Đã xong (Đợt 135)** | Chặng 2 đổi sang `syn_middle_cousin_retaliation`, chặng 3 giữ `syn_middle_promo_big_sibling`. |
| 6.1b | Thread chặng 3 hết hạn sau 8 năm, trước khi đủ tuổi hoặc bậc | **Đã xong (Đợt 135)** | Thread chặng 3 / kỳ thi gắn `waitsForGate: true`, không hết hạn 8 năm khi còn giữ nghề/Finger và được ưu tiên khi rút kỳ thi. |
| 6.2 | Kết thúc `ripe_age` không hiện đoạn kết | **Đã xong (Đợt 135)** | `gameEngine.js` gán `char.lifeEnding = 'ripe_age'`, `topOfCareer` tính thêm Wing rank ≥ 3 và `syndicateRank` ≥ 3, `lifeEndings.js` có `closing`. |

---

## Đợt 135 — Mạch truyện bị kẹt (ưu tiên cao nhất)

Những lỗi này làm người chơi mất hẳn một nội dung, không chỉ lệch số.

1. **Chuỗi Middle (6.1).** Đổi chặng 2 của `arc_middle_vengeance_saga` sang một event không phải kỳ thi, ví dụ `syn_middle_book_of_vengeance` phần hai, hoặc bỏ `_rescue` khỏi `eventIds` rank 1. Chặng 3 giữ là kỳ thi rank 1.
2. **Hạn chờ của thread chặng 3 (6.1b).** Thread nào trỏ tới kỳ thi thăng cấp thì không hết hạn theo năm, chỉ hết khi nhân vật đổi nghề hoặc chết. Lưu thêm `waitsForGate: true` trên thread, và `yearPlanner.js:547` bỏ qua hạn 8 năm khi có cờ này.
3. **Hàng đợi thread (1.2).** Đổi `.find` ở `weaverAI.js:845` thành vòng lặp: chọn thread đầu tiên vừa đến hạn, vừa không phải `minor`, vừa có `isEventEligible(…, { scripted: true })`. Đây là bước đầu của mục "trạng thái thread" ở Đợt 139.
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
4. **Thẻ Great Lake (3.2).** Thêm `dungeon_great_lake: 'lake'` vào `themeOf`, cùng 2 thẻ đi theo luật sổ luật của hầm này, ví dụ `lake_harpoon` và `lake_chart`.

**Đo lại:** `node tools/sim/dungeon_sim.mjs 400 --stake=0,2 --policies=careful,informed`, chạy cả khi có và khi không có đồng đội. Mục tiêu: có đồng đội thì tỷ lệ chết giảm rõ, nhưng hầm khó vẫn còn rủi ro thật. Nếu bot `informed` có đồng đội mà tỷ lệ chết về 0 ở mọi hầm, perk đang quá mạnh.

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

**Đo lại:** `balance_sim.mjs 500 focused`, theo dõi tỷ lệ chạm trần 100 Ahn và Rep sau tuổi 40. Con số 17,5% chạm trần Rep là của bản rà soát; mình chưa tự đo lại.

---

## Đợt 139 — Nâng cấp đạo diễn (AI Director)

### Hiện trạng đã đo

- **Vẫn giữ hệ cũ, phát triển tiếp.** Hệ hiện tại đã có tác dụng. `director_shadow_audit.mjs 500`: trong tình huống khủng hoảng, event nguy hiểm giảm từ 41 xuống 25; lúc yên ổn, tăng từ 72 lên 99. Không thay bằng model AI ngoài.
- **Dungeon không vào quá sớm.**
  - Mọi event cổng `gate_*` yêu cầu từ 18 tuổi trở lên. Cổng đầu tiên đến 2–7 năm sau tuổi vào nghề (`firstGateAge`).
  - Ngoại lệ duy nhất là `ch_outskirts_ruins_expedition` (12–17 tuổi). Event này chỉ có ở xuất thân Outskirts, dẫn vào hầm dễ nhất, và người chơi tự chọn có vào hay không.
  - Không có đường nào đưa một nhân vật 16 tuổi lên WARP.
- **Dungeon được xếp theo lịch, không theo tình trạng.** `GATE_PROFILES` (`dungeonPacing.js:22`) đảm bảo mỗi nghề có 2–3 cổng, cách nhau 5–10 năm. Lịch này không xét HP, SP, năm đó yên hay biến cố, hay mạch truyện nào đang cao trào. Ngoài cổng, có 8 event khác mở Dungeon; phần lớn mở từ 19–22 tuổi.
- **Kho major theo lứa tuổi:**

  | Lứa tuổi | Số major |
  |---|---|
  | 18–30 | 633 |
  | 31–60 | 643–665 |
  | 61–70 | 570 |
  | 71–90 | 436 |
  | 91 trở lên | 150 |

  Kho không thưa đi sau 40 tuổi; nó thưa rõ sau 70.
- **Số lựa chọn người chơi thực sự gặp mỗi năm**, đo bằng `node tools/sim/pacing_by_age.mjs 80 focused`:

  | Tuổi | Major | Minor | Hợp đồng | Dungeon | Năm im lặng |
  |---|---|---|---|---|---|
  | 18–24 | 0,70 | 1,95 | 0,40 | 0,15 | 0% |
  | 25–32 | 0,58 | 1,97 | 0,46 | 0,16 | 0% |
  | 33–40 | 0,64 | 1,91 | 0,42 | 0,07 | 0% |
  | 41–50 | 0,76 | 1,80 | 0,28 | 0,02 | 0% |
  | 51–60 | 0,57 | 1,66 | 0,21 | 0,02 | 2% |
  | 61–75 | 0,49 | 1,72 | 0,11 | 0,02 | 4% |
  | 76+ | 0,21 | 1,79 | 0 | 0 | 1% |

  Mẫu sau 33 tuổi còn nhỏ: bot của script này xuống hầm khá liều nên phần lớn chết trước 30, và mỗi lứa tuổi sau 33 chỉ còn 45–72 năm sống. Kết luận vì vậy chỉ ở mức định hướng:
  - **Sau 40 tuổi, số event lớn không giảm** cho tới khoảng 60. Sau 60 nó giảm còn khoảng 0,5 mỗi năm, sau 75 còn 0,2.
  - **Dungeon giảm mạnh.** Từ 0,15–0,16 lượt mỗi năm ở tuổi 18–32 xuống 0,02 sau 40 tuổi, gấp khoảng 8 lần. Tuổi trung vị lúc vào hầm là 21–24.
  - **Hầu như không có năm nào im lặng.** Minor giữ đều khoảng 1,7–2 mỗi năm. Cảm giác "ít chuyện" sau 40 là do thiếu event lớn và Dungeon, không phải do không có gì xảy ra.
  - **17 tuổi đã có thể vào WARP và Lobotomy** (2 lượt trong mẫu). Lý do: tuổi vào nghề dao động 15–20 (`careerAge.js`), khung tuổi event bị dịch xuống theo (`careerAge.js:57`), và cổng đầu tiên đến từ tuổi vào nghề cộng 2. Mô phỏng không có ai vào hầm ở tuổi 16.
  - Có 4–5 trên 16 lượt vào Great Lake và Bloodfiend lúc HP dưới 40.
- **Blackboard bị bỏ qua.** `evaluateEventConsiderations(event, char, blackboard)` (`utilityCurves.js:74`) nhận `createCityBlackboard(char)` nhưng không dùng tới.

### Việc cần làm

1. **Một lịch chung cho cả năm.**
   - Gom vào một hàng đợi mọi thứ có thể xảy ra trong năm: hậu quả đã hẹn, mạch NPC, thăng tiến, event thường và lời mời Dungeon.
   - Luật cứng lọc trước: tuổi, nghề, District, NPC còn sống, trạng thái truyện. Sau đó mới tính điểm.
   - Event bắt buộc có suất ưu tiên riêng, nhưng vẫn phải hợp lệ.
   - Mục tiêu: tránh việc `yearPlanner` xếp một đằng rồi `weaverAI` chọn một nẻo, và tránh nhiều biến cố lớn dồn vào cùng một năm.
2. **Gắn thẻ event bằng tay.** Event quan trọng khai báo `route`, `location`, `danger`, `relief`, `npcRole`, `arc`, `riskTier`, `dungeonTheme`.
   - `directorTags` chỉ đoán từ ID và câu chữ khi event không có thẻ.
   - Lý do: hiện chỉ cần đổi câu văn là có thể đổi nhịp chọn event. Một event nguy hiểm nhưng không trừ HP ngay cũng bị đoán sai.
   - Làm thử trên một nhóm mẫu (Fixer, Finger, Wing, NPC, Dungeon) trước khi mở rộng.
3. **Trạng thái thread.** Mỗi thread ghi `ready`, `waitingForGate`, `temporarilyBlocked` hoặc `invalid`, kèm tuổi chờ và lý do.
   - Khi người chơi đủ điều kiện, tăng dần cơ hội xuất hiện.
   - Khi đổi nghề hoặc NPC liên quan chết, đóng thread hoặc chuyển sang nhánh hậu quả phù hợp.
   - Mục này gộp lỗi `.find()` và hạn 8 năm của Đợt 135.
4. **Lời mời Dungeon theo cơ hội.** Tách "thế giới đưa ra lời mời" khỏi "người chơi bước xuống hầm".
   - Giữ hạn mức tối thiểu của `GATE_PROFILES`, nhưng thời điểm do điểm số quyết định.
   - Tăng cơ hội khi năm đó yên, HP và SP ổn, hoặc có lý do cụ thể: nghề, nơi ở, hợp đồng, NPC hay vật phẩm.
   - Giảm cơ hội khi vừa xuống hầm, đang bị thương nặng (HP dưới 40), hoặc có mạch truyện khác đang cao trào.
   - **Sàn tuổi tuyệt đối 18 cho các hầm nguy hiểm** (WARP, Lobotomy, Great Lake, Bloodfiend, The Head). Sàn này không bị dịch theo tuổi vào nghề, và cổng đầu tiên dùng `max(18, tuổi vào nghề + 2)`. Outskirts và Backstreets giữ nguyên luật hiện tại.
   - **Không mở cổng khi HP dưới 40**, mà dời sang năm sau. Riêng lời mời bắt buộc theo cốt truyện thì vẫn hiện, kèm cảnh báo.
   - **Dàn lời mời ra sau tuổi 40.** Một phần hạn mức `GATE_PROFILES` để dành cho khoảng 35–60 tuổi, và mở rộng tuổi trần của cổng (hiện là 55–75) cho Color và các bậc cao. Mục tiêu là sau 40 tuổi vẫn có khoảng 0,05–0,08 lượt Dungeon mỗi năm, thay vì 0,02.
5. **Nhớ theo chủ đề, không chỉ theo ID.** Sau một cảnh NPC phản bội, tạm giảm các cảnh phản bội khác. Sau nhiều năm làm Fixer, ưu tiên một hậu quả liên quan tới Office còn dang dở hơn một cảnh nghề chung chung. Dùng cửa sổ vài năm với mức phạt giảm dần.
6. **Độ khó tách khỏi nhịp kể.** Director chỉ được đổi *tần suất* hiểm họa và khoảng nghỉ. Nó không được ngầm hạ xác suất thất bại hay sát thương sau khi người chơi đã chọn, giống nguyên tắc của AI Director trong Left 4 Dead. Viết một test khóa nguyên tắc này: cùng seed và cùng lựa chọn thì kết quả không phụ thuộc `directorPolicy`.
7. **Một ảnh chụp trạng thái đầu năm.** Dùng `createCityBlackboard` để làm ảnh chụp đầu năm, và để event thường, NPC và Dungeon cùng đọc nó. Sửa `evaluateEventConsiderations` cho dùng blackboard.
8. **Năm cuối đời (sau 60).** Sau 60 tuổi, số event lớn mỗi năm giảm còn 0,5, sau 75 còn 0,2. Thêm một nhóm event về di sản, người kế nghiệp, sức khỏe và lời mời cuối, gắn thẻ `relief`/`legacy`, để những đời sống thọ không trôi qua nhiều năm im lặng.

### Thứ tự và cách bật

1. Làm xong Đợt 135 trước, vì nó sửa luồng ưu tiên và thread.
2. Thêm thẻ cho nhóm event mẫu.
3. Cho Director mới chạy ở chế độ `shadow` trên cùng seed. So với bản hiện tại qua 500 đời, theo các số sau:
   - event sai ngữ cảnh;
   - thread chờ quá lâu;
   - số lần lặp chủ đề trong 5 năm;
   - số lời mời và số lần thực sự vào Dungeon;
   - tuổi và HP lúc vào hầm;
   - tỷ lệ chết theo độ rủi ro;
   - tỷ lệ năm im lặng theo lứa tuổi (`pacing_by_age.mjs`).
4. Chỉ bật `active` khi số lỗi logic bằng 0, phân bố nội dung tốt hơn, và độ khó không bị làm phẳng.

---

## Đợt 140 — Event sau 60 tuổi và đời sống thọ

### Vì sao cần

Sau 60 tuổi, nhân vật thường đang ở bậc cao nhất. Các event kéo dài tuổi thọ (`apex_longevity_*`, mở từ 38–42 tuổi tới 120) có thể đưa đời sống lên trên 100. Nhưng kho event lại thưa đi đúng lúc này.

**Số major theo nghề và lứa tuổi** (đếm event mà khung tuổi chạm vào lứa đó):

| Nghề | 61–70 | 71–85 | 86–100 | 101+ |
|---|---|---|---|---|
| Syndicate (cả 5 Finger cộng lại) | 283 | 240 | 219 | 17 |
| Dùng chung mọi nghề | 89 | 63 | 34 | 13 |
| Fixer và Color | 84 | 77 | 59 | 36 |
| Wing (cả nhóm) | 79 | 24 | 11 | 10 |
| Distortion | 29 | 27 | 21 | 3 |
| Outcast | 3 | 0 | 0 | 0 |

**Ba nguyên nhân:**
1. **Tuổi trần đặt cứng.** 291 major có tuổi trần từ 90 đến 99 (195 event dừng đúng ở 90). Riêng các event đỉnh cao của Finger dừng ở 95. Một đời đã kéo dài tới 120 sẽ mất gần hết kho này sau 90–95 tuổi.
2. **Đa số event cuối đời là kết thúc.** `eventsApexTwilight.js` và `eventsWingApex.js` (từ 76–90 tuổi) phần lớn là lựa chọn kết thúc đời: trao lại ghế, bị lật đổ, ra đi. Chọn xong là hết đời, nên chúng không lấp được những năm ở giữa.
3. **Có nghề không có gì cho cuối đời.** Wing chưa lên bậc 3 chỉ còn 7 event ở tuổi 71–85 và 0 sau 85. Outcast không có event nào sau 70. Fixer không lên Color cũng thưa dần.

### Đề xuất, từ rẻ tới đắt

1. **Kéo dài tuổi trần cho người sống thọ (rẻ, tác dụng lớn nhất).**
   - Khi nhân vật có `ApexLongevity`, `FullBodyProsthetic`, `Bloodfiend` hoặc `Distorted`, event có tuổi trần từ 85 trở lên được tính thêm 30 năm.
   - Event có tuổi trần thấp hơn 85 (cảnh của tuổi trẻ) giữ nguyên.
   - Làm bằng một luật trong `matchesEventContext`, không phải sửa từng event.
   - Trước khi bật, rà một lượt 291 event này: event nào kể chuyện thể chất của người trẻ thì gắn `elderOk: false`.
2. **Một chương "cuối đời" cho mọi nghề.** Viết 6 khung event dùng chung, mỗi khung có biến thể cho Fixer, Finger, Wing, Workshop và Outcast:
   - **Người kế nghiệp:** chọn giữa đệ tử, con cái hoặc người ngoài. Nối vào hệ `lineage` sẵn có, để lựa chọn này ảnh hưởng tới đời sau.
   - **Kẻ thách thức trẻ:** một người trẻ muốn chiếm chỗ bạn. Có thể giải quyết bằng một trận ngắn, một cuộc đàm phán hoặc nhường lại.
   - **Hồ sơ đời:** Hana, Index hoặc Wing muốn ghi chép lại đời bạn. Bạn chọn kể thật, kể đẹp đi, hay đốt bỏ.
   - **Cái giá của sống lâu:** bảo trì chân tay giả, cơn đói của Bloodfiend, phụ thuộc ampoule K Corp. Cảnh khác nhau theo cách bạn kéo dài tuổi thọ.
   - **Tiễn người quen:** NPC già đi và chết (`director.js:436`, từ 74 tuổi), nhưng hiện chưa có cảnh tiễn biệt. Viết minor đám tang theo vai: sư phụ, bạn thân, đối thủ.
   - **Thế hệ thứ ba:** cháu, hoặc đệ tử của đệ tử, tìm đến bạn.
3. **Event gọi lại chính đời người chơi.** Viết vài khung đọc bộ nhớ nhân quả của Weaver (`weaver.nodes`) để nhắc lại lựa chọn từ 30–50 năm trước: người được cứu ở WARP, kẻ bị phản bội, Office cũ. Một khung có thể cho ra nhiều cảnh khác nhau tùy đời, nên được nhiều nội dung nhất trên mỗi dòng viết.
4. **Kết thúc chủ động cho mọi nghề từ 90 tuổi.**
   - Distortion có `distort_arc_century_calamity_climax`. Color, Finger bậc 3 và Wing bậc 3 có event twilight.
   - Fixer chưa lên Color, Workshop và Outcast thì chưa có. Viết cho mỗi nghề một event 3 lựa chọn: kết thúc êm, một lần cuối liều mạng, hoặc tiếp tục sống.
5. **Luật đạo diễn cho người già.** Sau 60 tuổi, giảm trọng số event `danger` và tăng `relief` cùng `legacy`. Vẫn giữ khoảng một event "đe dọa di sản" mỗi 5 năm, để cuối đời không thành chuỗi năm phẳng. Thẻ `legacy` lấy từ mục 2 của Đợt 139.

### Đo

- Thêm tùy chọn vào `pacing_by_age.mjs` để bắt đầu đời ở tuổi 60 với nhân vật đã ở đỉnh (Color, Finger bậc 3 hoặc Wing bậc 3) và có `ApexLongevity`, chạy tới 120.
- Mục tiêu: ở tuổi 60–120, có ít nhất 0,4 event lớn mỗi năm, năm im lặng dưới 5%, và không event nào lặp trong 10 năm.
- Hiện trạng: 0,49 mỗi năm ở tuổi 61–75, 0,21 sau 75, và sau 90 thì chưa đo được vì mẫu quá nhỏ.

**Thứ tự đề xuất:** làm mục 1 trước, vì mục này chỉ cần một luật và đo được ngay. Tiếp theo là mục 4, rồi mục 2. Mục 3 làm sau cùng, khi Đợt 139 đã có thẻ chủ đề.

---

## Đợt 141 — Đo perk đồng đội và WARP (đã xong 10/11)

Đo bằng `node tools/sim/dungeon_sim.mjs 200 --policies=measured --companion=all`. Số dưới đây là tỷ lệ chết (cả hồi sinh W Corp) trên tỷ lệ hoàn thành.

| Đồng đội | Great Lake | WARP | Lobotomy | Outskirts |
|---|---|---|---|---|
| Không ai | 12/26 | 43,5/56,5 | 3,5/51 | 1/77 |
| `veteran` (parry), trước khi sửa | 7,5/48 | 11/89 | 0,5/59 | 0/100 |
| `veteran`, sau khi sửa | 9,5/30 | 27/73 | 2/57 | 0/100 |
| `tinkerer` (trap), trước khi sửa | 4/42 | 15/85 | 0,5/65,5 | 0/99,5 |
| `tinkerer`, sau khi sửa | 5,5/33,5 | 35,5/64,5 | 2/58 | 0/99,5 |

- Đã sửa: `parry` một lần mỗi chuyến; perk `flee` chỉ khi HP ≤ 40; `trap_mitigation` giảm một nửa trong giao tranh; WARP về sát thương 1,6; mô phỏng tách cột `restored`.
- Còn lại: đo các perk Clash và Sanity bằng bot `clasher`/`reader`. Outskirts có đồng đội nào cũng lên trên 92%; hầm dễ nhất nên chấp nhận được, nhưng cần xem lại nếu muốn Outskirts vẫn là một thử thách khi đi theo nhóm.

## Không làm

- **1.1, gọi `rememberDirectorEvent` cho mọi event bắt buộc.** Việc này đã diễn ra lúc giải quyết event.
- **1.3, thêm điều kiện có bạn đời cho mission Ring.** Mission sẽ khóa nhầm, và cảnh báo lint đã được xử lý bằng cách đổi câu chữ.
- **5.1, đồng bộ ngưỡng `syn_indie_promo_rank2`.** Đã khớp từ trước.

## Khi xong mỗi đợt

1. Thêm test vào `tests/` và đưa vào `npm test`.
2. Chạy `npm test` và `npm run build`.
3. Lời Việt mới theo `.agents/skills/vi-prose/SKILL.md`.
4. Ghi vào `PROGRESS_LOG.md`, rồi đánh dấu "đã xong" ở bảng trong file này và trong `KE_HOACH_TIEP_THEO.md`.
