export const sendMessage = msg => ({
  type: "SEND_MESSAGE",
  msg
});

export const sendMessageNow = (msg, log) => dispatch => {
  const logLen = log.length;
  if (logLen < 1) {
    // console.log(msg);
    msg.timeStamp = true;
  } else {
    let lastH = log[logLen - 1].timeHour;
    let currentH = msg.timeHour;

    if (currentH > lastH) {
      // console.log(lastH);
      // console.log(currentH);
      msg.timeStamp = true;
    }
  }
  dispatch(sendMessage(msg));
};
