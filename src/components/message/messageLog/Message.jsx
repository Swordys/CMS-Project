import React, { Component } from "react";
import { emojify } from "react-emoji";

class Message extends Component {
  renderText = () => {
    const { text } = this.props;
    const emojiText = emojify(text, {
      emojiType: "emojione"
    });

    const IsOnlyEmojy = emojiText.every(e => e.key);

    let msgClass = "messageBoxText";
    let textClass = "textContain";
    if (IsOnlyEmojy) {
      msgClass = "messageBoxEmoji";
      textClass = "textContainEmoji";
    }

    return (
      <div className={msgClass}>
        <div
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            wordBreak: "break-word"
          }}
        >
          <div className={textClass}>{emojiText}</div>
        </div>
      </div>
    );
  };

  render() {
    return <div className="messageBoxWrap">{this.renderText()}</div>;
  }
}

export default Message;
