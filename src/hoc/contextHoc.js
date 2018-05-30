import React from "react";
import { UserConsumer } from "../context/userContext";
import { ConversationConsumer } from "../context/conversationContext";

const withUserAndConvoStore = Component =>
  function withUserDataComponent(props) {
    return (
      <UserConsumer>
        {({ userState }) => (
          <ConversationConsumer>
            {({ convoState, convoActions }) => (
              <Component
                {...props}
                userState={userState}
                convoState={convoState}
                convoActions={convoActions}
              />
            )}
          </ConversationConsumer>
        )}
      </UserConsumer>
    );
  };

export default withUserAndConvoStore;
