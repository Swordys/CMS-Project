import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { firebaseAuth } from "../../firebase/index";

export default class ConditionRoute extends Component {
  state = {
    pending: true,
    loggedIn: undefined
  };

  componentDidMount() {
    this.authWatch = firebaseAuth.onAuthStateChanged(user => {
      this.setState({
        pending: false,
        loggedIn: !!user
      });
    });
  }

  componentWillUnmount() {
    this.authWatch();
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={renderProps => {
          if (this.state.pending) return null;
          return this.state.loggedIn ? (
            <Component {...renderProps} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: renderProps.location }
              }}
            />
          );
        }}
      />
    );
  }
}
