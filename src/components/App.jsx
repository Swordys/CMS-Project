import React from "react";
import "./css/App.css";

// Components
import Sidebar from "./sidebar/Sidebar";
import MessageWrap from "./message/MessageWrap";

const App = () => (
  <div className="App">
    <Sidebar />
    <MessageWrap />
  </div>
);

export default App;
