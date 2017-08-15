import React, { Component } from "react";
import "./css/message.css";

// components
import MessageLog from "./messageLog/MessageLog";
import MessageSend from "./messageSend/MessageSend";

class Message extends Component {
  render() {
    return (
      <div className="messageWrap">
        <MessageLog />
        <MessageSend />
      </div>
    );
  }
}

export default Message;
