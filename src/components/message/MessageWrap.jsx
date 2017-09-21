import React from "react";
import "./css/message.css";

// Components
import MessageLog from "./messageLog/MessageLog";
import MessageSend from "./messageSend/MessageSend";

const MessageWrap = () => (
  <div className="messageWrap">
    <MessageLog />
    <MessageSend />
  </div>
);

export default MessageWrap;
