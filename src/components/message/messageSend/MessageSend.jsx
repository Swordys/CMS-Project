import React, { Component } from "react";
import "./css/messageSend.css";

// components
import MessageSendBox from "./MessageSendBox";

class MessageSend extends Component {
  render() {
    return (
      <div className="messageSendWrap">
        <MessageSendBox />
      </div>
    );
  }
}

export default MessageSend;
