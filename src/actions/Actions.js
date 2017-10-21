import moment from "moment";
import database from "../firebase/firebase";

import {
  MESSAGE_SENT,
  EMOJI_TOGGLED,
  EMOJI_CLOSED,
  EMOJI_SENT
} from "./ActionTypes";

const loadedMessagesSuccess = msgArr => ({
  type: "MESSAGELOG_LOADED",
  msgArr
});

const loadedMessageFailure = msgArr => ({
  type: "MESSAGELOG_EMPTY",
  msgArr
});

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

export const loadMessageLog = () => dispatch => {
  database.ref("data").once("value", snap => {
    const snapShot = snap.val();
    dispatch(
      snapShot
        ? loadedMessagesSuccess(Object.values(snap.val()))
        : loadedMessageFailure()
    );
  });
};

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

    const lastTime = moment(previousMsg.dateFull);
    const thisTime = moment(msg.dateFull);
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
        database
          .ref("data")
          .limitToLast(2)
          .once("value", snap => {
            const key = Object.keys(snap.val())[0];
            database.ref(`data/${key}`).set(previousMsg);
          });
      }
    }
  }

  const currentNew = { ...currentMsg };
  currentNew.noDelay = true;
  database.ref("data").push(currentNew);
  dispatch(sendMessage(currentMsg));
};
