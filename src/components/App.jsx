import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./general/protectedRoute";

import Login from "./login/Login";
import Message from "./message/Message";

import "../css/messageApp/app/App.css";


const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/user" component={Message} />
    </Switch>
  </div>
);

export default App;
