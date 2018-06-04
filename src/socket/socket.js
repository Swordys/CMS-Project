const server = require("http").createServer();
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SEND_MESSAGE", ({ messageData, roomId }) => {
    socket.join(roomId);
    io.to(roomId).emit("RECEIVE_MESSAGE", messageData);
  });
});

server.listen(8080, err => {
  if (err) throw err;
});
