import React from "react";
import "../../css/messageApp/message/message.css";
// Components
import MessageLog from "./messageLog/MessageLog";
import MessageSend from "./messageSend/MessageSend";

const Message = () => (
  <div className="Message">
    <MessageLog />
    <MessageSend />
  </div>
);

export default Message;
