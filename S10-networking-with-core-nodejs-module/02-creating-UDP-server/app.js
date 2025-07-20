import dgram from "node:dgram";

const socket = dgram.createSocket("udp4");

// ======= As a server =============== //

// socket.on("message", (message, remoteAddress) => {
//   console.log(message.toString());
//   console.log(remoteAddress);
// });

// socket.bind({ port: 4000 }, () => {
//   console.log(socket.address());
//   const address = socket.address();
//   console.log(`listening on port ${address.port}`);
// });

// =========== As a client ============= //

// socket.send("Hello from NodeJS.", 3000, "192.168.1.6");
