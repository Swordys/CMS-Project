import {
  SEND_MESSAGE,
  TOGGLE_EMOJI,
  CLOSE_EMOJI,
  SEND_EMOJI
} from "./ActionTypes";

export const sendMessage = msg => ({
  type: SEND_MESSAGE,
  msg
});

export const toggleEmoji = () => ({
  type: TOGGLE_EMOJI
});

export const closeEmoji = () => ({
  type: CLOSE_EMOJI
});

export const sendEmoji = emoji => ({
  type: SEND_EMOJI,
  emoji
});

export const sendMessageNow = (msg, log) => dispatch => {
  const logLen = log.length;
  const currentMsg = msg;
  if (logLen < 1) {
    currentMsg.timeStamp = true;
    currentMsg.noDelay = true;
    currentMsg.showPic = true;
  } else {
    const previousMsg = log[logLen - 1];
    // -------- TIME STUFF -------

    const lastTime = previousMsg.timeCheck;
    const thisTime = msg.timeCheck;
    const timeDiff = thisTime.diff(lastTime, "minutes");

    if (timeDiff >= 30) {
      currentMsg.timeStamp = true;
      currentMsg.noDelay = true;
      currentMsg.showPic = true;
    }

    // ------- ICON ANIMATIONS --------

    currentMsg.noDelay = true;
    currentMsg.showPic = true;

    if (
      (previousMsg.sender && msg.sender) ||
      (!previousMsg.sender && !msg.sender)
    ) {
      if (!currentMsg.timeStamp) {
        previousMsg.showPic = false;
        currentMsg.noDelay = false;
      }
    }
  }
  dispatch(sendMessage(currentMsg));
};
