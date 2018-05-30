import React from "react";
import "../../../../css/messageApp/message/messageSend/messageSend.css";

// Components
import MessageSendMessage from "./messageType/MessageSendMessage";

const MessageSend = ({ convoActions, userState }) => (
  <div className="message-send-wrap">
    <MessageSendMessage
      sendMessage={convoActions.sendMessage}
      userData={userState.userData}
    />
  </div>
);

export default MessageSend;
