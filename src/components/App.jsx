import React from "react";
import { Switch } from "react-router-dom";
import ConditionRoute from "./general/conditionRoute";

import Login from "./login/Login";
import Message from "./message/Message";

import "../css/messageApp/app/App.css";

const App = () => (
  <div className="App">
    <Switch>
      <ConditionRoute
        condition={{ loggedOut: false, route: "/user" }}
        exact
        path="/login"
        component={Login}
      />
      <ConditionRoute
        condition={{ loggedOut: true, route: "/login" }}
        exact
        path="/user"
        component={Message}
      />
    </Switch>
  </div>
);

export default App;
