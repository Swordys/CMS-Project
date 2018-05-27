import React from "react";
import { Route, Switch } from "react-router-dom";
import "../css/messageApp/app/App.css";
// Components
// import Home from "./home/Home";
// import Infobar from "./infobar/Infobar";
// import Login from "./login/Login";
import Message from "./message/Message";
// import Sidebar from "./sidebar/Sidebar";

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/" exact component={Message} />
    </Switch>
  </div>
);

export default App;
