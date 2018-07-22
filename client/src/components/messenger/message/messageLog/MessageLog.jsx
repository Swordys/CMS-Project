import React, { Component } from "react";

import "../../../../css/messageApp/general/loaderIcon.css";
import "../../../../css/messageApp/message/messageLog/messageLog.css";

import MessageItem from "./messageItem/MessageItem";

class MessageLog extends Component {
  componentDidUpdate() {
    this.bottom.scrollIntoView();
  }

  renderMessages = (userData, conversationLog) =>
    conversationLog.map(item => {
      const messageItem = (
        <MessageItem
          key={item.messageId}
          sender={userData.uid === item.senderId}
          {...item}
        />
      );

      return item.showTimeStamp ? (
        <React.Fragment key={item.messageId}>
          <div className="message-item-date">{item.messageDate}</div>
          {messageItem}
        </React.Fragment>
      ) : (
        messageItem
      );
    });

  render() {
    const { convoIsLoading, conversationLog, userData } = this.props;
    const spinner = (
      <div className="message-log-load">
        <div className="messageItem_load_icon">
          {Array.from({ length: 9 }, (e, i) => i).map(i => (
            <div key={i} className="load_icon_box" />
          ))}
        </div>
      </div>
    );

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
        {convoIsLoading ? spinner : null}
        <div className="convo-log">
          {this.renderMessages(userData, conversationLog)}
          {bottom}
        </div>
      </div>
    );
  }
}

export default MessageLog;
