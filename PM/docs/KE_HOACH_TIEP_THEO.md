# Kế hoạch nâng cấp toàn diện Đợt 142–162

File này thay cho các bản rà soát đã hoàn thành (`KE_HOACH_DOT_135.md`, `EVENT_NARRATIVE_AUDIT_2026_11_05.md`, `NPC_CAN_SUA.md`). Toàn bộ Đợt 113–162 đã hoàn tất và ghi trong `PROGRESS_LOG.md`.

Luật chơi đang chạy nằm ở `docs/LUAT_HIEN_HANH.md`, lore và giọng văn ở `UNIVERSE.md`, lịch sử thay đổi ở `PROGRESS_LOG.md`.

## Tóm tắt các đợt thực hiện (Đợt 142–172)

| Đợt | Hạng mục | Phạm vi | Trạng thái |
|---|---|---|---|
| **142** | **Kinh tế cuối đời & Quỹ Bảo Tồn vượt trần 100 Ahn** (`reserveAhn`, 3 khoản đầu tư lớn tuổi 40+: tài trợ Office/địa bàn, trang bị đồng đội, quỹ di sản đời sau) | `dungeonEngine.js`, `gameEngine.js`, `yearPlanner.js`, `eventsApexTwilight.js` | đã xong |
| **143** | **Tăng độ phủ kho sự kiện lớn (814 major)** (ưu tiên sự kiện chưa từng gặp qua các đời `bloodlineSeenEvents`) | `weaverAI.js`, `gameEngine.js`, `gameStore.js` | đã xong |
| **144** | **Hồi ức nhân quả 25–40 năm & Cảnh tiễn biệt người thân qua đời vì tuổi già** (`elder_callback_echo_of_youth`, `bereavement_elder_old_friend_passing`) | `director.js`, `eventsApexTwilight.js` | đã xong |
| **145** | **Thẻ Di cảo chia sẻ cuối đời (Shareable Epitaph Card & Copy Summary)** (nút sao chép bản tóm tắt Di cảo định dạng đầy đủ kèm Seed, danh vị, di vật, cột mốc và Quỹ Bảo Tồn) | `LiveStageFeed.jsx` | đã xong |
| **146** | **Gọt câu chữ tiếng Việt đợt 2 (`vaClause`)** (xóa sạch toàn bộ 80 lỗi `, và ` trong `eventsExpansion.js` về `0`, hạ trần kiểm định trong `package.json` từ `2135` xuống `2055`) | `src/data/eventsExpansion.js`, `package.json` | đã xong |
| **147** | **Tối ưu phân tách chunk bundle (`vite.config.js`)** (tách `story-fingers-a`, `story-fingers-b`, `story-contracts` để hạ kích thước chunk lớn nhất và không tạo vòng lặp import) | `vite.config.js` | đã xong |
| **148** | **Sửa lỗi kìm hãm tuổi già trên mọi Route & Mở rộng trần tuổi `65+`** (sửa mất hợp đồng của `Color Fixer`, sửa `apexLongevityEventId`, chặn lời mời Section thường cho Color, nâng trần tuổi sự kiện `hi >= 65` thêm `+30` năm cho người sống thọ) | `careerPipeline.js`, `affiliation.js`, `eventConditions.js`, `eventsApexTwilight.js` | đã xong |
| **149** | **Bổ sung Kết thúc chủ động `90+` & Chương tuổi già `60+` cho toàn bộ các nhánh** (`Wing Employee`, `Independent Syndicate`, `Workshop`, `Outcast`) | `src/data/eventsApexTwilight.js` | đã xong |
| **150** | **Đại tu Route `Distortion` (Cơ chế nhịp năm + 3 Hình thái Tiến hóa + Sự kiện Tiền kiếp/LCD + Kết thúc Hóa Kén Dị Thể)** | `yearPlanner.js`, `annualMeritOpportunities.js`, `eventsDistortionParityExpansion.js` | đã xong |
| **151** | **Rà soát Đợt 139–150** (`elderOk: false` cho 3 event con nhỏ, Quỹ Bảo Tồn trên hồ sơ và HUD, token `{departed}`, legacy bỏ danh sách trùng, cổng Dungeon cuối đời mỗi 12 năm từ tuổi 45, bot đo nhịp dùng chung `measured`) | `dungeonPacing.js`, `gameEngine.js`, `CharacterDossierCard.jsx`, `tools/sim/pacing_by_age.mjs` | đã xong |
| **152** | **Ensemble chờ người bị thương, hồi ức tuổi già đọc ký ức thật, đo nhịp theo nghề** (`ENSEMBLE_MIN_HP`, `youthEchoOf` và cờ `youthEcho`, `pacing_by_age --job`) | `ensemblePath.js`, `yearPlanner.js`, `eventsApexTwilight.js`, `tools/sim/pacing_by_age.mjs` | đã xong |
| **153** | **Cân bằng sinh tồn sau tuổi 40 cho `Fixer` & `Syndicate`** (dùng `effectiveAge` trong `rollSeasonMishap`, hạ `exposureIndex`, đệm `fatal` khi `hp - dmg <= 18`, hoãn khảo thí thăng bậc khi `HP < 42`, giảm hợp đồng khi `HP < 38`, giữ lại `1 HP` khi trượt khảo thí thăng cấp lúc khỏe mạnh `beforeHealth >= 45`) | `fateEngine.js`, `yearPlanner.js`, `careerPipeline.js`, `gameEngine.js` | đã xong |
| **154** | **Nội tại năm cho 3 Hình thái `Distortion` & Rút khẩn cấp Quỹ Bảo Tồn (`reserveAhn`)** (3 nội tại cuối năm của *Lãnh Chúa Mê Cung*, *Dị Thể Tỉnh Thức*, *Tai Ương Nguyên Thủy* và tự động rút tối đa `20 Ahn` từ `reserveAhn` khi cạn tiền mặt để tránh bán thận trả nợ) | `src/engine/yearPlanner.js` | đã xong |
| **155** | **Nâng cấp Perk đồng đội `strain_reduction` & `clash` trong Dungeon** (`strainMult < 1` xóa thêm `-4 Strain` mỗi khi qua tầng; `clashBonus > 0` hồi `+3 HP` & `+2 SP` khi thắng đọ chiêu/kiểm định sức mạnh) | `dungeonEngine.js`, `dungeonCombat.js` | đã xong |
| **156** | **Hiển thị Hình thái Distortion, Tiền kiếp & Huy hiệu "Mới trong dòng họ" trên UI** (`CharacterDossierCard.jsx`, `LiveStageFeed.jsx`) | `CharacterDossierCard.jsx`, `LiveStageFeed.jsx` | đã xong |
| **157** | **Tách chunk `story-minors`/`story-dailies` & Gọt câu chữ tiếng Việt đợt 3 (`vaClause: 2015`)** (`vite.config.js`, `apexCommissions.js`, `eventsApexTwilight.js`, `package.json`) | `vite.config.js`, `apexCommissions.js`, `eventsApexTwilight.js`, `package.json` | đã xong |
| **158** | **Rà soát Đợt 153–157** (`discoverySeen` tách khỏi `bloodlineSeenEvents` để nhãn "Mới trong dòng họ" hiện được, `VIGOR_MOMENTUM` cho số xem trước, `TRIAL_MIN_HP` chặn kỳ thi khi HP dưới 42, tách 27 câu nối "; ", công cụ `hp_sources.mjs`) | `gameStore.js`, `weaverAI.js`, `dungeonEngine.js`, `careerPipeline.js` | đã xong |
| **159** | **Âm thanh theo ngữ cảnh sự kiện, kết đời & nhịp tim nguy kịch** (`playEventCue`, `playLifeFinale`, `lifeFinaleKindFor`, `playHeartbeat` khi HP/SP nguy kịch, giữ nguyên gate `sceneOwnsSound()` cho cutscene) | `audioEngine.js`, `sceneContext.js`, `LiveStageFeed.jsx`, `CharacterDossierCard.jsx` | đã xong |
| **160** | **Biểu tượng SVG các phe, bảng danh vị mọi route, hào quang Carmen & thẻ Di cảo 1200x760** (`FactionCrest.jsx`, `crestKindFor`, `rankPlateOf` mở rộng cho Distortion/Syndicate/Workshop, `.world-carmen` + `prefers-reduced-motion`, `buildLifeSummaryAndLegacy` thêm `finger`/`colorHex` cho `exportDossierCardPNG`) | `FactionCrest.jsx`, `sceneContext.js`, `WorldBackdrop.jsx`, `world.css`, `play.css`, `gameEngine.js`, `exportDossierCard.js` | đã xong |
| **161** | **Tách chunk mã nguồn `engine` khỏi `index`** (tách `src/engine/`, `src/services/`, `entryTiers.js`, `dungeonEnsemble.js` sang chunk `engine`, giữ các helper UI nghe nhìn ở `index`, 0 vòng lặp phụ thuộc) | `vite.config.js` | đã xong |
| **162** | **Mạch truyện nhiều hồi tuổi già & gọt câu chữ tiếng Việt đợt 4 (`vaClause`)** (thêm `distort_arc_primordial_blood_tide`, 3 major `elder_syndicate_*`, nâng `NARRATIVE_ARCS` lên 8 mạch; giảm `vaClause` trong `eventsFingerRing.js` & `eventsFingerExtra.js` từ 2015 xuống 1800, giữ `relativeMa: 0` và hạ trần `package.json` xuống 1805) | `eventsDistortionParityExpansion.js`, `eventsApexTwilight.js`, `narrativeArcEngine.js`, `eventsFingerRing.js`, `eventsFingerExtra.js`, `package.json` | đã xong |
| **163** | **Fixer bị thương kéo dài** (đo `hp_sources.mjs`: HP dưới 40 trong 35–43% số năm ở tuổi 25–50; hồi máu từ event lớn 2,0/năm so với Wing 3,0; xem lại mức hồi cuối năm và cách minor tính phí HP khi đã kiệt sức) | cân bằng | đã xử lý ở Đợt 169: người chơi biết nghỉ còn 16% số năm dưới 40 HP |
| **164** | **Rà soát Đợt 159–162** (`idNames` cho biểu tượng và âm thanh event, bỏ `char.finger` khỏi `playEventCue`, lời phó tướng không khẳng định ký ức, `resolveAccent` chỉ nhận hex 6 chữ số) | `sceneContext.js`, `audioEngine.js`, `eventsApexTwilight.js`, `exportDossierCard.js` | đã xong |
| **165** | **Thang chữ năm vai trò và chữ đọc trên điện thoại** (`--t-meta`…`--t-lede` bằng rem thay 12 cỡ nửa pixel; nhật ký điện thoại giữ sàn 16px; thẻ sự kiện nhỏ có đếm giờ từ 13px lên theo cỡ chữ truyện; tiêu đề thẻ tính từ `--story-size`) | `tokens.css`, `chronicle.css`, 11 file CSS, 5 file JSX, `DESIGN.md` | đã xong |
| **166** | **Đánh bóng màn chơi** (chip giá cho lựa chọn tốn Ahn trong Request, thẻ kế hoạch năm mở ở đầu, nhãn "Sát hạch của Hana" đúng chữ hoa, tiêu đề mục cột hồ sơ cùng cấp, bảng hồ sơ điện thoại không lặp tên, bỏ viền dày một bên ở thẻ hầm và khung Syndicate) | `LiveStageFeed.jsx`, `YearPlanDock.jsx`, `CharacterDossierCard.jsx`, `play.css`, `chronicle.css`, `dungeon-chrome.css` | đã xong |
| **167** | **Giữ focus và chữ minor trên điện thoại** (thẻ event và cutscene giữ phím Tab trong hộp thoại qua `useFocusTrap`; minor trên điện thoại 16px lời kể, 15.5px nhãn lựa chọn như thẻ event) | `useFocusTrap.js`, `LiveStageFeed.jsx`, `CutsceneLayer.jsx`, `chronicle.css` | đã xong |
| **168** | **Lời kể giữ lời về con người** (trạng thái NPC `away` có ngày về; 7 lựa chọn "tránh mặt", "đi xa", "không bao giờ đi cùng" nay đổi trạng thái thật; sửa khóa `bonds` không có tác dụng ở `aff_partner_reckoning`; đồng minh thẻ luật hầm loại người đã rời đi; công cụ `consequence_census.mjs` và trần 159 cờ không ai đọc) | `npcStatus.js`, `director.js`, `yearPlanner.js`, 3 file dữ liệu, `consequence_census.mjs` | đã xong |
| **169** | **Năm dưỡng thương và mẫu kế hoạch năm** (HP dưới 50 và từ 2 ô Nghỉ ngơi: 3 HP mỗi ô, bỏ Request năm đó; mẫu Giữ sức, Kiếm sống, Người thân, Rèn giũa; bot mô phỏng lập kế hoạch năm, thêm kiểu người chơi `cautious`) | `annualPlan.js`, `YearPlanDock.jsx`, `choicePolicy.mjs`, `pacing_by_age.mjs`, `hp_sources.mjs` | đã xong |
| **170** | **Director đếm và nhìn xa hơn top 24** (`directorProbe` và `director_reach.mjs`: đủ điều kiện, lọt top 24, được chọn; 6% lượt rút dành cho event đủ điều kiện mà đời này chưa gặp) | `weaverAI.js`, `director_reach.mjs` | đã xong |
| **171** | **Custom event chỉ chạy trong đời thử nghiệm** (khắc event đánh dấu đời là thử nghiệm; đời thường không rút custom event; hồ sơ và di cảo ghi rõ; không gửi số liệu chơi) | `weaverAI.js`, `gameStore.js`, `WeaverAiPage.jsx`, `CharacterDossierCard.jsx`, `LifeEndStep.jsx` | đã xong |
| **172** | **Mục tiêu dungeon** (cứu người, lấy bằng chứng, thu hồi hàng, giữ đường rút; giao lúc vào hầm, quyết ở chặng cuối, mỗi lựa chọn để lại người quen, sẹo, vật phẩm, Heat hoặc Merit; rút sớm ghi việc bỏ dở) | `dungeonObjectives.js`, `dungeonEngine.js`, `DungeonDock.jsx` | đã xong |

---

## Chi tiết từng đợt

### Đợt 142 — Kinh tế cuối đời & Quỹ Bảo Tồn vượt trần 100 Ahn
1. **Không mất trắng Ahn vượt trần 100 (`char.reserveAhn`):**
   - Trong `dungeonEngine.js` (`settleRun`) và `gameEngine.js` (khi giải quyết hợp đồng và sự kiện), mỗi khi `wealth` cộng thêm vượt quá trần `100`, phần vượt trần (`overflow`) được chuyển vào `char.reserveAhn` (Quỹ Bảo Tồn / Tích lũy ngoài sổ).
   - Trong `legacyKeepsake.js` và `createNewCharacter`, `reserveAhn` (cùng cờ đầu tư di sản) cộng thêm Ahn khởi đầu và điểm di sản cho thế hệ kế tiếp.
2. **Ba khoản đầu tư lớn sau tuổi 40 (`elder_investment_*` / lựa chọn đầu tư):**
   - **Tài trợ Office / Mở rộng Địa bàn (`35 Ahn`):** Gắn cờ `EndgameOfficePatron`, cộng lương thụ động hằng năm (`+4 Ahn/năm`), `+6 Rep`, `+5 Network` và `+6` sức mạnh hợp đồng.
   - **Trang bị Workshop cho Đồng đội (`30 Ahn`):** Gắn cờ `CompanionMasterworkGear`, cường hóa đồng đội đang đi cùng (`+15 Bond`, tăng `checkBonus` thêm `+0.05`, giảm thêm `10%` sát thương trong Dungeon và tăng tỉ lệ `companionLeadChance`).
   - **Quỹ Di Sản Huyết Thống (`40 Ahn`):** Gắn cờ `LineageEndowmentFund`, chuyển vào `reserveAhn` để đời con cháu tiếp theo khởi đầu với `+18 Ahn`, `+6 Rep` và giữ nguyên độ bền kỷ vật.

### Đợt 143 — Tăng độ phủ kho sự kiện lớn (809 major)
1. **Theo dõi sự kiện đã gặp qua nhiều thế hệ (`bloodlineSeenEvents`):**
   - Trong `weaverAI.js` (`scoreEventUtility`), những sự kiện chưa từng xuất hiện trong `char.bloodlineSeenEvents` (tổng hợp từ `pastLives` hoặc truyền vào `char`) được nhân hệ số khám phá `x1.35`, giúp người chơi chơi nhiều đời liên tục bắt gặp các sự kiện mới trong kho 809 major.
2. **Cân bằng trọng số nhóm sự kiện hiếm:**
   - Tăng nhẹ trọng số cơ sở cho các sự kiện nhánh Finger/Syndicate, Wing và Workshop đang có `weight` quá thấp hoặc dải tuổi quá hẹp để tăng tỉ lệ xuất hiện tự nhiên trong một đời.

### Đợt 144 — Hồi ức nhân quả 25–40 năm & Tiễn biệt người thân tuổi già
1. **Sự kiện gọi lại nhân quả xa (`elder_callback_echo_of_youth`):**
   - Đọc `char.weaver.nodes` từ `20+` năm trước (hoặc các lựa chọn lớn thời trẻ ở tuổi `18–35`) để mở một sự kiện hồi tưởng / gặp lại hệ quả cũ ở tuổi `55–120`.
2. **Sự kiện tiễn biệt người thân qua đời vì tuổi già (`bereavement_elder_old_friend_passing`):**
   - Khi một NPC thân thiết (`mentor`, `friend`, `partner`, `spouse`) qua đời vì tuổi già (`director.js:436`) và có `bond >= 50`, mở khóa sự kiện tiễn biệt cho phép người chơi đến viếng, nhận lại vật kỷ niệm hoặc hoàn thành lời hẹn cũ.

### Đợt 145 — Thẻ Di cảo chia sẻ cuối đời (Shareable Epitaph Summary)
- Trên màn hình kết thúc cuộc đời trong `LiveStageFeed.jsx`, thêm nút **"Sao chép Di cảo" / "Copy Epitaph"** (cạnh nút chia sẻ Seed) tạo ra một bản tóm tắt văn bản trình bày đẹp mắt gồm: Tên, Tuổi thọ, Nghề/Danh hiệu đỉnh cao, Kết cục (`lifeEnding`), Di vật để lại, Tối đa 5 cột mốc tiêu biểu và Mã Seed, kèm phản hồi `"Đã chép Di cảo"` tức thì.

### Đợt 146 — Gọt câu chữ tiếng Việt đợt 2 (`vaClause`)
- Quét các file còn nhiều `, và ` nhất và viết lại tự nhiên theo chuẩn `.agents/skills/vi-prose/SKILL.md` (giữ nguyên toàn bộ 7 chỉ số lỗi dịch máy ở mức `0`), sau đó hạ ngưỡng `vaClause` trong `package.json`.

### Đợt 147 — Tối ưu phân tách chunk bundle (`vite.config.js`)
- Chia nhỏ các chunk dữ liệu truyện lớn trong `vite.config.js` để không còn chunk dữ liệu đơn lẻ nào phình quá lớn, giúp trình duyệt tải song song nhanh hơn và gỡ cảnh báo chunk size khi build.

### Đợt 148 — Sửa lỗi kìm hãm tuổi già trên mọi Route & Mở rộng trần tuổi `65+`
- Sửa `fixerContractOfferChance` (`careerPipeline.js`) và `laneContractMods` (`affiliation.js`) để nhân vật đạt `Color Fixer` (`char.job === 'Color Fixer'`) vẫn nhận đều đặn hợp đồng cấp cao suốt tuổi già thay vì bị rơi về `0%`.
- Sửa `apexLongevityEventId` (`eventsApexTwilight.js`) để nhận diện cả `char.job === 'Color Fixer'` và chặn lời mời vào Section thường (`getAffiliationInvite`) khi đã là Color.
- Hạ ngưỡng cộng `+30` năm tuổi trần trong `effectiveMaxAge` (`eventConditions.js`) từ `age[1] >= 85` xuống `age[1] >= 65` cho nhân vật có `hasExtendedLongevity`, mở khóa lại hơn 150 sự kiện nghề nghiệp ở giai đoạn `65–110` tuổi.

### Đợt 149 — Bổ sung Kết thúc chủ động `90+` & Chương tuổi già `60+` cho mọi Route
- Thêm 2 sự kiện kết thúc chủ động tuổi `90+` trong `NON_APEX_ENDINGS` (`eventsApexTwilight.js`): `elder_wing_last_boardroom` (`Wing Employee`) và `elder_indie_syndicate_last_turf` (`Independent Syndicate`), đảm bảo mọi nhánh nghề đều có kết thúc chủ động ở tuổi đại thọ.
- Thêm 4 sự kiện chương tuổi già (`60–120` tuổi) trong `ELDER_CHAPTER_EVENTS`: `elder_wing_archive_declassification`, `elder_indie_old_code_dispute`, `elder_workshop_blueprint_inheritance`, `elder_outcast_wall_watchfire`.

### Đợt 150 — Đại tu Route `Distortion` (Cơ chế + Kịch bản 3 Hình thái + Tuổi già)
- Giảm thời gian chờ nhiệm vụ hàng năm của `Distortion` trong `annualMeritMoment` (`yearPlanner.js`) từ `3` năm xuống `2` năm (xác suất tăng từ `35%` lên `60%`) và bổ sung nhịp Major `gap >= 2` (`55%`) trong `majorIsDue` ngang với Color Fixer.
- Thêm 4 nhiệm vụ hàng năm mới (`distortionTask`) trong `annualMeritOpportunities.js` (`m_annual_distort_labyrinth_lure`, `m_annual_distort_lucid_blackmarket`, `m_annual_distort_lcd_recon_smoke`, `m_annual_distort_elder_calcification`).
- Mở rộng `eventsDistortionParityExpansion.js` với **8 Major mới** (phân nhánh 3 Hình thái Tiến hóa `distort_arc_archetype_divergence`, Mê Cung `distort_arc_labyrinth_trap_feast`, Tỉnh Thức `distort_arc_lucid_underground_broker`, đội điều tra khói tẩu LCD `distort_arc_lcd_moses_inspection`, di vật tiền kiếp `distort_arc_past_life_fixer_badge`, lồng thu hồi Singularity của Wing `distort_arc_past_life_wing_containment`, cột trụ ngủ đông tuổi già `distort_arc_elder_hibernation_monolith`, và kết thúc chủ động hóa Quả Trứng Dị Thể `distort_arc_elder_abnormality_chrysalis_ending`), cùng **6 Minor mới** và **6 Daily mới**.

*(Chi tiết Đợt 151–158 xem tại mục 2.45–2.48 trong `PROGRESS_LOG.md`.)*

### Đợt 159 — Âm thanh theo ngữ cảnh sự kiện, kết đời & nhịp tim nguy kịch
- `audioEngine.playEventCue(ev, char)` phát âm sắc theo nhánh/chủ đề (Index `playPrescriptTick`, Thumb `playThumbSnap`, Library `playPageFlip`, Warp `playWarpSurge`, E.G.O/Distortion `playEgo`, tiền tài `playCoinChime`, nguy hiểm `playDanger`) kèm `playHeartbeat` khi còn sống và `HP <= 25` hoặc `SP <= 20`.
- `audioEngine.playLifeFinale(endingType)` và hàm phân loại `lifeFinaleKindFor(char)` (`sceneContext.js`) xử lý âm thanh kết đời cho `'library'`, `'chrysalis'`, `'retire_90'`, giữ nguyên cổng `if (!sceneOwnsSound()) audioEngine.playDeath()` ở `LiveStageFeed.jsx`.
- `CharacterDossierCard.jsx` bổ sung `playHeartbeat` mỗi khi chỉ số HP/SP tụt xuống ngưỡng nguy kịch (`<= 20`).

### Đợt 160 — Biểu tượng SVG các phe, bảng danh vị mọi route, hào quang Carmen & thẻ Di cảo 1200x760
- Tạo `src/components/world/FactionCrest.jsx` với 16 biểu tượng SVG đơn sắc theo phe, cùng `crestKindFor(char, ev)` trong `sceneContext.js`, hiển thị ở `Nameplate` và `EventDock`.
- Mở rộng `rankPlateOf(char)` và CSS trong `play.css` cho `Distortion` (3 Hình thái tiến hóa & `distortStage >= 2`), `Independent Syndicate` (`syndicateRank >= 2`), `Workshop Craftsman` (`CraftedColorWeapon`, `TresCertified`), bổ sung lớp `.nameplate-sub` cho dòng Tiền kiếp và quy tắc `prefers-reduced-motion: reduce`.
- Bổ sung lớp phủ `.world-carmen` (`data-carmen='on'`) trong `WorldBackdrop.jsx` và `world.css` (đổi tên `@keyframes worldCarmenWhisper` tránh trùng với `play.css`).
- Bổ sung `finger` và `colorHex` vào `buildLifeSummaryAndLegacy` (`gameEngine.js`) để `exportDossierCardPNG` (`exportDossierCard.js`) vẽ thẻ Di cảo `1200x760` đúng sắc độ phe/Color kèm Quỹ Bảo Tồn, bước ngoặt và vết sẹo.

### Đợt 161 — Tách chunk mã nguồn `engine` khỏi `index`
- Trong `vite.config.js`, gom `src/engine/`, `src/services/`, `entryTiers.js` và `dungeonEnsemble.js` sang chunk `engine`, giữ riêng nhóm UI nghe nhìn (`audioEngine`, `ambienceScapes`, `gameFeel`, `sceneContext`) ở chunk `index` để hạ dung lượng gói khởi tạo `index` xuống ~350 kB với 0 vòng lặp import.

### Đợt 162 — Mạch truyện nhiều hồi tuổi già & gọt câu chữ tiếng Việt đợt 4 (`vaClause`)
- Thêm `distort_arc_primordial_blood_tide` (`eventsDistortionParityExpansion.js`) và 3 major nối tiếp `elder_syndicate_old_lieutenant_return`, `elder_syndicate_blood_ledger_reckoning`, `elder_syndicate_dynasty_seal` (`eventsApexTwilight.js`).
- Đăng ký thêm 2 mạch truyện `arc_syndicate_twilight_succession` và `arc_distortion_metamorphosis_domain` trong `NARRATIVE_ARCS` (`narrativeArcEngine.js`, tổng cộng 8 mạch).
- Gọt câu chữ giảm chỉ số `vaClause` trong `eventsFingerRing.js` và `eventsFingerExtra.js` từ `2015` xuống `1800` (giữ `relativeMa: 0` và mọi lỗi dịch máy ở mức `0`), hạ trần kiểm định `package.json` xuống `1805`.

### Đợt 173 — Gọn thẻ Dungeon di động, mở rộng mạch truyện dài & gọt văn đợt 5
- **Thẻ Dungeon trên màn hình hẹp (`390px`):** Đưa tên đồng hành vào `.dg-status` trong `DungeonDock.jsx`; chỉnh `.dg-stances` (`repeat(3, minmax(0, 1fr))`) và `.dg-supplies` (`min-height: 44px`, tự xuống dòng) ở `dungeon-chrome.css` dưới `@media (max-width: 860px)` và `480px`.
- **Mạch truyện nhiều hồi (`NARRATIVE_ARCS`):** Thêm 3 mạch cho Ring (`arc_ring_gallery_obsession`), Pinky (`arc_pinky_oath_reckoning`) và Outcast (`arc_outcast_fringe_survival` kèm 3 major mới `outcast_arc_rusted_turnstile`, `outcast_arc_sweeper_alley_toll`, `outcast_arc_unlisted_clinic_pact` trong `eventsApexTwilight.js`), nâng tổng số lên 11 mạch (trường `triggerNeed` mang tính mô tả; mạch khởi phát khi giải quyết event hồi 1).
- **Gọt câu chữ tiếng Việt đợt 5 (`vaClause`):** Loại bỏ `, và` nối mệnh đề và cấu trúc dịch máy ở nhóm Finger (`Middle`, `Index`, `Pinky`, `Thumb`, `Canon`), hợp đồng Wing (`careerContractsWing.js`, `careerContractsWingMore.js`, `careerContractsAssocC.js`), `eventsAffiliation.js`, `eventsEgoLeap.js`, `lifeMinors4.js` và `lifeMinors5.js`, giảm `vaClause` toàn cục từ `1800` xuống `955` (với tất cả 10 chỉ số còn lại và `voice_lint.mjs --fail` bằng `0`), hạ trần kiểm định `package.json` xuống `vaClause:955,chang:114,semicolon:557` (và bổ sung luật `chang`, `semicolon` trong `vi_prose_scan.mjs`, tách câu bằng dấu chấm ngắn gọn thay cho `;` và các từ nối lệch nghĩa).
- **Cấu hình cache Vercel (`vercel.json`):** Khai báo `Cache-Control: no-cache` cho `/((?!assets/).*)` và `public, max-age=31536000, immutable` cho `/assets/(.*)`.

## Việc đã làm sau khi so với "Born as an Individual in the City" (13/11/2026)

Sáu việc rút ra từ lần so sánh đã làm xong ở commit `208ef40` và `9000cf8`:
- Sửa câu vấp ở `eventsFingerThumb.js`.
- Hoãn hộp đặt tên bạn thuở nhỏ tới lần đầu người bạn xuất hiện.
- Khung hướng dẫn cho đời đầu tiên.
- 92 bản tin City trong `cityBulletins.js`.
- Màn chơi `390px` bớt khung: nhật ký chiếm khoảng 75% chiều cao.
- Gọt dấu chấm phẩy: trần `semicolon` hạ từ 557 xuống 467.

Ba chỗ còn treo được chuyển vào Bước 0 bên dưới.

## Lộ trình phát triển gộp (13/11/2026)

Lộ trình này gộp hai bản đánh giá ngày 13/11/2026:
- **Bản thứ nhất** chỉ ra rằng các hệ thống ít nối với nhau. Thế giới không giữ hệ quả qua nhiều năm và nhiều đời. Mạch truyện chạy thẳng. NPC không có việc riêng. Mục tiêu Dungeon chỉ nằm ở chặng cuối.
- **Bản thứ hai** chỉ ra rằng người chơi không thấy phần lớn nội dung đã viết. Đo bằng `director_reach.mjs` trên 80 đời: 502/839 sự kiện lớn chưa lần nào đủ điều kiện. Chỉ 127 sự kiện được rút ít nhất một lần. 10 sự kiện hay ra nhất chiếm 33% số lần rút thường.

Hai chẩn đoán bổ sung cho nhau. Đời sau cần sống giữa những hệ quả do đời trước để lại. Người chơi cũng cần nhìn thấy những cánh cửa mình chưa mở.

### Nguyên tắc chung
- **Dùng lại event có sẵn.** Hệ mới chủ yếu đổi ai đứng trong cảnh và vì sao. Không viết thêm hàng trăm sự kiện lớn.
- **Thử ở phạm vi nhỏ trước:** một khu phố, một mạch truyện, một dungeon. Mở rộng khi đã đo được kết quả.
- **Đo bằng công cụ trong `tools/sim`.** Mỗi bước có một con số trước và sau.
- **Không thêm tiền tệ, bảng kỹ năng hay tầng chiến đấu mới.** Không làm xúc xắc hành động và vuốt thẻ ở giai đoạn này.
- **Giữ ranh giới lore:** E.G.O cá nhân thuộc về người đã thức tỉnh. Đời sau chỉ nhận những gì người ấy để lại trong thế giới.

### Thứ tự

| Bước | Việc | Điều cần chứng minh |
|---|---|---|
| 0 | Sửa phân bố bản tin, thêm cửa đóng nhìn thấy được | Số sự kiện lớn được gặp tăng rõ |
| 1 | Một khu phố sống qua nhiều năm | Một quyết định để lại dấu vết thấy được qua nhiều năm |
| 2 | Đồng hồ cho những chuyện đang diễn ra | Người chơi thấy rủi ro đang lớn dần và chọn có can thiệp hay không |
| 3 | NPC có mục tiêu, nghĩa vụ và ký ức | Có quyết định khó mà không phải chuyện tăng Bond |
| 4 | Một mạch truyện phân hướng theo sự thật | Hai lần chơi gặp cùng biến cố nhưng phát triển khác nhau |
| 5 | Một dungeon, hai mục tiêu từ lúc chuẩn bị | Người chơi chuẩn bị khác đi |
| 6 | Dấu vết khu phố truyền sang đời sau | Người chơi muốn chơi tiếp để xem đời trước để lại gì |
| Bất kỳ lúc nào | City theo ngày | Có người quay lại vào ngày hôm sau |

### Bước 0. Sửa phân bố bản tin và thêm cửa đóng nhìn thấy được

**0a. Bản tin**
- **Vấn đề:** mô phỏng 200 đời sau commit `9000cf8` cho thấy bản tin gắn vào 100% số năm từ 5 tới 19 tuổi. Từ 30 tới 39 tuổi chỉ còn 21%, và từ 40 tuổi còn 5–10%. Có 59/92 tin mang dải tuổi `[5,99]`, nên đứa trẻ 5 tuổi năm nào cũng đọc tin về bảng ủy thác Fixer hay giờ giới nghiêm.
- **Hướng xử lý:**
  - Chỉ gắn bản tin làm dòng phụ theo xác suất, khoảng 1/3, hoặc chỉ gắn vào năm yên ả.
  - Nâng tuổi tối thiểu của các tin về Fixer, Wing và giới nghiêm lên 12–14.
  - Năm yên ả lấy một sự việc thật trước, chỉ dùng `AMBIENT_YEAR_LINES` khi không còn sự việc nào. Đây là quy tắc của Đợt 120a. Cần bỏ điều kiện `!quiet &&` ở `createYearDigest` (`yearPlanner.js`) và sửa ca kiểm tra tương ứng trong `test_city_bulletins.mjs`.
  - Câu "Tự lưu sau mỗi lựa chọn" luôn hiện trên trang chủ. Hiện câu này bị ẩn cùng dòng chú thích khi khung hướng dẫn đời đầu đang mở.
  - Gom điều kiện hiện khung hướng dẫn thành một biến `showFirstLifeGuide` trong `BirthSetupPanel.jsx`.
- **Kiểm chứng:** mô phỏng 200 đời, đếm số năm có bản tin theo từng thập kỷ tuổi. Không thập kỷ nào vượt 50%. Từ 30 tới 49 tuổi vẫn còn tin.

**0b. Cửa đóng nhìn thấy được**
- **Vấn đề:** phần lớn sự kiện lớn bị khóa sau các nhánh mà người chơi bình thường không đi tới. Người chơi không biết những cánh cửa ấy tồn tại.
- **Hướng xử lý:**
  - Lúc sinh ra và mỗi khi bước sang thập kỷ mới, hiện 2–3 cửa đang khóa kèm gợi ý. Ví dụ: "Có người ở Wing L từng biết tên mẹ bạn. Cần Network từ 40 và sống ở District 12."
  - Điều kiện đọc từ dữ liệu có sẵn trong `careerGates.json` và `eventConditions.js`. Không viết điều kiện riêng cho cửa.
  - Chọn cửa mà nhân vật có thể tới được trong đời này, không chọn cửa đã mở ở đời trước.
  - Codex ghi lại những cửa đã mở qua mọi đời.
- **Kiểm chứng:** thêm vào `tools/sim/lib/choicePolicy.mjs` một kiểu người chơi đi theo cửa. Chạy `director_reach.mjs` cho cả kiểu cũ và kiểu mới. Số sự kiện được rút ít nhất một lần phải tăng rõ so với mức 127/839.

### Bước 1. Một khu phố sống qua nhiều năm
*Tham khảo: RimWorld tạo chuyện từ con người, nơi chốn và những biến cố tác động vào cả hai.*
- **Vấn đề:** thay đổi của thành phố hiện nay ít khi kéo theo hệ quả liên quan. Nơi chốn chưa nhớ người chơi đã làm gì.
- **Hướng xử lý:**
  - Mỗi đời gắn với một khu phố ở Backstreets nơi nhân vật sinh ra. Khu phố có 3 địa điểm: nhà trọ, quán ăn, phòng khám. Mỗi địa điểm có người phụ trách, tình trạng hoạt động và một sổ lịch sử ngắn.
  - Khoảng 5 NPC thường gặp sống quanh 3 địa điểm này.
  - **Thành phố vẫn sống khi người chơi đứng ngoài.** Mỗi năm, địa điểm có thể đóng cửa, đổi chủ hoặc nhận tài trợ từ một Syndicate. Người chơi chỉ ảnh hưởng được một phần.
  - Event có sẵn được gắn vào địa điểm. Một cuộc gặp ở quán ăn mang nghĩa khác khi người đối diện là chủ nợ hay người từng được cứu.
  - Một phần bản tin chuyển thành tin của chính khu phố.
  - Ví dụ chuỗi: nhân vật giúp phòng khám giữ lại nguồn thuốc. Vài năm sau, người từng được chữa ở đó thành đầu mối giới thiệu việc. Khi nguồn hàng bị chặn, phòng khám tìm đến nhân vật. Đời sau gặp con của chủ phòng khám, cùng cuốn sổ còn ghi tên người đã giúp họ.
  - Trạng thái khu phố đi qua `saveSchema.js` và có migration cho save cũ.
- **Phạm vi thử đầu tiên:** một khu phố, ba địa điểm, khoảng năm NPC. Chưa làm cả 26 District.
- **Kiểm chứng:** test mới cho vòng đời địa điểm. Mô phỏng 200 đời: đếm số đời có ít nhất một quyết định của người chơi đổi tình trạng địa điểm, và số năm sau đó địa điểm còn nhắc lại quyết định ấy.

### Bước 2. Đồng hồ cho những chuyện đang diễn ra
*Tham khảo: clock trong Citizen Sleeper theo dõi những việc tiến triển cả khi người chơi bận việc khác.*
- **Vấn đề:** rủi ro hiện tới đột ngột qua RNG. Người chơi không thấy sự việc đang xấu dần để quyết định có dính vào hay không.
- **Hướng xử lý:**
  - Mỗi đồng hồ có vài nấc, dấu hiệu người chơi nhìn thấy và cách can thiệp. Ví dụ:

    | Chuyện đang diễn ra | Dấu hiệu | Cách can thiệp |
    |---|---|---|
    | Office sắp giải thể | Chậm trả tiền, người bỏ việc | Nhận Request khó, tìm khách, chuyển việc |
    | Người thân bị điều tra | Bị gọi lên làm việc, mất giấy phép | Tìm hồ sơ, nhờ người quen, đưa họ rời khu |
    | Khu phố thiếu thuốc | Giá tăng, phòng khám giảm giờ mở cửa | Hộ tống hàng, mua sớm, chia thuốc |
    | Khoản thù đang lớn dần | Có người dò hỏi, người quen bị gây sức ép | Thương lượng, tìm người bảo lãnh, chuẩn bị đối đầu |

  - **Bọc các hệ có sẵn**, không tạo tài nguyên mới: vòng đời nợ Fixer, Heat, `cityConditions.js`.
  - **Tối đa hai chuyện cá nhân đang mở cùng một biến động địa phương.** Những lời hứa người chơi tự nhận phải hiện rõ trên hồ sơ. Các chuyện khác có thể tự kết thúc và hiện ra dưới dạng tin tức.
- **Kiểm chứng:** mô phỏng đếm số đồng hồ mở cùng lúc, không bao giờ vượt giới hạn. Đếm tỷ lệ đồng hồ được người chơi can thiệp so với tự kết thúc.

### Bước 3. NPC có mục tiêu, nghĩa vụ và ký ức
*Tham khảo: Wildermyth chọn nhân vật cho câu chuyện dựa trên lịch sử, tính cách, quan hệ và các "hook".*
- **Vấn đề:** NPC đã có nghề, tính cách, ký ức và trạng thái, nhưng chưa có việc riêng đang theo đuổi. Quan hệ xoay quanh người chơi, nên cuộc đời các NPC ít va vào nhau.
- **Hướng xử lý:**
  - Mỗi NPC có **một mục tiêu đang theo đuổi** (trả nợ, đưa gia đình vào Nest, tìm người mất tích, giữ chức vụ), **một nghĩa vụ** và vài ký ức quan trọng. Không thêm các thanh tin tưởng, sợ hãi hay kính trọng.
  - Mục tiêu có thể xung đột với lợi ích của người chơi. Ví dụ: người bạn thân muốn vào Wing, trong khi bằng chứng người chơi tìm được có thể làm hỏng đợt tuyển dụng.
  - **Bond cao cho cơ hội giải thích, thương lượng hoặc sửa chữa.** Nó không tự động khiến NPC đồng ý mọi việc.
  - Thêm quan hệ giữa các NPC: đồng nghiệp, họ hàng, chủ nợ, người cứu mạng. Như vậy cùng một vụ việc có thể đặt người chơi giữa hai người mình quen.
- **Phạm vi thử đầu tiên:** hai NPC trong khu phố ở Bước 1, có mục tiêu xung đột nhau.
- **Kiểm chứng:** test cho việc chọn NPC vào cảnh theo mục tiêu. Mô phỏng đếm số lần người chơi phải chọn giữa hai NPC mình quen.

### Bước 4. Mạch truyện phân hướng theo sự thật
- **Vấn đề:** `advanceActiveNarrativeArcs` trong `narrativeArcEngine.js` chỉ nhận `eventId` rồi chuyển sang hồi kế tiếp. Người chơi xử lý thế nào thì mạch vẫn đi cùng một đường.
- **Hướng xử lý:**
  - Mỗi hồi ghi lại những sự thật quan trọng: ai còn sống, ai biết chuyện, có bằng chứng không, người chơi nhận trách nhiệm hay đẩy cho người khác, lời hứa nào chưa hoàn thành.
  - Hồi tiếp theo được chọn từ các sự thật ấy. Ví dụ: một vụ vận chuyển thất bại có thể mở thành cuộc truy tìm hàng, tranh chấp tiền công, hoặc chuyện người bị bỏ lại.
  - Dùng lại event cũ với người đứng trong cảnh khác nhau.
- **Phạm vi thử đầu tiên:** chuyển một mạch trong 11 mạch hiện có.
- **Kiểm chứng:** test hai lần chơi cùng seed, chọn khác nhau ở hồi 1, phải đi tới hai hồi 2 khác nhau.

### Bước 5. Một dungeon, hai mục tiêu từ lúc chuẩn bị
*Tham khảo: Roadwarden, nơi vật phẩm, thông tin và giới hạn thời gian mở ra những lời giải khác nhau.*
- **Vấn đề:** mục tiêu được gán lúc vào hầm (`dungeonEngine.js`) nhưng chỉ dùng tới ở chặng cuối. Lời kể trong `dungeonObjectives.js` là hầm và xà gỗ chung chung, không đổi theo WARP hay Great Lake.
- **Hướng xử lý:**

  | Mục tiêu | Thay đổi trong chuyến đi |
  |---|---|
  | Cứu người | Mang thêm thuốc, tìm người trước, cân nhắc bỏ hành lý khi rút |
  | Lấy bằng chứng | Giữ thiết bị ghi nhận, chọn giữa đường an toàn và nơi có thông tin |
  | Thu hồi hàng | Trọng lượng hoặc tình trạng món hàng ảnh hưởng lựa chọn |
  | Giữ đường rút | Dành tiếp tế cho hậu tuyến, chấp nhận bỏ một phần phần thưởng |

  - Viết biến thể lời kể theo cảnh của từng dungeon.
- **Phạm vi thử đầu tiên:** một dungeon với hai mục tiêu, cứu người và lấy bằng chứng.
- **Kiểm chứng:** `dungeon_sim.mjs` cho thấy cách chuẩn bị khác nhau giữa hai mục tiêu.

### Bước 6. Dấu vết khu phố truyền sang đời sau
*Tham khảo: I Was a Teenage Exocolonist biến trải nghiệm và quan hệ thành tài nguyên qua nhiều lượt chơi. Library of Ruina biến người đã khuất thành Sách.*
- **Vấn đề:** huyết thống đã có kỷ vật, thành tựu và dấu ấn tổ tiên. Nhưng đời sau ít khi thừa hưởng một hoàn cảnh cụ thể do đời trước tạo ra.
- **Hướng xử lý:**
  - Đời sau thừa hưởng thư từ, hồ sơ, người làm chứng, bí quyết nghề và những mối quan hệ còn tồn tại ở khu phố. Ví dụ:
    - Cha mẹ từng làm ở Wing để lại ghi chú giúp nhận ra một quy trình nguy hiểm.
    - Gia đình từng cứu chủ nhà trọ được cho ở nhờ, nhưng lời giúp đỡ ấy kéo theo một yêu cầu.
    - Danh tiếng mà người chơi chưa chắc muốn tiếp tục mang.
  - Một nhân viên, người chữa bệnh hay Fixer hạng thấp vẫn để lại được chuyện đáng kể cho thế hệ sau.
  - Đóng mỗi đời đã kết thúc thành một Sách trong dòng họ, dùng làm nguồn cho các dấu vết trên.
- **Kiểm chứng:** thêm thước đo vào `tools/sim`: tỷ lệ đời gặp lại ít nhất một hệ quả do đời trước để lại.

### Bất kỳ lúc nào. City theo ngày
*Tham khảo: Spelunky Daily và Wordle.*
- Mỗi ngày có một seed chung: cùng nơi sinh, cùng gia cảnh, cùng các biến cố của City.
- Cuối đời chia sẻ thẻ di cảo (Đợt 145) kèm seed của ngày, để so với người khác.
- Làm bản chia sẻ bằng link trước. Chưa cần bảng xếp hạng trên server.
- **Kiểm chứng:** test cùng seed ngày cho ra cùng một khai sinh.

### Để sau
- **Khủng hoảng E.G.O theo niềm tin.** Những lựa chọn quan trọng qua nhiều năm định hình câu hỏi mà nhân vật phải đối diện. Người luôn giữ lời và người luôn tìm đường thoát gặp hai khủng hoảng khác nhau. Tránh biến cơ chế này thành thang thiện–ác hay công thức chắc chắn để lấy E.G.O.
- **Thư viện giữa người chơi.** Sách của người chơi khác thỉnh thoảng hiện ra thành một Fixer lạ hoặc một cái tên trên bảng ủy thác. Server chỉ lưu dữ liệu đã kiểm duyệt (số liệu, tên chọn từ bộ sinh tên, không có văn tự do). Chỉ làm khi Bước 6 đã cho thấy dấu vết trong dòng họ hấp dẫn người chơi.
- **Chân dung thay đổi theo đời.** Bóng người SVG ghép lớp theo sẹo, tay giả, E.G.O, Distortion và màu Color, hiện trên hồ sơ và thẻ di cảo.
