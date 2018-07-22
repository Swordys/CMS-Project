import React from "react";
import "../../../css/messageApp/message/message.css";

import withFirestore from "../../../hoc/contextHoc";

// Components
import MessageLog from "./messageLog/MessageLog";
import MessageSend from "./messageSend/MessageSend";

const MessageLogWithFirestore = withFirestore(MessageLog);
const MessageSendWithFirestore = withFirestore(MessageSend);

const Message = () => (
  <div className="message-wrap">
    <MessageLogWithFirestore />
    <MessageSendWithFirestore />
  </div>
);

export default Message;
