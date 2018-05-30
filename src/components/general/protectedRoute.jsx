import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserConsumer } from "../../context/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserConsumer>
    {({ signedIn }) => (
      <Route
        {...rest}
        render={props =>
          signedIn ? (
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
