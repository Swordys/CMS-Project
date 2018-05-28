import React, { Component } from "react";
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";
import uuid from "uuid";
import dayjs from "dayjs";
import { connect } from "react-redux";
import socketClient from "../../../../socket/socketClient";

import MessageSendFile from "./MessageSendFile";

// Actions
import { sendMessage, pushMessageToClient } from "../../../../actions/Actions";

class MessageSendMessage extends Component {
  static propTypes = {
    messageLog: PropTypes.arrayOf(PropTypes.object).isRequired,
    sendMessage: PropTypes.func.isRequired,
    pushMessageToClient: PropTypes.func.isRequired
  };

  state = {
    inputValue: ""
  };

  componentDidMount() {
    socketClient.on("RECEIVE_MESSAGE", message => {
      this.props.pushMessageToClient(message);
    });
  }

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

      const timeFull = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const timeMin = dayjs().format("dddd, h:mm a");

      const { messageLog } = this.props;
      const sender = Math.random() >= 0.5;
      const chatID = sender ? "chat0" : "chat1";

      const msgObj = {
        chatID,
        id: uuid(),
        text: trimText,
        date: timeMin,
        dateFull: timeFull,
        showTimeStamp: false,
        showPic: true,
        sender
      };
      this.props.sendMessage(msgObj, messageLog);
    }
  };

  render() {
    return (
      <div className="message-send">
        <MessageSendFile />
        <div className="message-send-box">
          <Textarea
            onKeyPress={this.handleTypeEvent}
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

const mapStateToProps = state => ({
  messageLog: state.getMessages
});

export default connect(
  mapStateToProps,
  {
    sendMessage,
    pushMessageToClient
  }
)(MessageSendMessage);
