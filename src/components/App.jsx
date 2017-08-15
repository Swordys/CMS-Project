import React, { Component } from "react";
import "../css/App.css";

// components
import Sidebar from "./sidebar/Sidebar";
import MessageWrap from "./message/MessageWrap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <MessageWrap />
      </div>
    );
  }
}

export default App;
