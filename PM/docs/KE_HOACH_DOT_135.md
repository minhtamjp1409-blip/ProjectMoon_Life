# Kế hoạch Đợt 135–139: sửa logic và nâng cấp đạo diễn

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
| 1.2 | `.find()` chặn hàng đợi thread | **Đúng** | `weaverAI.js:845`: chỉ lấy thread đầu tiên đến hạn. Nếu thread đó không đủ điều kiện, các thread major hợp lệ phía sau phải chờ. |
| 1.3 | `ring_patron_wants_a_face` cần điều kiện có bạn đời | **Đã xong, và hướng sửa sai** | Người đã khuất là của nhà bảo trợ, không phải của người chơi. Thêm điều kiện có bạn đời sẽ khóa nhầm mission. Đã đổi câu chữ ở `349d745`; lint còn 0 cảnh báo. |
| 2.1 | Ahn và Danh tiếng chạm trần, cuối đời không có chỗ tiêu | **Đúng** | `driftOf` không có nhánh cho `wealth`; phí giữ tài sản giới hạn ở `Math.min(4, …)` (`yearPlanner.js:1424`). Khớp với số đo Dungeon ở mục 2.36. |
| 2.2 | Điểm `scheme` luôn cộng Leverage | **Đúng** | `annualPlan.js:53` cộng `leverage` cho mọi nghề, nhưng chỉ Wing dùng chỉ số này. |
| 2.3 | Biến động thành phố dừng sau 40 tuổi | **Đúng** | `cityConditions.js:22`: `char.age < 25 \|\| char.age > 40`. |
| 3.1 | Phần lớn perk đồng đội không có tác dụng | **Đúng** | Engine không đọc 9 loại `loot`, `salvage`, `merit`, `clash`, `flee`, `trap_mitigation`, `sanity_shield`, `check_bonus`, `strain_reduction` (lưu ý: chữ `'clash'` trong `dungeonCombat.js` là tên hành động, không phải perk). `parry` và `calm` chỉ chạy ở chế độ chặng. |
| 3.2 | Thẻ `ego` thiếu né, Great Lake không có thẻ riêng | **Một phần** | Thẻ `ego` đã có cộng né, vì `evadeChance` đọc `cardEffectOf(session).check`. Great Lake đúng là chưa có thẻ riêng: `themeOf` (`dungeonCards.js:42`) chỉ có `warp`, `lcorp`, `blood`, `alley`. |
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

## Không làm

- **1.1, gọi `rememberDirectorEvent` cho mọi event bắt buộc.** Việc này đã diễn ra lúc giải quyết event.
- **1.3, thêm điều kiện có bạn đời cho mission Ring.** Mission sẽ khóa nhầm, và cảnh báo lint đã được xử lý bằng cách đổi câu chữ.
- **5.1, đồng bộ ngưỡng `syn_indie_promo_rank2`.** Đã khớp từ trước.

## Khi xong mỗi đợt

1. Thêm test vào `tests/` và đưa vào `npm test`.
2. Chạy `npm test` và `npm run build`.
3. Lời Việt mới theo `.agents/skills/vi-prose/SKILL.md`.
4. Ghi vào `PROGRESS_LOG.md`, rồi đánh dấu "đã xong" ở bảng trong file này và trong `KE_HOACH_TIEP_THEO.md`.
