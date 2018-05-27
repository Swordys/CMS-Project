import firebase from "firebase/app";
import moment from "moment";
import firestore from "../firebase/firestore";
import { getMetaData } from "../helpers/messageHelper";
import {
  EMOJI_CLOSED,
  EMOJI_SENT,
  EMOJI_TOGGLED,
  LOADED_MESSAGE_HEIGHT,
  LOADED_META_URL_HEIGHT,
  LOADING_STARTED,
  LOADING_STOPPED,
  MESSAGE_LOG_EMPTY,
  MESSAGE_LOG_LOADED,
  MESSAGE_SENT,
  MESSAGE_URL_LOADED
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
  type: LOADING_STARTED
});

const loadingStopped = () => ({
  type: LOADING_STOPPED
});

export const loadedMessageHeight = height => ({
  type: LOADED_MESSAGE_HEIGHT,
  height
});

export const loadedMetaUrlHeight = height => ({
  type: LOADED_META_URL_HEIGHT,
  height
});

export const loadMessageLog = () => async dispatch => {
  dispatch(loadingStarted());
  const snapShot = await firestore
    .collection("data")
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
    currentMsg.noDelay = true;
    currentMsg.showPic = true;
  } else {
    previousMsg = log[logLen - 1];
    // -------- TIME STUFF -------

    const lastTime = moment(previousMsg.dateFull);
    const thisTime = moment(msg.dateFull);
    const timeDiff = thisTime.diff(lastTime, "minutes");

    if (timeDiff >= 30) {
      currentMsg.showTimeStamp = true;
      currentMsg.noDelay = true;
      currentMsg.showPic = true;
    }

    // ------- ICON ANIMATIONS --------

    currentMsg.noDelay = true;
    currentMsg.showPic = true;
    condition =
      ((previousMsg.sender && msg.sender) ||
        (!previousMsg.sender && !msg.sender)) &&
      !currentMsg.showTimeStamp;

    if (condition) {
      previousMsg.showPic = false;
      currentMsg.noDelay = false;
    }
  }

  // MESSAGE FOR CLIENT
  dispatch(sendMessage(currentMsg));

  //  MESSAGE FOR FIREBASE
  const currentNew = { ...currentMsg };
  currentNew.noDelay = true;
  currentNew.timestamp = firebase.firestore.FieldValue.serverTimestamp();

  const convoCollection = firestore.collection("data");
  convoCollection
    .doc(currentNew.id)
    .set(currentNew)
    .then(() => {
      if (previousMsg) {
        convoCollection.doc(`${previousMsg.id}`).update({
          showPic: previousMsg.showPic
        });
      }

      getMetaData(currentNew.text)
        .then(urlMeta => {
          if (urlMeta) {
            dispatch(loadedUrlMeta({ urlMeta, id: currentNew.id }));
            currentNew.urlMeta = urlMeta;
            convoCollection.doc(currentNew.id).set(currentNew);
          }
        })
        .catch(err => console.error(err));
    })
    .catch(err => {
      console.error(err);
    });
};
