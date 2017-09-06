import React, { Component } from "react";
import ReactEmoji from "react-emoji";

class Message extends Component {
  renderText = () => {
    const { text } = this.props;
    return (
      <div
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "14px"
        }}
      >
        <span>{ReactEmoji.emojify(text)}</span>
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

// style={{
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexShrink: 0
// }}