import React, { Component } from "react";
import ProptTypes from "prop-types";
import { connect } from "react-redux";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

// CSS
import "../../../css/messageApp/general/loaderIcon.css";
import "../../../css/messageApp/message/messageLog/messageLog.css";
import "../../../css/messageApp/message/messageLog/transitions/messageTrans.css";

// Components
import MessageItem from "./messageItem/MessageItem";

// Actions
import { closeEmoji, loadMessageLog } from "../../../actions/Actions";

const MessageTransition = props => (
  <CSSTransition {...props} classNames="messageItemTrans" timeout={400} />
);

class MessageLog extends Component {
  static propTypes = {
    messageLog: ProptTypes.arrayOf(ProptTypes.object).isRequired,
    loadMessageLog: ProptTypes.func.isRequired,
    closeEmoji: ProptTypes.func.isRequired,
    isLoading: ProptTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.loadMessageLog();
    this.bottomMsg.scrollIntoView();
  }

  componentDidUpdate() {
    this.bottomMsg.scrollIntoView();
  }

  renderMessages = () => {
    const { messageLog } = this.props;
    const retunLog = [];
    const bottomMsg = (
      <MessageTransition key="bot">
        <div
          ref={e => {
            this.bottomMsg = e;
          }}
          style={{ float: "left", clear: "both" }}
        />
      </MessageTransition>
    );

    messageLog.forEach(messageData => {
      const messageItem = (
        <MessageTransition key={messageData.id}>
          <MessageItem {...messageData} />
        </MessageTransition>
      );

      if (messageData.showTimeStamp) {
        retunLog.push(
          <MessageTransition key={messageData.dateFull}>
            <div className="message-item-date">{messageData.date}</div>
          </MessageTransition>
        );
      }
      retunLog.push(messageItem);
    }, this);

    retunLog.push(bottomMsg);
    return retunLog;
  };

  renderLoading = () => {
    const { isLoading } = this.props;
    return isLoading ? (
      <div className="message-log-load">
        <div className="messageItem_load_icon">
          {Array.from({ length: 9 }, (e, i) => i).map(i => (
            <div key={i} className="load_icon_box" />
          ))}
        </div>
      </div>
    ) : null;
  };

  render() {
    return (
      <div className="convo-wrap">
        {this.renderLoading()}
        <div className="convo-log">
          <TransitionGroup component={null}>
            {this.renderMessages()}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageLog: state.getMessages,
  isLoading: state.loadingState
});

export default connect(mapStateToProps, { closeEmoji, loadMessageLog })(
  MessageLog
);
