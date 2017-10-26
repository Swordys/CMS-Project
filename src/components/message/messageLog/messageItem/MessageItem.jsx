import React from "react";
import PropTypes from "prop-types";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

// Components
import MessageText from "./MessageText";
import MessagePic from "./MessagePic";
import MessageUrlMeta from "./MessageUrlMeta";

// Styles
import "../../../../css/messageApp/message/messageLog/messageItem.css";

class MessageItem extends React.Component {
  static defaultProps = {
    urlMeta: []
  };

  static propTypes = {
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    sender: PropTypes.bool.isRequired,
    noDelay: PropTypes.bool.isRequired,
    showPic: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    urlMeta: PropTypes.arrayOf(
      PropTypes.shape({ title: PropTypes.string.isRequired })
    )
  };

  renderMeta = () => {
    const { urlMeta } = this.props;
    return urlMeta
      ? urlMeta.map(meta => <MessageUrlMeta key={meta.id} {...meta} />)
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
          <MessageText {...this.props} />
          <TransitionGroup>{this.renderPic()}</TransitionGroup>
        </div>
        <div
          className={`messageItem_meta ${sender
            ? "messageItem_meta_outBox"
            : "messageItem_meta_inBox"}`}
        >
          {this.renderMeta()}
        </div>
      </div>
    );
  }
}

export default MessageItem;
