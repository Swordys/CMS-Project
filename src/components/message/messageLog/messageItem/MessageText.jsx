import React from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";

// Components
import MessagePic from "./MessagePic";

const MessageText = ({
  showPic,
  noDelay,
  processArray,
  onlyEmojy,
  sender,
  date,
  nextHeight,
  metaHeight
}) => {
  const combineHeight = nextHeight + metaHeight;
  let duration = 300;

  if (combineHeight > 150) {
    duration = (duration + Math.abs(combineHeight, duration)) / 1.3;
    if (duration > 700) duration = 600;
  }
  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out, opacity 10ms ease-in-out ${duration -
      20}ms`
  };
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { transform: `translate3d(0, ${combineHeight}px, 0)` },
    exited: { opacity: 0 }
  };

  const classObj = {
    msgClass: sender ? "messageItem_textOutbox" : "messageItem_textInbox",
    textClass: ""
  };

  if (onlyEmojy) {
    classObj.msgClass = "messageItem_emoji";
    classObj.textClass = "messageItem_containEmoji";
  }

  const renderPic = (
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

  const renderTextArr =
    processArray &&
    processArray.map(text => {
      if (typeof text === "string") {
        return text;
      }
      return text.className === "inline-emoji" ? (
        <img alt={text.alt} {...text} />
      ) : (
        <a href={text.href} key={text.key} className={text.className}>
          {text.urlText}
        </a>
      );
    });

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
          <div className={classObj.textClass}>{renderTextArr}</div>
        </div>
        <div className="messageItem_timeInfo">{date}</div>
      </div>
      {renderPic}
    </div>
  );
};

MessageText.propTypes = {
  processArray: PropTypes.arrayOf(PropTypes.any).isRequired,
  date: PropTypes.string.isRequired,
  onlyEmojy: PropTypes.bool.isRequired,
  sender: PropTypes.bool.isRequired,
  showPic: PropTypes.bool.isRequired,
  noDelay: PropTypes.bool.isRequired,
  nextHeight: PropTypes.number.isRequired,
  metaHeight: PropTypes.number.isRequired
};

export default MessageText;
