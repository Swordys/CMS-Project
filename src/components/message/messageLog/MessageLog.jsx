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
import EmojiBox from "../../general/EmojiBox";

// Actions
import { closeEmoji, loadMessageLog } from "../../../actions/Actions";

const MessageTransition = props => (
  <CSSTransition
    {...props}
    classNames="messageItemTrans"
    timeout={{ enter: 400, exit: 400 }}
  />
);

class MessageLog extends Component {
  static propTypes = {
    messageLog: ProptTypes.arrayOf(ProptTypes.object).isRequired,
    loadMessageLog: ProptTypes.func.isRequired,
    closeEmoji: ProptTypes.func.isRequired,
    isLoading: ProptTypes.bool.isRequired,
    nextHeight: ProptTypes.number.isRequired,
    metaHeight: ProptTypes.number.isRequired
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
    const bottomMsg = (
      <MessageTransition key="bot">
        <div
          ref={e => {
            this.bottomMsg = e;
          }}
          className="bottom"
        />
      </MessageTransition>
    );

    const retunLog = [];
    messageLog.forEach(messageObj => {
      const retItem = (
        <MessageTransition key={messageObj.key}>
          <MessageItem
            metaHeight={this.props.metaHeight}
            nextHeight={this.props.nextHeight}
            {...messageObj}
          />
        </MessageTransition>
      );

      if (messageObj.timeStamp) {
        retunLog.push(
          <MessageTransition key={messageObj.id}>
            <div className="messageItem_date">{messageObj.date}</div>
          </MessageTransition>
        );
      }
      retunLog.push(retItem);
    }, this);

    retunLog.push(bottomMsg);
    return retunLog;
  };

  renderLoading = () => {
    const { isLoading } = this.props;
    return isLoading ? (
      <div className="messageLog_load">
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
      <div
        role="presentation"
        onClick={() => this.props.closeEmoji()}
        onKeyUp={k => k}
        className="messageLog"
      >
        {this.renderLoading()}
        <EmojiBox />
        <TransitionGroup className="messageLog_list">
          {this.renderMessages()}
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageLog: state.getMessages,
  isLoading: state.loadingState,
  nextHeight: state.nextHeight,
  metaHeight: state.metaHeight
});

export default connect(mapStateToProps, { closeEmoji, loadMessageLog })(
  MessageLog
);
