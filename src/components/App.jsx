import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import ConditionRoute from "./general/conditionRoute";

import Login from "./login/Login";
import Messenger from "./messenger/Messenger";

import "../css/messageApp/app/App.css";

const App = () => (
  <div className="App">
    <Link style={{ position: "fixed", top: 0, left: "50%", zIndex: 5000 }} href to="/user">
      USER
    </Link>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ConditionRoute exact path="/user" component={Messenger} />
    </Switch>
  </div>
);

export default App;
