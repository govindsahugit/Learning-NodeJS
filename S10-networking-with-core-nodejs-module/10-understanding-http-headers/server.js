import net from "node:net";

const server = net.createServer((socket) => {
  socket.write("HTTP/1.1\n");
  socket.write("Access-Control-Allow-Origin: *\n");
  socket.write("Access-Control-Expose-Headers: *\n");
  socket.write("Name: Govind\n");
  socket.write("\n\n");
  socket.write("Hii");
  socket.end();
  console.log("Client Connected.");
  socket.on("close", () => {
    console.log("Client Disconnected.");
  });
  socket.on("error", () => {
    console.log("Client Lost.");
  });
});

server.listen(4000, "0.0.0.0", () => {
  console.log("server started on port 4000");
});
