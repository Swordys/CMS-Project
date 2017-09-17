import React, { Component } from "react";
import Textarea from "react-textarea-autosize";
import uuid from "uuid";
import moment from "moment";
import { connect } from "react-redux";

// Components
import MessageSendFile from "./MessageSendFile";
import MessageSendSmile from "./MessageSendSmile";

// Actions
import { sendMessageNow } from "../../../actions/Actions.js";

class MessageSendBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      cursorPosition: 0
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
      let timeFull = moment().format("MMM Do YYYY, h:mm a");
      let timeMin = moment().format("dddd, h:mm a");
      let timeHour = moment().format("H:m");

      if (checkText) {
        this.setState({
          inputValue: ""
        });

        const { sendNow, messageLog } = this.props;
        let msgObj = {
          key: uuid(),
          text: checkText,
          date: timeMin,
          dateFull: timeFull,
          id: uuid(),
          timeStamp: false,
          timeHour
        };
        sendNow(msgObj, messageLog);
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    const { emoji } = nextProps;
    const emojiCurrent = this.props.emoji;
    const isChecking = emoji.id !== emojiCurrent.id;

    if (isChecking) {
      console.log(emoji);
      const { inputValue, cursorPosition } = this.state;
      const newVal =
        inputValue.slice(0, cursorPosition) +
        emoji.native +
        inputValue.slice(cursorPosition);

      let newLen = emoji.native.length + cursorPosition;
      this.setState({
        inputValue: newVal,
        cursorPosition: newLen
      });
    }
  }

  render() {
    return (
      <div className="sendThatTextWrap">
        <MessageSendFile />
        <Textarea
          ref={input => {
            this.textInput = input;
          }}
          onKeyPress={this.sendMessage}
          onKeyUp={e => {
            const value = e.target.selectionStart;
            const { cursorPosition } = this.state;
            if (value !== cursorPosition) {
              this.setState({
                cursorPosition: value
              });
            }
          }}
          onClick={e => {
            const value = e.target.selectionStart;
            const { cursorPosition } = this.state;
            if (value !== cursorPosition) {
              this.setState({
                cursorPosition: value
              });
            }
          }}
          onChange={e => {
            this.setState({ inputValue: e.target.value });
          }}
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
  sendNow: (message, log) => {
    dispatch(sendMessageNow(message, log));
  }
});

const mapStateToProps = state => ({
  messageLog: state.getMessages,
  emoji: state.getSentEmoji
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageSendBox);
