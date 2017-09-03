import React, { Component } from "react";

class Message extends Component {

  renderText = () => {
    const { text } = this.props;
    return <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>;
  };

  render() {
    return (
      <div className="messageBoxWrap">
        <div>{this.renderText()}</div>
      </div>
    );
  }
}

export default Message;
