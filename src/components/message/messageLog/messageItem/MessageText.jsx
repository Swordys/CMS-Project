import React from "react";
import PropTypes from "prop-types";

const MessageText = ({ text, sender, date }) => {
  const classAtr = sender ? "message-item-text__out" : "message-item-text__in";

  return (
    <div className={`message-item-text ${classAtr}`}>
      <div className="message-item-time">{date}</div>
      <div
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "14px",
          wordBreak: "break-word"
        }}
      >
        <div>{text}</div>
      </div>
    </div>
  );
};

MessageText.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired
};

export default MessageText;
