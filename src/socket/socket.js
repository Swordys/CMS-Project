const server = require("http").createServer();
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SUBSCRIBE_ROOM", roomId => {
    socket.join(roomId);
  });

  socket.on("UNSUBSCRIBE_ROOM", roomId => {
    socket.leave(roomId);
  });

  socket.on("SUBSCRIBE_NEW_CONNECTION", uid => {
    socket.join(`${uid}/connection`);
  });

  socket.on("CREATE_NEW_CONNECTION", ({ uid, userId, roomId }) => {
    io.to(`${userId}/connection`).emit("NEW_CONNECTION", {
      targetUid: uid,
      roomId
    });
    io.to(`${uid}/connection`).emit("NEW_CONNECTION", {
      targetUid: userId,
      roomId
    });
  });

  socket.on("SUBSCRIBE_CONVO", roomId => {
    socket.join(`${roomId}/convo`);
  });

  socket.on("SEND_MESSAGE", ({ messageData, roomId, username }) => {
    io.to(roomId).emit("RECEIVE_MESSAGE", { messageData, roomId });
    io.to(`${roomId}/convo`).emit("RECEIVE_CONVO", {
      displayMessage: messageData.text,
      lastMessageTime: messageData.date,
      senderId: messageData.userId,
      senderUsername: username,
      roomId
    });
  });
});

server.listen(8080, err => {
  if (err) throw err;
});
