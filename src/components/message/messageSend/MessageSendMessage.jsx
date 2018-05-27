import React, { Component } from "react";
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";
import uuid from "uuid";
import dayjs from "dayjs";
import { connect } from "react-redux";

// Components
import MessageSendFile from "./MessageSendFile";

// Actions
import { sendMessageNow } from "../../../actions/Actions";

class MessageSendMessage extends Component {
  static propTypes = {
    sendMessageNow: PropTypes.func.isRequired,
    messageLog: PropTypes.arrayOf(PropTypes.object).isRequired
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

      const timeFull = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const timeMin = dayjs().format("dddd, h:mm a");

      const { messageLog } = this.props;
      const sender = Math.random() >= 0.5;
      const msgObj = {
        id: uuid(),
        text: trimText,
        date: timeMin,
        dateFull: timeFull,
        showTimeStamp: false,
        showPic: false,
        sender
      };
      this.props.sendMessageNow(msgObj, messageLog);
    }
  };

  render() {
    return (
      <div className="messageSendMessage">
        <MessageSendFile />
        <div className="messageSendMessage_textArea">
          <Textarea
            onKeyPress={this.handleTypeEvent}
            onChange={e => {
              this.setState({ inputValue: e.target.value });
            }}
            value={this.state.inputValue}
            className="messageSendMessage_textArea_text"
            placeholder="Type a message"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageLog: state.getMessages,
  emoji: state.getSentEmoji
});

export default connect(mapStateToProps, {
  sendMessageNow
})(MessageSendMessage);
