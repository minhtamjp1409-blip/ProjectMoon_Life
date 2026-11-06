// Text the dungeon engine needs when a check fails, nerves break or a run ends.
// Voice rules in UNIVERSE.md section 4 apply: second person, one concrete detail, no stat numbers
// (the result card shows them as chips).

export const FAIL_TEXT = {
  warp: {
    vigor: {
      vi: 'Cú chém đến chậm nửa nhịp. Khối thịt quật bạn vào vách toa trước khi lưỡi dao kịp rút ra.',
      en: 'The cut lands half a beat late. The flesh slams you against the bulkhead before the blade comes free.'
    },
    nerve: {
      vi: 'Một khuôn mặt trong đám thịt gọi đúng tên bạn. Bạn khựng lại, và tiếng gọi có đủ thời gian để bám vào.',
      en: 'One of the faces in the mass says your name. You hesitate, and the voice has time to take hold.'
    },
    luck: {
      vi: 'Chiếc cặp bạn chộp lấy chỉ chứa giấy ướt. Thứ nằm dưới nó thì còn sống.',
      en: 'The case you grab holds only wet paper. What lies under it is alive.'
    }
  },
  lobotomy: {
    vigor: {
      vi: 'Rễ kim loại siết quanh cổ tay trước khi bạn kịp lùi. Bạn phải giật ra bằng cả sức nặng người.',
      en: 'Metal roots close around your wrist before you can back off. You tear free with your whole weight.'
    },
    nerve: {
      vi: 'Khúc hát ru lọt qua lớp bịt tai. Có vài giây bạn không biết mình đang đứng ở đâu.',
      en: 'The lullaby gets past the earplugs. For a few seconds you do not know where you are standing.'
    },
    luck: {
      vi: 'Thẻ khóa tuột khỏi tay, rơi xuống kẽ sàn. Tiếng kim loại va nhau đánh thức thứ đang ngủ bên dưới.',
      en: 'The keycard slips through your fingers into a floor seam. The clink wakes what sleeps below.'
    }
  },
  bloodfiend: {
    vigor: {
      vi: 'Lưỡi kiếm chạm vào lớp áo nhung và không chạm vào gì phía sau. Răng của nó thì chạm vào bạn.',
      en: 'Your blade meets velvet and nothing behind it. Its teeth meet you.'
    },
    nerve: {
      vi: 'Trong mê cung gương, một bóng phản chiếu bật cười bằng giọng người bạn từng biết. Bạn quay lại quá chậm.',
      en: 'In the hall of mirrors, a reflection laughs in the voice of someone you knew. You turn too slowly.'
    },
    luck: {
      vi: 'Quầy trò chơi bạn lục có người trông. Con rối ấy không cần ngủ.',
      en: 'The prize booth you search has a keeper. The marionette does not need sleep.'
    }
  },
  outskirts: {
    vigor: {
      vi: 'Bậc đá vỡ dưới chân. Bạn níu được mép tường, nhưng da tay ở lại trên đá.',
      en: 'The stair breaks under your foot. You catch the wall edge, but the skin of your hands stays on the stone.'
    },
    nerve: {
      vi: 'Gió trong vòm cổng nghe như tiếng người quá lâu. Bạn bước sai ba bước trước khi nhận ra.',
      en: 'The wind in the archway sounds like speech for too long. You take three wrong steps before you notice.'
    },
    luck: {
      vi: 'Nắp rương bật ra, nhưng phần quặng tốt đã bị người đến trước lấy mất. Họ để lại cái bẫy.',
      en: 'The chest opens, but whoever came first took the good ore. They left the trap.'
    }
  },
  greatlake: {
    vigor: {
      vi: 'Cây lao tuột khỏi tay vì sáp trắng trên boong. Sóng đập vào sườn bạn trước khi bạn đứng vững.',
      en: 'The harpoon slips from your grip on the wax-slick deck. The swell hits your ribs before you find your footing.'
    },
    nerve: {
      vi: 'Tiếng hát của Người Cá lọt dưới tiếng chuông cảnh báo. Bạn nhận ra mình đang nghiêng người về phía mạn tàu.',
      en: 'The Mermaids’ chorus slips under the warning bells. You realize you have been leaning toward the rail.'
    },
    luck: {
      vi: 'Thủy lôi nổ sớm một nhịp. Con quái chưa kịp quay đầu đã nuốt mất phần giá trị nhất của mẻ hàng.',
      en: 'The charge goes off a beat early, and the beast swallows the best of the haul before it turns.'
    }
  }
};

export const GENERIC_FAIL = {
  vi: 'Mọi thứ lệch đi một chút, và một chút là đủ.',
  en: 'Everything slips a little, and a little is enough.'
};

export const STRAIN_NOTES = {
  shaken: {
    vi: 'Tay bạn bắt đầu run ở những chỗ không đáng.',
    en: 'Your hands begin to shake in places they should not.'
  },
  panic: {
    vi: 'Hơi thở bạn đã ngắn lại. Mỗi tiếng động giờ đều nghe như một cái tên.',
    en: 'Your breath has gone short. Every sound now seems to carry a name.'
  },
  resolveWon: {
    vi: 'Giữa đám tiếng ồn, một ý nghĩ rất đơn giản giữ bạn lại: bạn vẫn đang đứng đây.',
    en: 'Amid the noise, one plain thought holds you: you are still standing here.'
  },
  resolveLost: {
    vi: 'Tim bạn đập lệch nhịp. Bạn phải dựa vào vách đợi cho nó chậm lại.',
    en: 'Your heart skips its rhythm. You lean against the wall until it slows.'
  }
};

export const BREAK_TEXT = {
  strain: {
    title: { vi: 'Gục Trước Khi Ra Tới Cửa', en: 'Broken Short of the Door' },
    body: {
      vi: 'Bạn không còn đứng vững. Khi ra được khỏi khu nguy hiểm, bạn chỉ giữ lại một nửa số hàng đã gom.',
      en: 'You can no longer stay on your feet. By the time you leave the danger zone, you have kept only half the haul.'
    }
  },
  mind: {
    title: { vi: 'Tâm Trí Vỡ Giữa Đường', en: 'Mind Gone Mid-Run' },
    body: {
      vi: 'Bạn trả lời một giọng nói không ai khác nghe thấy. Đến lúc rời khu nguy hiểm, bạn phải đọc lại tên mình trong hồ sơ.',
      en: 'You answer a voice no one else can hear. When you leave the danger zone, you have to read your name from your own file.'
    }
  }
};

export const SUPPLY_TEXT = {
  scan: {
    vi: 'Bạn dừng lại đọc quy luật của chặng này trước khi bước tiếp.',
    en: 'You stop to read how this stage works before you step further.'
  },
  breather: {
    vi: 'Bạn dùng một phần vật tư để băng vết thương, rồi ngồi thở cho đến khi tay hết run.',
    en: 'You use part of your supplies to dress the wound, then sit until your hands stop shaking.'
  },
  ego: {
    vi: 'Bạn gọi E.G.O lên và giữ nó đủ lâu để nhìn rõ đường qua chặng tới. Khi nó lắng xuống, đầu bạn nặng hơn trước.',
    en: 'You call up your E.G.O and hold it long enough to see a way through the next stage. When it settles, your head feels heavier.'
  },
  egoColor: {
    vi: 'Bạn gọi E.G.O lên trong một nhịp thở và chọn đường qua chặng tới. Áp lực của nó vẫn đè lên tâm trí khi bạn bước tiếp.',
    en: 'You call up your E.G.O in one breath and choose a route through the next stage. Its strain stays with you as you move.'
  },
  broke: {
    vi: 'Túi bạn không còn đủ Ahn để mua thêm khẩu phần.',
    en: 'You no longer have the Ahn to buy another ration.'
  }
};

export const ENDING_TEXT = {
  fled: {
    title: (name) => ({ vi: `Rút Lui Khỏi ${name.vi}`, en: `Retreated from ${name.en}` }),
    body: {
      vi: 'Bạn rời khu nguy hiểm với phần hàng giữ được. Chặng còn lại khép sau lưng; bạn ghi số người đã ra được trước khi đi tiếp.',
      en: 'You leave the danger zone with what you managed to keep. The remaining route closes behind you; you count who made it out before moving on.'
    }
  },
  conquered: {
    title: (name) => ({ vi: `Đi Hết ${name.vi}`, en: `Through ${name.en}` }),
    body: {
      vi: 'Chặng cuối khép lại. Bạn dừng ở lối ra, đếm lại đồ mang theo và đợi tay hết run.',
      en: 'The last stage ends. At the exit, you count what you brought back and wait for your hands to stop shaking.'
    }
  },
  dead: {
    title: (name) => ({ vi: `Bỏ Mạng Trong ${name.vi}`, en: `Fell in ${name.en}` }),
    body: (stage) => ({
      vi: `Bạn gục ở ${stage.vi}. Hồ sơ chỉ ghi tên chặng nơi cuộc tìm kiếm dừng lại.`,
      en: `You fall in ${stage.en}. The file records only the stage where the search stopped.`
    })
  }
};
