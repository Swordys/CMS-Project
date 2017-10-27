import React from "react";
import PropTypes from "prop-types";
import CSSTransition from "react-transition-group/CSSTransition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Transition from "react-transition-group/Transition";

// Helpers
import { processText } from "../../../../helpers/messageHelper";

// Components
import MessagePic from "./MessagePic";

const duration = 250;
const bezier = "cubic-bezier(0.65, 0.36, 0.34, 0.91)";
const defaultStyle = {
  transition: `transform ${duration}ms ${bezier}, opacity 10ms ease-in-out 240ms`
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { transform: "translate3d(0, 41px, 0)" },
  exited: { opacity: 0 }
};

const MessageText = ({ showPic, noDelay, text, sender, date }) => {
  const { textArr, onlyEmojy } = processText(text, sender);
  const classObj = {
    msgClass: sender ? "messageItem_textOutbox" : "messageItem_textInbox",
    textClass: ""
  };

  if (onlyEmojy) {
    classObj.msgClass = "messageItem_emoji";
    classObj.textClass = "messageItem_containEmoji";
  }

  const renderPicV2 = (
    <Transition appear={!noDelay} unmountOnExit in={showPic} timeout={duration}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <MessagePic noDelay={noDelay} sender={sender} />
        </div>
      )}
    </Transition>
  );

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
      {renderPicV2}
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
