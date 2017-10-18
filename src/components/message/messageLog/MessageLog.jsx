import React, { Component } from "react";
import ProptTypes from "prop-types";
import { connect } from "react-redux";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

// CSS
import '../../../css/messageApp/message/messageLog/messageLog.css';
import '../../../css/messageApp/message/messageLog/transitions/messageTrans.css';

// Components
import MessageItem from "./MessageItem";
import EmojiBox from "../../general/EmojiBox";

// Actions
import { closeEmoji } from "../../../actions/Actions";

const MessageTransition = props => (
  <CSSTransition
    {...props}
    classNames="messageItemTrans"
    timeout={{ enter: 400, exit: 400 }}
  />
);

class MessageLog extends Component {
  componentDidMount() {
    this.bottomMsg.scrollIntoView();
  }

  componentDidUpdate() {
    this.bottomMsg.scrollIntoView();
  }

  renderMessages = () => {
    const { messageLog } = this.props;
    const bottomMsg = (
      <MessageTransition key={"bot"}>
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
          <MessageItem {...messageObj} />
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

  render() {
    return (
      <div
        role="presentation"
        onClick={() => this.props.closeEmoji()}
        className="messageLog"
      >
        <EmojiBox />
        <TransitionGroup className="messageLog_list">
          {this.renderMessages()}
        </TransitionGroup>
      </div>
    );
  }
}

MessageLog.propTypes = {
  messageLog: ProptTypes.arrayOf(ProptTypes.object).isRequired,
  closeEmoji: ProptTypes.func.isRequired
};

const mapStateToProps = state => ({
  messageLog: state.getMessages
});

export default connect(mapStateToProps, { closeEmoji })(MessageLog);
