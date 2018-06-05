import React from "react";
import { UserConsumer } from "../context/userContext";

const withFirestore = Component => props => (
  <UserConsumer>
    {({ userData, conversationLog, convoIsLoading, sendMessage }) => (
      <Component
        {...props}
        userData={userData}
        conversationLog={conversationLog}
        convoIsLoading={convoIsLoading}
        sendMessage={sendMessage}
      />
    )}
  </UserConsumer>
);

export default withFirestore;
