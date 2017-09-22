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
    const picPropNew = {
      showPic: true,
      position: 0
    };
    currentMsg.picProp = picPropNew;
  } else {
    // console.log(msg);
    // console.log(log);


    const previousMsg = log[logLen - 1];
    const prevPicProp = {
      showPic: true,
      position: 43
    };

    previousMsg.picProp = prevPicProp;

    // If the last message is mine
    currentMsg.picProp.showPic = true;
  









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
