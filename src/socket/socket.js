const server = require("http").createServer();
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SUBSCRIBE", roomId => {
    socket.join(roomId);
  });

  socket.on("UNSUBSCRIBE", roomId => {
    socket.leave(roomId);
  });

  socket.on("CREATE_NEW_CONNECTION", ({ uid, targetUid }) => {
    io.to(`${targetUid}/connection`).emit("NEW_CONNECTION", uid);
    io.to(`${uid}/connection`).emit("NEW_CONNECTION", targetUid);
  });

  socket.on("SUBSCRIBE_NEW_CONNECTIONS", uid => {
    socket.join(`${uid}/connection`);
  });

  socket.on("SUBSCRIBE_USER_CONVOS", uid => {
    socket.join(`${uid}/convos`);
  });

  socket.on("SEND_MESSAGE", ({ messageData, roomId }) => {
    io.to(roomId).emit("RECEIVE_MESSAGE", { messageData, roomId });
    io.to(`${messageData.userId}/convos`).emit("RECEIVE_CONVO", {
      displayMessage: messageData.text,
      lastMessageTime: messageData.date,
      roomId
    });
  });
});

server.listen(8080, err => {
  if (err) throw err;
});
