# Hồ sơ sinh tử và bản đồ đời sống The City

Ngày biên soạn: **14/11/2026**. Trạng thái: **thiết kế đề xuất, chưa triển khai**.

Tài liệu này thay bản nháp Nemesis/đội hình/bản đồ trước đây. Đây là kế hoạch để thực hiện dần, không phải luật đang chạy. Luật hiện hành ở [LUAT_HIEN_HANH.md](LUAT_HIEN_HANH.md), tiến trình ở [PROGRESS_LOG.md](../PROGRESS_LOG.md), lộ trình chung ở [KE_HOACH_TIEP_THEO.md](KE_HOACH_TIEP_THEO.md). Không đánh dấu hoàn thành chỉ vì thiết kế đã được viết.

## 1. Mục tiêu sản phẩm

Người chơi nhận ra người từng gặp, hiểu vì sao người ấy giúp hoặc hại mình, có cách phản ứng và thấy hệ quả về sau. Nơi ở, công việc, quan hệ và lịch sử cùng tạo chuyện.

Nguồn tham khảo: lịch sử va chạm của Shadow of Mordor/Shadow of War; nhân vật có lịch sử của Wildermyth; chuyện phát sinh từ các hệ thống trong RimWorld; tiến trình của người khác trong Citizen Sleeper. Nội dung và luật triển khai được viết riêng theo Project Moon.

Một cuộc đời bình thường cũng có dấu vết: chủ phòng khám nhớ người cứu nguồn thuốc, người làm chứng giữ hồ sơ, học trò tiếp quản Office. Không cần đạt Color mới có chuyện truyền sang đời sau.

**Giữ chất life sim:** cơ hội đến từ đời đã sống và hoàn cảnh, người chơi chọn cách ứng xử. Tránh biến mỗi năm thành vòng bắt buộc chọn trùm, tuyển đội rồi lấy chiến lợi phẩm.

### Quyết định thiết kế đã chốt

- Thua hoặc rút lui không tự tăng Grade/chức vụ của đối phương.
- Không có tỷ lệ hồi sinh chung 25%. Người đã xác nhận chết không tự trở lại.
- Người bị bỏ lại không mặc định sống rồi phản bội.
- Bond 52 không phải công tắc phản bội; Bond không xóa nghĩa vụ khác.
- Tính cách không tự cấp chuyên môn kỹ thuật.
- Hình dạng bản đồ không xác định đường đi và quyền cư trú.
- Đi công việc, chuyển nhà và chuyển nơi làm việc là ba hành động riêng.
- Đi Outskirts không xóa Taboo hoặc hủy phán quyết Head đã mở.
- Bắt đầu với một đồng hành. Đội ba vị trí chỉ thử khi có bằng chứng cần thiết.
- Giữ NPC qua thế hệ phải tính tuổi và thời gian thế giới.

## 2. Quy mô bản thử đầu

| Thành phần | Giới hạn khởi đầu |
|---|---|
| Người liên quan trực tiếp | 4–6, gồm đồng minh, nhân chứng và đối thủ |
| Đối thủ chủ động gây sức ép | Tối đa 2 trong cùng thời kỳ |
| Địa bàn | Một District thí điểm, một khu phố phóng tác rõ ràng |
| Địa điểm thường gặp | Tối đa 3: đầu mối nghề, nơi chữa trị, nơi sinh hoạt |
| Đối thủ thử nghiệm | Một cuộc gặp đầu, một lần tái ngộ, có đường khép lại |
| Đồng hành | Một người, dùng lại lựa chọn cũ nếu vẫn hợp lệ |
| Thông báo | Tối đa một bản tin mạng lưới/năm; cảnh lớn dùng chung ngân sách Director |
| Qua thế hệ | Chưa bật cho tới khi lịch thế giới và save hoạt động |

Đây là tham số prototype, phải đo lại. Người ngoài giới hạn hoạt động được lưu vào lịch sử, không chết hoặc biến mất để nhường slot.

## 3. Code có thể dùng lại và phần cần xây

Đối chiếu lại khi bắt đầu từng pha vì code đang thay đổi. Đường dẫn dưới đây là điểm đọc/ghép dự kiến.

| Thành phần | Đã có | Cần thêm |
|---|---|---|
| Bản đồ | CityBirthAtlas.jsx: tọa độ, đa giác, MapInk, phóng to | Marker, hiểu biết, tuyến và quyền tiếp cận |
| NPC | npcPersonality.js: tính cách, want/fear, nghề, rank, perk, memories | ID bền, mục tiêu có mã, quan hệ giữa người, encounter |
| Vai quan hệ | char.npcs: friend/partner/mentor/rival/nemesis | Truy cập theo ID và chống nhân bản khi đổi vai |
| Bond | getNpcBondState: rủi ro 0–28% tùy trạng thái/tag | Cơ hội, động cơ, báo trước và phản ứng |
| Dungeon | session.companion là một người, perk và mục tiêu | Chọn người cụ thể, hậu quả chuyến đi; nhiều người làm sau |
| Di chuyển | cityUpgrades.js: hub, phí, điều kiện, một lần/năm | Đi việc tạm thời, tuyến trở về, giao dịch hành trình |
| Thế giới | cityConditions.js và cityBlackboard.js | Trạng thái địa phương bền và phe độc lập |
| Nhân quả | Thread, arc, bản tin | Gắn người/nơi cụ thể, nhánh theo kết quả, hủy/đổi nhánh |
| Kế thừa | Hồ sơ đời, ancestor landmark, kỷ vật, nemesis cũ | Lịch chung, già đi, kế nhiệm, snapshot thế giới nhỏ |
| Save | saveSchema.js, clone, lưu run và archive | Migration và kiểm tra tham chiếu theo từng pha |

Blackboard hiện có nhiều chỉ số suy từ nhân vật. Chẳng hạn activeSyndicateWar liên quan motif violence; chưa phải hai phe độc lập tranh một địa bàn. wantVi/fearVi là lời mô tả, không được dò câu tiếng Việt để quyết định hành vi.

### Ghi nhận lịch sử cần kiểm tra lại

Bản trước ghi đo trên commit bc47799: nemesis có ở 2/300 đời; rival có ở 126/200 đời ngẫu nhiên và 22/40 tactical; reckoning có ở 26/200 và 8/40 đời. **Chưa xác minh lại các số này trong lần biên soạn tài liệu.** Không dùng như tỷ lệ cân bằng hiện tại.

Các mục phải kiểm tra bằng code/test mới: nhãn U Corp theo REGIONS; nhánh regionId === 'Backstreets'; nội tại vùng cho người sinh tại đó; tuyến trở về nơi sinh; độ phủ nút chuyển vùng; hồi âm gọi người đã chết/rời đi. D3/B1 từng được nhắc trong nháp có thể đã hoàn tất, cần đọc log để tránh làm lại.

## 4. Dữ liệu nền và quyền sở hữu

### 4.1. Hợp đồng đích đề xuất

```js
cityWorld = {
  schemaVersion: 1,
  worldId,
  year,
  peopleById: {},
  placesById: {},
  relations: [],
  facts: [],
  actionQueue: [],
  lastAdvancedYear: null
};

npcRoles = { friend: npcId, mentor: npcId, nemesis: npcId };
crewSelection = { fieldNpcId: npcId, supportNpcId: null };
```

Đây là shape đề xuất, chưa phải API có sẵn. Pha nền chốt vị trí sở hữu cityWorld trong snapshot hiện hành; không thêm một hệ save riêng chạy song song.

- Một NPC chỉ có một nguồn dữ liệu chuẩn. Đội, danh sách đối thủ và vai quan hệ tham chiếu ID.
- Không lưu một bản người trong char.foes và một bản khác trong char.npcs rồi ghi độc lập.
- Vai nemesis cũ là đường tương thích tới đối thủ chính, không phải danh tính mới.
- Adapter cho code cũ phải có một chiều ghi rõ ràng. View tương thích không được trở thành bản chuẩn thứ hai trong save.
- Trước khi bật registry mới, rà nơi ghi Bond, fate, naming, nghề, death-save và đồng hành. Không bật nửa chừng rồi để adapter ghi đè thay đổi.
- NPC cũ được cấp ID trong migration và lưu lại; tên, chỉ số mảng và thời gian máy không phải ID.

### 4.2. Hồ sơ tối thiểu

| Nhóm | Trường cần có |
|---|---|
| Danh tính | id, tên, birthYear hoặc mốc tuổi có nguồn, status, statusSinceYear |
| Nghề/vị trí | job, organizationId, gradeOrRank, districtId, placeId nếu có |
| Khả năng | Chuyên môn, kinh nghiệm, thiết bị; tính cách tách riêng |
| Động cơ | goalId, tiến độ, mục tiêu liên quan, điều kiện kết thúc |
| Nghĩa vụ | Người cần bảo vệ, nợ, lệnh hoặc lời hứa |
| Lịch sử | encounterId, năm, kết quả, người/nơi liên quan |
| Hoạt động | Cooldown, thương tích, đang ở xa, nguồn lực, ý định đang chờ |

Chỉ thêm trường có nơi đọc và tác dụng gameplay. Không đưa toàn bộ dữ liệu này thành thanh chỉ số trên HUD.

### 4.3. Sự thật và hiểu biết

Fact quan trọng có mã, đối tượng, năm, nguồn, độ xác nhận và người biết. Ví dụ: thấy đối thủ được kéo đi; nghe tin đối thủ có tay giả; nhận hồ sơ xác nhận tử vong.

Director đọc sự thật. UI và quyết định NPC đọc phần họ biết. Người chơi không có radar chính xác của mọi kẻ thù/nội gián.

### 4.4. Lịch thế giới

- worldYear độc lập với tuổi nhân vật. NPC tăng tuổi theo thời gian thực sự đã trôi.
- Xem bản đồ, mở hồ sơ, load save không tăng năm hoặc chạy lại hành động nền.
- Tua tuổi thơ phải xử lý/tổng hợp các thay đổi nền tới hạn.
- Khi kế thừa, xác định năm và tuổi người tiếp nhận. Không mặc định quay về năm sinh của đời trước.
- Đời độc lập tạo world mới. Kế thừa chỉ tiếp tục snapshot nhỏ đã chọn.
- Timeline phóng tác phải nhất quán với UNIVERSE.md; không lặp một biến cố canon lớn ở mỗi thế hệ.

## 5. Ai trở thành đối thủ

| Cửa vào | Điều kiện |
|---|---|
| Rival cũ | Có sự việc gây đổ vỡ; Bond thấp chỉ là một yếu tố |
| Đồng đội phản bội | Động cơ, cơ hội và hành động đã xảy ra |
| Kẻ thắng người chơi | Là người có danh tính trong cảnh; không sinh Fixer từ quái vật/tai nạn |
| Người bị hại/người liên quan | Có lý do biết người chơi và khả năng hành động |
| Người bị bỏ lại | Còn sống, biết chuyện, có động cơ; kết cục khác vẫn hợp lệ |

Không tự thăng rival thành kẻ thù ở ngưỡng Bond. Khi danh sách hoạt động đầy, người mới/cũ có thể ở ngoại vi. Không xóa người yếu nhất hoặc lâu chưa gặp khỏi thế giới.

Đối thủ phải có đường khép: hòa giải, trả nghĩa vụ, bỏ mục tiêu, bị tổ chức xử lý, mất khả năng đuổi hoặc chết. Không bắt người chơi chịu phục thù vô hạn.

## 6. Kết quả cuộc gặp, sẹo và thăng tiến

| Kết quả | Ghi lại | Hậu quả được phép |
|---|---|---|
| Người chơi rút | Lý do, mục tiêu giữ/mất, người chứng kiến | Đối phương giữ mục tiêu hoặc lợi thế nếu có căn cứ |
| Người chơi thua nhưng sống | Ai cứu, mất gì | Thương tích, nợ, mất hàng/khách; không cộng mọi phạt cùng lúc |
| Đối thủ bị thương rồi thoát | Thương tích và đường thoát | Chữa trị, tốn nguồn lực, có thể gặp lại |
| Không tìm thấy người | missing/unconfirmed, lần thấy cuối | Điều tra/tin đồn, chưa hứa chắc tái xuất |
| Xác nhận chết | dead, nguồn và năm | Hồi tưởng/người liên quan/kế nhiệm |
| Tha mạng/thỏa thuận | Nội dung và nhân chứng | Trung lập, bớt thù hoặc hợp tác thử; không tự trung thành |

### Tái xuất

Quyết định sống sót được ghi cùng giao dịch cuộc gặp, không roll lại sau khi đã in xác nhận chết. Cần đủ: kết quả cho phép sống, nguồn cứu/chữa trị, thời gian, động cơ, đường tiếp cận và cooldown.

Bản thử giới hạn tối đa một lần tái xuất đặc biệt/người. Chưa chốt tỷ lệ chung trước khi đo. Sẹo dựa trên thương tích thật, có người gây và tác dụng phù hợp. Mất tay ảnh hưởng năng lực cho tới khi có giải thích trang bị. Không gán một Wing cung cấp mọi cấy ghép để hợp thức hóa.

### Tiến bộ

Tách kỹ năng chiến đấu, ảnh hưởng địa phương và chức vụ chính thức.

- Thắng có thể cho kinh nghiệm/tài nguyên/danh tiếng trong phạm vi người biết.
- Fixer nâng Grade qua thành tích và quy trình Hana phù hợp luật hiện hành; Color có điều kiện riêng.
- Finger theo luật từng Finger; Wing theo công việc, bảo trợ và vị trí.
- Thương tích, nghèo và thất bại cũng cản tiến bộ. Không có rank++ miễn phí mỗi năm.
- Không đồng nhất Color, Proxy, Maestro và giám đốc Wing trên một thang cấp. Mức nguy hiểm nội bộ không thay danh vị lore.

## 7. NPC và phe tự hành động

Một NPC chọn tối đa một ý định có ý nghĩa/năm: chữa trị, kiếm nguồn lực, làm nghĩa vụ, tìm tin, tranh vị trí hoặc tiếp cận người chơi. Có năm không hành động.

Mỗi hành động có điều kiện, giá, đối tượng và kết quả. goalId/nghĩa vụ quyết định cân nhắc; wantVi/fearVi dùng để kể. Tận dụng Utility AI, không cần LLM quyết định kết quả.

Thứ tự cập nhật đề xuất:

1. Chốt giao dịch người chơi; không tick nền giữa một lựa chọn đang giải quyết.
2. Xử lý tuổi, hồi phục và người tới hạn trở về.
3. Phe và NPC đọc cùng snapshot đầu kỳ rồi đề xuất hành động.
4. Giải xung đột theo thứ tự ổn định, commit một lần.
5. Ghi fact, cập nhật hiểu biết, tạo thread hợp lệ.
6. Director xếp cảnh theo ngân sách năm; bản tin tóm tắt phần còn lại.

Ghi lastAdvancedYear và ID giao dịch. RNG nền độc lập với việc xem UI. AI-4 bắt đầu với hai phe và một nguồn lực/địa điểm tranh chấp; giá hàng, bản tin và event cùng đọc state này.

## 8. Đối thủ thích nghi với chiến thuật

Chỉ học từ hành động đối thủ đã chứng kiến. Motif mercy/greed/loyalty thuộc đời sống; heavy/quick/evade thuộc giao tranh, không so như cùng một nhóm.

- Ghi chiến thuật trong encounter, không đọc hành động chưa bấm hay thẻ bí mật.
- Khi gặp lại, đổi một ý định/đối sách hữu hạn và báo dấu hiệu trước.
- Giữ ít nhất một cách ứng phó hợp lệ, không trừ 10–15 điểm vào mọi lựa chọn vì trùng motif.
- Tránh AI-1 và thử thách thói quen AI-5 cùng phạt một hành vi trên một lượt.
- Nếu phản ứng đúng không cải thiện kết quả thật, sửa ý định/tín hiệu trước khi tăng phạt.

## 9. Đồng hành, tuyển dụng và phản bội

### Một người trước

Chọn trước phi vụ quan trọng. Hiện chuyên môn, tình trạng, quyền tham gia, chi phí và xung đột đã biết. Có đi một mình. Dùng lại người cũ nếu hợp lệ.

Chuyên môn đến từ nghề, kinh nghiệm, dụng cụ và quyền tiếp cận. Người liar không tự giả được giấy Wing, tinkerer không tự phá mọi khóa Singularity.

### Phản bội có nguyên nhân

Bốn bước: **động cơ cụ thể → cơ hội → dấu hiệu → phản ứng**. betrayalRisk cũ chỉ là một đầu vào.

Ví dụ thiết kế: NPC muốn giấy Nest cho gia đình; đối phương có khả năng cấp nó; có cuộc tiếp xúc để lại dấu; người chơi được hỏi, thương lượng, thay người hoặc chấp nhận rủi ro.

Bond cao tăng khả năng nói thật/thương lượng, không xóa nghĩa vụ. Bond thấp không đủ để roll phản bội. UI không phơi phần trăm ý định bí mật; hiện dấu hiệu và xung đột đã biết.

Phản bội có thể là giấu tin, lấy hàng, từ chối tiếp tục hoặc đổi phe. Không phải luôn gây chết ngay. Khi xảy ra vẫn có đường điều tra/hòa giải/đối đầu.

Người bị bỏ lại có thể chết, bị bắt, mất tích, được cứu hoặc tự thoát. Không sinh nemesis bảo đảm.

### Mở rộng có điều kiện

Chỉ thử người hiện trường + hậu tuyến sau khi một người đã tạo lựa chọn khác biệt. Ba vị trí để sau, không bắt mọi Request có đội.

- Mỗi kiểm định có một người phụ trách; hỗ trợ phụ có trần.
- Không cộng thẳng mọi perk hồi máu, giảm sát thương và tăng odds.
- Không nhân quyền đỡ chết thành nhiều mạng miễn phí.
- Theo dõi phí/thương tích từng người; xử lý thiếu người, thay người, chết giữa chuyến.
- Người ở xa, bị giam, không đồng ý hoặc có nghĩa vụ xung đột không tự vào đội.

Thu nạp là hợp tác có điều kiện. Nội gián cần đường tiếp cận và nguy cơ bị lộ, chỉ làm khi phe/thông tin đã chạy. Thủ tiêu không trả Merit/đồ mặc định để farm.

## 10. Bản đồ và hành trình

### Hai lớp độc lập

Hình ảnh dùng lại MapInk/tọa độ/phóng to. Gameplay dùng bảng tuyến: điểm đầu/cuối, phương tiện, giá, thời gian, giấy tờ và điều kiện. Hai đa giác chạm nhau chưa chứng minh có tuyến đường.

Mở từ dải District/hồ sơ. Xem được mọi District để tra cứu nhưng chỉ đánh dấu 3–5 mục liên quan đầu tiên. Lớp mặc định gọn; chọn xem Chỗ ở & công việc / Người đã biết / Cơ hội / Biến động. Có danh sách văn bản tương đương.

Hiện vị trí cuối được biết kèm năm, phân biệt tin đồn bằng chữ. Không lộ nội gián. Bấm điểm đến mở điều kiện/giá/hậu quả trước khi xác nhận.

### Ba hành động

| Hành động | Thay đổi | Không tự cấp |
|---|---|---|
| Đi công việc | Vị trí tạm, tuyến, năm trở về | Hộ khẩu hoặc Wing chủ quản mới |
| Chuyển nhà | Chỗ ở, phí và dịch vụ phù hợp | Quyền Nest hoặc tuyển dụng |
| Xin cư trú/chuyển việc | Giấy tờ/tuyển dụng/quyền lợi | Thành Feather chỉ nhờ mua vé |

Giữ birthRegionId; tách nơi ở, vị trí hiện tại và nơi làm. Bộ lọc event đọc đúng trường. Đi xa không tự xóa toàn bộ Network; cần phân biệt tiếp cận tại chỗ và liên lạc xa.

### Giao dịch chuyến đi

Trạng thái: planned → paid/departed → travelling → arrived / returned / cancelled / interrupted.

- Lưu journeyId, tuyến, người đi, năm, phí đã trả, vị trí thực.
- Không đổi regionId sang điểm đến rồi phát cảnh đường đi như còn ở nơi cũ.
- Xác nhận một lần; load không thu lại phí hoặc roll lại sự cố.
- Thiếu tiền/giấy: không tạo giao dịch dở dang.
- Tuyến bị khóa sau mua có luật hoãn/hoàn/đổi tuyến theo nguyên nhân.
- Khi tới nơi, kiểm tra Request, đồng đội và thread; giữ/hoãn/khép với lý do.
- Cảnh đường đi thay một nhịp phù hợp, không tự chồng thêm ngoài ngân sách.
- Kế hoạch năm có lối vào chuyến đi, không bắt chọn lại điểm đến mỗi năm.

## 11. Ranh giới lore và luật vùng

REGIONS là nguồn tên/số District. Nội tại vùng đọc nơi hiện tại và quyền tiếp cận; không vô tình chỉ áp cho người đã dọn tới. Nếu có thưởng nhập cư thì đặt tên/thời hạn riêng.

| Cơ chế | Quy tắc |
|---|---|
| K Corp | Có công nghệ phục hồi không nghĩa mọi cư dân được thuốc rẻ; cần tiền/tư cách/đầu mối |
| T Corp | Đánh đổi thời gian trong thế giới; không tự rút ngắn đồng hồ đọc của người chơi |
| WARP | Xét phục hồi hành khách và ký ức; Dungeon là sự cố/phi vụ có lý do, không roll thường xuyên vì vé rẻ |
| WARP hạng nhất | Lợi ích cụ thể, không cam kết an toàn tuyệt đối |
| L Corp/Great Lake | Tiếp cận và mục tiêu phù hợp nơi ấy; không kể hầm sập/xà gỗ cho mọi chuyến |
| Outskirts | Có thể cắt dấu phe địa phương nếu có căn cứ; giữ Taboo và Head đã kích hoạt |
| Nest | Giấy phép/bảo trợ và tuyển dụng là điều kiện riêng |

Truy đuổi của chủ nợ, Syndicate, Wing và Head có nguồn/khả năng khác nhau. Heat tổng không đủ giải quyết tất cả. Dùng trạng thái theo nguồn trước khi thêm nhiều thanh tài nguyên.

Sửa luật WARP và nội tại vùng cũ là công việc có test riêng, không coi luật cũ đúng chỉ vì đã có code. Thuật ngữ và nội dung phóng tác theo UNIVERSE.md.

## 12. Ghép vào Director và sự kiện có sẵn

Chỉ có một planner. Hệ mới gửi ứng viên/thread cho planner hiện hành.

- Thread mang sourceEncounterId, ID người/nơi và điều kiện tới hạn.
- Kiểm tra lại danh tính, sống/chết, vị trí và mục tiêu khi mở.
- Người mới nhận vai không nhận ký ức của người cũ.
- Phục kích thay một cảnh; không chen lên lựa chọn đang mở, cutscene, đặt tên hoặc giao dịch save.
- Rút lui/thương lượng có giá rõ khi hoàn cảnh cho phép.
- Thread bất khả thi hết hạn, chuyển tin hoặc nhánh khác; không treo vô hạn/ép hồi sinh.
- Arc đọc kết quả/fact, không chỉ event đã được bấm qua.
- Lời kể có bằng chứng, rời đi, bị bắt hoặc đã cứu phải có dữ liệu tương ứng; nếu chưa xác nhận thì viết đúng dạng tin.
- Tái dùng cảnh bằng người/bối cảnh phù hợp; không thay tên vào một cảnh đòi nghề/quan hệ khác.

## 13. UI cần có để cơ chế dùng được

| Bề mặt | Nội dung và tương tác |
|---|---|
| Hồ sơ người | Nghề, trạng thái, quan hệ đã biết, lần gặp cuối, lịch sử liên kết event gốc |
| Sẹo NPC | Nguồn thương tích và điều nhân vật biết; không chỉ huy hiệu trang trí |
| Chuẩn bị phi vụ | Người chọn, chuyên môn tác dụng, phí, xung đột; đi một mình/dùng lại |
| Bản đồ desktop | Bản đồ và bảng thông tin điểm đang chọn |
| Bản đồ mobile | Marker mở bảng thông tin; danh sách thay thế; không ép roster/đội/kế hoạch vào cùng viewport |
| Event tái ngộ | Dòng nguồn cuộc gặp cũ nếu nhân vật nhớ được |
| Gia phả | Đúng người tiếp nhận, loại di sản và điều họ đã biết |

Tên dài/chữ lớn/song ngữ không tràn. Marker có nhãn, dùng được bàn phím. Màu không thay nhãn trạng thái. Modal giữ focus/chặn input nền, đóng trả đúng chỗ. Mở thông tin không làm trôi đồng hồ hoặc đổi RNG.

Đây là dữ liệu cho UI mới. Bố cục HUD, nhật ký và thanh thao tác vẫn cần thiết kế riêng.

## 14. Nối sang đời sau

Chỉ bật khi lịch và ID qua save đã qua test. Snapshot nhỏ gồm vài người/nơi liên quan, nghĩa vụ còn hiệu lực và lịch sử cần kể. Không mang toàn mạng 26 District hoặc mọi kẻ thù của mọi đời.

- Người còn sống già đi và hành động trong khoảng thời gian đã trôi.
- Người chết để lại hồ sơ, lời kể hoặc người kế nhiệm ID mới.
- Người thừa kế tìm thông tin qua thư/nhân chứng; không tự biết mọi bí mật đời trước.
- Thù không tự truyền cho mọi con cháu: cần động cơ, người biết và khả năng tiếp cận.
- Giữ cả quan hệ tốt và dấu vết người bình thường, không chỉ tổ tiên cấp cao.
- Kỷ vật/kiến thức/nghĩa vụ có thể truyền; E.G.O cá nhân không chuyển chủ.
- Phần thưởng có thể là người mở cửa, giấy tờ hoặc địa điểm đổi khác, không chỉ chỉ số khởi đầu.

## 15. Save, RNG và tương thích

- Mỗi pha thêm state bền có migration phù hợp; xem SAVE_VERSION lúc code, không đóng đinh phiên bản kế tiếp trong tài liệu.
- ID người/encounter không dùng tên, vị trí mảng hoặc thời gian máy.
- Clone và lookahead không sửa registry thật; kiểm tra object/array lồng nhau.
- Cùng seed, lựa chọn và snapshot cho cùng kết quả. RNG nền/hành trình/chiến đấu có quy tắc tách ổn định.
- Save giữa sống sót/phản bội/di chuyển không lặp phí, thương tích, hành động hoặc thưởng.
- Save cũ không bị gán cuộc gặp bịa để lấp lịch sử. Ghi legacy/không rõ khi thiếu nguồn.
- Giới hạn lịch sử chi tiết, giữ fact đang được thread tham chiếu, tóm tắt phần còn lại.
- Backend lưu trữ theo kiến trúc chung; không khôi phục planner backend thứ hai.

## 16. Rủi ro và cách thu nhỏ

| Rủi ro | Dấu hiệu | Xử lý |
|---|---|---|
| Thành game săn trùm | Gặp ai cũng cân nhắc giết lấy đồ | Người dân/đầu mối nghề, đường hòa giải, không trả Merit mọi lần giết |
| Quá tải tên | Người chơi bỏ qua bản tin | Ít người hoạt động, một bản tin/năm, hồ sơ nhắc lý do |
| AI biết hết | NPC phản ứng bí mật chưa thấy | Tách fact và hiểu biết |
| Phản bội là thuế Bond | Dưới ngưỡng luôn bị đánh úp | Động cơ/cơ hội/phản ứng, đo đúng mẫu số |
| Đối thủ farm người chơi | Liên tục lên hạng/phục kích | Tiến bộ có điều kiện, cooldown, ngân sách và kết thúc |
| Rút lui vô ích | Lui vẫn ăn mọi phạt | Ghi mục tiêu giữ/mất; không phạt thêm chỉ vì chọn lui |
| Đội áp đảo | Perk thành gần bất tử | Một người chính, trần hỗ trợ, đo từng nguồn |
| Di chuyển xóa hậu quả | Qua vùng là hết truy nã | Truy đuổi theo nguồn, giữ Head/Taboo |
| Ghost NPC | Người mới nhận ký ức người cũ | ID, thread đúng người, kiểm tra khi mở |
| Kế thừa sai tuổi | NPC nguyên tuổi/chức qua nhiều đời | Lịch thế giới, già đi/kế nhiệm |

Nếu chuẩn bị lâu mà kết quả giống nhau, giữ một đồng hành. Nếu bản đồ chỉ mở một menu khác, thử danh sách điểm đến trước. Nếu P5 gây mâu thuẫn lịch, phát hành P1–P4 và giữ di sản vật chứng hiện có.

Mỗi pha có cờ thử nghiệm; tắt hệ không được xóa lịch sử hay hồi sinh người. Dừng gieo nội dung mới khi an toàn, giữ state đã chốt.

## 17. Lộ trình và cửa nghiệm thu

Không gắn số đợt cố định vì lộ trình chung đang đổi. Chỉ đánh dấu xong sau khi có code và bằng chứng.

| Pha | Phạm vi | Sản phẩm thấy được | Cửa qua |
|---|---|---|---|
| P0: Nền | Baseline, ownership NPC, ID, encounter, RNG, thời gian, adapter | Danh sách điểm ghi và save cũ chạy đúng | Không trùng người/mất Bond/fate qua clone/save |
| P1: Một người nhớ | Rival/đối thủ nghề, tái ngộ có nguyên nhân, đường khép | Hồ sơ và event nhắc đúng chuyện | Không ghost; người chơi hiểu vì sao họ xuất hiện |
| P2: Một địa bàn | District, 3 nơi, hai nhóm lợi ích; bản đồ tra cứu và tuyến đi việc | Tin/giá/cơ hội cùng đọc state | Đi và ở đều có giá trị, không đổi Wing chỉ vì tới nơi, load an toàn |
| P3: Đồng hành | Một người, hai chuyên môn, một xung đột có dấu hiệu | Hai chuẩn bị dẫn tới cách xử lý khác nhau | Đi một mình khả thi theo độ khó; phản ứng có tác dụng, perk đúng |
| P4: Thích nghi | Đối thủ đọc chiến thuật đã thấy, NPC có hành động hữu hạn | Đổi cách đáp có tác dụng, tin có nguyên nhân | Bot đọc ý định tốt hơn bot lặp trong cùng điều kiện; không đọc tương lai |
| P5: Nối đời | Một người/nơi/nghĩa vụ qua snapshot nhỏ | Tuổi, danh tính, kiến thức đời sau đúng | Qua test thời gian/chết/kế nhiệm/save cũ; không truyền E.G.O |
| P6: Mở rộng | Hậu tuyến/nội gián/thêm tuyến/phe có chọn lọc | Mỗi phần tạo quyết định mới | Đo thao tác/độ phủ/balance; có thể dừng ở một đồng hành |

Bản đồ chỉ tra cứu có thể thử sau P0, miễn không kéo hành trình/đội hình/kế thừa vào cùng đợt.

Điểm ghép lộ trình: Bước 1 → P2; Bước 2/AI-4 → P2/P4; Bước 3/AI-2 → P0/P1/P4; Bước 5/AI-1 → P3/P4; Bước 6 → P5. Không mở lại mục đã xong vì bản nháp cũ còn dẫn tên.

## 18. Bộ tình huống phải kiểm thử

### Danh tính và nhân quả

1. Đổi tên/vai giữ ID; hai người trùng tên không nhận lịch sử nhau.
2. NPC chết, bị giam, rời đi hoặc bị thay trước thread: tới hạn đổi/khép đúng.
3. Người chết không trở lại sống; người kế nhiệm có danh tính riêng.
4. Tha mạng không tự cấp Bond cao/tuyển đội; hòa giải có thể bị từ chối.
5. Thua quái vật không sinh Fixer giả làm kẻ thắng.

### Chiến đấu và đồng hành

6. Đối sách chỉ dùng điều đã thấy, có báo trước.
7. Chọn đáp phù hợp đổi nguy cơ thật, không chỉ đổi nhãn.
8. Người xa/bị thương không tự vào đội; đỡ đòn/hồi âm đúng người.
9. Thiếu cơ hội/động cơ thì không roll phản bội; phản ứng kịp có hiệu quả.
10. Không nhân đỡ chết/hồi máu/loot khi thêm hỗ trợ.

### Di chuyển và thời gian

11. Đi việc/chuyển nhà/cư trú ghi đúng trường, giữ nơi sinh/chủ quản nghề.
12. Thiếu điều kiện không trừ phí/đổi chỗ nửa chừng.
13. Load sau trả phí, đang đi, tới nơi chỉ commit một lần.
14. Di chuyển giữ Taboo, không bỏ qua Head đang chờ.
15. Tuổi đúng khi tua/kế thừa; tick nền không lặp năm.
16. Lookahead, xem hồ sơ/bản đồ không thay RNG/state thật.

### Nội dung và UI

17. Thành công, thất bại, mất tích, chết, cứu có lời riêng và đúng fact.
18. WARP, Great Lake, ruins dùng biến thể phù hợp nơi.
19. Marker/danh sách đọc cùng thông tin, không lộ vị trí chưa biết.
20. Kiểm tra 320/390px, desktop, chữ lớn, song ngữ, bàn phím, giảm chuyển động.

Chạy cổng repo bắt buộc theo thay đổi: văn cần lint giọng/vi-prose; state cần save/clone/migration; combat cần đo chiến thuật. Không viết test chỉ xác nhận trường mới tồn tại.

## 19. Đo và quyết định có mở rộng

Baseline ghi commit, seed, chính sách, số đời và cách xử lý kế hoạch năm/chuyến đi/đồng hành. Helper cũ phải được rà trước khi dùng số đo. Bot chỉ đọc thông tin người chơi có thể biết; lookahead hiểu engine không đại diện người mới.

| Câu hỏi | Số đo |
|---|---|
| Có gặp hệ? | Nguồn hợp lệ → tạo đối thủ → tái ngộ → khép |
| Có lặp quá dày? | Khoảng cách gặp, cảnh/người/đời, phần ngân sách |
| Phản bội công bằng? | Cơ hội hợp lệ, dấu hiệu, phản ứng, hiệu quả phản ứng |
| Đi có ý nghĩa? | Cơ hội đi, chọn đi/ở và hệ quả, không chỉ tỷ lệ bot chịu đi |
| Đồng hành có giá trị? | Đổi người đổi lựa chọn/kết quả, có phương án áp đảo không |
| UI có nặng? | Xác nhận thêm, thời gian chuẩn bị, dùng lại, số lần phải tra cứu |
| Giữ life sim? | Người chơi kể được vì sao thù/hợp tác, nhớ người và chuyện |
| Phủ route? | Fixer/Finger/Wing/Outcast/Distortion phù hợp, không ép cùng phi vụ |

Không ép 40–60% đời có kẻ thù hoặc 5–15% chuyến phản bội khi chưa có mẫu số/baseline. Báo cả đời ít cơ hội, chết sớm và không nhận phi vụ.

Thử nhỏ để tìm lỗi, mỗi đợt tối đa 500 đời/chính sách khi cần; dùng cùng seed trước/sau. Mẫu nhỏ không chứng minh tỷ lệ hiếm. Theo dõi tuổi thọ, tài nguyên và nội dung cũ bị lấn mất.

Mục tiêu cứng: **0 ghost NPC; 0 giao dịch lặp; 0 tham chiếu sai; phản bội thực thi có dấu hiệu và phản ứng hợp lệ; không tái xuất quá giới hạn**. Tỷ lệ gameplay chốt sau baseline.

## 20. Checklist bắt đầu code

- [ ] Ghi baseline và đọc các thay đổi đang dở, không ghi đè công việc khác.
- [ ] Xác minh mục 3, tách lỗi thật khỏi lựa chọn thiết kế.
- [ ] Chốt ownership, ID và adapter cho NPC cũ.
- [ ] Rà nơi ghi người ở creation, director, contracts, interaction, dungeon, ending, save.
- [ ] Tạo ca hồi âm sai người/người đã chết để kiểm chứng sửa.
- [ ] Chọn một cuộc gặp cũ, gắn danh tính và một nhánh gặp lại có kết thúc.
- [ ] Đo cảnh/thao tác/ảnh hưởng vòng đời trước khi thêm đội hoặc di chuyển.
- [ ] Cập nhật log và lộ trình chung khi pha thật sự hoàn tất; ghi kết quả đo và phần chưa đạt.
