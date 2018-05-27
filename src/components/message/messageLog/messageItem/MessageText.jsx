import React from "react";
import PropTypes from "prop-types";

const MessageText = ({ text, sender, date }) => {
  const classAtr = sender ? "messege-item-text__out" : "messege-item-text__in";

  return (
    <div className={`messege-item-text ${classAtr}`}>
      <div
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "14px",
          wordBreak: "break-word"
        }}
      >
        <div>{text}</div>
      </div>
      <div className="messege-item-time">{date}</div>
    </div>
  );
};

MessageText.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired
};

export default MessageText;
