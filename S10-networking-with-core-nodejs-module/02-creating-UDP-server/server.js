import dgram from "node:dgram";

const socket = dgram.createSocket("udp4");

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);
  socket.send(
    "Message received successfully.",
    remoteAddress.port,
    remoteAddress.address
  );
});

socket.bind({ port: 4000 }, () => {
  console.log(socket.address());
  const address = socket.address();
  console.log(`listening on port ${address.port}`);
});
