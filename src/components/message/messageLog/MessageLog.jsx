import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/messageLog.css";

// Components
import Message from "./Message";

class MessageLog extends Component {
  renderMessages() {
    const { messageLog } = this.props;
    return messageLog.map(msg => <Message {...msg} />);
  }

  render() {
    return (
      <div className="messageLogWrap">
        {this.renderMessages()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageLog: state.getMessages
});

export default connect(mapStateToProps, null)(MessageLog);
