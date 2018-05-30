import uuid from "uuid";
import dayjs from "dayjs";
import { firestore } from "../../firebase/index";

export const loadConversationLog = async () => {
  const snapShot = await firestore
    .collection("conversation")
    .orderBy("dateFull")
    .get();
  const conversation = snapShot.docs.map(e => e.data());
  return conversation;
};

export const pushMessageToFirebase = message => {
  const convoCollection = firestore.collection("conversation");
  convoCollection.doc(message.id).set(message);
};

export const processMessage = (messageLog, message, uid) => {
  const chatID = "UNIQ#";
  const timeFull = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const timeMin = dayjs().format("dddd, h:mm a");

  const pushMessage = {
    chatID,
    id: uuid(),
    userId: uid,
    text: message,
    date: timeMin,
    dateFull: timeFull,
    showTimeStamp: false,
    showPic: true
  };

  // -------- TIME STUFF -------

  if (messageLog.length < 1) {
    pushMessage.showTimeStamp = true;
  } else {
    const previousMsg = messageLog[messageLog.length - 1];
    const lastTime = dayjs(previousMsg.dateFull);
    const thisTime = dayjs(message.dateFull);
    const timeDiff = thisTime.diff(lastTime, "minutes");

    if (timeDiff >= 30) {
      pushMessage.showTimeStamp = true;
    }
  }

  return pushMessage;
};
