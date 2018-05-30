import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UserConsumer } from "../../../context/userContext";

import "../../../css/messageApp/general/loaderIcon.css";
import "../../../css/messageApp/message/messageLog/messageLog.css";

import MessageItem from "./messageItem/MessageItem";

import { loadMessageLog } from "../../../actions/Actions";

class MessageLog extends Component {
  static propTypes = {
    loadMessageLog: PropTypes.func.isRequired,
    userData: PropTypes.shape({
      uid: PropTypes.string
    }),
    messageLog: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    userData: {}
  };

  componentDidMount() {
    this.props.loadMessageLog();
  }

  componentDidUpdate() {
    this.bottom.scrollIntoView();
  }

  renderMessages = userData =>
    this.props.messageLog.map(messageData => {
      const messageItem = (
        <MessageItem
          key={messageData.id}
          sender={userData.uid === messageData.userId}
          {...messageData}
        />
      );

      return messageData.showTimeStamp ? (
        <React.Fragment key={messageData.id}>
          <div className="message-item-date">{messageData.date}</div>
          {messageItem}
        </React.Fragment>
      ) : (
        messageItem
      );
    });

  render() {
    const spinner = this.props.isLoading ? (
      <div className="message-log-load">
        <div className="messageItem_load_icon">
          {Array.from({ length: 9 }, (e, i) => i).map(i => (
            <div key={i} className="load_icon_box" />
          ))}
        </div>
      </div>
    ) : null;

    const bottom = (
      <div
        ref={e => {
          this.bottom = e;
        }}
        style={{ float: "left", clear: "both" }}
      />
    );

    return (
      <UserConsumer>
        {({ userData }) => (
          <div className="convo-wrap">
            {spinner}
            <div className="convo-log">
              {this.renderMessages(userData)}
              {bottom}
            </div>
          </div>
        )}
      </UserConsumer>
    );
  }
}

const mapStateToProps = state => ({
  messageLog: state.userMessages,
  isLoading: state.loadingState
});

export default connect(
  mapStateToProps,
  { loadMessageLog }
)(MessageLog);
