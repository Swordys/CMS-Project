import React from "react";
import PropTypes from "prop-types";

// Components
import MessageText from "./MessageText";
import MessagePic from "./MessagePic";
// Styles
import "../../../../css/messageApp/message/messageLog/messageItem.css";

const MessageItem = props => (
  <div
    className={`messege-item ${
      props.sender ? "messege-item__out" : "messege-item__in"
    }`}
    style={{ alignItems: `${props.sender ? "flex-end" : "flex-start"}` }}
  >
    <MessageText {...props} />
    <MessagePic sender={props.sender} />
  </div>
);

MessageItem.propTypes = {
  sender: PropTypes.bool.isRequired
};

export default MessageItem;
