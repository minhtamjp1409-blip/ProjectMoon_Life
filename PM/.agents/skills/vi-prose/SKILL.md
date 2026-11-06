---
name: vi-prose
description: Vietnamese narration rules for The City Chronicles. Load before writing or editing any Vietnamese event, minor, daily, result, birth line, dungeon stage or cutscene text. Catches the translated-from-English habits (a "một" before every noun, "ở/tại" chains, "của một", ", và" joins, "bởi" passives) and keeps the voice native, concrete and short.
---

# vi-prose

The Vietnamese text is the main text of the game, not a translation of the English. Write it the way a
Vietnamese storyteller says it aloud. When the English and the Vietnamese disagree in rhythm, the
Vietnamese wins; the English follows the meaning, not the word order.

Project Moon terms stay in English (UNIVERSE.md section 4.4): Backstreets, Nest, Wing, Fixer, Syndicate,
District, Distortion, E.G.O, Color, Ahn. Everything else uses native words.

Run `node tools/lint/vi_prose_scan.mjs --examples=5` before and after an edit. `npm test` fails if a
counted habit goes above the ratchet in `package.json` (`lint:vi`); lower the ratchet when you remove some.

## 1. "một" only when the count matters

English needs "a" before every noun. Vietnamese does not. Keep "một" when the number one is the point
("một lần duy nhất", "chỉ một người sống sót"), drop it everywhere else, or put a describing word in its place.

| Máy móc | Tự nhiên |
|---|---|
| Bạn sinh ra trong một căn phòng thuê ở Backstreets của W Corp. | Bạn sinh ra trong căn phòng thuê xập xệ ở Backstreets W Corp. |
| Bạn chào đời trong một căn hộ ở Backstreets. | Bạn chào đời trong căn hộ cũ kỹ nơi Backstreets. |
| Một người kiểm toán của Hana phải đi qua một đoạn đường ray bị một băng nhóm chiếm giữ. | Người kiểm toán của Hana cần đi qua đoạn đường ray đang bị băng nhóm chiếm giữ. |

At most two "một" in a sentence, and never three. The scan counts it (`motHeavy`).

## 2. Do not stack "ở", "tại", "của" before the noun

"một … ở …", "của một …", "ở … của …" are English prepositional chains. Join the place straight to the
noun ("Backstreets W Corp", "tiệm thuốc đầu hẻm"), use "nơi", "giữa", "cạnh", "dưới", or start the sentence
with the place.

| Máy móc | Tự nhiên |
|---|---|
| Bạn sinh ra bên dưới mái hiên của một hiệu cầm đồ cũ ở {region}. | Bạn cất tiếng khóc chào đời ngay dưới mái hiên hiệu cầm đồ cũ ở {region}. |
| Nhận chức Director của một Association. | Lên làm Director một Association. |
| Một tuyến chuyển hàng ở Backstreets bị chặn. | Tuyến chuyển hàng qua Backstreets bị chặn. |

"tại" is for addresses and official records ("ghi tại Hana"). In narration prefer "ở", "nơi", or nothing.

## 3. Verbs carry the scene, not linking words

- Pick the vivid verb: "cất tiếng khóc chào đời" over "được sinh ra"; "đổ ập" over "rơi xuống".
- ", và" joining two full clauses is English ", and". Use a full stop, "rồi", "thì", "mà", or nothing:
  "Đêm ấy trời đổ mưa đen, và hạt mưa ở The City luôn mang theo…" → "Đêm xuống, trời đổ mưa đen, hạt mưa mang theo…".
- No "bị … bởi …" passive: "Bạn bị lính gác phát hiện", not "Bạn bị phát hiện bởi lính gác".
- No "một cách + adjective": "thua công khai", not "thua một cách công khai".
- No "điều mà / người mà / nơi mà" for "that/which": "người bạn từng cứu", not "người mà bạn từng cứu".
- "đã từng": keep one of the two.

## 4. Native words before Sino-Vietnamese ones

| Cứng | Mềm |
|---|---|
| hiện diện | có mặt |
| tiến hành | làm, bắt tay vào |
| thực hiện | làm, làm xong |
| sở hữu | có, giữ |
| tử vong | chết, mất |
| nhận thức được, cảm nhận được | biết, thấy |

Keep a Sino-Vietnamese word when it is the City's own register: a Hana record, a Wing memo, an Index
Prescript may sound official on purpose.

## 5. Rhythm

- Open with the picture, not the frame: "Đêm xuống, trời đổ mưa đen…", not "Vào đêm ấy, có một cơn mưa đen…".
- Vary the opener. Not every birth line starts "Bạn sinh ra" or "Bạn chào đời"; use "Bạn cất tiếng khóc…",
  "Tiếng khóc đầu tiên của bạn…", "Mẹ bạn trở dạ…", "Người ta bế bạn ra…".
- One image per sentence. Two short sentences beat one long sentence held together with "và".
- Keep spelling right: "xập xệ", "cũ kỹ", "mái hiên".

## 6. Do not

- Do not change meaning, numbers, names, `{placeholders}`, effects or flags while polishing.
- Do not add drama the scene does not have ("đầy bi tráng", "vô cùng"). The antislop core still applies.
- Do not translate Project Moon terms to make the sentence flow.
