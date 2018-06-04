import React, { Component } from "react";
import PropTypes from "prop-types";
import socketClient from "../socket/socketClient";

import {
  loadConversationLog,
  processMessage,
  pushMessageToFirebase,
  returnConversationId,
  createNewConvoRoom
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
    activeRoom: null,
    convoIsLoading: true
  };

  async componentDidMount() {
    socketClient.on("RECEIVE_MESSAGE", message => {
      this.setState(({ conversationLog }) => ({
        conversationLog: [...conversationLog, message]
      }));
    });
    this.loadConversation();
  }

  componentWillUnmount() {
    socketClient.off("RECEIVE_MESSAGE");
  }

  loadConversation = async () => {
    const { activeRoom } = this.state;
    this.setState({
      convoIsLoading: true
    });
    if (activeRoom) {
      const conversationLog = await loadConversationLog(activeRoom).then(
        log => log
      );
      this.setState({
        conversationLog
      });
    }
    this.setState({
      convoIsLoading: false
    });
  };

  sendMessage = (message, uid) => {
    const { activeRoom } = this.state;
    if (activeRoom) {
      const currentMsg = processMessage(
        this.state.conversationLog,
        message,
        uid
      );
      pushMessageToFirebase(currentMsg, activeRoom);
      socketClient.emit("SEND_MESSAGE", currentMsg);
    }
  };

  initConversation = async (uid, userUid) => {
    const result = await returnConversationId(uid, userUid);
    if (result !== undefined) {
      console.log('ROOM EXISTS');
      this.setState({
        activeRoom: result.conversationId
      });
      this.loadConversation();
    } else {
      console.log("INIT NEW ROOM");
      const newRoom = await createNewConvoRoom(uid, userUid);
      this.setState({
        activeRoom: newRoom
      });
      this.loadConversation();
    }
  };

  render() {
    return (
      <ConversationContext.Provider
        value={{
          conversationLog: this.state.conversationLog,
          convoIsLoading: this.state.convoIsLoading,
          sendMessage: this.sendMessage,
          initConversation: this.initConversation
        }}
      >
        {this.props.children}
      </ConversationContext.Provider>
    );
  }
}

export default ConversationContext;
