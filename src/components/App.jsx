import React from "react";
import { Route, Switch } from "react-router-dom";
import "../css/messageApp/app/App.css";


import Message from "./message/Message";
import Login from "./login/Login";

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/chat" exact component={Message} />
    </Switch>
  </div>
);

export default App;
