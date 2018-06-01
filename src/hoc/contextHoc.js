import React from "react";
import { UserConsumer } from "../context/userContext";
import { ConversationConsumer } from "../context/conversationContext";

const withUserAndConvoStore = Component =>
  function withUserDataComponent(props) {
    return (
      <UserConsumer>
        {({ userSignedIn, userData }) => (
          <ConversationConsumer>
            {({ conversationLog, convoIsLoading, sendMessage }) => (
              <Component
                {...props}
                userSignedIn={userSignedIn}
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
