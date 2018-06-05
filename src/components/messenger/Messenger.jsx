import React from "react";
import Header from "./header/Header";
import Message from "./message/Message";
import Sidebar from "./sidebar/Sidebar";
import { DatabaseProvider } from "../../context/dataContext";

import "../../css/messageApp/messenger/messenger.css";

const Messenger = () => (
  <DatabaseProvider>
    <div className="messenger-wrap">
      <div className="messenger-header-wrap">
        <Header />
      </div>
      <div className="messenger-body-wrap">
        <Sidebar />
        <Message />
      </div>
    </div>
  </DatabaseProvider>
);

export default Messenger;
