import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/messageLog.css";

// Components
import Message from "./Message";

class MessageLog extends Component {
  renderMessages = () => {
    const { messageLog } = this.props;
    return messageLog.map(msg => <Message {...msg} />);
  };

  componentDidUpdate() {
    this.bottomMsg.scrollIntoView();
  }

  componentDidMount() {
    this.bottomMsg.scrollIntoView();
  }

  render() {
    return (
      <div className="messageLogMain">
        <div className="messageLogWrap">
          {this.renderMessages()}
          <div ref={e => (this.bottomMsg = e)} className="bottom" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageLog: state.getMessages
});

export default connect(mapStateToProps, null)(MessageLog);
