import React, { Component } from "react";
import PropTypes from "prop-types";
import socketClient from "../socket/socketClient";
import {
  retunUserAccount,
  loadConversationLog,
  processMessage,
  pushMessageToFirebase,
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
    userActiveTarget: "",
    convoIsLoading: true
  };

  async componentDidMount() {
    const uid = await returnUserId();
    const userData = await retunUserAccount(uid);
    this.setState({
      userData
    });

    socketClient.emit("SUBSCRIBE_USER_CONVOS", uid);
    this.initMessagesSocket();
    await this.loadConvos();
    this.loadConversation();
  }

  componentWillUnmount() {
    socketClient.off("RECEIVE_MESSAGE");
    socketClient.off("RECEIVE_CONVO");
  }

  initMessagesSocket = () => {
    socketClient.on("RECEIVE_MESSAGE", message => {
      this.setState(({ userActiveConversationLog }) => ({
        userActiveConversationLog: [...userActiveConversationLog, message]
      }));
    });
    socketClient.on("RECEIVE_CONVO", message => {
      console.log("YES", message);
    });
  };

  initConversation = async targetUser => {
    const { userConvoRooms, userData } = this.state;
    const targetUid = targetUser.uid;

    // If conversation is not in cache
    if (!userConvoRooms[targetUid]) {
      socketClient.emit("SUBSCRIBE_USER_CONVOS", targetUid);
      const { uid, conversations } = userData;
      const convoId = conversations[targetUid];
      if (convoId !== undefined) {
        userConvoRooms[targetUid] = convoId.conversationId;
        await this.setState({
          userActiveRoom: convoId.conversationId,
          userConvoRooms: { ...userConvoRooms },
          userActiveTarget: targetUid
        });
      } else {
        const newRoom = await createNewConvoRoom(uid, targetUid);
        userConvoRooms[targetUid] = newRoom;
        await this.setState({
          userActiveRoom: newRoom,
          userConvoRooms: { ...userConvoRooms },
          userActiveTarget: targetUid
        });
      }
    } else {
      const userActiveRoom = this.state.userConvoRooms[targetUid];
      await this.setState({
        userActiveRoom
      });
    }
    this.loadConversation();
  };

  loadConvos = async () => {
    const userMessageConvos = await loadUserConvos(this.state.userData.uid);
    if (userMessageConvos.length > 0) {
      const { uid } = this.state.userData;
      const { roomId, sender, target } = userMessageConvos[0];
      const userActiveTarget = uid === sender ? target : sender;
      this.setState({
        userMessageConvos,
        userActiveRoom: roomId,
        userActiveTarget
      });
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
        );
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
      userActiveTarget,
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
        roomId: userActiveRoom,
        targetId: userActiveTarget
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
