import React from "react";
import { UserConsumer } from "../context/userContext";

export const withUserData = Component =>
  function withUserDataComponent(props) {
    return (
      <UserConsumer>
        {({ userState }) => (
          <Component
            {...props}
            signedIn={userState.signedIn}
            userData={userState.userData}
          />
        )}
      </UserConsumer>
    );
  };
