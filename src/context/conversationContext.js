import React, { Component } from "react";
import PropTypes from "prop-types";
import socketClient from "../socket/socketClient";

import {
  loadConversationLog,
  processMessage,
  pushMessageToFirebase
} from "../API/firestore/index";

const ConversationContext = React.createContext();
export const ConversationConsumer = ConversationContext.Consumer;

/* eslint-disable react/no-did-mount-set-state */

export class ConversationProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    conversationLog: [],
    convoIsLoading: true
  };

  async componentDidMount() {
    socketClient.on("RECEIVE_MESSAGE", message => {
      this.setState(({ conversationLog }) => ({
        conversationLog: [...conversationLog, message]
      }));
    });
    const convoId = "convo#0";
    const conversationLog = await loadConversationLog(convoId).then(log => log);
    this.setState({
      // conversationLog,
      convoIsLoading: false
    });
  }

  componentWillUnmount() {
    socketClient.off("RECEIVE_MESSAGE");
  }

  sendMessage = (message, uid) => {
    const currentMsg = processMessage(this.state.conversationLog, message, uid);
    pushMessageToFirebase(currentMsg, "convo#0");
    socketClient.emit("SEND_MESSAGE", currentMsg);
  };

  render() {
    return (
      <ConversationContext.Provider
        value={{
          conversationLog: this.state.conversationLog,
          convoIsLoading: this.state.convoIsLoading,
          sendMessage: this.sendMessage
        }}
      >
        {this.props.children}
      </ConversationContext.Provider>
    );
  }
}

export default ConversationContext;
