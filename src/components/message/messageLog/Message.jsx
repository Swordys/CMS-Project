import React, { Component } from "react";

class Message extends Component {
  renderText = () => {
    let { msg } = this.props;
    msg = msg.trim();
    return (
      <div style={{ whiteSpace: "pre-line" }}>
        {msg}
      </div>
    );
  };
  render() {
    return (
      <div className="messageBoxWrap">
        <div>
          {this.renderText()}
        </div>
      </div>
    );
  }
}

export default Message;
