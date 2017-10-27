import React from "react";
import PropTypes from "prop-types";

// Components
import MessageText from "./MessageText";
import MessageUrlMeta from "./MessageUrlMeta";

// Styles
import "../../../../css/messageApp/message/messageLog/messageItem.css";

class MessageItem extends React.Component {
  static defaultProps = {
    urlMeta: []
  };

  static propTypes = {
    sender: PropTypes.bool.isRequired,
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
