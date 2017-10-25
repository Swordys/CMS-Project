import moment from "moment";
import firebase from "../firebase/firebase";
import { getMetaData } from "../helpers/messageHelper";

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

const loadedUrlMeta = urlObj => ({
  type: "MESSAGE_URL_LOADED",
  urlObj
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

export const loadMessageLog = () => async dispatch => {
  const snapShot = await firebase
    .database()
    .ref("data")
    .once("value");
  const messageData = snapShot.val();
  dispatch(
    messageData
      ? loadedMessagesSuccess(Object.values(messageData))
      : loadedMessageFailure()
  );
};

export const sendMessageNow = (msg, log) => async dispatch => {
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
        firebase
          .database()
          .ref("data")
          .limitToLast(2)
          .once("value", snap => {
            const key = Object.keys(snap.val())[0];
            firebase
              .database()
              .ref(`data/${key}`)
              .set(previousMsg);
          });
      }
    }
  }

  dispatch(sendMessage(currentMsg));

  const currentNew = { ...currentMsg };
  currentNew.noDelay = true;
  const urlMeta = await getMetaData(currentMsg.text).catch(err => err);

  // IF THERE IS URL META LOAD HERE
  if (urlMeta) dispatch(loadedUrlMeta({ urlMeta, id: currentMsg.id }));
  currentNew.urlMeta = urlMeta;

  firebase
    .database()
    .ref("data")
    .push(currentNew);
};
