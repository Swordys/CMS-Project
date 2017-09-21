export const sendMessage = msg => ({
  type: "SEND_MESSAGE",
  msg
});

export const toggleEmoji = () => ({
  type: "TOGGLE_EMOJI"
});

export const closeEmoji = () => ({
  type: "CLOSE_EMOJI"
});

export const sendEmoji = emoji => ({
  type: "SEND_EMOJI",
  emoji
});

export const sendMessageNow = (msg, log) => dispatch => {
  const logLen = log.length;
  const msgReturn = msg;
  if (logLen < 1) {
    msgReturn.timeStamp = true;
  } else {
    const lastH = Number(log[logLen - 1].timeHour.replace(":", "."));
    const currentH = Number(msg.timeHour.replace(":", "."));

    if (currentH - lastH >= 1) {
      msgReturn.timeStamp = true;
    }
  }
  dispatch(sendMessage(msgReturn));
};
