import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ signedIn, component: Component, ...rest }) => (
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
);

export default connect(state => ({
  signedIn: state.userSignediIn
}))(PrivateRoute);
