import React, { Component } from "react";
import Textarea from "react-textarea-autosize";
import uuid from "uuid";
import { connect } from "react-redux";

// Components
import MessageSendFile from "./MessageSendFile";
import MessageSendSmile from "./MessageSendSmile";

// Actions
import { sendMessage } from "../../../actions/Actions.js";

class MessageSendBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage = e => {
    const isShift = e.nativeEvent.shiftKey;
    const isEnter = e.nativeEvent.keyCode === 13;
    const textValue = e.target.value;

    if (isEnter && !isShift) {
      e.preventDefault();
      let checkText = textValue.trim();
      if (checkText) {
        this.setState({
          inputValue: ""
        });

        const { send } = this.props;

        let msgObj = {
          key: uuid(),
          msg: checkText
        };

        send(msgObj);
      }
    }
  };

  render() {
    return (
      <div className="sendThatTextWrap">
        <MessageSendFile />
        <Textarea
          onKeyPress={this.sendMessage}
          onChange={e => this.setState({ inputValue: e.target.value })}
          value={this.state.inputValue}
          className="sendThatText"
          placeholder="Type a message"
        />
        <MessageSendSmile />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  send: message => {
    dispatch(sendMessage(message));
  }
});

export default connect(null, mapDispatchToProps)(MessageSendBox);
