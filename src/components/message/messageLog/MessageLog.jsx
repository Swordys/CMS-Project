import React, { Component } from "react";
import ProptTypes from "prop-types";
import { connect } from "react-redux";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

// CSS
import "./css/messageLog.css";
import "./css/reactTrans.css";

// Components
import Message from "./Message";
import EmojiBox from "./EmojiBox";

// Actions
import { closeEmoji } from "../../../actions/Actions";

const MessageTransition = props => (
  <CSSTransition
    {...props}
    classNames="fade"
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
          <Message {...messageObj} />
        </MessageTransition>
      );

      if (messageObj.timeStamp) {
        retunLog.push(
          <MessageTransition key={messageObj.id}>
            <div className="messageBoxDate">{messageObj.date}</div>
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
        className="messageLogWrap"
      >
        <EmojiBox />
        <TransitionGroup className="messageLog">
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
