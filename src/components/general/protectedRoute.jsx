import React from "react";
import { Route, Redirect } from "react-router-dom";
import { firebaseAuth } from "../../firebase/index";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      firebaseAuth.currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
