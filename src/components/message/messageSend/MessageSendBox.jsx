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
      let timeFull = moment().format("MMM Do YYYY, h:mm a");
      let timeMin = moment().format("dddd, h:mm a");
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
          timeStamp: false
        };

        sendNow(msgObj, messageLog);
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
  sendNow: (message, log) => {
    dispatch(sendMessageNow(message, log));
  }
});

const mapStateToProps = state => ({
  messageLog: state.getMessages
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageSendBox);
