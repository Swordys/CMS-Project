import React from "react";
import Message from "./message/Message";
import Sidebar from "./sidebar/Sidebar";

import '../../css/messageApp/messenger/messenger.css';

const Messenger = () => (
  <div className="messenger-wrap">
    <Sidebar />
    <Message />
  </div>
);

export default Messenger;
