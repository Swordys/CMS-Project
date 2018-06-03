import uuid from "uuid";
import dayjs from "dayjs";
import { firestore } from "../../firebase/index";

export const searchUsers = async text => {
  const userRef = firestore.collection("users");
  const query = await userRef
    .orderBy("name")
    .startAt(text)
    .endAt(`${text}${"\uf8ff"}`)
    .get();

  return query.docs.map(e => e.data());
};

export const registerUserAccount = user => {
  const convoCollection = firestore.collection("users");
  convoCollection.doc(user.uid).set(user);
};

export const retunUserAccount = async uid => {
  const userRef = await firestore
    .collection("users")
    .doc(uid)
    .get();
  return userRef.data();
};

export const loadConversationLog = async convoId => {
  const convoRoom = firestore.collection("conversations").doc(convoId);
  const metaQuery = await convoRoom.get();
  const messageLogQuery = await convoRoom
    .collection("messageLog")
    .orderBy("dateFull")
    .get();

  const messageLog = messageLogQuery.docs.map(e => e.data());
  const metaData = metaQuery.data();

  console.log(metaData);
  console.log(messageLog);

  return messageLog;
};

export const pushMessageToFirebase = (message, roomId) => {
  const conversationRoom = firestore.collection("conversations").doc(roomId);

  conversationRoom.set({
    displayMessage: message.text,
    lastMessageTime: message.dateFull
  });
  conversationRoom.collection("messageLog").add(message);
  conversationRoom.collection("members").doc(message.userId);
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
