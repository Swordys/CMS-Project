import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import MessageText from "./MessageText";
import MessageUrlMeta from "./MessageUrlMeta";

// Actions
import {
  loadedMetaUrlHeight,
  loadedMessageHeight
} from "../../../../actions/Actions";

// Styles
import "../../../../css/messageApp/message/messageLog/messageItem.css";

class MessageItem extends Component {
  static defaultProps = {
    urlMeta: []
  };

  static propTypes = {
    sender: PropTypes.bool.isRequired,
    urlMeta: PropTypes.arrayOf(
      PropTypes.shape({ title: PropTypes.string.isRequired })
    ),
    loadedMetaUrlHeight: PropTypes.func.isRequired,
    loadedMessageHeight: PropTypes.func.isRequired
  };

  componentDidMount() {
    const msgHeight = this.msgDom.clientHeight;
    this.props.loadedMessageHeight(msgHeight + 7);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.urlMeta) {
      const metaUrlHeight = this.metaDom.clientHeight;
      this.props.loadedMetaUrlHeight(metaUrlHeight);
    }
  }

  renderMeta = () => {
    const { urlMeta } = this.props;
    return urlMeta
      ? urlMeta.map(meta => <MessageUrlMeta key={meta.id} {...meta} />)
      : null;
  };

  render() {
    const { sender } = this.props;
    return (
      <div
        ref={e => {
          this.msgDom = e;
        }}
        className={`messageItem_container ${sender
          ? "messageItem"
          : "messageItem_inbox"}`}
        style={{ alignItems: `${sender ? "flex-end" : "flex-start"}` }}
      >
        <div>
          <MessageText {...this.props} />
        </div>
        <div
          ref={e => {
            this.metaDom = e;
          }}
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

export default connect(null, { loadedMetaUrlHeight, loadedMessageHeight })(
  MessageItem
);
