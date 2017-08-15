import React, { Component } from "react";
import Textarea from "react-textarea-autosize";

class MessageSendBox extends Component {
  sendMessage(e) {
    // console.log(e.nativeEvent.keyCode);

    const isShift = e.nativeEvent.shiftKey;
    const isEnter = e.nativeEvent.keyCode === 13;
    const textValue = e.target.value;

    if (isEnter && !isShift) {
      e.preventDefault();
      if (textValue) {
        e.target.value = "";
        console.log(textValue);
      }
    }
  }

  render() {
    return (
      <Textarea
        onKeyPress={this.sendMessage}
        className="sendThatText"
        placeholder="Type a message"
      />
    );
  }
}

export default MessageSendBox;
