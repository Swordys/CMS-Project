import React from "react";
import Header from "./header/Header";
import Message from "./message/Message";
import Sidebar from "./sidebar/Sidebar";

import "../../css/messageApp/messenger/messenger.css";

const Messenger = () => (
  <div className="messenger-wrap">
    <div className="messenger-header-wrap">
      <Header />
    </div>
    <div className="messenger-body-wrap">
      <Sidebar />
      <Message />
    </div>
  </div>
);

export default Messenger;
