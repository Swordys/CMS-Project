import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userSignedIn, userSignedOut } from "../actions/Actions";
import PrivateRoute from "./general/protectedRoute";

import firebase from "../firebase/firestoreAuth";

import Login from "./login/Login";
import Message from "./message/Message";

import "../css/messageApp/app/App.css";

const App = ({ signedIn, signedOut }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const userData = {
        phone: user.phoneNumber,
        uid: user.uid
      };
      console.log(userData);
      signedIn(userData);
    } else {
      signedOut();
    }
  });

  // firebase.auth().signOut();
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/user" component={Message} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  signedIn: PropTypes.func.isRequired,
  signedOut: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    {
      signedIn: userSignedIn,
      signedOut: userSignedOut
    }
  )(App)
);
