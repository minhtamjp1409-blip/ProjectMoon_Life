# Việc cần sửa sau đợt test ngày 14/11/2026

File này ghi những gì đợt test tìm ra và cách sửa từng việc. Mỗi mục có bốn phần: số đo hiện tại, nguyên nhân, cách sửa, và cách đo lại. Khi một mục đã xong, gạch nó khỏi bảng tổng, ghi kết quả vào `PROGRESS_LOG.md`, rồi xóa phần chi tiết ở dưới.

Mục nào ghi "đã xác minh" là đã đọc code hoặc chạy lại để chắc chắn. Mục nào ghi "cần xác minh" thì phải kiểm trước khi sửa.

## Nguồn số liệu

Tất cả chạy trên commit `2a54e20` (Đợt 177):

| Lệnh | Quy mô |
|---|---|
| `node tools/sim/balance_report.mjs 300` | 300 đời, bot chọn ngẫu nhiên |
| `node tools/sim/story_logic_audit.mjs 300` | 300 đời, kiểm logic và độ đa dạng |
| `node tools/sim/policy_balance_report.mjs 30` | 8 kiểu bot, mỗi kiểu 30 đời |
| `node tools/sim/dungeon_sim.mjs 300` | 300 lượt cho mỗi cặp dungeon và kiểu chơi |
| `node tools/sim/pacing_by_age.mjs 200 focused` | 200 đời, nhịp theo tuổi |
| `node tools/sim/branch_experience.mjs 300` | 300 đời, nhịp theo nghề |
| `node tools/qa/test_live_website_runs.mjs` | 2 lượt chơi thật trên bản Vercel, 1440px và 390px |

Phần đã ổn: không có vi phạm logic nào, và không tràn ngang ở cả hai khổ màn hình.

## Bảng tổng

| Mã | Việc | Nhóm | Rủi ro | Đợt đề xuất |
|---|---|---|---|---|
| A1 | Báo cáo bot đếm sai số đời lên Color | Công cụ đo | Thấp | 178 |
| A2 | Script QA trên Vercel kẹt vì chọn lựa chọn đang khóa | Công cụ đo | Thấp | 178 |
| B1 | Cơ chế người thân đỡ đòn chết gần như không bao giờ xảy ra | Cân bằng | Thấp | 178 |
| B2 | Người chơi mới chết trong dungeon vì thiếu thông tin | Cân bằng, giao diện | Trung bình | 178 |
| B3 | Không ai đi qua hồi đầu của Reverberation Ensemble | Cân bằng dungeon | Trung bình | 179 |
| B4 | Fixer chơi an toàn ở Grade 9 suốt đời | Cân bằng nghề | Trung bình | 179 |
| B5 | Lên Color rồi đều thành Distortion (4/4 đời) | Cân bằng nghề | Cần xác minh | 179 |
| B6 | Tiền giảm dần sau tuổi 25 | Kinh tế | Trung bình | 180 |
| B7 | Nhánh Wing ít biến cố nhất | Nội dung | Trung bình | 180 |
| C1 | 13 event hệ quả chưa từng xuất hiện | Nội dung | Thấp | 179 |
| C2 | Gần nửa số event chưa từng xuất hiện | Nội dung | Thấp | Theo dõi |
| C3 | Người tính trước gặp gấp đôi số event | Thiết kế | Trung bình | 180 |
| D1 | Tốc độ x8 và x16 dùng được mọi lúc | Học từ trang mẫu | Trung bình | 178 hoặc 179 |
| D2 | 2–3 slot lưu | Học từ trang mẫu | Cao | Đợt riêng |
| D3 | Thẻ District và Singularity trên màn chơi | Học từ trang mẫu | Thấp | 178 |

## Nhóm A. Công cụ đo

### A1. Báo cáo bot đếm sai số đời lên Color

**Số đo.** `policy_balance_report.mjs` báo `color% = 0%` cho cả 8 kiểu bot. Thế nhưng bot `lookahead` có "Grade tốt nhất G0", tức là đã lên Color.

**Nguyên nhân (đã xác minh).** Mình chạy lại 30 đời `lookahead` và ghi trạng thái sau mỗi năm:

| Đời có `fixerGrade === 0` | Đời từng có cờ `ColorFixer` | Đời còn cờ lúc chết | Đời lên Color rồi thành Distortion |
|---|---|---|---|
| 4 | 4 | 0 | 4 |

Báo cáo chỉ đọc cờ `ColorFixer` sau khi đời đã kết thúc ([policy_balance_report.mjs:95](../tools/sim/policy_balance_report.mjs#L95)). Khi Color hóa Distortion, `triggerDistortionTransformation` gỡ cờ này ([careerPipeline.js:831](../src/engine/careerPipeline.js#L831)) và ghi `color_fixer` vào `unlockedRecords`. Vì thế báo cáo luôn ra 0.

**Cách sửa.**
1. Trong vòng lặp năm của `simulatePolicyCohort` ([policy_balance_report.mjs:55](../tools/sim/policy_balance_report.mjs#L55)), thêm biến `everColor` cho mỗi đời. Sau mỗi năm, gán `everColor = true` nếu `char.flags.includes('ColorFixer') || char.isColorFixer || char.job === 'Color Fixer'`.
2. Ở cuối đời, đếm theo `everColor || char.unlockedRecords?.includes('color_fixer')`, thay cho dòng 95.
3. Thêm cột `colorThenDistorted%` để thấy riêng số Color sa vào Distortion. B5 cần cột này.
4. Kiểm các báo cáo khác có đọc `ColorFixer` lúc cuối đời không: `grep -rn "ColorFixer" tools/sim`. Báo cáo nào đọc thì sửa theo cùng cách.

**Đo lại.** `node tools/sim/policy_balance_report.mjs 30` phải cho `color%` của `lookahead` khoảng 10–15% (4/30 trong lần đo này). Thêm một khẳng định vào `tests/test_ai_director_and_bots.mjs`: với một seed đã biết sẽ lên Color, báo cáo đếm đời đó là Color.

### A2. Script QA trên Vercel kẹt vì chọn lựa chọn đang khóa

**Số đo.** Lượt chơi trên khổ 390px dừng ở tuổi 31 khi nhân vật vẫn sống. Log lặp hàng chục lần cùng một dòng: `[Age 31] ... Event: "Thư từ các Finger"`.

**Nguyên nhân (đã xác minh).** Event `syn_choose_finger_allegiance` ([eventsFactions.js:104](../src/data/eventsFactions.js#L104)) có những lựa chọn cần `need: { fingerInvited: 'Thumb' }` (và tương tự cho các Finger khác). Script chấm điểm mọi lựa chọn, kể cả lựa chọn đang khóa ([test_live_website_runs.mjs:278](../tools/qa/test_live_website_runs.mjs#L278)), rồi gọi thẳng `s.selectEventChoice(bestIdx)`. Engine từ chối đúng cách ([eventResolution.js:47](../src/engine/eventResolution.js#L47), `if (!choiceIsAvailable(choice, char)) return char;`), nên trạng thái không đổi và script chọn lại đúng lựa chọn đó mãi.

Người chơi thật không gặp lỗi này vì nút đã bị khóa trên giao diện. Lỗi chỉ nằm trong script.

**Cách sửa.**
1. Script chạy bên trong trang, nên không import được `choiceIsAvailable`. Có hai cách:
   - **Cách nên dùng:** trong [main.jsx:9](../src/main.jsx#L9), cạnh `window.__gameStore`, gắn thêm `window.__choiceIsAvailable = choiceIsAvailable`. Chỉ gắn khi `import.meta.env.DEV` hoặc khi URL có `?qa=1`, để bản phát hành không lộ thêm hàm.
   - Cách dự phòng: đọc DOM, bỏ qua những nút `.choice` có `disabled` hoặc `aria-disabled="true"`.
2. Trong vòng chấm điểm event (dòng 278) và minor (khoảng dòng 293), bỏ qua lựa chọn chưa mở trước khi gọi `evaluateSurvival`.
3. Thêm chốt chống kẹt: lưu `age`, `seasonIdx` và id event đang chờ. Nếu cả ba không đổi sau 20 vòng, ghi `STALL` cùng id event vào báo cáo, chọn lựa chọn đầu tiên còn mở, và nếu vẫn kẹt thì dừng lượt đó với lỗi rõ ràng.

Bot mô phỏng trong `tools/sim/lib` không mắc lỗi này: `choicePolicy.mjs:189` và `lookaheadPolicy.mjs:44` đã lọc bằng `choiceIsAvailable`.

**Đo lại.** Chạy lại `node tools/qa/test_live_website_runs.mjs` với cùng seed. Lượt trên điện thoại phải đi qua tuổi 31, và báo cáo không có dòng `STALL`.

## Nhóm B. Cân bằng

### B1. Người thân đỡ đòn chết gần như không bao giờ xảy ra

**Số đo.** `Death-save used 0.0%` trong 300 đời. Bond tốt nhất ở tuổi 30 có p25/trung vị/p75/p90 = 31/50/60/69.

**Nguyên nhân (đã xác minh).** [lifeEnding.js:36-42](../src/engine/lifeEnding.js#L36-L42) cần bond ≥ 90 với vợ/chồng hoặc người yêu, và ≥ 95 với bạn hoặc thầy. Ngay cả 10% người chơi gắn bó nhất cũng chỉ đạt 69. Cơ chế này đã viết xong, có cả cảnh `savior` ([cutsceneTriggers.js:16](../src/engine/cutsceneTriggers.js#L16)) và thẻ chương ([chapters.js:120](../src/engine/chapters.js#L120)), nhưng người chơi gần như không bao giờ thấy.

**Cách sửa.**
1. Đưa ngưỡng ra hằng số đầu file `lifeEnding.js`: `DEATH_SAVE_BOND = { spouse: 80, partner: 80, friend: 85, mentor: 85 }`. Thay hai số `90` và `95` ở dòng 41 bằng tra bảng này.
2. Chạy `balance_report` với ngưỡng mới. Mục tiêu: 3–8% số đời dùng tới. Nếu vượt 10% thì nâng thêm 5 điểm. Cơ chế này phải hiếm để còn nặng ký.
3. Cho người chơi biết cơ chế này có tồn tại. Trong [NpcDossierModal.jsx:157](../src/features/chronicle/components/NpcDossierModal.jsx#L157), khối `bond-box`, thêm một dòng khi bond đạt ngưỡng và `!char.usedDeathSave`:
   - Tiếng Việt: "Người này sẽ lao vào đỡ đòn thay bạn, một lần duy nhất."
   - Tiếng Anh: "They would take a killing blow for you, once."

   Khi bond còn thiếu dưới 10 điểm, hiện câu nhẹ hơn: "Thêm chút nữa, người này sẽ liều mạng vì bạn." Chạy `node tools/lint/vi_prose_scan.mjs` sau khi thêm chữ.
4. Cập nhật `tests/test_chapters.mjs` và `tests/test_cutscene_triggers.mjs` nếu chúng dựng nhân vật với bond 90/95. Thêm một test: bond 80 với vợ/chồng thì cứu được, bond 79 thì không.
5. Cập nhật mục đỡ đòn chết trong `docs/LUAT_HIEN_HANH.md`.

**Đo lại.** `node tools/sim/balance_report.mjs 300`, dòng `Death-save used` nằm trong 3–8%.

### B2. Người chơi mới chết trong dungeon vì thiếu thông tin

**Số đo** (`dungeon_sim.mjs`, stake 0):

| Dungeon | Chọn ngẫu nhiên chết | Cẩn thận chết | Có thông tin (`informed`) chết |
|---|---|---|---|
| Lobotomy Ruin | 88,7% | 0,3% | 0,7% |
| Bloodfiend Carnival | 86,3% | 0% | 0% |
| Great Lake | 88,3% | 2,0% | 6,0% |
| Backstreets Night | 85,0% | 0,7% | 0,7% |

Bot ngẫu nhiên chỉ rút lui 10–14% số lần. Trong báo cáo 8 bot, 50–77% số đời của bot luật cố định có chết trong dungeon, so với 20–27% ở bot biết đọc tỷ lệ.

**Nguyên nhân (cần xác minh một phần).** Khoảng cách gần 90 điểm cho thấy dungeon không quá khó. Người chơi không đọc tỷ lệ thì chết, người đọc thì sống. Cần kiểm xem tỷ lệ và nút rút lui có đủ nổi bật trong `DungeonDock.jsx` không, nhất là trên 390px.

**Cách sửa.**
1. **Cảnh báo HP thấp.** Trong [DungeonDock.jsx](../src/features/chronicle/components/DungeonDock.jsx), khi `char.stats.health < 40` và dungeon còn cho rút (`!def.noRetreat`, và với Ensemble là còn ở hồi đầu):
   - Đưa nút rút lui (lựa chọn có `ch.isFlee`, quanh dòng 501) lên đầu danh sách, hoặc thêm viền cảnh báo.
   - Hiện một dòng ngay trên các lựa chọn, ví dụ "HP còn {n}. Chặng tiếp theo có thể giết bạn." Lấy số rủi ro từ `evaluateDungeonChoiceOdds` để câu nói đúng với tình hình.
2. **Tỷ lệ chết hiện trên từng lựa chọn.** Nếu `evaluateDungeonChoiceOdds` có trả về khả năng mất HP lớn hơn HP hiện có, gắn nhãn "Có thể chết" lên lựa chọn đó. Dùng màu cảnh báo đã có trong token, không thêm màu mới.
3. **Không tự động chọn thay người chơi.** Chỉ làm nổi bật, vì rút lui là quyết định của người chơi.
4. Đo bố cục ở 390px bằng `tools/qa/measure_dungeon_mobile.mjs`: dòng cảnh báo không được đẩy lựa chọn đầu tiên ra khỏi màn hình.

**Đo lại.** Thêm kiểu bot `alert` vào `dungeon_sim.mjs`: chọn ngẫu nhiên, nhưng luôn rút khi giao diện hiện cảnh báo. Mục tiêu: tỷ lệ chết của `alert` dưới 30% ở bốn dungeon trên. Nếu đạt, cảnh báo đã đủ thông tin cho người chơi mới.

### B3. Không ai đi qua hồi đầu của Reverberation Ensemble

**Số đo.** Cả 6 kiểu bot có tính toán đều rời nhà hát 100% số lượt, trung bình ở chặng 3, mất khoảng 62 SP. Bot ngẫu nhiên chết 49% và rời 41%. Như vậy phần sau hồi đầu gần như không ai thấy.

**Nguyên nhân (cần xác minh).** Dock ghi "Chỉ được rời ở hồi đầu" ([DungeonDock.jsx:231](../src/features/chronicle/components/DungeonDock.jsx#L231)). Mọi bot cẩn thận đều rời ở cơ hội cuối, vì SP đã xuống quá thấp để đi tiếp an toàn. Cần đọc luật rút lui của bot trong `dungeon_sim.mjs` để chắc bot rời vì SP, không phải vì một luật cứng như "luôn rời khi được".

**Cách sửa.**
1. Đọc cách bot quyết định rời Ensemble trong `dungeon_sim.mjs`. Nếu đó là luật cứng, sửa bot trước rồi đo lại, vì có thể dungeon không có lỗi.
2. Nếu đúng là do SP: giảm lượng SP mất ở các nhịp của hồi đầu trong [dungeonEnsemble.js](../src/data/dungeonEnsemble.js) (các `beat(...)` quanh dòng 59–93), khoảng một phần ba. Hoặc cho nhịp "Đếm nhịp riêng" hồi lại SP khi thành công.
3. Thêm lý do để ở lại: báo trước phần thưởng của hồi cuối (`ENSEMBLE_SCORE_ITEM`, bản tổng phổ viết dở) ngay trên nút rời đi, để người chơi biết mình bỏ lại gì.

**Đo lại.** `node tools/sim/dungeon_sim.mjs 300 --ids=reverberation_ensemble`. Mục tiêu: bot `informed` đi hết ít nhất 30% số lượt, tỷ lệ chết dưới 25%.

### B4. Fixer chơi an toàn ở Grade 9 suốt đời

**Số đo.** Lượt chơi thật trên desktop: Fixer sống tới 114 tuổi nhưng ở Grade 9 suốt đời. Script chơi theo hướng an toàn: kế hoạch năm 2 nghỉ, 1 làm, không vào dungeon, từ chối hợp đồng có rủi ro chết.

**Nguyên nhân (cần xác minh).** Merit không phải chỗ tắc: Fixer được +2 Merit mỗi năm ([yearEnd.js:565](../src/engine/yearEnd.js#L565)), sau 90 năm là hơn 180, trong khi Grade 8 chỉ cần 10 Merit và 8 Rep ([careerGates.json](../src/data/careerGates.json)). Thăng hạng đi qua kỳ thi Hana ([careerMilestones.js:581-585](../src/engine/careerMilestones.js#L581-L585), `fixerPromotionOfferChance`). Có ba khả năng:
- Rep không đủ 8, vì chơi an toàn không tăng Rep.
- Kỳ thi có được mời, nhưng script từ chối vì kỳ thi có rủi ro.
- Kỳ thi không bao giờ được mời.

**Cách sửa.**
1. Xác minh trước: chạy lại lượt chơi desktop với cùng seed, ghi `rep`, `merit` và mọi event có id chứa `exam` hoặc `promotion` cùng lựa chọn script đã bấm.
2. Nếu tắc ở Rep: cho kế hoạch năm loại "làm việc" cộng +1 Rep mỗi năm cho Fixer, tối đa đủ cho Grade 7.
3. Nếu script từ chối kỳ thi: đây là thiết kế đúng (không thi thì không lên). Nhưng nên có một lựa chọn an toàn trong kỳ thi Grade 8 và Grade 7 (ví dụ thi viết hồ sơ, nhận ít Merit hơn và không mất HP), để người chơi thận trọng vẫn lên được tới G7.
4. Nếu kỳ thi không bao giờ được mời: kiểm `fixerPromotionOfferChance` với nhân vật chơi an toàn.
5. Không cho thăng hạng tự động quá G7. Các Grade cao vẫn phải đánh đổi rủi ro.

**Đo lại.** Thêm bot `safe` vào `choicePolicy.mjs`, chơi giống script QA: từ chối dungeon và rủi ro chết. Mục tiêu: Grade trung vị lúc 50 tuổi là G7 hoặc G8, không phải G9.

### B5. Lên Color rồi đều thành Distortion

**Số đo.** Cả 4/4 đời `lookahead` lên Color sau đó đều thành Distortion (xem A1).

**Nguyên nhân (cần xác minh).** Mẫu 4 đời quá nhỏ để kết luận. Có thể bot `lookahead` chủ động chọn Distortion vì nó tính ra lợi hơn. Cũng có thể Color quá dễ sa vào Distortion vì Resonance cao.

**Cách sửa.**
1. Làm A1 xong rồi chạy `policy_balance_report.mjs 100` chỉ với `lookahead` và `tactical`. Xem cột `colorThenDistorted%`.
2. Với mỗi đời Color hóa Distortion, ghi event và lựa chọn ngay trước khi hóa, cùng Resonance và SP lúc đó.
3. Nếu là do bot chọn: Distortion đang được thưởng quá hào phóng so với giữ Color, cần xem lại phần thưởng ở event Carmen.
4. Nếu là do luật tự động (SP về 0, Resonance chạm ngưỡng): cho Color một vùng đệm, ví dụ ngưỡng Resonance cao hơn 10 điểm, vì Color là người đã chứng tỏ ý chí.

**Đo lại.** Tỷ lệ Color hóa Distortion dưới 50% với bot `tactical`. Với `lookahead` thì chấp nhận cao hơn nếu đó là lựa chọn có chủ đích.

### B6. Tiền giảm dần sau tuổi 25

**Số đo.** Tiền trung vị (Ahn) theo tuổi: 18 lúc 25, 8 lúc 35, 4 lúc 50. p90 cũng giảm: 57, 52, 44.

**Nguyên nhân (cần xác minh).** Chưa đọc chi tiết thu chi theo năm. Cần đo xem tiền ra chủ yếu đi đâu: chữa thương, nợ, phí Syndicate hay chi tiêu cố định.

**Cách sửa.**
1. Thêm vào `audit_resource_balance.mjs` (hoặc một công cụ mới) bảng thu chi theo nhóm tuổi: mỗi nguồn cộng hoặc trừ `wealth` được gắn nhãn, cộng dồn theo 10 năm.
2. Khi biết khoản chi lớn nhất, chọn một trong các hướng:
   - Thêm nguồn thu sau tuổi 40 gắn với nghề: Fixer nhận học trò trả phí, Wing có trợ cấp thâm niên, Syndicate thu phí địa bàn.
   - Giảm chi phí chữa thương khi đã có vết sẹo cũ ở cùng chỗ.
3. Giữ tinh thần The City: đa số vẫn nghèo. Mục tiêu chỉ là đường tiền không đi xuống đều với mọi người.

**Đo lại.** `balance_report.mjs 300`: tiền trung vị lúc 50 tuổi không thấp hơn lúc 35.

### B7. Nhánh Wing ít biến cố nhất

**Số đo** (`branch_experience.mjs`, 300 đời):

| Nhánh | Event lớn mỗi 10 năm | Năm không đổi nghề lẫn quan hệ |
|---|---|---|
| Wing Employee | 5,5 | 84,8% |
| Fixer | 8,3 | 68,6% |
| Syndicate | 7,9 | 69,3% |
| Distortion | 6,0 | 93,7% |

**Cách sửa.**
1. Chạy `node tools/sim/event_reach.mjs 300 --routes --events=wing_` để biết event Wing nào có mà không xuất hiện, trước khi viết thêm.
2. Ưu tiên mở cửa cho event Wing sẵn có. Chỉ viết thêm khi đã hết cửa để mở: 4–6 event giữa sự nghiệp (25–45 tuổi) như điều chuyển phòng ban, đồng nghiệp bị Singularity của Corp làm hại, hay đợt sa thải.
3. Văn bản mới theo `.agents/skills/vi-prose`, không chép nội dung từ game tham khảo.

**Đo lại.** Wing đạt ít nhất 7 event lớn mỗi 10 năm, và tỷ lệ năm đứng yên dưới 75%.

## Nhóm C. Nội dung chưa tới tay người chơi

### C1. 13 event hệ quả chưa từng xuất hiện

**Số đo.** `story_logic_audit.mjs 300` cho thấy 13/44 event hệ quả chưa lần nào chạy:

`csq_parent_historic_passing`, `csq_parent_old_comrade`, `csq_middle_ambush_adult`, `csq_warp_survivor_debt`, `csq_ncorp_heretic_hunt`, `csq_taboo_workshop_raid`, `csq_thumb_capo_trial`, `csq_color_first_mandate`, `csq_seven_debt_reckoning`, `csq_color_sponsor_aftermath`, `csq_color_sponsor_aftermath_fallen`, `csq_thread_outskirts_map`, `csq_fixer_false_bounty`.

**Cách sửa.**
1. Với mỗi id, in ra điều kiện của nó (cờ, ký ức, nghề, tuổi). Rồi đếm qua 300 đời xem điều kiện nào chưa từng thỏa, giống cách Đợt 174 làm với cửa khóa (`describeNeedGaps` trong `lockedDoors.js`). Viết thành `tools/sim/consequence_reach.mjs`.
2. Chia làm ba loại:
   - **Điều kiện hiếm nhưng hợp lý**, ví dụ hai event `csq_color_*` cần đã lên Color. Giữ nguyên, kiểm lại sau khi A1 cho số Color thật.
   - **Điều kiện đọc một cờ không ai gắn.** Đây là lỗi, sửa cờ hoặc sửa điều kiện.
   - **Điều kiện quá chặt**, ví dụ cần hai cờ cùng lúc. Nới bớt một cờ.
3. Thêm khẳng định vào `story_logic_audit` hoặc một test mới: mỗi event hệ quả phải có ít nhất một đời trong 1000 đời seed cố định chạm tới, trừ những id được ghi rõ trong danh sách ngoại lệ.

**Đo lại.** Số event hệ quả chưa xuất hiện giảm từ 13 xuống tối đa 4, và những id còn lại đều có lý do ghi trong danh sách ngoại lệ.

### C2. Gần nửa số event chưa từng xuất hiện

**Số đo.** Trong 300 đời ngẫu nhiên: 390/839 event lớn và 454/880 event nhỏ chưa lần nào chạy. Bot ngẫu nhiên chết sớm (trung vị 26–27 tuổi trong báo cáo bot), nên con số này phóng đại vấn đề.

**Cách sửa.** Chưa sửa. Đo lại sau B2 và B4: khi người chơi sống lâu hơn, số event được gặp sẽ tăng. Lúc đó mới dùng `director_reach.mjs` để tìm event thật sự không có đường vào.

### C3. Người tính trước gặp gấp đôi số event

**Số đo.** `lookahead` gặp 112 event mỗi đời, đạt G5+ ở 47% số đời. `tactical` (cùng luật, không nhìn trước) gặp 57 event và đạt G5+ ở 7% số đời.

**Nguyên nhân.** Bot `lookahead` biết lựa chọn nào mở kỳ thăng hạng trong 1–2 năm tới. Người chơi thường không có thông tin này. Đã ghi ở mục "Cân bằng cần xem lại" trong `docs/KE_HOACH_TIEP_THEO.md`.

**Cách sửa.**
1. Trên thẻ manh mối năm (`yearLeads.js` và thành phần hiển thị manh mối), nếu một manh mối dẫn tới kỳ thăng hạng thì ghi rõ: "Có thể mở kỳ thi Grade 7".
2. Trên lựa chọn event lớn, nếu kết quả cộng Merit hoặc Rep đủ đưa nhân vật qua ngưỡng của `careerGates.json`, thêm nhãn "Đủ điều kiện thi" trong phần `Deltas`.

**Đo lại.** Thêm bot `informed-planner`: dùng luật `tactical`, nhưng ưu tiên lựa chọn có nhãn mới. Mục tiêu: G5+ đạt 20–30%, tức là nằm giữa `tactical` và `lookahead`.

## Nhóm D. Học cơ chế từ trang mẫu

Trang tham khảo: `https://project-moon-life.cityborn.workers.dev/`. Chỉ học cơ chế, không chép chữ, event hay hình ảnh.

### D1. Tốc độ x8 và x16 dùng được mọi lúc

**Hiện trạng (đã xác minh).**
- Ở x1, một năm là 30 giây (`YEAR_MS = 30000`, [gameStore.js:46](../src/store/gameStore.js#L46)).
- Các nút tốc độ là x1, x2, x3 ([PlayBar.jsx:18-23](../src/features/chronicle/components/PlayBar.jsx#L18-L23)). x8 là chế độ "lướt" `SKIM_SPEED`, chỉ hiện khi `canSkimSpeed` cho phép, tức là từ đời thứ 2 hoặc khi bật tự chọn ([gameStore.js:392](../src/store/gameStore.js#L392)).
- x8 thật ra không chạy x8 mọi lúc. Nó chỉ chạy x8 trong những đoạn yên ả, còn lại thì quay về tốc độ trước đó (`preSkimSpeed`).
- Luật này bị viết hai lần, một ở `getEffectiveSpeed` ([gameStore.js:401-424](../src/store/gameStore.js#L401-L424)) và một trong vòng tick ([gameStore.js:1037-1042](../src/store/gameStore.js#L1037-L1042)). Hai bản đã lệch nhau một chút: bản trong tick không xét `hasBlocker`.
- Hạn giờ của event nhỏ trừ theo thời gian thật ([gameStore.js:1012](../src/store/gameStore.js#L1012)), không theo tốc độ. Vì vậy x16 không làm người chơi mất thời gian đọc event nhỏ.

**Cách sửa.**
1. **Gộp luật tốc độ về một chỗ.** Trong tick, thay khối dòng 1037–1042 bằng `const effectiveSpeed = getEffectiveSpeed(s);`. Kiểm lại `tests/test_batches_122_123.mjs` và `tests/test_play_screen_smoke.mjs` vì hai test này đọc `skimOn`.
2. **Tách "lướt" khỏi "tốc độ".** Tốc độ là số người chơi chọn: 1, 2, 3, 8, 16. Lướt là công tắc riêng ("tự tua năm yên ả"), dùng lại cài đặt `autoSkipQuietYears` đã có trong theme store. Sửa `setSpeed` ([gameStore.js:479](../src/store/gameStore.js#L479)): bỏ trường hợp đặc biệt `speed === 8`, chỉ còn `preSkimSpeed` để nhớ tốc độ trước khi dừng.
3. **Danh sách tốc độ mới** trong `PlayBar.jsx`:
   ```js
   export const BASE_SPEEDS = [
     { spd: 1, secs: 30 },
     { spd: 2, secs: 15 },
     { spd: 3, secs: 10 },
     { spd: 8, secs: 4 }
   ];
   export const FAST_SPEED = { spd: 16, secs: 2 };
   ```
   x8 mở cho mọi người. x16 dùng `canSkimSpeed`, tức là mở từ đời thứ 2, để đời đầu không trôi qua quá nhanh.
4. **Phím tắt.** Trong [LiveStageFeed.jsx:1641-1656](../src/features/chronicle/components/LiveStageFeed.jsx#L1641-L1656), `]` và `[` đi theo danh sách `[0, 1, 2, 3, 8, 16]` (bỏ 16 nếu chưa mở). Phím Space ở dòng 1638 và 1979 tiếp tục bằng `preSkimSpeed`, không cần nhánh `curSkimOn ? 8 : …`.
5. **Kiểm hiệu năng ở x16.** Mỗi tick 200ms, x16 đẩy `yearProgress` thêm khoảng 10,7%. Cần xác minh `runDueItems` xử lý hết mọi mục đã tới hạn trong cùng một tick, không bỏ sót. Ghi hình 10 năm ở x16 bằng Performance của Chrome, khung hình không được rơi dưới 50 fps trên máy tầm trung.
6. **Trên 390px**, thanh tốc độ có thêm nút. Đo lại bằng `tools/qa/measure_home_fold.mjs` hoặc chụp bằng CDP. Nếu chật, gộp x8 và x16 vào một nút bấm xoay vòng.

**Đo lại.**
- Unit test: `getEffectiveSpeed` trả 16 khi `speed = 16` và không có gì chặn. Trả 0 khi có event lớn đang chờ.
- Chạy thử trên trình duyệt: x16 trong 30 giây đi được khoảng 16 năm nếu không có event lớn, và không event nhỏ nào bị bỏ qua mà không có log.

### D2. 2–3 slot lưu

**Hiện trạng (đã xác minh).**
- Đời đang chơi lưu ở một khóa localStorage `RUN_KEY = 'pm_city_chronicles_run_v1'` ([gameStore.js:45](../src/store/gameStore.js#L45)). Đọc ở dòng 119, xóa ở dòng 130, ghi ở dòng 574.
- Bản sao trên server dùng slot `'main'` mặc định ([cityArchiveAPI.js:37-45](../src/services/api/cityArchiveAPI.js#L37-L45)), gọi ở [gameStore.js:578](../src/store/gameStore.js#L578) và [gameStore.js:728](../src/store/gameStore.js#L728).
- Backend đã nhận slot bất kỳ theo mẫu `^[a-z0-9_-]{1,32}$` ([PM_BE/Program.cs:41](../../PM_BE/Program.cs#L41), các route ở dòng 85–94).
- Dữ liệu dùng chung cho cả người chơi (`pastLives`, dòng họ, Codex) chỉ có một bản. `pendingLegacy` lấy đời đầu tiên chưa có `endingId`: `savedMeta.pastLives.find((life) => !life.endingId)` ([gameStore.js:476](../src/store/gameStore.js#L476)). Dòng này **giả định chỉ có một đời đang chơi**.

**Đây là việc rủi ro cao nhất trong file**, vì đụng tới lưu trữ và di cư dữ liệu. Nên làm thành một đợt riêng.

**Cách sửa.**
1. **Quyết định thiết kế trước khi code.** Dòng họ và Codex dùng chung giữa các slot hay tách riêng?
   - Dùng chung: một slot kết thúc thì đời sau của dòng họ có thể bắt đầu ở slot khác. Đơn giản cho người chơi, nhưng phải gắn mỗi đời đang chơi với `runId`.
   - Tách riêng: mỗi slot là một dòng họ độc lập. An toàn hơn, nhưng Codex và thành tựu phải gộp lại khi hiển thị.

   Đề xuất: Codex và thành tựu dùng chung, dòng họ tách theo slot.
2. **Khóa theo slot.** Thêm `activeSlot` vào store, giá trị `'main' | 'slot2' | 'slot3'`. Khóa localStorage thành `` `${RUN_KEY}:${slot}` ``. Mọi lời gọi `cityArchiveAPI.getRunState/saveRunState/clearRunState` đều truyền `activeSlot`.
3. **Di cư dữ liệu cũ.** Khi khởi động, nếu `RUN_KEY` cũ còn dữ liệu và `` `${RUN_KEY}:main` `` chưa có, chép sang `main` rồi xóa khóa cũ. Viết trong `saveSchema.js` cạnh các bước di cư khác, kèm test.
4. **Sửa `pendingLegacy`.** Mỗi mục trong `pastLives` đang chơi mang thêm `slot`. Dòng 476 tìm theo `slot === activeSlot`.
5. **Bảng mục lục slot.** Lưu riêng một khóa nhỏ `pm_city_chronicles_slots_v1`: `{ slot, name, age, job, regionId, savedAt }`. Trang chủ đọc khóa này để hiện danh sách, không phải parse cả đời chơi.
6. **Giao diện trang chủ.** Thay nút "Chơi tiếp" bằng danh sách 3 ô: ô có dữ liệu hiện tên, tuổi, nghề, District và thời điểm lưu, ô trống hiện "Đời mới". Bắt đầu đời mới ở ô đã có dữ liệu phải hỏi xác nhận, dùng lại mẫu `Modal.confirm` trong `newLife` của [PlayBar.jsx](../src/features/chronicle/components/PlayBar.jsx). Trên 390px, danh sách xếp dọc.
7. **Backend.** Kiểm `PlayerStore` xem có giới hạn số slot cho mỗi người chơi không. Nếu chưa có, thêm giới hạn 3 slot cộng `main`, để một client lỗi không ghi vô hạn.

**Đo lại.**
- Test di cư: dữ liệu ở khóa cũ chuyển sang `main` và chơi tiếp được.
- Test hai slot: chơi slot 1 tới tuổi 20, chuyển sang slot 2 tạo đời mới, quay lại slot 1 thì vẫn đúng tuổi 20 và đúng NPC.
- Test `pendingLegacy`: kết thúc đời ở slot 2 không làm đổi đời đang chơi ở slot 1.
- Chạy cả `npm test` và một lượt CDP tải lại trang giữa chừng.

### D3. Thẻ District và Singularity trên màn chơi

**Hiện trạng (đã xác minh).** Dữ liệu có đủ trong `REGIONS` ([worldData.js](../src/data/worldData.js)): tên, `singularityVi/En`, `safety`, `medical`. Hồ sơ nhân vật đã có thẻ District ([CharacterDossierCard.jsx:686-712](../src/features/chronicle/components/CharacterDossierCard.jsx#L686-L712)), nhưng nằm trong khối `<details>` gập sẵn, nên người chơi phải tự mở mới thấy.

**Cách sửa.**
1. Tách phần đầu thẻ (tên District và Singularity) thành thành phần nhỏ `DistrictStrip.jsx`. Lấy `region` giống [CharacterDossierCard.jsx:913](../src/features/chronicle/components/CharacterDossierCard.jsx#L913).
2. Đặt dải này ở đầu khung chơi, cạnh tuổi và mùa trong `PlayBar`. Nội dung có hai phần: tên District đậm, rồi Singularity ở cỡ nhỏ hơn. Tách hai phần bằng xuống dòng hoặc khoảng cách, không dùng dấu chấm giữa.
3. Bấm vào dải thì mở hồ sơ ở đúng khối "Khu vực & xuất thân", bằng cách đặt `open` cho `<details>` đó.
4. Trên 390px, chỉ hiện tên District. Singularity rút gọn thành một dòng có dấu ba chấm, đầy đủ khi bấm vào.
5. Dùng class và token sẵn có (`dossier-context-card`, `context-card-tag`). Không thêm màu mới.
6. Nếu nhân vật đổi nơi sống trong đời, dải phải theo `char.regionId` hiện tại. Cần xác minh trường nào lưu nơi ở hiện tại.

**Đo lại.** Chụp CDP ở 1440px và 390px: dải hiện đủ, không tràn ngang, không đẩy lựa chọn của event lớn xuống dưới mép màn hình. Chạy `tests/test_play_screen_smoke.mjs`.

## Đề xuất chia đợt

| Đợt | Gồm | Lý do |
|---|---|---|
| 178 | A1, A2, B1, B2, D3 | Rủi ro thấp, người chơi thấy ngay, và sửa công cụ đo trước khi cân bằng tiếp |
| 179 | B3, B4, B5, C1, D1 | Cần số đo đúng từ A1 và bot mới từ B2, B4 |
| 180 | B6, B7, C3 | Cần đo thu chi và reach theo nhánh trước khi viết thêm |
| Đợt riêng | D2 | Đụng tới lưu trữ và di cư dữ liệu, cần test riêng |

## Kiểm tra chung sau mỗi đợt

1. `npm test` và `npm run build` đều qua.
2. `node tools/lint/vi_prose_scan.mjs` không vượt ngưỡng nếu có thêm chữ tiếng Việt.
3. Chạy lại các lệnh ở mục "Nguồn số liệu" có liên quan, ghi số trước và sau vào `PROGRESS_LOG.md`.
4. Lượt chơi CDP ở 1440px và 390px không có lỗi console, không tràn ngang.
5. Commit, push lên `main`, kiểm Vercel (tìm chuỗi mới trong bundle) và Render (`/api/health` trả 200).
