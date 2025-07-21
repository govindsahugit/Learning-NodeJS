import net from "node:net";

const server = net.createServer((socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString());
    socket.write("Got your message.");
    socket.end();
  });
  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client Disconnected.");
  });
  socket.on("error", () => {
    console.log("Client Lost.");
  });
  console.log(socket.remoteAddress, ": Client Connected.");
});

server.listen(4000, "0.0.0.0", () => {
  console.log(`Server started on port 4000.`);
});
