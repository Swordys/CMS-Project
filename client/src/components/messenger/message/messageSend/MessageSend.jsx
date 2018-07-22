import React from "react";
import "../../../../css/messageApp/message/messageSend/messageSend.css";

// Components
import MessageSendMessage from "./messageType/MessageSendMessage";

const MessageSend = ({ sendMessage, userData }) => (
  <div className="message-send-wrap">
    <MessageSendMessage sendMessage={sendMessage} userData={userData} />
  </div>
);

export default MessageSend;
