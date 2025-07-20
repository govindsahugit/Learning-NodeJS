import dgram from "node:dgram";

const socket = dgram.createSocket("udp4");

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);
  socket.close()
});

socket.send("Hello from NodeJS.", 4000, "192.168.1.3");
