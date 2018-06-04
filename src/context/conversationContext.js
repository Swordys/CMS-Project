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
    convoRooms: {},
    convoLogs: {},
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

  initConversation = async (uid, targetUid) => {
    const { convoRooms } = this.state;

    if (!convoRooms[targetUid]) {
      const convoId = await returnConversationId(uid, targetUid);
      if (convoId !== undefined) {
        convoRooms[targetUid] = convoId;
        await this.setState({
          activeRoom: convoId.conversationId,
          convoRooms: { ...convoRooms }
        });
      } else {
        const newRoom = await createNewConvoRoom(uid, targetUid);
        convoRooms[targetUid] = newRoom;
        await this.setState({
          activeRoom: newRoom,
          convoRooms: { ...convoRooms }
        });
      }
    } else {
      const activeRoom = this.state.convoRooms[targetUid].conversationId;
      await this.setState({
        activeRoom
      });
    }
    this.loadConversation();
  };

  loadConversation = async () => {
    const { activeRoom, convoLogs } = this.state;
    this.setState({
      convoIsLoading: true
    });
    if (activeRoom !== null) {
      if (!convoLogs[activeRoom]) {
        const conversationLog = await loadConversationLog(activeRoom).then(
          log => log
        );
        convoLogs[activeRoom] = conversationLog;
        await this.setState({
          conversationLog,
          convoLogs: { ...convoLogs }
        });
      } else {
        const conversationLog = this.state.convoLogs[activeRoom];
        await this.setState({
          conversationLog
        });
      }
      socketClient.emit("SUBSCRIBE", activeRoom);
    }
    this.setState({
      convoIsLoading: false
    });
  };

  sendMessage = (message, uid) => {
    const { activeRoom, convoLogs } = this.state;
    if (activeRoom) {
      const currentMsg = processMessage(
        this.state.conversationLog,
        message,
        uid
      );

      const activeConvoLog = [...convoLogs[activeRoom], currentMsg];
      convoLogs[activeRoom] = activeConvoLog;
      this.setState({
        convoLogs
      });

      pushMessageToFirebase(currentMsg, activeRoom);
      const messagePayload = {
        messageData: currentMsg,
        roomId: activeRoom
      };
      socketClient.emit("SEND_MESSAGE", messagePayload);
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
