export const sendMessage = msg => ({
  type: "SEND_MESSAGE",
  msg
});

export const sendMessageNow = (msg, log) => dispatch => {
  const logLen = log.length;
  if (logLen < 1) {
    // console.log(msg);
    msg.timeStamp = true;
  }

  dispatch(sendMessage(msg));
};
