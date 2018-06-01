import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserConsumer } from "../../context/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserConsumer>
    {({ userSignedIn }) => (
      <Route
        {...rest}
        render={props =>
          userSignedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </UserConsumer>
);

export default PrivateRoute;
