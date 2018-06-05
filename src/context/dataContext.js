import React, { Component } from "react";
import PropTypes from "prop-types";
import socketClient from "../socket/socketClient";
import {
  retunUserAccount,
  loadConversationLog,
  processMessage,
  pushMessageToFirebase,
  returnConversationId,
  createNewConvoRoom,
  loadUserConvos,
  searchUsers
} from "../API/firestore";
import { returnUserId } from "../API/auth";

const DatabaseContext = React.createContext();

export const DatabaseConsumer = DatabaseContext.Consumer;

/* eslint-disable react/no-did-mount-set-state */

export class DatabaseProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    userData: null,
    userActiveConversationLog: [],
    userConvoRooms: {},
    userConvoLogs: {},
    userMessageConvos: [],
    userSearchResult: [],
    userActiveRoom: null,
    convoIsLoading: true
  };

  async componentDidMount() {
    const uid = await returnUserId();
    const userData = await retunUserAccount(uid);
    this.setState({
      userData
    });

    this.initMessagesSocket();
    await this.loadConvos();
    this.loadConversation();
  }

  componentWillUnmount() {
    socketClient.off("RECEIVE_MESSAGE");
  }

  initMessagesSocket = () => {
    socketClient.on("RECEIVE_MESSAGE", message => {
      this.setState(({ userActiveConversationLog }) => ({
        userActiveConversationLog: [...userActiveConversationLog, message]
      }));
    });
  };

  initConversation = async targetUser => {
    const { userConvoRooms, userData } = this.state;
    const targetUid = targetUser.uid;

    if (!userConvoRooms[targetUid]) {
      const { uid } = userData;
      const convoId = await returnConversationId(uid, targetUid);
      if (convoId !== undefined) {
        userConvoRooms[targetUid] = convoId;
        await this.setState({
          userActiveRoom: convoId.conversationId,
          userConvoRooms: { ...userConvoRooms }
        });
      } else {
        const newRoom = await createNewConvoRoom(uid, targetUid);
        userConvoRooms[targetUid] = newRoom;
        await this.setState({
          userActiveRoom: newRoom,
          userConvoRooms: { ...userConvoRooms }
        });
      }
    } else {
      const userActiveRoom = this.state.userConvoRooms[targetUid]
        .conversationId;
      await this.setState({
        userActiveRoom
      });
    }
    this.loadConversation();
  };

  loadConvos = async () => {
    const userMessageConvos = await loadUserConvos(this.state.userData.uid);
    if (userMessageConvos) {
      const { roomId } = userMessageConvos[0];
      this.setState({ userMessageConvos, userActiveRoom: roomId });
    }
  };

  loadConversation = async (roomId = null) => {
    if (roomId) {
      await this.setState({
        userActiveRoom: roomId
      });
    }
    const { userConvoLogs, userActiveRoom } = this.state;
    this.setState({
      convoIsLoading: true
    });

    if (userActiveRoom !== null) {
      if (!userConvoLogs[userActiveRoom]) {
        const userActiveConversationLog = await loadConversationLog(
          userActiveRoom
        ).then(log => log);
        userConvoLogs[userActiveRoom] = userActiveConversationLog;
        await this.setState({
          userActiveConversationLog,
          userConvoLogs: { ...userConvoLogs }
        });
      } else {
        const userActiveConversationLog = this.state.userConvoLogs[
          userActiveRoom
        ];
        await this.setState({
          userActiveConversationLog
        });
      }
      socketClient.emit("SUBSCRIBE", userActiveRoom);
    }
    this.setState({
      convoIsLoading: false
    });
  };

  searchUsers = async text => {
    const { uid } = this.state.userData;
    const userSearchResult = await searchUsers(text, uid);
    this.setState({
      userSearchResult
    });
  };

  sendMessage = message => {
    const {
      userActiveRoom,
      userConvoLogs,
      userActiveConversationLog,
      userData
    } = this.state;

    if (userActiveRoom) {
      const currentMsg = processMessage(
        userActiveConversationLog,
        message,
        userData.uid
      );

      const activeConvoLog = [...userConvoLogs[userActiveRoom], currentMsg];
      userConvoLogs[userActiveRoom] = activeConvoLog;
      this.setState({
        userConvoLogs
      });

      pushMessageToFirebase(currentMsg, userActiveRoom);
      const messagePayload = {
        messageData: currentMsg,
        roomId: userActiveRoom
      };
      socketClient.emit("SEND_MESSAGE", messagePayload);
    }
  };

  render() {
    return (
      <DatabaseContext.Provider
        value={{
          userData: this.state.userData,
          convoIsLoading: this.state.convoIsLoading,
          conversationLog: this.state.userActiveConversationLog,
          messageConvos: this.state.userMessageConvos,
          initConversation: this.initConversation,
          loadConversation: this.loadConversation,
          searchUsers: this.searchUsers,
          userSearchResult: this.state.userSearchResult,
          sendMessage: this.sendMessage
        }}
      >
        {this.props.children}
      </DatabaseContext.Provider>
    );
  }
}
