import React from "react";
import "../../../css/messageApp/message/message.css";

import { ConversationProvider } from "../../../context/conversationContext";
import withUserAndConvoStore from "../../../hoc/contextHoc";

// Components
import MessageLog from "./messageLog/MessageLog";
import MessageSend from "./messageSend/MessageSend";

const MessageLogWithUserAndConvoStore = withUserAndConvoStore(MessageLog);
const MessageSendWithUserAndConvoStore = withUserAndConvoStore(MessageSend);

const Message = () => (
  <ConversationProvider>
    <div className="message-wrap">
      <MessageLogWithUserAndConvoStore />
      <MessageSendWithUserAndConvoStore />
    </div>
  </ConversationProvider>
);

export default Message;
