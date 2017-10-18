import React, { Component } from "react";
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";
import uuid from "uuid";
import moment from "moment";
import { connect } from "react-redux";

// Components
import MessageSendFile from "./MessageSendFile";
import MessageSendEmoji from "./MessageSendEmoji";

// Actions
import { sendMessageNow } from "../../../actions/Actions";

class MessageSendBox extends Component {
  state = {
    inputValue: "",
    cursorPosition: 0
  };

  componentWillReceiveProps(nextProps) {
    const { emoji } = nextProps;
    const emojiCurrent = this.props.emoji;
    const isChecking = emoji.id !== emojiCurrent.id;

    if (isChecking) {
      const { inputValue, cursorPosition } = this.state;
      const newMoji = `${emoji.colons} `;
      const newVal =
        inputValue.slice(0, cursorPosition) +
        newMoji +
        inputValue.slice(cursorPosition);

      const newLen = newMoji.length + cursorPosition;
      this.setState({
        inputValue: newVal,
        cursorPosition: newLen
      });
    }
  }

  sendMessage = e => {
    const isShift = e.nativeEvent.shiftKey;
    const isEnter = e.nativeEvent.keyCode === 13;
    const textValue = this.state.inputValue;

    if (isEnter && !isShift) {
      e.preventDefault();
      const checkText = textValue.trim();
      const timeFull = moment().format("YYYY-MM-DD HH:mm:ss");
      const timeMin = moment().format("ddd, h:mm a");
      const timeCheck = moment(timeFull);

      if (checkText) {
        this.setState({
          inputValue: ""
        });

        const { messageLog } = this.props;
        const msgObj = {
          key: uuid(),
          id: uuid(),
          text: checkText,
          date: timeMin,
          dateFull: timeFull,
          timeCheck,
          height: this.textInput.state.height + 25,
          noDelay: false,
          timeStamp: false,
          showPic: false,
          position: 0,
          sender: true
          // sender: Math.random() >= 0.5
        };
        this.props.sendMessageNow(msgObj, messageLog);
      }
    }
  };

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
        <MessageSendEmoji />
      </div>
    );
  }
}

MessageSendBox.propTypes = {
  emoji: PropTypes.objectOf(PropTypes.any).isRequired,
  sendMessageNow: PropTypes.func.isRequired,
  messageLog: PropTypes.arrayOf(PropTypes.object).isRequired
};


const mapStateToProps = state => ({
  messageLog: state.getMessages,
  emoji: state.getSentEmoji
});

export default connect(mapStateToProps, { sendMessageNow })(MessageSendBox);
