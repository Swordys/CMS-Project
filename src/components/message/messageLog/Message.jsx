import React, { Component } from "react";
import PropTypes from "prop-types";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import './css/picTrans.css';

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


const PicTransition = props => (
  <CSSTransition
    {...props}
    classNames="picPop"
    timeout={{ enter: 500, exit: 500 }}
  />
);

class Message extends Component {
  renderText = () => {
    const { text, date, sender } = this.props;
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

  renderPic = () => {
    const { picProp, noDelay, sender } = this.props;
    if (picProp.showPic) {
      return (
        <PicTransition key={this.props.id}>
          <MessagePic sender={sender} noDelay={noDelay} {...picProp} />
        </PicTransition>
      );
    }
    return null;
  };

  render() {
    const { sender } = this.props;
    return (
      <div className={sender ? "messageBoxWrap" : "messageBoxWrapInbox"}>
        {this.renderText()}
        <TransitionGroup>{this.renderPic()}</TransitionGroup>
      </div>
    );
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired,
  noDelay: PropTypes.bool.isRequired,
  picProp: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Message;
