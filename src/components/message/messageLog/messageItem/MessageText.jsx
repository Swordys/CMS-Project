import React from "react";
import PropTypes from "prop-types";

const MessageText = ({ processArray, sender, date }) => {
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
        <div>{processArray}</div>
      </div>
      <div className="messege-item-time">{date}</div>
    </div>
  );
};

MessageText.propTypes = {
  processArray: PropTypes.arrayOf(PropTypes.any).isRequired,
  date: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired
};

export default MessageText;
