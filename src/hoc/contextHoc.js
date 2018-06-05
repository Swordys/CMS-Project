import React from "react";
import { DatabaseConsumer } from "../context/dataContext";

const withFirestore = Component => props => (
  <DatabaseConsumer>
    {({ userData, conversationLog, convoIsLoading, sendMessage }) => (
      <Component
        {...props}
        userData={userData}
        conversationLog={conversationLog}
        convoIsLoading={convoIsLoading}
        sendMessage={sendMessage}
      />
    )}
  </DatabaseConsumer>
);

export default withFirestore;
