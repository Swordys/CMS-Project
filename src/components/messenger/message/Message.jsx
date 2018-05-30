import React from "react";
import "../../../css/messageApp/message/message.css";
import { UserConsumer } from "../../../context/userContext";
import {
  ConversationConsumer,
  ConversationProvider
} from "../../../context/conversationContext";

// Components
import MessageLog from "./messageLog/MessageLog";
import MessageSend from "./messageSend/MessageSend";

const Message = () => (
  <div className="message-wrap">
    <UserConsumer>
      {({ userState }) => (
        <ConversationProvider>
          <ConversationConsumer>
            {({ convoState, convoActions }) => (
              <React.Fragment>
                <MessageLog userState={userState} convoState={convoState} />
                <MessageSend
                  userState={userState}
                  convoActions={convoActions}
                />
              </React.Fragment>
            )}
          </ConversationConsumer>
        </ConversationProvider>
      )}
    </UserConsumer>
  </div>
);

export default Message;
