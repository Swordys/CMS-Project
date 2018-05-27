import firebase from "firebase/app";
import dayjs from "dayjs";
import firestore from "../firebase/firestore";
import {
  LOADING_STARTED,
  LOADING_STOPPED,
  MESSAGE_LOG_EMPTY,
  MESSAGE_LOG_LOADED,
  MESSAGE_SENT
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

const loadingStarted = () => ({
  type: LOADING_STARTED
});

const loadingStopped = () => ({
  type: LOADING_STOPPED
});

export const loadMessageLog = () => async dispatch => {
  dispatch(loadingStarted());
  const snapShot = await firestore
    .collection("conversation")
    .orderBy("timestamp")
    .get();
  const messageData = snapShot.docs.map(e => e.data());
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
    currentMsg.showTimeStamp = true;
    currentMsg.showPic = true;
  } else {
    previousMsg = log[logLen - 1];
    // -------- TIME STUFF -------

    const lastTime = dayjs(previousMsg.dateFull);
    const thisTime = dayjs(msg.dateFull);
    const timeDiff = thisTime.diff(lastTime, "minutes");

    if (timeDiff >= 30) {
      currentMsg.showTimeStamp = true;
      currentMsg.showPic = true;
    }

    // ------- ICON ANIMATIONS --------

    currentMsg.showPic = true;
    condition =
      ((previousMsg.sender && msg.sender) ||
        (!previousMsg.sender && !msg.sender)) &&
      !currentMsg.showTimeStamp;

    if (condition) {
      previousMsg.showPic = false;
    }
  }

  // MESSAGE FOR CLIENT
  dispatch(sendMessage(currentMsg));

  //  MESSAGE FOR FIREBASE
  const currentNew = { ...currentMsg };
  currentNew.timestamp = firebase.firestore.FieldValue.serverTimestamp();

  const convoCollection = firestore.collection("conversation");
  convoCollection
    .doc(currentNew.id)
    .set(currentNew)
    .then(() => {
      if (previousMsg) {
        convoCollection.doc(`${previousMsg.id}`).update({
          showPic: previousMsg.showPic
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};
