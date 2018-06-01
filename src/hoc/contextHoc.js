import React from "react";
import { UserConsumer } from "../context/userContext";
import { ConversationConsumer } from "../context/conversationContext";

const withUserAndConvoStore = Component =>
  function withUserDataComponent(props) {
    return (
      <UserConsumer>
        {({ userData }) => (
          <ConversationConsumer>
            {({ conversationLog, convoIsLoading, sendMessage }) => (
              <Component
                {...props}
                userData={userData}
                conversationLog={conversationLog}
                convoIsLoading={convoIsLoading}
                sendMessage={sendMessage}
              />
            )}
          </ConversationConsumer>
        )}
      </UserConsumer>
    );
  };

export default withUserAndConvoStore;
