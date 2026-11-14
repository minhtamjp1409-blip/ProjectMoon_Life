# Hồ Sơ Sinh Tử: kẻ thù biết nhớ và bản đồ di chuyển

Tài liệu thiết kế để bàn trước khi đưa vào `docs/KE_HOACH_TIEP_THEO.md`.

**Ý tưởng gốc:** đưa lối chơi kiểu Nemesis System (*Middle-earth: Shadow of Mordor / Shadow of War*) vào The City. Kẻ thù nhớ người chơi, mang sẹo trở lại, thăng cấp nhờ thắng người chơi và truyền mối thù sang đời sau. Đi kèm có hai phần nữa: chọn đồng đội cho phi vụ, và di chuyển giữa các District trên bản đồ.

Bản này viết lại từ bản nháp đầu, giữ nguyên ý tưởng. Những thay đổi chính:
- Phần "đã có sẵn" được sửa cho đúng với code, có số đo ngày 14/11/2026.
- Thứ tự làm được chia lại thành các lát nhỏ, mỗi lát đo được.

**Về tên gọi.** Warner Bros. có bằng sáng chế ở Mỹ cho hệ Nemesis, cấp năm 2021. Game chữ nhỏ khó bị nhắm tới, nhưng trong game và trong tài liệu công khai nên dùng tên riêng là **Hồ Sơ Sinh Tử**, không gọi là "Nemesis System". Thiết kế dưới đây đi theo chất Project Moon (Hana, Syndicate, Wing, Distortion), không chép từng khâu của Shadow of War. Nếu phát hành thương mại thì cần hỏi người có chuyên môn pháp lý.

## 1. Người chơi phải cảm thấy gì

1. **"Hắn nhớ mình."** Kẻ từng thắng bạn nhắc lại lần đó. Kẻ bạn từng hạ biết bạn thắng bằng cách nào và đề phòng đúng cách đó.
2. **"Thua cũng để lại dấu."** Mỗi lần bạn thua hay bỏ chạy, kẻ thù lên một bậc, có danh hiệu mới và chiếm thêm địa bàn.
3. **"Hắn quay lại."** Kẻ tưởng đã chết trở về một lần, mang sẹo hoặc tay giả, và nói rõ ai đã gây ra vết sẹo đó.
4. **"Chỗ mình ở quyết định ai tìm tới mình."** Mỗi kẻ thù có địa bàn riêng. Dọn sang District khác là một cách trốn, nhưng District mới cũng có kẻ thù của nó.

## 2. Hiện trạng trong code

Số đo dưới đây lấy từ 300 đời bot ngẫu nhiên, 60 đời bot `door` và 40 đời bot `tactical`, trên commit `bc47799`.

### 2.1. Phần kẻ thù

| Thứ đã có | Ở đâu | Độ phủ đo được |
|---|---|---|
| Ô `rival` (đối thủ cùng lứa) | Sinh từ trận đánh nhau thời thơ ấu ([lifeMinors.js:460](../src/data/lifeMinors.js#L460), [lifeMinors.js:469](../src/data/lifeMinors.js#L469)). Người chơi tương tác được qua `npcInteractions.js` | **Khoảng 60% số đời** (126/200 bot ngẫu nhiên, 22/40 bot `tactical`) |
| Ô `nemesis` (kẻ thù) | Tạo khi đồng đội phản bội ([director.js:427](../src/engine/director.js#L427), [fixerContracts.js:257](../src/engine/fixerContracts.js#L257)) | **Chỉ 2/300 đời** |
| Kẻ thù quấy rối mỗi năm | [narrativeArcEngine.js:660](../src/engine/narrativeArcEngine.js#L660): mỗi năm 14% khả năng, trừ 3 SP. Sau 3 lần thì gieo event báo thù | Chưa đời nào trong mẫu đo bị quấy rối lần nào |
| Event báo thù `csq_npc_rival_reckoning` | [narrativeArcEngine.js:319](../src/engine/narrativeArcEngine.js#L319), nhận cả `rival` lẫn `nemesis` | 26/200 đời ngẫu nhiên, 8/40 đời `tactical` |
| Kẻ thù truyền sang con cháu | [characterCreation.js:543](../src/engine/characterCreation.js#L543) | Có, nhưng hiếm vì ô `nemesis` hiếm |
| Hồ sơ NPC đủ để "thăng cấp" và "nhớ" | `ensureNpcAgency` ([npcPersonality.js:544](../src/data/npcPersonality.js#L544)) gắn cho mỗi NPC: archetype, `want/fear`, `job`, `rank`, `rankLabelVi/En`, `district`, `dungeonPerk`, `crisis`, `debts`, `memories` | Mọi NPC chính |
| Thói quen của người chơi | `char.habits`, `dominantHabit` trong `eventDirector.js` (Đợt 175) | Đã chạy cho Director |
| Kẻ địch có ý định trong dungeon | `dungeonCombat.js` (kiểu gauntlet) | Ý định chạy vòng cố định, chưa phản ứng với người chơi (`AI-1`) |
| Rủi ro phản bội | `getNpcBondState` cho 4–28%. Hiện chỉ dùng ở hợp đồng Fixer ([fixerContracts.js:251](../src/engine/fixerContracts.js#L251)) | Chưa có trong dungeon |
| Đồng hành trong dungeon | `session.companion`, **một người** | |

**Kết luận phần kẻ thù:**
- Khung đã có: ô kẻ thù, quấy rối, báo thù, truyền đời, hồ sơ NPC có cấp bậc và địa bàn.
- Nhưng **cửa vào quá hẹp**: chỉ phản bội mới tạo ra kẻ thù.
- **Kẻ thù cũng không làm gì có ý nghĩa**: trừ 3 SP rồi chờ.
- Ô `rival` có ở 60% số đời, nên đây mới là nguồn kẻ thù tự nhiên.

### 2.2. Phần bản đồ và di chuyển

Phần này **đã có nhiều hơn bản nháp đầu nghĩ**:

| Thứ đã có | Ở đâu |
|---|---|
| Bản đồ 26 District cộng Outskirts | `CityBirthAtlas.jsx`: `DISTRICT_POINTS`, `CELLS`, `atlasTargetView`. Mới dùng ở màn khai sinh |
| Tách nơi sinh khỏi nơi đang ở | `char.birthRegionId` và `char.regionId` ([characterCreation.js:471-472](../src/engine/characterCreation.js#L471-L472)) |
| Chuyển District | `TRANSIT_HUBS`, `canRelocateDistrict`, `relocateCharacterDistrict` trong [cityUpgrades.js:315-528](../src/engine/cityUpgrades.js#L315-L528). Có từ Đợt 64 và có test (`tests/test_batch64_system_upgrades.mjs`) |
| Luật chuyển | Mỗi năm một lần. Mất 20–24 Ahn, giảm nửa nếu có thẻ VIP (Nest, Color, Wing rank ≥ 2). Từ Outskirts vào thành phải đủ 18 tuổi và có giấy thông hành, hoặc Network/Rep ≥ 25 |
| 6 điểm đến | K (y sinh), J (sòng bạc), L (sương Enkephalin), T (đồng hồ 28 giờ), P (vòm bảo tồn), U (Đại Hồ). Mỗi nơi có hiệu ứng lúc tới, cùng đặc tính cộng trừ mỗi cuối năm (`applyRegionalSingularityPassive`, gọi ở [yearEnd.js:566](../src/engine/yearEnd.js#L566)) |
| Phương tiện | Tàu WARP khoang phổ thông (K, P) làm mất SP và tăng Resonance nếu không có VIP. Đoàn xe Devyat', phà U Corp, tàu T-Track |
| Các hệ theo nơi đang ở | Gần như mọi chỗ trong engine đọc `char.regionId`: điều kiện event (`need.regions`), bản tin, phong tỏa hàng hóa, cảnh nền, kinh tế, dungeon. Dọn đi thì nội dung tự đổi theo |
| Dungeon WARP | `warp_train` đã có |

**Những chỗ còn thiếu hoặc lệch:**
1. **Người chơi gần như không dùng tới.** Nút chuyển nằm trong tab "TRANSIT" của cửa hàng Workshop (`WorkshopDepotModal.jsx`, mở từ `PlayBar`). Không bot nào ngoài `door` dọn đi (5/60 đời). Chưa có số đo của người chơi thật.
2. **Không về lại được.** Chỉ có 6 điểm đến. Không có tuyến về District nơi sinh, không có tuyến ra Outskirts, cũng không có W (District 23, quê của tàu WARP).
3. **Đi là tới ngay.** Không có chuyện gì xảy ra dọc đường.
4. **Đặc tính vùng chỉ tính cho người đã dọn đi.** `yearEnd.js:566` chỉ gọi khi đã có `lastRelocatedAge`, nên người sinh ở K không được hưởng đặc tính K. Cần quyết định đây có phải chủ ý không.
5. **Sai số District.** `TRANSIT_HUBS` ghi U Corp là "District 19". Trong `REGIONS` (`worldData.js`) U Corp là District 21, và U là chữ cái thứ 21.
6. **Lỗi nhỏ trong `cityBlackboard.js`:** [cityBlackboard.js:37](../src/engine/cityBlackboard.js#L37) so `regionId === 'Backstreets'`, nhưng id vùng là chữ cái A–Z, nên nhánh này không bao giờ đúng.
7. **NPC có `district` nhưng không ai thấy.** Trường này có sẵn, nhưng chưa dùng để quyết định NPC xuất hiện ở đâu.

## 3. Thiết kế Hồ Sơ Sinh Tử

### 3.1. Ai thành kẻ thù

Kẻ thù đi vào hồ sơ từ bốn cửa:

| Cửa | Nguồn trong code | Ghi chú |
|---|---|---|
| Đối thủ cùng lứa trở mặt | Ô `rival` có sẵn | Khi bond với `rival` xuống dưới 15, hoặc người chơi làm nhục họ trong một event |
| Đồng đội phản bội | Đường có sẵn ở `director.js:427` | Giữ nguyên |
| Kẻ đánh bại người chơi | Hợp đồng Fixer thất bại, rút khỏi dungeon, thua trong event có `clash` | Mới. Sinh NPC bằng `ensureNpcAgency` với nghề hợp với bối cảnh |
| Người bị bỏ lại | Người chơi rút lui khi đồng hành bị thương | Mới. Người đó không chết mà bị phe kia giữ, rồi quay lại |

**Giới hạn:** tối đa **3 kẻ thù** cùng lúc trong `char.foes`. Một người trong số đó là "kẻ thù chính", và ô `char.npcs.nemesis` trỏ tới người này để code cũ vẫn chạy. Khi đã đầy 3 mà có kẻ mới, kẻ yếu nhất hoặc lâu không gặp nhất rời khỏi hồ sơ, kèm một dòng log.

**Dữ liệu mỗi kẻ thù.** Dùng lại hồ sơ NPC, chỉ thêm những trường sau:

```js
{
  // các trường của ensureNpcAgency: archetype, want/fear, job, rank, rankLabelVi/En, district...
  foeSince: 27,                 // tuổi người chơi lúc thành thù
  origin: 'defeated_you',       // rival | betrayal | defeated_you | abandoned
  titlesVi: ['Kẻ Cắt Đường Ray'],
  scars: [],                    // sẹo kẻ thù mang, có ghi ai gây ra
  memory: {
    beatYouBy: 'quick',         // cách hắn từng thắng bạn
    lostToYouBy: null,          // cách bạn từng thắng hắn: motif hoặc thói quen
    encounters: 2
  },
  returnedOnce: false,
  lastSeenAge: 29
}
```

### 3.2. Vòng va chạm

| Chuyện xảy ra | Kết quả cho kẻ thù | Người chơi thấy gì |
|---|---|---|
| Người chơi thua hoặc bỏ chạy | `rank + 1`, nhận một danh hiệu gắn với lần thắng, ghi `beatYouBy` | Một dòng log nêu tên hắn và danh hiệu mới |
| Người chơi thắng, kẻ thù gục | 25% sống sót **nếu `returnedOnce === false`**. Trở lại sau 2–4 năm, mang một vết sẹo do chính người chơi gây ra, ghi `lostToYouBy` | Lúc hạ hắn: "Không ai thấy xác." Lúc hắn trở lại: tả vết sẹo và nhắc lại trận cũ |
| Người chơi thắng lần thứ hai | Chết hẳn | Ghi vào Codex và di cảo |
| Người chơi tha mạng | Bond về 20, `origin` đổi thành `spared` | Có thể thành đồng minh về sau (phần 4) |

**Kẻ thù nhớ cách bạn đánh.** Khi gặp lại, nếu `lostToYouBy` trùng `dominantHabit(char)`, lựa chọn đi theo thói quen đó bị trừ 10–15 điểm kiểm định. Luật này phải **hiện cho người chơi thấy trước**, ví dụ: "Hắn nhớ bạn luôn lao vào trước. Lần này hắn chờ sẵn." Không phạt ngầm. Lối này nối thẳng với `AI-1` và với thói quen người chơi đã có từ Đợt 175.

**Thay cho 14% quấy rối hiện nay.** Mỗi năm, mỗi kẻ thù làm đúng một việc, chọn theo `want` của hắn và khoảng cách tới người chơi:
- **Leo lên:** `rank + 1` nếu đủ năm.
- **Săn bạn:** chỉ khi hắn ở cùng District với bạn hoặc District kề bên. Hắn chen vào một event của năm sau.
- **Gây sự với kẻ thù khác của bạn:** một trong hai bị thương hoặc mất địa bàn.
- **Nằm im.**

Kết quả hiện qua bản tin thành phố, mỗi năm tối đa 1 dòng về kẻ thù. Đây là phiên bản nhỏ của `AI-2`, chỉ áp dụng cho kẻ thù.

### 3.3. Truyền đời

Dùng lại [characterCreation.js:543](../src/engine/characterCreation.js#L543), nhưng chỉ truyền **kẻ thù chính** và chỉ khi hắn còn sống. Con cháu nhận một dòng giới thiệu trong phần mở đầu đời mới, kèm danh hiệu hiện tại của hắn. Phần này nối với Bước 6 của lộ trình.

## 4. Đồng đội, phản bội và nội gián

Giữ ý tưởng của bản nháp, nhưng làm theo thứ tự.

**Bước đầu: chọn ai đi cùng, vẫn một vị trí.**
- Trước khi vào dungeon hoặc nhận hợp đồng lớn, người chơi chọn một người trong số NPC đang có (bạn, người yêu, thầy, đối thủ đã làm hòa, kẻ thù đã tha).
- Thẻ chọn hiện ba thứ: perk dungeon, mức bond và rủi ro phản bội lấy từ `getNpcBondState`.
- Cách này đã tạo được bài toán của bản nháp ("mang tay mở khóa tham lam hay mang bạn trung thành") mà chưa cần đội 3 vị trí.

**Phản bội có dấu hiệu.**
- Đưa `betrayalRisk` vào dungeon ở chặng cuối.
- Phản bội chỉ nổ khi `want` của NPC trùng với phần thưởng của chặng đó (ví dụ `nestdreamer` gặp giấy phép Nest).
- Người chơi luôn được báo trước một chặng ("Hắn cứ nhìn về phía kho hàng").
- **Điều kiện trước:** cân bằng lại bond. Hiện bond trung vị ở tuổi 30 chỉ là 50, nên nếu ai dưới 52 cũng có thể phản bội thì gần như cả đội đều nguy hiểm. Làm sau mục B1 trong `docs/SUA_SAU_TEST_14_11.md`.

**Người bị bỏ lại** đi vào cửa `abandoned` ở mục 3.1.

**Để sau:**
- Đội 3 vị trí (Mũi nhọn, Thâm nhập, Hậu tuyến) với 19 perk trong `npcPersonality.js`. Muốn làm thì phải viết lại phần đồng hành trong `dungeonEngine.js` và cân bằng lại 8 dungeon.
- Cài nội gián.
- Thủ tiêu để lấy đồ.

Chỉ làm những phần này khi bước chọn đồng hành cho thấy người chơi thật sự cân nhắc ai đi cùng.

## 5. Bản đồ trong màn chơi và di chuyển

### 5.1. Đưa bản đồ vào màn chơi

- Mở bản đồ từ dải District trên màn chơi (mục D3 trong `docs/SUA_SAU_TEST_14_11.md`).
- Dùng lại `CityBirthAtlas` với một chế độ chỉ để xem.
- Bản đồ hiện:
  - nơi đang ở và nơi sinh;
  - các điểm đến đi được, kèm giá vé;
  - District có kẻ thù đóng chốt;
  - vùng đang bị phong tỏa (`cityConditions`).
- Để bản đồ không loãng, chỉ đánh dấu 5–7 **điểm nóng**: nơi sinh, nơi đang ở, các District có kẻ thù, vùng phong tỏa, và District của event lớn đang chờ.
- Trên 390px, dùng khung phóng to `atlasTargetView` như ở màn khai sinh.

### 5.2. Di chuyển

1. **Chuyển nút đi từ cửa hàng sang bản đồ.** Giữ nguyên luật trong `canRelocateDistrict`. Tab "TRANSIT" trong cửa hàng chỉ còn một nút dẫn sang bản đồ.
2. **Thêm điểm đến:**
   - tuyến về District nơi sinh (giá thấp);
   - W (District 23) bằng WARP;
   - Outskirts bằng đoàn xe, kèm luật đã có cho cờ `Outskirts`.

   Sửa nhãn U Corp thành District 21.
3. **Hai cách đi, giữ đúng ý bản nháp:**
   - **Đường bộ, đoàn xe Backstreets.** Rẻ, chỉ tới District kề bên. Rút một event nhỏ dọc đường: chốt kiểm soát, buôn lậu, hoặc kẻ thù chặn đường nếu tuyến đi qua địa bàn của hắn.
   - **Tàu WARP.** Hạng nhất đắt nhưng an toàn. Hạng phổ thông rẻ, có xác suất nhỏ (khoảng 5%) kéo người chơi vào dungeon `warp_train` có sẵn, và luôn kèm phần mất SP đang có.
4. **Gắn vào kế hoạch năm.** Di chuyển là một lựa chọn trong `YearPlanDock` lúc đầu năm, để không thêm lượt bấm giữa năm. Vẫn giữ giới hạn mỗi năm một lần.
5. **Đặc tính vùng.** Quyết định một trong hai cách:
   - áp cho mọi người đang ở vùng đó, kể cả người sinh ra ở đó;
   - giữ như hiện nay, chỉ áp cho người dọn tới, và ghi rõ trong `LUAT_HIEN_HANH.md`.
6. **Liên kết với kẻ thù.** Kẻ thù chỉ "săn" được khi ở cùng District hoặc District kề bên. Dọn đi xa là cách thoát, nhưng có giá: tốn tiền, mất Network ở nơi cũ (P Corp đã có `-3 Network`), và District mới có thể là địa bàn của kẻ thù khác. Outskirts giảm Heat nhanh hơn nhưng nguy hiểm hơn.

### 5.3. Luật riêng từng vùng

Bản nháp đề xuất luật cho K, T, W, L, U và Outskirts. Bốn vùng K, T, L, U đã có luật trong `TRANSIT_HUBS`, nên chỉ cần thêm W và Outskirts. Viết lời theo `.agents/skills/vi-prose`.

## 6. Nguyên tắc giữ nhịp

1. **Không thêm lượt bấm giữa năm.** Di chuyển và chọn đồng hành đều diễn ra ở đầu năm hoặc ngay trước dungeon.
2. **Hồ sơ nhỏ.** Tối đa 3 kẻ thù và 5–7 điểm nóng trên bản đồ.
3. **Công bằng.** Mọi bất lợi do kẻ thù nhớ dai, hay do đồng đội sắp trở mặt, đều được báo trước ít nhất một dòng.
4. **Mỗi lát có số đo** bằng công cụ trong `tools/sim` trước khi làm lát sau.
5. **Đúng thuật ngữ:** Finger, Little Sibling / Big Sibling theo `careerGates.json`, District theo `REGIONS`.

## 7. Lộ trình theo lát

| Lát | Nội dung | Số đo để qua |
|---|---|---|
| 0. Dọn đường | Sửa nhãn U Corp; sửa `cityBlackboard.js:37`; dải District trên màn chơi (D3); cân bằng bond và đỡ đòn chết (B1) | Test cũ vẫn qua; bond p90 ở tuổi 30 tăng lên khoảng 75 |
| 1. Hồ sơ kẻ thù | `char.foes` tối đa 3, mở bốn cửa vào; thua thì kẻ thù thăng bậc; thắng thì có thể trở về một lần; mỗi năm kẻ thù làm một việc; mục "Kẻ thù" trong hồ sơ nhân vật | 40–60% số đời có ít nhất một kẻ thù; mỗi kẻ thù gặp lại trung bình ít nhất 2 lần; không kẻ nào trở về quá 1 lần |
| 2. Kẻ thù nhớ cách bạn đánh | `lostToYouBy` so với `dominantHabit`; câu báo trước; gắn kẻ thù vào kẻ địch gauntlet trong `dungeonCombat.js` (phần đầu của `AI-1`) | Bot luôn đánh một kiểu thua kẻ thù cũ nhiều hơn bot đổi kiểu |
| 3. Bản đồ và di chuyển | Bản đồ trong màn chơi; chuyển nút sang bản đồ; thêm tuyến về nơi sinh, W và Outskirts; event dọc đường; di chuyển trong kế hoạch năm; kẻ thù có địa bàn | Bot `door` và một bot mới `mover` dọn đi ở 20–40% số đời; event dọc đường không đẩy tỉ lệ chết lên quá 2 điểm |
| 4. Chọn đồng hành và phản bội | Chọn một người trước dungeon; `betrayalRisk` có báo trước ở chặng cuối; cửa `abandoned` | Tỉ lệ phản bội 5–15% số lần có đồng hành mang tag dễ đổi phe; luôn có dòng báo trước |
| 5. Mở rộng | Đội 3 vị trí, nội gián, bảng phân cấp 3 tầng, kẻ thù tranh nhau địa bàn | Chỉ làm khi lát 1–4 đạt số đo. Ghép vào `AI-2`, `AI-4` và Bước 6 |

## 8. Cần quyết định trước khi làm

1. Đặc tính vùng áp cho mọi người đang ở vùng đó, hay chỉ cho người dọn tới?
2. Kẻ thù chính truyền sang con cháu, hay cả 3 kẻ thù?
3. Khi thua kẻ thù, người chơi có mất gì ngoài HP không, ví dụ mất địa bàn hoặc mất khách hàng (Network)?
4. Tên trong game: giữ "Hồ Sơ Sinh Tử", hay chọn tên khác?
