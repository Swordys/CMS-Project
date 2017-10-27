import React from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";
import { connect } from "react-redux";

// Helpers
import { processText } from "../../../../helpers/messageHelper";

// Components
import MessagePic from "./MessagePic";

const duration = 300;
const bezier = "ease-in-out";
const defaultStyle = {
  transition: `transform ${duration}ms ${bezier}, opacity 10ms ease-in-out ${duration-15}ms`
};

const MessageText = ({ showPic, noDelay, text, sender, date, nextHeight }) => {
  // console.log(nextHeight);
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { transform: `translate3d(0, ${nextHeight}px, 0)` },
    exited: { opacity: 0 }
  };
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
  noDelay: PropTypes.bool.isRequired,
  nextHeight: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  nextHeight: state.nextHeight
});

export default connect(mapStateToProps)(MessageText);
