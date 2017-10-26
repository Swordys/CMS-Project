import React from "react";
import PropTypes from "prop-types";

// Helpers
import { processText } from "../../../../helpers/messageHelper";

const MessageText = ({ text, sender, date }) => {
  const { textArr, onlyEmojy } = processText(text, sender);
  const classObj = {
    msgClass: sender ? "messageItem_textOutbox" : "messageItem_textInbox",
    textClass: ""
  };

  if (onlyEmojy) {
    classObj.msgClass = "messageItem_emoji";
    classObj.textClass = "messageItem_containEmoji";
  }

  return (
    <div
      className={`${!onlyEmojy ? "messageItem_text" : ""} ${classObj.msgClass}`}
    >
      <div
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "14px",
          wordBreak: "break-word"
        }}
      >
        <div className={classObj.textClass}>{textArr}</div>
      </div>
      <div className="messageItem_timeInfo">{date}</div>
    </div>
  );
};

MessageText.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired
};

export default MessageText;
