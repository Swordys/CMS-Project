import React from "react";
import "../../../../css/messageApp/message/messageSend/messageSend.css";

import { userStateInterface } from "../../../../interfaces/interface";

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

MessageSend.propTypes = {
  ...userStateInterface
};

export default MessageSend;
