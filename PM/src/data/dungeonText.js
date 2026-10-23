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
      vi: 'Bạn mở mắt giữa mê cung gương đúng lúc một bóng phản chiếu bật cười bằng giọng người bạn đã chôn.',
      en: 'You open your eyes in the hall of mirrors just as a reflection laughs with the voice of someone you buried.'
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
      vi: 'Bạn không còn nhớ mình đã bước qua chặng nào. Đồng đội kéo bạn ra bằng cổ áo, và một nửa số hàng thu được ở lại trong bóng tối.',
      en: 'You cannot remember which stage you were crossing. Your team drags you out by the collar, and half the haul stays behind in the dark.'
    }
  },
  mind: {
    title: { vi: 'Tâm Trí Vỡ Giữa Đường', en: 'Mind Gone Mid-Run' },
    body: {
      vi: 'Có một lúc bạn nói chuyện với thứ không ở đó, và nó trả lời. Người ta đưa bạn lên mặt đất, nhưng không phải cả bạn đi lên.',
      en: 'For a while you talk with something that is not there, and it answers. They carry you to the surface, but not all of you comes up.'
    }
  }
};

export const SUPPLY_TEXT = {
  scan: {
    vi: 'Bạn dừng lại đọc quy luật của chặng này trước khi bước tiếp.',
    en: 'You stop to read how this stage works before you step further.'
  },
  breather: {
    vi: 'Bạn tiêm liều thuốc kích thích rẻ tiền và ngồi thở đều trong một phút.',
    en: 'You take a cheap stimulant and sit breathing evenly for a minute.'
  },
  ego: {
    vi: 'Bạn để E.G.O thức dậy trong tay. Hơi lạnh chạy dọc cánh tay, và thứ trong hầm thôi nhìn bạn như một con mồi.',
    en: 'You let the E.G.O wake in your hand. A cold runs up the arm, and whatever lives in the dungeon stops looking at you like prey.'
  },
  egoColor: {
    vi: 'Bạn không rút gì ra. Chỉ cần đứng đó với cái tên của mình, và hầm ngục tự lùi lại nửa bước.',
    en: 'You draw nothing. You stand there with your name, and the dungeon gives back half a step on its own.'
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
      vi: 'Bạn quay lưng với phần còn lại của hầm ngục và mang theo những gì đã gom được. Có người sẽ gọi đó là khôn ngoan. Bạn chỉ biết chân mình còn đi được.',
      en: 'You turn your back on the rest of the dungeon and keep what you have gathered. Some will call it wise. You only know your legs still work.'
    }
  },
  conquered: {
    title: (name) => ({ vi: `Đi Hết ${name.vi}`, en: `Through ${name.en}` }),
    body: {
      vi: 'Chặng cuối khép lại sau lưng bạn. Không ai vỗ tay. Bạn ngồi xuống bậc thang đầu tiên của mặt đất và để tay yên cho tới khi hết run.',
      en: 'The last stage closes behind you. Nobody applauds. You sit on the first step of the surface and let your hands go still.'
    }
  },
  dead: {
    title: (name) => ({ vi: `Bỏ Mạng Trong ${name.vi}`, en: `Fell in ${name.en}` }),
    body: (stage) => ({
      vi: `Vết thương nhận ở ${stage.vi} là vết thương cuối cùng. Hầm ngục giữ lại phần còn lại của bạn.`,
      en: `The wound taken in ${stage.en} is the last one. The dungeon keeps what remains of you.`
    })
  }
};
