import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { firebaseAuth } from "../../firebase/index";

export default class ConditionRoute extends Component {
  state = {
    pending: true,
    loggedIn: undefined
  };

  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      this.setState({
        pending: false,
        loggedIn: !!user
      });
    });
  }

  render() {
    const { condition, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={renderProps => {
          if (this.state.pending) return null;
          return condition.loggedOut === this.state.loggedIn ? (
            <Component {...renderProps} />
          ) : (
            <Redirect
              to={{
                pathname: condition.route,
                state: { from: renderProps.location }
              }}
            />
          );
        }}
      />
    );
  }
}
