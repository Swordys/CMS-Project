import React, { Component } from "react";
import { emojify } from "react-emoji";
// import { toArray } from "react-emoji-render";

class Message extends Component {
  renderText = () => {
    const { text } = this.props;

    return (
      <div
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "14px",
          wordBreak: "break-word"
        }}
      >
        <div className="textContain">
          {emojify(text, {
            emojiType: "emojione"
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="messageBoxWrap">
        <div className="messageBoxText">{this.renderText()}</div>
      </div>
    );
  }
}

export default Message;
