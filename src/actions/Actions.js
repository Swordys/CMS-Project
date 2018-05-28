import firebase from "firebase/app";
import dayjs from "dayjs";
import firestore from "../firebase/firestore";
import socketClient from "../socket/socketClient";

import {
  USER_LOGGEED_IN,
  USER_LOGGEED_OUT,
  USER_DATA_LOADED,
  USER_DATA_NULL,
  LOADING_STARTED,
  LOADING_STOPPED,
  MESSAGE_LOG_EMPTY,
  MESSAGE_LOG_LOADED,
  MESSAGE_SENT
} from "./ActionTypes";

// ========= USER INFO ==========

const signedIn = () => ({
  type: USER_LOGGEED_IN
});

export const userSignedOut = () => ({
  type: USER_LOGGEED_OUT
});

const userDataSuccess = userData => ({
  type: USER_DATA_LOADED,
  userData
});

const userDataFailure = () => ({
  type: USER_DATA_NULL
});

export const userSignedIn = userData => dispatch => {
  // LOAD USER DATA
  dispatch(signedIn());
  if (userData) {
    dispatch(userDataSuccess(userData));
  } else {
    dispatch(userDataFailure());
  }
};

// =========== USER MESSAGES ===========

const loadedMessagesSuccess = msgArr => ({
  type: MESSAGE_LOG_LOADED,
  msgArr
});

const loadedMessageFailure = msgArr => ({
  type: MESSAGE_LOG_EMPTY,
  msgArr
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

// =========== SEND MESSAGE ===========

export const pushMessageToClient = msg => ({
  type: MESSAGE_SENT,
  msg
});

const pushMessageToFirebase = msg => {
  const currentNew = { ...msg };
  currentNew.timestamp = firebase.firestore.FieldValue.serverTimestamp();

  const convoCollection = firestore.collection("conversation");
  convoCollection.doc(currentNew.id).set(currentNew);
};

export const sendMessage = (message, messageLog) => () => {
  // PROCESS MESSAGE
  const currentMsg = message;
  if (messageLog.length < 1) {
    currentMsg.showTimeStamp = true;
  } else {
    // -------- TIME STUFF -------
    const previousMsg = messageLog[messageLog.length - 1];
    const lastTime = dayjs(previousMsg.dateFull);
    const thisTime = dayjs(message.dateFull);
    const timeDiff = thisTime.diff(lastTime, "minutes");

    if (timeDiff >= 30) {
      currentMsg.showTimeStamp = true;
    }
  }
  // SEND MESSAGE
  socketClient.emit("SEND_MESSAGE", currentMsg);
  pushMessageToFirebase(currentMsg);
};
