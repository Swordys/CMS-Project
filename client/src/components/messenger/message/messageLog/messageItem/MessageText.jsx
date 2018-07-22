import React from "react";
import PropTypes from "prop-types";

const MessageText = ({ messageText, sender, messageDate }) => {
  const classAtr = sender ? "message-item-text__out" : "message-item-text__in";

  return (
    <div className={`message-item-text ${classAtr}`}>
      <div className="message-item-time">{messageDate}</div>
      <div
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "14px",
          wordBreak: "break-word"
        }}
      >
        <div>{messageText}</div>
      </div>
    </div>
  );
};

MessageText.propTypes = {
  messageText: PropTypes.string.isRequired,
  messageDate: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired
};

export default MessageText;
