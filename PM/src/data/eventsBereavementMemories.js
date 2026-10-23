/**
 * Project Moon - Bereavement, Mourning & Memory Events
 * Triggers specifically when an NPC has fallen (deceased: true / Widowed),
 * replacing bugged ghost events with poignant, dark narrative depth.
 */

export const BEREAVEMENT_EVENTS = [
  {
    id: 'mourn_fallen_spouse_anniversary',
    age: [25, 80],
    major: true,
    weight: 60,
    requires: ['Widowed'],
    forbids: ['Distorted'],
    vi: '[Một năm sau ngày {spouse} ra đi] Căn nhà lạnh ngắt không một tiếng động. Trên bàn vẫn còn chiếc tách uống trà sứt mẻ của {spouse}. Bên ngoài, mưa axit The City đều đặn gõ vào ô cửa kính như nhịp đếm của tử thần.',
    en: '[A Year Since {spouse} Fell] The apartment sits frozen in dead silence. On the table rests {spouse}’s chipped tea cup. Outside, acidic city rain taps monotonously against the pane like death’s own metronome.',
    choices: [
      {
        labelVi: 'Đặt một cành hoa nhân tạo lên mộ và thề sẽ sống tiếp',
        labelEn: 'Place an artificial blossom at the grave and vow to survive',
        resultVi: 'Bạn siết chặt nắm tay. Nỗi đau không làm bạn gục ngã mà biến thành ý chí sắt đá để tiếp tục sinh tồn giữa The City.',
        resultEn: 'You clenched your fists. Grief did not break you; it forged an iron resolve to endure the City’s merciless crucible.',
        effects: { sanity: +18, resonance: +15 },
        scarsAdd: ['Nén nhang bên ô cửa']
      },
      {
        labelVi: 'Tìm đến quán rượu ở Backstreets uống say mèm để quên đi',
        labelEn: 'Drown your sorrow in a cheap Backstreet tavern',
        resultVi: 'Chất cồn rẻ tiền đốt cháy cổ họng. Trong cơn say, bạn dường như lại nghe thấy tiếng bước chân quen thuộc trở về...',
        resultEn: 'Cheap synthetic liquor burned your throat. In your stupor, you almost heard those familiar footsteps returning home...',
        effects: { health: -8, sanity: +6, wealth: -6 }
      }
    ]
  },
  {
    id: 'avenge_fallen_spouse_intel',
    age: [26, 80],
    major: true,
    weight: 70,
    requires: ['Widowed'],
    forbids: ['spouse_avenged', 'Distorted'],
    vi: '[Manh mối về kẻ thủ ác giết {spouse}] Một gã trung gian của Seven Association gửi tới bạn hồ sơ mật: Địa chỉ ẩn náu của kẻ chủ mưu đã sát hại {spouse} năm xưa. Hắn đang trốn trong một xưởng thuộc da bỏ hoang.',
    en: '[Lead on {spouse}’s Murderer] A Seven Association informant slips you a classified dossier: The hideout of the syndicate butcher who slaughtered {spouse}. He hovers inside an abandoned tannery.',
    choices: [
      {
        labelVi: 'Rút vũ khí, một mình đột kích xưởng thuộc da để đòi máu',
        labelEn: 'Draw steel and storm the tannery alone for retribution',
        resultVi: 'Đêm ấy, không một kẻ nào trong xưởng thuộc da nhìn thấy ánh mặt trời. Bạn chém gục kẻ thù, đứng lặng giữa vũng máu và khẽ thì thầm: "{spouse}, tôi đã trả thù cho em rồi."',
        resultEn: 'That night, none inside the tannery saw another sunrise. Cleaving down your foe, you stood amidst the crimson pooling: "{spouse}, you are avenged."',
        flagsAdd: ['spouse_avenged'],
        meritAdd: 28,
        effects: { health: -20, sanity: +25, rep: +30, heat: +20 }
      }
    ]
  },
  {
    id: 'mourn_fallen_partner_legacy',
    age: [22, 75],
    major: true,
    weight: 45,
    requires: [],
    forbids: ['Distorted'],
    need: { mem: 'lost_partner' },
    vi: '[Di vật của {partner}] Dọn dẹp lại ngăn tủ đồ cũ, bạn tìm thấy chiếc bao kiếm cũ mòn mà {partner} từng dùng khi hai người còn là những kẻ non nớt mới bước chân vào nghề.',
    en: "[{partner}’s Things] Clearing out an old locker, you find the worn scabbard {partner} used when you were both green and new to the work.",
    choices: [
      {
        labelVi: 'Gia cố chiếc bao kiếm và đeo nó bên mình như một lời nhắc nhở',
        labelEn: "Reinforce the scabbard and wear it as a reminder",
        resultVi: "Mỗi lần rút kiếm, bạn gần như cảm thấy bàn tay {partner} vỗ lên vai. Tay bạn vững hơn.",
        resultEn: "Each time you draw the blade you almost feel {partner}’s hand on your shoulder. Your own hand steadies.",
        effects: { sanity: +15, rep: +10 }
      }
    ]
  }
];
