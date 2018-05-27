import React, { Component } from "react";
import ProptTypes from "prop-types";
import { connect } from "react-redux";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

import "../../../css/messageApp/general/loaderIcon.css";
import "../../../css/messageApp/message/messageLog/messageLog.css";
import "../../../css/messageApp/message/messageLog/transitions/messageTrans.css";

import MessageItem from "./messageItem/MessageItem";

import { loadMessageLog } from "../../../actions/Actions";

const MessageTransition = props => (
  <CSSTransition {...props} classNames="message-item-anim" timeout={400} />
);

class MessageLog extends Component {
  static propTypes = {
    loadMessageLog: ProptTypes.func.isRequired,
    messageLog: ProptTypes.arrayOf(ProptTypes.object).isRequired,
    isLoading: ProptTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.loadMessageLog();
  }

  componentDidUpdate() {
    this.bottom.scrollIntoView();
  }

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

    const messages = this.props.messageLog.map(messageData => {
      const messageItem = (
        <MessageTransition key={messageData.id}>
          <MessageItem {...messageData} />
        </MessageTransition>
      );

      if (messageData.showTimeStamp) {
        return (
          <React.Fragment key={messageData.dateFull}>
            <MessageTransition>
              <div className="message-item-date">{messageData.date}</div>
            </MessageTransition>
            {messageItem}
          </React.Fragment>
        );
      }

      return messageItem;
    });

    const bottom = (
      <div
        ref={e => {
          this.bottom = e;
        }}
        style={{ float: "left", clear: "both" }}
      />
    );

    return (
      <div className="convo-wrap">
        {spinner}
        <div className="convo-log">
          <TransitionGroup component={null}>{messages}</TransitionGroup>
          {bottom}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageLog: state.getMessages,
  isLoading: state.loadingState
});

export default connect(
  mapStateToProps,
  { loadMessageLog }
)(MessageLog);
