import React, { Component } from "react";

class Message extends Component {
  renderText = () => {
    const { text } = this.props;
    return (
      <div style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>{text}</div>
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
