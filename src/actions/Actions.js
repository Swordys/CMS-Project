import moment from "moment";
import firebase from "../firebase/firebase";
import { getMetaData } from "../helpers/messageHelper";

import {
  MESSAGE_SENT,
  MESSAGE_LOG_LOADED,
  MESSAGE_LOG_EMPTY,
  MESSAGE_URL_LOADED,
  EMOJI_TOGGLED,
  EMOJI_CLOSED,
  EMOJI_SENT
} from "./ActionTypes";

const loadedMessagesSuccess = msgArr => ({
  type: MESSAGE_LOG_LOADED,
  msgArr
});

const loadedMessageFailure = msgArr => ({
  type: MESSAGE_LOG_EMPTY,
  msgArr
});

const sendMessage = msg => ({
  type: MESSAGE_SENT,
  msg
});

const loadedUrlMeta = urlObj => ({
  type: MESSAGE_URL_LOADED,
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

const loadingStarted = () => ({
  type: "LOADING_STARTED"
});

const loadingStopped = () => ({
  type: "LOADING_STOPPED"
});

export const loadMessageLog = () => async dispatch => {
  dispatch(loadingStarted());
  const snapShot = await firebase
    .database()
    .ref("data")
    .once("value");
  const messageData = snapShot.val();
  dispatch(loadingStopped());
  dispatch(
    messageData
      ? loadedMessagesSuccess(Object.values(messageData))
      : loadedMessageFailure()
  );
};

export const sendMessageNow = (msg, log) => dispatch => {
  const logLen = log.length;
  let condition = false;
  let previousMsg = null;
  const currentMsg = msg;
  if (logLen < 1) {
    currentMsg.timeStamp = true;
    currentMsg.noDelay = true;
    currentMsg.showPic = true;
  } else {
    previousMsg = log[logLen - 1];
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
    condition =
      ((previousMsg.sender && msg.sender) ||
        (!previousMsg.sender && !msg.sender)) &&
      !currentMsg.timeStamp;

    if (condition) {
      previousMsg.showPic = false;
      currentMsg.noDelay = false;
    }
  }

  dispatch(sendMessage(currentMsg));

  const currentNew = { ...currentMsg };
  currentNew.noDelay = true;

  firebase
    .database()
    .ref("data")
    .push(currentNew)
    .then(async el => {
      // PUSH MESSAGE && UPDATE PREVIOUS ONE

      if (condition) {
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
      // IF THERE IS URL META LOAD HERE

      const urlMeta = await getMetaData(currentNew.text).catch(err => err);
      if (urlMeta) {
        dispatch(loadedUrlMeta({ urlMeta, id: currentNew.id }));
        currentNew.urlMeta = urlMeta;
        firebase
          .database()
          .ref(`data/${el.key}`)
          .set(currentNew);
      }
    });
};
