export const sendMessage = msg => ({
  type: "SEND_MESSAGE",
  msg
});

export const toggleEmoji = () => ({
  type: "TOGGLE_EMOJI"
});

export const sendEmoji = emoji => ({
  type: "SEND_EMOJI",
  emoji
});


export const sendMessageNow = (msg, log) => dispatch => {
  const logLen = log.length;
  if (logLen < 1) {
    msg.timeStamp = true;
  } else {
    let lastH = Number(log[logLen - 1].timeHour.replace(":", "."));
    let currentH = Number(msg.timeHour.replace(":", "."));

    if (currentH - lastH >= 1) {
      msg.timeStamp = true;
    }
  }
  dispatch(sendMessage(msg));
};