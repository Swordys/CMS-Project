import React from "react";
import PropTypes from "prop-types";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

// Helpers
import { processText } from "../../../helpers/messageHelper";

// Components
import MessagePic from "./MessagePic";

// Styles
import "../../../css/messageApp/message/messageLog/messageItem.css";

class MessageItem extends React.Component {
  renderText = () => {
    const { text, sender, date } = this.props;
    const { textArr, onlyEmojy } = processText(text, sender);
    const classObj = {
      msgClass: sender ? "messageItem_textOutbox" : "messageItem_textInbox",
      textClass: ""
    };

    if (onlyEmojy) {
      classObj.msgClass = "messageItem_emoji";
      classObj.textClass = "messageItem_containEmoji";
    }

    return (
      <div
        className={`${!onlyEmojy
          ? "messageItem_text"
          : ""} ${classObj.msgClass}`}
      >
        <div
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            wordBreak: "break-word"
          }}
        >
          <div className={classObj.textClass}>{textArr}</div>
        </div>
        <div className="messageItem_timeInfo">{date}</div>
      </div>
    );
  };
  renderMeta = () => {
    const { urlMeta } = this.props;
    return urlMeta
      ? urlMeta.map(meta => <div key={meta.id}>{meta.title}</div>)
      : null;
  };
  renderPic = () => {
    const { showPic, id, noDelay, sender } = this.props;
    return showPic ? (
      <CSSTransition
        key={id}
        classNames="messagePicTrans"
        timeout={{ enter: 500, exit: 800 }}
      >
        <MessagePic noDelay={noDelay} sender={sender} />
      </CSSTransition>
    ) : (
      undefined
    );
  };

  render() {
    const { sender } = this.props;
    return (
      <div
        className={`messageItem_container ${sender
          ? "messageItem"
          : "messageItem_inbox"}`}
        style={{ alignItems: `${sender ? "flex-end" : "flex-start"}` }}
      >
        <div>
          {this.renderText()}
          <TransitionGroup>{this.renderPic()}</TransitionGroup>
        </div>
        {this.renderMeta()}
      </div>
    );
  }
}

MessageItem.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sender: PropTypes.bool.isRequired,
  noDelay: PropTypes.bool.isRequired,
  showPic: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  urlMeta: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string.isRequired })
  ).isRequired
};

export default MessageItem;
