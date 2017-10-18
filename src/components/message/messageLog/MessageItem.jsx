import React from "react";
import PropTypes from "prop-types";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

// Helpers
import emojifyText from "../../../helpers/messageHelper";

// Components
import MessagePic from "./MessagePic";

// Styles
import "../../../css/messageApp/message/messageLog/messageItem.css";

const MessageItem = ({ text, date, sender, showPic, id, noDelay }) => {
  const renderText = () => {
    const { textReturnArr, IsOnlyEmojy } = emojifyText(text);

    const classObj = {
      msgClass: sender ? "messageItem_textOutbox" : "messageItem_textInbox",
      textClass: ""
    };

    if (IsOnlyEmojy) {
      classObj.msgClass = "messageItem_emoji";
      classObj.textClass = "messageItem_containEmoji";
    }

    return (
      <div
        className={`${!IsOnlyEmojy
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
          <div className={classObj.textClass}>{textReturnArr}</div>
        </div>
        <div className="messageItem_timeInfo">{date}</div>
      </div>
    );
  };

  const renderPic = () =>
    showPic ? (
      <CSSTransition
        key={id}
        classNames="messagePicTrans"
        timeout={{ enter: 500, exit: 800 }}
      >
        <MessagePic noDelay={noDelay} sender={sender} />
      </CSSTransition>
    ) : (
      undefined
    );

  return (
    <div className={sender ? "messageItem" : "messageItem_inbox"}>
      {renderText()}
      <TransitionGroup>{renderPic()}</TransitionGroup>
    </div>
  );
};

MessageItem.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired,
  noDelay: PropTypes.bool.isRequired,
  showPic: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default MessageItem;
