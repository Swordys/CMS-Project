import React, { Component } from "react";
import { connect } from "react-redux";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import { Emoji } from "emoji-mart";

// CSS
import "./css/messageLog.css";
import "./css/reactTrans.css";

// Components
import Message from "./Message";
import EmojiBox from "./EmojiBox";

// Actions
import { closeEmoji } from "../../../actions/Actions.js";

class MessageLog extends Component {
  renderMessages = () => {
    const { messageLog } = this.props;

    const bottomMsg = (
      <CSSTransition key={"bot"} timeout={{ enter: 100, exit: 100 }}>
        <div ref={e => (this.bottomMsg = e)} className="bottom" />
      </CSSTransition>
    );

    const retunLog = [];
    messageLog.forEach(item => {
      let retItem = (
        <CSSTransition
          key={item.key}
          classNames="fade"
          timeout={{ enter: 300, exit: 300 }}
        >
          <Message {...item} />
        </CSSTransition>
      );
      if (item.timeStamp) {
        retunLog.push(
          <CSSTransition
            key={item.id}
            classNames="zade"
            timeout={{ enter: 100, exit: 100 }}
          >
            <div className="messageBoxDate">{item.date}</div>
          </CSSTransition>
        );
      }
      retunLog.push(retItem);
    }, this);

    retunLog.push(bottomMsg);
    return retunLog;
  };

  componentDidUpdate() {
    this.bottomMsg.scrollIntoView();
  }

  componentDidMount() {
    this.bottomMsg.scrollIntoView();
  }

  render() {
    return (
      <div onClick={() => this.props.closeEmoji()} className="messageLogWrap">
        <EmojiBox />
        <TransitionGroup className="messageLog">
          {this.renderMessages()}
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageLog: state.getMessages
});

const dispatchToProps = dispatch => ({
  closeEmoji: () => {
    dispatch(closeEmoji());
  }
});

export default connect(mapStateToProps, dispatchToProps)(MessageLog);
