import net from "node:net";

const clientList = [];

process.stdin.on("data", (input) => {
  const clientId = parseInt(input.toString().split(" ")[0]);
  try {
    clientList[clientId - 1].write(input.toString().substring(1));
  } catch (error) {
    console.log("No client found.");
  }
});

const clients = [];
let clientsLength = 0;

const server = net.createServer((socket) => {
  const clientInputs = [];
  clientList.push(socket);
  // console.log(clientList.length);
  socket.write("Create User Name: ");
  socket.on("data", (chunk) => {
    // console.log(chunk.toString());
    // socket.write("Got your message.");
    clientInputs.push(chunk.toString());
    // console.log(clientInputs);
    clients.push(clientInputs[0].split("\r\n")[0]);
    clientList.forEach((client) => {
      if (client !== socket) {
        if (clientInputs.length) {
          client.write(`${clientInputs[0].split("\r\n")[0]}: ${chunk}`);
        }
      }
    });
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
