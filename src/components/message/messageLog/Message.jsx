import React, { Component } from "react";

class Message extends Component {
  render() {
    const { msg } = this.props;

    return (
      <div className='messageBoxWrap'>
        <span>
          {msg}
        </span>
      </div>
    );
  }
}

export default Message;
