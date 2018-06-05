import uuid from "uuid";
import dayjs from "dayjs";
import { firestore } from "../../firebase/index";

export const registerUserAccount = user => {
  const convoCollection = firestore.collection("users");
  convoCollection.doc(user.uid).set(user);
};

export const retunUserAccount = async uid => {
  const userRef = firestore.collection("users").doc(uid);
  const userConvoRef = userRef.collection("conversations");

  const userData = await userRef.get().then(data => data.data());
  const userConvos = await userConvoRef
    .get()
    .then(convoArr => convoArr.docs.map(e => e.data()));
  userData.convos = userConvos;

  return userData;
};

export const searchUsers = async (text, uid) => {
  if (text === "") return [];
  const userRef = firestore.collection("users");
  const query = await userRef
    .orderBy("username")
    .startAt(text)
    .endAt(`${text}${"\uf8ff"}`)
    .get();

  return query.docs
    .map(user => user.data())
    .filter(target => target.uid !== uid);
};

export const loadUserConvos = async convosId => {
  const conversationsRef = firestore.collection("conversations");
  const convoDocs = convosId.map(e =>
    firestore.doc(`conversations/${e.conversationId}`)
  );
};

export const loadConversationLog = async convoId => {
  const convoRoom = firestore.collection("conversations").doc(convoId);
  const messageLogQuery = await convoRoom
    .collection("messageLog")
    .orderBy("dateFull")
    .get();

  const messageLog = messageLogQuery.docs.map(e => e.data());

  console.log(messageLog);

  return messageLog;
};

export const returnConversationId = async (uid, targetUid) =>
  firestore
    .collection("users")
    .doc(uid)
    .collection("conversations")
    .doc(targetUid)
    .get()
    .then(data => data.data());

export const createNewConvoRoom = async (uid, targetUid) => {
  const newRoomId = uuid();
  const userRef = firestore
    .collection("users")
    .doc(uid)
    .collection("conversations");
  const toUserRef = firestore
    .collection("users")
    .doc(targetUid)
    .collection("conversations");
  await userRef.doc(targetUid).set({ conversationId: newRoomId });
  await toUserRef.doc(uid).set({ conversationId: newRoomId });
  return newRoomId;
};

export const pushMessageToFirebase = (message, roomId, targetUid) => {
  const conversationRoom = firestore.collection("conversations").doc(roomId);

  const userConvoRef = firestore
    .collection("users")
    .doc(message.userId)
    .collection("conversations")
    .doc(targetUid);

  const targetConvoRef = firestore
    .collection("users")
    .doc(targetUid)
    .collection("conversations")
    .doc(message.userId);

  userConvoRef.set(
    {
      displayMessage: message.text,
      lastMessageTime: message.dateFull
    },
    { merge: true }
  );

  targetConvoRef.set(
    {
      displayMessage: message.text,
      lastMessageTime: message.dateFull
    },
    { merge: true }
  );
  
  conversationRoom.collection("messageLog").add(message);
};

export const processMessage = (messageLog, message, uid) => {
  const timeFull = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const timeMin = dayjs().format("dddd, h:mm a");

  const pushMessage = {
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
