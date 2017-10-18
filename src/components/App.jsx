import React from "react";
import '../css/messageApp/app/App.css';

// Components
import Sidebar from "./sidebar/Sidebar";
import Message from "./message/Message";

const App = () => (
  <div className="App">
    <Sidebar />
    <Message />
  </div>
);

export default App;
