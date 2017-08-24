import React, { Component } from "react";

class Message extends Component {
  renderText = () => {
    const { msg } = this.props;
    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
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
