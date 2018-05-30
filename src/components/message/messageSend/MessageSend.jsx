import React from "react";
import { UserConsumer } from "../../../context/userContext";
import "../../../css/messageApp/message/messageSend/messageSend.css";

// Components
import MessageSendMessage from "./messageType/MessageSendMessage";

const MessageSend = () => (
  <div className="message-send-wrap">
    <UserConsumer>
      {({ userData }) => <MessageSendMessage userData={userData} />}
    </UserConsumer>
  </div>
);

export default MessageSend;
