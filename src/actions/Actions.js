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
    msgReturn.showPic = true;
  } else {
    console.log(msg);
    const lastTime = log[logLen - 1].timeCheck;
    const thisTime = msg.timeCheck;
    const timeDiff = thisTime.diff(lastTime, "minutes");

    if (timeDiff >= 29) {
      msgReturn.timeStamp = true;
    }
  }
  dispatch(sendMessage(msgReturn));
};
