const server = require("http").createServer();
const io = require("socket.io")(server);

io.on("connection", client => {
  console.log(client.id);
  io.emit("USER_CONNECTED", client.id);
  client.on("SEND_MESSAGE", data => {
    io.emit("RECEIVE_MESSAGE", data);
  });
});

server.listen(8080, err => {
  if (err) throw err;
});
