import {
  MESSAGE_SENT,
  EMOJI_TOGGLED,
  EMOJI_CLOSED,
  EMOJI_SENT,
} from "./ActionTypes";

const sendMessage = msg => ({
  type: MESSAGE_SENT,
  msg
});

export const toggleEmoji = () => ({
  type: EMOJI_TOGGLED
});

export const closeEmoji = () => ({
  type: EMOJI_CLOSED
});

export const sendEmoji = emoji => ({
  type: EMOJI_SENT,
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
