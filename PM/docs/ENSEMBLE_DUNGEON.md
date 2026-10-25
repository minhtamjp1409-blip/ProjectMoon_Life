# Reverberation Ensemble

Triển khai ngày 25/10/2026. Chưa commit, push hoặc deploy.

## Lore và phần phóng tác

Argalia là người chỉ huy Ensemble. Cảnh đối thoại trong game đặt trọng tâm vào cách ông nhìn nỗi đau, những giới hạn con người và buổi diễn của mình; không đặt ra quy luật rằng mọi người nổi tiếng đều bị Ensemble săn. Tham khảo [lời thoại Roland và Argalia trong game, Tiphereth Database](https://tiphereth.zasz.su/episodes/7_4_11/) và [The Reverberation Ensemble Story](https://libraryofruina.wiki.gg/wiki/The_Reverberation_Ensemble_Story).

Nhà hát, lịch mời ba lần, nhân vật người chơi, kiểm định Hòa âm và bản tổng phổ là nội dung phóng tác cho game này. Chiến thắng là giành đường ra, không giết Argalia. Record và dấu sao kỷ niệm không phải phong cấp Star of the City của Hana.

Hồi hai theo nhánh: Color gặp Tanya, Finger gặp Pluto, Wing gặp Jae-heon, Workshop gặp Eileen. Không khẳng định Tanya từng là Color hoặc các thành viên này từng giữ chức vụ của người chơi. Hồi ba dùng một NPC còn hoạt động trong đời chơi; các bóng người là hình ảnh của nhà hát.

## Lời mời

- Từ 30 tuổi, giữ đỉnh nghề ít nhất hai năm. Theo dõi hai năm này kể cả khi chưa đủ 30 tuổi.
- Đỉnh: Color, Finger bậc 3, Hội đồng Wing bậc 3, Workshop bậc 3. E.G.O riêng lẻ không đủ điều kiện.
- Chưa Distorted, chưa hoàn thành Ensemble, không có dungeon đang chạy và Taboo dưới 3.
- Lời mời nằm trong kế hoạch năm. Hai lần đầu được từ chối; sau lần đầu chờ ít nhất ba năm. Sau lần thứ hai có một năm chuẩn bị, rồi lời mời cuối chỉ còn lựa chọn đi vào.
- Không gieo thêm manh mối Điều cấm vào năm có lời mời. Taboo đủ 3 vẫn ưu tiên phán quyết của The Head.
- Chỉ rời nhà hát trong hồi đầu, mất 8 Danh tiếng, tính một lần từ chối. Lần mời cuối không cho rời.
- Backend không được làm rơi lời mời khi gửi lại kế hoạch năm.

## Bốn hồi và kết cục

Đi một mình, một lượt tiếp tế, không mức cược và không trả Ahn/Công trạng thường.

Các lựa chọn hòa nhịp ở ba hồi đầu hồi SP và tích ít áp lực hơn lối giữ nhịp riêng, đổi lại thêm Hòa âm cả khi trượt. Vì vậy vẫn có lợi ích khi hai lựa chọn cùng chạm trần tỉ lệ. Đủ 3 dấu, SP chạm 0 hoặc áp lực đầy sẽ mở Coda. HP chạm 0 luôn chết trước khi được chọn Coda.

Ở Coda: nghe theo Carmen để thành Distortion và tiếp tục đời chơi, hoặc chống lại bằng kiểm định Nerve. Chống lại trượt sẽ chết; thành công tốn 8 HP, SP được đưa lên ít nhất 8 và áp lực giảm. Dò đường và E.G.O có tác dụng cho kiểm định này, rồi hết hiệu lực.

Ở hồi cuối: phá nhịp là kiểm định khó, trượt sẽ chết. Tỉ lệ trước khi chặn biên được nhân 0,36; mức tối thiểu riêng là 5%. Nerve, trang bị, thế đánh, áp lực, E.G.O và dò đường vẫn thay đổi tỉ lệ; kiểm định không còn dựa vào việc trừ 0,8 để chạm sàn 30% chung. Hòa nhịp để chạm cửa dễ hơn nhưng luôn cộng đủ 3 Hòa âm và buộc qua Coda. Người chơi cũng được chọn trở thành Distortion ngay.

Thoát nhà hát nhận Record, dấu sao cạnh tên, 6 Resonance và Bản tổng phổ viết dở. Nếu từng đạt 3 Hòa âm, E.G.O sau chiến thắng là Volatile (`IncompleteEGO`), thay thế E.G.O hoàn chỉnh nếu có. Di vật được lưu trong văn bia; người nối đời trực tiếp nhận nó và thêm 3 Resonance, không thừa kế dấu sao.

## Cân bằng và kiểm tra

`node tools/sim/ensemble_sim.mjs 400` dùng 400 seed mỗi nhánh, 95 HP, 90 SP, E.G.O, thế cân bằng, lựa chọn phá nhịp và giữ dò đường/E.G.O cho hồi cuối:

| Nhánh | Thoát | Tỉ lệ |
| --- | ---: | ---: |
| Color | 191/400 | 48% |
| Finger | 191/400 | 48% |
| Wing | 181/400 | 45% |
| Workshop | 194/400 | 49% |

Đây là một cấu hình và cách chơi cụ thể, không phải tỉ lệ thắng chung của người chơi. Thế đánh, chỉ số, trait và thời điểm dùng công cụ thay đổi kết quả. Không dùng mô phỏng này để khẳng định thứ hạng độ khó so với Claw, vốn có cơ chế đọc đòn khác.

- `tests/test_ensemble_path.mjs`: điều kiện và nhịp mời, bốn nhánh, rút lui, thắng/chết/Distortion, Volatile, di vật, dự báo Coda, lưu game và đồng bộ kế hoạch.
- `tools/qa/ensemble_browser.mjs`: tám trạng thái ở 1440, 768 và 390px; popup, lựa chọn, tràn ngang, giảm chuyển động và bấm chọn Distortion. Ảnh nằm trong thư mục tạm của hệ điều hành.
- Kiểm tra Full Motion giữ gốc đũa tại bàn tay ở cả hai cực của animation, có chuyển động thật ở đầu đũa. Kiểm tra thêm nhãn kết cục Distortion, đúng một lối rút, và tên mặc định trong hồ sơ tiếng Anh.
- `npm test`, `npm run build`, `dotnet build` và kiểm tra lưu trữ backend sau khởi động lại đã đạt. Story lint còn hai cảnh báo có sẵn ở event Ring/Middle, không thuộc Ensemble.

## Thay đổi trang bị dùng chung

Việc sửa `hasGear` là chủ ý và áp dụng cho mọi dungeon: trong túi phải có vũ khí hoặc giáp mới nhận lợi thế trang bị (giảm 15% sát thương và cộng 10 điểm phần trăm kiểm định trước các hệ số khác). Ampoule và vật phẩm đặc biệt không còn tự cấp lợi thế này. Craft Weapon, E.G.O thức tỉnh và danh Color vẫn cấp lợi thế như trước. Có test hồi quy cho từng loại vật phẩm; tổng phổ không được biến thành giáp miễn phí.
