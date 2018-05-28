import React from "react";
import PropTypes from "prop-types";

import MessageText from "./MessageText";
import MessagePic from "./MessagePic";

import "../../../../css/messageApp/message/messageLog/messageItem.css";

const MessageItem = props => (
  <div
    className={`message-item ${
      props.sender ? "message-item__out" : "message-item__in"
    }`}
    style={{ alignItems: `${props.sender ? "flex-end" : "flex-start"}` }}
  >
    <MessageText {...props} />
    <MessagePic userId={props.userId} />
  </div>
);

MessageItem.propTypes = {
  sender: PropTypes.bool.isRequired
};

export default MessageItem;
