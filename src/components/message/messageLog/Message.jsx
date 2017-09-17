import React, { Component } from "react";
import emojifyText from "../../../helpers/messageHelper.js";

class Message extends Component {
  renderText = () => {
    const { text } = this.props;
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
      </div>
    );
  };

  render() {
    return <div className="messageBoxWrap">{this.renderText()}</div>;
  }
}

export default Message;
