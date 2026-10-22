export const SCAR_CALLBACKS = [
  {
    id: 'scar_survivor_route', age: [12, 140], need: { scarTag: 'survivor' },
    vi: '[Lối thoát cũ] Khi tiếng còi vang lên, bạn nhận ra một lối qua đống đổ nát mà người khác bỏ qua.',
    en: '[An old escape route] When the siren sounds, you spot a way through the rubble that others missed.',
    choices: [
      { vi: 'Dẫn những người mắc kẹt đi theo', en: 'Lead the stranded through', rvi: 'Cả nhóm ra khỏi vùng nguy hiểm. Một người lạ ghi nhớ mặt bạn.', ren: 'The group made it out. A stranger remembered your face.', fx: { health: -3, rep: 4, sanity: 2 } },
      { vi: 'Đi một mình trước khi lối sập', en: 'Leave alone before it collapses', rvi: 'Bạn về đến nơi trú ẩn, nhưng tiếng gọi phía sau vẫn còn.', ren: 'You reached shelter. The calls behind you followed.', fx: { health: 3, sanity: -4 } }
    ],
    ignore: { vi: 'Bạn chờ tiếng còi tắt rồi mới bước ra.', en: 'You waited for the siren to stop.' },
    once: true, tags: ['callback', 'survival'], scarAffinity: 'survivor'
  },
  {
    id: 'scar_injury_clinic', age: [10, 140], need: { scarTag: 'injury', notOut: true },
    vi: '[Bàn khám cuối ca] Một bác sĩ nhận ra vết thương cũ. Ông còn đủ băng và thuốc cho một lượt điều trị.',
    en: '[The last appointment] A doctor recognizes your old injury. There are enough bandages and medicine for one treatment.',
    choices: [
      { vi: 'Trả tiền để chữa (-3 Ahn)', en: 'Pay for treatment (-3 Ahn)', need: { stat: { wealth: [3, 100] } }, rvi: 'Vết thương được làm sạch và bó lại. Ít nhất đêm nay bạn ngủ được.', ren: 'The wound was cleaned and dressed. At least tonight you could sleep.', fx: { wealth: -3, health: 12, sanity: 3 } },
      { vi: 'Xin chỉ cách tự thay băng', en: 'Ask how to change the bandage yourself', rvi: 'Bạn ghi nhớ từng bước. Cơn đau chưa dứt, nhưng nó không còn làm bạn luống cuống.', ren: 'You memorized each step. The pain remained, but you knew what to do.', fx: { health: 5, sanity: 1 } }
    ],
    ignore: { vi: 'Bạn bước qua cửa tiệm. Vết thương vẫn ở đó.', en: 'You walked past the clinic. The injury remained.' },
    once: true, tags: ['callback', 'medical', 'healing'], scarAffinity: 'injury'
  },
  {
    id: 'scar_witness_records', age: [18, 140], need: { scarTag: 'witness', notOut: true },
    vi: '[Hồ sơ bị bỏ quên] Một mã số trên trang giấy trùng với điều bạn đã thấy. Dòng cuối đã bị xóa.',
    en: '[The discarded file] A code on the page matches what you once saw. The last line has been erased.',
    choices: [
      { vi: 'Chép lại phần còn đọc được', en: 'Copy what remains legible', rvi: 'Bạn giữ bản chép trong áo. Từ hôm đó, có người hỏi ai đã vào phòng lưu trữ.', ren: 'You kept the copy in your coat. Someone soon asked who had entered the archive.', fx: { network: 4, sanity: -3, heat: 3 }, mem: 'scar_witness_kept_record' },
      { vi: 'Đưa hồ sơ cho người bị ghi tên', en: 'Give the file to the person named in it', rvi: 'Người ấy đọc xong, gấp giấy lại và chỉ đường cho bạn ra cửa sau.', ren: 'They read it, folded the page and showed you the back exit.', fx: { rep: 3, network: 2, sanity: 1 } }
    ],
    ignore: { vi: 'Bạn đặt trang giấy lại đúng chỗ.', en: 'You put the page back where you found it.' },
    once: true, tags: ['callback', 'investigation'], scarAffinity: 'witness'
  },
  {
    id: 'scar_weapon_commission', age: [18, 140], need: { scarTag: 'weapon', jobs: ['Fixer'] },
    vi: '[Việc ngoài sổ] Chủ Office thấy vũ khí bạn mang theo và đặt một ủy thác không ghi tên khách.',
    en: '[Off the books] Your Office chief sees the weapon you carry and offers a commission without a client name.',
    choices: [
      { vi: 'Nhận việc, hỏi rõ mục tiêu', en: 'Take the job and ask for the target', rvi: 'Mục tiêu chỉ là một kho hàng bỏ trống. Bạn giao đủ số kiện và nhận tiền công.', ren: 'The target was an empty warehouse. You delivered the crates and collected your pay.', fx: { wealth: 4, merit: 3, heat: 4 } },
      { vi: 'Từ chối việc không có tên', en: 'Refuse the unnamed job', rvi: 'Chủ Office cất tờ ủy thác đi. Ông không ép thêm.', ren: 'The chief put the commission away and did not press you.', fx: { sanity: 2, rep: 1 } }
    ],
    ignore: { vi: 'Một Fixer khác nhận việc trước bạn.', en: 'Another Fixer took the job first.' },
    once: true, tags: ['callback', 'contract', 'combat'], scarAffinity: 'weapon'
  },
  {
    id: 'scar_craft_repair', age: [16, 140], need: { scarTag: 'craft', notOut: true },
    vi: '[Chi tiết sai cỡ] Trong Workshop có một bộ phận tưởng phải bỏ đi. Bạn nhìn ra chỗ có thể sửa.',
    en: '[A mismatched part] A Workshop has a component marked for disposal. You see where it can be repaired.',
    choices: [
      { vi: 'Sửa rồi bán lại', en: 'Repair it and sell it', rvi: 'Máy chạy êm sau hai lần chỉnh. Chủ xưởng trả tiền ngay.', ren: 'After two adjustments, the machine ran cleanly. The owner paid on the spot.', fx: { wealth: 4, rep: 2 } },
      { vi: 'Chỉ người học việc cách sửa', en: 'Show the apprentice how to fix it', rvi: 'Đứa học việc tự tay lắp nốt con ốc cuối. Lần sau nó để dành việc cho bạn.', ren: 'The apprentice fitted the last screw. Next time, they saved a job for you.', fx: { network: 4, sanity: 2 } }
    ],
    ignore: { vi: 'Bộ phận bị đưa vào lò phế liệu.', en: 'The part went to the scrap furnace.' },
    once: true, tags: ['callback', 'workshop'], scarAffinity: 'craft'
  },
  {
    id: 'scar_faction_recognized', age: [16, 140], need: { scarTag: 'faction', notOut: true },
    vi: '[Bị nhận mặt] Người gác cửa nhìn dấu của tổ chức trên người bạn. Anh ta biết bạn từng thuộc về ai.',
    en: '[Recognized] The door guard notices your faction mark. He knows who you once answered to.',
    choices: [
      { vi: 'Nhờ anh ta chuyển lời', en: 'Ask him to pass on a message', rvi: 'Tin nhắn đến đúng người. Đổi lại, tên bạn xuất hiện trong một cuốn sổ khác.', ren: 'The message reached its recipient. Your name appeared in another ledger.', fx: { network: 5, heat: 5 } },
      { vi: 'Đi cửa khác', en: 'Take another entrance', rvi: 'Bạn mất thêm một giờ nhưng tránh được cuộc nói chuyện.', ren: 'You lost an hour and avoided the conversation.', fx: { sanity: 1, wealth: -1 } }
    ],
    ignore: { vi: 'Người gác cửa nhìn theo cho đến khi bạn khuất khỏi phố.', en: 'The guard watched until you turned the corner.' },
    once: true, tags: ['callback', 'syndicate'], scarAffinity: 'faction'
  },
  {
    id: 'scar_trauma_return', age: [12, 140], need: { scarTag: 'trauma' },
    vi: '[Chỗ ngồi còn trống] Một giọng nói quen làm bạn dừng giữa đường. Người gọi là một người lạ.',
    en: '[The empty seat] A familiar voice stops you in the street. The speaker is a stranger.',
    choices: [
      { vi: 'Ngồi lại đến khi hết run', en: 'Sit until your hands stop shaking', rvi: 'Bạn để cơn sợ đi qua rồi đứng dậy. Hôm nay không cần chạy.', ren: 'You let the fear pass before standing. Today you did not have to run.', fx: { sanity: 7, health: 1 } },
      { vi: 'Hỏi người ấy về cái tên cũ', en: 'Ask about the old name', rvi: 'Người lạ không biết cái tên đó. Bạn ghi nhớ giọng nói để khỏi lẫn lần nữa.', ren: 'The stranger did not know that name. You remembered their voice so you would not mistake it again.', fx: { sanity: 2, resonance: 2 } }
    ],
    ignore: { vi: 'Bạn đi tiếp trước khi người lạ kịp nhìn sang.', en: 'You left before the stranger could look your way.' },
    once: true, tags: ['callback', 'relief', 'memory'], scarAffinity: 'trauma'
  }
];
