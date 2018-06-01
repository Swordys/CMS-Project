import React, { Component } from "react";
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";

import MessageSendFile from "./MessageSendFile";

class MessageSendMessage extends Component {
  static propTypes = {
    userData: PropTypes.shape({
      uid: PropTypes.string
    }),
    sendMessage: PropTypes.func
  };

  static defaultProps = {
    userData: {},
    sendMessage: undefined
  };

  state = {
    inputValue: ""
  };

  handleTypeEvent = e => {
    const isShift = e.nativeEvent.shiftKey;
    const isEnter = e.nativeEvent.keyCode === 13;
    const textValue = this.state.inputValue;

    if (isEnter && !isShift) {
      e.preventDefault();
      this.handleSendMessage(textValue);
    }
  };

  handleSendMessage = text => {
    const trimText = text.trim();

    if (trimText) {
      this.setState({
        inputValue: ""
      });

      const { userData, sendMessage } = this.props;
      sendMessage(trimText, userData.uid);
    }
  };

  render() {
    return (
      <div className="message-send">
        <MessageSendFile />
        <div className="message-send-box">
          <Textarea
            onKeyDown={this.handleTypeEvent}
            onChange={e => {
              this.setState({ inputValue: e.target.value });
            }}
            value={this.state.inputValue}
            className="message-send-box-text"
            placeholder="Type a message"
          />
        </div>
      </div>
    );
  }
}

export default MessageSendMessage;
