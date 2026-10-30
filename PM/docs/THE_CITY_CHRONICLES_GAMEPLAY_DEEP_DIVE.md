# THE CITY CHRONICLES: TÀI LIỆU KIẾN TRÚC HỆ THỐNG VÀ CƠ CHẾ GAMEPLAY TOÀN DIỆN
> **Hồ Sơ Chuyên Sâu Về Game Design, Hệ Thống Toán Học Và Động Lực Học Sinh Tồn**  
> **Dành riêng cho Phân tích Cơ chế & Thẩm định Thiết kế Gameplay (Gameplay Deep-Dive)**  
> **Vũ trụ:** Project Moon Universe (The City, Lobotomy Corp, Library of Ruina, Limbus Company)  
> **Tác giả:** Đội ngũ Phát triển Hệ thống Core Simulator

---

## 1. HỆ TIÊN ĐỀ THIẾT KẾ & ĐỘNG LỰC HỌC HỆ THỐNG (SYSTEM AXIOMS)

### 1.1. Triệt Tiêu Sandbox — Mô Phỏng Nhân Quả Sinh Tồn (Emergent Causality vs. Teleological Menus)

Trong lý thuyết thiết kế trò chơi nhập vai (Ludology), các trò chơi thường mắc bẫy **"Lựa chọn Cứu cánh" (Teleological Menus)**: người chơi được đặt trước một menu tùy chọn định mệnh tĩnh (ví dụ: ở tuổi 30, hệ thống hỏi *"Bạn muốn làm Color Fixer, Đại ca Ngón Tay hay Sa ngã thành Distortion?"*). Thiết kế này biến thế giới thành một hộp cát vô thưởng vô phạt (sandbox) và triệt tiêu hoàn toàn cảm giác bất lực, ngột ngạt và sự khắc nghiệt của thế giới Project Moon.

Trong **The City Chronicles**, hệ thống loại bỏ hoàn toàn các menu mời sẵn. Trò chơi vận hành dựa trên **nguyên lý nhân quả tự nhiên (Emergent Causality)** thông qua mô hình toán học:

1. **Xích Markov Có Trọng Số Động (Dynamic Weighted Markov Chain):**  
   Xác suất xuất hiện của một sự kiện E tại một mốc thời gian t là một hàm đa biến phụ thuộc vào trạng thái tích lũy của nhân vật:
   
   **W(E | S_t) = W_base(E) × ∏ α_i(Stat_i) × ∏ β_j(Condition_j)**

   *Trong đó:*
   * **W_base(E):** Trọng số cơ sở của sự kiện trong hồ chứa (Fate Pool).
   * **α_i(Stat_i):** Hệ số khuếch đại từ các chỉ số sinh tồn (HP, SP, Ahn, Heat...).
   * **β_j(Condition_j):** Hệ số kích hoạt từ các cờ trạng thái (vết sẹo, tiền sử nợ nần, phe phái thù địch).

2. **Tính Không Thể Đảo Ngược & Chi Phí Cơ Hội (Contractual Irreversibility):**  
   Mọi lựa chọn không phải là bấm nút xem kịch bản, mà là **ký kết một khế ước đánh đổi tài nguyên**:
   * Tiêu tốn tiền bạc (Ahn) ➔ Giảm khả năng thanh toán bảo trì cơ thể cuối năm.
   * Chấp nhận bạo lực ➔ Gia tăng điểm truy nã (Heat) và tích lũy chấn thương vĩnh viễn (Scars).
   * Thất bại trong một bài kiểm tra không dẫn đến màn hình "Thử Lại" (Reload) mà mở ra một nhánh sinh tồn suy thoái mới (mang tật nguyền, bị trục xuất làm Outcast, hoặc trở thành con nợ bị truy nã).

---

### 1.2. Bốn Trụ Cột Cơ Chế: "Hard but Fair" (Nghiệt Ngã Nhưng Minh Bạch)

Hệ thống gameplay được hợp nhất từ 4 trường phái thiết kế kinh điển:

1. **Darkest Dungeon (Hệ Thống Hao Mòn Tài Nguyên & Sẹo Tích Lũy - Attrition Dynamics):**  
   Nhân vật không phải là những siêu anh hùng hồi máu sau mỗi trận đấu. Mọi tổn thương thể xác nghiêm trọng đều để lại các vết sẹo (`Scars`). Khi bước qua tuổi 38, các vết sẹo cũ (≥ 3 sẹo) và chi giả cơ khí ở nhân vật tự do (chưa có chỗ đứng tổ chức) sẽ chuyển hóa thành chi phí bảo dưỡng thuốc giảm đau (1 Ahn/năm). Hệ thống không trừ máu (0 HP) khi thiếu tiền nhằm tránh triệt tiêu nhân vật một cách bất công khi game vốn đã có sẵn hệ thống lão hóa tự nhiên và hao mòn theo nghề nghiệp.
2. **Disco Elysium (Kiểm Tra Kỹ Năng Động & Giọng Nói Nội Tâm - Dual-Voice Skill Checks):**  
   Các quyết định then chốt sử dụng thuật toán kiểm tra xác suất minh bạch. Tiếng thì thầm của Carmen hay trực giác mách bảo không xuất hiện theo kịch bản cố định mà trỗi dậy từ sự sụp đổ thần kinh dưới ngưỡng an toàn.
3. **Sunless Skies & Roadwarden (Kinh Tế Học Thiếu Hụt & Sự Bất Khả Tri):**  
   Cơn đói Ahn, chi phí sinh hoạt của Nest, thuế thời gian T Corp và nguy cơ táng mạng trong Đêm Backstreets (3:13 AM - 4:34 AM) đòi hỏi người chơi phải tối ưu hóa dòng tiền từng mùa.
4. **Franz Kafka (Tính Tất Định Quan Liêu - Bureaucratic Determinism):**  
   Sự lạnh lùng vô cảm của bộ máy Hana Association và The Head. Quy tắc thăng hạng, trát phạt vi phạm điều cấm (Taboo) và phán quyết của đao phủ The Claw được thi hành chuẩn xác như một cỗ máy đồng hồ.

---

## 2. SƠ ĐỒ VÒNG ĐỜI & MA TRẬN TIẾN TRÌNH (LIFECYCLE ARCHITECTURE)

### 2.1. Sơ Đồ Mũi Tên Dạng Khối (Lifecycle Progression Flow)

```
[KHỞI SINH VÔ DANH: TUỔI 0]
  │ (Phân bổ chỉ số cơ bản ngẫu nhiên theo Quận: Backstreets, Nest, hoặc Outskirts)
  ▼
[GIAI ĐOẠN 1: THỜI NIÊN THIẾU (TUỔI 0 - 17)]
  │ ──► Học nghề xưởng, làm thêm kiếm Ahn, sinh tồn qua Giờ Quét Dọn (3:13 AM)
  │ ──► Tích lũy điểm quan hệ (Network) và định hình thiên hướng nhân cách
  ▼
[GIAI ĐOẠN 2: BƯỚC NGOẶT SỰ NGHIỆP (TUỔI 18 - 20)]
  │ (Không chọn sẵn: Bắt buộc phải vượt qua khảo sát hoặc nghi thức nhập môn đẫm máu)
  │
  ├──► [1. TUYẾN FIXER (HANA ASSOCIATION)]:
  │      [Hạng 9 ➔ 6: Tân Binh] ──► [Hạng 5: Mở Văn Phòng Riêng] ──► [Hạng 1] ──► [COLOR FIXER]
  │
  ├──► [2. TUYẾN NĂM NGÓN TAY (THE FIVE FINGERS)]:
  │      [Nghi Thức Nhập Môn] ──► [Thumb / Index / Middle / Ring / Pinky] ──► [Capo / Proxy / Maestro]
  │
  ├──► [3. TUYẾN SYNDICATE ĐỘC LẬP]:
  │      [Chiếm Địa Bàn] ──► [Thu Phí Bảo Kê] ──► [Đối Đầu Đột Kích] ──► [Bá Chủ Ngầm]
  │
  ├──► [4. TUYẾN CÁNH TẬP ĐOÀN (THE WINGS)]:
  │      [Nhân Viên Thử Việc] ──► [Chạy Chỉ Tiêu KPI] ──► [Trưởng Phòng] ──► [Giám Đốc Chi Nhánh]
  │
  └──► [5. TUYẾN THỢ XƯỞNG (WORKSHOPS), ĐÃ KHÉP LẠI, KHÔNG CÒN LÀ NGHỀ CHỌN ĐƯỢC]:
         [Học Việc Cơ Khí] ──► [Chế Tác Chi Giả & Nano] ──► [Bậc Thầy Xưởng Vũ Khí]

                │ (Khi gặp bi kịch / SP ≤ 25 / Scars ≥ 3 ➔ Carmen Whisper kích hoạt)
                ▼
[GIAI ĐOẠN 3: NGƯỠNG BIẾN ĐỔI SIÊU NHIÊN]
  │
  ├──► ĐẦU HÀNG NỖI ĐAU ──────► [BIẾN DỊ SA NGÃ (DISTORTION)]
  │                              (Mất tư cách con người, mở khóa bộ kỹ năng quái thú)
  │
  └──► KIÊN ĐỊNH BẢN NGÃ ─────► [THỨC TỈNH VŨ KHÍ E.G.O]
                                 (Khai hoa giáp trụ linh hồn, E.G.O Leap thăng 2 bậc Fixer)

                │ (Tuổi già 70-80+ hoặc tử nạn trên chiến trường)
                ▼
[GIAI ĐOẠN 4: CÁI CHẾT & HỆ THỐNG DI SẢN (BLOODLINE)]
  │
  └──► Tổng kết Biên Niên Sử (Chronicle) và chuyển giao gia tài cho:
         [Con Ruột]  HOẶC  [Đệ Tử Chân Truyền]  HOẶC  [Kẻ Nhặt Tàn Dư Backstreets]
```

---

### 2.2. Ví Dụ Mô Phỏng Cụ Thể Về Gameplay (Gameplay Case Study)

> **Hồ sơ nhân vật:** *Kaelen*, 39 tuổi, xuất thân Backstreets Quận 20 (Quận của T Corp).  
> *Hiện trạng:* Fixer Hạng 5, thành lập văn phòng Fixer 2 nhân sự.  
> *Chỉ số hiện tại:* HP 48/100, SP 22/100, Ahn: 4, Scars: 3 vết sẹo nặng (gồm 1 chi giả cánh tay trái cấp thấp), Heat: 35.  
>
> **Diễn biến vòng lặp năm:**
> 1. **Mùa Xuân (Lập Kế Hoạch Năm):** Hệ thống thông báo Kaelen phải nộp 2 Ahn thuế thời gian T Corp và 2 Ahn phí thuê mặt bằng văn phòng. Tổng chi phí cố định: 4 Ahn. Số dư giảm về 0 Ahn.
> 2. **Mùa Hè (Ma Sát Sinh Học & Cơ Chế Giảm Thiểu Tác Động):** Kaelen 39 tuổi, có 3 sẹo và chi giả. Nếu Kaelen là Fixer tự do chưa có chỗ đứng, hàm `midlifeMaintenanceLoss` đòi hỏi **1 Ahn phí bảo dưỡng thuốc giảm đau** (đã hạ từ 2 Ahn xuống 1 Ahn). Tuy nhiên, vì Kaelen đã là **Fixer Hạng 5 có văn phòng riêng (đạt chuẩn `hasEstablishedStanding`)**, tổ chức của anh đã đài thọ hoàn toàn chi phí y tế cơ bản (Chi phí = 0 Ahn)!
>    * *Trường hợp đối chứng nếu là Fixer tự do thiếu tiền (0 Ahn):* Hệ thống **tuyệt đối KHÔNG trừ máu (0 HP loss)** nhằm bảo toàn sinh mạng cho nhân vật, tránh trùng lặp bất công với cơ chế lão hóa tự nhiên (`agingLoss`) và hao mòn công việc (`jobWear`). Nhân vật chỉ chịu `-1 SP` áp lực tinh thần nhẹ và nhận cờ `PainSuppressantDeficit` (khớp kim loại rít nhẹ, giảm 15% phản xạ cho đến khi kiếm đủ tiền mua thuốc).
> 3. **Mùa Thu (Biến Cố Bất Ngờ & Carmen Whisper):** Với SP tụt xuống 21 (≤ 25) và Scars = 3 ($≥ 3$), trọng số xuất hiện của sự kiện *Tiếng Thì Thầm Của Carmen* tăng vọt gấp 3.5 lần. Sự kiện `carmen_whisper_crossroad` lập tức kích hoạt:
>    * *Phương án 1 (Đầu hàng nỗi đau):* Buông xuôi ý chí ➔ Biến dị thành thực thể Distortion mang tên *"Thợ Rèn Tro Tàn"*, văn phòng bị niêm phong, trò chơi chuyển sang nhánh quái dị.
>    * *Phương án 2 (Kháng cự kiên định):* Vượt qua bài kiểm tra Red Check:
>      $$Tỷ lệ thành công = 30\% (Base) + 21\% (SP hiện tại) - 15\% (Thiếu thuốc) = 36\%$$
>    * Kaelen tung xúc xắc đạt 31 (Thành công!) ➔ Kaelen bẻ gãy cánh tay giả rỉ sét, ý chí sắt đá khai hoa thành **E.G.O Awakened**: Vũ khí *"Lưỡi Dao Ký Ức"*, hồi phục tức thì 50 SP, nhận miễn nhiễm hoảng loạn vĩnh viễn!

---

## 3. HỆ THỐNG 7 CHỈ SỐ SINH TỒN & GIẢI THUẬT KIỂM TRA (DISCO SKILL ENGINE)

### 3.1. Bảng 7 Chỉ Số Sinh Tồn Cốt Lõi

| Chỉ Số | Thang Điểm | Ý Nghĩa Trong Gameplay | Hậu Quả Khi Cạn Kiệt / Quá Giới Hạn |
| :--- | :--- | :--- | :--- |
| **Health (HP)** | 0 – 100 | Sinh lực thể xác, độ bền cơ bắp và mạch máu. | ≤ 0: Nhân vật tử nạn vật lý (Kích hoạt hệ thống thừa kế Di sản). |
| **Sanity (SP)** | 0 – 100 | Độ ổn định thần kinh và rào chắn tâm lý. | ≤ 25: Nguy cơ nghe Carmen thì thầm. ≤ 0: Hoảng loạn hoặc Distort. |
| **Ahn** | Giá trị thực | Tiền tệ kim loại lưu thông chính thức của The City. | = 0: Không thể trả phí bảo dưỡng. Âm tiền: Xiết nợ, bán nội tạng. |
| **Heat** | 0 – 100 | Mức độ bị cảnh sát quận / Syndicate truy nã. | ≥ 60: Tăng gấp 3 lần tỷ lệ phục kích. ≥ 90: Đại đội Capo săn lùng. |
| **Network** | 0 – 100 | Mạng lưới quan hệ ngầm, nguồn tin tình báo. | ≤ 15: Bị cô lập thông tin, không thể mua đồ xưởng giảm giá. |
| **Reputation** | 0 – 100 | Uy danh nghề nghiệp và mức độ tín nhiệm xã hội. | Điều kiện tiên quyết để mở kỳ thi sát hạch Hana và hợp đồng Wing. |
| **Resonance** | 0 – 100 | Tần số cộng hưởng với Ánh Sáng / Dị thể / Singularity. | Tăng sức mạnh vũ khí E.G.O và tỷ lệ kháng cự biến dị tâm lý. |

---

### 3.2. Cơ Chế Tử Vong Vật Lý Khi Máu Về 0 & 3 Ngoại Lệ Cứu Mạng (Fatal Health Depletion & Death Saves)

Trong cấu trúc lõi của simulator, sinh mạng nhân vật được giám sát chặt chẽ thông qua thuộc tính thể xác `char.stats.health`. Khác với các cơ chế suy thoái tinh thần (SP rơi về 0 chỉ dẫn tới hoảng loạn hoặc biến dị Distortion), **khi Máu chạm ngưỡng ≤ 0, cái chết thể xác là tất yếu**, trừ khi thỏa mãn một trong ba ngoại lệ khẩn cấp được mã hóa nghiêm ngặt:

#### 1. Quy Trình Tử Nạn Chuẩn (Standard Mortality Lifecycle):
* **Ngắt Lập Kế Hoạch Năm:** Khi bất kỳ sự kiện chiến đấu, tai nạn lao động hoặc biến cố nào trừ máu khiến `health <= 0`, cờ sinh tồn lập tức chuyển trạng thái `char.alive = false` và `stats.health = 0`.
* **Khắc Ghi Nguyên Nhân Tử Vong (`causeOfDeath`):** Hệ thống ghi nhận chi tiết bối cảnh táng mạng (ví dụ: *"Bị Capo Ngón Cái xử bắn"*, *"Chết kiệt sức trong Đêm Backstreets"*, *"Tử nạn trước đòn càn quét của The Claw"*).
* **Kết Xuất Biên Niên Sử (Chronicle Generation):** Vòng đời lập tức đóng lại. Toàn bộ hành trình, danh hiệu, chiến công, số nợ chưa trả và ân oán được lưu vào Đại Sách Biên Niên Sử.
* **Chuyển Giao Trực Tiếp Sang Hệ Thống Di Sản (Legacy Bloodline):** Màn hình Game Over không bao giờ đưa người chơi về menu chính một cách vô nghĩa, mà mở ra bảng chọn Hậu Duệ Kế Thừa (Con ruột, Đệ tử, hoặc Kẻ nhặt tàn dư) để tiếp tục kiếp sống tiếp theo.

#### 2. Ba Cơ Chế Cứu Mạng Ngoại Lệ Duy Nhất (The Three Canonical Death Saves):
Trò chơi tích hợp 3 "Lưới an toàn sinh mệnh" xếp theo thứ tự ưu tiên kích hoạt tự động:

1. **Ampoule Tái Sinh K Corp (`tryItemAutoRevive` trong `careerPipeline.js`):**
   * *Điều kiện:* Nhân vật đang sở hữu vật phẩm công nghệ sinh học cao cấp của K Corp (`k_corp_ampoule`).
   * *Cơ chế:* Đòn đánh chí mạng vừa giáng xuống làm HP ≤ 0 sẽ kích hoạt phản xạ nano khẩn cấp, tiêu hao đúng 1 ống Ampoule.
   * *Hiệu quả:* Hồi sinh tức thì với **50% Max HP**, ghi lại nhật ký sống sót thần kỳ.
   * *Hạn chế:* Giới hạn tối đa **1 lần mỗi năm** nhằm ngăn ngừa lạm dụng bất tử.
2. **Hi Sinh Chí Mạng Của Bạn Đồng Hành (Companion Supreme Sacrifice trong `gameEngine.js`):**
   * *Điều kiện kích hoạt:* Không có Ampoule cứu sinh, và trong mạng lưới quan hệ (`relationships`) có một đồng minh hiện diện với chỉ số gắn kết đạt ngưỡng sinh tử:
     - Bạn đời (`spouse`) hoặc Cộng sự chiến đấu (`partner`): Điểm gắn kết **Bond ≥ 90**.
     - Bạn thân (`friend`) hoặc Sư phụ (`mentor`): Điểm gắn kết **Bond ≥ 95**.
   * *Hành vi:* Người đồng hành lao mình che chắn trọn vẹn phát đạn hoặc nhát chém kết liễu, hi sinh mạng sống của chính họ (`companion.alive = false`).
   * *Hiệu quả:* Giữ lại cho nhân vật đúng **1 HP** sống sót trên vũng máu.
   * *Hệ quả tâm lý:* Nhân vật chịu cú sốc tinh thần cực độ (`-30 SP`), nhận một vết sẹo tâm hồn vĩnh viễn và mối thù khắc cốt ghi tâm trong Biên Niên Sử.
3. **Lá Chắn Sinh Mệnh Hầm Ngục & Tàu WARP (`dungeonEngine.js`):**
   * *Điều kiện:* Đang thám hiểm Hầm ngục L Corp hoặc di chuyển trên các khoang tàu đặc biệt có trang bị thiết bị cứu hộ Singularity.
   * *Cơ chế:* Cổ vật Singularity hấp thụ hoàn toàn sát thương vượt ngưỡng, cưỡng chế đẩy nhân vật thoát khỏi buồng tử chiến về lối vào an toàn với **1 HP**, chấp nhận đánh rơi một phần chiến lợi phẩm phế liệu đã thu thập.

---

### 3.3. Giải Thuật Kiểm Tra Kỹ Năng Động (The Disco Check Formula)

Mọi biến cố sinh tử trong game đều được giải quyết thông qua công thức xác suất chuẩn hóa:

**Tỷ Lệ Thành Công (%) = Clamp(BaseRate + (W₁ × Chỉ Số Chính) + (W₂ × Chỉ Số Phụ) + ∑ Modifiers - Độ Khó DC,  5%,  95%)**

*Trong đó:*
* **Clamp(x, 5%, 95%):** Luôn duy trì tối thiểu 5% cơ hội thành công thần kỳ và 5% rủi ro thất bại thảm khốc (không có gì tuyệt đối tại The City).
* **Độ Khó DC (Difficulty Class):** Độ khó của thử thách từ 10 đến 90.
* **∑ Modifiers:** Tổng điểm cộng/trừ từ trang bị xưởng, đồng minh, vết thương và môi trường.

#### Phân Biệt White Checks vs Red Checks:
1. **White Checks (Kiểm Tra Trắng — Cho Phép Thử Lại):**  
   Cho phép nhân vật rút lui khi chưa đủ tự tin. Nếu thất bại, bài kiểm tra tạm thời bị khóa cho đến khi người chơi nâng cấp chỉ số hoặc trang bị thêm đồ xưởng mới.
2. **Red Checks (Kiểm Tra Đỏ — Khế Ước Không Thể Vãn Hồi):**  
   Chỉ xuất hiện trong các thời khắc sinh tử: đối đầu Capo, né đòn phán quyết của The Claw, quyết định trước Carmen.  
   **Chỉ được thực hiện duy nhất 1 lần.** Kết quả được khắc thẳng vào Biên Niên Sử. Thất bại mang lại vết sẹo vĩnh viễn, tàn tật thể xác, mất người thân hoặc mất mạng.

---

### 3.4. Ví Dụ Cụ Thể Về Phép Tính Xác Suất Trong Game

> **Tình huống:** Đàm phán sinh tử với Capo của Ngón Cái (*The Thumb Capo*) để chuộc lại một thuộc hạ bị bắt vì phạm lỗi xưng hô.  
> *Loại kiểm tra:* **Red Check (Khế ước đỏ)**.  
> *Độ khó (DC):* 70.  
> *Chỉ số của nhân vật:* Reputation = 60 ($W_1 = 0.5$), Sanity = 40 ($W_2 = 0.25$), BaseRate = 20%.  
>
> *Bảng tổng hợp Modifiers:*
> * `[+15% Đã từng giúp chi nhánh Ngón Cái thu hồi nợ]` (Network bonus)
> * `[+10% Đang mang theo một bao đạn khắc ấn Ngón Cái làm quà]` (Item bonus)
> * `[-20% Danh tiếng cá nhân thấp hơn Capo]` (Rank penalty)
> * `[-15% Đang bị đau nhức vì thiếu thuốc bảo dưỡng]` (Pain penalty)
>
> **Tính toán:**
> **P = 20% + (0.5 × 60) + (0.25 × 40) + (15% + 10% - 20% - 15%) - 70 = 20 + 30 + 10 - 10 - 70 = -20% ➔ Clamp = 5%**  
> Người chơi chỉ có đúng 5% sống sót nếu đàm phán trực diện! Hệ thống hiển thị rõ nhãn cảnh báo đỏ nguy kịch trên nút lựa chọn, buộc người chơi phải cân nhắc phương án trả Ahn tiền chuộc hoặc tổ chức cướp ngục.

---

## 4. PHÂN TÍCH CHUYÊN SÂU 5 NHÁNH NGHỀ NGHIỆP CỐT LÕI (CAREER TREES)

### 4.1. Tuyến Fixer & Hiệp Hội Hana (The Fixer Bureaucracy)

#### Hệ Thống Cổng Thăng Hạng (Rank Gating Dynamics):
Để được thăng cấp, nhân vật phải hoàn thành đủ 3 điều kiện cứng trước khi Hana Association cấp phép thi sát hạch cuối năm:

| Cấp Bậc Fixer | Yêu Cầu Chỉ Số Tối Thiểu | Điểm Merit Tích Lũy | Đặc Quyền Mở Khóa Trong Gameplay |
| :--- | :--- | :--- | :--- |
| **Grade 9 (Tân Binh)** | HP $≥ 30$, SP $≥ 30$ | 0 Merit | Nhận hợp đồng dọn rác Backstreets, bắt chuột cống. |
| **Grade 8 ➔ 6** | HP $≥ 50$, SP $≥ 45$ | 150 – 400 Merit | Nhận hợp đồng hộ tống, dẹp loạn băng đảng nhỏ. |
| **Grade 5 (Cột Mốc)** | HP $≥ 65$, SP ≥ 60, Ahn $≥ 50$ | 600 Merit | **Được phép thành lập Văn Phòng Riêng (Fixer Office)**. |
| **Grade 4 ➔ 2** | HP $≥ 80$, SP $≥ 75$, Rep $≥ 70$ | 1,000 – 2,500 Merit | Nhận tài trợ từ các Hiệp hội chuyên môn (Zwei, Shi, Liu...). |
| **Grade 1 (Đỉnh Cao)** | HP $≥ 95$, SP ≥ 90, Rep ≥ 90 | 5,000 Merit | Tiếp nhận hợp đồng cấp Star of the City. |
| **Color Fixer** | Vượt qua 3 kỳ thi đặc biệt của Hana | 10,000+ Merit | Nhận danh hiệu sắc màu độc bản, vũ khí cấp thần thoại. |

* **Quy Tắc Chống Nhảy Cấp (Anti-Grade Skipping):** Engine kiểm định nghiêm ngặt (`CHECK 3: Fixer Grade Skipping Violations = 0 errors`). Fixer bắt buộc phải đi tuần tự từng bậc. Ngoại lệ duy nhất: Khi thức tỉnh E.G.O hoàn chỉnh, nhân vật được phép thi vượt 2 cấp (*E.G.O Leap*).
* **Cơ Chế Quản Lý Văn Phòng (Hạng 5 Trở Lên):**
  * *Chi phí mặt bằng:* 10 Ahn/năm. Nếu không trả được ➔ Bị niêm phong văn phòng, giáng xuống Hạng 6.
  * *Tuyển dụng Fixer cấp dưới:* Tuyển tối đa 4 nhân sự. Thuộc hạ có thể cử đi làm nhiệm vụ phụ kiếm Ahn, nhưng nếu thuộc hạ tử trận, chủ văn phòng bị trừ Reputation.

---

### 4.2. Tuyến Năm Ngón Tay (The Five Fingers)

```
[THẾ GIỚI NGẦM BACKSTREETS]
  │
  ├──► 1. NGÓN CÁI (THE THUMB)
  │      • Cơ chế: Quản lý đạn dược (Ammo) & Kiểm tra tôn ti (Etiquette Checks).
  │      • Rủi ro: Trượt kiểm tra = Capo chặt ngón tay hoặc xử bắn.
  │
  ├──► 2. NGÓN TRỎ (THE INDEX)
  │      • Cơ chế: Động cơ Khế Ước Ngẫu Nhiên (Stochastic Prescript Engine).
  │      • Quy tắc: Tuân lệnh = Thăng cấp Proxy; Bất tuân = Index Hunter truy sát.
  │
  ├──► 3. NGÓN GIỮA (THE MIDDLE)
  │      • Cơ chế: Sổ Thù Hận (Vengeance Ledger) khắc trên da.
  │      • Quy tắc: Tiêu diệt kẻ thù = Thưởng lớn SP/Ahn; Bỏ qua = Bị trục xuất.
  │
  ├──► 4. NGÓN NHẪN (THE RING)
  │      • Cơ chế: Chấm điểm thẩm mỹ tàn sát (Aesthetic Scoring).
  │      • Thăng tiến: Sinh viên (Student) ➔ Giảng viên (Docent) ➔ Bậc thầy (Maestro).
  │
  └──► 5. NGÓN ÚT (THE PINKY)
         • Cơ chế: Quản lý mạng lưới giao kèo ngầm, chợ đen và buôn bán tin tức.
```

* **Ví dụ cơ chế Ngón Cái:** Trong một trận đánh, mỗi phát súng tiêu tốn 1 viên đạn đặc chế (giá 3 Ahn/viên). Nếu hết đạn giữa trận, nhân vật bị phạt `-30% Combat Power`. Khi báo cáo chiến công với Capo, nếu chọn lời thoại thiếu kính ngữ ("Tôi đã xử lý xong"), hệ thống kích hoạt ngay một Red Check Tôn ti với DC 75. Nếu trượt, Capo rút gươm phạt chặt 1 ngón tay (`-15 Max HP`, giảm vĩnh viễn 10% tốc độ hành động).
* **Ví dụ cơ chế Ngón Trỏ:** Đầu mùa đông, nhân vật nhận một mảnh Khế Ước từ Messenger: *"Hãy nhặt 3 vỏ đạn rỉ sét tại District 8 và trao cho người phụ nữ mù đầu tiên bạn gặp trước lúc nửa đêm"*. Nếu làm theo: Nhận ngay 300 Merit nội bộ và được cấp một thanh kiếm dệt chỉ bạc. Nếu vứt bỏ khế ước: Nhận cờ `PrescriptDefier`, ngay mùa sau sẽ bị 2 sát thủ Index Proxy phục kích với DC phòng thủ lên đến 85.

---

### 4.3. Tuyến Cánh Tập Đoàn (The Wings)

* **Cơ Chế Đấu Đá Công Sở & Chỉ Tiêu KPI:**  
  Mỗi năm nhân vật phải đạt tối thiểu 80% chỉ tiêu KPI (nghiên cứu vũ khí, trích xuất mẫu vật hoặc thanh trừng nội bộ). Nếu không đạt, nhân vật bị đưa vào danh sách "vật tư tiêu hao" cho các thí nghiệm Singularity.
* **Đặc Quyền Công Nghệ Singularity:**
  * *T Corp (Quận 20):* Sử dụng công nghệ thời gian. Cho phép dùng Ahn mua thêm 1 lượt hành động trong năm hoặc trốn thuế thời gian.
  * *K Corp (Quận 11):* Sử dụng Ampoule Nước Mắt Phục Hồi. Cho phép hồi sinh tức thì 50 HP khi trúng đòn chí mạng (giới hạn 1 lần/năm).
  * *W Corp (Quận 23):* Thu dọn tàn tích WARP Train. Rủi ro mất 50 SP mỗi chuyến tàu do chứng kiến cảnh tượng kinh hoàng giữa các chiều không gian.

---

## 5. MÔ HÌNH KINH TẾ HỌC AHN & MA SÁT SINH HỌC TRUNG NIÊN

### 5.1. Dòng Tiền Hàng Năm & Vòng Xoáy Nợ Nần (The Debt Spiral)

**Số Dư Cuối Năm = Ahn Hiện Tại + Thu Nhập Hợp Đồng - Thuế Thời Gian - Phí Mặt Bằng - Bảo Trì Sinh Học**

* **Cơ Chế Vay Nặng Lãi (Loan Sharks):**
  * Lãi suất: 20% / mùa (80% / năm).
  * Quá hạn 2 năm: Băng đòi nợ đến đập phá văn phòng (`-30 SP`, `-20 Rep`).
  * Quá hạn 3 năm: Sự kiện cưỡng chế phẫu thuật thu hoạch nội tạng (`Organ Harvesting Event`). Nhân vật bị mổ cướp 1 quả thận hoặc mắt (`-20 Max HP`, nhận sẹo vĩnh viễn).

---

### 5.2. Ma Sát Sinh Học Tuổi Trung Niên & Nguyên Tắc Bảo Vệ Đa Tầng (Mid-Life Friction Formula)

Để tránh cạm bẫy **"Cộng dồn ma sát kép" (Double-Dipping Attrition)** khi trò chơi đã có sẵn 3 hệ thống lão hóa tự nhiên, cơ chế ma sát tuổi trung niên được tinh chỉnh cân bằng theo triết lý *"Hard but Fair"*:

* **Điều kiện kích hoạt:**
  **Kích Hoạt Phí Bảo Trì ⇔ Tuổi ∈ [38, 49] ∧ (Scars ≥ 3 ∨ Toàn Thân Cơ Khí Hóa = True) ∧ (hasEstablishedStanding = False)**
* **Miễn Trừ Tổ Chức (Institutional Standing Exemption):**
  Nhân vật có chỗ đứng vững chắc trong xã hội (**Fixer Hạng ≤ 5 có văn phòng riêng**, Nhân viên chính thức **The Wings**, hoặc **Capo/Đại ca Syndicate**) được tổ chức chi trả toàn bộ bảo hiểm y tế và bảo dưỡng ➔ **Chi phí bảo trì = 0 Ahn**.
* **Mức phí cơ bản (Cho Fixer tự do / kẻ lang thang):** Cố định **1 Ahn / năm** (đã giảm từ 2 Ahn xuống 1 Ahn).
* **Cơ Chế Xử Lý Thâm Hụt (Không Trừ Máu Thể Xác):**
  * Nếu Ahn < 1:
    **HP Loss = 0 (Bảo toàn thể xác),  SP Loss = 1 (Chỉ 1 lần duy nhất khi phát sinh nợ),  Gán Flag: PainSuppressantDeficit = True**
  * Khi mang cờ này, các bài kiểm tra phản xạ bị giảm 15% hiệu suất do khớp rít và đau nhức, nhưng **nhân vật không bao giờ bị chảy máu tử nạn ở tuổi 40 chỉ vì thiếu tiền**.
* **So Sánh Tương Quan Với 3 Hệ Thống Lão Hóa Sẵn Có Của Game:**
  1. **Lão Hóa Sinh Học Tự Nhiên (`agingLoss`):** Bắt đầu kích hoạt từ tuổi hiệu dụng 50, trừ máu tăng dần theo hàm mũ khi bước vào tuổi 60–80.
  2. **Hao Mòn Nghề Nghiệp (`jobWear`):** Tự động khấu trừ HP và SP hàng năm theo độ rủi ro của từng công việc (Fixer chiến đấu hao mòn cao hơn nhân viên giấy tờ Nest).
  3. **Suy Giảm Khả Năng Hồi Phục (`healAmount`):** Giảm dần lượng máu hồi phục tự nhiên hàng năm theo độ tuổi (người già trên 60 tuổi hồi phục kém hơn người trẻ tới 2 HP/năm).
* **Hạ Nhiệt Trọng Số Sự Kiện Tiêu Cực (Director Attrition Multiplier):**
  Trọng số các biến cố thoái hóa / hao mòn tuổi trung niên trong AI Director được giảm từ **2.2× xuống 1.15×**, dành không gian cho nhân vật phát triển đệ tử, bồi dưỡng quan hệ xã hội hoặc chuẩn bị cho kỳ sát hạch Hana cao cấp.

---

## 6. ĐỘNG LỰC HỌC SIÊU NHIÊN: DISTORTION VS THỨC TỈNH E.G.O

Cơ chế siêu nhiên trong The City Chronicles không phải là một nhánh nghề được chọn qua nút bấm. Đó là **trạng thái bộc phát tâm lý** khi con người bị đẩy vào ranh giới sinh tử:

**Xác Suất Carmen Xuất Hiện = BaseRate × 3.5  (Khi SP ≤ 25 ∧ Scars ≥ 3)**

### Ma Trận Nhị Phân Lựa Chọn (The Bifurcation Matrix):

```
                       [ĐIỂM GÃY TÂM LÝ: SP ≤ 25 & SCARS ≥ 3]
                                         │
                                         ▼
                        [TIẾNG THÌ THẦM CỦA CARMEN VANG LÊN]
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
       [ĐẦU HÀNG NỖI ĐAU: DISTORTION]              [GIỮ VỮNG BẢN NGÃ: E.G.O AWAKENING]
  • Cơ chế: Buông xuôi ý chí sinh tồn.         • Cơ chế: Vượt qua bài kiểm tra Red Check khó.
  • Hậu quả:                                    • Hệ quả:
    - Biến đổi thành thực thể Quái Thú.           - Biểu hiện Vũ Khí & Giáp Trụ Linh Hồn.
    - Mất vĩnh viễn quyền làm Fixer.              - Miễn nhiễm 100% hoảng loạn tâm lý cấp thấp.
    - Nhận bộ kỹ năng tàn phá diện rộng.          - Được quyền thăng vượt 2 cấp Fixer (E.G.O Leap).
    - Trở thành mục tiêu truy sát của The Head.   - Lưu danh vào Đại Sách Biên Niên Sử.
```

---

## 7. HẦM NGỤC KHẢO THÍ: DUNGEON GAUNTLET ENGINE

### 7.1. Cơ Chế Đặt Cược Cửa Ải (Dungeon Entry Wager)
Trước khi bước vào hầm ngục tàn tích L Corp hoặc Outskirts, người chơi lựa chọn mức rủi ro:

* **Mức Cược An Toàn (Safe Wager - 5 Ahn):** Độ khó quái vật thấp (Cấp Canard / Urban Myth). Tỷ lệ tử vong $< 5\%$. Phần thưởng: Phế liệu cơ bản và 10 Ahn.
* **Mức Cược Cân Bằng (Standard Wager - 20 Ahn):** Quái vật cấp Urban Plague / Urban Nightmare. Tỷ lệ tử vong ~25%. Phần thưởng: Lõi năng lượng, vũ khí xưởng cao cấp.
* **Mức Cược Sinh Tử (Life-Death Wager - Toàn Bộ Tài Sản):** Quái vật cấp Star of the City. Tỷ lệ tử vong $> 60\%$. Phần thưởng: Cổ vật Singularity hoặc E.G.O Weapon huyền thoại.

### 7.2. Cấu Trúc Đồ Thị Phòng Ải (Node-based Room Graph)

```
[CỬA VÀO HẦM NGỤC] ──► [PHÒNG 1: QUÁI VẬT TÀN DƯ] ──► [PHÒNG 2: BẪY NANO TỰ ĐỘNG]
                              │                                     │
                              ▼                                     ▼
                     [PHÒNG 3: TRẠM NGHỈ CHÂN] ──────────► [PHÒNG 4: DỊ THỂ (ABNORMALITY)]
                              │                                     │
                              ▼                                     ▼
                     [QUYẾT ĐỊNH RÚT LUI?] ──────────────► [PHÒNG 5: TRÙM CUỐI (BOSS ROOM)]
                      • Rút lui = Mang 100% đồ về.          • Thắng = Nhận Cổ Vật Thần Thoại.
                      • Đi tiếp = Chấp nhận tử chiến.       • Thua = Tử trận, mất sạch toàn bộ.
```

---

## 8. ĐIỀU CẤM KỴ (TABOO) & PHÁN QUYẾT CỦA THE CLAW

* **3 Mức Độ Mắt Cấm (Taboo Eyes Accumulation):**
  1. *1 Mắt Mở:* Nghiên cứu súng tăng áp vượt tầm bắn cho phép hoặc buôn bán mô sinh học trái phép.
  2. *2 Mắt Mở:* Tàng trữ trí tuệ nhân tạo có cảm xúc con người, làm giả dấu niêm phong của The Head.
  3. *3 Mắt Mở (Báo Động Cực Điểm):* **Kích hoạt Phán Quyết Của The Claw**.
* **Cơ Chế Chiến Đấu Với The Claw:**
  * The Claw sở hữu bộ kỹ năng kết hợp từ 3 Singularity:
    * *Huyết thanh K Corp:* Tự động hồi phục 30% HP khi máu tụt xuống mức nguy kịch.
    * *Dịch chuyển W Corp:* Né tránh 100% các đòn tấn công tầm xa.
    * *Bẻ khóa F Corp:* Xuyên thủng mọi lớp giáp cơ khí và khiên năng lượng.
  * Tỷ lệ sống sót của người chơi $< 5\%$ nếu không sở hữu vũ khí E.G.O hoàn chỉnh hoặc đồng minh cấp Color Fixer hỗ trợ.

---

## 9. HỆ THỐNG ĐỒNG HÀNH NPC, GẮN KẾT SINH TỬ & DI SẢN THỪA KẾ (NPC AGENCY, BONDS & LEGACY)

### 9.1. Động Lực Học Mạng Lưới Quan Hệ NPC & Khơi Thông Ngưỡng Gắn Kết Bond ≥ 90

Mạng lưới đồng hành trong The City Chronicles không phải là danh sách bạn bè trang trí tĩnh, mà là một hệ thống xã hội vận động độc lập với tính toán lợi ích và tình cảm sâu sắc:

#### 1. Thang Bậc Quan Hệ & Nút Thắt Giới Hạn Cũ (The Bond Ceiling Bottleneck):
* **Hệ thống phân tầng gắn kết:**
  - `Bond < 30`: Người quen xã giao / Đồng nghiệp hờ.
  - `Bond 30 – 69`: Thân thiết / Đồng đội tin cậy.
  - `Bond 70 – 79`: Bậc Tin Cậy (**Trusted Tier** - Bắt đầu hỗ trợ chiến đấu).
  - `Bond 80 – 89`: Bậc Sinh Tử (**Sworn Tier** - Sẵn sàng chia sẻ tài sản, bảo lãnh nợ).
  - `Bond 90 – 100`: Bậc Tuyệt Đối (**Soulbound / Supreme Sacrifice Tier** - Ngưỡng kích hoạt cứu mạng khi HP về 0).
* **Nút thắt phát hiện qua kiểm thử:** Trước đây, hàm `bondCapFor(npc)` khóa cứng trần gắn kết ở mức 40 điểm (55 cho gia đình), và yêu cầu hoàn thành nhiệm vụ cá nhân (`questsDone`) để tăng trần (+20/quest). Tuy nhiên chuỗi sự kiện quest trong `eventsCompanionQuests.js` bị khống chế ở mức `max: 1`. Hệ quả là Bạn đời chỉ chạm trần 75, Cộng sự chạm trần 60, khiến cơ chế **Bạn Đồng Hành Hi Sinh (Bond ≥ 90)** hoàn toàn bất khả thi về mặt toán học (0% kích hoạt).

#### 2. Kiến Trúc Cải Tiến Nới Rộng Trần Quan Hệ Tự Nhiên:
1. **Nâng trần cơ sở theo bản chất vai trò (`src/data/npcPersonality.js`):**
   - Bạn đời (`spouse`): Nâng trần khởi điểm lên **75**.
   - Cộng sự chiến đấu (`partner`): Nâng trần lên **65**.
   - Sư phụ (`mentor`): Nâng trần lên **60**.
   - Bạn bè (`friend`): Nâng trần lên **50**.
2. **Nới rộng trần động qua thâm niên và sinh tử chung:**
   - **Thâm niên đồng hành (`yearsTogether`):** Mỗi năm cùng nhau sinh tồn sau tuổi trưởng thành tự nhiên nới rộng trần thêm +1 điểm (tối đa **+20 điểm**).
   - **Vượt Hầm ngục (`dungeonsCleared`):** Cùng nhau sống sót qua các phòng ải L Corp tăng thêm trần tới **+20 điểm**.
   - **Cứu nguy trong hoạn nạn (`crisesAided`):** Tương trợ nhau qua các biến cố tăng thêm tới **+15 điểm**.
   - *Hệ quả:* Những người bạn đời hoặc cộng sự gắn bó lâu năm có thể tự nhiên đạt trần tuyệt đối **100/100**.
3. **Bảo vệ tình bạn thiếu niên (`src/engine/director.js`):**
   - Bổ sung rào chắn tuổi tác trong thuật toán phai nhạt `driftBonds`: Trẻ em dưới 16 tuổi được miễn trừ luật phai nhạt im lặng, bảo toàn tình bạn tuổi thơ khi bước vào tuổi trưởng thành.
4. **Khơi thông nhiệm vụ đồng đội (`src/engine/gameEngine.js`):**
   - Bổ sung bộ xử lý `npcQuest` và `promote` trong `resolveEventChoice`, ghi nhận chính xác công trạng hoàn thành quest và tặng thưởng tức thì 14 điểm gắn kết.

#### 3. Báo Cáo Thực Nghiệm Qua 500 Vòng Đời Mô Phỏng Đầy Đủ:
Mô phỏng 500 sinh mệnh độc lập từ tuổi sơ sinh đến khi qua đời với thuật toán tương tác tự nhiên:
* **Tỷ lệ vòng đời chạm mốc Bond ≥ 90:** **4.0% (20 / 500 sinh mệnh)** (bứt phá hoàn toàn so với 0% trước đây).
* **Tỷ lệ đạt mốc Sworn (Bond ≥ 80):** **9.8% (49 / 500 sinh mệnh)**.
* **Tỷ lệ đạt mốc Trusted (Bond ≥ 70):** **25.8% (129 / 500 sinh mệnh)**.
* **Điểm gắn kết đỉnh cao từng vai trò:**
  - Bạn đời (`spouse`): **100 / 100** (Chạm đỉnh tuyệt đối).
  - Cộng sự chiến đấu (`partner`): **100 / 100**.
  - Sư phụ (`mentor`): **94 / 100**.
  - Con cái (`child`): **90 / 100**.
  - Bạn thân (`friend`): **65 / 100**.
* **Kích hoạt thành công 19 lượt Bạn Đồng Hành Hi Sinh Cứu Mạng (Death Saves):** 19 lần người bạn đời/cộng sự đã lấy thân mình đỡ đòn khi máu người chơi tụt về 0, chứng minh cơ chế cứu mạng đã hoạt động trơn tru trong thực chiến.

---

### 9.2. Ma Trận Chuyển Giao Di Sản Thừa Kế (Legacy Bloodline Architecture)

Khi một nhân vật qua đời (do tuổi già hoặc tử trận), toàn bộ cuộc đời được đúc kết thành **Hồ Sơ Di Sản**. Người chơi lựa chọn 1 trong 3 mẫu người kế thừa để tiếp tục chơi ở kiếp sau:

```
[CÁI CHẾT CỦA NHÂN VẬT TIỀN NHÂN]
       │
       ▼
[TỔNG KẾT BIÊN NIÊN SỬ (CHRONICLE SUMMARY)]
       │
       ▼
[CHỌN MẪU HẬU DUỆ KẾ THỪA]
       │
       ├──► 1. CON RUỘT (BIOLOGICAL CHILD):
       │      • Thừa kế tài sản: 80% Ahn và toàn bộ kho vũ khí Xưởng.
       │      • Gánh nặng: Kế thừa 100% nợ nần chưa trả và danh sách kẻ thù cũ.
       │
       ├──► 2. ĐỆ TỬ CHÂN TRUYỀN (CHOSEN APPRENTICE):
       │      • Thừa kế kỹ năng: 40% Ahn, giữ lại toàn bộ E.G.O Perks và võ thuật.
       │      • Khởi đầu đặc quyền: Bắt đầu sự nghiệp ngay tại Fixer Hạng 8.
       │
       └──► 3. KẺ NHẶT TÀN DƯ BACKSTREETS (SCAVENGER):
              • Bắt đầu lại từ đáy xã hội với 15% Ahn còn sót lại.
              • Đặc quyền sinh tồn: +20% kháng thương tật và dẻo dai thể lực.
```

---

## 10. TỐI ƯU CÔNG THÁI HỌC GIAO DIỆN XÚC GIÁC (TACTILE UI/UX CRAFTSMANSHIP)

1. **Phiếu Khế Ước Xúc Giác (.choice Button):**  
   Thiết kế giao diện như một tờ phiếu giao kèo văn phòng đóng dấu mực.  
   **Phản hồi lực cơ học:** Nâng nhẹ `1px` khi rê chuột (trên PC), lún nhẹ `1px` khi ấn thật (`:active`).  
   Phân tách truy vấn `@media (hover: hover)` giúp thiết bị di động **hoàn toàn không bị lỗi dính hover**.
2. **Con Dấu Số Niêm Phong (.choice-badge):**  
   Đánh số thứ tự bằng số bảng (`tabular-nums`), bao bọc trong viền tròn sáp vàng kim `--accent`.
3. **Cột Mốc Chữ Cái Đầu Dòng Cổ Điển (Drop Cap Milestone):**  
   Các bước ngoặt đời người (đậu sát hạch Hana, thức tỉnh E.G.O, thảm họa quận) được đóng khung viền trang trọng với chữ cái đầu dòng phóng to theo phông chữ có chân Literata.
4. **Nhịp Xung Báo Động Sinh Lực (Critical Vitals Pulse):**  
   Khi Máu (HP) hoặc Tinh Thần (SP) $< 25$, thanh thông số và nhãn chỉ số phát nhịp đập cảnh báo chậm đỏ rực (`criticalPulse`), đồng bộ nhịp điệu với tiếng tim đập dồn dập.
5. **Công Thái Học Cho Thiết Bị Di Động:**  
   Tích hợp `touch-action: manipulation;` loại bỏ triệt để độ trễ 300ms trên màn hình cảm ứng di động.  
   Thanh điều hướng đáy (Bottom Nav) có đèn LED ngọc bích phát quang báo tab đang kích hoạt.  
   Bảng hồ sơ nhân vật vuốt chạm dạng Bottom Sheet với thanh nắm xúc giác mượt mà.

---

## 11. BẢNG TỔNG HỢP THỐNG KÊ QUY MÔ HỆ THỐNG

| Hạng Mục Nội Dung | Số Lượng Thực Tế | Tiêu Chuẩn Kiểm Định Kỹ Thuật |
| :--- | :--- | :--- |
| **Sự Kiện Cốt Truyện Lớn (Major Narrative Events)** | **766** | Đã kiểm định không nhảy cấp, không xuất hiện Ghost NPC. |
| **Sự Kiện Nhánh Phụ (Minor Events)** | **866** | Đầy đủ kiểm tra chỉ số và phân bổ rủi ro. |
| **Dòng Nhật Ký Đời Thường (Daily Vignettes)** | **572** | Thể hiện chi tiết đời sống và sinh hoạt 4 mùa tại The City. |
| **Biến Cố Vĩ Mô Toàn Cầu (Macro Shocks)** | **44** | T Corp truy thu giờ, K Corp thu hồi thuốc, Sweeper... |
| **Hợp Đồng Cực Hiểm (Hazardous Contracts)** | **36** | Các cuộc săn Dị thể và thanh trừng băng đảng cấp cao. |
| **Chuỗi Kiểm Thử Văn Phong (Voice Lint)** | **32,717** | **0 lỗi** đại từ sai, 0 emoji bừa bãi, 0 vi phạm UNIVERSE canon. |
| **Bộ Kiểm Thử Tự Động (Test Suites)** | **57 / 57** | **100% Đạt** toàn bộ bài kiểm tra hồi quy logic và backend parity. |
| **Mô Phỏng Cuộc Đời (Million Audit Sim)** | **500 Cuộc Đời** | Kiểm định toàn vẹn không phát sinh bất kỳ lỗi logic nào. |
