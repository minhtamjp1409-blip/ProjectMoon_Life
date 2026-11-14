# Kế hoạch phát triển tiếp theo

File này chỉ giữ những việc chưa làm. Việc đã xong được ghi trong `PROGRESS_LOG.md`, gần nhất là mục 2.57 (Đợt 174: hoàn tất Bước `0a–0d` và Bước `0+` Tua thời thơ ấu), 2.58 (sửa sót sau review, ghi lộ trình AI), 2.59 (Đợt 175: hoàn tất cụm AI độc lập `AI-3`, `AI-5`, `AI-6`), 2.60 (Đợt 176: một planner duy nhất, backend chỉ còn lưu trữ) và 2.61 (Đợt 177: tách hai file engine lớn).

Luật chơi đang chạy nằm ở `docs/LUAT_HIEN_HANH.md`, lore và giọng văn ở `UNIVERSE.md`. Số đợt do người làm tự đặt khi bắt đầu.

## Vì sao có lộ trình này

Lộ trình gộp ba bản đánh giá ngày 13/11/2026:
- **Các hệ thống ít nối với nhau.** Thế giới không giữ hệ quả qua nhiều năm và nhiều đời. Mạch truyện chạy thẳng: `advanceActiveNarrativeArcs` (`narrativeArcEngine.js`) chỉ nhận `eventId` rồi chuyển sang hồi kế tiếp. NPC chưa có việc riêng đang theo đuổi. Mục tiêu Dungeon chỉ được dùng ở chặng cuối.
- **Người chơi không thấy phần lớn nội dung.** Đo bằng `director_reach.mjs` trên 80 đời: 502/839 sự kiện lớn chưa lần nào đủ điều kiện. Chỉ 127 sự kiện được rút ít nhất một lần. 10 sự kiện hay ra nhất chiếm 33% số lần rút thường.
- **Người chơi chủ yếu chờ rồi phản ứng.** Quyết định chủ động gần như chỉ nằm ở kế hoạch năm. Các bánh răng ngầm (`cityBlackboard.js`, `scarModel.js`, mạch truyện) chỉ lộ ra khi sự việc đã nổ.

Đời sau cần sống giữa những hệ quả do đời trước để lại. Người chơi cũng cần nhìn thấy những cánh cửa mình chưa mở và những chuyện đang xấu dần.

## Nguyên tắc chung
- **Dùng lại event có sẵn.** Hệ mới chủ yếu đổi ai đứng trong cảnh và vì sao. Không viết thêm hàng trăm sự kiện lớn.
- **Thử ở phạm vi nhỏ trước:** một khu phố, một mạch truyện, một dungeon. Mở rộng khi đã đo được kết quả.
- **Đo bằng công cụ trong `tools/sim`.** Mỗi bước có một con số trước và sau.
- **Không thêm tiền tệ, lượt hành động, bảng kỹ năng hay tầng chiến đấu mới** ở giai đoạn này.
- **Giữ ranh giới lore:** E.G.O cá nhân thuộc về người đã thức tỉnh. Đời sau chỉ nhận những gì người ấy để lại trong thế giới.

## Thứ tự

| Bước | Việc | Điều cần chứng minh |
|---|---|---|
| ~~0~~ | ~~Sửa bản tin, cửa đóng nhìn thấy được, giọng nội tâm cụ thể, bản tin nhắc đời trước~~ | Đã xong ở Đợt 174 (`PROGRESS_LOG.md` mục 2.57) |
| ~~0+~~ | ~~Tua thời thơ ấu, tùy chọn từ đời thứ 2~~ | Đã xong ở Đợt 174 (`PROGRESS_LOG.md` mục 2.57) |
| 1 | Một khu phố sống qua nhiều năm | Một quyết định để lại dấu vết thấy được qua nhiều năm |
| 2 | Đồng hồ cho những chuyện đang diễn ra | Người chơi lập kế hoạch năm theo rủi ro đang lớn dần |
| 3 | NPC có mục tiêu, nghĩa vụ và ký ức, bắt đầu từ đối thủ cùng lứa | Có quyết định khó mà không phải chuyện tăng Bond |
| 4 | Một mạch truyện phân hướng theo sự thật | Hai lần chơi gặp cùng biến cố nhưng phát triển khác nhau |
| 5 | Một dungeon, hai mục tiêu từ lúc chuẩn bị | Người chơi chuẩn bị và đọ chiêu khác đi |
| 6 | Dấu vết khu phố truyền sang đời sau | Người chơi muốn chơi tiếp để xem đời trước để lại gì |
| Bất kỳ lúc nào | City theo ngày | Có người quay lại vào ngày hôm sau |
| AI-1 | Kẻ địch đọc cách người chơi đánh, làm trước hoặc cùng bước 5 | Bot lặp một kiểu đánh thua nhiều hơn bot chọn theo ý định |
| AI-2 | NPC tự hành động mỗi năm theo mục tiêu, là phần lõi của bước 3 | NPC tự tìm đến người chơi, không chỉ chờ được gọi |
| ~~AI-3~~ | ~~Director nhìn trước theo đường cong cường độ~~ | Đã xong ở Đợt 175 (`PROGRESS_LOG.md` mục 2.59): 200 đời, top 10 `23%`, `192` event được rút |
| AI-4 | Phe phái trong District tự vận hành, là phần lõi của bước 2 | Bản tin và đồng hồ đến từ cùng một trạng thái |
| ~~AI-5~~ | ~~Director thử thách thói quen của người chơi~~ | Đã xong ở Đợt 175 (`PROGRESS_LOG.md` mục 2.59): trần `2` lần mỗi đời, `58%` nhắm đúng thói quen của bot |
| ~~AI-6~~ | ~~Bot kiểm thử tìm chiến thuật áp đảo~~ | Đã xong ở Đợt 175 (`PROGRESS_LOG.md` mục 2.59): báo cáo 8 kiểu bot, có bot đối chứng `tactical` |

## Nâng cấp AI trong game

AI ở đây là phần quyết định của Director, NPC, kẻ địch và thành phố. Game không gọi mô hình ngôn ngữ lúc chạy. Các mục dưới đây nâng cấp những hệ đã có, không thay chúng.

**Hiện trạng:**
- **Director** (`eventDirector.js`, `director.js`, `weaverAI.js`) đã có đường cong cường độ theo giai đoạn, ưu tiên dòng họ chưa gặp (`bloodlineSeenEvents`), `DIRECTOR_EXPLORE_SHARE = 0.06` và cơ chế thử thách thói quen theo 4 xu hướng `violence`, `mercy`, `greed`, `loyalty` (tối đa 2 lần/đời). Phần chưa làm nằm ở đồng hồ phe phái (`AI-4`) và hành động chủ động của NPC (`AI-2`).
- **Kẻ địch trong dungeon kiểu gauntlet** (`dungeonCombat.js`) đã hiện ý định trước mỗi lượt. Nhưng ý định chạy vòng theo một danh sách cố định, điểm bắt đầu lấy từ seed (`c.offset`, `intentAt`). Kẻ địch không phản ứng với cách người chơi trả lời (`AI-1`).
- **`utilityCurves.js`** đã có các đường cong phản hồi. **`cityBlackboard.js`** mới có 48 dòng, chủ yếu là nơi chứa trạng thái.
- **Bot mô phỏng** (`tools/sim/lib/choicePolicy.mjs`, `lookaheadPolicy.mjs`, `policy_balance_report.mjs`) hiện đủ 7 kiểu (`random`, `greedy`, `focused`, `cautious`, `door`, `reckless`, `lookahead`). Chạy `npm run report:bots` (25 đời/kiểu) phát hiện 4 đầu việc cần cân bằng lại (ghi ở mục Cân bằng bên dưới).

### AI-1. Kẻ địch đọc cách người chơi đánh
*Tham khảo: ý định của kẻ địch trong Slay the Spire và Into the Breach.*
- **Vấn đề:** người chơi thuộc vòng ý định là thắng. Lựa chọn đỡ, chém hay né thành thao tác lặp.
- **Hướng xử lý:**
  - Phiên đấu nhớ 2–3 câu trả lời gần nhất của người chơi.
  - Mỗi kẻ địch có đúng một luật phản ứng, ghi trong dữ liệu `dungeonGauntlets.js`. Ví dụ: bị đỡ hai lần liền thì lượt sau chuyển sang đòn phá thế. Bị né liên tục thì tung đòn diện rộng.
  - Ý định mới vẫn hiện trước khi người chơi chọn. Kẻ địch không giấu bài.
  - Kết quả vẫn lặp lại được theo seed: luật phản ứng chỉ đọc lịch sử lượt, không gọi RNG mới.
  - Elite và trùm có luật riêng. Kẻ địch thường có thể không có luật, để tầng đầu còn dễ.
- **Liên quan:** khớp với mục "hiện ý định của đối phương trước khi đọ chiêu" ở bước 5. Nên làm cùng nhau để một dungeon có cả hai.
- **Kiểm chứng:** thêm vào `dungeon_sim.mjs` hai kiểu bot, một kiểu luôn lặp một câu trả lời và một kiểu chọn theo ý định. Bot lặp phải thua nhiều hơn rõ rệt. Bot chọn theo ý định không được thua nhiều hơn mức hiện tại.

### AI-2. NPC tự hành động mỗi năm
*Tham khảo: tham vọng nhân vật trong Crusader Kings III, Nemesis System trong Shadow of Mordor.*
- **Vấn đề:** NPC chỉ xuất hiện khi event gọi tới. Họ không tự quyết định làm gì.
- **Hướng xử lý:**
  - Đây là phần máy chạy của bước 3. Bước 3 cho NPC mục tiêu, nghĩa vụ và ký ức. Mục này cho NPC cách chọn hành động.
  - Mỗi năm, NPC quan trọng chọn một trong khoảng 5 hành động: giúp, nhờ vả, cạnh tranh, phản bội, rời đi.
  - Điểm của từng hành động tính bằng `utilityCurves.js`, từ mục tiêu của NPC, Bond, ký ức về người chơi và tình trạng của người chơi. Ví dụ: đối thủ cùng lứa thấy người chơi đang bị thương trước kỳ thi Grade thì điểm "cạnh tranh" tăng.
  - Hành động được chọn đẩy một event có sẵn mang `need.npc` của vai đó lên đầu hàng. Không viết event riêng cho từng hành động.
  - Mỗi lựa chọn ghi lý do vào nhật ký quyết định, giống cách Director đang ghi.
- **Kiểm chứng:** mô phỏng 200 đời, đếm số lần NPC tự tìm đến người chơi và phân bố 5 loại hành động. Không loại nào chiếm quá nửa.

### AI-4. Phe phái trong District tự vận hành
*Tham khảo: thế giới tự chạy trong Dwarf Fortress, faction turn trong Blades in the Dark.*
- **Vấn đề:** thành phố chỉ đổi khi người chơi chạm vào. Bản tin và các điều kiện thành phố không chung một nguồn.
- **Hướng xử lý:**
  - Đây là phần máy chạy của bước 2. Mỗi phe trong District của người chơi có một đồng hồ áp lực, ví dụ Syndicate lấn địa bàn, Wing cắt giảm nhân sự, Thợ Quét ra quân.
  - Mỗi năm đồng hồ nhích theo vài luật đơn giản, đọc từ `cityConditions.js` và hành động của người chơi.
  - Khi đầy, đồng hồ đẩy event và bản tin tương ứng, rồi trở về mức thấp.
  - `cityBlackboard.js` giữ trạng thái này để Director và NPC ở mục AI-2 cùng đọc.
- **Kiểm chứng:** test cùng seed cho cùng chuỗi biến động. Mô phỏng đếm tỷ lệ bản tin sinh ra từ đồng hồ so với bản tin ngẫu nhiên.

### Về mô hình ngôn ngữ
- **Không dùng lúc chạy game:** tốn phí gọi qua server Render, không lặp lại theo seed, và lời văn dễ lệch khỏi `vi-prose` và `UNIVERSE.md`.
- **Có thể dùng làm công cụ soạn nội dung** trong `tools/`: viết nháp biến thể event. Mọi bản nháp phải qua `vi_prose_scan`, `voice_lint` và người duyệt trước khi vào dữ liệu.

## Bước 1. Một khu phố sống qua nhiều năm
*Tham khảo: RimWorld tạo chuyện từ con người, nơi chốn và những biến cố tác động vào cả hai. Fallen London cho mỗi nơi chốn những việc riêng có thể làm.*
- **Vấn đề:** thay đổi của thành phố hiện nay ít khi kéo theo hệ quả liên quan. Nơi chốn chưa nhớ người chơi đã làm gì.
- **Hướng xử lý:**
  - Mỗi đời gắn với một khu phố ở Backstreets nơi nhân vật sinh ra. Khu phố có 3 địa điểm: nhà trọ, quán ăn, phòng khám. Mỗi địa điểm có người phụ trách, tình trạng hoạt động và một sổ lịch sử ngắn.
  - Khoảng 5 NPC thường gặp sống quanh 3 địa điểm này.
  - **Ghé địa điểm đi qua ô kế hoạch năm có sẵn** (`annualPlan.js`, `YearPlanDock.jsx`). Không thêm lượt hành động.
  - **Thành phố vẫn sống khi người chơi đứng ngoài.** Mỗi năm, địa điểm có thể đóng cửa, đổi chủ hoặc nhận tài trợ từ một Syndicate. Người chơi chỉ ảnh hưởng được một phần.
  - Event có sẵn được gắn vào địa điểm. Một cuộc gặp ở quán ăn mang nghĩa khác khi người đối diện là chủ nợ hay người từng được cứu.
  - Một phần bản tin chuyển thành tin của chính khu phố.
  - Ví dụ chuỗi: nhân vật giúp phòng khám giữ lại nguồn thuốc. Vài năm sau, người từng được chữa ở đó thành đầu mối giới thiệu việc. Khi nguồn hàng bị chặn, phòng khám tìm đến nhân vật. Đời sau gặp con của chủ phòng khám, cùng cuốn sổ còn ghi tên người đã giúp họ.
  - Trạng thái khu phố đi qua `saveSchema.js` và có migration cho save cũ.
- **Phạm vi thử đầu tiên:** một khu phố, ba địa điểm, khoảng năm NPC. Chưa làm cả 26 District.
- **Kiểm chứng:** test mới cho vòng đời địa điểm. Mô phỏng 200 đời: đếm số đời có ít nhất một quyết định của người chơi đổi tình trạng địa điểm, và số năm sau đó địa điểm còn nhắc lại quyết định ấy.

## Bước 2. Đồng hồ cho những chuyện đang diễn ra
*Tham khảo: clock trong Citizen Sleeper, situation trong Suzerain.*
- **Vấn đề:** rủi ro hiện tới đột ngột qua RNG. Người chơi không thấy sự việc đang xấu dần để quyết định có dính vào hay không.
- **Hướng xử lý:**
  - Mỗi đồng hồ có vài nấc (ví dụ `2/4`), dấu hiệu người chơi nhìn thấy và cách can thiệp. Ví dụ:

    | Chuyện đang diễn ra | Dấu hiệu | Cách can thiệp |
    |---|---|---|
    | Office sắp giải thể | Chậm trả tiền, người bỏ việc | Nhận Request khó, tìm khách, chuyển việc |
    | Wing siết điều tra người thân | Bị gọi lên làm việc, mất giấy phép | Tìm hồ sơ, nhờ người quen, đưa họ rời khu |
    | Khu phố thiếu thuốc | Giá tăng, phòng khám giảm giờ mở cửa | Hộ tống hàng, mua sớm, chia thuốc |
    | Khoản thù đang lớn dần | Có người dò hỏi, người quen bị gây sức ép | Thương lượng, tìm người bảo lãnh, chuẩn bị đối đầu |
    | Mạch truyện sắp tới hồi kết | Người trong mạch xuất hiện dày hơn | Chuẩn bị trước hoặc rút ra khỏi mạch |
    | Sức khỏe sắp dưới ngưỡng Sát hạch Hana | HP giảm qua nhiều năm liền | Dành năm dưỡng thương trước kỳ sát hạch |

  - **Đồng hồ hiện ngay trong `YearPlanDock`**, để người chơi chọn Nghỉ ngơi, Rèn luyện hay chạy quan hệ vì một lý do nhìn thấy được.
  - **Bọc các hệ có sẵn**, không tạo tài nguyên mới: vòng đời nợ Fixer, Heat, `cityConditions.js`, `cityBlackboard.js`, `narrativeArcEngine.js`, ngưỡng `TRIAL_MIN_HP`.
  - **Tối đa hai chuyện cá nhân đang mở cùng một biến động địa phương.** Những lời hứa người chơi tự nhận phải hiện rõ trên hồ sơ. Các chuyện khác có thể tự kết thúc và hiện ra dưới dạng tin tức.
- **Kiểm chứng:** mô phỏng đếm số đồng hồ mở cùng lúc, không bao giờ vượt giới hạn. Đếm tỷ lệ đồng hồ được người chơi can thiệp so với tự kết thúc. Chụp `YearPlanDock` ở `390px` khi có hai đồng hồ.

## Bước 3. NPC có mục tiêu, nghĩa vụ và ký ức
*Tham khảo: Wildermyth chọn nhân vật cho câu chuyện dựa trên lịch sử và các "hook". Nemesis System trong Shadow of Mordor cho đối thủ nhớ và tiến lên. Crusader Kings III.*
- **Vấn đề:** NPC đã có nghề, tính cách, ký ức và trạng thái, nhưng chưa có việc riêng đang theo đuổi. Vai `rival` đã có (`npcInteractions.js` và dữ liệu event), nhưng đối thủ không tự tiến lên song song với người chơi.
- **Hướng xử lý:**
  - Mỗi NPC có **một mục tiêu đang theo đuổi** (trả nợ, đưa gia đình vào Nest, tìm người mất tích, giữ chức vụ, leo Grade), **một nghĩa vụ** và vài ký ức quan trọng. Không thêm các thanh tin tưởng, sợ hãi hay kính trọng.
  - Mục tiêu có thể xung đột với lợi ích của người chơi. Ví dụ: người bạn thân muốn vào Wing, trong khi bằng chứng người chơi tìm được có thể làm hỏng đợt tuyển dụng.
  - **Bond cao cho cơ hội giải thích, thương lượng hoặc sửa chữa.** Nó không tự động khiến NPC đồng ý mọi việc.
  - Thêm quan hệ giữa các NPC: đồng nghiệp, họ hàng, chủ nợ, người cứu mạng. Như vậy cùng một vụ việc có thể đặt người chơi giữa hai người mình quen.
- **Phạm vi thử đầu tiên: một đối thủ cùng lứa.**
  - Ví dụ: đứa trẻ từng chơi bi với nhân vật, hoặc đồng nghiệp Wing năm 20 tuổi. Người này cũng đi thi Grade, và có thể phản bội, gia nhập Index, mang sẹo hoặc thành Capo bên đối địch.
  - Tin về họ thỉnh thoảng hiện qua bản tin, ví dụ "Hội Fixer vừa ký hợp đồng với người bạn quen cũ, giờ đã lên Grade 4".
  - Một năm nào đó hai người chạm mặt trong cùng một Request hoặc dungeon.
- **Kiểm chứng:** test cho việc chọn NPC vào cảnh theo mục tiêu. Mô phỏng đếm số đời gặp lại đối thủ trong Request hoặc dungeon, và số lần người chơi phải chọn giữa hai NPC mình quen.

## Bước 4. Mạch truyện phân hướng theo sự thật
- **Vấn đề:** mạch truyện chuyển hồi theo `eventId`. Người chơi xử lý thế nào thì mạch vẫn đi cùng một đường.
- **Hướng xử lý:**
  - Mỗi hồi ghi lại những sự thật quan trọng: ai còn sống, ai biết chuyện, có bằng chứng không, người chơi nhận trách nhiệm hay đẩy cho người khác, lời hứa nào chưa hoàn thành.
  - Hồi tiếp theo được chọn từ các sự thật ấy. Ví dụ: một vụ vận chuyển thất bại có thể mở thành cuộc truy tìm hàng, tranh chấp tiền công, hoặc chuyện người bị bỏ lại.
  - Dùng lại event cũ với người đứng trong cảnh khác nhau.
- **Phạm vi thử đầu tiên:** chuyển một mạch trong 11 mạch hiện có.
- **Kiểm chứng:** test hai lần chơi cùng seed, chọn khác nhau ở hồi 1, phải đi tới hai hồi 2 khác nhau.

## Bước 5. Một dungeon, hai mục tiêu từ lúc chuẩn bị
*Tham khảo: Roadwarden, nơi vật phẩm, thông tin và giới hạn thời gian mở ra những lời giải khác nhau. Clash trong Library of Ruina và Limbus Company.*
- **Vấn đề:** mục tiêu được gán lúc vào hầm (`dungeonEngine.js`) nhưng chỉ dùng tới ở chặng cuối. Lời kể trong `dungeonObjectives.js` là hầm và xà gỗ chung chung, không đổi theo WARP hay Great Lake. Đọ chiêu `heavy`/`quick` (`dungeonCombat.js`) đã có, nhưng người chơi chọn mà không biết đối phương định làm gì.
- **Hướng xử lý:**

  | Mục tiêu | Thay đổi trong chuyến đi |
  |---|---|
  | Cứu người | Mang thêm thuốc, tìm người trước, cân nhắc bỏ hành lý khi rút |
  | Lấy bằng chứng | Giữ thiết bị ghi nhận, chọn giữa đường an toàn và nơi có thông tin |
  | Thu hồi hàng | Trọng lượng hoặc tình trạng món hàng ảnh hưởng lựa chọn |
  | Giữ đường rút | Dành tiếp tế cho hậu tuyến, chấp nhận bỏ một phần phần thưởng |

  - Viết biến thể lời kể theo cảnh của từng dungeon.
  - **Hiện ý định của đối phương trước khi đọ chiêu**, ví dụ "Chém dọc 7–11" hay "Khí độc, SP −5", để chọn `heavy` hay `quick` có căn cứ. Không thêm thao tác kéo thẻ.
- **Phạm vi thử đầu tiên:** một dungeon với hai mục tiêu, cứu người và lấy bằng chứng.
- **Kiểm chứng:** `dungeon_sim.mjs` cho thấy cách chuẩn bị khác nhau giữa hai mục tiêu, và tỷ lệ thắng đọ chiêu thay đổi khi biết ý định đối phương. Chụp `DungeonDock` ở `390px`.

## Bước 6. Dấu vết khu phố truyền sang đời sau
*Tham khảo: I Was a Teenage Exocolonist biến trải nghiệm và quan hệ thành tài nguyên qua nhiều lượt chơi. Library of Ruina biến người đã khuất thành Sách. Wildermyth.*
- **Vấn đề:** huyết thống đã có kỷ vật, thành tựu và dấu ấn tổ tiên. Nhưng đời sau ít khi thừa hưởng một hoàn cảnh cụ thể do đời trước tạo ra.
- **Hướng xử lý:**
  - Đời sau thừa hưởng thư từ, hồ sơ, người làm chứng, bí quyết nghề và những mối quan hệ còn tồn tại ở khu phố. Ví dụ:
    - Cha mẹ từng làm ở Wing để lại ghi chú giúp nhận ra một quy trình nguy hiểm.
    - Gia đình từng cứu chủ nhà trọ được cho ở nhờ, nhưng lời giúp đỡ ấy kéo theo một yêu cầu.
    - Danh tiếng mà người chơi chưa chắc muốn tiếp tục mang.
  - Mở rộng dấu ấn của bước 0d: đời sau có thể gặp hợp đồng truy nã hoặc đồng minh đến từ chính Office hay dị thể của đời trước. Ví dụ: phải đối đầu phiên bản Distortion của tổ tiên, hoặc được một sư phụ từng là đệ tử của đời trước nâng đỡ.
  - Một nhân viên, người chữa bệnh hay Fixer hạng thấp vẫn để lại được chuyện đáng kể cho thế hệ sau.
  - Đóng mỗi đời đã kết thúc thành một Sách trong dòng họ, dùng làm nguồn cho các dấu vết trên.
- **Kiểm chứng:** thêm thước đo vào `tools/sim`: tỷ lệ đời gặp lại ít nhất một hệ quả do đời trước để lại.

## Bất kỳ lúc nào. City theo ngày
*Tham khảo: Spelunky Daily và Wordle.*
- Mỗi ngày có một seed chung: cùng nơi sinh, cùng gia cảnh, cùng các biến cố của City.
- Cuối đời chia sẻ thẻ di cảo kèm seed của ngày, để so với người khác.
- Làm bản chia sẻ bằng link trước. Chưa cần bảng xếp hạng trên server.
- **Kiểm chứng:** test cùng seed ngày cho ra cùng một khai sinh.

## Việc sửa sau đợt test 14/11/2026
Danh sách chi tiết nằm ở `docs/SUA_SAU_TEST_14_11.md`. File này có 15 mục, mỗi mục ghi số đo, nguyên nhân, cách sửa và cách đo lại:
- Hai lỗi công cụ đo: `color%` luôn ra 0, và script QA kẹt ở lựa chọn đang khóa.
- Bảy việc cân bằng: đỡ đòn chết, cảnh báo trong dungeon, Reverberation Ensemble, Fixer chơi an toàn, Color hóa Distortion, tiền giảm theo tuổi, và nhánh Wing.
- Ba việc nội dung.
- Ba cơ chế học từ trang mẫu: tốc độ x8/x16, nhiều slot lưu, thẻ District.

Đề xuất: Đợt 178 làm A1, A2, B1, B2, D3.

## Cân bằng cần xem lại (từ báo cáo `AI-6`, `npm run report:bots`)
Báo cáo so `lookahead` với bot đối chứng `tactical`. Hai bot dùng cùng luật chọn manh mối, hợp đồng, hành động trong dungeon và kế hoạch năm. Chỉ khác ở chỗ `lookahead` thử trước 1–2 năm cho mỗi lựa chọn lớn. Các bot luật cố định trả lời trong dungeon một cách ngẫu nhiên, nên không dùng để đo giá trị của việc nhìn trước.

Kết quả 25 đời mỗi kiểu, ngày 14/11/2026:

| Bot | Tuổi thọ trung bình | Grade tốt nhất trung bình | Đạt G5+ | Đời chết trong dungeon | Event mỗi đời |
|---|---|---|---|---|---|
| `door` | 30,6 | 6,6 | 12% | 72% | 57,7 |
| `tactical` | 73,9 | 6,88 | 4% | 24% | 57,4 |
| `lookahead` | 84,5 | 3 | 48% | 16% | 113,6 |

Hai việc cần xem lại:
- **Cách chơi dungeon quyết định tuổi thọ nhiều hơn mọi thứ khác.** Từ `door` sang `tactical`, tuổi thọ tăng 43 năm chỉ nhờ đọc tỷ lệ trong dungeon, biết rút khi HP thấp và chọn hợp đồng theo giá trị kỳ vọng. Người chơi thật có thấy những con số này không? Nếu thấy, cần làm cho việc đọc chúng dễ hơn. Nếu không, các bot đang đánh giá quá thấp người chơi.
- **Nhìn trước giúp leo Grade quá nhanh.** `lookahead` đạt G5+ ở 48% số đời, `tactical` chỉ 4%. Lợi thế tới từ việc biết trước lựa chọn nào mở kỳ thăng hạng trong 1–2 năm tới. Cần xem các mốc thăng hạng có quá khó đoán với người chơi bình thường không, và cửa khóa ở Đợt 174 đã đủ để chỉ đường chưa.

## Để sau
- **Khủng hoảng E.G.O theo niềm tin.** Những lựa chọn quan trọng qua nhiều năm định hình câu hỏi mà nhân vật phải đối diện. Người luôn giữ lời và người luôn tìm đường thoát gặp hai khủng hoảng khác nhau. Tránh biến cơ chế này thành thang thiện–ác hay công thức chắc chắn để lấy E.G.O.
- **Giao diện không đáng tin khi SP thấp hoặc trước ngưỡng E.G.O hay Distortion.** *Tham khảo: Slay the Princess, Inscryption, Eternal Darkness.* Nhãn lựa chọn, tỷ lệ thành công hoặc giọng dẫn bị lời thì thầm bóp méo trong 1–2 khoảnh khắc. Vượt qua bằng E.G.O thì lớp nhiễu bị xé ra. Ba điều kiện bắt buộc:
  - Chỉ xảy ra ở ngưỡng E.G.O hoặc Distortion, không xảy ra mỗi khi SP thấp.
  - Luôn còn một nguồn nói thật: dòng cảnh báo của vết sẹo, hoặc số thật khi focus vào lựa chọn. Trình đọc màn hình đọc số thật.
  - Tôn trọng `prefers-reduced-motion`.
- **Đọ chiêu đầy đủ:** ghép thẻ nghề, đồ Workshop, kỹ năng đồng đội hay E.G.O vào từng ý định đối phương. Làm khi bước 5 cho thấy người chơi dùng ý định đối phương để quyết định.
- **Nhiều District với luật riêng và di chuyển giữa các District.** *Tham khảo: Sunless Sea, Kenshi.* Mỗi vùng có luật ngầm riêng, ví dụ Outskirts không có luật Wing nhưng có vật liệu quý, District 21 chịu luật Đại Hồ. Làm khi một khu phố ở bước 1 đã chạy tốt.
- **Thư viện giữa người chơi.** Sách của người chơi khác thỉnh thoảng hiện ra thành một Fixer lạ hoặc một cái tên trên bảng ủy thác. Server chỉ lưu dữ liệu đã kiểm duyệt (số liệu, tên chọn từ bộ sinh tên, không có văn tự do). Làm khi bước 6 đã cho thấy dấu vết trong dòng họ hấp dẫn người chơi.
- **Chân dung thay đổi theo đời.** Bóng người SVG ghép lớp theo sẹo, tay giả, E.G.O, Distortion và màu Color, hiện trên hồ sơ và thẻ di cảo.
