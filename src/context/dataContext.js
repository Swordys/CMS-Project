import React, { Component } from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
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
    userConvoLogs: {},
    selectedUser: null,
    userMessageConvos: {},
    userActiveConversationLog: [],
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

    this.subscribeSockets(uid);
    this.loadSocketListeners();
    await this.loadSidebarConvos();
    this.loadConversation();
    this.loadUserConnections();
  }

  componentWillUnmount() {
    socketClient.off("RECEIVE_MESSAGE");
    socketClient.off("RECEIVE_CONVO");
    socketClient.off("NEW_CONNECTION");
  }

  subscribeSockets = uid => {
    socketClient.emit("SUBSCRIBE_NEW_CONNECTION", uid);
  };

  loadSocketListeners = () => {
    socketClient.on("NEW_CONNECTION", async ({ targetUid, roomId }) => {
      await socketClient.emit("SUBSCRIBE_CONVO", roomId);
      const { userData } = this.state;
      userData.connections[targetUid] = {
        conversationId: roomId
      };
      this.setState({
        userData
      });
    });
    socketClient.on("RECEIVE_MESSAGE", ({ messageData, roomId }) => {
      const { userConvoLogs, userActiveRoom } = this.state;

      if (!userConvoLogs[roomId]) {
        userConvoLogs[roomId] = [messageData];
      } else {
        const activeConvoLog = [...userConvoLogs[roomId], messageData];
        userConvoLogs[roomId] = activeConvoLog;
      }

      this.setState({
        userConvoLogs,
        userActiveConversationLog: userConvoLogs[userActiveRoom]
      });
    });

    socketClient.on("RECEIVE_CONVO", convo => {
      const { userMessageConvos, selectedUser, userData } = this.state;
      const { roomId, senderId } = convo;
      const { uid } = userData;

      userMessageConvos[roomId] = {
        displayMessage: convo.displayMessage,
        lastMessageTime: convo.lastMessageTime,
        userId: uid === senderId ? selectedUser.userId : senderId,
        roomId
      };

      this.setState({
        userMessageConvos
      });
    });
  };

  loadUserConnections = () => {
    const connectedRooms = Object.values(this.state.userData.connections);
    connectedRooms.forEach(item => {
      socketClient.emit("SUBSCRIBE_CONVO", item.conversationId);
    });
  };

  loadSidebarConvos = async () => {
    const { uid } = this.state.userData;
    const userConvos = await loadUserConvos(uid);
    if (userConvos.length > 0) {
      const userActiveRoom = userConvos[0].roomId;
      const selectedUser = { userId: userConvos[0].targetUid[uid] };
      const userMessageConvos = Object.assign(
        {},
        ...userConvos.map(item => ({
          [item.roomId]: {
            displayMessage: item.displayMessage,
            lastMessageTime: item.lastMessageTime,
            userId: item.targetUid[uid],
            roomId: item.roomId
          }
        }))
      );

      this.setState({
        selectedUser,
        userActiveRoom,
        userMessageConvos
      });
    }
  };

  searchUsers = async text => {
    const { uid } = this.state.userData;
    const userSearchResult = await searchUsers(text, uid);
    this.setState({
      userSearchResult
    });
  };

  loadUserPage = async targetUser => {
    this.setState({
      selectedUser: targetUser
    });
    const { connections } = this.state.userData;
    const { userId } = targetUser;

    if (connections[userId]) {
      console.log("EXISTING USER");
      const { conversationId } = connections[userId];
      this.loadConversation(conversationId);
    } else {
      console.log("NEW USER, SAY HELLO!");
      this.setState({
        userActiveConversationLog: [],
        userActiveRoom: null
      });
    }
  };

  loadConversation = async (conversationId = null) => {
    if (conversationId) {
      await this.setState({
        userActiveRoom: conversationId
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
      socketClient.emit("SUBSCRIBE_ROOM", userActiveRoom);
    }
    this.setState({
      convoIsLoading: false
    });
  };

  createNewConversation = async (newMessage, uid, userId) => {
    const newConversationId = uuid();

    socketClient.emit("CREATE_NEW_CONNECTION", {
      uid,
      userId,
      roomId: newConversationId
    });
    socketClient.emit("SUBSCRIBE_ROOM", newConversationId);
    socketClient.emit("SUBSCRIBE_CONVO", newConversationId);

    createNewConvoRoom(newConversationId, uid, userId);

    await this.setState({
      userActiveRoom: newConversationId
    });
    this.pushMessageToFirestoreAndSockets(newMessage, newConversationId);
  };

  sendMessage = message => {
    const {
      userActiveRoom,
      userActiveConversationLog,
      userData,
      selectedUser
    } = this.state;

    if (selectedUser !== null) {
      const { uid } = userData;
      const { userId } = selectedUser;

      const newMessage = processMessage(
        userActiveConversationLog,
        message,
        uid
      );

      if (userActiveRoom) {
        this.pushMessageToFirestoreAndSockets(newMessage);
      } else {
        this.createNewConversation(newMessage, uid, userId);
      }
    }
  };

  pushMessageToFirestoreAndSockets = newMessage => {
    const { userActiveRoom } = this.state;
    const messagePayload = {
      messageData: newMessage,
      roomId: userActiveRoom
    };
    socketClient.emit("SEND_MESSAGE", messagePayload);
    pushMessageToFirebase(newMessage, userActiveRoom);
  };

  render() {
    return (
      <DatabaseContext.Provider
        value={{
          userData: this.state.userData,
          convoIsLoading: this.state.convoIsLoading,
          conversationLog: this.state.userActiveConversationLog,
          messageConvos: this.state.userMessageConvos,
          userSearchResult: this.state.userSearchResult,
          loadUserPage: this.loadUserPage,
          searchUsers: this.searchUsers,
          sendMessage: this.sendMessage
        }}
      >
        {this.props.children}
      </DatabaseContext.Provider>
    );
  }
}
