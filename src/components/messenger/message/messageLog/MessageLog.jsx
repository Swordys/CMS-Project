import React, { Component } from "react";

import "../../../../css/messageApp/general/loaderIcon.css";
import "../../../../css/messageApp/message/messageLog/messageLog.css";

import {
  convoStateInterface,
  userStateInterface
} from "../../../../interfaces/interface";

import MessageItem from "./messageItem/MessageItem";

class MessageLog extends Component {
  static propTypes = {
    ...convoStateInterface,
    ...userStateInterface
  };

  componentDidUpdate() {
    this.bottom.scrollIntoView();
  }

  renderMessages = (userData, conversationLog) =>
    conversationLog.map(messageData => {
      const messageItem = (
        <MessageItem
          key={messageData.id}
          sender={userData.uid === messageData.userId}
          {...messageData}
        />
      );

      return messageData.showTimeStamp ? (
        <React.Fragment key={messageData.id}>
          <div className="message-item-date">{messageData.date}</div>
          {messageItem}
        </React.Fragment>
      ) : (
        messageItem
      );
    });

  render() {
    const { convoState, userState } = this.props;

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
        {convoState.convoIsLoading ? spinner : null}
        <div className="convo-log">
          {this.renderMessages(userState.userData, convoState.conversationLog)}
          {bottom}
        </div>
      </div>
    );
  }
}

export default MessageLog;
