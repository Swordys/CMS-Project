import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { userSignedIn, userSignedOut } from "../actions/Actions";

import Message from "./message/Message";
import Login from "./login/Login";
import firebase from "../firebase/firestoreAuth";

import "../css/messageApp/app/App.css";

const App = ({ signedIn, signedOut }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      signedIn(user.providerData[0]);
    } else {
      signedOut();
    }
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/chat" exact component={Message} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  signedIn: PropTypes.func.isRequired,
  signedOut: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    signedIn: userSignedIn,
    signedOut: userSignedOut
  }
)(App);
