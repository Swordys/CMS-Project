import React from "react";
import { Route } from "react-router-dom";
import "../css/messageApp/app/App.css";
// Components
import Home from "./home/Home";
import Infobar from "./infobar/Infobar";
import Login from "./login/Login";
import Message from "./message/Message";
import Sidebar from "./sidebar/Sidebar";


const App = () => (
  <div className="App">
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/user" exact component={Sidebar} />
    <Route path="/user" exact component={Message} />
    <Route path="/user" exact component={Infobar} />
  </div>
);

export default App;
