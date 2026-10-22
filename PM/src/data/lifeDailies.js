// ============================================================================
// DAILY LINES, one or two per year. No choice; each nudges a few stats and the
// change is printed under the line. Short, evocative, specific to where you live.
// need: nest | back | out | notNest | jobs | regions | flags | npc | stat ...
// Every event starts with [Title] so that splitTitle extracts a distinct tag for the UI card.
// ============================================================================

const D = (id, age, need, vi, en, fx = {}, extra = {}) => ({ id, age, need, vi, en, fx, ...extra });

const INF = [0, 3];
const KID = [4, 6];
const CHILD = [7, 11];
const TEEN = [12, 17];
const ADULT = [18, 39];
const MID = [40, 59];
const OLD = [60, 140];
const GROWN = [18, 140];

export const LIFE_DAILIES = [
  // ------------------------------------------------------------------ infancy (0-3)
  D(
    'i_nest_lullaby',
    INF,
    { nest: true },
    '[Hộp nhạc W Corp] Một chiếc hộp nhạc mạ bạc của W Corp đều đặn ngân vang bài hát ru trong phòng trẻ mỗi đêm. Giai điệu cơ khí du dương và êm dịu hơn bất kỳ giọng nói con người nào trong căn hộ cách âm của Nest.',
    '[W Corp Music Box] A silver-plated W Corp music box softly chimed a lullaby in the nursery every evening. Its mechanical melody was smoother and calmer than any human voice in the soundproofed Nest flat.',
    { sanity: 2 }
  ),
  D(
    'i_nest_checkup',
    INF,
    { nest: true },
    '[Khám sức khỏe Nest] Y bác sĩ đặc phái của Nest đến khám định kỳ theo quy chuẩn công dân. Họ đo đạc chỉ số sinh học, rút mẫu máu khử trùng rồi ghi lại một dãy mã số tuyệt mật vào hồ sơ mà cha mẹ bạn không bao giờ được phép xem.',
    '[Nest Citizen Check-up] A designated Nest medical officer conducted the mandatory periodic infant check-up. They measured bio-metrics, drew sanitized blood samples, and stamped a classified code into an archive your parents were never permitted to view.',
    { health: 3 }
  ),
  D(
    'i_nest_window',
    INF,
    { nest: true },
    '[Khung kính tầng cao] Bạn thích áp bàn tay nhỏ xíu vào mặt kính chống đạn dày cộp trên tầng 40. Ở tít dưới xa xăm, Backstreets chỉ là một dải ánh sáng mờ đục nhấp nháy không bao giờ tắt giữa màn đêm.',
    '[High Tower Window] You loved pressing your tiny hands against the thick bulletproof pane on the 40th floor. Far below, the Backstreets stretched as a murky, flickering haze of neon lights that never went dark.',
    { sanity: 1 }
  ),
  D(
    'i_nest_first_word',
    INF,
    { nest: true },
    '[Tiếng bập bẹ đầu đời] Từ ngữ đầu tiên bạn bập bẹ gọi lại chính là tên của người bảo mẫu hợp đồng. Mẹ bạn khẽ mỉm cười gượng gạo, và đúng một tuần sau người bảo mẫu ấy biến mất không để lại dấu vết.',
    '[First Spoken Word] The very first word you babbled was the contract nanny’s name. Your mother gave a tight, polite smile, and exactly one week later the nanny was quietly replaced without a word.',
    { sanity: -1, network: 1 }
  ),
  D(
    'i_back_313',
    INF,
    { back: true },
    '[Giờ cấm 3:10 AM] Đêm nào cũng vậy, khi chiếc kim đồng hồ rỉ sét nhích qua 3 giờ 10, người lớn trong nhà liền bịt chặt miệng bạn lại và ngồi nín thở trong bóng tối dày đặc. Bạn học được cách nuốt nước mắt vào trong trước khi biết nói.',
    '[The 3:10 AM Curfew] Every night at 3:10 AM sharp, the adults clamped their hands over your mouth and sat stone-still in pitch darkness. You learned to swallow your tears in complete silence long before you learned to speak.',
    { sanity: -2 },
    { w: 0.3 }
  ),
  D(
    'i_back_market',
    INF,
    { back: true },
    '[Chợ rau Backstreets] Mẹ địu bạn trên lưng khi chen chúc bán mớ rau dại ở khu chợ ẩm ướt đầu hẻm. Âm thanh mặc cả gay gắt và tiếng bước chân nện trên bùn là những bài học đầu tiên bạn nghe thấy về sinh tồn.',
    '[Backstreet Market] Mother carried you on her back as she peddled wilted greens in the dank alley bazaar. The harsh clash of haggling voices and heavy boots splashing through sludge were your earliest lessons in survival.',
    { health: 1, network: 1 }
  ),
  D(
    'i_back_radio',
    INF,
    { back: true },
    '[Đài radio rè] Chiếc máy thu thanh cũ kỹ bắt được một dải sóng âm nhạc lạc lõng từ Nest lân cận. Tiếng dương cầm cổ điển chập chờn lẫn trong tạp âm tĩnh điện ru bạn vào giấc ngủ chập chờn.',
    '[Crackling Radio] An old receiver picked up a stray music frequency leaking from a nearby Nest. Faint classical piano drifted through static hiss, gently lulling you to sleep amidst alley grime.',
    { sanity: 2 }
  ),
  D(
    'i_back_burn',
    INF,
    { back: true },
    '[Vết bỏng bếp than] Bạn vô thức vươn tay nhỏ chạm vào mép bếp than tổ ong đang cháy đỏ rực. Vết sẹo bỏng phồng rộp trên lòng bàn tay ấy sẽ trở thành dấu tích đầu đời khắc sâu trên da thịt bạn suốt những năm tháng sau này.',
    '[Stove Ember Burn] You reflexively reached out and touched the glowing brim of a charcoal honeycomb stove. The blistered scar on your palm remained an indelible reminder of heat and pain for the rest of your days.',
    { health: -3 }
  ),
  D(
    'i_back_brother',
    INF,
    { back: true },
    '[Trò chơi ném đá] Đứa anh họ lớn hơn bạn vài tuổi dắt bạn ra góc rác dạy cách nhặt sỏi ném xua lũ chuột cống đói ăn. Dù bạn chỉ ném trượt vào vũng nước đục, tiếng cười giòn tan của hai đứa đã xua bớt cái lạnh lẽo của hẻm tối.',
    '[Pebble Throwing] An older cousin led you behind the rusted trash dump to practice hurling pebbles at scavenging gutter rats. You missed every shot into murky puddles, but your childish laughter brightened the chilly alley.',
    { sanity: 2 }
  ),
  D(
    'i_back_flood',
    INF,
    { back: true },
    '[Nước cống dâng cao] Trận mưa ngập tràn qua các ống thoát nước khiến gian phòng trọ tầng hầm chìm trong nước đen ngòm. Cả gia đình phải co cụm nằm ngủ trên chiếc bàn gỗ ọp ẹp suốt ba đêm liền, bạn nằm lọt thỏm giữa hơi ấm của cha mẹ.',
    '[Basement Inundation] Heavy downpours flooded the subterranean tenement with greasy sewer backwash. The whole family huddled atop a single creaking wooden table for three nights, keeping you safe and warm between them.',
    { health: -1, sanity: 2 }
  ),
  D(
    'i_nest_toy',
    INF,
    { nest: true },
    '[Robot đồ chơi Nest] Bạn được tặng một con búp bê cơ khí tinh xảo biết bập bẹ phát âm tên bạn mỗi sáng. Nó bí mật ghi âm từng lời nói trong phòng và truyền về máy chủ nội bộ của Wing, nhưng không một ai nhắc đến chuyện đó.',
    '[Nest Clockwork Toy] You received an ornate mechanical automaton that cheerfully recited your name every morning. It quietly recorded every breath in the nursery to the Wing’s internal data servers, though no one ever spoke of it.',
    { sanity: 2, network: 1 }
  ),
  D(
    'i_any_sun',
    INF,
    {},
    '[Ánh nắng hiếm hoi] Lần đầu tiên trong đời bạn được người lớn bế lên sân thượng sau cơn mưa dài. Bạn nheo đôi mắt non nớt ngắm nhìn khoảng sáng vàng nhạt xuyên qua tầng mây bụi mà người lớn gọi là ánh mặt trời.',
    '[A Rare Sunbeam] For the first time in your life, you were carried to the rooftop after a prolonged downpour. You squinted your little eyes at the pale golden warmth breaking through heavy smog—what the adults called the sun.',
    { sanity: 2 }
  ),
  D(
    'i_any_lullaby',
    INF,
    {},
    '[Khúc ca không tên] Có một giọng hát êm đềm cất lên ru bạn ngủ giữa đêm sâu bằng thứ ngôn ngữ cổ xưa không ai rõ nguồn gốc. Dù không hiểu từng ca từ, giai điệu da diết ấy khắc sâu vào tâm khảm bạn suốt cuộc đời.',
    '[The Nameless Lullaby] A gentle voice sang you to sleep in the dead of night with an ancient melody of forgotten origins. Though you understood no lyrics, its haunting cadence stayed rooted in your spirit forever.',
    { sanity: 1, resonance: 1 }
  ),
  D(
    'i_back_fever',
    INF,
    { back: true },
    '[Cơn sốt hẻm tối] Cơn sốt cao co giật kéo dài suốt ba ngày đêm giữa căn phòng ẩm dột. Không có tiền mua thuốc hạ sốt từ tiệm tân dược, mẹ bạn thức trắng đêm dùng từng gáo nước mưa hứng trên mái tôn lau mát cơ thể nhỏ bé của bạn.',
    '[Backstreet High Fever] A raging fever shook your tiny frame for three straight nights in the damp shack. Without coin for clinic pills, your mother stayed up all night sponging your forehead with rainwater caught in tin gutters.',
    { health: -3, sanity: 1 }
  ),
  D(
    'i_back_pipe',
    INF,
    { back: true },
    '[Ống dẫn nước ấm] Bạn chập chững tập đi bằng cách bám chặt vào đường ống dẫn chất lỏng rỉ sét chạy dọc bờ tường gạch mục. Đường ống tỏa ra hơi ấm nhịp nhàng, tựa như có một sinh vật khổng lồ đang thở thoi thóp bên trong.',
    '[Warm Conduit Pipe] You took your first clumsy steps by gripping a rusted conduit running along crumbling brickwork. The pipe pulsed with steady, rhythmic warmth, as though some gargantuan creature breathed inside.',
    { health: 2 }
  ),
  D(
    'i_back_neighbor',
    INF,
    { back: true },
    '[Chuyện kể của bà lão] Bà cụ neo đơn phòng bên trông bạn mỗi khi cha mẹ phải đi làm tăng ca kíp đêm ở xưởng gia công. Bên chén trà nhạt, bà thủ thỉ kể về thời xa xưa khi The City vẫn còn những rặng cây thật và bầu trời trong vắt.',
    '[Elder Neighbor’s Tale] The elderly woman next door minded you whenever your parents took overnight factory shifts. Over weak tea, she softly whispered legends of an era when the City still possessed real forests and unpolluted skies.',
    { sanity: 2, network: 1 }
  ),
  D(
    'i_back_rats',
    INF,
    { back: true },
    '[Cửa sổ đóng ván] Cha bạn tức tốc dùng đinh tán chặt ba tấm gỗ dày bịt kín khung cửa sổ sau khi một toán Rat lảng vảng rình rập trước ngõ suốt ba đêm. Căn phòng trở nên tối tăm ngột ngạt, nhưng cả nhà đã có thể chợp mắt trong an toàn.',
    '[Boarded Windows] Father hurriedly nailed thick wooden slats over the low window after a gang of scavengers lingered in the alley for three consecutive nights. The room grew stifling and dark, but the household could finally sleep.',
    { sanity: 1, health: 1 }
  ),
  D(
    'i_out_storm',
    INF,
    { out: true },
    '[Bão cát Outskirts] Một cơn bão cát đen ngòm gầm rú càn quét suốt cả tuần ngoài rìa hoang mạc Outskirts. Cả khu trại dựng lều phải rút sâu xuống hầm đất trú ẩn, và bạn lớn khôn thêm một chút giữa tiếng cuồng phong rít gào bên trên.',
    '[Outskirts Sandstorm] A black dust storm howled incessantly across the barren Outskirts wastes for an entire week. The whole camp retreated into subterranean shelters, and you grew a bit sturdier amidst the muffled roar overhead.',
    { health: -2, sanity: 1 }
  ),
  D(
    'i_out_wall',
    INF,
    { out: true },
    '[Ánh sao của kẻ khác] Đứng trên chòi canh thô sơ của khu trại Outskirts, người ta có thể nhìn thấy bức đại tường thành sừng sững của The City. Người lớn chỉ tay vào những chùm đèn rực rỡ xa xôi ấy và bảo bạn đó là "những vì sao của kẻ khác".',
    '[Other People’s Stars] From the crude camp lookout, the colossal perimeter wall of the City loomed against the horizon. Elders pointed at the shimmering light cluster and taught you those were “other people’s stars.”',
    { sanity: 1 }
  ),
  D(
    'i_any_crawl',
    INF,
    {},
    '[Hành trình bò qua sàn] Bạn kiên nhẫn bò một mạch từ góc phòng này sang góc phòng kia mà không một lần ngã gục. Không ai có thời gian ghi chép lại chiến tích nhỏ nhoi ấy, nhưng cảm giác lạnh ngắt của nền sàn gỗ đã in sâu vào xúc giác bạn.',
    '[Crawling Across the Floor] You steadily crawled across the drafty floorboards from corner to corner without tumbling once. Nobody had the leisure to note such a small feat, but the biting chill of bare wood was stamped into your memory.',
    { health: 1 }
  ),
  D(
    'i_back_sparrow',
    INF,
    { back: true },
    '[Chim sẻ trên hiên] Một con chim sẻ xơ xác sà xuống bậu cửa hiên nhà để nhặt từng mẩu vụn bánh mì khô bạn đánh rơi. Bạn tròn mắt dõi theo từng cú nhảy nhót lanh lợi của nó cho tới khi một tiếng còi xe cấp cứu inh ỏi khiến nó giật mình vỗ cánh bay mất.',
    '[Porch Sparrow] A scruffy alley sparrow alighted onto the windowsill, pecking dry breadcrumbs you had dropped. You watched wide-eyed as it hopped merrily until a shrieking emergency siren startled it back into the smog.',
    { sanity: 1 }
  ),
  D(
    'i_back_pottery',
    INF,
    { back: true },
    '[Cục đất sét ẩm] Một ông thợ thủ công già tốt bụng dúi vào tay bạn một cục đất sét ẩm để bạn nghịch nặn trên bậc thềm. Mùi hương ngai ngái nồng ấm của đất tươi tạm thời xua tan mùi xú uế bốc lên từ rãnh nước thải bên dưới chân.',
    '[Damp Clay Lump] A kindly elderly craftsman pressed a moist lump of clay into your tiny palms to shape upon the doorstep. The earthy, clean aroma temporarily masked the sour stench rising from open sewage gutters below.',
    { sanity: 2 }
  ),
  D(
    'i_back_steam',
    INF,
    { back: true },
    '[Hơi nước lò bánh] Luồng hơi nước nóng hổi thơm nồng mùi bột mì từ xửng hấp bánh bao đầu ngõ phả vào mặt bạn mỗi khi được bế qua. Đó là thứ ấm áp hiếm hoi vỗ về bạn giữa những buổi sớm Backstreets ẩm thấp và buốt giá.',
    '[Dumpling Steam] Puffs of fragrant flour steam from the corner dumpling steamer brushed across your cheeks every dawn. That fleeting warmth was a rare comfort amidst the bitter, sodden mornings of the Backstreets.',
    { health: 1 }
  ),
  D(
    'i_back_lullaby_rain',
    INF,
    { back: true },
    '[Tiếng mưa mái tôn] Cơn mưa rào trút nước xối xả gõ lách cách liên hồi lên mái tôn rỉ sét của căn chòi. Tiếng ồn ào hỗn độn ngoài ngõ dần bị tiếng mưa át đi, nhẹ nhàng đưa bạn vào giấc ngủ bình yên hiếm thấy.',
    '[Tin Roof Downpour] Heavy squalls drummed continuously against the rusted corrugated tin roof of the shack. The chaotic clamor of the alleys faded beneath rain rhythms, coaxing you into rare, peaceful slumber.',
    { sanity: 1 }
  ),
  D(
    'i_back_coin_jar',
    INF,
    { back: true },
    '[Hũ tiền lẻ leng keng] Bạn thích thú bò quanh chiếc hũ sắt đựng tiền lẻ dành dụm của cha đặt dưới gầm bàn. Tiếng leng keng lanh lảnh của những đồng Ahn mỏng va vào nhau đã trở thành món đồ chơi sống động đầu tiên trong ký ức bạn.',
    '[Clinking Coin Tin] You happily crawled around your father’s battered tin jar of saved coins stashed under the table. The sharp metallic clinking of thin Ahn coins was the very first toy you ever discovered.',
    { wealth: 1, sanity: 1 }
  ),
  D(
    'i_back_shadow_play',
    INF,
    { back: true },
    '[Bóng tay đèn dầu] Ngọn đèn dầu le lói hắt bóng bàn tay to lớn của cha lên vách tường đất thành hình những quái vật ngộ nghĩnh. Cha bật cười dặn rằng quái vật trong The City chỉ sợ những đứa trẻ biết ngoan ngoãn giữ trật tự.',
    '[Oil Lamp Shadows] A flickering kerosene wick cast father’s weathered hands onto the mud wall as playful monstrous shapes. He chuckled and told you that monsters in the City only feared quiet, obedient children.',
    { sanity: 2 }
  ),
  D(
    'i_back_stew',
    INF,
    { back: true },
    '[Nồi cháo rau dại] Nồi cháo rau dại nấu loãng sôi sùng sục trên chiếc bếp than tổ ong nghi ngút khói giữa gian bếp chật chội. Vị cháo đắng chát nơi đầu lưỡi nhưng hơi ấm của nó đã xua tan cơn cồn cào trong bụng bạn suốt cả buổi chiều muộn.',
    '[Bitter Herb Broth] A pot of thin wild herb porridge bubbled lazily over smoky honeycomb charcoal in the cramped room. Bitter to the taste, its coarse warmth nonetheless quelled your rumbling stomach through the damp afternoon.',
    { health: 1 }
  ),
  D(
    'i_back_cat',
    INF,
    { back: true },
    '[Con mèo hoang gầm giường] Một con mèo hoang cụt tai lén chui qua kẽ ván nứt vào nằm cuộn tròn dưới gầm giường bạn để sưởi nhờ hơi ấm. Bạn rón rén thò bàn tay nhỏ xoa lên bộ lông xơ xác của nó, cảm nhận tiếng gừ gừ khẽ khàng rung động.',
    '[Scruffy Alley Cat] A stray bobtail cat slipped through loose floorboards to curl beneath your cot for warmth. You gently reached out to pet its scarred, dusty fur, comforted by its faint rhythmic purr.',
    { sanity: 2 }
  ),
  D(
    'i_nest_chime',
    INF,
    { nest: true },
    '[Chuông âm học Nest] Hệ thống chuông báo dạng sóng âm điều hòa của Nest khẽ rung nhẹ đánh thức bạn đúng 6:00 sáng mỗi ngày. Giai điệu tinh chuẩn tuyệt đối và êm ái đến mức bạn không hề cảm nhận thấy sự ức chế cơ học ẩn sau nó.',
    '[Nest Acoustic Chime] The district harmonic frequency chime softly roused the nursery at precisely 6:00 AM every single morning. Utterly precise and pleasant, it disguised the rigid mechanical regimentation beneath.',
    { sanity: 1 }
  ),
  D(
    'i_nest_cleanse',
    INF,
    { nest: true },
    '[Bồn khử trùng nano] Bạn được đưa vào khoang khử trùng sương nano định kỳ của khu cư dân Nest cao cấp. Hơi sương mát lạnh phủ kín không gian mang theo thoang thoảng mùi ozone nhân tạo, sạch sẽ, vô trùng nhưng hoàn toàn xa lạ với hơi ấm tự nhiên.',
    '[Nano-Sanitation Pod] You were placed inside a residential mist-cleansing capsule for routine purification. Cool microscopic vapor enveloped you with a faint ozone scent—sterile, pristine, and completely detached from natural warmth.',
    { health: 1 }
  ),
  D(
    'i_nest_picture_book',
    INF,
    { nest: true },
    '[Sách nổi công nghệ Wing] Người mẹ lật giở cho bạn xem cuốn sách giáo trình điện tử ba chiều mô phỏng các kỳ quan Singularity của 26 Wing. Những bánh răng vàng óng và những đường dẫn hạt năng lượng chuyển động mượt mà như một giấc mơ hoàn mỹ.',
    '[Wing Pop-Up Archive] Mother flipped through an interactive holographic primer depicting the grand Singularity marvels of the Wings. Golden cogs and luminescent flux pipelines revolved flawlessly like a meticulously engineered dream.',
    { sanity: 1, network: 1 }
  ),
  D(
    'i_any_blanket',
    INF,
    {},
    '[Tấm chăn vá manh] Tấm chăn thô ráp chắp vá từ hàng chục mảnh vải bạt thừa được quấn chặt quanh người bạn khi cơn gió lạnh tràn về. Dù không gian sinh hoạt chật chội và thiếu thốn, bạn vẫn cảm nhận được cảm giác an toàn trọn vẹn trong vòng tay gia đình.',
    '[Patchwork Quilt] A rough quilt sewn from scraps of heavy canvas swaddled you against the biting drafts. Narrow and humble as the room was, you felt sheltered from the hostile world outside.',
    { sanity: 1 }
  ),
  D(
    'i_any_first_step',
    INF,
    {},
    '[Những bước chân đầu tiên] Bạn dũng cảm buông tay khỏi bậu cửa và chập chững bước những bước chân đầu đời trên nền sàn gỗ kêu cọt kẹt. Tiếng vỗ tay khe khẽ cùng ánh mắt rạng rỡ của người thân đã thắp sáng căn phòng nhỏ tối tăm.',
    '[First Stumbling Steps] Letting go of the doorframe, you took your very first wobbling steps across the creaking floorboards. Soft clapping and warm smiles from your family illuminated the cramped, shadowy quarters.',
    { health: 1, sanity: 1 }
  ),
  D(
    'i_out_ember',
    INF,
    { out: true },
    '[Tàn lửa đêm hoang mạc] Bạn ngây người ngắm nhìn những tàn lửa đỏ hồng lập lòe bay bổng từ đống củi khô giữa hoang mạc Outskirts mênh mông gió rít. Hơi nóng của đống lửa bập bùng là ranh giới duy nhất ngăn cách bạn với bóng tối vô tận ngoài kia.',
    '[Wasteland Campfire Embers] You watched glowing red embers dance up from crackling scrubwood into the vast, whistling Outskirts night. The radiant heat of the campfire was the only wall standing between you and the boundless dark.',
    { sanity: 1, health: 1 }
  ),
  D(
    'i_out_wind_chime',
    INF,
    { out: true },
    '[Chuông gió xương thú] Chiếc chuông gió xâu chuỗi từ các đốt xương thú sa mạc treo trước cửa lều trại Outskirts gõ lách cách đều đặn mỗi khi gió thốc qua. Thanh âm khô khốc ấy vừa xua đuổi các sinh vật lạ vừa trở thành khúc nhạc quen thuộc đầu đời của bạn.',
    '[Bone Windchime] A windchime strung from bleached desert beast vertebrae clattered before the Outskirts tent entrance with every gust. Its hollow rattling deterred wandering vermin and became the familiar rhythm of your earliest memories.',
    { sanity: 1 }
  ),
  D(
    'i_out_ruins_glow',
    INF,
    { out: true },
    '[Hơi thở từ Tàn Tích] Cụm phế tích Ruins cấm địa xa xa ngoài đường chân trời Outskirts phát ra ánh sáng huỳnh quang xanh lục ma mị mỗi khi màn đêm buông xuống. Người lớn trong trại nghiêm nghị dặn rằng đó là hơi thở của những di vật cổ xưa đang nằm ngủ yên.',
    '[Bioluminescent Relic Ruins] The forbidden Ruins towering on the far Outskirts horizon cast an eerie pale emerald glow into the night sky. Camp elders solemnly warned that ancient, slumbering Singularities were exhaling into the wastes.',
    { sanity: 1, resonance: 1 }
  ),
  D(
    'i_out_sand_glass',
    INF,
    { out: true },
    '[Hạt thủy tinh sét] Bạn nhặt được một mảnh tinh thể cát bị tia sét đánh nung chảy, lấp lánh như viên ngọc quý giữa bãi cát khô cằn. Bạn cẩn thận giấu nhẹm viên đá óng ánh ấy dưới đáy gối rơm như một báu vật bí mật của riêng mình.',
    '[Lightning Sand Glass] You unearthed a small nodule of sand fused into translucent glass by a thunderstorm strike, sparkling like a gem. You tucked the shining pebble under your straw pallet as your most prized childhood treasure.',
    { wealth: 1, sanity: 1 }
  ),
  D(
    'i_out_caravan_bell',
    INF,
    { out: true },
    '[Đoàn buôn cơ giới Outskirts] Một đoàn xe bọc thép chở hàng lậu gầm rú xích sắt cày xới lớp cát bụi khi tiến vào khu chợ ven trại. Tiếng xích sắt nghiến gầm gừ và làn khói dầu xám xịt vừa làm bạn khiếp sợ vừa khơi dậy trí tò mò vô tận.',
    '[Armored Caravan Treads] An armored scavenger convoy roared past camp on clanking iron treads, churning up clouds of grit. The deep vibration of industrial diesel engines terrified and captivated your young mind.',
    { sanity: 1, network: 1 }
  ),
  D(
    'i_out_canteen',
    INF,
    { out: true },
    '[Ngụm nước mát bình tông] Mẹ kề bình tông thép cũ kỹ cho bạn uống từng ngụm nước ngọt mát lành được chưng cất tỉ mỉ qua máy lọc thô. Vị nước trong veo mát lạnh xoa dịu ngay lập tức cảm giác khô rát cháy cổ của những ngày hè sa mạc.',
    '[The Dented Steel Canteen] Mother tilted a battered steel canteen, feeding you cool, filtered sips of purified water. The clean sweetness instantly quenched the scorching dryness of long desert afternoons.',
    { health: 2, sanity: 1 }
  ),
  D(
    'i_out_beast_howl',
    INF,
    { out: true },
    '[Tiếng hú đêm đông] Trong đêm đông buốt giá thấu xương, tiếng gầm rú the thé của sinh vật dị dạng vọng lại từ đỉnh đồi cát ngoài rìa Outskirts. Cha ôm chặt bạn vào lồng ngực rắn rỏi, tay giữ chặt chuôi rìu phòng vệ cho tới khi hừng đông ló rạng.',
    '[Howling Beyond the Dunes] On bitter frostbitten nights, shrill shrieks of mutated beasts echoed from distant dunes across the wastes. Father clutched you tight against his chest, gripping his rusted hatchet until daybreak.',
    { sanity: 1, health: 1 }
  ),
  D(
    'i_out_metal_scrap',
    INF,
    { out: true },
    '[Pháo đài tôn rỉ] Bạn thích thú xếp những mảnh tôn rỉ sét nhặt quanh lều thành một "pháo đài" mini để che chắn gió cát cho đàn kiến tha mồi qua kẽ nứt. Bạn ngồi hàng giờ ngắm nhìn những sinh vật bé nhỏ kiên cường giống như chính mình.',
    '[Rusted Sheet Fortress] You arranged discarded rusted iron scraps into a tiny fort to shelter busy ants from sweeping dust gusts. Watching those resilient little bugs survive brought endless wonder to your solitary afternoons.',
    { sanity: 2 }
  ),
  D(
    'i_out_star_sky',
    INF,
    { out: true },
    '[Bầu trời sao thật] Khác với bầu trời bị khói muội công nghiệp che khuất của The City, đêm Outskirts mở ra hàng vạn vì sao rực rỡ lấp lánh trên nền trời nhung đen. Bạn nằm ngửa trên mái lều, lặng người trước vẻ bao la huyền bí của vũ trụ.',
    '[Unpolluted Starlight] Unlike the smog-choked ceilings of the City, the Outskirts night unveiled tens of thousands of sharp, glittering stars. Lying on the canvas tent roof, you gazed into the breathtaking abyss of the cosmos.',
    { sanity: 2, resonance: 1 }
  ),
  D(
    'i_out_caravan_sugar',
    INF,
    { out: true },
    '[Mẩu đường nâu du mục] Một người buôn lậu tử tế trong đoàn xe ghé ngang dúi vào tay bạn một mẩu đường nâu thô ngọt đậm. Vị ngọt ngào hiếm hoi bùng nổ trên đầu lưỡi trở thành hương vị ngọt ngào nhất mà bạn từng nếm trải trong đời.',
    '[Lump of Raw Sugar] A traveling nomad from an armored truck handed you a precious chunk of unrefined brown sugar. That sudden burst of intense sweetness became an unforgettable culinary benchmark of your early life.',
    { sanity: 2, health: 1 }
  ),
  D(
    'i_any_warm_milk',
    INF,
    {},
    '[Bát sữa ấm rắc quế] Một bát sữa nóng được đun trên bếp than rắc thêm chút bột vỏ cây thơm lừng được bưng đến bên bạn. Hơi ấm ngào ngạt lan tỏa khắp lồng ngực nhỏ bé, xua tan cái lạnh lẽo ngột ngạt của mùa đông The City.',
    '[Spiced Warm Milk] A small bowl of hot milk brewed over embers with a sprinkle of aromatic cinnamon was offered to you. Soothing warmth radiated down your throat, driving away the damp cold of winter in the City.',
    { health: 2, sanity: 1 }
  ),
  D(
    'i_any_paper_crane',
    INF,
    {},
    '[Con hạc giấy báo cũ] Ai đó trong khu nhà đã tỉ mẩn gấp cho bạn một chú hạc nhỏ bằng mẩu giấy báo đen trắng cũ kỹ của The City. Bạn cầm chặt đôi cánh giấy mỏng manh ấy, chạy nhảy tíu tít khắp gian phòng cả một ngày trời.',
    '[Old Newsprint Crane] Someone folded a delicate origami crane for you from a torn scrap of City newspaper. You clutched its flimsy paper wings, racing around the narrow room in cheerful triumph all afternoon.',
    { sanity: 2 }
  ),

  // ------------------------------------------------------------------ kids (4–6)
  D(
    'k_out_tracks',
    KID,
    { out: true },
    '[Dấu chân quái vật] Những người thợ săn dạn dày trong trại chỉ cho bạn cách nhận diện dấu chân của dị vật trên cát ẩm: vết móng vuốt ba ngón sâu hoắm và vệt chất nhờn đen bóng chưa kịp khô. Bạn khắc ghi từng chi tiết để biết đường tránh xa tử địa.',
    '[Monstrous Footprints] Experienced wasteland trackers taught you to read abnormal prints in the damp loam: three-toed talons and sticky iridescent bile trails. You memorized every contour to avoid sudden slaughter.',
    { health: 1, rep: 1 }
  ),
  D(
    'k_out_flare',
    KID,
    { out: true },
    '[Pháo sáng màu tím] Một quả pháo cứu hộ màu tím thẫm rít lên xé toạc chân trời từ vị trí đoàn xe khảo sát vừa bị mai phục. Người lớn trong trại lập tức im lặng, lên đạn cho súng săn và tăng gấp đôi số lính canh gác quanh hàng rào.',
    '[Purple Distress Flare] A dark violet distress flare hissed into the twilight sky where a surveying caravan had just been overrun. The adults fell dead silent, cocking their carbines and doubling the watch perimeter.',
    { sanity: -1, health: 1 }
  ),
  D(
    'k_nest_tutor',
    KID,
    { nest: true },
    '[Sổ tay tuân thủ Wing] Người gia sư riêng nắn nót dạy bạn tập đọc bằng cuốn sổ tay quy tắc bảo mật của tập đoàn Wing. Bạn học thuộc lòng khái niệm "tuyệt đối tuân thủ" và "hạn ngạch kỷ luật" trước cả khi biết viết chữ "cha mẹ".',
    '[Corporate Compliance Primer] Your private tutor taught you the alphabet through the corporate employee compliance manual. You knew the terms “absolute adherence” and “disciplinary quotas” long before the words for parents.',
    { network: 2, sanity: -1 }
  ),
  D(
    'k_nest_garden',
    KID,
    { nest: true },
    '[Khu vườn trên mái kính] Khu vườn nhân tạo trên tầng thượng của tòa nhà Nest trồng những cây xanh thật được lai tạo sinh học. Cứ mỗi độ chuyển mùa, các đội bảo trì lại thay toàn bộ cây mới trước khi bất kỳ chiếc lá nào kịp úa tàn.',
    '[Rooftop Glass Garden] The greenhouse garden on the Nest high-rise cultivated genuine bio-engineered shrubs. Every season, maintenance crews replaced the entire flora layout before a single leaf was permitted to wither.',
    { sanity: 2 }
  ),
  D(
    'k_nest_test',
    KID,
    { nest: true },
    '[Kỳ sát hạch phản xạ] Bạn tham gia đợt kiểm tra phản xạ và thần kinh định kỳ dành cho trẻ nhỏ của Nest. Khi kết quả được công bố ở mức "trên trung bình", cha bạn thở phào nhẹ nhõm như thể cả gia đình vừa được ân xá thoát khỏi án trục xuất.',
    '[Nest Reflex Assessment] You underwent the mandatory neural reflex assessment for Nest infants. When the score came back “above baseline quota,” your father exhaled with the relief of a man acquitted of a death sentence.',
    { rep: 2, sanity: 1 }
  ),
  D(
    'k_back_locks',
    KID,
    { back: true },
    '[Bảy giây khóa ba then] Mẹ nghiêm khắc rèn luyện cho bạn phản xạ kéo chặt ba chốt then sắt trên cánh cửa trước khi tiếng chuông 3:00 sáng điểm. Khi bạn làm được trong đúng bảy giây, mẹ vẫn nghiêm giọng bảo phải nhanh hơn nữa mới sống được ở Backstreets.',
    '[Seven-Second Triple Bolt] Mother drilled you tirelessly to throw all three heavy steel door bolts before the 3:00 AM siren sounded. When you executed it in seven seconds, she still insisted you must be faster to survive here.',
    { health: 1, sanity: -1 }
  ),
  D(
    'k_back_shells',
    KID,
    { back: true },
    '[Vỏ đạn đồng đổi kẹo] Bạn cặm cụi lượm lặt những vỏ đạn đồng sáng bóng rơi vãi trong các góc ngõ sau những cuộc đụng độ của đám Fixer. Thu gom đủ mười vỏ đạn nguyên vẹn mang đến tiệm tạp hóa đầu hẻm, ông chủ đổi cho bạn một viên kẹo mạch nha ngọt lịm.',
    '[Brass Shell Casings] You diligently scavenged spent brass casings scattered across pavement after Fixer skirmishes. Gathering ten undamaged shells at the alley grocer yielded you a single cherished malt candy.',
    { wealth: 1, sanity: 1 }
  ),
  D(
    'k_back_stranger',
    KID,
    { back: true },
    '[Người lạ mặc áo măng tô] Một người đàn ông ăn mặc lịch sự trong chiếc áo khoác sang trọng bất ngờ dừng lại hỏi xem bạn có muốn đi ăn bánh ngọt không. Bạn hoảng hốt cắm đầu chạy thục mạng về nhà; sáng hôm sau đứa bé ở căn nhà số 9 đã không bao giờ trở về nữa.',
    '[The Suited Stranger] An impeccably dressed man in a fine trench coat leaned down, asking if you’d like to try some sweet pastries. You bolted home in terror; the following day, the young boy from apartment 9 was never seen again.',
    { sanity: -3 }
  ),
  D(
    'k_back_friend_play',
    KID,
    { back: true, npc: 'friend' },
    '[Căn cứ thùng các-tông] {friend} và bạn cùng nhau hì hục dựng một "căn cứ bí mật" từ những thùng các-tông bỏ đi sau xưởng in cũ. Nằm ẩn mình trong góc tối chật hẹp ấy cùng người bạn thân, bạn cảm thấy đó là nơi bình yên và an toàn nhất trên toàn cõi The City.',
    '[Cardboard Box Redoubt] {friend} and you spent hours building a secret fortress out of discarded corrugated boxes behind the print shop. Tucked into that cramped recess with your best companion, you felt safer than anywhere in the City.',
    { sanity: 3 }
  ),
  D(
    'k_out_hunt',
    KID,
    { out: true },
    '[Bài học đặt bẫy đầu tiên] Bạn lon ton theo người lớn trong trại học cách căng bẫy thép rình rập thú hoang Outskirts. Con mồi đầu tiên bạn tận mắt chứng kiến tắt thở là một sinh vật có ba con mắt đỏ rực và dòng máu màu xanh nhớt nhớt chảy tràn trên cát.',
    '[First Trapping Lesson] You tagged along with camp elders to set heavy iron wire snares in the dunes. The first prey you saw expire had three unblinking crimson eyes and thick viridian bile pooling across the sand.',
    { health: 1, sanity: -1 }
  ),
  D(
    'k_any_rain',
    KID,
    {},
    '[Mưa axit đầu mùa] Trận mưa axit nồng nặc mùi lưu huỳnh rả rích trút xuống khu phố suốt cả tuần liền làm rỗ cả mặt đường nhựa. Bị nhốt trong nhà tránh hơi độc, bạn ngồi bó gối vẽ những hình thù nguệch ngoạc lên lớp kính cửa sổ mờ đặc hơi nước.',
    '[Early Acid Drizzle] Acrid acid rain smelling of sulfur drizzled over the tenements for seven days straight, etching pits into asphalt. Confined indoors away from toxic mist, you sat drawing doodles across the fogged-up glass.',
    { sanity: 1 }
  ),
  D(
    'k_any_cough',
    KID,
    { notNest: true },
    '[Cơn ho dai dẳng] Mùa đông buốt giá năm ấy mang theo cơn ho khan dai dẳng rút ruột khiến lồng ngực bạn đau thắt. Những viên thuốc trợ giá rẻ mạt mua ở quầy thuốc chợ đen khiến bạn rơi vào trạng thái ngủ li bì mơ màng suốt cả ngày dài.',
    '[Persistent Winter Cough] A hollow, chest-wracking cough seized you during the freezing winter months. Cheap contraband cough syrup purchased from back-alley dealers left you in a drowsy, dream-heavy stupor all day.',
    { health: -2 }
  ),

  // ------------------------------------------------------------------ childhood (7–11)
  D(
    'c_nest_school',
    CHILD,
    { nest: true },
    '[Thứ hạng ghế ngồi Nest] Ngôi trường tiểu học cơ sở bên trong Nest phân chia chỗ ngồi trong lớp học nghiêm ngặt dựa theo cấp bậc chức vụ của phụ huynh trong tập đoàn. Bạn được phân vào hàng ghế thứ ba, luôn bị giám sát bởi các camera chấm điểm tác phong.',
    '[Nest Tiered Desks] The prestigious Nest academy strictly assigned classroom seating according to parental corporate grade within the Wing. You sat in the third row, continuously evaluated by biometric demeanor scanners.',
    { network: 2 }
  ),
  D(
    'c_nest_fencing',
    CHILD,
    { nest: true },
    '[Lớp đấu kiếm Cinq] Bạn được cho theo học lớp kiếm thuật cơ bản tại câu lạc bộ thiếu niên trực thuộc Cinq Association. Vị huấn luyện viên nhận xét rằng bạn sở hữu cổ tay cực kỳ linh hoạt và chuẩn xác, nhưng cái đầu thì lại quá nóng nảy khi giao chiến.',
    '[Cinq Junior Fencing] You attended junior rapier drills at the Cinq Association training pavilion. The instructor noted your wrists were remarkably swift and precise, though your temper burned far too fiercely in the duel.',
    { health: 2, rep: 1 }
  ),
  D(
    'c_nest_cull',
    CHILD,
    { nest: true },
    '[Chiếc bàn trống giữa kỳ] Một người bạn cùng bàn bỗng dưng nghỉ học không lý do ngay giữa học kỳ mà thầy cô giáo tuyệt đối cấm nhắc tên. Gia đình bạn ấy vừa bị tước quyền công dân và xóa sạch tên khỏi danh bạ cư trú Nest sau một cuộc thanh trừng nội bộ.',
    '[The Purged Desk] A seatmate abruptly vanished mid-term, their name struck from the register with teachers forbidding any inquiry. Their entire family had been stripped of residency status and purged following internal audits.',
    { sanity: -2, network: -1 }
  ),
  D(
    'c_back_job',
    CHILD,
    { back: true },
    '[Phụ việc tiệm cơ khí] Bạn bắt đầu kiếm việc vặt tại một xưởng bảo trì chi giả chân tay ở hẻm tối: lau dầu mỡ máy móc và phân loại đinh ốc tán. Lão chủ xưởng keo kiệt không trả tiền công bằng tiền mặt mà trả bằng một phần cơm trưa đạm bạc mỗi ngày.',
    '[Prosthetics Workshop Errand] You began taking odd chores at a backstreet cybernetic clinic: cleaning grease and sorting precision bolts. The miserly technician paid no coin, only a rough boxed lunch at the end of each shift.',
    { wealth: 2, health: 1 }
  ),
  D(
    'c_back_blackout',
    CHILD,
    { back: true },
    '[Mất điện toàn khu] Toàn bộ khu phố bị cắt điện hoàn toàn trong hai đêm liền khiến bóng tối đặc quánh bao trùm. Vào đêm thứ hai, những tiếng gào thét man rợ và tiếng xương gãy vang lên từ dãy nhà đối diện; sáng hôm sau, không một ai dám nhắc lại chuyện đó.',
    '[Two-Night Blackout] The entire tenement district suffered a catastrophic blackout for two consecutive nights. On the second midnight, bone-chilling screams resonated from the facing block; come morning, neighbors feigned ignorance.',
    { sanity: -3 }
  ),
  D(
    'c_back_dog',
    CHILD,
    { back: true },
    '[Con chó chột mắt gác cổng] Bạn cưu mang một chú chó hoang chột mắt bị bỏ rơi ở góc phố và đưa nó về góc hiên nhà nuôi nấng. Nó đặc biệt nhạy bén, luôn sủa vang cảnh báo mỗi khi có kẻ mang vũ khí bén mảng lại gần cửa, khiến cả gia đình đều quý mến nó.',
    '[The One-Eyed Guard Dog] You took in a battered, one-eyed stray pup wandering the alleys and sheltered it beside the porch. It barked sharply whenever armed figures prowled near the entrance, earning deep affection from your household.',
    { sanity: 3 }
  ),
  D(
    'c_back_fixer_watch',
    CHILD,
    { back: true },
    '[Toán Fixer dọn dẹp quán rượu] Bạn đứng nấp sau cột điện chứng kiến một đội Fixer có vũ trang dọn dẹp một quán rượu náo loạn đầu phố. Động tác của họ lạnh lùng, dứt khoát và gọn gàng đến rợn người, chỉ để lại một vệt máu đỏ tươi kéo dài ngoằng ra tận lòng đường.',
    '[Fixer Enforcement Team] You hid behind a light pole watching an armed Fixer squad purge an unruly tavern down the street. Their clean, ruthless efficiency was terrifying, leaving behind a long, gleaming streak of crimson on the asphalt.',
    { rep: 1, sanity: -1 },
    { flags: ['해결사동경'] }
  ),
  D(
    'c_back_friend_secret',
    CHILD,
    { back: true, npc: 'friend' },
    '[Bí mật ngón cái của {friend}] Trong góc khuất sau miếu hoang, {friend} ghé sát tai thì thầm với bạn một bí mật kinh hoàng: cha của nó đang là tay sai phục vụ cho Thumb. Bạn nghiêm nghị đặt tay lên ngực thề sống thề chết sẽ giữ kín bí mật này.',
    '[The Thumb Secret of {friend}] In a shadowed courtyard, {friend} whispered a dangerous confession: their father was a sworn enforcer for the Thumb syndicate. You placed your hand over your heart, swearing never to speak a word of it.',
    { sanity: 1 },
    { bond: { friend: 6 } }
  ),
  D(
    'c_out_ruins',
    CHILD,
    { out: true },
    '[Cổ vật từ Ruins] Đội thám hiểm của khu trại vừa đào được một khối máy móc kỳ dị từ sâu trong phế tích Ruins. Dù không ai hiểu nổi công năng ma thuật của nó, một tay buôn lậu giàu có từ The City đã đến tận nơi trả ngay cả trăm đồng Ahn sáng choang.',
    '[Ruins Machinery Cache] The camp scavengers hauled a bizarre mechanical artifact out from deep beneath the Ruins. Though no one understood its incomprehensible functions, a visiting City smuggler paid a hundred crisp Ahn on the spot.',
    { wealth: 2 }
  ),
  D(
    'c_out_stories',
    CHILD,
    { out: true },
    '[Truyền thuyết 26 District] Ngồi quây quần bên đống lửa sưởi đêm, một ông lão lưu vong kể về cuộc sống xa hoa bên trong 26 District của The City. Ông trầm giọng bảo rằng ở nơi đó người ta không phải lo chết đói, nhưng từng giây từng phút đều phải sống trong nỗi sợ hãi tột cùng.',
    '[Tales of 26 Districts] Huddled around the night fire, an exiled elder recounted life inside the City’s 26 Districts. He sighed that folks in the City rarely starve to death, yet every breath is spent in ceaseless, suffocating dread.',
    { sanity: 1 }
  ),
  D(
    'c_any_book',
    CHILD,
    {},
    '[Trang sách rách Lobotomy Corp] Bạn tình cờ nhặt được một cuốn tài liệu nghiên cứu cũ kỹ về tập đoàn sụp đổ Lobotomy Corporation. Dù hơn nửa cuốn sách đã bị xé rách và cháy xém, bạn vẫn say mê đọc đi đọc lại những trang còn sót lại đến ba lần.',
    '[Tattered Lobotomy Dossier] You found a waterlogged research booklet regarding the fallen Lobotomy Corporation. Though half the pages were torn and charred, you eagerly devoured every surviving schematic three times over.',
    { sanity: 1, resonance: 2 }
  ),
  D(
    'c_any_tooth',
    CHILD,
    {},
    '[Chiếc răng sữa cuối cùng] Bạn tự tay nhổ chiếc răng sữa cuối cùng của mình khi nó lung lay trong bữa cơm chiều. Trong thế giới khắc nghiệt của The City, cha mẹ bạn đã chẳng còn thời gian hay tâm trí để bịa ra những câu chuyện cổ tích về nàng tiên răng.',
    '[The Last Baby Tooth] You pulled out your final loose baby tooth during a frugal evening meal. In the unforgiving reality of the City, parents had neither the time nor the heart to indulge in comforting fairy tales.',
    { health: 1 }
  ),

  // ------------------------------------------------------------------ teen (12–17)
  D(
    't_nest_exam',
    TEEN,
    { nest: true },
    '[Kỳ thi tuyển thực tập sinh Wing] Bạn thức trắng đêm vùi đầu vào đống tài liệu chuẩn bị cho kỳ thi tuyển dụng thực tập sinh Wing cho tới tận 2 giờ sáng. Ở bên trong bức tường Nest, 2 giờ sáng vẫn là khoảng thời gian an toàn hiếm hoi để con người được phép thức.',
    '[Wing Internship Exam Drill] You crammed corporate manuals until 2:00 AM preparing for the fierce Wing junior internship examinations. Within the sheltered walls of the Nest, 2:00 AM was still considered a safe hour to remain awake.',
    { network: 2, sanity: -2 }
  ),
  D(
    't_nest_party',
    TEEN,
    { nest: true },
    '[Dạ tiệc trưởng phòng Nest] Bạn được tham dự buổi tiệc sinh nhật xa hoa tổ chức cho con của một vị trưởng phòng quyền lực trong Nest. Bạn học được bài học đắt giá rằng ở nơi thượng lưu này, mọi người đều mỉm cười lịch thiệp nhất khi thốt ra những lời độc địa và tàn nhẫn nhất.',
    '[Nest Executive Reception] You attended an extravagant birthday reception held for a department director’s heir. You learned that here in high society, everyone flashes their most dazzling smile while whispering the cruelest betrayals.',
    { network: 3, sanity: -1 }
  ),
  D(
    't_nest_backstreet_trip',
    TEEN,
    { nest: true },
    '[Chuyến mạo hiểm ra Backstreets] Bạn liều lĩnh cùng nhóm bạn cùng lớp lẻn qua trạm kiểm soát để "mục sở thị" đời sống Backstreets ngoài Nest. Cả nhóm hoảng loạn chạy tháo thân trở về trước nửa đêm sau khi nhìn thấy một vụ thanh toán đẫm máu, im lặng suốt cả quãng đường.',
    '[Forbidden Backstreet Excursion] You and a few daring classmates snuck past the checkpoint perimeter to gawk at the Backstreets firsthand. The group fled back before midnight after witnessing a gruesome syndicate assassination, terrified and dead silent.',
    { sanity: -2, rep: 1 }
  ),
  D(
    't_back_workshop',
    [18, 25],
    { back: true, jobs: ['Workshop Craftsman'] },
    '[Thợ phụ Workshop mài đao] Bạn làm thợ phụ việc tại một xưởng vũ khí Workshop nhỏ, nhận mài bén những lưỡi trường đao cho các Fixer Grade 8. Một tay kiếm sĩ hài lòng vì độ bén ngọt của lưỡi kiếm đã hào phóng thưởng thêm cho bạn cả chục đồng Ahn tiền boa.',
    '[Workshop Blade Grinding] You worked as an apprentice at a humble weapon Workshop, honing edges for Grade 8 Fixers. An experienced duelist was so impressed with your meticulous grinding that he tossed you a generous ten-Ahn tip.',
    { wealth: 3, network: 1 }
  ),
  D(
    't_back_fight',
    TEEN,
    { back: true },
    '[Trận huyết chiến đầu ngõ] Bạn lao vào ẩu đả kịch liệt với đám thiếu niên du côn hẻm bên để bảo vệ sạp bán hàng rong của mẹ khỏi bị đập phá. Bạn giành chiến thắng và giữ được chỗ làm ăn, đổi lại là một chiếc răng cửa bị gãy cùng nhiều vết bầm tím trên mặt.',
    '[Street Turf Scuffle] You threw yourself into a savage brawl with rival alley youths to defend your mother’s vendor cart. You emerged victorious and protected the stall, at the cost of a fractured front tooth and bruised ribs.',
    { health: -3, rep: 2 }
  ),
  D(
    't_back_index',
    TEEN,
    { back: true },
    '[Mảnh giấy chỉ thị bí ẩn] Một người lạ mặt trùm kín áo choàng dúi nhanh vào tay bạn một mẩu giấy gấp tư rồi biến mất vào dòng người. Trên mảnh giấy nắn nót dòng chữ Prescript: "Tuyệt đối không được ăn bất cứ thứ gì vào thứ Ba." Bạn sợ hãi tuân theo răm rắp.',
    '[The Cryptic Prescript Slip] A cloaked stranger thrust a folded parchment slip into your hands before vanishing into the crowd. In flawless calligraphy it read: “Do not consume any sustenance this Tuesday.” Trembling with fear, you complied.',
    { health: -1, resonance: 3 }
  ),
  D(
    't_back_funeral',
    TEEN,
    { back: true },
    '[Đám tang thứ tư trong năm] Con ngõ nhỏ lại cử hành đám tang thứ tư chỉ trong vòng nửa năm qua. Bạn đã thôi bận tâm đếm xem có bao nhiêu người vừa ngã xuống, mà chỉ còn cay đắng đếm xem gia đình mình phải gom góp bao nhiêu đồng Ahn tiền phúng viếng.',
    '[Fourth Funeral of the Block] The neighborhood held its fourth funeral within six months. You had long stopped counting how many had perished, only tallying how many precious Ahn your family had to scrape together for condolences.',
    { wealth: -2, sanity: -2 }
  ),
  D(
    't_back_friend_dream',
    TEEN,
    { back: true, npc: 'friend' },
    '[Giấc mơ Nest] {friend} muốn làm Fixer, dành tiền đưa cả nhà vào Nest. Hai người ngồi trên mái tôn tính số năm phải làm việc. Khi ra con số, {friend} gấp tờ giấy lại.',
    '[Rooftop Nest Ambition] {friend} confided their dream of becoming a renowned Fixer to buy a permanent residence visa into a Nest. Sitting on the tin roof calculating the required centuries of work, the astronomical sum made you both laugh in bitter irony.',
    { sanity: 3 },
    { bond: { friend: 5 } }
  ),
  D(
    't_out_wall_try',
    TEEN,
    { out: true },
    '[Vượt tường The City] Hai thanh niên liều mạng trong trại Outskirts tìm cách đu dây trèo qua bức tường rào gai để đột nhập vào The City. Sáng hôm sau, người ta nhìn thấy một thi thể bị treo ngược đung đưa trên hàng rào dây thép gai xung điện.',
    '[The Perimeter Wall Attempt] Two desperate youths from the Outskirts camp tried scaling the barbed perimeter barrier into the City. Come morning, scouts spotted a corpse dangling upside down from the high-voltage razor wire.',
    { sanity: -3 }
  ),
  D(
    't_any_crush',
    TEEN,
    {},
    '[Mối tình đầu dang dở] Bạn thầm thương trộm nhớ một người bạn cùng lứa nhưng chưa từng dám mở lời thổ lộ tâm tư. Mùa thu năm ấy, gia đình người đó đột ngột thu dọn đồ đạc chuyển đi biệt tích sang một District khác mà không kịp nói lời từ biệt.',
    '[Unspoken Adolescence] You harbored tender feelings for a companion across the alley but never summoned the courage to speak up. That autumn, their family abruptly packed their belongings and migrated to another District without farewell.',
    { sanity: -1 }
  ),
  D(
    't_any_growth',
    TEEN,
    {},
    '[Tuổi dậy thì thiếu thốn] Cơ thể bạn cao vọt lên nhanh chóng chỉ trong vòng một mùa hè khiến chân tay dài ngoằng. Những bộ quần áo vải thô cũ kỹ đều ngắn cũn cỡn và rách bục chỉ, trong khi ví tiền của gia đình chẳng còn lấy một đồng dư dả để sắm đồ mới.',
    '[Growth Spurt in Scarcity] Your limbs stretched rapidly over a single summer, shooting past your old dimensions. Faded canvas shirts split at the seams and trousers hovered above ankles, with not a spare Ahn in the purse for new clothes.',
    { health: 2, wealth: -1 }
  ),

  // ------------------------------------------------------------------ adult general
  D(
    'a_any_rent',
    GROWN,
    { notNest: true },
    '[Chủ trọ tăng giá] Lão chủ nhà trọ mặt sắt tuyên bố tăng thêm 10% tiền thuê nhà hàng tháng. Lão lạnh lùng bảo rằng giá cả của sự an toàn trong khu này đang leo thang, nhưng lão tuyệt nhiên không hé răng giải thích là an toàn trước mối đe dọa nào.',
    '[Rent Surcharge] The callous landlord levied an immediate ten percent hike on monthly room rent. He bluntly announced that the cost of maintaining safety on the block was rising, conveniently avoiding what threat they were being shielded from.',
    { wealth: -3 }
  ),
  D(
    'a_any_noodle',
    GROWN,
    { notNest: true },
    '[Quán mì đóng cửa] Quán mì quen thuộc đầu góc phố nơi bạn thường ghé ăn mỗi tối bỗng đóng chặt cửa sắt cài then. Người ta rỉ tai nhau rằng ông chủ quán đã trót vay nợ nặng lãi của The Middle; bạn khôn ngoan im lặng và không hỏi thêm bất cứ điều gì.',
    '[The Shuttered Noodle Stand] The corner noodle counter you frequented shut its iron shutters permanently. Word on the pavement was that the owner defaulted on debts to the Middle; you wisely kept your head down and asked no questions.',
    { sanity: -1 }
  ),
  D(
    'a_any_insomnia',
    GROWN,
    {},
    '[Ám ảnh giờ cấm 3:10] Bạn mắc chứng mất ngủ kinh niên kéo dài suốt cả tháng ròng giữa căn phòng lạnh lẽo. Mỗi khi vừa chập mắt, trong đầu bạn lại văng vẳng tiếng tích tắc của đồng hồ đếm ngược từng giây về khoảnh khắc 3 giờ 10 nguy hiểm.',
    '[Insomnia of 3:10 AM] Chronic sleeplessness tormented your mind for a grueling month in the drafty room. Every time your eyelids closed, an imaginary clock echoed in your skull, ticking relentlessly toward the dreaded hour of 3:10 AM.',
    { sanity: -3, health: -1 }
  ),
  D(
    'a_any_drink',
    GROWN,
    {},
    '[Chén rượu quán Bistro] Bạn ngồi nhâm nhi thứ rượu cồn cay nồng ở một quán Bistro nhỏ nơi góc hẻm Backstreets tới tận khuya. Gã pha chế vừa lau chiếc ly sứt vừa kể những câu chuyện tiếu lâm thô tục, tuyệt đối không bao giờ tò mò hỏi danh tính của bất cứ vị khách nào.',
    '[Midnight Bistro Pour] You nursed potent, bitter spirits at a dingy backstreet bistro until the small hours. The barkeep scrubbed chipped glasses while cracking filthy jokes, never once asking for any patron’s real name.',
    { sanity: 3, wealth: -2 }
  ),
  D(
    'a_any_ampoule',
    GROWN,
    {},
    '[Ống huyết thanh K Corp nhái] Bạn liều lĩnh mua một ống tiêm huyết thanh phục hồi K Corp trôi nổi ở chợ đen để chữa lành vết thương hở. Vết thương khép miệng thần tốc, nhưng chỉ ba ngày sau bạn kinh hãi nhận ra trên ngón tay mình bắt đầu mọc thêm một chiếc móng vuốt kỳ dị.',
    '[Counterfeit K Corp Ampoule] You gambled on a bootleg K Corp HP restorative ampoule bought off a street peddler to heal a deep laceration. The flesh knit together overnight, but three days later a grotesque extra fingernail sprouted on your knuckle.',
    { health: 5, wealth: -3, resonance: 2 }
  ),
  D(
    'a_any_news',
    GROWN,
    {},
    '[Bản tin Urban Plague] Bản tin truyền thanh chấn động thông báo một hiện tượng Distortion vừa bùng phát dữ dội tại District lân cận. Hiệp hội Hana chính thức xếp nó vào cấp độ Urban Plague; suốt cả tuần lễ sau đó không một ai trong khu dám ngủ say.',
    '[Urban Plague Broadcast] Emergency broadcasts announced that a terrifying Distortion manifestation erupted across the adjoining District. Hana Association promptly classified it as an Urban Plague; nobody on your block rested easily for weeks.',
    { sanity: -2 }
  ),
  D(
    'a_any_warp',
    GROWN,
    {},
    '[Chuyến tàu WARP mười giây] Bạn gom góp tiền mua vé trải nghiệm chuyến tàu WARP Train đi công tác sang District khác lần đầu tiên. Chuyến đi chỉ kéo dài đúng mười giây thực tại; người hành khách ngồi cạnh bạn cứ trừng trừng nhìn vào hư vô suốt hành trình rồi lặng lẽ bước xuống tàu.',
    '[Ten-Second WARP Ride] You spent a hefty fare to ride the WARP Train across the megacity for the very first time. The journey took a mere ten seconds of perceived reality; the passenger beside you stared blankly into the void, disembarking without a sound.',
    { wealth: -2, sanity: -1 }
  ),
  D(
    'a_any_market',
    GROWN,
    { notNest: true },
    '[Thịt tổng hợp hẻm tối] Khu chợ đen họp đêm sau con ngõ hẹp bày bán những tảng thịt "tổng hợp" với giá rẻ mạt một cách bất thường. Bạn cắn răng mua một tảng về nấu nướng, và tự dặn lòng tốt nhất là đừng bao giờ suy nghĩ xem nguồn gốc thực sự của miếng thịt ấy là gì.',
    '[Suspicious Alley Meat] The midnight bazaar in the rear alleys offered slabs of “synthetic meat” at absurdly discounted rates. You purchased a portion to fill your belly, deliberately resolving never to contemplate what species it was harvested from.',
    { health: 2, wealth: 1, sanity: -1 }
  ),
  D(
    'a_any_lucky',
    GROWN,
    {},
    '[Chiếc ví rơi trên sân ga] Bạn tình cờ nhặt được một chiếc ví da rơi trên sân ga tàu điện ngầm. Bên trong có 20 đồng Ahn và tấm ảnh chụp một đứa trẻ đang cười tươi; bạn giữ lấy tiền và vứt tấm ảnh đi, hoặc có lẽ là ngược lại, chính bạn cũng không còn nhớ rõ.',
    '[Wallet on the Platform] You discovered an abandoned leather wallet upon the train platform. Inside were twenty crisp Ahn and a portrait of a smiling infant; you pocketed the currency and tossed the photo, or perhaps vice versa—you no longer recall.',
    { wealth: 4 }
  ),
  D(
    'a_any_library_rumor',
    ADULT,
    {},
    '[Lời đồn về Thư Viện] Dân cư kháo nhau về một tòa Thư Viện bí ẩn mọc lên sừng sững chỉ sau một đêm tại District 23. Người ta rỉ tai nhau rằng bất kỳ kẻ nào nhận được bức thư mời màu đen của Thư Viện ấy đều sẽ một đi không bao giờ trở lại.',
    '[Rumors of the Library] Whispers spread like wildfire regarding a monolithic Library that materialized overnight in District 23. Word was that anyone who received its black invitation letter walked through its doors and never returned to the living.',
    { resonance: 2, sanity: -1 }
  ),
  D(
    'a_any_sick',
    GROWN,
    {},
    '[Một tuần nằm liệt giường] Bạn bị một trận cúm nặng quật ngã, nằm sốt mê man liệt giường suốt cả tuần lễ trong căn phòng ẩm mốc. Tuy không có một ai đến thăm hỏi thuốc thang, nhưng cũng may mắn là không có kẻ nào xông vào cướp bóc; giữa The City này, thế đã là đại phúc.',
    '[Bedridden with Sickness] A virulent strain of fever incapacitated you for seven solitary days in your damp room. While not a single soul came to offer aid, no marauders broke in to pillage either; in this City, that alone counted as a blessing.',
    { health: -3 }
  ),
  D(
    'a_any_rooftop',
    GROWN,
    {},
    '[Đêm trên mái ngắm Nest] Có những đêm mệt mỏi, bạn một mình leo lên đỉnh mái nhà nhìn về phía những tòa tháp chọc trời rực rỡ ánh đèn của Nest xa xa. Đứng giữa làn gió lạnh, bạn bất giác tự hỏi nếu sinh ra ở bên trong bức tường ấy thì cuộc đời mình sẽ ra sao.',
    '[Rooftop Gazing at the Nest] On exhausted evenings, you climbed onto the corrugated roof alone, watching the gleaming spires of the distant Nest. Standing in the chilly breeze, you wondered what kind of human you might have become had you been born within those walls.',
    { sanity: 2 }
  ),
  D(
    'a_any_neighbor_dead',
    GROWN,
    { notNest: true },
    '[Mùi tử khí nơi cầu thang] Người hàng xóm độc thân ở căn phòng tầng trên không hề bước chân ra khỏi cửa suốt ba ngày liền. Đến khi mùi hôi thối nồng nặc bắt đầu bốc xuống tận chân cầu thang, bạn buộc phải bỏ tiền túi gọi một văn phòng Fixer chuyên xử lý dọn dẹp thi thể tới.',
    '[Stairwell Decomposition] The reclusive tenant upstairs hadn’t stepped outside their door for three full days. When an unbearable stench drifted down the stairwell, you were forced to chip in coins to hire a cleanup Fixer to clear the remains.',
    { sanity: -3, wealth: -1 }
  ),

  // ------------------------------------------------------------------ jobs
  D(
    'j_fx_cat',
    GROWN,
    { jobs: ['Fixer'], grade: [9, 7] },
    '[Ủy thác tìm mèo District 11] Bạn nhận một bản hợp đồng ủy thác đơn giản: tìm kiếm chú mèo cưng thất lạc cho một quý bà ở District 11. Sau nửa ngày lùng sục, bạn tìm thấy nó nằm bất động trong mõm một con chó săn khổng lồ; bạn quay về và nói dối thân chủ rằng con mèo đã chạy trốn.',
    '[Lost Feline Request] You took on a mundane contract: track down an elderly lady’s lost tabby in District 11. After hours of searching, you found its remains clamped in the jaws of a feral hound; you pocketed the fee and lied to the weeping client.',
    { wealth: 2, merit: 2, sanity: -1 }
  ),
  D(
    'j_fx_training',
    GROWN,
    { jobs: ['Fixer'] },
    '[Khổ luyện phòng tập Office] Bạn lao vào khổ luyện điên cuồng với những bao cát bọc thép trong phòng huấn luyện của Văn phòng cho tới khi khớp ngón tay toét máu. Sáng hôm sau khi rút kiếm khỏi vỏ bước vào thực chiến, bàn tay cầm chuôi kiếm của bạn đã không còn chút run rẩy.',
    '[Office Sparring Drills] You relentlessly hammered reinforced sandbags in the Office training hall until your raw knuckles dripped blood. Come morning when you drew your blade for real combat, your sword hand didn’t tremble in the slightest.',
    { health: 2, merit: 3 }
  ),
  D(
    'j_fx_unpaid',
    GROWN,
    { jobs: ['Fixer'] },
    '[Thân chủ quỵt tiền thù lao] Tên thân chủ thuê bạn hoàn thành một phi vụ nguy hiểm đã nhanh chân bỏ trốn quỵt sạch tiền công. Bạn nộp đơn khiếu nại lên Hiệp hội Hana để yêu cầu can thiệp; họ lạnh lùng đóng dấu thụ lý và bảo "đang xem xét", ba tháng sau hồ sơ vẫn nằm im dưới đáy tủ.',
    '[Defaulted Contract Commission] The shady patron who commissioned a dangerous assassination vanished into thin air without settling payment. You filed a formal grievance with Hana Association; they stamped it “under review,” where it gathered dust three months later.',
    { wealth: -3, sanity: -1 }
  ),
  D(
    'j_fx_funeral',
    GROWN,
    { jobs: ['Fixer'] },
    '[Quan tài rỗng của đồng đội] Bạn cùng các Fixer trong văn phòng cử hành tang lễ cho một người đồng đội vừa ngã xuống trong phi vụ Urban Myth. Chiếc quan tài gỗ chỉ chứa được một nửa thi thể dập nát, phần còn lại vĩnh viễn không thể tìm thấy trong đống đổ nát.',
    '[Hollow Coffin of a Comrade] You attended the somber memorial for an Office colleague slain during an Urban Myth clash. The pine casket was only half full with retrieved scraps of armor; the remainder of their body was never recovered from the ruins.',
    { sanity: -3, network: 1 }
  ),
  D(
    'j_fx_weapon',
    GROWN,
    { jobs: ['Fixer'] },
    '[Vết mẻ trên lưỡi gươm] Bạn mang thanh kiếm của mình đến Workshop quen thuộc để mài giũa và bảo trì lại sau trận kịch chiến. Ông thợ già nheo mắt soi vết mẻ sâu hoắm trên lưỡi thép và hỏi bạn vừa chém vào thứ quái vật gì; bạn chỉ lặng lẽ lắc đầu không đáp.',
    '[The Notched Edge] You carried your primary blade to an armaments Workshop for urgent re-edging after a lethal skirmish. The master smith inspected the deep notch in the tempered steel, asking what horror you had cleaved; you held your tongue.',
    { wealth: -2, merit: 1 }
  ),
  D(
    'j_fx_partner',
    GROWN,
    { jobs: ['Fixer'], npc: 'partner' },
    '[Băng bó sau huyết chiến] {partner} tỉ mỉ thoa thuốc và quấn băng gạc cầm máu cho bạn sau khi cả hai vừa trầy trật sống sót qua một ủy thác đẫm máu. Hai người ngồi tựa lưng vào tường không nói một lời nào, chỉ lặng lẽ chuyền tay nhau điếu thuốc lá cuối cùng còn sót lại.',
    '[Post-Battle Field Dressing] {partner} quietly stitched and bandaged your gashes after you both barely walked away from a blood-soaked engagement. Neither uttered a word, simply sitting back-to-back sharing the final remaining cigarette.',
    { health: 3, sanity: 2 },
    { bond: { partner: 4 } }
  ),
  D(
    'j_syn_collect',
    GROWN,
    { jobs: ['Syndicate'] },
    '[Thu phí bảo kê băng đảng] Bạn nhận lệnh đi thu tiền bảo kê dọc theo tuyến phố buôn bán của tổ chức Syndicate. Một lão chủ tiệm tạp hóa già quỳ sụp xuống khóc lóc van xin khất nợ; bạn lạnh lùng bẻ gãy hai ngón tay của lão như đúng bài học mà tổ chức đã rèn dạy.',
    '[Protection Fee Collection] You were deployed down the commercial avenue to enforce the syndicate’s protection tribute. An elderly grocer wept and groveled for an extension; you broke two of his fingers without hesitation, exactly as you were drilled.',
    { wealth: 4, sanity: -3, heat: 3 }
  ),
  D(
    'j_syn_tattoo',
    GROWN,
    { jobs: ['Syndicate'] },
    '[Hình xăm ấn ký tổ chức] Bạn được khắc thêm một hình xăm ấn ký mới trên bả vai sau khi hoàn thành các chiến tích cho băng nhóm. Những tay giang hồ kỳ cựu trong tổ chức nhìn vào hình xăm ấy rồi khẽ gật đầu công nhận, như thể nó đã nói thay cho bạn tất cả vị thế và lòng trung thành.',
    '[Syndicate Mark Tattoo] You received a fresh ritual tattoo branded across your shoulder blades to mark your ascent. Veteran enforcers glanced at the ink and gave respectful nods, knowing the insignia spoke louder than any oath of allegiance.',
    { rep: 2, network: 1 }
  ),
  D(
    'j_syn_rival',
    GROWN,
    { jobs: ['Syndicate'] },
    '[Lời chào của băng đối thủ] Một băng đảng đối địch ném thủ cấp đầy máu của một con chó săn ngay trước cửa căn cứ nơi bạn ở. Gã đại ca của bạn cười gằn bảo rằng đó chỉ là một "lời chào hỏi thân mật", nhưng bạn thừa hiểu đó là tối hậu thư báo hiệu một cuộc thanh trừng sắp nổ ra.',
    '[Rival Syndicate Calling Card] A competing gang dumped the severed, bloody head of a hound directly on your front doorstep. Your boss scoffed that it was merely a polite greeting, but you knew bloodshed and warfare were imminent.',
    { sanity: -2, heat: 4 }
  ),
  D(
    'j_wing_overtime',
    GROWN,
    { jobs: ['Wing Employee'] },
    '[Tăng ca 140 giờ Wing] Trong tháng này bạn phải làm việc thêm tổng cộng 140 giờ tăng ca không ngừng nghỉ để kịp tiến độ dự án của Wing. Chiếc thẻ nhân viên gắn chip điện tử ghi nhận chuẩn xác từng giây từng phút lao động cật lực, nhưng bảng lương cuối tháng thì tuyệt nhiên không tăng thêm một xu.',
    '[140 Hours Corporate Overtime] You logged 140 brutal hours of mandatory overtime this month to meet the Wing’s unforgiving production quotas. Your bio-badge recorded every exhausted minute, but your paycheck reflected not a single extra cent.',
    { wealth: 2, sanity: -3, health: -1 }
  ),
  D(
    'j_wing_bonus',
    GROWN,
    { jobs: ['Wing Employee'] },
    '[Tiệc phòng họp không cửa sổ] Bộ phận của bạn xuất sắc đạt chỉ tiêu doanh số quý do tập đoàn giao phó. Bạn được nhận một khoản tiền thưởng nóng cùng một bữa tiệc liên hoan nhẹ tổ chức vội vã bên trong căn phòng họp ngột ngạt không hề có cửa sổ.',
    '[Windowless Meeting Room Party] Your department hit its quarterly output target. You received a performance bonus and a brief celebratory banquet crammed inside a sterile, windowless corporate conference room.',
    { wealth: 5, network: 2 }
  ),
  D(
    'j_wing_vanish',
    GROWN,
    { jobs: ['Wing Employee'] },
    '[Chiếc bàn làm việc trống] Bàn làm việc của đồng nghiệp ngồi sát cạnh bạn bỗng trống trơn từ sáng thứ Hai mà không một lời giải thích. Đến chiều thứ Tư, toàn bộ tên tuổi và dữ liệu cá nhân của người ấy trên danh bạ nội bộ công ty đều bị xóa sạch như chưa từng tồn tại.',
    '[The Erased Colleague] The cubicle next to yours was suddenly vacated on Monday morning without notice. By Wednesday afternoon, even their name and employment history were thoroughly wiped from the corporate directory.',
    { sanity: -3 }
  ),
  D(
    'j_ws_order',
    GROWN,
    { jobs: ['Workshop Craftsman'] },
    '[Đơn hàng của Fixer Grade 3] Một Fixer danh tiếng Grade 3 trực tiếp tìm đến Workshop đặt rèn một thanh trường đao đặc chế theo bản thiết kế riêng biệt. Bạn thức trắng bốn đêm liền bên lò nhiệt để rèn đúc từng thớ thép sao cho đạt độ cân bằng tuyệt đối.',
    '[Grade 3 Custom Armament] A celebrated Grade 3 Fixer commissioned a specialized greatsword forged to their intricate custom blueprints. You stayed awake four consecutive nights beside the furnace to balance every layer of steel.',
    { wealth: 5, health: -2, rep: 2 }
  ),
  D(
    'j_ws_burn',
    GROWN,
    { jobs: ['Workshop Craftsman'] },
    '[Tai nạn phụt lửa lò rèn] Lò nung nhiệt cao bất ngờ phụt ra một luồng hỏa diệm dữ dội do áp suất quá tải. Bạn bị cháy rụi một bên lông mày và bong tróc một mảng da lớn trên cánh tay, nhưng may mắn là phôi kiếm đang rèn vẫn giữ nguyên được độ tinh khiết.',
    '[Furnace Backfire Flare] The high-heat smelting kiln flared abruptly from high-pressure fuel buildup. The flash fire scorched away your eyebrow and blistered your forearm, but the master blade in the vice remained undamaged.',
    { health: -4, rep: 1 }
  ),
  D(
    'j_ws_tres',
    GROWN,
    { jobs: ['Workshop Craftsman'] },
    '[Thanh tra Tres Association] Đoàn thanh tra trang nghiêm của Hiệp hội Tres đến xưởng tiến hành kiểm định chất lượng các thiết bị cơ khí theo quy chuẩn an toàn. Họ đo đạc tỉ mỉ từng chi tiết rồi đóng một con dấu chứng nhận mà bạn phải cắn răng nộp 6 Ahn mới được nhận.',
    '[Tres Association Inspection] Stern auditors from Tres Association conducted a mandatory safety compliance inspection on all workshop machinery. After rigorous measurements, they stamped an official seal that cost you six Ahn to behold.',
    { wealth: -3, rep: 2 }
  ),

  // ------------------------------------------------------------------ districts
  D(
    'r_t_time',
    [8, 140],
    { regions: ['T'] },
    '[Bán thời gian District 20] Tại District 20 của T Corp, những người nghèo cùng quẫn phải đem bán từng giờ sống trong ngày để trang trải nợ nần. Người hàng xóm của bạn chỉ còn đủ thời gian sống bốn tiếng mỗi ngày, khiến họ trông già nua hơn bạn tới hai mươi tuổi.',
    '[Selling Hours in District 20] In T Corp’s District 20, the destitute sold active hours of their lifespan to settle compound debts. Your neighbor lived only four awake hours a day, aging twenty years faster than normal mortals.',
    { sanity: -2 }
  ),
  D(
    'r_t_clock',
    GROWN,
    { regions: ['T'] },
    '[Thuế Thời Gian T Corp] Tập đoàn T Corp bất ngờ tiến hành thu đợt Thuế Thời Gian sớm hơn lịch trình thường lệ. Một ngày của bạn bị tước đoạt mất ba giờ đồng hồ sinh hoạt; bạn tỉnh dậy với cảm giác hụt hẫng mơ hồ như vừa đánh mất một phần quan trọng trong ký ức.',
    '[T Corp Time Tax Siphon] T Corp levied its mandatory Time Tax ahead of schedule without prior notice. Three full hours were siphoned clean out of your daily existence; you awoke with the unsettling conviction that vital memories had slipped away.',
    { health: -2, wealth: 2 }
  ),
  D(
    'r_w_bistro',
    GROWN,
    { regions: ['W'] },
    '[Món ăn đặc sản District 23] Con phố ẩm thực nức tiếng ở District 23 cho ra mắt một món hầm đặc sản mới với mùi vị thơm lừng đầy mê hoặc. Bảng thực đơn tuyệt nhiên không ghi rõ đó là loại thịt gì; khi bạn tò mò gặng hỏi, tay đầu bếp trưởng chỉ nhoẻn miệng cười bí hiểm.',
    '[District 23 Gastronomy] District 23’s culinary avenue unveiled a savory new stew that smelled intoxicatingly rich. The menu omitted what variety of meat was used; when you pressed for details, the head chef offered only a chilling smirk.',
    { health: 2, sanity: -2 }
  ),
  D(
    'r_w_train',
    [6, 140],
    { regions: ['W'] },
    '[Đoàn tàu WARP lao vút] Bạn đứng trên cầu vượt dõi mắt nhìn đoàn tàu WARP Train rít lên rồi lao vun vút vào đường hầm không gian vô tận. Người ta rỉ tai nhau rằng ở toa hành khách cuối cùng, mười giây thực tại có thể kéo dài đằng đẵng hàng ngàn năm tra tấn.',
    '[WARP Transit Plunge] Standing upon the transit overpass, you watched the WARP Train scream as it hurled into the dimensional tunnel. People whispered that in the rear carriages, ten seconds of reality stretched into thousands of years of eternity.',
    { resonance: 1 }
  ),
  D(
    'r_u_lake',
    [6, 140],
    { regions: ['U'] },
    '[Mặt hồ Đại Hồ phẳng lặng] Vùng biển hồ The Great Lake ở District U hôm nay phẳng lặng như một tấm gương soi khổng lồ không một gợn sóng. Những ngư dân dạn dày kinh nghiệm thì thào với nhau rằng những ngày hồ yên ả đến rợn người như thế này chính là lúc Cá Voi đang lắng nghe.',
    '[The Still Great Lake] The Great Lake of District U was eerie and glass-smooth today without a solitary ripple. Seasoned mariners whispered among themselves that such absolute stillness signaled that the Great Whale was listening.',
    { sanity: 1, resonance: 2 }
  ),
  D(
    'r_u_rules',
    GROWN,
    { regions: ['U'] },
    '[Quy tắc mặt hồ U Corp] Bạn buộc phải học thuộc lòng thêm hai điều luật hàng hải mới do U Corp ban hành áp dụng cho việc di chuyển trên mặt hồ. Một trong số những quy tắc tối thượng đó là: "Tuyệt đối không được phép trả lời nếu mặt nước cất tiếng gọi tên bạn."',
    '[U Corp Nautical Taboos] You were compelled to memorize two newly codified nautical laws issued by U Corp for traversing the waters. The paramount rule among them warned: “Under no circumstances answer if the deep water speaks your name.”',
    { sanity: -1, network: 1 }
  ),
  D(
    'r_k_ampoule',
    [6, 140],
    { regions: ['K'] },
    '[Ống tiêm K Corp] Ở District 11, người ta mang theo huyết thanh K Corp như mang chìa khóa. Một người tiêm thuốc ngay trước mặt bạn; vết thương khép lại. Không ai trong hàng chờ hỏi dịch xanh ấy lấy từ đâu.',
    '[District 11 Green Vials] In District 11, nearly every citizen carried a spare K Corp HP ampoule in their coat pocket. People injected the luminescent green fluid as casually as drinking water, never daring to question what horrific source K Corp distilled it from.',
    { health: 3 }
  ),
  D(
    'r_h_restructure',
    [6, 140],
    { regions: ['H'] },
    '[Ngày tái cấu trúc District 8] Ngày hội Tái cấu trúc đô thị diễn ra ở District 8: toàn bộ các khối nhà và đường phố tự động trượt dịch chuyển rầm rộ trong đêm tối. Sáng hôm sau tỉnh dậy bước ra cửa, bạn bàng hoàng nhận ra căn nhà trọ của mình đã bị đẩy cách xa chợ thêm bốn con phố.',
    '[District 8 Restructuring Day] Restructuring Day arrived in District 8: whole blocks of tenements mechanically shifted across the subterranean rail grid overnight. Stepping outside at dawn, you found your rented room displaced four avenues further from the central market.',
    { sanity: -1, wealth: -1 }
  ),
  D(
    'r_l_fog',
    [6, 140],
    { regions: ['L'] },
    '[Màn sương tàn tích L Corp] Màn sương khói dày đặc rỉ ra từ tàn tích của tập đoàn sụp đổ L Corp tràn ngập khắp các ngả đường xung quanh. Hai thế lực Thumb và Index đã giao tranh ác liệt ở khu vực này suốt ba tháng nay; đêm nào tiếng đạn pháo và tiếng la hét cũng rền rĩ không ngớt.',
    '[L Corp Ruin Mists] Choking chemical mists leaked continuously from the ruins of old L Corp, blanketing surrounding avenues. The Thumb and the Index have waged bloody warfare over this sector for three months; every midnight echoes with gunshots and dying screams.',
    { sanity: -3, heat: 1 }
  ),
  D(
    'r_j_casino',
    GROWN,
    { regions: ['J'] },
    '[Sòng bạc District 10] Bạn ghé vào đặt cược 5 đồng Ahn tại một sòng bạc ngầm ở District 10 và thua sạch. Bạn cay cú rút thêm 5 Ahn nữa đặt tiếp nhưng lại trắng tay; bạn ngậm ngùi rời khỏi sòng bạc khi trong túi chỉ vừa vặn đủ tiền mua chiếc vé tàu trở về nhà.',
    '[District 10 Gambling Den] You wagered five Ahn at a back-alley gambling house in District 10 and lost it in seconds. Frustrated, you doubled down with another five and lost again; you walked out into the rain with just enough coin for the return train fare.',
    { wealth: -4, sanity: -1 }
  ),
  D(
    'r_n_nails',
    GROWN,
    { regions: ['N'] },
    '[Đoàn thanh trừng N Corp] Một đoàn giáo sĩ cuồng tín mặc áo choàng trắng của N Corp rầm rộ diễu hành dọc con phố, tay lăm lăm đinh tán và búa lớn để lùng sục những ai mang chi giả cơ khí. Bạn vội vã giấu đôi bàn tay vào sâu trong vạt áo măng tô và nép sát vào tường.',
    '[N Corp Inquisitorial Procession] A grim procession of white-robed N Corp zealots marched down the avenue brandishing heavy hammers and nails, hunting anyone with mechanical prosthetics. You instinctively buried your hands inside your coat pockets and hugged the shadows.',
    { sanity: -2 }
  ),
  D(
    'r_r_clone',
    GROWN,
    { regions: ['R'] },
    '[Người lính R Corp trùng sinh] Bạn tình cờ chạm mặt một người lính tinh nhuệ của R Corp mà bạn biết chắc chắn đã tử trận trong vụ thanh toán tuần trước. Người đó mang cùng khuôn mặt, cùng vết sẹo trên trán, nhưng ánh mắt nhìn bạn lạnh lùng xa lạ như một cỗ máy vô hồn.',
    '[The Reborn R Corp Mercenary] You crossed paths with an R Corp trooper whom you had seen perish in a brutal firefight just last week. Same facial features, same jagged scar, yet his cold eyes passed over you without the slightest flicker of recognition.',
    { sanity: -3, resonance: 2 }
  ),
  D(
    'r_m_moon',
    [6, 140],
    { regions: ['M'] },
    '[Viên đá Mặt Trăng M Corp] Mẹ bạn dành dụm tiền mua cho bạn một viên đá Moonstone phát quang của tập đoàn M Corp để đeo trước ngực. Đêm hôm đó, dưới làn ánh sáng dịu mát của viên đá, bạn đã có được một giấc ngủ êm đềm sâu lắng đầu tiên sau nhiều tháng ác mộng.',
    '[M Corp Moonstone Amulet] Mother saved her earnings to purchase an iridescent M Corp Moonstone pendant for you to wear. That evening beneath its tranquil luminescence, you enjoyed your first deep, unbroken sleep in months.',
    { sanity: 4, wealth: -2 }
  ),
  D(
    'r_out_beast',
    [6, 140],
    { out: true },
    '[Quái thú sa mạc tấn công] Một con quái thú khổng lồ biến dị từ vùng hoang mạc gầm rú tấn công dữ dội vào khu trại Outskirts vào lúc rạng sáng. Bảy người bảo vệ đã ngã xuống trước khi hạ gục được nó; thịt của con thú sau đó đã nuôi sống cả khu trại vượt qua hai tuần đói kém.',
    '[Outskirts Behemoth Assault] A colossal mutated beast burst from the dunes, assaulting the perimeter of the Outskirts camp at dawn. Seven defenders perished bringing it down; its harvested meat sustained the entire settlement through two lean weeks.',
    { health: 2, sanity: -3 }
  ),

  // ------------------------------------------------------------------ midlife / old age
  D(
    'm_any_back',
    MID,
    {},
    '[Cơn đau lưng buổi sáng] Cứ mỗi sớm thức dậy, sống lưng bạn lại nhức nhối buốt nhói như có kim châm sau bao năm tháng bươn chải. Lão thầy thuốc ở phòng khám chui nơi hẻm tối nhếch mép bảo rằng đó chính là cái giá tất yếu của việc sống sót quá lâu giữa The City.',
    '[Morning Back Spasms] Every dawn, sharp aches stabbed through your spine from decades of grueling survival. A cynical back-alley physician chuckled that chronic pain was simply the unavoidable fee for surviving so long in the City.',
    { health: -2 }
  ),
  D(
    'm_any_young',
    MID,
    {},
    '[Tiếng gọi người già] Bạn chợt giật mình nhận ra những đứa trẻ con chạy nhảy đầu hẻm giờ đây đã bắt đầu cất tiếng gọi bạn là "ông/bà già". Bạn bàng hoàng tự hỏi bản thân đã già nua đi từ khoảnh khắc nào giữa dòng đời xô bồ cuồng loạn này.',
    '[The “Old Timer” Title] You suddenly realized the alley youths now casually addressed you as “old timer.” You paused in the street, bewildered as to when youth had slipped away amidst the relentless grind of survival.',
    { sanity: -1, rep: 1 }
  ),
  D(
    'm_any_photo',
    MID,
    {},
    '[Tấm ảnh tuổi mười tám] Bạn lục tìm thấy một bức ảnh ố vàng chụp chính bản thân mình vào năm tròn 18 tuổi trong đáy hòm cũ. Đôi mắt trong bức ảnh sáng ngời và tràn đầy nhiệt huyết, tựa như ánh mắt của một kẻ xa lạ nào đó từng dám mơ mộng và hy vọng giữa thế giới tàn khốc.',
    '[Photograph at Eighteen] You unearthed a faded photograph of yourself at age eighteen hidden in an old chest. The gaze captured in the print was vibrant with hope—the look of an absolute stranger who once dared to believe in a future.',
    { sanity: 1, resonance: 1 }
  ),
  D(
    'o_any_tea',
    OLD,
    {},
    '[Tách trà chiều trên hiên] Bạn ngồi lặng lẽ nhấp từng ngụm trà nóng trên bậc hiên nhà mỗi buổi chiều tà khi ánh hoàng hôn buông xuống. The City ngoài kia vẫn náo động, tàn nhẫn và xô bồ như nó vẫn luôn thế suốt trăm năm qua; duy chỉ có bước chân bạn là đã chậm lại.',
    '[Twilight Porch Tea] You sit quietly sipping hot tea upon your front porch as the murky twilight descends. The City outside remains as violent, deafening, and relentless as it was a century ago; only your own pace has slowed.',
    { sanity: 3 }
  ),
  D(
    'o_any_names',
    OLD,
    {},
    '[Bản danh sách người đã khuất] Bạn ngồi trầm ngâm nhẩm đếm lại tên những người bạn bè và người thân quen đã ngã xuống trong suốt cuộc đời mình. Bạn nhận ra bản danh sách những người đã chết giờ đây đã dài hơn rất nhiều so với số ít ỏi những người còn đang sống sót.',
    '[Roster of the Departed] You sat counting the names of companions, mentors, and rivals who had fallen across the years. You realized with a heavy sigh that the roster of the dead was now far longer than the living.',
    { sanity: -2 }
  ),
  D(
    'o_any_hands',
    OLD,
    {},
    '[Đôi bàn tay run rẩy] Đôi bàn tay gầy guộc đầy sẹo của bạn bắt đầu run rẩy run bần bật mỗi khi nâng cốc nước uống. Bạn nhìn chăm chú vào những khớp ngón tay ấy, nhớ lại rằng trong những năm tháng xưa cũ, chính đôi tay này đã từng gây ra những tội lỗi mà giờ đây bạn không bao giờ muốn nhớ lại nữa.',
    '[Trembling Scarred Hands] Your scarred hands trembled slightly as you lifted a cup to your lips. Staring at those weathered knuckles, you remembered that decades ago, these very fingers committed deeds you would give anything to forget.',
    { health: -2, sanity: -1 }
  )
];

export default LIFE_DAILIES;
