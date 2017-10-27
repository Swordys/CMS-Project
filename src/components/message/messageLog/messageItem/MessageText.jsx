import React from "react";
import PropTypes from "prop-types";
import CSSTransition from "react-transition-group/CSSTransition";
import TransitionGroup from "react-transition-group/TransitionGroup";

// Helpers
import { processText } from "../../../../helpers/messageHelper";

// Components
import MessagePic from "./MessagePic";

const MessageText = ({ showPic, id, noDelay, text, sender, date }) => {
  const { textArr, onlyEmojy } = processText(text, sender);
  const classObj = {
    msgClass: sender ? "messageItem_textOutbox" : "messageItem_textInbox",
    textClass: ""
  };

  if (onlyEmojy) {
    classObj.msgClass = "messageItem_emoji";
    classObj.textClass = "messageItem_containEmoji";
  }

  const renderPic = showPic ? (
    <CSSTransition
      key={id}
      classNames="messagePicTrans"
      timeout={{ enter: 500, exit: 800 }}
    >
      <MessagePic noDelay={noDelay} sender={sender} />
    </CSSTransition>
  ) : null;

  return (
    <div className="messageItem_text_container">
      <div
        className={`${!onlyEmojy
          ? "messageItem_text"
          : ""} ${classObj.msgClass}`}
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
      <TransitionGroup>{renderPic}</TransitionGroup>
    </div>
  );
};

MessageText.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired,
  showPic: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  noDelay: PropTypes.bool.isRequired
};

export default MessageText;
