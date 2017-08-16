import React, { Component } from "react";
import Textarea from "react-textarea-autosize";
import uuid from "uuid";
import { connect } from "react-redux";

// Actions
import { sendMessage } from "../../../actions/Actions.js";

class MessageSendBox extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(e) {
    const isShift = e.nativeEvent.shiftKey;
    const isEnter = e.nativeEvent.keyCode === 13;
    const textValue = e.target.value;

    if (isEnter && !isShift) {
      e.preventDefault();
      if (textValue) {
        const { send } = this.props;

        e.target.value = "";
        let msgObj = {
          key: uuid(),
          msg: textValue
        };
        send(msgObj);
        // console.log(textValue);
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

const mapDispatchToProps = dispatch => ({
  send: message => {
    dispatch(sendMessage(message));
  }
});

export default connect(null, mapDispatchToProps)(MessageSendBox);
