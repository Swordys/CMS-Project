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

export const heightChange = height => ({
  type: "height",
  height
});

export const sendMessageNow = (msg, log) => dispatch => {
  const logLen = log.length;
  const currentMsg = msg;
  if (logLen < 1) {
    currentMsg.timeStamp = true;
    currentMsg.noDelay = true;
    currentMsg.picProp = {
      showPic: true,
      position: 0
    };
  } else {
    const previousMsg = log[logLen - 1];
    currentMsg.noDelay = true;
    currentMsg.picProp.showPic = true;

    if (
      (previousMsg.sender && msg.sender) ||
      (!previousMsg.sender && !msg.sender)
    ) {
      previousMsg.picProp = {
        showPic: false,
        position: 43
      };
      currentMsg.noDelay = false;
    }

    // -------- TIME STUFF -------

    const lastTime = previousMsg.timeCheck;
    const thisTime = msg.timeCheck;
    const timeDiff = thisTime.diff(lastTime, "minutes");

    if (timeDiff >= 29) {
      currentMsg.timeStamp = true;
    }
  }
  dispatch(sendMessage(currentMsg));
};
