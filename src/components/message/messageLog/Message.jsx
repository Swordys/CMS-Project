import React, { Component } from "react";
import PropTypes from "prop-types";

// Helpers
import emojifyText from "../../../helpers/messageHelper";

// Components
import MessagePic from "./MessagePic";

class Message extends Component {
  renderText = () => {
    const { text, date } = this.props;
    const { textReturnArr, IsOnlyEmojy } = emojifyText(text);

    const msgStyle = {
      whiteSpace: "pre-wrap",
      fontSize: "14px",
      wordBreak: "break-word"
    };

    let msgClass = "messageBoxText";
    let textClass = "textContain";
    if (IsOnlyEmojy) {
      msgClass = "messageBoxEmoji";
      textClass = "textContainEmoji";
    }

    return (
      <div className={msgClass}>
        <div style={msgStyle}>
          <div className={textClass}>{textReturnArr}</div>
        </div>
        <div className="timeInfo">{date}</div>
      </div>
    );
  };

  renderPic = () => {
    const { picProp } = this.props;
    if (picProp.showPic) {
      return <MessagePic {...picProp} />;
    }
    return null;
  };

  render() {
    return (
      <div className="messageBoxWrap">
        {this.renderText()}
        {this.renderPic()}
      </div>
    );
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  picProp: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Message;
