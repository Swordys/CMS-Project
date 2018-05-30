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
  <div className="message-wrap">
    <ConversationProvider>
      <MessageLogWithUserAndConvoStore />
      <MessageSendWithUserAndConvoStore />
    </ConversationProvider>
  </div>
);

export default Message;