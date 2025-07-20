import net from "node:net";

const server = net.createServer();

server.listen(4000, "0.0.0.0", () => {
  console.log("Server started on port 4000");
});

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    // console.log(chunk.toString());
    socket.write("HTTPS\n\nGot your message.");
    socket.end()
  });
  socket.on("close", () => {
    console.log("Disconnected.");
  });
  //   console.log(socket.address());
  //   console.log(socket.remoteAddress);
  //   console.log(socket.remotePort);
  //   console.log(socket.remoteFamily);
  console.log("Connected. " + socket.remoteAddress);
});
