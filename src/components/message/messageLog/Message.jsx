import React from "react";
import PropTypes from "prop-types";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import "./css/picTrans.css";

// Helpers
import emojifyText from "../../../helpers/messageHelper";

// Components
import MessagePic from "./MessagePic";

// Styles
const msgStyle = {
  whiteSpace: "pre-wrap",
  fontSize: "14px",
  wordBreak: "break-word"
};
const Message = ({ text, date, sender, showPic, id, noDelay }) => {
  const renderText = () => {
    const { textReturnArr, IsOnlyEmojy } = emojifyText(text);

    const classObj = {
      msgClass: sender ? "messageBoxText" : "messageBoxTextInbox"
    };

    if (IsOnlyEmojy) {
      classObj.msgClass = "messageBoxEmoji";
      classObj.textClass = "textContainEmoji";
    }

    return (
      <div className={classObj.msgClass}>
        <div style={msgStyle}>
          <div className={classObj.textClass}>{textReturnArr}</div>
        </div>
        <div className="timeInfo">{date}</div>
      </div>
    );
  };

  const renderPic = () =>
    showPic ? (
      <CSSTransition
        key={id}
        classNames="picPop"
        timeout={{ enter: 500, exit: 800 }}
      >
        <MessagePic noDelay={noDelay} sender={sender} />
      </CSSTransition>
    ) : (
      undefined
    );

  return (
    <div className={sender ? "messageBoxWrap" : "messageBoxWrapInbox"}>
      {renderText()}
      <TransitionGroup>{renderPic()}</TransitionGroup>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired,
  noDelay: PropTypes.bool.isRequired,
  showPic: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default Message;
